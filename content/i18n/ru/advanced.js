// M3.3 Advanced SQL & Modeling: Russian text. Queries, solutions and the datasets are in content/advanced.js.
// Values stored in the databases (regions, categories like «қымбат») stay in Kazakh, as they are in the data.
DJ.i18n.patch({
  modules: {
    'm3-3': { intro: 'Повседневный SQL аналитика: CTE, оконные функции (window functions), накопительная сумма, top-N, воронка, когортный retention, star schema и скорость запросов. Новая база данных <code>metrics</code> посвящена продуктовым метрикам.' }
  },
  lessons: {
    'adv-1': {
      title: 'CTE: разбиваем запрос на части с помощью WITH',
      body: `
<p>Сложный запрос трудно читать. <b>CTE</b> (Common Table Expression, обобщённое табличное выражение) разбивает запрос на именованные шаги:</p>
<pre><code>WITH revenue AS (
  SELECT o.customer_id, SUM(oi.quantity * p.price) AS total
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  GROUP BY o.customer_id
)
SELECT AVG(total) FROM revenue;</code></pre>
<p>CTE существует только внутри одного запроса. Несколько CTE можно записать через запятую: <code>WITH a AS (...), b AS (...) SELECT ...</code>. Аналитики часто выбирают CTE вместо подзапроса (subquery), потому что его можно читать сверху вниз.</p>
<div class="tip">Правило: один CTE — одна мысль. Если разбить запрос на шаги «выручка», «активные клиенты», «результат», ошибку найти легко.</div>`,
      ex: [
        { prompt: 'С помощью CTE вычислите общую сумму покупок каждого клиента и выведите <code>customer_id</code> и сумму для клиентов, у которых сумма больше 100 000.', hints: ['Возьмите CTE из урока и добавьте WHERE в последний SELECT.'] },
        { prompt: 'В CTE вычислите среднюю цену каждой категории (<code>category</code>). Выведите категории, у которых средняя цена выше средней цены всех товаров, со столбцами <code>category</code> и <code>avg_price</code>.', hints: ['CTE: <code>SELECT category, AVG(price) AS avg_price FROM products GROUP BY category</code>', 'Подзапрос внутри последнего WHERE: <code>(SELECT AVG(price) FROM products)</code>'] }
      ]
    },
    'adv-2': {
      title: 'Оконные функции: OVER и рейтинг',
      body: `
<p>Представьте оценки в классе. <code>GROUP BY</code> даёт одно число: «средний балл класса 4.2», и имена учеников пропадают. А <b>оконная функция</b> (window function) оставляет каждого ученика на своём месте и пишет рядом: «средний балл твоего класса 4.2, ты на 3-м месте».</p>
<p>То есть агрегатная функция сворачивает строки в одну, а оконная функция сохраняет каждую строку и добавляет к ней расчёт по «окну». Это база данных <code>staff</code>: <code>employees(id, name, department, salary, hire_date, manager_id)</code>.</p>
<pre><code>SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;</code></pre>
<p><code>PARTITION BY</code> делит окно на группы, <code>ORDER BY</code> задаёт порядок внутри окна. Если <code>PARTITION BY</code> не указан, вся таблица — одно окно: <code>OVER (ORDER BY salary DESC)</code> даёт рейтинг по всей компании.</p>
<h3>Пример по шагам</h3>
<p>Небольшая таблица:</p>
<table>
<tr><th>name</th><th>department</th><th>salary</th></tr>
<tr><td>Айгүл</td><td>IT</td><td>900</td></tr>
<tr><td>Болат</td><td>IT</td><td>720</td></tr>
<tr><td>Дана</td><td>IT</td><td>720</td></tr>
<tr><td>Ерлан</td><td>Sales</td><td>560</td></tr>
<tr><td>Жанар</td><td>Sales</td><td>640</td></tr>
</table>
<pre><code>SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
FROM employees;</code></pre>
<p>Сначала SQL делит строки по отделам (IT: 3 строки, Sales: 2 строки). Внутри каждого отдела считает среднее: IT = (900 + 720 + 720) / 3 = 780, Sales = (560 + 640) / 2 = 600. Затем внутри отдела сортирует зарплаты по убыванию и присваивает места:</p>
<table>
<tr><th>name</th><th>department</th><th>salary</th><th>dept_avg</th><th>rnk</th></tr>
<tr><td>Айгүл</td><td>IT</td><td>900</td><td>780</td><td>1</td></tr>
<tr><td>Болат</td><td>IT</td><td>720</td><td>780</td><td>2</td></tr>
<tr><td>Дана</td><td>IT</td><td>720</td><td>780</td><td>2</td></tr>
<tr><td>Жанар</td><td>Sales</td><td>640</td><td>600</td><td>1</td></tr>
<tr><td>Ерлан</td><td>Sales</td><td>560</td><td>600</td><td>2</td></tr>
</table>
<p>Количество строк не изменилось: вошло 5 строк, вышло 5 строк. С результатом оконной функции можно делать и арифметику, например вычесть его из <code>salary</code> и получить столбец «насколько выше среднего».</p>
<h3>Функции ранжирования</h3>
<table>
<tr><th>Функция</th><th>При равных значениях</th><th>Пример (900, 720, 720, 560)</th></tr>
<tr><td><code>ROW_NUMBER()</code></td><td>всегда уникальный номер</td><td>1, 2, 3, 4</td></tr>
<tr><td><code>RANK()</code></td><td>одинаковое место, потом пропуск</td><td>1, 2, 2, 4</td></tr>
<tr><td><code>DENSE_RANK()</code></td><td>одинаковое место, без пропуска</td><td>1, 2, 2, 3</td></tr>
<tr><td><code>NTILE(n)</code></td><td>делит строки на n равных групп</td><td>для квартилей</td></tr>
</table>
<div class="tip">Оконная функция вычисляется после выполнения <code>WHERE</code>, поэтому использовать её прямо в <code>WHERE</code> нельзя. Оберните запрос в подзапрос или CTE и фильтруйте снаружи.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Забыть <code>DESC</code>. По умолчанию <code>ORDER BY</code> сортирует по возрастанию, и тогда 1-е место получает самая <b>низкая</b> зарплата.</li>
<li>Забыть <code>PARTITION BY</code>, где он нужен: вместо рейтинга «внутри отдела» получится рейтинг по всей компании.</li>
<li>Написать <code>WHERE rnk &lt;= 3</code> в том же запросе. Это вызовет ошибку: сначала посчитайте рейтинг во внутреннем запросе, а фильтруйте во внешнем.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите имя, отдел, зарплату каждого сотрудника и рейтинг его зарплаты внутри отдела (<code>RANK</code>, от большей к меньшей).', hints: ['<code>PARTITION BY department ORDER BY salary DESC</code>'] },
        { prompt: 'Выведите имя, зарплату каждого сотрудника и разницу со средней зарплатой его отдела (<code>diff</code> = зарплата − среднее по отделу).', hints: ['<code>AVG(salary) OVER (PARTITION BY department)</code> ставит среднее по отделу в каждую строку.'] },
        { prompt: 'Выведите имя и зарплату сотрудников, которые занимают первые 3 «места» в компании по зарплате (<code>DENSE_RANK</code> ≤ 3).', hints: ['Оберните оконную функцию в подзапрос и снаружи напишите <code>WHERE r &lt;= 3</code>.'] }
      ]
    },
    'adv-3': {
      title: 'Накопительная сумма и скользящее среднее',
      body: `
<p>Представьте, что у вас есть копилка. Каждый день вы кладёте в неё деньги. «Сколько я положил сегодня?» — это дневное число. «Сколько всего накопилось в копилке?» — это <b>накопительная сумма</b>. Каждый день она прибавляет сегодняшнее число к предыдущему итогу.</p>
<p>Если в окно добавить <code>ORDER BY</code>, агрегат видит только значения «до текущей строки». Это <b>running total</b> (накопительная сумма):</p>
<pre><code>SELECT day, revenue,
  SUM(revenue) OVER (ORDER BY day) AS running
FROM daily_sales
WHERE region = 'Алматы';</code></pre>
<h3>Пример по шагам</h3>
<p>Выручка одного региона за 5 дней (числа придуманы для учёбы). Столбец <code>running</code> накапливается, <code>ma3</code> — 3-дневное скользящее среднее, о котором ниже:</p>
<table>
<tr><th>day</th><th>revenue</th><th>running</th><th>ma3</th></tr>
<tr><td>1</td><td>100</td><td>100</td><td>100 / 1 = 100</td></tr>
<tr><td>2</td><td>120</td><td>100 + 120 = 220</td><td>(100 + 120) / 2 = 110</td></tr>
<tr><td>3</td><td>90</td><td>220 + 90 = 310</td><td>(100 + 120 + 90) / 3 ≈ 103.33</td></tr>
<tr><td>4</td><td>150</td><td>310 + 150 = 460</td><td>(120 + 90 + 150) / 3 = 120</td></tr>
<tr><td>5</td><td>130</td><td>460 + 130 = 590</td><td>(90 + 150 + 130) / 3 ≈ 123.33</td></tr>
</table>
<p>Последнее значение <code>running</code> (590) равно сумме всех дней. А <code>ma3</code> меняется плавно, а не прыгает с 90 до 150.</p>
<h3>Границы окна: ROWS BETWEEN</h3>
<p>Ежедневные данные «скачут». <b>Скользящее среднее</b> (moving average) сглаживает тренд. Последние 3 дня:</p>
<pre><code>AVG(revenue) OVER (
  PARTITION BY region ORDER BY day
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
) AS ma3</code></pre>
<p><code>2 PRECEDING</code> — 2 предыдущие строки, <code>CURRENT ROW</code> — текущая строка. В первые дни окно неполное, поэтому среднее считается по меньшему числу строк (дни 1 и 2 в таблице). <code>PARTITION BY region</code> держит окно каждого региона отдельно: дни Алматы не попадают в среднее Астаны.</p>
<h3>Доля от итога (share of total)</h3>
<pre><code>revenue * 100.0 / SUM(revenue) OVER (PARTITION BY day)</code></pre>
<p>Например, в какой-то день Алматы заработал 300, а Астана 200. Итог этого дня — 500, поэтому доли: 300 × 100.0 / 500 = 60.0% и 40.0%. Здесь нет <code>ORDER BY</code>: нам нужен итог всего дня, а не «до этой строки».</p>
<p>Важно писать <code>100.0</code>: при делении целого на целое SQLite отбрасывает дробную часть.</p>
<div class="tip"><b>Частые ошибки:</b> (1) <code>ORDER BY</code> внутри <code>OVER</code> задаёт только порядок вычисления. Чтобы был упорядочен сам результат, добавьте <code>ORDER BY</code> и в конце запроса. (2) Если регионов несколько, не забудьте <code>PARTITION BY region</code>, иначе сумма и среднее смешают регионы. (3) Если написать целое <code>100</code>, дробная часть пропадёт: вместо 33.3% получится 33.</div>`,
      ex: [
        { prompt: 'Выведите из таблицы <code>daily_sales</code> по Алматы столбцы <code>day</code>, <code>revenue</code> и накопительную сумму <code>running</code> в порядке дней.', hints: ['<code>SUM(revenue) OVER (ORDER BY day)</code>'] },
        { prompt: 'Для каждого региона выведите <code>region</code>, <code>day</code> и 3-дневное скользящее среднее <code>ma3</code>. Порядок: регион, затем день.', hints: ['<code>PARTITION BY region ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>', 'В конце <code>ORDER BY region, day</code>.'] },
        { prompt: 'Для каждой строки выведите <code>day</code>, <code>region</code> и долю региона в общей выручке этого дня в процентах (<code>share</code>, <code>ROUND</code> до одного знака после запятой).', hints: ['Знаменатель: <code>SUM(revenue) OVER (PARTITION BY day)</code>.', '<code>ROUND(x, 1)</code>'] }
      ]
    },
    'adv-4': {
      title: 'LAG и LEAD: считаем прирост',
      body: `
<p>Допустим, вы каждый день встаёте на весы. «Вчера было 70 кг, сегодня 69.5» — сегодняшнее число обретает смысл при сравнении с <b>предыдущим</b> днём. В SQL строки «не видят» друг друга, но <code>LAG</code> и <code>LEAD</code> позволяют заглянуть к соседу.</p>
<p><code>LAG(col)</code> — значение предыдущей строки, <code>LEAD(col)</code> — значение следующей строки. Они незаменимы для расчёта месячного прироста (month-over-month). Понятие «предыдущая» берётся из порядка внутри <code>OVER (ORDER BY ...)</code>. Столбец может быть любого типа: число, текст, дата. Например, <code>LAG(order_date)</code> даёт дату предыдущего заказа.</p>
<h3>Пример по шагам</h3>
<p>Заказы по месяцам (числа придуманы для учёбы) и результат <code>LAG</code>/<code>LEAD</code>:</p>
<table>
<tr><th>month</th><th>orders</th><th>prev (LAG)</th><th>next (LEAD)</th><th>change</th><th>pct</th></tr>
<tr><td>2024-01</td><td>40</td><td>NULL</td><td>50</td><td>NULL</td><td>NULL</td></tr>
<tr><td>2024-02</td><td>50</td><td>40</td><td>45</td><td>50 − 40 = 10</td><td>10 × 100.0 / 40 = 25.0</td></tr>
<tr><td>2024-03</td><td>45</td><td>50</td><td>54</td><td>45 − 50 = −5</td><td>−5 × 100.0 / 50 = −10.0</td></tr>
<tr><td>2024-04</td><td>54</td><td>45</td><td>NULL</td><td>54 − 45 = 9</td><td>9 × 100.0 / 45 = 20.0</td></tr>
</table>
<p>Процент всегда делится на <b>предыдущее</b> значение: «насколько мы выросли по сравнению с прошлым месяцем». На SQL эту таблицу получают так:</p>
<pre><code>WITH m AS (
  SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders
  FROM orders GROUP BY month
)
SELECT month, orders,
  orders - LAG(orders) OVER (ORDER BY month) AS change
FROM m;</code></pre>
<p>У первого месяца нет предыдущего, поэтому <code>LAG</code> возвращает <code>NULL</code>. Это не ошибка.</p>
<h3>Процентное изменение</h3>
<pre><code>ROUND((x - LAG(x) OVER (ORDER BY d)) * 100.0 / LAG(x) OVER (ORDER BY d), 1)</code></pre>
<p>В этой формуле <code>LAG</code> записан дважды: один раз для разницы, другой — для знаменателя. Если сначала посчитать столбец <code>prev</code> в CTE, внешний запрос станет короче.</p>
<div class="tip"><code>LAG(col, 7)</code> смотрит на 7 строк назад: удобно для сравнения неделя к неделе (week-over-week).</div>
<h3>Частые ошибки</h3>
<ul>
<li>Забыть <code>ORDER BY</code> внутри <code>OVER ()</code>. Без порядка «предыдущая строка» будет случайной.</li>
<li>Не отфильтровать (<code>WHERE</code>) и не разделить (<code>PARTITION BY</code>) данные, когда в таблице несколько регионов или клиентов. Тогда «вчерашним» значением Астаны окажется последний день Алматы.</li>
<li>Делить процент на текущее значение или писать целое <code>100</code>. Знаменатель — предыдущее значение, множитель — <code>100.0</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Для заказов клиента 1 выведите <code>id</code>, <code>order_date</code> и дату предыдущего заказа (<code>prev_date</code>, <code>LAG</code>) в хронологическом порядке.', hints: ['<code>WHERE customer_id = 1</code> + <code>LAG(order_date) OVER (ORDER BY order_date)</code>'] },
        { prompt: 'Вычислите в CTE месячную выручку (<code>month</code>, <code>revenue</code> = quantity × price), добавьте разницу с предыдущим месяцем <code>change</code> и выведите в порядке месяцев. Учитываются заказы со всеми статусами.', hints: ['CTE: соедините (JOIN) таблицы orders, order_items, products и сгруппируйте по <code>substr(o.order_date, 1, 7)</code>.', '<code>revenue - LAG(revenue) OVER (ORDER BY month)</code>'] },
        { prompt: 'Выведите по Астане <code>day</code>, <code>revenue</code> и процентное изменение относительно предыдущего дня (<code>pct</code>, один знак после запятой) в порядке дней.', hints: ['Используйте формулу процентного изменения из урока.'] }
      ]
    },
    'adv-5': {
      title: 'Top-N в каждой группе и удаление дубликатов',
      body: `
<p>«Самый высокооплачиваемый сотрудник каждого отдела», «последний заказ каждого клиента» — самые частые задачи по SQL на собеседованиях. Шаблон всегда один и тот же:</p>
<pre><code>SELECT * FROM (
  SELECT e.*,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees e
)
WHERE rn = 1;</code></pre>
<p><code>rn = 1</code> — по одному из каждой группы, <code>rn &lt;= 3</code> — по три из каждой группы.</p>
<h3>Очистка от дубликатов</h3>
<p>Если один клиент записан в данных дважды, с помощью <code>ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC)</code> вы оставите самую последнюю запись. Это стандартный приём очистки данных (data cleaning).</p>
<div class="tip">Если нужно оставить все равные значения, используйте <code>RANK</code> вместо <code>ROW_NUMBER</code>.</div>`,
      ex: [
        { prompt: 'Выведите самого высокооплачиваемого сотрудника каждого отдела: <code>department</code>, <code>name</code>, <code>salary</code>.', hints: ['Используйте шаблон из урока.'] },
        { prompt: 'Выведите самый последний заказ каждого клиента: <code>customer_id</code>, <code>id</code>, <code>order_date</code>.', hints: ['<code>PARTITION BY customer_id ORDER BY order_date DESC</code>'] },
        { prompt: 'Выведите 2 дня с самой высокой выручкой для каждого региона: <code>region</code>, <code>day</code>, <code>revenue</code>.', hints: ['<code>WHERE rn &lt;= 2</code>'] }
      ]
    },
    'adv-6': {
      title: 'CASE WHEN, pivot и воронка',
      body: `
<p><code>CASE WHEN</code> — это if/else внутри SQL. Он создаёт новую категорию:</p>
<pre><code>SELECT name,
  CASE WHEN price >= 100000 THEN 'қымбат'
       WHEN price >= 10000 THEN 'орташа'
       ELSE 'арзан' END AS segment
FROM products;</code></pre>
<h3>Условная агрегация (pivot)</h3>
<p>Чтобы превратить строки в столбцы, <code>CASE</code> записывают внутри агрегата:</p>
<pre><code>SELECT
  SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders;</code></pre>
<h3>Воронка (funnel)</h3>
<p>В таблице <code>events(user_id, step)</code> есть шаги: <code>visit</code> → <code>cart</code> → <code>purchase</code>. Уникальные пользователи, дошедшие до каждого шага:</p>
<pre><code>COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END) AS cart</code></pre>
<p>Если в <code>CASE</code> нет <code>ELSE</code>, результат будет <code>NULL</code>, а <code>COUNT</code> не считает NULL. Конверсия = следующий шаг / предыдущий шаг.</p>`,
      ex: [
        { prompt: 'Выведите для каждого товара <code>name</code> и столбец <code>segment</code>: если цена ≥ 100 000 — <code>қымбат</code> (дорогой), если ≥ 10 000 — <code>орташа</code> (средний), остальные — <code>арзан</code> (дешёвый).', hints: ['Посмотрите пример из урока.'] },
        { prompt: 'Выведите в одной строке три столбца: количество заказов со статусами <code>delivered</code>, <code>shipped</code>, <code>cancelled</code>.', hints: ['Три <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code>, порядок столбцов: delivered, shipped, cancelled.'] },
        { prompt: 'Выведите воронку в одну строку: количество уникальных пользователей, дошедших до шагов <code>visit</code>, <code>cart</code>, <code>purchase</code>.', hints: ["<code>COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END)</code>"] },
        { prompt: 'В воронку вошли 12 человек (visit), 7 положили товар в корзину (cart), 4 купили (purchase). Какова конверсия cart → purchase в процентах? (с точностью до одного знака после запятой)', explain: '4 / 7 × 100% ≈ 57.1%.' }
      ]
    },
    'adv-7': {
      title: 'Когортный анализ и retention',
      body: `
<p>Представьте выпускников школы: «Сколько выпускников 2020 года придут на встречу и через 5 лет?» Мы следим за теми, кто окончил школу в один год, как за одной группой. В продукте так же: наблюдаем вместе за теми, кто зарегистрировался в один месяц, и смотрим, сколько из них возвращаются.</p>
<p><b>Когорта</b> — группа пользователей, пришедших в одно время, например зарегистрированных в июле. <b>Retention</b> (удержание) — какой процент когорты остаётся активным в последующие месяцы.</p>
<p>База данных <code>metrics</code>: <code>users(id, signup_month, channel)</code> и <code>activity(user_id, month)</code> (месяцы, в которые пользователь был активен).</p>
<h3>Шаг 1: размер когорты</h3>
<pre><code>SELECT signup_month, COUNT(*) AS size FROM users GROUP BY signup_month;</code></pre>
<h3>Шаг 2: активные в каждом месяце</h3>
<pre><code>SELECT u.signup_month AS cohort, a.month, COUNT(DISTINCT a.user_id) AS active
FROM users u JOIN activity a ON a.user_id = u.id
GROUP BY cohort, a.month;</code></pre>
<h3>Шаг 3: перевод в проценты</h3>
<p>Объединяем оба результата через CTE и считаем <code>active * 100.0 / size</code>. Результат — таблица retention: строки — когорты, столбцы — месяцы.</p>
<p>План: шаг 1 вы записываете как CTE внутри <code>WITH</code>. К запросу шага 2 присоединяете (<code>JOIN</code>) этот CTE по <code>signup_month</code>, и тогда в каждой строке будет и размер когорты. В конце округляете до одного знака после запятой через <code>ROUND(..., 1)</code>.</p>
<h3>Пример по шагам</h3>
<p>Две придуманные когорты. Результат шага 1: в январской когорте 10 человек, в февральской — 5. Результат шага 2 (число активных):</p>
<table>
<tr><th>cohort</th><th>size</th><th>2024-01</th><th>2024-02</th><th>2024-03</th></tr>
<tr><td>2024-01</td><td>10</td><td>10</td><td>6</td><td>4</td></tr>
<tr><td>2024-02</td><td>5</td><td>—</td><td>5</td><td>2</td></tr>
</table>
<p>Шаг 3: делим каждую ячейку на размер её когорты. Например, 6 × 100.0 / 10 = 60.0, а 2 × 100.0 / 5 = 40.0:</p>
<table>
<tr><th>cohort</th><th>2024-01</th><th>2024-02</th><th>2024-03</th></tr>
<tr><td>2024-01</td><td>100.0</td><td>60.0</td><td>40.0</td></tr>
<tr><td>2024-02</td><td>—</td><td>100.0</td><td>40.0</td></tr>
</table>
<p>Как читать: из зарегистрированных в январе 60% вернулись в феврале, 40% — в марте. Февральская когорта упала до 40% уже на второй месяц, это хуже январской. Результат SQL выходит в «длинном» формате (<code>cohort</code>, <code>month</code>, <code>retention</code> — каждая ячейка отдельной строкой), а сетка выше — тот же результат, развёрнутый для удобства чтения.</p>
<div class="tip">Если разбить retention по каналу (<code>channel</code>), вы увидите, какая реклама приводит «качественных» клиентов.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Использовать <code>COUNT(*)</code>. Если у человека несколько строк активности в месяце, он будет посчитан несколько раз. Нужен <code>COUNT(DISTINCT a.user_id)</code>.</li>
<li>Делить на число активных в предыдущем месяце. Retention всегда делится на <b>исходный размер</b> когорты.</li>
<li>Писать целое <code>100</code>: <code>2 * 100 / 5</code> даст верный ответ, но <code>1 * 100 / 3</code> даст 33, а не 33.3. Пишите <code>100.0</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите размер каждой когорты: <code>signup_month</code> и <code>size</code>.', hints: ['<code>GROUP BY signup_month</code>'] },
        { prompt: 'Для каждой когорты и месяца выведите число активных пользователей: <code>cohort</code>, <code>month</code>, <code>active</code>. Порядок: когорта, затем месяц.', hints: ['Шаг 2 из урока + <code>ORDER BY cohort, a.month</code>.'] },
        { prompt: 'Выведите таблицу retention: <code>cohort</code>, <code>month</code>, <code>retention</code> (активные / размер когорты × 100, один знак после запятой). Порядок: когорта, месяц.', hints: ['Посчитайте размер когорты в CTE и присоедините его (JOIN) по <code>signup_month</code>.', '<code>ROUND(100.0 * COUNT(DISTINCT a.user_id) / s.n, 1)</code>'] }
      ]
    },
    'adv-8': {
      title: 'Модель данных: star schema',
      body: `
<p>Аналитическая база данных (data warehouse, хранилище данных) обычно строится по схеме <b>«звезда»</b> (star schema): в центре одна таблица <b>фактов</b> (fact), вокруг неё — таблицы <b>измерений</b> (dimension).</p>
<table>
<tr><th></th><th>Таблица фактов</th><th>Таблица измерений</th></tr>
<tr><td>Что хранит</td><td>События и показатели: продажа, сумма, количество</td><td>Описания: товар, клиент, дата, магазин</td></tr>
<tr><td>Число строк</td><td>Очень много (миллионы)</td><td>Мало</td></tr>
<tr><td>Пример</td><td><code>fact_sales(date_key, product_key, quantity, amount)</code></td><td><code>dim_product(product_key, name, category)</code></td></tr>
</table>
<h3>Grain (зернистость)</h3>
<p>Проектируя таблицу фактов, сначала спрашивают: <b>что означает одна строка</b>? «Один товар в одном чеке» или «один магазин за один день»? Нечётко определённый grain — главный источник ошибок в отчётах.</p>
<h3>Нормализация и денормализация</h3>
<p>OLTP-системы (банк, приложение магазина) нормализуют, чтобы уменьшить дублирование. В аналитике таблицы измерений намеренно денормализуют ради быстрого чтения: название категории просто хранится в таблице товаров.</p>
<div class="tip">Power BI и другие BI-инструменты лучше всего работают со star schema. Модель «факты + измерения» правильнее, чем один большой файл «всё в одной таблице».</div>`,
      ex: [
        { prompt: 'Какой из этих столбцов относится к таблице фактов?', options: ['Категория товара', 'Город клиента', 'Сумма продажи', 'Название месяца'], explain: 'Сумма — измеряемое значение, которое можно складывать, то есть факт. Остальное — описания, то есть измерения.' },
        { prompt: 'Grain таблицы фактов — «один товар в одном чеке». Сколько строк будет в таблице, если в одном чеке 3 товара?', options: ['1', '3', '2, независимо от числа товаров', 'Столько же, сколько чеков'], explain: 'Grain даёт отдельную строку на каждый товар: 3 товара = 3 строки.' },
        { prompt: 'Почему в аналитической модели таблицы измерений часто денормализуют?', options: ['Чтобы сэкономить место на диске', 'Чтобы запросы были проще и быстрее', 'Чтобы ускорить транзакции', 'Иначе SQL не работает'], explain: 'В аналитике данные читают гораздо чаще, чем пишут, поэтому выгодно читать с меньшим числом JOIN.' },
        { prompt: 'Создайте в пустой базе данных таблицу фактов <code>fact_sales</code> со столбцами <code>sale_id INTEGER PRIMARY KEY</code>, <code>date_key INTEGER</code>, <code>product_key INTEGER</code>, <code>quantity INTEGER</code>, <code>amount REAL</code>.', hints: ['Разделите столбцы запятыми и укажите тип для каждого.'] }
      ]
    },
    'adv-9': {
      title: 'Скорость запросов: индексы и хорошие привычки',
      body: `
<p>Когда в таблице миллионы строк, скорость запроса становится важной. Главный инструмент — <b>индекс</b>. Он похож на предметный указатель в конце книги: находит нужные строки сразу, не читая всю таблицу.</p>
<pre><code>CREATE INDEX idx_orders_customer ON orders(customer_id);</code></pre>
<p>Индекс полезен для столбцов, которые часто используются в <code>WHERE</code>, <code>JOIN ... ON</code> и <code>ORDER BY</code>. Но каждый индекс замедляет запись и занимает место.</p>
<h3>EXPLAIN</h3>
<p><code>EXPLAIN QUERY PLAN SELECT ...</code> показывает, как база данных выполняет запрос: <code>SCAN</code> — чтение всей таблицы, <code>SEARCH ... USING INDEX</code> — поиск по индексу.</p>
<h3>Хорошие привычки</h3>
<ul>
<li>Вместо <code>SELECT *</code> берите только нужные столбцы.</li>
<li>Не применяйте функции к индексированному столбцу: <code>WHERE substr(order_date,1,4) = '2024'</code> «выключает» индекс, а <code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code> использует его.</li>
<li>Сначала фильтруйте, потом делайте JOIN: меньше строк — быстрее результат.</li>
</ul>`,
      ex: [
        { prompt: 'Создайте индекс на столбце <code>customer_id</code> таблицы <code>orders</code> (имя любое).', hints: ['<code>CREATE INDEX имя ON таблица(столбец);</code>'] },
        { prompt: 'На столбце <code>order_date</code> есть индекс. Какое условие эффективно использует индекс?', options: ["<code>WHERE substr(order_date, 1, 7) = '2024-09'</code>", "<code>WHERE order_date >= '2024-09-01' AND order_date < '2024-10-01'</code>", "<code>WHERE order_date LIKE '%09%'</code>", 'Все три одинаково'], explain: 'Индекс работает, когда сравнивается сам столбец. Функция или % в начале шаблона мешают использовать индекс.' },
        { prompt: 'В результате <code>EXPLAIN QUERY PLAN</code> написано <code>SCAN orders</code>. Что это означает?', options: ['Поиск по индексу', 'Читается вся таблица', 'В запросе ошибка', 'Результат взят из кэша'], explain: 'SCAN — полное чтение. На большой таблице это может быть медленно.' }
      ]
    },
    'adv-gate': {
      title: 'Экзамен модуля: Advanced SQL',
      body: `
<p>Итоговая проверка: CTE, оконные функции, CASE и retention. Подсказок нет, но промежуточный результат можно посмотреть кнопкой «Запустить».</p>
<p>Базы данных: <code>staff</code>, <code>shop</code>, <code>metrics</code>. Над каждым заданием указано, какая база используется.</p>`,
      ex: [
        { prompt: '<b>staff.</b> Выведите сотрудников, занимающих <b>второе</b> место по зарплате в каждом отделе (<code>DENSE_RANK</code> = 2): <code>department</code>, <code>name</code>, <code>salary</code>.' },
        { prompt: '<b>shop.</b> Вычислите в CTE количество заказов каждого клиента и выведите <code>name</code>, <code>orders</code> и рейтинг по количеству заказов (<code>DENSE_RANK</code>, от большего к меньшему, <code>rnk</code>). Клиенты без заказов не включаются.' },
        { prompt: '<b>metrics.</b> Выведите дни в Алматы, когда выручка <b>снизилась</b> по сравнению с предыдущим днём: <code>day</code>, <code>revenue</code>, <code>prev</code> (выручка предыдущего дня).' },
        { prompt: '<b>metrics.</b> Выведите конверсию по каналам (<code>channel</code>): <code>channel</code>, <code>users</code> (число пользователей), <code>buyers</code> (дошедшие до шага <code>purchase</code>). Используйте <code>LEFT JOIN</code> или <code>CASE</code>.' },
        { prompt: 'Почему <code>WHERE RANK() OVER (...) = 1</code> вызывает ошибку?', options: ['RANK работает только в ORDER BY', 'Оконные функции вычисляются после WHERE, поэтому фильтровать нужно снаружи подзапроса/CTE', 'SQLite не поддерживает RANK', 'В WHERE могут быть только числа'], explain: 'Логический порядок: FROM → WHERE → GROUP BY → HAVING → window → SELECT → ORDER BY.' }
      ]
    }
  }
});
