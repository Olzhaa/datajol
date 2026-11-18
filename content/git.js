// M2.3 Git & GitHub. Command exercises (type 'cmd') match the typed command against regex patterns in `accept`.
DJ.modules['m2-3'] = {
  intro: 'Git — кодтың өзгерістер тарихын сақтайтын жүйе, ал GitHub — сол тарихты бұлтта сақтап, бөлісетін орын. Аналитик үшін бұл SQL скрипттері мен ноутбуктерді сақтау, командамен жұмыс және портфолио. Тапсырмаларда терминалға қандай команда жазатыныңызды тексереміз.',
  lessons: [
    {
      id: 'git-1', title: 'Неге Git керек?', minutes: 8,
      body: `
<p>Таныс жағдай: <code>report_final.xlsx</code>, <code>report_final_v2.xlsx</code>, <code>report_final_ACTUAL.xlsx</code>. Қайсысы соңғы? Не өзгерді? Git осы мәселені шешеді.</p>
<ul>
<li><b>Repository (репозиторий)</b> — жобаның папкасы және оның толық тарихы.</li>
<li><b>Commit</b> — жобаның белгілі бір сәттегі «суреті» және не өзгергені туралы хабарлама.</li>
<li><b>Branch (тармақ)</b> — негізгі нұсқаны бұзбай, бөлек жұмыс істейтін желі.</li>
<li><b>Remote</b> — репозиторийдің бұлттағы көшірмесі (GitHub, GitLab).</li>
</ul>
<h3>Үш аймақ</h3>
<pre><code>Working directory  ──git add──▶  Staging area  ──git commit──▶  Repository
(өзгертілген файлдар)            (келесі commit-ке дайын)        (сақталған тарих)</code></pre>
<div class="tip">Git — бағдарлама (компьютерде), GitHub — сайт (бұлтта). Git-ті GitHub-сыз да қолдануға болады.</div>
<h3>Аналитикке Git не береді?</h3>
<ul>
<li><b>Тарих</b>: үш ай бұрын есепте қандай сүзгі болғанын бір командамен көресіз.</li>
<li><b>Қауіпсіз эксперимент</b>: жаңа тәсілді бөлек тармақта байқап, нәтиже шықпаса, жай ғана тастай саласыз.</li>
<li><b>Командалық жұмыс</b>: бірнеше адам бір SQL файлын бір-бірінің жұмысын өшірмей өзгерте алады.</li>
<li><b>Портфолио</b>: GitHub профиліңіз жұмыс берушіге сіздің нақты жобаларыңызды көрсетеді.</li>
</ul>
<h3>Git нені жақсы сақтайды?</h3>
<p>Git мәтін файлдарымен ең жақсы жұмыс істейді: <code>.sql</code>, <code>.py</code>, <code>.md</code>, <code>.csv</code> (шағын). Ол әр жолдың қалай өзгергенін көрсетеді. Excel немесе Power BI файлдары (<code>.xlsx</code>, <code>.pbix</code>) екілік форматта, сондықтан Git олардың «өзгергенін» ғана біледі, нені өзгергенін көрсете алмайды. Сол үшін есептің логикасын (SQL, Python) мәтін файлдарында ұстаған тиімді.</p>
<div class="tip">Бұл модульдегі командаларды сайттағы оқу терминалында жазасыз. Өз компьютеріңізге Git орнатып, сол командаларды қайталап көрсеңіз, тез есте қалады.</div>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Commit дегеніміз не?', options: ['Файлды жою', 'Жобаның белгілі сәттегі сақталған күйі және хабарлама', 'GitHub-тағы аккаунт', 'Тармақтың аты'], answer: 1, explain: 'Commit — тарихтағы бір нүкте: қандай файлдар қалай өзгерді және неге.' },
        { type: 'quiz', xp: 10, prompt: 'Git пен GitHub айырмасы:', options: ['Бірдей нәрсе', 'Git — нұсқаларды басқару бағдарламасы, GitHub — репозиторийлерді бұлтта сақтайтын сервис', 'GitHub — бағдарлама, Git — сайт', 'Git тек Python үшін'], answer: 1 }
      ]
    },
    {
      id: 'git-2', title: 'init, status, add, commit', minutes: 14,
      body: `
<pre><code>git init                         # папкада жаңа репозиторий бастау
git status                       # не өзгерді, не staging-те тұр
git add sales.sql                # бір файлды staging-ке қосу
git add .                        # барлық өзгерістерді қосу
git commit -m "Айлық табыс сұрауын қостым"</code></pre>
<p>Бірінші рет баптау (бір рет қана):</p>
<pre><code>git config --global user.name "Асқар Нұрлан"
git config --global user.email "askar@mail.kz"</code></pre>
<h3>Жақсы commit хабарламасы</h3>
<ul>
<li>Не <b>және неге</b> өзгергенін қысқа айтады: «Тазалауда refund-тарды алып тастадым».</li>
<li>Нашар: «fix», «update», «asdf».</li>
<li>Бір commit — бір логикалық өзгеріс.</li>
</ul>
<h3>Бір жұмыс циклі</h3>
<p>Күнделікті жұмыс осы қадамдардан тұрады:</p>
<ol>
<li>Файлды өзгертесіз (мысалы, <code>sales.sql</code>-ге жаңа сүзгі қосасыз).</li>
<li><code>git status</code>: Git файлды «modified» деп көрсетеді.</li>
<li><code>git add sales.sql</code>: өзгерісті келесі суретке дайындайсыз.</li>
<li><code>git commit -m "..."</code>: суретті тарихқа сақтайсыз.</li>
</ol>
<h3>Staging аймағы неге керек?</h3>
<p>Бір уақытта екі түрлі нәрсені өзгерттіңіз дейік: тазалау сұрауындағы қатені түзеттіңіз және жаңа графикке дерек дайындадыңыз. Staging арқылы оларды екі бөлек commit етесіз: алдымен <code>git add cleaning.sql</code> және commit, сосын <code>git add chart.sql</code> және commit. Тарих таза болады, ал керек болса, тек біреуін кері қайтара аласыз.</p>
<div class="tip"><code>git add .</code> ыңғайлы, бірақ ол барлық файлды, оның ішінде кездейсоқ файлдарды да қосады. Commit алдында <code>git status</code> арқылы тізімді тексеріңіз.</div>`,
      exercises: [
        { type: 'cmd', xp: 10, prompt: 'Ағымдағы папкада жаңа Git репозиторийін бастаңыз.', solution: 'git init', accept: ['git init( \\.)?'], hints: ['Бастау = initialize.'] },
        { type: 'cmd', xp: 10, prompt: 'Қандай файлдар өзгергенін және staging-те не тұрғанын көріңіз.', solution: 'git status', accept: ['git status( -s| --short)?'] },
        { type: 'cmd', xp: 15, prompt: '<code>cleaning.sql</code> файлын келесі commit-ке қосыңыз (staging).', solution: 'git add cleaning.sql', accept: ['git add (\\./)?cleaning\\.sql'] },
        { type: 'cmd', xp: 15, prompt: 'Staging-тегі өзгерістерді «Тазалау сұрауын қостым» хабарламасымен сақтаңыз.', solution: 'git commit -m "Тазалау сұрауын қостым"', accept: ['git commit -m ("Тазалау сұрауын қостым"|\'Тазалау сұрауын қостым\')', 'git commit -am ("Тазалау сұрауын қостым"|\'Тазалау сұрауын қостым\')'], hints: ['<code>-m</code> жалауы хабарламаны береді, хабарлама тырнақшада.'] }
      ]
    },
    {
      id: 'git-3', title: 'Тарих: log, diff, restore', minutes: 12,
      body: `
<pre><code>git log --oneline          # commit-тер тізімі, қысқаша
git diff                   # әлі staging-ке қосылмаған өзгерістер
git diff --staged          # staging-тегі өзгерістер
git restore report.sql     # файлдағы сақталмаған өзгерістерді болдырмау
git restore --staged a.sql # файлды staging-тен шығару (өзгеріс қалады)
git revert a1b2c3d         # бұрынғы commit-ті жаңа commit арқылы кері қайтару</code></pre>
<div class="tip"><code>git restore</code> сақталмаған өзгерістерді біржола жояды. Абай болыңыз. Ортақ тарихты өзгертпеу үшін жарияланған commit-ті <code>revert</code> арқылы қайтарыңыз.</div>
<h3>Commit-ке қарап шығу</h3>
<p><code>git log --oneline</code> әр commit-ті қысқа хэшпен көрсетеді:</p>
<pre><code>a1b2c3d Тазалауда refund-тарды алып тастадым
9f8e7d6 Айлық табыс сұрауын қостым
4c5b6a7 Жобаны бастадым</code></pre>
<p>Белгілі бір commit-те не өзгергенін көру үшін <code>git show a1b2c3d</code>, ал файлдың тарихын көру үшін <code>git log -- sales.sql</code> жазамыз.</p>
<h3>diff-ті оқу</h3>
<p><code>git diff</code> нәтижесінде <code>-</code> белгісімен басталатын жолдар жойылған, <code>+</code> белгісімен басталатындар қосылған:</p>
<pre><code>-WHERE status = 'paid'
+WHERE status = 'paid' AND amount IS NOT NULL</code></pre>
<p>Commit жасамас бұрын diff-ті әрқашан қараңыз: кездейсоқ өзгеріс немесе ұмытылған тест жолы бар-жоғын көресіз.</p>
<h3>Қай команданы қашан?</h3>
<ul>
<li>Файлды бұздыңыз, commit жоқ → <code>git restore файл</code>.</li>
<li>Қате файлды staging-ке қостыңыз → <code>git restore --staged файл</code>.</li>
<li>Қате commit GitHub-та тұр → <code>git revert хэш</code>.</li>
</ul>`,
      exercises: [
        { type: 'cmd', xp: 10, prompt: 'Commit тарихын әр commit бір жолда болатындай қысқаша көрсетіңіз.', solution: 'git log --oneline', accept: ['git log --oneline( -n ?\\d+| -\\d+)?', 'git log -\\d+ --oneline'] },
        { type: 'cmd', xp: 15, prompt: 'Әлі staging-ке қосылмаған өзгерістерді жол-жолымен көріңіз.', solution: 'git diff', accept: ['git diff'] },
        { type: 'cmd', xp: 15, prompt: '<code>report.sql</code> файлын бұздыңыз, бірақ әлі commit жасамадыңыз. Файлды соңғы commit күйіне қайтарыңыз.', solution: 'git restore report.sql', accept: ['git restore (\\./)?report\\.sql', 'git checkout -- (\\./)?report\\.sql'] }
      ]
    },
    {
      id: 'git-4', title: 'Тармақтар: branch, switch, merge', minutes: 14,
      body: `
<p>Жаңа талдауды бөлек тармақта жасаймыз, негізгі <code>main</code> тармағы таза қалады.</p>
<pre><code>git branch                      # тармақтар тізімі
git switch -c churn-analysis    # жаңа тармақ құрып, соған өту
# ... жұмыс, add, commit ...
git switch main                 # main-ге оралу
git merge churn-analysis        # тармақты main-ге біріктіру
git branch -d churn-analysis    # біріктірілген тармақты жою</code></pre>
<h3>Merge conflict</h3>
<p>Екі тармақта бір жол әртүрлі өзгерсе, Git өзі шеше алмайды. Файлда белгілер пайда болады:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
WHERE status = 'paid'
=======
WHERE status IN ('paid', 'refund')
&gt;&gt;&gt;&gt;&gt;&gt;&gt; churn-analysis</code></pre>
<p>Дұрыс нұсқаны қолмен қалдырып, белгілерді өшіресіз, сосын <code>git add</code> және <code>git commit</code>.</p>
<div class="tip">Ескі нұсқаларда <code>git checkout -b name</code> жазылады, ол <code>git switch -c name</code>-мен бірдей.</div>
<h3>Тармақтың тәжірибедегі мысалы</h3>
<p>Сіз <code>main</code>-де жұмыс істейтін айлық есепті жүргізесіз. Басшы жаңа churn талдауын сұрады. Егер оны <code>main</code>-де бастасаңыз, жартылай дайын код есепті бұзуы мүмкін. Сондықтан <code>churn-analysis</code> тармағын ашасыз. Осы уақытта айлық есепке шұғыл түзету керек болса, <code>git switch main</code> арқылы оралып, түзетіп, қайтадан тармағыңызға ораласыз.</p>
<h3>Тармақ атауы</h3>
<p>Атауды қысқа, сызықшамен және мағыналы етіп беріңіз: <code>churn-analysis</code>, <code>fix-refund-filter</code>. Бос орын мен кириллицаны қолданбаған дұрыс: кейбір құралдар оларды дұрыс өңдемейді.</p>
<h3>Конфликттің алдын алу</h3>
<ul>
<li>Тармақтарды ұзақ ұстамаңыз: бірнеше күнде біріктіріп отырыңыз.</li>
<li>Жұмысты бастамас бұрын <code>main</code>-нің соңғы нұсқасын алыңыз.</li>
<li>Бір файлды екі адам бір уақытта өзгертпеуге келісіңіз.</li>
</ul>`,
      exercises: [
        { type: 'cmd', xp: 15, prompt: '<code>cohort-report</code> атты жаңа тармақ құрып, бірден соған өтіңіз.', solution: 'git switch -c cohort-report', accept: ['git switch (-c|--create) cohort-report', 'git checkout -b cohort-report'] },
        { type: 'cmd', xp: 15, prompt: 'Сіз <code>main</code> тармағындасыз. <code>cohort-report</code> тармағындағы жұмысты main-ге біріктіріңіз.', solution: 'git merge cohort-report', accept: ['git merge cohort-report'] },
        { type: 'quiz', xp: 10, prompt: 'Merge conflict кезінде не істейміз?', options: ['Репозиторийді жойып, қайта бастаймыз', 'Файлдағы белгілер арасынан дұрыс нұсқаны қалдырып, белгілерді өшіреміз, сосын add және commit', 'git push --force', 'Ештеңе, Git өзі шешеді'], answer: 1 }
      ]
    },
    {
      id: 'git-5', title: 'GitHub: clone, push, pull, pull request', minutes: 14,
      body: `
<pre><code>git clone https://github.com/user/repo.git   # бұлттағы репозиторийді көшіру
git remote add origin https://github.com/user/repo.git
git push -u origin main                      # жергілікті commit-терді жіберу
git pull                                     # басқалардың өзгерістерін алу</code></pre>
<h3>Pull request (PR)</h3>
<ol>
<li>Жаңа тармақта жұмыс жасап, <code>git push -u origin my-branch</code>.</li>
<li>GitHub-та <b>Pull request</b> ашасыз: «осы өзгерістерді main-ге қосуды сұраймын».</li>
<li>Әріптес <b>code review</b> жасайды, ескертпе қалдырады.</li>
<li>Мақұлданған соң <b>Merge</b>.</li>
</ol>
<p><b>Fork</b> — басқа адамның репозиторийін өз аккаунтыңызға көшіру (ашық жобаларға үлес қосу үшін).</p>
<h3>Жергілікті және бұлттағы репозиторий</h3>
<p>Commit алдымен тек сіздің компьютеріңізде сақталады. <code>git push</code> оны GitHub-қа жібереді, ал <code>git pull</code> басқалардың commit-терін сізге әкеледі. Push жасамасаңыз, әріптестер сіздің жұмысыңызды көрмейді, ал компьютер бұзылса, жұмыс жоғалады.</p>
<h3>Code review-де не қаралады?</h3>
<ul>
<li>SQL логикасы дұрыс па: сүзгілер, JOIN түрі, топтау?</li>
<li>Сандар бұрынғы есептермен сәйкес келе ме?</li>
<li>Код түсінікті ме: атаулар, түсініктемелер?</li>
<li>Құпия дерек (пароль, жеке ақпарат) кездейсоқ қосылмады ма?</li>
</ul>
<p>Review — сынау емес, бірге сапаны көтеру тәсілі. Ескертпеге «неге?» деп сұрау да, өз шешіміңізді түсіндіру де қалыпты.</p>
<div class="tip"><code>git push</code> қате берсе («rejected»), көбіне GitHub-та сізде жоқ жаңа commit-тер бар деген сөз. Алдымен <code>git pull</code> жасап, сосын қайта push етіңіз.</div>`,
      exercises: [
        { type: 'cmd', xp: 15, prompt: '<code>https://github.com/tolqyn/cafe.git</code> репозиторийін компьютеріңізге көшіріңіз.', solution: 'git clone https://github.com/tolqyn/cafe.git', accept: ['git clone https://github\\.com/tolqyn/cafe(\\.git)?( cafe)?'] },
        { type: 'cmd', xp: 15, prompt: '<code>cohort-report</code> тармағын GitHub-қа (<code>origin</code>) бірінші рет жіберіңіз және байланыс орнатыңыз.', solution: 'git push -u origin cohort-report', accept: ['git push (-u|--set-upstream) origin cohort-report'] },
        { type: 'cmd', xp: 10, prompt: 'Әріптестер main-ге жаңа commit-тер қосты. Оларды өз компьютеріңізге алыңыз.', solution: 'git pull', accept: ['git pull( origin main)?', 'git pull --rebase( origin main)?'] },
        { type: 'quiz', xp: 10, prompt: 'Pull request не үшін керек?', options: ['Файлды жүктеп алу үшін', 'Өзгерістерді негізгі тармаққа қоспас бұрын талқылау және тексеру (code review) үшін', 'Репозиторийді жою үшін', 'Commit хабарламасын өзгерту үшін'], answer: 1 }
      ]
    },
    {
      id: 'git-6', title: '.gitignore, README және портфолио', minutes: 10,
      body: `
<h3>.gitignore</h3>
<p>Git-ке не <b>сақтамау</b> керектігін айтатын файл:</p>
<pre><code># құпия кілттер мен парольдер
.env

# үлкен немесе жеке деректер
data/raw/*.csv

# Python мен Jupyter-дің уақытша файлдары
__pycache__/
.ipynb_checkpoints/</code></pre>
<p>Түсініктеме <code>#</code> белгісінен басталады және әрқашан <b>бөлек жолда</b> жазылады. Үлгімен бір жолға жазылған <code>.env  # құпия</code> түсініктеме болып саналмайды: Git бүкіл жолды файл атауы деп оқиды да, <code>.env</code> еленбей қалады.</p>
<div class="tip">Парольді немесе API кілтін бір рет commit жасасаңыз, ол тарихта қалады, тіпті кейін жойсаңыз да. Кілтті бірден ауыстырыңыз.</div>
<h3>Аналитиктің портфолио репозиторийі</h3>
<pre><code>cafe-analysis/
├── README.md          ← ең маңызды файл
├── sql/               ← сұраулар
├── notebooks/         ← pandas талдау
├── dashboard/         ← Power BI скриншоттары
└── data/              ← шағын үлгі деректер</code></pre>
<p><b>README</b> құрылымы: бизнес сұрақ → деректер → әдіс → негізгі нәтижелер (сандармен) → ұсыныс → қалай іске қосу. Жұмыс беруші алдымен README-ді оқиды.</p>
<h3>Жақсы README мысалы</h3>
<pre><code># Кофехана желісі: жарнама бюджетін қайта бөлу

**Нәтиже:** referral арнасының клиенттері 2 есе жиі қайта келеді.
Бюджеттің 20%-ын Instagram-нан referral-ға көшіруді ұсынамын.

## Деректер
6 айлық тапсырыстар (2 400 жол), клиенттер (40 жол).

## Әдіс
SQL: тазалау, айлық метрикалар, арна сегменттері, retention.
Python: ROAS есебі.

## Қалай іске қосу
sql/ папкасындағы файлдарды ретімен орындаңыз.</code></pre>
<p>Мысалдағы сандар шартты. Маңыздысы — құрылым: нәтиже бірінші, әдіс қысқа, іске қосу нұсқаулығы соңында.</p>
<h3>Деректі репозиторийге салу</h3>
<p>Нақты клиенттердің деректерін ешқашан ашық репозиторийге салмаңыз. Оның орнына жасанды (synthetic) немесе анонимделген шағын үлгіні қолданыңыз да, README-де соны жазыңыз.</p>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: 'Қай файлды репозиторийге ешқашан commit жасамау керек?', options: ['README.md', 'cleaning.sql', '.env (парольдер мен API кілттері)', '.gitignore'], answer: 2, explain: '.env-ті .gitignore-ға қосыңыз.' },
        { type: 'quiz', xp: 10, prompt: 'Портфолио README-інде ең бірінші не тұруы керек?', options: ['Кодтың толық тізімі', 'Бизнес сұрақ және негізгі нәтиже', 'Лицензия', 'Python нұсқасы'], answer: 1, explain: 'Оқырман 30 секундта «не шешілді және не табылды» дегенді түсінуі керек.' }
      ]
    },
    {
      id: 'git-7', title: 'GitHub-қа кіру (token/SSH) және конфликтті шешу', minutes: 15,
      body: `
<p>Алғашқы <code>git push</code> кезінде жаңа бастаушылардың көбі екі кедергіге тап болады: GitHub парольді қабылдамайды, ал кейін бірінші merge конфликті шығады. Екеуі де қалыпты жағдай және екеуінің де нақты шешімі бар.</p>
<h3>Неге пароль жұмыс істемейді?</h3>
<pre><code>$ git push
Username: aigerim
Password: ********
remote: Support for password authentication was removed.
fatal: Authentication failed</code></pre>
<p>GitHub 2021 жылдан бері Git командалары үшін аккаунт паролін қабылдамайды: пароль ұрланса, бүкіл аккаунт кетеді. Оның орнына үш тәсілдің бірін қолданасыз.</p>
<table>
<tr><th>Тәсіл</th><th>Қалай жұмыс істейді</th><th>Кімге лайық</th></tr>
<tr><td><b>GitHub CLI</b></td><td><code>gh auth login</code> браузерді ашып, кіруді өзі баптайды</td><td>Ең оңайы, бастаушыға</td></tr>
<tr><td><b>Personal access token</b></td><td>Парольдің орнына енгізілетін ұзын кілт, HTTPS адресімен</td><td>Бағдарлама орнатуға болмайтын жерде</td></tr>
<tr><td><b>SSH кілті</b></td><td>Компьютерде кілттер жұбы жасалады, ашық бөлігі GitHub-қа қосылады</td><td>Күнде жұмыс істейтін компьютерге</td></tr>
</table>
<h3>1-тәсіл: gh auth login</h3>
<pre><code>gh auth login</code></pre>
<p>Сұрақтарға жауап бересіз (GitHub.com → HTTPS → браузер арқылы кіру), браузерде кодты растайсыз. Содан кейін <code>git push</code> пароль сұрамайды. <code>gh</code> — GitHub-тың ресми командалық құралы, оны cli.github.com сайтынан орнатасыз.</p>
<h3>2-тәсіл: personal access token (PAT)</h3>
<ol>
<li>GitHub → <b>Settings → Developer settings → Personal access tokens</b> → жаңа token жасаңыз.</li>
<li>Мерзімін (мысалы 90 күн) және рұқсатын таңдаңыз: тек керек репозиторий, <b>Contents: Read and write</b>.</li>
<li>Token бір рет қана көрсетіледі: бірден көшіріп алыңыз.</li>
<li><code>git push</code> пароль сұрағанда парольдің орнына token-ды қойыңыз.</li>
</ol>
<p>Token — парольмен бірдей құпия. Оны кодқа, README-ге немесе чатқа жазбаңыз. Ашылып қалса, GitHub-та бірден жойып (revoke), жаңасын жасаңыз.</p>
<h3>3-тәсіл: SSH кілті</h3>
<pre><code>ssh-keygen -t ed25519 -C "aigerim@mail.kz"   # кілттер жұбын жасау
cat ~/.ssh/id_ed25519.pub                    # АШЫҚ кілтті көрсету</code></pre>
<p>Шыққан жолды көшіріп, GitHub → <b>Settings → SSH and GPG keys → New SSH key</b> ішіне қойыңыз. Тексеру және репозиторий адресін SSH түріне ауыстыру:</p>
<pre><code>ssh -T git@github.com
git remote set-url origin git@github.com:aigerim/cafe-analysis.git</code></pre>
<p>Екі файл жасалады: <code>id_ed25519</code> — <b>жабық</b> кілт (ешкімге бермейсіз), <code>id_ed25519.pub</code> — <b>ашық</b> кілт (GitHub-қа қосасыз). Адрестің түріне қараңыз: <code>https://github.com/...</code> token сұрайды, <code>git@github.com:...</code> SSH кілтін қолданады. Қазіргі адресті <code>git remote -v</code> көрсетеді.</p>
<h3>fetch және pull</h3>
<table>
<tr><th>Команда</th><th>Не істейді</th></tr>
<tr><td><code>git fetch</code></td><td>GitHub-тағы жаңа commit-терді жүктейді, бірақ сіздің файлдарыңызға <b>тимейді</b></td></tr>
<tr><td><code>git pull</code></td><td><code>fetch</code> + <code>merge</code>: жүктейді және бірден тармағыңызға қосады</td></tr>
</table>
<p><code>git fetch</code>-тен кейін не келгенін қарап алуға болады: <code>git log main..origin/main</code> (сізде жоқ commit-тер) немесе <code>git diff main origin/main</code>. Сенімді болсаңыз, <code>git pull</code> жасайсыз.</p>
<h3>stash: аяқталмаған жұмысты уақытша алып қою</h3>
<p>Жұмыстың ортасында <code>git pull</code> немесе басқа тармаққа өту керек болды, ал өзгерістер commit-ке әлі дайын емес. Git «өзгерістеріңіз жоғалады» деп жібермейді. <code>stash</code> оларды уақытша сөреге қояды:</p>
<pre><code>git stash          # өзгерістерді жасырып, жұмыс қалтасын тазалау
git pull           # немесе git switch main
git stash pop      # өзгерістерді қайтару
git stash list     # сөреде не жатқанын көру</code></pre>
<h3>Commit болып кеткен .env файлын алып тастау</h3>
<p><code>.env</code>-ті <code>.gitignore</code>-ға кейін қоссаңыз, ештеңе өзгермейді: Git бақылап тұрған файлды елемеуді қоймайды. Алдымен оны бақылаудан шығару керек:</p>
<pre><code>git rm --cached .env                 # Git-тен алады, дискідегі файл қалады
echo ".env" &gt;&gt; .gitignore            # енді қайта қосылмайды
git add .gitignore
git commit -m ".env файлын бақылаудан алып тастадым"</code></pre>
<p><code>--cached</code> болмаса, <code>git rm</code> файлды дискіден де жояды. Есіңізде болсын: файл <b>ескі commit-терде қалады</b>. Сондықтан ішіндегі парольдер мен кілттерді бірден ауыстырыңыз (rotate): оларды ашылған деп есептеңіз.</p>
<h3>Merge конфликті</h3>
<p>Екі адам бір файлдың <b>бір жолын</b> әртүрлі өзгертсе, Git қайсысын қалдыру керегін өзі шеше алмайды:</p>
<pre><code>$ git pull
CONFLICT (content): Merge conflict in report.sql
Automatic merge failed; fix conflicts and then commit the result.</code></pre>
<p>Git файлдың ішіне белгілер қояды:</p>
<pre><code>SELECT city, SUM(amount) AS revenue
FROM orders
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
WHERE status = 'paid'
=======
WHERE status = 'paid' AND amount &lt; 20000
&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main
GROUP BY city;</code></pre>
<table>
<tr><th>Бөлік</th><th>Мағынасы</th></tr>
<tr><td><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> мен <code>=======</code> арасы</td><td>сіздің нұсқаңыз</td></tr>
<tr><td><code>=======</code> мен <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> арасы</td><td>келген нұсқа (әріптестікі)</td></tr>
</table>
<p>Шешу қадамдары:</p>
<ol>
<li><code>git status</code> — қай файлдарда конфликт бар екенін көрсетеді (<code>both modified</code>).</li>
<li>Файлды ашып, дұрыс нұсқаны қалдырыңыз: өзіңіздікін, әріптестікін немесе екеуінің қосындысын. Қайсысы дұрыс екенін білмесеңіз, әріптестен сұраңыз.</li>
<li>Үш белгі жолын да (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>) өшіріңіз.</li>
<li><code>git add report.sql</code> — «бұл файл шешілді» деген белгі.</li>
<li><code>git commit</code> — merge-ті аяқтайды.</li>
</ol>
<p>Бәрі шатасып кетсе, <code>git merge --abort</code> merge-ке дейінгі күйге қайтарады. Ештеңе жоғалмайды.</p>
<div class="tip">Конфликтті азайту жолы: жұмысты бастар алдында <code>git pull</code> жасаңыз, шағын commit-тер жасап, жиі push етіңіз. Тармақ main-нен неғұрлым ұзақ бөлек тұрса, конфликт соғұрлым көп болады.</div>
<h3>Жиі қателер</h3>
<ul>
<li><b>Аккаунт паролін қайта-қайта енгізу.</b> Ол жұмыс істемейді: token, SSH немесе <code>gh auth login</code> керек.</li>
<li><b>Жабық кілтті бөлісу.</b> GitHub-қа тек <code>.pub</code> файлының мазмұны қойылады. <code>.pub</code>-сыз файл — жабық кілт, оны ешкімге жібермеңіз.</li>
<li><b>Конфликт белгілерін өшірмей commit жасау.</b> Файлда <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> қалып, SQL немесе Python код бұзылады.</li>
<li><b><code>git rm .env</code> деп <code>--cached</code>-сыз жазу.</b> Файл дискіден де жойылады.</li>
<li><b><code>git stash</code>-тен кейін <code>pop</code>-ты ұмыту.</b> Жұмыс сөреде қалып, «жоғалды» деп ойлайсыз. <code>git stash list</code> тексеріңіз.</li>
</ul>`,
      exercises: [
        { type: 'quiz', xp: 10, prompt: '<code>git push</code> логин мен GitHub паролін сұрады. Парольді дұрыс енгіздіңіз, бірақ <code>Authentication failed</code> шықты. Себебі не?', options: ['Интернет жоқ', 'GitHub Git командалары үшін аккаунт паролін қабылдамайды: token, SSH кілті немесе gh auth login керек', 'Репозиторий жойылған', 'Алдымен git pull жасау керек еді'], answer: 1, explain: 'Пароль арқылы кіру 2021 жылы өшірілген. HTTPS адресінде парольдің орнына personal access token енгізіледі, немесе SSH кілті бапталады.' },
        { type: 'cmd', xp: 15, prompt: 'Талдауды аяқтамадыңыз, commit жасауға әлі ерте, ал <code>git pull</code> жасау керек. Өзгерістерді уақытша сөреге алып қойыңыз.', solution: 'git stash', accept: ['git stash( push)?( (-u|--include-untracked))?', 'git stash( push)?( (-u|--include-untracked))? (-m|--message) ("[^"]+"|\'[^\']+\')', 'git stash save( ("[^"]+"|\'[^\']+\'))?'], hints: ['Команда <code>git stash</code> деп басталады.'], explain: 'Жұмыс қалтасы тазарды. pull-дан кейін өзгерістерді <code>git stash pop</code> қайтарады.' },
        { type: 'cmd', xp: 15, prompt: '<code>.env</code> файлы байқаусызда commit болып кеткен. Оны Git бақылауынан алып тастаңыз, бірақ дискідегі файл <b>қалсын</b>.', solution: 'git rm --cached .env', accept: ['git rm --cached (--)?\\s?(\\./)?\\.env', 'git rm (\\./)?\\.env --cached'], hints: ['<code>git rm</code> командасына файлды дискіде қалдыратын жалауша қосыңыз.', '<code>git rm --cached .env</code>'], explain: 'Енді .env-ті .gitignore-ға қосып, commit жасаңыз. Файл ескі commit-терде қалады, сондықтан ішіндегі кілттерді ауыстырыңыз.' },
        { type: 'cmd', xp: 15, prompt: '<code>git pull</code> кезінде <code>report.sql</code> файлында конфликт шықты. Сіз файлды ашып, дұрыс нұсқаны қалдырдыңыз және белгілерді өшірдіңіз. Енді Git-ке осы файлдың шешілгенін хабарлаңыз.', solution: 'git add report.sql', accept: ['git add (\\./)?report\\.sql', 'git add (\\.|-A|--all)'], hints: ['Шешілген файл staging-ке қосылады.', '<code>git add report.sql</code>'], explain: 'Файл шешілді деп белгіленді. Соңғы қадам — <code>git commit</code>: ол merge-ті аяқтайды.' },
        { type: 'quiz', xp: 10, prompt: 'Әріптестердің GitHub-қа не жібергенін көргіңіз келеді, бірақ өз файлдарыңыз әзірше өзгермесін. Қай команда?', options: ['git pull', 'git fetch', 'git push', 'git stash pop'], answer: 1, explain: 'fetch тек жүктейді: жаңа commit-тер origin/main-де пайда болады, ал жұмыс қалтаңыз өзгермейді. pull — fetch + merge, ол файлдарды бірден өзгертеді.' }
      ]
    },
    {
      id: 'git-gate', gate: true, title: 'Модуль емтиханы: Git', minutes: 15,
      body: `<p>Толық жұмыс ағыны: жаңа тармақ → commit → GitHub.</p>`,
      exercises: [
        { type: 'cmd', xp: 15, prompt: '<code>ab-test</code> атты жаңа тармақ құрып, соған өтіңіз.', solution: 'git switch -c ab-test', accept: ['git switch (-c|--create) ab-test', 'git checkout -b ab-test'] },
        { type: 'cmd', xp: 15, prompt: 'Барлық өзгерген файлдарды staging-ке қосыңыз.', solution: 'git add .', accept: ['git add (\\.|-A|--all)'] },
        { type: 'cmd', xp: 15, prompt: '«A/B тест нәтижесін қостым» хабарламасымен commit жасаңыз.', solution: 'git commit -m "A/B тест нәтижесін қостым"', accept: ['git commit -m ("A/B тест нәтижесін қостым"|\'A/B тест нәтижесін қостым\')'] },
        { type: 'cmd', xp: 15, prompt: 'Тармақты GitHub-қа (<code>origin</code>) бірінші рет жіберіңіз.', solution: 'git push -u origin ab-test', accept: ['git push (-u|--set-upstream) origin ab-test'] },
        { type: 'quiz', xp: 15, prompt: '<code>git add</code> мен <code>git commit</code> айырмасы:', options: ['Айырма жоқ', 'add өзгерісті келесі commit-ке дайындайды (staging), commit оны тарихқа сақтайды', 'add GitHub-қа жібереді', 'commit файлды жояды'], answer: 1 }
      ]
    }
  ]
};
