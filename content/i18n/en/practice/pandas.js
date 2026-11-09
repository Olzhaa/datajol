// pandas practice tasks: English text. Code, solutions and checks are in content/practice/pandas.js.
DJ.i18n.patch({
 "lessons": {
  "pd-1": {
   "pr": [
    {
     "title": "City temperatures",
     "prompt": "<p>Create a DataFrame <code>weather</code>: the column <code>city</code> with the values <code>['Алматы', 'Астана', 'Атырау', 'Өскемен']</code>, and the column <code>temp</code> with the values <code>[18, 9, 24, 12]</code>. Then run <code>print(weather)</code>.</p>",
     "hints": [
      "<code>pd.DataFrame({'city': [...], 'temp': [...]})</code>"
     ],
     "check": {
      "tests": "assert isinstance(weather, pd.DataFrame), 'weather must be a DataFrame'\nassert list(weather.columns) == ['city', 'temp'], 'Columns: city, temp'\nassert weather['city'].tolist() == ['Алматы', 'Астана', 'Атырау', 'Өскемен'], 'the values of city are wrong'\nassert weather['temp'].tolist() == [18, 9, 24, 12], 'the values of temp must be [18, 9, 24, 12]'"
     }
    },
    {
     "title": "Number of customers",
     "prompt": "<p>Read the file <code>customers.csv</code> into the variable <code>customers</code>, and store the number of customers in <code>n_customers</code> using <code>len()</code>.</p>",
     "hints": [
      "<code>pd.read_csv('customers.csv')</code>",
      "<code>len(customers)</code>"
     ],
     "check": {
      "tests": "assert n_customers == 40, 'The number of customers is wrong: use len(customers)'"
     }
    },
    {
     "title": "Column names",
     "prompt": "<p>Read the file <code>orders.csv</code> and store the column names in the list <code>cols</code> using <code>list(orders.columns)</code>.</p>",
     "hints": [
      "<code>list(orders.columns)</code>"
     ],
     "check": {
      "tests": "assert cols == ['id', 'customer_id', 'order_date', 'amount', 'status'], 'cols is wrong:' + str(cols)"
     }
    },
    {
     "title": "First three orders",
     "prompt": "<p>Store the first 3 rows of the table <code>orders</code> in the variable <code>first3</code>, and print them.</p>",
     "hints": [
      "<code>orders.head(3)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert len(first3) == 3, 'first3 must contain 3 rows'\nassert first3['id'].tolist() == _o['id'].head(3).tolist(), 'The first 3 rows are needed'"
     }
    },
    {
     "title": "Size of the daily table",
     "prompt": "<p>Read the file <code>daily_sales.csv</code> into the variable <code>daily</code>. Store the number of rows in <code>n_rows</code> and the number of columns in <code>n_cols</code>, using <code>shape</code>.</p>",
     "hints": [
      "<code>daily.shape</code> gives (rows, columns)."
     ],
     "check": {
      "tests": "assert n_rows == 20, 'n_rows is wrong: daily.shape[0]'\nassert n_cols == 3, 'n_cols is wrong: daily.shape[1]'"
     }
    },
    {
     "title": "Maximum from describe",
     "prompt": "<p>Store the result of <code>orders.describe()</code> in the variable <code>stats</code>. Then take the largest value of the column <code>amount</code> from it and store it in <code>max_amount</code>: <code>stats['amount']['max']</code>.</p>",
     "hints": [
      "<code>describe()</code> also returns a DataFrame: its rows are named count, mean, ..., max."
     ],
     "check": {
      "tests": "assert isinstance(stats, pd.DataFrame), 'stats must be equal to orders.describe()'\nassert float(max_amount) == 48000, 'max_amount must be 48000'"
     }
    },
    {
     "title": "Orders per customer",
     "prompt": "<p>Read the files <code>orders.csv</code> and <code>customers.csv</code>, and calculate the average number of orders per customer (number of orders / number of customers). Round it to 2 decimal places and store it in the variable <code>per_customer</code>.</p>",
     "hints": [
      "Read both files and divide the <code>len()</code> values.",
      "<code>round(..., 2)</code>"
     ],
     "check": {
      "tests": "assert per_customer == 3.75, 'per_customer must be 3.75: len(orders) / len(customers)'"
     }
    },
    {
     "title": "Table from a list of dictionaries",
     "prompt": "<p>Schools are given as a list of dictionaries (each dictionary is one row). Create the DataFrame <code>schools</code> from them, then store the number of rows and columns in the variable <code>size</code>, using <code>shape</code>.</p>",
     "hints": [
      "<code>pd.DataFrame(records)</code>: the dictionary keys become the column names."
     ],
     "check": {
      "tests": "assert isinstance(schools, pd.DataFrame), 'schools must be a DataFrame'\nassert list(schools.columns) == ['school', 'city', 'students'], 'Columns: school, city, students'\nassert tuple(size) == (3, 3), 'size must be (3, 3)'\nassert schools['students'].tolist() == [940, 1210, 720], 'the values of students are wrong'"
     }
    }
   ]
  },
  "pd-2": {
   "pr": [
    {
     "title": "Amount column",
     "prompt": "<p>Take the column <code>amount</code> from <code>orders</code> as a Series and store it in the variable <code>amounts</code>.</p>",
     "hints": [
      "<code>orders['amount']</code>"
     ],
     "check": {
      "tests": "assert isinstance(amounts, pd.Series), 'amounts must be a Series: use one pair of square brackets'\nassert len(amounts) == 150 and amounts.name == 'amount', 'all 150 values of the amount column are needed'"
     }
    },
    {
     "title": "Refunded orders",
     "prompt": "<p>Store only the refunded orders (<code>status == 'refund'</code>) in the variable <code>refunds</code>.</p>",
     "hints": [
      "<code>orders[orders['status'] == 'refund']</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert sorted(refunds['id']) == sorted(_o[_o['status'] == 'refund']['id']), 'refunds must contain only refund orders'"
     }
    },
    {
     "title": "Rows without an amount",
     "prompt": "<p>Store the rows where <code>amount</code> is empty (NaN) in the variable <code>missing</code>.</p>",
     "hints": [
      "<code>orders['amount'].isna()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert sorted(missing['id']) == sorted(_o[_o['amount'].isna()]['id']), 'missing must contain only rows where amount is empty'"
     }
    },
    {
     "title": "Selected customers",
     "prompt": "<p>Store the orders of customers 3, 5 and 7 in the variable <code>sel</code> using <code>isin</code>. Only the columns <code>customer_id</code>, <code>order_date</code> and <code>amount</code> should remain.</p>",
     "hints": [
      "<code>orders['customer_id'].isin([3, 5, 7])</code>",
      "At the end use <code>[['customer_id', 'order_date', 'amount']]</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_s = _o[_o['customer_id'].isin([3, 5, 7])]\nassert list(sel.columns) == ['customer_id', 'order_date', 'amount'], 'Columns: customer_id, order_date, amount'\nassert len(sel) == len(_s) and sorted(sel['customer_id']) == sorted(_s['customer_id']), 'All orders of customers 3, 5 and 7 only are needed'"
     }
    },
    {
     "title": "First row after a filter",
     "prompt": "<p>Store the orders with an amount greater than 3000 in the variable <code>big</code>. Then use <code>iloc</code> to take the order number (<code>id</code>) from the first row of <code>big</code> and store it in the variable <code>first_id</code>.</p>",
     "hints": [
      "After filtering the index does not start at 0: use <code>big.iloc[0]</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_b = _o[_o['amount'] > 3000]\nassert len(big) == len(_b), 'big must contain rows where amount > 3000'\nassert int(first_id) == int(_b['id'].iloc[0]), 'first_id is wrong: big.iloc[0][\"id\"]'"
     }
    },
    {
     "title": "Small or refunded",
     "prompt": "<p>Store the orders whose amount is less than 1000 <b>or</b> whose status is <code>refund</code> in the variable <code>odd</code> (use the <code>|</code> operator).</p>",
     "hints": [
      "Put each condition in brackets and place <code>|</code> between them."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_x = _o[(_o['amount'] < 1000) | (_o['status'] == 'refund')]\nassert sorted(odd['id']) == sorted(_x['id']), 'odd is wrong: combine the two conditions with |'"
     }
    },
    {
     "title": "Large orders in March",
     "prompt": "<p>Store in the variable <code>march_big</code> the orders from March 2024 (<code>order_date</code> between <code>'2024-03-01'</code> and <code>'2024-03-31'</code>, both included) that are paid and have an amount greater than 2500. Only the columns <code>id</code> and <code>amount</code> should remain, and the index should start at 0 (<code>reset_index(drop=True)</code>).</p>",
     "hints": [
      "Date strings can be compared: <code>orders['order_date'] &gt;= '2024-03-01'</code>.",
      "Combine the four conditions with <code>&amp;</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = _o[(_o['order_date'] >= '2024-03-01') & (_o['order_date'] <= '2024-03-31') & (_o['status'] == 'paid') & (_o['amount'] > 2500)]\nassert list(march_big.columns) == ['id', 'amount'], 'Columns: id, amount'\nassert march_big['id'].tolist() == _m['id'].tolist(), 'The rows are wrong: check the four conditions'\nassert list(march_big.index) == list(range(len(_m))), 'The index must start at 0: reset_index(drop=True)'"
     }
    },
    {
     "title": "Large receipts of the first customers",
     "prompt": "<p>Use the <code>query</code> method to store the paid orders of customers 1–5 (<code>customer_id &lt;= 5</code>) with an amount of 2000 or more in the variable <code>vip</code>. Then add the column <code>with_vat</code> to it: <code>amount * 1.12</code>.</p>",
     "hints": [
      "<code>orders.query(\"customer_id &lt;= 5 and status == 'paid' and amount &gt;= 2000\")</code>",
      "Write <code>.copy()</code> before adding a column."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_v = _o[(_o['customer_id'] <= 5) & (_o['status'] == 'paid') & (_o['amount'] >= 2000)]\nassert sorted(vip['id']) == sorted(_v['id']), 'the rows of vip are wrong'\nassert 'with_vat' in vip.columns, 'there is no with_vat column'\nassert ((vip['with_vat'] - vip['amount'] * 1.12).abs() < 0.01).all(), 'with_vat = amount * 1.12'"
     }
    }
   ]
  },
  "pd-3": {
   "pr": [
    {
     "title": "Amount in thousands of tenge",
     "prompt": "<p>Add the column <code>amount_k</code> to <code>orders</code>: <code>amount</code> divided by 1000.</p>",
     "hints": [
      "<code>orders['amount'] / 1000</code>"
     ],
     "check": {
      "tests": "assert 'amount_k' in orders.columns, 'there is no amount_k column'\nassert ((orders['amount_k'] - orders['amount'] / 1000).abs() < 1e-9).sum() == orders['amount'].notna().sum(), 'amount_k = amount / 1000'"
     }
    },
    {
     "title": "Three cheapest orders",
     "prompt": "<p>Store the 3 orders with the smallest amounts in the variable <code>cheap3</code>, sorted in ascending order.</p>",
     "hints": [
      "<code>sort_values('amount')</code> sorts in ascending order by default."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_t = _o.sort_values('amount').head(3)\nassert len(cheap3) == 3, 'cheap3 must contain 3 rows'\nassert cheap3['amount'].tolist() == _t['amount'].tolist(), 'The 3 smallest amounts are needed in ascending order'"
     }
    },
    {
     "title": "Renaming a column",
     "prompt": "<p>Rename the column <code>amount</code> to <code>sum_kzt</code> and store the result in the variable <code>renamed</code>.</p>",
     "hints": [
      "<code>orders.rename(columns={'amount': 'sum_kzt'})</code>"
     ],
     "check": {
      "tests": "assert 'sum_kzt' in renamed.columns and 'amount' not in renamed.columns, 'The name amount must become sum_kzt'\nassert len(renamed) == 150, 'The number of rows must not change'"
     }
    },
    {
     "title": "Month number",
     "prompt": "<p>Add the column <code>mon</code> to <code>orders</code>: characters 6 and 7 of <code>order_date</code>, that is, the month number (for example <code>'2024-03-05'</code> → <code>'03'</code>).</p>",
     "hints": [
      "<code>orders['order_date'].str[5:7]</code>"
     ],
     "check": {
      "tests": "assert 'mon' in orders.columns, 'there is no mon column'\nassert orders['mon'].tolist() == [d[5:7] for d in orders['order_date']], 'mon = the slice 5:7 of order_date'"
     }
    },
    {
     "title": "Amount level",
     "prompt": "<p>Use <code>apply</code> and <code>lambda</code> to add the column <code>level</code>: if the amount is 2500 or more, the value is <code>'жоғары'</code>, otherwise <code>'төмен'</code>.</p>",
     "hints": [
      "<code>orders['amount'].apply(lambda x: 'жоғары' if x &gt;= 2500 else 'төмен')</code>"
     ],
     "check": {
      "tests": "assert 'level' in orders.columns, 'there is no level column'\nassert orders['level'].tolist() == ['жоғары' if x >= 2500 else 'төмен' for x in orders['amount']], 'the values of level are wrong: the boundary 2500 belongs to the high level'"
     }
    },
    {
     "title": "Sorting by two columns",
     "prompt": "<p>Sort <code>orders</code> first by <code>status</code>, then by <code>amount</code> (both in ascending order), and store the result in the variable <code>res</code>.</p>",
     "hints": [
      "<code>orders.sort_values(['status', 'amount'])</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_r = _o.sort_values(['status', 'amount'])\nassert res['id'].tolist() == _r['id'].tolist(), 'The order is wrong: first status, then amount'"
     }
    },
    {
     "title": "February top three",
     "prompt": "<p>Among the paid orders, find the 3 orders with the largest amounts in February 2024 (<code>month == '2024-02'</code>, <code>order_date.str[:7]</code>) and store them in the variable <code>feb_top</code> in descending order. Only the columns <code>id</code> and <code>amount</code> should remain.</p>",
     "hints": [
      "Filter first and add the column <code>month</code>.",
      "Then <code>sort_values('amount', ascending=False).head(3)</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[(_o['status'] == 'paid') & (_o['order_date'].str[:7] == '2024-02')].sort_values('amount', ascending=False).head(3)\nassert list(feb_top.columns) == ['id', 'amount'], 'Columns: id, amount'\nassert feb_top['amount'].tolist() == _p['amount'].tolist(), 'The 3 largest February amounts are needed in descending order'"
     }
    },
    {
     "title": "Report table",
     "prompt": "<p>Create the table <code>report</code> from the paid orders: add the column <code>month</code> (the first 7 characters of <code>order_date</code>), drop the column <code>status</code>, rename <code>amount</code> to <code>revenue</code>, sort by <code>revenue</code> in descending order, and keep the first 10 rows.</p>",
     "hints": [
      "<code>drop(columns=['status'])</code>, <code>rename(columns={'amount': 'revenue'})</code>",
      "At the end, <code>sort_values('revenue', ascending=False).head(10)</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_r = _o[_o['status'] == 'paid'].sort_values('amount', ascending=False).head(10)\nassert 'status' not in report.columns, 'the status column must be dropped'\nassert 'revenue' in report.columns and 'amount' not in report.columns, 'amount must be renamed to revenue'\nassert 'month' in report.columns and (report['month'] == report['order_date'].str[:7]).all(), 'month = the first 7 characters of order_date'\nassert report['revenue'].tolist() == _r['amount'].tolist(), 'The 10 largest paid orders in descending order are needed'"
     }
    }
   ]
  },
  "pd-4": {
   "pr": [
    {
     "title": "Count by status",
     "prompt": "<p>Store the number of orders in each status in the Series <code>by_status</code> using <code>groupby</code> (count the column <code>id</code>).</p>",
     "hints": [
      "<code>orders.groupby('status')['id'].count()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o.groupby('status')['id'].count()\nassert list(by_status.index) == list(_g.index), 'The index must be the statuses'\nassert by_status.tolist() == _g.tolist(), 'The numbers are wrong'"
     }
    },
    {
     "title": "Total amount per customer",
     "prompt": "<p>Store the sum of all orders of each customer (<code>customer_id</code>) in the Series <code>by_cust</code>.</p>",
     "hints": [
      "<code>orders.groupby('customer_id')['amount'].sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o.groupby('customer_id')['amount'].sum()\nassert len(by_cust) == len(_g), 'One row per customer is needed'\nassert [round(float(v)) for v in by_cust.values] == [round(float(v)) for v in _g.values], 'The sums do not match'"
     }
    },
    {
     "title": "Total revenue by region",
     "prompt": "<p>Read the file <code>daily_sales.csv</code> into the variable <code>daily</code>, and store the total revenue of each region (<code>region</code>), that is the sum of <code>revenue</code>, in the Series <code>total_by_region</code>.</p>",
     "hints": [
      "<code>daily.groupby('region')['revenue'].sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_g = _d.groupby('region')['revenue'].sum()\nassert list(total_by_region.index) == list(_g.index), 'The index must be the regions'\nassert total_by_region.tolist() == _g.tolist(), 'The sums do not match'"
     }
    },
    {
     "title": "Monthly average check",
     "prompt": "<p>Using the paid orders, calculate the average check for each month (the mean of <code>amount</code>), round it to a whole number, and store it in the Series <code>avg_month</code>. The index is the month (the first 7 characters of <code>order_date</code>).</p>",
     "hints": [
      "First filter <code>paid</code> and add the column <code>month</code>.",
      "<code>.groupby('month')['amount'].mean().round()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid']\n_m = _p.groupby(_p['order_date'].str[:7])['amount'].mean().round()\nassert [str(i) for i in avg_month.index] == list(_m.index), 'The index must be the months'\nassert [round(float(v)) for v in avg_month.values] == [round(float(v)) for v in _m.values], 'The average values do not match: only paid orders count'"
     }
    },
    {
     "title": "Unique customers per month",
     "prompt": "<p>Store in the Series <code>active</code> how many different customers placed an order in each month (<code>nunique</code>). The index is the month (the first 7 characters of <code>order_date</code>), all orders are counted.</p>",
     "hints": [
      "<code>.groupby('month')['customer_id'].nunique()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_a = _o.groupby(_o['order_date'].str[:7])['customer_id'].nunique()\nassert [str(i) for i in active.index] == list(_a.index), 'The index must be the months'\nassert active.tolist() == _a.tolist(), 'The number of unique customers is wrong: use nunique'"
     }
    },
    {
     "title": "Big customers (HAVING)",
     "prompt": "<p>Using the paid orders, calculate the revenue (<code>revenue</code>) of each customer, and store only the customers whose revenue is greater than 10 000 in the DataFrame <code>big_clients</code>. Columns: <code>customer_id</code>, <code>revenue</code>.</p>",
     "hints": [
      "<code>.agg(revenue=('amount', 'sum')).reset_index()</code>",
      "Then filter after the aggregation: <code>res[res['revenue'] &gt; 10000]</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o[_o['status'] == 'paid'].groupby('customer_id')['amount'].sum()\n_g = _g[_g > 10000]\nassert 'customer_id' in big_clients.columns and 'revenue' in big_clients.columns, 'Columns: customer_id, revenue (reset_index is needed)'\nassert sorted(big_clients['customer_id']) == sorted(_g.index), 'The customer list is wrong: only paid, revenue > 10000'"
     }
    },
    {
     "title": "First and last order",
     "prompt": "<p>For each customer use <code>agg</code> to calculate <code>first</code> (the earliest <code>order_date</code>), <code>last</code> (the latest <code>order_date</code>) and <code>orders</code> (the number of orders), and create the DataFrame <code>life</code>. <code>customer_id</code> must be a regular column. Sort by <code>orders</code> in descending order, and if they are equal, by <code>customer_id</code> in ascending order.</p>",
     "hints": [
      "<code>first=('order_date', 'min')</code>: date strings are compared too.",
      "Sorting: <code>sort_values(['orders', 'customer_id'], ascending=[False, True])</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_l = _o.groupby('customer_id').agg(first=('order_date', 'min'), last=('order_date', 'max'), orders=('id', 'count')).reset_index().sort_values(['orders', 'customer_id'], ascending=[False, True])\nassert {'customer_id', 'first', 'last', 'orders'} <= set(life.columns), 'Columns: customer_id, first, last, orders'\nassert life['customer_id'].tolist() == _l['customer_id'].tolist(), 'The order of the customers is wrong'\nassert life['first'].tolist() == _l['first'].tolist() and life['last'].tolist() == _l['last'].tolist(), 'The first/last dates are wrong'"
     }
    },
    {
     "title": "Monthly metrics",
     "prompt": "<p>Using the paid orders, for each month calculate <code>orders</code> (count), <code>customers</code> (unique customers) and <code>revenue</code> (sum), and create the DataFrame <code>monthly</code>. Then add the column <code>avg_check</code>: <code>revenue / orders</code>, rounded to a whole number. <code>month</code> must be a regular column, and the months are in ascending order.</p>",
     "hints": [
      "<code>.agg(orders=('id', 'count'), customers=('customer_id', 'nunique'), revenue=('amount', 'sum'))</code>",
      "A new column is added after the aggregation."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid'].copy()\n_p['month'] = _p['order_date'].str[:7]\n_m = _p.groupby('month').agg(orders=('id', 'count'), customers=('customer_id', 'nunique'), revenue=('amount', 'sum')).reset_index()\nassert {'month', 'orders', 'customers', 'revenue', 'avg_check'} <= set(monthly.columns), 'Columns: month, orders, customers, revenue, avg_check'\nassert [str(m) for m in monthly['month']] == _m['month'].tolist(), 'The months must be in ascending order'\nassert monthly['orders'].tolist() == _m['orders'].tolist(), 'orders: the id column must be counted'\nassert monthly['customers'].tolist() == _m['customers'].tolist(), 'customers: use nunique'\nassert [round(float(a)) for a in monthly['avg_check']] == [round(r / n) for r, n in zip(_m['revenue'], _m['orders'])], 'avg_check = revenue / orders'"
     }
    }
   ]
  },
  "pd-5": {
   "pr": [
    {
     "title": "Table without empty amounts",
     "prompt": "<p>Remove the rows where <code>amount</code> is empty with <code>dropna</code> and store the result in the variable <code>no_null</code>.</p>",
     "hints": [
      "<code>orders.dropna(subset=['amount'])</code>"
     ],
     "check": {
      "tests": "assert len(no_null) == 144, 'no_null must contain 144 rows'\nassert no_null['amount'].isna().sum() == 0, 'Empty values are still there'"
     }
    },
    {
     "title": "Empty values per column",
     "prompt": "<p>Store the number of empty values in each column in the Series <code>nulls</code>.</p>",
     "hints": [
      "<code>orders.isna().sum()</code>"
     ],
     "check": {
      "tests": "assert isinstance(nulls, pd.Series), 'nulls must be a Series'\nassert int(nulls['amount']) == 6 and int(nulls['id']) == 0, 'nulls is wrong: orders.isna().sum()'"
     }
    },
    {
     "title": "Repeated visits",
     "prompt": "<p>The school visit log contains repeated rows. Remove the duplicates with <code>drop_duplicates</code> and store the result in the variable <code>uniq</code>.</p>",
     "hints": [
      "<code>visits.drop_duplicates()</code>"
     ],
     "check": {
      "tests": "assert len(uniq) == 5, 'uniq must contain 5 rows'\nassert not uniq.duplicated().any(), 'Duplicate rows are still there'"
     }
    },
    {
     "title": "Filling with the median",
     "prompt": "<p>Fill the empty values in the column <code>amount</code> with the median of this column and store the result in the Series <code>filled</code>.</p>",
     "hints": [
      "<code>orders['amount'].median()</code>",
      "<code>.fillna(...)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_f = _o['amount'].fillna(_o['amount'].median())\nassert len(filled) == 150 and filled.isna().sum() == 0, 'filled must not contain empty values'\nassert abs(float(filled.sum()) - float(_f.sum())) < 0.01, 'The empty places must be filled with the median'"
     }
    },
    {
     "title": "Cleaning city names",
     "prompt": "<p>Clean the column <code>city</code> in the table <code>shops</code>: remove the spaces and capitalize each word (<code>.str.strip().str.title()</code>). Then store in <code>n_cities</code> how many different cities there are.</p>",
     "hints": [
      "<code>shops['city'].str.strip().str.title()</code>",
      "<code>shops['city'].nunique()</code>"
     ],
     "check": {
      "tests": "assert shops['city'].tolist() == ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Астана', 'Алматы'], 'the city column is not cleaned:' + str(shops['city'].tolist())\nassert n_cities == 3, 'n_cities must be 3'"
     }
    },
    {
     "title": "Outlier amounts",
     "prompt": "<p>Using the IQR method, store the upper bound of <code>amount</code> (<code>q3 + 1.5 * iqr</code>) in the variable <code>upper</code>. Store in <code>n_out</code> the number of orders whose amount is above this bound.</p>",
     "hints": [
      "<code>q1, q3 = orders['amount'].quantile([0.25, 0.75])</code>",
      "<code>(orders['amount'] &gt; upper).sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_q1, _q3 = _o['amount'].quantile([0.25, 0.75])\n_u = _q3 + 1.5 * (_q3 - _q1)\nassert abs(float(upper) - float(_u)) < 0.01, 'upper is wrong: q3 + 1.5 * (q3 - q1)'\nassert int(n_out) == int((_o['amount'] > _u).sum()), 'n_out is wrong'"
     }
    },
    {
     "title": "Cleaning chain",
     "prompt": "<p>Use method chaining to create the table <code>clean</code>: remove duplicates, drop the rows with an empty <code>amount</code>, then use <code>query</code> to keep only the paid orders with an amount from 1000 to 20 000 (both included). Store the number of removed rows in the variable <code>removed</code>.</p>",
     "hints": [
      "The chain: <code>.drop_duplicates().dropna(subset=[...]).query(...)</code>",
      "<code>removed = len(orders) - len(clean)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _o.drop_duplicates().dropna(subset=['amount'])\n_k = _k[(_k['status'] == 'paid') & (_k['amount'] >= 1000) & (_k['amount'] <= 20000)]\nassert sorted(clean['id']) == sorted(_k['id']), 'the rows of clean are wrong: check the conditions'\nassert removed == len(_o) - len(_k), 'removed = len(orders) - len(clean)'"
     }
    },
    {
     "title": "Clean up, then sum by city",
     "prompt": "<p>The table <code>sales</code> is messy: city names are written in different ways, one amount is empty, and one row is duplicated. First clean the column <code>city</code> with <code>.str.strip().str.title()</code>, then remove the duplicates and the empty amounts. Finally, store the sum for each city in the Series <code>by_city</code>.</p>",
     "hints": [
      "Clean the city names first: only then will the duplicate rows become identical.",
      "<code>.groupby('city')['amount'].sum()</code>"
     ],
     "check": {
      "tests": "assert sorted(by_city.index) == sorted(['Алматы', 'Астана', 'Шымкент']), 'Cities: Алматы, Астана, Шымкент'\nassert {k: round(float(v)) for k, v in by_city.items()} == {'Алматы': 7000, 'Астана': 7500, 'Шымкент': 2700}, 'The sums are wrong:' + str(by_city.to_dict())"
     }
    }
   ]
  },
  "pd-6": {
   "pr": [
    {
     "title": "Add the city to an order",
     "prompt": "<p>Merge <code>orders</code> and <code>customers</code> on <code>customer_id</code> = <code>id</code> and store the result in the variable <code>df</code>. Use <code>suffixes=('_order', '_customer')</code>.</p>",
     "hints": [
      "<code>orders.merge(customers, left_on='customer_id', right_on='id', suffixes=('_order', '_customer'))</code>"
     ],
     "check": {
      "tests": "assert len(df) == 150, 'After the merge there must be 150 rows'\nassert {'city', 'channel', 'id_order', 'id_customer'} <= set(df.columns), 'The columns city, channel, id_order, id_customer are needed: check suffixes'"
     }
    },
    {
     "title": "Merging on a shared key",
     "prompt": "<p>The tables <code>results</code> and <code>schools</code> have a shared column <code>school_id</code>. Merge them on <code>on='school_id'</code> and store the result in the variable <code>df</code>.</p>",
     "hints": [
      "<code>results.merge(schools, on='school_id')</code>"
     ],
     "check": {
      "tests": "assert len(df) == 6, 'df must contain 6 rows'\nassert 'name' in df.columns and 'score' in df.columns, 'The columns name and score are needed'\nassert df[df['name'] == 'НЗМ']['score'].tolist() == [131, 118, 125], 'The NZM results are wrong'"
     }
    },
    {
     "title": "Difference between inner and left",
     "prompt": "<p>The table <code>trips</code> has a driver who is not in <code>drivers</code>. Store in <code>n_inner</code> the number of rows of the merge on <code>driver_id</code> with <code>how='inner'</code>, and in <code>n_left</code> the number of rows with <code>how='left'</code> (the table <code>trips</code> is on the left).</p>",
     "hints": [
      "<code>len(trips.merge(drivers, on='driver_id', how='inner'))</code>"
     ],
     "check": {
      "tests": "assert n_inner == 4, 'n_inner must be 4: driver 14 is not in drivers'\nassert n_left == 5, 'n_left must be 5: left keeps all trips'"
     }
    },
    {
     "title": "Revenue by city",
     "prompt": "<p>Merge the clean orders (<code>clean</code> is ready) with the customers and store the revenue of each city in descending order in the Series <code>by_city</code>.</p>",
     "hints": [
      "<code>clean.merge(customers, left_on='customer_id', right_on='id')</code>",
      "<code>.groupby('city')['amount'].sum().sort_values(ascending=False)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('city')['amount'].sum().sort_values(ascending=False)\nassert list(by_city.index) == list(_m.index), 'The order of the cities is wrong: descending'\nassert [round(float(v)) for v in by_city.values] == [round(float(v)) for v in _m.values], 'The sums do not match'"
     }
    },
    {
     "title": "Who did not order in March",
     "prompt": "<p>Store in the variable <code>absent</code> the list of <code>id</code> values of customers who did not place a single order in March 2024 (<code>order_date</code> starts with <code>'2024-03'</code>), in ascending order. Hint: merge the customers with the March orders using <code>how='left'</code> and take the rows without an order (<code>isna</code>).</p>",
     "hints": [
      "Filter the March orders first.",
      "After the merge use <code>df[df['id_order'].isna()]</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = set(_o[_o['order_date'].str[:7] == '2024-03']['customer_id'])\n_a = sorted(i for i in _c['id'] if i not in _m)\nassert [int(x) for x in absent] == _a, 'the list absent is wrong:' + str(list(absent))"
     }
    },
    {
     "title": "Unique customers by channel",
     "prompt": "<p>Merge the clean orders with the customers and store in the Series <code>buyers</code> how many different customers bought through each channel (<code>channel</code>).</p>",
     "hints": [
      "<code>.groupby('channel')['customer_id'].nunique()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_b = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel')['customer_id'].nunique()\nassert sorted(buyers.index) == sorted(_b.index), 'The index must be the channels'\nassert {k: int(v) for k, v in buyers.items()} == {k: int(v) for k, v in _b.items()}, 'The number of unique customers is wrong: nunique'"
     }
    },
    {
     "title": "Revenue share of channels",
     "prompt": "<p>Merge the clean orders with the customers and for each channel calculate <code>orders</code> (count) and <code>revenue</code> (sum). Add the column <code>share</code>: the share of the channel's revenue in the total revenue, as a percentage, with 1 decimal place. The result is the DataFrame <code>by_channel</code>, with <code>channel</code> as a regular column, sorted by <code>revenue</code> in descending order.</p>",
     "hints": [
      "<code>.agg(orders=('amount', 'count'), revenue=('amount', 'sum')).reset_index()</code>",
      "<code>by_channel['revenue'] / by_channel['revenue'].sum() * 100</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel').agg(orders=('amount', 'count'), revenue=('amount', 'sum')).reset_index().sort_values('revenue', ascending=False)\nassert {'channel', 'orders', 'revenue', 'share'} <= set(by_channel.columns), 'Columns: channel, orders, revenue, share'\nassert by_channel['channel'].tolist() == _g['channel'].tolist(), 'The order of the channels is wrong'\nassert by_channel['orders'].tolist() == _g['orders'].tolist(), 'orders is wrong'\nassert [round(float(s), 1) for s in by_channel['share']] == [round(r / _g['revenue'].sum() * 100, 1) for r in _g['revenue']], 'share = revenue / total revenue * 100'"
     }
    },
    {
     "title": "Revenue by sign-up month",
     "prompt": "<p>Add the column <code>signup_month</code> to the customers (the first 7 characters of <code>signup_date</code>). Merge the clean orders with the customers and store the revenue by the month the customer signed up in the Series <code>by_signup</code> (the index is the month, in ascending order).</p>",
     "hints": [
      "<code>customers['signup_date'].str[:7]</code>",
      "<code>.groupby('signup_month')['amount'].sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _c.copy()\n_k['signup_month'] = _k['signup_date'].str[:7]\n_g = _clean.merge(_k, left_on='customer_id', right_on='id').groupby('signup_month')['amount'].sum()\nassert [str(i) for i in by_signup.index] == list(_g.index), 'The index must be the sign-up months'\nassert [round(float(v)) for v in by_signup.values] == [round(float(v)) for v in _g.values], 'The sums do not match'"
     }
    }
   ]
  },
  "pd-7": {
   "pr": [
    {
     "title": "From text to date",
     "prompt": "<p>Convert the column <code>order_date</code> to a date type using <code>pd.to_datetime</code> (write the result back to the same column).</p>",
     "hints": [
      "<code>orders['order_date'] = pd.to_datetime(orders['order_date'])</code>"
     ],
     "check": {
      "tests": "assert str(orders['order_date'].dtype).startswith('datetime64'), 'order_date must have a date type (datetime64)'\nassert str(orders['order_date'].min())[:10] == '2024-01-01', 'The dates were not converted correctly'"
     }
    },
    {
     "title": "Day of the week",
     "prompt": "<p>Convert <code>order_date</code> to a date and add the column <code>weekday</code>: the name of the day of the week (<code>.dt.day_name()</code>, for example <code>'Tuesday'</code>).</p>",
     "hints": [
      "First <code>pd.to_datetime</code>, then <code>.dt.day_name()</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_w = _pd.to_datetime(_o['order_date']).dt.day_name()\nassert 'weekday' in orders.columns, 'there is no weekday column'\nassert orders['weekday'].tolist() == _w.tolist(), 'the values of weekday are wrong'"
     }
    },
    {
     "title": "Record day per region",
     "prompt": "<p>Read the file <code>daily_sales.csv</code> into the variable <code>daily</code> and store the highest daily revenue of each region in the Series <code>best_by_region</code>.</p>",
     "hints": [
      "<code>daily.groupby('region')['revenue'].max()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_g = _d.groupby('region')['revenue'].max()\nassert list(best_by_region.index) == list(_g.index), 'The index must be the regions'\nassert best_by_region.tolist() == _g.tolist(), 'The maximum values do not match'"
     }
    },
    {
     "title": "By day of the week",
     "prompt": "<p>Using the paid orders, store in the Series <code>by_wd</code> the number of orders for each day of the week (the index is the names from <code>.dt.day_name()</code>).</p>",
     "hints": [
      "After the filter use <code>.copy()</code>, then add the column <code>weekday</code>.",
      "<code>.groupby('weekday')['id'].count()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid']\n_g = _p.groupby(_pd.to_datetime(_p['order_date']).dt.day_name())['id'].count()\nassert {str(k): int(v) for k, v in by_wd.items()} == {k: int(v) for k, v in _g.items()}, 'The numbers by day of the week are wrong: only paid orders'"
     }
    },
    {
     "title": "Month and status table",
     "prompt": "<p>Use <code>pivot_table</code> to create the table <code>pt</code>: the rows are the month (<code>month</code>, the first 7 characters of <code>order_date</code>), the columns are <code>status</code>, the values are the number of orders (<code>values='id'</code>, <code>aggfunc='count'</code>), and empty places are 0.</p>",
     "hints": [
      "<code>pd.pivot_table(orders, index='month', columns='status', values='id', aggfunc='count', fill_value=0)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _o.copy()\n_k['month'] = _k['order_date'].str[:7]\n_p = _pd.pivot_table(_k, index='month', columns='status', values='id', aggfunc='count', fill_value=0)\nassert [str(i) for i in pt.index] == list(_p.index), 'The rows must be the months'\nassert [str(c) for c in pt.columns] == list(_p.columns), 'The columns must be the statuses'\nassert (pt.values == _p.values).all(), 'The values do not match: count and fill_value=0 are needed'"
     }
    },
    {
     "title": "Day × region table",
     "prompt": "<p>From the file <code>daily_sales.csv</code>, use <code>pivot_table</code> to create the table <code>wide</code>: the rows are <code>day</code>, the columns are <code>region</code>, the values are the sum of <code>revenue</code>.</p>",
     "hints": [
      "<code>pd.pivot_table(daily, index='day', columns='region', values='revenue', aggfunc='sum')</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_p = _pd.pivot_table(_d, index='day', columns='region', values='revenue', aggfunc='sum')\nassert wide.shape == _p.shape, 'the size of wide:' + str(_p.shape) + ' болуы керек'\nassert [str(c) for c in wide.columns] == list(_p.columns), 'The columns must be the regions'\nassert (wide.values == _p.values).all(), 'The values do not match'"
     }
    },
    {
     "title": "Three-day moving average",
     "prompt": "<p>Read the file <code>daily_sales.csv</code> with <code>parse_dates=['day']</code>. Take only the rows of Алматы, make <code>day</code> the index, and store the 3-day moving average of <code>revenue</code> in the Series <code>roll</code> (<code>.rolling(3).mean()</code>).</p>",
     "hints": [
      "<code>daily[daily['region'] == 'Алматы'].set_index('day')</code>",
      "<code>['revenue'].rolling(3).mean()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_r = _d[_d['region'] == 'Алматы']['revenue'].rolling(3).mean()\nassert len(roll) == len(_r), 'roll must contain every day of Алматы'\nassert int(roll.isna().sum()) == 2, 'The first 2 values must be empty (NaN): rolling(3)'\nassert [round(float(v), 2) for v in roll.dropna()] == [round(float(v), 2) for v in _r.dropna()], 'The moving average values do not match'\nassert str(roll.index.dtype).startswith('datetime64'), 'The index must be day (a date type)'"
     }
    },
    {
     "title": "Customers by channel and month",
     "prompt": "<p>Merge the clean orders with the customers and create the summary table <code>pt</code>: the rows are the month (convert <code>order_date</code> with <code>pd.to_datetime</code> and use <code>.dt.to_period('M')</code>), the columns are <code>channel</code>, the values are the number of unique customers (<code>values='customer_id'</code>, <code>aggfunc='nunique'</code>), and empty places are 0.</p>",
     "hints": [
      "<code>pd.to_datetime(df['order_date']).dt.to_period('M')</code>",
      "<code>aggfunc='nunique'</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_d['month'] = _d['order_date'].str[:7]\n_p = _pd.pivot_table(_d, index='month', columns='channel', values='customer_id', aggfunc='nunique', fill_value=0)\nassert [str(i) for i in pt.index] == list(_p.index), 'The rows must be the months (2024-01 ... 2024-06)'\nassert [str(c) for c in pt.columns] == list(_p.columns), 'The columns must be the channels'\nassert (pt.values == _p.values).all(), 'The values do not match: nunique and fill_value=0 are needed'"
     }
    }
   ]
  },
  "pd-8": {
   "pr": [
    {
     "title": "Average weekly temperature",
     "prompt": "<p>Create the NumPy array <code>t</code> from the weekly temperature values, calculate its average and store it in the variable <code>avg</code>.</p>",
     "hints": [
      "<code>np.array(temps)</code>, then <code>.mean()</code>."
     ],
     "check": {
      "tests": "assert isinstance(t, np.ndarray), 't must be a NumPy array: np.array(temps)'\nassert abs(avg - 3 / 7) < 1e-9, 'avg is wrong: t.mean()'"
     }
    },
    {
     "title": "Price in dollars",
     "prompt": "<p>Convert the prices in tenge from the array <code>prices</code> to dollars (divide by 500), round them with <code>np.round(..., 2)</code>, and store them in the array <code>usd</code>. Do not use a loop.</p>",
     "hints": [
      "<code>np.round(prices / 500, 2)</code>"
     ],
     "check": {
      "tests": "assert isinstance(usd, np.ndarray), 'usd must be a NumPy array'\nassert usd.tolist() == [25.0, 9.98, 700.0, 1.56], 'usd is wrong:' + str(usd.tolist())"
     }
    },
    {
     "title": "Warm days",
     "prompt": "<p>Using a mask, take only the values greater than 0 from the array <code>t</code> and store them in the array <code>warm</code>.</p>",
     "hints": [
      "<code>t[t &gt; 0]</code>"
     ],
     "check": {
      "tests": "assert warm.tolist() == [2, 7, 4], 'warm must be [2, 7, 4]'"
     }
    },
    {
     "title": "Test result label",
     "prompt": "<p>Use <code>np.where</code> to put a label on each score in the array <code>scores</code>: 50 and above — <code>'өтті'</code>, otherwise <code>'құлады'</code>. The result is <code>labels</code>. Store the number of students who passed in the variable <code>n_pass</code>.</p>",
     "hints": [
      "<code>np.where(scores &gt;= 50, 'өтті', 'құлады')</code>",
      "<code>(scores &gt;= 50).sum()</code> counts the True values."
     ],
     "check": {
      "tests": "assert labels.tolist() == ['өтті', 'құлады', 'өтті', 'өтті', 'құлады', 'өтті'], 'labels is wrong:' + str(labels.tolist())\nassert int(n_pass) == 4, 'n_pass must be 4'"
     }
    },
    {
     "title": "Day the goal was reached",
     "prompt": "<p>The daily income of a coffee shop (thousand tenge) is given. Use <code>np.cumsum</code> to store the accumulated income in the array <code>cum</code>. Store the number of the day (counting from 1) when the accumulated income first reached 1000 (or exceeded it) in the variable <code>day</code>: <code>(cum &gt;= 1000).argmax() + 1</code>.</p>",
     "hints": [
      "<code>np.cumsum(daily)</code>",
      "In a True/False array, <code>argmax()</code> returns the position of the first True."
     ],
     "check": {
      "tests": "assert cum.tolist() == [180, 390, 550, 790, 980, 1210, 1410], 'cum is wrong: np.cumsum'\nassert int(day) == 6, 'day must be 6'"
     }
    },
    {
     "title": "Delivery time percentile",
     "prompt": "<p>Delivery times (in minutes) are given. Store the 90th percentile in the variable <code>p90</code> and the median in the variable <code>med</code>.</p>",
     "hints": [
      "<code>np.percentile(times, 90)</code>",
      "<code>np.median(times)</code>"
     ],
     "check": {
      "tests": "assert abs(p90 - 58.5) < 1e-9, 'p90 must be 58.5: np.percentile(times, 90)'\nassert med == 31.0, 'med must be 31.0'"
     }
    },
    {
     "title": "Hottest day",
     "prompt": "<p>The list <code>days</code> and the array <code>t</code> are given. Use <code>argmax</code> to store the name of the hottest day in the variable <code>hottest</code>. Store the number of days whose temperature is above the weekly average in the variable <code>n_above</code>.</p>",
     "hints": [
      "<code>t.argmax()</code> gives the position, the name: <code>days[...]</code>.",
      "<code>(t &gt; t.mean()).sum()</code>"
     ],
     "check": {
      "tests": "assert hottest == 'жм', 'hottest must be \\'жм\\''\nassert int(n_above) == 4, 'n_above must be 4'"
     }
    },
    {
     "title": "Outliers by z-score",
     "prompt": "<p>The prices of taxi trips are given. Calculate the z-score of each value: <code>z = (a - a.mean()) / a.std()</code>. Store the prices whose absolute z-score is greater than 2 (<code>(z &gt; 2) | (z &lt; -2)</code>) in the array <code>outliers</code>, and the average of the rest, rounded to 1 decimal place, in the variable <code>clean_mean</code>.</p>",
     "hints": [
      "Mask: <code>mask = (z &gt; 2) | (z &lt; -2)</code>",
      "The rest: <code>a[~mask]</code> or <code>a[(z &lt;= 2) &amp; (z &gt;= -2)]</code>."
     ],
     "check": {
      "tests": "assert outliers.tolist() == [9800], 'outliers must be [9800]'\nassert abs(clean_mean - 2000.0) < 0.05, 'clean_mean must be 2000.0'"
     }
    }
   ]
  }
 }
});
