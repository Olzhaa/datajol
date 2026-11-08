// M2.2 pandas & NumPy: English text. Code, solutions and expected output are in content/pandas.js.
(function () {
  const REF = "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n";
  DJ.i18n.patch({
    modules: {
      'm2-2': { intro: 'pandas is the main Python library for data analysis: loading a table (DataFrame), filtering, grouping, joining and cleaning. In this module real pandas runs right in your browser. The data comes from the «Бірінші кофе» (First Coffee) cafe chain: orders.csv, customers.csv and daily_sales.csv. For every action you know from SQL, you will learn the pandas equivalent.' }
    },
    lessons: {
      'pd-1': {
        title: 'DataFrame and loading a CSV',
        body: `
<p>A <b>DataFrame</b> is a table made of rows and columns (like an Excel sheet or an SQL table). Each column is a <b>Series</b>.</p>
<pre><code>import pandas as pd

df = pd.DataFrame({
    'city': ['Алматы', 'Астана', 'Шымкент'],
    'orders': [120, 95, 40]
})
print(df)
print(df.shape)     # (3, 2): 3 rows, 2 columns</code></pre>
<h3>Reading a CSV file</h3>
<pre><code>orders = pd.read_csv('orders.csv')
orders.head()       # first 5 rows
orders.info()       # columns, types, missing values
orders.describe()   # statistics of numeric columns</code></pre>
<table>
<tr><th>pandas</th><th>SQL</th></tr>
<tr><td><code>df.head(10)</code></td><td><code>SELECT * FROM t LIMIT 10</code></td></tr>
<tr><td><code>len(df)</code></td><td><code>SELECT COUNT(*) FROM t</code></td></tr>
<tr><td><code>df.columns</code></td><td>list of columns</td></tr>
</table>
<div class="tip">The first time you write <code>import pandas</code>, the library loads (a few seconds). After that it works right away.</div>
<h3>A first look at new data</h3>
<p>After reading any CSV, make four commands a habit:</p>
<ol>
<li><code>df.shape</code>: are the numbers of rows and columns what you expected?</li>
<li><code>df.head()</code>: what does the data itself look like, are the column names clear?</li>
<li><code>df.info()</code>: does each column have the right type? If an amount shows up as <code>object</code> (text), it contains non-numeric characters.</li>
<li><code>df.describe()</code>: are the smallest and largest values sensible?</li>
</ol>
<p>This is the pandas version of the profiling from the SQL lessons. A two-minute check saves you hours of hunting for bugs later.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>A different separator</b>: European Excel files use a semicolon instead of a comma. Then write <code>pd.read_csv('file.csv', sep=';')</code>.</li>
<li><b>Encoding</b>: if Cyrillic text turns into gibberish, try <code>encoding='utf-8'</code> or <code>encoding='cp1251'</code>.</li>
<li><b>Dates stayed as text</b>: <code>pd.read_csv(..., parse_dates=['order_date'])</code> turns them into a date type right away.</li>
</ul>`,
        ex: [
          { prompt: 'Create a DataFrame <code>df</code> with data on three cities: the <code>city</code> column is <code>[\'Алматы\', \'Астана\', \'Шымкент\']</code>, the <code>orders</code> column is <code>[120, 95, 40]</code>. Then run <code>print(df)</code>.', check: { tests: "assert isinstance(df, pd.DataFrame), 'df should be a DataFrame'\nassert list(df.columns) == ['city', 'orders'], 'Columns: city, orders'\nassert df['orders'].tolist() == [120, 95, 40], 'orders values should be [120, 95, 40]'" }, hints: ['<code>pd.DataFrame({\'city\': [...], \'orders\': [...]})</code>'] },
          { prompt: 'Read the file <code>orders.csv</code> into the variable <code>orders</code>. Store the number of rows in <code>n_rows</code> and the number of columns in <code>n_cols</code>, and print them.', check: { tests: "assert n_rows == 150, 'Wrong number of rows: use orders.shape'\nassert n_cols == 5, 'Wrong number of columns'" }, hints: ['<code>orders.shape</code> gives a (rows, columns) tuple.'] }
        ]
      },
      'pd-2': {
        title: 'Columns, rows and filtering',
        body: `
<pre><code>orders['amount']                  # one column (Series)
orders[['id', 'amount']]          # several columns (DataFrame)
orders.loc[0, 'amount']           # row label + column name
orders.iloc[0:3]                  # first 3 rows by position</code></pre>
<h3>Filter (WHERE)</h3>
<pre><code>paid = orders[orders['status'] == 'paid']
big  = orders[(orders['status'] == 'paid') &amp; (orders['amount'] &gt; 3000)]
two  = orders[orders['customer_id'].isin([1, 2])]</code></pre>
<div class="tip">In pandas you write <code>&amp;</code> and <code>|</code>, not <code>and</code>/<code>or</code>, and each condition must be <b>in parentheses</b>.</div>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>WHERE a = 1 AND b &gt; 2</code></td><td><code>df[(df['a'] == 1) &amp; (df['b'] &gt; 2)]</code></td></tr>
<tr><td><code>WHERE x IN (1, 2)</code></td><td><code>df[df['x'].isin([1, 2])]</code></td></tr>
<tr><td><code>WHERE x IS NULL</code></td><td><code>df[df['x'].isna()]</code></td></tr>
</table>
<h3>Adding a new column</h3>
<p>A calculated column is made like <code>SELECT amount * 1.12 AS with_vat</code> in SQL, but the result is added to the table itself:</p>
<pre><code>orders['with_vat'] = orders['amount'] * 1.12
orders['is_big'] = orders['amount'] &gt; 3000</code></pre>
<p>The operation is applied to the whole column at once, no loop needed.</p>
<h3>loc vs iloc</h3>
<p><code>loc</code> works with a row's <b>label</b> (index), <code>iloc</code> with its <b>position</b> (0, 1, 2...). After filtering, the index has "holes": <code>paid.loc[0]</code> raises an error if row 0 did not pass the filter. But <code>paid.iloc[0]</code> always gives the first row. To renumber the index, use <code>paid.reset_index(drop=True)</code>.</p>
<div class="tip">You can also write a filter with the <code>query</code> method: <code>orders.query("status == 'paid' and amount &gt; 3000")</code>. Here the word <code>and</code> works, and the syntax is closer to SQL.</div>`,
        ex: [
          { prompt: 'Store only the paid (<code>status == \'paid\'</code>) orders in the variable <code>paid</code> and print how many there are.', check: { tests: REF + "assert len(paid) == (_o['status'] == 'paid').sum(), 'paid should contain only rows with status == \"paid\"'\nassert set(paid['status']) == {'paid'}, 'Other statuses are left over'" }, hints: ["<code>orders[orders['status'] == 'paid']</code>"] },
          { prompt: 'Store the paid orders with an amount greater than 3000 in the variable <code>big</code>. Keep only the columns <code>id</code>, <code>customer_id</code>, <code>amount</code>.', check: { tests: REF + "_b = _o[(_o['status'] == 'paid') & (_o['amount'] > 3000)]\nassert list(big.columns) == ['id', 'customer_id', 'amount'], 'Columns: id, customer_id, amount'\nassert sorted(big['id']) == sorted(_b['id']), 'Wrong number of rows or wrong filter'" }, hints: ['Join the two conditions with <code>&amp;</code> and put each one in parentheses.', "Then add <code>[['id', 'customer_id', 'amount']]</code>"] }
        ]
      },
      'pd-3': {
        title: 'New columns and sorting',
        body: `
<p>To add a new column in Excel, you type a formula into one cell and drag it down. In pandas there is no dragging: you write the formula once for the whole column, and it is computed for every row at once. This is called <b>vectorization</b>, and no Python loop is needed.</p>
<pre><code>orders['amount_k'] = orders['amount'] / 1000
orders['month'] = orders['order_date'].str[:7]        # '2024-03-05' → '2024-03'
orders['size'] = orders['amount'].apply(lambda x: 'big' if x &gt; 3000 else 'small')</code></pre>
<p><code>.str[:7]</code> takes the first 7 characters of the text (like a slice in Python). <code>order_date</code> is read from the CSV as text, which is why this works.</p>
<h3>Example: input → code → result</h3>
<table>
<tr><th>id</th><th>order_date</th><th>amount</th><th>status</th></tr>
<tr><td>1</td><td>2024-01-05</td><td>2500</td><td>paid</td></tr>
<tr><td>2</td><td>2024-01-20</td><td>4200</td><td>paid</td></tr>
<tr><td>3</td><td>2024-02-03</td><td>1800</td><td>refund</td></tr>
<tr><td>4</td><td>2024-02-11</td><td>3600</td><td>paid</td></tr>
</table>
<pre><code>orders['month'] = orders['order_date'].str[:7]
res = orders.sort_values('amount', ascending=False)
print(res[['id', 'month', 'amount']])</code></pre>
<table>
<tr><th>id</th><th>month</th><th>amount</th></tr>
<tr><td>2</td><td>2024-01</td><td>4200</td></tr>
<tr><td>4</td><td>2024-02</td><td>3600</td></tr>
<tr><td>1</td><td>2024-01</td><td>2500</td></tr>
<tr><td>3</td><td>2024-02</td><td>1800</td></tr>
</table>
<p>To get the N largest rows, add <code>.head(N)</code> after sorting. If you need only one status, <b>filter first</b> (as in the previous lesson), then sort.</p>
<h3>Sorting (ORDER BY)</h3>
<pre><code>orders.sort_values('amount', ascending=False).head(5)   # top 5
orders.nlargest(5, 'amount')                            # the same
orders.sort_values(['customer_id', 'order_date'])       # by two columns</code></pre>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>SELECT amount / 1000 AS amount_k</code></td><td><code>df['amount_k'] = df['amount'] / 1000</code></td></tr>
<tr><td><code>substr(order_date, 1, 7)</code></td><td><code>df['order_date'].str[:7]</code></td></tr>
<tr><td><code>ORDER BY amount DESC LIMIT 5</code></td><td><code>df.sort_values('amount', ascending=False).head(5)</code></td></tr>
</table>
<p>Renaming: <code>df.rename(columns={'amount': 'sum'})</code>. Dropping a column: <code>df.drop(columns=['size'])</code>.</p>
<div class="tip"><b>Common mistakes:</b>
<ul>
<li>If you forget <code>ascending=False</code>, the <b>smallest</b> values end up on top (the default is ascending order).</li>
<li><code>sort_values</code> does not change the table in place; it returns a new one. Store the result in a variable: <code>res = df.sort_values(...)</code>.</li>
<li>If you get a warning when adding a column to a filtered table, add <code>.copy()</code> after the filter.</li>
</ul></div>`,
        ex: [
          { prompt: 'Add a <code>month</code> column to <code>orders</code>: the first 7 characters of <code>order_date</code> (for example <code>2024-03</code>).', check: { tests: "assert 'month' in orders.columns, 'There is no month column'\nassert (orders['month'] == orders['order_date'].str[:7]).all(), 'month = the first 7 characters of order_date'" }, hints: ["<code>orders['order_date'].str[:7]</code>"] },
          { prompt: 'Among the paid orders, store the 5 with the largest amounts, in descending order, in the variable <code>top5</code>.', check: { tests: REF + "_t = _o[_o['status'] == 'paid'].sort_values('amount', ascending=False).head(5)\nassert len(top5) == 5, 'top5 should have 5 rows'\nassert top5['amount'].tolist() == _t['amount'].tolist(), 'Amounts should be in descending order'\nassert set(top5['status']) == {'paid'}, 'Only paid orders'" }, hints: ["<code>sort_values('amount', ascending=False).head(5)</code>"] }
        ]
      },
      'pd-4': {
        title: 'groupby: grouping and aggregates',
        body: `
<p>Imagine you sorted the receipts from the till into separate piles by customer, added up each pile on a calculator and wrote the totals on one sheet. <code>groupby</code> does exactly that. It is SQL's <code>GROUP BY</code>. Three steps: split → apply → combine.</p>
<h3>Example: step by step</h3>
<table>
<tr><th>id</th><th>customer_id</th><th>amount</th></tr>
<tr><td>1</td><td>1</td><td>2000</td></tr>
<tr><td>2</td><td>2</td><td>3000</td></tr>
<tr><td>3</td><td>1</td><td>2500</td></tr>
<tr><td>4</td><td>3</td><td>1500</td></tr>
<tr><td>5</td><td>2</td><td>4000</td></tr>
</table>
<pre><code>orders.groupby('customer_id')['amount'].sum()</code></pre>
<ol>
<li><b>Split:</b> customer 1 → [2000, 2500]; customer 2 → [3000, 4000]; customer 3 → [1500].</li>
<li><b>Apply:</b> <code>sum</code> on each group: 4500; 7000; 1500.</li>
<li><b>Combine:</b> one Series, with <code>customer_id</code> as the index:</li>
</ol>
<pre><code>customer_id
1    4500
2    7000
3    1500
Name: amount, dtype: int64</code></pre>
<p>If you need several aggregates, write <code>new_name=('column', 'function')</code> inside <code>.agg()</code>. On the same table, <code>.agg(orders=('id', 'count'), revenue=('amount', 'sum')).reset_index()</code> gives:</p>
<table>
<tr><th>customer_id</th><th>orders</th><th>revenue</th></tr>
<tr><td>1</td><td>2</td><td>4500</td></tr>
<tr><td>2</td><td>2</td><td>7000</td></tr>
<tr><td>3</td><td>1</td><td>1500</td></tr>
</table>
<p>The grouping key must be in the table. For example, to group by month, first add a <code>month</code> column (previous lesson), then <code>groupby('month')</code>. To sort the result, add <code>sort_values</code> at the end.</p>
<pre><code># one aggregate → Series
orders.groupby('status')['amount'].sum()

# several aggregates → DataFrame
orders.groupby('customer_id').agg(
    orders=('id', 'count'),
    revenue=('amount', 'sum'),
    avg_check=('amount', 'mean')
).reset_index()</code></pre>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>COUNT(*)</code></td><td><code>'count'</code> or <code>.size()</code></td></tr>
<tr><td><code>COUNT(DISTINCT x)</code></td><td><code>'nunique'</code></td></tr>
<tr><td><code>WHERE status = 'paid'</code></td><td>filter <b>before</b> grouping: <code>orders[orders['status'] == 'paid'].groupby(...)</code></td></tr>
<tr><td><code>HAVING SUM(a) &gt; 10</code></td><td>filter <b>after</b> aggregating: <code>res[res['revenue'] &gt; 10]</code></td></tr>
<tr><td><code>ORDER BY revenue DESC</code></td><td><code>.sort_values('revenue', ascending=False)</code></td></tr>
</table>
<div class="tip"><code>reset_index()</code> turns the grouping column from the index back into a regular column. That is handy for joining the result further.</div>
<h3>Common mistakes</h3>
<ul>
<li>Forgetting <code>reset_index()</code>: <code>customer_id</code> stays in the index, and <code>df['customer_id']</code> raises an error.</li>
<li>Forgetting the filter: refund orders get added to revenue too. Keep only <code>paid</code> first.</li>
<li><code>'count'</code> counts only non-empty values: <code>('amount', 'count')</code> skips empty amounts, while <code>('id', 'count')</code> counts every order.</li>
</ul>`,
        ex: [
          { prompt: 'Compute the revenue for each month from paid orders: <code>monthly</code> is a Series whose index is the month (the first 7 characters of <code>order_date</code>) and whose value is the sum of <code>amount</code>.', check: { tests: REF + "_p = _o[_o['status'] == 'paid']\n_m = _p.groupby(_p['order_date'].str[:7])['amount'].sum()\nassert len(monthly) == 6, 'There should be six months'\nassert [round(float(v)) for v in monthly.values] == [round(float(v)) for v in _m.values], 'Monthly totals do not match: did you take only paid orders?'" }, hints: ['First add a <code>month</code> column.', "<code>paid.groupby('month')['amount'].sum()</code>"] },
          { prompt: 'From paid orders, compute <code>orders</code> (number of orders) and <code>revenue</code> (total) for each customer and build the DataFrame <code>by_cust</code> (<code>customer_id</code> should be a regular column). Sort by revenue in descending order.', check: { tests: REF + "_g = _o[_o['status'] == 'paid'].groupby('customer_id').agg(orders=('id', 'count'), revenue=('amount', 'sum')).reset_index().sort_values('revenue', ascending=False)\nassert 'customer_id' in by_cust.columns, 'customer_id should be a column: use reset_index()'\nassert {'orders', 'revenue'} <= set(by_cust.columns), 'You need orders and revenue columns'\nassert len(by_cust) == len(_g), 'Wrong number of customers'\nassert by_cust['revenue'].round().tolist() == _g['revenue'].round().tolist(), 'revenue values or order are wrong'" }, hints: ["<code>.agg(orders=('id', 'count'), revenue=('amount', 'sum'))</code>", "<code>.reset_index().sort_values('revenue', ascending=False)</code>"] }
        ]
      },
      'pd-5': {
        title: 'Missing values and cleaning',
        body: `
<pre><code>orders.isna().sum()                  # number of missing values per column
orders.dropna(subset=['amount'])     # drop rows with an empty amount
orders['amount'].fillna(0)           # fill missing values with 0 (careful!)
orders.drop_duplicates()             # duplicate rows
orders['amount'].astype(int)         # change the type</code></pre>
<h3>Outliers</h3>
<pre><code>q1, q3 = orders['amount'].quantile([0.25, 0.75])
iqr = q3 - q1
outliers = orders[orders['amount'] &gt; q3 + 1.5 * iqr]</code></pre>
<div class="tip">Filling an empty amount with 0 artificially lowers the average check. Usually you drop it or find out the reason. Always write down your decision.</div>
<h3>Cleaning order</h3>
<p>It is best to run the cleaning once, in a fixed order. For example:</p>
<pre><code>clean = (orders
    .drop_duplicates()
    .dropna(subset=['amount'])
    .query("status == 'paid' and amount &lt; 20000"))
print(len(orders), '→', len(clean))</code></pre>
<p>The "chain" in parentheses (method chaining) puts each step on its own line, and the final <code>print</code> shows how many rows were removed. Always report this number.</p>
<h3>Cleaning text</h3>
<p>In pandas you apply string methods to a text column through <code>.str</code>:</p>
<pre><code>df['city'] = df['city'].str.strip().str.title()
df['email'] = df['email'].str.lower()</code></pre>
<p>These methods skip empty values, so <code>NaN</code> does not cause an error.</p>
<div class="tip">Write the cleaned data into a new variable (<code>clean</code>) without changing the original table. If you make a mistake, it is easy to start again from the original data.</div>`,
        ex: [
          { prompt: 'Store the number of missing values in the <code>amount</code> column in the variable <code>null_count</code>.', check: { tests: "assert int(null_count) == 6, 'Wrong number of missing values: use isna().sum()'" }, hints: ["<code>orders['amount'].isna().sum()</code>"] },
          { prompt: 'Build a clean orders table in the variable <code>clean</code>: <code>status == \'paid\'</code>, <code>amount</code> not empty and less than 20,000. Then convert <code>amount</code> to <code>int</code> and print the average check.', check: { tests: REF + "assert len(clean) == len(_clean), 'Wrong number of rows: check all three conditions'\nassert clean['amount'].isna().sum() == 0, 'Missing values are left'\nassert clean['amount'].max() < 20000, 'An outlier is left'\nassert str(clean['amount'].dtype).startswith('int'), 'amount should be of type int: astype(int)'" }, hints: ["<code>orders['amount'].notna()</code>", 'Make a copy: <code>.copy()</code>, then <code>astype(int)</code>.'] }
        ]
      },
      'pd-6': {
        title: 'merge: joining tables',
        body: `
<p>One sheet has the orders, but not the customer's city or channel. A second sheet has the list of customers. In Excel you "pull" the customer data into each order with VLOOKUP. In pandas this is <code>merge</code>, the same as <code>JOIN</code> in SQL.</p>
<h3>Example: which rows match</h3>
<p><b>orders</b>:</p>
<table>
<tr><th>id</th><th>customer_id</th><th>amount</th></tr>
<tr><td>10</td><td>1</td><td>2000</td></tr>
<tr><td>11</td><td>2</td><td>3000</td></tr>
<tr><td>12</td><td>1</td><td>1500</td></tr>
<tr><td>13</td><td>4</td><td>2500</td></tr>
</table>
<p><b>customers</b>:</p>
<table>
<tr><th>id</th><th>city</th><th>channel</th></tr>
<tr><td>1</td><td>Алматы</td><td>instagram</td></tr>
<tr><td>2</td><td>Астана</td><td>2gis</td></tr>
<tr><td>3</td><td>Шымкент</td><td>referral</td></tr>
</table>
<pre><code>df = orders.merge(customers, left_on='customer_id', right_on='id',
                  how='left', suffixes=('_order', '_customer'))</code></pre>
<table>
<tr><th>id_order</th><th>customer_id</th><th>amount</th><th>id_customer</th><th>city</th><th>channel</th></tr>
<tr><td>10</td><td>1</td><td>2000</td><td>1</td><td>Алматы</td><td>instagram</td></tr>
<tr><td>11</td><td>2</td><td>3000</td><td>2</td><td>Астана</td><td>2gis</td></tr>
<tr><td>12</td><td>1</td><td>1500</td><td>1</td><td>Алматы</td><td>instagram</td></tr>
<tr><td>13</td><td>4</td><td>2500</td><td>NaN</td><td>NaN</td><td>NaN</td></tr>
</table>
<p>Customer 1 has two orders, so their city was copied into two rows. Customer 4 is not in customers: <code>left</code> keeps the row, but its values are empty (NaN). With <code>how='inner'</code>, order 13 would disappear and 3 rows would remain. Customer 3 has no orders and appears only with <code>'outer'</code>.</p>
<p>After joining, you can group by any column: <code>df.groupby('channel')['amount'].sum()</code> → instagram 3500, 2gis 3000.</p>
<pre><code>customers = pd.read_csv('customers.csv')

df = orders.merge(customers, left_on='customer_id', right_on='id',
                  how='left', suffixes=('_order', '_customer'))</code></pre>
<table>
<tr><th>how</th><th>SQL</th></tr>
<tr><td><code>'inner'</code> (default)</td><td><code>INNER JOIN</code></td></tr>
<tr><td><code>'left'</code></td><td><code>LEFT JOIN</code></td></tr>
<tr><td><code>'outer'</code></td><td><code>FULL OUTER JOIN</code></td></tr>
</table>
<p>If the key names are the same: <code>on='customer_id'</code>. If they differ (here <code>customer_id</code> and <code>id</code>), write <code>left_on</code> and <code>right_on</code>. Since both tables have an <code>id</code> column, <code>suffixes</code> tells the names apart (otherwise you get <code>id_x</code>, <code>id_y</code>).</p>
<p>The SQL equivalent:</p>
<pre><code>SELECT o.*, c.city, c.channel
FROM orders o
LEFT JOIN customers c ON c.id = o.customer_id;</code></pre>
<div class="tip">After joining, check the row count: if <code>len(df)</code> is larger than expected, a key is duplicated.</div>
<h3>Common mistakes</h3>
<ul>
<li>Writing <code>on='id'</code>: the order id is compared with the customer id, the result is wrong, but no error message appears.</li>
<li>If a key is duplicated in the right table, rows multiply and totals double.</li>
<li>After <code>left</code>, unmatched rows contain NaN. <code>groupby</code> drops NaN keys by default, so that amount does not show up in the groups.</li>
</ul>`,
        ex: [
          { prompt: 'Join the clean orders (<code>clean</code> is ready) with <code>customers.csv</code> and compute the revenue of each channel (<code>channel</code>). Result: the Series <code>by_channel</code>, in descending order.', check: { tests: REF + "_m = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel')['amount'].sum().sort_values(ascending=False)\nassert list(by_channel.index) == list(_m.index), 'Wrong order of channels: sort in descending order'\nassert [round(float(v)) for v in by_channel.values] == [round(float(v)) for v in _m.values], 'Totals do not match'" }, hints: ["<code>clean.merge(customers, left_on='customer_id', right_on='id')</code>", "<code>.groupby('channel')['amount'].sum().sort_values(ascending=False)</code>"] },
          { prompt: 'We joined 150 orders with 40 customers using <code>how=\'left\'</code> and got 150 rows. What would it mean if we got 300 rows instead?', options: ['Everything is fine', 'A customer id is duplicated in the customers table', 'The orders table is empty', 'We should have used how=\'inner\''], explain: 'If a key is duplicated in the right table, each order is copied several times. Always check the row count after a join.' }
        ]
      },
      'pd-7': {
        title: 'Dates and pivot_table',
        body: `
<p>A date read from a CSV is just text, for example <code>'2024-03-05'</code>. Comparing dates as text or finding the day of the week is hard. <code>pd.to_datetime</code> turns it into a real date, and then <code>.dt</code> gives us its parts.</p>
<pre><code>orders['order_date'] = pd.to_datetime(orders['order_date'])
orders['month'] = orders['order_date'].dt.to_period('M')   # 2024-03
orders['weekday'] = orders['order_date'].dt.day_name()      # 'Tuesday'</code></pre>
<p>If you only need the month, <code>.str[:7]</code> on the text is enough (lesson pd-3).</p>
<h3>pivot_table: a summary table</h3>
<p>Like a PivotTable in Excel: one column is spread across the rows (<code>index</code>), another across the columns (<code>columns</code>), and each intersection holds an aggregate of the values (<code>values</code> + <code>aggfunc</code>). It is a "two-dimensional groupby".</p>
<p>Example: <code>df</code> is orders joined with customers:</p>
<table>
<tr><th>city</th><th>month</th><th>amount</th></tr>
<tr><td>Алматы</td><td>2024-01</td><td>2000</td></tr>
<tr><td>Алматы</td><td>2024-01</td><td>1500</td></tr>
<tr><td>Алматы</td><td>2024-02</td><td>3000</td></tr>
<tr><td>Астана</td><td>2024-02</td><td>2500</td></tr>
</table>
<pre><code>pd.pivot_table(df, index='city', columns='month',
               values='amount', aggfunc='sum', fill_value=0)</code></pre>
<table>
<tr><th>city</th><th>2024-01</th><th>2024-02</th></tr>
<tr><td>Алматы</td><td>3500</td><td>3000</td></tr>
<tr><td>Астана</td><td>0</td><td>2500</td></tr>
</table>
<p>Astana has no orders in January. Without <code>fill_value=0</code> that cell would hold NaN. Exactly the same result comes from <code>df.groupby(['city', 'month'])['amount'].sum().unstack(fill_value=0)</code>. In SQL: <code>GROUP BY city, month</code>, and to spread the months into columns you need a separate expression for each month, like <code>SUM(CASE WHEN month = '2024-01' THEN amount END)</code>.</p>
<h3>Time series</h3>
<p><code>daily_sales.csv</code> holds the daily revenue of each region (<code>day</code>, <code>region</code>, <code>revenue</code>). A summary by region is the same old <code>groupby</code>; you just pick the aggregate: <code>sum</code> (total), <code>mean</code> (average per day), <code>max</code>.</p>
<pre><code>daily = pd.read_csv('daily_sales.csv', parse_dates=['day'])
daily.groupby('region')['revenue'].sum()
daily.set_index('day').groupby('region')['revenue'].rolling(3).mean()  # 3-day moving average</code></pre>
<p>For example, if Almaty had 100 and 120 and Astana had 80 and 90, the daily average is: Almaty 110, Astana 85.</p>
<div class="tip"><b>Common mistakes:</b>
<ul>
<li>Using <code>.dt</code> on a text column raises an error: run <code>pd.to_datetime</code> first.</li>
<li>If you pass the unjoined <code>orders</code> to <code>pivot_table</code>, the <code>city</code> column is not found: <code>merge</code> first.</li>
<li><code>aggfunc</code> defaults to <code>'mean'</code>: if you need a total, write <code>'sum'</code> explicitly.</li>
</ul></div>`,
        ex: [
          { prompt: 'Join the clean orders with the customers and build the pivot table <code>pt</code>: rows are <code>city</code>, columns are the month (<code>month</code>, for example <code>2024-01</code>), values are the sum of <code>amount</code>, and empty cells are 0.', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_d['month'] = _d['order_date'].str[:7]\n_p = _pd.pivot_table(_d, index='city', columns='month', values='amount', aggfunc='sum', fill_value=0)\nassert list(pt.index) == list(_p.index), 'Rows should be cities'\nassert [str(c) for c in pt.columns] == [str(c) for c in _p.columns], 'Columns should be months'\nassert (pt.values.round() == _p.values.round()).all(), 'Values do not match'" }, hints: ["<code>pd.pivot_table(df, index='city', columns='month', values='amount', aggfunc='sum', fill_value=0)</code>"] },
          { prompt: 'Read the file <code>daily_sales.csv</code> and store the average daily revenue of each region (<code>region</code>) in the Series <code>avg_by_region</code>.', check: { tests: "_d = __import__('pandas').read_csv('daily_sales.csv').groupby('region')['revenue'].mean()\nassert list(avg_by_region.index) == list(_d.index), 'The index should be the regions'\nassert [round(float(v), 2) for v in avg_by_region.values] == [round(float(v), 2) for v in _d.values], 'Averages do not match'" }, hints: ["<code>daily.groupby('region')['revenue'].mean()</code>"] }
        ]
      },
      'pd-8': {
        title: 'NumPy basics',
        body: `
<p><b>NumPy</b> is the foundation of pandas: fast numeric arrays. Inside a pandas column sits a NumPy array.</p>
<pre><code>import numpy as np

a = np.array([2150, 2250, 2550, 48000])
a.mean(), np.median(a), a.std()
a * 1.12                         # applied to every element at once (vectorization)
a[a &lt; 20000]                     # filtering with a mask
np.where(a &gt; 3000, 'big', 'small')</code></pre>
<p>The median is not sensitive to the outlier (48000), but the mean is. You know this from the statistics module.</p>
<div class="tip">A Python loop over a million rows is slow. NumPy/pandas operations run in C, so they are hundreds of times faster.</div>
<h3>A vectorization example</h3>
<p>To add VAT to a Python list, you need a loop:</p>
<pre><code>prices = [2150, 2250, 2550]
with_vat = [p * 1.12 for p in prices]</code></pre>
<p>In NumPy one operation is enough: <code>np.array(prices) * 1.12</code>. The result is the same, but on a million elements NumPy is far faster, and the code is shorter and easier to read.</p>
<h3>Useful functions</h3>
<table>
<tr><th>Function</th><th>What it does</th></tr>
<tr><td><code>np.round(a, 1)</code></td><td>rounding</td></tr>
<tr><td><code>np.percentile(a, 90)</code></td><td>90th percentile</td></tr>
<tr><td><code>np.cumsum(a)</code></td><td>cumulative sum</td></tr>
<tr><td><code>np.log(a)</code></td><td>logarithm (to straighten out skewed data)</td></tr>
<tr><td><code>a.argmax()</code></td><td>position of the largest element</td></tr>
</table>
<div class="tip">All elements of an array have the same type. If you mix numbers and text, NumPy turns everything into text, and arithmetic stops working.</div>`,
        ex: [
          { prompt: 'Store the mean of the array <code>a</code> in <code>mean_all</code>, its median in <code>med</code>, and the mean of the elements below 20,000 in <code>mean_clean</code>.', check: { tests: "assert abs(mean_all - 8857.142857) < 0.01, 'mean_all is wrong'\nassert med == 2250, 'med is wrong: np.median'\nassert abs(mean_clean - 2333.333333) < 0.01, 'mean_clean: a[a < 20000].mean()'" }, hints: ['<code>a[a &lt; 20000].mean()</code>'] },
          { prompt: 'What does <code>np.where(a &gt; 3000, \'big\', \'small\')</code> return?', options: ['The indices of elements greater than 3000', 'An array with the text \'big\' or \'small\' for each element', 'An array of True/False', 'A single string'], explain: 'np.where with three arguments is a vectorized IF: the first value where the condition is true, otherwise the second.' }
        ]
      },
      'pd-gate': {
        title: 'Module exam: pandas',
        body: `<p>Final tasks: filtering, cleaning, joining and grouping in one analysis.</p>`,
        ex: [
          { prompt: 'How do you write SQL\'s <code>COUNT(DISTINCT customer_id)</code> in pandas?', explain: 'nunique() gives the number of unique values, while count() counts all non-empty values.' },
          { prompt: 'Why does <code>df[df[\'a\'] &gt; 1 and df[\'b\'] &lt; 5]</code> raise an error?', options: ['The columns do not exist', 'A Series needs &amp; instead of and, and the conditions must be in parentheses', 'and only works with numbers', 'It does not raise an error'], explain: 'Correct: df[(df[\'a\'] &gt; 1) &amp; (df[\'b\'] &lt; 5)].' },
          { prompt: 'For each city (<code>city</code>), compute from the clean orders <code>customers</code> (unique customers), <code>revenue</code> and <code>aov</code> (revenue / number of orders, rounded to a whole number), and build the DataFrame <code>report</code>. <code>city</code> should be a regular column, sorted by revenue in descending order.', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_r = _d.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index().sort_values('revenue', ascending=False)\nassert 'city' in report.columns, 'city should be a regular column'\nassert {'customers', 'revenue', 'aov'} <= set(report.columns), 'You need customers, revenue and aov columns'\nassert report['city'].tolist() == _r['city'].tolist(), 'Wrong order of cities'\nassert report['customers'].tolist() == _r['customers'].tolist(), 'customers: use nunique'\nassert report['revenue'].round().tolist() == _r['revenue'].round().tolist(), 'revenue is wrong: did you take the clean orders?'\nassert [round(float(a)) for a in report['aov']] == [round(r / n) for r, n in zip(_r['revenue'], _r['n'])], 'aov = revenue / number of orders'" } }
        ]
      }
    }
  });
})();
