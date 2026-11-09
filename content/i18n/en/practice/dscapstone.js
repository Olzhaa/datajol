// dscapstone practice tasks: English text. Code, solutions and checks are in content/practice/dscapstone.js.
DJ.i18n.patch({ lessons: {
 "dc-1": {
  "pr": [
   {
    "title": "Lost revenue",
    "prompt": "<p>How much revenue does the company lose because of the subscribers who left? The function <code>lost_revenue(n_churn, fee, months)</code> must return <code>n_churn × fee × months</code>.</p><p>For example, <code>lost_revenue(10, 6500, 12)</code> → <code>780000</code> ₸.</p>",
    "hints": [
     "The product of three numbers."
    ],
    "check": {
     "tests": "assert lost_revenue(10, 6500, 12) == 780000, 'lost_revenue(10, 6500, 12) must return 780000'\nassert lost_revenue(0, 6500, 12) == 0, 'If nobody left: 0'\nassert lost_revenue(155, 3500, 6) == 3255000, 'lost_revenue(155, 3500, 6) = 3 255 000'"
    }
   },
   {
    "title": "Campaign profit",
    "prompt": "<p>A retention campaign: each correctly retained leaver (TP) gives +10,000 ₸, each wasted offer (FP) costs −2,000 ₸. The function <code>campaign_profit(tp, fp)</code> must return the total profit.</p><p>For example, <code>campaign_profit(5, 10)</code> → <code>30000</code>.</p>",
    "hints": [
     "<code>10000 * tp - 2000 * fp</code>"
    ],
    "check": {
     "tests": "assert campaign_profit(5, 10) == 30000, 'campaign_profit(5, 10) must return 30000'\nassert campaign_profit(0, 3) == -6000, 'With only FP the profit is negative: −6000'\nassert campaign_profit(39, 111) == 168000, 'Send to everyone: 39 × 10000 − 111 × 2000 = 168000'"
    }
   },
   {
    "title": "Cost matrix",
    "prompt": "<p>You are given the confusion matrix <code>cm = [[tn, fp], [fn, tp]]</code> and a cost matrix <code>costs</code> of the same shape. The function <code>total_cost(cm, costs)</code> must return the sum of the products of the matching elements.</p><p>For example, <code>total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]])</code> → <code>80000</code>.</p>",
    "hints": [
     "Element-wise multiplication in NumPy: <code>np.asarray(cm) * np.asarray(costs)</code>"
    ],
    "check": {
     "tests": "assert total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]]) == 80000, 'total_cost([[100, 10], [5, 20]], [[0, 2000], [12000, 0]]) = 10×2000 + 5×12000 = 80000'\nassert total_cost([[50, 0], [0, 50]], [[0, 2000], [12000, 0]]) == 0, 'A model without errors: 0'\nassert total_cost([[1, 1], [1, 1]], [[1, 2], [3, 4]]) == 10, 'All elements: 1 + 2 + 3 + 4 = 10'"
    }
   },
   {
    "title": "Who to send an offer to",
    "prompt": "<p>The expected profit of an offer is <code>p × SAVE × LOST − OFFER</code>. The function <code>worth_offer(probs, save, lost, offer)</code> must return, as a list, the <b>indices</b> of the subscribers whose expected profit is positive.</p><p>For example, <code>worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000)</code> → <code>[1, 2, 3]</code>.</p>",
    "hints": [
     "<code>enumerate(probs)</code> gives the index and the value.",
     "Condition: <code>p * save * lost - offer &gt; 0</code>"
    ],
    "check": {
     "tests": "assert worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000) == [1, 2, 3], 'worth_offer([0.1, 0.5, 0.2, 0.9], 0.3, 40000, 2000) must return [1, 2, 3] (0.2 × 12000 = 2400 > 2000)'\nassert worth_offer([0.1, 0.15], 0.3, 40000, 2000) == [], 'If the profit of everyone is negative: an empty list'\nassert worth_offer([0.3, 0.3], 0.5, 20000, 3000) == [], 'If the profit is exactly 0, do not send: > 0'"
    }
   },
   {
    "title": "Annual loss",
    "prompt": "<p>How many yearly payments would the subscribers who left (<code>churned == 1</code>) in the data have brought in? <code>lost_year</code> = the sum of their <code>monthly_fee × 12</code> (₸). Write the average yearly payment of one leaver to <code>avg_lost</code>.</p>",
    "hints": [
     "Filter: <code>df[df['churned'] == 1]</code>",
     "<code>(churners['monthly_fee'] * 12).sum()</code>"
    ],
    "check": {
     "tests": "_c = df[df['churned'] == 1]\nassert int(lost_year) == int((_c['monthly_fee'] * 12).sum()), f\"lost_year must be {int((_c['monthly_fee'] * 12).sum())} ₸\"\nassert abs(avg_lost - (_c['monthly_fee'] * 12).mean()) < 1e-6, 'avg_lost = lost_year / the number of leavers'"
    }
   },
   {
    "title": "Loss by plan",
    "prompt": "<p>How much yearly income is lost by the leavers of each plan: the Series <code>lost_by_plan</code> (index — plan, value — the sum of <code>monthly_fee × 12</code>). Write the plan with the biggest loss to <code>biggest_plan</code>.</p>",
    "hints": [
     "<code>(churners['monthly_fee'] * 12).groupby(churners['plan']).sum()</code>"
    ],
    "check": {
     "tests": "_c = df[df['churned'] == 1]\n_l = (_c['monthly_fee'] * 12).groupby(_c['plan']).sum()\nassert isinstance(lost_by_plan, pd.Series) and set(lost_by_plan.index) == {'basic', 'standard', 'premium'}, 'lost_by_plan — a Series over the three plans'\nassert all(int(lost_by_plan[_p]) == int(_l[_p]) for _p in _l.index), 'The values are wrong: only the leavers, monthly_fee × 12'\nassert biggest_plan == _l.idxmax(), f'biggest_plan must be {_l.idxmax()}'"
    }
   },
   {
    "title": "Comparing strategies",
    "prompt": "<p>The function <code>compare(probs, y, gain, offer)</code> must return a dictionary with the real profit of three strategies. The profit for each subscriber who gets an offer: <code>y × gain − offer</code>.</p><ul><li><code>'none'</code> — do not send to anyone (0);</li><li><code>'all'</code> — send to everyone;</li><li><code>'model'</code> — send only to those with <code>p × gain − offer &gt; 0</code>.</li></ul><p>For example, <code>compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000)['model']</code> → <code>6000</code>.</p>",
    "hints": [
     "One loop: <code>for p, t in zip(probs, y):</code>",
     "The real profit is <code>t * gain - offer</code>, and the choice is based on <code>p * gain - offer &gt; 0</code>."
    ],
    "check": {
     "tests": "_r = compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000)\nassert isinstance(_r, dict) and set(_r) == {'none', 'all', 'model'}, \"Keys: 'none', 'all', 'model'\"\nassert _r == {'none': 0, 'all': 4000, 'model': 6000}, \"compare([0.9, 0.1, 0.6], [1, 0, 0], 10000, 2000) → {'none': 0, 'all': 4000, 'model': 6000}\"\n_q = compare([0.05, 0.1], [0, 1], 10000, 2000)\nassert _q['model'] == 0 and _q['all'] == 6000, 'If nobody has a positive expected profit, model = 0'"
    }
   },
   {
    "title": "Sensitivity analysis",
    "prompt": "<p>How does the decision change if the price of the offer changes? <code>SAVE = 0.3</code>, <code>LOST = 40000</code>. For <code>OFFER</code> ∈ [1000, 2000, 4000] write into the dictionary <code>sens</code>, as <code>{offer: (breakeven, n_targets)}</code>, the break-even point of zero profit (<code>OFFER / (SAVE × LOST)</code>, 4 decimal places) and the number of probabilities in <code>probs</code> above it.</p>",
    "hints": [
     "<code>round(offer / (SAVE * LOST), 4)</code>",
     "<code>(probs &gt; be).sum()</code>"
    ],
    "check": {
     "tests": "assert sorted(sens) == [1000, 2000, 4000], 'Keys of sens: 1000, 2000, 4000'\nassert sens[1000] == (0.0833, 8), 'OFFER = 1000: breakeven 0.0833, 8 subscribers'\nassert sens[2000] == (0.1667, 5), 'OFFER = 2000: breakeven 0.1667, 5 subscribers'\nassert sens[4000] == (0.3333, 3), 'OFFER = 4000: breakeven 0.3333, 3 subscribers'"
    }
   }
  ]
 },
 "dc-2": {
  "pr": [
   {
    "title": "Share of missing values",
    "prompt": "<p>Write the <b>share</b> of empty values in each column to the Series <code>miss_share</code> (<code>isna().mean()</code>). Write the column with the largest share to <code>worst_col</code>.</p>",
    "hints": [
     "<code>df.isna().mean()</code> — the share of True in each column."
    ],
    "check": {
     "tests": "assert isinstance(miss_share, pd.Series) and len(miss_share) == 10, 'miss_share — a Series over 10 columns'\nassert abs(miss_share['age'] - 25 / 600) < 1e-9 and abs(miss_share['data_gb'] - 17 / 600) < 1e-9, 'For age 25/600, for data_gb 17/600'\nassert worst_col == 'age', 'The most missing values are in age'"
    }
   },
   {
    "title": "Count by city",
    "prompt": "<p>Write the number of subscribers in each city to <code>city_counts</code> (<code>value_counts()</code>), the city with the most subscribers to <code>top_city</code>, and its share to <code>top_share</code>.</p>",
    "hints": [
     "<code>df['city'].value_counts()</code>"
    ],
    "check": {
     "tests": "_v = df['city'].value_counts()\nassert int(city_counts.sum()) == 600 and len(city_counts) == 5, 'city_counts — 5 cities, the total is 600'\nassert top_city == _v.idxmax(), f'top_city must be {_v.idxmax()}'\nassert abs(top_share - _v.max() / 600) < 1e-9, 'top_share = the largest count / 600'"
    }
   },
   {
    "title": "Payment range",
    "prompt": "<p>Write the smallest value of the <code>monthly_fee</code> column to <code>fee_min</code>, the largest to <code>fee_max</code>, and the median to <code>fee_median</code>.</p>",
    "hints": [
     "<code>.min()</code>, <code>.max()</code>, <code>.median()</code>"
    ],
    "check": {
     "tests": "assert fee_min == df['monthly_fee'].min() and fee_max == df['monthly_fee'].max(), 'fee_min, fee_max — min() and max()'\nassert fee_median == df['monthly_fee'].median(), 'fee_median — median()'\nassert fee_min == 3300 and fee_max == 11200, 'The payments range from 3,300 ₸ to 11,200 ₸'"
    }
   },
   {
    "title": "Duplicate rows",
    "prompt": "<p>Check the data quality: write the number of repeats in <code>customer_id</code> to <code>n_dup_ids</code>, and the number of fully duplicated rows to <code>n_dup_rows</code> (<code>duplicated().sum()</code>). Then deliberately add one row twice (<code>df2</code>) and find <code>n_dup_rows2</code>.</p>",
    "hints": [
     "<code>df['customer_id'].duplicated().sum()</code>",
     "<code>pd.concat([df, df.iloc[[0]]], ignore_index=True)</code>"
    ],
    "check": {
     "tests": "assert n_dup_ids == 0 and n_dup_rows == 0, 'The original data has no duplicates: 0 and 0'\nassert len(df2) == 601, 'df2 must have 601 rows'\nassert n_dup_rows2 == 1, 'df2 has one duplicated row'"
    }
   },
   {
    "title": "Plan and fee range",
    "prompt": "<p>Write the fee range of each plan to the DataFrame <code>fee_range</code> (<code>groupby('plan')['monthly_fee'].agg(['min', 'max'])</code>). Do the ranges overlap: sort by <code>min</code>, and if the <code>max</code> of one plan is greater than or equal to the <code>min</code> of the next, then <code>overlap = True</code>.</p>",
    "hints": [
     "<code>.agg(['min', 'max']).sort_values('min')</code>",
     "Compare neighbours: <code>max[:-1] &gt;= min[1:]</code>"
    ],
    "check": {
     "tests": "assert isinstance(fee_range, pd.DataFrame) and {'min', 'max'} <= set(fee_range.columns) and len(fee_range) == 3, 'fee_range — a 3-row table with the columns min and max'\nassert fee_range.loc['basic', 'max'] == 3700 and fee_range.loc['premium', 'min'] == 10800, 'basic max = 3700, premium min = 10800'\nassert overlap is False, 'The plan fees do not overlap: overlap = False'"
    }
   },
   {
    "title": "Churn with an empty age",
    "prompt": "<p>Are the missing values random? Write the churn share of the subscribers with an empty age to <code>rate_missing</code>, and the share among those whose age is known to <code>rate_known</code>. Write the number of subscribers with an empty age to <code>n_missing_age</code>.</p>",
    "hints": [
     "Mask: <code>miss = df['age'].isna()</code>",
     "The opposite: <code>~miss</code>"
    ],
    "check": {
     "tests": "_m = df['age'].isna()\nassert n_missing_age == 25, 'n_missing_age = 25'\nassert abs(rate_missing - df.loc[_m, 'churned'].mean()) < 1e-9, 'rate_missing — the mean of churned over the rows with an empty age'\nassert abs(rate_known - df.loc[~_m, 'churned'].mean()) < 1e-9, 'rate_known — the mean over the rows with a known age (the ~ sign)'"
    }
   },
   {
    "title": "Data health report",
    "prompt": "<p>The function <code>health_report(data)</code> must return a dictionary for any DataFrame: <code>'rows'</code>, <code>'cols'</code>, <code>'missing_total'</code> (all empty values), <code>'dup_rows'</code> (fully duplicated rows), <code>'worst_col'</code> (the column with the most empty values; if there are no empty values, <code>None</code>).</p>",
    "hints": [
     "<code>miss = data.isna().sum()</code>",
     "<code>miss.idxmax() if miss.sum() &gt; 0 else None</code>"
    ],
    "check": {
     "tests": "_r = health_report(df)\nassert isinstance(_r, dict) and set(_r) == {'rows', 'cols', 'missing_total', 'dup_rows', 'worst_col'}, 'Keys: rows, cols, missing_total, dup_rows, worst_col'\nassert (_r['rows'], _r['cols'], _r['missing_total'], _r['dup_rows'], _r['worst_col']) == (600, 10, 42, 0, 'age'), 'For churn: 600, 10, 42, 0, age'\n_t = pd.DataFrame({'a': [1, 1, 2], 'b': ['x', 'x', 'y']})\nassert health_report(_t) == {'rows': 3, 'cols': 2, 'missing_total': 0, 'dup_rows': 1, 'worst_col': None}, 'In a table with no empty values worst_col = None, and one duplicated row'"
    }
   },
   {
    "title": "IQR outliers",
    "prompt": "<p>Find the outliers in the <code>data_gb</code> column with the IQR rule: <code>q1</code>, <code>q3</code> (<code>quantile</code>), <code>iqr = q3 − q1</code>; the bounds are <code>[q1 − 1.5·iqr, q3 + 1.5·iqr]</code>. Write the number of values outside the bounds to <code>n_outliers</code>, and the share of the premium plan among them to <code>premium_share</code>.</p>",
    "hints": [
     "<code>df['data_gb'].quantile(0.25)</code>",
     "Two conditions: <code>(a &lt; low) | (a &gt; high)</code>"
    ],
    "check": {
     "tests": "_q1, _q3 = df['data_gb'].quantile(0.25), df['data_gb'].quantile(0.75)\n_i = _q3 - _q1\n_o = df[(df['data_gb'] < _q1 - 1.5 * _i) | (df['data_gb'] > _q3 + 1.5 * _i)]\nassert abs(q1 - _q1) < 1e-9 and abs(q3 - _q3) < 1e-9, 'q1, q3 — the 0.25 and 0.75 quantiles'\nassert n_outliers == len(_o), f'n_outliers must be {len(_o)}'\nassert abs(premium_share - (_o['plan'] == 'premium').mean()) < 1e-9, 'premium_share — the share of premium among the outliers'"
    }
   }
  ]
 },
 "dc-3": {
  "pr": [
   {
    "title": "Contract share",
    "prompt": "<p>Write to the Series <code>contract_by_plan</code> the share of subscribers with a contract in each plan. Write the plan with the lowest share to <code>least_plan</code>.</p>",
    "hints": [
     "<code>df.groupby('plan')['has_contract'].mean()</code>",
     "<code>.idxmin()</code>"
    ]
   },
   {
    "title": "Churn by number of calls",
    "prompt": "<p>For each value of <code>support_calls</code> write the churn share to <code>by_calls</code> and the number of subscribers to <code>n_by_calls</code>. Among the groups with at least 30 subscribers, find the number of calls with the highest churn share and write it to <code>worst_calls</code>.</p>",
    "hints": [
     "<code>.size()</code> gives the group size.",
     "Filter: <code>by_calls[n_by_calls &gt;= 30]</code>"
    ],
    "check": {
     "tests": "_g = df.groupby('support_calls')['churned']\nassert all(abs(by_calls[_k] - _g.mean()[_k]) < 1e-9 for _k in _g.mean().index), 'by_calls — the mean of churned by the number of calls'\nassert all(int(n_by_calls[_k]) == int(_g.size()[_k]) for _k in _g.size().index), 'n_by_calls — the number of subscribers in each group'\nassert worst_calls == 4, 'The riskiest of the groups with at least 30 subscribers is 4 calls'"
    }
   },
   {
    "title": "Age groups",
    "prompt": "<p>Use <code>pd.cut</code> to create the column <code>age_band</code>: the bins <code>[17, 30, 45, 65]</code>, the labels <code>'18-30'</code>, <code>'31-45'</code>, <code>'46-65'</code>. Write the churn share in each group to <code>by_age</code> (<code>observed=True</code>). Subscribers with an empty age do not fall into any group.</p>",
    "hints": [
     "<code>pd.cut(df['age'], bins=[17, 30, 45, 65], labels=[...])</code>",
     "<code>groupby('age_band', observed=True)</code>"
    ],
    "check": {
     "tests": "_b = pd.cut(df['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\n_g = df['churned'].groupby(_b, observed=True).mean()\nassert 'age_band' in df.columns, 'Add the column age_band to df'\nassert [str(_i) for _i in by_age.index] == ['18-30', '31-45', '46-65'], 'Groups: 18-30, 31-45, 46-65'\nassert all(abs(by_age.values - _g.values) < 1e-9), 'The churn shares are wrong: the bins [17, 30, 45, 65]'"
    }
   },
   {
    "title": "Term and contract",
    "prompt": "<p>The column <code>band</code> is ready. Use <code>pivot_table</code> to create the table <code>pivot</code>: rows — <code>band</code>, columns — <code>has_contract</code>, values — the mean of <code>churned</code> (<code>observed=True</code>). Write the leaver share of the newest group without a contract (0-12, has_contract = 0) to <code>new_no_contract</code>.</p>",
    "hints": [
     "<code>df.pivot_table(index='band', columns='has_contract', values='churned', aggfunc='mean', observed=True)</code>"
    ],
    "check": {
     "tests": "_p = df.pivot_table(index='band', columns='has_contract', values='churned', aggfunc='mean', observed=True)\nassert isinstance(pivot, pd.DataFrame) and pivot.shape == (4, 2), 'The shape of pivot (4, 2): 4 groups × contract 0/1'\nassert (abs(pivot.values - _p.values) < 1e-9).all(), \"The values are wrong: index='band', columns='has_contract', values='churned'\"\nassert abs(new_no_contract - _p.loc['0-12', 0]) < 1e-9 and new_no_contract > 0.5, \"new_no_contract = pivot.loc['0-12', 0]\""
    }
   },
   {
    "title": "City and plan",
    "prompt": "<p>Write the table of the churn share by city and plan to <code>city_plan</code> (<code>pivot_table</code>, rows — <code>city</code>, columns — <code>plan</code>). Write the cell with the highest share to <code>worst_cell</code> as a tuple <code>(қала, тариф)</code>.</p>",
    "hints": [
     "<code>city_plan.stack()</code> turns the table into a Series with the index (city, plan).",
     "Then <code>.idxmax()</code>"
    ],
    "check": {
     "tests": "_p = df.pivot_table(index='city', columns='plan', values='churned', aggfunc='mean')\nassert isinstance(city_plan, pd.DataFrame) and city_plan.shape == (5, 3), 'The shape of city_plan (5, 3)'\nassert tuple(worst_cell) == tuple(_p.stack().idxmax()), f'worst_cell = {_p.stack().idxmax()} must be'"
    }
   },
   {
    "title": "Risk group",
    "prompt": "<p>Three features together: new (<code>tenure_months &lt;= 12</code>), calling often (<code>support_calls &gt;= 3</code>) and without a contract (<code>has_contract == 0</code>). Write the number of such subscribers to <code>n_risky</code> and their churn share to <code>risky_rate</code>. How many times is it higher than the overall share — <code>times</code>.</p>",
    "hints": [
     "Put each condition in brackets: <code>(a) &amp; (b) &amp; (c)</code>"
    ],
    "check": {
     "tests": "_r = df[(df['tenure_months'] <= 12) & (df['support_calls'] >= 3) & (df['has_contract'] == 0)]\nassert n_risky == len(_r), f'n_risky must be {len(_r)}: the three conditions joined by &'\nassert abs(risky_rate - _r['churned'].mean()) < 1e-9, 'risky_rate — the mean of churned in the group'\nassert abs(times - _r['churned'].mean() / df['churned'].mean()) < 1e-9 and times > 2, 'times = risky_rate / the overall share'"
    }
   },
   {
    "title": "Lift calculation",
    "prompt": "<p>Lift is how many times the churn share of a group is higher than the overall share. Create a Series <code>lift</code> by <code>band</code> (<code>observed=True</code>). Write the group with the highest lift to <code>top_band</code>, and the groups with a lift below 1 to the list <code>safe_bands</code>.</p>",
    "hints": [
     "<code>df.groupby('band', observed=True)['churned'].mean() / overall</code>",
     "Filter: <code>lift[lift &lt; 1].index</code>"
    ],
    "check": {
     "tests": "_l = df.groupby('band', observed=True)['churned'].mean() / df['churned'].mean()\nassert isinstance(lift, pd.Series) and len(lift) == 4 and all(abs(lift.values - _l.values) < 1e-9), 'lift = the group share / the overall share'\nassert str(top_band) == str(_l.idxmax()), f'top_band must be {_l.idxmax()}'\nassert sorted(str(_b) for _b in safe_bands) == sorted(str(_b) for _b in _l[_l < 1].index), f'safe_bands = {[str(_b) for _b in _l[_l < 1].index]}'"
    }
   },
   {
    "title": "Rule baseline",
    "prompt": "<p>A simple rule from the EDA: \"if <code>tenure_months &lt;= 12</code> <b>or</b> <code>support_calls &gt;= 3</code>, the subscriber leaves\". On all the data create <code>flag</code> (0/1), count TP, FP and FN without sklearn, and compute <code>rule_precision</code> and <code>rule_recall</code>.</p>",
    "hints": [
     "\"Or\": <code>(a) | (b)</code>",
     "TP: <code>((flag == 1) &amp; (yt == 1)).sum()</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import precision_score as _ps, recall_score as _rs\n_f = ((df['tenure_months'] <= 12) | (df['support_calls'] >= 3)).astype(int)\nassert len(flag) == 600 and int(flag.sum()) == int(_f.sum()), 'flag: tenure_months <= 12 OR support_calls >= 3 (the | sign)'\nassert abs(rule_precision - _ps(df['churned'], _f)) < 1e-9, 'rule_precision = tp / (tp + fp)'\nassert abs(rule_recall - _rs(df['churned'], _f)) < 1e-9, 'rule_recall = tp / (tp + fn)'"
    }
   }
  ]
 },
 "dc-4": {
  "pr": [
   {
    "title": "Check the shares",
    "prompt": "<p>The split is ready. Write the churn share in train to <code>train_rate</code>, in test to <code>test_rate</code>, and the number of leavers in test to <code>n_test_churn</code>.</p>",
    "hints": [
     "<code>y_test.sum()</code> — the number of ones."
    ],
    "check": {
     "tests": "assert abs(train_rate - y_train.mean()) < 1e-9 and abs(test_rate - y_test.mean()) < 1e-9, 'Shares: y_train.mean(), y_test.mean()'\nassert n_test_churn == 39, 'There are 39 leavers in test'\nassert abs(train_rate - test_rate) < 0.01, 'stratify=y: the shares are close to each other'"
    }
   },
   {
    "title": "Random baseline",
    "prompt": "<p><code>DummyClassifier(strategy='stratified', random_state=0)</code> predicts the classes at random, according to their shares. Train it on train, named <code>dummy</code>, and on test compute <code>acc_strat</code> and <code>rec_strat</code>.</p>",
    "hints": [
     "<code>DummyClassifier(strategy='stratified', random_state=0).fit(X_train, y_train)</code>"
    ],
    "check": {
     "tests": "from sklearn.dummy import DummyClassifier as _D\n_p = _D(strategy='stratified', random_state=0).fit(X_train, y_train).predict(X_test)\nassert isinstance(dummy, DummyClassifier) and dummy.strategy == 'stratified', \"dummy — strategy='stratified'\"\nassert abs(acc_strat - (_p == y_test.values).mean()) < 1e-9, 'acc_strat is wrong: random_state=0'\nassert abs(rec_strat - _p[y_test.values == 1].mean()) < 1e-9, 'rec_strat is wrong'"
    }
   },
   {
    "title": "AUC of the prior baseline",
    "prompt": "<p><code>DummyClassifier(strategy='prior')</code> gives every subscriber the same probability (the share in train). Train it on train, write the test probabilities to <code>p_prior</code> and the ROC AUC to <code>auc_prior</code>. Why 0.5?</p>",
    "hints": [
     "<code>dummy.predict_proba(X_test)[:, 1]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nassert len(p_prior) == 150 and _np.allclose(p_prior, y_train.mean()), 'p_prior — the same for everyone: y_train.mean()'\nassert abs(auc_prior - 0.5) < 1e-9, 'Identical scores do not tell subscribers apart: AUC = 0.5'"
    }
   },
   {
    "title": "The rule on test",
    "prompt": "<p>Check the rule \"<code>tenure_months &lt;= 12</code> → leaves\" on the test set: <code>pred_rule</code> (0/1), <code>rec_rule</code>, <code>prec_rule</code>.</p>",
    "hints": [
     "<code>(X_test['tenure_months'] &lt;= 12).astype(int)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import recall_score as _rs, precision_score as _ps\n_r = (X_test['tenure_months'] <= 12).astype(int)\nassert len(pred_rule) == 150 and int(pred_rule.sum()) == int(_r.sum()), 'pred_rule: tenure_months <= 12 on X_test'\nassert abs(rec_rule - _rs(y_test, _r)) < 1e-9 and abs(prec_rule - _ps(y_test, _r)) < 1e-9, 'rec_rule, prec_rule: recall_score, precision_score (y_test, pred_rule)'"
    }
   },
   {
    "title": "One-feature model",
    "prompt": "<p>A strong baseline: <code>LogisticRegression()</code> with only the <code>tenure_months</code> feature. Train it on train, named <code>one</code>, and write the test ROC AUC to <code>auc_one</code>.</p>",
    "hints": [
     "<code>X_train[['tenure_months']]</code> (double brackets)",
     "<code>roc_auc_score(y_test, one.predict_proba(...)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert one.n_features_in_ == 1, 'one — with one feature only: tenure_months'\n_a = _ra(y_test, -X_test['tenure_months'])\nassert abs(auc_one - _a) < 1e-9, f'auc_one ≈ {_a:.3f}: with one feature the AUC depends only on the order'"
    }
   },
   {
    "title": "Baseline table",
    "prompt": "<p>For the presentation create a baseline table: the DataFrame <code>baselines</code>, index — <code>'majority'</code> (everyone 0) and <code>'rule'</code> (<code>tenure_months &lt;= 12</code>), columns — <code>accuracy</code>, <code>recall</code>, <code>precision</code> (on test, <code>zero_division=0</code>).</p>",
    "hints": [
     "From a dictionary of dictionaries: <code>pd.DataFrame(rows).T</code>",
     "<code>precision_score(..., zero_division=0)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import accuracy_score as _as, recall_score as _rs, precision_score as _ps\n_r = (X_test['tenure_months'] <= 12).astype(int)\nassert isinstance(baselines, pd.DataFrame) and set(baselines.index) == {'majority', 'rule'}, \"Index: 'majority', 'rule'\"\nassert {'accuracy', 'recall', 'precision'} <= set(baselines.columns), 'Columns: accuracy, recall, precision'\nassert abs(baselines.loc['majority', 'accuracy'] - 0.74) < 1e-9 and baselines.loc['majority', 'recall'] == 0 and baselines.loc['majority', 'precision'] == 0, 'majority: accuracy 0.74, recall 0, precision 0'\nassert abs(baselines.loc['rule', 'recall'] - _rs(y_test, _r)) < 1e-9 and abs(baselines.loc['rule', 'precision'] - _ps(y_test, _r)) < 1e-9 and abs(baselines.loc['rule', 'accuracy'] - _as(y_test, _r)) < 1e-9, 'The rule row is wrong'"
    }
   },
   {
    "title": "Learning the rule on train",
    "prompt": "<p>Choose the rule threshold from the data. For <code>k</code> ∈ <code>range(3, 49, 3)</code> write the F1 of the rule \"<code>tenure_months &lt;= k</code>\" on <b>train</b> into <code>f1_by_k</code> (<code>f1_score</code>). Find the best <code>best_k</code> and write the F1 of this rule on test to <code>test_f1</code>.</p>",
    "hints": [
     "Loop: <code>for k in range(3, 49, 3):</code>",
     "Choose on train, evaluate on test once."
    ],
    "check": {
     "tests": "from sklearn.metrics import f1_score as _f1\n_r = {_k: _f1(y_train, (X_train['tenure_months'] <= _k).astype(int)) for _k in range(3, 49, 3)}\n_b = max(_r, key=_r.get)\nassert sorted(f1_by_k) == list(range(3, 49, 3)), 'Keys: 3, 6, ..., 48'\nassert all(abs(f1_by_k[_k] - _r[_k]) < 1e-9 for _k in _r), 'The F1 values are wrong: use only the train data'\nassert best_k == _b, f'best_k = {_b} must be'\nassert abs(test_f1 - _f1(y_test, (X_test['tenure_months'] <= _b).astype(int))) < 1e-9, 'test_f1 — the F1 on test with the chosen k'"
    }
   },
   {
    "title": "Effect of the split",
    "prompt": "<p>How much does the test AUC of one baseline (<code>LogisticRegression()</code>, only <code>tenure_months</code>) depend on the split? For <code>random_state</code> = 0…4 (<code>test_size=0.25</code>, <code>stratify=y</code>) write the test AUC into the list <code>aucs</code>. Write the mean into <code>auc_mean</code> and the SD (<code>np.std</code>) into <code>auc_std</code>.</p>",
    "hints": [
     "On each pass, a new split and a new model.",
     "<code>np.mean</code>, <code>np.std</code>"
    ],
    "check": {
     "tests": "import numpy as _np\nfrom sklearn.metrics import roc_auc_score as _ra\nfrom sklearn.model_selection import train_test_split as _tts\n_a = []\nfor _rs in range(5):\n    _x1, _x2, _y1, _y2 = _tts(X[['tenure_months']], y, test_size=0.25, stratify=y, random_state=_rs)\n    _a.append(_ra(_y2, -_x2['tenure_months']))\nassert len(aucs) == 5 and _np.allclose(aucs, _a), 'The AUC values are wrong: random_state = 0, 1, 2, 3, 4'\nassert abs(auc_mean - _np.mean(_a)) < 1e-9 and abs(auc_std - _np.std(_a)) < 1e-9, 'auc_mean = np.mean(aucs), auc_std = np.std(aucs)'"
    }
   }
  ]
 },
 "dc-5": {
  "pr": [
   {
    "title": "Pipeline accuracy",
    "prompt": "<p><code>pre</code> is ready. Create <code>pipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])</code> and train it on train. Write the test accuracy to <code>acc_lr</code>.</p>",
    "hints": [
     "<code>pipe.fit(X_train, y_train)</code>",
     "<code>pipe.score(X_test, y_test)</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nassert isinstance(pipe, _P) and hasattr(pipe.named_steps['model'], 'coef_'), \"pipe — a trained Pipeline, steps 'pre' and 'model'\"\nassert abs(acc_lr - pipe.score(X_test, y_test)) < 1e-9 and 0.7 < acc_lr < 0.9, 'acc_lr = pipe.score(X_test, y_test)'"
    }
   },
   {
    "title": "Feature names",
    "prompt": "<p>The Pipeline <code>pipe</code> is trained. Write the feature names produced by the <code>pre</code> step to the list <code>names</code> (<code>named_steps['pre'].get_feature_names_out()</code>). Write their number to <code>n_features</code>.</p>",
    "hints": [
     "<code>pipe.named_steps['pre']</code>"
    ],
    "check": {
     "tests": "assert n_features == 9, 'n_features = 9: 6 numeric + 3 plans'\nassert list(names) == list(pipe.named_steps['pre'].get_feature_names_out()), 'names — the result of get_feature_names_out()'\nassert 'cat__plan_premium' in names, 'The plan columns are called cat__plan_...'"
    }
   },
   {
    "title": "Review of the probabilities",
    "prompt": "<p><code>proba</code> is ready. Write the smallest and the largest probability to <code>p_min</code> and <code>p_max</code>, and the number of probabilities greater than or equal to 0.5 to <code>n_high</code>. <code>n_high</code> must equal <code>pipe.predict(X_test).sum()</code>.</p>",
    "hints": [
     "<code>(proba &gt;= 0.5).sum()</code>"
    ],
    "check": {
     "tests": "assert abs(p_min - proba.min()) < 1e-12 and abs(p_max - proba.max()) < 1e-12, 'p_min, p_max — proba.min(), proba.max()'\nassert n_high == int(pipe.predict(X_test).sum()), 'n_high = (proba >= 0.5).sum(): predict uses the 0.5 threshold'"
    }
   },
   {
    "title": "Balanced weight",
    "prompt": "<p>A second Pipeline <code>pipe_bal</code>: the same <code>pre</code> + <code>LogisticRegression(max_iter=1000, class_weight='balanced')</code>. Write the test recall to <code>rec_plain</code> (for <code>pipe</code>) and <code>rec_bal</code>, and the number of warnings to <code>n_plain</code> and <code>n_bal</code>.</p>",
    "hints": [
     "A new Pipeline with the same <code>pre</code>.",
     "<code>recall_score(y_test, model.predict(X_test))</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import recall_score as _rs\n_b = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000, class_weight='balanced'))]).fit(X_train, y_train)\nassert pipe_bal.named_steps['model'].class_weight == 'balanced', \"pipe_bal must have class_weight='balanced'\"\nassert abs(rec_bal - _rs(y_test, _b.predict(X_test))) < 1e-9 and abs(rec_plain - _rs(y_test, pipe.predict(X_test))) < 1e-9, 'The recall values are wrong'\nassert n_bal == int(_b.predict(X_test).sum()) and n_bal > n_plain, 'The balanced model gives more warnings'\nassert rec_bal > rec_plain, 'The balanced model has the higher recall'"
    }
   },
   {
    "title": "Regularization strength",
    "prompt": "<p><code>C</code> is the inverse of the regularization (a small C means strong constraint). For <code>C</code> ∈ [0.01, 1, 100] train a Pipeline (<code>pre</code> + <code>LogisticRegression(C=C, max_iter=1000)</code>), write the test AUC into <code>auc_by_C</code>, and the sum of the absolute values of the coefficients into <code>coef_size</code>.</p>",
    "hints": [
     "Loop: <code>for C in [0.01, 1, 100]:</code>",
     "<code>abs(m.named_steps['model'].coef_).sum()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _LR(C=0.01, max_iter=1000))]).fit(X_train, y_train)\nassert sorted(auc_by_C) == [0.01, 1, 100] and sorted(coef_size) == [0.01, 1, 100], 'Keys: 0.01, 1, 100'\nassert abs(auc_by_C[0.01] - _ra(y_test, _m.predict_proba(X_test)[:, 1])) < 1e-6, 'The AUC for C=0.01 is wrong'\nassert abs(coef_size[0.01] - abs(_m.named_steps['model'].coef_).sum()) < 1e-6, 'coef_size = abs(coef_).sum()'\nassert coef_size[0.01] < coef_size[1] < coef_size[100], 'As C gets smaller, the coefficients get smaller'"
    }
   },
   {
    "title": "City as a feature",
    "prompt": "<p>Does the city help the model? Create <code>X2 = df[num + ['plan', 'city']]</code> and split it with the same parameters (<code>test_size=0.25</code>, <code>stratify=y</code>, <code>random_state=0</code>). Build a new <code>pre2</code> and a Pipeline on <code>cat2 = ['plan', 'city']</code>, and write the test AUC to <code>auc_city</code>. The AUC of the original model is <code>auc_base</code>.</p>",
    "hints": [
     "The split will be the same: the same <code>y</code>, <code>stratify</code>, <code>random_state</code>.",
     "Pass <code>['plan', 'city']</code> to the new ColumnTransformer."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\nfrom sklearn.model_selection import train_test_split as _tts\n_a, _b, _c, _d = _tts(df[num + ['plan', 'city']], y, test_size=0.25, stratify=y, random_state=0)\n_m = _Pl([('pre', _pre(['plan', 'city'])), ('model', _LR(max_iter=1000))]).fit(_a, _c)\n_ac = _ra(_d, _m.predict_proba(_b)[:, 1])\nassert abs(auc_base - _ra(y_test, proba)) < 1e-9, 'auc_base — the test AUC of the original pipe'\nassert abs(auc_city - _ac) < 1e-6, f'auc_city ≈ {_ac:.4f}: cat2 = [\"plan\", \"city\"], the same split'"
    }
   },
   {
    "title": "Checking calibration",
    "prompt": "<p>Can the probabilities be trusted? On the test set split <code>proba</code> into groups with <code>pd.cut</code>: the bins <code>[0, 0.1, 0.2, 0.4, 0.6, 1]</code>. The DataFrame <code>calib</code>: index — the group, columns <code>mean_proba</code> (the mean probability in the group), <code>churn_rate</code> (the real share), <code>n</code> (the number of subscribers). Use <code>observed=True</code>.</p>",
    "hints": [
     "First a table: <code>pd.DataFrame({'proba': proba, 'y': y_test.values})</code>",
     "Named aggregation: <code>.agg(mean_proba=('proba', 'mean'), ...)</code>"
    ],
    "check": {
     "tests": "_t = pd.DataFrame({'proba': proba, 'y': y_test.values})\n_t['bin'] = pd.cut(_t['proba'], bins=[0, 0.1, 0.2, 0.4, 0.6, 1])\n_g = _t.groupby('bin', observed=True).agg(mean_proba=('proba', 'mean'), churn_rate=('y', 'mean'), n=('y', 'size'))\nassert isinstance(calib, pd.DataFrame) and {'mean_proba', 'churn_rate', 'n'} <= set(calib.columns), 'The columns of calib: mean_proba, churn_rate, n'\nassert len(calib) == len(_g) and int(calib['n'].sum()) == 150, 'All 150 test subscribers must fall into the groups'\nassert (abs(calib['mean_proba'].values - _g['mean_proba'].values) < 1e-9).all() and (abs(calib['churn_rate'].values - _g['churn_rate'].values) < 1e-9).all(), 'The values are wrong: the bins [0, 0.1, 0.2, 0.4, 0.6, 1]'\nassert calib['churn_rate'].iloc[-1] > calib['churn_rate'].iloc[0], 'In the group with a high probability the real share is high too'"
    }
   },
   {
    "title": "CV and test agreement",
    "prompt": "<p>On train compute the 5-fold ROC AUC of <code>pipe</code> (<code>cross_val_score</code>), write the mean into <code>cv_mean</code> and the SD into <code>cv_std</code>. The test AUC is <code>test_auc</code>. Does the test result fall within <code>cv_mean ± 2·cv_std</code> — <code>consistent</code> (bool).</p>",
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
    "title": "Forest pipeline",
    "prompt": "<p>The <code>rf</code> Pipeline is ready (50 trees). Train it on train and write the test ROC AUC to <code>auc_rf</code>.</p>",
    "hints": [
     "<code>rf.predict_proba(X_test)[:, 1]</code>"
    ],
    "check": {
     "tests": "assert hasattr(rf.named_steps['model'], 'estimators_'), 'rf is not trained: rf.fit(X_train, y_train)'\nassert abs(auc_rf - roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])) < 1e-9 and 0.7 < auc_rf < 0.9, 'auc_rf — the test AUC from predict_proba'"
    }
   },
   {
    "title": "What the forest considers important",
    "prompt": "<p>The model <code>rf</code> is trained. Write the <code>feature_importances_</code> with the feature names (<code>get_feature_names_out()</code> of <code>pre</code>) into the Series <code>imp</code>, in descending order. Write the most important feature to <code>top</code>.</p>",
    "hints": [
     "<code>rf.named_steps['model'].feature_importances_</code>"
    ],
    "check": {
     "tests": "_i = pd.Series(rf.named_steps['model'].feature_importances_, index=rf.named_steps['pre'].get_feature_names_out())\nassert isinstance(imp, pd.Series) and len(imp) == 9, 'imp — a Series over 9 features'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Sort in descending order'\nassert top == _i.idxmax(), f'top = {_i.idxmax()} must be'"
    }
   },
   {
    "title": "Forest CV scores",
    "prompt": "<p>Write the 3-fold ROC AUC scores of <code>rf</code> on train into <code>scores</code>, and their mean into <code>cv_mean</code>.</p>",
    "hints": [
     "<code>cross_val_score(rf, X_train, y_train, cv=3, scoring='roc_auc')</code>"
    ]
   },
   {
    "title": "Leaf size grid",
    "prompt": "<p>Train <code>GridSearchCV(rf, {'model__min_samples_leaf': [1, 5, 20]}, cv=3, scoring='roc_auc')</code> on train, named <code>grid</code>. Write the best value to <code>best_leaf</code>, the CV AUC to <code>best_auc</code>, and the test AUC (<code>grid.score</code>) to <code>test_auc</code>.</p>",
    "hints": [
     "The parameter name: <code>'model__min_samples_leaf'</code>"
    ],
    "check": {
     "tests": "from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G) and hasattr(grid, 'best_params_') and len(grid.cv_results_['params']) == 3, 'grid — a trained GridSearchCV over 3 values'\nassert grid.scoring == 'roc_auc', \"Set scoring='roc_auc'\"\nassert best_leaf == grid.best_params_['model__min_samples_leaf'] and abs(best_auc - grid.best_score_) < 1e-12, 'best_leaf, best_auc — the best result of grid'\nassert abs(test_auc - grid.score(X_test, y_test)) < 1e-9, 'test_auc = grid.score(X_test, y_test)'"
    }
   },
   {
    "title": "Comparing with boosting",
    "prompt": "<p>A third candidate: <code>pre</code> + <code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code>. Write the mean 3-fold ROC AUC on train of it and of the logistic Pipeline into <code>cv_hgb</code> and <code>cv_lr</code>. The better one goes to <code>better</code>: <code>'boosting'</code> or <code>'logreg'</code>.</p>",
    "hints": [
     "Both Pipelines start with <code>pre</code>.",
     "<code>cross_val_score(..., cv=3, scoring='roc_auc').mean()</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.model_selection import cross_val_score as _cvs\n_l = _cvs(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X_train, y_train, cv=3, scoring='roc_auc').mean()\nassert abs(cv_lr - _l) < 1e-6, f\"cv_lr ≈ {_l:.4f}: cv=3, scoring='roc_auc', X_train\"\nassert 0.7 < cv_hgb < 0.9, f'cv_hgb ≈ 0.78, yours is {cv_hgb:.3f}'\nassert better == ('boosting' if cv_hgb > cv_lr else 'logreg'), \"better: 'boosting' or 'logreg'\""
    }
   },
   {
    "title": "Stability of the forest",
    "prompt": "<p>How much does the forest's result depend on randomness? For <code>random_state</code> ∈ [0, 1, 2] train <code>pre</code> + <code>RandomForestClassifier(n_estimators=50, random_state=rs)</code> and write the test AUC into the list <code>aucs</code>. <code>spread = max(aucs) - min(aucs)</code>.</p>",
    "hints": [
     "Loop: <code>for rs in [0, 1, 2]:</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _RF(n_estimators=50, random_state=1))]).fit(X_train, y_train)\nassert len(aucs) == 3, 'aucs has 3 values'\nassert abs(aucs[1] - _ra(y_test, _m.predict_proba(X_test)[:, 1])) < 1e-9, 'The AUC for random_state=1 is wrong (order: 0, 1, 2)'\nassert abs(spread - (max(aucs) - min(aucs))) < 1e-12 and spread > 0, 'spread = max(aucs) - min(aucs)'"
    }
   },
   {
    "title": "Table of three models",
    "prompt": "<p>The model selection table <code>table</code>: index — <code>'logreg'</code>, <code>'forest'</code> (50 trees, <code>random_state=0</code>), <code>'boosting'</code> (<code>HistGradientBoostingClassifier(max_iter=100, learning_rate=0.05, random_state=0)</code>); columns — <code>cv_auc</code> (3-fold on train) and <code>test_auc</code>. Choose by CV only: <code>chosen</code> — the model with the highest <code>cv_auc</code>.</p>",
    "hints": [
     "A dictionary of models and a loop; put each model into a new Pipeline.",
     "<code>pd.DataFrame(rows).T</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.metrics import roc_auc_score as _ra\n_l = _Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]).fit(X_train, y_train)\nassert isinstance(table, pd.DataFrame) and set(table.index) == {'logreg', 'forest', 'boosting'}, \"Index: 'logreg', 'forest', 'boosting'\"\nassert {'cv_auc', 'test_auc'} <= set(table.columns), 'Columns: cv_auc, test_auc'\nassert abs(table.loc['logreg', 'test_auc'] - _ra(y_test, _l.predict_proba(X_test)[:, 1])) < 1e-6, 'The logreg test_auc is wrong'\nassert ((table['cv_auc'] > 0.7) & (table['cv_auc'] < 0.9)).all(), 'The cv_auc values are in the range 0.7–0.9'\nassert chosen == table['cv_auc'].idxmax(), 'chosen — the model with the highest cv_auc (do not choose by test)'"
    }
   },
   {
    "title": "Sign of overfitting",
    "prompt": "<p>A deep forest memorizes the train set. For <code>max_depth</code> ∈ [3, None] and the Pipeline <code>pre</code> + <code>RandomForestClassifier(n_estimators=50, max_depth=d, random_state=0)</code> write the difference between the train AUC and the test AUC into the dictionary <code>gaps</code> (the key is <code>d</code>), and the test AUC into <code>test_aucs</code>.</p>",
    "hints": [
     "Train AUC: <code>roc_auc_score(y_train, m.predict_proba(X_train)[:, 1])</code>"
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\nfrom sklearn.ensemble import RandomForestClassifier as _RF\nfrom sklearn.metrics import roc_auc_score as _ra\n_m = _Pl([('pre', _pre()), ('model', _RF(n_estimators=50, max_depth=None, random_state=0))]).fit(X_train, y_train)\n_g = _ra(y_train, _m.predict_proba(X_train)[:, 1]) - _ra(y_test, _m.predict_proba(X_test)[:, 1])\nassert set(gaps) == {3, None} and set(test_aucs) == {3, None}, 'Keys: 3, None'\nassert abs(gaps[None] - _g) < 1e-9, f'For max_depth=None the difference ≈ {_g:.3f}: train AUC − test AUC'\nassert gaps[None] > gaps[3], 'A deep forest has a larger train/test difference'"
    }
   }
  ]
 },
 "dc-7": {
  "pr": [
   {
    "title": "Value of one offer",
    "prompt": "<p>The expected profit of an offer to a subscriber with the probability of leaving <code>p</code> is <code>p × 10000 − (1 − p) × 2000</code> (TP +10,000 ₸, FP −2,000 ₸). Write the function <code>offer_value(p)</code>.</p><p>For example, <code>offer_value(0.5)</code> → <code>4000</code>.</p>",
    "hints": [
     "<code>p * 10000 - (1 - p) * 2000</code>"
    ],
    "check": {
     "tests": "assert offer_value(0.5) is not None and abs(offer_value(0.5) - 4000) < 1e-9, 'offer_value(0.5) must return 4000'\nassert abs(offer_value(0)) - 2000 < 1e-9 and offer_value(0) < 0, 'p = 0: −2000'\nassert abs(offer_value(1 / 6)) < 1e-9, 'The zero-profit point: p = 1/6 ≈ 0.167'"
    }
   },
   {
    "title": "Number of offers by threshold",
    "prompt": "<p><code>proba</code> is ready. Write the number of subscribers who get an offer at the threshold 0.3 to <code>n_offers</code>, and the number of real leavers among them to <code>n_hits</code>.</p>",
    "hints": [
     "Mask: <code>flag = proba &gt;= 0.3</code>",
     "<code>y_test.values[flag].sum()</code>"
    ],
    "check": {
     "tests": "_f = proba >= 0.3\nassert n_offers == int(_f.sum()), f'n_offers = {int(_f.sum())} must be'\nassert n_hits == int(y_test.values[_f].sum()), f'n_hits = {int(y_test.values[_f].sum())} must be: the leavers among those who got an offer'"
    }
   },
   {
    "title": "Profit of three thresholds",
    "prompt": "<p>The function <code>profit</code> and <code>proba</code> are ready. For the thresholds ∈ [0.2, 0.3, 0.5] write the test profit into the dictionary <code>profits</code>.</p>",
    "hints": [
     "<code>profit(y_test, (proba &gt;= t).astype(int))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert sorted(profits) == [0.2, 0.3, 0.5], 'Keys: 0.2, 0.3, 0.5'\nassert all(profits[_t] == _profit(y_test, (proba >= _t).astype(int)) for _t in profits), 'The profit is wrong: profit(y_test, (proba >= t).astype(int))'"
    }
   },
   {
    "title": "Expected and real profit",
    "prompt": "<p>A decision by probability: offers only to the subscribers whose expected profit is positive (<code>proba × 10000 − (1 − proba) × 2000 &gt; 0</code>). Write the sum of their expected profit into <code>expected</code> and the real profit on test (<code>profit</code>) into <code>realized</code>.</p>",
    "hints": [
     "<code>ev = proba * 10000 - (1 - proba) * 2000</code>",
     "<code>profit(y_test, (ev &gt; 0).astype(int))</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_ev = proba * 10000 - (1 - proba) * 2000\nassert abs(expected - _ev[_ev > 0].sum()) < 1e-6, 'expected — the sum of the positive expected profits'\nassert realized == _profit(y_test, (_ev > 0).astype(int)), 'realized — the real profit when sending to those subscribers'"
    }
   },
   {
    "title": "Budget: 40 offers",
    "prompt": "<p>The budget covers only 40 offers. Write into <code>profit_top40</code> the profit of sending offers to the 40 subscribers on test with the highest probability. For comparison, the profit at the 0.5 threshold — <code>profit_05</code>.</p>",
    "hints": [
     "<code>np.argsort(-proba)[:40]</code> — the 40 highest indices.",
     "Create a 0/1 array and put 1 at those indices."
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_s = _np.zeros(len(proba), dtype=int)\n_s[_np.argsort(-proba)[:40]] = 1\nassert profit_top40 == _profit(y_test, _s), f'profit_top40 = {_profit(y_test, _s)} ₸ must be: the 40 highest probabilities'\nassert profit_05 == _profit(y_test, (proba >= 0.5).astype(int)), 'profit_05 — the profit at the 0.5 threshold'"
    }
   },
   {
    "title": "Threshold table",
    "prompt": "<p>A table for the presentation: the DataFrame <code>table</code>, index — the threshold <code>[0.1, 0.2, 0.3, 0.4, 0.5]</code>, columns <code>offers</code> (number of offers), <code>hits</code> (leavers caught), <code>profit</code> (₸). Write the threshold with the largest profit to <code>best_row</code>.</p>",
    "hints": [
     "A list of dictionaries → <code>pd.DataFrame(rows).set_index('threshold')</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert isinstance(table, pd.DataFrame) and [round(float(_i), 2) for _i in table.index] == [0.1, 0.2, 0.3, 0.4, 0.5], 'The index — the thresholds: 0.1, ..., 0.5'\nassert {'offers', 'hits', 'profit'} <= set(table.columns), 'Columns: offers, hits, profit'\nfor _t in [0.1, 0.2, 0.3, 0.4, 0.5]:\n    _pr = (proba >= _t).astype(int)\n    _row = table.loc[[_i for _i in table.index if abs(float(_i) - _t) < 1e-9][0]]\n    assert int(_row['offers']) == int(_pr.sum()) and int(_row['hits']) == int(((_pr == 1) & (y_test.values == 1)).sum()) and int(_row['profit']) == _profit(y_test, _pr), f'The row for the threshold {_t} is wrong'\nassert abs(float(best_row) - float(table['profit'].idxmax())) < 1e-9, 'best_row — the threshold with the largest profit'"
    }
   },
   {
    "title": "Choosing the threshold with CV",
    "prompt": "<p>Choosing the threshold on the test set is cheating. Get honest probabilities on train with <code>cross_val_predict(pipe, X_train, y_train, cv=5, method='predict_proba')[:, 1]</code> and write them to <code>p_tr</code>. From the thresholds <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) choose the threshold <code>cv_th</code> with the largest profit on <b>train</b>. Then write the profit on test at this threshold to <code>test_profit</code>.</p>",
    "hints": [
     "<code>cross_val_predict(..., method='predict_proba')[:, 1]</code>",
     "<code>np.argmax(train_profits)</code> — the position of the best threshold."
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nfrom sklearn.model_selection import cross_val_predict as _cvp\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\ndef _pre(_cat=None):\n    return _CT([('num', _Pl([('imp', _SI(strategy='median')), ('sc', _SS())]), num), ('cat', _OH(handle_unknown='ignore'), _cat or ['plan'])])\n_pt = _cvp(_Pl([('pre', _pre()), ('model', _LR(max_iter=1000))]), X_train, y_train, cv=5, method='predict_proba')[:, 1]\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_ps = [_profit(y_train, (_pt >= _t).astype(int)) for _t in _ths]\n_ct = _ths[int(_np.argmax(_ps))]\nassert len(p_tr) == 450, 'p_tr — the CV probabilities for the 450 train subscribers'\nassert cv_th is not None and abs(cv_th - _ct) < 1e-9, f'cv_th = {_ct} must be: the threshold with the largest profit on train'\nassert test_profit == _profit(y_test, (proba >= _ct).astype(int)), 'test_profit — the profit on test at the threshold cv_th'"
    }
   },
   {
    "title": "Effect of the offer price",
    "prompt": "<p>How does the threshold change when the offer becomes more expensive? Write the function <code>profit_c(y_true, y_pred, cost)</code> (TP +10,000, FP −<code>cost</code>). For <code>cost</code> ∈ [1000, 2000, 4000] write into <code>best_th_by_cost</code> the threshold from <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) with the largest profit on test (on a tie, the smallest).</p>",
    "hints": [
     "Copy the <code>profit</code> function and replace 2000 with <code>cost</code>.",
     "<code>ths[int(np.argmax(ps))]</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\nassert profit_c([1, 0, 1], [1, 1, 1], 3000) == 17000, 'profit_c([1, 0, 1], [1, 1, 1], 3000) = 2 × 10000 − 3000 = 17000'\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_b = {_c: _ths[int(_np.argmax([_profit(y_test, (proba >= _t).astype(int), 10000, _c) for _t in _ths]))] for _c in [1000, 2000, 4000]}\nassert sorted(best_th_by_cost) == [1000, 2000, 4000], 'Keys: 1000, 2000, 4000'\nassert all(abs(best_th_by_cost[_c] - _b[_c]) < 1e-9 for _c in _b), f'Thresholds: {_b}'\nassert best_th_by_cost[1000] <= best_th_by_cost[4000], 'If the offer becomes more expensive, the threshold goes up'"
    }
   }
  ]
 },
 "dc-8": {
  "pr": [
   {
    "title": "Contract coefficient",
    "prompt": "<p><code>pipe</code> is trained. Write the coefficients with the feature names into the Series <code>coefs</code>. Write the coefficient of <code>num__has_contract</code> to <code>contract_coef</code>: if it is negative, a contract lowers the risk of leaving.</p>",
    "hints": [
     "<code>pipe.named_steps['model'].coef_[0]</code>"
    ],
    "check": {
     "tests": "_c = pd.Series(pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nassert isinstance(coefs, pd.Series) and len(coefs) == 9 and list(coefs.index) == list(_c.index), 'coefs — 9 features, the index is get_feature_names_out()'\nassert abs(contract_coef - _c['num__has_contract']) < 1e-9 and contract_coef < 0, \"contract_coef = coefs['num__has_contract'] (negative)\""
    }
   },
   {
    "title": "Three strong features",
    "prompt": "<p>The features are scaled, so the coefficients can be compared by their absolute values. Write the names of the three features with the largest absolute coefficient to the list <code>top3</code> (in descending order).</p>",
    "hints": [
     "<code>coefs.abs().sort_values(ascending=False).index[:3]</code>"
    ]
   },
   {
    "title": "Risk by plan",
    "prompt": "<p>Take the test rows from the full table: <code>te = df.loc[X_test.index].copy()</code>, <code>te['proba'] = proba</code>. Write the mean predicted probability by plan to <code>proba_by_plan</code>, and the real churn share to <code>rate_by_plan</code>.</p>",
    "hints": [
     "<code>te.groupby('plan')['proba'].mean()</code>"
    ],
    "check": {
     "tests": "_t = df.loc[X_test.index]\nassert all(abs(proba_by_plan[_p] - pd.Series(proba, index=X_test.index)[_t['plan'] == _p].mean()) < 1e-9 for _p in ['basic', 'standard', 'premium']), 'proba_by_plan — the mean of proba by plan'\nassert all(abs(rate_by_plan[_p] - _t.loc[_t['plan'] == _p, 'churned'].mean()) < 1e-9 for _p in ['basic', 'standard', 'premium']), 'rate_by_plan — the real churned share by plan'"
    }
   },
   {
    "title": "AUC by city",
    "prompt": "<p>Does the model separate the subscribers equally well in every city? In the table <code>te</code> compute <code>roc_auc_score(churned, proba)</code> for each city and write it to the Series <code>city_auc</code>. Write the city with the lowest AUC to <code>weakest_city</code>.</p>",
    "hints": [
     "<code>for c, g in te.groupby('city')</code>",
     "<code>pd.Series({...})</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\n_t = df.loc[X_test.index].copy()\n_t['proba'] = proba\n_a = pd.Series({_c: _ra(_g['churned'], _g['proba']) for _c, _g in _t.groupby('city')})\nassert isinstance(city_auc, pd.Series) and len(city_auc) == 5, 'city_auc — a Series over 5 cities'\nassert all(abs(city_auc[_c] - _a[_c]) < 1e-9 for _c in _a.index), 'The AUC of each city is wrong: only the test rows of that city'\nassert weakest_city == _a.idxmin(), f'weakest_city = {_a.idxmin()} must be'"
    }
   },
   {
    "title": "Warnings by city",
    "prompt": "<p>Threshold 0.3. Add the column <code>flag</code> to <code>te</code>. The DataFrame <code>city_check</code>: index — city, columns <code>offer_rate</code> (the mean of <code>flag</code>) and <code>churn_rate</code> (the mean of <code>churned</code>). Write to <code>over_city</code> the city where the share of warnings exceeds the real share the most (the largest <code>offer_rate − churn_rate</code>).</p>",
    "hints": [
     "<code>te.groupby('city').agg(offer_rate=('flag', 'mean'), churn_rate=('churned', 'mean'))</code>"
    ],
    "check": {
     "tests": "_t = df.loc[X_test.index].copy()\n_t['flag'] = (proba >= 0.3).astype(int)\n_g = _t.groupby('city').agg(offer_rate=('flag', 'mean'), churn_rate=('churned', 'mean'))\nassert isinstance(city_check, pd.DataFrame) and {'offer_rate', 'churn_rate'} <= set(city_check.columns) and len(city_check) == 5, 'city_check: 5 cities, offer_rate and churn_rate'\nassert all(abs(city_check.loc[_c, 'offer_rate'] - _g.loc[_c, 'offer_rate']) < 1e-9 for _c in _g.index), 'offer_rate is wrong: the threshold is 0.3'\nassert over_city == (_g['offer_rate'] - _g['churn_rate']).idxmax(), f\"over_city = {(_g['offer_rate'] - _g['churn_rate']).idxmax()} must be\""
    }
   },
   {
    "title": "Reasons for one subscriber",
    "prompt": "<p>For the test subscriber with the <b>highest</b> probability write the contribution of each feature to the logit (<code>масштабталған мән × коэффициент</code>) into the Series <code>contrib</code> (the index is the feature names). The sum of the contributions plus <code>intercept_</code> equals their logit. Write the feature that raises the risk the most (the largest positive contribution) to <code>main_reason</code>.</p>",
    "hints": [
     "The subscriber: <code>i = int(np.argmax(proba))</code>, their row <code>X_test.iloc[[i]]</code>",
     "<code>pipe.named_steps['pre'].transform(...)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\n_i = int(_np.argmax(proba))\n_x = _np.asarray(pipe.named_steps['pre'].transform(X_test.iloc[[_i]]))[0]\n_c = pd.Series(_x * pipe.named_steps['model'].coef_[0], index=pipe.named_steps['pre'].get_feature_names_out())\nassert isinstance(contrib, pd.Series) and len(contrib) == 9, 'contrib — the contributions of 9 features'\nassert all(abs(contrib.values - _c.values) < 1e-9), 'The contributions are wrong: the subscriber with the highest proba (np.argmax), transform × coef_[0]'\nassert abs(1 / (1 + _np.exp(-(contrib.sum() + pipe.named_steps['model'].intercept_[0]))) - proba[_i]) < 1e-6, 'sigmoid(contrib.sum() + intercept) must equal proba'\nassert main_reason == _c.idxmax(), f'main_reason = {_c.idxmax()} must be'"
    }
   },
   {
    "title": "Recall by age group",
    "prompt": "<p>Threshold 0.3. Add the column <code>age_band</code> to <code>te</code> (<code>pd.cut</code>, the bins <code>[17, 30, 45, 65]</code>, the labels <code>'18-30'</code>, <code>'31-45'</code>, <code>'46-65'</code>). Among the leavers, write the recall (the share of <code>flag</code>) for each age group to <code>band_recall</code> (<code>observed=True</code>), and the lowest group as text to <code>worst_band</code>.</p>",
    "hints": [
     "First the leavers: <code>te[te['churned'] == 1]</code>",
     "<code>groupby('age_band', observed=True)['flag'].mean()</code>"
    ],
    "check": {
     "tests": "_t = df.loc[X_test.index].copy()\n_t['flag'] = (proba >= 0.3).astype(int)\n_t['age_band'] = pd.cut(_t['age'], bins=[17, 30, 45, 65], labels=['18-30', '31-45', '46-65'])\n_r = _t[_t['churned'] == 1].groupby('age_band', observed=True)['flag'].mean()\nassert len(band_recall) == len(_r) and all(abs(band_recall.values - _r.values) < 1e-9), 'The recall only among the leavers (churned == 1) by age group'\nassert worst_band == str(_r.idxmin()), f'worst_band = {_r.idxmin()} must be'"
    }
   },
   {
    "title": "Effect of calls",
    "prompt": "<p>Partial dependence: for <code>support_calls</code> ∈ 0…5 in a copy of <code>X_test</code> set the number of calls of all subscribers to this value, and write the mean probability into the dictionary <code>calls_curve</code>. Write into <code>ratio_5_0</code> how many times the mean probability grows when the calls grow from 0 to 5.</p>",
    "hints": [
     "<code>Xc = X_test.copy()</code>, <code>Xc['support_calls'] = k</code>"
    ],
    "check": {
     "tests": "_r = {}\nfor _k in range(6):\n    _X = X_test.copy()\n    _X['support_calls'] = _k\n    _r[_k] = pipe.predict_proba(_X)[:, 1].mean()\nassert sorted(calls_curve) == list(range(6)), 'Keys: 0, 1, 2, 3, 4, 5'\nassert all(abs(calls_curve[_k] - _r[_k]) < 1e-9 for _k in _r), 'The values are wrong: in the copy support_calls = k'\nassert all(calls_curve[_k] < calls_curve[_k + 1] for _k in range(5)), 'The risk grows as the number of calls grows'\nassert abs(ratio_5_0 - _r[5] / _r[0]) < 1e-9, 'ratio_5_0 = calls_curve[5] / calls_curve[0]'\nassert X_test['support_calls'].nunique() > 1, 'Do not change X_test: use .copy()'"
    }
   }
  ]
 },
 "dc-10": {
  "pr": [
   {
    "title": "Percent format",
    "prompt": "<p>The numbers on a slide must be easy to read. The function <code>pct(x)</code> must turn a share into a percentage with one decimal place.</p><p>For example, <code>pct(0.2583)</code> → <code>'25.8%'</code>.</p>",
    "hints": [
     "f-string: <code>f'{x * 100:.1f}%'</code>"
    ],
    "check": {
     "tests": "assert pct(0.2583) == '25.8%', \"pct(0.2583) must return '25.8%'\"\nassert pct(1) == '100.0%', \"pct(1) = '100.0%'\"\nassert pct(0.05) == '5.0%', \"pct(0.05) = '5.0%'\""
    }
   },
   {
    "title": "Tenge format",
    "prompt": "<p>The function <code>tenge(n)</code> must turn an integer into a text in tenge, where the thousands are separated by a space.</p><p>For example, <code>tenge(168000)</code> → <code>'168 000 ₸'</code>.</p>",
    "hints": [
     "<code>f'{n:,}'</code> separates thousands with a comma, then <code>.replace(',', ' ')</code>."
    ],
    "check": {
     "tests": "assert tenge(168000) == '168 000 ₸', \"tenge(168000) must return '168 000 ₸'\"\nassert tenge(950) == '950 ₸', \"tenge(950) = '950 ₸'\"\nassert tenge(11276400) == '11 276 400 ₸', \"tenge(11276400) = '11 276 400 ₸'\"\nassert tenge(-6000) == '-6 000 ₸', \"A negative number: '-6 000 ₸'\""
    }
   },
   {
    "title": "Key numbers",
    "prompt": "<p>For the first slide, the dictionary <code>kpis</code>: <code>'n_test'</code> (test subscribers), <code>'n_churn'</code> (the leavers among them), <code>'churn_rate'</code> (the share, 3 decimal places), <code>'auc'</code> (the test ROC AUC, 3 decimal places).</p>",
    "hints": [
     "<code>round(roc_auc_score(y_test, proba), 3)</code>"
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _ra\nassert isinstance(kpis, dict) and {'n_test', 'n_churn', 'churn_rate', 'auc'} <= set(kpis), 'Keys: n_test, n_churn, churn_rate, auc'\nassert kpis['n_test'] == 150 and kpis['n_churn'] == 39, 'n_test = 150, n_churn = 39'\nassert kpis['churn_rate'] == 0.26, 'churn_rate = round(39 / 150, 3) = 0.26'\nassert kpis['auc'] == round(_ra(y_test, proba), 3), 'auc — to 3 decimal places'"
    }
   },
   {
    "title": "Top-k strategies",
    "prompt": "<p>The business asks: \"how many subscribers do we call?\" For <code>k</code> ∈ [20, 40, 60] write into the DataFrame <code>topk</code> the profit of sending offers to the <code>k</code> subscribers with the highest probability: index — <code>k</code>, columns <code>hits</code> (leavers caught) and <code>profit</code>. The <code>k</code> with the largest profit is <code>best_k</code>.</p>",
    "hints": [
     "<code>order = np.argsort(-proba)</code> — once.",
     "<code>pd.DataFrame(rows).T</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_o = _np.argsort(-proba)\n_r = {}\nfor _k in [20, 40, 60]:\n    _s = _np.zeros(len(proba), dtype=int)\n    _s[_o[:_k]] = 1\n    _r[_k] = _profit(y_test, _s)\nassert isinstance(topk, pd.DataFrame) and sorted(int(_i) for _i in topk.index) == [20, 40, 60], 'Index: 20, 40, 60'\nassert all(int(topk.loc[_k, 'profit']) == _r[_k] for _k in _r), f'The profit is wrong: {_r}'\nassert all(int(topk.loc[_k, 'hits']) == int(y_test.values[_o[:_k]].sum()) for _k in _r), 'hits — the leavers among the chosen k subscribers'\nassert best_k == max(_r, key=_r.get), f'best_k = {max(_r, key=_r.get)} must be'"
    }
   },
   {
    "title": "Slide headline",
    "prompt": "<p>Make the slide headline automatically. The function <code>headline(profit_model, profit_all)</code>: if the difference is positive, return <code>'Модель барлығына жіберуден X көп пайда береді'</code>, otherwise <code>'Модель барлығына жіберуден X аз пайда береді'</code>, where X is the absolute value of the difference in the <code>tenge</code> format.</p><p>For example, <code>headline(214000, 168000)</code> → <code>'Модель барлығына жіберуден 46 000 ₸ көп пайда береді'</code>.</p>",
    "hints": [
     "<code>diff = profit_model - profit_all</code>",
     "<code>tenge(abs(diff))</code>"
    ],
    "check": {
     "tests": "assert headline(214000, 168000) == 'Модель барлығына жіберуден 46 000 ₸ көп пайда береді', \"headline(214000, 168000) is wrong\"\nassert headline(100000, 168000) == 'Модель барлығына жіберуден 68 000 ₸ аз пайда береді', \"If the difference is negative: '... 68 000 ₸ аз пайда береді'\"\nassert headline(1500000, 168000) == 'Модель барлығына жіберуден 1 332 000 ₸ көп пайда береді', 'Millions are separated by a space too'"
    }
   },
   {
    "title": "Profit growth",
    "prompt": "<p>Check the thresholds <code>np.arange(0.05, 0.95, 0.05)</code> (<code>round(t, 2)</code>) on the test set and write the largest profit into <code>best_profit</code>. The profit of the \"send to everyone\" strategy is <code>profit_all</code>. <code>uplift = best_profit - profit_all</code>, and <code>uplift_pct</code> is its percentage of <code>profit_all</code> (1 decimal place).</p>",
    "hints": [
     "Everyone: <code>np.ones(len(y_test), dtype=int)</code>",
     "<code>round(uplift / profit_all * 100, 1)</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_ths = [round(_t, 2) for _t in _np.arange(0.05, 0.95, 0.05)]\n_b = max(_profit(y_test, (proba >= _t).astype(int)) for _t in _ths)\nassert best_profit == _b, f'best_profit = {_b} ₸ must be'\nassert profit_all == 168000, 'profit_all = 168 000 ₸'\nassert uplift == _b - 168000 and uplift_pct == round((_b - 168000) / 168000 * 100, 1), 'uplift = best_profit − profit_all; uplift_pct — the percentage, 1 decimal place'"
    }
   },
   {
    "title": "Slide by plan",
    "prompt": "<p>Threshold 0.3. For each plan on the test set create the DataFrame <code>plan_table</code>: index — plan, columns <code>customers</code> (the number of subscribers), <code>offers</code> (the number of offers), <code>profit</code> (the profit of that plan, with the <code>profit</code> function). Write the plan with the largest profit to <code>best_plan</code>. The sum of the plan profits must equal the total profit.</p>",
    "hints": [
     "<code>te = df.loc[X_test.index].copy()</code>, then <code>for plan, g in te.groupby('plan')</code>",
     "<code>profit(g['churned'], g['pred'])</code>"
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_t = df.loc[X_test.index].copy()\n_t['pred'] = (proba >= 0.3).astype(int)\n_r = {_p: _profit(_g['churned'], _g['pred']) for _p, _g in _t.groupby('plan')}\nassert isinstance(plan_table, pd.DataFrame) and set(plan_table.index) == {'basic', 'standard', 'premium'}, 'The index — three plans'\nassert {'customers', 'offers', 'profit'} <= set(plan_table.columns), 'Columns: customers, offers, profit'\nassert int(plan_table['customers'].sum()) == 150, 'The sum of the subscribers over all plans is 150'\nassert all(int(plan_table.loc[_p, 'profit']) == _r[_p] for _p in _r), f'The plan profits: {_r}'\nassert int(plan_table['profit'].sum()) == _profit(y_test, (proba >= 0.3).astype(int)), 'The sum must equal the total profit'\nassert best_plan == max(_r, key=_r.get), f'best_plan = {max(_r, key=_r.get)} must be'"
    }
   },
   {
    "title": "Efficiency of one offer",
    "prompt": "<p>The largest profit and the most efficient offer are different things. For the thresholds ∈ [0.2, 0.3, 0.4, 0.5, 0.6] write the profit into <code>profits</code>, and the profit per offer (<code>profit / offers</code>) into <code>per_offer</code>. Write the threshold with the largest total profit to <code>th_total</code>, and the one with the largest profit per offer to <code>th_efficient</code>.</p>",
    "hints": [
     "<code>pred.sum()</code> — the number of offers.",
     "Two dictionaries and two <code>max(..., key=...)</code>."
    ],
    "check": {
     "tests": "import numpy as _np\ndef _profit(_t, _p, _g=10000, _c=2000):\n    _t = _np.asarray(_t); _p = _np.asarray(_p)\n    return int(_g * ((_p == 1) & (_t == 1)).sum() - _c * ((_p == 1) & (_t == 0)).sum())\n_p = {_t: _profit(y_test, (proba >= _t).astype(int)) for _t in [0.2, 0.3, 0.4, 0.5, 0.6]}\n_e = {_t: _p[_t] / (proba >= _t).sum() for _t in _p}\nassert sorted(profits) == [0.2, 0.3, 0.4, 0.5, 0.6] and all(profits[_t] == _p[_t] for _t in _p), 'profits are wrong'\nassert all(abs(per_offer[_t] - _e[_t]) < 1e-9 for _t in _e), 'per_offer = profit / the number of offers'\nassert th_total == max(_p, key=_p.get) and th_efficient == max(_e, key=_e.get), f'th_total = {max(_p, key=_p.get)}, th_efficient = {max(_e, key=_e.get)}'\nassert th_efficient > th_total, 'The efficiency threshold is higher than the total-profit threshold'"
    }
   }
  ]
 }
} });
