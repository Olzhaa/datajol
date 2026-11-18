// M3.3 Advanced SQL & Modeling: English text. Queries, solutions and the datasets are in content/advanced.js.
// Values stored in the databases (regions, categories like "қымбат") stay in Kazakh, as they are in the data.
DJ.i18n.patch({
  modules: {
    'm3-3': { intro: 'An analyst\'s everyday SQL: CTEs, window functions, running totals, top-N, funnels, cohort retention, star schema and query speed. The new <code>metrics</code> database is built for product metrics.' }
  },
  lessons: {
    'adv-1': {
      title: 'CTE: breaking a query into steps with WITH',
      body: `
<p>A complex query is hard to read. A <b>CTE</b> (Common Table Expression) splits a query into named steps:</p>
<pre><code>WITH revenue AS (
  SELECT o.customer_id, SUM(oi.quantity * p.price) AS total
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  GROUP BY o.customer_id
)
SELECT AVG(total) FROM revenue;</code></pre>
<p>A CTE lives only inside one query. You can write several CTEs separated by commas: <code>WITH a AS (...), b AS (...) SELECT ...</code>. Analysts often choose a CTE over a subquery because it reads from top to bottom.</p>
<div class="tip">Rule: one CTE, one idea. If you split the query into steps like "revenue", "active customers", "result", finding a mistake is easy.</div>`,
      ex: [
        { prompt: 'Using a CTE, compute each customer\'s total purchase amount and show <code>customer_id</code> and the total for customers whose total is above 100,000.', hints: ['Take the CTE from the lesson and add a WHERE to the final SELECT.'] },
        { prompt: 'In a CTE, compute the average price of each category (<code>category</code>). Show the categories whose average is higher than the average price of all products, with the columns <code>category</code> and <code>avg_price</code>.', hints: ['CTE: <code>SELECT category, AVG(price) AS avg_price FROM products GROUP BY category</code>', 'A subquery inside the final WHERE: <code>(SELECT AVG(price) FROM products)</code>'] }
      ]
    },
    'adv-2': {
      title: 'Window functions: OVER and ranking',
      body: `
<p>Picture the grades in a class. <code>GROUP BY</code> gives you a single number, "the class average is 4.2", and the students' names disappear. A <b>window function</b> keeps every student in place and writes next to each one: "your class average is 4.2, and you are in 3rd place".</p>
<p>In other words, an aggregate function collapses rows into one, while a window function keeps every row and adds a calculation over a "window" next to it. This is the <code>staff</code> database: <code>employees(id, name, department, salary, hire_date, manager_id)</code>.</p>
<pre><code>SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;</code></pre>
<p><code>PARTITION BY</code> splits the window into groups, and <code>ORDER BY</code> sets the order inside the window. Without <code>PARTITION BY</code>, the whole table is one window: <code>OVER (ORDER BY salary DESC)</code> gives a company-wide ranking.</p>
<h3>Step-by-step example</h3>
<p>A small table:</p>
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
<p>First SQL splits the rows by department (IT: 3 rows, Sales: 2 rows). Inside each department it computes the average: IT = (900 + 720 + 720) / 3 = 780, Sales = (560 + 640) / 2 = 600. Then, inside the department, it sorts salaries in descending order and assigns places:</p>
<table>
<tr><th>name</th><th>department</th><th>salary</th><th>dept_avg</th><th>rnk</th></tr>
<tr><td>Айгүл</td><td>IT</td><td>900</td><td>780</td><td>1</td></tr>
<tr><td>Болат</td><td>IT</td><td>720</td><td>780</td><td>2</td></tr>
<tr><td>Дана</td><td>IT</td><td>720</td><td>780</td><td>2</td></tr>
<tr><td>Жанар</td><td>Sales</td><td>640</td><td>600</td><td>1</td></tr>
<tr><td>Ерлан</td><td>Sales</td><td>560</td><td>600</td><td>2</td></tr>
</table>
<p>The number of rows did not change: 5 rows went in, 5 rows came out. You can also do arithmetic with a window function's result, for example subtract it from <code>salary</code> to get a "how far above average" column.</p>
<h3>Ranking functions</h3>
<table>
<tr><th>Function</th><th>On equal values</th><th>Example (900, 720, 720, 560)</th></tr>
<tr><td><code>ROW_NUMBER()</code></td><td>always a unique number</td><td>1, 2, 3, 4</td></tr>
<tr><td><code>RANK()</code></td><td>same place, then a gap</td><td>1, 2, 2, 4</td></tr>
<tr><td><code>DENSE_RANK()</code></td><td>same place, no gap</td><td>1, 2, 2, 3</td></tr>
<tr><td><code>NTILE(n)</code></td><td>splits the rows into n equal groups</td><td>for quartiles</td></tr>
</table>
<div class="tip">A window function is computed after <code>WHERE</code> runs, so you cannot use it directly in <code>WHERE</code>. Wrap it in a subquery or a CTE and filter outside.</div>
<h3>Common mistakes</h3>
<ul>
<li>Forgetting <code>DESC</code>. By default <code>ORDER BY</code> sorts in ascending order, so the <b>lowest</b> salary gets 1st place.</li>
<li>Forgetting <code>PARTITION BY</code> where it is needed: instead of a ranking "within the department" you get a company-wide ranking.</li>
<li>Writing <code>WHERE rnk &lt;= 3</code> in the same query. It gives an error: compute the ranking in an inner query first and filter in the outer query.</li>
</ul>`,
      ex: [
        { prompt: 'Show each employee\'s name, department, salary and salary rank within the department (<code>RANK</code>, highest first).', hints: ['<code>PARTITION BY department ORDER BY salary DESC</code>'] },
        { prompt: 'Show each employee\'s name, salary and the difference from their department\'s average salary (<code>diff</code> = salary − department average).', hints: ['<code>AVG(salary) OVER (PARTITION BY department)</code> puts the department average on every row.'] },
        { prompt: 'Show the name and salary of the employees who hold the top 3 salary "places" in the company (<code>DENSE_RANK</code> ≤ 3).', hints: ['Wrap the window function in a subquery and write <code>WHERE r &lt;= 3</code> outside.'] }
      ]
    },
    'adv-3': {
      title: 'Running total and moving average',
      body: `
<p>Imagine you have a piggy bank. Every day you put some money in. "How much did I put in today?" is the daily number. "How much is in the piggy bank altogether?" is the <b>running total</b>. Each day it adds today's number to the previous total.</p>
<p>When you add <code>ORDER BY</code> to the window, the aggregate only sees the values "up to this row". This is a <b>running total</b> (cumulative sum):</p>
<pre><code>SELECT day, revenue,
  SUM(revenue) OVER (ORDER BY day) AS running
FROM daily_sales
WHERE region = 'Алматы';</code></pre>
<h3>Step-by-step example</h3>
<p>Five days of revenue for one region (made-up numbers for learning). The <code>running</code> column keeps adding up, and <code>ma3</code> is the 3-day moving average explained below:</p>
<table>
<tr><th>day</th><th>revenue</th><th>running</th><th>ma3</th></tr>
<tr><td>1</td><td>100</td><td>100</td><td>100 / 1 = 100</td></tr>
<tr><td>2</td><td>120</td><td>100 + 120 = 220</td><td>(100 + 120) / 2 = 110</td></tr>
<tr><td>3</td><td>90</td><td>220 + 90 = 310</td><td>(100 + 120 + 90) / 3 ≈ 103.33</td></tr>
<tr><td>4</td><td>150</td><td>310 + 150 = 460</td><td>(120 + 90 + 150) / 3 = 120</td></tr>
<tr><td>5</td><td>130</td><td>460 + 130 = 590</td><td>(90 + 150 + 130) / 3 ≈ 123.33</td></tr>
</table>
<p>The last <code>running</code> value (590) equals the sum of all days. And <code>ma3</code> changes slowly instead of jumping from 90 to 150.</p>
<h3>Window frame: ROWS BETWEEN</h3>
<p>Daily data "jumps around". A <b>moving average</b> smooths out the trend. The last 3 days:</p>
<pre><code>AVG(revenue) OVER (
  PARTITION BY region ORDER BY day
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
) AS ma3</code></pre>
<p><code>2 PRECEDING</code> means the 2 previous rows, <code>CURRENT ROW</code> means this row. In the first days the window is not full, so the average is computed from fewer rows (days 1 and 2 in the table). <code>PARTITION BY region</code> keeps each region's window separate: Almaty's days do not get mixed into Astana's average.</p>
<h3>Share of total</h3>
<pre><code>revenue * 100.0 / SUM(revenue) OVER (PARTITION BY day)</code></pre>
<p>For example, on one day Almaty earned 300 and Astana 200. That day's total is 500, so the shares are 300 × 100.0 / 500 = 60.0% and 40.0%. There is no <code>ORDER BY</code> here: we need the total for the whole day, not "up to this row".</p>
<p>Writing <code>100.0</code> matters: when an integer is divided by an integer, SQLite drops the fractional part.</p>
<div class="tip"><b>Common mistakes:</b> (1) <code>ORDER BY</code> inside <code>OVER</code> only sets the order of the calculation. To get the result itself sorted, also add <code>ORDER BY</code> at the end of the query. (2) If there are several regions, don't forget <code>PARTITION BY region</code>, otherwise the sum and the average mix regions together. (3) If you write the integer <code>100</code>, the fraction is lost: you get 33 instead of 33.3%.</div>`,
      ex: [
        { prompt: 'From the <code>daily_sales</code> table, show Almaty\'s <code>day</code>, <code>revenue</code> and running total <code>running</code>, in day order.', hints: ['<code>SUM(revenue) OVER (ORDER BY day)</code>'] },
        { prompt: 'For each region, show <code>region</code>, <code>day</code> and the 3-day moving average <code>ma3</code>. Order: region, then day.', hints: ['<code>PARTITION BY region ORDER BY day ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>', 'At the end, <code>ORDER BY region, day</code>.'] },
        { prompt: 'For each row, show <code>day</code>, <code>region</code> and the region\'s share of that day\'s total revenue as a percentage (<code>share</code>, <code>ROUND</code> to one decimal place).', hints: ['The denominator: <code>SUM(revenue) OVER (PARTITION BY day)</code>.', '<code>ROUND(x, 1)</code>'] }
      ]
    },
    'adv-4': {
      title: 'LAG and LEAD: computing growth',
      body: `
<p>Say you step on the scales every day. "Yesterday I was 70 kg, today 69.5": what makes today's number meaningful is the comparison with the <b>previous</b> day. In SQL rows don't "see" each other, but <code>LAG</code> and <code>LEAD</code> let you look at the neighbour.</p>
<p><code>LAG(col)</code> is the value from the previous row, <code>LEAD(col)</code> the value from the next row. They are essential for month-over-month growth. What "previous" means comes from the order inside <code>OVER (ORDER BY ...)</code>. The column can be of any type: a number, text, a date. For example, <code>LAG(order_date)</code> gives the date of the previous order.</p>
<h3>Step-by-step example</h3>
<p>Monthly orders (made-up numbers for learning) and the result of <code>LAG</code>/<code>LEAD</code>:</p>
<table>
<tr><th>month</th><th>orders</th><th>prev (LAG)</th><th>next (LEAD)</th><th>change</th><th>pct</th></tr>
<tr><td>2024-01</td><td>40</td><td>NULL</td><td>50</td><td>NULL</td><td>NULL</td></tr>
<tr><td>2024-02</td><td>50</td><td>40</td><td>45</td><td>50 − 40 = 10</td><td>10 × 100.0 / 40 = 25.0</td></tr>
<tr><td>2024-03</td><td>45</td><td>50</td><td>54</td><td>45 − 50 = −5</td><td>−5 × 100.0 / 50 = −10.0</td></tr>
<tr><td>2024-04</td><td>54</td><td>45</td><td>NULL</td><td>54 − 45 = 9</td><td>9 × 100.0 / 45 = 20.0</td></tr>
</table>
<p>The percentage is always divided by the <b>previous</b> value: "how much did we grow compared with last month". In SQL you get this table like this:</p>
<pre><code>WITH m AS (
  SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders
  FROM orders GROUP BY month
)
SELECT month, orders,
  orders - LAG(orders) OVER (ORDER BY month) AS change
FROM m;</code></pre>
<p>The first month has no previous month, so <code>LAG</code> returns <code>NULL</code>. This is not an error.</p>
<h3>Percentage change</h3>
<pre><code>ROUND((x - LAG(x) OVER (ORDER BY d)) * 100.0 / LAG(x) OVER (ORDER BY d), 1)</code></pre>
<p>In this formula <code>LAG</code> is written twice: once for the difference and once for the denominator. If you first compute a <code>prev</code> column in a CTE, the outer query gets shorter.</p>
<div class="tip"><code>LAG(col, 7)</code> looks 7 rows back: handy for week-over-week comparisons.</div>
<h3>Common mistakes</h3>
<ul>
<li>Forgetting <code>ORDER BY</code> inside <code>OVER ()</code>. Without an order, the "previous row" is random.</li>
<li>Not filtering (<code>WHERE</code>) or partitioning (<code>PARTITION BY</code>) when the table has several regions or customers. Then Almaty's last day ends up as Astana's "yesterday" value.</li>
<li>Dividing the percentage by the current value, or writing the integer <code>100</code>. The denominator is the previous value, and the multiplier is <code>100.0</code>.</li>
</ul>`,
      ex: [
        { prompt: 'For customer 1\'s orders, show <code>id</code>, <code>order_date</code> and the previous order\'s date (<code>prev_date</code>, <code>LAG</code>), in time order.', hints: ['<code>WHERE customer_id = 1</code> + <code>LAG(order_date) OVER (ORDER BY order_date)</code>'] },
        { prompt: 'Compute monthly revenue in a CTE (<code>month</code>, <code>revenue</code> = quantity × price), add the difference from the previous month as <code>change</code>, and show it in month order. Orders of every status count.', hints: ['CTE: JOIN the orders, order_items and products tables and group by <code>substr(o.order_date, 1, 7)</code>.', '<code>revenue - LAG(revenue) OVER (ORDER BY month)</code>'] },
        { prompt: 'For Astana, show <code>day</code>, <code>revenue</code> and the percentage change from the previous day (<code>pct</code>, one decimal place), in day order.', hints: ['Use the percentage change formula from the lesson.'] }
      ]
    },
    'adv-5': {
      title: 'Top-N per group and removing duplicates',
      body: `
<p>"The highest-paid employee in each department", "each customer's latest order": these are the SQL tasks you meet most often in interviews. The pattern is always the same:</p>
<pre><code>SELECT * FROM (
  SELECT e.*,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees e
)
WHERE rn = 1;</code></pre>
<p><code>rn = 1</code> gives one from each group, <code>rn &lt;= 3</code> gives three from each group.</p>
<h3>Cleaning up duplicates</h3>
<p>If one customer is recorded twice in the data, <code>ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC)</code> lets you keep only the latest record. This is the standard data cleaning technique.</p>
<div class="tip">If you need to keep all tied values, use <code>RANK</code> instead of <code>ROW_NUMBER</code>.</div>`,
      ex: [
        { prompt: 'Show the highest-paid employee in each department: <code>department</code>, <code>name</code>, <code>salary</code>.', hints: ['Use the pattern from the lesson.'] },
        { prompt: 'Show each customer\'s latest order: <code>customer_id</code>, <code>id</code>, <code>order_date</code>.', hints: ['<code>PARTITION BY customer_id ORDER BY order_date DESC</code>'] },
        { prompt: 'Show the 2 highest-revenue days for each region: <code>region</code>, <code>day</code>, <code>revenue</code>.', hints: ['<code>WHERE rn &lt;= 2</code>'] }
      ]
    },
    'adv-6': {
      title: 'CASE WHEN, pivot and funnels',
      body: `
<p><code>CASE WHEN</code> is if/else inside SQL. It creates a new category:</p>
<pre><code>SELECT name,
  CASE WHEN price >= 100000 THEN 'қымбат'
       WHEN price >= 10000 THEN 'орташа'
       ELSE 'арзан' END AS segment
FROM products;</code></pre>
<h3>Conditional aggregation (pivot)</h3>
<p>To turn rows into columns, put the <code>CASE</code> inside an aggregate:</p>
<pre><code>SELECT
  SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders;</code></pre>
<h3>Funnel</h3>
<p>The <code>events(user_id, step)</code> table holds steps: <code>visit</code> → <code>cart</code> → <code>purchase</code>. The unique users who reached each step:</p>
<pre><code>COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END) AS cart</code></pre>
<p>If the <code>CASE</code> has no <code>ELSE</code>, the result is <code>NULL</code>, and <code>COUNT</code> does not count NULLs. Conversion = next step / previous step.</p>`,
      ex: [
        { prompt: 'Show each product\'s <code>name</code> and a <code>segment</code> column: if the price is ≥ 100,000, <code>қымбат</code> (expensive); if ≥ 10,000, <code>орташа</code> (medium); otherwise <code>арзан</code> (cheap).', hints: ['Look at the example in the lesson.'] },
        { prompt: 'Show three columns in one row: the number of orders with the status <code>delivered</code>, <code>shipped</code> and <code>cancelled</code>.', hints: ['Three <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code>; column order: delivered, shipped, cancelled.'] },
        { prompt: 'Show the funnel in one row: the number of unique users who reached the steps <code>visit</code>, <code>cart</code> and <code>purchase</code>.', hints: ["<code>COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END)</code>"] },
        { prompt: '12 people entered the funnel (visit), 7 added to the cart (cart), and 4 bought (purchase). What is the cart → purchase conversion, in percent? (to one decimal place)', explain: '4 / 7 × 100% ≈ 57.1%.' }
      ]
    },
    'adv-7': {
      title: 'Cohort analysis and retention',
      body: `
<p>Think of school graduates: "How many of the class of 2020 still come to the reunion 5 years later?" We follow everyone who graduated in the same year as one group. It is the same in a product: we track together everyone who signed up in the same month and see how many of them come back.</p>
<p>A <b>cohort</b> is a group of users who arrived at the same time, for example those who signed up in July. <b>Retention</b> is the percentage of the cohort that is still active in later months.</p>
<p>The <code>metrics</code> database: <code>users(id, signup_month, channel)</code> and <code>activity(user_id, month)</code> (the months in which a user was active).</p>
<h3>Step 1: cohort size</h3>
<pre><code>SELECT signup_month, COUNT(*) AS size FROM users GROUP BY signup_month;</code></pre>
<h3>Step 2: active users in each month</h3>
<pre><code>SELECT u.signup_month AS cohort, a.month, COUNT(DISTINCT a.user_id) AS active
FROM users u JOIN activity a ON a.user_id = u.id
GROUP BY cohort, a.month;</code></pre>
<h3>Step 3: turn it into percentages</h3>
<p>We combine the two results with a CTE and compute <code>active * 100.0 / size</code>. The result is a retention table: rows are cohorts, columns are months.</p>
<p>The plan: write step 1 as a CTE inside <code>WITH</code>. <code>JOIN</code> this CTE to the step 2 query on <code>signup_month</code>, so that every row also has the cohort size. At the end, round to one decimal place with <code>ROUND(..., 1)</code>.</p>
<h3>Step-by-step example</h3>
<p>Two made-up cohorts. Result of step 1: the January cohort has 10 people, the February cohort 5. Result of step 2 (number of active users):</p>
<table>
<tr><th>cohort</th><th>size</th><th>2024-01</th><th>2024-02</th><th>2024-03</th></tr>
<tr><td>2024-01</td><td>10</td><td>10</td><td>6</td><td>4</td></tr>
<tr><td>2024-02</td><td>5</td><td>—</td><td>5</td><td>2</td></tr>
</table>
<p>Step 3: divide each cell by the size of its cohort. For example, 6 × 100.0 / 10 = 60.0, and 2 × 100.0 / 5 = 40.0:</p>
<table>
<tr><th>cohort</th><th>2024-01</th><th>2024-02</th><th>2024-03</th></tr>
<tr><td>2024-01</td><td>100.0</td><td>60.0</td><td>40.0</td></tr>
<tr><td>2024-02</td><td>—</td><td>100.0</td><td>40.0</td></tr>
</table>
<p>How to read it: of those who signed up in January, 60% came back in February and 40% in March. The February cohort dropped to 40% already in its second month, which is worse than the January cohort. The SQL result comes out in "long" format (<code>cohort</code>, <code>month</code>, <code>retention</code>, one row per cell), and the grid above is the same thing laid out to be easy on the eye.</p>
<div class="tip">If you split retention by channel (<code>channel</code>), you can see which ads bring "high-quality" customers.</div>
<h3>Common mistakes</h3>
<ul>
<li>Using <code>COUNT(*)</code>. If a person has several activity rows in a month, they are counted several times. You need <code>COUNT(DISTINCT a.user_id)</code>.</li>
<li>Dividing by the previous month's active users. Retention is always divided by the cohort's <b>starting size</b>.</li>
<li>Writing the integer <code>100</code>: <code>2 * 100 / 5</code> happens to come out right, but <code>1 * 100 / 3</code> gives 33, not 33.3. Write <code>100.0</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Show the size of each cohort: <code>signup_month</code> and <code>size</code>.', hints: ['<code>GROUP BY signup_month</code>'] },
        { prompt: 'For each cohort and month, show the number of active users: <code>cohort</code>, <code>month</code>, <code>active</code>. Order: cohort, then month.', hints: ['Step 2 from the lesson + <code>ORDER BY cohort, a.month</code>.'] },
        { prompt: 'Show the retention table: <code>cohort</code>, <code>month</code>, <code>retention</code> (active / cohort size × 100, one decimal place). Order: cohort, month.', hints: ['Compute the cohort size in a CTE and JOIN it on <code>signup_month</code>.', '<code>ROUND(100.0 * COUNT(DISTINCT a.user_id) / s.n, 1)</code>'] }
      ]
    },
    'adv-8': {
      title: 'Data modeling: star schema',
      body: `
<p>An analytical database (data warehouse) is usually built as a <b>star schema</b>: one <b>fact</b> table in the middle, with <b>dimension</b> tables around it.</p>
<table>
<tr><th></th><th>Fact table</th><th>Dimension table</th></tr>
<tr><td>What it stores</td><td>Events and measures: a sale, an amount, a quantity</td><td>Descriptions: product, customer, date, store</td></tr>
<tr><td>Number of rows</td><td>Very many (millions)</td><td>Few</td></tr>
<tr><td>Example</td><td><code>fact_sales(date_key, product_key, quantity, amount)</code></td><td><code>dim_product(product_key, name, category)</code></td></tr>
</table>
<h3>Grain</h3>
<p>When designing a fact table, the first question is <b>what one row means</b>: "one product on one receipt" or "one store on one day"? Not stating the grain clearly is the main source of errors in reports.</p>
<h3>Normalization and denormalization</h3>
<p>OLTP systems (a bank, a shop app) are normalized to reduce duplication. In analytics, dimension tables are deliberately denormalized for fast reading: the category name simply sits in the product table.</p>
<div class="tip">Power BI and other BI tools work best with a star schema. A fact + dimension model is better than one big "everything in one table" file.</div>`,
      ex: [
        { prompt: 'Which of these is a fact table column?', options: ['Product category', 'Customer\'s city', 'Sales amount', 'Month name'], explain: 'The amount is a measured value that can be added up, so it is a fact. The rest are descriptions, so they are dimensions.' },
        { prompt: 'The fact table\'s grain is "one product on one receipt". If a receipt has 3 products, how many rows does the table get?', options: ['1', '3', '2, whatever the number of products', 'Equal to the number of receipts'], explain: 'The grain gives each product its own row: 3 products = 3 rows.' },
        { prompt: 'Why are dimension tables often denormalized in an analytical model?', options: ['To save disk space', 'So that queries are simpler and faster', 'To speed up transactions', 'SQL does not work otherwise'], explain: 'In analytics, data is read far more often than it is written, so reading with fewer JOINs pays off.' },
        { prompt: 'In the empty database, create a fact table <code>fact_sales</code> with the columns <code>sale_id INTEGER PRIMARY KEY</code>, <code>date_key INTEGER</code>, <code>product_key INTEGER</code>, <code>quantity INTEGER</code>, <code>amount REAL</code>.', hints: ['Separate the columns with commas and give each one a type.'] }
      ]
    },
    'adv-9': {
      title: 'Query speed: indexes and good habits',
      body: `
<p>When a table reaches millions of rows, query speed starts to matter. The main tool is an <b>index</b>. It is like the index at the back of a book: it finds the rows you need right away, without reading the whole table.</p>
<pre><code>CREATE INDEX idx_orders_customer ON orders(customer_id);</code></pre>
<p>An index helps for columns that are often used in <code>WHERE</code>, <code>JOIN ... ON</code> and <code>ORDER BY</code>. But every index slows down writes and takes up space.</p>
<h3>EXPLAIN</h3>
<p><code>EXPLAIN QUERY PLAN SELECT ...</code> shows how the database runs a query: <code>SCAN</code> means reading the whole table, <code>SEARCH ... USING INDEX</code> means searching with an index.</p>
<h3>Good habits</h3>
<ul>
<li>Instead of <code>SELECT *</code>, take only the columns you need.</li>
<li>Don't apply functions to an indexed column: <code>WHERE substr(order_date,1,4) = '2024'</code> "switches off" the index, while <code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code> uses it.</li>
<li>Write filters early, inside the CTE: the query is easier to read and the intermediate result gets smaller. Modern optimisers (PostgreSQL, ClickHouse) "push" the filter below the JOIN on their own (predicate pushdown), so this is mainly about readability and avoiding mistakes; check the speed with <code>EXPLAIN</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Create an index on the <code>customer_id</code> column of the <code>orders</code> table (any name).', hints: ['<code>CREATE INDEX name ON table(column);</code>'] },
        { prompt: 'The <code>order_date</code> column has an index. Which condition uses the index efficiently?', options: ["<code>WHERE substr(order_date, 1, 7) = '2024-09'</code>", "<code>WHERE order_date >= '2024-09-01' AND order_date < '2024-10-01'</code>", "<code>WHERE order_date LIKE '%09%'</code>", 'All three equally'], explain: 'The index works when the column itself is compared. A function or a leading % gets in the way of using the index.' },
        { prompt: 'The output of <code>EXPLAIN QUERY PLAN</code> says <code>SCAN orders</code>. What does it mean?', options: ['A search using an index', 'The whole table is read', 'The query has an error', 'The result came from a cache'], explain: 'SCAN is a full read. On a large table this can be slow.' }
      ]
    },
    'adv-gate': {
      title: 'Module exam: Advanced SQL',
      body: `
<p>The final check: CTEs, window functions, CASE and retention. There are no hints, but you can see intermediate results with "Run".</p>
<p>Databases: <code>staff</code>, <code>shop</code>, <code>metrics</code>. Each task shows which database it uses.</p>`,
      ex: [
        { prompt: '<b>staff.</b> In each department, show the employees in <b>second</b> place by salary (<code>DENSE_RANK</code> = 2): <code>department</code>, <code>name</code>, <code>salary</code>.' },
        { prompt: '<b>shop.</b> Compute each customer\'s number of orders in a CTE and show <code>name</code>, <code>orders</code> and a ranking by number of orders (<code>DENSE_RANK</code>, most to fewest, <code>rnk</code>). Customers with no orders are not included.' },
        { prompt: '<b>metrics.</b> Show the days in Almaty when revenue <b>fell</b> compared with the previous day: <code>day</code>, <code>revenue</code>, <code>prev</code> (the previous day\'s revenue).' },
        { prompt: '<b>metrics.</b> Show conversion by channel (<code>channel</code>): <code>channel</code>, <code>users</code> (number of users), <code>buyers</code> (those who reached the <code>purchase</code> step). Use <code>LEFT JOIN</code> or <code>CASE</code>.' },
        { prompt: 'Why does <code>WHERE RANK() OVER (...) = 1</code> give an error?', options: ['RANK only works in ORDER BY', 'Window functions are computed after WHERE, so you must filter outside a subquery/CTE', 'SQLite does not support RANK', 'WHERE can only contain numbers'], explain: 'The logical order: FROM → WHERE → GROUP BY → HAVING → window → SELECT → ORDER BY.' }
      ]
    },
    'adv-10': {
      title: 'Calendar table and gaps-and-islands',
      body: `
<p><code>GROUP BY day</code> returns only the days that <b>have</b> data. A day when nobody logged in is simply missing from the result. On a chart that hole goes unnoticed, and a moving average is computed wrongly: 7 rows are no longer 7 days. The fix is a <b>calendar table</b> (date spine): a list of every day, to which the data is attached with a <code>LEFT JOIN</code>.</p>
<p>This lesson uses the <code>daily_active(user_id, day)</code> table of the <code>metrics</code> database: which user opened the app on which day of September 2024. Nobody logged in on 15 September.</p>
<h3>A list of days with a recursive CTE</h3>
<pre><code>WITH RECURSIVE cal(day) AS (
  SELECT '2024-09-01'                 -- the starting row
  UNION ALL
  SELECT date(day, '+1 day') FROM cal -- builds the next row from the previous one
  WHERE day &lt; '2024-09-30'           -- the stop condition
)
SELECT day FROM cal;</code></pre>
<p>A recursive CTE has two parts: the first <code>SELECT</code> runs once, and the second is applied to its own result again and again until the stop condition becomes false. If you forget the stop condition, the query loops forever.</p>
<p>PostgreSQL has a ready-made function: <code>generate_series('2024-09-01'::date, '2024-09-30', interval '1 day')</code>. Company warehouses usually have a ready <code>dim_date</code> table.</p>
<h3>Zero-fill</h3>
<pre><code>SELECT c.day, COUNT(a.user_id) AS dau
FROM cal c
LEFT JOIN daily_active a ON a.day = c.day
GROUP BY c.day;</code></pre>
<p>The calendar is on the <b>left</b>, so every day is kept. <code>COUNT(a.user_id)</code> does not count NULL, which is why an empty day gives 0. If you write <code>COUNT(*)</code>, an empty day becomes 1.</p>
<h3>Gaps-and-islands: finding unbroken streaks</h3>
<p>The question: "How many days in a row did the user log in?" Consecutive days are an "island", and the empty days between them are a "gap". The trick: subtract the row number from the date. Inside one island the date and the number both grow by 1 together, so the difference stays <b>constant</b>.</p>
<table>
<tr><th>day</th><th>rn</th><th>day − rn days</th><th>Island</th></tr>
<tr><td>2024-09-01</td><td>1</td><td>2024-08-31</td><td>island 1</td></tr>
<tr><td>2024-09-02</td><td>2</td><td>2024-08-31</td><td>island 1</td></tr>
<tr><td>2024-09-04</td><td>3</td><td>2024-09-01</td><td>island 2</td></tr>
<tr><td>2024-09-05</td><td>4</td><td>2024-09-01</td><td>island 2</td></tr>
</table>
<pre><code>WITH r AS (
  SELECT day, ROW_NUMBER() OVER (ORDER BY day) AS rn
  FROM daily_active WHERE user_id = 1
), g AS (
  SELECT day, date(day, '-' || rn || ' day') AS grp FROM r
)
SELECT MIN(day) AS start_day, MAX(day) AS end_day, COUNT(*) AS days
FROM g GROUP BY grp;</code></pre>
<p>The same approach answers "how many months in a row did they pay", "how long did the server run without interruption" and "how many days in a row was the product out of stock".</p>
<h3>Common mistakes</h3>
<ul>
<li>Putting the calendar on the right, or filtering with <code>WHERE a.user_id = 1</code>: the LEFT JOIN turns into an INNER JOIN and the empty days disappear. Write the condition on the right table inside <code>ON</code>.</li>
<li>If there are several rows per day (an events table, for example), first bring the data to "one user, one day" with <code>DISTINCT</code>. Otherwise <code>ROW_NUMBER</code> breaks the difference.</li>
<li>Forgetting <code>PARTITION BY user_id</code> when there are several users.</li>
</ul>
<div class="tip">"Find the longest streak" is a common interview task. Start your answer with one sentence, "the date minus ROW_NUMBER stays constant": the interviewer sees at once that you know the technique.</div>`,
      ex: [
        { prompt: 'Using a recursive CTE, show all 30 days of September 2024. Column: <code>day</code> (<code>YYYY-MM-DD</code>), in date order.', hints: [`The second part: <code>SELECT date(day, '+1 day') FROM cal</code>`, `The stop condition: <code>WHERE day &lt; '2024-09-30'</code>`] },
        { prompt: 'For each day of September, show DAU (the number of users who logged in that day): <code>day</code>, <code>dau</code>. A day when nobody logged in must appear with 0. 30 rows in total, in date order.', hints: ['<code>FROM cal c LEFT JOIN daily_active a ON a.day = c.day</code>', '<code>COUNT(a.user_id)</code> gives 0 on an empty day, while <code>COUNT(*)</code> gives 1.'] },
        { prompt: 'Show the unbroken streaks (islands) of user 1: <code>start_day</code>, <code>end_day</code>, <code>days</code> (the number of days in the streak). Sort by start date.', hints: [`The group label: <code>date(day, '-' || rn || ' day') AS grp</code>`, '<code>GROUP BY grp</code>, then <code>MIN(day)</code>, <code>MAX(day)</code>, <code>COUNT(*)</code>.'] },
        { prompt: 'Find each user\'s longest streak in September: <code>user_id</code>, <code>longest</code> (the largest number of consecutive login days). Sort by <code>longest</code> descending, ties by <code>user_id</code>.', hints: ['<code>ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day)</code>', 'First get the length of each streak with <code>GROUP BY user_id, grp</code>, then take the longest with <code>MAX</code>.'] },
        { prompt: 'A daily sales table has no rows for 3 days. Without a calendar, an analyst computed a "7-day" average as <code>AVG(revenue) OVER (ORDER BY day ROWS 6 PRECEDING)</code>. What is wrong?', options: ['Nothing, it is all correct', 'The window takes 7 rows, not 7 days: the missing days are not counted as 0, so the average comes out too high and the window covers more than 7 days', 'SQLite does not support this function', 'The average will always be NULL'], explain: 'ROWS counts rows. First LEFT JOIN to a calendar and fill the missing days with 0; then 7 rows = 7 days.' }
      ]
    },
    'adv-11': {
      title: 'UNION, self-join, NTILE and FIRST_VALUE',
      body: `
<p>This lesson collects four tools that come up often both in interviews and at work: joining a table to itself, set operations, splitting into quartiles, and taking the first or last value of a window.</p>
<h3>Self-join: a table with itself</h3>
<p>In the <code>employees</code> table of the <code>staff</code> database, the <code>manager_id</code> column points to the <code>id</code> of the same table. To put the manager's name next to each employee, we take the table twice under two different aliases:</p>
<pre><code>SELECT e.name, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;</code></pre>
<p><code>e</code> is the employee and <code>m</code> is the manager. You need a <code>LEFT JOIN</code>: the director has no manager (<code>manager_id</code> is NULL), and an <code>INNER JOIN</code> would lose that row.</p>
<h3>Set operations</h3>
<table>
<tr><th>Operator</th><th>What it returns</th></tr>
<tr><td><code>UNION ALL</code></td><td>Stacks two results on top of each other and keeps duplicates. Fast.</td></tr>
<tr><td><code>UNION</code></td><td>Stacks them and removes duplicate rows (this needs a sort, so it is slower).</td></tr>
<tr><td><code>INTERSECT</code></td><td>The rows that are in both results.</td></tr>
<tr><td><code>EXCEPT</code></td><td>The rows that are in the first result but not in the second.</td></tr>
</table>
<p>The two queries must have the same number of columns and compatible types. Column names come from the first query. If you know duplicates are impossible, or you need the duplicates, write <code>UNION ALL</code>.</p>
<h3>NTILE and PERCENT_RANK</h3>
<p><code>NTILE(4) OVER (ORDER BY salary DESC)</code> splits the rows into 4 groups of roughly equal size: 1 is the top quarter (quartile). <code>NTILE(10)</code> gives deciles. RFM segmentation uses exactly this function.</p>
<p><code>PERCENT_RANK()</code> shows a row's position between 0 and 1: 0.9 means "above 90% of the others".</p>
<p>When values are equal, NTILE may put them into different groups. To make the result stable, add a second column to <code>ORDER BY</code>: <code>ORDER BY salary DESC, name</code>.</p>
<h3>FIRST_VALUE and LAST_VALUE</h3>
<pre><code>SELECT name, department, salary,
  FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS top_name
FROM employees;</code></pre>
<p>Each row gets the name of the highest-paid person in its department. Uses: the channel of a customer's first order, the first page of a session.</p>
<h3>ROWS and RANGE: the window frame</h3>
<p>If <code>OVER</code> has an <code>ORDER BY</code> and no frame is written, the default frame is <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. <code>RANGE</code> includes every row whose <b>value equals</b> that of the current row. The analytics department, a running total by salary:</p>
<table>
<tr><th>name</th><th>salary</th><th>RANGE (default)</th><th>ROWS</th></tr>
<tr><td>Ерлан</td><td>410 000</td><td>410 000</td><td>410 000</td></tr>
<tr><td>Ақжол</td><td>520 000</td><td>1 450 000</td><td>930 000</td></tr>
<tr><td>Камила</td><td>520 000</td><td>1 450 000</td><td>1 450 000</td></tr>
<tr><td>Гүлнар</td><td>750 000</td><td>2 200 000</td><td>2 200 000</td></tr>
</table>
<p>Ақжол and Камила have equal salaries, so RANGE gives both the same total. If you need a total accumulated row by row, write <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> explicitly.</p>
<h3>Common mistakes</h3>
<ul>
<li>Writing <code>LAST_VALUE</code> without a frame: the default frame ends at the current row, so it returns the current value, not the "last" one. The fix: add <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>, or reverse the order and use <code>FIRST_VALUE</code>.</li>
<li>Mixing up the aliases in a self-join: if you write <code>ON e.id = m.manager_id</code> instead of <code>ON m.id = e.manager_id</code>, the manager and the report swap places.</li>
<li>Writing <code>UNION</code> out of habit: it silently removes duplicate rows, and a total may shrink.</li>
</ul>
<div class="tip">A quick way to compare the results of two queries: <code>SELECT ... EXCEPT SELECT ...</code>. If the result is empty, every row of the first query is in the second. Check in both directions.</div>`,
      ex: [
        { prompt: '<b>staff.</b> Show each employee\'s name and their manager\'s name: <code>name</code>, <code>manager</code>. An employee without a manager must appear too (<code>manager</code> is NULL).', hints: ['Take the table twice: <code>employees e</code> and <code>employees m</code>.', '<code>LEFT JOIN employees m ON m.id = e.manager_id</code>'] },
        { prompt: '<b>staff.</b> For each manager: <code>manager</code> (name), <code>reports</code> (number of direct reports), <code>avg_salary</code> (the average salary of the reports, <code>ROUND</code> to a whole number).', hints: ['Self-join: <code>employees e JOIN employees m ON m.id = e.manager_id</code>', 'Group by manager: <code>GROUP BY m.id, m.name</code>. The salary comes from the report (<code>e.salary</code>).'] },
        { prompt: '<b>shop.</b> Using <code>EXCEPT</code>, show the <code>customer_id</code> of the customers who placed orders but have no <code>delivered</code> order at all.', hints: ['The first query: every customer who placed an order. The second: those who have a delivered order.', `<code>SELECT customer_id FROM orders EXCEPT SELECT customer_id FROM orders WHERE status = 'delivered'</code>`] },
        { prompt: '<b>staff.</b> Split the employees into 4 quartiles by salary (1 is the highest): <code>name</code>, <code>salary</code>, <code>quartile</code>. The order, both in the window and in the result: salary descending, ties by <code>name</code>.', hints: ['<code>NTILE(4) OVER (ORDER BY salary DESC, name)</code>'] },
        { prompt: '<b>staff.</b> For each employee, show the name of the highest-paid person in their department (<code>top_name</code>) and the difference from that salary (<code>gap</code>): <code>name</code>, <code>department</code>, <code>salary</code>, <code>top_name</code>, <code>gap</code>.', hints: ['<code>FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC)</code>', '<code>gap</code>: <code>FIRST_VALUE(salary)</code> over the same window minus <code>salary</code>. <code>MAX(salary) OVER (PARTITION BY department)</code> works too.'] }
      ]
    },
    'adv-12': {
      title: 'Sessions and an ordered funnel',
      body: `
<p>In product analytics, data mostly arrives as an <b>event log</b>: who did what, and when. A table like that has been added to the <code>qazaq</code> database:</p>
<table>
<tr><th>Table</th><th>Columns</th><th>What it stores</th></tr>
<tr><td><code>events_ts</code></td><td>user_id, event, ts</td><td>525 events of 50 users from 1–15 March 2026. <code>event</code>: view, cart, checkout, purchase. <code>ts</code>: a time such as <code>'2026-03-01 10:25:00'</code></td></tr>
</table>
<p>The log has no "session" column. The analyst builds it.</p>
<h3>Step 1: how much time has passed since the previous event</h3>
<pre><code>SELECT user_id, event, ts,
  (julianday(ts) - julianday(LAG(ts) OVER (PARTITION BY user_id ORDER BY ts))) * 1440 AS gap_min
FROM events_ts;</code></pre>
<p><code>julianday</code> turns a time into a number of days. Multiply the difference by 1440 (the minutes in a day) and you get minutes. <code>ROUND</code> removes floating-point imprecision (9.9999 instead of 10). In PostgreSQL: <code>EXTRACT(EPOCH FROM ts - LAG(ts) OVER (...)) / 60</code>.</p>
<h3>Step 2: marking the start of a session</h3>
<p>A widely used rule: if <b>more than 30 minutes</b> pass between two events, a new session starts. A user's very first event (<code>gap_min IS NULL</code>) is the start of a session too.</p>
<pre><code>CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END AS is_new</code></pre>
<h3>Step 3: the session number</h3>
<p>The running total of the <code>is_new</code> column gives the session number: the total grows by 1 every time a new session starts.</p>
<pre><code>SUM(is_new) OVER (PARTITION BY user_id ORDER BY ts) AS session_no</code></pre>
<table>
<tr><th>ts</th><th>event</th><th>gap_min</th><th>is_new</th><th>session_no</th></tr>
<tr><td>03-01 11:10</td><td>checkout</td><td>2</td><td>0</td><td>1</td></tr>
<tr><td>03-01 11:20</td><td>purchase</td><td>10</td><td>0</td><td>1</td></tr>
<tr><td>03-03 09:51</td><td>view</td><td>2791</td><td>1</td><td>2</td></tr>
<tr><td>03-03 09:58</td><td>view</td><td>7</td><td>0</td><td>2</td></tr>
</table>
<p>Now <code>GROUP BY user_id, session_no</code> lets you compute a session's length, its number of events, and whether it ended in a purchase. This database has 128 sessions, and 28.9% of them ended in a purchase.</p>
<h3>An ordered funnel</h3>
<p>The simple funnel in Business Analytics counts "users who have this event". But the <b>order</b> of events matters: adding to the cart must come <b>after</b> a view, and a purchase <b>after</b> the cart.</p>
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
<p>In this database 42 users added something to the cart at least once, but only 39 of them did so after their first view. The other three landed straight in the cart from a link in a push notification. A funnel that ignores order overstates conversion.</p>
<h3>Time to convert</h3>
<p>The time between the first view and the first purchase (time-to-convert) tells marketing when to send a reminder. This distribution is usually heavily skewed: most people buy in the same session, and a small share buy a few days later. So report the median and shares ("bought within 1 hour"), not the mean.</p>
<h3>Common mistakes</h3>
<ul>
<li>Forgetting <code>PARTITION BY user_id</code>: one user's event gets compared with another user's event.</li>
<li>Subtracting times as text: in SQLite <code>ts - LAG(ts)</code> gives the difference of the years (0). Use <code>julianday</code> or <code>strftime('%s', ts)</code>.</li>
<li>Leaving out the "after the first event" condition in a funnel.</li>
<li>Treating the 30-minute threshold as a law: it is only a convention. On a video service 30 minutes of silence is normal viewing; the threshold is chosen to suit the product.</li>
</ul>
<div class="tip">Google Analytics and AppMetrica split sessions by this same "30 minutes of inactivity" rule. If the session count on a dashboard differs from your SQL, first check that the threshold is the same.</div>`,
      ex: [
        { prompt: 'Show the events of user 26 in time order: <code>ts</code>, <code>event</code>, <code>gap_min</code> (minutes since the previous event, <code>ROUND</code> to a whole number; NULL for the first event).', hints: ['<code>LAG(ts) OVER (ORDER BY ts)</code> gives the time of the previous event.', '<code>ROUND((julianday(ts) - julianday(LAG(ts) OVER (ORDER BY ts))) * 1440)</code>'] },
        { prompt: 'How many sessions are there in the <code>events_ts</code> table in total? The rule: a user\'s first event, or a break of more than 30 minutes after the previous event, starts a new session. Column: <code>sessions</code>.', hints: ['The number of sessions = the number of events that start a session.', '<code>WHERE gap_min IS NULL OR gap_min &gt; 30</code>'] },
        { prompt: 'Show the sessions of users 7 and 26: <code>user_id</code>, <code>session_no</code>, <code>started_at</code> (the first event of the session), <code>events</code> (number of events). Sort by <code>user_id</code>, <code>session_no</code>.', hints: ['Three steps: <code>gap_min</code> (LAG), <code>is_new</code> (CASE), <code>session_no</code> (running SUM).', '<code>SUM(CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END) OVER (PARTITION BY user_id ORDER BY ts)</code>', 'Filter the users in the very last SELECT, then <code>GROUP BY user_id, session_no</code>.'] },
        { prompt: 'Show the ordered funnel in one row: <code>viewed</code> (users with at least one <code>view</code>), <code>carted</code> (users with a <code>cart</code> <b>after</b> their first view), <code>purchased</code> (users with a <code>purchase</code> <b>after</b> that first cart).', hints: [`The <code>c</code> CTE: <code>events_ts e JOIN v</code>, with the condition <code>e.event = 'cart' AND e.ts &gt; v.view_ts</code> and <code>MIN(e.ts)</code> per user.`, `The <code>p</code> CTE is the same but joins to <code>c</code>: <code>e.event = 'purchase' AND e.ts &gt; c.cart_ts</code>.`, 'At the end: <code>SELECT (SELECT COUNT(*) FROM v) AS viewed, ...</code>'] },
        { prompt: 'For each user who bought, show how many minutes passed from their first view to the first purchase after it: <code>user_id</code>, <code>minutes_to_buy</code> (<code>ROUND</code> to a whole number). Sort from the fastest.', hints: ['First the time of each user\'s first <code>view</code>, then the time of the first <code>purchase</code> after it.', '<code>ROUND((julianday(buy_ts) - julianday(view_ts)) * 1440)</code>'] }
      ]
    }
  }
});
