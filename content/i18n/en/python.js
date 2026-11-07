// M2.1 Python Fundamentals: English text. Code, solutions and expected output are in content/python.js.
DJ.i18n.patch({
  modules: {
    'm2-1': { intro: 'Python is the main language of anyone who works with data. Here you write code right in the browser and run it at once. The first run loads the Python environment (about 10 MB), after that it is fast.' }
  },
  lessons: {
    'py-1': {
      title: 'print and your first program',
      body: `
<p>A Python program is a sequence of commands run from top to bottom. The very first command is <code>print()</code>: it shows text or a number on the screen:</p>
<pre><code>print("Hello, world of data!")
print(2026)
print("Year:", 2026)</code></pre>
<p>Text (a string) goes in quotes: <code>"..."</code> or <code>'...'</code>. Numbers are written without quotes. If you give <code>print</code> several values separated by commas, they are printed with a space between them.</p>
<h3>Comments</h3>
<pre><code># This line does not run: it is for people</code></pre>
<div class="tip">Python cares about spaces at the start of a line (indentation). For now, start every command at the beginning of the line.</div>`,
      ex: [
        { prompt: 'Print exactly this text: <code>Сәлем, Tolqyn!</code>', starter: '# Write your code here\n', hints: ['<code>print("...")</code>'] },
        { prompt: 'Print two lines: <code>SQL</code> on the first and <code>Python</code> on the second.', hints: ['Write two separate <code>print</code> calls.'] }
      ]
    },
    'py-2': {
      title: 'Variables and data types',
      body: `
<p>A <b>variable</b> is a name given to a value. It is created with <code>=</code>:</p>
<pre><code>city = "Алматы"
orders = 120
avg_check = 8450.5
is_active = True</code></pre>
<h3>Main types</h3>
<table>
<tr><th>Type</th><th>Example</th><th>Used for</th></tr>
<tr><td><code>int</code></td><td>120</td><td>whole number</td></tr>
<tr><td><code>float</code></td><td>8450.5</td><td>decimal number</td></tr>
<tr><td><code>str</code></td><td>"Алматы"</td><td>text</td></tr>
<tr><td><code>bool</code></td><td>True / False</td><td>true / false</td></tr>
</table>
<p><code>type()</code> shows the type. You can convert between types: <code>int("42")</code>, <code>float("3.5")</code>, <code>str(100)</code>.</p>
<div class="tip">Variable names use Latin lowercase letters, with words joined by <code>_</code>: <code>total_revenue</code>. A name cannot start with a digit.</div>`,
      ex: [
        { prompt: 'Set the variable <code>product</code> to <code>"Ноутбук"</code> and <code>price</code> to <code>350000</code>. Then run <code>print(product, price)</code>.', check: { tests: 'assert product == "Ноутбук", "product should be \\"Ноутбук\\""\nassert price == 350000 and isinstance(price, int), "price should be the whole number 350000"' }, hints: ['<code>product = "Ноутбук"</code>'] },
        { prompt: '<code>raw = "1250"</code> is given as text. Turn it into a whole number, store it in <code>qty</code> and print <code>qty * 2</code>.', check: { tests: 'assert isinstance(qty, int), "qty should be an int: use int(raw)"' }, hints: ['<code>int(raw)</code>'] }
      ]
    },
    'py-3': {
      title: 'Working with numbers',
      body: `
<table>
<tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
<tr><td><code>+ - * /</code></td><td>add, subtract, multiply, divide</td><td><code>7 / 2 = 3.5</code></td></tr>
<tr><td><code>//</code></td><td>whole-number division</td><td><code>7 // 2 = 3</code></td></tr>
<tr><td><code>%</code></td><td>remainder of division</td><td><code>7 % 2 = 1</code></td></tr>
<tr><td><code>**</code></td><td>power</td><td><code>2 ** 3 = 8</code></td></tr>
</table>
<p><code>round(x, 2)</code> rounds to two decimal places. <code>abs(x)</code> gives the absolute value. <code>sum()</code>, <code>min()</code> and <code>max()</code> work with lists (coming in the next lessons).</p>
<pre><code>revenue_aug = 80_000_000
revenue_sep = 100_000_000
growth = (revenue_sep - revenue_aug) / revenue_aug * 100
print(round(growth, 1))   # 25.0</code></pre>`,
      ex: [
        { prompt: 'An order has 3 items: 4500, 12000 and 800 tenge. Store the total in the variable <code>total</code> and print it.', check: { tests: 'assert total == 17300, "total should be 17300"' } },
        { prompt: '1840 people visited the site and 46 of them bought something. Work out the conversion rate as a percentage and print it rounded to 2 decimal places.', hints: ['<code>buyers / visitors * 100</code>', '<code>round(..., 2)</code>'] }
      ]
    },
    'py-4': {
      title: 'Strings and f-strings',
      body: `
<p>Working with text comes up all the time when cleaning data: extra spaces, mixed letter case, splitting into parts.</p>
<pre><code>name = "  айгерім  "
print(name.strip())          # "айгерім"
print(name.strip().title())  # "Айгерім"
print("ALMATY".lower())      # "almaty"
print("a,b,c".split(","))    # ['a', 'b', 'c']
print("2024-09-14"[:7])      # "2024-09"
print(len("SQL"))            # 3</code></pre>
<p>Indexing starts at 0: <code>"Python"[0]</code> = <code>"P"</code>. A slice <code>[a:b]</code> goes from a up to b (b is not included).</p>
<h3>f-string</h3>
<p>The easiest way to put a value inside text:</p>
<pre><code>city = "Астана"
orders = 42
print(f"{city}: {orders} orders")
print(f"Average check: {8450.567:.2f}")   # 8450.57</code></pre>`,
      ex: [
        { prompt: '<code>raw = "  ШЫМКЕНТ "</code>. Remove the spaces and print it so that only the first letter is a capital: <code>Шымкент</code>.', hints: ['Chain <code>.strip()</code> and <code>.title()</code>.'] },
        { prompt: 'Use an f-string to print exactly this line: <code>Алматы: 925600 ₸</code>. The variables are given.', hints: ['<code>print(f"{city}: {revenue} ₸")</code>'] },
        { prompt: 'Take the month (<code>11</code>) out of <code>date = "2024-11-21"</code> with a slice and print it.', hints: ['Count indexes from 0. The month is at positions 5 and 6.'] }
      ]
    },
    'py-5': {
      title: 'Conditions: if, elif, else',
      body: `
<p>A program can act differently depending on a condition:</p>
<pre><code>price = 25000
if price &gt;= 100000:
    segment = "expensive"
elif price &gt;= 10000:
    segment = "mid-range"
else:
    segment = "cheap"
print(segment)   # mid-range</code></pre>
<p>A <code>:</code> goes after the condition, and the block inside is indented by <b>4 spaces</b>. It is the exact counterpart of CASE WHEN in SQL.</p>
<h3>Comparison and logic</h3>
<p><code>==</code> (equal), <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. Combining: <code>and</code>, <code>or</code>, <code>not</code>. Is it in a list: <code>city in ["Алматы", "Астана"]</code>.</p>`,
      ex: [
        { prompt: 'Print a grade based on <code>score</code>: 85 and above is <code>A</code>, 70 and above is <code>B</code>, 50 and above is <code>C</code>, otherwise <code>F</code>. For <code>score = 72</code> the output should be <code>B</code>.', hints: ['Check the conditions from top to bottom, starting with the largest.'] },
        { prompt: 'If the order amount is over 20 000 <b>and</b> the customer is from Almaty, print <code>Тегін жеткізу</code> (free delivery), otherwise print <code>Жеткізу 1500 ₸</code>. Print the Kazakh text exactly as shown.', hints: ['<code>if amount > 20000 and city == "Алматы":</code>'] }
      ]
    },
    'py-6': {
      title: 'Lists',
      body: `
<p>A variable holds only one value, and spreading a week of daily sales over 7 variables is awkward. A <b>list</b> is an ordered collection of values: like a cabinet with numbered shelves, one value on each shelf. In data work it is the simplest form of a column or a set of records. A list is written in square brackets with values separated by commas.</p>
<h3>The index: the shelf number</h3>
<p>The list <code>sales = [120, 95, 140, 80]</code> looks like this inside:</p>
<table>
<tr><th>Index</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>
<tr><td>Value</td><td>120</td><td>95</td><td>140</td><td>80</td></tr>
<tr><td>Negative index</td><td>-4</td><td>-3</td><td>-2</td><td>-1</td></tr>
</table>
<p>Counting starts <b>at 0</b>. A negative index counts from the end: <code>-1</code> is always the last element.</p>
<pre><code>sales = [120, 95, 140, 80]
print(sales[0])        # 120 (first)
print(sales[-1])       # 80 (last)
print(sales[1:3])      # [95, 140]
print(len(sales))      # 4
print(sum(sales), max(sales), min(sales))   # 435 140 80
print(sum(sales) / len(sales))              # 108.75</code></pre>
<p>The slice <code>sales[1:3]</code> starts at index 1 and goes <b>up to</b> index 3 (3 is not included). If you give <code>print</code> several values separated by commas, they come out on one line with spaces.</p>
<h3>Changing and sorting</h3>
<pre><code>sales.append(110)      # add to the end → [120, 95, 140, 80, 110]
sales.sort()           # sort in place → [80, 95, 110, 120, 140]
print(sorted(sales, reverse=True))   # [140, 120, 110, 95, 80]

items = ["Термос", "Блокнот", "Рюкзак"]
items.sort()
print(items)           # ['Блокнот', 'Рюкзак', 'Термос']</code></pre>
<p>Text is sorted alphabetically. <code>.sort()</code> changes the list itself, while <code>sorted()</code> returns a new list and leaves the old one as it was.</p>
<h3>Compared with SQL</h3>
<table>
<tr><th>SQL</th><th>Python list</th></tr>
<tr><td><code>COUNT(*)</code></td><td><code>len(xs)</code></td></tr>
<tr><td><code>SUM</code>, <code>MAX</code>, <code>MIN</code></td><td><code>sum(xs)</code>, <code>max(xs)</code>, <code>min(xs)</code></td></tr>
<tr><td><code>AVG</code></td><td><code>sum(xs) / len(xs)</code></td></tr>
<tr><td><code>ORDER BY ... DESC</code></td><td><code>sorted(xs, reverse=True)</code></td></tr>
</table>
<div class="tip">The average of a list: <code>sum(xs) / len(xs)</code>. Python has no separate <code>avg()</code>, but there is <code>statistics.mean()</code>. Rounding: <code>round(x, 2)</code>.</div>
<h3>Common mistakes</h3>
<ul>
<li><b>Starting the index at 1.</b> A 4-element list has no <code>sales[4]</code>: that is an <code>IndexError</code>. The last one is <code>sales[3]</code> or <code>sales[-1]</code>.</li>
<li><b>Writing <code>xs = xs.sort()</code>.</b> <code>.sort()</code> returns nothing (<code>None</code>), so the list is lost. Just write <code>xs.sort()</code>.</li>
<li><b>The order of Kazakh letters.</b> Python compares letters by their code numbers, so letters like Ә, Қ, Ө, Ү sometimes do not land where you expect.</li>
</ul>`,
      ex: [
        { prompt: 'Weekly sales are given. Print the largest value, the smallest value and the average (rounded to 2 places) on one line: <code>print(max_v, min_v, avg)</code>.', hints: ['<code>round(sum(sales) / len(sales), 2)</code>'] },
        { prompt: 'Add <code>"Ақтөбе"</code> to the <code>cities</code> list, sort the list alphabetically and print it.', check: { tests: 'assert "Ақтөбе" in cities, "Ақтөбе should be in the list"\nassert cities == sorted(cities), "The list is not sorted"' }, hints: ['<code>.append()</code>, then <code>.sort()</code>.'] }
      ]
    },
    'py-7': {
      title: 'The for loop and range',
      body: `
<p>Picture a cashier: they take items out of the basket one by one and scan each. The action is the same, only the item changes. A <code>for</code> loop also does the same action for each element of a list. Whether there are 3 items or 3000, the code stays the same.</p>
<pre><code>prices = [6500, 7200, 15000]
for p in prices:
    print(round(p * 1.12))</code></pre>
<pre><code>7280
8064
16800</code></pre>
<p>On each pass the variable <code>p</code> takes the next value: first 6500, then 7200, then 15000. The indented lines (4 spaces) are the body of the loop and repeat for each element. <code>round()</code> removes "noise" in decimals such as <code>7280.000000000001</code>.</p>
<h3>range: a sequence of numbers</h3>
<p><code>range(n)</code> gives the numbers from 0 to n−1: <code>for i in range(3)</code> → 0, 1, 2. <code>range(1, 4)</code> → 1, 2, 3. The last number is never included, so "from 1 to N inclusive" is written <code>range(1, N + 1)</code>. Inside the loop an f-string builds a neat line: <code>print(f"Day {i}")</code>.</p>
<h3>The accumulator</h3>
<p>Building up a value step by step inside a loop is the most common pattern. Put <code>total = 0</code> <b>before</b> the loop, add inside it, and print at the end:</p>
<pre><code>total = 0
for p in prices:
    if p &gt; 7000:
        total += p
print(total)   # 22200</code></pre>
<p>Step by step:</p>
<table>
<tr><th>Pass</th><th>p</th><th>p &gt; 7000?</th><th>total after</th></tr>
<tr><td>1</td><td>6500</td><td>no</td><td>0</td></tr>
<tr><td>2</td><td>7200</td><td>yes</td><td>7200</td></tr>
<tr><td>3</td><td>15000</td><td>yes</td><td>22200</td></tr>
</table>
<p>This is the same as the SQL query <code>SELECT SUM(price) FROM products WHERE price &gt; 7000</code>. The condition can be anything. For example, <code>%</code> is the remainder of division: <code>p % 1000 == 0</code> means "divides by 1000 with no remainder".</p>
<p><code>enumerate()</code> gives the index and the value together: <code>for i, p in enumerate(prices):</code> → (0, 6500), (1, 7200), (2, 15000).</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Putting <code>total = 0</code> inside the loop.</b> Then it resets on every pass, and only the last value is left at the end.</li>
<li><b>The indentation of <code>print</code>.</b> If <code>print(total)</code> is inside the loop (indented), it prints on every step. If you only need the result, write it without indentation.</li>
<li><b>Forgetting where range ends.</b> <code>range(1, 5)</code> is 1, 2, 3, 4. No five!</li>
</ul>`,
      ex: [
        { prompt: 'Use a loop to add up only the even numbers in the list, and print the sum.', hints: ['An even number: <code>n % 2 == 0</code>'] },
        { prompt: 'For each number from 1 to 5 (inclusive), print a line in the format <code>i x 10 = result</code>. For example, the first line is <code>1 x 10 = 10</code>.', hints: ['<code>range(1, 6)</code> gives 1 to 5.'] }
      ]
    },
    'py-8': {
      title: 'while, break, continue',
      body: `
<p><code>while</code> repeats as long as a condition is true. Use it when you do not know in advance how many times it will repeat:</p>
<pre><code>balance = 100000
months = 0
while balance &lt; 150000:
    balance = balance * 1.05
    months += 1
print(months)   # 9</code></pre>
<p><code>break</code> stops the loop at once. <code>continue</code> skips the rest of the body and moves on to the next pass.</p>
<div class="tip">If the condition never becomes false, the loop runs forever. On this platform code is stopped after 8 seconds.</div>`,
      ex: [
        { prompt: 'A company has 1 000 users, and the number grows by 20% every month. How many months does it take to pass 10 000 users? Print the number of months.', hints: ['Condition: <code>while users <= 10000:</code>', 'Change both <code>users</code> and <code>months</code> inside the loop.'] },
        { prompt: 'Find and print the first negative number in the list, then stop the loop with <code>break</code>.' }
      ]
    },
    'py-9': {
      title: 'Functions',
      body: `
<p>Picture a coffee machine: you add water and beans (input), press the button, and it gives you coffee (output). You do not need to think about what happens inside each time. A <b>function</b> is a named, reusable piece of code. Instead of rewriting one formula in 10 places, we put it in a function once. It is defined with <code>def</code>; the names in brackets are <b>parameters</b> (input), and <code>return</code> gives back the result (output):</p>
<pre><code>def growth_pct(old, new):
    return (new - old) / old * 100

print(growth_pct(80, 100))   # 25.0</code></pre>
<p>We call one function with different values. On a call, <code>old</code> gets the first value and <code>new</code> gets the second:</p>
<table>
<tr><th>Call</th><th>Calculation</th><th>Returns</th></tr>
<tr><td><code>growth_pct(80, 100)</code></td><td>(100 − 80) / 80 × 100</td><td>25.0</td></tr>
<tr><td><code>growth_pct(100, 80)</code></td><td>(80 − 100) / 100 × 100</td><td>-20.0</td></tr>
<tr><td><code>growth_pct(200, 230)</code></td><td>(230 − 200) / 200 × 100</td><td>15.0</td></tr>
</table>
<p>In SQL you used ready-made functions such as <code>ROUND</code> and <code>SUM</code>. <code>def</code> is how you make your own.</p>
<h3>Several returns and if</h3>
<p>The moment <code>return</code> runs, the function <b>stops right away</b>. So inside if/elif each branch can have its own return: the function form of CASE WHEN in SQL. In the same way you can check a bad case first:</p>
<pre><code>def delivery_fee(amount):
    if amount &lt;= 0:
        return 0           # invalid amount: leave right away
    if amount &gt;= 20000:
        return 0
    elif amount &gt;= 10000:
        return 1000
    return 1500

print(delivery_fee(25000), delivery_fee(12000), delivery_fee(5000))   # 0 1000 1500</code></pre>
<p>When there is a risk of dividing by zero, do exactly this: check before dividing and return at once.</p>
<h3>Default values</h3>
<pre><code>def with_vat(price, rate=0.12):
    return price * (1 + rate)

with_vat(1000)          # 1120.0
with_vat(1000, 0.2)     # 1200.0</code></pre>
<p>If the second value is not given, <code>rate</code> is 0.12.</p>
<p><code>print</code> and <code>return</code> are different: print only shows something on the screen, while return hands the value back so it can be used later. The checking tests look at the value the function <b>returns</b>.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Writing print instead of return.</b> The function shows the number on screen, but if you write <code>x = f(...)</code>, <code>x</code> is <code>None</code>.</li>
<li><b>Forgetting return.</b> A function without return always returns <code>None</code>.</li>
<li><b>Code after return.</b> It never runs. For example, if you write <code>x = round(x, 2)</code> after return, nothing gets rounded. Do it on the return line itself: <code>return round(x, 2)</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Write a function <code>conversion(visitors, buyers)</code> that returns the conversion rate as a percentage, rounded to 2 places. If <code>visitors</code> is 0, it should return 0.', check: { tests: 'assert conversion(400, 60) == 15.0, "conversion(400, 60) should be 15.0"\nassert conversion(1840, 46) == 2.5, "conversion(1840, 46) should be 2.5"\nassert conversion(0, 0) == 0, "when visitors is 0, return 0"' }, hints: ['First <code>if visitors == 0: return 0</code>.', '<code>return round(buyers / visitors * 100, 2)</code>'] },
        { prompt: 'The function <code>segment(price)</code> returns <code>"қымбат"</code> (expensive) for 100 000 and above, <code>"орташа"</code> (mid-range) for 10 000 and above, and <code>"арзан"</code> (cheap) otherwise. Return the Kazakh words exactly as shown.', check: { tests: 'assert segment(350000) == "қымбат", "350000 → қымбат"\nassert segment(100000) == "қымбат", "100000 → қымбат (the boundary)"\nassert segment(25000) == "орташа", "25000 → орташа"\nassert segment(9999) == "арзан", "9999 → арзан"' }, hints: ['Remember CASE WHEN from the SQL lesson.'] }
      ]
    },
    'py-10': {
      title: 'Dictionaries (dict)',
      body: `
<p>A <b>dictionary</b> holds "key: value" pairs. It is handy for describing one record (for example, one customer):</p>
<pre><code>customer = {"name": "Айгерім", "city": "Алматы", "orders": 3}
print(customer["city"])          # Алматы
customer["orders"] += 1
customer["vip"] = True
print(customer.get("phone", "none"))   # the default when the key is missing</code></pre>
<h3>Counting with a dictionary</h3>
<p>The most useful pattern is counting by category (GROUP BY + COUNT in SQL):</p>
<pre><code>cities = ["Алматы", "Астана", "Алматы", "Шымкент", "Алматы"]
counts = {}
for c in cities:
    counts[c] = counts.get(c, 0) + 1
print(counts)   # {'Алматы': 3, 'Астана': 2 ...}</code></pre>
<p>Going over keys and values: <code>for key, value in counts.items():</code></p>`,
      ex: [
        { prompt: 'Count the order statuses with a dictionary, store it in <code>counts</code> and print it.', check: { tests: 'assert counts == {"delivered": 3, "shipped": 2, "cancelled": 1}, "the counts dictionary is wrong: " + str(counts)' }, hints: ['<code>counts[s] = counts.get(s, 0) + 1</code>'] },
        { prompt: 'Product prices are given in a dictionary. Print the products that cost more than 10 000 in the format <code>name: price</code> (in dictionary order).', hints: ['<code>for name, price in prices.items():</code>'] }
      ]
    },
    'py-11': {
      title: 'List comprehension',
      body: `
<p>A short way to build a new list from a list:</p>
<pre><code>prices = [6500, 7200, 15000, 1200]

# with a loop
with_vat = []
for p in prices:
    with_vat.append(p * 1.12)

# with a comprehension
with_vat = [p * 1.12 for p in prices]

# with a filter
expensive = [p for p in prices if p &gt; 7000]</code></pre>
<p>The pattern: <code>[expression for item in list if condition]</code>. Dictionaries have one too: <code>{k: v for k, v in d.items() if v &gt; 0}</code>.</p>
<div class="tip">In pandas such operations run on whole columns at once, but comprehensions help you understand the "language" of Python.</div>`,
      ex: [
        { prompt: 'Use a comprehension to build a list <code>clean</code> from the <code>names</code> list, with spaces removed and a capital first letter (<code>.strip().title()</code>). Print it.', check: { tests: 'assert clean == ["Айгерім", "Нұрлан", "Дана"], "the clean list: " + str(clean)' }, hints: ['<code>[n.strip().title() for n in names]</code>'] },
        { prompt: 'Use a comprehension to collect only the November 2024 dates (those starting with <code>"2024-11"</code>) into a list <code>nov</code>, and print how many there are.', check: { tests: 'assert nov == ["2024-11-04", "2024-11-09", "2024-11-21"], "the nov list is wrong"' }, hints: ['<code>d.startswith("2024-11")</code>'] }
      ]
    },
    'py-12': {
      title: 'Errors and try/except',
      body: `
<p>Real data arrives "dirty": text where a number should be, empty strings. An error (exception) stops the program. Reading errors is an important skill:</p>
<pre><code>int("12a")
# ValueError: invalid literal for int() with base 10: '12a'</code></pre>
<p>The last line tells you the <b>type</b> of the error (ValueError) and its <b>cause</b>. Common ones: <code>NameError</code> (no such variable), <code>TypeError</code> (types do not fit: <code>"5" + 1</code>), <code>KeyError</code> (no such key in a dictionary), <code>ZeroDivisionError</code>, <code>IndentationError</code>.</p>
<h3>try / except</h3>
<pre><code>raw = ["120", "95", "n/a", "140"]
values = []
for r in raw:
    try:
        values.append(int(r))
    except ValueError:
        print("Skipped:", r)
print(sum(values))   # 355</code></pre>
<div class="tip">Do not hide every error with a bare <code>except:</code>. Name the exact error type, or you will miss a real problem.</div>`,
      ex: [
        { prompt: 'From the <code>raw</code> list, collect only the values that turn into numbers, as <code>float</code>, into <code>values</code> (<code>try/except ValueError</code>). At the end, print their sum.', check: { tests: 'assert values == [12.5, 7.0, 30.5], "values: " + str(values)' }, hints: ['Inside <code>except ValueError:</code> you can write <code>pass</code>.'] },
        { prompt: 'This code raises an error. Fix it so it prints <code>Барлығы: 15</code>.', hints: ['<code>count</code> is text: turn it into a number with <code>int()</code> first.', 'To join the result to text you need <code>str()</code>, or an f-string.'] }
      ]
    },
    'py-13': {
      title: 'Mini project: analysing shop sales',
      body: `
<p>Now let us bring everything together in one analysis. The shop's sales are given as CSV text. Python's <code>csv</code> module turns it into a list of dictionaries:</p>
<pre><code>import csv, io
rows = list(csv.DictReader(io.StringIO(data)))
print(rows[0])   # {'date': '2024-09-01', 'city': 'Алматы', ...}</code></pre>
<p>Note: every value read from CSV is <b>text</b>. Numbers have to be converted with <code>int()</code>.</p>
<h3>Tasks</h3>
<ol>
<li>Total revenue (<code>qty × price</code>).</li>
<li>Revenue by city (a dictionary).</li>
<li>The city that brought in the most revenue.</li>
</ol>
<p>This is the Python version of <code>SUM</code>, <code>GROUP BY</code> and <code>ORDER BY ... LIMIT 1</code> in SQL. In the next module pandas does it in a line or two.</p>`,
      ex: [
        { prompt: 'Write a function <code>total_revenue(rows)</code> that returns the sum of <code>qty × price</code> over all rows (as an int).', check: { tests: 'assert total_revenue(rows) == 188000, "Total revenue should be 188000, you have: " + str(total_revenue(rows))\nassert total_revenue([]) == 0, "Return 0 for an empty list"' }, hints: ['Turn the text into a number: <code>int(r["qty"])</code>.'] },
        { prompt: 'The function <code>revenue_by_city(rows)</code> should return a city → revenue dictionary. Then <code>best_city(rows)</code> should return the name of the city with the most revenue.', check: { tests: 'r = revenue_by_city(rows)\nassert r == {"Алматы": 69000, "Астана": 104000, "Шымкент": 15000}, "revenue_by_city: " + str(r)\nassert best_city(rows) == "Астана", "best_city should be Астана"' }, hints: ['Use the <code>.get(key, 0)</code> pattern from the lesson on counting with a dictionary.', 'The key with the largest value: <code>max(rev, key=rev.get)</code>.'] }
      ]
    },
    'py-gate': {
      title: 'Module exam: Python Fundamentals',
      body: `
<p>The final check: three tasks without hints. Pass them all and you are one step from the <b>L3 Python for Data</b> level (pandas is next).</p>
<div class="tip">The value the function <b>returns</b> is checked. print is optional.</div>`,
      ex: [
        { prompt: 'Write a function <code>median(xs)</code> (without the statistics module) that returns the median of a list of numbers. For an even length, it is the average of the two middle values.', check: { tests: 'assert median([7, 1, 9, 3, 100]) == 7, "median([7,1,9,3,100]) = 7"\nassert median([2, 8, 4, 6]) == 5, "median([2,8,4,6]) = 5"\nassert median([5]) == 5, "One element: that element"\nimport random\nxs = [3, 1, 2]\nmedian(xs)\nassert xs == [3, 1, 2], "The function must not change the list it is given: use sorted()"' } },
        { prompt: '<code>clean_phones(raw)</code>: keep only the digits of each phone number and return only those that have 11 digits and start with 7 (keeping the order).', check: { tests: 'assert clean_phones(["+7 (701) 123-45-67", "8 702 000 11 22", "77015556677", "12345"]) == ["77011234567", "77015556677"], "Result: " + str(clean_phones(["+7 (701) 123-45-67", "8 702 000 11 22", "77015556677", "12345"]))\nassert clean_phones([]) == [], "Empty list"' } },
        { prompt: '<code>top_products(orders, n)</code>: <code>orders</code> is a list of <code>(product, qty)</code> tuples. Add up the quantity for each product and return a list of the names of the <code>n</code> best-selling products, from most to least.', check: { tests: 'orders = [("Термос", 2), ("Блокнот", 10), ("Рюкзак", 1), ("Термос", 3), ("Рюкзак", 2), ("Құлаққап", 4)]\nassert top_products(orders, 2) == ["Блокнот", "Термос"], "top 2: " + str(top_products(orders, 2))\nassert top_products(orders, 1) == ["Блокнот"], "top 1 is wrong"\nassert top_products([], 3) == [], "Empty list"' } }
      ]
    }
  }
});
