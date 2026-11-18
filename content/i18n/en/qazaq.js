// M3.8 SQL practicum: Qazaq Market: English text. Queries, solutions and the dataset are in content/qazaq.js and content/datasets.js.
// Values stored in the database (cities, categories, product names, segments like "қымбат") stay as they are in the data.
DJ.i18n.patch({
  modules: {
    'm3-8': { intro: 'A practicum after SQL Core and Advanced SQL: more than 40 business questions on an online shop database with 80 customers, 308 orders and 530 order lines, from filters to cohort analysis. It ends with the PostgreSQL and ClickHouse dialects and a module exam.' }
  },
  lessons: {
    'qm-1': {
      title: 'Meet the Qazaq Market database: SELECT and sorting',
      body: `
<p>In this practicum you apply what you learned in SQL Core and Advanced SQL to one large, close-to-real database. <b>Qazaq Market</b> is a made-up online shop: customers from Almaty, Taraz and Atyrau, electronics and books, a year and a half of orders.</p>
<table>
<tr><th>Table</th><th>Columns</th><th>What it stores</th></tr>
<tr><td><code>customers</code></td><td>customer_id, full_name, city, registered_at, email</td><td>80 customers, 10 of them have no email (NULL)</td></tr>
<tr><td><code>products</code></td><td>product_id, name, category, price</td><td>30 products, 5 categories, prices in tenge</td></tr>
<tr><td><code>orders</code></td><td>order_id, customer_id, order_date, status</td><td>308 orders, 2025–2026, status: delivered, cancelled, returned</td></tr>
<tr><td><code>order_items</code></td><td>order_id, product_id, quantity, unit_price</td><td>530 rows: each product in an order</td></tr>
</table>
<p>The order total is not stored separately: you compute it from <code>order_items</code> as <code>quantity * unit_price</code>. That is how it works on a real job: nobody hands you a ready column, you build it yourself.</p>
<div class="tip">Before each task, restate the question in business terms: "which table, which columns and which filter do I need?"</div>`,
      ex: [
        { prompt: 'Show only the name and price columns from the products table.', hints: ['List the columns separated by commas.'] },
        { prompt: 'How many rows are in the order_items table? Count them with COUNT(*).', hints: ['SELECT COUNT(*) FROM ...'] },
        { prompt: 'Show the name and price of the products, sorted by price from most to least expensive.', hints: ['ORDER BY ... DESC'] },
        { prompt: 'Show the name and price of the 5 cheapest products.', hints: ['ORDER BY price, then LIMIT 5.'] },
        { prompt: 'Which cities are the customers from? Show each city only once, sorted alphabetically.', hints: ['DISTINCT removes repeated values.'] },
        { prompt: 'From 2026 the VAT rate is 16%. Show each product\'s name and its price without VAT (price / 1.16). Name the new column price_without_vat and round it to a whole number with ROUND.', hints: ['A column gets its name with AS.'] },
        { prompt: 'Which 5 rows does a query with LIMIT 5 return if it has no ORDER BY?', options: ['The 5 largest values', 'The 5 smallest values', 'Any 5 rows, the order is not guaranteed', 'It raises an error'], explain: 'Without sorting, you cannot rely on the order of rows in the database.' }
      ]
    },
    'qm-2': {
      title: 'WHERE: picking the rows you need',
      body: `
<p>A filter is what an analyst writes most often. Keep three traps in mind:</p>
<ul>
<li>When <code>AND</code> and <code>OR</code> are mixed, use parentheses: <code>AND</code> has higher precedence.</li>
<li>You check for NULL with <code>IS NULL</code>, not with <code>=</code>.</li>
<li>A date range is safest written as "less than the start of the next period": <code>order_date &gt;= '2026-01-01' AND order_date &lt; '2026-04-01'</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Show the names of all customers in Taraz (the city is stored as \'Тараз\').', hints: [`A text value goes in single quotes: 'Тараз'.`] },
        { prompt: 'Show the products in the Спорт (Sports) category priced between 10,000 and 50,000 tenge (both bounds included): name, price.', hints: ['BETWEEN and AND.'] },
        { prompt: 'Show the number of customers who are NOT from Almaty, Astana or Shymkent (stored as \'Алматы\', \'Астана\', \'Шымкент\').', hints: ['Use NOT IN (...).'] },
        { prompt: 'Show the name and city of the customers who have no email (NULL).', hints: ['You cannot compare NULL with =.'] },
        { prompt: 'Show the products whose name contains the word "Смарт".', hints: [`LIKE '%...%'`] },
        { prompt: `Show the number of orders placed in the first quarter of 2026 (1 January – 31 March) that were not cancelled (status is not 'cancelled').`, hints: [`order_date &gt;= '2026-01-01' AND order_date &lt; '2026-04-01'`] },
        { prompt: 'Why does WHERE email = NULL return nothing?', options: ['There is no email column', 'Any comparison with NULL gives an unknown result (UNKNOWN)', 'NULL equals zero', 'It is a syntax error'], explain: 'To check for NULL you use IS NULL.' },
        { prompt: 'How is WHERE a = 1 OR b = 2 AND c = 3 evaluated?', options: ['(a=1 OR b=2) AND c=3', 'a=1 OR (b=2 AND c=3)', 'From left to right', 'It raises an error'], explain: 'AND has higher precedence than OR. When in doubt, add parentheses.' }
      ]
    },
    'qm-3': {
      title: 'Aggregation: per city, per category',
      body: `
<p>A question that says "for each ..." means <code>GROUP BY</code>. A condition after grouping (for example, "more than 5 orders") is <code>HAVING</code>; a condition before grouping is <code>WHERE</code>.</p>
<p>The pattern for computing an order total:</p>
<pre><code>SELECT order_id, SUM(quantity * unit_price) AS order_total
FROM order_items
GROUP BY order_id;</code></pre>`,
      ex: [
        { prompt: 'Show the number of products and the average price (rounded to a whole number) in each category. Columns: category, products_cnt, avg_price.', hints: ['GROUP BY category'] },
        { prompt: 'Show the number of customers in each city, sorted from most to fewest (ties by city name).', hints: ['ORDER BY 2 DESC, 1'] },
        { prompt: 'Show the number of orders for each status.', hints: ['GROUP BY status'] },
        { prompt: 'From the order_items table, compute each order\'s total (quantity * unit_price) and show only the orders whose total is above 300,000 tenge. Columns: order_id, order_total. Sort by total in descending order (ties by order_id).', hints: ['The filter after grouping is HAVING.'] },
        { prompt: 'Show the customer_id and the number of orders for customers who placed more than 5 orders.', hints: ['Where does the condition COUNT(*) &gt; 5 go: in WHERE or in HAVING?'] },
        { prompt: 'What is the difference between WHERE and HAVING?', options: ['There is none', 'WHERE filters rows before grouping, HAVING filters groups after grouping', 'HAVING works only with numbers', 'WHERE is used only together with GROUP BY'], explain: 'The order in which a query runs: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.' },
        { prompt: 'What is the difference between COUNT(*) and COUNT(email)?', options: ['They are the same', 'COUNT(email) does not count NULL values', 'COUNT(*) does not count NULL', 'COUNT(email) counts only unique values'], explain: 'Aggregate functions ignore NULL, while COUNT(*) counts rows.' }
      ]
    },
    'qm-4': {
      title: 'JOIN: combining customers, orders and products',
      body: `
<p>When you need revenue by category, three tables are joined: the category is in <code>products</code>, the quantity and price are in <code>order_items</code>, and the status is in <code>orders</code>. Start from the most detailed table (<code>order_items</code>).</p>
<p>For questions like "customers who never bought anything", use the pattern <code>LEFT JOIN ... WHERE right_side.id IS NULL</code>.</p>
<div class="tip">Always check the row count after a JOIN. If one order has 3 products, the order becomes 3 rows: count orders with <code>COUNT(DISTINCT o.order_id)</code>.</div>`,
      ex: [
        { prompt: 'Show each order\'s order_id, its date and the customer\'s full name.', hints: ['orders JOIN customers ON ...customer_id'] },
        { prompt: `Show the revenue (the sum of quantity * unit_price) from delivered orders (status = 'delivered') by category. Sort by revenue in descending order.`, hints: ['You need three tables: order_items, orders, products.'] },
        { prompt: 'Show the customer_id and name of the customers who have not placed a single order.', hints: ['LEFT JOIN + WHERE o.order_id IS NULL'] },
        { prompt: 'Show the names of the products that have never been sold.', hints: ['Start from the products table and do a LEFT JOIN.'] },
        { prompt: 'Show the number of orders for each city. Customers without orders must count as 0, and every city must appear. Columns: city, orders_cnt. Sort by city name.', hints: ['Use COUNT(o.order_id), not COUNT(*): why?'] },
        { prompt: 'customers LEFT JOIN orders: what is in the orders columns for a customer with no orders?', options: ['0', `An empty string ''`, 'NULL', 'That customer does not appear'], explain: 'LEFT JOIN keeps every row on the left and puts NULL where there is no match.' },
        { prompt: 'After a JOIN there are more rows than you expected. What is the most likely reason?', options: ['The database has an error', 'The join key is not unique on one side (a one-to-many relationship)', 'There is no ORDER BY', 'There is no LIMIT'], explain: 'If one order has 3 products, the order row is repeated 3 times. Keep this in mind when you sum amounts.' }
      ]
    },
    'qm-5': {
      title: 'CASE WHEN, dates and shares',
      body: `
<p><code>CASE WHEN</code> is SQL's "IF". Together with an aggregate it computes a share:</p>
<pre><code>SELECT ROUND(100.0 * SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 1) AS cancel_rate_pct
FROM orders;</code></pre>
<p>Date functions differ from one database to another. This is SQLite: <code>strftime('%Y-%m', order_date)</code> gives the month and <code>strftime('%Y', order_date)</code> gives the year. PostgreSQL uses <code>TO_CHAR</code> and <code>DATE_TRUNC</code> instead.</p>
<div class="tip">Dividing two integers drops the fraction: <code>7 / 2 = 3</code>. When you compute a share, multiply by <code>100.0</code>.</div>`,
      ex: [
        { prompt: `Split the products into price segments: cheaper than 10,000 is 'арзан' (cheap), 10,000–99,999 is 'орташа' (medium), 100,000 and above is 'қымбат' (expensive). Show the number of products in each segment. Columns: segment, cnt.`, hints: ['CASE WHEN ... THEN ... ELSE ... END, then GROUP BY.'] },
        { prompt: `Show the number of orders per month (all statuses). Columns: month (in the 'YYYY-MM' format), orders_cnt. Sort by month.`, hints: [`SQLite: strftime('%Y-%m', order_date). PostgreSQL: TO_CHAR(order_date, 'YYYY-MM').`] },
        { prompt: 'Show the cancellation rate for each year (cancelled orders / all orders, as a percentage rounded to 1 decimal place). Columns: year, cancel_rate_pct.', hints: [`SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END). When dividing integers, remember to multiply by 100.0.`] },
        { prompt: 'Show the customer\'s first name (the part of full_name before the space) and the year of registration. Columns: first_name, reg_year. Show only those registered in 2026, sorted by customer_id.', hints: [`SQLite: substr(full_name, 1, instr(full_name, ' ') - 1). PostgreSQL: split_part(full_name, ' ', 1).`, `The year 2026: registered_at &gt;= '2026-01-01' AND registered_at &lt; '2027-01-01' (do not forget the upper bound).`] },
        { prompt: 'What does SELECT 7 / 2 return in SQLite and PostgreSQL?', options: ['3.5', '3', '4', 'An error'], explain: 'Dividing an integer by an integer drops the fractional part. 7.0 / 2 = 3.5.' },
        { prompt: 'What does CASE WHEN return if no condition matches and there is no ELSE?', options: ['0', 'An empty string', 'NULL', 'An error'], explain: 'Without ELSE the result is NULL.' }
      ]
    },
    'qm-6': {
      title: 'Subqueries and CTEs',
      body: `
<p>Break a complex question into steps: first an intermediate result inside <code>WITH</code> (for example, the total of each order), then the final calculation on top of it (the average order value).</p>
<p>For a question like "bought ... at least once", <code>IN (subquery)</code> or <code>EXISTS</code> is convenient: unlike a JOIN, they do not multiply rows.</p>`,
      ex: [
        { prompt: 'Show the products priced above the average price of all products: name, price.', hints: ['WHERE price &gt; (SELECT AVG(price) FROM products)'] },
        { prompt: 'Show the number of customers who bought a product from the Электроника (Electronics) category at least once.', hints: ['IN (subquery) or COUNT(DISTINCT ...).'] },
        { prompt: 'Using WITH: first compute the total of each delivered order, then show the average order value (rounded to a whole number). Column: avg_check.', hints: ['WITH order_totals AS (...) SELECT ... FROM order_totals'] },
        { prompt: 'Compute each customer\'s total revenue from delivered orders and show the top 5 customers: full_name, city, revenue. In descending order of revenue.', hints: ['A sum by customer_id in a CTE, then a JOIN with customers.'] },
        { prompt: 'What is a CTE (WITH) for?', options: ['Only to speed up a query', 'To split a long query into named steps and make it easier to read', 'To store a table in the database', 'To create an index'], explain: 'A CTE is a temporary named result inside a query. It is not stored in the database.' },
        { prompt: 'What is the difference between IN (subquery) and JOIN?', options: ['IN does not multiply rows, while JOIN can in a one-to-many relationship', 'There is none', 'IN works only with numbers', 'JOIN does not support subqueries'], explain: 'That is why IN or EXISTS suits questions like "bought at least once".' }
      ]
    },
    'qm-7': {
      title: 'Window functions: ranking, running total, LAG',
      body: `
<p>A window function keeps the number of rows and adds a group calculation next to each row. The "top 1 in each group" pattern:</p>
<pre><code>WITH r AS (
  SELECT category, name, price,
         ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn
  FROM products
)
SELECT category, name, price FROM r WHERE rn = 1;</code></pre>
<p>A running total: <code>SUM(x) OVER (ORDER BY month)</code>. The difference from the previous month: <code>x - LAG(x) OVER (ORDER BY month)</code>.</p>`,
      ex: [
        { prompt: 'Rank the products by price within each category (the most expensive is 1). Columns: category, name, price, price_rank. Sort by category and rank.', hints: ['RANK() OVER (PARTITION BY category ORDER BY price DESC)'] },
        { prompt: 'Show only the most expensive product in each category: category, name, price.', hints: ['First ROW_NUMBER() in a CTE, then WHERE rn = 1.'] },
        { prompt: 'Monthly revenue from delivered orders and the running (cumulative) revenue. Columns: month, revenue, running_total. Sort by month.', hints: ['SUM(revenue) OVER (ORDER BY month)'] },
        { prompt: 'Show the number of orders per month (all statuses) and its difference from the previous month. Columns: month, orders_cnt, diff_vs_prev (NULL in the first month). Sort by month.', hints: ['LAG(orders_cnt) OVER (ORDER BY month)'] },
        { prompt: 'Show the date of each customer\'s first order (only customers who have orders): customer_id, first_order_date. Sort by customer_id. Solve it with the ROW_NUMBER window function.', hints: ['PARTITION BY customer_id ORDER BY order_date, order_id'] },
        { prompt: 'What is the main difference between GROUP BY and a window function?', options: ['There is none', 'GROUP BY collapses rows into fewer rows, a window function keeps the number of rows', 'A window function works only with numbers', 'GROUP BY is faster'], explain: 'A window function adds the result of a group calculation next to each row.' },
        { prompt: 'The prices are 500, 500, 300. What do RANK() and ROW_NUMBER() return?', options: ['RANK: 1,1,3; ROW_NUMBER: 1,2,3', 'RANK: 1,2,3; ROW_NUMBER: 1,1,3', 'Both 1,1,2', 'Both 1,2,3'], explain: 'RANK gives equal values the same place and skips the next one. DENSE_RANK would give 1,1,2.' }
      ]
    },
    'qm-8': {
      title: 'Mini project: cohorts and repeat purchases',
      body: `
<p>The manager's question: <b>"Do customers come back to us?"</b> Here you define a cohort by the month of the first order (in the <code>metrics</code> database from Advanced SQL it was the signup month).</p>
<p>The formula for the difference in months: <code>(year2 − year1) × 12 + (month2 − month1)</code>. In SQLite you get the year and the month with <code>CAST(strftime('%Y', d) AS INTEGER)</code>.</p>
<div class="tip">For your portfolio: put the queries on GitHub and write 3–5 findings and one business recommendation in the README. State as a limitation that the later months of the most recent cohorts have not happened yet.</div>`,
      ex: [
        { prompt: 'Find each customer\'s cohort: the month of their first order (the first order with any status counts). Show the number of customers in each cohort. Columns: cohort_month, customers_cnt. Sort by month.', hints: ['MIN(order_date) per customer, then strftime.'] },
        { prompt: 'Repeat purchase rate: the customers who placed orders on at least 2 different days, divided by all customers who placed an order (as a percentage, to 1 decimal place). Column: repeat_rate_pct.', hints: ['COUNT(DISTINCT order_date) &gt;= 2'] },
        { prompt: 'A cohort table (the cohort is the month of the first order with any status; activity is an order with any status): for each cohort, the number of active customers by month number after the first order (0, 1, 2, ...). Columns: cohort_month, month_number, active_customers. Only the 2025 cohorts and month_number &lt;= 3. Sort by cohort_month, month_number.', hints: [`Difference in months: (year2 − year1) * 12 + (month2 − month1). In SQLite you get the year and the month with CAST(strftime('%Y', d) AS INTEGER).`] },
        { prompt: 'What is a cohort?', options: ['Customers from one city', 'A group of users who took their first action (for example, a first order) in the same period', 'The customers who buy the most', 'Products in one category'], explain: 'A cohort is grouped by a shared starting point.' },
        { prompt: 'What does a month-1 retention of 25% mean?', options: ['25% of the customers left in the first month', '25% of the cohort bought again in the month after their first order', 'Revenue grew by 25%', '25% of the orders were returned'], explain: 'Retention: how much of the original cohort was active again in a later period.' }
      ]
    },
    'qm-9': {
      title: 'The PostgreSQL and ClickHouse dialects',
      body: `
<p>On this site queries run in SQLite, but at work you will mostly meet <b>PostgreSQL</b> (the main database) or <b>ClickHouse</b> (the analytical warehouse). The good news: <code>SELECT</code>, <code>JOIN</code>, <code>GROUP BY</code>, CTEs and window functions are the same everywhere. The differences are mostly in date, type and conditional aggregate functions. This lesson is a phrase book.</p>
<table>
<tr><th>What you need</th><th>PostgreSQL</th><th>ClickHouse</th><th>SQLite (this site)</th></tr>
<tr><td>Start of the month</td><td><code>DATE_TRUNC('month', d)</code></td><td><code>toStartOfMonth(d)</code></td><td><code>date(d, 'start of month')</code></td></tr>
<tr><td>Year (a number)</td><td><code>EXTRACT(YEAR FROM d)</code></td><td><code>toYear(d)</code></td><td><code>CAST(strftime('%Y', d) AS INTEGER)</code></td></tr>
<tr><td>Add 30 days</td><td><code>d + INTERVAL '30 days'</code></td><td><code>d + INTERVAL 30 DAY</code></td><td><code>date(d, '+30 day')</code></td></tr>
<tr><td>Difference between two dates</td><td><code>d2 - d1</code></td><td><code>dateDiff('day', d1, d2)</code></td><td><code>julianday(d2) - julianday(d1)</code></td></tr>
<tr><td>Today</td><td><code>CURRENT_DATE</code></td><td><code>today()</code></td><td><code>date('now')</code></td></tr>
<tr><td>Type cast</td><td><code>x::numeric</code>, <code>'2026-01-01'::date</code></td><td><code>toFloat64(x)</code>, <code>toDate(s)</code></td><td><code>CAST(x AS REAL)</code></td></tr>
<tr><td>Conditional count</td><td><code>COUNT(*) FILTER (WHERE condition)</code></td><td><code>countIf(condition)</code></td><td><code>SUM(CASE WHEN condition THEN 1 ELSE 0 END)</code></td></tr>
<tr><td>Conditional sum</td><td><code>SUM(x) FILTER (WHERE condition)</code></td><td><code>sumIf(x, condition)</code></td><td><code>SUM(CASE WHEN condition THEN x ELSE 0 END)</code></td></tr>
<tr><td>Distinct count</td><td><code>COUNT(DISTINCT x)</code></td><td><code>uniqExact(x)</code> (exact), <code>uniq(x)</code> (approximate)</td><td><code>COUNT(DISTINCT x)</code></td></tr>
<tr><td>Case-insensitive search</td><td><code>name ILIKE '%смарт%'</code></td><td><code>name ILIKE '%смарт%'</code></td><td><code>LIKE</code> (ignores case only for Latin letters)</td></tr>
<tr><td>Integer division: <code>7 / 2</code></td><td>3</td><td>3.5</td><td>3</td></tr>
</table>
<h3>Example: one query, three dialects</h3>
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
<p>The logic is the same: truncate to the month, count, count with a condition. To translate the query to SQLite, use the last column of the table.</p>
<h3>Differences that are easy to miss</h3>
<ul>
<li><b>Division.</b> In PostgreSQL and SQLite <code>7 / 2 = 3</code>; in ClickHouse it is <code>3.5</code>. The habit of writing <code>100.0 *</code> when you compute a share gives the right result in every database.</li>
<li><b>Searching Cyrillic text.</b> In SQLite, <code>LIKE '%смарт%'</code> does not find "Смарт-сағат": case matters for Cyrillic letters. In PostgreSQL, <code>ILIKE</code> finds it.</li>
<li><b>Quotes.</b> Text always goes in single quotes: <code>'delivered'</code>. In PostgreSQL double quotes mean a column name: <code>"status"</code>.</li>
<li><b>GROUP BY 1.</b> Grouping by column number works in PostgreSQL and SQLite, but in a long query a name is easier to read.</li>
<li><b>NULL order.</b> In an ascending sort PostgreSQL puts NULL last and SQLite puts it first. If it matters, write <code>NULLS LAST</code> explicitly.</li>
</ul>
<div class="tip">In an interview, ask "which dialect should I write in?" If you forget the exact function name, say what you want to do: "here I truncate the date to the start of the month, in PostgreSQL that is DATE_TRUNC". The interviewer is judging your logic, not your syntax.</div>`,
      ex: [
        { prompt: 'A PostgreSQL query contains <code>price::numeric / 3</code>. What does <code>::</code> do?', options: ['It joins two columns', 'It changes the type of a value (CAST): here an integer becomes a decimal number, so the division keeps the fraction', 'It separates a table from a column', 'It starts a comment'], explain: '<code>x::numeric</code> is short for <code>CAST(x AS numeric)</code>. In SQLite you write <code>CAST(price AS REAL)</code> or <code>price * 1.0</code>.' },
        { prompt: `Which is the SQLite equivalent of the ClickHouse expression <code>countIf(status = 'returned')</code>?`, options: [`COUNT(status = 'returned')`, `SUM(CASE WHEN status = 'returned' THEN 1 ELSE 0 END)`, 'COUNT(DISTINCT status)', `WHERE status = 'returned'`], explain: `A conditional count: add 1 when the condition holds, otherwise 0. In PostgreSQL: COUNT(*) FILTER (WHERE status = 'returned'). WHERE filters the whole query, so the other aggregates would change too.` },
        { prompt: 'A colleague moved the query <code>SELECT delivered / total AS share</code>, written for PostgreSQL, to ClickHouse (both columns are integers). How does the result change?', options: ['It does not change', 'In PostgreSQL integer division gave 0, while ClickHouse returns a fractional number (for example 0.83)', 'ClickHouse raises an error', 'Both give 0'], explain: 'PostgreSQL drops the fraction when it divides an integer by an integer; in ClickHouse / always returns a fractional number. To make it work the same in both, write <code>100.0 * delivered / total</code>.' },
        { prompt: `Translate the PostgreSQL query from the lesson to SQLite: for each month of 2026 show <code>month</code> (the first day of the month, <code>date(order_date, 'start of month')</code>), <code>orders</code> (all orders) and <code>cancelled</code> (cancelled ones). Sort by month.`, hints: [`DATE_TRUNC('month', order_date) → date(order_date, 'start of month')`, `COUNT(*) FILTER (WHERE status = 'cancelled') → SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)`] },
        { prompt: `Translate this ClickHouse query to SQLite:<pre><code>SELECT c.city,
       uniqExact(o.customer_id) AS buyers,
       countIf(o.status = 'delivered') AS delivered
FROM orders o JOIN customers c ON c.customer_id = o.customer_id
WHERE toStartOfQuarter(o.order_date) = '2025-10-01'
GROUP BY c.city
ORDER BY delivered DESC, c.city;</code></pre>That is, the number of unique buyers and of delivered orders in each city for the 4th quarter of 2025 (October–December). Columns: <code>city</code>, <code>buyers</code>, <code>delivered</code>.`, hints: ['uniqExact(x) → COUNT(DISTINCT x); countIf(condition) → SUM(CASE WHEN condition THEN 1 ELSE 0 END)', `Quarter filter: order_date &gt;= '2025-10-01' AND order_date &lt; '2026-01-01'`] }
      ]
    },
    'qm-gate': {
      title: 'Module exam: SQL practicum',
      body: `
<p>The final check: aggregates, JOIN, anti-join, window functions and shares. Every task uses the <code>qazaq</code> database. There are no hints, but you can look at an intermediate result with "Run".</p>
<p>A reminder: the order total is computed from <code>order_items</code> as <code>quantity * unit_price</code>; "revenue" always means <code>delivered</code> orders only.</p>`,
      ex: [
        { prompt: 'Show the 3 cities with the highest revenue from delivered orders: <code>city</code>, <code>revenue</code>. In descending order of revenue.' },
        { prompt: 'Show the customers who registered in 2026 but have no delivered (<code>delivered</code>) order at all: <code>full_name</code>, <code>city</code>.' },
        { prompt: 'In each category, show the one product that brought in the most revenue from delivered orders: <code>category</code>, <code>name</code>, <code>revenue</code>.' },
        { prompt: `Monthly revenue for 2026 and the change from the previous month: <code>month</code> ('YYYY-MM'), <code>revenue</code>, <code>mom_pct</code> (%, 1 decimal place; NULL in the first month). Sort by month.` },
        { prompt: 'Each category\'s revenue from delivered orders and its share of total revenue: <code>category</code>, <code>revenue</code>, <code>share_pct</code> (%, 1 decimal place). In descending order of revenue.' }
      ]
    }
  }
});
