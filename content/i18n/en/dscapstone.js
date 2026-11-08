// M5.3 DS Capstone: English text. Code, solutions and expected output are in content/dscapstone.js.
DJ.i18n.patch({
  modules: {
    'm5-3': { intro: 'The DS capstone project: the operator "Dala Mobile" wants to reduce churn with a retention offer. You go end to end on the <code>churn.csv</code> data: the business question and the cost of errors → EDA → baseline → Pipeline → a stronger model → choosing the threshold in tenge → interpretation and checks → memo and presentation. You can add this project to your portfolio.' }
  },
  lessons: {
    'dc-1': {
      title: 'Brief: the business question and the cost of errors',
      body: `
<p><b>Client:</b> "Dala Mobile" is a mobile operator in Kazakhstan. Every month some subscribers leave for another operator (churn). The retention team wants to send subscribers who are likely to leave an <b>offer</b>: an extra 10 GB free for one month.</p>
<p><b>Business question:</b> "Who should get the offer so that we save the most money?" This is not a "build a model" task. The model is only a tool, and the answer is measured in tenge.</p>
<h3>Data: <code>churn.csv</code></h3>
<p>600 subscribers: <code>city</code>, <code>age</code>, <code>tenure_months</code> (how many months with us), <code>plan</code> (basic / standard / premium), <code>monthly_fee</code>, <code>data_gb</code>, <code>support_calls</code>, <code>has_contract</code>. Target: <code>churned</code> — did they leave in the next quarter (1) or not (0).</p>
<h3>The cost of errors</h3>
<ul>
<li>Cost of the offer: <b>2,000 ₸</b> per subscriber.</li>
<li>Loss from a subscriber who leaves: <b>40,000 ₸</b> (future revenue).</li>
<li>The retention team's experience: the offer keeps <b>30%</b> of subscribers who were about to leave.</li>
</ul>
<h3>Step-by-step example</h3>
<ol>
<li><b>TP</b> (about to leave, got the offer): average gain 0.3 × 40,000 − 2,000 = <b>+10,000 ₸</b>.</li>
<li><b>FP</b> (not leaving, but got the offer): money wasted, <b>−2,000 ₸</b>.</li>
<li><b>FN</b> (about to leave, no offer) and <b>TN</b>: 0 ₸ compared with "do nothing".</li>
<li>The expected gain from sending the offer to a subscriber with churn probability <code>p</code>: <code>p × 12 000 − 2 000</code>. It is above zero if <code>p &gt; 2 000 / 12 000 ≈ 0.17</code>.</li>
</ol>
<p>Conclusion: one FN (a missed customer) costs several times more than one FP. So <b>recall</b> matters more to us, and the threshold may be much lower than 0.5. The success metric: <b>expected profit on the test set, ₸</b>. Accuracy and AUC are helper metrics.</p>
<pre><code>SAVE, LOST, OFFER = 0.3, 40000, 2000
tp_value = SAVE * LOST - OFFER   # 10000
fp_value = -OFFER                # -2000</code></pre>
<div class="tip"><b>Common mistakes:</b> (1) Starting the project with "reach 90% accuracy". The business does not see accuracy, it sees tenge. (2) Assuming the offer keeps everyone who was about to leave. In real life the acceptance rate is far below 100%. (3) Making up the numbers yourself: get the loss and the cost from the business and write them in the memo.</div>`,
      ex: [
        { prompt: 'Write a function <code>expected_value(p)</code> that computes the expected gain of sending the offer to one subscriber: <code>p × SAVE × LOST − OFFER</code>. Then compute the break-even point <code>breakeven = OFFER / (SAVE * LOST)</code> and print it.', check: { tests: 'assert expected_value(0.5) is not None, "The function must return a value (return)"\nassert abs(expected_value(0.5) - 4000) < 1e-6, "For p = 0.5: 0.5 × 0.3 × 40000 − 2000 = 4000"\nassert abs(expected_value(0.1) + 800) < 1e-6, "For p = 0.1 the gain is negative: −800"\nassert breakeven is not None and abs(breakeven - 1 / 6) < 1e-9, "breakeven = 2000 / 12000 ≈ 0.167"' }, hints: ['<code>return p * SAVE * LOST - OFFER</code>', '<code>breakeven = OFFER / (SAVE * LOST)</code>'] },
        { prompt: 'One FN loses 10,000 ₸ of gain, one FP costs 2,000 ₸. What matters more when evaluating the model?', options: ['Precision: send the offer only when confident', 'Recall: catch most of the leavers, accepting some FP', 'Accuracy: all errors are equal', 'Nothing, only AUC matters'], explain: 'An FN costs five times more than an FP. So it pays to send a few extra offers and catch more leavers. But in the end we choose the threshold in tenge.' },
        { prompt: 'The test set has 150 subscribers: 39 will leave, 111 will stay. If we send the offer to <b>everyone</b> without a model, what is the expected profit in tenge? (TP = +10,000 ₸, FP = −2,000 ₸)', explain: '39 × 10,000 − 111 × 2,000 = 390,000 − 222,000 = 168,000 ₸. This is the "simple strategy" the model has to beat.' }
      ]
    },
    'dc-2': {
      title: 'EDA: the health of the data',
      body: `
<p>We don't rush to the model. As in the Data Analyst capstone, we first check the "health" of the data: how many rows, which columns, where the missing values are, how the target is distributed.</p>
<h3>Four questions</h3>
<ol>
<li>How many subscribers and columns? <code>df.shape</code></li>
<li>What is the churn rate? <code>df["churned"].mean()</code> — the mean of a 0/1 column is the share of 1s.</li>
<li>Which columns have missing values? <code>df.isna().sum()</code></li>
<li>How does churn change across categories? <code>groupby</code></li>
</ol>
<h3>Step-by-step example</h3>
<pre><code>import pandas as pd
df = pd.read_csv("churn.csv")
print(df.shape)                       # (600, 10)
print(round(df["churned"].mean(), 3)) # 0.258
print(df.isna().sum())                # age 25, data_gb 17</code></pre>
<ol>
<li>About 26% of the 600 subscribers left. So the classes are imbalanced: a model that says "nobody leaves" gets 74% accuracy. Remember this number.</li>
<li><code>age</code> has 25 missing values, <code>data_gb</code> has 17. If we drop those rows, we lose 42 subscribers (7%). Instead we fill them with the median inside a Pipeline (stage 3).</li>
<li>Now we compare by plan and contract:</li>
</ol>
<pre><code>df.groupby("has_contract")["churned"].mean()
# 0    0.335
# 1    0.147</code></pre>
<p>Why is EDA a separate stage of the capstone? Because the model only repeats patterns in the data. If we don't see them in advance, we cannot check the model's result: how would we know that "tenure is important" is true? Every EDA finding is later compared with permutation importance, and the facts about missing values and imbalance go into the "Limitations" section of the memo. So write your results down.</p>
<p>Subscribers without a contract leave more than twice as often. This is the first finding for the memo. But it is a <b>correlation</b>: we cannot yet say that a contract stops people from leaving; maybe loyal customers simply sign contracts more often.</p>
<table>
<tr><th>plan</th><th>churn rate</th></tr>
<tr><td>basic</td><td>0.235</td></tr>
<tr><td>standard</td><td>0.262</td></tr>
<tr><td>premium</td><td>0.321</td></tr>
</table>
<div class="tip"><b>Common mistakes:</b> (1) Keeping <code>customer_id</code> as a feature: it is just a number, and the model may "learn" it. (2) Calling <code>dropna()</code> without thinking: if the missing values are not random, the sample gets biased. (3) Filling missing values on the whole dataset <b>before</b> the split. That is leakage, as we saw in M5.2.</div>`,
      ex: [
        { prompt: 'Read <code>churn.csv</code> and create the variables <code>n_rows</code> (number of rows), <code>churn_rate</code> (the mean of <code>churned</code>) and <code>missing</code> (the number of missing values in each column, a Series). Print all three.', check: { tests: 'import pandas as _pd\nassert n_rows == 600, "There should be 600 rows: len(df)"\nassert churn_rate is not None and abs(churn_rate - 0.2583) < 0.001, "churn_rate = df[\\"churned\\"].mean() ≈ 0.258"\nassert isinstance(missing, _pd.Series), "missing should be a Series: df.isna().sum()"\nassert missing["age"] == 25 and missing["data_gb"] == 17, "age should have 25 missing values and data_gb 17"' }, hints: ['<code>len(df)</code>, <code>df["churned"].mean()</code>', '<code>df.isna().sum()</code> counts missing values in each column.'] },
        { prompt: 'Create two Series: <code>by_plan</code> — the churn rate for each <code>plan</code>, <code>by_contract</code> — the churn rate by <code>has_contract</code>. Print both.', check: { tests: 'import pandas as _pd\nassert isinstance(by_plan, _pd.Series), "by_plan should be a Series: df.groupby(\\"plan\\")[\\"churned\\"].mean()"\nassert set(by_plan.index) == {"basic", "standard", "premium"}, "The index of by_plan is the three plans"\nassert abs(by_plan["premium"] - 0.3214) < 0.001, "Churn for premium ≈ 0.321"\nassert isinstance(by_contract, _pd.Series) and abs(by_contract[0] - 0.3352) < 0.001 and abs(by_contract[1] - 0.1469) < 0.001, "by_contract: 0 → 0.335, 1 → 0.147"' }, hints: ['<code>df.groupby("plan")["churned"].mean()</code>'] }
      ]
    },
    'dc-3': {
      title: 'EDA: tenure bands and customer support',
      body: `
<p><code>tenure_months</code> is a numeric column (from 1 to 72 months). If we compute churn for each value separately, the table is noisy. We need <b>bands</b> the business understands: "first year", "second year", "2–4 years", "more than 4 years".</p>
<pre><code>df["band"] = pd.cut(df["tenure_months"],
                    bins=[0, 12, 24, 48, 72],
                    labels=["0-12", "13-24", "25-48", "49-72"])</code></pre>
<p><code>pd.cut</code> puts each value into an interval. <code>bins=[0, 12, ...]</code> means "greater than 0, up to and including 12", so 12 months fall into the first band.</p>
<h3>Step-by-step example</h3>
<ol>
<li>Create the bands (the code above).</li>
<li>The churn rate and number of subscribers in each band:</li>
</ol>
<pre><code>df.groupby("band", observed=True)["churned"].agg(["mean", "size"])</code></pre>
<table>
<tr><th>band</th><th>mean</th><th>size</th></tr>
<tr><td>0-12</td><td>0.561</td><td>107</td></tr>
<tr><td>13-24</td><td>0.409</td><td>110</td></tr>
<tr><td>25-48</td><td>0.158</td><td>190</td></tr>
<tr><td>49-72</td><td>0.104</td><td>193</td></tr>
</table>
<ol start="3">
<li>Finding: more than half of new subscribers leave in their first year, but only 10% of those with us for over 4 years. Tenure is likely the strongest feature.</li>
<li>Another feature: calls to customer support. Those who called 3 or more times have a churn rate of about 43%, the rest 22%. This is a sign of an "unhappy customer".</li>
</ol>
<p>Why does this matter? For the business, "the tenure coefficient is −0.9" means nothing, but "half of first-year subscribers leave" is clear right away and prompts action: maybe the offer should target new subscribers. Tables like this later become the second slide of the presentation. They also help check the model: if the model does not give new subscribers a high probability, something is wrong.</p>
<p><code>observed=True</code> shows only the groups that exist when grouping by a categorical column (otherwise pandas gives a warning).</p>
<div class="tip"><b>Common mistakes:</b> (1) Giving the model the <code>band</code> column together with <code>tenure_months</code>: the same information twice. Bands are only for EDA and storytelling. (2) Drawing big conclusions from a small group: all 3 subscribers who called 6 times left, but 3 people are not proof. Always show <code>size</code> alongside. (3) Not checking the interval edges: if <code>bins</code> does not start at 0, a value of 0 becomes <code>NaN</code>.</div>`,
      ex: [
        { prompt: 'Create the <code>band</code> column with <code>pd.cut</code> (edges <code>[0, 12, 24, 48, 72]</code>, labels <code>"0-12", "13-24", "25-48", "49-72"</code>). Then <code>by_band</code> — the churn rate in each band (a Series, <code>observed=True</code>).', check: { tests: 'assert by_band is not None and len(by_band) == 4, "There should be four bands"\nassert [str(i) for i in by_band.index] == ["0-12", "13-24", "25-48", "49-72"], "Band labels: 0-12, 13-24, 25-48, 49-72"\nassert abs(by_band.iloc[0] - 0.5607) < 0.001 and abs(by_band.iloc[-1] - 0.1036) < 0.001, "Band 0-12 should be ≈ 0.561 and band 49-72 ≈ 0.104: check the edges"\nassert all(by_band.diff().dropna() < 0), "Churn should go down as tenure grows"' }, hints: ['<code>pd.cut(df["tenure_months"], bins=[0, 12, 24, 48, 72], labels=[...])</code>', '<code>df.groupby("band", observed=True)["churned"].mean()</code>'] },
        { prompt: 'Store the churn rate of those who called support at least 3 times in <code>high_calls</code>, and the rate of everyone else in <code>low_calls</code>.', check: { tests: 'assert high_calls is not None and abs(high_calls - 0.4324) < 0.001, "Churn for support_calls >= 3 ≈ 0.432"\nassert low_calls is not None and abs(low_calls - 0.2188) < 0.001, "Churn for support_calls < 3 ≈ 0.219"' }, hints: ['<code>df[df["support_calls"] &gt;= 3]["churned"].mean()</code>'] },
        { prompt: 'The <code>age</code> column has 25 missing values. How do we handle them in the project?', options: ['Fill with the mean of the whole dataset before the split', 'Drop those rows', '<code>SimpleImputer(strategy="median")</code> inside the Pipeline: the median is computed from train only', 'Fill missing values with 0'], explain: 'When the imputer sits inside the Pipeline, it is fitted only on the train part, and in cross-validation separately on each fold. This is a leakage-free method. An age of 0 is meaningless.' }
      ]
    },
    'dc-4': {
      title: 'Train/test split and a baseline',
      body: `
<p>Any model must answer one question: "is it better than a simple rule?" That rule is the <b>baseline</b>. The simplest baseline: always predict the most frequent class (majority class). In our data that is "nobody leaves".</p>
<h3>Features and target</h3>
<pre><code>num = ["age", "tenure_months", "monthly_fee", "data_gb",
       "support_calls", "has_contract"]
cat = ["plan"]
X = df[num + cat]
y = df["churned"]</code></pre>
<p><code>customer_id</code> is not used (it is a number). We don't add <code>city</code> to the model either: the business does not want to hand out offers based on where people live. But we keep it for the <b>check</b> in stage 7.</p>
<h3>Step-by-step example</h3>
<ol>
<li>Split: 75% train, 25% test. <code>stratify=y</code> keeps the churn rate the same (≈26%) in both parts.</li>
</ol>
<pre><code>from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=0)
print(len(X_test), y_test.sum())   # 150 39</code></pre>
<ol start="2">
<li>Baseline:</li>
</ol>
<pre><code>from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score, recall_score
dummy = DummyClassifier(strategy="most_frequent")
dummy.fit(X_train, y_train)
pred = dummy.predict(X_test)
print(accuracy_score(y_test, pred))  # 0.74
print(recall_score(y_test, pred))    # 0.0</code></pre>
<ol start="3">
<li>Accuracy is 74%, but recall is 0: it does not catch a single leaver. In business terms this is "do nothing", a profit of 0 ₸. And in stage 1 "send to everyone" gave 168,000 ₸. The model has to beat both options.</li>
</ol>
<p>Why two baselines? "Do nothing" is the business's current state, and "send to everyone" is the simplest action without a model. The business will ask you: "does the model pay for itself?" The answer only comes from comparison: if the model does not bring more profit than both, there is no point in building, deploying and maintaining it. This honest conclusion is common in real work.</p>
<p>We keep the test set "in a safe" until the end of the project: model selection happens only on train, through cross-validation.</p>
<div class="tip"><b>Common mistakes:</b> (1) Forgetting <code>stratify</code>: on small data the churn rate in test can end up at 20% or 32%, and the metrics jump. (2) Not setting <code>random_state</code>: every run gives a different result, and the numbers in the memo cannot be reproduced. (3) Boasting about "80% accuracy" without a baseline: compared with 74% it is a weak achievement.</div>`,
      ex: [
        { prompt: 'Split the data (<code>test_size=0.25</code>, <code>stratify=y</code>, <code>random_state=0</code>). Train a <code>DummyClassifier(strategy="most_frequent")</code> and compute <code>acc_dummy</code> (accuracy) and <code>rec_dummy</code> (recall) on test.', check: { tests: 'assert len(X_test) == 150, "The test set should have 150 rows: test_size=0.25"\nassert int(y_test.sum()) == 39, "With stratify=y and random_state=0, test has 39 leavers"\nassert isinstance(dummy, DummyClassifier) and hasattr(dummy, "classes_"), "A DummyClassifier named dummy must be trained (fit)"\nassert acc_dummy is not None and abs(acc_dummy - 0.74) < 1e-9, "acc_dummy should be 0.74"\nassert rec_dummy == 0, "The majority baseline catches nobody: recall = 0"' }, hints: ['<code>train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)</code>', '<code>dummy = DummyClassifier(strategy="most_frequent")</code>, then <code>fit</code> and <code>predict(X_test)</code>.'] },
        { prompt: 'A colleague says: "Our first model has 76% accuracy, great!" What do you say?', options: ['Yes, 76% is a good result', 'The baseline alone gives 74%. Instead of accuracy, compare recall, precision and profit in tenge against the baseline', 'If accuracy is below 90%, the model is useless', 'Only AUC matters, we never look at accuracy'], explain: 'With imbalanced classes accuracy is misleading. 76% vs 74% is just 3 subscribers. The main measure is profit.' }
      ]
    },
    'dc-5': {
      title: 'Logistic regression in a Pipeline',
      body: `
<p>The first real model: logistic regression. It is simple, fast, and its coefficients can be explained. But it needs prepared data: missing values filled, numbers scaled, text columns (<code>plan</code>) turned into numbers.</p>
<p>We know from M5.2: we put all of this inside a <b>Pipeline</b> and a <b>ColumnTransformer</b>. Then <code>fit</code> learns only on train, and <code>predict</code> applies the same rules to test. No leakage.</p>
<h3>Step-by-step example</h3>
<ol>
<li>For numeric columns: fill with the median → standardize.</li>
<li>For the categorical column: one-hot encoding.</li>
<li>Finally, the model.</li>
</ol>
<pre><code>from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression

pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                      ("sc", StandardScaler())]), num),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat),
])
pipe = Pipeline([("pre", pre),
                 ("model", LogisticRegression(max_iter=1000))])
pipe.fit(X_train, y_train)</code></pre>
<ol start="4">
<li>Evaluation. <code>predict</code> gives 0/1 with a 0.5 threshold, while <code>predict_proba(X_test)[:, 1]</code> gives the churn probability. AUC is computed from probabilities.</li>
</ol>
<pre><code>proba = pipe.predict_proba(X_test)[:, 1]
pred = pipe.predict(X_test)
recall_score(y_test, pred)      # ≈ 0.44
precision_score(y_test, pred)   # ≈ 0.68
roc_auc_score(y_test, proba)    # ≈ 0.79</code></pre>
<p>A Pipeline has one more benefit: all the preparation and the model live in one object. When a new list of subscribers arrives next month, <code>pipe.predict_proba(new_df)</code> is enough: the median, the scaling and the one-hot columns are applied exactly as during training. If you repeat separate steps by hand, it is easy to forget one. In production such a bug is silent but expensive.</p>
<p>Result: at the 0.5 threshold the model catches only 44% of leavers. And in stage 1 we saw that recall matters more. We solve this by changing the threshold (stage 6). AUC 0.79 means the model ranks leavers well by probability.</p>
<div class="tip"><b>Common mistakes:</b> (1) Passing the output of <code>predict</code> (0/1) to <code>roc_auc_score</code>: AUC is computed from probabilities. (2) Applying <code>StandardScaler</code> to the whole <code>X</code> without a Pipeline (leakage). (3) Forgetting <code>handle_unknown="ignore"</code>: if a plan the model has never seen shows up in new data, the model crashes.</div>`,
      ex: [
        { prompt: 'Build a logistic regression Pipeline (<code>pre</code> is ready) and train it on train. On test, compute <code>rec_lr</code> (recall), <code>prec_lr</code> (precision) and <code>auc_lr</code> (ROC AUC, from probabilities) and print them.', check: { tests: 'from sklearn.pipeline import Pipeline as _P\nfrom sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert isinstance(pipe, _P), "pipe should be a Pipeline"\nassert hasattr(pipe.named_steps["model"], "coef_"), "The model is not trained: pipe.fit(X_train, y_train)"\n_pred = pipe.predict(X_test)\nassert rec_lr is not None and abs(rec_lr - _rs(y_test, _pred)) < 1e-9, "rec_lr = recall_score(y_test, pred)"\nassert prec_lr is not None and abs(prec_lr - _ps(y_test, _pred)) < 1e-9, "prec_lr = precision_score(y_test, pred)"\nassert auc_lr is not None and 0.75 < auc_lr < 0.85, "auc_lr should be ≈ 0.79: pass predict_proba(X_test)[:, 1] to roc_auc_score"' }, hints: ['<code>Pipeline([("pre", pre), ("model", LogisticRegression(max_iter=1000))])</code>', 'For AUC: <code>pipe.predict_proba(X_test)[:, 1]</code>'] },
        { prompt: 'Why should <code>SimpleImputer</code> and <code>StandardScaler</code> be inside the Pipeline?', options: ['Only to make the code shorter', 'Then the median and the scale are learned only from train (in CV, from the train part of each fold). No information about test leaks into the model', 'LogisticRegression does not work without a Pipeline', 'A Pipeline always increases model accuracy'], explain: 'This protects against leakage. Test is a sample of future customers, and the model must know nothing about it.' }
      ]
    },
    'dc-6': {
      title: 'A stronger model: random forest and CV',
      body: `
<p>Logistic regression is linear: "if tenure grows by one month, the churn logit changes by a fixed amount". A random forest finds interactions such as "if tenure &lt; 12 <b>and</b> there is no contract" on its own. Will it be stronger? We check this not with test but with <b>cross-validation</b> (inside train only).</p>
<h3>Step-by-step example</h3>
<ol>
<li>We reuse the same <code>pre</code>, only the model changes.</li>
<li>A small grid: tree depth and the minimum number of rows in a leaf. 2 × 2 = 4 combinations × 5 folds = 20 models.</li>
<li>Metric: <code>scoring="roc_auc"</code>. We choose the threshold later, so what matters is how well the model <b>ranks</b> probabilities.</li>
</ol>
<pre><code>from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, cross_val_score
rf = Pipeline([("pre", pre),
               ("model", RandomForestClassifier(n_estimators=100,
                                                random_state=0))])
grid = GridSearchCV(rf, {"model__max_depth": [3, 5],
                         "model__min_samples_leaf": [1, 5]},
                    cv=5, scoring="roc_auc")
grid.fit(X_train, y_train)
print(grid.best_params_, round(grid.best_score_, 3))
# {'model__max_depth': 3, 'model__min_samples_leaf': 5} 0.811</code></pre>
<ol start="4">
<li>We evaluate logistic regression in exactly the same way:</li>
</ol>
<pre><code>cv_lr = cross_val_score(pipe, X_train, y_train,
                        cv=5, scoring="roc_auc").mean()   # ≈ 0.819</code></pre>
<ol start="5">
<li>The result is unexpected: the simple model is slightly better! On 450 rows the signal is mostly linear (tenure, contract, calls), and the forest spends its extra complexity on "noise".</li>
</ol>
<p>One caveat: the difference in CV is very small, so with another <code>random_state</code> or other folds the forest might pull slightly ahead. In real work we look at the standard deviation of AUC across folds (<code>cross_val_score(...).std()</code>) and check whether the difference is larger than the noise. In our case the two models are statistically equal.</p>
<p>Decision: we choose <b>logistic regression</b>. When quality is the same, the simpler model is better: fast, easy to explain, cheap to maintain. This is an honest finding for the memo.</p>
<div class="tip"><b>Common mistakes:</b> (1) Comparing models on test results and picking the best one: then test is no longer "clean". (2) A big grid: 100 combinations on small data only find a random "winner". (3) Believing that "a complex model is always better". The gap between 0.811 and 0.819 may be smaller than the spread across folds.</div>`,
      ex: [
        { prompt: 'Run <code>GridSearchCV</code> on the random forest Pipeline: <code>model__max_depth</code> ∈ [3, 5], <code>model__min_samples_leaf</code> ∈ [1, 5], <code>cv=5</code>, <code>scoring="roc_auc"</code>. Train it and store the best CV AUC in <code>cv_rf</code>.', check: { tests: 'from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G), "grid should be a GridSearchCV"\nassert hasattr(grid, "best_estimator_"), "grid.fit(X_train, y_train) was not called"\nassert len(grid.cv_results_["params"]) == 4, "The grid should have 2 × 2 = 4 combinations"\nassert grid.scoring == "roc_auc", "Pass scoring=\\"roc_auc\\""\nassert cv_rf is not None and abs(cv_rf - grid.best_score_) < 1e-12, "cv_rf = grid.best_score_"\nassert 0.75 < cv_rf < 0.88, "CV AUC should be ≈ 0.81"' }, hints: ['<code>GridSearchCV(rf, {"model__max_depth": [3, 5], "model__min_samples_leaf": [1, 5]}, cv=5, scoring="roc_auc")</code>', '<code>cv_rf = grid.best_score_</code>'] },
        { prompt: 'Compute the 5-fold CV AUC of the logistic regression Pipeline into <code>cv_lr</code>. Then set <code>final</code> to <code>"logreg"</code> (if <code>cv_lr &gt;= cv_rf</code>) or <code>"forest"</code>. <code>cv_rf</code> is given from the previous exercise.', check: { tests: 'assert cv_lr is not None and 0.78 < cv_lr < 0.86, "cv_lr should be ≈ 0.82: cross_val_score(pipe, X_train, y_train, cv=5, scoring=\\"roc_auc\\").mean()"\nassert final == ("logreg" if cv_lr >= cv_rf else "forest"), "final: \\"logreg\\" if cv_lr >= cv_rf, otherwise \\"forest\\""' }, hints: ['<code>cross_val_score(pipe, X_train, y_train, cv=5, scoring="roc_auc").mean()</code>', '<code>final = "logreg" if cv_lr &gt;= cv_rf else "forest"</code>'] },
        { prompt: 'CV AUC: logistic regression 0.819, random forest 0.811. Which one is right to choose?', options: ['Random forest: it is always stronger', 'Logistic regression: the quality is practically the same, and the simpler model is faster, clearer and cheaper to maintain', 'Drop both and build a neural network', 'Whichever is better on test'], explain: 'When the difference is tiny, simplicity wins. Choosing by test "pollutes" the test set.' }
      ]
    },
    'dc-7': {
      title: 'Choosing the threshold in tenge',
      body: `
<p>The model gives each subscriber a probability. Who gets the offer depends on the <b>threshold</b>: we send it if <code>proba &gt;= th</code>. The default 0.5 is a mathematical habit, not a business decision. Our decision is measured in tenge.</p>
<h3>The profit function</h3>
<pre><code>def profit(y_true, y_pred):
    tp = ((y_pred == 1) &amp; (y_true == 1)).sum()
    fp = ((y_pred == 1) &amp; (y_true == 0)).sum()
    return int(10000 * tp - 2000 * fp)</code></pre>
<h3>Step-by-step example</h3>
<ol>
<li>We test thresholds from 0.05 to 0.90 in steps of 0.05.</li>
<li>For each threshold we compute <code>pred = (proba &gt;= th).astype(int)</code> and the profit.</li>
<li>We pick the threshold with the highest profit.</li>
</ol>
<pre><code>for th in np.arange(0.05, 0.95, 0.05):
    th = round(th, 2)
    pred = (proba &gt;= th).astype(int)
    print(th, profit(y_test, pred))</code></pre>
<table>
<tr><th>Threshold</th><th>TP</th><th>FP</th><th>Profit, ₸</th></tr>
<tr><td>0.10</td><td>36</td><td>65</td><td><b>230 000</b></td></tr>
<tr><td>0.20</td><td>30</td><td>42</td><td>216 000</td></tr>
<tr><td>0.30</td><td>27</td><td>23</td><td>224 000</td></tr>
<tr><td>0.50</td><td>17</td><td>8</td><td>154 000</td></tr>
<tr><td>everyone</td><td>39</td><td>111</td><td>168 000</td></tr>
</table>
<ol start="4">
<li>Conclusion: the 0.5 threshold is worse even than "send to everyone"! And between 0.10 and 0.30 the profit is about the same (216–230 thousand ₸) — the curve is flat. The theoretical threshold 1/6 ≈ 0.17 (stage 1) sits in the middle of this range.</li>
</ol>
<p>Why is 0.5 so bad? The 0.5 threshold "values" FN and FP equally. But for us an FN is five times more expensive, so to catch more leavers the model has to send the offer to "uncertain" subscribers as well. As the threshold goes down, recall rises, precision falls, and profit first grows, then drops: too many FPs eat up the offer budget.</p>
<p>In the flat zone you can pick a point that suits the business: the 0.3 threshold halves the number of offers (50 vs 101) and lowers profit by only 6,000 ₸. If offers take up operators' time, that is an important argument.</p>
<div class="tip"><b>Common mistakes:</b> (1) Choosing the threshold on test is a small leak: 230,000 ₸ is an overly optimistic estimate. The right way: choose the threshold on train with <code>cross_val_predict</code> and check it on test only once. We simplified this for learning; write it in the memo as a "limitation". (2) <code>np.arange</code> gives numbers like 0.15000000000000002, so use <code>round</code>. (3) Writing <code>and</code> instead of <code>&amp;</code>: it raises an error on arrays.</div>`,
      ex: [
        { prompt: 'Write a function <code>profit(y_true, y_pred)</code>: +10,000 ₸ for a TP, −2,000 ₸ for an FP, 0 for the rest. The result should be an <code>int</code>. Apply <code>np.asarray</code> first so it also works with lists.', check: { tests: 'assert profit([1, 0, 1, 0], [1, 1, 0, 0]) == 8000, "1 TP and 1 FP: 10000 − 2000 = 8000"\nassert profit([1, 1, 1], [0, 0, 0]) == 0, "If we send to nobody, profit is 0"\nassert profit([0, 0, 1], [1, 1, 1]) == 6000, "1 TP, 2 FP: 10000 − 4000 = 6000"\nassert isinstance(profit([1], [1]), int), "Return an int: int(...)"' }, hints: ['<code>tp = ((y_pred == 1) &amp; (y_true == 1)).sum()</code>', '<code>return int(10000 * tp - 2000 * fp)</code>'] },
        { prompt: 'Go through the thresholds <code>np.arange(0.05, 0.95, 0.05)</code> (each with <code>round(th, 2)</code>) and find <code>best_th</code> and <code>best_profit</code> with the highest profit. For comparison, compute <code>profit_05</code> (threshold 0.5) and <code>profit_all</code> (send to everyone).', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_ths = [round(t, 2) for t in _np.arange(0.05, 0.95, 0.05)]\n_ps = [_profit(_yte, (_proba >= t).astype(int)) for t in _ths]\nassert best_profit == max(_ps), f"The highest profit should be {max(_ps)} ₸, you have {best_profit}"\nassert best_th is not None and abs(best_th - _ths[_ps.index(max(_ps))]) < 1e-9, "best_th is the (smallest) threshold with the highest profit"\nassert profit_05 == _profit(_yte, (_proba >= 0.5).astype(int)), "profit_05: the profit at threshold 0.5"\nassert profit_all == 168000, "Send to everyone: 39 × 10000 − 111 × 2000 = 168000"\nassert best_profit > profit_05, "The chosen threshold should beat 0.5"' }, hints: ['<code>p = profit(y_test, (proba &gt;= th).astype(int))</code>', 'Everyone: <code>np.ones(len(y_test), dtype=int)</code>'] },
        { prompt: 'Profit is 230,000 ₸ at threshold 0.10 and 224,000 ₸ at 0.30, but at 0.30 half as many offers are sent. What do you write in the memo?', options: ['Only 0.10, because the profit is the highest', 'Show that profit is practically the same between 0.10 and 0.30, recommend 0.30 given operational limits, and note that this estimate was chosen on test', '0.5, it is the standard', 'Let the business choose the threshold, I show no numbers'], explain: 'A 6,000 ₸ difference on 150 subscribers is at the noise level. The flat zone gives the business freedom to choose.' }
      ]
    },
    'dc-8': {
      title: 'Interpretation and a check by city',
      body: `
<p>The business asks two questions: "What does the model rely on?" and "Is it unfair to some group?" <b>Permutation importance</b> answers the first, <b>metrics by group</b> answer the second.</p>
<h3>Permutation importance</h3>
<p>We shuffle one column at random (breaking its link to the target) and measure how much the test AUC drops. A big drop means the model relies heavily on that column. It is applied directly to the Pipeline, so the original columns are scored (<code>plan</code> as one column).</p>
<pre><code>from sklearn.inspection import permutation_importance
r = permutation_importance(pipe, X_test, y_test, n_repeats=5,
                           random_state=0, scoring="roc_auc")
imp = pd.Series(r.importances_mean, index=X_test.columns)
imp.sort_values(ascending=False)
# tenure_months   0.18
# support_calls   0.07
# has_contract    0.06
# ...             ≈ 0</code></pre>
<p>Three EDA findings are confirmed: tenure, calls, contract. Age, plan and data usage add practically nothing to the model.</p>
<h3>Step-by-step example: a check by city</h3>
<ol>
<li><code>city</code> is not in the model, but we add it back to the test rows: <code>te = df.loc[X_test.index].copy()</code>.</li>
<li>A flag at the chosen threshold: <code>te["flag"] = (proba &gt;= 0.1).astype(int)</code>.</li>
<li>For each city: number of subscribers, actual churn, share who get the offer, and <b>recall</b> (how many leavers got the offer):</li>
</ol>
<pre><code>te[te["churned"] == 1].groupby("city")["flag"].mean()</code></pre>
<table>
<tr><th>city</th><th>in test</th><th>leavers</th><th>recall</th></tr>
<tr><td>Алматы</td><td>55</td><td>14</td><td>1.00</td></tr>
<tr><td>Астана</td><td>38</td><td>13</td><td>0.92</td></tr>
<tr><td>Шымкент</td><td>21</td><td>4</td><td>1.00</td></tr>
<tr><td>Қарағанды</td><td>16</td><td>5</td><td>0.80</td></tr>
<tr><td>Ақтөбе</td><td>20</td><td>3</td><td>0.67</td></tr>
</table>
<p>One more sanity check: does the share of subscribers getting the offer match actual churn? At the 0.1 threshold the model sends the offer to 73% of Almaty subscribers and 50% of Aktobe subscribers. That makes sense, because churn in Aktobe is low (15%). If it were the other way round (many offers in a low-churn city), it would be a reason to suspect an error in the model or the data.</p>
<ol start="4">
<li>Recall in Aktobe looks low, but it is 2 out of 3 leavers. We don't draw conclusions from one person, but we mention it in the memo and suggest monitoring it next quarter.</li>
</ol>
<div class="tip"><b>Common mistakes:</b> (1) Reading importance as cause: "tenure is important" does not mean "if we extend tenure, churn goes down". (2) Computing importance on train: the model will also show the noise it memorized as "important". (3) Declaring a difference in a small group "model unfairness", or the opposite, not checking groups at all.</div>`,
      ex: [
        { prompt: 'Compute permutation importance for the trained <code>pipe</code> on test (<code>n_repeats=5</code>, <code>random_state=0</code>, <code>scoring="roc_auc"</code>). <code>imp</code> — a Series indexed by column names, sorted in descending order; <code>top</code> — the name of the most important column.', check: { tests: 'assert isinstance(imp, pd.Series), "imp should be a pandas Series"\nassert len(imp) == 7 and set(imp.index) == set(X_test.columns), "The index is the 7 columns of X_test"\nassert list(imp.values) == sorted(imp.values, reverse=True), "imp should be sorted in descending order"\nassert top == "tenure_months", "The most important feature should be tenure_months"' }, hints: ['<code>permutation_importance(pipe, X_test, y_test, n_repeats=5, random_state=0, scoring="roc_auc")</code>', '<code>pd.Series(r.importances_mean, index=X_test.columns).sort_values(ascending=False)</code>'] },
        { prompt: 'Bring <code>city</code> back to the test rows (<code>te = df.loc[X_test.index].copy()</code>) and add a <code>flag</code> column at threshold 0.1. <code>city_recall</code> — recall in each city (the share of <code>flag</code> among leavers), a Series. <code>worst_city</code> — the city with the lowest recall.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_t = _df.loc[_Xte.index].copy()\n_t["flag"] = (_proba >= 0.1).astype(int)\n_cr = _t[_t["churned"] == 1].groupby("city")["flag"].mean()\nassert isinstance(city_recall, _pd.Series) and len(city_recall) == 5, "city_recall is a Series with 5 cities"\nassert all(abs(city_recall[c] - _cr[c]) < 1e-9 for c in _cr.index), "Recall is computed only among leavers (churned == 1)"\nassert worst_city == _cr.idxmin(), f"worst_city should be {_cr.idxmin()}: city_recall.idxmin()"' }, hints: ['<code>te["flag"] = (proba &gt;= 0.1).astype(int)</code>', '<code>te[te["churned"] == 1].groupby("city")["flag"].mean()</code>, then <code>.idxmin()</code>'] },
        { prompt: 'Recall in Aktobe is 0.67 (2 of 3 leavers), in other cities 0.8–1.0. Which conclusion is right?', options: ['The model is unfair to Aktobe and must not be used', 'A separate model must be built for Aktobe', 'The gap rests on 3 people, it is not statistical evidence. We mention it in the memo and monitor recall by city next quarter', 'City should be added to the model as a feature'], explain: 'In a small group one person moves recall by 33 percentage points. A monitoring plan is the honest and responsible answer.' }
      ]
    },
    'dc-9': {
      title: 'A model memo for the business',
      body: `
<p>The head of the retention team does not read Python. They expect answers to four questions on one page: <b>what to do, how much money, how far to trust it, what the next step is.</b> We adapt the memo structure from the Data Analyst capstone to ML.</p>
<ol>
<li><b>Bottom line</b> (1–2 sentences): the recommendation and the result in tenge.</li>
<li><b>What the model does</b>: in plain language, one paragraph. "It estimates the probability that each subscriber leaves in the next quarter."</li>
<li><b>Evidence</b>: a comparison table against the baseline, the threshold, the profit; the model's main features.</li>
<li><b>Risks and limitations</b>: the data size, how the threshold was chosen, the 30% assumption, the check by city.</li>
<li><b>Next step</b>: a pilot and how we will measure it.</li>
</ol>
<h3>Step-by-step example: the evidence table</h3>
<table>
<tr><th>Strategy</th><th>Offers (out of 150)</th><th>Expected profit</th></tr>
<tr><td>Do nothing</td><td>0</td><td>0 ₸</td></tr>
<tr><td>Everyone</td><td>150</td><td>168 000 ₸</td></tr>
<tr><td>Model, threshold 0.5</td><td>25</td><td>154 000 ₸</td></tr>
<tr><td>Model, threshold 0.3</td><td>50</td><td>224 000 ₸</td></tr>
</table>
<p>150 subscribers are only part of the whole base. The result is clearer per subscriber: 224,000 / 150 ≈ <b>1,500 ₸ per subscriber</b> per quarter. Scaled to 100,000 subscribers, that is about 150 million ₸, but we always state the condition behind this forecast (30% retention).</p>
<p>In the risks section, highlight the most important assumption: the whole calculation depends on the number "the offer keeps 30% of leavers". If the real value is 15%, the gain from one TP drops to 4,000 ₸ and the profitable threshold goes up. That is why the last section of the memo is a pilot that tests this number.</p>
<h3>Signs of a good memo</h3>
<ul>
<li>Little jargon: instead of "AUC 0.79", "the model catches 70% of leaving subscribers, and every second offer hits the target".</li>
<li>Every number comes from a real result.</li>
<li>Limitations are not hidden: they increase trust.</li>
</ul>
<div class="tip"><b>Common mistakes:</b> (1) Starting the memo with the method ("We used GridSearchCV..."). The reader expects the decision first. (2) Writing assumptions as facts: not "we will save 150 million ₸", but "if the offer keeps 30%, about 150 million ₸". (3) Not mentioning limitations at all, or the opposite, devoting half the memo to them.</div>`,
      ex: [
        { prompt: 'Which one works best as the first paragraph of the memo?', options: ['"We compared logistic regression and random forest on data for 600 subscribers, CV AUC 0.82."', '"We recommend sending the offer only to subscribers whose churn probability the model estimates above 30%: on test this gives 33% more profit than sending to everyone (224,000 vs 168,000 ₸) and cuts the number of offers threefold. We propose testing the result with a pilot in one city."', '"The model works very well."', '"Subscribers without a contract leave more often."'], explain: 'The action, evidence in tenge, a comparison and the next step — all in the first paragraph.' },
        { done: 'Put the memo at the top of the project\'s README.md. In a portfolio it is read before the code: an employer checks "can this person speak the language of business?". One line for your CV: "Built a churn model and chose the threshold by expected profit: +45% profit on test compared with the standard threshold".', prompt: 'Write a memo to the head of the "Dala Mobile" retention team (at least 80 words). Use your own results: the baseline, the chosen model, the threshold, the profit, the main features, the check by city. Then grade it honestly on four criteria. To pass, each criterion needs at least <b>3 / 4</b>.', criteria: [
            { name: 'Decision and business result', levels: ['No recommendation', 'A recommendation, but without tenge or only at the end', 'The first paragraph has the recommendation and the profit (₸)', 'The first paragraph has the recommendation, the profit and a comparison with the baseline'] },
            { name: 'Explaining the model', levels: ['Only technical terms, or no explanation', 'The model is named, but what it does is vague', 'What the model does and its main features are explained in plain language', 'Features, the difference between correlation and cause, and why a simple model was chosen are explained'] },
            { name: 'Risks and limitations', levels: ['Not mentioned', 'Generic words ("not enough data")', 'Specific limitations: the 30% assumption, choosing the threshold on test, data size', 'Limitations, their effect on the result, and the outcome of the check by city'] },
            { name: 'Next step', levels: ['None', 'Generic ("improve the model")', 'A concrete action (pilot, retraining)', 'A pilot design: control group, duration, the metric to measure'] }
          ] }
      ]
    },
    'dc-10': {
      title: 'Presentation and next steps',
      body: `
<p>A memo is for reading, a presentation is for the meeting where the decision is made. For 10 minutes, 5–6 slides are enough. Each slide title is a <b>finding</b>, not just a topic: not "Data", but "Half of new subscribers leave in their first year".</p>
<h3>Slide plan</h3>
<ol>
<li><b>Problem and question</b>: 26% of subscribers leave per quarter; the offer costs 2,000 ₸, a lost subscriber 40,000 ₸.</li>
<li><b>Who leaves</b>: tenure bands, contract, calls (EDA).</li>
<li><b>Four strategies</b>: nobody / everyone / model 0.5 / model at the chosen threshold — one bar chart, in ₸.</li>
<li><b>Can we trust the model</b>: CV, why a simple model was chosen, the check by city.</li>
<li><b>Recommendation and pilot</b>.</li>
<li>Appendix (backup): technical details, ready for questions.</li>
</ol>
<h3>Step-by-step example: the comparison table</h3>
<p>We collect the data for slide 3 with code, so the numbers match the notebook result exactly:</p>
<pre><code>strategies = {
    "none": np.zeros(len(y_test), dtype=int),
    "all": np.ones(len(y_test), dtype=int),
    "model_05": (proba &gt;= 0.5).astype(int),
    "model_03": (proba &gt;= 0.3).astype(int),
}
summary = pd.DataFrame({
    "offers": {k: int(v.sum()) for k, v in strategies.items()},
    "profit": {k: profit(y_test, v) for k, v in strategies.items()},
})</code></pre>
<p>When preparing the presentation, write down the expected questions in advance: "Why not a neural network?", "How often is the model wrong?", "Why is it worse in Aktobe?", "Where does the 30% come from?". If each question has a one-sentence answer and a backup slide ready, the meeting ends with a decision rather than a request to "analyze it some more".</p>
<h3>Next steps</h3>
<ul>
<li><b>Pilot (A/B test)</b>: for one month we randomly split high-risk subscribers into two groups and send the offer to one of them. The difference in churn tests the 30% assumption (the A/B testing methods from module M4).</li>
<li><b>Monitoring</b>: every month, recall, the number of offers and the metrics by city.</li>
<li><b>Retraining</b>: every quarter on new data; customer behavior changes (data drift).</li>
</ul>
<div class="tip"><b>Common mistakes:</b> (1) Putting code or a confusion matrix on a slide without explanation. (2) Five different numbers on one slide: one slide, one idea. (3) Rolling out to the whole base at once without a pilot: if the 30% assumption is wrong, the losses will be large.</div>`,
      ex: [
        { prompt: 'Create the <code>summary</code> DataFrame for slide 3 of the presentation: index <code>"none"</code>, <code>"all"</code>, <code>"model_05"</code>, <code>"model_03"</code>; columns <code>offers</code> (number of offers) and <code>profit</code> (₸). Thresholds: 0.5 and 0.3.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\nassert isinstance(summary, _pd.DataFrame), "summary should be a DataFrame"\nassert set(summary.index) == {"none", "all", "model_05", "model_03"}, "Index: none, all, model_05, model_03"\nassert {"offers", "profit"} <= set(summary.columns), "The offers and profit columns are needed"\nassert summary.loc["none", "profit"] == 0 and summary.loc["all", "profit"] == 168000, "none → 0 ₸, all → 168000 ₸"\nassert summary.loc["all", "offers"] == 150, "The all strategy has 150 offers"\nfor _k, _t in [("model_05", 0.5), ("model_03", 0.3)]:\n    _pr = (_proba >= _t).astype(int)\n    assert summary.loc[_k, "offers"] == _pr.sum() and summary.loc[_k, "profit"] == _profit(_yte, _pr), f"The {_k} row is wrong: threshold {_t}"' }, hints: ['Each strategy is a 0/1 array: <code>np.zeros</code>, <code>np.ones</code>, <code>(proba &gt;= 0.5).astype(int)</code>.', '<code>pd.DataFrame({"offers": {...}, "profit": {...}})</code> — the keys of the inner dictionaries become the index.'] },
        { prompt: 'Which slide title is best?', options: ['"EDA results"', '"More than half of new subscribers leave in their first year"', '"Slide 2: data"', '"pd.cut and groupby"'], explain: 'A finding as the title gives the listener the slide\'s main idea at once.' },
        { prompt: 'The manager says: "The model looks good, let\'s switch it on for the whole base tomorrow." What is the best answer?', options: ['I agree', 'First a one-month pilot: randomly split high-risk subscribers in two and measure the real effect of the offer (the 30% assumption), then scale up', 'First the model should be replaced with a neural network', 'There is not enough data, the project should stop'], explain: 'The model predicts "who will leave", but only an experiment answers the cause-and-effect question "does the offer stop them".' }
      ]
    },
    'dc-gate': {
      title: 'Module exam: the churn project end to end',
      body: `
<p>The final check of the Data Science track. Data: <code>churn.csv</code>. Features: <code>age</code>, <code>tenure_months</code>, <code>monthly_fee</code>, <code>data_gb</code>, <code>support_calls</code>, <code>has_contract</code>, <code>plan</code>. Split: <code>test_size=0.25</code>, <code>stratify=y</code>, <code>random_state=0</code>. Economics: TP = +10,000 ₸, FP = −2,000 ₸.</p>
<p>Each exercise checks one stage: EDA → Pipeline → threshold → check by city → conclusion.</p>`,
      ex: [
        { prompt: 'EDA: <code>n_missing</code> — the total number of missing values in the whole table (int). <code>gap</code> — the difference in churn rate between subscribers without and with a contract (without minus with).', check: { tests: 'assert n_missing == 42, "All missing values: 25 + 17 = 42"\nassert gap is not None and abs(gap - 0.1883) < 0.001, "gap ≈ 0.335 − 0.147 = 0.188"' } },
        { prompt: 'Pipeline: build a <code>LogisticRegression(max_iter=1000)</code> Pipeline <code>pipe</code> that fills missing values with the median, scales numbers and one-hot encodes <code>plan</code>, and train it on train. <code>auc</code> — the ROC AUC on test.', check: { tests: 'from sklearn.pipeline import Pipeline as _P\nassert isinstance(pipe, _P), "pipe should be a Pipeline"\nassert hasattr(pipe.named_steps[list(pipe.named_steps)[-1]], "coef_"), "The last step is a trained LogisticRegression"\nassert auc is not None and 0.75 < auc < 0.85, "Test AUC should be ≈ 0.79"' } },
        { prompt: 'Threshold: among the thresholds <code>np.arange(0.05, 0.95, 0.05)</code> (each with <code>round(th, 2)</code>), find <code>best_th</code> and <code>best_profit</code> that maximize profit on test (TP = +10,000 ₸, FP = −2,000 ₸). <code>proba</code> is ready.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_ths = [round(t, 2) for t in _np.arange(0.05, 0.95, 0.05)]\n_ps = [_profit(_yte, (_proba >= t).astype(int)) for t in _ths]\nassert best_profit == max(_ps), "best_profit is the highest profit among the tested thresholds"\nassert best_th is not None and abs(best_th - _ths[_ps.index(max(_ps))]) < 1e-9, "best_th is the threshold with the highest profit"' } },
        { prompt: 'Check: at threshold 0.3, create a <code>plan_check</code> DataFrame showing, for each <code>plan</code>, the share of subscribers who get the offer (<code>offer_rate</code>) and the actual churn rate (<code>churn_rate</code>) (the index is the plan). Get the test rows with <code>df.loc[X_test.index]</code>.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_t = _df.loc[_Xte.index].copy()\n_t["flag"] = (_proba >= 0.3).astype(int)\n_g = _t.groupby("plan").agg(offer_rate=("flag", "mean"), churn_rate=("churned", "mean"))\nassert isinstance(plan_check, _pd.DataFrame), "plan_check is a DataFrame"\nassert set(plan_check.index) == {"basic", "standard", "premium"}, "The index is the three plans"\nassert {"offer_rate", "churn_rate"} <= set(plan_check.columns), "The offer_rate and churn_rate columns are needed"\nassert all(abs(plan_check.loc[p, "offer_rate"] - _g.loc[p, "offer_rate"]) < 1e-9 and abs(plan_check.loc[p, "churn_rate"] - _g.loc[p, "churn_rate"]) < 1e-9 for p in _g.index), "The shares do not match: check threshold 0.3 and the test rows"' } },
        { prompt: 'By permutation importance, <code>tenure_months</code> is the most important feature. How do you write this in the memo?', options: ['"If we keep subscribers longer, churn goes down: tenure is the cause of churn."', '"The model relies first of all on how long the subscriber has been with us: new subscribers leave more often. This is a link, not a cause; the pilot will show the effect of the offer."', '"tenure_months importance 0.18."', 'I don\'t mention importance in the memo'], explain: 'Plain language, a concrete meaning, and the difference between correlation and cause.' }
      ]
    }
  }
});
