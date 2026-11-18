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
<p>SQLite-та <code>email IS NULL</code> 1 немесе 0 береді, сондықтан <code>SUM</code> бос мәндерді санайды.</p>
<h3>Неге profiling-ті өткізіп жібермейміз?</h3>
<p>«Лас кірсе — лас шығады» (garbage in, garbage out). Егер клиенттердің 15%-ының қаласы бос болса, ал сіз оны байқамай «Алматыда клиенттер ең көп» деп жазсаңыз, қорытынды қате болуы мүмкін: бос қалалардың көбі басқа қалада болуы ықтимал.</p>
<h3>Profiling нәтижесін қалай жазамыз?</h3>
<p>Әр кестеге қысқа жазба жасаңыз, ол кейін тазалау жоспарына айналады:</p>
<table>
<tr><th>Баған</th><th>Мәселе</th><th>Шешім</th></tr>
<tr><td><code>email</code></td><td>регистр әртүрлі, дубликаттар бар</td><td>кіші әріпке келтіріп, біреуін қалдыру</td></tr>
<tr><td><code>city</code></td><td>бір қала 4 түрлі жазылған</td><td><code>CASE</code> арқылы біріктіру</td></tr>
<tr><td><code>phone</code></td><td>бос мәндер</td><td>«жоқ» деп белгілеу</td></tr>
</table>
<p>Бұл кесте командаға да пайдалы: деректі жинайтын бағдарламашылар мәселені көзімен көріп, оны бастауында түзете алады.</p>
<div class="tip">Profiling-ті тек бір рет емес, жаңа дерек келген сайын қайталаңыз. Кеше таза болған кесте бүгін жаңа қатемен келуі мүмкін.</div>`,
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
<div class="tip">Сандық бағанды толтырғанда орташадан гөрі медиана қауіпсіз: шеткі мәндер оны бұрмаламайды.</div>
<h3>Бос мәндердің үш түрі</h3>
<ul>
<li><b>Толық кездейсоқ</b> (MCAR): сервер бір сағат істемей, сол уақыттағы жазбалар жоғалды. Жолдарды алып тастау әдетте қауіпсіз.</li>
<li><b>Басқа бағанға байланысты</b> (MAR): мобиль қосымшада телефон өрісі міндетті емес, сондықтан мобиль клиенттерде бос жиі. Құрылғы бойынша бөліп талдаңыз.</li>
<li><b>Мәннің өзіне байланысты</b> (MNAR): табысы жоғары адамдар табысын жасырады. Алып тастау да, толтыру да нәтижені ығыстырады. Шектеу ретінде жазыңыз.</li>
</ul>
<h3>Бос мәнді дұрыс санау</h3>
<p><code>NULL</code> мен бос жол (<code>''</code>) бір нәрсе емес. Деректе екеуі де кездеседі, сондықтан екеуін де тексеріңіз:</p>
<pre><code>SELECT SUM(city IS NULL OR TRIM(city) = '') AS empty_city
FROM raw_customers;</code></pre>
<p>Python-да медиана есептеу үшін алдымен <code>None</code> мәндерін сүзіп, сосын <code>statistics.median</code> функциясын қолданамыз.</p>`,
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
<p><code>\\D</code> — «сан емес кез келген таңба». Осылай телефоннан тек сандарды қалдырамыз.</p>
<h3>Стандарттау тәртібі</h3>
<p>Мәтінді тазалағанда қадамдардың реті маңызды:</p>
<ol>
<li><b>TRIM</b>: бос орындарды алып тастаймыз. Әйтпесе «Алматы␣» мен «Алматы» әртүрлі болып қалады.</li>
<li><b>Регистр</b>: бәрін бір регистрге келтіреміз (салыстыру үшін).</li>
<li><b>Сөздік</b>: белгілі нұсқаларды бір стандарт мәнге ауыстырамыз.</li>
<li><b>Тексеру</b>: <code>GROUP BY</code> арқылы қалған мәндерді қайта қараймыз. Жаңа нұсқа табылса, сөздікке қосамыз.</li>
</ol>
<h3>Сөздікті кестеде сақтау</h3>
<p>Нұсқалар көп болса, ұзын <code>CASE</code> орнына сәйкестік кестесін жасаған ыңғайлы: <code>city_map(raw, clean)</code>. Сонда тазалау бір <code>LEFT JOIN</code> болады, ал жаңа нұсқаны қосу үшін сұрауды емес, кестені өзгертесіз.</p>
<div class="tip">Телефонды бір форматқа (<code>+77013334455</code>) келтіргеннен кейін оның ұзындығын тексеріңіз: Қазақстан нөмірі <code>+7</code>-ден кейін 10 цифрдан тұрады. Басқа ұзындық — қате енгізілген нөмір.</div>`,
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
<div class="tip">Қай жазбаны қалдыру — бизнес шешімі: ең ескісін бе, ең толығын ба, ең соңғы жаңартылғанын ба? Оны жазып қойыңыз.</div>
<h3>Дубликаттың түрлері</h3>
<ul>
<li><b>Толық дубликат</b>: барлық баған бірдей. Көбіне жүктеу екі рет іске қосылғанда пайда болады. <code>SELECT DISTINCT</code> жеткілікті.</li>
<li><b>Кілт бойынша дубликат</b>: email бірдей, бірақ аты немесе телефоны басқа. Қайсысын қалдыру керегін шешу керек.</li>
<li><b>Анық емес дубликат</b>: «Нұрлан Ахметов» мен «Нурлан Ахметов». Мұндай жағдайларды автоматты түрде біріктіру қауіпті, оларды тізімге шығарып, қолмен тексерген дұрыс.</li>
</ul>
<h3>Дубликатты өшірмес бұрын</h3>
<p>Дубликаттың тапсырыстары бар болуы мүмкін. Егер екінші жазбаны жай өшірсеңіз, оның тапсырыстары «иесіз» қалады. Дұрыс жол: тапсырыстардағы <code>customer_id</code>-ді қалдырылатын жазбаға ауыстырып, содан кейін ғана артық жазбаны алып тастау.</p>
<div class="tip">Тазалаудан кейін тексеру: <code>COUNT(*)</code> мен <code>COUNT(DISTINCT LOWER(email))</code> тең болуы керек.</div>`,
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
<p>Бірнеше форматты кезекпен «байқап көреміз»: біреуі сәйкес келмесе, <code>ValueError</code> шығады да, келесісіне өтеміз.</p>
<h3>Cast-тан кейінгі тексеру</h3>
<p>SQLite <code>'abc'</code> мәтінін 0-ге айналдырғандықтан, айналдырудың сәтті болғанын бөлек тексереміз:</p>
<pre><code>SELECT id, amount
FROM raw_orders
WHERE REPLACE(amount, ' ', '') GLOB '*[^0-9-]*';</code></pre>
<p><code>GLOB '*[^0-9-]*'</code> сан мен минустан басқа таңбасы бар мәндерді табады. Мұндай жолдарды «қате» деп белгілеп, есептен шығарамыз.</p>
<h3>Күндердің жиі қақпандары</h3>
<ul>
<li><b>Ай мен күннің орны</b>: <code>03/04/2024</code> — 3 сәуір ме, әлде 4 наурыз ба? Дереккөзінің форматын нақтылаңыз.</li>
<li><b>Уақыт белдеуі</b>: Алматы мен UTC арасында 5 сағат айырма бар. Түн ортасына жақын тапсырыстар басқа күнге түсуі мүмкін.</li>
<li><b>Excel сандары</b>: Excel-ден келген <code>45306</code> сияқты сан — 1900 жылдан бергі күндер саны, яғни күн.</li>
</ul>
<div class="tip">Барлық күнді ISO форматына келтіргеннен кейін <code>MIN</code> мен <code>MAX</code> мәнін қараңыз: 1900 жыл немесе болашақ күн шықса, түрлендіруде қате бар.</div>`,
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
<p>Мәндерді бірден өшірмейміз: алдымен белгі қойып, саны мен себебін бизнеспен талқылаймыз. «Күдікті» мән нақты ірі тапсырыс болуы мүмкін.</p>
<h3>«Тым үлкен» дегенді қалай анықтаймыз?</h3>
<p>Екі кең тараған тәсіл бар:</p>
<ul>
<li><b>Бизнес шегі</b>: «бір тапсырыс 200 000 ₸-ден аспайды» деген ереже. Түсінікті, бірақ шекті бизнеспен келісу керек.</li>
<li><b>Статистикалық шек (IQR)</b>: Q1 және Q3 квартильдерін тауып, <code>Q3 + 1.5 × (Q3 − Q1)</code>-ден үлкен мәндерді күдікті деп белгілейміз. Статистика модулінде бұл тәсілді толығырақ қарастырдық.</li>
</ul>
<h3>Белгілеудің SQL үлгісі</h3>
<pre><code>CASE
  WHEN amount IS NULL THEN 'жоқ'
  WHEN amount_num &lt;= 0 THEN 'қате'
  WHEN amount_num &gt; 200000 THEN 'күдікті'
  ELSE 'ok'
END AS flag</code></pre>
<p><code>CASE</code> шарттарды жоғарыдан төмен тексеріп, бірінші сәйкес келгенін қайтарады. Сондықтан реті маңызды: <code>NULL</code> тексерісі бірінші тұруы керек.</p>
<div class="tip">Белгілерді санап шығыңыз: <code>GROUP BY flag</code>. «Қате» жолдар 1% болса — шағын мәселе, 30% болса — дерек жинау процесінде үлкен ақау бар.</div>`,
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
    print(row["city"], int(row["amount"]))</code></pre>
