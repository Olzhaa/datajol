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
<p>Такой первый просмотр данных называют <b>profiling</b> (профилирование); подробно вы изучите его позже, в модуле «Cleaning &amp; EDA». Двухминутная проверка потом избавляет от часов поиска ошибок.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Другой разделитель</b>: европейские файлы Excel используют не запятую, а точку с запятой. Тогда пишите <code>pd.read_csv('file.csv', sep=';')</code>.</li>
<li><b>Кодировка</b>: если кириллица превратилась в непонятные символы, попробуйте <code>encoding='utf-8'</code> или <code>encoding='cp1251'</code>.</li>
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
<p><code>lambda x: ...</code> в третьей строке — безымянная функция в одну строку: «возьми <code>x</code> и верни значение выражения после двоеточия». <code>.apply</code> по очереди применяет её к каждому значению столбца. Здесь для каждой суммы получается <code>'big'</code> или <code>'small'</code>.</p>
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
orders['amount'].astype(int)         # сменить тип (при пустом значении выдаст ошибку)</code></pre>
<p>Применяйте <code>astype(int)</code> только <b>после</b> <code>dropna</code> или <code>fillna</code>. Пустое значение (<code>NaN</code>) не превращается в целое число: даже если в столбце остался всего один NaN, pandas выдаст ошибку <code>IntCastingNaNError</code>. По этой причине числовой столбец с пустыми значениями по умолчанию читается как <code>float</code>.</p>
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
<p>Медиана не чувствительна к выбросу (48000), а среднее чувствительно. Это вы знаете из урока «Среднее, медиана, мода» модуля M0.2.</p>
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
      'pd-9': {
        title: 'value_counts, concat и файлы',
        body: `
<p>В этом уроке вы изучите четыре небольших, но очень частых действия повседневной работы: подсчёт значений, соединение таблиц по вертикали, сохранение результата в файл и превращение «грязного» текста в число.</p>
<h3>value_counts: подсчёт значений</h3>
<p>Самый быстрый способ познакомиться с категориальным столбцом — посчитать, сколько раз встречается каждое значение. Это <code>GROUP BY status</code> + <code>COUNT(*)</code> + <code>ORDER BY ... DESC</code> из SQL, только одним методом:</p>
<pre><code>orders['status'].value_counts()
# paid      146
# refund      4

orders['status'].value_counts(normalize=True)
# paid      0.973333
# refund    0.026667</code></pre>
<p><code>normalize=True</code> вместо количества даёт <b>долю</b> (в сумме 1). Для процентов умножьте на 100: <code>(... * 100).round(1)</code>. Результат — Series: в индексе значения, внутри числа. Получить конкретное значение: <code>counts['refund']</code>.</p>
<p>По умолчанию пустые значения не считаются. Чтобы увидеть и их, напишите <code>value_counts(dropna=False)</code>.</p>
<h3>pd.concat: соединение таблиц по вертикали</h3>
<p>Данные часто приходят в отдельных файлах: по файлу на каждый месяц. Поставить таблицы с одинаковыми столбцами одну под другой позволяет <code>pd.concat</code> (в SQL это <code>UNION ALL</code>):</p>
<pre><code>jan = pd.DataFrame({'id': [1, 2], 'amount': [2400, 2750]})
feb = pd.DataFrame({'id': [3], 'amount': [2600]})

both = pd.concat([jan, feb], ignore_index=True)
#    id  amount
# 0   1    2400
# 1   2    2750
# 2   3    2600</code></pre>
<p><code>ignore_index=True</code> заново нумерует индекс с 0. Без него индекс повторялся бы: <code>0, 1, 0</code>. Таблицы передаются списком: <code>pd.concat([a, b, c])</code>.</p>
<table>
<tr><th>Действие</th><th>Что делает</th><th>SQL</th></tr>
<tr><td><code>pd.concat([a, b])</code></td><td>добавляет строки снизу</td><td><code>UNION ALL</code></td></tr>
<tr><td><code>a.merge(b, on=...)</code></td><td>присоединяет столбцы по ключу</td><td><code>JOIN</code></td></tr>
</table>
<p>Если названия столбцов не совпадают (<code>amount</code> и <code>Amount</code>), concat создаст два отдельных столбца и заполнит пустые места значениями NaN. Перед соединением сравните <code>df.columns</code>.</p>
<h3>Сохранение результата: to_csv</h3>
<pre><code>paid.to_csv('paid.csv', index=False)</code></pre>
<p><code>index=False</code> важен: без него pandas запишет индекс отдельным столбцом, и при повторном чтении файла появится лишний столбец <code>Unnamed: 0</code>. Для файла, который будут открывать в Excel: <code>to_csv('paid.csv', index=False, sep=';', encoding='utf-8-sig')</code>. Тогда столбцы разделятся правильно, а казахские буквы не испортятся.</p>
<h3>Файлы Excel: read_excel</h3>
<p>Коллеги чаще всего присылают данные в виде <code>.xlsx</code>. Читается он почти как CSV:</p>
<pre><code>df = pd.read_excel('report.xlsx', sheet_name='Сатылым')   # один лист
df = pd.read_excel('report.xlsx', sheet_name=0, skiprows=2)  # первый лист, пропустить 2 верхние строки
df.to_excel('result.xlsx', index=False)</code></pre>
<p><code>sheet_name</code> — название листа или его номер (с 0). В отчётных таблицах над заголовком бывают пустые строки и название, их пропускает <code>skiprows</code>. На своём компьютере для этого нужен пакет <code>openpyxl</code> (<code>pip install openpyxl</code>). В этой браузерной среде его нет, поэтому здесь задания выполняются с CSV.</p>
<h3>Превращение текста в число: to_numeric</h3>
<p>Если столбец суммы прочитался как <code>object</code> (текст), в нём есть нечисловые символы: пробел, «тг», «жоқ» («нет»).</p>
<pre><code>raw = pd.Series(['12 500', '8000', 'abc', None])

pd.to_numeric(raw)                          # ValueError: '12 500' не превращается в число
clean = raw.str.replace(' ', '')            # '12500', '8000', 'abc', None
pd.to_numeric(clean, errors='coerce')       # 12500.0, 8000.0, NaN, NaN</code></pre>
<p><code>errors='coerce'</code> заменяет значение, которое не превращается в число, на <code>NaN</code>, не выдавая ошибку. После этого обязательно посмотрите через <code>.isna().sum()</code>, сколько значений потерялось: если много, правило очистки нужно улучшить.</p>
<div class="tip">Для дат есть точно такой же метод: <code>pd.to_datetime(s, errors='coerce')</code> превращает непонятную дату в <code>NaT</code>.</div>
<h3>Частые ошибки</h3>
<ul>
<li><b>Написать <code>pd.concat(a, b)</code>.</b> Таблицы нужно передавать в списке: <code>pd.concat([a, b])</code>.</li>
<li><b>Забыть <code>ignore_index</code>.</b> Индекс повторяется, и <code>.loc[0]</code> возвращает несколько строк.</li>
<li><b>Написать <code>to_csv</code> без <code>index=False</code>.</b> В файле появляется лишний столбец.</li>
<li><b>Не посчитать NaN после <code>errors='coerce'</code>.</b> Ошибочные значения молча теряются, а сумма уменьшается.</li>
<li><b>Применить value_counts к DataFrame и ждать один столбец.</b> Сначала выберите столбец: <code>df['status'].value_counts()</code>.</li>
</ul>`,
        ex: [
          { prompt: 'Запишите <b>долю</b> каждого значения столбца <code>status</code> в Series <code>share</code> (<code>value_counts</code> и <code>normalize=True</code>). Затем запишите в <code>refund_pct</code> долю возвращённых заказов в процентах, округлив до одного знака после запятой.', check: { tests: REF + "_s = _o['status'].value_counts(normalize=True)\nassert abs(float(share.sum()) - 1) < 1e-9, 'share должен содержать доли: вы добавили normalize=True?'\nassert abs(float(share['paid']) - float(_s['paid'])) < 1e-9, 'Доля paid неверна'\nassert abs(float(refund_pct) - round(float(_s['refund']) * 100, 1)) < 1e-9, 'refund_pct = share[\\'refund\\'] * 100, с округлением до одного знака после запятой'" }, hints: ["<code>orders['status'].value_counts(normalize=True)</code>", "<code>round(share['refund'] * 100, 1)</code>"] },
          { prompt: 'Заказы января и февраля лежат в двух отдельных таблицах (<code>jan</code>, <code>feb</code>). Соедините их через <code>pd.concat</code> в одну таблицу <code>both</code>. Индекс должен быть пронумерован с 0 без повторов.', check: { tests: "assert len(both) == len(jan) + len(feb), 'В both должны быть все строки обеих таблиц'\nassert list(both.columns) == list(orders.columns), 'Столбцы не должны меняться'\nassert list(both.index) == list(range(len(both))), 'Индекс должен быть заново пронумерован с 0: ignore_index=True'\nassert set(both['order_date'].str[:7]) == {'2024-01', '2024-02'}, 'Должны быть только январь и февраль'" }, hints: ['Передайте таблицы в списке: <code>pd.concat([jan, feb])</code>.', 'Добавьте <code>ignore_index=True</code>.'] },
          { prompt: '<code>raw</code> — суммы, которые пришли в виде текста. Уберите пробелы и превратите их в числа через <code>pd.to_numeric</code>: результат — <code>nums</code>. Значения, которые не превращаются в число, должны стать NaN. Запишите в <code>bad</code>, сколько значений стало NaN.', check: { tests: "assert len(nums) == 7, 'В nums должно быть 7 значений (не удаляйте строки)'\nassert str(nums.dtype).startswith('float'), 'nums должен быть числовым (float): pd.to_numeric'\nassert float(nums.sum()) == 37200.0, 'Сумма чисел должна быть 37200: вы убрали пробелы?'\nassert int(bad) == 3, 'bad = nums.isna().sum(), должно быть 3'" }, hints: ["Убрать пробел: <code>raw.str.replace(' ', '')</code>.", "<code>pd.to_numeric(..., errors='coerce')</code>", '<code>nums.isna().sum()</code>'] },
          { prompt: 'Отфильтруйте заказы со статусом <code>refund</code> в таблицу <code>refunds</code> и сохраните её в файл <code>refunds.csv</code> <b>без индекса</b>. Затем прочитайте этот файл обратно в переменную <code>check</code>.', check: { tests: REF + "import os as _os\ntry:\n    assert _os.path.exists('refunds.csv'), 'Файла refunds.csv нет: используйте to_csv'\n    _f = _pd.read_csv('refunds.csv')\n    assert list(_f.columns) == list(_o.columns), 'В файле лишний столбец: добавьте index=False'\n    assert len(_f) == int((_o['status'] == 'refund').sum()), 'В файле должны быть только заказы refund'\n    assert set(_f['status']) == {'refund'}, 'В файле должны быть только заказы refund'\n    assert list(check.columns) == list(_o.columns) and len(check) == len(_f), 'check — таблица, заново прочитанная из файла: pd.read_csv'\nfinally:\n    if _os.path.exists('refunds.csv'):\n        _os.remove('refunds.csv')" }, hints: ["<code>refunds.to_csv('refunds.csv', index=False)</code>", "<code>check = pd.read_csv('refunds.csv')</code>"] },
          { prompt: 'Коллега прислал файл <code>report.xlsx</code>: данные на листе «Сатылым», а над названиями столбцов стоят 2 строки с пустым местом и заголовком. Как вы его прочитаете?', options: ["pd.read_csv('report.xlsx')", "pd.read_excel('report.xlsx', sheet_name='Сатылым', skiprows=2)", "pd.read_excel('report.xlsx', index=False)", "pd.concat('report.xlsx')"], explain: 'read_excel выбирает лист через sheet_name, а skiprows пропускает лишние верхние строки. read_csv не может прочитать файл Excel: xlsx — это не текст, а архив.' }
        ]
      },
      'pd-10': {
        title: 'Текст, условные столбцы и временной ряд',
        body: `
<p>Большая часть анализа — это создание <b>нового столбца</b> из существующих: извлечь признак из текста, разбить числа на группы, сравнить с предыдущим днём. В этом уроке собраны основные инструменты для этого.</p>
<h3>Текст: методы .str</h3>
<pre><code>customers['channel'].str.contains('gram')        # True/False: есть ли внутри 'gram'
customers['city'].str.replace('Астана', 'Astana')  # замена
orders['order_date'].str.split('-')              # ['2024', '03', '05']
orders['order_date'].str.split('-').str[1]       # '03' (месяц)
orders['order_date'].str.split('-', expand=True) # три отдельных столбца</code></pre>
<p><code>.str.contains</code> возвращает маску True/False, поэтому её можно сразу подставить в фильтр: <code>customers[customers['channel'].str.contains('gram')]</code>. В SQL это <code>LIKE '%gram%'</code>. Если в столбце есть пустые значения, добавьте <code>na=False</code>, иначе в маске появится NaN и фильтр выдаст ошибку.</p>
<h3>map: замена значений по словарю</h3>
<pre><code>regions = {'Алматы': 'Оңтүстік', 'Шымкент': 'Оңтүстік', 'Астана': 'Солтүстік'}   # 'Оңтүстік' = юг, 'Солтүстік' = север
customers['region'] = customers['city'].map(regions)</code></pre>
<p>Каждый город получает из словаря свой регион. Значение, которого нет в словаре, становится <code>NaN</code>: после map проверьте <code>.isna().sum()</code>. Это простой вариант XLOOKUP из Excel или JOIN с небольшой таблицей-справочником.</p>
<h3>np.where: условие с двумя вариантами</h3>
<pre><code>import numpy as np
orders['size'] = np.where(orders['amount'] &gt;= 3000, 'big', 'small')</code></pre>
<p><code>np.where(условие, если истина, если ложь)</code> — векторизованный IF, в SQL это <code>CASE WHEN ... THEN ... ELSE ... END</code>. Он короче и намного быстрее, чем <code>.apply(lambda ...)</code>. Осторожно: для пустой суммы условие ложно, поэтому она попадёт в <code>'small'</code>. Сначала уберите пустые значения.</p>
<h3>pd.cut: разбиение чисел на интервалы</h3>
<p>Когда нужно больше двух групп, удобен <code>pd.cut</code>:</p>
<pre><code>clean['bucket'] = pd.cut(clean['amount'],
                         bins=[0, 2000, 3000, 20000],
                         labels=['low', 'mid', 'high'])</code></pre>
<table>
<tr><th>Интервал</th><th>Метка</th><th>Пример</th></tr>
<tr><td>0 &lt; amount ≤ 2000</td><td>low</td><td>1850, 2000</td></tr>
<tr><td>2000 &lt; amount ≤ 3000</td><td>mid</td><td>2150, 3000</td></tr>
<tr><td>3000 &lt; amount ≤ 20000</td><td>high</td><td>3100</td></tr>
</table>
<p>4 границы дают 3 интервала, поэтому меток на одну меньше, чем границ. По умолчанию правая граница <b>входит</b> в интервал (2000 → low). Значение за пределами границ становится NaN.</p>
<h3>shift и pct_change: сравнение с предыдущей строкой</h3>
<p>Чтобы ответить на вопрос «на сколько выросло по сравнению со вчера?», рядом с каждой строкой нужно поставить значение предыдущей строки. <code>shift(1)</code> сдвигает столбец на одну строку вниз:</p>
<pre><code>alm['prev'] = alm['revenue'].shift(1)
alm['diff'] = alm['revenue'] - alm['prev']
alm['growth'] = alm['revenue'].pct_change() * 100</code></pre>
<table>
<tr><th>day</th><th>revenue</th><th>prev</th><th>diff</th><th>growth</th></tr>
<tr><td>2024-09-01</td><td>120</td><td>NaN</td><td>NaN</td><td>NaN</td></tr>
<tr><td>2024-09-02</td><td>135</td><td>120</td><td>15</td><td>12.5</td></tr>
<tr><td>2024-09-03</td><td>110</td><td>135</td><td>−25</td><td>−18.5</td></tr>
</table>
<p><code>pct_change()</code> — готовая форма формулы <code>(новое − старое) / старое</code>. В первой строке предыдущего значения нет, поэтому там NaN. Два правила: сначала <b>отсортируйте</b> по дате и, если в одной таблице несколько регионов, не смешивайте их: <code>daily.groupby('region')['revenue'].pct_change()</code>.</p>
<h3>resample: группировка по времени</h3>
<p>Если дата имеет настоящий тип даты, её можно поставить в индекс и свернуть до любого периода:</p>
<pre><code>clean['order_date'] = pd.to_datetime(clean['order_date'])
monthly = clean.set_index('order_date').resample('MS')['amount'].sum()
# 2024-01-01    31950
# 2024-02-01    ...</code></pre>
<p><code>'MS'</code> — месяц (метка — первый день месяца), <code>'W'</code> — неделя, <code>'D'</code> — день. Отличие от groupby по <code>.str[:7]</code>: resample показывает и период без заказов (с нулём), то есть во временном ряду не остаётся «дыр».</p>
<h3>Разница дат</h3>
<pre><code>df['days'] = (df['order_date'] - df['signup_date']).dt.days</code></pre>
<p>Если вычесть один столбец дат из другого, получится интервал времени (Timedelta), а <code>.dt.days</code> берёт из него число дней. Оба столбца сначала должны пройти через <code>pd.to_datetime</code>: текст вычитать нельзя.</p>
<div class="tip">Каждый раз, создав новый столбец, проверяйте его через <code>value_counts()</code> или <code>describe()</code>: разумно ли число групп, нет ли неожиданных NaN?</div>
<h3>Частые ошибки</h3>
<ul>
<li><b>Делать shift без сортировки.</b> «Предыдущей строкой» окажется случайный день.</li>
<li><b>Смешивать несколько групп.</b> Первый день Астаны сравнивается с последним днём Алматы. Используйте <code>groupby</code>.</li>
<li><b>Неверное число меток в pd.cut.</b> Меток должно быть на одну меньше, чем границ, иначе <code>ValueError</code>.</li>
<li><b>resample по текстовому столбцу.</b> Сначала <code>pd.to_datetime</code>, потом <code>set_index</code>.</li>
<li><b>Не заметить NaN после map.</b> Города, которых нет в словаре, молча остаются пустыми.</li>
</ul>`,
        ex: [
          { prompt: 'Добавьте в таблицу <code>customers</code> два столбца: <code>region</code> — регион города (по словарю <code>regions</code>, через <code>map</code>) и <code>is_social</code> — <code>True</code>, если в названии канала есть <code>gram</code> (<code>.str.contains</code>).', check: { tests: REF + "assert 'region' in customers.columns, 'Нет столбца region'\nassert customers['region'].tolist() == _c['city'].map(regions).tolist(), 'region = map столбца city по словарю regions'\nassert 'is_social' in customers.columns, 'Нет столбца is_social'\nassert [bool(v) for v in customers['is_social']] == [v == 'instagram' for v in _c['channel']], 'is_social: строки, где в channel есть gram, должны быть True'" }, hints: ["<code>customers['city'].map(regions)</code>", "<code>customers['channel'].str.contains('gram')</code>"] },
          { prompt: 'Даны чистые заказы (<code>clean</code>). Добавьте два столбца: <code>size</code> — <code>\'big\'</code>, если сумма 3000 или больше, иначе <code>\'small\'</code> (<code>np.where</code>); <code>bucket</code> — через <code>pd.cut</code> с границами <code>[0, 2000, 3000, 20000]</code> и метками <code>low</code>, <code>mid</code>, <code>high</code>.', check: { tests: REF + "assert 'size' in clean.columns and 'bucket' in clean.columns, 'Нужны столбцы size и bucket'\nassert len(clean) == len(_clean), 'Не меняйте строки таблицы clean'\nassert list(clean['size']) == ['big' if a >= 3000 else 'small' for a in _clean['amount']], 'size: big, если сумма >= 3000, иначе small'\n_b = _pd.cut(_clean['amount'], bins=[0, 2000, 3000, 20000], labels=['low', 'mid', 'high'])\nassert [str(v) for v in clean['bucket']] == [str(v) for v in _b], 'bucket: границы [0, 2000, 3000, 20000], метки low, mid, high'" }, hints: ["<code>np.where(clean['amount'] &gt;= 3000, 'big', 'small')</code>", "<code>pd.cut(clean['amount'], bins=[0, 2000, 3000, 20000], labels=['low', 'mid', 'high'])</code>"] },
          { prompt: '<code>alm</code> — дневная выручка Алматы, отсортированная по дате. Добавьте два столбца: <code>prev</code> — выручка предыдущего дня (<code>shift</code>) и <code>growth</code> — изменение относительно предыдущего дня <b>в процентах</b> (<code>pct_change</code>). Запишите в <code>best_day</code> день (текст), когда рост был наибольшим.', check: { tests: "import pandas as _pd\n_a = _pd.read_csv('daily_sales.csv')\n_a = _a[_a['region'] == 'Алматы'].sort_values('day')\n_g = _a['revenue'].pct_change() * 100\nassert 'prev' in alm.columns and 'growth' in alm.columns, 'Нужны столбцы prev и growth'\nassert len(alm) == 10, 'В alm должно быть 10 дней'\nassert alm['prev'].isna().sum() == 1 and alm['prev'].iloc[1:].tolist() == _a['revenue'].iloc[:-1].tolist(), 'prev = revenue.shift(1)'\nassert alm['growth'].isna().sum() == 1, 'growth первого дня должен быть NaN'\nassert [round(float(v), 4) for v in alm['growth'].iloc[1:]] == [round(float(v), 4) for v in _g.iloc[1:]], 'growth = pct_change() * 100 (в процентах)'\nassert str(best_day)[:10] == str(_a.loc[_g.idxmax(), 'day']), 'best_day: значение day в строке с наибольшим growth (idxmax)'" }, hints: ["<code>alm['revenue'].shift(1)</code>", "<code>alm['revenue'].pct_change() * 100</code>", "<code>alm.loc[alm['growth'].idxmax(), 'day']</code>"] },
          { prompt: 'Посчитайте месячную выручку по чистым заказам через <code>resample</code> и запишите её в Series <code>monthly</code>. Сначала приведите <code>order_date</code> к типу даты и поставьте в индекс.', check: { tests: REF + "_m = _clean.groupby(_clean['order_date'].str[:7])['amount'].sum()\nassert len(monthly) == len(_m), 'В monthly должно быть 6 месяцев'\nassert [round(float(v)) for v in monthly.values] == [round(float(v)) for v in _m.values], 'Месячные суммы неверны: sum() по столбцу amount'\nassert str(monthly.index[0])[:7] == '2024-01', 'Индекс должен иметь тип даты: pd.to_datetime, затем set_index'" }, hints: ["<code>clean['order_date'] = pd.to_datetime(clean['order_date'])</code>", "<code>clean.set_index('order_date').resample('MS')['amount'].sum()</code>"] },
          { prompt: '<code>df</code> — чистые заказы, объединённые с данными клиентов. Добавьте столбец <code>days</code>: число дней от регистрации клиента (<code>signup_date</code>) до заказа (<code>order_date</code>). Затем запишите в <code>same_day</code> число заказов, сделанных прямо в день регистрации (0 дней).', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_days = (_pd.to_datetime(_d['order_date']) - _pd.to_datetime(_d['signup_date'])).dt.days\nassert 'days' in df.columns, 'Нет столбца days'\nassert [int(v) for v in df['days']] == [int(v) for v in _days], 'days = (order_date - signup_date).dt.days; сначала pd.to_datetime'\nassert int(same_day) == int((_days == 0).sum()), 'same_day: число строк, где days == 0'" }, hints: ["Превратите оба столбца в даты: <code>pd.to_datetime(df['order_date'])</code>.", "<code>(d2 - d1).dt.days</code>", "<code>(df['days'] == 0).sum()</code>"] }
        ]
      },
      'pd-11': {
        title: 'NumPy: 2D-массив, axis и broadcasting',
        body: `
<p>В уроке pd-8 вы познакомились с одномерным массивом. Реальные данные чаще всего <b>двумерные</b>: строки и столбцы. Внутри DataFrame лежит именно такой 2D-массив, и библиотеки машинного обучения (scikit-learn) принимают данные в этом виде. Поэтому понимать <code>shape</code>, <code>axis</code> и broadcasting обязательно.</p>
<h3>shape и reshape</h3>
<p>Продажи трёх городов за четыре недели даны одним рядом:</p>
<pre><code>import numpy as np

sales = np.array([120, 135, 110, 160,    # Алматы
                   90,  95, 105,  85,    # Астана
                   60,  70,  65,  80])   # Шымкент
print(sales.shape)        # (12,)  — одно измерение, 12 элементов

m = sales.reshape(3, 4)   # 3 строки (города), 4 столбца (недели)
print(m.shape)            # (3, 4)
print(m[0, 1])            # 135: строка 0, столбец 1
print(m[1])               # [ 90  95 105  85]: строка Астаны
print(m[:, 0])            # [120  90  60]: столбец первой недели</code></pre>
<p><code>shape</code> — это <code>(строки, столбцы)</code>. <code>reshape</code> не меняет элементы, а только переставляет их, поэтому число элементов должно совпадать: 3 × 4 = 12. Если одно измерение записать как <code>-1</code>, NumPy вычислит его сам: <code>sales.reshape(3, -1)</code>.</p>
<h3>axis: в каком направлении считаем?</h3>
<table>
<tr><th>Запись</th><th>Что делает</th><th>Результат</th></tr>
<tr><td><code>m.sum()</code></td><td>складывает всё</td><td>1175</td></tr>
<tr><td><code>m.sum(axis=0)</code></td><td>идёт вниз вдоль строк и складывает каждый <b>столбец</b></td><td><code>[270 300 280 325]</code> — сумма каждой недели</td></tr>
<tr><td><code>m.sum(axis=1)</code></td><td>идёт вправо вдоль столбцов и складывает каждую <b>строку</b></td><td><code>[525 375 275]</code> — сумма каждого города</td></tr>
</table>
<p>Как запомнить: <code>axis</code> — это измерение, которое <b>исчезает</b>. Если применить <code>axis=0</code> к массиву <code>(3, 4)</code>, исчезает 3 и остаётся 4 значения. При <code>axis=1</code> исчезает 4 и остаётся 3 значения. <code>mean</code>, <code>max</code>, <code>min</code>, <code>std</code> работают так же. И в pandas то же самое: <code>df.sum(axis=1)</code> даёт сумму каждой строки.</p>
<h3>Broadcasting</h3>
<p>При операциях с массивами разной формы NumPy «растягивает» меньший до большего. Это называют broadcasting.</p>
<pre><code>m * 1.12                      # каждый элемент × 1.12 (число растягивается на весь массив)

week_total = m.sum(axis=0)    # shape (4,)
share = m / week_total        # (3, 4) / (4,) → каждая строка делится на 4 значения
print(share[:, 0])            # [0.444 0.333 0.222]: доли городов на 1-й неделе</code></pre>
<p>Правило: формы сравниваются <b>справа</b>. Если измерения равны или одно из них равно 1, операция выполняется. <code>(3, 4)</code> и <code>(4,)</code> совместимы: последние измерения одинаковы. А <code>(3, 4)</code> и <code>(3,)</code> несовместимы: 4 ≠ 3.</p>
<pre><code>city_total = m.sum(axis=1)                    # shape (3,)
m / city_total                                # ValueError: формы несовместимы
m / city_total.reshape(3, 1)                  # (3, 4) / (3, 1) → работает
m / m.sum(axis=1, keepdims=True)              # то же самое, короткая запись</code></pre>
<h3>Создание массива: arange, linspace, random</h3>
<pre><code>np.arange(0, 10, 2)        # [0 2 4 6 8]            с шагом, конец не входит
np.linspace(0, 1, 5)       # [0. 0.25 0.5 0.75 1.]  5 равноотстоящих точек, конец входит
np.zeros((2, 3))           # массив 2 × 3 из нулей

rng = np.random.default_rng(42)
rng.integers(1, 7, size=5)       # 5 целых чисел от 1 до 6
rng.normal(2500, 400, size=3)    # 3 числа со средним 2500 и разбросом 400</code></pre>
<p><code>42</code> — это <b>seed</b> (начальное значение). При одинаковом seed «случайные» числа получаются одинаковыми при каждом запуске. Это нужно для воспроизводимости результата (reproducibility): коллега запустит ваш код и получит те же самые числа. Без seed результат каждый раз другой.</p>
<h3>Стандартное отклонение: NumPy и pandas</h3>
<p>На одних и тех же данных две библиотеки дают два разных числа:</p>
<pre><code>a = np.array([2150, 2250, 2550, 2050, 3100])
a.std()                 # 378.9  (делит на n,   ddof=0)
a.std(ddof=1)           # 423.7  (делит на n−1, ddof=1)
pd.Series(a).std()      # 423.7  (в pandas по умолчанию ddof=1)</code></pre>
<p><code>ddof=0</code> считает, что в данных <b>вся генеральная совокупность</b>. <code>ddof=1</code> считает, что данные — <b>выборка</b> из большей совокупности, и уменьшает делитель на единицу. У аналитика данные обычно являются выборкой, поэтому чаще используют <code>ddof=1</code>. Главное — знать, какой вариант вы взяли: если числа в двух отчётах не сходятся, это первый подозреваемый.</p>
<div class="tip">Если возникла ошибка, первый шаг — <code>print(a.shape)</code>. Большинство ошибок NumPy возникает из-за того, что форма не такая, как вы ожидали.</div>
<h3>Частые ошибки</h3>
<ul>
<li><b>Понимать axis наоборот.</b> <code>axis=0</code> не «складывает строки», а идёт вдоль строк и даёт одно значение на каждый столбец.</li>
<li><b>Число элементов в reshape не совпадает.</b> 12 элементов нельзя привести к <code>(5, 2)</code>.</li>
<li><b>Делить <code>(3, 4)</code> на <code>(3,)</code>.</b> Для деления по строкам нужен <code>keepdims=True</code> или <code>reshape(3, 1)</code>.</li>
<li><b>Путать arange и linspace.</b> В arange третий аргумент — шаг, в linspace — число точек.</li>
<li><b>Не задать seed.</b> Завтра вы не сможете повторить результат.</li>
</ul>`,
        ex: [
          { prompt: '<code>sales</code> — продажи трёх городов (Алматы, Астана, Шымкент) за четыре недели одним рядом. Приведите его к массиву <code>m</code> из 3 строк × 4 столбцов. Затем запишите общую сумму каждого города в <code>by_city</code>, а общую сумму каждой недели — в <code>by_week</code>.', check: { tests: "assert m.shape == (3, 4), 'Форма m должна быть (3, 4): sales.reshape(3, 4)'\nassert m[1].tolist() == [90, 95, 105, 85], 'Вторая строка m должна быть продажами Астаны'\nassert list(by_city) == [525, 375, 275], 'by_city: сумма каждой строки, axis=1'\nassert list(by_week) == [270, 300, 280, 325], 'by_week: сумма каждого столбца, axis=0'" }, hints: ['<code>sales.reshape(3, 4)</code>', 'Каждый город — одна строка: <code>m.sum(axis=1)</code>. Каждая неделя — один столбец: <code>m.sum(axis=0)</code>.'] },
          { prompt: 'Дан массив <code>m</code> (строки — города, столбцы — недели). С помощью broadcasting посчитайте массив <code>share</code>: долю каждого города в общих продажах <b>той же недели</b> (сумма каждого столбца должна быть 1). Затем запишите в <code>row_share</code> доли недель в общих продажах <b>своего</b> города (сумма каждой строки равна 1).', check: { tests: "import numpy as _np\n_m = _np.array([[120, 135, 110, 160], [90, 95, 105, 85], [60, 70, 65, 80]])\nassert share.shape == (3, 4), 'Форма share должна быть (3, 4)'\nassert _np.allclose(share, _m / _m.sum(axis=0)), 'share = m / m.sum(axis=0): сумма каждого столбца равна 1'\nassert row_share.shape == (3, 4), 'Форма row_share должна быть (3, 4)'\nassert _np.allclose(row_share, _m / _m.sum(axis=1, keepdims=True)), 'row_share: разделите m на суммы строк (keepdims=True или reshape(3, 1))'" }, hints: ['Суммы недель: <code>m.sum(axis=0)</code>, форма (4,). <code>m / m.sum(axis=0)</code> работает сразу.', 'Форма сумм по строкам — (3,): её нужно сделать (3, 1). <code>m.sum(axis=1, keepdims=True)</code>'] },
          { prompt: '<code>a</code> — суммы пяти чеков. Посчитайте стандартное отклонение двумя способами: <code>std_pop</code> — для генеральной совокупности (по умолчанию в NumPy, <code>ddof=0</code>), <code>std_sample</code> — для выборки (<code>ddof=1</code>). Затем запишите в <code>std_pd</code> значение <code>.std()</code>, которое pandas даёт по умолчанию.', check: { tests: "assert abs(float(std_pop) - 378.946) < 0.01, 'std_pop = a.std() (ddof=0)'\nassert abs(float(std_sample) - 423.674) < 0.01, 'std_sample = a.std(ddof=1)'\nassert abs(float(std_pd) - float(std_sample)) < 1e-6, 'std_pd = pd.Series(a).std(): он должен быть равен std_sample'" }, hints: ['<code>a.std()</code> и <code>a.std(ddof=1)</code>', '<code>pd.Series(a).std()</code>'] },
          { prompt: 'Создайте три массива: <code>ids</code> — целые числа от 1001 до 1010 (<code>np.arange</code>); <code>grid</code> — 5 равноотстоящих точек от 0 до 1 (<code>np.linspace</code>); <code>dice</code> — 1000 случайных целых чисел от 1 до 6 из генератора с seed 42 (<code>rng.integers</code>).', check: { tests: "import numpy as _np\nassert list(ids) == list(range(1001, 1011)), 'ids: np.arange(1001, 1011) — последняя граница не входит'\nassert _np.allclose(grid, [0, 0.25, 0.5, 0.75, 1]), 'grid: np.linspace(0, 1, 5)'\nassert len(dice) == 1000, 'В dice должно быть 1000 чисел: size=1000'\nassert dice.min() >= 1 and dice.max() <= 6, 'Значения dice должны быть от 1 до 6: rng.integers(1, 7, ...)'\nassert (dice == _np.random.default_rng(42).integers(1, 7, size=1000)).all(), 'dice: создайте rng с seed 42 и первым же вызовом напишите rng.integers(1, 7, size=1000)'" }, hints: ['<code>np.arange(1001, 1011)</code>: чтобы 1010 вошло, граница — 1011.', '<code>np.linspace(0, 1, 5)</code>', '<code>rng.integers(1, 7, size=1000)</code>: верхняя граница не входит.'] },
          { prompt: 'Форма массива <code>X</code> — <code>(150, 5)</code>: 150 заказов, 5 числовых столбцов. Какую форму имеет результат <code>X.mean(axis=0)</code> и что он означает?', options: ['(150,): среднее каждого заказа', '(5,): среднее каждого столбца', '(150, 5): не меняется', '(): одно число'], explain: 'axis=0 — измерение, которое исчезает: идём вдоль 150 строк, и на каждый столбец остаётся одно значение. Результат — (5,). При axis=1 получилось бы (150,).' }
        ]
      },
      'pd-gate': {
        title: 'Экзамен модуля: pandas',
        body: `<p>Итоговые задания: фильтрация, очистка, объединение и группировка в одном анализе.</p>`,
        ex: [
          { prompt: 'Как в pandas записать SQL-выражение <code>COUNT(DISTINCT customer_id)</code>?', explain: 'nunique() даёт число уникальных значений, а count() считает все непустые значения.' },
          { prompt: 'Почему <code>df[df[\'a\'] &gt; 1 and df[\'b\'] &lt; 5]</code> выдаёт ошибку?', options: ['Нет таких столбцов', 'Для Series нужен не and, а &amp;, и условия должны быть в скобках', 'and работает только с числами', 'Ошибки не будет'], explain: 'Правильно: df[(df[\'a\'] &gt; 1) &amp; (df[\'b\'] &lt; 5)].' },
          { prompt: 'Правило чистого заказа (как в уроке pd-5): <code>status == \'paid\'</code>, <code>amount</code> не пустой и меньше 20 000. По каждому городу (<code>city</code>) посчитайте на чистых заказах <code>customers</code> (уникальные клиенты), <code>revenue</code> и <code>aov</code> (revenue / число заказов, округлённое до целого) и создайте DataFrame <code>report</code>. <code>city</code> должен быть обычным столбцом, сортировка — по выручке по убыванию.', check: { tests: REF + "_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_r = _d.groupby('city').agg(customers=('customer_id', 'nunique'), revenue=('amount', 'sum'), n=('amount', 'count')).reset_index().sort_values('revenue', ascending=False)\nassert 'city' in report.columns, 'city должен быть обычным столбцом'\nassert {'customers', 'revenue', 'aov'} <= set(report.columns), 'Нужны столбцы customers, revenue, aov'\nassert report['city'].tolist() == _r['city'].tolist(), 'Неверный порядок городов'\nassert report['customers'].tolist() == _r['customers'].tolist(), 'customers: используйте nunique'\nassert report['revenue'].round().tolist() == _r['revenue'].round().tolist(), 'revenue неверно: вы взяли чистые заказы?'\nassert [round(float(a)) for a in report['aov']] == [round(r / n) for r, n in zip(_r['revenue'], _r['n'])], 'aov = revenue / число заказов'" } }
        ]
      }
    }
  });
})();
