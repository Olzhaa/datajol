// capstone practice tasks: English text. Code, solutions and checks are in content/practice/capstone.js.
DJ.i18n.patch({ lessons: {
 "cap-2": {
  "pr": [
   {
    "title": "Counting by status",
    "prompt": "<p>Which statuses are in the table <code>orders</code> and how many orders does each one have? <code>status</code>, <code>n</code>.</p>",
    "hints": [
     "<code>GROUP BY status</code>"
    ]
   },
   {
    "title": "Customer profile",
    "prompt": "<p>From the table <code>customers</code>, in one row: <code>n</code> (the number of customers), <code>first_signup</code>, <code>last_signup</code> (the earliest and the latest sign-up date).</p>",
    "hints": [
     "<code>MIN(signup_date)</code>, <code>MAX(signup_date)</code>"
    ]
   },
   {
    "title": "Orders without an amount",
    "prompt": "<p>Output the orders with an empty amount (<code>NULL</code>): <code>id</code>, <code>customer_id</code>, <code>order_date</code>. In <code>id</code> order.</p>",
    "hints": [
     "<code>WHERE amount IS NULL ORDER BY id</code>"
    ]
   },
   {
    "title": "The smallest orders",
    "prompt": "<p>The 3 orders with the smallest amount (without empty amounts): <code>id</code>, <code>customer_id</code>, <code>amount</code>. In ascending order of the amount; for equal amounts, by <code>id</code>. Could these orders also be outliers?</p>",
    "hints": [
     "<code>ORDER BY amount, id LIMIT 3</code>"
    ]
   },
   {
    "title": "City and channel combinations",
    "prompt": "<p>A check of the categorical columns: how many customers in the table <code>customers</code> are in each combination of city and channel? <code>city</code>, <code>channel</code>, <code>n</code>. By city first, then by channel.</p>",
    "hints": [
     "<code>GROUP BY city, channel</code>"
    ]
   },
   {
    "title": "Checking for duplicates",
    "prompt": "<p>Output in one row: <code>n</code> (the number of orders), <code>uniq_ids</code> (unique <code>id</code>), <code>uniq_customers</code> (unique customers who placed orders). Are <code>n</code> and <code>uniq_ids</code> equal?</p>",
    "hints": [
     "<code>COUNT(DISTINCT id)</code>, <code>COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "Profile by month",
    "prompt": "<p>The \"health\" of each month: <code>month</code> (<code>order_date</code>, the YYYY-MM part), <code>n</code>, <code>null_amount</code>, <code>refunds</code>. In month order. In which months are the empty amounts concentrated?</p>",
    "hints": [
     "<code>SUM(amount IS NULL)</code>, <code>SUM(status = 'refund')</code>, <code>GROUP BY month</code>."
    ]
   },
   {
    "title": "Too far from the average",
    "prompt": "<p>Find the orders whose amount is more than 3 times the average amount of all orders: <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>. Calculate the average with a subquery.</p>",
    "hints": [
     "<code>WHERE amount &gt; 3 * (SELECT AVG(amount) FROM orders)</code>"
    ]
   }
  ]
 },
 "cap-3": {
  "pr": [
   {
    "title": "Number of paid orders",
    "prompt": "<p>Output the number of orders with the status <code>status = 'paid'</code> as one value <code>paid</code>.</p>",
    "hints": [
     "<code>WHERE status = 'paid'</code>"
    ]
   },
   {
    "title": "Refunds",
    "prompt": "<p>Refunded orders (<code>refund</code>): in one row, <code>refunds</code> (the count) and <code>refund_sum</code> (the sum).</p>",
    "hints": [
     "<code>WHERE status = 'refund'</code>"
    ]
   },
   {
    "title": "Corporate orders",
    "prompt": "<p>Large orders that are looked at separately from the analysis (<code>amount &gt;= 20000</code>): <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>.</p>",
    "hints": [
     "<code>WHERE amount &gt;= 20000</code>"
    ]
   },
   {
    "title": "Report of removed rows",
    "prompt": "<p>For the memo, output in one row: <code>total</code> (all orders), <code>clean_orders</code> (clean orders) and <code>removed</code> (removed ones). Use the CTE <code>clean</code> (the rules from cap-3).</p>",
    "hints": [
     "Calculate each value with a subquery: <code>(SELECT COUNT(*) FROM clean)</code>."
    ]
   },
   {
    "title": "Reasons for removal",
    "prompt": "<p>Count the orders that are not in the clean data, by reason: <code>reason</code>, <code>n</code>. The reason is set with CASE, and the checks go in this order: <code>status = 'refund'</code> → <code>refund</code>; an empty amount → <code>сома жоқ</code>; amount ≥ 20000 → <code>корпоративтік</code>.</p>",
    "hints": [
     "Unclean rows: <code>WHERE NOT (status = 'paid' AND amount IS NOT NULL AND amount &lt; 20000)</code>.",
     "Give the CASE expression <code>AS reason</code>, then <code>GROUP BY reason</code>."
    ]
   },
   {
    "title": "Before and after cleaning",
    "prompt": "<p>How does a corporate order affect the average check? In one row: <code>raw_avg</code> (the average of all <code>paid</code> orders with an amount) and <code>clean_avg</code> (the average of the clean orders), both rounded to a whole number with <code>ROUND</code>.</p>",
    "hints": [
     "Two subqueries: one from <code>orders</code>, the other from <code>clean</code>."
    ]
   },
   {
    "title": "The effect of cleaning on revenue",
    "prompt": "<p>In one row: <code>revenue_paid</code> (the sum of all <code>paid</code> orders), <code>revenue_clean</code> (the sum of the clean orders) and <code>diff_pct</code> — by what percentage cleaning reduced the revenue (one decimal place).</p>",
    "hints": [
     "In the second CTE, calculate the two sums, and find the percentage outside.",
     "<code>SUM</code> skips the empty values by itself."
    ]
   },
   {
    "title": "Customers affected by cleaning",
    "prompt": "<p>Customers who had at least one order removed during cleaning: <code>customer_id</code>, <code>all_orders</code> (all their orders), <code>clean_orders</code> (their clean orders). Sort by <code>customer_id</code>.</p>",
    "hints": [
     "<code>orders o LEFT JOIN clean c ON c.id = o.id</code>: in the unclean row, <code>c.id</code> is empty.",
     "<code>COUNT(c.id)</code> counts only the clean rows; <code>HAVING COUNT(*) &gt; COUNT(c.id)</code>."
    ]
   }
  ]
 },
 "cap-4": {
  "pr": [
   {
    "title": "Orders by month",
    "prompt": "<p>The number of orders in each month, based on the clean orders: <code>month</code>, <code>orders</code>. In month order.</p>",
    "hints": [
     "Use the CTE <code>clean</code> (the rules from cap-3).",
     "<code>substr(order_date, 1, 7)</code>"
    ]
   },
   {
    "title": "Revenue by month",
    "prompt": "<p>The revenue of each month based on the clean orders: <code>month</code>, <code>revenue</code>. In month order.</p>",
    "hints": [
     "Use the CTE <code>clean</code> (the rules from cap-3)."
    ]
   },
   {
    "title": "Active customers by month",
    "prompt": "<p>The unique customers who placed at least one clean order in each month: <code>month</code>, <code>customers</code>. In month order.</p>",
    "hints": [
     "<code>COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "Orders per customer",
    "prompt": "<p>How often do customers come back? For each month, <code>month</code> and <code>orders_per_customer</code> (orders / unique customers, two decimal places). In month order.</p>",
    "hints": [
     "<code>COUNT(*) * 1.0 / COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "MoM growth of clean revenue",
    "prompt": "<p>The change of the clean revenue from month to month: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (one decimal place). In month order.</p>",
    "hints": [
     "The second CTE: the revenue by month.",
     "<code>LAG(revenue) OVER (ORDER BY month)</code>"
    ]
   },
   {
    "title": "New customers of the month",
    "prompt": "<p>How many customers placed their <b>first</b> clean order in each month? <code>month</code>, <code>new_customers</code>. In month order.</p>",
    "hints": [
     "First find the first clean order of each customer: <code>MIN(order_date)</code>.",
     "Then group by its month."
    ]
   },
   {
    "title": "New and returning customers",
    "prompt": "<p>Split the active customers of each month into two groups: <code>month</code>, <code>active</code> (unique customers), <code>new_customers</code> (those who placed their first clean order in that month), <code>returning_customers</code> (<code>active − new_customers</code>). In month order.</p>",
    "hints": [
     "CTE <code>f</code>: the first month of each customer. CTE <code>a</code>: the unique (month, customer) pairs.",
     "<code>SUM(f.first_month = a.month)</code> counts the new ones."
    ]
   },
   {
    "title": "Breaking revenue into factors",
    "prompt": "<p>Revenue = customers × orders per customer × average check. To see which factor changed when the revenue changed, output for each month: <code>month</code>, <code>customers</code>, <code>cust_mom_pct</code>, <code>aov</code> (to a whole number), <code>aov_mom_pct</code>. The percentages are the change compared with the previous month, one decimal place. In month order.</p>",
    "hints": [
     "In a CTE, take <code>customers</code> and <code>AVG(amount)</code> by month.",
     "For each indicator separately, <code>LAG(...) OVER (ORDER BY month)</code>."
    ]
   }
  ]
 },
 "cap-5": {
  "pr": [
   {
    "title": "Customers by channel",
    "prompt": "<p>From the table <code>customers</code>, output the number of customers of each channel: <code>channel</code>, <code>n</code>. In descending order of the count.</p>",
    "hints": [
     "<code>GROUP BY channel ORDER BY n DESC</code>"
    ]
   },
   {
    "title": "Customers by city",
    "prompt": "<p>How many customers are in each city: <code>city</code>, <code>n</code>. In descending order of the count. Remember that the figures for a small city should be read with care.</p>",
    "hints": [
     "<code>GROUP BY city ORDER BY n DESC</code>"
    ]
   },
   {
    "title": "Revenue by channel",
    "prompt": "<p>The revenue of each channel from the clean orders: <code>channel</code>, <code>revenue</code>. In descending order of revenue.</p>",
    "hints": [
     "Use the CTE <code>clean</code> (the rules from cap-3).",
     "<code>customers c JOIN clean o ON o.customer_id = c.id</code>"
    ]
   },
   {
    "title": "Purchase frequency by channel",
    "prompt": "<p>On average, how many clean orders does a customer of each channel place? <code>channel</code>, <code>orders_per_customer</code> (two decimal places). In descending order.</p>",
    "hints": [
     "<code>COUNT(o.id) * 1.0 / COUNT(DISTINCT c.id)</code>"
    ]
   },
   {
    "title": "Average check by channel",
    "prompt": "<p>The average check of each channel based on the clean orders: <code>channel</code>, <code>aov</code> (round to a whole number with <code>ROUND</code>). In descending order.</p>",
    "hints": [
     "<code>ROUND(AVG(o.amount))</code>"
    ]
   },
   {
    "title": "City and channel together",
    "prompt": "<p>A segment on two dimensions: <code>city</code>, <code>channel</code>, <code>customers</code> (unique customers who placed orders), <code>revenue</code>. In descending order of revenue.</p>",
    "hints": [
     "<code>GROUP BY c.city, c.channel</code>"
    ]
   },
   {
    "title": "Share of revenue by channel",
    "prompt": "<p>The share of each channel in the clean revenue: <code>channel</code>, <code>revenue</code>, <code>share_pct</code> (%, one decimal place). In descending order of revenue.</p>",
    "hints": [
     "The total revenue: <code>SUM(SUM(o.amount)) OVER ()</code>."
    ]
   },
   {
    "title": "The most valuable channel in a city",
    "prompt": "<p>In each city, find the channel with the highest revenue per customer (<code>rev_per_customer</code>, rounded to a whole number): <code>city</code>, <code>channel</code>, <code>rev_per_customer</code>. In city order.</p>",
    "hints": [
     "CTE: revenue per customer by city × channel — <code>rev_per_customer</code>.",
     "<code>ROW_NUMBER() OVER (PARTITION BY city ORDER BY rev_per_customer DESC)</code>, and in the main query <code>rn = 1</code>."
    ]
   }
  ]
 },
 "cap-6": {
  "pr": [
   {
    "title": "The most frequent customers",
    "prompt": "<p>The 5 customers with the largest number of clean orders: <code>customer_id</code>, <code>n</code>. In descending order of the count, and by <code>customer_id</code> when the counts are equal.</p>",
    "hints": [
     "<code>ORDER BY n DESC, customer_id LIMIT 5</code>"
    ]
   },
   {
    "title": "Overall repeat rate",
    "prompt": "<p>Among the customers who placed at least one clean order, the share of those who have at least 3 of them: <code>repeat_rate</code> (%, one decimal place), as one value.</p>",
    "hints": [
     "Two CTEs: <code>clean</code> and <code>per</code>.",
     "<code>SUM(n &gt;= 3) * 100.0 / COUNT(*)</code>"
    ]
   },
   {
    "title": "Rare customers",
    "prompt": "<p>The number of customers who have exactly 1 or 2 clean orders, as one value: <code>few</code>.</p>",
    "hints": [
     "From the CTE <code>per</code>, take <code>WHERE n &lt;= 2</code>."
    ]
   },
   {
    "title": "Distribution of the number of orders",
    "prompt": "<p>How many customers have 1, 2, 3, ... clean orders? <code>n</code> (the number of orders), <code>customers</code> (customers). In <code>n</code> order.</p>",
    "hints": [
     "Group the CTE <code>per</code> by <code>n</code>."
    ]
   },
   {
    "title": "Repeat rate by city",
    "prompt": "<p>The repeat rate by city: <code>city</code>, <code>customers</code>, <code>repeat_rate</code> (≥ 3 clean orders, %, one decimal place). In descending order.</p>",
    "hints": [
     "The query from the lesson, but <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Testing the threshold",
    "prompt": "<p>How does the threshold affect the result? In one row, three repeat rates (%, one decimal place): <code>rate2</code> (≥ 2 orders), <code>rate3</code> (≥ 3), <code>rate4</code> (≥ 4).</p>",
    "hints": [
     "Calculate the three columns from one CTE <code>per</code>."
    ]
   },
   {
    "title": "Repeat rate by cohort",
    "prompt": "<p>By sign-up month: <code>cohort</code> (the YYYY-MM part of <code>signup_date</code>), <code>customers</code>, <code>repeat_rate</code> (≥ 3 clean orders, %, one decimal place). In cohort order. Why might the figure be lower for customers who signed up late?</p>",
    "hints": [
     "<code>substr(c.signup_date, 1, 7) AS cohort</code>, <code>GROUP BY cohort</code>."
    ]
   },
   {
    "title": "Revenue of returning customers",
    "prompt": "<p>What percentage of the clean revenue comes from the customers who have at least 3 clean orders? <code>repeat_revenue_pct</code> (one decimal place), as one value.</p>",
    "hints": [
     "Join <code>clean</code> and <code>per</code> with JOIN.",
     "Conditional sum: <code>SUM(CASE WHEN p.n &gt;= 3 THEN o.amount END)</code>."
    ]
   }
  ]
 },
 "cap-7": {
  "pr": [
   {
    "title": "ROAS of one channel",
    "prompt": "<p>The function <code>roas(revenue, spend)</code> should return the ROAS (revenue / spend), rounded to 2 decimal places (<code>round</code>). For example, <code>roas(120000, 40000)</code> → <code>3.0</code>.</p>",
    "hints": [
     "<code>round(revenue / spend, 2)</code>"
    ],
    "check": {
     "tests": "assert roas(120000, 40000) == 3.0, \"roas(120000, 40000) should be 3.0\"\nassert roas(410000, 300000) == 1.37, \"roas(410000, 300000) should be 1.37\""
    }
   },
   {
    "title": "Channels that do not pay back their spend",
    "prompt": "<p>The function <code>losing(revenue, spend)</code> should return the list of the names of the channels with a ROAS below 1, in alphabetical order (<code>sorted</code>).</p>",
    "hints": [
     "<code>revenue[ch] / spend[ch] &lt; 1</code>"
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\nassert losing(_rev, _sp) == [\"2gis\", \"instagram\"], f\"Expected ['2gis', 'instagram'], you have {losing(_rev, _sp)}\"\nassert losing({\"a\": 10}, {\"a\": 5}) == [], \"If all channels are effective, an empty list\""
    }
   },
   {
    "title": "Overall ROAS",
    "prompt": "<p>The function <code>total_roas(revenue, spend)</code> should return the overall ROAS of all channels: the sum of the revenues / the sum of the spend, to 2 decimal places.</p>",
    "hints": [
     "<code>sum(revenue.values())</code>"
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\nassert total_roas(_rev, _sp) == 0.75, f\"Expected 0.75, you have {total_roas(_rev, _sp)}\""
    }
   },
   {
    "title": "Profit with the margin",
    "prompt": "<p>ROAS does not show profit. The function <code>profit(revenue, spend, margin)</code> should return a dictionary of the profit of each channel: <code>revenue × margin − spend</code>, rounded to a whole number with <code>round</code>. For example, with a margin of 0.4, revenue of 120 000 ₸ and spend of 40 000 ₸ → <code>8000</code>.</p>",
    "hints": [
     "A dict comprehension: <code>{ch: ... for ch in spend}</code>."
    ],
    "check": {
     "tests": "_r = profit({\"referral\": 120000, \"2gis\": 400000}, {\"referral\": 40000, \"2gis\": 150000}, 0.4)\nassert _r == {\"referral\": 8000, \"2gis\": 10000}, f\"Expected {'referral': 8000, '2gis': 10000}, you have {_r}\""
    }
   },
   {
    "title": "Budget shares",
    "prompt": "<p>The function <code>budget_shares(spend)</code> should return a dictionary with the share of each channel in the total budget as a percentage (one decimal place).</p>",
    "hints": [
     "First <code>total = sum(spend.values())</code>."
    ],
    "check": {
     "tests": "_r = budget_shares({\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000})\nassert _r == {\"instagram\": 61.2, \"2gis\": 30.6, \"referral\": 8.2}, f\"The result is wrong: {_r}\""
    }
   },
   {
    "title": "A channel with no revenue",
    "prompt": "<p>Some channel may not have brought any revenue yet. The function <code>roas_safe(revenue, spend)</code> should return a dictionary of the ROAS for each channel in <code>spend</code> (two decimal places); the ROAS of a channel that is not in <code>revenue</code> is <code>0.0</code>.</p>",
    "hints": [
     "<code>revenue.get(ch, 0)</code>"
    ],
    "check": {
     "tests": "_r = roas_safe({\"instagram\": 150000}, {\"instagram\": 300000, \"tiktok\": 50000})\nassert _r == {\"instagram\": 0.5, \"tiktok\": 0.0}, f\"Expected {'instagram': 0.5, 'tiktok': 0.0}, you have {_r}\""
    }
   },
   {
    "title": "Reallocating the budget",
    "prompt": "<p>The function <code>reallocate(revenue, spend, pct)</code> should take <code>pct</code> percent of the budget of the channel with the lowest ROAS, add it to the channel with the highest ROAS, and return a <b>new</b> budget dictionary (whole numbers, <code>round</code>). The original <code>spend</code> must not change.</p>",
    "hints": [
     "Lowest/highest: <code>min(r, key=...)</code>, <code>max(r, key=...)</code>.",
     "A copy: <code>new = dict(spend)</code>."
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\n_r = reallocate(_rev, _sp, 20)\nassert _r == {\"instagram\": 240000, \"2gis\": 150000, \"referral\": 100000}, f\"60 000 should move from Instagram to referral, you have {_r}\"\nassert _sp == {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}, \"Do not change the original spend dictionary\""
    }
   },
   {
    "title": "List of profit and spend",
    "prompt": "<p>The function <code>roas_report(revenue, spend, margin)</code> should return a list of tuples <code>(арна, roas, мәртебе)</code>, sorted by ROAS in descending order. ROAS — 2 decimal places. Status: if <code>revenue × margin &gt; spend</code>, then <code>\"пайда\"</code>, otherwise <code>\"шығын\"</code>. Note: even if the ROAS is above 1, there can be a loss.</p>",
    "hints": [
     "For each channel, create a tuple and add it to the list.",
     "<code>sorted(rows, key=lambda r: r[1], reverse=True)</code>"
    ],
    "check": {
     "tests": "_rev = {\"instagram\": 150000, \"2gis\": 138800, \"referral\": 79200}\n_sp = {\"instagram\": 300000, \"2gis\": 150000, \"referral\": 40000}\n_r = roas_report(_rev, _sp, 0.6)\nassert _r == [(\"referral\", 1.98, \"пайда\"), (\"2gis\", 0.93, \"шығын\"), (\"instagram\", 0.5, \"шығын\")], f\"The result is wrong: {_r}\"\nassert roas_report({\"a\": 150}, {\"a\": 100}, 0.4) == [(\"a\", 1.5, \"шығын\")], \"ROAS 1.5, but if the margin is 40%, it is a loss\""
    }
   }
  ]
 },
 "cap-9": {
  "pr": [
   {
    "title": "Date of the first order",
    "prompt": "<p>The date of the first order of each customer (any status): <code>customer_id</code>, <code>first_order</code>. In <code>customer_id</code> order.</p>",
    "hints": [
     "<code>MIN(order_date)</code>, <code>GROUP BY customer_id</code>"
    ]
   },
   {
    "title": "Second-largest check",
    "prompt": "<p>Output the second-largest (unique) amount among the clean orders: <code>second_amount</code>.</p>",
    "hints": [
     "The classic pattern: the maximum of the values that are less than <code>MAX</code> is <code>MAX</code>."
    ]
   },
   {
    "title": "Customers without refunds",
    "prompt": "<p>Output the number of customers who have no order with the status <code>refund</code>: <code>n</code>. Use <code>NOT EXISTS</code>.</p>",
    "hints": [
     "<code>NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'refund')</code>"
    ]
   },
   {
    "title": "Third order",
    "prompt": "<p>The date of the <b>third</b> order of the customers who have at least three orders (any status): <code>customer_id</code>, <code>third_order</code>.</p>",
    "hints": [
     "The \"second order\" pattern, but <code>rn = 3</code>."
    ]
   },
   {
    "title": "In March, not in April",
    "prompt": "<p>Customers who placed at least one clean order in March (<code>2024-03</code>) and no clean order in April (<code>2024-04</code>): <code>customer_id</code>, in ascending order.</p>",
    "hints": [
     "Use the CTE <code>clean</code> twice: in the outer query and inside <code>NOT EXISTS</code>."
    ]
   },
   {
    "title": "The largest check of a customer",
    "prompt": "<p>The largest clean order of each customer: <code>customer_id</code>, <code>order_date</code>, <code>amount</code>. One row per customer (on a tie, the earlier order). In <code>customer_id</code> order.</p>",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY amount DESC, order_date)</code>"
    ]
   },
   {
    "title": "Top-2 customers in a channel",
    "prompt": "<p>In each channel, the 2 customers with the largest number of clean orders: <code>channel</code>, <code>customer_id</code>, <code>orders</code>. On a tie, the smaller <code>customer_id</code> ranks first (<code>ROW_NUMBER</code>). Sort by channel, then by place.</p>",
    "hints": [
     "CTE: the number of orders by channel × customer.",
     "<code>ROW_NUMBER() OVER (PARTITION BY channel ORDER BY orders DESC, customer_id)</code>, and in the main query <code>rn &lt;= 2</code>."
    ]
   },
   {
    "title": "Customers who came three months in a row",
    "prompt": "<p>Customers who have at least one clean order in <b>each</b> of the months March, April and May (<code>2024-03</code>, <code>2024-04</code>, <code>2024-05</code>): <code>customer_id</code>, in ascending order.</p>",
    "hints": [
     "Filter the orders of the three months and group by customer.",
     "<code>HAVING COUNT(DISTINCT substr(order_date, 1, 7)) = 3</code>"
    ]
   }
  ]
 }
} });
