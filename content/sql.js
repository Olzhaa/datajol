// M1.2 SQL Core + M3.3 Advanced SQL (preview lessons). Dataset: DJ.datasets.shop / staff.
DJ.modules['m1-2'] = {
  intro: 'Бұл модульде онлайн дүкеннің дерекқорымен жұмыс істейсіз: клиенттер, тауарлар, тапсырыстар. Сұрауды оң жақтағы редакторға жазып, «Іске қосу» батырмасымен нәтижені көріңіз, сосын «Тексеру» басыңыз.',
  lessons: [
    {
      id: 'sql-1', title: 'Дерекқор және бірінші SELECT', minutes: 10,
      body: `
<p><b>SQL</b> (Structured Query Language) — дерекқордағы кестелерге сұрақ қоятын тіл. Банк, дүкен, такси қосымшасы — барлығының ішінде SQL дерекқоры бар.</p>
<p>Біздің дүкен дерекқорында төрт кесте бар:</p>
<table>
<tr><th>Кесте</th><th>Бағандар</th></tr>
<tr><td><code>customers</code></td><td>id, name, city, signup_date</td></tr>
<tr><td><code>products</code></td><td>id, name, category, price</td></tr>
<tr><td><code>orders</code></td><td>id, customer_id, order_date, status</td></tr>
<tr><td><code>order_items</code></td><td>order_id, product_id, quantity</td></tr>
</table>
<h3>SELECT ... FROM</h3>
<p>Ең қарапайым сұрау кестедегі бәрін алады. <code>*</code> белгісі «барлық бағандар» дегенді білдіреді:</p>
<pre><code>SELECT * FROM customers;</code></pre>
<p>Тек керекті бағандарды үтір арқылы атауға болады:</p>
<pre><code>SELECT name, city FROM customers;</code></pre>
<div class="tip">SQL кілт сөздерін (SELECT, FROM) бас әріппен жазу — дәстүр ғана. <code>select</code> да жұмыс істейді. Сұрау соңындағы <code>;</code> бірнеше сұрауды бөлу үшін керек.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: '<code>products</code> кестесіндегі барлық бағандар мен жолдарды шығарыңыз.', starter: '-- Сұрауыңызды осында жазыңыз\n', solution: 'SELECT * FROM products;', hints: ['Барлық бағандар үшін <code>*</code> қолданылады.', 'Үлгі: <code>SELECT * FROM кесте_аты;</code>'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Тауарлардың тек атауы (<code>name</code>) мен бағасын (<code>price</code>) шығарыңыз.', starter: 'SELECT \nFROM products;', solution: 'SELECT name, price FROM products;', hints: ['Бағандарды үтірмен бөліп жазыңыз.', '<code>SELECT name, price FROM products;</code>'] }
      ]
    },
    {
      id: 'sql-2', title: 'WHERE: жолдарды сүзу', minutes: 10,
      body: `
<p><code>WHERE</code> шарты тек керекті жолдарды қалдырады. Ол <code>FROM</code>-нан кейін жазылады:</p>
<pre><code>SELECT name, price
FROM products
WHERE price > 50000;</code></pre>
<h3>Салыстыру операторлары</h3>
<table>
<tr><th>Оператор</th><th>Мағынасы</th></tr>
<tr><td><code>=</code></td><td>тең</td></tr>
<tr><td><code>&lt;&gt;</code> немесе <code>!=</code></td><td>тең емес</td></tr>
<tr><td><code>&gt;</code>, <code>&lt;</code></td><td>үлкен, кіші</td></tr>
<tr><td><code>&gt;=</code>, <code>&lt;=</code></td><td>үлкен немесе тең, кіші немесе тең</td></tr>
</table>
<p>Мәтін мен күн <b>бір тырнақшада</b> жазылады: <code>WHERE city = 'Алматы'</code>. Сандар тырнақшасыз: <code>WHERE price = 9000</code>.</p>
<div class="tip">Күндер <code>'2024-09-01'</code> форматында сақталған. Бұл форматты мәтін ретінде салыстыру да дұрыс жұмыс істейді: <code>order_date &gt;= '2024-10-01'</code>.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Бағасы 50 000 теңгеден жоғары тауарлардың атауы мен бағасын шығарыңыз.', starter: 'SELECT name, price\nFROM products\nWHERE ', solution: 'SELECT name, price FROM products WHERE price > 50000;', hints: ['Шарт: <code>price > 50000</code>'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Астанадан келген клиенттердің барлық бағандарын шығарыңыз.', starter: '', solution: "SELECT * FROM customers WHERE city = 'Астана';", hints: ['Мәтінді тырнақшаға алыңыз: <code>\'Астана\'</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Статусы <code>delivered</code> емес тапсырыстарды (барлық бағандар) шығарыңыз.', starter: '', solution: "SELECT * FROM orders WHERE status <> 'delivered';", hints: ['«Тең емес» операторы: <code>&lt;&gt;</code> немесе <code>!=</code>.'] }
      ]
    },
    {
      id: 'sql-3', title: 'AND, OR, NOT, BETWEEN, IN', minutes: 12,
      body: `
<p>Бірнеше шартты біріктіру үшін логикалық операторлар бар:</p>
<ul>
<li><code>AND</code> — екі шарт та орындалуы керек.</li>
<li><code>OR</code> — кемінде бір шарт орындалса жеткілікті.</li>
<li><code>NOT</code> — шартты керісінше етеді.</li>
</ul>
<pre><code>SELECT name, price FROM products
WHERE category = 'Электроника' AND price &lt; 100000;</code></pre>
<h3>BETWEEN және IN</h3>
<p><code>BETWEEN a AND b</code> — аралық, шеттерін қоса алғанда. <code>IN (...)</code> — тізімнің біріне тең.</p>
<pre><code>WHERE price BETWEEN 5000 AND 20000
WHERE city IN ('Алматы', 'Шымкент')
WHERE city NOT IN ('Алматы')</code></pre>
<div class="tip">AND пен OR араласса, жақша қойыңыз: <code>WHERE (city = 'Алматы' OR city = 'Астана') AND status = 'delivered'</code>. Жақшасыз AND бірінші орындалады.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: '«Электроника» санатындағы, бағасы 100 000-нан төмен тауарлардың атауы мен бағасын шығарыңыз.', starter: '', solution: "SELECT name, price FROM products WHERE category = 'Электроника' AND price < 100000;", hints: ['Екі шартты <code>AND</code> арқылы біріктіріңіз.'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Алматы немесе Шымкенттен келген клиенттердің атауы мен қаласын шығарыңыз. <code>IN</code> қолданыңыз.', starter: '', solution: "SELECT name, city FROM customers WHERE city IN ('Алматы', 'Шымкент');", check: { mustInclude: ['IN'] }, hints: ["<code>WHERE city IN ('Алматы', 'Шымкент')</code>"] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '2024 жылғы қыркүйекте (1–30 қыркүйек) жасалған барлық тапсырыстарды шығарыңыз. <code>BETWEEN</code> қолданыңыз.', starter: '', solution: "SELECT * FROM orders WHERE order_date BETWEEN '2024-09-01' AND '2024-09-30';", check: { mustInclude: ['BETWEEN'] }, hints: ["Күндерді тырнақшада жазыңыз: <code>'2024-09-01'</code>."] }
      ]
    },
    {
      id: 'sql-4', title: 'LIKE және NULL', minutes: 9,
      body: `
<h3>LIKE: үлгі бойынша іздеу</h3>
<p><code>%</code> — кез келген таңбалар тізбегі, <code>_</code> — дәл бір таңба.</p>
<pre><code>WHERE name LIKE 'Кітап%'   -- «Кітап» сөзінен басталады
WHERE name LIKE '%фон'     -- «фон» сөзімен аяқталады
WHERE name LIKE '%ал%'     -- ішінде «ал» бар</code></pre>
<h3>NULL: мән жоқ</h3>
<p><code>NULL</code> — «белгісіз» немесе «бос». Ол нөл де, бос мәтін де емес. Сондықтан <code>= NULL</code> жұмыс істемейді, арнайы оператор керек:</p>
<pre><code>WHERE city IS NULL
WHERE city IS NOT NULL</code></pre>
<div class="tip">Нақты деректе NULL өте жиі кездеседі. Талдау алдында қай бағандарда бос мән бар екенін әрқашан тексеріңіз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Атауы «Кітап» сөзінен басталатын тауарлардың барлық бағандарын шығарыңыз.', starter: '', solution: "SELECT * FROM products WHERE name LIKE 'Кітап%';", hints: ["<code>LIKE 'Кітап%'</code>"] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Қаласы көрсетілмеген клиенттердің <code>id</code> мен <code>name</code> бағандарын шығарыңыз.', starter: '', solution: 'SELECT id, name FROM customers WHERE city IS NULL;', hints: ['<code>= NULL</code> емес, <code>IS NULL</code> жазыңыз.'] }
      ]
    },
    {
      id: 'sql-5', title: 'ORDER BY, LIMIT, DISTINCT', minutes: 10,
      body: `
<p><code>ORDER BY</code> нәтижені сұрыптайды. <code>ASC</code> — өсу ретімен (әдепкі), <code>DESC</code> — кему ретімен.</p>
<pre><code>SELECT name, price FROM products
ORDER BY price DESC;</code></pre>
<p><code>LIMIT n</code> — тек алғашқы n жолды қалдырады. ORDER BY-мен бірге «топ-N» алу үшін қолданылады.</p>
<p><code>DISTINCT</code> — қайталанатын жолдарды алып тастайды:</p>
<pre><code>SELECT DISTINCT category FROM products;</code></pre>
<h3>Сұрау бөліктерінің реті</h3>
<pre><code>SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...</code></pre>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Ең қымбат 3 тауардың атауы мен бағасын, қымбаттан арзанға қарай шығарыңыз.', starter: '', solution: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 3;', check: { ordered: true }, hints: ['<code>ORDER BY price DESC</code>, сосын <code>LIMIT 3</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Клиенттер тұратын қалалардың қайталанбайтын тізімін шығарыңыз. NULL мәнін қоспаңыз.', starter: '', solution: 'SELECT DISTINCT city FROM customers WHERE city IS NOT NULL;', hints: ['<code>SELECT DISTINCT city</code> + <code>WHERE city IS NOT NULL</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Клиенттердің атауы мен тіркелген күнін ең жаңасынан бастап шығарыңыз.', starter: '', solution: 'SELECT name, signup_date FROM customers ORDER BY signup_date DESC;', check: { ordered: true }, hints: ['Жаңадан ескіге: <code>DESC</code>.'] }
      ]
    },
    {
      id: 'sql-6', title: 'Alias және есептелген бағандар', minutes: 9,
      body: `
<p>SELECT ішінде арифметика жасауға болады: <code>+ - * /</code>. Жаңа бағанға <code>AS</code> арқылы атау (alias) береміз:</p>
<pre><code>SELECT name,
       price,
       price * 1.12 AS price_with_vat
FROM products;</code></pre>
<p>Кестеге де қысқа атау беруге болады. Бұл JOIN сабағында өте пайдалы болады:</p>
<pre><code>SELECT p.name FROM products AS p;
SELECT p.name FROM products p;   -- AS міндетті емес</code></pre>
<div class="tip">SQLite-та бүтін санды бүтін санға бөлсеңіз, нәтиже де бүтін болады: <code>7 / 2 = 3</code>. Дәл нәтиже үшін біреуін бөлшекке айналдырыңыз: <code>7 / 2.0 = 3.5</code>.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: '«Кеңсе» санатындағы тауарлар үшін атауын <code>product</code> деп, 10% жеңілдікпен бағасын <code>sale_price</code> деп шығарыңыз.', starter: '', solution: "SELECT name AS product, price * 0.9 AS sale_price FROM products WHERE category = 'Кеңсе';", hints: ['10% жеңілдік = <code>price * 0.9</code>.', 'Атау беру: <code>name AS product</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр тауардың атауын және бағасын мың теңгемен (<code>price_k</code>, бөлшек сан) шығарыңыз. Мысалы 6500 → 6.5.', starter: '', solution: 'SELECT name, price / 1000.0 AS price_k FROM products;', hints: ['Бүтін бөлуден сақтаныңыз: <code>1000.0</code>.'] }
      ]
    },
    {
      id: 'sql-7', title: 'Агрегат функциялар', minutes: 10,
      body: `
<p>Дүкен кассасын елестетіңіз. Кассир чектегі әр тауарды жеке айтпайды, соңында бір сан айтады: «Барлығы 41 700 ₸». <b>Агрегат функциялар</b> да солай жасайды: көп жолды алып, бір санға жинақтайды. Менеджердің «қанша клиент бар?», «орташа баға қандай?» деген сұрақтарының бәрі осылай шешіледі. Excel-дегі <code>COUNT</code>, <code>SUM</code>, <code>AVERAGE</code> формулаларымен бірдей.</p>
<table>
<tr><th>Функция</th><th>Не қайтарады</th></tr>
<tr><td><code>COUNT(*)</code></td><td>жолдар саны</td></tr>
<tr><td><code>COUNT(col)</code></td><td>NULL емес мәндер саны</td></tr>
<tr><td><code>SUM(col)</code></td><td>қосынды</td></tr>
<tr><td><code>AVG(col)</code></td><td>орташа</td></tr>
<tr><td><code>MIN(col)</code>, <code>MAX(col)</code></td><td>ең кіші, ең үлкен</td></tr>
</table>
<h3>Мысал: бір сұрауда бірнеше функция</h3>
<p><code>products</code> кестесінде тек 4 тауар бар деп елестетейік:</p>
<table>
<tr><th>id</th><th>name</th><th>category</th><th>price</th></tr>
<tr><td>2</td><td>Құлаққап</td><td>Электроника</td><td>25000</td></tr>
<tr><td>4</td><td>Кітап: SQL негіздері</td><td>Кітаптар</td><td>6500</td></tr>
<tr><td>7</td><td>Термос</td><td>Аксессуарлар</td><td>9000</td></tr>
<tr><td>9</td><td>Блокнот</td><td>Кеңсе</td><td>1200</td></tr>
</table>
<pre><code>SELECT COUNT(*)   AS n,
       SUM(price) AS total,
       AVG(price) AS avg_price,
       MAX(price) AS max_price
FROM products;</code></pre>
<p>Нәтиже — 4 жол емес, <b>бір жол</b>. Бағандар SELECT-те жазылған ретпен шығады:</p>
<table>
<tr><th>n</th><th>total</th><th>avg_price</th><th>max_price</th></tr>
<tr><td>4</td><td>41700</td><td>10425</td><td>25000</td></tr>
</table>
<p>Есептеу: 25000 + 6500 + 9000 + 1200 = 41700, ал 41700 / 4 = 10425. Агрегатты <code>WHERE</code>-пен бірге қолдануға болады: алдымен жолдар сүзіледі, сосын қалғаны жинақталады:</p>
<pre><code>SELECT COUNT(*) AS n, AVG(price) AS avg_price
FROM products
WHERE category = 'Электроника';</code></pre>
<h3>COUNT-тың үш түрі</h3>
<p>Төрт клиент: Айгерім (Алматы), Ержан (Алматы), Бауыржан (қаласы <code>NULL</code>), Жанар (Ақтөбе).</p>
<table>
<tr><th>Өрнек</th><th>Нәтиже</th><th>Неге</th></tr>
<tr><td><code>COUNT(*)</code></td><td>4</td><td>барлық жол</td></tr>
<tr><td><code>COUNT(city)</code></td><td>3</td><td>NULL саналмайды</td></tr>
<tr><td><code>COUNT(DISTINCT city)</code></td><td>2</td><td>Алматы, Ақтөбе</td></tr>
</table>
<h3>Жиі қателер</h3>
<ul>
<li><b>COUNT пен SUM-ды шатастыру.</b> <code>COUNT(quantity)</code> — қанша жол бар, ал <code>SUM(quantity)</code> — барлық дананың қосындысы. Бір жолда 5 блокнот болса, COUNT оны 1 деп, SUM 5 деп санайды.</li>
<li><b>Агрегат пен қарапайым бағанды араластыру:</b> <code>SELECT name, MAX(price)</code>. Мұндай сұрауда <code>name</code> қай жолдан алынатыны түсініксіз. Ең қымбат тауардың атын білу үшін <code>ORDER BY price DESC LIMIT 1</code> жазыңыз, ал «әр топ үшін» есептеу — келесі сабақтағы GROUP BY.</li>
<li><b>NULL-ды ұмыту.</b> <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code> NULL мәндерді елемейді. Сондықтан <code>AVG</code> бос мәндерді нөл деп санамайды.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Дерекқорда қанша клиент бар? Бір санды шығарыңыз.', starter: '', solution: 'SELECT COUNT(*) FROM customers;', hints: ['<code>COUNT(*)</code>'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Тауарлардың ең арзан бағасын, ең қымбат бағасын және орташа бағасын бір жолда, осы ретпен шығарыңыз.', starter: '', solution: 'SELECT MIN(price), MAX(price), AVG(price) FROM products;', hints: ['Бір SELECT ішінде үш функция: <code>MIN, MAX, AVG</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Барлық тапсырыстарда барлығы қанша дана тауар сатылды? (<code>order_items.quantity</code> қосындысы)', starter: '', solution: 'SELECT SUM(quantity) FROM order_items;', hints: ['<code>SUM(quantity)</code>'] }
      ]
    },
    {
      id: 'sql-8', title: 'GROUP BY және HAVING', minutes: 12,
      body: `
<p>Өткен сабақта агрегат бүкіл кестеге бір сан берді. Ал «<b>әр</b> қалада қанша клиент?» деген сұраққа бір сан жетпейді. Үстелдегі чектерді қала бойынша үйінділерге бөліп, әр үйіндіні бөлек санайтыныңызды елестетіңіз. <code>GROUP BY</code> дәл осылай жасайды: жолдарды топтарға бөліп, әр топқа агрегат есептейді. Excel-дегі pivot table-мен бірдей.</p>
<h3>Мысал: әр қаладағы клиенттер</h3>
<table>
<tr><th>id</th><th>name</th><th>city</th></tr>
<tr><td>1</td><td>Айгерім</td><td>Алматы</td></tr>
<tr><td>2</td><td>Нұрлан</td><td>Астана</td></tr>
<tr><td>4</td><td>Ержан</td><td>Алматы</td></tr>
<tr><td>6</td><td>Тимур</td><td>Астана</td></tr>
<tr><td>7</td><td>Әсем</td><td>Алматы</td></tr>
</table>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city;</code></pre>
<p>SQL алдымен екі топ құрады: «Алматы» (Айгерім, Ержан, Әсем) және «Астана» (Нұрлан, Тимур). Сосын әр топтағы жолдарды санайды. Нәтижеде әр топқа <b>бір жол</b>:</p>
<table>
<tr><th>city</th><th>customers</th></tr>
<tr><td>Алматы</td><td>3</td></tr>
<tr><td>Астана</td><td>2</td></tr>
</table>
<p>SELECT-ке бірнеше агрегат қатар жазуға болады, мысалы <code>COUNT(*)</code> пен <code>AVG(price)</code> бірге — әр топ үшін екеуі де есептеледі.</p>
<p>Ереже: SELECT-тегі агрегат емес әр баған GROUP BY-да да болуы керек.</p>
<h3>HAVING: топтарды сүзу</h3>
<p><code>WHERE</code> топтауға дейін <b>жолдарды</b> сүзеді. <code>HAVING</code> топтаудан кейін <b>топтарды</b> сүзеді. Сондықтан агрегат бойынша шарт (<code>COUNT(*)</code>, <code>AVG(price)</code>) тек HAVING-те жазылады. Жоғарыдағы кестеден кемінде 3 клиенті бар қалаларды ғана қалдырайық:</p>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
HAVING COUNT(*) &gt;= 3;</code></pre>
<table>
<tr><th>city</th><th>customers</th></tr>
<tr><td>Алматы</td><td>3</td></tr>
</table>
<p>Астана тобында 2 жол, шарт орындалмады, сондықтан ол алынып тасталды. Тағы бір мысал — орташа бағасы 10 000-нан жоғары санаттар:</p>
<pre><code>SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) &gt; 10000;</code></pre>
<p>Толық реті: <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code>.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Агрегатты WHERE-ге жазу:</b> <code>WHERE COUNT(*) &gt; 1</code> қате береді. WHERE кезінде топтар әлі жоқ — HAVING қолданыңыз.</li>
<li><b>GROUP BY-ды ұмыту.</b> <code>SELECT city, COUNT(*) FROM customers</code> әр қалаға емес, бүкіл кестеге бір жол қайтарады.</li>
<li><b>NULL тобын байқамау.</b> <code>city</code> бос жолдар бөлек <code>NULL</code> тобына жиналады. Ол керек болмаса, <code>WHERE city IS NOT NULL</code> қосыңыз.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Әр қала бойынша клиенттер санын шығарыңыз: <code>city</code> және сан.', starter: '', solution: 'SELECT city, COUNT(*) FROM customers GROUP BY city;', hints: ['<code>GROUP BY city</code>'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр санат (<code>category</code>) үшін тауарлар саны мен орташа бағасын шығарыңыз.', starter: '', solution: 'SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category;', hints: ['Үш баған: category, COUNT(*), AVG(price).'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Бірден көп тапсырыс жасаған клиенттердің <code>customer_id</code> мен тапсырыс санын шығарыңыз.', starter: '', solution: 'SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;', check: { mustInclude: ['HAVING'] }, hints: ['Алдымен <code>orders</code>-ты <code>customer_id</code> бойынша топтаңыз.', 'Топтарды сүзу: <code>HAVING COUNT(*) > 1</code>.'] }
      ]
    },
    {
      id: 'sql-9', title: 'CASE WHEN: шартты бағандар', minutes: 10,
      body: `
<p>Мұғалім жұмыстарды тексергенде әр ұпайға баға қояды: 85-тен жоғары болса «5», 70-тен жоғары болса «4», әйтпесе «3». <code>CASE</code> — SQL-дегі дәл осындай «егер ... онда ...». Ол әр жол үшін шартты тексеріп, жаңа баған жасайды. Excel-дегі <code>IF</code> формуласына ұқсайды, бірақ бірнеше шартты қатар жазу оңай.</p>
<pre><code>CASE
  WHEN шарт1 THEN мән1
  WHEN шарт2 THEN мән2
  ELSE қалғандарына мән
END AS жаңа_баған</code></pre>
<p>Шарттар <b>жоғарыдан төмен</b> тексеріледі, бірінші орындалғаны алынады да, қалғандары қаралмайды.</p>
<h3>Мысал: бағаны деңгейге бөлу</h3>
<table>
<tr><th>name</th><th>price</th></tr>
<tr><td>Ноутбук</td><td>350000</td></tr>
<tr><td>Құлаққап</td><td>25000</td></tr>
<tr><td>Термос</td><td>9000</td></tr>
<tr><td>Үстел шамы</td><td>8000</td></tr>
<tr><td>Блокнот</td><td>1200</td></tr>
</table>
<pre><code>SELECT name, price,
  CASE
    WHEN price &gt;= 20000 THEN 'жоғары'
    WHEN price &gt;= 5000 THEN 'орта'
    ELSE 'төмен'
  END AS level
FROM products;</code></pre>
<table>
<tr><th>name</th><th>price</th><th>level</th></tr>
<tr><td>Ноутбук</td><td>350000</td><td>жоғары</td></tr>
<tr><td>Құлаққап</td><td>25000</td><td>жоғары</td></tr>
<tr><td>Термос</td><td>9000</td><td>орта</td></tr>
<tr><td>Үстел шамы</td><td>8000</td><td>орта</td></tr>
<tr><td>Блокнот</td><td>1200</td><td>төмен</td></tr>
</table>
<p>Термосты қарайық: 9000 ≥ 20000 емес, бірінші шарт өтпеді. 9000 ≥ 5000 — екінші шарт өтті, сондықтан «орта». Блокнотқа ешбір шарт келмеді, ол <code>ELSE</code>-ке түсті.</p>
<p>Шарт мәтінмен де жазылады: <code>WHEN city = 'Алматы' THEN 'Алматы' ELSE 'өңірлер'</code>. Мәтін әрқашан жалғыз тырнақшада болады.</p>
<h3>CASE + GROUP BY</h3>
<p>CASE-ке alias беріп, сол alias бойынша топтасаңыз, өз сегменттеріңіз бойынша санай аласыз:</p>
<pre><code>SELECT
  CASE
    WHEN price &gt;= 20000 THEN 'жоғары'
    WHEN price &gt;= 5000 THEN 'орта'
    ELSE 'төмен'
  END AS level,
  COUNT(*) AS n
FROM products
GROUP BY level;</code></pre>
<table>
<tr><th>level</th><th>n</th></tr>
<tr><td>жоғары</td><td>2</td></tr>
<tr><td>орта</td><td>2</td></tr>
<tr><td>төмен</td><td>1</td></tr>
</table>
<p>SQL алдымен әр жолға деңгей береді (жоғарыдағы кесте), сосын бірдей деңгейдегі жолдарды бір топқа жинап, санайды. Шартта бір ғана мәнді тексеріп, қалғанының бәрін <code>ELSE</code>-пен бір топқа жинауға да болады — сонда нәтижеде екі топ қана болады. Alias бойынша GROUP BY SQLite пен PostgreSQL-де жұмыс істейді; кейбір дерекқорларда CASE өрнегін GROUP BY-ға толық қайта жазу керек.</p>
<div class="tip"><b>Жиі қателер:</b>
<ul>
<li><b>Шарттардың реті.</b> <code>WHEN price &gt;= 5000</code> бірінші тұрса, Ноутбук та «орта» болып кетеді. Үлкен шекарадан бастаңыз.</li>
<li><b>ELSE-ті ұмыту.</b> ELSE болмаса, ешбір шартқа келмеген жолдар <code>NULL</code> алады.</li>
<li><b>END-ті ұмыту</b> немесе үтірді қате қою. CASE ... END — бір баған, одан кейін үтір қойылады.</li>
</ul></div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр тауардың атауын, бағасын және <code>segment</code> бағанын шығарыңыз: 100 000 және жоғары — <code>қымбат</code>, 10 000 және жоғары — <code>орташа</code>, қалғаны — <code>арзан</code>.', starter: "SELECT name, price,\n  CASE\n    WHEN price >= 100000 THEN 'қымбат'\n    \n  END AS segment\nFROM products;", solution: "SELECT name, price, CASE WHEN price >= 100000 THEN 'қымбат' WHEN price >= 10000 THEN 'орташа' ELSE 'арзан' END AS segment FROM products;", hints: ["Екінші шарт: <code>WHEN price >= 10000 THEN 'орташа'</code>", "Соңында: <code>ELSE 'арзан'</code>"] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: "Тапсырыстарды екі топқа бөліп санаңыз: <code>delivered</code> болса <code>'жеткізілді'</code>, әйтпесе <code>'басқа'</code>. Бағандар: топ атауы және саны.", starter: '', solution: "SELECT CASE WHEN status = 'delivered' THEN 'жеткізілді' ELSE 'басқа' END AS grp, COUNT(*) FROM orders GROUP BY grp;", hints: ['CASE өрнегіне alias беріп, сол alias бойынша GROUP BY жасаңыз.'] }
      ]
    },
    {
      id: 'sql-10', title: 'JOIN: кестелерді біріктіру', minutes: 14,
      body: `
<p>Деректер бірнеше кестеге бөлінген: тапсырыста тек <code>customer_id</code> бар, ал клиенттің аты <code>customers</code> кестесінде. Курьерді елестетіңіз: оның қолында «3-клиентке жеткізу» деген қағаз бар, ал аты-жөнін білу үшін ол клиенттер дәптерінен 3 нөмірін іздейді. <code>JOIN</code> осы іздеуді әр жол үшін автоматты жасайды. Excel-дегі XLOOKUP-қа ұқсайды, бірақ бірден бүкіл кестеге.</p>
<h3>Мысал: тапсырысқа клиент атын қосу</h3>
<p><code>orders</code>:</p>
<table>
<tr><th>id</th><th>customer_id</th><th>order_date</th></tr>
<tr><td>101</td><td>1</td><td>2024-08-02</td></tr>
<tr><td>102</td><td>2</td><td>2024-08-05</td></tr>
<tr><td>103</td><td>1</td><td>2024-08-19</td></tr>
</table>
<p><code>customers</code>:</p>
<table>
<tr><th>id</th><th>name</th></tr>
<tr><td>1</td><td>Айгерім</td></tr>
<tr><td>2</td><td>Нұрлан</td></tr>
<tr><td>3</td><td>Дана</td></tr>
</table>
<pre><code>SELECT o.id, c.name, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id;</code></pre>
<table>
<tr><th>id</th><th>name</th><th>order_date</th></tr>
<tr><td>101</td><td>Айгерім</td><td>2024-08-02</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>2024-08-05</td></tr>
<tr><td>103</td><td>Айгерім</td><td>2024-08-19</td></tr>
</table>
<p>Әр тапсырыс үшін SQL <code>customers</code> ішінен <code>id</code>-і <code>customer_id</code>-ге тең жолды тапты. Айгерімнің екі тапсырысы бар, сондықтан оның аты екі рет шықты.</p>
<p><code>ON</code> — қай бағандар арқылы байланысатынын көрсетеді. Әдетте бұл <b>foreign key</b> (<code>orders.customer_id</code>) мен <b>primary key</b> (<code>customers.id</code>).</p>
<h3>INNER JOIN</h3>
<p><code>JOIN</code> = <code>INNER JOIN</code>: екі кестеде де сәйкесі бар жолдар ғана қалады. Тапсырыс жасамаған клиент нәтижеге кірмейді — мысалдағы Дана жоқ.</p>
<p>JOIN-нан кейін әдеттегідей <code>WHERE</code>, <code>ORDER BY</code>, <code>GROUP BY</code> жаза бересіз. Мысалы, тек Айгерімнің тапсырыстары: <code>... JOIN ... ON ... WHERE c.name = 'Айгерім'</code>.</p>
<div class="tip">Екі кестеде бірдей атаулы баған болса (мысалы <code>id</code>, <code>name</code>), кесте атауын немесе alias-ты міндетті түрде жазыңыз: <code>c.name</code>, <code>p.name</code>.</div>
<h3>Табысты есептеу</h3>
<p>Тапсырыс табысы = дана × баға. Дана саны <code>order_items</code>-та, баға <code>products</code>-та, сондықтан оларды біріктіреміз:</p>
<pre><code>SELECT oi.order_id, SUM(oi.quantity * p.price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY oi.order_id;</code></pre>
<p>JOIN-нан кейін, топтауға дейін аралық кесте былай көрінеді:</p>
<table>
<tr><th>order_id</th><th>product</th><th>quantity</th><th>price</th><th>quantity × price</th></tr>
<tr><td>101</td><td>Ноутбук</td><td>1</td><td>350000</td><td>350000</td></tr>
<tr><td>101</td><td>Құлаққап</td><td>1</td><td>25000</td><td>25000</td></tr>
<tr><td>102</td><td>Кітап: SQL негіздері</td><td>2</td><td>6500</td><td>13000</td></tr>
<tr><td>102</td><td>Блокнот</td><td>5</td><td>1200</td><td>6000</td></tr>
</table>
<p>GROUP BY әр тапсырыстың жолдарын қосады:</p>
<table>
<tr><th>order_id</th><th>revenue</th></tr>
<tr><td>101</td><td>375000</td></tr>
<tr><td>102</td><td>19000</td></tr>
</table>
<h3>Жиі қателер</h3>
<ul>
<li><b>ON-ды қате бағанмен жазу:</b> <code>ON o.id = c.id</code>. Тапсырыс нөмірі клиент нөмірі емес! Байланыс әрқашан foreign key → primary key: <code>o.customer_id = c.id</code>.</li>
<li><b>ON-ды ұмыту.</b> Шартсыз JOIN әр жолды екінші кестенің әр жолымен жұптайды: 15 × 10 = 150 жол шығады.</li>
<li><b>Ретті шатастыру.</b> <code>WHERE</code> JOIN-нан бұрын емес, кейін жазылады: <code>FROM → JOIN ... ON → WHERE → GROUP BY</code>.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр тапсырыстың <code>id</code>, клиенттің атын және тапсырыс күнін шығарыңыз.', starter: 'SELECT o.id, c.name, o.order_date\nFROM orders o\nJOIN ', solution: 'SELECT o.id, c.name, o.order_date FROM orders o JOIN customers c ON o.customer_id = c.id;', check: { mustInclude: ['JOIN'] }, hints: ['<code>JOIN customers c ON o.customer_id = c.id</code>'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '105-тапсырыстағы тауарлардың атауы мен санын (<code>quantity</code>) шығарыңыз.', starter: '', solution: 'SELECT p.name, oi.quantity FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = 105;', check: { mustInclude: ['JOIN'] }, hints: ['<code>order_items</code> мен <code>products</code> біріктіріңіз.', 'Сүзгі: <code>WHERE oi.order_id = 105</code>'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Әр тапсырыстың табысын есептеңіз: <code>order_id</code> және <code>quantity × price</code> қосындысы.', starter: '', solution: 'SELECT oi.order_id, SUM(oi.quantity * p.price) FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY oi.order_id;', check: { mustInclude: ['JOIN', 'GROUP BY'] }, hints: ['Сабақтағы соңғы мысалды қараңыз.'] }
      ]
    },
    {
      id: 'sql-11', title: 'LEFT JOIN және бірнеше JOIN', minutes: 14,
      body: `
<p>Сынып журналын елестетіңіз: оқушылардың тізімі толық тұрады, ал сабаққа келмеген оқушының бағасы бос қалады. Оны тізімнен ешкім өшірмейді. <code>LEFT JOIN</code> дәл осылай жұмыс істейді: сол жақ кестенің <b>барлық</b> жолын сақтайды. Оң жақта сәйкесі болмаса, оның бағандары <code>NULL</code> болады. Ал INNER JOIN мұндай «келмеген оқушыны» тізімнен алып тастар еді.</p>
<h3>Мысал: клиенттер мен олардың тапсырыстары</h3>
<p><code>customers</code>: 1 Айгерім, 2 Нұрлан, 8 Бауыржан. <code>orders</code>: 101 (клиент 1), 102 (клиент 2), 103 (клиент 1).</p>
<pre><code>SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;</code></pre>
<table>
<tr><th>name</th><th>order_id</th></tr>
<tr><td>Айгерім</td><td>101</td></tr>
<tr><td>Айгерім</td><td>103</td></tr>
<tr><td>Нұрлан</td><td>102</td></tr>
<tr><td>Бауыржан</td><td>NULL</td></tr>
</table>
<p>Бауыржанның тапсырысы жоқ, бірақ ол нәтижеде қалды, ал <code>order_id</code> бос. INNER JOIN болса, бұл жол мүлдем болмас еді.</p>
<p>Бұл «ешқашан тапсырыс бермеген клиенттер» сияқты сұрақтарға жауап береді: <code>NULL</code> қалған жолдарды <code>WHERE o.id IS NULL</code> арқылы сүземіз. Жоғарыдағы мысалда тек Бауыржан қалады.</p>
<h3>LEFT JOIN-нан кейін санау</h3>
<p>Әр клиенттің тапсырыс санын GROUP BY арқылы есептесек, екі әдістің айырмашылығы көрінеді:</p>
<table>
<tr><th>name</th><th>COUNT(*)</th><th>COUNT(o.id)</th></tr>
<tr><td>Айгерім</td><td>2</td><td>2</td></tr>
<tr><td>Нұрлан</td><td>1</td><td>1</td></tr>
<tr><td>Бауыржан</td><td>1 (қате)</td><td>0 (дұрыс)</td></tr>
</table>
<p><code>COUNT(*)</code> Бауыржанның NULL жолын да санайды. <code>COUNT(o.id)</code> NULL-ды санамайды, сондықтан дұрыс 0 береді. Топтағанда <code>c.id</code>-ді де қосыңыз: аттары бірдей екі клиент бір топқа бірігіп кетпейді.</p>
<h3>JOIN түрлері</h3>
<table>
<tr><th>Түрі</th><th>Не қалады</th></tr>
<tr><td>INNER JOIN</td><td>тек екі жақта да сәйкесі барлар</td></tr>
<tr><td>LEFT JOIN</td><td>сол жақтың бәрі + оң жақтан сәйкестері</td></tr>
<tr><td>RIGHT JOIN</td><td>оң жақтың бәрі + сол жақтан сәйкестері</td></tr>
<tr><td>FULL JOIN</td><td>екі жақтың да бәрі</td></tr>
</table>
<h3>Бірнеше JOIN</h3>
<p>JOIN-дарды тізбектеп жазуға болады: тапсырыс → клиент, тапсырыс → позициялар → тауар. Әр жаңа JOIN өз <code>ON</code> шартымен бұрын қосылған кестеге жалғанады:</p>
<pre><code>SELECT o.id, c.name, p.name AS product, oi.quantity
FROM orders o
JOIN customers c    ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id;</code></pre>
<table>
<tr><th>id</th><th>name</th><th>product</th><th>quantity</th></tr>
<tr><td>101</td><td>Айгерім</td><td>Ноутбук</td><td>1</td></tr>
<tr><td>101</td><td>Айгерім</td><td>Құлаққап</td><td>1</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>Кітап: SQL негіздері</td><td>2</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>Блокнот</td><td>5</td></tr>
</table>
<p>Енді бір жолда клиенттің қаласы да, тауардың бағасы да, тапсырыс статусы да бар. Осыдан кейін әдеттегідей <code>WHERE</code>, <code>GROUP BY</code>, <code>ORDER BY</code> жазып, кез келген бағанмен сүзуге, топтауға, сұрыптауға болады.</p>
<div class="tip"><b>Жиі қателер:</b>
<ul>
<li>LEFT JOIN-нан кейін санағанда <code>COUNT(*)</code> емес, <code>COUNT(o.id)</code> жазыңыз. Әйтпесе тапсырысы жоқ клиент 0 емес, 1 болып саналады.</li>
<li>LEFT JOIN-нан кейін оң жақ кесте бойынша WHERE жазсаңыз (мысалы <code>WHERE o.status = 'delivered'</code>), NULL жолдар өшіп, LEFT JOIN жай INNER JOIN-ға айналады. Мұндай шартты <code>ON ... AND o.status = 'delivered'</code> ішіне жазыңыз.</li>
<li>Бірнеше JOIN-да <code>ON</code> әлі қосылмаған кестеге сілтесе, қате шығады. Кестелерді байланыс ретімен қосыңыз.</li>
</ul></div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Бірде-бір тапсырыс бермеген клиенттердің атын шығарыңыз.', starter: '', solution: 'SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;', check: { mustInclude: ['LEFT JOIN'] }, hints: ['LEFT JOIN, сосын <code>WHERE o.id IS NULL</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Әр клиенттің аты мен тапсырыс санын шығарыңыз. Тапсырысы жоқтар 0 болып көрінуі керек.', starter: '', solution: 'SELECT c.name, COUNT(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name;', check: { mustInclude: ['LEFT JOIN'] }, hints: ['<code>COUNT(o.id)</code> қолданыңыз.', 'GROUP BY: <code>c.id, c.name</code>'] },
        { type: 'sql', dataset: 'shop', xp: 25, prompt: 'Тек <code>delivered</code> тапсырыстар бойынша әр қаланың табысын (<code>city</code>, табыс) табыстың кемуі бойынша шығарыңыз.', starter: 'SELECT c.city, SUM(oi.quantity * p.price) AS revenue\nFROM orders o\nJOIN customers c ON \nJOIN order_items oi ON \nJOIN products p ON \nWHERE \nGROUP BY \nORDER BY ', solution: "SELECT c.city, SUM(oi.quantity * p.price) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY c.city ORDER BY revenue DESC;", check: { ordered: true }, hints: ['Үш JOIN керек: customers, order_items, products.', "<code>WHERE o.status = 'delivered'</code>, <code>GROUP BY c.city</code>, <code>ORDER BY revenue DESC</code>"] }
      ]
    },
    {
      id: 'sql-12', title: 'Subquery, EXISTS, ANY және ALL', minutes: 14,
      body: `
<p>«Орташадан қымбат тауарлар қайсы?» деген сұрақты екі қадаммен шешесіз: алдымен орташаны есептеп, қағазға жазып қоясыз, сосын сол санмен салыстырасыз. <b>Subquery</b> — сұрау ішіндегі сұрау. Ол осы «қағаздағы санды» SQL-дің өзіне есептетеді. Subquery әрқашан жақшаға алынады, ал SQL алдымен ішкі сұрауды орындайды.</p>
<h3>Бір мән қайтаратын subquery</h3>
<p>Төрт тауар: Құлаққап 25000, Рюкзак 15000, Термос 9000, Блокнот 1200.</p>
<pre><code>SELECT name, price FROM products
WHERE price &gt; (SELECT AVG(price) FROM products);</code></pre>
<p>1-қадам: ішкі сұрау (25000 + 15000 + 9000 + 1200) / 4 = 12550 береді. 2-қадам: сұрау <code>WHERE price &gt; 12550</code> болып орындалады:</p>
<table>
<tr><th>name</th><th>price</th></tr>
<tr><td>Құлаққап</td><td>25000</td></tr>
<tr><td>Рюкзак</td><td>15000</td></tr>
</table>
<p>Неге 12550 санын қолмен жазбаймыз? Деректер өзгергенде орташа да өзгереді, ал subquery әр жолы жаңадан есептейді.</p>
<h3>Тізім қайтаратын subquery + IN</h3>
<pre><code>SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'cancelled');</code></pre>
<p>Ішкі сұрау бас тартылған тапсырыстардың клиенттерін береді: <code>(3, 10)</code>. Сыртқы сұрау <code>WHERE id IN (3, 10)</code> болып, Дана мен Арманды шығарады. Ішкі сұраудағы WHERE кез келген шарт бола алады: <code>=</code>, <code>BETWEEN</code>, күн бойынша <code>LIKE</code> т.б.</p>
<h3>EXISTS</h3>
<p><code>EXISTS</code> ішкі сұрау кемінде бір жол тапса, ақиқат болады. <code>NOT EXISTS</code> — керісінше:</p>
<pre><code>SELECT p.name FROM products p
WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id);</code></pre>
<p>Мұнда ішкі сұрау <b>әр тауар үшін</b> қайта орындалады, өйткені ол сыртқы <code>p.id</code>-ге сілтейді. Ноутбук (id 1) үшін <code>order_items</code>-та жол табылады → EXISTS ақиқат → NOT EXISTS жалған, Ноутбук шықпайды. Үстел шамы (id 11) ешбір тапсырыста жоқ → ол нәтижеге кіреді. <code>SELECT 1</code> — «не қайтарғаны маңызды емес, тек жол бар ма» дегенді білдіреді.</p>
<h3>ANY және ALL</h3>
<p>PostgreSQL сияқты дерекқорларда <code>price &gt; ALL (SELECT ...)</code> «барлығынан үлкен», <code>price &gt; ANY (...)</code> «кемінде біреуінен үлкен» дегенді білдіреді. Біздің браузердегі SQLite оларды қолдамайды, бірақ мағынасы бірдей жазу бар: <code>&gt; ALL</code> = <code>&gt; (SELECT MAX(...))</code>, <code>&gt; ANY</code> = <code>&gt; (SELECT MIN(...))</code>.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Көп мәнді <code>&gt;</code> немесе <code>=</code>-мен салыстыру.</b> Ішкі сұрау тізім қайтарса, <code>IN</code> керек. SQLite бұл жағдайда қате бермей, жай бірінші мәнді алады — нәтиже үнсіз бұрыс болады.</li>
<li><b>NOT IN және NULL.</b> Ішкі тізімде бір <code>NULL</code> болса, <code>NOT IN</code> бос нәтиже береді. Мұндайда <code>NOT EXISTS</code> қауіпсізірек.</li>
<li><b>IN ішінде бірнеше баған.</b> <code>id IN (SELECT customer_id, order_date ...)</code> қате — IN үшін ішкі сұрау бір баған қайтаруы керек.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Бағасы орташа бағадан жоғары тауарлардың атауы мен бағасын шығарыңыз.', starter: '', solution: 'SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products);', check: { mustInclude: ['SELECT AVG'] }, hints: ['Орташаны subquery-мен есептеңіз: <code>(SELECT AVG(price) FROM products)</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '2024 жылғы қарашада тапсырыс берген клиенттердің атын шығарыңыз. <code>IN</code> және subquery қолданыңыз.', starter: '', solution: "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE order_date LIKE '2024-11%');", check: { mustInclude: ['IN'] }, hints: ["Қараша: <code>order_date LIKE '2024-11%'</code>"] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Ешқашан сатылмаған тауарлардың атын <code>NOT EXISTS</code> арқылы табыңыз.', starter: '', solution: 'SELECT p.name FROM products p WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id);', check: { mustInclude: ['EXISTS'] }, hints: ['Сабақтағы EXISTS мысалын қараңыз.'] }
      ]
    },
    {
      id: 'sql-13', title: 'DDL және DML: кесте құру және өзгерту', minutes: 14,
      body: `
<p>Осы уақытқа дейін деректі тек оқыдық. SQL командалары бірнеше топқа бөлінеді:</p>
<table>
<tr><th>Топ</th><th>Командалар</th><th>Не үшін</th></tr>
<tr><td><b>DQL</b></td><td>SELECT</td><td>деректі оқу</td></tr>
<tr><td><b>DDL</b></td><td>CREATE, ALTER, DROP, TRUNCATE</td><td>кесте құрылымын анықтау</td></tr>
<tr><td><b>DML</b></td><td>INSERT, UPDATE, DELETE</td><td>деректі өзгерту</td></tr>
<tr><td><b>TCL</b></td><td>BEGIN, COMMIT, ROLLBACK, SAVEPOINT</td><td>транзакциялар</td></tr>
<tr><td><b>DCL</b></td><td>GRANT, REVOKE</td><td>рұқсаттар</td></tr>
</table>
<h3>CREATE TABLE және шектеулер (constraints)</h3>
<pre><code>CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  hours INTEGER CHECK (hours &gt; 0),
  level TEXT DEFAULT 'beginner'
);</code></pre>
<p><code>PRIMARY KEY</code> — жолдың бірегей идентификаторы. <code>FOREIGN KEY</code> (<code>REFERENCES</code>) — басқа кестеге сілтеме. <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code> — деректің сапасын қорғайды.</p>
<h3>INSERT, UPDATE, DELETE</h3>
<pre><code>INSERT INTO courses (id, title, hours) VALUES (1, 'SQL', 40);
UPDATE products SET price = price * 1.1 WHERE category = 'Кітаптар';
DELETE FROM orders WHERE status = 'cancelled';
ALTER TABLE customers ADD COLUMN phone TEXT;</code></pre>
<div class="tip">UPDATE мен DELETE-ті <b>WHERE-сіз</b> жазсаңыз, бүкіл кесте өзгереді. Жұмыста алдымен сол WHERE-пен SELECT жасап, қай жолдар өзгеретінін тексеріңіз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'empty', xp: 20, prompt: '<code>courses</code> кестесін құрыңыз: <code>id</code> INTEGER PRIMARY KEY, <code>title</code> TEXT NOT NULL, <code>hours</code> INTEGER. Сосын екі жол қосыңыз: (1, \'SQL\', 40) және (2, \'Python\', 50).', starter: 'CREATE TABLE courses (\n  \n);\n\nINSERT INTO courses VALUES ', solution: "CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT NOT NULL, hours INTEGER); INSERT INTO courses VALUES (1, 'SQL', 40), (2, 'Python', 50);", check: { after: 'SELECT * FROM courses ORDER BY id;', ordered: true }, hints: ['Бірнеше жолды бір INSERT-пен қосуға болады: <code>VALUES (...), (...)</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '«Кітаптар» санатындағы тауарлардың бағасын 10%-ға көтеріңіз.', starter: '', solution: "UPDATE products SET price = price * 1.1 WHERE category = 'Кітаптар';", check: { after: 'SELECT id, price FROM products ORDER BY id;', ordered: true }, hints: ["<code>UPDATE products SET price = price * 1.1 WHERE ...</code>"] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Статусы <code>cancelled</code> тапсырыстарды өшіріңіз.', starter: '', solution: "DELETE FROM orders WHERE status = 'cancelled';", check: { after: 'SELECT id FROM orders ORDER BY id;', ordered: true }, hints: ["<code>DELETE FROM orders WHERE status = 'cancelled';</code>"] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '<code>customers</code> кестесіне <code>phone</code> атты TEXT бағанын қосыңыз.', starter: '', solution: 'ALTER TABLE customers ADD COLUMN phone TEXT;', check: { after: "SELECT name, type FROM pragma_table_info('customers');" }, hints: ['<code>ALTER TABLE ... ADD COLUMN ...</code>'] }
      ]
    },
    {
      id: 'sql-14', title: 'Транзакциялар, VIEW және рұқсаттар', minutes: 12,
      body: `
<h3>Транзакция (TCL)</h3>
<p>Транзакция — бірге орындалуы керек командалар тобы. Мысалы аударымда бір шоттан ақша алынып, екіншіге түсуі керек: біреуі ғана орындалса, ақша жоғалады.</p>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 5000 WHERE id = 1;
UPDATE accounts SET balance = balance + 5000 WHERE id = 2;
COMMIT;      -- өзгерістерді бекіту</code></pre>
<p><code>ROLLBACK</code> — транзакция басынан бергі өзгерістерді болдырмау. <code>SAVEPOINT name</code> — ішкі белгі, оған дейін <code>ROLLBACK TO name</code> арқылы қайтуға болады.</p>
<h3>VIEW</h3>
<p><code>VIEW</code> — сақталған сұрау. Ол кесте сияқты оқылады, бірақ дерек сақтамайды:</p>
<pre><code>CREATE VIEW big_orders AS
SELECT * FROM order_items WHERE quantity &gt;= 3;

SELECT * FROM big_orders;</code></pre>
<h3>Рұқсаттар (DCL)</h3>
<p>Серверлік дерекқорларда (PostgreSQL, MySQL) кім не істей алатынын <code>GRANT</code> және <code>REVOKE</code> басқарады:</p>
<pre><code>GRANT SELECT ON orders TO analyst;
REVOKE DELETE ON orders FROM analyst;</code></pre>
<p>SQLite файлдық дерекқор болғандықтан, бұл командалар мұнда жоқ. Аналитикке әдетте тек <code>SELECT</code> рұқсаты беріледі.</p>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '<code>delivered_orders</code> атты VIEW құрыңыз: <code>orders</code> кестесінен тек <code>delivered</code> статусты жолдар (барлық бағандар).', starter: '', solution: "CREATE VIEW delivered_orders AS SELECT * FROM orders WHERE status = 'delivered';", check: { after: 'SELECT * FROM delivered_orders ORDER BY id;', ordered: true }, hints: ['<code>CREATE VIEW delivered_orders AS SELECT ...</code>'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Транзакция бастап, барлық тауардың бағасын 0-ге теңестіріңіз, сосын <b>ROLLBACK</b> жасап, бағалардың қосындысын шығарыңыз. Қосынды бастапқыдай болуы керек.', starter: 'BEGIN;\nUPDATE products SET price = 0;\n\nSELECT SUM(price) FROM products;', solution: 'BEGIN; UPDATE products SET price = 0; ROLLBACK; SELECT SUM(price) FROM products;', check: { mustInclude: ['ROLLBACK'] }, hints: ['UPDATE-тен кейін <code>ROLLBACK;</code> жазыңыз.'] },
        { type: 'quiz', xp: 10, prompt: 'Аналитикке <code>sales</code> кестесін тек оқуға рұқсат беру керек. Қай команда?', options: ['REVOKE SELECT ON sales FROM analyst;', 'GRANT SELECT ON sales TO analyst;', 'GRANT ALL ON sales TO analyst;', 'COMMIT sales;'], answer: 1, explain: 'GRANT SELECT тек оқу құқығын береді. GRANT ALL тым көп рұқсат.' }
      ]
    },
    {
      id: 'sql-gate', gate: true, title: 'Модуль емтиханы: SQL Core', minutes: 25,
      body: `
<p>Бұл — модульдің қорытынды тексерісі. Тапсырмалар әр сабақтан араласып келеді, кеңес жоқ. Барлығын орындасаңыз, модуль аяқталады және <b>L2 SQL Practitioner</b> деңгейіне жақындайсыз.</p>
<p>Дерекқор сол: <code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>.</p>
<div class="tip">Асықпаңыз: алдымен «Іске қосу» арқылы аралық нәтижені қарап, сосын тексеріңіз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 30, prompt: 'Тек <code>delivered</code> тапсырыстар бойынша ең көп ақша жұмсаған 3 клиенттің атын және жалпы сомасын, кему ретімен шығарыңыз.', starter: '', solution: "SELECT c.name, SUM(oi.quantity * p.price) AS total FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY total DESC LIMIT 3;", check: { ordered: true }, hints: [] },
        { type: 'sql', dataset: 'shop', xp: 30, prompt: 'Әр ай үшін (<code>YYYY-MM</code> форматында) тапсырыс берген қайталанбайтын клиенттер санын, айлар бойынша өсу ретімен шығарыңыз. Кеңес: <code>substr(order_date, 1, 7)</code>.', starter: '', solution: 'SELECT substr(order_date, 1, 7) AS month, COUNT(DISTINCT customer_id) FROM orders GROUP BY month ORDER BY month;', check: { ordered: true }, hints: [] },
        { type: 'sql', dataset: 'shop', xp: 30, prompt: 'Барлығы кемінде 3 дана сатылған тауарлардың атауы мен жалпы сатылған санын шығарыңыз.', starter: '', solution: 'SELECT p.name, SUM(oi.quantity) FROM products p JOIN order_items oi ON oi.product_id = p.id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 3;', hints: [] },
        { type: 'quiz', xp: 20, prompt: '<code>customers c LEFT JOIN orders o ... WHERE o.status = \'delivered\'</code> сұрауында тапсырысы жоқ клиенттер нәтижеде бола ма?', options: ['Иә, NULL мәнімен', 'Жоқ: WHERE шарты NULL жолдарды алып тастайды, сондықтан бұл INNER JOIN сияқты жұмыс істейді', 'Тек бір рет', 'Қате шығады'], answer: 1, explain: 'NULL = \'delivered\' ақиқат емес. Шартты ON ішіне жазсаңыз ғана LEFT JOIN барлық клиентті сақтайды.' }
      ]
    }
  ]
};
