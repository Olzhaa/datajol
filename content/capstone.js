// M3.7 DA Capstone & Interview. Dataset: cafe (customers, orders) — a coffee chain, Jan–Jun 2024.
(function () {
  const CLEAN = "status = 'paid' AND amount IS NOT NULL AND amount < 20000";
  const CLEAN_HTML = CLEAN.replace(/</g, '&lt;');   // HTML мәтінінде көрсету үшін; SQL шешімдерінде CLEAN өзгеріссіз қолданылады
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
</ol>
<h3>Бизнес сұрағын талдау сұрағына айналдыру</h3>
<p>Директордың сұрағы кең: «бюджетті қайда бөлеміз?». Аналитиктің бірінші жұмысы — оны өлшенетін сұрақтарға бөлу:</p>
<ul>
<li>Әр арна қанша клиент әкелді және олар қанша табыс берді?</li>
<li>Қай арнаның клиенттері қайта келеді (retention)?</li>
<li>Жарнамаға жұмсалған бір теңге әр арнада қанша табыс қайтарды (ROAS)?</li>
<li>Қалалар арасында орташа чек пен тапсырыс жиілігі қалай ерекшеленеді?</li>
</ul>
<p>Әр сұрақтың жанына «қандай шешімге әсер етеді?» деп жазып қойыңыз. Шешімге әсер етпейтін сұрақ — әдемі, бірақ артық жұмыс.</p>
<div class="tip">Жобаны бастамас бұрын «табыс» деген сөзді нақтылаңыз: қайтарымдар (refund) кіре ме, корпоративтік тапсырыстар ше? Анықтаманы бір рет келісіп, memo-ға жазыңыз.</div>`,
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
<div class="tip">Profiling нәтижесін жазып отырыңыз. Ол memo-ның «Шектеулер» бөліміне кіреді.</div>
<h3>Profiling тексеру тізімі</h3>
<p>Кез келген жаңа кестеге бірдей сұрақтар қойылады. Оларды әдетке айналдырыңыз:</p>
<table>
<tr><th>Сұрақ</th><th>SQL үлгісі</th></tr>
<tr><td>Қанша жол бар?</td><td><code>COUNT(*)</code></td></tr>
<tr><td>Бос мәндер қанша?</td><td><code>SUM(amount IS NULL)</code></td></tr>
<tr><td>Қандай статустар бар?</td><td><code>SELECT status, COUNT(*) ... GROUP BY status</code></td></tr>
<tr><td>Күн ауқымы қандай?</td><td><code>MIN(order_date)</code>, <code>MAX(order_date)</code></td></tr>
<tr><td>Шеткі мәндер бар ма?</td><td><code>ORDER BY amount DESC LIMIT 5</code></td></tr>
<tr><td>Дубликаттар бар ма?</td><td><code>COUNT(*)</code> мен <code>COUNT(DISTINCT id)</code> салыстыру</td></tr>
</table>
<p>SQLite-та <code>amount IS NULL</code> өрнегі 1 немесе 0 береді, сондықтан оны <code>SUM</code> ішіне салсаңыз, бос мәндердің саны шығады.</p>
<p>Profiling-тің мақсаты — қате табу емес, деректі түсіну. Табылған әр ерекшелік кейін тазалау ережесіне немесе memo-дағы шектеуге айналады.</p>`,
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
  WHERE ${CLEAN_HTML}
)
SELECT ... FROM clean ...</code></pre>
<h3>Неге ережелерді бір жерде ұстаймыз?</h3>
<p>Егер әр сұрауда сүзгіні қайта жазсаңыз, бір жерде <code>amount &lt; 20000</code> шартын ұмытып кетуіңіз оңай. Сонда екі кестедегі табыс бір-бірімен сәйкес келмейді, ал директор «қай сан дұрыс?» деп сұрайды. Бір <code>clean</code> CTE барлық есептің бір анықтамаға сүйенуін қамтамасыз етеді.</p>
<h3>Әр ереженің себебін жазыңыз</h3>
<table>
<tr><th>Ереже</th><th>Себебі</th></tr>
<tr><td><code>status = 'paid'</code></td><td>Қайтарылған ақша табыс емес.</td></tr>
<tr><td><code>amount IS NOT NULL</code></td><td>Сомасы белгісіз тапсырысты қосу мүмкін емес.</td></tr>
<tr><td><code>amount &lt; 20000</code></td><td>Бір реттік корпоративтік тапсырыс орташа чекті бұрмалайды.</td></tr>
</table>
<p>Алынып тасталған жолдарды санап, memo-ға жазыңыз: «таза деректе N тапсырыс, M жол алынды». Оқырман сіздің шешіміңізге сенуі үшін не алынғанын білуі керек.</p>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 20, prompt: '<code>clean</code> CTE-ін жазып, бір жолда <code>orders</code> (таза тапсырыстар саны) және <code>revenue</code> (олардың сомасы) шығарыңыз.', starter: 'WITH clean AS (\n  SELECT * FROM orders\n  WHERE \n)\nSELECT ', solution: `WITH clean AS (SELECT * FROM orders WHERE ${CLEAN}) SELECT COUNT(*) AS orders, SUM(amount) AS revenue FROM clean;`, check: { ordered: true, mustInclude: ['WITH'] }, hints: ['Үш шартты <code>AND</code> арқылы біріктіріңіз.'] }
        ]
      },
      {
        id: 'cap-4', title: 'Айлық метрикалар', minutes: 12,
        body: `
<p>Бизнестің «тамыр соғысы»: әр айда неше тапсырыс, қанша табыс, неше белсенді клиент және орташа чек.</p>
<p>Нәтижені line chart-қа салуға болады. Өсу мен құлдыраудың себебін кейін сегменттерден іздейміз.</p>
<div class="tip">Маусым — соңғы ай, бірақ дерек 30-шы маусымға дейін толық. Әр айдың толық екенін әрқашан тексеріңіз: толық емес соңғы ай «құлдырау» болып көрінеді.</div>
<h3>Айды қалай бөліп аламыз?</h3>
<p><code>order_date</code> мәтін түрінде сақталған (<code>2024-03-05</code>). Айды бөлу үшін алғашқы 7 таңбаны аламыз:</p>
<pre><code>SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders
FROM clean
GROUP BY month
ORDER BY month</code></pre>
<p><code>strftime('%Y-%m', order_date)</code> да дәл осы нәтижені береді.</p>
<h3>Төрт метриканың байланысы</h3>
<p>Табыс = тапсырыстар × орташа чек. Ал тапсырыстар = белсенді клиенттер × бір клиентке келетін тапсырыс. Табыс өзгерсе, қай көбейткіш өзгергенін қараңыз: жаңа клиенттер азайды ма, әлде олар сирек келе бастады ма, әлде чек кішірейді ме? Әр жауап бизнеске әртүрлі әрекет ұсынады.</p>
<div class="tip">Орташа чекті <code>AVG(amount)</code> емес, <code>SUM(amount) * 1.0 / COUNT(*)</code> ретінде де есептеуге болады. Екеуі бірдей нәтиже береді, бірақ екінші жазу формуланы көзбен тексеруге ыңғайлы.</div>`,
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
<p>Арна клиентке <code>customers</code> кестесі арқылы байланған, сондықтан <code>JOIN</code> керек.</p>
<h3>Сұрау қалай құрылады?</h3>
<p>Алдымен таза тапсырыстарды клиентпен байланыстырамыз, содан кейін арна бойынша топтаймыз:</p>
<pre><code>WITH clean AS (...)
SELECT c.channel,
       COUNT(DISTINCT o.customer_id) AS customers,
       COUNT(*) AS orders,
       SUM(o.amount) AS revenue
FROM clean o
JOIN customers c ON c.id = o.customer_id
GROUP BY c.channel</code></pre>
<p>Осыдан туынды көрсеткіштер шығады: <code>orders * 1.0 / customers</code> — жиілік, <code>revenue * 1.0 / orders</code> — орташа чек, <code>revenue * 1.0 / customers</code> — бір клиенттің құны.</p>
<h3>Нәтижені қалай оқу керек?</h3>
<p>Клиенті көп арна әрқашан ең жақсы арна емес. Егер бір арна аз клиент әкелсе, бірақ олар жиі қайта келсе, бір клиенттің құны жоғары болады. Директорға тек «кім көп» емес, «кім құнды» екенін көрсетіңіз.</p>
<div class="tip">Қала бойынша талдауда әр қаладағы клиент санын да көрсетіңіз. 5 клиенті бар қаланың орташа чегі бір адамның әсерінен қатты өзгереді.</div>`,
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
<p>Арна бойынша repeat rate әртүрлі болса, «арзан тартылған, бірақ бір рет келіп кететін» клиенттерді көреміз.</p>
<h3>Неге дәл «3 тапсырыс»?</h3>
<p>Шекті бизнес таңдайды. Кофехана үшін бір рет келу — кездейсоқ, екі рет — қызығушылық, үш рет — әдет. Басқа бизнесте шек басқа болады: пәтер жалдауда екінші келісімшарттың өзі жақсы нәтиже. Memo-да шекті неге таңдағаныңызды бір сөйлеммен түсіндіріңіз.</p>
<h3>SQLite-тағы кішкене айла</h3>
<p><code>n &gt;= 3</code> өрнегі 1 немесе 0 береді. Сондықтан <code>SUM(n &gt;= 3)</code> шартқа сай клиенттерді санайды, ал <code>* 100.0 / COUNT(*)</code> оны пайызға айналдырады. <code>100.0</code> деп жазу маңызды: <code>100</code> деп жазсаңыз, бүтін санға бөлу болып, ондық бөлігі жоғалуы мүмкін.</p>
<h3>Когорттық көзқарас</h3>
<p>Repeat rate-ке тіркелу уақыты да әсер етеді: маусымда тіркелген клиент үш рет келіп үлгермеуі мүмкін. Дәлірек талдауда клиенттерді тіркелу айы бойынша когорттарға бөліп, бірдей уақыт аралығын салыстырады. Бұл жобада қарапайым нұсқаны қолданамыз, бірақ осы шектеуді memo-ға жазыңыз.</p>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 30, prompt: 'Арна бойынша repeat rate: <code>channel</code>, <code>customers</code>, <code>repeat_rate</code> (≥ 3 таза тапсырысы бар клиенттер үлесі, %, бір ондық белгі). Кему ретімен.', starter: '', solution: `WITH clean AS (SELECT * FROM orders WHERE ${CLEAN}), per AS (SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id) SELECT c.channel, COUNT(*) AS customers, ROUND(SUM(p.n >= 3) * 100.0 / COUNT(*), 1) AS repeat_rate FROM per p JOIN customers c ON c.id = p.customer_id GROUP BY c.channel ORDER BY repeat_rate DESC;`, check: { ordered: true, mustInclude: ['WITH'] }, hints: ['Екі CTE: <code>clean</code> және <code>per</code>.', '<code>ROUND(SUM(p.n &gt;= 3) * 100.0 / COUNT(*), 1)</code>'] }
        ]
      },
      {
        id: 'cap-7', title: 'Жарнама тиімділігі Python-да', minutes: 14,
        body: `
<p>SQL нәтижелерін Python-ға алып, жарнама шығынымен салыстырамыз. <b>ROAS</b> (return on ad spend) = арна табысы / арна шығыны.</p>
<pre><code>spend = {"instagram": 300000, "2gis": 150000, "referral": 40000}</code></pre>
<p>ROAS 1-ден төмен болса, арна жарнамаға жұмсалғаннан аз табыс әкелген (маржаны есептемегенде де).</p>
<h3>Python-да қалай есептейміз?</h3>
<pre><code>revenue = {"instagram": 124050, "2gis": 133900, "referral": 76900}   # таза табыс, 5-сабақтағы сұраудан
spend = {"instagram": 300000, "2gis": 150000, "referral": 40000}
for ch in spend:
    print(ch, round(revenue[ch] / spend[ch], 2))</code></pre>
<p>Нәтиже: referral 1.92, 2GIS 0.89, Instagram 0.41. Яғни тек referral жарнама шығынын ақтады. Бірақ сандарды салыстырғанда олардың артында не тұрғанын ұмытпаңыз.</p>
<h3>ROAS шектеулері</h3>
<ul>
<li><b>Маржа</b>: ROAS табысты есептейді, пайданы емес. Кофенің өзіндік құны 60% болса, ROAS 1.5-тің өзі шығын болуы мүмкін.</li>
<li><b>Атрибуция</b>: клиент Instagram-нан білген, бірақ досының сілтемесімен тіркелуі мүмкін. Онда оны referral-ға жатқызамыз.</li>
<li><b>Масштаб</b>: шағын арнаның ROAS-ы жоғары болуы мүмкін, бірақ бюджетті көбейткенде тиімділігі әдетте төмендейді.</li>
</ul>
<div class="tip">Сөздікті сұрыптау үшін <code>sorted(d.items(), key=lambda x: x[1], reverse=True)</code> үлгісін қолданыңыз.</div>`,
        exercises: [
          { type: 'python', xp: 30, prompt: '<code>roas_ranking(revenue, spend)</code> функциясын жазыңыз: әр арна үшін <code>(арна, roas)</code> жұптарын ROAS бойынша кему ретімен тізім ретінде қайтарсын. ROAS екі ондық белгіге дейін <code>round</code> жасалсын.', starter: 'def roas_ranking(revenue, spend):\n    pass\n', solution: 'def roas_ranking(revenue, spend):\n    pairs = [(ch, round(revenue[ch] / spend[ch], 2)) for ch in spend]\n    return sorted(pairs, key=lambda p: p[1], reverse=True)', check: { tests: '_rev = {"instagram": 124050, "2gis": 133900, "referral": 76900}\n_sp = {"instagram": 300000, "2gis": 150000, "referral": 40000}\n_r = roas_ranking(_rev, _sp)\nassert _r == [("referral", 1.92), ("2gis", 0.89), ("instagram", 0.41)], f"Күтілгені [(\'referral\', 1.92), (\'2gis\', 0.89), (\'instagram\', 0.41)], сізде {_r}"' }, hints: ['<code>round(revenue[ch] / spend[ch], 2)</code>', '<code>sorted(..., key=lambda p: p[1], reverse=True)</code>'] },
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
</ul>
<h3>Жақсы memo-ның белгілері</h3>
<p>Төмендегі сандар осы жобаның сұрауларынан алынған. Өз memo-ңызда да әр санды өз сұрауыңызбен тексеріңіз.</p>
<ul>
<li>Бірінші сөйлем сұраққа жауап береді: «Бюджеттің бір бөлігін Instagram-нан referral-ға көшіруді ұсынамыз».</li>
<li>Әр тұжырымның жанында сан бар: «referral клиенттерінің 87.5%-ы кемінде 3 рет сатып алды, Instagram-да 62.5%; ROAS 1.92 және 0.41».</li>
<li>Ұсыныс тексерілетін эксперимент түрінде: «бір ай бойы referral бюджетін екі есе көбейтіп, жаңа клиенттер санын өлшейміз».</li>
<li>Шектеулер жасырылмайды. Олар сіздің біліктілігіңізді көрсетеді.</li>
</ul>
<h3>Жиі кездесетін қателер</h3>
<p>Memo-ны талдау барысының күнделігі ретінде жазу («алдымен profiling жасадым, сосын…») — оқырманға процесс емес, нәтиже керек. Тым көп график қосу — бір негізгі кесте немесе бір график жеткілікті. Ұсыныссыз аяқтау — директор «ал не істейміз?» деп қайта сұрайды.</p>`,
        exercises: [
          { type: 'quiz', xp: 15, prompt: 'Memo-ның бірінші абзацы ретінде қайсысы ең жақсы?', options: ['«Мен 150 тапсырысты SQL-мен талдадым.»', '«Referral клиенттері жиірек қайта келеді және әр жарнама теңгесіне ең көп табыс әкеледі (ROAS 1.92), ал Instagram жарнамасы шығынын ақтамайды (ROAS 0.41). Instagram бюджетінің бір бөлігін referral-ға ауыстырып, бір тоқсан бойы нәтижені өлшеуді ұсынамыз.»', '«Деректе қызықты нәрселер көп.»', '«Instagram жаман.»'], answer: 1, explain: 'Нәтиже, дәлел және әрекет бір абзацта. (Нақты сандарыңыз сұрауларыңыздың нәтижесіне сай болуы керек.)' },
          { type: 'rubric', xp: 40, minWords: 60, done: 'Memo-ны портфолио README-іне салыңыз.', prompt: 'Өз memo-ңызды жазыңыз (кемінде 60 сөз), сосын оны төрт критерий бойынша адал бағалаңыз. Өту үшін әр критерий кемінде <b>3 / 4</b> болуы керек. Бұл жұмыс беруші жобаңызды қалай бағалайтынымен бірдей.', criteria: [
            { name: 'Бизнес сұраққа жауап', levels: ['Сұраққа жауап жоқ', 'Жауап бар, бірақ соңында немесе бұлыңғыр', 'Бірінші абзацта нақты жауап бар', 'Бірінші сөйлемде жауап, сан және ұсыныс бар'] },
            { name: 'Дәлелдер мен сандар', levels: ['Сандар жоқ', 'Бір-екі сан, тексерілмеген', 'Негізгі тұжырымдар сандармен расталған', 'Әр тұжырымда сұрауыңыздан алынған сан бар (табыс, repeat rate, ROAS)'] },
            { name: 'Тазалау және шектеулер', levels: ['Айтылмаған', 'Тек «деректерді тазаладым»', 'Ережелер аталған (NULL, refund, 48 000 ₸)', 'Ережелер, олардың нәтижеге әсері және деректің шектеулері айтылған'] },
            { name: 'Ұсыныс және келесі қадам', levels: ['Ұсыныс жоқ', 'Жалпы ұсыныс («жарнаманы жақсарту»)', 'Нақты әрекет (бюджетті қайта бөлу)', 'Нақты әрекет, мерзім және нәтижені қалай өлшеу (эксперимент)'] }
          ] },
          { type: 'quiz', xp: 10, prompt: 'Портфолио жобасының README файлы неден басталуы керек?', options: ['Кітапханалар тізімінен', 'Бизнес сұрақ пен негізгі нәтижеден', 'Автордың өмірбаянынан', 'SQL кодынан'], answer: 1, explain: 'Оқырман алдымен «не таптың?» деп сұрайды.' }
        ]
      },
      {
        id: 'cap-ai', title: 'AI көмекшімен талдау: сұрау жазғызу және тексеру', minutes: 15,
        body: `
<p>Вакансиялардың едәуір бөлігі енді «ИИ-құралдарын қолдана білу» деп жазады. Бұл «AI менің орныма жұмыс істейді» дегенді білдірмейді. Талап басқа: <b>AI-дан жылдам жоба алып, оны аналитик ретінде тексере білу</b>.</p>
<h3>Жақсы сұрау (промпт) қалай жазылады</h3>
<ol>
<li><b>Схеманы беріңіз:</b> кестелер мен бағандардың аты, түрі, байланыстары. Онсыз AI бағандарды ойдан шығарады.</li>
<li><b>Базаны атаңыз:</b> PostgreSQL, ClickHouse немесе SQLite. Күн функциялары әртүрлі.</li>
<li><b>Сұрақты нақты жазыңыз:</b> «табыс» емес, «delivered тапсырыстардың quantity × unit_price қосындысы, 2026 жыл, қала бойынша».</li>
<li><b>Нәтиженің пішінін айтыңыз:</b> қай бағандар, қандай реттілік.</li>
</ol>
<pre><code>Схема (SQLite): orders(order_id, customer_id, order_date, status),
order_items(order_id, product_id, quantity, unit_price), customers(customer_id, city).
Сұрақ: 2026 жылы әр қаладағы delivered тапсырыстар саны мен түсімі.
Бағандар: city, orders_cnt, revenue. Түсім бойынша кему ретімен.</code></pre>
<h3>AI жауабын қалай тексеру керек</h3>
<ul>
<li><b>Жол санын тексеріңіз.</b> JOIN-нан кейін тапсырыс саны өсіп кетпеді ме? AI жиі <code>COUNT(*)</code> жазады, ал керегі <code>COUNT(DISTINCT order_id)</code>.</li>
<li><b>Бір санды қолмен тексеріңіз.</b> Бір қаланың немесе бір айдың нәтижесін бөлек қарапайым сұраумен есептеп, салыстырыңыз.</li>
<li><b>Сүзгілерді оқыңыз.</b> Статус, күн аралығы, NULL дұрыс өңделді ме?</li>
<li><b>Ақылға қонымды ма?</b> Конверсия 140% немесе теріс түсім шықса, сұрауда қате бар.</li>
</ul>
<h3>Құпиялылық</h3>
<p>Клиенттердің аты-жөні, телефоны, email-і сияқты жеке деректерді сыртқы AI сервисіне жібермеңіз. Схеманы және жасанды мысал жолдарды жіберсеңіз жеткілікті. Компанияның ішкі ережесін алдын ала біліп алыңыз.</p>
<div class="tip">Сұхбатта «AI-ды қалай қолданасыз?» деп сұраса, үш нәрсені айтыңыз: жоба сұрауды тездету үшін, тексерудің нақты тәсілдері және жеке деректерді қорғау.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'AI-ға SQL сұрау жазғызғанда ең бірінші не беру керек?', options: ['Тек сұрақтың өзін', 'Кестелер мен бағандардың схемасын және база түрін', 'Клиенттердің толық тізімін', 'Ештеңе, AI өзі біледі'], answer: 1, explain: 'Схемасыз AI бағандардың атын ойдан шығарады, ал база түрін білмесе, күн функцияларын шатастырады.' },
          { type: 'quiz', xp: 10, prompt: 'AI берген сұрау тапсырыс санын күткеннен 1,7 есе көп көрсетті. Ең ықтимал себеп?', options: ['База қате', 'JOIN-нан кейін COUNT(*) жазылған, бір тапсырыстың әр тауары бөлек саналған', 'ORDER BY жоқ', 'AI ешқашан қателеспейді'], answer: 1, explain: 'orders пен order_items біріктірілгенде тапсырыс тауар санынша қайталанады. COUNT(DISTINCT o.order_id) керек.' },
          { type: 'quiz', xp: 10, prompt: 'Қайсысын сыртқы AI сервисіне жіберуге болмайды?', options: ['Кестелердің схемасы', 'Жасанды мысал жолдар', 'Клиенттердің аты-жөні мен телефондары бар экспорт', 'Сұрақтың мәтіні'], answer: 2, explain: 'Жеке деректер компанияның ішінде қалуы керек. AI-ға құрылым мен мысал жеткілікті.' },
          { type: 'sql', dataset: 'qazaq', xp: 30, prompt: '<b>qazaq.</b> AI мына сұрауды берді: «әр қаладағы delivered тапсырыстар саны мен түсімі». Бірақ <code>orders_cnt</code> тым үлкен шығып тұр. Қатені түзетіңіз. Бағандар: <code>city</code>, <code>orders_cnt</code>, <code>revenue</code>, реті түсім бойынша кемуімен.', starter: "SELECT c.city,\n       COUNT(*) AS orders_cnt,\n       SUM(oi.quantity * oi.unit_price) AS revenue\nFROM orders o\nJOIN customers c ON c.customer_id = o.customer_id\nJOIN order_items oi ON oi.order_id = o.order_id\nWHERE o.status = 'delivered'\nGROUP BY c.city\nORDER BY revenue DESC;", solution: "SELECT c.city, COUNT(DISTINCT o.order_id) AS orders_cnt, SUM(oi.quantity * oi.unit_price) AS revenue FROM orders o JOIN customers c ON c.customer_id = o.customer_id JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' GROUP BY c.city ORDER BY revenue DESC;", check: { ordered: true }, hints: ['Түсім дұрыс. Қате тапсырыс санында: JOIN-нан кейін бір тапсырыс бірнеше жол болады.', '<code>COUNT(DISTINCT o.order_id)</code>'] }
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
<div class="tip">Live coding кезінде ойыңызды дауыстап айтыңыз: интервьюер дұрыс жауаптан бөлек, ойлау жолыңызды бағалайды.</div>
<h3>«Екінші тапсырыс» үлгісі</h3>
<p>Сұхбатта жиі сұралатын тапсырма. Window function-мен шешіледі:</p>
<pre><code>SELECT customer_id, order_date AS second_order
FROM (
  SELECT customer_id, order_date,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id) AS rn
  FROM orders
)
WHERE rn = 2</code></pre>
<p><code>ORDER BY</code> ішіне <code>id</code> қосу бір күнде екі тапсырыс болса да нәтижені тұрақты етеді.</p>
<h3>«Ешқашан жасамаған» үлгісі</h3>
<p>Белгілі кезеңде әрекет жасамаған клиенттерді табу үшін <code>NOT EXISTS</code> немесе <code>LEFT JOIN ... WHERE o.id IS NULL</code> қолданылады. <code>NOT IN</code> ішкі сұрауда NULL болса, күтпеген бос нәтиже береді, сондықтан сұхбатта <code>NOT EXISTS</code> таңдаған қауіпсіз.</p>
<h3>STAR жауабының мысалы</h3>
<p><b>S</b>: кофехана желісі жарнама бюджетін қайта бөлгісі келді. <b>T</b>: қай арнаның тиімді екенін анықтау. <b>A</b>: тапсырыстарды тазалап, арна бойынша retention мен ROAS есептедім. <b>R</b>: бюджеттің 20%-ын referral-ға көшіріп, тексеру экспериментін ұсындым.</p>`,
        exercises: [
          { type: 'sql', dataset: 'cafe', xp: 25, prompt: 'Әр клиенттің <b>екінші</b> тапсырысының күнін шығарыңыз (кез келген статус): <code>customer_id</code>, <code>second_order</code>. Тек кемінде екі тапсырысы барлар.', starter: '', solution: 'SELECT customer_id, order_date AS second_order FROM (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id) AS rn FROM orders) WHERE rn = 2;', check: { mustInclude: ['OVER'] }, hints: ['<code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id)</code>, сыртында <code>rn = 2</code>.'] },
          { type: 'sql', dataset: 'cafe', xp: 25, prompt: 'Сәуірден бастап (<code>2024-04-01</code> және одан кейін) бірде-бір тапсырыс бермеген клиенттер: <code>id</code>, <code>city</code>, <code>channel</code>.', starter: '', solution: "SELECT c.id, c.city, c.channel FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.order_date >= '2024-04-01');", hints: ['<code>WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.order_date &gt;= ...)</code> немесе <code>LEFT JOIN ... IS NULL</code>.'] },
          { type: 'quiz', xp: 10, prompt: 'Интервьюер: «Кеше тапсырыстар 30% түсті. Не істейсіз?» Ең жақсы бірінші қадам?', options: ['Бірден маркетингті кінәлау', 'Деректің өзін тексеру (жүктеу қатесі, толық емес күн), сосын қала/арна/платформа бойынша жіктеп, құлдыраудың қайда екенін табу', 'Модель құру', 'Күте тұру'], answer: 1, explain: 'Алдымен дерек дұрыс па, сосын «қайда» деген сұрақ, содан кейін ғана «неге».' }
        ]
      },
      {
        id: 'cap-10', title: 'Тапсырма-жоба (take-home): Qazaq Market', minutes: 90,
        body: `
<p>Қазақстандағы аналитик вакансияларының көбінде сұхбат алдында <b>take-home тапсырма</b> беріледі: дерек, бір-екі сөйлемдік бизнес сұрақ және 2–3 күн уақыт. Бұл сабақ — сондай тапсырманың жаттығуы. Алдыңғы сабақтардағыдай қадамдап жетелеу жоқ: сұрақ бар, дерек бар, қалғаны өзіңізден.</p>
<h3>Бриф</h3>
<div class="tip"><b>Кімнен:</b> Qazaq Market операциялық директоры<br>
<b>Тақырып:</b> 2-тоқсандағы түсім<br>
Сәлем! 2026 жылдың 2-тоқсанында жеткізілген тапсырыстардан түскен түсім 1-тоқсаннан шамамен екі есе аз. Маркетинг «маусымдылық» дейді, сатылым бөлімі «бас тартулар көбейді» дейді. Деректен қарап, не болғанын және не істеу керегін жарты бетке жазып берші. Жұма күнгі жиналысқа керек.</div>
<p><b>Дерек:</b> <code>qazaq</code> базасы (<code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>). Кезең: 2026-01-01 мен 2026-06-30 аралығы. Түсім = <code>delivered</code> тапсырыстардың <code>quantity * unit_price</code> сомасы. 1-тоқсан: қаңтар–наурыз, 2-тоқсан: сәуір–маусым.</p>
<h3>Уақытты бөлу (90 минут)</h3>
<table>
<tr><th>Уақыт</th><th>Не істейсіз</th></tr>
<tr><td>10 мин</td><td>Брифті оқып, сұрақты өз сөзіңізбен жазу. Гипотезалар: тапсырыс саны азайды ма, чек кішірейді ме, жоғалту көбейді ме?</td></tr>
<tr><td>10 мин</td><td>Деректі тексеру: кезең толық па, статустар қандай, жол саны</td></tr>
<tr><td>45 мин</td><td>Төрт сұрау (төмендегі тапсырмалар). Әрқайсысынан бір сөйлемдік бақылау жазып отырыңыз</td></tr>
<tr><td>25 мин</td><td>Memo жазу және өзін-өзі тексеру</td></tr>
</table>
<h3>Түсімді жіктеу</h3>
<p>Түсім = тапсырыс саны × орташа чек. Сондықтан бірінші сұрау осы екеуін бөліп көрсетуі керек. Сосын «қайда?» деген сұрақ: қай санатта, қай клиенттерде. Маркетинг пен сатылымның әр гипотезасын жеке санмен растаңыз немесе жоққа шығарыңыз. «Тексердім, расталмады» деген де — нәтиже.</p>
<h3>Жұмыс беруші нені бағалайды</h3>
<ul>
<li><b>Дұрыстық</b>: сандар қайта есептегенде сәйкес келе ме, JOIN жолдарды көбейтіп жібермеген бе.</li>
<li><b>Ойлау құрылымы</b>: метриканы жіктеу, гипотезаларды кезекпен тексеру.</li>
<li><b>Қорытынды</b>: бірінші абзацта жауап пен ұсыныс бар ма.</li>
<li><b>Адалдық</b>: болжамдар мен шектеулер жазылған ба.</li>
<li><b>Ұқыптылық</b>: SQL оқылады, файлдар реттелген, README бар.</li>
</ul>
<h3>Жиі қателер</h3>
<ul>
<li>Сұралмаған нәрсеге уақыт жұмсау: ML модель, 15 диаграмма. Брифтегі сұраққа жауап беріңіз.</li>
<li>Тек «не болғанын» жазып, «не істеу керегін» ұмыту.</li>
<li>Бір гипотезаға жабысу: «бас тартулар көбейді» дегенді тексермей қабылдау немесе тексермей жоққа шығару.</li>
<li>Соңғы айдың толық емес болуын ескермеу: мұнда соңғы тапсырыс 24 маусымда. Шектеулерге жазыңыз.</li>
<li>Мерзімнен кеш тапсыру. Жартылай, бірақ уақытында және адал шектеулермен берілген жұмыс артық.</li>
</ul>
<div class="tip">Нақты take-home-да сұрауларды <code>sql/</code> папкасына, memo-ны <code>README.md</code>-ге салып, GitHub сілтемесін жіберіңіз. Бұл жаттығуды да солай рәсімдесеңіз, портфолиоңызда екінші жоба пайда болады.</div>`,
        exercises: [
          { type: 'sql', dataset: 'qazaq', xp: 30, prompt: "<b>1-сұрау: тапсырыс саны ма, чек пе?</b> 2026 жылғы әр ай үшін жеткізілген тапсырыстар бойынша: <code>month</code> ('YYYY-MM'), <code>orders</code> (тапсырыс саны), <code>revenue</code>, <code>aov</code> (орташа чек, бүтінге дейін <code>ROUND</code>). Ай бойынша сұрыптаңыз.", starter: '', solution: "SELECT strftime('%Y-%m', o.order_date) AS month, COUNT(DISTINCT o.order_id) AS orders, SUM(oi.quantity * oi.unit_price) AS revenue, ROUND(SUM(oi.quantity * oi.unit_price) * 1.0 / COUNT(DISTINCT o.order_id)) AS aov FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered' AND o.order_date >= '2026-01-01' GROUP BY month ORDER BY month;", check: { ordered: true }, hints: ['Орташа чек = түсім / тапсырыс саны. JOIN-нан кейін тапсырыстар <code>COUNT(DISTINCT o.order_id)</code> арқылы саналады.'] },
          { type: 'sql', dataset: 'qazaq', xp: 35, prompt: '<b>2-сұрау: қай санатта?</b> Жеткізілген тапсырыстар бойынша әр санаттың 1-тоқсандағы (қаңтар–наурыз 2026) және 2-тоқсандағы (сәуір–маусым 2026) түсімін салыстырыңыз: <code>category</code>, <code>q1_revenue</code>, <code>q2_revenue</code>, <code>change_pct</code> ((q2 − q1) / q1, %, 1 таңба). <code>change_pct</code> бойынша өсу ретімен (ең қатты құлағаны бірінші).', starter: '', solution: "WITH c AS (SELECT p.category, SUM(CASE WHEN o.order_date < '2026-04-01' THEN oi.quantity * oi.unit_price ELSE 0 END) AS q1_revenue, SUM(CASE WHEN o.order_date >= '2026-04-01' THEN oi.quantity * oi.unit_price ELSE 0 END) AS q2_revenue FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE o.status = 'delivered' AND o.order_date >= '2026-01-01' AND o.order_date < '2026-07-01' GROUP BY p.category) SELECT category, q1_revenue, q2_revenue, ROUND(100.0 * (q2_revenue - q1_revenue) / q1_revenue, 1) AS change_pct FROM c ORDER BY change_pct;", check: { ordered: true }, hints: ["Екі тоқсанды бір сұрауда алу үшін шартты қосынды: <code>SUM(CASE WHEN o.order_date &lt; '2026-04-01' THEN ... ELSE 0 END)</code>."] },
          { type: 'sql', dataset: 'qazaq', xp: 35, prompt: '<b>3-сұрау: бас тартулар көбейді ме?</b> 2026 жылғы әр ай үшін барлық статустағы тапсырыстар бойынша: <code>month</code>, <code>orders</code> (барлық тапсырыс саны), <code>lost_orders</code> (cancelled немесе returned), <code>lost_pct</code> (жоғалған тапсырыстар сомасының барлық тапсырыс сомасындағы үлесі, %, 1 таңба). Ай бойынша сұрыптаңыз.', starter: '', solution: "WITH t AS (SELECT o.order_id, o.status, strftime('%Y-%m', o.order_date) AS month, SUM(oi.quantity * oi.unit_price) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.order_date >= '2026-01-01' GROUP BY o.order_id, o.status, month) SELECT month, COUNT(*) AS orders, SUM(CASE WHEN status <> 'delivered' THEN 1 ELSE 0 END) AS lost_orders, ROUND(100.0 * SUM(CASE WHEN status <> 'delivered' THEN total ELSE 0 END) / SUM(total), 1) AS lost_pct FROM t GROUP BY month ORDER BY month;", check: { ordered: true }, hints: ['Алдымен CTE-де әр тапсырыстың сомасын есептеп, түйіршікті «бір тапсырыс = бір жол» етіңіз. Сосын ай бойынша топтаңыз.'] },
          { type: 'sql', dataset: 'qazaq', xp: 35, prompt: '<b>4-сұрау: жаңа ма, бұрынғы ма?</b> 2026 жылы жеткізілген тапсырысы бар клиенттерді екі сегментке бөліңіз: <code>new</code> (алғашқы жеткізілген тапсырысы 2026 жылы) және <code>returning</code> (алғашқысы 2025 жылы). Бағандар: <code>segment</code>, <code>customers</code>, <code>revenue</code> (2026 жылғы түсім).', starter: '', solution: "WITH d AS (SELECT o.customer_id, o.order_date, oi.quantity * oi.unit_price AS amt FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE o.status = 'delivered'), f AS (SELECT customer_id, MIN(order_date) AS first_date FROM d GROUP BY customer_id) SELECT CASE WHEN f.first_date >= '2026-01-01' THEN 'new' ELSE 'returning' END AS segment, COUNT(DISTINCT d.customer_id) AS customers, SUM(d.amt) AS revenue FROM d JOIN f ON f.customer_id = d.customer_id WHERE d.order_date >= '2026-01-01' GROUP BY segment;", hints: ['Клиенттің алғашқы жеткізілген тапсырысының күнін <b>барлық</b> кезең бойынша табыңыз (2026 жылмен шектемей), сосын 2026 жылғы түсімге жалғаңыз.'] },
          { type: 'rubric', xp: 50, minWords: 80, done: 'Сұраулар мен memo-ны GitHub-қа салып, сілтемесін резюмеңізге қосыңыз.', prompt: 'Операциялық директорға memo жазыңыз (кемінде 80 сөз): 2-тоқсанда түсім неге төмендеді және не істеу керек? Төрт сұраудың сандарына сүйеніңіз, екі гипотезаның («маусымдылық», «бас тартулар») әрқайсысына жауап беріңіз. Сосын жұмысыңызды жұмыс берушінің көзімен адал бағалаңыз. Өту үшін әр критерий кемінде <b>3 / 4</b>.', criteria: [
            { name: 'Сұраққа жауап', levels: ['Жауап жоқ немесе тек процесс сипатталған', 'Жауап бар, бірақ соңғы абзацта немесе бұлыңғыр', 'Бірінші абзацта негізгі себеп аталған', 'Бірінші сөйлемде себеп, оның көлемі (сан) және ұсыныс бар'] },
            { name: 'Дәлел және жіктеу', levels: ['Сандар жоқ', 'Жалпы түсім ғана келтірілген', 'Түсім тапсырыс саны мен орташа чекке жіктелген, санаттар салыстырылған', 'Жіктеу, санаттар, жоғалту үлесі және жаңа/бұрынғы клиенттер: әр тұжырым өз сұрауымның санымен расталған'] },
            { name: 'Гипотезаларды тексеру', levels: ['Гипотезалар аталмаған', 'Біреуі ғана қаралған', 'Екеуі де қаралып, деректе расталғаны не расталмағаны айтылған', 'Екеуі де санмен тексерілген, деректің шегі көрсетілген (мысалы, маусымдылыққа былтырғы осы кезеңмен салыстыру қажет)'] },
            { name: 'Ұсыныс және шектеулер', levels: ['Ұсыныс жоқ', 'Жалпы сөз («сатылымды арттыру керек»)', 'Нақты әрекет және шектеулер аталған', 'Нақты әрекет, жауапты бөлім, нәтижені өлшеу тәсілі; шектеулер (толық емес маусым, маржа белгісіз) жазылған'] }
          ] }
        ]
      },
      {
        id: 'cap-gate', gate: true, title: 'Қорытынды емтихан: Junior Data Analyst', minutes: 30,
        body: `
<p>Data Analyst жолының соңғы тексерісі. Дерекқор: <code>cafe</code>. Тазалау ережесі: <code>${CLEAN_HTML}</code>.</p>`,
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
