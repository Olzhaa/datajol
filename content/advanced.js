// M3.3 Advanced SQL & Modeling. Datasets: shop, staff, metrics (daily_sales, users, activity, events), empty.
DJ.modules['m3-3'] = {
  intro: 'Аналитиктің күнделікті SQL-і: CTE, window functions, кумулятивті сома, top-N, воронка, когорт retention, star schema және сұрау жылдамдығы. Жаңа <code>metrics</code> дерекқоры өнім метрикаларына арналған.',
  lessons: [
    {
      id: 'adv-1', title: 'CTE: WITH арқылы сұрауды бөлшектеу', minutes: 12,
      body: `
<p>Күрделі сұрау оқуға қиын болады. <b>CTE</b> (Common Table Expression) сұрауды атаулы қадамдарға бөледі:</p>
<pre><code>WITH revenue AS (
  SELECT o.customer_id, SUM(oi.quantity * p.price) AS total
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  GROUP BY o.customer_id
)
SELECT AVG(total) FROM revenue;</code></pre>
<p>CTE бір сұраудың ішінде ғана өмір сүреді. Бірнеше CTE-ні үтірмен жазуға болады: <code>WITH a AS (...), b AS (...) SELECT ...</code>. Аналитиктер subquery орнына CTE-ді жиі таңдайды, себебі оны жоғарыдан төмен оқуға болады.</p>
<div class="tip">Ереже: бір CTE бір ой. «Табыс», «белсенді клиенттер», «нәтиже» деп қадамдарға бөлсеңіз, қатені табу оңай.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'CTE арқылы әр клиенттің жалпы сатып алу сомасын есептеп, сомасы 100 000-нан асатын клиенттердің <code>customer_id</code> мен сомасын шығарыңыз.', starter: 'WITH revenue AS (\n  \n)\nSELECT ', solution: 'WITH revenue AS (SELECT o.customer_id, SUM(oi.quantity * p.price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY o.customer_id) SELECT customer_id, total FROM revenue WHERE total > 100000;', check: { mustInclude: ['WITH'] }, hints: ['Сабақтағы CTE-ді алып, соңғы SELECT-ке WHERE қосыңыз.'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'CTE-де әр санаттың (<code>category</code>) орташа бағасын есептеңіз. Орташасы барлық тауарлардың орташа бағасынан жоғары санаттарды <code>category</code> және <code>avg_price</code> бағандарымен шығарыңыз.', starter: 'WITH cat AS (\n  \n)\nSELECT ', solution: 'WITH cat AS (SELECT category, AVG(price) AS avg_price FROM products GROUP BY category) SELECT category, avg_price FROM cat WHERE avg_price > (SELECT AVG(price) FROM products);', check: { mustInclude: ['WITH'] }, hints: ['CTE: <code>SELECT category, AVG(price) AS avg_price FROM products GROUP BY category</code>', 'Соңғы WHERE ішінде subquery: <code>(SELECT AVG(price) FROM products)</code>'] }
      ]
    },
    {
      id: 'adv-2', title: 'Window functions: OVER және рейтинг', minutes: 16,
      body: `
<p>Сыныптағы бағаларды елестетіңіз. <code>GROUP BY</code> «сыныптың орташасы 4.2» деп бір ғана сан береді, оқушылардың аты жоғалады. Ал <b>window function</b> әр оқушыны орнында қалдырады да, қасына «сенің сыныбыңның орташасы 4.2, сен 3-орындасың» деп жазып қояды.</p>
<p>Яғни агрегат функция жолдарды бір жолға жинайды, ал window function әр жолды сақтап, оның қасына «терезе» бойынша есеп қосады. Бұл <code>staff</code> дерекқоры: <code>employees(id, name, department, salary, hire_date, manager_id)</code>.</p>
<pre><code>SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;</code></pre>
<p><code>PARTITION BY</code> терезені топтарға бөледі, <code>ORDER BY</code> терезе ішіндегі ретті береді. <code>PARTITION BY</code> жазылмаса, бүкіл кесте бір терезе болады: <code>OVER (ORDER BY salary DESC)</code> бүкіл компания бойынша рейтинг береді.</p>
<h3>Қадамдап мысал</h3>
<p>Кіші кесте:</p>
<table>
<tr><th>name</th><th>department</th><th>salary</th></tr>
<tr><td>Айгүл</td><td>IT</td><td>900</td></tr>
<tr><td>Болат</td><td>IT</td><td>720</td></tr>
<tr><td>Дана</td><td>IT</td><td>720</td></tr>
<tr><td>Ерлан</td><td>Sales</td><td>560</td></tr>
<tr><td>Жанар</td><td>Sales</td><td>640</td></tr>
</table>
<pre><code>SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
FROM employees;</code></pre>
<p>SQL алдымен жолдарды бөлімге бөледі (IT: 3 жол, Sales: 2 жол). Әр бөлім ішінде орташаны есептейді: IT = (900 + 720 + 720) / 3 = 780, Sales = (560 + 640) / 2 = 600. Сосын бөлім ішінде жалақыны кемуі бойынша реттеп, орын береді:</p>
<table>
<tr><th>name</th><th>department</th><th>salary</th><th>dept_avg</th><th>rnk</th></tr>
<tr><td>Айгүл</td><td>IT</td><td>900</td><td>780</td><td>1</td></tr>
<tr><td>Болат</td><td>IT</td><td>720</td><td>780</td><td>2</td></tr>
<tr><td>Дана</td><td>IT</td><td>720</td><td>780</td><td>2</td></tr>
<tr><td>Жанар</td><td>Sales</td><td>640</td><td>600</td><td>1</td></tr>
<tr><td>Ерлан</td><td>Sales</td><td>560</td><td>600</td><td>2</td></tr>
</table>
<p>Жолдар саны өзгерген жоқ: 5 жол кірді, 5 жол шықты. Window function нәтижесімен арифметика да жасауға болады, мысалы оны <code>salary</code>-дан алып тастап, «орташадан қаншаға артық» деген баған жасау.</p>
<h3>Рейтинг функциялары</h3>
<table>
<tr><th>Функция</th><th>Тең мәндерде</th><th>Мысал (900, 720, 720, 560)</th></tr>
<tr><td><code>ROW_NUMBER()</code></td><td>әрқашан бірегей нөмір</td><td>1, 2, 3, 4</td></tr>
<tr><td><code>RANK()</code></td><td>бірдей орын, сосын секіреді</td><td>1, 2, 2, 4</td></tr>
<tr><td><code>DENSE_RANK()</code></td><td>бірдей орын, секірмейді</td><td>1, 2, 2, 3</td></tr>
<tr><td><code>NTILE(n)</code></td><td>жолдарды n тең топқа бөледі</td><td>квартильдер үшін</td></tr>
</table>
<div class="tip">Window function <code>WHERE</code> орындалғаннан кейін есептеледі, сондықтан оны <code>WHERE</code>-де тікелей қолдануға болмайды. Subquery не CTE ішіне орап, сыртында сүзіңіз.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>DESC</code>-ті ұмыту. <code>ORDER BY</code> әдепкіде өсу ретімен жүреді, сонда ең <b>аз</b> жалақы 1-орын алады.</li>
<li>Керек жерде <code>PARTITION BY</code>-ды ұмыту: «бөлім ішіндегі» рейтингтің орнына бүкіл компания бойынша рейтинг шығады.</li>
<li><code>WHERE rnk &lt;= 3</code> деп сол сұраудың ішінде жазу. Қате береді: алдымен ішкі сұрауда рейтингті есептеп, сыртқы сұрауда сүзіңіз.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Әр қызметкердің аты, бөлімі, жалақысы және бөлім ішіндегі жалақы рейтингін (<code>RANK</code>, жоғарыдан төмен) шығарыңыз.', starter: 'SELECT name, department, salary,\n  RANK() OVER (\n  ) AS rnk\nFROM employees;', solution: 'SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk FROM employees;', check: { mustInclude: ['OVER'] }, hints: ['<code>PARTITION BY department ORDER BY salary DESC</code>'] },
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Әр қызметкердің аты, жалақысы және өз бөлімінің орташа жалақысынан айырмасы (<code>diff</code> = жалақы − бөлім орташасы) шығарыңыз.', starter: 'SELECT name, salary,\n  \nFROM employees;', solution: 'SELECT name, salary, salary - AVG(salary) OVER (PARTITION BY department) AS diff FROM employees;', check: { mustInclude: ['OVER'] }, hints: ['<code>AVG(salary) OVER (PARTITION BY department)</code> бөлім орташасын әр жолға қояды.'] },
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Жалақысы бойынша компаниядағы алғашқы 3 «орынды» (<code>DENSE_RANK</code> ≤ 3) алатын қызметкерлердің аты мен жалақысын шығарыңыз.', starter: '', solution: 'SELECT name, salary FROM (SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS r FROM employees) WHERE r <= 3;', check: { mustInclude: ['DENSE_RANK'] }, hints: ['Window function-ды subquery ішіне орап, сыртында <code>WHERE r &lt;= 3</code> жазыңыз.'] }
      ]
    },
    {
      id: 'adv-3', title: 'Кумулятивті сома және жылжымалы орташа', minutes: 14,
      body: `
<p>Қолыңызда жинақ қорабы (копилка) бар деп елестетіңіз. Күн сайын оған ақша саласыз. «Бүгін қанша салдым?» — бұл күндік сан. «Қорапта барлығы қанша жиналды?» — бұл <b>кумулятивті сома</b>. Ол әр күні алдыңғы жиынға бүгінгі санды қосып отырады.</p>
<p>Терезеге <code>ORDER BY</code> қосылса, агрегат «осы жолға дейінгі» мәндерді ғана көреді. Бұл <b>running total</b> (кумулятивті сома):</p>
<pre><code>SELECT day, revenue,
  SUM(revenue) OVER (ORDER BY day) AS running
FROM daily_sales
WHERE region = 'Алматы';</code></pre>
<h3>Қадамдап мысал</h3>
<p>Бір аймақтың 5 күндік табысы (сандар оқу үшін ойдан алынған). <code>running</code> бағаны жиналып отырады, <code>ma3</code> — төмендегі 3 күндік жылжымалы орташа:</p>
<table>
<tr><th>day</th><th>revenue</th><th>running</th><th>ma3</th></tr>
<tr><td>1</td><td>100</td><td>100</td><td>100 / 1 = 100</td></tr>
<tr><td>2</td><td>120</td><td>100 + 120 = 220</td><td>(100 + 120) / 2 = 110</td></tr>
<tr><td>3</td><td>90</td><td>220 + 90 = 310</td><td>(100 + 120 + 90) / 3 ≈ 103.33</td></tr>
<tr><td>4</td><td>150</td><td>310 + 150 = 460</td><td>(120 + 90 + 150) / 3 = 120</td></tr>
<tr><td>5</td><td>130</td><td>460 + 130 = 590</td><td>(90 + 150 + 130) / 3 ≈ 123.33</td></tr>
</table>
<p>Соңғы <code>running</code> (590) барлық күндердің қосындысына тең. Ал <code>ma3</code> 90-нан 150-ге секірудің орнына баяу өзгереді.</p>
<h3>Терезе шекарасы: ROWS BETWEEN</h3>
<p>Күнделікті деректер «секіреді». <b>Жылжымалы орташа</b> (moving average) трендті тегістейді. Соңғы 3 күн:</p>
<pre><code>AVG(revenue) OVER (
  PARTITION BY region ORDER BY day
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
) AS ma3</code></pre>
<p><code>2 PRECEDING</code> — алдыңғы 2 жол, <code>CURRENT ROW</code> — осы жол. Алғашқы күндерде терезе толық емес, сондықтан орташа аз жолдан есептеледі (кестедегі 1- және 2-күн). <code>PARTITION BY region</code> әр аймақтың терезесін бөлек ұстайды: Астананың орташасына Алматының күндері араласпайды.</p>
<h3>Үлес (share of total)</h3>
<pre><code>revenue * 100.0 / SUM(revenue) OVER (PARTITION BY day)</code></pre>
<p>Мысалы, бір күні Алматы 300, Астана 200 тапты. Сол күннің жиыны 500, сондықтан үлестер: 300 × 100.0 / 500 = 60.0% және 40.0%. Бұл жерде <code>ORDER BY</code> жоқ: бізге «осы күнге дейін» емес, бүкіл күннің жиыны керек.</p>
<p><code>100.0</code> жазу маңызды: бүтін санды бүтінге бөлсе, SQLite бөлшекті тастап жібереді.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>OVER</code> ішіндегі <code>ORDER BY</code> тек есептеу ретін береді. Нәтиженің өзі реттелуі үшін сұраудың соңына да <code>ORDER BY</code> жазыңыз. (2) Бірнеше аймақ болса, <code>PARTITION BY region</code>-ды ұмытпаңыз, әйтпесе қосынды мен орташа аймақтарды араластырады. (3) <code>100</code> деп бүтін сан жазсаңыз, бөлшек жоғалады: 33.3% орнына 33 шығады.</div>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: '<code>daily_sales</code> кестесінен Алматы бойынша <code>day</code>, <code>revenue</code> және кумулятивті сома <code>running</code> бағандарын күн ретімен шығарыңыз.', starter: "SELECT day, revenue,\n  \nFROM daily_sales\nWHERE region = 'Алматы'\nORDER BY day;", solution: "SELECT day, revenue, SUM(revenue) OVER (ORDER BY day) AS running FROM daily_sales WHERE region = 'Алматы' ORDER BY day;", check: { ordered: true, mustInclude: ['OVER'] }, hints: ['<code>SUM(revenue) OVER (ORDER BY day)</code>'] },
        { type: 'sql', dataset: 'metrics', xp: 25, prompt: 'Әр аймақ үшін <code>region</code>, <code>day</code> және 3 күндік жылжымалы орташа <code>ma3</code> шығарыңыз. Ретi: аймақ, сосын күн.', starter: '', solution: 'SELECT region, day, AVG(revenue) OVER (PARTITION BY region ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS ma3 FROM daily_sales ORDER BY region, day;', check: { ordered: true, mustInclude: ['ROWS'] }, hints: ['<code>PARTITION BY region ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>', 'Соңында <code>ORDER BY region, day</code>.'] },
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: 'Әр жол үшін <code>day</code>, <code>region</code> және сол күнгі жалпы табыстағы аймақ үлесін пайызбен (<code>share</code>, бір ондық белгіге дейін <code>ROUND</code>) шығарыңыз.', starter: '', solution: 'SELECT day, region, ROUND(revenue * 100.0 / SUM(revenue) OVER (PARTITION BY day), 1) AS share FROM daily_sales;', check: { mustInclude: ['OVER'] }, hints: ['Бөлім: <code>SUM(revenue) OVER (PARTITION BY day)</code>.', '<code>ROUND(x, 1)</code>'] }
      ]
    },
    {
      id: 'adv-4', title: 'LAG және LEAD: өсімді есептеу', minutes: 14,
      body: `
<p>Таразыға күнде тұрасыз дейік. «Кеше 70 кг едім, бүгін 69.5» — бүгінгі санды мағыналы ететін нәрсе <b>алдыңғы</b> күнмен салыстыру. SQL-де жолдар бір-бірін «көрмейді», бірақ <code>LAG</code> мен <code>LEAD</code> көршіге қарауға мүмкіндік береді.</p>
<p><code>LAG(col)</code> — алдыңғы жолдың мәні, <code>LEAD(col)</code> — келесі жолдың мәні. Олар айлық өсімді (month-over-month) есептеуге таптырмайды. «Алдыңғы» деген ұғым <code>OVER (ORDER BY ...)</code> ішіндегі реттен шығады. Баған кез келген түрде бола алады: сан, мәтін, күн. Мысалы, <code>LAG(order_date)</code> алдыңғы тапсырыстың күнін береді.</p>
<h3>Қадамдап мысал</h3>
<p>Айлық тапсырыстар (оқу үшін ойдан алынған сандар) және <code>LAG</code>/<code>LEAD</code> нәтижесі:</p>
<table>
<tr><th>month</th><th>orders</th><th>prev (LAG)</th><th>next (LEAD)</th><th>change</th><th>pct</th></tr>
<tr><td>2024-01</td><td>40</td><td>NULL</td><td>50</td><td>NULL</td><td>NULL</td></tr>
<tr><td>2024-02</td><td>50</td><td>40</td><td>45</td><td>50 − 40 = 10</td><td>10 × 100.0 / 40 = 25.0</td></tr>
<tr><td>2024-03</td><td>45</td><td>50</td><td>54</td><td>45 − 50 = −5</td><td>−5 × 100.0 / 50 = −10.0</td></tr>
<tr><td>2024-04</td><td>54</td><td>45</td><td>NULL</td><td>54 − 45 = 9</td><td>9 × 100.0 / 45 = 20.0</td></tr>
</table>
<p>Пайыз әрқашан <b>алдыңғы</b> мәнге бөлінеді: «өткен аймен салыстырғанда қаншаға өстік». Кестені SQL-мен былай аламыз:</p>
<pre><code>WITH m AS (
  SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders
  FROM orders GROUP BY month
)
SELECT month, orders,
  orders - LAG(orders) OVER (ORDER BY month) AS change
FROM m;</code></pre>
<p>Бірінші айда алдыңғы ай жоқ, сондықтан <code>LAG</code> <code>NULL</code> қайтарады. Бұл қате емес.</p>
<h3>Пайыздық өзгеріс</h3>
<pre><code>ROUND((x - LAG(x) OVER (ORDER BY d)) * 100.0 / LAG(x) OVER (ORDER BY d), 1)</code></pre>
<p>Бұл формулада <code>LAG</code> екі рет жазылады: бір рет айырма үшін, бір рет бөлім үшін. CTE ішінде алдымен <code>prev</code> бағанын есептеп алсаңыз, сыртқы сұрау қысқарады.</p>
<div class="tip"><code>LAG(col, 7)</code> 7 жол артқа қарайды: апталық салыстыру (week-over-week) үшін ыңғайлы.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>OVER ()</code> ішінде <code>ORDER BY</code>-ды ұмыту. Рет болмаса, «алдыңғы жол» кездейсоқ болады.</li>
<li>Кестеде бірнеше аймақ не клиент болса, оларды сүзбеу (<code>WHERE</code>) не бөлмеу (<code>PARTITION BY</code>). Сонда Астананың «кешегі» мәні ретінде Алматының соңғы күні алынып кетеді.</li>
<li>Пайызды ағымдағы мәнге бөлу не <code>100</code> деп бүтін сан жазу. Бөлім — алдыңғы мән, көбейткіш — <code>100.0</code>.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 20, prompt: '1-клиенттің тапсырыстары үшін <code>id</code>, <code>order_date</code> және алдыңғы тапсырыс күнін (<code>prev_date</code>, <code>LAG</code>) уақыт ретімен шығарыңыз.', starter: '', solution: 'SELECT id, order_date, LAG(order_date) OVER (ORDER BY order_date) AS prev_date FROM orders WHERE customer_id = 1 ORDER BY order_date;', check: { ordered: true, mustInclude: ['LAG'] }, hints: ['<code>WHERE customer_id = 1</code> + <code>LAG(order_date) OVER (ORDER BY order_date)</code>'] },
        { type: 'sql', dataset: 'shop', xp: 25, prompt: 'Айлық табысты (<code>month</code>, <code>revenue</code> = quantity × price) CTE-де есептеп, алдыңғы аймен айырмасын <code>change</code> қосып, ай ретімен шығарыңыз. Барлық статустағы тапсырыстар саналады.', starter: 'WITH m AS (\n  \n)\nSELECT ', solution: 'WITH m AS (SELECT substr(o.order_date, 1, 7) AS month, SUM(oi.quantity * p.price) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id GROUP BY month) SELECT month, revenue, revenue - LAG(revenue) OVER (ORDER BY month) AS change FROM m ORDER BY month;', check: { ordered: true, mustInclude: ['LAG'] }, hints: ['CTE: orders, order_items, products кестелерін JOIN жасап, <code>substr(o.order_date, 1, 7)</code> бойынша топтаңыз.', '<code>revenue - LAG(revenue) OVER (ORDER BY month)</code>'] },
        { type: 'sql', dataset: 'metrics', xp: 25, prompt: 'Астана бойынша <code>day</code>, <code>revenue</code> және алдыңғы күнге қарағандағы пайыздық өзгерісті (<code>pct</code>, бір ондық белгі) күн ретімен шығарыңыз.', starter: '', solution: "SELECT day, revenue, ROUND((revenue - LAG(revenue) OVER (ORDER BY day)) * 100.0 / LAG(revenue) OVER (ORDER BY day), 1) AS pct FROM daily_sales WHERE region = 'Астана' ORDER BY day;", check: { ordered: true, mustInclude: ['LAG'] }, hints: ['Сабақтағы пайыздық өзгеріс формуласын қолданыңыз.'] }
      ]
    },
    {
      id: 'adv-5', title: 'Top-N әр топта және дубликаттарды алу', minutes: 12,
      body: `
<p>«Әр бөлімнің ең көп жалақы алатын қызметкері», «әр клиенттің соңғы тапсырысы» — сұхбатта ең жиі кездесетін SQL тапсырмалары. Үлгі әрқашан бірдей:</p>
<pre><code>SELECT * FROM (
  SELECT e.*,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees e
)
WHERE rn = 1;</code></pre>
<p><code>rn = 1</code> — әр топтан біреу, <code>rn &lt;= 3</code> — әр топтан үшеу.</p>
<h3>Дубликаттарды тазалау</h3>
<p>Деректе бір клиент екі рет жазылса, <code>ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC)</code> арқылы ең соңғы жазбаны қалдырасыз. Бұл — data cleaning-тің стандарт тәсілі.</p>
<div class="tip">Тең мәндердің бәрін қалдыру керек болса, <code>ROW_NUMBER</code> орнына <code>RANK</code> қолданыңыз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Әр бөлімнің ең жоғары жалақы алатын қызметкерін шығарыңыз: <code>department</code>, <code>name</code>, <code>salary</code>.', starter: '', solution: 'SELECT department, name, salary FROM (SELECT department, name, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn FROM employees) WHERE rn = 1;', check: { mustInclude: ['OVER'] }, hints: ['Сабақтағы үлгіні қолданыңыз.'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Әр клиенттің ең соңғы тапсырысын шығарыңыз: <code>customer_id</code>, <code>id</code>, <code>order_date</code>.', starter: '', solution: 'SELECT customer_id, id, order_date FROM (SELECT customer_id, id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) WHERE rn = 1;', check: { mustInclude: ['OVER'] }, hints: ['<code>PARTITION BY customer_id ORDER BY order_date DESC</code>'] },
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: 'Әр аймақтың табысы ең жоғары 2 күнін шығарыңыз: <code>region</code>, <code>day</code>, <code>revenue</code>.', starter: '', solution: 'SELECT region, day, revenue FROM (SELECT region, day, revenue, ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC) AS rn FROM daily_sales) WHERE rn <= 2;', check: { mustInclude: ['OVER'] }, hints: ['<code>WHERE rn &lt;= 2</code>'] }
      ]
    },
    {
      id: 'adv-6', title: 'CASE WHEN, pivot және воронка', minutes: 14,
      body: `
<p><code>CASE WHEN</code> — SQL ішіндегі if/else. Ол жаңа категория жасайды:</p>
<pre><code>SELECT name,
  CASE WHEN price >= 100000 THEN 'қымбат'
       WHEN price >= 10000 THEN 'орташа'
       ELSE 'арзан' END AS segment
FROM products;</code></pre>
<h3>Шартты агрегация (pivot)</h3>
<p>Жолдарды бағандарға айналдыру үшін <code>CASE</code>-ті агрегаттың ішіне жазамыз:</p>
<pre><code>SELECT
  SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders;</code></pre>
<h3>Воронка (funnel)</h3>
<p><code>events(user_id, step)</code> кестесінде қадамдар бар: <code>visit</code> → <code>cart</code> → <code>purchase</code>. Әр қадамға жеткен бірегей пайдаланушылар:</p>
<pre><code>COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END) AS cart</code></pre>
<p><code>CASE</code>-те <code>ELSE</code> жоқ болса, нәтиже <code>NULL</code> болады, ал <code>COUNT</code> NULL-ды санамайды. Конверсия = келесі қадам / алдыңғы қадам.</p>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 15, prompt: 'Әр тауардың <code>name</code> және <code>segment</code> бағанын шығарыңыз: бағасы ≥ 100 000 болса <code>қымбат</code>, ≥ 10 000 болса <code>орташа</code>, қалғаны <code>арзан</code>.', starter: '', solution: "SELECT name, CASE WHEN price >= 100000 THEN 'қымбат' WHEN price >= 10000 THEN 'орташа' ELSE 'арзан' END AS segment FROM products;", check: { mustInclude: ['CASE'] }, hints: ['Сабақтағы мысалды қараңыз.'] },
        { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Бір жолда үш баған шығарыңыз: <code>delivered</code>, <code>shipped</code>, <code>cancelled</code> статусындағы тапсырыстар саны.', starter: '', solution: "SELECT SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered, SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) AS shipped, SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled FROM orders;", check: { ordered: true, mustInclude: ['CASE'] }, hints: ['Үш <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code>, баған реті: delivered, shipped, cancelled.'] },
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: 'Воронканы бір жолда шығарыңыз: <code>visit</code>, <code>cart</code>, <code>purchase</code> қадамына жеткен бірегей пайдаланушылар саны.', starter: '', solution: "SELECT COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END) AS visit, COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END) AS cart, COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END) AS purchase FROM events;", check: { ordered: true, mustInclude: ['CASE'] }, hints: ["<code>COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END)</code>"] },
        { type: 'number', xp: 15, prompt: 'Воронкада 12 адам кірді (visit), 7-і себетке салды (cart), 4-і сатып алды (purchase). Cart → purchase конверсиясы неше пайыз? (бір ондық белгіге дейін)', answer: 57.1, tol: 0.06, unit: '%', explain: '4 / 7 × 100% ≈ 57.1%.' }
      ]
    },
    {
      id: 'adv-7', title: 'Когорттық талдау және retention', minutes: 16,
      body: `
<p>Мектеп түлектерін елестетіңіз: «2020 жылғы түлектердің қаншасы 5 жылдан кейін де кездесуге келеді?» Бір жылы бітіргендерді бір топ ретінде қадағалаймыз. Өнімде де солай: бір айда тіркелгендерді бірге бақылап, олардың қаншасы қайта оралатынын көреміз.</p>
<p><b>Когорт</b> — бір уақытта келген пайдаланушылар тобы, мысалы шілдеде тіркелгендер. <b>Retention</b> — когорттың қанша пайызы кейінгі айларда да белсенді.</p>
<p><code>metrics</code> дерекқоры: <code>users(id, signup_month, channel)</code> және <code>activity(user_id, month)</code> (пайдаланушы белсенді болған айлар).</p>
<h3>1-қадам: когорт өлшемі</h3>
<pre><code>SELECT signup_month, COUNT(*) AS size FROM users GROUP BY signup_month;</code></pre>
<h3>2-қадам: әр айдағы белсенділер</h3>
<pre><code>SELECT u.signup_month AS cohort, a.month, COUNT(DISTINCT a.user_id) AS active
FROM users u JOIN activity a ON a.user_id = u.id
GROUP BY cohort, a.month;</code></pre>
<h3>3-қадам: пайызға айналдыру</h3>
<p>Екі нәтижені CTE арқылы біріктіріп, <code>active * 100.0 / size</code> есептейміз. Нәтиже — retention кестесі: жолдар когорттар, бағандар айлар.</p>
<p>Жоспар: 1-қадамды <code>WITH</code> ішіне CTE етіп жазасыз. 2-қадамның сұрауына осы CTE-ді <code>signup_month</code> бойынша <code>JOIN</code> жасайсыз, сонда әр жолда когорт өлшемі де тұрады. Ең соңында <code>ROUND(..., 1)</code> арқылы бір ондық белгіге дейін дөңгелектейсіз.</p>
<h3>Қадамдап мысал</h3>
<p>Ойдан алынған екі когорт. 1-қадамның нәтижесі: қаңтар когорты 10 адам, ақпан когорты 5 адам. 2-қадамның нәтижесі (белсенділер саны):</p>
<table>
<tr><th>cohort</th><th>size</th><th>2024-01</th><th>2024-02</th><th>2024-03</th></tr>
<tr><td>2024-01</td><td>10</td><td>10</td><td>6</td><td>4</td></tr>
<tr><td>2024-02</td><td>5</td><td>—</td><td>5</td><td>2</td></tr>
</table>
<p>3-қадам: әр ұяшықты сол когорттың өлшеміне бөлеміз. Мысалы, 6 × 100.0 / 10 = 60.0, ал 2 × 100.0 / 5 = 40.0:</p>
<table>
<tr><th>cohort</th><th>2024-01</th><th>2024-02</th><th>2024-03</th></tr>
<tr><td>2024-01</td><td>100.0</td><td>60.0</td><td>40.0</td></tr>
<tr><td>2024-02</td><td>—</td><td>100.0</td><td>40.0</td></tr>
</table>
<p>Оқу: қаңтарда тіркелгендердің 60%-ы ақпанда, 40%-ы наурызда қайта келді. Ақпан когорты екінші айында-ақ 40%-ға түсті, бұл қаңтар когортынан нашар. SQL нәтижесі «ұзын» форматта шығады (<code>cohort</code>, <code>month</code>, <code>retention</code> — әр ұяшық бір жол), ал жоғарыдағы тор — соны көзге ыңғайлы етіп жайған түрі.</p>
<div class="tip">Retention-ды арна (<code>channel</code>) бойынша бөлсеңіз, қай жарнама «сапалы» клиент әкелетінін көресіз.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>COUNT(*)</code> қолдану. Бір адамның айда бірнеше белсенділік жолы болса, ол бірнеше рет саналады. <code>COUNT(DISTINCT a.user_id)</code> керек.</li>
<li>Алдыңғы айдың белсенділеріне бөлу. Retention әрқашан когорттың <b>бастапқы өлшеміне</b> бөлінеді.</li>
<li><code>100</code> деп бүтін сан жазу: <code>2 * 100 / 5</code> дұрыс шыққанымен, <code>1 * 100 / 3</code> 33.3 емес, 33 береді. <code>100.0</code> жазыңыз.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 15, prompt: 'Әр когорттың өлшемін шығарыңыз: <code>signup_month</code> және <code>size</code>.', starter: '', solution: 'SELECT signup_month, COUNT(*) AS size FROM users GROUP BY signup_month;', hints: ['<code>GROUP BY signup_month</code>'] },
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: 'Әр когорт пен ай үшін белсенді пайдаланушылар санын шығарыңыз: <code>cohort</code>, <code>month</code>, <code>active</code>. Реті: когорт, сосын ай.', starter: '', solution: 'SELECT u.signup_month AS cohort, a.month, COUNT(DISTINCT a.user_id) AS active FROM users u JOIN activity a ON a.user_id = u.id GROUP BY cohort, a.month ORDER BY cohort, a.month;', check: { ordered: true }, hints: ['Сабақтағы 2-қадам + <code>ORDER BY cohort, a.month</code>.'] },
        { type: 'sql', dataset: 'metrics', xp: 30, prompt: 'Retention кестесін шығарыңыз: <code>cohort</code>, <code>month</code>, <code>retention</code> (белсенділер / когорт өлшемі × 100, бір ондық белгі). Реті: когорт, ай.', starter: 'WITH size AS (\n  \n)\nSELECT ', solution: 'WITH size AS (SELECT signup_month, COUNT(*) AS n FROM users GROUP BY signup_month) SELECT u.signup_month AS cohort, a.month, ROUND(100.0 * COUNT(DISTINCT a.user_id) / s.n, 1) AS retention FROM users u JOIN activity a ON a.user_id = u.id JOIN size s ON s.signup_month = u.signup_month GROUP BY cohort, a.month ORDER BY cohort, a.month;', check: { ordered: true, mustInclude: ['WITH'] }, hints: ['CTE-де когорт өлшемін есептеп, оны <code>signup_month</code> бойынша JOIN жасаңыз.', '<code>ROUND(100.0 * COUNT(DISTINCT a.user_id) / s.n, 1)</code>'] }
      ]
    },
    {
      id: 'adv-8', title: 'Деректер моделі: star schema', minutes: 14,
      body: `
<p>Аналитикалық дерекқор (data warehouse) әдетте <b>star schema</b> түрінде құрылады: ортада бір <b>fact</b> кестесі, айналасында <b>dimension</b> кестелері.</p>
<table>
<tr><th></th><th>Fact кестесі</th><th>Dimension кестесі</th></tr>
<tr><td>Не сақтайды</td><td>Оқиғалар мен өлшемдер: сатылым, сома, саны</td><td>Сипаттамалар: тауар, клиент, күн, дүкен</td></tr>
<tr><td>Жол саны</td><td>Өте көп (миллиондар)</td><td>Аз</td></tr>
<tr><td>Мысал</td><td><code>fact_sales(date_key, product_key, quantity, amount)</code></td><td><code>dim_product(product_key, name, category)</code></td></tr>
</table>
<h3>Grain (түйіршік)</h3>
<p>Fact кестесін жобалағанда алдымен <b>бір жол нені білдіреді</b> деп сұраймыз: «бір чектегі бір тауар» ме, әлде «бір күндегі бір дүкен» бе? Grain-ді анық айтпау — есептердегі қателердің негізгі көзі.</p>
<h3>Нормализация және денормализация</h3>
<p>OLTP жүйелер (банк, дүкен қосымшасы) қайталануды азайту үшін нормализацияланады. Аналитикада жылдам оқу үшін dimension кестелері әдейі денормализацияланады: категория атауы тауар кестесінде тұра береді.</p>
<div class="tip">Power BI мен басқа BI құралдары star schema-мен ең жақсы жұмыс істейді. Бір үлкен «бәрі бір кестеде» файлдан гөрі fact + dimension моделі дұрыс.</div>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Төмендегінің қайсысы fact кестесінің бағаны?', options: ['Тауар санаты', 'Клиенттің қаласы', 'Сатылым сомасы', 'Айдың атауы'], answer: 2, explain: 'Сома — өлшенетін, қосылатын мән, яғни fact. Қалғандары сипаттама, яғни dimension.' },
        { type: 'quiz', xp: 10, prompt: 'Fact кестесінің grain-і «бір чектегі бір тауар» болса, бір чекте 3 тауар болғанда кестеде неше жол болады?', options: ['1', '3', 'Тауар санына қарамай 2', 'Чектер санына тең'], answer: 1, explain: 'Grain әр тауарға жеке жол береді: 3 тауар = 3 жол.' },
        { type: 'quiz', xp: 10, prompt: 'Неліктен аналитикалық модельде dimension кестелері жиі денормализацияланады?', options: ['Дискте орын үнемдеу үшін', 'Сұраулар қарапайым және жылдам болуы үшін', 'Транзакцияларды жылдамдату үшін', 'SQL басқаша жұмыс істемейді'], answer: 1, explain: 'Аналитикада оқу жазудан әлдеқайда жиі, сондықтан аз JOIN-мен оқу тиімді.' },
        { type: 'sql', dataset: 'empty', xp: 25, prompt: 'Бос дерекқорда fact кестесін құрыңыз: <code>fact_sales</code>, бағандары <code>sale_id INTEGER PRIMARY KEY</code>, <code>date_key INTEGER</code>, <code>product_key INTEGER</code>, <code>quantity INTEGER</code>, <code>amount REAL</code>.', starter: 'CREATE TABLE fact_sales (\n  \n);', solution: 'CREATE TABLE fact_sales (sale_id INTEGER PRIMARY KEY, date_key INTEGER, product_key INTEGER, quantity INTEGER, amount REAL);', check: { after: "SELECT name, UPPER(type), pk FROM pragma_table_info('fact_sales')" }, hints: ['Бағандарды үтірмен бөліп, әрқайсысына тип беріңіз.'] }
      ]
    },
    {
      id: 'adv-9', title: 'Сұрау жылдамдығы: индекс және жақсы әдеттер', minutes: 12,
      body: `
<p>Кесте миллиондаған жолға жеткенде сұраудың жылдамдығы маңызды болады. Негізгі құрал — <b>индекс</b>. Ол кітаптың соңындағы көрсеткіш сияқты: бүкіл кестені оқымай, керекті жолдарды бірден табады.</p>
<pre><code>CREATE INDEX idx_orders_customer ON orders(customer_id);</code></pre>
<p>Индекс <code>WHERE</code>, <code>JOIN ... ON</code> және <code>ORDER BY</code>-да жиі қолданылатын бағандарға пайдалы. Бірақ әр индекс жазуды баяулатады және орын алады.</p>
<h3>EXPLAIN</h3>
<p><code>EXPLAIN QUERY PLAN SELECT ...</code> дерекқордың сұрауды қалай орындайтынын көрсетеді: <code>SCAN</code> — бүкіл кестені оқу, <code>SEARCH ... USING INDEX</code> — индекспен іздеу.</p>
<h3>Жақсы әдеттер</h3>
<ul>
<li><code>SELECT *</code> орнына керекті бағандарды ғана алыңыз.</li>
<li>Индекстелген бағанға функция қолданбаңыз: <code>WHERE substr(order_date,1,4) = '2024'</code> индексті «өшіреді», ал <code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code> индексті қолданады.</li>
<li>Алдымен сүзіңіз, сосын JOIN жасаңыз: аз жол, жылдам нәтиже.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 20, prompt: '<code>orders</code> кестесінің <code>customer_id</code> бағанына индекс құрыңыз (атауы кез келген).', starter: '', solution: 'CREATE INDEX idx_orders_customer ON orders(customer_id);', check: { mustInclude: ['CREATE INDEX'], after: "SELECT COUNT(*) FROM sqlite_master WHERE type = 'index' AND tbl_name = 'orders' AND sql LIKE '%customer_id%'" }, hints: ['<code>CREATE INDEX атау ON кесте(баған);</code>'] },
        { type: 'quiz', xp: 10, prompt: '<code>order_date</code> бағанында индекс бар. Қай шарт индексті тиімді қолданады?', options: ["<code>WHERE substr(order_date, 1, 7) = '2024-09'</code>", "<code>WHERE order_date >= '2024-09-01' AND order_date < '2024-10-01'</code>", "<code>WHERE order_date LIKE '%09%'</code>", 'Үшеуі бірдей'], answer: 1, explain: 'Бағанның өзі салыстырылса, индекс жұмыс істейді. Функция немесе басындағы % индексті қолдануға кедергі.' },
        { type: 'quiz', xp: 10, prompt: '<code>EXPLAIN QUERY PLAN</code> нәтижесінде <code>SCAN orders</code> жазылды. Бұл нені білдіреді?', options: ['Индекспен іздеу', 'Бүкіл кесте оқылады', 'Сұрауда қате бар', 'Нәтиже кэштен алынды'], answer: 1, explain: 'SCAN — толық оқу. Үлкен кестеде бұл баяу болуы мүмкін.' }
      ]
    },
    {
      id: 'adv-gate', gate: true, title: 'Модуль емтиханы: Advanced SQL', minutes: 30,
      body: `
<p>Қорытынды тексеріс: CTE, window functions, CASE және retention. Кеңес жоқ, бірақ «Іске қосу» арқылы аралық нәтижені көре аласыз.</p>
<p>Дерекқорлар: <code>staff</code>, <code>shop</code>, <code>metrics</code>. Әр тапсырманың үстінде қай дерекқор екені көрсетілген.</p>`,
      exercises: [
        { type: 'sql', dataset: 'staff', xp: 30, prompt: '<b>staff.</b> Әр бөлімде жалақысы бойынша <b>екінші</b> орындағы (<code>DENSE_RANK</code> = 2) қызметкерлерді шығарыңыз: <code>department</code>, <code>name</code>, <code>salary</code>.', starter: '', solution: 'SELECT department, name, salary FROM (SELECT department, name, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS r FROM employees) WHERE r = 2;', check: { mustInclude: ['DENSE_RANK'] }, hints: [] },
        { type: 'sql', dataset: 'shop', xp: 30, prompt: '<b>shop.</b> CTE-де әр клиенттің тапсырыс санын есептеп, <code>name</code>, <code>orders</code> және тапсырыс саны бойынша рейтингті (<code>DENSE_RANK</code>, көптен азға, <code>rnk</code>) шығарыңыз. Тапсырысы жоқ клиенттер кірмейді.', starter: '', solution: 'WITH c AS (SELECT customer_id, COUNT(*) AS orders FROM orders GROUP BY customer_id) SELECT cu.name, c.orders, DENSE_RANK() OVER (ORDER BY c.orders DESC) AS rnk FROM c JOIN customers cu ON cu.id = c.customer_id;', check: { mustInclude: ['WITH'] }, hints: [] },
        { type: 'sql', dataset: 'metrics', xp: 30, prompt: '<b>metrics.</b> Алматыда табысы алдыңғы күннен <b>төмендеген</b> күндерді шығарыңыз: <code>day</code>, <code>revenue</code>, <code>prev</code> (алдыңғы күннің табысы).', starter: '', solution: "SELECT day, revenue, prev FROM (SELECT day, revenue, LAG(revenue) OVER (ORDER BY day) AS prev FROM daily_sales WHERE region = 'Алматы') WHERE revenue < prev;", check: { mustInclude: ['LAG'] }, hints: [] },
        { type: 'sql', dataset: 'metrics', xp: 30, prompt: '<b>metrics.</b> Арна (<code>channel</code>) бойынша конверсияны шығарыңыз: <code>channel</code>, <code>users</code> (пайдаланушылар саны), <code>buyers</code> (<code>purchase</code> қадамына жеткендер). <code>LEFT JOIN</code> немесе <code>CASE</code> қолданыңыз.', starter: '', solution: "SELECT u.channel, COUNT(DISTINCT u.id) AS users, COUNT(DISTINCT CASE WHEN e.step = 'purchase' THEN e.user_id END) AS buyers FROM users u LEFT JOIN events e ON e.user_id = u.id GROUP BY u.channel;", hints: [] },
        { type: 'quiz', xp: 20, prompt: 'Неліктен <code>WHERE RANK() OVER (...) = 1</code> қате береді?', options: ['RANK тек ORDER BY-да жұмыс істейді', 'Window functions WHERE-ден кейін есептеледі, сондықтан оны subquery/CTE сыртында сүзу керек', 'SQLite RANK-ті қолдамайды', 'WHERE-де тек сандар болады'], answer: 1, explain: 'Логикалық рет: FROM → WHERE → GROUP BY → HAVING → window → SELECT → ORDER BY.' }
      ]
    }
  ]
};
