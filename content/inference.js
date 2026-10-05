// M4.2 Inference & A/B Testing. Python exercises use only the standard library (math, statistics incl. NormalDist, random).
DJ.datasets.ab = {
  title: 'A/B тест',
  tables: {
    assignments: 'user_id, variant, device',
    conversions: 'user_id, revenue'
  },
  sql: `
CREATE TABLE assignments (user_id INTEGER PRIMARY KEY, variant TEXT, device TEXT);
INSERT INTO assignments VALUES
 (1,'A','mobile'), (2,'A','desktop'), (3,'A','mobile'), (4,'A','desktop'), (5,'B','mobile'), (6,'B','desktop'), (7,'A','mobile'), (8,'B','desktop'),
 (9,'B','mobile'), (10,'B','mobile'), (11,'A','mobile'), (12,'A','desktop'), (13,'A','mobile'), (14,'A','mobile'), (15,'A','mobile'), (16,'A','desktop'),
 (17,'A','mobile'), (18,'B','desktop'), (19,'B','desktop'), (20,'B','mobile'), (21,'A','desktop'), (22,'A','desktop'), (23,'A','mobile'), (24,'B','mobile'),
 (25,'A','desktop'), (26,'A','desktop'), (27,'B','mobile'), (28,'B','desktop'), (29,'B','mobile'), (30,'B','mobile'), (31,'A','mobile'), (32,'B','mobile'),
 (33,'B','mobile'), (34,'B','desktop'), (35,'B','desktop'), (36,'B','mobile'), (37,'A','mobile'), (38,'A','mobile'), (39,'B','mobile'), (40,'B','desktop'),
 (41,'B','mobile'), (42,'B','mobile'), (43,'B','mobile'), (44,'A','mobile'), (45,'B','desktop'), (46,'A','desktop'), (47,'A','desktop'), (48,'A','mobile'),
 (49,'A','mobile'), (50,'A','mobile'), (51,'B','mobile'), (52,'B','desktop'), (53,'B','mobile'), (54,'A','desktop'), (55,'A','mobile'), (56,'B','mobile'),
 (57,'B','desktop'), (58,'A','mobile'), (59,'A','mobile'), (60,'B','desktop'), (61,'A','desktop'), (62,'A','mobile'), (63,'B','desktop'), (64,'B','mobile');
CREATE TABLE conversions (user_id INTEGER REFERENCES assignments(user_id), revenue INTEGER);
INSERT INTO conversions VALUES
 (2,7500), (6,7500), (11,6000), (12,6000), (13,15000), (16,6000), (18,4500), (19,12000),
 (24,7500), (39,12000), (40,9000), (42,7500), (49,15000), (51,9000), (56,7500), (57,12000);
`
};

