// M3.7 DA Capstone & Interview. Dataset: cafe (customers, orders) — a coffee chain, Jan–Jun 2024.
(function () {
  const CLEAN = "status = 'paid' AND amount IS NOT NULL AND amount < 20000";
  DJ.modules['m3-7'] = {
    intro: 'Қорытынды жоба: «Бірінші кофе» желісінің 6 айлық деректерін бастан-аяқ талдайсыз. Бизнес сұрақ → profiling → тазалау → метрикалар → сегменттер → retention → ұсыныс → memo. Соңында сұхбатқа дайындық тапсырмалары бар. Бұл жобаны портфолиоңызға қосуға болады.',
    lessons: [
      {
        id: 'cap-1', title: 'Бриф: бизнес сұрақ және жоспар', minutes: 10,
        body: `
<p><b>Клиент:</b> «Бірінші кофе» — Алматы, Астана және Шымкенттегі кофехана желісі. Клиенттер қосымша арқылы тапсырыс береді.</p>
<p><b>Маркетинг директорының сұрағы:</b> «Келесі тоқсанда жарнама бюджетін қай арнаға (Instagram, 2GIS, referral) көбірек бөлу керек? Қай қалада мәселе бар?»</p>
<p><b>Деректер</b> (<code>cafe</code> дерекқоры):</p>
<table>
<tr><th>Кесте</th><th>Бағандар</th></tr>
<tr><td><code>customers</code></td><td>id, city, channel (instagram / 2gis / referral), signup_date</td></tr>
<tr><td><code>orders</code></td><td>id, customer_id, order_date, amount, status (paid / refund)</td></tr>
</table>
<p>Тоқсандағы жарнама шығыны: Instagram 300 000 ₸, 2GIS 150 000 ₸, referral бағдарламасы 40 000 ₸.</p>
<h3>Жоспар</h3>
<ol>
<li>Profiling: дерек сапасы қандай?</li>
<li>Тазалау ережелерін жазу.</li>
<li>Айлық метрикалар: табыс, тапсырыстар, орташа чек.</li>
<li>Арна мен қала бойынша сегменттер.</li>
<li>Қайта сатып алу (retention).</li>
<li>Бір теңге жарнамаға келетін табыс.</li>
<li>Memo: ұсыныс пен шектеулер.</li>
</ol>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Директордың сұрағына жауап беру үшін ең маңызды салыстыру қайсы?', options: ['Қай арнада клиенттер көп тіркелді', 'Әр арнаның клиенттері әкелетін табыс пен арна шығынының қатынасы', 'Қай қалада кофехана көп', 'Қай айда тапсырыс көп'], answer: 1, explain: 'Бюджет шешімі «жұмсалған теңгеге қанша қайтады» деген сұраққа байланысты.' },
          { type: 'quiz', xp: 10, prompt: 'Неліктен талдауды метрикадан емес, profiling-тен бастаймыз?', options: ['Солай дәстүр', 'Дерек сапасындағы мәселелер (бос мән, қайтарым, шеткі мән) кейінгі барлық сандарды бұрмалауы мүмкін', 'SQL басқаша жұмыс істемейді', 'Уақыт үнемдеу үшін'], answer: 1, explain: 'Қате деректен шыққан дұрыс формула да қате нәтиже береді.' }
        ]
      },
      {
        id: 'cap-2', title: 'Profiling', minutes: 12,
        body: `
<p>Алдымен <code>orders</code> кестесінің «денсаулығын» тексереміз: неше жол, бос сомалар, қайтарымдар (<code>refund</code>), күн ауқымы.</p>
<p>Сосын ең үлкен тапсырыстарды қараймыз: шеткі мәндер бар ма?</p>
<div class="tip">Profiling нәтижесін жазып отырыңыз. Ол memo-ның «Шектеулер» бөліміне кіреді.</div>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 20, prompt: '<code>orders</code> бойынша бір жолда: <code>n</code>, <code>null_amount</code>, <code>refunds</code>, <code>first_day</code>, <code>last_day</code>.', starter: '', solution: "SELECT COUNT(*) AS n, SUM(amount IS NULL) AS null_amount, SUM(status = 'refund') AS refunds, MIN(order_date) AS first_day, MAX(order_date) AS last_day FROM orders;", check: { ordered: true }, hints: ["<code>SUM(status = 'refund')</code>"] },
          { type: 'sql', dataset: 'cafe', xp: 15, prompt: 'Сомасы ең үлкен 3 тапсырысты шығарыңыз: <code>id</code>, <code>customer_id</code>, <code>amount</code>, кему ретімен.', starter: '', solution: 'SELECT id, customer_id, amount FROM orders WHERE amount IS NOT NULL ORDER BY amount DESC LIMIT 3;', check: { ordered: true }, hints: ['<code>ORDER BY amount DESC LIMIT 3</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Бір тапсырыс 48 000 ₸, ал әдеттегі чек шамамен 2 500 ₸. Бұл не болуы мүмкін және не істейміз?', options: ['Қате, бірден өшіреміз', 'Корпоративтік тапсырыс болуы мүмкін: табысқа қосамыз, бірақ орташа чек пен клиент мінез-құлқын талдағанда бөлек ұстаймыз және құжаттаймыз', 'Елемейміз', 'Орташамен ауыстырамыз'], answer: 1, explain: 'Бір ірі тапсырыс арнаның орташа чегін бұрмалайды. Шешімді жазып қойыңыз.' }
        ]
      },
      {
        id: 'cap-3', title: 'Тазалау ережелері', minutes: 10,
        body: `
<p>Profiling нәтижесінде ережелер:</p>
<ul>
<li>Тек <code>status = 'paid'</code> тапсырыстар (refund — табыс емес).</li>
<li><code>amount IS NOT NULL</code>.</li>
<li>Орташа чек пен клиент мінезін талдауда <code>amount &lt; 20000</code> (корпоративтік тапсырысты бөлек есептейміз).</li>
</ul>
<p>Ережелерді бір рет CTE ретінде жазып, кейін әр сұрауда қайталап қолданамыз:</p>
<pre><code>WITH clean AS (
  SELECT * FROM orders
  WHERE ${CLEAN}
)
SELECT ... FROM clean ...</code></pre>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 20, prompt: '<code>clean</code> CTE-ін жазып, бір жолда <code>orders</code> (таза тапсырыстар саны) және <code>revenue</code> (олардың сомасы) шығарыңыз.', starter: 'WITH clean AS (\n  SELECT * FROM orders\n  WHERE \n)\nSELECT ', solution: `WITH clean AS (SELECT * FROM orders WHERE ${CLEAN}) SELECT COUNT(*) AS orders, SUM(amount) AS revenue FROM clean;`, check: { ordered: true, mustInclude: ['WITH'] }, hints: ['Үш шартты <code>AND</code> арқылы біріктіріңіз.'] }
        ]
      },
      {
        id: 'cap-4', title: 'Айлық метрикалар', minutes: 12,
        body: `
<p>Бизнестің «тамыр соғысы»: әр айда неше тапсырыс, қанша табыс, неше белсенді клиент және орташа чек.</p>
<p>Нәтижені line chart-қа салуға болады. Өсу мен құлдыраудың себебін кейін сегменттерден іздейміз.</p>
<div class="tip">Маусым — соңғы ай, бірақ дерек 30-шы маусымға дейін толық. Әр айдың толық екенін әрқашан тексеріңіз: толық емес соңғы ай «құлдырау» болып көрінеді.</div>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 25, prompt: 'Таза тапсырыстар бойынша әр ай үшін: <code>month</code> (YYYY-MM), <code>orders</code>, <code>revenue</code>, <code>customers</code> (бірегей), <code>aov</code> (бүтінге дейін <code>ROUND</code>). Ай ретімен.', starter: '', solution: `WITH clean AS (SELECT * FROM orders WHERE ${CLEAN}) SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders, SUM(amount) AS revenue, COUNT(DISTINCT customer_id) AS customers, ROUND(AVG(amount)) AS aov FROM clean GROUP BY month ORDER BY month;`, check: { ordered: true }, hints: ['<code>clean</code> CTE + <code>GROUP BY substr(order_date, 1, 7)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Маусымда тапсырыстар мамырдан аз. Memo-ға «маусымда құлдырау» деп жазбас бұрын не тексересіз?', options: ['Ештеңе', 'Жаңа клиенттер ағыны (тіркелу айлары) мен ескі клиенттердің кетуін: құлдырау қайдан келеді?', 'Шрифтті', 'Тек табысты'], answer: 1, explain: 'Жалпы сан өзгерсе, оны құрамдас бөліктерге жіктеп, себебін табамыз.' }
        ]
      },
      {
        id: 'cap-5', title: 'Сегменттер: арна және қала', minutes: 14,
        body: `
<p>Енді директордың сұрағына жақындаймыз: арналар бір-бірінен немен ерекшеленеді?</p>
<ul>
<li>Клиенттер саны</li>
<li>Бір клиентке келетін тапсырыстар (жиілік)</li>
<li>Орташа чек</li>
<li>Бір клиенттен түскен табыс</li>
</ul>
<p>Арна клиентке <code>customers</code> кестесі арқылы байланған, сондықтан <code>JOIN</code> керек.</p>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 30, prompt: 'Таза тапсырыстар бойынша арна сегменттері: <code>channel</code>, <code>customers</code> (тапсырыс берген бірегей клиенттер), <code>orders</code>, <code>revenue</code>, <code>rev_per_customer</code> (бүтінге дейін ROUND). Табыс бойынша кему ретімен.', starter: '', solution: `WITH clean AS (SELECT * FROM orders WHERE ${CLEAN}) SELECT c.channel, COUNT(DISTINCT c.id) AS customers, COUNT(o.id) AS orders, SUM(o.amount) AS revenue, ROUND(SUM(o.amount) * 1.0 / COUNT(DISTINCT c.id)) AS rev_per_customer FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.channel ORDER BY revenue DESC;`, check: { ordered: true }, hints: ['<code>customers c JOIN clean o ON o.customer_id = c.id</code>', '<code>ROUND(SUM(o.amount) * 1.0 / COUNT(DISTINCT c.id))</code>'] },
          { type: 'sql', dataset: 'cafe', xp: 20, prompt: 'Қала бойынша орташа чек: <code>city</code>, <code>aov</code> (бүтінге дейін), кему ретімен.', starter: '', solution: `WITH clean AS (SELECT * FROM orders WHERE ${CLEAN}) SELECT c.city, ROUND(AVG(o.amount)) AS aov FROM customers c JOIN clean o ON o.customer_id = c.id GROUP BY c.city ORDER BY aov DESC;`, check: { ordered: true }, hints: ['Алдыңғы сұраудағы JOIN, бірақ <code>GROUP BY c.city</code>.'] }
        ]
      },
      {
        id: 'cap-6', title: 'Қайта сатып алу (retention)', minutes: 12,
        body: `
<p>Кофехана үшін ең маңызды сұрақ — клиент қайта келе ме? Қарапайым көрсеткіш — <b>repeat rate</b>: кемінде 3 таза тапсырыс берген клиенттер үлесі.</p>
<pre><code>WITH per AS (
  SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id
)
SELECT ... SUM(n >= 3) * 100.0 / COUNT(*) ...</code></pre>
<p>Арна бойынша repeat rate әртүрлі болса, «арзан тартылған, бірақ бір рет келіп кететін» клиенттерді көреміз.</p>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 30, prompt: 'Арна бойынша repeat rate: <code>channel</code>, <code>customers</code>, <code>repeat_rate</code> (≥ 3 таза тапсырысы бар клиенттер үлесі, %, бір ондық белгі). Кему ретімен.', starter: '', solution: `WITH clean AS (SELECT * FROM orders WHERE ${CLEAN}), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT c.channel, COUNT(*) AS customers, ROUND(SUM(p.n >= 3) * 100.0 / COUNT(*), 1) AS repeat_rate FROM per p JOIN customers c ON c.id = p.customer_id GROUP BY c.channel ORDER BY repeat_rate DESC;`, check: { ordered: true, mustInclude: ['WITH'] }, hints: ['Екі CTE: <code>clean</code> және <code>per</code>.', '<code>ROUND(SUM(p.n &gt;= 3) * 100.0 / COUNT(*), 1)</code>'] }
        ]
      },
      {
        id: 'cap-7', title: 'Жарнама тиімділігі Python-да', minutes: 14,
        body: `
<p>SQL нәтижелерін Python-ға алып, жарнама шығынымен салыстырамыз. <b>ROAS</b> (return on ad spend) = арна табысы / арна шығыны.</p>
<pre><code>spend = {"instagram": 300000, "2gis": 150000, "referral": 40000}</code></pre>
<p>ROAS 1-ден төмен болса, арна жарнамаға жұмсалғаннан аз табыс әкелген (маржаны есептемегенде де).</p>`,
        exercises: [
          { type: 'python', xp: 30, prompt: '<code>roas_ranking(revenue, spend)</code> функциясын жазыңыз: әр арна үшін <code>(арна, roas)</code> жұптарын ROAS бойынша кему ретімен тізім ретінде қайтарсын. ROAS екі ондық белгіге дейін <code>round</code> жасалсын.', starter: 'def roas_ranking(revenue, spend):\n    pass\n', solution: 'def roas_ranking(revenue, spend):\n    pairs = [(ch, round(revenue[ch] / spend[ch], 2)) for ch in spend]\n    return sorted(pairs, key=lambda p: p[1], reverse=True)', check: { tests: '_rev = {"instagram": 150000, "2gis": 138800, "referral": 79200}\n_sp = {"instagram": 300000, "2gis": 150000, "referral": 40000}\n_r = roas_ranking(_rev, _sp)\nassert _r == [("referral", 1.98), ("2gis", 0.93), ("instagram", 0.5)], f"Күтілгені [(\'referral\', 1.98), (\'2gis\', 0.93), (\'instagram\', 0.5)], сізде {_r}"' }, hints: ['<code>round(revenue[ch] / spend[ch], 2)</code>', '<code>sorted(..., key=lambda p: p[1], reverse=True)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Referral-дың ROAS-ы ең жоғары. Бюджетті бірден 10 есе көбейтуге бола ма?', options: ['Иә, әрине', 'Сақтықпен: referral ауқымы шектеулі (ұсынатын клиенттер саны), сондықтан біртіндеп көбейтіп, нәтижені өлшеу керек', 'Жоқ, referral жаман', 'Instagram-ды толық өшіру керек'], answer: 1, explain: 'Кіші арнаның тиімділігі масштаб өскенде сақталмауы мүмкін. Эксперимент жасаңыз.' }
        ]
      },
      {
        id: 'cap-8', title: 'Memo және портфолио', minutes: 12,
        body: `
<p>Нәтижелерді бір бетке жинаймыз. Memo құрылымы (Business Analytics модулінен):</p>
<ol>
<li><b>Қорытынды</b>: бір-екі сөйлем, ұсыныспен.</li>
<li><b>Дәлелдер</b>: арна кестесі, repeat rate, ROAS.</li>
<li><b>Ұсыныс</b>: бюджетті қалай қайта бөлу, қандай эксперимент.</li>
<li><b>Шектеулер</b>: 6 ай ғана, маржа белгісіз, бір корпоративтік тапсырыс бөлек есептелді, бос сомалар алынды.</li>
</ol>
<h3>Портфолиоға қалай салу</h3>
<ul>
<li>GitHub репозиторийі: <code>README.md</code> (сұрақ, дерек, әдіс, нәтиже, ұсыныс), <code>sql/</code> папкасы, бір-екі график.</li>
<li>README-дің басында нәтиже тұрсын: жұмыс беруші 30 секундта оқиды.</li>
<li>Резюмеде: «6 айлық транзакцияларды талдап, арна бойынша ROAS пен retention-ды есептеп, бюджетті қайта бөлу ұсынысын жасадым».</li>
</ul>`,
        exercises: [
          { type: 'quiz', xp: 15, prompt: 'Memo-ның бірінші абзацы ретінде қайсысы ең жақсы?', options: ['«Мен 150 тапсырысты SQL-мен талдадым.»', '«Referral клиенттері жиірек қайта келеді және әр жарнама теңгесіне ең көп табыс әкеледі (ROAS ≈ 2), ал Instagram жарнамасы шығынын ақтамайды (ROAS ≈ 0.5). Instagram бюджетінің бір бөлігін referral-ға ауыстырып, бір тоқсан бойы нәтижені өлшеуді ұсынамыз.»', '«Деректе қызықты нәрселер көп.»', '«Instagram жаман.»'], answer: 1, explain: 'Нәтиже, дәлел және әрекет бір абзацта. (Нақты сандарыңыз сұрауларыңыздың нәтижесіне сай болуы керек.)' },
          { type: 'rubric', xp: 40, minWords: 60, prompt: 'Өз memo-ңызды жазыңыз (кемінде 60 сөз), сосын оны төрт критерий бойынша адал бағалаңыз. Өту үшін әр критерий кемінде <b>3 / 4</b> болуы керек. Бұл жұмыс беруші жобаңызды қалай бағалайтынымен бірдей.', criteria: [
            { name: 'Бизнес сұраққа жауап', levels: ['Сұраққа жауап жоқ', 'Жауап бар, бірақ соңында немесе бұлыңғыр', 'Бірінші абзацта нақты жауап бар', 'Бірінші сөйлемде жауап, сан және ұсыныс бар'] },
            { name: 'Дәлелдер мен сандар', levels: ['Сандар жоқ', 'Бір-екі сан, тексерілмеген', 'Негізгі тұжырымдар сандармен расталған', 'Әр тұжырымда сұрауыңыздан алынған сан бар (табыс, repeat rate, ROAS)'] },
            { name: 'Тазалау және шектеулер', levels: ['Айтылмаған', 'Тек «деректерді тазаладым»', 'Ережелер аталған (NULL, refund, 48 000 ₸)', 'Ережелер, олардың нәтижеге әсері және деректің шектеулері айтылған'] },
            { name: 'Ұсыныс және келесі қадам', levels: ['Ұсыныс жоқ', 'Жалпы ұсыныс («жарнаманы жақсарту»)', 'Нақты әрекет (бюджетті қайта бөлу)', 'Нақты әрекет, мерзім және нәтижені қалай өлшеу (эксперимент)'] }
          ] },
          { type: 'quiz', xp: 10, prompt: 'Портфолио жобасының README файлы неден басталуы керек?', options: ['Кітапханалар тізімінен', 'Бизнес сұрақ пен негізгі нәтижеден', 'Автордың өмірбаянынан', 'SQL кодынан'], answer: 1, explain: 'Оқырман алдымен «не таптың?» деп сұрайды.' }
        ]
      },
      {
        id: 'cap-9', title: 'Сұхбатқа дайындық: SQL және кейс', minutes: 15,
        body: `
<p>Junior Data Analyst сұхбаты әдетте үш бөліктен тұрады:</p>
<ol>
<li><b>SQL тапсырмалары</b> (live coding): JOIN, GROUP BY, window functions, «екінші орын», дубликаттар.</li>
<li><b>Бизнес кейс</b>: «метрика 10% түсті, не істейсіз?» Құрылымды ойлау маңызды: тексеру → жіктеу → гипотеза → дерек.</li>
<li><b>Мінез-құлық сұрақтары</b>: STAR әдісімен жауап (Situation, Task, Action, Result).</li>
</ol>
<p>Төмендегі тапсырмалар сұхбатта жиі кездесетін үлгілер, бірақ біздің кофехана дерекқорында.</p>
<div class="tip">Live coding кезінде ойыңызды дауыстап айтыңыз: интервьюер дұрыс жауаптан бөлек, ойлау жолыңызды бағалайды.</div>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 25, prompt: 'Әр клиенттің <b>екінші</b> тапсырысының күнін шығарыңыз (кез келген статус): <code>customer_id</code>, <code>second_order</code>. Тек кемінде екі тапсырысы барлар.', starter: '', solution: 'SELECT customer_id, order_date AS second_order FROM (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id) AS rn FROM orders) WHERE rn = 2;', check: { mustInclude: ['OVER'] }, hints: ['<code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id)</code>, сыртында <code>rn = 2</code>.'] },
          { type: 'sql', dataset: 'cafe', xp: 25, prompt: 'Сәуірден бастап (<code>2024-04-01</code> және одан кейін) бірде-бір тапсырыс бермеген клиенттер: <code>id</code>, <code>city</code>, <code>channel</code>.', starter: '', solution: "SELECT id, city, channel FROM customers WHERE id NOT IN (SELECT customer_id FROM orders WHERE order_date >= '2024-04-01');", hints: ['<code>NOT IN (SELECT customer_id FROM orders WHERE ...)</code> немесе <code>LEFT JOIN ... IS NULL</code>.'] },
          { type: 'quiz', xp: 10, prompt: 'Интервьюер: «Кеше тапсырыстар 30% түсті. Не істейсіз?» Ең жақсы бірінші қадам?', options: ['Бірден маркетингті кінәлау', 'Деректің өзін тексеру (жүктеу қатесі, толық емес күн), сосын қала/арна/платформа бойынша жіктеп, құлдыраудың қайда екенін табу', 'Модель құру', 'Күте тұру'], answer: 1, explain: 'Алдымен дерек дұрыс па, сосын «қайда» деген сұрақ, содан кейін ғана «неге».' }
        ]
      },
      {
        id: 'cap-gate', gate: true, title: 'Қорытынды емтихан: Junior Data Analyst', minutes: 30,
        body: `
<p>Data Analyst жолының соңғы тексерісі. Дерекқор: <code>cafe</code>. Тазалау ережесі: <code>${CLEAN}</code>.</p>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 40, prompt: 'Таза табысы ең жоғары айды шығарыңыз: <code>month</code>, <code>revenue</code> (бір жол).', starter: '', solution: `SELECT substr(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders WHERE ${CLEAN} GROUP BY month ORDER BY revenue DESC LIMIT 1;`, check: { ordered: true }, hints: [] },
          { type: 'sql', dataset: 'cafe', xp: 40, prompt: 'Әр қалада таза табыс бойынша ең көп ақша жұмсаған клиент: <code>city</code>, <code>customer_id</code>, <code>spent</code>.', starter: '', solution: `WITH s AS (SELECT c.city, c.id AS customer_id, SUM(o.amount) AS spent FROM customers c JOIN orders o ON o.customer_id = c.id WHERE o.${CLEAN.replace(/ AND amount/g, ' AND o.amount')} GROUP BY c.city, c.id) SELECT city, customer_id, spent FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY city ORDER BY spent DESC, customer_id) AS rn FROM s) WHERE rn = 1;`, hints: [] },
          { type: 'sql', dataset: 'cafe', xp: 40, prompt: 'Тіркелу айы (<code>signup_date</code>-тың YYYY-MM бөлігі) бойынша когорттар: <code>cohort</code>, <code>customers</code> (когорттағы барлық клиенттер), <code>buyers_q2</code> (2024-04-01 және одан кейін кемінде бір таза тапсырыс бергендер). Когорт ретімен.', starter: '', solution: `SELECT substr(c.signup_date, 1, 7) AS cohort, COUNT(*) AS customers, SUM(EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.order_date >= '2024-04-01' AND o.${CLEAN.replace(/ AND amount/g, ' AND o.amount')})) AS buyers_q2 FROM customers c GROUP BY cohort ORDER BY cohort;`, check: { ordered: true }, hints: [] },
          { type: 'quiz', xp: 20, prompt: 'Талдау көрсеткендей, Instagram клиенттерінің орташа чегі жоғары, бірақ оның себебі бір 48 000 ₸-лік корпоративтік тапсырыс. Memo-да қалай жазасыз?', options: ['Instagram-ның орташа чегі ең жоғары деп', 'Корпоративтік тапсырысты бөлек атап, оны алып тастағандағы орташа чекті келтіремін', 'Тапсырысты үнсіз өшіремін', 'Орташа чекті мүлдем көрсетпеймін'], answer: 1, explain: 'Ашықтық: шеткі мәнді атап, екі нұсқаны да көрсету сенім арттырады.' }
        ]
      }
    ]
  };
})();
