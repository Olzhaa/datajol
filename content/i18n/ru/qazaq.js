// M3.8 SQL-практикум: Qazaq Market: Russian text. Queries, solutions and the dataset are in content/qazaq.js and content/datasets.js.
// Values stored in the database (cities, categories, product names, segments like «қымбат») stay as they are in the data.
DJ.i18n.patch({
  modules: {
    'm3-8': { intro: 'Практикум после SQL Core и Advanced SQL: более 40 бизнес-вопросов на базе интернет-магазина с 80 клиентами, 308 заказами и 530 товарными строками — от фильтров до когортного анализа. В конце — диалекты PostgreSQL и ClickHouse и экзамен по модулю.' }
  },
  lessons: {
    'qm-1': {
      title: 'Знакомство с базой Qazaq Market: SELECT и сортировка',
      body: `
<p>В этом практикуме вы применяете то, чему научились в SQL Core и Advanced SQL, на одной большой, «близкой к настоящей» базе. <b>Qazaq Market</b> — вымышленный интернет-магазин: клиенты из Алматы, Тараза и Атырау, электроника и книги, заказы за 1,5 года.</p>
<table>
<tr><th>Таблица</th><th>Столбцы</th><th>Что хранит</th></tr>
<tr><td><code>customers</code></td><td>customer_id, full_name, city, registered_at, email</td><td>80 клиентов, у 10 нет email (NULL)</td></tr>
<tr><td><code>products</code></td><td>product_id, name, category, price</td><td>30 товаров, 5 категорий, цена в тенге</td></tr>
<tr><td><code>orders</code></td><td>order_id, customer_id, order_date, status</td><td>308 заказов, 2025–2026 гг., статус: delivered, cancelled, returned</td></tr>
<tr><td><code>order_items</code></td><td>order_id, product_id, quantity, unit_price</td><td>530 строк: каждый товар в заказе</td></tr>
</table>
<p>Сумма заказа отдельно не хранится: вы считаете её по <code>order_items</code> как <code>quantity * unit_price</code>. Так бывает и в реальной работе: готового столбца никто не даст, его нужно собрать самому.</p>
<div class="tip">Перед каждым заданием перескажите вопрос на языке бизнеса: «какая таблица, какие столбцы и какой фильтр мне нужны?»</div>`,
      ex: [
        { prompt: 'Выведите из таблицы products только столбцы name и price.', hints: ['Перечислите столбцы через запятую.'] },
        { prompt: 'Сколько строк в таблице order_items? Посчитайте с помощью COUNT(*).', hints: ['SELECT COUNT(*) FROM ...'] },
        { prompt: 'Выведите название и цену товаров, отсортировав по цене от дорогих к дешёвым.', hints: ['ORDER BY ... DESC'] },
        { prompt: 'Выведите название и цену 5 самых дешёвых товаров.', hints: ['ORDER BY price, затем LIMIT 5.'] },
        { prompt: 'Из каких городов клиенты? Выведите каждый город только один раз и отсортируйте по алфавиту.', hints: ['DISTINCT убирает повторяющиеся значения.'] },
        { prompt: 'С 2026 года НДС составляет 16%. Выведите название каждого товара и его цену без НДС (price / 1.16). Новый столбец назовите price_without_vat и округлите до целого с помощью ROUND.', hints: ['Имя столбцу задаётся через AS.'] },
        { prompt: 'Какие 5 строк вернёт запрос с LIMIT 5, если в нём нет ORDER BY?', options: ['5 самых больших значений', '5 самых маленьких значений', 'Любые 5 строк, порядок не гарантирован', 'Будет ошибка'], explain: 'Без сортировки полагаться на порядок строк в базе нельзя.' }
      ]
    },
    'qm-2': {
      title: 'WHERE: отбираем нужные строки',
      body: `
<p>Фильтр — то, что аналитик пишет чаще всего. Запомните три ловушки:</p>
<ul>
<li>Если <code>AND</code> и <code>OR</code> стоят вместе, ставьте скобки: у <code>AND</code> приоритет выше.</li>
<li>NULL проверяют не через <code>=</code>, а через <code>IS NULL</code>.</li>
<li>Диапазон дат надёжнее записывать как «меньше начала следующего периода»: <code>order_date &gt;= '2026-01-01' AND order_date &lt; '2026-04-01'</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите имена всех клиентов из Тараза.', hints: [`Текстовое значение пишется в одинарных кавычках: 'Тараз'.`] },
        { prompt: 'Выведите товары категории Спорт с ценой от 10 000 до 50 000 тенге (включая обе границы): name, price.', hints: ['BETWEEN и AND.'] },
        { prompt: 'Выведите количество клиентов, которые НЕ из Алматы, Астаны или Шымкента.', hints: ['Используйте NOT IN (...).'] },
        { prompt: 'Выведите имя и город клиентов, у которых нет email (NULL).', hints: ['NULL нельзя сравнивать через =.'] },
        { prompt: 'Выведите товары, в названии которых есть слово «Смарт».', hints: [`LIKE '%...%'`] },
        { prompt: `Выведите количество заказов, сделанных в первом квартале 2026 года (1 января – 31 марта) и не отменённых (status не 'cancelled').`, hints: [`order_date &gt;= '2026-01-01' AND order_date &lt; '2026-04-01'`] },
        { prompt: 'Почему WHERE email = NULL ничего не возвращает?', options: ['Столбца email нет', 'Любое сравнение с NULL даёт неизвестный результат (UNKNOWN)', 'NULL равен нулю', 'Синтаксическая ошибка'], explain: 'Для проверки на NULL используется IS NULL.' },
        { prompt: 'Как вычисляется WHERE a = 1 OR b = 2 AND c = 3?', options: ['(a=1 OR b=2) AND c=3', 'a=1 OR (b=2 AND c=3)', 'Слева направо', 'Выдаст ошибку'], explain: 'Приоритет AND выше, чем OR. Если сомневаетесь, ставьте скобки.' }
      ]
    },
    'qm-3': {
      title: 'Агрегация: по каждому городу, по каждой категории',
      body: `
<p>Вопрос «по каждому ...» = <code>GROUP BY</code>. Условие после группировки (например, «больше 5 заказов») — это <code>HAVING</code>, условие до группировки — <code>WHERE</code>.</p>
<p>Образец расчёта суммы заказа:</p>
<pre><code>SELECT order_id, SUM(quantity * unit_price) AS order_total
FROM order_items
GROUP BY order_id;</code></pre>`,
      ex: [
        { prompt: 'Выведите количество товаров и среднюю цену (округлённую до целого) в каждой категории. Столбцы: category, products_cnt, avg_price.', hints: ['GROUP BY category'] },
        { prompt: 'Выведите количество клиентов в каждом городе, отсортируйте от большего к меньшему (при равенстве — по названию города).', hints: ['ORDER BY 2 DESC, 1'] },
        { prompt: 'Выведите количество заказов по каждому статусу.', hints: ['GROUP BY status'] },
        { prompt: 'По таблице order_items посчитайте сумму каждого заказа (quantity * unit_price) и выведите только заказы с суммой больше 300 000 тенге. Столбцы: order_id, order_total. Отсортируйте по сумме по убыванию (при равенстве — по order_id).', hints: ['Фильтр после группировки — HAVING.'] },
        { prompt: 'Выведите customer_id и количество заказов для клиентов, сделавших больше 5 заказов.', hints: ['Где писать условие COUNT(*) &gt; 5: в WHERE или в HAVING?'] },
        { prompt: 'В чём разница между WHERE и HAVING?', options: ['Разницы нет', 'WHERE фильтрует строки до группировки, HAVING фильтрует группы после группировки', 'HAVING работает только с числами', 'WHERE используется только вместе с GROUP BY'], explain: 'Порядок выполнения запроса: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.' },
        { prompt: 'В чём разница между COUNT(*) и COUNT(email)?', options: ['Они одинаковы', 'COUNT(email) не считает значения NULL', 'COUNT(*) не считает NULL', 'COUNT(email) считает только уникальные значения'], explain: 'Агрегатные функции игнорируют NULL, а COUNT(*) считает строки.' }
      ]
    },
    'qm-4': {
      title: 'JOIN: соединяем клиента, заказ и товар',
      body: `
<p>Если нужна выручка по категориям, соединяются три таблицы: категория лежит в <code>products</code>, количество и цена — в <code>order_items</code>, статус — в <code>orders</code>. Начинайте с самой «мелкой» таблицы (<code>order_items</code>).</p>
<p>Для вопросов вроде «клиенты, которые ни разу не покупали» используется шаблон <code>LEFT JOIN ... WHERE правая.id IS NULL</code>.</p>
<div class="tip">После JOIN всегда проверяйте количество строк. Если в одном заказе 3 товара, заказ превращается в 3 строки: количество заказов считайте через <code>COUNT(DISTINCT o.order_id)</code>.</div>`,
      ex: [
        { prompt: 'Выведите order_id каждого заказа, его дату и полное имя клиента.', hints: ['orders JOIN customers ON ...customer_id'] },
        { prompt: `Выведите выручку (сумму quantity * unit_price) от доставленных заказов (status = 'delivered') по категориям. Отсортируйте по выручке по убыванию.`, hints: ['Нужны три таблицы: order_items, orders, products.'] },
        { prompt: 'Выведите customer_id и имя клиентов, которые не сделали ни одного заказа.', hints: ['LEFT JOIN + WHERE o.order_id IS NULL'] },
        { prompt: 'Выведите названия товаров, которые ни разу не продавались.', hints: ['Начните с таблицы products и сделайте LEFT JOIN.'] },
        { prompt: 'Выведите количество заказов по каждому городу. Клиенты без заказов должны считаться как 0, а все города должны быть видны. Столбцы: city, orders_cnt. Отсортируйте по названию города.', hints: ['Используйте не COUNT(*), а COUNT(o.order_id): почему?'] },
        { prompt: 'customers LEFT JOIN orders: что будет в столбцах orders у клиента без заказов?', options: ['0', `Пустая строка ''`, 'NULL', 'Такой клиент не попадёт в результат'], explain: 'LEFT JOIN сохраняет все строки слева и ставит NULL там, где нет соответствия.' },
        { prompt: 'После JOIN строк оказалось больше, чем ожидалось. Самая вероятная причина?', options: ['В базе ошибка', 'Ключ соединения не уникален на одной из сторон (связь «один ко многим»)', 'Нет ORDER BY', 'Не поставлен LIMIT'], explain: 'Если в одном заказе 3 товара, строка заказа повторяется 3 раза. Это нужно учитывать при подсчёте суммы.' }
      ]
    },
    'qm-5': {
      title: 'CASE WHEN, даты и доля',
      body: `
<p><code>CASE WHEN</code> — это «ЕСЛИ» в SQL. Вместе с агрегатом им считают долю:</p>
<pre><code>SELECT ROUND(100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 1) AS cancel_rate_pct
FROM orders;</code></pre>
<p>Функции дат зависят от базы. Здесь SQLite: месяц даёт <code>strftime('%Y-%m', order_date)</code>, год — <code>strftime('%Y', order_date)</code>. В PostgreSQL вместо них используются <code>TO_CHAR</code> и <code>DATE_TRUNC</code>.</p>
<div class="tip">При делении двух целых чисел дробная часть теряется: <code>7 / 2 = 3</code>. Когда считаете долю, умножайте на <code>100.0</code>.</div>`,
      ex: [
        { prompt: `Разделите товары на ценовые сегменты: дешевле 10 000 — 'арзан' (дешёвые), 10 000–99 999 — 'орташа' (средние), 100 000 и дороже — 'қымбат' (дорогие). Выведите количество товаров в каждом сегменте. Столбцы: segment, cnt.`, hints: ['CASE WHEN ... THEN ... ELSE ... END, затем GROUP BY.'] },
        { prompt: `Выведите количество заказов по месяцам (все статусы). Столбцы: month (в формате 'YYYY-MM'), orders_cnt. Отсортируйте по месяцу.`, hints: [`SQLite: strftime('%Y-%m', order_date). PostgreSQL: TO_CHAR(order_date, 'YYYY-MM').`] },
        { prompt: 'Выведите долю отмен в каждом году (заказы cancelled / все заказы, в процентах, с округлением до 1 знака). Столбцы: year, cancel_rate_pct.', hints: [`SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END). При делении целых чисел не забудьте умножить на 100.0.`] },
        { prompt: 'Выведите имя клиента (часть full_name до пробела) и год регистрации. Столбцы: first_name, reg_year. Выведите только зарегистрированных в 2026 году, отсортировав по customer_id.', hints: [`SQLite: substr(full_name, 1, instr(full_name, ' ') - 1). PostgreSQL: split_part(full_name, ' ', 1).`, `2026 год: registered_at &gt;= '2026-01-01' AND registered_at &lt; '2027-01-01' (не забудьте верхнюю границу).`] },
        { prompt: 'Что вернёт SELECT 7 / 2 в SQLite и PostgreSQL?', options: ['3.5', '3', '4', 'Ошибку'], explain: 'При делении целого на целое дробная часть отбрасывается. 7.0 / 2 = 3.5.' },
        { prompt: 'Что вернёт CASE WHEN, если ни одно условие не выполнилось, а ELSE нет?', options: ['0', 'Пустую строку', 'NULL', 'Ошибку'], explain: 'Если ELSE нет, результатом будет NULL.' }
      ]
    },
    'qm-6': {
      title: 'Подзапрос и CTE',
      body: `
<p>Разбейте сложный вопрос на шаги: сначала промежуточный результат внутри <code>WITH</code> (например, сумма каждого заказа), затем итоговый расчёт поверх него (средний чек).</p>
<p>Для вопроса «купил хотя бы один раз ...» удобны <code>IN (подзапрос)</code> или <code>EXISTS</code>: в отличие от JOIN они не размножают строки.</p>`,
      ex: [
        { prompt: 'Выведите товары, цена которых выше средней цены всех товаров: name, price.', hints: ['WHERE price &gt; (SELECT AVG(price) FROM products)'] },
        { prompt: 'Выведите количество клиентов, которые хотя бы раз купили товар категории Электроника.', hints: ['IN (подзапрос) или COUNT(DISTINCT ...).'] },
        { prompt: 'С помощью WITH: сначала посчитайте сумму каждого доставленного (delivered) заказа, затем выведите средний чек (округлив до целого). Столбец: avg_check.', hints: ['WITH order_totals AS (...) SELECT ... FROM order_totals'] },
        { prompt: 'Посчитайте общую выручку каждого клиента от доставленных заказов и выведите ТОП-5 клиентов: full_name, city, revenue. По убыванию выручки.', hints: ['В CTE — сумма по customer_id, затем JOIN с customers.'] },
        { prompt: 'Зачем нужен CTE (WITH)?', options: ['Только чтобы ускорить запрос', 'Чтобы разбить длинный запрос на именованные шаги и облегчить чтение', 'Чтобы сохранить таблицу в базе', 'Чтобы создать индекс'], explain: 'CTE — временный именованный результат внутри запроса. В базе он не сохраняется.' },
        { prompt: 'В чём разница между IN (подзапрос) и JOIN?', options: ['IN не размножает строки, а JOIN при связи «один ко многим» может размножить', 'Разницы нет', 'IN работает только с числами', 'JOIN не поддерживает подзапросы'], explain: 'Поэтому для вопросов вроде «купил хотя бы один раз» удобны IN или EXISTS.' }
      ]
    },
    'qm-7': {
      title: 'Оконные функции: рейтинг, накопительная сумма, LAG',
      body: `
<p>Оконная функция сохраняет количество строк и добавляет рядом с каждой строкой расчёт по группе. Шаблон «ТОП-1 в каждой группе»:</p>
<pre><code>WITH r AS (
  SELECT category, name, price,
         ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn
  FROM products
)
SELECT category, name, price FROM r WHERE rn = 1;</code></pre>
<p>Накопительная сумма: <code>SUM(x) OVER (ORDER BY month)</code>. Разница с предыдущим месяцем: <code>x - LAG(x) OVER (ORDER BY month)</code>.</p>`,
      ex: [
        { prompt: 'Внутри каждой категории расставьте товары в рейтинге по цене (самый дорогой — 1). Столбцы: category, name, price, price_rank. Отсортируйте по категории и рейтингу.', hints: ['RANK() OVER (PARTITION BY category ORDER BY price DESC)'] },
        { prompt: 'Выведите только самый дорогой товар в каждой категории: category, name, price.', hints: ['Сначала ROW_NUMBER() в CTE, затем WHERE rn = 1.'] },
        { prompt: 'Месячная выручка от доставленных заказов и накопительная (кумулятивная) выручка. Столбцы: month, revenue, running_total. Отсортируйте по месяцу.', hints: ['SUM(revenue) OVER (ORDER BY month)'] },
        { prompt: 'Выведите количество заказов по месяцам (все статусы) и его разницу с предыдущим месяцем. Столбцы: month, orders_cnt, diff_vs_prev (в первом месяце NULL). Отсортируйте по месяцу.', hints: ['LAG(orders_cnt) OVER (ORDER BY month)'] },
        { prompt: 'Выведите дату первого заказа каждого клиента (только тех, у кого есть заказы): customer_id, first_order_date. Отсортируйте по customer_id. Решите оконной функцией ROW_NUMBER.', hints: ['PARTITION BY customer_id ORDER BY order_date, order_id'] },
        { prompt: 'Главное отличие GROUP BY от оконной функции?', options: ['Отличия нет', 'GROUP BY сворачивает строки и уменьшает их число, оконная функция сохраняет количество строк', 'Оконная функция работает только с числами', 'GROUP BY быстрее'], explain: 'Оконная функция добавляет рядом с каждой строкой результат расчёта по группе.' },
        { prompt: 'Цены равны 500, 500, 300. Что вернут RANK() и ROW_NUMBER()?', options: ['RANK: 1,1,3; ROW_NUMBER: 1,2,3', 'RANK: 1,2,3; ROW_NUMBER: 1,1,3', 'Обе 1,1,2', 'Обе 1,2,3'], explain: 'RANK даёт равным значениям одинаковое место и пропускает следующее. DENSE_RANK дал бы 1,1,2.' }
      ]
    },
    'qm-8': {
      title: 'Мини-проект: когорты и повторные покупки',
      body: `
<p>Вопрос руководителя: <b>«Возвращаются ли к нам клиенты?»</b> Здесь когорту вы определяете по месяцу первого заказа (в базе <code>metrics</code> из Advanced SQL это был месяц регистрации).</p>
<p>Формула разницы в месяцах: <code>(год2 − год1) × 12 + (месяц2 − месяц1)</code>. В SQLite год и месяц получают через <code>CAST(strftime('%Y', d) AS INTEGER)</code>.</p>
<div class="tip">Для портфолио: выложите запросы на GitHub и напишите в README 3–5 выводов и одну бизнес-рекомендацию. Как ограничение укажите, что у последних когорт более поздние месяцы ещё не наступили.</div>`,
      ex: [
        { prompt: 'Определите когорту каждого клиента — месяц, в котором сделан его первый заказ (учитывается первый заказ с любым статусом). Выведите количество клиентов в каждой когорте. Столбцы: cohort_month, customers_cnt. Отсортируйте по месяцу.', hints: ['MIN(order_date) по каждому клиенту, затем strftime.'] },
        { prompt: 'Доля повторных покупок: отношение клиентов, сделавших заказы минимум в 2 разных дня, ко всем клиентам, сделавшим заказ (в процентах, до 1 знака). Столбец: repeat_rate_pct.', hints: ['COUNT(DISTINCT order_date) &gt;= 2'] },
        { prompt: 'Когортная таблица (когорта — месяц первого заказа с любым статусом, активность — заказ с любым статусом): для каждой когорты количество активных клиентов по номеру месяца после первого заказа (0, 1, 2, ...). Столбцы: cohort_month, month_number, active_customers. Только когорты 2025 года и month_number &lt;= 3. Отсортируйте по cohort_month, month_number.', hints: [`Разница в месяцах: (год2 − год1) * 12 + (месяц2 − месяц1). В SQLite год и месяц получают через CAST(strftime('%Y', d) AS INTEGER).`] },
        { prompt: 'Что такое когорта?', options: ['Клиенты из одного города', 'Группа пользователей, совершивших первое действие (например, первый заказ) в один и тот же период', 'Клиенты, которые покупают больше всех', 'Товары одной категории'], explain: 'Когорта объединяется по общей точке старта.' },
        { prompt: 'Что означает retention 25% в 1-й месяц?', options: ['25% клиентов ушли в первый месяц', '25% когорты снова купили в месяц, следующий за первым заказом', 'Выручка выросла на 25%', '25% заказов были возвращены'], explain: 'Retention: какая часть исходной когорты снова была активна в более поздний период.' }
      ]
    },
    'qm-9': {
      title: 'Диалекты PostgreSQL и ClickHouse',
      body: `
<p>На этом сайте запросы выполняются в SQLite, а на работе вас чаще всего ждёт <b>PostgreSQL</b> (основная база) или <b>ClickHouse</b> (аналитическое хранилище). Хорошая новость: <code>SELECT</code>, <code>JOIN</code>, <code>GROUP BY</code>, CTE и оконные функции везде одинаковы. Различия в основном в функциях дат, типов и условных агрегатов. Этот урок — словарь-переводчик.</p>
<table>
<tr><th>Что нужно</th><th>PostgreSQL</th><th>ClickHouse</th><th>SQLite (этот сайт)</th></tr>
<tr><td>Начало месяца</td><td><code>DATE_TRUNC('month', d)</code></td><td><code>toStartOfMonth(d)</code></td><td><code>date(d, 'start of month')</code></td></tr>
<tr><td>Год (число)</td><td><code>EXTRACT(YEAR FROM d)</code></td><td><code>toYear(d)</code></td><td><code>CAST(strftime('%Y', d) AS INTEGER)</code></td></tr>
<tr><td>Прибавить 30 дней</td><td><code>d + INTERVAL '30 days'</code></td><td><code>d + INTERVAL 30 DAY</code></td><td><code>date(d, '+30 day')</code></td></tr>
<tr><td>Разница двух дат</td><td><code>d2 - d1</code></td><td><code>dateDiff('day', d1, d2)</code></td><td><code>julianday(d2) - julianday(d1)</code></td></tr>
<tr><td>Сегодня</td><td><code>CURRENT_DATE</code></td><td><code>today()</code></td><td><code>date('now')</code></td></tr>
<tr><td>Приведение типа</td><td><code>x::numeric</code>, <code>'2026-01-01'::date</code></td><td><code>toFloat64(x)</code>, <code>toDate(s)</code></td><td><code>CAST(x AS REAL)</code></td></tr>
<tr><td>Условный подсчёт</td><td><code>COUNT(*) FILTER (WHERE условие)</code></td><td><code>countIf(условие)</code></td><td><code>SUM(CASE WHEN условие THEN 1 ELSE 0 END)</code></td></tr>
<tr><td>Условная сумма</td><td><code>SUM(x) FILTER (WHERE условие)</code></td><td><code>sumIf(x, условие)</code></td><td><code>SUM(CASE WHEN условие THEN x ELSE 0 END)</code></td></tr>
<tr><td>Число уникальных</td><td><code>COUNT(DISTINCT x)</code></td><td><code>uniqExact(x)</code> (точно), <code>uniq(x)</code> (приблизительно)</td><td><code>COUNT(DISTINCT x)</code></td></tr>
<tr><td>Поиск без учёта регистра</td><td><code>name ILIKE '%смарт%'</code></td><td><code>name ILIKE '%смарт%'</code></td><td><code>LIKE</code> (игнорирует регистр только для латинских букв)</td></tr>
<tr><td>Деление целых чисел: <code>7 / 2</code></td><td>3</td><td>3.5</td><td>3</td></tr>
</table>
<h3>Пример: один запрос, три диалекта</h3>
<p>PostgreSQL:</p>
<pre><code>SELECT DATE_TRUNC('month', order_date)::date AS month,
       COUNT(*) AS orders,
       COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled
FROM orders
WHERE order_date &gt;= DATE '2026-01-01'
GROUP BY 1 ORDER BY 1;</code></pre>
<p>ClickHouse:</p>
<pre><code>SELECT toStartOfMonth(order_date) AS month,
       count() AS orders,
       countIf(status = 'cancelled') AS cancelled
FROM orders
WHERE order_date &gt;= '2026-01-01'
GROUP BY month ORDER BY month;</code></pre>
<p>Логика одна: «обрезать» дату до месяца, посчитать, посчитать с условием. Чтобы перевести запрос на SQLite, берите последний столбец таблицы.</p>
<h3>Различия, которые легко не заметить</h3>
<ul>
<li><b>Деление.</b> В PostgreSQL и SQLite <code>7 / 2 = 3</code>, в ClickHouse — <code>3.5</code>. Привычка писать <code>100.0 *</code> при расчёте доли даёт верный результат в любой базе.</li>
<li><b>Поиск по кириллице.</b> В SQLite <code>LIKE '%смарт%'</code> не найдёт «Смарт-сағат»: для кириллических букв регистр учитывается. В PostgreSQL <code>ILIKE</code> найдёт.</li>
<li><b>Кавычки.</b> Текст всегда в одинарных кавычках: <code>'delivered'</code>. В PostgreSQL двойные кавычки означают имя столбца: <code>"status"</code>.</li>
<li><b>GROUP BY 1.</b> Группировка по номеру столбца работает в PostgreSQL и SQLite, но в длинном запросе имя читать легче.</li>
<li><b>Порядок NULL.</b> При сортировке по возрастанию PostgreSQL ставит NULL в конец, SQLite — в начало. Если это важно, пишите явно: <code>NULLS LAST</code>.</li>
</ul>
<div class="tip">На собеседовании спросите: «на каком диалекте писать?» Если забыли точное название функции, скажите, что хотите сделать: «здесь я обрезаю дату до начала месяца, в PostgreSQL это DATE_TRUNC». Интервьюер оценивает логику, а не синтаксис.</div>`,
      ex: [
        { prompt: 'В запросе PostgreSQL написано <code>price::numeric / 3</code>. Что делает <code>::</code>?', options: ['Объединяет два столбца', 'Меняет тип значения (CAST): здесь целое число становится дробным, и при делении дробная часть не теряется', 'Разделяет таблицу и столбец', 'Начинает комментарий (comment)'], explain: '<code>x::numeric</code> — краткая запись <code>CAST(x AS numeric)</code>. В SQLite пишут <code>CAST(price AS REAL)</code> или <code>price * 1.0</code>.' },
        { prompt: `Какой аналог в SQLite у выражения ClickHouse <code>countIf(status = 'returned')</code>?`, options: [`COUNT(status = 'returned')`, `SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END)`, 'COUNT(DISTINCT status)', `WHERE status = 'returned'`], explain: `Условный подсчёт: если условие выполнено, прибавляется 1, иначе 0. В PostgreSQL: COUNT(*) FILTER (WHERE status = 'returned'). WHERE фильтрует весь запрос, поэтому изменятся и остальные агрегаты.` },
        { prompt: 'Коллега перенёс в ClickHouse запрос <code>SELECT delivered / total AS share</code>, написанный для PostgreSQL (оба столбца целые). Как изменится результат?', options: ['Не изменится', 'В PostgreSQL целочисленное деление давало 0, а в ClickHouse получится дробное число (например, 0.83)', 'ClickHouse выдаст ошибку', 'В обеих будет 0'], explain: 'PostgreSQL при делении целого на целое отбрасывает дробную часть, а в ClickHouse / всегда возвращает дробное число. Чтобы работало одинаково в обеих, пишите <code>100.0 * delivered / total</code>.' },
        { prompt: `Переведите запрос PostgreSQL из урока на SQLite: для каждого месяца 2026 года выведите <code>month</code> (первый день месяца, <code>date(order_date, 'start of month')</code>), <code>orders</code> (все заказы) и <code>cancelled</code> (отменённые). Отсортируйте по месяцу.`, hints: [`DATE_TRUNC('month', order_date) → date(order_date, 'start of month')`, `COUNT(*) FILTER (WHERE status = 'cancelled') → SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)`] },
        { prompt: `Переведите этот запрос ClickHouse на SQLite:<pre><code>SELECT c.city,
       uniqExact(o.customer_id) AS buyers,
       countIf(o.status = 'delivered') AS delivered
FROM orders o JOIN customers c ON c.customer_id = o.customer_id
WHERE toStartOfQuarter(o.order_date) = '2025-10-01'
GROUP BY c.city
ORDER BY delivered DESC, c.city;</code></pre>То есть количество уникальных покупателей и доставленных заказов в каждом городе за 4-й квартал 2025 года (октябрь–декабрь). Столбцы: <code>city</code>, <code>buyers</code>, <code>delivered</code>.`, hints: ['uniqExact(x) → COUNT(DISTINCT x); countIf(условие) → SUM(CASE WHEN условие THEN 1 ELSE 0 END)', `Фильтр по кварталу: order_date &gt;= '2025-10-01' AND order_date &lt; '2026-01-01'`] }
      ]
    },
    'qm-gate': {
      title: 'Экзамен по модулю: SQL-практикум',
      body: `
<p>Итоговая проверка: агрегаты, JOIN, анти-join, оконные функции и доля. Все задания — на базе <code>qazaq</code>. Подсказок нет, но через «Запустить» можно посмотреть промежуточный результат.</p>
<p>Напоминание: сумма заказа считается по <code>order_items</code> как <code>quantity * unit_price</code>; под «выручкой» понимаются только заказы <code>delivered</code>.</p>`,
      ex: [
        { prompt: 'Выведите 3 города с самой высокой выручкой от доставленных заказов: <code>city</code>, <code>revenue</code>. По убыванию выручки.' },
        { prompt: 'Выведите клиентов, которые зарегистрировались в 2026 году, но не имеют ни одного доставленного (<code>delivered</code>) заказа: <code>full_name</code>, <code>city</code>.' },
        { prompt: 'В каждой категории выведите один товар, принёсший наибольшую выручку от доставленных заказов: <code>category</code>, <code>name</code>, <code>revenue</code>.' },
        { prompt: `Месячная выручка за 2026 год и изменение к предыдущему месяцу: <code>month</code> ('YYYY-MM'), <code>revenue</code>, <code>mom_pct</code> (%, 1 знак; в первом месяце NULL). Отсортируйте по месяцу.` },
        { prompt: 'Выручка каждой категории от доставленных заказов и её доля в общей выручке: <code>category</code>, <code>revenue</code>, <code>share_pct</code> (%, 1 знак). По убыванию выручки.' }
      ]
    }
  }
});
