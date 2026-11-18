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
<div class="tip">Бірінші рет <code>import pandas</code> жазғанда кітапхана жүктеледі (бірнеше секунд). Кейін бірден жұмыс істейді.</div>
<h3>Жаңа деректі алғаш қарау</h3>
<p>Кез келген CSV-ді оқығаннан кейін төрт команданы әдетке айналдырыңыз:</p>
<ol>
<li><code>df.shape</code>: жолдар мен бағандар саны күткендей ме?</li>
<li><code>df.head()</code>: деректің өзі қандай көрінеді, баған атаулары түсінікті ме?</li>
<li><code>df.info()</code>: әр бағанның типі дұрыс па? Сома <code>object</code> (мәтін) болып тұрса, онда сан емес таңбалар бар.</li>
<li><code>df.describe()</code>: ең кіші және ең үлкен мәндер қисынды ма?</li>
</ol>
<p>Деректі осылай алғаш қарап шығуды <b>profiling</b> дейді; оны кейін «Cleaning &amp; EDA» модулінде толық үйренесіз. Екі минуттық тексеріс кейін сағаттық қате іздеуден құтқарады.</p>
<h3>Жиі қателер</h3>
<ul>
<li><b>Бөлгіш басқа</b>: Еуропалық Excel файлдары үтір емес, нүктелі үтір қолданады. Онда <code>pd.read_csv('file.csv', sep=';')</code> жазыңыз.</li>
<li><b>Кодировка</b>: кириллица түсініксіз таңбалар болып шықса, <code>encoding='utf-8'</code> немесе <code>encoding='cp1251'</code> байқап көріңіз.</li>
<li><b>Күндер мәтін болып қалды</b>: <code>pd.read_csv(..., parse_dates=['order_date'])</code> оларды бірден күн типіне айналдырады.</li>
</ul>`,
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
</table>
<h3>Жаңа баған қосу</h3>
<p>Есептелген баған SQL-дегі <code>SELECT amount * 1.12 AS with_vat</code> сияқты жасалады, бірақ нәтиже кестенің өзіне қосылады:</p>
<pre><code>orders['with_vat'] = orders['amount'] * 1.12
orders['is_big'] = orders['amount'] &gt; 3000</code></pre>
<p>Операция бүкіл бағанға бірден қолданылады, цикл керек емес.</p>
<h3>loc пен iloc айырмасы</h3>
<p><code>loc</code> жолдың <b>белгісімен</b> (index) жұмыс істейді, <code>iloc</code> оның <b>орнымен</b> (0, 1, 2...). Сүзгіден кейін индекс «тесік» болып қалады: <code>paid.loc[0]</code> қате береді, егер 0-жол сүзгіден өтпесе. Ал <code>paid.iloc[0]</code> әрқашан бірінші жолды береді. Индексті қайта нөмірлеу үшін <code>paid.reset_index(drop=True)</code> қолданыңыз.</p>
<div class="tip">Сүзгіні <code>query</code> әдісімен де жазуға болады: <code>orders.query("status == 'paid' and amount &gt; 3000")</code>. Мұнда <code>and</code> сөзі жұмыс істейді, ал жазу SQL-ге жақын.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: 'Тек төленген (<code>status == \'paid\'</code>) тапсырыстарды <code>paid</code> айнымалысына жазыңыз және олардың санын шығарыңыз.', starter: LOAD + '\n', solution: LOAD + "paid = orders[orders['status'] == 'paid']\nprint(len(paid))", check: { tests: REF + "assert len(paid) == (_o['status'] == 'paid').sum(), 'paid ішінде тек status == \"paid\" жолдары болуы керек'\nassert set(paid['status']) == {'paid'}, 'Басқа статустар қалып қойды'" }, hints: ["<code>orders[orders['status'] == 'paid']</code>"] },
          { type: 'python', xp: 20, prompt: 'Төленген және сомасы 3000-нан үлкен тапсырыстарды <code>big</code> айнымалысына жазыңыз. Тек <code>id</code>, <code>customer_id</code>, <code>amount</code> бағандары қалсын.', starter: LOAD + '\n', solution: LOAD + "big = orders[(orders['status'] == 'paid') & (orders['amount'] > 3000)][['id', 'customer_id', 'amount']]\nprint(big)", check: { tests: REF + "_b = _o[(_o['status'] == 'paid') & (_o['amount'] > 3000)]\nassert list(big.columns) == ['id', 'customer_id', 'amount'], 'Бағандар: id, customer_id, amount'\nassert sorted(big['id']) == sorted(_b['id']), 'Жолдар саны немесе сүзгі дұрыс емес'" }, hints: ['Екі шартты <code>&amp;</code> арқылы, әрқайсысын жақшаға алыңыз.', "Соңынан <code>[['id', 'customer_id', 'amount']]</code>"] }
        ]
      },
      {
        id: 'pd-3', title: 'Жаңа бағандар және сұрыптау', minutes: 12,
        body: `
