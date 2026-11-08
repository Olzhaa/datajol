# Tolqyn

Бағдарламалау мен дата ғылымын нөлден ойын түрінде үйренуге арналған қазақ тіліндегі тегін интерактивті платформа (бұрынғы атауы DataJol): мәтіндік сабақтар, браузерде бірден тексерілетін тапсырмалар, XP, streak, белгілер, сертификаттар және көшбасшылар кестесі.

A free, Kazakh-language site for learning data analytics and data science from zero. Every exercise is checked in the browser.

Сайт: https://olzhaa.github.io/datajol/

## Мазмұн

32 модуль, 333 сабақ, 1 082 тапсырма, барлығы 19 145 XP (620-ы SQL, Python, Java, C++ немесе формула ретінде браузерде тексеріледі).

| Бағыт | Кезеңдер | Модульдер |
| --- | --- | --- |
| Data Analyst | 0–3 | Дерек әлемі, Math refresher, Spreadsheets, SQL Core, Python, pandas & NumPy, Git & GitHub, Statistics, Cleaning & EDA, Advanced SQL, Visualization, Power BI, Business Analytics, DA Capstone |
| Data Scientist | 4–5 | Probability, Inference & A/B Testing, Math for ML, ML Foundations және ML in Practice (scikit-learn браузерде), DS Capstone |
| ML Engineer | 6 | Software Engineering, Deployment & Docker, MLOps, Deep Learning, Data Engineering, GenAI, MLE Capstone |
| Тілдер мен CS | қосымша | Intermediate Python, Data Structures & Algorithms, Java, C++ |
| Мансап | 7 | Портфолио, резюме, LinkedIn, сұхбатқа дайындық |

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
