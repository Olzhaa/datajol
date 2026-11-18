// M3.4 Visualization & Storytelling. Charts in lessons are inline SVG drawn with theme colours.
(function () {
  // Small bar chart helper for lesson bodies: rows = [[label, value]], opts.zero=false truncates the axis.
  function bars(rows, opts) {
    opts = opts || {};
    const w = 520, rowH = 30, left = 96, right = 48, h = rows.length * rowH + 12;
    const max = Math.max.apply(null, rows.map(r => r[1]));
    const min = opts.zero === false ? opts.min : 0;
    const x = v => left + (v - min) / (max - min) * (w - left - right);
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || 'Бағаналы диаграмма'}">` +
      rows.map((r, i) => {
        const y = 6 + i * rowH, hl = opts.highlight === r[0];
        return `<text x="${left - 8}" y="${y + 18}" text-anchor="end" font-size="13" fill="var(--ink-2)">${r[0]}</text>` +
          `<rect x="${left}" y="${y + 4}" width="${Math.max(2, x(r[1]) - left)}" height="${rowH - 10}" rx="3" fill="${opts.highlight ? (hl ? 'var(--accent)' : 'var(--line-strong)') : 'var(--accent)'}"/>` +
          `<text x="${x(r[1]) + 6}" y="${y + 18}" font-size="12" fill="var(--ink)">${r[1]}</text>`;
      }).join('') + '</svg>';
  }
  const cities = [['Алматы', 420], ['Астана', 310], ['Шымкент', 180], ['Ақтөбе', 120], ['Қарағанды', 95]];

  DJ.modules['m3-4'] = {
    intro: 'Дұрыс график бір қарағанда түсінікті болады, қате график адастырады. Бұл модульде график түрін таңдау, тазалау, түспен ерекшелеу, алдамшы графиктерді тану және деректен оқиға (story) құруды үйренесіз. Графикке арналған деректі SQL мен Python-да дайындайсыз.',
    lessons: [
      {
        id: 'viz-1', title: 'Неге визуализация?', minutes: 8,
        body: `
<p>Сандар кестесін оқу баяу. График көзге бірден <b>заңдылықты</b> көрсетеді: тренд, айырмашылық, ерекше нүкте.</p>
<h3>Анскомб квартеті</h3>
<p>1973 жылы статистик Фрэнсис Анскомб төрт деректер жиынын құрды. Олардың орташасы, дисперсиясы және корреляциясы (r ≈ 0.82) бірдей. Бірақ графикте олар мүлдем басқа: біреуі түзу сызық, біреуі қисық, біреуінде бір шеткі мән бүкіл нәтижені өзгертеді.</p>
<div class="tip">Сабақ: тек сипаттамалық статистикаға сенбеңіз, деректі әрқашан графикпен қараңыз.</div>
<h3>Графиктің екі мақсаты</h3>
<ul>
<li><b>Exploratory</b> (зерттеу): өзіңіз үшін, тез, көп график. EDA кезінде.</li>
<li><b>Explanatory</b> (түсіндіру): басқалар үшін, бір негізгі ой, мұқият безендірілген.</li>
</ul>
<h3>Миға график неге жеңіл?</h3>
<p>Көз ұзындықты, орынды және түсті бір сәтте салыстырады, ал санды оқу үшін әр цифрды жеке өңдеу керек. Мысалы, 12 айдың сатылымы кестеде 12 сан болып тұрады. Ең жақсы айды табу үшін бәрін салыстырып шығасыз. Line chart-та шыңды бір қарағанда көресіз.</p>
<h3>Графиктің ең жақсы қолданыстары</h3>
<ul>
<li><b>Тренд</b>: метрика өсіп жатыр ма, әлде түсіп жатыр ма?</li>
<li><b>Салыстыру</b>: қай қала, қай арна, қай өнім алда?</li>
<li><b>Таралу</b>: тапсырыстардың көбі қандай сомада?</li>
<li><b>Ерекшелік</b>: басқалардан қатты ерекшеленетін нүкте бар ма?</li>
</ul>
<h3>Кесте қашан жақсы?</h3>
<p>Оқырманға нақты мәндер керек болса (бухгалтерия, баға тізімі) немесе бірнеше санды дәл іздейтін болса, кесте графиктен жақсы. Ереже: заңдылықты көрсету керек болса — график, нақты санды табу керек болса — кесте.</p>
<div class="tip">Бұл модульде графиктерді түсіну мен деректі дайындауға назар аударамыз. Графикті салатын құрал (Excel, Power BI, matplotlib) кейін өзгеруі мүмкін, ал ережелер сол күйі қалады.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Анскомб квартеті нені көрсетеді?', options: ['Орташа әрқашан жеткілікті', 'Статистикалары бірдей деректер графикте мүлдем әртүрлі болуы мүмкін', 'Корреляция себепті дәлелдейді', 'Графиктер міндетті емес'], answer: 1, explain: 'Сандардың артында не тұрғанын тек график ашады.' },
          { type: 'quiz', xp: 10, prompt: 'Басшыға жиналыста көрсетілетін график қандай болуы керек?', options: ['Exploratory: барлық бағандар бір графикте', 'Explanatory: бір негізгі ой, артық элементсіз', 'Кесте ғана', 'Мүмкіндігінше түрлі-түсті'], answer: 1, explain: 'Түсіндіру графигі аудиторияны бір қорытындыға апарады.' }
        ]
      },
      {
        id: 'viz-2', title: 'График түрін таңдау', minutes: 12,
        body: `
<p>График түрін сұрақ анықтайды:</p>
<table>
<tr><th>Сұрақ</th><th>График</th></tr>
<tr><td>Санаттарды салыстыру</td><td>Бағаналы (bar), көлденең: ұзын атаулар үшін</td></tr>
<tr><td>Уақыт бойынша өзгеріс</td><td>Сызықтық (line)</td></tr>
<tr><td>Бүтіннің бөліктері</td><td>Stacked bar немесе 100% bar; pie тек 2–3 бөлікке</td></tr>
<tr><td>Таралу</td><td>Гистограмма, box plot</td></tr>
<tr><td>Екі айнымалы байланысы</td><td>Scatter plot</td></tr>
<tr><td>Бір маңызды сан</td><td>Үлкен сан (KPI карточкасы)</td></tr>
</table>
<p>Мысал: қалалар бойынша клиенттер. Көлденең, кему ретімен сұрыпталған бағандар салыстыруды жеңілдетеді:</p>
${bars(cities, { label: 'Қалалар бойынша клиенттер' })}
<div class="tip">Pie chart-та көз бұрыштарды нашар салыстырады. 5 бөліктен көп болса, бағаналы график әрқашан жақсы.</div>
<h3>Таңдау алгоритмі</h3>
<ol>
<li>Сұрақты бір сөйлеммен жазыңыз: «Қай қалада клиент көп?»</li>
<li>Сөйлемдегі негізгі сөзді табыңыз: «қай... көп» — салыстыру.</li>
<li>Кестеден сол сұраққа сай графикті алыңыз: салыстыру — bar.</li>
<li>Санаттар саны мен атаулардың ұзындығын қараңыз: ұзын атау — көлденең bar.</li>
</ol>
<h3>Жиі қателер</h3>
<ul>
<li><b>Уақытқа bar chart</b>: 3–4 кезеңге болады, бірақ 24 айға line chart анық.</li>
<li><b>Санаттарға line chart</b>: қалалардың арасында «уақыт» жоқ, сызық оларды жалған байланыстырады.</li>
<li><b>Көп бөлікті pie</b>: 8 санатты салыстыру мүмкін емес, кему ретімен сұрыпталған bar chart қолданыңыз.</li>
<li><b>Scatter-ды тым аз нүктемен салу</b>: 5 нүктеден байланыс туралы қорытынды жасау қауіпті.</li>
</ul>
<p>Күмәндансаңыз, bar chart-ты таңдаңыз: оны кез келген оқырман бірден түсінеді.</p>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Соңғы 12 айдағы айлық табыс динамикасын көрсету үшін қай график?', options: ['Pie', 'Line', 'Scatter', 'Гистограмма'], answer: 1, explain: 'Уақыт бойынша өзгеріс сызықпен ең жақсы көрінеді.' },
          { type: 'quiz', xp: 10, prompt: 'Жарнама шығыны мен сатылым арасындағы байланысты (50 аймақ) қалай көрсетесіз?', options: ['Scatter plot', 'Pie chart', 'Line chart', 'Кесте'], answer: 0, explain: 'Екі сандық айнымалының байланысы — scatter.' },
          { type: 'quiz', xp: 10, prompt: '8 өнім санатының табыс үлесін көрсету керек. Ең жақсы таңдау?', options: ['8 бөлікті pie chart', 'Кему ретімен сұрыпталған көлденең bar', '3D pie', 'Line chart'], answer: 1, explain: '8 бөлікті pie оқылмайды, сұрыпталған bar салыстыруды бірден көрсетеді.' },
          { type: 'quiz', xp: 10, prompt: 'Тапсырыс сомаларының қалай таралғанын көру үшін?', options: ['Гистограмма', 'Pie', 'Line', 'KPI карточкасы'], answer: 0, explain: 'Таралу — гистограмма немесе box plot.' }
        ]
      },
      {
        id: 'viz-3', title: 'Бағаналы графикті дұрыс салу', minutes: 12,
        body: `
<h3>Ережелер</h3>
<ol>
<li><b>Ось нөлден басталады.</b> Бағанның ұзындығы мәнге пропорционал болуы керек.</li>
<li><b>Сұрыптаңыз.</b> Әліпби бойынша емес, мән бойынша (табиғи реті бар санаттардан басқа: айлар, жас топтары).</li>
<li><b>Ұзын атауларға көлденең бағандар.</b> Мәтін қисаймайды.</li>
<li><b>Мәнді тікелей жазыңыз.</b> Сонда тор сызықтары керек болмайды.</li>
</ol>
<h3>Деректі дайындау</h3>
<p>Графикке дерек әдетте SQL-ден дайын, агрегатталған және сұрыпталған күйде келеді:</p>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
ORDER BY customers DESC;</code></pre>
<h3>Python-да мәтіндік график</h3>
<p>Кітапханасыз да жылдам «график» салуға болады: әр мәнді белгілер санымен көрсетеміз.</p>
<pre><code>for name, v in [("Алматы", 420), ("Астана", 310)]:
    print(f"{name:&lt;8} {'█' * (v // 30)} {v}")</code></pre>
<h3>Топталған және қабатталған бағандар</h3>
<p>Екі өлшемді салыстыру керек болса (мысалы, қала × жыл), екі нұсқа бар:</p>
<ul>
<li><b>Топталған (grouped)</b>: әр қаланың жанында екі баған — биыл және былтыр. Әр қаланың өзгерісін салыстыруға ыңғайлы.</li>
<li><b>Қабатталған (stacked)</b>: бір бағанның ішінде бөліктер. Жалпы соманы және оның құрамын көрсетеді, бірақ ортаңғы бөліктерді салыстыру қиын.</li>
</ul>
<h3>Python тапсырмасына кеңес</h3>
<p>Сөздікті мән бойынша сұрыптау үшін: <code>sorted(data.items(), key=lambda kv: kv[1], reverse=True)</code>. Ең үлкен мәнге <code>width</code> белгі берілсе, қалғандарының ұзындығы пропорция бойынша есептеледі: <code>round(v / max_v * width)</code>. Бүтін санға айналдыруды ұмытпаңыз, өйткені жолды бөлшек санға көбейтуге болмайды.</p>
<div class="tip">Бағандардың ені мен арасындағы бос орын шамамен бірдей болсын. Тым жіңішке бағандар «сызық» болып көрінеді, тым жуандары көзді шаршатады.</div>`,
        exercises: [
          { type: 'sql', dataset: 'shop', xp: 20, prompt: 'Bar chart үшін дерек дайындаңыз: delivered тапсырыстардан әр санаттың табысы, <code>category</code> және <code>revenue</code>, табыс бойынша кему ретімен.', starter: '', solution: "SELECT p.category, SUM(oi.quantity * p.price) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN products p ON p.id = oi.product_id WHERE o.status = 'delivered' GROUP BY p.category ORDER BY revenue DESC;", check: { ordered: true }, hints: ['Үш кестені JOIN жасап, <code>GROUP BY p.category ORDER BY revenue DESC</code>.'] },
          { type: 'python', xp: 25, prompt: '<code>text_bars(data, width=20)</code> функциясын жазыңыз. <code>data</code> — сөздік. Мән бойынша кему ретімен жолдар тізімін қайтарсын, әр жол: <code>f"{атау:&lt;10}{\'█\' * n} {мән}"</code>, мұнда <code>n = round(мән / максимум * width)</code>.', starter: 'def text_bars(data, width=20):\n    pass\n', solution: 'def text_bars(data, width=20):\n    top = max(data.values())\n    lines = []\n    for name, v in sorted(data.items(), key=lambda kv: kv[1], reverse=True):\n        lines.append(f"{name:<10}{\'█\' * round(v / top * width)} {v}")\n    return lines', check: { tests: '_r = text_bars({"Астана": 310, "Алматы": 420, "Шымкент": 105}, width=8)\nassert isinstance(_r, list) and len(_r) == 3, "3 жолдан тұратын тізім қайтарыңыз"\nassert _r[0] == "Алматы    ████████ 420", f"1-жол: {_r[0]!r}"\nassert _r[1] == "Астана    ██████ 310", f"2-жол: {_r[1]!r} (310 / 420 * 8 ≈ 6)"\nassert _r[2] == "Шымкент   ██ 105", f"3-жол: {_r[2]!r}"' }, hints: ['<code>sorted(data.items(), key=lambda kv: kv[1], reverse=True)</code>', '<code>f"{name:&lt;10}"</code> атауды 10 таңбаға толтырады.'] }
        ]
      },
      {
        id: 'viz-4', title: 'Уақыт қатарлары: line chart', minutes: 11,
        body: `
<p>Line chart үзіліссіз уақытты көрсетеді: күндер, апталар, айлар. Ережелер:</p>
<ul>
<li>Уақыт әрқашан көлденең осьте, солдан оңға.</li>
<li>Бір графикте 3–4 сызықтан артық емес. Көп болса, біреуін ерекшелеп, қалғанын сұр қылыңыз.</li>
<li>Екі түрлі Y осі (dual axis) көбіне адастырады: масштабты ойнап, кез келген «байланысты» көрсетуге болады.</li>
<li>Күнделікті шу көп болса, 7 күндік жылжымалы орташаны қосыңыз (Advanced SQL-дегі <code>ROWS BETWEEN</code>).</li>
</ul>
<p>Line chart-та Y осі нөлден басталуы міндетті емес: мұнда біз ұзындықты емес, <b>өзгерісті</b> көреміз. Бірақ осьті тым тарылтып, кішкене тербелісті «құлдырау» етіп көрсетпеңіз.</p>
<h3>Line chart-қа дерек дайындау</h3>
<p>Уақыт қатарында әр кезеңде бір мән болуы керек. Бір күнде бірнеше жол болса, алдымен агрегаттаймыз:</p>
<pre><code>SELECT day, SUM(revenue) AS revenue
FROM daily_sales
GROUP BY day
ORDER BY day;</code></pre>
<p><code>ORDER BY day</code> маңызды: сұрыпталмаған дерекпен сызық алға-артқа секіріп, «шатасқан жіп» болып шығады.</p>
<h3>Бос кезеңдер</h3>
<p>Егер бір күні сатылым болмаса, ол күн SQL нәтижесінде мүлде болмайды. Графикте сызық екі көрші күнді тікелей қосып, «түсу» жоқ сияқты көрінеді. Күнтізбе кестесімен <code>LEFT JOIN</code> жасап, бос күнге 0 қойыңыз.</p>
<h3>Аннотация</h3>
<p>Сызықтағы күрт өзгерістің жанына себебін жазыңыз: «акция басталды», «сайт істемеді». Оқырман себепті іздеп уақыт жоғалтпайды.</p>
<div class="tip">Апталық немесе айлық агрегат күнделікті шуды азайтады, бірақ қысқа оқиғаларды жасырып жіберуі мүмкін. Мақсатыңызға сай кезеңді таңдаңыз.</div>`,
        exercises: [
          { type: 'sql', dataset: 'metrics', xp: 20, prompt: 'Line chart үшін <code>daily_sales</code>-тан екі аймақтың жиынтық күндік табысын шығарыңыз: <code>day</code>, <code>revenue</code>, күн ретімен.', starter: '', solution: 'SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day ORDER BY day;', check: { ordered: true }, hints: ['<code>GROUP BY day ORDER BY day</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Бір графикте 12 қаланың айлық сатылымы 12 түрлі түспен берілген. Не істейміз?', options: ['Түстерді жарқынырақ ету', 'Негізгі 1–2 қаланы түспен ерекшелеп, қалғанын сұр ету немесе бөлек кіші графиктерге бөлу', 'Pie chart-қа ауыстыру', '3D қосу'], answer: 1, explain: '«Спагетти» графикті ерекшелеу немесе small multiples түсінікті етеді.' }
        ]
      },
      {
        id: 'viz-5', title: 'Түс және артық элементтер', minutes: 10,
        body: `
<p><b>Data-ink ratio</b> (Эдвард Тафти): графиктегі сия деректі көрсетуге жұмсалуы керек. Артық рамка, көлеңке, 3D, қалың тор — шу.</p>
<h3>Түсті мақсатпен қолданыңыз</h3>
<p>Барлығы түрлі-түсті болса, ешнәрсе ерекшеленбейді. Бәрін сұр қылып, негізгі ойды бір түспен ерекшелеңіз:</p>
${bars(cities, { highlight: 'Шымкент', label: 'Шымкент ерекшеленген график' })}
<p>Енді график «Шымкент туралы» екені бірден көрінеді.</p>
<h3>Қолжетімділік</h3>
<ul>
<li>Ер адамдардың шамамен 8%-ы қызыл мен жасылды ажыратуы қиын. Тек осы екі түске сенбеңіз.</li>
<li>Түстен бөлек белгі қосыңыз: жазу, пішін, сызық түрі.</li>
</ul>
<h3>Түс палитрасының үш түрі</h3>
<table>
<tr><th>Түрі</th><th>Қашан</th><th>Мысал</th></tr>
<tr><td>Санаттық</td><td>Реті жоқ топтар</td><td>Қалалар, арналар: әртүрлі түстер</td></tr>
<tr><td>Реттік (sequential)</td><td>Аздан көпке дейін</td><td>Табыс картасы: ақшылдан қоюға</td></tr>
<tr><td>Екі жақты (diverging)</td><td>Ортаңғы нүктеден екі жаққа</td><td>Жоспардан ауытқу: қызыл ← сұр → көк</td></tr>
</table>
<h3>Нені алып тастаймыз?</h3>
<ul>
<li>Графиктің айналасындағы рамка мен фон түсі.</li>
<li>Қалың тор сызықтары: мәнді бағанға тікелей жазсаңыз, тор керек емес.</li>
<li>Бір серия болғанда легенда: тақырыптың өзі түсіндіреді.</li>
<li>3D әсер мен көлеңке: олар мәндерді бұрмалайды.</li>
</ul>
<p>Әр элементті алып тастап, өзіңізден сұраңыз: «график түсініксіз болды ма?» Болмаса, ол элемент артық еді.</p>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Графикте «биыл тек Шымкентте сатылым түсті» деген ойды қалай жеткіземіз?', options: ['Әр қалаға жеке жарқын түс', 'Барлық қала сұр, Шымкент бір акцент түспен және қысқа жазумен', 'Шымкентті алып тастау', '3D әсер қосу'], answer: 1, explain: 'Бір акцент түс көзді керекті жерге апарады.' },
          { type: 'quiz', xp: 10, prompt: 'Қайсысы data-ink ratio-ны жақсартады?', options: ['Фонға сурет қою', 'Мәндерді бағандардың жанына жазып, қалың торды алып тастау', 'Көлеңке қосу', 'Әр бағанға градиент'], answer: 1, explain: 'Тікелей жазулар торды керексіз етеді.' }
        ]
      },
      {
        id: 'viz-6', title: 'Алдамшы графиктер', minutes: 11,
        body: `
<p>Дұрыс сандармен де алдауға болады. Ең жиі кездесетін тәсілдер:</p>
<h3>1. Кесілген ось</h3>
<p>Сатылым 95-тен 100-ге өсті (≈5%). Бірақ ось 90-нан басталса, бағандар екі есе айырмашылық көрсетеді:</p>
${bars([['Өткен жыл', 95], ['Биыл', 100]], { zero: false, min: 90, label: 'Кесілген осьті график' })}
<p>Дәл осы дерек нөлден басталатын осьте:</p>
${bars([['Өткен жыл', 95], ['Биыл', 100]], { label: 'Нөлден басталатын осьті график' })}
<h3>2. Таңдалған кезең (cherry picking)</h3>
<p>Тек өсу болған 3 айды көрсетіп, жылдық құлдырауды жасыру.</p>
<h3>3. 3D және пропорционал емес пішіндер</h3>
<p>3D pie-да алдыңғы бөлік үлкенірек көрінеді. Иконкаларды екі есе биік қылсаңыз, ауданы төрт есе өседі.</p>
<div class="tip">«Өтірік факторы» (lie factor) = графиктегі әсердің өлшемі / деректегі әсердің өлшемі. 1-ге жақын болуы керек.</div>
<h3>4. Аудан мен көлем</h3>
<p>Шеңбердің радиусын екі есе ұлғайтсаңыз, ауданы төрт есе өседі. Инфографикада мәнді радиуспен көрсету айырмашылықты асыра көрсетеді. Мәнді ауданмен немесе, одан да жақсысы, бағанның ұзындығымен көрсетіңіз.</p>
<h3>5. Сәйкес келмейтін масштабтар</h3>
<p>Екі графикті қатар қойғанда, олардың Y осьтері әртүрлі болса, оқырман бағандарды бір-бірімен салыстырып, қате қорытынды жасайды. Салыстыру үшін қойылған графиктерде осьті бірдей қылыңыз.</p>
<h3>6. Жиынтық сома (кумулятивті график)</h3>
<p>Жиынтық сома әрқашан өседі, сондықтан күнделікті сатылым түсіп жатса да, кумулятивті график «өсу» көрсетеді. Мұндай графикті көрсеткенде, күнделікті мәнді де қоса беріңіз.</p>
<div class="tip">Өз графигіңізді тексеру үшін оны деректі көрмеген әріптесіңізге көрсетіп, «мұнда не болып жатыр?» деп сұраңыз. Оның жауабы сіздің ойыңызбен сәйкес келмесе, график адастырады.</div>`,
        exercises: [
          { type: 'number', xp: 15, prompt: 'Ось 90-нан басталатын графикте 95 және 100 бағандарының ұзындықтарының қатынасы (100-дің бағаны 95-тің бағанынан неше есе ұзын)?', answer: 2, tol: 0.001, explain: 'Бағандар ұзындығы: 95 − 90 = 5 және 100 − 90 = 10. 10 / 5 = 2 есе, ал шын айырмашылық 100 / 95 ≈ 1.05.' },
          { type: 'quiz', xp: 10, prompt: 'Кесілген ось қай графикте қабылданады?', options: ['Бағаналы графикте', 'Line chart-та өзгерісті көрсету үшін, егер ол анық белгіленсе', 'Pie chart-та', 'Еш жерде'], answer: 1, explain: 'Бағанның ұзындығы мәнді білдіреді, ал сызық өзгерісті көрсетеді.' }
        ]
      },
      {
        id: 'viz-7', title: 'Деректен оқиға құру (storytelling)', minutes: 12,
        body: `
<p>Аналитиктің графигі әрекетке әкелуі керек. Cole Nussbaumer Knaflic-тің «Storytelling with Data» тәсілі:</p>
<ol>
<li><b>Аудиторияны біліңіз</b>: кім, ол не шешеді, не біледі?</li>
<li><b>Бір негізгі ой</b> (Big Idea): бір сөйлемде, нақты әрекетпен.</li>
<li><b>Тақырып — қорытынды.</b> «Айлық сатылым» емес, «Қыркүйекте сатылым мобильде төлем ақауынан 12% түсті».</li>
<li><b>Аннотация</b>: маңызды нүктенің жанына қысқа түсіндірме.</li>
<li><b>Құрылым</b>: контекст → мәселе → шешім.</li>
</ol>
<div class="tip">Тест: графикке 5 секунд қараған адам негізгі ойды айта ала ма? Айта алмаса, тақырыпты немесе ерекшелеуді түзетіңіз.</div>
<h3>Мысал: бір графиктің екі нұсқасы</h3>
<p><b>Нашар:</b> тақырыбы «Айлық сатылым 2024», 12 түсті сызық, легенда оң жақта, аннотация жоқ. Оқырман 30 секунд іздеп, не болғанын түсінбейді.</p>
<p><b>Жақсы:</b> тақырыбы «Мобиль төлемдер 9 қыркүйектен бері екі есе азайды». Мобиль сызығы қызыл, қалғаны сұр. 9 қыркүйектің жанында «қосымша жаңартылды» деген жазу бар. Оқырман 5 секундта мәселені көреді.</p>
<h3>Презентацияның құрылымы</h3>
<ol>
<li><b>Контекст</b>: «Біз мобиль төлемдерді бақылаймыз, әдетте күніне ~320».</li>
<li><b>Мәселе</b>: «9 қыркүйектен бері ~180, айырма айына ~X ₸».</li>
<li><b>Себеп</b>: «Жаңартудан кейін төлем модулінде қате пайда болды».</li>
<li><b>Әрекет</b>: «Ескі нұсқаны қайтару, жауапты — мобиль командасы, мерзімі — жұма».</li>
</ol>
<div class="tip">Слайдтың тақырыбын ғана оқып шыққанда толық оқиға түсінікті болуы керек. Мұны «тақырыптар тесті» деп атайды.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Графиктің ең жақсы тақырыбы қайсы?', options: ['«Сатылым, 2024»', '«Арна бойынша клиенттер»', '«Referral арнасының CAC-ы ads-тан 4 есе арзан: бюджеттің бір бөлігін referral-ға ауыстыру ұсынылады»', '«График 1»'], answer: 2, explain: 'Тақырып қорытындыны және әрекетті айтады.' },
          { type: 'quiz', xp: 10, prompt: '«Big Idea» дегеніміз не?', options: ['Ең үлкен график', 'Аудиторияға жеткізетін бір негізгі ой мен ұсыныс бір сөйлемде', 'Барлық деректің тізімі', 'Дашбордтың атауы'], answer: 1, explain: 'Бір сөйлемге сыймаса, ой әлі анық емес.' }
        ]
      },
      {
        id: 'viz-8', title: 'Дашборд дизайны', minutes: 11,
        body: `
<p>Дашборд — бір экрандағы бірнеше графиктің жиыны. Жақсы дашборд бір сұраққа жауап береді: «бизнес қалай жүріп жатыр және қай жерге қарау керек?»</p>
<h3>Құрылым</h3>
<ul>
<li><b>Жоғарыда KPI</b>: 3–5 негізгі сан, өткен кезеңмен салыстыру.</li>
<li><b>Ортада тренд</b>: негізгі метриканың line chart-ы.</li>
<li><b>Төменде бөлшектер</b>: санат, аймақ, арна бойынша.</li>
<li><b>Сүзгілер</b>: күн, аймақ — жоғарыда немесе сол жақта, аз санда.</li>
</ul>
<p>Адам экранды «F» әрпі тәрізді оқиды: сол жақ жоғарғы бұрыш ең маңызды орын.</p>
<div class="tip">Әр график «бұл не үшін керек?» деген сұраққа жауап беруі керек. Жауап жоқ болса, оны алып тастаңыз.</div>
<h3>Дашбордты жобалау қадамдары</h3>
<ol>
<li><b>Пайдаланушыны анықтаңыз</b>: дашбордты кім, қанша жиі ашады? Директорға апталық шолу, менеджерге күнделікті бақылау керек.</li>
<li><b>Сұрақтарды жазыңыз</b>: пайдаланушы дашбордтан қандай 3–5 сұраққа жауап алуы керек?</li>
<li><b>Әр сұраққа бір график</b>: сұраққа сай түрін таңдаңыз (viz-2 сабағы).</li>
<li><b>Эскиз</b>: қағазға немесе слайдқа сызып, пайдаланушыға көрсетіңіз. Эскизді өзгерту дашбордты өзгертуден әлдеқайда арзан.</li>
<li><b>Құру және тексеру</b>: сандар SQL сұрауымен сәйкес келе ме?</li>
</ol>
<h3>KPI карточкасы</h3>
<p>Жақсы карточкада үш нәрсе бар: метриканың өзі (үлкен санмен), салыстыру («өткен аптадан +8%») және бағыттың түсі (жақсы — жасыл, жаман — қызыл, бірақ түстен бөлек ↑ ↓ белгісі де болсын).</p>
<div class="tip">Дашбордтың жаңартылған уақытын көрінетін жерге жазыңыз. Ескі дерекпен шешім қабылдау — жиі кездесетін қате.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Дашбордтың сол жақ жоғарғы бұрышына не қоямыз?', options: ['Компания логотипін', 'Ең маңызды KPI-ды', 'Сүзгілер тізімін', 'Ең егжей-тегжейлі кестені'], answer: 1, explain: 'Көз ең алдымен сол жерге түседі.' },
          { type: 'quiz', xp: 10, prompt: 'Басшылық дашбордында 24 график бар. Ең дұрыс қадам?', options: ['Тағы график қосу', 'Әр графиктің қандай шешімге көмектесетінін сұрап, қалғанын алып тастау немесе бөлек бетке шығару', 'Шрифтті кішірейту', 'Барлығын pie chart-қа ауыстыру'], answer: 1, explain: 'Аз, бірақ мақсатты графиктер дашбордты пайдалы етеді.' }
        ]
      },
      {
        id: 'viz-9', title: 'BI құралдары: Superset, DataLens, Tableau, Looker Studio, Qlik', minutes: 15,
        body: `
<p>Қазақстандағы аналитик вакансияларында Power BI ең жиі аталады, бірақ жалғыз емес: банктер мен телеком <b>Qlik Sense</b> пен <b>Tableau</b>-ды, IT-компаниялар ашық кодты <b>Apache Superset</b>-ті, ТМД нарығындағы стартаптар <b>Yandex DataLens</b>-ті, маркетинг командалары <b>Looker Studio</b>-ны қолданады. Жақсы жаңалық: бәрінің логикасы бір. Біреуін түсінсеңіз, екіншісіне бір аптада көшесіз.</p>
<h3>Барлық BI құралындағы бір жол</h3>
<pre><code>Дереккөз (connection) → Dataset → Chart → Dashboard → Сүзгілер</code></pre>
<ol>
<li><b>Дереккөзге қосылу</b>: PostgreSQL, ClickHouse, Google Sheets, CSV.</li>
<li><b>Dataset</b>: диаграмма салынатын кесте. Бұл дайын кесте, view немесе сіз жазған SQL сұрауы болуы мүмкін.</li>
<li><b>Chart</b>: өлшем (dimension: қала, ай) мен көрсеткішті (measure: SUM, COUNT) таңдайсыз, құрал агрегатты өзі есептейді.</li>
<li><b>Dashboard</b>: бірнеше диаграмма бір бетте.</li>
<li><b>Сүзгілер</b>: күн аралығы, қала. Бір сүзгі барлық диаграммаға әсер етеді.</li>
</ol>
<h3>Терминдер картасы</h3>
<table>
<tr><th>Ұғым</th><th>Power BI</th><th>Superset</th><th>DataLens</th><th>Tableau</th><th>Looker Studio</th></tr>
<tr><td>Дерек кестесі</td><td>Semantic model (dataset)</td><td>Dataset</td><td>Датасет</td><td>Data source</td><td>Data source</td></tr>
<tr><td>Есептелетін көрсеткіш</td><td>Measure (DAX)</td><td>Metric (SQL өрнегі)</td><td>Есептелетін өріс</td><td>Calculated field</td><td>Calculated field</td></tr>
<tr><td>Бір диаграмма</td><td>Visual</td><td>Chart</td><td>Чарт</td><td>Worksheet</td><td>Chart</td></tr>
<tr><td>Диаграммалар беті</td><td>Report</td><td>Dashboard</td><td>Дашборд</td><td>Dashboard</td><td>Report</td></tr>
<tr><td>Сүзгі элементі</td><td>Slicer</td><td>Native filter</td><td>Селектор</td><td>Filter, parameter</td><td>Control</td></tr>
<tr><td>SQL жазатын жер</td><td>Power Query (native query)</td><td>SQL Lab</td><td>QL-чарт</td><td>Custom SQL</td><td>Custom query</td></tr>
</table>
<p>Qlik Sense-тің ерекшелігі — <b>ассоциативті модель</b>: бір мәнді бассаңыз, барлық кестедегі байланысты мәндер бірден белгіленеді; формулалары <code>Sum({&lt;Year={2026}&gt;} Sales)</code> түріндегі set analysis тілінде жазылады.</p>
<h3>Superset: SQL білетін аналитиктің құралы</h3>
<p><b>SQL Lab</b> — браузердегі SQL редакторы. Сұрауды жазып, нәтижесін көресіз, сосын «Create chart» батырмасымен сол сұрауды dataset етіп сақтайсыз. Осы курстағы SQL дағдыңыз мұнда тікелей қолданылады. DataLens пен Looker Studio да дәл осылай SQL-ден бастауға мүмкіндік береді.</p>
<h3>Диаграммаға дайын dataset қалай жасалады</h3>
<ul>
<li><b>Түйіршігін (grain) анықтаңыз</b>: бір жол нені білдіреді? «Бір тапсырыс» немесе «ай × санат». Бір жолда екі деңгейді араластырмаңыз.</li>
<li><b>Ұзын формат</b>: санаттар баған атауында емес, жолдарда тұрсын: <code>month, category, revenue</code>. Сонда жаңа санат қосылса, dataset өзгермейді, ал BI құралы оны түске, сүзгіге оңай айналдырады.</li>
<li><b>Қатынасты емес, құрамдас бөліктерін сақтаңыз</b>: орташа чектің орнына <code>revenue</code> мен <code>orders</code>. Орташа чекті BI <code>SUM(revenue) / SUM(orders)</code> деп кез келген сүзгіде дұрыс есептейді. Дайын орташаларды қайта орташалау қате нәтиже береді.</li>
<li><b>Күн нақты күн болсын</b>: <code>'2026-03'</code> мәтіні емес, <code>2026-03-01</code>. Сонда уақыт осі мен «соңғы 90 күн» сүзгісі жұмыс істейді.</li>
<li><b>Сүзгіге керек өлшемдерді қосыңыз</b>: қала, статус, арна. Dataset-те жоқ баған бойынша сүзе алмайсыз.</li>
</ul>
<h3>Қай құралды қашан</h3>
<table>
<tr><th>Жағдай</th><th>Құрал</th></tr>
<tr><td>Корпоративтік есеп, Microsoft ортасы, Excel-ге жақын пайдаланушылар</td><td>Power BI</td></tr>
<tr><td>Дерек ClickHouse/PostgreSQL-де, команда SQL біледі, лицензияға бюджет жоқ</td><td>Superset</td></tr>
<tr><td>Жылдам, тегін бұлттық дашборд, ClickHouse-пен жақсы жұмыс</td><td>DataLens</td></tr>
<tr><td>Маркетинг: Google Analytics, Google Ads, Sheets</td><td>Looker Studio</td></tr>
<tr><td>Күрделі интерактивті визуализация, зерттеу</td><td>Tableau</td></tr>
</table>
<h3>Жиі қателер</h3>
<ul>
<li>Dataset-ке алдын ала есептелген пайыз бен орташаны салу, сосын BI-да оларды қосу немесе орташалау.</li>
<li>Әр диаграммаға бөлек SQL жазу: сандар бір-біріне сәйкес келмей қалады. Бір тақырыпқа бір dataset жасап, барлық диаграмманы содан салыңыз.</li>
<li>Миллион жолдық шикі кестені тікелей қосу: дашборд баяу ашылады. Күн немесе ай деңгейіне дейін агрегаттаңыз.</li>
</ul>
<div class="tip">Резюмеде құрал атауын ғана емес, не істегеніңізді жазыңыз: «Superset-те ClickHouse дерегінен сатылым дашбордын құрдым: 1 dataset, 6 диаграмма, 3 сүзгі». Superset пен DataLens-ті тегін орнатып, портфолио жобасын жасауға болады.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, prompt: 'Superset-тегі «dataset» ұғымы нені білдіреді?', options: ['Дайын диаграмма', 'Диаграммалар салынатын кесте, view немесе сақталған SQL сұрауы', 'Дашбордтың PDF көшірмесі', 'Пайдаланушылар тізімі'], answer: 1, explain: 'Dataset — диаграмманың дереккөзі. Оны SQL Lab-та жазған сұраудан да жасауға болады. Power BI-дағы модель кестесіне, Tableau-дағы data source-қа сәйкес келеді.' },
          { type: 'sql', dataset: 'qazaq', xp: 25, prompt: "<b>qazaq.</b> «Санаттар бойынша айлық түсім» диаграммасына ұзын форматтағы dataset дайындаңыз: 2026 жылғы жеткізілген тапсырыстар бойынша <code>month</code> (айдың бірінші күні, <code>date(order_date, 'start of month')</code>), <code>category</code>, <code>revenue</code>. <code>month</code>, <code>category</code> бойынша сұрыптаңыз.", starter: '', solution: "SELECT date(o.order_date, 'start of month') AS month, p.category, SUM(oi.quantity * oi.unit_price) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE o.status = 'delivered' AND o.order_date >= '2026-01-01' GROUP BY month, p.category ORDER BY month, p.category;", check: { ordered: true }, hints: ['Үш кесте: <code>orders</code>, <code>order_items</code>, <code>products</code>.', "<code>WHERE o.status = 'delivered' AND o.order_date &gt;= '2026-01-01'</code>, <code>GROUP BY month, p.category</code>."] },
          { type: 'sql', dataset: 'qazaq', xp: 30, prompt: '<b>qazaq.</b> Дашбордтың негізгі dataset-ін жасаңыз, түйіршігі — бір тапсырыс: <code>order_id</code>, <code>order_date</code>, <code>city</code> (клиенттің қаласы), <code>status</code>, <code>items</code> (тапсырыстағы тауар жолдарының саны), <code>order_total</code> (quantity × unit_price сомасы). Барлық статус кіреді. <code>order_id</code> бойынша сұрыптаңыз.', starter: '', solution: 'SELECT o.order_id, o.order_date, c.city, o.status, COUNT(*) AS items, SUM(oi.quantity * oi.unit_price) AS order_total FROM orders o JOIN customers c ON c.customer_id = o.customer_id JOIN order_items oi ON oi.order_id = o.order_id GROUP BY o.order_id, o.order_date, c.city, o.status ORDER BY o.order_id;', check: { ordered: true }, hints: ['<code>orders</code>-ты <code>customers</code> және <code>order_items</code>-пен біріктіріңіз.', 'Түйіршік — тапсырыс: <code>GROUP BY o.order_id, o.order_date, c.city, o.status</code>. Нәтижеде 308 жол болуы керек.'] },
          { type: 'quiz', xp: 10, prompt: 'Dataset-те әр қала мен ай үшін дайын <code>avg_check</code> бағаны бар. Дашбордта «Барлық қала» карточкасы оны <code>AVG(avg_check)</code> деп көрсетеді. Не дұрыс емес?', options: ['Ештеңе, бұл дұрыс орташа чек', 'Бұл орташалардың орташасы: 5 тапсырысы бар қала мен 500 тапсырысы бар қала бірдей салмақ алады. Dataset-ке revenue мен orders-ті салып, SUM(revenue) / SUM(orders) деп есептеу керек', 'AVG орнына MAX қолдану керек', 'Карточкада орташа чекті көрсетуге болмайды'], answer: 1, explain: 'Қатынастарды алдын ала есептемей, алым мен бөлімді бөлек сақтаңыз. Сонда BI кез келген сүзгіде дұрыс қатынасты өзі есептейді.' },
          { type: 'quiz', xp: 10, prompt: 'Компанияның дерегі ClickHouse-та, аналитиктер SQL біледі, лицензияға бюджет жоқ. Қай құрал ең қисынды?', options: ['Tableau', 'Apache Superset', 'Qlik Sense', 'Excel'], answer: 1, explain: 'Superset ашық кодты және тегін, ClickHouse-қа қосылады, SQL Lab арқылы сұраудан бірден диаграмма жасауға болады. DataLens те осы жағдайға лайық балама.' }
        ]
      },
      {
        id: 'viz-10', title: 'Python-да диаграмма: matplotlib және seaborn', minutes: 16,
        body: `
<p>Вакансияларда «matplotlib/seaborn» жиі кездеседі: Python-да талдау жасап отырып, диаграмманы сол жерде салу ыңғайлы. Бұл сайттың браузеріндегі Python-да matplotlib жоқ, сондықтан бұл сабақта кодты <b>оқуды</b> және диаграммаға <b>деректі дайындауды</b> үйренесіз. Диаграмма салудың 80%-ы — дәл осы дайындық. Кодты өз компьютеріңізде немесе Google Colab-та іске қосып көріңіз.</p>
<h3>Стандартты үлгі</h3>
<pre><code>import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('orders.csv')
clean = df[(df['status'] == 'paid') &amp; df['amount'].notna() &amp; (df['amount'] &lt; 20000)]
monthly = clean.groupby(clean['order_date'].str[:7])['amount'].sum()   # 1. дерек

fig, ax = plt.subplots(figsize=(8, 4))            # 2. сурет пен ось
ax.plot(monthly.index, monthly.values, marker='o')  # 3. сызық
ax.set_title('Айлық табыс, 2024')                 # 4. тақырып пен осьтер
ax.set_ylabel('Табыс, ₸')
ax.set_ylim(0)
ax.spines[['top', 'right']].set_visible(False)    # артық жиектерді алу
plt.tight_layout()
plt.savefig('revenue.png', dpi=150)               # 5. сақтау
plt.show()</code></pre>
<p>Әр диаграмма осы бес қадамнан тұрады: дерек → <code>fig, ax</code> → салу → безендіру → сақтау. <code>fig</code> — бүкіл сурет, <code>ax</code> — оның ішіндегі бір диаграмма (осьтерімен).</p>
<h3>Диаграмма түрлері</h3>
<table>
<tr><th>Мақсат</th><th>matplotlib</th><th>Дерек қандай болуы керек</th></tr>
<tr><td>Уақыт бойынша тренд</td><td><code>ax.plot(x, y)</code></td><td>Уақыт ретімен сұрыпталған Series</td></tr>
<tr><td>Санаттарды салыстыру</td><td><code>ax.barh(атаулар, мәндер)</code></td><td>Мәні бойынша сұрыпталған Series</td></tr>
<tr><td>Таралу</td><td><code>ax.hist(x, bins=20)</code></td><td>Шикі мәндер (агрегатсыз)</td></tr>
<tr><td>Екі айнымалының байланысы</td><td><code>ax.scatter(x, y)</code></td><td>Екі сандық баған</td></tr>
</table>
<h3>seaborn: DataFrame-мен тікелей жұмыс</h3>
<p><b>seaborn</b> matplotlib-тің үстіне құрылған. Оған ұзын форматтағы DataFrame мен баған атауларын бересіз:</p>
<pre><code>import seaborn as sns

sns.barplot(data=m, x='channel', y='amount', estimator='sum', errorbar=None)
sns.histplot(data=clean, x='amount', bins=20)
sns.lineplot(data=long_df, x='month', y='revenue', hue='channel')
sns.heatmap(pivot, annot=True, fmt='.0f', cmap='Blues')</code></pre>
<ul>
<li><code>hue='channel'</code> әр арнаны бөлек түспен салады.</li>
<li><code>sns.barplot</code> әдепкіде <b>орташаны</b> және сенімділік интервалының сызығын көрсетеді. Қосынды керек болса, <code>estimator='sum'</code> деп жазасыз.</li>
<li><code>sns.heatmap</code> кең форматтағы кестені (pivot) күтеді: жолдар бір өлшем, бағандар екіншісі.</li>
</ul>
<h3>Ұзын және кең формат</h3>
<p><code>lineplot</code> пен <code>barplot</code>-қа ұзын формат (<code>month, channel, revenue</code>) керек, <code>heatmap</code>-қа кең формат. Бірінен біріне <code>pivot_table</code> өткізеді:</p>
<pre><code>pivot = m.pivot_table(index='channel', columns='month', values='amount', aggfunc='sum')</code></pre>
<h3>Жиі қателер</h3>
<ul>
<li><code>plt.savefig</code>-ті <code>plt.show()</code>-дан кейін шақыру: скриптте <code>show</code> суретті жабады, файл бос сақталады. Алдымен сақтаңыз.</li>
<li>Bar chart-та осьті нөлден бастамау (<code>set_ylim</code>-ге нөлден өзге төменгі шек беру): айырма жасанды үлкейеді.</li>
<li>Сұрыпталмаған bar chart: <code>sort_values()</code> диаграмманы оқуды бірден жеңілдетеді.</li>
<li>Күнді мәтін күйінде қалдыру: осьте айлар әліпби ретімен тұрып қалуы мүмкін. <code>pd.to_datetime</code> қолданыңыз немесе <code>YYYY-MM</code> форматын ұстаңыз.</li>
<li>Тақырыпсыз, өлшем бірліксіз диаграмма. Тақырыпқа қорытындыны жазыңыз: «Наурызда табыс ең жоғары болды».</li>
</ul>
<div class="tip">Диаграмма күткендей шықпаса, алдымен <code>print(monthly)</code> деп деректің өзін қараңыз. Қате әдетте сызбада емес, groupby мен сүзгіде болады.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: "Сабақтағы line chart-қа дерек дайындаңыз. Таза тапсырыстардан (<code>status</code> = paid, <code>amount</code> бос емес және 20 000-нан кіші) айлық табысты есептеп, <code>monthly</code> Series-іне жазыңыз: индексі <code>'YYYY-MM'</code> түріндегі ай (өсу ретімен), мәні — <code>amount</code> қосындысы.", starter: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\n\n# clean = ...\n# monthly = ...\n", solution: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nmonthly = clean.groupby(clean['order_date'].str[:7])['amount'].sum()\nprint(monthly)\n", check: { tests: "assert 'monthly' in globals(), 'monthly айнымалысын жасаңыз'\nassert hasattr(monthly, 'index') and getattr(monthly, 'ndim', 0) == 1, 'monthly pandas Series болуы керек'\nassert [str(i) for i in monthly.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], f'Индекс 2024-01 … 2024-06 айлары болуы керек, сізде {list(monthly.index)}'\nassert [float(v) for v in monthly.values] == [31950.0, 66650.0, 89650.0, 66000.0, 48700.0, 31900.0], f'Айлық табыс дұрыс емес: тазалау ережелерін тексеріңіз. Сізде {list(monthly.values)}'" }, hints: ["<code>clean = df[(df['status'] == 'paid') &amp; df['amount'].notna() &amp; (df['amount'] &lt; 20000)]</code>", "Ай: <code>clean['order_date'].str[:7]</code>", "<code>clean.groupby(clean['order_date'].str[:7])['amount'].sum()</code>"] },
          { type: 'python', xp: 25, prompt: 'Горизонталь bar chart-қа (<code>ax.barh</code>) дерек дайындаңыз: таза тапсырыстардан әр қаланың табысын есептеп, <b>өсу ретімен</b> сұрыпталған <code>by_city</code> Series-іне жазыңыз (индексі — қала). <code>barh</code> бірінші мәнді төменге салады, сондықтан ең үлкені жоғарыда көрінеді.', starter: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\n\n# by_city = ...\n", solution: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\nby_city = m.groupby('city')['amount'].sum().sort_values()\nprint(by_city)\n", check: { tests: "assert 'by_city' in globals(), 'by_city айнымалысын жасаңыз'\nassert getattr(by_city, 'ndim', 0) == 1, 'by_city pandas Series болуы керек'\nassert list(by_city.index) == ['Шымкент', 'Астана', 'Алматы'], f'Қалалар табысы бойынша өсу ретімен тұруы керек, сізде {list(by_city.index)}'\nassert [float(v) for v in by_city.values] == [37500.0, 142950.0, 154400.0], f'Қала табысы дұрыс емес, сізде {list(by_city.values)}'" }, hints: ["Қала <code>customers</code> кестесінде: <code>clean.merge(customers, on='customer_id')</code>", "<code>m.groupby('city')['amount'].sum().sort_values()</code>"] },
          { type: 'python', xp: 30, prompt: "<code>sns.heatmap</code>-қа кең форматтағы кесте дайындаңыз: <code>pivot</code> DataFrame-інің жолдары — арна (<code>channel</code>), бағандары — ай (<code>'YYYY-MM'</code>), мәндері — таза табыс қосындысы.", starter: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\nm['month'] = m['order_date'].str[:7]\n\n# pivot = ...\n", solution: "import pandas as pd\n\ndf = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\nclean = df[(df['status'] == 'paid') & df['amount'].notna() & (df['amount'] < 20000)]\nm = clean.merge(customers, on='customer_id')\nm['month'] = m['order_date'].str[:7]\npivot = m.pivot_table(index='channel', columns='month', values='amount', aggfunc='sum')\nprint(pivot)\n", check: { tests: "assert 'pivot' in globals(), 'pivot айнымалысын жасаңыз'\nassert getattr(pivot, 'ndim', 0) == 2, 'pivot DataFrame болуы керек'\nassert pivot.shape == (3, 6), f'pivot өлшемі 3 арна × 6 ай болуы керек, сізде {pivot.shape}'\nassert sorted(pivot.index) == ['2gis', 'instagram', 'referral'], 'Жолдар арналар болуы керек: index=\"channel\"'\nassert [str(c) for c in pivot.columns] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], 'Бағандар айлар болуы керек: columns=\"month\"'\nassert float(pivot.loc['instagram', '2024-03']) == 47750.0 and float(pivot.loc['referral', '2024-05']) == 20200.0, 'Мәндер amount қосындысы болуы керек: aggfunc=\"sum\"'" }, hints: ["<code>m.pivot_table(index='channel', columns='month', values='amount', aggfunc='sum')</code>", '<code>aggfunc</code> жазылмаса, pandas қосындыны емес, орташаны есептейді.'] },
          { type: 'quiz', xp: 10, prompt: "Код: <code>sns.barplot(data=m, x='channel', y='amount')</code>. Бағандардың биіктігі нені көрсетеді?", options: ['Әр арнаның жалпы табысын', 'Әр арнадағы тапсырыс сомасының орташасын (үстінде сенімділік интервалының сызығымен)', 'Әр арнадағы тапсырыс санын', 'Ең үлкен тапсырысты'], answer: 1, explain: "seaborn-ның barplot-ы әдепкіде орташаны салады. Жалпы табыс керек болса: <code>estimator='sum'</code>, сызықты алу үшін <code>errorbar=None</code>." },
          { type: 'quiz', xp: 10, prompt: "Скрипттің соңы: <code>plt.show()</code>, одан кейінгі жолда <code>plt.savefig('chart.png')</code>. Файлда не сақталады?", options: ['Дайын диаграмма', 'Бос сурет: show диаграмманы көрсеткен соң суретті жабады, сондықтан savefig-ті show-дан бұрын шақыру керек', 'Қате шығады', 'Екі диаграмма'], answer: 1, explain: 'Рет маңызды: алдымен <code>savefig</code>, сосын <code>show</code>. Немесе <code>fig.savefig(...)</code> деп нақты сурет объектісін сақтаңыз.' }
        ]
      },
      {
        id: 'viz-gate', gate: true, title: 'Модуль емтиханы: Visualization & Storytelling', minutes: 20,
        body: `
<p>Қорытынды тексеріс: график таңдау, дерек дайындау, алдамшы графиктер және оқиға құру.</p>`,
        exercises: [
          { type: 'sql', dataset: 'metrics', xp: 30, prompt: '<b>metrics.</b> Арна бойынша bar chart үшін дерек: <code>channel</code> және <code>buyers</code> (<code>purchase</code> қадамына жеткен бірегей пайдаланушылар), кему ретімен. Сатып алушысы жоқ арналар да 0-мен шықсын.', starter: '', solution: "SELECT u.channel, COUNT(DISTINCT CASE WHEN e.step = 'purchase' THEN e.user_id END) AS buyers FROM users u LEFT JOIN events e ON e.user_id = u.id GROUP BY u.channel ORDER BY buyers DESC;", check: { ordered: true }, hints: [] },
          { type: 'python', xp: 30, prompt: '<code>top_n_other(data, n)</code> функциясын жазыңыз: сөздіктен ең үлкен <code>n</code> мәнді қалдырып, қалғандарын <code>"Басқа"</code> деген бір кілтке қоссын. Қалдық жоқ болса, <code>"Басқа"</code> қосылмасын.', starter: 'def top_n_other(data, n):\n    pass\n', solution: 'def top_n_other(data, n):\n    items = sorted(data.items(), key=lambda kv: kv[1], reverse=True)\n    out = dict(items[:n])\n    rest = sum(v for _, v in items[n:])\n    if items[n:]:\n        out["Басқа"] = rest\n    return out', check: { tests: '_d = {"A": 50, "B": 30, "C": 10, "D": 6, "E": 4}\nassert top_n_other(_d, 2) == {"A": 50, "B": 30, "Басқа": 20}, f"top_n_other(_d, 2) дұрыс емес: {top_n_other(_d, 2)}"\nassert top_n_other({"A": 1, "B": 2}, 5) == {"B": 2, "A": 1}, "Қалдық жоқ болса, Басқа қосылмайды"' }, hints: [] },
          { type: 'quiz', xp: 20, prompt: 'Конверсия 2.1%-дан 2.3%-ға өсті. Слайдта Y осі 2.0%-дан басталатын бағаналы график «конверсия үш есе өсті» деген әсер береді. Не істейсіз?', options: ['Солай қалдырамын, әсерлі', 'Осьті нөлден бастаймын немесе өсімді санмен жазамын: +0.2 п.п. (+9.5%)', 'Pie chart-қа ауыстырамын', 'Графикті алып тастап, тек «өсті» деп жазамын'], answer: 1, explain: 'Бағанның ұзындығы мәнге пропорционал болуы керек, ал өзгерісті санмен нақты айтқан дұрыс.' },
          { type: 'number', xp: 20, prompt: '0.2 пайыздық тармақ өсім (2.1% → 2.3%) салыстырмалы түрде неше пайыз өсім? (бір ондық белгі)', answer: 9.5, tol: 0.06, unit: '%', explain: '(2.3 − 2.1) / 2.1 ≈ 9.5%.' }
        ]
      }
    ]
  };
})();
