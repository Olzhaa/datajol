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
<p>This first look through the data is called <b>profiling</b>; you will learn it in full later, in the "Cleaning &amp; EDA" module. A two-minute check saves you hours of hunting for bugs later.</p>
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
<p>The <code>lambda x: ...</code> in the third line is a one-line function without a name: "take <code>x</code> and return the value of the expression after the colon". <code>.apply</code> applies it to each value of the column in turn. Here every amount gives <code>'big'</code> or <code>'small'</code>.</p>
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
orders['amount'].astype(int)         # change the type (raises an error if there is a missing value)</code></pre>
<p>Use <code>astype(int)</code> only <b>after</b> <code>dropna</code> or <code>fillna</code>. A missing value (<code>NaN</code>) cannot become a whole number: even if a single NaN is left in the column, pandas raises <code>IntCastingNaNError</code>. This is why a numeric column with missing values is read as <code>float</code> by default.</p>
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
<p>The median is not sensitive to the outlier (48000), but the mean is. You know this from the lesson "Mean, median, mode" in module M0.2.</p>
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
      'pd-9': {
        title: 'value_counts, concat and files',
        body: `
<p>In this lesson you learn four small but very common everyday actions: counting values, stacking tables vertically, saving a result to a file and turning "dirty" text into numbers.</p>
<h3>value_counts: counting values</h3>
<p>The fastest way to get to know a categorical column is to count how many times each value occurs. This is SQL's <code>GROUP BY status</code> + <code>COUNT(*)</code> + <code>ORDER BY ... DESC</code>, in a single method:</p>
<pre><code>orders['status'].value_counts()
# paid      146
# refund      4

orders['status'].value_counts(normalize=True)
# paid      0.973333
# refund    0.026667</code></pre>
<p><code>normalize=True</code> gives the <b>share</b> instead of the count (they add up to 1). For percentages, multiply by 100: <code>(... * 100).round(1)</code>. The result is a Series: the values are in the index, the numbers inside. To get a specific value: <code>counts['refund']</code>.</p>
<p>By default missing values are not counted. To see them too, write <code>value_counts(dropna=False)</code>.</p>
<h3>pd.concat: stacking tables vertically</h3>
<p>Data often arrives in separate files: one file per month. Putting tables with the same columns one under another is <code>pd.concat</code> (<code>UNION ALL</code> in SQL):</p>
<pre><code>jan = pd.DataFrame({'id': [1, 2], 'amount': [2400, 2750]})
feb = pd.DataFrame({'id': [3], 'amount': [2600]})

both = pd.concat([jan, feb], ignore_index=True)
#    id  amount
# 0   1    2400
# 1   2    2750
# 2   3    2600</code></pre>
<p><code>ignore_index=True</code> renumbers the index from 0. Without it the index would repeat: <code>0, 1, 0</code>. The tables are passed as a list: <code>pd.concat([a, b, c])</code>.</p>
<table>
<tr><th>Action</th><th>What it does</th><th>SQL</th></tr>
<tr><td><code>pd.concat([a, b])</code></td><td>adds rows underneath</td><td><code>UNION ALL</code></td></tr>
<tr><td><code>a.merge(b, on=...)</code></td><td>attaches columns by a key</td><td><code>JOIN</code></td></tr>
</table>
<p>If the column names do not match (<code>amount</code> and <code>Amount</code>), concat makes two separate columns and fills the gaps with NaN. Compare <code>df.columns</code> before you concatenate.</p>
<h3>Saving the result: to_csv</h3>
<pre><code>paid.to_csv('paid.csv', index=False)</code></pre>
<p><code>index=False</code> matters: without it pandas writes the index as a separate column too, and when you read the file back an extra column called <code>Unnamed: 0</code> appears. For a file that will be opened in Excel: <code>to_csv('paid.csv', index=False, sep=';', encoding='utf-8-sig')</code>. Then the columns split correctly and Kazakh letters are not garbled.</p>
<h3>Excel files: read_excel</h3>
<p>Colleagues mostly send data as <code>.xlsx</code>. Reading it is similar to CSV:</p>
<pre><code>df = pd.read_excel('report.xlsx', sheet_name='Сатылым')   # one sheet
df = pd.read_excel('report.xlsx', sheet_name=0, skiprows=2)  # the first sheet, skipping the top 2 rows
df.to_excel('result.xlsx', index=False)</code></pre>
<p><code>sheet_name</code> is the name of the sheet or its number (from 0). Report tables have empty rows and a title above the header, and <code>skiprows</code> skips them. On your own computer this needs the <code>openpyxl</code> package (<code>pip install openpyxl</code>). It is not available in this browser environment, so here the tasks use CSV.</p>
<h3>Turning text into numbers: to_numeric</h3>
<p>If the amount column is read as <code>object</code> (text), it contains non-numeric characters: a space, "тг" (tenge), <code>жоқ</code> ("none").</p>
<pre><code>raw = pd.Series(['12 500', '8000', 'abc', None])

pd.to_numeric(raw)                          # ValueError: '12 500' cannot become a number
clean = raw.str.replace(' ', '')            # '12500', '8000', 'abc', None
pd.to_numeric(clean, errors='coerce')       # 12500.0, 8000.0, NaN, NaN</code></pre>
<p><code>errors='coerce'</code> replaces a value that cannot become a number with <code>NaN</code> instead of raising an error. Afterwards, always check with <code>.isna().sum()</code> how many values were lost: if it is a lot, the cleaning rule needs improving.</p>
<div class="tip">There is the same kind of method for dates: <code>pd.to_datetime(s, errors='coerce')</code> turns a date it cannot read into <code>NaT</code>.</div>
<h3>Common mistakes</h3>
<ul>
<li><b>Writing <code>pd.concat(a, b)</code>.</b> The tables must be passed inside a list: <code>pd.concat([a, b])</code>.</li>
<li><b>Forgetting <code>ignore_index</code>.</b> The index repeats, and <code>.loc[0]</code> returns several rows.</li>
<li><b>Writing <code>to_csv</code> without <code>index=False</code>.</b> An extra column appears in the file.</li>
<li><b>Not counting the NaNs after <code>errors='coerce'</code>.</b> Bad values silently disappear, and the total comes out too low.</li>
<li><b>Calling value_counts on a DataFrame and expecting one column.</b> Select the column first: <code>df['status'].value_counts()</code>.</li>
</ul>`,
        ex: [
          { prompt: 'Store the <b>share</b> of each value in the <code>status</code> column in the Series <code>share</code> (<code>value_counts</code> and <code>normalize=True</code>). Then store the share of refunded orders, as a percentage rounded to one decimal place, in <code>refund_pct</code>.', check: { tests: REF + "_s = _o['status'].value_counts(normalize=True)\nassert abs(float(share.sum()) - 1) < 1e-9, 'share should hold shares: did you add normalize=True?'\nassert abs(float(share['paid']) - float(_s['paid'])) < 1e-9, 'The share of paid is wrong'\nassert abs(float(refund_pct) - round(float(_s['refund']) * 100, 1)) < 1e-9, 'refund_pct = share[\\'refund\\'] * 100, rounded to one decimal place'" }, hints: ["<code>orders['status'].value_counts(normalize=True)</code>", "<code>round(share['refund'] * 100, 1)</code>"] },
          { prompt: 'The orders of January and February are in two separate tables (<code>jan</code>, <code>feb</code>). Combine them with <code>pd.concat</code> into one table, <code>both</code>. The index should be numbered from 0 without repeats.', check: { tests: "assert len(both) == len(jan) + len(feb), 'both should contain all rows of the two tables'\nassert list(both.columns) == list(orders.columns), 'The columns should not change'\nassert list(both.index) == list(range(len(both))), 'The index should be renumbered from 0: ignore_index=True'\nassert set(both['order_date'].str[:7]) == {'2024-01', '2024-02'}, 'Only January and February should be there'" }, hints: ['Pass the tables inside a list: <code>pd.concat([jan, feb])</code>.', 'Add <code>ignore_index=True</code>.'] },
          { prompt: '<code>raw</code> holds amounts that arrived as text. Remove the spaces and convert them to numbers with <code>pd.to_numeric</code>: the result is <code>nums</code>. Values that cannot become a number should be NaN. Store the number of NaN values in <code>bad</code>.', check: { tests: "assert len(nums) == 7, 'nums should have 7 values (do not drop rows)'\nassert str(nums.dtype).startswith('float'), 'nums should be numeric (float): pd.to_numeric'\nassert float(nums.sum()) == 37200.0, 'The numbers should add up to 37200: did you remove the spaces?'\nassert int(bad) == 3, 'bad = nums.isna().sum(), it should be 3'" }, hints: ["Removing the space: <code>raw.str.replace(' ', '')</code>.", "<code>pd.to_numeric(..., errors='coerce')</code>", '<code>nums.isna().sum()</code>'] },
          { prompt: 'Filter the orders with status <code>refund</code> into the table <code>refunds</code> and save it to the file <code>refunds.csv</code> <b>without the index</b>. Then read that file back into the variable <code>check</code>.', check: { tests: REF + "import os as _os\ntry:\n    assert _os.path.exists('refunds.csv'), 'There is no refunds.csv file: use to_csv'\n    _f = _pd.read_csv('refunds.csv')\n    assert list(_f.columns) == list(_o.columns), 'The file has an extra column: add index=False'\n    assert len(_f) == int((_o['status'] == 'refund').sum()), 'The file should contain only refund orders'\n    assert set(_f['status']) == {'refund'}, 'The file should contain only refund orders'\n    assert list(check.columns) == list(_o.columns) and len(check) == len(_f), 'check is the table read back from the file: pd.read_csv'\nfinally:\n    if _os.path.exists('refunds.csv'):\n        _os.remove('refunds.csv')" }, hints: ["<code>refunds.to_csv('refunds.csv', index=False)</code>", "<code>check = pd.read_csv('refunds.csv')</code>"] },
          { prompt: 'A colleague sent the file <code>report.xlsx</code>: the data is on the «Сатылым» (Sales) sheet, and above the column names there are 2 rows with blank space and a title. How do you read it?', options: ["pd.read_csv('report.xlsx')", "pd.read_excel('report.xlsx', sheet_name='Сатылым', skiprows=2)", "pd.read_excel('report.xlsx', index=False)", "pd.concat('report.xlsx')"], explain: 'read_excel picks the sheet with sheet_name, and skiprows skips the extra rows at the top. read_csv cannot read an Excel file: xlsx is an archive, not text.' }
        ]
      },
      'pd-10': {
        title: 'Text, conditional columns and time series',
        body: `
<p>A large part of analysis is making a <b>new column</b> from existing ones: extracting a feature from text, splitting numbers into groups, comparing with the previous day. This lesson gathers the main tools for that.</p>
<h3>Text: the .str methods</h3>
<pre><code>customers['channel'].str.contains('gram')        # True/False: does it contain 'gram'
customers['city'].str.replace('Астана', 'Astana')  # replacement
orders['order_date'].str.split('-')              # ['2024', '03', '05']
orders['order_date'].str.split('-').str[1]       # '03' (the month)
orders['order_date'].str.split('-', expand=True) # three separate columns</code></pre>
<p><code>.str.contains</code> returns a True/False mask, so you can put it straight into a filter: <code>customers[customers['channel'].str.contains('gram')]</code>. In SQL this is <code>LIKE '%gram%'</code>. If the column has missing values, add <code>na=False</code>, otherwise NaN appears in the mask and the filter raises an error.</p>
<h3>map: replacing values using a dictionary</h3>
<pre><code>regions = {'Алматы': 'Оңтүстік', 'Шымкент': 'Оңтүстік', 'Астана': 'Солтүстік'}   # 'Оңтүстік' = south, 'Солтүстік' = north
customers['region'] = customers['city'].map(regions)</code></pre>
<p>Each city gets its region from the dictionary. A value that is not in the dictionary becomes <code>NaN</code>: check <code>.isna().sum()</code> after map. This is a simple form of Excel's XLOOKUP, or of a JOIN with a small reference table.</p>
<h3>np.where: a condition with two outcomes</h3>
<pre><code>import numpy as np
orders['size'] = np.where(orders['amount'] &gt;= 3000, 'big', 'small')</code></pre>
<p><code>np.where(condition, if true, if false)</code> is a vectorized IF, SQL's <code>CASE WHEN ... THEN ... ELSE ... END</code>. It is shorter and much faster than <code>.apply(lambda ...)</code>. Be careful: for a missing amount the condition is false, so it ends up as <code>'small'</code>. Remove the missing values first.</p>
<h3>pd.cut: splitting numbers into intervals</h3>
<p>When you need more than two groups, <code>pd.cut</code> is handy:</p>
<pre><code>clean['bucket'] = pd.cut(clean['amount'],
                         bins=[0, 2000, 3000, 20000],
                         labels=['low', 'mid', 'high'])</code></pre>
<table>
<tr><th>Interval</th><th>Label</th><th>Example</th></tr>
<tr><td>0 &lt; amount ≤ 2000</td><td>low</td><td>1850, 2000</td></tr>
<tr><td>2000 &lt; amount ≤ 3000</td><td>mid</td><td>2150, 3000</td></tr>
<tr><td>3000 &lt; amount ≤ 20000</td><td>high</td><td>3100</td></tr>
</table>
<p>4 edges give 3 intervals, so there is one label fewer than edges. By default the right edge <b>belongs</b> to the interval (2000 → low). A value outside the edges becomes NaN.</p>
<h3>shift and pct_change: comparing with the previous row</h3>
<p>To answer "how much did it grow since yesterday?", you need to put the previous row's value next to each row. <code>shift(1)</code> moves the column one row down:</p>
<pre><code>alm['prev'] = alm['revenue'].shift(1)
alm['diff'] = alm['revenue'] - alm['prev']
alm['growth'] = alm['revenue'].pct_change() * 100</code></pre>
<table>
<tr><th>day</th><th>revenue</th><th>prev</th><th>diff</th><th>growth</th></tr>
<tr><td>2024-09-01</td><td>120</td><td>NaN</td><td>NaN</td><td>NaN</td></tr>
<tr><td>2024-09-02</td><td>135</td><td>120</td><td>15</td><td>12.5</td></tr>
<tr><td>2024-09-03</td><td>110</td><td>135</td><td>−25</td><td>−18.5</td></tr>
</table>
<p><code>pct_change()</code> is the ready-made form of the formula <code>(new − old) / old</code>. The first row has no previous value, hence NaN. Two rules: <b>sort</b> by date first, and if one table holds several regions, do not mix them: <code>daily.groupby('region')['revenue'].pct_change()</code>.</p>
<h3>resample: grouping by time</h3>
<p>When the date has a real date type, you can put it in the index and aggregate to any period:</p>
<pre><code>clean['order_date'] = pd.to_datetime(clean['order_date'])
monthly = clean.set_index('order_date').resample('MS')['amount'].sum()
# 2024-01-01    31950
# 2024-02-01    ...</code></pre>
<p><code>'MS'</code> is a month (labeled by the first day of the month), <code>'W'</code> is a week, <code>'D'</code> is a day. The difference from a groupby on <code>.str[:7]</code>: resample also shows a period with no orders (as 0), so the time series has no "holes".</p>
<h3>The difference between dates</h3>
<pre><code>df['days'] = (df['order_date'] - df['signup_date']).dt.days</code></pre>
<p>Subtracting one date column from another gives a time span (Timedelta), and <code>.dt.days</code> takes the number of days from it. Both columns must go through <code>pd.to_datetime</code> first: you cannot subtract text.</p>
<div class="tip">Every time you make a new column, check it with <code>value_counts()</code> or <code>describe()</code>: is the number of groups reasonable, are there unexpected NaNs?</div>
<h3>Common mistakes</h3>
<ul>
<li><b>Using shift without sorting.</b> The "previous row" turns out to be a random day.</li>
<li><b>Mixing several groups.</b> Astana's first day gets compared with Almaty's last day. Use <code>groupby</code>.</li>
<li><b>The wrong number of labels in pd.cut.</b> There must be one label fewer than edges, otherwise you get a <code>ValueError</code>.</li>
<li><b>resample on a text column.</b> First <code>pd.to_datetime</code>, then <code>set_index</code>.</li>
<li><b>Not noticing the NaNs after map.</b> Cities missing from the dictionary silently stay empty.</li>
</ul>`,
        ex: [
          { prompt: 'Add two columns to the <code>customers</code> table: <code>region</code>, the region of the city (from the <code>regions</code> dictionary, with <code>map</code>), and <code>is_social</code>, which is <code>True</code> when the channel name contains <code>gram</code> (<code>.str.contains</code>).', check: { tests: REF + "assert 'region' in customers.columns, 'There is no region column'\nassert customers['region'].tolist() == _c['city'].map(regions).tolist(), 'region = the city column mapped through the regions dictionary'\nassert 'is_social' in customers.columns, 'There is no is_social column'\nassert [bool(v) for v in customers['is_social']] == [v == 'instagram' for v in _c['channel']], 'is_social: rows where channel contains gram should be True'" }, hints: ["<code>customers['city'].map(regions)</code>", "<code>customers['channel'].str.contains('gram')</code>"] },
          { prompt: 'You are given the clean orders (<code>clean</code>). Add two columns: <code>size</code>, which is <code>\'big\'</code> when the amount is 3000 or more and <code>\'small\'</code> otherwise (<code>np.where</code>); <code>bucket</code>, made with <code>pd.cut</code> using the edges <code>[0, 2000, 3000, 20000]</code> and the labels <code>low</code>, <code>mid</code>, <code>high</code>.', check: { tests: REF + "assert 'size' in clean.columns and 'bucket' in clean.columns, 'You need the size and bucket columns'\nassert len(clean) == len(_clean), 'Do not change the rows of the clean table'\nassert list(clean['size']) == ['big' if a >= 3000 else 'small' for a in _clean['amount']], 'size: big when the amount is >= 3000, otherwise small'\n_b = _pd.cut(_clean['amount'], bins=[0, 2000, 3000, 20000], labels=['low', 'mid', 'high'])\nassert [str(v) for v in clean['bucket']] == [str(v) for v in _b], 'bucket: edges [0, 2000, 3000, 20000], labels low, mid, high'" }, hints: ["<code>np.where(clean['amount'] &gt;= 3000, 'big', 'small')</code>", "<code>pd.cut(clean['amount'], bins=[0, 2000, 3000, 20000], labels=['low', 'mid', 'high'])</code>"] },
          { prompt: '<code>alm</code> is the daily revenue of Almaty, sorted by day. Add two columns: <code>prev</code>, the previous day\'s revenue (<code>shift</code>), and <code>growth</code>, the change relative to the previous day <b>in percent</b> (<code>pct_change</code>). Store the day (text) with the largest growth in <code>best_day</code>.', check: { tests: "import pandas as _pd\n_a = _pd.read_csv('daily_sales.csv')\n_a = _a[_a['region'] == 'Алматы'].sort_values('day')\n_g = _a['revenue'].pct_change() * 100\nassert 'prev' in alm.columns and 'growth' in alm.columns, 'You need the prev and growth columns'\nassert len(alm) == 10, 'alm should have 10 days'\nassert alm['prev'].isna().sum() == 1 and alm['prev'].iloc[1:].tolist() == _a['revenue'].iloc[:-1].tolist(), 'prev = revenue.shift(1)'\nassert alm['growth'].isna().sum() == 1, 'growth of the first day should be NaN'\nassert [round(float(v), 4) for v in alm['growth'].iloc[1:]] == [round(float(v), 4) for v in _g.iloc[1:]], 'growth = pct_change() * 100 (in percent)'\nassert str(best_day)[:10] == str(_a.loc[_g.idxmax(), 'day']), 'best_day: the day value of the row with the largest growth (idxmax)'" }, hints: ["<code>alm['revenue'].shift(1)</code>", "<code>alm['revenue'].pct_change() * 100</code>", "<code>alm.loc[alm['growth'].idxmax(), 'day']</code>"] },
          { prompt: 'Calculate the monthly revenue of the clean orders with <code>resample</code> and store it in the Series <code>monthly</code>. First convert <code>order_date</code> to a date type and put it in the index.', check: { tests: REF + "_m = _clean.groupby(_clean['order_date'].str[:7])['amount'].sum()\nassert len(monthly) == len(_m), 'monthly should have 6 months'\nassert [round(float(v)) for v in monthly.values] == [round(float(v)) for v in _m.values], 'The monthly totals are wrong: sum() of the amount column'\nassert str(monthly.index[0])[:7] == '2024-01', 'The index should have a date type: pd.to_datetime, then set_index'" }, hints: ["<code>clean['order_date'] = pd.to_datetime(clean['order_date'])</code>", "<code>clean.set_index('order_date').resample('MS')['amount'].sum()</code>"] },
          { prompt: '<code>df</code> is the clean orders merged with the customer data. Add a <code>days</code> column: the number of days from the customer\'s signup (<code>signup_date</code>) to the order (<code>order_date</code>). Then store in <code>same_day</code> the number of orders placed on the very day of signup (0 days).', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_days = (_pd.to_datetime(_d['order_date']) - _pd.to_datetime(_d['signup_date'])).dt.days\nassert 'days' in df.columns, 'There is no days column'\nassert [int(v) for v in df['days']] == [int(v) for v in _days], 'days = (order_date - signup_date).dt.days; pd.to_datetime first'\nassert int(same_day) == int((_days == 0).sum()), 'same_day: the number of rows where days == 0'" }, hints: ["Convert both columns to dates: <code>pd.to_datetime(df['order_date'])</code>.", "<code>(d2 - d1).dt.days</code>", "<code>(df['days'] == 0).sum()</code>"] }
        ]
      },
      'pd-11': {
        title: 'NumPy: 2D arrays, axis and broadcasting',
        body: `
<p>In lesson pd-8 you met the one-dimensional array. Real data is mostly <b>two-dimensional</b>: rows and columns. Inside a DataFrame there is exactly such a 2D array, and machine learning libraries (scikit-learn) take data in this form. So you have to understand <code>shape</code>, <code>axis</code> and broadcasting.</p>
<h3>shape and reshape</h3>
<p>The sales of three cities over four weeks are given in one row:</p>
<pre><code>import numpy as np

sales = np.array([120, 135, 110, 160,    # Алматы
                   90,  95, 105,  85,    # Астана
                   60,  70,  65,  80])   # Шымкент
print(sales.shape)        # (12,)  — one dimension, 12 elements

m = sales.reshape(3, 4)   # 3 rows (cities), 4 columns (weeks)
print(m.shape)            # (3, 4)
print(m[0, 1])            # 135: row 0, column 1
print(m[1])               # [ 90  95 105  85]: the row of Астана
print(m[:, 0])            # [120  90  60]: the column of the first week</code></pre>
<p><code>shape</code> is <code>(rows, columns)</code>. <code>reshape</code> does not change the elements, it only rearranges them, so the number of elements has to match: 3 × 4 = 12. If you write one dimension as <code>-1</code>, NumPy works it out itself: <code>sales.reshape(3, -1)</code>.</p>
<h3>axis: which direction do we compute in?</h3>
<table>
<tr><th>Code</th><th>What it does</th><th>Result</th></tr>
<tr><td><code>m.sum()</code></td><td>adds everything</td><td>1175</td></tr>
<tr><td><code>m.sum(axis=0)</code></td><td>moves down along the rows and adds up each <b>column</b></td><td><code>[270 300 280 325]</code>: the total of each week</td></tr>
<tr><td><code>m.sum(axis=1)</code></td><td>moves right along the columns and adds up each <b>row</b></td><td><code>[525 375 275]</code>: the total of each city</td></tr>
</table>
<p>A way to remember it: <code>axis</code> is the dimension that <b>disappears</b>. Apply <code>axis=0</code> to a <code>(3, 4)</code> array, and the 3 disappears, leaving 4 values. With <code>axis=1</code> the 4 disappears, leaving 3 values. <code>mean</code>, <code>max</code>, <code>min</code> and <code>std</code> all work this way. It is the same in pandas: <code>df.sum(axis=1)</code> gives the sum of each row.</p>
<h3>Broadcasting</h3>
<p>When you operate on arrays of different shapes, NumPy "stretches" the smaller one to the larger one. This is called broadcasting.</p>
<pre><code>m * 1.12                      # each element × 1.12 (the number is stretched over the whole array)

week_total = m.sum(axis=0)    # shape (4,)
share = m / week_total        # (3, 4) / (4,) → each row is divided by the 4 values
print(share[:, 0])            # [0.444 0.333 0.222]: the cities' shares in week 1</code></pre>
<p>The rule: shapes are compared <b>from the right</b>. If the dimensions are equal or one of them is 1, the operation works. <code>(3, 4)</code> and <code>(4,)</code> are compatible: their last dimensions are the same. But <code>(3, 4)</code> and <code>(3,)</code> are not: 4 ≠ 3.</p>
<pre><code>city_total = m.sum(axis=1)                    # shape (3,)
m / city_total                                # ValueError: the shapes do not match
m / city_total.reshape(3, 1)                  # (3, 4) / (3, 1) → works
m / m.sum(axis=1, keepdims=True)              # the same thing, written shorter</code></pre>
<h3>Creating arrays: arange, linspace, random</h3>
<pre><code>np.arange(0, 10, 2)        # [0 2 4 6 8]            with a step, the end is excluded
np.linspace(0, 1, 5)       # [0. 0.25 0.5 0.75 1.]  5 evenly spaced points, the end is included
np.zeros((2, 3))           # a 2 × 3 array of zeros

rng = np.random.default_rng(42)
rng.integers(1, 7, size=5)       # 5 whole numbers from 1 to 6
rng.normal(2500, 400, size=3)    # 3 numbers with mean 2500 and spread 400</code></pre>
<p><code>42</code> is the <b>seed</b> (the starting value). With the same seed, the "random" numbers come out the same on every run. This is needed for reproducibility: a colleague runs your code and gets exactly the same numbers. Without a seed the result is different every time.</p>
<h3>Standard deviation: NumPy and pandas</h3>
<p>From the same data the two libraries give two different numbers:</p>
<pre><code>a = np.array([2150, 2250, 2550, 2050, 3100])
a.std()                 # 378.9  (divides by n,   ddof=0)
a.std(ddof=1)           # 423.7  (divides by n−1, ddof=1)
pd.Series(a).std()      # 423.7  (pandas uses ddof=1 by default)</code></pre>
<p><code>ddof=0</code> assumes the data is the <b>whole population</b>. <code>ddof=1</code> assumes the data is a <b>sample</b> taken from a larger population, and reduces the divisor by one. An analyst's data is usually a sample, so <code>ddof=1</code> is used more often. The most important thing is to know which one you took: if the numbers of two reports do not match, this is the first suspect.</p>
<div class="tip">When you get an error, the first step is <code>print(a.shape)</code>. Most NumPy errors come from a shape that is not what you expected.</div>
<h3>Common mistakes</h3>
<ul>
<li><b>Reading axis backwards.</b> <code>axis=0</code> does not "add up the rows": it moves along the rows and gives one value per column.</li>
<li><b>The element count does not match in reshape.</b> You cannot turn 12 elements into <code>(5, 2)</code>.</li>
<li><b>Dividing <code>(3, 4)</code> by <code>(3,)</code>.</b> To divide row by row you need <code>keepdims=True</code> or <code>reshape(3, 1)</code>.</li>
<li><b>Mixing up arange and linspace.</b> In arange the third argument is the step, in linspace it is the number of points.</li>
<li><b>Not setting a seed.</b> You will not be able to repeat the result tomorrow.</li>
</ul>`,
        ex: [
          { prompt: '<code>sales</code> holds the sales of three cities (Алматы, Астана, Шымкент) over four weeks in one row. Turn it into an array <code>m</code> of 3 rows × 4 columns. Then store the total of each city in <code>by_city</code> and the total of each week in <code>by_week</code>.', check: { tests: "assert m.shape == (3, 4), 'm should have shape (3, 4): sales.reshape(3, 4)'\nassert m[1].tolist() == [90, 95, 105, 85], 'The second row of m should be the sales of Астана'\nassert list(by_city) == [525, 375, 275], 'by_city: the sum of each row, axis=1'\nassert list(by_week) == [270, 300, 280, 325], 'by_week: the sum of each column, axis=0'" }, hints: ['<code>sales.reshape(3, 4)</code>', 'Each city is one row: <code>m.sum(axis=1)</code>. Each week is one column: <code>m.sum(axis=0)</code>.'] },
          { prompt: 'You are given the array <code>m</code> (rows are cities, columns are weeks). Using broadcasting, calculate the array <code>share</code>: each city\'s share of the total sales <b>of that week</b> (each column should add up to 1). Then store in <code>row_share</code> each week\'s share of the city\'s <b>own</b> total sales (each row adds up to 1).', check: { tests: "import numpy as _np\n_m = _np.array([[120, 135, 110, 160], [90, 95, 105, 85], [60, 70, 65, 80]])\nassert share.shape == (3, 4), 'share should have shape (3, 4)'\nassert _np.allclose(share, _m / _m.sum(axis=0)), 'share = m / m.sum(axis=0): each column adds up to 1'\nassert row_share.shape == (3, 4), 'row_share should have shape (3, 4)'\nassert _np.allclose(row_share, _m / _m.sum(axis=1, keepdims=True)), 'row_share: divide m by the row totals (keepdims=True or reshape(3, 1))'" }, hints: ['The week totals: <code>m.sum(axis=0)</code>, shape (4,). <code>m / m.sum(axis=0)</code> works straight away.', 'The row totals have shape (3,): it has to become (3, 1). <code>m.sum(axis=1, keepdims=True)</code>'] },
          { prompt: '<code>a</code> holds the amounts of five checks. Calculate the standard deviation in two ways: <code>std_pop</code> for a population (the NumPy default, <code>ddof=0</code>) and <code>std_sample</code> for a sample (<code>ddof=1</code>). Then store the value of pandas\' default <code>.std()</code> in <code>std_pd</code>.', check: { tests: "assert abs(float(std_pop) - 378.946) < 0.01, 'std_pop = a.std() (ddof=0)'\nassert abs(float(std_sample) - 423.674) < 0.01, 'std_sample = a.std(ddof=1)'\nassert abs(float(std_pd) - float(std_sample)) < 1e-6, 'std_pd = pd.Series(a).std(): it should equal std_sample'" }, hints: ['<code>a.std()</code> and <code>a.std(ddof=1)</code>', '<code>pd.Series(a).std()</code>'] },
          { prompt: 'Create three arrays: <code>ids</code>, the whole numbers from 1001 to 1010 (<code>np.arange</code>); <code>grid</code>, 5 evenly spaced points from 0 to 1 (<code>np.linspace</code>); <code>dice</code>, 1000 random whole numbers from 1 to 6 from a generator with seed 42 (<code>rng.integers</code>).', check: { tests: "import numpy as _np\nassert list(ids) == list(range(1001, 1011)), 'ids: np.arange(1001, 1011), the last bound is excluded'\nassert _np.allclose(grid, [0, 0.25, 0.5, 0.75, 1]), 'grid: np.linspace(0, 1, 5)'\nassert len(dice) == 1000, 'dice should have 1000 numbers: size=1000'\nassert dice.min() >= 1 and dice.max() <= 6, 'The dice values should be from 1 to 6: rng.integers(1, 7, ...)'\nassert (dice == _np.random.default_rng(42).integers(1, 7, size=1000)).all(), 'dice: create rng with seed 42 and make rng.integers(1, 7, size=1000) its first call'" }, hints: ['<code>np.arange(1001, 1011)</code>: for 1010 to be included, the bound is 1011.', '<code>np.linspace(0, 1, 5)</code>', '<code>rng.integers(1, 7, size=1000)</code>: the upper bound is excluded.'] },
          { prompt: 'The array <code>X</code> has shape <code>(150, 5)</code>: 150 orders, 5 numeric columns. What is the shape of the result of <code>X.mean(axis=0)</code>, and what does it mean?', options: ['(150,): the mean of each order', '(5,): the mean of each column', '(150, 5): it does not change', '(): a single number'], explain: 'axis=0 is the dimension that disappears: we move along the 150 rows, and one value is left per column. The result is (5,). With axis=1 it would be (150,).' }
        ]
      },
      'pd-gate': {
        title: 'Module exam: pandas',
        body: `<p>Final tasks: filtering, cleaning, joining and grouping in one analysis.</p>`,
        ex: [
          { prompt: 'How do you write SQL\'s <code>COUNT(DISTINCT customer_id)</code> in pandas?', explain: 'nunique() gives the number of unique values, while count() counts all non-empty values.' },
          { prompt: 'Why does <code>df[df[\'a\'] &gt; 1 and df[\'b\'] &lt; 5]</code> raise an error?', options: ['The columns do not exist', 'A Series needs &amp; instead of and, and the conditions must be in parentheses', 'and only works with numbers', 'It does not raise an error'], explain: 'Correct: df[(df[\'a\'] &gt; 1) &amp; (df[\'b\'] &lt; 5)].' },
          { prompt: 'The clean-order rule (as in lesson pd-5): <code>status == \'paid\'</code>, <code>amount</code> not empty and less than 20,000. For each city (<code>city</code>), compute from the clean orders <code>customers</code> (unique customers), <code>revenue</code> and <code>aov</code> (revenue / number of orders, rounded to a whole number), and build the DataFrame <code>report</code>. <code>city</code> should be a regular column, sorted by revenue in descending order.', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_r = _d.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index().sort_values('revenue', ascending=False)\nassert 'city' in report.columns, 'city should be a regular column'\nassert {'customers', 'revenue', 'aov'} <= set(report.columns), 'You need customers, revenue and aov columns'\nassert report['city'].tolist() == _r['city'].tolist(), 'Wrong order of cities'\nassert report['customers'].tolist() == _r['customers'].tolist(), 'customers: use nunique'\nassert report['revenue'].round().tolist() == _r['revenue'].round().tolist(), 'revenue is wrong: did you take the clean orders?'\nassert [round(float(a)) for a in report['aov']] == [round(r / n) for r, n in zip(_r['revenue'], _r['n'])], 'aov = revenue / number of orders'" } }
        ]
      }
    }
  });
})();