DJ.modules['m4-2'] = {
  intro: 'Inference — шағын таңдамадан бүкіл популяция туралы сенімді қорытынды жасау. Модуль соңында A/B тестті жоспарлап, талдап, нәтижесін бизнеске түсінікті шешім ретінде жаза аласыз.',
  lessons: [
    {
      id: 'ab-1', title: 'Таңдамалық таралу және CLT', minutes: 14,
      body: `
<p>Сіз барлық клиенттің орташа чегін білгіңіз келеді, бірақ қолыңызда тек 30 клиенттің дерегі бар. Осы 30 адамның орташасы — <b>статистика</b> (statistic), ал барлық клиенттің шын орташасы — <b>параметр</b>. Басқа 30 клиентті алсаңыз, орташа сәл басқаша шығады. Таңдамалық орташа — өзі де кездейсоқ шама.</p>
<h3>Таңдамалық таралу</h3>
<p>Ойша тәжірибе: популяциядан 30 адамнан тұратын таңдаманы мың рет аламыз да, әр жолы орташаны жазамыз. Сол мың орташаның таралуы <b>таңдамалық таралу</b> (sampling distribution) деп аталады. Inference-тің бәрі осы таралуға сүйенеді.</p>
<h3>Орталық шектік теорема (CLT)</h3>
<p><b>Central Limit Theorem</b>: популяция қандай пішінде болса да (тіпті қатты оңға қисайған болса да), таңдама жеткілікті үлкен болғанда (әдетте n ≥ 30) таңдамалық орташалар шамамен <b>қалыпты</b> таралады. Оның:</p>
<ul>
<li>орташасы популяция орташасына тең (μ);</li>
<li>стандартты ауытқуы σ / √n — оны келесі сабақта <b>standard error</b> деп атаймыз.</li>
</ul>
<h3>Қадамдап мысал: симуляция</h3>
<p>Чек сомасы оңға қисайған: көбі кішкентай, кейбірі өте үлкен. Оны <code>random.expovariate</code> арқылы модельдейміз (орташасы 50 мың ₸).</p>
<pre><code>import random, statistics
random.seed(1)
means = []
for _ in range(1000):
    sample = [random.expovariate(1 / 50) for _ in range(30)]
    means.append(statistics.mean(sample))
print(statistics.mean(means))    # ≈ 50
print(statistics.stdev(means))   # ≈ 50 / √30 ≈ 9.1</code></pre>
<ol>
<li>Бір таңдама: 30 кездейсоқ чек. Оның гистограммасы қисайған.</li>
<li>Оның орташасын есептеп, тізімге қосамыз. Мұны 1000 рет қайталаймыз.</li>
<li>1000 орташаның гистограммасын салсаңыз, ол қоңырау тәрізді, симметриялы болады. Бұл — CLT.</li>
<li>Орташалардың SD-і жеке чектердің SD-інен (≈50) √30 есе кіші.</li>
</ol>
<div class="tip">CLT деректің өзін қалыпты етпейді. Ол тек <b>орташалардың</b> таралуы туралы айтады.</div>
<h3>Жиі қателер</h3>
<ul>
<li>«n = 30 болса, деректің өзі қалыпты» деп ойлау. Жоқ, қалыпты тек орташа.</li>
<li>Өте қисайған дерекке (мысалы, табыстың 99%-ы 0) n = 30 жеткілікті деп сену. Мұндай деректе n әлдеқайда үлкен болуы керек.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 20, prompt: 'Сабақтағы симуляцияны қайталаңыз: <code>random.seed(1)</code>, әрқайсысы 30 мәннен тұратын 1000 таңдама (<code>random.expovariate(1 / 50)</code>), әр таңдаманың орташасын <code>sample_means</code> тізіміне жинаңыз. Сосын орташалардың орташасы мен SD-ін шығарыңыз.', starter: 'import random, statistics\nrandom.seed(1)\nsample_means = []\n', solution: 'import random, statistics\nrandom.seed(1)\nsample_means = []\nfor _ in range(1000):\n    sample = [random.expovariate(1 / 50) for _ in range(30)]\n    sample_means.append(statistics.mean(sample))\nprint(statistics.mean(sample_means), statistics.stdev(sample_means))', check: { tests: 'import statistics as _st\nassert len(sample_means) == 1000, "sample_means ішінде 1000 орташа болуы керек"\n_m = _st.mean(sample_means)\nassert abs(_m - 50) < 3, f"Орташалардың орташасы ≈ 50 болуы керек, сізде {_m:.2f}"\n_s = _st.stdev(sample_means)\nassert abs(_s - 50 / 30 ** 0.5) < 1.5, f"Орташалардың SD-і ≈ 9.1 (50 / √30) болуы керек, сізде {_s:.2f}. Әр таңдамада 30 мән бар ма?"' }, hints: ['Сыртқы цикл 1000 рет, ішінде <code>[random.expovariate(1 / 50) for _ in range(30)]</code>.', '<code>sample_means.append(statistics.mean(sample))</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Тапсырыс сомалары қатты оңға қисайған. Әрқайсысы 100 тапсырыстан тұратын көп таңдаманың <b>орташаларын</b> алсақ, олардың таралуы қандай болады?', options: ['Дәл сондай оңға қисайған', 'Шамамен қалыпты (CLT)', 'Біркелкі (uniform)', 'Солға қисайған'], answer: 1, explain: 'CLT: n үлкен болса, популяция пішініне қарамастан таңдамалық орташалар шамамен қалыпты таралады.' }
      ]
    },
    {
      id: 'ab-2', title: 'Standard error', minutes: 12,
      body: `
<p>Өткен сабақта таңдамалық орташалардың SD-і σ / √n екенін көрдік. Бұл санның өз аты бар: <b>standard error</b> (SE, стандартты қате). SD деректің шашырауын өлшейді, ал SE <b>бағаның</b> (мысалы, орташаның) шашырауын өлшейді: «басқа таңдама алсам, орташа қаншаға өзгерер еді?»</p>
<h3>Формулалар</h3>
<table>
<tr><th>Баға</th><th>SE</th></tr>
<tr><td>Орташа</td><td>s / √n (s — таңдама SD)</td></tr>
<tr><td>Пропорция (конверсия)</td><td>√(p(1 − p) / n)</td></tr>
</table>
<p>Пропорция — орташаның ерекше жағдайы: әр пайдаланушы 1 (сатып алды) немесе 0 (алмады). M4.1-дегі Bernoulli таралуын еске түсіріңіз: оның дисперсиясы p(1 − p).</p>
<h3>Қадамдап мысал</h3>
<p>Сайтқа 400 адам кірді, 48-і сатып алды.</p>
<ol>
<li>Конверсия: p = 48 / 400 = 0.12.</li>
<li>Дисперсия: p(1 − p) = 0.12 × 0.88 = 0.1056.</li>
<li>n-ге бөлеміз: 0.1056 / 400 = 0.000264.</li>
<li>Түбір: SE = √0.000264 ≈ 0.0162, яғни ≈ 1.6 пайыздық пункт.</li>
</ol>
<p>Мағынасы: егер дәл осындай 400 адамдық таңдаманы қайта-қайта алсақ, конверсия әдетте 12% ± 1.6 п.п. шамасында ауытқыр еді.</p>
<pre><code>import math, statistics

def se_mean(xs):
    return statistics.stdev(xs) / math.sqrt(len(xs))

def se_prop(p, n):
    return math.sqrt(p * (1 - p) / n)

se_prop(0.12, 400)   # 0.01624...</code></pre>
<h3>√n заңы</h3>
<p>SE √n-ге кері пропорционал. Дәлдікті екі есе арттыру (SE-ні екі есе азайту) үшін таңдаманы <b>төрт</b> есе үлкейту керек. Сондықтан A/B тесттер кейде апталап жүреді: кішкентай айырмашылықты көру үшін көп пайдаланушы керек. Мысалы, жоғарыдағы 12% конверсияда n = 1 600 болса (төрт есе көп), SE ≈ 1.6 / 2 ≈ 0.8 п.п.-ке дейін кішірейеді.</p>
<div class="tip">SD — «клиенттер бір-бірінен қаншалықты өзгеше», SE — «менің орташам қаншалықты дәл». n өскенде SD өзгермейді, ал SE кішірейеді.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Есепте SE-нің орнына SD көрсету (немесе керісінше).</li>
<li>Пропорцияны пайызбен (12) қойып, √(12 × 88 / 400) есептеу. Формулада үлес (0.12) керек.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 20, prompt: 'Екі функция жазыңыз: <code>se_mean(xs)</code> (таңдама SD / √n) және <code>se_prop(p, n)</code> (√(p(1 − p) / n)).', starter: 'import math, statistics\n\ndef se_mean(xs):\n    pass\n\ndef se_prop(p, n):\n    pass\n', solution: 'import math, statistics\n\ndef se_mean(xs):\n    return statistics.stdev(xs) / math.sqrt(len(xs))\n\ndef se_prop(p, n):\n    return math.sqrt(p * (1 - p) / n)', check: { tests: 'assert se_mean([2, 4, 6, 8]) is not None, "se_mean мән қайтарсын"\nassert abs(se_mean([2, 4, 6, 8]) - 1.2909944) < 1e-6, "se_mean([2, 4, 6, 8]) ≈ 1.2910 болуы керек: stdev = 2.582, √4 = 2"\nassert se_prop(0.12, 400) is not None, "se_prop мән қайтарсын"\nassert abs(se_prop(0.12, 400) - 0.0162481) < 1e-6, "se_prop(0.12, 400) ≈ 0.01625 болуы керек"\nassert abs(se_prop(0.5, 100) - 0.05) < 1e-9, "se_prop(0.5, 100) = 0.05 болуы керек"', mustInclude: ['def se_mean', 'def se_prop'] }, hints: ['<code>statistics.stdev(xs) / math.sqrt(len(xs))</code>', 'p үлес түрінде (0.12), пайыз емес.'] },
        { type: 'number', xp: 15, prompt: 'Конверсия 20%, n = 1 600. Конверсияның standard error-ы неше пайыздық пункт? (екі ондық белгіге дейін)', answer: 1, tol: 0.01, unit: 'п.п.', explain: '√(0.2 × 0.8 / 1600) = √0.0001 = 0.01, яғни 1.00 п.п.' }
      ]
    },
    {
      id: 'ab-3', title: 'Сенімділік интервалы (confidence interval)', minutes: 15,
      body: `
<p>«Конверсия 12%» деген бір сан (point estimate) оның қаншалықты дәл екенін айтпайды. <b>Сенімділік интервалы</b> (confidence interval, CI) бағаның айналасына «қате шегін» қосады: <b>баға ± z × SE</b>.</p>
<h3>z қайдан шығады</h3>
<p>CLT бойынша баға шамамен қалыпты таралады. 95% интервал үшін стандартты қалыпты таралудың ортасындағы 95%-ын алатын шекара керек: екі құйрықта 2.5%-дан. Оны <code>NormalDist().inv_cdf</code> береді (cdf-тің кері функциясы: ықтималдық → z).</p>
<pre><code>from statistics import NormalDist
NormalDist().inv_cdf(0.975)   # 1.95996...  (95% CI)
NormalDist().inv_cdf(0.95)    # 1.6449      (90% CI)
NormalDist().inv_cdf(0.995)   # 2.5758      (99% CI)</code></pre>
<p>Жалпы: деңгей <code>level</code> болса, <code>z = NormalDist().inv_cdf(1 - (1 - level) / 2)</code>.</p>
<h3>Қадамдап мысал: пропорция</h3>
<p>400 келушінің 48-і сатып алды. 95% CI қандай?</p>
<ol>
<li>p = 48 / 400 = 0.12.</li>
<li>SE = √(0.12 × 0.88 / 400) ≈ 0.01625.</li>
<li>z = 1.96. Қате шегі: 1.96 × 0.01625 ≈ 0.0318.</li>
<li>CI = 0.12 ± 0.0318 = [0.088; 0.152], яғни 8.8%-дан 15.2%-ға дейін.</li>
</ol>
<h3>Орташа үшін</h3>
<pre><code>m = statistics.mean(xs)
se = statistics.stdev(xs) / math.sqrt(len(xs))
low, high = m - z * se, m + z * se</code></pre>
<p>Кішкентай таңдамада (n &lt; 30) дұрысы z-тің орнына t-таралу мәнін алу. Үлкен n-де екеуі іс жүзінде бірдей; біз стандарт кітапханамен жұмыс істейтіндіктен, z қолданамыз.</p>
<h3>Дұрыс түсіндіру</h3>
<p>«95% CI» — <b>әдіс</b> туралы мәлімдеме: осылай құрылған интервалдардың 95%-ы шын параметрді қамтиды. Нақты бір интервал не қамтиды, не қамтымайды. Іс жүзінде «шын конверсия шамамен 8.8–15.2% аралығында деп сенімдіміз» деп айту жеткілікті.</p>
<div class="tip">Интервал ені √n-ге кері пропорционал. Ені екі есе тар болсын десеңіз, төрт есе көп дерек керек.</div>
<h3>Жиі қателер</h3>
<ul>
<li>95% CI үшін <code>inv_cdf(0.95)</code> алу. Бұл 90% интервал береді: құйрықтар екеу.</li>
<li>«Деректің 95%-ы осы интервалда» деп айту. CI орташа туралы, жеке мәндер туралы емес.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>ci_prop(x, n, level=0.95)</code> функциясын жазыңыз: <code>x</code> — сатып алғандар саны, <code>n</code> — барлығы. <code>(low, high)</code> кортежін қайтарсын. z-ті <code>NormalDist().inv_cdf</code> арқылы <code>level</code>-ден есептеңіз.', starter: 'import math\nfrom statistics import NormalDist\n\ndef ci_prop(x, n, level=0.95):\n    pass\n', solution: 'import math\nfrom statistics import NormalDist\n\ndef ci_prop(x, n, level=0.95):\n    p = x / n\n    se = math.sqrt(p * (1 - p) / n)\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return (p - z * se, p + z * se)', check: { tests: '_r = ci_prop(48, 400)\nassert _r is not None and len(_r) == 2, "(low, high) кортежін қайтарыңыз"\nassert abs(_r[0] - 0.08815) < 1e-4 and abs(_r[1] - 0.15185) < 1e-4, f"ci_prop(48, 400) ≈ (0.0882, 0.1518) болуы керек, сізде {_r}"\n_r9 = ci_prop(48, 400, 0.90)\nassert abs(_r9[1] - _r9[0] - 2 * 1.644854 * 0.0162481) < 1e-4, "level=0.90 үшін z ≈ 1.645 болуы керек: inv_cdf(1 - (1 - level) / 2)"', mustInclude: ['inv_cdf'] }, hints: ['<code>z = NormalDist().inv_cdf(1 - (1 - level) / 2)</code>', 'SE = <code>math.sqrt(p * (1 - p) / n)</code>'] },
        { type: 'python', xp: 20, prompt: '<code>ci_mean(xs, level=0.95)</code> функциясын жазыңыз: орташа ± z × (stdev / √n), <code>(low, high)</code> қайтарсын.', starter: 'import math, statistics\nfrom statistics import NormalDist\n\ndef ci_mean(xs, level=0.95):\n    pass\n', solution: 'import math, statistics\nfrom statistics import NormalDist\n\ndef ci_mean(xs, level=0.95):\n    m = statistics.mean(xs)\n    se = statistics.stdev(xs) / math.sqrt(len(xs))\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return (m - z * se, m + z * se)', check: { tests: 'import statistics as _st, math as _m\n_xs = [12, 15, 11, 20, 18, 14, 13, 17, 16, 19, 10, 15]\n_r = ci_mean(_xs)\nassert _r is not None and len(_r) == 2, "(low, high) кортежін қайтарыңыз"\n_se = _st.stdev(_xs) / _m.sqrt(len(_xs))\n_mu = _st.mean(_xs)\nassert abs(_r[0] - (_mu - 1.959964 * _se)) < 1e-4 and abs(_r[1] - (_mu + 1.959964 * _se)) < 1e-4, f"95% CI ≈ ({_mu - 1.96 * _se:.3f}, {_mu + 1.96 * _se:.3f}) болуы керек, сізде {_r}"\n_r99 = ci_mean(_xs, 0.99)\nassert _r99[1] - _r99[0] > _r[1] - _r[0], "99% интервал 95% интервалдан кең болуы керек: level параметрін қолданыңыз"' }, hints: ['Алдыңғы тапсырмадағыдай, тек SE = <code>statistics.stdev(xs) / math.sqrt(len(xs))</code>.'] },
        { type: 'quiz', xp: 10, prompt: 'Орташа чектің 95% CI-ы [4 200; 4 800] ₸. Қай тұжырым дұрыс?', options: ['Клиенттердің 95%-ы 4 200–4 800 ₸ аралығында жұмсайды', 'Осы әдіспен құрылған интервалдардың 95%-ы шын орташаны қамтиды', 'Шын орташа дәл 4 500 ₸', 'Келесі клиенттің чегі 95% ықтималдықпен осы аралықта'], answer: 1, explain: 'CI — орташаны бағалау әдісінің сенімділігі. Ол жеке клиенттердің мәндері туралы емес.' }
      ]
    },
    {
      id: 'ab-4', title: 'Гипотезаны тексеру логикасы', minutes: 15,
      body: `
<p>Жаңа «Сатып алу» батырмасы конверсияны көтерді ме, әлде айырмашылық кездейсоқ па? Гипотезаны тексеру (hypothesis testing) — осы сұраққа жауап берудің стандарт тәсілі. Ол сотқа ұқсайды: «кінәсіз» деп бастаймыз да, дәлел жеткілікті болса ғана үкім шығарамыз.</p>
<h3>Қадамдар</h3>
<ol>
<li><b>H0</b> (нөлдік гипотеза): айырмашылық жоқ, мысалы p_B = p_A.</li>
<li><b>H1</b> (балама гипотеза): айырмашылық бар, p_B ≠ p_A (екі жақты).</li>
<li><b>α</b> (significance level) деректі көрмей тұрып таңдалады, әдетте 0.05.</li>
<li><b>Тест статистикасы</b>: бақыланған айырмашылық H0 кезінде күтілетіннен неше SE-ге алыс. Мысалы, z = (баға − H0 мәні) / SE.</li>
<li><b>p-value</b>: егер H0 рас болса, дәл осындай немесе одан да шеткі нәтиже алу ықтималдығы.</li>
<li>p &lt; α болса, H0-ді <b>жоққа шығарамыз</b> (reject). Әйтпесе «H0-ді жоққа шығаруға дәлел жеткіліксіз» дейміз.</li>
</ol>
<h3>Қадамдап мысал</h3>
<p>Тест статистикасы z = 2.1 шықты, α = 0.05, тест екі жақты.</p>
<ol>
<li>Бір құйрық: P(Z &gt; 2.1) = 1 − cdf(2.1) ≈ 0.0179.</li>
<li>Екі жақты болғандықтан, екі құйрықты қосамыз: p ≈ 2 × 0.0179 = 0.0357.</li>
<li>0.0357 &lt; 0.05, сондықтан H0-ді жоққа шығарамыз: айырмашылық статистикалық маңызды.</li>
</ol>
<pre><code>from statistics import NormalDist
def p_two_sided(z):
    return 2 * (1 - NormalDist().cdf(abs(z)))
p_two_sided(2.1)   # 0.0357</code></pre>
<h3>Екі түрлі қате</h3>
<table>
<tr><th></th><th>H0 шын рас</th><th>H0 шын жалған</th></tr>
<tr><td>H0-ді жоққа шығардық</td><td><b>Type I</b> (false positive), ықтималдығы α</td><td>Дұрыс шешім (power)</td></tr>
<tr><td>Жоққа шығармадық</td><td>Дұрыс шешім</td><td><b>Type II</b> (false negative), ықтималдығы β</td></tr>
</table>
<p>Type I: жұмыс істемейтін өзгерісті «жеңді» деп шығару. Type II: шын жақсартуды байқамай қалу. Power = 1 − β.</p>
<div class="tip">p-value — «H0 рас болуының ықтималдығы» <b>емес</b>. Ол H0 рас деп болжағандағы деректің ықтималдығы.</div>
<h3>Жиі қателер</h3>
<ul>
<li>p = 0.2 болса «әсер жоқ екені дәлелденді» деу. Дұрысы: дәлел жеткіліксіз.</li>
<li>α-ны нәтижені көргеннен кейін таңдау (0.05 болмады, 0.1 алайық).</li>
<li>Екі жақты тестте құйрықты екіге көбейтуді ұмыту.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 15, prompt: '<code>p_two_sided(z)</code> функциясын жазыңыз: стандартты қалыпты таралу бойынша екі жақты p-value қайтарсын. Теріс z үшін де дұрыс жұмыс істесін.', starter: 'from statistics import NormalDist\n\ndef p_two_sided(z):\n    pass\n', solution: 'from statistics import NormalDist\n\ndef p_two_sided(z):\n    return 2 * (1 - NormalDist().cdf(abs(z)))', check: { tests: 'assert p_two_sided(2.1) is not None, "Мән қайтарыңыз"\nassert abs(p_two_sided(2.1) - 0.035729) < 1e-5, "p_two_sided(2.1) ≈ 0.0357 болуы керек: екі құйрықты қосыңыз"\nassert abs(p_two_sided(-2.1) - 0.035729) < 1e-5, "Теріс z үшін де p ≈ 0.0357: abs(z) қолданыңыз"\nassert abs(p_two_sided(0) - 1) < 1e-9, "z = 0 болса p = 1"', mustInclude: ['def p_two_sided'] }, hints: ['Бір құйрық: <code>1 - NormalDist().cdf(abs(z))</code>.', 'Екіге көбейтіңіз.'] },
        { type: 'number', xp: 10, prompt: 'Тест статистикасы z = 1.5, тест екі жақты. p-value қанша? (үш ондық белгіге дейін)', answer: 0.134, tol: 0.002, explain: '2 × (1 − cdf(1.5)) = 2 × 0.0668 ≈ 0.134. Бұл 0.05-тен үлкен, H0 жоққа шығарылмайды.' },
        { type: 'quiz', xp: 10, prompt: 'Жаңа дизайн шын мәнінде конверсияға әсер етпейді, бірақ тест p = 0.03 көрсетіп, сіз оны «жеңімпаз» деп жарияладыңыз. Бұл қандай қате?', options: ['Type II қате', 'Type I қате (false positive)', 'Қате жоқ, p &lt; 0.05', 'Power тым жоғары'], answer: 1, explain: 'H0 шын рас болғанда оны жоққа шығару — Type I қате. α = 0.05 кезінде ол тесттердің шамамен 5%-ында болады.' }
      ]
    },
    {
      id: 'ab-5', title: 'Екі пропорцияның z-тесті: A/B тесттің өзегі', minutes: 16,
      body: `
<p>Классикалық A/B тест: пайдаланушылар кездейсоқ екі топқа бөлінеді. A — бұрынғы нұсқа (control), B — жаңа нұсқа (treatment). Метрика — конверсия, яғни пропорция. Сұрақ: p_B мен p_A айырмашылығы кездейсоқтықпен түсіндіріле ме?</p>
<h3>Формула</h3>
<ul>
<li>Конверсиялар: p_A = x_A / n_A, p_B = x_B / n_B.</li>
<li>H0 кезінде екі топтың конверсиясы бірдей, сондықтан оны біріктіріп бағалаймыз (<b>pooled</b>): p = (x_A + x_B) / (n_A + n_B).</li>
<li>SE = √(p(1 − p) × (1/n_A + 1/n_B)).</li>
<li>z = (p_B − p_A) / SE, p-value = 2 × (1 − cdf(|z|)).</li>
</ul>
<h3>Қадамдап мысал</h3>
<p>A: 2 000 адам, 200 сатып алды. B: 2 000 адам, 250 сатып алды.</p>
<ol>
<li>p_A = 0.10, p_B = 0.125. Айырмашылық: 2.5 п.п.</li>
<li>Pooled: p = 450 / 4 000 = 0.1125.</li>
<li>SE = √(0.1125 × 0.8875 × (1/2000 + 1/2000)) = √(0.09984 × 0.001) ≈ 0.00999.</li>
<li>z = 0.025 / 0.00999 ≈ 2.50.</li>
<li>p = 2 × (1 − cdf(2.50)) ≈ 0.0124 &lt; 0.05. H0 жоққа шығарылады.</li>
</ol>
<pre><code>import math
from statistics import NormalDist

def two_prop_z(x_a, n_a, x_b, n_b):
    p_a, p_b = x_a / n_a, x_b / n_b
    p = (x_a + x_b) / (n_a + n_b)
    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))
    z = (p_b - p_a) / se
    return z, 2 * (1 - NormalDist().cdf(abs(z)))

two_prop_z(200, 2000, 250, 2000)   # (2.50, 0.0124)</code></pre>
<h3>Қашан жарамды</h3>
<p>Тест CLT-ке сүйенеді, сондықтан әр топта сатып алғандар да, алмағандар да жеткілікті болуы керек (әдетте әрқайсысы кемінде 10). Пайдаланушылар бір-біріне тәуелсіз болуы керек: бір адам екі топқа түспейді.</p>
<div class="tip">z оң болса, B жақсы; теріс болса, A жақсы. p-value бағытты айтпайды, сондықтан айырмашылықтың белгісін әрқашан қараңыз.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Пайдаланушы емес, <b>сессия</b> немесе көрсетілім санап, n-ді жасанды үлкейту. Бір адамның сессиялары тәуелсіз емес.</li>
<li>Pooled SE-нің орнына әр топтың p-сын бөлек ауыстырып, формуланы араластыру. Тест үшін pooled, ал айырма интервалы үшін unpooled SE (10-сабақ).</li>
<li>p = 0.06 болса «B нашар» деп шешу. Бұл тек дәлелдің жеткіліксіздігі.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 30, prompt: '<code>two_prop_z(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: pooled SE арқылы <code>(z, p)</code> қайтарсын, мұндағы z = (p_B − p_A) / SE, p — екі жақты p-value.', starter: 'import math\nfrom statistics import NormalDist\n\ndef two_prop_z(x_a, n_a, x_b, n_b):\n    pass\n', solution: 'import math\nfrom statistics import NormalDist\n\ndef two_prop_z(x_a, n_a, x_b, n_b):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    p = (x_a + x_b) / (n_a + n_b)\n    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = (p_b - p_a) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))', check: { tests: '_r = two_prop_z(200, 2000, 250, 2000)\nassert _r is not None and len(_r) == 2, "(z, p) кортежін қайтарыңыз"\nassert abs(_r[0] - 2.50196) < 1e-3, f"z ≈ 2.502 болуы керек, сізде {_r[0]:.4f}. Pooled p = (x_a + x_b) / (n_a + n_b)"\nassert abs(_r[1] - 0.01235) < 1e-4, f"p ≈ 0.0124 болуы керек, сізде {_r[1]:.4f}. Екі жақты: 2 * (1 - cdf(|z|))"\n_r2 = two_prop_z(250, 2000, 200, 2000)\nassert _r2[0] < 0 and abs(_r2[1] - _r[1]) < 1e-9, "A жақсы болса z теріс, p сол күйі: z = (p_b - p_a) / se"\n_r3 = two_prop_z(480, 10000, 540, 12000)\nassert abs(_r3[0] - (-1.05371)) < 1e-3, "Топ көлемдері әртүрлі болғанда да дұрыс болуы керек: (1 / n_a + 1 / n_b)"', mustInclude: ['def two_prop_z'] }, hints: ['Pooled: <code>p = (x_a + x_b) / (n_a + n_b)</code>.', '<code>se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))</code>', 'p-value: <code>2 * (1 - NormalDist().cdf(abs(z)))</code>'] },
        { type: 'number', xp: 15, prompt: 'A: 10 000 пайдаланушы, 480 сатып алды. B: 10 000 пайдаланушы, 540 сатып алды. Екі пропорцияның z-тестінің екі жақты p-value-ы қанша? (үш ондық белгіге дейін)', answer: 0.054, tol: 0.002, explain: 'p_A = 4.8%, p_B = 5.4%, pooled 5.1%, SE ≈ 0.00311, z ≈ 1.93, p ≈ 0.054. 0.05-тен сәл жоғары: α = 0.05 кезінде маңызды емес.' }
      ]
    },
    {
      id: 'ab-6', title: 'Орташаларды салыстыру: Welch t-тесті', minutes: 15,
      body: `
<p>Метрика әрқашан конверсия емес. Көбіне <b>орташа</b> салыстырамыз: бір пайдаланушыға табыс (ARPU), сайттағы уақыт, чек сомасы. Мұнда екі таңдаманың t-тесті қолданылады. Ең қауіпсіз нұсқасы — <b>Welch t-тесті</b>: ол топтардың дисперсиясы бірдей деп болжамайды.</p>
<h3>Формула</h3>
<p>t = (m_B − m_A) / √(s_A² / n_A + s_B² / n_B)</p>
<p>Мұндағы m — орташа, s² — таңдама дисперсиясы (<code>statistics.variance</code>), n — топ көлемі. Бөлімдегі түбір — айырманың standard error-ы: әр топтың SE²-ын қосамыз.</p>
<h3>p-value туралы</h3>
<p>Дәл p-value t-таралудан алынады, оның еркіндік дәрежесі (Welch–Satterthwaite формуласы) бар. Стандарт кітапханада t-таралу жоқ. Бірақ n үлкен болғанда (әр топта жүздеген адам, A/B тесттерде әдетте мыңдаған) t-таралу қалыпты таралуға өте жақын. Сондықтан біз <b>қалыпты жуықтауды</b> қолданамыз: p = 2 × (1 − cdf(|t|)). Шағын топтарда (n &lt; 30) бұл p-value-ды сәл кем көрсетеді, ол жағдайда <code>scipy.stats.ttest_ind(a, b, equal_var=False)</code> қолданыңыз.</p>
<h3>Қадамдап мысал</h3>
<p>Сайттағы уақыт (мин): A = [5, 7, 6, 8, 4], B = [9, 7, 8, 10, 6].</p>
<ol>
<li>m_A = 6, m_B = 8. Айырма: 2 мин.</li>
<li>s_A² = 2.5, s_B² = 2.5 (<code>statistics.variance</code>).</li>
<li>SE = √(2.5/5 + 2.5/5) = √1 = 1.</li>
<li>t = 2 / 1 = 2.0.</li>
<li>Қалыпты жуықтау: p ≈ 0.046. Бірақ n = 5 өте кіші, дәл t-тест p ≈ 0.08 береді. Шағын таңдамада жуықтауға сенбеңіз.</li>
</ol>
<pre><code>import math, statistics
from statistics import NormalDist

def welch_t(a, b):
    se = math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))
    t = (statistics.mean(b) - statistics.mean(a)) / se
    p = 2 * (1 - NormalDist().cdf(abs(t)))   # үлкен n үшін жуықтау
    return t, p</code></pre>
