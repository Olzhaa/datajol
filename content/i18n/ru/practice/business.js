// business practice tasks: Russian text. Code, solutions and checks are in content/practice/business.js.
DJ.i18n.patch({ lessons: {
 "ba-2": {
  "pr": [
   {
    "title": "Общая выручка",
    "prompt": "<p>Из таблицы <code>payments</code> выведите в одной строке общую выручку за весь период <code>revenue</code> и количество платежей <code>n_payments</code>.</p>",
    "hints": [
     "<code>SUM(amount)</code>, <code>COUNT(*)</code>"
    ]
   },
   {
    "title": "Сумма каждого заказа",
    "prompt": "<p>Первый шаг для AOV: сумма каждого заказа <code>delivered</code>. Выведите <code>id</code>, <code>total</code> (сумма <code>quantity × price</code>), по убыванию суммы.</p>",
    "hints": [
     "Соедините три таблицы через JOIN и добавьте <code>GROUP BY o.id</code>."
    ]
   },
   {
    "title": "Средний платёж",
    "prompt": "<p>По таблице <code>payments</code> выведите средний размер одного платежа <code>avg_payment</code> (округлить до целого через <code>ROUND</code>).</p>",
    "hints": [
     "<code>ROUND(AVG(amount))</code>"
    ]
   },
   {
    "title": "Ежемесячный ARPU",
    "prompt": "<p>ARPU = выручка / <b>все</b> активные пользователи. Для каждого месяца выведите <code>month</code>, <code>revenue</code> (<code>payments</code>), <code>active</code> (уникальные пользователи из <code>activity</code>) и <code>arpu</code> (с одним знаком после запятой). По порядку месяцев.</p>",
    "hints": [
     "Два CTE: ежемесячная выручка и ежемесячная активность.",
     "Соедините их JOIN по <code>month</code>."
    ]
   },
   {
    "title": "Доля платящих",
    "prompt": "<p>Какой процент активных пользователей платил в каждом месяце? <code>month</code>, <code>active</code>, <code>payers</code>, <code>payer_pct</code> (с одним знаком после запятой). По порядку месяцев.</p>",
    "hints": [
     "<code>ROUND(100.0 * p.payers / a.active, 1)</code>"
    ]
   },
   {
    "title": "Средний чек клиента",
    "prompt": "<p>По доставленным заказам <code>delivered</code> каждого клиента: <code>name</code>, <code>orders</code> (количество заказов), <code>aov</code> (средний чек). Сортировка по <code>aov</code>, по убыванию.</p>",
    "hints": [
     "Сначала сумма на уровне заказа (CTE), затем <code>AVG</code> по клиенту.",
     "Если сделать строками <code>AVG(quantity * price)</code>, получится средняя по товарам, а не по заказам."
    ]
   },
   {
    "title": "AOV по городам",
    "prompt": "<p>Средний чек каждого города по доставленным заказам: <code>city</code>, <code>orders</code>, <code>aov</code> (округлить до целого через <code>ROUND</code>). Сортировка по <code>aov</code>, по убыванию.</p>",
    "hints": [
     "В CTE возьмите сумму заказа и <code>customer_id</code>.",
     "Затем JOIN с <code>customers</code> и <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "ARPU и ARPPU рядом",
    "prompt": "<p>Для каждого месяца выведите <code>month</code>, <code>arpu</code> (выручка / активные пользователи) и <code>arppu</code> (выручка / платящие пользователи), оба с округлением до одного знака после запятой. По порядку месяцев. От чего зависит разница между ними?</p>",
    "hints": [
     "В одном CTE — выручка и платящие, в другом — активные."
    ]
   }
  ]
 },
 "ba-3": {
  "pr": [
   {
    "title": "Дошедшие до корзины",
    "prompt": "<p>В таблице <code>events</code> выведите количество уникальных пользователей, которые дошли до шага <code>cart</code>: <code>cart_users</code>.</p>",
    "hints": [
     "<code>WHERE step = 'cart'</code> и <code>COUNT(DISTINCT user_id)</code>."
    ]
   },
   {
    "title": "Общая конверсия",
    "prompt": "<p>Какой процент посетителей сайта совершил покупку? Выведите одним значением <code>conversion</code> (с одним знаком после запятой): <code>purchase</code> / <code>visit</code> × 100.</p>",
    "hints": [
     "<code>COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END)</code>"
    ]
   },
   {
    "title": "Канал тех, кто купил",
    "prompt": "<p>Выведите пользователей, которые дошли до шага <code>purchase</code>: <code>id</code>, <code>channel</code>. По порядку <code>id</code>.</p>",
    "hints": [
     "Соедините <code>users</code> и <code>events</code> через JOIN."
    ]
   },
   {
    "title": "Конверсии по шагам",
    "prompt": "<p>Выведите в одной строке: <code>visit</code>, <code>cart</code>, <code>purchase</code> (уникальные пользователи), <code>cart_rate</code> (cart / visit, %) и <code>purchase_rate</code> (purchase / cart, %); проценты с одним знаком после запятой.</p>",
    "hints": [
     "Сначала в CTE посчитайте три числа (как в уроке).",
     "Затем в основном запросе вычислите проценты."
    ]
   },
   {
    "title": "Воронка по месяцу регистрации",
    "prompt": "<p>Воронка по месяцу регистрации: <code>signup_month</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code>. По порядку месяцев.</p>",
    "hints": [
     "Запрос из урока, но <code>GROUP BY u.signup_month</code>."
    ]
   },
   {
    "title": "Остановившиеся в корзине",
    "prompt": "<p>Пользователи, которые положили товар в корзину (<code>cart</code>), но не купили (<code>purchase</code> нет): <code>user_id</code>, по возрастанию.</p>",
    "hints": [
     "<code>NOT EXISTS (SELECT 1 FROM events p WHERE p.user_id = e.user_id AND p.step = 'purchase')</code>"
    ]
   },
   {
    "title": "Конверсия по каналам",
    "prompt": "<p>Общая конверсия по каналам: <code>channel</code>, <code>visit</code>, <code>purchase</code>, <code>conv_pct</code> (purchase / visit × 100, с одним знаком после запятой). Сортировка по <code>conv_pct</code>, по убыванию; при равенстве — по названию канала.</p>",
    "hints": [
     "В CTE — воронка по каналам, снаружи — процент."
    ]
   },
   {
    "title": "Самый слабый шаг",
    "prompt": "<p>На каком шаге воронки потери в процентах самые большие? Посчитайте конверсию каждого шага от предыдущего (<code>cart</code>: cart / visit, <code>purchase</code>: purchase / cart) и выведите одной строкой наименьшую: <code>step</code>, <code>rate</code> (%, с одним знаком после запятой). Используйте <code>UNION ALL</code>.</p>",
    "hints": [
     "Первый CTE: количества воронки. Второй CTE: две строки через <code>UNION ALL</code>.",
     "<code>ORDER BY rate LIMIT 1</code>"
    ]
   }
  ]
 },
 "ba-4": {
  "pr": [
   {
    "title": "Доля оттока",
    "prompt": "<p>Функция <code>churn_rate(start, lost)</code> должна возвращать отток как долю: клиенты на начало месяца <code>start</code>, ушедшие в следующем месяце <code>lost</code>. Например, <code>churn_rate(200, 30)</code> → <code>0.15</code>.</p>",
    "hints": [
     "<code>lost / start</code>"
    ],
    "check": {
     "tests": "assert abs(churn_rate(200, 30) - 0.15) < 1e-9, \"churn_rate(200, 30) должно быть 0.15\"\nassert churn_rate(50, 0) == 0, \"Если никто не ушёл: 0\"\nassert abs(churn_rate(8, 2) - 0.25) < 1e-9, \"churn_rate(8, 2) должно быть 0.25\""
    }
   },
   {
    "title": "Продолжительность жизни клиента",
    "prompt": "<p>Функция <code>lifetime(churn)</code> должна возвращать среднюю продолжительность жизни клиента в месяцах: <code>1 / churn</code>. Например, <code>lifetime(0.1)</code> → <code>10.0</code>.</p>",
    "hints": [
     "<code>1 / churn</code>"
    ],
    "check": {
     "tests": "assert abs(lifetime(0.1) - 10) < 1e-9, \"lifetime(0.1) должно быть 10\"\nassert abs(lifetime(0.25) - 4) < 1e-9, \"lifetime(0.25) должно быть 4\""
    }
   },
   {
    "title": "Размеры когорт",
    "prompt": "<p>Сколько пользователей пришло в каждом месяце регистрации? <code>signup_month</code>, <code>users</code>. По порядку месяцев.</p>",
    "hints": [
     "<code>GROUP BY signup_month ORDER BY signup_month</code>"
    ]
   },
   {
    "title": "Кривая retention",
    "prompt": "<p>Функция <code>retention_curve(counts)</code> должна переводить количество активных в когорте в каждом месяце (<code>counts[0]</code> — размер когорты) в проценты, с округлением до 1 знака после запятой (<code>round</code>). Например, <code>retention_curve([200, 90, 64])</code> → <code>[100.0, 45.0, 32.0]</code>.</p>",
    "hints": [
     "Разделите каждое число на <code>counts[0]</code> и умножьте на 100."
    ],
    "check": {
     "tests": "assert retention_curve([200, 90, 64]) == [100.0, 45.0, 32.0], \"retention_curve([200, 90, 64]) должно быть [100.0, 45.0, 32.0]\"\nassert retention_curve([3, 2, 1]) == [100.0, 66.7, 33.3], \"retention_curve([3, 2, 1]) должно быть [100.0, 66.7, 33.3]\""
    }
   },
   {
    "title": "Не вернувшиеся в сентябре",
    "prompt": "<p>Пользователи, которые были активны в августе (<code>2024-08</code>), но не были активны в сентябре (<code>2024-09</code>): <code>user_id</code>, по возрастанию.</p>",
    "hints": [
     "В <code>NOT EXISTS</code> условие <code>b.month = '2024-09'</code>."
    ]
   },
   {
    "title": "Правильный подсчёт оттока",
    "prompt": "<p>Функция <code>churn_from_sets(start_ids, next_ids)</code> должна получать два множества: активные в начале месяца и активные в следующем месяце. Отток — доля тех из начальных, кого нет в следующем месяце (с округлением до 2 знаков после запятой <code>round</code>). Новички следующего месяца в расчёт <b>не входят</b>.</p><p>Например, <code>churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10})</code> → <code>0.5</code>.</p>",
    "hints": [
     "Ушедшие: <code>start_ids - next_ids</code> (разность множеств).",
     "Знаменатель — <code>len(start_ids)</code>."
    ],
    "check": {
     "tests": "assert churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10}) == 0.5, \"churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10}) должно быть 0.5\"\nassert churn_from_sets({1, 2, 3}, {1, 2, 3, 4, 5, 6}) == 0, \"Никто не ушёл: новички не уменьшают отток, 0\"\nassert churn_from_sets({1, 2, 3}, {7}) == 1, \"Ушли все: 1\""
    }
   },
   {
    "title": "Отток с августа на сентябрь",
    "prompt": "<p>Выведите в одной строке: <code>active_aug</code> (активные в августе), <code>lost</code> (из них не активные в сентябре), <code>churn_pct</code> (lost / active_aug × 100, с одним знаком после запятой). В знаменатель входят только активные в августе.</p>",
    "hints": [
     "CTE: уникальные пользователи в августе.",
     "<code>SUM(NOT EXISTS (...))</code> считает ушедших."
    ]
   },
   {
    "title": "Таблица когортного retention",
    "prompt": "<p>Напишите функцию <code>cohort_retention(users, activity)</code>. <code>users</code> — <code>{user_id: тіркелу_айы}</code>, <code>activity</code> — список пар <code>(user_id, ай)</code> (месяцы в виде <code>\"2024-07\"</code>). Функция должна вернуть <code>{когорт: [пайыздар]}</code>: для каждого месяца из отсортированного списка всех месяцев в <code>activity</code>, начиная с месяца когорты, долю когорты, активной в этом месяце, в %, с одним знаком после запятой.</p>",
    "hints": [
     "Соберите активных пользователей каждого месяца в множество: <code>active[m]</code>.",
     "Пересечение участников когорты и активных в этом месяце: <code>members &amp; active[m]</code>."
    ],
    "check": {
     "tests": "_u = {1: \"2024-07\", 2: \"2024-07\", 3: \"2024-07\", 4: \"2024-07\", 5: \"2024-08\", 6: \"2024-08\", 7: \"2024-08\", 8: \"2024-08\", 9: \"2024-08\", 10: \"2024-09\", 11: \"2024-09\", 12: \"2024-09\"}\n_a = [(1, \"2024-07\"), (2, \"2024-07\"), (3, \"2024-07\"), (4, \"2024-07\"), (1, \"2024-08\"), (2, \"2024-08\"), (4, \"2024-08\"), (1, \"2024-09\"), (4, \"2024-09\"), (5, \"2024-08\"), (6, \"2024-08\"), (7, \"2024-08\"), (8, \"2024-08\"), (9, \"2024-08\"), (5, \"2024-09\"), (8, \"2024-09\"), (9, \"2024-09\"), (10, \"2024-09\"), (11, \"2024-09\"), (12, \"2024-09\")]\n_r = cohort_retention(_u, _a)\nassert _r == {\"2024-07\": [100.0, 75.0, 50.0], \"2024-08\": [100.0, 60.0], \"2024-09\": [100.0]}, f\"Результат неверен: {_r}\""
    }
   }
  ]
 },
 "ba-5": {
  "pr": [
   {
    "title": "Общие расходы на рекламу",
    "prompt": "<p>Из таблицы <code>ad_spend</code> выведите общие расходы на рекламу за весь период одним значением <code>total_spend</code>.</p>",
    "hints": [
     "<code>SUM(spend)</code>"
    ]
   },
   {
    "title": "Расходы по месяцам",
    "prompt": "<p>Сколько потратили на рекламу в каждом месяце? <code>month</code>, <code>spend</code>. По порядку месяцев.</p>",
    "hints": [
     "<code>GROUP BY month ORDER BY month</code>"
    ]
   },
   {
    "title": "Новые клиенты по каналам",
    "prompt": "<p>Сколько пользователей привёл каждый канал? <code>channel</code>, <code>users</code>. По убыванию количества, при равенстве — по названию канала.</p>",
    "hints": [
     "<code>ORDER BY users DESC, channel</code>"
    ]
   },
   {
    "title": "CAC платных каналов",
    "prompt": "<p>Органические клиенты искусственно снижают CAC. Выведите общий CAC только по платным каналам (каналам, которые есть в <code>ad_spend</code>) одним значением <code>cac</code> (с одним знаком после запятой): общие расходы / пользователи, пришедшие из этих каналов.</p>",
    "hints": [
     "Подзапрос: <code>SELECT COUNT(*) FROM users WHERE channel IN (SELECT channel FROM ad_spend)</code>."
    ]
   },
   {
    "title": "CAC по месяцам",
    "prompt": "<p>CAC канала <code>ads</code> по месяцам: <code>month</code>, <code>spend</code>, <code>new_users</code> (пользователи, зарегистрировавшиеся в этом месяце через <code>ads</code>), <code>cac</code>. По порядку месяцев.</p>",
    "hints": [
     "CTE: новые пользователи канала <code>ads</code> по месяцам.",
     "JOIN с <code>ad_spend</code> по <code>month</code>."
    ]
   },
   {
    "title": "Выручка, которую принёс канал",
    "prompt": "<p>Сколько заплатили пользователи каждого канала за весь период? <code>channel</code>, <code>revenue</code>. По убыванию выручки.</p>",
    "hints": [
     "Соедините <code>users</code> и <code>payments</code> через JOIN и <code>GROUP BY u.channel</code>."
    ]
   },
   {
    "title": "Сравнение выручки и CAC",
    "prompt": "<p>По платным каналам: <code>channel</code>, <code>cac</code> (расходы / пользователи), <code>rev_per_user</code> (выручка / пользователи) и <code>ratio</code> = rev_per_user / cac (с двумя знаками после запятой). Окупил ли каждый клиент свою стоимость?</p>",
    "hints": [
     "Три CTE: расходы, количество пользователей, выручка (всё по каналам).",
     "rev_per_user / cac = выручка / расходы."
    ]
   },
   {
    "title": "Месяцы окупаемости",
    "prompt": "<p>В данных 3 месяца. По платным каналам выведите <code>channel</code>, <code>cac</code>, <code>arpu_month</code> (выручка канала / пользователи / 3, с одним знаком после запятой) и <code>payback</code> = cac / (arpu_month × 0.5) (маржа 50%, в месяцах, с одним знаком после запятой). Сортировка по <code>payback</code>, по возрастанию.</p>",
    "hints": [
     "Добавьте к CTE из предыдущего задания ещё один: <code>cac</code> и месячный <code>arpu</code>.",
     "Окупаемость = CAC / (ARPU × маржа)."
    ]
   }
  ]
 },
 "ba-6": {
  "pr": [
   {
    "title": "Выручка предыдущего месяца",
    "prompt": "<p>По таблице <code>payments</code> выведите <code>month</code>, <code>revenue</code> и <code>prev_revenue</code> (выручка предыдущего месяца, <code>LAG</code>). По порядку месяцев.</p>",
    "hints": [
     "<code>LAG(revenue) OVER (ORDER BY month)</code>"
    ]
   },
   {
    "title": "Абсолютное изменение активных",
    "prompt": "<p>Вместе с процентами покажем и абсолютное количество. Для каждого месяца выведите <code>month</code>, <code>active</code> (<code>activity</code> — уникальные пользователи) и <code>diff</code> (разница с прошлым месяцем). По порядку месяцев.</p>",
    "hints": [
     "<code>active - LAG(active) OVER (ORDER BY month)</code>"
    ]
   },
   {
    "title": "Август и сентябрь",
    "prompt": "<p>По таблице <code>payments</code> в одной строке: <code>aug</code> (выручка августа), <code>sep</code> (выручка сентября), <code>growth_pct</code> (рост, %, с одним знаком после запятой). Используйте условную сумму.</p>",
    "hints": [
     "<code>SUM(CASE WHEN month = '2024-08' THEN amount END)</code>"
    ]
   },
   {
    "title": "Ежедневное изменение по регионам",
    "prompt": "<p>Для каждого региона: изменение дневной выручки относительно предыдущего дня: <code>region</code>, <code>day</code>, <code>revenue</code>, <code>change</code>. Сначала регион, потом день.</p>",
    "hints": [
     "<code>LAG(revenue) OVER (PARTITION BY region ORDER BY day)</code>"
    ]
   },
   {
    "title": "Изменение числа платящих (MoM)",
    "prompt": "<p>Как менялось число платящих от месяца к месяцу? <code>month</code>, <code>payers</code> (уникальные), <code>mom_pct</code> (с одним знаком после запятой). По порядку месяцев.</p>",
    "hints": [
     "Запрос MoM из урока, но вместо <code>revenue</code> возьмите <code>payers</code>."
    ]
   },
   {
    "title": "Полное 7-дневное среднее",
    "prompt": "<p>7-дневное скользящее среднее суточной выручки <code>ma7</code> (с одним знаком после запятой). Выведите только те дни, за которые набралось полных 7 дней (начиная с <code>2024-09-07</code>): <code>day</code>, <code>revenue</code>, <code>ma7</code>. По порядку дней.</p>",
    "hints": [
     "Для фильтрации результата окна нужен ещё один CTE.",
     "<code>AVG(revenue) OVER (ORDER BY day ROWS 6 PRECEDING)</code>"
    ]
   },
   {
    "title": "Месяц с лучшим ростом",
    "prompt": "<p>Выведите один месяц, в котором рост MoM по выручке (<code>payments</code>) был самым большим: <code>month</code>, <code>mom_pct</code> (с одним знаком после запятой).</p>",
    "hints": [
     "Два CTE: выручка по месяцам и MoM.",
     "У первого месяца <code>mom_pct</code> равен NULL: отфильтруйте его и выберите <code>ORDER BY mom_pct DESC LIMIT 1</code>."
    ]
   },
   {
    "title": "Доля региона в росте",
    "prompt": "<p>На сколько выросла выручка от первого дня периода до последнего и какая её часть пришлась на каждый регион? <code>region</code>, <code>growth</code> (последний день − первый день), <code>share_pct</code> (доля региона в общем росте, %, с одним знаком после запятой). Найдите первый и последний день через <code>MIN(day)</code> и <code>MAX(day)</code>.</p>",
    "hints": [
     "Условная сумма: <code>SUM(CASE WHEN day = (SELECT MAX(day) FROM daily_sales) THEN revenue END)</code>.",
     "Общий рост: <code>SUM(growth) OVER ()</code>."
    ]
   }
  ]
 },
 "ba-9": {
  "pr": [
   {
    "title": "Не покупали больше года",
    "prompt": "Только по заказам <code>delivered</code> («сегодня» = <code>2026-07-01</code>) выведите клиентов, у которых с последней покупки прошло больше 365 дней: <code>customer_id</code>, <code>recency_days</code>. По убыванию <code>recency_days</code>, при равенстве по <code>customer_id</code>.",
    "hints": [
     "<code>CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER)</code>",
     "Фильтр по агрегату: <code>HAVING recency_days &gt; 365</code>. Для recency <code>order_items</code> не нужна."
    ]
   },
   {
    "title": "Распределение частоты",
    "prompt": "Как клиенты распределены по частоте (только <code>delivered</code>)? <code>frequency</code> (число заказов клиента), <code>customers</code> (сколько таких клиентов). По <code>frequency</code>.",
    "hints": [
     "Сгруппируйте готовый CTE <code>rfm</code> ещё раз — по <code>frequency</code>."
    ]
   },
   {
    "title": "Пятёрка по monetary",
    "prompt": "5 клиентов, принёсших больше всего денег (только <code>delivered</code>): <code>customer_id</code>, <code>monetary</code> (сумма quantity × unit_price). По убыванию <code>monetary</code>.",
    "hints": [
     "<code>ORDER BY monetary DESC LIMIT 5</code>"
    ]
   },
   {
    "title": "Клиенты «333»",
    "prompt": "Выведите <code>customer_id</code> клиентов, получивших высший балл по всем трём измерениям (r = 3, f = 3, m = 3). Баллы как в уроке: <code>NTILE(3)</code>, recency по убыванию, frequency и monetary по возрастанию, в каждом окне второй столбец <code>customer_id</code>. Сортировка по <code>customer_id</code>.",
    "hints": [
     "Посчитайте баллы во втором CTE: оконную функцию нельзя использовать прямо в <code>WHERE</code>.",
     "<code>NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r</code> и т. д.; затем <code>WHERE r = 3 AND f = 3 AND m = 3</code>."
    ]
   },
   {
    "title": "Итог по группам ABC",
    "prompt": "Сведите ABC-анализ товаров (только <code>delivered</code>; накопленная доля по убыванию выручки ≤ 80 — A, ≤ 95 — B, иначе C) по группам: <code>abc</code>, <code>products</code> (число товаров), <code>revenue_pct</code> (доля группы в выручке, %, 1 знак). По <code>abc</code>.",
    "hints": [
     "Поместите ABC-запрос из урока в CTE (<code>name</code>, <code>revenue</code>, <code>abc</code>), затем <code>GROUP BY abc</code>.",
     "Доля: <code>100.0 * SUM(revenue) / (SELECT SUM(revenue) FROM a)</code>. В группе A должно быть 7 товаров и 77.5%."
    ]
   },
   {
    "title": "Парето по категориям",
    "prompt": "Сделайте анализ Парето на уровне категорий, а не товаров (только <code>delivered</code>): <code>category</code>, <code>revenue</code>, <code>cum_pct</code> (накопленная доля по убыванию выручки, %, 1 знак). По убыванию выручки.",
    "hints": [
     "CTE: <code>GROUP BY pr.category</code>.",
     "<code>ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1)</code>"
    ]
   },
   {
    "title": "Вес сегментов",
    "prompt": "Воспроизведите таблицу сегментов из урока на SQL. Баллы как в уроке: <code>NTILE(3)</code>, recency по убыванию, frequency и monetary по возрастанию, в каждом окне второй столбец <code>customer_id</code>. Сегменты: r = 3 и f = 3 — <code>'champions'</code>; r = 1 и f ≥ 2 — <code>'at_risk'</code>; r = 3 и f = 1 — <code>'new'</code>; остальные — <code>'other'</code>. Столбцы: <code>segment</code>, <code>customers</code>, <code>revenue_pct</code> (доля monetary, %, 1 знак). По убыванию <code>revenue_pct</code>.",
    "hints": [
     "Три слоя: <code>rfm</code> → баллы (<code>NTILE</code>) → сегмент (<code>CASE</code>).",
     "В <code>CASE</code> важен порядок правил: берётся первая подходящая ветка.",
     "Числа должны совпасть с таблицей урока: 41, 14, 10, 5 клиентов."
    ]
   },
   {
    "title": "ABC по выручке и по штукам",
    "prompt": "Посчитайте ABC-группу товаров по выручке и по проданным штукам (сумма <code>quantity</code>), только <code>delivered</code>, границы 80 и 95. Накопленная доля считается построчно: <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>, порядок — по убыванию значения, при равенстве <code>product_id</code>. Выведите товары, у которых группы различаются: <code>name</code>, <code>abc_revenue</code>, <code>abc_qty</code>. По <code>name</code>.",
    "hints": [
     "В одном CTE для каждого товара столбцы <code>revenue</code> и <code>qty</code> (<code>SUM(oi.quantity)</code>).",
     "По штукам есть равные значения, поэтому <code>ORDER BY qty DESC, product_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.",
     "Два <code>CASE</code>, в конце <code>WHERE abc_revenue &lt;&gt; abc_qty</code>."
    ]
   }
  ]
 },
 "ba-10": {
  "pr": [
   {
    "title": "MAU и пользователе-дни",
    "prompt": "<b>metrics.</b> Одна строка за сентябрь: <code>mau</code> (уникальные пользователи) и <code>user_days</code> (все записи «пользователь-день»). Разница этих чисел — ответ на вопрос, почему MAU нельзя считать как сумму DAU.",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code> и <code>COUNT(*)</code>."
    ]
   },
   {
    "title": "Кто сколько дней заходил",
    "prompt": "<b>metrics.</b> Число активных дней каждого пользователя в сентябре: <code>user_id</code>, <code>active_days</code>. По убыванию <code>active_days</code>, при равенстве по <code>user_id</code>.",
    "hints": [
     "<code>COUNT(DISTINCT day)</code>, <code>GROUP BY user_id</code>."
    ]
   },
   {
    "title": "Самый активный день",
    "prompt": "<b>metrics.</b> Выведите день (или дни) с самым высоким DAU: <code>day</code>, <code>dau</code>.",
    "hints": [
     "Дневной DAU в CTE, затем <code>WHERE dau = (SELECT MAX(dau) FROM d)</code>.",
     "<code>ORDER BY ... LIMIT 1</code> при равенстве потеряет день."
    ]
   },
   {
    "title": "WAU по неделям",
    "prompt": "<b>metrics.</b> WAU каждой недели: <code>week_start</code> (понедельник недели, <code>date(day, 'weekday 0', '-6 days')</code>), <code>wau</code> (уникальные пользователи, заходившие хотя бы раз за неделю). По <code>week_start</code>. Неполные недели на краях месяца тоже входят.",
    "hints": [
     "<code>'weekday 0'</code> сдвигает дату до воскресенья, <code>'-6 days'</code> даёт понедельник этой недели.",
     "WAU — уникальное число: <code>COUNT(DISTINCT user_id)</code>, а не сумма DAU."
    ]
   },
   {
    "title": "Ежедневная привычка",
    "prompt": "<b>metrics.</b> Пользователи, заходившие как минимум в половину дней месяца (≥ 50% из 30 дней): <code>user_id</code>, <code>active_days</code>, <code>pct</code> (сколько процентов от 30 дней, 1 знак). По убыванию <code>pct</code>, при равенстве по <code>user_id</code>.",
    "hints": [
     "Знаменатель — 30 календарных дней: <code>COUNT(*) * 100.0 / 30</code>.",
     "<code>HAVING COUNT(*) * 100.0 / 30 &gt;= 50</code>"
    ]
   },
   {
    "title": "День появления новых",
    "prompt": "<b>metrics.</b> Найдите первый активный день каждого пользователя в сентябре и посчитайте по дням: <code>first_day</code>, <code>new_users</code>. По <code>first_day</code>. Из этих новых и складывается MAU.",
    "hints": [
     "CTE: <code>SELECT user_id, MIN(day) AS first_day ... GROUP BY user_id</code>.",
     "Затем <code>GROUP BY first_day</code>. Сумма <code>new_users</code> равна MAU."
    ]
   },
   {
    "title": "Будни и выходные",
    "prompt": "<b>metrics.</b> Сравните средний DAU в будни и выходные: <code>day_type</code> (<code>'weekday'</code> или <code>'weekend'</code>; выходные — суббота и воскресенье, <code>strftime('%w', day)</code> 6 или 0), <code>days</code> (число дней по календарю), <code>avg_dau</code> (2 знака). День без входов тоже учитывается. По <code>day_type</code>.",
    "hints": [
     "Сначала дневной DAU с нулями: календарь + <code>LEFT JOIN</code>.",
     "<code>strftime('%w', day)</code> возвращает текст: <code>IN ('0', '6')</code>.",
     "Выходных должно быть 9, будних — 21."
    ]
   },
   {
    "title": "Stickiness внутри месяца",
    "prompt": "<b>metrics.</b> Сравните две половины месяца: 1–15 и 16–30 сентября (по 15 дней). Столбцы: <code>half</code> (<code>'1-15'</code> или <code>'16-30'</code>), <code>avg_dau</code> (пользователе-дни / 15, 2 знака), <code>users</code> (уникальные пользователи этой половины), <code>stickiness_pct</code> (avg_dau / users, %, 1 знак). По <code>half</code>.",
    "hints": [
     "Метка группы: <code>CASE WHEN day &lt;= '2024-09-15' THEN '1-15' ELSE '16-30' END</code>.",
     "Знаменатель — 15 календарных дней, а не дни с данными: <code>COUNT(*) * 1.0 / 15</code>.",
     "<code>ROUND(COUNT(*) * 100.0 / 15 / COUNT(DISTINCT user_id), 1)</code>"
    ]
   }
  ]
 },
 "ba-ab": {
  "pr": [
   {
    "title": "Конверсия",
    "prompt": "<p>Функция <code>conv_rate(users, conversions)</code> должна вернуть конверсию в процентах, округлённую <code>round</code> до 2 знаков. Если пользователей 0, вернуть <code>0.0</code>.</p>",
    "hints": [
     "<code>conversions / users * 100</code>",
     "Чтобы не делить на ноль, сначала <code>if users == 0</code>."
    ],
    "check": {
     "tests": "assert conv_rate(10000, 500) == 5.0, \"conv_rate(10000, 500) должна быть 5.0\"\nassert conv_rate(3000, 100) == 3.33, f\"conv_rate(3000, 100) должна быть 3.33, у вас {conv_rate(3000, 100)}\"\nassert conv_rate(0, 0) == 0.0, \"При 0 пользователей верните 0.0\""
    }
   },
   {
    "title": "Пункты и проценты",
    "prompt": "<p>Функция <code>lifts(cr_a, cr_b)</code> по двум конверсиям (обе в %) должна вернуть пару <code>(abs_pp, rel_pct)</code>: абсолютный прирост в процентных пунктах и относительный прирост в процентах. Оба округлены <code>round</code> до 2 знаков.</p>",
    "hints": [
     "Абсолютный: <code>cr_b - cr_a</code>. Относительный: <code>(cr_b - cr_a) / cr_a * 100</code>."
    ],
    "check": {
     "tests": "assert tuple(lifts(5.0, 5.6)) == (0.6, 12.0), f\"lifts(5.0, 5.6) должна быть (0.6, 12.0), у вас {lifts(5.0, 5.6)}\"\nassert tuple(lifts(4.0, 3.0)) == (-1.0, -25.0), \"Снижение даёт отрицательные числа: lifts(4.0, 3.0) = (-1.0, -25.0)\""
    }
   },
   {
    "title": "Что говорит интервал",
    "prompt": "<p>Функция <code>ci_verdict(low, high)</code> должна вернуть вывод по доверительному интервалу разницы: <code>'positive'</code>, если интервал целиком выше нуля, <code>'negative'</code>, если целиком ниже нуля, и <code>'inconclusive'</code>, если он включает ноль.</p>",
    "hints": [
     "Если нижняя граница выше нуля, весь интервал выше нуля: <code>if low &gt; 0</code>."
    ],
    "check": {
     "tests": "assert ci_verdict(-0.02, 1.22) == 'inconclusive', \"Интервал из урока (−0.02 … 1.22) включает ноль: 'inconclusive'\"\nassert ci_verdict(0.1, 0.9) == 'positive', \"0.1 … 0.9: должно быть 'positive'\"\nassert ci_verdict(-0.8, -0.2) == 'negative', \"-0.8 … -0.2: должно быть 'negative'\""
    }
   },
   {
    "title": "Деление не 50/50",
    "prompt": "<p>Иногда тест делится не 50/50, а, например, 90/10. Функция <code>srm(n_a, n_b, share_a=0.5)</code> должна вернуть пару <code>(chi2, has_srm)</code>: ожидаемые размеры e_a = (n_a + n_b) × share_a, e_b = (n_a + n_b) × (1 − share_a); chi2 = (n_a − e_a)² / e_a + (n_b − e_b)² / e_b, <code>round</code> до 2 знаков; <code>has_srm</code> — chi2 &gt; 3.84.</p>",
    "hints": [
     "<code>e_a = total * share_a</code>, <code>e_b = total * (1 - share_a)</code>",
     "При <code>share_a=0.5</code> получается формула из урока."
    ],
    "check": {
     "tests": "_c, _f = srm(10000, 9400)\nassert abs(_c - 18.56) < 0.011 and _f is True, f\"srm(10000, 9400): должно быть (18.56, True), у вас {(_c, _f)}\"\n_c, _f = srm(9000, 1000, 0.9)\nassert abs(_c) < 0.011 and _f is False, \"План 90/10 выполнен точно: chi2 = 0, has_srm False\"\n_c, _f = srm(9100, 900, 0.9)\nassert abs(_c - 11.11) < 0.011 and _f is True, f\"srm(9100, 900, 0.9): должно быть (12.5, True), у вас {(_c, _f)}\""
    }
   },
   {
    "title": "Таблица решений",
    "prompt": "<p>Запишите таблицу решений из урока функцией. <code>decide(srm, ci_low, ci_high, lift, mde, guardrail_ok=True)</code>: есть SRM — <code>'rerun'</code>; защитная метрика ухудшилась (<code>guardrail_ok</code> False) — <code>'investigate'</code>; CI целиком выше нуля и <code>lift &gt;= mde</code> — <code>'ship'</code>; во всех остальных случаях — <code>'no_ship'</code>. Проверять именно в таком порядке.</p>",
    "hints": [
     "Четыре <code>if</code>, каждый сразу делает <code>return</code>: SRM проверяется первым.",
     "CI выше нуля: <code>ci_low &gt; 0</code>."
    ],
    "check": {
     "tests": "assert decide(True, 0.5, 1.5, 1.0, 0.3) == 'rerun', \"При SRM результат не используется: 'rerun'\"\nassert decide(False, 0.5, 1.5, 1.0, 0.3, guardrail_ok=False) == 'investigate', \"Если защитная метрика ухудшилась: 'investigate'\"\nassert decide(False, 0.5, 1.5, 1.0, 0.3) == 'ship', \"CI > 0 и lift ≥ MDE: 'ship'\"\nassert decide(False, -0.02, 1.22, 0.6, 0.3) == 'no_ship', \"CI включает ноль: 'no_ship'\"\nassert decide(False, 0.05, 0.2, 0.1, 0.3) == 'no_ship', \"Эффект значим, но меньше MDE: 'no_ship'\""
    }
   },
   {
    "title": "Ловушка ранней остановки",
    "prompt": "<p>Аналитик смотрит на тест каждый день. Функция <code>peeking_stop(pvalues, alpha=0.05)</code> по списку дневных p-value должна вернуть номер <b>первого</b> дня (с 1), когда p &lt; alpha; если такого дня нет — <code>None</code>. Остановка в этот день — peeking: как сказано в уроке, она увеличивает долю ложных побед.</p>",
    "hints": [
     "<code>for day, p in enumerate(pvalues, start=1):</code>"
    ],
    "check": {
     "tests": "assert peeking_stop([0.4, 0.2, 0.04, 0.09, 0.06]) == 3, \"Первое p < 0.05 на третий день: 3\"\nassert peeking_stop([0.3, 0.12, 0.07]) is None, \"Если порог ни разу не пройден: None\"\nassert peeking_stop([0.02, 0.5], alpha=0.01) is None, \"Используйте параметр alpha\""
    }
   },
   {
    "title": "Один контроль, несколько вариантов",
    "prompt": "<p>Тест A/B/C: функция <code>variants(groups)</code> принимает словарь <code>{'A': (пользователи, покупки), 'B': ..., ...}</code> и для каждого варианта, кроме контроля (<code>'A'</code>), возвращает тройку <code>(имя, cr, rel_lift)</code>: <code>cr</code> — конверсия, %; <code>rel_lift</code> — относительный прирост к A, %. Оба <code>round</code> до 2 знаков. Список отсортирован по убыванию <code>rel_lift</code>.</p>",
    "hints": [
     "Сначала конверсия A, затем <code>for name, (users, conv) in groups.items():</code>, пропуская <code>'A'</code>.",
     "Прирост считайте от неокруглённой конверсии и только потом делайте <code>round</code>.",
     "<code>sorted(out, key=lambda r: r[2], reverse=True)</code>"
    ],
    "check": {
     "tests": "_r = variants({'A': (10000, 500), 'B': (10000, 560), 'C': (10000, 470)})\nassert isinstance(_r, list) and len(_r) == 2, \"Ожидался список из двух вариантов, кроме A\"\nassert [tuple(x) for x in _r] == [('B', 5.6, 12.0), ('C', 4.7, -6.0)], f\"Ожидалось [('B', 5.6, 12.0), ('C', 4.7, -6.0)], у вас {_r}\"\n_r = variants({'C': (3000, 99), 'A': (3000, 90), 'B': (3000, 120)})\nassert [x[0] for x in _r] == ['B', 'C'] and [x[2] for x in _r] == [33.33, 10.0], f\"Контроль может стоять в любом месте словаря; должно быть B 33.33, C 10.0, у вас {_r}\""
    }
   },
   {
    "title": "SRM по дням",
    "prompt": "<p>Ошибка деления иногда бывает только в один день (например, в день релиза). Функция <code>srm_days(days)</code> принимает список дневных пар <code>(n_a, n_b)</code> теста 50/50 и возвращает список номеров дней (с 1), в которые есть SRM (chi2 &gt; 3.84). chi2 как в уроке: e = (n_a + n_b) / 2.</p>",
    "hints": [
     "Примените формулу chi2 из урока к каждому дню отдельно: <code>for i, (n_a, n_b) in enumerate(days, start=1):</code>."
    ],
    "check": {
     "tests": "assert srm_days([(1000, 1010), (1020, 990), (1100, 900), (995, 1005)]) == [3], \"SRM есть только на 3-й день (1100 и 900): [3]\"\nassert srm_days([(500, 500), (510, 490)]) == [], \"При малом отклонении — пустой список\"\nassert srm_days([(1200, 1000), (1000, 1000), (800, 1000)]) == [1, 3], f\"Несколько дней: ожидалось [1, 3], у вас {srm_days([(1200, 1000), (1000, 1000), (800, 1000)])}\""
    }
   }
  ]
 }
} });
