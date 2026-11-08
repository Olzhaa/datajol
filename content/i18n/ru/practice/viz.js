// viz practice tasks: Russian text. Code, solutions and checks are in content/practice/viz.js.
DJ.i18n.patch({ lessons: {
 "viz-3": {
  "pr": [
   {
    "title": "Количество товаров по категориям",
    "prompt": "<p>Для столбчатой диаграммы: сколько товаров в каждой категории? <code>category</code>, <code>n</code>. По убыванию количества, при равенстве — по названию категории.</p>",
    "hints": [
     "<code>ORDER BY n DESC, category</code>"
    ]
   },
   {
    "title": "Сортировка по значению",
    "prompt": "<p>Функция <code>sort_desc(data)</code> должна превратить словарь в список пар <code>(атау, мән)</code> и вернуть его по убыванию значения. Например, <code>sort_desc({\"Астана\": 310, \"Алматы\": 420})</code> → <code>[(\"Алматы\", 420), (\"Астана\", 310)]</code>.</p>",
    "hints": [
     "<code>sorted(data.items(), key=lambda kv: kv[1], reverse=True)</code>"
    ],
    "check": {
     "tests": "assert sort_desc({\"Астана\": 310, \"Алматы\": 420}) == [(\"Алматы\", 420), (\"Астана\", 310)], \"По убыванию: [('Алматы', 420), ('Астана', 310)]\"\nassert sort_desc({\"а\": 1, \"ә\": 3, \"б\": 2}) == [(\"ә\", 3), (\"б\", 2), (\"а\", 1)], \"sort_desc({'а': 1, 'ә': 3, 'б': 2}) неверно\""
    }
   },
   {
    "title": "Заказы по городам",
    "prompt": "<p>Сколько заказов сделали клиенты каждого города? <code>city</code>, <code>orders</code>. По убыванию количества заказов, при равенстве — по названию города.</p>",
    "hints": [
     "<code>customers c JOIN orders o ON o.customer_id = c.id</code>"
    ]
   },
   {
    "title": "Пропорциональная длина",
    "prompt": "<p>Функция <code>bar_len(v, max_v, width)</code> должна возвращать количество символов для столбца: <code>round(v / max_v * width)</code>. Ось начинается с нуля, поэтому длина пропорциональна значению. Например, <code>bar_len(310, 420, 8)</code> → <code>6</code>.</p>",
    "hints": [
     "<code>round(...)</code> даёт целое число."
    ],
    "check": {
     "tests": "assert bar_len(310, 420, 8) == 6, \"bar_len(310, 420, 8) должно быть 6\"\nassert bar_len(420, 420, 8) == 8, \"Наибольшее значение занимает полную ширину: 8\"\nassert bar_len(0, 420, 8) == 0, \"У нулевого значения нет столбца: 0\"\nassert isinstance(bar_len(100, 300, 10), int), \"Возвращайте целое число\""
    }
   },
   {
    "title": "Самые продаваемые товары",
    "prompt": "<p>Выведите 5 товаров с наибольшими продажами (количество штук) по доставленным заказам: <code>name</code>, <code>qty</code>. По убыванию, при равенстве — по названию.</p>",
    "hints": [
     "Соедините три таблицы через JOIN и посчитайте <code>SUM(oi.quantity)</code>.",
     "<code>ORDER BY qty DESC, p.name LIMIT 5</code>"
    ]
   },
   {
    "title": "Вывод доли в процентах",
    "prompt": "<p>Чтобы написать долю рядом со столбцом, функция <code>shares(data)</code> должна возвращать словарь <code>{атау: үлес}</code>: доля — процент от общей суммы, с округлением до 1 знака после запятой (<code>round</code>). Например, <code>shares({\"Алматы\": 3, \"Астана\": 1})</code> → <code>{\"Алматы\": 75.0, \"Астана\": 25.0}</code>.</p>",
    "hints": [
     "Сначала <code>total = sum(data.values())</code>."
    ],
    "check": {
     "tests": "assert shares({\"Алматы\": 3, \"Астана\": 1}) == {\"Алматы\": 75.0, \"Астана\": 25.0}, \"shares({'Алматы': 3, 'Астана': 1}) неверно\"\nassert shares({\"а\": 1, \"ә\": 2}) == {\"а\": 33.3, \"ә\": 66.7}, \"shares({'а': 1, 'ә': 2}) должно быть {'а': 33.3, 'ә': 66.7}\""
    }
   },
   {
    "title": "Сгруппированные столбцы",
    "prompt": "<p>Функция <code>grouped_bars(data, width)</code> должна построить текстовый сгруппированный график из словаря <code>{қала: (биыл, былтыр)}</code>. Города — по убыванию <b>значения за этот год</b>. Для каждого города две строки:</p><ul><li><code>f\"{қала:&lt;8}{'█' * n1} {биыл}\"</code></li><li><code>f\"{'':&lt;8}{'░' * n2} {былтыр}\"</code></li></ul><p>Длины в одном масштабе: <code>n = round(мән / ең_үлкен_мән * width)</code>, где наибольшее значение берётся из обоих годов. Верните список строк.</p>",
    "hints": [
     "Наибольшее значение: <code>max(max(a, b) for a, b in data.values())</code>.",
     "Ключ сортировки: <code>kv[1][0]</code> (значение за этот год)."
    ],
    "check": {
     "tests": "_r = grouped_bars({\"Астана\": (300, 200), \"Алматы\": (400, 300)}, 4)\nassert isinstance(_r, list) and len(_r) == 4, \"Для каждого города две строки: 4 строки\"\nassert _r == [\"Алматы  ████ 400\", \"        ░░░ 300\", \"Астана  ███ 300\", \"        ░░ 200\"], f\"Строки неверны: {_r}\""
    }
   },
   {
    "title": "Слои по месяцам и категориям",
    "prompt": "<p>Данные для графика с накоплением (stacked): выручка по каждому месяцу и категории по доставленным заказам. <code>month</code> (<code>order_date</code>, часть YYYY-MM), <code>category</code>, <code>revenue</code>. По порядку месяцев, внутри месяца — по убыванию выручки.</p>",
    "hints": [
     "<code>GROUP BY month, p.category</code>",
     "<code>ORDER BY month, revenue DESC</code>"
    ]
   }
  ]
 },
 "viz-4": {
  "pr": [
   {
    "title": "Ежедневная выручка по Алматы",
    "prompt": "<p>Для линейного графика — только ежедневная выручка региона Алматы: <code>day</code>, <code>revenue</code>, по порядку дней.</p>",
    "hints": [
     "<code>WHERE region = 'Алматы' ORDER BY day</code>"
    ]
   },
   {
    "title": "Линия месячных платежей",
    "prompt": "<p>Месячная выручка из таблицы <code>payments</code>: <code>month</code>, <code>revenue</code>, по порядку месяцев.</p>",
    "hints": [
     "<code>GROUP BY month ORDER BY month</code>"
    ]
   },
   {
    "title": "Активные пользователи по месяцам",
    "prompt": "<p>Количество активных пользователей в каждом месяце из таблицы <code>activity</code>: <code>month</code>, <code>active_users</code> (уникальные). По порядку месяцев.</p>",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code>"
    ]
   },
   {
    "title": "Два региона рядом",
    "prompt": "<p>Для линейного графика с двумя линиями нужна «широкая» таблица: <code>day</code>, <code>almaty</code>, <code>astana</code> (выручка каждого региона в тот день). По порядку дней.</p>",
    "hints": [
     "<code>SUM(CASE WHEN region = 'Алматы' THEN revenue END)</code>"
    ]
   },
   {
    "title": "Скользящее среднее за 3 дня",
    "prompt": "<p>Сглаживание шума: суммарная ежедневная выручка и скользящее среднее за 3 дня. <code>day</code>, <code>revenue</code>, <code>ma3</code> (текущий и 2 предыдущих дня, с одним знаком после запятой). По порядку дней.</p>",
    "hints": [
     "Сначала в CTE возьмите сумму за каждый день.",
     "<code>AVG(revenue) OVER (ORDER BY day ROWS 2 PRECEDING)</code>"
    ]
   },
   {
    "title": "Накопленная выручка",
    "prompt": "<p>Линия накопленной выручки с начала месяца: <code>day</code>, <code>revenue</code> (сумма за день), <code>running</code> (все выручки до этого дня включительно). По порядку дней.</p>",
    "hints": [
     "<code>SUM(revenue) OVER (ORDER BY day)</code>"
    ]
   },
   {
    "title": "Скользящее среднее внутри региона",
    "prompt": "<p>Скользящее среднее за 3 дня у каждого региона своё: <code>region</code>, <code>day</code>, <code>revenue</code>, <code>ma3</code> (с одним знаком после запятой). Сначала регион, потом день.</p>",
    "hints": [
     "<code>OVER (PARTITION BY region ORDER BY day ROWS 2 PRECEDING)</code>"
    ]
   },
   {
    "title": "Метка для аннотации",
    "prompt": "<p>Чтобы поставить аннотацию на график: <code>day</code>, <code>revenue</code> (суммарно), <code>change</code> (разность с предыдущим днём), <code>trend</code>: если растёт — <code>өсу</code>, если падает — <code>түсу</code>, если не меняется — <code>тең</code>. В первый день <code>change</code> и <code>trend</code> пусты (NULL). По порядку дней.</p>",
    "hints": [
     "<code>revenue - LAG(revenue) OVER (ORDER BY day)</code>",
     "Если в CASE не написать <code>ELSE</code>, то для NULL результат будет NULL."
    ]
   }
  ]
 }
} });
