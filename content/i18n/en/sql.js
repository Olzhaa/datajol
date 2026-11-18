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
<p><b>Writing order</b> (you write the query in this order): <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code>.</p>
<p><b>Execution order</b> (the database actually computes in this order, called the logical order): <code>FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT</code>. So the database first takes the table (JOIN, which you learn later, also happens at this step), filters the rows, groups them, filters the groups, and only then computes the columns in SELECT. This is why you cannot write an aggregate in WHERE: when it runs, the groups have not been built yet.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Putting an aggregate in WHERE:</b> <code>WHERE COUNT(*) &gt; 1</code> is an error. At the WHERE stage there are no groups yet: use HAVING.</li>
<li><b>Forgetting GROUP BY.</b> <code>SELECT city, COUNT(*) FROM customers</code> does not raise an error in our in-browser SQLite: it returns one row for the whole table and puts one arbitrary city in <code>city</code>. This is a quirk of SQLite. Strict databases such as PostgreSQL reject such a query at once ("column city must appear in the GROUP BY clause").</li>
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
    'sql-15': {
      title: 'UNION, UNION ALL and sets',
      body: `
<p><code>JOIN</code> combines tables <b>horizontally</b>: new columns are attached to a row. But sometimes you need to combine two results <b>vertically</b>: put one list under another. For example, gather the customers of August and November into one list, or add a "Total" row at the end of a table. Set operators do this.</p>
<table>
<tr><th>Operator</th><th>What it returns</th><th>Duplicates</th></tr>
<tr><td><code>UNION</code></td><td>the union of two results</td><td>removed</td></tr>
<tr><td><code>UNION ALL</code></td><td>the union of two results</td><td>kept</td></tr>
<tr><td><code>INTERSECT</code></td><td>rows present in both</td><td>removed</td></tr>
<tr><td><code>EXCEPT</code></td><td>rows present in the first but not in the second</td><td>removed</td></tr>
</table>
<h3>Example: UNION and UNION ALL</h3>
<p>Customers who ordered in August: 1, 2, 1 (Айгерім twice). In October: 2, 9, 5, 1.</p>
<pre><code>SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%'
UNION
SELECT customer_id FROM orders WHERE order_date LIKE '2024-10%';</code></pre>
<p>The result has 4 rows: <code>1, 2, 5, 9</code>. <code>UNION</code> removed the duplicates: both between the two lists and inside a single list. If we write the same query with <code>UNION ALL</code>, we get 7 rows: <code>1, 2, 1, 2, 9, 5, 1</code>. Nothing is removed, the rows are simply stacked one under another.</p>
<div class="tip">If you know there will be no duplicates, or you need them, write <code>UNION ALL</code>. To find duplicates, <code>UNION</code> compares the whole result, so it is slow on a large table. In a report that adds up revenue, <code>UNION</code> is dangerous: two separate orders with the same amount collapse into one row, and revenue comes out too low.</div>
<h3>The rule: the columns must match</h3>
<ul>
<li>Both SELECTs must have <b>the same number</b> of columns.</li>
<li>The types of matching columns must be <b>compatible</b>: a number under a number, text under text. SQLite does not check this, but PostgreSQL raises an error.</li>
<li>The column names are taken from the <b>first</b> SELECT.</li>
<li><code>ORDER BY</code> is written once at the very end and applies to the whole combined result.</li>
</ul>
<h3>Example: a "Total" row</h3>
<pre><code>SELECT status, COUNT(*) AS orders FROM orders GROUP BY status
UNION ALL
SELECT 'Барлығы', COUNT(*) FROM orders;   -- 'Барлығы' = "total"</code></pre>
<table>
<tr><th>status</th><th>orders</th></tr>
<tr><td>cancelled</td><td>2</td></tr>
<tr><td>delivered</td><td>10</td></tr>
<tr><td>shipped</td><td>3</td></tr>
<tr><td>Барлығы</td><td>15</td></tr>
</table>
<p>In the second SELECT, <code>'Барлығы'</code> is plain text (a constant). It lands under the <code>status</code> column.</p>
<h3>INTERSECT and EXCEPT</h3>
<pre><code>-- customers who ordered both in August and in October
SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%'
INTERSECT
SELECT customer_id FROM orders WHERE order_date LIKE '2024-10%';   -- 1, 2

-- customers who have never ordered
SELECT id FROM customers
EXCEPT
SELECT customer_id FROM orders;                                     -- 8</code></pre>
<p>In <code>EXCEPT</code> the order matters: "in A, not in B". Swap them and you get a completely different question. <code>EXCEPT</code> and <code>NOT EXISTS</code> can answer the same question; the difference is that <code>EXCEPT</code> compares whole rows and removes duplicates.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>A different number of columns:</b> <code>SELECT id, name ... UNION SELECT id ...</code> raises an error.</li>
<li><b>Columns in the wrong order:</b> <code>SELECT name, city ... UNION SELECT city, name ...</code> raises no error, but cities and names get mixed in one column. SQL matches columns <b>by position</b>, not by name.</li>
<li><b>UNION instead of UNION ALL:</b> duplicates you need are silently removed, and the numbers come out too low.</li>
<li><b>A separate ORDER BY for each SELECT:</b> sorting is written only at the end.</li>
</ul>`,
      ex: [
        { prompt: 'Show the list of <code>customer_id</code> values, without duplicates, of customers who ordered in August (<code>2024-08</code>) <b>or</b> in November (<code>2024-11</code>). Combine two SELECTs with <code>UNION</code>.', hints: ['The second SELECT is exactly the same, only the month differs.', "<code>... LIKE '2024-08%' UNION SELECT customer_id FROM orders WHERE order_date LIKE '2024-11%'</code>"] },
        { prompt: 'Show the number of products in each category (<code>category</code>), and with <code>UNION ALL</code> add a row labeled <code>Барлығы</code> ("total") at the end, holding the number of all products. Two columns: the category and the count.', hints: ["In the second SELECT write text in place of the category: <code>SELECT 'Барлығы', COUNT(*) FROM products</code>.", 'Both SELECTs must have two columns.'] },
        { prompt: 'Using <code>EXCEPT</code>, find the <code>id</code> of customers who have <b>no</b> <code>delivered</code> order at all.', hints: ['The first set is the <code>id</code> of all customers.', "The second set is the <code>customer_id</code> of <code>delivered</code> orders. Put <code>EXCEPT</code> between them."] },
        { prompt: 'Using <code>INTERSECT</code>, find the <code>customer_id</code> of customers who ordered both in August (<code>2024-08</code>) and in October (<code>2024-10</code>).', hints: ['Look at the INTERSECT example in the lesson.'] },
        { prompt: 'You are about to combine the sales tables of two branches and calculate total revenue. Which operator do you choose, and why?', options: ['UNION: it removes duplicates, so the result is clean', 'UNION ALL: every row is kept; UNION would turn two separate sales with the same amount and date into one row and understate revenue', 'INTERSECT: it gives the rows present in both', 'EXCEPT: it removes the extra rows'], explain: 'When you stack rows and then aggregate, always use UNION ALL. UNION is only for when you need a "list without duplicates".' }
      ]
    },
    'sql-16': {
      title: 'Date and text functions',
      body: `
<p>Most real reports are tied to time: monthly revenue, the number of days from signup to the first order. And real data is often dirty: extra spaces, mixed case, numbers stored as text. In this lesson you learn the functions you need for both.</p>
<div class="tip">Date and text functions have different names in different databases. Here you write the <b>SQLite</b> version that runs in the browser, and at the end of the lesson there is a table of <b>PostgreSQL</b> equivalents: those are the ones you meet more often at work.</div>
<h3>Parts of a date: strftime</h3>
<p>In our tables a date is text like <code>'2024-08-19'</code> (ISO format: year-month-day). <code>strftime(format, date)</code> takes the part you need from it:</p>
<table>
<tr><th>Expression</th><th>Result</th><th>Meaning</th></tr>
<tr><td><code>strftime('%Y', '2024-08-19')</code></td><td>2024</td><td>year</td></tr>
<tr><td><code>strftime('%m', '2024-08-19')</code></td><td>08</td><td>month</td></tr>
<tr><td><code>strftime('%d', '2024-08-19')</code></td><td>19</td><td>day</td></tr>
<tr><td><code>strftime('%Y-%m', '2024-08-19')</code></td><td>2024-08</td><td>month key</td></tr>
<tr><td><code>strftime('%w', '2024-08-19')</code></td><td>1</td><td>day of the week (0 is Sunday)</td></tr>
</table>
<p>The result is text. If you need a number, convert it: <code>CAST(strftime('%m', order_date) AS INTEGER)</code> → 8.</p>
<h3>"Truncating" to the month</h3>
<p>For a monthly report we bring each date to its month. There are two ways:</p>
<pre><code>SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;</code></pre>
<table>
<tr><th>month</th><th>orders</th></tr>
<tr><td>2024-08</td><td>3</td></tr>
<tr><td>2024-09</td><td>4</td></tr>
<tr><td>2024-10</td><td>4</td></tr>
<tr><td>…</td><td>…</td></tr>
</table>
<p>The second way is the first day of the month: <code>date(order_date, 'start of month')</code> → <code>2024-08-01</code>. This is called month truncation. Do not forget the year: if you group by <code>'%m'</code> alone, the Augusts of different years fall into one group.</p>
<h3>Shifting dates and differences</h3>
<pre><code>date('2024-08-19', '+7 days')         -- 2024-08-26
date('2024-08-19', '-1 month')        -- 2024-07-19
date('now')                           -- today's date

julianday('2024-08-19') - julianday('2024-08-02')   -- 17.0</code></pre>
<p><code>julianday</code> turns a date into a single number, so you can subtract one date from another. The difference is a number of days. If you subtract dates directly as text (<code>'2024-08-19' - '2024-08-02'</code>), SQLite subtracts only the years and returns 0.</p>
<pre><code>SELECT o.id,
       CAST(julianday(o.order_date) - julianday(c.signup_date) AS INTEGER) AS days
FROM orders o
JOIN customers c ON c.id = o.customer_id;</code></pre>
<p>Order 101: Айгерім signed up on 2024-01-15 and ordered on 2024-08-02 → 200 days.</p>
<h3>Text functions</h3>
<table>
<tr><th>Function</th><th>Example</th><th>Result</th></tr>
<tr><td><code>LENGTH</code></td><td><code>LENGTH('Алматы')</code></td><td>6</td></tr>
<tr><td><code>SUBSTR(text, start, length)</code></td><td><code>SUBSTR('2024-08-19', 1, 7)</code></td><td>2024-08</td></tr>
<tr><td><code>REPLACE</code></td><td><code>REPLACE('12 500', ' ', '')</code></td><td>12500</td></tr>
<tr><td><code>TRIM</code></td><td><code>TRIM('  Айгерім ')</code></td><td>Айгерім</td></tr>
<tr><td><code>UPPER</code>, <code>LOWER</code></td><td><code>LOWER('NURLAN@mail.kz')</code></td><td>nurlan@mail.kz</td></tr>
<tr><td><code>||</code></td><td><code>name || ' (' || city || ')'</code></td><td>Айгерім (Алматы)</td></tr>
</table>
<p>In <code>SUBSTR</code> counting starts <b>from 1</b> (not from 0 as in Python). When the date is in ISO format, <code>SUBSTR(order_date, 1, 7)</code> also gives the month key.</p>
<div class="tip">In SQLite, <code>UPPER</code> and <code>LOWER</code> change only Latin letters: <code>LOWER('АЛМАТЫ')</code> stays unchanged. For emails that is enough. PostgreSQL changes Cyrillic correctly too.</div>
<h3>Changing the type: CAST</h3>
<p>In the "Messy data" database the amount is stored as text: <code>'12 500'</code>, <code>'8000'</code>. Text cannot be added up or compared as a number. First we remove the space, then turn it into a number:</p>
<pre><code>SELECT id, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num
FROM raw_orders;</code></pre>
<p><code>CAST(value AS type)</code>: <code>INTEGER</code> is a whole number, <code>REAL</code> is a decimal number, <code>TEXT</code> is text. Be careful: SQLite turns text that is not a number (<code>'abc'</code>) into <b>0</b> without an error. PostgreSQL raises an error in that case.</p>
<p>You also need CAST when dividing whole numbers: <code>7 / 2</code> = 3, while <code>CAST(7 AS REAL) / 2</code> or <code>7 * 1.0 / 2</code> = 3.5.</p>
<h3>Working with NULL: COALESCE and NULLIF</h3>
<ul>
<li><code>COALESCE(a, b, c)</code> returns the first value that is not NULL: <code>COALESCE(city, 'белгісіз')</code>.</li>
<li><code>NULLIF(a, b)</code> is NULL if <code>a = b</code>, otherwise <code>a</code>. Its most common use is protecting against division by zero: <code>revenue / NULLIF(orders, 0)</code>. If there are 0 orders, the divisor becomes NULL and the result is NULL instead of an error.</li>
<li>Turning empty text into NULL: <code>NULLIF(TRIM(phone), '')</code>.</li>
</ul>
<h3>PostgreSQL equivalents</h3>
<table>
<tr><th>What you need</th><th>SQLite</th><th>PostgreSQL</th></tr>
<tr><td>Truncate to the start of the month</td><td><code>date(d, 'start of month')</code></td><td><code>DATE_TRUNC('month', d)</code></td></tr>
<tr><td>Month key as text</td><td><code>strftime('%Y-%m', d)</code></td><td><code>TO_CHAR(d, 'YYYY-MM')</code></td></tr>
<tr><td>Month number</td><td><code>CAST(strftime('%m', d) AS INTEGER)</code></td><td><code>EXTRACT(MONTH FROM d)</code></td></tr>
<tr><td>Add 7 days</td><td><code>date(d, '+7 days')</code></td><td><code>d + INTERVAL '7 days'</code></td></tr>
<tr><td>Difference between two dates</td><td><code>julianday(d2) - julianday(d1)</code></td><td><code>d2 - d1</code> (when both have the <code>date</code> type)</td></tr>
<tr><td>Today</td><td><code>date('now')</code></td><td><code>CURRENT_DATE</code></td></tr>
<tr><td>Change the type</td><td><code>CAST(x AS INTEGER)</code></td><td><code>CAST(x AS INTEGER)</code> or <code>x::int</code></td></tr>
</table>
<p><code>SUBSTR</code>, <code>LENGTH</code>, <code>REPLACE</code>, <code>TRIM</code>, <code>UPPER</code>, <code>LOWER</code>, <code>COALESCE</code> and <code>NULLIF</code> are written the same way in both.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Grouping by month without the year.</b> <code>GROUP BY strftime('%m', order_date)</code> mixes different years. Write <code>'%Y-%m'</code>.</li>
<li><b>Subtracting dates as text.</b> For a difference you need <code>julianday</code>.</li>
<li><b>A non-ISO format.</b> <code>strftime</code> does not understand a date like <code>'15.02.2024'</code> (it returns NULL), and when sorted it lands in the wrong place. First bring it to <code>YYYY-MM-DD</code> with <code>SUBSTR</code>.</li>
<li><b>Not checking CAST.</b> <code>'abc'</code> silently becomes 0. After converting, look through the 0 and NULL values.</li>
</ul>`,
      ex: [
        { prompt: 'Show the number of orders for each month: the month key (<code>YYYY-MM</code>, using <code>strftime</code>) and the count. Months in ascending order.', hints: ["The format: <code>'%Y-%m'</code>.", 'Add <code>GROUP BY month ORDER BY month</code>.'] },
        { prompt: 'For each order, calculate how many days passed from the customer\'s signup (<code>signup_date</code>) to the order (<code>order_date</code>). Two columns: the order <code>id</code> and the number of days.', hints: ['The difference: <code>julianday(o.order_date) - julianday(c.signup_date)</code>.', 'For a whole number, wrap it in <code>CAST(... AS INTEGER)</code>.'] },
        { prompt: 'Clean the <code>raw_customers</code> table. Show three columns: <code>id</code>, <code>name</code> with the spaces at its edges removed, and <code>email</code> in lowercase.', hints: ['<code>TRIM(name)</code> and <code>LOWER(email)</code>.'] },
        { prompt: 'In the <code>raw_orders</code> table, <code>amount</code> is text (<code>\'12 500\'</code>). Show two columns: <code>id</code> and the amount with spaces removed and converted to a whole number.', hints: ["First remove the space: <code>REPLACE(amount, ' ', '')</code>.", 'Then: <code>CAST(... AS INTEGER)</code>.'] },
        { prompt: 'At work you use PostgreSQL. You need to bring each order date to the first day of its month (in SQLite: <code>date(order_date, \'start of month\')</code>). How do you write it?', options: ["DATE_TRUNC('month', order_date)", "strftime('%Y-%m', order_date)", 'EXTRACT(MONTH FROM order_date)', "order_date + INTERVAL '1 month'"], explain: "DATE_TRUNC('month', ...) truncates a date to the start of the month. EXTRACT gives only the month number (without the year), INTERVAL shifts the date, and strftime does not exist in PostgreSQL." }
      ]
    },
    'sql-17': {
      title: 'Self join, the fan-out trap and execution order',
      body: `
<p>You know JOIN. In this lesson we look at three important sides of it: joining a table to itself, numbers silently multiplying after a JOIN, and the order in which a query actually runs. First, let's understand why tables are stored separately.</p>
<h3>Keys and normalization</h3>
<ul>
<li>A <b>primary key (PK)</b> is a column that uniquely identifies a row: <code>customers.id</code>. It never repeats and is never empty.</li>
<li>A <b>foreign key (FK)</b> is a column that points to the PK of another table: <code>orders.customer_id</code> → <code>customers.id</code>.</li>
</ul>
<table>
<tr><th>Relationship</th><th>Meaning</th><th>Example</th></tr>
<tr><td><b>1:N</b> (one-to-many)</td><td>one customer has many orders, each order has one customer</td><td><code>customers</code> → <code>orders</code></td></tr>
<tr><td><b>M:N</b> (many-to-many)</td><td>one order has many products, one product is in many orders</td><td><code>orders</code> ↔ <code>products</code>, with <code>order_items</code> between them</td></tr>
</table>
<p>An M:N relationship is not stored directly: a <b>junction table</b> is placed in the middle. <code>order_items</code> is exactly that: it has two FKs (<code>order_id</code>, <code>product_id</code>).</p>
<p>Why not write everything into one big table? Then the customer's city would repeat in every one of their orders. If the customer moves, you have to change all those rows, and if you miss one, the data contradicts itself. Storing each fact <b>in one place</b> and linking tables through keys is called <b>normalization</b>. Its price is writing JOINs when you analyze.</p>
<h3>Self join: joining a table to itself</h3>
<p>In the <code>employees</code> table, the <code>manager_id</code> column points to <code>id</code> in the same table: a manager is an employee too.</p>
<table>
<tr><th>id</th><th>name</th><th>manager_id</th></tr>
<tr><td>1</td><td>Серік</td><td>NULL</td></tr>
<tr><td>2</td><td>Гүлнар</td><td>1</td></tr>
<tr><td>3</td><td>Ақжол</td><td>2</td></tr>
</table>
<p>To show the manager's name next to each employee, we join the table to itself. We give one table two different aliases: <code>e</code> for the employee, <code>m</code> for the manager.</p>
<pre><code>SELECT e.name, m.name AS manager
FROM employees e
JOIN employees m ON m.id = e.manager_id;</code></pre>
<table>
<tr><th>name</th><th>manager</th></tr>
<tr><td>Гүлнар</td><td>Серік</td></tr>
<tr><td>Ақжол</td><td>Гүлнар</td></tr>
</table>
<p>Серік is missing from the result: his <code>manager_id</code> is NULL, so no matching row was found. To keep him too, write <code>LEFT JOIN</code>: then his <code>manager</code> column is NULL.</p>
<h3>CROSS JOIN</h3>
<p><code>CROSS JOIN</code> joins without a condition: every row of the first table is paired with every row of the second. 3 cities × 4 months = 12 rows. You need it to build the "skeleton" of a report: you make the list of all cities and months, then LEFT JOIN the actual sales to it. That way months with no sales show up too (as 0).</p>
<pre><code>SELECT c.city, m.month
FROM (SELECT DISTINCT city FROM customers) c
CROSS JOIN (SELECT DISTINCT strftime('%Y-%m', order_date) AS month FROM orders) m;</code></pre>
<p>Here there is a query in parentheses inside <code>FROM</code>. It is called a <b>derived table</b>: the database runs the inner query first and uses its result as a temporary table. It must be given an alias.</p>
<h3>Fan-out: JOIN multiplies rows</h3>
<p>When you JOIN over a 1:N relationship, a row on the "one" side is repeated for every match on the "many" side. This is called <b>fan-out</b>. Айгерім (id 1) has three orders: 101, 103, 111. Order 101 has two products.</p>
<pre><code>SELECT c.name, COUNT(*) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
WHERE c.id = 1;          -- gives 4, but there are 3 orders</code></pre>
<p>Once <code>order_items</code> is joined, one row is no longer an order but a product within an order. <code>COUNT(*)</code> counted product rows. There is no error message, the number is simply bigger. This is the analyst's most expensive mistake.</p>
<h3>Joining two "many" tables at once</h3>
<p>In the "Product metrics" database, two 1:N relationships go out from <code>users</code>: <code>activity</code> (active months) and <code>payments</code>. User 1 has 3 active months and 3 payments of 5 000 each.</p>
<pre><code>SELECT u.id, COUNT(a.month) AS months, SUM(p.amount) AS total
FROM users u
JOIN activity a ON a.user_id = u.id
JOIN payments p ON p.user_id = u.id
GROUP BY u.id;           -- user 1: months = 9, total = 45000</code></pre>
<p>Every activity row was paired with every payment row: 3 × 3 = 9 rows. The correct answer is 3 months and 15 000.</p>
<h3>The fix: aggregate first, then JOIN</h3>
<p>We collapse each "many" table in its own derived table so that there is <b>one row per user</b>, and only then join:</p>
<pre><code>SELECT u.id, a.months, p.total
FROM users u
JOIN (SELECT user_id, COUNT(*) AS months
      FROM activity GROUP BY user_id) a ON a.user_id = u.id
JOIN (SELECT user_id, SUM(amount) AS total
      FROM payments GROUP BY user_id) p ON p.user_id = u.id;</code></pre>
<p>Now the JOIN is 1:1 and nothing multiplies. If you only need a count, <code>COUNT(DISTINCT o.id)</code> helps too, but <code>DISTINCT</code> does not work for <code>SUM</code>: two payments with the same amount would be added only once.</p>
<div class="tip">After every JOIN ask yourself: "what is one row now?". When in doubt, compare <code>COUNT(*)</code> before and after the JOIN. If the row count grew, there is fan-out.</div>
<h3>Execution order</h3>
<p>You write a query starting from <code>SELECT</code>, but the database runs it in a different order:</p>
<pre><code>FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT</code></pre>
<table>
<tr><th>Consequence</th><th>Reason</th></tr>
<tr><td>You cannot write an aggregate in <code>WHERE</code></td><td>When WHERE runs, there are no groups yet</td></tr>
<tr><td>You cannot use an alias from <code>SELECT</code> in <code>WHERE</code></td><td>WHERE runs before SELECT, so the alias has not been created yet</td></tr>
<tr><td>You can use an alias in <code>ORDER BY</code></td><td>ORDER BY runs after SELECT</td></tr>
<tr><td>Fan-out breaks aggregates</td><td>JOIN runs first of all: GROUP BY sees the multiplied rows</td></tr>
</table>
<p>Note: SQLite accepts an alias in <code>WHERE</code> and <code>GROUP BY</code> as well (like <code>GROUP BY month</code> in this course). PostgreSQL raises an error for an alias in <code>WHERE</code> and <code>HAVING</code>: there you have to write the expression again.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Forgetting aliases in a self join.</b> The same table appears twice, so you must write <code>e.</code> or <code>m.</code> before every column.</li>
<li><b>Mixing up the direction of ON.</b> <code>m.id = e.manager_id</code> means "m is e's manager". Write it the other way round and you get the subordinates instead of the manager.</li>
<li><b>Trusting <code>COUNT(*)</code> after a JOIN.</b> First work out what one row is.</li>
<li><b>Joining two 1:N tables in one query and aggregating from both.</b> Collapse each one separately first.</li>
</ul>`,
      ex: [
        { prompt: 'Show each employee\'s name and their manager\'s name. Серік, who has no manager, must stay in the list too (his manager is <code>NULL</code>). 12 rows in total.', hints: ['Join the table to itself: <code>LEFT JOIN employees m ON m.id = e.manager_id</code>.', 'With a plain <code>JOIN</code>, Серік drops out: you get 11 rows.'] },
        { prompt: 'How many employees report to each manager? Two columns: the manager\'s name and the number of employees. People with no one reporting to them are not needed.', hints: ['Write the self join from the previous task with <code>JOIN</code>.', 'Group by the manager: <code>GROUP BY m.id, m.name</code>.'] },
        { prompt: 'This query gives wrong numbers because of fan-out (user 1 gets 9 months and 45 000). Fix it: first collapse <code>activity</code> and <code>payments</code> in separate derived tables, then join them. Three columns: <code>id</code>, the number of active months, the total of payments.', hints: ['<code>JOIN (SELECT user_id, COUNT(*) AS months FROM activity GROUP BY user_id) a ON a.user_id = u.id</code>', 'Write the same kind of derived table for <code>payments</code>: <code>SUM(amount) AS total</code>. The outer query needs no GROUP BY.'] },
        { prompt: 'Why does <code>SELECT price * 1.12 AS with_vat FROM products WHERE with_vat &gt; 10000</code> raise an error in PostgreSQL?', options: ['AS is written incorrectly', 'WHERE runs before SELECT, so the with_vat alias does not exist yet', 'You cannot multiply in WHERE', '1.12 is not a whole number'], explain: 'Execution order: FROM → WHERE → ... → SELECT. In the condition you have to write the expression again: WHERE price * 1.12 > 10000.' },
        { prompt: 'One student enrolls in many courses, and one course has many students. What is the right way to store this in a database?', options: ['Add course1, course2, course3 columns to the students table', 'Three tables: students, courses and a junction table (enrollments) that stores the ids of both', 'Write the students\' names separated by commas in the courses table', 'Write everything into one table and repeat the student\'s data for each course'], explain: 'This is an M:N relationship. It is always stored through a junction table with two foreign keys, like our order_items.' }
      ]
    },
    'sql-gate': {
      title: 'Module exam: SQL Core',
      body: `
<p>This is the module's final check. The tasks mix all the lessons, and there are no step-by-step hints. Complete them all and the module is done, bringing you closer to the <b>L2 SQL Practitioner</b> level.</p>
<p>Same database: <code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>.</p>
<div class="tip">Take your time: look at the intermediate result with "Run" first, then check.</div>`,
      ex: [
        { prompt: 'Using only <code>delivered</code> orders, show the names of the 3 customers who spent the most and their total, from highest down.' },
        { prompt: 'For each month (as <code>YYYY-MM</code>), show the number of distinct customers who ordered, with months in ascending order.' },
        { prompt: 'Show the names of products with at least 3 items sold in total, and the total quantity sold.' },
        { prompt: 'In the query <code>customers c LEFT JOIN orders o ... WHERE o.status = \'delivered\'</code>, do customers with no orders appear in the result?', options: ['Yes, with NULL', 'No: the WHERE condition removes the NULL rows, so it works like an INNER JOIN', 'Only once', 'It raises an error'], explain: 'NULL = \'delivered\' is not true. Only if you move the condition into ON does the LEFT JOIN keep every customer.' }
      ]
    }
  }
});
