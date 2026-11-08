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
 }
} });
