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
 }
} });
