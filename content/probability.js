// M4.1 Probability. Python exercises use only the standard library (math, random, statistics.NormalDist, itertools, fractions).
DJ.modules['m4-1'] = {
  intro: 'Ықтималдық — белгісіздікті санмен сипаттау тілі. Монета мен сүйектен бастап, конверсия, алаяқтық дабылы, сағаттағы тапсырыс саны және промоның пайдасы сияқты бизнес сұрақтарына дейін барамыз: әр формуланы алдымен қолмен, сосын Python-да есептейсіз.',
  lessons: [
    {
      id: 'pr-1', title: 'Ықтималдық негіздері және sample space', minutes: 12,
      body: `
<p><b>Ықтималдық</b> (probability) — оқиғаның болу мүмкіндігін 0-ден 1-ге дейінгі санмен өлшеу. 0 — ешқашан болмайды, 1 — міндетті түрде болады, 0.5 — екі жағдайдың бірі.</p>
<p>Үш негізгі ұғым:</p>
<ul>
<li><b>Тәжірибе</b> (experiment): нәтижесі алдын ала белгісіз әрекет. Сүйек лақтыру, клиенттің сайтқа кіруі.</li>
<li><b>Sample space</b> (нәтижелер кеңістігі, Ω): барлық мүмкін нәтижелер жиыны. Бір сүйек үшін Ω = {1, 2, 3, 4, 5, 6}.</li>
<li><b>Оқиға</b> (event): Ω-ның бір бөлігі. «Жұп сан түсті» = {2, 4, 6}.</li>
</ul>
<p>Барлық нәтиже <b>бірдей ықтимал</b> болса, классикалық формула жұмыс істейді:</p>
<pre><code>P(A) = қолайлы нәтижелер саны / барлық нәтижелер саны</code></pre>
<h3>Қадамдап мысал</h3>
<p>Екі сүйек лақтырамыз. Қосынды 7 болу ықтималдығы қандай?</p>
<ol>
<li>Sample space: бірінші сүйек 6 мән, екіншісі 6 мән, барлығы 6 × 6 = 36 жұп.</li>
<li>Қолайлы жұптар: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — 6 жұп.</li>
<li>P(қосынды = 7) = 6 / 36 = 1/6 ≈ 0.167.</li>
</ol>
<p>Python-да sample space-ті <code>itertools.product</code> құрады, ал <code>fractions.Fraction</code> бөлшекті дәл сақтайды:</p>
<pre><code>from itertools import product
from fractions import Fraction
omega = list(product(range(1, 7), repeat=2))   # 36 жұп
fav = [w for w in omega if sum(w) == 7]
print(Fraction(len(fav), len(omega)))           # 1/6</code></pre>
<h3>Frequentist көзқарас</h3>
<p>Нәтижелер бірдей ықтимал болмаса ше? Мысалы, «клиент сатып алады ма?» Онда ықтималдықты <b>жиілік</b> ретінде бағалаймыз: 10 000 келушінің 320-сы сатып алса, P(сатып алу) ≈ 320 / 10 000 = 0.032. Бұл <b>frequentist</b> (жиіліктік) көзқарас: ықтималдық — тәжірибе көп рет қайталанғанда оқиғаның үлесі.</p>
<div class="tip"><b>Жиі қателер:</b> (1) (3,4) мен (4,3)-ті бір нәтиже деп санау: сүйектер әртүрлі, сондықтан екеуі бөлек. (2) Нәтижелер бірдей ықтимал емес жерде классикалық формуланы қолдану: «ертең жаңбыр жауады не жаумайды» — бұл 50/50 дегенді білдірмейді. (3) Ықтималдықты 1-ден үлкен не теріс шығару: бұл есептеуде қате бар деген белгі.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: 'Екі сүйектің sample space-ін <code>omega</code> тізіміне құрыңыз (<code>itertools.product</code>). Сосын қосынды 10 немесе одан көп болу ықтималдығын <code>Fraction</code> ретінде <code>p_high</code> айнымалысына жазып, шығарыңыз.', starter: 'from itertools import product\nfrom fractions import Fraction\n', solution: 'from itertools import product\nfrom fractions import Fraction\nomega = list(product(range(1, 7), repeat=2))\nfav = [w for w in omega if sum(w) >= 10]\np_high = Fraction(len(fav), len(omega))\nprint(p_high)', check: { tests: 'assert len(omega) == 36, "omega-да 36 жұп болуы керек: product(range(1, 7), repeat=2)"\nassert p_high == Fraction(1, 6), "Қосынды ≥ 10: (4,6), (5,5), (6,4), (5,6), (6,5), (6,6) — 6/36 = 1/6"', stdout: true }, hints: ['<code>omega = list(product(range(1, 7), repeat=2))</code>', 'Қолайлы жұптар: <code>[w for w in omega if sum(w) &gt;= 10]</code>, сосын <code>Fraction(len(fav), len(omega))</code>.'] },
        { type: 'number', xp: 10, prompt: 'Бір сүйек лақтырылды. «3-тен үлкен сан түсті» оқиғасының ықтималдығы қанша? (ондық бөлшекпен)', answer: 0.5, tol: 0.001, explain: 'Қолайлы: {4, 5, 6} — 3 нәтиже. 3 / 6 = 0.5.' },
        { type: 'quiz', xp: 10, prompt: 'Интернет-дүкенге қыркүйекте 8 000 адам кірді, 240-ы сатып алды. P(сатып алу) ≈ 0.03 деп айту қандай көзқарас?', options: ['Классикалық: барлық нәтиже бірдей ықтимал', 'Frequentist: ықтималдық — бақыланған жиілік', 'Субъективті болжам', 'Бұл ықтималдық емес'], answer: 1, explain: 'Біз оқиғаның бақыланған үлесін (240 / 8 000) ықтималдықтың бағасы ретінде алдық. Бұл frequentist көзқарас.' }
      ]
    },
    {
      id: 'pr-2', title: 'random модулімен симуляция және үлкен сандар заңы', minutes: 13,
      body: `
<p>Кейде ықтималдықты формуламен шығару қиын. Онда компьютерге тәжірибені мың рет «ойнатып», жиілікті санаймыз. Бұл <b>симуляция</b> (Monte Carlo әдісі).</p>
<pre><code>import random
random.seed(42)              # нәтиже қайталансын
random.random()              # 0 ≤ x &lt; 1 кездейсоқ сан
random.randint(1, 6)         # сүйек: 1..6
random.choice(["H", "T"])    # монета</code></pre>
<p><code>random.seed</code> кездейсоқ сандар тізбегін бекітеді: бірдей seed — бірдей нәтиже. Талдауды басқа адам қайталай алуы үшін бұл маңызды.</p>
<h3>Қадамдап мысал</h3>
<p>Сұрақ: монетаны лақтырғанда «елтаңба» үлесі 0.5-ке жақындай ма?</p>
<pre><code>import random
random.seed(1)
def share_heads(n):
    heads = 0
    for _ in range(n):
        if random.random() &lt; 0.5:   # 50% мүмкіндікпен "елтаңба"
            heads += 1
    return heads / n

for n in (10, 100, 1000, 100000):
    print(n, share_heads(n))</code></pre>
<ol>
<li><code>random.random() &lt; 0.5</code> — «p ықтималдықпен иә» дегеннің стандартты тәсілі. p = 0.03 болса, <code>&lt; 0.03</code>.</li>
<li>Әр «иә» болғанда санауышты арттырамыз.</li>
<li>Соңында санауышты n-ге бөліп, жиілікті аламыз.</li>
</ol>
<p>Нәтиже шамамен мынадай: n = 10 кезінде 0.3 не 0.7 сияқты «секірмелі» сан, n = 100 000 кезінде 0.50x. Бұл — <b>үлкен сандар заңы</b> (law of large numbers): тәжірибе саны өскен сайын жиілік шын ықтималдыққа жақындайды.</p>
<h3>Бизнесте неге маңызды</h3>
<p>Бір күнде 20 келуші болып, 3-еуі сатып алса, конверсия 15% деп айтуға асықпаңыз: аз дерекке жиілік қатты ауытқиды. 20 000 келушіде бағаға сенуге болады. Келесі модульде (A/B testing) осы «қаншалықты сенімдіміз» деген сұраққа сан береміз.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Seed қоймау: әр іске қосқанда басқа нәтиже шығады да, қатені табу қиындайды. (2) Цикл ішінде <code>random.seed</code> шақыру: әр қадамда бір сан қайталанады. (3) «Құмар ойыншы қатесі» (gambler fallacy): 5 рет қатарынан «елтаңба» түссе, келесісі «сан» болуға «міндетті» емес. Монетаның жады жоқ, үлкен сандар заңы ұзақ мерзімде ғана жұмыс істейді.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>simulate(n, p)</code> функциясын жазыңыз: n рет «p ықтималдықпен сатып алу» тәжірибесін <code>random.random()</code> арқылы ойнатып, сатып алулар үлесін (0..1) қайтарсын. Функция ішінде seed қоймаңыз.', starter: 'import random\n\ndef simulate(n, p):\n    pass\n', solution: 'import random\n\ndef simulate(n, p):\n    count = 0\n    for _ in range(n):\n        if random.random() < p:\n            count += 1\n    return count / n', check: { tests: 'import random as _r\n_r.seed(7)\n_v = simulate(100000, 0.03)\nassert isinstance(_v, float), "Үлесті (float) қайтарыңыз: count / n"\nassert abs(_v - 0.03) < 0.003, f"100 000 тәжірибеде үлес 0.03-ке жақын болуы керек, сізде {_v}"\nassert simulate(1000, 0) == 0, "p = 0 болса, үлес 0"\nassert simulate(1000, 1) == 1, "p = 1 болса, үлес 1"', mustInclude: ['def simulate'] }, hints: ['<code>if random.random() &lt; p:</code> болса, санауышты арттырыңыз.', 'Соңында <code>return count / n</code>.'] },
        { type: 'python', xp: 20, prompt: '<code>random.seed(42)</code> қойып, екі сүйекті 60 000 рет лақтырыңыз (<code>random.randint(1, 6)</code>). Қосынды 7 болған жағдайлар үлесін <code>p_hat</code>-қа жазып, шығарыңыз. Ол 1/6 ≈ 0.167-ге жақын болуы керек.', starter: 'import random\nrandom.seed(42)\nN = 60000\n', solution: 'import random\nrandom.seed(42)\nN = 60000\nhits = 0\nfor _ in range(N):\n    if random.randint(1, 6) + random.randint(1, 6) == 7:\n        hits += 1\np_hat = hits / N\nprint(p_hat)', check: { tests: 'assert 0 <= p_hat <= 1, "p_hat — үлес, 0 мен 1 аралығында"\nassert abs(p_hat - 1 / 6) < 0.01, f"p_hat 1/6 ≈ 0.1667-ге жақын болуы керек, сізде {p_hat}"', stdout: true }, hints: ['Циклде <code>random.randint(1, 6) + random.randint(1, 6) == 7</code> тексеріңіз.', '<code>p_hat = hits / N</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Жаңа кафе бірінші күні 12 келушінің 6-ына десерт сатты. Менеджер: «Десерт конверсиясы 50%». Қай пікір дұрыс?', options: ['Дұрыс, жиілік — ықтималдық', '12 келуші аз: жиілік қатты ауытқиды, бағаға сену үшін көп дерек керек', 'Конверсия 6% болады', 'Үлкен сандар заңы бойынша келесі күні 0% болады'], answer: 1, explain: 'Үлкен сандар заңы жиілік ықтималдыққа тек көп тәжірибеде жақындайды дейді. 12 бақылау — шулы баға.' }
      ]
    },
    {
      id: 'pr-3', title: 'Қосу ережесі және толықтауыш', minutes: 12,
      body: `
<p>Оқиғаларды біріктіргенде екі сұрақ жиі туады: «A <b>немесе</b> B» және «A <b>емес</b>».</p>
<h3>Толықтауыш (complement)</h3>
<pre><code>P(A емес) = 1 − P(A)</code></pre>
<p>Клиенттің кетіп қалу ықтималдығы 0.2 болса, қалу ықтималдығы 0.8. Қарапайым, бірақ «кемінде бір рет» сұрақтарында өте күшті құрал.</p>
<h3>Қосу ережесі</h3>
<pre><code>P(A немесе B) = P(A) + P(B) − P(A және B)</code></pre>
<p>Неге шегереміз? Екі оқиғаға да кіретін нәтижелер екі рет саналады. Егер A мен B бір уақытта болмаса (<b>mutually exclusive</b>), P(A және B) = 0, ережесі жай қосындыға айналады.</p>
<h3>Қадамдап мысал</h3>
<p>Клиенттер базасы: 40%-ы мобильді қосымшаны қолданады (M), 30%-ы email ашады (E), 12%-ы екеуін де жасайды.</p>
<table>
<tr><th>Сұрақ</th><th>Есептеу</th><th>Жауап</th></tr>
<tr><td>M немесе E</td><td>0.40 + 0.30 − 0.12</td><td>0.58</td></tr>
<tr><td>Екеуін де жасамайды</td><td>1 − 0.58</td><td>0.42</td></tr>
<tr><td>Тек M (E жоқ)</td><td>0.40 − 0.12</td><td>0.28</td></tr>
</table>
<p>Яғни клиенттердің 42%-ына екі арнаның ешқайсысымен жете алмаймыз. SMS сияқты үшінші арна сол үшін керек.</p>
<h3>«Кемінде бір» трюгі</h3>
<p>Сайтта 5 сервер бар, әрқайсысы бір күнде 2% ықтималдықпен істен шығады (бір-біріне тәуелсіз). Кемінде біреуінің істен шығу ықтималдығы?</p>
<ol>
<li>Тікелей санау қиын: біреуі, екеуі, ... бесеуі.</li>
<li>Толықтауышын аламыз: «ешқайсысы істен шықпайды» = 0.98 × 0.98 × 0.98 × 0.98 × 0.98 = 0.98⁵ ≈ 0.904.</li>
<li>P(кемінде бір) = 1 − 0.904 ≈ 0.096, шамамен 10%.</li>
</ol>
<p>Бір серверге 2% аз көрінеді, бірақ бесеуіне бірге — 10%. Тәуелсіздік ұғымын келесі сабақта толығырақ қараймыз.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Қиылысуды шегермеу: 0.40 + 0.30 = 0.70 — қате, ортақ 12% екі рет саналды. (2) «Кемінде бір» үшін ықтималдықтарды жай қосу: 5 × 0.02 = 0.10 жуық болғанымен, 60 сервер болса, 1.2 шығады, ал ықтималдық 1-ден аспайды. (3) «Тәуелсіз» мен «mutually exclusive»-ті шатастыру: бұлар мүлде басқа ұғымдар.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>p_at_least_one(p, n)</code> функциясын жазыңыз: әрқайсысы p ықтималдықпен болатын n тәуелсіз тәжірибеде оқиғаның <b>кемінде бір рет</b> болу ықтималдығын қайтарсын. Толықтауыш ережесін қолданыңыз.', starter: 'def p_at_least_one(p, n):\n    pass\n', solution: 'def p_at_least_one(p, n):\n    return 1 - (1 - p) ** n', check: { tests: 'assert abs(p_at_least_one(0.02, 5) - (1 - 0.98 ** 5)) < 1e-9, "p_at_least_one(0.02, 5) ≈ 0.0961: 1 − (1 − p) ** n"\nassert abs(p_at_least_one(0.5, 1) - 0.5) < 1e-9, "Бір тәжірибеде жауап p-ның өзі"\nassert abs(p_at_least_one(0.02, 60) - (1 - 0.98 ** 60)) < 1e-9, "60 серверде де 1-ден аспауы керек: жай қоспаңыз"', mustInclude: ['def p_at_least_one'] }, hints: ['«Ешқайсысы болмайды» ықтималдығы: <code>(1 - p) ** n</code>.', 'Жауап: <code>1 - (1 - p) ** n</code>'] },
        { type: 'number', xp: 10, prompt: 'P(A) = 0.3, P(B) = 0.4, P(A және B) = 0.1. P(A немесе B) қанша?', answer: 0.6, tol: 0.001, explain: '0.3 + 0.4 − 0.1 = 0.6.' },
        { type: 'quiz', xp: 10, prompt: 'Клиент бір тапсырыста не «Алматыға жеткізу», не «Астанаға жеткізу» таңдай алады, екеуін бірге емес. Бұл оқиғалар қандай?', options: ['Тәуелсіз', 'Mutually exclusive: P(екеуі де) = 0', 'Толықтауыш', 'Шартты'], answer: 1, explain: 'Екеуі бір уақытта болмайды, сондықтан қиылысу 0 және P(A немесе B) = P(A) + P(B).' }
      ]
    },
    {
      id: 'pr-4', title: 'Шартты ықтималдық және тәуелсіздік', minutes: 15,
      body: `
<p><b>Шартты ықтималдық</b> P(A | B) — «B болды деп білгенде, A-ның ықтималдығы». Тік сызық «шарт бойынша» деп оқылады.</p>
<pre><code>P(A | B) = P(A және B) / P(B)</code></pre>
<p>Мағынасы: біз енді бүкіл деректі емес, тек B болған жолдарды қараймыз, және олардың ішіндегі A үлесін санаймыз.</p>
<h3>Қадамдап мысал: 2×2 кесте</h3>
<p>Дүкен 2 000 клиенттің 1 000-ына промо-email жіберді. Бір аптадан кейінгі нәтиже:</p>
<table>
<tr><th></th><th>Сатып алды</th><th>Алмады</th><th>Барлығы</th></tr>
<tr><td>Email алды</td><td>120</td><td>880</td><td>1 000</td></tr>
<tr><td>Email алмады</td><td>60</td><td>940</td><td>1 000</td></tr>
<tr><td><b>Барлығы</b></td><td>180</td><td>1 820</td><td>2 000</td></tr>
</table>
<ol>
<li>P(сатып алу) = 180 / 2 000 = 0.09.</li>
<li>P(сатып алу | email) = 120 / 1 000 = 0.12. Тек «Email алды» жолын қараймыз.</li>
<li>P(сатып алу | email жоқ) = 60 / 1 000 = 0.06.</li>
<li>Формуламен тексеру: P(сатып алу және email) = 120 / 2 000 = 0.06, P(email) = 0.5, 0.06 / 0.5 = 0.12. Сәйкес.</li>
</ol>
<h3>Тәуелсіздік</h3>
<p>A мен B <b>тәуелсіз</b>, егер B туралы білу A-ның ықтималдығын өзгертпесе:</p>
<pre><code>P(A | B) = P(A)   немесе   P(A және B) = P(A) × P(B)</code></pre>
<p>Біздің мысалда P(сатып алу | email) = 0.12 ≠ 0.09, сондықтан сатып алу email-ге тәуелді. Монеталарды бірнеше рет лақтыру — тәуелсіздіктің классикалық мысалы.</p>
<p>Python-да кестені сөздікпен сақтау ыңғайлы:</p>
<pre><code>t = {("email", "buy"): 120, ("email", "no"): 880,
     ("none", "buy"): 60,   ("none", "no"): 940}
row = t[("email", "buy")] + t[("email", "no")]
print(t[("email", "buy")] / row)   # 0.12</code></pre>
<div class="tip"><b>Жиі қателер:</b> (1) P(A | B) мен P(B | A)-ны шатастыру: P(email | сатып алу) = 120 / 180 ≈ 0.67, бұл 0.12 емес. (2) Бөлімге бүкіл деректі қою: шартты ықтималдықта бөлім — шарттың (B) жол саны. (3) Корреляциядағыдай, тәуелділік себеп емес: email-ді белсенді клиенттерге ғана жібердік пе, жоқ па — соны тексеріңіз.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: 'Кесте <code>t</code> құрылғы мен churn байланысын көрсетеді. Мыналарды есептеңіз: <code>p_churn</code> (жалпы), <code>p_churn_mobile</code> = P(churn | mobile), <code>p_churn_web</code> = P(churn | web), және <code>independent</code> — churn құрылғыдан тәуелсіз бе (<code>True</code>/<code>False</code>, шартты мен жалпы ықтималдықты 0.001 дәлдікпен салыстырыңыз).', starter: 't = {("mobile", "churn"): 90, ("mobile", "stay"): 510,\n     ("web", "churn"): 40, ("web", "stay"): 360}\n', solution: 't = {("mobile", "churn"): 90, ("mobile", "stay"): 510,\n     ("web", "churn"): 40, ("web", "stay"): 360}\ntotal = sum(t.values())\np_churn = (t[("mobile", "churn")] + t[("web", "churn")]) / total\np_churn_mobile = t[("mobile", "churn")] / (t[("mobile", "churn")] + t[("mobile", "stay")])\np_churn_web = t[("web", "churn")] / (t[("web", "churn")] + t[("web", "stay")])\nindependent = abs(p_churn_mobile - p_churn) < 0.001\nprint(p_churn, p_churn_mobile, p_churn_web, independent)', check: { tests: 'assert abs(p_churn - 0.13) < 1e-9, "p_churn = 130 / 1000 = 0.13"\nassert abs(p_churn_mobile - 0.15) < 1e-9, "P(churn | mobile) = 90 / 600 = 0.15: бөлім — mobile жолдарының саны"\nassert abs(p_churn_web - 0.10) < 1e-9, "P(churn | web) = 40 / 400 = 0.10"\nassert independent is False, "0.15 ≠ 0.13, сондықтан тәуелсіз емес: independent = False"' }, hints: ['Mobile жол саны: <code>t[("mobile", "churn")] + t[("mobile", "stay")]</code> = 600.', '<code>independent = abs(p_churn_mobile - p_churn) &lt; 0.001</code>'] },
        { type: 'sql', dataset: 'metrics', xp: 20, prompt: '<code>users</code> және <code>events</code> кестелерінен әр арна (<code>channel</code>) үшін P(purchase | channel) есептеңіз. Бағандар: <code>channel</code>, <code>n</code> (пайдаланушы саны), <code>p_purchase</code> (сатып алғандар үлесі, ондық бөлшек). <code>channel</code> бойынша сұрыптаңыз.', starter: '', solution: 'SELECT u.channel, COUNT(*) AS n, AVG(CASE WHEN e.user_id IS NOT NULL THEN 1.0 ELSE 0 END) AS p_purchase FROM users u LEFT JOIN events e ON e.user_id = u.id AND e.step = \'purchase\' GROUP BY u.channel ORDER BY u.channel;', hints: ['<code>users</code>-ке <code>events</code>-ті <code>LEFT JOIN</code> жасаңыз, шартқа <code>e.step = \'purchase\'</code> қосыңыз.', 'Үлес: <code>AVG(CASE WHEN e.user_id IS NOT NULL THEN 1.0 ELSE 0 END)</code>.'] },
        { type: 'quiz', xp: 10, prompt: 'Промо-email кестесінде P(email | сатып алу) қанша?', options: ['0.12', '120 / 180 ≈ 0.67', '0.09', '0.5'], answer: 1, explain: 'Шарт — «сатып алды», сондықтан бөлім 180 (сатып алғандардың бәрі), олардың 120-сы email алған.' }
      ]
    },
    {
      id: 'pr-5', title: 'Bayes теоремасы және base rate', minutes: 15,
      body: `
<p>Bayes теоремасы шартты ықтималдықты «аударады»: P(B | A)-ны білсек, P(A | B)-ны табады.</p>
<pre><code>P(A | B) = P(B | A) × P(A) / P(B)</code></pre>
<p>Ең жиі қолданысы: «тест (немесе модель) оң нәтиже берді — шынымен ауру (алаяқ) ма?»</p>
<ul>
<li><b>Prior</b> P(A): тестке дейінгі ықтималдық, яғни <b>base rate</b> (ауру қаншалықты жиі кездеседі).</li>
<li><b>Sensitivity</b> P(+ | ауру): ауруды тест қаншалықты жиі ұстайды.</li>
<li><b>False positive rate</b> P(+ | сау): сау адамға қате «оң» беру жиілігі.</li>
<li><b>Posterior</b> P(ауру | +): бізді қызықтыратын сан.</li>
</ul>
<h3>Қадамдап мысал: 10 000 адам</h3>
<p>Ауру 1% адамда кездеседі. Тест sensitivity 90%, false positive rate 5%. Формуланың орнына нақты адамдармен санаймыз:</p>
<table>
<tr><th></th><th>Тест +</th><th>Тест −</th><th>Барлығы</th></tr>
<tr><td>Ауру</td><td>90</td><td>10</td><td>100</td></tr>
<tr><td>Сау</td><td>495</td><td>9 405</td><td>9 900</td></tr>
<tr><td><b>Барлығы</b></td><td>585</td><td>9 415</td><td>10 000</td></tr>
</table>
<ol>
<li>Ауру: 10 000 × 0.01 = 100. Олардың 90%-ы тест +: 90.</li>
<li>Сау: 9 900. Олардың 5%-ы қате +: 495.</li>
<li>Барлық оң нәтиже: 90 + 495 = 585.</li>
<li>P(ауру | +) = 90 / 585 ≈ 0.154. Тек 15%!</li>
</ol>
<p>Тест «90% дәл» болса да, оң нәтижелердің көбі сау адамдардан келеді, себебі сау адамдар әлдеқайда көп. Бұл — <b>base rate</b> әсері.</p>
<h3>Python-да</h3>
<pre><code>def posterior(prior, sens, fpr):
    p_pos = sens * prior + fpr * (1 - prior)   # P(+)
    return sens * prior / p_pos</code></pre>
<p>Бизнесте дәл осы: алаяқтық дабылы, спам-фильтр, churn моделі. Алаяқтық 0.5% болса, «99% дәл» модельдің дабылдарының көбі жалған болуы мүмкін. Сондықтан командаға «дабыл берілгенде, шын алаяқтық ықтималдығы қанша?» деген санды көрсету керек.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Sensitivity-ді posterior деп оқу: P(+ | ауру) = 0.9, бірақ P(ауру | +) = 0.15. (2) Base rate-ті ұмыту (base rate fallacy). (3) P(+) есептегенде сау адамдардың жалған оң нәтижесін қоспау.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>posterior(prior, sens, fpr)</code> функциясын жазыңыз: P(A | +) қайтарсын. Сосын алаяқтық дабылы үшін есептеңіз: алаяқтық 0.5%, модель алаяқтықтың 99%-ын ұстайды, қалыпты транзакциялардың 2%-ына жалған дабыл береді. Нәтижені <code>p_fraud</code>-қа жазыңыз.', starter: 'def posterior(prior, sens, fpr):\n    pass\n\np_fraud = None\n', solution: 'def posterior(prior, sens, fpr):\n    p_pos = sens * prior + fpr * (1 - prior)\n    return sens * prior / p_pos\n\np_fraud = posterior(0.005, 0.99, 0.02)\nprint(p_fraud)', check: { tests: 'assert abs(posterior(0.01, 0.9, 0.05) - 90 / 585) < 1e-9, "posterior(0.01, 0.9, 0.05) ≈ 0.154 болуы керек (сабақтағы мысал)"\nassert abs(posterior(0.5, 0.8, 0.2) - 0.8) < 1e-9, "prior 0.5, sens 0.8, fpr 0.2 болса, posterior 0.8"\nassert p_fraud is not None and abs(p_fraud - 0.1992) < 0.001, "p_fraud ≈ 0.199: posterior(0.005, 0.99, 0.02)"', mustInclude: ['def posterior'] }, hints: ['Алдымен P(+) = <code>sens * prior + fpr * (1 - prior)</code>.', '<code>p_fraud = posterior(0.005, 0.99, 0.02)</code>'] },
        { type: 'number', xp: 15, prompt: '10 000 транзакцияның 50-і алаяқтық. Модель алаяқтықтың 40-ын ұстады және 160 қалыпты транзакцияға жалған дабыл берді. Дабыл берілгенде, оның шын алаяқтық болу ықтималдығы қанша? (ондық бөлшек)', answer: 0.2, tol: 0.001, explain: 'Барлық дабыл: 40 + 160 = 200. Шын алаяқтық: 40. 40 / 200 = 0.2.' },
        { type: 'quiz', xp: 10, prompt: 'Неге «99% дәл» алаяқтық моделінің дабылдарының көбі жалған болуы мүмкін?', options: ['Модель нашар оқытылған', 'Алаяқтық өте сирек (base rate төмен), сондықтан қалыпты транзакциялардан келген аз ғана қате дабылдың өзі шын дабылдардан көп', 'Bayes теоремасы бизнеске қолданылмайды', 'Дабылдар кездейсоқ'], answer: 1, explain: 'Қалыпты транзакциялар мыңдаған есе көп. Олардың 1–2%-ы да шын алаяқтықтың барлық санынан асып кетеді.' }
      ]
    },
    {
      id: 'pr-6', title: 'Комбинаторика: permutations және combinations', minutes: 12,
      body: `
<p>Классикалық ықтималдық үшін нәтижелерді санау керек. Нәтижелер миллиондаған болса, оларды тізбей алмаймыз, формула керек.</p>
<h3>Көбейту ережесі</h3>
<p>Бір таңдауда a нұсқа, екіншісінде b нұсқа болса, барлығы a × b. Футболка: 3 түс × 4 өлшем = 12 нұсқа. 4 таңбалы PIN-код: 10 × 10 × 10 × 10 = 10 000.</p>
<h3>Факториал және permutations</h3>
<p>n элементті <b>ретімен</b> орналастыру саны: n! = n × (n − 1) × ... × 1. 3 баннерді бетте орналастыру: 3! = 6 тәсіл.</p>
<p>n элементтен k элементті <b>ретімен</b> таңдау (permutations):</p>
<pre><code>P(n, k) = n! / (n − k)!
math.perm(10, 3)   # 720: 10 үміткерден 1-, 2-, 3-орын</code></pre>
<h3>Combinations: рет маңызды емес</h3>
<pre><code>C(n, k) = n! / (k! × (n − k)!)
math.comb(10, 3)   # 120: 10 адамнан 3 адамдық топ</code></pre>
<p>Айырмашылық: «жеңімпаз, екінші, үшінші» — рет маңызды (perm). «Үш адамдық комиссия» — рет маңызды емес (comb). Әр 3 адамдық топ 3! = 6 рет ретімен жазылады, сондықтан 720 / 6 = 120.</p>
<h3>Қадамдап мысал</h3>
<p>Қоймада 12 тауар, оның 3-еуі ақаулы. Кездейсоқ 4 тауар тексерілді. Дәл 1 ақаулы табылу ықтималдығы?</p>
<ol>
<li>Барлық тәсіл: 12-ден 4 таңдау, рет маңызды емес: C(12, 4) = 495.</li>
<li>Қолайлы: 3 ақаулыдан 1 таңдау × 9 сапалыдан 3 таңдау = C(3, 1) × C(9, 3) = 3 × 84 = 252.</li>
<li>P = 252 / 495 ≈ 0.509.</li>
</ol>
<pre><code>import math
p = math.comb(3, 1) * math.comb(9, 3) / math.comb(12, 4)
print(round(p, 3))   # 0.509</code></pre>
<p>Бұл формула келесі сабақтағы Binomial таралудың да негізі: «n тәжірибеден қай k-сы сәтті болды» — бұл C(n, k).</p>
<div class="tip"><b>Жиі қателер:</b> (1) Рет маңызды ма, жоқ па — алдымен осыны шешіңіз. Шатастырсаңыз, жауап k! есе қате. (2) Қайталау бар-жоғын тексермеу: PIN-кодта цифр қайталана алады (10⁴), ал жарыс орындарында бір адам екі орын алмайды (perm). (3) <code>math.comb(n, k)</code> мен <code>math.comb(k, n)</code>-ді шатастыру: k &gt; n болса, нәтиже 0.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>math</code> модулімен есептеңіз: <code>teams</code> — 15 қызметкерден 4 адамдық жоба тобын құру тәсілдері; <code>podium</code> — 8 командадан 1-, 2-, 3-орынды бөлу тәсілдері; <code>pins</code> — 4 таңбалы PIN-кодтар саны (0–9, қайталау бар).', starter: 'import math\nteams = None\npodium = None\npins = None\n', solution: 'import math\nteams = math.comb(15, 4)\npodium = math.perm(8, 3)\npins = 10 ** 4\nprint(teams, podium, pins)', check: { tests: 'assert teams == 1365, "teams: рет маңызды емес — math.comb(15, 4) = 1365"\nassert podium == 336, "podium: рет маңызды — math.perm(8, 3) = 336"\nassert pins == 10000, "pins: әр орынға 10 цифр, 10 ** 4"' }, hints: ['Топ — combinations, орындар — permutations.', 'PIN: көбейту ережесі, <code>10 ** 4</code>.'] },
        { type: 'python', xp: 20, prompt: '<code>p_defects(N, D, n, k)</code> функциясын жазыңыз: N тауардың D-сы ақаулы; кездейсоқ n тауар алынды; дәл k ақаулы табылу ықтималдығын <code>math.comb</code> арқылы қайтарсын.', starter: 'import math\n\ndef p_defects(N, D, n, k):\n    pass\n', solution: 'import math\n\ndef p_defects(N, D, n, k):\n    return math.comb(D, k) * math.comb(N - D, n - k) / math.comb(N, n)', check: { tests: 'assert abs(p_defects(12, 3, 4, 1) - 252 / 495) < 1e-9, "p_defects(12, 3, 4, 1) ≈ 0.509 (сабақтағы мысал)"\nassert abs(p_defects(12, 3, 4, 0) - 126 / 495) < 1e-9, "k = 0: C(9, 4) / C(12, 4)"\nassert abs(sum(p_defects(20, 5, 6, _k) for _k in range(6)) - 1) < 1e-9, "Барлық k бойынша ықтималдықтардың қосындысы 1 болуы керек"', mustInclude: ['math.comb'] }, hints: ['Ақаулыдан k таңдау: <code>math.comb(D, k)</code>, сапалыдан қалғаны: <code>math.comb(N - D, n - k)</code>.', 'Бөлім: <code>math.comb(N, n)</code>.'] },
        { type: 'number', xp: 10, prompt: '8 өнімнен жарнамаға 3 өнім таңдау керек (рет маңызды емес). Неше тәсіл бар?', answer: 56, tol: 0, explain: 'C(8, 3) = 8 × 7 × 6 / (3 × 2 × 1) = 56.' }
      ]
    },
    {
      id: 'pr-7', title: 'Bernoulli және Binomial таралу', minutes: 15,
      body: `
<p><b>Кездейсоқ шама</b> (random variable) — тәжірибенің нәтижесіне сан беретін ереже. «Келуші сатып алды ма?» → 1 немесе 0. «100 келушіден неше сатып алу?» → 0..100.</p>
<h3>Bernoulli</h3>
<p>Бір тәжірибе, екі нәтиже: сәтті (1) p ықтималдықпен, сәтсіз (0) 1 − p ықтималдықпен. Конверсия, email ашу, кредит қайтару — бәрі Bernoulli.</p>
<h3>Binomial</h3>
<p>n тәуелсіз Bernoulli тәжірибесіндегі сәттілер саны X ~ Binomial(n, p). Оның <b>pmf</b>-і (probability mass function — әр мәннің ықтималдығы):</p>
<pre><code>P(X = k) = C(n, k) × p^k × (1 − p)^(n − k)</code></pre>
<p>Мағынасы: k сәтті және n − k сәтсіз нәтиженің бір нақты реті p^k (1 − p)^(n − k) ықтималдықпен болады, ал мұндай реттер саны C(n, k).</p>
<h3>Қадамдап мысал: қолмен</h3>
<p>Конверсия 10%. 4 келуші. Дәл 1 сатып алу ықтималдығы?</p>
<ol>
<li>Бір реті, мысалы «иә, жоқ, жоқ, жоқ»: 0.1 × 0.9 × 0.9 × 0.9 = 0.0729.</li>
<li>Сатып алушы 4 адамның кез келгені бола алады: C(4, 1) = 4 рет.</li>
<li>P(X = 1) = 4 × 0.0729 = 0.2916.</li>
</ol>
<h3>Python-да</h3>
<pre><code>import math
def binom_pmf(k, n, p):
    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)

binom_pmf(1, 4, 0.1)                              # 0.2916
sum(binom_pmf(k, 4, 0.1) for k in range(5))       # 1.0</code></pre>
<p>«Кемінде k» сұрақтары үшін толықтауыш ыңғайлы: P(X ≥ 3) = 1 − P(X = 0) − P(X = 1) − P(X = 2).</p>
<p>Binomial-дың орташасы n × p, дисперсиясы n × p × (1 − p). 200 келуші, конверсия 5% болса, орташа 10 сатып алу күтеміз.</p>
<div class="tip"><b>Жиі қателер:</b> (1) C(n, k)-ны ұмыту: тек бір ретті есептеп қою. (2) Тәуелсіздік бұзылған жерде Binomial қолдану: бір отбасынан 5 адам — тәуелсіз емес. (3) «Кемінде 3» дегенде P(X = 3)-ті ғана алу. «Кемінде» — 3, 4, ..., n қосындысы.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>binom_pmf(k, n, p)</code> функциясын <code>math.comb</code> арқылы жазыңыз.', starter: 'import math\n\ndef binom_pmf(k, n, p):\n    pass\n', solution: 'import math\n\ndef binom_pmf(k, n, p):\n    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)', check: { tests: 'assert abs(binom_pmf(1, 4, 0.1) - 0.2916) < 1e-9, "binom_pmf(1, 4, 0.1) = 0.2916: C(n, k)-ны ұмытпадыңыз ба?"\nassert abs(binom_pmf(2, 4, 0.5) - 0.375) < 1e-9, "binom_pmf(2, 4, 0.5) = 0.375"\nassert abs(sum(binom_pmf(_k, 10, 0.3) for _k in range(11)) - 1) < 1e-9, "Барлық k бойынша қосынды 1 болуы керек"', mustInclude: ['def binom_pmf'] }, hints: ['Формула: <code>math.comb(n, k) * p ** k * (1 - p) ** (n - k)</code>'] },
        { type: 'python', xp: 25, prompt: 'Email-дің ашылу ықтималдығы 10%. 20 адамға жібердік. <code>p_at_least_3</code> — кемінде 3 адамның ашу ықтималдығы, <code>expected</code> — күтілетін ашулар саны (n × p). Толықтауышты қолданыңыз.', starter: 'import math\nn, p = 20, 0.1\n', solution: 'import math\nn, p = 20, 0.1\ndef binom_pmf(k, n, p):\n    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)\np_at_least_3 = 1 - sum(binom_pmf(k, n, p) for k in range(3))\nexpected = n * p\nprint(p_at_least_3, expected)', check: { tests: 'assert abs(p_at_least_3 - 0.3231) < 0.0005, "p_at_least_3 ≈ 0.323: 1 − (P(0) + P(1) + P(2))"\nassert abs(expected - 2) < 1e-9, "expected = n × p = 2"' }, hints: ['Алдымен <code>binom_pmf</code> функциясын жазыңыз (алдыңғы тапсырма).', '<code>1 - sum(binom_pmf(k, n, p) for k in range(3))</code>'] },
        { type: 'number', xp: 10, prompt: 'Монетаны 4 рет лақтырдық. Дәл 2 «елтаңба» түсу ықтималдығы қанша?', answer: 0.375, tol: 0.001, explain: 'C(4, 2) × 0.5² × 0.5² = 6 × 0.0625 = 0.375.' }
      ]
    },
    {
      id: 'pr-8', title: 'Poisson таралу: сағаттағы тапсырыстар', minutes: 13,
      body: `
<p>Binomial-да тәжірибе саны n белгілі. Ал «бір сағатта неше тапсырыс келеді?», «бір күнде қанша support тикет?» деген сұрақтарда n жоқ: оқиғалар уақыт бойы кездейсоқ келеді. Мұндай санауларды <b>Poisson</b> таралуы сипаттайды.</p>
<p>X ~ Poisson(λ), мұнда <b>λ</b> (лямбда) — бір аралықтағы орташа оқиға саны.</p>
<pre><code>P(X = k) = λ^k × e^(−λ) / k!</code></pre>
<p>Қасиеттері: орташасы λ, дисперсиясы да λ. Мәндері 0, 1, 2, ... (жоғарыдан шектелмеген).</p>
<h3>Қашан қолданылады</h3>
<ul>
<li>Оқиғалар бір-біріне тәуелсіз келеді.</li>
<li>Орташа жылдамдық тұрақты (түскі сағат пен түнгі сағатты араластырмаңыз).</li>
<li>Екі оқиға дәл бір сәтте келмейді.</li>
</ul>
<h3>Қадамдап мысал</h3>
<p>Кафеге сағатына орташа 4 онлайн-тапсырыс келеді (λ = 4). Бір сағатта тапсырыс мүлде келмеу ықтималдығы, және 6-дан көп келу ықтималдығы?</p>
<ol>
<li>P(X = 0) = 4⁰ × e⁻⁴ / 0! = e⁻⁴ ≈ 0.0183. Шамамен 2%.</li>
<li>P(X = 1) = 4 × e⁻⁴ ≈ 0.0733, P(X = 2) = 16 × e⁻⁴ / 2 ≈ 0.1465, ...</li>
<li>P(X ≤ 6) — 0-ден 6-ға дейінгі қосынды ≈ 0.889.</li>
<li>P(X &gt; 6) = 1 − 0.889 ≈ 0.111. Сағаттардың шамамен 11%-ында 6-дан көп тапсырыс.</li>
</ol>
<pre><code>import math
def poisson_pmf(k, lam):
    return lam ** k * math.exp(-lam) / math.factorial(k)

p_le6 = sum(poisson_pmf(k, 4) for k in range(7))
print(round(1 - p_le6, 3))   # 0.111</code></pre>
<p>Бизнес қорытынды: бір курьер сағатына 6 тапсырыс жеткізе алса, сағаттардың ~11%-ында кешігу болады. Екінші курьер керек пе — енді сандармен талқылауға болады.</p>
<h3>Аралықты өзгерту</h3>
<p>λ уақыт аралығына пропорционал: сағатына 4 болса, 30 минутқа λ = 2, бір күнге (10 сағат) λ = 40.</p>
<div class="tip"><b>Жиі қателер:</b> (1) λ-ны аралыққа сәйкестендірмеу: сұрақ 30 минут туралы болса, λ-ны да 30 минутқа келтіріңіз. (2) «6-дан көп» дегенде <code>range(6)</code> алу: P(X &gt; 6) = 1 − P(X ≤ 6), ал X ≤ 6 үшін <code>range(7)</code>. (3) Орташасы мен дисперсиясы қатты өзгеше деректе (мысалы, акция күндері) Poisson-ды сынақсыз қолдану.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>poisson_pmf(k, lam)</code> функциясын жазыңыз (<code>math.exp</code>, <code>math.factorial</code>).', starter: 'import math\n\ndef poisson_pmf(k, lam):\n    pass\n', solution: 'import math\n\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)', check: { tests: 'import math as _m\nassert abs(poisson_pmf(0, 4) - _m.exp(-4)) < 1e-12, "poisson_pmf(0, 4) = e^(−4) ≈ 0.0183"\nassert abs(poisson_pmf(2, 4) - 8 * _m.exp(-4)) < 1e-12, "poisson_pmf(2, 4) = 16 × e^(−4) / 2 ≈ 0.1465"\nassert abs(sum(poisson_pmf(_k, 3) for _k in range(60)) - 1) < 1e-9, "Барлық k бойынша қосынды ≈ 1 болуы керек"', mustInclude: ['def poisson_pmf'] }, hints: ['<code>lam ** k * math.exp(-lam) / math.factorial(k)</code>'] },
        { type: 'python', xp: 25, prompt: 'Support командасына сағатына орташа 5 тикет келеді. <code>p_over8</code> — бір сағатта 8-ден <b>көп</b> тикет келу ықтималдығы. <code>p_zero_30min</code> — 30 минутта бірде-бір тикет келмеу ықтималдығы (λ-ны аралыққа келтіріңіз).', starter: 'import math\nlam = 5\n', solution: 'import math\nlam = 5\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\np_over8 = 1 - sum(poisson_pmf(k, lam) for k in range(9))\np_zero_30min = poisson_pmf(0, lam / 2)\nprint(p_over8, p_zero_30min)', check: { tests: 'import math as _m\nassert abs(p_over8 - 0.0681) < 0.0005, "p_over8 ≈ 0.068: 1 − P(X ≤ 8), ал X ≤ 8 үшін range(9)"\nassert abs(p_zero_30min - _m.exp(-2.5)) < 1e-9, "30 минутқа λ = 2.5, P(0) = e^(−2.5) ≈ 0.082"' }, hints: ['8-ден көп = 1 − P(X ≤ 8), яғни <code>range(9)</code>.', '30 минут — сағаттың жартысы: λ = 5 / 2.'] },
        { type: 'quiz', xp: 10, prompt: 'Қай шаманы Poisson таралуымен модельдеген ең орынды?', options: ['100 келушінің ішіндегі сатып алушылар саны', 'Бір сағатта call-орталыққа түскен қоңыраулар саны', 'Клиенттің бойы', 'Тапсырыс сомасы (теңге)'], answer: 1, explain: 'Уақыт аралығындағы тәуелсіз оқиғалар саны — Poisson. 100 келуші (n белгілі) — Binomial, бой мен сома — үздіксіз шамалар.' }
      ]
    },
    {
      id: 'pr-9', title: 'Үздіксіз таралулар: uniform және NormalDist', minutes: 15,
      body: `
<p>Тапсырыс саны — <b>дискретті</b> (0, 1, 2, ...). Ал жеткізу уақыты, бой, сома — <b>үздіксіз</b>: 40.0, 40.01, 40.013 ... минут. Үздіксіз шамада бір нақты мәннің ықтималдығы 0, сондықтан біз <b>аралықтардың</b> ықтималдығын сұраймыз: P(35 &lt; X &lt; 45).</p>
<p>Ол үшін <b>CDF</b> (cumulative distribution function) қолданылады: F(x) = P(X ≤ x). Аралық: P(a &lt; X ≤ b) = F(b) − F(a).</p>
<h3>Uniform таралу</h3>
<p>[a, b] аралығындағы барлық мән бірдей ықтимал. Автобус 20 минут сайын келеді, сіз кездейсоқ уақытта келдіңіз: күту уақыты Uniform(0, 20). P(X ≤ x) = (x − a) / (b − a). 5 минуттан аз күту: 5 / 20 = 0.25.</p>
<h3>Normal таралу: statistics.NormalDist</h3>
<p>M3.1-дегі 68–95–99.7 ережесі жуық. Дәл сан үшін Python-да дайын класс бар:</p>
<pre><code>from statistics import NormalDist
d = NormalDist(mu=40, sigma=5)   # жеткізу уақыты, мин
d.cdf(45)          # P(X ≤ 45) ≈ 0.841
d.inv_cdf(0.95)    # 95% тапсырыс осы уақыттан тез: ≈ 48.2</code></pre>
<p><code>cdf</code> мәннен ықтималдыққа апарады, <code>inv_cdf</code> керісінше: ықтималдықтан мәнге (перцентиль).</p>
<h3>Қадамдап мысал</h3>
<p>Жеткізу уақыты NormalDist(40, 5). Уәде — 50 минут. Неше пайызы кешігеді, және 95% тапсырысқа қандай уәде беру керек?</p>
<ol>
<li>Кешігу: P(X &gt; 50) = 1 − cdf(50). z = (50 − 40) / 5 = 2, cdf(50) ≈ 0.9772.</li>
<li>1 − 0.9772 = 0.0228: шамамен 2.3% (ереже 2.5% дейтін, дәлі 2.28%).</li>
<li>95% уәде: inv_cdf(0.95) ≈ 48.2 минут.</li>
<li>Аралық: P(35 &lt; X ≤ 45) = cdf(45) − cdf(35) ≈ 0.841 − 0.159 = 0.683.</li>
</ol>
<div class="tip"><b>Жиі қателер:</b> (1) «Х-тен көп» сұрағында <code>cdf</code>-тің өзін алу: керегі <code>1 - cdf(x)</code>. (2) <code>sigma</code> орнына дисперсияны беру: NormalDist SD күтеді. (3) Қисайған деректі (жалақы, сома) Normal деп модельдеу — алдымен гистограмма.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: 'Жеткізу уақыты <code>NormalDist(mu=40, sigma=5)</code>. Есептеңіз: <code>p_late</code> — 50 минуттан ұзақ жеткізу ықтималдығы; <code>p_window</code> — 35 пен 45 минут аралығы; <code>promise_95</code> — тапсырыстардың 95%-ы осы уақыттан тез жететін минут саны.', starter: 'from statistics import NormalDist\nd = NormalDist(mu=40, sigma=5)\n', solution: 'from statistics import NormalDist\nd = NormalDist(mu=40, sigma=5)\np_late = 1 - d.cdf(50)\np_window = d.cdf(45) - d.cdf(35)\npromise_95 = d.inv_cdf(0.95)\nprint(p_late, p_window, promise_95)', check: { tests: 'assert abs(p_late - 0.02275) < 0.0001, "p_late ≈ 0.0228: 1 − d.cdf(50)"\nassert abs(p_window - 0.6827) < 0.0001, "p_window ≈ 0.683: d.cdf(45) − d.cdf(35)"\nassert abs(promise_95 - 48.224) < 0.01, "promise_95 ≈ 48.2: d.inv_cdf(0.95)"' }, hints: ['«Ұзақ» — оң құйрық: <code>1 - d.cdf(50)</code>.', 'Перцентиль: <code>d.inv_cdf(0.95)</code>.'] },
        { type: 'number', xp: 10, prompt: 'Курьер 0-ден 30 минутқа дейінгі кездейсоқ уақытта келеді (Uniform). 12 минуттан ерте келу ықтималдығы қанша?', answer: 0.4, tol: 0.001, explain: '(12 − 0) / (30 − 0) = 0.4.' },
        { type: 'quiz', xp: 10, prompt: '<code>NormalDist(100, 15).inv_cdf(0.9)</code> не қайтарады?', options: ['100-ден кіші болу ықтималдығы', 'Мәндердің 90%-ы одан төмен жататын нүкте (90-перцентиль) ≈ 119', '0.9 мәнінің ықтималдығы', 'Стандартты ауытқу'], answer: 1, explain: 'inv_cdf ықтималдықтан мәнге апарады: P(X ≤ x) = 0.9 болатын x ≈ 100 + 1.28 × 15 ≈ 119.' }
      ]
    },
    {
      id: 'pr-10', title: 'Күтілетін мән және дисперсия: промо тиімді ме?', minutes: 15,
      body: `
<p><b>Күтілетін мән</b> (expected value, E[X]) — кездейсоқ шаманың «ұзақ мерзімдегі орташасы»: әр мәнді оның ықтималдығына көбейтіп, қосамыз.</p>
<pre><code>E[X] = Σ x × P(X = x)
Var(X) = Σ (x − E[X])² × P(X = x)</code></pre>
<p>Дисперсия мен SD (√Var) тәуекелді өлшейді: орташасы бірдей екі шешімнің біреуі әлдеқайда «секірмелі» болуы мүмкін.</p>
<pre><code>def expected_value(dist):          # dist: {мән: ықтималдық}
    return sum(x * p for x, p in dist.items())

def variance(dist):
    m = expected_value(dist)
    return sum((x - m) ** 2 * p for x, p in dist.items())</code></pre>
<h3>Қадамдап мысал: промо тиімді ме?</h3>
<p>Интернет-дүкен. Қазір конверсия 5%, бір сатудан маржа 4 000 ₸. Маркетинг 1 000 ₸ жеңілдік ұсынады: болжам бойынша конверсия 7%-ға өседі.</p>
<table>
<tr><th></th><th>Промосыз</th><th>Промомен</th></tr>
<tr><td>P(сатып алу)</td><td>0.05</td><td>0.07</td></tr>
<tr><td>Маржа (сатылса)</td><td>4 000 ₸</td><td>3 000 ₸</td></tr>
<tr><td>E[пайда / келуші]</td><td>0.05 × 4 000 = 200 ₸</td><td>0.07 × 3 000 = 210 ₸</td></tr>
</table>
<ol>
<li>Әр келуші — кездейсоқ шама: маржа p ықтималдықпен, әйтпесе 0.</li>
<li>E[промосыз] = 200 ₸, E[промомен] = 210 ₸. Айырма +10 ₸ / келуші.</li>
<li>Айына 50 000 келуші болса: 50 000 × 10 = +500 000 ₸.</li>
<li>Бірақ конверсия тек 6.5%-ға өссе: 0.065 × 3 000 = 195 ₸ &lt; 200 ₸ — промо зиянды. Шешім болжамға өте сезімтал, сондықтан алдымен A/B тест (M4.2).</li>
</ol>
<h3>Дисперсия мысалы</h3>
<p>Промосыз: X ∈ {0, 4 000}, P = {0.95, 0.05}. Var = 0.95 × 200² + 0.05 × 3 800² = 760 000, SD ≈ 872 ₸. Бір келушіде пайда өте шулы, бірақ мыңдаған келушіде орташа E[X]-ке жақындайды (үлкен сандар заңы).</p>
<div class="tip"><b>Жиі қателер:</b> (1) Ықтималдықтар қосындысы 1 екенін тексермеу. (2) Жеңілдікті маржадан шегеруді ұмыту. (3) Тек E[X]-ке қарап, тәуекелді (SD) елемеу: E[X] бірдей болса, тұрақтырақ нұсқа жақсы болуы мүмкін.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>expected_value(dist)</code> және <code>variance(dist)</code> функцияларын жазыңыз. <code>dist</code> — <code>{мән: ықтималдық}</code> сөздігі.', starter: 'def expected_value(dist):\n    pass\n\ndef variance(dist):\n    pass\n', solution: 'def expected_value(dist):\n    return sum(x * p for x, p in dist.items())\n\ndef variance(dist):\n    m = expected_value(dist)\n    return sum((x - m) ** 2 * p for x, p in dist.items())', check: { tests: '_d = {0: 0.95, 4000: 0.05}\nassert abs(expected_value(_d) - 200) < 1e-9, "E[X] = 0.05 × 4000 = 200"\nassert abs(variance(_d) - 760000) < 1e-6, "Var(X) = 760 000: (x − E[X])² × p қосындысы"\n_die = {_k: 1 / 6 for _k in range(1, 7)}\nassert abs(expected_value(_die) - 3.5) < 1e-9, "Сүйектің E[X] = 3.5"\nassert abs(variance(_die) - 35 / 12) < 1e-9, "Сүйектің Var(X) = 35/12 ≈ 2.917"', mustInclude: ['def expected_value', 'def variance'] }, hints: ['<code>sum(x * p for x, p in dist.items())</code>', 'Дисперсияда алдымен <code>m = expected_value(dist)</code>.'] },
        { type: 'python', xp: 25, prompt: 'Промо шешімі. Промосыз: конверсия 5%, маржа 4 000 ₸. Промомен: конверсия 6.5%, жеңілдік 1 000 ₸ (маржа 3 000 ₸). <code>ev_base</code>, <code>ev_promo</code> — бір келушіге күтілетін пайда; <code>monthly_diff</code> — 50 000 келушіге айырма (<code>ev_promo - ev_base</code> × 50 000); <code>launch</code> — промо тиімді болса <code>True</code>.', starter: 'visitors = 50000\n', solution: 'visitors = 50000\nev_base = 0.05 * 4000\nev_promo = 0.065 * (4000 - 1000)\nmonthly_diff = (ev_promo - ev_base) * visitors\nlaunch = ev_promo > ev_base\nprint(ev_base, ev_promo, monthly_diff, launch)', check: { tests: 'assert abs(ev_base - 200) < 1e-9, "ev_base = 0.05 × 4000 = 200"\nassert abs(ev_promo - 195) < 1e-9, "ev_promo = 0.065 × 3000 = 195: жеңілдікті маржадан шегеріңіз"\nassert abs(monthly_diff + 250000) < 1e-6, "monthly_diff = (195 − 200) × 50 000 = −250 000"\nassert launch is False, "195 < 200, промо тиімсіз: launch = False"' }, hints: ['Промомен маржа: <code>4000 - 1000</code>.', '<code>launch = ev_promo &gt; ev_base</code>'] },
        { type: 'number', xp: 15, prompt: 'Лотерея билеті 500 ₸. 1/1000 ықтималдықпен 100 000 ₸, 1/100 ықтималдықпен 5 000 ₸ ұтасыз, әйтпесе ештеңе. Бір билеттің күтілетін <b>таза</b> пайдасы (ұтыс − баға) қанша теңге?', answer: -350, tol: 0.01, unit: '₸', explain: 'E[ұтыс] = 0.001 × 100 000 + 0.01 × 5 000 = 100 + 50 = 150 ₸. Таза: 150 − 500 = −350 ₸.' }
      ]
    },
    {
      id: 'pr-gate', gate: true, title: 'Модуль емтиханы: Probability', minutes: 25,
      body: `
<p>Қорытынды тексеріс: шартты ықтималдық, Bayes, Binomial, Poisson, Normal және күтілетін мән. Python тапсырмаларында тек стандарт кітапхана (<code>math</code>, <code>statistics</code>, <code>random</code>) қолжетімді.</p>`,
      exercises: [
        { type: 'python', xp: 40, prompt: '<code>prob_at_least(k, n, p)</code> функциясын жазыңыз: X ~ Binomial(n, p) үшін P(X ≥ k) қайтарсын (<code>math.comb</code>). Сосын: конверсия 4%, 50 келуші — кемінде 4 сатып алу ықтималдығын <code>p_goal</code>-ға жазыңыз.', starter: 'import math\n\ndef prob_at_least(k, n, p):\n    pass\n\np_goal = None\n', solution: 'import math\n\ndef prob_at_least(k, n, p):\n    return sum(math.comb(n, i) * p ** i * (1 - p) ** (n - i) for i in range(k, n + 1))\n\np_goal = prob_at_least(4, 50, 0.04)\nprint(p_goal)', check: { tests: 'import math as _m\n_exp = lambda k, n, p: sum(_m.comb(n, i) * p ** i * (1 - p) ** (n - i) for i in range(k, n + 1))\nassert abs(prob_at_least(0, 10, 0.3) - 1) < 1e-9, "P(X ≥ 0) = 1"\nassert abs(prob_at_least(2, 4, 0.5) - 0.6875) < 1e-9, "prob_at_least(2, 4, 0.5) = 11/16 = 0.6875"\nassert abs(prob_at_least(3, 20, 0.1) - _exp(3, 20, 0.1)) < 1e-9, "prob_at_least(3, 20, 0.1) ≈ 0.323"\nassert p_goal is not None and abs(p_goal - _exp(4, 50, 0.04)) < 1e-9, f"p_goal ≈ {_exp(4, 50, 0.04):.4f} болуы керек"' }, hints: [] },
        { type: 'python', xp: 35, prompt: 'Колл-орталыққа сағатына орташа 3 шағым келеді (Poisson). Бір оператор сағатына 5 шағымды өңдейді. <code>p_overload</code> — сағатта 5-тен көп шағым келу ықтималдығы. <code>p_quiet_day</code> — 8 сағаттық жұмыс күнінде 15-тен аз (≤ 14) шағым келу ықтималдығы.', starter: 'import math\n', solution: 'import math\ndef poisson_pmf(k, lam):\n    return lam ** k * math.exp(-lam) / math.factorial(k)\np_overload = 1 - sum(poisson_pmf(k, 3) for k in range(6))\np_quiet_day = sum(poisson_pmf(k, 24) for k in range(15))\nprint(p_overload, p_quiet_day)', check: { tests: 'import math as _m\n_pmf = lambda k, l: l ** k * _m.exp(-l) / _m.factorial(k)\nassert abs(p_overload - (1 - sum(_pmf(_k, 3) for _k in range(6)))) < 1e-9, "p_overload ≈ 0.084: 1 − P(X ≤ 5)"\nassert abs(p_quiet_day - sum(_pmf(_k, 24) for _k in range(15))) < 1e-9, "Күнге λ = 3 × 8 = 24, P(X ≤ 14) = range(15) қосындысы"' }, hints: [] },
        { type: 'python', xp: 30, prompt: 'Скрининг тест: ауру 2% адамда, sensitivity 95%, false positive rate 10%. <code>p_sick_pos</code> — тест оң болғанда, шынымен ауру болу ықтималдығы. <code>p_pos</code> — кездейсоқ адамның тесті оң болу ықтималдығы.', starter: 'prior, sens, fpr = 0.02, 0.95, 0.10\n', solution: 'prior, sens, fpr = 0.02, 0.95, 0.10\np_pos = sens * prior + fpr * (1 - prior)\np_sick_pos = sens * prior / p_pos\nprint(p_pos, p_sick_pos)', check: { tests: 'assert abs(p_pos - 0.117) < 1e-9, "p_pos = 0.95 × 0.02 + 0.10 × 0.98 = 0.117"\nassert abs(p_sick_pos - 0.019 / 0.117) < 1e-9, "p_sick_pos = 0.019 / 0.117 ≈ 0.162"' }, hints: [] },
        { type: 'quiz', xp: 20, prompt: 'Жеткізу уақыты NormalDist(30, 6). «Тапсырыстардың 99%-ы X минутта жетеді» деп уәде беру үшін X-ті қалай табасыз?', options: ['<code>NormalDist(30, 6).cdf(0.99)</code>', '<code>NormalDist(30, 6).inv_cdf(0.99)</code>', '<code>30 + 0.99 * 6</code>', '<code>1 - NormalDist(30, 6).cdf(99)</code>'], answer: 1, explain: 'Ықтималдықтан мәнге — inv_cdf. Нәтиже ≈ 30 + 2.33 × 6 ≈ 44 минут.' },
        { type: 'number', xp: 20, prompt: 'Жарнамалық науқан: 0.6 ықтималдықпен 1 000 000 ₸ пайда, 0.4 ықтималдықпен 500 000 ₸ шығын (−500 000). Күтілетін пайда қанша теңге?', answer: 400000, tol: 1, unit: '₸', explain: '0.6 × 1 000 000 + 0.4 × (−500 000) = 600 000 − 200 000 = 400 000 ₸.' }
      ]
    }
  ]
};
