// M3.5 Power BI. Power BI cannot run in the browser, so lessons are text + quizzes,
// plus a few SQL exercises on the cafe dataset that compute what a DAX measure would.
(function () {
  const CLEAN = "status = 'paid' AND amount IS NOT NULL AND amount < 20000";
  DJ.modules['m3-5'] = {
    intro: 'Power BI — Қазақстандағы аналитик вакансияларында ең жиі сұралатын BI құралы. Бұл модульде жұмыс ағынын, Power Query, деректер моделін (star schema), DAX өлшемдерін, time intelligence, визуал дизайнын және жариялауды үйренесіз. Power BI браузерде іске қосылмайды, сондықтан сабақтар мәтін мен тесттен тұрады, ал DAX өлшемдерінің логикасын SQL-де тексереміз. Тегін Power BI Desktop-ты (Windows) орнатып, әр сабақты қатар қайталаңыз.',
    lessons: [
      {
        id: 'pbi-1', title: 'Power BI деген не: жұмыс ағыны', minutes: 8,
        body: `
<p><b>Power BI</b> — Microsoft-тың деректерді жүктеп, тазалап, модельдеп, интерактивті есеп (report) жасайтын құралы. Негізгі бөліктері:</p>
<table>
<tr><th>Бөлік</th><th>Не үшін</th></tr>
<tr><td><b>Power BI Desktop</b></td><td>Компьютерде есеп жасау (тегін, Windows)</td></tr>
<tr><td><b>Power BI Service</b></td><td>Браузерде есепті жариялау, бөлісу, жаңарту</td></tr>
<tr><td><b>Power BI Mobile</b></td><td>Есепті телефоннан қарау</td></tr>
</table>
<h3>Жұмыс ағыны</h3>
<pre><code>Get Data → Power Query (тазалау) → Model (байланыстар)
        → DAX (өлшемдер) → Visuals (есеп) → Publish (бөлісу)</code></pre>
<p>Бұл ағын SQL мен Python-да істегеніңізбен бірдей: тазалау, біріктіру, агрегаттау, көрсету. Тек мұнда көбі тышқанмен жасалады, ал логика <b>Power Query (M тілі)</b> мен <b>DAX</b> формулаларында сақталады.</p>
<div class="tip">Excel-ді білсеңіз, Power Query мен Power Pivot таныс болады: Power BI солардың үстіне салынған.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Есепті әріптестерге браузер арқылы бөлісу үшін не керек?', options: ['Power BI Desktop', 'Power BI Service', 'Power Query', 'DAX Studio'], answer: 1, explain: 'Desktop-та жасаймыз, Service-ке (app.powerbi.com) жариялап бөлісеміз.' },
          { type: 'quiz', xp: 10, prompt: 'Жұмыс ағынының дұрыс реті қайсы?', options: ['Visuals → DAX → Power Query → Model', 'Get Data → Power Query → Model → DAX → Visuals', 'DAX → Get Data → Visuals → Model', 'Model → Visuals → Power Query → Publish'], answer: 1, explain: 'Алдымен деректі әкеліп тазалаймыз, сосын модель мен өлшемдер, соңында визуалдар.' }
        ]
      },
      {
        id: 'pbi-2', title: 'Power Query: деректерді тазалау', minutes: 14,
        body: `
<p><b>Power Query</b> — деректерді жүктеп, түрлендіретін редактор. Әр әрекет <b>Applied Steps</b> тізіміне қадам болып жазылады, ал деректер жаңарғанда барлық қадам автоматты түрде қайта орындалады. Артында <b>M тілі</b> тұрады.</p>
<h3>Жиі қолданылатын қадамдар</h3>
<table>
<tr><th>Power Query</th><th>SQL баламасы</th></tr>
<tr><td>Change Type (типті өзгерту)</td><td><code>CAST(amount AS INTEGER)</code></td></tr>
<tr><td>Filter Rows</td><td><code>WHERE status = 'paid'</code></td></tr>
<tr><td>Remove Duplicates</td><td><code>SELECT DISTINCT</code></td></tr>
<tr><td>Replace Values / Fill Down</td><td><code>COALESCE</code>, <code>CASE</code></td></tr>
<tr><td>Merge Queries</td><td><code>JOIN</code></td></tr>
<tr><td>Append Queries</td><td><code>UNION ALL</code></td></tr>
<tr><td>Group By</td><td><code>GROUP BY</code></td></tr>
<tr><td>Unpivot Columns</td><td>кең кестені ұзын кестеге айналдыру</td></tr>
</table>
<p>Мысал M коды (Power Query өзі жазады):</p>
<pre><code>= Table.SelectRows(Orders, each [status] = "paid" and [amount] &lt;&gt; null)</code></pre>
<div class="tip">Ереже: тазалауды мүмкіндігінше Power Query-де (немесе дереккөздегі SQL-де) жасаңыз, DAX-та емес. Модельге тек таза деректер кірсін.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Екі филиалдың бірдей құрылымды сату кестелерін бір кестеге қосу үшін Power Query-дегі қай әрекет керек?', options: ['Merge Queries', 'Append Queries', 'Group By', 'Unpivot'], answer: 1, explain: 'Append — жолдарды астына қосу (UNION ALL). Merge — бағандарды кілт бойынша біріктіру (JOIN).' },
          { type: 'quiz', xp: 10, prompt: 'Кестеде айлар бағандарда тұр: Қаңтар, Ақпан, Наурыз... Графикке ыңғайлы «ай | сома» түріне қалай келтіреміз?', options: ['Pivot Column', 'Unpivot Columns', 'Transpose', 'Fill Down'], answer: 1, explain: 'Unpivot кең кестені ұзын (long) кестеге айналдырады: әр ай жеке жол болады.' },
          { type: 'sql', dataset: 'cafe', xp: 20, prompt: 'Power Query қадамдарын SQL-де қайталаңыз. <code>orders</code> кестесінен тек таза тапсырыстарды қалдырыңыз: <code>status = \'paid\'</code>, <code>amount</code> бос емес және 20 000-нан кіші. <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code> бағандарын шығарыңыз.', starter: 'SELECT id, customer_id, order_date, amount\nFROM orders\nWHERE ', solution: `SELECT id, customer_id, order_date, amount FROM orders WHERE ${CLEAN};`, hints: ['Үш шартты <code>AND</code> арқылы біріктіріңіз.', '<code>amount IS NOT NULL</code> — бос мәнді тексеру.'] }
        ]
      },
      {
        id: 'pbi-3', title: 'Деректер моделі: star schema', minutes: 14,
        body: `
<p>Power BI-да бір үлкен кесте емес, бір-бірімен байланысқан бірнеше кесте болғаны дұрыс. Ең жақсы құрылым — <b>star schema</b> (жұлдыз схемасы).</p>
<pre><code>        dim_date
            │
dim_customer ── fact_orders ── dim_product
            │
        dim_city</code></pre>
<table>
<tr><th>Кесте түрі</th><th>Не сақтайды</th><th>Мысал</th></tr>
<tr><td><b>Fact</b> (факт)</td><td>Оқиғалар мен сандар, жолдары көп</td><td>тапсырыстар: күн, клиент, сома</td></tr>
<tr><td><b>Dimension</b> (өлшем)</td><td>Сипаттамалар, «кім, не, қашан, қайда»</td><td>клиент: қала, арна</td></tr>
</table>
<h3>Байланыстар (relationships)</h3>
<ul>
<li>Әдетте <b>бір-көпке (1:*)</b>: бір клиентте көп тапсырыс.</li>
<li><b>Сүзгі бағыты</b> (filter direction) dimension-нан fact-қа қарай жүреді. Slicer-де «Алматы» таңдасаңыз, сүзгі customers → orders бойымен ағады.</li>
<li>Екі жақты (both) сүзгіні тек қажет болғанда ғана қосыңыз: ол модельді баяулатып, күтпеген нәтиже береді.</li>
</ul>
<h3>Күн кестесі (Date table)</h3>
<p>Time intelligence функциялары жұмыс істеуі үшін үзіліссіз күндері бар бөлек күн кестесі керек. Оны <b>Mark as date table</b> деп белгілейміз.</p>
<pre><code>Date = CALENDAR(DATE(2024,1,1), DATE(2024,12,31))</code></pre>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: '«Бірінші кофе» деректерінде қай кесте fact кестесі?', options: ['customers', 'orders', 'Күн кестесі', 'Қалалар тізімі'], answer: 1, explain: 'orders — оқиғалар (тапсырыстар) мен сандар (сома). customers — оларды сипаттайтын dimension.' },
          { type: 'quiz', xp: 10, prompt: 'customers (1) мен orders (*) арасындағы байланыста сүзгі әдетте қай бағытта жүреді?', options: ['orders → customers', 'customers → orders', 'Екі жаққа да міндетті түрде', 'Сүзгі жүрмейді'], answer: 1, explain: 'Dimension-нан fact-қа: қаланы таңдасаңыз, сол қаланың тапсырыстары қалады.' },
          { type: 'quiz', xp: 10, prompt: 'Неге бөлек күн кестесі керек?', options: ['Есеп әдемі көрінуі үшін', 'TOTALYTD, SAMEPERIODLASTYEAR сияқты time intelligence функциялары үзіліссіз күндерді талап етеді', 'Power BI күн бағанын оқи алмайды', 'Файл көлемін азайту үшін'], answer: 1, explain: 'Тапсырыс жоқ күндер де кестеде болуы керек, әйтпесе уақыт бойынша есептеулер қате шығады.' }
        ]
      },
      {
        id: 'pbi-4', title: 'DAX негіздері: өлшем мен есептелген баған', minutes: 15,
        body: `
<p><b>DAX</b> (Data Analysis Expressions) — Power BI-дың формула тілі. Excel формулаларына ұқсайды, бірақ ұяшықтармен емес, <b>бағандар мен кестелермен</b> жұмыс істейді.</p>
<h3>Measure мен calculated column</h3>
<table>
<tr><th></th><th>Calculated column</th><th>Measure (өлшем)</th></tr>
<tr><td>Қашан есептеледі</td><td>Жүктегенде, әр жол үшін</td><td>Визуалда, сүзгіге қарай</td></tr>
<tr><td>Қайда сақталады</td><td>Кестеде (жад алады)</td><td>Сақталмайды, формула ғана</td></tr>
<tr><td>Мысал</td><td><code>Size = IF(orders[amount] &gt; 3000, "Үлкен", "Кіші")</code></td><td><code>Revenue = SUM(orders[amount])</code></td></tr>
</table>
<p>Ұқсатсақ: calculated column — кестеге қосылған жаңа баған, әр жолда өз мәні жазылып тұрады. Measure — кестенің үстінде тұрған калькулятор: ол экранда қазір қай жолдар көрініп тұрса, соларды есептейді.</p>
<p>Ереже: агрегат (қосынды, орташа, үлес) — әрқашан <b>measure</b>. Calculated column — жолды сипаттау үшін, мысалы slicer-ге категория.</p>
<h3>Мысал: бір кесте, екі тәсіл</h3>
<table>
<tr><th>id</th><th>customer_id</th><th>amount</th><th>Size (column)</th></tr>
<tr><td>1</td><td>1</td><td>2500</td><td>Кіші</td></tr>
<tr><td>2</td><td>2</td><td>4200</td><td>Үлкен</td></tr>
<tr><td>3</td><td>1</td><td>1800</td><td>Кіші</td></tr>
<tr><td>4</td><td>1</td><td>3600</td><td>Үлкен</td></tr>
</table>
<p><code>Size</code> бағаны жүктегенде әр жолға бір рет есептелді. Енді матрицаға жолдарға <code>Size</code>, мәндерге төмендегі өлшемдерді қойсақ, әр ұяшық өз жолдарымен есептеледі:</p>
<table>
<tr><th>Size</th><th>Revenue</th><th>Orders</th><th>Customers</th><th>AOV</th></tr>
<tr><td>Кіші</td><td>4300</td><td>2</td><td>1</td><td>2150</td></tr>
<tr><td>Үлкен</td><td>7800</td><td>2</td><td>2</td><td>3900</td></tr>
<tr><td><b>Total</b></td><td>12100</td><td>4</td><td>2</td><td>3025</td></tr>
</table>
<p>Total жолындағы Customers 2, ал 1 + 2 = 3 емес: measure жиынтық жолда жолдарды қоспайды, барлық деректер бойынша <b>қайта есептейді</b>. 1-клиент екі топта да бар, бірақ бір-ақ рет саналады.</p>
<h3>Негізгі өлшемдер</h3>
<pre><code>Revenue   = SUM(orders[amount])
Orders    = COUNTROWS(orders)
Customers = DISTINCTCOUNT(orders[customer_id])
AOV       = DIVIDE([Revenue], [Orders])</code></pre>
<div class="tip"><code>DIVIDE(a, b)</code> нөлге бөлуде қате бермей, бос мән қайтарады. <code>a / b</code> орнына әрқашан соны қолданыңыз.</div>
<p>Өлшемдер бір-біріне сілтей алады: <code>AOV</code> ішінде <code>[Revenue]</code> мен <code>[Orders]</code> қолданылды. Бұл кодты қайталамауға көмектеседі.</p>
<h3>SQL баламасы</h3>
<table>
<tr><th>DAX</th><th>SQL</th></tr>
<tr><td><code>SUM(orders[amount])</code></td><td><code>SUM(amount)</code></td></tr>
<tr><td><code>COUNTROWS(orders)</code></td><td><code>COUNT(*)</code></td></tr>
<tr><td><code>DISTINCTCOUNT(orders[customer_id])</code></td><td><code>COUNT(DISTINCT customer_id)</code></td></tr>
<tr><td><code>DIVIDE(a, b)</code></td><td><code>a * 1.0 / b</code> (бүтін санды бөлуден сақтану үшін 1.0), дөңгелектеу — <code>ROUND()</code></td></tr>
</table>
<h3>Жиі қателер</h3>
<ul>
<li>Қосындыны calculated column етіп жасау: ол slicer-ге қарай өзгермейді және жад алады.</li>
<li>Бірегей клиенттерді <code>COUNT(orders[customer_id])</code> деп санау: бұл тапсырыстар санын береді, ал <code>COUNTROWS(customers)</code> әлі сатып алмағандарды да қосады.</li>
<li><code>/</code> арқылы бөлу: бос сүзгіде нөлге бөлу қатесі шығады.</li>
</ul>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Slicer-де қала таңдағанда өзгеретін «Орташа чек» қалай жасалады?', options: ['Calculated column', 'Measure', 'Power Query қадамы', 'Жаңа кесте'], answer: 1, explain: 'Measure визуал мен сүзгі контекстінде есептеледі, сондықтан таңдауға қарай өзгереді.' },
          { type: 'quiz', xp: 10, prompt: 'Бірегей сатып алушылар санын қай DAX функциясы береді?', options: ['COUNT(orders[customer_id])', 'COUNTROWS(customers)', 'DISTINCTCOUNT(orders[customer_id])', 'SUM(orders[customer_id])'], answer: 2, explain: 'DISTINCTCOUNT — SQL-дегі COUNT(DISTINCT ...). COUNTROWS(customers) тапсырыс бермегендерді де санайды.' },
          { type: 'sql', dataset: 'cafe', xp: 20, prompt: 'Таза тапсырыстар бойынша DAX өлшемдерінің SQL баламасын шығарыңыз: <code>revenue</code>, <code>orders</code>, <code>customers</code> (бірегей) және <code>aov</code> (бүтін санға дейін дөңгелектенген).', starter: 'SELECT\n  \nFROM orders\nWHERE ' + CLEAN + ';', solution: `SELECT SUM(amount) AS revenue, COUNT(*) AS orders, COUNT(DISTINCT customer_id) AS customers, ROUND(SUM(amount) * 1.0 / COUNT(*)) AS aov FROM orders WHERE ${CLEAN};`, hints: ['<code>COUNT(DISTINCT customer_id)</code> = DISTINCTCOUNT.', '<code>ROUND(SUM(amount) * 1.0 / COUNT(*))</code>'] }
        ]
      },
      {
        id: 'pbi-5', title: 'CALCULATE және сүзгі контексті', minutes: 16,
        body: `
<p>DAX-тың ең маңызды ұғымы — <b>сүзгі контексті</b> (filter context). Визуалдағы әр ұяшық өз сүзгілерімен есептеледі: «Алматы» жолындағы <code>[Revenue]</code> тек Алматы тапсырыстарын қосады.</p>
<h3>CALCULATE</h3>
<p><code>CALCULATE</code> өлшемді <b>өзгертілген</b> сүзгімен есептейді:</p>
<pre><code>Instagram Revenue = CALCULATE([Revenue], customers[channel] = "instagram")</code></pre>
<h3>ALL: сүзгіні алып тастау және үлес</h3>
<pre><code>Total Revenue = CALCULATE([Revenue], ALL(customers[channel]))
Share %       = DIVIDE([Revenue], [Total Revenue])</code></pre>
<p>Кестеде әр арна жолында <code>[Revenue]</code> сол арнаның табысы, ал <code>[Total Revenue]</code> барлық арналардың табысы. Бөлсек, арнаның үлесі шығады.</p>
<h3>Мысал: әр ұяшықтың сүзгі контексті</h3>
<p>Таза тапсырыстар: instagram 5000, 2gis 3000, referral 2000, барлығы 10000. Матрицада жолдар — <code>customers[channel]</code>:</p>
<table>
<tr><th>channel</th><th>Сүзгі контексті</th><th>Revenue</th><th>Instagram Revenue</th><th>Total Revenue</th><th>Share %</th></tr>
<tr><td>instagram</td><td>channel = instagram</td><td>5000</td><td>5000</td><td>10000</td><td>50%</td></tr>
<tr><td>2gis</td><td>channel = 2gis</td><td>3000</td><td>5000</td><td>10000</td><td>30%</td></tr>
<tr><td>referral</td><td>channel = referral</td><td>2000</td><td>5000</td><td>10000</td><td>20%</td></tr>
<tr><td><b>Total</b></td><td>сүзгі жоқ</td><td>10000</td><td>5000</td><td>10000</td><td>100%</td></tr>
</table>
<ul>
<li><b>Revenue</b> жолдың сүзгісін сол күйінде қолданады.</li>
<li><b>Instagram Revenue</b>: CALCULATE ішіндегі <code>channel = "instagram"</code> сол бағандағы жолдың сүзгісін (мысалы 2gis) <b>алмастырады</b>, сондықтан әр жолда 5000.</li>
<li><b>Total Revenue</b>: <code>ALL(customers[channel])</code> арна сүзгісін алып тастайды, әр жолда 10000.</li>
</ul>
<p>Жолдарда қала болса, жалпы соманы алу үшін <code>ALL</code> ішіне сол бағанды, яғни қаланы жазасыз.</p>
<p>SQL-де бұл window function-ға ұқсайды: <code>SUM(revenue) OVER ()</code> — барлық жолдар бойынша жалпы қосынды. <code>GROUP BY channel</code> бар сұранымда топтардың қосындысын қайта қосу үшін агрегатты window ішіне орау керек: <code>SUM(SUM(amount)) OVER ()</code>. Пайыз үшін <code>* 100.0</code>, дөңгелектеу үшін <code>ROUND(..., 1)</code>.</p>
<h3>Жиі қателер</h3>
<ul>
<li><code>ALL</code> ішіне басқа баған жазу: жолдар арна бойынша, ал <code>ALL(customers[city])</code> — арна сүзгісі қалады, үлес әр жолда 100% болады.</li>
<li>Үлесті <code>/</code> арқылы бөлу: бос жолдарда қате. <code>DIVIDE</code> қолданыңыз.</li>
<li>CALCULATE сыртқы сүзгіге «қосылады» деп ойлау: сол бағанда ол сыртқы сүзгіні <b>ауыстырады</b>.</li>
</ul>
<div class="tip">Сұхбатта жиі сұралады: «Row context пен filter context айырмасы?» Row context — calculated column-да «қазіргі жол». Filter context — визуал мен slicer қойған сүзгілер. CALCULATE row context-ті filter context-ке айналдырады (context transition).</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Матрицада қала жолдары бар. Әр жолда барлық қалалардың жалпы табысын көрсету үшін қай формула керек?', options: ['SUM(orders[amount])', 'CALCULATE([Revenue], ALL(customers[city]))', 'FILTER(orders, orders[amount] > 0)', 'DISTINCTCOUNT(customers[city])'], answer: 1, explain: 'ALL қала бойынша сүзгіні алып тастайды, сондықтан әр жолда жалпы сома шығады.' },
          { type: 'quiz', xp: 10, prompt: '<code>CALCULATE([Revenue], customers[city] = "Астана")</code> «Алматы» жолында не көрсетеді?', options: ['Алматы табысын', 'Астана табысын', 'Бос мән', 'Жалпы табысты'], answer: 1, explain: 'CALCULATE ішіндегі сүзгі сол бағандағы сыртқы сүзгіні (Алматы) алмастырады, сондықтан әр жолда Астана табысы шығады.' },
          { type: 'sql', dataset: 'cafe', xp: 25, prompt: 'Share % өлшемін SQL-де қайталаңыз. Таза тапсырыстар бойынша әр арна (<code>customers.channel</code>) үшін <code>channel</code>, <code>revenue</code> және <code>share_pct</code> (жалпы табыстағы үлес, %, 1 таңбаға дейін) шығарыңыз. Табыс бойынша кемуімен.', starter: '', solution: `SELECT c.channel, SUM(o.amount) AS revenue, ROUND(SUM(o.amount) * 100.0 / SUM(SUM(o.amount)) OVER (), 1) AS share_pct FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.channel ORDER BY revenue DESC;`, check: { ordered: true }, hints: ['Алдымен <code>orders</code> мен <code>customers</code>-ты JOIN жасап, арна бойынша GROUP BY.', 'Жалпы сома: <code>SUM(SUM(o.amount)) OVER ()</code>.'] }
        ]
      },
      {
        id: 'pbi-6', title: 'Time intelligence: YTD, MoM, YoY', minutes: 15,
        body: `
<p>Бизнес әрқашан «өткен кезеңмен салыстырғанда қалай?» деп сұрайды. DAX-та бұған дайын функциялар бар (күн кестесі қажет):</p>
<table>
<tr><th>Өлшем</th><th>DAX</th></tr>
<tr><td>Жыл басынан (YTD)</td><td><code>TOTALYTD([Revenue], 'Date'[Date])</code></td></tr>
<tr><td>Өткен ай</td><td><code>CALCULATE([Revenue], DATEADD('Date'[Date], -1, MONTH))</code></td></tr>
<tr><td>Өткен жылдың сол кезеңі</td><td><code>CALCULATE([Revenue], SAMEPERIODLASTYEAR('Date'[Date]))</code></td></tr>
<tr><td>MoM өсім %</td><td><code>DIVIDE([Revenue] - [Revenue PM], [Revenue PM])</code></td></tr>
</table>
<p>Бұл кассир дәптері сияқты: әр айдың табысының жанына өткен айдың санын көшіріп жазасыз, сосын айырмасын есептейсіз. DAX-та өткен айды <code>DATEADD</code> «табады», ол күн кестесіндегі сүзгіні бір айға артқа жылжытады.</p>
<pre><code>Revenue PM = CALCULATE([Revenue], DATEADD('Date'[Date], -1, MONTH))
MoM %      = DIVIDE([Revenue] - [Revenue PM], [Revenue PM])
Revenue YTD = TOTALYTD([Revenue], 'Date'[Date])</code></pre>
<h3>Мысал: айлық кесте</h3>
<table>
<tr><th>Ай</th><th>Revenue</th><th>Revenue PM</th><th>MoM %</th><th>YTD</th></tr>
<tr><td>2024-01</td><td>50 000</td><td>(бос)</td><td>(бос)</td><td>50 000</td></tr>
<tr><td>2024-02</td><td>60 000</td><td>50 000</td><td>20%</td><td>110 000</td></tr>
<tr><td>2024-03</td><td>45 000</td><td>60 000</td><td>−25%</td><td>155 000</td></tr>
<tr><td>2024-04</td><td>54 000</td><td>45 000</td><td>20%</td><td>209 000</td></tr>
</table>
<p>Ақпан: (60 000 − 50 000) / 50 000 = 0.2 = 20%. Наурыз: (45 000 − 60 000) / 60 000 = −25%. Қаңтарда өткен ай жоқ, сондықтан Revenue PM бос, ал <code>DIVIDE</code> қате емес, бос мән береді. YTD — жыл басынан бергі жинақты қосынды: 50 000 + 60 000 + 45 000 = 155 000. <code>SAMEPERIODLASTYEAR</code> дәл осылай жұмыс істейді, тек бір жылға артқа жылжиды (YoY). Біздің деректер тек 2024 жылы, сондықтан ол бос болады.</p>
<h3>SQL баламасы</h3>
<p>SQL-де өткен айды <code>LAG()</code>, жыл басынан жинақты <code>SUM() OVER (ORDER BY month)</code> береді. Алдымен айлық табысты CTE-де есептеп аламыз, сосын window функцияларын қосамыз.</p>
<pre><code>SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev
FROM monthly;</code></pre>
<p>Бірнеше жыл болса, YTD жаңа жылда нөлден басталуы үшін <code>PARTITION BY</code> жыл қосылады.</p>
<div class="tip"><b>Жиі қателер:</b>
<ul>
<li>MoM-ды ағымдағы айға бөлу: бөлгіш әрқашан <b>өткен</b> ай.</li>
<li>Күн кестесін <b>Mark as date table</b> деп белгілемеу немесе <code>orders[order_date]</code> бағанын қолдану: тапсырыс жоқ күндер түсіп қалып, нәтиже қате шығады.</li>
<li>Матрицаға айды күн кестесінен емес, orders-тан қою: сүзгі Date кестесіне жетпейді.</li>
</ul></div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Наурыздағы табыс 90 000 ₸, ақпанда 60 000 ₸. MoM өсім қанша?', options: ['30%', '50%', '33%', '150%'], answer: 1, explain: '(90 000 − 60 000) / 60 000 = 0.5 = 50%.' },
          { type: 'quiz', xp: 10, prompt: 'Өткен жылдың дәл сол кезеңімен салыстыру үшін қай функция?', options: ['TOTALYTD', 'SAMEPERIODLASTYEAR', 'DATEADD(..., -1, MONTH)', 'ALL'], answer: 1, explain: 'SAMEPERIODLASTYEAR күндерді бір жылға артқа жылжытады.' },
          { type: 'sql', dataset: 'cafe', xp: 25, prompt: 'Таза тапсырыстар бойынша әр ай үшін (<code>substr(order_date,1,7)</code>) <code>month</code>, <code>revenue</code>, <code>prev_revenue</code> (өткен ай, LAG) және <code>ytd</code> (жыл басынан жинақты табыс) шығарыңыз. Ай ретімен.', starter: 'WITH m AS (\n  SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue\n  FROM orders\n  WHERE ' + CLEAN + '\n  GROUP BY month\n)\nSELECT month, revenue\nFROM m\nORDER BY month;', solution: `WITH m AS (SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders WHERE ${CLEAN} GROUP BY month) SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev_revenue, SUM(revenue) OVER (ORDER BY month) AS ytd FROM m ORDER BY month;`, check: { ordered: true }, hints: ['<code>LAG(revenue) OVER (ORDER BY month)</code>', '<code>SUM(revenue) OVER (ORDER BY month)</code> — жинақты қосынды.'] }
        ]
      },
      {
        id: 'pbi-7', title: 'Визуалдар және есеп дизайны', minutes: 12,
        body: `
<p>Жақсы есеп 5 секундта басты сұраққа жауап береді. Құрылымы:</p>
<ol>
<li><b>Жоғарыда KPI карталары</b> (Card): табыс, тапсырыстар, AOV, өзгеріс %.</li>
<li><b>Ортада тренд</b>: Line chart, айлар бойынша.</li>
<li><b>Төменде бөлшектеу</b>: Bar chart (арна, қала), Matrix (кесте).</li>
<li><b>Сол жақта немесе жоғарыда slicer-лер</b>: күн, қала, арна.</li>
</ol>
<h3>Қай визуал?</h3>
<table>
<tr><th>Сұрақ</th><th>Визуал</th></tr>
<tr><td>Уақыт бойынша қалай өзгерді?</td><td>Line chart</td></tr>
<tr><td>Категорияларды салыстыру</td><td>Bar chart (сұрыпталған)</td></tr>
<tr><td>Бір негізгі сан</td><td>Card / KPI</td></tr>
<tr><td>Нақты сандар, көп өлшем</td><td>Matrix</td></tr>
<tr><td>Бөліктің үлесі (2–4 бөлік)</td><td>Stacked bar, сирек pie</td></tr>
</table>
<h3>Интерактивтілік</h3>
<ul>
<li><b>Slicer</b> — пайдаланушы сүзгісі.</li>
<li><b>Cross-filtering</b> — бір визуалды басқанда басқалары сүзіледі.</li>
<li><b>Drill-down</b> — жыл → ай → күн иерархиясымен тереңдеу.</li>
<li><b>Drill-through</b> — бір жолдан бөлек егжей-тегжейлі бетке өту (мысалы, клиент картасы).</li>
<li><b>Tooltip</b> — курсорды апарғанда қосымша ақпарат.</li>
</ul>
<div class="tip">Бір бетте 6–8 визуалдан артық қоймаңыз. Түсті тек мағына үшін (жақсы/жаман, таңдалған) қолданыңыз.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Басшы «6 ай бойы табыс қалай өзгерді?» деп сұрайды. Қай визуал?', options: ['Pie chart', 'Line chart', 'Matrix', 'Card'], answer: 1, explain: 'Уақыт бойынша өзгерісті line chart ең анық көрсетеді.' },
          { type: 'quiz', xp: 10, prompt: 'Клиенттер тізімінде бір клиентті басып, оның барлық тапсырыстары бар бөлек бетке өту қалай аталады?', options: ['Drill-down', 'Drill-through', 'Cross-filtering', 'Bookmark'], answer: 1, explain: 'Drill-through басқа бетке таңдалған элементтің контекстімен өтеді. Drill-down иерархия бойынша бір визуал ішінде тереңдейді.' }
        ]
      },
      {
        id: 'pbi-8', title: 'Жариялау, жаңарту және қауіпсіздік', minutes: 10,
        body: `
<p>Есеп дайын болған соң оны <b>Power BI Service</b>-ке жариялаймыз (Publish).</p>
<table>
<tr><th>Ұғым</th><th>Мағынасы</th></tr>
<tr><td><b>Workspace</b></td><td>Команданың есептері мен деректер жиынтықтары тұратын орын</td></tr>
<tr><td><b>Semantic model</b> (бұрынғы dataset)</td><td>Модель мен өлшемдер, бірнеше есеп ортақ қолдана алады</td></tr>
<tr><td><b>Dashboard</b></td><td>Әртүрлі есептерден бекітілген (pin) визуалдардың бір беті</td></tr>
<tr><td><b>App</b></td><td>Workspace-ті кең аудиторияға тарату тәсілі</td></tr>
<tr><td><b>Scheduled refresh</b></td><td>Деректерді кесте бойынша автоматты жаңарту</td></tr>
<tr><td><b>Gateway</b></td><td>Компания ішіндегі (on-premises) дерекқорға бұлттан қосылу</td></tr>
<tr><td><b>RLS</b> (Row-Level Security)</td><td>Әр пайдаланушы тек өз жолдарын көреді</td></tr>
</table>
<p>RLS мысалы: Алматы менеджеріне тек Алматы деректері көрінуі үшін рөл жасаймыз:</p>
<pre><code>[city] = "Алматы"</code></pre>
<div class="tip">Портфолио үшін: Power BI Desktop-та есеп жасап, .pbix файлын GitHub-қа салыңыз және скриншоттарымен README жазыңыз. Тегін тіркелгіде жария веб-сілтеме жасау шектеулі болуы мүмкін.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Аймақтық менеджерлер бір есепті ашқанда әрқайсысы тек өз қаласын көруі керек. Не қолданамыз?', options: ['Әр қалаға бөлек есеп', 'Row-Level Security (RLS)', 'Slicer', 'Bookmark'], answer: 1, explain: 'RLS деректерді пайдаланушы рөліне қарай сүзеді. Slicer-ді пайдаланушы өзі өзгерте алады, сондықтан ол қауіпсіздік емес.' },
          { type: 'quiz', xp: 10, prompt: 'Компанияның серверіндегі SQL Server дерекқорынан Power BI Service деректерді күнде жаңартуы үшін не керек?', options: ['Gateway', 'DAX', 'Drill-through', 'Power Query Online ғана'], answer: 0, explain: 'On-premises дереккөзге бұлттан қосылу үшін gateway орнатылады.' }
        ]
      },
      {
        id: 'pbi-gate', gate: true, title: 'Модуль емтиханы: Power BI', minutes: 20,
        body: `<p>Модуль бойынша қорытынды тест. Өту үшін барлық тапсырманы орындаңыз.</p>`,
        exercises: [
          { type: 'quiz', xp: 15, prompt: 'Деректердегі бос мәндерді толтыру және типтерді түзеу қай жерде жасалғаны дұрыс?', options: ['DAX measure-де', 'Power Query-де', 'Визуалдың форматында', 'Slicer-де'], answer: 1, explain: 'Тазалау модельге дейін, Power Query-де жасалады.' },
          { type: 'quiz', xp: 15, prompt: 'Star schema-да сату сомасы мен санын сақтайтын кесте:', options: ['Dimension', 'Fact', 'Date table', 'Bridge'], answer: 1, explain: 'Fact кестесі оқиғалар мен сандық мәндерді сақтайды.' },
          { type: 'quiz', xp: 15, prompt: 'Неге <code>[Revenue] / [Orders]</code> орнына <code>DIVIDE([Revenue], [Orders])</code> жазамыз?', options: ['Жылдамырақ жазылады', 'Нөлге бөлгенде қате бермей бос мән қайтарады', 'Нәтижені дөңгелектейді', 'Айырмашылық жоқ'], answer: 1, explain: 'DIVIDE нөлге бөлуді қауіпсіз өңдейді.' },
          { type: 'quiz', xp: 15, prompt: 'Арна бойынша кестеде әр арнаның жалпы табыстағы үлесін көрсету үшін бөлгіш қандай болуы керек?', options: ['SUM(orders[amount])', 'CALCULATE([Revenue], ALL(customers[channel]))', 'COUNTROWS(customers)', '[Revenue]'], answer: 1, explain: 'ALL арна сүзгісін алып тастап, барлық арналардың жалпы табысын береді.' },
          { type: 'quiz', xp: 15, prompt: 'Қала бойынша сүзілетін «Орташа чек» calculated column ретінде жасалды. Не болады?', options: ['Бәрі дұрыс жұмыс істейді', 'Мән жол деңгейінде бір рет есептеліп, сүзгіге дұрыс жауап бермейді', 'Power BI қате береді', 'Есеп жылдамырақ болады'], answer: 1, explain: 'Агрегаттар measure болуы керек. Calculated column жүктеу кезінде жол бойынша есептеледі.' },
          { type: 'number', xp: 15, prompt: 'Сәуірде табыс 66 000 ₸, наурызда 88 000 ₸. MoM өзгеріс қанша пайыз? (теріс сан болса, минуспен жазыңыз)', answer: -25, tol: 0.5, unit: '%', explain: '(66 000 − 88 000) / 88 000 = −0.25 = −25%.' },
          { type: 'sql', dataset: 'cafe', xp: 30, prompt: 'Power BI матрицасын SQL-де жасаңыз. Таза тапсырыстар бойынша әр қала (<code>customers.city</code>) үшін <code>city</code>, <code>revenue</code>, <code>orders</code>, <code>aov</code> (бүтін санға дейін) және <code>share_pct</code> (жалпы табыстағы үлес, %, 1 таңба) шығарыңыз. Табыс бойынша кемуімен.', starter: '', solution: `SELECT c.city, SUM(o.amount) AS revenue, COUNT(*) AS orders, ROUND(SUM(o.amount) * 1.0 / COUNT(*)) AS aov, ROUND(SUM(o.amount) * 100.0 / SUM(SUM(o.amount)) OVER (), 1) AS share_pct FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' AND o.amount IS NOT NULL AND o.amount < 20000 GROUP BY c.city ORDER BY revenue DESC;`, check: { ordered: true } }
        ]
      }
    ]
  };
})();
