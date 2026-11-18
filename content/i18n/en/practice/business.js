// business practice tasks: English text. Code, solutions and checks are in content/practice/business.js.
DJ.i18n.patch({ lessons: {
 "ba-2": {
  "pr": [
   {
    "title": "Total revenue",
    "prompt": "<p>From the table <code>payments</code>, output in one row the total revenue for the whole period <code>revenue</code> and the number of payments <code>n_payments</code>.</p>",
    "hints": [
     "<code>SUM(amount)</code>, <code>COUNT(*)</code>"
    ]
   },
   {
    "title": "Amount of each order",
    "prompt": "<p>The first step for AOV: the amount of each delivered order <code>delivered</code>. Output <code>id</code>, <code>total</code> (the sum of <code>quantity × price</code>), in descending order of the amount.</p>",
    "hints": [
     "Join the three tables with JOIN and add <code>GROUP BY o.id</code>."
    ]
   },
   {
    "title": "Average payment",
    "prompt": "<p>From the table <code>payments</code>, output the average size of one payment <code>avg_payment</code> (round to a whole number with <code>ROUND</code>).</p>",
    "hints": [
     "<code>ROUND(AVG(amount))</code>"
    ]
   },
   {
    "title": "Monthly ARPU",
    "prompt": "<p>ARPU = revenue / <b>all</b> active users. For each month, output <code>month</code>, <code>revenue</code> (<code>payments</code>), <code>active</code> (unique users from <code>activity</code>) and <code>arpu</code> (one decimal place). In month order.</p>",
    "hints": [
     "Two CTEs: monthly revenue and monthly activity.",
     "Join them with JOIN on <code>month</code>."
    ]
   },
   {
    "title": "Share of payers",
    "prompt": "<p>What percentage of the active users paid in each month? <code>month</code>, <code>active</code>, <code>payers</code>, <code>payer_pct</code> (one decimal place). In month order.</p>",
    "hints": [
     "<code>ROUND(100.0 * p.payers / a.active, 1)</code>"
    ]
   },
   {
    "title": "Average customer check",
    "prompt": "<p>For each customer, across their delivered orders <code>delivered</code>: <code>name</code>, <code>orders</code> (the number of orders), <code>aov</code> (the average check). Sort by <code>aov</code>, in descending order.</p>",
    "hints": [
     "First the amount at the order level (a CTE), then <code>AVG</code> per customer.",
     "If you make the rows <code>AVG(quantity * price)</code>, you get the average per product, not per order."
    ]
   },
   {
    "title": "AOV by city",
    "prompt": "<p>The average check of each city across delivered orders: <code>city</code>, <code>orders</code>, <code>aov</code> (round to a whole number with <code>ROUND</code>). Sort by <code>aov</code>, in descending order.</p>",
    "hints": [
     "In a CTE, take the order amount and <code>customer_id</code>.",
     "Then JOIN with <code>customers</code> and <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "ARPU and ARPPU side by side",
    "prompt": "<p>For each month, output <code>month</code>, <code>arpu</code> (revenue / active users) and <code>arppu</code> (revenue / paying users), both rounded to one decimal place. In month order. What does the difference between them depend on?</p>",
    "hints": [
     "One CTE with revenue and payers, another with the active users."
    ]
   }
  ]
 },
 "ba-3": {
  "pr": [
   {
    "title": "Reached the cart",
    "prompt": "<p>In the table <code>events</code>, output the number of unique users who reached the step <code>cart</code>: <code>cart_users</code>.</p>",
    "hints": [
     "<code>WHERE step = 'cart'</code> and <code>COUNT(DISTINCT user_id)</code>."
    ]
   },
   {
    "title": "Overall conversion",
    "prompt": "<p>What percentage of the site visitors made a purchase? Output one value <code>conversion</code> (one decimal place): <code>purchase</code> / <code>visit</code> × 100.</p>",
    "hints": [
     "<code>COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END)</code>"
    ]
   },
   {
    "title": "Channel of those who bought",
    "prompt": "<p>Output the users who reached the step <code>purchase</code>: <code>id</code>, <code>channel</code>. In <code>id</code> order.</p>",
    "hints": [
     "Join <code>users</code> and <code>events</code> with JOIN."
    ]
   },
   {
    "title": "Conversion by step",
    "prompt": "<p>Output in one row: <code>visit</code>, <code>cart</code>, <code>purchase</code> (unique users), <code>cart_rate</code> (cart / visit, %) and <code>purchase_rate</code> (purchase / cart, %); the percentages to one decimal place.</p>",
    "hints": [
     "First, in a CTE, count the three numbers (as in the lesson).",
     "Then calculate the percentages in the main query."
    ]
   },
   {
    "title": "Funnel by signup month",
    "prompt": "<p>The funnel by signup month: <code>signup_month</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code>. In month order.</p>",
    "hints": [
     "The query from the lesson, but <code>GROUP BY u.signup_month</code>."
    ]
   },
   {
    "title": "Those who stopped in the cart",
    "prompt": "<p>Users who put an item in the cart (<code>cart</code>) but did not buy (<code>purchase</code> is missing): <code>user_id</code>, in ascending order.</p>",
    "hints": [
     "<code>NOT EXISTS (SELECT 1 FROM events p WHERE p.user_id = e.user_id AND p.step = 'purchase')</code>"
    ]
   },
   {
    "title": "Conversion by channel",
    "prompt": "<p>Overall conversion by channel: <code>channel</code>, <code>visit</code>, <code>purchase</code>, <code>conv_pct</code> (purchase / visit × 100, one decimal place). Sort by <code>conv_pct</code>, in descending order; for equal values, by channel name.</p>",
    "hints": [
     "In a CTE, the funnel by channel; outside, the percentage."
    ]
   },
   {
    "title": "The weakest step",
    "prompt": "<p>At which step of the funnel is the percentage loss the largest? Calculate the conversion of each step from the previous one (<code>cart</code>: cart / visit, <code>purchase</code>: purchase / cart) and output the smallest one in a single row: <code>step</code>, <code>rate</code> (%, one decimal place). Use <code>UNION ALL</code>.</p>",
    "hints": [
     "First CTE: the funnel numbers. Second CTE: two rows with <code>UNION ALL</code>.",
     "<code>ORDER BY rate LIMIT 1</code>"
    ]
   }
  ]
 },
 "ba-4": {
  "pr": [
   {
    "title": "Churn share",
    "prompt": "<p>The function <code>churn_rate(start, lost)</code> should return churn as a share: the customers at the start of the month <code>start</code>, and those who left in the next month <code>lost</code>. For example, <code>churn_rate(200, 30)</code> → <code>0.15</code>.</p>",
    "hints": [
     "<code>lost / start</code>"
    ],
    "check": {
     "tests": "assert abs(churn_rate(200, 30) - 0.15) < 1e-9, \"churn_rate(200, 30) should be 0.15\"\nassert churn_rate(50, 0) == 0, \"If nobody left: 0\"\nassert abs(churn_rate(8, 2) - 0.25) < 1e-9, \"churn_rate(8, 2) should be 0.25\""
    }
   },
   {
    "title": "Customer lifetime",
    "prompt": "<p>The function <code>lifetime(churn)</code> should return the average customer lifetime in months: <code>1 / churn</code>. For example, <code>lifetime(0.1)</code> → <code>10.0</code>.</p>",
    "hints": [
     "<code>1 / churn</code>"
    ],
    "check": {
     "tests": "assert abs(lifetime(0.1) - 10) < 1e-9, \"lifetime(0.1) should be 10\"\nassert abs(lifetime(0.25) - 4) < 1e-9, \"lifetime(0.25) should be 4\""
    }
   },
   {
    "title": "Cohort sizes",
    "prompt": "<p>How many users arrived in each signup month? <code>signup_month</code>, <code>users</code>. In month order.</p>",
    "hints": [
     "<code>GROUP BY signup_month ORDER BY signup_month</code>"
    ]
   },
   {
    "title": "Retention curve",
    "prompt": "<p>The function <code>retention_curve(counts)</code> should turn the number of active users of a cohort in each month (<code>counts[0]</code> is the cohort size) into percentages, rounded to 1 decimal place (<code>round</code>). For example, <code>retention_curve([200, 90, 64])</code> → <code>[100.0, 45.0, 32.0]</code>.</p>",
    "hints": [
     "Divide each number by <code>counts[0]</code> and multiply by 100."
    ],
    "check": {
     "tests": "assert retention_curve([200, 90, 64]) == [100.0, 45.0, 32.0], \"retention_curve([200, 90, 64]) should be [100.0, 45.0, 32.0]\"\nassert retention_curve([3, 2, 1]) == [100.0, 66.7, 33.3], \"retention_curve([3, 2, 1]) should be [100.0, 66.7, 33.3]\""
    }
   },
   {
    "title": "Those who did not come back in September",
    "prompt": "<p>Users who were active in August (<code>2024-08</code>) but were not active in September (<code>2024-09</code>): <code>user_id</code>, in ascending order.</p>",
    "hints": [
     "In <code>NOT EXISTS</code>, the condition <code>b.month = '2024-09'</code>."
    ]
   },
   {
    "title": "Calculating churn correctly",
    "prompt": "<p>The function <code>churn_from_sets(start_ids, next_ids)</code> should take two sets: the active users at the start of the month and the active users in the next month. Churn is the share of the starting users who are missing in the next month (rounded to 2 decimal places with <code>round</code>). The new users of the next month are <b>not</b> included.</p><p>For example, <code>churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10})</code> → <code>0.5</code>.</p>",
    "hints": [
     "Those who left: <code>start_ids - next_ids</code> (the difference of the sets).",
     "The denominator is <code>len(start_ids)</code>."
    ],
    "check": {
     "tests": "assert churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10}) == 0.5, \"churn_from_sets({1, 2, 3, 4}, {1, 4, 9, 10}) should be 0.5\"\nassert churn_from_sets({1, 2, 3}, {1, 2, 3, 4, 5, 6}) == 0, \"Nobody left: new users do not lower the churn, 0\"\nassert churn_from_sets({1, 2, 3}, {7}) == 1, \"Everybody left: 1\""
    }
   },
   {
    "title": "Churn from August to September",
    "prompt": "<p>Output in one row: <code>active_aug</code> (active in August), <code>lost</code> (of them, those not active in September), <code>churn_pct</code> (lost / active_aug × 100, one decimal place). Only the users active in August are in the denominator.</p>",
    "hints": [
     "CTE: unique users in August.",
     "<code>SUM(NOT EXISTS (...))</code> counts those who left."
    ]
   },
   {
    "title": "Cohort retention table",
    "prompt": "<p>Write the function <code>cohort_retention(users, activity)</code>. <code>users</code> is <code>{user_id: тіркелу_айы}</code>, <code>activity</code> is a list of pairs <code>(user_id, ай)</code> (the months in the form <code>\"2024-07\"</code>). The function should return <code>{когорт: [пайыздар]}</code>: for each month of the sorted list of all months in <code>activity</code>, starting from the cohort's month, the share of the cohort that was active in that month, in %, with one decimal place.</p>",
    "hints": [
     "Collect the active users of each month into a set: <code>active[m]</code>.",
     "The intersection of the cohort members and the users active that month: <code>members &amp; active[m]</code>."
    ],
    "check": {
     "tests": "_u = {1: \"2024-07\", 2: \"2024-07\", 3: \"2024-07\", 4: \"2024-07\", 5: \"2024-08\", 6: \"2024-08\", 7: \"2024-08\", 8: \"2024-08\", 9: \"2024-08\", 10: \"2024-09\", 11: \"2024-09\", 12: \"2024-09\"}\n_a = [(1, \"2024-07\"), (2, \"2024-07\"), (3, \"2024-07\"), (4, \"2024-07\"), (1, \"2024-08\"), (2, \"2024-08\"), (4, \"2024-08\"), (1, \"2024-09\"), (4, \"2024-09\"), (5, \"2024-08\"), (6, \"2024-08\"), (7, \"2024-08\"), (8, \"2024-08\"), (9, \"2024-08\"), (5, \"2024-09\"), (8, \"2024-09\"), (9, \"2024-09\"), (10, \"2024-09\"), (11, \"2024-09\"), (12, \"2024-09\")]\n_r = cohort_retention(_u, _a)\nassert _r == {\"2024-07\": [100.0, 75.0, 50.0], \"2024-08\": [100.0, 60.0], \"2024-09\": [100.0]}, f\"The result is wrong: {_r}\""
    }
   }
  ]
 },
 "ba-5": {
  "pr": [
   {
    "title": "Total ad spend",
    "prompt": "<p>From the table <code>ad_spend</code>, output the total ad spend for the whole period as one value <code>total_spend</code>.</p>",
    "hints": [
     "<code>SUM(spend)</code>"
    ]
   },
   {
    "title": "Spend by month",
    "prompt": "<p>How much was spent on ads in each month? <code>month</code>, <code>spend</code>. In month order.</p>",
    "hints": [
     "<code>GROUP BY month ORDER BY month</code>"
    ]
   },
   {
    "title": "New customers by channel",
    "prompt": "<p>How many users did each channel bring? <code>channel</code>, <code>users</code>. In descending order of the count, and by channel name when the counts are equal.</p>",
    "hints": [
     "<code>ORDER BY users DESC, channel</code>"
    ]
   },
   {
    "title": "CAC of the paid channels",
    "prompt": "<p>Organic customers artificially lower the CAC. Output the overall CAC only for the paid channels (the channels that are in <code>ad_spend</code>) as one value <code>cac</code> (one decimal place): total spend / the users who came from these channels.</p>",
    "hints": [
     "Subquery: <code>SELECT COUNT(*) FROM users WHERE channel IN (SELECT channel FROM ad_spend)</code>."
    ]
   },
   {
    "title": "CAC by month",
    "prompt": "<p>The CAC of the channel <code>ads</code> by month: <code>month</code>, <code>spend</code>, <code>new_users</code> (users who signed up through <code>ads</code> in that month), <code>cac</code>. In month order.</p>",
    "hints": [
     "CTE: the new users of the channel <code>ads</code> by month.",
     "JOIN with <code>ad_spend</code> on <code>month</code>."
    ]
   },
   {
    "title": "Revenue brought by a channel",
    "prompt": "<p>How much did the users of each channel pay over the whole period? <code>channel</code>, <code>revenue</code>. In descending order of revenue.</p>",
    "hints": [
     "Join <code>users</code> and <code>payments</code> with JOIN, and <code>GROUP BY u.channel</code>."
    ]
   },
   {
    "title": "Comparing revenue and CAC",
    "prompt": "<p>For the paid channels: <code>channel</code>, <code>cac</code> (spend / users), <code>rev_per_user</code> (revenue / users) and <code>ratio</code> = rev_per_user / cac (two decimal places). Did each customer pay back their cost?</p>",
    "hints": [
     "Three CTEs: spend, number of users, revenue (all by channel).",
     "rev_per_user / cac = revenue / spend."
    ]
   },
   {
    "title": "Payback months",
    "prompt": "<p>The data has 3 months. For the paid channels, output <code>channel</code>, <code>cac</code>, <code>arpu_month</code> (channel revenue / users / 3, one decimal place) and <code>payback</code> = cac / (arpu_month × 0.5) (a 50% margin, in months, one decimal place). Sort by <code>payback</code>, in ascending order.</p>",
    "hints": [
     "Add one more to the CTEs from the previous task: <code>cac</code> and the monthly <code>arpu</code>.",
     "Payback = CAC / (ARPU × margin)."
    ]
   }
  ]
 },
 "ba-6": {
  "pr": [
   {
    "title": "Revenue of the previous month",
    "prompt": "<p>From the table <code>payments</code>, output <code>month</code>, <code>revenue</code> and <code>prev_revenue</code> (the revenue of the previous month, <code>LAG</code>). In month order.</p>",
    "hints": [
     "<code>LAG(revenue) OVER (ORDER BY month)</code>"
    ]
   },
   {
    "title": "Absolute change in active users",
    "prompt": "<p>Together with the percentages, we also show the absolute number. For each month, output <code>month</code>, <code>active</code> (<code>activity</code> — unique users) and <code>diff</code> (the difference from the previous month). In month order.</p>",
    "hints": [
     "<code>active - LAG(active) OVER (ORDER BY month)</code>"
    ]
   },
   {
    "title": "August and September",
    "prompt": "<p>From the table <code>payments</code>, in one row: <code>aug</code> (August revenue), <code>sep</code> (September revenue), <code>growth_pct</code> (growth, %, one decimal place). Use a conditional sum.</p>",
    "hints": [
     "<code>SUM(CASE WHEN month = '2024-08' THEN amount END)</code>"
    ]
   },
   {
    "title": "Daily change by region",
    "prompt": "<p>For each region: the change of the daily revenue compared with the previous day: <code>region</code>, <code>day</code>, <code>revenue</code>, <code>change</code>. First the region, then the day.</p>",
    "hints": [
     "<code>LAG(revenue) OVER (PARTITION BY region ORDER BY day)</code>"
    ]
   },
   {
    "title": "Change in the number of payers (MoM)",
    "prompt": "<p>How did the number of payers change from month to month? <code>month</code>, <code>payers</code> (unique), <code>mom_pct</code> (one decimal place). In month order.</p>",
    "hints": [
     "The MoM query from the lesson, but take <code>payers</code> instead of <code>revenue</code>."
    ]
   },
   {
    "title": "Full 7-day average",
    "prompt": "<p>The 7-day moving average of the daily total revenue <code>ma7</code> (one decimal place). Output only the days for which a full 7 days have been collected (starting from <code>2024-09-07</code>): <code>day</code>, <code>revenue</code>, <code>ma7</code>. In day order.</p>",
    "hints": [
     "Filtering the window result needs one more CTE.",
     "<code>AVG(revenue) OVER (ORDER BY day ROWS 6 PRECEDING)</code>"
    ]
   },
   {
    "title": "The month with the best growth",
    "prompt": "<p>Output one month in which the MoM growth of revenue (<code>payments</code>) was the largest: <code>month</code>, <code>mom_pct</code> (one decimal place).</p>",
    "hints": [
     "Two CTEs: monthly revenue and MoM.",
     "The <code>mom_pct</code> of the first month is NULL: filter it out and use <code>ORDER BY mom_pct DESC LIMIT 1</code>."
    ]
   },
   {
    "title": "The region's share of growth",
    "prompt": "<p>How much did the revenue grow from the first day of the period to the last one, and what part of it came from each region? <code>region</code>, <code>growth</code> (the last day − the first day), <code>share_pct</code> (the region's share of the total growth, %, one decimal place). Find the first and the last day with <code>MIN(day)</code> and <code>MAX(day)</code>.</p>",
    "hints": [
     "Conditional sum: <code>SUM(CASE WHEN day = (SELECT MAX(day) FROM daily_sales) THEN revenue END)</code>.",
     "Total growth: <code>SUM(growth) OVER ()</code>."
    ]
   }
  ]
 },
 "ba-9": {
  "pr": [
   {
    "title": "Gone for over a year",
    "prompt": "Using <code>delivered</code> orders only (\"today\" = <code>2026-07-01</code>), list the customers whose last purchase was more than 365 days ago: <code>customer_id</code>, <code>recency_days</code>. Sort by <code>recency_days</code> descending, then <code>customer_id</code>.",
    "hints": [
     "<code>CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER)</code>",
     "Filter on the aggregate: <code>HAVING recency_days &gt; 365</code>. Recency does not need <code>order_items</code>."
    ]
   },
   {
    "title": "Frequency distribution",
    "prompt": "How are customers spread by frequency (<code>delivered</code> orders only)? <code>frequency</code> (a customer's number of orders), <code>customers</code> (how many such customers). By <code>frequency</code>.",
    "hints": [
     "Group the ready <code>rfm</code> CTE once more, by <code>frequency</code>."
    ]
   },
   {
    "title": "Top five by monetary",
    "prompt": "The 5 customers who brought in the most money (<code>delivered</code> only): <code>customer_id</code>, <code>monetary</code> (sum of quantity × unit_price). Sort by <code>monetary</code> descending.",
    "hints": [
     "<code>ORDER BY monetary DESC LIMIT 5</code>"
    ]
   },
   {
    "title": "The \"333\" customers",
    "prompt": "List the <code>customer_id</code> of customers with the top score on all three dimensions (r = 3, f = 3, m = 3). Scores as in the lesson: <code>NTILE(3)</code>, recency descending, frequency and monetary ascending, with <code>customer_id</code> as the second column in every window. Sort by <code>customer_id</code>.",
    "hints": [
     "Compute the scores in a second CTE: a window function cannot be used directly in <code>WHERE</code>.",
     "<code>NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r</code> and so on; then <code>WHERE r = 3 AND f = 3 AND m = 3</code>."
    ]
   },
   {
    "title": "ABC group summary",
    "prompt": "Summarise the product ABC analysis (<code>delivered</code> only; cumulative share by descending revenue ≤ 80 is A, ≤ 95 is B, otherwise C) by group: <code>abc</code>, <code>products</code> (number of products), <code>revenue_pct</code> (the group's share of revenue, %, 1 decimal). By <code>abc</code>.",
    "hints": [
     "Put the lesson's ABC query into a CTE (<code>name</code>, <code>revenue</code>, <code>abc</code>), then <code>GROUP BY abc</code>.",
     "Share: <code>100.0 * SUM(revenue) / (SELECT SUM(revenue) FROM a)</code>. Group A should have 7 products and 77.5%."
    ]
   },
   {
    "title": "Pareto by category",
    "prompt": "Run the Pareto analysis at category level instead of products (<code>delivered</code> only): <code>category</code>, <code>revenue</code>, <code>cum_pct</code> (cumulative share by descending revenue, %, 1 decimal). Sort by revenue descending.",
    "hints": [
     "CTE: <code>GROUP BY pr.category</code>.",
     "<code>ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1)</code>"
    ]
   },
   {
    "title": "How much each segment weighs",
    "prompt": "Rebuild the lesson's segment table in SQL. Scores as in the lesson: <code>NTILE(3)</code>, recency descending, frequency and monetary ascending, with <code>customer_id</code> as the second column in every window. Segments: r = 3 and f = 3 is <code>'champions'</code>; r = 1 and f ≥ 2 is <code>'at_risk'</code>; r = 3 and f = 1 is <code>'new'</code>; everyone else is <code>'other'</code>. Columns: <code>segment</code>, <code>customers</code>, <code>revenue_pct</code> (share of monetary, %, 1 decimal). Sort by <code>revenue_pct</code> descending.",
    "hints": [
     "Three layers: <code>rfm</code> → scores (<code>NTILE</code>) → segment (<code>CASE</code>).",
     "Order matters in the <code>CASE</code>: the first matching branch wins.",
     "The numbers should match the lesson's table: 41, 14, 10, 5 customers."
    ]
   },
   {
    "title": "ABC by revenue and by units",
    "prompt": "Compute each product's ABC group by revenue and by units sold (sum of <code>quantity</code>), <code>delivered</code> only, cut-offs 80 and 95. The cumulative share is row by row: <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>, ordered by value descending, then <code>product_id</code>. Return the products whose two groups differ: <code>name</code>, <code>abc_revenue</code>, <code>abc_qty</code>. By <code>name</code>.",
    "hints": [
     "One CTE with each product's <code>revenue</code> and <code>qty</code> (<code>SUM(oi.quantity)</code>).",
     "Unit counts have ties, hence <code>ORDER BY qty DESC, product_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.",
     "Two <code>CASE</code> expressions, then <code>WHERE abc_revenue &lt;&gt; abc_qty</code>."
    ]
   }
  ]
 },
 "ba-10": {
  "pr": [
   {
    "title": "MAU and user-days",
    "prompt": "<b>metrics.</b> One row for September: <code>mau</code> (distinct users) and <code>user_days</code> (all \"user-day\" records). The gap between the two numbers is why MAU cannot be computed as a sum of DAUs.",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code> and <code>COUNT(*)</code>."
    ]
   },
   {
    "title": "Who came how many days",
    "prompt": "<b>metrics.</b> Each user's number of active days in September: <code>user_id</code>, <code>active_days</code>. Sort by <code>active_days</code> descending, then <code>user_id</code>.",
    "hints": [
     "<code>COUNT(DISTINCT day)</code>, <code>GROUP BY user_id</code>."
    ]
   },
   {
    "title": "The busiest day",
    "prompt": "<b>metrics.</b> Return the day (or days) with the highest DAU: <code>day</code>, <code>dau</code>.",
    "hints": [
     "Daily DAU in a CTE, then <code>WHERE dau = (SELECT MAX(dau) FROM d)</code>.",
     "<code>ORDER BY ... LIMIT 1</code> would drop a day if there were a tie."
    ]
   },
   {
    "title": "Weekly WAU",
    "prompt": "<b>metrics.</b> WAU per week: <code>week_start</code> (the Monday of the week, <code>date(day, 'weekday 0', '-6 days')</code>), <code>wau</code> (distinct users active at least once that week). By <code>week_start</code>. Partial weeks at the edges of the month are included.",
    "hints": [
     "<code>'weekday 0'</code> moves the date forward to Sunday, and <code>'-6 days'</code> gives that week's Monday.",
     "WAU is a distinct count: <code>COUNT(DISTINCT user_id)</code>, not a sum of DAUs."
    ]
   },
   {
    "title": "A daily habit",
    "prompt": "<b>metrics.</b> Users who were active on at least half the days of the month (≥ 50% of 30 days): <code>user_id</code>, <code>active_days</code>, <code>pct</code> (percent of 30 days, 1 decimal). Sort by <code>pct</code> descending, then <code>user_id</code>.",
    "hints": [
     "The denominator is the 30 calendar days: <code>COUNT(*) * 100.0 / 30</code>.",
     "<code>HAVING COUNT(*) * 100.0 / 30 &gt;= 50</code>"
    ]
   },
   {
    "title": "When new users arrive",
    "prompt": "<b>metrics.</b> Find each user's first active day in September and count by day: <code>first_day</code>, <code>new_users</code>. By <code>first_day</code>. MAU is built from these newcomers.",
    "hints": [
     "CTE: <code>SELECT user_id, MIN(day) AS first_day ... GROUP BY user_id</code>.",
     "Then <code>GROUP BY first_day</code>. The <code>new_users</code> values add up to MAU."
    ]
   },
   {
    "title": "Weekdays vs weekends",
    "prompt": "<b>metrics.</b> Compare the average DAU on weekdays and weekends: <code>day_type</code> (<code>'weekday'</code> or <code>'weekend'</code>; the weekend is Saturday and Sunday, <code>strftime('%w', day)</code> 6 or 0), <code>days</code> (calendar days), <code>avg_dau</code> (2 decimals). Days with no activity count too. By <code>day_type</code>.",
    "hints": [
     "First the zero-filled daily DAU: calendar + <code>LEFT JOIN</code>.",
     "<code>strftime('%w', day)</code> returns text: <code>IN ('0', '6')</code>.",
     "There should be 9 weekend days and 21 weekdays."
    ]
   },
   {
    "title": "Stickiness within the month",
    "prompt": "<b>metrics.</b> Compare the two halves of the month: 1–15 and 16–30 September (15 days each). Columns: <code>half</code> (<code>'1-15'</code> or <code>'16-30'</code>), <code>avg_dau</code> (user-days / 15, 2 decimals), <code>users</code> (distinct users in that half), <code>stickiness_pct</code> (avg_dau / users, %, 1 decimal). By <code>half</code>.",
    "hints": [
     "Group label: <code>CASE WHEN day &lt;= '2024-09-15' THEN '1-15' ELSE '16-30' END</code>.",
     "The denominator is 15 calendar days, not the days with data: <code>COUNT(*) * 1.0 / 15</code>.",
     "<code>ROUND(COUNT(*) * 100.0 / 15 / COUNT(DISTINCT user_id), 1)</code>"
    ]
   }
  ]
 },
 "ba-ab": {
  "pr": [
   {
    "title": "Conversion rate",
    "prompt": "<p>The function <code>conv_rate(users, conversions)</code> should return the conversion rate in percent, rounded with <code>round</code> to 2 decimals. If there are 0 users, return <code>0.0</code>.</p>",
    "hints": [
     "<code>conversions / users * 100</code>",
     "To avoid dividing by zero, check <code>if users == 0</code> first."
    ],
    "check": {
     "tests": "assert conv_rate(10000, 500) == 5.0, \"conv_rate(10000, 500) should be 5.0\"\nassert conv_rate(3000, 100) == 3.33, f\"conv_rate(3000, 100) should be 3.33, got {conv_rate(3000, 100)}\"\nassert conv_rate(0, 0) == 0.0, \"With 0 users return 0.0\""
    }
   },
   {
    "title": "Points vs percent",
    "prompt": "<p>The function <code>lifts(cr_a, cr_b)</code> takes two conversion rates (both in %) and returns the pair <code>(abs_pp, rel_pct)</code>: the absolute lift in percentage points and the relative lift in percent. Round both with <code>round</code> to 2 decimals.</p>",
    "hints": [
     "Absolute: <code>cr_b - cr_a</code>. Relative: <code>(cr_b - cr_a) / cr_a * 100</code>."
    ],
    "check": {
     "tests": "assert tuple(lifts(5.0, 5.6)) == (0.6, 12.0), f\"lifts(5.0, 5.6) should be (0.6, 12.0), got {lifts(5.0, 5.6)}\"\nassert tuple(lifts(4.0, 3.0)) == (-1.0, -25.0), \"A drop gives negative numbers: lifts(4.0, 3.0) = (-1.0, -25.0)\""
    }
   },
   {
    "title": "What the interval says",
    "prompt": "<p>The function <code>ci_verdict(low, high)</code> should return a verdict from the confidence interval of the difference: <code>'positive'</code> if the interval is entirely above zero, <code>'negative'</code> if entirely below zero, and <code>'inconclusive'</code> if it contains zero.</p>",
    "hints": [
     "If the lower bound is above zero, the whole interval is: <code>if low &gt; 0</code>."
    ],
    "check": {
     "tests": "assert ci_verdict(-0.02, 1.22) == 'inconclusive', \"The lesson's interval (−0.02 … 1.22) contains zero: 'inconclusive'\"\nassert ci_verdict(0.1, 0.9) == 'positive', \"0.1 … 0.9 should be 'positive'\"\nassert ci_verdict(-0.8, -0.2) == 'negative', \"-0.8 … -0.2 should be 'negative'\""
    }
   },
   {
    "title": "A split that is not 50/50",
    "prompt": "<p>Sometimes a test is split 90/10 rather than 50/50. The function <code>srm(n_a, n_b, share_a=0.5)</code> should return the pair <code>(chi2, has_srm)</code>: expected sizes e_a = (n_a + n_b) × share_a and e_b = (n_a + n_b) × (1 − share_a); chi2 = (n_a − e_a)² / e_a + (n_b − e_b)² / e_b, rounded with <code>round</code> to 2 decimals; <code>has_srm</code> is chi2 &gt; 3.84.</p>",
    "hints": [
     "<code>e_a = total * share_a</code>, <code>e_b = total * (1 - share_a)</code>",
     "With <code>share_a=0.5</code> you get the lesson's formula."
    ],
    "check": {
     "tests": "_c, _f = srm(10000, 9400)\nassert abs(_c - 18.56) < 0.011 and _f is True, f\"srm(10000, 9400) should be (18.56, True), got {(_c, _f)}\"\n_c, _f = srm(9000, 1000, 0.9)\nassert abs(_c) < 0.011 and _f is False, \"The 90/10 plan was met exactly: chi2 = 0, has_srm False\"\n_c, _f = srm(9100, 900, 0.9)\nassert abs(_c - 11.11) < 0.011 and _f is True, f\"srm(9100, 900, 0.9) should be (11.11, True), got {(_c, _f)}\""
    }
   },
   {
    "title": "The decision table",
    "prompt": "<p>Write the lesson's decision table as a function. <code>decide(srm, ci_low, ci_high, lift, mde, guardrail_ok=True)</code>: SRM present → <code>'rerun'</code>; a guardrail metric got worse (<code>guardrail_ok</code> False) → <code>'investigate'</code>; CI entirely above zero and <code>lift &gt;= mde</code> → <code>'ship'</code>; anything else → <code>'no_ship'</code>. Check in exactly this order.</p>",
    "hints": [
     "Four <code>if</code> checks, each returning immediately; SRM is checked first.",
     "CI above zero: <code>ci_low &gt; 0</code>."
    ],
    "check": {
     "tests": "assert decide(True, 0.5, 1.5, 1.0, 0.3) == 'rerun', \"With SRM the result is not used: 'rerun'\"\nassert decide(False, 0.5, 1.5, 1.0, 0.3, guardrail_ok=False) == 'investigate', \"If a guardrail metric got worse: 'investigate'\"\nassert decide(False, 0.5, 1.5, 1.0, 0.3) == 'ship', \"CI > 0 and lift ≥ MDE: 'ship'\"\nassert decide(False, -0.02, 1.22, 0.6, 0.3) == 'no_ship', \"CI contains zero: 'no_ship'\"\nassert decide(False, 0.05, 0.2, 0.1, 0.3) == 'no_ship', \"Significant but below the MDE: 'no_ship'\""
    }
   },
   {
    "title": "The early-stopping trap",
    "prompt": "<p>An analyst checks the test every day. The function <code>peeking_stop(pvalues, alpha=0.05)</code> takes the list of daily p-values and returns the number of the <b>first</b> day (counting from 1) with p &lt; alpha, or <code>None</code> if there is none. Stopping on that day is peeking: as the lesson says, it inflates the share of false wins.</p>",
    "hints": [
     "<code>for day, p in enumerate(pvalues, start=1):</code>"
    ],
    "check": {
     "tests": "assert peeking_stop([0.4, 0.2, 0.04, 0.09, 0.06]) == 3, \"The first p < 0.05 is on day 3: 3\"\nassert peeking_stop([0.3, 0.12, 0.07]) is None, \"If the threshold is never crossed: None\"\nassert peeking_stop([0.02, 0.5], alpha=0.01) is None, \"Use the alpha parameter\""
    }
   },
   {
    "title": "One control, several variants",
    "prompt": "<p>An A/B/C test: the function <code>variants(groups)</code> takes a dictionary <code>{'A': (users, purchases), 'B': ..., ...}</code> and, for every variant except the control (<code>'A'</code>), returns a triple <code>(name, cr, rel_lift)</code>: <code>cr</code> is the conversion rate in %; <code>rel_lift</code> is the relative lift over A in %. Round both with <code>round</code> to 2 decimals. Sort the list by <code>rel_lift</code> descending.</p>",
    "hints": [
     "First A's conversion rate, then <code>for name, (users, conv) in groups.items():</code>, skipping <code>'A'</code>.",
     "Compute the lift from the unrounded rates, and round only at the end.",
     "<code>sorted(out, key=lambda r: r[2], reverse=True)</code>"
    ],
    "check": {
     "tests": "_r = variants({'A': (10000, 500), 'B': (10000, 560), 'C': (10000, 470)})\nassert isinstance(_r, list) and len(_r) == 2, \"Expected a list of the two variants other than A\"\nassert [tuple(x) for x in _r] == [('B', 5.6, 12.0), ('C', 4.7, -6.0)], f\"Expected [('B', 5.6, 12.0), ('C', 4.7, -6.0)], got {_r}\"\n_r = variants({'C': (3000, 99), 'A': (3000, 90), 'B': (3000, 120)})\nassert [x[0] for x in _r] == ['B', 'C'] and [x[2] for x in _r] == [33.33, 10.0], f\"The control can be anywhere in the dict; expected B 33.33, C 10.0, got {_r}\""
    }
   },
   {
    "title": "Daily SRM",
    "prompt": "<p>An assignment bug sometimes shows up on one day only (say, release day). The function <code>srm_days(days)</code> takes the list of daily <code>(n_a, n_b)</code> pairs of a 50/50 test and returns the list of day numbers (from 1) that have SRM (chi2 &gt; 3.84). chi2 as in the lesson: e = (n_a + n_b) / 2.</p>",
    "hints": [
     "Apply the lesson's chi2 formula to each day separately: <code>for i, (n_a, n_b) in enumerate(days, start=1):</code>."
    ],
    "check": {
     "tests": "assert srm_days([(1000, 1010), (1020, 990), (1100, 900), (995, 1005)]) == [3], \"Only day 3 has SRM (1100 vs 900): [3]\"\nassert srm_days([(500, 500), (510, 490)]) == [], \"Small deviations give an empty list\"\nassert srm_days([(1200, 1000), (1000, 1000), (800, 1000)]) == [1, 3], f\"Several days: expected [1, 3], got {srm_days([(1200, 1000), (1000, 1000), (800, 1000)])}\""
    }
   }
  ]
 }
} });
