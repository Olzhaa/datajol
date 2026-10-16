// PY2 Intermediate Python. General-purpose Python (stdlib only) in Pyodide: tuples/sets, functions, OOP, files/json, generators, decorators, collections.
(function () {
  DJ.modules['py-2'] = {
    intro: 'Python негіздерінен кейінгі қадам: кортеж бен жиын, икемді функциялар, класс пен мұрагерлік, файлдар мен JSON, генераторлар, декораторлар және стандартты кітапхана. Мысалдар — ойындар, дүкен, студенттер мен банк шоты; соңында мәтіндік банк жүйесін өзіңіз құрасыз.',
    lessons: [
      {
        id: 'pyi-1', title: 'Кортеж (tuple) және жиын (set)', minutes: 12,
        body: `
<p>Негіздер курсында тізім (list) мен сөздікті (dict) үйрендіңіз. Python-да тағы екі маңызды жинақ бар: <b>кортеж</b> (tuple) және <b>жиын</b> (set).</p>
<h3>Tuple: өзгермейтін тізім</h3>
<p>Кортеж дөңгелек жақшамен жазылады. Құрылғаннан кейін оның элементтерін өзгертуге, қосуға не өшіруге болмайды. Сондықтан ол «бірге жүретін» мәндерге ыңғайлы: координата, күн (жыл, ай, күн), ойыншының аты мен ұпайы.</p>
<pre><code>point = (3, 7)
player = ("Айгерім", 1450)
print(point[0])        # 3
# point[0] = 5         # TypeError: кортежді өзгертуге болмайды

name, score = player   # unpacking: мәндерді айнымалыларға тарату
print(name, score)     # Айгерім 1450

a, b = 1, 2
a, b = b, a            # екі айнымалыны бір жолда ауыстыру
print(a, b)            # 2 1</code></pre>
<p>Функция бірнеше мән қайтарғанда (<code>return mn, mx</code>), шын мәнінде бір кортеж қайтарады. Бір элементті кортежде үтір міндетті: <code>(5,)</code>. Кортеж өзгермейтіндіктен, оны сөздік кілті ретінде қолдануға болады: <code>{(0, 0): "старт"}</code>.</p>
<h3>Set: қайталанбайтын элементтер</h3>
<p>Жиын фигуралық жақшамен жазылады және әр мәнді тек бір рет сақтайды. Ретке сенуге болмайды, индексі жоқ. Бірақ <code>in</code> тексерісі өте жылдам.</p>
<pre><code>tags = {"python", "ойын", "python"}
print(len(tags))                   # 2: қайталану жойылды
unique = set([3, 1, 3, 2, 1])      # {1, 2, 3}

chess = {"Әли", "Дана", "Ерлан"}
football = {"Ерлан", "Мадина", "Әли"}
print(chess & football)   # екеуінде де: {'Әли', 'Ерлан'}
print(chess | football)   # бәрі бірге (біріктіру)
print(chess - football)   # тек шахматта: {'Дана'}
print(chess ^ football)   # тек біреуінде ғана</code></pre>
<p>Жиынға <code>.add(x)</code> арқылы қосасыз, <code>.discard(x)</code> арқылы өшіресіз. Бос жиын тек <code>set()</code> арқылы жасалады: <code>{}</code> — бос <b>сөздік</b>.</p>
<div class="tip">Қашан не таңдау керек? Реті маңызды, өзгеретін жинақ — <code>list</code>. Өзгермейтін шағын топ — <code>tuple</code>. Қайталанбау және «бар ма?» сұрағы — <code>set</code>. Кілт → мән — <code>dict</code>.</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>player</code> кортежін unpacking арқылы <code>name</code>, <code>level</code>, <code>coins</code> айнымалыларына таратыңыз. Сосын <code>a</code> мен <code>b</code> мәндерін бір жолда ауыстырыңыз.',
            starter: 'player = ("Нұрлан", 12, 340)\na, b = 10, 20\n# мұнда жазыңыз\n',
            solution: 'player = ("Нұрлан", 12, 340)\na, b = 10, 20\nname, level, coins = player\na, b = b, a\n',
            hints: ['<code>name, level, coins = player</code>', 'Ауыстыру: <code>a, b = b, a</code>'],
            check: { tests: `assert name == "Нұрлан" and level == 12 and coins == 340, "name, level, coins кортежден алынуы керек"\nassert (a, b) == (20, 10), "a мен b орнын ауыстырыңыз: a=20, b=10"` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Мектепте екі үйірме бар. Жиын амалдарымен үш айнымалы есептеңіз: <code>both</code> — екі үйірмеге де қатысатындар, <code>only_chess</code> — тек шахматқа баратындар, <code>everyone</code> — кемінде бір үйірмеге қатысатындардың бәрі.',
            starter: 'chess = {"Әли", "Дана", "Ерлан", "Сая"}\nrobotics = {"Ерлан", "Мадина", "Әли", "Тимур"}\nboth = set()\nonly_chess = set()\neveryone = set()\n',
            solution: 'chess = {"Әли", "Дана", "Ерлан", "Сая"}\nrobotics = {"Ерлан", "Мадина", "Әли", "Тимур"}\nboth = chess & robotics\nonly_chess = chess - robotics\neveryone = chess | robotics\n',
            hints: ['Қиылысу — <code>&</code>, айырма — <code>-</code>, біріктіру — <code>|</code>.', '<code>both = chess & robotics</code>'],
            check: { tests: `assert both == {"Ерлан", "Әли"}, "both: екі жиынның қиылысы (&)"\nassert only_chess == {"Дана", "Сая"}, "only_chess: chess - robotics"\nassert everyone == {"Әли", "Дана", "Ерлан", "Сая", "Мадина", "Тимур"}, "everyone: біріктіру (|)"` } },
          { type: 'python', xp: 15, level: 'easy', prompt: 'Дүкенге келген тапсырыстардағы қала атаулары қайталанады. <code>unique_cities</code> айнымалысына қайталанбайтын қалалар санын жазыңыз (set арқылы).',
            starter: 'cities = ["Алматы", "Астана", "Алматы", "Шымкент", "Астана", "Алматы", "Атырау"]\nunique_cities = len(cities)\n',
            solution: 'cities = ["Алматы", "Астана", "Алматы", "Шымкент", "Астана", "Алматы", "Атырау"]\nunique_cities = len(set(cities))\n',
            hints: ['<code>set(cities)</code> қайталануды жояды.', '<code>len(set(cities))</code>'],
            check: { tests: `assert unique_cities == 4, "Қайталанбайтын қала саны 4 болуы керек: len(set(cities))"` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: '<code>x = {}</code> жолынан кейін <code>type(x)</code> не болады?', options: ['set', 'dict', 'tuple', 'list'], answer: 1, explain: 'Бос фигуралық жақша — бос сөздік. Бос жиын тек <code>set()</code> арқылы жасалады.' }
        ]
      },
      {
        id: 'pyi-2', title: 'Икемді функциялар: default, *args, **kwargs, lambda', minutes: 14,
        body: `
<p>Негіздерде функцияны <code>def</code> арқылы жазып, оған дәл қажетті аргументтерді бердіңіз. Нақты бағдарламаларда функция икемді болуы керек: кейбір аргументтер міндетті емес, кейде олардың саны алдын ала белгісіз.</p>
<h3>Әдепкі мән (default argument)</h3>
<pre><code>def greet(name, greeting="Сәлем"):
    return f"{greeting}, {name}!"

print(greet("Дана"))                 # Сәлем, Дана!
print(greet("Дана", "Қайырлы таң"))  # Қайырлы таң, Дана!
print(greet(greeting="Hi", name="Ali"))  # аты бар (keyword) аргументтер</code></pre>
<p>Әдепкі мәні бар параметрлер міндетті параметрлерден <b>кейін</b> тұрады.</p>
<h3>*args: кез келген санды позициялық аргумент</h3>
<pre><code>def total(*prices):
    # prices — кортеж: (1200, 800, 450)
    return sum(prices)

print(total(1200, 800, 450))   # 2450
print(total())                 # 0</code></pre>
<h3>**kwargs: кез келген атаулы аргумент</h3>
<pre><code>def make_order(item, **options):
    # options — сөздік: {'size': 'L', 'color': 'қара'}
    parts = [f"{k}={v}" for k, v in options.items()]
    return item + " (" + ", ".join(parts) + ")"

print(make_order("Футболка", size="L", color="қара"))
# Футболка (size=L, color=қара)</code></pre>
<p>Жұлдызша тізімді «ашып» беру үшін де қолданылады: <code>total(*[100, 200])</code> — бұл <code>total(100, 200)</code> дегенмен бірдей; <code>f(**{"a": 1})</code> — <code>f(a=1)</code>.</p>
<h3>lambda: бір жолдық функция</h3>
<pre><code>double = lambda x: x * 2
print(double(21))     # 42
add = lambda a, b: a + b</code></pre>
<p><code>lambda</code> ішінде тек бір өрнек болады, <code>return</code> жазылмайды. Ол көбіне басқа функцияға «қалай сұрыптау керек» дегенді беру үшін қолданылады (келесі сабақта).</p>
<div class="tip"><b>Тұзақ:</b> әдепкі мән ретінде өзгермелі нысан (<code>[]</code>, <code>{}</code>) бермеңіз. <code>def add(x, items=[])</code> — тізім бір рет құрылып, барлық шақыруда ортақ болады. Дұрысы: <code>items=None</code>, ал ішінде <code>if items is None: items = []</code>.</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>greet(name, greeting="Сәлем")</code> функциясын жазыңыз: ол <code>"&lt;greeting&gt;, &lt;name&gt;!"</code> жолын қайтарсын. Мысалы, <code>greet("Дана")</code> → <code>"Сәлем, Дана!"</code>.',
            starter: 'def greet(name, greeting):\n    pass\n',
            solution: 'def greet(name, greeting="Сәлем"):\n    return f"{greeting}, {name}!"\n',
            hints: ['Параметрге әдепкі мән: <code>greeting="Сәлем"</code>.', '<code>return f"{greeting}, {name}!"</code>'],
            check: { tests: `assert greet("Дана") == "Сәлем, Дана!", "greet('Дана') нәтижесі 'Сәлем, Дана!' болуы керек"\nassert greet("Ерлан", "Қайырлы кеш") == "Қайырлы кеш, Ерлан!", "Екінші аргумент greeting орнына түсуі керек"` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Дүкен кассасы: <code>checkout(*prices, discount=0)</code> функциясын жазыңыз. Ол барлық бағаны қосып, <code>discount</code> пайыз жеңілдік жасап, нәтижені <code>round(..., 2)</code> арқылы қайтарсын. <code>checkout(1000, 500, discount=10)</code> → <code>1350.0</code>.',
            starter: 'def checkout(prices, discount=0):\n    return 0\n',
            solution: 'def checkout(*prices, discount=0):\n    return round(sum(prices) * (1 - discount / 100), 2)\n',
            hints: ['<code>*prices</code> — барлық позициялық аргумент кортежге жиналады.', '<code>sum(prices) * (1 - discount / 100)</code>'],
            check: { tests: `assert checkout(1000, 500, discount=10) == 1350.0, "checkout(1000, 500, discount=10) = 1350.0 болуы керек"\nassert checkout(200, 300, 500) == 1000, "Жеңілдіксіз: бағалардың қосындысы"\nassert checkout() == 0, "Тауар жоқ болса, 0"` } },
          { type: 'python', xp: 20, level: 'hard', prompt: '<code>describe(name, **info)</code> функциясын жазыңыз. Ол <code>info</code> кілттерін әліпби бойынша сұрыптап, <code>"Айгерім: age=19; city=Алматы"</code> түріндегі жолды қайтарсын. <code>info</code> бос болса, тек атын қайтарсын: <code>"Айгерім"</code>.',
            starter: 'def describe(name, info):\n    return name\n',
            solution: 'def describe(name, **info):\n    if not info:\n        return name\n    parts = [f"{k}={info[k]}" for k in sorted(info)]\n    return name + ": " + "; ".join(parts)\n',
            hints: ['<code>**info</code> атаулы аргументтерді сөздікке жинайды.', '<code>"; ".join([f"{k}={info[k]}" for k in sorted(info)])</code>'],
            check: { tests: `assert describe("Айгерім", city="Алматы", age=19) == "Айгерім: age=19; city=Алматы", "Кілттер әліпби ретімен: age, city"\nassert describe("Тимур") == "Тимур", "info бос болса, тек атын қайтарыңыз"` } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: '<code>def f(*args, **kwargs): return args, kwargs</code>. <code>f(1, 2, x=3)</code> не қайтарады?', options: ['<code>([1, 2], {"x": 3})</code>', '<code>((1, 2), {"x": 3})</code>', '<code>((1, 2, 3), {})</code>', 'TypeError'], answer: 1, explain: '<code>*args</code> позициялық аргументтерді <b>кортежге</b>, <code>**kwargs</code> атаулы аргументтерді <b>сөздікке</b> жинайды.' }
        ]
      },
      {
        id: 'pyi-3', title: 'sorted, min, max (key) және map, filter, zip, enumerate', minutes: 14,
        body: `
<p>Python-да коллекциялармен жұмыс істеуге арналған дайын функциялар бар. Олар циклді қысқартады және кодты оқуға жеңіл етеді.</p>
<h3>key: «неге қарап салыстыру керек?»</h3>
<p><code>sorted</code>, <code>min</code>, <code>max</code> функцияларына <code>key</code> беруге болады. Ол — әр элементтен салыстыру мәнін алатын функция.</p>
<pre><code>players = [("Әли", 820), ("Дана", 1450), ("Ерлан", 990)]

ranking = sorted(players, key=lambda p: p[1], reverse=True)
# [('Дана', 1450), ('Ерлан', 990), ('Әли', 820)]
best = max(players, key=lambda p: p[1])     # ('Дана', 1450)
shortest = min(["алма", "жүзім", "өрік"], key=len)   # 'алма'</code></pre>
<p>Бірнеше белгі бойынша сұрыптау үшін key кортеж қайтарады: <code>key=lambda s: (-s["grade"], s["name"])</code> — алдымен баға бойынша кему, тең болса атымен.</p>
<h3>enumerate және zip</h3>
<pre><code>names = ["Әли", "Дана", "Ерлан"]
for i, name in enumerate(names, start=1):
    print(i, name)          # 1 Әли, 2 Дана, 3 Ерлан

scores = [820, 1450, 990]
for name, score in zip(names, scores):
    print(name, score)
table = dict(zip(names, scores))   # {'Әли': 820, 'Дана': 1450, 'Ерлан': 990}</code></pre>
<p><code>zip</code> бірнеше тізімді «тігеді»; ең қысқа тізім біткенде тоқтайды.</p>
<h3>map және filter</h3>
<pre><code>prices = [1200, 450, 3000]
with_tax = list(map(lambda p: p * 1.12, prices))     # әр элементке функция
cheap = list(filter(lambda p: p < 1000, prices))    # шартқа сай келетіндер: [450]</code></pre>
<p><code>map</code> мен <code>filter</code> тізім емес, «жалқау» итератор қайтарады (итераторлар туралы кейінірек). Нәтижені көру үшін <code>list(...)</code> орау керек. Көп жағдайда list comprehension бірдей нәрсені анығырақ жазады: <code>[p * 1.12 for p in prices]</code>. Қайсысы түсініктірек болса, соны таңдаңыз.</p>
<div class="tip"><code>sorted(xs)</code> жаңа тізім қайтарады, <code>xs.sort()</code> тізімнің өзін өзгертеді. Екеуі де <code>key</code> және <code>reverse</code> қабылдайды.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: 'Ойын рейтингі. <code>ranking</code> — ұпайы бойынша кемуі ретімен сұрыпталған ойыншылар тізімі; <code>best_name</code> — ең көп ұпай жинаған ойыншының аты (<code>max</code> және <code>key</code> арқылы).',
            starter: 'players = [("Әли", 820), ("Дана", 1450), ("Ерлан", 990), ("Сая", 1210)]\nranking = players\nbest_name = ""\n',
            solution: 'players = [("Әли", 820), ("Дана", 1450), ("Ерлан", 990), ("Сая", 1210)]\nranking = sorted(players, key=lambda p: p[1], reverse=True)\nbest_name = max(players, key=lambda p: p[1])[0]\n',
            hints: ['<code>sorted(players, key=lambda p: p[1], reverse=True)</code>', '<code>max(...)</code> кортеж қайтарады, атына <code>[0]</code> арқылы жетесіз.'],
            check: { tests: `assert ranking == [("Дана", 1450), ("Сая", 1210), ("Ерлан", 990), ("Әли", 820)], "ranking ұпай бойынша кемуі ретімен болуы керек"\nassert best_name == "Дана", "best_name — ең көп ұпайлы ойыншының аты"`, mustInclude: ['key='] } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Емтихан нәтижелері. <code>zip</code> арқылы <code>results</code> сөздігін құрыңыз (аты → балл). Сосын <code>filter</code> арқылы 50 және одан жоғары балл алғандардың аттарын <code>passed</code> тізіміне жинаңыз (бастапқы ретпен).',
            starter: 'names = ["Әли", "Дана", "Ерлан", "Мадина"]\nscores = [45, 88, 50, 39]\nresults = {}\npassed = []\n',
            solution: 'names = ["Әли", "Дана", "Ерлан", "Мадина"]\nscores = [45, 88, 50, 39]\nresults = dict(zip(names, scores))\npassed = list(filter(lambda n: results[n] >= 50, names))\n',
            hints: ['<code>dict(zip(names, scores))</code>', '<code>list(filter(lambda n: results[n] >= 50, names))</code>'],
            check: { tests: `assert results == {"Әли": 45, "Дана": 88, "Ерлан": 50, "Мадина": 39}, "results = dict(zip(names, scores))"\nassert passed == ["Дана", "Ерлан"], "passed: 50 және одан жоғары балл алғандар, бастапқы ретпен"`, mustInclude: ['zip', 'filter'] } },
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>enumerate</code> арқылы <code>lines</code> тізімін құрыңыз: <code>["1. Нан", "2. Сүт", "3. Ірімшік"]</code>. Нөмірлеу 1-ден басталады.',
            starter: 'shopping = ["Нан", "Сүт", "Ірімшік"]\nlines = []\n',
            solution: 'shopping = ["Нан", "Сүт", "Ірімшік"]\nlines = [f"{i}. {item}" for i, item in enumerate(shopping, start=1)]\n',
            hints: ['<code>enumerate(shopping, start=1)</code> жұптар береді: (1, "Нан"), ...', '<code>f"{i}. {item}"</code>'],
            check: { tests: `assert lines == ["1. Нан", "2. Сүт", "3. Ірімшік"], "lines дәл осындай болуы керек: ['1. Нан', '2. Сүт', '3. Ірімшік']"`, mustInclude: ['enumerate'] } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: '<code>print(map(str.upper, ["a", "b"]))</code> не шығарады?', options: ['<code>["A", "B"]</code>', '<code>AB</code>', '<code>&lt;map object at 0x...&gt;</code>', 'Қате'], answer: 2, explain: '<code>map</code> жалқау итератор қайтарады. Мәндерді көру үшін <code>list(map(...))</code> жазу керек.' }
        ]
      },
      {
        id: 'pyi-4', title: 'Dict және set comprehension', minutes: 11,
        body: `
<p>List comprehension-ды білесіз: <code>[x * 2 for x in xs]</code>. Дәл осы жазу түрі сөздік пен жиынға да бар. Ол «бір коллекциядан екіншісін жасау» міндетін бір жолмен шешеді.</p>
<h3>Dict comprehension</h3>
<p>Пішімі: <code>{кілт: мән for элемент in коллекция if шарт}</code>.</p>
<pre><code>prices = {"Нан": 250, "Сүт": 520, "Ірімшік": 2400, "Шай": 1300}

# Барлық бағаға 12% ҚҚС қосу
with_vat = {name: round(p * 1.12) for name, p in prices.items()}

# Тек 1000 ₸-ден арзандар
cheap = {name: p for name, p in prices.items() if p < 1000}
# {'Нан': 250, 'Сүт': 520}

# Тізімнен сөздік: сөз → ұзындығы
words = ["алма", "жүзім", "қарбыз"]
lengths = {w: len(w) for w in words}   # {'алма': 4, 'жүзім': 5, 'қарбыз': 6}

# Кілт пен мәнді ауыстыру (мәндер қайталанбаса)
codes = {"ALA": "Алматы", "NQZ": "Астана"}
by_city = {city: code for code, city in codes.items()}</code></pre>
<p>Негізгі құрал — <code>.items()</code>: ол <code>(кілт, мән)</code> жұптарын береді, біз оларды бірден екі айнымалыға таратамыз (өткен сабақтағы unpacking).</p>
<h3>Set comprehension</h3>
<p>Пішімі дәл сондай, бірақ қос нүкте жоқ: <code>{өрнек for элемент in коллекция}</code>. Нәтижеде қайталанулар өздігінен жойылады.</p>
<pre><code>emails = ["ali@mail.kz", "dana@gmail.com", "erlan@mail.kz"]
domains = {e.split("@")[1] for e in emails}   # {'mail.kz', 'gmail.com'}

names = ["Әли", "Арман", "Дана", "Ерлан", "Динара"]
letters = {n[0] for n in names}               # {'Ә', 'А', 'Д', 'Е'}</code></pre>
<h3>Шартты мән</h3>
<p>Мән бөлігінде <code>if ... else</code> өрнегін қолдануға болады:</p>
<pre><code>grades = {"Әли": 45, "Дана": 88, "Ерлан": 67}
status = {n: ("өтті" if g >= 50 else "құлады") for n, g in grades.items()}</code></pre>
<div class="tip">Comprehension соңындағы <code>if</code> — <b>сүзгі</b> (элементті алып тастайды). Мәннің ішіндегі <code>a if шарт else b</code> — <b>таңдау</b> (элемент қалады, тек мәні өзгереді). Бұларды шатастырмаңыз. Ал логика 2–3 шарттан күрделі болса, кәдімгі <code>for</code> циклін жазған дұрыс: оқуға жеңілірек.</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: 'Dict comprehension арқылы <code>discounted</code> сөздігін құрыңыз: әр тауардың бағасы 20%-ға арзандасын (<code>int(p * 0.8)</code>).',
            starter: 'prices = {"Кітап": 4500, "Қалам": 300, "Дәптер": 650}\ndiscounted = {}\n',
            solution: 'prices = {"Кітап": 4500, "Қалам": 300, "Дәптер": 650}\ndiscounted = {name: int(p * 0.8) for name, p in prices.items()}\n',
            hints: ['<code>for name, p in prices.items()</code>', '<code>{name: int(p * 0.8) for name, p in prices.items()}</code>'],
            check: { tests: `assert discounted == {"Кітап": 3600, "Қалам": 240, "Дәптер": 520}, "Әр баға int(p * 0.8) болуы керек"` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Студенттердің баллдары берілген. Екі айнымалы құрыңыз: <code>honors</code> — тек 90 және одан жоғары балл алғандар (аты → балл, dict comprehension), <code>groups</code> — студенттер оқитын топтардың қайталанбайтын жиыны (set comprehension).',
            starter: 'students = [\n    {"name": "Әли", "group": "IT-21", "score": 92},\n    {"name": "Дана", "group": "IT-22", "score": 78},\n    {"name": "Ерлан", "group": "IT-21", "score": 95},\n    {"name": "Сая", "group": "IT-23", "score": 88},\n]\nhonors = {}\ngroups = set()\n',
            solution: 'students = [\n    {"name": "Әли", "group": "IT-21", "score": 92},\n    {"name": "Дана", "group": "IT-22", "score": 78},\n    {"name": "Ерлан", "group": "IT-21", "score": 95},\n    {"name": "Сая", "group": "IT-23", "score": 88},\n]\nhonors = {s["name"]: s["score"] for s in students if s["score"] >= 90}\ngroups = {s["group"] for s in students}\n',
            hints: ['<code>{s["name"]: s["score"] for s in students if ...}</code>', 'Set: <code>{s["group"] for s in students}</code>'],
            check: { tests: `assert honors == {"Әли": 92, "Ерлан": 95}, "honors: тек score >= 90 студенттер"\nassert groups == {"IT-21", "IT-22", "IT-23"}, "groups: қайталанбайтын топ атаулары"` } },
          { type: 'python', xp: 20, level: 'hard', prompt: 'Ойын түймелерінің сөздігі <code>keys</code> берілген (әрекет → перне). Кілт пен мәнді ауыстырып <code>by_key</code> сөздігін құрыңыз (перне → әрекет). Сосын <code>status</code> сөздігін құрыңыз: <code>scores</code> ішіндегі әр ойыншы үшін 1000-нан көп болса <code>"pro"</code>, әйтпесе <code>"new"</code>.',
            starter: 'keys = {"jump": "W", "left": "A", "right": "D", "fire": "Space"}\nscores = {"Әли": 820, "Дана": 1450, "Тимур": 1001}\nby_key = keys\nstatus = {}\n',
            solution: 'keys = {"jump": "W", "left": "A", "right": "D", "fire": "Space"}\nscores = {"Әли": 820, "Дана": 1450, "Тимур": 1001}\nby_key = {k: action for action, k in keys.items()}\nstatus = {n: ("pro" if s > 1000 else "new") for n, s in scores.items()}\n',
            hints: ['Ауыстыру: <code>{k: action for action, k in keys.items()}</code>', 'Таңдау: <code>"pro" if s > 1000 else "new"</code>'],
            check: { tests: `assert by_key == {"W": "jump", "A": "left", "D": "right", "Space": "fire"}, "by_key: перне → әрекет"\nassert status == {"Әли": "new", "Дана": "pro", "Тимур": "pro"}, "status: 1000-нан көп болса pro, әйтпесе new"` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: '<code>{len(w) for w in ["ит", "мысық", "ат", "сиыр"]}</code> өрнегінің нәтижесі қандай?', options: ['<code>[2, 5, 2, 4]</code>', '<code>{2, 5, 4}</code>', '<code>{"ит": 2, "мысық": 5, "ат": 2, "сиыр": 4}</code>', '<code>{2, 5, 2, 4}</code>'], answer: 1, explain: 'Қос нүкте жоқ болғандықтан бұл — set comprehension. Жиын қайталанған 2-ні бір-ақ рет сақтайды.' }
        ]
      },
      {
        id: 'pyi-5', title: 'Рекурсия', minutes: 13,
        body: `
<p><b>Рекурсия</b> — функцияның өзін-өзі шақыруы. Ол үлкен есепті дәл сондай, бірақ кішірек есепке бөлуге болатын жерде қолданылады: орыс матрешкасын ашқанда ішінен тағы матрешка шығады, ең кішкентайына жеткенде тоқтайсыз.</p>
<h3>Екі міндетті бөлік</h3>
<ul>
<li><b>Базалық жағдай</b> (base case) — жауабы бірден белгілі ең қарапайым жағдай. Ол болмаса, функция шексіз шақырыла береді.</li>
<li><b>Рекурсивті қадам</b> — есепті кішірейтіп, функцияның өзін шақыру.</li>
</ul>
<pre><code>def factorial(n):
    if n <= 1:                    # базалық жағдай
        return 1
    return n * factorial(n - 1)   # рекурсивті қадам

print(factorial(5))   # 120</code></pre>
<p>Не болып жатыр? <code>factorial(5)</code> = 5 × <code>factorial(4)</code> = 5 × 4 × <code>factorial(3)</code> = … = 5 × 4 × 3 × 2 × 1. Әр шақыру өз нәтижесін күтіп «стекте» тұрады, базалық жағдайға жеткенде жауаптар кері қарай жиналады.</p>
<h3>Мысал: санның цифрларын қосу</h3>
<pre><code>def digit_sum(n):
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)

print(digit_sum(2026))   # 2 + 0 + 2 + 6 = 10</code></pre>
<h3>Рекурсия қай жерде шынымен ыңғайлы?</h3>
<p>Ағаш тәрізді құрылымдарда: папкалар ішіндегі папкалар, тізім ішіндегі тізімдер, мәзір ішіндегі мәзірлер. Мұнда цикл жазу қиын, ал рекурсия табиғи:</p>
<pre><code>def count_files(folder):
    # folder — тізім: ішінде файл атаулары (str) немесе ішкі папкалар (list)
    total = 0
    for item in folder:
        if isinstance(item, list):
            total += count_files(item)   # ішкі папкаға «кіреміз»
        else:
            total += 1
    return total

disk = ["a.txt", ["b.png", "c.png", ["d.mp3"]], "e.pdf"]
print(count_files(disk))   # 5</code></pre>
<div class="tip">Python рекурсия тереңдігін шектейді (әдетте ~1000). Тым терең болса — <code>RecursionError</code>. Қарапайым санауға цикл жеткілікті; рекурсияны ағаш тәрізді деректерге және «бөліп ал да жең» алгоритмдеріне сақтаңыз. Сондай-ақ <code>fib(n) = fib(n-1) + fib(n-2)</code> сияқты аңғал рекурсия бір есепті қайта-қайта шешеді, сондықтан баяу.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'easy', prompt: 'Рекурсивті <code>power(base, exp)</code> функциясын жазыңыз: ол <code>base</code>-ті <code>exp</code> дәрежесіне көтерсін (<code>exp</code> ≥ 0). <code>**</code> операторын және циклді қолданбаңыз: <code>power(b, 0) = 1</code>, <code>power(b, e) = b * power(b, e - 1)</code>.',
            starter: 'def power(base, exp):\n    return 0\n',
            solution: 'def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n',
            hints: ['Базалық жағдай: <code>if exp == 0: return 1</code>', 'Рекурсивті қадам: <code>return base * power(base, exp - 1)</code>'],
            check: { tests: `assert power(2, 10) == 1024, "power(2, 10) = 1024 болуы керек"\nassert power(7, 0) == 1, "Кез келген сан 0 дәрежеде 1"\nassert "power" in power.__code__.co_names, "Функция өзін-өзі шақыруы керек (рекурсия)"` } },
          { type: 'python', xp: 25, level: 'hard', prompt: 'Дүкен каталогы ішкі тізімдерден тұрады. Рекурсивті <code>flatten(items)</code> функциясын жазыңыз: ол кез келген тереңдіктегі тізімді бір жазық тізімге айналдырсын, рет сақталсын. <code>flatten([1, [2, [3, 4]], 5])</code> → <code>[1, 2, 3, 4, 5]</code>.',
            starter: 'def flatten(items):\n    return items\n',
            solution: 'def flatten(items):\n    result = []\n    for x in items:\n        if isinstance(x, list):\n            result.extend(flatten(x))\n        else:\n            result.append(x)\n    return result\n',
            hints: ['Әр элемент үшін: тізім болса — <code>flatten(x)</code> нәтижесін <code>extend</code> етіңіз, әйтпесе <code>append</code>.', '<code>isinstance(x, list)</code>'],
            check: { tests: `assert flatten([1, [2, [3, 4]], 5]) == [1, 2, 3, 4, 5], "flatten([1, [2, [3, 4]], 5]) → [1, 2, 3, 4, 5]"\nassert flatten(["Телефон", ["Чехол", ["Әйнек", []]], "Зарядтағыш"]) == ["Телефон", "Чехол", "Әйнек", "Зарядтағыш"], "Бос ішкі тізімдер жай жоғалуы керек"\nassert flatten([]) == [], "Бос тізім → бос тізім"` } },
          { type: 'number', xp: 10, level: 'medium', prompt: 'Аңғал Фибоначчи: <code>def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)</code>. <code>fib(4)</code> шақырылғанда <code>fib</code> функциясы барлығы неше рет шақырылады (алғашқы шақыруды қоса)?', answer: 9, tol: 0, explain: 'C(0)=C(1)=1, C(n)=1+C(n−1)+C(n−2): C(2)=3, C(3)=5, C(4)=1+5+3=9. Сондықтан аңғал рекурсия тез баяулайды.' },
          { type: 'quiz', xp: 10, level: 'easy', prompt: 'Рекурсивті функцияда базалық жағдай болмаса не болады?', options: ['Функция 0 қайтарады', 'Python оны өзі циклге айналдырады', 'Шақырулар тоқтамай, ақыры RecursionError шығады', 'Ештеңе: базалық жағдай міндетті емес'], answer: 2, explain: 'Базалық жағдайсыз функция өзін шексіз шақырады; Python тереңдік шегіне жеткенде <code>RecursionError</code> береді.' }
        ]
      },
      {
        id: 'pyi-6', title: 'Класстар мен объектілер', minutes: 15,
        body: `
<p>Осы уақытқа дейін деректер (сөздік, тізім) мен оларды өңдейтін функциялар бөлек өмір сүрді. <b>Класс</b> оларды біріктіреді: бір «нәрсенің» күйі (attributes) және оның әрекеттері (methods) бір жерде тұрады. Класс — сызба (чертеж), ал <b>объект</b> (instance) — сол сызба бойынша жасалған нақты зат.</p>
<h3>Алғашқы класс</h3>
<pre><code>class Student:
    school = "№25 мектеп"            # класс атрибуты: барлық студентке ортақ

    def __init__(self, name, grade):
        self.name = name               # объект атрибуттары
        self.grade = grade
        self.marks = []

    def add_mark(self, mark):          # әдіс (method)
        self.marks.append(mark)

    def average(self):
        if not self.marks:
            return 0
        return sum(self.marks) / len(self.marks)

    def __str__(self):
        return f"{self.name} ({self.grade}-сынып)"

    def __repr__(self):
        return f"Student({self.name!r}, {self.grade})"

ali = Student("Әли", 9)       # __init__ шақырылады
ali.add_mark(5); ali.add_mark(4)
print(ali.average())           # 4.5
print(ali)                     # Әли (9-сынып)  ← __str__
print([ali])                   # [Student('Әли', 9)]  ← __repr__
print(ali.school)              # №25 мектеп</code></pre>
<h3>Негізгі ұғымдар</h3>
<ul>
<li><code>__init__</code> — конструктор: объект жасалғанда бір рет орындалып, бастапқы күйді орнатады.</li>
<li><code>self</code> — «осы объектінің өзі». Әр әдістің бірінші параметрі. <code>ali.add_mark(5)</code> шын мәнінде <code>Student.add_mark(ali, 5)</code>.</li>
<li><b>Объект атрибуты</b> (<code>self.name</code>) әр объектіде өзінше. <b>Класс атрибуты</b> (<code>school</code>) класқа тиесілі және барлығына ортақ; оны <code>Student.school</code> арқылы өзгертсеңіз, бәрінде өзгереді.</li>
<li><code>__str__</code> — адамға арналған әдемі мәтін (<code>print</code>, <code>str()</code>). <code>__repr__</code> — әзірлеушіге арналған нақты сипаттама (консоль, тізім ішінде көрсету).</li>
</ul>
<div class="tip">Класс атрибутын өзгерту үшін <code>self.count += 1</code> емес, <code>ClassName.count += 1</code> жазыңыз. Әйтпесе Python объектіге <b>жаңа</b> атрибут жасап қояды да, ортақ мән өзгермейді.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'easy', prompt: '<code>Product</code> класын жазыңыз: <code>__init__(self, name, price, qty)</code> үш атрибутты сақтасын; <code>total()</code> әдісі <code>price * qty</code> қайтарсын; <code>__str__</code> мына жолды қайтарсын: <code>"Ноутбук: 350000 ₸ x 2"</code>.',
            starter: 'class Product:\n    pass\n',
            solution: 'class Product:\n    def __init__(self, name, price, qty):\n        self.name = name\n        self.price = price\n        self.qty = qty\n\n    def total(self):\n        return self.price * self.qty\n\n    def __str__(self):\n        return f"{self.name}: {self.price} ₸ x {self.qty}"\n',
            hints: ['<code>self.name = name</code> және т.с.с.', '<code>return f"{self.name}: {self.price} ₸ x {self.qty}"</code>'],
            check: { tests: `_p = Product("Ноутбук", 350000, 2)\nassert _p.name == "Ноутбук" and _p.price == 350000 and _p.qty == 2, "__init__ name, price, qty сақтауы керек"\nassert _p.total() == 700000, "total() = price * qty"\nassert str(_p) == "Ноутбук: 350000 ₸ x 2", "__str__ пішімі: 'Ноутбук: 350000 ₸ x 2'"` } },
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>Player</code> класы: класс атрибуты <code>count = 0</code> жасалған ойыншылар санын есептесін (әр <code>__init__</code>-те 1-ге өссін). Әр ойыншыда <code>name</code> және <code>hp = 100</code>. <code>take_damage(amount)</code> әдісі <code>hp</code>-ны азайтсын, бірақ 0-ден төмен түсірмесін. <code>is_alive()</code> — <code>hp > 0</code>.',
            starter: 'class Player:\n    count = 0\n\n    def __init__(self, name):\n        self.name = name\n',
            solution: 'class Player:\n    count = 0\n\n    def __init__(self, name):\n        self.name = name\n        self.hp = 100\n        Player.count += 1\n\n    def take_damage(self, amount):\n        self.hp = max(0, self.hp - amount)\n\n    def is_alive(self):\n        return self.hp > 0\n',
            hints: ['Класс атрибутын <code>Player.count += 1</code> арқылы өсіріңіз.', '<code>self.hp = max(0, self.hp - amount)</code>'],
            check: { tests: `_c0 = Player.count\n_a = Player("Әли"); _b = Player("Дана")\nassert Player.count == _c0 + 2, "Әр жаңа ойыншы Player.count-ты 1-ге өсіруі керек"\nassert _a.hp == 100, "Бастапқы hp = 100"\n_a.take_damage(30)\nassert _a.hp == 70 and _b.hp == 100, "take_damage тек сол ойыншының hp-сын азайтады"\n_a.take_damage(500)\nassert _a.hp == 0, "hp 0-ден төмен түспеуі керек"\nassert not _a.is_alive() and _b.is_alive(), "is_alive(): hp > 0"` } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: '<code>print(obj)</code> жазғанда класта <code>__str__</code> да, <code>__repr__</code> да анықталған. Қайсысы шақырылады?', options: ['<code>__repr__</code>', '<code>__str__</code>', 'Екеуі де кезекпен', '<code>__init__</code>'], answer: 1, explain: '<code>print</code> және <code>str()</code> алдымен <code>__str__</code>-ды іздейді. <code>__repr__</code> консольде, тізім ішінде және <code>__str__</code> жоқ кезде қолданылады.' }
        ]
      },
      {
        id: 'pyi-7', title: 'Мұрагерлік, super(), полиморфизм және dunder әдістер', minutes: 16,
        body: `
<p>Кейде бір класс екіншісінің «ерекше түрі» болады: жинақ шоты — банк шотының бір түрі, ит — жануардың бір түрі. Мұндай кезде кодты қайталамай, <b>мұрагерлік</b> (inheritance) қолданамыз: бала класс (child) ата класстың (parent) барлық атрибуттары мен әдістерін алады және өзінікін қосады.</p>
<pre><code>class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

class SavingsAccount(Account):            # Account-тан мұра алады
    def __init__(self, owner, balance=0, rate=0.1):
        super().__init__(owner, balance)  # ата класстың __init__-і
        self.rate = rate

    def add_interest(self):
        self.balance += self.balance * self.rate

s = SavingsAccount("Дана", 10000)
s.deposit(5000)        # әдіс Account-тан келді
s.add_interest()
print(s.balance)       # 16500.0
print(isinstance(s, Account))   # True</code></pre>
<p><code>super()</code> — ата класқа сілтеме. Ол ата класс жасайтын жұмысты қайталамауға мүмкіндік береді.</p>
<h3>Полиморфизм: бір әдіс, әртүрлі әрекет</h3>
<pre><code>class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):            # әдісті қайта анықтау (override)
        return "Ау-ау"

class Cat(Animal):
    def speak(self):
        return "Мияу"

for a in [Dog(), Cat(), Animal()]:
    print(a.speak())            # Ау-ау, Мияу, ...</code></pre>
<p>Цикл объектінің нақты класын білмейді, тек <code>speak()</code> әдісі бар екенін біледі. Осыған дейін жазған кодыңыз жаңа класстармен де өзгеріссіз жұмыс істейді.</p>
<h3>Dunder әдістер: Python операторларын үйрету</h3>
<p>Екі асты сызықпен қоршалған әдістер (double underscore, «dunder») класты Python-ның кірістірілген мүмкіндіктеріне қосады:</p>
<pre><code>class Song:
    def __init__(self, title, seconds):
        self.title, self.seconds = title, seconds
    def __eq__(self, other):     # ==
        return self.title == other.title and self.seconds == other.seconds
    def __lt__(self, other):     # <  (sorted, min, max осыны қолданады)
        return self.seconds < other.seconds

class Playlist:
    def __init__(self):
        self.songs = []
    def __len__(self):           # len(playlist)
        return len(self.songs)</code></pre>
<p>Басқалары: <code>__add__</code> (<code>+</code>), <code>__contains__</code> (<code>in</code>), <code>__getitem__</code> (<code>p[0]</code>).</p>
<div class="tip"><code>__eq__</code> анықталмаса, <code>==</code> екі айнымалы <b>бір объектіге</b> сілтейтінін ғана тексереді: мәндері бірдей екі <code>Song</code> «тең емес» болып шығады.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>Account</code> класы дайын. Одан мұра алатын <code>SavingsAccount</code> класын жазыңыз: <code>__init__(self, owner, balance=0, rate=0.05)</code> <code>super()</code> арқылы ата класты шақырып, <code>rate</code>-ті сақтасын; <code>add_interest()</code> балансқа <code>balance * rate</code> қосып, нәтижені <code>round(..., 2)</code> етсін.',
            starter: 'class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n\nclass SavingsAccount:\n    pass\n',
            solution: 'class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n\nclass SavingsAccount(Account):\n    def __init__(self, owner, balance=0, rate=0.05):\n        super().__init__(owner, balance)\n        self.rate = rate\n\n    def add_interest(self):\n        self.balance = round(self.balance + self.balance * self.rate, 2)\n',
            hints: ['<code>class SavingsAccount(Account):</code>', '<code>super().__init__(owner, balance)</code>, сосын <code>self.rate = rate</code>'],
            check: { tests: `_s = SavingsAccount("Дана", 10000)\nassert isinstance(_s, Account), "SavingsAccount Account-тан мұра алуы керек"\nassert _s.owner == "Дана" and _s.balance == 10000 and _s.rate == 0.05, "owner, balance, rate дұрыс сақталуы керек"\n_s.deposit(2000)\n_s.add_interest()\nassert _s.balance == 12600.0, "10000 + 2000, сосын 5% → 12600.0"`, mustInclude: ['super()'] } },
          { type: 'python', xp: 25, level: 'hard', prompt: '<code>Song</code> және <code>Playlist</code> кластарын аяқтаңыз. <code>Song</code>: <code>__eq__</code> (атауы мен ұзақтығы бірдей болса тең), <code>__lt__</code> (ұзақтығы бойынша салыстыру). <code>Playlist</code>: <code>add(song)</code>, <code>__len__</code> (ән саны), <code>total_seconds()</code> (жалпы ұзақтық).',
            starter: 'class Song:\n    def __init__(self, title, seconds):\n        self.title = title\n        self.seconds = seconds\n\n\nclass Playlist:\n    def __init__(self):\n        self.songs = []\n',
            solution: 'class Song:\n    def __init__(self, title, seconds):\n        self.title = title\n        self.seconds = seconds\n\n    def __eq__(self, other):\n        return self.title == other.title and self.seconds == other.seconds\n\n    def __lt__(self, other):\n        return self.seconds < other.seconds\n\n\nclass Playlist:\n    def __init__(self):\n        self.songs = []\n\n    def add(self, song):\n        self.songs.append(song)\n\n    def __len__(self):\n        return len(self.songs)\n\n    def total_seconds(self):\n        return sum(s.seconds for s in self.songs)\n',
            hints: ['<code>def __lt__(self, other): return self.seconds < other.seconds</code>', '<code>def __len__(self): return len(self.songs)</code>'],
            check: { tests: `_a, _b, _c = Song("Көктем", 200), Song("Дала", 150), Song("Арман", 260)\nassert Song("Дала", 150) == _b, "Атауы мен ұзақтығы бірдей әндер тең болуы керек (__eq__)"\nassert _b < _a, "__lt__ ұзақтық бойынша салыстырады"\nassert [s.title for s in sorted([_a, _b, _c])] == ["Дала", "Көктем", "Арман"], "sorted() ұзақтық бойынша сұрыптауы керек"\n_pl = Playlist(); _pl.add(_a); _pl.add(_b)\nassert len(_pl) == 2, "len(playlist) әндер санын беруі керек"\nassert _pl.total_seconds() == 350, "total_seconds() = 200 + 150"` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: '<code>class Cat(Animal)</code> ішінде <code>speak</code> қайта анықталған, ал <code>Animal</code>-да <code>sleep</code> әдісі бар. <code>Cat().sleep()</code> шақырылса не болады?', options: ['AttributeError: Cat-та sleep жоқ', '<code>Animal</code>-дағы <code>sleep</code> орындалады', 'Алдымен <code>speak</code> шақырылады', 'TypeError'], answer: 1, explain: 'Бала класс ата класстың әдістерін мұра етеді. Python әдісті алдымен <code>Cat</code>-тан, табылмаса <code>Animal</code>-дан іздейді.' }
        ]
      },
      {
        id: 'pyi-8', title: 'Модульдер мен import', minutes: 11,
        body: `
<p>Бағдарлама өскен сайын барлық кодты бір файлға сыйғызу қиын. <b>Модуль</b> — жай ғана <code>.py</code> файл; ондағы функциялар мен кластарды басқа файлда <code>import</code> арқылы қолдануға болады. Бірнеше модуль бір папкада жиналса (<code>__init__.py</code> файлымен), ол <b>пакет</b> (package) деп аталады.</p>
<h3>Импорттың төрт түрі</h3>
<pre><code>import math                    # бүкіл модуль: math.sqrt(16)
from math import sqrt, pi      # тек керек атаулар: sqrt(16)
import datetime as dt          # қысқа лақап ат (alias): dt.date.today()
from random import *           # бәрін — ұсынылмайды: атаулар қайдан келгені түсініксіз</code></pre>
<p>Python стандартты кітапханасында жүздеген модуль бар: <code>math</code>, <code>random</code>, <code>datetime</code>, <code>json</code>, <code>collections</code>, <code>string</code>, <code>os</code>, <code>pathlib</code>. Сырттан орнатылатын пакеттер (мысалы, <code>requests</code>) терминалда <code>pip install requests</code> арқылы қосылады.</p>
<h3>Өз модуліңізді жазу</h3>
<pre><code># shop_utils.py
VAT = 0.12

def with_vat(price):
    return round(price * (1 + VAT))

if __name__ == "__main__":
    # тек файлды тікелей іске қосқанда орындалады
    print(with_vat(1000))</code></pre>
<pre><code># main.py
from shop_utils import with_vat
print(with_vat(2500))      # 2800</code></pre>
<h3><code>if __name__ == "__main__"</code> не үшін керек?</h3>
<p>Әр модульде <code>__name__</code> деген арнайы айнымалы бар. Файлды тікелей іске қоссаңыз (<code>python shop_utils.py</code>), оның мәні <code>"__main__"</code> болады. Ал файл басқа жерден импортталса, мәні — модуль аты (<code>"shop_utils"</code>). Сондықтан бұл шарттың ішіндегі код (тесттер, демо, бағдарламаның басталуы) импорт кезінде орындалмайды. Мұнсыз <code>import</code> жасағанда күтпеген <code>print</code>-тер шығып кетер еді.</p>
<div class="tip">Модуль бір рет қана жүктеледі: екінші <code>import</code> оны қайта орындамайды. Файлдарыңызды стандартты модуль атымен атамаңыз (<code>random.py</code>, <code>json.py</code>): Python сіздің файлыңызды импорттап, қате береді.</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: 'Мектеп экскурсиясы: 128 оқушы, бір автобуста 45 орын. <code>math</code> модулін импорттап, <code>buses</code> айнымалысына қажет автобус санын жазыңыз (<code>math.ceil</code> — жоғары дөңгелектеу).',
            starter: 'students = 128\nseats = 45\nbuses = students // seats\n',
            solution: 'import math\n\nstudents = 128\nseats = 45\nbuses = math.ceil(students / seats)\n',
            hints: ['<code>import math</code>', '<code>math.ceil(students / seats)</code>'],
            check: { tests: `assert buses == 3, "128 оқушыға 45 орынды 3 автобус керек"`, mustInclude: ['import math'] } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Құпиясөз тексергіш. <code>from string import digits, ascii_uppercase</code> жолымен импорттап, <code>is_strong(pw)</code> функциясын жазыңыз: ұзындығы кемінде 8, ішінде кемінде бір цифр және бір латын бас әрпі болса <code>True</code>.',
            starter: 'def is_strong(pw):\n    return len(pw) >= 8\n',
            solution: 'from string import digits, ascii_uppercase\n\ndef is_strong(pw):\n    has_digit = any(ch in digits for ch in pw)\n    has_upper = any(ch in ascii_uppercase for ch in pw)\n    return len(pw) >= 8 and has_digit and has_upper\n',
            hints: ['<code>any(ch in digits for ch in pw)</code>', 'Үш шартты <code>and</code> арқылы біріктіріңіз.'],
            check: { tests: `assert is_strong("Almaty2026") is True, "Almaty2026 — күшті құпиясөз"\nassert is_strong("almaty2026") is False, "Бас әріп жоқ → False"\nassert is_strong("Almatyyy") is False, "Цифр жоқ → False"\nassert is_strong("Ab1") is False, "8 таңбадан қысқа → False"`, mustInclude: ['from string import'] } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: '<code>shop_utils.py</code> файлының соңында <code>if __name__ == "__main__": print("demo")</code> бар. <code>main.py</code> ішінде <code>import shop_utils</code> жазып, <code>python main.py</code> іске қосылды. <code>demo</code> шыға ма?', options: ['Иә, импорт кезінде бүкіл файл орындалады', 'Жоқ: импортталғанда __name__ мәні "shop_utils" болады', 'Иә, бірақ тек бірінші рет', 'Қате шығады'], answer: 1, explain: 'Импортталған модульде <code>__name__</code> — модуль аты. <code>"__main__"</code> тек тікелей іске қосылған файлда болады.' },
          { type: 'quiz', xp: 10, level: 'easy', prompt: '<code>import datetime as dt</code> жазылды. Бүгінгі күнді қалай аласыз?', options: ['<code>datetime.date.today()</code>', '<code>dt.date.today()</code>', '<code>date.today()</code>', '<code>as.date.today()</code>'], answer: 1, explain: 'Лақап атпен импорттағанда модульге тек сол атпен жүгінесіз: <code>dt</code>.' }
        ]
      },
      {
        id: 'pyi-9', title: 'Файлдар: open, with және json', minutes: 14,
        body: `
<p>Айнымалылар бағдарлама жабылғанда жоғалады. Деректі сақтап қалу үшін оны <b>файлға</b> жазамыз. (Бұл беттегі Python браузер ішіндегі виртуалды файл жүйесімен жұмыс істейді, сондықтан файлдарды еркін жазып-оқи аласыз.)</p>
<h3>open және with</h3>
<pre><code>with open("todo.txt", "w", encoding="utf-8") as f:
    f.write("Сабақ оқу\\n")
    f.write("Дүкенге бару\\n")

with open("todo.txt", encoding="utf-8") as f:
    lines = [line.strip() for line in f]
print(lines)    # ['Сабақ оқу', 'Дүкенге бару']</code></pre>
<p><code>with</code> блогы аяқталғанда файл өздігінен жабылады, тіпті ішінде қате болса да. Сондықтан <code>f = open(...)</code> … <code>f.close()</code> орнына әрқашан <code>with</code> жазыңыз.</p>
<table>
<tr><th>Режим</th><th>Мағынасы</th></tr>
<tr><td><code>"r"</code></td><td>оқу (әдепкі); файл жоқ болса — <code>FileNotFoundError</code></td></tr>
<tr><td><code>"w"</code></td><td>жазу; бар файлдың ішін <b>өшіріп</b>, қайта жазады</td></tr>
<tr><td><code>"a"</code></td><td>соңына қосу (append)</td></tr>
</table>
<p>Оқу тәсілдері: <code>f.read()</code> — бүкіл мәтін бір жолмен; <code>f.readlines()</code> — жолдар тізімі; <code>for line in f</code> — жолма-жол (үлкен файлдарға ең үнемді). Әр жолдың соңында <code>\\n</code> болады, оны <code>.strip()</code> алып тастайды. Қазақ әріптері дұрыс сақталуы үшін <code>encoding="utf-8"</code> жазыңыз.</p>
<h3>json: құрылымды деректі сақтау</h3>
<p>Сөздіктер мен тізімдерді мәтін ретінде сақтаудың стандартты пішімі — <b>JSON</b>. Ол веб-API-лерде де, баптау файлдарында да қолданылады.</p>
<pre><code>import json

stock = {"Нан": 40, "Сүт": 25, "Шай": 12}

with open("stock.json", "w", encoding="utf-8") as f:
    json.dump(stock, f, ensure_ascii=False, indent=2)   # файлға жазу

with open("stock.json", encoding="utf-8") as f:
    loaded = json.load(f)                                 # файлдан оқу

text = json.dumps(stock, ensure_ascii=False)   # жолға: '{"Нан": 40, ...}'
back = json.loads(text)                        # жолдан сөздікке</code></pre>
<p>Есте сақтау тәсілі: <code>s</code> әрпі бар нұсқа (<code>dumps</code>, <code>loads</code>) — <b>string</b>-пен жұмыс істейді, онсыз — файлмен. <code>ensure_ascii=False</code> кириллицаны <code>\\u04d8</code> сияқты кодқа айналдырмай, оқылатын күйде сақтайды.</p>
<div class="tip">JSON-да кортеж жоқ (тізімге айналады), ал сөздік кілттері тек жол бола алады: <code>{1: "a"}</code> сақталып, қайта оқылғанда <code>{"1": "a"}</code> болады.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'easy', prompt: '<code>tasks</code> тізімін <code>"tasks_pyi.txt"</code> файлына әр тапсырманы жеке жолға жазыңыз (<code>with open(..., "w")</code>). Сосын файлды қайта оқып, жолдарды <code>.strip()</code> арқылы тазалап, <code>lines</code> тізіміне жинаңыз.',
            starter: 'tasks = ["Үй тапсырмасы", "Спорт залы", "Әжеге қоңырау"]\n',
            solution: 'tasks = ["Үй тапсырмасы", "Спорт залы", "Әжеге қоңырау"]\nwith open("tasks_pyi.txt", "w", encoding="utf-8") as f:\n    for t in tasks:\n        f.write(t + "\\n")\n\nwith open("tasks_pyi.txt", encoding="utf-8") as f:\n    lines = [line.strip() for line in f]\n',
            hints: ['Жазу: <code>f.write(t + "\\n")</code>', 'Оқу: <code>[line.strip() for line in f]</code>'],
            check: { tests: `assert lines == tasks, "lines файлдан оқылған тапсырмалар тізімі болуы керек"\nwith open("tasks_pyi.txt", encoding="utf-8") as _f:\n    _txt = _f.read()\nassert _txt.splitlines() == tasks, "Файлда әр тапсырма жеке жолда тұруы керек"`, mustInclude: ['with open'] } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Қойма қалдығы. <code>stock</code> сөздігін <code>json.dump</code> арқылы <code>"stock_pyi.json"</code> файлына сақтаңыз. Файлды <code>json.load</code> арқылы оқып, <code>loaded</code> айнымалысына жазыңыз. Соңында <code>loaded</code> ішінде «Шай» қалдығын 12-ден 30-ға өзгертіп, файлды қайта сақтаңыз.',
            starter: 'import json\n\nstock = {"Нан": 40, "Сүт": 25, "Шай": 12}\n',
            solution: 'import json\n\nstock = {"Нан": 40, "Сүт": 25, "Шай": 12}\nwith open("stock_pyi.json", "w", encoding="utf-8") as f:\n    json.dump(stock, f, ensure_ascii=False)\n\nwith open("stock_pyi.json", encoding="utf-8") as f:\n    loaded = json.load(f)\n\nloaded["Шай"] = 30\nwith open("stock_pyi.json", "w", encoding="utf-8") as f:\n    json.dump(loaded, f, ensure_ascii=False)\n',
            hints: ['<code>json.dump(stock, f, ensure_ascii=False)</code>', '<code>loaded = json.load(f)</code>, сосын өзгертіп, қайта <code>dump</code>.'],
            check: { tests: `assert loaded == {"Нан": 40, "Сүт": 25, "Шай": 30}, "loaded файлдан оқылып, Шай = 30 болуы керек"\nimport json as _json\nwith open("stock_pyi.json", encoding="utf-8") as _f:\n    _d = _json.load(_f)\nassert _d["Шай"] == 30 and _d["Нан"] == 40, "Өзгертілген сөздік файлға қайта сақталуы керек"`, mustInclude: ['json.dump', 'json.load'] } },
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>student</code> сөздігін JSON жолына айналдырыңыз (<code>text</code>), бірақ кириллица <code>\\u...</code> кодтарына айналмай, оқылатын күйде қалсын.',
            starter: 'import json\n\nstudent = {"name": "Әйгерім", "city": "Қостанай", "courses": ["Python", "SQL"]}\ntext = json.dumps(student)\n',
            solution: 'import json\n\nstudent = {"name": "Әйгерім", "city": "Қостанай", "courses": ["Python", "SQL"]}\ntext = json.dumps(student, ensure_ascii=False)\n',
            hints: ['<code>json.dumps</code> әдепкіде кириллицаны кодтайды.', '<code>ensure_ascii=False</code> параметрін қосыңыз.'],
            check: { tests: `assert isinstance(text, str), "text жол (str) болуы керек: json.dumps"\nassert "Әйгерім" in text and "Қостанай" in text, "Кириллица оқылатын күйде қалуы керек: ensure_ascii=False"\nimport json as _json\nassert _json.loads(text) == student, "text дұрыс JSON болуы керек"` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: 'Бар файлды <code>open("log.txt", "w")</code> арқылы ашсаңыз, ондағы ескі мәтінге не болады?', options: ['Сақталады, жаңасы соңына қосылады', 'Өшіріледі, файл бос күйде ашылады', 'Қате шығады: файл бұрыннан бар', 'Тек оқуға ашылады'], answer: 1, explain: '<code>"w"</code> режимі файлды тазалайды. Соңына қосу үшін <code>"a"</code> режимін қолданыңыз.' }
        ]
      },
      {
        id: 'pyi-10', title: 'Итераторлар және генераторлар (yield)', minutes: 15,
        body: `
<p><code>for x in ...</code> тізіммен де, жолмен де, сөздікпен де, файлмен де жұмыс істейді. Неге? Себебі олардың бәрі <b>итерацияланатын</b> (iterable). <code>for</code> циклі іште мынаны жасайды:</p>
<pre><code>queue = ["Әли", "Дана", "Ерлан"]
it = iter(queue)      # итератор алу
print(next(it))       # Әли
print(next(it))       # Дана
print(next(it))       # Ерлан
next(it)              # StopIteration: элемент бітті → for циклі осы жерде тоқтайды</code></pre>
<p><b>Итератор</b> — «келесі элементті бер» дегенді білетін объект. Ол орнын есте сақтайды және бір рет қана өтеді: біткен итераторды қайта бастау үшін жаңасын алу керек.</p>
<h3>Генератор: yield бар функция</h3>
<p>Өз итераторыңызды жасаудың ең оңай жолы — <b>генератор</b>. Бұл <code>return</code> орнына <code>yield</code> қолданатын функция. Әр <code>yield</code> бір мән береді де, функция сол жерде «кідіреді». Келесі <code>next()</code> келгенде, ол тоқтаған жерінен жалғасады.</p>
<pre><code>def countdown(n):
    while n > 0:
        yield n
        n -= 1
    print("Старт!")

for x in countdown(3):
    print(x)          # 3, 2, 1, сосын «Старт!»

gen = countdown(2)    # әзірге ештеңе орындалған жоқ!
print(next(gen))      # 2</code></pre>
<h3>Неге бұл пайдалы?</h3>
<ul>
<li><b>Жад үнемдеу.</b> Генератор барлық мәнді алдын ала тізімге жинамайды, оларды біртіндеп жасайды. Миллион жолдық файлды оқу немесе шексіз тізбек жасау мүмкін болады.</li>
<li><b>Шексіз тізбектер.</b> <code>while True: yield ...</code> — тапсырыс нөмірлері, ойындағы кезек, ID генераторы.</li>
<li><b>Конвейер.</b> Бір генератор екіншісін «қоректендіреді»: файл жолдары → тазалау → сүзу.</li>
</ul>
<pre><code>def order_ids():
    n = 1
    while True:              # шексіз, бірақ жалқау
        yield f"ORD-{n:04d}"
        n += 1

ids = order_ids()
print(next(ids), next(ids))  # ORD-0001 ORD-0002</code></pre>
<h3>Генератор өрнегі</h3>
<p>List comprehension-ды дөңгелек жақшаға алсаңыз, генератор шығады: <code>total = sum(p * q for p, q in cart)</code>. Мұнда аралық тізім құрылмайды.</p>
<div class="tip">Генераторды бір рет қана аралай аласыз. <code>g = (x for x in range(3))</code>; <code>list(g)</code> → <code>[0, 1, 2]</code>, ал екінші рет <code>list(g)</code> → <code>[]</code>.</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>countdown(n)</code> <b>генераторын</b> жазыңыз (<code>yield</code> арқылы): ол <code>n</code>, <code>n-1</code>, …, <code>1</code> мәндерін береді. <code>list(countdown(3))</code> → <code>[3, 2, 1]</code>.',
            starter: 'def countdown(n):\n    return list(range(n, 0, -1))\n',
            solution: 'def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n',
            hints: ['<code>while n > 0:</code> ішінде <code>yield n</code>, сосын <code>n -= 1</code>.', 'Функцияда <code>return</code> емес, <code>yield</code> болуы керек.'],
            check: { tests: `import inspect as _inspect\nassert _inspect.isgeneratorfunction(countdown), "countdown генератор болуы керек: yield қолданыңыз"\nassert list(countdown(3)) == [3, 2, 1], "list(countdown(3)) = [3, 2, 1]"\nassert list(countdown(0)) == [], "countdown(0) ештеңе бермейді"` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Электронды кезек. Шексіз <code>tickets(prefix)</code> генераторын жазыңыз: <code>"A-001"</code>, <code>"A-002"</code>, … (нөмір 3 таңбалы, алдыңғы нөлдермен: <code>f"{n:03d}"</code>).',
            starter: 'def tickets(prefix):\n    return prefix + "-001"\n',
            solution: 'def tickets(prefix):\n    n = 1\n    while True:\n        yield f"{prefix}-{n:03d}"\n        n += 1\n',
            hints: ['<code>while True:</code> ішінде <code>yield</code>.', '<code>f"{prefix}-{n:03d}"</code>'],
            check: { tests: `_g = tickets("A")\nassert next(_g) == "A-001", "Бірінші билет A-001"\nassert next(_g) == "A-002" and next(_g) == "A-003", "Нөмір әр next() сайын 1-ге өседі"\n_h = tickets("VIP")\nassert next(_h) == "VIP-001", "Әр генератор 1-ден басталады"\nfor _ in range(997): _last = next(_h)\nassert _last == "VIP-998", "Генератор шексіз болуы керек"` } },
          { type: 'python', xp: 15, level: 'easy', prompt: 'Себеттегі тауарлар: <code>(баға, саны)</code> жұптары. Генератор өрнегі мен <code>sum</code> арқылы <code>total</code> есептеңіз (аралық тізімсіз).',
            starter: 'cart = [(450, 2), (1200, 1), (320, 5)]\ntotal = 0\n',
            solution: 'cart = [(450, 2), (1200, 1), (320, 5)]\ntotal = sum(price * qty for price, qty in cart)\n',
            hints: ['<code>sum(... for price, qty in cart)</code>', '<code>sum(price * qty for price, qty in cart)</code>'],
            check: { tests: `assert total == 3700, "total = 450*2 + 1200*1 + 320*5 = 3700"`, mustInclude: ['sum('] } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: '<code>g = (x * 2 for x in [1, 2])</code>. <code>print(list(g), list(g))</code> не шығарады?', options: ['<code>[2, 4] [2, 4]</code>', '<code>[2, 4] []</code>', '<code>[] []</code>', 'StopIteration қатесі'], answer: 1, explain: 'Генератор бір рет қана өтеді. Бірінші <code>list(g)</code> оны толық тауысады, екіншісі бос тізім алады.' }
        ]
      },
      {
        id: 'pyi-11', title: 'Декораторлар', minutes: 14,
        body: `
<p>Python-да функция — кәдімгі объект: оны айнымалыға жазуға, басқа функцияға беруге және функциядан қайтаруға болады. <b>Декоратор</b> осыған негізделген: ол функцияны қабылдап, оны «орап» (wrap), жаңа мүмкіндік қосылған функцияны қайтарады. Бастапқы функцияның кодына қол тигізбейміз.</p>
<h3>Қадамдап құру</h3>
<pre><code>def log_calls(func):                  # функцияны қабылдайды
    def wrapper(*args, **kwargs):     # кез келген аргументті өткізеді
        print(f"→ {func.__name__}{args}")
        result = func(*args, **kwargs)   # бастапқы функцияны шақыру
        print(f"← {result}")
        return result
    return wrapper                    # жаңа функцияны қайтарады

@log_calls                            # бұл: add = log_calls(add)
def add(a, b):
    return a + b

add(2, 3)
# → add(2, 3)
# ← 5</code></pre>
<p><code>@log_calls</code> жазуы — <code>add = log_calls(add)</code> дегеннің қысқа түрі. Енді <code>add</code> атауы <code>wrapper</code>-ге сілтейді, ал <code>wrapper</code> ішінде бастапқы <code>func</code> сақталған (бұл <b>closure</b> деп аталады: ішкі функция сыртқы функцияның айнымалыларын «есте сақтайды»).</p>
<h3>functools.wraps</h3>
<p>Орағаннан кейін <code>add.__name__</code> мәні <code>"wrapper"</code> болып кетеді, бұл жөндеуді (debug) қиындатады. Түзету оңай:</p>
<pre><code>from functools import wraps

def log_calls(func):
    @wraps(func)              # атауды, docstring-ті сақтайды
    def wrapper(*args, **kwargs):
        ...</code></pre>
<h3>Нақты қолданыс</h3>
<ul>
<li><b>Тексеру:</b> аргумент дұрыс па, пайдаланушы кірген бе (веб-фреймворктардағы <code>@login_required</code>).</li>
<li><b>Уақытты өлшеу</b> және логтау.</li>
<li><b>Кэш:</b> стандартты <code>@functools.lru_cache</code> бұрын есептелген нәтижелерді сақтайды; аңғал рекурсивті <code>fib</code> бірден жылдамдайды.</li>
<li>Веб-маршруттар: Flask/FastAPI-дегі <code>@app.get("/users")</code> де декоратор.</li>
</ul>
<div class="tip">Декоратор жазғанда <code>wrapper</code> ішінде <code>return func(...)</code> нәтижесін қайтаруды ұмытпаңыз. Әйтпесе безендірілген функция әрқашан <code>None</code> қайтарады.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>shout</code> декораторын жазыңыз: ол функция қайтарған жолды бас әріпке айналдырып, соңына <code>"!"</code> қосады. <code>@shout</code> қолданылған <code>greet("дана")</code> → <code>"СӘЛЕМ, ДАНА!"</code>.',
            starter: 'def shout(func):\n    return func\n\n@shout\ndef greet(name):\n    return f"сәлем, {name}"\n',
            solution: 'def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper() + "!"\n    return wrapper\n\n@shout\ndef greet(name):\n    return f"сәлем, {name}"\n',
            hints: ['Ішінде <code>def wrapper(*args, **kwargs):</code> жазып, оны <code>return wrapper</code> етіңіз.', '<code>return func(*args, **kwargs).upper() + "!"</code>'],
            check: { tests: `assert greet("дана") == "СӘЛЕМ, ДАНА!", "greet('дана') → 'СӘЛЕМ, ДАНА!'"\n@shout\ndef _bye():\n    return "сау бол"\nassert _bye() == "САУ БОЛ!", "Декоратор кез келген функцияға жұмыс істеуі керек"` } },
          { type: 'python', xp: 25, level: 'hard', prompt: 'Банк операциялары тек оң сомамен жүруі керек. <code>positive_amount</code> декораторын жазыңыз: функцияның <b>соңғы</b> позициялық аргументі 0-ден кіші не тең болса, <code>ValueError</code> көтерсін; әйтпесе функцияны шақырып, нәтижесін қайтарсын. <code>functools.wraps</code> қолданыңыз, сонда функция атауы сақталады.',
            starter: 'from functools import wraps\n\ndef positive_amount(func):\n    return func\n\n@positive_amount\ndef deposit(balance, amount):\n    return balance + amount\n',
            solution: 'from functools import wraps\n\ndef positive_amount(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        if args[-1] <= 0:\n            raise ValueError("Сома оң болуы керек")\n        return func(*args, **kwargs)\n    return wrapper\n\n@positive_amount\ndef deposit(balance, amount):\n    return balance + amount\n',
            hints: ['<code>args[-1]</code> — соңғы позициялық аргумент.', '<code>@wraps(func)</code> декораторын <code>wrapper</code> үстіне қойыңыз.'],
            check: { tests: `assert deposit(1000, 500) == 1500, "Оң сомада функция қалыпты жұмыс істейді"\n_ok = False\ntry:\n    deposit(1000, -200)\nexcept ValueError:\n    _ok = True\nassert _ok, "Теріс сомада ValueError көтерілуі керек"\n_ok = False\ntry:\n    deposit(1000, 0)\nexcept ValueError:\n    _ok = True\nassert _ok, "0 сомада да ValueError көтерілуі керек"\nassert deposit.__name__ == "deposit", "@wraps(func) қолданыңыз: атау сақталуы керек"` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: '<code>@timer</code> жазылған <code>def report(): ...</code> кодының баламасы қайсы?', options: ['<code>timer = report(timer)</code>', '<code>report = timer(report)</code>', '<code>report = timer()</code>', '<code>timer(report())</code>'], answer: 1, explain: 'Декоратор функцияны қабылдап, жаңа функция қайтарады; нәтиже бастапқы атауға қайта жазылады.' }
        ]
      },
      {
        id: 'pyi-12', title: 'datetime және collections', minutes: 15,
        body: `
<p>Стандартты кітапханадағы екі модуль күнделікті кодта өте жиі кездеседі: күн мен уақытқа арналған <code>datetime</code> және арнайы жинақтар беретін <code>collections</code>.</p>
<h3>datetime</h3>
<pre><code>from datetime import date, datetime, timedelta

start = date(2026, 9, 1)                # 1 қыркүйек 2026
deadline = start + timedelta(days=30)   # 30 күннен кейін
print(deadline)                         # 2026-10-01
print((date(2026, 12, 16) - start).days)   # 106: айырма — timedelta

now = datetime(2026, 10, 16, 14, 30)
print(now.strftime("%d.%m.%Y %H:%M"))   # 16.10.2026 14:30  (күн → мәтін)
d = datetime.strptime("22.03.2027", "%d.%m.%Y")   # мәтін → күн
print(d.weekday())                      # 0 = дүйсенбі … 6 = жексенбі</code></pre>
<p><code>strftime</code> — <b>f</b>ormat (күнді жолға), <code>strptime</code> — <b>p</b>arse (жолды күнге). Жиі кодтар: <code>%Y</code> жыл, <code>%m</code> ай, <code>%d</code> күн, <code>%H:%M</code> сағат пен минут.</p>
<h3>Counter: санау</h3>
<pre><code>from collections import Counter

votes = ["Дана", "Әли", "Дана", "Ерлан", "Дана", "Әли"]
c = Counter(votes)
print(c["Дана"])          # 3
print(c.most_common(2))   # [('Дана', 3), ('Әли', 2)]
print(c["Тимур"])         # 0: жоқ кілтке қате бермейді</code></pre>
<h3>defaultdict: әдепкі мәні бар сөздік</h3>
<pre><code>from collections import defaultdict

by_class = defaultdict(list)
for name, cls in [("Әли", "9А"), ("Дана", "9Б"), ("Ерлан", "9А")]:
    by_class[cls].append(name)    # кілт жоқ болса, бос тізім өздігінен жасалады
# {'9А': ['Әли', 'Ерлан'], '9Б': ['Дана']}</code></pre>
<p>Кәдімгі сөздікте <code>if cls not in d: d[cls] = []</code> деп тексеру керек еді. <code>defaultdict(int)</code> санауға ыңғайлы (әдепкі 0).</p>
<h3>namedtuple: атаулы өрістері бар кортеж</h3>
<pre><code>from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p[1])     # 3 4: атауымен де, индексімен де
x, y = p             # кортеж сияқты таратылады</code></pre>
<p>Шағын, өзгермейтін жазбаға (координата, түс, ойын картасы) толық класс жазудың қажеті жоқ: <code>namedtuple</code> жеткілікті және оқуға <code>p[0]</code>-ден әлдеқайда түсінікті.</p>
<div class="tip"><code>collections</code> ішінде <code>deque</code> да бар: кезектің екі шетінен де жылдам қосып-алуға арналған (<code>appendleft</code>, <code>popleft</code>).</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>today = date(2026, 10, 16)</code> берілген. <code>days_left</code> — Наурыз мейрамына (<code>2027-03-22</code>) дейінгі күн саны. <code>exam_day</code> — бүгіннен 45 күн кейінгі күн, <code>"дд.мм.жжжж"</code> пішіміндегі жол ретінде (<code>strftime("%d.%m.%Y")</code>).',
            starter: 'from datetime import date, timedelta\n\ntoday = date(2026, 10, 16)\ndays_left = 0\nexam_day = ""\n',
            solution: 'from datetime import date, timedelta\n\ntoday = date(2026, 10, 16)\ndays_left = (date(2027, 3, 22) - today).days\nexam_day = (today + timedelta(days=45)).strftime("%d.%m.%Y")\n',
            hints: ['Айырма: <code>(date(2027, 3, 22) - today).days</code>', '<code>(today + timedelta(days=45)).strftime("%d.%m.%Y")</code>'],
            check: { tests: `assert days_left == 157, "Наурызға дейін 157 күн: (date(2027, 3, 22) - today).days"\nassert exam_day == "30.11.2026", "today + 45 күн = 30.11.2026"` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Мектеп президентін сайлау. <code>Counter</code> арқылы <code>winner</code> (ең көп дауыс алғанның аты) және <code>top3</code> (<code>most_common(3)</code> нәтижесі) айнымалыларын есептеңіз.',
            starter: 'from collections import Counter\n\nvotes = ["Дана", "Әли", "Дана", "Ерлан", "Сая", "Дана", "Әли", "Сая", "Сая", "Сая"]\nwinner = votes[0]\ntop3 = []\n',
            solution: 'from collections import Counter\n\nvotes = ["Дана", "Әли", "Дана", "Ерлан", "Сая", "Дана", "Әли", "Сая", "Сая", "Сая"]\nc = Counter(votes)\nwinner = c.most_common(1)[0][0]\ntop3 = c.most_common(3)\n',
            hints: ['<code>c = Counter(votes)</code>', '<code>c.most_common(1)</code> → <code>[("Сая", 4)]</code>, атына <code>[0][0]</code> арқылы жетесіз.'],
            check: { tests: `assert winner == "Сая", "Ең көп дауыс Саяда (4)"\nassert top3 == [("Сая", 4), ("Дана", 3), ("Әли", 2)], "top3 = Counter(votes).most_common(3)"`, mustInclude: ['Counter('] } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Кітапхана: <code>defaultdict(list)</code> арқылы <code>by_genre</code> сөздігін құрыңыз (жанр → кітап атаулары, бастапқы ретпен). Сосын <code>Book = namedtuple("Book", ["title", "pages"])</code> жасап, <code>longest</code> айнымалысына беттері ең көп кітапты <code>Book</code> түрінде жазыңыз.',
            starter: 'from collections import defaultdict, namedtuple\n\nbooks = [("Абай жолы", "роман", 1200), ("Көшпенділер", "роман", 900), ("Python негіздері", "оқулық", 350), ("Алгоритмдер", "оқулық", 600)]\nby_genre = {}\nlongest = None\n',
            solution: 'from collections import defaultdict, namedtuple\n\nbooks = [("Абай жолы", "роман", 1200), ("Көшпенділер", "роман", 900), ("Python негіздері", "оқулық", 350), ("Алгоритмдер", "оқулық", 600)]\nby_genre = defaultdict(list)\nfor title, genre, pages in books:\n    by_genre[genre].append(title)\n\nBook = namedtuple("Book", ["title", "pages"])\nlongest = max((Book(t, p) for t, g, p in books), key=lambda b: b.pages)\n',
            hints: ['<code>by_genre[genre].append(title)</code> — кілт жоқ болса, тізім өздігінен жасалады.', '<code>max((Book(t, p) for t, g, p in books), key=lambda b: b.pages)</code>'],
            check: { tests: `assert dict(by_genre) == {"роман": ["Абай жолы", "Көшпенділер"], "оқулық": ["Python негіздері", "Алгоритмдер"]}, "by_genre: жанр → кітап атаулары"\nassert type(by_genre).__name__ == "defaultdict", "by_genre defaultdict(list) болуы керек"\nassert longest.title == "Абай жолы" and longest.pages == 1200, "longest — беттері ең көп кітап, Book(title, pages) түрінде"` } },
          { type: 'number', xp: 10, level: 'easy', prompt: '<code>(date(2026, 3, 1) - date(2026, 1, 1)).days</code> нені береді?', answer: 59, tol: 0, explain: 'Қаңтарда 31 күн, 2026 жылғы ақпанда 28 күн: 31 + 28 = 59.' }
        ]
      },
      {
        id: 'pyi-13', title: 'Мини жоба: мәтіндік банк жүйесі', minutes: 25,
        body: `
<p>Модульде үйренгенді бір жобаға жинаймыз: шағын банк жүйесі. Онда клиенттер шот ашады, ақша салады, алады және бір-біріне аударады. Нақты банк қосымшасының «ядросы» дәл осындай класстардан тұрады, тек оған дерекқор мен интерфейс қосылады.</p>
<h3>1-қадам: жобалау</h3>
<p>Код жазбас бұрын «қандай объектілер бар және не істейді?» деп сұраңыз:</p>
<table>
<tr><th>Класс</th><th>Күйі (атрибуттар)</th><th>Әрекеттері (әдістер)</th></tr>
<tr><td><code>BankAccount</code></td><td>owner, balance, history</td><td>deposit, withdraw, __str__</td></tr>
<tr><td><code>Bank</code></td><td>accounts: сөздік (аты → шот)</td><td>open_account, transfer, total, richest</td></tr>
<tr><td><code>InsufficientFunds</code></td><td colspan="2">өз қате класымыз: қаражат жеткіліксіз</td></tr>
</table>
<h3>2-қадам: өз қатеңіз</h3>
<pre><code>class InsufficientFunds(Exception):
    pass

raise InsufficientFunds("Балансыңыз: 3000 ₸")</code></pre>
<p><code>Exception</code>-нан мұра алатын бос класс жеткілікті. Енді шақырушы код <code>except InsufficientFunds:</code> арқылы дәл осы жағдайды ұстай алады, ал басқа қателер (мысалы, теріс сома үшін <code>ValueError</code>) бөлек өңделеді.</p>
<h3>3-қадам: шот</h3>
<pre><code>class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []                    # ("deposit", 5000) сияқты кортеждер

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Сома оң болуы керек")
        self.balance += amount
        self.history.append(("deposit", amount))</code></pre>
<p><code>withdraw</code> да осылай, тек алдымен балансты тексереді. Маңызды қағида: <b>алдымен тексер, сосын өзгерт</b>. Егер балансты азайтып, кейін қате көтерсеңіз, шот «жартылай өзгерген» күйде қалады.</p>
<h3>4-қадам: банк және аударым</h3>
<p>Аударым — екі операция: біреуінен алу, екіншісіне салу. Егер алу сәтсіз болса (ақша жетпесе), салу орындалмауы керек. <code>withdraw</code> қате көтерсе, келесі жол орындалмайды, сондықтан реті дұрыс болса жеткілікті:</p>
<pre><code>def transfer(self, src, dst, amount):
    self.accounts[src].withdraw(amount)   # қате болса, осы жерде тоқтайды
    self.accounts[dst].deposit(amount)</code></pre>
<h3>Әрі қарай</h3>
<p>Жобаны дамыту идеялары: шоттарды <code>json</code> файлға сақтау және жүктеу; әр операцияға <code>datetime</code> уақытын қосу; ай сайынғы пайыз есептейтін <code>SavingsAccount</code> мұрагері; <code>input()</code> арқылы мәзір (компьютердегі Python-да). Бұл беттегі Python <code>input()</code>-ты қолдамайды, сондықтан мәндерді айнымалыларға тікелей жазамыз.</p>
<div class="tip">Әр әдіс бір ғана жұмыс істесін және оны тест арқылы бірден тексеріңіз: <code>assert acc.balance == 15000</code>. Шағын қадамдармен жазылған жобаны жөндеу оңай.</div>`,
        exercises: [
          { type: 'python', xp: 25, level: 'medium', prompt: '<code>BankAccount</code> класын аяқтаңыз. <code>deposit(amount)</code>: сома ≤ 0 болса <code>ValueError</code>, әйтпесе балансқа қосып, <code>history</code>-ге <code>("deposit", amount)</code> жазсын. <code>withdraw(amount)</code>: сома ≤ 0 болса <code>ValueError</code>; баланстан көп болса <code>InsufficientFunds</code> (баланс өзгермейді); әйтпесе азайтып, <code>("withdraw", amount)</code> жазсын. <code>__str__</code> → <code>"Дана: 15000 ₸"</code>.',
            starter: 'class InsufficientFunds(Exception):\n    pass\n\n\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n        self.history = []\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass\n',
            solution: 'class InsufficientFunds(Exception):\n    pass\n\n\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n        self.history = []\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Сома оң болуы керек")\n        self.balance += amount\n        self.history.append(("deposit", amount))\n\n    def withdraw(self, amount):\n        if amount <= 0:\n            raise ValueError("Сома оң болуы керек")\n        if amount > self.balance:\n            raise InsufficientFunds(f"Балансыңыз: {self.balance} ₸")\n        self.balance -= amount\n        self.history.append(("withdraw", amount))\n\n    def __str__(self):\n        return f"{self.owner}: {self.balance} ₸"\n',
            hints: ['Алдымен тексеріңіз: <code>if amount <= 0: raise ValueError(...)</code>, сосын <code>if amount > self.balance: raise InsufficientFunds(...)</code>.', 'Тек тексерістерден кейін ғана <code>self.balance</code>-ты өзгертіп, <code>self.history.append(...)</code> жазыңыз.'],
            check: { tests: `_a = BankAccount("Дана", 10000)\n_a.deposit(5000)\nassert _a.balance == 15000, "deposit балансқа қосуы керек"\n_a.withdraw(3000)\nassert _a.balance == 12000, "withdraw баланстан азайтуы керек"\nassert _a.history == [("deposit", 5000), ("withdraw", 3000)], "history: ('deposit', 5000), ('withdraw', 3000)"\n_e = None\ntry:\n    _a.withdraw(50000)\nexcept InsufficientFunds:\n    _e = "ok"\nassert _e == "ok", "Баланстан көп сомада InsufficientFunds көтерілуі керек"\nassert _a.balance == 12000 and len(_a.history) == 2, "Сәтсіз алудан кейін баланс пен history өзгермеуі керек"\nfor _bad in (0, -100):\n    _e = None\n    try:\n        _a.deposit(_bad)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "deposit: сома ≤ 0 болса ValueError"\n    _e = None\n    try:\n        _a.withdraw(_bad)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "withdraw: сома ≤ 0 болса ValueError"\nassert str(_a) == "Дана: 12000 ₸", "__str__ пішімі: 'Дана: 12000 ₸'"` } },
          { type: 'python', xp: 25, level: 'hard', prompt: 'Енді <code>Bank</code> класын жазыңыз (<code>BankAccount</code> дайын). <code>open_account(owner, balance=0)</code>: шот жасап, <code>self.accounts</code> сөздігіне сақтап, шотты қайтарады; мұндай клиент бар болса — <code>ValueError</code>. <code>transfer(src, dst, amount)</code>: <code>src</code>-тан алып, <code>dst</code>-ға салады (ақша жетпесе, ешбір шот өзгермеуі керек). <code>total()</code> — барлық баланстың қосындысы. <code>richest()</code> — ең бай клиенттің аты.',
            starter: 'class InsufficientFunds(Exception):\n    pass\n\n\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Сома оң болуы керек")\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount <= 0:\n            raise ValueError("Сома оң болуы керек")\n        if amount > self.balance:\n            raise InsufficientFunds("Қаражат жеткіліксіз")\n        self.balance -= amount\n\n\nclass Bank:\n    def __init__(self):\n        self.accounts = {}\n',
            solution: 'class InsufficientFunds(Exception):\n    pass\n\n\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Сома оң болуы керек")\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount <= 0:\n            raise ValueError("Сома оң болуы керек")\n        if amount > self.balance:\n            raise InsufficientFunds("Қаражат жеткіліксіз")\n        self.balance -= amount\n\n\nclass Bank:\n    def __init__(self):\n        self.accounts = {}\n\n    def open_account(self, owner, balance=0):\n        if owner in self.accounts:\n            raise ValueError("Мұндай клиент бар")\n        acc = BankAccount(owner, balance)\n        self.accounts[owner] = acc\n        return acc\n\n    def transfer(self, src, dst, amount):\n        self.accounts[src].withdraw(amount)\n        self.accounts[dst].deposit(amount)\n\n    def total(self):\n        return sum(a.balance for a in self.accounts.values())\n\n    def richest(self):\n        return max(self.accounts.values(), key=lambda a: a.balance).owner\n',
            hints: ['<code>transfer</code>: алдымен <code>withdraw</code>, сосын <code>deposit</code>. Қате болса, екінші жол орындалмайды.', '<code>max(self.accounts.values(), key=lambda a: a.balance).owner</code>'],
            check: { tests: `_b = Bank()\n_x = _b.open_account("Әли", 20000)\n_b.open_account("Дана", 5000)\nassert isinstance(_x, BankAccount) and _b.accounts["Әли"] is _x, "open_account шотты сақтап, оны қайтаруы керек"\n_e = None\ntry:\n    _b.open_account("Әли")\nexcept ValueError:\n    _e = "ok"\nassert _e == "ok", "Бар клиентке қайта шот ашылмауы керек: ValueError"\n_b.transfer("Әли", "Дана", 8000)\nassert _b.accounts["Әли"].balance == 12000 and _b.accounts["Дана"].balance == 13000, "transfer: Әли 12000, Дана 13000"\n_e = None\ntry:\n    _b.transfer("Әли", "Дана", 99999)\nexcept InsufficientFunds:\n    _e = "ok"\nassert _e == "ok", "Ақша жетпесе InsufficientFunds шығуы керек"\nassert _b.accounts["Әли"].balance == 12000 and _b.accounts["Дана"].balance == 13000, "Сәтсіз аударымнан кейін екі шот та өзгермеуі керек"\nassert _b.total() == 25000, "total() = 25000"\nassert _b.richest() == "Дана", "richest() = 'Дана'"` } },
          { type: 'rubric', xp: 30, level: 'medium', minWords: 60, done: 'Енді осы жоспар бойынша кодты компьютеріңізде жазып көріңіз: әр класты бөлек жазып, әр әдісті <code>assert</code> арқылы тексеріңіз. Дайын жобаны GitHub-қа README-мен жүктесеңіз, ол портфолиоға жақсы бастама болады.', prompt: 'Дүкен үшін <b>қойма (inventory) жүйесін</b> жобалаңыз (кемінде 60 сөз, код міндетті емес). Жазыңыз: қандай класстар болады және әрқайсысының атрибуттары мен әдістері; қандай қателер көтеріледі (мысалы, қоймада тауар жетпесе); деректер файлда қалай сақталады; модульде өткен құралдардың (dict, namedtuple, генератор, декоратор, json) қайсысы қай жерде пайдалы. Сосын төрт критерий бойынша адал бағалаңыз. Өту үшін әр критерий кемінде <b>3 / 4</b> болуы керек.', criteria: [
            { name: 'Класстар мен жауапкершілік', levels: ['Класстар аталмаған', 'Бір класс, бәрі соның ішінде', 'Бірнеше класс, атрибуттары мен әдістері аталған', 'Әр класстың бір нақты жауапкершілігі бар, олардың байланысы түсіндірілген'] },
            { name: 'Қателерді өңдеу', levels: ['Айтылмаған', 'Жалпы («қате болуы мүмкін»)', 'Нақты жағдайлар және қандай қате көтерілетіні аталған', 'Өз қате класы бар, «алдымен тексер, сосын өзгерт» қағидасы ескерілген'] },
            { name: 'Деректерді сақтау', levels: ['Айтылмаған', '«Файлға сақтаймыз» деген ғана', 'JSON пішімі және қашан жазылатыны/оқылатыны айтылған', 'JSON құрылымының мысалы және бағдарлама іске қосылғанда жүктеу жоспары бар'] },
            { name: 'Модуль құралдарын қолдану', levels: ['Ешқайсысы аталмаған', 'Біреуі аталған, бірақ неге екені түсініксіз', 'Екі-үш құрал орынды жерде қолданылған', 'Құралдар орынды таңдалған және неге басқасы емес екені түсіндірілген'] }
          ] }
        ]
      },
      {
        id: 'pyi-gate', gate: true, title: 'Модуль емтиханы: Intermediate Python', minutes: 35,
        body: `
<p>Емтихан бүкіл модульді қамтиды: класстар мен dunder әдістер, генераторлар, декораторлар мен рекурсия, comprehension, <code>json</code> және <code>collections</code>. Өту үшін ұпайдың кемінде <b>75%</b>-ын жинау керек.</p>
<ul>
<li>Тапсырманы мұқият оқыңыз: айнымалы мен функция атаулары дәл берілгендей болуы керек.</li>
<li>Python тапсырмаларында алдымен шағын мысалмен <code>print</code> арқылы тексеріп алыңыз, сосын «Тексеру» батырмасын басыңыз.</li>
<li>Есіңізде болсын: <b>алдымен тексер, сосын өзгерт</b>; генератор бір рет өтеді; декоратор <code>wrapper</code>-ді қайтарады.</li>
</ul>`,
        exercises: [
          { type: 'quiz', xp: 30, level: 'hard', prompt: 'Не шығады?<pre><code>class Clicker:\n    total = 0\n    def click(self):\n        self.total += 1\n\na = Clicker()\na.click(); a.click()\nprint(Clicker.total, a.total)</code></pre>', options: ['<code>2 2</code>', '<code>0 2</code>', '<code>0 0</code>', 'AttributeError'], answer: 1, explain: '<code>self.total += 1</code> класс атрибутын оқиды, бірақ нәтижені <b>объектінің</b> жаңа атрибутына жазады. Класс атрибуты 0 күйінде қалады. Ортақ санауыш үшін <code>Clicker.total += 1</code> жазу керек.' },
          { type: 'python', xp: 40, level: 'hard', prompt: '<code>Inventory</code> класын жазыңыз. <code>self.items</code> — сөздік (тауар → саны). <code>add(name, qty)</code> — санды қосады (жаңа тауар болса, жасайды). <code>remove(name, qty)</code> — қоймада жетпесе (немесе тауар жоқ болса) <code>ValueError</code>, әйтпесе азайтады; саны 0 болса, тауарды сөздіктен өшіреді. <code>__len__</code> — тауар түрлерінің саны. <code>__contains__</code> — <code>"Сүт" in inv</code>. <code>low_stock(limit)</code> — <b>генератор</b>: саны <code>limit</code>-тен аз тауар атауларын әліпби ретімен береді.',
            starter: 'class Inventory:\n    def __init__(self):\n        self.items = {}\n',
            solution: 'class Inventory:\n    def __init__(self):\n        self.items = {}\n\n    def add(self, name, qty):\n        self.items[name] = self.items.get(name, 0) + qty\n\n    def remove(self, name, qty):\n        if self.items.get(name, 0) < qty:\n            raise ValueError("Қоймада жеткіліксіз")\n        self.items[name] -= qty\n        if self.items[name] == 0:\n            del self.items[name]\n\n    def __len__(self):\n        return len(self.items)\n\n    def __contains__(self, name):\n        return name in self.items\n\n    def low_stock(self, limit):\n        for name in sorted(self.items):\n            if self.items[name] < limit:\n                yield name\n',
            hints: ['<code>self.items.get(name, 0)</code> тауар жоқ болса 0 береді.', '<code>low_stock</code> ішінде <code>for name in sorted(self.items): if ...: yield name</code>'],
            check: { tests: `import inspect as _inspect\n_inv = Inventory()\n_inv.add("Сүт", 10); _inv.add("Нан", 3); _inv.add("Сүт", 5); _inv.add("Май", 2)\nassert _inv.items == {"Сүт": 15, "Нан": 3, "Май": 2}, "add санды қосуы керек: Сүт 15"\nassert len(_inv) == 3 and "Нан" in _inv and "Шай" not in _inv, "__len__ және __contains__ дұрыс жұмыс істеуі керек"\n_inv.remove("Нан", 3)\nassert "Нан" not in _inv and len(_inv) == 2, "Саны 0 болған тауар өшірілуі керек"\nfor _args in (("Сүт", 100), ("Шай", 1)):\n    _e = None\n    try:\n        _inv.remove(*_args)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "Жетпесе немесе тауар жоқ болса ValueError"\nassert _inv.items["Сүт"] == 15, "Сәтсіз remove санды өзгертпеуі керек"\n_inv.add("Алма", 1)\nassert _inspect.isgeneratorfunction(Inventory.low_stock), "low_stock генератор болуы керек (yield)"\nassert list(_inv.low_stock(5)) == ["Алма", "Май"], "low_stock(5): саны 5-тен аз тауарлар, әліпби ретімен"` } },
          { type: 'python', xp: 35, level: 'hard', prompt: 'Баспалдақта бір қадаммен 1 немесе 2 саты көтерілуге болады. <code>n</code> сатыға шығудың тәсілдер саны: <code>ways(0) = ways(1) = 1</code>, <code>ways(n) = ways(n-1) + ways(n-2)</code>. Аңғал рекурсия баяу, сондықтан <code>memo</code> декораторын жазыңыз: ол нәтижелерді <code>wrapper.cache</code> сөздігінде сақтайды (кілт — аргумент) және бұрын есептелгенін қайта есептемейді. <code>ways</code> функциясын рекурсивті жазып, <code>@memo</code> қолданыңыз.',
            starter: 'def memo(func):\n    return func\n\n@memo\ndef ways(n):\n    return 1\n',
            solution: 'def memo(func):\n    def wrapper(n):\n        if n not in wrapper.cache:\n            wrapper.cache[n] = func(n)\n        return wrapper.cache[n]\n    wrapper.cache = {}\n    return wrapper\n\n@memo\ndef ways(n):\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n',
            hints: ['<code>wrapper</code> функциясын жазғаннан кейін оған атрибут беріңіз: <code>wrapper.cache = {}</code>.', 'Ішінде: <code>if n not in wrapper.cache: wrapper.cache[n] = func(n)</code>, сосын <code>return wrapper.cache[n]</code>.'],
            check: { tests: `assert isinstance(getattr(ways, "cache", None), dict), "memo декораторы wrapper.cache сөздігін жасауы керек"\nassert ways(4) == 5, "ways(4) = 5: 1111, 112, 121, 211, 22"\nassert ways(60) == 2504730781961, "ways(60) = 2504730781961"\nassert len(ways.cache) >= 60, "Аралық нәтижелер ways.cache ішінде сақталуы керек (рекурсия + memo)"` } },
          { type: 'python', xp: 35, level: 'medium', prompt: 'Онлайн-дүкен тапсырыстары JSON жолы түрінде келді. <code>json.loads</code> арқылы оқып, үш айнымалы есептеңіз: <code>per_customer</code> — клиент → тапсырыстағы тауар саны (dict comprehension); <code>unique_items</code> — сатылған тауар атауларының жиыны (set comprehension); <code>top_item</code> — ең жиі сатылған тауар (<code>Counter</code>).',
            starter: 'import json\nfrom collections import Counter\n\nraw = \'[{"customer": "Әли", "items": ["Нан", "Сүт"]}, {"customer": "Дана", "items": ["Сүт", "Шай", "Сүт"]}, {"customer": "Ерлан", "items": ["Нан", "Сүт", "Алма", "Шай"]}]\'\nper_customer = {}\nunique_items = set()\ntop_item = ""\n',
            solution: 'import json\nfrom collections import Counter\n\nraw = \'[{"customer": "Әли", "items": ["Нан", "Сүт"]}, {"customer": "Дана", "items": ["Сүт", "Шай", "Сүт"]}, {"customer": "Ерлан", "items": ["Нан", "Сүт", "Алма", "Шай"]}]\'\norders = json.loads(raw)\nper_customer = {o["customer"]: len(o["items"]) for o in orders}\nunique_items = {item for o in orders for item in o["items"]}\ntop_item = Counter(item for o in orders for item in o["items"]).most_common(1)[0][0]\n',
            hints: ['<code>orders = json.loads(raw)</code> — тізім ішінде сөздіктер.', 'Екі деңгейлі цикл: <code>{item for o in orders for item in o["items"]}</code>'],
            check: { tests: `assert per_customer == {"Әли": 2, "Дана": 3, "Ерлан": 4}, "per_customer: клиент → тауар саны"\nassert unique_items == {"Нан", "Сүт", "Шай", "Алма"}, "unique_items: қайталанбайтын тауарлар"\nassert top_item == "Сүт", "top_item: ең жиі сатылған тауар (Сүт, 4 рет)"`, mustInclude: ['json.loads', 'Counter('] } },
          { type: 'number', xp: 30, level: 'medium', prompt: 'Мына код не шығарады?<pre><code>def evens(n):\n    for i in range(n):\n        if i % 2 == 0:\n            yield i * i\n\ng = evens(7)\nnext(g)\nprint(sum(g))</code></pre>', answer: 56, tol: 0, explain: 'Генератор 0, 4, 16, 36 береді. Бірінші <code>next(g)</code> 0-ді «жеп қояды», қалғаны: 4 + 16 + 36 = 56.' }
        ]
      }
    ]
  };
})();
