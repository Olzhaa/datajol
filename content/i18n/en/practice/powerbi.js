// powerbi practice tasks: English text. Code, solutions and checks are in content/practice/powerbi.js.
DJ.i18n.patch({ lessons: {
 "pbi-2": {
  "pr": [
   {
    "title": "Returned orders",
    "prompt": "Do the Filter Rows step from Power Query in SQL: show the <code>id</code>, <code>customer_id</code> and <code>amount</code> columns of the orders whose status is <code>refund</code>.",
    "hints": [
     "<code>WHERE status = 'refund'</code>"
    ]
   },
   {
    "title": "Orders with an empty amount",
    "prompt": "Let's find the problem before cleaning: show the <code>id</code> and <code>customer_id</code> columns of the orders whose amount (<code>amount</code>) is empty.",
    "hints": [
     "Empty value: <code>amount IS NULL</code>."
    ]
   },
   {
    "title": "City dictionary",
    "prompt": "To create a reference table, show the unique list of the cities where the clients live (the Remove Duplicates step).",
    "hints": [
     "<code>SELECT DISTINCT city</code>"
    ]
   },
   {
    "title": "Fill in an empty amount",
    "prompt": "Show all orders of client 18: <code>id</code>, <code>order_date</code> and <code>amount</code>, but instead of an empty amount there should be 0 (the Replace Values step). Use <code>COALESCE</code>.",
    "hints": [
     "<code>COALESCE(amount, 0)</code>"
    ]
   },
   {
    "title": "Add the city to an order",
    "prompt": "Do the Merge Queries step in SQL: add the client's city to the clean orders, and show only the <code>id</code>, <code>city</code> and <code>amount</code> columns of the orders from Шымкент. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "Merge = JOIN: <code>orders o JOIN customers c ON c.id = o.customer_id</code>.",
     "Add the city condition to the three conditions of the clean data."
    ]
   },
   {
    "title": "Find the dirty rows",
    "prompt": "Show all the rows that are dropped during cleaning: status is not <code>paid</code>, <b>or</b> the amount is empty, <b>or</b> the amount is 20,000 or more. Columns: <code>id</code>, <code>status</code>, <code>amount</code>.",
    "hints": [
     "The opposite of the clean condition: combine the three conditions with <code>OR</code>."
    ]
   },
   {
    "title": "Clean revenue by branch",
    "prompt": "Do the Group By step on the clean orders: for each city, show <code>city</code>, the number of orders <code>orders</code> and the amount <code>revenue</code>. Sort by revenue in descending order. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "First the filter (WHERE), then the JOIN with the city, and at the end <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Turn a wide table into a long one",
    "prompt": "Repeat Unpivot in SQL. In a CTE, make a \"wide\" table of the clean orders: for each city, <code>jan</code> (the 2024-01 revenue) and <code>feb</code> (the 2024-02 revenue). Then make it \"long\" with <code>UNION ALL</code>: <code>city</code>, <code>month</code> (<code>'2024-01'</code> or <code>'2024-02'</code>), <code>amount</code>. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "Wide table: <code>SUM(CASE WHEN o.order_date LIKE '2024-01%' THEN o.amount ELSE 0 END) AS jan</code>.",
     "Long table: <code>SELECT city, '2024-01' AS month, jan AS amount FROM wide UNION ALL SELECT city, '2024-02', feb FROM wide</code>."
    ]
   }
  ]
 },
 "pbi-4": {
  "pr": [
   {
    "title": "Revenue measure",
    "prompt": "Show the SQL equivalent of the <code>Revenue = SUM(orders[amount])</code> measure over the clean orders: one number. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>SUM(amount)</code> and the three conditions of the clean data."
    ]
   },
   {
    "title": "Number of clients",
    "prompt": "Show the SQL equivalent of the <code>COUNTROWS(customers)</code> measure: the number of rows in the <code>customers</code> table.",
    "hints": [
     "<code>COUNTROWS</code> ≈ <code>COUNT(*)</code>."
    ]
   },
   {
    "title": "Calculated column Size",
    "prompt": "Make a calculated column in SQL: <code>Size = IF(orders[amount] &gt;= 2500, \"Үлкен\", \"Кіші\")</code>. For the clean orders of client 29, show <code>id</code>, <code>amount</code> and <code>size</code>. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "In DAX <code>IF</code> ≈ in SQL <code>CASE WHEN ... THEN ... ELSE ... END</code>."
    ]
   },
   {
    "title": "Measures by city",
    "prompt": "As in the Matrix visual, show two measures for each city: <code>city</code>, <code>revenue</code> (the sum) and <code>orders</code> (the number of orders). Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "The city in the visual is <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Unique clients by channel",
    "prompt": "Show the <code>DISTINCTCOUNT(orders[customer_id])</code> measure for each channel (<code>customers.channel</code>): <code>channel</code>, <code>customers</code>. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>DISTINCTCOUNT</code> ≈ <code>COUNT(DISTINCT ...)</code>."
    ]
   },
   {
    "title": "Totals by Size",
    "prompt": "Group by the calculated column: split the clean orders into groups by the <code>size</code> column (<code>amount &gt;= 2500</code> — <code>Үлкен</code>, otherwise <code>Кіші</code>), and for each group show <code>size</code>, the number of orders and the sum. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "Name the CASE column <code>size</code> and <code>GROUP BY size</code>."
    ]
   },
   {
    "title": "AOV by city",
    "prompt": "Show the <code>AOV = DIVIDE([Revenue], [Orders])</code> measure for each city: <code>city</code> and <code>aov</code> rounded to a whole number. Sort by AOV in descending order. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>ROUND(SUM(o.amount) * 1.0 / COUNT(*))</code>",
     "At the end, add <code>ORDER BY aov DESC</code>."
    ]
   },
   {
    "title": "Order per client",
    "prompt": "New measure: <code>Orders per Customer = DIVIDE([Orders], [Customers])</code>. For each channel, show <code>channel</code> and this measure (rounded to two decimal places). Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>[Orders]</code> = <code>COUNT(*)</code>, <code>[Customers]</code> = <code>COUNT(DISTINCT o.customer_id)</code>.",
     "To avoid integer division: <code>* 1.0</code>."
    ]
   }
  ]
 },
 "pbi-5": {
  "pr": [
   {
    "title": "Instagram revenue",
    "prompt": "Show the SQL equivalent of the <code>CALCULATE([Revenue], customers[channel] = \"instagram\")</code> measure: the sum of the clean orders of the instagram channel, as one number. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "A CALCULATE filter ≈ a condition added to WHERE."
    ]
   },
   {
    "title": "Almaty revenue",
    "prompt": "Show the SQL equivalent of the <code>CALCULATE([Revenue], customers[city] = \"Алматы\")</code> measure: the sum of the clean orders of the clients from Almaty. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>AND c.city = 'Алматы'</code>"
    ]
   },
   {
    "title": "January revenue",
    "prompt": "A measure with a time filter: show the sum of the clean orders for January 2024. Do not apply a function to the date; write it as a range. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>order_date &gt;= '2024-01-01' AND order_date &lt; '2024-02-01'</code>"
    ]
   },
   {
    "title": "City share",
    "prompt": "Repeat the <code>Share % = DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[city])))</code> measure in SQL: <code>city</code>, <code>revenue</code> and <code>share_pct</code> (the share of the total revenue, %, with one decimal place). Sort by revenue in descending order. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>ALL</code> removes the filter ≈ <code>SUM(SUM(o.amount)) OVER ()</code>."
    ]
   },
   {
    "title": "Instagram and total side by side",
    "prompt": "In a Matrix, each city has two measures: <code>[Instagram Revenue]</code> and <code>[Revenue]</code>. Show this table: <code>city</code>, <code>insta_rev</code> (the sum of the instagram channel, otherwise 0), <code>revenue</code>. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "Two different filters in one row: <code>SUM(CASE WHEN c.channel = 'instagram' THEN o.amount ELSE 0 END)</code>."
    ]
   },
   {
    "title": "Total revenue on every row",
    "prompt": "Show the <code>Total Revenue = CALCULATE([Revenue], ALL(customers[channel]))</code> measure: for each channel <code>channel</code>, <code>revenue</code> and the total revenue of all channels <code>total_revenue</code> (the same on every row). Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>SUM(SUM(o.amount)) OVER ()</code> is the sum of all groups."
    ]
   },
   {
    "title": "Channel share inside a city",
    "prompt": "We remove only part of the filter: <code>DIVIDE([Revenue], CALCULATE([Revenue], ALL(customers[channel])))</code> — the city filter stays. For each pair of city and channel, show <code>city</code>, <code>channel</code>, <code>revenue</code> and the share of the city's revenue <code>share_pct</code> (%, with one decimal place). Order: city, then channel. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "The city filter must stay: <code>OVER (PARTITION BY c.city)</code>.",
     "<code>GROUP BY c.city, c.channel</code>"
    ]
   },
   {
    "title": "Instagram share in a city",
    "prompt": "What percentage of each city's revenue comes from the instagram channel? Show <code>city</code> and <code>insta_share</code> (%, with one decimal place), sorted by share in descending order. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "The numerator is the sum for instagram (CASE), the denominator is the sum for the whole city.",
     "At the end, <code>ORDER BY insta_share DESC</code>."
    ]
   }
  ]
 },
 "pbi-6": {
  "pr": [
   {
    "title": "Monthly revenue",
    "prompt": "Show the revenue of each month from the clean orders: <code>month</code> (<code>substr(order_date, 1, 7)</code>) and <code>revenue</code>. Sort by month. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>substr(order_date, 1, 7)</code> takes the month from the date in the form \"2024-03\"."
    ]
   },
   {
    "title": "Monthly order count",
    "prompt": "From the clean orders, show the number of orders in each month: <code>month</code> and <code>orders</code>. Sort by month. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>COUNT(*)</code> and <code>GROUP BY month ORDER BY month</code>."
    ]
   },
   {
    "title": "First quarter revenue",
    "prompt": "Show the clean revenue of the first quarter of 2024 (January–March) as one number. Filter by a date range. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>order_date &gt;= '2024-01-01' AND order_date &lt; '2024-04-01'</code>"
    ]
   },
   {
    "title": "MoM difference",
    "prompt": "Add the difference with the previous month to the monthly revenue: <code>month</code>, <code>revenue</code>, <code>diff</code> (<code>revenue − Revenue PM</code>). Sort by month. The CTE in the starter code is ready.",
    "hints": [
     "<code>Revenue PM</code> ≈ <code>LAG(revenue) OVER (ORDER BY month)</code>."
    ]
   },
   {
    "title": "MoM in percent",
    "prompt": "Show the <code>MoM % = DIVIDE([Revenue] - [Revenue PM], [Revenue PM])</code> measure as a percentage: <code>month</code>, <code>mom_pct</code> (with one decimal place). The first month will be empty. Sort by month.",
    "hints": [
     "The denominator is always the previous month: <code>LAG(revenue) OVER (ORDER BY month)</code>.",
     "<code>* 100.0</code> protects against integer division."
    ]
   },
   {
    "title": "Cumulative order count",
    "prompt": "In a CTE, count the monthly number of clean orders (<code>month</code>, <code>orders</code>), then add the cumulative count from the start of the year with <code>ytd_orders</code>. Sort by month. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "<code>TOTALYTD</code> ≈ <code>SUM(...) OVER (ORDER BY month)</code>."
    ]
   },
   {
    "title": "YTD by city",
    "prompt": "For each city, count the monthly clean revenue in a CTE (<code>city</code>, <code>month</code>, <code>revenue</code>), then add the cumulative revenue of each city with <code>ytd</code>. Order: city, then month. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "Inside the CTE use <code>GROUP BY c.city, month</code>.",
     "Let each city start from zero: <code>OVER (PARTITION BY city ORDER BY month)</code>."
    ]
   },
   {
    "title": "Month with the best growth",
    "prompt": "Find the month in which the revenue grew the most in percent compared with the previous month: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (with one decimal place). One row. Clean order: <code>status = 'paid'</code>, <code>amount</code> is not empty and less than 20,000.",
    "hints": [
     "First, in a subquery, calculate the <code>mom_pct</code> of each month.",
     "Then <code>ORDER BY mom_pct DESC LIMIT 1</code>; remove the first month with NULL."
    ]
   }
  ]
 }
} });
