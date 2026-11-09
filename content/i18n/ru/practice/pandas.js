// pandas practice tasks: Russian text. Code, solutions and checks are in content/practice/pandas.js.
DJ.i18n.patch({
 "lessons": {
  "pd-1": {
   "pr": [
    {
     "title": "Температура по городам",
     "prompt": "<p>Создайте DataFrame <code>weather</code>: столбец <code>city</code> со значениями <code>['Алматы', 'Астана', 'Атырау', 'Өскемен']</code>, столбец <code>temp</code> со значениями <code>[18, 9, 24, 12]</code>. Затем выполните <code>print(weather)</code>.</p>",
     "hints": [
      "<code>pd.DataFrame({'city': [...], 'temp': [...]})</code>"
     ],
     "check": {
      "tests": "assert isinstance(weather, pd.DataFrame), 'weather должен быть DataFrame'\nassert list(weather.columns) == ['city', 'temp'], 'Столбцы: city, temp'\nassert weather['city'].tolist() == ['Алматы', 'Астана', 'Атырау', 'Өскемен'], 'значения city неверны'\nassert weather['temp'].tolist() == [18, 9, 24, 12], 'значения temp должны быть [18, 9, 24, 12]'"
     }
    },
    {
     "title": "Количество клиентов",
     "prompt": "<p>Прочитайте файл <code>customers.csv</code> в переменную <code>customers</code> и запишите количество клиентов с помощью <code>len()</code> в переменную <code>n_customers</code>.</p>",
     "hints": [
      "<code>pd.read_csv('customers.csv')</code>",
      "<code>len(customers)</code>"
     ],
     "check": {
      "tests": "assert n_customers == 40, 'Количество клиентов неверно: используйте len(customers)'"
     }
    },
    {
     "title": "Названия столбцов",
     "prompt": "<p>Прочитайте файл <code>orders.csv</code> и запишите названия столбцов с помощью <code>list(orders.columns)</code> в список <code>cols</code>.</p>",
     "hints": [
      "<code>list(orders.columns)</code>"
     ],
     "check": {
      "tests": "assert cols == ['id', 'customer_id', 'order_date', 'amount', 'status'], 'cols неверен:' + str(cols)"
     }
    },
    {
     "title": "Первые три заказа",
     "prompt": "<p>Запишите первые 3 строки таблицы <code>orders</code> в переменную <code>first3</code> и выведите их.</p>",
     "hints": [
      "<code>orders.head(3)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert len(first3) == 3, 'В first3 должно быть 3 строки'\nassert first3['id'].tolist() == _o['id'].head(3).tolist(), 'Нужны первые 3 строки'"
     }
    },
    {
     "title": "Размер таблицы по дням",
     "prompt": "<p>Прочитайте файл <code>daily_sales.csv</code> в переменную <code>daily</code>. Запишите количество строк в <code>n_rows</code>, а количество столбцов в <code>n_cols</code>, используя <code>shape</code>.</p>",
     "hints": [
      "<code>daily.shape</code> возвращает (строки, столбцы)."
     ],
     "check": {
      "tests": "assert n_rows == 20, 'n_rows неверен: daily.shape[0]'\nassert n_cols == 3, 'n_cols неверен: daily.shape[1]'"
     }
    },
    {
     "title": "Максимум из describe",
     "prompt": "<p>Запишите результат <code>orders.describe()</code> в переменную <code>stats</code>. Затем возьмите из него наибольшее значение столбца <code>amount</code> и запишите его в <code>max_amount</code>: <code>stats['amount']['max']</code>.</p>",
     "hints": [
      "<code>describe()</code> тоже возвращает DataFrame: строки называются count, mean, ..., max."
     ],
     "check": {
      "tests": "assert isinstance(stats, pd.DataFrame), 'stats должен быть равен orders.describe()'\nassert float(max_amount) == 48000, 'max_amount должен быть равен 48000'"
     }
    },
    {
     "title": "Заказов на одного клиента",
     "prompt": "<p>Прочитайте файлы <code>orders.csv</code> и <code>customers.csv</code> и вычислите, сколько заказов приходится в среднем на одного клиента (количество заказов / количество клиентов). Округлите до 2 знаков после запятой и запишите в переменную <code>per_customer</code>.</p>",
     "hints": [
      "Прочитайте два файла и разделите значения <code>len()</code>.",
      "<code>round(..., 2)</code>"
     ],
     "check": {
      "tests": "assert per_customer == 3.75, 'per_customer должен быть равен 3.75: len(orders) / len(customers)'"
     }
    },
    {
     "title": "Таблица из списка словарей",
     "prompt": "<p>Школы заданы списком словарей (каждый словарь — одна строка). Создайте из них DataFrame <code>schools</code>, затем запишите количество строк и столбцов в переменную <code>size</code>, используя <code>shape</code>.</p>",
     "hints": [
      "<code>pd.DataFrame(records)</code>: ключи словарей становятся названиями столбцов."
     ],
     "check": {
      "tests": "assert isinstance(schools, pd.DataFrame), 'schools должен быть DataFrame'\nassert list(schools.columns) == ['school', 'city', 'students'], 'Столбцы: school, city, students'\nassert tuple(size) == (3, 3), 'size должен быть равен (3, 3)'\nassert schools['students'].tolist() == [940, 1210, 720], 'значения students неверны'"
     }
    }
   ]
  },
  "pd-2": {
   "pr": [
    {
     "title": "Столбец суммы",
     "prompt": "<p>Возьмите столбец <code>amount</code> из таблицы <code>orders</code> как Series и запишите его в переменную <code>amounts</code>.</p>",
     "hints": [
      "<code>orders['amount']</code>"
     ],
     "check": {
      "tests": "assert isinstance(amounts, pd.Series), 'amounts должен быть Series: одна пара квадратных скобок'\nassert len(amounts) == 150 and amounts.name == 'amount', 'нужны все 150 значений столбца amount'"
     }
    },
    {
     "title": "Возвраты",
     "prompt": "<p>Запишите в переменную <code>refunds</code> только возвращённые заказы (<code>status == 'refund'</code>).</p>",
     "hints": [
      "<code>orders[orders['status'] == 'refund']</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert sorted(refunds['id']) == sorted(_o[_o['status'] == 'refund']['id']), 'В refunds должны быть только заказы со статусом refund'"
     }
    },
    {
     "title": "Строки без суммы",
     "prompt": "<p>Запишите строки, в которых пусто значение <code>amount</code> (NaN), в переменную <code>missing</code>.</p>",
     "hints": [
      "<code>orders['amount'].isna()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert sorted(missing['id']) == sorted(_o[_o['amount'].isna()]['id']), 'В missing должны быть только строки с пустым amount'"
     }
    },
    {
     "title": "Выбранные клиенты",
     "prompt": "<p>Запишите заказы клиентов 3, 5 и 7 в переменную <code>sel</code>, используя <code>isin</code>. Должны остаться только столбцы <code>customer_id</code>, <code>order_date</code> и <code>amount</code>.</p>",
     "hints": [
      "<code>orders['customer_id'].isin([3, 5, 7])</code>",
      "В конце используйте <code>[['customer_id', 'order_date', 'amount']]</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_s = _o[_o['customer_id'].isin([3, 5, 7])]\nassert list(sel.columns) == ['customer_id', 'order_date', 'amount'], 'Столбцы: customer_id, order_date, amount'\nassert len(sel) == len(_s) and sorted(sel['customer_id']) == sorted(_s['customer_id']), 'Нужны все заказы только клиентов 3, 5 и 7'"
     }
    },
    {
     "title": "Первая строка после фильтра",
     "prompt": "<p>Запишите заказы с суммой больше 3000 в переменную <code>big</code>. Затем с помощью <code>iloc</code> возьмите номер заказа (<code>id</code>) из первой строки <code>big</code> и запишите его в переменную <code>first_id</code>.</p>",
     "hints": [
      "После фильтра индекс не начинается с 0: используйте <code>big.iloc[0]</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_b = _o[_o['amount'] > 3000]\nassert len(big) == len(_b), 'В big должны быть строки, где amount > 3000'\nassert int(first_id) == int(_b['id'].iloc[0]), 'first_id неверен: big.iloc[0][\"id\"]'"
     }
    },
    {
     "title": "Мелкие или возвращённые",
     "prompt": "<p>Запишите в переменную <code>odd</code> заказы, у которых сумма меньше 1000 <b>или</b> статус равен <code>refund</code> (оператор <code>|</code>).</p>",
     "hints": [
      "Возьмите каждое условие в скобки и поставьте между ними <code>|</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_x = _o[(_o['amount'] < 1000) | (_o['status'] == 'refund')]\nassert sorted(odd['id']) == sorted(_x['id']), 'odd неверен: объедините два условия через |'"
     }
    },
    {
     "title": "Крупные заказы в марте",
     "prompt": "<p>Запишите в переменную <code>march_big</code> заказы за март 2024 года (<code>order_date</code> между <code>'2024-03-01'</code> и <code>'2024-03-31'</code>, обе границы включены), которые оплачены и имеют сумму больше 2500. Должны остаться только столбцы <code>id</code> и <code>amount</code>, индекс начинается с 0 (<code>reset_index(drop=True)</code>).</p>",
     "hints": [
      "Даты-строки можно сравнивать: <code>orders['order_date'] &gt;= '2024-03-01'</code>.",
      "Объедините четыре условия с помощью <code>&amp;</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = _o[(_o['order_date'] >= '2024-03-01') & (_o['order_date'] <= '2024-03-31') & (_o['status'] == 'paid') & (_o['amount'] > 2500)]\nassert list(march_big.columns) == ['id', 'amount'], 'Столбцы: id, amount'\nassert march_big['id'].tolist() == _m['id'].tolist(), 'Строки неверны: проверьте четыре условия'\nassert list(march_big.index) == list(range(len(_m))), 'Индекс должен начинаться с 0: reset_index(drop=True)'"
     }
    },
    {
     "title": "Крупные чеки первых клиентов",
     "prompt": "<p>С помощью метода <code>query</code> запишите в переменную <code>vip</code> оплаченные заказы клиентов 1–5 (<code>customer_id &lt;= 5</code>) на сумму 2000 и выше. Затем добавьте к ним столбец <code>with_vat</code>: <code>amount * 1.12</code>.</p>",
     "hints": [
      "<code>orders.query(\"customer_id &lt;= 5 and status == 'paid' and amount &gt;= 2000\")</code>",
      "Перед добавлением столбца напишите <code>.copy()</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_v = _o[(_o['customer_id'] <= 5) & (_o['status'] == 'paid') & (_o['amount'] >= 2000)]\nassert sorted(vip['id']) == sorted(_v['id']), 'строки vip неверны'\nassert 'with_vat' in vip.columns, 'нет столбца with_vat'\nassert ((vip['with_vat'] - vip['amount'] * 1.12).abs() < 0.01).all(), 'with_vat = amount * 1.12'"
     }
    }
   ]
  },
  "pd-3": {
   "pr": [
    {
     "title": "Сумма в тысячах тенге",
     "prompt": "<p>Добавьте в <code>orders</code> столбец <code>amount_k</code>: значение <code>amount</code>, делённое на 1000.</p>",
     "hints": [
      "<code>orders['amount'] / 1000</code>"
     ],
     "check": {
      "tests": "assert 'amount_k' in orders.columns, 'нет столбца amount_k'\nassert ((orders['amount_k'] - orders['amount'] / 1000).abs() < 1e-9).sum() == orders['amount'].notna().sum(), 'amount_k = amount / 1000'"
     }
    },
    {
     "title": "Три самых дешёвых заказа",
     "prompt": "<p>Запишите в переменную <code>cheap3</code> 3 заказа с наименьшей суммой, отсортированные по возрастанию.</p>",
     "hints": [
      "<code>sort_values('amount')</code> по умолчанию сортирует по возрастанию."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_t = _o.sort_values('amount').head(3)\nassert len(cheap3) == 3, 'В cheap3 должно быть 3 строки'\nassert cheap3['amount'].tolist() == _t['amount'].tolist(), 'Три наименьшие суммы нужны по возрастанию'"
     }
    },
    {
     "title": "Переименование столбца",
     "prompt": "<p>Переименуйте столбец <code>amount</code> в <code>sum_kzt</code> и запишите результат в переменную <code>renamed</code>.</p>",
     "hints": [
      "<code>orders.rename(columns={'amount': 'sum_kzt'})</code>"
     ],
     "check": {
      "tests": "assert 'sum_kzt' in renamed.columns and 'amount' not in renamed.columns, 'Имя amount должно стать sum_kzt'\nassert len(renamed) == 150, 'Количество строк не должно измениться'"
     }
    },
    {
     "title": "Номер месяца",
     "prompt": "<p>Добавьте в <code>orders</code> столбец <code>mon</code>: символы с 6-го по 7-й в <code>order_date</code>, то есть номер месяца (например, <code>'2024-03-05'</code> → <code>'03'</code>).</p>",
     "hints": [
      "<code>orders['order_date'].str[5:7]</code>"
     ],
     "check": {
      "tests": "assert 'mon' in orders.columns, 'нет столбца mon'\nassert orders['mon'].tolist() == [d[5:7] for d in orders['order_date']], 'mon = срез order_date с 5 по 7 символ'"
     }
    },
    {
     "title": "Уровень суммы",
     "prompt": "<p>С помощью <code>apply</code> и <code>lambda</code> добавьте столбец <code>level</code>: если сумма 2500 и больше, то <code>'жоғары'</code>, иначе <code>'төмен'</code>.</p>",
     "hints": [
      "<code>orders['amount'].apply(lambda x: 'жоғары' if x &gt;= 2500 else 'төмен')</code>"
     ],
     "check": {
      "tests": "assert 'level' in orders.columns, 'нет столбца level'\nassert orders['level'].tolist() == ['жоғары' if x >= 2500 else 'төмен' for x in orders['amount']], 'значения level неверны: граница 2500 относится к высокому уровню'"
     }
    },
    {
     "title": "Сортировка по двум столбцам",
     "prompt": "<p>Отсортируйте <code>orders</code> сначала по <code>status</code>, затем по <code>amount</code> (оба по возрастанию), и запишите результат в переменную <code>res</code>.</p>",
     "hints": [
      "<code>orders.sort_values(['status', 'amount'])</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_r = _o.sort_values(['status', 'amount'])\nassert res['id'].tolist() == _r['id'].tolist(), 'Порядок неверен: сначала status, затем amount'"
     }
    },
    {
     "title": "Лучшая тройка февраля",
     "prompt": "<p>Среди оплаченных заказов найдите 3 заказа с самой большой суммой за февраль 2024 года (<code>month == '2024-02'</code>, <code>order_date.str[:7]</code>) и запишите их в переменную <code>feb_top</code> в порядке убывания. Должны остаться только столбцы <code>id</code> и <code>amount</code>.</p>",
     "hints": [
      "Сначала выполните фильтр и добавьте столбец <code>month</code>.",
      "Затем <code>sort_values('amount', ascending=False).head(3)</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[(_o['status'] == 'paid') & (_o['order_date'].str[:7] == '2024-02')].sort_values('amount', ascending=False).head(3)\nassert list(feb_top.columns) == ['id', 'amount'], 'Столбцы: id, amount'\nassert feb_top['amount'].tolist() == _p['amount'].tolist(), 'Три наибольшие суммы за февраль нужны по убыванию'"
     }
    },
    {
     "title": "Таблица для отчёта",
     "prompt": "<p>Из оплаченных заказов создайте таблицу <code>report</code>: добавьте столбец <code>month</code> (первые 7 символов <code>order_date</code>), удалите столбец <code>status</code>, переименуйте <code>amount</code> в <code>revenue</code>, отсортируйте по <code>revenue</code> по убыванию и оставьте первые 10 строк.</p>",
     "hints": [
      "<code>drop(columns=['status'])</code>, <code>rename(columns={'amount': 'revenue'})</code>",
      "В конце <code>sort_values('revenue', ascending=False).head(10)</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_r = _o[_o['status'] == 'paid'].sort_values('amount', ascending=False).head(10)\nassert 'status' not in report.columns, 'столбец status должен быть удалён'\nassert 'revenue' in report.columns and 'amount' not in report.columns, 'amount должен быть переименован в revenue'\nassert 'month' in report.columns and (report['month'] == report['order_date'].str[:7]).all(), 'month = первые 7 символов order_date'\nassert report['revenue'].tolist() == _r['amount'].tolist(), 'Нужны 10 самых больших оплаченных заказов по убыванию'"
     }
    }
   ]
  },
  "pd-4": {
   "pr": [
    {
     "title": "Количество по статусам",
     "prompt": "<p>Запишите количество заказов в каждом статусе с помощью <code>groupby</code> в Series <code>by_status</code> (посчитайте столбец <code>id</code>).</p>",
     "hints": [
      "<code>orders.groupby('status')['id'].count()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o.groupby('status')['id'].count()\nassert list(by_status.index) == list(_g.index), 'Индекс должен состоять из статусов'\nassert by_status.tolist() == _g.tolist(), 'Числа неверны'"
     }
    },
    {
     "title": "Общая сумма клиента",
     "prompt": "<p>Запишите в Series <code>by_cust</code> сумму всех заказов каждого клиента (<code>customer_id</code>).</p>",
     "hints": [
      "<code>orders.groupby('customer_id')['amount'].sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o.groupby('customer_id')['amount'].sum()\nassert len(by_cust) == len(_g), 'Нужна одна строка на каждого клиента'\nassert [round(float(v)) for v in by_cust.values] == [round(float(v)) for v in _g.values], 'Суммы не совпадают'"
     }
    },
    {
     "title": "Общая выручка по регионам",
     "prompt": "<p>Прочитайте файл <code>daily_sales.csv</code> в переменную <code>daily</code> и запишите общую выручку каждого региона (<code>region</code>), то есть сумму <code>revenue</code>, в Series <code>total_by_region</code>.</p>",
     "hints": [
      "<code>daily.groupby('region')['revenue'].sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_g = _d.groupby('region')['revenue'].sum()\nassert list(total_by_region.index) == list(_g.index), 'Индекс должен состоять из регионов'\nassert total_by_region.tolist() == _g.tolist(), 'Суммы не совпадают'"
     }
    },
    {
     "title": "Средний чек по месяцам",
     "prompt": "<p>По оплаченным заказам вычислите средний чек за каждый месяц (среднее значение <code>amount</code>), округлите до целого и запишите в Series <code>avg_month</code>. Индекс — месяц (первые 7 символов <code>order_date</code>).</p>",
     "hints": [
      "Сначала отфильтруйте <code>paid</code> и добавьте столбец <code>month</code>.",
      "<code>.groupby('month')['amount'].mean().round()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid']\n_m = _p.groupby(_p['order_date'].str[:7])['amount'].mean().round()\nassert [str(i) for i in avg_month.index] == list(_m.index), 'Индекс должен состоять из месяцев'\nassert [round(float(v)) for v in avg_month.values] == [round(float(v)) for v in _m.values], 'Средние значения не совпадают: учитываются только оплаченные заказы'"
     }
    },
    {
     "title": "Уникальные клиенты за месяц",
     "prompt": "<p>Запишите в Series <code>active</code> количество разных клиентов, которые сделали заказ в каждом месяце (<code>nunique</code>). Индекс — месяц (первые 7 символов <code>order_date</code>), учитываются все заказы.</p>",
     "hints": [
      "<code>.groupby('month')['customer_id'].nunique()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_a = _o.groupby(_o['order_date'].str[:7])['customer_id'].nunique()\nassert [str(i) for i in active.index] == list(_a.index), 'Индекс должен состоять из месяцев'\nassert active.tolist() == _a.tolist(), 'Количество уникальных клиентов неверно: используйте nunique'"
     }
    },
    {
     "title": "Крупные клиенты (HAVING)",
     "prompt": "<p>По оплаченным заказам посчитайте выручку (<code>revenue</code>) каждого клиента и запишите в DataFrame <code>big_clients</code> только тех клиентов, у которых выручка больше 10 000. Столбцы: <code>customer_id</code>, <code>revenue</code>.</p>",
     "hints": [
      "<code>.agg(revenue=('amount', 'sum')).reset_index()</code>",
      "Затем фильтр после агрегации: <code>res[res['revenue'] &gt; 10000]</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o[_o['status'] == 'paid'].groupby('customer_id')['amount'].sum()\n_g = _g[_g > 10000]\nassert 'customer_id' in big_clients.columns and 'revenue' in big_clients.columns, 'Столбцы: customer_id, revenue (нужен reset_index)'\nassert sorted(big_clients['customer_id']) == sorted(_g.index), 'Список клиентов неверен: только paid, выручка > 10000'"
     }
    },
    {
     "title": "Первый и последний заказ",
     "prompt": "<p>Для каждого клиента с помощью <code>agg</code> вычислите <code>first</code> (самая ранняя <code>order_date</code>), <code>last</code> (самая поздняя <code>order_date</code>) и <code>orders</code> (количество заказов), и создайте DataFrame <code>life</code>. Столбец <code>customer_id</code> должен быть обычным столбцом. Отсортируйте по <code>orders</code> по убыванию, а при равенстве по <code>customer_id</code> по возрастанию.</p>",
     "hints": [
      "<code>first=('order_date', 'min')</code>: даты-строки тоже сравниваются.",
      "Сортировка: <code>sort_values(['orders', 'customer_id'], ascending=[False, True])</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_l = _o.groupby('customer_id').agg(first=('order_date', 'min'), last=('order_date', 'max'), orders=('id', 'count')).reset_index().sort_values(['orders', 'customer_id'], ascending=[False, True])\nassert {'customer_id', 'first', 'last', 'orders'} <= set(life.columns), 'Столбцы: customer_id, first, last, orders'\nassert life['customer_id'].tolist() == _l['customer_id'].tolist(), 'Порядок клиентов неверен'\nassert life['first'].tolist() == _l['first'].tolist() and life['last'].tolist() == _l['last'].tolist(), 'Даты first/last неверны'"
     }
    },
    {
     "title": "Ежемесячные показатели",
     "prompt": "<p>По оплаченным заказам для каждого месяца вычислите <code>orders</code> (количество), <code>customers</code> (уникальные клиенты), <code>revenue</code> (сумма), и создайте DataFrame <code>monthly</code>. Затем добавьте столбец <code>avg_check</code>: <code>revenue / orders</code>, округлённый до целого. Столбец <code>month</code> должен быть обычным столбцом, месяцы идут по возрастанию.</p>",
     "hints": [
      "<code>.agg(orders=('id', 'count'), customers=('customer_id', 'nunique'), revenue=('amount', 'sum'))</code>",
      "Новый столбец добавляется после агрегации."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid'].copy()\n_p['month'] = _p['order_date'].str[:7]\n_m = _p.groupby('month').agg(orders=('id', 'count'), customers=('customer_id', 'nunique'), revenue=('amount', 'sum')).reset_index()\nassert {'month', 'orders', 'customers', 'revenue', 'avg_check'} <= set(monthly.columns), 'Столбцы: month, orders, customers, revenue, avg_check'\nassert [str(m) for m in monthly['month']] == _m['month'].tolist(), 'Месяцы должны идти по возрастанию'\nassert monthly['orders'].tolist() == _m['orders'].tolist(), 'orders: нужно считать id'\nassert monthly['customers'].tolist() == _m['customers'].tolist(), 'customers: используйте nunique'\nassert [round(float(a)) for a in monthly['avg_check']] == [round(r / n) for r, n in zip(_m['revenue'], _m['orders'])], 'avg_check = revenue / orders'"
     }
    }
   ]
  },
  "pd-5": {
   "pr": [
    {
     "title": "Таблица без пустых сумм",
     "prompt": "<p>Удалите строки с пустым <code>amount</code> с помощью <code>dropna</code> и запишите результат в переменную <code>no_null</code>.</p>",
     "hints": [
      "<code>orders.dropna(subset=['amount'])</code>"
     ],
     "check": {
      "tests": "assert len(no_null) == 144, 'В no_null должно быть 144 строки'\nassert no_null['amount'].isna().sum() == 0, 'Остались пустые значения'"
     }
    },
    {
     "title": "Пустые значения по столбцам",
     "prompt": "<p>Запишите количество пустых значений в каждом столбце в Series <code>nulls</code>.</p>",
     "hints": [
      "<code>orders.isna().sum()</code>"
     ],
     "check": {
      "tests": "assert isinstance(nulls, pd.Series), 'nulls должен быть Series'\nassert int(nulls['amount']) == 6 and int(nulls['id']) == 0, 'nulls неверен: orders.isna().sum()'"
     }
    },
    {
     "title": "Повторные посещения",
     "prompt": "<p>В журнале посещений школы есть повторяющиеся строки. Уберите дубли с помощью <code>drop_duplicates</code> и запишите результат в переменную <code>uniq</code>.</p>",
     "hints": [
      "<code>visits.drop_duplicates()</code>"
     ],
     "check": {
      "tests": "assert len(uniq) == 5, 'В uniq должно быть 5 строк'\nassert not uniq.duplicated().any(), 'Остались повторяющиеся строки'"
     }
    },
    {
     "title": "Заполнение медианой",
     "prompt": "<p>Заполните пустые значения в столбце <code>amount</code> медианой этого столбца и запишите результат в Series <code>filled</code>.</p>",
     "hints": [
      "<code>orders['amount'].median()</code>",
      "<code>.fillna(...)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_f = _o['amount'].fillna(_o['amount'].median())\nassert len(filled) == 150 and filled.isna().sum() == 0, 'В filled не должно быть пустых значений'\nassert abs(float(filled.sum()) - float(_f.sum())) < 0.01, 'Пустые места должны быть заполнены медианой'"
     }
    },
    {
     "title": "Очистка названий городов",
     "prompt": "<p>Очистите столбец <code>city</code> в таблице <code>shops</code>: уберите пробелы и напишите каждое слово с заглавной буквы (<code>.str.strip().str.title()</code>). Затем запишите в переменную <code>n_cities</code>, сколько разных городов есть.</p>",
     "hints": [
      "<code>shops['city'].str.strip().str.title()</code>",
      "<code>shops['city'].nunique()</code>"
     ],
     "check": {
      "tests": "assert shops['city'].tolist() == ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Астана', 'Алматы'], 'столбец city не очищен:' + str(shops['city'].tolist())\nassert n_cities == 3, 'n_cities должен быть равен 3'"
     }
    },
    {
     "title": "Выбросы в суммах",
     "prompt": "<p>Методом IQR вычислите верхнюю границу <code>amount</code> (<code>q3 + 1.5 * iqr</code>) и запишите её в переменную <code>upper</code>. Посчитайте количество заказов, сумма которых больше этой границы, и запишите в <code>n_out</code>.</p>",
     "hints": [
      "<code>q1, q3 = orders['amount'].quantile([0.25, 0.75])</code>",
      "<code>(orders['amount'] &gt; upper).sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_q1, _q3 = _o['amount'].quantile([0.25, 0.75])\n_u = _q3 + 1.5 * (_q3 - _q1)\nassert abs(float(upper) - float(_u)) < 0.01, 'upper неверен: q3 + 1.5 * (q3 - q1)'\nassert int(n_out) == int((_o['amount'] > _u).sum()), 'n_out неверен'"
     }
    },
    {
     "title": "Цепочка очистки",
     "prompt": "<p>С помощью method chaining создайте таблицу <code>clean</code>: удалите дубликаты, уберите строки с пустым <code>amount</code>, затем с помощью <code>query</code> оставьте только оплаченные заказы на сумму от 1000 до 20 000 включительно. Количество оставшихся строк запишите в переменную <code>removed</code>.</p>",
     "hints": [
      "Цепочка: <code>.drop_duplicates().dropna(subset=[...]).query(...)</code>",
      "<code>removed = len(orders) - len(clean)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _o.drop_duplicates().dropna(subset=['amount'])\n_k = _k[(_k['status'] == 'paid') & (_k['amount'] >= 1000) & (_k['amount'] <= 20000)]\nassert sorted(clean['id']) == sorted(_k['id']), 'строки clean неверны: проверьте условия'\nassert removed == len(_o) - len(_k), 'removed = len(orders) - len(clean)'"
     }
    },
    {
     "title": "Очистка и сумма по городам",
     "prompt": "<p>Таблица <code>sales</code> загрязнена: названия городов записаны по-разному, одна сумма пустая, одна строка повторяется. Сначала очистите столбец <code>city</code> с помощью <code>.str.strip().str.title()</code>, затем удалите дубликаты и пустые суммы. В конце запишите сумму по каждому городу в Series <code>by_city</code>.</p>",
     "hints": [
      "Сначала очистите названия городов: только тогда повторяющиеся строки станут одинаковыми.",
      "<code>.groupby('city')['amount'].sum()</code>"
     ],
     "check": {
      "tests": "assert sorted(by_city.index) == sorted(['Алматы', 'Астана', 'Шымкент']), 'Города: Алматы, Астана, Шымкент'\nassert {k: round(float(v)) for k, v in by_city.items()} == {'Алматы': 7000, 'Астана': 7500, 'Шымкент': 2700}, 'Суммы неверны:' + str(by_city.to_dict())"
     }
    }
   ]
  },
  "pd-6": {
   "pr": [
    {
     "title": "Добавить город к заказу",
     "prompt": "<p>Объедините <code>orders</code> и <code>customers</code> по условию <code>customer_id</code> = <code>id</code> и запишите результат в переменную <code>df</code>. Используйте <code>suffixes=('_order', '_customer')</code>.</p>",
     "hints": [
      "<code>orders.merge(customers, left_on='customer_id', right_on='id', suffixes=('_order', '_customer'))</code>"
     ],
     "check": {
      "tests": "assert len(df) == 150, 'После объединения должно быть 150 строк'\nassert {'city', 'channel', 'id_order', 'id_customer'} <= set(df.columns), 'Нужны столбцы city, channel, id_order, id_customer: проверьте suffixes'"
     }
    },
    {
     "title": "Объединение по общему ключу",
     "prompt": "<p>В таблицах <code>results</code> и <code>schools</code> есть общий столбец <code>school_id</code>. Объедините их по <code>on='school_id'</code> и запишите результат в переменную <code>df</code>.</p>",
     "hints": [
      "<code>results.merge(schools, on='school_id')</code>"
     ],
     "check": {
      "tests": "assert len(df) == 6, 'В df должно быть 6 строк'\nassert 'name' in df.columns and 'score' in df.columns, 'Нужны столбцы name и score'\nassert df[df['name'] == 'НЗМ']['score'].tolist() == [131, 118, 125], 'Результаты НЗМ неверны'"
     }
    },
    {
     "title": "Разница между inner и left",
     "prompt": "<p>В таблице <code>trips</code> есть водитель, которого нет в <code>drivers</code>. Объедините по <code>driver_id</code> с <code>how='inner'</code> и запишите число строк в <code>n_inner</code>, а с <code>how='left'</code> (слева таблица <code>trips</code>) — число строк в <code>n_left</code>.</p>",
     "hints": [
      "<code>len(trips.merge(drivers, on='driver_id', how='inner'))</code>"
     ],
     "check": {
      "tests": "assert n_inner == 4, 'n_inner должен быть равен 4: водитель 14 нет в drivers'\nassert n_left == 5, 'n_left должен быть равен 5: left сохраняет все поездки'"
     }
    },
    {
     "title": "Выручка по городам",
     "prompt": "<p>Объедините чистые заказы (<code>clean</code> уже готова) с клиентами и запишите выручку каждого города по убыванию в Series <code>by_city</code>.</p>",
     "hints": [
      "<code>clean.merge(customers, left_on='customer_id', right_on='id')</code>",
      "<code>.groupby('city')['amount'].sum().sort_values(ascending=False)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('city')['amount'].sum().sort_values(ascending=False)\nassert list(by_city.index) == list(_m.index), 'Порядок городов неверен: по убыванию'\nassert [round(float(v)) for v in by_city.values] == [round(float(v)) for v in _m.values], 'Суммы не совпадают'"
     }
    },
    {
     "title": "Кто не заказывал в марте",
     "prompt": "<p>Запишите в переменную <code>absent</code> список <code>id</code> клиентов, которые ни разу не заказали в марте 2024 года (<code>order_date</code> начинается с <code>'2024-03'</code>), по возрастанию. Подсказка: объедините клиентов с заказами за март с помощью <code>how='left'</code> и возьмите строки без заказа (<code>isna</code>).</p>",
     "hints": [
      "Сначала отфильтруйте заказы за март.",
      "После объединения используйте <code>df[df['id_order'].isna()]</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = set(_o[_o['order_date'].str[:7] == '2024-03']['customer_id'])\n_a = sorted(i for i in _c['id'] if i not in _m)\nassert [int(x) for x in absent] == _a, 'список absent неверен:' + str(list(absent))"
     }
    },
    {
     "title": "Уникальные клиенты по каналам",
     "prompt": "<p>Объедините чистые заказы с клиентами и запишите в Series <code>buyers</code>, сколько разных клиентов купили через каждый канал (<code>channel</code>).</p>",
     "hints": [
      "<code>.groupby('channel')['customer_id'].nunique()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_b = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel')['customer_id'].nunique()\nassert sorted(buyers.index) == sorted(_b.index), 'Индекс должен состоять из каналов'\nassert {k: int(v) for k, v in buyers.items()} == {k: int(v) for k, v in _b.items()}, 'Количество уникальных клиентов неверно: nunique'"
     }
    },
    {
     "title": "Доля выручки каналов",
     "prompt": "<p>Объедините чистые заказы с клиентами и для каждого канала вычислите <code>orders</code> (количество) и <code>revenue</code> (сумма). Добавьте столбец <code>share</code>: доля выручки канала в общей выручке в процентах, с 1 знаком после запятой. Результат — DataFrame <code>by_channel</code>, столбец <code>channel</code> обычный, сортировка по <code>revenue</code> по убыванию.</p>",
     "hints": [
      "<code>.agg(orders=('amount', 'count'), revenue=('amount', 'sum')).reset_index()</code>",
      "<code>by_channel['revenue'] / by_channel['revenue'].sum() * 100</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel').agg(orders=('amount', 'count'), revenue=('amount', 'sum')).reset_index().sort_values('revenue', ascending=False)\nassert {'channel', 'orders', 'revenue', 'share'} <= set(by_channel.columns), 'Столбцы: channel, orders, revenue, share'\nassert by_channel['channel'].tolist() == _g['channel'].tolist(), 'Порядок каналов неверен'\nassert by_channel['orders'].tolist() == _g['orders'].tolist(), 'orders неверен'\nassert [round(float(s), 1) for s in by_channel['share']] == [round(r / _g['revenue'].sum() * 100, 1) for r in _g['revenue']], 'share = revenue / общая выручка * 100'"
     }
    },
    {
     "title": "Выручка по месяцу регистрации",
     "prompt": "<p>Добавьте клиентам столбец <code>signup_month</code> (первые 7 символов <code>signup_date</code>). Объедините чистые заказы с клиентами и запишите выручку по месяцу регистрации клиента в Series <code>by_signup</code> (индекс — месяц, по возрастанию).</p>",
     "hints": [
      "<code>customers['signup_date'].str[:7]</code>",
      "<code>.groupby('signup_month')['amount'].sum()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _c.copy()\n_k['signup_month'] = _k['signup_date'].str[:7]\n_g = _clean.merge(_k, left_on='customer_id', right_on='id').groupby('signup_month')['amount'].sum()\nassert [str(i) for i in by_signup.index] == list(_g.index), 'Индекс должен состоять из месяцев регистрации'\nassert [round(float(v)) for v in by_signup.values] == [round(float(v)) for v in _g.values], 'Суммы не совпадают'"
     }
    }
   ]
  },
  "pd-7": {
   "pr": [
    {
     "title": "Из текста в дату",
     "prompt": "<p>Преобразуйте столбец <code>order_date</code> в тип даты с помощью <code>pd.to_datetime</code> (запишите результат в тот же столбец).</p>",
     "hints": [
      "<code>orders['order_date'] = pd.to_datetime(orders['order_date'])</code>"
     ],
     "check": {
      "tests": "assert str(orders['order_date'].dtype).startswith('datetime64'), 'order_date должен быть типа даты (datetime64)'\nassert str(orders['order_date'].min())[:10] == '2024-01-01', 'Даты преобразованы неверно'"
     }
    },
    {
     "title": "День недели",
     "prompt": "<p>Преобразуйте <code>order_date</code> в дату и добавьте столбец <code>weekday</code>: название дня недели (<code>.dt.day_name()</code>, например <code>'Tuesday'</code>).</p>",
     "hints": [
      "Сначала <code>pd.to_datetime</code>, затем <code>.dt.day_name()</code>."
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_w = _pd.to_datetime(_o['order_date']).dt.day_name()\nassert 'weekday' in orders.columns, 'нет столбца weekday'\nassert orders['weekday'].tolist() == _w.tolist(), 'значения weekday неверны'"
     }
    },
    {
     "title": "Рекордный день по регионам",
     "prompt": "<p>Прочитайте файл <code>daily_sales.csv</code> в переменную <code>daily</code> и запишите в Series <code>best_by_region</code> наибольшую дневную выручку каждого региона.</p>",
     "hints": [
      "<code>daily.groupby('region')['revenue'].max()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_g = _d.groupby('region')['revenue'].max()\nassert list(best_by_region.index) == list(_g.index), 'Индекс должен состоять из регионов'\nassert best_by_region.tolist() == _g.tolist(), 'Максимальные значения не совпадают'"
     }
    },
    {
     "title": "По дням недели",
     "prompt": "<p>По оплаченным заказам запишите в Series <code>by_wd</code> количество заказов в каждый день недели (индекс — названия из <code>.dt.day_name()</code>).</p>",
     "hints": [
      "После фильтра используйте <code>.copy()</code>, затем добавьте столбец <code>weekday</code>.",
      "<code>.groupby('weekday')['id'].count()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid']\n_g = _p.groupby(_pd.to_datetime(_p['order_date']).dt.day_name())['id'].count()\nassert {str(k): int(v) for k, v in by_wd.items()} == {k: int(v) for k, v in _g.items()}, 'Числа по дням недели неверны: только оплаченные заказы'"
     }
    },
    {
     "title": "Таблица месяц и статус",
     "prompt": "<p>С помощью <code>pivot_table</code> создайте таблицу <code>pt</code>: строки — месяц (<code>month</code>, первые 7 символов <code>order_date</code>), столбцы — <code>status</code>, значения — количество заказов (<code>values='id'</code>, <code>aggfunc='count'</code>), пустые места заполните 0.</p>",
     "hints": [
      "<code>pd.pivot_table(orders, index='month', columns='status', values='id', aggfunc='count', fill_value=0)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _o.copy()\n_k['month'] = _k['order_date'].str[:7]\n_p = _pd.pivot_table(_k, index='month', columns='status', values='id', aggfunc='count', fill_value=0)\nassert [str(i) for i in pt.index] == list(_p.index), 'Строки должны быть месяцами'\nassert [str(c) for c in pt.columns] == list(_p.columns), 'Столбцы должны быть статусами'\nassert (pt.values == _p.values).all(), 'Значения не совпадают: нужны count и fill_value=0'"
     }
    },
    {
     "title": "Таблица день × регион",
     "prompt": "<p>Из файла <code>daily_sales.csv</code> создайте с помощью <code>pivot_table</code> таблицу <code>wide</code>: строки — <code>day</code>, столбцы — <code>region</code>, значения — сумма <code>revenue</code>.</p>",
     "hints": [
      "<code>pd.pivot_table(daily, index='day', columns='region', values='revenue', aggfunc='sum')</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_p = _pd.pivot_table(_d, index='day', columns='region', values='revenue', aggfunc='sum')\nassert wide.shape == _p.shape, 'размер wide:' + str(_p.shape) + ' болуы керек'\nassert [str(c) for c in wide.columns] == list(_p.columns), 'Столбцы должны быть регионами'\nassert (wide.values == _p.values).all(), 'Значения не совпадают'"
     }
    },
    {
     "title": "Скользящее среднее за 3 дня",
     "prompt": "<p>Прочитайте файл <code>daily_sales.csv</code> с помощью <code>parse_dates=['day']</code>. Возьмите только строки Алматы, сделайте <code>day</code> индексом и запишите 3-дневное скользящее среднее <code>revenue</code> в Series <code>roll</code> (<code>.rolling(3).mean()</code>).</p>",
     "hints": [
      "<code>daily[daily['region'] == 'Алматы'].set_index('day')</code>",
      "<code>['revenue'].rolling(3).mean()</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_r = _d[_d['region'] == 'Алматы']['revenue'].rolling(3).mean()\nassert len(roll) == len(_r), 'В roll должен быть каждый день Алматы'\nassert int(roll.isna().sum()) == 2, 'Первые 2 значения должны быть пустыми (NaN): rolling(3)'\nassert [round(float(v), 2) for v in roll.dropna()] == [round(float(v), 2) for v in _r.dropna()], 'Значения скользящего среднего не совпадают'\nassert str(roll.index.dtype).startswith('datetime64'), 'Индекс должен быть day (тип даты)'"
     }
    },
    {
     "title": "Клиенты по каналам и месяцам",
     "prompt": "<p>Объедините чистые заказы с клиентами и создайте сводную таблицу <code>pt</code>: строки — месяц (преобразуйте <code>order_date</code> через <code>pd.to_datetime</code> и возьмите <code>.dt.to_period('M')</code>), столбцы — <code>channel</code>, значения — количество уникальных клиентов (<code>values='customer_id'</code>, <code>aggfunc='nunique'</code>), пустые места заполните 0.</p>",
     "hints": [
      "<code>pd.to_datetime(df['order_date']).dt.to_period('M')</code>",
      "<code>aggfunc='nunique'</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_d['month'] = _d['order_date'].str[:7]\n_p = _pd.pivot_table(_d, index='month', columns='channel', values='customer_id', aggfunc='nunique', fill_value=0)\nassert [str(i) for i in pt.index] == list(_p.index), 'Строки должны быть месяцами (2024-01 ... 2024-06)'\nassert [str(c) for c in pt.columns] == list(_p.columns), 'Столбцы должны быть каналами'\nassert (pt.values == _p.values).all(), 'Значения не совпадают: нужны nunique и fill_value=0'"
     }
    }
   ]
  },
  "pd-8": {
   "pr": [
    {
     "title": "Средняя недельная температура",
     "prompt": "<p>Создайте массив NumPy <code>t</code> из значений температуры за неделю, вычислите его среднее и запишите в переменную <code>avg</code>.</p>",
     "hints": [
      "<code>np.array(temps)</code>, затем <code>.mean()</code>."
     ],
     "check": {
      "tests": "assert isinstance(t, np.ndarray), 't должен быть массивом NumPy: np.array(temps)'\nassert abs(avg - 3 / 7) < 1e-9, 'avg неверен: t.mean()'"
     }
    },
    {
     "title": "Цена в долларах",
     "prompt": "<p>Переведите цены в тенге из массива <code>prices</code> в доллары (делением на 500), округлите с помощью <code>np.round(..., 2)</code> и запишите в массив <code>usd</code>. Не используйте цикл.</p>",
     "hints": [
      "<code>np.round(prices / 500, 2)</code>"
     ],
     "check": {
      "tests": "assert isinstance(usd, np.ndarray), 'usd должен быть массивом NumPy'\nassert usd.tolist() == [25.0, 9.98, 700.0, 1.56], 'usd неверен:' + str(usd.tolist())"
     }
    },
    {
     "title": "Тёплые дни",
     "prompt": "<p>С помощью маски возьмите из массива <code>t</code> только значения больше 0 и запишите их в массив <code>warm</code>.</p>",
     "hints": [
      "<code>t[t &gt; 0]</code>"
     ],
     "check": {
      "tests": "assert warm.tolist() == [2, 7, 4], 'warm должен быть равен [2, 7, 4]'"
     }
    },
    {
     "title": "Метка результата теста",
     "prompt": "<p>С помощью <code>np.where</code> поставьте метку каждому баллу из массива <code>scores</code>: 50 и выше — <code>'өтті'</code>, иначе <code>'құлады'</code>. Результат — <code>labels</code>. Количество сдавших запишите в переменную <code>n_pass</code>.</p>",
     "hints": [
      "<code>np.where(scores &gt;= 50, 'өтті', 'құлады')</code>",
      "<code>(scores &gt;= 50).sum()</code> считает значения True."
     ],
     "check": {
      "tests": "assert labels.tolist() == ['өтті', 'құлады', 'өтті', 'өтті', 'құлады', 'өтті'], 'labels неверен:' + str(labels.tolist())\nassert int(n_pass) == 4, 'n_pass должен быть равен 4'"
     }
    },
    {
     "title": "День достижения цели",
     "prompt": "<p>Дан доход кофейни по дням (тыс. тенге). С помощью <code>np.cumsum</code> запишите накопленный доход в массив <code>cum</code>. Номер дня (с 1), когда накопленный доход впервые достиг 1000 (или превысил), запишите в переменную <code>day</code>: <code>(cum &gt;= 1000).argmax() + 1</code>.</p>",
     "hints": [
      "<code>np.cumsum(daily)</code>",
      "В массиве True/False метод <code>argmax()</code> возвращает позицию первого True."
     ],
     "check": {
      "tests": "assert cum.tolist() == [180, 390, 550, 790, 980, 1210, 1410], 'cum неверен: np.cumsum'\nassert int(day) == 6, 'day должен быть равен 6'"
     }
    },
    {
     "title": "Перцентиль времени доставки",
     "prompt": "<p>Даны времена доставки (в минутах). Запишите 90-й перцентиль в переменную <code>p90</code>, а медиану в переменную <code>med</code>.</p>",
     "hints": [
      "<code>np.percentile(times, 90)</code>",
      "<code>np.median(times)</code>"
     ],
     "check": {
      "tests": "assert abs(p90 - 58.5) < 1e-9, 'p90 должен быть равен 58.5: np.percentile(times, 90)'\nassert med == 31.0, 'med должен быть равен 31.0'"
     }
    },
    {
     "title": "Самый жаркий день",
     "prompt": "<p>Даны список <code>days</code> и массив <code>t</code>. С помощью <code>argmax</code> запишите название самого жаркого дня в переменную <code>hottest</code>. Количество дней, температура которых выше средней за неделю, запишите в переменную <code>n_above</code>.</p>",
     "hints": [
      "<code>t.argmax()</code> возвращает позицию, название: <code>days[...]</code>.",
      "<code>(t &gt; t.mean()).sum()</code>"
     ],
     "check": {
      "tests": "assert hottest == 'жм', 'hottest должен быть равен \\'жм\\''\nassert int(n_above) == 4, 'n_above должен быть равен 4'"
     }
    },
    {
     "title": "Выбросы по z-оценке",
     "prompt": "<p>Даны цены поездок такси. Вычислите z-оценку каждого значения: <code>z = (a - a.mean()) / a.std()</code>. Цены, у которых модуль z больше 2 (<code>(z &gt; 2) | (z &lt; -2)</code>), запишите в массив <code>outliers</code>, а среднее остальных, округлённое до 1 знака после запятой, — в переменную <code>clean_mean</code>.</p>",
     "hints": [
      "Маска: <code>mask = (z &gt; 2) | (z &lt; -2)</code>",
      "Остальные: <code>a[~mask]</code> или <code>a[(z &lt;= 2) &amp; (z &gt;= -2)]</code>."
     ],
     "check": {
      "tests": "assert outliers.tolist() == [9800], 'outliers должен быть равен [9800]'\nassert abs(clean_mean - 2000.0) < 0.05, 'clean_mean должен быть равен 2000.0'"
     }
    }
   ]
  }
 }
});
