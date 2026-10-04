# DataJol

Деректер талдауын нөлден үйренуге арналған қазақ тіліндегі интерактивті платформа: мәтіндік сабақтар, браузерде бірден тексерілетін тапсырмалар, XP, streak және белгілер.

A Kazakh-language, Codedex-style site for learning data analytics from zero. Every exercise is checked instantly in the browser, with no server.

## Мазмұн

Data Analyst бағыты толық: 14 модуль, 125 сабақ, 334 тапсырма (209-ы браузерде тексеріледі).

| Кезең | Модульдер |
| --- | --- |
| 0 | Дерек әлемі, Math refresher |
| 1 | Spreadsheets, SQL Core |
| 2 | Python, pandas & NumPy, Git & GitHub |
| 3 | Statistics, Cleaning & EDA, Advanced SQL, Visualization, Power BI, Business Analytics, DA Capstone |

Data Scientist және ML Engineer бағыттары (4–7 кезеңдер) жоспарда.

## Тапсырмалар қалай тексеріледі

| Түрі | Қозғалтқыш |
| --- | --- |
| SQL | [sql.js](https://github.com/sql-js/sql.js) (SQLite), нәтиже дұрыс шешіммен салыстырылады |
| Python, pandas | [Pyodide](https://pyodide.org) 0.27.7 Web Worker ішінде; pandas пен NumPy `vendor/pyodide/pkgs/` ішінен жүктеледі |
| Excel формулалары | `js/sheet.js` — өз формула қозғалтқышы (EN және RU атаулар) |
| Git командалары | үлгімен (regex) салыстыру |
| Тест, сандық жауап | бірден |

Модуль емтиханында өту шегі 75%.

## Құрылым

```
src/index.html, src/app.css   бет үлгісі мен стиль (build.py біріктіреді)
js/                           қосымша, прогресс, тексерушілер, Python worker
content/                      сабақтар: әр модуль өз файлында, деректер жиындары
vendor/                       CodeMirror, sql.js, Pyodide
tests/verify-exercises.js     барлық тапсырманы браузерде тексеру
```

## Іске қосу

```bash
python3 build.py                 # index.html мен artifact.html жасайды
python3 -m http.server 8765      # http://localhost:8765
node tests/verify-exercises.js   # playwright керек
```

Прогресс әзірге браузердің localStorage-інде сақталады.
