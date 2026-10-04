// M2.1 Python Fundamentals. Runs in the browser via Pyodide (Python 3.12).
DJ.modules['m2-1'] = {
  intro: 'Python — data маманының негізгі тілі. Мұнда кодты браузерде жазып, бірден іске қосасыз. Бірінші іске қосу Python ортасын жүктейді (шамамен 10 МБ), сосын жылдам жұмыс істейді.',
  lessons: [
    {
      id: 'py-1', title: 'print және бірінші бағдарлама', minutes: 8,
      body: `
<p>Python бағдарламасы — жоғарыдан төмен орындалатын командалар тізбегі. Ең алғашқы команда — <code>print()</code>, ол экранға мәтін немесе сан шығарады:</p>
<pre><code>print("Сәлем, Data әлемі!")
print(2026)
print("Жыл:", 2026)</code></pre>
<p>Мәтін (string) тырнақшаға алынады: <code>"..."</code> немесе <code>'...'</code>. Сандар тырнақшасыз жазылады. <code>print</code> ішінде бірнеше мәнді үтірмен берсеңіз, олар бос орынмен бөлініп шығады.</p>
<h3>Түсініктеме (comment)</h3>
<pre><code># Бұл жол орындалмайды: ол адамдарға арналған</code></pre>
<div class="tip">Python бос орынға (indentation) сезімтал. Әзірге әр команданы жолдың басынан бастаңыз.</div>`,
      exercises: [
        { type: 'python', xp: 10, prompt: 'Экранға дәл осы мәтінді шығарыңыз: <code>Сәлем, DataJol!</code>', starter: '# Кодыңызды осында жазыңыз\n', solution: 'print("Сәлем, DataJol!")', hints: ['<code>print("...")</code>'] },
        { type: 'python', xp: 10, prompt: 'Екі жол шығарыңыз: бірінші жолда <code>SQL</code>, екінші жолда <code>Python</code>.', starter: '', solution: 'print("SQL")\nprint("Python")', hints: ['Екі бөлек <code>print</code> жазыңыз.'] }
      ]
    },
    {
      id: 'py-2', title: 'Айнымалылар мен деректер типтері', minutes: 10,
      body: `
<p><b>Айнымалы</b> (variable) — мәнге берілген атау. Ол <code>=</code> арқылы құрылады:</p>
<pre><code>city = "Алматы"
orders = 120
avg_check = 8450.5
is_active = True</code></pre>
<h3>Негізгі типтер</h3>
<table>
<tr><th>Тип</th><th>Мысал</th><th>Не үшін</th></tr>
<tr><td><code>int</code></td><td>120</td><td>бүтін сан</td></tr>
<tr><td><code>float</code></td><td>8450.5</td><td>бөлшек сан</td></tr>
<tr><td><code>str</code></td><td>"Алматы"</td><td>мәтін</td></tr>
<tr><td><code>bool</code></td><td>True / False</td><td>ақиқат / жалған</td></tr>
</table>
<p>Типті <code>type()</code> көрсетеді. Типтер арасында түрлендіруге болады: <code>int("42")</code>, <code>float("3.5")</code>, <code>str(100)</code>.</p>
<div class="tip">Айнымалы атауы латынша, кіші әріппен, сөздер <code>_</code> арқылы: <code>total_revenue</code>. Ол саннан басталмайды.</div>`,
      exercises: [
        { type: 'python', xp: 10, prompt: '<code>product</code> айнымалысына <code>"Ноутбук"</code>, <code>price</code> айнымалысына <code>350000</code> мәнін беріңіз. Сосын <code>print(product, price)</code> орындаңыз.', starter: '', solution: 'product = "Ноутбук"\nprice = 350000\nprint(product, price)', check: { tests: 'assert product == "Ноутбук", "product айнымалысы \\"Ноутбук\\" болуы керек"\nassert price == 350000 and isinstance(price, int), "price бүтін сан 350000 болуы керек"', stdout: true }, hints: ['<code>product = "Ноутбук"</code>'] },
        { type: 'python', xp: 15, prompt: '<code>raw = "1250"</code> мәтін түрінде берілген. Оны бүтін санға айналдырып, <code>qty</code> айнымалысына жазыңыз және <code>qty * 2</code> мәнін шығарыңыз.', starter: 'raw = "1250"\n', solution: 'raw = "1250"\nqty = int(raw)\nprint(qty * 2)', check: { tests: 'assert isinstance(qty, int), "qty int типі болуы керек: int(raw) қолданыңыз"', stdout: true }, hints: ['<code>int(raw)</code>'] }
      ]
    },
    {
      id: 'py-3', title: 'Сандармен амалдар', minutes: 9,
      body: `
<table>
<tr><th>Оператор</th><th>Мағынасы</th><th>Мысал</th></tr>
<tr><td><code>+ - * /</code></td><td>қосу, азайту, көбейту, бөлу</td><td><code>7 / 2 = 3.5</code></td></tr>
<tr><td><code>//</code></td><td>бүтін бөлу</td><td><code>7 // 2 = 3</code></td></tr>
<tr><td><code>%</code></td><td>бөлгендегі қалдық</td><td><code>7 % 2 = 1</code></td></tr>
<tr><td><code>**</code></td><td>дәрежеге шығару</td><td><code>2 ** 3 = 8</code></td></tr>
</table>
<p><code>round(x, 2)</code> — екі ондық белгіге дейін дөңгелектеу. <code>abs(x)</code> — модуль. <code>sum()</code>, <code>min()</code>, <code>max()</code> тізімдермен жұмыс істейді (келесі сабақтарда).</p>
<pre><code>revenue_aug = 80_000_000
revenue_sep = 100_000_000
growth = (revenue_sep - revenue_aug) / revenue_aug * 100
print(round(growth, 1))   # 25.0</code></pre>`,
      exercises: [
        { type: 'python', xp: 10, prompt: 'Тапсырыс 3 тауардан тұрады: 4500, 12000 және 800 теңге. Жалпы соманы <code>total</code> айнымалысына жазып, шығарыңыз.', starter: '', solution: 'total = 4500 + 12000 + 800\nprint(total)', check: { tests: 'assert total == 17300, "total = 17300 болуы керек"', stdout: true }, hints: [] },
        { type: 'python', xp: 15, prompt: 'Сайтқа 1840 адам кіріп, 46-сы сатып алды. Конверсияны пайызбен есептеп, 2 ондық белгіге дейін дөңгелектеп шығарыңыз.', starter: 'visitors = 1840\nbuyers = 46\n', solution: 'visitors = 1840\nbuyers = 46\nprint(round(buyers / visitors * 100, 2))', hints: ['<code>buyers / visitors * 100</code>', '<code>round(..., 2)</code>'] }
      ]
    },
    {
      id: 'py-4', title: 'Жолдар (strings) және f-string', minutes: 11,
      body: `
<p>Мәтінмен жұмыс деректі тазалауда өте жиі кездеседі: артық бос орын, әртүрлі регистр, бөлшектеу.</p>
<pre><code>name = "  айгерім  "
print(name.strip())          # "айгерім"
print(name.strip().title())  # "Айгерім"
print("ALMATY".lower())      # "almaty"
print("a,b,c".split(","))    # ['a', 'b', 'c']
print("2024-09-14"[:7])      # "2024-09"
print(len("SQL"))            # 3</code></pre>
<p>Индекстеу 0-ден басталады: <code>"Python"[0]</code> = <code>"P"</code>. Кесінді (slice) <code>[a:b]</code> — a-дан b-ға дейін (b кірмейді).</p>
<h3>f-string</h3>
<p>Мәнді мәтін ішіне қоюдың ең ыңғайлы тәсілі:</p>
<pre><code>city = "Астана"
orders = 42
print(f"{city}: {orders} тапсырыс")
print(f"Орташа чек: {8450.567:.2f}")   # 8450.57</code></pre>`,
      exercises: [
        { type: 'python', xp: 10, prompt: '<code>raw = "  ШЫМКЕНТ "</code>. Бос орындарды алып, тек бірінші әрпі бас әріп болатындай етіп шығарыңыз: <code>Шымкент</code>.', starter: 'raw = "  ШЫМКЕНТ "\n', solution: 'raw = "  ШЫМКЕНТ "\nprint(raw.strip().title())', hints: ['<code>.strip()</code> және <code>.title()</code> тізбектеп жазыңыз.'] },
        { type: 'python', xp: 15, prompt: 'f-string арқылы дәл осындай жол шығарыңыз: <code>Алматы: 925600 ₸</code>. Айнымалылар берілген.', starter: 'city = "Алматы"\nrevenue = 925600\n', solution: 'city = "Алматы"\nrevenue = 925600\nprint(f"{city}: {revenue} ₸")', check: { mustInclude: ['f"', '{city}'] }, hints: ['<code>print(f"{city}: {revenue} ₸")</code>'] },
        { type: 'python', xp: 15, prompt: '<code>date = "2024-11-21"</code> жолынан айды (<code>11</code>) кесінді арқылы алып шығарыңыз.', starter: 'date = "2024-11-21"\n', solution: 'date = "2024-11-21"\nprint(date[5:7])', hints: ['Индекстер: 0-ден санаңыз. Ай 5 және 6-позицияда.'] }
      ]
    },
    {
      id: 'py-5', title: 'Шарттар: if, elif, else', minutes: 11,
      body: `
<p>Бағдарлама шартқа қарай әртүрлі әрекет жасай алады:</p>
<pre><code>price = 25000
if price &gt;= 100000:
    segment = "қымбат"
elif price &gt;= 10000:
    segment = "орташа"
else:
    segment = "арзан"
print(segment)   # орташа</code></pre>
<p>Шарттан кейін <code>:</code> қойылады, ал ішкі блок <b>4 бос орынмен</b> шегініп жазылады. SQL-дегі CASE WHEN-нің дәл баламасы.</p>
<h3>Салыстыру және логика</h3>
<p><code>==</code> (тең), <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. Біріктіру: <code>and</code>, <code>or</code>, <code>not</code>. Тізімде бар ма: <code>city in ["Алматы", "Астана"]</code>.</p>`,
      exercises: [
        { type: 'python', xp: 15, prompt: '<code>score</code> мәніне қарай баға шығарыңыз: 85 және жоғары — <code>A</code>, 70 және жоғары — <code>B</code>, 50 және жоғары — <code>C</code>, әйтпесе <code>F</code>. <code>score = 72</code> үшін <code>B</code> шығуы керек.', starter: 'score = 72\n', solution: 'score = 72\nif score >= 85:\n    print("A")\nelif score >= 70:\n    print("B")\nelif score >= 50:\n    print("C")\nelse:\n    print("F")', check: { mustInclude: ['elif'] }, hints: ['Шарттарды жоғарыдан төмен, үлкенінен бастаңыз.'] },
        { type: 'python', xp: 15, prompt: 'Тапсырыс сомасы 20 000-нан жоғары <b>және</b> клиент Алматыдан болса <code>Тегін жеткізу</code>, әйтпесе <code>Жеткізу 1500 ₸</code> шығарыңыз.', starter: 'amount = 23500\ncity = "Алматы"\n', solution: 'amount = 23500\ncity = "Алматы"\nif amount > 20000 and city == "Алматы":\n    print("Тегін жеткізу")\nelse:\n    print("Жеткізу 1500 ₸")', check: { mustInclude: ['and'] }, hints: ['<code>if amount > 20000 and city == "Алматы":</code>'] }
      ]
    },
    {
      id: 'py-6', title: 'Тізімдер (list)', minutes: 11,
      body: `
<p><b>Тізім</b> — реттелген мәндер жиыны. Data-да ол бағанның немесе бірнеше жазбаның қарапайым түрі.</p>
<pre><code>sales = [120, 95, 140, 80]
print(sales[0])        # 120 (бірінші)
print(sales[-1])       # 80 (соңғы)
print(sales[1:3])      # [95, 140]
print(len(sales))      # 4
print(sum(sales), max(sales), min(sales))

sales.append(110)      # соңына қосу
sales.sort()           # орнында сұрыптау
print(sorted(sales, reverse=True))</code></pre>
<div class="tip">Тізімнің орташасы: <code>sum(xs) / len(xs)</code>. Python-да бөлек <code>avg()</code> жоқ, бірақ <code>statistics.mean()</code> бар.</div>`,
      exercises: [
        { type: 'python', xp: 10, prompt: 'Апталық сатылым берілген. Ең үлкен мәнді, ең кіші мәнді және орташаны (2 белгіге дөңгелектеп) бір жолда шығарыңыз: <code>print(max_v, min_v, avg)</code>.', starter: 'sales = [120, 95, 140, 80, 110, 160, 72]\n', solution: 'sales = [120, 95, 140, 80, 110, 160, 72]\nmax_v = max(sales)\nmin_v = min(sales)\navg = round(sum(sales) / len(sales), 2)\nprint(max_v, min_v, avg)', hints: ['<code>round(sum(sales) / len(sales), 2)</code>'] },
        { type: 'python', xp: 15, prompt: '<code>cities</code> тізіміне <code>"Ақтөбе"</code> қосып, тізімді әліпби бойынша сұрыптап, шығарыңыз.', starter: 'cities = ["Шымкент", "Алматы", "Астана"]\n', solution: 'cities = ["Шымкент", "Алматы", "Астана"]\ncities.append("Ақтөбе")\ncities.sort()\nprint(cities)', check: { tests: 'assert "Ақтөбе" in cities, "Ақтөбе тізімде болуы керек"\nassert cities == sorted(cities), "Тізім сұрыпталмаған"', stdout: true }, hints: ['<code>.append()</code>, сосын <code>.sort()</code>.'] }
      ]
    },
    {
      id: 'py-7', title: 'for циклі және range', minutes: 12,
      body: `
<p><code>for</code> циклі тізімнің әр элементі үшін бірдей әрекет жасайды:</p>
<pre><code>prices = [6500, 7200, 15000]
for p in prices:
    print(p * 1.12)</code></pre>
<p><code>range(n)</code> — 0-ден n−1-ге дейінгі сандар: <code>for i in range(3)</code> → 0, 1, 2. <code>range(1, 4)</code> → 1, 2, 3.</p>
<h3>Жинақтаушы (accumulator)</h3>
<p>Цикл ішінде мәнді біртіндеп жинау — ең жиі үлгі:</p>
<pre><code>total = 0
for p in prices:
    if p &gt; 7000:
        total += p
print(total)   # 22200</code></pre>
<p><code>enumerate()</code> индекс пен мәнді бірге береді: <code>for i, p in enumerate(prices):</code></p>`,
      exercises: [
        { type: 'python', xp: 15, prompt: 'Тізімдегі тек жұп сандардың қосындысын цикл арқылы есептеп, шығарыңыз.', starter: 'nums = [3, 8, 12, 5, 6, 7, 10]\n', solution: 'nums = [3, 8, 12, 5, 6, 7, 10]\ntotal = 0\nfor n in nums:\n    if n % 2 == 0:\n        total += n\nprint(total)', check: { mustInclude: ['for'] }, hints: ['Жұп сан: <code>n % 2 == 0</code>'] },
        { type: 'python', xp: 15, prompt: '1-ден 5-ке дейінгі (қоса) әр сан үшін <code>i x 10 = нәтиже</code> форматында жол шығарыңыз. Мысалы бірінші жол: <code>1 x 10 = 10</code>.', starter: '', solution: 'for i in range(1, 6):\n    print(f"{i} x 10 = {i * 10}")', check: { mustInclude: ['range'] }, hints: ['<code>range(1, 6)</code> 1-ден 5-ке дейін береді.'] }
      ]
    },
    {
      id: 'py-8', title: 'while, break, continue', minutes: 9,
      body: `
<p><code>while</code> шарт ақиқат болғанша қайталайды. Қанша рет қайталанатыны алдын ала белгісіз болғанда қолданылады:</p>
<pre><code>balance = 100000
months = 0
while balance &lt; 150000:
    balance = balance * 1.05
    months += 1
print(months)   # 9</code></pre>
<p><code>break</code> — циклді бірден тоқтатады. <code>continue</code> — қалған бөлігін өткізіп, келесі айналымға өтеді.</p>
<div class="tip">Шарт ешқашан жалған болмаса, цикл шексіз жүреді. Бұл платформада 8 секундтан кейін код тоқтатылады.</div>`,
      exercises: [
        { type: 'python', xp: 15, prompt: 'Компанияның пайдаланушылары 1 000. Ол ай сайын 20%-ға өседі. Пайдаланушылар саны 10 000-нан асуы үшін қанша ай керек? Айлар санын шығарыңыз.', starter: 'users = 1000\nmonths = 0\n', solution: 'users = 1000\nmonths = 0\nwhile users <= 10000:\n    users = users * 1.2\n    months += 1\nprint(months)', check: { mustInclude: ['while'] }, hints: ['Шарт: <code>while users <= 10000:</code>', 'Цикл ішінде <code>users</code> мен <code>months</code> екеуін де өзгертіңіз.'] },
        { type: 'python', xp: 15, prompt: 'Тізімде бірінші теріс санды тауып шығарып, циклді <code>break</code> арқылы тоқтатыңыз.', starter: 'values = [12, 7, 0, -3, 5, -8]\n', solution: 'values = [12, 7, 0, -3, 5, -8]\nfor v in values:\n    if v < 0:\n        print(v)\n        break', check: { mustInclude: ['break'] }, hints: [] }
      ]
    },
    {
      id: 'py-9', title: 'Функциялар', minutes: 13,
      body: `
<p><b>Функция</b> — атауы бар, қайта қолданылатын код бөлігі. Ол <code>def</code> арқылы анықталады, <code>return</code> нәтижені қайтарады:</p>
<pre><code>def growth_pct(old, new):
    return (new - old) / old * 100

print(growth_pct(80, 100))   # 25.0</code></pre>
<h3>Әдепкі мән</h3>
<pre><code>def with_vat(price, rate=0.12):
    return price * (1 + rate)

with_vat(1000)          # 1120.0
with_vat(1000, 0.2)     # 1200.0</code></pre>
<p><code>print</code> мен <code>return</code> әртүрлі: print тек экранға шығарады, ал return мәнді кейін қолдануға болатындай қайтарады. Тексеру тесттері функцияның <b>қайтарған</b> мәнін тексереді.</p>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>conversion(visitors, buyers)</code> функциясын жазыңыз: ол конверсияны пайызбен, 2 белгіге дөңгелектеп қайтарсын. <code>visitors</code> 0 болса, 0 қайтарсын.', starter: 'def conversion(visitors, buyers):\n    pass\n', solution: 'def conversion(visitors, buyers):\n    if visitors == 0:\n        return 0\n    return round(buyers / visitors * 100, 2)', check: { tests: 'assert conversion(400, 60) == 15.0, "conversion(400, 60) 15.0 болуы керек"\nassert conversion(1840, 46) == 2.5, "conversion(1840, 46) 2.5 болуы керек"\nassert conversion(0, 0) == 0, "visitors 0 болса, 0 қайтару керек"' }, hints: ['Алдымен <code>if visitors == 0: return 0</code>.', '<code>return round(buyers / visitors * 100, 2)</code>'] },
        { type: 'python', xp: 20, prompt: '<code>segment(price)</code> функциясы: 100 000 және жоғары — <code>"қымбат"</code>, 10 000 және жоғары — <code>"орташа"</code>, әйтпесе <code>"арзан"</code> қайтарсын.', starter: 'def segment(price):\n    pass\n', solution: 'def segment(price):\n    if price >= 100000:\n        return "қымбат"\n    elif price >= 10000:\n        return "орташа"\n    return "арзан"', check: { tests: 'assert segment(350000) == "қымбат", "350000 → қымбат"\nassert segment(100000) == "қымбат", "100000 → қымбат (шекара)"\nassert segment(25000) == "орташа", "25000 → орташа"\nassert segment(9999) == "арзан", "9999 → арзан"' }, hints: ['SQL сабағындағы CASE WHEN-ді еске түсіріңіз.'] }
      ]
    },
    {
      id: 'py-10', title: 'Сөздіктер (dict)', minutes: 12,
      body: `
<p><b>Сөздік</b> — «кілт: мән» жұптары. Бір жазбаны (мысалы бір клиентті) сипаттауға ыңғайлы:</p>
<pre><code>customer = {"name": "Айгерім", "city": "Алматы", "orders": 3}
print(customer["city"])          # Алматы
customer["orders"] += 1
customer["vip"] = True
print(customer.get("phone", "жоқ"))   # кілт жоқ болса, әдепкі мән</code></pre>
<h3>Сөздікпен санау</h3>
<p>Ең пайдалы үлгі — категориялар бойынша санау (SQL-дегі GROUP BY + COUNT):</p>
<pre><code>cities = ["Алматы", "Астана", "Алматы", "Шымкент", "Алматы"]
counts = {}
for c in cities:
    counts[c] = counts.get(c, 0) + 1
print(counts)   # {'Алматы': 3, 'Астана': 2 ...}</code></pre>
<p>Кілттер мен мәндерді аралау: <code>for key, value in counts.items():</code></p>`,
      exercises: [
        { type: 'python', xp: 20, prompt: 'Тапсырыс статустарын сөздік арқылы санап, <code>counts</code> айнымалысына жазыңыз және шығарыңыз.', starter: 'statuses = ["delivered", "shipped", "delivered", "cancelled", "delivered", "shipped"]\ncounts = {}\n', solution: 'statuses = ["delivered", "shipped", "delivered", "cancelled", "delivered", "shipped"]\ncounts = {}\nfor s in statuses:\n    counts[s] = counts.get(s, 0) + 1\nprint(counts)', check: { tests: 'assert counts == {"delivered": 3, "shipped": 2, "cancelled": 1}, "counts сөздігі дұрыс емес: " + str(counts)', stdout: true }, hints: ['<code>counts[s] = counts.get(s, 0) + 1</code>'] },
        { type: 'python', xp: 20, prompt: 'Тауарлар бағасы сөздікте берілген. Бағасы 10 000-нан жоғары тауарлардың атауын <code>атауы: баға</code> форматында шығарыңыз (сөздіктегі ретпен).', starter: 'prices = {"Ноутбук": 350000, "Блокнот": 1200, "Рюкзак": 15000, "Термос": 9000}\n', solution: 'prices = {"Ноутбук": 350000, "Блокнот": 1200, "Рюкзак": 15000, "Термос": 9000}\nfor name, price in prices.items():\n    if price > 10000:\n        print(f"{name}: {price}")', check: { mustInclude: ['.items()'] }, hints: ['<code>for name, price in prices.items():</code>'] }
      ]
    },
    {
      id: 'py-11', title: 'List comprehension', minutes: 10,
      body: `
<p>Тізімнен жаңа тізім жасаудың қысқа жазуы:</p>
<pre><code>prices = [6500, 7200, 15000, 1200]

# цикл арқылы
with_vat = []
for p in prices:
    with_vat.append(p * 1.12)

# comprehension арқылы
with_vat = [p * 1.12 for p in prices]

# сүзгімен
expensive = [p for p in prices if p &gt; 7000]</code></pre>
<p>Үлгі: <code>[өрнек for элемент in тізім if шарт]</code>. Сөздікке де бар: <code>{k: v for k, v in d.items() if v &gt; 0}</code>.</p>
<div class="tip">pandas-та мұндай операциялар бағандармен бірден жасалады, бірақ comprehension Python-ның «тілін» түсінуге көмектеседі.</div>`,
      exercises: [
        { type: 'python', xp: 15, prompt: 'Comprehension арқылы <code>names</code> тізіміндегі атауларды бос орынсыз және бас әріппен (<code>.strip().title()</code>) жазып, <code>clean</code> тізімін жасаңыз. Шығарыңыз.', starter: 'names = ["  айгерім", "НҰРЛАН ", " дана "]\n', solution: 'names = ["  айгерім", "НҰРЛАН ", " дана "]\nclean = [n.strip().title() for n in names]\nprint(clean)', check: { tests: 'assert clean == ["Айгерім", "Нұрлан", "Дана"], "clean тізімі: " + str(clean)', stdout: true, mustInclude: [' for '] }, hints: ['<code>[n.strip().title() for n in names]</code>'] },
        { type: 'python', xp: 15, prompt: 'Тек 2024 жылғы қарашадағы күндерді (<code>"2024-11"</code> басталатындар) comprehension арқылы <code>nov</code> тізіміне жинап, санын шығарыңыз.', starter: 'dates = ["2024-10-28", "2024-11-04", "2024-11-09", "2024-11-21", "2024-12-01"]\n', solution: 'dates = ["2024-10-28", "2024-11-04", "2024-11-09", "2024-11-21", "2024-12-01"]\nnov = [d for d in dates if d.startswith("2024-11")]\nprint(len(nov))', check: { tests: 'assert nov == ["2024-11-04", "2024-11-09", "2024-11-21"], "nov тізімі дұрыс емес"', stdout: true }, hints: ['<code>d.startswith("2024-11")</code>'] }
      ]
    },
    {
      id: 'py-12', title: 'Қателер және try/except', minutes: 11,
      body: `
<p>Нақты дерек «лас» келеді: санның орнында мәтін, бос жол. Қате (exception) бағдарламаны тоқтатады. Қатені оқи білу — маңызды дағды:</p>
<pre><code>int("12a")
# ValueError: invalid literal for int() with base 10: '12a'</code></pre>
<p>Соңғы жол қатенің <b>түрін</b> (ValueError) және <b>себебін</b> айтады. Жиі кездесетіндер: <code>NameError</code> (айнымалы жоқ), <code>TypeError</code> (тип сәйкес емес: <code>"5" + 1</code>), <code>KeyError</code> (сөздікте кілт жоқ), <code>ZeroDivisionError</code>, <code>IndentationError</code>.</p>
<h3>try / except</h3>
<pre><code>raw = ["120", "95", "n/a", "140"]
values = []
for r in raw:
    try:
        values.append(int(r))
    except ValueError:
        print("Өткізілді:", r)
print(sum(values))   # 355</code></pre>
<div class="tip">Барлық қатені <code>except:</code> деп жасыруға болмайды. Нақты қате түрін жазыңыз, әйтпесе нағыз қатені байқамай қаласыз.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>raw</code> тізімінен тек санға айналатын мәндерді <code>float</code> қылып <code>values</code>-қа жинаңыз (<code>try/except ValueError</code>). Соңында олардың қосындысын шығарыңыз.', starter: 'raw = ["12.5", "abc", "7", "", "30.5", "N/A"]\nvalues = []\n', solution: 'raw = ["12.5", "abc", "7", "", "30.5", "N/A"]\nvalues = []\nfor r in raw:\n    try:\n        values.append(float(r))\n    except ValueError:\n        pass\nprint(sum(values))', check: { tests: 'assert values == [12.5, 7.0, 30.5], "values: " + str(values)', stdout: true, mustInclude: ['except'] }, hints: ['<code>except ValueError:</code> ішінде <code>pass</code> жазуға болады.'] },
        { type: 'python', xp: 15, prompt: 'Бұл код қате береді. Түзетіп, <code>Барлығы: 15</code> шығатындай етіңіз.', starter: 'count = "10"\nextra = 5\nprint("Барлығы: " + (count + extra))\n', solution: 'count = "10"\nextra = 5\nprint("Барлығы: " + str(int(count) + extra))', hints: ['<code>count</code> мәтін: оны алдымен <code>int()</code> қылыңыз.', 'Нәтижені мәтінге қосу үшін <code>str()</code> керек, немесе f-string.'] }
      ]
    },
    {
      id: 'py-13', title: 'Мини жоба: дүкен сатылымын талдау', minutes: 20,
      body: `
<p>Енді үйренгеннің бәрін бір талдауға біріктірейік. Дүкеннің сатылымы CSV мәтін түрінде берілген. Python-ның <code>csv</code> модулі оны сөздіктер тізіміне айналдырады:</p>
<pre><code>import csv, io
rows = list(csv.DictReader(io.StringIO(data)))
print(rows[0])   # {'date': '2024-09-01', 'city': 'Алматы', ...}</code></pre>
<p>Ескеріңіз: CSV-дан оқылған барлық мән — <b>мәтін</b>. Сандарды <code>int()</code> арқылы түрлендіру керек.</p>
<h3>Тапсырмалар</h3>
<ol>
<li>Жалпы табыс (<code>qty × price</code>).</li>
<li>Қалалар бойынша табыс (сөздік).</li>
<li>Ең көп табыс әкелген қала.</li>
</ol>
<p>Бұл — SQL-дағы <code>SUM</code>, <code>GROUP BY</code> және <code>ORDER BY ... LIMIT 1</code>-дің Python нұсқасы. Келесі модульде pandas мұны бір-екі жолмен жасайды.</p>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>total_revenue(rows)</code> функциясын жазыңыз: барлық жолдар бойынша <code>qty × price</code> қосындысын (int) қайтарсын.', starter: 'import csv, io\ndata = """date,city,product,qty,price\n2024-09-01,Алматы,Рюкзак,2,15000\n2024-09-01,Астана,Термос,1,9000\n2024-09-02,Алматы,Блокнот,10,1200\n2024-09-03,Шымкент,Рюкзак,1,15000\n2024-09-03,Астана,Монитор,1,95000\n2024-09-04,Алматы,Термос,3,9000\n"""\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef total_revenue(rows):\n    pass\n\nprint(total_revenue(rows))\n', solution: 'import csv, io\ndata = """date,city,product,qty,price\n2024-09-01,Алматы,Рюкзак,2,15000\n2024-09-01,Астана,Термос,1,9000\n2024-09-02,Алматы,Блокнот,10,1200\n2024-09-03,Шымкент,Рюкзак,1,15000\n2024-09-03,Астана,Монитор,1,95000\n2024-09-04,Алматы,Термос,3,9000\n"""\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef total_revenue(rows):\n    total = 0\n    for r in rows:\n        total += int(r["qty"]) * int(r["price"])\n    return total\n\nprint(total_revenue(rows))', check: { tests: 'assert total_revenue(rows) == 188000, "Жалпы табыс 188000 болуы керек, сізде: " + str(total_revenue(rows))\nassert total_revenue([]) == 0, "Бос тізім үшін 0 қайтарыңыз"' }, hints: ['Мәтінді санға айналдырыңыз: <code>int(r["qty"])</code>.'] },
        { type: 'python', xp: 30, prompt: '<code>revenue_by_city(rows)</code> функциясы қала → табыс сөздігін қайтарсын. Сосын <code>best_city(rows)</code> ең көп табысты қаланың атауын қайтарсын.', starter: 'import csv, io\ndata = """date,city,product,qty,price\n2024-09-01,Алматы,Рюкзак,2,15000\n2024-09-01,Астана,Термос,1,9000\n2024-09-02,Алматы,Блокнот,10,1200\n2024-09-03,Шымкент,Рюкзак,1,15000\n2024-09-03,Астана,Монитор,1,95000\n2024-09-04,Алматы,Термос,3,9000\n"""\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef revenue_by_city(rows):\n    pass\n\ndef best_city(rows):\n    pass\n\nprint(revenue_by_city(rows))\nprint(best_city(rows))\n', solution: 'import csv, io\ndata = """date,city,product,qty,price\n2024-09-01,Алматы,Рюкзак,2,15000\n2024-09-01,Астана,Термос,1,9000\n2024-09-02,Алматы,Блокнот,10,1200\n2024-09-03,Шымкент,Рюкзак,1,15000\n2024-09-03,Астана,Монитор,1,95000\n2024-09-04,Алматы,Термос,3,9000\n"""\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef revenue_by_city(rows):\n    out = {}\n    for r in rows:\n        out[r["city"]] = out.get(r["city"], 0) + int(r["qty"]) * int(r["price"])\n    return out\n\ndef best_city(rows):\n    rev = revenue_by_city(rows)\n    return max(rev, key=rev.get)\n\nprint(revenue_by_city(rows))\nprint(best_city(rows))', check: { tests: 'r = revenue_by_city(rows)\nassert r == {"Алматы": 69000, "Астана": 104000, "Шымкент": 15000}, "revenue_by_city: " + str(r)\nassert best_city(rows) == "Астана", "best_city Астана болуы керек"' }, hints: ['Сөздікпен санау сабағындағы <code>.get(key, 0)</code> үлгісін қолданыңыз.', 'Ең үлкен мәнді кілт: <code>max(rev, key=rev.get)</code>.'] }
      ]
    },
    {
      id: 'py-gate', gate: true, title: 'Модуль емтиханы: Python Fundamentals', minutes: 25,
      body: `
<p>Қорытынды тексеріс: кеңессіз үш тапсырма. Барлығын өтсеңіз, <b>L3 Python for Data</b> деңгейіне бір қадам қаласыз (келесісі — pandas).</p>
<div class="tip">Функцияның <b>қайтаратын</b> мәні тексеріледі. print міндетті емес.</div>`,
      exercises: [
        { type: 'python', xp: 30, prompt: '<code>median(xs)</code> функциясын жазыңыз (statistics модулінсіз): сандар тізімінің медианасын қайтарсын. Жұп ұзындықта ортаңғы екі мәннің орташасы.', starter: 'def median(xs):\n    pass\n', solution: 'def median(xs):\n    s = sorted(xs)\n    n = len(s)\n    mid = n // 2\n    if n % 2 == 1:\n        return s[mid]\n    return (s[mid - 1] + s[mid]) / 2', check: { tests: 'assert median([7, 1, 9, 3, 100]) == 7, "median([7,1,9,3,100]) = 7"\nassert median([2, 8, 4, 6]) == 5, "median([2,8,4,6]) = 5"\nassert median([5]) == 5, "Бір элемент: сол элемент"\nimport random\nxs = [3, 1, 2]\nmedian(xs)\nassert xs == [3, 1, 2], "Функция берілген тізімді өзгертпеуі керек: sorted() қолданыңыз"' }, hints: [] },
        { type: 'python', xp: 30, prompt: '<code>clean_phones(raw)</code>: тізімдегі телефон нөмірлерінен тек цифрларды қалдырып, 11 цифрлы және 7-ден басталатындарын ғана қайтарсын (ретін сақтап).', starter: 'def clean_phones(raw):\n    pass\n\nprint(clean_phones(["+7 (701) 123-45-67", "8 702 000 11 22", "77015556677", "12345"]))\n', solution: 'def clean_phones(raw):\n    out = []\n    for r in raw:\n        digits = "".join(ch for ch in r if ch.isdigit())\n        if len(digits) == 11 and digits.startswith("7"):\n            out.append(digits)\n    return out', check: { tests: 'assert clean_phones(["+7 (701) 123-45-67", "8 702 000 11 22", "77015556677", "12345"]) == ["77011234567", "77015556677"], "Нәтиже: " + str(clean_phones(["+7 (701) 123-45-67", "8 702 000 11 22", "77015556677", "12345"]))\nassert clean_phones([]) == [], "Бос тізім"' }, hints: [] },
        { type: 'python', xp: 30, prompt: '<code>top_products(orders, n)</code>: <code>orders</code> — <code>(product, qty)</code> кортеждерінің тізімі. Әр тауардың жалпы санын есептеп, ең көп сатылған <code>n</code> тауардың атауын кему ретімен тізім ретінде қайтарсын.', starter: 'def top_products(orders, n):\n    pass\n\norders = [("Термос", 2), ("Блокнот", 10), ("Рюкзак", 1), ("Термос", 3), ("Рюкзак", 2), ("Құлаққап", 4)]\nprint(top_products(orders, 2))\n', solution: 'def top_products(orders, n):\n    totals = {}\n    for product, qty in orders:\n        totals[product] = totals.get(product, 0) + qty\n    ranked = sorted(totals, key=totals.get, reverse=True)\n    return ranked[:n]', check: { tests: 'orders = [("Термос", 2), ("Блокнот", 10), ("Рюкзак", 1), ("Термос", 3), ("Рюкзак", 2), ("Құлаққап", 4)]\nassert top_products(orders, 2) == ["Блокнот", "Термос"], "top 2: " + str(top_products(orders, 2))\nassert top_products(orders, 1) == ["Блокнот"], "top 1 қате"\nassert top_products([], 3) == [], "Бос тізім"' }, hints: [] }
      ]
    }
  ]
};
