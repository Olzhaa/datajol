// M2.1 Python Fundamentals: Russian text. Code, solutions and expected output are in content/python.js.
DJ.i18n.patch({
  modules: {
    'm2-1': { intro: 'Python — основной язык специалиста по данным. Здесь вы пишете код прямо в браузере и сразу запускаете его. Первый запуск загружает среду Python (около 10 МБ), дальше всё работает быстро.' }
  },
  lessons: {
    'py-1': {
      title: 'print и первая программа',
      body: `
<p>Программа на Python — это последовательность команд, которые выполняются сверху вниз. Самая первая команда — <code>print()</code>: она выводит на экран текст или число:</p>
<pre><code>print("Привет, мир данных!")
print(2026)
print("Год:", 2026)</code></pre>
<p>Текст (string) берётся в кавычки: <code>"..."</code> или <code>'...'</code>. Числа пишутся без кавычек. Если передать в <code>print</code> несколько значений через запятую, они выведутся через пробел.</p>
<h3>Комментарий (comment)</h3>
<pre><code># Эта строка не выполняется: она для людей</code></pre>
<div class="tip">Python чувствителен к отступам (indentation). Пока начинайте каждую команду с начала строки.</div>
<h3>Как выполняется программа?</h3>
<p>Python читает и выполняет строки по очереди. Код ниже выводит две строки, потому что в нём два <code>print</code>:</p>
<pre><code>print("Первая строка")
print("Вторая строка")</code></pre>
<p>Если передать в один <code>print</code> несколько значений, они выведутся в одну строку через пробел: <code>print("Выручка:", 2500, "₸")</code> → <code>Выручка: 2500 ₸</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Не закрыта кавычка</b>: <code>print("Сәлем)</code> → <code>SyntaxError</code>. Открытую кавычку нужно закрыть.</li>
<li><b>Заглавная буква</b>: <code>Print("...")</code> не работает. Python различает заглавные и строчные буквы.</li>
<li><b>Нет скобок</b>: <code>print "Сәлем"</code> — старая запись из Python 2, сейчас это ошибка.</li>
</ul>
<div class="tip">Если задание ждёт точный текст, должны совпадать все запятые, пробелы и буквы. Сначала проверьте результат сами кнопкой «Запустить».</div>`,
      ex: [
        { prompt: 'Выведите на экран ровно этот текст: <code>Сәлем, Tolqyn!</code>', starter: '# Пишите код здесь\n', hints: ['<code>print("...")</code>'] },
        { prompt: 'Выведите две строки: в первой <code>SQL</code>, во второй <code>Python</code>.', hints: ['Напишите два отдельных <code>print</code>.'] }
      ]
    },
    'py-2': {
      title: 'Переменные и типы данных',
      body: `
<p><b>Переменная</b> (variable) — имя, данное значению. Она создаётся через <code>=</code>:</p>
<pre><code>city = "Алматы"
orders = 120
avg_check = 8450.5
is_active = True</code></pre>
<h3>Основные типы</h3>
<table>
<tr><th>Тип</th><th>Пример</th><th>Для чего</th></tr>
<tr><td><code>int</code></td><td>120</td><td>целое число</td></tr>
<tr><td><code>float</code></td><td>8450.5</td><td>дробное число</td></tr>
<tr><td><code>str</code></td><td>"Алматы"</td><td>текст</td></tr>
<tr><td><code>bool</code></td><td>True / False</td><td>истина / ложь</td></tr>
</table>
<p>Тип показывает <code>type()</code>. Типы можно преобразовывать: <code>int("42")</code>, <code>float("3.5")</code>, <code>str(100)</code>.</p>
<div class="tip">Имя переменной пишется латиницей, строчными буквами, слова через <code>_</code>: <code>total_revenue</code>. Оно не может начинаться с цифры.</div>
<h3>Значение переменной меняется</h3>
<p>Если присвоить переменной новое значение, старое забывается:</p>
<pre><code>orders = 120
orders = orders + 5     # теперь 125
orders += 5             # короткая запись, теперь 130</code></pre>
<p>Знак <code>=</code> означает не «равно», как в математике, а «сохрани»: Python вычисляет значение справа и записывает его в имя слева.</p>
<h3>Почему важны типы?</h3>
<p>Текст и число сложить нельзя: <code>"1250" + 5</code> → <code>TypeError</code>. Все данные из CSV-файлов или от пользователя приходят текстом, поэтому перед вычислениями их переводят в число через <code>int()</code> или <code>float()</code>. А сложение строк склеивает их: <code>"Ал" + "маты"</code> → <code>"Алматы"</code>.</p>
<div class="tip"><code>print(type(x))</code> — самый быстрый способ проверить тип переменной. Если результат неожиданный, сначала посмотрите на тип.</div>`,
      ex: [
        { prompt: 'Присвойте переменной <code>product</code> значение <code>"Ноутбук"</code>, а переменной <code>price</code> — <code>350000</code>. Затем выполните <code>print(product, price)</code>.', check: { tests: 'assert product == "Ноутбук", "переменная product должна быть \\"Ноутбук\\""\nassert price == 350000 and isinstance(price, int), "price должна быть целым числом 350000"' }, hints: ['<code>product = "Ноутбук"</code>'] },
        { prompt: '<code>raw = "1250"</code> дано в виде текста. Преобразуйте его в целое число, сохраните в переменную <code>qty</code> и выведите <code>qty * 2</code>.', check: { tests: 'assert isinstance(qty, int), "qty должна быть типа int: используйте int(raw)"' }, hints: ['<code>int(raw)</code>'] }
      ]
    },
    'py-3': {
      title: 'Операции с числами',
      body: `
<table>
<tr><th>Оператор</th><th>Значение</th><th>Пример</th></tr>
<tr><td><code>+ - * /</code></td><td>сложение, вычитание, умножение, деление</td><td><code>7 / 2 = 3.5</code></td></tr>
<tr><td><code>//</code></td><td>целочисленное деление</td><td><code>7 // 2 = 3</code></td></tr>
<tr><td><code>%</code></td><td>остаток от деления</td><td><code>7 % 2 = 1</code></td></tr>
<tr><td><code>**</code></td><td>возведение в степень</td><td><code>2 ** 3 = 8</code></td></tr>
</table>
<p><code>round(x, 2)</code> — округление до двух знаков после запятой. <code>abs(x)</code> — модуль числа. <code>sum()</code>, <code>min()</code>, <code>max()</code> работают со списками (в следующих уроках).</p>
<pre><code>revenue_aug = 80_000_000
revenue_sep = 100_000_000
growth = (revenue_sep - revenue_aug) / revenue_aug * 100
print(round(growth, 1))   # 25.0</code></pre>
<h3>Порядок операций</h3>
<p>Python соблюдает тот же порядок, что и математика: сначала <code>**</code>, затем <code>* / // %</code>, в конце <code>+ -</code>. Если сомневаетесь, ставьте скобки: <code>(a + b) / 2</code> и <code>a + b / 2</code> дают разные результаты.</p>
<h3>Повседневные формулы аналитика</h3>
<pre><code>conversion = buyers / visitors * 100          # конверсия, %
aov = revenue / orders                        # средний чек
share = part / total * 100                    # доля, %
change = (new - old) / old * 100              # изменение, %</code></pre>
<h3>Особенность дробных чисел</h3>
<p><code>0.1 + 0.2</code> даёт <code>0.30000000000000004</code>. Это не ошибка Python: компьютер хранит дробные числа в двоичной системе. При выводе результата используйте <code>round()</code>, а если деньги нужно считать точно, считайте их в тиынах целыми числами.</p>
<div class="tip">Деление на ноль даёт <code>ZeroDivisionError</code>. Когда считаете конверсию, подумайте: может ли число посетителей быть равным 0?</div>`,
      ex: [
        { prompt: 'Заказ состоит из 3 товаров: 4500, 12000 и 800 тенге. Запишите общую сумму в переменную <code>total</code> и выведите её.', check: { tests: 'assert total == 17300, "total должна быть 17300"' } },
        { prompt: 'На сайт зашли 1840 человек, 46 из них купили. Посчитайте конверсию в процентах и выведите её, округлив до 2 знаков после запятой.', hints: ['<code>buyers / visitors * 100</code>', '<code>round(..., 2)</code>'] }
      ]
    },
    'py-4': {
      title: 'Строки (strings) и f-string',
      body: `
<p>Работа с текстом очень часто встречается при очистке данных: лишние пробелы, разный регистр, разбиение на части.</p>
<pre><code>name = "  айгерім  "
print(name.strip())          # "айгерім"
print(name.strip().title())  # "Айгерім"
print("ALMATY".lower())      # "almaty"
print("a,b,c".split(","))    # ['a', 'b', 'c']
print("2024-09-14"[:7])      # "2024-09"
print(len("SQL"))            # 3</code></pre>
<p>Индексация начинается с 0: <code>"Python"[0]</code> = <code>"P"</code>. Срез (slice) <code>[a:b]</code> — от a до b (b не входит).</p>
<h3>f-string</h3>
<p>Самый удобный способ вставить значение в текст:</p>
<pre><code>city = "Астана"
orders = 42
print(f"{city}: {orders} заказов")
print(f"Средний чек: {8450.567:.2f}")   # 8450.57</code></pre>
<h3>Полезные методы</h3>
<table>
<tr><th>Метод</th><th>Пример</th><th>Результат</th></tr>
<tr><td><code>replace</code></td><td><code>"12 500".replace(" ", "")</code></td><td><code>"12500"</code></td></tr>
<tr><td><code>startswith</code></td><td><code>"+7701".startswith("+7")</code></td><td><code>True</code></td></tr>
<tr><td><code>count</code></td><td><code>"банан".count("а")</code></td><td><code>3</code></td></tr>
<tr><td><code>join</code></td><td><code>", ".join(["a", "b"])</code></td><td><code>"a, b"</code></td></tr>
</table>
<p>Методы строк не меняют исходную строку, а возвращают новую. Поэтому результат нужно сохранить: <code>name = name.strip()</code>.</p>
<h3>Форматы f-строк</h3>
<pre><code>revenue = 1234567.891
print(f"{revenue:,.0f}")    # 1,234,568  (с разделителем тысяч)
print(f"{0.2537:.1%}")      # 25.4%
print(f"{'Алматы':&lt;10}|")    # выровнять текст по левому краю на 10 символов</code></pre>
<div class="tip">Методы можно писать цепочкой: <code>raw.strip().lower().replace(" ", "_")</code>. Они выполняются слева направо.</div>`,
      ex: [
        { prompt: '<code>raw = "  ШЫМКЕНТ "</code>. Уберите пробелы и выведите так, чтобы заглавной была только первая буква: <code>Шымкент</code>.', hints: ['Напишите <code>.strip()</code> и <code>.title()</code> цепочкой.'] },
        { prompt: 'С помощью f-string выведите ровно такую строку: <code>Алматы: 925600 ₸</code>. Переменные уже даны.', hints: ['<code>print(f"{city}: {revenue} ₸")</code>'] },
        { prompt: 'Достаньте из строки <code>date = "2024-11-21"</code> месяц (<code>11</code>) с помощью среза и выведите его.', hints: ['Индексы считайте с 0. Месяц стоит на позициях 5 и 6.'] }
      ]
    },
    'py-5': {
      title: 'Условия: if, elif, else',
      body: `
<p>Программа может действовать по-разному в зависимости от условия:</p>
<pre><code>price = 25000
if price &gt;= 100000:
    segment = "дорогой"
elif price &gt;= 10000:
    segment = "средний"
else:
    segment = "дешёвый"
print(segment)   # средний</code></pre>
<p>После условия ставится <code>:</code>, а вложенный блок пишется с отступом в <b>4 пробела</b>. Это точный аналог CASE WHEN из SQL.</p>
<h3>Сравнение и логика</h3>
<p><code>==</code> (равно), <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. Объединение: <code>and</code>, <code>or</code>, <code>not</code>. Есть ли в списке: <code>city in ["Алматы", "Астана"]</code>.</p>
<h3>Порядок условий</h3>
<p>Python проверяет условия <code>if</code>/<code>elif</code> сверху вниз и выполняет блок только первого истинного условия. Поэтому самое строгое условие пишут первым. Если первым стоит <code>price &gt;= 10000</code>, то и товар за 250 000 ₸ окажется «средним».</p>
<h3>Значение отступов</h3>
<pre><code>if orders &gt; 100:
    print("Много")      # только если условие истинно
print("Проверено")  # выполняется всегда</code></pre>
<p>Отступ (indentation) показывает, какие строки относятся к условию. Если отступы перепутаны, возникает <code>IndentationError</code>.</p>
<h3>Короткая запись условия</h3>
<p>Чтобы выбрать одно значение, есть однострочное выражение: <code>label = "үлкен" if amount &gt; 3000 else "кіші"</code> («большой» / «маленький»). Оно похоже на функцию <code>IF</code> в Excel.</p>
<div class="tip">Не путайте <code>=</code> и <code>==</code>: первый присваивает значение, второй сравнивает. <code>if x = 5:</code> даёт синтаксическую ошибку.</div>`,
      ex: [
        { prompt: 'Выведите оценку по значению <code>score</code>: 85 и выше — <code>A</code>, 70 и выше — <code>B</code>, 50 и выше — <code>C</code>, иначе <code>F</code>. Для <code>score = 72</code> должно вывестись <code>B</code>.', hints: ['Проверяйте условия сверху вниз, начиная с самого большого.'] },
        { prompt: 'Если сумма заказа больше 20 000 <b>и</b> клиент из Алматы, выведите <code>Тегін жеткізу</code>, иначе <code>Жеткізу 1500 ₸</code> (тексты на казахском, как в задании).', hints: ['<code>if amount > 20000 and city == "Алматы":</code>'] }
      ]
    },
    'py-6': {
      title: 'Списки (list)',
      body: `
<p>В одной переменной хранится только одно значение. А раскладывать продажи за 7 дней недели по 7 переменным неудобно. <b>Список</b> — упорядоченный набор значений: как шкаф с пронумерованными полками, на каждой полке одно значение. В работе с данными это простейший вид столбца или набора записей. Список пишется в квадратных скобках, значения разделяются запятыми.</p>
<h3>Индекс: номер полки</h3>
<p>Список <code>sales = [120, 95, 140, 80]</code> устроен так:</p>
<table>
<tr><th>Индекс</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>
<tr><td>Значение</td><td>120</td><td>95</td><td>140</td><td>80</td></tr>
<tr><td>Отрицательный индекс</td><td>-4</td><td>-3</td><td>-2</td><td>-1</td></tr>
</table>
<p>Счёт начинается <b>с 0</b>. Отрицательный индекс считает с конца: <code>-1</code> — всегда последний элемент.</p>
<pre><code>sales = [120, 95, 140, 80]
print(sales[0])        # 120 (первый)
print(sales[-1])       # 80 (последний)
print(sales[1:3])      # [95, 140]
print(len(sales))      # 4
print(sum(sales), max(sales), min(sales))   # 435 140 80
print(sum(sales) / len(sales))              # 108.75</code></pre>
<p>Срез <code>sales[1:3]</code> берёт элементы с индекса 1 <b>до</b> индекса 3 (3 не входит). Если передать в <code>print</code> несколько значений через запятую, они выведутся в одну строку через пробел.</p>
<h3>Изменение и сортировка</h3>
<pre><code>sales.append(110)      # добавить в конец → [120, 95, 140, 80, 110]
sales.sort()           # сортировка на месте → [80, 95, 110, 120, 140]
print(sorted(sales, reverse=True))   # [140, 120, 110, 95, 80]

items = ["Термос", "Блокнот", "Рюкзак"]
items.sort()
print(items)           # ['Блокнот', 'Рюкзак', 'Термос']</code></pre>
<p>Тексты сортируются по алфавиту. <code>.sort()</code> меняет сам список, а <code>sorted()</code> возвращает новый список, старый не меняется.</p>
<h3>Сравнение с SQL</h3>
<table>
<tr><th>SQL</th><th>Python list</th></tr>
<tr><td><code>COUNT(*)</code></td><td><code>len(xs)</code></td></tr>
<tr><td><code>SUM</code>, <code>MAX</code>, <code>MIN</code></td><td><code>sum(xs)</code>, <code>max(xs)</code>, <code>min(xs)</code></td></tr>
<tr><td><code>AVG</code></td><td><code>sum(xs) / len(xs)</code></td></tr>
<tr><td><code>ORDER BY ... DESC</code></td><td><code>sorted(xs, reverse=True)</code></td></tr>
</table>
<div class="tip">Среднее по списку: <code>sum(xs) / len(xs)</code>. Отдельной <code>avg()</code> в Python нет, но есть <code>statistics.mean()</code>. Округление: <code>round(x, 2)</code>.</div>
<h3>Частые ошибки</h3>
<ul>
<li><b>Начинать индекс с 1.</b> В списке из 4 элементов нет <code>sales[4]</code> — будет <code>IndexError</code>. Последний — <code>sales[3]</code> или <code>sales[-1]</code>.</li>
<li><b>Писать <code>xs = xs.sort()</code>.</b> <code>.sort()</code> ничего не возвращает (<code>None</code>), и список теряется. Пишите просто <code>xs.sort()</code>.</li>
<li><b>Порядок казахских букв.</b> Python сравнивает буквы по их кодам, поэтому буквы вроде Ә, Қ, Ө, Ү иногда оказываются не там, где ожидаешь.</li>
</ul>`,
      ex: [
        { prompt: 'Даны продажи за неделю. Выведите в одну строку максимум, минимум и среднее (округлив до 2 знаков): <code>print(max_v, min_v, avg)</code>.', hints: ['<code>round(sum(sales) / len(sales), 2)</code>'] },
        { prompt: 'Добавьте в список <code>cities</code> город <code>"Ақтөбе"</code>, отсортируйте список по алфавиту и выведите его.', check: { tests: 'assert "Ақтөбе" in cities, "Ақтөбе должен быть в списке"\nassert cities == sorted(cities), "Список не отсортирован"' }, hints: ['<code>.append()</code>, затем <code>.sort()</code>.'] }
      ]
    },
    'py-7': {
      title: 'Цикл for и range',
      body: `
<p>Представьте кассира: он берёт товары из корзины по одному и сканирует каждый. Действие одно и то же, меняется только товар. Цикл <code>for</code> тоже выполняет одно и то же действие для каждого элемента списка. Будь там 3 товара или 3000, код не меняется.</p>
<pre><code>prices = [6500, 7200, 15000]
for p in prices:
    print(round(p * 1.12))</code></pre>
<pre><code>7280
8064
16800</code></pre>
<p>На каждом шаге переменная <code>p</code> получает следующее значение: сначала 6500, потом 7200, потом 15000. Строки с отступом (4 пробела) — тело цикла, они повторяются для каждого элемента. <code>round()</code> убирает «мусор» в дробных числах вроде <code>7280.000000000001</code>.</p>
<h3>range: последовательность чисел</h3>
<p><code>range(n)</code> — числа от 0 до n−1: <code>for i in range(3)</code> → 0, 1, 2. <code>range(1, 4)</code> → 1, 2, 3. Последнее число никогда не входит, поэтому «от 1 до N включительно» пишется как <code>range(1, N + 1)</code>. Внутри цикла удобно собирать строку через f-string: <code>print(f"День {i}")</code>.</p>
<h3>Накопитель (accumulator)</h3>
<p>Постепенно накапливать значение в цикле — самый частый шаблон. <b>Перед</b> циклом ставим <code>total = 0</code>, внутри прибавляем, в конце выводим:</p>
<pre><code>total = 0
for p in prices:
    if p &gt; 7000:
        total += p
print(total)   # 22200</code></pre>
<p>По шагам:</p>
<table>
<tr><th>Шаг</th><th>p</th><th>p &gt; 7000?</th><th>total после</th></tr>
<tr><td>1</td><td>6500</td><td>нет</td><td>0</td></tr>
<tr><td>2</td><td>7200</td><td>да</td><td>7200</td></tr>
<tr><td>3</td><td>15000</td><td>да</td><td>22200</td></tr>
</table>
<p>Это то же самое, что SQL-запрос <code>SELECT SUM(price) FROM products WHERE price &gt; 7000</code>. Условие может быть любым. Например, <code>%</code> — остаток от деления: <code>p % 1000 == 0</code> значит «делится на 1000 без остатка».</p>
<p><code>enumerate()</code> выдаёт индекс и значение вместе: <code>for i, p in enumerate(prices):</code> → (0, 6500), (1, 7200), (2, 15000).</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Писать <code>total = 0</code> внутри цикла.</b> Тогда он обнуляется на каждом шаге, и в конце остаётся только последнее значение.</li>
<li><b>Отступ у <code>print</code>.</b> Если <code>print(total)</code> стоит внутри цикла (с отступом), он выводит на каждом шаге. Если нужен только итог, пишите его без отступа.</li>
<li><b>Забыть про конец range.</b> <code>range(1, 5)</code> — это 1, 2, 3, 4. Пятёрки нет!</li>
</ul>`,
      ex: [
        { prompt: 'С помощью цикла посчитайте сумму только чётных чисел списка и выведите её.', hints: ['Чётное число: <code>n % 2 == 0</code>'] },
        { prompt: 'Для каждого числа от 1 до 5 (включительно) выведите строку в формате <code>i x 10 = результат</code>. Например, первая строка: <code>1 x 10 = 10</code>.', hints: ['<code>range(1, 6)</code> даёт числа от 1 до 5.'] }
      ]
    },
    'py-8': {
      title: 'while, break, continue',
      body: `
<p><code>while</code> повторяет, пока условие истинно. Его используют, когда заранее неизвестно, сколько будет повторений:</p>
<pre><code>balance = 100000
months = 0
while balance &lt; 150000:
    balance = balance * 1.05
    months += 1
print(months)   # 9</code></pre>
<p><code>break</code> — сразу останавливает цикл. <code>continue</code> — пропускает остаток тела и переходит к следующему шагу.</p>
<div class="tip">Если условие никогда не станет ложным, цикл будет бесконечным. На этой платформе код останавливается через 8 секунд.</div>
<h3>Разница между for и while</h3>
<p><code>for</code> перебирает известный список или диапазон чисел: «для каждого заказа». <code>while</code> продолжается, пока выполняется условие: «пока баланс не достигнет 150 000». Если число повторений известно заранее, выбирайте <code>for</code>: он проще и не грозит бесконечным циклом.</p>
<h3>Пример break и continue</h3>
<pre><code>amounts = [2500, 3100, -50, 4200, 0, 1800]
for a in amounts:
    if a == 0:
        break          # 0 — признак конца данных
    if a &lt; 0:
        continue       # пропускаем отрицательную сумму
    print(a)
# 2500, 3100, 4200</code></pre>
<p>Дойдя до 0, цикл полностью останавливается, поэтому 1800 не выводится. А −50 пропускается, и цикл переходит к следующему элементу.</p>
<div class="tip">Убедитесь, что внутри каждого цикла <code>while</code> меняется переменная, от которой зависит условие. В примере <code>balance</code> растёт на каждом шаге, поэтому цикл когда-нибудь закончится.</div>`,
      ex: [
        { prompt: 'У компании 1 000 пользователей. Каждый месяц их становится на 20% больше. Сколько месяцев нужно, чтобы пользователей стало больше 10 000? Выведите число месяцев.', hints: ['Условие: <code>while users <= 10000:</code>', 'Внутри цикла меняйте и <code>users</code>, и <code>months</code>.'] },
        { prompt: 'Найдите и выведите первое отрицательное число в списке, а затем остановите цикл с помощью <code>break</code>.' }
      ]
    },
    'py-9': {
      title: 'Функции',
      body: `
<p>Представьте кофемашину: вы засыпаете зёрна и наливаете воду (вход), нажимаете кнопку, и она даёт кофе (выход). Думать каждый раз о том, что происходит внутри, не нужно. <b>Функция</b> — именованный кусок кода, который можно использовать снова. Вместо того чтобы переписывать одну формулу в 10 местах, мы один раз кладём её в функцию. Она определяется через <code>def</code>, имена в скобках — <b>параметры</b> (вход), <code>return</code> возвращает результат (выход):</p>
<pre><code>def growth_pct(old, new):
    return (new - old) / old * 100

print(growth_pct(80, 100))   # 25.0</code></pre>
<p>Одну функцию вызываем с разными значениями. При вызове <code>old</code> получает первое значение, <code>new</code> — второе:</p>
<table>
<tr><th>Вызов</th><th>Вычисление</th><th>Возвращает</th></tr>
<tr><td><code>growth_pct(80, 100)</code></td><td>(100 − 80) / 80 × 100</td><td>25.0</td></tr>
<tr><td><code>growth_pct(100, 80)</code></td><td>(80 − 100) / 100 × 100</td><td>-20.0</td></tr>
<tr><td><code>growth_pct(200, 230)</code></td><td>(230 − 200) / 200 × 100</td><td>15.0</td></tr>
</table>
<p>В SQL вы пользовались готовыми функциями вроде <code>ROUND</code> и <code>SUM</code>. <code>def</code> — способ создать свою.</p>
<h3>Несколько return и if</h3>
<p>Как только выполняется <code>return</code>, функция <b>сразу заканчивается</b>. Поэтому внутри if/elif у каждой ветки может быть свой return — это CASE WHEN из SQL в виде функции. Точно так же можно заранее проверить ошибочный случай:</p>
<pre><code>def delivery_fee(amount):
    if amount &lt;= 0:
        return 0           # неверная сумма — сразу выходим
    if amount &gt;= 20000:
        return 0
    elif amount &gt;= 10000:
        return 1000
    return 1500

print(delivery_fee(25000), delivery_fee(12000), delivery_fee(5000))   # 0 1000 1500</code></pre>
<p>Если есть риск деления на ноль, поступаем так же: проверяем до деления и сразу делаем return.</p>
<h3>Значение по умолчанию</h3>
<pre><code>def with_vat(price, rate=0.12):
    return price * (1 + rate)

with_vat(1000)          # 1120.0
with_vat(1000, 0.2)     # 1200.0</code></pre>
<p>Если второе значение не передано, <code>rate</code> будет 0.12.</p>
<p><code>print</code> и <code>return</code> — разные вещи: print только выводит на экран, а return возвращает значение, чтобы его можно было использовать дальше. Проверочные тесты смотрят именно на <b>возвращённое</b> значение.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>print вместо return.</b> Функция выведет число на экран, но если написать <code>x = f(...)</code>, в <code>x</code> окажется <code>None</code>.</li>
<li><b>Забыть return.</b> Функция без return всегда возвращает <code>None</code>.</li>
<li><b>Код после return.</b> Он никогда не выполняется. Например, если после return написать <code>x = round(x, 2)</code>, округления не будет. Делайте это прямо в строке return: <code>return round(x, 2)</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Напишите функцию <code>conversion(visitors, buyers)</code>: пусть она возвращает конверсию в процентах, округлённую до 2 знаков. Если <code>visitors</code> равно 0, пусть возвращает 0.', check: { tests: 'assert conversion(400, 60) == 15.0, "conversion(400, 60) должна быть 15.0"\nassert conversion(1840, 46) == 2.5, "conversion(1840, 46) должна быть 2.5"\nassert conversion(0, 0) == 0, "если visitors равно 0, нужно вернуть 0"' }, hints: ['Сначала <code>if visitors == 0: return 0</code>.', '<code>return round(buyers / visitors * 100, 2)</code>'] },
        { prompt: 'Функция <code>segment(price)</code>: 100 000 и выше — вернуть <code>"қымбат"</code> (дорогой), 10 000 и выше — <code>"орташа"</code> (средний), иначе <code>"арзан"</code> (дешёвый). Возвращайте слова на казахском, как здесь.', check: { tests: 'assert segment(350000) == "қымбат", "350000 → қымбат"\nassert segment(100000) == "қымбат", "100000 → қымбат (граница)"\nassert segment(25000) == "орташа", "25000 → орташа"\nassert segment(9999) == "арзан", "9999 → арзан"' }, hints: ['Вспомните CASE WHEN из урока по SQL.'] }
      ]
    },
    'py-10': {
      title: 'Словари (dict)',
      body: `
<p><b>Словарь</b> — пары «ключ: значение». Им удобно описывать одну запись (например, одного клиента):</p>
<pre><code>customer = {"name": "Айгерім", "city": "Алматы", "orders": 3}
print(customer["city"])          # Алматы
customer["orders"] += 1
customer["vip"] = True
print(customer.get("phone", "нет"))   # значение по умолчанию, если ключа нет</code></pre>
<h3>Подсчёт через словарь</h3>
<p>Самый полезный шаблон — подсчёт по категориям (GROUP BY + COUNT в SQL):</p>
<pre><code>cities = ["Алматы", "Астана", "Алматы", "Шымкент", "Алматы"]
counts = {}
for c in cities:
    counts[c] = counts.get(c, 0) + 1
print(counts)   # {'Алматы': 3, 'Астана': 2 ...}</code></pre>
<p>Перебор ключей и значений: <code>for key, value in counts.items():</code></p>
<h3>Список словарей: таблица данных</h3>
<p>Если один словарь описывает одну запись, то список словарей описывает целую таблицу. Каждый словарь — одна строка, ключи — названия столбцов:</p>
<pre><code>orders = [
    {"id": 1, "city": "Алматы", "amount": 2500},
    {"id": 2, "city": "Астана", "amount": 3100},
    {"id": 3, "city": "Алматы", "amount": 1800},
]
revenue = {}
for o in orders:
    revenue[o["city"]] = revenue.get(o["city"], 0) + o["amount"]
print(revenue)   # {'Алматы': 4300, 'Астана': 3100}</code></pre>
<p>Это то же самое, что SQL-запрос <code>SELECT city, SUM(amount) ... GROUP BY city</code>.</p>
<h3>Частая ошибка</h3>
<p>Если прочитать несуществующий ключ через <code>d["phone"]</code>, возникнет <code>KeyError</code>. Если ключа может не быть, используйте <code>d.get("phone")</code> или <code>if "phone" in d:</code>.</p>`,
      ex: [
        { prompt: 'Посчитайте статусы заказов с помощью словаря, запишите результат в переменную <code>counts</code> и выведите её.', check: { tests: 'assert counts == {"delivered": 3, "shipped": 2, "cancelled": 1}, "словарь counts неверный: " + str(counts)' }, hints: ['<code>counts[s] = counts.get(s, 0) + 1</code>'] },
        { prompt: 'Цены товаров даны в словаре. Выведите товары дороже 10 000 в формате <code>название: цена</code> (в порядке словаря).', hints: ['<code>for name, price in prices.items():</code>'] }
      ]
    },
    'py-11': {
      title: 'List comprehension',
      body: `
<p>Короткая запись, чтобы сделать новый список из старого:</p>
<pre><code>prices = [6500, 7200, 15000, 1200]

# через цикл
with_vat = []
for p in prices:
    with_vat.append(p * 1.12)

# через comprehension
with_vat = [p * 1.12 for p in prices]

# с фильтром
expensive = [p for p in prices if p &gt; 7000]</code></pre>
<p>Шаблон: <code>[выражение for элемент in список if условие]</code>. Для словарей тоже есть: <code>{k: v for k, v in d.items() if v &gt; 0}</code>.</p>
<div class="tip">В pandas такие операции делаются сразу над столбцами, но comprehension помогает понять «язык» Python.</div>
<h3>Когда comprehension, а когда цикл?</h3>
<p>Comprehension хорош, когда из одного списка делают новый: преобразование или фильтрация. Если нужно несколько действий, <code>print</code> или сложное условие, обычный цикл <code>for</code> читать легче. Правило: если comprehension не помещается в одну строку, перепишите его циклом.</p>
<h3>Примеры</h3>
<pre><code>emails = ["A@MAIL.KZ ", "b@mail.kz"]
clean = [e.strip().lower() for e in emails]

dates = ["2024-11-02", "2024-10-30", "2024-11-15"]
nov = [d for d in dates if d.startswith("2024-11")]

prices = {"латте": 1500, "су": 300}
cheap = {k: v for k, v in prices.items() if v &lt; 1000}</code></pre>
<div class="tip">Если вместо списка нужна сумма, можно писать без квадратных скобок: <code>sum(p * 1.12 for p in prices)</code>. Так не создаётся промежуточный список.</div>`,
      ex: [
        { prompt: 'С помощью comprehension создайте список <code>clean</code> из имён списка <code>names</code> без пробелов и с заглавной буквы (<code>.strip().title()</code>). Выведите его.', check: { tests: 'assert clean == ["Айгерім", "Нұрлан", "Дана"], "список clean: " + str(clean)' }, hints: ['<code>[n.strip().title() for n in names]</code>'] },
        { prompt: 'С помощью comprehension соберите в список <code>nov</code> только даты ноября 2024 года (начинаются с <code>"2024-11"</code>) и выведите их количество.', check: { tests: 'assert nov == ["2024-11-04", "2024-11-09", "2024-11-21"], "список nov неверный"' }, hints: ['<code>d.startswith("2024-11")</code>'] }
      ]
    },
    'py-12': {
      title: 'Ошибки и try/except',
      body: `
<p>Реальные данные приходят «грязными»: текст вместо числа, пустые строки. Ошибка (exception) останавливает программу. Умение читать ошибки — важный навык:</p>
<pre><code>int("12a")
# ValueError: invalid literal for int() with base 10: '12a'</code></pre>
<p>Последняя строка говорит <b>тип</b> ошибки (ValueError) и её <b>причину</b>. Часто встречаются: <code>NameError</code> (нет такой переменной), <code>TypeError</code> (несовместимые типы: <code>"5" + 1</code>), <code>KeyError</code> (нет ключа в словаре), <code>ZeroDivisionError</code>, <code>IndentationError</code>.</p>
<h3>try / except</h3>
<pre><code>raw = ["120", "95", "n/a", "140"]
values = []
for r in raw:
    try:
        values.append(int(r))
    except ValueError:
        print("Пропущено:", r)
print(sum(values))   # 355</code></pre>
<div class="tip">Нельзя прятать все ошибки через <code>except:</code>. Указывайте конкретный тип ошибки, иначе не заметите настоящую проблему.</div>
<h3>Как читать traceback</h3>
<p>При ошибке Python показывает её «след» (traceback). Читаем его снизу вверх:</p>
<ol>
<li>Последняя строка — тип и причина ошибки.</li>
<li>Над ней — строка кода, где произошла ошибка, и её номер.</li>
<li>Строки выше — как мы туда попали (цепочка вызовов функций).</li>
</ol>
<h3>Вызываем ошибку сами</h3>
<p>Если в функцию пришло бессмысленное значение, лучше явно сообщить об ошибке, чем молча пропустить его:</p>
<pre><code>def conversion(visitors, buyers):
    if visitors &lt; 0 or buyers &lt; 0:
        raise ValueError("сандар теріс болмауы керек")  # «числа не должны быть отрицательными»
    return buyers / visitors * 100 if visitors else 0</code></pre>
<p><code>raise</code> сразу останавливает выполнение и сообщает причину. Тот, кто использует такую функцию, сразу увидит свою ошибку.</p>
<div class="tip">Оборачивайте в <code>try</code> только строку, где может возникнуть ошибка. Если обернуть в <code>try</code> весь код, будет трудно понять, где именно произошла ошибка.</div>`,
      ex: [
        { prompt: 'Соберите в <code>values</code> только те значения из списка <code>raw</code>, которые превращаются в число, в виде <code>float</code> (<code>try/except ValueError</code>). В конце выведите их сумму.', check: { tests: 'assert values == [12.5, 7.0, 30.5], "values: " + str(values)' }, hints: ['Внутри <code>except ValueError:</code> можно написать <code>pass</code>.'] },
        { prompt: 'Этот код выдаёт ошибку. Исправьте его, чтобы выводилось <code>Барлығы: 15</code>.', hints: ['<code>count</code> — текст: сначала сделайте <code>int()</code>.', 'Чтобы прибавить результат к тексту, нужен <code>str()</code> или f-string.'] }
      ]
    },
    'py-13': {
      title: 'Мини-проект: анализ продаж магазина',
      body: `
<p>Теперь соберём всё изученное в один анализ. Продажи магазина даны в виде CSV-текста. Модуль <code>csv</code> превращает его в список словарей:</p>
<pre><code>import csv, io
rows = list(csv.DictReader(io.StringIO(data)))
print(rows[0])   # {'date': '2024-09-01', 'city': 'Алматы', ...}</code></pre>
<p>Обратите внимание: все значения из CSV — это <b>текст</b>. Числа нужно преобразовать через <code>int()</code>.</p>
<h3>Задания</h3>
<ol>
<li>Общая выручка (<code>qty × price</code>).</li>
<li>Выручка по городам (словарь).</li>
<li>Город с наибольшей выручкой.</li>
</ol>
<p>Это Python-версия <code>SUM</code>, <code>GROUP BY</code> и <code>ORDER BY ... LIMIT 1</code> из SQL. В следующем модуле pandas сделает это в одну-две строки.</p>
<h3>Разбейте анализ на шаги</h3>
<p>Не пишите большую задачу в одной функции. Напишите отдельную функцию на каждый вопрос и соедините их:</p>
<pre><code>def total_revenue(rows): ...
def revenue_by_city(rows): ...
def top_city(rows): ...</code></pre>
<p>Каждую функцию можно проверить отдельно, а внутри <code>top_city</code> можно повторно использовать результат <code>revenue_by_city</code>.</p>
<h3>Поиск наибольшего значения</h3>
<p>Чтобы найти ключ с наибольшим значением в словаре: <code>max(d, key=d.get)</code>. <code>max</code> перебирает ключи и сравнивает каждый через <code>d.get</code>.</p>
<h3>Проверка результата</h3>
<p>Сумма выручки по городам должна равняться общей выручке. Такое «контрольное равенство» — важная привычка аналитика: если числа не сходятся, где-то потерялась строка или что-то посчитано дважды.</p>`,
      ex: [
        { prompt: 'Напишите функцию <code>total_revenue(rows)</code>: пусть она возвращает сумму <code>qty × price</code> по всем строкам (int).', check: { tests: 'assert total_revenue(rows) == 188000, "Общая выручка должна быть 188000, у вас: " + str(total_revenue(rows))\nassert total_revenue([]) == 0, "Для пустого списка верните 0"' }, hints: ['Преобразуйте текст в число: <code>int(r["qty"])</code>.'] },
        { prompt: 'Функция <code>revenue_by_city(rows)</code> пусть возвращает словарь город → выручка. Затем <code>best_city(rows)</code> пусть возвращает название города с наибольшей выручкой.', check: { tests: 'r = revenue_by_city(rows)\nassert r == {"Алматы": 69000, "Астана": 104000, "Шымкент": 15000}, "revenue_by_city: " + str(r)\nassert best_city(rows) == "Астана", "best_city должна быть Астана"' }, hints: ['Используйте шаблон <code>.get(key, 0)</code> из урока про подсчёт через словарь.', 'Ключ с наибольшим значением: <code>max(rev, key=rev.get)</code>.'] }
      ]
    },
    'py-gate': {
      title: 'Экзамен модуля: Python Fundamentals',
      body: `
<p>Итоговая проверка: три задания без подсказок. Если пройдёте все, до уровня <b>L3 Python for Data</b> останется один шаг (следующий — pandas).</p>
<div class="tip">Проверяется значение, которое функция <b>возвращает</b>. print не обязателен.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>median(xs)</code> (без модуля statistics): пусть она возвращает медиану списка чисел. При чётной длине — среднее двух центральных значений.', check: { tests: 'assert median([7, 1, 9, 3, 100]) == 7, "median([7,1,9,3,100]) = 7"\nassert median([2, 8, 4, 6]) == 5, "median([2,8,4,6]) = 5"\nassert median([5]) == 5, "Один элемент: этот же элемент"\nimport random\nxs = [3, 1, 2]\nmedian(xs)\nassert xs == [3, 1, 2], "Функция не должна менять переданный список: используйте sorted()"' } },
        { prompt: '<code>clean_phones(raw)</code>: оставьте в номерах телефонов только цифры и верните только те, в которых 11 цифр и которые начинаются с 7 (сохраняя порядок).', check: { tests: 'assert clean_phones(["+7 (701) 123-45-67", "8 702 000 11 22", "77015556677", "12345"]) == ["77011234567", "77015556677"], "Результат: " + str(clean_phones(["+7 (701) 123-45-67", "8 702 000 11 22", "77015556677", "12345"]))\nassert clean_phones([]) == [], "Пустой список"' } },
        { prompt: '<code>top_products(orders, n)</code>: <code>orders</code> — список кортежей <code>(product, qty)</code>. Посчитайте общее количество по каждому товару и верните список названий <code>n</code> самых продаваемых товаров по убыванию.', check: { tests: 'orders = [("Термос", 2), ("Блокнот", 10), ("Рюкзак", 1), ("Термос", 3), ("Рюкзак", 2), ("Құлаққап", 4)]\nassert top_products(orders, 2) == ["Блокнот", "Термос"], "top 2: " + str(top_products(orders, 2))\nassert top_products(orders, 1) == ["Блокнот"], "top 1 неверный"\nassert top_products([], 3) == [], "Пустой список"' } }
      ]
    }
  }
});
