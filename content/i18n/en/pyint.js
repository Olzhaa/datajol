// PY2 Intermediate Python: English text. Code, solutions and expected output are in content/pyint.js.
DJ.i18n.patch({
  modules: {
    'py-2': { intro: 'The next step after Python basics: tuples and sets, flexible functions, classes and inheritance, files and JSON, generators, decorators and the standard library. The examples are games, a shop, students and a bank account; at the end you build a text-based banking system yourself.' }
  },
  lessons: {
    'pyi-1': {
      title: 'Tuples and sets',
      body: `
<p>In the basics course you learned lists and dictionaries (dict). Python has two more important collections: the <b>tuple</b> and the <b>set</b>.</p>
<h3>Tuple: a list that cannot change</h3>
<p>A tuple is written in round brackets. Once it is created, you cannot change, add or remove its elements. That makes it handy for values that "go together": a coordinate, a date (year, month, day), a player's name and score.</p>
<pre><code>point = (3, 7)
player = ("Айгерім", 1450)
print(point[0])        # 3
# point[0] = 5         # TypeError: a tuple cannot be changed

name, score = player   # unpacking: spread the values into variables
print(name, score)     # Айгерім 1450

a, b = 1, 2
a, b = b, a            # swap two variables in one line
print(a, b)            # 2 1</code></pre>
<p>When a function returns several values (<code>return mn, mx</code>), it really returns one tuple. A one-element tuple needs a comma: <code>(5,)</code>. Because a tuple cannot change, it can be used as a dictionary key: <code>{(0, 0): "старт"}</code>.</p>
<h3>Set: elements without repeats</h3>
<p>A set is written in curly braces and keeps each value only once. You cannot rely on its order, and it has no indexes. But the <code>in</code> check is very fast.</p>
<pre><code>tags = {"python", "ойын", "python"}
print(len(tags))                   # 2: the repeat is gone
unique = set([3, 1, 3, 2, 1])      # {1, 2, 3}

chess = {"Әли", "Дана", "Ерлан"}
football = {"Ерлан", "Мадина", "Әли"}
print(chess & football)   # in both: {'Әли', 'Ерлан'}
print(chess | football)   # everyone together (union)
print(chess - football)   # only in chess: {'Дана'}
print(chess ^ football)   # in only one of them</code></pre>
<p>You add to a set with <code>.add(x)</code> and remove with <code>.discard(x)</code>. An empty set can only be made with <code>set()</code>: <code>{}</code> is an empty <b>dictionary</b>.</p>
<div class="tip">What to pick when? Order matters and the collection changes: <code>list</code>. A small group that does not change: <code>tuple</code>. No repeats and the question "is it there?": <code>set</code>. Key → value: <code>dict</code>.</div>`,
      ex: [
        { prompt: 'Unpack the tuple <code>player</code> into the variables <code>name</code>, <code>level</code>, <code>coins</code>. Then swap the values of <code>a</code> and <code>b</code> in one line.', starter: 'player = ("Нұрлан", 12, 340)\na, b = 10, 20\n# write here\n', hints: ['<code>name, level, coins = player</code>', 'Swap: <code>a, b = b, a</code>'], check: { tests: `assert name == "Нұрлан" and level == 12 and coins == 340, "name, level, coins should come from the tuple"\nassert (a, b) == (20, 10), "Swap a and b: a=20, b=10"` } },
        { prompt: 'A school has two clubs. Use set operations to compute three variables: <code>both</code> — those who attend both clubs, <code>only_chess</code> — those who go only to chess, <code>everyone</code> — everyone who attends at least one club.', hints: ['Intersection is <code>&</code>, difference is <code>-</code>, union is <code>|</code>.', '<code>both = chess & robotics</code>'], check: { tests: `assert both == {"Ерлан", "Әли"}, "both: the intersection of the two sets (&)"\nassert only_chess == {"Дана", "Сая"}, "only_chess: chess - robotics"\nassert everyone == {"Әли", "Дана", "Ерлан", "Сая", "Мадина", "Тимур"}, "everyone: the union (|)"` } },
        { prompt: 'City names repeat in the shop\'s orders. Store the number of distinct cities in the variable <code>unique_cities</code> (using a set).', hints: ['<code>set(cities)</code> removes the repeats.', '<code>len(set(cities))</code>'], check: { tests: `assert unique_cities == 4, "There should be 4 distinct cities: len(set(cities))"` } },
        { prompt: 'After the line <code>x = {}</code>, what is <code>type(x)</code>?', options: ['set', 'dict', 'tuple', 'list'], explain: 'Empty curly braces make an empty dictionary. An empty set can only be made with <code>set()</code>.' }
      ]
    },
    'pyi-2': {
      title: 'Flexible functions: default, *args, **kwargs, lambda',
      body: `
<p>In the basics you wrote functions with <code>def</code> and passed exactly the arguments they needed. In real programs a function has to be flexible: some arguments are optional, and sometimes their number is not known in advance.</p>
<h3>Default value (default argument)</h3>
<pre><code>def greet(name, greeting="Сәлем"):
    return f"{greeting}, {name}!"

print(greet("Дана"))                 # Сәлем, Дана!
print(greet("Дана", "Қайырлы таң"))  # Қайырлы таң, Дана!
print(greet(greeting="Hi", name="Ali"))  # named (keyword) arguments</code></pre>
<p>Parameters with a default value come <b>after</b> the required parameters.</p>
<h3>*args: any number of positional arguments</h3>
<pre><code>def total(*prices):
    # prices is a tuple: (1200, 800, 450)
    return sum(prices)

print(total(1200, 800, 450))   # 2450
print(total())                 # 0</code></pre>
<h3>**kwargs: any named arguments</h3>
<pre><code>def make_order(item, **options):
    # options is a dict: {'size': 'L', 'color': 'қара'}
    parts = [f"{k}={v}" for k, v in options.items()]
    return item + " (" + ", ".join(parts) + ")"

print(make_order("Футболка", size="L", color="қара"))
# Футболка (size=L, color=қара)</code></pre>
<p>The star is also used to "unpack" a list in a call: <code>total(*[100, 200])</code> is the same as <code>total(100, 200)</code>; <code>f(**{"a": 1})</code> is <code>f(a=1)</code>.</p>
<h3>lambda: a one-line function</h3>
<pre><code>double = lambda x: x * 2
print(double(21))     # 42
add = lambda a, b: a + b</code></pre>
<p>A <code>lambda</code> holds a single expression, and you don't write <code>return</code>. It is mostly used to tell another function "how to sort" (next lesson).</p>
<div class="tip"><b>Trap:</b> don't use a mutable object (<code>[]</code>, <code>{}</code>) as a default value. In <code>def add(x, items=[])</code> the list is created once and shared by every call. The right way: <code>items=None</code>, and inside, <code>if items is None: items = []</code>.</div>`,
      ex: [
        { prompt: 'Write the function <code>greet(name, greeting="Сәлем")</code> (сәлем means "hello"): it should return the string <code>"&lt;greeting&gt;, &lt;name&gt;!"</code>. For example, <code>greet("Дана")</code> → <code>"Сәлем, Дана!"</code>.', hints: ['A default value for the parameter: <code>greeting="Сәлем"</code>.', '<code>return f"{greeting}, {name}!"</code>'], check: { tests: `assert greet("Дана") == "Сәлем, Дана!", "greet('Дана') should return 'Сәлем, Дана!'"\nassert greet("Ерлан", "Қайырлы кеш") == "Қайырлы кеш, Ерлан!", "The second argument should go into greeting"` } },
        { prompt: 'A shop till: write the function <code>checkout(*prices, discount=0)</code>. It should add up all prices, apply a <code>discount</code> percent discount, and return the result with <code>round(..., 2)</code>. <code>checkout(1000, 500, discount=10)</code> → <code>1350.0</code>.', hints: ['<code>*prices</code> collects all positional arguments into a tuple.', '<code>sum(prices) * (1 - discount / 100)</code>'], check: { tests: `assert checkout(1000, 500, discount=10) == 1350.0, "checkout(1000, 500, discount=10) should be 1350.0"\nassert checkout(200, 300, 500) == 1000, "Without a discount: the sum of the prices"\nassert checkout() == 0, "With no items, 0"` } },
        { prompt: 'Write the function <code>describe(name, **info)</code>. It should sort the keys of <code>info</code> alphabetically and return a string like <code>"Айгерім: age=19; city=Алматы"</code>. If <code>info</code> is empty, return just the name: <code>"Айгерім"</code>.', hints: ['<code>**info</code> collects named arguments into a dictionary.', '<code>"; ".join([f"{k}={info[k]}" for k in sorted(info)])</code>'], check: { tests: `assert describe("Айгерім", city="Алматы", age=19) == "Айгерім: age=19; city=Алматы", "Keys in alphabetical order: age, city"\nassert describe("Тимур") == "Тимур", "If info is empty, return just the name"` } },
        { prompt: '<code>def f(*args, **kwargs): return args, kwargs</code>. What does <code>f(1, 2, x=3)</code> return?', options: ['<code>([1, 2], {"x": 3})</code>', '<code>((1, 2), {"x": 3})</code>', '<code>((1, 2, 3), {})</code>', 'TypeError'], explain: '<code>*args</code> collects positional arguments into a <b>tuple</b>, and <code>**kwargs</code> collects named arguments into a <b>dictionary</b>.' }
      ]
    },
    'pyi-3': {
      title: 'sorted, min, max (key) and map, filter, zip, enumerate',
      body: `
<p>Python has ready-made functions for working with collections. They shorten loops and make code easier to read.</p>
<h3>key: "what should we compare by?"</h3>
<p>You can pass <code>key</code> to <code>sorted</code>, <code>min</code> and <code>max</code>. It is a function that takes each element and returns the value to compare.</p>
<pre><code>players = [("Әли", 820), ("Дана", 1450), ("Ерлан", 990)]

ranking = sorted(players, key=lambda p: p[1], reverse=True)
# [('Дана', 1450), ('Ерлан', 990), ('Әли', 820)]
best = max(players, key=lambda p: p[1])     # ('Дана', 1450)
shortest = min(["алма", "жүзім", "өрік"], key=len)   # 'алма'</code></pre>
<p>To sort by several features, key returns a tuple: <code>key=lambda s: (-s["grade"], s["name"])</code> sorts by grade descending first, then by name when grades are equal.</p>
<h3>enumerate and zip</h3>
<pre><code>names = ["Әли", "Дана", "Ерлан"]
for i, name in enumerate(names, start=1):
    print(i, name)          # 1 Әли, 2 Дана, 3 Ерлан

scores = [820, 1450, 990]
for name, score in zip(names, scores):
    print(name, score)
table = dict(zip(names, scores))   # {'Әли': 820, 'Дана': 1450, 'Ерлан': 990}</code></pre>
<p><code>zip</code> "stitches" several lists together and stops when the shortest one runs out.</p>
<h3>map and filter</h3>
<pre><code>prices = [1200, 450, 3000]
with_tax = list(map(lambda p: p * 1.12, prices))     # a function on every element
cheap = list(filter(lambda p: p < 1000, prices))    # those that match the condition: [450]</code></pre>
<p><code>map</code> and <code>filter</code> return not a list but a "lazy" iterator (more on iterators later). To see the result, wrap it in <code>list(...)</code>. Often a list comprehension says the same thing more clearly: <code>[p * 1.12 for p in prices]</code>. Pick whichever is clearer.</p>
<div class="tip"><code>sorted(xs)</code> returns a new list, while <code>xs.sort()</code> changes the list itself. Both accept <code>key</code> and <code>reverse</code>.</div>`,
      ex: [
        { prompt: 'Game ranking. <code>ranking</code> is the list of players sorted by score, highest first; <code>best_name</code> is the name of the player with the most points (using <code>max</code> and <code>key</code>).', hints: ['<code>sorted(players, key=lambda p: p[1], reverse=True)</code>', '<code>max(...)</code> returns a tuple; get the name with <code>[0]</code>.'], check: { tests: `assert ranking == [("Дана", 1450), ("Сая", 1210), ("Ерлан", 990), ("Әли", 820)], "ranking should be sorted by score, highest first"\nassert best_name == "Дана", "best_name is the name of the player with the most points"` } },
        { prompt: 'Exam results. Build the dictionary <code>results</code> (name → score) with <code>zip</code>. Then use <code>filter</code> to collect into the list <code>passed</code> the names of those who scored 50 or more (in the original order).', hints: ['<code>dict(zip(names, scores))</code>', '<code>list(filter(lambda n: results[n] >= 50, names))</code>'], check: { tests: `assert results == {"Әли": 45, "Дана": 88, "Ерлан": 50, "Мадина": 39}, "results = dict(zip(names, scores))"\nassert passed == ["Дана", "Ерлан"], "passed: those who scored 50 or more, in the original order"` } },
        { prompt: 'Use <code>enumerate</code> to build the list <code>lines</code>: <code>["1. Нан", "2. Сүт", "3. Ірімшік"]</code> (bread, milk, cheese). Numbering starts at 1.', hints: ['<code>enumerate(shopping, start=1)</code> gives pairs: (1, "Нан"), ...', '<code>f"{i}. {item}"</code>'], check: { tests: `assert lines == ["1. Нан", "2. Сүт", "3. Ірімшік"], "lines should be exactly: ['1. Нан', '2. Сүт', '3. Ірімшік']"` } },
        { prompt: 'What does <code>print(map(str.upper, ["a", "b"]))</code> print?', options: ['<code>["A", "B"]</code>', '<code>AB</code>', '<code>&lt;map object at 0x...&gt;</code>', 'An error'], explain: '<code>map</code> returns a lazy iterator. To see the values you need <code>list(map(...))</code>.' }
      ]
    },
    'pyi-4': {
      title: 'Dict and set comprehensions',
      body: `
<p>You know list comprehensions: <code>[x * 2 for x in xs]</code>. The same notation exists for dictionaries and sets. It solves "make one collection from another" in a single line.</p>
<h3>Dict comprehension</h3>
<p>The form: <code>{key: value for element in collection if condition}</code>.</p>
<pre><code>prices = {"Нан": 250, "Сүт": 520, "Ірімшік": 2400, "Шай": 1300}

# Add 12% VAT to every price
with_vat = {name: round(p * 1.12) for name, p in prices.items()}

# Only those cheaper than 1000 ₸
cheap = {name: p for name, p in prices.items() if p < 1000}
# {'Нан': 250, 'Сүт': 520}

# A dictionary from a list: word → length
words = ["алма", "жүзім", "қарбыз"]
lengths = {w: len(w) for w in words}   # {'алма': 4, 'жүзім': 5, 'қарбыз': 6}

# Swap keys and values (if the values don't repeat)
codes = {"ALA": "Алматы", "NQZ": "Астана"}
by_city = {city: code for code, city in codes.items()}</code></pre>
<p>The main tool is <code>.items()</code>: it gives <code>(key, value)</code> pairs, which we unpack into two variables right away (unpacking from the previous lesson).</p>
<h3>Set comprehension</h3>
<p>The form is the same but without the colon: <code>{expression for element in collection}</code>. Repeats in the result disappear on their own.</p>
<pre><code>emails = ["ali@mail.kz", "dana@gmail.com", "erlan@mail.kz"]
domains = {e.split("@")[1] for e in emails}   # {'mail.kz', 'gmail.com'}

names = ["Әли", "Арман", "Дана", "Ерлан", "Динара"]
letters = {n[0] for n in names}               # {'Ә', 'А', 'Д', 'Е'}</code></pre>
<h3>Conditional value</h3>
<p>You can use an <code>if ... else</code> expression in the value part:</p>
<pre><code>grades = {"Әли": 45, "Дана": 88, "Ерлан": 67}
status = {n: ("өтті" if g >= 50 else "құлады") for n, g in grades.items()}</code></pre>
<div class="tip">An <code>if</code> at the end of a comprehension is a <b>filter</b> (it drops the element). An <code>a if condition else b</code> inside the value is a <b>choice</b> (the element stays, only its value changes). Don't mix them up. And if the logic is more complex than 2–3 conditions, a plain <code>for</code> loop is better: it is easier to read.</div>`,
      ex: [
        { prompt: 'Use a dict comprehension to build the dictionary <code>discounted</code>: every item\'s price is cut by 20% (<code>int(p * 0.8)</code>).', hints: ['<code>for name, p in prices.items()</code>', '<code>{name: int(p * 0.8) for name, p in prices.items()}</code>'], check: { tests: `assert discounted == {"Кітап": 3600, "Қалам": 240, "Дәптер": 520}, "Each price should be int(p * 0.8)"` } },
        { prompt: 'Students\' scores are given. Create two variables: <code>honors</code> — only those who scored 90 or more (name → score, dict comprehension), <code>groups</code> — the set of distinct groups the students are in (set comprehension).', hints: ['<code>{s["name"]: s["score"] for s in students if ...}</code>', 'Set: <code>{s["group"] for s in students}</code>'], check: { tests: `assert honors == {"Әли": 92, "Ерлан": 95}, "honors: only students with score >= 90"\nassert groups == {"IT-21", "IT-22", "IT-23"}, "groups: distinct group names"` } },
        { prompt: 'The dictionary of game controls <code>keys</code> is given (action → key). Swap keys and values to build <code>by_key</code> (key → action). Then build the dictionary <code>status</code>: for each player in <code>scores</code>, <code>"pro"</code> if they have more than 1000 points, otherwise <code>"new"</code>.', hints: ['Swap: <code>{k: action for action, k in keys.items()}</code>', 'Choice: <code>"pro" if s > 1000 else "new"</code>'], check: { tests: `assert by_key == {"W": "jump", "A": "left", "D": "right", "Space": "fire"}, "by_key: key → action"\nassert status == {"Әли": "new", "Дана": "pro", "Тимур": "pro"}, "status: pro if more than 1000, otherwise new"` } },
        { prompt: 'What is the result of <code>{len(w) for w in ["ит", "мысық", "ат", "сиыр"]}</code>?', options: ['<code>[2, 5, 2, 4]</code>', '<code>{2, 5, 4}</code>', '<code>{"ит": 2, "мысық": 5, "ат": 2, "сиыр": 4}</code>', '<code>{2, 5, 2, 4}</code>'], explain: 'There is no colon, so this is a set comprehension. A set keeps the repeated 2 only once.' }
      ]
    },
    'pyi-5': {
      title: 'Recursion',
      body: `
<p><b>Recursion</b> is a function calling itself. It is used where a big problem can be split into the same, but smaller, problem: open a Russian nesting doll and there is another doll inside; when you reach the smallest one, you stop.</p>
<h3>Two required parts</h3>
<ul>
<li>The <b>base case</b> is the simplest case, whose answer is known right away. Without it, the function keeps calling itself forever.</li>
<li>The <b>recursive step</b> makes the problem smaller and calls the function itself.</li>
</ul>
<pre><code>def factorial(n):
    if n <= 1:                    # base case
        return 1
    return n * factorial(n - 1)   # recursive step

print(factorial(5))   # 120</code></pre>
<p>What is happening? <code>factorial(5)</code> = 5 × <code>factorial(4)</code> = 5 × 4 × <code>factorial(3)</code> = … = 5 × 4 × 3 × 2 × 1. Each call waits for its result on the "stack", and when the base case is reached, the answers are collected on the way back.</p>
<h3>Example: summing a number's digits</h3>
<pre><code>def digit_sum(n):
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)

print(digit_sum(2026))   # 2 + 0 + 2 + 6 = 10</code></pre>
<h3>Where is recursion really convenient?</h3>
<p>In tree-like structures: folders inside folders, lists inside lists, menus inside menus. A loop is hard to write here, while recursion is natural:</p>
<pre><code>def count_files(folder):
    # folder is a list: file names (str) or subfolders (list) inside
    total = 0
    for item in folder:
        if isinstance(item, list):
            total += count_files(item)   # "step into" the subfolder
        else:
            total += 1
    return total

disk = ["a.txt", ["b.png", "c.png", ["d.mp3"]], "e.pdf"]
print(count_files(disk))   # 5</code></pre>
<div class="tip">Python limits recursion depth (usually ~1000). Go too deep and you get a <code>RecursionError</code>. For simple counting a loop is enough; save recursion for tree-like data and divide-and-conquer algorithms. Also, naive recursion like <code>fib(n) = fib(n-1) + fib(n-2)</code> solves the same subproblem again and again, so it is slow.</div>`,
      ex: [
        { prompt: 'Write a recursive function <code>power(base, exp)</code>: it should raise <code>base</code> to the power <code>exp</code> (<code>exp</code> ≥ 0). Don\'t use the <code>**</code> operator or loops: <code>power(b, 0) = 1</code>, <code>power(b, e) = b * power(b, e - 1)</code>.', hints: ['Base case: <code>if exp == 0: return 1</code>', 'Recursive step: <code>return base * power(base, exp - 1)</code>'], check: { tests: `assert power(2, 10) == 1024, "power(2, 10) should be 1024"\nassert power(7, 0) == 1, "Any number to the power 0 is 1"\nassert "power" in power.__code__.co_names, "The function should call itself (recursion)"` } },
        { prompt: 'A shop catalogue is made of nested lists. Write a recursive function <code>flatten(items)</code>: it should turn a list of any depth into one flat list, keeping the order. <code>flatten([1, [2, [3, 4]], 5])</code> → <code>[1, 2, 3, 4, 5]</code>.', hints: ['For each element: if it is a list, <code>extend</code> with the result of <code>flatten(x)</code>, otherwise <code>append</code>.', '<code>isinstance(x, list)</code>'], check: { tests: `assert flatten([1, [2, [3, 4]], 5]) == [1, 2, 3, 4, 5], "flatten([1, [2, [3, 4]], 5]) → [1, 2, 3, 4, 5]"\nassert flatten(["Телефон", ["Чехол", ["Әйнек", []]], "Зарядтағыш"]) == ["Телефон", "Чехол", "Әйнек", "Зарядтағыш"], "Empty nested lists should simply disappear"\nassert flatten([]) == [], "Empty list → empty list"` } },
        { prompt: 'Naive Fibonacci: <code>def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)</code>. When <code>fib(4)</code> is called, how many times in total is <code>fib</code> called (including the first call)?', explain: 'C(0)=C(1)=1, C(n)=1+C(n−1)+C(n−2): C(2)=3, C(3)=5, C(4)=1+5+3=9. That is why naive recursion slows down quickly.' },
        { prompt: 'What happens if a recursive function has no base case?', options: ['The function returns 0', 'Python turns it into a loop by itself', 'The calls never stop, and in the end a RecursionError appears', 'Nothing: a base case is optional'], explain: 'Without a base case the function calls itself endlessly; when Python reaches the depth limit, it raises <code>RecursionError</code>.' }
      ]
    },
    'pyi-6': {
      title: 'Classes and objects',
      body: `
<p>Until now, data (dictionaries, lists) and the functions that process them lived separately. A <b>class</b> brings them together: the state of a "thing" (attributes) and its actions (methods) live in one place. A class is a blueprint, and an <b>object</b> (instance) is a concrete thing built from that blueprint.</p>
<h3>A first class</h3>
<pre><code>class Student:
    school = "№25 мектеп"            # class attribute: shared by all students

    def __init__(self, name, grade):
        self.name = name               # object attributes
        self.grade = grade
        self.marks = []

    def add_mark(self, mark):          # a method
        self.marks.append(mark)

    def average(self):
        if not self.marks:
            return 0
        return sum(self.marks) / len(self.marks)

    def __str__(self):
        return f"{self.name} ({self.grade}-сынып)"

    def __repr__(self):
        return f"Student({self.name!r}, {self.grade})"

ali = Student("Әли", 9)       # __init__ is called
ali.add_mark(5); ali.add_mark(4)
print(ali.average())           # 4.5
print(ali)                     # Әли (9-сынып)  ← __str__
print([ali])                   # [Student('Әли', 9)]  ← __repr__
print(ali.school)              # №25 мектеп</code></pre>
<h3>Key ideas</h3>
<ul>
<li><code>__init__</code> is the constructor: it runs once when the object is created and sets the initial state.</li>
<li><code>self</code> means "this object itself". It is the first parameter of every method. <code>ali.add_mark(5)</code> really means <code>Student.add_mark(ali, 5)</code>.</li>
<li>An <b>object attribute</b> (<code>self.name</code>) is separate in each object. A <b>class attribute</b> (<code>school</code>) belongs to the class and is shared by all; change it through <code>Student.school</code> and it changes for everyone.</li>
<li><code>__str__</code> is nice text for people (<code>print</code>, <code>str()</code>). <code>__repr__</code> is a precise description for developers (the console, display inside a list).</li>
</ul>
<div class="tip">To change a class attribute, write <code>ClassName.count += 1</code>, not <code>self.count += 1</code>. Otherwise Python creates a <b>new</b> attribute on the object, and the shared value does not change.</div>`,
      ex: [
        { prompt: 'Write the class <code>Product</code>: <code>__init__(self, name, price, qty)</code> stores three attributes; the method <code>total()</code> returns <code>price * qty</code>; <code>__str__</code> returns this string: <code>"Ноутбук: 350000 ₸ x 2"</code>.', hints: ['<code>self.name = name</code> and so on.', '<code>return f"{self.name}: {self.price} ₸ x {self.qty}"</code>'], check: { tests: `_p = Product("Ноутбук", 350000, 2)\nassert _p.name == "Ноутбук" and _p.price == 350000 and _p.qty == 2, "__init__ should store name, price, qty"\nassert _p.total() == 700000, "total() = price * qty"\nassert str(_p) == "Ноутбук: 350000 ₸ x 2", "__str__ format: 'Ноутбук: 350000 ₸ x 2'"` } },
        { prompt: 'The class <code>Player</code>: the class attribute <code>count = 0</code> counts the players created (it grows by 1 in every <code>__init__</code>). Each player has <code>name</code> and <code>hp = 100</code>. The method <code>take_damage(amount)</code> reduces <code>hp</code>, but not below 0. <code>is_alive()</code> is <code>hp > 0</code>.', hints: ['Increase the class attribute with <code>Player.count += 1</code>.', '<code>self.hp = max(0, self.hp - amount)</code>'], check: { tests: `_c0 = Player.count\n_a = Player("Әли"); _b = Player("Дана")\nassert Player.count == _c0 + 2, "Each new player should increase Player.count by 1"\nassert _a.hp == 100, "Starting hp = 100"\n_a.take_damage(30)\nassert _a.hp == 70 and _b.hp == 100, "take_damage reduces only that player\'s hp"\n_a.take_damage(500)\nassert _a.hp == 0, "hp should not drop below 0"\nassert not _a.is_alive() and _b.is_alive(), "is_alive(): hp > 0"` } },
        { prompt: 'A class defines both <code>__str__</code> and <code>__repr__</code>. Which one is called by <code>print(obj)</code>?', options: ['<code>__repr__</code>', '<code>__str__</code>', 'Both, one after the other', '<code>__init__</code>'], explain: '<code>print</code> and <code>str()</code> look for <code>__str__</code> first. <code>__repr__</code> is used in the console, inside a list, and when there is no <code>__str__</code>.' }
      ]
    },
    'pyi-7': {
      title: 'Inheritance, super(), polymorphism and dunder methods',
      body: `
<p>Sometimes one class is a "special kind" of another: a savings account is a kind of bank account, a dog is a kind of animal. In that case we use <b>inheritance</b> instead of repeating code: the child class gets all the attributes and methods of the parent class and adds its own.</p>
<pre><code>class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

class SavingsAccount(Account):            # inherits from Account
    def __init__(self, owner, balance=0, rate=0.1):
        super().__init__(owner, balance)  # the parent class's __init__
        self.rate = rate

    def add_interest(self):
        self.balance += self.balance * self.rate

s = SavingsAccount("Дана", 10000)
s.deposit(5000)        # the method came from Account
s.add_interest()
print(s.balance)       # 16500.0
print(isinstance(s, Account))   # True</code></pre>
<p><code>super()</code> refers to the parent class. It lets you avoid repeating work the parent already does.</p>
<h3>Polymorphism: one method, different behaviour</h3>
<pre><code>class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):            # redefining the method (override)
        return "Ау-ау"

class Cat(Animal):
    def speak(self):
        return "Мияу"

for a in [Dog(), Cat(), Animal()]:
    print(a.speak())            # Ау-ау, Мияу, ...</code></pre>
<p>The loop does not know the object's exact class, only that it has a <code>speak()</code> method. Code you have already written keeps working with new classes, unchanged.</p>
<h3>Dunder methods: teaching a class Python's operators</h3>
<p>Methods wrapped in two underscores (double underscore, "dunder") plug a class into Python's built-in features:</p>
<pre><code>class Song:
    def __init__(self, title, seconds):
        self.title, self.seconds = title, seconds
    def __eq__(self, other):     # ==
        return self.title == other.title and self.seconds == other.seconds
    def __lt__(self, other):     # <  (sorted, min, max use this)
        return self.seconds < other.seconds

class Playlist:
    def __init__(self):
        self.songs = []
    def __len__(self):           # len(playlist)
        return len(self.songs)</code></pre>
<p>Others: <code>__add__</code> (<code>+</code>), <code>__contains__</code> (<code>in</code>), <code>__getitem__</code> (<code>p[0]</code>).</p>
<div class="tip">Without <code>__eq__</code>, <code>==</code> only checks whether two variables point to <b>the same object</b>: two <code>Song</code>s with equal values turn out "not equal".</div>`,
      ex: [
        { prompt: 'The class <code>Account</code> is ready. Write the class <code>SavingsAccount</code> that inherits from it: <code>__init__(self, owner, balance=0, rate=0.05)</code> calls the parent class through <code>super()</code> and stores <code>rate</code>; <code>add_interest()</code> adds <code>balance * rate</code> to the balance and rounds the result with <code>round(..., 2)</code>.', hints: ['<code>class SavingsAccount(Account):</code>', '<code>super().__init__(owner, balance)</code>, then <code>self.rate = rate</code>'], check: { tests: `_s = SavingsAccount("Дана", 10000)\nassert isinstance(_s, Account), "SavingsAccount should inherit from Account"\nassert _s.owner == "Дана" and _s.balance == 10000 and _s.rate == 0.05, "owner, balance, rate should be stored correctly"\n_s.deposit(2000)\n_s.add_interest()\nassert _s.balance == 12600.0, "10000 + 2000, then 5% → 12600.0"` } },
        { prompt: 'Finish the classes <code>Song</code> and <code>Playlist</code>. <code>Song</code>: <code>__eq__</code> (equal if title and length match), <code>__lt__</code> (compare by length). <code>Playlist</code>: <code>add(song)</code>, <code>__len__</code> (number of songs), <code>total_seconds()</code> (total length).', hints: ['<code>def __lt__(self, other): return self.seconds < other.seconds</code>', '<code>def __len__(self): return len(self.songs)</code>'], check: { tests: `_a, _b, _c = Song("Көктем", 200), Song("Дала", 150), Song("Арман", 260)\nassert Song("Дала", 150) == _b, "Songs with the same title and length should be equal (__eq__)"\nassert _b < _a, "__lt__ compares by length"\nassert [s.title for s in sorted([_a, _b, _c])] == ["Дала", "Көктем", "Арман"], "sorted() should sort by length"\n_pl = Playlist(); _pl.add(_a); _pl.add(_b)\nassert len(_pl) == 2, "len(playlist) should give the number of songs"\nassert _pl.total_seconds() == 350, "total_seconds() = 200 + 150"` } },
        { prompt: 'In <code>class Cat(Animal)</code>, <code>speak</code> is overridden, and <code>Animal</code> has a <code>sleep</code> method. What happens when <code>Cat().sleep()</code> is called?', options: ['AttributeError: Cat has no sleep', 'The <code>sleep</code> from <code>Animal</code> runs', '<code>speak</code> is called first', 'TypeError'], explain: 'A child class inherits the parent\'s methods. Python looks for the method in <code>Cat</code> first, and if it is not found, in <code>Animal</code>.' }
      ]
    },
    'pyi-8': {
      title: 'Modules and import',
      body: `
<p>As a program grows, it gets hard to fit all the code into one file. A <b>module</b> is just a <code>.py</code> file; its functions and classes can be used in another file through <code>import</code>. When several modules are collected in one folder (with an <code>__init__.py</code> file), it is called a <b>package</b>.</p>
<h3>Four kinds of import</h3>
<pre><code>import math                    # the whole module: math.sqrt(16)
from math import sqrt, pi      # only the names you need: sqrt(16)
import datetime as dt          # a short alias: dt.date.today()
from random import *           # everything — not recommended: unclear where names come from</code></pre>
<p>Python's standard library has hundreds of modules: <code>math</code>, <code>random</code>, <code>datetime</code>, <code>json</code>, <code>collections</code>, <code>string</code>, <code>os</code>, <code>pathlib</code>. Third-party packages (for example, <code>requests</code>) are installed in the terminal with <code>pip install requests</code>.</p>
<h3>Writing your own module</h3>
<pre><code># shop_utils.py
VAT = 0.12

def with_vat(price):
    return round(price * (1 + VAT))

if __name__ == "__main__":
    # runs only when the file is run directly
    print(with_vat(1000))</code></pre>
<pre><code># main.py
from shop_utils import with_vat
print(with_vat(2500))      # 2800</code></pre>
<h3>Why do we need <code>if __name__ == "__main__"</code>?</h3>
<p>Every module has a special variable called <code>__name__</code>. If you run the file directly (<code>python shop_utils.py</code>), its value is <code>"__main__"</code>. If the file is imported from somewhere else, its value is the module name (<code>"shop_utils"</code>). So the code inside this condition (tests, a demo, starting the program) does not run on import. Without it, an <code>import</code> would print unexpected <code>print</code> output.</p>
<div class="tip">A module is loaded only once: a second <code>import</code> does not run it again. Don't name your files after standard modules (<code>random.py</code>, <code>json.py</code>): Python will import your file and give an error.</div>`,
      ex: [
        { prompt: 'A school trip: 128 students, 45 seats per bus. Import the <code>math</code> module and store the number of buses needed in the variable <code>buses</code> (<code>math.ceil</code> rounds up).', hints: ['<code>import math</code>', '<code>math.ceil(students / seats)</code>'], check: { tests: `assert buses == 3, "128 students with 45 seats per bus need 3 buses"` } },
        { prompt: 'A password checker. Import with the line <code>from string import digits, ascii_uppercase</code> and write the function <code>is_strong(pw)</code>: <code>True</code> if the length is at least 8 and it contains at least one digit and one uppercase Latin letter.', hints: ['<code>any(ch in digits for ch in pw)</code>', 'Join the three conditions with <code>and</code>.'], check: { tests: `assert is_strong("Almaty2026") is True, "Almaty2026 is a strong password"\nassert is_strong("almaty2026") is False, "No uppercase letter → False"\nassert is_strong("Almatyyy") is False, "No digit → False"\nassert is_strong("Ab1") is False, "Shorter than 8 characters → False"` } },
        { prompt: 'At the end of the file <code>shop_utils.py</code> there is <code>if __name__ == "__main__": print("demo")</code>. In <code>main.py</code> we wrote <code>import shop_utils</code> and ran <code>python main.py</code>. Is <code>demo</code> printed?', options: ['Yes, the whole file runs on import', 'No: when imported, __name__ is "shop_utils"', 'Yes, but only the first time', 'An error appears'], explain: 'In an imported module, <code>__name__</code> is the module name. It is <code>"__main__"</code> only in the file that was run directly.' },
        { prompt: 'You wrote <code>import datetime as dt</code>. How do you get today\'s date?', options: ['<code>datetime.date.today()</code>', '<code>dt.date.today()</code>', '<code>date.today()</code>', '<code>as.date.today()</code>'], explain: 'When you import with an alias, you refer to the module only by that name: <code>dt</code>.' }
      ]
    },
    'pyi-9': {
      title: 'Files: open, with and json',
      body: `
<p>Variables disappear when the program closes. To keep data, we write it to a <b>file</b>. (The Python on this page works with a virtual file system inside the browser, so you can write and read files freely.)</p>
<h3>open and with</h3>
<pre><code>with open("todo.txt", "w", encoding="utf-8") as f:
    f.write("Сабақ оқу\\n")
    f.write("Дүкенге бару\\n")

with open("todo.txt", encoding="utf-8") as f:
    lines = [line.strip() for line in f]
print(lines)    # ['Сабақ оқу', 'Дүкенге бару']</code></pre>
<p>When the <code>with</code> block ends, the file closes by itself, even if an error happened inside. So instead of <code>f = open(...)</code> … <code>f.close()</code>, always write <code>with</code>.</p>
<table>
<tr><th>Mode</th><th>Meaning</th></tr>
<tr><td><code>"r"</code></td><td>read (the default); if the file does not exist — <code>FileNotFoundError</code></td></tr>
<tr><td><code>"w"</code></td><td>write; the contents of an existing file are <b>erased</b> and written again</td></tr>
<tr><td><code>"a"</code></td><td>add to the end (append)</td></tr>
</table>
<p>Ways to read: <code>f.read()</code> gives the whole text as one string; <code>f.readlines()</code> gives a list of lines; <code>for line in f</code> goes line by line (the most memory-friendly for large files). Each line ends with <code>\\n</code>, which <code>.strip()</code> removes. To keep Kazakh letters correct, write <code>encoding="utf-8"</code>.</p>
<h3>json: saving structured data</h3>
<p>The standard format for storing dictionaries and lists as text is <b>JSON</b>. It is used both in web APIs and in settings files.</p>
<pre><code>import json

stock = {"Нан": 40, "Сүт": 25, "Шай": 12}

with open("stock.json", "w", encoding="utf-8") as f:
    json.dump(stock, f, ensure_ascii=False, indent=2)   # write to a file

with open("stock.json", encoding="utf-8") as f:
    loaded = json.load(f)                                 # read from a file

text = json.dumps(stock, ensure_ascii=False)   # to a string: '{"Нан": 40, ...}'
back = json.loads(text)                        # from a string to a dict</code></pre>
<p>How to remember: the version with the letter <code>s</code> (<code>dumps</code>, <code>loads</code>) works with a <b>string</b>, the one without it works with a file. <code>ensure_ascii=False</code> keeps Cyrillic readable instead of turning it into codes like <code>\\u04d8</code>.</p>
<div class="tip">JSON has no tuples (they become lists), and dictionary keys can only be strings: <code>{1: "a"}</code> is saved and comes back as <code>{"1": "a"}</code> when read again.</div>`,
      ex: [
        { prompt: 'Write the list <code>tasks</code> to the file <code>"tasks_pyi.txt"</code>, each task on its own line (<code>with open(..., "w")</code>). Then read the file back, clean the lines with <code>.strip()</code>, and collect them into the list <code>lines</code>.', hints: ['Writing: <code>f.write(t + "\\n")</code>', 'Reading: <code>[line.strip() for line in f]</code>'], check: { tests: `assert lines == tasks, "lines should be the list of tasks read from the file"\nwith open("tasks_pyi.txt", encoding="utf-8") as _f:\n    _txt = _f.read()\nassert _txt.splitlines() == tasks, "Each task should be on its own line in the file"` } },
        { prompt: 'Warehouse stock. Save the dictionary <code>stock</code> to the file <code>"stock_pyi.json"</code> with <code>json.dump</code>. Read the file with <code>json.load</code> and store it in the variable <code>loaded</code>. Finally, in <code>loaded</code> change the stock of "Шай" (tea) from 12 to 30 and save the file again.', hints: ['<code>json.dump(stock, f, ensure_ascii=False)</code>', '<code>loaded = json.load(f)</code>, then change it and <code>dump</code> again.'], check: { tests: `assert loaded == {"Нан": 40, "Сүт": 25, "Шай": 30}, "loaded should be read from the file, with Шай = 30"\nimport json as _json\nwith open("stock_pyi.json", encoding="utf-8") as _f:\n    _d = _json.load(_f)\nassert _d["Шай"] == 30 and _d["Нан"] == 40, "The changed dictionary should be saved to the file again"` } },
        { prompt: 'Turn the dictionary <code>student</code> into a JSON string (<code>text</code>), but keep the Cyrillic readable instead of turning it into <code>\\u...</code> codes.', hints: ['By default <code>json.dumps</code> encodes Cyrillic.', 'Add the parameter <code>ensure_ascii=False</code>.'], check: { tests: `assert isinstance(text, str), "text should be a string (str): json.dumps"\nassert "Әйгерім" in text and "Қостанай" in text, "Cyrillic should stay readable: ensure_ascii=False"\nimport json as _json\nassert _json.loads(text) == student, "text should be valid JSON"` } },
        { prompt: 'If you open an existing file with <code>open("log.txt", "w")</code>, what happens to its old text?', options: ['It is kept and the new text is added to the end', 'It is erased and the file opens empty', 'An error: the file already exists', 'It opens for reading only'], explain: 'The <code>"w"</code> mode empties the file. To add to the end, use the <code>"a"</code> mode.' }
      ]
    },
    'pyi-10': {
      title: 'Iterators and generators (yield)',
      body: `
<p><code>for x in ...</code> works with a list, a string, a dictionary and a file. Why? Because all of them are <b>iterable</b>. Inside, the <code>for</code> loop does this:</p>
<pre><code>queue = ["Әли", "Дана", "Ерлан"]
it = iter(queue)      # get an iterator
print(next(it))       # Әли
print(next(it))       # Дана
print(next(it))       # Ерлан
next(it)              # StopIteration: no elements left → this is where the for loop stops</code></pre>
<p>An <b>iterator</b> is an object that knows how to "give the next element". It remembers its place and goes through only once: to start again you need a new iterator.</p>
<h3>Generator: a function with yield</h3>
<p>The easiest way to make your own iterator is a <b>generator</b>. It is a function that uses <code>yield</code> instead of <code>return</code>. Each <code>yield</code> gives one value, and the function "pauses" there. When the next <code>next()</code> comes, it carries on from where it stopped.</p>
<pre><code>def countdown(n):
    while n > 0:
        yield n
        n -= 1
    print("Старт!")

for x in countdown(3):
    print(x)          # 3, 2, 1, then "Старт!"

gen = countdown(2)    # nothing has run yet!
print(next(gen))      # 2</code></pre>
<h3>Why is this useful?</h3>
<ul>
<li><b>Saving memory.</b> A generator does not collect all values into a list in advance; it makes them one at a time. Reading a million-line file or making an endless sequence becomes possible.</li>
<li><b>Endless sequences.</b> <code>while True: yield ...</code> — order numbers, turns in a game, an ID generator.</li>
<li><b>Pipelines.</b> One generator "feeds" another: file lines → cleaning → filtering.</li>
</ul>
<pre><code>def order_ids():
    n = 1
    while True:              # endless, but lazy
        yield f"ORD-{n:04d}"
        n += 1

ids = order_ids()
print(next(ids), next(ids))  # ORD-0001 ORD-0002</code></pre>
<h3>Generator expression</h3>
<p>Put a list comprehension in round brackets and you get a generator: <code>total = sum(p * q for p, q in cart)</code>. No intermediate list is built here.</p>
<div class="tip">You can go through a generator only once. <code>g = (x for x in range(3))</code>; <code>list(g)</code> → <code>[0, 1, 2]</code>, but a second <code>list(g)</code> → <code>[]</code>.</div>`,
      ex: [
        { prompt: 'Write the <b>generator</b> <code>countdown(n)</code> (with <code>yield</code>): it gives the values <code>n</code>, <code>n-1</code>, …, <code>1</code>. <code>list(countdown(3))</code> → <code>[3, 2, 1]</code>.', hints: ['Inside <code>while n > 0:</code> — <code>yield n</code>, then <code>n -= 1</code>.', 'The function should have <code>yield</code>, not <code>return</code>.'], check: { tests: `import inspect as _inspect\nassert _inspect.isgeneratorfunction(countdown), "countdown should be a generator: use yield"\nassert list(countdown(3)) == [3, 2, 1], "list(countdown(3)) = [3, 2, 1]"\nassert list(countdown(0)) == [], "countdown(0) gives nothing"` } },
        { prompt: 'An electronic queue. Write the endless generator <code>tickets(prefix)</code>: <code>"A-001"</code>, <code>"A-002"</code>, … (a 3-digit number with leading zeros: <code>f"{n:03d}"</code>).', hints: ['<code>yield</code> inside <code>while True:</code>.', '<code>f"{prefix}-{n:03d}"</code>'], check: { tests: `_g = tickets("A")\nassert next(_g) == "A-001", "The first ticket is A-001"\nassert next(_g) == "A-002" and next(_g) == "A-003", "The number grows by 1 with every next()"\n_h = tickets("VIP")\nassert next(_h) == "VIP-001", "Each generator starts at 1"\nfor _ in range(997): _last = next(_h)\nassert _last == "VIP-998", "The generator should be endless"` } },
        { prompt: 'Items in a cart: <code>(price, quantity)</code> pairs. Compute <code>total</code> with a generator expression and <code>sum</code> (no intermediate list).', hints: ['<code>sum(... for price, qty in cart)</code>', '<code>sum(price * qty for price, qty in cart)</code>'], check: { tests: `assert total == 3700, "total = 450*2 + 1200*1 + 320*5 = 3700"` } },
        { prompt: '<code>g = (x * 2 for x in [1, 2])</code>. What does <code>print(list(g), list(g))</code> print?', options: ['<code>[2, 4] [2, 4]</code>', '<code>[2, 4] []</code>', '<code>[] []</code>', 'A StopIteration error'], explain: 'A generator goes through only once. The first <code>list(g)</code> uses it up completely, and the second gets an empty list.' }
      ]
    },
    'pyi-11': {
      title: 'Decorators',
      body: `
<p>In Python a function is an ordinary object: you can store it in a variable, pass it to another function and return it from a function. A <b>decorator</b> is built on this: it takes a function, "wraps" it, and returns a function with a new ability added. We don't touch the original function's code.</p>
<h3>Building one step by step</h3>
<pre><code>def log_calls(func):                  # takes a function
    def wrapper(*args, **kwargs):     # passes any arguments through
        print(f"→ {func.__name__}{args}")
        result = func(*args, **kwargs)   # call the original function
        print(f"← {result}")
        return result
    return wrapper                    # returns the new function

@log_calls                            # this means: add = log_calls(add)
def add(a, b):
    return a + b

add(2, 3)
# → add(2, 3)
# ← 5</code></pre>
<p>Writing <code>@log_calls</code> is short for <code>add = log_calls(add)</code>. Now the name <code>add</code> points to <code>wrapper</code>, and the original <code>func</code> is kept inside <code>wrapper</code> (this is called a <b>closure</b>: the inner function "remembers" the outer function's variables).</p>
<h3>functools.wraps</h3>
<p>After wrapping, <code>add.__name__</code> becomes <code>"wrapper"</code>, which makes debugging harder. The fix is easy:</p>
<pre><code>from functools import wraps

def log_calls(func):
    @wraps(func)              # keeps the name and docstring
    def wrapper(*args, **kwargs):
        ...</code></pre>
<h3>Real uses</h3>
<ul>
<li><b>Checks:</b> is the argument valid, is the user logged in (<code>@login_required</code> in web frameworks).</li>
<li><b>Timing</b> and logging.</li>
<li><b>Caching:</b> the standard <code>@functools.lru_cache</code> keeps results already computed; a naive recursive <code>fib</code> speeds up at once.</li>
<li>Web routes: <code>@app.get("/users")</code> in Flask/FastAPI is a decorator too.</li>
</ul>
<div class="tip">When you write a decorator, don't forget to return the result of <code>return func(...)</code> inside <code>wrapper</code>. Otherwise the decorated function will always return <code>None</code>.</div>`,
      ex: [
        { prompt: 'Write the decorator <code>shout</code>: it turns the string returned by the function into uppercase and adds <code>"!"</code> at the end. With <code>@shout</code>, <code>greet("дана")</code> → <code>"СӘЛЕМ, ДАНА!"</code>.', hints: ['Inside, write <code>def wrapper(*args, **kwargs):</code> and <code>return wrapper</code>.', '<code>return func(*args, **kwargs).upper() + "!"</code>'], check: { tests: `assert greet("дана") == "СӘЛЕМ, ДАНА!", "greet('дана') → 'СӘЛЕМ, ДАНА!'"\n@shout\ndef _bye():\n    return "сау бол"\nassert _bye() == "САУ БОЛ!", "The decorator should work with any function"` } },
        { prompt: 'Bank operations must only use a positive amount. Write the decorator <code>positive_amount</code>: if the function\'s <b>last</b> positional argument is less than or equal to 0, raise <code>ValueError</code>; otherwise call the function and return its result. Use <code>functools.wraps</code> so the function name is kept.', hints: ['<code>args[-1]</code> is the last positional argument.', 'Put the <code>@wraps(func)</code> decorator above <code>wrapper</code>.'], check: { tests: `assert deposit(1000, 500) == 1500, "With a positive amount the function works normally"\n_ok = False\ntry:\n    deposit(1000, -200)\nexcept ValueError:\n    _ok = True\nassert _ok, "A negative amount should raise ValueError"\n_ok = False\ntry:\n    deposit(1000, 0)\nexcept ValueError:\n    _ok = True\nassert _ok, "An amount of 0 should also raise ValueError"\nassert deposit.__name__ == "deposit", "Use @wraps(func): the name should be kept"` } },
        { prompt: 'What is the equivalent of <code>def report(): ...</code> with <code>@timer</code> above it?', options: ['<code>timer = report(timer)</code>', '<code>report = timer(report)</code>', '<code>report = timer()</code>', '<code>timer(report())</code>'], explain: 'A decorator takes a function and returns a new one; the result is written back to the original name.' }
      ]
    },
    'pyi-12': {
      title: 'datetime and collections',
      body: `
<p>Two standard library modules turn up very often in everyday code: <code>datetime</code> for dates and times, and <code>collections</code>, which provides special collections.</p>
<h3>datetime</h3>
<pre><code>from datetime import date, datetime, timedelta

start = date(2026, 9, 1)                # 1 September 2026
deadline = start + timedelta(days=30)   # 30 days later
print(deadline)                         # 2026-10-01
print((date(2026, 12, 16) - start).days)   # 106: the difference is a timedelta

now = datetime(2026, 10, 16, 14, 30)
print(now.strftime("%d.%m.%Y %H:%M"))   # 16.10.2026 14:30  (date → text)
d = datetime.strptime("22.03.2027", "%d.%m.%Y")   # text → date
print(d.weekday())                      # 0 = Monday … 6 = Sunday</code></pre>
<p><code>strftime</code> is <b>f</b>ormat (date to string), <code>strptime</code> is <b>p</b>arse (string to date). Common codes: <code>%Y</code> year, <code>%m</code> month, <code>%d</code> day, <code>%H:%M</code> hours and minutes.</p>
<h3>Counter: counting</h3>
<pre><code>from collections import Counter

votes = ["Дана", "Әли", "Дана", "Ерлан", "Дана", "Әли"]
c = Counter(votes)
print(c["Дана"])          # 3
print(c.most_common(2))   # [('Дана', 3), ('Әли', 2)]
print(c["Тимур"])         # 0: no error for a missing key</code></pre>
<h3>defaultdict: a dictionary with a default value</h3>
<pre><code>from collections import defaultdict

by_class = defaultdict(list)
for name, cls in [("Әли", "9А"), ("Дана", "9Б"), ("Ерлан", "9А")]:
    by_class[cls].append(name)    # if the key is missing, an empty list is created automatically
# {'9А': ['Әли', 'Ерлан'], '9Б': ['Дана']}</code></pre>
<p>With a regular dictionary you would have to check <code>if cls not in d: d[cls] = []</code>. <code>defaultdict(int)</code> is handy for counting (the default is 0).</p>
<h3>namedtuple: a tuple with named fields</h3>
<pre><code>from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p[1])     # 3 4: by name and by index
x, y = p             # unpacks like a tuple</code></pre>
<p>For a small record that does not change (a coordinate, a colour, a playing card) you don't need a full class: <code>namedtuple</code> is enough, and it reads much more clearly than <code>p[0]</code>.</p>
<div class="tip"><code>collections</code> also has <code>deque</code>: a queue you can quickly add to and take from at both ends (<code>appendleft</code>, <code>popleft</code>).</div>`,
      ex: [
        { prompt: 'Given <code>today = date(2026, 10, 16)</code>. <code>days_left</code> is the number of days until the Nauryz holiday (<code>2027-03-22</code>). <code>exam_day</code> is the date 45 days from today, as a string in the <code>"dd.mm.yyyy"</code> format (<code>strftime("%d.%m.%Y")</code>).', hints: ['The difference: <code>(date(2027, 3, 22) - today).days</code>', '<code>(today + timedelta(days=45)).strftime("%d.%m.%Y")</code>'], check: { tests: `assert days_left == 157, "157 days until Nauryz: (date(2027, 3, 22) - today).days"\nassert exam_day == "30.11.2026", "today + 45 days = 30.11.2026"` } },
        { prompt: 'Electing the school president. Use <code>Counter</code> to compute the variables <code>winner</code> (the name of whoever got the most votes) and <code>top3</code> (the result of <code>most_common(3)</code>).', hints: ['<code>c = Counter(votes)</code>', '<code>c.most_common(1)</code> → <code>[("Сая", 4)]</code>; get the name with <code>[0][0]</code>.'], check: { tests: `assert winner == "Сая", "Сая has the most votes (4)"\nassert top3 == [("Сая", 4), ("Дана", 3), ("Әли", 2)], "top3 = Counter(votes).most_common(3)"` } },
        { prompt: 'A library: use <code>defaultdict(list)</code> to build the dictionary <code>by_genre</code> (genre → book titles, in the original order). Then create <code>Book = namedtuple("Book", ["title", "pages"])</code> and store in the variable <code>longest</code> the book with the most pages, as a <code>Book</code>.', hints: ['<code>by_genre[genre].append(title)</code> — if the key is missing, the list is created automatically.', '<code>max((Book(t, p) for t, g, p in books), key=lambda b: b.pages)</code>'], check: { tests: `assert dict(by_genre) == {"роман": ["Абай жолы", "Көшпенділер"], "оқулық": ["Python негіздері", "Алгоритмдер"]}, "by_genre: genre → book titles"\nassert type(by_genre).__name__ == "defaultdict", "by_genre should be a defaultdict(list)"\nassert longest.title == "Абай жолы" and longest.pages == 1200, "longest is the book with the most pages, as Book(title, pages)"` } },
        { prompt: 'What does <code>(date(2026, 3, 1) - date(2026, 1, 1)).days</code> give?', explain: 'January has 31 days and February 2026 has 28 days: 31 + 28 = 59.' }
      ]
    },
    'pyi-13': {
      title: 'Mini project: a text-based banking system',
      body: `
<p>Let's bring what we learned in this module together in one project: a small banking system. Customers open accounts, deposit money, withdraw it and transfer it to each other. The "core" of a real banking app is made of classes just like these; it only adds a database and an interface.</p>
<h3>Step 1: design</h3>
<p>Before writing code, ask: "what objects are there, and what do they do?"</p>
<table>
<tr><th>Class</th><th>State (attributes)</th><th>Actions (methods)</th></tr>
<tr><td><code>BankAccount</code></td><td>owner, balance, history</td><td>deposit, withdraw, __str__</td></tr>
<tr><td><code>Bank</code></td><td>accounts: a dictionary (name → account)</td><td>open_account, transfer, total, richest</td></tr>
<tr><td><code>InsufficientFunds</code></td><td colspan="2">our own error class: not enough funds</td></tr>
</table>
<h3>Step 2: your own error</h3>
<pre><code>class InsufficientFunds(Exception):
    pass

raise InsufficientFunds("Балансыңыз: 3000 ₸")</code></pre>
<p>An empty class that inherits from <code>Exception</code> is enough. Now the calling code can catch exactly this case with <code>except InsufficientFunds:</code>, while other errors (for example, <code>ValueError</code> for a negative amount) are handled separately.</p>
<h3>Step 3: the account</h3>
<pre><code>class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []                    # tuples like ("deposit", 5000)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Сома оң болуы керек")
        self.balance += amount
        self.history.append(("deposit", amount))</code></pre>
<p><code>withdraw</code> works the same way, except it checks the balance first. An important rule: <b>check first, then change</b>. If you reduce the balance and raise an error afterwards, the account is left "half changed".</p>
<h3>Step 4: the bank and transfers</h3>
<p>A transfer is two operations: take from one account and put into another. If taking fails (not enough money), putting must not happen. If <code>withdraw</code> raises an error, the next line does not run, so the right order is enough:</p>
<pre><code>def transfer(self, src, dst, amount):
    self.accounts[src].withdraw(amount)   # stops here if there is an error
    self.accounts[dst].deposit(amount)</code></pre>
<h3>Going further</h3>
<p>Ideas to grow the project: save and load accounts from a <code>json</code> file; add a <code>datetime</code> timestamp to every operation; a <code>SavingsAccount</code> subclass that adds monthly interest; a menu with <code>input()</code> (in Python on your computer). The Python on this page does not support <code>input()</code>, so we write the values straight into variables.</p>
<div class="tip">Let each method do one job, and check it with a test right away: <code>assert acc.balance == 15000</code>. A project written in small steps is easy to debug.</div>`,
      ex: [
        { prompt: 'Finish the class <code>BankAccount</code>. <code>deposit(amount)</code>: if the amount is ≤ 0, <code>ValueError</code>; otherwise add it to the balance and record <code>("deposit", amount)</code> in <code>history</code>. <code>withdraw(amount)</code>: if the amount is ≤ 0, <code>ValueError</code>; if it is more than the balance, <code>InsufficientFunds</code> (the balance does not change); otherwise subtract it and record <code>("withdraw", amount)</code>. <code>__str__</code> → <code>"Дана: 15000 ₸"</code>.', hints: ['Check first: <code>if amount <= 0: raise ValueError(...)</code>, then <code>if amount > self.balance: raise InsufficientFunds(...)</code>.', 'Only after the checks, change <code>self.balance</code> and call <code>self.history.append(...)</code>.'], check: { tests: `_a = BankAccount("Дана", 10000)\n_a.deposit(5000)\nassert _a.balance == 15000, "deposit should add to the balance"\n_a.withdraw(3000)\nassert _a.balance == 12000, "withdraw should subtract from the balance"\nassert _a.history == [("deposit", 5000), ("withdraw", 3000)], "history: ('deposit', 5000), ('withdraw', 3000)"\n_e = None\ntry:\n    _a.withdraw(50000)\nexcept InsufficientFunds:\n    _e = "ok"\nassert _e == "ok", "An amount larger than the balance should raise InsufficientFunds"\nassert _a.balance == 12000 and len(_a.history) == 2, "After a failed withdrawal the balance and history should not change"\nfor _bad in (0, -100):\n    _e = None\n    try:\n        _a.deposit(_bad)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "deposit: ValueError if the amount is ≤ 0"\n    _e = None\n    try:\n        _a.withdraw(_bad)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "withdraw: ValueError if the amount is ≤ 0"\nassert str(_a) == "Дана: 12000 ₸", "__str__ format: 'Дана: 12000 ₸'"` } },
        { prompt: 'Now write the class <code>Bank</code> (<code>BankAccount</code> is ready). <code>open_account(owner, balance=0)</code>: creates an account, stores it in the dictionary <code>self.accounts</code>, and returns it; if such a customer already exists, <code>ValueError</code>. <code>transfer(src, dst, amount)</code>: takes from <code>src</code> and puts into <code>dst</code> (if there is not enough money, neither account should change). <code>total()</code> is the sum of all balances. <code>richest()</code> is the name of the richest customer.', hints: ['<code>transfer</code>: <code>withdraw</code> first, then <code>deposit</code>. If there is an error, the second line does not run.', '<code>max(self.accounts.values(), key=lambda a: a.balance).owner</code>'], check: { tests: `_b = Bank()\n_x = _b.open_account("Әли", 20000)\n_b.open_account("Дана", 5000)\nassert isinstance(_x, BankAccount) and _b.accounts["Әли"] is _x, "open_account should store the account and return it"\n_e = None\ntry:\n    _b.open_account("Әли")\nexcept ValueError:\n    _e = "ok"\nassert _e == "ok", "An existing customer cannot open an account again: ValueError"\n_b.transfer("Әли", "Дана", 8000)\nassert _b.accounts["Әли"].balance == 12000 and _b.accounts["Дана"].balance == 13000, "transfer: Әли 12000, Дана 13000"\n_e = None\ntry:\n    _b.transfer("Әли", "Дана", 99999)\nexcept InsufficientFunds:\n    _e = "ok"\nassert _e == "ok", "If there is not enough money, InsufficientFunds should be raised"\nassert _b.accounts["Әли"].balance == 12000 and _b.accounts["Дана"].balance == 13000, "After a failed transfer neither account should change"\nassert _b.total() == 25000, "total() = 25000"\nassert _b.richest() == "Дана", "richest() = 'Дана'"` } },
        { done: 'Now try writing the code from this plan on your computer: write each class separately and check each method with <code>assert</code>. If you put the finished project on GitHub with a README, it makes a good start to a portfolio.', prompt: 'Design an <b>inventory system</b> for a shop (at least 60 words, code is optional). Describe: which classes there will be, with the attributes and methods of each; which errors are raised (for example, when there is not enough of an item in stock); how the data is stored in a file; which tools from this module (dict, namedtuple, generator, decorator, json) are useful where. Then rate yourself honestly on the four criteria. To pass, you need at least <b>3 / 4</b> on each criterion.', criteria: [
          { name: 'Classes and responsibilities', levels: ['No classes named', 'One class with everything inside it', 'Several classes, with their attributes and methods named', 'Each class has one clear responsibility, and how they connect is explained'] },
          { name: 'Error handling', levels: ['Not mentioned', 'Vague ("there may be an error")', 'Specific situations and which error is raised are named', 'Has its own error class and follows the "check first, then change" rule'] },
          { name: 'Data storage', levels: ['Not mentioned', 'Only "we will save to a file"', 'The JSON format and when it is written/read are stated', 'There is an example of the JSON structure and a plan for loading it when the program starts'] },
          { name: 'Use of the module\'s tools', levels: ['None named', 'One named, but it is unclear why', 'Two or three tools used in the right places', 'Tools chosen well, with an explanation of why not others'] }
        ] }
      ]
    },
    'pyi-gate': {
      title: 'Module exam: Intermediate Python',
      body: `
<p>The exam covers the whole module: classes and dunder methods, generators, decorators and recursion, comprehensions, <code>json</code> and <code>collections</code>. To pass you need at least <b>75%</b> of the points.</p>
<ul>
<li>Read each task carefully: variable and function names must be exactly as given.</li>
<li>In the Python tasks, first test on a small example with <code>print</code>, then press the "Check" button.</li>
<li>Remember: <b>check first, then change</b>; a generator goes through once; a decorator returns <code>wrapper</code>.</li>
</ul>`,
      ex: [
        { prompt: 'What is printed?<pre><code>class Clicker:\n    total = 0\n    def click(self):\n        self.total += 1\n\na = Clicker()\na.click(); a.click()\nprint(Clicker.total, a.total)</code></pre>', options: ['<code>2 2</code>', '<code>0 2</code>', '<code>0 0</code>', 'AttributeError'], explain: '<code>self.total += 1</code> reads the class attribute but writes the result to a new attribute on the <b>object</b>. The class attribute stays 0. For a shared counter, write <code>Clicker.total += 1</code>.' },
        { prompt: 'Write the class <code>Inventory</code>. <code>self.items</code> is a dictionary (item → quantity). <code>add(name, qty)</code> adds to the quantity (creating the item if it is new). <code>remove(name, qty)</code>: if there is not enough in stock (or the item is missing), <code>ValueError</code>; otherwise it subtracts, and if the quantity becomes 0, removes the item from the dictionary. <code>__len__</code> is the number of item types. <code>__contains__</code> supports <code>"Сүт" in inv</code>. <code>low_stock(limit)</code> is a <b>generator</b>: it yields, in alphabetical order, the names of items with a quantity below <code>limit</code>.', hints: ['<code>self.items.get(name, 0)</code> gives 0 if the item is missing.', 'Inside <code>low_stock</code>: <code>for name in sorted(self.items): if ...: yield name</code>'], check: { tests: `import inspect as _inspect\n_inv = Inventory()\n_inv.add("Сүт", 10); _inv.add("Нан", 3); _inv.add("Сүт", 5); _inv.add("Май", 2)\nassert _inv.items == {"Сүт": 15, "Нан": 3, "Май": 2}, "add should add to the quantity: Сүт 15"\nassert len(_inv) == 3 and "Нан" in _inv and "Шай" not in _inv, "__len__ and __contains__ should work correctly"\n_inv.remove("Нан", 3)\nassert "Нан" not in _inv and len(_inv) == 2, "An item whose quantity reaches 0 should be removed"\nfor _args in (("Сүт", 100), ("Шай", 1)):\n    _e = None\n    try:\n        _inv.remove(*_args)\n    except ValueError:\n        _e = "ok"\n    assert _e == "ok", "ValueError if there is not enough or the item is missing"\nassert _inv.items["Сүт"] == 15, "A failed remove should not change the quantity"\n_inv.add("Алма", 1)\nassert _inspect.isgeneratorfunction(Inventory.low_stock), "low_stock should be a generator (yield)"\nassert list(_inv.low_stock(5)) == ["Алма", "Май"], "low_stock(5): items with fewer than 5, in alphabetical order"` } },
        { prompt: 'On a staircase you can climb 1 or 2 steps at a time. The number of ways to climb <code>n</code> steps: <code>ways(0) = ways(1) = 1</code>, <code>ways(n) = ways(n-1) + ways(n-2)</code>. Naive recursion is slow, so write a <code>memo</code> decorator: it stores results in the dictionary <code>wrapper.cache</code> (the key is the argument) and does not recompute what was already computed. Write <code>ways</code> recursively and apply <code>@memo</code>.', hints: ['After writing the <code>wrapper</code> function, give it an attribute: <code>wrapper.cache = {}</code>.', 'Inside: <code>if n not in wrapper.cache: wrapper.cache[n] = func(n)</code>, then <code>return wrapper.cache[n]</code>.'], check: { tests: `assert isinstance(getattr(ways, "cache", None), dict), "The memo decorator should create the wrapper.cache dictionary"\nassert ways(4) == 5, "ways(4) = 5: 1111, 112, 121, 211, 22"\nassert ways(60) == 2504730781961, "ways(60) = 2504730781961"\nassert len(ways.cache) >= 60, "Intermediate results should be stored in ways.cache (recursion + memo)"` } },
        { prompt: 'Online shop orders arrived as a JSON string. Read it with <code>json.loads</code> and compute three variables: <code>per_customer</code> — customer → number of items in the order (dict comprehension); <code>unique_items</code> — the set of item names sold (set comprehension); <code>top_item</code> — the most frequently sold item (<code>Counter</code>).', hints: ['<code>orders = json.loads(raw)</code> is a list of dictionaries.', 'A two-level loop: <code>{item for o in orders for item in o["items"]}</code>'], check: { tests: `assert per_customer == {"Әли": 2, "Дана": 3, "Ерлан": 4}, "per_customer: customer → number of items"\nassert unique_items == {"Нан", "Сүт", "Шай", "Алма"}, "unique_items: distinct items"\nassert top_item == "Сүт", "top_item: the most frequently sold item (Сүт, 4 times)"` } },
        { prompt: 'What does this code print?<pre><code>def evens(n):\n    for i in range(n):\n        if i % 2 == 0:\n            yield i * i\n\ng = evens(7)\nnext(g)\nprint(sum(g))</code></pre>', explain: 'The generator yields 0, 4, 16, 36. The first <code>next(g)</code> "eats" the 0, and what is left is 4 + 16 + 36 = 56.' }
      ]
    }
  }
});
