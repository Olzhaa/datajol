// M2.2 pandas & NumPy. Real pandas 2.2 runs in the Pyodide worker; CSV files come from content/csv.js
// (orders.csv, customers.csv from the cafe dataset; daily_sales.csv from metrics).
(function () {
  const LOAD = "import pandas as pd\norders = pd.read_csv('orders.csv')\n";
  const REF = "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n";
  DJ.modules['m2-2'] = {
    intro: 'pandas — Python-дағы деректер талдауының негізгі кітапханасы: кестені (DataFrame) жүктеу, сүзу, топтау, біріктіру және тазалау. Бұл модульде нақты pandas браузеріңізде іске қосылады. Деректер — «Бірінші кофе» желісінің файлдары: orders.csv, customers.csv және daily_sales.csv. SQL-ден білетін әр әрекеттің pandas баламасын үйренесіз.',
    lessons: [
      {
        id: 'pd-1', title: 'DataFrame және CSV жүктеу', minutes: 12,
        body: `
<p><b>DataFrame</b> — жолдар мен бағандардан тұратын кесте (Excel парағы немесе SQL кестесі сияқты). Әр баған — <b>Series</b>.</p>
<pre><code>import pandas as pd

df = pd.DataFrame({
    'city': ['Алматы', 'Астана', 'Шымкент'],
    'orders': [120, 95, 40]
})
print(df)
print(df.shape)     # (3, 2): 3 жол, 2 баған</code></pre>
<h3>CSV файлын оқу</h3>
<pre><code>orders = pd.read_csv('orders.csv')
orders.head()       # алғашқы 5 жол
orders.info()       # бағандар, типтер, бос мәндер
orders.describe()   # сандық бағандардың статистикасы</code></pre>
<table>
<tr><th>pandas</th><th>SQL</th></tr>
<tr><td><code>df.head(10)</code></td><td><code>SELECT * FROM t LIMIT 10</code></td></tr>
<tr><td><code>len(df)</code></td><td><code>SELECT COUNT(*) FROM t</code></td></tr>
<tr><td><code>df.columns</code></td><td>бағандар тізімі</td></tr>
</table>
<div class="tip">Бірінші рет <code>import pandas</code> жазғанда кітапхана жүктеледі (бірнеше секунд). Кейін бірден жұмыс істейді.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: 'Үш қаланың деректерінен <code>df</code> DataFrame жасаңыз: <code>city</code> бағаны <code>[\'Алматы\', \'Астана\', \'Шымкент\']</code>, <code>orders</code> бағаны <code>[120, 95, 40]</code>. Сосын <code>print(df)</code>.', starter: 'import pandas as pd\n\n', solution: "import pandas as pd\n\ndf = pd.DataFrame({'city': ['Алматы', 'Астана', 'Шымкент'], 'orders': [120, 95, 40]})\nprint(df)", check: { tests: "assert isinstance(df, pd.DataFrame), 'df DataFrame болуы керек'\nassert list(df.columns) == ['city', 'orders'], 'Бағандар: city, orders'\nassert df['orders'].tolist() == [120, 95, 40], 'orders мәндері [120, 95, 40] болуы керек'" }, hints: ['<code>pd.DataFrame({\'city\': [...], \'orders\': [...]})</code>'] },
          { type: 'python', xp: 15, prompt: '<code>orders.csv</code> файлын <code>orders</code> айнымалысына оқыңыз. Жолдар санын <code>n_rows</code>, бағандар санын <code>n_cols</code> айнымалысына жазып, шығарыңыз.', starter: 'import pandas as pd\n\n', solution: "import pandas as pd\n\norders = pd.read_csv('orders.csv')\nn_rows, n_cols = orders.shape\nprint(n_rows, n_cols)", check: { tests: "assert n_rows == 150, 'Жолдар саны дұрыс емес: orders.shape қолданыңыз'\nassert n_cols == 5, 'Бағандар саны дұрыс емес'" }, hints: ['<code>orders.shape</code> (жолдар, бағандар) кортежін береді.'] }
        ]
      },
      {
        id: 'pd-2', title: 'Бағандар, жолдар және сүзгі', minutes: 15,
        body: `
<pre><code>orders['amount']                  # бір баған (Series)
orders[['id', 'amount']]          # бірнеше баған (DataFrame)
orders.loc[0, 'amount']           # жол белгісі + баған атауы
orders.iloc[0:3]                  # позиция бойынша алғашқы 3 жол</code></pre>
<h3>Сүзгі (WHERE)</h3>
<pre><code>paid = orders[orders['status'] == 'paid']
big  = orders[(orders['status'] == 'paid') &amp; (orders['amount'] &gt; 3000)]
two  = orders[orders['customer_id'].isin([1, 2])]</code></pre>
<div class="tip">pandas-та <code>and</code>/<code>or</code> емес, <code>&amp;</code> және <code>|</code> жазылады, ал әр шарт <b>жақшада</b> болуы керек.</div>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>WHERE a = 1 AND b &gt; 2</code></td><td><code>df[(df['a'] == 1) &amp; (df['b'] &gt; 2)]</code></td></tr>
<tr><td><code>WHERE x IN (1, 2)</code></td><td><code>df[df['x'].isin([1, 2])]</code></td></tr>
<tr><td><code>WHERE x IS NULL</code></td><td><code>df[df['x'].isna()]</code></td></tr>
</table>`,
        exercises: [
          { type: 'python', xp: 15, prompt: 'Тек төленген (<code>status == \'paid\'</code>) тапсырыстарды <code>paid</code> айнымалысына жазыңыз және олардың санын шығарыңыз.', starter: LOAD + '\n', solution: LOAD + "paid = orders[orders['status'] == 'paid']\nprint(len(paid))", check: { tests: REF + "assert len(paid) == (_o['status'] == 'paid').sum(), 'paid ішінде тек status == \"paid\" жолдары болуы керек'\nassert set(paid['status']) == {'paid'}, 'Басқа статустар қалып қойды'" }, hints: ["<code>orders[orders['status'] == 'paid']</code>"] },
          { type: 'python', xp: 20, prompt: 'Төленген және сомасы 3000-нан үлкен тапсырыстарды <code>big</code> айнымалысына жазыңыз. Тек <code>id</code>, <code>customer_id</code>, <code>amount</code> бағандары қалсын.', starter: LOAD + '\n', solution: LOAD + "big = orders[(orders['status'] == 'paid') & (orders['amount'] > 3000)][['id', 'customer_id', 'amount']]\nprint(big)", check: { tests: REF + "_b = _o[(_o['status'] == 'paid') & (_o['amount'] > 3000)]\nassert list(big.columns) == ['id', 'customer_id', 'amount'], 'Бағандар: id, customer_id, amount'\nassert sorted(big['id']) == sorted(_b['id']), 'Жолдар саны немесе сүзгі дұрыс емес'" }, hints: ['Екі шартты <code>&amp;</code> арқылы, әрқайсысын жақшаға алыңыз.', "Соңынан <code>[['id', 'customer_id', 'amount']]</code>"] }
        ]
      },
      {
        id: 'pd-3', title: 'Жаңа бағандар және сұрыптау', minutes: 12,
        body: `
<p>Жаңа баған барлық жолға бірден есептеледі (цикл керек емес, бұл <b>векторлау</b>):</p>
<pre><code>orders['amount_k'] = orders['amount'] / 1000
orders['month'] = orders['order_date'].str[:7]        # '2024-03-05' → '2024-03'
orders['size'] = orders['amount'].apply(lambda x: 'big' if x &gt; 3000 else 'small')</code></pre>
<h3>Сұрыптау (ORDER BY)</h3>
<pre><code>orders.sort_values('amount', ascending=False).head(5)   # ең үлкен 5
orders.nlargest(5, 'amount')                            # дәл сол
orders.sort_values(['customer_id', 'order_date'])</code></pre>
<p>Атауын өзгерту: <code>df.rename(columns={'amount': 'sum'})</code>. Бағанды жою: <code>df.drop(columns=['size'])</code>.</p>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>orders</code>-ке <code>month</code> бағанын қосыңыз: <code>order_date</code>-тың алғашқы 7 таңбасы (мысалы <code>2024-03</code>).', starter: LOAD + '\n', solution: LOAD + "orders['month'] = orders['order_date'].str[:7]\nprint(orders.head())", check: { tests: "assert 'month' in orders.columns, 'month бағаны жоқ'\nassert (orders['month'] == orders['order_date'].str[:7]).all(), 'month = order_date-тың алғашқы 7 таңбасы'" }, hints: ["<code>orders['order_date'].str[:7]</code>"] },
          { type: 'python', xp: 20, prompt: 'Төленген тапсырыстардың ішінен сомасы ең үлкен 5 тапсырысты кему ретімен <code>top5</code> айнымалысына жазыңыз.', starter: LOAD + '\n', solution: LOAD + "paid = orders[orders['status'] == 'paid']\ntop5 = paid.sort_values('amount', ascending=False).head(5)\nprint(top5)", check: { tests: REF + "_t = _o[_o['status'] == 'paid'].sort_values('amount', ascending=False).head(5)\nassert len(top5) == 5, 'top5 ішінде 5 жол болуы керек'\nassert top5['amount'].tolist() == _t['amount'].tolist(), 'Сомалар кему ретімен болуы керек'\nassert set(top5['status']) == {'paid'}, 'Тек paid тапсырыстар'" }, hints: ["<code>sort_values('amount', ascending=False).head(5)</code>"] }
        ]
      },
      {
        id: 'pd-4', title: 'groupby: топтау және агрегат', minutes: 15,
        body: `
<p><code>groupby</code> — SQL-дегі <code>GROUP BY</code>. Үш қадам: бөлу (split) → есептеу (apply) → біріктіру (combine).</p>
<pre><code># бір агрегат → Series
orders.groupby('status')['amount'].sum()

# бірнеше агрегат → DataFrame
orders.groupby('customer_id').agg(
    orders=('id', 'count'),
    revenue=('amount', 'sum'),
    avg_check=('amount', 'mean')
).reset_index()</code></pre>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>COUNT(*)</code></td><td><code>'count'</code> немесе <code>.size()</code></td></tr>
<tr><td><code>COUNT(DISTINCT x)</code></td><td><code>'nunique'</code></td></tr>
<tr><td><code>HAVING SUM(a) &gt; 10</code></td><td>агрегаттан кейін сүзгі: <code>res[res['revenue'] &gt; 10]</code></td></tr>
</table>
<div class="tip"><code>reset_index()</code> топтау бағанын индекстен қайтадан кәдімгі бағанға айналдырады. Нәтижені әрі қарай біріктіру үшін ыңғайлы.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Төленген тапсырыстар бойынша әр айдың табысын есептеңіз: <code>monthly</code> — индексі ай (<code>order_date</code>-тың алғашқы 7 таңбасы), мәні <code>amount</code> қосындысы болатын Series.', starter: LOAD + '\n', solution: LOAD + "paid = orders[orders['status'] == 'paid'].copy()\npaid['month'] = paid['order_date'].str[:7]\nmonthly = paid.groupby('month')['amount'].sum()\nprint(monthly)", check: { tests: REF + "_p = _o[_o['status'] == 'paid']\n_m = _p.groupby(_p['order_date'].str[:7])['amount'].sum()\nassert len(monthly) == 6, 'Алты ай болуы керек'\nassert [round(float(v)) for v in monthly.values] == [round(float(v)) for v in _m.values], 'Айлық сомалар сәйкес емес: тек paid тапсырыстарды алдыңыз ба?'" }, hints: ["Алдымен <code>month</code> бағанын қосыңыз.", "<code>paid.groupby('month')['amount'].sum()</code>"] },
          { type: 'python', xp: 25, prompt: 'Төленген тапсырыстар бойынша әр клиентке <code>orders</code> (тапсырыс саны) және <code>revenue</code> (сома) есептеп, <code>by_cust</code> DataFrame-ін жасаңыз (<code>customer_id</code> кәдімгі баған болсын). Табыс бойынша кему ретімен сұрыптаңыз.', starter: LOAD + '\n', solution: LOAD + "paid = orders[orders['status'] == 'paid']\nby_cust = paid.groupby('customer_id').agg(orders=('id', 'count'), revenue=('amount', 'sum')).reset_index().sort_values('revenue', ascending=False)\nprint(by_cust.head())", check: { tests: REF + "_g = _o[_o['status'] == 'paid'].groupby('customer_id').agg(orders=('id', 'count'), revenue=('amount', 'sum')).reset_index().sort_values('revenue', ascending=False)\nassert 'customer_id' in by_cust.columns, 'customer_id баған болуы керек: reset_index() қолданыңыз'\nassert {'orders', 'revenue'} <= set(by_cust.columns), 'orders және revenue бағандары керек'\nassert len(by_cust) == len(_g), 'Клиенттер саны дұрыс емес'\nassert by_cust['revenue'].round().tolist() == _g['revenue'].round().tolist(), 'revenue мәндері немесе реті дұрыс емес'" }, hints: ["<code>.agg(orders=('id', 'count'), revenue=('amount', 'sum'))</code>", "<code>.reset_index().sort_values('revenue', ascending=False)</code>"] }
        ]
      },
      {
        id: 'pd-5', title: 'Бос мәндер және тазалау', minutes: 15,
        body: `
<pre><code>orders.isna().sum()                  # әр бағандағы бос мәндер саны
orders.dropna(subset=['amount'])     # amount бос жолдарды алып тастау
orders['amount'].fillna(0)           # бос мәнді 0-мен толтыру (абайлаңыз!)
orders.drop_duplicates()             # қайталанған жолдар
orders['amount'].astype(int)         # типті өзгерту</code></pre>
<h3>Шектен тыс мәндер (outliers)</h3>
<pre><code>q1, q3 = orders['amount'].quantile([0.25, 0.75])
iqr = q3 - q1
outliers = orders[orders['amount'] &gt; q3 + 1.5 * iqr]</code></pre>
<div class="tip">Бос соманы 0-мен толтыру орташа чекті жасанды төмендетеді. Әдетте оны алып тастайды немесе себебін анықтайды. Шешіміңізді әрқашан жазып қойыңыз.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>amount</code> бағанындағы бос мәндер санын <code>null_count</code> айнымалысына жазыңыз.', starter: LOAD + '\n', solution: LOAD + "null_count = orders['amount'].isna().sum()\nprint(null_count)", check: { tests: "assert int(null_count) == 6, 'Бос мәндер саны дұрыс емес: isna().sum() қолданыңыз'" }, hints: ["<code>orders['amount'].isna().sum()</code>"] },
          { type: 'python', xp: 25, prompt: 'Таза тапсырыстар кестесін <code>clean</code> айнымалысына жасаңыз: <code>status == \'paid\'</code>, <code>amount</code> бос емес және 20 000-нан кіші. Сосын <code>amount</code> типін <code>int</code>-ке айналдырыңыз және орташа чекті шығарыңыз.', starter: LOAD + '\n', solution: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\nclean['amount'] = clean['amount'].astype(int)\nprint(round(clean['amount'].mean()))", check: { tests: REF + "assert len(clean) == len(_clean), 'Жолдар саны дұрыс емес: үш шартты тексеріңіз'\nassert clean['amount'].isna().sum() == 0, 'Бос мәндер қалды'\nassert clean['amount'].max() < 20000, 'Шектен тыс мән қалды'\nassert str(clean['amount'].dtype).startswith('int'), 'amount типі int болуы керек: astype(int)'" }, hints: ["<code>orders['amount'].notna()</code>", 'Көшірме жасаңыз: <code>.copy()</code>, сосын <code>astype(int)</code>.'] }
        ]
      },
      {
        id: 'pd-6', title: 'merge: кестелерді біріктіру', minutes: 14,
        body: `
<p><code>merge</code> — SQL-дегі <code>JOIN</code>.</p>
<pre><code>customers = pd.read_csv('customers.csv')

df = orders.merge(customers, left_on='customer_id', right_on='id',
                  how='left', suffixes=('_order', '_customer'))</code></pre>
<table>
<tr><th>how</th><th>SQL</th></tr>
<tr><td><code>'inner'</code> (әдепкі)</td><td><code>INNER JOIN</code></td></tr>
<tr><td><code>'left'</code></td><td><code>LEFT JOIN</code></td></tr>
<tr><td><code>'outer'</code></td><td><code>FULL OUTER JOIN</code></td></tr>
</table>
<p>Кілт атаулары бірдей болса: <code>on='customer_id'</code>. Екі кестеде де <code>id</code> бағаны болғандықтан, <code>suffixes</code> атауларды ажыратады.</p>
<div class="tip">Біріктіргеннен кейін жолдар санын тексеріңіз: <code>len(df)</code> күткеннен көп болса, кілт қайталанып тұр.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Таза тапсырыстарды (<code>clean</code> дайын) <code>customers.csv</code>-мен біріктіріп, әр арнаның (<code>channel</code>) табысын есептеңіз. Нәтиже: <code>by_channel</code> Series, кему ретімен.', starter: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ncustomers = pd.read_csv('customers.csv')\n\n", solution: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ncustomers = pd.read_csv('customers.csv')\n\ndf = clean.merge(customers, left_on='customer_id', right_on='id', how='left')\nby_channel = df.groupby('channel')['amount'].sum().sort_values(ascending=False)\nprint(by_channel)", check: { tests: REF + "_m = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel')['amount'].sum().sort_values(ascending=False)\nassert list(by_channel.index) == list(_m.index), 'Арналар реті дұрыс емес: кему ретімен сұрыптаңыз'\nassert [round(float(v)) for v in by_channel.values] == [round(float(v)) for v in _m.values], 'Сомалар сәйкес емес'" }, hints: ["<code>clean.merge(customers, left_on='customer_id', right_on='id')</code>", "<code>.groupby('channel')['amount'].sum().sort_values(ascending=False)</code>"] },
          { type: 'quiz', xp: 10, prompt: '150 тапсырысты 40 клиентпен <code>how=\'left\'</code> біріктірдік, нәтижеде 150 жол. Ал 300 жол шықса, бұл нені білдіреді?', options: ['Бәрі дұрыс', 'customers кестесінде бір клиент id-і қайталанады', 'orders кестесі бос', 'how=\'inner\' керек еді'], answer: 1, explain: 'Кілт оң жақ кестеде қайталанса, әр тапсырыс бірнеше рет көшіріледі. Біріктіруден кейін жолдар санын әрқашан тексеріңіз.' }
        ]
      },
      {
        id: 'pd-7', title: 'Күндер және pivot_table', minutes: 15,
        body: `
<pre><code>orders['order_date'] = pd.to_datetime(orders['order_date'])
orders['month'] = orders['order_date'].dt.to_period('M')
orders['weekday'] = orders['order_date'].dt.day_name()</code></pre>
<h3>pivot_table: жиынтық кесте</h3>
<p>Excel-дегі PivotTable сияқты: жолдар, бағандар және мәндер.</p>
<pre><code>pd.pivot_table(df, index='city', columns='month',
               values='amount', aggfunc='sum', fill_value=0)</code></pre>
<h3>Уақыт қатары</h3>
<pre><code>daily = pd.read_csv('daily_sales.csv', parse_dates=['day'])
daily.groupby('region')['revenue'].sum()
daily.set_index('day').groupby('region')['revenue'].rolling(3).mean()  # 3 күндік жылжымалы орташа</code></pre>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Таза тапсырыстар мен клиенттерді біріктіріп, <code>pt</code> жиынтық кестесін жасаңыз: жолдар — <code>city</code>, бағандар — ай (<code>month</code>, мысалы <code>2024-01</code>), мәндер — <code>amount</code> қосындысы, бос орындар 0.', starter: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\nclean['month'] = clean['order_date'].str[:7]\ncustomers = pd.read_csv('customers.csv')\n\n", solution: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\nclean['month'] = clean['order_date'].str[:7]\ncustomers = pd.read_csv('customers.csv')\n\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\npt = pd.pivot_table(df, index='city', columns='month', values='amount', aggfunc='sum', fill_value=0)\nprint(pt)", check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_d['month'] = _d['order_date'].str[:7]\n_p = _pd.pivot_table(_d, index='city', columns='month', values='amount', aggfunc='sum', fill_value=0)\nassert list(pt.index) == list(_p.index), 'Жолдар қалалар болуы керек'\nassert [str(c) for c in pt.columns] == [str(c) for c in _p.columns], 'Бағандар айлар болуы керек'\nassert (pt.values.round() == _p.values.round()).all(), 'Мәндер сәйкес емес'" }, hints: ["<code>pd.pivot_table(df, index='city', columns='month', values='amount', aggfunc='sum', fill_value=0)</code>"] },
          { type: 'python', xp: 20, prompt: '<code>daily_sales.csv</code> файлын оқып, әр аймақтың (<code>region</code>) орташа күндік табысын <code>avg_by_region</code> Series-іне жазыңыз.', starter: 'import pandas as pd\n\n', solution: "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv')\navg_by_region = daily.groupby('region')['revenue'].mean()\nprint(avg_by_region)", check: { tests: "_d = __import__('pandas').read_csv('daily_sales.csv').groupby('region')['revenue'].mean()\nassert list(avg_by_region.index) == list(_d.index), 'Индекс аймақтар болуы керек'\nassert [round(float(v), 2) for v in avg_by_region.values] == [round(float(v), 2) for v in _d.values], 'Орташа мәндер сәйкес емес'" }, hints: ["<code>daily.groupby('region')['revenue'].mean()</code>"] }
        ]
      },
      {
        id: 'pd-8', title: 'NumPy негіздері', minutes: 12,
        body: `
<p><b>NumPy</b> — pandas-тың іргетасы: жылдам сандық массивтер. pandas бағаны ішінде NumPy массиві тұр.</p>
<pre><code>import numpy as np

a = np.array([2150, 2250, 2550, 48000])
a.mean(), np.median(a), a.std()
a * 1.12                         # әр элементке бірден (векторлау)
a[a &lt; 20000]                     # маска арқылы сүзу
np.where(a &gt; 3000, 'big', 'small')</code></pre>
<p>Медиана шектен тыс мәнге (48000) сезімтал емес, ал орташа сезімтал. Мұны статистика модулінен білесіз.</p>
<div class="tip">Python циклы миллион жолда баяу. NumPy/pandas операциялары C тілінде орындалады, сондықтан жүздеген есе жылдам.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>a</code> массивінің орташасын <code>mean_all</code>-ға, медианасын <code>med</code>-ке, ал 20 000-нан кіші элементтердің орташасын <code>mean_clean</code>-ге жазыңыз.', starter: 'import numpy as np\n\na = np.array([2150, 2250, 2550, 2050, 3100, 48000, 1900])\n', solution: 'import numpy as np\n\na = np.array([2150, 2250, 2550, 2050, 3100, 48000, 1900])\nmean_all = a.mean()\nmed = np.median(a)\nmean_clean = a[a < 20000].mean()\nprint(mean_all, med, mean_clean)', check: { tests: "assert abs(mean_all - 8857.142857) < 0.01, 'mean_all дұрыс емес'\nassert med == 2250, 'med дұрыс емес: np.median'\nassert abs(mean_clean - 2333.333333) < 0.01, 'mean_clean: a[a < 20000].mean()'" }, hints: ['<code>a[a &lt; 20000].mean()</code>'] },
          { type: 'quiz', xp: 10, prompt: '<code>np.where(a &gt; 3000, \'big\', \'small\')</code> не қайтарады?', options: ['3000-нан үлкен элементтердің индекстерін', 'Әр элемент үшін \'big\' немесе \'small\' мәтіндерінен тұратын массив', 'True/False массиві', 'Бір мәтін'], answer: 1, explain: 'Үш аргументті np.where — векторланған IF: шарт ақиқат болса бірінші мән, әйтпесе екінші.' }
        ]
      },
      {
        id: 'pd-gate', gate: true, title: 'Модуль емтиханы: pandas', minutes: 25,
        body: `<p>Қорытынды тапсырмалар: сүзу, тазалау, біріктіру және топтау бір талдауда.</p>`,
        exercises: [
          { type: 'quiz', xp: 15, prompt: 'SQL-дегі <code>COUNT(DISTINCT customer_id)</code> pandas-та қалай жазылады?', options: ["df['customer_id'].count()", "df['customer_id'].nunique()", "len(df)", "df['customer_id'].size"], answer: 1, explain: 'nunique() бірегей мәндер санын береді, count() бос емес мәндердің бәрін санайды.' },
          { type: 'quiz', xp: 15, prompt: 'Неге <code>df[df[\'a\'] &gt; 1 and df[\'b\'] &lt; 5]</code> қате береді?', options: ['Бағандар жоқ', 'Series үшін and емес, &amp; керек және шарттар жақшада болуы керек', 'and тек сандарға жұмыс істейді', 'Қате бермейді'], answer: 1, explain: 'Дұрысы: df[(df[\'a\'] &gt; 1) &amp; (df[\'b\'] &lt; 5)].' },
          { type: 'python', xp: 30, prompt: 'Әр қала (<code>city</code>) бойынша таза тапсырыстардан <code>customers</code> (бірегей клиенттер), <code>revenue</code> және <code>aov</code> (revenue / тапсырыс саны, бүтінге дөңгелектенген) есептеп, <code>report</code> DataFrame-ін жасаңыз. <code>city</code> кәдімгі баған болсын, табыс бойынша кему ретімен.', starter: 'import pandas as pd\n\norders = pd.read_csv(\'orders.csv\')\ncustomers = pd.read_csv(\'customers.csv\')\n\n', solution: "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\n\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\nreport = df.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index()\nreport['aov'] = (report['revenue'] / report['n']).round()\nreport = report.drop(columns=['n']).sort_values('revenue', ascending=False)\nprint(report)", check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_r = _d.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index().sort_values('revenue', ascending=False)\nassert 'city' in report.columns, 'city кәдімгі баған болуы керек'\nassert {'customers', 'revenue', 'aov'} <= set(report.columns), 'customers, revenue, aov бағандары керек'\nassert report['city'].tolist() == _r['city'].tolist(), 'Қалалар реті дұрыс емес'\nassert report['customers'].tolist() == _r['customers'].tolist(), 'customers: nunique қолданыңыз'\nassert report['revenue'].round().tolist() == _r['revenue'].round().tolist(), 'revenue дұрыс емес: таза тапсырыстарды алдыңыз ба?'\nassert [round(float(a)) for a in report['aov']] == [round(r / n) for r, n in zip(_r['revenue'], _r['n'])], 'aov = revenue / тапсырыс саны'" } }
        ]
      }
    ]
  };
})();
