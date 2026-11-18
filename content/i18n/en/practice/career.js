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
 },
 "cr-ds": {
  "pr": [
   {
    "title": "AUC and Gini",
    "prompt": "<p>Banks talk about model quality in terms of Gini. Write two functions:</p><ul><li><code>gini_from_auc(auc)</code> — Gini = 2 × AUC − 1;</li><li><code>auc_from_gini(gini)</code> — the inverse conversion.</li></ul><p>For example, <code>gini_from_auc(0.75)</code> → <code>0.5</code>, <code>auc_from_gini(0.52)</code> → <code>0.76</code>.</p>",
    "hints": [
     "Solve Gini = 2 × AUC − 1 for AUC: AUC = (Gini + 1) / 2."
    ],
    "check": {
     "tests": "assert gini_from_auc(0.75) is not None and abs(gini_from_auc(0.75) - 0.5) < 1e-12, \"AUC 0.75 → Gini 0.50\"\nassert abs(gini_from_auc(0.5)) < 1e-12, \"a random model: AUC 0.5 → Gini 0\"\nassert abs(gini_from_auc(1.0) - 1) < 1e-12, \"a perfect model: Gini 1\"\nassert auc_from_gini(0.52) is not None and abs(auc_from_gini(0.52) - 0.76) < 1e-12, \"Gini 0.52 → AUC 0.76\"\nassert abs(auc_from_gini(gini_from_auc(0.81)) - 0.81) < 1e-12, \"the two functions are inverses of each other\""
    }
   },
   {
    "title": "The accuracy of an “all clean” model",
    "prompt": "<p>On imbalanced data accuracy is misleading. Write the function <code>majority_accuracy(y)</code>: it returns the accuracy of a model that always predicts the majority class (<code>y</code> is a list of 0/1).</p><p>For example, if 5 of 1 000 transactions are fraud, <code>majority_accuracy(y)</code> → <code>0.995</code>: a model that finds nothing is 99.5% “right”.</p>",
    "hints": [
     "The share of ones <code>share = sum(y) / len(y)</code>; the majority is <code>max(share, 1 - share)</code>."
    ],
    "check": {
     "tests": "assert majority_accuracy([0] * 995 + [1] * 5) is not None, \"majority_accuracy must return a value\"\nassert abs(majority_accuracy([0] * 995 + [1] * 5) - 0.995) < 1e-12, \"995 / 1000 = 0.995: high accuracy, but not a single fraud is found\"\nassert abs(majority_accuracy([1, 1, 0]) - 2 / 3) < 1e-12, \"it must also work when the majority is 1: 2/3\"\nassert abs(majority_accuracy([0, 1]) - 0.5) < 1e-12, \"balanced classes: 0.5\""
    }
   },
   {
    "title": "Precision and recall",
    "prompt": "<p>Write the function <code>precision_recall(y_true, y_pred)</code>: from lists of 0/1 it returns <code>(precision, recall)</code>.</p><ul><li>precision = TP / (TP + FP) — the share of real fraud among those flagged as “fraud”;</li><li>recall = TP / (TP + FN) — the part of all fraud that was found.</li></ul><p>If a denominator is 0, that metric is <code>0.0</code>.</p>",
    "hints": [
     "TP: <code>t == 1 and p == 1</code>; FP: <code>t == 0 and p == 1</code>; FN: <code>t == 1 and p == 0</code>.",
     "To avoid dividing by zero: <code>tp / (tp + fp) if tp + fp else 0.0</code>."
    ],
    "check": {
     "tests": "_r = precision_recall([1, 0, 1, 1, 0, 0], [1, 1, 0, 1, 0, 0])\nassert _r is not None and len(_r) == 2, \"return the pair (precision, recall)\"\nassert abs(_r[0] - 2 / 3) < 1e-12 and abs(_r[1] - 2 / 3) < 1e-12, f\"TP = 2, FP = 1, FN = 1: it should be (2/3, 2/3), you got {_r}\"\n_r2 = precision_recall([1, 1, 1, 0], [1, 0, 0, 0])\nassert abs(_r2[0] - 1) < 1e-12 and abs(_r2[1] - 1 / 3) < 1e-12, \"a cautious model: precision 1, recall 1/3\"\nassert tuple(precision_recall([1, 0], [0, 0])) == (0.0, 0.0), \"if nobody is flagged as fraud: precision 0.0 (denominator 0), recall 0.0\""
    }
   },
   {
    "title": "The KS statistic",
    "prompt": "<p>KS is the largest gap between the cumulative shares of “bad” and “good” customers. Write the function <code>ks_stat(y, scores)</code>: take each unique score as a threshold t, compute TPR = (share of positive examples with score ≥ t) and FPR = (share of negative examples with score ≥ t), and return max |TPR − FPR|.</p><p>For example, <code>ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1])</code> → <code>0.5</code>.</p>",
    "hints": [
     "Split the scores into two lists: <code>pos</code> (y = 1) and <code>neg</code> (y = 0).",
     "<code>for thr in set(scores)</code>: <code>tpr = sum(s &gt;= thr for s in pos) / len(pos)</code>, FPR the same way."
    ],
    "check": {
     "tests": "import numpy as _np\nassert ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1]) is not None, \"ks_stat must return a value\"\nassert abs(ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1]) - 0.5) < 1e-12, f\"KS should be 0.5 (at the thresholds t = 0.9 and t = 0.7), you got {ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1])}\"\nassert abs(ks_stat([1, 1, 0, 0], [0.9, 0.8, 0.3, 0.1]) - 1) < 1e-12, \"perfect separation: KS = 1\"\nassert abs(ks_stat([0, 0, 1, 1], [0.9, 0.8, 0.3, 0.1]) - 1) < 1e-12, \"in the reverse order |TPR − FPR| = 1 too: take the absolute value\"\n_g = _np.random.default_rng(6)\n_y = (_g.random(300) < 0.3).astype(int)\n_s = _np.round(_g.normal(0, 1, 300) + 1.2 * _y, 2)\n_e = max(abs((_s[_y == 1] >= _t).mean() - (_s[_y == 0] >= _t).mean()) for _t in set(_s.tolist()))\nassert abs(ks_stat(_y.tolist(), _s.tolist()) - _e) < 1e-9, f\"on 300 customers KS should be ≈ {_e:.3f}, you got {ks_stat(_y.tolist(), _s.tolist()):.3f}\""
    }
   },
   {
    "title": "PSI: has the model gone stale",
    "prompt": "<p>The shares of the score by bins: <code>expected</code> — in the training period, <code>actual</code> — now. Write two functions:</p><ul><li><code>psi(expected, actual)</code> — PSI = Σ (a − e) × ln(a / e);</li><li><code>needs_retrain(expected, actual)</code> — <code>True</code> if PSI &gt; 0.25 (a significant shift).</li></ul><p>For example, <code>psi([0.25] * 4, [0.1, 0.2, 0.3, 0.4])</code> ≈ <code>0.228</code>: the watch zone, but no need to retrain yet.</p>",
    "hints": [
     "<code>sum((a - e) * math.log(a / e) for e, a in zip(expected, actual))</code>",
     "Each term is non-negative: if a &gt; e, ln(a / e) &gt; 0; if a &lt; e, both factors are negative."
    ],
    "check": {
     "tests": "assert psi([0.25] * 4, [0.25] * 4) is not None and abs(psi([0.25] * 4, [0.25] * 4)) < 1e-12, \"if the distribution has not changed, PSI = 0\"\n_p = psi([0.25] * 4, [0.1, 0.2, 0.3, 0.4])\nassert abs(_p - 0.228217) < 1e-4, f\"PSI should be ≈ 0.228, you got {_p:.4f}\"\nassert abs(psi([0.5, 0.3, 0.2], [0.2, 0.3, 0.5]) - 0.549774) < 1e-4, \"the outer bins swapped places: PSI ≈ 0.550\"\nassert needs_retrain([0.25] * 4, [0.1, 0.2, 0.3, 0.4]) is False, \"0.228 ≤ 0.25: no need to retrain yet (False)\"\nassert needs_retrain([0.5, 0.3, 0.2], [0.2, 0.3, 0.5]) is True, \"0.55 > 0.25: a significant shift (True)\"\nassert abs(psi([0.1, 0.9], [0.2, 0.8]) - psi([0.2, 0.8], [0.1, 0.9])) < 1e-12, \"PSI is symmetric: swapping expected and actual does not change it\""
    }
   },
   {
    "title": "Defaults in the riskiest 20%",
    "prompt": "<p>In the write-up the result is put in business terms: “the model finds 60% of defaults in the riskiest 20% of applications”. Write the function <code>capture_rate(y, scores, top=0.2)</code>: sort by score in descending order and return the share of all defaults that fall into the first <code>k = round(top × n)</code> applications.</p><p>For a random model it is about equal to <code>top</code>.</p>",
    "hints": [
     "Sort the indices by score: <code>sorted(range(len(y)), key=lambda i: scores[i], reverse=True)</code>.",
     "Divide the sum of y over the first k indices by <code>sum(y)</code>."
    ],
    "check": {
     "tests": "_y = [1, 0, 0, 1, 0, 0, 0, 1, 0, 0]\n_s = [0.9, 0.8, 0.1, 0.7, 0.2, 0.3, 0.4, 0.05, 0.6, 0.5]\nassert capture_rate(_y, _s) is not None, \"capture_rate must return a value\"\nassert abs(capture_rate(_y, _s) - 1 / 3) < 1e-12, f\"the 2 riskiest applications (0.9, 0.8) hold 1 of 3 defaults: 1/3, you got {capture_rate(_y, _s)}\"\nassert abs(capture_rate(_y, _s, top=0.3) - 2 / 3) < 1e-12, \"top = 0.3: the first 3 applications (0.9, 0.8, 0.7), 2/3\"\nassert abs(capture_rate(_y, _s, top=1.0) - 1) < 1e-12, \"top = 1: all defaults are caught\"\nassert abs(capture_rate([1, 1, 0, 0, 0], [0.2, 0.1, 0.9, 0.8, 0.7], top=0.4)) < 1e-12, \"a model with the reverse order finds nobody in the first 40%\""
    }
   },
   {
    "title": "Leakage audit",
    "prompt": "<p>Take-home: <code>df</code> holds credit applications and a <code>default</code> column. Check how well each feature on its own orders the target. Write the function <code>suspicious(df, target, thr=0.9)</code>: for every column except target compute <code>roc_auc_score(df[target], df[col])</code> and return the <b>sorted</b> list of columns with max(AUC, 1 − AUC) ≥ thr.</p><p>1 − AUC is needed too: if a feature is inversely related to the target (for example, the share of on-time payments), its AUC is close to 0. If one feature alone has an AUC of 0.95, it is usually information “not known at prediction time”.</p>",
    "hints": [
     "<code>for col in df.columns</code>, skip the target with <code>continue</code>.",
     "<code>auc = roc_auc_score(df[target], df[col])</code>; the condition: <code>max(auc, 1 - auc) &gt;= thr</code>.",
     "At the end <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _auc\n_r = suspicious(df, \"default\")\nassert _r is not None, \"suspicious must return a value\"\nassert list(_r) == [\"collection_calls\", \"on_time_share\"], f\"the suspicious features should be ['collection_calls', 'on_time_share'], you got {_r}. on_time_share has an AUC close to 0: check 1 − AUC as well\"\nassert \"default\" not in suspicious(df, \"default\", thr=0.5), \"do not check the target column itself\"\n_m = {c: max(_auc(df[\"default\"], df[c]), 1 - _auc(df[\"default\"], df[c])) for c in df.columns if c != \"default\"}\n_e = sorted(c for c, v in _m.items() if v >= 0.6)\nassert list(suspicious(df, \"default\", thr=0.6)) == _e, f\"with thr = 0.6 it should be {_e}: use the thr parameter\"\n_d2 = df.rename(columns={\"default\": \"bad\"})\nassert list(suspicious(_d2, \"bad\")) == [\"collection_calls\", \"on_time_share\"], \"the target name must come from the parameter, do not hard-code default\""
    }
   },
   {
    "title": "Out-of-time Gini and a Pipeline",
    "prompt": "<p>Applications from 2024: <code>month</code> (1–12), features and <code>default</code>. Write the function <code>oot_gini(df, cutoff)</code>:</p><ol><li>train — <code>month &lt; cutoff</code>, test — <code>month &gt;= cutoff</code> (a time-based split);</li><li>the features are all columns except <code>month</code> and <code>default</code>;</li><li><code>Pipeline([(\"scaler\", StandardScaler()), (\"model\", LogisticRegression(max_iter=1000))])</code> is fitted on train only;</li><li>return <code>(gini_train, gini_test)</code>: Gini = 2 × ROC-AUC − 1 from <code>predict_proba(...)[:, 1]</code>.</li></ol><p>In the data the pattern weakens in the last months (drift), so the out-of-time Gini comes out lower than on train.</p>",
    "hints": [
     "Split: <code>train, test = df[df[\"month\"] &lt; cutoff], df[df[\"month\"] &gt;= cutoff]</code>.",
     "Features: <code>[c for c in df.columns if c not in (\"month\", \"default\")]</code>.",
     "<code>pipe.fit(train[features], train[\"default\"])</code>, then <code>2 * roc_auc_score(...) - 1</code> on each part."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.preprocessing import StandardScaler as _S\nfrom sklearn.linear_model import LogisticRegression as _L\nfrom sklearn.metrics import roc_auc_score as _auc\ndef _ref(d, cut):\n    tr, te = d[d[\"month\"] < cut], d[d[\"month\"] >= cut]\n    f = [c for c in d.columns if c not in (\"month\", \"default\")]\n    p = _P([(\"s\", _S()), (\"m\", _L(max_iter=1000))]).fit(tr[f], tr[\"default\"])\n    return 2 * _auc(tr[\"default\"], p.predict_proba(tr[f])[:, 1]) - 1, 2 * _auc(te[\"default\"], p.predict_proba(te[f])[:, 1]) - 1\n_r = oot_gini(df, 10)\nassert _r is not None and len(_r) == 2, \"return the pair (gini_train, gini_test)\"\n_e = _ref(df, 10)\nassert abs(float(_r[0]) - _e[0]) < 1e-6, f\"gini_train should be ≈ {_e[0]:.4f}, you got {float(_r[0]):.4f}. month and default are not features, the scaler is fitted on train only\"\nassert abs(float(_r[1]) - _e[1]) < 1e-6, f\"gini_test should be ≈ {_e[1]:.4f}, you got {float(_r[1]):.4f}. test is month >= cutoff\"\nassert float(_r[1]) < float(_r[0]) - 0.05, \"because of drift the out-of-time Gini is lower than on train\"\n_e7 = _ref(df, 7)\nassert abs(float(oot_gini(df, 7)[1]) - _e7[1]) < 1e-6, \"use the cutoff parameter\""
    }
   }
  ]
 }
} });
