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
<li>Пишите фильтр рано, внутри CTE: запрос легче читать, промежуточный результат становится меньше. Современные оптимизаторы (PostgreSQL, ClickHouse) сами «проталкивают» фильтр до JOIN (predicate pushdown), поэтому это нужно прежде всего для читаемости и защиты от ошибок; скорость проверяйте через <code>EXPLAIN</code>.</li>
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
    },
    'adv-10': {
      title: 'Таблица-календарь и gaps-and-islands',
      body: `
<p><code>GROUP BY day</code> возвращает только те дни, за которые данные <b>есть</b>. Дня, когда никто не заходил, в результате просто не будет. На графике такая «дыра» незаметна, а скользящее среднее считается неверно: 7 строк перестают быть 7 днями. Решение — <b>таблица-календарь</b> (date spine): список всех дней, к которому данные присоединяются через <code>LEFT JOIN</code>.</p>
<p>В этом уроке используется таблица <code>daily_active(user_id, day)</code> из базы <code>metrics</code>: какой пользователь в какой день сентября 2024 года открывал приложение. 15 сентября не зашёл никто.</p>
<h3>Список дней через рекурсивный CTE</h3>
<pre><code>WITH RECURSIVE cal(day) AS (
  SELECT '2024-09-01'                 -- начальная строка
  UNION ALL
  SELECT date(day, '+1 day') FROM cal -- из предыдущей строки строит следующую
  WHERE day &lt; '2024-09-30'           -- условие остановки
)
SELECT day FROM cal;</code></pre>
<p>Рекурсивный CTE состоит из двух частей: первый <code>SELECT</code> выполняется один раз, второй снова и снова применяется к собственному результату, пока условие остановки не станет ложным. Если забыть условие остановки, запрос будет крутиться бесконечно.</p>
<p>В PostgreSQL есть готовая функция: <code>generate_series('2024-09-01'::date, '2024-09-30', interval '1 day')</code>. В хранилищах компаний обычно лежит готовая таблица <code>dim_date</code>.</p>
<h3>Заполнение нулями (zero-fill)</h3>
<pre><code>SELECT c.day, COUNT(a.user_id) AS dau
FROM cal c
LEFT JOIN daily_active a ON a.day = c.day
GROUP BY c.day;</code></pre>
<p>Календарь стоит <b>слева</b>, поэтому каждый день сохраняется. <code>COUNT(a.user_id)</code> не считает NULL, поэтому в пустой день получается 0. Если написать <code>COUNT(*)</code>, пустой день превратится в 1.</p>
<h3>Gaps-and-islands: ищем непрерывные серии</h3>
<p>Вопрос: «Сколько дней подряд заходил пользователь?» Дни, идущие подряд, — это «остров» (island), пустые дни между ними — «разрыв» (gap). Приём такой: из даты вычитаем её порядковый номер. Внутри одного острова и дата, и номер растут вместе на 1, поэтому разность остаётся <b>постоянной</b>.</p>
<table>
<tr><th>day</th><th>rn</th><th>day − rn дней</th><th>Остров</th></tr>
<tr><td>2024-09-01</td><td>1</td><td>2024-08-31</td><td>остров 1</td></tr>
<tr><td>2024-09-02</td><td>2</td><td>2024-08-31</td><td>остров 1</td></tr>
<tr><td>2024-09-04</td><td>3</td><td>2024-09-01</td><td>остров 2</td></tr>
<tr><td>2024-09-05</td><td>4</td><td>2024-09-01</td><td>остров 2</td></tr>
</table>
<pre><code>WITH r AS (
  SELECT day, ROW_NUMBER() OVER (ORDER BY day) AS rn
  FROM daily_active WHERE user_id = 1
), g AS (
  SELECT day, date(day, '-' || rn || ' day') AS grp FROM r
)
SELECT MIN(day) AS start_day, MAX(day) AS end_day, COUNT(*) AS days
FROM g GROUP BY grp;</code></pre>
<p>Этим же способом решаются вопросы «сколько месяцев подряд платил», «сколько времени сервер работал без перерыва», «сколько дней подряд товара не было на складе».</p>
<h3>Частые ошибки</h3>
<ul>
<li>Поставить календарь справа или отфильтровать через <code>WHERE a.user_id = 1</code>: LEFT JOIN превращается в INNER JOIN, пустые дни пропадают. Условие на правую таблицу пишите внутри <code>ON</code>.</li>
<li>Если на один день приходится несколько строк (например, таблица событий), сначала приведите данные к уровню «один пользователь, один день» через <code>DISTINCT</code>. Иначе <code>ROW_NUMBER</code> сломает разность.</li>
<li>Забыть <code>PARTITION BY user_id</code>, когда пользователей несколько.</li>
</ul>
<div class="tip">На собеседованиях часто дают задание «найдите самый длинный streak». Начните ответ с одной фразы: «дата минус ROW_NUMBER остаётся постоянной» — интервьюер сразу увидит, что вы знаете приём.</div>`,
      ex: [
        { prompt: 'С помощью рекурсивного CTE выведите все 30 дней сентября 2024 года. Столбец: <code>day</code> (<code>YYYY-MM-DD</code>), по порядку дат.', hints: [`Вторая часть: <code>SELECT date(day, '+1 day') FROM cal</code>`, `Условие остановки: <code>WHERE day &lt; '2024-09-30'</code>`] },
        { prompt: 'Для каждого дня сентября выведите DAU (число пользователей, заходивших в этот день): <code>day</code>, <code>dau</code>. День, когда никто не заходил, должен быть показан с 0. Всего 30 строк, по порядку дат.', hints: ['<code>FROM cal c LEFT JOIN daily_active a ON a.day = c.day</code>', '<code>COUNT(a.user_id)</code> в пустой день даёт 0, а <code>COUNT(*)</code> — 1.'] },
        { prompt: 'Выведите непрерывные серии (острова) пользователя 1: <code>start_day</code>, <code>end_day</code>, <code>days</code> (число дней в серии). Отсортируйте по дате начала.', hints: [`Метка группы: <code>date(day, '-' || rn || ' day') AS grp</code>`, '<code>GROUP BY grp</code>, затем <code>MIN(day)</code>, <code>MAX(day)</code>, <code>COUNT(*)</code>.'] },
        { prompt: 'Найдите самую длинную серию каждого пользователя в сентябре: <code>user_id</code>, <code>longest</code> (наибольшее число дней захода подряд). По убыванию <code>longest</code>, при равенстве — по <code>user_id</code>.', hints: ['<code>ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day)</code>', 'Сначала через <code>GROUP BY user_id, grp</code> получите длину каждой серии, затем через <code>MAX</code> — самую длинную.'] },
        { prompt: 'В таблице дневных продаж нет строк за 3 дня. Аналитик без календаря посчитал «7-дневное» среднее как <code>AVG(revenue) OVER (ORDER BY day ROWS 6 PRECEDING)</code>. Что здесь неверно?', options: ['Ничего, всё верно', 'Окно берёт не 7 дней, а 7 строк: отсутствующие дни не учитываются как 0, среднее получается завышенным, а окно охватывает период длиннее 7 дней', 'SQLite не поддерживает эту функцию', 'Среднее всегда будет NULL'], explain: 'ROWS считает строки. Сначала сделайте LEFT JOIN с календарём и заполните отсутствующие дни нулями, тогда 7 строк = 7 дней.' }
      ]
    },
    'adv-11': {
      title: 'UNION, self-join, NTILE и FIRST_VALUE',
      body: `
<p>В этом уроке собраны четыре инструмента, которые часто встречаются и на собеседованиях, и в работе: соединение таблицы с самой собой, операции над множествами, разбиение на квартили и получение первого/последнего значения окна.</p>
<h3>Self-join: таблица с самой собой</h3>
<p>В таблице <code>employees</code> базы <code>staff</code> столбец <code>manager_id</code> ссылается на <code>id</code> той же таблицы. Чтобы поставить рядом с сотрудником имя его руководителя, берём таблицу дважды под разными псевдонимами:</p>
<pre><code>SELECT e.name, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;</code></pre>
<p><code>e</code> — сотрудник, <code>m</code> — руководитель. Нужен именно <code>LEFT JOIN</code>: у директора нет руководителя (<code>manager_id</code> равен NULL), и <code>INNER JOIN</code> его потеряет.</p>
<h3>Операции над множествами</h3>
<table>
<tr><th>Оператор</th><th>Что возвращает</th></tr>
<tr><td><code>UNION ALL</code></td><td>Складывает два результата один под другим, повторы сохраняет. Быстро.</td></tr>
<tr><td><code>UNION</code></td><td>Складывает и убирает повторяющиеся строки (нужна сортировка, поэтому медленнее).</td></tr>
<tr><td><code>INTERSECT</code></td><td>Строки, которые есть в обоих результатах.</td></tr>
<tr><td><code>EXCEPT</code></td><td>Строки, которые есть в первом результате и которых нет во втором.</td></tr>
</table>
<p>У двух запросов должно быть одинаковое число столбцов и совместимые типы. Имена столбцов берутся из первого запроса. Если вы знаете, что повторов быть не может, или повторы нужны, пишите <code>UNION ALL</code>.</p>
<h3>NTILE и PERCENT_RANK</h3>
<p><code>NTILE(4) OVER (ORDER BY salary DESC)</code> делит строки на 4 примерно равные по размеру группы: 1 — верхняя четверть (квартиль). <code>NTILE(10)</code> даёт децили. Именно эта функция используется в RFM-сегментации.</p>
<p><code>PERCENT_RANK()</code> показывает место строки в диапазоне от 0 до 1: 0.9 означает «выше 90% остальных».</p>
<p>Если значения равны, NTILE может отправить их в разные группы. Чтобы результат был стабильным, добавьте в <code>ORDER BY</code> второй столбец: <code>ORDER BY salary DESC, name</code>.</p>
<h3>FIRST_VALUE и LAST_VALUE</h3>
<pre><code>SELECT name, department, salary,
  FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS top_name
FROM employees;</code></pre>
<p>В каждую строку записывается имя человека с самой высокой зарплатой в его отделе. Применение: канал первого заказа клиента, первая страница сессии.</p>
<h3>ROWS и RANGE: граница окна</h3>
<p>Если внутри <code>OVER</code> есть <code>ORDER BY</code>, а граница не указана, граница по умолчанию — <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. <code>RANGE</code> включает все строки, <b>значение которых равно</b> значению текущей строки. Отдел аналитики, накопительная сумма по зарплате:</p>
<table>
<tr><th>name</th><th>salary</th><th>RANGE (по умолчанию)</th><th>ROWS</th></tr>
<tr><td>Ерлан</td><td>410 000</td><td>410 000</td><td>410 000</td></tr>
<tr><td>Ақжол</td><td>520 000</td><td>1 450 000</td><td>930 000</td></tr>
<tr><td>Камила</td><td>520 000</td><td>1 450 000</td><td>1 450 000</td></tr>
<tr><td>Гүлнар</td><td>750 000</td><td>2 200 000</td><td>2 200 000</td></tr>
</table>
<p>У Ақжола и Камилы зарплаты равны, поэтому RANGE даёт обоим одинаковую сумму. Если нужна сумма, накапливаемая строка за строкой, пишите явно: <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Писать <code>LAST_VALUE</code> без границы: граница по умолчанию заканчивается на текущей строке, поэтому функция возвращает не «последнее», а текущее значение. Решение: добавить <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> или развернуть порядок и использовать <code>FIRST_VALUE</code>.</li>
<li>Путать псевдонимы в self-join: если вместо <code>ON m.id = e.manager_id</code> написать <code>ON e.id = m.manager_id</code>, руководитель и подчинённый поменяются местами.</li>
<li>Писать <code>UNION</code> по привычке: он молча удаляет повторяющиеся строки, и сумма может уменьшиться.</li>
</ul>
<div class="tip">Быстрый способ сравнить результаты двух запросов: <code>SELECT ... EXCEPT SELECT ...</code>. Если результат пустой, все строки первого запроса есть во втором. Проверяйте в обе стороны.</div>`,
      ex: [
        { prompt: '<b>staff.</b> Выведите имя каждого сотрудника и имя его руководителя: <code>name</code>, <code>manager</code>. Сотрудник без руководителя тоже должен быть в результате (<code>manager</code> равен NULL).', hints: ['Возьмите таблицу дважды: <code>employees e</code> и <code>employees m</code>.', '<code>LEFT JOIN employees m ON m.id = e.manager_id</code>'] },
        { prompt: '<b>staff.</b> Для каждого руководителя: <code>manager</code> (имя), <code>reports</code> (число прямых подчинённых), <code>avg_salary</code> (средняя зарплата подчинённых, <code>ROUND</code> до целого).', hints: ['Self-join: <code>employees e JOIN employees m ON m.id = e.manager_id</code>', 'Группируйте по руководителю: <code>GROUP BY m.id, m.name</code>. Зарплата берётся у подчинённого (<code>e.salary</code>).'] },
        { prompt: '<b>shop.</b> С помощью <code>EXCEPT</code> выведите <code>customer_id</code> клиентов, которые делали заказы, но не имеют ни одного заказа <code>delivered</code>.', hints: ['Первый запрос: все клиенты, делавшие заказы. Второй: те, у кого есть заказ delivered.', `<code>SELECT customer_id FROM orders EXCEPT SELECT customer_id FROM orders WHERE status = 'delivered'</code>`] },
        { prompt: '<b>staff.</b> Разделите сотрудников по зарплате на 4 квартиля (1 — самый высокий): <code>name</code>, <code>salary</code>, <code>quartile</code>. Порядок и в окне, и в результате: по убыванию зарплаты, при равенстве — по <code>name</code>.', hints: ['<code>NTILE(4) OVER (ORDER BY salary DESC, name)</code>'] },
        { prompt: '<b>staff.</b> Для каждого сотрудника выведите имя человека с самой высокой зарплатой в его отделе (<code>top_name</code>) и разницу с этой зарплатой (<code>gap</code>): <code>name</code>, <code>department</code>, <code>salary</code>, <code>top_name</code>, <code>gap</code>.', hints: ['<code>FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC)</code>', '<code>gap</code>: <code>FIRST_VALUE(salary)</code> в том же окне минус <code>salary</code>. Подойдёт и <code>MAX(salary) OVER (PARTITION BY department)</code>.'] }
      ]
    },
    'adv-12': {
      title: 'Сессии и упорядоченная воронка',
      body: `
<p>В продуктовой аналитике данные чаще всего приходят в виде <b>журнала событий</b>: кто, что сделал и когда. В базу <code>qazaq</code> добавлена такая таблица:</p>
<table>
<tr><th>Таблица</th><th>Столбцы</th><th>Что хранит</th></tr>
<tr><td><code>events_ts</code></td><td>user_id, event, ts</td><td>525 событий 50 пользователей за 1–15 марта 2026 года. <code>event</code>: view, cart, checkout, purchase. <code>ts</code>: время в виде <code>'2026-03-01 10:25:00'</code></td></tr>
</table>
<p>Столбца «сессия» в журнале нет. Аналитик собирает его сам.</p>
<h3>Шаг 1: сколько времени прошло с предыдущего события</h3>
<pre><code>SELECT user_id, event, ts,
  (julianday(ts) - julianday(LAG(ts) OVER (PARTITION BY user_id ORDER BY ts))) * 1440 AS gap_min
FROM events_ts;</code></pre>
<p><code>julianday</code> превращает время в число дней. Умножив разность на 1440 (минут в сутках), получаем минуты. Неточность дробных чисел (9.9999 вместо 10) убирает <code>ROUND</code>. В PostgreSQL: <code>EXTRACT(EPOCH FROM ts - LAG(ts) OVER (...)) / 60</code>.</p>
<h3>Шаг 2: отмечаем начало сессии</h3>
<p>Распространённое правило: если между двумя событиями прошло <b>больше 30 минут</b>, начинается новая сессия. Самое первое событие пользователя (<code>gap_min IS NULL</code>) тоже начало сессии.</p>
<pre><code>CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END AS is_new</code></pre>
<h3>Шаг 3: номер сессии</h3>
<p>Накопительная сумма столбца <code>is_new</code> даёт номер сессии: с каждой новой сессией сумма растёт на 1.</p>
<pre><code>SUM(is_new) OVER (PARTITION BY user_id ORDER BY ts) AS session_no</code></pre>
<table>
<tr><th>ts</th><th>event</th><th>gap_min</th><th>is_new</th><th>session_no</th></tr>
<tr><td>03-01 11:10</td><td>checkout</td><td>2</td><td>0</td><td>1</td></tr>
<tr><td>03-01 11:20</td><td>purchase</td><td>10</td><td>0</td><td>1</td></tr>
<tr><td>03-03 09:51</td><td>view</td><td>2791</td><td>1</td><td>2</td></tr>
<tr><td>03-03 09:58</td><td>view</td><td>7</td><td>0</td><td>2</td></tr>
</table>
<p>Теперь через <code>GROUP BY user_id, session_no</code> можно посчитать длительность сессии, число событий и то, закончилась ли она покупкой. В этой базе 128 сессий, 28.9% из них закончились покупкой.</p>
<h3>Упорядоченная воронка</h3>
<p>Простая воронка из Business Analytics считает «пользователей, у которых есть это событие». Но важен <b>порядок</b> событий: добавление в корзину должно быть <b>после</b> просмотра, а покупка — <b>после</b> корзины.</p>
<pre><code>WITH v AS (
  SELECT user_id, MIN(ts) AS view_ts
  FROM events_ts WHERE event = 'view' GROUP BY user_id
), c AS (
  SELECT e.user_id, MIN(e.ts) AS cart_ts
  FROM events_ts e JOIN v ON v.user_id = e.user_id
  WHERE e.event = 'cart' AND e.ts &gt; v.view_ts
  GROUP BY e.user_id
)
SELECT (SELECT COUNT(*) FROM v) AS viewed, (SELECT COUNT(*) FROM c) AS carted;</code></pre>
<p>В этой базе 42 пользователя хотя бы раз добавили товар в корзину, но только 39 из них сделали это после первого просмотра. Остальные трое попали сразу в корзину по ссылке из push-уведомления. Воронка без учёта порядка завышает конверсию.</p>
<h3>Время до конверсии</h3>
<p>Время между первым просмотром и первой покупкой (time-to-convert) подсказывает маркетингу, когда отправлять напоминание. Это распределение обычно сильно скошено: большинство покупает в той же сессии, небольшая часть — через несколько дней. Поэтому показывайте не среднее, а медиану и доли («купили в течение 1 часа»).</p>
<h3>Частые ошибки</h3>
<ul>
<li>Забыть <code>PARTITION BY user_id</code>: событие одного пользователя сравнивается с событием другого.</li>
<li>Вычитать время как текст: <code>ts - LAG(ts)</code> в SQLite даёт разность годов (0). Используйте <code>julianday</code> или <code>strftime('%s', ts)</code>.</li>
<li>Не поставить в воронке условие «после первого события».</li>
<li>Считать порог в 30 минут законом: это всего лишь договорённость. В видеосервисе 30 минут тишины — обычный просмотр, порог выбирают под продукт.</li>
</ul>
<div class="tip">Google Analytics и AppMetrica делят сессии именно по правилу «30 минут бездействия». Если число сессий на дашборде отличается от вашего SQL, сначала проверьте, одинаков ли порог.</div>`,
      ex: [
        { prompt: 'Выведите события пользователя 26 в порядке времени: <code>ts</code>, <code>event</code>, <code>gap_min</code> (минуты, прошедшие с предыдущего события, <code>ROUND</code> до целого; для первого события NULL).', hints: ['<code>LAG(ts) OVER (ORDER BY ts)</code> даёт время предыдущего события.', '<code>ROUND((julianday(ts) - julianday(LAG(ts) OVER (ORDER BY ts))) * 1440)</code>'] },
        { prompt: 'Сколько всего сессий в таблице <code>events_ts</code>? Правило: новую сессию начинает первое событие пользователя или перерыв больше 30 минут после предыдущего события. Столбец: <code>sessions</code>.', hints: ['Число сессий = число событий, начинающих сессию.', '<code>WHERE gap_min IS NULL OR gap_min &gt; 30</code>'] },
        { prompt: 'Выведите сессии пользователей 7 и 26: <code>user_id</code>, <code>session_no</code>, <code>started_at</code> (первое событие сессии), <code>events</code> (число событий). Отсортируйте по <code>user_id</code>, <code>session_no</code>.', hints: ['Три шага: <code>gap_min</code> (LAG), <code>is_new</code> (CASE), <code>session_no</code> (накопительная SUM).', '<code>SUM(CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END) OVER (PARTITION BY user_id ORDER BY ts)</code>', 'Фильтр по пользователям делайте в самом последнем SELECT, затем <code>GROUP BY user_id, session_no</code>.'] },
        { prompt: 'Выведите упорядоченную воронку одной строкой: <code>viewed</code> (сделали хотя бы один <code>view</code>), <code>carted</code> (сделали <code>cart</code> <b>после</b> первого просмотра), <code>purchased</code> (сделали <code>purchase</code> <b>после</b> этой первой корзины).', hints: [`CTE <code>c</code>: <code>events_ts e JOIN v</code>, условие <code>e.event = 'cart' AND e.ts &gt; v.view_ts</code>, для каждого пользователя <code>MIN(e.ts)</code>.`, `CTE <code>p</code> такой же, но соединяется с <code>c</code>: <code>e.event = 'purchase' AND e.ts &gt; c.cart_ts</code>.`, 'В конце: <code>SELECT (SELECT COUNT(*) FROM v) AS viewed, ...</code>'] },
        { prompt: 'Для каждого купившего пользователя выведите, сколько минут прошло от первого просмотра до первой покупки после него: <code>user_id</code>, <code>minutes_to_buy</code> (<code>ROUND</code> до целого). Отсортируйте начиная с самых быстрых.', hints: ['Сначала время первого <code>view</code> каждого пользователя, затем время первой <code>purchase</code> после него.', '<code>ROUND((julianday(buy_ts) - julianday(view_ts)) * 1440)</code>'] }
      ]
    }
  }
});
