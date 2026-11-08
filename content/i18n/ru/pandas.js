// M2.2 pandas & NumPy: Russian text. Code, solutions and expected output are in content/pandas.js.
(function () {
  const REF = "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n";
  DJ.i18n.patch({
    modules: {
      'm2-2': { intro: 'pandas — основная библиотека для анализа данных в Python: загрузка таблицы (DataFrame), фильтрация, группировка, объединение и очистка. В этом модуле настоящий pandas запускается прямо в вашем браузере. Данные — файлы сети кофеен «Бірінші кофе»: orders.csv, customers.csv и daily_sales.csv. Для каждого действия, знакомого вам по SQL, вы изучите аналог в pandas.' }
    },
    lessons: {
      'pd-1': {
        title: 'DataFrame и загрузка CSV',
        body: `
<p><b>DataFrame</b> — таблица из строк и столбцов (как лист Excel или таблица SQL). Каждый столбец — это <b>Series</b>.</p>
<pre><code>import pandas as pd

df = pd.DataFrame({
    'city': ['Алматы', 'Астана', 'Шымкент'],
    'orders': [120, 95, 40]
})
print(df)
print(df.shape)     # (3, 2): 3 строки, 2 столбца</code></pre>
<h3>Чтение CSV-файла</h3>
<pre><code>orders = pd.read_csv('orders.csv')
orders.head()       # первые 5 строк
orders.info()       # столбцы, типы, пропуски
orders.describe()   # статистика числовых столбцов</code></pre>
<table>
<tr><th>pandas</th><th>SQL</th></tr>
<tr><td><code>df.head(10)</code></td><td><code>SELECT * FROM t LIMIT 10</code></td></tr>
<tr><td><code>len(df)</code></td><td><code>SELECT COUNT(*) FROM t</code></td></tr>
<tr><td><code>df.columns</code></td><td>список столбцов</td></tr>
</table>
<div class="tip">Когда вы впервые пишете <code>import pandas</code>, библиотека загружается (несколько секунд). Дальше она работает сразу.</div>
<h3>Первый взгляд на новые данные</h3>
<p>После чтения любого CSV возьмите в привычку четыре команды:</p>
<ol>
<li><code>df.shape</code>: число строк и столбцов такое, как вы ожидали?</li>
<li><code>df.head()</code>: как выглядят сами данные, понятны ли названия столбцов?</li>
<li><code>df.info()</code>: у каждого столбца правильный тип? Если сумма имеет тип <code>object</code> (текст), значит, в ней есть нечисловые символы.</li>
<li><code>df.describe()</code>: правдоподобны ли минимальные и максимальные значения?</li>
</ol>
<p>Это pandas-версия профилирования (profiling) из уроков SQL. Двухминутная проверка потом избавляет от часов поиска ошибок.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Другой разделитель</b>: европейские файлы Excel используют не запятую, а точку с запятой. Тогда пишите <code>pd.read_csv('file.csv', sep=';')</code>.</li>
<li><b>Кодировка</b>: если кириллица превратилась в «кракозябры», попробуйте <code>encoding='utf-8'</code> или <code>encoding='cp1251'</code>.</li>
<li><b>Даты остались текстом</b>: <code>pd.read_csv(..., parse_dates=['order_date'])</code> сразу превращает их в тип даты.</li>
</ul>`,
        ex: [
          { prompt: 'Создайте DataFrame <code>df</code> из данных по трём городам: столбец <code>city</code> — <code>[\'Алматы\', \'Астана\', \'Шымкент\']</code>, столбец <code>orders</code> — <code>[120, 95, 40]</code>. Затем выполните <code>print(df)</code>.', check: { tests: "assert isinstance(df, pd.DataFrame), 'df должен быть DataFrame'\nassert list(df.columns) == ['city', 'orders'], 'Столбцы: city, orders'\nassert df['orders'].tolist() == [120, 95, 40], 'Значения orders должны быть [120, 95, 40]'" }, hints: ['<code>pd.DataFrame({\'city\': [...], \'orders\': [...]})</code>'] },
          { prompt: 'Прочитайте файл <code>orders.csv</code> в переменную <code>orders</code>. Запишите число строк в переменную <code>n_rows</code>, число столбцов — в <code>n_cols</code> и выведите их.', check: { tests: "assert n_rows == 150, 'Неверное число строк: используйте orders.shape'\nassert n_cols == 5, 'Неверное число столбцов'" }, hints: ['<code>orders.shape</code> возвращает кортеж (строки, столбцы).'] }
        ]
      },
      'pd-2': {
        title: 'Столбцы, строки и фильтрация',
        body: `
<pre><code>orders['amount']                  # один столбец (Series)
orders[['id', 'amount']]          # несколько столбцов (DataFrame)
orders.loc[0, 'amount']           # метка строки + имя столбца
orders.iloc[0:3]                  # первые 3 строки по позиции</code></pre>
<h3>Фильтр (WHERE)</h3>
<pre><code>paid = orders[orders['status'] == 'paid']
big  = orders[(orders['status'] == 'paid') &amp; (orders['amount'] &gt; 3000)]
two  = orders[orders['customer_id'].isin([1, 2])]</code></pre>
<div class="tip">В pandas пишут не <code>and</code>/<code>or</code>, а <code>&amp;</code> и <code>|</code>, и каждое условие должно быть <b>в скобках</b>.</div>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>WHERE a = 1 AND b &gt; 2</code></td><td><code>df[(df['a'] == 1) &amp; (df['b'] &gt; 2)]</code></td></tr>
<tr><td><code>WHERE x IN (1, 2)</code></td><td><code>df[df['x'].isin([1, 2])]</code></td></tr>
<tr><td><code>WHERE x IS NULL</code></td><td><code>df[df['x'].isna()]</code></td></tr>
</table>
<h3>Добавление нового столбца</h3>
<p>Вычисляемый столбец создаётся как <code>SELECT amount * 1.12 AS with_vat</code> в SQL, но результат добавляется в саму таблицу:</p>
<pre><code>orders['with_vat'] = orders['amount'] * 1.12
orders['is_big'] = orders['amount'] &gt; 3000</code></pre>
<p>Операция применяется сразу ко всему столбцу, цикл не нужен.</p>
<h3>Разница между loc и iloc</h3>
<p><code>loc</code> работает с <b>меткой</b> строки (index), <code>iloc</code> — с её <b>позицией</b> (0, 1, 2...). После фильтрации в индексе остаются «дыры»: <code>paid.loc[0]</code> выдаст ошибку, если строка 0 не прошла фильтр. А <code>paid.iloc[0]</code> всегда возвращает первую строку. Чтобы перенумеровать индекс, используйте <code>paid.reset_index(drop=True)</code>.</p>
<div class="tip">Фильтр можно записать и методом <code>query</code>: <code>orders.query("status == 'paid' and amount &gt; 3000")</code>. Здесь слово <code>and</code> работает, а запись ближе к SQL.</div>`,
        ex: [
          { prompt: 'Запишите в переменную <code>paid</code> только оплаченные (<code>status == \'paid\'</code>) заказы и выведите их количество.', check: { tests: REF + "assert len(paid) == (_o['status'] == 'paid').sum(), 'В paid должны быть только строки со status == \"paid\"'\nassert set(paid['status']) == {'paid'}, 'Остались другие статусы'" }, hints: ["<code>orders[orders['status'] == 'paid']</code>"] },
          { prompt: 'Запишите в переменную <code>big</code> оплаченные заказы с суммой больше 3000. Оставьте только столбцы <code>id</code>, <code>customer_id</code>, <code>amount</code>.', check: { tests: REF + "_b = _o[(_o['status'] == 'paid') & (_o['amount'] > 3000)]\nassert list(big.columns) == ['id', 'customer_id', 'amount'], 'Столбцы: id, customer_id, amount'\nassert sorted(big['id']) == sorted(_b['id']), 'Неверное число строк или неверный фильтр'" }, hints: ['Соедините два условия через <code>&amp;</code>, каждое возьмите в скобки.', "В конце <code>[['id', 'customer_id', 'amount']]</code>"] }
        ]
      },
      'pd-3': {
        title: 'Новые столбцы и сортировка',
        body: `
<p>Чтобы добавить новый столбец в Excel, вы пишете формулу в одну ячейку и протягиваете её вниз. В pandas протягивать не нужно: вы пишете формулу для всего столбца один раз, и она сразу вычисляется для всех строк. Это называется <b>векторизацией</b>, цикл Python не нужен.</p>
<pre><code>orders['amount_k'] = orders['amount'] / 1000
orders['month'] = orders['order_date'].str[:7]        # '2024-03-05' → '2024-03'
orders['size'] = orders['amount'].apply(lambda x: 'big' if x &gt; 3000 else 'small')</code></pre>
<p><code>.str[:7]</code> берёт первые 7 символов текста (как срез в Python). <code>order_date</code> читается из CSV как текст, поэтому это работает.</p>
<h3>Пример: вход → код → результат</h3>
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
<p>Чтобы получить N самых больших строк, после сортировки напишите <code>.head(N)</code>. Если нужен только один статус, <b>сначала отфильтруйте</b> (как в прошлом уроке), а потом сортируйте.</p>
<h3>Сортировка (ORDER BY)</h3>
<pre><code>orders.sort_values('amount', ascending=False).head(5)   # 5 самых больших
orders.nlargest(5, 'amount')                            # то же самое
orders.sort_values(['customer_id', 'order_date'])       # по двум столбцам</code></pre>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>SELECT amount / 1000 AS amount_k</code></td><td><code>df['amount_k'] = df['amount'] / 1000</code></td></tr>
<tr><td><code>substr(order_date, 1, 7)</code></td><td><code>df['order_date'].str[:7]</code></td></tr>
<tr><td><code>ORDER BY amount DESC LIMIT 5</code></td><td><code>df.sort_values('amount', ascending=False).head(5)</code></td></tr>
</table>
<p>Переименование: <code>df.rename(columns={'amount': 'sum'})</code>. Удаление столбца: <code>df.drop(columns=['size'])</code>.</p>
<div class="tip"><b>Частые ошибки:</b>
<ul>
<li>Если забыть <code>ascending=False</code>, наверху окажутся самые <b>маленькие</b> значения (по умолчанию — по возрастанию).</li>
<li><code>sort_values</code> не меняет таблицу на месте, а возвращает новую. Запишите результат в переменную: <code>res = df.sort_values(...)</code>.</li>
<li>Если при добавлении столбца в отфильтрованную таблицу появляется предупреждение, напишите <code>.copy()</code> после фильтра.</li>
</ul></div>`,
        ex: [
          { prompt: 'Добавьте в <code>orders</code> столбец <code>month</code>: первые 7 символов <code>order_date</code> (например, <code>2024-03</code>).', check: { tests: "assert 'month' in orders.columns, 'Нет столбца month'\nassert (orders['month'] == orders['order_date'].str[:7]).all(), 'month = первые 7 символов order_date'" }, hints: ["<code>orders['order_date'].str[:7]</code>"] },
          { prompt: 'Запишите в переменную <code>top5</code> 5 оплаченных заказов с самой большой суммой, по убыванию.', check: { tests: REF + "_t = _o[_o['status'] == 'paid'].sort_values('amount', ascending=False).head(5)\nassert len(top5) == 5, 'В top5 должно быть 5 строк'\nassert top5['amount'].tolist() == _t['amount'].tolist(), 'Суммы должны идти по убыванию'\nassert set(top5['status']) == {'paid'}, 'Только заказы paid'" }, hints: ["<code>sort_values('amount', ascending=False).head(5)</code>"] }
        ]
      },
      'pd-4': {
        title: 'groupby: группировка и агрегаты',
        body: `
<p>Представьте, что вы разложили чеки из кассы на отдельные стопки по клиентам, сложили каждую стопку на калькуляторе и записали итоги на один листок. <code>groupby</code> делает именно это. Это <code>GROUP BY</code> из SQL. Три шага: разделение (split) → вычисление (apply) → объединение (combine).</p>
<h3>Пример: шаг за шагом</h3>
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
<li><b>Split:</b> клиент 1 → [2000, 2500]; клиент 2 → [3000, 4000]; клиент 3 → [1500].</li>
<li><b>Apply:</b> к каждой группе <code>sum</code>: 4500; 7000; 1500.</li>
<li><b>Combine:</b> одна Series, индекс — <code>customer_id</code>:</li>
</ol>
<pre><code>customer_id
1    4500
2    7000
3    1500
Name: amount, dtype: int64</code></pre>
<p>Если нужно несколько агрегатов, внутри <code>.agg()</code> пишем <code>новое_имя=('столбец', 'функция')</code>. На той же таблице <code>.agg(orders=('id', 'count'), revenue=('amount', 'sum')).reset_index()</code> даёт:</p>
<table>
<tr><th>customer_id</th><th>orders</th><th>revenue</th></tr>
<tr><td>1</td><td>2</td><td>4500</td></tr>
<tr><td>2</td><td>2</td><td>7000</td></tr>
<tr><td>3</td><td>1</td><td>1500</td></tr>
</table>
<p>Ключ группировки должен быть в таблице. Например, чтобы сгруппировать по месяцам, сначала добавьте столбец <code>month</code> (прошлый урок), а затем <code>groupby('month')</code>. Чтобы отсортировать результат, в конце добавляется <code>sort_values</code>.</p>
<pre><code># один агрегат → Series
orders.groupby('status')['amount'].sum()

# несколько агрегатов → DataFrame
orders.groupby('customer_id').agg(
    orders=('id', 'count'),
    revenue=('amount', 'sum'),
    avg_check=('amount', 'mean')
).reset_index()</code></pre>
<table>
<tr><th>SQL</th><th>pandas</th></tr>
<tr><td><code>COUNT(*)</code></td><td><code>'count'</code> или <code>.size()</code></td></tr>
<tr><td><code>COUNT(DISTINCT x)</code></td><td><code>'nunique'</code></td></tr>
<tr><td><code>WHERE status = 'paid'</code></td><td>фильтр <b>до</b> группировки: <code>orders[orders['status'] == 'paid'].groupby(...)</code></td></tr>
<tr><td><code>HAVING SUM(a) &gt; 10</code></td><td>фильтр <b>после</b> агрегации: <code>res[res['revenue'] &gt; 10]</code></td></tr>
<tr><td><code>ORDER BY revenue DESC</code></td><td><code>.sort_values('revenue', ascending=False)</code></td></tr>
</table>
<div class="tip"><code>reset_index()</code> превращает столбец группировки из индекса обратно в обычный столбец. Это удобно для дальнейшего объединения результата.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Забывают <code>reset_index()</code>: <code>customer_id</code> остаётся в индексе, и <code>df['customer_id']</code> выдаёт ошибку.</li>
<li>Забывают фильтр: заказы refund тоже попадают в выручку. Сначала оставьте <code>paid</code>.</li>
<li><code>'count'</code> считает только непустые значения: <code>('amount', 'count')</code> не учитывает пустые суммы, а <code>('id', 'count')</code> считает все заказы.</li>
</ul>`,
        ex: [
          { prompt: 'Посчитайте выручку за каждый месяц по оплаченным заказам: <code>monthly</code> — Series, у которой индекс — месяц (первые 7 символов <code>order_date</code>), а значение — сумма <code>amount</code>.', check: { tests: REF + "_p = _o[_o['status'] == 'paid']\n_m = _p.groupby(_p['order_date'].str[:7])['amount'].sum()\nassert len(monthly) == 6, 'Должно быть шесть месяцев'\nassert [round(float(v)) for v in monthly.values] == [round(float(v)) for v in _m.values], 'Месячные суммы не совпадают: вы взяли только заказы paid?'" }, hints: ['Сначала добавьте столбец <code>month</code>.', "<code>paid.groupby('month')['amount'].sum()</code>"] },
          { prompt: 'По оплаченным заказам посчитайте для каждого клиента <code>orders</code> (число заказов) и <code>revenue</code> (сумму) и создайте DataFrame <code>by_cust</code> (<code>customer_id</code> должен быть обычным столбцом). Отсортируйте по выручке по убыванию.', check: { tests: REF + "_g = _o[_o['status'] == 'paid'].groupby('customer_id').agg(orders=('id', 'count'), revenue=('amount', 'sum')).reset_index().sort_values('revenue', ascending=False)\nassert 'customer_id' in by_cust.columns, 'customer_id должен быть столбцом: используйте reset_index()'\nassert {'orders', 'revenue'} <= set(by_cust.columns), 'Нужны столбцы orders и revenue'\nassert len(by_cust) == len(_g), 'Неверное число клиентов'\nassert by_cust['revenue'].round().tolist() == _g['revenue'].round().tolist(), 'Неверные значения или порядок revenue'" }, hints: ["<code>.agg(orders=('id', 'count'), revenue=('amount', 'sum'))</code>", "<code>.reset_index().sort_values('revenue', ascending=False)</code>"] }
        ]
      },
      'pd-5': {
        title: 'Пропуски и очистка данных',
        body: `
<pre><code>orders.isna().sum()                  # число пропусков в каждом столбце
orders.dropna(subset=['amount'])     # убрать строки с пустым amount
orders['amount'].fillna(0)           # заполнить пропуски нулём (осторожно!)
orders.drop_duplicates()             # повторяющиеся строки
orders['amount'].astype(int)         # сменить тип</code></pre>
<h3>Выбросы (outliers)</h3>
<pre><code>q1, q3 = orders['amount'].quantile([0.25, 0.75])
iqr = q3 - q1
outliers = orders[orders['amount'] &gt; q3 + 1.5 * iqr]</code></pre>
<div class="tip">Заполнение пустой суммы нулём искусственно занижает средний чек. Обычно такие строки удаляют или выясняют причину. Всегда записывайте своё решение.</div>
<h3>Порядок очистки</h3>
<p>Очистку лучше выполнять один раз и в одном порядке. Например:</p>
<pre><code>clean = (orders
    .drop_duplicates()
    .dropna(subset=['amount'])
    .query("status == 'paid' and amount &lt; 20000"))
print(len(orders), '→', len(clean))</code></pre>
<p>«Цепочка» в скобках (method chaining) записывает каждый шаг отдельной строкой, а последний <code>print</code> показывает, сколько строк удалено. Обязательно указывайте это число в отчёте.</p>
<h3>Очистка текста</h3>
<p>В pandas к текстовому столбцу строковые методы применяются через <code>.str</code>:</p>
<pre><code>df['city'] = df['city'].str.strip().str.title()
df['email'] = df['email'].str.lower()</code></pre>
<p>Эти методы пропускают пустые значения, поэтому <code>NaN</code> не вызывает ошибку.</p>
<div class="tip">Записывайте результат очистки в новую переменную (<code>clean</code>), не меняя исходную таблицу. Если ошибётесь, легко начать заново с исходных данных.</div>`,
        ex: [
          { prompt: 'Запишите число пропусков в столбце <code>amount</code> в переменную <code>null_count</code>.', check: { tests: "assert int(null_count) == 6, 'Неверное число пропусков: используйте isna().sum()'" }, hints: ["<code>orders['amount'].isna().sum()</code>"] },
          { prompt: 'Создайте таблицу чистых заказов в переменной <code>clean</code>: <code>status == \'paid\'</code>, <code>amount</code> не пустой и меньше 20 000. Затем приведите тип <code>amount</code> к <code>int</code> и выведите средний чек.', check: { tests: REF + "assert len(clean) == len(_clean), 'Неверное число строк: проверьте три условия'\nassert clean['amount'].isna().sum() == 0, 'Остались пропуски'\nassert clean['amount'].max() < 20000, 'Остался выброс'\nassert str(clean['amount'].dtype).startswith('int'), 'Тип amount должен быть int: astype(int)'" }, hints: ["<code>orders['amount'].notna()</code>", 'Сделайте копию: <code>.copy()</code>, затем <code>astype(int)</code>.'] }
        ]
      },
      'pd-6': {
        title: 'merge: объединение таблиц',
        body: `
<p>На одном листе есть заказы, но нет города и канала клиента. На втором листе — список клиентов. В Excel вы через VLOOKUP «подтягиваете» данные клиента к каждому заказу. В pandas это <code>merge</code>, аналог <code>JOIN</code> в SQL.</p>
<h3>Пример: какие строки совпадают</h3>
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
<p>У клиента 1 два заказа, поэтому его город скопирован в две строки. Клиента 4 нет в customers: <code>left</code> сохраняет строку, но её значения пустые (NaN). При <code>how='inner'</code> заказ 13 исчез бы, и осталось бы 3 строки. У клиента 3 нет заказов, он появится только при <code>'outer'</code>.</p>
<p>После объединения можно группировать по любому столбцу: <code>df.groupby('channel')['amount'].sum()</code> → instagram 3500, 2gis 3000.</p>
<pre><code>customers = pd.read_csv('customers.csv')

df = orders.merge(customers, left_on='customer_id', right_on='id',
                  how='left', suffixes=('_order', '_customer'))</code></pre>
<table>
<tr><th>how</th><th>SQL</th></tr>
<tr><td><code>'inner'</code> (по умолчанию)</td><td><code>INNER JOIN</code></td></tr>
<tr><td><code>'left'</code></td><td><code>LEFT JOIN</code></td></tr>
<tr><td><code>'outer'</code></td><td><code>FULL OUTER JOIN</code></td></tr>
</table>
<p>Если имена ключей одинаковые: <code>on='customer_id'</code>. Если разные (здесь <code>customer_id</code> и <code>id</code>), пишут <code>left_on</code> и <code>right_on</code>. Поскольку столбец <code>id</code> есть в обеих таблицах, <code>suffixes</code> различает имена (иначе получатся <code>id_x</code>, <code>id_y</code>).</p>
<p>Аналог на SQL:</p>
<pre><code>SELECT o.*, c.city, c.channel
FROM orders o
LEFT JOIN customers c ON c.id = o.customer_id;</code></pre>
<div class="tip">После объединения проверьте число строк: если <code>len(df)</code> больше ожидаемого, ключ повторяется.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Написать <code>on='id'</code>: id заказа сравнивается с id клиента, результат неверный, но сообщения об ошибке нет.</li>
<li>Если ключ в правой таблице повторяется, строки размножаются, и суммы вырастают вдвое.</li>
<li>После <code>left</code> в несовпавших строках будет NaN. <code>groupby</code> по умолчанию отбрасывает ключ NaN, поэтому эта сумма не видна в группах.</li>
</ul>`,
        ex: [
          { prompt: 'Объедините чистые заказы (<code>clean</code> уже готов) с <code>customers.csv</code> и посчитайте выручку каждого канала (<code>channel</code>). Результат: Series <code>by_channel</code>, по убыванию.', check: { tests: REF + "_m = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel')['amount'].sum().sort_values(ascending=False)\nassert list(by_channel.index) == list(_m.index), 'Неверный порядок каналов: отсортируйте по убыванию'\nassert [round(float(v)) for v in by_channel.values] == [round(float(v)) for v in _m.values], 'Суммы не совпадают'" }, hints: ["<code>clean.merge(customers, left_on='customer_id', right_on='id')</code>", "<code>.groupby('channel')['amount'].sum().sort_values(ascending=False)</code>"] },
          { prompt: 'Мы объединили 150 заказов с 40 клиентами через <code>how=\'left\'</code>, в результате 150 строк. А если бы получилось 300 строк, что бы это значило?', options: ['Всё правильно', 'В таблице customers повторяется id какого-то клиента', 'Таблица orders пустая', 'Нужно было how=\'inner\''], explain: 'Если ключ повторяется в правой таблице, каждый заказ копируется несколько раз. После объединения всегда проверяйте число строк.' }
        ]
      },
      'pd-7': {
        title: 'Даты и pivot_table',
        body: `
<p>Дата, прочитанная из CSV, — это просто текст, например <code>'2024-03-05'</code>. Сравнивать даты в виде текста или находить день недели трудно. <code>pd.to_datetime</code> превращает её в настоящую дату, а затем через <code>.dt</code> мы получаем её части.</p>
<pre><code>orders['order_date'] = pd.to_datetime(orders['order_date'])
orders['month'] = orders['order_date'].dt.to_period('M')   # 2024-03
orders['weekday'] = orders['order_date'].dt.day_name()      # 'Tuesday'</code></pre>
<p>Если нужен только месяц, хватит и <code>.str[:7]</code> на тексте (урок pd-3).</p>
<h3>pivot_table: сводная таблица</h3>
<p>Как PivotTable в Excel: один столбец разворачивается по строкам (<code>index</code>), другой — по столбцам (<code>columns</code>), а на пересечении стоит агрегат значений (<code>values</code> + <code>aggfunc</code>). Это «двумерный groupby».</p>
<p>Пример: <code>df</code> — заказы, объединённые с клиентами:</p>
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
<p>В Астане в январе заказов нет. Без <code>fill_value=0</code> в этой ячейке стоял бы NaN. Ровно то же даёт <code>df.groupby(['city', 'month'])['amount'].sum().unstack(fill_value=0)</code>. В SQL: <code>GROUP BY city, month</code>, а чтобы развернуть месяцы в столбцы, для каждого месяца нужно отдельное выражение вроде <code>SUM(CASE WHEN month = '2024-01' THEN amount END)</code>.</p>
<h3>Временной ряд</h3>
<p><code>daily_sales.csv</code> — дневная выручка каждого региона (<code>day</code>, <code>region</code>, <code>revenue</code>). Итог по регионам — тот же <code>groupby</code>, вы лишь выбираете агрегат: <code>sum</code> (всего), <code>mean</code> (в среднем за день), <code>max</code>.</p>
<pre><code>daily = pd.read_csv('daily_sales.csv', parse_dates=['day'])
daily.groupby('region')['revenue'].sum()
daily.set_index('day').groupby('region')['revenue'].rolling(3).mean()  # скользящее среднее за 3 дня</code></pre>
<p>Например, если в Алматы было 100 и 120, а в Астане 80 и 90, то среднее за день: Алматы 110, Астана 85.</p>
<div class="tip"><b>Частые ошибки:</b>
<ul>
<li>Применение <code>.dt</code> к текстовому столбцу выдаёт ошибку: сначала <code>pd.to_datetime</code>.</li>
<li>Если передать в <code>pivot_table</code> необъединённую <code>orders</code>, столбец <code>city</code> не найдётся: сначала <code>merge</code>.</li>
<li><code>aggfunc</code> по умолчанию равен <code>'mean'</code>: если нужна сумма, явно напишите <code>'sum'</code>.</li>
</ul></div>`,
        ex: [
          { prompt: 'Объедините чистые заказы с клиентами и создайте сводную таблицу <code>pt</code>: строки — <code>city</code>, столбцы — месяц (<code>month</code>, например <code>2024-01</code>), значения — сумма <code>amount</code>, пустые ячейки — 0.', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_d['month'] = _d['order_date'].str[:7]\n_p = _pd.pivot_table(_d, index='city', columns='month', values='amount', aggfunc='sum', fill_value=0)\nassert list(pt.index) == list(_p.index), 'Строки должны быть городами'\nassert [str(c) for c in pt.columns] == [str(c) for c in _p.columns], 'Столбцы должны быть месяцами'\nassert (pt.values.round() == _p.values.round()).all(), 'Значения не совпадают'" }, hints: ["<code>pd.pivot_table(df, index='city', columns='month', values='amount', aggfunc='sum', fill_value=0)</code>"] },
          { prompt: 'Прочитайте файл <code>daily_sales.csv</code> и запишите среднюю дневную выручку каждого региона (<code>region</code>) в Series <code>avg_by_region</code>.', check: { tests: "_d = __import__('pandas').read_csv('daily_sales.csv').groupby('region')['revenue'].mean()\nassert list(avg_by_region.index) == list(_d.index), 'Индекс должен состоять из регионов'\nassert [round(float(v), 2) for v in avg_by_region.values] == [round(float(v), 2) for v in _d.values], 'Средние значения не совпадают'" }, hints: ["<code>daily.groupby('region')['revenue'].mean()</code>"] }
        ]
      },
      'pd-8': {
        title: 'Основы NumPy',
        body: `
<p><b>NumPy</b> — фундамент pandas: быстрые числовые массивы. Внутри столбца pandas лежит массив NumPy.</p>
<pre><code>import numpy as np

a = np.array([2150, 2250, 2550, 48000])
a.mean(), np.median(a), a.std()
a * 1.12                         # сразу к каждому элементу (векторизация)
a[a &lt; 20000]                     # фильтрация через маску
np.where(a &gt; 3000, 'big', 'small')</code></pre>
<p>Медиана не чувствительна к выбросу (48000), а среднее чувствительно. Это вы знаете из модуля статистики.</p>
<div class="tip">Цикл Python на миллионе строк работает медленно. Операции NumPy/pandas выполняются на языке C, поэтому они в сотни раз быстрее.</div>
<h3>Пример векторизации</h3>
<p>Чтобы прибавить НДС к списку Python, нужен цикл:</p>
<pre><code>prices = [2150, 2250, 2550]
with_vat = [p * 1.12 for p in prices]</code></pre>
<p>В NumPy достаточно одного действия: <code>np.array(prices) * 1.12</code>. Результат тот же, но на миллионе элементов NumPy намного быстрее, а код короче и легче читается.</p>
<h3>Полезные функции</h3>
<table>
<tr><th>Функция</th><th>Что делает</th></tr>
<tr><td><code>np.round(a, 1)</code></td><td>округление</td></tr>
<tr><td><code>np.percentile(a, 90)</code></td><td>90-й перцентиль</td></tr>
<tr><td><code>np.cumsum(a)</code></td><td>накопленная сумма</td></tr>
<tr><td><code>np.log(a)</code></td><td>логарифм (чтобы выправить скошенные данные)</td></tr>
<tr><td><code>a.argmax()</code></td><td>позиция самого большого элемента</td></tr>
</table>
<div class="tip">Все элементы массива имеют один тип. Если смешать числа и текст, NumPy превратит всё в текст, и арифметика перестанет работать.</div>`,
        ex: [
          { prompt: 'Запишите среднее массива <code>a</code> в <code>mean_all</code>, медиану — в <code>med</code>, а среднее элементов меньше 20 000 — в <code>mean_clean</code>.', check: { tests: "assert abs(mean_all - 8857.142857) < 0.01, 'mean_all неверно'\nassert med == 2250, 'med неверно: np.median'\nassert abs(mean_clean - 2333.333333) < 0.01, 'mean_clean: a[a < 20000].mean()'" }, hints: ['<code>a[a &lt; 20000].mean()</code>'] },
          { prompt: 'Что возвращает <code>np.where(a &gt; 3000, \'big\', \'small\')</code>?', options: ['Индексы элементов больше 3000', 'Массив из строк \'big\' или \'small\' для каждого элемента', 'Массив True/False', 'Одну строку'], explain: 'np.where с тремя аргументами — векторизованный IF: если условие истинно, берётся первое значение, иначе второе.' }
        ]
      },
      'pd-gate': {
        title: 'Экзамен модуля: pandas',
        body: `<p>Итоговые задания: фильтрация, очистка, объединение и группировка в одном анализе.</p>`,
        ex: [
          { prompt: 'Как в pandas записать SQL-выражение <code>COUNT(DISTINCT customer_id)</code>?', explain: 'nunique() даёт число уникальных значений, а count() считает все непустые значения.' },
          { prompt: 'Почему <code>df[df[\'a\'] &gt; 1 and df[\'b\'] &lt; 5]</code> выдаёт ошибку?', options: ['Нет таких столбцов', 'Для Series нужен не and, а &amp;, и условия должны быть в скобках', 'and работает только с числами', 'Ошибки не будет'], explain: 'Правильно: df[(df[\'a\'] &gt; 1) &amp; (df[\'b\'] &lt; 5)].' },
          { prompt: 'По каждому городу (<code>city</code>) посчитайте на чистых заказах <code>customers</code> (уникальные клиенты), <code>revenue</code> и <code>aov</code> (revenue / число заказов, округлённое до целого) и создайте DataFrame <code>report</code>. <code>city</code> должен быть обычным столбцом, сортировка — по выручке по убыванию.', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_r = _d.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index().sort_values('revenue', ascending=False)\nassert 'city' in report.columns, 'city должен быть обычным столбцом'\nassert {'customers', 'revenue', 'aov'} <= set(report.columns), 'Нужны столбцы customers, revenue, aov'\nassert report['city'].tolist() == _r['city'].tolist(), 'Неверный порядок городов'\nassert report['customers'].tolist() == _r['customers'].tolist(), 'customers: используйте nunique'\nassert report['revenue'].round().tolist() == _r['revenue'].round().tolist(), 'revenue неверно: вы взяли чистые заказы?'\nassert [round(float(a)) for a in report['aov']] == [round(r / n) for r, n in zip(_r['revenue'], _r['n'])], 'aov = revenue / число заказов'" } }
        ]
      }
    }
  });
})();
