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
 }
} });
