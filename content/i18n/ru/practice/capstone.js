// capstone practice tasks: Russian text. Code, solutions and checks are in content/practice/capstone.js.
DJ.i18n.patch({ lessons: {
 "cap-2": {
  "pr": [
   {
    "title": "Подсчёт по статусам",
    "prompt": "<p>Какие статусы есть в таблице <code>orders</code> и сколько заказов в каждом? <code>status</code>, <code>n</code>.</p>",
    "hints": [
     "<code>GROUP BY status</code>"
    ]
   },
   {
    "title": "Профиль клиентов",
    "prompt": "<p>По таблице <code>customers</code> в одной строке: <code>n</code> (количество клиентов), <code>first_signup</code>, <code>last_signup</code> (самая ранняя и самая поздняя дата регистрации).</p>",
    "hints": [
     "<code>MIN(signup_date)</code>, <code>MAX(signup_date)</code>"
    ]
   },
   {
    "title": "Заказы без суммы",
    "prompt": "<p>Выведите заказы с пустой суммой (<code>NULL</code>): <code>id</code>, <code>customer_id</code>, <code>order_date</code>. По порядку <code>id</code>.</p>",
    "hints": [
     "<code>WHERE amount IS NULL ORDER BY id</code>"
    ]
   },
   {
    "title": "Самые маленькие заказы",
    "prompt": "<p>3 заказа с наименьшей суммой (без пустых сумм): <code>id</code>, <code>customer_id</code>, <code>amount</code>. По возрастанию суммы, при равенстве — по <code>id</code>. Могут ли эти заказы тоже быть выбросами?</p>",
    "hints": [
     "<code>ORDER BY amount, id LIMIT 3</code>"
    ]
   },
   {
    "title": "Комбинации города и канала",
    "prompt": "<p>Проверка категориальных столбцов: сколько клиентов в таблице <code>customers</code> в каждой комбинации города и канала? <code>city</code>, <code>channel</code>, <code>n</code>. Сначала по городу, потом по каналу.</p>",
    "hints": [
     "<code>GROUP BY city, channel</code>"
    ]
   },
   {
    "title": "Проверка дубликатов",
    "prompt": "<p>Выведите в одной строке: <code>n</code> (количество заказов), <code>uniq_ids</code> (уникальные <code>id</code>), <code>uniq_customers</code> (уникальные клиенты, сделавшие заказ). Совпадают ли <code>n</code> и <code>uniq_ids</code>?</p>",
    "hints": [
     "<code>COUNT(DISTINCT id)</code>, <code>COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "Профиль по месяцам",
    "prompt": "<p>«Здоровье» каждого месяца: <code>month</code> (<code>order_date</code>, часть YYYY-MM), <code>n</code>, <code>null_amount</code>, <code>refunds</code>. По порядку месяцев. В каких месяцах сконцентрированы пустые суммы?</p>",
    "hints": [
     "<code>SUM(amount IS NULL)</code>, <code>SUM(status = 'refund')</code>, <code>GROUP BY month</code>."
    ]
   },
   {
    "title": "Слишком далеко от среднего",
    "prompt": "<p>Найдите заказы, сумма которых больше чем в 3 раза выше средней суммы всех заказов: <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>. Среднюю посчитайте подзапросом.</p>",
    "hints": [
     "<code>WHERE amount &gt; 3 * (SELECT AVG(amount) FROM orders)</code>"
    ]
   }
  ]
 },
 "cap-3": {
  "pr": [
   {
    "title": "Количество оплаченных заказов",
    "prompt": "<p>Выведите количество заказов со статусом <code>status = 'paid'</code> одним значением <code>paid</code>.</p>",
    "hints": [
     "<code>WHERE status = 'paid'</code>"
    ]
   },
   {
    "title": "Возвраты",
    "prompt": "<p>Возвращённые заказы (<code>refund</code>): в одной строке <code>refunds</code> (количество) и <code>refund_sum</code> (сумма).</p>",
    "hints": [
     "<code>WHERE status = 'refund'</code>"
    ]
   },
   {
    "title": "Корпоративные заказы",
    "prompt": "<p>Крупные заказы, которые рассматриваются отдельно от анализа (<code>amount &gt;= 20000</code>): <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>.</p>",
    "hints": [
     "<code>WHERE amount &gt;= 20000</code>"
    ]
   },
   {
    "title": "Отчёт об отброшенных строках",
    "prompt": "<p>Для memo выведите в одной строке: <code>total</code> (все заказы), <code>clean_orders</code> (чистые заказы) и <code>removed</code> (отброшенные). Используйте CTE <code>clean</code> (правила из cap-3).</p>",
    "hints": [
     "Каждое значение посчитайте подзапросом: <code>(SELECT COUNT(*) FROM clean)</code>."
    ]
   },
   {
    "title": "Причины отбрасывания",
    "prompt": "<p>Посчитайте заказы, которых нет в чистых данных, по причинам: <code>reason</code>, <code>n</code>. Причина определяется через CASE, проверка идёт в таком порядке: <code>status = 'refund'</code> → <code>refund</code>; сумма пустая → <code>сома жоқ</code>; сумма ≥ 20000 → <code>корпоративтік</code>.</p>",
    "hints": [
     "Нечистые строки: <code>WHERE NOT (status = 'paid' AND amount IS NOT NULL AND amount &lt; 20000)</code>.",
     "Для выражения CASE задайте <code>AS reason</code>, затем <code>GROUP BY reason</code>."
    ]
   },
   {
    "title": "До и после очистки",
    "prompt": "<p>Как корпоративный заказ влияет на средний чек? В одной строке: <code>raw_avg</code> (среднее всех <code>paid</code> заказов с суммой) и <code>clean_avg</code> (среднее чистых заказов), оба округлить до целого через <code>ROUND</code>.</p>",
    "hints": [
     "Два подзапроса: один из <code>orders</code>, другой из <code>clean</code>."
    ]
   },
   {
    "title": "Влияние очистки на выручку",
    "prompt": "<p>В одной строке: <code>revenue_paid</code> (сумма всех оплаченных <code>paid</code> заказов), <code>revenue_clean</code> (сумма чистых заказов) и <code>diff_pct</code> — на сколько процентов очистка уменьшила выручку (с одним знаком после запятой).</p>",
    "hints": [
     "Во втором CTE посчитайте две суммы, а процент найдите снаружи.",
     "<code>SUM</code> сам пропускает пустые значения."
    ]
   },
   {
    "title": "Клиенты, на которых повлияла очистка",
    "prompt": "<p>Клиенты, у которых при очистке был удалён хотя бы один заказ: <code>customer_id</code>, <code>all_orders</code> (все их заказы), <code>clean_orders</code> (их чистые заказы). Сортировка по <code>customer_id</code>.</p>",
    "hints": [
     "<code>orders o LEFT JOIN clean c ON c.id = o.id</code>: в нечистой строке <code>c.id</code> пуст.",
     "<code>COUNT(c.id)</code> считает только чистые строки; <code>HAVING COUNT(*) &gt; COUNT(c.id)</code>."
    ]
   }
  ]
 },
 "cap-4": {
  "pr": [
   {
    "title": "Заказы по месяцам",
    "prompt": "<p>Количество заказов в каждом месяце по чистым заказам: <code>month</code>, <code>orders</code>. По порядку месяцев.</p>",
    "hints": [
     "Используйте CTE <code>clean</code> (правила из cap-3).",
     "<code>substr(order_date, 1, 7)</code>"
    ]
   },
   {
    "title": "Выручка по месяцам",
    "prompt": "<p>Выручка каждого месяца по чистым заказам: <code>month</code>, <code>revenue</code>. По порядку месяцев.</p>",
    "hints": [
     "Используйте CTE <code>clean</code> (правила из cap-3)."
    ]
   },
   {
    "title": "Активные клиенты по месяцам",
    "prompt": "<p>Уникальные клиенты, которые сделали хотя бы один чистый заказ в каждом месяце: <code>month</code>, <code>customers</code>. По порядку месяцев.</p>",
    "hints": [
     "<code>COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "Заказов на одного клиента",
    "prompt": "<p>Как часто приходят клиенты? Для каждого месяца <code>month</code> и <code>orders_per_customer</code> (заказы / уникальные клиенты, с двумя знаками после запятой). По порядку месяцев.</p>",
    "hints": [
     "<code>COUNT(*) * 1.0 / COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "MoM рост чистой выручки",
    "prompt": "<p>Изменение чистой выручки от месяца к месяцу: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (с одним знаком после запятой). По порядку месяцев.</p>",
    "hints": [
     "Второй CTE: выручка по месяцам.",
     "<code>LAG(revenue) OVER (ORDER BY month)</code>"
    ]
   },
   {
    "title": "Новые клиенты месяца",
    "prompt": "<p>Сколько клиентов в каждом месяце сделали <b>первый</b> чистый заказ? <code>month</code>, <code>new_customers</code>. По порядку месяцев.</p>",
    "hints": [
     "Сначала найдите первый чистый заказ каждого клиента: <code>MIN(order_date)</code>.",
     "Затем сгруппируйте по его месяцу."
    ]
   },
   {
    "title": "Новые и вернувшиеся клиенты",
    "prompt": "<p>Разделите активных клиентов каждого месяца на два типа: <code>month</code>, <code>active</code> (уникальные клиенты), <code>new_customers</code> (те, кто сделал первый чистый заказ в этом месяце), <code>returning_customers</code> (<code>active − new_customers</code>). По порядку месяцев.</p>",
    "hints": [
     "CTE <code>f</code>: первый месяц каждого клиента. CTE <code>a</code>: уникальные пары (месяц, клиент).",
     "<code>SUM(f.first_month = a.month)</code> считает новых."
    ]
   },
   {
    "title": "Разложение выручки на множители",
    "prompt": "<p>Выручка = клиенты × заказов на одного клиента × средний чек. Чтобы увидеть, какой множитель менялся при изменении выручки, выведите по каждому месяцу: <code>month</code>, <code>customers</code>, <code>cust_mom_pct</code>, <code>aov</code> (до целого), <code>aov_mom_pct</code>. Проценты — изменение относительно прошлого месяца, с одним знаком после запятой. По порядку месяцев.</p>",
    "hints": [
     "В CTE возьмите помесячно <code>customers</code> и <code>AVG(amount)</code>.",
     "Для каждого показателя отдельно <code>LAG(...) OVER (ORDER BY month)</code>."
    ]
   }
  ]
 },
 "cap-5": {
  "pr": [
   {
    "title": "Клиенты по каналам",
    "prompt": "<p>Из таблицы <code>customers</code> выведите количество клиентов каждого канала: <code>channel</code>, <code>n</code>. По убыванию количества.</p>",
    "hints": [
     "<code>GROUP BY channel ORDER BY n DESC</code>"
    ]
   },
   {
    "title": "Клиенты по городам",
    "prompt": "<p>Сколько клиентов в каждом городе: <code>city</code>, <code>n</code>. По убыванию количества. Помните, что показатели маленького города нужно читать осторожно.</p>",
    "hints": [
     "<code>GROUP BY city ORDER BY n DESC</code>"
    ]
   },
   {
    "title": "Выручка по каналам",
    "prompt": "<p>Выручка каждого канала по чистым заказам: <code>channel</code>, <code>revenue</code>. По убыванию выручки.</p>",
    "hints": [
     "Используйте CTE <code>clean</code> (правила из cap-3).",
     "<code>customers c JOIN clean o ON o.customer_id = c.id</code>"
    ]
   },
   {
    "title": "Частота покупок по каналам",
    "prompt": "<p>Сколько чистых заказов в среднем делает клиент каждого канала? <code>channel</code>, <code>orders_per_customer</code> (с двумя знаками после запятой). По убыванию.</p>",
    "hints": [
     "<code>COUNT(o.id) * 1.0 / COUNT(DISTINCT c.id)</code>"
    ]
   },
   {
    "title": "Средний чек по каналам",
    "prompt": "<p>Средний чек каждого канала по чистым заказам: <code>channel</code>, <code>aov</code> (округлить до целого через <code>ROUND</code>). По убыванию.</p>",
    "hints": [
     "<code>ROUND(AVG(o.amount))</code>"
    ]
   },
   {
    "title": "Город и канал вместе",
    "prompt": "<p>Сегмент по двум измерениям: <code>city</code>, <code>channel</code>, <code>customers</code> (уникальные клиенты, сделавшие заказ), <code>revenue</code>. По убыванию выручки.</p>",
    "hints": [
     "<code>GROUP BY c.city, c.channel</code>"
    ]
   },
   {
    "title": "Доля выручки по каналам",
    "prompt": "<p>Доля каждого канала в чистой выручке: <code>channel</code>, <code>revenue</code>, <code>share_pct</code> (%, с одним знаком после запятой). По убыванию выручки.</p>",
    "hints": [
     "Общая выручка: <code>SUM(SUM(o.amount)) OVER ()</code>."
    ]
   },
   {
    "title": "Самый ценный канал в городе",
    "prompt": "<p>В каждом городе найдите канал с наибольшей выручкой на одного клиента (<code>rev_per_customer</code>, до целого): <code>city</code>, <code>channel</code>, <code>rev_per_customer</code>. По порядку городов.</p>",
    "hints": [
     "CTE: выручка на клиента по городу × каналу — <code>rev_per_customer</code>.",
     "<code>ROW_NUMBER() OVER (PARTITION BY city ORDER BY rev_per_customer DESC)</code>, в основном запросе <code>rn = 1</code>."
    ]
   }
  ]
 },
 "cap-6": {
  "pr": [
   {
    "title": "Самые частые клиенты",
    "prompt": "<p>5 клиентов с наибольшим числом чистых заказов: <code>customer_id</code>, <code>n</code>. По убыванию количества, при равенстве — по <code>customer_id</code>.</p>",
    "hints": [
     "<code>ORDER BY n DESC, customer_id LIMIT 5</code>"
    ]
   },
   {
    "title": "Общий repeat rate",
    "prompt": "<p>Среди клиентов, которые сделали хотя бы один чистый заказ, доля тех, у кого их не менее 3: <code>repeat_rate</code> (%, с одним знаком после запятой), одним значением.</p>",
    "hints": [
     "Два CTE: <code>clean</code> и <code>per</code>.",
     "<code>SUM(n &gt;= 3) * 100.0 / COUNT(*)</code>"
    ]
   },
   {
    "title": "Редкие клиенты",
    "prompt": "<p>Количество клиентов, у которых ровно 1 или 2 чистых заказа: <code>few</code>, одним значением.</p>",
    "hints": [
     "Из CTE <code>per</code> возьмите <code>WHERE n &lt;= 2</code>."
    ]
   },
   {
    "title": "Распределение числа заказов",
    "prompt": "<p>Сколько клиентов имеют 1, 2, 3, ... чистых заказов? <code>n</code> (количество заказов), <code>customers</code> (клиенты). По порядку <code>n</code>.</p>",
    "hints": [
     "Сгруппируйте CTE <code>per</code> по <code>n</code>."
    ]
   },
   {
    "title": "Repeat rate по городам",
    "prompt": "<p>Repeat rate по городам: <code>city</code>, <code>customers</code>, <code>repeat_rate</code> (≥ 3 чистых заказа, %, с одним знаком после запятой). По убыванию.</p>",
    "hints": [
     "Запрос из урока, но <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Проверка порога",
    "prompt": "<p>Как порог влияет на результат? В одной строке три repeat rate (%, с одним знаком после запятой): <code>rate2</code> (≥ 2 заказа), <code>rate3</code> (≥ 3), <code>rate4</code> (≥ 4).</p>",
    "hints": [
     "Посчитайте три столбца из одного CTE <code>per</code>."
    ]
   },
   {
    "title": "Repeat rate по когортам",
    "prompt": "<p>По месяцу регистрации: <code>cohort</code> (часть YYYY-MM из <code>signup_date</code>), <code>customers</code>, <code>repeat_rate</code> (≥ 3 чистых заказа, %, с одним знаком после запятой). По порядку когорт. Почему у поздно зарегистрированных показатель может быть ниже?</p>",
    "hints": [
     "<code>substr(c.signup_date, 1, 7) AS cohort</code>, <code>GROUP BY cohort</code>."
    ]
   },
   {
    "title": "Выручка повторных клиентов",
    "prompt": "<p>Какой процент чистой выручки приносят клиенты, у которых не менее 3 чистых заказов? <code>repeat_revenue_pct</code> (с одним знаком после запятой), одним значением.</p>",
    "hints": [
     "Соедините <code>clean</code> и <code>per</code> через JOIN.",
     "Условная сумма: <code>SUM(CASE WHEN p.n &gt;= 3 THEN o.amount END)</code>."
    ]
   }
  ]
 },
 "cap-7": {
  "pr": [
   {
    "title": "ROAS одного канала",
    "prompt": "<p>Функция <code>roas(revenue, spend)</code> должна возвращать ROAS (выручка / расходы), округлённый до 2 знаков после запятой (<code>round</code>). Например, <code>roas(120000, 40000)</code> → <code>3.0</code>.</p>",
    "hints": [
     "<code>round(revenue / spend, 2)</code>"
    ],
    "check": {
     "tests": "assert roas(120000, 40000) == 3.0, \"roas(120000, 40000) должно быть 3.0\"\nassert roas(410000, 300000) == 1.37, \"roas(410000, 300000) должно быть 1.37\""
    }
   },
   {
    "title": "Каналы, которые не окупают расходы",
    "prompt": "<p>Функция <code>losing(revenue, spend)</code> должна возвращать список названий каналов с ROAS ниже 1 в алфавитном порядке (<code>sorted</code>).</p>",
    "hints": [
     "<code>revenue[ch] / spend[ch] &lt; 1</code>"
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\nassert losing(_rev, _sp) == [\"2gis\", \"instagram\"], f\"Ожидалось ['2gis', 'instagram'], у вас {losing(_rev, _sp)}\"\nassert losing({\"a\": 10}, {\"a\": 5}) == [], \"Если все каналы эффективны, пустой список\""
    }
   },
   {
    "title": "Общий ROAS",
    "prompt": "<p>Функция <code>total_roas(revenue, spend)</code> должна возвращать общий ROAS всех каналов: сумма выручек / сумма расходов, до 2 знаков после запятой.</p>",
    "hints": [
     "<code>sum(revenue.values())</code>"
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\nassert total_roas(_rev, _sp) == 0.75, f\"Ожидалось 0.75, у вас {total_roas(_rev, _sp)}\""
    }
   },
   {
    "title": "Прибыль с учётом маржи",
    "prompt": "<p>ROAS не показывает прибыль. Функция <code>profit(revenue, spend, margin)</code> должна возвращать словарь прибыли по каждому каналу: <code>revenue × margin − spend</code>, округлённая до целого через <code>round</code>. Например, при марже 0.4, выручке 120 000 ₸ и расходах 40 000 ₸ → <code>8000</code>.</p>",
    "hints": [
     "Словарное включение: <code>{ch: ... for ch in spend}</code>."
    ],
    "check": {
     "tests": "_r = profit({\"referral\": 120000, \"2gis\": 400000}, {\"referral\": 40000, \"2gis\": 150000}, 0.4)\nassert _r == {\"referral\": 8000, \"2gis\": 10000}, f\"Ожидалось {'referral': 8000, '2gis': 10000}, у вас {_r}\""
    }
   },
   {
    "title": "Доли бюджета",
    "prompt": "<p>Функция <code>budget_shares(spend)</code> должна возвращать словарь: доля каждого канала в общем бюджете в процентах (1 знак после запятой).</p>",
    "hints": [
     "Сначала <code>total = sum(spend.values())</code>."
    ],
    "check": {
     "tests": "_r = budget_shares({\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000})\nassert _r == {\"instagram\": 61.2, \"2gis\": 30.6, \"referral\": 8.2}, f\"Нет верного результата: {_r}\""
    }
   },
   {
    "title": "Канал без выручки",
    "prompt": "<p>По некоторому каналу выручки могло ещё не быть. Функция <code>roas_safe(revenue, spend)</code> должна возвращать словарь ROAS для каждого канала из <code>spend</code> (2 знака после запятой); ROAS канала, которого нет в <code>revenue</code>, равен <code>0.0</code>.</p>",
    "hints": [
     "<code>revenue.get(ch, 0)</code>"
    ],
    "check": {
     "tests": "_r = roas_safe({\"instagram\": 150000}, {\"instagram\": 300000, \"tiktok\": 50000})\nassert _r == {\"instagram\": 0.5, \"tiktok\": 0.0}, f\"Ожидалось {'instagram': 0.5, 'tiktok': 0.0}, у вас {_r}\""
    }
   },
   {
    "title": "Перераспределение бюджета",
    "prompt": "<p>Функция <code>reallocate(revenue, spend, pct)</code> должна взять <code>pct</code> процентов бюджета канала с наименьшим ROAS и добавить его каналу с наибольшим ROAS, и вернуть <b>новый</b> словарь бюджета (целые числа, <code>round</code>). Исходный <code>spend</code> не должен меняться.</p>",
    "hints": [
     "Наименьший/наибольший: <code>min(r, key=...)</code>, <code>max(r, key=...)</code>.",
     "Копия: <code>new = dict(spend)</code>."
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\n_r = reallocate(_rev, _sp, 20)\nassert _r == {\"instagram\": 240000, \"2gis\": 150000, \"referral\": 100000}, f\"Из Instagram 60 000 должно уйти в referral, у вас {_r}\"\nassert _sp == {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}, \"Не меняйте исходный словарь spend\""
    }
   },
   {
    "title": "Список прибыли и расходов",
    "prompt": "<p>Функция <code>roas_report(revenue, spend, margin)</code> должна возвращать список кортежей <code>(арна, roas, мәртебе)</code>, отсортированный по ROAS по убыванию. ROAS — 2 знака после запятой. Статус: если <code>revenue × margin &gt; spend</code>, то <code>\"пайда\"</code>, иначе <code>\"шығын\"</code>. Обратите внимание: даже если ROAS выше 1, может быть убыток.</p>",
    "hints": [
     "Для каждого канала создайте кортеж и добавьте его в список.",
     "<code>sorted(rows, key=lambda r: r[1], reverse=True)</code>"
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\n_r = roas_report(_rev, _sp, 0.6)\nassert _r == [(\"referral\", 1.98, \"пайда\"), (\"2gis\", 0.93, \"шығын\"), (\"instagram\", 0.5, \"шығын\")], f\"Результат неверен: {_r}\"\nassert roas_report({\"a\": 150}, {\"a\": 100}, 0.4) == [(\"a\", 1.5, \"шығын\")], \"ROAS 1.5, но если маржа 40%, то убыток\""
    }
   }
  ]
 },
 "cap-9": {
  "pr": [
   {
    "title": "Дата первого заказа",
    "prompt": "<p>Дата первого заказа каждого клиента (любой статус): <code>customer_id</code>, <code>first_order</code>. По порядку <code>customer_id</code>.</p>",
    "hints": [
     "<code>MIN(order_date)</code>, <code>GROUP BY customer_id</code>"
    ]
   },
   {
    "title": "Второй по величине чек",
    "prompt": "<p>Выведите второе по величине (уникальное) значение суммы среди чистых заказов: <code>second_amount</code>.</p>",
    "hints": [
     "Классический шаблон: максимум из значений, меньших <code>MAX</code>, — это <code>MAX</code>."
    ]
   },
   {
    "title": "Клиенты без возвратов",
    "prompt": "<p>Выведите количество клиентов, у которых нет ни одного заказа со статусом <code>refund</code>: <code>n</code>. Используйте <code>NOT EXISTS</code>.</p>",
    "hints": [
     "<code>NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'refund')</code>"
    ]
   },
   {
    "title": "Третий заказ",
    "prompt": "<p>Дата <b>третьего</b> заказа клиентов, у которых не менее трёх заказов (любой статус): <code>customer_id</code>, <code>third_order</code>.</p>",
    "hints": [
     "Шаблон «второго заказа», но <code>rn = 3</code>."
    ]
   },
   {
    "title": "Есть в марте, нет в апреле",
    "prompt": "<p>Клиенты, которые сделали хотя бы один чистый заказ в марте (<code>2024-03</code>) и ни одного чистого заказа в апреле (<code>2024-04</code>): <code>customer_id</code>, по возрастанию.</p>",
    "hints": [
     "Используйте CTE <code>clean</code> дважды: во внешнем запросе и внутри <code>NOT EXISTS</code>."
    ]
   },
   {
    "title": "Самый крупный чек клиента",
    "prompt": "<p>Самый крупный чистый заказ каждого клиента: <code>customer_id</code>, <code>order_date</code>, <code>amount</code>. Одна строка на клиента (при равенстве — более ранний заказ). По порядку <code>customer_id</code>.</p>",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY amount DESC, order_date)</code>"
    ]
   },
   {
    "title": "Топ-2 клиента в канале",
    "prompt": "<p>В каждом канале 2 клиента с наибольшим числом чистых заказов: <code>channel</code>, <code>customer_id</code>, <code>orders</code>. При равенстве выше идёт меньший <code>customer_id</code> (<code>ROW_NUMBER</code>). Отсортируйте по каналу, затем по месту.</p>",
    "hints": [
     "CTE: число заказов по каналу × клиенту.",
     "<code>ROW_NUMBER() OVER (PARTITION BY channel ORDER BY orders DESC, customer_id)</code>, в основном запросе <code>rn &lt;= 2</code>."
    ]
   },
   {
    "title": "Клиенты, пришедшие три месяца подряд",
    "prompt": "<p>Клиенты, у которых есть хотя бы один чистый заказ в <b>каждом</b> из месяцев март, апрель и май (<code>2024-03</code>, <code>2024-04</code>, <code>2024-05</code>): <code>customer_id</code>, по возрастанию.</p>",
    "hints": [
     "Отфильтруйте заказы трёх месяцев и сгруппируйте по клиенту.",
     "<code>HAVING COUNT(DISTINCT substr(order_date, 1, 7)) = 3</code>"
    ]
   }
  ]
 }
} });
