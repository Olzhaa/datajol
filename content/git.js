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
<div class="tip">Git — бағдарлама (компьютерде), GitHub — сайт (бұлтта). Git-ті GitHub-сыз да қолдануға болады.</div>`,
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
</ul>`,
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
<div class="tip"><code>git restore</code> сақталмаған өзгерістерді біржола жояды. Абай болыңыз. Ортақ тарихты өзгертпеу үшін жарияланған commit-ті <code>revert</code> арқылы қайтарыңыз.</div>`,
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
<div class="tip">Ескі нұсқаларда <code>git checkout -b name</code> жазылады, ол <code>git switch -c name</code>-мен бірдей.</div>`,
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
<p><b>Fork</b> — басқа адамның репозиторийін өз аккаунтыңызға көшіру (ашық жобаларға үлес қосу үшін).</p>`,
      exercises: [
        { type: 'cmd', xp: 15, prompt: '<code>https://github.com/datajol/cafe.git</code> репозиторийін компьютеріңізге көшіріңіз.', solution: 'git clone https://github.com/datajol/cafe.git', accept: ['git clone https://github\\.com/datajol/cafe(\\.git)?( cafe)?'] },
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
<p><b>README</b> құрылымы: бизнес сұрақ → деректер → әдіс → негізгі нәтижелер (сандармен) → ұсыныс → қалай іске қосу. Жұмыс беруші алдымен README-ді оқиды.</p>`,
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
