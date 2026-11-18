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
 },
 "viz-9": {
  "pr": [
   {
    "title": "Помесячный dataset по статусам",
    "prompt": "<b>qazaq.</b> Dataset в длинном формате для столбчатой диаграммы «Заказы по статусам»: по всем заказам 2026 года <code>month</code> (первый день месяца, <code>date(order_date, 'start of month')</code>), <code>status</code>, <code>orders</code> (число заказов). Сортировка по <code>month</code>, <code>status</code>.",
    "hints": [
     "Статус стоит в строке, а не в названии столбца: <code>GROUP BY month, status</code>.",
     "<code>WHERE order_date &gt;= '2026-01-01'</code>"
    ]
   },
   {
    "title": "Не отношение, а его части",
    "prompt": "<b>qazaq.</b> Подготовьте dataset для карточки «средний чек по городам», но храните не само среднее, а его части: по заказам <code>delivered</code> <code>city</code>, <code>orders</code> (уникальные заказы), <code>revenue</code> (сумма quantity × unit_price). Сортировка по <code>city</code>.",
    "hints": [
     "После соединения с <code>order_items</code> заказ повторяется: <code>COUNT(DISTINCT o.order_id)</code>.",
     "Средний чек BI потом посчитает сам: <code>SUM(revenue) / SUM(orders)</code>."
    ]
   },
   {
    "title": "Регистрации на оси времени",
    "prompt": "<b>qazaq.</b> Dataset для линейной диаграммы «Регистрации по месяцам»: <code>month</code> — настоящая дата (первый день месяца, а не текст <code>'2025-03'</code>), <code>new_customers</code> — клиенты, зарегистрированные в этом месяце. Сортировка по <code>month</code>.",
    "hints": [
     "<code>date(registered_at, 'start of month')</code>"
    ]
   },
   {
    "title": "Гранулярность — клиент",
    "prompt": "<b>qazaq.</b> Dataset для дашборда клиентов, одна строка — один клиент: <code>customer_id</code>, <code>city</code>, <code>registered_at</code>, <code>orders</code> (число заказов <code>delivered</code>), <code>revenue</code> (их сумма quantity × unit_price). Клиенты без покупок тоже входят, у них <code>orders</code> и <code>revenue</code> равны 0. 80 строк, по <code>customer_id</code>.",
    "hints": [
     "Сначала в CTE <code>orders</code> и <code>revenue</code> каждого покупателя, затем <code>customers c LEFT JOIN</code> этот CTE.",
     "В строке без пары получится NULL: <code>COALESCE(d.orders, 0)</code>."
    ]
   },
   {
    "title": "Среднее средних",
    "prompt": "<b>qazaq.</b> По заказам <code>delivered</code> 2026 года посчитайте <code>orders</code> и <code>revenue</code> на уровне «месяц × город». Затем сравните одной строкой два числа: <code>right_avg</code> = <code>SUM(revenue) / SUM(orders)</code> и <code>wrong_avg</code> = среднее из средних чеков строк. Оба <code>ROUND</code> до целого.",
    "hints": [
     "CTE: <code>GROUP BY month, c.city</code>, внутри <code>COUNT(DISTINCT o.order_id)</code> и сумма.",
     "<code>ROUND(SUM(revenue) * 1.0 / SUM(orders))</code> и <code>ROUND(AVG(revenue * 1.0 / orders))</code>. <code>* 1.0</code> защищает от целочисленного деления."
    ]
   },
   {
    "title": "Город × статус",
    "prompt": "<b>qazaq.</b> Dataset для составной (stacked) столбчатой диаграммы: по всем заказам <code>city</code> (город клиента), <code>status</code>, <code>orders</code> (число заказов). Только существующие комбинации. Сортировка по <code>city</code>, <code>status</code>.",
    "hints": [
     "<code>orders o JOIN customers c ON c.customer_id = o.customer_id</code>, <code>GROUP BY c.city, o.status</code>."
    ]
   },
   {
    "title": "Сетка без пустых ячеек",
    "prompt": "<b>qazaq.</b> Если ячейки «месяц × город» без заказов в dataset вообще нет, линия прерывается и BI не покажет её как 0. Постройте полную сетку из шести месяцев 2026 года и всех городов из <code>customers</code>: <code>month</code> (первый день месяца), <code>city</code>, <code>orders</code> (число заказов <code>delivered</code>, 0 если нет). 48 строк, по <code>month</code>, <code>city</code>.",
    "hints": [
     "Три CTE: список месяцев (<code>DISTINCT</code>), список городов (<code>DISTINCT city FROM customers</code>), фактические числа.",
     "Сетка: <code>m CROSS JOIN ct</code>, затем <code>LEFT JOIN f ON f.month = m.month AND f.city = ct.city</code> и <code>COALESCE(f.orders, 0)</code>."
    ]
   },
   {
    "title": "Метка первого заказа",
    "prompt": "<b>qazaq.</b> Dataset на уровне заказа для диаграммы «Выручка новых и повторных клиентов»: по заказам <code>delivered</code> <code>order_id</code>, <code>order_date</code>, <code>customer_id</code>, <code>is_first</code> (1, если это первый доставленный заказ клиента, иначе 0; если в один день два заказа, первым считается тот, у кого <code>order_id</code> меньше), <code>order_total</code>. По <code>order_id</code>.",
    "hints": [
     "Сначала в CTE приведите к уровню заказа: <code>GROUP BY o.order_id, o.order_date, o.customer_id</code>.",
     "Если <code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, order_id) = 1</code> — первый."
    ]
   }
  ]
 },
 "viz-10": {
  "pr": [
   {
    "title": "Число заказов по месяцам",
    "prompt": "<p>Данные для линейной диаграммы: посчитайте по чистым заказам <b>количество</b> заказов каждого месяца и запишите в Series <code>counts</code>: индекс — месяц <code>'YYYY-MM'</code> (по возрастанию), значение — число заказов.</p>",
    "hints": [
     "Месяц: <code>clean['order_date'].str[:7]</code>.",
     "<code>.size()</code> или <code>['id'].count()</code> дают число строк."
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\nassert 'counts' in globals() and getattr(counts, 'ndim', 0) == 1, \"counts должна быть pandas Series\"\nassert [str(i) for i in counts.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], f\"Индекс: 2024-01 … 2024-06, у вас {list(counts.index)}\"\nassert [int(v) for v in counts.values] == [int(x) for x in _cl.groupby(_cl['order_date'].str[:7]).size().values], \"Число заказов по месяцам неверно: считаются только чистые заказы\"\nassert int(counts.sum()) == 139, f\"Всего должно быть 139 чистых заказов, у вас {int(counts.sum())}\""
    }
   },
   {
    "title": "Столбцы по каналам",
    "prompt": "<p>Данные для вертикальной столбчатой диаграммы (<code>ax.bar</code>): по чистым заказам посчитайте выручку каждого канала (<code>channel</code>) и запишите в Series <code>by_channel</code>, отсортированную <b>по убыванию</b>.</p>",
    "hints": [
     "Канал хранится в <code>customers</code>: <code>clean.merge(customers, on='customer_id')</code>.",
     "<code>.groupby('channel')['amount'].sum().sort_values(ascending=False)</code>"
    ],
    "check": {
     "tests": "assert 'by_channel' in globals() and getattr(by_channel, 'ndim', 0) == 1, \"by_channel должна быть pandas Series\"\nassert list(by_channel.index) == ['2gis', 'instagram', 'referral'], f\"Порядок по убыванию: 2gis, instagram, referral; у вас {list(by_channel.index)}\"\nassert [float(v) for v in by_channel.values] == [133900.0, 124050.0, 76900.0], f\"Выручка: 133 900, 124 050, 76 900; у вас {list(by_channel.values)}\""
    }
   },
   {
    "title": "Перевести в доли",
    "prompt": "<p>Данные для столбца 100%: по чистым заказам запишите в Series <code>share</code> долю каждого канала в выручке в процентах (<code>round</code> до 1 знака). Индекс — канал, порядок любой.</p>",
    "hints": [
     "Сначала сумма по каналам, затем деление на общую сумму: <code>rev / rev.sum() * 100</code>.",
     "<code>.round(1)</code>"
    ],
    "check": {
     "tests": "assert 'share' in globals() and getattr(share, 'ndim', 0) == 1, \"share должна быть pandas Series\"\nassert {k: float(v) for k, v in share.items()} == {'2gis': 40.0, 'instagram': 37.0, 'referral': 23.0}, f\"Доли: 2gis 40.0, instagram 37.0, referral 23.0; у вас {dict(share)}\""
    }
   },
   {
    "title": "Длинная таблица для seaborn",
    "prompt": "<p>Подготовьте DataFrame в длинном формате для <code>sns.lineplot(data=long_df, x='month', y='revenue', hue='channel')</code>: столбцы <code>long_df</code> именно в таком порядке — <code>month</code>, <code>channel</code>, <code>revenue</code> (сумма чистой выручки); строки отсортированы по <code>month</code>, <code>channel</code>, индекс с 0.</p>",
    "hints": [
     "<code>m.groupby(['month', 'channel'], as_index=False)['amount'].sum()</code> оставляет столбцы группировки обычными столбцами.",
     "<code>.rename(columns={'amount': 'revenue'})</code>, затем <code>.reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "assert 'long_df' in globals() and getattr(long_df, 'ndim', 0) == 2, \"long_df должен быть DataFrame\"\nassert list(long_df.columns) == ['month', 'channel', 'revenue'], f\"Столбцы: month, channel, revenue; у вас {list(long_df.columns)}\"\nassert len(long_df) == 18 and list(long_df.index) == list(range(18)), \"18 строк (6 месяцев × 3 канала), индекс от 0 до 17\"\nassert list(long_df['month'])[:3] == ['2024-01'] * 3 and list(long_df['channel'])[:3] == ['2gis', 'instagram', 'referral'], \"Строки должны быть отсортированы по month, затем по channel\"\nassert float(long_df.loc[(long_df['month'] == '2024-03') & (long_df['channel'] == 'instagram'), 'revenue'].iloc[0]) == 47750.0, \"instagram, 2024-03: должно быть 47 750\""
    }
   },
   {
    "title": "Клиенты для scatter",
    "prompt": "<p>Данные для <code>ax.scatter(per_cust['orders'], per_cust['total'])</code>: по чистым заказам запишите в DataFrame <code>per_cust</code> число заказов и общую сумму каждого клиента. Столбцы: <code>customer_id</code>, <code>orders</code>, <code>total</code>; сортировка по <code>customer_id</code>, индекс с 0.</p>",
    "hints": [
     "Именованная агрегация: <code>.agg(orders=('id', 'count'), total=('amount', 'sum'))</code>.",
     "<code>groupby('customer_id', as_index=False)</code> оставляет номер клиента столбцом."
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\nassert 'per_cust' in globals() and list(per_cust.columns) == ['customer_id', 'orders', 'total'], \"Столбцы: customer_id, orders, total\"\nassert len(per_cust) == _cl['customer_id'].nunique() and list(per_cust['customer_id']) == sorted(_cl['customer_id'].unique().tolist()), \"Одна строка на каждого клиента с чистыми заказами, сортировка по customer_id\"\nassert int(per_cust['orders'].sum()) == 139 and float(per_cust['total'].sum()) == 334850.0, \"Сумма orders должна быть 139, сумма total — 334 850\"\nassert int(per_cust.loc[per_cust['customer_id'] == 1, 'orders'].iloc[0]) == int((_cl['customer_id'] == 1).sum()), \"Число заказов клиента 1 неверно\""
    }
   },
   {
    "title": "Накопленная выручка",
    "prompt": "<p>Данные для линии «Выручка с начала года»: из месячной выручки по чистым заказам запишите накопленную сумму в Series <code>cum</code> (индекс — месяц <code>'YYYY-MM'</code> по возрастанию). Последнее значение — общая выручка за полгода.</p>",
    "hints": [
     "Сначала сумма по месяцам (<code>monthly</code> из урока), затем <code>.cumsum()</code>."
    ],
    "check": {
     "tests": "assert 'cum' in globals() and getattr(cum, 'ndim', 0) == 1, \"cum должна быть pandas Series\"\nassert [str(i) for i in cum.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], \"Индекс: 2024-01 … 2024-06\"\nassert [float(v) for v in cum.values] == [31950.0, 98600.0, 188250.0, 254250.0, 302950.0, 334850.0], f\"Накопленная сумма: 31 950, 98 600, …, 334 850; у вас {list(cum.values)}\""
    }
   },
   {
    "title": "Тепловая карта по дням недели",
    "prompt": "<p>Широкая таблица для <code>sns.heatmap</code>: запишите число чистых заказов в DataFrame <code>heat</code>: строки — город (<code>city</code>), столбцы — день недели <code>0</code>–<code>6</code> (<code>pd.to_datetime(...).dt.dayofweek</code>, 0 — понедельник), значения — число заказов. Ячейка без заказов должна быть 0 (не NaN).</p>",
    "hints": [
     "<code>m['dow'] = pd.to_datetime(m['order_date']).dt.dayofweek</code>",
     "<code>m.pivot_table(index='city', columns='dow', values='id', aggfunc='count', fill_value=0)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\n_cu = _pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n_m = _cl.merge(_cu, on='customer_id')\n_m = _m.assign(dow=_pd.to_datetime(_m['order_date']).dt.dayofweek)\nassert 'heat' in globals() and getattr(heat, 'ndim', 0) == 2, \"heat должен быть DataFrame\"\nassert sorted(heat.index) == sorted(_m['city'].unique()) and sorted(int(c) for c in heat.columns) == sorted(_m['dow'].unique().tolist()), \"Строки — города, столбцы — дни недели\"\nassert not heat.isna().any().any(), \"Пустая ячейка должна быть 0, а не NaN: fill_value=0\"\nassert int(heat.values.sum()) == 139, f\"Сумма всех ячеек должна быть 139 заказов, у вас {int(heat.values.sum())}\"\nassert all(int(heat.loc[c, d]) == int(((_m['city'] == c) & (_m['dow'] == d)).sum()) for c in heat.index for d in heat.columns), \"Значения должны быть числом заказов (aggfunc='count')\""
    }
   },
   {
    "title": "Топ-5 и «остальные»",
    "prompt": "<p>На bar chart 40 столбцов не читаются. По чистым заказам оставьте 5 клиентов, потративших больше всех, а остальных соберите в одну строку: индекс Series <code>top</code> — номер клиента текстом (<code>'33'</code>), последняя строка <code>'other'</code>; значения — суммы. Пятёрка идёт по убыванию суммы, при равенстве первым меньший <code>customer_id</code>.</p>",
    "hints": [
     "Сумма каждого клиента, затем <code>sort_values(['amount', 'customer_id'], ascending=[False, True])</code>.",
     "Пятёрка: <code>.head(5)</code>; остальные: сумма <code>.iloc[5:]</code>. Индекс переведите в текст через <code>astype(str)</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\n_p = _cl.groupby('customer_id')['amount'].sum().reset_index().sort_values(['amount', 'customer_id'], ascending=[False, True])\nassert 'top' in globals() and getattr(top, 'ndim', 0) == 1 and len(top) == 6, \"top — Series из 6 строк (5 клиентов + other)\"\nassert [str(i) for i in top.index] == [str(x) for x in _p['customer_id'].head(5)] + ['other'], f\"Индекс: {[str(x) for x in _p['customer_id'].head(5)] + ['other']}, у вас {list(top.index)}\"\nassert [float(v) for v in top.values[:5]] == [float(x) for x in _p['amount'].head(5)], \"Суммы пятёрки неверны\"\nassert float(top.sum()) == 334850.0, \"Сумма всех строк должна равняться общей выручке (334 850)\""
    }
   }
  ]
 }
} });
