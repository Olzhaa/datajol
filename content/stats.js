// M3.1 Descriptive Statistics. Python exercises use only the standard library (statistics, math).
DJ.modules['m3-1'] = {
  intro: 'Статистика — деректі бір-екі санмен сипаттау және «бұл қалыпты ма?» деген сұраққа жауап беру. Формулаларды алдымен қолмен Python-да жазасыз, сосын дайын функциялармен салыстырасыз.',
  lessons: [
    {
      id: 'st-1', title: 'Таралу және гистограмма', minutes: 10,
      body: `
<p><b>Таралу</b> (distribution) — мәндердің қалай орналасқаны: қай мәндер жиі, қайсысы сирек. Оны көрудің ең қарапайым жолы — <b>жиілік кестесі</b> және <b>гистограмма</b>.</p>
<p>Гистограмма мәндерді тең аралықтарға (bins) бөледі де, әр аралықтағы мәндер санын баған биіктігімен көрсетеді.</p>
<pre><code>scores = [55, 62, 68, 71, 74, 75, 78, 81, 85, 93]
# аралықтар: 50–59, 60–69, 70–79, 80–89, 90–99
bins = {}
for s in scores:
    start = s // 10 * 10        # 74 → 70
    bins[start] = bins.get(start, 0) + 1
print(bins)   # {50: 1, 60: 2, 70: 4, 80: 2, 90: 1}</code></pre>
<h3>Таралу пішіні</h3>
<ul>
<li><b>Симметриялы</b>: екі жағы бірдей, орташа ≈ медиана.</li>
<li><b>Оңға қисайған</b> (right skew): ұзын «құйрық» оң жақта. Жалақы, тапсырыс сомасы осындай: орташа &gt; медиана.</li>
<li><b>Солға қисайған</b>: құйрық сол жақта, орташа &lt; медиана.</li>
</ul>
<div class="tip">Кез келген жаңа деректі алғанда, алдымен гистограммасын қараңыз. Орташаны есептеу одан кейін.</div>`,
      exercises: [
        { type: 'python', xp: 15, prompt: '<code>ages</code> тізімі үшін 10 жылдық аралықтар бойынша жиілік сөздігін <code>bins</code> құрыңыз (кілт — аралықтың басы, мысалы 20, 30). Сосын <code>bins</code>-ті шығарыңыз.', starter: 'ages = [23, 35, 31, 42, 28, 39, 51, 33, 26, 45, 37, 29]\nbins = {}\n', solution: 'ages = [23, 35, 31, 42, 28, 39, 51, 33, 26, 45, 37, 29]\nbins = {}\nfor a in ages:\n    start = a // 10 * 10\n    bins[start] = bins.get(start, 0) + 1\nprint(bins)', check: { tests: 'assert bins == {20: 4, 30: 5, 40: 2, 50: 1}, "bins дұрыс емес: әр аралықтағы санды тексеріңіз (a // 10 * 10)"' }, hints: ['<code>a // 10 * 10</code> аралықтың басын береді.', '<code>bins[start] = bins.get(start, 0) + 1</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Тапсырыс сомаларының орташасы 18 000 ₸, медианасы 9 000 ₸. Таралу қандай?', options: ['Симметриялы', 'Оңға қисайған: бірнеше өте үлкен тапсырыс бар', 'Солға қисайған', 'Анықтау мүмкін емес'], answer: 1, explain: 'Орташа медианадан әлдеқайда жоғары болса, оң жақта ұзын құйрық бар.' }
      ]
    },
    {
      id: 'st-2', title: 'Орталық көрсеткіштер Python-да', minutes: 12,
      body: `
<p>Math refresher-да орташа мен медиананы қолмен есептедік. Енді оларды функция ретінде жазамыз.</p>
<pre><code>def mean(xs):
    return sum(xs) / len(xs)

def median(xs):
    s = sorted(xs)
    n = len(s)
    mid = n // 2
    if n % 2 == 1:
        return s[mid]
    return (s[mid - 1] + s[mid]) / 2</code></pre>
<p>Python-да дайын <code>statistics</code> модулі бар: <code>statistics.mean</code>, <code>median</code>, <code>mode</code>. Нақты жұмыста соларды (немесе pandas-ты) қолданасыз, бірақ ішінде не болып жатқанын білу маңызды.</p>
<pre><code>import statistics
statistics.median([3, 1, 2, 10])   # 2.5</code></pre>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>median(xs)</code> функциясын <code>statistics</code>-сіз жазыңыз. Тақ және жұп ұзындықты тізімде дұрыс жұмыс істеуі керек.', starter: 'def median(xs):\n    pass\n', solution: 'def median(xs):\n    s = sorted(xs)\n    n = len(s)\n    mid = n // 2\n    if n % 2 == 1:\n        return s[mid]\n    return (s[mid - 1] + s[mid]) / 2', check: { tests: 'assert median([5, 1, 3]) == 3, "median([5, 1, 3]) = 3 болуы керек"\nassert median([4, 1, 3, 2]) == 2.5, "Жұп ұзындықта ортадағы екі мәннің орташасы: median([4, 1, 3, 2]) = 2.5"\nassert median([7]) == 7, "Бір мәнді тізім"', mustInclude: ['def median'] }, hints: ['Алдымен <code>sorted(xs)</code>.', 'Жұп болса: <code>(s[mid - 1] + s[mid]) / 2</code>'] },
        { type: 'python', xp: 15, prompt: '<code>statistics</code> модулімен <code>salaries</code> тізімінің орташасын <code>avg</code>, медианасын <code>med</code> айнымалысына жазыңыз. Сосын <code>print(avg, med)</code>.', starter: 'import statistics\nsalaries = [300, 320, 350, 400, 2500]\n', solution: 'import statistics\nsalaries = [300, 320, 350, 400, 2500]\navg = statistics.mean(salaries)\nmed = statistics.median(salaries)\nprint(avg, med)', check: { tests: 'assert avg == 774, "avg = 774 болуы керек"\nassert med == 350, "med = 350 болуы керек"', stdout: true }, hints: ['<code>statistics.mean(...)</code>, <code>statistics.median(...)</code>'] }
      ]
    },
    {
      id: 'st-3', title: 'Шашыраңқылық: дисперсия және стандартты ауытқу', minutes: 14,
      body: `
<p>Екі дүкеннің орташа күндік сатылымы 100 болуы мүмкін, бірақ біреуінде күн сайын 95–105, екіншісінде 20–180. Айырмашылықты <b>шашыраңқылық</b> көрсеткіштері өлшейді.</p>
<ul>
<li><b>Ауқым</b> (range) = max − min. Қарапайым, бірақ бір шеткі мәнге тәуелді.</li>
<li><b>Дисперсия</b> (variance) — орташадан ауытқулар квадраттарының орташасы.</li>
<li><b>Стандартты ауытқу</b> (standard deviation, SD) = √дисперсия. Бірлігі деректің өзімен бірдей.</li>
</ul>
<p>Қарапайым түсінік: SD — «мәндер орташадан әдетте қаншаға алыстайды» деген сан. Бірінші дүкенде SD кіші, екіншісінде үлкен.</p>
<h3>Қадамдап мысал</h3>
<p>Мәндер: 2, 4, 6, 8. Орташа = (2 + 4 + 6 + 8) / 4 = 5.</p>
<table>
<tr><th>x</th><th>x − орташа</th><th>(x − орташа)²</th></tr>
<tr><td>2</td><td>−3</td><td>9</td></tr>
<tr><td>4</td><td>−1</td><td>1</td></tr>
<tr><td>6</td><td>1</td><td>1</td></tr>
<tr><td>8</td><td>3</td><td>9</td></tr>
<tr><td><b>Қосынды</b></td><td>0</td><td>20</td></tr>
</table>
<ol>
<li>Ауытқулардың қосындысы әрқашан 0: плюстер мен минустер бірін-бірі жояды. Сондықтан оларды квадратқа шығарамыз.</li>
<li>Таңдама дисперсиясы: 20 / (4 − 1) ≈ 6.67.</li>
<li>Таңдама SD: √6.67 ≈ 2.58.</li>
<li>Салыстыру үшін популяция формуласы: 20 / 4 = 5, SD = √5 ≈ 2.24.</li>
</ol>
<h3>Таңдама формуласы</h3>
<pre><code>def sample_var(xs):
    m = sum(xs) / len(xs)
    return sum((x - m) ** 2 for x in xs) / (len(xs) - 1)</code></pre>
<p>Неге <code>n − 1</code>? Біз әдетте барлық популяцияны емес, оның <b>таңдамасын</b> (sample) көреміз. <code>n − 1</code>-ге бөлу таңдамадан популяция дисперсиясын жүйелі түрде кем бағаламауға көмектеседі. <code>statistics.variance</code> және <code>statistics.stdev</code> осы формуланы қолданады, ал <code>pvariance</code> мен <code>pstdev</code> <code>n</code>-ге бөледі.</p>
<pre><code>import statistics
statistics.variance([2, 4, 6, 8])   # 6.666...
statistics.stdev([2, 4, 6, 8])      # 2.58...
statistics.pstdev([2, 4, 6, 8])     # 2.23...</code></pre>
<div class="tip"><b>Жиі қателер:</b> (1) <code>n</code> мен <code>n − 1</code>-ді шатастыру: таңдама үшін <code>n − 1</code>. (2) Дисперсияда тоқтап қалу: дисперсияның бірлігі квадрат (теңге²), SD алу үшін түбір керек (<code>math.sqrt</code> не <code>** 0.5</code>). (3) Квадраттың орнына ауытқуларды жай қосу: нәтиже әрқашан 0 болады.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>sample_std(xs)</code> функциясын жазыңыз: таңдама стандартты ауытқуы (<code>n − 1</code> формуласы). <code>math.sqrt</code> қолдануға болады, <code>statistics</code> болмайды.', starter: 'import math\n\ndef sample_std(xs):\n    pass\n', solution: 'import math\n\ndef sample_std(xs):\n    m = sum(xs) / len(xs)\n    return math.sqrt(sum((x - m) ** 2 for x in xs) / (len(xs) - 1))', check: { tests: 'import statistics as _st\nfor _xs in ([2, 4, 4, 4, 5, 5, 7, 9], [10, 12, 23, 23, 16, 23, 21, 16], [1, 2]):\n    assert abs(sample_std(_xs) - _st.stdev(_xs)) < 1e-9, f"sample_std({_xs}) = {_st.stdev(_xs):.4f} болуы керек: n − 1-ге бөлдіңіз бе?"', mustInclude: ['def sample_std'] }, hints: ['Алдымен орташа <code>m</code>.', '<code>sum((x - m) ** 2 for x in xs) / (len(xs) - 1)</code>, сосын түбір.'] },
        { type: 'number', xp: 15, prompt: 'Мәндер: 2, 4, 6. Таңдама дисперсиясы (n − 1) қанша?', answer: 4, tol: 0.001, explain: 'Орташа 4. Ауытқулар квадраттары: 4, 0, 4. Қосындысы 8, 8 / (3 − 1) = 4.' }
      ]
    },
    {
      id: 'st-4', title: 'Перцентильдер, IQR және шеткі мәндер', minutes: 14,
      body: `
<p><b>Перцентиль</b> — мәндердің белгілі бір пайызы одан төмен жатқан нүкте. 50-перцентиль = медиана. 25- және 75-перцентильдер — <b>Q1</b> және <b>Q3</b> квартильдері.</p>
<p><b>IQR</b> (interquartile range) = Q3 − Q1. Бұл ортадағы 50% деректің ені, шеткі мәндерге сезімтал емес.</p>
<h3>Шеткі мәндер ережесі (Tukey)</h3>
<pre><code>low  = Q1 - 1.5 * IQR
high = Q3 + 1.5 * IQR
# low-дан кіші немесе high-тан үлкен мәндер — outlier</code></pre>
<p>Python-да квартильдер:</p>
<pre><code>import statistics
q1, q2, q3 = statistics.quantiles(data, n=4)</code></pre>
<div class="tip">Outlier әрқашан «қате» емес. Ол алаяқтық, ірі клиент немесе енгізу қатесі болуы мүмкін. Алдымен себебін анықтаңыз, сосын ғана алып тастаңыз.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>find_outliers(data)</code> функциясын жазыңыз: Tukey ережесі бойынша шеткі мәндер тізімін бастапқы ретімен қайтарсын. Квартильдер үшін <code>statistics.quantiles(data, n=4)</code> қолданыңыз.', starter: 'import statistics\n\ndef find_outliers(data):\n    pass\n', solution: 'import statistics\n\ndef find_outliers(data):\n    q1, _, q3 = statistics.quantiles(data, n=4)\n    iqr = q3 - q1\n    low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\n    return [x for x in data if x < low or x > high]', check: { tests: 'assert find_outliers([10, 12, 11, 13, 12, 95, 11, 10, 12]) == [95], "95 шеткі мән болуы керек"\nassert find_outliers([1, 2, 3, 4, 5]) == [], "Бұл тізімде шеткі мән жоқ"\nassert find_outliers([-40, 20, 21, 22, 23, 24, 25, 90]) == [-40, 90], "Екі жақтағы шеткі мәндерді де табыңыз, бастапқы ретімен"', mustInclude: ['quantiles'] }, hints: ['<code>q1, _, q3 = statistics.quantiles(data, n=4)</code>', 'List comprehension: <code>[x for x in data if x &lt; low or x &gt; high]</code>'] },
        { type: 'number', xp: 10, prompt: 'Q1 = 40, Q3 = 60. Жоғарғы шекара (Q3 + 1.5 × IQR) қанша?', answer: 90, tol: 0.001, explain: 'IQR = 20, 60 + 1.5 × 20 = 90.' }
      ]
    },
    {
      id: 'st-5', title: 'Z-score және стандарттау', minutes: 11,
      body: `
<p>Бойыңыз 180 см. Бұл көп пе? Баскетбол командасында — аз, балабақшада — өте көп. Санның өзі емес, оның <b>өз тобындағы орны</b> маңызды. Z-score дәл осыны өлшейді.</p>
<p><b>Z-score</b> мәннің орташадан неше стандартты ауытқу қашық екенін көрсетеді:</p>
<pre><code>z = (x - mean) / sd</code></pre>
<p>z = 0 — дәл орташа, z = 2 — орташадан 2 SD жоғары, z = −1 — 1 SD төмен. Бірлігі жоқ, сондықтан әртүрлі шкаладағы мәндерді салыстыруға болады: «математикадан 85 ұпай» мен «жүгіруден 12.4 секунд» қайсысы жақсырақ нәтиже?</p>
<p>Жауап: математика орташасы 70, SD 10 болса, z = (85 − 70) / 10 = 1.5. Жүгіру орташасы 13.0 с, SD 0.4 болса, z = (12.4 − 13.0) / 0.4 = −1.5. Жүгіруде аз уақыт жақсы, сондықтан −1.5 те «орташадан 1.5 SD жақсы» дегенді білдіреді. Екі нәтиже бірдей күшті.</p>
<h3>Қадамдап мысал</h3>
<p>Мәндер: 53, 59, 60, 61, 67. Орташа = 300 / 5 = 60. Ауытқулар квадраттарының қосындысы: 49 + 1 + 0 + 1 + 49 = 100. Таңдама SD = √(100 / 4) = √25 = 5.</p>
<table>
<tr><th>x</th><th>x − 60</th><th>z = (x − 60) / 5</th></tr>
<tr><td>53</td><td>−7</td><td>−1.4</td></tr>
<tr><td>59</td><td>−1</td><td>−0.2</td></tr>
<tr><td>60</td><td>0</td><td>0.0</td></tr>
<tr><td>61</td><td>1</td><td>0.2</td></tr>
<tr><td>67</td><td>7</td><td>1.4</td></tr>
</table>
<p>Байқаңыз: z-score-тардың қосындысы 0, ал олардың SD-і 1. Бұл кез келген деректе солай болады.</p>
<p>Python-да орташа мен SD-ді <code>statistics.mean</code> және <code>statistics.stdev</code> береді. Сосын әр мәнге формуланы list comprehension арқылы қолданасыз.</p>
<p>Барлық мәндерді z-score-ға айналдыру <b>стандарттау</b> деп аталады. Бұл кейін ML-де (StandardScaler) жиі керек болады.</p>
<div class="tip">Қалыпты таралуда |z| &gt; 3 өте сирек кездеседі, сондықтан оны да шеткі мәнді табу үшін қолданады.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>stdev</code> (таңдама, <code>n − 1</code>) мен <code>pstdev</code> (<code>n</code>) шатастыру: z-score сәл өзгеше шығады. Тапсырмада қайсысы айтылса, соны алыңыз.</li>
<li>Таңбаны ұмыту: z = −2 «нашар» емес, жай «орташадан төмен». Жақсы ма, жаман ба — метрикаға байланысты.</li>
<li>Барлық мәндер бірдей болса, SD = 0, ал нөлге бөлуге болмайды.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>zscores(xs)</code> функциясын жазыңыз: әр мәннің z-score тізімін қайтарсын. SD үшін <code>statistics.stdev</code> (таңдама) қолданыңыз.', starter: 'import statistics\n\ndef zscores(xs):\n    pass\n', solution: 'import statistics\n\ndef zscores(xs):\n    m = statistics.mean(xs)\n    sd = statistics.stdev(xs)\n    return [(x - m) / sd for x in xs]', check: { tests: 'import statistics as _st\n_r = zscores([2, 4, 6])\nassert isinstance(_r, list) and len(_r) == 3, "3 мәнді тізім қайтарыңыз"\nassert all(abs(a - b) < 1e-9 for a, b in zip(_r, [-1.0, 0.0, 1.0])), "zscores([2, 4, 6]) = [-1.0, 0.0, 1.0] болуы керек"\n_r2 = zscores([10, 20, 30, 40, 100])\nassert abs(sum(_r2)) < 1e-9, "z-score-тардың қосындысы 0 болуы керек"' }, hints: ['<code>m = statistics.mean(xs)</code>, <code>sd = statistics.stdev(xs)</code>', '<code>[(x - m) / sd for x in xs]</code>'] },
        { type: 'number', xp: 10, prompt: 'Емтихан орташасы 70, SD = 8. Студент 86 алды. Оның z-score-ы қанша?', answer: 2, tol: 0.001, explain: '(86 − 70) / 8 = 2.' }
      ]
    },
    {
      id: 'st-6', title: 'Корреляция', minutes: 14,
      body: `
<p>Екі адам қатар жүр деп елестетіңіз. Біреуі алға шықса, екіншісі де алға шыға ма? Әрдайым солай болса — олар «бірге қозғалады». Корреляция екі санның осылай бірге қозғалатынын өлшейді.</p>
<p><b>Корреляция</b> (Пирсон коэффициенті, r) екі айнымалының сызықтық байланысын −1-ден 1-ге дейінгі санмен өлшейді.</p>
<table>
<tr><th>r</th><th>Мағынасы</th></tr>
<tr><td>≈ 1</td><td>күшті оң байланыс: біреуі өссе, екіншісі де өседі</td></tr>
<tr><td>≈ 0</td><td>сызықтық байланыс жоқ</td></tr>
<tr><td>≈ −1</td><td>күшті теріс байланыс</td></tr>
</table>
<pre><code>def pearson(x, y):
    mx, my = sum(x) / len(x), sum(y) / len(y)
    cov = sum((a - mx) * (b - my) for a, b in zip(x, y))
    sx = sum((a - mx) ** 2 for a in x) ** 0.5
    sy = sum((b - my) ** 2 for b in y) ** 0.5
    return cov / (sx * sy)</code></pre>
<p>Идея: әр жұпта екі ауытқуды көбейтеміз. Екеуі де орташадан жоғары (не екеуі де төмен) болса, көбейтінді оң. Біреуі жоғары, біреуі төмен болса — теріс. Қосынды оң болса, байланыс оң. Сосын <code>sx × sy</code>-ке бөліп, нәтижені −1…1 аралығына келтіреміз.</p>
<h3>Қадамдап мысал</h3>
<p>Жарнамаға кеткен ақша <code>x</code> және сатылым <code>y</code> (5 апта): x = 1, 2, 3, 4, 5; y = 2, 4, 5, 4, 5. Орташалар: mx = 3, my = 4.</p>
<table>
<tr><th>x</th><th>y</th><th>x − 3</th><th>y − 4</th><th>көбейтінді</th></tr>
<tr><td>1</td><td>2</td><td>−2</td><td>−2</td><td>4</td></tr>
<tr><td>2</td><td>4</td><td>−1</td><td>0</td><td>0</td></tr>
<tr><td>3</td><td>5</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>4</td><td>4</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>5</td><td>5</td><td>2</td><td>1</td><td>2</td></tr>
</table>
<ol>
<li><code>cov</code> = 4 + 0 + 0 + 0 + 2 = 6.</li>
<li><code>sx</code> = √(4 + 1 + 0 + 1 + 4) = √10 ≈ 3.16.</li>
<li><code>sy</code> = √(4 + 0 + 1 + 0 + 1) = √6 ≈ 2.45.</li>
<li>r = 6 / (3.16 × 2.45) ≈ 0.77 — едәуір күшті оң байланыс.</li>
</ol>
<p>Python 3.10+ нұсқасында дайын функция бар: <code>statistics.correlation(x, y)</code>. Ол да осы мысалда ≈ 0.77 береді.</p>
<h3>Корреляция ≠ себеп</h3>
<p>Балмұздақ сатылымы мен суға батып кетулер корреляцияланады, бірақ біреуі екіншісін тудырмайды: екеуінің де себебі — ыстық ауа райы (<b>confounder</b>). Себепті дәлелдеу үшін эксперимент (A/B тест) керек, оны Phase 4-те өтесіз.</p>
<div class="tip"><b>Жиі қателер:</b> (1) r-ды себеп деп оқу (жоғарыдағы балмұздақ мысалы). (2) r ≈ 0 болса, «байланыс мүлде жоқ» деп ойлау. r тек <b>түзу сызықты</b> байланысты көреді: x = −2, −1, 0, 1, 2 және y = x² болса, y толық x-ке тәуелді, бірақ r = 0. (3) Шеткі мәндерді тексермеу: бір ғана outlier r-ды қатты өзгертеді. Сондықтан алдымен scatter plot салыңыз.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>pearson(x, y)</code> функциясын жазыңыз. <code>statistics.correlation</code>-ды қолданбаңыз.', starter: 'def pearson(x, y):\n    pass\n', solution: 'def pearson(x, y):\n    mx, my = sum(x) / len(x), sum(y) / len(y)\n    cov = sum((a - mx) * (b - my) for a, b in zip(x, y))\n    sx = sum((a - mx) ** 2 for a in x) ** 0.5\n    sy = sum((b - my) ** 2 for b in y) ** 0.5\n    return cov / (sx * sy)', check: { tests: 'import statistics as _st\nassert abs(pearson([1, 2, 3], [2, 4, 6]) - 1) < 1e-9, "Толық оң байланыс: r = 1"\nassert abs(pearson([1, 2, 3], [6, 4, 2]) + 1) < 1e-9, "Толық теріс байланыс: r = -1"\n_x, _y = [10, 20, 30, 40, 50], [12, 25, 29, 48, 51]\nassert abs(pearson(_x, _y) - _st.correlation(_x, _y)) < 1e-9, "Нақты деректе r дұрыс емес"', mustInclude: ['def pearson'] }, hints: ['Сабақтағы формула: ковариация / (sx × sy).'] },
        { type: 'quiz', xp: 10, prompt: 'Қала аудандарында кафе саны мен пәтер бағасы арасында r = 0.8. Қай қорытынды дұрыс?', options: ['Кафе ашсаң, пәтер қымбаттайды', 'Екеуі бірге өседі, бірақ себебі басқа фактор (мысалы, орталыққа жақындық) болуы мүмкін', 'Байланыс жоқ', 'Пәтер қымбаттаса, кафелер жабылады'], answer: 1, explain: 'Корреляция байланысты көрсетеді, себепті емес. Ортақ себеп (confounder) жиі кездеседі.' }
      ]
    },
    {
      id: 'st-7', title: 'Қалыпты таралу және 68–95–99.7 ережесі', minutes: 10,
      body: `
<p><b>Қалыпты таралу</b> (normal distribution) — «қоңырау» пішінді симметриялы таралу. Бой, өлшеу қателері, көп кездейсоқ факторлардың қосындысы осындай болады.</p>
<p>Оның ең пайдалы қасиеті — <b>68–95–99.7 ережесі</b>:</p>
<ul>
<li>мәндердің ≈68%-ы орташадан ±1 SD аралығында,</li>
<li>≈95%-ы ±2 SD аралығында,</li>
<li>≈99.7%-ы ±3 SD аралығында.</li>
</ul>
<p>Мысал: IQ орташасы 100, SD = 15. Адамдардың шамамен 95%-ының IQ-ы 70 мен 130 аралығында.</p>
<p>Неге бой қалыпты таралады? Оған жүздеген кіші фактор әсер етеді: гендер, тамақ, ұйқы, спорт. Әрқайсысы бойды сәл қосады не сәл азайтады. Көп кездейсоқ «қосу-азайту» жиналғанда, мәндердің көбі ортаға жиналады да, шеттер сирек болады. Ал жалақы мен сатып алу сомасы төменнен 0-мен шектелген, жоғарыдан шексіз созылады, сондықтан симметриялы емес.</p>
<h3>Қадамдап мысал</h3>
<p>Әйелдердің бойы: орташа 165 см, SD = 6 см. Аралықтарды есептейміз:</p>
<table>
<tr><th>Аралық</th><th>Есептеу</th><th>Шекаралар</th><th>Ішінде</th></tr>
<tr><td>±1 SD</td><td>165 ± 6</td><td>159–171 см</td><td>≈68%</td></tr>
<tr><td>±2 SD</td><td>165 ± 12</td><td>153–177 см</td><td>≈95%</td></tr>
<tr><td>±3 SD</td><td>165 ± 18</td><td>147–183 см</td><td>≈99.7%</td></tr>
</table>
<p>Енді «неше пайызы 177 см-ден биік?» деген сұрақ. 177 = орташа + 2 SD. Ішкі аралықта 95%, сыртында 100 − 95 = 5%. Таралу симметриялы, сондықтан бұл 5% екі «құйрыққа» тең бөлінеді: 2.5% төменде (153-тен аласа), 2.5% жоғарыда (177-ден биік).</p>
<p>Дәл осылай: 171 см-ден биіктер — (100 − 68) / 2 = 16%. Бұл z-score-пен байланысты: z = 1 нүктесінен жоғары ≈16%, z = 2 нүктесінен жоғары ≈2.5%.</p>
<div class="tip">Барлық дерек қалыпты емес. Жалақы, табыс, сайттағы уақыт әдетте оңға қисайған. Бұл ережені гистограммасын көрмей қолданбаңыз.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Бір жақты сұраққа сыртқы пайызды бөлмей жауап беру: «2 SD-ден жоғары» 5% емес, 2.5%.</li>
<li>Ережені қисайған дерекке (жалақы, күніне тапсырыс саны, көбі 0) қолдану.</li>
<li>68/95/99.7 сандарын дәл деп ойлау. Бұл жуық мәндер (дәлірек 68.3%, 95.4%, 99.7%).</li>
</ul>`,
      exercises: [
        { type: 'number', xp: 10, prompt: 'Жеткізу уақыты қалыпты таралған: орташа 40 мин, SD 5 мин. Тапсырыстардың шамамен неше пайызы 35–45 мин аралығында жеткізіледі?', answer: 68, tol: 0.5, unit: '%', explain: '35–45 = орташа ± 1 SD, яғни ≈68%.' },
        { type: 'number', xp: 15, prompt: 'Сол деректе (орташа 40, SD 5) тапсырыстардың шамамен неше пайызы 50 минуттан ұзақ жеткізіледі?', answer: 2.5, tol: 0.05, unit: '%', explain: '30–50 = ± 2 SD, ішінде 95%. Сыртында 5%, ол екі жаққа тең бөлінеді: 2.5%.' },
        { type: 'quiz', xp: 10, prompt: 'Қай деректің қалыпты таралуы ең ықтимал?', options: ['Қызметкерлердің жалақысы', 'Ересек әйелдердің бойы', 'Сайтқа келгендердің сатып алу сомасы', 'Бір күндегі тапсырыстар саны (көбі 0)'], answer: 1, explain: 'Бой көп факторлардың қосындысы, симметриялы. Қалғандары оңға қисайған.' }
      ]
    },
    {
      id: 'st-8', title: 'Таңдама, bias және Симпсон парадоксы', minutes: 12,
      body: `
<p>Біз сирек бүкіл <b>популяцияны</b> көреміз. Көбіне <b>таңдамамен</b> (sample) жұмыс істейміз, сондықтан таңдама популяцияға ұқсас болуы керек.</p>
<h3>Жиі кездесетін bias түрлері</h3>
<ul>
<li><b>Selection bias</b>: таңдама кездейсоқ емес. Мысалы, сауалнаманы тек Instagram жазылушыларына жіберу.</li>
<li><b>Survivorship bias</b>: тек «аман қалғандарды» көру. Жабылған стартаптар туралы дерек жоқ, сондықтан табысты стартаптардың ортақ белгілері алдамшы.</li>
<li><b>Non-response bias</b>: сауалнамаға тек қатты риза немесе қатты наразы адамдар жауап береді.</li>
</ul>
<h3>Симпсон парадоксы</h3>
<p>Топтар бойынша бір бағыт, ал жалпы деректе кері бағыт көрінуі мүмкін.</p>
<table>
<tr><th></th><th>A емдеу</th><th>B емдеу</th></tr>
<tr><td>Жеңіл жағдай</td><td>81/87 = 93%</td><td>234/270 = 87%</td></tr>
<tr><td>Ауыр жағдай</td><td>192/263 = 73%</td><td>55/80 = 69%</td></tr>
<tr><td><b>Барлығы</b></td><td><b>273/350 = 78%</b></td><td><b>289/350 = 83%</b></td></tr>
</table>
<p>Әр топта A жақсы, бірақ жалпыда B жақсы көрінеді. Себебі A ауыр жағдайларға жиі берілген. Сабақ: салыстыру алдында топтардың құрамын тексеріңіз.</p>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Банк қосымшасының пікірлерін тек App Store-дағы 5 жұлдызды пікірлерден талдадыңыз. Бұл қандай bias?', options: ['Survivorship bias', 'Selection bias', 'Confounder', 'Bias жоқ'], answer: 1, explain: 'Таңдама әдейі бір топтан алынды, сондықтан ол барлық пайдаланушыларды көрсетпейді.' },
        { type: 'quiz', xp: 10, prompt: 'Екінші дүниежүзілік соғыста қайтып оралған ұшақтардың оқ тиген жерлерін күшейту ұсынылды. Неге бұл қате?', options: ['Оқ тиген жерлер маңызды емес', 'Бұл survivorship bias: құлаған ұшақтарға оқ басқа жерлерге тиген', 'Ұшақтар аз болды', 'Корреляция себеп емес'], answer: 1, explain: 'Оралған ұшақтар «аман қалғандар». Құлағандары туралы дерек жоқ, ал әлсіз жерлер дәл солар.' },
        { type: 'quiz', xp: 15, prompt: 'Симпсон парадоксы кестесінде неге B жалпы жақсы көрінеді?', options: ['B шынымен жақсы', 'B жеңіл жағдайларға жиі берілген, ал жеңіл жағдайда сауығу жоғары', 'Кестеде қате бар', 'A қымбат'], answer: 1, explain: 'Топ құрамы әртүрлі: B-ның 270/350 пациенті жеңіл топта.' }
      ]
    },
    {
      id: 'st-9', title: 'SQL-де сипаттамалық статистика', minutes: 12,
      body: `
<p>Көп жағдайда статистиканы деректі Python-ға жүктемей, дерекқордың ішінде есептеген ыңғайлы.</p>
<pre><code>SELECT department,
  COUNT(*) AS n, AVG(salary) AS avg_salary,
  MIN(salary) AS min_salary, MAX(salary) AS max_salary
FROM employees
GROUP BY department;</code></pre>
<h3>Дисперсия SQL-де</h3>
<p>SQLite-та <code>STDDEV</code> жоқ, бірақ популяция дисперсиясын формуламен есептеуге болады: <code>AVG(x*x) - AVG(x)*AVG(x)</code>.</p>
<h3>Медиана SQL-де</h3>
<p>Медиана үшін мәндерді сұрыптап, ортадағысын алу керек. PostgreSQL-де <code>PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary)</code> бар. SQLite-та <code>ORDER BY ... LIMIT ... OFFSET</code> арқылы ортадағы жолдарды аламыз.</p>`,
      exercises: [
        { type: 'sql', dataset: 'staff', xp: 15, prompt: 'Әр бөлім үшін <code>department</code>, <code>n</code> (саны), <code>avg_salary</code>, <code>min_salary</code>, <code>max_salary</code> шығарыңыз.', starter: '', solution: 'SELECT department, COUNT(*) AS n, AVG(salary) AS avg_salary, MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees GROUP BY department;', hints: ['Сабақтағы мысал.'] },
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Барлық қызметкерлер жалақысының <b>медианасын</b> бір мәнмен шығарыңыз (12 қызметкер: сұрыпталған тізімдегі 6- және 7-мәндердің орташасы).', starter: 'SELECT AVG(salary) FROM (\n  \n);', solution: 'SELECT AVG(salary) FROM (SELECT salary FROM employees ORDER BY salary LIMIT 2 OFFSET 5);', hints: ['<code>ORDER BY salary LIMIT 2 OFFSET 5</code> 6- және 7-жолдарды береді.'] },
        { type: 'sql', dataset: 'staff', xp: 20, prompt: 'Әр бөлімнің жалақысының популяция дисперсиясын шығарыңыз: <code>department</code>, <code>var</code> (<code>AVG(salary*salary) - AVG(salary)*AVG(salary)</code>).', starter: '', solution: 'SELECT department, AVG(salary * salary) - AVG(salary) * AVG(salary) AS var FROM employees GROUP BY department;', hints: ['Формула сабақта берілген, <code>GROUP BY department</code> қосыңыз.'] }
      ]
    },
    {
      id: 'st-gate', gate: true, title: 'Модуль емтиханы: Descriptive Statistics', minutes: 25,
      body: `
<p>Қорытынды тексеріс. Python тапсырмаларында тек стандарт кітапхана (<code>statistics</code>, <code>math</code>) қолжетімді.</p>`,
      exercises: [
        { type: 'python', xp: 40, prompt: '<code>describe(xs)</code> функциясын жазыңыз. Ол <code>mean</code>, <code>median</code>, <code>std</code> (таңдама), <code>min</code>, <code>max</code>, <code>iqr</code> кілттері бар сөздік қайтарсын. IQR үшін <code>statistics.quantiles(xs, n=4)</code>.', starter: 'import statistics\n\ndef describe(xs):\n    pass\n', solution: 'import statistics\n\ndef describe(xs):\n    q1, _, q3 = statistics.quantiles(xs, n=4)\n    return {"mean": statistics.mean(xs), "median": statistics.median(xs), "std": statistics.stdev(xs), "min": min(xs), "max": max(xs), "iqr": q3 - q1}', check: { tests: 'import statistics as _st\n_xs = [12, 15, 11, 20, 18, 14, 13, 40]\n_d = describe(_xs)\nassert isinstance(_d, dict), "Сөздік қайтарыңыз"\nfor _k in ("mean", "median", "std", "min", "max", "iqr"):\n    assert _k in _d, f"{_k} кілті жоқ"\n_q = _st.quantiles(_xs, n=4)\n_exp = {"mean": _st.mean(_xs), "median": _st.median(_xs), "std": _st.stdev(_xs), "min": 11, "max": 40, "iqr": _q[2] - _q[0]}\nfor _k, _v in _exp.items():\n    assert abs(_d[_k] - _v) < 1e-9, f"{_k} дұрыс емес: {_v:.4f} күтілді"' }, hints: [] },
        { type: 'python', xp: 30, prompt: '<code>sales</code> тізімінде z-score-ының абсолют мәні 2-ден үлкен мәндерді <code>unusual</code> тізіміне бастапқы ретімен жинаңыз (SD: <code>statistics.stdev</code>). Сосын оны шығарыңыз.', starter: 'import statistics\nsales = [102, 98, 105, 97, 101, 99, 160, 103, 100, 96]\n', solution: 'import statistics\nsales = [102, 98, 105, 97, 101, 99, 160, 103, 100, 96]\nm = statistics.mean(sales)\nsd = statistics.stdev(sales)\nunusual = [x for x in sales if abs((x - m) / sd) > 2]\nprint(unusual)', check: { tests: 'assert unusual == [160], "unusual = [160] болуы керек"', stdout: true }, hints: [] },
        { type: 'quiz', xp: 20, prompt: 'Клиенттердің айлық шығыны қатты оңға қисайған. Есепте «әдеттегі клиентті» сипаттау үшін не көрсеткен дұрыс?', options: ['Орташа мен SD', 'Медиана мен IQR', 'Тек максимум', 'Мода ғана'], answer: 1, explain: 'Қисайған деректе медиана мен IQR шеткі мәндерге төзімді.' },
        { type: 'number', xp: 20, prompt: 'Мәндер: 1, 2, 3, 4, 5. Таңдама дисперсиясы (n − 1) қанша?', answer: 2.5, tol: 0.001, explain: 'Орташа 3. Квадраттар: 4, 1, 0, 1, 4 = 10. 10 / 4 = 2.5.' }
      ]
    }
  ]
};
