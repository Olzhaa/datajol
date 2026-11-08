// dscapstone practice tasks: Russian text. Code, solutions and checks are in content/practice/dscapstone.js.
DJ.i18n.patch({ lessons: {
 "dc-1": {
  "pr": [
   {
    "title": "Упущенная выручка",
    "prompt": "<p>Сколько выручки компания теряет из-за ушедших абонентов? Функция <code>lost_revenue(n_churn, fee, months)</code> должна вернуть <code>n_churn × fee × months</code>.</p><p>Например, <code>lost_revenue(10, 6500, 12)</code> → <code>780000</code> ₸.</p>",
    "hints": [
     "Произведение трёх чисел."
    ],
    "check": {
     "tests": "assert lost_revenue(10, 6500, 12) == 780000, 'lost_revenue(10, 6500, 12) должна вернуть 780000'\nassert lost_revenue(0, 6500, 12) == 0, 'Если никто не ушёл: 0'\nassert lost_revenue(155, 3500, 6) == 3255000, 'lost_revenue(155, 3500, 6) = 3 255 000'"
    }
   },
   {
    "title": "Прибыль кампании",
    "prompt": "<p>Кампания удержания: каждый правильно удержанный уходящий (TP) даёт +10 000 ₸, каждое напрасно отправленное предложение (FP) стоит −2 000 ₸. Функция <code>campaign_profit(tp, fp)</code> должна вернуть общую прибыль.</p><p>Например, <code>campaign_profit(5, 10)</code> → <code>30000</code>.</p>",
    "hints": [
     "<code>10000 * tp - 2000 * fp</code>"
    ],
    "check": {
     "tests": "assert campaign_profit(5, 10) == 30000, 'campaign_profit(5, 10) должна вернуть 30000'\nassert campaign_profit(0, 3) == -6000, 'Если есть только FP, прибыль отрицательная: −6000'\nassert campaign_profit(39, 111) == 168000, 'Отправить всем: 39 × 10000 − 111 × 2000 = 168000'"
    }
   },
   {
    "title": "Матрица стоимости",
    "prompt": "<p>Даны confusion matrix <code>cm = [[tn, fp], [fn, tp]]</code> и матрица стоимостей <code>costs</code> той же формы. Функция <code>total_cost(cm, costs)</code> должна вернуть сумму произведений соответствующих элементов.</p><p>Например, <code>total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]])</code> → <code>80000</code>.</p>",
    "hints": [
     "Поэлементное умножение в NumPy: <code>np.asarray(cm) * np.asarray(costs)</code>"
    ],
    "check": {
     "tests": "assert total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]]) == 80000, 'total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]]) = 10×2000 + 5×12000 = 80000'\nassert total_cost([[50, 0], [0, 50]], [[0, 2000], [12000, 0]]) == 0, 'Модель без ошибок: 0'\nassert total_cost([[1, 1], [1, 1]], [[1, 2], [3, 4]]) == 10, 'Все элементы: 1 + 2 + 3 + 4 = 10'"
    }
   },
   {
    "title": "Кому отправить предложение",
    "prompt": "<p>Ожидаемая прибыль от предложения: <code>p × SAVE × LOST − OFFER</code>. Функция <code>worth_offer(probs, save, lost, offer)</code> должна вернуть список <b>индексов</b> абонентов, у которых ожидаемая прибыль положительна.</p><p>Например, <code>worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000)</code> → <code>[1, 2, 3]</code>.</p>",
    "hints": [
     "<code>enumerate(probs)</code> даёт индекс и значение.",
     "Условие: <code>p * save * lost - offer &gt; 0</code>"
    ],
    "check": {
     "tests": "assert worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000) == [1, 2, 3], 'worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000) должна вернуть [1, 2, 3] (0.2 × 12000 = 2400 > 2000)'\nassert worth_offer([0.1, 0.15], 0.3, 40000, 2000) == [], 'Если у всех прибыль отрицательна: пустой список'\nassert worth_offer([0.3, 0.3], 0.5, 20000, 3000) == [], 'Если прибыль ровно 0, не отправляем: > 0'"
    }
   },
   {
    "title": "Годовые потери",
    "prompt": "<p>Сколько годовых платежей принесли бы уходящие абоненты из данных (<code>churned == 1</code>)? <code>lost_year</code> = сумма их <code>monthly_fee × 12</code> (₸). Среднюю годовую оплату одного ушедшего запишите в <code>avg_lost</code>.</p>",
    "hints": [
     "Фильтр: <code>df[df['churned'] == 1]</code>",
     "<code>(churners['monthly_fee'] * 12).sum()</code>"
    ],
    "check": {
     "tests": "_c = df[df['churned'] == 1]\nassert int(lost_year) == int((_c['monthly_fee'] * 12).sum()), f\"lost_year должно быть {int((_c['monthly_fee'] * 12).sum())} ₸\"\nassert abs(avg_lost - (_c['monthly_fee'] * 12).mean()) < 1e-6, 'avg_lost = lost_year / количество ушедших'"
    }
   },
   {
    "title": "Потери по тарифам",
    "prompt": "<p>Сколько годовых доходов теряет каждый тариф из-за ушедших: Series <code>lost_by_plan</code> (индекс — тариф, значение — сумма <code>monthly_fee × 12</code>). Тариф с самыми большими потерями запишите в <code>biggest_plan</code>.</p>",
    "hints": [
     "<code>(churners['monthly_fee'] * 12).groupby(churners['plan']).sum()</code>"
    ],
    "check": {
     "tests": "_c = df[df['churned'] == 1]\n_l = (_c['monthly_fee'] * 12).groupby(_c['plan']).sum()\nassert isinstance(lost_by_plan, pd.Series) and set(lost_by_plan.index) == {'basic', 'standard', 'premium'}, 'lost_by_plan — Series по трём тарифам'\nassert all(int(lost_by_plan[_p]) == int(_l[_p]) for _p in _l.index), 'Значения неверны: только ушедшие, monthly_fee × 12'\nassert biggest_plan == _l.idxmax(), f'biggest_plan должно быть {_l.idxmax()}'"
    }
   },
   {
    "title": "Сравнение стратегий",
    "prompt": "<p>Функция <code>compare(probs, y, gain, offer)</code> должна вернуть словарь с реальной прибылью трёх стратегий. Прибыль по каждому абоненту, которому отправлено предложение: <code>y × gain − offer</code>.</p><ul><li><code>'none'</code> — никому не отправлять (0);</li><li><code>'all'</code> — всем;</li><li><code>'model'</code> — только тем, у кого <code>p × gain − offer &gt; 0</code>.</li></ul><p>Например, <code>compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000)['model']</code> → <code>6000</code>.</p>",
    "hints": [
     "Один цикл: <code>for p, t in zip(probs, y):</code>",
     "Реальная прибыль <code>t * gain - offer</code>, а выбор — по <code>p * gain - offer &gt; 0</code>."
    ],
    "check": {
     "tests": "_r = compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000)\nassert isinstance(_r, dict) and set(_r) == {'none', 'all', 'model'}, \"Ключи: 'none', 'all', 'model'\"\nassert _r == {'none': 0, 'all': 4000, 'model': 6000}, \"compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000) → {'none': 0, 'all': 4000, 'model': 6000}\"\n_q = compare([0.05, 0.1], [0, 1], 10000, 2000)\nassert _q['model'] == 0 and _q['all'] == 6000, 'Если ожидаемая прибыль никого не положительна, model = 0'"
    }
   },
   {
    "title": "Анализ чувствительности",
    "prompt": "<p>Как меняется решение, если меняется цена предложения? <code>SAVE = 0.3</code>, <code>LOST = 40000</code>. Для <code>OFFER</code> ∈ [1000, 2000, 4000] запишите в словарь <code>sens</code> в виде <code>{offer: (breakeven, n_targets)}</code> порог нулевой прибыли (<code>OFFER / (SAVE × LOST)</code>, 4 знака) и количество вероятностей в <code>probs</code>, которые выше него.</p>",
    "hints": [
     "<code>round(offer / (SAVE * LOST), 4)</code>",
     "<code>(probs &gt; be).sum()</code>"
    ],
    "check": {
     "tests": "assert sorted(sens) == [1000, 2000, 4000], 'Ключи sens: 1000, 2000, 4000'\nassert sens[1000] == (0.0833, 8), 'OFFER = 1000: порог 0.0833, 8 абонентов'\nassert sens[2000] == (0.1667, 5), 'OFFER = 2000: порог 0.1667, 5 абонентов'\nassert sens[4000] == (0.3333, 3), 'OFFER = 4000: порог 0.3333, 3 абонента'"
    }
   }
  ]
 },
 "dc-2": {
  "pr": [
   {
    "title": "Доля пропусков",
    "prompt": "<p>Запишите <b>долю</b> пустых значений в каждом столбце в Series <code>miss_share</code> (<code>isna().mean()</code>). Столбец с самой большой долей запишите в <code>worst_col</code>.</p>",
    "hints": [
     "<code>df.isna().mean()</code> — доля True в каждом столбце."
    ],
    "check": {
     "tests": "assert isinstance(miss_share, pd.Series) and len(miss_share) == 10, 'miss_share — Series по 10 столбцам'\nassert abs(miss_share['age'] - 25 / 600) < 1e-9 and abs(miss_share['data_gb'] - 17 / 600) < 1e-9, 'Для age 25/600, для data_gb 17/600'\nassert worst_col == 'age', 'Больше всего пропусков у age'"
    }
   },
   {
    "title": "Количество по городам",
    "prompt": "<p>Количество абонентов в каждом городе запишите в <code>city_counts</code> (<code>value_counts()</code>), город с наибольшим числом абонентов — в <code>top_city</code>, его долю — в <code>top_share</code>.</p>",
    "hints": [
     "<code>df['city'].value_counts()</code>"
    ],
    "check": {
     "tests": "_v = df['city'].value_counts()\nassert int(city_counts.sum()) == 600 and len(city_counts) == 5, 'city_counts — 5 городов, сумма 600'\nassert top_city == _v.idxmax(), f'top_city должно быть {_v.idxmax()}'\nassert abs(top_share - _v.max() / 600) < 1e-9, 'top_share = наибольшее количество / 600'"
    }
   },
   {
    "title": "Диапазон платежей",
    "prompt": "<p>Запишите наименьшее значение столбца <code>monthly_fee</code> в <code>fee_min</code>, наибольшее — в <code>fee_max</code>, медиану — в <code>fee_median</code>.</p>",
    "hints": [
     "<code>.min()</code>, <code>.max()</code>, <code>.median()</code>"
    ],
    "check": {
     "tests": "assert fee_min == df['monthly_fee'].min() and fee_max == df['monthly_fee'].max(), 'fee_min, fee_max — min() и max()'\nassert fee_median == df['monthly_fee'].median(), 'fee_median — median()'\nassert fee_min == 3300 and fee_max == 11200, 'Платежи от 3 300 ₸ до 11 200 ₸'"
    }
   },
   {
    "title": "Повторяющиеся строки",
    "prompt": "<p>Проверьте качество данных: количество повторов в <code>customer_id</code> запишите в <code>n_dup_ids</code>, количество полностью повторяющихся строк — в <code>n_dup_rows</code> (<code>duplicated().sum()</code>). Затем намеренно добавьте одну строку дважды (<code>df2</code>) и найдите <code>n_dup_rows2</code>.</p>",
    "hints": [
     "<code>df['customer_id'].duplicated().sum()</code>",
     "<code>pd.concat([df, df.iloc[[0]]], ignore_index=True)</code>"
    ],
    "check": {
     "tests": "assert n_dup_ids == 0 and n_dup_rows == 0, 'В исходных данных повторов нет: 0 и 0'\nassert len(df2) == 601, 'В df2 должно быть 601 строка'\nassert n_dup_rows2 == 1, 'В df2 одна повторяющаяся строка'"
    }
   },
   {
    "title": "Тариф и диапазон платежей",
    "prompt": "<p>Запишите диапазон платежей каждого тарифа в DataFrame <code>fee_range</code> (<code>groupby('plan')['monthly_fee'].agg(['min', 'max'])</code>). Пересекаются ли диапазоны: отсортируйте по <code>min</code>, и если <code>max</code> одного тарифа больше или равен <code>min</code> следующего, то <code>overlap = True</code>.</p>",
    "hints": [
     "<code>.agg(['min', 'max']).sort_values('min')</code>",
     "Сравнение соседей: <code>max[:-1] &gt;= min[1:]</code>"
    ],
    "check": {
     "tests": "assert isinstance(fee_range, pd.DataFrame) and {'min', 'max'} <= set(fee_range.columns) and len(fee_range) == 3, 'fee_range — таблица из 3 строк со столбцами min, max'\nassert fee_range.loc['basic', 'max'] == 3700 and fee_range.loc['premium', 'min'] == 10800, 'basic max = 3700, premium min = 10800'\nassert overlap is False, 'Платежи тарифов не пересекаются: overlap = False'"
    }
   },
   {
    "title": "Churn при пустом возрасте",
    "prompt": "<p>Пропуски случайны? Запишите долю ушедших среди абонентов с пустым возрастом в <code>rate_missing</code>, а среди тех, у кого возраст известен, — в <code>rate_known</code>. Количество абонентов с пустым возрастом запишите в <code>n_missing_age</code>.</p>",
    "hints": [
     "Маска: <code>miss = df['age'].isna()</code>",
     "Наоборот: <code>~miss</code>"
    ],
    "check": {
     "tests": "_m = df['age'].isna()\nassert n_missing_age == 25, 'n_missing_age = 25'\nassert abs(rate_missing - df.loc[_m, 'churned'].mean()) < 1e-9, 'rate_missing — среднее churned по строкам с пустым age'\nassert abs(rate_known - df.loc[~_m, 'churned'].mean()) < 1e-9, 'rate_known — среднее по строкам с известным age (знак ~)'"
    }
   },
   {
    "title": "Отчёт о качестве данных",
    "prompt": "<p>Функция <code>health_report(data)</code> должна вернуть словарь для любого DataFrame: <code>'rows'</code>, <code>'cols'</code>, <code>'missing_total'</code> (все пустые значения), <code>'dup_rows'</code> (полностью повторяющиеся строки), <code>'worst_col'</code> (столбец с наибольшим числом пустых значений, если пустых значений нет, то <code>None</code>).</p>",
    "hints": [
     "<code>miss = data.isna().sum()</code>",
     "<code>miss.idxmax() if miss.sum() &gt; 0 else None</code>"
    ],
    "check": {
     "tests": "_r = health_report(df)\nassert isinstance(_r, dict) and set(_r) == {'rows', 'cols', 'missing_total', 'dup_rows', 'worst_col'}, 'Ключи: rows, cols, missing_total, dup_rows, worst_col'\nassert (_r['rows'], _r['cols'], _r['missing_total'], _r['dup_rows'], _r['worst_col']) == (600, 10, 42, 0, 'age'), 'Для churn: 600, 10, 42, 0, age'\n_t = pd.DataFrame({'a': [1, 1, 2], 'b': ['x', 'x', 'y']})\nassert health_report(_t) == {'rows': 3, 'cols': 2, 'missing_total': 0, 'dup_rows': 1, 'worst_col': None}, 'В таблице без пустых значений worst_col = None, повторяющихся строк 1'"
    }
   },
   {
    "title": "Выбросы IQR",
    "prompt": "<p>Найдите выбросы в столбце <code>data_gb</code> по правилу IQR: <code>q1</code>, <code>q3</code> (<code>quantile</code>), <code>iqr = q3 − q1</code>; границы <code>[q1 − 1.5·iqr, q3 + 1.5·iqr]</code>. Количество значений вне границ запишите в <code>n_outliers</code>, а долю среди них тарифа premium — в <code>premium_share</code>.</p>",
    "hints": [
     "<code>df['data_gb'].quantile(0.25)</code>",
     "Два условия: <code>(a &lt; low) | (a &gt; high)</code>"
    ],
    "check": {
     "tests": "_q1, _q3 = df['data_gb'].quantile(0.25), df['data_gb'].quantile(0.75)\n_i = _q3 - _q1\n_o = df[(df['data_gb'] < _q1 - 1.5 * _i) | (df['data_gb'] > _q3 + 1.5 * _i)]\nassert abs(q1 - _q1) < 1e-9 and abs(q3 - _q3) < 1e-9, 'q1, q3 — квантили 0.25 и 0.75'\nassert n_outliers == len(_o), f'n_outliers должно быть {len(_o)}'\nassert abs(premium_share - (_o['plan'] == 'premium').mean()) < 1e-9, 'premium_share — доля premium среди выбросов'"
    }
   }
  ]
 },
 "dc-3": {
  "pr": [
   {
    "title": "Доля договоров",
    "prompt": "<p>Запишите в Series <code>contract_by_plan</code> долю абонентов с договором в каждом тарифе. Тариф с самой низкой долей запишите в <code>least_plan</code>.</p>",
    "hints": [
     "<code>df.groupby('plan')['has_contract'].mean()</code>",
     "<code>.idxmin()</code>"
    ]
   },
   {
    "title": "Churn по числу звонков",
    "prompt": "<p>Для каждого значения <code>support_calls</code> запишите долю churn в <code>by_calls</code>, а количество абонентов — в <code>n_by_calls</code>. Среди групп с не менее чем 30 абонентами найдите число звонков с самой высокой долей churn и запишите его в <code>worst_calls</code>.</p>",
    "hints": [
     "<code>.size()</code> даёт размер группы.",
     "Фильтр: <code>by_calls[n_by_calls &gt;= 30]</code>"
    ],
    "check": {
     "tests": "_g = df.groupby('support_calls')['churned']\nassert all(abs(by_calls[_k] - _g.mean()[_k]) < 1e-9 for _k in _g.mean().index), 'by_calls — среднее churned по числу звонков'\nassert all(int(n_by_calls[_k]) == int(_g.size()[_k]) for _k in _g.size().index), 'n_by_calls — количество абонентов в каждой группе'\nassert worst_calls == 4, 'Самая рискованная из групп с не менее 30 абонентами — 4 звонка'"
    }
   },
   {
    "title": "Возрастные группы",
    "prompt": "<p>С помощью <code>pd.cut</code> создайте столбец <code>age_band</code>: границы <code>[17, 30, 45, 65]</code>, метки <code>'18-30'</code>, <code>'31-45'</code>, <code>'46-65'</code>. Долю churn в каждой группе запишите в <code>by_age</code> (<code>observed=True</code>). Абоненты с пустым возрастом в группы не попадают.</p>",
    "hints": [
     "<code>pd.cut(df['age'], bins=[17, 30, 45, 65], labels=[...])</code>",
     "<code>groupby('age_band', observed=True)</code>"
    ],
    "check": {
     "tests": "_b = pd.cut(df['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\n_g = df['churned'].groupby(_b, observed=True).mean()\nassert 'age_band' in df.columns, 'Добавьте в df столбец age_band'\nassert [str(_i) for _i in by_age.index] == ['18-30', '31-45', '46-65'], 'Группы: 18-30, 31-45, 46-65'\nassert all(abs(by_age.values - _g.values) < 1e-9), 'Доли churn неверны: границы [17, 30, 45, 65]'"
    }
   },
   {
    "title": "Срок и договор",
    "prompt": "<p>Столбец <code>band</code> готов. Через <code>pivot_table</code> создайте таблицу <code>pivot</code>: строки — <code>band</code>, столбцы — <code>has_contract</code>, значения — среднее <code>churned</code> (<code>observed=True</code>). Долю ушедших у самой новой группы без договора (0-12, has_contract = 0) запишите в <code>new_no_contract</code>.</p>",
    "hints": [
     "<code>df.pivot_table(index='band', columns='has_contract', values='churned', aggfunc='mean', observed=True)</code>"
    ],
    "check": {
     "tests": "_p = df.pivot_table(index='band', columns='has_contract', values='churned', aggfunc='mean', observed=True)\nassert isinstance(pivot, pd.DataFrame) and pivot.shape == (4, 2), 'Форма pivot (4, 2): 4 группы × договор 0/1'\nassert (abs(pivot.values - _p.values) < 1e-9).all(), \"Значения неверны: index='band', columns='has_contract', values='churned'\"\nassert abs(new_no_contract - _p.loc['0-12', 0]) < 1e-9 and new_no_contract > 0.5, \"new_no_contract = pivot.loc['0-12', 0]\""
    }
   },
   {
    "title": "Город и тариф",
    "prompt": "<p>Запишите таблицу доли churn по городу и тарифу в <code>city_plan</code> (<code>pivot_table</code>, строки — <code>city</code>, столбцы — <code>plan</code>). Ячейку с самой высокой долей запишите в <code>worst_cell</code> в виде кортежа <code>(қала, тариф)</code>.</p>",
    "hints": [
     "<code>city_plan.stack()</code> превращает таблицу в Series с индексом (город, тариф).",
     "Затем <code>.idxmax()</code>"
    ],
    "check": {
     "tests": "_p = df.pivot_table(index='city', columns='plan', values='churned', aggfunc='mean')\nassert isinstance(city_plan, pd.DataFrame) and city_plan.shape == (5, 3), 'Форма city_plan (5, 3)'\nassert tuple(worst_cell) == tuple(_p.stack().idxmax()), f'worst_cell = {_p.stack().idxmax()} должно быть'"
    }
   },
   {
    "title": "Группа риска",
    "prompt": "<p>Три признака вместе: новые (<code>tenure_months &lt;= 12</code>), часто звонящие (<code>support_calls &gt;= 3</code>) и без договора (<code>has_contract == 0</code>). Количество таких абонентов запишите в <code>n_risky</code>, их долю churn — в <code>risky_rate</code>. Во сколько раз она выше общей доли — <code>times</code>.</p>",
    "hints": [
     "Возьмите каждое условие в скобки: <code>(a) &amp; (b) &amp; (c)</code>"
    ],
    "check": {
     "tests": "_r = df[(df['tenure_months'] <= 12) & (df['support_calls'] >= 3) & (df['has_contract'] == 0)]\nassert n_risky == len(_r), f'n_risky должно быть {len(_r)}: три условия через &'\nassert abs(risky_rate - _r['churned'].mean()) < 1e-9, 'risky_rate — среднее churned в группе'\nassert abs(times - _r['churned'].mean() / df['churned'].mean()) < 1e-9 and times > 2, 'times = risky_rate / общая доля'"
    }
   },
   {
    "title": "Расчёт lift",
    "prompt": "<p>Lift — во сколько раз доля churn в группе выше общей доли. Создайте Series <code>lift</code> по <code>band</code> (<code>observed=True</code>). Группу с самым высоким lift запишите в <code>top_band</code>, группы с lift меньше 1 — в список <code>safe_bands</code>.</p>",
    "hints": [
     "<code>df.groupby('band', observed=True)['churned'].mean() / overall</code>",
     "Фильтр: <code>lift[lift &lt; 1].index</code>"
    ],
    "check": {
     "tests": "_l = df.groupby('band', observed=True)['churned'].mean() / df['churned'].mean()\nassert isinstance(lift, pd.Series) and len(lift) == 4 and all(abs(lift.values - _l.values) < 1e-9), 'lift = доля группы / общая доля'\nassert str(top_band) == str(_l.idxmax()), f'top_band должно быть {_l.idxmax()}'\nassert sorted(str(_b) for _b in safe_bands) == sorted(str(_b) for _b in _l[_l < 1].index), f'safe_bands = {[str(_b) for _b in _l[_l < 1].index]}'"
    }
   },
   {
    "title": "Базовое правило",
    "prompt": "<p>Простое правило из EDA: «если <code>tenure_months &lt;= 12</code> <b>или</b> <code>support_calls &gt;= 3</code>, абонент уйдёт». На всех данных создайте <code>flag</code> (0/1), без sklearn подсчитайте TP, FP, FN и вычислите <code>rule_precision</code> и <code>rule_recall</code>.</p>",
    "hints": [
     "«Или»: <code>(a) | (b)</code>",
     "TP: <code>((flag == 1) &amp; (yt == 1)).sum()</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import precision_score as _ps, recall_score as _rs\n_f = ((df['tenure_months'] <= 12) | (df['support_calls'] >= 3)).astype(int)\nassert len(flag) == 600 and int(flag.sum()) == int(_f.sum()), 'flag: tenure_months <= 12 ИЛИ support_calls >= 3 (знак |)'\nassert abs(rule_precision - _ps(df['churned'], _f)) < 1e-9, 'rule_precision = tp / (tp + fp)'\nassert abs(rule_recall - _rs(df['churned'], _f)) < 1e-9, 'rule_recall = tp / (tp + fn)'"
    }
   }
  ]
 },
 "dc-4": {
  "pr": [
   {
    "title": "Проверка долей",
    "prompt": "<p>Разбиение готово. Запишите долю churn в train в <code>train_rate</code>, в test — в <code>test_rate</code>, а количество уходящих в test — в <code>n_test_churn</code>.</p>",
    "hints": [
     "<code>y_test.sum()</code> — количество единиц."
    ],
    "check": {
     "tests": "assert abs(train_rate - y_train.mean()) < 1e-9 and abs(test_rate - y_test.mean()) < 1e-9, 'Доли: y_train.mean(), y_test.mean()'\nassert n_test_churn == 39, 'В test 39 уходящих'\nassert abs(train_rate - test_rate) < 0.01, 'stratify=y: доли близки друг к другу'"
    }
   },
   {
    "title": "Случайный baseline",
    "prompt": "<p><code>DummyClassifier(strategy='stratified', random_state=0)</code> случайно предсказывает классы по их долям. Обучите его на train под именем <code>dummy</code> и на test вычислите <code>acc_strat</code> и <code>rec_strat</code>.</p>",
    "hints": [
     "<code>DummyClassifier(strategy='stratified', random_state=0).fit(X_train, y_train)</code>"
    ],
    "check": {
     "tests": "from sklearn.dummy import DummyClassifier as _D\n_p = _D(strategy='stratified', random_state=0).fit(X_train, y_train).predict(X_test)\nassert isinstance(dummy, DummyClassifier) and dummy.strategy == 'stratified', \"dummy — strategy='stratified'\"\nassert abs(acc_strat - (_p == y_test.values).mean()) < 1e-9, 'acc_strat неверно: random_state=0'\nassert abs(rec_strat - _p[y_test.values == 1].mean()) < 1e-9, 'rec_strat неверно'"
    }
   },
   {
    "title": "AUC prior baseline",
    "prompt": "<p><code>DummyClassifier(strategy='prior')</code> даёт каждому абоненту одинаковую вероятность (долю в train). Обучите его на train, вероятности на test запишите в <code>p_prior</code>, ROC AUC — в <code>auc_prior</code>. Почему 0.5?</p>",
    "hints": [
     "<code>dummy.predict_proba(X_test)[:, 1]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nassert len(p_prior) == 150 and _np.allclose(p_prior, y_train.mean()), 'p_prior — одинаково для всех: y_train.mean()'\nassert abs(auc_prior - 0.5) < 1e-9, 'Одинаковые оценки не различают абонентов: AUC = 0.5'"
    }
   },
   {
    "title": "Правило на test",
    "prompt": "<p>Проверьте на test правило «<code>tenure_months &lt;= 12</code> → уйдёт»: <code>pred_rule</code> (0/1), <code>rec_rule</code>, <code>prec_rule</code>.</p>",
    "hints": [
     "<code>(X_test['tenure_months'] &lt;= 12).astype(int)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import recall_score as _rs, precision_score as _ps\n_r = (X_test['tenure_months'] <= 12).astype(int)\nassert len(pred_rule) == 150 and int(pred_rule.sum()) == int(_r.sum()), 'pred_rule: tenure_months <= 12 на X_test'\nassert abs(rec_rule - _rs(y_test, _r)) < 1e-9 and abs(prec_rule - _ps(y_test, _r)) < 1e-9, 'rec_rule, prec_rule: recall_score, precision_score (y_test, pred_rule)'"
    }
   },
   {
    "title": "Модель с одним признаком",
    "prompt": "<p>Сильный baseline: <code>LogisticRegression()</code> только с признаком <code>tenure_months</code>. Обучите его на train под именем <code>one</code> и запишите ROC AUC на test в <code>auc_one</code>.</p>",
    "hints": [
     "<code>X_train[['tenure_months']]</code> (двойные скобки)",
     "<code>roc_auc_score(y_test, one.predict_proba(...)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert one.n_features_in_ == 1, 'one — только один признак: tenure_months'\n_a = _ra(y_test, -X_test['tenure_months'])\nassert abs(auc_one - _a) < 1e-9, f'auc_one ≈ {_a:.3f}: при одном признаке AUC зависит только от порядка'"
    }
   },
   {
    "title": "Таблица baseline",
    "prompt": "<p>Для презентации создайте таблицу baseline: DataFrame <code>baselines</code>, индекс — <code>'majority'</code> (всем 0) и <code>'rule'</code> (<code>tenure_months &lt;= 12</code>), столбцы — <code>accuracy</code>, <code>recall</code>, <code>precision</code> (на test, <code>zero_division=0</code>).</p>",
    "hints": [
     "Из словаря словарей: <code>pd.DataFrame(rows).T</code>",
     "<code>precision_score(..., zero_division=0)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import accuracy_score as _as, recall_score as _rs, precision_score as _ps\n_r = (X_test['tenure_months'] <= 12).astype(int)\nassert isinstance(baselines, pd.DataFrame) and set(baselines.index) == {'majority', 'rule'}, \"Индекс: 'majority', 'rule'\"\nassert {'accuracy', 'recall', 'precision'} <= set(baselines.columns), 'Столбцы: accuracy, recall, precision'\nassert abs(baselines.loc['majority', 'accuracy'] - 0.74) < 1e-9 and baselines.loc['majority', 'recall'] == 0 and baselines.loc['majority', 'precision'] == 0, 'majority: accuracy 0.74, recall 0, precision 0'\nassert abs(baselines.loc['rule', 'recall'] - _rs(y_test, _r)) < 1e-9 and abs(baselines.loc['rule', 'precision'] - _ps(y_test, _r)) < 1e-9 and abs(baselines.loc['rule', 'accuracy'] - _as(y_test, _r)) < 1e-9, 'Строка rule неверна'"
    }
   },
   {
    "title": "Обучение правила на train",
    "prompt": "<p>Выберите порог правила по данным. Для <code>k</code> ∈ <code>range(3, 49, 3)</code> запишите F1 правила «<code>tenure_months &lt;= k</code>» на <b>train</b> в <code>f1_by_k</code> (<code>f1_score</code>). Найдите лучшее <code>best_k</code> и запишите F1 этого правила на test в <code>test_f1</code>.</p>",
    "hints": [
     "Цикл: <code>for k in range(3, 49, 3):</code>",
     "Выбор на train, оценка на test один раз."
    ],
    "check": {
     "tests": "from sklearn.metrics import f1_score as _f1\n_r = {_k: _f1(y_train, (X_train['tenure_months'] <= _k).astype(int)) for _k in range(3, 49, 3)}\n_b = max(_r, key=_r.get)\nassert sorted(f1_by_k) == list(range(3, 49, 3)), 'Ключи: 3, 6, ..., 48'\nassert all(abs(f1_by_k[_k] - _r[_k]) < 1e-9 for _k in _r), 'Значения F1 неверны: только по train-данным'\nassert best_k == _b, f'best_k = {_b} должно быть'\nassert abs(test_f1 - _f1(y_test, (X_test['tenure_months'] <= _b).astype(int))) < 1e-9, 'test_f1 — F1 на test при выбранном k'"
    }
   },
   {
    "title": "Влияние разбиения",
    "prompt": "<p>Насколько test AUC одного baseline (<code>LogisticRegression()</code>, только <code>tenure_months</code>) зависит от разбиения? Для <code>random_state</code> = 0…4 (<code>test_size=0.25</code>, <code>stratify=y</code>) запишите test AUC в список <code>aucs</code>. Среднее — в <code>auc_mean</code>, SD (<code>np.std</code>) — в <code>auc_std</code>.</p>",
    "hints": [
     "На каждом шаге новое разбиение и новая модель.",
     "<code>np.mean</code>, <code>np.std</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.metrics import roc_auc_score as _ra\nfrom sklearn.model_selection import train_test_split as _tts\n_a = []\nfor _rs in range(5):\n    _x1, _x2, _y1, _y2 = _tts(X[['tenure_months']], y, test_size=0.25, stratify=y, random_state=_rs)\n    _a.append(_ra(_y2, -_x2['tenure_months']))\nassert len(aucs) == 5 and _np.allclose(aucs, _a), 'Значения AUC неверны: random_state = 0, 1, 2, 3, 4'\nassert abs(auc_mean - _np.mean(_a)) < 1e-9 and abs(auc_std - _np.std(_a)) < 1e-9, 'auc_mean = np.mean(aucs), auc_std = np.std(aucs)'"
    }
   }
  ]
 },
 "dc-5": {
  "pr": [
   {
    "title": "Точность Pipeline",
    "prompt": "<p><code>pre</code> готов. Создайте <code>pipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])</code> и обучите на train. Запишите test accuracy в <code>acc_lr</code>.</p>",
    "hints": [
     "<code>pipe.fit(X_train, y_train)</code>",
     "<code>pipe.score(X_test, y_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nassert isinstance(pipe, _P) and hasattr(pipe.named_steps['model'], 'coef_'), \"pipe — обученный Pipeline, шаги 'pre' и 'model'\"\nassert abs(acc_lr - pipe.score(X_test, y_test)) < 1e-9 and 0.7 < acc_lr < 0.9, 'acc_lr = pipe.score(X_test, y_test)'"
    }
   },
   {
    "title": "Названия признаков",
    "prompt": "<p>Pipeline <code>pipe</code> обучен. Запишите названия признаков, которые выдаёт шаг <code>pre</code>, в список <code>names</code> (<code>named_steps['pre'].get_feature_names_out()</code>). Их количество запишите в <code>n_features</code>.</p>",
    "hints": [
     "<code>pipe.named_steps['pre']</code>"
    ],
    "check": {
     "tests": "assert n_features == 9, 'n_features = 9: 6 числовых + 3 тарифа'\nassert list(names) == list(pipe.named_steps['pre'].get_feature_names_out()), 'names — результат get_feature_names_out()'\nassert 'cat__plan_premium' in names, 'Столбцы тарифа называются cat__plan_...'"
    }
   },
   {
    "title": "Обзор вероятностей",
    "prompt": "<p><code>proba</code> готов. Наименьшую и наибольшую вероятность запишите в <code>p_min</code> и <code>p_max</code>, количество вероятностей выше 0.5 или равных ему — в <code>n_high</code>. <code>n_high</code> должно равняться <code>pipe.predict(X_test).sum()</code>.</p>",
    "hints": [
     "<code>(proba &gt;= 0.5).sum()</code>"
    ],
    "check": {
     "tests": "assert abs(p_min - proba.min()) < 1e-12 and abs(p_max - proba.max()) < 1e-12, 'p_min, p_max — proba.min(), proba.max()'\nassert n_high == int(pipe.predict(X_test).sum()), 'n_high = (proba >= 0.5).sum(): predict использует порог 0.5'"
    }
   },
   {
    "title": "Балансирующий вес",
    "prompt": "<p>Второй Pipeline <code>pipe_bal</code>: тот же <code>pre</code> + <code>LogisticRegression(max_iter=1000, class_weight='balanced')</code>. Запишите test recall в <code>rec_plain</code> (для <code>pipe</code>) и <code>rec_bal</code>, количество предупреждений — в <code>n_plain</code> и <code>n_bal</code>.</p>",
    "hints": [
     "Новый Pipeline с тем же <code>pre</code>.",
     "<code>recall_score(y_test, model.predict(X_test))</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import recall_score as _rs\n_b = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\nassert pipe_bal.named_steps['model'].class_weight == 'balanced', \"В pipe_bal должно быть class_weight='balanced'\"\nassert abs(rec_bal - _rs(y_test, _b.predict(X_test))) < 1e-9 and abs(rec_plain - _rs(y_test, pipe.predict(X_test))) < 1e-9, 'Значения recall неверны'\nassert n_bal == int(_b.predict(X_test).sum()) and n_bal > n_plain, 'Сбалансированная модель выдаёт больше предупреждений'\nassert rec_bal > rec_plain, 'У сбалансированной модели recall выше'"
    }
   },
   {
    "title": "Сила регуляризации",
    "prompt": "<p><code>C</code> — обратное значение регуляризации (малое C — сильное ограничение). Для <code>C</code> ∈ [0.01, 1, 100] обучите Pipeline (<code>pre</code> + <code>LogisticRegression(C=C, max_iter=1000)</code>), запишите test AUC в <code>auc_by_C</code>, а сумму модулей коэффициентов — в <code>coef_size</code>.</p>",
    "hints": [
     "Цикл: <code>for C in [0.01, 1, 100]:</code>",
     "<code>abs(m.named_steps['model'].coef_).sum()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _LR(C=0.01, max_iter=1000))]).fit(X_train, y_train)\nassert sorted(auc_by_C) == [0.01, 1, 100] and sorted(coef_size) == [0.01, 1, 100], 'Ключи: 0.01, 1, 100'\nassert abs(auc_by_C[0.01] - _ra(y_test, _m.predict_proba(X_test)[:, 1])) < 1e-6, 'Для C=0.01 AUC неверен'\nassert abs(coef_size[0.01] - abs(_m.named_steps['model'].coef_).sum()) < 1e-6, 'coef_size = abs(coef_).sum()'\nassert coef_size[0.01] < coef_size[1] < coef_size[100], 'При уменьшении C коэффициенты уменьшаются'"
    }
   },
   {
    "title": "Город как признак",
    "prompt": "<p>Помогает ли модели город? Создайте <code>X2 = df[num + ['plan', 'city']]</code> и разбейте с теми же параметрами (<code>test_size=0.25</code>, <code>stratify=y</code>, <code>random_state=0</code>). По <code>cat2 = ['plan', 'city']</code> постройте новый <code>pre2</code> и Pipeline, а test AUC запишите в <code>auc_city</code>. AUC исходной модели — <code>auc_base</code>.</p>",
    "hints": [
     "Разбиение будет таким же: тот же <code>y</code>, <code>stratify</code>, <code>random_state</code>.",
     "Передайте в новый ColumnTransformer <code>['plan', 'city']</code>."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\nfrom sklearn.model_selection import train_test_split as _tts\n_a, _b, _c, _d = _tts(df[num + ['plan', 'city']], y, test_size=0.25, stratify=y, random_state=0)\n_m = _Pl([('pre', _pre(['plan', 'city'])), ('model', _LR(max_iter=1000))]).fit(_a, _c)\n_ac = _ra(_d, _m.predict_proba(_b)[:, 1])\nassert abs(auc_base - _ra(y_test, proba)) < 1e-9, 'auc_base — test AUC исходного pipe'\nassert abs(auc_city - _ac) < 1e-6, f'auc_city ≈ {_ac:.4f}: cat2 = [\"plan\", \"city\"], разбиение то же'"
    }
   },
   {
    "title": "Проверка калибровки",
    "prompt": "<p>Можно ли верить вероятностям? На test разбейте <code>proba</code> на группы через <code>pd.cut</code>: границы <code>[0, 0.1, 0.2, 0.4, 0.6, 1]</code>. DataFrame <code>calib</code>: индекс — группа, столбцы <code>mean_proba</code> (средняя вероятность в группе), <code>churn_rate</code> (реальная доля), <code>n</code> (количество абонентов). Используйте <code>observed=True</code>.</p>",
    "hints": [
     "Сначала таблица: <code>pd.DataFrame({'proba': proba, 'y': y_test.values})</code>",
     "Именованная агрегация: <code>.agg(mean_proba=('proba', 'mean'), ...)</code>"
    ],
    "check": {
     "tests": "_t = pd.DataFrame({'proba': proba, 'y': y_test.values})\n_t['bin'] = pd.cut(_t['proba'], bins=[0, 0.1, 0.2, 0.4, 0.6, 1])\n_g = _t.groupby('bin', observed=True).agg(mean_proba=('proba', 'mean'), churn_rate=('y', 'mean'), n=('y', 'size'))\nassert isinstance(calib, pd.DataFrame) and {'mean_proba', 'churn_rate', 'n'} <= set(calib.columns), 'Столбцы calib: mean_proba, churn_rate, n'\nassert len(calib) == len(_g) and int(calib['n'].sum()) == 150, 'Все 150 абонентов test должны попасть в группы'\nassert (abs(calib['mean_proba'].values - _g['mean_proba'].values) < 1e-9).all() and (abs(calib['churn_rate'].values - _g['churn_rate'].values) < 1e-9).all(), 'Значения неверны: границы [0, 0.1, 0.2, 0.4, 0.6, 1]'\nassert calib['churn_rate'].iloc[-1] > calib['churn_rate'].iloc[0], 'В группе с высокой вероятностью реальная доля тоже высокая'"
    }
   },
   {
    "title": "Соответствие CV и test",
    "prompt": "<p>На train вычислите 5-fold ROC AUC <code>pipe</code> (<code>cross_val_score</code>), среднее запишите в <code>cv_mean</code>, SD — в <code>cv_std</code>. Test AUC — <code>test_auc</code>. Попадает ли результат на test в интервал <code>cv_mean ± 2·cv_std</code> — <code>consistent</code> (bool).</p>",
    "hints": [
     "<code>cross_val_score(pipe, X_train, y_train, cv=5, scoring='roc_auc')</code>",
     "<code>bool(abs(a - b) &lt;= 2 * s)</code>"
    ]
   }
  ]
 },
 "dc-6": {
  "pr": [
   {
    "title": "Pipeline с лесом",
    "prompt": "<p>Pipeline <code>rf</code> готов (50 деревьев). Обучите его на train и запишите test ROC AUC в <code>auc_rf</code>.</p>",
    "hints": [
     "<code>rf.predict_proba(X_test)[:, 1]</code>"
    ],
    "check": {
     "tests": "assert hasattr(rf.named_steps['model'], 'estimators_'), 'rf не обучен: rf.fit(X_train, y_train)'\nassert abs(auc_rf - roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])) < 1e-9 and 0.7 < auc_rf < 0.9, 'auc_rf — test AUC по predict_proba'"
    }
   },
   {
    "title": "Что считает важным лес",
    "prompt": "<p>Модель <code>rf</code> обучена. Запишите <code>feature_importances_</code> с названиями признаков (<code>get_feature_names_out()</code> из <code>pre</code>) в Series <code>imp</code> по убыванию. Самый важный признак запишите в <code>top</code>.</p>",
    "hints": [
     "<code>rf.named_steps['model'].feature_importances_</code>"
    ],
    "check": {
     "tests": "_i = pd.Series(rf.named_steps['model'].feature_importances_, index=rf.named_steps['pre'].get_feature_names_out())\nassert isinstance(imp, pd.Series) and len(imp) == 9, 'imp — Series по 9 признакам'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Отсортируйте по убыванию'\nassert top == _i.idxmax(), f'top = {_i.idxmax()} должно быть'"
    }
   },
   {
    "title": "CV баллы леса",
    "prompt": "<p>Запишите 3-fold ROC AUC <code>rf</code> на train в <code>scores</code>, среднее — в <code>cv_mean</code>.</p>",
    "hints": [
     "<code>cross_val_score(rf, X_train, y_train, cv=3, scoring='roc_auc')</code>"
    ]
   },
   {
    "title": "Сетка размера листа",
    "prompt": "<p>Обучите на train <code>GridSearchCV(rf, {'model__min_samples_leaf': [1, 5, 20]}, cv=3, scoring='roc_auc')</code> под именем <code>grid</code>. Лучшее значение запишите в <code>best_leaf</code>, CV AUC — в <code>best_auc</code>, test AUC (<code>grid.score</code>) — в <code>test_auc</code>.</p>",
    "hints": [
     "Имя параметра: <code>'model__min_samples_leaf'</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_') and len(grid.cv_results_['params']) == 3, 'grid — обученный GridSearchCV по 3 значениям'\nassert grid.scoring == 'roc_auc', \"Укажите scoring='roc_auc'\"\nassert best_leaf == grid.best_params_['model__min_samples_leaf'] and abs(best_auc - grid.best_score_) < 1e-12, 'best_leaf, best_auc — лучший результат grid'\nassert abs(test_auc - grid.score(X_test, y_test)) < 1e-9, 'test_auc = grid.score(X_test, y_test)'"
    }
   },
   {
    "title": "Сравнение с бустингом",
    "prompt": "<p>Третий кандидат: <code>pre</code> + <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code>. Средние 3-fold ROC AUC на train для него и для логистического Pipeline запишите в <code>cv_hgb</code> и <code>cv_lr</code>. Лучший — в <code>better</code>: <code>'boosting'</code> или <code>'logreg'</code>.</p>",
    "hints": [
     "Оба Pipeline начинаются с <code>pre</code>.",
     "<code>cross_val_score(..., cv=3, scoring='roc_auc').mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_l = _cvs(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X_train, y_train, cv=3, scoring='roc_auc').mean()\nassert abs(cv_lr - _l) < 1e-6, f\"cv_lr ≈ {_l:.4f}: cv=3, scoring='roc_auc', X_train\"\nassert 0.7 < cv_hgb < 0.9, f'cv_hgb ≈ 0.78, у вас {cv_hgb:.3f}'\nassert better == ('boosting' if cv_hgb > cv_lr else 'logreg'), \"better: 'boosting' или 'logreg'\""
    }
   },
   {
    "title": "Стабильность леса",
    "prompt": "<p>Насколько результат леса зависит от случайности? Для <code>random_state</code> ∈ [0, 1, 2] обучите <code>pre</code> + <code>RandomForestClassifier(n_estimators=50, random_state=rs)</code> и запишите test AUC в список <code>aucs</code>. <code>spread = max(aucs) - min(aucs)</code>.</p>",
    "hints": [
     "Цикл: <code>for rs in [0, 1, 2]:</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _RF(n_estimators=50, random_state=1))]).fit(X_train, y_train)\nassert len(aucs) == 3, 'В aucs 3 значения'\nassert abs(aucs[1] - _ra(y_test, _m.predict_proba(X_test)[:, 1])) < 1e-9, 'AUC для random_state=1 неверен (порядок: 0, 1, 2)'\nassert abs(spread - (max(aucs) - min(aucs))) < 1e-12 and spread > 0, 'spread = max(aucs) - min(aucs)'"
    }
   },
   {
    "title": "Таблица трёх моделей",
    "prompt": "<p>Таблица выбора моделей <code>table</code>: индекс — <code>'logreg'</code>, <code>'forest'</code> (50 деревьев, <code>random_state=0</code>), <code>'boosting'</code> (<code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code>); столбцы — <code>cv_auc</code> (3-fold на train) и <code>test_auc</code>. Выбор только по CV: <code>chosen</code> — модель с самым высоким <code>cv_auc</code>.</p>",
    "hints": [
     "Словарь моделей и цикл; каждую модель поместите в новый Pipeline.",
     "<code>pd.DataFrame(rows).T</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\n_l = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\nassert isinstance(table, pd.DataFrame) and set(table.index) == {'logreg', 'forest', 'boosting'}, \"Индекс: 'logreg', 'forest', 'boosting'\"\nassert {'cv_auc', 'test_auc'} <= set(table.columns), 'Столбцы: cv_auc, test_auc'\nassert abs(table.loc['logreg', 'test_auc'] - _ra(y_test, _l.predict_proba(X_test)[:, 1])) < 1e-6, 'logreg test_auc неверен'\nassert ((table['cv_auc'] > 0.7) & (table['cv_auc'] < 0.9)).all(), 'Значения cv_auc в диапазоне 0.7–0.9'\nassert chosen == table['cv_auc'].idxmax(), 'chosen — модель с самым высоким cv_auc (не выбирайте по test)'"
    }
   },
   {
    "title": "Признак переобучения",
    "prompt": "<p>Глубокий лес запоминает train. Для <code>max_depth</code> ∈ [3, None] и Pipeline <code>pre</code> + <code>RandomForestClassifier(n_estimators=50, max_depth=d, random_state=0)</code> запишите разницу train AUC и test AUC в словарь <code>gaps</code> (ключ — <code>d</code>), а test AUC — в <code>test_aucs</code>.</p>",
    "hints": [
     "Train AUC: <code>roc_auc_score(y_train, m.predict_proba(X_train)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _RF(n_estimators=50, max_depth=None, random_state=0))]).fit(X_train, y_train)\n_g = _ra(y_train, _m.predict_proba(X_train)[:, 1]) - _ra(y_test, _m.predict_proba(X_test)[:, 1])\nassert set(gaps) == {3, None} and set(test_aucs) == {3, None}, 'Ключи: 3, None'\nassert abs(gaps[None] - _g) < 1e-9, f'Для max_depth=None разница ≈ {_g:.3f}: train AUC − test AUC'\nassert gaps[None] > gaps[3], 'У глубокого леса разница train/test больше'"
    }
   }
  ]
 },
 "dc-7": {
  "pr": [
   {
    "title": "Стоимость одного предложения",
    "prompt": "<p>Ожидаемая прибыль от предложения абоненту с вероятностью ухода <code>p</code>: <code>p × 10000 − (1 − p) × 2000</code> (TP +10 000 ₸, FP −2 000 ₸). Напишите функцию <code>offer_value(p)</code>.</p><p>Например, <code>offer_value(0.5)</code> → <code>4000</code>.</p>",
    "hints": [
     "<code>p * 10000 - (1 - p) * 2000</code>"
    ],
    "check": {
     "tests": "assert offer_value(0.5) is not None and abs(offer_value(0.5) - 4000) < 1e-9, 'offer_value(0.5) должна вернуть 4000'\nassert abs(offer_value(0)) - 2000 < 1e-9 and offer_value(0) < 0, 'p = 0: −2000'\nassert abs(offer_value(1 / 6)) < 1e-9, 'Точка нулевой прибыли: p = 1/6 ≈ 0.167'"
    }
   },
   {
    "title": "Число предложений по порогу",
    "prompt": "<p><code>proba</code> готов. Количество абонентов, которым отправляется предложение при пороге 0.3, запишите в <code>n_offers</code>, а количество реальных уходящих среди них — в <code>n_hits</code>.</p>",
    "hints": [
     "Маска: <code>flag = proba &gt;= 0.3</code>",
     "<code>y_test.values[flag].sum()</code>"
    ],
    "check": {
     "tests": "_f = proba >= 0.3\nassert n_offers == int(_f.sum()), f'n_offers = {int(_f.sum())} должно быть'\nassert n_hits == int(y_test.values[_f].sum()), f'n_hits = {int(y_test.values[_f].sum())} должно быть: уходящие среди получивших предложение'"
    }
   },
   {
    "title": "Прибыль трёх порогов",
    "prompt": "<p>Функция <code>profit</code> и <code>proba</code> готовы. Для порогов ∈ [0.2, 0.3, 0.5] запишите прибыль на test в словарь <code>profits</code>.</p>",
    "hints": [
     "<code>profit(y_test, (proba &gt;= t).astype(int))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert sorted(profits) == [0.2, 0.3, 0.5], 'Ключи: 0.2, 0.3, 0.5'\nassert all(profits[_t] == _profit(y_test, (proba >= _t).astype(int)) for _t in profits), 'Прибыль неверна: profit(y_test, (proba >= t).astype(int))'"
    }
   },
   {
    "title": "Ожидаемая и реальная прибыль",
    "prompt": "<p>Решение по вероятности: предложение только тем абонентам, у кого ожидаемая прибыль положительна (<code>proba × 10000 − (1 − proba) × 2000 &gt; 0</code>). Сумму ожидаемой прибыли по ним запишите в <code>expected</code>, реальную прибыль на test (<code>profit</code>) — в <code>realized</code>.</p>",
    "hints": [
     "<code>ev = proba * 10000 - (1 - proba) * 2000</code>",
     "<code>profit(y_test, (ev &gt; 0).astype(int))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_ev = proba * 10000 - (1 - proba) * 2000\nassert abs(expected - _ev[_ev > 0].sum()) < 1e-6, 'expected — сумма положительных ожидаемых прибылей'\nassert realized == _profit(y_test, (_ev > 0).astype(int)), 'realized — реальная прибыль при отправке этим абонентам'"
    }
   },
   {
    "title": "Бюджет: 40 предложений",
    "prompt": "<p>Бюджета хватает только на 40 предложений. Запишите в <code>profit_top40</code> прибыль при отправке предложений 40 абонентам на test с самой высокой вероятностью. Для сравнения прибыль при пороге 0.5 — <code>profit_05</code>.</p>",
    "hints": [
     "<code>np.argsort(-proba)[:40]</code> — 40 самых высоких индексов.",
     "Создайте массив 0/1 и поставьте 1 на эти индексы."
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_s = _np.zeros(len(proba), dtype=int)\n_s[_np.argsort(-proba)[:40]] = 1\nassert profit_top40 == _profit(y_test, _s), f'profit_top40 = {_profit(y_test, _s)} ₸ должно быть: 40 самых высоких вероятностей'\nassert profit_05 == _profit(y_test, (proba >= 0.5).astype(int)), 'profit_05 — прибыль при пороге 0.5'"
    }
   },
   {
    "title": "Таблица порогов",
    "prompt": "<p>Таблица для презентации: DataFrame <code>table</code>, индекс — порог <code>[0.1, 0.2, 0.3, 0.4, 0.5]</code>, столбцы <code>offers</code> (количество предложений), <code>hits</code> (удержанные уходящие), <code>profit</code> (₸). Порог с самой большой прибылью запишите в <code>best_row</code>.</p>",
    "hints": [
     "Список словарей → <code>pd.DataFrame(rows).set_index('threshold')</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert isinstance(table, pd.DataFrame) and [round(float(_i), 2) for _i in table.index] == [0.1, 0.2, 0.3, 0.4, 0.5], 'Индекс — пороги: 0.1, ..., 0.5'\nassert {'offers', 'hits', 'profit'} <= set(table.columns), 'Столбцы: offers, hits, profit'\nfor _t in [0.1, 0.2, 0.3, 0.4, 0.5]:\n    _pr = (proba >= _t).astype(int)\n    _row = table.loc[[_i for _i in table.index if abs(float(_i) - _t) < 1e-9][0]]\n    assert int(_row['offers']) == int(_pr.sum()) and int(_row['hits']) == int(((_pr == 1) & (y_test.values == 1)).sum()) and int(_row['profit']) == _profit(y_test, _pr), f'Строка порога {_t} неверна'\nassert abs(float(best_row) - float(table['profit'].idxmax())) < 1e-9, 'best_row — порог с самой большой прибылью'"
    }
   },
   {
    "title": "Выбор порога по CV",
    "prompt": "<p>Выбирать порог по test — обман. Получите честные вероятности на train через <code>cross_val_predict(pipe, X_train, y_train, cv=5, method='predict_proba')[:, 1]</code> и запишите их в <code>p_tr</code>. Из порогов <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) выберите порог <code>cv_th</code> с самой большой прибылью на <b>train</b>. Затем запишите прибыль на test при этом пороге в <code>test_profit</code>.</p>",
    "hints": [
     "<code>cross_val_predict(..., method='predict_proba')[:, 1]</code>",
     "<code>np.argmax(train_profits)</code> — позиция лучшего порога."
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nfrom sklearn.model_selection import cross_val_predict as _cvp\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\n_pt = _cvp(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X_train, y_train, cv=5, method='predict_proba')[:, 1]\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_ps = [_profit(y_train, (_pt >= _t).astype(int)) for _t in _ths]\n_ct = _ths[int(_np.argmax(_ps))]\nassert len(p_tr) == 450, 'p_tr — CV-вероятности для 450 абонентов train'\nassert cv_th is not None and abs(cv_th - _ct) < 1e-9, f'cv_th = {_ct} должно быть: порог с самой большой прибылью на train'\nassert test_profit == _profit(y_test, (proba >= _ct).astype(int)), 'test_profit — прибыль на test при пороге cv_th'"
    }
   },
   {
    "title": "Влияние цены предложения",
    "prompt": "<p>Как меняется порог, если предложение дорожает? Напишите функцию <code>profit_c(y_true, y_pred, cost)</code> (TP +10 000, FP −<code>cost</code>). Для <code>cost</code> ∈ [1000, 2000, 4000] запишите в <code>best_th_by_cost</code> порог из <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) с самой большой прибылью на test (при равенстве — наименьший).</p>",
    "hints": [
     "Скопируйте функцию <code>profit</code> и замените 2000 на <code>cost</code>.",
     "<code>ths[int(np.argmax(ps))]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert profit_c([1, 0, 1], [1, 1, 1], 3000) == 17000, 'profit_c([1, 0, 1], [1, 1, 1], 3000) = 2 × 10000 − 3000 = 17000'\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_b = {_c: _ths[int(_np.argmax([_profit(y_test, (proba >= _t).astype(int), 10000, _c) for _t in _ths]))] for _c in [1000, 2000, 4000]}\nassert sorted(best_th_by_cost) == [1000, 2000, 4000], 'Ключи: 1000, 2000, 4000'\nassert all(abs(best_th_by_cost[_c] - _b[_c]) < 1e-9 for _c in _b), f'Пороги: {_b}'\nassert best_th_by_cost[1000] <= best_th_by_cost[4000], 'Если предложение дорожает, порог повышается'"
    }
   }
  ]
 },
 "dc-8": {
  "pr": [
   {
    "title": "Коэффициент контракта",
    "prompt": "<p><code>pipe</code> обучен. Запишите коэффициенты с названиями признаков в Series <code>coefs</code>. Коэффициент <code>num__has_contract</code> запишите в <code>contract_coef</code>: если он отрицательный, договор снижает риск ухода.</p>",
    "hints": [
     "<code>pipe.named_steps['model'].coef_[0]</code>"
    ],
    "check": {
     "tests": "_c = pd.Series(pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nassert isinstance(coefs, pd.Series) and len(coefs) == 9 and list(coefs.index) == list(_c.index), 'coefs — 9 признаков, индекс — get_feature_names_out()'\nassert abs(contract_coef - _c['num__has_contract']) < 1e-9 and contract_coef < 0, \"contract_coef = coefs['num__has_contract'] (отрицательный)\""
    }
   },
   {
    "title": "Три сильных признака",
    "prompt": "<p>Признаки масштабированы, поэтому коэффициенты можно сравнивать по модулю. Запишите названия трёх признаков с самым большим модулем коэффициента в список <code>top3</code> (по убыванию).</p>",
    "hints": [
     "<code>coefs.abs().sort_values(ascending=False).index[:3]</code>"
    ]
   },
   {
    "title": "Риск по тарифам",
    "prompt": "<p>Возьмите строки test из полной таблицы: <code>te = df.loc[X_test.index].copy()</code>, <code>te['proba'] = proba</code>. Среднюю прогнозную вероятность по тарифам запишите в <code>proba_by_plan</code>, реальную долю churn — в <code>rate_by_plan</code>.</p>",
    "hints": [
     "<code>te.groupby('plan')['proba'].mean()</code>"
    ],
    "check": {
     "tests": "_t = df.loc[X_test.index]\nassert all(abs(proba_by_plan[_p] - pd.Series(proba, index=X_test.index)[_t['plan'] == _p].mean()) < 1e-9 for _p in ['basic', 'standard', 'premium']), 'proba_by_plan — среднее proba по тарифу'\nassert all(abs(rate_by_plan[_p] - _t.loc[_t['plan'] == _p, 'churned'].mean()) < 1e-9 for _p in ['basic', 'standard', 'premium']), 'rate_by_plan — реальная доля churned по тарифу'"
    }
   },
   {
    "title": "AUC по городам",
    "prompt": "<p>Одинаково ли хорошо модель различает абонентов в каждом городе? В таблице <code>te</code> вычислите для каждого города <code>roc_auc_score(churned, proba)</code> и запишите в Series <code>city_auc</code>. Город с самым низким AUC запишите в <code>weakest_city</code>.</p>",
    "hints": [
     "<code>for c, g in te.groupby('city')</code>",
     "<code>pd.Series({...})</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\n_t = df.loc[X_test.index].copy()\n_t['proba'] = proba\n_a = pd.Series({_c: _ra(_g['churned'], _g['proba']) for _c, _g in _t.groupby('city')})\nassert isinstance(city_auc, pd.Series) and len(city_auc) == 5, 'city_auc — Series по 5 городам'\nassert all(abs(city_auc[_c] - _a[_c]) < 1e-9 for _c in _a.index), 'AUC каждого города неверен: только test-строки этого города'\nassert weakest_city == _a.idxmin(), f'weakest_city = {_a.idxmin()} должно быть'"
    }
   },
   {
    "title": "Предупреждения по городам",
    "prompt": "<p>Порог 0.3. Добавьте в <code>te</code> столбец <code>flag</code>. DataFrame <code>city_check</code>: индекс — город, столбцы <code>offer_rate</code> (среднее <code>flag</code>) и <code>churn_rate</code> (среднее <code>churned</code>). Запишите в <code>over_city</code> город, у которого доля предупреждений сильнее всего превышает реальную долю (наибольшее <code>offer_rate − churn_rate</code>).</p>",
    "hints": [
     "<code>te.groupby('city').agg(offer_rate=('flag', 'mean'), churn_rate=('churned', 'mean'))</code>"
    ],
    "check": {
     "tests": "_t = df.loc[X_test.index].copy()\n_t['flag'] = (proba >= 0.3).astype(int)\n_g = _t.groupby('city').agg(offer_rate=('flag', 'mean'), churn_rate=('churned', 'mean'))\nassert isinstance(city_check, pd.DataFrame) and {'offer_rate', 'churn_rate'} <= set(city_check.columns) and len(city_check) == 5, 'city_check: 5 городов, offer_rate и churn_rate'\nassert all(abs(city_check.loc[_c, 'offer_rate'] - _g.loc[_c, 'offer_rate']) < 1e-9 for _c in _g.index), 'offer_rate неверен: порог 0.3'\nassert over_city == (_g['offer_rate'] - _g['churn_rate']).idxmax(), f\"over_city = {(_g['offer_rate'] - _g['churn_rate']).idxmax()} должно быть\""
    }
   },
   {
    "title": "Причины для одного абонента",
    "prompt": "<p>Для абонента из test с <b>самой высокой</b> вероятностью запишите вклад каждого признака в логит (<code>масштабталған мән × коэффициент</code>) в Series <code>contrib</code> (индекс — названия признаков). Сумма вкладов + <code>intercept_</code> равна его логиту. Признак, который больше всего повышает риск (самый большой положительный вклад), запишите в <code>main_reason</code>.</p>",
    "hints": [
     "Абонент: <code>i = int(np.argmax(proba))</code>, его строка <code>X_test.iloc[[i]]</code>",
     "<code>pipe.named_steps['pre'].transform(...)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_i = int(_np.argmax(proba))\n_x = _np.asarray(pipe.named_steps['pre'].transform(X_test.iloc[[_i]]))[0]\n_c = pd.Series(_x * pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nassert isinstance(contrib, pd.Series) and len(contrib) == 9, 'contrib — вклады 9 признаков'\nassert all(abs(contrib.values - _c.values) < 1e-9), 'Вклады неверны: абонент с самым высоким proba (np.argmax), transform × coef_[0]'\nassert abs(1 / (1 + _np.exp(-(contrib.sum() + pipe.named_steps['model'].intercept_[0]))) - proba[_i]) < 1e-6, 'sigmoid(contrib.sum() + intercept) должна равняться proba'\nassert main_reason == _c.idxmax(), f'main_reason = {_c.idxmax()} должно быть'"
    }
   },
   {
    "title": "Recall по возрастным группам",
    "prompt": "<p>Порог 0.3. Добавьте в <code>te</code> столбец <code>age_band</code> (<code>pd.cut</code>, границы <code>[17, 30, 45, 65]</code>, метки <code>'18-30'</code>, <code>'31-45'</code>, <code>'46-65'</code>). Среди уходящих recall (доля <code>flag</code>) по каждой возрастной группе запишите в <code>band_recall</code> (<code>observed=True</code>), а самую низкую группу — текстом в <code>worst_band</code>.</p>",
    "hints": [
     "Сначала уходящие: <code>te[te['churned'] == 1]</code>",
     "<code>groupby('age_band', observed=True)['flag'].mean()</code>"
    ],
    "check": {
     "tests": "_t = df.loc[X_test.index].copy()\n_t['flag'] = (proba >= 0.3).astype(int)\n_t['age_band'] = pd.cut(_t['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\n_r = _t[_t['churned'] == 1].groupby('age_band', observed=True)['flag'].mean()\nassert len(band_recall) == len(_r) and all(abs(band_recall.values - _r.values) < 1e-9), 'Recall только среди уходящих (churned == 1) по возрастной группе'\nassert worst_band == str(_r.idxmin()), f'worst_band = {_r.idxmin()} должно быть'"
    }
   },
   {
    "title": "Влияние звонков",
    "prompt": "<p>Partial dependence: для <code>support_calls</code> ∈ 0…5 в копии <code>X_test</code> установите число звонков всем абонентам равным этому значению и запишите среднюю вероятность в словарь <code>calls_curve</code>. Во сколько раз средняя вероятность растёт при росте звонков от 0 до 5, запишите в <code>ratio_5_0</code>.</p>",
    "hints": [
     "<code>Xc = X_test.copy()</code>, <code>Xc['support_calls'] = k</code>"
    ],
    "check": {
     "tests": "_r = {}\nfor _k in range(6):\n    _X = X_test.copy()\n    _X['support_calls'] = _k\n    _r[_k] = pipe.predict_proba(_X)[:, 1].mean()\nassert sorted(calls_curve) == list(range(6)), 'Ключи: 0, 1, 2, 3, 4, 5'\nassert all(abs(calls_curve[_k] - _r[_k]) < 1e-9 for _k in _r), 'Значения неверны: в копии support_calls = k'\nassert all(calls_curve[_k] < calls_curve[_k + 1] for _k in range(5)), 'С ростом числа звонков риск растёт'\nassert abs(ratio_5_0 - _r[5] / _r[0]) < 1e-9, 'ratio_5_0 = calls_curve[5] / calls_curve[0]'\nassert X_test['support_calls'].nunique() > 1, 'Не меняйте X_test: используйте .copy()'"
    }
   }
  ]
 },
 "dc-10": {
  "pr": [
   {
    "title": "Формат процентов",
    "prompt": "<p>Числа на слайде должны читаться легко. Функция <code>pct(x)</code> должна превращать долю в проценты с одним знаком после запятой.</p><p>Например, <code>pct(0.2583)</code> → <code>'25.8%'</code>.</p>",
    "hints": [
     "f-строка: <code>f'{x * 100:.1f}%'</code>"
    ],
    "check": {
     "tests": "assert pct(0.2583) == '25.8%', \"pct(0.2583) должна вернуть '25.8%'\"\nassert pct(1) == '100.0%', \"pct(1) = '100.0%'\"\nassert pct(0.05) == '5.0%', \"pct(0.05) = '5.0%'\""
    }
   },
   {
    "title": "Формат тенге",
    "prompt": "<p>Функция <code>tenge(n)</code> должна превращать целое число в текст в тенге, где разряды тысяч отделены пробелом.</p><p>Например, <code>tenge(168000)</code> → <code>'168 000 ₸'</code>.</p>",
    "hints": [
     "<code>f'{n:,}'</code> разделяет тысячи запятой, затем <code>.replace(',', ' ')</code>."
    ],
    "check": {
     "tests": "assert tenge(168000) == '168 000 ₸', \"tenge(168000) должна вернуть '168 000 ₸'\"\nassert tenge(950) == '950 ₸', \"tenge(950) = '950 ₸'\"\nassert tenge(11276400) == '11 276 400 ₸', \"tenge(11276400) = '11 276 400 ₸'\"\nassert tenge(-6000) == '-6 000 ₸', \"Отрицательное число: '-6 000 ₸'\""
    }
   },
   {
    "title": "Ключевые числа",
    "prompt": "<p>Для первого слайда словарь <code>kpis</code>: <code>'n_test'</code> (абоненты test), <code>'n_churn'</code> (из них уходящие), <code>'churn_rate'</code> (доля, 3 знака), <code>'auc'</code> (ROC AUC на test, 3 знака).</p>",
    "hints": [
     "<code>round(roc_auc_score(y_test, proba), 3)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert isinstance(kpis, dict) and {'n_test', 'n_churn', 'churn_rate', 'auc'} <= set(kpis), 'Ключи: n_test, n_churn, churn_rate, auc'\nassert kpis['n_test'] == 150 and kpis['n_churn'] == 39, 'n_test = 150, n_churn = 39'\nassert kpis['churn_rate'] == 0.26, 'churn_rate = round(39 / 150, 3) = 0.26'\nassert kpis['auc'] == round(_ra(y_test, proba), 3), 'auc — до 3 знаков'"
    }
   },
   {
    "title": "Стратегии top-k",
    "prompt": "<p>Бизнес спрашивает: «скольким абонентам мы звоним?» Для <code>k</code> ∈ [20, 40, 60] запишите в DataFrame <code>topk</code> прибыль при отправке предложений <code>k</code> абонентам с самой высокой вероятностью: индекс — <code>k</code>, столбцы <code>hits</code> (удержанные уходящие) и <code>profit</code>. Значение <code>k</code> с самой большой прибылью — <code>best_k</code>.</p>",
    "hints": [
     "<code>order = np.argsort(-proba)</code> — один раз.",
     "<code>pd.DataFrame(rows).T</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_o = _np.argsort(-proba)\n_r = {}\nfor _k in [20, 40, 60]:\n    _s = _np.zeros(len(proba), dtype=int)\n    _s[_o[:_k]] = 1\n    _r[_k] = _profit(y_test, _s)\nassert isinstance(topk, pd.DataFrame) and sorted(int(_i) for _i in topk.index) == [20, 40, 60], 'Индекс: 20, 40, 60'\nassert all(int(topk.loc[_k, 'profit']) == _r[_k] for _k in _r), f'Прибыль неверна: {_r}'\nassert all(int(topk.loc[_k, 'hits']) == int(y_test.values[_o[:_k]].sum()) for _k in _r), 'hits — уходящие среди выбранных k абонентов'\nassert best_k == max(_r, key=_r.get), f'best_k = {max(_r, key=_r.get)} должно быть'"
    }
   },
   {
    "title": "Заголовок слайда",
    "prompt": "<p>Сделайте заголовок слайда автоматически. Функция <code>headline(profit_model, profit_all)</code>: если разница положительна, верните <code>'Модель барлығына жіберуден X көп пайда береді'</code>, иначе <code>'Модель барлығына жіберуден X аз пайда береді'</code>, где X — модуль разницы в формате <code>tenge</code>.</p><p>Например, <code>headline(214000, 168000)</code> → <code>'Модель барлығына жіберуден 46 000 ₸ көп пайда береді'</code>.</p>",
    "hints": [
     "<code>diff = profit_model - profit_all</code>",
     "<code>tenge(abs(diff))</code>"
    ],
    "check": {
     "tests": "assert headline(214000, 168000) == 'Модель барлығына жіберуден 46 000 ₸ көп пайда береді', \"headline(214000, 168000) неверна\"\nassert headline(100000, 168000) == 'Модель барлығына жіберуден 68 000 ₸ аз пайда береді', \"Если разница отрицательна: '... 68 000 ₸ аз пайда береді'\"\nassert headline(1500000, 168000) == 'Модель барлығына жіберуден 1 332 000 ₸ көп пайда береді', 'Миллионы тоже разделяются пробелом'"
    }
   },
   {
    "title": "Рост прибыли",
    "prompt": "<p>Проверьте на test пороги <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) и запишите наибольшую прибыль в <code>best_profit</code>. Прибыль стратегии «отправить всем» — <code>profit_all</code>. <code>uplift = best_profit - profit_all</code>, а <code>uplift_pct</code> — его процент от <code>profit_all</code> (1 знак).</p>",
    "hints": [
     "Всем: <code>np.ones(len(y_test), dtype=int)</code>",
     "<code>round(uplift / profit_all * 100, 1)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_b = max(_profit(y_test, (proba >= _t).astype(int)) for _t in _ths)\nassert best_profit == _b, f'best_profit = {_b} ₸ должно быть'\nassert profit_all == 168000, 'profit_all = 168 000 ₸'\nassert uplift == _b - 168000 and uplift_pct == round((_b - 168000) / 168000 * 100, 1), 'uplift = best_profit − profit_all; uplift_pct — процент, 1 знак'"
    }
   },
   {
    "title": "Слайд по тарифам",
    "prompt": "<p>Порог 0.3. Для каждого тарифа на test создайте DataFrame <code>plan_table</code>: индекс — тариф, столбцы <code>customers</code> (количество абонентов), <code>offers</code> (количество предложений), <code>profit</code> (прибыль этого тарифа, функцией <code>profit</code>). Тариф с самой большой прибылью запишите в <code>best_plan</code>. Сумма прибылей тарифов должна равняться общей прибыли.</p>",
    "hints": [
     "<code>te = df.loc[X_test.index].copy()</code>, затем <code>for plan, g in te.groupby('plan')</code>",
     "<code>profit(g['churned'], g['pred'])</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_t = df.loc[X_test.index].copy()\n_t['pred'] = (proba >= 0.3).astype(int)\n_r = {_p: _profit(_g['churned'], _g['pred']) for _p, _g in _t.groupby('plan')}\nassert isinstance(plan_table, pd.DataFrame) and set(plan_table.index) == {'basic', 'standard', 'premium'}, 'Индекс — три тарифа'\nassert {'customers', 'offers', 'profit'} <= set(plan_table.columns), 'Столбцы: customers, offers, profit'\nassert int(plan_table['customers'].sum()) == 150, 'Сумма абонентов по всем тарифам 150'\nassert all(int(plan_table.loc[_p, 'profit']) == _r[_p] for _p in _r), f'Прибыли тарифов: {_r}'\nassert int(plan_table['profit'].sum()) == _profit(y_test, (proba >= 0.3).astype(int)), 'Сумма должна равняться общей прибыли'\nassert best_plan == max(_r, key=_r.get), f'best_plan = {max(_r, key=_r.get)} должно быть'"
    }
   },
   {
    "title": "Эффективность одного предложения",
    "prompt": "<p>Самая большая прибыль и самое эффективное предложение — разные вещи. Для порогов ∈ [0.2, 0.3, 0.4, 0.5, 0.6] запишите прибыль в <code>profits</code>, а прибыль на одно предложение (<code>profit / offers</code>) — в <code>per_offer</code>. Порог с самой большой общей прибылью запишите в <code>th_total</code>, а с самой большой прибылью на одно предложение — в <code>th_efficient</code>.</p>",
    "hints": [
     "<code>pred.sum()</code> — количество предложений.",
     "Два словаря и два <code>max(..., key=...)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_p = {_t: _profit(y_test, (proba >= _t).astype(int)) for _t in [0.2, 0.3, 0.4, 0.5, 0.6]}\n_e = {_t: _p[_t] / (proba >= _t).sum() for _t in _p}\nassert sorted(profits) == [0.2, 0.3, 0.4, 0.5, 0.6] and all(profits[_t] == _p[_t] for _t in _p), 'profits неверны'\nassert all(abs(per_offer[_t] - _e[_t]) < 1e-9 for _t in _e), 'per_offer = profit / количество предложений'\nassert th_total == max(_p, key=_p.get) and th_efficient == max(_e, key=_e.get), f'th_total = {max(_p, key=_p.get)}, th_efficient = {max(_e, key=_e.get)}'\nassert th_efficient > th_total, 'Порог эффективности выше порога общей прибыли'"
    }
   }
  ]
 }
} });
