// M1.2 SQL Core + M3.3 Advanced SQL (preview lessons). Dataset: DJ.datasets.shop / staff.
DJ.modules['m1-2'] = {
  intro: 'Бұл модульде онлайн дүкеннің дерекқорымен жұмыс істейсіз: клиенттер, тауарлар, тапсырыстар. Сұрауды оң жақтағы редакторға жазып, «Іске қосу» батырмасымен нәтижені көріңіз, сосын «Тексеру» батырмасын басыңыз.',
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
<p>Тек керекті бағандарды үтірмен бөліп атауға болады:</p>
<pre><code>SELECT name, city FROM customers;</code></pre>
<div class="tip">SQL кілт сөздерін (SELECT, FROM) бас әріппен жазу — дәстүр ғана. <code>select</code> да жұмыс істейді. Сұрау соңындағы <code>;</code> сұрауларды бір-бірінен бөледі.</div>
<h3>Сұрау қалай орындалады?</h3>
<p>Сіз сұрауды жазасыз, дерекқор оны оқып, кестеден жолдарды алып, нәтижені жаңа кесте түрінде қайтарады. Бастапқы кесте өзгермейді: SELECT тек оқиды, сондықтан қорықпай тәжірибе жасай беріңіз.</p>
<h3>Неге <code>*</code>-ны абайлап қолданамыз?</h3>
<ul>
<li>Нақты жұмыста кестеде ондаған, тіпті жүздеген баған болады. <code>SELECT *</code> артық деректі алып, сұрауды баяулатады.</li>
<li>Кейін кестеге жаңа баған қосылса, <code>*</code> нәтижесі өзгеріп кетеді де, есеп бұзылуы мүмкін.</li>
<li>Бағандарды атап жазсаңыз, сұрауды оқыған адам не алынып жатқанын бірден түсінеді.</li>
</ul>
<p>Сондықтан <code>*</code>-ны кестемен алғаш танысқанда қолданыңыз, ал тұрақты сұрауларда бағандарды атаңыз.</p>
<div class="tip">Үлкен кестеге алғаш қарағанда соңына <code>LIMIT 10</code> қосыңыз: дерекқор бүкіл кестені емес, тек 10 жолды қайтарады. Бұл туралы ORDER BY сабағында толығырақ айтамыз.</div>`,
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
<p>Мәтін мен күн <b>бір тырнақшаға</b> алынады: <code>WHERE city = 'Алматы'</code>. Сандар тырнақшасыз: <code>WHERE price = 9000</code>.</p>
<div class="tip">Күндер <code>'2024-09-01'</code> форматында сақталған. Бұл форматты мәтін ретінде салыстыру да дұрыс жұмыс істейді: <code>order_date &gt;= '2024-10-01'</code>.</div>
<h3>WHERE қалай жұмыс істейді?</h3>
<p>Дерекқор шартты кестенің әр жолы үшін тексереді. Шарт <code>TRUE</code> болса, жол нәтижеге кіреді, <code>FALSE</code> немесе белгісіз болса, кірмейді. Сондықтан WHERE ешқашан жаңа жол жасамайды, тек бар жолдарды сүзеді.</p>
<h3>Жиі кездесетін қателер</h3>
<ul>
<li><b>Қос тырнақша</b>: <code>city = "Алматы"</code>. Стандартты SQL-де қос тырнақша баған атауын білдіреді, мәтін үшін бір тырнақша жазыңыз.</li>
<li><b>Регистр</b>: <code>'алматы'</code> мен <code>'Алматы'</code> әртүрлі мәтін. Деректегі жазылуын алдымен <code>SELECT DISTINCT city</code> арқылы қараңыз.</li>
<li><b>Артық бос орын</b>: соңында бос орны бар <code>'Алматы '</code> мәні шартқа сәйкес келмейді. Мұндай мәндерді дерек тазалау модулінде түзетеміз.</li>
<li><b>Санды мәтін ретінде салыстыру</b>: <code>price &gt; '50000'</code> кейбір дерекқорларда мәтін ретінде салыстырылып, күтпеген нәтиже береді. Санды тырнақшасыз жазыңыз.</li>
</ul>
<div class="tip">Шартты тексерудің оңай жолы: алдымен WHERE-сіз сұрау жасап, бірнеше жолды көзбен қараңыз, сосын шартты қосып, жолдар саны күткендей азайғанын тексеріңіз.</div>`,
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
<li><code>NOT</code> — шартты керісінше өзгертеді.</li>
</ul>
<pre><code>SELECT name, price FROM products
WHERE category = 'Электроника' AND price &lt; 100000;</code></pre>
<h3>BETWEEN және IN</h3>
<p><code>BETWEEN a AND b</code> — аралық, шеттерін қоса алғанда. <code>IN (...)</code> — тізімдегі мәндердің біріне тең.</p>
<pre><code>WHERE price BETWEEN 5000 AND 20000
WHERE city IN ('Алматы', 'Шымкент')
WHERE city NOT IN ('Алматы')</code></pre>
<div class="tip">AND пен OR араласса, жақша қойыңыз: <code>WHERE (city = 'Алматы' OR city = 'Астана') AND status = 'delivered'</code>. Жақшасыз AND бірінші орындалады.</div>
<h3>Шарттардың басымдығы</h3>
<p>SQL алдымен <code>NOT</code>, сосын <code>AND</code>, соңында <code>OR</code> операторын орындайды. Мына шарт:</p>
<pre><code>WHERE city = 'Алматы' OR city = 'Астана' AND status = 'delivered'</code></pre>
<p>шын мәнінде <code>city = 'Алматы' OR (city = 'Астана' AND status = 'delivered')</code> деп оқылады: Алматы бойынша кез келген статустағы жолдар шығады. Жақша қою қатені болдырмайды және сұрауды оқуды жеңілдетеді.</p>
<h3>BETWEEN және күндер</h3>
<p><code>BETWEEN</code> екі шетін де қамтиды. Күн мен уақыт бірге сақталса (<code>'2024-09-30 14:00'</code>), <code>BETWEEN '2024-09-01' AND '2024-09-30'</code> 30 қыркүйектегі түстен кейінгі жазбаларды өткізіп жібереді, себебі ол мәтін ретінде <code>'2024-09-30'</code>-дан үлкен. Мұндай жағдайда келесі айдың басымен шектеу сенімдірек:</p>
<pre><code>WHERE order_date &gt;= '2024-09-01' AND order_date &lt; '2024-10-01'</code></pre>
<div class="tip"><code>NOT IN</code> тізімінде NULL болса, шарт ешбір жол үшін орындалмайды. Тізімді қолмен жазғанда NULL қоспаңыз, ал ішкі сұраудан алсаңыз, <code>WHERE ... IS NOT NULL</code> қосыңыз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: '«Электроника» санатындағы, бағасы 100 000-нан төмен тауарлардың атауы мен бағасын шығарыңыз.', starter: '', solution: "SELECT name, price FROM products WHERE category = 'Электроника' AND price < 100000;", hints: ['Екі шартты <code>AND</code> арқылы біріктіріңіз.'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Алматыдан немесе Шымкенттен келген клиенттердің аты мен қаласын шығарыңыз. <code>IN</code> қолданыңыз.', starter: '', solution: "SELECT name, city FROM customers WHERE city IN ('Алматы', 'Шымкент');", check: { mustInclude: ['IN'] }, hints: ["<code>WHERE city IN ('Алматы', 'Шымкент')</code>"] },
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
<div class="tip">Нақты деректе NULL өте жиі кездеседі. Талдау алдында қай бағандарда бос мән бар екенін әрқашан тексеріңіз.</div>
<h3>LIKE туралы қосымша</h3>
<ul>
<li>SQLite-та <code>LIKE</code> латын әріптері үшін регистрге сезімтал емес: <code>'a%'</code> «Apple»-ді де табады. Бірақ кириллицада бұл ереже жұмыс істемейді, «кітап» пен «Кітап» әртүрлі.</li>
<li>Регистрге тәуелсіз іздеу үшін екі жағын да бірдей регистрге келтіріңіз: <code>WHERE LOWER(name) LIKE '%phone%'</code>.</li>
<li>Басында <code>%</code> тұрған үлгі (<code>'%фон'</code>) индексті қолдана алмайды, сондықтан үлкен кестеде баяу жұмыс істейді.</li>
</ul>
<h3>NULL арифметикада және салыстыруда</h3>
<p>NULL-мен кез келген амал NULL береді: <code>5 + NULL</code> = NULL, <code>NULL = NULL</code> да TRUE емес, NULL. Сондықтан <code>WHERE city &lt;&gt; 'Алматы'</code> қаласы бос клиенттерді де көрсетпейді: олар үшін шарт белгісіз.</p>
<p>Бос мәнді басқа мәнмен алмастыру үшін <code>COALESCE</code> бар:</p>
<pre><code>SELECT name, COALESCE(city, 'белгісіз') AS city FROM customers;</code></pre>
<div class="tip">Бағандағы бос мәндерді санаудың тез тәсілі: <code>SELECT COUNT(*) - COUNT(city) FROM customers</code>. <code>COUNT(city)</code> NULL-ды санамайды, ал айырма бос мәндер санын береді.</div>`,
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
<pre><code>SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...</code></pre>
<h3>Бірнеше баған бойынша сұрыптау</h3>
<p>ORDER BY-ға бірнеше бағанды үтірмен беруге болады. Бірінші бағандағы мәндер тең болса, екінші баған бойынша сұрыпталады:</p>
<pre><code>SELECT name, category, price FROM products
ORDER BY category ASC, price DESC;</code></pre>
<p>Нәтижеде санаттар әліпби ретімен, ал әр санаттың ішінде тауарлар қымбаттан арзанға қарай тұрады.</p>
<h3>Жиі кездесетін қателер</h3>
<ul>
<li><b>ORDER BY-сыз LIMIT</b>: дерекқор жолдарды кез келген ретпен қайтара алады, сондықтан «алғашқы 5» әр орындалған сайын әртүрлі болуы мүмкін. Топ-N алғанда әрқашан ORDER BY жазыңыз.</li>
<li><b>Тең мәндер</b>: 3-ші және 4-ші тауарлардың бағасы бірдей болса, LIMIT 3 біреуін кездейсоқ қалдырады. Тұрақты нәтиже үшін екінші сұрыптау бағанын (мысалы, <code>id</code>) қосыңыз.</li>
<li><b>NULL реті</b>: SQLite-та NULL өсу ретімен сұрыптағанда басында, кему ретімен сұрыптағанда соңында тұрады. Басқа дерекқорларда керісінше болуы мүмкін.</li>
</ul>
<div class="tip"><code>DISTINCT</code> бүкіл жолға қолданылады: <code>SELECT DISTINCT city, signup_date</code> қала мен күннің бірегей жұптарын береді, тек қалаларды емес.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Ең қымбат 3 тауардың атауы мен бағасын, қымбаттан арзанға қарай шығарыңыз.', starter: '', solution: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 3;', check: { ordered: true }, hints: ['<code>ORDER BY price DESC</code>, сосын <code>LIMIT 3</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Клиенттер тұратын қалалардың қайталанбайтын тізімін шығарыңыз. NULL мәнін қоспаңыз.', starter: '', solution: 'SELECT DISTINCT city FROM customers WHERE city IS NOT NULL;', hints: ['<code>SELECT DISTINCT city</code> + <code>WHERE city IS NOT NULL</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Клиенттердің аты мен тіркелген күнін ең жаңасынан бастап шығарыңыз.', starter: '', solution: 'SELECT name, signup_date FROM customers ORDER BY signup_date DESC;', check: { ordered: true }, hints: ['Жаңадан ескіге: <code>DESC</code>.'] }
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
<div class="tip">SQLite-та бүтін санды бүтін санға бөлсеңіз, нәтиже де бүтін болады: <code>7 / 2 = 3</code>. Дәл нәтиже үшін біреуін бөлшек санға айналдырыңыз: <code>7 / 2.0 = 3.5</code>.</div>
<h3>Есептелген бағандардың мысалдары</h3>
<pre><code>SELECT name,
       price,
       ROUND(price * 0.85) AS after_discount,
       price - 5000       AS minus_coupon
FROM products;</code></pre>
<p><code>ROUND(x)</code> бүтінге, <code>ROUND(x, 1)</code> бір ондық таңбаға дейін дөңгелектейді. Мәтінді <code>||</code> арқылы біріктіруге болады: <code>name || ' (' || category || ')'</code>.</p>
<h3>Alias-ты қай жерде қолдануға болады?</h3>
<p>Сұрау бөліктері жазылу ретімен орындалмайды: дерекқор алдымен <code>FROM</code> мен <code>WHERE</code>-ді, сосын <code>SELECT</code>-ті, соңында <code>ORDER BY</code>-ды орындайды. Сондықтан alias-ты ORDER BY-да қолдануға болады, ал WHERE-де болмайды:</p>
<pre><code>SELECT name, price * 1.12 AS price_with_vat
FROM products
ORDER BY price_with_vat DESC;   -- дұрыс</code></pre>
<p>WHERE-де есептеуді қайта жазу керек: <code>WHERE price * 1.12 &gt; 50000</code>.</p>
<div class="tip">Alias-қа бос орынсыз, латын әріптерімен атау беріңіз: <code>price_with_vat</code>. Бос орын болса, атауды қос тырнақшаға алу керек, ал кейінгі сұрауларда бұл ыңғайсыз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: '«Кеңсе» санатындағы тауарлардың атауын <code>product</code> деген атпен, 10% жеңілдікпен есептелген бағасын <code>sale_price</code> деген атпен шығарыңыз.', starter: '', solution: "SELECT name AS product, price * 0.9 AS sale_price FROM products WHERE category = 'Кеңсе';", hints: ['10% жеңілдік = <code>price * 0.9</code>.', 'Атау беру: <code>name AS product</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр тауардың атауын және бағасын мың теңгемен (<code>price_k</code>, бөлшек сан) шығарыңыз. Мысалы, 6500 → 6.5.', starter: '', solution: 'SELECT name, price / 1000.0 AS price_k FROM products;', hints: ['Бүтін санға бөлуден сақтаныңыз: <code>1000.0</code>.'] }
      ]
    },
    {
      id: 'sql-7', title: 'Агрегат функциялар', minutes: 10,
      body: `
<p>Дүкен кассасын елестетіңіз. Кассир чектегі әр тауарды жеке айтпайды, соңында бір сан айтады: «Барлығы 41 700 ₸». <b>Агрегат функциялар</b> да солай жасайды: көп жолды алып, бір санға жинақтайды. Менеджердің «қанша клиент бар?», «орташа баға қандай?» деген сұрақтарының бәрі осылай шешіледі. Олар Excel-дегі <code>COUNT</code>, <code>SUM</code>, <code>AVERAGE</code> формулалары сияқты жұмыс істейді.</p>
<table>
<tr><th>Функция</th><th>Не қайтарады</th></tr>
<tr><td><code>COUNT(*)</code></td><td>жолдар саны</td></tr>
<tr><td><code>COUNT(col)</code></td><td>NULL емес мәндер саны</td></tr>
<tr><td><code>SUM(col)</code></td><td>қосынды</td></tr>
<tr><td><code>AVG(col)</code></td><td>орташа мән</td></tr>
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
<li><b>COUNT пен SUM-ды шатастыру.</b> <code>COUNT(quantity)</code> — қанша жол бар, ал <code>SUM(quantity)</code> — барлық тауар данасының қосындысы. Бір жолда 5 блокнот болса, COUNT оны 1 деп, SUM 5 деп санайды.</li>
<li><b>Агрегат пен қарапайым бағанды араластыру:</b> <code>SELECT name, MAX(price)</code>. Мұндай сұрауда <code>name</code> қай жолдан алынатыны түсініксіз. Ең қымбат тауардың атауын білу үшін <code>ORDER BY price DESC LIMIT 1</code> жазыңыз, ал «әр топ үшін» есептеуді келесі сабақта GROUP BY арқылы үйренеміз.</li>
<li><b>NULL-ды ұмыту.</b> <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code> NULL мәндерді елемейді. Сондықтан <code>AVG</code> бос мәндерді нөл деп санамайды.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Дерекқорда қанша клиент бар? Бір санды шығарыңыз.', starter: '', solution: 'SELECT COUNT(*) FROM customers;', hints: ['<code>COUNT(*)</code>'] },
        { type: 'sql', dataset: 'shop', xp: 10, prompt: 'Тауарлардың ең арзан бағасын, ең қымбат бағасын және орташа бағасын бір жолда, осы ретпен шығарыңыз.', starter: '', solution: 'SELECT MIN(price), MAX(price), AVG(price) FROM products;', hints: ['Бір SELECT ішінде үш функция: <code>MIN, MAX, AVG</code>.'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Барлық тапсырыстар бойынша жалпы қанша дана тауар сатылды? (<code>order_items.quantity</code> қосындысы)', starter: '', solution: 'SELECT SUM(quantity) FROM order_items;', hints: ['<code>SUM(quantity)</code>'] }
      ]
    },
    {
      id: 'sql-8', title: 'GROUP BY және HAVING', minutes: 12,
      body: `
<p>Өткен сабақта агрегат бүкіл кестеге бір сан берді. Ал «<b>әр</b> қалада қанша клиент?» деген сұраққа бір сан жетпейді. Үстелдегі чектерді қала бойынша үйінділерге бөліп, әр үйіндіні бөлек санайтыныңызды елестетіңіз. <code>GROUP BY</code> дәл осылай жасайды: жолдарды топтарға бөліп, әр топқа агрегат есептейді. Бұл Excel-дегі pivot table сияқты.</p>
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
<p>SELECT-ке бірнеше агрегатты қатар жазуға болады, мысалы <code>COUNT(*)</code> пен <code>AVG(price)</code> бірге — әр топ үшін екеуі де есептеледі.</p>
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
<p>Астана тобында 2 жол бар, шарт орындалмады, сондықтан ол нәтижеге кірмеді. Тағы бір мысал — орташа бағасы 10 000-нан жоғары санаттар:</p>
<pre><code>SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) &gt; 10000;</code></pre>
<p><b>Жазылу реті</b> (сұрауды осы ретпен жазасыз): <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code>.</p>
<p><b>Орындалу реті</b> (дерекқор іс жүзінде осы ретпен есептейді, оны логикалық рет дейді): <code>FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT</code>. Яғни дерекқор алдымен кестені алады (кейін үйренетін JOIN да осы қадамда), жолдарды сүзеді, топтайды, топтарды сүзеді, содан кейін ғана SELECT-тегі бағандарды есептейді. WHERE-де агрегат жазуға болмайтыны осыдан: ол орындалғанда топтар әлі құрылмаған.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Агрегатты WHERE-ге жазу:</b> <code>WHERE COUNT(*) &gt; 1</code> қате береді. WHERE орындалғанда топтар әлі жоқ — HAVING қолданыңыз.</li>
<li><b>GROUP BY-ды ұмыту.</b> <code>SELECT city, COUNT(*) FROM customers</code> біздің браузердегі SQLite-та қате бермейді: бүкіл кестеге бір жол қайтарып, <code>city</code> орнына кездейсоқ бір қаланы қояды. Бұл — SQLite-тың ерекшелігі. PostgreSQL сияқты қатаң дерекқорлар мұндай сұрауға бірден қате береді («city бағаны GROUP BY-да болуы керек»).</li>
<li><b>NULL тобын байқамау.</b> <code>city</code> бағаны бос жолдар бөлек <code>NULL</code> тобына жиналады. Ол керек болмаса, <code>WHERE city IS NOT NULL</code> қосыңыз.</li>
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
<div class="tip">UPDATE мен DELETE-ті <b>WHERE-сіз</b> жазсаңыз, бүкіл кесте өзгереді. Жұмыста алдымен сол WHERE-пен SELECT жасап, қай жолдар өзгеретінін тексеріңіз.</div>
<h3>Деректі өзгерткенде қауіпсіздік</h3>
<ol>
<li>Өзгертуден бұрын сол <code>WHERE</code>-пен <code>SELECT COUNT(*)</code> жасаңыз: қанша жол өзгеретінін біліңіз.</li>
<li>Командаларды транзакцияға орап, нәтижені тексергеннен кейін ғана <code>COMMIT</code> жасаңыз (келесі сабақ).</li>
<li>Өндірістік дерекқорда (production) деректі тікелей өзгертпеңіз: аналитикке әдетте тек оқу рұқсаты беріледі.</li>
</ol>
<h3>DROP, DELETE және TRUNCATE айырмасы</h3>
<table>
<tr><th>Команда</th><th>Не істейді</th></tr>
<tr><td><code>DELETE FROM t WHERE ...</code></td><td>Шартқа сай жолдарды өшіреді, кесте қалады</td></tr>
<tr><td><code>DELETE FROM t</code> / <code>TRUNCATE t</code></td><td>Барлық жолды өшіреді, құрылым қалады (SQLite-та TRUNCATE жоқ)</td></tr>
<tr><td><code>DROP TABLE t</code></td><td>Кестені құрылымымен бірге толық жояды</td></tr>
</table>
<div class="tip">Бірнеше жолды бір INSERT-пен қосуға болады: <code>INSERT INTO t (a, b) VALUES (1, 'x'), (2, 'y');</code>. Бұл әр жолға бөлек команда жазғаннан жылдам.</div>`,
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
<p>SQLite файлдық дерекқор болғандықтан, бұл командалар мұнда жоқ. Аналитикке әдетте тек <code>SELECT</code> рұқсаты беріледі.</p>
<h3>ACID: транзакцияның төрт кепілдігі</h3>
<ul>
<li><b>Atomicity</b> (бөлінбейтіндік): транзакциядағы командалар не бәрі орындалады, не ешқайсысы.</li>
<li><b>Consistency</b> (тұтастық): транзакциядан кейін дерек барлық шектеулерге (constraints) сай болады.</li>
<li><b>Isolation</b> (оқшаулық): қатар жүрген транзакциялар бір-біріне кедергі келтірмейді.</li>
<li><b>Durability</b> (тұрақтылық): COMMIT жасалған өзгеріс сервер өшіп қалса да сақталады.</li>
</ul>
<h3>VIEW қашан пайдалы?</h3>
<p>Бір күрделі сұрауды (бірнеше JOIN, сүзгі) әріптестер жиі қолданатын болса, оны VIEW етіп сақтаңыз. Сонда бәрі бір логиканы қолданады, ал ережені өзгерту керек болса, тек VIEW-ді қайта құрасыз. Мысалы, «белсенді клиент» анықтамасын бір VIEW-ге жазсаңыз, әр есепте ол бірдей болады.</p>
<p>VIEW-ді жою: <code>DROP VIEW big_orders;</code>. Бұл астындағы кестеге әсер етпейді.</p>
<div class="tip">VIEW әр оқылған сайын сұрауды қайта орындайды. Ауыр есептеулер үшін кейбір дерекқорларда <b>materialized view</b> бар: ол нәтижені сақтап, кесте сияқты жылдам оқылады, бірақ оны мезгіл-мезгіл жаңарту керек.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: '<code>delivered_orders</code> атты VIEW құрыңыз: <code>orders</code> кестесінен тек <code>delivered</code> статусты жолдар (барлық бағандар).', starter: '', solution: "CREATE VIEW delivered_orders AS SELECT * FROM orders WHERE status = 'delivered';", check: { after: 'SELECT * FROM delivered_orders ORDER BY id;', ordered: true }, hints: ['<code>CREATE VIEW delivered_orders AS SELECT ...</code>'] },
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Транзакция бастап, барлық тауардың бағасын 0-ге теңестіріңіз, сосын <b>ROLLBACK</b> жасап, бағалардың қосындысын шығарыңыз. Қосынды бастапқыдай болуы керек.', starter: 'BEGIN;\nUPDATE products SET price = 0;\n\nSELECT SUM(price) FROM products;', solution: 'BEGIN; UPDATE products SET price = 0; ROLLBACK; SELECT SUM(price) FROM products;', check: { mustInclude: ['ROLLBACK'] }, hints: ['UPDATE-тен кейін <code>ROLLBACK;</code> жазыңыз.'] },
        { type: 'quiz', xp: 10, prompt: 'Аналитикке <code>sales</code> кестесін тек оқуға рұқсат беру керек. Қай команда?', options: ['REVOKE SELECT ON sales FROM analyst;', 'GRANT SELECT ON sales TO analyst;', 'GRANT ALL ON sales TO analyst;', 'COMMIT sales;'], answer: 1, explain: 'GRANT SELECT тек оқу құқығын береді. GRANT ALL тым көп рұқсат.' }
      ]
    },
    {
      id: 'sql-15', title: 'UNION, UNION ALL және жиындар', minutes: 12,
      body: `
<p><code>JOIN</code> кестелерді <b>көлденеңінен</b> қосады: жолға жаңа бағандар жалғанады. Ал кейде екі нәтижені <b>тігінен</b> қосу керек: бір тізімнің астына екіншісін қою. Мысалы, тамыздағы және қарашадағы клиенттерді бір тізімге жинау немесе кестенің соңына «Барлығы» жолын қосу. Бұл үшін жиын операторлары бар.</p>
<table>
<tr><th>Оператор</th><th>Не қайтарады</th><th>Қайталанулар</th></tr>
<tr><td><code>UNION</code></td><td>екі нәтиженің бірігуі</td><td>жойылады</td></tr>
<tr><td><code>UNION ALL</code></td><td>екі нәтиженің бірігуі</td><td>қалады</td></tr>
<tr><td><code>INTERSECT</code></td><td>екеуінде де бар жолдар</td><td>жойылады</td></tr>
<tr><td><code>EXCEPT</code></td><td>біріншіде бар, екіншіде жоқ жолдар</td><td>жойылады</td></tr>
</table>
<h3>Мысал: UNION және UNION ALL</h3>
<p>Тамызда тапсырыс берген клиенттер: 1, 2, 1 (Айгерім екі рет). Қазанда: 2, 9, 5, 1.</p>
<pre><code>SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%'
UNION
SELECT customer_id FROM orders WHERE order_date LIKE '2024-10%';</code></pre>
<p>Нәтиже — 4 жол: <code>1, 2, 5, 9</code>. <code>UNION</code> қайталануларды жойды: екі тізімнің арасындағыны да, бір тізімнің ішіндегіні де. Дәл осы сұрауды <code>UNION ALL</code>-мен жазсақ, 7 жол шығады: <code>1, 2, 1, 2, 9, 5, 1</code>. Ештеңе жойылмайды, жолдар жай ғана бірінің астына бірі қойылады.</p>
<div class="tip">Қайталану болмайтынын білсеңіз немесе ол керек болса, <code>UNION ALL</code> жазыңыз. <code>UNION</code> қайталануды іздеу үшін бүкіл нәтижені салыстырады, сондықтан үлкен кестеде баяу. Табысты қосатын есепте <code>UNION</code> қауіпті: сомасы бірдей екі бөлек тапсырыс бір жолға айналып, табыс кеміп қалады.</div>
<h3>Ереже: бағандар сәйкес келуі керек</h3>
<ul>
<li>Екі SELECT-те бағандар <b>саны бірдей</b> болуы керек.</li>
<li>Сәйкес бағандардың <b>типі үйлесуі</b> керек: сан санның астына, мәтін мәтіннің астына. SQLite мұны тексермейді, ал PostgreSQL қате береді.</li>
<li>Баған атаулары <b>бірінші</b> SELECT-тен алынады.</li>
<li><code>ORDER BY</code> ең соңында бір рет жазылады және бүкіл біріккен нәтижеге қолданылады.</li>
</ul>
<h3>Мысал: «Барлығы» жолы</h3>
<pre><code>SELECT status, COUNT(*) AS orders FROM orders GROUP BY status
UNION ALL
SELECT 'Барлығы', COUNT(*) FROM orders;</code></pre>
<table>
<tr><th>status</th><th>orders</th></tr>
<tr><td>cancelled</td><td>2</td></tr>
<tr><td>delivered</td><td>10</td></tr>
<tr><td>shipped</td><td>3</td></tr>
<tr><td>Барлығы</td><td>15</td></tr>
</table>
<p>Екінші SELECT-те <code>'Барлығы'</code> — жай мәтін (тұрақты мән). Ол <code>status</code> бағанының астына түседі.</p>
<h3>INTERSECT және EXCEPT</h3>
<pre><code>-- тамызда да, қазанда да тапсырыс бергендер
SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%'
INTERSECT
SELECT customer_id FROM orders WHERE order_date LIKE '2024-10%';   -- 1, 2

-- ешқашан тапсырыс бермеген клиенттер
SELECT id FROM customers
EXCEPT
SELECT customer_id FROM orders;                                     -- 8</code></pre>
<p><code>EXCEPT</code>-те рет маңызды: «A-да бар, B-да жоқ». Орындарын ауыстырсаңыз, мүлде басқа сұрақ шығады. <code>EXCEPT</code> пен <code>NOT EXISTS</code> бір сұраққа жауап бере алады; айырмасы — <code>EXCEPT</code> бүтін жолдарды салыстырады және қайталануды жояды.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Бағандар саны әртүрлі:</b> <code>SELECT id, name ... UNION SELECT id ...</code> қате береді.</li>
<li><b>Бағандардың реті шатасқан:</b> <code>SELECT name, city ... UNION SELECT city, name ...</code> қате бермейді, бірақ қала мен ат бір бағанда араласып кетеді. SQL бағандарды атауымен емес, <b>орнымен</b> сәйкестендіреді.</li>
<li><b>UNION ALL орнына UNION:</b> керек қайталанулар үнсіз жойылады, сандар кеміп қалады.</li>
<li><b>Әр SELECT-ке бөлек ORDER BY:</b> сұрыптау тек соңында жазылады.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Тамызда (<code>2024-08</code>) <b>немесе</b> қарашада (<code>2024-11</code>) тапсырыс берген клиенттердің <code>customer_id</code> тізімін қайталаусыз шығарыңыз. Екі SELECT-ті <code>UNION</code> арқылы біріктіріңіз.', starter: "SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%'\n", solution: "SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%' UNION SELECT customer_id FROM orders WHERE order_date LIKE '2024-11%';", check: { mustInclude: ['UNION'] }, hints: ['Екінші SELECT дәл сондай, тек ай басқа.', "<code>... LIKE '2024-08%' UNION SELECT customer_id FROM orders WHERE order_date LIKE '2024-11%'</code>"] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Әр санаттағы (<code>category</code>) тауарлар санын шығарыңыз, ал соңына <code>UNION ALL</code> арқылы <code>Барлығы</code> деген жол қосыңыз: онда барлық тауарлардың саны тұрсын. Екі баған: санат және сан.', starter: 'SELECT category, COUNT(*) FROM products GROUP BY category\n', solution: "SELECT category, COUNT(*) FROM products GROUP BY category UNION ALL SELECT 'Барлығы', COUNT(*) FROM products;", check: { mustInclude: ['UNION ALL'] }, hints: ["Екінші SELECT-те санаттың орнына мәтін жазыңыз: <code>SELECT 'Барлығы', COUNT(*) FROM products</code>.", 'Екі SELECT-те де екі баған болуы керек.'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Бірде-бір <code>delivered</code> тапсырысы <b>жоқ</b> клиенттердің <code>id</code>-ін <code>EXCEPT</code> арқылы табыңыз.', starter: '', solution: "SELECT id FROM customers EXCEPT SELECT customer_id FROM orders WHERE status = 'delivered';", check: { mustInclude: ['EXCEPT'] }, hints: ['Бірінші жиын — барлық клиенттердің <code>id</code>-і.', "Екінші жиын — <code>delivered</code> тапсырыстардың <code>customer_id</code>-і. Арасына <code>EXCEPT</code> қойыңыз."] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Тамызда да (<code>2024-08</code>), қазанда да (<code>2024-10</code>) тапсырыс берген клиенттердің <code>customer_id</code>-ін <code>INTERSECT</code> арқылы табыңыз.', starter: '', solution: "SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%' INTERSECT SELECT customer_id FROM orders WHERE order_date LIKE '2024-10%';", check: { mustInclude: ['INTERSECT'] }, hints: ['Сабақтағы INTERSECT мысалын қараңыз.'] },
        { type: 'quiz', xp: 10, prompt: 'Екі филиалдың сатылым кестелерін біріктіріп, жалпы табысты есептемексіз. Қай операторды таңдайсыз және неге?', options: ['UNION: қайталануларды жояды, сондықтан таза', 'UNION ALL: барлық жол сақталады; UNION сомасы мен күні бірдей екі бөлек сатылымды бір жолға айналдырып, табысты кемітер еді', 'INTERSECT: екеуінде де бар жолдарды береді', 'EXCEPT: артық жолдарды алып тастайды'], answer: 1, explain: 'Жолдарды қосып, сосын агрегат есептегенде әрқашан UNION ALL. UNION тек «қайталанбайтын тізім» керек болғанда қолданылады.' }
      ]
    },
    {
      id: 'sql-16', title: 'Күн және мәтін функциялары', minutes: 16,
      body: `
<p>Нақты есептердің көбі уақытқа байланған: айлық табыс, тіркелуден бірінші тапсырысқа дейінгі күндер. Ал нақты дерек жиі лас: артық бос орын, әртүрлі регистр, мәтін болып сақталған сандар. Бұл сабақта екеуіне де керек функцияларды үйренесіз.</p>
<div class="tip">Күн мен мәтін функциялары әр дерекқорда әртүрлі аталады. Мұнда браузердегі <b>SQLite</b> нұсқасын жазасыз, ал сабақтың соңында <b>PostgreSQL</b> баламаларының кестесі бар: жұмыста солар жиі кездеседі.</div>
<h3>Күннің бөліктері: strftime</h3>
<p>Біздің кестелерде күн <code>'2024-08-19'</code> түріндегі мәтін (ISO форматы: жыл-ай-күн). <code>strftime(формат, күн)</code> одан керек бөлікті алады:</p>
<table>
<tr><th>Өрнек</th><th>Нәтиже</th><th>Мағынасы</th></tr>
<tr><td><code>strftime('%Y', '2024-08-19')</code></td><td>2024</td><td>жыл</td></tr>
<tr><td><code>strftime('%m', '2024-08-19')</code></td><td>08</td><td>ай</td></tr>
<tr><td><code>strftime('%d', '2024-08-19')</code></td><td>19</td><td>күн</td></tr>
<tr><td><code>strftime('%Y-%m', '2024-08-19')</code></td><td>2024-08</td><td>ай кілті</td></tr>
<tr><td><code>strftime('%w', '2024-08-19')</code></td><td>1</td><td>апта күні (0 — жексенбі)</td></tr>
</table>
<p>Нәтиже — мәтін. Сан керек болса, түрлендіріңіз: <code>CAST(strftime('%m', order_date) AS INTEGER)</code> → 8.</p>
<h3>Айға дейін «кесу»</h3>
<p>Айлық есеп үшін әр күнді өз айына келтіреміз. Екі тәсіл бар:</p>
<pre><code>SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;</code></pre>
<table>
<tr><th>month</th><th>orders</th></tr>
<tr><td>2024-08</td><td>3</td></tr>
<tr><td>2024-09</td><td>4</td></tr>
<tr><td>2024-10</td><td>4</td></tr>
<tr><td>…</td><td>…</td></tr>
</table>
<p>Екінші тәсіл — айдың бірінші күні: <code>date(order_date, 'start of month')</code> → <code>2024-08-01</code>. Мұны «month truncation» дейді. Жылды ұмытпаңыз: тек <code>'%m'</code> бойынша топтасаңыз, әртүрлі жылдардың тамызы бір топқа түседі.</p>
<h3>Күндерді жылжыту және айырма</h3>
<pre><code>date('2024-08-19', '+7 days')         -- 2024-08-26
date('2024-08-19', '-1 month')        -- 2024-07-19
date('now')                           -- бүгінгі күн

julianday('2024-08-19') - julianday('2024-08-02')   -- 17.0</code></pre>
<p><code>julianday</code> күнді бір санға айналдырады, сондықтан екі күнді азайтуға болады. Айырма — күн саны. Мәтін күйіндегі күндерді тікелей азайтсаңыз (<code>'2024-08-19' - '2024-08-02'</code>), SQLite тек жылдарды азайтып, 0 береді.</p>
<pre><code>SELECT o.id,
       CAST(julianday(o.order_date) - julianday(c.signup_date) AS INTEGER) AS days
FROM orders o
JOIN customers c ON c.id = o.customer_id;</code></pre>
<p>101-тапсырыс: Айгерім 2024-01-15 күні тіркеліп, 2024-08-02 күні тапсырыс берді → 200 күн.</p>
<h3>Мәтін функциялары</h3>
<table>
<tr><th>Функция</th><th>Мысал</th><th>Нәтиже</th></tr>
<tr><td><code>LENGTH</code></td><td><code>LENGTH('Алматы')</code></td><td>6</td></tr>
<tr><td><code>SUBSTR(мәтін, басы, ұзындығы)</code></td><td><code>SUBSTR('2024-08-19', 1, 7)</code></td><td>2024-08</td></tr>
<tr><td><code>REPLACE</code></td><td><code>REPLACE('12 500', ' ', '')</code></td><td>12500</td></tr>
<tr><td><code>TRIM</code></td><td><code>TRIM('  Айгерім ')</code></td><td>Айгерім</td></tr>
<tr><td><code>UPPER</code>, <code>LOWER</code></td><td><code>LOWER('NURLAN@mail.kz')</code></td><td>nurlan@mail.kz</td></tr>
<tr><td><code>||</code></td><td><code>name || ' (' || city || ')'</code></td><td>Айгерім (Алматы)</td></tr>
</table>
<p><code>SUBSTR</code>-да санау <b>1-ден</b> басталады (Python-дағыдай 0-ден емес). Күн ISO форматында тұрса, <code>SUBSTR(order_date, 1, 7)</code> да ай кілтін береді.</p>
<div class="tip">SQLite-та <code>UPPER</code> мен <code>LOWER</code> тек латын әріптерін өзгертеді: <code>LOWER('АЛМАТЫ')</code> өзгеріссіз қалады. Email үшін бұл жеткілікті. PostgreSQL кириллицаны да дұрыс өзгертеді.</div>
<h3>Типті өзгерту: CAST</h3>
<p>«Лас деректер» дерекқорында сома мәтін болып сақталған: <code>'12 500'</code>, <code>'8000'</code>. Мәтінді қосуға, салыстыруға болмайды. Алдымен бос орынды алып, сосын санға айналдырамыз:</p>
<pre><code>SELECT id, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num
FROM raw_orders;</code></pre>
<p><code>CAST(мән AS тип)</code>: <code>INTEGER</code> — бүтін сан, <code>REAL</code> — бөлшек сан, <code>TEXT</code> — мәтін. Абайлаңыз: SQLite санға айналмайтын мәтінді (<code>'abc'</code>) қате бермей <b>0</b>-ге айналдырады. PostgreSQL мұндайда қате береді.</p>
<p>Бүтін сандарды бөлгенде де CAST керек: <code>7 / 2</code> = 3, ал <code>CAST(7 AS REAL) / 2</code> немесе <code>7 * 1.0 / 2</code> = 3.5.</p>
<h3>NULL-мен жұмыс: COALESCE және NULLIF</h3>
<ul>
<li><code>COALESCE(a, b, c)</code> — NULL емес бірінші мәнді қайтарады: <code>COALESCE(city, 'белгісіз')</code>.</li>
<li><code>NULLIF(a, b)</code> — <code>a = b</code> болса NULL, әйтпесе <code>a</code>. Ең жиі қолданылуы — нөлге бөлуден қорғау: <code>revenue / NULLIF(orders, 0)</code>. Тапсырыс 0 болса, бөлгіш NULL болады да, нәтиже қате емес, NULL шығады.</li>
<li>Бос мәтінді NULL-ға айналдыру: <code>NULLIF(TRIM(phone), '')</code>.</li>
</ul>
<h3>PostgreSQL баламалары</h3>
<table>
<tr><th>Не керек</th><th>SQLite</th><th>PostgreSQL</th></tr>
<tr><td>Айдың басына кесу</td><td><code>date(d, 'start of month')</code></td><td><code>DATE_TRUNC('month', d)</code></td></tr>
<tr><td>Ай кілті мәтін ретінде</td><td><code>strftime('%Y-%m', d)</code></td><td><code>TO_CHAR(d, 'YYYY-MM')</code></td></tr>
<tr><td>Ай нөмірі</td><td><code>CAST(strftime('%m', d) AS INTEGER)</code></td><td><code>EXTRACT(MONTH FROM d)</code></td></tr>
<tr><td>7 күн қосу</td><td><code>date(d, '+7 days')</code></td><td><code>d + INTERVAL '7 days'</code></td></tr>
<tr><td>Екі күннің айырмасы</td><td><code>julianday(d2) - julianday(d1)</code></td><td><code>d2 - d1</code> (екеуі де <code>date</code> типінде болса)</td></tr>
<tr><td>Бүгін</td><td><code>date('now')</code></td><td><code>CURRENT_DATE</code></td></tr>
<tr><td>Типті өзгерту</td><td><code>CAST(x AS INTEGER)</code></td><td><code>CAST(x AS INTEGER)</code> немесе <code>x::int</code></td></tr>
</table>
<p><code>SUBSTR</code>, <code>LENGTH</code>, <code>REPLACE</code>, <code>TRIM</code>, <code>UPPER</code>, <code>LOWER</code>, <code>COALESCE</code>, <code>NULLIF</code> екеуінде де бірдей жазылады.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Жылсыз ай бойынша топтау.</b> <code>GROUP BY strftime('%m', order_date)</code> әртүрлі жылдарды араластырады. <code>'%Y-%m'</code> жазыңыз.</li>
<li><b>Күндерді мәтін күйінде азайту.</b> Айырма үшін <code>julianday</code> керек.</li>
<li><b>ISO емес формат.</b> <code>'15.02.2024'</code> түріндегі күнді <code>strftime</code> түсінбейді (NULL қайтарады), ал сұрыптағанда ол қате орынға түседі. Алдымен <code>SUBSTR</code> арқылы <code>ЖЖЖЖ-АА-КК</code> түріне келтіру керек.</li>
<li><b>CAST-ты тексермеу.</b> <code>'abc'</code> үнсіз 0-ге айналады. Түрлендіруден кейін 0 мен NULL мәндерді қарап шығыңыз.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр ай үшін тапсырыстар санын шығарыңыз: ай кілті (<code>YYYY-MM</code>, <code>strftime</code> арқылы) және сан. Айлар өсу ретімен.', starter: "SELECT strftime('', order_date) AS month\nFROM orders;", solution: "SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) FROM orders GROUP BY month ORDER BY month;", check: { ordered: true, mustInclude: ['strftime'] }, hints: ["Формат: <code>'%Y-%m'</code>.", '<code>GROUP BY month ORDER BY month</code> қосыңыз.'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Әр тапсырыс үшін клиент тіркелгеннен (<code>signup_date</code>) тапсырысқа (<code>order_date</code>) дейін неше күн өткенін есептеңіз. Екі баған: тапсырыс <code>id</code> және күндер саны.', starter: 'SELECT o.id\nFROM orders o\nJOIN customers c ON c.id = o.customer_id;', solution: 'SELECT o.id, CAST(julianday(o.order_date) - julianday(c.signup_date) AS INTEGER) AS days FROM orders o JOIN customers c ON c.id = o.customer_id;', check: { mustInclude: ['julianday'] }, hints: ['Айырма: <code>julianday(o.order_date) - julianday(c.signup_date)</code>.', 'Бүтін сан үшін оны <code>CAST(... AS INTEGER)</code> ішіне алыңыз.'] },
        { type: 'sql', dataset: 'raw', xp: 20, prompt: '<code>raw_customers</code> кестесін тазалаңыз. Үш баған шығарыңыз: <code>id</code>, шетіндегі бос орындары алынған <code>name</code> және кіші әріпке келтірілген <code>email</code>.', starter: 'SELECT id, name, email\nFROM raw_customers;', solution: 'SELECT id, TRIM(name) AS name, LOWER(email) AS email FROM raw_customers;', check: { mustInclude: ['TRIM', 'LOWER'] }, hints: ['<code>TRIM(name)</code> және <code>LOWER(email)</code>.'] },
        { type: 'sql', dataset: 'raw', xp: 20, prompt: '<code>raw_orders</code> кестесінде <code>amount</code> — мәтін (<code>\'12 500\'</code>). Екі баған шығарыңыз: <code>id</code> және бос орындары алынып, бүтін санға айналдырылған сома.', starter: 'SELECT id, amount\nFROM raw_orders;', solution: "SELECT id, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num FROM raw_orders;", check: { mustInclude: ['CAST', 'REPLACE'] }, hints: ["Алдымен бос орынды алыңыз: <code>REPLACE(amount, ' ', '')</code>.", 'Сосын: <code>CAST(... AS INTEGER)</code>.'] },
        { type: 'quiz', xp: 10, prompt: 'Жұмыста PostgreSQL қолданылады. Әр тапсырыс күнін айдың бірінші күніне келтіру керек (SQLite-тағы <code>date(order_date, \'start of month\')</code>). Қалай жазасыз?', options: ["DATE_TRUNC('month', order_date)", "strftime('%Y-%m', order_date)", 'EXTRACT(MONTH FROM order_date)', "order_date + INTERVAL '1 month'"], answer: 0, explain: "DATE_TRUNC('month', ...) күнді айдың басына кеседі. EXTRACT тек ай нөмірін береді (жылсыз), INTERVAL күнді жылжытады, ал strftime PostgreSQL-де жоқ." }
      ]
    },
    {
      id: 'sql-17', title: 'Self join, fan-out тұзағы және орындалу реті', minutes: 16,
      body: `
<p>JOIN-ды білесіз. Бұл сабақта оның үш маңызды жағын қарастырамыз: кестені өзімен біріктіру, JOIN-нан кейін сандардың үнсіз көбейіп кетуі және сұраудың іс жүзінде қандай ретпен орындалатыны. Алдымен кестелердің неге бөлек сақталатынын түсініп алайық.</p>
<h3>Кілттер және нормализация</h3>
<ul>
<li><b>Primary key (PK)</b> — жолды бірегей анықтайтын баған: <code>customers.id</code>. Қайталанбайды және бос болмайды.</li>
<li><b>Foreign key (FK)</b> — басқа кестенің PK-сына сілтейтін баған: <code>orders.customer_id</code> → <code>customers.id</code>.</li>
</ul>
<table>
<tr><th>Байланыс</th><th>Мағынасы</th><th>Мысал</th></tr>
<tr><td><b>1:N</b> (бірдің көпке)</td><td>бір клиентте көп тапсырыс, әр тапсырыста бір клиент</td><td><code>customers</code> → <code>orders</code></td></tr>
<tr><td><b>M:N</b> (көптің көпке)</td><td>бір тапсырыста көп тауар, бір тауар көп тапсырыста</td><td><code>orders</code> ↔ <code>products</code>, арасында <code>order_items</code></td></tr>
</table>
<p>M:N байланыс тікелей сақталмайды: ортасына <b>байланыстырушы кесте</b> қойылады. <code>order_items</code> дәл сондай: онда екі FK бар (<code>order_id</code>, <code>product_id</code>).</p>
<p>Неге бәрін бір үлкен кестеге жазбаймыз? Онда клиенттің қаласы оның әр тапсырысында қайталанар еді. Клиент көшсе, барлық жолды өзгерту керек, біреуін ұмытсаңыз, дерек қайшы келеді. Әр фактіні <b>бір жерде</b> сақтап, кестелерді кілттер арқылы байланыстыруды <b>нормализация</b> дейді. Оның бағасы — талдау кезінде JOIN жазу.</p>
<h3>Self join: кестені өзімен біріктіру</h3>
<p><code>employees</code> кестесінде <code>manager_id</code> бағаны сол кестенің өзіндегі <code>id</code>-ге сілтейді: басшы да — қызметкер.</p>
<table>
<tr><th>id</th><th>name</th><th>manager_id</th></tr>
<tr><td>1</td><td>Серік</td><td>NULL</td></tr>
<tr><td>2</td><td>Гүлнар</td><td>1</td></tr>
<tr><td>3</td><td>Ақжол</td><td>2</td></tr>
</table>
<p>Қызметкердің жанына басшысының атын шығару үшін кестені өзімен біріктіреміз. Бір кестеге екі түрлі alias береміз: <code>e</code> — қызметкер, <code>m</code> — басшы.</p>
<pre><code>SELECT e.name, m.name AS manager
FROM employees e
JOIN employees m ON m.id = e.manager_id;</code></pre>
<table>
<tr><th>name</th><th>manager</th></tr>
<tr><td>Гүлнар</td><td>Серік</td></tr>
<tr><td>Ақжол</td><td>Гүлнар</td></tr>
</table>
<p>Серік нәтижеде жоқ: оның <code>manager_id</code>-і NULL, сәйкес жол табылмады. Оны да қалдыру үшін <code>LEFT JOIN</code> жазыңыз: сонда оның <code>manager</code> бағаны NULL болады.</p>
<h3>CROSS JOIN</h3>
<p><code>CROSS JOIN</code> шартсыз біріктіреді: бірінші кестенің әр жолы екіншінің әр жолымен жұптасады. 3 қала × 4 ай = 12 жол. Ол есептің «қаңқасын» жасауға керек: барлық қала мен айдың тізімін құрып, сосын оған нақты сатылымды LEFT JOIN жасайсыз. Сонда сатылым болмаған айлар да (0 болып) көрінеді.</p>
<pre><code>SELECT c.city, m.month
FROM (SELECT DISTINCT city FROM customers) c
CROSS JOIN (SELECT DISTINCT strftime('%Y-%m', order_date) AS month FROM orders) m;</code></pre>
<p>Мұнда <code>FROM</code> ішінде жақшадағы сұрау тұр. Оны <b>туынды кесте</b> (derived table) дейді: дерекқор алдымен ішкі сұрауды орындап, нәтижесін уақытша кесте ретінде қолданады. Оған alias беру міндетті.</p>
<h3>Fan-out: JOIN жолдарды көбейтеді</h3>
<p>1:N байланыспен JOIN жасағанда «бір» жақтың жолы «көп» жақтағы әр сәйкестік үшін қайталанады. Мұны <b>fan-out</b> дейді. Айгерімнің (id 1) үш тапсырысы бар: 101, 103, 111. 101-тапсырыста екі тауар бар.</p>
<pre><code>SELECT c.name, COUNT(*) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
WHERE c.id = 1;          -- 4 шығады, ал тапсырыс 3-еу</code></pre>
<p><code>order_items</code> қосылғаннан кейін бір жол — енді тапсырыс емес, тапсырыстағы тауар. <code>COUNT(*)</code> тауар жолдарын санады. Қате хабарлама жоқ, сан жай ғана үлкенірек. Бұл — аналитиктің ең қымбат қатесі.</p>
<h3>Екі «көп» кестені бірден біріктіру</h3>
<p>«Өнім метрикалары» дерекқорында <code>users</code>-тен екі 1:N байланыс шығады: <code>activity</code> (белсенді айлар) және <code>payments</code> (төлемдер). 1-пайдаланушыда 3 белсенді ай және әрқайсысы 5 000 болатын 3 төлем бар.</p>
<pre><code>SELECT u.id, COUNT(a.month) AS months, SUM(p.amount) AS total
FROM users u
JOIN activity a ON a.user_id = u.id
JOIN payments p ON p.user_id = u.id
GROUP BY u.id;           -- 1-пайдаланушы: months = 9, total = 45000</code></pre>
<p>Әр белсенділік жолы әр төлем жолымен жұптасты: 3 × 3 = 9 жол. Дұрыс жауап — 3 ай және 15 000.</p>
<h3>Шешім: алдымен агрегат, сосын JOIN</h3>
<p>Әр «көп» кестені бөлек туынды кестеде <b>бір пайдаланушыға бір жол</b> болатындай жинаймыз, содан кейін ғана біріктіреміз:</p>
<pre><code>SELECT u.id, a.months, p.total
FROM users u
JOIN (SELECT user_id, COUNT(*) AS months
      FROM activity GROUP BY user_id) a ON a.user_id = u.id
JOIN (SELECT user_id, SUM(amount) AS total
      FROM payments GROUP BY user_id) p ON p.user_id = u.id;</code></pre>
<p>Енді JOIN 1:1 болды, ештеңе көбеймейді. Тек санау керек болса, <code>COUNT(DISTINCT o.id)</code> та көмектеседі, бірақ <code>SUM</code>-ға <code>DISTINCT</code> жарамайды: сомасы бірдей екі төлем бір рет қана қосылады.</p>
<div class="tip">Әр JOIN-нан кейін өзіңізден сұраңыз: «қазір бір жол — не?». Күмән болса, JOIN-ға дейінгі және кейінгі <code>COUNT(*)</code>-ты салыстырыңыз. Жол саны өссе, fan-out бар.</div>
<h3>Орындалу реті</h3>
<p>Сұрауды <code>SELECT</code>-тен бастап жазасыз, бірақ дерекқор оны басқа ретпен орындайды:</p>
<pre><code>FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT</code></pre>
<table>
<tr><th>Салдары</th><th>Себебі</th></tr>
<tr><td><code>WHERE</code>-де агрегат жазуға болмайды</td><td>WHERE орындалғанда топтар әлі жоқ</td></tr>
<tr><td><code>SELECT</code>-тегі alias-ты <code>WHERE</code>-де қолдануға болмайды</td><td>WHERE SELECT-тен бұрын орындалады, alias әлі жасалмаған</td></tr>
<tr><td>alias-ты <code>ORDER BY</code>-да қолдануға болады</td><td>ORDER BY SELECT-тен кейін орындалады</td></tr>
<tr><td>fan-out агрегатты бұзады</td><td>JOIN ең бірінші орындалады: GROUP BY көбейген жолдарды көреді</td></tr>
</table>
<p>Ескерту: SQLite alias-ты <code>WHERE</code> мен <code>GROUP BY</code>-да да қабылдайды (осы курстағы <code>GROUP BY month</code> сияқты). PostgreSQL <code>WHERE</code> мен <code>HAVING</code>-те alias-қа қате береді: онда өрнекті қайта жазу керек.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Self join-да alias-ты ұмыту.</b> Бір кесте екі рет тұрғандықтан, әр бағанның алдына <code>e.</code> немесе <code>m.</code> жазу міндетті.</li>
<li><b>ON-ның бағытын шатастыру.</b> <code>m.id = e.manager_id</code> — «m — e-нің басшысы». Керісінше жазсаңыз, басшының орнына қол астындағылар шығады.</li>
<li><b>JOIN-нан кейін <code>COUNT(*)</code>-қа сену.</b> Алдымен бір жолдың не екенін анықтаңыз.</li>
<li><b>Екі 1:N кестені бір сұрауда біріктіріп, екеуінен де агрегат алу.</b> Алдымен бөлек жинаңыз.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Әр қызметкердің атын және басшысының атын шығарыңыз. Басшысы жоқ Серік те тізімде қалсын (оның басшысы — <code>NULL</code>). Барлығы 12 жол.', starter: 'SELECT e.name, m.name AS manager\nFROM employees e\n', solution: 'SELECT e.name, m.name AS manager FROM employees e LEFT JOIN employees m ON m.id = e.manager_id;', check: { mustInclude: ['JOIN'] }, hints: ['Кестені өзімен біріктіріңіз: <code>LEFT JOIN employees m ON m.id = e.manager_id</code>.', 'Жай <code>JOIN</code> жазсаңыз, Серік түсіп қалады: 11 жол шығады.'] },
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Әр басшының қол астында неше қызметкер бар? Екі баған: басшының аты және қызметкерлер саны. Қол астында ешкімі жоқтар керек емес.', starter: '', solution: 'SELECT m.name, COUNT(*) FROM employees e JOIN employees m ON m.id = e.manager_id GROUP BY m.id, m.name;', check: { mustInclude: ['JOIN', 'GROUP BY'] }, hints: ['Алдыңғы тапсырмадағы self join-ды <code>JOIN</code>-мен жазыңыз.', 'Басшы бойынша топтаңыз: <code>GROUP BY m.id, m.name</code>.'] },
        { type: 'sql', dataset: 'metrics', xp: 30, prompt: 'Бұл сұрау fan-out салдарынан қате сан береді (1-пайдаланушыда 9 ай және 45 000). Оны түзетіңіз: <code>activity</code> пен <code>payments</code>-ті алдымен бөлек туынды кестелерде жинап, сосын біріктіріңіз. Үш баған: <code>id</code>, белсенді айлар саны, төлемдер сомасы.', starter: 'SELECT u.id, COUNT(a.month) AS months, SUM(p.amount) AS total\nFROM users u\nJOIN activity a ON a.user_id = u.id\nJOIN payments p ON p.user_id = u.id\nGROUP BY u.id;', solution: 'SELECT u.id, a.months, p.total FROM users u JOIN (SELECT user_id, COUNT(*) AS months FROM activity GROUP BY user_id) a ON a.user_id = u.id JOIN (SELECT user_id, SUM(amount) AS total FROM payments GROUP BY user_id) p ON p.user_id = u.id;', hints: ['<code>JOIN (SELECT user_id, COUNT(*) AS months FROM activity GROUP BY user_id) a ON a.user_id = u.id</code>', '<code>payments</code> үшін де дәл сондай туынды кесте жазыңыз: <code>SUM(amount) AS total</code>. Сыртқы сұрауда GROUP BY керек емес.'] },
        { type: 'quiz', xp: 10, prompt: 'PostgreSQL-де <code>SELECT price * 1.12 AS with_vat FROM products WHERE with_vat &gt; 10000</code> неге қате береді?', options: ['AS қате жазылған', 'WHERE SELECT-тен бұрын орындалады, сондықтан with_vat alias-ы әлі жоқ', 'WHERE-де көбейтуге болмайды', '1.12 бүтін сан емес'], answer: 1, explain: 'Орындалу реті: FROM → WHERE → ... → SELECT. Шартта өрнекті қайта жазу керек: WHERE price * 1.12 > 10000.' },
        { type: 'quiz', xp: 10, prompt: 'Бір студент көп курсқа жазылады, бір курста көп студент оқиды. Мұны дерекқорда қалай сақтаған дұрыс?', options: ['students кестесіне course1, course2, course3 бағандарын қосу', 'Үш кесте: students, courses және екеуінің id-ін сақтайтын байланыстырушы кесте (enrollments)', 'courses кестесіне студенттердің атын үтірмен жазу', 'Бәрін бір кестеге жазып, студенттің деректерін әр курс үшін қайталау'], answer: 1, explain: 'Бұл — M:N байланыс. Ол әрқашан екі foreign key-і бар байланыстырушы кесте арқылы сақталады, біздің order_items сияқты.' }
      ]
    },
    {
      id: 'sql-gate', gate: true, title: 'Модуль емтиханы: SQL Core', minutes: 25,
      body: `
<p>Бұл — модульдің қорытынды тексерісі. Тапсырмалар әр сабақтан араласып келеді, қадамдық кеңестер (hint) жоқ. Барлығын орындасаңыз, модуль аяқталады және <b>L2 SQL Practitioner</b> деңгейіне жақындайсыз.</p>
<p>Дерекқор сол: <code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>.</p>
<div class="tip">Асықпаңыз: алдымен «Іске қосу» арқылы аралық нәтижені қарап, сосын тексеріңіз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 30, prompt: 'Тек <code>delivered</code> тапсырыстар бойынша ең көп ақша жұмсаған 3 клиенттің атын және жалпы сомасын, кему ретімен шығарыңыз.', starter: '', solution: "SELECT c.name, SUM(oi.quantity * p.price) AS total FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY c.id, c.name ORDER BY total DESC LIMIT 3;", check: { ordered: true }, hints: [] },
        { type: 'sql', dataset: 'shop', xp: 30, prompt: 'Әр ай үшін (<code>YYYY-MM</code> форматында) тапсырыс берген қайталанбайтын клиенттер санын, айлар бойынша өсу ретімен шығарыңыз.', starter: '', solution: 'SELECT substr(order_date, 1, 7) AS month, COUNT(DISTINCT customer_id) FROM orders GROUP BY month ORDER BY month;', check: { ordered: true }, hints: [] },
        { type: 'sql', dataset: 'shop', xp: 30, prompt: 'Барлығы кемінде 3 дана сатылған тауарлардың атауы мен жалпы сатылған санын шығарыңыз.', starter: '', solution: 'SELECT p.name, SUM(oi.quantity) FROM products p JOIN order_items oi ON oi.product_id = p.id GROUP BY p.id, p.name HAVING SUM(oi.quantity) >= 3;', hints: [] },
        { type: 'quiz', xp: 20, prompt: '<code>customers c LEFT JOIN orders o ... WHERE o.status = \'delivered\'</code> сұрауында тапсырысы жоқ клиенттер нәтижеде бола ма?', options: ['Иә, NULL мәнімен', 'Жоқ: WHERE шарты NULL жолдарды алып тастайды, сондықтан бұл INNER JOIN сияқты жұмыс істейді', 'Тек бір рет', 'Қате шығады'], answer: 1, explain: 'NULL = \'delivered\' ақиқат емес. Шартты ON ішіне жазсаңыз ғана LEFT JOIN барлық клиентті сақтайды.' }
      ]
    }
  ]
};
