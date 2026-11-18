// M3.6 Business Analytics. Datasets: shop, metrics (users, activity, events, ad_spend, payments).
DJ.modules['m3-6'] = {
  intro: 'Техникалық білім бизнес сұрағына жауап бергенде ғана құнды. Бұл модульде KPI, табыс метрикалары, воронка, retention мен churn, unit economics (CAC, LTV) және аналитикалық memo жазуды үйренесіз.',
  lessons: [
    {
      id: 'ba-1', title: 'KPI және метрикалар ағашы', minutes: 10,
      body: `
<p><b>Метрика</b> — өлшенетін сан (тапсырыс саны). <b>KPI</b> — бизнес мақсатқа тікелей байланған, басшылық қадағалайтын негізгі метрика.</p>
<h3>North Star және метрикалар ағашы</h3>
<p>Компания бір басты метриканы таңдайды (<b>North Star Metric</b>). Онлайн дүкен үшін бұл, мысалы, «айына кемінде бір рет сатып алған клиенттер саны». Ол табыспен тікелей байланысты: табыс = сатып алушылар × орташа чек. Сондықтан ағаштың түбіріне табысты қойып, оны бөліктерге жіктейміз. North Star осы ағаштың бір тармағы:</p>
<pre><code>Табыс
├── Сатып алушылар саны   ← North Star
│   ├── Сайтқа келгендер (трафик)
│   └── Конверсия
└── Орташа чек (AOV)
    ├── Бір чектегі тауар саны
    └── Тауар бағасы</code></pre>
<p>Табыс түссе, ағаш бойымен төмен түсіп, қай бөлік өзгергенін іздейміз. Бұл — аналитиктің ең жиі жұмысы.</p>
<h3>Vanity metrics</h3>
<p>Әдемі, бірақ шешімге әсер етпейтін метрикалар: жүктеп алулар саны, жалпы тіркелгендер, лайктар. Жақсы метрика <b>әрекетке</b> әкеледі.</p>
<h3>Мысал: такси қосымшасы</h3>
<p>North Star — «аптасына аяқталған сапарлар саны». Ол жолаушы үшін де (жетті), бизнес үшін де (табыс) құнды. Оны жіктесек:</p>
<pre><code>Аяқталған сапарлар
├── Тапсырыс берген жолаушылар
│   ├── Қосымшаны ашқандар
│   └── Ашқаннан тапсырысқа конверсия
└── Аяқталу үлесі
    ├── Жүргізуші табылды ма
    └── Жолаушы бас тартты ма</code></pre>
<p>Сапарлар азайса, аналитик әр тармақты кезекпен тексереді: жолаушылар азайды ма, әлде жүргізуші таппай, бас тартулар көбейді ме? Екі жағдайда шешім мүлде әртүрлі: біріншісінде маркетинг, екіншісінде жүргізушілер санын көбейту.</p>
<h3>Жақсы KPI-дың белгілері</h3>
<ul>
<li>Түсінікті: бір сөйлеммен анықталады.</li>
<li>Әсер етуге болады: команда оны өз әрекетімен өзгерте алады.</li>
<li>Жиі өлшенеді: апта сайын немесе күн сайын.</li>
<li>Тұтынушы құндылығымен байланысты: клиентке пайда болмаса, KPI ұзақ өспейді.</li>
</ul>`,
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
<div class="tip">Ортақ қате: <code>AVG(quantity * price)</code> тапсырыстың емес, <b>жолдың</b> (бір тауардың) орташасын береді. Алдымен тапсырыс деңгейіне жинаңыз.</div>
<h3>Мысал есеп</h3>
<p>Айда 1 000 белсенді пайдаланушы болды, олардың 200-і төледі, 250 тапсырыс жасалды, табыс 5 000 000 ₸.</p>
<ul>
<li>AOV = 5 000 000 / 250 = <b>20 000 ₸</b></li>
<li>ARPU = 5 000 000 / 1 000 = <b>5 000 ₸</b></li>
<li>ARPPU = 5 000 000 / 200 = <b>25 000 ₸</b></li>
</ul>
<p>ARPU мен ARPPU арасындағы айырма төлеушілер үлесін көрсетеді: 200 / 1 000 = 20%. Егер ARPU өссе, оның себебі екеуінің бірі: не көбірек адам төлей бастады, не төлеушілер көбірек жұмсады.</p>
<h3>Қай метриканы қашан қолданамыз?</h3>
<p>Бағаны немесе «бірге сатып ал» ұсынысын өзгерткенде AOV-ге қараймыз. Тегін және ақылы бөлігі бар өнімде (мобиль ойын, жазылым) ARPU мен ARPPU маңызды: тегін пайдаланушыларды төлеушіге айналдыру ARPU-ды өсіреді, ал ARPPU-ды өзгертпеуі мүмкін.</p>
<div class="tip">Метриканы атағанда бөлімін (кімге бөлеміз?) және кезеңін (күн, ай) әрқашан айтыңыз. «ARPU» сөзі әр командада әртүрлі есептелуі мүмкін.</div>`,
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
<p>Жалпы воронка жеткіліксіз. Оны арна, құрылғы немесе қала бойынша бөлсеңіз, мәселе нақты бір топта екені көрінеді: мысалы, мобильде төлем беті бұзылған.</p>
<h3>Воронканы SQL-де қалай құрамыз?</h3>
<p>Оқиғалар кестесінде әр жол — бір әрекет (<code>user_id</code>, <code>step</code>). Әр қадамға жеткен бірегей адамдарды <code>CASE</code> арқылы санаймыз:</p>
<pre><code>SELECT
  COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END)    AS visit,
  COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END)     AS cart,
  COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END) AS purchase
FROM events;</code></pre>
<p><code>CASE</code> шартқа сай келмесе, NULL қайтарады, ал <code>COUNT(DISTINCT ...)</code> NULL-ды санамайды. Сондықтан әр баған өз қадамының адамдарын ғана санайды. Арна бойынша бөлу үшін пайдаланушылар кестесімен <code>JOIN</code> жасап, соңына <code>GROUP BY channel</code> қосамыз.</p>
<h3>Қай қадамды бірінші жақсартамыз?</h3>
<p>Әдетте ең әлсіз пайыздық қадамнан бастайды, бірақ шешім жақсартудың құнына да байланысты. Төлем бетіндегі қатені түзету арзан, ал сайтқа екі есе көп трафик әкелу қымбат. Ұсыныс жазғанда «әсер» мен «құнды» қатар көрсетіңіз.</p>`,
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
<div class="tip">Формула клиенттер бірқалыпты кетеді деп болжайды. Нақты жұмыста когорттардың retention қисықтарынан есептеген дәлірек.</div>
<h3>Когорттық retention</h3>
<p>Когорт — бір айда келген клиенттер тобы. Әр когорт үшін «N айдан кейін неше пайызы әлі белсенді?» деп есептеп, кестеге саламыз:</p>
<table>
<tr><th>Когорт</th><th>0-ай</th><th>1-ай</th><th>2-ай</th><th>3-ай</th></tr>
<tr><td>Қаңтар</td><td>100%</td><td>45%</td><td>32%</td><td>28%</td></tr>
<tr><td>Ақпан</td><td>100%</td><td>50%</td><td>38%</td><td>—</td></tr>
<tr><td>Наурыз</td><td>100%</td><td>55%</td><td>—</td><td>—</td></tr>
</table>
<p>Мысалдағы кестені диагональ бойымен оқимыз: жаңа когорттар жақсырақ ұсталады (45% → 50% → 55%), демек өнім жақсарып келеді. Қисық бір деңгейде тұрақтаса (мұнда шамамен 28%), өнімнің «өз аудиториясы» бар деген белгі.</p>
<h3>Churn мен retention-ды шатастырмаңыз</h3>
<p>Churn-ды неге бөлетінімізге мұқият болыңыз: айдың басындағы клиенттерге бөлеміз, ай ішінде қосылғандарға емес. Әйтпесе тез өсіп жатқан бизнесте churn жасанды түрде төмен болып шығады.</p>`,
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
FROM s JOIN u ON u.channel = s.channel;</code></pre>
<h3>Мысал есеп</h3>
<p>Онлайн курс платформасы айына 1 500 000 ₸ жарнамаға жұмсап, 300 жаңа клиент тартады. Айлық ARPU 4 000 ₸, маржа 50%, churn 10%.</p>
<ul>
<li>CAC = 1 500 000 / 300 = <b>5 000 ₸</b></li>
<li>LTV = 4 000 × 0.5 / 0.1 = <b>20 000 ₸</b></li>
<li>LTV / CAC = 20 000 / 5 000 = <b>4</b> — жақсы</li>
<li>Payback = 5 000 / (4 000 × 0.5) = <b>2.5 ай</b></li>
</ul>
<p>Бизнес сау көрінеді: әр клиент өз құнын 2.5 айда өтейді, ал орта есеппен 10 ай қалады.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Маржаны ұмыту</b>: LTV-ді табыспен есептеп, CAC-пен салыстыру бизнесті тым пайдалы етіп көрсетеді.</li>
<li><b>Органикалық клиенттерді қосу</b>: жарнамасыз келгендерді бөлімге қоссаңыз, CAC жасанды түрде төмендейді. Ақылы арналарды бөлек есептеңіз.</li>
<li><b>Ұзақ payback</b>: LTV/CAC жақсы болса да, payback 18 ай болса, стартапқа ақша жетпей қалуы мүмкін.</li>
</ul>`,
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
<div class="tip">Аз сандарда пайыздар алдамшы: 2 тапсырыстан 4-ке өсу — «+100%», бірақ бизнес үшін маңызсыз. Пайызбен бірге абсолют санды да көрсетіңіз.</div>
<h3>SQL-де MoM қалай есептеледі?</h3>
<p>Өткен айдың мәнін алу үшін <code>LAG</code> window function-ын қолданамыз:</p>
<pre><code>WITH m AS (
  SELECT month, SUM(amount) AS revenue
  FROM payments GROUP BY month
)
SELECT month, revenue,
       ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0
             / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct
FROM m;</code></pre>
<p>Бірінші айда өткен ай жоқ, сондықтан <code>LAG</code> NULL береді және <code>mom_pct</code> бос болады. Бұл қате емес: салыстыратын мән жоқ.</p>
<h3>Тағы бір құрал: жылжымалы орта</h3>
<p>Күнделікті дерек тым «шулы» болса, 7 күндік жылжымалы орташа (<code>AVG(...) OVER (ORDER BY day ROWS 6 PRECEDING)</code>) апта күндерінің әсерін тегістейді. Сонда тренд анық көрінеді.</p>
<div class="tip">Айлардың ұзындығы әртүрлі: ақпанда 28 күн, наурызда 31. Күнделікті орташаны салыстыру кейде айлық сомадан әділ.</div>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 25, prompt: '<code>payments</code> бойынша айлық табысты және MoM өсімді пайызбен шығарыңыз: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (бір ондық белгі). Ай ретімен.', starter: '', solution: 'WITH m AS (SELECT month, SUM(amount) AS revenue FROM payments GROUP BY month) SELECT month, revenue, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct FROM m ORDER BY month;', check: { ordered: true, mustInclude: ['LAG'] }, hints: ['CTE-де айлық табыс, сосын LAG арқылы пайыздық өзгеріс.'] },
        { type: 'quiz', xp: 10, prompt: 'Гүл дүкенінің сәуірдегі сатылымы наурыздан 60% төмен. Қай салыстыру әділірек?', options: ['MoM', 'Былтырғы сәуірмен (YoY)', 'Жылдық орташамен', 'Ешқайсысы'], answer: 1, explain: 'Наурызда 8 Наурыз шыңы бар, сондықтан сәуірдегі құлдырау — қалыпты маусымдылық. Маусымдық бизнесте YoY әділ.' }
      ]
    },
    {
      id: 'ba-7', title: 'Метрикалардағы қақпандар', minutes: 11,
      body: `
<h3>1. Орташалардың орташасы</h3>
<p>Екі дүкеннің конверсиясы 10% (100 келушіден) және 2% (10 000 келушіден). Орташа «6%» емес: жалпы конверсия = (10 + 200) / 10 100 ≈ 2.1%. Қатынастарды алдымен алым мен бөлімге жинап, сосын бөліңіз.</p>
<h3>2. Кері себептілік және селекция</h3>
<p>«Премиум клиенттер көбірек сатып алады» — бәлкім, көп сатып алатындар премиумға ауысады. Бағыт керісінше болуы мүмкін.</p>
<h3>3. Гудхарт заңы</h3>
<p>«Метрика мақсатқа айналғанда, ол жақсы метрика болудан қалады.» Колл-орталыққа «қоңырау ұзақтығын қысқарт» деген KPI берсеңіз, операторлар мәселені шешпей-ақ телефонды қоя салады. Әр KPI-ға «қарсы салмақ» метрика қойыңыз (мысалы, қайта қоңыраулар саны).</p>
<h3>4. Корреляция себеп емес</h3>
<p>«Push-хабарлама алғандар көбірек сатып алады» — бәлкім, хабарламаны тек белсенді клиенттерге жібердік. Себепті дәлелдеу үшін A/B тест керек: кездейсоқ топқа жіберіп, жібермеген топпен салыстырамыз.</p>
<h3>5. Симпсон парадоксы</h3>
<p>Екі топта да жаңа нұсқа жақсы, ал жалпы деректе нашар болуы мүмкін. Себебі — топтардың өлшемі әртүрлі. Мысалы, жаңа дизайн мобильде де, компьютерде де конверсияны өсірді, бірақ трафиктің көбі конверсиясы төмен мобильге ауысқандықтан, жалпы конверсия түсті. Әрқашан негізгі сегменттер бойынша да тексеріңіз.</p>
<h3>6. Анықтаманың өзгеруі</h3>
<p>Егер «белсенді пайдаланушы» анықтамасы ай ортасында өзгерсе, графиктегі секіріс бизнестің емес, есептің өзгергенін көрсетеді. Дашбордта мұндай өзгерістерді белгілеп қойыңыз.</p>`,
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
<div class="tip">Басшы тек бірінші абзацты оқиды деп жазыңыз. «Алдымен деректі жүктедім, сосын тазаладым...» деп бастамаңыз: процесс оқырманға керек емес.</div>
<h3>Мысал memo</h3>
<div class="tip"><b>Тақырып:</b> Қыркүйекте табыстың төмендеуі<br>
<b>Тұжырым:</b> Қыркүйекте табыс 12% түсті. Себебі — 9 қыркүйектегі жаңартудан кейін мобиль қосымшада төлем конверсиясы 25%-дан 14%-ға құлады. Компьютер нұсқасында өзгеріс жоқ.<br>
<b>Дәлелдер:</b> мобиль төлемдері күніне ~320-дан ~180-ге азайды; қате логтарында «payment timeout» 9 қыркүйектен бастап 6 есе көбейді.<br>
<b>Ұсыныс:</b> мобиль командасы төлем модулінің ескі нұсқасын қайтарсын (жауапты: мобиль командасының жетекшісі), түзетілгенше төлем бетінде баламалы төлем тәсілін көрсетейік.<br>
<b>Шектеулер:</b> iOS пен Android бөлек тексерілген жоқ; маусымдық әсер өткен жылмен салыстырылмады.</div>
<p>Бұл мысалда әр бөлім бір-екі сөйлем ғана. Сандар нақты, ұсыныс тексерілетін, ал шектеулер оқырманға қай жерде абай болу керегін айтады.</p>
<h3>Тексеру тізімі</h3>
<ul>
<li>Бірінші абзац жеке оқылса да түсінікті ме?</li>
<li>Әр сан дереккөзімен және кезеңімен берілген бе?</li>
<li>Ұсыныста «кім, не, қашан» бар ма?</li>
</ul>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Memo-ның бірінші сөйлемі ретінде қайсысы жақсы?', options: ['«Бұл есепте қыркүйек айының деректерін талдадым.»', '«Қыркүйекте табыс 12% түсті: мобильде төлем конверсиясы 25%-дан 14%-ға құлады, төлем бетін түзету ұсынылады.»', '«Деректерде көп қызықты нәрсе бар.»', '«SQL сұраулары қосымшада берілген.»'], answer: 1, explain: 'Жауап, себеп және ұсыныс бір сөйлемде.' },
        { type: 'quiz', xp: 10, prompt: 'Memo-да «Шектеулер» бөлімі не үшін керек?', options: ['Ұзын көріну үшін', 'Оқырман тұжырымның қаншалықты сенімді екенін және не тексерілмегенін білуі үшін', 'Аналитиктің қателерін жасыру үшін', 'Керек емес'], answer: 1, explain: 'Адал шектеулер сенім арттырады және қате шешімнен сақтайды.' }
      ]
    },
    {
      id: 'ba-9', title: 'RFM және ABC сегментация', minutes: 16,
      body: `
<p>«Клиенттердің бәріне бірдей жеңілдік жіберейік» — ең қымбат және ең әлсіз маркетинг. Сегментация клиенттерді (немесе тауарларды) мінезі ұқсас топтарға бөліп, әр топқа <b>бөлек әрекет</b> таңдауға мүмкіндік береді. Қазақстандағы аналитик вакансияларында ең жиі аталатын екі тәсіл: RFM және ABC. Мысалдар <code>qazaq</code> базасында (Qazaq Market).</p>
<h3>RFM: үш сұрақ</h3>
<ul>
<li><b>Recency</b> (жаңалық): соңғы сатып алудан бері неше күн өтті? Аз болса, жақсы.</li>
<li><b>Frequency</b> (жиілік): неше рет сатып алды?</li>
<li><b>Monetary</b> (сома): барлығы қанша ақша әкелді?</li>
</ul>
<p>Тек жеткізілген (<code>delivered</code>) тапсырыстар есептеледі. «Бүгін» ретінде тұрақты күн аламыз: <code>2026-07-01</code>. Нақты жұмыста бұл есеп жасалған күн.</p>
<pre><code>SELECT o.customer_id,
  CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,
  COUNT(DISTINCT o.order_id) AS frequency,
  SUM(oi.quantity * oi.unit_price) AS monetary
FROM orders o JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.status = 'delivered'
GROUP BY o.customer_id;</code></pre>
<p><code>COUNT(DISTINCT o.order_id)</code> керек: <code>order_items</code>-пен біріктіргенде бір тапсырыс бірнеше жолға көбейеді.</p>
<h3>Балл қою: NTILE</h3>
<p>Шикі сандарды салыстыру қиын, сондықтан әр өлшем бойынша клиенттерді тең топтарға бөліп, балл береміз. Мұнда 3 топ (1 — әлсіз, 3 — мықты); үлкен базаларда 5 топ қолданылады.</p>
<pre><code>NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r,  -- жақында алған = 3
NTILE(3) OVER (ORDER BY frequency, customer_id)         AS f,  -- жиі алатын = 3
NTILE(3) OVER (ORDER BY monetary, customer_id)          AS m   -- көп жұмсаған = 3</code></pre>
<p>Recency-де рет кері: күн саны <b>көп</b> клиент 1 балл алады. <code>customer_id</code> — тең мәндер кезінде нәтиже тұрақты болуы үшін.</p>
<h3>Сегмент және әрекет</h3>
<p>Qazaq Market-тің 70 сатып алушысы (R мен F бойынша):</p>
<table>
<tr><th>Сегмент</th><th>Ереже</th><th>Клиент</th><th>Табыстағы үлесі</th><th>Әрекет</th></tr>
<tr><td>Чемпиондар</td><td>r = 3, f = 3</td><td>10</td><td>15.8%</td><td>Жеңілдік бермеу. Ерте қолжетімділік, лоялдылық бағдарламасы, пікір сұрау</td></tr>
<tr><td>Жоғалып бара жатқандар</td><td>r = 1, f ≥ 2</td><td>14</td><td>27.7%</td><td>Қайтару науқаны: жеке ұсыныс, «сізді сағындық» хаты, себебін сұрау</td></tr>
<tr><td>Жаңалар</td><td>r = 3, f = 1</td><td>5</td><td>3.9%</td><td>Екінші сатып алуға итеру: ілеспе тауар, 14 күндік промокод</td></tr>
<tr><td>Қалғандары</td><td>басқа</td><td>41</td><td>52.5%</td><td>Жалпы хабарлама, жиілікті арттыру</td></tr>
</table>
<p>Ең маңызды жол — екіншісі: бұрын жиі алған 14 клиент табыстың 27.7%-ын әкелген, бірақ көптен бері келмеген. Оларды қайтару жаңа клиент тартудан арзан.</p>
<h3>ABC: тауарларды үлесі бойынша бөлу</h3>
<p>ABC талдауы Парето қағидасына сүйенеді: тауарлардың аз бөлігі табыстың көп бөлігін береді. Тауарларды табысы бойынша кемуімен сұрыптап, <b>жинақталған үлесті</b> есептейміз:</p>
<ul>
<li><b>A</b>: жинақталған үлес 80%-ға дейін. Әрқашан қоймада болуы керек, бағасын мұқият бақылаймыз.</li>
<li><b>B</b>: 80%-дан 95%-ға дейін. Қалыпты бақылау.</li>
<li><b>C</b>: қалғаны. Қорды азайту, ассортименттен шығаруды қарастыру.</li>
</ul>
<pre><code>ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1) AS cum_pct</code></pre>
<p>Qazaq Market-те сатылған 28 тауардың 7-еуі A тобына түседі де, табыстың 77.5%-ын береді.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Бас тартылған және қайтарылған тапсырыстарды қосу: клиент «мықты» көрінеді, бірақ ақша әкелмеген.</li>
<li>«Бүгінді» <code>date('now')</code> деп алу: ескі деректе барлық клиенттің recency-і бірдей нашар шығады. Деректегі соңғы күнге жақын күн алыңыз.</li>
<li>Сегментті есептеп, әрекетсіз қалдыру. Сегментация — есеп емес, әр топқа не істейтініңіздің тізімі.</li>
<li>ABC-ны тек табыспен жасау: маржасы төмен тауар A-да тұруы мүмкін. Мүмкін болса, пайда бойынша қайталаңыз.</li>
</ul>
<div class="tip">RFM-ді бір рет емес, ай сайын есептеңіз де, клиенттердің сегменттен сегментке <b>көшуін</b> қадағалаңыз: «чемпиондардың қаншасы жоғалып бара жатқандарға түсті?» Бұл churn-ді алдын ала көрсетеді.</div>`,
      exercises: [
        { type: 'sql', dataset: 'qazaq', xp: 25, prompt: 'Әр сатып алушының RFM көрсеткіштерін есептеңіз (тек <code>delivered</code> тапсырыстар, «бүгін» = <code>2026-07-01</code>): <code>customer_id</code>, <code>recency_days</code>, <code>frequency</code> (тапсырыс саны), <code>monetary</code> (quantity × unit_price сомасы). <code>customer_id</code> бойынша сұрыптаңыз.', starter: '', solution: "WITH rfm AS (SELECT o.customer_id, CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days, COUNT(DISTINCT o.order_id) AS frequency, SUM(oi.quantity * oi.unit_price) AS monetary FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.customer_id) SELECT customer_id, recency_days, frequency, monetary FROM rfm ORDER BY customer_id;", check: { ordered: true }, hints: ["<code>CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER)</code>", '<code>COUNT(DISTINCT o.order_id)</code>: JOIN-нан кейін бір тапсырыс бірнеше жол болады.', "<code>orders o JOIN order_items oi</code>, <code>WHERE o.status = 'delivered'</code>, <code>GROUP BY o.customer_id</code>."] },
        { type: 'sql', dataset: 'qazaq', xp: 30, prompt: 'Дайын <code>rfm</code> CTE-іне <code>NTILE(3)</code> арқылы балл қойыңыз: <code>r</code> (соңғы тапсырысы ең жақын клиенттер 3 алады), <code>f</code>, <code>m</code> (ең көбі 3 алады). Әр терезенің <code>ORDER BY</code>-ына екінші баған ретінде <code>customer_id</code> қосыңыз. Бағандар: <code>customer_id</code>, <code>r</code>, <code>f</code>, <code>m</code>.', starter: "WITH rfm AS (\n  SELECT o.customer_id,\n    CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,\n    COUNT(DISTINCT o.order_id) AS frequency,\n    SUM(oi.quantity * oi.unit_price) AS monetary\n  FROM orders o JOIN order_items oi ON oi.order_id = o.order_id\n  WHERE o.status = 'delivered'\n  GROUP BY o.customer_id\n)\nSELECT customer_id,\n  \nFROM rfm\nORDER BY customer_id;", solution: "WITH rfm AS (SELECT o.customer_id, CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days, COUNT(DISTINCT o.order_id) AS frequency, SUM(oi.quantity * oi.unit_price) AS monetary FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY o.customer_id) SELECT customer_id, NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r, NTILE(3) OVER (ORDER BY frequency, customer_id) AS f, NTILE(3) OVER (ORDER BY monetary, customer_id) AS m FROM rfm ORDER BY customer_id;", check: { ordered: true, mustInclude: ['NTILE'] }, hints: ['<code>NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r</code>: күн саны көп клиент 1-топқа түседі.', '<code>f</code> мен <code>m</code> үшін рет өспелі: <code>ORDER BY frequency, customer_id</code>.'] },
        { type: 'sql', dataset: 'qazaq', xp: 30, prompt: "Тауарлардың ABC талдауы (тек <code>delivered</code>): <code>name</code>, <code>revenue</code>, <code>cum_pct</code> (табыс кемуімен жинақталған үлес, %, 1 таңба), <code>abc</code> (<code>cum_pct</code> ≤ 80 болса 'A', ≤ 95 болса 'B', әйтпесе 'C'). Табыс кемуімен сұрыптаңыз.", starter: '', solution: "WITH p AS (SELECT pr.name, SUM(oi.quantity * oi.unit_price) AS revenue FROM order_items oi JOIN orders o ON o.order_id = oi.order_id JOIN products pr ON pr.product_id = oi.product_id WHERE o.status = 'delivered' GROUP BY pr.product_id, pr.name), c AS (SELECT name, revenue, ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1) AS cum_pct FROM p) SELECT name, revenue, cum_pct, CASE WHEN cum_pct <= 80 THEN 'A' WHEN cum_pct <= 95 THEN 'B' ELSE 'C' END AS abc FROM c ORDER BY revenue DESC;", check: { ordered: true }, hints: ['1-CTE: әр тауардың табысы (order_items, orders, products).', '2-CTE: <code>ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1) AS cum_pct</code>', "Соңында: <code>CASE WHEN cum_pct &lt;= 80 THEN 'A' WHEN cum_pct &lt;= 95 THEN 'B' ELSE 'C' END</code>"] },
        { type: 'quiz', xp: 10, prompt: 'Клиенттің балдары: r = 1, f = 3, m = 3. Ең дұрыс әрекет қайсы?', options: ['Ештеңе істемеу: ол онсыз да ең жақсы клиент', 'Қайтару науқаны: жеке ұсыныс жіберіп, неге келмей кеткенін анықтау', 'Оны базадан өшіру', 'Оған жаңа клиенттерге арналған «қош келдіңіз» хатын жіберу'], answer: 1, explain: 'Ол бұрын жиі және көп сатып алған (f, m жоғары), бірақ көптен бері келмеген (r төмен). Бұл — жоғалып бара жатқан құнды клиент.' },
        { type: 'quiz', xp: 10, prompt: 'ABC талдауында тауар C тобына түсті. Бұл нені білдіреді?', options: ['Тауар сапасыз', 'Ол табыстың соңғы ~5%-ын беретін тауарлардың бірі: қорын азайтуды немесе ассортименттен шығаруды қарастыруға болады', 'Оның бағасын бірден көтеру керек', 'Ол ең көп сатылатын тауар'], answer: 1, explain: 'C — табысқа үлесі аз тауарлар. Бірақ шешім алдында маржаны және оның A тауарларымен бірге сатылатынын тексеріңіз.' }
      ]
    },
    {
      id: 'ba-10', title: 'Продукт метрикалары: DAU/MAU, stickiness, activation', minutes: 14,
      body: `
<p>Дүкен табысты санайды, ал қосымша мен сервис алдымен <b>қолдануды</b> санайды: адамдар келе ме, қайта орала ма, пайдасын көре ме. Бұл метрикалар Kaspi, Kolesa, Яндекс сияқты өнімдік компаниялардың сұхбатында міндетті түрде сұралады.</p>
<h3>DAU, WAU, MAU</h3>
<ul>
<li><b>DAU</b> (daily active users): бір күнде белсенді болған <b>бірегей</b> пайдаланушылар.</li>
<li><b>WAU</b>, <b>MAU</b>: аптада, айда кемінде бір рет белсенді болғандар.</li>
</ul>
<p>«Белсенді» деген не екенін команда өзі анықтайды: қосымшаны ашу ма, әлде мағыналы әрекет (іздеу, төлем) пе? Анықтама өзгерсе, метрика да секіреді, сондықтан оны дашбордта жазып қойыңыз.</p>
<p>Мысал кестесі: <code>metrics</code> базасындағы <code>daily_active(user_id, day)</code>, 2024 жылғы қыркүйек.</p>
<pre><code>SELECT day, COUNT(DISTINCT user_id) AS dau
FROM daily_active GROUP BY day;</code></pre>
<h3>Stickiness: DAU / MAU</h3>
<p><b>Stickiness</b> = орташа DAU / MAU. Ол «айлық аудиторияның қандай бөлігі күн сайын келеді?» дегенді көрсетеді.</p>
<p>Мысал: MAU = 8, қыркүйектегі 30 күнде барлығы 98 «пайдаланушы-күн» жиналды. Орташа DAU = 98 / 30 ≈ 3.27. Stickiness = 3.27 / 8 ≈ 40.8%. Яғни орташа пайдаланушы айына шамамен 12 күн кіреді (30 × 0.408).</p>
<table>
<tr><th>Stickiness</th><th>Мағынасы</th></tr>
<tr><td>50% және жоғары</td><td>Күнделікті әдет: мессенджер, әлеуметтік желі</td></tr>
<tr><td>20–30%</td><td>Аптасына 1–2 рет: банк қосымшасы, жеткізу</td></tr>
<tr><td>10%-дан төмен</td><td>Сирек қажеттілік: билет сатып алу, жөндеу қызметі. Бұл өнімге stickiness емес, басқа метрика лайық</td></tr>
</table>
<h3>Activation: алғашқы пайдаға жету</h3>
<p>Тіркелу — әлі клиент емес. <b>Activation</b> — жаңа пайдаланушының өнімнің негізгі пайдасын бірінші рет алуы («aha moment»). Әр өнімде өзінше: таксиде — бірінші сапар, дүкенде — бірінші тапсырыс, оқу платформасында — бірінші аяқталған сабақ.</p>
<p><b>Activation rate</b> = белгілі мерзім ішінде белсендірілген жаңа пайдаланушылар / барлық тіркелгендер. Мерзім міндетті: «тіркелгеннен кейін 30 күн ішінде бірінші тапсырыс». Qazaq Market-те бұл көрсеткіш 62.5% (80 клиенттің 50-і).</p>
<p>Activation төмен болса, retention-ды жақсартудың мағынасы аз: адамдар пайдасын көрмей кетіп жатыр. Алдымен тіркелуден бірінші пайдаға дейінгі жолды қысқартады.</p>
<h3>Метрикалар бір-бірімен қалай байланысады</h3>
<pre><code>Тарту (acquisition) → Activation → Retention → Табыс
   тіркелулер        бірінші пайда   қайта келу    төлем</code></pre>
<p>MAU осы тізбектің қорытындысы: жаңа белсендірілгендер + қайта оралғандар. MAU өссе, оның қай бөліктен өскенін бөліп қараңыз.</p>
<h3>Жиі қателер</h3>
<ul>
<li>MAU-ды DAU-лардың қосындысы деп есептеу. Күн сайын кіретін бір адам DAU-да 30 рет саналады, MAU-да бір рет. MAU тек <code>COUNT(DISTINCT user_id)</code> арқылы есептеледі.</li>
<li>Орташа DAU-ды тек дерегі бар күндерге бөлу. Ешкім кірмеген күн де — күн: бөлгіш күнтізбедегі күн саны.</li>
<li>Activation-ды мерзімсіз есептеу: ескі когорталардың уақыты көп болғандықтан, олар әрқашан «жақсырақ» көрінеді.</li>
<li>Толық емес айды толық аймен салыстыру: айдың 10-ында MAU әрқашан төмен.</li>
</ul>
<div class="tip">DAU демалыс күндері мен мерекелерде қатты ауытқиды. Трендті көру үшін 7 күндік жылжымалы орташаны немесе WAU-ды қолданыңыз.</div>`,
      exercises: [
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: '<b>metrics.</b> <code>daily_active</code> бойынша әр күннің DAU-ын шығарыңыз: <code>day</code>, <code>dau</code>. Күн ретімен.', starter: '', solution: 'SELECT day, COUNT(DISTINCT user_id) AS dau FROM daily_active GROUP BY day ORDER BY day;', check: { ordered: true }, hints: ['<code>COUNT(DISTINCT user_id)</code>, <code>GROUP BY day</code>.'] },
        { type: 'sql', dataset: 'metrics', xp: 30, prompt: '<b>metrics.</b> Қыркүйектің stickiness көрсеткішін бір жолмен шығарыңыз: <code>avg_dau</code> (пайдаланушы-күндер саны / 30 күн, 2 таңба), <code>mau</code> (бірегей пайдаланушылар), <code>stickiness_pct</code> (орташа DAU / MAU, %, 1 таңба). Ешкім кірмеген күн де 30 күнге кіреді.', starter: "SELECT\n  \nFROM daily_active;", solution: 'SELECT ROUND(COUNT(*) * 1.0 / 30, 2) AS avg_dau, COUNT(DISTINCT user_id) AS mau, ROUND(COUNT(*) * 100.0 / 30 / COUNT(DISTINCT user_id), 1) AS stickiness_pct FROM daily_active;', hints: ['Кестеде бір жол = бір пайдаланушының бір күні, сондықтан пайдаланушы-күндер саны — <code>COUNT(*)</code>.', '<code>ROUND(COUNT(*) * 1.0 / 30, 2)</code> және <code>COUNT(DISTINCT user_id)</code>.', '<code>ROUND(COUNT(*) * 100.0 / 30 / COUNT(DISTINCT user_id), 1)</code>'] },
        { type: 'sql', dataset: 'qazaq', xp: 30, prompt: '<b>qazaq.</b> Тіркелген жыл бойынша activation rate: <code>reg_year</code>, <code>registered</code> (тіркелгендер), <code>activated</code> (тіркелгеннен кейін 30 күн ішінде кез келген статустағы бірінші тапсырысын жасағандар), <code>activation_pct</code> (%, 1 таңба). Жыл бойынша сұрыптаңыз.', starter: "WITH f AS (\n  SELECT c.customer_id, c.registered_at, MIN(o.order_date) AS first_order\n  FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.customer_id\n  GROUP BY c.customer_id, c.registered_at\n)\nSELECT ", solution: "WITH f AS (SELECT c.customer_id, c.registered_at, MIN(o.order_date) AS first_order FROM customers c LEFT JOIN orders o ON o.customer_id = c.customer_id GROUP BY c.customer_id, c.registered_at) SELECT strftime('%Y', registered_at) AS reg_year, COUNT(*) AS registered, SUM(CASE WHEN julianday(first_order) - julianday(registered_at) <= 30 THEN 1 ELSE 0 END) AS activated, ROUND(100.0 * SUM(CASE WHEN julianday(first_order) - julianday(registered_at) <= 30 THEN 1 ELSE 0 END) / COUNT(*), 1) AS activation_pct FROM f GROUP BY reg_year ORDER BY reg_year;", check: { ordered: true }, hints: ['Күн айырмасы: <code>julianday(first_order) - julianday(registered_at)</code>. Тапсырысы жоқ клиентте ол NULL, шарт орындалмайды.', '<code>SUM(CASE WHEN julianday(first_order) - julianday(registered_at) &lt;= 30 THEN 1 ELSE 0 END) AS activated</code>', "<code>strftime('%Y', registered_at)</code> бойынша топтаңыз."] },
        { type: 'number', xp: 15, prompt: 'Қосымшаның сәуірдегі орташа DAU-ы 1 200, MAU-ы 6 000. Stickiness неше пайыз?', answer: 20, tol: 0.1, unit: '%', explain: '1 200 / 6 000 = 0.2 = 20%. Орташа пайдаланушы айына шамамен 6 күн кіреді (30 × 0.2).' },
        { type: 'quiz', xp: 10, prompt: 'Аналитик MAU-ды «30 күннің DAU-ларын қосып» есептеді және 98 деген сан алды, ал нақты MAU — 8. Қате неде?', options: ['Қате жоқ, екеуі де дұрыс', 'DAU қосындысы бір адамды кірген әр күні қайта санайды; MAU — ай бойынша бірегей пайдаланушылар саны', 'MAU-ды 30-ға бөлу керек еді', 'DAU-ды апта бойынша қосу керек еді'], answer: 1, explain: 'Бірегей сандарды (DISTINCT) қосуға болмайды. MAU тек COUNT(DISTINCT user_id) арқылы бүкіл ай бойынша есептеледі.' }
      ]
    },
    {
      id: 'ba-ab', title: 'A/B тестті оқу: аналитикке арналған негіз', minutes: 16,
      body: `
<p>«Метрикалардағы қақпандар» сабағында айтылды: себепті дәлелдеудің сенімді жолы — <b>A/B тест</b>. Аналитиктен тесттің математикасын нөлден шығару сирек сұралады, ал нәтиже кестесін дұрыс <b>оқып</b>, «шығарамыз ба, жоқ па?» деген сұраққа жауап беру — күнделікті жұмыс. Тереңірек теория (таралулар, қуат, іріктеме көлемі) M4.2 «Inference &amp; A/B Testing» модулінде.</p>
<h3>Тест қалай құрылады</h3>
<ol>
<li><b>Гипотеза</b>: «"Бір рет басып сатып алу" батырмасы төлем конверсиясын арттырады».</li>
<li><b>Екі топ</b>: пайдаланушылар <b>кездейсоқ</b> бөлінеді. A (control) ескі нұсқаны, B (test) жаңасын көреді. Кездейсоқ бөлу топтардың басқа жағынан бірдей болуын қамтамасыз етеді.</li>
<li><b>Бір негізгі метрика</b> және тесттің <b>ұзақтығы</b> басталмай тұрып бекітіледі.</li>
</ol>
<h3>Нәтиже кестесін оқу</h3>
<table>
<tr><th>Топ</th><th>Пайдаланушы</th><th>Сатып алу</th><th>Конверсия</th></tr>
<tr><td>A (control)</td><td>10 000</td><td>500</td><td>5.0%</td></tr>
<tr><td>B (test)</td><td>10 000</td><td>560</td><td>5.6%</td></tr>
</table>
<p>Айырма: +0.6 пайыздық пункт (абсолютті), +12% (салыстырмалы: 0.6 / 5.0). p-value = 0.058. Айырманың 95% сенімділік интервалы: −0.02-ден +1.22 п.п.-қа дейін.</p>
<ul>
<li><b>Абсолютті және салыстырмалы өсім</b>. «Конверсия 12% өсті» мен «0.6 п.п. өсті» — бір нәрсе. Есепте қайсысы екенін әрқашан жазыңыз.</li>
<li><b>p-value</b>: егер шын мәнінде A мен B арасында айырма <b>жоқ</b> болса, осындай немесе одан үлкен айырманы кездейсоқ көру ықтималдығы. Мұнда 5.8%. Әдеттегі шек — 5% (0.05). p одан төмен болса, нәтиже «статистикалық мәнді» деп аталады. Мұнда шектен сәл жоғары: айырма дәлелденген жоқ.</li>
<li><b>Сенімділік интервалы (CI)</b>: шынайы айырма жатуы ықтимал аралық. Интервал <b>нөлді қамтыса</b> (мұнда −0.02 … +1.22), «әсер жоқ» деген нұсқаны жоққа шығара алмаймыз. CI p-value-дан пайдалырақ: ол әсердің мүмкін <b>көлемін</b> де көрсетеді.</li>
</ul>
<p>p-value «B-ның жақсы болу ықтималдығы 94.2%» дегенді <b>білдірмейді</b>. Бұл — ең жиі қате түсіндірме.</p>
<h3>Нәтижеге сенбес бұрын: SRM тексерісі</h3>
<p><b>SRM</b> (sample ratio mismatch) — топтардың көлемі жоспардан ауытқуы. 50/50 жоспарланып, A-да 10 000, B-да 9 400 адам болса, бөлу механизмінде қате бар: мысалы, жаңа бет баяу жүктеліп, пайдаланушылардың бір бөлігі есепке түспей жатыр. Мұндай тесттің нәтижесіне сенуге болмайды.</p>
<p>Тексеру: күтілетін көлем e = (10 000 + 9 400) / 2 = 9 700. χ² = (10 000 − 9 700)² / 9 700 + (9 400 − 9 700)² / 9 700 ≈ 18.56. χ² 3.84-тен асса (p &lt; 0.05), ауытқу кездейсоқ емес. Көп командалар қатаңырақ шек қолданады: 10.83 (p &lt; 0.001).</p>
<h3>Peeking: ерте қарап, ерте тоқтату</h3>
<p>Тестке күнде қарап, p &lt; 0.05 болған сәтте тоқтатсаңыз, жалған «жеңістердің» үлесі 5%-дан 20–30%-ға дейін өседі: p-value күннен күнге ауытқиды, ерте ме, кеш пе шектен кездейсоқ өтеді. Ереже: көлем мен ұзақтықты алдын ала есептеп, соңына дейін күту. Ұзақтық кемінде 1–2 <b>толық апта</b> болсын, себебі жұмыс күні мен демалыс күнінің мінезі әртүрлі.</p>
<h3>Статистикалық мәнділік пен практикалық мәнділік</h3>
<p>Миллион пайдаланушыда +0.05 п.п. айырма да «мәнді» болып шығады. Бірақ ол әзірлеу мен қолдау шығынын ақтай ма? Сондықтан тест алдында <b>MDE</b> (minimum detectable effect) — бизнеске маңызды ең кіші әсер белгіленеді. Керісінше, шағын тестте үлкен пайдалы әсер «мәнсіз» болып қалуы мүмкін: дерек жетпеді.</p>
<h3>Шешім қабылдау</h3>
<table>
<tr><th>Жағдай</th><th>Шешім</th></tr>
<tr><td>SRM бар</td><td>Нәтижені қолданбаймыз. Бөлу қатесін тауып, тестті қайта жүргіземіз</td></tr>
<tr><td>CI толығымен нөлден жоғары және әсер MDE-ден үлкен</td><td>Жаңа нұсқаны шығарамыз</td></tr>
<tr><td>CI нөлді қамтиды, жоспарланған көлем жиналды</td><td>Әсер дәлелденбеді. Шығармаймыз немесе гипотезаны қайта қараймыз</td></tr>
<tr><td>Негізгі метрика өсті, қорғаушы метрика (қайтарулар, шағымдар) нашарлады</td><td>Шығармаймыз, себебін зерттейміз</td></tr>
</table>
<div class="tip">Тест қорытындысын бір сөйлеммен жазыңыз: «B нұсқасы төлем конверсиясын 5.0%-дан 5.6%-ға өзгертті (+0.6 п.п., 95% CI −0.02…+1.22, p = 0.058); SRM жоқ; әсер дәлелденбеді, шығармауды ұсынамын». Сандар, сенімділік және ұсыныс бірге.</div>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Тест нәтижесі: p-value = 0.03. Дұрыс түсіндірме қайсы?', options: ['B нұсқасының жақсы болу ықтималдығы 97%', 'Егер нұсқалар арасында шын мәнінде айырма жоқ болса, осындай немесе одан үлкен айырманы кездейсоқ көру ықтималдығы 3%', 'Конверсия 3%-ға өсті', 'Пайдаланушылардың 3%-ы B нұсқасын ұнатпады'], answer: 1, explain: 'p-value — «айырма жоқ» деген болжам дұрыс болғандағы осындай деректің ықтималдығы. Ол B-ның жақсы болу ықтималдығы емес.' },
        { type: 'number', xp: 15, prompt: 'A тобы: 8 000 пайдаланушы, 400 сатып алу. B тобы: 8 000 пайдаланушы, 460 сатып алу. Конверсияның <b>салыстырмалы</b> өсімі неше пайыз?', answer: 15, tol: 0.1, unit: '%', explain: 'A: 400 / 8 000 = 5.0%. B: 460 / 8 000 = 5.75%. Салыстырмалы өсім = (5.75 − 5.0) / 5.0 = 15%. Абсолютті өсім — 0.75 п.п.' },
        { type: 'python', xp: 25, prompt: '<code>ab_summary(a_users, a_conv, b_users, b_conv)</code> функциясын жазыңыз. Ол сөздік қайтарсын: <code>cr_a</code> және <code>cr_b</code> (конверсия, %), <code>abs_lift_pp</code> (B − A, пайыздық пункт), <code>rel_lift_pct</code> (салыстырмалы өсім, %). Барлық мән 2 таңбаға дейін <code>round</code> жасалсын.', starter: "def ab_summary(a_users, a_conv, b_users, b_conv):\n    pass\n", solution: "def ab_summary(a_users, a_conv, b_users, b_conv):\n    cr_a = a_conv / a_users * 100\n    cr_b = b_conv / b_users * 100\n    return {\n        \"cr_a\": round(cr_a, 2),\n        \"cr_b\": round(cr_b, 2),\n        \"abs_lift_pp\": round(cr_b - cr_a, 2),\n        \"rel_lift_pct\": round((cr_b - cr_a) / cr_a * 100, 2),\n    }", check: { tests: "_r = ab_summary(10000, 500, 10000, 560)\nassert isinstance(_r, dict), \"Функция сөздік қайтаруы керек\"\nfor _k, _v in [(\"cr_a\", 5.0), (\"cr_b\", 5.6), (\"abs_lift_pp\", 0.6), (\"rel_lift_pct\", 12.0)]:\n    assert _k in _r, f\"Сөздікте {_k} кілті жоқ\"\n    assert abs(_r[_k] - _v) < 0.011, f\"ab_summary(10000, 500, 10000, 560): {_k} = {_v} болуы керек, сізде {_r[_k]}\"\n_r = ab_summary(8000, 400, 4000, 230)\nassert abs(_r[\"cr_b\"] - 5.75) < 0.011, \"Әр топтың конверсиясы өз пайдаланушы санына бөлінеді\"\nassert abs(_r[\"rel_lift_pct\"] - 15.0) < 0.011, \"Салыстырмалы өсім: (cr_b - cr_a) / cr_a * 100\"" }, hints: ['<code>cr_a = a_conv / a_users * 100</code>', 'Салыстырмалы өсім: <code>(cr_b - cr_a) / cr_a * 100</code>'] },
        { type: 'python', xp: 25, prompt: '50/50 бөлінуі тиіс тесттің SRM тексерісін жазыңыз. <code>srm_check(n_a, n_b)</code> функциясы <code>(chi2, has_srm)</code> жұбын қайтарсын: <code>chi2</code> = (n_a − e)² / e + (n_b − e)² / e, мұнда e — екі топтың орташа көлемі (2 таңбаға дейін <code>round</code>); <code>has_srm</code> — <code>chi2</code> 3.84-тен үлкен болса <code>True</code>.', starter: "def srm_check(n_a, n_b):\n    pass\n", solution: "def srm_check(n_a, n_b):\n    e = (n_a + n_b) / 2\n    chi2 = round((n_a - e) ** 2 / e + (n_b - e) ** 2 / e, 2)\n    return chi2, chi2 > 3.84", check: { tests: "_c, _f = srm_check(10000, 9400)\nassert abs(_c - 18.56) < 0.011, f\"srm_check(10000, 9400): chi2 = 18.56 болуы керек, сізде {_c}\"\nassert _f is True, \"chi2 3.84-тен үлкен: has_srm True болуы керек\"\n_c, _f = srm_check(5050, 4950)\nassert abs(_c - 1.0) < 0.011, f\"srm_check(5050, 4950): chi2 = 1.0 болуы керек, сізде {_c}\"\nassert _f is False, \"chi2 3.84-тен кіші: has_srm False болуы керек\"" }, hints: ['<code>e = (n_a + n_b) / 2</code>', '<code>return chi2, chi2 &gt; 3.84</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Тест жоспарланған 2 апта жүрді, SRM жоқ. Конверсия айырмасының 95% сенімділік интервалы: −0.02-ден +1.22 п.п.-қа дейін. Қорытынды қандай?', options: ['B жеңді: интервалдың көп бөлігі оң', 'Интервал нөлді қамтиды: әсер дәлелденбеді. Жаңа нұсқаны «конверсияны өсіреді» деп шығаруға негіз жоқ', 'B жеңілді: конверсия төмендеді', 'p &lt; 0.05 болғанша тестті күнде тексеріп, сол сәтте тоқтату керек'], answer: 1, explain: 'Нөл интервалдың ішінде, яғни «айырма жоқ» нұсқасы жоққа шығарылмады. p &lt; 0.05 болғанша күту — peeking, ол жалған жеңістерді көбейтеді.' }
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
