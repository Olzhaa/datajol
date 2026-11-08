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
<pre><code># .gitignore
.env                 # құпия кілттер мен парольдер
data/raw/*.csv       # үлкен немесе жеке деректер
__pycache__/
.ipynb_checkpoints/</code></pre>
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
