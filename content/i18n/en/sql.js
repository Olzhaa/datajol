// M1.2 SQL Core: English text. Queries, solutions and the dataset are in content/sql.js.
// Values stored in the database (cities, categories, product names) stay in Kazakh, as they are in the data.
DJ.i18n.patch({
  modules: {
    'm1-2': { intro: 'In this module you work with an online shop\'s database: customers, products, orders. Write a query in the editor on the right, see the result with "Run", then press "Check".' }
  },
  lessons: {
    'sql-1': {
      title: 'Databases and your first SELECT',
      body: `
<p><b>SQL</b> (Structured Query Language) is the language for asking questions of tables in a database. A bank, a shop, a taxi app: all of them have an SQL database inside.</p>
<p>Our shop's database has four tables:</p>
<table>
<tr><th>Table</th><th>Columns</th></tr>
<tr><td><code>customers</code></td><td>id, name, city, signup_date</td></tr>
<tr><td><code>products</code></td><td>id, name, category, price</td></tr>
<tr><td><code>orders</code></td><td>id, customer_id, order_date, status</td></tr>
<tr><td><code>order_items</code></td><td>order_id, product_id, quantity</td></tr>
</table>
<h3>SELECT ... FROM</h3>
<p>The simplest query takes everything from a table. The <code>*</code> sign means "all columns":</p>
<pre><code>SELECT * FROM customers;</code></pre>
<p>You can list just the columns you need, separated by commas:</p>
<pre><code>SELECT name, city FROM customers;</code></pre>
<div class="tip">Writing SQL keywords (SELECT, FROM) in capitals is only a convention; <code>select</code> works too. The <code>;</code> at the end separates one query from the next.</div>
<h3>How is a query run?</h3>
<p>You write a query, the database reads it, takes rows from the table and returns the result as a new table. The original table does not change: SELECT only reads, so feel free to experiment.</p>
<h3>Why use <code>*</code> with care?</h3>
<ul>
<li>In real work a table has dozens or even hundreds of columns. <code>SELECT *</code> pulls unneeded data and slows the query down.</li>
<li>If a new column is added to the table later, the result of <code>*</code> changes and a report may break.</li>
<li>If you name the columns, anyone reading the query sees right away what is being selected.</li>
</ul>
<p>So use <code>*</code> when you first get to know a table, and name the columns in queries you keep.</p>
<div class="tip">When you first look at a large table, add <code>LIMIT 10</code> at the end: the database returns only 10 rows instead of the whole table. More on this in the ORDER BY lesson.</div>`,
      ex: [
        { prompt: 'Show all columns and rows of the <code>products</code> table.', starter: '-- Write your query here\n', hints: ['<code>*</code> is used for all columns.', 'Pattern: <code>SELECT * FROM table_name;</code>'] },
        { prompt: 'Show only the name (<code>name</code>) and price (<code>price</code>) of the products.', hints: ['List the columns separated by commas.', '<code>SELECT name, price FROM products;</code>'] }
      ]
    },
    'sql-2': {
      title: 'WHERE: filtering rows',
      body: `
<p>A <code>WHERE</code> condition keeps only the rows you need. It comes after <code>FROM</code>:</p>
<pre><code>SELECT name, price
FROM products
WHERE price > 50000;</code></pre>
<h3>Comparison operators</h3>
<table>
<tr><th>Operator</th><th>Meaning</th></tr>
<tr><td><code>=</code></td><td>equal</td></tr>
<tr><td><code>&lt;&gt;</code> or <code>!=</code></td><td>not equal</td></tr>
<tr><td><code>&gt;</code>, <code>&lt;</code></td><td>greater, less</td></tr>
<tr><td><code>&gt;=</code>, <code>&lt;=</code></td><td>greater or equal, less or equal</td></tr>
</table>
<p>Text and dates go in <b>single quotes</b>: <code>WHERE city = 'Алматы'</code>. Numbers go without quotes: <code>WHERE price = 9000</code>.</p>
<div class="tip">Dates are stored as <code>'2024-09-01'</code>. In this format, comparing them as text also works correctly: <code>order_date &gt;= '2024-10-01'</code>.</div>
<h3>How does WHERE work?</h3>
<p>The database checks the condition for every row of the table. If the condition is <code>TRUE</code>, the row goes into the result; if it is <code>FALSE</code> or unknown, it does not. So WHERE never creates new rows; it only filters existing ones.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Double quotes</b>: <code>city = "Алматы"</code>. In standard SQL double quotes mean a column name; use single quotes for text.</li>
<li><b>Case</b>: <code>'алматы'</code> and <code>'Алматы'</code> are different text. First check how the value is written in the data with <code>SELECT DISTINCT city</code>.</li>
<li><b>Extra space</b>: <code>'Алматы '</code> with a trailing space will not match. We fix such data in the cleaning module.</li>
<li><b>Comparing a number as text</b>: <code>price &gt; '50000'</code> is compared as text in some databases and gives unexpected results. Write numbers without quotes.</li>
</ul>
<div class="tip">An easy way to test a condition: first run the query without WHERE and look at a few rows, then add the condition and check that the row count dropped by a sensible amount.</div>`,
      ex: [
        { prompt: 'Show the name and price of products that cost more than 50 000 tenge.', hints: ['Condition: <code>price > 50000</code>'] },
        { prompt: 'Show all columns for customers from Astana (<code>\'Астана\'</code>).', hints: ['Put the text in quotes: <code>\'Астана\'</code>.'] },
        { prompt: 'Show the orders (all columns) whose status is not <code>delivered</code>.', hints: ['The "not equal" operator: <code>&lt;&gt;</code> or <code>!=</code>.'] }
      ]
    },
    'sql-3': {
      title: 'AND, OR, NOT, BETWEEN, IN',
      body: `
<p>Logical operators combine several conditions:</p>
<ul>
<li><code>AND</code>: both conditions must hold.</li>
<li><code>OR</code>: at least one condition is enough.</li>
<li><code>NOT</code>: turns a condition around.</li>
</ul>
<pre><code>SELECT name, price FROM products
WHERE category = 'Электроника' AND price &lt; 100000;</code></pre>
<h3>BETWEEN and IN</h3>
<p><code>BETWEEN a AND b</code> is a range, ends included. <code>IN (...)</code> means equal to one of the values in the list.</p>
<pre><code>WHERE price BETWEEN 5000 AND 20000
WHERE city IN ('Алматы', 'Шымкент')
WHERE city NOT IN ('Алматы')</code></pre>
<div class="tip">When you mix AND and OR, use brackets: <code>WHERE (city = 'Алматы' OR city = 'Астана') AND status = 'delivered'</code>. Without brackets, AND runs first.</div>
<h3>Condition precedence</h3>
<p>SQL evaluates <code>NOT</code> first, then <code>AND</code>, and <code>OR</code> last. This condition:</p>
<pre><code>WHERE city = 'Алматы' OR city = 'Астана' AND status = 'delivered'</code></pre>
<p>is actually read as <code>city = 'Алматы' OR (city = 'Астана' AND status = 'delivered')</code>: rows from Almaty come back with any status. Parentheses prevent the mistake and make the query easier to read.</p>
<h3>BETWEEN and dates</h3>
<p><code>BETWEEN</code> includes both ends. If the date is stored together with the time (<code>'2024-09-30 14:00'</code>), <code>BETWEEN '2024-09-01' AND '2024-09-30'</code> misses records from September 30 after midnight, because as text they are greater than <code>'2024-09-30'</code>. In that case it is safer to stop at the start of the next month:</p>
<pre><code>WHERE order_date &gt;= '2024-09-01' AND order_date &lt; '2024-10-01'</code></pre>
<div class="tip">If a <code>NOT IN</code> list contains NULL, the condition is true for no rows at all. Do not include NULL when you write the list by hand, and if it comes from a subquery, add <code>WHERE ... IS NOT NULL</code>.</div>`,
      ex: [
        { prompt: 'Show the name and price of products in the «Электроника» (electronics) category that cost less than 100 000.', hints: ['Join the two conditions with <code>AND</code>.'] },
        { prompt: 'Show the name and city of customers from Almaty or Shymkent. Use <code>IN</code>.', hints: ["<code>WHERE city IN ('Алматы', 'Шымкент')</code>"] },
        { prompt: 'Show all orders placed in September 2024 (1–30 September). Use <code>BETWEEN</code>.', hints: ["Write dates in quotes: <code>'2024-09-01'</code>."] }
      ]
    },
    'sql-4': {
      title: 'LIKE and NULL',
      body: `
<h3>LIKE: searching by pattern</h3>
<p><code>%</code> is any run of characters, <code>_</code> is exactly one character.</p>
<pre><code>WHERE name LIKE 'Кітап%'   -- starts with «Кітап»
WHERE name LIKE '%фон'     -- ends with «фон»
WHERE name LIKE '%ал%'     -- contains «ал»</code></pre>
<h3>NULL: no value</h3>
<p><code>NULL</code> means "unknown" or "empty". It is neither zero nor empty text. That is why <code>= NULL</code> does not work and a special operator is needed:</p>
<pre><code>WHERE city IS NULL
WHERE city IS NOT NULL</code></pre>
<div class="tip">NULL is very common in real data. Before an analysis, always check which columns have empty values.</div>
<h3>More about LIKE</h3>
<ul>
<li>In SQLite, <code>LIKE</code> is case-insensitive for Latin letters: <code>'a%'</code> also finds “Apple”. But this rule does not work for Cyrillic: “кітап” and “Кітап” are different.</li>
<li>For case-insensitive search, bring both sides to the same form: <code>WHERE LOWER(name) LIKE '%phone%'</code>.</li>
<li>A pattern starting with <code>%</code> (<code>'%фон'</code>) cannot use an index and is slow on a large table.</li>
</ul>
<h3>NULL in arithmetic and comparisons</h3>
<p>Any operation with NULL gives NULL: <code>5 + NULL</code> = NULL, and even <code>NULL = NULL</code> is not TRUE but NULL. That is why <code>WHERE city &lt;&gt; 'Алматы'</code> also hides customers with an empty city: for them the condition is unknown.</p>
<p>To replace an empty value with another one, there is <code>COALESCE</code>:</p>
<pre><code>SELECT name, COALESCE(city, 'белгісіз') AS city FROM customers;  -- 'белгісіз' = "unknown"</code></pre>
<div class="tip">A quick way to count empty values in a column: <code>SELECT COUNT(*) - COUNT(city) FROM customers</code>. <code>COUNT(city)</code> does not count NULLs, so the difference is the number of empty rows.</div>`,
      ex: [
        { prompt: 'Show all columns for products whose name starts with the word «Кітап» (book).', hints: ["<code>LIKE 'Кітап%'</code>"] },
        { prompt: 'Show the <code>id</code> and <code>name</code> columns of customers whose city is not given.', hints: ['Write <code>IS NULL</code>, not <code>= NULL</code>.'] }
      ]
    },
    'sql-5': {
      title: 'ORDER BY, LIMIT, DISTINCT',
      body: `
<p><code>ORDER BY</code> sorts the result. <code>ASC</code> is ascending (the default), <code>DESC</code> is descending.</p>
<pre><code>SELECT name, price FROM products
ORDER BY price DESC;</code></pre>
<p><code>LIMIT n</code> keeps only the first n rows. Together with ORDER BY it gives you a "top N".</p>
<p><code>DISTINCT</code> removes repeated rows:</p>
<pre><code>SELECT DISTINCT category FROM products;</code></pre>
<h3>The order of the parts of a query</h3>
<pre><code>SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...</code></pre>
<h3>Sorting by several columns</h3>
<p>You can give ORDER BY several columns separated by commas. The second column is used when the first one ties:</p>
<pre><code>SELECT name, category, price FROM products
ORDER BY category ASC, price DESC;</code></pre>
<p>In the result, categories are in alphabetical order, and within each category products go from most to least expensive.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>LIMIT without ORDER BY</b>: the database may return rows in any order, so the “first 5” can differ each time. Always write ORDER BY for a top-N.</li>
<li><b>Ties</b>: if the 3rd and 4th products have the same price, LIMIT 3 drops one of them arbitrarily. For a stable result, add a second sort column (for example, <code>id</code>).</li>
<li><b>NULL order</b>: in SQLite, NULLs come first in ascending order and last in descending order. Other databases may do the opposite.</li>
</ul>
<div class="tip"><code>DISTINCT</code> applies to the whole row: <code>SELECT DISTINCT city, signup_date</code> gives unique pairs of city and date, not just cities.</div>`,
      ex: [
        { prompt: 'Show the name and price of the 3 most expensive products, from most to least expensive.', hints: ['<code>ORDER BY price DESC</code>, then <code>LIMIT 3</code>.'] },
        { prompt: 'Show the list of customer cities without repeats. Leave out NULL.', hints: ['<code>SELECT DISTINCT city</code> + <code>WHERE city IS NOT NULL</code>.'] },
        { prompt: 'Show customer names and sign-up dates, newest first.', hints: ['Newest to oldest: <code>DESC</code>.'] }
      ]
    },
    'sql-6': {
      title: 'Aliases and calculated columns',
      body: `
<p>You can do arithmetic inside SELECT: <code>+ - * /</code>. We name the new column (an alias) with <code>AS</code>:</p>
<pre><code>SELECT name,
       price,
       price * 1.12 AS price_with_vat
FROM products;</code></pre>
<p>A table can get a short name too. This will be very useful in the JOIN lesson:</p>
<pre><code>SELECT p.name FROM products AS p;
SELECT p.name FROM products p;   -- AS is optional</code></pre>
<div class="tip">In SQLite, dividing a whole number by a whole number gives a whole number: <code>7 / 2 = 3</code>. For an exact result, make one of them a decimal: <code>7 / 2.0 = 3.5</code>.</div>
<h3>Examples of calculated columns</h3>
<pre><code>SELECT name,
       price,
       ROUND(price * 0.85) AS after_discount,
       price - 5000       AS minus_coupon
FROM products;</code></pre>
<p><code>ROUND(x)</code> rounds to a whole number, <code>ROUND(x, 1)</code> to one decimal place. You can join text with <code>||</code>: <code>name || ' (' || category || ')'</code>.</p>
<h3>Where can you use an alias?</h3>
<p>The parts of a query do not run in the order they are written: the database runs <code>FROM</code> and <code>WHERE</code> first, then <code>SELECT</code>, and <code>ORDER BY</code> last. So you can use an alias in ORDER BY but not in WHERE:</p>
<pre><code>SELECT name, price * 1.12 AS price_with_vat
FROM products
ORDER BY price_with_vat DESC;   -- correct</code></pre>
<p>In WHERE you have to repeat the calculation: <code>WHERE price * 1.12 &gt; 50000</code>.</p>
<div class="tip">Give aliases names without spaces, in Latin letters: <code>price_with_vat</code>. If a name has a space, it must be wrapped in double quotes, which is awkward in later queries.</div>`,
      ex: [
        { prompt: 'For products in the «Кеңсе» (office) category, show the name as <code>product</code> and the price with a 10% discount as <code>sale_price</code>.', hints: ['A 10% discount = <code>price * 0.9</code>.', 'Naming a column: <code>name AS product</code>.'] },
        { prompt: 'Show each product\'s name and its price in thousands of tenge (<code>price_k</code>, a decimal). For example, 6500 → 6.5.', hints: ['Avoid whole-number division: <code>1000.0</code>.'] }
      ]
    },
    'sql-7': {
      title: 'Aggregate functions',
      body: `
<p>Picture a shop's checkout. The cashier does not read out every item on the receipt; at the end they say one number: "41 700 ₸ in total". <b>Aggregate functions</b> do the same: they take many rows and reduce them to one number. Every manager's question like "how many customers do we have?" or "what is the average price?" is answered this way. They are the same as the <code>COUNT</code>, <code>SUM</code> and <code>AVERAGE</code> formulas in Excel.</p>
<table>
<tr><th>Function</th><th>What it returns</th></tr>
<tr><td><code>COUNT(*)</code></td><td>number of rows</td></tr>
<tr><td><code>COUNT(col)</code></td><td>number of values that are not NULL</td></tr>
<tr><td><code>SUM(col)</code></td><td>the sum</td></tr>
<tr><td><code>AVG(col)</code></td><td>the average</td></tr>
<tr><td><code>MIN(col)</code>, <code>MAX(col)</code></td><td>smallest, largest</td></tr>
</table>
<h3>Example: several functions in one query</h3>
<p>Imagine the <code>products</code> table has only 4 products:</p>
<table>
<tr><th>id</th><th>name</th><th>category</th><th>price</th></tr>
<tr><td>2</td><td>Құлаққап</td><td>Электроника</td><td>25000</td></tr>
<tr><td>4</td><td>Кітап: SQL негіздері</td><td>Кітаптар</td><td>6500</td></tr>
<tr><td>7</td><td>Термос</td><td>Аксессуарлар</td><td>9000</td></tr>
<tr><td>9</td><td>Блокнот</td><td>Кеңсе</td><td>1200</td></tr>
</table>
<pre><code>SELECT COUNT(*)   AS n,
       SUM(price) AS total,
       AVG(price) AS avg_price,
       MAX(price) AS max_price
FROM products;</code></pre>
<p>The result is not 4 rows but <b>one row</b>. The columns appear in the order they are written in SELECT:</p>
<table>
<tr><th>n</th><th>total</th><th>avg_price</th><th>max_price</th></tr>
<tr><td>4</td><td>41700</td><td>10425</td><td>25000</td></tr>
</table>
<p>The maths: 25000 + 6500 + 9000 + 1200 = 41700, and 41700 / 4 = 10425. You can use aggregates together with <code>WHERE</code>: first the rows are filtered, then the rest are summarised:</p>
<pre><code>SELECT COUNT(*) AS n, AVG(price) AS avg_price
FROM products
WHERE category = 'Электроника';</code></pre>
<h3>Three kinds of COUNT</h3>
<p>Four customers: Айгерім (Almaty), Ержан (Almaty), Бауыржан (city <code>NULL</code>), Жанар (Aktobe).</p>
<table>
<tr><th>Expression</th><th>Result</th><th>Why</th></tr>
<tr><td><code>COUNT(*)</code></td><td>4</td><td>all rows</td></tr>
<tr><td><code>COUNT(city)</code></td><td>3</td><td>NULL is not counted</td></tr>
<tr><td><code>COUNT(DISTINCT city)</code></td><td>2</td><td>Алматы, Ақтөбе</td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li><b>Mixing up COUNT and SUM.</b> <code>COUNT(quantity)</code> is how many rows there are, while <code>SUM(quantity)</code> is the total number of items. If one row has 5 notebooks, COUNT counts it as 1 and SUM as 5.</li>
<li><b>Mixing an aggregate with a plain column:</b> <code>SELECT name, MAX(price)</code>. In such a query it is unclear which row <code>name</code> comes from. To get the name of the most expensive product, write <code>ORDER BY price DESC LIMIT 1</code>; calculating "for each group" is GROUP BY, in the next lesson.</li>
<li><b>Forgetting NULL.</b> <code>SUM</code>, <code>AVG</code>, <code>MIN</code> and <code>MAX</code> ignore NULL values. So <code>AVG</code> does not treat empty values as zero.</li>
</ul>`,
      ex: [
        { prompt: 'How many customers are in the database? Show one number.', hints: ['<code>COUNT(*)</code>'] },
        { prompt: 'Show the lowest, highest and average product price on one row, in that order.', hints: ['Three functions in one SELECT: <code>MIN, MAX, AVG</code>.'] },
        { prompt: 'How many items were sold in total across all orders? (the sum of <code>order_items.quantity</code>)', hints: ['<code>SUM(quantity)</code>'] }
      ]
    },
    'sql-8': {
      title: 'GROUP BY and HAVING',
      body: `
<p>In the last lesson an aggregate gave one number for the whole table. But for "how many customers are in <b>each</b> city?" one number is not enough. Imagine sorting receipts on a desk into piles by city and counting each pile separately. <code>GROUP BY</code> does exactly that: it splits rows into groups and calculates an aggregate for each group. It is the same as a pivot table in Excel.</p>
<h3>Example: customers in each city</h3>
<table>
<tr><th>id</th><th>name</th><th>city</th></tr>
<tr><td>1</td><td>Айгерім</td><td>Алматы</td></tr>
<tr><td>2</td><td>Нұрлан</td><td>Астана</td></tr>
<tr><td>4</td><td>Ержан</td><td>Алматы</td></tr>
<tr><td>6</td><td>Тимур</td><td>Астана</td></tr>
<tr><td>7</td><td>Әсем</td><td>Алматы</td></tr>
</table>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city;</code></pre>
<p>SQL first builds two groups: "Алматы" (Айгерім, Ержан, Әсем) and "Астана" (Нұрлан, Тимур). Then it counts the rows in each group. The result has <b>one row</b> per group:</p>
<table>
<tr><th>city</th><th>customers</th></tr>
<tr><td>Алматы</td><td>3</td></tr>
<tr><td>Астана</td><td>2</td></tr>
</table>
<p>You can put several aggregates side by side in SELECT, for example <code>COUNT(*)</code> and <code>AVG(price)</code> together: both are calculated for each group.</p>
<p>The rule: every column in SELECT that is not an aggregate must also be in GROUP BY.</p>
<h3>HAVING: filtering groups</h3>
<p><code>WHERE</code> filters <b>rows</b> before grouping. <code>HAVING</code> filters <b>groups</b> after it. So a condition on an aggregate (<code>COUNT(*)</code>, <code>AVG(price)</code>) can only go in HAVING. From the table above, let us keep only cities with at least 3 customers:</p>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
HAVING COUNT(*) &gt;= 3;</code></pre>
<table>
<tr><th>city</th><th>customers</th></tr>
<tr><td>Алматы</td><td>3</td></tr>
</table>
<p>The Astana group has 2 rows, the condition failed, so it was dropped. Another example: categories with an average price above 10 000:</p>
<pre><code>SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) &gt; 10000;</code></pre>
<p>The full order: <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code>.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Putting an aggregate in WHERE:</b> <code>WHERE COUNT(*) &gt; 1</code> is an error. At the WHERE stage there are no groups yet: use HAVING.</li>
<li><b>Forgetting GROUP BY.</b> <code>SELECT city, COUNT(*) FROM customers</code> returns one row for the whole table, not one per city.</li>
<li><b>Missing the NULL group.</b> Rows with an empty <code>city</code> collect in a separate <code>NULL</code> group. If you do not need it, add <code>WHERE city IS NOT NULL</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Show the number of customers in each city: <code>city</code> and the count.', hints: ['<code>GROUP BY city</code>'] },
        { prompt: 'For each category (<code>category</code>), show the number of products and the average price.', hints: ['Three columns: category, COUNT(*), AVG(price).'] },
        { prompt: 'Show the <code>customer_id</code> and number of orders for customers who placed more than one order.', hints: ['First group <code>orders</code> by <code>customer_id</code>.', 'Filtering groups: <code>HAVING COUNT(*) > 1</code>.'] }
      ]
    },
    'sql-9': {
      title: 'CASE WHEN: conditional columns',
      body: `
<p>When a teacher marks papers, each score gets a grade: above 85 is an A, above 70 a B, otherwise a C. <code>CASE</code> is exactly this kind of "if ... then ..." in SQL. It checks a condition for each row and builds a new column. It is like the <code>IF</code> formula in Excel, but several conditions in a row are easier to write.</p>
<pre><code>CASE
  WHEN condition1 THEN value1
  WHEN condition2 THEN value2
  ELSE value_for_the_rest
END AS new_column</code></pre>
<p>Conditions are checked <b>from top to bottom</b>: the first one that holds wins and the rest are not looked at.</p>
<h3>Example: splitting prices into levels</h3>
<table>
<tr><th>name</th><th>price</th></tr>
<tr><td>Ноутбук</td><td>350000</td></tr>
<tr><td>Құлаққап</td><td>25000</td></tr>
<tr><td>Термос</td><td>9000</td></tr>
<tr><td>Үстел шамы</td><td>8000</td></tr>
<tr><td>Блокнот</td><td>1200</td></tr>
</table>
<pre><code>SELECT name, price,
  CASE
    WHEN price &gt;= 20000 THEN 'high'
    WHEN price &gt;= 5000 THEN 'medium'
    ELSE 'low'
  END AS level
FROM products;</code></pre>
<table>
<tr><th>name</th><th>price</th><th>level</th></tr>
<tr><td>Ноутбук</td><td>350000</td><td>high</td></tr>
<tr><td>Құлаққап</td><td>25000</td><td>high</td></tr>
<tr><td>Термос</td><td>9000</td><td>medium</td></tr>
<tr><td>Үстел шамы</td><td>8000</td><td>medium</td></tr>
<tr><td>Блокнот</td><td>1200</td><td>low</td></tr>
</table>
<p>Take the thermos: 9000 ≥ 20000 is false, the first condition failed. 9000 ≥ 5000 is true, the second condition passed, so it is "medium". No condition fit the notebook, so it fell into <code>ELSE</code>.</p>
<p>Conditions can use text too: <code>WHEN city = 'Алматы' THEN 'Алматы' ELSE 'regions'</code>. Text always goes in single quotes.</p>
<h3>CASE + GROUP BY</h3>
<p>Give the CASE an alias and group by it, and you can count by your own segments:</p>
<pre><code>SELECT
  CASE
    WHEN price &gt;= 20000 THEN 'high'
    WHEN price &gt;= 5000 THEN 'medium'
    ELSE 'low'
  END AS level,
  COUNT(*) AS n
FROM products
GROUP BY level;</code></pre>
<table>
<tr><th>level</th><th>n</th></tr>
<tr><td>high</td><td>2</td></tr>
<tr><td>medium</td><td>2</td></tr>
<tr><td>low</td><td>1</td></tr>
</table>
<p>SQL first gives each row a level (the table above), then collects rows with the same level into one group and counts them. You can also check a single value in the condition and gather everything else into one group with <code>ELSE</code>; then the result has only two groups. GROUP BY on an alias works in SQLite and PostgreSQL; some databases need the whole CASE expression repeated in GROUP BY.</p>
<div class="tip"><b>Common mistakes:</b>
<ul>
<li><b>The order of conditions.</b> If <code>WHEN price &gt;= 5000</code> comes first, the laptop also ends up "medium". Start with the biggest threshold.</li>
<li><b>Forgetting ELSE.</b> Without ELSE, rows that match no condition get <code>NULL</code>.</li>
<li><b>Forgetting END</b> or misplacing a comma. CASE ... END is one column, and the comma goes after it.</li>
</ul></div>`,
      ex: [
        { prompt: 'Show each product\'s name, price and a <code>segment</code> column: 100 000 and above is <code>қымбат</code> (expensive), 10 000 and above is <code>орташа</code> (mid-range), the rest are <code>арзан</code> (cheap). Use the Kazakh values exactly as shown.', hints: ["Second condition: <code>WHEN price >= 10000 THEN 'орташа'</code>", "At the end: <code>ELSE 'арзан'</code>"] },
        { prompt: "Split the orders into two groups and count them: <code>'жеткізілді'</code> (delivered) if the status is <code>delivered</code>, otherwise <code>'басқа'</code> (other). Columns: the group name and the count.", hints: ['Give the CASE expression an alias and GROUP BY that alias.'] }
      ]
    },
    'sql-10': {
      title: 'JOIN: combining tables',
      body: `
<p>The data is split across several tables: an order only has <code>customer_id</code>, while the customer's name is in the <code>customers</code> table. Picture a courier: their note says "deliver to customer 3", and to find the name they look up number 3 in the customer book. <code>JOIN</code> does that lookup automatically for every row. It is like XLOOKUP in Excel, but for a whole table at once.</p>
<h3>Example: adding the customer name to an order</h3>
<p><code>orders</code>:</p>
<table>
<tr><th>id</th><th>customer_id</th><th>order_date</th></tr>
<tr><td>101</td><td>1</td><td>2024-08-02</td></tr>
<tr><td>102</td><td>2</td><td>2024-08-05</td></tr>
<tr><td>103</td><td>1</td><td>2024-08-19</td></tr>
</table>
<p><code>customers</code>:</p>
<table>
<tr><th>id</th><th>name</th></tr>
<tr><td>1</td><td>Айгерім</td></tr>
<tr><td>2</td><td>Нұрлан</td></tr>
<tr><td>3</td><td>Дана</td></tr>
</table>
<pre><code>SELECT o.id, c.name, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id;</code></pre>
<table>
<tr><th>id</th><th>name</th><th>order_date</th></tr>
<tr><td>101</td><td>Айгерім</td><td>2024-08-02</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>2024-08-05</td></tr>
<tr><td>103</td><td>Айгерім</td><td>2024-08-19</td></tr>
</table>
<p>For each order, SQL found the row in <code>customers</code> whose <code>id</code> equals <code>customer_id</code>. Айгерім has two orders, so her name appears twice.</p>
<p><code>ON</code> says which columns link the tables. Usually that is a <b>foreign key</b> (<code>orders.customer_id</code>) and a <b>primary key</b> (<code>customers.id</code>).</p>
<h3>INNER JOIN</h3>
<p><code>JOIN</code> = <code>INNER JOIN</code>: only rows with a match in both tables remain. A customer with no orders is not in the result: Дана is missing in the example.</p>
<p>After a JOIN you write <code>WHERE</code>, <code>ORDER BY</code> and <code>GROUP BY</code> as usual. For example, only Айгерім's orders: <code>... JOIN ... ON ... WHERE c.name = 'Айгерім'</code>.</p>
<div class="tip">If both tables have a column with the same name (such as <code>id</code> or <code>name</code>), always write the table name or alias: <code>c.name</code>, <code>p.name</code>.</div>
<h3>Calculating revenue</h3>
<p>Order revenue = quantity × price. The quantity is in <code>order_items</code> and the price is in <code>products</code>, so we join them:</p>
<pre><code>SELECT oi.order_id, SUM(oi.quantity * p.price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY oi.order_id;</code></pre>
<p>After the JOIN and before grouping, the intermediate table looks like this:</p>
<table>
<tr><th>order_id</th><th>product</th><th>quantity</th><th>price</th><th>quantity × price</th></tr>
<tr><td>101</td><td>Ноутбук</td><td>1</td><td>350000</td><td>350000</td></tr>
<tr><td>101</td><td>Құлаққап</td><td>1</td><td>25000</td><td>25000</td></tr>
<tr><td>102</td><td>Кітап: SQL негіздері</td><td>2</td><td>6500</td><td>13000</td></tr>
<tr><td>102</td><td>Блокнот</td><td>5</td><td>1200</td><td>6000</td></tr>
</table>
<p>GROUP BY adds up the rows of each order:</p>
<table>
<tr><th>order_id</th><th>revenue</th></tr>
<tr><td>101</td><td>375000</td></tr>
<tr><td>102</td><td>19000</td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li><b>Joining on the wrong column:</b> <code>ON o.id = c.id</code>. An order number is not a customer number! The link is always foreign key → primary key: <code>o.customer_id = c.id</code>.</li>
<li><b>Forgetting ON.</b> A JOIN without a condition pairs every row with every row of the other table: 15 × 10 = 150 rows.</li>
<li><b>Mixing up the order.</b> <code>WHERE</code> comes after the JOIN, not before: <code>FROM → JOIN ... ON → WHERE → GROUP BY</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Show each order\'s <code>id</code>, the customer\'s name and the order date.', hints: ['<code>JOIN customers c ON o.customer_id = c.id</code>'] },
        { prompt: 'Show the names and quantities (<code>quantity</code>) of the products in order 105.', hints: ['Join <code>order_items</code> and <code>products</code>.', 'Filter: <code>WHERE oi.order_id = 105</code>'] },
        { prompt: 'Calculate the revenue of each order: <code>order_id</code> and the sum of <code>quantity × price</code>.', hints: ['Look at the last example in the lesson.'] }
      ]
    },
    'sql-11': {
      title: 'LEFT JOIN and several JOINs',
      body: `
<p>Picture a class register: the list of students is always complete, and a student who missed the lesson simply has an empty mark. Nobody crosses them off the list. <code>LEFT JOIN</code> works exactly like that: it keeps <b>all</b> rows of the left table. If there is no match on the right, its columns are <code>NULL</code>. INNER JOIN would drop that "absent student" from the list.</p>
<h3>Example: customers and their orders</h3>
<p><code>customers</code>: 1 Айгерім, 2 Нұрлан, 8 Бауыржан. <code>orders</code>: 101 (customer 1), 102 (customer 2), 103 (customer 1).</p>
<pre><code>SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;</code></pre>
<table>
<tr><th>name</th><th>order_id</th></tr>
<tr><td>Айгерім</td><td>101</td></tr>
<tr><td>Айгерім</td><td>103</td></tr>
<tr><td>Нұрлан</td><td>102</td></tr>
<tr><td>Бауыржан</td><td>NULL</td></tr>
</table>
<p>Бауыржан has no orders, but he stays in the result with an empty <code>order_id</code>. With INNER JOIN this row would not exist at all.</p>
<p>This answers questions like "customers who never ordered": we keep the rows left with <code>NULL</code> using <code>WHERE o.id IS NULL</code>. In the example above only Бауыржан remains.</p>
<h3>Counting after a LEFT JOIN</h3>
<p>If we count each customer's orders with GROUP BY, the difference between the two ways shows:</p>
<table>
<tr><th>name</th><th>COUNT(*)</th><th>COUNT(o.id)</th></tr>
<tr><td>Айгерім</td><td>2</td><td>2</td></tr>
<tr><td>Нұрлан</td><td>1</td><td>1</td></tr>
<tr><td>Бауыржан</td><td>1 (wrong)</td><td>0 (right)</td></tr>
</table>
<p><code>COUNT(*)</code> also counts Бауыржан's NULL row. <code>COUNT(o.id)</code> does not count NULL, so it gives the correct 0. When grouping, add <code>c.id</code> as well, so that two customers with the same name do not merge into one group.</p>
<h3>Kinds of JOIN</h3>
<table>
<tr><th>Kind</th><th>What remains</th></tr>
<tr><td>INNER JOIN</td><td>only rows with a match on both sides</td></tr>
<tr><td>LEFT JOIN</td><td>everything from the left + matches from the right</td></tr>
<tr><td>RIGHT JOIN</td><td>everything from the right + matches from the left</td></tr>
<tr><td>FULL JOIN</td><td>everything from both sides</td></tr>
</table>
<h3>Several JOINs</h3>
<p>JOINs can be chained: order → customer, order → items → product. Each new JOIN attaches to an already joined table with its own <code>ON</code> condition:</p>
<pre><code>SELECT o.id, c.name, p.name AS product, oi.quantity
FROM orders o
JOIN customers c    ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id;</code></pre>
<table>
<tr><th>id</th><th>name</th><th>product</th><th>quantity</th></tr>
<tr><td>101</td><td>Айгерім</td><td>Ноутбук</td><td>1</td></tr>
<tr><td>101</td><td>Айгерім</td><td>Құлаққап</td><td>1</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>Кітап: SQL негіздері</td><td>2</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>Блокнот</td><td>5</td></tr>
</table>
<p>Now one row holds the customer's city, the product's price and the order's status. From here you write <code>WHERE</code>, <code>GROUP BY</code> and <code>ORDER BY</code> as usual and can filter, group and sort by any column.</p>
<div class="tip"><b>Common mistakes:</b>
<ul>
<li>When counting after a LEFT JOIN, write <code>COUNT(o.id)</code>, not <code>COUNT(*)</code>. Otherwise a customer with no orders counts as 1 instead of 0.</li>
<li>If after a LEFT JOIN you write WHERE on the right table (for example <code>WHERE o.status = 'delivered'</code>), the NULL rows disappear and the LEFT JOIN turns into a plain INNER JOIN. Put such a condition inside <code>ON ... AND o.status = 'delivered'</code>.</li>
<li>With several JOINs, an <code>ON</code> that points to a table not joined yet is an error. Join tables in the order they link.</li>
</ul></div>`,
      ex: [
        { prompt: 'Show the names of customers who have not placed a single order.', hints: ['LEFT JOIN, then <code>WHERE o.id IS NULL</code>.'] },
        { prompt: 'Show each customer\'s name and number of orders. Customers with no orders should show 0.', hints: ['Use <code>COUNT(o.id)</code>.', 'GROUP BY: <code>c.id, c.name</code>'] },
        { prompt: 'Using only <code>delivered</code> orders, show the revenue of each city (<code>city</code>, revenue), from highest revenue down.', hints: ['You need three JOINs: customers, order_items, products.', "<code>WHERE o.status = 'delivered'</code>, <code>GROUP BY c.city</code>, <code>ORDER BY revenue DESC</code>"] }
      ]
    },
    'sql-12': {
      title: 'Subqueries, EXISTS, ANY and ALL',
      body: `
<p>You would answer "which products cost more than average?" in two steps: first work out the average and jot it down, then compare against that number. A <b>subquery</b> is a query inside a query. It lets SQL work out that "number on paper" itself. A subquery is always in brackets, and SQL runs the inner query first.</p>
<h3>A subquery that returns one value</h3>
<p>Four products: Құлаққап 25000, Рюкзак 15000, Термос 9000, Блокнот 1200.</p>
<pre><code>SELECT name, price FROM products
WHERE price &gt; (SELECT AVG(price) FROM products);</code></pre>
<p>Step 1: the inner query gives (25000 + 15000 + 9000 + 1200) / 4 = 12550. Step 2: the query runs as <code>WHERE price &gt; 12550</code>:</p>
<table>
<tr><th>name</th><th>price</th></tr>
<tr><td>Құлаққап</td><td>25000</td></tr>
<tr><td>Рюкзак</td><td>15000</td></tr>
</table>
<p>Why not type 12550 by hand? When the data changes, the average changes too, and the subquery recalculates it every time.</p>
<h3>A subquery that returns a list + IN</h3>
<pre><code>SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'cancelled');</code></pre>
<p>The inner query returns the customers of cancelled orders: <code>(3, 10)</code>. The outer query becomes <code>WHERE id IN (3, 10)</code> and shows Дана and Арман. The WHERE in the inner query can be any condition: <code>=</code>, <code>BETWEEN</code>, <code>LIKE</code> on a date and so on.</p>
<h3>EXISTS</h3>
<p><code>EXISTS</code> is true if the inner query finds at least one row. <code>NOT EXISTS</code> is the opposite:</p>
<pre><code>SELECT p.name FROM products p
WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id);</code></pre>
<p>Here the inner query runs again <b>for each product</b>, because it refers to the outer <code>p.id</code>. For the laptop (id 1) a row is found in <code>order_items</code> → EXISTS is true → NOT EXISTS is false, so the laptop is not shown. The desk lamp (Үстел шамы, id 11) is in no order → it makes it into the result. <code>SELECT 1</code> means "what it returns does not matter, only whether a row exists".</p>
<h3>ANY and ALL</h3>
<p>In databases like PostgreSQL, <code>price &gt; ALL (SELECT ...)</code> means "greater than all of them" and <code>price &gt; ANY (...)</code> means "greater than at least one". The SQLite in our browser does not support them, but there is a way to write the same thing: <code>&gt; ALL</code> = <code>&gt; (SELECT MAX(...))</code>, <code>&gt; ANY</code> = <code>&gt; (SELECT MIN(...))</code>.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Comparing a list with <code>&gt;</code> or <code>=</code>.</b> If the inner query returns a list, you need <code>IN</code>. SQLite does not raise an error here; it quietly takes the first value, and the result is silently wrong.</li>
<li><b>NOT IN and NULL.</b> If the inner list contains a single <code>NULL</code>, <code>NOT IN</code> returns an empty result. <code>NOT EXISTS</code> is safer in such cases.</li>
<li><b>Several columns inside IN.</b> <code>id IN (SELECT customer_id, order_date ...)</code> is an error: for IN the subquery must return one column.</li>
</ul>`,
      ex: [
        { prompt: 'Show the name and price of products that cost more than the average price.', hints: ['Work out the average with a subquery: <code>(SELECT AVG(price) FROM products)</code>.'] },
        { prompt: 'Show the names of customers who ordered in November 2024. Use <code>IN</code> and a subquery.', hints: ["November: <code>order_date LIKE '2024-11%'</code>"] },
        { prompt: 'Find the names of products that were never sold, using <code>NOT EXISTS</code>.', hints: ['Look at the EXISTS example in the lesson.'] }
      ]
    },
    'sql-13': {
      title: 'DDL and DML: creating and changing tables',
      body: `
<p>So far we have only read data. SQL commands fall into several groups:</p>
<table>
<tr><th>Group</th><th>Commands</th><th>Used for</th></tr>
<tr><td><b>DQL</b></td><td>SELECT</td><td>reading data</td></tr>
<tr><td><b>DDL</b></td><td>CREATE, ALTER, DROP, TRUNCATE</td><td>defining table structure</td></tr>
<tr><td><b>DML</b></td><td>INSERT, UPDATE, DELETE</td><td>changing data</td></tr>
<tr><td><b>TCL</b></td><td>BEGIN, COMMIT, ROLLBACK, SAVEPOINT</td><td>transactions</td></tr>
<tr><td><b>DCL</b></td><td>GRANT, REVOKE</td><td>permissions</td></tr>
</table>
<h3>CREATE TABLE and constraints</h3>
<pre><code>CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  hours INTEGER CHECK (hours &gt; 0),
  level TEXT DEFAULT 'beginner'
);</code></pre>
<p><code>PRIMARY KEY</code> is a row's unique identifier. <code>FOREIGN KEY</code> (<code>REFERENCES</code>) is a link to another table. <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code> and <code>DEFAULT</code> protect data quality.</p>
<h3>INSERT, UPDATE, DELETE</h3>
<pre><code>INSERT INTO courses (id, title, hours) VALUES (1, 'SQL', 40);
UPDATE products SET price = price * 1.1 WHERE category = 'Кітаптар';
DELETE FROM orders WHERE status = 'cancelled';
ALTER TABLE customers ADD COLUMN phone TEXT;</code></pre>
<div class="tip">If you write UPDATE or DELETE <b>without WHERE</b>, the whole table changes. At work, first run a SELECT with the same WHERE and check which rows will change.</div>
<h3>Staying safe when changing data</h3>
<ol>
<li>Before a change, run <code>SELECT COUNT(*)</code> with the same <code>WHERE</code>: find out how many rows will change.</li>
<li>Wrap the commands in a transaction and <code>COMMIT</code> only after checking the result (next lesson).</li>
<li>Do not change data directly in a production database: analysts usually get read-only access.</li>
</ol>
<h3>DROP vs DELETE vs TRUNCATE</h3>
<table>
<tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>DELETE FROM t WHERE ...</code></td><td>Deletes the rows that match the condition; the table stays</td></tr>
<tr><td><code>DELETE FROM t</code> / <code>TRUNCATE t</code></td><td>Deletes all rows; the structure stays (SQLite has no TRUNCATE)</td></tr>
<tr><td><code>DROP TABLE t</code></td><td>Removes the table completely, structure included</td></tr>
</table>
<div class="tip">You can add several rows with one INSERT: <code>INSERT INTO t (a, b) VALUES (1, 'x'), (2, 'y');</code>. This is faster than writing a separate command for each row.</div>`,
      ex: [
        { prompt: 'Create a <code>courses</code> table: <code>id</code> INTEGER PRIMARY KEY, <code>title</code> TEXT NOT NULL, <code>hours</code> INTEGER. Then add two rows: (1, \'SQL\', 40) and (2, \'Python\', 50).', hints: ['You can add several rows with one INSERT: <code>VALUES (...), (...)</code>.'] },
        { prompt: 'Raise the prices of products in the «Кітаптар» (books) category by 10%.', hints: ["<code>UPDATE products SET price = price * 1.1 WHERE ...</code>"] },
        { prompt: 'Delete the orders with the status <code>cancelled</code>.', hints: ["<code>DELETE FROM orders WHERE status = 'cancelled';</code>"] },
        { prompt: 'Add a TEXT column called <code>phone</code> to the <code>customers</code> table.', hints: ['<code>ALTER TABLE ... ADD COLUMN ...</code>'] }
      ]
    },
    'sql-14': {
      title: 'Transactions, views and permissions',
      body: `
<h3>Transactions (TCL)</h3>
<p>A transaction is a group of commands that must run together. In a bank transfer, for example, money must leave one account and arrive in another: if only one happens, the money is lost.</p>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 5000 WHERE id = 1;
UPDATE accounts SET balance = balance + 5000 WHERE id = 2;
COMMIT;      -- make the changes permanent</code></pre>
<p><code>ROLLBACK</code> undoes the changes since the start of the transaction. <code>SAVEPOINT name</code> is a marker inside it that you can return to with <code>ROLLBACK TO name</code>.</p>
<h3>VIEW</h3>
<p>A <code>VIEW</code> is a saved query. It is read like a table but stores no data:</p>
<pre><code>CREATE VIEW big_orders AS
SELECT * FROM order_items WHERE quantity &gt;= 3;

SELECT * FROM big_orders;</code></pre>
<h3>Permissions (DCL)</h3>
<p>In server databases (PostgreSQL, MySQL), <code>GRANT</code> and <code>REVOKE</code> control who can do what:</p>
<pre><code>GRANT SELECT ON orders TO analyst;
REVOKE DELETE ON orders FROM analyst;</code></pre>
<p>SQLite is a file-based database, so it has no such commands. An analyst is usually given only the <code>SELECT</code> permission.</p>
<h3>ACID: four guarantees of a transaction</h3>
<ul>
<li><b>Atomicity</b>: the commands in a transaction either all run or none do.</li>
<li><b>Consistency</b>: after a transaction, the data satisfies all constraints.</li>
<li><b>Isolation</b>: concurrent transactions do not interfere with each other.</li>
<li><b>Durability</b>: a committed change survives even if the server shuts down.</li>
</ul>
<h3>When is a VIEW useful?</h3>
<p>If your colleagues often use the same complex query (several JOINs, filters), save it as a VIEW. Then everyone uses the same logic, and if a rule needs to change, you only recreate the VIEW. For example, if you write the definition of an “active customer” in one VIEW, it will be the same in every report.</p>
<p>Dropping a VIEW: <code>DROP VIEW big_orders;</code>. This does not affect the underlying table.</p>
<div class="tip">A VIEW re-runs its query every time it is read. For heavy calculations some databases have a <b>materialized view</b>: it stores the result and reads as fast as a table, but it has to be refreshed from time to time.</div>`,
      ex: [
        { prompt: 'Create a VIEW called <code>delivered_orders</code>: only the rows of <code>orders</code> with the status <code>delivered</code> (all columns).', hints: ['<code>CREATE VIEW delivered_orders AS SELECT ...</code>'] },
        { prompt: 'Start a transaction, set the price of every product to 0, then do a <b>ROLLBACK</b> and show the sum of prices. The sum should be the same as before.', hints: ['Write <code>ROLLBACK;</code> after the UPDATE.'] },
        { prompt: 'An analyst should only be allowed to read the <code>sales</code> table. Which command does that?', options: ['REVOKE SELECT ON sales FROM analyst;', 'GRANT SELECT ON sales TO analyst;', 'GRANT ALL ON sales TO analyst;', 'COMMIT sales;'], explain: 'GRANT SELECT gives read-only access. GRANT ALL gives far too much.' }
      ]
    },
    'sql-gate': {
      title: 'Module exam: SQL Core',
      body: `
<p>This is the module's final check. The tasks mix all the lessons, and there are no hints. Complete them all and the module is done, bringing you closer to the <b>L2 SQL Practitioner</b> level.</p>
<p>Same database: <code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>.</p>
<div class="tip">Take your time: look at the intermediate result with "Run" first, then check.</div>`,
      ex: [
        { prompt: 'Using only <code>delivered</code> orders, show the names of the 3 customers who spent the most and their total, from highest down.' },
        { prompt: 'For each month (as <code>YYYY-MM</code>), show the number of distinct customers who ordered, with months in ascending order. Tip: <code>substr(order_date, 1, 7)</code>.' },
        { prompt: 'Show the names of products with at least 3 items sold in total, and the total quantity sold.' },
        { prompt: 'In the query <code>customers c LEFT JOIN orders o ... WHERE o.status = \'delivered\'</code>, do customers with no orders appear in the result?', options: ['Yes, with NULL', 'No: the WHERE condition removes the NULL rows, so it works like an INNER JOIN', 'Only once', 'It raises an error'], explain: 'NULL = \'delivered\' is not true. Only if you move the condition into ON does the LEFT JOIN keep every customer.' }
      ]
    }
  }
});
