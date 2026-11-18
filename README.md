# Tolqyn

Бағдарламалау мен дата ғылымын нөлден ойын түрінде үйренуге арналған қазақ тіліндегі тегін интерактивті платформа (бұрынғы атауы DataJol): мәтіндік сабақтар, браузерде бірден тексерілетін тапсырмалар, XP, streak, белгілер, сертификаттар және көшбасшылар кестесі.

A free, Kazakh-language site for learning data analytics and data science from zero. Every exercise is checked in the browser.

Сайт: https://olzhaa.github.io/datajol/

## Мазмұн

Сайтта көрінетіні (Data Analyst + Data Scientist): 24 модуль, 272 сабақ, сабақ ішінде 896 тапсырма, барлығы 16 165 XP, оған қоса әр код сабағынан кейінгі практика есептері. Жасырылған 12 модульмен бірге репода 423 сабақ бар.

| Бағыт | Кезеңдер | Модульдер |
| --- | --- | --- |
| Data Analyst | 0–3 | Дерек әлемі, Math refresher, Spreadsheets, SQL Core, Python, pandas & NumPy, Git & GitHub, Statistics, Cleaning & EDA, Advanced SQL, Visualization, Power BI, Business Analytics, DA Capstone |
| Data Scientist | 4–5 | Probability, Inference & A/B Testing, Math for ML, ML Foundations және ML in Practice (scikit-learn браузерде), DS Capstone, Deep Learning Intro (қосымша) |
| ML Engineer (жасырылған) | 6 | Software Engineering, Deployment & Docker, MLOps, GenAI, AI Engineering, MLE Capstone |
| Тілдер мен CS (жасырылған) | қосымша | Intermediate Python, Data Structures & Algorithms, Java, C++, Python Backend |
| Мансап | 7 | Портфолио, резюме, LinkedIn, сұхбатқа дайындық |

## Data Analyst / Data Scientist фокусы (2026 жылғы қараша)

Сайт қазір тек **Data Analyst және Data Scientist** бағыттарын көрсетеді. Мазмұн hh.kz-тегі 54 вакансияның (29 DA/BI, 25 DS/ML) талаптарымен салыстырылып толықтырылды.

- **Жасырылған модульдер:** m6-1, m6-2, m6-3, m6-6, GenAI, AI Engineering, Intermediate Python, Java, C++, DSA (2 модуль), Python Backend. Сабақтары `content/` ішінде қалады, оқушылардың прогресі өшпейді. Қайта ашу үшін `content/curriculum.js` ішіндегі `DJ.hiddenModules` тізімінен алып тастап, `python3 build.py` іске қосыңыз.
- **Көшірілген модульдер:** M6.5 Cloud & Data Eng Basics 3-кезеңге (ETL/DWH DA вакансияларының жартысында сұралады), M6.4 Deep Learning Intro 5-кезеңге қосымша модуль ретінде.
- **Жаңа модуль M3.8 «SQL практикум: Qazaq Market»:** 10 сабақ (емтиханымен), жаңа `qazaq` дерекқорында.
- **Жаңа сабақтар (барлығы ~55):**
  - Негіз: талдау циклі және файлдар (m01-4), салмақталған орташа және кері пайыз (m02-4), күндер және IFERROR (ss-8), UNION (sql-15), күн/мәтін функциялары (sql-16), self join және fan-out тұзағы (sql-17), кортеж/жиын/lambda (py-14), value_counts/concat (pd-9), мәтін және уақыт қатары (pd-10), NumPy 2D (pd-11), GitHub token/SSH және конфликт (git-7).
  - Data Analyst: pandas EDA (cl-9), date spine және gaps-and-islands (adv-10), UNION/self-join/NTILE (adv-11), сессиялар және воронка (adv-12), BI құралдары (viz-9), Python-да диаграмма (viz-10), DAX итераторлары (pbi-9), A/B тестті оқу (ba-ab), RFM/ABC (ba-9), DAU/MAU (ba-10), AI көмекшімен талдау (cap-ai), take-home (cap-10), ClickHouse (deng-ch), дерек витриналары және SCD (deng-mart), SQL диалектілері (qm-9).
  - Data Science: экспоненциал таралу және ковариация (pr-11), хи-квадрат және scipy (ab-chi), bootstrap (ab-boot), CUPED/DiD (ab-cuped), логарифм және сигмоид (mm-log), регуляризация (ml-reg), ROC/PR, Gini/KS (ml-curves), уақыт қатары (mp-ts), бустинг (mp-gbm), PCA (mp-pca), TF-IDF (mp-text), PSI дрейфі және MLflow (mp-ops), антифрод (mp-anom), ұсыныс жүйелері (mp-rec), екінші өз бетінше жоба (dc-11), DS сұхбаты (cr-ds).
