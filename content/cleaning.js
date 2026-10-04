// M3.2 Cleaning & EDA. Dataset: raw (raw_customers, raw_orders). Python uses the standard library (csv, io, datetime, statistics).
DJ.modules['m3-2'] = {
  intro: 'Нақты дерек ешқашан таза келмейді: бос орындар, қайталанған клиенттер, «Алматы» мен «Almaty», мәтін түріндегі сандар. Аналитик уақытының үлкен бөлігі осыған кетеді. Бұл модульде <code>raw</code> дерекқорын SQL-мен және Python-мен тазалап, сосын EDA жасайсыз.',
  lessons: [
    {
      id: 'cl-1', title: 'Data profiling: деректі алғаш тексеру', minutes: 10,
      body: `
<p>Талдауды бастамас бұрын деректің «денсаулығын» тексереміз. Бұл <b>profiling</b> деп аталады. Әр кесте үшін бес сұрақ:</p>
<ol>
<li>Неше жол бар? Күткен санмен сәйкес пе?</li>
<li>Әр бағанда неше бос мән (<code>NULL</code>) бар?</li>
<li>Неше бірегей мән бар? Бірегей болуы керек баған (email, id) шынымен бірегей ме?</li>
<li>Мәндер ауқымы қисынды ма? Теріс баға, 150 жастағы клиент жоқ па?</li>
<li>Категориялық бағандарда қандай мәндер бар? Бір қала бірнеше түрлі жазылмаған ба?</li>
</ol>
<pre><code>SELECT COUNT(*) AS n,
  SUM(email IS NULL) AS null_email,
  COUNT(DISTINCT email) AS uniq_email
FROM raw_customers;</code></pre>
<p>SQLite-та <code>email IS NULL</code> 1 немесе 0 береді, сондықтан <code>SUM</code> бос мәндерді санайды.</p>`,
      exercises: [
        { type: 'sql', dataset: 'raw', xp: 15, prompt: '<code>raw_customers</code> үшін бір жолда шығарыңыз: <code>n</code> (жол саны), <code>null_email</code>, <code>null_city</code>, <code>null_phone</code>.', starter: '', solution: 'SELECT COUNT(*) AS n, SUM(email IS NULL) AS null_email, SUM(city IS NULL) AS null_city, SUM(phone IS NULL) AS null_phone FROM raw_customers;', check: { ordered: true }, hints: ['<code>SUM(city IS NULL)</code>'] },
        { type: 'sql', dataset: 'raw', xp: 15, prompt: '<code>city</code> бағанының барлық мәндерін және әрқайсысының санын (<code>n</code>) шығарыңыз. Нәтижеге қарап, қаланың неше түрлі жазылғанын көріңіз.', starter: '', solution: 'SELECT city, COUNT(*) AS n FROM raw_customers GROUP BY city;', hints: ['<code>GROUP BY city</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Алдыңғы сұрау нәтижесінде «Алматы», «алматы», «Алматы␣» (соңында бос орын) және «Almaty» шықты. Бұл не туралы айтады?', options: ['Төрт түрлі қала бар', 'Бір қала төрт түрлі жазылған: GROUP BY алдында мәтінді стандарттау керек', 'SQL қатесі', 'Бұл қалыпты, ештеңе істемейміз'], answer: 1, explain: 'Тазаламасақ, Алматының сатылымы төрт бөлікке бөлініп, қате қорытынды береді.' }
      ]
    },
    {
      id: 'cl-2', title: 'Бос мәндер (missing values)', minutes: 12,
      body: `
<p>Бос мәнмен не істеу керек? Жауап — <b>неге бос екеніне</b> байланысты.</p>
<table>
<tr><th>Тәсіл</th><th>Қашан</th><th>Қаупі</th></tr>
<tr><td>Жолды алып тастау</td><td>Бос жолдар аз және кездейсоқ</td><td>Бос мәндер бір топта жиі болса, нәтиже ығысады</td></tr>
<tr><td>Толтыру (impute): медиана, мода, «Белгісіз»</td><td>Жолды сақтау маңызды</td><td>Шашыраңқылықты жасанды түрде азайтады</td></tr>
<tr><td>Белгі қою (flag)</td><td>Бостың өзі ақпарат беруі мүмкін</td><td>Қосымша баған</td></tr>
</table>
<p>SQL-де бос мәнді <code>COALESCE</code> ауыстырады: ол тізімдегі бірінші бос емес мәнді береді.</p>
<pre><code>SELECT name, COALESCE(phone, 'жоқ') AS phone FROM raw_customers;</code></pre>
<div class="tip">Сандық бағанды толтырғанда орташадан гөрі медиана қауіпсіз: шеткі мәндер оны бұрмаламайды.</div>`,
      exercises: [
        { type: 'sql', dataset: 'raw', xp: 15, prompt: 'Әр клиенттің <code>id</code>, <code>name</code> және <code>city</code> бағанын шығарыңыз. Қаласы бос болса, <code>Белгісіз</code> деп жазылсын.', starter: '', solution: "SELECT id, name, COALESCE(city, 'Белгісіз') AS city FROM raw_customers;", check: { mustInclude: ['COALESCE'] }, hints: ["<code>COALESCE(city, 'Белгісіз')</code>"] },
        { type: 'python', xp: 20, prompt: '<code>fill_median(xs)</code> функциясын жазыңыз: тізімдегі <code>None</code> мәндерін қалған мәндердің медианасымен ауыстырған <b>жаңа</b> тізім қайтарсын.', starter: 'import statistics\n\ndef fill_median(xs):\n    pass\n', solution: 'import statistics\n\ndef fill_median(xs):\n    med = statistics.median([x for x in xs if x is not None])\n    return [med if x is None else x for x in xs]', check: { tests: '_src = [10, None, 30, 20, None]\n_r = fill_median(_src)\nassert _r == [10, 20, 30, 20, 20], "fill_median([10, None, 30, 20, None]) = [10, 20, 30, 20, 20] болуы керек"\nassert _src == [10, None, 30, 20, None], "Бастапқы тізімді өзгертпеңіз: жаңа тізім қайтарыңыз"\nassert fill_median([1, 2, 3]) == [1, 2, 3], "Бос мән жоқ тізім өзгермеуі керек"' }, hints: ['Алдымен <code>None</code> емес мәндердің медианасын табыңыз.', '<code>[med if x is None else x for x in xs]</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Сауалнамада «табыс» сұрағына табысы жоғары адамдар жиі жауап бермеген. Бос жолдарды жай алып тастасақ не болады?', options: ['Ештеңе өзгермейді', 'Орташа табыс шынайыдан төмен шығады', 'Орташа табыс жоғарылайды', 'Медиана өзгермейді'], answer: 1, explain: 'Бос мәндер кездейсоқ емес: табысы жоғарылар жоғалады, сондықтан нәтиже төмен ығысады.' }
      ]
    },
    {
      id: 'cl-3', title: 'Мәтінді стандарттау', minutes: 14,
      body: `
<p>Мәтін бағандарындағы ең жиі мәселелер: артық бос орын, әріп регистрі, бір мәннің әртүрлі жазылуы.</p>
<pre><code>SELECT TRIM(name) AS name,          -- басы мен соңындағы бос орын
       LOWER(email) AS email,       -- email регистрге тәуелсіз
       REPLACE(phone, ' ', '') AS phone
FROM raw_customers;</code></pre>
<h3>Мәндерді бір түрге келтіру</h3>
<p>Бір қаланың нұсқаларын <code>CASE</code> арқылы біріктіреміз:</p>
<pre><code>CASE WHEN TRIM(city) IN ('Алматы', 'алматы', 'Almaty') THEN 'Алматы'
     ELSE TRIM(city) END</code></pre>
<div class="tip">SQLite-тың <code>LOWER</code> функциясы тек латын әріптерімен жұмыс істейді: «АЛМАТЫ» өзгермейді. Кириллица мәтінін Python-да (<code>str.lower()</code>) немесе PostgreSQL-де өңдеген сенімді.</div>
<h3>Python-да</h3>
<pre><code>import re
digits = re.sub(r"\\D", "", "8 (701) 333-44-55")   # '87013334455'</code></pre>
<p><code>\\D</code> — «сан емес кез келген таңба». Осылай телефоннан тек сандарды қалдырамыз.</p>`,
      exercises: [
        { type: 'sql', dataset: 'raw', xp: 15, prompt: 'Email-і бар клиенттердің <code>id</code>, бос орынсыз <code>name</code> және кіші әріппен <code>email</code> бағандарын шығарыңыз.', starter: '', solution: 'SELECT id, TRIM(name) AS name, LOWER(email) AS email FROM raw_customers WHERE email IS NOT NULL;', check: { mustInclude: ['TRIM', 'LOWER'] }, hints: ['<code>TRIM(name)</code>, <code>LOWER(email)</code>, <code>WHERE email IS NOT NULL</code>'] },
        { type: 'sql', dataset: 'raw', xp: 20, prompt: 'Әр клиенттің <code>id</code> және тазаланған <code>city_clean</code> бағанын шығарыңыз: Алматы нұсқалары (<code>Алматы</code>, <code>алматы</code>, <code>Almaty</code>) → <code>Алматы</code>, Астана нұсқалары (<code>Астана</code>, <code>Astana</code>) → <code>Астана</code>, қалғаны <code>TRIM</code> жасалған күйі.', starter: "SELECT id,\n  CASE\n  END AS city_clean\nFROM raw_customers;", solution: "SELECT id, CASE WHEN TRIM(city) IN ('Алматы', 'алматы', 'Almaty') THEN 'Алматы' WHEN TRIM(city) IN ('Астана', 'Astana') THEN 'Астана' ELSE TRIM(city) END AS city_clean FROM raw_customers;", check: { mustInclude: ['CASE'] }, hints: ['Салыстыру алдында <code>TRIM(city)</code>: «Алматы␣» де ұсталады.'] },
        { type: 'python', xp: 25, prompt: '<code>clean_phone(p)</code> функциясын жазыңыз: телефоннан тек сандарды қалдырып, басындағы <code>8</code>-ді <code>7</code>-ге ауыстырып, <code>+7XXXXXXXXXX</code> форматында қайтарсын. <code>None</code> берілсе, <code>None</code> қайтарсын.', starter: 'import re\n\ndef clean_phone(p):\n    pass\n', solution: 'import re\n\ndef clean_phone(p):\n    if p is None:\n        return None\n    d = re.sub(r"\\D", "", p)\n    if d.startswith("8"):\n        d = "7" + d[1:]\n    return "+" + d', check: { tests: 'assert clean_phone("8 (701) 333-44-55") == "+77013334455", "8 (701) 333-44-55 → +77013334455"\nassert clean_phone("+7 701 111 2233") == "+77011112233", "+7 701 111 2233 → +77011112233"\nassert clean_phone("87012223344") == "+77012223344", "87012223344 → +77012223344"\nassert clean_phone(None) is None, "None → None"' }, hints: ['<code>re.sub(r"\\D", "", p)</code> тек сандарды қалдырады.', '<code>if d.startswith("8"): d = "7" + d[1:]</code>'] }
      ]
    },
    {
      id: 'cl-4', title: 'Дубликаттар', minutes: 12,
      body: `
<p>Бір клиент екі рет тіркелуі мүмкін: бірде <code>NURLAN@mail.kz</code>, бірде <code>nurlan@mail.kz</code>. Дубликаттар клиенттер санын көбейтіп, конверсияны азайтып көрсетеді.</p>
<h3>1. Табу</h3>
<pre><code>SELECT LOWER(email) AS email, COUNT(*) AS n
FROM raw_customers
WHERE email IS NOT NULL
GROUP BY LOWER(email)
HAVING COUNT(*) > 1;</code></pre>
<h3>2. Біреуін қалдыру</h3>
<p>Advanced SQL-дегі <code>ROW_NUMBER</code> үлгісі: әр топта бірінші жазбаны (мысалы, ең кіші <code>id</code>) қалдырамыз.</p>
<pre><code>ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY id) AS rn
... WHERE rn = 1</code></pre>
<div class="tip">Қай жазбаны қалдыру — бизнес шешімі: ең ескісін бе, ең толығын ба, ең соңғы жаңартылғанын ба? Оны жазып қойыңыз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'raw', xp: 15, prompt: 'Қайталанған email-дерді (регистрге қарамай) және олардың санын шығарыңыз: <code>email</code> (кіші әріппен), <code>n</code>.', starter: '', solution: 'SELECT LOWER(email) AS email, COUNT(*) AS n FROM raw_customers WHERE email IS NOT NULL GROUP BY LOWER(email) HAVING COUNT(*) > 1;', check: { mustInclude: ['HAVING'] }, hints: ['Сабақтағы 1-қадам.'] },
        { type: 'sql', dataset: 'raw', xp: 25, prompt: 'Әр email үшін ең кіші <code>id</code>-ге ие бір жазбаны қалдырыңыз. Email-і бар клиенттердің <code>id</code> мен кіші әріптегі <code>email</code>-ін шығарыңыз.', starter: '', solution: 'SELECT id, LOWER(email) AS email FROM (SELECT id, email, ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY id) AS rn FROM raw_customers WHERE email IS NOT NULL) WHERE rn = 1;', check: { mustInclude: ['ROW_NUMBER'] }, hints: ['Subquery ішінде <code>ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY id) AS rn</code>, сыртында <code>WHERE rn = 1</code>.'] }
      ]
    },
    {
      id: 'cl-5', title: 'Деректер типтері: сандар мен күндер', minutes: 14,
      body: `
<p><code>raw_orders.amount</code> бағаны мәтін: <code>'12 500'</code>, <code>'-500'</code>, тіпті <code>'abc'</code>. Мәтінмен есептеу мүмкін емес, сондықтан оны санға айналдыру (<b>cast</b>) керек.</p>
<pre><code>CAST(REPLACE(amount, ' ', '') AS INTEGER)</code></pre>
<div class="tip">Абай болыңыз: SQLite-та <code>CAST('abc' AS INTEGER)</code> қате бермейді, <b>0</b> қайтарады. PostgreSQL қате береді. Сондықтан cast-тан кейін нәтижені әрқашан тексеріңіз.</div>
<h3>Күндер</h3>
<p><code>signup</code> бағанында үш формат бар: <code>2024-01-15</code>, <code>15.02.2024</code>, <code>2024/03/28</code>. Стандарт формат — <b>ISO 8601</b> (<code>YYYY-MM-DD</code>): ол мәтін ретінде де дұрыс сұрыпталады. Python-да:</p>
<pre><code>from datetime import datetime
datetime.strptime("15.02.2024", "%d.%m.%Y").strftime("%Y-%m-%d")   # '2024-02-15'</code></pre>
<p>Бірнеше форматты кезекпен «байқап көреміз»: біреуі сәйкес келмесе, <code>ValueError</code> шығады да, келесісіне өтеміз.</p>`,
      exercises: [
        { type: 'sql', dataset: 'raw', xp: 15, prompt: '<code>raw_orders</code> кестесінен <code>id</code> және санға айналдырылған <code>amount_num</code> бағанын шығарыңыз (бос орындарды алып тастап, <code>INTEGER</code>-ге).', starter: '', solution: "SELECT id, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders;", check: { mustInclude: ['CAST'] }, hints: ["<code>CAST(REPLACE(amount, ' ', '') AS INTEGER)</code>"] },
        { type: 'python', xp: 25, prompt: '<code>parse_date(s)</code> функциясын жазыңыз: <code>YYYY-MM-DD</code>, <code>DD.MM.YYYY</code>, <code>YYYY/MM/DD</code> форматтарын <code>YYYY-MM-DD</code> мәтініне айналдырсын. Танылмаса, <code>None</code> қайтарсын.', starter: 'from datetime import datetime\n\ndef parse_date(s):\n    pass\n', solution: 'from datetime import datetime\n\ndef parse_date(s):\n    for fmt in ("%Y-%m-%d", "%d.%m.%Y", "%Y/%m/%d"):\n        try:\n            return datetime.strptime(s, fmt).strftime("%Y-%m-%d")\n        except ValueError:\n            pass\n    return None', check: { tests: 'assert parse_date("2024-01-15") == "2024-01-15", "ISO форматы өзгермеуі керек"\nassert parse_date("15.02.2024") == "2024-02-15", "15.02.2024 → 2024-02-15"\nassert parse_date("2024/03/28") == "2024-03-28", "2024/03/28 → 2024-03-28"\nassert parse_date("кеше") is None, "Танылмаған мәтін → None"' }, hints: ['Форматтар тізімін <code>for</code> циклімен айналып, <code>try/except ValueError</code> қолданыңыз.'] },
        { type: 'quiz', xp: 10, prompt: 'SQLite-та <code>CAST(\'abc\' AS INTEGER)</code> нәтижесі қандай?', options: ['Қате', 'NULL', '0', "'abc'"], answer: 2, explain: 'SQLite санға айналмайтын мәтінді 0 деп алады. Бұл «үнсіз» қате, сондықтан тексеру керек.' }
      ]
    },
    {
      id: 'cl-6', title: 'Қате және күдікті мәндер', minutes: 11,
      body: `
<p>Тип дұрыс болса да, мән мағынасыз болуы мүмкін: теріс сома, болашақтағы тапсырыс күні, 990 000 ₸-лік термос. Мұндай мәндерді <b>ереже</b> арқылы белгілейміз:</p>
<table>
<tr><th>Ереже</th><th>Белгі</th></tr>
<tr><td>Мән жоқ</td><td><code>жоқ</code></td></tr>
<tr><td>Сома ≤ 0 (оның ішінде <code>'abc'</code> → 0)</td><td><code>қате</code></td></tr>
<tr><td>Сома әдеттегіден тым үлкен</td><td><code>күдікті</code></td></tr>
<tr><td>Қалғаны</td><td><code>ok</code></td></tr>
</table>
<p>Мәндерді бірден өшірмейміз: алдымен белгі қойып, саны мен себебін бизнеспен талқылаймыз. «Күдікті» мән нақты ірі тапсырыс болуы мүмкін.</p>`,
      exercises: [
        { type: 'sql', dataset: 'raw', xp: 25, prompt: 'Әр тапсырыстың <code>id</code>, <code>amount_num</code> және <code>flag</code> бағанын шығарыңыз. Ережелер: <code>amount</code> NULL → <code>жоқ</code>; amount_num ≤ 0 → <code>қате</code>; amount_num &gt; 500000 → <code>күдікті</code>; әйтпесе <code>ok</code>. CTE қолданыңыз.', starter: "WITH o AS (\n  SELECT id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num\n  FROM raw_orders\n)\nSELECT ", solution: "WITH o AS (SELECT id, amount, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders) SELECT id, amount_num, CASE WHEN amount IS NULL THEN 'жоқ' WHEN amount_num <= 0 THEN 'қате' WHEN amount_num > 500000 THEN 'күдікті' ELSE 'ok' END AS flag FROM o;", check: { mustInclude: ['CASE'] }, hints: ['CASE шарттарының реті маңызды: алдымен NULL тексеріңіз.'] },
        { type: 'quiz', xp: 10, prompt: '«Күдікті» деп белгіленген 990 000 ₸-лік тапсырыспен ең дұрыс әрекет қайсы?', options: ['Бірден өшіру', 'Еш нәрсе істемеу', 'Себебін тексеру (енгізу қатесі ме, нақты ірі тапсырыс па?) және шешімді құжаттау', 'Орташа мәнмен ауыстыру'], answer: 2, explain: 'Күдікті мән ақпарат болуы мүмкін. Шешім себепке байланысты және ол жазылуы керек.' }
      ]
    },
    {
      id: 'cl-7', title: 'EDA: сұрақтан бастап зерттеу', minutes: 14,
      body: `
<p><b>EDA</b> (Exploratory Data Analysis) — деректі тазалағаннан кейін оны «сезіну»: не бар, қалай таралған, қандай заңдылықтар көрінеді.</p>
<h3>EDA чек-листі</h3>
<ol>
<li><b>Сұрақ</b>: бизнес нені білгісі келеді? Сұрақсыз EDA соңы жоқ кестелерге айналады.</li>
<li><b>Бір айнымалы</b> (univariate): әр маңызды бағанның таралуы, орташа/медиана, шеткі мәндер.</li>
<li><b>Екі айнымалы</b> (bivariate): топтар бойынша салыстыру (қала бойынша орташа чек), корреляция.</li>
<li><b>Уақыт</b>: тренд, маусымдылық, кенет секірулер.</li>
<li><b>Қорытынды</b>: 3–5 нақты бақылау және келесі қадам.</li>
</ol>
<h3>Python-да CSV оқу</h3>
<p>pandas-сыз да CSV-ді оқуға болады. <code>csv.DictReader</code> әр жолды сөздікке айналдырады:</p>
<pre><code>import csv, io
text = """city,amount
Алматы,12500
Астана,8000"""
for row in csv.DictReader(io.StringIO(text)):
    print(row["city"], int(row["amount"]))</code></pre>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>text</code> CSV-інен әр қаланың орташа тапсырыс сомасын есептеп, <code>avg_by_city</code> сөздігіне жазыңыз (кілт — қала, мән — орташа). Сосын оны шығарыңыз.', starter: 'import csv, io\ntext = """city,amount\nАлматы,12000\nАстана,8000\nАлматы,15000\nШымкент,6000\nАстана,10000\nАлматы,9000"""\n', solution: 'import csv, io\ntext = """city,amount\nАлматы,12000\nАстана,8000\nАлматы,15000\nШымкент,6000\nАстана,10000\nАлматы,9000"""\ntotals, counts = {}, {}\nfor row in csv.DictReader(io.StringIO(text)):\n    c = row["city"]\n    totals[c] = totals.get(c, 0) + int(row["amount"])\n    counts[c] = counts.get(c, 0) + 1\navg_by_city = {c: totals[c] / counts[c] for c in totals}\nprint(avg_by_city)', check: { tests: 'assert avg_by_city == {"Алматы": 12000, "Астана": 9000, "Шымкент": 6000}, "Алматы 12000, Астана 9000, Шымкент 6000 болуы керек"' }, hints: ['Екі сөздік ұстаңыз: қосынды және саны.', '<code>int(row["amount"])</code> — CSV-дегі мәндер мәтін.'] },
        { type: 'quiz', xp: 10, prompt: 'Менеджер «деректен бірдеңе тауып бер» деді. EDA-ны неден бастаған дұрыс?', options: ['Барлық бағандардың барлық графигін салудан', 'Бизнес сұрақты нақтылаудан: не шешім қабылданады?', 'ML модельден', 'Бірден дашбордтан'], answer: 1, explain: 'Сұрақ EDA-ны бағыттайды және нені елемеуге болатынын көрсетеді.' }
      ]
    },
    {
      id: 'cl-8', title: 'Мини жоба: лас CSV-ді тазалау', minutes: 20,
      body: `
<p>Нақты тапсырма: CRM-нен экспорт келді. Бағандар: <code>name</code>, <code>city</code>, <code>amount</code>. Мәселелер:</p>
<ul>
<li>аттарда артық бос орын бар;</li>
<li>қалалар әртүрлі жазылған: <code>алматы</code>, <code>Almaty</code>, <code>АСТАНА</code>;</li>
<li>сомада бос орын бар (<code>12 500</code>), кейде бос немесе мәтін.</li>
</ul>
<p>Мақсат — <code>clean_rows(text)</code> функциясы: таза жолдар тізімін қайтарады, ал сомасы жарамсыз жолдарды тастайды.</p>
<pre><code>CITY_MAP = {"алматы": "Алматы", "almaty": "Алматы",
            "астана": "Астана", "astana": "Астана"}
key = city.strip().lower()
city = CITY_MAP.get(key, city.strip())</code></pre>
<div class="tip">Python-ның <code>str.lower()</code> кириллицамен де дұрыс жұмыс істейді: «АСТАНА».lower() → «астана».</div>`,
      exercises: [
        { type: 'python', xp: 40, prompt: '<code>clean_rows(text)</code> функциясын жазыңыз. Әр жол үшін сөздік қайтарсын: <code>name</code> (strip), <code>city</code> (<code>CITY_MAP</code> арқылы, табылмаса strip жасалған мәтін), <code>amount</code> (бос орынсыз <code>int</code>). Сомасы бос, теріс, нөл немесе санға айналмайтын жолдар тасталсын.', starter: 'import csv, io\n\nCITY_MAP = {"алматы": "Алматы", "almaty": "Алматы", "астана": "Астана", "astana": "Астана"}\n\ndef clean_rows(text):\n    out = []\n    for row in csv.DictReader(io.StringIO(text)):\n        pass\n    return out\n', solution: 'import csv, io\n\nCITY_MAP = {"алматы": "Алматы", "almaty": "Алматы", "астана": "Астана", "astana": "Астана"}\n\ndef clean_rows(text):\n    out = []\n    for row in csv.DictReader(io.StringIO(text)):\n        raw = (row["amount"] or "").replace(" ", "")\n        try:\n            amount = int(raw)\n        except ValueError:\n            continue\n        if amount <= 0:\n            continue\n        city = row["city"].strip()\n        out.append({"name": row["name"].strip(), "city": CITY_MAP.get(city.lower(), city), "amount": amount})\n    return out', check: { tests: '_t = """name,city,amount\n Айгерім ,алматы,12 500\nНұрлан,АСТАНА,8000\nДана,Almaty,\nЕржан,Шымкент,-300\nТимур, Ақтөбе ,abc\nӘсем,astana,7 200"""\n_r = clean_rows(_t)\nassert isinstance(_r, list), "Тізім қайтарыңыз"\nassert len(_r) == 3, f"3 таза жол қалуы керек, сізде {len(_r)}"\nassert _r[0] == {"name": "Айгерім", "city": "Алматы", "amount": 12500}, f"1-жол: {_r[0]}"\nassert _r[1] == {"name": "Нұрлан", "city": "Астана", "amount": 8000}, f"2-жол: {_r[1]}"\nassert _r[2] == {"name": "Әсем", "city": "Астана", "amount": 7200}, f"3-жол: {_r[2]}"' }, hints: ['Сомаға <code>try: int(...) except ValueError: continue</code>.', 'Қала: <code>CITY_MAP.get(city.lower(), city)</code>, мұнда <code>city = row["city"].strip()</code>.'] }
      ]
    },
    {
      id: 'cl-gate', gate: true, title: 'Модуль емтиханы: Cleaning & EDA', minutes: 25,
      body: `
<p>Қорытынды тексеріс: profiling, стандарттау, дубликаттар және Python-дағы тазалау. Дерекқор: <code>raw</code>.</p>`,
      exercises: [
        { type: 'sql', dataset: 'raw', xp: 35, prompt: 'Таза клиенттер тізімін шығарыңыз: email-і бар, әр email (регистрге қарамай) үшін ең кіші <code>id</code>. Бағандар: <code>id</code>, <code>name</code> (TRIM), <code>email</code> (LOWER), <code>city</code> (Алматы/Астана нұсқалары біріктірілген, қалғаны TRIM).', starter: '', solution: "SELECT id, TRIM(name) AS name, LOWER(email) AS email, CASE WHEN TRIM(city) IN ('Алматы', 'алматы', 'Almaty') THEN 'Алматы' WHEN TRIM(city) IN ('Астана', 'Astana') THEN 'Астана' ELSE TRIM(city) END AS city FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY id) AS rn FROM raw_customers WHERE email IS NOT NULL) WHERE rn = 1;", check: { mustInclude: ['ROW_NUMBER'] }, hints: [] },
        { type: 'sql', dataset: 'raw', xp: 30, prompt: 'Жарамды тапсырыстардың (сома 0-ден үлкен және 500 000-нан аспайды) жалпы сомасын <code>total</code> бір мәнмен шығарыңыз.', starter: '', solution: "SELECT SUM(a) AS total FROM (SELECT CAST(REPLACE(amount, ' ', '') AS INTEGER) AS a FROM raw_orders) WHERE a > 0 AND a <= 500000;", hints: [] },
        { type: 'python', xp: 30, prompt: '<code>profile(rows)</code> функциясын жазыңыз: сөздіктер тізімін алып, әр кілт үшін бос мәндер санын (<code>None</code> немесе бос мәтін <code>""</code>) сөздікпен қайтарсын. Кілттер бірінші жолдан алынады.', starter: 'def profile(rows):\n    pass\n', solution: 'def profile(rows):\n    return {k: sum(1 for r in rows if r.get(k) in (None, "")) for k in rows[0]}', check: { tests: '_rows = [{"a": 1, "b": None, "c": "x"}, {"a": None, "b": "", "c": "y"}, {"a": 3, "b": "z", "c": ""}]\nassert profile(_rows) == {"a": 1, "b": 2, "c": 1}, f"{{\'a\': 1, \'b\': 2, \'c\': 1}} күтілді, сізде {profile(_rows)}"' }, hints: [] },
        { type: 'quiz', xp: 15, prompt: 'Қай тазалау қадамы <b>міндетті түрде</b> құжатталуы керек?', options: ['Бос орындарды алу', 'Жолдарды алып тастау немесе мәндерді толтыру шешімдері', 'Бағандардың ретін өзгерту', 'Ештеңе'], answer: 1, explain: 'Жолды тастау немесе толтыру нәтижені өзгертеді: кейін біреу «неге сан басқа?» деп сұрайды.' }
      ]
    }
  ]
};
