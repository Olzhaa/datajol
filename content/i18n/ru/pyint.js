// PY2 Intermediate Python: Russian text. Code, solutions and expected output are in content/pyint.js.
DJ.i18n.patch({
  modules: {
    'py-2': { intro: 'Следующий шаг после основ Python: кортежи и множества, гибкие функции, классы и наследование, файлы и JSON, генераторы, декораторы и стандартная библиотека. Примеры — игры, магазин, студенты и банковский счёт; в конце вы сами соберёте текстовую банковскую систему.' }
  },
  lessons: {
    'pyi-1': {
      title: 'Кортеж (tuple) и множество (set)',
      body: `
<p>В курсе основ вы изучили список (list) и словарь (dict). В Python есть ещё две важные коллекции: <b>кортеж</b> (tuple) и <b>множество</b> (set).</p>
<h3>Tuple: неизменяемый список</h3>
<p>Кортеж пишется в круглых скобках. После создания его элементы нельзя менять, добавлять или удалять. Поэтому он удобен для значений, которые «ходят вместе»: координата, дата (год, месяц, день), имя игрока и его очки.</p>
<pre><code>point = (3, 7)
player = ("Айгерім", 1450)
print(point[0])        # 3
# point[0] = 5         # TypeError: кортеж нельзя изменить

name, score = player   # unpacking: раскладываем значения по переменным
print(name, score)     # Айгерім 1450

a, b = 1, 2
a, b = b, a            # обмен двух переменных в одну строку
print(a, b)            # 2 1</code></pre>
<p>Когда функция возвращает несколько значений (<code>return mn, mx</code>), на самом деле она возвращает один кортеж. В кортеже из одного элемента запятая обязательна: <code>(5,)</code>. Так как кортеж неизменяем, его можно использовать как ключ словаря: <code>{(0, 0): "старт"}</code>.</p>
<h3>Set: неповторяющиеся элементы</h3>
<p>Множество пишется в фигурных скобках и хранит каждое значение только один раз. На порядок полагаться нельзя, индексов нет. Зато проверка <code>in</code> очень быстрая.</p>
<pre><code>tags = {"python", "ойын", "python"}
print(len(tags))                   # 2: повтор удалён
unique = set([3, 1, 3, 2, 1])      # {1, 2, 3}

chess = {"Әли", "Дана", "Ерлан"}
football = {"Ерлан", "Мадина", "Әли"}
print(chess & football)   # в обоих: {'Әли', 'Ерлан'}
print(chess | football)   # все вместе (объединение)
print(chess - football)   # только в шахматах: {'Дана'}
print(chess ^ football)   # только в одном из них</code></pre>
<p>Добавляете в множество через <code>.add(x)</code>, удаляете через <code>.discard(x)</code>. Пустое множество создаётся только через <code>set()</code>: <code>{}</code> — это пустой <b>словарь</b>.</p>
<div class="tip">Что когда выбирать? Важен порядок и коллекция меняется — <code>list</code>. Небольшая неизменяемая группа — <code>tuple</code>. Уникальность и вопрос «есть ли?» — <code>set</code>. Ключ → значение — <code>dict</code>.</div>`,
      ex: [
        { prompt: 'Разложите кортеж <code>player</code> через unpacking в переменные <code>name</code>, <code>level</code>, <code>coins</code>. Затем поменяйте местами значения <code>a</code> и <code>b</code> в одну строку.', starter: 'player = ("Нұрлан", 12, 340)\na, b = 10, 20\n# пишите здесь\n', hints: ['<code>name, level, coins = player</code>', 'Обмен: <code>a, b = b, a</code>'], check: { tests: `assert name == "Нұрлан" and level == 12 and coins == 340, "name, level, coins нужно взять из кортежа"\nassert (a, b) == (20, 10), "Поменяйте a и b местами: a=20, b=10"` } },
        { prompt: 'В школе два кружка. С помощью операций над множествами вычислите три переменные: <code>both</code> — те, кто ходит в оба кружка, <code>only_chess</code> — те, кто ходит только на шахматы, <code>everyone</code> — все, кто ходит хотя бы в один кружок.', hints: ['Пересечение — <code>&</code>, разность — <code>-</code>, объединение — <code>|</code>.', '<code>both = chess & robotics</code>'], check: { tests: `assert both == {"Ерлан", "Әли"}, "both: пересечение двух множеств (&)"\nassert only_chess == {"Дана", "Сая"}, "only_chess: chess - robotics"\nassert everyone == {"Әли", "Дана", "Ерлан", "Сая", "Мадина", "Тимур"}, "everyone: объединение (|)"` } },
        { prompt: 'Названия городов в заказах магазина повторяются. Запишите в переменную <code>unique_cities</code> количество уникальных городов (через set).', hints: ['<code>set(cities)</code> убирает повторы.', '<code>len(set(cities))</code>'], check: { tests: `assert unique_cities == 4, "Уникальных городов должно быть 4: len(set(cities))"` } },
        { prompt: 'Что вернёт <code>type(x)</code> после строки <code>x = {}</code>?', options: ['set', 'dict', 'tuple', 'list'], explain: 'Пустые фигурные скобки — это пустой словарь. Пустое множество создаётся только через <code>set()</code>.' }
      ]
    },
    'pyi-2': {
      title: 'Гибкие функции: default, *args, **kwargs, lambda',
      body: `
<p>В основах вы писали функцию через <code>def</code> и передавали ей ровно нужные аргументы. В реальных программах функция должна быть гибкой: некоторые аргументы необязательны, а иногда их количество заранее неизвестно.</p>
<h3>Значение по умолчанию (default argument)</h3>
<pre><code>def greet(name, greeting="Сәлем"):
    return f"{greeting}, {name}!"

print(greet("Дана"))                 # Сәлем, Дана!
print(greet("Дана", "Қайырлы таң"))  # Қайырлы таң, Дана!
print(greet(greeting="Hi", name="Ali"))  # именованные (keyword) аргументы</code></pre>
<p>Параметры со значением по умолчанию стоят <b>после</b> обязательных параметров.</p>
<h3>*args: любое число позиционных аргументов</h3>
<pre><code>def total(*prices):
    # prices — кортеж: (1200, 800, 450)
    return sum(prices)

print(total(1200, 800, 450))   # 2450
print(total())                 # 0</code></pre>
<h3>**kwargs: любые именованные аргументы</h3>
<pre><code>def make_order(item, **options):
    # options — словарь: {'size': 'L', 'color': 'қара'}
    parts = [f"{k}={v}" for k, v in options.items()]
    return item + " (" + ", ".join(parts) + ")"

print(make_order("Футболка", size="L", color="қара"))
# Футболка (size=L, color=қара)</code></pre>
<p>Звёздочка также используется, чтобы «распаковать» список при вызове: <code>total(*[100, 200])</code> — то же самое, что <code>total(100, 200)</code>; <code>f(**{"a": 1})</code> — то же, что <code>f(a=1)</code>.</p>
<h3>lambda: функция в одну строку</h3>
<pre><code>double = lambda x: x * 2
print(double(21))     # 42
add = lambda a, b: a + b</code></pre>
<p>Внутри <code>lambda</code> только одно выражение, <code>return</code> не пишется. Чаще всего её используют, чтобы передать другой функции правило «как сортировать» (в следующем уроке).</p>
<div class="tip"><b>Ловушка:</b> не задавайте изменяемый объект (<code>[]</code>, <code>{}</code>) как значение по умолчанию. В <code>def add(x, items=[])</code> список создаётся один раз и становится общим для всех вызовов. Правильно: <code>items=None</code>, а внутри <code>if items is None: items = []</code>.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>greet(name, greeting="Сәлем")</code> (сәлем — «привет»): пусть она возвращает строку <code>"&lt;greeting&gt;, &lt;name&gt;!"</code>. Например, <code>greet("Дана")</code> → <code>"Сәлем, Дана!"</code>.', hints: ['Значение по умолчанию для параметра: <code>greeting="Сәлем"</code>.', '<code>return f"{greeting}, {name}!"</code>'], check: { tests: `assert greet("Дана") == "Сәлем, Дана!", "greet('Дана') должна вернуть 'Сәлем, Дана!'"\nassert greet("Ерлан", "Қайырлы кеш") == "Қайырлы кеш, Ерлан!", "Второй аргумент должен попасть в greeting"` } },
        { prompt: 'Касса магазина: напишите функцию <code>checkout(*prices, discount=0)</code>. Пусть она складывает все цены, применяет скидку <code>discount</code> процентов и возвращает результат через <code>round(..., 2)</code>. <code>checkout(1000, 500, discount=10)</code> → <code>1350.0</code>.', hints: ['<code>*prices</code> — все позиционные аргументы собираются в кортеж.', '<code>sum(prices) * (1 - discount / 100)</code>'], check: { tests: `assert checkout(1000, 500, discount=10) == 1350.0, "checkout(1000, 500, discount=10) должно быть 1350.0"\nassert checkout(200, 300, 500) == 1000, "Без скидки: сумма цен"\nassert checkout() == 0, "Если товаров нет, 0"` } },
        { prompt: 'Напишите функцию <code>describe(name, **info)</code>. Пусть она сортирует ключи <code>info</code> по алфавиту и возвращает строку вида <code>"Айгерім: age=19; city=Алматы"</code>. Если <code>info</code> пуст, пусть возвращает только имя: <code>"Айгерім"</code>.', hints: ['<code>**info</code> собирает именованные аргументы в словарь.', '<code>"; ".join([f"{k}={info[k]}" for k in sorted(info)])</code>'], check: { tests: `assert describe("Айгерім", city="Алматы", age=19) == "Айгерім: age=19; city=Алматы", "Ключи в алфавитном порядке: age, city"\nassert describe("Тимур") == "Тимур", "Если info пуст, верните только имя"` } },
        { prompt: '<code>def f(*args, **kwargs): return args, kwargs</code>. Что вернёт <code>f(1, 2, x=3)</code>?', options: ['<code>([1, 2], {"x": 3})</code>', '<code>((1, 2), {"x": 3})</code>', '<code>((1, 2, 3), {})</code>', 'TypeError'], explain: '<code>*args</code> собирает позиционные аргументы в <b>кортеж</b>, а <code>**kwargs</code> — именованные аргументы в <b>словарь</b>.' }
      ]
    },
    'pyi-3': {
      title: 'sorted, min, max (key) и map, filter, zip, enumerate',
      body: `
<p>В Python есть готовые функции для работы с коллекциями. Они сокращают циклы и делают код легче для чтения.</p>
<h3>key: «по чему сравнивать?»</h3>
<p>В функции <code>sorted</code>, <code>min</code>, <code>max</code> можно передать <code>key</code>. Это функция, которая из каждого элемента достаёт значение для сравнения.</p>
<pre><code>players = [("Әли", 820), ("Дана", 1450), ("Ерлан", 990)]

ranking = sorted(players, key=lambda p: p[1], reverse=True)
# [('Дана', 1450), ('Ерлан', 990), ('Әли', 820)]
best = max(players, key=lambda p: p[1])     # ('Дана', 1450)
shortest = min(["алма", "жүзім", "өрік"], key=len)   # 'алма'</code></pre>
<p>Чтобы сортировать по нескольким признакам, key возвращает кортеж: <code>key=lambda s: (-s["grade"], s["name"])</code> — сначала по оценке по убыванию, а при равенстве по имени.</p>
<h3>enumerate и zip</h3>
<pre><code>names = ["Әли", "Дана", "Ерлан"]
for i, name in enumerate(names, start=1):
    print(i, name)          # 1 Әли, 2 Дана, 3 Ерлан

scores = [820, 1450, 990]
for name, score in zip(names, scores):
    print(name, score)
table = dict(zip(names, scores))   # {'Әли': 820, 'Дана': 1450, 'Ерлан': 990}</code></pre>
<p><code>zip</code> «сшивает» несколько списков и останавливается, когда заканчивается самый короткий.</p>
<h3>map и filter</h3>
<pre><code>prices = [1200, 450, 3000]
with_tax = list(map(lambda p: p * 1.12, prices))     # функция к каждому элементу
cheap = list(filter(lambda p: p < 1000, prices))    # подходящие под условие: [450]</code></pre>
<p><code>map</code> и <code>filter</code> возвращают не список, а «ленивый» итератор (об итераторах позже). Чтобы увидеть результат, нужно обернуть его в <code>list(...)</code>. Часто list comprehension записывает то же самое понятнее: <code>[p * 1.12 for p in prices]</code>. Выбирайте то, что понятнее.</p>
<div class="tip"><code>sorted(xs)</code> возвращает новый список, а <code>xs.sort()</code> меняет сам список. Оба принимают <code>key</code> и <code>reverse</code>.</div>`,
      ex: [
        { prompt: 'Игровой рейтинг. <code>ranking</code> — список игроков, отсортированный по очкам по убыванию; <code>best_name</code> — имя игрока, набравшего больше всего очков (через <code>max</code> и <code>key</code>).', hints: ['<code>sorted(players, key=lambda p: p[1], reverse=True)</code>', '<code>max(...)</code> возвращает кортеж, до имени добираетесь через <code>[0]</code>.'], check: { tests: `assert ranking == [("Дана", 1450), ("Сая", 1210), ("Ерлан", 990), ("Әли", 820)], "ranking должен быть отсортирован по очкам по убыванию"\nassert best_name == "Дана", "best_name — имя игрока с наибольшим числом очков"` } },
        { prompt: 'Результаты экзамена. Через <code>zip</code> постройте словарь <code>results</code> (имя → балл). Затем через <code>filter</code> соберите в список <code>passed</code> имена тех, кто набрал 50 баллов и выше (в исходном порядке).', hints: ['<code>dict(zip(names, scores))</code>', '<code>list(filter(lambda n: results[n] >= 50, names))</code>'], check: { tests: `assert results == {"Әли": 45, "Дана": 88, "Ерлан": 50, "Мадина": 39}, "results = dict(zip(names, scores))"\nassert passed == ["Дана", "Ерлан"], "passed: набравшие 50 баллов и выше, в исходном порядке"` } },
        { prompt: 'С помощью <code>enumerate</code> постройте список <code>lines</code>: <code>["1. Нан", "2. Сүт", "3. Ірімшік"]</code> (хлеб, молоко, сыр). Нумерация начинается с 1.', hints: ['<code>enumerate(shopping, start=1)</code> даёт пары: (1, "Нан"), ...', '<code>f"{i}. {item}"</code>'], check: { tests: `assert lines == ["1. Нан", "2. Сүт", "3. Ірімшік"], "lines должен быть ровно таким: ['1. Нан', '2. Сүт', '3. Ірімшік']"` } },
        { prompt: 'Что выведет <code>print(map(str.upper, ["a", "b"]))</code>?', options: ['<code>["A", "B"]</code>', '<code>AB</code>', '<code>&lt;map object at 0x...&gt;</code>', 'Ошибка'], explain: '<code>map</code> возвращает ленивый итератор. Чтобы увидеть значения, нужно написать <code>list(map(...))</code>.' }
      ]
    },
    'pyi-4': {
      title: 'Dict и set comprehension',
      body: `
<p>Вы знаете list comprehension: <code>[x * 2 for x in xs]</code>. Такая же запись есть и для словарей, и для множеств. Она решает задачу «сделать из одной коллекции другую» в одну строку.</p>
<h3>Dict comprehension</h3>
<p>Форма: <code>{ключ: значение for элемент in коллекция if условие}</code>.</p>
<pre><code>prices = {"Нан": 250, "Сүт": 520, "Ірімшік": 2400, "Шай": 1300}

# Добавить ко всем ценам 12% НДС
with_vat = {name: round(p * 1.12) for name, p in prices.items()}

# Только дешевле 1000 ₸
cheap = {name: p for name, p in prices.items() if p < 1000}
# {'Нан': 250, 'Сүт': 520}

# Словарь из списка: слово → длина
words = ["алма", "жүзім", "қарбыз"]
lengths = {w: len(w) for w in words}   # {'алма': 4, 'жүзім': 5, 'қарбыз': 6}

# Поменять местами ключ и значение (если значения не повторяются)
codes = {"ALA": "Алматы", "NQZ": "Астана"}
by_city = {city: code for code, city in codes.items()}</code></pre>
<p>Главный инструмент — <code>.items()</code>: он даёт пары <code>(ключ, значение)</code>, которые мы сразу раскладываем в две переменные (unpacking из прошлого урока).</p>
<h3>Set comprehension</h3>
<p>Форма такая же, но без двоеточия: <code>{выражение for элемент in коллекция}</code>. Повторы в результате удаляются сами.</p>
<pre><code>emails = ["ali@mail.kz", "dana@gmail.com", "erlan@mail.kz"]
domains = {e.split("@")[1] for e in emails}   # {'mail.kz', 'gmail.com'}

names = ["Әли", "Арман", "Дана", "Ерлан", "Динара"]
letters = {n[0] for n in names}               # {'Ә', 'А', 'Д', 'Е'}</code></pre>
<h3>Условное значение</h3>
<p>В части значения можно использовать выражение <code>if ... else</code>:</p>
<pre><code>grades = {"Әли": 45, "Дана": 88, "Ерлан": 67}
status = {n: ("өтті" if g >= 50 else "құлады") for n, g in grades.items()}</code></pre>
<div class="tip"><code>if</code> в конце comprehension — это <b>фильтр</b> (убирает элемент). <code>a if условие else b</code> внутри значения — это <b>выбор</b> (элемент остаётся, меняется только значение). Не путайте их. А если логика сложнее 2–3 условий, лучше написать обычный цикл <code>for</code>: его легче читать.</div>`,
      ex: [
        { prompt: 'С помощью dict comprehension постройте словарь <code>discounted</code>: цена каждого товара снижена на 20% (<code>int(p * 0.8)</code>).', hints: ['<code>for name, p in prices.items()</code>', '<code>{name: int(p * 0.8) for name, p in prices.items()}</code>'], check: { tests: `assert discounted == {"Кітап": 3600, "Қалам": 240, "Дәптер": 520}, "Каждая цена должна быть int(p * 0.8)"` } },
        { prompt: 'Даны баллы студентов. Создайте две переменные: <code>honors</code> — только те, кто набрал 90 и выше (имя → балл, dict comprehension), <code>groups</code> — множество уникальных групп, в которых учатся студенты (set comprehension).', hints: ['<code>{s["name"]: s["score"] for s in students if ...}</code>', 'Set: <code>{s["group"] for s in students}</code>'], check: { tests: `assert honors == {"Әли": 92, "Ерлан": 95}, "honors: только студенты со score >= 90"\nassert groups == {"IT-21", "IT-22", "IT-23"}, "groups: уникальные названия групп"` } },
        { prompt: 'Дан словарь игровых клавиш <code>keys</code> (действие → клавиша). Поменяйте местами ключ и значение и постройте словарь <code>by_key</code> (клавиша → действие). Затем постройте словарь <code>status</code>: для каждого игрока из <code>scores</code> — <code>"pro"</code>, если очков больше 1000, иначе <code>"new"</code>.', hints: ['Обмен: <code>{k: action for action, k in keys.items()}</code>', 'Выбор: <code>"pro" if s > 1000 else "new"</code>'], check: { tests: `assert by_key == {"W": "jump", "A": "left", "D": "right", "Space": "fire"}, "by_key: клавиша → действие"\nassert status == {"Әли": "new", "Дана": "pro", "Тимур": "pro"}, "status: pro, если больше 1000, иначе new"` } },
        { prompt: 'Каков результат выражения <code>{len(w) for w in ["ит", "мысық", "ат", "сиыр"]}</code>?', options: ['<code>[2, 5, 2, 4]</code>', '<code>{2, 5, 4}</code>', '<code>{"ит": 2, "мысық": 5, "ат": 2, "сиыр": 4}</code>', '<code>{2, 5, 2, 4}</code>'], explain: 'Двоеточия нет, значит, это set comprehension. Множество хранит повторяющуюся 2 только один раз.' }
      ]
    },
    'pyi-5': {
      title: 'Рекурсия',
      body: `
<p><b>Рекурсия</b> — это когда функция вызывает саму себя. Её применяют там, где большую задачу можно разбить на такую же, но меньшую: открываете матрёшку — внутри ещё одна матрёшка, а дойдя до самой маленькой, останавливаетесь.</p>
<h3>Две обязательные части</h3>
<ul>
<li><b>Базовый случай</b> (base case) — самый простой случай, ответ на который известен сразу. Без него функция будет вызываться бесконечно.</li>
<li><b>Рекурсивный шаг</b> — уменьшить задачу и вызвать саму функцию.</li>
</ul>
<pre><code>def factorial(n):
    if n <= 1:                    # базовый случай
        return 1
    return n * factorial(n - 1)   # рекурсивный шаг

print(factorial(5))   # 120</code></pre>
<p>Что происходит? <code>factorial(5)</code> = 5 × <code>factorial(4)</code> = 5 × 4 × <code>factorial(3)</code> = … = 5 × 4 × 3 × 2 × 1. Каждый вызов ждёт свой результат в «стеке», а когда доходим до базового случая, ответы собираются в обратном порядке.</p>
<h3>Пример: сумма цифр числа</h3>
<pre><code>def digit_sum(n):
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)

print(digit_sum(2026))   # 2 + 0 + 2 + 6 = 10</code></pre>
<h3>Где рекурсия действительно удобна?</h3>
<p>В древовидных структурах: папки внутри папок, списки внутри списков, меню внутри меню. Здесь цикл написать трудно, а рекурсия естественна:</p>
<pre><code>def count_files(folder):
    # folder — список: внутри имена файлов (str) или вложенные папки (list)
    total = 0
    for item in folder:
        if isinstance(item, list):
            total += count_files(item)   # «заходим» во вложенную папку
        else:
            total += 1
    return total

disk = ["a.txt", ["b.png", "c.png", ["d.mp3"]], "e.pdf"]
print(count_files(disk))   # 5</code></pre>
<div class="tip">Python ограничивает глубину рекурсии (обычно ~1000). Если слишком глубоко — <code>RecursionError</code>. Для простого счёта хватает цикла; приберегите рекурсию для древовидных данных и алгоритмов «разделяй и властвуй». Кроме того, наивная рекурсия вроде <code>fib(n) = fib(n-1) + fib(n-2)</code> снова и снова решает одну и ту же задачу, поэтому работает медленно.</div>`,
      ex: [
        { prompt: 'Напишите рекурсивную функцию <code>power(base, exp)</code>: пусть она возводит <code>base</code> в степень <code>exp</code> (<code>exp</code> ≥ 0). Не используйте оператор <code>**</code> и циклы: <code>power(b, 0) = 1</code>, <code>power(b, e) = b * power(b, e - 1)</code>.', hints: ['Базовый случай: <code>if exp == 0: return 1</code>', 'Рекурсивный шаг: <code>return base * power(base, exp - 1)</code>'], check: { tests: `assert power(2, 10) == 1024, "power(2, 10) должно быть 1024"\nassert power(7, 0) == 1, "Любое число в степени 0 равно 1"\nassert "power" in power.__code__.co_names, "Функция должна вызывать саму себя (рекурсия)"` } },
        { prompt: 'Каталог магазина состоит из вложенных списков. Напишите рекурсивную функцию <code>flatten(items)</code>: пусть она превращает список любой глубины в один плоский список, сохраняя порядок. <code>flatten([1, [2, [3, 4]], 5])</code> → <code>[1, 2, 3, 4, 5]</code>.', hints: ['Для каждого элемента: если это список — сделайте <code>extend</code> результатом <code>flatten(x)</code>, иначе <code>append</code>.', '<code>isinstance(x, list)</code>'], check: { tests: `assert flatten([1, [2, [3, 4]], 5]) == [1, 2, 3, 4, 5], "flatten([1, [2, [3, 4]], 5]) → [1, 2, 3, 4, 5]"\nassert flatten(["Телефон", ["Чехол", ["Әйнек", []]], "Зарядтағыш"]) == ["Телефон", "Чехол", "Әйнек", "Зарядтағыш"], "Пустые вложенные списки должны просто исчезнуть"\nassert flatten([]) == [], "Пустой список → пустой список"` } },
        { prompt: 'Наивный Фибоначчи: <code>def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)</code>. Сколько всего раз вызывается функция <code>fib</code> при вызове <code>fib(4)</code> (включая первый вызов)?', explain: 'C(0)=C(1)=1, C(n)=1+C(n−1)+C(n−2): C(2)=3, C(3)=5, C(4)=1+5+3=9. Поэтому наивная рекурсия быстро замедляется.' },
        { prompt: 'Что будет, если в рекурсивной функции нет базового случая?', options: ['Функция вернёт 0', 'Python сам превратит её в цикл', 'Вызовы не остановятся, и в итоге возникнет RecursionError', 'Ничего: базовый случай необязателен'], explain: 'Без базового случая функция вызывает себя бесконечно; дойдя до предела глубины, Python выдаёт <code>RecursionError</code>.' }
      ]
    },
    'pyi-6': {
      title: 'Классы и объекты',
      body: `
<p>До сих пор данные (словари, списки) и функции, которые их обрабатывают, жили отдельно. <b>Класс</b> объединяет их: состояние «вещи» (attributes) и её действия (methods) находятся в одном месте. Класс — это чертёж, а <b>объект</b> (instance) — конкретная вещь, сделанная по этому чертежу.</p>
<h3>Первый класс</h3>
<pre><code>class Student:
    school = "№25 мектеп"            # атрибут класса: общий для всех студентов

    def __init__(self, name, grade):
        self.name = name               # атрибуты объекта
        self.grade = grade
        self.marks = []

    def add_mark(self, mark):          # метод (method)
        self.marks.append(mark)

    def average(self):
        if not self.marks:
            return 0
        return sum(self.marks) / len(self.marks)

    def __str__(self):
        return f"{self.name} ({self.grade}-сынып)"

    def __repr__(self):
        return f"Student({self.name!r}, {self.grade})"

ali = Student("Әли", 9)       # вызывается __init__
ali.add_mark(5); ali.add_mark(4)
print(ali.average())           # 4.5
print(ali)                     # Әли (9-сынып)  ← __str__
print([ali])                   # [Student('Әли', 9)]  ← __repr__
print(ali.school)              # №25 мектеп</code></pre>
<h3>Основные понятия</h3>
<ul>
<li><code>__init__</code> — конструктор: выполняется один раз при создании объекта и задаёт начальное состояние.</li>
<li><code>self</code> — «сам этот объект». Первый параметр каждого метода. <code>ali.add_mark(5)</code> на самом деле означает <code>Student.add_mark(ali, 5)</code>.</li>
<li><b>Атрибут объекта</b> (<code>self.name</code>) у каждого объекта свой. <b>Атрибут класса</b> (<code>school</code>) принадлежит классу и общий для всех; если изменить его через <code>Student.school</code>, он изменится у всех.</li>
<li><code>__str__</code> — красивый текст для человека (<code>print</code>, <code>str()</code>). <code>__repr__</code> — точное описание для разработчика (консоль, отображение внутри списка).</li>
</ul>
<div class="tip">Чтобы изменить атрибут класса, пишите <code>ClassName.count += 1</code>, а не <code>self.count += 1</code>. Иначе Python создаст у объекта <b>новый</b> атрибут, а общее значение не изменится.</div>`,
      ex: [
        { prompt: 'Напишите класс <code>Product</code>: <code>__init__(self, name, price, qty)</code> сохраняет три атрибута; метод <code>total()</code> возвращает <code>price * qty</code>; <code>__str__</code> возвращает такую строку: <code>"Ноутбук: 350000 ₸ x 2"</code>.', hints: ['<code>self.name = name</code> и так далее.', '<code>return f"{self.name}: {self.price} ₸ x {self.qty}"</code>'], check: { tests: `_p = Product("Ноутбук", 350000, 2)\nassert _p.name == "Ноутбук" and _p.price == 350000 and _p.qty == 2, "__init__ должен сохранять name, price, qty"\nassert _p.total() == 700000, "total() = price * qty"\nassert str(_p) == "Ноутбук: 350000 ₸ x 2", "Формат __str__: 'Ноутбук: 350000 ₸ x 2'"` } },
        { prompt: 'Класс <code>Player</code>: атрибут класса <code>count = 0</code> считает число созданных игроков (растёт на 1 в каждом <code>__init__</code>). У каждого игрока есть <code>name</code> и <code>hp = 100</code>. Метод <code>take_damage(amount)</code> уменьшает <code>hp</code>, но не ниже 0. <code>is_alive()</code> — <code>hp > 0</code>.', hints: ['Увеличивайте атрибут класса через <code>Player.count += 1</code>.', '<code>self.hp = max(0, self.hp - amount)</code>'], check: { tests: `_c0 = Player.count\n_a = Player("Әли"); _b = Player("Дана")\nassert Player.count == _c0 + 2, "Каждый новый игрок должен увеличивать Player.count на 1"\nassert _a.hp == 100, "Начальное hp = 100"\n_a.take_damage(30)\nassert _a.hp == 70 and _b.hp == 100, "take_damage уменьшает hp только у этого игрока"\n_a.take_damage(500)\nassert _a.hp == 0, "hp не должно опускаться ниже 0"\nassert not _a.is_alive() and _b.is_alive(), "is_alive(): hp > 0"` } },
        { prompt: 'В классе определены и <code>__str__</code>, и <code>__repr__</code>. Какой из них вызывается при <code>print(obj)</code>?', options: ['<code>__repr__</code>', '<code>__str__</code>', 'Оба по очереди', '<code>__init__</code>'], explain: '<code>print</code> и <code>str()</code> сначала ищут <code>__str__</code>. <code>__repr__</code> используется в консоли, внутри списка и когда <code>__str__</code> нет.' }
      ]
    },
    'pyi-7': {
      title: 'Наследование, super(), полиморфизм и dunder-методы',
      body: `
<p>Иногда один класс — это «особый вид» другого: сберегательный счёт — один из видов банковского счёта, собака — один из видов животного. В таком случае, чтобы не повторять код, используем <b>наследование</b> (inheritance): дочерний класс (child) получает все атрибуты и методы родительского класса (parent) и добавляет свои.</p>
<pre><code>class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

class SavingsAccount(Account):            # наследует от Account
    def __init__(self, owner, balance=0, rate=0.1):
        super().__init__(owner, balance)  # __init__ родительского класса
        self.rate = rate

    def add_interest(self):
        self.balance += self.balance * self.rate

s = SavingsAccount("Дана", 10000)
s.deposit(5000)        # метод пришёл из Account
s.add_interest()
print(s.balance)       # 16500.0
print(isinstance(s, Account))   # True</code></pre>
<p><code>super()</code> — ссылка на родительский класс. Он позволяет не повторять работу, которую делает родитель.</p>
<h3>Полиморфизм: один метод, разное поведение</h3>
<pre><code>class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):            # переопределение метода (override)
        return "Ау-ау"

class Cat(Animal):
    def speak(self):
        return "Мияу"

for a in [Dog(), Cat(), Animal()]:
    print(a.speak())            # Ау-ау, Мияу, ...</code></pre>
<p>Цикл не знает конкретного класса объекта, он знает только, что у него есть метод <code>speak()</code>. Уже написанный код работает и с новыми классами без изменений.</p>
<h3>Dunder-методы: учим класс операторам Python</h3>
<p>Методы, окружённые двумя подчёркиваниями (double underscore, «dunder»), подключают класс к встроенным возможностям Python:</p>
<pre><code>class Song:
    def __init__(self, title, seconds):
        self.title, self.seconds = title, seconds
    def __eq__(self, other):     # ==
        return self.title == other.title and self.seconds == other.seconds
    def __lt__(self, other):     # <  (его используют sorted, min, max)
        return self.seconds < other.seconds

class Playlist:
    def __init__(self):
        self.songs = []
    def __len__(self):           # len(playlist)
        return len(self.songs)</code></pre>
<p>Другие: <code>__add__</code> (<code>+</code>), <code>__contains__</code> (<code>in</code>), <code>__getitem__</code> (<code>p[0]</code>).</p>
<div class="tip">Если <code>__eq__</code> не определён, <code>==</code> проверяет только, ссылаются ли две переменные на <b>один и тот же объект</b>: два <code>Song</code> с одинаковыми значениями окажутся «не равны».</div>`,
      ex: [
        { prompt: 'Класс <code>Account</code> уже готов. Напишите наследующий от него класс <code>SavingsAccount</code>: <code>__init__(self, owner, balance=0, rate=0.05)</code> вызывает родительский класс через <code>super()</code> и сохраняет <code>rate</code>; <code>add_interest()</code> прибавляет к балансу <code>balance * rate</code> и округляет результат через <code>round(..., 2)</code>.', hints: ['<code>class SavingsAccount(Account):</code>', '<code>super().__init__(owner, balance)</code>, затем <code>self.rate = rate</code>'], check: { tests: `_s = SavingsAccount("Дана", 10000)\nassert isinstance(_s, Account), "SavingsAccount должен наследовать от Account"\nassert _s.owner == "Дана" and _s.balance == 10000 and _s.rate == 0.05, "owner, balance, rate должны сохраняться правильно"\n_s.deposit(2000)\n_s.add_interest()\nassert _s.balance == 12600.0, "10000 + 2000, затем 5% → 12600.0"` } },
        { prompt: 'Допишите классы <code>Song</code> и <code>Playlist</code>. <code>Song</code>: <code>__eq__</code> (равны, если совпадают название и длительность), <code>__lt__</code> (сравнение по длительности). <code>Playlist</code>: <code>add(song)</code>, <code>__len__</code> (число песен), <code>total_seconds()</code> (общая длительность).', hints: ['<code>def __lt__(self, other): return self.seconds < other.seconds</code>', '<code>def __len__(self): return len(self.songs)</code>'], check: { tests: `_a, _b, _c = Song("Көктем", 200), Song("Дала", 150), Song("Арман", 260)\nassert Song("Дала", 150) == _b, "Песни с одинаковыми названием и длительностью должны быть равны (__eq__)"\nassert _b < _a, "__lt__ сравнивает по длительности"\nassert [s.title for s in sorted([_a, _b, _c])] == ["Дала", "Көктем", "Арман"], "sorted() должен сортировать по длительности"\n_pl = Playlist(); _pl.add(_a); _pl.add(_b)\nassert len(_pl) == 2, "len(playlist) должен давать число песен"\nassert _pl.total_seconds() == 350, "total_seconds() = 200 + 150"` } },
        { prompt: 'В <code>class Cat(Animal)</code> переопределён <code>speak</code>, а у <code>Animal</code> есть метод <code>sleep</code>. Что будет при вызове <code>Cat().sleep()</code>?', options: ['AttributeError: у Cat нет sleep', 'Выполнится <code>sleep</code> из <code>Animal</code>', 'Сначала вызовется <code>speak</code>', 'TypeError'], explain: 'Дочерний класс наследует методы родителя. Python ищет метод сначала в <code>Cat</code>, а если не находит — в <code>Animal</code>.' }
      ]
    },
    'pyi-8': {
      title: 'Модули и import',
      body: `
<p>Чем больше программа, тем труднее уместить весь код в один файл. <b>Модуль</b> — это просто файл <code>.py</code>; его функции и классы можно использовать в другом файле через <code>import</code>. Если несколько модулей собраны в одной папке (с файлом <code>__init__.py</code>), это называется <b>пакетом</b> (package).</p>
<h3>Четыре вида импорта</h3>
<pre><code>import math                    # весь модуль: math.sqrt(16)
from math import sqrt, pi      # только нужные имена: sqrt(16)
import datetime as dt          # короткий псевдоним (alias): dt.date.today()
from random import *           # всё — не рекомендуется: непонятно, откуда взялись имена</code></pre>
<p>В стандартной библиотеке Python сотни модулей: <code>math</code>, <code>random</code>, <code>datetime</code>, <code>json</code>, <code>collections</code>, <code>string</code>, <code>os</code>, <code>pathlib</code>. Сторонние пакеты (например, <code>requests</code>) устанавливаются в терминале командой <code>pip install requests</code>.</p>
<h3>Пишем свой модуль</h3>
<pre><code># shop_utils.py
VAT = 0.12

def with_vat(price):
    return round(price * (1 + VAT))

if __name__ == "__main__":
    # выполняется только при прямом запуске файла
    print(with_vat(1000))</code></pre>
<pre><code># main.py
from shop_utils import with_vat
print(with_vat(2500))      # 2800</code></pre>
<h3>Зачем нужен <code>if __name__ == "__main__"</code>?</h3>
<p>В каждом модуле есть специальная переменная <code>__name__</code>. Если запустить файл напрямую (<code>python shop_utils.py</code>), её значение будет <code>"__main__"</code>. А если файл импортируют из другого места, значение — имя модуля (<code>"shop_utils"</code>). Поэтому код внутри этого условия (тесты, демо, запуск программы) при импорте не выполняется. Без него при <code>import</code> вылезали бы неожиданные <code>print</code>.</p>
<div class="tip">Модуль загружается только один раз: второй <code>import</code> не выполняет его заново. Не называйте свои файлы именами стандартных модулей (<code>random.py</code>, <code>json.py</code>): Python импортирует ваш файл и выдаст ошибку.</div>`,
      ex: [
        { prompt: 'Школьная экскурсия: 128 учеников, в одном автобусе 45 мест. Импортируйте модуль <code>math</code> и запишите в переменную <code>buses</code> нужное число автобусов (<code>math.ceil</code> — округление вверх).', hints: ['<code>import math</code>', '<code>math.ceil(students / seats)</code>'], check: { tests: `assert buses == 3, "Для 128 учеников по 45 мест нужно 3 автобуса"` } },
        { prompt: 'Проверка пароля. Импортируйте строкой <code>from string import digits, ascii_uppercase</code> и напишите функцию <code>is_strong(pw)</code>: <code>True</code>, если длина не меньше 8 и есть хотя бы одна цифра и одна заглавная латинская буква.', hints: ['<code>any(ch in digits for ch in pw)</code>', 'Объедините три условия через <code>and</code>.'], check: { tests: `assert is_strong("Almaty2026") is True, "Almaty2026 — надёжный пароль"\nassert is_strong("almaty2026") is False, "Нет заглавной буквы → False"\nassert is_strong("Almatyyy") is False, "Нет цифры → False"\nassert is_strong("Ab1") is False, "Короче 8 символов → False"` } },
        { prompt: 'В конце файла <code>shop_utils.py</code> есть <code>if __name__ == "__main__": print("demo")</code>. В <code>main.py</code> написали <code>import shop_utils</code> и запустили <code>python main.py</code>. Выведется ли <code>demo</code>?', options: ['Да, при импорте выполняется весь файл', 'Нет: при импорте __name__ равно "shop_utils"', 'Да, но только в первый раз', 'Будет ошибка'], explain: 'В импортированном модуле <code>__name__</code> — это имя модуля. <code>"__main__"</code> бывает только у файла, запущенного напрямую.' },
        { prompt: 'Написано <code>import datetime as dt</code>. Как получить сегодняшнюю дату?', options: ['<code>datetime.date.today()</code>', '<code>dt.date.today()</code>', '<code>date.today()</code>', '<code>as.date.today()</code>'], explain: 'При импорте с псевдонимом к модулю обращаются только по этому имени: <code>dt</code>.' }
      ]
    },
    'pyi-9': {
      title: 'Файлы: open, with и json',
      body: `
<p>Переменные исчезают, когда программа закрывается. Чтобы сохранить данные, мы записываем их в <b>файл</b>. (Python на этой странице работает с виртуальной файловой системой внутри браузера, поэтому файлы можно свободно записывать и читать.)</p>
<h3>open и with</h3>
<pre><code>with open("todo.txt", "w", encoding="utf-8") as f:
    f.write("Сабақ оқу\\n")
    f.write("Дүкенге бару\\n")

with open("todo.txt", encoding="utf-8") as f:
    lines = [line.strip() for line in f]
print(lines)    # ['Сабақ оқу', 'Дүкенге бару']</code></pre>
<p>Когда блок <code>with</code> заканчивается, файл закрывается сам, даже если внутри произошла ошибка. Поэтому вместо <code>f = open(...)</code> … <code>f.close()</code> всегда пишите <code>with</code>.</p>
<table>
<tr><th>Режим</th><th>Значение</th></tr>
<tr><td><code>"r"</code></td><td>чтение (по умолчанию); если файла нет — <code>FileNotFoundError</code></td></tr>
<tr><td><code>"w"</code></td><td>запись; содержимое существующего файла <b>стирается</b> и пишется заново</td></tr>
<tr><td><code>"a"</code></td><td>добавление в конец (append)</td></tr>
</table>
<p>Способы чтения: <code>f.read()</code> — весь текст одной строкой; <code>f.readlines()</code> — список строк; <code>for line in f</code> — построчно (самый экономный способ для больших файлов). В конце каждой строки стоит <code>\\n</code>, его убирает <code>.strip()</code>. Чтобы казахские буквы сохранялись правильно, указывайте <code>encoding="utf-8"</code>.</p>
<h3>json: сохраняем структурированные данные</h3>
<p>Стандартный формат для хранения словарей и списков в виде текста — <b>JSON</b>. Он используется и в веб-API, и в файлах настроек.</p>
<pre><code>import json

stock = {"Нан": 40, "Сүт": 25, "Шай": 12}

with open("stock.json", "w", encoding="utf-8") as f:
    json.dump(stock, f, ensure_ascii=False, indent=2)   # запись в файл

with open("stock.json", encoding="utf-8") as f:
    loaded = json.load(f)                                 # чтение из файла

text = json.dumps(stock, ensure_ascii=False)   # в строку: '{"Нан": 40, ...}'
back = json.loads(text)                        # из строки в словарь</code></pre>
<p>Как запомнить: вариант с буквой <code>s</code> (<code>dumps</code>, <code>loads</code>) работает со <b>string</b>, без неё — с файлом. <code>ensure_ascii=False</code> сохраняет кириллицу в читаемом виде, не превращая её в коды вроде <code>\\u04d8</code>.</p>
<div class="tip">В JSON нет кортежей (они становятся списками), а ключи словаря могут быть только строками: <code>{1: "a"}</code> сохранится и при повторном чтении станет <code>{"1": "a"}</code>.</div>`,
      ex: [
        { prompt: 'Запишите список <code>tasks</code> в файл <code>"tasks_pyi.txt"</code>, каждую задачу на отдельной строке (<code>with open(..., "w")</code>). Затем прочитайте файл снова, очистите строки через <code>.strip()</code> и соберите их в список <code>lines</code>.', hints: ['Запись: <code>f.write(t + "\\n")</code>', 'Чтение: <code>[line.strip() for line in f]</code>'], check: { tests: `assert lines == tasks, "lines должен быть списком задач, прочитанных из файла"\nwith open("tasks_pyi.txt", encoding="utf-8") as _f:\n    _txt = _f.read()\nassert _txt.splitlines() == tasks, "В файле каждая задача должна стоять на отдельной строке"` } },
        { prompt: 'Остатки на складе. Сохраните словарь <code>stock</code> в файл <code>"stock_pyi.json"</code> через <code>json.dump</code>. Прочитайте файл через <code>json.load</code> и запишите в переменную <code>loaded</code>. Наконец, в <code>loaded</code> измените остаток «Шай» (чай) с 12 на 30 и снова сохраните файл.', hints: ['<code>json.dump(stock, f, ensure_ascii=False)</code>', '<code>loaded = json.load(f)</code>, затем измените и снова сделайте <code>dump</code>.'], check: { tests: `assert loaded == {"Нан": 40, "Сүт": 25, "Шай": 30}, "loaded должен быть прочитан из файла, и Шай = 30"\nimport json as _json\nwith open("stock_pyi.json", encoding="utf-8") as _f:\n    _d = _json.load(_f)\nassert _d["Шай"] == 30 and _d["Нан"] == 40, "Изменённый словарь нужно снова сохранить в файл"` } },
        { prompt: 'Превратите словарь <code>student</code> в строку JSON (<code>text</code>), но так, чтобы кириллица осталась читаемой и не превратилась в коды <code>\\u...</code>.', hints: ['<code>json.dumps</code> по умолчанию кодирует кириллицу.', 'Добавьте параметр <code>ensure_ascii=False</code>.'], check: { tests: `assert isinstance(text, str), "text должен быть строкой (str): json.dumps"\nassert "Әйгерім" in text and "Қостанай" in text, "Кириллица должна остаться читаемой: ensure_ascii=False"\nimport json as _json\nassert _json.loads(text) == student, "text должен быть корректным JSON"` } },
        { prompt: 'Что станет со старым текстом существующего файла, если открыть его через <code>open("log.txt", "w")</code>?', options: ['Сохранится, новый добавится в конец', 'Сотрётся, файл откроется пустым', 'Будет ошибка: файл уже существует', 'Файл откроется только для чтения'], explain: 'Режим <code>"w"</code> очищает файл. Чтобы добавлять в конец, используйте режим <code>"a"</code>.' }
      ]
    },
    'pyi-10': {
      title: 'Итераторы и генераторы (yield)',
      body: `
<p><code>for x in ...</code> работает и со списком, и со строкой, и со словарём, и с файлом. Почему? Потому что все они <b>итерируемые</b> (iterable). Внутри цикл <code>for</code> делает вот что:</p>
<pre><code>queue = ["Әли", "Дана", "Ерлан"]
it = iter(queue)      # получаем итератор
print(next(it))       # Әли
print(next(it))       # Дана
print(next(it))       # Ерлан
next(it)              # StopIteration: элементы кончились → здесь цикл for и останавливается</code></pre>
<p><b>Итератор</b> — объект, который умеет «дать следующий элемент». Он помнит, где остановился, и проходит только один раз: чтобы начать заново, нужно взять новый итератор.</p>
<h3>Генератор: функция с yield</h3>
<p>Самый простой способ создать свой итератор — <b>генератор</b>. Это функция, которая вместо <code>return</code> использует <code>yield</code>. Каждый <code>yield</code> отдаёт одно значение, и функция в этом месте «замирает». Когда приходит следующий <code>next()</code>, она продолжает с того места, где остановилась.</p>
<pre><code>def countdown(n):
    while n > 0:
        yield n
        n -= 1
    print("Старт!")

for x in countdown(3):
    print(x)          # 3, 2, 1, затем «Старт!»

gen = countdown(2)    # пока ничего не выполнилось!
print(next(gen))      # 2</code></pre>
<h3>Чем это полезно?</h3>
<ul>
<li><b>Экономия памяти.</b> Генератор не собирает все значения заранее в список, а создаёт их по одному. Становится возможным читать файл в миллион строк или делать бесконечную последовательность.</li>
<li><b>Бесконечные последовательности.</b> <code>while True: yield ...</code> — номера заказов, очередь в игре, генератор ID.</li>
<li><b>Конвейер.</b> Один генератор «кормит» другой: строки файла → очистка → фильтрация.</li>
</ul>
<pre><code>def order_ids():
    n = 1
    while True:              # бесконечный, но ленивый
        yield f"ORD-{n:04d}"
        n += 1

ids = order_ids()
print(next(ids), next(ids))  # ORD-0001 ORD-0002</code></pre>
<h3>Генераторное выражение</h3>
<p>Если взять list comprehension в круглые скобки, получится генератор: <code>total = sum(p * q for p, q in cart)</code>. Промежуточный список здесь не создаётся.</p>
<div class="tip">Генератор можно пройти только один раз. <code>g = (x for x in range(3))</code>; <code>list(g)</code> → <code>[0, 1, 2]</code>, а второй раз <code>list(g)</code> → <code>[]</code>.</div>`,
      ex: [
        { prompt: 'Напишите <b>генератор</b> <code>countdown(n)</code> (через <code>yield</code>): он отдаёт значения <code>n</code>, <code>n-1</code>, …, <code>1</code>. <code>list(countdown(3))</code> → <code>[3, 2, 1]</code>.', hints: ['Внутри <code>while n > 0:</code> — <code>yield n</code>, затем <code>n -= 1</code>.', 'В функции должен быть <code>yield</code>, а не <code>return</code>.'], check: { tests: `import inspect as _inspect\nassert _inspect.isgeneratorfunction(countdown), "countdown должен быть генератором: используйте yield"\nassert list(countdown(3)) == [3, 2, 1], "list(countdown(3)) = [3, 2, 1]"\nassert list(countdown(0)) == [], "countdown(0) ничего не отдаёт"` } },
        { prompt: 'Электронная очередь. Напишите бесконечный генератор <code>tickets(prefix)</code>: <code>"A-001"</code>, <code>"A-002"</code>, … (номер из 3 цифр с ведущими нулями: <code>f"{n:03d}"</code>).', hints: ['<code>yield</code> внутри <code>while True:</code>.', '<code>f"{prefix}-{n:03d}"</code>'], check: { tests: `_g = tickets("A")\nassert next(_g) == "A-001", "Первый билет — A-001"\nassert next(_g) == "A-002" and next(_g) == "A-003", "Номер растёт на 1 при каждом next()"\n_h = tickets("VIP")\nassert next(_h) == "VIP-001", "Каждый генератор начинается с 1"\nfor _ in range(997): _last = next(_h)\nassert _last == "VIP-998", "Генератор должен быть бесконечным"` } },
        { prompt: 'Товары в корзине: пары <code>(цена, количество)</code>. Вычислите <code>total</code> с помощью генераторного выражения и <code>sum</code> (без промежуточного списка).', hints: ['<code>sum(... for price, qty in cart)</code>', '<code>sum(price * qty for price, qty in cart)</code>'], check: { tests: `assert total == 3700, "total = 450*2 + 1200*1 + 320*5 = 3700"` } },
        { prompt: '<code>g = (x * 2 for x in [1, 2])</code>. Что выведет <code>print(list(g), list(g))</code>?', options: ['<code>[2, 4] [2, 4]</code>', '<code>[2, 4] []</code>', '<code>[] []</code>', 'Ошибка StopIteration'], explain: 'Генератор проходится только один раз. Первый <code>list(g)</code> полностью его исчерпывает, второй получает пустой список.' }
      ]
    },
    'pyi-11': {
      title: 'Декораторы',
      body: `
<p>В Python функция — обычный объект: её можно записать в переменную, передать другой функции и вернуть из функции. На этом основан <b>декоратор</b>: он принимает функцию, «оборачивает» её (wrap) и возвращает функцию с новой возможностью. Код исходной функции мы не трогаем.</p>
<h3>Строим по шагам</h3>
<pre><code>def log_calls(func):                  # принимает функцию
    def wrapper(*args, **kwargs):     # пропускает любые аргументы
        print(f"→ {func.__name__}{args}")
        result = func(*args, **kwargs)   # вызов исходной функции
        print(f"← {result}")
        return result
    return wrapper                    # возвращает новую функцию

@log_calls                            # это: add = log_calls(add)
def add(a, b):
    return a + b

add(2, 3)
# → add(2, 3)
# ← 5</code></pre>
<p>Запись <code>@log_calls</code> — сокращение для <code>add = log_calls(add)</code>. Теперь имя <code>add</code> ссылается на <code>wrapper</code>, а внутри <code>wrapper</code> сохранена исходная <code>func</code> (это называется <b>closure</b>, замыкание: внутренняя функция «помнит» переменные внешней).</p>
<h3>functools.wraps</h3>
<p>После оборачивания <code>add.__name__</code> становится <code>"wrapper"</code>, и это мешает отладке (debug). Исправить легко:</p>
<pre><code>from functools import wraps

def log_calls(func):
    @wraps(func)              # сохраняет имя и docstring
    def wrapper(*args, **kwargs):
        ...</code></pre>
<h3>Реальное применение</h3>
<ul>
<li><b>Проверки:</b> правильный ли аргумент, вошёл ли пользователь (<code>@login_required</code> в веб-фреймворках).</li>
<li><b>Замер времени</b> и логирование.</li>
<li><b>Кэш:</b> стандартный <code>@functools.lru_cache</code> хранит уже вычисленные результаты; наивная рекурсивная <code>fib</code> сразу ускоряется.</li>
<li>Веб-маршруты: <code>@app.get("/users")</code> во Flask/FastAPI — тоже декоратор.</li>
</ul>
<div class="tip">Когда пишете декоратор, не забудьте вернуть результат <code>return func(...)</code> внутри <code>wrapper</code>. Иначе декорированная функция всегда будет возвращать <code>None</code>.</div>`,
      ex: [
        { prompt: 'Напишите декоратор <code>shout</code>: он переводит строку, которую вернула функция, в верхний регистр и добавляет в конец <code>"!"</code>. С <code>@shout</code> вызов <code>greet("дана")</code> → <code>"СӘЛЕМ, ДАНА!"</code>.', hints: ['Внутри напишите <code>def wrapper(*args, **kwargs):</code> и верните его через <code>return wrapper</code>.', '<code>return func(*args, **kwargs).upper() + "!"</code>'], check: { tests: `assert greet("дана") == "СӘЛЕМ, ДАНА!", "greet('дана') → 'СӘЛЕМ, ДАНА!'"\n@shout\ndef _bye():\n    return "сау бол"\nassert _bye() == "САУ БОЛ!", "Декоратор должен работать с любой функцией"` } },
        { prompt: 'Банковские операции должны проходить только с положительной суммой. Напишите декоратор <code>positive_amount</code>: если <b>последний</b> позиционный аргумент функции меньше или равен 0, пусть он поднимает <code>ValueError</code>; иначе вызывает функцию и возвращает её результат. Используйте <code>functools.wraps</code>, чтобы сохранилось имя функции.', hints: ['<code>args[-1]</code> — последний позиционный аргумент.', 'Поставьте декоратор <code>@wraps(func)</code> над <code>wrapper</code>.'], check: { tests: `assert deposit(1000, 500) == 1500, "С положительной суммой функция работает как обычно"\n_ok = False\ntry:\n    deposit(1000, -200)\nexcept ValueError:\n    _ok = True\nassert _ok, "При отрицательной сумме должна подниматься ValueError"\n_ok = False\ntry:\n    deposit(1000, 0)\nexcept ValueError:\n    _ok = True\nassert _ok, "При сумме 0 тоже должна подниматься ValueError"\nassert deposit.__name__ == "deposit", "Используйте @wraps(func): имя должно сохраниться"` } },
        { prompt: 'Чему эквивалентен код <code>def report(): ...</code> с декоратором <code>@timer</code>?', options: ['<code>timer = report(timer)</code>', '<code>report = timer(report)</code>', '<code>report = timer()</code>', '<code>timer(report())</code>'], explain: 'Декоратор принимает функцию и возвращает новую; результат записывается обратно в исходное имя.' }
      ]
    },
    'pyi-12': {
      title: 'datetime и collections',
      body: `
<p>Два модуля стандартной библиотеки очень часто встречаются в повседневном коде: <code>datetime</code> для дат и времени и <code>collections</code> со специальными коллекциями.</p>
<h3>datetime</h3>
<pre><code>from datetime import date, datetime, timedelta

start = date(2026, 9, 1)                # 1 сентября 2026
deadline = start + timedelta(days=30)   # через 30 дней
print(deadline)                         # 2026-10-01
print((date(2026, 12, 16) - start).days)   # 106: разность — timedelta

now = datetime(2026, 10, 16, 14, 30)
print(now.strftime("%d.%m.%Y %H:%M"))   # 16.10.2026 14:30  (дата → текст)
d = datetime.strptime("22.03.2027", "%d.%m.%Y")   # текст → дата
print(d.weekday())                      # 0 = понедельник … 6 = воскресенье</code></pre>
<p><code>strftime</code> — <b>f</b>ormat (дата в строку), <code>strptime</code> — <b>p</b>arse (строка в дату). Частые коды: <code>%Y</code> год, <code>%m</code> месяц, <code>%d</code> день, <code>%H:%M</code> часы и минуты.</p>
<h3>Counter: подсчёт</h3>
<pre><code>from collections import Counter

votes = ["Дана", "Әли", "Дана", "Ерлан", "Дана", "Әли"]
c = Counter(votes)
print(c["Дана"])          # 3
print(c.most_common(2))   # [('Дана', 3), ('Әли', 2)]
print(c["Тимур"])         # 0: для отсутствующего ключа ошибки нет</code></pre>
<h3>defaultdict: словарь со значением по умолчанию</h3>
<pre><code>from collections import defaultdict

by_class = defaultdict(list)
for name, cls in [("Әли", "9А"), ("Дана", "9Б"), ("Ерлан", "9А")]:
    by_class[cls].append(name)    # если ключа нет, пустой список создаётся сам
# {'9А': ['Әли', 'Ерлан'], '9Б': ['Дана']}</code></pre>
<p>В обычном словаре пришлось бы проверять <code>if cls not in d: d[cls] = []</code>. <code>defaultdict(int)</code> удобен для подсчёта (по умолчанию 0).</p>
<h3>namedtuple: кортеж с именованными полями</h3>
<pre><code>from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p[1])     # 3 4: и по имени, и по индексу
x, y = p             # раскладывается как кортеж</code></pre>
<p>Для небольшой неизменяемой записи (координата, цвет, игральная карта) не нужно писать полноценный класс: <code>namedtuple</code> достаточно, и читается он гораздо понятнее, чем <code>p[0]</code>.</p>
<div class="tip">В <code>collections</code> есть и <code>deque</code>: очередь, в которую можно быстро добавлять и из которой можно быстро забирать с обоих концов (<code>appendleft</code>, <code>popleft</code>).</div>`,
      ex: [
        { prompt: 'Дано <code>today = date(2026, 10, 16)</code>. <code>days_left</code> — число дней до праздника Наурыз (<code>2027-03-22</code>). <code>exam_day</code> — дата через 45 дней от сегодня, в виде строки формата <code>"дд.мм.гггг"</code> (<code>strftime("%d.%m.%Y")</code>).', hints: ['Разность: <code>(date(2027, 3, 22) - today).days</code>', '<code>(today + timedelta(days=45)).strftime("%d.%m.%Y")</code>'], check: { tests: `assert days_left == 157, "До Наурыза 157 дней: (date(2027, 3, 22) - today).days"\nassert exam_day == "30.11.2026", "today + 45 дней = 30.11.2026"` } },
        { prompt: 'Выборы президента школы. С помощью <code>Counter</code> вычислите переменные <code>winner</code> (имя того, кто набрал больше всего голосов) и <code>top3</code> (результат <code>most_common(3)</code>).', hints: ['<code>c = Counter(votes)</code>', '<code>c.most_common(1)</code> → <code>[("Сая", 4)]</code>, до имени добираетесь через <code>[0][0]</code>.'], check: { tests: `assert winner == "Сая", "Больше всего голосов у Саи (4)"\nassert top3 == [("Сая", 4), ("Дана", 3), ("Әли", 2)], "top3 = Counter(votes).most_common(3)"` } },
        { prompt: 'Библиотека: с помощью <code>defaultdict(list)</code> постройте словарь <code>by_genre</code> (жанр → названия книг, в исходном порядке). Затем создайте <code>Book = namedtuple("Book", ["title", "pages"])</code> и запишите в переменную <code>longest</code> книгу с наибольшим числом страниц в виде <code>Book</code>.', hints: ['<code>by_genre[genre].append(title)</code> — если ключа нет, список создаётся сам.', '<code>max((Book(t, p) for t, g, p in books), key=lambda b: b.pages)</code>'], check: { tests: `assert dict(by_genre) == {"роман": ["Абай жолы", "Көшпенділер"], "оқулық": ["Python негіздері", "Алгоритмдер"]}, "by_genre: жанр → названия книг"\nassert type(by_genre).__name__ == "defaultdict", "by_genre должен быть defaultdict(list)"\nassert longest.title == "Абай жолы" and longest.pages == 1200, "longest — книга с наибольшим числом страниц, в виде Book(title, pages)"` } },
        { prompt: 'Что даёт <code>(date(2026, 3, 1) - date(2026, 1, 1)).days</code>?', explain: 'В январе 31 день, в феврале 2026 года 28 дней: 31 + 28 = 59.' }
      ]
    },
    'pyi-13': {
      title: 'Мини-проект: текстовая банковская система',
      body: `
<p>Соберём изученное в модуле в один проект: небольшую банковскую систему. В ней клиенты открывают счета, вносят деньги, снимают их и переводят друг другу. «Ядро» настоящего банковского приложения состоит именно из таких классов, только к нему добавляются база данных и интерфейс.</p>
<h3>Шаг 1: проектирование</h3>
<p>Прежде чем писать код, спросите себя: «какие есть объекты и что они делают?»</p>
<table>
<tr><th>Класс</th><th>Состояние (атрибуты)</th><th>Действия (методы)</th></tr>
<tr><td><code>BankAccount</code></td><td>owner, balance, history</td><td>deposit, withdraw, __str__</td></tr>
<tr><td><code>Bank</code></td><td>accounts: словарь (имя → счёт)</td><td>open_account, transfer, total, richest</td></tr>
<tr><td><code>InsufficientFunds</code></td><td colspan="2">наш собственный класс ошибки: недостаточно средств</td></tr>
</table>
<h3>Шаг 2: своя ошибка</h3>
<pre><code>class InsufficientFunds(Exception):
    pass

raise InsufficientFunds("Балансыңыз: 3000 ₸")</code></pre>
<p>Достаточно пустого класса, наследующего от <code>Exception</code>. Теперь вызывающий код может поймать именно этот случай через <code>except InsufficientFunds:</code>, а другие ошибки (например, <code>ValueError</code> для отрицательной суммы) обрабатываются отдельно.</p>
<h3>Шаг 3: счёт</h3>
<pre><code>class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []                    # кортежи вроде ("deposit", 5000)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Сома оң болуы керек")
        self.balance += amount
        self.history.append(("deposit", amount))</code></pre>
<p><code>withdraw</code> устроен так же, только сначала проверяет баланс. Важное правило: <b>сначала проверь, потом меняй</b>. Если уменьшить баланс, а потом поднять ошибку, счёт останется в «наполовину изменённом» состоянии.</p>
<h3>Шаг 4: банк и перевод</h3>
<p>Перевод — это две операции: снять с одного счёта и положить на другой. Если снятие не удалось (не хватило денег), зачисление выполняться не должно. Если <code>withdraw</code> поднимет ошибку, следующая строка не выполнится, поэтому достаточно правильного порядка:</p>
<pre><code>def transfer(self, src, dst, amount):
    self.accounts[src].withdraw(amount)   # при ошибке остановится здесь
    self.accounts[dst].deposit(amount)</code></pre>
<h3>Что дальше</h3>
<p>Идеи для развития проекта: сохранять и загружать счета из файла <code>json</code>; добавлять к каждой операции время <code>datetime</code>; наследник <code>SavingsAccount</code>, начисляющий ежемесячные проценты; меню через <code>input()</code> (в Python на компьютере). Python на этой странице не поддерживает <code>input()</code>, поэтому значения мы записываем прямо в переменные.</p>
<div class="tip">Пусть каждый метод делает одну работу, и сразу проверяйте его тестом: <code>assert acc.balance == 15000</code>. Проект, написанный маленькими шагами, легко отлаживать.</div>`,
      ex: [
        { prompt: 'Допишите класс <code>BankAccount</code>. <code>deposit(amount)</code>: если сумма ≤ 0 — <code>ValueError</code>, иначе прибавить к балансу и записать в <code>history</code> <code>("deposit", amount)</code>. <code>withdraw(amount)</code>: если сумма ≤ 0 — <code>ValueError</code>; если больше баланса — <code>InsufficientFunds</code> (баланс не меняется); иначе уменьшить и записать <code>("withdraw", amount)</code>. <code>__str__</code> → <code>"Дана: 15000 ₸"</code>.', hints: ['Сначала проверьте: <code>if amount <= 0: raise ValueError(...)</code>, затем <code>if amount > self.balance: raise InsufficientFunds(...)</code>.', 'Только после проверок меняйте <code>self.balance</code> и пишите <code>self.history.append(...)</code>.'], check: { tests: `_a = BankAccount("Дана", 10000)\n_a.deposit(5000)\nassert _a.balance == 15000, "deposit должен прибавлять к балансу"\n_a.withdraw(3000)\nassert _a.balance == 12000, "withdraw должен уменьшать баланс"\nassert _a.history == [("deposit", 5000), ("withdraw", 3000)], "history: ('deposit', 5000), ('withdraw', 3000)"\n_e = None\ntry:\n    _a.withdraw(50000)\nexcept InsufficientFunds:\n    _e = "ok"\nassert _e == "ok", "Если сумма больше баланса, должна подниматься InsufficientFunds"\nassert _a.balance == 12000 and len(_a.history) == 2, "После неудачного снятия баланс и history не должны меняться"\nfor _bad in (0, -100):\n    _e = None\n    try:\n        _a.deposit(_bad)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "deposit: если сумма ≤ 0, то ValueError"\n    _e = None\n    try:\n        _a.withdraw(_bad)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "withdraw: если сумма ≤ 0, то ValueError"\nassert str(_a) == "Дана: 12000 ₸", "Формат __str__: 'Дана: 12000 ₸'"` } },
        { prompt: 'Теперь напишите класс <code>Bank</code> (<code>BankAccount</code> готов). <code>open_account(owner, balance=0)</code>: создаёт счёт, сохраняет его в словарь <code>self.accounts</code> и возвращает счёт; если такой клиент уже есть — <code>ValueError</code>. <code>transfer(src, dst, amount)</code>: снимает со <code>src</code> и кладёт на <code>dst</code> (если денег не хватает, ни один счёт не должен измениться). <code>total()</code> — сумма всех балансов. <code>richest()</code> — имя самого богатого клиента.', hints: ['<code>transfer</code>: сначала <code>withdraw</code>, затем <code>deposit</code>. При ошибке вторая строка не выполнится.', '<code>max(self.accounts.values(), key=lambda a: a.balance).owner</code>'], check: { tests: `_b = Bank()\n_x = _b.open_account("Әли", 20000)\n_b.open_account("Дана", 5000)\nassert isinstance(_x, BankAccount) and _b.accounts["Әли"] is _x, "open_account должен сохранить счёт и вернуть его"\n_e = None\ntry:\n    _b.open_account("Әли")\nexcept ValueError:\n    _e = "ok"\nassert _e == "ok", "Существующему клиенту нельзя открыть счёт повторно: ValueError"\n_b.transfer("Әли", "Дана", 8000)\nassert _b.accounts["Әли"].balance == 12000 and _b.accounts["Дана"].balance == 13000, "transfer: у Әли 12000, у Дана 13000"\n_e = None\ntry:\n    _b.transfer("Әли", "Дана", 99999)\nexcept InsufficientFunds:\n    _e = "ok"\nassert _e == "ok", "Если денег не хватает, должна возникать InsufficientFunds"\nassert _b.accounts["Әли"].balance == 12000 and _b.accounts["Дана"].balance == 13000, "После неудачного перевода оба счёта не должны измениться"\nassert _b.total() == 25000, "total() = 25000"\nassert _b.richest() == "Дана", "richest() = 'Дана'"` } },
        { done: 'Теперь попробуйте написать код по этому плану на своём компьютере: пишите каждый класс отдельно и проверяйте каждый метод через <code>assert</code>. Если выложить готовый проект на GitHub с README, это будет хорошим началом портфолио.', prompt: 'Спроектируйте <b>систему склада (inventory)</b> для магазина (не меньше 60 слов, код необязателен). Опишите: какие будут классы, и у каждого — атрибуты и методы; какие ошибки поднимаются (например, если товара на складе не хватает); как данные хранятся в файле; какие инструменты из модуля (dict, namedtuple, генератор, декоратор, json) где полезны. Затем честно оцените себя по четырём критериям. Чтобы пройти, по каждому критерию нужно не меньше <b>3 / 4</b>.', criteria: [
          { name: 'Классы и ответственность', levels: ['Классы не названы', 'Один класс, всё внутри него', 'Несколько классов, названы их атрибуты и методы', 'У каждого класса одна чёткая ответственность, объяснена связь между ними'] },
          { name: 'Обработка ошибок', levels: ['Не упомянута', 'В общих словах («может быть ошибка»)', 'Названы конкретные ситуации и какая ошибка поднимается', 'Есть свой класс ошибки, учтено правило «сначала проверь, потом меняй»'] },
          { name: 'Хранение данных', levels: ['Не упомянуто', 'Сказано только «сохраним в файл»', 'Указан формат JSON и когда файл записывается/читается', 'Есть пример структуры JSON и план загрузки при запуске программы'] },
          { name: 'Использование инструментов модуля', levels: ['Ни один не назван', 'Назван один, но непонятно зачем', 'Два-три инструмента применены к месту', 'Инструменты выбраны к месту, и объяснено, почему не другие'] }
        ] }
      ]
    },
    'pyi-gate': {
      title: 'Экзамен модуля: Intermediate Python',
      body: `
<p>Экзамен охватывает весь модуль: классы и dunder-методы, генераторы, декораторы и рекурсию, comprehension, <code>json</code> и <code>collections</code>. Чтобы сдать, нужно набрать не меньше <b>75%</b> баллов.</p>
<ul>
<li>Внимательно читайте задание: имена переменных и функций должны быть ровно такими, как указано.</li>
<li>В заданиях на Python сначала проверьте себя на небольшом примере через <code>print</code>, а потом нажмите кнопку «Проверить».</li>
<li>Помните: <b>сначала проверь, потом меняй</b>; генератор проходится один раз; декоратор возвращает <code>wrapper</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Что выведется?<pre><code>class Clicker:\n    total = 0\n    def click(self):\n        self.total += 1\n\na = Clicker()\na.click(); a.click()\nprint(Clicker.total, a.total)</code></pre>', options: ['<code>2 2</code>', '<code>0 2</code>', '<code>0 0</code>', 'AttributeError'], explain: '<code>self.total += 1</code> читает атрибут класса, но записывает результат в новый атрибут <b>объекта</b>. Атрибут класса остаётся равным 0. Для общего счётчика нужно писать <code>Clicker.total += 1</code>.' },
        { prompt: 'Напишите класс <code>Inventory</code>. <code>self.items</code> — словарь (товар → количество). <code>add(name, qty)</code> — прибавляет количество (если товар новый, создаёт его). <code>remove(name, qty)</code> — если на складе не хватает (или товара нет), <code>ValueError</code>, иначе уменьшает; если количество стало 0, удаляет товар из словаря. <code>__len__</code> — число видов товаров. <code>__contains__</code> — <code>"Сүт" in inv</code>. <code>low_stock(limit)</code> — <b>генератор</b>: отдаёт в алфавитном порядке названия товаров, которых меньше <code>limit</code>.', hints: ['<code>self.items.get(name, 0)</code> даёт 0, если товара нет.', 'Внутри <code>low_stock</code>: <code>for name in sorted(self.items): if ...: yield name</code>'], check: { tests: `import inspect as _inspect\n_inv = Inventory()\n_inv.add("Сүт", 10); _inv.add("Нан", 3); _inv.add("Сүт", 5); _inv.add("Май", 2)\nassert _inv.items == {"Сүт": 15, "Нан": 3, "Май": 2}, "add должен прибавлять количество: Сүт 15"\nassert len(_inv) == 3 and "Нан" in _inv and "Шай" not in _inv, "__len__ и __contains__ должны работать правильно"\n_inv.remove("Нан", 3)\nassert "Нан" not in _inv and len(_inv) == 2, "Товар с количеством 0 должен удаляться"\nfor _args in (("Сүт", 100), ("Шай", 1)):\n    _e = None\n    try:\n        _inv.remove(*_args)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "Если не хватает или товара нет, то ValueError"\nassert _inv.items["Сүт"] == 15, "Неудачный remove не должен менять количество"\n_inv.add("Алма", 1)\nassert _inspect.isgeneratorfunction(Inventory.low_stock), "low_stock должен быть генератором (yield)"\nassert list(_inv.low_stock(5)) == ["Алма", "Май"], "low_stock(5): товары, которых меньше 5, в алфавитном порядке"` } },
        { prompt: 'По лестнице можно подниматься на 1 или 2 ступени за шаг. Число способов подняться на <code>n</code> ступеней: <code>ways(0) = ways(1) = 1</code>, <code>ways(n) = ways(n-1) + ways(n-2)</code>. Наивная рекурсия медленная, поэтому напишите декоратор <code>memo</code>: он хранит результаты в словаре <code>wrapper.cache</code> (ключ — аргумент) и не пересчитывает уже вычисленное. Напишите функцию <code>ways</code> рекурсивно и примените <code>@memo</code>.', hints: ['После того как напишете функцию <code>wrapper</code>, задайте ей атрибут: <code>wrapper.cache = {}</code>.', 'Внутри: <code>if n not in wrapper.cache: wrapper.cache[n] = func(n)</code>, затем <code>return wrapper.cache[n]</code>.'], check: { tests: `assert isinstance(getattr(ways, "cache", None), dict), "Декоратор memo должен создать словарь wrapper.cache"\nassert ways(4) == 5, "ways(4) = 5: 1111, 112, 121, 211, 22"\nassert ways(60) == 2504730781961, "ways(60) = 2504730781961"\nassert len(ways.cache) >= 60, "Промежуточные результаты должны храниться в ways.cache (рекурсия + memo)"` } },
        { prompt: 'Заказы интернет-магазина пришли в виде строки JSON. Прочитайте её через <code>json.loads</code> и вычислите три переменные: <code>per_customer</code> — клиент → число товаров в заказе (dict comprehension); <code>unique_items</code> — множество названий проданных товаров (set comprehension); <code>top_item</code> — самый часто продаваемый товар (<code>Counter</code>).', hints: ['<code>orders = json.loads(raw)</code> — список словарей.', 'Двухуровневый цикл: <code>{item for o in orders for item in o["items"]}</code>'], check: { tests: `assert per_customer == {"Әли": 2, "Дана": 3, "Ерлан": 4}, "per_customer: клиент → число товаров"\nassert unique_items == {"Нан", "Сүт", "Шай", "Алма"}, "unique_items: уникальные товары"\nassert top_item == "Сүт", "top_item: самый часто продаваемый товар (Сүт, 4 раза)"` } },
        { prompt: 'Что выведет этот код?<pre><code>def evens(n):\n    for i in range(n):\n        if i % 2 == 0:\n            yield i * i\n\ng = evens(7)\nnext(g)\nprint(sum(g))</code></pre>', explain: 'Генератор отдаёт 0, 4, 16, 36. Первый <code>next(g)</code> «съедает» 0, остаётся: 4 + 16 + 36 = 56.' }
      ]
    }
  }
});