<h3>EDA мысалы: кофехана</h3>
<p><b>Сұрақ:</b> «Демалыс күндері чек үлкен бе?»</p>
<ol>
<li><b>Бір айнымалы</b>: чектің медианасы 2 300 ₸, бірақ бірнеше 40 000 ₸-лік корпоративтік тапсырыс бар.</li>
<li><b>Екі айнымалы</b>: апта күні бойынша медиана: жұмыс күндері 2 100 ₸, демалыста 2 900 ₸.</li>
<li><b>Уақыт</b>: айырма барлық айда сақталады, демек бұл кездейсоқ емес.</li>
<li><b>Қорытынды</b>: демалыста чек ~40% жоғары. Келесі қадам: демалыс күндеріне арналған комбо-ұсынысты тексеру.</li>
</ol>
<h3>Орташа ма, медиана ма?</h3>
<p>Шеткі мәндер бар болса, топтарды медианамен салыстырыңыз. Бір 40 000 ₸-лік тапсырыс шағын топтың орташасын қатты өзгертеді, ал медианаға әсері аз.</p>
<div class="tip">EDA барысында әр бақылауды бір сөйлеммен жазып отырыңыз. Соңында ең маңызды 3–5 бақылауды таңдау жеңіл болады.</div>`,
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
<div class="tip">Python-ның <code>str.lower()</code> кириллицамен де дұрыс жұмыс істейді: «АСТАНА».lower() → «астана».</div>
<h3>Шешімнің құрылымы</h3>
<p>Тазалау функциясын шағын бөліктерге бөлген ыңғайлы. Әр бөлікті жеке тексеруге болады:</p>
<pre><code>def clean_amount(s):
    s = (s or "").replace(" ", "")
    return int(s) if s.isdigit() else None

def clean_city(s):
    key = s.strip().lower()
    return CITY_MAP.get(key, s.strip())</code></pre>
<p><code>str.isdigit()</code> бос жол үшін <code>False</code> береді, сондықтан бос сома да, «abc» те <code>None</code> болады.</p>
<h3>Нәтижені тексеру</h3>
<ul>
<li>Неше жол кірді, неше жол шықты? Алынған жолдардың санын жазып қойыңыз.</li>
<li>Тазаланған қалалардың тізімін қараңыз: сөздікке кірмеген жаңа нұсқа қалған жоқ па?</li>
<li>Сомалардың ең кіші және ең үлкен мәнін тексеріңіз.</li>
</ul>
<div class="tip">Нақты жұмыста тазалау кодын бір рет жазып, әр жаңа экспортқа қайта қолданасыз. Сондықтан функцияға түсінікті ат беріп, әр ережеге түсініктеме жазыңыз.</div>`,
      exercises: [
        { type: 'python', xp: 40, prompt: '<code>clean_rows(text)</code> функциясын жазыңыз. Әр жол үшін сөздік қайтарсын: <code>name</code> (strip), <code>city</code> (<code>CITY_MAP</code> арқылы, табылмаса strip жасалған мәтін), <code>amount</code> (бос орынсыз <code>int</code>). Сомасы бос, теріс, нөл немесе санға айналмайтын жолдар тасталсын.', starter: 'import csv, io\n\nCITY_MAP = {"алматы": "Алматы", "almaty": "Алматы", "астана": "Астана", "astana": "Астана"}\n\ndef clean_rows(text):\n    out = []\n    for row in csv.DictReader(io.StringIO(text)):\n        pass\n    return out\n', solution: 'import csv, io\n\nCITY_MAP = {"алматы": "Алматы", "almaty": "Алматы", "астана": "Астана", "astana": "Астана"}\n\ndef clean_rows(text):\n    out = []\n    for row in csv.DictReader(io.StringIO(text)):\n        raw = (row["amount"] or "").replace(" ", "")\n        try:\n            amount = int(raw)\n        except ValueError:\n            continue\n        if amount <= 0:\n            continue\n        city = row["city"].strip()\n        out.append({"name": row["name"].strip(), "city": CITY_MAP.get(city.lower(), city), "amount": amount})\n    return out', check: { tests: '_t = """name,city,amount\n Айгерім ,алматы,12 500\nНұрлан,АСТАНА,8000\nДана,Almaty,\nЕржан,Шымкент,-300\nТимур, Ақтөбе ,abc\nӘсем,astana,7 200"""\n_r = clean_rows(_t)\nassert isinstance(_r, list), "Тізім қайтарыңыз"\nassert len(_r) == 3, f"3 таза жол қалуы керек, сізде {len(_r)}"\nassert _r[0] == {"name": "Айгерім", "city": "Алматы", "amount": 12500}, f"1-жол: {_r[0]}"\nassert _r[1] == {"name": "Нұрлан", "city": "Астана", "amount": 8000}, f"2-жол: {_r[1]}"\nassert _r[2] == {"name": "Әсем", "city": "Астана", "amount": 7200}, f"3-жол: {_r[2]}"' }, hints: ['Сомаға <code>try: int(...) except ValueError: continue</code>.', 'Қала: <code>CITY_MAP.get(city.lower(), city)</code>, мұнда <code>city = row["city"].strip()</code>.'] }
      ]
    },
    {
      id: 'cl-9', title: 'pandas-пен EDA және дерек сапасының тексерісі', minutes: 18,
      body: `
<p>Алдыңғы сабақтарда тазалауды қолмен, таза Python-мен жасадыңыз: ол не болып жатқанын түсіндіреді. Жұмыста дәл сол қадамдарды <b>pandas</b> бірнеше жолмен орындайды. Бұл сабақта кофехананың <code>orders.csv</code> (150 тапсырыс) және <code>customers.csv</code> (40 клиент) файлдарын тексереміз.</p>
<h3>Бес жолдық profiling</h3>
<pre><code>import pandas as pd
df = pd.read_csv('orders.csv')

df.info()                      # бағандар, типтер, бос емес мәндер саны
df.describe()                  # сандық бағандар: min, квартильдер, max
df.isna().sum()                # әр бағандағы бос мәндер
df['status'].value_counts()    # санаттардың жиілігі
df.duplicated().sum()          # толық қайталанған жолдар</code></pre>
<p>Осы файлда бұл командалар мынаны көрсетеді:</p>
<table>
<tr><th>Команда</th><th>Не көрдік</th><th>Қорытынды</th></tr>
<tr><td><code>info()</code></td><td><code>amount</code>: 150-ден 144 бос емес; <code>order_date</code> мәтін</td><td>6 сома жоқ; күнді <code>pd.to_datetime</code>-мен түрлендіру керек</td></tr>
<tr><td><code>describe()</code></td><td>медиана 2 450, max 48 000</td><td>Бір тапсырыс медианадан 20 есе үлкен: күдікті мән</td></tr>
<tr><td><code>value_counts()</code></td><td>paid 146, refund 4</td><td>Табысты санағанда refund-ты алып тастаймыз</td></tr>
<tr><td><code>duplicated()</code></td><td>0</td><td>Толық дубликат жоқ. Кілт бойынша да тексеріңіз: <code>df['id'].is_unique</code></td></tr>
</table>
<p><code>value_counts(dropna=False)</code> бос мәндерді де жеке жол етіп көрсетеді. <code>nunique()</code> бағандағы әртүрлі мәндер санын береді.</p>
<h3>merge: кілттерді тексеру</h3>
<p>Екі кестені біріктіру — дерек ең жиі бұзылатын жер. pandas-та екі сақтандырғыш бар.</p>
<p><b>1. <code>indicator=True</code></b> әр жолдың қайдан келгенін көрсететін <code>_merge</code> бағанын қосады:</p>
<pre><code>m = orders.merge(customers, on='customer_id', how='left', indicator=True)
m['_merge'].value_counts()
# both         — клиент табылды
# left_only    — тапсырыс бар, клиент жоқ («жетім» кілт)</code></pre>
<p>«Жетім» жолдар INNER JOIN-да үнсіз жоғалады, ал LEFT JOIN-да қала мен арна бағандары NaN болады. Екеуінде де сома дұрыс шықпайды, сондықтан оларды алдымен тауып алу керек.</p>
<p><b>2. <code>validate</code></b> байланыс түрін тексереді. Күткеніңіз орындалмаса, pandas <code>MergeError</code> қатесін береді:</p>
<pre><code>orders.merge(customers, on='customer_id', how='left', validate='many_to_one')</code></pre>
<p><code>many_to_one</code>: сол жақта кілт қайталана алады, оң жақта бірегей болуы шарт. Клиенттер кестесінде бір <code>customer_id</code> екі рет кездессе, оның әр тапсырысы екі еселеніп, табыс асып кетер еді. <code>validate</code> мұны бірден ұстайды.</p>
<h3>Жол санын салыстыру (reconciliation)</h3>
<p>Әр қадамнан кейін жол саны мен бақылау сомасын жазып отырыңыз:</p>
<pre><code>print(len(orders))               # 150
m = orders.merge(customers, on='customer_id', how='left')
assert len(m) == len(orders)     # left join жол қоспауы керек
clean = m[(m['status'] == 'paid') &amp; m['amount'].notna()]
print(len(clean), clean['amount'].sum())</code></pre>
<p>Сандарыңыз SQL-дегі немесе дашбордтағы санмен сәйкес келмесе, осы жазбалар айырманың қай қадамда пайда болғанын табуға көмектеседі.</p>
<h3>Дерек сапасының чек-листі</h3>
<table>
<tr><th>Өлшем</th><th>Сұрақ</th><th>pandas</th></tr>
<tr><td>Толықтық</td><td>Бос мәндер қайда, қанша?</td><td><code>df.isna().sum()</code></td></tr>
<tr><td>Бірегейлік</td><td>Кілт қайталана ма?</td><td><code>df['id'].is_unique</code>, <code>df.duplicated(subset=['id'])</code></td></tr>
<tr><td>Жарамдылық</td><td>Мәндер рұқсат етілген аралықта ма?</td><td><code>describe()</code>, <code>(df['amount'] &lt;= 0).sum()</code>, <code>value_counts()</code></td></tr>
<tr><td>Сәйкестік</td><td>Сыртқы кілттер табыла ма?</td><td><code>merge(..., indicator=True)</code></td></tr>
<tr><td>Өзектілік</td><td>Дерек қай күнге дейін?</td><td><code>df['order_date'].min()</code>, <code>.max()</code></td></tr>
<tr><td>Салыстыру</td><td>Жол саны мен сома дереккөзбен сәйкес пе?</td><td><code>len(df)</code>, <code>df['amount'].sum()</code></td></tr>
</table>
<h3>Жиі қателер</h3>
<ul>
<li><code>describe()</code>-ті қарамай орташаны есептеу: бір 48 000 ₸-лік тапсырыс орташаны қатты жылжытады.</li>
<li>merge-тен кейін жол санын тексермеу. Жол көбейсе, оң жақ кілт бірегей емес; азайса, INNER JOIN «жетім» жолдарды тастап кеткен.</li>
<li>Бос мәндерді себебін білмей <code>fillna(0)</code>-мен толтыру: «сома белгісіз» бен «сома нөл» — екі бөлек нәрсе.</li>
<li><code>duplicated()</code> тек толық бірдей жолдарды табады. Бір тапсырыс екі түрлі уақытпен екі рет жазылса, кілт бойынша тексеру ғана ұстайды.</li>
</ul>
<div class="tip">Чек-листті функция етіп жазып, әр жаңа файлға бірінші соны іске қосыңыз. Take-home тапсырмада «деректі қалай тексердім» деген бөлім — жұмыс берушінің бірінші қарайтын жері.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>profile(df)</code> функциясын жазыңыз. Ол сөздік қайтарсын: <code>rows</code> (жол саны), <code>cols</code> (баған саны), <code>missing</code> (бос мәні бар бағандар ғана: <code>{баған: саны}</code>), <code>duplicates</code> (толық қайталанған жолдар саны).', starter: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\n\ndef profile(df):\n    pass\n\nprint(profile(df))\n", solution: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\n\ndef profile(df):\n    na = df.isna().sum()\n    return {\n        'rows': len(df),\n        'cols': df.shape[1],\n        'missing': {c: int(n) for c, n in na.items() if n > 0},\n        'duplicates': int(df.duplicated().sum()),\n    }\n\nprint(profile(df))\n", check: { tests: "import pandas as _pd\n_d = _pd.read_csv('orders.csv')\n_r = profile(_d)\nassert isinstance(_r, dict), 'profile сөздік қайтаруы керек'\nassert _r.get('rows') == 150 and _r.get('cols') == 5, f\"orders.csv: rows = 150, cols = 5 болуы керек, сізде {_r.get('rows')}, {_r.get('cols')}\"\nassert dict(_r.get('missing') or {}) == {'amount': 6}, f\"missing = {{'amount': 6}} болуы керек, сізде {_r.get('missing')}\"\nassert _r.get('duplicates') == 0, 'orders.csv-де толық дубликат жоқ: duplicates = 0'\n_r2 = profile(_pd.concat([_d, _d.head(3)], ignore_index=True))\nassert _r2.get('rows') == 153 and _r2.get('duplicates') == 3, 'Үш жол қайталанған кестеде duplicates = 3 болуы керек'" }, hints: ['<code>df.isna().sum()</code> әр бағандағы бос мәндер санын береді; <code>.items()</code> арқылы айналып, нөлден үлкендерін қалдырыңыз.', '<code>df.duplicated().sum()</code> — толық қайталанған жолдар. <code>int(...)</code>-ке ораңыз.', '<code>df.shape[1]</code> — баған саны.'] },
        { type: 'python', xp: 30, prompt: '<code>orders</code>-қа <code>customers</code>-ты <code>customer_id</code> бойынша left join жасап, <code>indicator=True</code> қосыңыз: нәтиже <code>merged</code> болсын. Сосын клиенті табылмаған тапсырыстардың <code>customer_id</code> мәндерін қайталамай, өспелі ретпен <code>orphans</code> тізіміне жазыңыз.', starter: "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n# Басқа жүйеден қате жүктелген екі тапсырыс: мұндай клиент жоқ\nextra = pd.DataFrame({'id': [1151, 1152], 'customer_id': [98, 99], 'order_date': ['2024-06-20', '2024-06-21'], 'amount': [2500.0, 1900.0], 'status': ['paid', 'paid']})\norders = pd.concat([orders, extra], ignore_index=True)\n\n# merged = ...\n# orphans = ...\n", solution: "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n# Басқа жүйеден қате жүктелген екі тапсырыс: мұндай клиент жоқ\nextra = pd.DataFrame({'id': [1151, 1152], 'customer_id': [98, 99], 'order_date': ['2024-06-20', '2024-06-21'], 'amount': [2500.0, 1900.0], 'status': ['paid', 'paid']})\norders = pd.concat([orders, extra], ignore_index=True)\n\nmerged = orders.merge(customers, on='customer_id', how='left', indicator=True)\nprint(merged['_merge'].value_counts())\norphans = sorted(merged.loc[merged['_merge'] == 'left_only', 'customer_id'].unique().tolist())\nprint(orphans)\n", check: { mustInclude: ['indicator'], tests: "assert 'merged' in globals(), 'merged айнымалысын жасаңыз'\nassert '_merge' in merged.columns, 'merge ішіне indicator=True қосыңыз'\nassert len(merged) == 152, f'Left join жол санын өзгертпеуі керек: 152 жол, сізде {len(merged)}'\nassert 'orphans' in globals(), 'orphans тізімін жасаңыз'\nassert [int(x) for x in orphans] == [98, 99], f'orphans = [98, 99] болуы керек, сізде {list(orphans)}'" }, hints: ["<code>orders.merge(customers, on='customer_id', how='left', indicator=True)</code>", "«Жетім» жолдар: <code>merged['_merge'] == 'left_only'</code>", "<code>sorted(merged.loc[шарт, 'customer_id'].unique().tolist())</code>"] },
        { type: 'python', xp: 30, prompt: "<code>safe_join(orders, customers)</code> функциясын жазыңыз: <code>customer_id</code> бойынша left join жасап, <code>validate='many_to_one'</code> арқылы клиенттер кілтінің бірегей екенін тексерсін, жол саны өзгермегеніне <code>assert</code> қойып, біріктірілген кестені қайтарсын. Клиенттер кестесінде кілт қайталанса, қате шығуы керек.", starter: "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n\ndef safe_join(orders, customers):\n    pass\n\nresult = safe_join(orders, customers)\n", solution: "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n\ndef safe_join(orders, customers):\n    out = orders.merge(customers, on='customer_id', how='left', validate='many_to_one')\n    assert len(out) == len(orders), 'Жол саны өзгерді'\n    return out\n\nresult = safe_join(orders, customers)\nprint(len(orders), len(result))\n", check: { mustInclude: ['validate'], tests: "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n_m = safe_join(_o, _c)\nassert _m is not None, 'safe_join біріктірілген кестені қайтаруы керек'\nassert len(_m) == len(_o), f'Жол саны 150 болып қалуы керек, сізде {len(_m)}'\nassert 'city' in _m.columns and 'channel' in _m.columns, 'Нәтижеде клиенттің city және channel бағандары болуы керек'\n_bad = _pd.concat([_c, _c.head(1)], ignore_index=True)\ntry:\n    safe_join(_o, _bad)\n    _raised = False\nexcept Exception:\n    _raised = True\nassert _raised, 'Клиенттер кестесінде кілт қайталанса, safe_join қате беруі керек'" }, hints: ["<code>orders.merge(customers, on='customer_id', how='left', validate='many_to_one')</code>", '<code>assert len(out) == len(orders)</code>, сосын <code>return out</code>.'] },
        { type: 'quiz', xp: 10, prompt: '150 жолдық тапсырыстар кестесін клиенттер кестесімен left join жасағаннан кейін 163 жол шықты. Ең ықтимал себеп?', options: ['13 тапсырыстың клиенті табылмады', 'Клиенттер кестесінде кейбір <code>customer_id</code> қайталанған, сондықтан олардың тапсырыстары көбейген', 'pandas жолдарды кездейсоқ қосады', 'Тапсырыстар кестесінде бос мәндер бар'], answer: 1, explain: "Left join-да клиенті табылмаған жол жоғалмайды да, көбеймейді де. Жол саны тек оң жақтағы кілт бірегей болмағанда өседі. <code>validate='many_to_one'</code> мұны бірден ұстайды." },
        { type: 'quiz', xp: 10, prompt: 'Сіздің pandas есебіңізде кофехана табысы 382 850 ₸, ал әріптесіңіздің SQL сұрауында 334 850 ₸. Алдымен не істейсіз?', options: ['Екі санның орташасын аламын', 'Екі есептің сүзгілері мен жол санын қадам-қадаммен салыстырамын: статус, бос сомалар, шеткі мәндер', 'Өз санымды дұрыс деп жариялаймын', 'Деректі қайта жүктеймін'], answer: 1, explain: 'Айырма дәл 48 000 ₸: бір корпоративтік тапсырыс бір есепте бар, екіншісінде алынып тасталған. Reconciliation айырманың қай қадамда пайда болғанын көрсетеді.' }
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