- **Жаңа дерек:** `qazaq` дерекқоры (оның ішінде `events_ts`), `metrics.daily_active`; `mldata.js`-те `sales_daily.csv`, `reviews.csv`, `loans.csv`, `transactions.csv`, `purchases.csv`.
- **Аудармалар:** барлық жаңа сабақтар және түзетілген үзінділер орыс және ағылшын тілдеріне аударылды.
- **Тексеріс:** `tests/verify-exercises.js` барлық көрінетін модульде өтті (kk, ru, en).
- **Supabase:** жаңа тапсырмалар қосылды, сондықтан `supabase/xp_catalog.sql` файлын қайта іске қосыңыз.
- **Практика:** жаңа код сабақтарының әрқайсысына 8 есептен (барлығы 280), орыс және ағылшын аудармасымен.
- **Бет салмағы:** Qazaq Market SQL-і мен жаңа ML файлдары `content/lazy/` ішінде, тапсырма іске қосылғанда ғана жүктеледі (бастапқы скрипттер 200 KB gzip бюджетінен төмен).

## Практика және есептер

- Сабақ ішіндегі тапсырмалар ретімен ашылады: алдыңғысын орындамай келесісі ашылмайды.
- Код тапсырмасы бар әр сабақтан кейін 8 практика есебі бар (3 оңай, 3 орташа, 2 қиын), `#practice/<модуль>/<сабақ>`. Олар сабақ аяқталғаннан кейін ашылады.
- `#problems` — барлық есептер бір бетте (LeetCode секілді): іздеу, курс, қиындық, тіл бойынша сүзгі. Тіркелусіз де ашылады (қонақ профилі жасалады).
- `#selftest` — өткен тақырыптардан кездейсоқ есептермен уақытпен өзін-өзі тексеру. Нәтиже тек құрылғыда сақталады.

## Тапсырмалар қалай тексеріледі

