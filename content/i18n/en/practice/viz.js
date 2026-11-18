// viz practice tasks: English text. Code, solutions and checks are in content/practice/viz.js.
DJ.i18n.patch({ lessons: {
 "viz-3": {
  "pr": [
   {
    "title": "Number of products by category",
    "prompt": "<p>For a bar chart: how many products are in each category? <code>category</code>, <code>n</code>. In descending order of the count, and by category name when the counts are equal.</p>",
    "hints": [
     "<code>ORDER BY n DESC, category</code>"
    ]
   },
   {
    "title": "Sorting by value",
    "prompt": "<p>The function <code>sort_desc(data)</code> should turn a dictionary into a list of <code>(атау, мән)</code> pairs and return it in descending order of the value. For example, <code>sort_desc({\"Астана\": 310, \"Алматы\": 420})</code> → <code>[(\"Алматы\", 420), (\"Астана\", 310)]</code>.</p>",
    "hints": [
     "<code>sorted(data.items(), key=lambda kv: kv[1], reverse=True)</code>"
    ],
    "check": {
     "tests": "assert sort_desc({\"Астана\": 310, \"Алматы\": 420}) == [(\"Алматы\", 420), (\"Астана\", 310)], \"In descending order: [('Алматы', 420), ('Астана', 310)]\"\nassert sort_desc({\"а\": 1, \"ә\": 3, \"б\": 2}) == [(\"ә\", 3), (\"б\", 2), (\"а\", 1)], \"sort_desc({'а': 1, 'ә': 3, 'б': 2}) is wrong\""
    }
   },
   {
    "title": "Orders by city",
    "prompt": "<p>How many orders did the customers of each city place? <code>city</code>, <code>orders</code>. In descending order of the number of orders, and by city name when the numbers are equal.</p>",
    "hints": [
     "<code>customers c JOIN orders o ON o.customer_id = c.id</code>"
    ]
   },
   {
    "title": "Proportional length",
    "prompt": "<p>The function <code>bar_len(v, max_v, width)</code> should return the number of characters for a bar: <code>round(v / max_v * width)</code>. The axis starts at zero, so the length is proportional to the value. For example, <code>bar_len(310, 420, 8)</code> → <code>6</code>.</p>",
    "hints": [
     "<code>round(...)</code> gives a whole number."
    ],
    "check": {
     "tests": "assert bar_len(310, 420, 8) == 6, \"bar_len(310, 420, 8) should be 6\"\nassert bar_len(420, 420, 8) == 8, \"The largest value takes the full width: 8\"\nassert bar_len(0, 420, 8) == 0, \"A zero value has no bar: 0\"\nassert isinstance(bar_len(100, 300, 10), int), \"Return a whole number\""
    }
   },
   {
    "title": "Best-selling products",
    "prompt": "<p>Output the 5 products with the largest sales (number of pieces) for delivered orders: <code>name</code>, <code>qty</code>. In descending order, and by name when the quantities are equal.</p>",
    "hints": [
     "Join the three tables with JOIN and calculate <code>SUM(oi.quantity)</code>.",
     "<code>ORDER BY qty DESC, p.name LIMIT 5</code>"
    ]
   },
   {
    "title": "Writing the share as a percentage",
    "prompt": "<p>To write a share next to a bar, the function <code>shares(data)</code> should return a dictionary <code>{атау: үлес}</code>: the share is the percentage of the total sum, rounded to one decimal place (<code>round</code>). For example, <code>shares({\"Алматы\": 3, \"Астана\": 1})</code> → <code>{\"Алматы\": 75.0, \"Астана\": 25.0}</code>.</p>",
    "hints": [
     "First <code>total = sum(data.values())</code>."
    ],
    "check": {
     "tests": "assert shares({\"Алматы\": 3, \"Астана\": 1}) == {\"Алматы\": 75.0, \"Астана\": 25.0}, \"shares({'Алматы': 3, 'Астана': 1}) is wrong\"\nassert shares({\"а\": 1, \"ә\": 2}) == {\"а\": 33.3, \"ә\": 66.7}, \"shares({'а': 1, 'ә': 2}) should be {'а': 33.3, 'ә': 66.7}\""
    }
   },
   {
    "title": "Grouped bars",
    "prompt": "<p>The function <code>grouped_bars(data, width)</code> should build a text grouped chart from the dictionary <code>{қала: (биыл, былтыр)}</code>. The cities are in descending order of the <b>value for this year</b>. Each city gets two lines:</p><ul><li><code>f\"{қала:&lt;8}{'█' * n1} {биыл}\"</code></li><li><code>f\"{'':&lt;8}{'░' * n2} {былтыр}\"</code></li></ul><p>The lengths are on one scale: <code>n = round(мән / ең_үлкен_мән * width)</code>, where the largest value is taken from both years. Return the list of lines.</p>",
    "hints": [
     "The largest value: <code>max(max(a, b) for a, b in data.values())</code>.",
     "Sort key: <code>kv[1][0]</code> (this year's value)."
    ],
    "check": {
     "tests": "_r = grouped_bars({\"Астана\": (300, 200), \"Алматы\": (400, 300)}, 4)\nassert isinstance(_r, list) and len(_r) == 4, \"Two lines for each city: 4 lines\"\nassert _r == [\"Алматы  ████ 400\", \"        ░░░ 300\", \"Астана  ███ 300\", \"        ░░ 200\"], f\"The lines are wrong: {_r}\""
    }
   },
   {
    "title": "Layers by month and category",
    "prompt": "<p>Data for a stacked chart: the revenue for each month and category from delivered orders. <code>month</code> (<code>order_date</code>, the YYYY-MM part), <code>category</code>, <code>revenue</code>. In month order, and within a month in descending order of revenue.</p>",
    "hints": [
     "<code>GROUP BY month, p.category</code>",
     "<code>ORDER BY month, revenue DESC</code>"
    ]
   }
  ]
 },
 "viz-4": {
  "pr": [
   {
    "title": "Daily revenue in Almaty",
    "prompt": "<p>For a line chart, only the daily revenue of the Almaty region: <code>day</code>, <code>revenue</code>, in day order.</p>",
    "hints": [
     "<code>WHERE region = 'Алматы' ORDER BY day</code>"
    ]
   },
   {
    "title": "Line of monthly payments",
    "prompt": "<p>Monthly revenue from the table <code>payments</code>: <code>month</code>, <code>revenue</code>, in month order.</p>",
    "hints": [
     "<code>GROUP BY month ORDER BY month</code>"
    ]
   },
   {
    "title": "Active users by month",
    "prompt": "<p>The number of active users in each month from the table <code>activity</code>: <code>month</code>, <code>active_users</code> (unique). In month order.</p>",
    "hints": [
     "<code>COUNT(DISTINCT user_id)</code>"
    ]
   },
   {
    "title": "Two regions side by side",
    "prompt": "<p>A \"wide\" table is needed for a line chart with two lines: <code>day</code>, <code>almaty</code>, <code>astana</code> (the revenue of each region on that day). In day order.</p>",
    "hints": [
     "<code>SUM(CASE WHEN region = 'Алматы' THEN revenue END)</code>"
    ]
   },
   {
    "title": "3-day moving average",
    "prompt": "<p>Smoothing the noise: the total daily revenue and a 3-day moving average. <code>day</code>, <code>revenue</code>, <code>ma3</code> (the current and the 2 previous days, one decimal place). In day order.</p>",
    "hints": [
     "First, in a CTE, take the sum for each day.",
     "<code>AVG(revenue) OVER (ORDER BY day ROWS 2 PRECEDING)</code>"
    ]
   },
   {
    "title": "Cumulative revenue",
    "prompt": "<p>A line of the cumulative revenue from the start of the month: <code>day</code>, <code>revenue</code> (the total for the day), <code>running</code> (all revenue up to and including that day). In day order.</p>",
    "hints": [
     "<code>SUM(revenue) OVER (ORDER BY day)</code>"
    ]
   },
   {
    "title": "Moving average within a region",
    "prompt": "<p>Each region has its own 3-day moving average: <code>region</code>, <code>day</code>, <code>revenue</code>, <code>ma3</code> (one decimal place). Sort by region first, then by day.</p>",
    "hints": [
     "<code>OVER (PARTITION BY region ORDER BY day ROWS 2 PRECEDING)</code>"
    ]
   },
   {
    "title": "A label for an annotation",
    "prompt": "<p>To put an annotation on the chart: <code>day</code>, <code>revenue</code> (total), <code>change</code> (the difference from the previous day), <code>trend</code>: if it grows, <code>өсу</code>; if it falls, <code>түсу</code>; if it does not change, <code>тең</code>. On the first day <code>change</code> and <code>trend</code> are empty (NULL). In day order.</p>",
    "hints": [
     "<code>revenue - LAG(revenue) OVER (ORDER BY day)</code>",
     "If you do not write <code>ELSE</code> in the CASE, the result for NULL will be NULL."
    ]
   }
  ]
 },
 "viz-9": {
  "pr": [
   {
    "title": "A monthly dataset by status",
    "prompt": "<b>qazaq.</b> A long-format dataset for an \"Orders by status\" bar chart: over all 2026 orders, <code>month</code> (first day of the month, <code>date(order_date, 'start of month')</code>), <code>status</code>, <code>orders</code> (number of orders). Sort by <code>month</code>, <code>status</code>.",
    "hints": [
     "The status goes in a row, not in a column name: <code>GROUP BY month, status</code>.",
     "<code>WHERE order_date &gt;= '2026-01-01'</code>"
    ]
   },
   {
    "title": "Parts, not the ratio",
    "prompt": "<b>qazaq.</b> Prepare a dataset for an \"average order value by city\" card, but store its parts instead of the average itself: over <code>delivered</code> orders, <code>city</code>, <code>orders</code> (distinct orders), <code>revenue</code> (sum of quantity × unit_price). Sort by <code>city</code>.",
    "hints": [
     "Joining <code>order_items</code> repeats each order: <code>COUNT(DISTINCT o.order_id)</code>.",
     "The BI tool will then compute the average itself: <code>SUM(revenue) / SUM(orders)</code>."
    ]
   },
   {
    "title": "Sign-ups on a time axis",
    "prompt": "<b>qazaq.</b> A dataset for a \"Monthly sign-ups\" line chart: <code>month</code> as a real date (the first day of the month, not the text <code>'2025-03'</code>), <code>new_customers</code>, the customers who registered that month. Sort by <code>month</code>.",
    "hints": [
     "<code>date(registered_at, 'start of month')</code>"
    ]
   },
   {
    "title": "Grain: one customer",
    "prompt": "<b>qazaq.</b> A dataset for a customer dashboard, one row per customer: <code>customer_id</code>, <code>city</code>, <code>registered_at</code>, <code>orders</code> (number of <code>delivered</code> orders), <code>revenue</code> (their sum of quantity × unit_price). Customers who never bought are included with <code>orders</code> and <code>revenue</code> of 0. 80 rows, by <code>customer_id</code>.",
    "hints": [
     "First compute each buyer's <code>orders</code> and <code>revenue</code> in a CTE, then <code>customers c LEFT JOIN</code> that CTE.",
     "A row without a match gets NULL: <code>COALESCE(d.orders, 0)</code>."
    ]
   },
   {
    "title": "An average of averages",
    "prompt": "<b>qazaq.</b> From 2026 <code>delivered</code> orders, compute <code>orders</code> and <code>revenue</code> at the \"month × city\" level. Then compare two numbers in one row: <code>right_avg</code> = <code>SUM(revenue) / SUM(orders)</code> and <code>wrong_avg</code> = the average of each row's average order value. <code>ROUND</code> both to whole numbers.",
    "hints": [
     "CTE: <code>GROUP BY month, c.city</code> with <code>COUNT(DISTINCT o.order_id)</code> and the sum.",
     "<code>ROUND(SUM(revenue) * 1.0 / SUM(orders))</code> and <code>ROUND(AVG(revenue * 1.0 / orders))</code>. <code>* 1.0</code> avoids integer division."
    ]
   },
   {
    "title": "City × status",
    "prompt": "<b>qazaq.</b> A dataset for a stacked bar chart: over all orders, <code>city</code> (the customer's city), <code>status</code>, <code>orders</code> (number of orders). Only combinations that exist. Sort by <code>city</code>, <code>status</code>.",
    "hints": [
     "<code>orders o JOIN customers c ON c.customer_id = o.customer_id</code>, <code>GROUP BY c.city, o.status</code>."
    ]
   },
   {
    "title": "A grid with no holes",
    "prompt": "<b>qazaq.</b> If a \"month × city\" cell with no orders is missing from the dataset, the line breaks and the BI tool will not show it as 0. Build the full grid of the six months of 2026 and every city in <code>customers</code>: <code>month</code> (first day of the month), <code>city</code>, <code>orders</code> (number of <code>delivered</code> orders, 0 if none). 48 rows, by <code>month</code>, <code>city</code>.",
    "hints": [
     "Three CTEs: the list of months (<code>DISTINCT</code>), the list of cities (<code>DISTINCT city FROM customers</code>), the actual counts.",
     "The grid: <code>m CROSS JOIN ct</code>, then <code>LEFT JOIN f ON f.month = m.month AND f.city = ct.city</code> and <code>COALESCE(f.orders, 0)</code>."
    ]
   },
   {
    "title": "A first-order flag",
    "prompt": "<b>qazaq.</b> An order-level dataset for a \"Revenue from new vs repeat customers\" chart: over <code>delivered</code> orders, <code>order_id</code>, <code>order_date</code>, <code>customer_id</code>, <code>is_first</code> (1 if it is the customer's first delivered order, otherwise 0; with two on the same day, the smaller <code>order_id</code> comes first), <code>order_total</code>. By <code>order_id</code>.",
    "hints": [
     "First bring it to the order level in a CTE: <code>GROUP BY o.order_id, o.order_date, o.customer_id</code>.",
     "If <code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, order_id) = 1</code>, it is the first."
    ]
   }
  ]
 },
 "viz-10": {
  "pr": [
   {
    "title": "Orders per month",
    "prompt": "<p>Data for a line chart: from the clean orders, count the <b>number</b> of orders in each month and store it in the Series <code>counts</code>: the index is the <code>'YYYY-MM'</code> month (ascending), the value is the number of orders.</p>",
    "hints": [
     "Month: <code>clean['order_date'].str[:7]</code>.",
     "<code>.size()</code> or <code>['id'].count()</code> gives the row count."
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\nassert 'counts' in globals() and getattr(counts, 'ndim', 0) == 1, \"counts must be a pandas Series\"\nassert [str(i) for i in counts.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], f\"Index: 2024-01 … 2024-06, got {list(counts.index)}\"\nassert [int(v) for v in counts.values] == [int(x) for x in _cl.groupby(_cl['order_date'].str[:7]).size().values], \"Orders per month are wrong: only clean orders count\"\nassert int(counts.sum()) == 139, f\"There should be 139 clean orders in total, got {int(counts.sum())}\""
    }
   },
   {
    "title": "Columns by channel",
    "prompt": "<p>Data for a vertical bar chart (<code>ax.bar</code>): from the clean orders, compute each channel's (<code>channel</code>) revenue and store it in the Series <code>by_channel</code>, sorted in <b>descending</b> order.</p>",
    "hints": [
     "The channel lives in <code>customers</code>: <code>clean.merge(customers, on='customer_id')</code>.",
     "<code>.groupby('channel')['amount'].sum().sort_values(ascending=False)</code>"
    ],
    "check": {
     "tests": "assert 'by_channel' in globals() and getattr(by_channel, 'ndim', 0) == 1, \"by_channel must be a pandas Series\"\nassert list(by_channel.index) == ['2gis', 'instagram', 'referral'], f\"Descending order: 2gis, instagram, referral; got {list(by_channel.index)}\"\nassert [float(v) for v in by_channel.values] == [133900.0, 124050.0, 76900.0], f\"Revenue: 133,900, 124,050, 76,900; got {list(by_channel.values)}\""
    }
   },
   {
    "title": "Turn it into shares",
    "prompt": "<p>Data for a 100% bar: from the clean orders, store each channel's share of revenue in percent (<code>round</code> to 1 decimal) in the Series <code>share</code>. The index is the channel, any order.</p>",
    "hints": [
     "First the sum per channel, then divide by the total: <code>rev / rev.sum() * 100</code>.",
     "<code>.round(1)</code>"
    ],
    "check": {
     "tests": "assert 'share' in globals() and getattr(share, 'ndim', 0) == 1, \"share must be a pandas Series\"\nassert {k: float(v) for k, v in share.items()} == {'2gis': 40.0, 'instagram': 37.0, 'referral': 23.0}, f\"Shares: 2gis 40.0, instagram 37.0, referral 23.0; got {dict(share)}\""
    }
   },
   {
    "title": "A long table for seaborn",
    "prompt": "<p>Prepare a long-format DataFrame for <code>sns.lineplot(data=long_df, x='month', y='revenue', hue='channel')</code>: <code>long_df</code> has exactly these columns in this order, <code>month</code>, <code>channel</code>, <code>revenue</code> (sum of clean revenue); rows sorted by <code>month</code>, <code>channel</code>, index starting at 0.</p>",
    "hints": [
     "<code>m.groupby(['month', 'channel'], as_index=False)['amount'].sum()</code> keeps the grouping columns as ordinary columns.",
     "<code>.rename(columns={'amount': 'revenue'})</code>, then <code>.reset_index(drop=True)</code>."
    ],
    "check": {
     "tests": "assert 'long_df' in globals() and getattr(long_df, 'ndim', 0) == 2, \"long_df must be a DataFrame\"\nassert list(long_df.columns) == ['month', 'channel', 'revenue'], f\"Columns: month, channel, revenue; got {list(long_df.columns)}\"\nassert len(long_df) == 18 and list(long_df.index) == list(range(18)), \"18 rows (6 months × 3 channels), index 0 to 17\"\nassert list(long_df['month'])[:3] == ['2024-01'] * 3 and list(long_df['channel'])[:3] == ['2gis', 'instagram', 'referral'], \"Rows must be sorted by month, then channel\"\nassert float(long_df.loc[(long_df['month'] == '2024-03') & (long_df['channel'] == 'instagram'), 'revenue'].iloc[0]) == 47750.0, \"instagram, 2024-03 should be 47,750\""
    }
   },
   {
    "title": "Customers for a scatter",
    "prompt": "<p>Data for <code>ax.scatter(per_cust['orders'], per_cust['total'])</code>: from the clean orders, put each customer's number of orders and total amount into the DataFrame <code>per_cust</code>. Columns: <code>customer_id</code>, <code>orders</code>, <code>total</code>; sorted by <code>customer_id</code>, index starting at 0.</p>",
    "hints": [
     "Named aggregation: <code>.agg(orders=('id', 'count'), total=('amount', 'sum'))</code>.",
     "<code>groupby('customer_id', as_index=False)</code> keeps the customer id as a column."
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\nassert 'per_cust' in globals() and list(per_cust.columns) == ['customer_id', 'orders', 'total'], \"Columns: customer_id, orders, total\"\nassert len(per_cust) == _cl['customer_id'].nunique() and list(per_cust['customer_id']) == sorted(_cl['customer_id'].unique().tolist()), \"One row per customer with clean orders, sorted by customer_id\"\nassert int(per_cust['orders'].sum()) == 139 and float(per_cust['total'].sum()) == 334850.0, \"orders should add up to 139 and total to 334,850\"\nassert int(per_cust.loc[per_cust['customer_id'] == 1, 'orders'].iloc[0]) == int((_cl['customer_id'] == 1).sum()), \"Customer 1's order count is wrong\""
    }
   },
   {
    "title": "Cumulative revenue",
    "prompt": "<p>Data for a \"year-to-date revenue\" line: from the monthly revenue of clean orders, store the running total in the Series <code>cum</code> (the index is the <code>'YYYY-MM'</code> month, ascending). The last value is the total revenue for the half-year.</p>",
    "hints": [
     "First the monthly sum (<code>monthly</code> from the lesson), then <code>.cumsum()</code>."
    ],
    "check": {
     "tests": "assert 'cum' in globals() and getattr(cum, 'ndim', 0) == 1, \"cum must be a pandas Series\"\nassert [str(i) for i in cum.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], \"Index: 2024-01 … 2024-06\"\nassert [float(v) for v in cum.values] == [31950.0, 98600.0, 188250.0, 254250.0, 302950.0, 334850.0], f\"Running total: 31,950, 98,600, …, 334,850; got {list(cum.values)}\""
    }
   },
   {
    "title": "A day-of-week heatmap",
    "prompt": "<p>A wide table for <code>sns.heatmap</code>: store the number of clean orders in the DataFrame <code>heat</code>: rows are cities (<code>city</code>), columns are days of the week <code>0</code>–<code>6</code> (<code>pd.to_datetime(...).dt.dayofweek</code>, 0 is Monday), values are order counts. A cell with no orders must be 0 (not NaN).</p>",
    "hints": [
     "<code>m['dow'] = pd.to_datetime(m['order_date']).dt.dayofweek</code>",
     "<code>m.pivot_table(index='city', columns='dow', values='id', aggfunc='count', fill_value=0)</code>"
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\n_cu = _pd.read_csv('customers.csv').rename(columns={'id': 'customer_id'})\n_m = _cl.merge(_cu, on='customer_id')\n_m = _m.assign(dow=_pd.to_datetime(_m['order_date']).dt.dayofweek)\nassert 'heat' in globals() and getattr(heat, 'ndim', 0) == 2, \"heat must be a DataFrame\"\nassert sorted(heat.index) == sorted(_m['city'].unique()) and sorted(int(c) for c in heat.columns) == sorted(_m['dow'].unique().tolist()), \"Rows must be cities and columns days of the week\"\nassert not heat.isna().any().any(), \"An empty cell must be 0, not NaN: fill_value=0\"\nassert int(heat.values.sum()) == 139, f\"All cells should add up to 139 orders, got {int(heat.values.sum())}\"\nassert all(int(heat.loc[c, d]) == int(((_m['city'] == c) & (_m['dow'] == d)).sum()) for c in heat.index for d in heat.columns), \"Values must be order counts (aggfunc='count')\""
    }
   },
   {
    "title": "Top five and \"other\"",
    "prompt": "<p>Forty bars cannot be read. From the clean orders, keep the 5 biggest-spending customers and collapse the rest into one row: the index of the Series <code>top</code> is the customer number as text (<code>'33'</code>), the last row is <code>'other'</code>; values are amounts. The top five go by amount descending, ties broken by the smaller <code>customer_id</code>.</p>",
    "hints": [
     "Each customer's sum, then <code>sort_values(['amount', 'customer_id'], ascending=[False, True])</code>.",
     "The top five: <code>.head(5)</code>; the rest: the sum of <code>.iloc[5:]</code>. Turn the index into text with <code>astype(str)</code>."
    ],
    "check": {
     "tests": "import pandas as _pd\n_df = _pd.read_csv('orders.csv')\n_cl = _df[(_df['status'] == 'paid') & _df['amount'].notna() & (_df['amount'] < 20000)]\n_p = _cl.groupby('customer_id')['amount'].sum().reset_index().sort_values(['amount', 'customer_id'], ascending=[False, True])\nassert 'top' in globals() and getattr(top, 'ndim', 0) == 1 and len(top) == 6, \"top must be a 6-row Series (5 customers + other)\"\nassert [str(i) for i in top.index] == [str(x) for x in _p['customer_id'].head(5)] + ['other'], f\"Index: {[str(x) for x in _p['customer_id'].head(5)] + ['other']}, got {list(top.index)}\"\nassert [float(v) for v in top.values[:5]] == [float(x) for x in _p['amount'].head(5)], \"The top-five amounts are wrong\"\nassert float(top.sum()) == 334850.0, \"All rows must add up to total revenue (334,850)\""
    }
   }
  ]
 }
} });
