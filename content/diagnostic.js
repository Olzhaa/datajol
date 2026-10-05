// Adaptive placement test: one block per module, three items per block (easy, medium, hard).
DJ.diagnostic = {
  version: 2,
  blocks: [
    { mod: 'm0-1', area: 'Дерек сауаттылығы', needs: [], items: [
      { lvl: 1, type: 'quiz', prompt: 'Төмендегілердің қайсысы <b>құрылымдалған</b> дерек?', options: ['Excel-дегі клиенттер кестесі: id, аты, қаласы', 'Клиенттердің еркін жазған пікір мәтіндері', 'Call-орталықтың қоңырау жазбалары', 'Instagram-дағы тауар суреттері'], answer: 0 },
      { lvl: 2, type: 'quiz', prompt: 'Басшы сұрады: «Қыркүйекте мобильді қосымшадағы орташа чек қанша болды?» Аналитикалық сұрақтың тексеру тізімі бойынша мұнда не жетіспейді?', options: ['Метрика', 'Кезең', 'Салыстыру (өткен кезеңмен немесе басқа топпен)', 'Сегмент'], answer: 2 },
      { lvl: 3, type: 'quiz', prompt: 'Қалалар бойынша дерек: кофеханасы көп қалаларда жол-көлік оқиғалары да көп. Қай қорытынды ең дұрыс?', options: ['Кофеханалар жол-көлік оқиғаларын көбейтеді', 'Оқиғалар көп жерде адамдар кофеханаға көбірек барады', 'Екеуіне де ортақ фактор (қала халқының саны) әсер етуі мүмкін, бірге өзгеру себепті дәлелдемейді', 'Байланыс бар болғандықтан, бір көрсеткішпен екіншісін басқаруға болады'], answer: 2 }
    ] },

    { mod: 'm0-2', area: 'Математика', needs: [], items: [
      { lvl: 1, type: 'number', prompt: 'Сайтқа 1 200 адам кірді, оның 84-і сатып алды. Конверсия неше пайыз?', answer: 7, tol: 0.01, unit: '%' },
      { lvl: 2, type: 'number', prompt: 'Апталық тапсырыстар: 12, 5, 40, 7, 9, 15. Медианасы қанша?', answer: 10.5, tol: 0.001 },
      { lvl: 3, type: 'number', prompt: 'Тауар бағасы алдымен 20% өсті, келесі айда 20% төмендеді. Бастапқы бағамен салыстырғанда жалпы өзгеріс неше пайыз? (Төмендеу болса, минус таңбамен жазыңыз.)', answer: -4, tol: 0.01, unit: '%' }
    ] },

    { mod: 'm1-1', area: 'Spreadsheets', needs: ['m0-2'], items: [
      { lvl: 1, type: 'quiz', prompt: '<code>B2:B10</code> ұяшықтарындағы сандардың орташасын қай формула дұрыс есептейді?', options: ['<code>=AVERAGE(B2:B10)</code>', '<code>=SUM(B2:B10)/10</code>', '<code>=COUNT(B2:B10)</code>', '<code>=MEAN(B2:B10)</code>'], answer: 0 },
      { lvl: 2, type: 'quiz', prompt: '<code>C2</code> ұяшығында <code>=B2*$F$1</code> формуласы тұр. Оны бір жол төмен, <code>C3</code>-ке көшірсек, формула қандай болады?', options: ['<code>=B3*$F$1</code>', '<code>=B3*$F$2</code>', '<code>=B2*$F$1</code>', '<code>=C3*$G$2</code>'], answer: 0 },
      { lvl: 3, type: 'number', prompt: 'Кесте: A бағаны — қала, B бағаны — сома.<table><tr><th></th><th>A</th><th>B</th></tr><tr><td>2</td><td>Алматы</td><td>3000</td></tr><tr><td>3</td><td>Астана</td><td>7000</td></tr><tr><td>4</td><td>Алматы</td><td>5000</td></tr><tr><td>5</td><td>Алматы</td><td>8000</td></tr><tr><td>6</td><td>Шымкент</td><td>9000</td></tr><tr><td>7</td><td>Алматы</td><td>4500</td></tr></table><code>=SUMIFS(B2:B7, A2:A7, "Алматы", B2:B7, "&gt;=5000")</code> формуласы нені қайтарады?', answer: 13000, tol: 0.5 }
    ] },

    { mod: 'm1-2', area: 'SQL негізі', needs: ['m0-1'], items: [
      { lvl: 1, type: 'quiz', prompt: '<code>products</code> кестесінен бағасы 10 000-нан жоғары тауарларды ең қымбатынан бастап шығару керек. Қай сұрау дұрыс?', options: ['<code>SELECT name, price FROM products WHERE price &gt; 10000 ORDER BY price DESC;</code>', '<code>SELECT name, price FROM products WHERE price &gt; 10000 ORDER BY price;</code>', '<code>SELECT name, price FROM products ORDER BY price DESC WHERE price &gt; 10000;</code>', '<code>SELECT name, price FROM products GROUP BY price &gt; 10000;</code>'], answer: 0 },
      { lvl: 2, type: 'sql', dataset: 'shop', prompt: '<code>products</code> кестесінен әр санаттың (<code>category</code>) тауар санын және орташа бағасын шығарыңыз. Тек 3 және одан көп тауары бар санаттар қалсын. Бағандар: <code>category</code>, <code>n</code>, <code>avg_price</code>. <code>avg_price</code> бойынша кему ретімен сұрыптаңыз.', solution: 'SELECT category, COUNT(*) AS n, AVG(price) AS avg_price FROM products GROUP BY category HAVING COUNT(*) >= 3 ORDER BY avg_price DESC;' },
      { lvl: 3, type: 'sql', dataset: 'shop', prompt: 'Әр клиенттің <b>жеткізілген</b> (<code>status = \'delivered\'</code>) тапсырыстар санын шығарыңыз. Ондай тапсырысы жоқ клиенттер де <code>0</code>-мен шықсын. Бағандар: <code>id</code>, <code>name</code>, <code>n_delivered</code>. Клиенттің <code>id</code>-і бойынша өсу ретімен сұрыптаңыз.', solution: 'SELECT c.id, c.name, COUNT(o.id) AS n_delivered FROM customers c LEFT JOIN orders o ON o.customer_id = c.id AND o.status = \'delivered\' GROUP BY c.id, c.name ORDER BY c.id;' }
    ] },

    { mod: 'm2-1', area: 'Python', needs: [], items: [
      { lvl: 1, type: 'quiz', prompt: 'Бұл код не шығарады?<pre><code>x = [10, 20, 30, 40]\nprint(x[1:3])</code></pre>', options: ['<code>[10, 20, 30]</code>', '<code>[20, 30]</code>', '<code>[20, 30, 40]</code>', '<code>[10, 20]</code>'], answer: 1 },
      { lvl: 2, type: 'quiz', prompt: 'Бұл код не шығарады?<pre><code>def add_tax(price):\n    price * 1.12\n\nprint(add_tax(100))</code></pre>', options: ['<code>112.0</code>', '<code>None</code>', '<code>100</code>', '<code>NameError</code> қатесі'], answer: 1 },
      { lvl: 3, type: 'python', prompt: '<code>total_by_city(orders)</code> функциясын жазыңыз. <code>orders</code> — сөздіктер тізімі, мысалы <code>{"city": "Алматы", "amount": 100}</code>. Функция әр қаланың <code>amount</code> қосындысын <code>dict</code> ретінде қайтарсын. <code>amount</code> мәні <code>None</code> болған жолдар есепке алынбасын.', starter: 'def total_by_city(orders):\n    totals = {}\n    # Кодыңызды осында жазыңыз\n    return totals\n', solution: 'def total_by_city(orders):\n    totals = {}\n    for o in orders:\n        if o["amount"] is None:\n            continue\n        totals[o["city"]] = totals.get(o["city"], 0) + o["amount"]\n    return totals\n', tests: '_data = [{"city": "Алматы", "amount": 100}, {"city": "Астана", "amount": 50}, {"city": "Алматы", "amount": None}, {"city": "Алматы", "amount": 30}]\nassert total_by_city(_data) == {"Алматы": 130, "Астана": 50}, "Алматы = 130, Астана = 50 болуы керек"\nassert total_by_city([{"city": "Шымкент", "amount": None}]) == {}, "amount None болса, ол жол есептелмейді"\nassert total_by_city([]) == {}, "Бос тізім үшін бос dict қайтарыңыз"' }
    ] },

    { mod: 'm2-2', area: 'pandas', needs: ['m2-1'], items: [
      { lvl: 1, type: 'quiz', prompt: '<code>df</code> DataFrame-інен <code>price</code> 1000-нан жоғары жолдарды қалай аламыз?', options: ['<code>df[df[\'price\'] &gt; 1000]</code>', '<code>df[\'price\'] &gt; 1000</code>', '<code>df.where(\'price\' &gt; 1000)</code>', '<code>df[price &gt; 1000]</code>'], answer: 0 },
      { lvl: 2, type: 'quiz', prompt: 'Бұл код не шығарады?<pre><code>import pandas as pd\ndf = pd.DataFrame({\n    \'city\':   [\'Алматы\', \'Астана\', \'Алматы\', \'Астана\', \'Алматы\'],\n    \'amount\': [100, 200, 300, 400, None]\n})\nprint(df.groupby(\'city\')[\'amount\'].mean()[\'Алматы\'])</code></pre>', options: ['<code>200.0</code>', '<code>133.33</code>', '<code>NaN</code>', '<code>400.0</code>'], answer: 0 },
      { lvl: 3, type: 'quiz', prompt: 'Нәтижеде неше жол болады және <code>city</code> бағанында неше <code>NaN</code> болады?<pre><code>orders = pd.DataFrame({\'order_id\': [1, 2, 3, 4],\n                       \'customer_id\': [1, 2, 2, 5]})\ncustomers = pd.DataFrame({\'customer_id\': [1, 2, 3],\n                          \'city\': [\'Алматы\', \'Астана\', \'Шымкент\']})\nm = orders.merge(customers, on=\'customer_id\', how=\'left\')</code></pre>', options: ['4 жол, 1 <code>NaN</code>', '3 жол, 0 <code>NaN</code>', '5 жол, 2 <code>NaN</code>', '4 жол, 0 <code>NaN</code>'], answer: 0 }
    ] },

    { mod: 'm2-3', area: 'Git', needs: [], items: [
      { lvl: 1, type: 'quiz', prompt: '<code>git add report.sql</code> командасы не істейді?', options: ['Файлдағы өзгерісті staging-ке қосады, яғни келесі commit-ке дайындайды', 'Файлды GitHub-қа жібереді', 'Бірден commit жасайды', 'Файлды жаңа тармаққа көшіреді'], answer: 0 },
      { lvl: 2, type: 'quiz', prompt: '<code>report.sql</code> файлын өзгертіп, <code>git add report.sql</code> жасадыңыз. Енді <code>git diff</code> ештеңе көрсетпейді. Неге?', options: ['<code>git diff</code> тек staging-ке әлі қосылмаған өзгерістерді көрсетеді; staging-тегіні <code>git diff --staged</code> көрсетеді', '<code>git add</code> өзгерістерді жойып жіберді', 'Өзгеріс commit болып кетті', 'Файл <code>.gitignore</code>-ға түсті'], answer: 0 },
      { lvl: 3, type: 'quiz', prompt: 'Қате commit әріптестер де қолданатын <code>main</code> тармағына push жасалып қойды. Тарихты бұзбай, оның әсерін қалай жоямыз?', options: ['<code>git revert &lt;hash&gt;</code>: қате commit-ті кері қайтаратын жаңа commit жасап, push жасаймыз', '<code>git restore report.sql</code> жасап, push жасаймыз', 'Тарихты қайта жазып, <code>git push --force</code> жасаймыз', '<code>.git</code> бумасын өшіріп, репозиторийді қайта құрамыз'], answer: 0 }
    ] },

    { mod: 'm3-1', area: 'Статистика', needs: ['m0-2'], items: [
      { lvl: 1, type: 'quiz', prompt: 'Жарнама шығыны мен сатылым арасындағы корреляция коэффициенті r = −0.9. Бұл нені білдіреді?', options: ['Күшті кері сызықтық байланыс: бірі өскенде екіншісі әдетте азаяды', 'Байланыс жоқ', 'Әлсіз оң байланыс', 'Жарнама сатылымды 90% азайтады'], answer: 0 },
      { lvl: 2, type: 'number', prompt: 'Емтихан баллдарының орташасы 50, стандартты ауытқуы 8. 70 балл алған студенттің z-score-ы қанша?', answer: 2.5, tol: 0.01 },
      { lvl: 3, type: 'number', prompt: 'Жеткізу уақыты қалыпты таралған: орташасы 30 минут, стандартты ауытқуы 5 минут. 68–95–99.7 ережесі бойынша тапсырыстардың шамамен неше пайызы 40 минуттан ұзақ жеткізіледі?', answer: 2.5, tol: 0.1, unit: '%' }
    ] },

    { mod: 'm3-2', area: 'Тазалау және EDA', needs: ['m2-2'], items: [
      { lvl: 1, type: 'quiz', prompt: '<code>city</code> бағанында <code>Алматы</code>, <code>алматы </code> және <code>Almaty</code> мәндері кездеседі. Бұл қандай мәселе?', options: ['Дубликат жолдар', 'Бір мәннің әртүрлі жазылуы: мәтінді стандарттау керек', 'Бос мәндер', 'Шеткі мәндер (outliers)'], answer: 1 },
      { lvl: 2, type: 'quiz', prompt: '<code>income</code> бағанында 3% бос мән бар, ал деректе бірнеше өте үлкен табыс кездеседі. Жолдарды сақтап, бос мәндерді толтыру керек. Ең қауіпсіз тәсіл қайсы?', options: ['Орташамен толтыру', 'Медианамен толтыру (қажет болса, бос болғанын белгілейтін баған қосу)', '0-мен толтыру', 'Ең үлкен мәнмен толтыру'], answer: 1 },
      { lvl: 3, type: 'number', prompt: 'Клиенттер тізімі (аты, email):<pre><code>(\' Айгерім \', \'aigerim@mail.kz\')\n(\'Нұрлан\',    \'NURLAN@mail.kz\')\n(\'Ержан\',     None)\n(\'Айгерім\',   \'aigerim@mail.kz\')\n(\'Нұрлан\',    \'nurlan@mail.kz\')\n(\'Мадина\',    None)</code></pre>Email бойынша (регистрге қарамай) дубликаттарды біріктіреміз, ал email-і жоқ әр жолды бөлек клиент деп санаймыз. Неше бірегей клиент қалады?', answer: 4, tol: 0.01 }
    ] },

    { mod: 'm3-3', area: 'Advanced SQL', needs: ['m1-2'], items: [
      { lvl: 1, type: 'quiz', prompt: '<code>WITH t AS (SELECT ...) SELECT ... FROM t;</code> сұрауындағы <code>WITH</code> (CTE) не істейді?', options: ['Дерекқорда тұрақты жаңа кесте құрады', 'Осы бір сұрау ішінде ғана қолданылатын, аты бар уақытша нәтиже жасайды', 'Кестеге индекс қосады', 'Дерекқорда VIEW ретінде сақталады'], answer: 1 },
      { lvl: 2, type: 'quiz', prompt: 'Аналитика бөлімінің жалақылары: Гүлнар 750 000, Ақжол 520 000, Камила 520 000, Ерлан 410 000. <code>ORDER BY salary DESC</code> бойынша Ерлан үшін <code>ROW_NUMBER()</code>, <code>RANK()</code>, <code>DENSE_RANK()</code> қандай мән береді?', options: ['4, 4, 3', '4, 3, 3', '3, 3, 3', '4, 4, 4'], answer: 0 },
      { lvl: 3, type: 'sql', dataset: 'metrics', prompt: '<code>daily_sales</code> кестесінен әр өңірдің күндік табысы мен <b>кумулятивті</b> табысын (өңір ішінде күн ретімен жинақталған сома) шығарыңыз. Бағандар: <code>region</code>, <code>day</code>, <code>revenue</code>, <code>running_total</code>. <code>region</code>, сосын <code>day</code> бойынша өсу ретімен сұрыптаңыз.', solution: 'SELECT region, day, revenue, SUM(revenue) OVER (PARTITION BY region ORDER BY day) AS running_total FROM daily_sales ORDER BY region, day;' }
    ] },

    { mod: 'm3-4', area: 'Визуализация', needs: [], items: [
      { lvl: 1, type: 'quiz', prompt: 'Соңғы 12 айдағы айлық табыстың трендін көрсету үшін қай график ең қолайлы?', options: ['Line chart', 'Pie chart', 'Scatter plot', 'Кесте ғана'], answer: 0 },
      { lvl: 2, type: 'quiz', prompt: 'Бағаналы графикте Y осі 95-тен басталады, сондықтан 98 пен 100 мәндері бірнеше есе айырмашылық сияқты көрінеді. Не істеу керек?', options: ['Бағаналы графикте Y осін 0-ден бастау керек', 'Айырманы күшейту үшін осьті 97-ден бастау керек', 'Графикті 3D етіп жасау керек', 'Ештеңе, сандар дұрыс болса жеткілікті'], answer: 0 },
      { lvl: 3, type: 'quiz', prompt: 'Менеджер жыл басынан бергі <b>кумулятивті</b> табыс графигін көрсетіп: «Сызық үнемі өсіп келеді, бәрі жақсы» дейді. Ал айлық табыс соңғы 3 айда төмендеген. Не дұрыс?', options: ['Кумулятивті сома теріс емес мәндер қосылғанда ешқашан төмендемейді, сондықтан құлдырауды жасырады; айлық табыстың line chart-ын көрсету керек', 'График дұрыс: кумулятивті сома өсіп тұрса, айлық табыс та өсіп тұр', 'Pie chart-қа ауыстырса, құлдырау көрінеді', 'Y осін логарифмдік етсе, мәселе шешіледі'], answer: 0 }
    ] },

    { mod: 'm3-5', area: 'Power BI', needs: [], items: [
      { lvl: 1, type: 'quiz', prompt: 'Power BI-да деректі жүктеп, артық бос орындарды алып тастау, бағандардың типін өзгерту қай жерде жасалады?', options: ['Power Query', 'DAX өлшемінде', 'Визуалдың форматтау панелінде', 'Publish кезінде'], answer: 0 },
      { lvl: 2, type: 'quiz', prompt: 'Қайсысын <b>calculated column</b> ретінде жасаған дұрыс (қалғандары measure болуы керек)?', options: ['Әр тапсырысқа slicer үшін «Үлкен / Кіші» белгісі', 'Жалпы табыс', 'Орташа чек', 'Арнаның жалпы табыстағы үлесі'], answer: 0 },
      { lvl: 3, type: 'number', prompt: 'Өлшемдер:<pre><code>Revenue = SUM(orders[amount])\nShare % = DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[channel])))</code></pre>Матрицаның жолдары — <code>customers[channel]</code>. Беттегі slicer-де <code>city = Алматы</code> таңдалған. Алматыдағы табыс: instagram 6000, 2gis 3000, referral 3000. Барлық қалалар бойынша: instagram 10000, 2gis 6000, referral 4000. <b>2gis</b> жолындағы <code>Share %</code> неше пайыз?', answer: 25, tol: 0.1, unit: '%' }
    ] },

    { mod: 'm3-6', area: 'Бизнес-метрикалар', needs: ['m0-2'], items: [
      { lvl: 1, type: 'number', prompt: 'Айдағы табыс 1 200 000 ₸, тапсырыстар саны 300. Орташа чек (AOV) қанша теңге?', answer: 4000, tol: 0.5, unit: '₸' },
      { lvl: 2, type: 'number', prompt: 'Айда 2 000 белсенді пайдаланушы болды, оның 250-і төлем жасады. Табыс 1 500 000 ₸. ARPPU қанша теңге?', answer: 6000, tol: 0.5, unit: '₸' },
      { lvl: 3, type: 'number', prompt: 'Айлық ARPU 5 000 ₸, маржа 40%, айлық churn 8%. Бір клиентті тарту құны (CAC) 10 000 ₸. LTV / CAC қатынасы қанша?', answer: 2.5, tol: 0.01 }
    ] },

    { mod: 'm4-1', area: 'Ықтималдық', needs: ['m3-1'], items: [
      { lvl: 1, type: 'number', prompt: 'Қорапта 3 қызыл, 5 көк және 2 жасыл шар бар. Кездейсоқ бір шар алынады. Оның көк <b>болмау</b> ықтималдығы қанша? (0 мен 1 арасындағы сан)', answer: 0.5, tol: 0.001 },
      { lvl: 2, type: 'number', prompt: '1 000 сессия: 600 мобильді, 400 десктоп. Мобильді сессиялардың 30-ы, десктоптың 40-ы сатып алумен аяқталды. Кездейсоқ алынған <b>сатып алудың</b> мобильді болу ықтималдығы P(мобильді | сатып алды) қанша? (0 мен 1 арасындағы сан)', answer: 0.4286, tol: 0.005 },
      { lvl: 3, type: 'number', prompt: 'Транзакциялардың 1%-ы алаяқтық. Модель алаяқтық транзакциялардың 90%-ын белгілейді, ал қалыпты транзакциялардың 5%-ын қателесіп белгілейді. Модель белгілеген транзакцияның шын алаяқтық болу ықтималдығы қанша? (0 мен 1 арасындағы сан)', answer: 0.1538, tol: 0.005 }
    ] },

    { mod: 'm4-2', area: 'A/B тест', needs: ['m4-1'], items: [
      { lvl: 1, type: 'quiz', prompt: 'A/B тестте пайдаланушыларды A және B топтарына қалай бөлеміз?', options: ['Кездейсоқ', 'Белсенді пайдаланушыларды B-ге, қалғанын A-ға', 'Мобильділерді A-ға, десктопты B-ге', 'Бірінші аптада бәрі A, екінші аптада бәрі B'], answer: 0 },
      { lvl: 2, type: 'number', prompt: 'Сайтқа 900 адам кірді, 90-ы сатып алды. Конверсияның 95% сенімділік интервалының (z = 1.96) <b>жоғарғы</b> шекарасы неше пайыз?', answer: 11.96, tol: 0.05, unit: '%' },
      { lvl: 3, type: 'number', prompt: 'A/B тест: A тобында 1 500 адамның 150-і сатып алды, B тобында 1 500 адамның 195-і. Екі пропорцияның z-тестінің (pooled SE) z статистикасы қанша? (2 ондық белгіге дейін)', answer: 2.575, tol: 0.015 }
    ] },

    { mod: 'm4-3', area: 'ML математикасы', needs: ['m2-1'], items: [
      { lvl: 1, type: 'number', prompt: 'Скаляр көбейтінді: <code>[2, −1, 3] · [4, 0, 1]</code> = ?', answer: 11, tol: 0.001 },
      { lvl: 2, type: 'number', prompt: 'f(x) = 3x² − 4x + 1. Туынды f′(2) қанша?', answer: 8, tol: 0.001 },
      { lvl: 3, type: 'number', prompt: 'Модель ŷ = w·x + b, loss = MSE. Дерек: x = [1, 2, 3], y = [3, 5, 7]. Бастапқы мән w = 0, b = 0, learning rate = 0.05. Gradient descent-тің <b>бір</b> қадамынан кейін w қанша болады? (3 ондық белгіге дейін)', answer: 1.133, tol: 0.005 }
    ] }
  ]
};
