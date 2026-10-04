// M1.1 Spreadsheets. Formula exercises (type 'sheet') are evaluated by js/sheet.js on DJ.sheets grids.
DJ.modules['m1-1'] = {
  intro: 'Excel мен Google Sheets — кез келген аналитиктің бірінші құралы. Бұл модульде формулаларды, сілтемелерді, шартты агрегаттарды (SUMIFS), іздеу функцияларын (XLOOKUP), мәтінді тазалауды және жиынтық кестені (pivot table) үйренесіз. Тапсырмалар кіріктірілген кесте тренажерінде орындалады: формуланы жазасыз, ол бірден есептеліп тексеріледі. Ағылшынша (SUM) да, орысша (СУММ) да атаулар жұмыс істейді, бөлгіш ретінде үтір де, нүктелі үтір де болады.',
  lessons: [
    {
      id: 'ss-1', title: 'Ұяшық, формула және сілтеме', minutes: 12,
      body: `
<p>Кесте бағандардан (<b>A, B, C…</b>) және жолдардан (<b>1, 2, 3…</b>) тұрады. Әр ұяшықтың адресі бар: <code>C2</code> — C бағаны, 2-жол. Ауқым (range): <code>H2:H25</code> — H2-ден H25-ке дейінгі ұяшықтар.</p>
<p>Формула әрқашан <code>=</code> белгісінен басталады:</p>
<pre><code>=F2*G2          саны × бағасы
=H2*0.12        12% ҚҚС
=(G2-650)/G2    маржа үлесі</code></pre>
<h3>Салыстырмалы және абсолютті сілтеме</h3>
<p>Формуланы төмен көшірсеңіз (fill down), <code>=F2*G2</code> келесі жолда <code>=F3*G3</code> болады: сілтемелер <b>салыстырмалы</b>. Ұяшық өзгермеуі керек болса, <code>$</code> қойылады: <code>=H2/$H$26</code>. Ол <b>абсолютті</b> сілтеме.</p>
<table>
<tr><th>Жазылуы</th><th>Көшіргенде</th></tr>
<tr><td><code>A1</code></td><td>баған да, жол да өзгереді</td></tr>
<tr><td><code>$A$1</code></td><td>ештеңе өзгермейді</td></tr>
<tr><td><code>A$1</code></td><td>тек жол бекітілген</td></tr>
<tr><td><code>$A1</code></td><td>тек баған бекітілген</td></tr>
</table>
<div class="tip">Excel-де <kbd>F4</kbd> пернесі сілтеме түрін ауыстырады. Санды формулаға қолмен жазбаңыз: деректер өзгергенде формула ескіреді. Тренажер мұны тексереді.</div>`,
      exercises: [
        { type: 'sheet', sheet: 'sales', cell: 'H2', xp: 10, prompt: '«Сатылым» парағында H бағаны (Сома) — саны × бағасы. H2 ұяшығының формуласын жазыңыз.', solution: '=F2*G2', hints: ['Саны F бағанында, бағасы G бағанында.'] },
        { type: 'sheet', sheet: 'sales', cell: 'I2', xp: 10, prompt: 'Бірінші тапсырыстың (2-жол) сомасынан 12% ҚҚС есептеңіз.', solution: '=H2*0.12', hints: ['12% = 0.12 (немесе <code>12%</code> деп жазуға болады).'] },
        { type: 'quiz', xp: 10, prompt: 'I2 ұяшығында <code>=H2/$H$26</code>. Оны I3-ке көшірсек, формула қандай болады?', options: ['=H2/$H$26', '=H3/$H$26', '=H3/$H$27', '=H3/H27'], answer: 1, explain: 'H2 салыстырмалы, сондықтан H3 болады. $H$26 абсолютті, өзгермейді.' }
      ]
    },
    {
      id: 'ss-2', title: 'Негізгі функциялар: SUM, AVERAGE, COUNT', minutes: 12,
      body: `
<table>
<tr><th>Функция</th><th>Не істейді</th><th>Орысша</th></tr>
<tr><td><code>SUM(H2:H25)</code></td><td>қосынды</td><td>СУММ</td></tr>
<tr><td><code>AVERAGE(H2:H25)</code></td><td>орташа</td><td>СРЗНАЧ</td></tr>
<tr><td><code>COUNT(H2:H25)</code></td><td>сандар бар ұяшықтар саны</td><td>СЧЁТ</td></tr>
<tr><td><code>COUNTA(C2:C25)</code></td><td>бос емес ұяшықтар саны</td><td>СЧЁТЗ</td></tr>
<tr><td><code>MIN</code>, <code>MAX</code>, <code>MEDIAN</code></td><td>ең кіші, ең үлкен, медиана</td><td>МИН, МАКС, МЕДИАНА</td></tr>
<tr><td><code>ROUND(x, 0)</code></td><td>дөңгелектеу</td><td>ОКРУГЛ</td></tr>
</table>
<p>Функцияларды бір-бірінің ішіне салуға болады: <code>=ROUND(AVERAGE(H2:H25), 0)</code>.</p>
<p>Бұл SQL-ден таныс: <code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code>.</p>`,
      exercises: [
        { type: 'sheet', sheet: 'sales', xp: 10, prompt: 'Барлық тапсырыстардың жалпы сомасын есептеңіз.', solution: '=SUM(H2:H25)', check: { fns: ['SUM'] }, hints: ['Сома H бағанында, 2-ден 25-жолға дейін.'] },
        { type: 'sheet', sheet: 'sales', xp: 15, prompt: 'Орташа чекті (тапсырыс сомасының орташасы) бүтін санға дейін дөңгелектеп есептеңіз.', solution: '=ROUND(AVERAGE(H2:H25),0)', check: { fns: ['AVERAGE', 'ROUND'] }, hints: ['<code>=ROUND(AVERAGE(...), 0)</code>'] },
        { type: 'sheet', sheet: 'sales', xp: 10, prompt: 'Бір тапсырыстағы ең үлкен тауар санын табыңыз.', solution: '=MAX(F2:F25)', check: { fns: ['MAX'] } }
      ]
    },
    {
      id: 'ss-3', title: 'Шарттар: IF, AND, OR', minutes: 12,
      body: `
<pre><code>=IF(шарт, ақиқат болса, жалған болса)
=IF(H2&gt;=2500, "Үлкен", "Кіші")
=IF(AND(C2="Алматы", F2&gt;=3), "Иә", "Жоқ")
=IF(OR(D2="instagram", D2="2gis"), "Жарнама", "Ұсыныс")</code></pre>
<p>Мәтін әрқашан қос тырнақшада жазылады. Салыстыру операторлары: <code>=</code>, <code>&lt;&gt;</code> (тең емес), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
<p>Көп деңгейлі шарт үшін <code>IFS</code> немесе IF ішіне IF салынады:</p>
<pre><code>=IFS(H2&gt;=4000, "A", H2&gt;=2000, "B", TRUE, "C")</code></pre>
<div class="tip">SQL-дегі баламасы — <code>CASE WHEN ... THEN ... ELSE ... END</code>.</div>`,
      exercises: [
        { type: 'sheet', sheet: 'sales', cell: 'I2', xp: 15, prompt: '2-жолдағы тапсырыс сомасы 2500 немесе одан көп болса <code>"Үлкен"</code>, әйтпесе <code>"Кіші"</code> деп шығарыңыз.', solution: '=IF(H2>=2500,"Үлкен","Кіші")', check: { fns: ['IF'] }, hints: ['<code>=IF(H2&gt;=2500, "Үлкен", "Кіші")</code> түрінде.'] },
        { type: 'sheet', sheet: 'sales', cell: 'I4', xp: 20, prompt: '4-жолдағы тапсырыс Шымкенттен болса <b>және</b> саны кемінде 3 болса <code>"Иә"</code>, әйтпесе <code>"Жоқ"</code> шығарыңыз.', solution: '=IF(AND(C4="Шымкент",F4>=3),"Иә","Жоқ")', check: { fns: ['IF', 'AND'] }, hints: ['<code>AND(C4="Шымкент", F4&gt;=3)</code>'] }
      ]
    },
    {
      id: 'ss-4', title: 'Шартты агрегат: COUNTIF, SUMIFS', minutes: 15,
      body: `
<p>Аналитиктің күнделікті жұмысы: «Шымкенттен қанша тапсырыс?», «instagram қанша табыс әкелді?»</p>
<pre><code>=COUNTIF(C2:C25, "Шымкент")                       қала бойынша саны
=SUMIF(D2:D25, "instagram", H2:H25)               арна бойынша сома
=SUMIFS(H2:H25, C2:C25, "Астана", E2:E25, "Латте") бірнеше шарт
=AVERAGEIF(C2:C25, "Алматы", H2:H25)              шарт бойынша орташа
=COUNTIFS(F2:F25, "&gt;=3", C2:C25, "Шымкент")</code></pre>
<p>Ретіне назар аударыңыз: <code>SUMIF(шарт ауқымы, шарт, сома ауқымы)</code>, бірақ <code>SUMIFS(сома ауқымы, шарт ауқымы1, шарт1, ...)</code>.</p>
<p>Шарттың түрлері: <code>"Шымкент"</code>, <code>"&gt;=3"</code>, <code>"&lt;&gt;instagram"</code> (тең емес), <code>"Лат*"</code> (Лат-тан басталатын).</p>
<div class="tip">SQL баламасы: <code>SELECT SUM(amount) FROM t WHERE city = 'Астана' AND product = 'Латте'</code>.</div>`,
      exercises: [
        { type: 'sheet', sheet: 'sales', xp: 15, prompt: 'Шымкенттен неше тапсырыс түскенін есептеңіз.', solution: '=COUNTIF(C2:C25,"Шымкент")', check: { fns: ['COUNTIF'] }, hints: ['Қала C бағанында.'] },
        { type: 'sheet', sheet: 'sales', xp: 15, prompt: '<code>instagram</code> арнасынан келген тапсырыстардың жалпы сомасын есептеңіз.', solution: '=SUMIF(D2:D25,"instagram",H2:H25)', check: { fns: ['SUMIF'] }, hints: ['<code>SUMIF(арна ауқымы, "instagram", сома ауқымы)</code>'] },
        { type: 'sheet', sheet: 'sales', xp: 20, prompt: 'Астанадағы <b>Латте</b> сатылымының сомасын <code>SUMIFS</code> арқылы есептеңіз.', solution: '=SUMIFS(H2:H25,C2:C25,"Астана",E2:E25,"Латте")', check: { fns: ['SUMIFS'] }, hints: ['Бірінші аргумент — сома ауқымы <code>H2:H25</code>.', 'Сосын жұптар: <code>C2:C25, "Астана", E2:E25, "Латте"</code>.'] },
        { type: 'sheet', sheet: 'sales', xp: 15, prompt: 'Кемінде 3 дана алынған тапсырыстар санын есептеңіз.', solution: '=COUNTIF(F2:F25,">=3")', check: { fns: ['COUNTIF'] }, hints: ['Шарт тырнақшада: <code>"&gt;=3"</code>.'] }
      ]
    },
    {
      id: 'ss-5', title: 'Іздеу: XLOOKUP, VLOOKUP, INDEX/MATCH', minutes: 16,
      body: `
<p>Екі кестені біріктіру — SQL-дегі <code>JOIN</code>. Кестеде бұл іздеу функцияларымен жасалады.</p>
<h3>XLOOKUP (Excel 2021+, Google Sheets)</h3>
<pre><code>=XLOOKUP(E2, Өнімдер!A2:A7, Өнімдер!C2:C7)
        не іздейміз  қайдан іздейміз   нені қайтарамыз</code></pre>
<h3>VLOOKUP (ескі, бірақ әлі көп кездеседі)</h3>
<pre><code>=VLOOKUP(E2, Өнімдер!A2:C7, 3, FALSE)</code></pre>
<p>Үшінші аргумент — кестенің неше бағанын қайтару, төртінші <code>FALSE</code> — дәл сәйкестік. <b>FALSE-ты ұмытпаңыз:</b> әйтпесе Excel жуық сәйкестік іздейді.</p>
<h3>INDEX + MATCH</h3>
<pre><code>=INDEX(Өнімдер!B2:B7, MATCH(E2, Өнімдер!A2:A7, 0))</code></pre>
<p>Жуық сәйкестік пайдалы жағдай: бонус шкаласы (шектер өсу ретімен).</p>
<pre><code>=VLOOKUP(50000, Бонус!A2:B5, 2, TRUE)   → 5   (40 000 ≤ 50 000 &lt; 80 000)</code></pre>
<div class="tip">Мән табылмаса <code>#N/A</code> шығады. <code>IFERROR(..., "жоқ")</code> оны ұстап алады.</div>`,
      exercises: [
        { type: 'sheet', sheet: 'sales', tabs: ['sales', 'products'], cell: 'I2', xp: 20, prompt: '«Өнімдер» парағынан 2-жолдағы өнімнің өзіндік құнын <code>XLOOKUP</code> арқылы табыңыз.', solution: '=XLOOKUP(E2,Өнімдер!A2:A7,Өнімдер!C2:C7)', check: { fns: ['XLOOKUP'] }, hints: ['Іздейтін мән — <code>E2</code>.', 'Басқа параққа сілтеме: <code>Өнімдер!A2:A7</code>.'] },
        { type: 'sheet', sheet: 'sales', tabs: ['sales', 'products'], cell: 'J6', xp: 20, prompt: '6-жолдағы өнімнің санатын (<code>Санат</code>) <code>VLOOKUP</code> және дәл сәйкестікпен табыңыз.', solution: '=VLOOKUP(E6,Өнімдер!A2:C7,2,FALSE)', check: { fns: ['VLOOKUP'] }, hints: ['Санат — кестенің 2-бағаны.', 'Соңғы аргумент <code>FALSE</code>.'] },
        { type: 'sheet', sheet: 'sales', tabs: ['sales', 'products'], cell: 'K2', xp: 25, prompt: '2-жолдағы тапсырыстың пайдасын есептеңіз: Сома минус (Саны × өзіндік құн). Өзіндік құнды XLOOKUP арқылы алыңыз.', solution: '=H2-F2*XLOOKUP(E2,Өнімдер!A2:A7,Өнімдер!C2:C7)', check: { fns: ['XLOOKUP'] }, hints: ['<code>=H2 - F2 * XLOOKUP(...)</code>'] },
        { type: 'quiz', xp: 10, prompt: '<code>=VLOOKUP(E2, Өнімдер!A2:C7, 3)</code> (төртінші аргументсіз) не болуы мүмкін?', options: ['Қате береді', 'Жуық сәйкестік іздеп, сұрыпталмаған кестеде қате мән қайтаруы мүмкін', 'Әрқашан дұрыс жұмыс істейді', 'Бірінші бағанды қайтарады'], answer: 1, explain: 'Төртінші аргумент берілмесе TRUE болып саналады: жуық сәйкестік. Өнім атаулары үшін әрқашан FALSE жазыңыз.' }
      ]
    },
    {
      id: 'ss-6', title: 'Мәтін функциялары және тазалау', minutes: 12,
      body: `
<p>Нақты деректер лас: артық бос орындар, әртүрлі регистр, әртүрлі форматтар. «Қызметкерлер» парағын қараңыз.</p>
<table>
<tr><th>Функция</th><th>Мысал</th><th>Нәтиже</th></tr>
<tr><td><code>TRIM</code></td><td><code>TRIM("  асқар  нұрлан")</code></td><td>асқар нұрлан</td></tr>
<tr><td><code>PROPER</code></td><td><code>PROPER("асқар нұрлан")</code></td><td>Асқар Нұрлан</td></tr>
<tr><td><code>UPPER</code>, <code>LOWER</code></td><td><code>LOWER("ASKAR@MAIL.KZ")</code></td><td>askar@mail.kz</td></tr>
<tr><td><code>LEFT</code>, <code>RIGHT</code>, <code>MID</code></td><td><code>LEFT("2024-03-07", 7)</code></td><td>2024-03</td></tr>
<tr><td><code>LEN</code></td><td><code>LEN("Латте")</code></td><td>5</td></tr>
<tr><td><code>FIND</code></td><td><code>FIND("@", "dina@mail.kz")</code></td><td>5</td></tr>
<tr><td><code>SUBSTITUTE</code></td><td><code>SUBSTITUTE("8 705", " ", "")</code></td><td>8705</td></tr>
<tr><td><code>&amp;</code>, <code>CONCAT</code></td><td><code>A2 &amp; " (" &amp; D2 &amp; ")"</code></td><td>біріктіру</td></tr>
</table>
<h3>Құралдар</h3>
<ul>
<li><b>Remove duplicates</b> (Data → Remove duplicates) — қайталанған жолдарды жою.</li>
<li><b>Text to columns</b> — бір бағанды бөлгіш бойынша бірнеше бағанға бөлу.</li>
<li><b>Data validation</b> — ұяшыққа тек рұқсат етілген мәндерді енгізу (мысалы, бөлімдер тізімі).</li>
<li><b>Filter</b> және <b>Sort</b> — сүзу мен сұрыптау (деректерді өзгертпейді).</li>
</ul>`,
      exercises: [
        { type: 'sheet', sheet: 'staff', cell: 'E2', xp: 15, prompt: '«Қызметкерлер» парағында A2 атын тазалаңыз: артық бос орындарды алып тастап, әр сөзді бас әріппен жазыңыз.', solution: '=PROPER(TRIM(A2))', check: { fns: ['PROPER', 'TRIM'] }, hints: ['Функцияны функцияның ішіне салыңыз: <code>PROPER(TRIM(...))</code>.'] },
        { type: 'sheet', sheet: 'staff', cell: 'F3', xp: 20, prompt: 'B3 email-ынан логинді (<code>@</code> белгісіне дейінгі бөлікті) кіші әріптермен алыңыз.', solution: '=LOWER(LEFT(B3,FIND("@",B3)-1))', check: { fns: ['LEFT', 'FIND'] }, hints: ['<code>FIND("@", B3)</code> @ белгісінің орнын береді.', '<code>LEFT(B3, FIND("@", B3) - 1)</code>, сосын <code>LOWER</code>.'] },
        { type: 'quiz', xp: 10, prompt: 'Бөлім бағанында «маркетинг», «Маркетинг», «маркетинг » жазылған. Pivot table оларды қалай көрсетеді?', options: ['Бір топ', 'Бөлек топтар болуы мүмкін, сондықтан алдымен TRIM және бір регистрге келтіру керек', 'Қате береді', 'Бос мән'], answer: 1, explain: 'Бос орын мен регистр айырмасы мәндерді әртүрлі етеді. Алдымен тазалап, сосын жинақтау керек.' }
      ]
    },
    {
      id: 'ss-7', title: 'Pivot table және диаграммалар', minutes: 14,
      body: `
<p><b>Pivot table</b> (жиынтық кесте) — формуласыз топтау: SQL-дегі <code>GROUP BY</code>. Insert → PivotTable.</p>
<table>
<tr><th>Аймақ</th><th>Не қоямыз</th><th>SQL</th></tr>
<tr><td><b>Rows</b></td><td>Қала</td><td><code>GROUP BY city</code></td></tr>
<tr><td><b>Columns</b></td><td>Ай</td><td>екінші топтау</td></tr>
<tr><td><b>Values</b></td><td>Сома (Sum)</td><td><code>SUM(amount)</code></td></tr>
<tr><td><b>Filters</b></td><td>Арна</td><td><code>WHERE channel = ...</code></td></tr>
</table>
<p>Pivot table-дің кез келген ұяшығын <code>SUMIFS</code>-пен қайталауға болады. Бұл нәтижені тексерудің жақсы тәсілі.</p>
<h3>Диаграмма таңдау</h3>
<ul>
<li>Уақыт бойынша өзгеріс → <b>Line</b></li>
<li>Категорияларды салыстыру → <b>Bar/Column</b> (сұрыпталған)</li>
<li>2–4 бөліктің үлесі → <b>Stacked bar</b> немесе сирек <b>Pie</b></li>
<li>Екі санның байланысы → <b>Scatter</b></li>
</ul>
<div class="tip">Деректерді <b>Format as Table</b> (Ctrl+T) арқылы «кесте» етсеңіз, жаңа жолдар pivot пен формулаларға автоматты қосылады.</div>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Pivot table-де әр қаланың әр айдағы табысын көру үшін «Ай» өрісін қайда қоямыз?', options: ['Values', 'Columns', 'Filters', 'Ешқайда'], answer: 1, explain: 'Rows — қала, Columns — ай, Values — Sum of Сома.' },
        { type: 'sheet', sheet: 'sales', xp: 20, prompt: 'Pivot-тың бір ұяшығын тексеріңіз: Шымкенттегі <b>instagram</b> арнасының сомасы.', solution: '=SUMIFS(H2:H25,C2:C25,"Шымкент",D2:D25,"instagram")', check: { fns: ['SUMIFS'] }, hints: ['Екі шарт: қала және арна.'] },
        { type: 'quiz', xp: 10, prompt: 'Үш қаланың табысын салыстыратын ең түсінікті диаграмма:', options: ['Pie', 'Сұрыпталған bar chart', 'Line chart', 'Scatter'], answer: 1, explain: 'Категорияларды салыстыру үшін ұзындықты көзбен салыстыру оңай, ал бұрыштарды (pie) салыстыру қиын.' }
      ]
    },
    {
      id: 'ss-gate', gate: true, title: 'Модуль емтиханы: Spreadsheets', minutes: 20,
      body: `<p>Қорытынды тапсырмалар. Формулалар «Сатылым», «Өнімдер» және «Бонус» парақтарында есептеледі.</p>`,
      exercises: [
        { type: 'sheet', sheet: 'sales', xp: 20, prompt: 'Алматыдағы орташа чекті (тапсырыс сомасының орташасы) есептеңіз.', solution: '=AVERAGEIF(C2:C25,"Алматы",H2:H25)', check: { fns: ['AVERAGEIF'] } },
        { type: 'sheet', sheet: 'sales', xp: 25, prompt: 'Шымкенттен кемінде 2 дана алынған тапсырыстар санын есептеңіз.', solution: '=COUNTIFS(C2:C25,"Шымкент",F2:F25,">=2")', check: { fns: ['COUNTIFS'] } },
        { type: 'sheet', sheet: 'sales', tabs: ['sales', 'bonus'], xp: 25, prompt: 'Менеджердің сатылымы — барлық тапсырыстардың жалпы сомасы. «Бонус» шкаласынан оның бонус пайызын жуық сәйкестікпен табыңыз (бір формулада).', solution: '=VLOOKUP(SUM(H2:H25),Бонус!A2:B5,2,TRUE)', check: { fns: ['VLOOKUP', 'SUM'] } },
        { type: 'quiz', xp: 15, prompt: 'Әр қаланың жалпы сатылымдағы үлесін <code>=SUMIF(C:C, K2, H:H) / SUM(H2:H25)</code> деп жазып, төмен көшірдік. Не қате?', options: ['Ештеңе', 'SUM(H2:H25) абсолютті болуы керек: $H$2:$H$25, әйтпесе көшіргенде жылжиды', 'SUMIF орнына COUNTIF керек', 'K2 абсолютті болуы керек'], answer: 1, explain: 'Бөлгіш барлық жолда бірдей болуы керек, сондықтан $ қойылады.' },
        { type: 'quiz', xp: 15, prompt: 'Екі парақты өнім атауы бойынша біріктіргенде көп жерде <code>#N/A</code> шықты, бірақ атаулар бірдей көрінеді. Ең ықтимал себеп:', options: ['XLOOKUP істемейді', 'Атауларда көзге көрінбейтін артық бос орын бар', 'Парақ тым үлкен', 'Сандар форматы'], answer: 1, explain: 'Жиі себеп — артық бос орындар. TRIM-мен тазалаңыз.' }
      ]
    }
  ]
};
