// advanced practice tasks: English text. Code, solutions and checks are in content/practice/advanced.js.
DJ.i18n.patch({ lessons: {
 "adv-1": {
  "pr": [
   {
    "title": "Cheap electronics",
    "prompt": "In a CTE, select the <code>name</code> and <code>price</code> columns of the products in the «Электроника» category. Then, from this CTE, show the names of the products whose price is below 100,000 tenge.",
    "hints": [
     "<code>WITH el AS (SELECT ... WHERE category = 'Электроника')</code>",
     "Main query: <code>SELECT name FROM el WHERE ...</code>"
    ]
   },
   {
    "title": "Order count with a CTE",
    "prompt": "In a CTE, count the orders of each client (<code>customer_id</code>) under the name <code>n</code>. Then show the <code>customer_id</code> and <code>n</code> columns of the clients whose <code>n</code> is at least 2.",
    "hints": [
     "Inside the CTE, <code>GROUP BY customer_id</code>.",
     "After a CTE you write a normal <code>WHERE n &gt;= 2</code>, not <code>HAVING</code>."
    ]
   },
   {
    "title": "Delivered orders and clients",
    "prompt": "In a CTE, select only the <code>delivered</code> orders. Then join it with <code>customers</code> and show the client's name and the order date.",
    "hints": [
     "A CTE can be used in a JOIN like a table: <code>FROM d JOIN customers c ON c.id = d.customer_id</code>."
    ]
   },
   {
    "title": "Average order value",
    "prompt": "In a CTE, count the total of each order (the sum of <code>quantity × price</code>) under the name <code>total</code>. Then show the average total of all orders, rounded to a whole number.",
    "hints": [
     "First the total of each order, then their average: <code>SELECT ROUND(AVG(total)) FROM t</code>."
    ]
   },
   {
    "title": "Two CTEs together",
    "prompt": "Write two CTEs: <code>n</code> — the number of orders of each client (<code>customer_id</code>, <code>cnt</code>), and <code>r</code> — the total amount purchased by each client (<code>customer_id</code>, <code>total</code>). Show the names of the clients who have at least 2 orders, together with the columns <code>cnt</code> and <code>total</code>.",
    "hints": [
     "The CTEs are separated by a comma: <code>WITH n AS (...), r AS (...)</code>.",
     "At the end, join customers with both CTEs."
    ]
   },
   {
    "title": "Sales by city",
    "prompt": "In a CTE, count the total purchases of each client (<code>customer_id</code>, <code>total</code>). Then add up the totals by the client's city and show <code>city</code> and the total per city, sorted by the total in descending order.",
    "hints": [
     "The result of a CTE can be grouped once more: <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Orders above average",
    "prompt": "In a CTE, count the total of each order (<code>order_id</code>, <code>total</code>). Show the orders whose total is above the average total of all orders, with the columns <code>order_id</code> and <code>total</code>, sorted by the total in descending order.",
    "hints": [
     "One CTE can be used twice: in the main query and in a subquery.",
     "<code>WHERE total &gt; (SELECT AVG(total) FROM t)</code>"
    ]
   },
   {
    "title": "Best-selling category",
    "prompt": "Write two CTEs: <code>sold</code> — the number of units sold of each product (<code>product_id</code>, <code>q</code>), and <code>cat</code> — the number of units sold of each category (<code>category</code>, <code>q</code>). Show the category that sold the most units, with the columns <code>category</code> and <code>q</code>.",
    "hints": [
     "The second CTE builds on the first: <code>FROM sold s JOIN products p ...</code>.",
     "At the end, add <code>WHERE q = (SELECT MAX(q) FROM cat)</code>."
    ]
   }
  ]
 },
 "adv-2": {
  "pr": [
   {
    "title": "Company average in a row",
    "prompt": "Show the name and salary of each employee, and the average salary of the whole company under the name <code>company_avg</code>. Use <code>OVER ()</code>.",
    "hints": [
     "An empty <code>OVER ()</code> means the whole table is one window."
    ]
   },
   {
    "title": "Number by salary",
    "prompt": "Give each employee a row number by salary (from highest to lowest): <code>name</code>, <code>salary</code>, <code>rn</code>. If the salary is the same, the one with the smaller <code>id</code> comes first. Use <code>ROW_NUMBER</code>.",
    "hints": [
     "<code>ROW_NUMBER() OVER (ORDER BY salary DESC, id)</code>"
    ]
   },
   {
    "title": "Department headcount",
    "prompt": "Show the name and department of each employee, and the number of employees in their department under the name <code>dept_size</code>. The rows must not be collapsed.",
    "hints": [
     "<code>COUNT(*) OVER (PARTITION BY department)</code>"
    ]
   },
   {
    "title": "Share of salary in the department",
    "prompt": "Show the name and department of each employee, and their share of the total salary pool of their department as a percentage (<code>share</code>, with one decimal place).",
    "hints": [
     "<code>salary * 100.0 / SUM(salary) OVER (PARTITION BY department)</code>",
     "Apply <code>ROUND(..., 1)</code> on the outside."
    ]
   },
   {
    "title": "RANK and DENSE_RANK",
    "prompt": "Show the name, salary and company-wide salary rank of each employee in two ways: <code>rnk</code> (<code>RANK</code>) and <code>drnk</code> (<code>DENSE_RANK</code>), from highest to lowest.",
    "hints": [
     "Two window functions can appear in the same SELECT.",
     "After equal salaries, <code>RANK</code> skips numbers, while <code>DENSE_RANK</code> does not."
    ]
   },
   {
    "title": "Behind the department leader",
    "prompt": "Show the name, department and salary of each employee, and how much less they earn than the highest salary in their own department, under the name <code>gap</code> (the leader will have 0).",
    "hints": [
     "<code>MAX(salary) OVER (PARTITION BY department) - salary</code>"
    ]
   },
   {
    "title": "Second place in the department",
    "prompt": "In each department, show the employees who are in second place by salary (<code>DENSE_RANK</code> = 2, from highest to lowest): <code>department</code>, <code>name</code>, <code>salary</code>. Employees with the same salary share the same place.",
    "hints": [
     "A window function cannot be used in <code>WHERE</code>: first calculate <code>r</code> in a subquery.",
     "In the outer query, <code>WHERE r = 2</code>."
    ]
   },
   {
    "title": "Above the department average",
    "prompt": "Show the employees whose salary is above the average salary of their department: <code>department</code>, <code>name</code>, <code>salary</code> and the department average salary, rounded to a whole number, <code>dept_avg</code>.",
    "hints": [
     "In the inner query, <code>AVG(salary) OVER (PARTITION BY department)</code>.",
     "In the outer query, filter the rows and create <code>ROUND</code>."
    ]
   }
  ]
 },
 "adv-3": {
  "pr": [
   {
    "title": "Astana's cumulative revenue",
    "prompt": "From the <code>daily_sales</code> table, show for Astana the <code>day</code>, <code>revenue</code> and the cumulative sum <code>running</code>, in date order.",
    "hints": [
     "<code>SUM(revenue) OVER (ORDER BY day)</code>"
    ]
   },
   {
    "title": "Cumulative by region",
    "prompt": "Inside each region, calculate the cumulative revenue: <code>region</code>, <code>day</code>, <code>running</code>. Order: first the region, then the date.",
    "hints": [
     "<code>OVER (PARTITION BY region ORDER BY day)</code> starts the sum from zero in each region."
    ]
   },
   {
    "title": "Total revenue of the region",
    "prompt": "For each row, show <code>region</code>, <code>day</code>, <code>revenue</code> and the total revenue of this region across all dates under the name <code>region_total</code>.",
    "hints": [
     "Without <code>ORDER BY</code>, <code>OVER (PARTITION BY region)</code> gives the sum for the whole group."
    ]
   },
   {
    "title": "Two-day average",
    "prompt": "For Astana, show <code>day</code>, <code>revenue</code> and the 2-day moving average <code>ma2</code> (the previous day and today), in date order.",
    "hints": [
     "<code>ROWS BETWEEN 1 PRECEDING AND CURRENT ROW</code>"
    ]
   },
   {
    "title": "Plan completion",
    "prompt": "For Almaty, show <code>day</code> and the share of the revenue accumulated up to that date in the total Almaty revenue for 10 days, as a percentage (<code>pct</code>, with one decimal place), in date order.",
    "hints": [
     "Numerator: <code>SUM(revenue) OVER (ORDER BY day)</code>, denominator: <code>SUM(revenue) OVER ()</code>."
    ]
   },
   {
    "title": "Three-day maximum",
    "prompt": "For Almaty, show <code>day</code>, <code>revenue</code> and the highest revenue over the last 3 days (including today) under the name <code>max3</code>, in date order.",
    "hints": [
     "A moving window works not only with <code>AVG</code>, but also with <code>MAX</code>."
    ]
   },
   {
    "title": "Cumulative total by day",
    "prompt": "First, in a CTE, calculate the revenue of each day for the two regions (<code>day</code>, <code>total</code>). Then show <code>day</code>, <code>total</code> and the cumulative sum <code>running</code>, in date order.",
    "hints": [
     "In the CTE — <code>GROUP BY day</code>, outside the CTE — a window function."
    ]
   },
   {
    "title": "Days above average",
    "prompt": "For Almaty, show the days when the revenue was above its 3-day moving average (<code>ma3</code>: the two previous days and today): <code>day</code>, <code>revenue</code>, <code>ma3</code> (with one decimal place). In date order.",
    "hints": [
     "Calculate <code>ma3</code> in a subquery: a window function does not work in <code>WHERE</code>.",
     "In the outer query, <code>WHERE revenue &gt; ma3</code>."
    ]
   }
  ]
 },
 "adv-4": {
  "pr": [
   {
    "title": "Next order date",
    "prompt": "For all orders, show <code>id</code>, <code>order_date</code> and the date of the next order <code>next_date</code> (<code>LEAD</code>), in time order.",
    "hints": [
     "<code>LEAD(order_date) OVER (ORDER BY order_date)</code>"
    ]
   },
   {
    "title": "Yesterday's revenue in Almaty",
    "prompt": "For Almaty, show <code>day</code>, <code>revenue</code> and the revenue of the previous day under the name <code>prev</code>, in date order.",
    "hints": [
     "<code>LAG(revenue) OVER (ORDER BY day)</code>; on the first day it will be NULL."
    ]
   },
   {
    "title": "Cheaper neighbour",
    "prompt": "Sort the products by price in ascending order and show the name of each product, its price, and the price of the product that is one step cheaper, under the name <code>cheaper</code>.",
    "hints": [
     "<code>LAG(price) OVER (ORDER BY price)</code>"
    ]
   },
   {
    "title": "Daily change",
    "prompt": "For Almaty, show <code>day</code>, <code>revenue</code> and the difference with the previous day under the name <code>diff</code>, in date order.",
    "hints": [
     "<code>revenue - LAG(revenue) OVER (ORDER BY day)</code>"
    ]
   },
   {
    "title": "LAG within a region",
    "prompt": "For two regions together, show: <code>region</code>, <code>day</code>, <code>revenue</code> and the revenue of the same region for the previous day <code>prev</code>. On the first day of each region, <code>prev</code> must be empty. Order: region, then date.",
    "hints": [
     "So that the regions do not mix, add <code>PARTITION BY region</code>."
    ]
   },
   {
    "title": "The client's previous order",
    "prompt": "For each order, show <code>customer_id</code>, <code>id</code>, <code>order_date</code> and the date of the previous order of <b>the same client</b> under the name <code>prev_date</code>. Order: <code>customer_id</code>, then date.",
    "hints": [
     "<code>LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)</code>"
    ]
   },
   {
    "title": "Revenue drops",
    "prompt": "For Astana, show the days when the revenue was lower than on the previous day: <code>day</code>, <code>revenue</code>, <code>prev</code>. In date order.",
    "hints": [
     "Calculate <code>prev</code> in a subquery using LAG.",
     "In the outer query, <code>WHERE revenue &lt; prev</code>."
    ]
   },
   {
    "title": "Monthly payment growth",
    "prompt": "From the <code>payments</code> table, in a CTE, calculate the sum of payments of each month (<code>month</code>, <code>total</code>). Then show <code>month</code>, <code>total</code> and the growth compared with the previous month as a percentage (<code>growth</code>, with one decimal place), in month order.",
    "hints": [
     "Growth % = (current − previous) × 100.0 / previous.",
     "The divisor is the previous month: <code>LAG(total) OVER (ORDER BY month)</code>."
    ]
   }
  ]
 },
 "adv-5": {
  "pr": [
   {
    "title": "Newest employee in the department",
    "prompt": "For each department, show the employee who was hired last: <code>department</code>, <code>name</code>, <code>hire_date</code>.",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC)</code>",
     "In the outer query, <code>WHERE rn = 1</code>."
    ]
   },
   {
    "title": "Cheapest in the category",
    "prompt": "Show the cheapest product of each category: <code>category</code>, <code>name</code>, <code>price</code>.",
    "hints": [
     "To start from the cheapest, use <code>ORDER BY price</code> (ASC)."
    ]
   },
   {
    "title": "The weakest day of the region",
    "prompt": "Show the day with the lowest revenue for each region: <code>region</code>, <code>day</code>, <code>revenue</code>.",
    "hints": [
     "<code>PARTITION BY region ORDER BY revenue</code>"
    ]
   },
   {
    "title": "Top two with equal salaries",
    "prompt": "In each department, show the employees who take the first 2 places by salary: <code>department</code>, <code>name</code>, <code>salary</code>. Employees with the same salary share one place, so use <code>RANK</code>.",
    "hints": [
     "<code>ROW_NUMBER</code> gives different numbers to equal values, while <code>RANK</code> gives the same numbers.",
     "In the outer query, <code>WHERE r &lt;= 2</code>."
    ]
   },
   {
    "title": "The client's first order",
    "prompt": "Show the very first order of each client: <code>customer_id</code>, <code>id</code>, <code>order_date</code>.",
    "hints": [
     "To make the earliest one come first, use <code>ORDER BY order_date</code> (ASC)."
    ]
   },
   {
    "title": "The largest payment",
    "prompt": "From the <code>payments</code> table, show the largest payment of each user, one row per user: <code>user_id</code>, <code>month</code>, <code>amount</code>. If the sums are equal, take the earliest month.",
    "hints": [
     "To resolve ties, add a second sort: <code>ORDER BY amount DESC, month</code>."
    ]
   },
   {
    "title": "The most expensive product in an order",
    "prompt": "For each order, show the most expensive product: <code>order_id</code>, the product name <code>name</code> and the price <code>price</code>. Join <code>order_items</code> and <code>products</code>.",
    "hints": [
     "Inside a subquery, do a JOIN and add a window function.",
     "<code>PARTITION BY oi.order_id ORDER BY p.price DESC</code>"
    ]
   },
   {
    "title": "The most active client of a city",
    "prompt": "For each city, show the client who placed the most orders: <code>city</code>, <code>name</code> and the number of orders <code>n</code>. If the number is the same, take the client with the smaller <code>id</code>. Clients with no orders are not counted.",
    "hints": [
     "First, in a CTE, count the orders of each client.",
     "Then <code>ROW_NUMBER() OVER (PARTITION BY city ORDER BY n DESC, id)</code>."
    ]
   }
  ]
 },
 "adv-6": {
  "pr": [
   {
    "title": "Channel name in Kazakh",
    "prompt": "From the <code>users</code> table, show <code>id</code> and the Kazakh name of the channel under the name <code>channel_kz</code>: <code>ads</code> → <code>жарнама</code>, <code>organic</code> → <code>органикалық</code>, the rest → <code>ұсыныс</code>.",
    "hints": [
     "Write two <code>WHEN</code> and one <code>ELSE</code>."
    ]
   },
   {
    "title": "Categories in one row",
    "prompt": "Show three columns in one row: <code>electronics</code>, <code>books</code>, <code>office</code> — the number of products in the categories «Электроника», «Кітаптар» and «Кеңсе».",
    "hints": [
     "<code>SUM(CASE WHEN category = 'Электроника' THEN 1 ELSE 0 END)</code>"
    ]
   },
   {
    "title": "Channels in one row",
    "prompt": "From the <code>users</code> table, show three columns in one row: <code>ads</code>, <code>organic</code>, <code>referral</code> — the number of users who came from each channel.",
    "hints": [
     "Each column is one <code>SUM(CASE ...)</code> with its own condition."
    ]
   },
   {
    "title": "Statuses by city",
    "prompt": "For each city, show one row: <code>city</code>, <code>delivered</code> (the number of delivered orders) and <code>not_delivered</code> (the number of the other orders). Join <code>orders</code> and <code>customers</code>.",
    "hints": [
     "JOIN, then <code>GROUP BY c.city</code> and two <code>SUM(CASE ...)</code>."
    ]
   },
   {
    "title": "Months as columns",
    "prompt": "Make a pivot of the <code>payments</code> table: for each <code>user_id</code>, the columns <code>jul</code>, <code>aug</code>, <code>sep</code> are the sum of payments for the months 2024-07, 2024-08 and 2024-09 (0 if there were no payments). Sort by <code>user_id</code>.",
    "hints": [
     "<code>SUM(CASE WHEN month = '2024-07' THEN amount ELSE 0 END) AS jul</code>"
    ]
   },
   {
    "title": "Conversion funnel",
    "prompt": "Show two percentages in one row (with one decimal place): <code>cart_rate</code> — the share of unique users who reached the cart step out of those who visited, <code>buy_rate</code> — the share of those who made a purchase out of those who reached the cart.",
    "hints": [
     "Number of steps: <code>COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END)</code>.",
     "To avoid integer division, start with <code>100.0 *</code>."
    ]
   },
   {
    "title": "Funnel by channel",
    "prompt": "Join <code>events</code> and <code>users</code> and show the funnel for each channel: <code>channel</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code> — the number of unique users who reached each step.",
    "hints": [
     "<code>JOIN users u ON u.id = e.user_id</code>, then <code>GROUP BY u.channel</code>."
    ]
   },
   {
    "title": "Category revenue by status",
    "prompt": "For each category, show one row: <code>category</code>, <code>delivered_rev</code> (the revenue of delivered orders) and <code>other_rev</code> (the revenue of the other orders). Revenue = <code>quantity × price</code>. Sort by the category name.",
    "hints": [
     "Join the three tables: orders → order_items → products.",
     "The calculation inside THEN: <code>THEN oi.quantity * p.price ELSE 0</code>."
    ]
   }
  ]
 },
 "adv-7": {
  "pr": [
   {
    "title": "Registrations by channel",
    "prompt": "Show how many users registered from each channel: <code>channel</code> and the count.",
    "hints": [
     "<code>GROUP BY channel</code>"
    ]
   },
   {
    "title": "Active users by month",
    "prompt": "From the <code>activity</code> table, show the number of unique active users for each month: <code>month</code> and <code>active</code>. Sort by month.",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code>"
    ]
   },
   {
    "title": "Cohort and channel",
    "prompt": "For each pair of cohort (<code>signup_month</code>) and channel (<code>channel</code>), show the number of users: <code>signup_month</code>, <code>channel</code>, <code>n</code>.",
    "hints": [
     "Group by two columns: <code>GROUP BY signup_month, channel</code>."
    ]
   },
   {
    "title": "Returning users",
    "prompt": "For each cohort, show the number of unique users who were active at least once in the months after their registration month: <code>cohort</code>, <code>returned</code>. Cohorts with no such users are not shown.",
    "hints": [
     "The month is text ('2024-08'), but you can still compare it: <code>a.month &gt; u.signup_month</code>."
    ]
   },
   {
    "title": "Retention of the July cohort",
    "prompt": "Only for the 2024-07 cohort, show the retention for each month: <code>month</code> and <code>retention</code> (active users / cohort size × 100, with one decimal place). Find the cohort size with a subquery. Sort by month.",
    "hints": [
     "Divisor: <code>(SELECT COUNT(*) FROM users WHERE signup_month = '2024-07')</code>."
    ]
   },
   {
    "title": "Cohort revenue",
    "prompt": "Join <code>payments</code> and <code>users</code> and show the total payments of each cohort over all months: <code>cohort</code>, <code>revenue</code>. Sort by cohort.",
    "hints": [
     "<code>JOIN users u ON u.id = p.user_id</code>, then <code>GROUP BY u.signup_month</code>."
    ]
   },
   {
    "title": "Retention by channel",
    "prompt": "For users registered up to and including 2024-09 (<code>signup_month &lt; '2024-09'</code>), show the retention of each channel for the month 2024-09: <code>channel</code>, <code>retention</code> — the share of those who were active in that month, as a percentage, with one decimal place.",
    "hints": [
     "Numerator: <code>COUNT(DISTINCT CASE WHEN a.month = '2024-09' THEN u.id END)</code>.",
     "Divisor: all users of the channel, <code>COUNT(DISTINCT u.id)</code>."
    ]
   },
   {
    "title": "ARPU by cohort",
    "prompt": "For each cohort, show <code>cohort</code>, the cohort size <code>size</code>, the total payments of the cohort <code>revenue</code> and the revenue per user <code>arpu</code> (<code>revenue / size</code>, rounded to a whole number). Use two CTEs. Sort by cohort.",
    "hints": [
     "<code>WITH size AS (...), rev AS (...)</code>",
     "Integer division: <code>r.revenue * 1.0 / s.n</code>."
    ]
   }
  ]
 },
 "adv-8": {
  "pr": [
   {
    "title": "Product dimension table",
    "prompt": "In an empty database, create the product dimension table <code>dim_product</code> with the columns <code>product_key INTEGER PRIMARY KEY</code>, <code>name TEXT</code>, <code>category TEXT</code>.",
    "hints": [
     "<code>CREATE TABLE dim_product (product_key INTEGER PRIMARY KEY, ...)</code>"
    ]
   },
   {
    "title": "Date dimension table",
    "prompt": "In an empty database, create the date dimension table <code>dim_date</code> with the columns <code>date_key INTEGER PRIMARY KEY</code>, <code>full_date TEXT</code>, <code>month INTEGER</code>, <code>year INTEGER</code>.",
    "hints": [
     "Write the columns in exactly this order."
    ]
   },
   {
    "title": "Store dimension table",
    "prompt": "In an empty database, create the table <code>dim_store</code> (<code>store_key INTEGER PRIMARY KEY</code>, <code>city TEXT</code>) and add three stores: (1, 'Алматы'), (2, 'Астана'), (3, 'Шымкент').",
    "hints": [
     "First <code>CREATE TABLE</code>, then three rows with one <code>INSERT</code>."
    ]
   },
   {
    "title": "Reference from the fact table",
    "prompt": "In an empty database, create two tables: <code>dim_city</code> (<code>city_key INTEGER PRIMARY KEY</code>, <code>name TEXT</code>) and <code>fact_orders</code> (<code>order_id INTEGER PRIMARY KEY</code>, <code>city_key INTEGER</code> — a reference to <code>dim_city(city_key)</code>, <code>amount INTEGER</code>).",
    "hints": [
     "The foreign key in the fact table refers to the dimension: <code>city_key INTEGER REFERENCES dim_city(city_key)</code>."
    ]
   },
   {
    "title": "Sales by category",
    "prompt": "The starter code already has a star schema: <code>dim_product</code> and <code>fact_sales</code>. Join them and show the sales total for each category: <code>category</code>, <code>total</code> (the sum of <code>amount</code>).",
    "hints": [
     "Facts and the dimension are joined by a key: <code>ON d.product_key = f.product_key</code>."
    ]
   },
   {
    "title": "Sales by month",
    "prompt": "The starter code already has <code>dim_date</code> and <code>fact_sales</code>. For each month, show the quantity sold (the sum of <code>quantity</code>) and the sales amount (the sum of <code>amount</code>): <code>month</code>, <code>qty</code>, <code>total</code>. Sort by month.",
    "hints": [
     "<code>JOIN dim_date d ON d.date_key = f.date_key</code>, then <code>GROUP BY d.month</code>."
    ]
   },
   {
    "title": "Report on two dimensions",
    "prompt": "The starter code already has <code>dim_store</code>, <code>dim_product</code> and <code>fact_sales</code>. Show the sales total for each pair of city and category: <code>city</code>, <code>category</code>, <code>total</code>. Order: city, then category.",
    "hints": [
     "Join the fact table with the two dimensions.",
     "<code>GROUP BY s.city, p.category</code>"
    ]
   },
   {
    "title": "Orphan fact rows",
    "prompt": "In the starter code, the table <code>fact_sales</code> has rows with <code>product_key</code> that does not exist in <code>dim_product</code>. To check the data quality, show the columns <code>sale_id</code>, <code>product_key</code> and <code>amount</code> of such rows.",
    "hints": [
     "<code>fact_sales f LEFT JOIN dim_product d ON ...</code>",
     "Without a match: <code>WHERE d.product_key IS NULL</code>."
    ]
   }
  ]
 },
 "adv-9": {
  "pr": [
   {
    "title": "Index on category",
    "prompt": "Create an index on the <code>category</code> column of the <code>products</code> table (any name for the index).",
    "hints": [
     "<code>CREATE INDEX атауы ON кесте(баған);</code>"
    ]
   },
   {
    "title": "Index on date",
    "prompt": "Create an index on the <code>order_date</code> column of the <code>orders</code> table (any name for the index).",
    "hints": [
     "<code>CREATE INDEX idx_orders_date ON orders(order_date);</code>"
    ]
   },
   {
    "title": "Index for a JOIN column",
    "prompt": "The <code>order_items</code> table is often joined with <code>products</code> through <code>product_id</code>. Create an index on this column.",
    "hints": [
     "An index is useful for a column that is used in <code>JOIN ... ON</code>."
    ]
   },
   {
    "title": "A filter that does not disable the index",
    "prompt": "Show the <code>id</code> and <code>order_date</code> columns of the orders for October 2024. Do not apply a function to the column; write it with a date range: <code>&gt;=</code> and <code>&lt;</code>.",
    "hints": [
     "<code>substr(order_date, 1, 7) = '2024-10'</code> \"disables\" the index.",
     "Instead: <code>order_date &gt;= '2024-10-01' AND order_date &lt; '2024-11-01'</code>."
    ]
   },
   {
    "title": "Index and JOIN",
    "prompt": "First, create an index on the <code>city</code> column of the <code>customers</code> table. Then show the orders of the clients from Almaty: only <code>o.id</code> and <code>c.name</code> (<code>SELECT *</code> is not needed).",
    "hints": [
     "Two commands: <code>CREATE INDEX ...;</code> and <code>SELECT ...;</code>",
     "Select only the columns you need."
    ]
   },
   {
    "title": "Composite index",
    "prompt": "For the <code>order_items</code> table, create one composite index on two columns: first <code>order_id</code>, then <code>product_id</code>.",
    "hints": [
     "In the brackets, list the columns separated by commas: <code>ON order_items(order_id, product_id)</code>."
    ]
   },
   {
    "title": "Index and a date range",
    "prompt": "For the <code>orders</code> table, create an index on the <code>order_date</code> column. Then count the orders for the period from 1 September to 31 October 2024 by status: <code>status</code> and the count. Do not apply functions to the date.",
    "hints": [
     "Period: <code>order_date &gt;= '2024-09-01' AND order_date &lt; '2024-11-01'</code>.",
     "Then <code>GROUP BY status</code>."
    ]
   },
   {
    "title": "Filter first, then join",
    "prompt": "For the <code>order_items</code> table, create an index on the <code>product_id</code> column. Then, in a CTE, take only the delivered (<code>delivered</code>) orders and count the revenue of each product from these orders (<code>quantity × price</code>). Show the <code>name</code> and <code>revenue</code> of the products whose revenue is above 100,000 tenge.",
    "hints": [
     "CTE: <code>WITH d AS (SELECT id FROM orders WHERE status = ...)</code> — we work with a small number of rows.",
     "Then <code>d</code> → order_items → products and <code>HAVING</code>."
    ]
   }
  ]
 },
 "adv-10": {
  "pr": [
   {
    "title": "Days of the week",
    "prompt": "Using a recursive CTE, list the days from 1 to 14 September 2024: <code>day</code> and <code>dow</code>, the day-of-week number (<code>strftime('%w', day)</code>, 0 is Sunday). In date order.",
    "hints": [
     "Stop condition: <code>WHERE day &lt; '2024-09-14'</code>.",
     "<code>SELECT day, strftime('%w', day) AS dow FROM cal ORDER BY day</code>"
    ]
   },
   {
    "title": "Empty days",
    "prompt": "On which days of September did nobody open the app? <code>LEFT JOIN</code> the calendar to <code>daily_active</code> and return the days that found no match. Column: <code>day</code>.",
    "hints": [
     "<code>FROM cal c LEFT JOIN daily_active a ON a.day = c.day</code>",
     "In a row without a match the right-hand columns are NULL: <code>WHERE a.user_id IS NULL</code>."
    ]
   },
   {
    "title": "One user's last week",
    "prompt": "For each day from 2024-09-25 to 2024-09-30, show whether user 9 was active: <code>day</code>, <code>active</code> (1 if active, 0 if not). All 6 days must appear, in date order.",
    "hints": [
     "Put the user condition inside <code>ON</code>, not in <code>WHERE</code>: <code>ON a.day = c.day AND a.user_id = 9</code>.",
     "<code>COUNT(a.user_id)</code> gives 0 on an empty day."
    ]
   },
   {
    "title": "Zero-filled average",
    "prompt": "Zero-fill the daily DAU for September and return one row: <code>days</code> (days in the calendar), <code>zero_days</code> (days with DAU = 0), <code>avg_dau</code> (average DAU over the 30 days, 2 decimals).",
    "hints": [
     "First compute each day's <code>dau</code> in a second CTE (<code>LEFT JOIN</code>, <code>COUNT(a.user_id)</code>).",
     "<code>SUM(CASE WHEN dau = 0 THEN 1 ELSE 0 END)</code> and <code>ROUND(AVG(dau), 2)</code>. The answer should be 3.27, not 3.38."
    ]
   },
   {
    "title": "Find the gaps",
    "prompt": "List the periods when user 1 was not active (the gaps): <code>gap_start</code> (first day of the gap), <code>gap_end</code> (last day), <code>missing</code> (number of days in the gap). Get the previous active day with <code>LAG</code>. Sort by <code>gap_start</code>.",
    "hints": [
     "If two active days are more than 1 day apart, there is a gap between them: <code>WHERE julianday(day) - julianday(prev) &gt; 1</code>.",
     "<code>date(prev, '+1 day')</code>, <code>date(day, '-1 day')</code>, <code>CAST(julianday(day) - julianday(prev) - 1 AS INTEGER)</code>"
    ]
   },
   {
    "title": "Number of streaks",
    "prompt": "Count how many unbroken streaks (islands) each user had in September: <code>user_id</code>, <code>streaks</code>. Sort by <code>user_id</code>.",
    "hints": [
     "Every day of one island has the same <code>date(day, '-' || rn || ' day')</code>.",
     "Number of islands = number of distinct group labels: <code>COUNT(DISTINCT ...)</code>."
    ]
   },
   {
    "title": "Long streaks",
    "prompt": "List every streak that lasted at least 5 days: <code>user_id</code>, <code>start_day</code>, <code>end_day</code>, <code>days</code>. Sort by <code>user_id</code>, <code>start_day</code>.",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day)</code>, then <code>GROUP BY user_id, date(day, '-' || rn || ' day')</code>.",
     "Compute the streak length in a CTE and filter with <code>WHERE days &gt;= 5</code> outside (or <code>HAVING COUNT(*) &gt;= 5</code>)."
    ]
   },
   {
    "title": "A true 7-day average",
    "prompt": "For each day of September: <code>day</code>, <code>dau</code> (0 on an empty day) and <code>avg7</code>, the average DAU over the last 7 days including the current one (<code>ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code>, 2 decimals). In the first days of the month, average whatever days the window has. 30 rows, in date order.",
    "hints": [
     "First the zero-filled daily DAU (calendar + <code>LEFT JOIN</code>), then the window: that way 7 rows = 7 days.",
     "<code>ROUND(AVG(dau) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2)</code>"
    ]
   }
  ]
 },
 "adv-11": {
  "pr": [
   {
    "title": "One combined list",
    "prompt": "<b>shop.</b> Use <code>UNION ALL</code> to put customer names and product names into one list: <code>name</code>, <code>kind</code> (<code>'customer'</code> for a customer, <code>'product'</code> for a product).",
    "hints": [
     "Both queries need the same number of columns: <code>SELECT name, 'customer' AS kind FROM customers</code>.",
     "The second one: <code>UNION ALL SELECT name, 'product' FROM products</code>."
    ]
   },
   {
    "title": "Managers with INTERSECT",
    "prompt": "<b>staff.</b> Use <code>INTERSECT</code> to list the <code>id</code> of employees who have at least one direct report: values that appear both in the <code>id</code> column and in the <code>manager_id</code> column.",
    "hints": [
     "<code>SELECT id FROM employees INTERSECT SELECT manager_id FROM employees</code>"
    ]
   },
   {
    "title": "Salary position",
    "prompt": "<b>staff.</b> Show where each employee's salary sits between 0 and 1: <code>name</code>, <code>salary</code>, <code>pr</code> = <code>PERCENT_RANK()</code> by ascending salary, <code>ROUND</code> to 2 decimals.",
    "hints": [
     "<code>PERCENT_RANK() OVER (ORDER BY salary)</code>: the lowest salary is 0, the highest is 1."
    ]
   },
   {
    "title": "Share of the manager's salary",
    "prompt": "<b>staff.</b> For every employee who has a manager: <code>name</code>, <code>manager</code> (the manager's name), <code>pct</code>, the employee's salary as a percentage of the manager's salary (1 decimal).",
    "hints": [
     "Self-join: <code>employees e JOIN employees m ON m.id = e.manager_id</code>. The director must not appear, so a plain <code>JOIN</code> is enough.",
     "<code>ROUND(100.0 * e.salary / m.salary, 1)</code>"
    ]
   },
   {
    "title": "Lowest salary in a department",
    "prompt": "<b>staff.</b> Use <code>LAST_VALUE</code> to find the lowest-paid person in each department: <code>department</code>, <code>lowest</code>. Order the window by salary descending. One row per department.",
    "hints": [
     "The starter code gives each row its own name: the default frame ends at the current row.",
     "Add <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>; <code>DISTINCT</code> then leaves one row per department."
    ]
   },
   {
    "title": "A totals row",
    "prompt": "<b>staff.</b> Build a report: each department's payroll (<code>department</code>, <code>total</code>) and, underneath via <code>UNION ALL</code>, a company-wide totals row with <code>'TOTAL'</code> in place of <code>department</code>.",
    "hints": [
     "First query: <code>GROUP BY department</code>. The second has no grouping: <code>SELECT 'TOTAL', SUM(salary) FROM employees</code>."
    ]
   },
   {
    "title": "The manager's manager",
    "prompt": "<b>staff.</b> For each employee: <code>name</code>, <code>manager</code> (direct manager) and <code>skip_manager</code> (the manager's manager). All 12 employees must appear; a missing value is NULL.",
    "hints": [
     "Take the table three times: <code>e</code> (employee), <code>m</code> (manager), <code>g</code> (the manager's manager).",
     "<code>LEFT JOIN employees g ON g.id = m.manager_id</code>. Both joins must be <code>LEFT</code>, or the top levels disappear."
    ]
   },
   {
    "title": "Three customer tiers",
    "prompt": "<b>shop.</b> Split the customers who placed orders into three tiers with <code>NTILE(3)</code> by total spend (<code>quantity × price</code>, all statuses): 1 is the biggest spenders; order the window by spend descending, then <code>customer_id</code>. For each tier: <code>tier</code>, <code>customers</code>, <code>revenue</code>. Sort by <code>tier</code>.",
    "hints": [
     "CTE 1: each customer's total. CTE 2: <code>NTILE(3) OVER (ORDER BY total DESC, customer_id) AS tier</code>.",
     "Finally: <code>GROUP BY tier</code>, <code>COUNT(*)</code>, <code>SUM(total)</code>."
    ]
   }
  ]
 },
 "adv-12": {
  "pr": [
   {
    "title": "The previous event",
    "prompt": "List user 7's events in time order: <code>ts</code>, <code>event</code>, <code>prev_event</code> (this user's previous event; NULL for the first one).",
    "hints": [
     "<code>LAG(event) OVER (ORDER BY ts)</code>"
    ]
   },
   {
    "title": "The unordered funnel",
    "prompt": "For comparison, first compute the unordered funnel: for each event type, <code>event</code>, <code>users</code> (distinct users with that event), <code>events</code> (number of events). Sort by <code>events</code> descending.",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code> and <code>COUNT(*)</code>, <code>GROUP BY event</code>."
    ]
   },
   {
    "title": "Start of a session",
    "prompt": "For user 15's events, return <code>ts</code>, <code>event</code> and <code>is_new</code>: 1 if the event is the user's first or more than 30 minutes passed since the previous one, otherwise 0. In time order.",
    "hints": [
     "<code>CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END</code>",
     "<code>LAG</code> returns NULL for the first event; count it as a session start too."
    ]
   },
   {
    "title": "Sessions per user",
    "prompt": "Return the number of sessions per user (rule: the first event or a break of more than 30 minutes starts a new session): <code>user_id</code>, <code>sessions</code>. Sort by <code>sessions</code> descending, then <code>user_id</code>.",
    "hints": [
     "A user's session count = the number of their events that start a session.",
     "<code>SUM(CASE WHEN gap_min IS NULL OR gap_min &gt; 30 THEN 1 ELSE 0 END)</code>, <code>GROUP BY user_id</code>."
    ]
   },
   {
    "title": "The average session",
    "prompt": "Return one row across all sessions: <code>sessions</code> (count), <code>avg_events</code> (average events per session, 2 decimals), <code>avg_minutes</code> (average minutes between the first and last event, 1 decimal).",
    "hints": [
     "A third CTE: <code>GROUP BY user_id, session_no</code> with <code>COUNT(*)</code> and <code>(julianday(MAX(ts)) - julianday(MIN(ts))) * 1440</code>.",
     "Then <code>COUNT(*)</code> and <code>AVG</code> over it. There should be 128 sessions."
    ]
   },
   {
    "title": "Sessions with a purchase",
    "prompt": "How many sessions contain at least one <code>purchase</code>? One row: <code>sessions</code>, <code>with_purchase</code>, <code>pct</code> (%, 1 decimal).",
    "hints": [
     "A flag per session: <code>MAX(CASE WHEN event = 'purchase' THEN 1 ELSE 0 END)</code>, <code>GROUP BY user_id, session_no</code>.",
     "<code>ROUND(100.0 * SUM(bought) / COUNT(*), 1)</code>"
    ]
   },
   {
    "title": "Cart without a view",
    "prompt": "Find the push-notification users from the lesson: those who did a <code>cart</code> but no <code>view</code> before their first cart (including those who never viewed). Columns: <code>user_id</code>, <code>first_cart</code>, <code>first_view</code> (NULL if none). Sort by <code>user_id</code>.",
    "hints": [
     "Two CTEs: each user's first <code>cart</code> time and first <code>view</code> time.",
     "<code>c LEFT JOIN v</code> with <code>v.first_view IS NULL OR v.first_view &gt; c.first_cart</code>. You should get three users."
    ]
   },
   {
    "title": "Bought within an hour",
    "prompt": "Of the users who bought after their first view, how many made their first purchase within 60 minutes of it? One row: <code>buyers</code>, <code>within_hour</code>, <code>pct</code> (%, 1 decimal). Easier to read than a median.",
    "hints": [
     "CTE <code>p</code>: <code>events_ts e JOIN v</code>, <code>e.event = 'purchase' AND e.ts &gt; v.view_ts</code>, <code>MIN(e.ts)</code> per user.",
     "Minutes: <code>(julianday(MIN(e.ts)) - julianday(v.view_ts)) * 1440</code>; then <code>SUM(CASE WHEN minutes &lt;= 60 THEN 1 ELSE 0 END)</code>."
    ]
   }
  ]
 }
} });
