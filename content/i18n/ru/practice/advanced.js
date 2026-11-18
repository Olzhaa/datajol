// advanced practice tasks: Russian text. Code, solutions and checks are in content/practice/advanced.js.
DJ.i18n.patch({ lessons: {
 "adv-1": {
  "pr": [
   {
    "title": "Дешёвая электроника",
    "prompt": "В CTE выберите столбцы <code>name</code> и <code>price</code> товаров категории «Электроника». Затем из этого CTE выведите названия товаров, цена которых ниже 100 000 тенге.",
    "hints": [
     "<code>WITH el AS (SELECT ... WHERE category = 'Электроника')</code>",
     "Основной запрос: <code>SELECT name FROM el WHERE ...</code>"
    ]
   },
   {
    "title": "Количество заказов через CTE",
    "prompt": "В CTE посчитайте количество заказов каждого клиента (<code>customer_id</code>) под именем <code>n</code>. Затем выведите столбцы <code>customer_id</code> и <code>n</code> клиентов, у которых <code>n</code> не меньше 2.",
    "hints": [
     "Внутри CTE <code>GROUP BY customer_id</code>.",
     "После CTE пишется обычный <code>WHERE n &gt;= 2</code>, а не <code>HAVING</code>."
    ]
   },
   {
    "title": "Доставленные заказы и клиент",
    "prompt": "В CTE выберите только <code>delivered</code> заказы. Затем соедините его с <code>customers</code> и выведите имя клиента и дату заказа.",
    "hints": [
     "CTE можно ставить в JOIN как таблицу: <code>FROM d JOIN customers c ON c.id = d.customer_id</code>."
    ]
   },
   {
    "title": "Средний чек",
    "prompt": "В CTE посчитайте сумму каждого заказа (<code>quantity × price</code> сумма) под именем <code>total</code>. Затем выведите среднюю сумму всех заказов, округлённую до целого.",
    "hints": [
     "Сначала сумма каждого заказа, затем её среднее: <code>SELECT ROUND(AVG(total)) FROM t</code>."
    ]
   },
   {
    "title": "Два CTE вместе",
    "prompt": "Напишите два CTE: <code>n</code> — количество заказов каждого клиента (<code>customer_id</code>, <code>cnt</code>), <code>r</code> — общая сумма покупок каждого клиента (<code>customer_id</code>, <code>total</code>). Выведите имя клиентов, у которых не меньше 2 заказов, а также столбцы <code>cnt</code> и <code>total</code>.",
    "hints": [
     "CTE разделяются запятой: <code>WITH n AS (...), r AS (...)</code>.",
     "В конце сделайте JOIN с customers по обоим CTE."
    ]
   },
   {
    "title": "Продажи по городам",
    "prompt": "В CTE посчитайте сумму покупок каждого клиента (<code>customer_id</code>, <code>total</code>). Затем сложите суммы по городу клиента и выведите <code>city</code> и сумму по городу, отсортировав по убыванию суммы.",
    "hints": [
     "Результат CTE можно сгруппировать ещё раз: <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Заказы выше среднего",
    "prompt": "В CTE посчитайте сумму каждого заказа (<code>order_id</code>, <code>total</code>). Выведите заказы, сумма которых выше средней суммы всех заказов, со столбцами <code>order_id</code> и <code>total</code>, отсортировав по убыванию суммы.",
    "hints": [
     "Один CTE можно использовать дважды: в основном запросе и в subquery.",
     "<code>WHERE total &gt; (SELECT AVG(total) FROM t)</code>"
    ]
   },
   {
    "title": "Самая продаваемая категория",
    "prompt": "Напишите два CTE: <code>sold</code> — количество проданных штук каждого товара (<code>product_id</code>, <code>q</code>), <code>cat</code> — количество проданных штук каждой категории (<code>category</code>, <code>q</code>). Выведите категорию, у которой продано больше всего штук, со столбцами <code>category</code> и <code>q</code>.",
    "hints": [
     "Второй CTE опирается на первый: <code>FROM sold s JOIN products p ...</code>.",
     "В конце добавьте <code>WHERE q = (SELECT MAX(q) FROM cat)</code>."
    ]
   }
  ]
 },
 "adv-2": {
  "pr": [
   {
    "title": "Среднее по компании рядом",
    "prompt": "Выведите имя и зарплату каждого сотрудника, а также среднюю зарплату по всей компании под именем <code>company_avg</code>. Используйте <code>OVER ()</code>.",
    "hints": [
     "Пустой <code>OVER ()</code> означает, что вся таблица — одно окно."
    ]
   },
   {
    "title": "Номер по зарплате",
    "prompt": "Присвойте каждому сотруднику порядковый номер по зарплате (от большей к меньшей): <code>name</code>, <code>salary</code>, <code>rn</code>. Если зарплата одинаковая, первым идёт тот, у кого <code>id</code> меньше. Используйте <code>ROW_NUMBER</code>.",
    "hints": [
     "<code>ROW_NUMBER() OVER (ORDER BY salary DESC, id)</code>"
    ]
   },
   {
    "title": "Численность отдела",
    "prompt": "Выведите имя и отдел каждого сотрудника, а также количество сотрудников в его отделе под именем <code>dept_size</code>. Строки не должны сворачиваться.",
    "hints": [
     "<code>COUNT(*) OVER (PARTITION BY department)</code>"
    ]
   },
   {
    "title": "Доля зарплаты в отделе",
    "prompt": "Выведите имя, отдел каждого сотрудника и долю его зарплаты в общем фонде зарплат его отдела в процентах (<code>share</code>, с одним знаком после запятой).",
    "hints": [
     "<code>salary * 100.0 / SUM(salary) OVER (PARTITION BY department)</code>",
     "Снаружи примените <code>ROUND(..., 1)</code>."
    ]
   },
   {
    "title": "RANK и DENSE_RANK",
    "prompt": "Выведите имя, зарплату и рейтинг зарплаты по компании двумя способами: <code>rnk</code> (<code>RANK</code>) и <code>drnk</code> (<code>DENSE_RANK</code>), от большего к меньшему.",
    "hints": [
     "Две оконные функции могут стоять в одном SELECT.",
     "После равных зарплат <code>RANK</code> пропускает номера, а <code>DENSE_RANK</code> — нет."
    ]
   },
   {
    "title": "До лидера отдела",
    "prompt": "Выведите имя, отдел и зарплату каждого сотрудника, а также на сколько он получает меньше самой высокой зарплаты в своём отделе под именем <code>gap</code> (у лидера будет 0).",
    "hints": [
     "<code>MAX(salary) OVER (PARTITION BY department) - salary</code>"
    ]
   },
   {
    "title": "Второе место в отделе",
    "prompt": "В каждом отделе выведите сотрудников, занимающих второе место по зарплате (<code>DENSE_RANK</code> = 2, от большего к меньшему): <code>department</code>, <code>name</code>, <code>salary</code>. Те, у кого одинаковая зарплата, стоят на одном месте.",
    "hints": [
     "Оконную функцию нельзя использовать в <code>WHERE</code>: сначала посчитайте <code>r</code> в subquery.",
     "Во внешнем запросе <code>WHERE r = 2</code>."
    ]
   },
   {
    "title": "Выше среднего по отделу",
    "prompt": "Выведите сотрудников, у которых зарплата выше средней зарплаты их отдела: <code>department</code>, <code>name</code>, <code>salary</code> и средняя зарплата отдела, округлённая до целого, <code>dept_avg</code>.",
    "hints": [
     "Во внутреннем запросе <code>AVG(salary) OVER (PARTITION BY department)</code>.",
     "Во внешнем запросе отфильтруйте строки и создайте <code>ROUND</code>."
    ]
   }
  ]
 },
 "adv-3": {
  "pr": [
   {
    "title": "Накопленный доход Астаны",
    "prompt": "Из таблицы <code>daily_sales</code> выведите по Астане <code>day</code>, <code>revenue</code> и накопленную сумму <code>running</code> в порядке дат.",
    "hints": [
     "<code>SUM(revenue) OVER (ORDER BY day)</code>"
    ]
   },
   {
    "title": "Накопление по регионам",
    "prompt": "Внутри каждого региона посчитайте накопленный доход: <code>region</code>, <code>day</code>, <code>running</code>. Порядок: сначала регион, затем дата.",
    "hints": [
     "<code>OVER (PARTITION BY region ORDER BY day)</code> в каждом регионе начинает сумму с нуля."
    ]
   },
   {
    "title": "Общий доход региона",
    "prompt": "Для каждой строки выведите <code>region</code>, <code>day</code>, <code>revenue</code> и общий доход этого региона за все даты под именем <code>region_total</code>.",
    "hints": [
     "Без <code>ORDER BY</code> <code>OVER (PARTITION BY region)</code> даёт сумму по всей группе."
    ]
   },
   {
    "title": "Среднее за два дня",
    "prompt": "По Астане выведите <code>day</code>, <code>revenue</code> и скользящее среднее за 2 дня <code>ma2</code> (прошлый день и сегодня), в порядке дат.",
    "hints": [
     "<code>ROWS BETWEEN 1 PRECEDING AND CURRENT ROW</code>"
    ]
   },
   {
    "title": "Выполнение плана",
    "prompt": "По Алматы выведите <code>day</code> и долю накопленного дохода на эту дату от общего дохода Алматы за 10 дней в процентах (<code>pct</code>, с одним знаком после запятой), в порядке дат.",
    "hints": [
     "Числитель: <code>SUM(revenue) OVER (ORDER BY day)</code>, знаменатель: <code>SUM(revenue) OVER ()</code>."
    ]
   },
   {
    "title": "Максимум за три дня",
    "prompt": "По Алматы выведите <code>day</code>, <code>revenue</code> и самый высокий доход за последние 3 дня (включая сегодня) под именем <code>max3</code>, в порядке дат.",
    "hints": [
     "Скользящее окно работает не только с <code>AVG</code>, но и с <code>MAX</code>."
    ]
   },
   {
    "title": "Накопленный итог по дням",
    "prompt": "Сначала в CTE посчитайте доход каждого дня по двум регионам (<code>day</code>, <code>total</code>). Затем выведите <code>day</code>, <code>total</code> и накопленную сумму <code>running</code> в порядке дат.",
    "hints": [
     "В CTE — <code>GROUP BY day</code>, вне CTE — оконная функция."
    ]
   },
   {
    "title": "Дни выше среднего",
    "prompt": "По Алматы выведите дни, когда доход был выше его скользящего среднего за 3 дня (<code>ma3</code>: два предыдущих дня и сегодня): <code>day</code>, <code>revenue</code>, <code>ma3</code> (с одним знаком после запятой). В порядке дат.",
    "hints": [
     "Посчитайте <code>ma3</code> в subquery: оконная функция не работает в <code>WHERE</code>.",
     "Во внешнем запросе <code>WHERE revenue &gt; ma3</code>."
    ]
   }
  ]
 },
 "adv-4": {
  "pr": [
   {
    "title": "Дата следующего заказа",
    "prompt": "Для всех заказов выведите <code>id</code>, <code>order_date</code> и дату следующего заказа <code>next_date</code> (<code>LEAD</code>) в порядке времени.",
    "hints": [
     "<code>LEAD(order_date) OVER (ORDER BY order_date)</code>"
    ]
   },
   {
    "title": "Вчерашний доход Алматы",
    "prompt": "По Алматы выведите <code>day</code>, <code>revenue</code> и доход предыдущего дня под именем <code>prev</code>, в порядке дат.",
    "hints": [
     "<code>LAG(revenue) OVER (ORDER BY day)</code>; в первый день будет NULL."
    ]
   },
   {
    "title": "Более дешёвый сосед",
    "prompt": "Отсортируйте товары по возрастанию цены и выведите название каждого товара, его цену и цену товара, который на одну ступень дешевле, под именем <code>cheaper</code>.",
    "hints": [
     "<code>LAG(price) OVER (ORDER BY price)</code>"
    ]
   },
   {
    "title": "Ежедневное изменение",
    "prompt": "По Алматы выведите <code>day</code>, <code>revenue</code> и разницу с предыдущим днём под именем <code>diff</code>, в порядке дат.",
    "hints": [
     "<code>revenue - LAG(revenue) OVER (ORDER BY day)</code>"
    ]
   },
   {
    "title": "LAG внутри региона",
    "prompt": "Для двух регионов вместе выведите: <code>region</code>, <code>day</code>, <code>revenue</code> и доход того же региона за предыдущий день <code>prev</code>. В первый день каждого региона <code>prev</code> должно быть пустым. Порядок: регион, затем дата.",
    "hints": [
     "Чтобы регионы не смешивались, добавьте <code>PARTITION BY region</code>."
    ]
   },
   {
    "title": "Предыдущий заказ клиента",
    "prompt": "Для каждого заказа выведите <code>customer_id</code>, <code>id</code>, <code>order_date</code> и дату предыдущего заказа <b>этого же клиента</b> под именем <code>prev_date</code>. Порядок: <code>customer_id</code>, затем дата.",
    "hints": [
     "<code>LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)</code>"
    ]
   },
   {
    "title": "Падение дохода",
    "prompt": "По Астане выведите дни, когда доход был ниже, чем в предыдущий день: <code>day</code>, <code>revenue</code>, <code>prev</code>. В порядке дат.",
    "hints": [
     "<code>prev</code> вычислите в subquery с помощью LAG.",
     "Во внешнем запросе <code>WHERE revenue &lt; prev</code>."
    ]
   },
   {
    "title": "Прирост платежей за месяц",
    "prompt": "Из таблицы <code>payments</code> в CTE посчитайте сумму платежей каждого месяца (<code>month</code>, <code>total</code>). Затем выведите <code>month</code>, <code>total</code> и прирост по сравнению с предыдущим месяцем в процентах (<code>growth</code>, с одним знаком после запятой) в порядке месяцев.",
    "hints": [
     "Прирост % = (текущий − прошлый) × 100.0 / прошлый.",
     "Делитель — прошлый месяц: <code>LAG(total) OVER (ORDER BY month)</code>."
    ]
   }
  ]
 },
 "adv-5": {
  "pr": [
   {
    "title": "Самый новый сотрудник отдела",
    "prompt": "Для каждого отдела выведите сотрудника, принятого на работу последним: <code>department</code>, <code>name</code>, <code>hire_date</code>.",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC)</code>",
     "Во внешнем запросе <code>WHERE rn = 1</code>."
    ]
   },
   {
    "title": "Самый дешёвый в категории",
    "prompt": "Выведите самый дешёвый товар каждой категории: <code>category</code>, <code>name</code>, <code>price</code>.",
    "hints": [
     "Чтобы начать с самого дешёвого, используйте <code>ORDER BY price</code> (ASC)."
    ]
   },
   {
    "title": "Самый слабый день региона",
    "prompt": "Выведите день с самым низким доходом для каждого региона: <code>region</code>, <code>day</code>, <code>revenue</code>.",
    "hints": [
     "<code>PARTITION BY region ORDER BY revenue</code>"
    ]
   },
   {
    "title": "Два лучших при равной зарплате",
    "prompt": "В каждом отделе выведите сотрудников, которые занимают первые 2 места по зарплате: <code>department</code>, <code>name</code>, <code>salary</code>. Те, у кого одинаковая зарплата, делят одно место, поэтому используйте <code>RANK</code>.",
    "hints": [
     "<code>ROW_NUMBER</code> даёт разные номера равным значениям, а <code>RANK</code> — одинаковые.",
     "Во внешнем запросе <code>WHERE r &lt;= 2</code>."
    ]
   },
   {
    "title": "Первый заказ клиента",
    "prompt": "Выведите самый первый заказ каждого клиента: <code>customer_id</code>, <code>id</code>, <code>order_date</code>.",
    "hints": [
     "Чтобы самый ранний шёл первым, используйте <code>ORDER BY order_date</code> (ASC)."
    ]
   },
   {
    "title": "Самый крупный платёж",
    "prompt": "Из таблицы <code>payments</code> выведите самый крупный платёж каждого пользователя одной строкой на пользователя: <code>user_id</code>, <code>month</code>, <code>amount</code>. Если суммы равны, возьмите самый ранний месяц.",
    "hints": [
     "Чтобы разрешить равенство, добавьте вторую сортировку: <code>ORDER BY amount DESC, month</code>."
    ]
   },
   {
    "title": "Самый дорогой товар в заказе",
    "prompt": "Для каждого заказа выведите самый дорогой товар: <code>order_id</code>, название товара <code>name</code> и цену <code>price</code>. Соедините <code>order_items</code> и <code>products</code>.",
    "hints": [
     "Внутри subquery сделайте JOIN и добавьте оконную функцию.",
     "<code>PARTITION BY oi.order_id ORDER BY p.price DESC</code>"
    ]
   },
   {
    "title": "Самый активный клиент города",
    "prompt": "Для каждого города выведите клиента, сделавшего больше всего заказов: <code>city</code>, <code>name</code> и количество заказов <code>n</code>. Если количество совпадает, возьмите клиента с меньшим <code>id</code>. Клиенты без заказов не учитываются.",
    "hints": [
     "Сначала в CTE посчитайте количество заказов каждого клиента.",
     "Затем <code>ROW_NUMBER() OVER (PARTITION BY city ORDER BY n DESC, id)</code>."
    ]
   }
  ]
 },
 "adv-6": {
  "pr": [
   {
    "title": "Название канала на казахском",
    "prompt": "Из таблицы <code>users</code> выведите <code>id</code> и казахское название канала под именем <code>channel_kz</code>: <code>ads</code> → <code>жарнама</code>, <code>organic</code> → <code>органикалық</code>, остальные → <code>ұсыныс</code>.",
    "hints": [
     "Напишите два <code>WHEN</code> и один <code>ELSE</code>."
    ]
   },
   {
    "title": "Категории в одной строке",
    "prompt": "Выведите в одной строке три столбца: <code>electronics</code>, <code>books</code>, <code>office</code> — количество товаров в категориях «Электроника», «Кітаптар» и «Кеңсе».",
    "hints": [
     "<code>SUM(CASE WHEN category = 'Электроника' THEN 1 ELSE 0 END)</code>"
    ]
   },
   {
    "title": "Каналы в одной строке",
    "prompt": "Из таблицы <code>users</code> выведите в одной строке три столбца: <code>ads</code>, <code>organic</code>, <code>referral</code> — количество пользователей, пришедших из каждого канала.",
    "hints": [
     "Каждый столбец — это один <code>SUM(CASE ...)</code> со своим условием."
    ]
   },
   {
    "title": "Статусы по городам",
    "prompt": "Для каждого города выведите одну строку: <code>city</code>, <code>delivered</code> (количество доставленных заказов) и <code>not_delivered</code> (количество остальных заказов). Соедините <code>orders</code> и <code>customers</code>.",
    "hints": [
     "JOIN, затем <code>GROUP BY c.city</code> и два <code>SUM(CASE ...)</code>."
    ]
   },
   {
    "title": "Месяцы в столбцах",
    "prompt": "Сделайте pivot таблицы <code>payments</code>: для каждого <code>user_id</code> столбцы <code>jul</code>, <code>aug</code>, <code>sep</code> — сумма платежей за месяцы 2024-07, 2024-08 и 2024-09 (если платежей не было, 0). Отсортируйте по <code>user_id</code>.",
    "hints": [
     "<code>SUM(CASE WHEN month = '2024-07' THEN amount ELSE 0 END) AS jul</code>"
    ]
   },
   {
    "title": "Воронка конверсии",
    "prompt": "Выведите в одной строке два процента (с одним знаком после запятой): <code>cart_rate</code> — доля уникальных пользователей, дошедших до шага cart, от пришедших на visit, <code>buy_rate</code> — доля купивших от тех, кто дошёл до cart.",
    "hints": [
     "Количество шагов: <code>COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END)</code>.",
     "Чтобы избежать целочисленного деления, начните с <code>100.0 *</code>."
    ]
   },
   {
    "title": "Воронка по каналам",
    "prompt": "Объедините <code>events</code> и <code>users</code> и выведите воронку для каждого канала: <code>channel</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code> — количество уникальных пользователей, дошедших до каждого шага.",
    "hints": [
     "<code>JOIN users u ON u.id = e.user_id</code>, затем <code>GROUP BY u.channel</code>."
    ]
   },
   {
    "title": "Выручка категорий по статусу",
    "prompt": "Для каждой категории выведите одну строку: <code>category</code>, <code>delivered_rev</code> (выручка доставленных заказов) и <code>other_rev</code> (выручка остальных заказов). Выручка = <code>quantity × price</code>. Отсортируйте по названию категории.",
    "hints": [
     "Соедините три таблицы: orders → order_items → products.",
     "Вычисление внутри THEN: <code>THEN oi.quantity * p.price ELSE 0</code>."
    ]
   }
  ]
 },
 "adv-7": {
  "pr": [
   {
    "title": "Регистрации по каналам",
    "prompt": "Выведите, сколько пользователей зарегистрировалось из каждого канала: <code>channel</code> и количество.",
    "hints": [
     "<code>GROUP BY channel</code>"
    ]
   },
   {
    "title": "Активные пользователи по месяцам",
    "prompt": "Из таблицы <code>activity</code> выведите количество уникальных активных пользователей за каждый месяц: <code>month</code> и <code>active</code>. Сортировка по месяцам.",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code>"
    ]
   },
   {
    "title": "Когорта и канал",
    "prompt": "Для каждой пары когорта (<code>signup_month</code>) и канал (<code>channel</code>) выведите количество пользователей: <code>signup_month</code>, <code>channel</code>, <code>n</code>.",
    "hints": [
     "Группировка по двум столбцам: <code>GROUP BY signup_month, channel</code>."
    ]
   },
   {
    "title": "Вернувшиеся пользователи",
    "prompt": "Для каждой когорты выведите количество уникальных пользователей, которые были активны хотя бы раз в месяцах после месяца регистрации: <code>cohort</code>, <code>returned</code>. Когорты без таких пользователей не показываются.",
    "hints": [
     "Месяц — текст ('2024-08'), но сравнивать его всё равно можно: <code>a.month &gt; u.signup_month</code>."
    ]
   },
   {
    "title": "Retention когорты июля",
    "prompt": "Только для когорты 2024-07 выведите retention по каждому месяцу: <code>month</code> и <code>retention</code> (активные / размер когорты × 100, с одним знаком после запятой). Размер когорты найдите через subquery. Сортировка по месяцам.",
    "hints": [
     "Делитель: <code>(SELECT COUNT(*) FROM users WHERE signup_month = '2024-07')</code>."
    ]
   },
   {
    "title": "Доход когорты",
    "prompt": "Объедините <code>payments</code> и <code>users</code> и выведите общую сумму платежей каждой когорты за все месяцы: <code>cohort</code>, <code>revenue</code>. Сортировка по когортам.",
    "hints": [
     "<code>JOIN users u ON u.id = p.user_id</code>, затем <code>GROUP BY u.signup_month</code>."
    ]
   },
   {
    "title": "Retention по каналам",
    "prompt": "Для пользователей, зарегистрированных до 2024-09 включительно (<code>signup_month &lt; '2024-09'</code>), выведите retention каждого канала за месяц 2024-09: <code>channel</code>, <code>retention</code> — доля тех, кто был активен в этом месяце, в процентах, с одним знаком после запятой.",
    "hints": [
     "Числитель: <code>COUNT(DISTINCT CASE WHEN a.month = '2024-09' THEN u.id END)</code>.",
     "Делитель: все пользователи канала, <code>COUNT(DISTINCT u.id)</code>."
    ]
   },
   {
    "title": "ARPU по когортам",
    "prompt": "Для каждой когорты выведите <code>cohort</code>, размер когорты <code>size</code>, общую сумму платежей когорты <code>revenue</code> и доход на одного пользователя <code>arpu</code> (<code>revenue / size</code>, до целого). Используйте два CTE. Сортировка по когортам.",
    "hints": [
     "<code>WITH size AS (...), rev AS (...)</code>",
     "Целочисленное деление: <code>r.revenue * 1.0 / s.n</code>."
    ]
   }
  ]
 },
 "adv-8": {
  "pr": [
   {
    "title": "Таблица измерения товаров",
    "prompt": "В пустой базе данных создайте таблицу-измерение товаров (dimension) <code>dim_product</code>, столбцы <code>product_key INTEGER PRIMARY KEY</code>, <code>name TEXT</code>, <code>category TEXT</code>.",
    "hints": [
     "<code>CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, ...)</code>"
    ]
   },
   {
    "title": "Таблица измерения дат",
    "prompt": "В пустой базе данных создайте таблицу-измерение дат (dimension) <code>dim_date</code>, столбцы <code>date_key INTEGER PRIMARY KEY</code>, <code>full_date TEXT</code>, <code>month INTEGER</code>, <code>year INTEGER</code>.",
    "hints": [
     "Запишите столбцы именно в этом порядке."
    ]
   },
   {
    "title": "Таблица измерения магазинов",
    "prompt": "В пустой базе данных создайте таблицу <code>dim_store</code> (<code>store_key INTEGER PRIMARY KEY</code>, <code>city TEXT</code>) и добавьте три магазина: (1, 'Алматы'), (2, 'Астана'), (3, 'Шымкент').",
    "hints": [
     "Сначала <code>CREATE TABLE</code>, затем три строки одним <code>INSERT</code>."
    ]
   },
   {
    "title": "Ссылка из таблицы фактов",
    "prompt": "В пустой базе данных создайте две таблицы: <code>dim_city</code> (<code>city_key INTEGER PRIMARY KEY</code>, <code>name TEXT</code>) и <code>fact_orders</code> (<code>order_id INTEGER PRIMARY KEY</code>, <code>city_key INTEGER</code> — ссылка на <code>dim_city(city_key)</code>, <code>amount INTEGER</code>).",
    "hints": [
     "Внешний ключ в таблице фактов ссылается на измерение: <code>city_key INTEGER REFERENCES dim_city(city_key)</code>."
    ]
   },
   {
    "title": "Продажи по категориям",
    "prompt": "В стартовом коде уже есть star schema: <code>dim_product</code> и <code>fact_sales</code>. Объедините их и выведите сумму продаж для каждой категории: <code>category</code>, <code>total</code> (сумма <code>amount</code>).",
    "hints": [
     "Факты и измерение соединяются через ключ: <code>ON d.product_key = f.product_key</code>."
    ]
   },
   {
    "title": "Продажи по месяцам",
    "prompt": "В стартовом коде уже есть <code>dim_date</code> и <code>fact_sales</code>. Выведите для каждого месяца проданное количество (сумма <code>quantity</code>) и сумму продаж (сумма <code>amount</code>): <code>month</code>, <code>qty</code>, <code>total</code>. Сортировка по месяцам.",
    "hints": [
     "<code>JOIN dim_date d ON d.date_key = f.date_key</code>, затем <code>GROUP BY d.month</code>."
    ]
   },
   {
    "title": "Отчёт по двум измерениям",
    "prompt": "В стартовом коде уже есть <code>dim_store</code>, <code>dim_product</code> и <code>fact_sales</code>. Выведите сумму продаж для каждой пары города и категории: <code>city</code>, <code>category</code>, <code>total</code>. Порядок: город, затем категория.",
    "hints": [
     "Соедините таблицу фактов с двумя измерениями.",
     "<code>GROUP BY s.city, p.category</code>"
    ]
   },
   {
    "title": "Осиротевшие строки фактов",
    "prompt": "В стартовом коде в таблице <code>fact_sales</code> есть строки с <code>product_key</code>, которого нет в <code>dim_product</code>. Чтобы проверить качество данных, выведите столбцы <code>sale_id</code>, <code>product_key</code> и <code>amount</code> таких строк.",
    "hints": [
     "<code>fact_sales f LEFT JOIN dim_product d ON ...</code>",
     "Без пары: <code>WHERE d.product_key IS NULL</code>."
    ]
   }
  ]
 },
 "adv-9": {
  "pr": [
   {
    "title": "Индекс по категории",
    "prompt": "Создайте индекс для столбца <code>category</code> таблицы <code>products</code> (название индекса любое).",
    "hints": [
     "<code>CREATE INDEX атауы ON кесте(баған);</code>"
    ]
   },
   {
    "title": "Индекс по дате",
    "prompt": "Создайте индекс для столбца <code>order_date</code> таблицы <code>orders</code> (название индекса любое).",
    "hints": [
     "<code>CREATE INDEX idx_orders_date ON orders(order_date);</code>"
    ]
   },
   {
    "title": "Индекс для столбца JOIN",
    "prompt": "Таблица <code>order_items</code> часто соединяется с <code>products</code> через <code>product_id</code>. Создайте индекс для этого столбца.",
    "hints": [
     "Индекс полезен для столбца, который используется в <code>JOIN ... ON</code>."
    ]
   },
   {
    "title": "Фильтр, который не отключает индекс",
    "prompt": "Выведите столбцы <code>id</code> и <code>order_date</code> заказов за октябрь 2024 года. Не применяйте функцию к столбцу, пишите через диапазон дат: <code>&gt;=</code> и <code>&lt;</code>.",
    "hints": [
     "<code>substr(order_date, 1, 7) = '2024-10'</code> «отключает» индекс.",
     "Вместо этого: <code>order_date &gt;= '2024-10-01' AND order_date &lt; '2024-11-01'</code>."
    ]
   },
   {
    "title": "Индекс и JOIN",
    "prompt": "Сначала создайте индекс для столбца <code>city</code> таблицы <code>customers</code>. Затем выведите заказы клиентов из Алматы: только <code>o.id</code> и <code>c.name</code> (<code>SELECT *</code> не нужен).",
    "hints": [
     "Две команды: <code>CREATE INDEX ...;</code> и <code>SELECT ...;</code>",
     "Выбирайте только нужные столбцы."
    ]
   },
   {
    "title": "Составной индекс",
    "prompt": "Для таблицы <code>order_items</code> создайте один составной индекс по двум столбцам: сначала <code>order_id</code>, затем <code>product_id</code>.",
    "hints": [
     "В скобках перечислите столбцы через запятую: <code>ON order_items(order_id, product_id)</code>."
    ]
   },
   {
    "title": "Индекс и диапазон дат",
    "prompt": "Для таблицы <code>orders</code> создайте индекс для столбца <code>order_date</code>. Затем посчитайте заказы за период с 1 сентября по 31 октября 2024 года по статусам: <code>status</code> и количество. Не применяйте функции к дате.",
    "hints": [
     "Период: <code>order_date &gt;= '2024-09-01' AND order_date &lt; '2024-11-01'</code>.",
     "Затем <code>GROUP BY status</code>."
    ]
   },
   {
    "title": "Сначала фильтр, потом объединение",
    "prompt": "Для таблицы <code>order_items</code> создайте индекс для столбца <code>product_id</code>. Затем в CTE возьмите только доставленные (<code>delivered</code>) заказы и посчитайте выручку каждого товара по этим заказам (<code>quantity × price</code>). Выведите <code>name</code> и <code>revenue</code> товаров, у которых выручка больше 100 000 тенге.",
    "hints": [
     "CTE: <code>WITH d AS (SELECT id FROM orders WHERE status = ...)</code> — работаем с небольшим количеством строк.",
     "Затем <code>d</code> → order_items → products и <code>HAVING</code>."
    ]
   }
  ]
 },
 "adv-10": {
  "pr": [
   {
    "title": "Дни недели",
    "prompt": "С помощью рекурсивного CTE выведите дни с 1 по 14 сентября 2024 года: <code>day</code> и <code>dow</code> — номер дня недели (<code>strftime('%w', day)</code>, 0 — воскресенье). По порядку дат.",
    "hints": [
     "Условие остановки: <code>WHERE day &lt; '2024-09-14'</code>.",
     "<code>SELECT day, strftime('%w', day) AS dow FROM cal ORDER BY day</code>"
    ]
   },
   {
    "title": "Пустые дни",
    "prompt": "В какие дни сентября никто не заходил в приложение? Сделайте <code>LEFT JOIN</code> календаря с <code>daily_active</code> и выведите дни, для которых пара не нашлась. Столбец: <code>day</code>.",
    "hints": [
     "<code>FROM cal c LEFT JOIN daily_active a ON a.day = c.day</code>",
     "В строке без пары столбцы правой таблицы равны NULL: <code>WHERE a.user_id IS NULL</code>."
    ]
   },
   {
    "title": "Конец месяца одного пользователя",
    "prompt": "Для каждого дня с 2024-09-25 по 2024-09-30 покажите, заходил ли пользователь 9: <code>day</code>, <code>active</code> (1 — заходил, 0 — нет). Должны быть видны все 6 дней, по порядку дат.",
    "hints": [
     "Условие на пользователя пишите не в <code>WHERE</code>, а внутри <code>ON</code>: <code>ON a.day = c.day AND a.user_id = 9</code>.",
     "<code>COUNT(a.user_id)</code> даёт 0 в пустой день."
    ]
   },
   {
    "title": "Среднее с нулями",
    "prompt": "Заполните дневной DAU сентября нулями и выведите одной строкой: <code>days</code> (число дней в календаре), <code>zero_days</code> (дни с DAU = 0), <code>avg_dau</code> (средний DAU за 30 дней, 2 знака).",
    "hints": [
     "Сначала во втором CTE посчитайте <code>dau</code> каждого дня (<code>LEFT JOIN</code>, <code>COUNT(a.user_id)</code>).",
     "<code>SUM(CASE WHEN dau = 0 THEN 1 ELSE 0 END)</code> и <code>ROUND(AVG(dau), 2)</code>. Ответ должен быть 3.27, а не 3.38."
    ]
   },
   {
    "title": "Найти пропуски",
    "prompt": "Выведите периоды, когда пользователь 1 не заходил (пропуски): <code>gap_start</code> (первый день пропуска), <code>gap_end</code> (последний день), <code>missing</code> (число дней в пропуске). Предыдущий активный день возьмите через <code>LAG</code>. Сортировка по <code>gap_start</code>.",
    "hints": [
     "Если между двумя активными днями больше 1 дня, между ними пропуск: <code>WHERE julianday(day) - julianday(prev) &gt; 1</code>.",
     "<code>date(prev, '+1 day')</code>, <code>date(day, '-1 day')</code>, <code>CAST(julianday(day) - julianday(prev) - 1 AS INTEGER)</code>"
    ]
   },
   {
    "title": "Число серий",
    "prompt": "Посчитайте, сколько непрерывных серий (островов) было у каждого пользователя в сентябре: <code>user_id</code>, <code>streaks</code>. Сортировка по <code>user_id</code>.",
    "hints": [
     "Во всех днях одного острова <code>date(day, '-' || rn || ' day')</code> одинаков.",
     "Число островов = число разных меток группы: <code>COUNT(DISTINCT ...)</code>."
    ]
   },
   {
    "title": "Длинные серии",
    "prompt": "Выведите все серии длиной не меньше 5 дней: <code>user_id</code>, <code>start_day</code>, <code>end_day</code>, <code>days</code>. Сортировка по <code>user_id</code>, <code>start_day</code>.",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day)</code>, затем <code>GROUP BY user_id, date(day, '-' || rn || ' day')</code>.",
     "Посчитайте длину серии в CTE и во внешнем запросе поставьте <code>WHERE days &gt;= 5</code> (или <code>HAVING COUNT(*) &gt;= 5</code>)."
    ]
   },
   {
    "title": "Честное среднее за 7 дней",
    "prompt": "Для каждого дня сентября: <code>day</code>, <code>dau</code> (пустой день — 0) и <code>avg7</code> — средний DAU за последние 7 дней включая текущий (<code>ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code>, 2 знака). В первые дни месяца берётся среднее по дням, которые есть в окне. 30 строк, по порядку дат.",
    "hints": [
     "Сначала дневной DAU с нулями (календарь + <code>LEFT JOIN</code>), затем окно: тогда 7 строк = 7 дней.",
     "<code>ROUND(AVG(dau) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2)</code>"
    ]
   }
  ]
 },
 "adv-11": {
  "pr": [
   {
    "title": "Один общий список",
    "prompt": "<b>shop.</b> С помощью <code>UNION ALL</code> соберите в один список имена клиентов и названия товаров: <code>name</code>, <code>kind</code> (<code>'customer'</code> для клиента, <code>'product'</code> для товара).",
    "hints": [
     "У двух запросов должно быть одинаковое число столбцов: <code>SELECT name, 'customer' AS kind FROM customers</code>.",
     "Второй: <code>UNION ALL SELECT name, 'product' FROM products</code>."
    ]
   },
   {
    "title": "Руководители через INTERSECT",
    "prompt": "<b>staff.</b> С помощью <code>INTERSECT</code> выведите <code>id</code> сотрудников, у которых есть хотя бы один подчинённый: это значения, которые встречаются и в столбце <code>id</code>, и в столбце <code>manager_id</code>.",
    "hints": [
     "<code>SELECT id FROM employees INTERSECT SELECT manager_id FROM employees</code>"
    ]
   },
   {
    "title": "Место по зарплате",
    "prompt": "<b>staff.</b> Покажите место каждого сотрудника по зарплате в диапазоне от 0 до 1: <code>name</code>, <code>salary</code>, <code>pr</code> = <code>PERCENT_RANK()</code> по возрастанию зарплаты, <code>ROUND</code> до 2 знаков.",
    "hints": [
     "<code>PERCENT_RANK() OVER (ORDER BY salary)</code>: самая низкая зарплата 0, самая высокая 1."
    ]
   },
   {
    "title": "Доля от зарплаты руководителя",
    "prompt": "<b>staff.</b> Для каждого сотрудника, у которого есть руководитель: <code>name</code>, <code>manager</code> (имя руководителя), <code>pct</code> — сколько процентов от зарплаты руководителя составляет зарплата сотрудника (1 знак).",
    "hints": [
     "Self-join: <code>employees e JOIN employees m ON m.id = e.manager_id</code>. Директор не нужен, поэтому достаточно <code>JOIN</code>.",
     "<code>ROUND(100.0 * e.salary / m.salary, 1)</code>"
    ]
   },
   {
    "title": "Минимальная зарплата отдела",
    "prompt": "<b>staff.</b> С помощью <code>LAST_VALUE</code> найдите в каждом отделе сотрудника с самой низкой зарплатой: <code>department</code>, <code>lowest</code>. Порядок в окне — по убыванию зарплаты. Одна строка на отдел.",
    "hints": [
     "Исходный код ставит каждой строке её же имя: граница по умолчанию заканчивается на текущей строке.",
     "Добавьте <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>, затем <code>DISTINCT</code> оставит одну строку на отдел."
    ]
   },
   {
    "title": "Итоговая строка",
    "prompt": "<b>staff.</b> Сделайте отчёт: фонд зарплаты каждого отдела (<code>department</code>, <code>total</code>), а под ним через <code>UNION ALL</code> итоговая строка по всей компании: <code>'TOTAL'</code> вместо <code>department</code>.",
    "hints": [
     "Первый запрос: <code>GROUP BY department</code>. Второй без группировки: <code>SELECT 'TOTAL', SUM(salary) FROM employees</code>."
    ]
   },
   {
    "title": "Руководитель руководителя",
    "prompt": "<b>staff.</b> Для каждого сотрудника: <code>name</code>, <code>manager</code> (непосредственный руководитель) и <code>skip_manager</code> (руководитель руководителя). Должны быть видны все 12 сотрудников; отсутствующее значение — NULL.",
    "hints": [
     "Возьмите таблицу три раза: <code>e</code> (сотрудник), <code>m</code> (руководитель), <code>g</code> (руководитель руководителя).",
     "<code>LEFT JOIN employees g ON g.id = m.manager_id</code>. Оба JOIN должны быть <code>LEFT</code>, иначе верхние уровни пропадут."
    ]
   },
   {
    "title": "Три уровня клиентов",
    "prompt": "<b>shop.</b> Разбейте клиентов, делавших заказы, на три уровня через <code>NTILE(3)</code> по общей сумме покупок (<code>quantity × price</code>, все статусы): 1 — потратившие больше всех; порядок в окне: по убыванию суммы, при равенстве <code>customer_id</code>. Для каждого уровня: <code>tier</code>, <code>customers</code>, <code>revenue</code>. Сортировка по <code>tier</code>.",
    "hints": [
     "1-й CTE: сумма каждого клиента. 2-й CTE: <code>NTILE(3) OVER (ORDER BY total DESC, customer_id) AS tier</code>.",
     "В конце: <code>GROUP BY tier</code>, <code>COUNT(*)</code>, <code>SUM(total)</code>."
    ]
   }
  ]
 },
 "adv-12": {
  "pr": [
   {
    "title": "Предыдущее событие",
    "prompt": "Выведите события пользователя 7 по времени: <code>ts</code>, <code>event</code>, <code>prev_event</code> (предыдущее событие этого пользователя; у первого — NULL).",
    "hints": [
     "<code>LAG(event) OVER (ORDER BY ts)</code>"
    ]
   },
   {
    "title": "Воронка без порядка",
    "prompt": "Для сравнения сначала посчитайте воронку без учёта порядка: для каждого типа события <code>event</code>, <code>users</code> (уникальные пользователи с этим событием), <code>events</code> (число событий). По убыванию <code>events</code>.",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code> и <code>COUNT(*)</code>, <code>GROUP BY event</code>."
    ]
   },
   {
    "title": "Начало сессии",
    "prompt": "Для событий пользователя 15 выведите <code>ts</code>, <code>event</code> и <code>is_new</code>: 1, если событие первое у пользователя или с предыдущего прошло больше 30 минут, иначе 0. По времени.",
    "hints": [
     "<code>CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END</code>",
     "Для первого события <code>LAG</code> даёт NULL — его тоже считайте началом сессии."
    ]
   },
   {
    "title": "Сессии пользователя",
    "prompt": "Выведите число сессий каждого пользователя (правило: первое событие или перерыв больше 30 минут начинает новую сессию): <code>user_id</code>, <code>sessions</code>. По убыванию <code>sessions</code>, при равенстве по <code>user_id</code>.",
    "hints": [
     "Число сессий пользователя = число его событий, начинающих сессию.",
     "<code>SUM(CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END)</code>, <code>GROUP BY user_id</code>."
    ]
   },
   {
    "title": "Средняя сессия",
    "prompt": "Выведите одну строку по всем сессиям: <code>sessions</code> (число), <code>avg_events</code> (среднее число событий в сессии, 2 знака), <code>avg_minutes</code> (среднее число минут между первым и последним событием, 1 знак).",
    "hints": [
     "Третий CTE: <code>GROUP BY user_id, session_no</code>, внутри <code>COUNT(*)</code> и <code>(julianday(MAX(ts)) - julianday(MIN(ts))) * 1440</code>.",
     "Затем поверх неё <code>COUNT(*)</code>, <code>AVG</code>. Сессий должно быть 128."
    ]
   },
   {
    "title": "Сессии с покупкой",
    "prompt": "В скольких сессиях есть хотя бы одна <code>purchase</code>? Одна строка: <code>sessions</code>, <code>with_purchase</code>, <code>pct</code> (%, 1 знак).",
    "hints": [
     "Метка для каждой сессии: <code>MAX(CASE WHEN event = 'purchase' THEN 1 ELSE 0 END)</code>, <code>GROUP BY user_id, session_no</code>.",
     "<code>ROUND(100.0 * SUM(bought) / COUNT(*), 1)</code>"
    ]
   },
   {
    "title": "Корзина без просмотра",
    "prompt": "Найдите пользователей из push-уведомления, о которых говорилось в уроке: тех, кто сделал <code>cart</code>, но до первой корзины не сделал ни одного <code>view</code> (включая тех, кто вообще не смотрел). Столбцы: <code>user_id</code>, <code>first_cart</code>, <code>first_view</code> (NULL, если нет). По <code>user_id</code>.",
    "hints": [
     "Два CTE: время первой <code>cart</code> и первого <code>view</code> каждого пользователя.",
     "<code>c LEFT JOIN v</code>, условие: <code>v.first_view IS NULL OR v.first_view &gt; c.first_cart</code>. Должно получиться три пользователя."
    ]
   },
   {
    "title": "Купили за час",
    "prompt": "Сколько из пользователей, купивших после первого просмотра, сделали первую покупку в течение 60 минут после него? Одна строка: <code>buyers</code>, <code>within_hour</code>, <code>pct</code> (%, 1 знак). Такую метрику понять проще, чем медиану.",
    "hints": [
     "CTE <code>p</code>: <code>events_ts e JOIN v</code>, <code>e.event = 'purchase' AND e.ts &gt; v.view_ts</code>, <code>MIN(e.ts)</code> на пользователя.",
     "Минуты: <code>(julianday(MIN(e.ts)) - julianday(v.view_ts)) * 1440</code>; затем <code>SUM(CASE WHEN minutes &lt;= 60 THEN 1 ELSE 0 END)</code>."
    ]
   }
  ]
 }
} });