| Түрі | Қозғалтқыш |
| --- | --- |
| SQL | [sql.js](https://github.com/sql-js/sql.js) (SQLite), нәтиже дұрыс шешіммен салыстырылады |
| Python, pandas, scikit-learn | [Pyodide](https://pyodide.org) Web Worker ішінде; пакеттер `vendor/pyodide/` ішінен жүктеледі |
| Excel формулалары | `js/sheet.js` — өз формула қозғалтқышы (EN және RU атаулар) |
| Git командалары | үлгімен (regex) салыстыру |
| Java, C++ | javac + TeaVM және clang/lld (WebAssembly) Web Worker ішінде |
| Тест, сандық жауап | бірден |

## Құрылым

```
src/index.html, src/app.css   бет үлгісі мен стиль (build.py біріктіреді)
js/                           қосымша, прогресс, бұлт, тексерушілер, Python worker
content/                      сабақтар: әр модуль өз файлында, деректер жиындары
content/practice/             әр сабақтан кейінгі практика есептері (DJ.addPractice), аудармасы content/i18n/<тіл>/practice/
content/problems/             build.py жасайтын есептер тізімі (#problems беті)
tools/prerender.js            m/<модуль>/ статикалық беттері, sitemap.xml, басты беттегі модуль тізімі
vendor/                       CodeMirror, sql.js, Pyodide, supabase-js
supabase/                     дерекқор схемасы мен көшбасшылар кестесі
tests/verify-exercises.js     барлық тапсырманы браузерде тексеру
```

## Жергілікті іске қосу

```bash
python3 build.py                 # index.html, artifact.html, m/*/index.html, sitemap.xml (node керек)
python3 -m http.server 8765      # http://localhost:8765
```

`index.html`, `artifact.html`, `m/` және `sitemap.xml` — генерацияланған файлдар: `src/`, `content/` немесе `js/` өзгерген сайын `python3 build.py` іске қосыңыз (скрипттерге `?v=<hash>` қосылады, браузер кэші жаңарады).

## Тапсырмаларды тексеру

```bash
npm i playwright                 # бір рет
python3 -m http.server 8765 &
node tests/verify-exercises.js   # BASE_URL, CHROMIUM_PATH айнымалылары міндетті емес
```

Әр SQL, Python және формула тапсырмасының дұрыс шешімі өтуі, ал бастапқы коды өтпеуі керек; қате болса скрипт 1 кодымен аяқталады.

## Бұлт (Supabase)

Бұлтсыз прогресс браузердің localStorage-інде сақталады. Аккаунт, синхрондау және көшбасшылар кестесі үшін:

1. Supabase жобасының SQL Editor-ында файлдарды осы ретпен іске қосыңыз (бәрін қайта іске қосуға болады):
   `schema.sql` → `leaderboard.sql` → `analytics.sql` → `feedback.sql` → `account.sql` (аккаунтты жою) → `admin.sql` (иесінің дашборды `#admin`) → `social.sql` (жария портфолио `#u/<id>`, оқытушы сыныптары `#teach`, `#join/<код>`) → `xp_guard.sql` (XP-ды сервер жақта тексеру) → `xp_catalog.sql` (әр тапсырманың XP-сы мен түрі; `python3 build.py` оны қайта жасайды, жаңа тапсырма қосылғанда қайта іске қосыңыз) → `assign.sql` (сынып тапсырмалары мен емтихандар `#exam/<id>`, мұғалім есебі `#asg/<id>`). Бір сыныпқа 30 оқушыға дейін; шекті #admin бетінде көбейтесіз.
   Дашбордты ашу үшін өзіңізді бір рет admin етіңіз: `insert into public.admins (user_id) select id from auth.users where email = '<сіздің email>' on conflict do nothing;` XP шегі 100 000; ескі базада оны көтеру үшін `supabase/leaderboard.sql`-ды қайта іске қосу жеткілікті. Пікірлер Table Editor → `feedback` кестесінде, оқиғалар мен браузер қателері `events` және `client_errors` кестелерінде көрінеді (пайдалы сұраулар файлдың соңында).
2. Authentication → URL Configuration: Site URL және Redirect URLs ішіне `https://olzhaa.github.io/datajol/**` қосыңыз.
3. `js/config.js` ішінде Supabase URL/кілтін және `cloudHosts` тізімін (бұлт қосылатын домендер) тексеріңіз.

## Құқықтық беттер

`legal/src/<doc>.<kk|ru|en>.html` мәтіндерінен `tools/legal.js` (build.py іске қосады) `legal/privacy.html`, `terms`, `cookies`, `licenses` беттерін үш тілде жасайды. Сайт иесінің деректері мен күн `legal/src/site.json` ішінде; шарттар өзгерсе, `js/consent.js` ішіндегі `terms` күнін де жаңартыңыз. Статистика (`DJ.cloud.track`) тек баннердегі келісіммен жіберіледі. Ескі жазбаларды өшіру: `supabase/retention.sql`. Шрифттер `assets/fonts/` ішінде (OFL).

## Жариялау

GitHub Pages: Settings → Pages → Build and deployment → Source: **GitHub Actions** (`.github/workflows/pages.yml` әр push-та `build.py`-ды іске қосып, сайтты жариялайды). `404.html` белгісіз беттер үшін қолданылады.

Google Search Console-ға сайтты қосып, `https://olzhaa.github.io/datajol/sitemap.xml` картасын жіберіңіз.
