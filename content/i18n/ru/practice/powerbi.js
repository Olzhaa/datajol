// powerbi practice tasks: Russian text. Code, solutions and checks are in content/practice/powerbi.js.
DJ.i18n.patch({ lessons: {
 "pbi-2": {
  "pr": [
   {
    "title": "Возвращённые заказы",
    "prompt": "Сделайте шаг Filter Rows из Power Query в SQL: выведите столбцы <code>id</code>, <code>customer_id</code> и <code>amount</code> заказов, у которых статус <code>refund</code>.",
    "hints": [
     "<code>WHERE status = 'refund'</code>"
    ]
   },
   {
    "title": "Заказы с пустой суммой",
    "prompt": "Найдём проблему до очистки: выведите столбцы <code>id</code> и <code>customer_id</code> заказов, у которых сумма (<code>amount</code>) пустая.",
    "hints": [
     "Пустое значение: <code>amount IS NULL</code>."
    ]
   },
   {
    "title": "Словарь городов",
    "prompt": "Чтобы создать справочную таблицу, выведите уникальный список городов, в которых живут клиенты (шаг Remove Duplicates).",
    "hints": [
     "<code>SELECT DISTINCT city</code>"
    ]
   },
   {
    "title": "Заполнить пустую сумму",
    "prompt": "Выведите все заказы клиента 18: <code>id</code>, <code>order_date</code> и <code>amount</code>, но вместо пустой суммы пусть будет 0 (шаг Replace Values). Используйте <code>COALESCE</code>.",
    "hints": [
     "<code>COALESCE(amount, 0)</code>"
    ]
   },
   {
    "title": "Добавить город к заказу",
    "prompt": "Сделайте шаг Merge Queries в SQL: добавьте к чистым заказам город клиента и выведите только столбцы <code>id</code>, <code>city</code> и <code>amount</code> заказов из Шымкента. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Merge = JOIN: <code>orders o JOIN customers c ON c.id = o.customer_id</code>.",
     "Добавьте условие по городу к трём условиям чистых данных."
    ]
   },
   {
    "title": "Поиск грязных строк",
    "prompt": "Выведите все строки, которые теряются при очистке: статус не <code>paid</code>, <b>или</b> сумма пустая, <b>или</b> сумма 20 000 и больше. Столбцы: <code>id</code>, <code>status</code>, <code>amount</code>.",
    "hints": [
     "Противоположность чистому условию: объедините три условия с помощью <code>OR</code>."
    ]
   },
   {
    "title": "Чистая выручка по филиалам",
    "prompt": "Сделайте шаг Group By по чистым заказам: для каждого города выведите <code>city</code>, количество заказов <code>orders</code> и сумму <code>revenue</code>. Отсортируйте по убыванию выручки. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Сначала фильтр (WHERE), затем JOIN с городом, в конце <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Широкую таблицу сделать длинной",
    "prompt": "Повторите Unpivot в SQL. В CTE сделайте «широкую» таблицу из чистых заказов: для каждого города <code>jan</code> (выручка за 2024-01) и <code>feb</code> (выручка за 2024-02). Затем сделайте её «длинной» с помощью <code>UNION ALL</code>: <code>city</code>, <code>month</code> (<code>'2024-01'</code> или <code>'2024-02'</code>), <code>amount</code>. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Широкая таблица: <code>SUM(CASE WHEN o.order_date LIKE '2024-01%' THEN o.amount ELSE 0 END) AS jan</code>.",
     "Длинная таблица: <code>SELECT city, '2024-01' AS month, jan AS amount FROM wide UNION ALL SELECT city, '2024-02', feb FROM wide</code>."
    ]
   }
  ]
 },
 "pbi-4": {
  "pr": [
   {
    "title": "Мера Revenue",
    "prompt": "Выведите SQL-аналог меры <code>Revenue = SUM(orders[amount])</code> по чистым заказам: одно число. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>SUM(amount)</code> и три условия чистых данных."
    ]
   },
   {
    "title": "Количество клиентов",
    "prompt": "Выведите SQL-аналог меры <code>COUNTROWS(customers)</code>: количество строк в таблице <code>customers</code>.",
    "hints": [
     "<code>COUNTROWS</code> ≈ <code>COUNT(*)</code>."
    ]
   },
   {
    "title": "Вычисляемый столбец Size",
    "prompt": "Сделайте вычисляемый столбец в SQL: <code>Size = IF(orders[amount] &gt;= 2500, \"Үлкен\", \"Кіші\")</code>. Для чистых заказов клиента 29 выведите <code>id</code>, <code>amount</code> и <code>size</code>. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "В DAX <code>IF</code> ≈ в SQL <code>CASE WHEN ... THEN ... ELSE ... END</code>."
    ]
   },
   {
    "title": "Меры по городам",
    "prompt": "Как в визуале Matrix, выведите по каждому городу две меры: <code>city</code>, <code>revenue</code> (сумма) и <code>orders</code> (количество заказов). Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Город в визуале — <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Уникальные клиенты по каналам",
    "prompt": "Выведите меру <code>DISTINCTCOUNT(orders[customer_id])</code> по каждому каналу (<code>customers.channel</code>): <code>channel</code>, <code>customers</code>. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>DISTINCTCOUNT</code> ≈ <code>COUNT(DISTINCT ...)</code>."
    ]
   },
   {
    "title": "Итоги по Size",
    "prompt": "Сгруппируйте по вычисляемому столбцу: разбейте чистые заказы на группы по столбцу <code>size</code> (<code>amount &gt;= 2500</code> — <code>Үлкен</code>, иначе <code>Кіші</code>) и для каждой группы выведите <code>size</code>, количество заказов и сумму. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Назовите столбец CASE как <code>size</code> и <code>GROUP BY size</code>."
    ]
   },
   {
    "title": "AOV по городам",
    "prompt": "Выведите меру <code>AOV = DIVIDE([Revenue], [Orders])</code> по каждому городу: <code>city</code> и округлённый до целого <code>aov</code>. Отсортируйте по убыванию AOV. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>ROUND(SUM(o.amount) * 1.0 / COUNT(*))</code>",
     "В конце добавьте <code>ORDER BY aov DESC</code>."
    ]
   },
   {
    "title": "Заказ на клиента",
    "prompt": "Новая мера: <code>Orders per Customer = DIVIDE([Orders], [Customers])</code>. Для каждого канала выведите <code>channel</code> и эту меру (с округлением до двух знаков после запятой). Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>[Orders]</code> = <code>COUNT(*)</code>, <code>[Customers]</code> = <code>COUNT(DISTINCT o.customer_id)</code>.",
     "Чтобы избежать целочисленного деления: <code>* 1.0</code>."
    ]
   }
  ]
 },
 "pbi-5": {
  "pr": [
   {
    "title": "Выручка Instagram",
    "prompt": "Выведите SQL-аналог меры <code>CALCULATE([Revenue], customers[channel] = \"instagram\")</code>: сумма чистых заказов канала instagram, одно число. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Фильтр CALCULATE ≈ условие, добавленное в WHERE."
    ]
   },
   {
    "title": "Выручка Алматы",
    "prompt": "Выведите SQL-аналог меры <code>CALCULATE([Revenue], customers[city] = \"Алматы\")</code>: сумма чистых заказов клиентов из Алматы. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>AND c.city = 'Алматы'</code>"
    ]
   },
   {
    "title": "Выручка за январь",
    "prompt": "Мера с фильтром по времени: выведите сумму чистых заказов за январь 2024 года. Не применяйте функцию к дате, пишите через диапазон. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>order_date &gt;= '2024-01-01' AND order_date &lt; '2024-02-01'</code>"
    ]
   },
   {
    "title": "Доля города",
    "prompt": "Повторите меру <code>Share % = DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[city])))</code> в SQL: <code>city</code>, <code>revenue</code> и <code>share_pct</code> (доля в общей выручке, %, с одним знаком после запятой). Сортировка по убыванию выручки. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>ALL</code> снимает фильтр ≈ <code>SUM(SUM(o.amount)) OVER ()</code>."
    ]
   },
   {
    "title": "Instagram и общая рядом",
    "prompt": "В Matrix для каждого города есть две меры: <code>[Instagram Revenue]</code> и <code>[Revenue]</code>. Выведите эту таблицу: <code>city</code>, <code>insta_rev</code> (сумма канала instagram, иначе 0), <code>revenue</code>. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Два разных фильтра в одной строке: <code>SUM(CASE WHEN c.channel = 'instagram' THEN o.amount ELSE 0 END)</code>."
    ]
   },
   {
    "title": "Общая выручка в каждой строке",
    "prompt": "Покажите меру <code>Total Revenue = CALCULATE([Revenue], ALL(customers[channel]))</code>: для каждого канала <code>channel</code>, <code>revenue</code> и общая выручка всех каналов <code>total_revenue</code> (одинаковая в каждой строке). Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>SUM(SUM(o.amount)) OVER ()</code> — это сумма всех групп."
    ]
   },
   {
    "title": "Доля канала внутри города",
    "prompt": "Уберём только часть фильтра: <code>DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[channel])))</code> — фильтр по городу остаётся. Для каждой пары город–канал выведите <code>city</code>, <code>channel</code>, <code>revenue</code> и долю в выручке города <code>share_pct</code> (%, с одним знаком после запятой). Порядок: город, затем канал. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Фильтр по городу должен остаться: <code>OVER (PARTITION BY c.city)</code>.",
     "<code>GROUP BY c.city, c.channel</code>"
    ]
   },
   {
    "title": "Доля Instagram в городе",
    "prompt": "Какой процент выручки каждого города приходится на канал instagram? Выведите <code>city</code> и <code>insta_share</code> (%, с одним знаком после запятой), отсортировав по убыванию доли. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Числитель — сумма instagram (CASE), знаменатель — сумма всего города.",
     "В конце <code>ORDER BY insta_share DESC</code>."
    ]
   }
  ]
 },
 "pbi-6": {
  "pr": [
   {
    "title": "Выручка по месяцам",
    "prompt": "Выведите выручку каждого месяца по чистым заказам: <code>month</code> (<code>substr(order_date, 1, 7)</code>) и <code>revenue</code>. Сортировка по месяцам. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>substr(order_date, 1, 7)</code> из даты получает месяц в виде «2024-03»."
    ]
   },
   {
    "title": "Количество заказов по месяцам",
    "prompt": "По чистым заказам выведите количество заказов в каждом месяце: <code>month</code> и <code>orders</code>. Сортировка по месяцам. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>COUNT(*)</code> и <code>GROUP BY month ORDER BY month</code>."
    ]
   },
   {
    "title": "Выручка первого квартала",
    "prompt": "Выведите чистую выручку первого квартала 2024 года (январь–март) одним числом. Фильтруйте по диапазону дат. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>order_date &gt;= '2024-01-01' AND order_date &lt; '2024-04-01'</code>"
    ]
   },
   {
    "title": "Разница MoM",
    "prompt": "Добавьте к месячной выручке разницу с предыдущим месяцем: <code>month</code>, <code>revenue</code>, <code>diff</code> (<code>revenue − Revenue PM</code>). Сортировка по месяцам. CTE из стартового кода уже готов.",
    "hints": [
     "<code>Revenue PM</code> ≈ <code>LAG(revenue) OVER (ORDER BY month)</code>."
    ]
   },
   {
    "title": "MoM в процентах",
    "prompt": "Выведите меру <code>MoM % = DIVIDE([Revenue] - [Revenue PM], [Revenue PM])</code> в процентах: <code>month</code>, <code>mom_pct</code> (с одним знаком после запятой). В первом месяце будет пусто. Сортировка по месяцам.",
    "hints": [
     "Знаменатель всегда — прошлый месяц: <code>LAG(revenue) OVER (ORDER BY month)</code>.",
     "<code>* 100.0</code> защищает от целочисленного деления."
    ]
   },
   {
    "title": "Накопленное число заказов",
    "prompt": "Посчитайте в CTE ежемесячное количество чистых заказов (<code>month</code>, <code>orders</code>), затем добавьте накопленное количество с начала года с помощью <code>ytd_orders</code>. Сортировка по месяцам. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "<code>TOTALYTD</code> ≈ <code>SUM(...) OVER (ORDER BY month)</code>."
    ]
   },
   {
    "title": "YTD по городам",
    "prompt": "Для каждого города посчитайте в CTE ежемесячную чистую выручку (<code>city</code>, <code>month</code>, <code>revenue</code>), затем добавьте накопленную выручку каждого города с помощью <code>ytd</code>. Порядок: город, затем месяц. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "В CTE используйте <code>GROUP BY c.city, month</code>.",
     "Пусть каждый город начинается с нуля: <code>OVER (PARTITION BY city ORDER BY month)</code>."
    ]
   },
   {
    "title": "Месяц с лучшим ростом",
    "prompt": "Найдите месяц, в котором выручка выросла больше всего в процентах по сравнению с предыдущим месяцем: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (с одним знаком после запятой). Одна строка. Чистый заказ: <code>status = 'paid'</code>, <code>amount</code> не пустое и меньше 20 000.",
    "hints": [
     "Сначала в subquery посчитайте <code>mom_pct</code> каждого месяца.",
     "Затем <code>ORDER BY mom_pct DESC LIMIT 1</code>; первый месяц с NULL уберите."
    ]
   }
  ]
 }
} });