<div class="tip">Табыс метрикасы қатты оңға қисайған: көбі 0, кейбірі өте үлкен. CLT орташаларға жұмыс істейді, бірақ мұндай деректе n үлкен болуы керек және бір «кит» клиент нәтижені бұзуы мүмкін. Шеткі мәндерді алдын ала тексеріңіз.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>pvariance</code> (n-ге бөлу) қолдану. Таңдама дисперсиясы керек.</li>
<li>Бөлімде SE-лерді квадратқа шығармай қосу: √(SE_A² + SE_B²), SE_A + SE_B емес.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>welch_t(a, b)</code> функциясын жазыңыз: Welch t статистикасын (B минус A) және қалыпты жуықтау бойынша екі жақты p-value қайтарсын: <code>(t, p)</code>.', starter: 'import math, statistics\nfrom statistics import NormalDist\n\ndef welch_t(a, b):\n    pass\n', solution: 'import math, statistics\nfrom statistics import NormalDist\n\ndef welch_t(a, b):\n    se = math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))\n    t = (statistics.mean(b) - statistics.mean(a)) / se\n    p = 2 * (1 - NormalDist().cdf(abs(t)))\n    return t, p', check: { tests: '_r = welch_t([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])\nassert _r is not None and len(_r) == 2, "(t, p) кортежін қайтарыңыз"\nassert abs(_r[0] - 2.0) < 1e-9, f"t = 2.0 болуы керек, сізде {_r[0]}"\nassert abs(_r[1] - 0.0455) < 1e-3, f"p ≈ 0.0455 болуы керек, сізде {_r[1]:.4f}"\n_a = [10, 12, 9, 11, 13, 10, 12, 11]\n_b = [14, 30, 8, 22, 15, 9, 25, 12, 18, 20]\n_t, _p = welch_t(_a, _b)\nassert abs(_t - 2.75865) < 1e-3, f"Дисперсиялары әртүрлі топтарда t ≈ 2.759 болуы керек, сізде {_t:.4f}. statistics.variance (n − 1) қолданыңыз"', mustInclude: ['def welch_t'] }, hints: ['SE = <code>math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))</code>', 't = (mean(b) − mean(a)) / SE, p — 4-сабақтағыдай.'] },
        { type: 'quiz', xp: 10, prompt: 'Неге Welch t-тестінде p-value-ды қалыпты таралумен жуықтауға болады?', options: ['t-таралу мен қалыпты таралу әрқашан бірдей', 'Үлкен n-де t-таралу қалыпты таралуға өте жақын болады', 'Welch тесті дисперсияны елемейді', 'p-value n-ге тәуелді емес'], answer: 1, explain: 'Еркіндік дәрежесі өскен сайын t-таралу қалыптыға жақындайды. Әр топта жүздеген бақылау болса, айырма елеусіз.' }
      ]
    },
    {
      id: 'ab-7', title: 'Power және таңдама көлемі', minutes: 15,
      body: `
<p>Тестті бастамас бұрын «қанша пайдаланушы керек?» деп сұрау керек. Аз болса, шын жақсартуды байқамай қаламыз (Type II қате). Көп болса, уақыт пен трафикті босқа жұмсаймыз.</p>
<h3>Төрт кіріс</h3>
<ul>
<li><b>Baseline</b> p₁ — қазіргі конверсия, мысалы 10%.</li>
<li><b>MDE</b> (minimum detectable effect) — байқағымыз келетін ең кіші айырма. Абсолют (10% → 12%, яғни +2 п.п.) немесе салыстырмалы (+20%) болуы мүмкін; біз абсолют қолданамыз.</li>
<li><b>α</b> — Type I қате деңгейі, 0.05.</li>
<li><b>Power</b> = 1 − β — шын эффект болса, оны табу ықтималдығы, әдетте 0.8.</li>
</ul>
<h3>Формула (бір топқа)</h3>
<p>n = (z_{1−α/2} + z_{power})² × (p₁(1 − p₁) + p₂(1 − p₂)) / MDE², мұндағы p₂ = p₁ + MDE. Нәтижені жоғары қарай бүтінге дөңгелектейміз (<code>math.ceil</code>). Бұл кең тараған жуықтау; онлайн калькуляторлар сәл басқа сан беруі мүмкін.</p>
<h3>Қадамдап мысал</h3>
<p>Baseline 10%, MDE = 2 п.п., α = 0.05, power = 0.8.</p>
<ol>
<li>z_{1−α/2} = inv_cdf(0.975) ≈ 1.960, z_{power} = inv_cdf(0.8) ≈ 0.842. Қосындының квадраты: 2.802² ≈ 7.849.</li>
<li>p₂ = 0.12. Дисперсиялар: 0.1 × 0.9 + 0.12 × 0.88 = 0.09 + 0.1056 = 0.1956.</li>
<li>MDE² = 0.02² = 0.0004.</li>
<li>n = 7.849 × 0.1956 / 0.0004 ≈ 3 838.2 → <b>3 839</b> адам әр топқа, барлығы ≈ 7 700.</li>
</ol>
<pre><code>import math
from statistics import NormalDist

def sample_size(p1, mde, alpha=0.05, power=0.8):
    p2 = p1 + mde
    z_a = NormalDist().inv_cdf(1 - alpha / 2)
    z_b = NormalDist().inv_cdf(power)
    var = p1 * (1 - p1) + p2 * (1 - p2)
    return math.ceil((z_a + z_b) ** 2 * var / mde ** 2)</code></pre>
<h3>Интуиция</h3>
<p>n MDE²-қа кері пропорционал: эффектті екі есе кіші (1 п.п.) байқау үшін шамамен <b>төрт</b> есе көп адам керек. Күніне 1 000 жаңа пайдаланушы болса, 2 п.п. үшін ≈ 8 күн, 1 п.п. үшін ≈ 1 ай жүреді. MDE-ні бизнес шешеді: «қандай өсім біз үшін маңызды?»</p>
<div class="tip">Тест ұзақтығын алдын ала белгілеп, кемінде бір толық апта (ал жақсысы — екі) жүргізіңіз: демалыс күндері пайдаланушылар өзгеше әрекет етеді.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Салыстырмалы MDE-ні (20%) абсолют (0.20) деп формулаға қою.</li>
<li>Бір топтың n-ін барлық тестке керек сан деп ойлау. Екіге көбейтіңіз.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 30, prompt: '<code>sample_size(p1, mde, alpha=0.05, power=0.8)</code> функциясын жазыңыз: сабақтағы формула бойынша <b>бір топқа</b> керек пайдаланушылар санын (жоғары дөңгелектелген бүтін сан) қайтарсын.', starter: 'import math\nfrom statistics import NormalDist\n\ndef sample_size(p1, mde, alpha=0.05, power=0.8):\n    pass\n', solution: 'import math\nfrom statistics import NormalDist\n\ndef sample_size(p1, mde, alpha=0.05, power=0.8):\n    p2 = p1 + mde\n    z_a = NormalDist().inv_cdf(1 - alpha / 2)\n    z_b = NormalDist().inv_cdf(power)\n    var = p1 * (1 - p1) + p2 * (1 - p2)\n    return math.ceil((z_a + z_b) ** 2 * var / mde ** 2)', check: { tests: 'assert sample_size(0.10, 0.02) == 3839, f"sample_size(0.10, 0.02) = 3839 болуы керек, сізде {sample_size(0.10, 0.02)}"\nassert sample_size(0.05, 0.01) == 8155, "sample_size(0.05, 0.01) = 8155 болуы керек"\nassert isinstance(sample_size(0.2, 0.02), int), "Бүтін сан қайтарыңыз: math.ceil"\nassert sample_size(0.10, 0.02, power=0.9) > 3839, "power өссе, n де өсуі керек: power параметрін қолданыңыз"\nassert sample_size(0.10, 0.02, alpha=0.01) > 3839, "alpha кішірейсе, n өсуі керек: alpha параметрін қолданыңыз"', mustInclude: ['def sample_size'] }, hints: ['<code>z_a = NormalDist().inv_cdf(1 - alpha / 2)</code>, <code>z_b = NormalDist().inv_cdf(power)</code>', '<code>math.ceil((z_a + z_b) ** 2 * var / mde ** 2)</code>'] },
        { type: 'number', xp: 15, prompt: 'Baseline конверсия 20%, MDE = 2 п.п. (20% → 22%), α = 0.05, power = 0.8. Сабақтағы формула бойынша бір топқа неше пайдаланушы керек?', answer: 6507, tol: 2, unit: 'адам', explain: '7.849 × (0.2 × 0.8 + 0.22 × 0.78) / 0.0004 = 7.849 × 0.3316 / 0.0004 ≈ 6 506.3 → 6 507.' },
        { type: 'quiz', xp: 10, prompt: 'Тест 2 п.п. MDE-ге жоспарланған. Өнім менеджері «1 п.п. өсімді де ұстағымыз келеді» дейді. Бір топтағы n шамамен қалай өзгереді?', options: ['Екі есе азаяды', 'Өзгермейді', 'Шамамен төрт есе өседі', 'Екі есе өседі'], answer: 2, explain: 'n ∝ 1 / MDE². MDE екі есе кішірейсе, n шамамен төрт есе өседі.' }
      ]
    },
    {
      id: 'ab-8', title: 'A/B тест дизайны және тұзақтар', minutes: 15,
      body: `
<p>Формула дұрыс болғанымен, тест нашар жоспарланса, нәтиже алдамшы болады. Ең жиі кездесетін тұзақтар:</p>
<h3>1. Рандомизация бірлігі</h3>
<p>Әдетте <b>пайдаланушы</b> кездейсоқ бөлінеді (user_id бойынша), сессия немесе бет көрсетілімі емес. Әйтпесе бір адам екі нұсқаны да көреді, ал бақылаулар тәуелсіз болмайды. Талдау бірлігі рандомизация бірлігімен сәйкес болуы керек.</p>
<h3>2. Peeking (ерте қарау)</h3>
<p>Нәтижені күн сайын қарап, p &lt; 0.05 болған сәтте тоқтату — Type I қатені 5%-дан әлдеқайда жоғарылатады: кездейсоқ тербеліс уақытша шекарадан өтуі мүмкін. Шешім: n-ді алдын ала есептеп, соған жеткенде ғана шешім қабылдау (немесе арнайы sequential әдістер).</p>
<h3>3. Көп салыстыру</h3>
<p>Бес метриканы немесе бес нұсқаны α = 0.05-пен тексерсеңіз, кем дегенде біреуінің кездейсоқ «маңызды» болу ықтималдығы ≈ 1 − 0.95⁵ ≈ 23%. Ең қарапайым түзету — <b>Bonferroni</b>: әр тест үшін α / m. 5 метрика: 0.05 / 5 = 0.01. Тағы бір жол — бір негізгі метриканы алдын ала таңдау.</p>
<h3>4. Novelty effect</h3>
<p>Жаңа дизайн алғашқы күндері «жаңалық» болғандықтан ғана көп басылады, сосын әсер жоғалады. Эффектті күндер бойынша қарап, тестті жеткілікті ұзақ жүргізіңіз.</p>
<h3>5. SRM (sample ratio mismatch)</h3>
<p>50/50 жоспарланса, топ көлемдері шамамен тең болуы керек. Айырма кездейсоқтықпен түсіндірілмесе — бөлуде қате бар (бот сүзгісі, redirect, кэш), нәтижеге сенуге болмайды.</p>
<h3>Қадамдап мысал: SRM тексерісі</h3>
<p>A: 5 120, B: 4 880, барлығы N = 10 000.</p>
<ol>
<li>H0 кезінде A-ның саны биномдық: орташа N/2 = 5 000, SD = √(N × 0.5 × 0.5) = 50.</li>
<li>z = (5 120 − 5 000) / 50 = 2.4.</li>
<li>p = 2 × (1 − cdf(2.4)) ≈ 0.016.</li>
<li>SRM үшін қатаң шек қолданылады (көбіне p &lt; 0.001). Мұнда 0.016 — ескерту белгісі: бөлуді тексеріңіз. 100 000 адамда 50 600 / 49 400 болса, p ≈ 0.0001 — анық SRM.</li>
</ol>
<div class="tip">SRM — талдаудың <b>бірінші</b> қадамы. Топ көлемдері дұрыс болмаса, конверсияны салыстыруға мағына жоқ.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Тестті «жеңіс» көрінген күні тоқтату.</li>
<li>20 сегментті қарап, біреуі маңызды болса, соны «нәтиже» деп жариялау.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>srm_p(n_a, n_b)</code> функциясын жазыңыз: 50/50 бөлу жоспарланған кезде топ көлемдерінің екі жақты p-value-ын қайтарсын. N = n_a + n_b, z = (n_a − N/2) / √(N × 0.25).', starter: 'import math\nfrom statistics import NormalDist\n\ndef srm_p(n_a, n_b):\n    pass\n', solution: 'import math\nfrom statistics import NormalDist\n\ndef srm_p(n_a, n_b):\n    n = n_a + n_b\n    z = (n_a - n / 2) / math.sqrt(n * 0.25)\n    return 2 * (1 - NormalDist().cdf(abs(z)))', check: { tests: 'assert srm_p(5120, 4880) is not None, "p-value қайтарыңыз"\nassert abs(srm_p(5120, 4880) - 0.016395) < 1e-4, f"srm_p(5120, 4880) ≈ 0.0164 болуы керек, сізде {srm_p(5120, 4880):.5f}"\nassert abs(srm_p(4880, 5120) - 0.016395) < 1e-4, "Топтардың ретіне тәуелсіз болуы керек: abs(z)"\nassert srm_p(50600, 49400) < 0.001, "50600 / 49400 анық SRM: p < 0.001 болуы керек"\nassert abs(srm_p(500, 500) - 1) < 1e-9, "Тең топтарда p = 1"', mustInclude: ['def srm_p'] }, hints: ['SD = <code>math.sqrt(n * 0.25)</code>, мұндағы n — барлығы.', 'p-value — бұрынғыдай екі жақты.'] },
        { type: 'sql', dataset: 'ab', xp: 15, prompt: 'SRM тексерісінің алғашқы қадамы: <code>assignments</code> кестесінен әр нұсқа үшін <code>variant</code> және пайдаланушылар санын <code>n</code> шығарыңыз.', starter: '', solution: 'SELECT variant, COUNT(*) AS n FROM assignments GROUP BY variant;', hints: ['<code>COUNT(*) AS n</code> және <code>GROUP BY variant</code>.'] },
        { type: 'quiz', xp: 10, prompt: 'Тест 14 күнге жоспарланған. 4-күні p = 0.03 болды, менеджер «жеңдік, тоқтатайық» дейді. Не айтасыз?', options: ['Келісемін: p &lt; 0.05', 'Тоқтатпаймыз: ерте қарау Type I қатені арттырады, жоспарланған n-ге жеткенше күтеміз', 'α-ны 0.1-ге көтереміз', 'Тестті қайтадан басынан бастаймыз'], answer: 1, explain: 'Peeking: p-value уақыт өте тербеледі, ерте тоқтату false positive ықтималдығын 5%-дан әлдеқайда жоғарылатады. Сонымен бірге novelty effect әлі өтпеген болуы мүмкін.' }
      ]
    },
    {
      id: 'ab-9', title: 'A/B тестті SQL-де талдау', minutes: 14,
      body: `
<p>Нақты жұмыста тест деректері дерекқорда жатады: бір кестеде кім қай нұсқаға түскені (<code>assignments</code>), екіншісінде кім сатып алғаны (<code>conversions</code>). Конверсия кестесінде тек сатып алғандар бар, сондықтан негізгі қадам — <b>LEFT JOIN</b>: сатып алмаған пайдаланушылар да есепке кіруі керек.</p>
<h3>Негізгі сұрау</h3>
<pre><code>SELECT a.variant,
  COUNT(*) AS users,
  COUNT(c.user_id) AS buyers,
  ROUND(COUNT(c.user_id) * 1.0 / COUNT(*), 3) AS cr
FROM assignments a
LEFT JOIN conversions c ON c.user_id = a.user_id
GROUP BY a.variant;</code></pre>
<h3>Қадамдап мысал</h3>
<ol>
<li><code>LEFT JOIN</code> әр пайдаланушыны сақтайды. Сатып алмағандардың <code>c.user_id</code> және <code>c.revenue</code> бағандары <code>NULL</code>.</li>
<li><code>COUNT(*)</code> барлық жолды санайды (топ көлемі), ал <code>COUNT(c.user_id)</code> тек NULL емесін (сатып алғандар).</li>
<li><code>* 1.0</code> бүтін санды бөлуден (SQLite-та 6 / 32 = 0) құтқарады.</li>
<li>Біздің деректе: A — 6 / 32 ≈ 0.188, B — 10 / 32 ≈ 0.313.</li>
<li>Осы сандарды Python-дағы <code>two_prop_z(6, 32, 10, 32)</code>-ге береміз: z ≈ 1.15, p ≈ 0.25. 12 п.п. айырма әсерлі көрінеді, бірақ 64 адаммен бұл кездейсоқтық болуы әбден мүмкін.</li>
</ol>
<h3>Табыс метрикасы</h3>
<p>Бір пайдаланушыға табыс (revenue per user) барлық пайдаланушыға бөлінеді, тек сатып алғандарға емес. NULL табысты 0-ге айналдыру үшін <code>COALESCE(c.revenue, 0)</code>.</p>
<pre><code>SUM(COALESCE(c.revenue, 0)) * 1.0 / COUNT(*)</code></pre>
<h3>Сегменттер</h3>
<p><code>GROUP BY a.variant, a.device</code> әр құрылғыдағы эффектті көрсетеді. Есте сақтаңыз: сегменттерді көп қарау — көп салыстыру мәселесі (8-сабақ). Сегмент нәтижесі гипотеза ғана, дәлел емес.</p>
<div class="tip">SQL санап береді, ал статистикалық тестті Python-да (немесе SQL-дегі формуламен) жасайсыз. Әуелі SRM, сосын негізгі метрика, соңында сегменттер.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>INNER JOIN</code> қолдану: сатып алмағандар жоғалып, конверсия 100% болып шығады.</li>
<li>Revenue per user-ды <code>AVG(c.revenue)</code> деп есептеу: бұл тек сатып алғандардың орташа чегі.</li>
</ul>`,
      exercises: [
        { type: 'sql', dataset: 'ab', xp: 20, prompt: 'Әр нұсқа үшін <code>variant</code>, <code>users</code> (барлық пайдаланушы), <code>buyers</code> (сатып алғандар) және конверсия <code>cr</code> (<code>ROUND(..., 3)</code>) шығарыңыз.', starter: 'SELECT a.variant,\n  \nFROM assignments a\nLEFT JOIN conversions c ON c.user_id = a.user_id\nGROUP BY a.variant;', solution: 'SELECT a.variant, COUNT(*) AS users, COUNT(c.user_id) AS buyers, ROUND(COUNT(c.user_id) * 1.0 / COUNT(*), 3) AS cr FROM assignments a LEFT JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant;', check: { mustInclude: ['LEFT JOIN'] }, hints: ['<code>COUNT(c.user_id)</code> тек сатып алғандарды санайды.', '<code>ROUND(COUNT(c.user_id) * 1.0 / COUNT(*), 3) AS cr</code>'] },
        { type: 'sql', dataset: 'ab', xp: 20, prompt: 'Нұсқа мен құрылғы бойынша конверсия: <code>variant</code>, <code>device</code>, <code>users</code>, <code>cr</code> (<code>ROUND(..., 3)</code>). Реті: variant, сосын device.', starter: '', solution: 'SELECT a.variant, a.device, COUNT(*) AS users, ROUND(COUNT(c.user_id) * 1.0 / COUNT(*), 3) AS cr FROM assignments a LEFT JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant, a.device ORDER BY a.variant, a.device;', check: { ordered: true, mustInclude: ['LEFT JOIN'] }, hints: ['<code>GROUP BY a.variant, a.device</code>', 'Соңында <code>ORDER BY a.variant, a.device</code>.'] },
        { type: 'sql', dataset: 'ab', xp: 25, prompt: 'Әр нұсқа үшін <code>variant</code>, жалпы табыс <code>revenue</code> және бір пайдаланушыға табыс <code>rpu</code> (барлық пайдаланушыға бөлінген, <code>ROUND(..., 1)</code>) шығарыңыз.', starter: '', solution: 'SELECT a.variant, SUM(COALESCE(c.revenue, 0)) AS revenue, ROUND(SUM(COALESCE(c.revenue, 0)) * 1.0 / COUNT(*), 1) AS rpu FROM assignments a LEFT JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant;', check: { mustInclude: ['LEFT JOIN'] }, hints: ['<code>COALESCE(c.revenue, 0)</code> сатып алмағандарға 0 қояды.', 'rpu: <code>SUM(...) * 1.0 / COUNT(*)</code>, <code>AVG(c.revenue)</code> емес.'] }
      ]
    },
    {
      id: 'ab-10', title: 'Практикалық маңыздылық және шешім жазу', minutes: 15,
      body: `
<p>«p &lt; 0.05» — шешімнің соңы емес, басы. <b>Статистикалық маңыздылық</b> «айырма кездейсоқ емес шығар» дейді. <b>Практикалық маңыздылық</b> «айырма бизнеске маңызды ма?» деп сұрайды. Миллиондаған пайдаланушыда 0.05 п.п. өсім де p &lt; 0.001 береді, бірақ ол әзірлеу шығынын ақтамауы мүмкін.</p>
<h3>Айырманың сенімділік интервалы</h3>
<p>p-value-дан гөрі ақпараттырақ — <b>p_B − p_A айырмасының CI-ы</b>. Мұнда unpooled SE қолданылады (H0-ді болжамаймыз):</p>
<p>SE = √(p_A(1 − p_A)/n_A + p_B(1 − p_B)/n_B), CI = (p_B − p_A) ± z × SE.</p>
<h3>Қадамдап мысал</h3>
<p>A: 200 / 2 000, B: 250 / 2 000. Бизнес алдын ала айтқан: «1 п.п.-тен аз өсім енгізуге тұрмайды».</p>
<ol>
<li>Айырма: 0.125 − 0.10 = 0.025 (2.5 п.п.).</li>
<li>SE = √(0.1 × 0.9 / 2000 + 0.125 × 0.875 / 2000) = √(0.000045 + 0.0000547) ≈ 0.00998.</li>
<li>95% CI = 0.025 ± 1.96 × 0.00998 = [0.0054; 0.0446], яғни +0.5 п.п.-тен +4.5 п.п.-ке дейін.</li>
<li>Интервал 0-ді қамтымайды — статистикалық маңызды. Бірақ төменгі шекара (0.5 п.п.) біздің 1 п.п. табалдырығынан төмен: эффект кішкентай болуы да мүмкін.</li>
</ol>
<table>
<tr><th>CI жағдайы</th><th>Шешім</th></tr>
<tr><td>Толығымен табалдырықтан жоғары</td><td>Енгіземіз</td></tr>
<tr><td>0-ден жоғары, бірақ табалдырықты қиып өтеді</td><td>Енгізуге болады, тәуекелді айтамыз немесе тестті ұзартамыз</td></tr>
<tr><td>0-ді қамтиды, тар</td><td>Эффект жоқтың қасы, енгізбейміз</td></tr>
<tr><td>0-ді қамтиды, кең</td><td>Дерек жеткіліксіз, қорытынды жоқ</td></tr>
</table>
<h3>Шешімді жазу</h3>
<p>Жақсы қорытынды бірінші сөйлемде шешімді айтады, сосын: эффект пен CI («+2.5 п.п., 95% CI +0.5…+4.5»), p-value, тексерістер (SRM, ұзақтығы, peeking жоқ), guardrail метрикалар (бас тарту, қайтарулар), тәуекелдер және келесі қадам.</p>
<div class="tip">Менеджерге «p = 0.012» емес, «B конверсияны шамамен 2.5 п.п. көтереді, айына ≈ X ₸ қосымша табыс» деп жазыңыз.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Тек p-value беріп, эффекттің көлемін айтпау.</li>
<li>Маңызды емес нәтижені «B жұмыс істемейді» деп жазу.</li>
</ul>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>ci_diff(x_a, n_a, x_b, n_b, level=0.95)</code> функциясын жазыңыз: p_B − p_A айырмасының unpooled SE арқылы сенімділік интервалын <code>(low, high)</code> қайтарсын.', starter: 'import math\nfrom statistics import NormalDist\n\ndef ci_diff(x_a, n_a, x_b, n_b, level=0.95):\n    pass\n', solution: 'import math\nfrom statistics import NormalDist\n\ndef ci_diff(x_a, n_a, x_b, n_b, level=0.95):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    se = math.sqrt(p_a * (1 - p_a) / n_a + p_b * (1 - p_b) / n_b)\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    d = p_b - p_a\n    return (d - z * se, d + z * se)', check: { tests: '_r = ci_diff(200, 2000, 250, 2000)\nassert _r is not None and len(_r) == 2, "(low, high) кортежін қайтарыңыз"\nassert abs(_r[0] - 0.005441) < 1e-4 and abs(_r[1] - 0.044559) < 1e-4, f"ci_diff(200, 2000, 250, 2000) ≈ (0.0054, 0.0446) болуы керек, сізде {_r}. Unpooled SE: әр топтың p(1 − p)/n қосындысы"\n_r2 = ci_diff(250, 2000, 200, 2000)\nassert _r2[1] < 0, "Айырма p_b − p_a: B нашар болса интервал теріс"\n_r9 = ci_diff(200, 2000, 250, 2000, 0.90)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], "90% интервал 95%-дан тар болуы керек: level параметрін қолданыңыз"', mustInclude: ['def ci_diff'] }, hints: ['<code>se = math.sqrt(p_a * (1 - p_a) / n_a + p_b * (1 - p_b) / n_b)</code>', 'z — 3-сабақтағыдай, <code>level</code>-ден.'] },
        { type: 'quiz', xp: 10, prompt: 'Тест 2 млн пайдаланушыда өтті: конверсия 5.00% → 5.04%, p = 0.004. Жаңа функцияны қолдау айына 3 млн ₸ тұрады, ал +0.04 п.п. айына ≈ 500 мың ₸ табыс береді. Шешім?', options: ['Енгіземіз: p &lt; 0.01', 'Статистикалық маңызды, бірақ практикалық маңызды емес: енгізбейміз', 'Тестті тоқтатып, басынан бастаймыз', 'α-ны 0.001-ге түсіреміз'], answer: 1, explain: 'Үлкен n-де кішкентай эффект те «маңызды» шығады. Эффект шығынды ақтамайды, сондықтан енгізу тиімсіз.' },
        { type: 'rubric', xp: 30, minWords: 60, prompt: 'Мысал: A — 200 / 2 000, B — 250 / 2 000, p ≈ 0.012, айырма +2.5 п.п. (95% CI +0.5…+4.5), SRM тексерісі өтті, тест 14 күн жүрді. Өнім басшысына 60+ сөзден тұратын қысқа шешім жазыңыз, сосын оны адал бағалаңыз (әр критерий кемінде 3 / 4).', criteria: [
          { name: 'Шешім бірінші сөйлемде', levels: ['Шешім жоқ', 'Шешім мәтіннің соңында немесе бұлыңғыр', 'Бірінші абзацта нақты шешім бар', 'Бірінші сөйлемде шешім мен негізгі сан бар'] },
          { name: 'Эффект және белгісіздік', levels: ['Тек «B жақсы»', 'Тек p-value берілген', 'Эффект көлемі мен p-value бар', 'Эффект, 95% CI және оның бизнес мағынасы (табалдырықпен салыстыру) бар'] },
          { name: 'Тексерістер', levels: ['Айтылмаған', 'Біреуі ғана (мысалы, ұзақтығы)', 'SRM мен ұзақтығы аталған', 'SRM, ұзақтығы, peeking болмағаны және guardrail метрика аталған'] },
          { name: 'Тәуекел және келесі қадам', levels: ['Жоқ', 'Жалпы сөз («бақылаймыз»)', 'Нақты тәуекел немесе келесі қадам', 'Тәуекел (CI төменгі шекарасы кіші), келесі қадам және оны қалай өлшейтіні'] }
        ] }
      ]
    },
    {
      id: 'ab-gate', gate: true, title: 'Модуль емтиханы: Inference & A/B Testing', minutes: 25,
      body: `
<p>Қорытынды тексеріс. Python тапсырмаларында тек стандарт кітапхана (<code>math</code>, <code>statistics</code>, оның ішінде <code>NormalDist</code>) қолжетімді. Кеңестер жоқ: модульдегі формулаларға сүйеніңіз.</p>`,
      exercises: [
        { type: 'python', xp: 40, prompt: '<code>ab_decision(x_a, n_a, x_b, n_b, alpha=0.05)</code> функциясын жазыңыз. Ол pooled екі пропорция z-тестін жасап, сөздік қайтарсын: <code>"lift"</code> (p_B − p_A), <code>"z"</code>, <code>"p"</code> (екі жақты) және <code>"decision"</code>: p &lt; alpha және lift &gt; 0 болса <code>"ship B"</code>, p &lt; alpha және lift &lt; 0 болса <code>"keep A"</code>, әйтпесе <code>"inconclusive"</code>.', starter: 'import math\nfrom statistics import NormalDist\n\ndef ab_decision(x_a, n_a, x_b, n_b, alpha=0.05):\n    pass\n', solution: 'import math\nfrom statistics import NormalDist\n\ndef ab_decision(x_a, n_a, x_b, n_b, alpha=0.05):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    p = (x_a + x_b) / (n_a + n_b)\n    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = (p_b - p_a) / se\n    pv = 2 * (1 - NormalDist().cdf(abs(z)))\n    if pv < alpha:\n        decision = "ship B" if p_b > p_a else "keep A"\n    else:\n        decision = "inconclusive"\n    return {"lift": p_b - p_a, "z": z, "p": pv, "decision": decision}', check: { tests: '_d = ab_decision(200, 2000, 250, 2000)\nassert isinstance(_d, dict), "Сөздік қайтарыңыз"\nfor _k in ("lift", "z", "p", "decision"):\n    assert _k in _d, f"{_k} кілті жоқ"\nassert abs(_d["lift"] - 0.025) < 1e-9, "lift = p_b - p_a = 0.025 болуы керек"\nassert abs(_d["z"] - 2.50196) < 1e-3, "z ≈ 2.502 болуы керек (pooled SE)"\nassert abs(_d["p"] - 0.01235) < 1e-4, "p ≈ 0.0124 болуы керек"\nassert _d["decision"] == "ship B", "200/2000 vs 250/2000: ship B"\nassert ab_decision(250, 2000, 200, 2000)["decision"] == "keep A", "B нашар әрі маңызды: keep A"\nassert ab_decision(480, 10000, 540, 10000)["decision"] == "inconclusive", "p ≈ 0.054 > 0.05: inconclusive"\nassert ab_decision(480, 10000, 540, 10000, alpha=0.1)["decision"] == "ship B", "alpha = 0.1 кезінде p ≈ 0.054 маңызды: alpha параметрін қолданыңыз"' }, hints: [] },
        { type: 'python', xp: 30, prompt: 'Baseline 5%, MDE = 1 п.п. (абсолют), α = 0.05, power = 0.8. Модульдегі формуламен бір топқа керек санды <code>n_per_group</code>, ал күніне 2 000 жаңа пайдаланушы (екі топқа тең бөлінеді) болғанда тестке керек толық күндер санын <code>days</code> (<code>math.ceil</code>) есептеңіз.', starter: 'import math\nfrom statistics import NormalDist\n', solution: 'import math\nfrom statistics import NormalDist\np1, mde = 0.05, 0.01\np2 = p1 + mde\nz_a = NormalDist().inv_cdf(0.975)\nz_b = NormalDist().inv_cdf(0.8)\nn_per_group = math.ceil((z_a + z_b) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / mde ** 2)\ndays = math.ceil(2 * n_per_group / 2000)\nprint(n_per_group, days)', check: { tests: 'assert n_per_group == 8155, f"n_per_group = 8155 болуы керек, сізде {n_per_group}"\nassert days == 9, f"days = 9 болуы керек: 2 × 8155 / 2000 = 8.16 → 9, сізде {days}"' }, hints: [] },
        { type: 'number', xp: 20, prompt: 'Тестте 4 нұсқа (B, C, D, E) control-мен салыстырылады, жалпы α = 0.05. Bonferroni түзетуімен әр салыстыру үшін α қанша?', answer: 0.0125, tol: 0.0001, explain: 'α / m = 0.05 / 4 = 0.0125.' },
        { type: 'quiz', xp: 20, prompt: 'A/B тест нәтижесі: A — 50 400 пайдаланушы, B — 49 600 (50/50 жоспарланған), B-ның конверсиясы жоғары, p = 0.01. Ең бірінші не істейсіз?', options: ['B-ны бірден енгіземіз', 'SRM тексереміз: 50 400 / 49 600 кездейсоқ па, бөлуде қате жоқ па', 'Тестті тағы бір айға ұзартамыз', 'α-ны 0.01-ге түсіреміз'], answer: 1, explain: 'z = (50 400 − 50 000) / √(100 000 × 0.25) ≈ 2.53, p ≈ 0.011. Бөлу күдікті, сондықтан алдымен SRM себебін тексеру керек; әйтпесе нәтижеге сенуге болмайды.' }
      ]
    }
  ]
};
