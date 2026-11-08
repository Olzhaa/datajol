// career practice tasks: English text. Code, solutions and checks are in content/practice/career.js.
DJ.i18n.patch({ lessons: {
 "cr-5": {
  "pr": [
   {
    "title": "The holder of the highest salary",
    "prompt": "<p>Output the employee(s) with the highest salary in the company: <code>name</code>, <code>salary</code>. Use a subquery.</p>",
    "hints": [
     "<code>WHERE salary = (SELECT MAX(salary) FROM employees)</code>"
    ]
   },
   {
    "title": "The second-lowest salary",
    "prompt": "<p>Output the second-lowest (unique) salary: <code>second_lowest</code>.</p>",
    "hints": [
     "The approach (a) from the lesson, but <code>MIN</code> and <code>&gt;</code>."
    ]
   },
   {
    "title": "Equal salaries in the company",
    "prompt": "<p>Across the whole company (regardless of department), output the salaries that several people receive: <code>salary</code>, <code>cnt</code>.</p>",
    "hints": [
     "<code>GROUP BY salary HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "The third-highest salary",
    "prompt": "<p>Output the third-highest <b>unique</b> salary using <code>DISTINCT</code> and <code>LIMIT/OFFSET</code>: <code>third_salary</code>.</p>",
    "hints": [
     "<code>OFFSET 2</code> skips the first two values.",
     "Without <code>DISTINCT</code>, equal salaries \"eat up\" places in the ranking."
    ]
   },
   {
    "title": "The person in second place",
    "prompt": "<p>Output the employees who receive the second-highest (unique) salary: <code>name</code>, <code>department</code>, <code>salary</code>.</p>",
    "hints": [
     "Make the \"second salary\" query from the lesson a subquery: <code>WHERE salary = (...)</code>."
    ]
   },
   {
    "title": "The duplicate rows themselves",
    "prompt": "<p>Output the employees who receive the same salary in the same department: <code>name</code>, <code>department</code>, <code>salary</code>. Make the query that finds the groups a subquery, and use <code>JOIN</code>.</p>",
    "hints": [
     "Subquery: <code>GROUP BY department, salary HAVING COUNT(*) &gt; 1</code>.",
     "The JOIN condition on two columns: <code>ON d.department = e.department AND d.salary = e.salary</code>."
    ]
   },
   {
    "title": "The second salary in a department",
    "prompt": "<p>Show the edge case: for <b>each</b> department, <code>department</code> and <code>second_salary</code> (the second unique salary in the department). In a department with only one salary level, it should be <code>NULL</code>. Use a correlated subquery.</p>",
    "hints": [
     "Repeat the approach from the lesson inside the department: add <code>WHERE e2.department = e.department</code> to the subqueries.",
     "<code>MAX</code> on an empty set gives <code>NULL</code>."
    ]
   },
   {
    "title": "Finding the N-th salary by counting",
    "prompt": "<p>Without a window function, output the employees who receive the <b>third-highest</b> unique salary: <code>name</code>, <code>salary</code>. Idea: the people for whom exactly 2 unique salaries are higher than their own.</p>",
    "hints": [
     "<code>(SELECT COUNT(DISTINCT e2.salary) FROM employees e2 WHERE e2.salary &gt; e.salary) = 2</code>"
    ]
   }
  ]
 },
 "cr-6": {
  "pr": [
   {
    "title": "First place in a department",
    "prompt": "<p>In each department, output the employees with the highest salary (if equal, all of them): <code>department</code>, <code>name</code>, <code>salary</code>. Use <code>DENSE_RANK</code>.</p>",
    "hints": [
     "The query from the lesson, but <code>rnk = 1</code>."
    ]
   },
   {
    "title": "Numbering by salary",
    "prompt": "<p>Number all employees in descending order of salary (on a tie, the smaller <code>id</code> comes first): <code>name</code>, <code>salary</code>, <code>rn</code>. In <code>rn</code> order.</p>",
    "hints": [
     "<code>ROW_NUMBER() OVER (ORDER BY salary DESC, id)</code>"
    ]
   },
   {
    "title": "RANK and DENSE_RANK",
    "prompt": "<p>See the difference with your own eyes: for each employee, output <code>name</code>, <code>salary</code>, <code>rnk</code> (<code>RANK</code>) and <code>drnk</code> (<code>DENSE_RANK</code>) in descending order of salary across the whole company.</p>",
    "hints": [
     "Two window functions can stand side by side in one <code>SELECT</code>."
    ]
   },
   {
    "title": "The newest employee in a department",
    "prompt": "<p>In each department, output the employee who was hired last: <code>department</code>, <code>name</code>, <code>hire_date</code>.</p>",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC)</code>"
    ]
   },
   {
    "title": "Retention after two months",
    "prompt": "<p>The retention of each cohort <b>two months</b> after sign-up: <code>signup_month</code>, <code>cohort_size</code>, <code>retained</code>, <code>retention_pct</code> (one decimal place). A cohort that had no returners should show 0.</p>",
    "hints": [
     "<code>strftime('%Y-%m', u.signup_month || '-01', '+2 month')</code>",
     "Write <code>ON</code> in the condition."
    ]
   },
   {
    "title": "Retention by channel",
    "prompt": "<p>Calculate the retention for the next month by channel: <code>channel</code>, <code>cohort_size</code>, <code>retained</code>, <code>retention_pct</code> (one decimal place).</p>",
    "hints": [
     "The query from the lesson, but <code>GROUP BY u.channel</code>."
    ]
   },
   {
    "title": "Top 2 and the share in a department",
    "prompt": "<p>In each department, output the employees who are in the first 2 salary levels (<code>DENSE_RANK</code>), and the share of their salary in the department's total salary pool: <code>department</code>, <code>name</code>, <code>salary</code>, <code>share_pct</code> (one decimal place).</p>",
    "hints": [
     "The inner query has two windows: <code>DENSE_RANK()</code> and <code>SUM(salary) OVER (PARTITION BY department)</code>.",
     "Outside, <code>WHERE rnk &lt;= 2</code>."
    ]
   },
   {
    "title": "Returning in any later month",
    "prompt": "<p>For each cohort, output those who were active in <b>any</b> month after the sign-up month: <code>signup_month</code>, <code>cohort_size</code>, <code>returned</code>, <code>returned_pct</code> (one decimal place). In sign-up month order.</p>",
    "hints": [
     "<code>EXISTS (SELECT 1 FROM activity a WHERE a.user_id = u.id AND a.month &gt; u.signup_month)</code> gives 1 or 0.",
     "The months are text in the form YYYY-MM, so <code>&gt;</code> compares them correctly."
    ]
   }
  ]
 },
 "cr-7": {
  "pr": [
   {
    "title": "Number of duplicate ids",
    "prompt": "<p>Like <code>df.duplicated('order_id').sum()</code>: the function <code>count_dupes(ids)</code> should return the number of extra (repeated) ids in the list. For example, <code>count_dupes([1, 2, 1, 3, 1])</code> → <code>2</code>.</p>",
    "hints": [
     "<code>len(ids) - len(set(ids))</code>"
    ],
    "check": {
     "tests": "assert count_dupes([1, 2, 1, 3, 1]) == 2, \"count_dupes([1, 2, 1, 3, 1]) should be 2\"\nassert count_dupes([1, 2, 3]) == 0, \"No duplicates: 0\"\nassert count_dupes([]) == 0, \"Empty list: 0\""
    }
   },
   {
    "title": "Counting empty amounts",
    "prompt": "<p>Like <code>df.isna().sum()</code>: the function <code>count_missing(rows)</code> should return the number of rows, among the tuples <code>(order_id, city, amount, status)</code>, where <code>amount is None</code>.</p>",
    "hints": [
     "Unpack the tuple: <code>for _, _, amount, _ in rows</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\nassert count_missing(_rows) == 1, \"There is one empty amount in this data: 1\"\nassert count_missing([(1, \"X\", None, \"a\"), (2, \"Y\", None, \"b\")]) == 2, \"Two empty amounts: 2\""
    }
   },
   {
    "title": "Filter out cancelled orders",
    "prompt": "<p>The function <code>drop_cancelled(rows)</code> should remove the rows where <code>status == \"cancelled\"</code>, and return the remaining rows as a new list in their original order.</p>",
    "hints": [
     "The status is the 4th element of the tuple: <code>r[3]</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = drop_cancelled(_rows)\nassert len(_r) == 6, f\"6 rows should remain, you have {len(_r)}\"\nassert all(r[3] != \"cancelled\" for r in _r), \"No cancelled rows should remain\"\nassert _r[0] == _rows[0] and _r[-1] == _rows[-1], \"The order of the rows must be kept\""
    }
   },
   {
    "title": "Keep the first rows",
    "prompt": "<p>Like <code>drop_duplicates('order_id')</code>: the function <code>dedupe(rows)</code> should keep only the first row of each <code>order_id</code> and return them in their original order.</p>",
    "hints": [
     "Keep the ids already seen in <code>seen = set()</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = dedupe(_rows)\nassert [r[0] for r in _r] == [1, 2, 3, 4, 5, 6], f\"The order_id values should be [1, 2, 3, 4, 5, 6], you have {[r[0] for r in _r]}\"\nassert dedupe([(7, \"X\", 100, \"a\"), (7, \"Y\", 999, \"b\")]) == [(7, \"X\", 100, \"a\")], \"The first row must remain\""
    }
   },
   {
    "title": "Cleaning log",
    "prompt": "<p>In the take-home you need to record how many rows remain after each step. The function <code>clean_log(rows)</code> should return a list of pairs <code>(қадам, қалған_жолдар)</code> in this order: <code>(\"бастапқы\", n)</code>, <code>(\"дубликат\", n)</code> (the first row of each order_id), <code>(\"cancelled\", n)</code>, <code>(\"бос сома\", n)</code>.</p>",
    "hints": [
     "After each step, create a new list and add its length to the log."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = clean_log(_rows)\nassert _r == [(\"бастапқы\", 7), (\"дубликат\", 6), (\"cancelled\", 5), (\"бос сома\", 4)], f\"The log is wrong: {_r}\""
    }
   },
   {
    "title": "Share of revenue by city",
    "prompt": "<p>For the sentence \"45% of the revenue comes from Almaty\": the function <code>city_shares(rows)</code> should return the dictionary <code>{қала: үлес_пайызы}</code> from the clean tuples <code>(order_id, city, amount)</code> (one decimal place).</p>",
    "hints": [
     "First the sum by city, then divide by the total sum."
    ],
    "check": {
     "tests": "_r = city_shares([(1, \"Алматы\", 4500), (2, \"Астана\", 3000), (3, \"Алматы\", 0), (4, \"Шымкент\", 2500)])\nassert _r == {\"Алматы\": 45.0, \"Астана\": 30.0, \"Шымкент\": 25.0}, f\"The result is wrong: {_r}\""
    }
   },
   {
    "title": "The main answer of the take-home",
    "prompt": "<p>The function <code>top_city_answer(rows)</code> should clean the raw tuples <code>(order_id, city, amount, status)</code> (the first row of each order_id; no cancelled and no empty amount), and then return the pair <code>(қала, үлес_пайызы)</code>: the city with the highest revenue and its share (one decimal place).</p>",
    "hints": [
     "Do the duplicate check <b>before</b> the status and amount checks.",
     "The largest: <code>max(totals, key=lambda c: totals[c])</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\nassert top_city_answer(_rows) == (\"Алматы\", 61.1), f\"Expected ('Алматы', 61.1), you have {top_city_answer(_rows)}\""
    }
   },
   {
    "title": "Average check by month",
    "prompt": "<p>The function <code>monthly_aov(rows)</code> should take the tuples <code>(order_id, date, amount, status)</code> (<code>date</code> is <code>\"YYYY-MM-DD\"</code>). Cleaning: take the first row of each order_id, and drop the cancelled and the empty amounts. The result: <code>{\"YYYY-MM\": орташа_чек}</code>, rounded to a whole number with <code>round</code>.</p>",
    "hints": [
     "Month: <code>date[:7]</code>.",
     "Two dictionaries: the sum and the count."
    ],
    "check": {
     "tests": "_rows = [(1, \"2024-08-02\", 5000, \"delivered\"), (2, \"2024-08-15\", 3000, \"delivered\"), (1, \"2024-08-02\", 5000, \"delivered\"), (3, \"2024-09-01\", 9000, \"cancelled\"), (4, \"2024-09-03\", 2000, \"shipped\"), (5, \"2024-09-20\", None, \"delivered\"), (6, \"2024-09-28\", 2500, \"delivered\")]\n_r = monthly_aov(_rows)\nassert _r == {\"2024-08\": 4000, \"2024-09\": 2250}, f\"Expected {'2024-08': 4000, '2024-09': 2250}, you have {_r}\""
    }
   }
  ]
 },
 "cr-8": {
  "pr": [
   {
    "title": "The weakest day",
    "prompt": "<p>The day with the lowest total daily revenue (both regions together): <code>day</code>, <code>revenue</code>, in one row.</p>",
    "hints": [
     "<code>GROUP BY day ORDER BY revenue LIMIT 1</code>"
    ]
   },
   {
    "title": "Revenue by region over the period",
    "prompt": "<p>The first step of the decomposition: the total revenue of each region over the period: <code>region</code>, <code>revenue</code>.</p>",
    "hints": [
     "<code>GROUP BY region</code>"
    ]
   },
   {
    "title": "Let's look at the days of the drop",
    "prompt": "<p>The revenue of each region on the days <code>2024-09-07</code> and <code>2024-09-08</code>: <code>region</code>, <code>day</code>, <code>revenue</code>. In region order, then day order.</p>",
    "hints": [
     "<code>WHERE day IN ('2024-09-07', '2024-09-08')</code>"
    ]
   },
   {
    "title": "A one-day change of a region",
    "prompt": "<p>For each region, in one row: <code>region</code>, <code>rev_07</code> (7 September), <code>rev_08</code> (8 September), <code>change</code> (= rev_08 − rev_07). Use a conditional sum.</p>",
    "hints": [
     "<code>SUM(CASE WHEN day = '2024-09-07' THEN revenue END)</code>"
    ]
   },
   {
    "title": "The same day last week",
    "prompt": "<p>We compare Sunday not with Saturday, but with last Sunday. Compare the total daily revenue with the value 7 days earlier: <code>day</code>, <code>revenue</code>, <code>week_ago</code>. <code>LAG(revenue, 7)</code> gives the value of the row 7 rows earlier. Output only the days that have a <code>week_ago</code>, in day order.</p>",
    "hints": [
     "<code>LAG(revenue, 7) OVER (ORDER BY day)</code>",
     "To filter the result of the window, one more CTE is needed."
    ]
   },
   {
    "title": "Days below the average",
    "prompt": "<p>The days when the total daily revenue is below the average for the period: <code>day</code>, <code>revenue</code>, <code>diff</code> (revenue − average, one decimal place). In day order.</p>",
    "hints": [
     "The average for the period: <code>AVG(revenue) OVER ()</code>."
    ]
   },
   {
    "title": "The regional share of the drop",
    "prompt": "<p>On the day <code>2024-09-08</code> the total revenue fell compared with the previous day. The change of each region and its share in the total change: <code>region</code>, <code>change</code>, <code>share_pct</code> (one decimal place). Use <code>LAG</code> inside a region.</p>",
    "hints": [
     "<code>LAG(revenue) OVER (PARTITION BY region ORDER BY day)</code>",
     "Outside, <code>WHERE day = '2024-09-08'</code> and <code>SUM(change) OVER ()</code>."
    ]
   },
   {
    "title": "The biggest drop and its source",
    "prompt": "<p>In one row, output the day when the total revenue fell the most, and the region that fell the most on that day: <code>day</code>, <code>change</code> (the total change), <code>worst_region</code>. Find the day from the data, not from the lesson.</p>",
    "hints": [
     "Three CTEs: the total daily change, the regional daily change, the worst day.",
     "Choose the region with a subquery: <code>ORDER BY r.change LIMIT 1</code>."
    ]
   }
  ]
 }
} });
