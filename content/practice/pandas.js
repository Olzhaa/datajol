// Practice tasks after the lessons of m2-2. Each lesson's list opens one task at a time.
DJ.addPractice('m2-2', {
 "pd-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалалар температурасы",
   "prompt": "<p><code>weather</code> DataFrame-ін жасаңыз: <code>city</code> бағаны <code>['Алматы', 'Астана', 'Атырау', 'Өскемен']</code>, <code>temp</code> бағаны <code>[18, 9, 24, 12]</code>. Сосын <code>print(weather)</code>.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\nweather = pd.DataFrame({'city': ['Алматы', 'Астана', 'Атырау', 'Өскемен'], 'temp': [18, 9, 24, 12]})\nprint(weather)",
   "hints": [
    "<code>pd.DataFrame({'city': [...], 'temp': [...]})</code>"
   ],
   "check": {
    "tests": "assert isinstance(weather, pd.DataFrame), 'weather DataFrame болуы керек'\nassert list(weather.columns) == ['city', 'temp'], 'Бағандар: city, temp'\nassert weather['city'].tolist() == ['Алматы', 'Астана', 'Атырау', 'Өскемен'], 'city мәндері дұрыс емес'\nassert weather['temp'].tolist() == [18, 9, 24, 12], 'temp мәндері [18, 9, 24, 12] болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Клиенттер саны",
   "prompt": "<p><code>customers.csv</code> файлын <code>customers</code> айнымалысына оқып, клиенттер санын <code>len()</code> арқылы <code>n_customers</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\ncustomers = pd.read_csv('customers.csv')\nn_customers = len(customers)\nprint(n_customers)",
   "hints": [
    "<code>pd.read_csv('customers.csv')</code>",
    "<code>len(customers)</code>"
   ],
   "check": {
    "tests": "assert n_customers == 40, 'Клиенттер саны дұрыс емес: len(customers) қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Баған атаулары",
   "prompt": "<p><code>orders.csv</code> файлын оқып, баған атауларын <code>list(orders.columns)</code> арқылы <code>cols</code> тізіміне жазыңыз.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncols = list(orders.columns)\nprint(cols)",
   "hints": [
    "<code>list(orders.columns)</code>"
   ],
   "check": {
    "tests": "assert cols == ['id', 'customer_id', 'order_date', 'amount', 'status'], 'cols дұрыс емес: ' + str(cols)"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Алғашқы үш тапсырыс",
   "prompt": "<p><code>orders</code> кестесінің алғашқы 3 жолын <code>first3</code> айнымалысына жазып, шығарыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nfirst3 = orders.head(3)\nprint(first3)",
   "hints": [
    "<code>orders.head(3)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert len(first3) == 3, 'first3 ішінде 3 жол болуы керек'\nassert first3['id'].tolist() == _o['id'].head(3).tolist(), 'Алғашқы 3 жол керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Күндік кесте өлшемі",
   "prompt": "<p><code>daily_sales.csv</code> файлын <code>daily</code> айнымалысына оқыңыз. Жолдар санын <code>n_rows</code>, бағандар санын <code>n_cols</code> айнымалысына <code>shape</code> арқылы жазыңыз.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv')\nn_rows, n_cols = daily.shape\nprint(n_rows, n_cols)",
   "hints": [
    "<code>daily.shape</code> (жолдар, бағандар) береді."
   ],
   "check": {
    "tests": "assert n_rows == 20, 'n_rows дұрыс емес: daily.shape[0]'\nassert n_cols == 3, 'n_cols дұрыс емес: daily.shape[1]'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "describe ішінен максимум",
   "prompt": "<p><code>orders.describe()</code> нәтижесін <code>stats</code> айнымалысына жазыңыз. Сосын одан <code>amount</code> бағанының ең үлкен мәнін алып, <code>max_amount</code>-қа жазыңыз: <code>stats['amount']['max']</code>.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nstats = orders.describe()\nmax_amount = stats['amount']['max']\nprint(max_amount)",
   "hints": [
    "<code>describe()</code> да DataFrame: жолдары count, mean, ..., max."
   ],
   "check": {
    "tests": "assert isinstance(stats, pd.DataFrame), 'stats = orders.describe() болуы керек'\nassert float(max_amount) == 48000, 'max_amount 48000 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Клиентке шаққандағы тапсырыс",
   "prompt": "<p><code>orders.csv</code> және <code>customers.csv</code> файлдарын оқып, бір клиентке орта есеппен неше тапсырыс келетінін (тапсырыстар саны / клиенттер саны) 2 ондық таңбаға дейін дөңгелектеп, <code>per_customer</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nper_customer = round(len(orders) / len(customers), 2)\nprint(per_customer)",
   "hints": [
    "Екі файлды оқып, <code>len()</code> мәндерін бөліңіз.",
    "<code>round(..., 2)</code>"
   ],
   "check": {
    "tests": "assert per_customer == 3.75, 'per_customer 3.75 болуы керек: len(orders) / len(customers)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сөздіктер тізімінен кесте",
   "prompt": "<p>Мектептер сөздіктер тізімі түрінде берілген (әр сөздік — бір жол). Одан <code>schools</code> DataFrame-ін жасаңыз, сосын жолдар мен бағандар санын <code>size</code> айнымалысына <code>shape</code> арқылы жазыңыз.</p>",
   "starter": "import pandas as pd\n\nrecords = [\n    {'school': '№12 мектеп', 'city': 'Тараз', 'students': 940},\n    {'school': '№5 гимназия', 'city': 'Орал', 'students': 1210},\n    {'school': 'НЗМ', 'city': 'Көкшетау', 'students': 720},\n]\n",
   "solution": "import pandas as pd\n\nrecords = [\n    {'school': '№12 мектеп', 'city': 'Тараз', 'students': 940},\n    {'school': '№5 гимназия', 'city': 'Орал', 'students': 1210},\n    {'school': 'НЗМ', 'city': 'Көкшетау', 'students': 720},\n]\nschools = pd.DataFrame(records)\nsize = schools.shape\nprint(size)",
   "hints": [
    "<code>pd.DataFrame(records)</code> сөздік кілттерін баған атаулары етеді."
   ],
   "check": {
    "tests": "assert isinstance(schools, pd.DataFrame), 'schools DataFrame болуы керек'\nassert list(schools.columns) == ['school', 'city', 'students'], 'Бағандар: school, city, students'\nassert tuple(size) == (3, 3), 'size (3, 3) болуы керек'\nassert schools['students'].tolist() == [940, 1210, 720], 'students мәндері дұрыс емес'"
   }
  }
 ],
 "pd-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сома бағаны",
   "prompt": "<p><code>amount</code> бағанын <code>amounts</code> айнымалысына Series ретінде алыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\namounts = orders['amount']\nprint(amounts.head())",
   "hints": [
    "<code>orders['amount']</code>"
   ],
   "check": {
    "tests": "assert isinstance(amounts, pd.Series), 'amounts Series болуы керек: бір жақша'\nassert len(amounts) == 150 and amounts.name == 'amount', 'amount бағанының барлық 150 мәні керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қайтарылған тапсырыстар",
   "prompt": "<p>Тек қайтарылған (<code>status == 'refund'</code>) тапсырыстарды <code>refunds</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nrefunds = orders[orders['status'] == 'refund']\nprint(refunds)",
   "hints": [
    "<code>orders[orders['status'] == 'refund']</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert sorted(refunds['id']) == sorted(_o[_o['status'] == 'refund']['id']), 'refunds ішінде тек refund тапсырыстар болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сомасы жоқ жолдар",
   "prompt": "<p><code>amount</code> бос (NaN) жолдарды <code>missing</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nmissing = orders[orders['amount'].isna()]\nprint(missing)",
   "hints": [
    "<code>orders['amount'].isna()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\nassert sorted(missing['id']) == sorted(_o[_o['amount'].isna()]['id']), 'missing ішінде тек amount бос жолдар болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Таңдалған клиенттер",
   "prompt": "<p>3, 5 және 7-клиенттердің тапсырыстарын <code>isin</code> арқылы <code>sel</code> айнымалысына жазыңыз. Тек <code>customer_id</code>, <code>order_date</code>, <code>amount</code> бағандары қалсын.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nsel = orders[orders['customer_id'].isin([3, 5, 7])][['customer_id', 'order_date', 'amount']]\nprint(sel)",
   "hints": [
    "<code>orders['customer_id'].isin([3, 5, 7])</code>",
    "Соңынан <code>[['customer_id', 'order_date', 'amount']]</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_s = _o[_o['customer_id'].isin([3, 5, 7])]\nassert list(sel.columns) == ['customer_id', 'order_date', 'amount'], 'Бағандар: customer_id, order_date, amount'\nassert len(sel) == len(_s) and sorted(sel['customer_id']) == sorted(_s['customer_id']), 'Тек 3, 5, 7-клиенттердің барлық тапсырыстары керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сүзгіден кейінгі бірінші жол",
   "prompt": "<p>Сомасы 3000-нан үлкен тапсырыстарды <code>big</code> айнымалысына жазыңыз. Сосын <code>iloc</code> арқылы <code>big</code>-тің бірінші жолындағы тапсырыс нөмірін (<code>id</code>) <code>first_id</code> айнымалысына алыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nbig = orders[orders['amount'] > 3000]\nfirst_id = big.iloc[0]['id']\nprint(first_id)",
   "hints": [
    "Сүзгіден кейін индекс 0-ден басталмайды: <code>big.iloc[0]</code> қолданыңыз."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_b = _o[_o['amount'] > 3000]\nassert len(big) == len(_b), 'big ішінде amount > 3000 жолдар болуы керек'\nassert int(first_id) == int(_b['id'].iloc[0]), 'first_id дұрыс емес: big.iloc[0][\"id\"]'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шағын немесе қайтарылған",
   "prompt": "<p>Сомасы 1000-нан кіші <b>немесе</b> статусы <code>refund</code> болатын тапсырыстарды <code>odd</code> айнымалысына жазыңыз (<code>|</code> операторы).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nodd = orders[(orders['amount'] < 1000) | (orders['status'] == 'refund')]\nprint(odd)",
   "hints": [
    "Әр шартты жақшаға алыңыз, арасына <code>|</code> қойыңыз."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_x = _o[(_o['amount'] < 1000) | (_o['status'] == 'refund')]\nassert sorted(odd['id']) == sorted(_x['id']), 'odd жолдары дұрыс емес: екі шартты | арқылы біріктіріңіз'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Наурыздағы ірі тапсырыстар",
   "prompt": "<p>2024 жылғы наурыздағы (<code>order_date</code> <code>'2024-03-01'</code> мен <code>'2024-03-31'</code> аралығында, екеуі де қоса), төленген және сомасы 2500-ден үлкен тапсырыстарды <code>march_big</code> айнымалысына жазыңыз. Тек <code>id</code> және <code>amount</code> бағандары қалсын, индекс 0-ден басталсын (<code>reset_index(drop=True)</code>).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nmarch_big = orders[(orders['order_date'] >= '2024-03-01') & (orders['order_date'] <= '2024-03-31') & (orders['status'] == 'paid') & (orders['amount'] > 2500)][['id', 'amount']].reset_index(drop=True)\nprint(march_big)",
   "hints": [
    "Мәтін күндерді салыстыруға болады: <code>orders['order_date'] &gt;= '2024-03-01'</code>.",
    "Төрт шартты <code>&amp;</code> арқылы біріктіріңіз."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = _o[(_o['order_date'] >= '2024-03-01') & (_o['order_date'] <= '2024-03-31') & (_o['status'] == 'paid') & (_o['amount'] > 2500)]\nassert list(march_big.columns) == ['id', 'amount'], 'Бағандар: id, amount'\nassert march_big['id'].tolist() == _m['id'].tolist(), 'Жолдар дұрыс емес: төрт шартты тексеріңіз'\nassert list(march_big.index) == list(range(len(_m))), 'Индекс 0-ден басталуы керек: reset_index(drop=True)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Алғашқы клиенттердің ірі чектері",
   "prompt": "<p><code>query</code> әдісі арқылы 1–5-клиенттердің (<code>customer_id &lt;= 5</code>) төленген және сомасы 2000 мен одан жоғары тапсырыстарын <code>vip</code> айнымалысына жазыңыз. Сосын оған <code>with_vat</code> бағанын қосыңыз: <code>amount * 1.12</code>.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nvip = orders.query(\"customer_id <= 5 and status == 'paid' and amount >= 2000\").copy()\nvip['with_vat'] = vip['amount'] * 1.12\nprint(vip)",
   "hints": [
    "<code>orders.query(\"customer_id &lt;= 5 and status == 'paid' and amount &gt;= 2000\")</code>",
    "Баған қоспас бұрын <code>.copy()</code> жазыңыз."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_v = _o[(_o['customer_id'] <= 5) & (_o['status'] == 'paid') & (_o['amount'] >= 2000)]\nassert sorted(vip['id']) == sorted(_v['id']), 'vip жолдары дұрыс емес'\nassert 'with_vat' in vip.columns, 'with_vat бағаны жоқ'\nassert ((vip['with_vat'] - vip['amount'] * 1.12).abs() < 0.01).all(), 'with_vat = amount * 1.12'"
   }
  }
 ],
 "pd-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мың теңгемен сома",
   "prompt": "<p><code>orders</code>-ке <code>amount_k</code> бағанын қосыңыз: <code>amount</code> 1000-ға бөлінген.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\norders['amount_k'] = orders['amount'] / 1000\nprint(orders.head())",
   "hints": [
    "<code>orders['amount'] / 1000</code>"
   ],
   "check": {
    "tests": "assert 'amount_k' in orders.columns, 'amount_k бағаны жоқ'\nassert ((orders['amount_k'] - orders['amount'] / 1000).abs() < 1e-9).sum() == orders['amount'].notna().sum(), 'amount_k = amount / 1000'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең арзан үш тапсырыс",
   "prompt": "<p>Сомасы ең кіші 3 тапсырысты өсу ретімен <code>cheap3</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncheap3 = orders.sort_values('amount').head(3)\nprint(cheap3)",
   "hints": [
    "<code>sort_values('amount')</code> әдепкіде өсу ретімен сұрыптайды."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_t = _o.sort_values('amount').head(3)\nassert len(cheap3) == 3, 'cheap3 ішінде 3 жол болуы керек'\nassert cheap3['amount'].tolist() == _t['amount'].tolist(), 'Ең кіші 3 сома өсу ретімен керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Баған атауын өзгерту",
   "prompt": "<p><code>amount</code> бағанының атауын <code>sum_kzt</code> деп өзгертіп, нәтижені <code>renamed</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nrenamed = orders.rename(columns={'amount': 'sum_kzt'})\nprint(renamed.head())",
   "hints": [
    "<code>orders.rename(columns={'amount': 'sum_kzt'})</code>"
   ],
   "check": {
    "tests": "assert 'sum_kzt' in renamed.columns and 'amount' not in renamed.columns, 'amount атауы sum_kzt болуы керек'\nassert len(renamed) == 150, 'Жолдар саны өзгермеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ай нөмірі",
   "prompt": "<p><code>orders</code>-ке <code>mon</code> бағанын қосыңыз: <code>order_date</code>-тың 6- және 7-таңбалары, яғни ай нөмірі (мысалы <code>'2024-03-05'</code> → <code>'03'</code>).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\norders['mon'] = orders['order_date'].str[5:7]\nprint(orders.head())",
   "hints": [
    "<code>orders['order_date'].str[5:7]</code>"
   ],
   "check": {
    "tests": "assert 'mon' in orders.columns, 'mon бағаны жоқ'\nassert orders['mon'].tolist() == [d[5:7] for d in orders['order_date']], 'mon = order_date-тың 5:7 кесіндісі'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сома деңгейі",
   "prompt": "<p><code>apply</code> және <code>lambda</code> арқылы <code>level</code> бағанын қосыңыз: сома 2500 және одан жоғары болса <code>'жоғары'</code>, әйтпесе <code>'төмен'</code>.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\norders['level'] = orders['amount'].apply(lambda x: 'жоғары' if x >= 2500 else 'төмен')\nprint(orders.head())",
   "hints": [
    "<code>orders['amount'].apply(lambda x: 'жоғары' if x &gt;= 2500 else 'төмен')</code>"
   ],
   "check": {
    "tests": "assert 'level' in orders.columns, 'level бағаны жоқ'\nassert orders['level'].tolist() == ['жоғары' if x >= 2500 else 'төмен' for x in orders['amount']], 'level мәндері дұрыс емес: шекара 2500 жоғары деңгейге кіреді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі баған бойынша сұрыптау",
   "prompt": "<p><code>orders</code>-ті алдымен <code>status</code>, сосын <code>amount</code> бойынша (екеуі де өсу ретімен) сұрыптап, <code>res</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nres = orders.sort_values(['status', 'amount'])\nprint(res.head())",
   "hints": [
    "<code>orders.sort_values(['status', 'amount'])</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_r = _o.sort_values(['status', 'amount'])\nassert res['id'].tolist() == _r['id'].tolist(), 'Реті дұрыс емес: алдымен status, сосын amount'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ақпанның үздік үштігі",
   "prompt": "<p>Төленген тапсырыстардың ішінен 2024 жылғы ақпандағы (<code>month == '2024-02'</code>, <code>order_date.str[:7]</code>) сомасы ең үлкен 3 тапсырысты кему ретімен <code>feb_top</code> айнымалысына жазыңыз. Тек <code>id</code> және <code>amount</code> бағандары қалсын.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\npaid = orders[orders['status'] == 'paid'].copy()\npaid['month'] = paid['order_date'].str[:7]\nfeb_top = paid[paid['month'] == '2024-02'].sort_values('amount', ascending=False).head(3)[['id', 'amount']]\nprint(feb_top)",
   "hints": [
    "Алдымен сүзіп, <code>month</code> бағанын қосыңыз.",
    "Сосын <code>sort_values('amount', ascending=False).head(3)</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[(_o['status'] == 'paid') & (_o['order_date'].str[:7] == '2024-02')].sort_values('amount', ascending=False).head(3)\nassert list(feb_top.columns) == ['id', 'amount'], 'Бағандар: id, amount'\nassert feb_top['amount'].tolist() == _p['amount'].tolist(), 'Ақпанның ең үлкен 3 сомасы кему ретімен керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Есепке арналған кесте",
   "prompt": "<p>Төленген тапсырыстардан <code>report</code> кестесін жасаңыз: <code>month</code> бағанын қосыңыз (<code>order_date</code>-тың алғашқы 7 таңбасы), <code>status</code> бағанын жойыңыз, <code>amount</code> атауын <code>revenue</code> деп өзгертіңіз және <code>revenue</code> бойынша кему ретімен сұрыптап, алғашқы 10 жолды қалдырыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nreport = orders[orders['status'] == 'paid'].copy()\nreport['month'] = report['order_date'].str[:7]\nreport = report.drop(columns=['status']).rename(columns={'amount': 'revenue'})\nreport = report.sort_values('revenue', ascending=False).head(10)\nprint(report)",
   "hints": [
    "<code>drop(columns=['status'])</code>, <code>rename(columns={'amount': 'revenue'})</code>",
    "Соңында <code>sort_values('revenue', ascending=False).head(10)</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_r = _o[_o['status'] == 'paid'].sort_values('amount', ascending=False).head(10)\nassert 'status' not in report.columns, 'status бағаны жойылуы керек'\nassert 'revenue' in report.columns and 'amount' not in report.columns, 'amount атауы revenue болуы керек'\nassert 'month' in report.columns and (report['month'] == report['order_date'].str[:7]).all(), 'month = order_date-тың алғашқы 7 таңбасы'\nassert report['revenue'].tolist() == _r['amount'].tolist(), 'Ең үлкен 10 төленген тапсырыс кему ретімен керек'"
   }
  }
 ],
 "pd-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Статус бойынша саны",
   "prompt": "<p>Әр статустағы тапсырыстар санын <code>groupby</code> арқылы <code>by_status</code> Series-іне жазыңыз (<code>id</code> бағанын санаңыз).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nby_status = orders.groupby('status')['id'].count()\nprint(by_status)",
   "hints": [
    "<code>orders.groupby('status')['id'].count()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o.groupby('status')['id'].count()\nassert list(by_status.index) == list(_g.index), 'Индекс статустар болуы керек'\nassert by_status.tolist() == _g.tolist(), 'Сандар дұрыс емес'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Клиенттің жалпы сомасы",
   "prompt": "<p>Әр клиенттің (<code>customer_id</code>) барлық тапсырыстарының сомасын <code>by_cust</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nby_cust = orders.groupby('customer_id')['amount'].sum()\nprint(by_cust.head())",
   "hints": [
    "<code>orders.groupby('customer_id')['amount'].sum()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o.groupby('customer_id')['amount'].sum()\nassert len(by_cust) == len(_g), 'Әр клиентке бір жол керек'\nassert [round(float(v)) for v in by_cust.values] == [round(float(v)) for v in _g.values], 'Сомалар сәйкес емес'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аймақтың жалпы табысы",
   "prompt": "<p><code>daily_sales.csv</code> файлын <code>daily</code> айнымалысына оқып, әр аймақтың (<code>region</code>) жалпы табысын (<code>revenue</code> қосындысы) <code>total_by_region</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv')\ntotal_by_region = daily.groupby('region')['revenue'].sum()\nprint(total_by_region)",
   "hints": [
    "<code>daily.groupby('region')['revenue'].sum()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_g = _d.groupby('region')['revenue'].sum()\nassert list(total_by_region.index) == list(_g.index), 'Индекс аймақтар болуы керек'\nassert total_by_region.tolist() == _g.tolist(), 'Қосындылар сәйкес емес'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Айлық орташа чек",
   "prompt": "<p>Төленген тапсырыстар бойынша әр айдың орташа чегін (<code>amount</code> орташасы) бүтінге дөңгелектеп, <code>avg_month</code> Series-іне жазыңыз. Индексі — ай (<code>order_date</code>-тың алғашқы 7 таңбасы).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\npaid = orders[orders['status'] == 'paid'].copy()\npaid['month'] = paid['order_date'].str[:7]\navg_month = paid.groupby('month')['amount'].mean().round()\nprint(avg_month)",
   "hints": [
    "Алдымен <code>paid</code> сүзіп, <code>month</code> бағанын қосыңыз.",
    "<code>.groupby('month')['amount'].mean().round()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid']\n_m = _p.groupby(_p['order_date'].str[:7])['amount'].mean().round()\nassert [str(i) for i in avg_month.index] == list(_m.index), 'Индекс айлар болуы керек'\nassert [round(float(v)) for v in avg_month.values] == [round(float(v)) for v in _m.values], 'Орташа мәндер сәйкес емес: тек paid тапсырыстар'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Айдағы бірегей клиенттер",
   "prompt": "<p>Әр айда неше түрлі клиент тапсырыс бергенін (<code>nunique</code>) <code>active</code> Series-іне жазыңыз. Индексі — ай (<code>order_date</code>-тың алғашқы 7 таңбасы), барлық тапсырыстар есептеледі.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\norders['month'] = orders['order_date'].str[:7]\nactive = orders.groupby('month')['customer_id'].nunique()\nprint(active)",
   "hints": [
    "<code>.groupby('month')['customer_id'].nunique()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_a = _o.groupby(_o['order_date'].str[:7])['customer_id'].nunique()\nassert [str(i) for i in active.index] == list(_a.index), 'Индекс айлар болуы керек'\nassert active.tolist() == _a.tolist(), 'Бірегей клиенттер саны дұрыс емес: nunique қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ірі клиенттер (HAVING)",
   "prompt": "<p>Төленген тапсырыстар бойынша әр клиенттің табысын (<code>revenue</code>) есептеп, табысы 10 000-нан асатын клиенттерді ғана <code>big_clients</code> DataFrame-іне жазыңыз. Бағандар: <code>customer_id</code>, <code>revenue</code>.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\npaid = orders[orders['status'] == 'paid']\nres = paid.groupby('customer_id').agg(revenue=('amount', 'sum')).reset_index()\nbig_clients = res[res['revenue'] > 10000]\nprint(big_clients)",
   "hints": [
    "<code>.agg(revenue=('amount', 'sum')).reset_index()</code>",
    "Сосын агрегаттан кейін сүзгі: <code>res[res['revenue'] &gt; 10000]</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _o[_o['status'] == 'paid'].groupby('customer_id')['amount'].sum()\n_g = _g[_g > 10000]\nassert 'customer_id' in big_clients.columns and 'revenue' in big_clients.columns, 'Бағандар: customer_id, revenue (reset_index керек)'\nassert sorted(big_clients['customer_id']) == sorted(_g.index), 'Клиенттер тізімі дұрыс емес: тек paid, табыс > 10000'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бірінші және соңғы тапсырыс",
   "prompt": "<p>Әр клиент үшін <code>agg</code> арқылы <code>first</code> (ең ерте <code>order_date</code>), <code>last</code> (ең кеш <code>order_date</code>) және <code>orders</code> (тапсырыс саны) есептеп, <code>life</code> DataFrame-ін жасаңыз. <code>customer_id</code> кәдімгі баған болсын, <code>orders</code> бойынша кему ретімен, тең болса <code>customer_id</code> өсу ретімен сұрыптаңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nlife = orders.groupby('customer_id').agg(first=('order_date', 'min'), last=('order_date', 'max'), orders=('id', 'count')).reset_index()\nlife = life.sort_values(['orders', 'customer_id'], ascending=[False, True])\nprint(life.head())",
   "hints": [
    "<code>first=('order_date', 'min')</code> — мәтін күндер де салыстырылады.",
    "Сұрыптау: <code>sort_values(['orders', 'customer_id'], ascending=[False, True])</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_l = _o.groupby('customer_id').agg(first=('order_date', 'min'), last=('order_date', 'max'), orders=('id', 'count')).reset_index().sort_values(['orders', 'customer_id'], ascending=[False, True])\nassert {'customer_id', 'first', 'last', 'orders'} <= set(life.columns), 'Бағандар: customer_id, first, last, orders'\nassert life['customer_id'].tolist() == _l['customer_id'].tolist(), 'Клиенттер реті дұрыс емес'\nassert life['first'].tolist() == _l['first'].tolist() and life['last'].tolist() == _l['last'].tolist(), 'first/last күндері дұрыс емес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Айлық көрсеткіштер",
   "prompt": "<p>Төленген тапсырыстар бойынша әр айға <code>orders</code> (саны), <code>customers</code> (бірегей клиенттер), <code>revenue</code> (сома) есептеп, <code>monthly</code> DataFrame-ін жасаңыз. Сосын <code>avg_check</code> бағанын қосыңыз: <code>revenue / orders</code>, бүтінге дөңгелектенген. <code>month</code> кәдімгі баған болсын, айлар өсу ретімен.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\npaid = orders[orders['status'] == 'paid'].copy()\npaid['month'] = paid['order_date'].str[:7]\nmonthly = paid.groupby('month').agg(orders=('id', 'count'), customers=('customer_id', 'nunique'), revenue=('amount', 'sum')).reset_index()\nmonthly['avg_check'] = (monthly['revenue'] / monthly['orders']).round()\nprint(monthly)",
   "hints": [
    "<code>.agg(orders=('id', 'count'), customers=('customer_id', 'nunique'), revenue=('amount', 'sum'))</code>",
    "Жаңа баған агрегаттан кейін қосылады."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid'].copy()\n_p['month'] = _p['order_date'].str[:7]\n_m = _p.groupby('month').agg(orders=('id', 'count'), customers=('customer_id', 'nunique'), revenue=('amount', 'sum')).reset_index()\nassert {'month', 'orders', 'customers', 'revenue', 'avg_check'} <= set(monthly.columns), 'Бағандар: month, orders, customers, revenue, avg_check'\nassert [str(m) for m in monthly['month']] == _m['month'].tolist(), 'Айлар өсу ретімен болуы керек'\nassert monthly['orders'].tolist() == _m['orders'].tolist(), 'orders: id санау керек'\nassert monthly['customers'].tolist() == _m['customers'].tolist(), 'customers: nunique қолданыңыз'\nassert [round(float(a)) for a in monthly['avg_check']] == [round(r / n) for r, n in zip(_m['revenue'], _m['orders'])], 'avg_check = revenue / orders'"
   }
  }
 ],
 "pd-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос сомасы жоқ кесте",
   "prompt": "<p><code>amount</code> бос жолдарды <code>dropna</code> арқылы алып тастап, нәтижені <code>no_null</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nno_null = orders.dropna(subset=['amount'])\nprint(len(no_null))",
   "hints": [
    "<code>orders.dropna(subset=['amount'])</code>"
   ],
   "check": {
    "tests": "assert len(no_null) == 144, 'no_null ішінде 144 жол болуы керек'\nassert no_null['amount'].isna().sum() == 0, 'Бос мәндер қалды'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Әр бағандағы бостар",
   "prompt": "<p>Әр бағандағы бос мәндер санын <code>nulls</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nnulls = orders.isna().sum()\nprint(nulls)",
   "hints": [
    "<code>orders.isna().sum()</code>"
   ],
   "check": {
    "tests": "assert isinstance(nulls, pd.Series), 'nulls Series болуы керек'\nassert int(nulls['amount']) == 6 and int(nulls['id']) == 0, 'nulls дұрыс емес: orders.isna().sum()'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қайталанған келулер",
   "prompt": "<p>Мектепке келу журналында бірдей жолдар қайталанған. <code>drop_duplicates</code> арқылы қайталауларды алып, нәтижені <code>uniq</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\n\nvisits = pd.DataFrame({\n    'student': ['Айгерім', 'Нұрлан', 'Айгерім', 'Дана', 'Нұрлан', 'Айгерім'],\n    'day': ['дүйсенбі', 'дүйсенбі', 'дүйсенбі', 'сейсенбі', 'сейсенбі', 'сейсенбі'],\n})\n",
   "solution": "import pandas as pd\n\nvisits = pd.DataFrame({\n    'student': ['Айгерім', 'Нұрлан', 'Айгерім', 'Дана', 'Нұрлан', 'Айгерім'],\n    'day': ['дүйсенбі', 'дүйсенбі', 'дүйсенбі', 'сейсенбі', 'сейсенбі', 'сейсенбі'],\n})\nuniq = visits.drop_duplicates()\nprint(uniq)",
   "hints": [
    "<code>visits.drop_duplicates()</code>"
   ],
   "check": {
    "tests": "assert len(uniq) == 5, 'uniq ішінде 5 жол болуы керек'\nassert not uniq.duplicated().any(), 'Қайталанған жолдар қалды'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Медианамен толтыру",
   "prompt": "<p><code>amount</code> бағанындағы бос мәндерді осы бағанның медианасымен толтырып, нәтижені <code>filled</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nfilled = orders['amount'].fillna(orders['amount'].median())\nprint(filled.isna().sum())",
   "hints": [
    "<code>orders['amount'].median()</code>",
    "<code>.fillna(...)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_f = _o['amount'].fillna(_o['amount'].median())\nassert len(filled) == 150 and filled.isna().sum() == 0, 'filled ішінде бос мән болмауы керек'\nassert abs(float(filled.sum()) - float(_f.sum())) < 0.01, 'Бос орындар медианамен толтырылуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала атауларын тазалау",
   "prompt": "<p><code>shops</code> кестесіндегі <code>city</code> бағанын тазалаңыз: бос орындарды алып, бас әріппен жазыңыз (<code>.str.strip().str.title()</code>). Сосын қанша түрлі қала бар екенін <code>n_cities</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\n\nshops = pd.DataFrame({\n    'city': [' алматы', 'АСТАНА ', 'Алматы', ' шымкент ', 'астана', 'Алматы '],\n    'sales': [120, 95, 80, 60, 110, 75],\n})\n",
   "solution": "import pandas as pd\n\nshops = pd.DataFrame({\n    'city': [' алматы', 'АСТАНА ', 'Алматы', ' шымкент ', 'астана', 'Алматы '],\n    'sales': [120, 95, 80, 60, 110, 75],\n})\nshops['city'] = shops['city'].str.strip().str.title()\nn_cities = shops['city'].nunique()\nprint(shops)\nprint(n_cities)",
   "hints": [
    "<code>shops['city'].str.strip().str.title()</code>",
    "<code>shops['city'].nunique()</code>"
   ],
   "check": {
    "tests": "assert shops['city'].tolist() == ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Астана', 'Алматы'], 'city бағаны тазаланбаған: ' + str(shops['city'].tolist())\nassert n_cities == 3, 'n_cities 3 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шектен тыс сомалар",
   "prompt": "<p>IQR әдісімен <code>amount</code> бағанының жоғарғы шегін (<code>q3 + 1.5 * iqr</code>) <code>upper</code> айнымалысына жазыңыз. Сомасы осы шектен асатын тапсырыстар санын <code>n_out</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nq1, q3 = orders['amount'].quantile([0.25, 0.75])\niqr = q3 - q1\nupper = q3 + 1.5 * iqr\nn_out = (orders['amount'] > upper).sum()\nprint(upper, n_out)",
   "hints": [
    "<code>q1, q3 = orders['amount'].quantile([0.25, 0.75])</code>",
    "<code>(orders['amount'] &gt; upper).sum()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_q1, _q3 = _o['amount'].quantile([0.25, 0.75])\n_u = _q3 + 1.5 * (_q3 - _q1)\nassert abs(float(upper) - float(_u)) < 0.01, 'upper дұрыс емес: q3 + 1.5 * (q3 - q1)'\nassert int(n_out) == int((_o['amount'] > _u).sum()), 'n_out дұрыс емес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тазалау тізбегі",
   "prompt": "<p>Method chaining арқылы <code>clean</code> кестесін жасаңыз: қайталауларды алып тастаңыз, <code>amount</code> бос жолдарды алыңыз, сосын <code>query</code> арқылы тек төленген және сомасы 1000 мен 20 000 аралығындағы (екеуі де қоса) тапсырыстарды қалдырыңыз. Алынған жолдар санын <code>removed</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\nclean = (orders\n    .drop_duplicates()\n    .dropna(subset=['amount'])\n    .query(\"status == 'paid' and amount >= 1000 and amount <= 20000\"))\nremoved = len(orders) - len(clean)\nprint(len(orders), '→', len(clean))",
   "hints": [
    "Тізбек: <code>.drop_duplicates().dropna(subset=[...]).query(...)</code>",
    "<code>removed = len(orders) - len(clean)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _o.drop_duplicates().dropna(subset=['amount'])\n_k = _k[(_k['status'] == 'paid') & (_k['amount'] >= 1000) & (_k['amount'] <= 20000)]\nassert sorted(clean['id']) == sorted(_k['id']), 'clean жолдары дұрыс емес: шарттарды тексеріңіз'\nassert removed == len(_o) - len(_k), 'removed = len(orders) - len(clean)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тазалап, қала бойынша қосу",
   "prompt": "<p><code>sales</code> кестесі лас: қала атаулары әртүрлі жазылған, бір сома бос, бір жол қайталанған. Алдымен <code>city</code> бағанын <code>.str.strip().str.title()</code> арқылы тазалаңыз, сосын қайталауларды және бос сомаларды алып тастаңыз. Соңында әр қаланың сомасын <code>by_city</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\n\nsales = pd.DataFrame({\n    'city': [' Алматы', 'астана', 'Алматы', 'Шымкент', 'астана', 'Алматы', ' Алматы'],\n    'amount': [5200, 3100, None, 2700, 4400, 1800, 5200],\n})\n",
   "solution": "import pandas as pd\n\nsales = pd.DataFrame({\n    'city': [' Алматы', 'астана', 'Алматы', 'Шымкент', 'астана', 'Алматы', ' Алматы'],\n    'amount': [5200, 3100, None, 2700, 4400, 1800, 5200],\n})\nsales['city'] = sales['city'].str.strip().str.title()\nclean = sales.drop_duplicates().dropna(subset=['amount'])\nby_city = clean.groupby('city')['amount'].sum()\nprint(by_city)",
   "hints": [
    "Алдымен қала атауын тазалаңыз: сонда ғана қайталанған жолдар бірдей болады.",
    "<code>.groupby('city')['amount'].sum()</code>"
   ],
   "check": {
    "tests": "assert sorted(by_city.index) == sorted(['Алматы', 'Астана', 'Шымкент']), 'Қалалар: Алматы, Астана, Шымкент'\nassert {k: round(float(v)) for k, v in by_city.items()} == {'Алматы': 7000, 'Астана': 7500, 'Шымкент': 2700}, 'Сомалар дұрыс емес: ' + str(by_city.to_dict())"
   }
  }
 ],
 "pd-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тапсырысқа қала қосу",
   "prompt": "<p><code>orders</code> пен <code>customers</code>-ті <code>customer_id</code> = <code>id</code> бойынша біріктіріп, <code>df</code> айнымалысына жазыңыз. <code>suffixes=('_order', '_customer')</code> қолданыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\ndf = orders.merge(customers, left_on='customer_id', right_on='id', suffixes=('_order', '_customer'))\nprint(df.head())",
   "hints": [
    "<code>orders.merge(customers, left_on='customer_id', right_on='id', suffixes=('_order', '_customer'))</code>"
   ],
   "check": {
    "tests": "assert len(df) == 150, 'Біріктіргеннен кейін 150 жол болуы керек'\nassert {'city', 'channel', 'id_order', 'id_customer'} <= set(df.columns), 'city, channel, id_order, id_customer бағандары керек: suffixes тексеріңіз'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ортақ кілтпен біріктіру",
   "prompt": "<p><code>results</code> пен <code>schools</code> кестелерінде ортақ <code>school_id</code> бағаны бар. Оларды <code>on='school_id'</code> арқылы біріктіріп, <code>df</code> айнымалысына жазыңыз.</p>",
   "starter": "import pandas as pd\n\nschools = pd.DataFrame({'school_id': [1, 2, 3], 'name': ['№8 мектеп', 'БИЛ', 'НЗМ']})\nresults = pd.DataFrame({'school_id': [1, 1, 2, 3, 3, 3], 'score': [98, 105, 120, 131, 118, 125]})\n",
   "solution": "import pandas as pd\n\nschools = pd.DataFrame({'school_id': [1, 2, 3], 'name': ['№8 мектеп', 'БИЛ', 'НЗМ']})\nresults = pd.DataFrame({'school_id': [1, 1, 2, 3, 3, 3], 'score': [98, 105, 120, 131, 118, 125]})\ndf = results.merge(schools, on='school_id')\nprint(df)",
   "hints": [
    "<code>results.merge(schools, on='school_id')</code>"
   ],
   "check": {
    "tests": "assert len(df) == 6, 'df ішінде 6 жол болуы керек'\nassert 'name' in df.columns and 'score' in df.columns, 'name және score бағандары керек'\nassert df[df['name'] == 'НЗМ']['score'].tolist() == [131, 118, 125], 'НЗМ нәтижелері дұрыс емес'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "inner мен left айырмасы",
   "prompt": "<p><code>trips</code> кестесінде <code>drivers</code>-та жоқ жүргізуші бар. <code>driver_id</code> бойынша <code>how='inner'</code> біріктірудегі жолдар санын <code>n_inner</code>, <code>how='left'</code> біріктірудегі жолдар санын <code>n_left</code> айнымалысына жазыңыз (сол жақта <code>trips</code>).</p>",
   "starter": "import pandas as pd\n\ntrips = pd.DataFrame({'trip_id': [1, 2, 3, 4, 5], 'driver_id': [10, 11, 10, 14, 12]})\ndrivers = pd.DataFrame({'driver_id': [10, 11, 12, 13], 'city': ['Алматы', 'Астана', 'Алматы', 'Шымкент']})\n",
   "solution": "import pandas as pd\n\ntrips = pd.DataFrame({'trip_id': [1, 2, 3, 4, 5], 'driver_id': [10, 11, 10, 14, 12]})\ndrivers = pd.DataFrame({'driver_id': [10, 11, 12, 13], 'city': ['Алматы', 'Астана', 'Алматы', 'Шымкент']})\nn_inner = len(trips.merge(drivers, on='driver_id', how='inner'))\nn_left = len(trips.merge(drivers, on='driver_id', how='left'))\nprint(n_inner, n_left)",
   "hints": [
    "<code>len(trips.merge(drivers, on='driver_id', how='inner'))</code>"
   ],
   "check": {
    "tests": "assert n_inner == 4, 'n_inner 4 болуы керек: 14-жүргізуші drivers-та жоқ'\nassert n_left == 5, 'n_left 5 болуы керек: left барлық сапарды сақтайды'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша табыс",
   "prompt": "<p>Таза тапсырыстарды (<code>clean</code> дайын) клиенттермен біріктіріп, әр қаланың табысын кему ретімен <code>by_city</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\nby_city = df.groupby('city')['amount'].sum().sort_values(ascending=False)\nprint(by_city)",
   "hints": [
    "<code>clean.merge(customers, left_on='customer_id', right_on='id')</code>",
    "<code>.groupby('city')['amount'].sum().sort_values(ascending=False)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('city')['amount'].sum().sort_values(ascending=False)\nassert list(by_city.index) == list(_m.index), 'Қалалар реті дұрыс емес: кему ретімен'\nassert [round(float(v)) for v in by_city.values] == [round(float(v)) for v in _m.values], 'Сомалар сәйкес емес'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Наурызда келмегендер",
   "prompt": "<p>2024 жылғы наурызда (<code>order_date</code> <code>'2024-03'</code>-тен басталады) бірде-бір тапсырыс бермеген клиенттердің <code>id</code> тізімін өсу ретімен <code>absent</code> айнымалысына жазыңыз. Нұсқа: клиенттерді наурыз тапсырыстарымен <code>how='left'</code> біріктіріп, тапсырыс жоқ жолдарды (<code>isna</code>) алыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nmarch = orders[orders['order_date'].str[:7] == '2024-03']\ndf = customers.merge(march, left_on='id', right_on='customer_id', how='left', suffixes=('_customer', '_order'))\nabsent = sorted(df[df['id_order'].isna()]['id_customer'].tolist())\nprint(absent)",
   "hints": [
    "Алдымен наурыз тапсырыстарын сүзіңіз.",
    "Біріктіргеннен кейін <code>df[df['id_order'].isna()]</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_m = set(_o[_o['order_date'].str[:7] == '2024-03']['customer_id'])\n_a = sorted(i for i in _c['id'] if i not in _m)\nassert [int(x) for x in absent] == _a, 'absent тізімі дұрыс емес: ' + str(list(absent))"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Арнадағы бірегей клиенттер",
   "prompt": "<p>Таза тапсырыстарды клиенттермен біріктіріп, әр арнадан (<code>channel</code>) неше түрлі клиент сатып алғанын <code>buyers</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\nbuyers = df.groupby('channel')['customer_id'].nunique()\nprint(buyers)",
   "hints": [
    "<code>.groupby('channel')['customer_id'].nunique()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_b = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel')['customer_id'].nunique()\nassert sorted(buyers.index) == sorted(_b.index), 'Индекс арналар болуы керек'\nassert {k: int(v) for k, v in buyers.items()} == {k: int(v) for k, v in _b.items()}, 'Бірегей клиенттер саны дұрыс емес: nunique'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Арналардың табыс үлесі",
   "prompt": "<p>Таза тапсырыстарды клиенттермен біріктіріп, әр арна бойынша <code>orders</code> (саны) және <code>revenue</code> (сома) есептеңіз. <code>share</code> бағанын қосыңыз: арна табысының жалпы табыстағы үлесі, пайызбен, 1 ондық таңбаға дейін. Нәтиже — <code>by_channel</code> DataFrame, <code>channel</code> кәдімгі баған, <code>revenue</code> бойынша кему ретімен.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\nby_channel = df.groupby('channel').agg(orders=('amount', 'count'), revenue=('amount', 'sum')).reset_index()\nby_channel['share'] = (by_channel['revenue'] / by_channel['revenue'].sum() * 100).round(1)\nby_channel = by_channel.sort_values('revenue', ascending=False)\nprint(by_channel)",
   "hints": [
    "<code>.agg(orders=('amount', 'count'), revenue=('amount', 'sum')).reset_index()</code>",
    "<code>by_channel['revenue'] / by_channel['revenue'].sum() * 100</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_g = _clean.merge(_c, left_on='customer_id', right_on='id').groupby('channel').agg(orders=('amount', 'count'), revenue=('amount', 'sum')).reset_index().sort_values('revenue', ascending=False)\nassert {'channel', 'orders', 'revenue', 'share'} <= set(by_channel.columns), 'Бағандар: channel, orders, revenue, share'\nassert by_channel['channel'].tolist() == _g['channel'].tolist(), 'Арналар реті дұрыс емес'\nassert by_channel['orders'].tolist() == _g['orders'].tolist(), 'orders дұрыс емес'\nassert [round(float(s), 1) for s in by_channel['share']] == [round(r / _g['revenue'].sum() * 100, 1) for r in _g['revenue']], 'share = revenue / жалпы табыс * 100'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тіркелу айы бойынша табыс",
   "prompt": "<p>Клиенттерге <code>signup_month</code> бағанын қосыңыз (<code>signup_date</code>-тың алғашқы 7 таңбасы). Таза тапсырыстарды клиенттермен біріктіріп, клиенттің тіркелген айы бойынша табысты <code>by_signup</code> Series-іне жазыңыз (индекс — ай, өсу ретімен).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\ncustomers['signup_month'] = customers['signup_date'].str[:7]\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\nby_signup = df.groupby('signup_month')['amount'].sum()\nprint(by_signup)",
   "hints": [
    "<code>customers['signup_date'].str[:7]</code>",
    "<code>.groupby('signup_month')['amount'].sum()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _c.copy()\n_k['signup_month'] = _k['signup_date'].str[:7]\n_g = _clean.merge(_k, left_on='customer_id', right_on='id').groupby('signup_month')['amount'].sum()\nassert [str(i) for i in by_signup.index] == list(_g.index), 'Индекс тіркелу айлары болуы керек'\nassert [round(float(v)) for v in by_signup.values] == [round(float(v)) for v in _g.values], 'Сомалар сәйкес емес'"
   }
  }
 ],
 "pd-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мәтіннен күнге",
   "prompt": "<p><code>order_date</code> бағанын <code>pd.to_datetime</code> арқылы күн типіне айналдырыңыз (бағанның өзіне қайта жазыңыз).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\norders['order_date'] = pd.to_datetime(orders['order_date'])\nprint(orders.dtypes)",
   "hints": [
    "<code>orders['order_date'] = pd.to_datetime(orders['order_date'])</code>"
   ],
   "check": {
    "tests": "assert str(orders['order_date'].dtype).startswith('datetime64'), 'order_date күн типі (datetime64) болуы керек'\nassert str(orders['order_date'].min())[:10] == '2024-01-01', 'Күндер дұрыс айналмады'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Апта күні",
   "prompt": "<p><code>order_date</code>-ты күнге айналдырып, <code>weekday</code> бағанын қосыңыз: апта күнінің атауы (<code>.dt.day_name()</code>, мысалы <code>'Tuesday'</code>).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\norders['order_date'] = pd.to_datetime(orders['order_date'])\norders['weekday'] = orders['order_date'].dt.day_name()\nprint(orders.head())",
   "hints": [
    "Алдымен <code>pd.to_datetime</code>, сосын <code>.dt.day_name()</code>."
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_w = _pd.to_datetime(_o['order_date']).dt.day_name()\nassert 'weekday' in orders.columns, 'weekday бағаны жоқ'\nassert orders['weekday'].tolist() == _w.tolist(), 'weekday мәндері дұрыс емес'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аймақтың рекорд күні",
   "prompt": "<p><code>daily_sales.csv</code> файлын <code>daily</code> айнымалысына оқып, әр аймақтың ең жоғары күндік табысын <code>best_by_region</code> Series-іне жазыңыз.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv')\nbest_by_region = daily.groupby('region')['revenue'].max()\nprint(best_by_region)",
   "hints": [
    "<code>daily.groupby('region')['revenue'].max()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_g = _d.groupby('region')['revenue'].max()\nassert list(best_by_region.index) == list(_g.index), 'Индекс аймақтар болуы керек'\nassert best_by_region.tolist() == _g.tolist(), 'Максимум мәндері сәйкес емес'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Апта күндері бойынша",
   "prompt": "<p>Төленген тапсырыстар бойынша әр апта күніндегі тапсырыс санын <code>by_wd</code> Series-іне жазыңыз (индекс — <code>.dt.day_name()</code> атаулары).</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\npaid = orders[orders['status'] == 'paid'].copy()\npaid['weekday'] = pd.to_datetime(paid['order_date']).dt.day_name()\nby_wd = paid.groupby('weekday')['id'].count()\nprint(by_wd)",
   "hints": [
    "Сүзгіден кейін <code>.copy()</code>, сосын <code>weekday</code> бағанын қосыңыз.",
    "<code>.groupby('weekday')['id'].count()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_p = _o[_o['status'] == 'paid']\n_g = _p.groupby(_pd.to_datetime(_p['order_date']).dt.day_name())['id'].count()\nassert {str(k): int(v) for k, v in by_wd.items()} == {k: int(v) for k, v in _g.items()}, 'Апта күндері бойынша сандар дұрыс емес: тек paid тапсырыстар'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ай мен статус кестесі",
   "prompt": "<p><code>pivot_table</code> арқылы <code>pt</code> кестесін жасаңыз: жолдар — ай (<code>month</code>, <code>order_date</code>-тың алғашқы 7 таңбасы), бағандар — <code>status</code>, мәндер — тапсырыстар саны (<code>values='id'</code>, <code>aggfunc='count'</code>), бос орындар 0.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\norders['month'] = orders['order_date'].str[:7]\npt = pd.pivot_table(orders, index='month', columns='status', values='id', aggfunc='count', fill_value=0)\nprint(pt)",
   "hints": [
    "<code>pd.pivot_table(orders, index='month', columns='status', values='id', aggfunc='count', fill_value=0)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_k = _o.copy()\n_k['month'] = _k['order_date'].str[:7]\n_p = _pd.pivot_table(_k, index='month', columns='status', values='id', aggfunc='count', fill_value=0)\nassert [str(i) for i in pt.index] == list(_p.index), 'Жолдар айлар болуы керек'\nassert [str(c) for c in pt.columns] == list(_p.columns), 'Бағандар статустар болуы керек'\nassert (pt.values == _p.values).all(), 'Мәндер сәйкес емес: count және fill_value=0'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Күн × аймақ кестесі",
   "prompt": "<p><code>daily_sales.csv</code> файлынан <code>pivot_table</code> арқылы <code>wide</code> кестесін жасаңыз: жолдар — <code>day</code>, бағандар — <code>region</code>, мәндер — <code>revenue</code> қосындысы.</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv')\nwide = pd.pivot_table(daily, index='day', columns='region', values='revenue', aggfunc='sum')\nprint(wide)",
   "hints": [
    "<code>pd.pivot_table(daily, index='day', columns='region', values='revenue', aggfunc='sum')</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_p = _pd.pivot_table(_d, index='day', columns='region', values='revenue', aggfunc='sum')\nassert wide.shape == _p.shape, 'wide өлшемі ' + str(_p.shape) + ' болуы керек'\nassert [str(c) for c in wide.columns] == list(_p.columns), 'Бағандар аймақтар болуы керек'\nassert (wide.values == _p.values).all(), 'Мәндер сәйкес емес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үш күндік жылжымалы орташа",
   "prompt": "<p><code>daily_sales.csv</code> файлын <code>parse_dates=['day']</code> арқылы оқыңыз. Тек Алматы жолдарын алып, <code>day</code>-ді индекс етіңіз және <code>revenue</code> бойынша 3 күндік жылжымалы орташаны <code>roll</code> Series-іне жазыңыз (<code>.rolling(3).mean()</code>).</p>",
   "starter": "import pandas as pd\n\n",
   "solution": "import pandas as pd\n\ndaily = pd.read_csv('daily_sales.csv', parse_dates=['day'])\nalm = daily[daily['region'] == 'Алматы'].set_index('day')\nroll = alm['revenue'].rolling(3).mean()\nprint(roll)",
   "hints": [
    "<code>daily[daily['region'] == 'Алматы'].set_index('day')</code>",
    "<code>['revenue'].rolling(3).mean()</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_d = _pd.read_csv('daily_sales.csv')\n_r = _d[_d['region'] == 'Алматы']['revenue'].rolling(3).mean()\nassert len(roll) == len(_r), 'roll ішінде Алматының әр күні болуы керек'\nassert int(roll.isna().sum()) == 2, 'Алғашқы 2 мән бос (NaN) болуы керек: rolling(3)'\nassert [round(float(v), 2) for v in roll.dropna()] == [round(float(v), 2) for v in _r.dropna()], 'Жылжымалы орташа мәндері сәйкес емес'\nassert str(roll.index.dtype).startswith('datetime64'), 'Индекс day (күн типі) болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Арна × ай клиенттері",
   "prompt": "<p>Таза тапсырыстарды клиенттермен біріктіріп, <code>pt</code> жиынтық кестесін жасаңыз: жолдар — ай (<code>order_date</code>-ты <code>pd.to_datetime</code> арқылы айналдырып, <code>.dt.to_period('M')</code>), бағандар — <code>channel</code>, мәндер — бірегей клиенттер саны (<code>values='customer_id'</code>, <code>aggfunc='nunique'</code>), бос орындар 0.</p>",
   "starter": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\n",
   "solution": "import pandas as pd\norders = pd.read_csv('orders.csv')\ncustomers = pd.read_csv('customers.csv')\nclean = orders[(orders['status'] == 'paid') & orders['amount'].notna() & (orders['amount'] < 20000)].copy()\n\ndf = clean.merge(customers, left_on='customer_id', right_on='id')\ndf['month'] = pd.to_datetime(df['order_date']).dt.to_period('M')\npt = pd.pivot_table(df, index='month', columns='channel', values='customer_id', aggfunc='nunique', fill_value=0)\nprint(pt)",
   "hints": [
    "<code>pd.to_datetime(df['order_date']).dt.to_period('M')</code>",
    "<code>aggfunc='nunique'</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_o = _pd.read_csv('orders.csv')\n_c = _pd.read_csv('customers.csv')\n_clean = _o[(_o['status'] == 'paid') & _o['amount'].notna() & (_o['amount'] < 20000)]\n_d = _clean.merge(_c, left_on='customer_id', right_on='id')\n_d['month'] = _d['order_date'].str[:7]\n_p = _pd.pivot_table(_d, index='month', columns='channel', values='customer_id', aggfunc='nunique', fill_value=0)\nassert [str(i) for i in pt.index] == list(_p.index), 'Жолдар айлар болуы керек (2024-01 ... 2024-06)'\nassert [str(c) for c in pt.columns] == list(_p.columns), 'Бағандар арналар болуы керек'\nassert (pt.values == _p.values).all(), 'Мәндер сәйкес емес: nunique және fill_value=0'"
   }
  }
 ],
 "pd-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Апталық орташа температура",
   "prompt": "<p>Апта температурасынан <code>t</code> NumPy массивін жасап, орташасын <code>avg</code> айнымалысына жазыңыз.</p>",
   "starter": "import numpy as np\n\ntemps = [-4, -1, 2, 5, 3, 0, -2]\n",
   "solution": "import numpy as np\n\ntemps = [-4, -1, 2, 5, 3, 0, -2]\nt = np.array(temps)\navg = t.mean()\nprint(avg)",
   "hints": [
    "<code>np.array(temps)</code>, сосын <code>.mean()</code>."
   ],
   "check": {
    "tests": "assert isinstance(t, np.ndarray), 't NumPy массиві болуы керек: np.array(temps)'\nassert abs(avg - 3 / 7) < 1e-9, 'avg дұрыс емес: t.mean()'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бағаны долларға",
   "prompt": "<p><code>prices</code> массивіндегі теңге бағаларын долларға айналдырыңыз (500-ге бөліп), <code>np.round(..., 2)</code> арқылы дөңгелектеп, <code>usd</code> массивіне жазыңыз. Цикл қолданбаңыз.</p>",
   "starter": "import numpy as np\n\nprices = np.array([12500, 4990, 350000, 780])\n",
   "solution": "import numpy as np\n\nprices = np.array([12500, 4990, 350000, 780])\nusd = np.round(prices / 500, 2)\nprint(usd)",
   "hints": [
    "<code>np.round(prices / 500, 2)</code>"
   ],
   "check": {
    "tests": "assert isinstance(usd, np.ndarray), 'usd NumPy массиві болуы керек'\nassert usd.tolist() == [25.0, 9.98, 700.0, 1.56], 'usd дұрыс емес: ' + str(usd.tolist())"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Оң температуралар",
   "prompt": "<p>Маска арқылы <code>t</code> массивінен тек 0-ден жоғары мәндерді <code>warm</code> массивіне алыңыз.</p>",
   "starter": "import numpy as np\n\nt = np.array([-6, 2, 0, 7, -1, 4])\n",
   "solution": "import numpy as np\n\nt = np.array([-6, 2, 0, 7, -1, 4])\nwarm = t[t > 0]\nprint(warm)",
   "hints": [
    "<code>t[t &gt; 0]</code>"
   ],
   "check": {
    "tests": "assert warm.tolist() == [2, 7, 4], 'warm [2, 7, 4] болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сынақ нәтижесі белгісі",
   "prompt": "<p><code>np.where</code> арқылы <code>scores</code> массивіндегі әр ұпайға белгі қойыңыз: 50 және жоғары — <code>'өтті'</code>, әйтпесе <code>'құлады'</code>. Нәтиже — <code>labels</code>. Өткендер санын <code>n_pass</code> айнымалысына жазыңыз.</p>",
   "starter": "import numpy as np\n\nscores = np.array([72, 45, 50, 88, 31, 64])\n",
   "solution": "import numpy as np\n\nscores = np.array([72, 45, 50, 88, 31, 64])\nlabels = np.where(scores >= 50, 'өтті', 'құлады')\nn_pass = (scores >= 50).sum()\nprint(labels, n_pass)",
   "hints": [
    "<code>np.where(scores &gt;= 50, 'өтті', 'құлады')</code>",
    "<code>(scores &gt;= 50).sum()</code> True мәндерін санайды."
   ],
   "check": {
    "tests": "assert labels.tolist() == ['өтті', 'құлады', 'өтті', 'өтті', 'құлады', 'өтті'], 'labels дұрыс емес: ' + str(labels.tolist())\nassert int(n_pass) == 4, 'n_pass 4 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жоспарға жеткен күн",
   "prompt": "<p>Кофеханның күндік табысы (мың теңге) берілген. <code>np.cumsum</code> арқылы жинақталған табысты <code>cum</code> массивіне жазыңыз. Жинақ алғаш рет 1000-ға жеткен (немесе асқан) күннің нөмірін (1-ден бастап) <code>day</code> айнымалысына жазыңыз: <code>(cum &gt;= 1000).argmax() + 1</code>.</p>",
   "starter": "import numpy as np\n\ndaily = np.array([180, 210, 160, 240, 190, 230, 200])\n",
   "solution": "import numpy as np\n\ndaily = np.array([180, 210, 160, 240, 190, 230, 200])\ncum = np.cumsum(daily)\nday = (cum >= 1000).argmax() + 1\nprint(cum, day)",
   "hints": [
    "<code>np.cumsum(daily)</code>",
    "True/False массивінде <code>argmax()</code> бірінші True орнын береді."
   ],
   "check": {
    "tests": "assert cum.tolist() == [180, 390, 550, 790, 980, 1210, 1410], 'cum дұрыс емес: np.cumsum'\nassert int(day) == 6, 'day 6 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жеткізу уақытының перцентилі",
   "prompt": "<p>Жеткізу уақыттары (минут) берілген. 90-перцентильді <code>p90</code>, медиананы <code>med</code> айнымалысына жазыңыз.</p>",
   "starter": "import numpy as np\n\ntimes = np.array([25, 32, 28, 41, 30, 55, 27, 35, 29, 90])\n",
   "solution": "import numpy as np\n\ntimes = np.array([25, 32, 28, 41, 30, 55, 27, 35, 29, 90])\np90 = np.percentile(times, 90)\nmed = np.median(times)\nprint(p90, med)",
   "hints": [
    "<code>np.percentile(times, 90)</code>",
    "<code>np.median(times)</code>"
   ],
   "check": {
    "tests": "assert abs(p90 - 58.5) < 1e-9, 'p90 58.5 болуы керек: np.percentile(times, 90)'\nassert med == 31.0, 'med 31.0 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең ыстық күн",
   "prompt": "<p><code>days</code> тізімі мен <code>t</code> массиві берілген. Ең ыстық күннің атауын <code>argmax</code> арқылы <code>hottest</code> айнымалысына жазыңыз. Температурасы апталық орташадан жоғары күндер санын <code>n_above</code> айнымалысына жазыңыз.</p>",
   "starter": "import numpy as np\n\ndays = ['дс', 'сс', 'ср', 'бс', 'жм', 'сб', 'жс']\nt = np.array([27, 31, 34, 29, 36, 33, 25])\n",
   "solution": "import numpy as np\n\ndays = ['дс', 'сс', 'ср', 'бс', 'жм', 'сб', 'жс']\nt = np.array([27, 31, 34, 29, 36, 33, 25])\nhottest = days[t.argmax()]\nn_above = (t > t.mean()).sum()\nprint(hottest, n_above)",
   "hints": [
    "<code>t.argmax()</code> орынды береді, атауы: <code>days[...]</code>.",
    "<code>(t &gt; t.mean()).sum()</code>"
   ],
   "check": {
    "tests": "assert hottest == 'жм', 'hottest \\'жм\\' болуы керек'\nassert int(n_above) == 4, 'n_above 4 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Z-ұпаймен шектен тыс",
   "prompt": "<p>Такси сапарларының бағасы берілген. Әр мәннің z-ұпайын есептеңіз: <code>z = (a - a.mean()) / a.std()</code>. Модулі 2-ден үлкен (<code>(z &gt; 2) | (z &lt; -2)</code>) бағаларды <code>outliers</code> массивіне, қалғандарының орташасын 1 ондық таңбаға дейін дөңгелектеп <code>clean_mean</code> айнымалысына жазыңыз.</p>",
   "starter": "import numpy as np\n\na = np.array([1800, 2100, 1950, 2300, 2050, 1700, 9800, 2200, 1900, 2000])\n",
   "solution": "import numpy as np\n\na = np.array([1800, 2100, 1950, 2300, 2050, 1700, 9800, 2200, 1900, 2000])\nz = (a - a.mean()) / a.std()\nmask = (z > 2) | (z < -2)\noutliers = a[mask]\nclean_mean = round(a[~mask].mean(), 1)\nprint(outliers, clean_mean)",
   "hints": [
    "Маска: <code>mask = (z &gt; 2) | (z &lt; -2)</code>",
    "Қалғандары: <code>a[~mask]</code> немесе <code>a[(z &lt;= 2) &amp; (z &gt;= -2)]</code>."
   ],
   "check": {
    "tests": "assert outliers.tolist() == [9800], 'outliers [9800] болуы керек'\nassert abs(clean_mean - 2000.0) < 0.05, 'clean_mean 2000.0 болуы керек'"
   }
  }
 ]
});