<p>Excel-де жаңа баған қосу үшін формуланы бір ұяшыққа жазып, төмен қарай созасыз. pandas-та созудың керегі жоқ: формуланы бүкіл бағанға бір рет жазасыз, ол барлық жолға бірден есептеледі. Мұны <b>векторлау</b> дейді, Python циклы керек емес.</p>
<pre><code>orders['amount_k'] = orders['amount'] / 1000
orders['month'] = orders['order_date'].str[:7]        # '2024-03-05' → '2024-03'
orders['size'] = orders['amount'].apply(lambda x: 'big' if x &gt; 3000 else 'small')</code></pre>
<p>Үшінші жолдағы <code>lambda x: ...</code> — атаусыз, бір жолдық функция: «<code>x</code>-ті алып, қос нүктеден кейінгі өрнектің мәнін қайтар». <code>.apply</code> оны бағанның әр мәніне кезекпен қолданады. Мұнда әр сома үшін <code>'big'</code> немесе <code>'small'</code> шығады.</p>
<p><code>.str[:7]</code> мәтіннің алғашқы 7 таңбасын алады (Python-дағы кесінді сияқты). <code>order_date</code> CSV-ден мәтін болып оқылады, сондықтан бұл жұмыс істейді.</p>
<h3>Мысал: кіріс → код → нәтиже</h3>
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
<p>Ең үлкен N жолды алу үшін сұрыптаудан кейін <code>.head(N)</code> жазыңыз. Тек бір статусты керек болса, <b>алдымен сүзіп</b> (өткен сабақтағыдай), сосын сұрыптаңыз.</p>
<h3>Сұрыптау (ORDER BY)</h3>
<pre><code>orders.sort_values('amount', ascending=False).head(5)   # ең үлкен 5
orders.nlargest(5, 'amount')                            # дәл сол
orders.sort_values(['customer_id', 'order_date'])       # екі баған бойынша</code></pre>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>SELECT amount / 1000 AS amount_k</code></td><td><code>df['amount_k'] = df['amount'] / 1000</code></td></tr>
<tr><td><code>substr(order_date, 1, 7)</code></td><td><code>df['order_date'].str[:7]</code></td></tr>
<tr><td><code>ORDER BY amount DESC LIMIT 5</code></td><td><code>df.sort_values('amount', ascending=False).head(5)</code></td></tr>
</table>
<p>Атауын өзгерту: <code>df.rename(columns={'amount': 'sum'})</code>. Бағанды жою: <code>df.drop(columns=['size'])</code>.</p>
<div class="tip"><b>Жиі қателер:</b>
<ul>
<li><code>ascending=False</code> ұмытылса, ең <b>кіші</b> мәндер жоғарыда тұрады (әдепкі — өсу реті).</li>
<li><code>sort_values</code> кестені орнында өзгертпейді, жаңа кесте қайтарады. Нәтижені айнымалыға жазыңыз: <code>res = df.sort_values(...)</code>.</li>
<li>Сүзілген кестеге баған қосқанда ескерту шықса, сүзгіден кейін <code>.copy()</code> жазыңыз.</li>
</ul></div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>orders</code>-ке <code>month</code> бағанын қосыңыз: <code>order_date</code>-тың алғашқы 7 таңбасы (мысалы <code>2024-03</code>).', starter: LOAD + '\n', solution: LOAD + "orders['month'] = orders['order_date'].str[:7]\nprint(orders.head())", check: { tests: "assert 'month' in orders.columns, 'month бағаны жоқ'\nassert (orders['month'] == orders['order_date'].str[:7]).all(), 'month = order_date-тың алғашқы 7 таңбасы'" }, hints: ["<code>orders['order_date'].str[:7]</code>"] },
          { type: 'python', xp: 20, prompt: 'Төленген тапсырыстардың ішінен сомасы ең үлкен 5 тапсырысты кему ретімен <code>top5</code> айнымалысына жазыңыз.', starter: LOAD + '\n', solution: LOAD + "paid = orders[orders['status'] == 'paid']\ntop5 = paid.sort_values('amount', ascending=False).head(5)\nprint(top5)", check: { tests: REF + "_t = _o[_o['status'] == 'paid'].sort_values('amount', ascending=False).head(5)\nassert len(top5) == 5, 'top5 ішінде 5 жол болуы керек'\nassert top5['amount'].tolist() == _t['amount'].tolist(), 'Сомалар кему ретімен болуы керек'\nassert set(top5['status']) == {'paid'}, 'Тек paid тапсырыстар'" }, hints: ["<code>sort_values('amount', ascending=False).head(5)</code>"] }
        ]
      },
      {
        id: 'pd-4', title: 'groupby: топтау және агрегат', minutes: 15,
        body: `
<p>Кассадағы чектерді клиенттер бойынша бөлек үйінділерге бөліп, әр үйіндіні калькулятормен қосып, нәтижелерді бір парақшаға жазып шықтыңыз делік. <code>groupby</code> дәл осыны істейді. Бұл SQL-дегі <code>GROUP BY</code>. Үш қадам: бөлу (split) → есептеу (apply) → біріктіру (combine).</p>
<h3>Мысал: қадам-қадаммен</h3>
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
<li><b>Split:</b> 1-клиент → [2000, 2500]; 2-клиент → [3000, 4000]; 3-клиент → [1500].</li>
<li><b>Apply:</b> әр топқа <code>sum</code>: 4500; 7000; 1500.</li>
<li><b>Combine:</b> бір Series, индексі — <code>customer_id</code>:</li>
</ol>
<pre><code>customer_id
1    4500
2    7000
3    1500
Name: amount, dtype: int64</code></pre>
<p>Бірнеше агрегат керек болса, <code>.agg()</code> ішінде <code>жаңа_атау=('баған', 'функция')</code> жазамыз. Сол кестеде <code>.agg(orders=('id', 'count'), revenue=('amount', 'sum')).reset_index()</code> мынаны береді:</p>
<table>
<tr><th>customer_id</th><th>orders</th><th>revenue</th></tr>
<tr><td>1</td><td>2</td><td>4500</td></tr>
<tr><td>2</td><td>2</td><td>7000</td></tr>
<tr><td>3</td><td>1</td><td>1500</td></tr>
</table>
<p>Топтау кілті кестеде болуы керек. Мысалы, ай бойынша топтау үшін алдымен <code>month</code> бағанын қосыңыз (өткен сабақ), сосын <code>groupby('month')</code>. Нәтижені сұрыптау үшін <code>sort_values</code> соңына тіркеледі.</p>
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
<tr><td><code>WHERE status = 'paid'</code></td><td>топтауға <b>дейін</b> сүзгі: <code>orders[orders['status'] == 'paid'].groupby(...)</code></td></tr>
<tr><td><code>HAVING SUM(a) &gt; 10</code></td><td>агрегаттан <b>кейін</b> сүзгі: <code>res[res['revenue'] &gt; 10]</code></td></tr>
<tr><td><code>ORDER BY revenue DESC</code></td><td><code>.sort_values('revenue', ascending=False)</code></td></tr>
</table>
<div class="tip"><code>reset_index()</code> топтау бағанын индекстен қайтадан кәдімгі бағанға айналдырады. Нәтижені әрі қарай біріктіру үшін ыңғайлы.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>reset_index()</code> ұмытылады: <code>customer_id</code> индексте қалады, <code>df['customer_id']</code> қате береді.</li>
<li>Сүзгіні ұмыту: refund тапсырыстар да табысқа қосылып кетеді. Алдымен <code>paid</code> қалдырыңыз.</li>
<li><code>'count'</code> бос емес мәндерді ғана санайды: <code>('amount', 'count')</code> бос сомаларды есептемейді, ал <code>('id', 'count')</code> барлық тапсырысты санайды.</li>
</ul>`,
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
orders['amount'].astype(int)         # типті өзгерту (бос мән болса, қате береді)</code></pre>
<p><code>astype(int)</code>-ті тек <code>dropna</code> немесе <code>fillna</code>-дан <b>кейін</b> қолданыңыз. Бос мән (<code>NaN</code>) бүтін санға айналмайды: бағанда бір ғана NaN қалса да, pandas <code>IntCastingNaNError</code> қатесін береді. Осы себепті бос мәні бар сандық баған әдепкіде <code>float</code> болып оқылады.</p>
<h3>Шектен тыс мәндер (outliers)</h3>
<pre><code>q1, q3 = orders['amount'].quantile([0.25, 0.75])
iqr = q3 - q1
outliers = orders[orders['amount'] &gt; q3 + 1.5 * iqr]</code></pre>
<div class="tip">Бос соманы 0-мен толтыру орташа чекті жасанды төмендетеді. Әдетте оны алып тастайды немесе себебін анықтайды. Шешіміңізді әрқашан жазып қойыңыз.</div>
<h3>Тазалау тәртібі</h3>
<p>Тазалауды бір рет, бір ретпен орындаған дұрыс. Мысалы:</p>
<pre><code>clean = (orders
    .drop_duplicates()
    .dropna(subset=['amount'])
    .query("status == 'paid' and amount &lt; 20000"))
print(len(orders), '→', len(clean))</code></pre>
<p>Жақшадағы «тізбек» (method chaining) әр қадамды бір жолға жазады, ал соңғы <code>print</code> қанша жол алынғанын көрсетеді. Бұл санды есепте міндетті түрде көрсетіңіз.</p>
<h3>Мәтінді тазалау</h3>
<p>pandas-та мәтін бағанына <code>.str</code> арқылы жол әдістерін қолданамыз:</p>
<pre><code>df['city'] = df['city'].str.strip().str.title()
df['email'] = df['email'].str.lower()</code></pre>
<p>Бұл әдістер бос мәндерді өткізіп жібереді, сондықтан <code>NaN</code> қате бермейді.</p>
<div class="tip">Тазалауды бастапқы кестені өзгертпей, жаңа айнымалыға (<code>clean</code>) жазыңыз. Қате жіберсеңіз, бастапқы деректен қайта бастау оңай.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>amount</code> бағанындағы бос мәндер санын <code>null_count</code> айнымалысына жазыңыз.', starter: LOAD + '\n', solution: LOAD + "null_count = orders['amount'].isna().sum()\nprint(null_count)", check: { tests: "assert int(null_count) == 6, 'Бос мәндер саны дұрыс емес: isna().sum() қолданыңыз'" }, hints: ["<code>orders['amount'].isna().sum()</code>"] },
          { type: 'python', xp: 25, prompt: 'Таза тапсырыстар кестесін <code>clean</code> айнымалысына жасаңыз: <code>status == \'paid\'</code>, <code>amount</code> бос емес және 20 000-нан кіші. Сосын <code>amount</code> типін <code>int</code>-ке айналдырыңыз және орташа чекті шығарыңыз.', starter: LOAD + '\n', solution: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\nclean['amount'] = clean['amount'].astype(int)\nprint(round(clean['amount'].mean()))", check: { tests: REF + "assert len(clean) == len(_clean), 'Жолдар саны дұрыс емес: үш шартты тексеріңіз'\nassert clean['amount'].isna().sum() == 0, 'Бос мәндер қалды'\nassert clean['amount'].max() < 20000, 'Шектен тыс мән қалды'\nassert str(clean['amount'].dtype).startswith('int'), 'amount типі int болуы керек: astype(int)'" }, hints: ["<code>orders['amount'].notna()</code>", 'Көшірме жасаңыз: <code>.copy()</code>, сосын <code>astype(int)</code>.'] }
        ]
      },
      {
        id: 'pd-6', title: 'merge: кестелерді біріктіру', minutes: 14,
        body: `
<p>Бір парақта тапсырыстар бар, бірақ клиенттің қаласы мен арнасы жоқ. Екінші парақта клиенттер тізімі бар. Excel-де VLOOKUP арқылы әр тапсырысқа клиенттің деректерін «тартып аласыз». pandas-та бұл <code>merge</code>, SQL-дегі <code>JOIN</code>.</p>
<h3>Мысал: қай жолдар сәйкес келеді</h3>
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
<p>1-клиенттің екі тапсырысы бар, сондықтан оның қаласы екі жолға көшірілді. 4-клиент customers-та жоқ: <code>left</code> жолды сақтайды, бірақ мәндері бос (NaN). <code>how='inner'</code> болса, 13-тапсырыс жойылып, 3 жол қалар еді. 3-клиенттің тапсырысы жоқ, ол тек <code>'outer'</code>-де шығады.</p>
<p>Біріктіргеннен кейін кез келген бағанмен топтай аласыз: <code>df.groupby('channel')['amount'].sum()</code> → instagram 3500, 2gis 3000.</p>
<pre><code>customers = pd.read_csv('customers.csv')

df = orders.merge(customers, left_on='customer_id', right_on='id',
                  how='left', suffixes=('_order', '_customer'))</code></pre>
<table>
<tr><th>how</th><th>SQL</th></tr>
<tr><td><code>'inner'</code> (әдепкі)</td><td><code>INNER JOIN</code></td></tr>
<tr><td><code>'left'</code></td><td><code>LEFT JOIN</code></td></tr>
<tr><td><code>'outer'</code></td><td><code>FULL OUTER JOIN</code></td></tr>
</table>
<p>Кілт атаулары бірдей болса: <code>on='customer_id'</code>. Атаулары әртүрлі болса (мұнда <code>customer_id</code> және <code>id</code>), <code>left_on</code> мен <code>right_on</code> жазылады. Екі кестеде де <code>id</code> бағаны болғандықтан, <code>suffixes</code> атауларды ажыратады (әйтпесе <code>id_x</code>, <code>id_y</code> болады).</p>
<p>SQL баламасы:</p>
<pre><code>SELECT o.*, c.city, c.channel
FROM orders o
LEFT JOIN customers c ON c.id = o.customer_id;</code></pre>
<div class="tip">Біріктіргеннен кейін жолдар санын тексеріңіз: <code>len(df)</code> күткеннен көп болса, кілт қайталанып тұр.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>on='id'</code> жазу: тапсырыс id-і клиент id-імен салыстырылады, нәтиже қате, бірақ қате хабары шықпайды.</li>
<li>Оң жақ кестеде кілт қайталанса, жолдар көбейіп, сомалар екі есе өседі.</li>
<li><code>left</code>-тен кейін сәйкес келмеген жолдарда NaN болады. <code>groupby</code> NaN кілтті әдепкіде тастап кетеді, сондықтан ол сома топтарда көрінбейді.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Таза тапсырыстарды (<code>clean</code> дайын) <code>customers.csv</code>-мен біріктіріп, әр арнаның (<code>channel</code>) табысын есептеңіз. Нәтиже: <code>by_channel</code> Series, кему ретімен.', starter: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ncustomers = pd.read_csv('customers.csv')\n\n", solution: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ncustomers = pd.read_csv('customers.csv')\n\ndf = clean.merge(customers, left_on='customer_id', right_on='id', how='left')\nby_channel = df.groupby('channel')['amount'].sum().sort_values(ascending=False)\nprint(by_channel)", check: { tests: REF + "_m = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel')['amount'].sum().sort_values(ascending=False)\nassert list(by_channel.index) == list(_m.index), 'Арналар реті дұрыс емес: кему ретімен сұрыптаңыз'\nassert [round(float(v)) for v in by_channel.values] == [round(float(v)) for v in _m.values], 'Сомалар сәйкес емес'" }, hints: ["<code>clean.merge(customers, left_on='customer_id', right_on='id')</code>", "<code>.groupby('channel')['amount'].sum().sort_values(ascending=False)</code>"] },
          { type: 'quiz', xp: 10, prompt: '150 тапсырысты 40 клиентпен <code>how=\'left\'</code> біріктірдік, нәтижеде 150 жол. Ал 300 жол шықса, бұл нені білдіреді?', options: ['Бәрі дұрыс', 'customers кестесінде бір клиент id-і қайталанады', 'orders кестесі бос', 'how=\'inner\' керек еді'], answer: 1, explain: 'Кілт оң жақ кестеде қайталанса, әр тапсырыс бірнеше рет көшіріледі. Біріктіруден кейін жолдар санын әрқашан тексеріңіз.' }
        ]
      },
      {
        id: 'pd-7', title: 'Күндер және pivot_table', minutes: 15,
        body: `
<p>CSV-ден оқылған күн — жай мәтін, мысалы <code>'2024-03-05'</code>. Мәтінмен күнді салыстыру, апта күнін табу қиын. <code>pd.to_datetime</code> оны нағыз күнге айналдырады, сосын <code>.dt</code> арқылы оның бөліктерін аламыз.</p>
<pre><code>orders['order_date'] = pd.to_datetime(orders['order_date'])
orders['month'] = orders['order_date'].dt.to_period('M')   # 2024-03
orders['weekday'] = orders['order_date'].dt.day_name()      # 'Tuesday'</code></pre>
<p>Тек айды алу керек болса, мәтін күйінде <code>.str[:7]</code> де жеткілікті (pd-3 сабағы).</p>
<h3>pivot_table: жиынтық кесте</h3>
<p>Excel-дегі PivotTable сияқты: бір баған жолдарға (<code>index</code>), екіншісі бағандарға (<code>columns</code>) жайылады, қиылысында мәндердің агрегаты (<code>values</code> + <code>aggfunc</code>) тұрады. Бұл «екі өлшемді groupby».</p>
<p>Мысал: тапсырыстар клиенттермен біріктірілген <code>df</code>:</p>
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
<p>Астанада қаңтарда тапсырыс жоқ. <code>fill_value=0</code> болмаса, ол ұяшықта NaN тұрар еді. Дәл осыны <code>df.groupby(['city', 'month'])['amount'].sum().unstack(fill_value=0)</code> да береді. SQL-де: <code>GROUP BY city, month</code>, ал айларды бағанға жаю үшін <code>SUM(CASE WHEN month = '2024-01' THEN amount END)</code> сияқты әр айға бөлек өрнек керек.</p>
<h3>Уақыт қатары</h3>
<p><code>daily_sales.csv</code> — әр аймақтың күндік табысы (<code>day</code>, <code>region</code>, <code>revenue</code>). Аймақ бойынша жиынтық — сол баяғы <code>groupby</code>, тек агрегатты таңдайсыз: <code>sum</code> (жалпы), <code>mean</code> (күніне орташа), <code>max</code>.</p>
<pre><code>daily = pd.read_csv('daily_sales.csv', parse_dates=['day'])
daily.groupby('region')['revenue'].sum()
daily.set_index('day').groupby('region')['revenue'].rolling(3).mean()  # 3 күндік жылжымалы орташа</code></pre>
<p>Мысалы, Алматыда 100 және 120, Астанада 80 және 90 болса, күндік орташа: Алматы 110, Астана 85.</p>
<div class="tip"><b>Жиі қателер:</b>
<ul>
<li>Мәтін бағанына <code>.dt</code> қолдану қате береді: алдымен <code>pd.to_datetime</code>.</li>
<li><code>pivot_table</code>-ге біріктірілмеген <code>orders</code> берілсе, <code>city</code> бағаны табылмайды: алдымен <code>merge</code>.</li>
<li><code>aggfunc</code> әдепкіде <code>'mean'</code>: қосынды керек болса, <code>'sum'</code> деп нақты жазыңыз.</li>
</ul></div>`,
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
<p>Медиана шектен тыс мәнге (48000) сезімтал емес, ал орташа сезімтал. Мұны M0.2 модуліндегі «Орташа, медиана, мода» сабағынан білесіз.</p>
<div class="tip">Python циклы миллион жолда баяу. NumPy/pandas операциялары C тілінде орындалады, сондықтан жүздеген есе жылдам.</div>
<h3>Векторлау мысалы</h3>
<p>Python тізімімен ҚҚС-ты қосу үшін цикл керек:</p>
<pre><code>prices = [2150, 2250, 2550]
with_vat = [p * 1.12 for p in prices]</code></pre>
<p>NumPy-да бір әрекет жеткілікті: <code>np.array(prices) * 1.12</code>. Нәтиже бірдей, бірақ миллион элементте NumPy әлдеқайда жылдам, ал код қысқа әрі оқуға жеңіл.</p>
<h3>Пайдалы функциялар</h3>
<table>
<tr><th>Функция</th><th>Не істейді</th></tr>
<tr><td><code>np.round(a, 1)</code></td><td>дөңгелектеу</td></tr>
<tr><td><code>np.percentile(a, 90)</code></td><td>90-перцентиль</td></tr>
<tr><td><code>np.cumsum(a)</code></td><td>жиынтық сома</td></tr>
<tr><td><code>np.log(a)</code></td><td>логарифм (қисайған деректі түзету үшін)</td></tr>
<tr><td><code>a.argmax()</code></td><td>ең үлкен элементтің орны</td></tr>
</table>
<div class="tip">Массивтің барлық элементі бір типте болады. Сан мен мәтінді араластырсаңыз, NumPy бәрін мәтінге айналдырады да, арифметика жұмыс істемейді.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>a</code> массивінің орташасын <code>mean_all</code>-ға, медианасын <code>med</code>-ке, ал 20 000-нан кіші элементтердің орташасын <code>mean_clean</code>-ге жазыңыз.', starter: 'import numpy as np\n\na = np.array([2150, 2250, 2550, 2050, 3100, 48000, 1900])\n', solution: 'import numpy as np\n\na = np.array([2150, 2250, 2550, 2050, 3100, 48000, 1900])\nmean_all = a.mean()\nmed = np.median(a)\nmean_clean = a[a < 20000].mean()\nprint(mean_all, med, mean_clean)', check: { tests: "assert abs(mean_all - 8857.142857) < 0.01, 'mean_all дұрыс емес'\nassert med == 2250, 'med дұрыс емес: np.median'\nassert abs(mean_clean - 2333.333333) < 0.01, 'mean_clean: a[a < 20000].mean()'" }, hints: ['<code>a[a &lt; 20000].mean()</code>'] },
          { type: 'quiz', xp: 10, prompt: '<code>np.where(a &gt; 3000, \'big\', \'small\')</code> не қайтарады?', options: ['3000-нан үлкен элементтердің индекстерін', 'Әр элемент үшін \'big\' немесе \'small\' мәтіндерінен тұратын массив', 'True/False массиві', 'Бір мәтін'], answer: 1, explain: 'Үш аргументті np.where — векторланған IF: шарт ақиқат болса бірінші мән, әйтпесе екінші.' }
        ]
      },
      {
        id: 'pd-9', title: 'value_counts, concat және файлдар', minutes: 14,
        body: `
<p>Бұл сабақта күнделікті жұмыстың төрт шағын, бірақ өте жиі кездесетін әрекетін үйренесіз: мәндерді санау, кестелерді тігінен қосу, нәтижені файлға сақтау және «лас» мәтінді санға айналдыру.</p>
<h3>value_counts: мәндерді санау</h3>
<p>Категориялық бағанмен танысудың ең жылдам тәсілі — әр мән неше рет кездесетінін санау. Бұл SQL-дегі <code>GROUP BY status</code> + <code>COUNT(*)</code> + <code>ORDER BY ... DESC</code>, тек бір әдіспен:</p>
<pre><code>orders['status'].value_counts()
# paid      146
# refund      4

orders['status'].value_counts(normalize=True)
# paid      0.973333
# refund    0.026667</code></pre>
<p><code>normalize=True</code> санның орнына <b>үлесті</b> береді (қосындысы 1). Пайыз үшін 100-ге көбейтіңіз: <code>(... * 100).round(1)</code>. Нәтиже — Series: индексінде мәндер, ішінде сандар. Нақты мәнді алу: <code>counts['refund']</code>.</p>
<p>Әдепкіде бос мәндер саналмайды. Оларды да көру үшін <code>value_counts(dropna=False)</code> жазыңыз.</p>
<h3>pd.concat: кестелерді тігінен қосу</h3>
<p>Дерек жиі бөлек файлдарда келеді: әр айға бір файл. Бағандары бірдей кестелерді бірінің астына бірін қосу — <code>pd.concat</code> (SQL-дегі <code>UNION ALL</code>):</p>
<pre><code>jan = pd.DataFrame({'id': [1, 2], 'amount': [2400, 2750]})
feb = pd.DataFrame({'id': [3], 'amount': [2600]})

both = pd.concat([jan, feb], ignore_index=True)
#    id  amount
# 0   1    2400
# 1   2    2750
# 2   3    2600</code></pre>
<p><code>ignore_index=True</code> индексті 0-ден қайта нөмірлейді. Онсыз индекс <code>0, 1, 0</code> болып қайталанар еді. Кестелер тізім ретінде беріледі: <code>pd.concat([a, b, c])</code>.</p>
<table>
<tr><th>Әрекет</th><th>Не істейді</th><th>SQL</th></tr>
<tr><td><code>pd.concat([a, b])</code></td><td>жолдарды астына қосады</td><td><code>UNION ALL</code></td></tr>
<tr><td><code>a.merge(b, on=...)</code></td><td>бағандарды кілт бойынша жалғайды</td><td><code>JOIN</code></td></tr>
</table>
<p>Баған атаулары сәйкес келмесе (<code>amount</code> және <code>Amount</code>), concat екі бөлек баған жасап, бос орындарды NaN-мен толтырады. Қоспас бұрын <code>df.columns</code>-ты салыстырыңыз.</p>
<h3>Нәтижені сақтау: to_csv</h3>
<pre><code>paid.to_csv('paid.csv', index=False)</code></pre>
<p><code>index=False</code> маңызды: онсыз pandas индексті де бөлек баған етіп жазады, ал файлды қайта оқығанда <code>Unnamed: 0</code> деген артық баған пайда болады. Excel-де ашылатын файл үшін: <code>to_csv('paid.csv', index=False, sep=';', encoding='utf-8-sig')</code>. Сонда бағандар дұрыс бөлінеді және қазақша әріптер бұзылмайды.</p>
<h3>Excel файлдары: read_excel</h3>
<p>Әріптестер деректі көбіне <code>.xlsx</code> түрінде жібереді. Оны оқу CSV-ге ұқсас:</p>
<pre><code>df = pd.read_excel('report.xlsx', sheet_name='Сатылым')   # бір парақ
df = pd.read_excel('report.xlsx', sheet_name=0, skiprows=2)  # бірінші парақ, үстіңгі 2 жолды өткізу
df.to_excel('result.xlsx', index=False)</code></pre>
<p><code>sheet_name</code> — парақтың атауы немесе нөмірі (0-ден). Есеп кестелерінде тақырыптың үстінде бос жолдар мен атау тұрады, оларды <code>skiprows</code> өткізеді. Өз компьютеріңізде бұл үшін <code>openpyxl</code> пакеті керек (<code>pip install openpyxl</code>). Бұл браузердегі ортада ол жоқ, сондықтан мұнда тапсырмалар CSV-мен орындалады.</p>
<h3>Мәтінді санға айналдыру: to_numeric</h3>
<p>Сома бағаны <code>object</code> (мәтін) болып оқылса, ішінде сан емес таңба бар: бос орын, «тг», «жоқ».</p>
<pre><code>raw = pd.Series(['12 500', '8000', 'abc', None])

pd.to_numeric(raw)                          # ValueError: '12 500' санға айналмайды
clean = raw.str.replace(' ', '')            # '12500', '8000', 'abc', None
pd.to_numeric(clean, errors='coerce')       # 12500.0, 8000.0, NaN, NaN</code></pre>
<p><code>errors='coerce'</code> санға айналмайтын мәнді қате бермей <code>NaN</code>-ға ауыстырады. Содан кейін <code>.isna().sum()</code> арқылы неше мән жоғалғанын міндетті түрде қараңыз: көп болса, тазалау ережесін жақсарту керек.</p>
<div class="tip">Күндер үшін дәл осындай әдіс бар: <code>pd.to_datetime(s, errors='coerce')</code> түсініксіз күнді <code>NaT</code>-қа айналдырады.</div>
<h3>Жиі қателер</h3>
<ul>
<li><b><code>pd.concat(a, b)</code> деп жазу.</b> Кестелер тізім ішінде берілуі керек: <code>pd.concat([a, b])</code>.</li>
<li><b><code>ignore_index</code>-ті ұмыту.</b> Индекс қайталанады да, <code>.loc[0]</code> бірнеше жол қайтарады.</li>
<li><b><code>to_csv</code>-ті <code>index=False</code>-сыз жазу.</b> Файлда артық баған пайда болады.</li>
<li><b><code>errors='coerce'</code>-тен кейін NaN-ды санамау.</b> Қате мәндер үнсіз жоғалады, ал қосынды кеміп қалады.</li>
<li><b>value_counts-ты DataFrame-ге қолданып, бір бағанды күту.</b> Алдымен бағанды таңдаңыз: <code>df['status'].value_counts()</code>.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>status</code> бағанындағы әр мәннің <b>үлесін</b> <code>share</code> Series-іне жазыңыз (<code>value_counts</code> және <code>normalize=True</code>). Сосын қайтарылған тапсырыстардың үлесін пайызбен, бір ондық таңбаға дейін дөңгелектеп, <code>refund_pct</code>-ке жазыңыз.', starter: LOAD + '\n', solution: LOAD + "share = orders['status'].value_counts(normalize=True)\nrefund_pct = round(share['refund'] * 100, 1)\nprint(share)\nprint(refund_pct)", check: { tests: REF + "_s = _o['status'].value_counts(normalize=True)\nassert abs(float(share.sum()) - 1) < 1e-9, 'share үлестер болуы керек: normalize=True қостыңыз ба?'\nassert abs(float(share['paid']) - float(_s['paid'])) < 1e-9, 'paid үлесі дұрыс емес'\nassert abs(float(refund_pct) - round(float(_s['refund']) * 100, 1)) < 1e-9, 'refund_pct = share[\\'refund\\'] * 100, бір ондық таңбаға дейін'" }, hints: ["<code>orders['status'].value_counts(normalize=True)</code>", "<code>round(share['refund'] * 100, 1)</code>"] },
          { type: 'python', xp: 20, prompt: 'Қаңтар мен ақпанның тапсырыстары екі бөлек кестеде (<code>jan</code>, <code>feb</code>). Оларды <code>pd.concat</code> арқылы бір <code>both</code> кестесіне қосыңыз. Индекс 0-ден бастап қайталанбай нөмірленсін.', starter: LOAD + "jan = orders[orders['order_date'].str[:7] == '2024-01']\nfeb = orders[orders['order_date'].str[:7] == '2024-02']\n\n", solution: LOAD + "jan = orders[orders['order_date'].str[:7] == '2024-01']\nfeb = orders[orders['order_date'].str[:7] == '2024-02']\n\nboth = pd.concat([jan, feb], ignore_index=True)\nprint(len(jan), len(feb), len(both))", check: { tests: "assert len(both) == len(jan) + len(feb), 'both ішінде екі кестенің барлық жолы болуы керек'\nassert list(both.columns) == list(orders.columns), 'Бағандар өзгермеуі керек'\nassert list(both.index) == list(range(len(both))), 'Индекс 0-ден қайта нөмірленуі керек: ignore_index=True'\nassert set(both['order_date'].str[:7]) == {'2024-01', '2024-02'}, 'Тек қаңтар мен ақпан болуы керек'" }, hints: ['Кестелерді тізім ішінде беріңіз: <code>pd.concat([jan, feb])</code>.', '<code>ignore_index=True</code> қосыңыз.'] },
          { type: 'python', xp: 20, prompt: '<code>raw</code> — мәтін болып келген сомалар. Бос орындарды алып тастап, <code>pd.to_numeric</code> арқылы санға айналдырыңыз: нәтиже <code>nums</code>. Санға айналмайтын мәндер NaN болсын. Неше мән NaN болғанын <code>bad</code>-қа жазыңыз.', starter: "import pandas as pd\n\nraw = pd.Series(['12 500', '8000', 'abc', None, '7 200', '9500', 'жоқ'])\n\n", solution: "import pandas as pd\n\nraw = pd.Series(['12 500', '8000', 'abc', None, '7 200', '9500', 'жоқ'])\n\nnums = pd.to_numeric(raw.str.replace(' ', ''), errors='coerce')\nbad = nums.isna().sum()\nprint(nums)\nprint(bad)", check: { tests: "assert len(nums) == 7, 'nums ішінде 7 мән болуы керек (жолдарды алып тастамаңыз)'\nassert str(nums.dtype).startswith('float'), 'nums сандық (float) болуы керек: pd.to_numeric'\nassert float(nums.sum()) == 37200.0, 'Сандар қосындысы 37200 болуы керек: бос орынды алып тастадыңыз ба?'\nassert int(bad) == 3, 'bad = nums.isna().sum(), 3 болуы керек'" }, hints: ["Бос орынды алу: <code>raw.str.replace(' ', '')</code>.", "<code>pd.to_numeric(..., errors='coerce')</code>", '<code>nums.isna().sum()</code>'] },
          { type: 'python', xp: 20, prompt: 'Статусы <code>refund</code> тапсырыстарды <code>refunds</code> кестесіне сүзіп, <code>refunds.csv</code> файлына <b>индекссіз</b> сақтаңыз. Сосын сол файлды <code>check</code> айнымалысына қайта оқыңыз.', starter: LOAD + '\n', solution: LOAD + "refunds = orders[orders['status'] == 'refund']\nrefunds.to_csv('refunds.csv', index=False)\ncheck = pd.read_csv('refunds.csv')\nprint(check)", check: { mustInclude: ['to_csv'], tests: REF + "import os as _os\ntry:\n    assert _os.path.exists('refunds.csv'), 'refunds.csv файлы жоқ: to_csv қолданыңыз'\n    _f = _pd.read_csv('refunds.csv')\n    assert list(_f.columns) == list(_o.columns), 'Файлда артық баған бар: index=False қосыңыз'\n    assert len(_f) == int((_o['status'] == 'refund').sum()), 'Файлда тек refund тапсырыстар болуы керек'\n    assert set(_f['status']) == {'refund'}, 'Файлда тек refund тапсырыстар болуы керек'\n    assert list(check.columns) == list(_o.columns) and len(check) == len(_f), 'check — файлдан қайта оқылған кесте: pd.read_csv'\nfinally:\n    if _os.path.exists('refunds.csv'):\n        _os.remove('refunds.csv')" }, hints: ["<code>refunds.to_csv('refunds.csv', index=False)</code>", "<code>check = pd.read_csv('refunds.csv')</code>"] },
          { type: 'quiz', xp: 10, prompt: 'Әріптес <code>report.xlsx</code> файлын жіберді: дерек «Сатылым» парағында, ал баған атауларының үстінде 2 жол бос орын мен тақырып тұр. Қалай оқисыз?', options: ["pd.read_csv('report.xlsx')", "pd.read_excel('report.xlsx', sheet_name='Сатылым', skiprows=2)", "pd.read_excel('report.xlsx', index=False)", "pd.concat('report.xlsx')"], answer: 1, explain: 'read_excel парақты sheet_name арқылы таңдайды, ал skiprows үстіңгі артық жолдарды өткізеді. read_csv Excel файлын оқи алмайды: xlsx — мәтін емес, архив.' }
        ]
      },
      {
        id: 'pd-10', title: 'Мәтін, шартты бағандар және уақыт қатары', minutes: 18,
        body: `
<p>Талдаудың көп бөлігі — бар бағандардан <b>жаңа баған</b> жасау: мәтіннен белгі шығару, сандарды топтарға бөлу, өткен күнмен салыстыру. Бұл сабақта соның негізгі құралдарын жинаймыз.</p>
<h3>Мәтін: .str әдістері</h3>
<pre><code>customers['channel'].str.contains('gram')        # True/False: ішінде 'gram' бар ма
customers['city'].str.replace('Астана', 'Astana')  # алмастыру
orders['order_date'].str.split('-')              # ['2024', '03', '05']
orders['order_date'].str.split('-').str[1]       # '03' (ай)
orders['order_date'].str.split('-', expand=True) # үш бөлек баған</code></pre>
<p><code>.str.contains</code> True/False маскасын қайтарады, сондықтан оны сүзгіге бірден қоюға болады: <code>customers[customers['channel'].str.contains('gram')]</code>. SQL-де бұл <code>LIKE '%gram%'</code>. Бағанда бос мән болса, <code>na=False</code> қосыңыз, әйтпесе маскада NaN пайда болып, сүзгі қате береді.</p>
<h3>map: мәндерді сөздік бойынша ауыстыру</h3>
<pre><code>regions = {'Алматы': 'Оңтүстік', 'Шымкент': 'Оңтүстік', 'Астана': 'Солтүстік'}
customers['region'] = customers['city'].map(regions)</code></pre>
<p>Әр қала сөздіктен өз аймағын алады. Сөздікте жоқ мән <code>NaN</code> болады: map-тан кейін <code>.isna().sum()</code>-ды тексеріңіз. Бұл Excel-дегі XLOOKUP-тың немесе шағын анықтамалық кестемен JOIN-ның қарапайым түрі.</p>
<h3>np.where: екі нұсқалы шарт</h3>
<pre><code>import numpy as np
orders['size'] = np.where(orders['amount'] &gt;= 3000, 'big', 'small')</code></pre>
<p><code>np.where(шарт, ақиқат болса, жалған болса)</code> — векторланған IF, SQL-дегі <code>CASE WHEN ... THEN ... ELSE ... END</code>. Ол <code>.apply(lambda ...)</code>-дан қысқа әрі әлдеқайда жылдам. Абайлаңыз: бос сома үшін шарт жалған, сондықтан ол <code>'small'</code> болып кетеді. Алдымен бос мәндерді алып тастаңыз.</p>
<h3>pd.cut: сандарды аралықтарға бөлу</h3>
<p>Екіден көп топ керек болса, <code>pd.cut</code> ыңғайлы:</p>
<pre><code>clean['bucket'] = pd.cut(clean['amount'],
                         bins=[0, 2000, 3000, 20000],
                         labels=['low', 'mid', 'high'])</code></pre>
<table>
<tr><th>Аралық</th><th>Белгі</th><th>Мысал</th></tr>
<tr><td>0 &lt; amount ≤ 2000</td><td>low</td><td>1850, 2000</td></tr>
<tr><td>2000 &lt; amount ≤ 3000</td><td>mid</td><td>2150, 3000</td></tr>
<tr><td>3000 &lt; amount ≤ 20000</td><td>high</td><td>3100</td></tr>
</table>
<p>4 шекара 3 аралық береді, сондықтан белгі саны шекарадан бірге кем. Әдепкіде оң жақ шекара аралыққа <b>кіреді</b> (2000 → low). Шекарадан тыс мән NaN болады.</p>
<h3>shift және pct_change: алдыңғы жолмен салыстыру</h3>
<p>«Кешегіден қанша өсті?» деген сұраққа жауап беру үшін әр жолдың жанына алдыңғы жолдың мәнін қою керек. <code>shift(1)</code> бағанды бір жол төмен жылжытады:</p>
<pre><code>alm['prev'] = alm['revenue'].shift(1)
alm['diff'] = alm['revenue'] - alm['prev']
alm['growth'] = alm['revenue'].pct_change() * 100</code></pre>
<table>
<tr><th>day</th><th>revenue</th><th>prev</th><th>diff</th><th>growth</th></tr>
<tr><td>2024-09-01</td><td>120</td><td>NaN</td><td>NaN</td><td>NaN</td></tr>
<tr><td>2024-09-02</td><td>135</td><td>120</td><td>15</td><td>12.5</td></tr>
<tr><td>2024-09-03</td><td>110</td><td>135</td><td>−25</td><td>−18.5</td></tr>
</table>
<p><code>pct_change()</code> — <code>(жаңа − ескі) / ескі</code> формуласының дайын түрі. Бірінші жолда алдыңғы мән жоқ, сондықтан NaN. Екі ереже: алдымен күн бойынша <b>сұрыптаңыз</b> және бір кестеде бірнеше аймақ болса, оларды араластырмаңыз: <code>daily.groupby('region')['revenue'].pct_change()</code>.</p>
<h3>resample: уақыт бойынша топтау</h3>
<p>Күн нағыз күн типінде болса, оны индекске қойып, кез келген кезеңге жинауға болады:</p>
<pre><code>clean['order_date'] = pd.to_datetime(clean['order_date'])
monthly = clean.set_index('order_date').resample('MS')['amount'].sum()
# 2024-01-01    31950
# 2024-02-01    ...</code></pre>
<p><code>'MS'</code> — ай (белгісі — айдың бірінші күні), <code>'W'</code> — апта, <code>'D'</code> — күн. <code>.str[:7]</code> бойынша groupby-дан айырмасы: resample тапсырыс болмаған кезеңді де (0 болып) көрсетеді, яғни уақыт қатарында «тесік» қалмайды.</p>
<h3>Күндердің айырмасы</h3>
<pre><code>df['days'] = (df['order_date'] - df['signup_date']).dt.days</code></pre>
<p>Екі күн бағанын азайтсаңыз, уақыт аралығы (Timedelta) шығады, ал <code>.dt.days</code> одан күн санын алады. Екі баған да алдымен <code>pd.to_datetime</code>-нен өтуі керек: мәтінді азайтуға болмайды.</p>
<div class="tip">Жаңа баған жасаған сайын оны <code>value_counts()</code> немесе <code>describe()</code> арқылы тексеріңіз: топтардың саны қисынды ма, күтпеген NaN жоқ па?</div>
<h3>Жиі қателер</h3>
<ul>
<li><b>Сұрыптамай shift жасау.</b> «Алдыңғы жол» кездейсоқ күн болып шығады.</li>
<li><b>Бірнеше топты араластыру.</b> Астананың бірінші күні Алматының соңғы күнімен салыстырылады. <code>groupby</code> қолданыңыз.</li>
<li><b>pd.cut-та белгі саны қате.</b> Белгі шекарадан бірге кем болуы керек, әйтпесе <code>ValueError</code>.</li>
<li><b>Мәтін бағанына resample.</b> Алдымен <code>pd.to_datetime</code>, сосын <code>set_index</code>.</li>
<li><b>map-тан кейінгі NaN-ды байқамау.</b> Сөздікте жоқ қалалар үнсіз бос қалады.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>customers</code> кестесіне екі баған қосыңыз: <code>region</code> — қаланың аймағы (<code>regions</code> сөздігі бойынша, <code>map</code>) және <code>is_social</code> — арна атауында <code>gram</code> бар болса <code>True</code> (<code>.str.contains</code>).', starter: "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\nregions = {'Алматы': 'Оңтүстік', 'Шымкент': 'Оңтүстік', 'Астана': 'Солтүстік'}\n\n", solution: "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\nregions = {'Алматы': 'Оңтүстік', 'Шымкент': 'Оңтүстік', 'Астана': 'Солтүстік'}\n\ncustomers['region'] = customers['city'].map(regions)\ncustomers['is_social'] = customers['channel'].str.contains('gram')\nprint(customers['region'].value_counts())\nprint(customers['is_social'].sum())", check: { tests: REF + "assert 'region' in customers.columns, 'region бағаны жоқ'\nassert customers['region'].tolist() == _c['city'].map(regions).tolist(), 'region = city бағанының regions сөздігі бойынша map-ы'\nassert 'is_social' in customers.columns, 'is_social бағаны жоқ'\nassert [bool(v) for v in customers['is_social']] == [v == 'instagram' for v in _c['channel']], 'is_social: channel ішінде gram бар жолдар True болуы керек'" }, hints: ["<code>customers['city'].map(regions)</code>", "<code>customers['channel'].str.contains('gram')</code>"] },
          { type: 'python', xp: 25, prompt: 'Таза тапсырыстар (<code>clean</code>) берілген. Екі баған қосыңыз: <code>size</code> — сома 3000 немесе одан көп болса <code>\'big\'</code>, әйтпесе <code>\'small\'</code> (<code>np.where</code>); <code>bucket</code> — <code>pd.cut</code> арқылы шекаралары <code>[0, 2000, 3000, 20000]</code>, белгілері <code>low</code>, <code>mid</code>, <code>high</code>.', starter: "import numpy as np\n" + LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\n", solution: "import numpy as np\n" + LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\nclean['size'] = np.where(clean['amount'] >= 3000, 'big', 'small')\nclean['bucket'] = pd.cut(clean['amount'], bins=[0, 2000, 3000, 20000], labels=['low', 'mid', 'high'])\nprint(clean['size'].value_counts())\nprint(clean['bucket'].value_counts())", check: { tests: REF + "assert 'size' in clean.columns and 'bucket' in clean.columns, 'size және bucket бағандары керек'\nassert len(clean) == len(_clean), 'clean кестесінің жолдарын өзгертпеңіз'\nassert list(clean['size']) == ['big' if a >= 3000 else 'small' for a in _clean['amount']], 'size: сома >= 3000 болса big, әйтпесе small'\n_b = _pd.cut(_clean['amount'], bins=[0, 2000, 3000, 20000], labels=['low', 'mid', 'high'])\nassert [str(v) for v in clean['bucket']] == [str(v) for v in _b], 'bucket: шекаралар [0, 2000, 3000, 20000], белгілер low, mid, high'" }, hints: ["<code>np.where(clean['amount'] &gt;= 3000, 'big', 'small')</code>", "<code>pd.cut(clean['amount'], bins=[0, 2000, 3000, 20000], labels=['low', 'mid', 'high'])</code>"] },
          { type: 'python', xp: 25, prompt: '<code>alm</code> — Алматының күндік табысы, күн бойынша сұрыпталған. Екі баған қосыңыз: <code>prev</code> — алдыңғы күннің табысы (<code>shift</code>) және <code>growth</code> — алдыңғы күнге қатысты өзгеріс <b>пайызбен</b> (<code>pct_change</code>). Ең үлкен өсім болған күнді (мәтін) <code>best_day</code>-ге жазыңыз.', starter: "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv')\nalm = daily[daily['region'] == 'Алматы'].sort_values('day').copy()\n\n", solution: "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv')\nalm = daily[daily['region'] == 'Алматы'].sort_values('day').copy()\n\nalm['prev'] = alm['revenue'].shift(1)\nalm['growth'] = alm['revenue'].pct_change() * 100\nbest_day = alm.loc[alm['growth'].idxmax(), 'day']\nprint(alm)\nprint(best_day)", check: { tests: "import pandas as _pd\n_a = _pd.read_csv('daily_sales.csv')\n_a = _a[_a['region'] == 'Алматы'].sort_values('day')\n_g = _a['revenue'].pct_change() * 100\nassert 'prev' in alm.columns and 'growth' in alm.columns, 'prev және growth бағандары керек'\nassert len(alm) == 10, 'alm ішінде 10 күн болуы керек'\nassert alm['prev'].isna().sum() == 1 and alm['prev'].iloc[1:].tolist() == _a['revenue'].iloc[:-1].tolist(), 'prev = revenue.shift(1)'\nassert alm['growth'].isna().sum() == 1, 'Бірінші күннің growth мәні NaN болуы керек'\nassert [round(float(v), 4) for v in alm['growth'].iloc[1:]] == [round(float(v), 4) for v in _g.iloc[1:]], 'growth = pct_change() * 100 (пайызбен)'\nassert str(best_day)[:10] == str(_a.loc[_g.idxmax(), 'day']), 'best_day: growth ең үлкен жолдың day мәні (idxmax)'" }, hints: ["<code>alm['revenue'].shift(1)</code>", "<code>alm['revenue'].pct_change() * 100</code>", "<code>alm.loc[alm['growth'].idxmax(), 'day']</code>"] },
          { type: 'python', xp: 25, prompt: 'Таза тапсырыстардың айлық табысын <code>resample</code> арқылы есептеп, <code>monthly</code> Series-іне жазыңыз. Алдымен <code>order_date</code>-ті күн типіне айналдырып, индекске қойыңыз.', starter: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\n", solution: LOAD + "clean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\nclean['order_date'] = pd.to_datetime(clean['order_date'])\nmonthly = clean.set_index('order_date').resample('MS')['amount'].sum()\nprint(monthly)", check: { mustInclude: ['resample'], tests: REF + "_m = _clean.groupby(_clean['order_date'].str[:7])['amount'].sum()\nassert len(monthly) == len(_m), 'monthly ішінде 6 ай болуы керек'\nassert [round(float(v)) for v in monthly.values] == [round(float(v)) for v in _m.values], 'Айлық сомалар дұрыс емес: amount бағанының sum()'\nassert str(monthly.index[0])[:7] == '2024-01', 'Индекс күн типінде болуы керек: pd.to_datetime, сосын set_index'" }, hints: ["<code>clean['order_date'] = pd.to_datetime(clean['order_date'])</code>", "<code>clean.set_index('order_date').resample('MS')['amount'].sum()</code>"] },
          { type: 'python', xp: 25, prompt: '<code>df</code> — клиент деректерімен біріктірілген таза тапсырыстар. <code>days</code> бағанын қосыңыз: клиент тіркелгеннен (<code>signup_date</code>) тапсырысқа (<code>order_date</code>) дейін өткен күндер саны. Сосын тіркелген күні-ақ (0 күн) жасалған тапсырыстар санын <code>same_day</code>-ге жазыңыз.', starter: LOAD + "customers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\n\n", solution: LOAD + "customers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\n\ndf['days'] = (pd.to_datetime(df['order_date']) - pd.to_datetime(df['signup_date'])).dt.days\nsame_day = (df['days'] == 0).sum()\nprint(df[['order_date', 'signup_date', 'days']].head())\nprint(same_day)", check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_days = (_pd.to_datetime(_d['order_date']) - _pd.to_datetime(_d['signup_date'])).dt.days\nassert 'days' in df.columns, 'days бағаны жоқ'\nassert [int(v) for v in df['days']] == [int(v) for v in _days], 'days = (order_date - signup_date).dt.days; алдымен pd.to_datetime'\nassert int(same_day) == int((_days == 0).sum()), 'same_day: days == 0 жолдар саны'" }, hints: ["Екі бағанды да күнге айналдырыңыз: <code>pd.to_datetime(df['order_date'])</code>.", "<code>(d2 - d1).dt.days</code>", "<code>(df['days'] == 0).sum()</code>"] }
        ]
      },
      {
        id: 'pd-11', title: 'NumPy: 2D массив, axis және broadcasting', minutes: 15,
        body: `
<p>pd-8 сабағында бір өлшемді массивпен таныстыңыз. Нақты дерек көбіне <b>екі өлшемді</b>: жолдар мен бағандар. DataFrame-нің ішінде дәл осындай 2D массив жатыр, ал machine learning кітапханалары (scikit-learn) деректі осы түрде қабылдайды. Сондықтан <code>shape</code>, <code>axis</code> және broadcasting ұғымдарын түсіну міндетті.</p>
<h3>shape және reshape</h3>
<p>Үш қаланың төрт апталық сатылымы бір қатарда берілген:</p>
<pre><code>import numpy as np

sales = np.array([120, 135, 110, 160,    # Алматы
                   90,  95, 105,  85,    # Астана
                   60,  70,  65,  80])   # Шымкент
print(sales.shape)        # (12,)  — бір өлшем, 12 элемент

m = sales.reshape(3, 4)   # 3 жол (қала), 4 баған (апта)
print(m.shape)            # (3, 4)
print(m[0, 1])            # 135: 0-жол, 1-баған
print(m[1])               # [ 90  95 105  85]: Астананың жолы
print(m[:, 0])            # [120  90  60]: бірінші аптаның бағаны</code></pre>
<p><code>shape</code> — <code>(жолдар, бағандар)</code>. <code>reshape</code> элементтерді өзгертпейді, тек қайта орналастырады, сондықтан элементтер саны сәйкес келуі керек: 3 × 4 = 12. Бір өлшемді <code>-1</code> деп жазсаңыз, NumPy оны өзі есептейді: <code>sales.reshape(3, -1)</code>.</p>
<h3>axis: қай бағытта есептейміз?</h3>
<table>
<tr><th>Жазылуы</th><th>Не істейді</th><th>Нәтиже</th></tr>
<tr><td><code>m.sum()</code></td><td>бәрін қосады</td><td>1175</td></tr>
<tr><td><code>m.sum(axis=0)</code></td><td>жолдар бойымен төмен жүріп, әр <b>бағанды</b> қосады</td><td><code>[270 300 280 325]</code> — әр аптаның сомасы</td></tr>
<tr><td><code>m.sum(axis=1)</code></td><td>бағандар бойымен оңға жүріп, әр <b>жолды</b> қосады</td><td><code>[525 375 275]</code> — әр қаланың сомасы</td></tr>
</table>
<p>Есте сақтау тәсілі: <code>axis</code> — <b>жойылатын</b> өлшем. <code>(3, 4)</code> массивіне <code>axis=0</code> қолдансаңыз, 3 жойылып, 4 мән қалады. <code>axis=1</code> болса, 4 жойылып, 3 мән қалады. <code>mean</code>, <code>max</code>, <code>min</code>, <code>std</code> — бәрі де осылай жұмыс істейді. pandas-та да солай: <code>df.sum(axis=1)</code> әр жолдың қосындысын береді.</p>
<h3>Broadcasting</h3>
<p>Пішіні әртүрлі массивтермен амал жасағанда NumPy кішісін үлкеніне «созады». Мұны broadcasting дейді.</p>
<pre><code>m * 1.12                      # әр элемент × 1.12 (сан бүкіл массивке созылады)

week_total = m.sum(axis=0)    # shape (4,)
share = m / week_total        # (3, 4) / (4,) → әр жол 4 мәнге бөлінеді
print(share[:, 0])            # [0.444 0.333 0.222]: 1-аптадағы қалалардың үлесі</code></pre>
<p>Ереже: пішіндер <b>оң жақтан</b> салыстырылады. Өлшемдер тең болса немесе біреуі 1 болса, амал орындалады. <code>(3, 4)</code> мен <code>(4,)</code> сәйкес: соңғы өлшемдері бірдей. Ал <code>(3, 4)</code> мен <code>(3,)</code> сәйкес емес: 4 ≠ 3.</p>
<pre><code>city_total = m.sum(axis=1)                    # shape (3,)
m / city_total                                # ValueError: пішіндер сәйкес емес
m / city_total.reshape(3, 1)                  # (3, 4) / (3, 1) → жұмыс істейді
m / m.sum(axis=1, keepdims=True)              # дәл сол, қысқа жазылуы</code></pre>
<h3>Массив жасау: arange, linspace, random</h3>
<pre><code>np.arange(0, 10, 2)        # [0 2 4 6 8]            қадаммен, соңы кірмейді
np.linspace(0, 1, 5)       # [0. 0.25 0.5 0.75 1.]  тең бөлінген 5 нүкте, соңы кіреді
np.zeros((2, 3))           # нөлдерден тұратын 2 × 3 массив

rng = np.random.default_rng(42)
rng.integers(1, 7, size=5)       # 1-ден 6-ға дейінгі 5 бүтін сан
rng.normal(2500, 400, size=3)    # орташасы 2500, шашырауы 400 болатын 3 сан</code></pre>
<p><code>42</code> — <b>seed</b> (бастапқы мән). Seed бірдей болса, «кездейсоқ» сандар әр іске қосқанда бірдей шығады. Бұл нәтижені қайталауға (reproducibility) керек: әріптес сіздің кодты іске қосып, дәл сол сандарды алады. Seed-сіз әр жолы басқа нәтиже шығады.</p>
<h3>Стандартты ауытқу: NumPy және pandas</h3>
<p>Бір деректен екі кітапхана екі түрлі сан береді:</p>
<pre><code>a = np.array([2150, 2250, 2550, 2050, 3100])
a.std()                 # 378.9  (n-ге бөледі,   ddof=0)
a.std(ddof=1)           # 423.7  (n−1-ге бөледі, ddof=1)
pd.Series(a).std()      # 423.7  (pandas әдепкіде ddof=1)</code></pre>
<p><code>ddof=0</code> — деректе <b>бүкіл жиынтық</b> бар деп есептейді. <code>ddof=1</code> — дерек үлкен жиынтықтан алынған <b>іріктеме</b> деп есептейді және бөлгішті бірге кемітеді. Аналитикте дерек әдетте іріктеме, сондықтан <code>ddof=1</code> жиі қолданылады. Ең маңыздысы — қайсысын алғаныңызды білу: екі есептің саны сәйкес келмесе, бірінші күдікті — осы.</p>
<div class="tip">Қате шықса, бірінші қадам — <code>print(a.shape)</code>. NumPy қателерінің көбі пішіннің күткендей болмауынан шығады.</div>
<h3>Жиі қателер</h3>
<ul>
<li><b>axis-ты кері түсіну.</b> <code>axis=0</code> «жолдарды қосады» емес, жолдар бойымен жүріп, әр баған үшін бір мән береді.</li>
<li><b>reshape-те элемент саны сәйкес емес.</b> 12 элементті <code>(5, 2)</code>-ге келтіру мүмкін емес.</li>
<li><b><code>(3, 4)</code>-ті <code>(3,)</code>-ке бөлу.</b> Жол бойынша бөлу үшін <code>keepdims=True</code> немесе <code>reshape(3, 1)</code> керек.</li>
<li><b>arange пен linspace-ті шатастыру.</b> arange-те үшінші аргумент — қадам, linspace-те — нүктелер саны.</li>
<li><b>Seed қоймау.</b> Нәтижені ертең қайталай алмайсыз.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>sales</code> — үш қаланың (Алматы, Астана, Шымкент) төрт апталық сатылымы бір қатарда. Оны 3 жол × 4 баған болатын <code>m</code> массивіне келтіріңіз. Сосын әр қаланың жалпы сомасын <code>by_city</code>-ге, әр аптаның жалпы сомасын <code>by_week</code>-ке жазыңыз.', starter: 'import numpy as np\n\nsales = np.array([120, 135, 110, 160, 90, 95, 105, 85, 60, 70, 65, 80])\n\n', solution: 'import numpy as np\n\nsales = np.array([120, 135, 110, 160, 90, 95, 105, 85, 60, 70, 65, 80])\n\nm = sales.reshape(3, 4)\nby_city = m.sum(axis=1)\nby_week = m.sum(axis=0)\nprint(m)\nprint(by_city, by_week)', check: { tests: "assert m.shape == (3, 4), 'm пішіні (3, 4) болуы керек: sales.reshape(3, 4)'\nassert m[1].tolist() == [90, 95, 105, 85], 'm-нің екінші жолы Астананың сатылымы болуы керек'\nassert list(by_city) == [525, 375, 275], 'by_city: әр жолдың қосындысы, axis=1'\nassert list(by_week) == [270, 300, 280, 325], 'by_week: әр бағанның қосындысы, axis=0'" }, hints: ['<code>sales.reshape(3, 4)</code>', 'Әр қала — бір жол: <code>m.sum(axis=1)</code>. Әр апта — бір баған: <code>m.sum(axis=0)</code>.'] },
          { type: 'python', xp: 25, prompt: '<code>m</code> массиві берілген (жолдар — қалалар, бағандар — апталар). Broadcasting арқылы <code>share</code> массивін есептеңіз: әр қаланың <b>сол аптадағы</b> жалпы сатылымдағы үлесі (әр бағанның қосындысы 1 болуы керек). Сосын әр қаланың <b>өз</b> жалпы сатылымындағы апталардың үлесін <code>row_share</code>-ге жазыңыз (әр жолдың қосындысы 1).', starter: 'import numpy as np\n\nm = np.array([[120, 135, 110, 160], [90, 95, 105, 85], [60, 70, 65, 80]])\n\n', solution: 'import numpy as np\n\nm = np.array([[120, 135, 110, 160], [90, 95, 105, 85], [60, 70, 65, 80]])\n\nshare = m / m.sum(axis=0)\nrow_share = m / m.sum(axis=1, keepdims=True)\nprint(share.round(3))\nprint(row_share.round(3))', check: { tests: "import numpy as _np\n_m = _np.array([[120, 135, 110, 160], [90, 95, 105, 85], [60, 70, 65, 80]])\nassert share.shape == (3, 4), 'share пішіні (3, 4) болуы керек'\nassert _np.allclose(share, _m / _m.sum(axis=0)), 'share = m / m.sum(axis=0): әр бағанның қосындысы 1'\nassert row_share.shape == (3, 4), 'row_share пішіні (3, 4) болуы керек'\nassert _np.allclose(row_share, _m / _m.sum(axis=1, keepdims=True)), 'row_share: m-ді жол қосындыларына бөліңіз (keepdims=True немесе reshape(3, 1))'" }, hints: ['Апта сомалары: <code>m.sum(axis=0)</code>, пішіні (4,). <code>m / m.sum(axis=0)</code> бірден жұмыс істейді.', 'Жол сомаларының пішіні (3,): оны (3, 1) ету керек. <code>m.sum(axis=1, keepdims=True)</code>'] },
          { type: 'python', xp: 20, prompt: '<code>a</code> — бес чектің сомасы. Стандартты ауытқуды екі тәсілмен есептеңіз: <code>std_pop</code> — жиынтық үшін (NumPy әдепкісі, <code>ddof=0</code>), <code>std_sample</code> — іріктеме үшін (<code>ddof=1</code>). Сосын pandas-тың әдепкі <code>.std()</code> мәнін <code>std_pd</code>-ге жазыңыз.', starter: 'import numpy as np\nimport pandas as pd\n\na = np.array([2150, 2250, 2550, 2050, 3100])\n\n', solution: 'import numpy as np\nimport pandas as pd\n\na = np.array([2150, 2250, 2550, 2050, 3100])\n\nstd_pop = a.std()\nstd_sample = a.std(ddof=1)\nstd_pd = pd.Series(a).std()\nprint(round(std_pop, 1), round(std_sample, 1), round(std_pd, 1))', check: { tests: "assert abs(float(std_pop) - 378.946) < 0.01, 'std_pop = a.std() (ddof=0)'\nassert abs(float(std_sample) - 423.674) < 0.01, 'std_sample = a.std(ddof=1)'\nassert abs(float(std_pd) - float(std_sample)) < 1e-6, 'std_pd = pd.Series(a).std(): ол std_sample-ге тең болуы керек'" }, hints: ['<code>a.std()</code> және <code>a.std(ddof=1)</code>', '<code>pd.Series(a).std()</code>'] },
          { type: 'python', xp: 20, prompt: 'Үш массив жасаңыз: <code>ids</code> — 1001-ден 1010-ға дейінгі бүтін сандар (<code>np.arange</code>); <code>grid</code> — 0-ден 1-ге дейін тең бөлінген 5 нүкте (<code>np.linspace</code>); <code>dice</code> — seed 42 болатын генератормен 1-ден 6-ға дейінгі 1000 кездейсоқ бүтін сан (<code>rng.integers</code>).', starter: 'import numpy as np\n\nrng = np.random.default_rng(42)\n\n', solution: 'import numpy as np\n\nrng = np.random.default_rng(42)\n\nids = np.arange(1001, 1011)\ngrid = np.linspace(0, 1, 5)\ndice = rng.integers(1, 7, size=1000)\nprint(ids)\nprint(grid)\nprint(dice[:10], dice.mean())', check: { tests: "import numpy as _np\nassert list(ids) == list(range(1001, 1011)), 'ids: np.arange(1001, 1011) — соңғы шекара кірмейді'\nassert _np.allclose(grid, [0, 0.25, 0.5, 0.75, 1]), 'grid: np.linspace(0, 1, 5)'\nassert len(dice) == 1000, 'dice ішінде 1000 сан болуы керек: size=1000'\nassert dice.min() >= 1 and dice.max() <= 6, 'dice мәндері 1-ден 6-ға дейін болуы керек: rng.integers(1, 7, ...)'\nassert (dice == _np.random.default_rng(42).integers(1, 7, size=1000)).all(), 'dice: rng-ді seed 42-мен жасап, бірінші шақыруда rng.integers(1, 7, size=1000) жазыңыз'" }, hints: ['<code>np.arange(1001, 1011)</code>: 1010 кіруі үшін шекара 1011.', '<code>np.linspace(0, 1, 5)</code>', '<code>rng.integers(1, 7, size=1000)</code>: жоғарғы шекара кірмейді.'] },
          { type: 'quiz', xp: 10, prompt: '<code>X</code> массивінің пішіні <code>(150, 5)</code>: 150 тапсырыс, 5 сандық баған. <code>X.mean(axis=0)</code> нәтижесінің пішіні қандай және ол нені білдіреді?', options: ['(150,): әр тапсырыстың орташасы', '(5,): әр бағанның орташасы', '(150, 5): өзгермейді', '(): бір сан'], answer: 1, explain: 'axis=0 — жойылатын өлшем: 150 жол бойымен жүріп, әр баған үшін бір мән қалады. Нәтиже (5,). axis=1 болса, (150,) шығар еді.' }
        ]
      },
      {
        id: 'pd-gate', gate: true, title: 'Модуль емтиханы: pandas', minutes: 25,
        body: `<p>Қорытынды тапсырмалар: сүзу, тазалау, біріктіру және топтау бір талдауда.</p>`,
        exercises: [
          { type: 'quiz', xp: 15, prompt: 'SQL-дегі <code>COUNT(DISTINCT customer_id)</code> pandas-та қалай жазылады?', options: ["df['customer_id'].count()", "df['customer_id'].nunique()", "len(df)", "df['customer_id'].size"], answer: 1, explain: 'nunique() бірегей мәндер санын береді, count() бос емес мәндердің бәрін санайды.' },
          { type: 'quiz', xp: 15, prompt: 'Неге <code>df[df[\'a\'] &gt; 1 and df[\'b\'] &lt; 5]</code> қате береді?', options: ['Бағандар жоқ', 'Series үшін and емес, &amp; керек және шарттар жақшада болуы керек', 'and тек сандарға жұмыс істейді', 'Қате бермейді'], answer: 1, explain: 'Дұрысы: df[(df[\'a\'] &gt; 1) &amp; (df[\'b\'] &lt; 5)].' },
          { type: 'python', xp: 30, prompt: 'Таза тапсырыс ережесі (pd-5 сабағындағыдай): <code>status == \'paid\'</code>, <code>amount</code> бос емес және 20 000-нан кіші. Әр қала (<code>city</code>) бойынша таза тапсырыстардан <code>customers</code> (бірегей клиенттер), <code>revenue</code> және <code>aov</code> (revenue / тапсырыс саны, бүтінге дөңгелектенген) есептеп, <code>report</code> DataFrame-ін жасаңыз. <code>city</code> кәдімгі баған болсын, табыс бойынша кему ретімен.', starter: 'import pandas as pd\n\norders = pd.read_csv(\'orders.csv\')\ncustomers = pd.read_csv(\'customers.csv\')\n\n', solution: "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\n\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)]\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\nreport = df.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index()\nreport['aov'] = (report['revenue'] / report['n']).round()\nreport = report.drop(columns=['n']).sort_values('revenue', ascending=False)\nprint(report)", check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_r = _d.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index().sort_values('revenue', ascending=False)\nassert 'city' in report.columns, 'city кәдімгі баған болуы керек'\nassert {'customers', 'revenue', 'aov'} <= set(report.columns), 'customers, revenue, aov бағандары керек'\nassert report['city'].tolist() == _r['city'].tolist(), 'Қалалар реті дұрыс емес'\nassert report['customers'].tolist() == _r['customers'].tolist(), 'customers: nunique қолданыңыз'\nassert report['revenue'].round().tolist() == _r['revenue'].round().tolist(), 'revenue дұрыс емес: таза тапсырыстарды алдыңыз ба?'\nassert [round(float(a)) for a in report['aov']] == [round(r / n) for r, n in zip(_r['revenue'], _r['n'])], 'aov = revenue / тапсырыс саны'" } }
        ]
      }
    ]
  };
})();
