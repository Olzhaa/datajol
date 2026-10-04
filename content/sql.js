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
<p>Агрегат функциялар көп жолды бір санға жинақтайды:</p>
<table>
<tr><th>Функция</th><th>Не қайтарады</th></tr>
<tr><td><code>COUNT(*)</code></td><td>жолдар саны</td></tr>
<tr><td><code>COUNT(col)</code></td><td>NULL емес мәндер саны</td></tr>
<tr><td><code>SUM(col)</code></td><td>қосынды</td></tr>
<tr><td><code>AVG(col)</code></td><td>орташа</td></tr>
<tr><td><code>MIN(col)</code>, <code>MAX(col)</code></td><td>ең кіші, ең үлкен</td></tr>
</table>
<pre><code>SELECT COUNT(*) AS n, AVG(price) AS avg_price
FROM products
WHERE category = 'Электроника';</code></pre>
<p><code>COUNT(DISTINCT city)</code> — қайталанбайтын мәндер саны.</p>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Дерекқорда қанша клиент бар? Бір санды шығарыңыз.', starter: '', solution: 'SELECT COUNT(*) FROM customers;', hints: ['<code>COUNT(*)</code>'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Тауарлардың ең арзан бағасын, ең қымбат бағасын және орташа бағасын бір жолда, осы ретпен шығарыңыз.', starter: '', solution: 'SELECT MIN(price), MAX(price), AVG(price) FROM products;', hints: ['Бір SELECT ішінде үш функция: <code>MIN, MAX, AVG</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Барлық тапсырыстарда барлығы қанша дана тауар сатылды? (<code>order_items.quantity</code> қосындысы)', starter: '', solution: 'SELECT SUM(quantity) FROM order_items;', hints: ['<code>SUM(quantity)</code>'] }
      ]
    },
    {
      id: 'sql-8', title: 'GROUP BY және HAVING', minutes: 12,
      body: `
<p><code>GROUP BY</code> жолдарды топтарға бөліп, әр топқа агрегат есептейді. «Әр қалада қанша клиент?» деген сұрақ осылай жазылады:</p>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city;</code></pre>
<p>Ереже: SELECT-тегі агрегат емес әр баған GROUP BY-да да болуы керек.</p>
<h3>HAVING</h3>
<p><code>WHERE</code> топтауға дейін жолдарды сүзеді. <code>HAVING</code> топтаудан кейін топтарды сүзеді:</p>
<pre><code>SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) &gt; 10000;</code></pre>
<p>Толық реті: <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code>.</p>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Әр қала бойынша клиенттер санын шығарыңыз: <code>city</code> және сан.', starter: '', solution: 'SELECT city, COUNT(*) FROM customers GROUP BY city;', hints: ['<code>GROUP BY city</code>'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр санат (<code>category</code>) үшін тауарлар саны мен орташа бағасын шығарыңыз.', starter: '', solution: 'SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category;', hints: ['Үш баған: category, COUNT(*), AVG(price).'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Бірден көп тапсырыс жасаған клиенттердің <code>customer_id</code> мен тапсырыс санын шығарыңыз.', starter: '', solution: 'SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;', check: { mustInclude: ['HAVING'] }, hints: ['Алдымен <code>orders</code>-ты <code>customer_id</code> бойынша топтаңыз.', 'Топтарды сүзу: <code>HAVING COUNT(*) > 1</code>.'] }
      ]
    },
    {
      id: 'sql-9', title: 'CASE WHEN: шартты бағандар', minutes: 10,
      body: `
<p><code>CASE</code> — SQL-дегі «егер ... онда ...». Ол мәндерді санаттарға бөлуге көмектеседі:</p>
<pre><code>SELECT name, price,
  CASE
    WHEN price &gt;= 100000 THEN 'қымбат'
    WHEN price &gt;= 10000 THEN 'орташа'
    ELSE 'арзан'
  END AS segment
FROM products;</code></pre>
<p>Шарттар жоғарыдан төмен тексеріледі, бірінші орындалғаны алынады. CASE-ті GROUP BY-мен бірге қолданып, өз сегменттеріңіз бойынша санауға болады.</p>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр тауардың атауын, бағасын және <code>segment</code> бағанын шығарыңыз: 100 000 және жоғары — <code>қымбат</code>, 10 000 және жоғары — <code>орташа</code>, қалғаны — <code>арзан</code>.', starter: "SELECT name, price,\n  CASE\n    WHEN price >= 100000 THEN 'қымбат'\n    \n  END AS segment\nFROM products;", solution: "SELECT name, price, CASE WHEN price >= 100000 THEN 'қымбат' WHEN price >= 10000 THEN 'орташа' ELSE 'арзан' END AS segment FROM products;", hints: ["Екінші шарт: <code>WHEN price >= 10000 THEN 'орташа'</code>", "Соңында: <code>ELSE 'арзан'</code>"] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: "Тапсырыстарды екі топқа бөліп санаңыз: <code>delivered</code> болса <code>'жеткізілді'</code>, әйтпесе <code>'басқа'</code>. Бағандар: топ атауы және саны.", starter: '', solution: "SELECT CASE WHEN status = 'delivered' THEN 'жеткізілді' ELSE 'басқа' END AS grp, COUNT(*) FROM orders GROUP BY grp;", hints: ['CASE өрнегіне alias беріп, сол alias бойынша GROUP BY жасаңыз.'] }
      ]
    },
    {
      id: 'sql-10', title: 'JOIN: кестелерді біріктіру', minutes: 14,
      body: `
<p>Деректер бірнеше кестеге бөлінген: тапсырыста тек <code>customer_id</code> бар, ал клиенттің аты <code>customers</code> кестесінде. Оларды <code>JOIN</code> біріктіреді.</p>
<pre><code>SELECT o.id, c.name, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id;</code></pre>
<p><code>ON</code> — қай бағандар арқылы байланысатынын көрсетеді. Әдетте бұл <b>foreign key</b> (<code>orders.customer_id</code>) мен <b>primary key</b> (<code>customers.id</code>).</p>
<h3>INNER JOIN</h3>
<p><code>JOIN</code> = <code>INNER JOIN</code>: екі кестеде де сәйкесі бар жолдар ғана қалады. Тапсырыс жасамаған клиент нәтижеге кірмейді.</p>
<div class="tip">Екі кестеде бірдей атаулы баған болса (мысалы <code>id</code>, <code>name</code>), кесте атауын немесе alias-ты міндетті түрде жазыңыз: <code>c.name</code>, <code>p.name</code>.</div>
<h3>Табысты есептеу</h3>
<p>Тапсырыс табысы = дана × баға. Ол үшін <code>order_items</code> мен <code>products</code> біріктіріледі:</p>
<pre><code>SELECT oi.order_id, SUM(oi.quantity * p.price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY oi.order_id;</code></pre>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр тапсырыстың <code>id</code>, клиенттің атын және тапсырыс күнін шығарыңыз.', starter: 'SELECT o.id, c.name, o.order_date\nFROM orders o\nJOIN ', solution: 'SELECT o.id, c.name, o.order_date FROM orders o JOIN customers c ON o.customer_id = c.id;', check: { mustInclude: ['JOIN'] }, hints: ['<code>JOIN customers c ON o.customer_id = c.id</code>'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '105-тапсырыстағы тауарлардың атауы мен санын (<code>quantity</code>) шығарыңыз.', starter: '', solution: 'SELECT p.name, oi.quantity FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = 105;', check: { mustInclude: ['JOIN'] }, hints: ['<code>order_items</code> мен <code>products</code> біріктіріңіз.', 'Сүзгі: <code>WHERE oi.order_id = 105</code>'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Әр тапсырыстың табысын есептеңіз: <code>order_id</code> және <code>quantity × price</code> қосындысы.', starter: '', solution: 'SELECT oi.order_id, SUM(oi.quantity * p.price) FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY oi.order_id;', check: { mustInclude: ['JOIN', 'GROUP BY'] }, hints: ['Сабақтағы соңғы мысалды қараңыз.'] }
      ]
    },
    {
      id: 'sql-11', title: 'LEFT JOIN және бірнеше JOIN', minutes: 14,
      body: `
<p><code>LEFT JOIN</code> сол жақ кестенің <b>барлық</b> жолын сақтайды. Оң жақта сәйкесі болмаса, оның бағандары <code>NULL</code> болады.</p>
<pre><code>SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;</code></pre>
<p>Бұл «ешқашан тапсырыс бермеген клиенттер» сияқты сұрақтарға жауап береді: <code>WHERE o.id IS NULL</code>.</p>
<h3>JOIN түрлері</h3>
<table>
<tr><th>Түрі</th><th>Не қалады</th></tr>
<tr><td>INNER JOIN</td><td>тек екі жақта да сәйкесі барлар</td></tr>
<tr><td>LEFT JOIN</td><td>сол жақтың бәрі + оң жақтан сәйкестері</td></tr>
<tr><td>RIGHT JOIN</td><td>оң жақтың бәрі + сол жақтан сәйкестері</td></tr>
<tr><td>FULL JOIN</td><td>екі жақтың да бәрі</td></tr>
</table>
<h3>Бірнеше JOIN</h3>
<p>JOIN-дарды тізбектеп жазуға болады: тапсырыс → клиент, тапсырыс → позициялар → тауар.</p>
<div class="tip">LEFT JOIN-нан кейін санағанда <code>COUNT(*)</code> емес, <code>COUNT(o.id)</code> жазыңыз. Әйтпесе тапсырысы жоқ клиент 0 емес, 1 болып саналады.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Бірде-бір тапсырыс бермеген клиенттердің атын шығарыңыз.', starter: '', solution: 'SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;', check: { mustInclude: ['LEFT JOIN'] }, hints: ['LEFT JOIN, сосын <code>WHERE o.id IS NULL</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Әр клиенттің аты мен тапсырыс санын шығарыңыз. Тапсырысы жоқтар 0 болып көрінуі керек.', starter: '', solution: 'SELECT c.name, COUNT(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name;', check: { mustInclude: ['LEFT JOIN'] }, hints: ['<code>COUNT(o.id)</code> қолданыңыз.', 'GROUP BY: <code>c.id, c.name</code>'] },
        { type: 'sql', dataset: 'shop', xp: 25, prompt: 'Тек <code>delivered</code> тапсырыстар бойынша әр қаланың табысын (<code>city</code>, табыс) табыстың кемуі бойынша шығарыңыз.', starter: 'SELECT c.city, SUM(oi.quantity * p.price) AS revenue\nFROM orders o\nJOIN customers c ON \nJOIN order_items oi ON \nJOIN products p ON \nWHERE \nGROUP BY \nORDER BY ', solution: "SELECT c.city, SUM(oi.quantity * p.price) AS revenue FROM orders o JOIN customers c ON c.id = o.customer_id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY c.city ORDER BY revenue DESC;", check: { ordered: true }, hints: ['Үш JOIN керек: customers, order_items, products.', "<code>WHERE o.status = 'delivered'</code>, <code>GROUP BY c.city</code>, <code>ORDER BY revenue DESC</code>"] }
      ]
    },
    {
      id: 'sql-12', title: 'Subquery, EXISTS, ANY және ALL', minutes: 14,
      body: `
<p><b>Subquery</b> — сұрау ішіндегі сұрау. Ол жақшаға алынады.</p>
<h3>Бір мән қайтаратын subquery</h3>
<pre><code>SELECT name, price FROM products
WHERE price &gt; (SELECT AVG(price) FROM products);</code></pre>
<h3>Тізім қайтаратын subquery + IN</h3>
<pre><code>SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'cancelled');</code></pre>
<h3>EXISTS</h3>
<p><code>EXISTS</code> ішкі сұрау кемінде бір жол тапса, ақиқат болады. <code>NOT EXISTS</code> — керісінше:</p>
<pre><code>SELECT p.name FROM products p
WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id);</code></pre>
<h3>ANY және ALL</h3>
<p>PostgreSQL сияқты дерекқорларда <code>price &gt; ALL (SELECT ...)</code> «барлығынан үлкен», <code>price &gt; ANY (...)</code> «кемінде біреуінен үлкен» дегенді білдіреді. Біздің браузердегі SQLite оларды қолдамайды, бірақ мағынасы бірдей жазу бар: <code>&gt; ALL</code> = <code>&gt; (SELECT MAX(...))</code>, <code>&gt; ANY</code> = <code>&gt; (SELECT MIN(...))</code>.</p>`,
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
