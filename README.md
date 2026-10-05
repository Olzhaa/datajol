# DataJol

Дата аналитика мен Data Science-ті нөлден үйренуге арналған қазақ тіліндегі тегін интерактивті платформа: мәтіндік сабақтар, браузерде бірден тексерілетін тапсырмалар, XP, streak, белгілер, сертификаттар және көшбасшылар кестесі.

A free, Kazakh-language site for learning data analytics and data science from zero. Every exercise is checked in the browser.

Сайт: https://olzhaa.github.io/datajol/

## Мазмұн

21 модуль, 202 сабақ, 569 тапсырма (320-ы SQL, Python немесе формула ретінде браузерде тексеріледі).

| Бағыт | Кезеңдер | Модульдер |
| --- | --- | --- |
| Data Analyst | 0–3 | Дерек әлемі, Math refresher, Spreadsheets, SQL Core, Python, pandas & NumPy, Git & GitHub, Statistics, Cleaning & EDA, Advanced SQL, Visualization, Power BI, Business Analytics, DA Capstone |
| Data Scientist | 4–5 | Probability, Inference & A/B Testing, Math for ML, ML Foundations және ML in Practice (scikit-learn браузерде), DS Capstone |
| Мансап | 7 | Портфолио, резюме, LinkedIn, сұхбатқа дайындық |

ML Engineer кезеңі (6) жоспарда.

## Тапсырмалар қалай тексеріледі

| Түрі | Қозғалтқыш |
| --- | --- |
| SQL | [sql.js](https://github.com/sql-js/sql.js) (SQLite), нәтиже дұрыс шешіммен салыстырылады |
| Python, pandas, scikit-learn | [Pyodide](https://pyodide.org) Web Worker ішінде; пакеттер `vendor/pyodide/` ішінен жүктеледі |
| Excel формулалары | `js/sheet.js` — өз формула қозғалтқышы (EN және RU атаулар) |
| Git командалары | үлгімен (regex) салыстыру |
| Тест, сандық жауап | бірден |

## Құрылым

```
src/index.html, src/app.css   бет үлгісі мен стиль (build.py біріктіреді)
js/                           қосымша, прогресс, бұлт, тексерушілер, Python worker
content/                      сабақтар: әр модуль өз файлында, деректер жиындары
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

1. Supabase жобасының SQL Editor-ында алдымен `supabase/schema.sql`, сосын `supabase/leaderboard.sql` және `supabase/feedback.sql` іске қосыңыз. Пікірлер Table Editor → `feedback` кестесінде көрінеді.
2. Authentication → URL Configuration: Site URL және Redirect URLs ішіне `https://olzhaa.github.io/datajol/**` қосыңыз.
3. `js/config.js` ішінде Supabase URL/кілтін және `cloudHosts` тізімін (бұлт қосылатын домендер) тексеріңіз.

## Жариялау

GitHub Pages: Settings → Pages → Deploy from a branch, `main` / `(root)`. `404.html` белгісіз беттер үшін қолданылады.

Google Search Console-ға сайтты қосып, `https://olzhaa.github.io/datajol/sitemap.xml` картасын жіберіңіз.
