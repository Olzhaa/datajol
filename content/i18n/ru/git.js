// M2.3 Git и GitHub: русский текст. Команды, решения и шаблоны accept находятся в content/git.js.
DJ.i18n.patch({
  modules: {
    'm2-3': { intro: 'Git — система, которая хранит историю изменений кода, а GitHub — место, где эту историю хранят в облаке и делятся ею. Для аналитика это хранение SQL-скриптов и ноутбуков, работа в команде и портфолио. В заданиях мы проверяем, какую команду вы напишете в терминале.' }
  },
  lessons: {
    'git-1': {
      title: 'Зачем нужен Git?',
      body: `
<p>Знакомая ситуация: <code>report_final.xlsx</code>, <code>report_final_v2.xlsx</code>, <code>report_final_ACTUAL.xlsx</code>. Какой из них последний? Что изменилось? Git решает именно эту проблему.</p>
<ul>
<li><b>Repository (репозиторий)</b> — папка проекта и вся ее история.</li>
<li><b>Commit (коммит)</b> — «снимок» проекта в определенный момент и сообщение о том, что изменилось.</li>
<li><b>Branch (ветка)</b> — отдельная линия работы, которая не ломает основную версию.</li>
<li><b>Remote</b> — копия репозитория в облаке (GitHub, GitLab).</li>
</ul>
<h3>Три области</h3>
<pre><code>Working directory  ──git add──▶  Staging area  ──git commit──▶  Repository
(измененные файлы)               (готово к следующему commit)    (сохраненная история)</code></pre>
<div class="tip">Git — это программа (на компьютере), GitHub — сайт (в облаке). Git можно использовать и без GitHub.</div>
<h3>Что Git дает аналитику?</h3>
<ul>
<li><b>История</b>: одной командой вы видите, какой фильтр был в отчете три месяца назад.</li>
<li><b>Безопасные эксперименты</b>: вы пробуете новый подход в отдельной ветке, а если ничего не вышло, просто ее выбрасываете.</li>
<li><b>Командная работа</b>: несколько человек могут менять один SQL-файл, не стирая работу друг друга.</li>
<li><b>Портфолио</b>: ваш профиль на GitHub показывает работодателю ваши реальные проекты.</li>
</ul>
<h3>Что Git хранит хорошо?</h3>
<p>Лучше всего Git работает с текстовыми файлами: <code>.sql</code>, <code>.py</code>, <code>.md</code>, <code>.csv</code> (небольшими). Он показывает, как изменилась каждая строка. Файлы Excel или Power BI (<code>.xlsx</code>, <code>.pbix</code>) хранятся в двоичном формате, поэтому Git знает только то, что они «изменились», но не может показать, что именно. Поэтому логику отчета (SQL, Python) выгодно держать в текстовых файлах.</p>
<div class="tip">Команды этого модуля вы пишете в учебном терминале на сайте. Если установите Git на свой компьютер и повторите там те же команды, они быстрее запомнятся.</div>`,
      ex: [
        { prompt: 'Что такое commit?', options: ['Удаление файла', 'Сохраненное состояние проекта в определенный момент и сообщение', 'Аккаунт на GitHub', 'Название ветки'], explain: 'Commit — одна точка в истории: какие файлы и как изменились и почему.' },
        { prompt: 'Разница между Git и GitHub:', options: ['Это одно и то же', 'Git — программа для управления версиями, GitHub — сервис для хранения репозиториев в облаке', 'GitHub — программа, Git — сайт', 'Git только для Python'] }
      ]
    },
    'git-2': {
      title: 'init, status, add, commit',
      body: `
<pre><code>git init                         # начать новый репозиторий в папке
git status                       # что изменилось, что лежит в staging
git add sales.sql                # добавить один файл в staging
git add .                        # добавить все изменения
git commit -m "Айлық табыс сұрауын қостым"</code></pre>
<p>Первичная настройка (только один раз):</p>
<pre><code>git config --global user.name "Асқар Нұрлан"
git config --global user.email "askar@mail.kz"</code></pre>
<h3>Хорошее сообщение коммита</h3>
<ul>
<li>Коротко говорит, что <b>и зачем</b> изменилось: «Убрал refund из очистки».</li>
<li>Плохо: «fix», «update», «asdf».</li>
<li>Один commit — одно логическое изменение.</li>
</ul>
<h3>Один рабочий цикл</h3>
<p>Повседневная работа состоит из этих шагов:</p>
<ol>
<li>Вы меняете файл (например, добавляете новый фильтр в <code>sales.sql</code>).</li>
<li><code>git status</code>: Git показывает файл как «modified».</li>
<li><code>git add sales.sql</code>: вы готовите изменение к следующему снимку.</li>
<li><code>git commit -m "..."</code>: вы сохраняете снимок в историю.</li>
</ol>
<h3>Зачем нужна staging area?</h3>
<p>Допустим, вы одновременно изменили две разные вещи: исправили ошибку в запросе очистки и подготовили данные для нового графика. С помощью staging вы делаете из них два отдельных коммита: сначала <code>git add cleaning.sql</code> и commit, потом <code>git add chart.sql</code> и commit. История остается чистой, а при необходимости можно откатить только одно из изменений.</p>
<div class="tip"><code>git add .</code> удобна, но добавляет все файлы, в том числе случайные. Перед коммитом проверяйте список через <code>git status</code>.</div>`,
      ex: [
        { prompt: 'Начните новый Git-репозиторий в текущей папке.', hints: ['Начать = initialize.'] },
        { prompt: 'Посмотрите, какие файлы изменились и что лежит в staging.' },
        { prompt: 'Добавьте файл <code>cleaning.sql</code> в следующий commit (staging).' },
        { prompt: 'Сохраните изменения из staging с сообщением «Тазалау сұрауын қостым» («Добавил запрос очистки»). Сообщение напишите именно так, по-казахски.', hints: ['Флаг <code>-m</code> задает сообщение, сообщение пишется в кавычках.'] }
      ]
    },
    'git-3': {
      title: 'История: log, diff, restore',
      body: `
<pre><code>git log --oneline          # список коммитов, кратко
git diff                   # изменения, еще не добавленные в staging
git diff --staged          # изменения в staging
git restore report.sql     # отменить несохраненные изменения в файле
git restore --staged a.sql # убрать файл из staging (изменение остается)
git revert a1b2c3d         # отменить прошлый commit новым коммитом</code></pre>
<div class="tip"><code>git restore</code> безвозвратно удаляет несохраненные изменения. Будьте осторожны. Чтобы не менять общую историю, опубликованный commit отменяйте через <code>revert</code>.</div>
<h3>Просмотр коммитов</h3>
<p><code>git log --oneline</code> показывает каждый commit с коротким хешем:</p>
<pre><code>a1b2c3d Тазалауда refund-тарды алып тастадым
9f8e7d6 Айлық табыс сұрауын қостым
4c5b6a7 Жобаны бастадым</code></pre>
<p>Чтобы увидеть, что изменилось в конкретном коммите, пишем <code>git show a1b2c3d</code>, а чтобы увидеть историю файла — <code>git log -- sales.sql</code>.</p>
<h3>Как читать diff</h3>
<p>В выводе <code>git diff</code> строки, которые начинаются с <code>-</code>, удалены, а строки с <code>+</code> добавлены:</p>
<pre><code>-WHERE status = 'paid'
+WHERE status = 'paid' AND amount IS NOT NULL</code></pre>
<p>Перед коммитом всегда смотрите diff: вы увидите, нет ли случайного изменения или забытой тестовой строки.</p>
<h3>Какую команду и когда?</h3>
<ul>
<li>Испортили файл, коммита нет → <code>git restore файл</code>.</li>
<li>Добавили в staging не тот файл → <code>git restore --staged файл</code>.</li>
<li>Ошибочный commit уже на GitHub → <code>git revert хеш</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Покажите историю коммитов кратко, чтобы каждый commit занимал одну строку.' },
        { prompt: 'Посмотрите построчно изменения, которые еще не добавлены в staging.' },
        { prompt: 'Вы испортили файл <code>report.sql</code>, но еще не сделали commit. Верните файл к состоянию последнего коммита.' }
      ]
    },
    'git-4': {
      title: 'Ветки: branch, switch, merge',
      body: `
<p>Новый анализ делаем в отдельной ветке, а основная ветка <code>main</code> остается чистой.</p>
<pre><code>git branch                      # список веток
git switch -c churn-analysis    # создать новую ветку и перейти в нее
# ... работа, add, commit ...
git switch main                 # вернуться в main
git merge churn-analysis        # влить ветку в main
git branch -d churn-analysis    # удалить влитую ветку</code></pre>
<h3>Merge conflict</h3>
<p>Если одна и та же строка по-разному изменена в двух ветках, Git не может решить сам. В файле появляются метки:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
WHERE status = 'paid'
=======
WHERE status IN ('paid', 'refund')
&gt;&gt;&gt;&gt;&gt;&gt;&gt; churn-analysis</code></pre>
<p>Вы вручную оставляете правильный вариант и удаляете метки, затем <code>git add</code> и <code>git commit</code>.</p>
<div class="tip">В старых версиях пишут <code>git checkout -b name</code>, это то же самое, что <code>git switch -c name</code>.</div>
<h3>Пример ветки на практике</h3>
<p>Вы ведете ежемесячный отчет, который работает в <code>main</code>. Руководитель попросил новый анализ оттока (churn). Если начать его в <code>main</code>, недописанный код может сломать отчет. Поэтому вы создаете ветку <code>churn-analysis</code>. Если в это время понадобится срочно исправить ежемесячный отчет, вы возвращаетесь через <code>git switch main</code>, исправляете и снова переходите в свою ветку.</p>
<h3>Название ветки</h3>
<p>Давайте веткам короткие и осмысленные названия через дефис: <code>churn-analysis</code>, <code>fix-refund-filter</code>. Пробелы и кириллицу лучше не использовать: некоторые инструменты обрабатывают их неправильно.</p>
<h3>Как избежать конфликтов</h3>
<ul>
<li>Не держите ветки долго: вливайте их каждые несколько дней.</li>
<li>Перед началом работы получите последнюю версию <code>main</code>.</li>
<li>Договоритесь, чтобы два человека не меняли один файл одновременно.</li>
</ul>`,
      ex: [
        { prompt: 'Создайте новую ветку <code>cohort-report</code> и сразу перейдите в нее.' },
        { prompt: 'Вы находитесь в ветке <code>main</code>. Влейте в main работу из ветки <code>cohort-report</code>.' },
        { prompt: 'Что делать при merge conflict?', options: ['Удалить репозиторий и начать заново', 'Оставить правильный вариант между метками в файле, удалить метки, затем add и commit', 'git push --force', 'Ничего, Git решит сам'] }
      ]
    },
    'git-5': {
      title: 'GitHub: clone, push, pull, pull request',
      body: `
<pre><code>git clone https://github.com/user/repo.git   # скопировать репозиторий из облака
git remote add origin https://github.com/user/repo.git
git push -u origin main                      # отправить локальные коммиты
git pull                                     # получить изменения других</code></pre>
<h3>Pull request (PR)</h3>
<ol>
<li>Работаете в новой ветке и делаете <code>git push -u origin my-branch</code>.</li>
<li>На GitHub открываете <b>Pull request</b>: «прошу добавить эти изменения в main».</li>
<li>Коллега делает <b>code review</b> и оставляет комментарии.</li>
<li>После одобрения — <b>Merge</b>.</li>
</ol>
<p><b>Fork</b> — копия чужого репозитория в вашем аккаунте (чтобы вносить вклад в открытые проекты).</p>
<h3>Локальный и облачный репозиторий</h3>
<p>Сначала commit сохраняется только на вашем компьютере. <code>git push</code> отправляет его на GitHub, а <code>git pull</code> приносит вам коммиты других. Если не сделать push, коллеги не увидят вашу работу, а если компьютер сломается, работа пропадет.</p>
<h3>Что проверяют на code review?</h3>
<ul>
<li>Верна ли логика SQL: фильтры, тип JOIN, группировка?</li>
<li>Сходятся ли цифры с прежними отчетами?</li>
<li>Понятен ли код: названия, комментарии?</li>
<li>Не попали ли случайно секретные данные (пароль, личная информация)?</li>
</ul>
<p>Review — не критика, а способ вместе повысить качество. Спросить «почему?» в ответ на комментарий или объяснить свое решение — нормально.</p>
<div class="tip">Если <code>git push</code> выдает ошибку («rejected»), чаще всего это значит, что на GitHub есть новые коммиты, которых нет у вас. Сначала сделайте <code>git pull</code>, затем снова push.</div>`,
      ex: [
        { prompt: 'Скопируйте репозиторий <code>https://github.com/tolqyn/cafe.git</code> на свой компьютер.' },
        { prompt: 'Впервые отправьте ветку <code>cohort-report</code> на GitHub (<code>origin</code>) и установите связь с ней.' },
        { prompt: 'Коллеги добавили в main новые коммиты. Получите их на свой компьютер.' },
        { prompt: 'Зачем нужен pull request?', options: ['Чтобы скачать файл', 'Чтобы обсудить и проверить изменения (code review) до того, как добавить их в основную ветку', 'Чтобы удалить репозиторий', 'Чтобы изменить сообщение коммита'] }
      ]
    },
    'git-6': {
      title: '.gitignore, README и портфолио',
      body: `
<h3>.gitignore</h3>
<p>Файл, который говорит Git, что <b>не сохранять</b>:</p>
<pre><code># секретные ключи и пароли
.env

# большие или личные данные
data/raw/*.csv

# временные файлы Python и Jupyter
__pycache__/
.ipynb_checkpoints/</code></pre>
<p>Комментарий начинается со знака <code>#</code> и всегда пишется <b>на отдельной строке</b>. Запись <code>.env  # секрет</code> в одной строке с шаблоном комментарием не считается: Git прочитает всю строку как имя файла, и <code>.env</code> не будет игнорироваться.</p>
<div class="tip">Если хоть раз закоммитить пароль или API-ключ, он останется в истории, даже если потом удалить файл. Сразу смените ключ.</div>
<h3>Репозиторий-портфолио аналитика</h3>
<pre><code>cafe-analysis/
├── README.md          ← самый важный файл
├── sql/               ← запросы
├── notebooks/         ← анализ в pandas
├── dashboard/         ← скриншоты Power BI
└── data/              ← небольшие примеры данных</code></pre>
<p>Структура <b>README</b>: бизнес-вопрос → данные → метод → главные результаты (с цифрами) → рекомендация → как запустить. Работодатель первым делом читает README.</p>
<h3>Пример хорошего README</h3>
<pre><code># Сеть кофеен: перераспределение рекламного бюджета

**Результат:** клиенты из канала referral возвращаются в 2 раза чаще.
Рекомендую перенести 20% бюджета с Instagram на referral.

## Данные
Заказы за 6 месяцев (2 400 строк), клиенты (40 строк).

## Метод
SQL: очистка, месячные метрики, сегменты по каналам, retention.
Python: расчет ROAS.

## Как запустить
Выполните файлы из папки sql/ по порядку.</code></pre>
<p>Цифры в примере условные. Важна структура: результат первым, метод кратко, инструкция по запуску в конце.</p>
<h3>Данные в репозитории</h3>
<p>Никогда не кладите данные реальных клиентов в открытый репозиторий. Вместо этого используйте небольшую синтетическую (synthetic) или обезличенную выборку и напишите об этом в README.</p>`,
      ex: [
        { prompt: 'Какой файл никогда нельзя коммитить в репозиторий?', options: ['README.md', 'cleaning.sql', '.env (пароли и API-ключи)', '.gitignore'], explain: 'Добавьте .env в .gitignore.' },
        { prompt: 'Что должно стоять в README портфолио в самом начале?', options: ['Полный листинг кода', 'Бизнес-вопрос и главный результат', 'Лицензия', 'Версия Python'], explain: 'Читатель должен за 30 секунд понять, что решали и что нашли.' }
      ]
    },
    'git-7': {
      title: 'Вход в GitHub (token/SSH) и разрешение конфликта',
      body: `
<p>При первом <code>git push</code> большинство новичков натыкается на два препятствия: GitHub не принимает пароль, а позже возникает первый merge-конфликт. Обе ситуации нормальны, и у обеих есть чёткое решение.</p>
<h3>Почему пароль не работает?</h3>
<pre><code>$ git push
Username: aigerim
Password: ********
remote: Support for password authentication was removed.
fatal: Authentication failed</code></pre>
<p>С 2021 года GitHub не принимает пароль от аккаунта для команд Git: если пароль украдут, потерян весь аккаунт. Вместо него используют один из трёх способов.</p>
<table>
<tr><th>Способ</th><th>Как работает</th><th>Кому подходит</th></tr>
<tr><td><b>GitHub CLI</b></td><td><code>gh auth login</code> открывает браузер и сам настраивает вход</td><td>Самый простой, для новичка</td></tr>
<tr><td><b>Personal access token</b></td><td>Длинный ключ, который вводят вместо пароля, с адресом HTTPS</td><td>Там, где нельзя устанавливать программы</td></tr>
<tr><td><b>SSH-ключ</b></td><td>На компьютере создаётся пара ключей, открытая часть добавляется в GitHub</td><td>Для компьютера, на котором вы работаете каждый день</td></tr>
</table>
<h3>Способ 1: gh auth login</h3>
<pre><code>gh auth login</code></pre>
<p>Вы отвечаете на вопросы (GitHub.com → HTTPS → вход через браузер) и подтверждаете код в браузере. После этого <code>git push</code> не спрашивает пароль. <code>gh</code> — официальный инструмент командной строки GitHub, его устанавливают с сайта cli.github.com.</p>
<h3>Способ 2: personal access token (PAT)</h3>
<ol>
<li>GitHub → <b>Settings → Developer settings → Personal access tokens</b> → создайте новый token.</li>
<li>Выберите срок действия (например, 90 дней) и права: только нужный репозиторий, <b>Contents: Read and write</b>.</li>
<li>Token показывается только один раз: сразу скопируйте его.</li>
<li>Когда <code>git push</code> спросит пароль, вставьте вместо пароля token.</li>
</ol>
<p>Token — такой же секрет, как пароль. Не пишите его в коде, в README или в чате. Если он раскрыт, сразу отзовите его (revoke) в GitHub и создайте новый.</p>
<h3>Способ 3: SSH-ключ</h3>
<pre><code>ssh-keygen -t ed25519 -C "aigerim@mail.kz"   # создать пару ключей
cat ~/.ssh/id_ed25519.pub                    # показать ОТКРЫТЫЙ ключ</code></pre>
<p>Скопируйте выведенную строку и вставьте её в GitHub → <b>Settings → SSH and GPG keys → New SSH key</b>. Проверка и перевод адреса репозитория на SSH:</p>
<pre><code>ssh -T git@github.com
git remote set-url origin git@github.com:aigerim/cafe-analysis.git</code></pre>
<p>Создаются два файла: <code>id_ed25519</code> — <b>закрытый</b> ключ (его никому не дают), <code>id_ed25519.pub</code> — <b>открытый</b> ключ (его добавляют в GitHub). Смотрите на вид адреса: <code>https://github.com/...</code> спрашивает token, <code>git@github.com:...</code> использует SSH-ключ. Текущий адрес показывает <code>git remote -v</code>.</p>
<h3>fetch и pull</h3>
<table>
<tr><th>Команда</th><th>Что делает</th></tr>
<tr><td><code>git fetch</code></td><td>Скачивает новые commit-ы с GitHub, но ваши файлы <b>не трогает</b></td></tr>
<tr><td><code>git pull</code></td><td><code>fetch</code> + <code>merge</code>: скачивает и сразу вливает в вашу ветку</td></tr>
</table>
<p>После <code>git fetch</code> можно посмотреть, что пришло: <code>git log main..origin/main</code> (commit-ы, которых у вас нет) или <code>git diff main origin/main</code>. Если всё в порядке, делаете <code>git pull</code>.</p>
<h3>stash: временно отложить незаконченную работу</h3>
<p>Посреди работы понадобилось сделать <code>git pull</code> или перейти на другую ветку, а изменения ещё не готовы для commit. Git не пускает: «ваши изменения будут потеряны». <code>stash</code> временно кладёт их на полку:</p>
<pre><code>git stash          # спрятать изменения и очистить рабочую папку
git pull           # или git switch main
git stash pop      # вернуть изменения
git stash list     # посмотреть, что лежит на полке</code></pre>
<h3>Убрать файл .env, который уже попал в commit</h3>
<p>Если добавить <code>.env</code> в <code>.gitignore</code> позже, ничего не изменится: файл, который Git уже отслеживает, он игнорировать не начнёт. Сначала файл нужно снять с отслеживания:</p>
<pre><code>git rm --cached .env                 # убирает из Git, файл на диске остаётся
echo ".env" &gt;&gt; .gitignore            # теперь он не добавится снова
git add .gitignore
git commit -m ".env файлын бақылаудан алып тастадым"</code></pre>
<p>Без <code>--cached</code> команда <code>git rm</code> удалит файл и с диска. Помните: файл <b>остаётся в старых commit-ах</b>. Поэтому сразу смените (rotate) пароли и ключи, которые в нём были: считайте их раскрытыми.</p>
<h3>Merge-конфликт</h3>
<p>Если два человека по-разному изменили <b>одну и ту же строку</b> одного файла, Git не может сам решить, какой вариант оставить:</p>
<pre><code>$ git pull
CONFLICT (content): Merge conflict in report.sql
Automatic merge failed; fix conflicts and then commit the result.</code></pre>
<p>Git ставит внутри файла метки:</p>
<pre><code>SELECT city, SUM(amount) AS revenue
FROM orders
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
WHERE status = 'paid'
=======
WHERE status = 'paid' AND amount &lt; 20000
&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main
GROUP BY city;</code></pre>
<table>
<tr><th>Часть</th><th>Что означает</th></tr>
<tr><td>Между <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> и <code>=======</code></td><td>ваш вариант</td></tr>
<tr><td>Между <code>=======</code> и <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code></td><td>пришедший вариант (коллеги)</td></tr>
</table>
<p>Шаги решения:</p>
<ol>
<li><code>git status</code> показывает, в каких файлах есть конфликт (<code>both modified</code>).</li>
<li>Откройте файл и оставьте правильный вариант: свой, коллеги или сочетание обоих. Если не знаете, какой верный, спросите коллегу.</li>
<li>Удалите все три строки с метками (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>).</li>
<li><code>git add report.sql</code> — отметка «этот файл разрешён».</li>
<li><code>git commit</code> завершает merge.</li>
</ol>
<p>Если всё запуталось, <code>git merge --abort</code> возвращает состояние до merge. Ничего не теряется.</p>
<div class="tip">Как уменьшить число конфликтов: перед началом работы делайте <code>git pull</code>, делайте небольшие commit-ы и чаще отправляйте их через push. Чем дольше ветка живёт отдельно от main, тем больше конфликтов.</div>
<h3>Частые ошибки</h3>
<ul>
<li><b>Снова и снова вводить пароль от аккаунта.</b> Он не работает: нужен token, SSH или <code>gh auth login</code>.</li>
<li><b>Делиться закрытым ключом.</b> В GitHub вставляют только содержимое файла <code>.pub</code>. Файл без <code>.pub</code> — закрытый ключ, никому его не отправляйте.</li>
<li><b>Сделать commit, не удалив метки конфликта.</b> В файле останется <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, и код SQL или Python сломается.</li>
<li><b>Написать <code>git rm .env</code> без <code>--cached</code>.</b> Файл удалится и с диска.</li>
<li><b>Забыть <code>pop</code> после <code>git stash</code>.</b> Работа останется на полке, а вы решите, что она «пропала». Проверьте <code>git stash list</code>.</li>
</ul>`,
      ex: [
        { prompt: '<code>git push</code> спросил логин и пароль от GitHub. Вы ввели пароль правильно, но получили <code>Authentication failed</code>. В чём причина?', options: ['Нет интернета', 'GitHub не принимает пароль от аккаунта для команд Git: нужен token, SSH-ключ или gh auth login', 'Репозиторий удалён', 'Сначала нужно было сделать git pull'], explain: 'Вход по паролю отключён в 2021 году. Для адреса HTTPS вместо пароля вводят personal access token либо настраивают SSH-ключ.' },
        { prompt: 'Вы не закончили анализ, делать commit ещё рано, а нужно выполнить <code>git pull</code>. Временно отложите изменения на полку.', hints: ['Команда начинается с <code>git stash</code>.'], explain: 'Рабочая папка очищена. После pull изменения вернёт <code>git stash pop</code>.' },
        { prompt: 'Файл <code>.env</code> случайно попал в commit. Уберите его из-под отслеживания Git, но файл на диске должен <b>остаться</b>.', hints: ['Добавьте к команде <code>git rm</code> флаг, который оставляет файл на диске.', '<code>git rm --cached .env</code>'], explain: 'Теперь добавьте .env в .gitignore и сделайте commit. Файл остаётся в старых commit-ах, поэтому смените ключи, которые в нём были.' },
        { prompt: 'При <code>git pull</code> в файле <code>report.sql</code> возник конфликт. Вы открыли файл, оставили правильный вариант и удалили метки. Теперь сообщите Git, что этот файл разрешён.', hints: ['Разрешённый файл добавляют в staging.', '<code>git add report.sql</code>'], explain: 'Файл отмечен как разрешённый. Последний шаг — <code>git commit</code>: он завершает merge.' },
        { prompt: 'Вы хотите посмотреть, что коллеги отправили в GitHub, но ваши файлы пока не должны меняться. Какая команда?', options: ['git pull', 'git fetch', 'git push', 'git stash pop'], explain: 'fetch только скачивает: новые commit-ы появляются в origin/main, а рабочая папка не меняется. pull — это fetch + merge, он сразу меняет файлы.' }
      ]
    },
    'git-gate': {
      title: 'Экзамен модуля: Git',
      body: `<p>Полный рабочий процесс: новая ветка → commit → GitHub.</p>`,
      ex: [
        { prompt: 'Создайте новую ветку <code>ab-test</code> и перейдите в нее.' },
        { prompt: 'Добавьте все измененные файлы в staging.' },
        { prompt: 'Сделайте commit с сообщением «A/B тест нәтижесін қостым» («Добавил результат A/B-теста»). Сообщение напишите именно так, по-казахски.' },
        { prompt: 'Впервые отправьте ветку на GitHub (<code>origin</code>).' },
        { prompt: 'Разница между <code>git add</code> и <code>git commit</code>:', options: ['Разницы нет', 'add готовит изменение к следующему коммиту (staging), commit сохраняет его в историю', 'add отправляет на GitHub', 'commit удаляет файл'] }
      ]
    }
  }
});
