// M3.6 Business Analytics. Datasets: shop, metrics (users, activity, events, ad_spend, payments).
DJ.modules['m3-6'] = {
  intro: 'Техникалық білім бизнес сұрағына жауап бергенде ғана құнды. Бұл модульде KPI, табыс метрикалары, воронка, retention мен churn, unit economics (CAC, LTV) және аналитикалық memo жазуды үйренесіз.',
  lessons: [
    {
      id: 'ba-1', title: 'KPI және метрикалар ағашы', minutes: 10,
      body: `
<p><b>Метрика</b> — өлшенетін сан (тапсырыс саны). <b>KPI</b> — бизнес мақсатқа тікелей байланған, басшылық қадағалайтын негізгі метрика.</p>
<h3>North Star және метрикалар ағашы</h3>
<p>Компания бір басты метриканы таңдайды (<b>North Star Metric</b>), мысалы «аптасына сатып алған клиенттер». Сосын оны құрайтын бөліктерге жіктейді:</p>
<pre><code>Табыс
├── Сатып алушылар саны
│   ├── Сайтқа келгендер (трафик)
│   └── Конверсия
└── Орташа чек (AOV)
    ├── Бір чектегі тауар саны
    └── Тауар бағасы</code></pre>
<p>Табыс түссе, ағаш бойымен төмен түсіп, қай бөлік өзгергенін іздейміз. Бұл — аналитиктің ең жиі жұмысы.</p>
<h3>Vanity metrics</h3>
<p>Әдемі, бірақ шешімге әсер етпейтін метрикалар: жүктеп алулар саны, жалпы тіркелгендер, лайктар. Жақсы метрика <b>әрекетке</b> әкеледі.</p>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Онлайн дүкен үшін ең жақсы North Star метрикасы қайсы?', options: ['Сайтқа кірушілер саны', 'Қосымшаны жүктеп алулар', 'Айына кемінде бір рет сатып алған клиенттер саны', 'Instagram жазылушылары'], answer: 2, explain: 'Ол клиент құндылығын (сатып алу) және бизнес нәтижесін бірге өлшейді.' },
        { type: 'quiz', xp: 10, prompt: 'Табыс 10% түсті, ал трафик пен конверсия өзгермеді. Ағаш бойынша қайда іздейміз?', options: ['Сатып алушылар санында', 'Орташа чекте (AOV)', 'Жарнама бюджетінде', 'Ешқайда, бұл кездейсоқ'], answer: 1, explain: 'Табыс = сатып алушылар × AOV. Сатып алушылар өзгермесе, AOV түскен.' }
      ]
    },
    {
      id: 'ba-2', title: 'Табыс метрикалары: AOV, ARPU, ARPPU', minutes: 12,
      body: `
<table>
<tr><th>Метрика</th><th>Формула</th><th>Не айтады</th></tr>
<tr><td><b>Revenue</b></td><td>барлық төлемдер қосындысы</td><td>жалпы табыс</td></tr>
<tr><td><b>AOV</b> (average order value)</td><td>табыс / тапсырыстар саны</td><td>орташа чек</td></tr>
<tr><td><b>ARPU</b></td><td>табыс / барлық белсенді пайдаланушылар</td><td>бір пайдаланушыдан орташа табыс</td></tr>
<tr><td><b>ARPPU</b></td><td>табыс / төлеген пайдаланушылар</td><td>бір төлеушіден орташа табыс</td></tr>
</table>
<p>SQL-де AOV екі қадаммен есептеледі: алдымен әр тапсырыстың сомасы, сосын олардың орташасы.</p>
<pre><code>WITH t AS (
  SELECT o.id, SUM(oi.quantity * p.price) AS total
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  WHERE o.status = 'delivered'
  GROUP BY o.id
)
SELECT AVG(total) AS aov FROM t;</code></pre>
<div class="tip">Ортақ қате: <code>AVG(quantity * price)</code> тапсырыстың емес, <b>жолдың</b> (бір тауардың) орташасын береді. Алдымен тапсырыс деңгейіне жинаңыз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'shop', xp: 20, prompt: '<code>delivered</code> тапсырыстардың орташа чегін (<code>aov</code>) бір мәнмен шығарыңыз.', starter: 'WITH t AS (\n  \n)\nSELECT AVG(total) AS aov FROM t;', solution: "WITH t AS (SELECT o.id, SUM(oi.quantity * p.price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY o.id) SELECT AVG(total) AS aov FROM t;", check: { mustInclude: ['WITH'] }, hints: ['Сабақтағы мысал дәл осы тапсырма: оны түсініп, өзіңіз жазыңыз.'] },
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: '<code>payments</code> кестесінен әр ай үшін <code>month</code>, <code>revenue</code>, <code>payers</code> (төлеген бірегей пайдаланушылар) және <code>arppu</code> (revenue / payers) шығарыңыз. Ай ретімен.', starter: '', solution: 'SELECT month, SUM(amount) AS revenue, COUNT(DISTINCT user_id) AS payers, SUM(amount) * 1.0 / COUNT(DISTINCT user_id) AS arppu FROM payments GROUP BY month ORDER BY month;', check: { ordered: true }, hints: ['<code>SUM(amount) * 1.0 / COUNT(DISTINCT user_id)</code>'] },
        { type: 'number', xp: 10, prompt: 'Айда 2 000 000 ₸ табыс, 800 тапсырыс, 500 сатып алушы. AOV қанша (₸)?', answer: 2500, tol: 0.5, unit: '₸', explain: '2 000 000 / 800 = 2 500 ₸. (ARPPU = 2 000 000 / 500 = 4 000 ₸.)' }
      ]
    },
    {
      id: 'ba-3', title: 'Воронка: қай жерде жоғалтамыз?', minutes: 12,
      body: `
<p>Воронка қадамдары арасындағы конверсия «қай жерде клиент жоғалады?» деген сұраққа жауап береді.</p>
<table>
<tr><th>Қадам</th><th>Адамдар</th><th>Алдыңғыдан конверсия</th></tr>
<tr><td>Сайтқа кірді</td><td>10 000</td><td>—</td></tr>
<tr><td>Тауарды қарады</td><td>4 000</td><td>40%</td></tr>
<tr><td>Себетке салды</td><td>1 200</td><td>30%</td></tr>
<tr><td>Төледі</td><td>300</td><td>25%</td></tr>
</table>
<p>Жалпы конверсия = 300 / 10 000 = 3%. Ең үлкен абсолют жоғалту — бірінші қадамда (6 000 адам), ал ең әлсіз пайыздық қадам — төлем (25%).</p>
<h3>Сегменттеу</h3>
<p>Жалпы воронка жеткіліксіз. Оны арна, құрылғы немесе қала бойынша бөлсеңіз, мәселе нақты бір топта екені көрінеді: мысалы, мобильде төлем беті бұзылған.</p>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 25, prompt: 'Арна бойынша воронка шығарыңыз: <code>channel</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code> (әр қадамға жеткен бірегей пайдаланушылар). <code>users</code> мен <code>events</code>-ті қосыңыз.', starter: '', solution: "SELECT u.channel, COUNT(DISTINCT CASE WHEN e.step = 'visit' THEN e.user_id END) AS visit, COUNT(DISTINCT CASE WHEN e.step = 'cart' THEN e.user_id END) AS cart, COUNT(DISTINCT CASE WHEN e.step = 'purchase' THEN e.user_id END) AS purchase FROM users u JOIN events e ON e.user_id = u.id GROUP BY u.channel;", check: { mustInclude: ['CASE'] }, hints: ['Advanced SQL-дегі воронка сұрауына <code>JOIN users</code> мен <code>GROUP BY u.channel</code> қосыңыз.'] },
        { type: 'number', xp: 10, prompt: 'Сабақтағы воронкада себетке салғандардың неше пайызы төлемеді?', answer: 75, tol: 0.01, unit: '%', explain: '1 200-ден 300-і төледі (25%), демек 75%-ы төлемеді.' }
      ]
    },
    {
      id: 'ba-4', title: 'Retention, churn және LTV', minutes: 14,
      body: `
<p><b>Churn rate</b> — кезең ішінде кеткен клиенттер үлесі. Айдың басында 200 клиент болып, оның 30-ы келесі айда сатып алмаса, churn = 30 / 200 = 15%.</p>
<p><b>Retention</b> = 1 − churn = 85%.</p>
<h3>LTV (lifetime value)</h3>
<p>Бір клиенттің бүкіл «өмірінде» әкелетін табысы. Қарапайым формула:</p>
<pre><code>Орташа өмір ұзақтығы (ай) = 1 / churn
LTV = ARPU (айлық) × маржа × (1 / churn)</code></pre>
<p>Мысал: ARPU 4 000 ₸, маржа 50%, churn 10% → 4 000 × 0.5 × 10 = <b>20 000 ₸</b>.</p>
<div class="tip">Формула клиенттер бірқалыпты кетеді деп болжайды. Нақты жұмыста когорттардың retention қисықтарынан есептеген дәлірек.</div>`,
      exercises: [
        { type: 'number', xp: 10, prompt: 'Айдың басында 400 жазылушы болды, ай ішінде 36-ы жазылымын тоқтатты. Churn неше пайыз?', answer: 9, tol: 0.01, unit: '%', explain: '36 / 400 = 9%.' },
        { type: 'python', xp: 20, prompt: '<code>ltv(arpu, margin, churn)</code> функциясын жазыңыз: <code>arpu × margin / churn</code>. Churn 0 немесе теріс болса, <code>ValueError</code> көтерсін.', starter: 'def ltv(arpu, margin, churn):\n    pass\n', solution: 'def ltv(arpu, margin, churn):\n    if churn <= 0:\n        raise ValueError("churn оң сан болуы керек")\n    return arpu * margin / churn', check: { tests: 'assert abs(ltv(4000, 0.5, 0.1) - 20000) < 1e-6, "ltv(4000, 0.5, 0.1) = 20000"\nassert abs(ltv(1000, 1, 0.25) - 4000) < 1e-6, "ltv(1000, 1, 0.25) = 4000"\n_ok = False\ntry:\n    ltv(1000, 0.5, 0)\nexcept ValueError:\n    _ok = True\nassert _ok, "churn = 0 болғанда ValueError көтеріңіз"' }, hints: ['<code>raise ValueError("...")</code>'] },
        { type: 'sql', dataset: 'metrics', xp: 25, prompt: 'Шілде (<code>2024-07</code>) когортының әр айдағы retention-ын шығарыңыз: <code>month</code>, <code>retention</code> (белсенділер / когорт өлшемі × 100, бір ондық белгі). Ай ретімен.', starter: '', solution: "SELECT a.month, ROUND(100.0 * COUNT(DISTINCT a.user_id) / (SELECT COUNT(*) FROM users WHERE signup_month = '2024-07'), 1) AS retention FROM users u JOIN activity a ON a.user_id = u.id WHERE u.signup_month = '2024-07' GROUP BY a.month ORDER BY a.month;", check: { ordered: true }, hints: ["Когорт өлшемін subquery-мен алыңыз: <code>(SELECT COUNT(*) FROM users WHERE signup_month = '2024-07')</code>"] }
      ]
    },
    {
      id: 'ba-5', title: 'Unit economics: CAC, LTV/CAC, payback', minutes: 14,
      body: `
<p><b>Unit economics</b> бір клиенттің бизнеске пайдалы ма, жоқ па екенін көрсетеді.</p>
<ul>
<li><b>CAC</b> (customer acquisition cost) = маркетинг шығыны / тартылған жаңа клиенттер.</li>
<li><b>LTV / CAC</b>: 3-тен жоғары болса, жақсы деп саналады; 1-ден төмен болса, әр клиент шығын әкеледі.</li>
<li><b>Payback period</b> = CAC / (ARPU × маржа): шығын неше айда өтеледі.</li>
</ul>
<p>CAC-ты арна бойынша есептеу маңызды: бір арна арзан, екіншісі қымбат клиент әкелуі мүмкін.</p>
<pre><code>WITH s AS (SELECT channel, SUM(spend) AS spend FROM ad_spend GROUP BY channel),
     u AS (SELECT channel, COUNT(*) AS n FROM users GROUP BY channel)
SELECT s.channel, s.spend * 1.0 / u.n AS cac
FROM s JOIN u ON u.channel = s.channel;</code></pre>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 25, prompt: 'Арна бойынша <code>channel</code>, <code>spend</code>, <code>users</code> және <code>cac</code> шығарыңыз. Тек шығыны бар арналар (<code>ad_spend</code>-та бар).', starter: '', solution: 'WITH s AS (SELECT channel, SUM(spend) AS spend FROM ad_spend GROUP BY channel), u AS (SELECT channel, COUNT(*) AS n FROM users GROUP BY channel) SELECT s.channel, s.spend, u.n AS users, s.spend * 1.0 / u.n AS cac FROM s JOIN u ON u.channel = s.channel;', check: { mustInclude: ['WITH'] }, hints: ['Сабақтағы сұрауға <code>s.spend</code> және <code>u.n AS users</code> бағандарын қосыңыз.'] },
        { type: 'number', xp: 15, prompt: 'CAC = 12 000 ₸, айлық ARPU = 3 000 ₸, маржа 40%. Payback неше ай?', answer: 10, tol: 0.01, unit: 'ай', explain: '3 000 × 0.4 = 1 200 ₸ айына. 12 000 / 1 200 = 10 ай.' },
        { type: 'quiz', xp: 10, prompt: 'A арнасы: CAC 5 000, LTV 30 000. B арнасы: CAC 20 000, LTV 40 000. Бюджетті қайда көбейтеміз?', options: ['B: LTV жоғары', 'A: LTV/CAC = 6, ал B-да 2', 'Екеуіне тең', 'Ешқайсысына'], answer: 1, explain: 'Шешімді LTV/CAC қатынасы анықтайды: A әр жұмсалған теңгеге көбірек қайтарады. (Арнаның сыйымдылығы шектеулі екенін де тексеру керек.)' }
      ]
    },
    {
      id: 'ba-6', title: 'Өсім: MoM, YoY және маусымдылық', minutes: 11,
      body: `
<ul>
<li><b>MoM</b> (month-over-month) = (осы ай − өткен ай) / өткен ай.</li>
<li><b>YoY</b> (year-over-year) = (осы ай − былтырғы осы ай) / былтырғы осы ай.</li>
</ul>
<p>Желтоқсанда сатылым қарашадан 40% өсті, бұл жақсы ма? Бәлкім, әр желтоқсан осылай өседі (<b>маусымдылық</b>). Сондықтан маусымдық бизнесте YoY-ға қараймыз: ол маусымдылықты «жояды».</p>
<div class="tip">Аз сандарда пайыздар алдамшы: 2 тапсырыстан 4-ке өсу — «+100%», бірақ бизнес үшін маңызсыз. Пайызбен бірге абсолют санды да көрсетіңіз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 25, prompt: '<code>payments</code> бойынша айлық табысты және MoM өсімді пайызбен шығарыңыз: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (бір ондық белгі). Ай ретімен.', starter: '', solution: 'WITH m AS (SELECT month, SUM(amount) AS revenue FROM payments GROUP BY month) SELECT month, revenue, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct FROM m ORDER BY month;', check: { ordered: true, mustInclude: ['LAG'] }, hints: ['CTE-де айлық табыс, сосын LAG арқылы пайыздық өзгеріс.'] },
        { type: 'quiz', xp: 10, prompt: 'Гүл дүкенінің наурыздағы сатылымы ақпаннан 60% төмен. Қай салыстыру әділірек?', options: ['MoM', 'Былтырғы наурызбен (YoY)', 'Жылдық орташамен', 'Ешқайсысы'], answer: 1, explain: 'Ақпанда 8 Наурыз алдындағы шың бар, сондықтан маусымдық бизнесте YoY әділ.' }
      ]
    },
    {
      id: 'ba-7', title: 'Метрикалардағы қақпандар', minutes: 11,
      body: `
<h3>1. Орташалардың орташасы</h3>
<p>Екі дүкеннің конверсиясы 10% (100 келушіден) және 2% (10 000 келушіден). Орташа «6%» емес: жалпы конверсия = (10 + 200) / 10 100 ≈ 2.1%. Қатынастарды алдымен алым мен бөлімге жинап, сосын бөліңіз.</p>
<h3>2. Survivorship және селекция</h3>
<p>«Премиум клиенттер көбірек сатып алады» — бәлкім, көп сатып алатындар премиумға ауысады. Бағыт керісінше болуы мүмкін.</p>
<h3>3. Гудхарт заңы</h3>
<p>«Метрика мақсатқа айналғанда, ол жақсы метрика болудан қалады.» Колл-орталыққа «қоңырау ұзақтығын қысқарт» деген KPI берсеңіз, операторлар мәселені шешпей-ақ телефонды қоя салады. Әр KPI-ға «қарсы салмақ» метрика қойыңыз (мысалы, қайта қоңыраулар саны).</p>`,
      exercises: [
        { type: 'number', xp: 15, prompt: 'A дүкені: 200 келуші, 20 сатып алу. B дүкені: 1 800 келуші, 36 сатып алу. Жалпы конверсия неше пайыз?', answer: 2.8, tol: 0.01, unit: '%', explain: '(20 + 36) / (200 + 1 800) = 56 / 2 000 = 2.8%. Орташалардың орташасы (10% + 2%) / 2 = 6% қате.' },
        { type: 'quiz', xp: 10, prompt: 'Қолдау қызметіне «тикетті 1 сағатта жабу» KPI берілді. Қандай қарсы салмақ метрика қосу керек?', options: ['Тикеттер саны', 'Қайта ашылған тикеттер үлесі және клиент бағасы (CSAT)', 'Операторлар саны', 'Жұмыс уақыты'], answer: 1, explain: 'Жылдамдық сапаны құрбан етпеуі үшін сапа метрикасы керек.' }
      ]
    },
    {
      id: 'ba-8', title: 'Аналитикалық memo жазу', minutes: 12,
      body: `
<p>Талдаудың соңғы өнімі — кесте емес, <b>шешім</b>. Оны басшыға memo (қысқа жазба) арқылы жеткіземіз.</p>
<h3>Құрылым: жауап бірінші</h3>
<ol>
<li><b>Негізгі тұжырым</b> (1–2 сөйлем): «Қыркүйекте табыс 12% түсті, себебі мобильде төлем конверсиясы 25%-дан 14%-ға құлады.»</li>
<li><b>Дәлелдер</b>: 2–3 сан немесе бір график, дереккөзімен.</li>
<li><b>Ұсыныс</b>: нақты әрекет және жауапты адам.</li>
<li><b>Шектеулер</b>: не тексерілмеді, қандай болжам жасалды.</li>
</ol>
<div class="tip">Басшы тек бірінші абзацты оқиды деп жазыңыз. «Алдымен деректі жүктедім, сосын тазаладым...» деп бастамаңыз: процесс оқырманға керек емес.</div>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Memo-ның бірінші сөйлемі ретінде қайсысы жақсы?', options: ['«Бұл есепте қыркүйек айының деректерін талдадым.»', '«Қыркүйекте табыс 12% түсті: мобильде төлем конверсиясы 25%-дан 14%-ға құлады, төлем бетін түзету ұсынылады.»', '«Деректерде көп қызықты нәрсе бар.»', '«SQL сұраулары қосымшада берілген.»'], answer: 1, explain: 'Жауап, себеп және ұсыныс бір сөйлемде.' },
        { type: 'quiz', xp: 10, prompt: 'Memo-да «Шектеулер» бөлімі не үшін керек?', options: ['Ұзын көріну үшін', 'Оқырман тұжырымның қаншалықты сенімді екенін және не тексерілмегенін білуі үшін', 'Аналитиктің қателерін жасыру үшін', 'Керек емес'], answer: 1, explain: 'Адал шектеулер сенім арттырады және қате шешімнен сақтайды.' }
      ]
    },
    {
      id: 'ba-gate', gate: true, title: 'Модуль емтиханы: Business Analytics', minutes: 25,
      body: `
<p>Қорытынды тексеріс: табыс метрикалары, воронка, retention, unit economics. Дерекқорлар: <code>shop</code> және <code>metrics</code>.</p>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 35, prompt: '<b>metrics.</b> Арна бойынша <code>channel</code>, <code>revenue</code> (сол арна пайдаланушыларының <code>payments</code> қосындысы) шығарыңыз. Табысы жоқ арналар 0-мен шықсын.', starter: '', solution: 'SELECT u.channel, COALESCE(SUM(p.amount), 0) AS revenue FROM users u LEFT JOIN payments p ON p.user_id = u.id GROUP BY u.channel;', check: { mustInclude: ['LEFT JOIN'] }, hints: [] },
        { type: 'sql', dataset: 'shop', xp: 30, prompt: '<b>shop.</b> Санат (<code>category</code>) бойынша delivered тапсырыстардан түскен табыс пен оның жалпы табыстағы үлесін пайызбен (<code>share</code>, бір ондық белгі) шығарыңыз: <code>category</code>, <code>revenue</code>, <code>share</code>.', starter: '', solution: "SELECT p.category, SUM(oi.quantity * p.price) AS revenue, ROUND(SUM(oi.quantity * p.price) * 100.0 / SUM(SUM(oi.quantity * p.price)) OVER (), 1) AS share FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY p.category;", hints: [] },
        { type: 'number', xp: 20, prompt: 'Айлық ARPU 5 000 ₸, маржа 60%, айлық churn 12.5%, CAC 8 000 ₸. LTV/CAC қатынасы қанша?', answer: 3, tol: 0.01, explain: 'LTV = 5 000 × 0.6 / 0.125 = 24 000. 24 000 / 8 000 = 3.' },
        { type: 'quiz', xp: 15, prompt: 'Жаңа функциядан кейін тіркелулер 30% өсті, бірақ 30 күндік retention 40%-дан 25%-ға түсті. Memo-да не айтасыз?', options: ['Функция сәтті: тіркелу өсті', 'Тіркелу өскенімен, сапасы төмендеді; белсенді клиенттер санына әсерін есептеп, функцияны қайта қарау ұсынылады', 'Retention маңызды емес', 'Деректе қате бар'], answer: 1, explain: 'Бір метрика жақсарып, екіншісі нашарласа, нәтижені (белсенді клиенттер) бірге бағалау керек.' }
      ]
    }
  ]
};
