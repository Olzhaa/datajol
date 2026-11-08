// M5.2 ML in Practice: English text. Code, solutions and expected output are in content/mlpractice.js.
DJ.i18n.patch({
  modules: {
    "m5-2": { intro: "In real work what matters is not the model itself but everything around it: preparing the data, guarding against leakage, tuning hyperparameters, strong ensembles, imbalanced classes, clustering and explaining the model. You will do all of it with scikit-learn on churn.csv and flats.csv." }
  },
  lessons: {
    "mp-1": {
      title: "Pipeline and ColumnTransformer",
      body: `
<p>In M5.1 we gave the model a ready numeric table. The real churn.csv is not like that: <code>city</code> and <code>plan</code> are text, <code>age</code> has 25 missing values and <code>data_gb</code> has 17, while <code>monthly_fee</code> is measured in thousands and <code>support_calls</code> in ones. Before the data goes into a model you need three things: fill the gaps, turn text into numbers and even out the scales.</p>
<p>You can do this by hand, but every step has to be <code>fit</code> on train and only <code>transform</code>ed on test, and it is easy to mix them up. A <b>Pipeline</b> is a conveyor belt: you list the steps in order and run them all with one <code>fit</code>/<code>predict</code>. A <b>ColumnTransformer</b> gives each group of columns its own processing.</p>
<h3>Step-by-step example</h3>
<ol>
<li>Numeric columns: fill with the median (<code>SimpleImputer</code>), then <code>StandardScaler</code>.</li>
<li>Categorical columns: <code>OneHotEncoder</code>, so <code>plan</code> becomes three columns (basic, premium, standard).</li>
<li>At the end, the model.</li>
</ol>
<pre><code>from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression

num = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
cat = ['city', 'plan']
num_pipe = Pipeline([('imp', SimpleImputer(strategy='median')),
                     ('sc', StandardScaler())])
pre = ColumnTransformer([('num', num_pipe, num),
                         ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])
model = Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)      # everything learns on train only
model.score(X_test, y_test)      # ≈ 0.78</code></pre>
<p>The result has 6 numeric + 5 cities + 3 plans = 14 columns. <code>pre.get_feature_names_out()</code> gives their names: <code>num__age</code>, <code>cat__city_Алматы</code> and so on.</p>
<table>
<tr><th>Step</th><th>fit (train)</th><th>transform (test)</th></tr>
<tr><td>SimpleImputer</td><td>remembers the train median</td><td>fills with that median</td></tr>
<tr><td>StandardScaler</td><td>train mean and SD</td><td>scales with those numbers</td></tr>
<tr><td>OneHotEncoder</td><td>list of categories</td><td>0/1 by that list</td></tr>
</table>
<div class="tip"><b>Common mistakes:</b> (1) Using <code>customer_id</code> as a feature: it means nothing. (2) Leaving out <code>handle_unknown='ignore'</code>: if a new city shows up in test, you get an error. (3) Fitting the Pipeline on the full data: that is the leakage from the next lesson. (4) Calling <code>fit_transform</code> on test.</div>`,
      ex: [
        { prompt: "Build a ColumnTransformer <code>pre</code>: a Pipeline (SimpleImputer(strategy='median') → StandardScaler) for the <code>num</code> columns and <code>OneHotEncoder(handle_unknown='ignore')</code> for the <code>cat</code> columns. Then <code>Xt = pre.fit_transform(X)</code> and <code>print(Xt.shape)</code>.", hints: ["Start with <code>num_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])</code>.","<code>ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])</code>"], check: {"tests":"import numpy as _np\nfrom sklearn.compose import ColumnTransformer as _CT\nassert isinstance(pre, _CT), 'pre must be a ColumnTransformer'\n_A = _np.asarray(Xt.toarray() if hasattr(Xt, 'toarray') else Xt, dtype=float)\nassert _A.shape == (600, 14), f'Xt should have shape (600, 14): 6 numeric + 5 cities + 3 plans. You have {_A.shape}'\nassert not _np.isnan(_A).any(), 'Xt still has NaN: add a SimpleImputer for the numeric columns'\nassert _np.allclose(_A[:, :6].mean(axis=0), 0, atol=1e-6), 'The first 6 columns should have mean 0 after StandardScaler'"} },
        { prompt: "Join the ready <code>pre</code> and <code>LogisticRegression(max_iter=1000)</code> into one <code>Pipeline</code> and store it in the variable <code>model</code>. Fit it on <code>X_train</code>, store the test accuracy in <code>acc</code> and print it.", hints: ["<code>Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))])</code>","The Pipeline gets the raw <code>X_train</code>: it does the filling and encoding itself."], check: {"tests":"from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LogisticRegression as _LR\nassert isinstance(model, _P), 'model must be a Pipeline'\nassert isinstance(model.steps[-1][1], _LR), 'The last step of the Pipeline must be LogisticRegression'\nassert hasattr(model.steps[-1][1], 'coef_'), 'Call model.fit(X_train, y_train)'\nassert abs(acc - model.score(X_test, y_test)) < 1e-9, 'acc should be model.score(X_test, y_test)'\nassert 0.7 < acc < 0.9, f'accuracy should be about 0.78, you have {acc:.3f}'"} },
        { prompt: "Why do we pass <code>handle_unknown='ignore'</code> to OneHotEncoder?", options: ["So the model trains faster","So that a category not seen in train (for example, a new city) does not cause an error in new data, and all its columns become 0","To fill missing values","To remove rare categories"], explain: "In production a new city such as Turkistan may arrive. With ignore it gets 0 in every city column and the model does not crash." }
      ]
    },
    "mp-2": {
      title: "Data leakage: when the model cheats",
      body: `
<p><b>Data leakage</b> means that during training the model sees information that is not really available at prediction time. The result: great on the test, weak in production. It is one of the most expensive mistakes in ML, because the metric hides it.</p>
<h3>Three kinds</h3>
<ul>
<li><b>Preprocessing leakage</b>: fitting a scaler, an imputer or feature selection on the whole data <i>before</i> the split. The test mean and median "leak" into train.</li>
<li><b>Target leakage</b>: a feature only becomes known after the outcome. In churn, "last bill unpaid" or "contract termination fee" appear after the customer leaves. In flats, <code>price_per_m2</code> is computed from the price itself.</li>
<li><b>Time leakage</b>: splitting time-ordered data at random. Predicting February from March data is seeing the future. Train on the older period and test on the newer one (<code>TimeSeriesSplit</code>).</li>
</ul>
<h3>Step-by-step example: "78%" from random noise</h3>
<p>100 rows, 2000 random features, random y. The true accuracy should be ≈ 50%.</p>
<pre><code>rng = np.random.default_rng(0)
X = rng.normal(size=(100, 2000))
y = rng.integers(0, 2, 100)

# WRONG: select features on all data, then CV
Xs = SelectKBest(f_classif, k=20).fit_transform(X, y)
cross_val_score(LogisticRegression(), Xs, y, cv=5).mean()    # ≈ 0.78

# RIGHT: selection inside a Pipeline, on train only in each fold
pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
cross_val_score(pipe, X, y, cv=5).mean()                      # ≈ 0.59</code></pre>
<ol>
<li>SelectKBest finds, among 2000 features, the 20 with the strongest <i>random</i> link to y, looking at the test rows too.</li>
<li>CV sees these features as "useful": 78%.</li>
<li>Inside a Pipeline the selection runs only on the train part of each fold, and the truth comes out: a little above chance.</li>
</ol>
<p>Scaler leakage is usually small, but the principle is the same: <b>every step that learns from data goes inside the Pipeline</b>.</p>
<div class="tip"><b>Common mistakes:</b> (1) Running <code>df.fillna(df.mean())</code> before the split. (2) Celebrating a "too good" result: if AUC is 0.99, look for leakage first. (3) Not asking for each feature: "is this known at prediction time?" (4) Putting several rows of the same customer into both train and test.</div>`,
      ex: [
        { prompt: "The starter has <code>leaky</code>, computed with leakage. On the same data compute an honest CV accuracy with <code>make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())</code> and store it in <code>honest</code> (cv=5). Print both.", hints: ["<code>pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())</code>","CV gets the original <code>X</code>, not <code>Xs</code>: <code>cross_val_score(pipe, X, y, cv=5).mean()</code>"], check: {"tests":"assert honest is not None, 'Compute honest'\nassert 0 <= float(honest) <= 1, 'honest is an accuracy (between 0 and 1)'\nassert float(honest) < 0.7, f'The honest result should be close to chance (≈0.59), you have {honest:.2f}. Is SelectKBest inside the Pipeline and is CV run on the original X?'\nassert leaky - honest > 0.1, 'There should be a big gap between leaky and honest'"} },
        { prompt: "In the starter the churn data has an extra column <code>final_bill_unpaid</code> (filled in after the customer leaves). Store the absolute correlation of each feature with <code>churned</code> in a Series <code>corrs</code> and the name of the strongest one in <code>leaky_col</code>. Then build <code>X_clean</code> without that column and store the test accuracy of LogisticRegression in <code>acc_clean</code>.", hints: ["<code>corrs = df[cols].corrwith(y).abs()</code>, <code>leaky_col = corrs.idxmax()</code>","There are missing values, so use <code>make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))</code>."], check: {"tests":"import pandas as _pd\nassert isinstance(corrs, _pd.Series), 'corrs must be a Series (df[cols].corrwith(y).abs())'\nassert leaky_col == 'final_bill_unpaid', 'The strongest correlation is in final_bill_unpaid: it appears after the outcome'\nassert 'final_bill_unpaid' not in list(X_clean.columns), 'Drop final_bill_unpaid from X_clean'\nassert X_clean.shape[1] == 6, 'X_clean should keep 6 features'\nassert 0.65 < acc_clean < 0.9, f'The clean model should have a realistic accuracy (≈0.78), you have {acc_clean:.3f}'"} },
        { prompt: "A shop forecasts daily sales for 2023–2025. An analyst shuffled all the days at random, ran train_test_split and got R² = 0.95. What is wrong?", options: ["Nothing: if R² is high, the model is good","Time leakage: the model learns from future days and predicts the past. Train on the older period and test on the last months","test_size is too small","A scaler is missing"], explain: "With time data, train must always come before test (or use TimeSeriesSplit). Otherwise the model sees \"tomorrow's\" values in advance." }
      ]
    },
    "mp-3": {
      title: "Feature engineering: building new features",
      body: `
<p><b>Feature engineering</b> means creating new features from existing columns that help the model. A model sees only what it is given: it may not work out the idea of "top floor" from <code>floor</code> and <code>floors_total</code> on its own. You know the domain, and you turn that knowledge into numbers.</p>
<h3>Four main techniques</h3>
<ul>
<li><b>Ratio</b>: <code>floor / floors_total</code>, <code>area_m2 / rooms</code>, and in churn <code>support_calls / (tenure_months / 12)</code>, the number of calls per year.</li>
<li><b>Bin</b> (grouping): <code>pd.cut</code> splits a continuous number into intervals. This is how a linear model can see a jump like "the first 6 months are risky".</li>
<li><b>Interaction</b>: the product of two features. In Medeu 1 m² costs more than in Alatau, hence <code>area_m2 × district</code>.</li>
<li><b>Date parts</b>: <code>pd.to_datetime</code>, then <code>.dt.month</code>, <code>.dt.dayofweek</code>, whether it is a weekend.</li>
</ul>
<h3>Step-by-step example</h3>
<p>1) In churn, let us group customer tenure:</p>
<pre><code>df['tenure_bin'] = pd.cut(df['tenure_months'], bins=[0, 6, 12, 24, 48, 100],
                          labels=['0-6', '7-12', '13-24', '25-48', '49+'])
df.groupby('tenure_bin', observed=True)['churned'].mean()</code></pre>
<table>
<tr><th>tenure_bin</th><th>0-6</th><th>7-12</th><th>13-24</th><th>25-48</th><th>49+</th></tr>
<tr><td>churn rate</td><td>0.62</td><td>0.53</td><td>0.41</td><td>0.16</td><td>0.10</td></tr>
</table>
<p>More than half of new customers leave: a strong signal.</p>
<p>2) In flats, the 5-fold R² of LinearRegression is 0.66 with numeric columns only, 0.91 after adding one-hot district, and 0.94 after adding the interaction <code>area_m2 × each district</code>. One domain idea is worth +3 points.</p>
<p>3) Date parts:</p>
<pre><code>d = pd.to_datetime(pd.Series(['2025-03-08', '2025-03-10']))
d.dt.month        # 3, 3
d.dt.dayofweek    # 5 (Saturday), 0 (Monday)</code></pre>
<p>You cannot give the date itself (2025-03-08) to the model: it is not a number, and if you pass it as a timestamp the model will lean on a false "over time" trend. Month, day of week and whether it is a holiday capture the repeating patterns. Check every new feature with CV: if it does not help, drop it, because an extra feature adds noise.</p>
<div class="tip"><b>Common mistakes:</b> (1) Building a feature from the target: <code>price_per_m2 = price_mln / area_m2</code> is the price itself, leakage. (2) Division by zero: if <code>tenure_months</code> is 0, the ratio gives inf. (3) Choosing bin edges by looking at test. (4) Computing a feature with one formula in train and another in production: put it in a function or a Pipeline.</div>`,
      ex: [
        { prompt: "Add four columns to <code>flats</code>: <code>age</code> = 2024 − year_built; <code>floor_ratio</code> = floor / floors_total; <code>is_last</code> = 1 if it is the top floor, otherwise 0 (int); <code>area_per_room</code> = area_m2 / rooms. Then store the mean price of top-floor flats in <code>last_price</code>.", hints: ["<code>(flats['floor'] == flats['floors_total']).astype(int)</code>","<code>flats.loc[flats['is_last'] == 1, 'price_mln'].mean()</code>"], check: {"tests":"import pandas as _pd\n_f = _pd.read_csv('flats.csv')\nfor _c in ['age', 'floor_ratio', 'is_last', 'area_per_room']:\n    assert _c in flats.columns, f'Column {_c} is missing'\nassert (flats['age'] == 2024 - _f['year_built']).all(), 'age = 2024 - year_built'\nassert ((flats['floor_ratio'] - _f['floor'] / _f['floors_total']).abs() < 1e-9).all(), 'floor_ratio = floor / floors_total'\nassert set(flats['is_last'].unique()) <= {0, 1} and int(flats['is_last'].sum()) == int((_f['floor'] == _f['floors_total']).sum()), 'is_last: 1 when floor == floors_total'\nassert ((flats['area_per_room'] - _f['area_m2'] / _f['rooms']).abs() < 1e-9).all(), 'area_per_room = area_m2 / rooms'\nassert abs(last_price - _f.loc[_f['floor'] == _f['floors_total'], 'price_mln'].mean()) < 1e-6, 'last_price is the mean price_mln of flats with is_last == 1'"} },
        { prompt: "In churn, create the <code>tenure_bin</code> column with <code>pd.cut</code>: bins=[0, 6, 12, 24, 48, 100], labels=['0-6', '7-12', '13-24', '25-48', '49+']. Store the churn rate of each group in a Series <code>rate</code> (groupby, observed=True) and print it.", hints: ["<code>pd.cut(df['tenure_months'], bins=[...], labels=[...])</code>","<code>df.groupby('tenure_bin', observed=True)['churned'].mean()</code>"], check: {"tests":"assert rate is not None and len(rate) == 5, 'rate should have 5 groups'\nassert 'tenure_bin' in df.columns, 'Add the tenure_bin column to df'\nassert [str(i) for i in rate.index] == ['0-6', '7-12', '13-24', '25-48', '49+'], 'Group names should match labels'\nassert abs(rate['0-6'] - 0.6154) < 0.005, f'The churn rate of the 0-6 month group ≈ 0.62, you have {rate.iloc[0]:.3f}'\nassert abs(rate['49+'] - 0.1036) < 0.005, 'The churn rate of the 49+ group ≈ 0.10'\nassert all(rate.values[i] > rate.values[i + 1] for i in range(4)), 'The churn rate should fall as tenure grows'"} },
        { prompt: "You added the feature <code>price_per_m2 = price_mln / area_m2</code> to the flats model and R² rose to 0.99. How do you judge this?", options: ["Great feature engineering","Target leakage: the feature is computed from the price itself, and for a new flat its value is unknown","An interaction feature, all fine","It only needs scaling"], explain: "We do not know the price of a new flat, so we do not know price_per_m2 either. Such a feature only fools the test. (The district's mean price per m², computed from train, is a different story.)" }
      ]
    },
    "mp-4": {
      title: "GridSearchCV: tuning hyperparameters",
      body: `
<p><b>Parameters</b> (coefficients, tree splits) are learned by the model itself during <code>fit</code>. <b>Hyperparameters</b> (<code>C</code>, <code>max_depth</code>, <code>n_estimators</code>) are set by us in advance. How do we choose them? Try every option and take the best. But <i>where</i> do we test them?</p>
<h3>Three sets</h3>
<table>
<tr><th>Set</th><th>What for</th><th>How often we use it</th></tr>
<tr><td>Train</td><td>The model learns</td><td>Many times</td></tr>
<tr><td>Validation</td><td>We choose hyperparameters</td><td>Many times</td></tr>
<tr><td>Test</td><td>Final honest score</td><td><b>Once</b></td></tr>
</table>
<p>If we choose hyperparameters by test, the test also takes part in "training" and its score becomes optimistic. The validation role is usually played by cross-validation: train is split into 5 parts that take turns as the check.</p>
<p><b>GridSearchCV</b> walks the whole grid: every combination × every fold. Once it finds the best, it refits it on the whole train (<code>refit=True</code>).</p>
<h3>Step-by-step example</h3>
<pre><code>from sklearn.model_selection import GridSearchCV
pipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])
grid = GridSearchCV(pipe, {'model__C': [0.01, 0.1, 1, 10]},
                    cv=5, scoring='roc_auc')
grid.fit(X_train, y_train)
grid.best_params_          # {'model__C': 0.1}
grid.best_score_           # ≈ 0.817 (CV, inside train)
grid.score(X_test, y_test) # ≈ 0.804 (test, once)</code></pre>
<ol>
<li>A parameter name inside a Pipeline: <code>step_name__parameter</code> (two underscores).</li>
<li>4 values × 5 folds = 20 fits, plus 1 refit.</li>
<li><code>best_score_</code> is a bit higher than test, and that is normal: we picked the luckiest of many options.</li>
</ol>
<p>Why does this matter? If we compare 50 options on test and pick the best, we also pick random luck: the test score becomes optimistic, not real. The test is a safe: you open it once, at the end.</p>
<p>A grid grows fast: 3 parameters × 4 values = 64 combinations × 5 folds = 320 fits. So start with a wide, sparse grid, then a dense grid in the good region.</p>
<div class="tip"><b>Common mistakes:</b> (1) Writing <code>'C'</code>: inside a Pipeline you need <code>'model__C'</code>. (2) Running GridSearch on the whole X and then splitting test from the same data. (3) Treating <code>best_score_</code> as the final result. (4) A huge grid: in the browser every fit takes time.</div>`,
      ex: [
        { prompt: "Build a GridSearchCV for the Pipeline <code>pre</code> + <code>LogisticRegression(max_iter=1000)</code> (step name <code>'model'</code>): <code>C</code> ∈ [0.01, 0.1, 1, 10], cv=5, scoring='roc_auc'. Fit it on train and print <code>best_C</code> and <code>test_auc = grid.score(X_test, y_test)</code>.", hints: ["Grid: <code>{'model__C': [0.01, 0.1, 1, 10]}</code>","<code>best_C = grid.best_params_['model__C']</code>"], check: {"tests":"from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G), 'grid must be a GridSearchCV'\nassert hasattr(grid, 'best_params_'), 'Call grid.fit(X_train, y_train)'\nassert len(grid.cv_results_['params']) == 4, 'The grid should have 4 values of C'\nassert grid.scoring == 'roc_auc', 'Pass scoring=\\'roc_auc\\''\nassert best_C in [0.01, 0.1, 1, 10], 'best_C should be one of the grid values'\nassert abs(test_auc - grid.score(X_test, y_test)) < 1e-9, 'test_auc = grid.score(X_test, y_test)'\nassert 0.7 < test_auc < 0.9, f'test AUC should be ≈ 0.80, you have {test_auc:.3f}'"} },
        { prompt: "Without GridSearch, by hand: split <code>X_train</code> again (<code>X_tr, X_val</code>, test_size=0.25, random_state=0, stratify) and store the validation accuracy of a DecisionTreeClassifier for <code>max_depth</code> ∈ [2, 3, 4, 6, 10] in the dict <code>val_scores</code> (key: depth). Store the best one in <code>best_depth</code>. Then fit that depth on the whole X_train and compute the test accuracy once, into <code>test_acc</code>.", hints: ["<code>X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.25, random_state=0, stratify=y_train)</code>","<code>best_depth = max(val_scores, key=val_scores.get)</code>"], check: {"tests":"assert sorted(val_scores) == [2, 3, 4, 6, 10], 'val_scores keys: 2, 3, 4, 6, 10'\nassert all(0.5 < v <= 1 for v in val_scores.values()), 'val_scores should hold accuracy values'\nassert best_depth == max(val_scores, key=val_scores.get), 'best_depth is the depth with the highest validation accuracy'\nassert 'X_val' in dir() and len(X_val) == 113, 'Split X_train into X_tr and X_val (test_size=0.25): X_val has 113 rows'\nassert 0.6 < test_acc < 0.9, f'test_acc should be realistic, you have {test_acc}'"} },
        { prompt: "Grid: <code>max_depth</code> with 3 values, <code>n_estimators</code> with 4 values, <code>min_samples_leaf</code> with 2 values. cv=5. Not counting the refit, how many fits does GridSearchCV run?", explain: "3 × 4 × 2 = 24 combinations, each on 5 folds: 24 × 5 = 120. Plus one refit of the best at the end." }
      ]
    },
    "mp-5": {
      title: "Random Forest: why averaging helps",
      body: `
<p>In M5.1 we met the decision tree: easy to understand, but <b>unstable</b>. Change a few rows of data and the tree grows completely differently. A deep tree memorises train: high variance.</p>
<h3>Intuition: the wisdom of the crowd</h3>
<p>If one person guesses the number of beans in a jar, the error is large. The average of 100 people's guesses is far more accurate: their random errors cancel out. The SD of the mean of n independent guesses is σ / √n: 100 guesses → an error 10 times smaller. The condition: the errors must be <b>different</b>. The average of 100 identical trees is that same single tree.</p>
<h3>How Random Forest makes trees different</h3>
<ul>
<li><b>Bootstrap</b>: each tree learns on a random sample of train drawn with replacement (bagging).</li>
<li><b>Random features</b>: at each split only part of the features is considered (<code>max_features</code>, usually √p for classification).</li>
<li>Prediction: the average of the trees' probabilities.</li>
</ul>
<h3>Step-by-step example: churn, 5-fold ROC AUC</h3>
<pre><code>from sklearn.ensemble import RandomForestClassifier
rf = Pipeline([('pre', pre),
               ('model', RandomForestClassifier(n_estimators=100, random_state=0))])
cross_val_score(rf, X, y, cv=5, scoring='roc_auc').mean()</code></pre>
<table>
<tr><th>Model</th><th>AUC</th></tr>
<tr><td>Single tree (unlimited)</td><td>0.61</td></tr>
<tr><td>RF, 1 tree</td><td>0.56</td></tr>
<tr><td>RF, 10 trees</td><td>0.73</td></tr>
<tr><td>RF, 50 trees</td><td>0.76</td></tr>
<tr><td>RF, 100 trees</td><td>0.76</td></tr>
</table>
<ol>
<li>A single deep tree is weak: it memorised the noise.</li>
<li>As the number of trees grows, AUC grows: variance goes down.</li>
<li>After 50 the growth stops: adding trees does not cause overfitting, it only takes time.</li>
</ol>
<p>Extra benefits: RF needs no scaling, it is robust to outliers and not very sensitive to hyperparameters. That makes it a good "first strong model" on tabular data: run it quickly and compare with LogisticRegression.</p>
<p>Note: on this data LogisticRegression (0.81) is still better, because the relationship is mostly linear. An ensemble does not always win; you have to compare.</p>
<div class="tip"><b>Common mistakes:</b> (1) Not setting <code>random_state</code>: the result changes on every run. (2) Thinking "many trees means overfitting": not in RF, but the depth of each tree (<code>max_depth</code>, <code>min_samples_leaf</code>) does matter. (3) n_estimators=1000 in the browser: far too slow.</div>`,
      ex: [
        { prompt: "Averaging intuition. The true value is 10. 1000 trials × 50 \"trees\", each predicting 10 + noise (SD = 3). Store the SD of one tree's predictions in <code>single_sd</code> and the SD of the mean of 50 trees in <code>avg_sd</code>. Print their ratio (≈ √50 ≈ 7.1).", hints: ["One tree: <code>preds[:, 0].std()</code>","Average: <code>preds.mean(axis=1).std()</code>"], check: {"tests":"assert 2.7 < single_sd < 3.3, 'single_sd is the SD of one column (one tree), ≈ 3'\nassert 0.35 < avg_sd < 0.5, 'avg_sd is the SD of the row mean (axis=1), ≈ 3/√50 ≈ 0.42'\nassert 5.5 < single_sd / avg_sd < 9, 'The ratio should be ≈ √50 ≈ 7.1'"} },
        { prompt: "Put one <code>DecisionTreeClassifier(random_state=0)</code> and one <code>RandomForestClassifier(n_estimators=100, random_state=0)</code> into Pipelines with <code>pre</code> and compute the 5-fold ROC AUC on the whole X, y: <code>tree_auc</code>, <code>rf_auc</code> (mean values).", hints: ["<code>cross_val_score(pipe, X, y, cv=5, scoring='roc_auc').mean()</code>","Two Pipelines: one with a tree, one with a forest."], check: {"tests":"assert tree_auc is not None and rf_auc is not None, 'Compute tree_auc and rf_auc'\nassert 0.5 < tree_auc < 0.7, f'A single tree has AUC ≈ 0.61, you have {tree_auc:.3f}. Did you use scoring=\\'roc_auc\\', cv=5?'\nassert 0.7 < rf_auc < 0.85, f'Random Forest AUC ≈ 0.76, you have {rf_auc:.3f}'\nassert rf_auc - tree_auc > 0.08, 'The forest should be clearly better than a single tree'"} },
        { prompt: "Why does Random Forest need <code>max_features</code> (looking at only part of the features at each split)?", options: ["Only to make the model faster","To make trees unlike each other: if their errors differ, averaging cuts variance more","To switch off unimportant features","To increase overfitting"], explain: "If all trees start with the same strong feature, they come out similar. Random features decorrelate them, and then averaging really helps." }
      ]
    },
    "mp-6": {
      title: "Gradient boosting: fixing errors one by one",
      body: `
<p>Random Forest grows trees <b>in parallel</b> and independently. <b>Boosting</b> grows them <b>in sequence</b>: each new small tree fixes the <i>errors</i> of the previous ones. This is exactly the gradient descent from M4.3: each tree is one step in the direction of the negative gradient.</p>
<ul>
<li><code>learning_rate</code> is the step size: how much each tree contributes.</li>
<li><code>n_estimators</code> is the number of steps (number of trees).</li>
<li><code>max_depth</code>: each tree is small (2–3 levels), a "weak learner".</li>
</ul>
<h3>Step-by-step example: one step by hand</h3>
<p>Prices of four flats: 30, 40, 50, 80 mln.</p>
<ol>
<li>The starting prediction is the mean: 50. Residuals: −20, −10, 0, +30.</li>
<li>A small tree predicts the residuals, for example: −10 for the first three, +30 for the last.</li>
<li><code>learning_rate = 0.1</code>: new prediction = 50 + 0.1 · (−10) = 49 (first three), 50 + 0.1 · 30 = 53 (last).</li>
<li>The next tree fits the new residuals... Each step lowers MSE a little.</li>
</ol>
<p>A small learning_rate means careful steps: you need many trees, but the result is stable. A large learning_rate is fast, but memorises the noise.</p>
<h3>On churn (max_depth=2, 5-fold AUC)</h3>
<table>
<tr><th>learning_rate</th><th>50 trees</th><th>100 trees</th></tr>
<tr><td>0.01</td><td>0.781</td><td>0.790</td></tr>
<tr><td>0.1</td><td><b>0.804</b></td><td>0.787</td></tr>
<tr><td>0.5</td><td>0.748</td><td>0.745</td></tr>
<tr><td>1.0</td><td>0.714</td><td>0.701</td></tr>
</table>
<p>At 0.01 there are not enough trees (underfit); at 1.0 it is too aggressive (overfit). Rule: if you halve learning_rate, roughly double n_estimators.</p>
<h3>HistGradientBoosting</h3>
<p><code>HistGradientBoostingClassifier</code> puts values into histogram bins, which is much faster on large data. Bonus: it <b>handles NaN itself</b>, no imputer needed. The number of trees here is called <code>max_iter</code>. Most tabular competitions on Kaggle are won by this family (XGBoost, LightGBM, CatBoost), but only after careful tuning.</p>
<div class="tip"><b>Common mistakes:</b> (1) Treating boosting as "always the best": on this data LogisticRegression (0.81) is still competitive. (2) Changing learning_rate and leaving n_estimators as it was. (3) Deep trees (max_depth=10): boosting overfits fast. (4) Thinking trees need StandardScaler: scale has no effect on a tree.</div>`,
      ex: [
        { prompt: "Do one boosting step by hand. <code>x = area_m2</code>, <code>y = price_mln</code>. <code>pred0</code> = the mean of y (for every row), <code>res</code> = y − pred0. Fit <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code> on (x, res) and compute <code>pred1 = pred0 + 0.5 * tree.predict(x)</code>. Compute <code>mse0</code> and <code>mse1</code>.", hints: ["<code>pred0 = np.full(len(y), y.mean())</code>","The tree learns <code>res</code>, not y: <code>DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, res)</code>"], check: {"tests":"import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DT\n_p0 = _np.full(len(y), y.mean())\n_t = _DT(max_depth=2, random_state=0).fit(x, y - _p0)\n_p1 = _p0 + 0.5 * _t.predict(x)\nassert _np.allclose(_np.asarray(pred0) * _np.ones(len(y)), _p0), 'pred0 is the mean of y'\nassert _np.allclose(res, y - _p0), 'res = y - pred0'\nassert _np.allclose(pred1, _p1), 'pred1 = pred0 + 0.5 * tree.predict(x), the tree must be fitted on (x, res)'\nassert abs(mse0 - ((y - _p0) ** 2).mean()) < 1e-6 and abs(mse1 - ((y - _p1) ** 2).mean()) < 1e-6, 'mse0, mse1 are the mean of squared errors'\nassert mse1 < mse0, 'MSE should go down after one step'"} },
        { prompt: "Evaluate <code>HistGradientBoostingClassifier(max_iter=100, random_state=0)</code> on the numeric columns with NaN (<code>X_num</code>, no imputer) with 3-fold ROC AUC for learning_rate ∈ [0.05, 0.3, 1.0]. Store the results in the dict <code>scores</code> (key: learning_rate) and the best one in <code>best_lr</code>.", hints: ["Loop: <code>for lr in [0.05, 0.3, 1.0]:</code>","<code>cross_val_score(m, X_num, y, cv=3, scoring='roc_auc').mean()</code>"], check: {"tests":"assert sorted(scores) == [0.05, 0.3, 1.0], 'scores keys: 0.05, 0.3, 1.0'\nassert all(0.6 < v < 0.9 for v in scores.values()), 'AUC values should be between 0.6 and 0.9 (scoring=\\'roc_auc\\')'\nassert best_lr == max(scores, key=scores.get), 'best_lr is the learning_rate with the highest AUC'\nassert best_lr == 0.05, 'On this data a small learning_rate wins'\nassert scores[0.05] > scores[1.0], 'learning_rate=1.0 should turn out too aggressive'"} },
        { prompt: "In a boosting model you lowered learning_rate from 0.1 to 0.05. What else should change?", options: ["Nothing","Roughly double n_estimators: each step got smaller, so more steps are needed","Set max_depth to 0","Halve n_estimators"], explain: "learning_rate × n_estimators is roughly the \"distance travelled\". Smaller steps mean more steps. Check the exact value with CV." }
      ]
    },
    "mp-7": {
      title: "Imbalanced classes and choosing a threshold",
      body: `
<p>In churn only 26% of customers leave. A model that predicts "nobody leaves" has 74% accuracy, yet it is useless: it does not find a single leaver. With imbalanced classes we look not at accuracy but at <b>recall</b> (how many leavers we found), <b>precision</b> (how many of those we flagged really leave) and the business cost.</p>
<h3>Two levers</h3>
<ul>
<li><code>class_weight='balanced'</code>: errors on the rare class count as more expensive. In churn the recall of LogisticRegression rises from 0.38 to 0.72, and precision drops from 0.62 to 0.50.</li>
<li><b>Threshold</b>: by default <code>predict</code> uses <code>predict_proba ≥ 0.5</code>. That is not a business decision, just a habit. Lower the threshold and recall goes up while precision goes down.</li>
</ul>
<table>
<tr><th>Threshold</th><th>Recall</th><th>Precision</th><th>FP</th><th>FN</th></tr>
<tr><td>0.5</td><td>0.38</td><td>0.62</td><td>9</td><td>24</td></tr>
<tr><td>0.4</td><td>0.56</td><td>0.58</td><td>16</td><td>17</td></tr>
<tr><td>0.3</td><td>0.67</td><td>0.54</td><td>22</td><td>13</td></tr>
<tr><td>0.2</td><td>0.77</td><td>0.42</td><td>41</td><td>9</td></tr>
</table>
<h3>Step-by-step example: business cost</h3>
<ol>
<li>Giving a discount to a customer who would have stayed (FP) costs 5 000 ₸.</li>
<li>Missing a leaver (FN) costs 20 000 ₸ (several months of revenue).</li>
<li>For each threshold: cost = FP · 5000 + FN · 20000.</li>
<li>We choose the threshold <b>with CV predictions on train</b> (<code>cross_val_predict</code>) and look at test only to check.</li>
</ol>
<pre><code>p = cross_val_predict(model, X_train, y_train, cv=5,
                      method='predict_proba')[:, 1]
for t in np.arange(0.1, 0.91, 0.05):
    fp = ((p &gt;= t) &amp; (y_train == 0)).sum()
    fn = ((p &lt; t) &amp; (y_train == 1)).sum()
    cost = fp * 5000 + fn * 20000</code></pre>
<p>Choosing between recall and precision is a business question, not a technical one. If a discount is cheap and losing a customer is expensive, recall matters. If each alert is an expensive call by an operator, precision matters. So ask the business for the costs.</p>
<p>On this data the cheapest threshold is ≈ 0.15: FN is four times as expensive, so it pays to flag more customers.</p>
<div class="tip"><b>Common mistakes:</b> (1) Boasting about accuracy on imbalanced data. (2) Choosing the threshold on test: that is leakage too. (3) Forgetting <code>stratify=y</code> in <code>train_test_split</code>: the share of leavers in test can shift. (4) Overdoing class_weight and threshold together: pick one and check it against the cost.</div>`,
      ex: [
        { prompt: "Train two Pipelines: <code>pre</code> + LogisticRegression(max_iter=1000), and the same with <code>class_weight='balanced'</code>. Store test recall in <code>rec_plain</code> and <code>rec_bal</code>, and precision in <code>prec_plain</code> and <code>prec_bal</code>.", hints: ["<code>LogisticRegression(max_iter=1000, class_weight='balanced')</code>","<code>recall_score(y_test, model.predict(X_test))</code>"], check: {"tests":"assert 0.25 < rec_plain < 0.5, f'The plain model has recall ≈ 0.38, you have {rec_plain:.3f}'\nassert rec_bal > rec_plain + 0.15, 'The balanced model should have a clearly higher recall (≈0.72)'\nassert prec_bal < prec_plain, 'When recall goes up, precision usually goes down'\nassert 0.3 < prec_bal < 0.7, 'prec_bal is about 0.5'"} },
        { prompt: "In the starter <code>p</code> holds CV probabilities on train. FP = 5000 ₸, FN = 20000 ₸. For every threshold in <code>np.arange(0.1, 0.91, 0.05)</code> compute the cost and store it in the dict <code>costs</code> (key: <code>round(t, 2)</code>). Store the cheapest threshold in <code>best_t</code> and its cost in <code>best_cost</code>.", hints: ["FP: <code>((p &gt;= t) &amp; (yt == 0)).sum()</code>, FN: <code>((p &lt; t) &amp; (yt == 1)).sum()</code>","<code>best_t = min(costs, key=costs.get)</code>"], check: {"tests":"import numpy as _np\n_c = {}\nfor _t in _np.arange(0.1, 0.91, 0.05):\n    _c[round(_t, 2)] = ((p >= _t) & (yt == 0)).sum() * 5000 + ((p < _t) & (yt == 1)).sum() * 20000\nassert len(costs) == 17, f'There should be 17 thresholds (0.10, 0.15, …, 0.90), you have {len(costs)}'\nassert all(abs(costs[k] - _c[k]) < 1e-6 for k in _c if k in costs), 'Cost = FP * 5000 + FN * 20000; FP: p >= t and y = 0, FN: p < t and y = 1'\n_bt = min(_c, key=_c.get)\nassert abs(best_t - _bt) < 1e-9, f'The cheapest threshold is {_bt}'\nassert best_cost == _c[_bt], 'best_cost is the cost of that threshold'\nassert best_t < 0.5, 'FN is expensive, so the threshold should be below 0.5'"} },
        { prompt: "On test the model made 20 FP and 5 FN. FP = 5 000 ₸, FN = 20 000 ₸. What is the total cost in tenge?", unit: "₸", explain: "20 · 5 000 + 5 · 20 000 = 100 000 + 100 000 = 200 000 ₸." }
      ]
    },
    "mp-8": {
      title: "KMeans: customer segments",
      body: `
<p>Until now y was known (supervised). In <b>clustering</b> there is no y: we ask "what natural groups do customers fall into?" (unsupervised). Marketing segments and store groupings are built this way.</p>
<h3>The KMeans algorithm</h3>
<ol>
<li>k centres (centroids) are picked at random.</li>
<li>Each point is assigned to the nearest centre (Euclidean distance).</li>
<li>Each centre moves to the mean of its points.</li>
<li>Steps 2–3 repeat until nothing changes.</li>
</ol>
<p>The result depends on the starting centres, so use <code>n_init=10</code> (run 10 times and keep the best) and <code>random_state=0</code>.</p>
<h3>Scaling is a must</h3>
<p>Distance compares units: <code>monthly_fee</code> is in thousands (3 300–11 200), <code>support_calls</code> is 0–6. Without scaling KMeans looks only at the plan price. After <code>StandardScaler</code> every feature gets an equal vote.</p>
<h3>Choosing k</h3>
<ul>
<li><b>Inertia</b> is the sum of squared distances from points to their centre. It always falls as k grows; the "elbow" is where the fall slows down.</li>
<li><b>Silhouette</b> (−1…1) shows how much closer a point is to its own cluster than to the neighbouring one. Higher is better.</li>
</ul>
<h3>Step-by-step example: churn segments</h3>
<pre><code>seg = df[['tenure_months', 'monthly_fee', 'data_gb', 'support_calls']].dropna()
Z = StandardScaler().fit_transform(seg)
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(Z)
seg['segment'] = km.labels_
seg.groupby('segment').mean()</code></pre>
<table>
<tr><th>k</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>
<tr><td>inertia</td><td>1562</td><td>1193</td><td>964</td><td>816</td><td>729</td></tr>
<tr><td>silhouette</td><td>0.43</td><td>0.29</td><td>0.28</td><td>0.30</td><td>0.29</td></tr>
</table>
<p>Silhouette picks k=2 (premium vs everyone else). But k=3 is more useful to the business: "new customers on cheap plans" (~19 months), "loyal customers on cheap plans" (~55 months), "premium, heavy data users" (~35 GB). You can also look at each segment's churn rate: y took no part in the clustering, but it helps explain the result. The metric gives a direction; the decision depends on whether a segment is clear and actionable.</p>
<div class="tip"><b>Common mistakes:</b> (1) Clustering without scaling. (2) Treating cluster numbers (0, 1, 2) as meaningful: they are just labels. (3) Including <code>customer_id</code> or y in the clustering. (4) Choosing the k with the lowest inertia: that is always the largest k.</div>`,
      ex: [
        { prompt: "Scale the four columns of <code>seg</code> with <code>StandardScaler</code> (<code>Z</code>) and fit <code>KMeans(n_clusters=3, n_init=10, random_state=0)</code>. Store the labels in <code>seg['segment']</code> and print <code>profile = seg.groupby('segment').mean()</code>.", hints: ["<code>Z = StandardScaler().fit_transform(seg[cols])</code>","<code>seg['segment'] = km.labels_</code>"], check: {"tests":"import numpy as _np\nassert 'segment' in seg.columns and len(seg) == 583, 'Add the segment column to seg (583 rows)'\nassert set(seg['segment'].unique()) == {0, 1, 2}, 'There should be 3 clusters'\nassert profile.shape[0] == 3, 'profile has 3 rows'\nassert _np.allclose(_np.asarray(Z).mean(axis=0), 0, atol=1e-6), 'Z is the data after StandardScaler'\nassert profile['monthly_fee'].max() > 10000, 'One cluster should be premium customers (monthly_fee > 10 000)'\nassert profile['tenure_months'].max() - profile['tenure_months'].min() > 20, 'After scaling, tenure should differ between clusters too'"} },
        { prompt: "For k = 2…6 fit KMeans(n_init=10, random_state=0) and fill the dicts <code>inertias[k]</code> and <code>sils[k]</code> (silhouette_score). Store the k with the highest silhouette in <code>best_k</code>.", hints: ["<code>for k in range(2, 7):</code>","<code>silhouette_score(Z, km.labels_)</code>, <code>km.inertia_</code>"], check: {"tests":"assert sorted(inertias) == [2, 3, 4, 5, 6] and sorted(sils) == [2, 3, 4, 5, 6], 'Values are needed for k = 2, 3, 4, 5, 6'\nassert all(inertias[k] > inertias[k + 1] for k in range(2, 6)), 'Inertia should fall as k grows'\nassert all(-1 <= v <= 1 for v in sils.values()), 'Silhouette is between −1 and 1'\nassert best_k == max(sils, key=sils.get), 'best_k is the k with the highest silhouette'\nassert best_k == 2, 'On this data silhouette picks k=2'"} },
        { prompt: "You split customers by <code>monthly_fee</code> (₸) and <code>support_calls</code> with KMeans without scaling. What happens?", options: ["Both features have equal influence","The clusters are in effect split only by monthly_fee: its scale is thousands of times larger","KMeans throws an error","The clusters are split only by support_calls"], explain: "In Euclidean distance a 1000 ₸ difference is a thousand times \"bigger\" than 1 call. StandardScaler evens the features out." }
      ]
    },
    "mp-9": {
      title: "Explaining a model: importance and SHAP",
      body: `
<p>A manager asks: "Why did the model call this customer risky?" Explanations come at two levels: <b>global</b> (which features matter overall) and <b>local</b> (why one particular prediction is what it is).</p>
<h3>1. feature_importances_</h3>
<p>Available in tree models: how much each feature reduced impurity in the splits. Fast, but with two drawbacks: it is computed on train, and it overrates continuous features with many values.</p>
<h3>2. permutation_importance</h3>
<p>The idea is very simple: shuffle one column in test and measure how much the metric drops. If it drops, the model relies on that feature. If not, the feature is useless.</p>
<h3>Step-by-step example: churn, RandomForest (max_depth=5)</h3>
<pre><code>from sklearn.inspection import permutation_importance
r = permutation_importance(rf, X_test, y_test, n_repeats=5,
                           random_state=0, scoring='roc_auc')
pd.Series(r.importances_mean, index=X_test.columns).sort_values()</code></pre>
<table>
<tr><th>Feature</th><th>feature_importances_</th><th>permutation (AUC drop)</th></tr>
<tr><td>tenure_months</td><td>0.37</td><td>0.217</td></tr>
<tr><td>support_calls</td><td>0.14</td><td>0.041</td></tr>
<tr><td>data_gb</td><td>0.14</td><td>0.000</td></tr>
<tr><td>age</td><td>0.11</td><td>−0.007</td></tr>
<tr><td>has_contract</td><td>0.07</td><td>0.070</td></tr>
</table>
<ol>
<li>Both methods put tenure_months first.</li>
<li>data_gb and age are "important" by impurity, but shuffling them does not change AUC: they were only used to split noise in train.</li>
<li>Permutation works on the raw columns of the Pipeline: <code>city</code> is scored as one feature.</li>
</ol>
<p>Remember: both methods tell you "what the model relies on", not "what causes what in the world". With LogisticRegression it is simpler: the coefficients of scaled features show direction and strength (tenure −1.1, support_calls +0.8).</p>
<h3>3. SHAP (the concept)</h3>
<p>SHAP is based on Shapley values from game theory: it "splits the prediction fairly" among the features. For each customer: <b>prediction = base value + sum of feature contributions</b>. For example: base 0.26, tenure = 3 months +0.25, support_calls = 5 +0.12, has_contract = 1 −0.08 → 0.55. That is a local explanation. The <code>shap</code> package is not available in the browser; at work you would use <code>shap.TreeExplainer(model)</code>.</p>
<div class="tip"><b>Common mistakes:</b> (1) Reading importance as cause and effect: the model sees correlation. (2) Correlated features share importance, so both can look "weak". (3) Computing permutation importance on train. (4) Comparing LogisticRegression coefficients without scaling.</div>`,
      ex: [
        { prompt: "Fit the <code>rf</code> Pipeline on train. Store the forest's <code>feature_importances_</code> in a Series <code>imp</code> with the names from <code>get_feature_names_out()</code> of <code>pre</code>, sorted in descending order. Print the top 5.", hints: ["<code>rf.named_steps['pre'].get_feature_names_out()</code>","<code>pd.Series(rf.named_steps['model'].feature_importances_, index=names).sort_values(ascending=False)</code>"], check: {"tests":"import pandas as _pd\nassert isinstance(imp, _pd.Series), 'imp — pandas Series'\nassert len(imp) == 14, 'All 14 features should be there'\nassert abs(imp.sum() - 1) < 1e-6, 'feature_importances_ sum to 1'\nassert imp.index[0] == 'num__tenure_months', f'The most important feature should be num__tenure_months, you have {imp.index[0]}'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Sort in descending order (ascending=False)'"} },
        { prompt: "For the fitted <code>rf</code>, compute <code>permutation_importance</code> on test (n_repeats=5, random_state=0, scoring='roc_auc'). Store <code>importances_mean</code> in a Series <code>perm</code> with the names from <code>X_test.columns</code>, sorted in descending order.", hints: ["<code>permutation_importance(rf, X_test, y_test, n_repeats=5, random_state=0, scoring='roc_auc')</code>","<code>pd.Series(r.importances_mean, index=X_test.columns)</code>"], check: {"tests":"import pandas as _pd\nassert isinstance(perm, _pd.Series) and len(perm) == 8, 'perm is a Series over the 8 columns of X_test'\nassert perm.index[0] == 'tenure_months', 'The most important is tenure_months'\nassert perm['tenure_months'] > 0.1, 'Shuffling tenure_months makes AUC drop clearly'\nassert perm['data_gb'] < 0.03, 'data_gb should come out unimportant by permutation (scoring=\\'roc_auc\\', on X_test?)'\nassert list(perm.values) == sorted(perm.values, reverse=True), 'Sort in descending order'"} },
        { prompt: "SHAP: the base value (mean churn probability) is 0.26. Contributions for one customer: tenure +0.25, support_calls +0.12, has_contract −0.08, the rest 0. What does the model predict for this customer?", explain: "SHAP is additive: 0.26 + 0.25 + 0.12 − 0.08 = 0.55." }
      ]
    },
    "mp-10": {
      title: "Saving a model and the model card",
      body: `
<p>A model left in a notebook helps nobody. You save it to a file and load it somewhere else (a server, a daily script). The key point is to save <b>the whole Pipeline</b>: the imputer medians, the scaler and the one-hot categories travel with the model.</p>
<pre><code>import joblib
joblib.dump(model, 'churn_model.joblib')
loaded = joblib.load('churn_model.joblib')
loaded.predict(new_clients)      # pass a raw DataFrame</code></pre>
<h3>Model card: what to document</h3>
<ul>
<li><b>Purpose</b>: what it predicts, who uses it, for which decision.</li>
<li><b>Data</b>: where from, which period, how many rows, how missing values were filled.</li>
<li><b>Metrics</b>: test AUC, recall, precision, the chosen threshold and its business reasoning.</li>
<li><b>Limitations</b>: where it works badly, which features it depends on.</li>
<li><b>Fairness</b>: metrics by group.</li>
<li>Version, date, owner, sklearn version.</li>
</ul>
<h3>Step-by-step example: fairness by city</h3>
<p>Test recall of the churn model (LogisticRegression, threshold 0.5):</p>
<table>
<tr><th>City</th><th>Customers in test</th><th>Leavers</th><th>Recall</th></tr>
<tr><td>Almaty</td><td>55</td><td>14</td><td>0.57</td></tr>
<tr><td>Astana</td><td>38</td><td>13</td><td>0.38</td></tr>
<tr><td>Karaganda</td><td>16</td><td>5</td><td>0.40</td></tr>
<tr><td>Aktobe</td><td>20</td><td>3</td><td>0.00</td></tr>
<tr><td>Shymkent</td><td>21</td><td>4</td><td>0.00</td></tr>
</table>
<ol>
<li>In Aktobe and Shymkent the model did not find a single leaver, so customers in these cities will not get a discount offer.</li>
<li>But there are only 3–4 leavers: one customer changes recall by 0.25. This is not proof that "the model is unfair", it is a sign that "there is little data, keep watching".</li>
<li>We write in the model card: group sizes, metrics, a recommendation (lower the threshold, collect more data).</li>
</ol>
<p>A model card is not bureaucracy. If the model gets worse in six months, you or a colleague will ask: "What data and which threshold was it trained with?" The answer should be on that page. Repeat the fairness check after every retraining: data changes, and so does the gap between groups.</p>
<div class="tip"><b>Common mistakes:</b> (1) Saving only the model and forgetting the preprocessing. (2) Loading in a different sklearn version: a warning or an error. (3) Opening a .joblib/.pickle file from an unknown source: it can run code. (4) Checking fairness only with overall accuracy.</div>`,
      ex: [
        { prompt: "Save the fitted <code>model</code> to the file <code>churn_model.joblib</code> with <code>joblib.dump</code>, then load it back into <code>loaded</code>. Store whether their predictions on X_test are identical in the variable <code>same</code> (bool).", hints: ["<code>joblib.dump(model, 'churn_model.joblib')</code>","<code>same = bool((loaded.predict(X_test) == model.predict(X_test)).all())</code>"], check: {"tests":"import os as _os\nfrom sklearn.pipeline import Pipeline as _P\nassert _os.path.exists('churn_model.joblib'), 'File churn_model.joblib not found: joblib.dump(model, ...)'\nassert isinstance(loaded, _P), 'loaded is the loaded Pipeline (joblib.load)'\nassert loaded is not model, 'loaded should be loaded from the file'\nassert bool(same) is True, 'same = (loaded.predict(X_test) == model.predict(X_test)).all() → True'"} },
        { prompt: "Fairness check. The table <code>res</code> holds the city, the true value and the prediction for test. Compute recall for each city and store it in a Series <code>by_city</code> (index: city). Store the number of leavers in each city in a Series <code>churners</code>.", hints: ["<code>res.groupby('city').apply(lambda g: recall_score(g['y'], g['pred'], zero_division=0), include_groups=False)</code>","Or a loop: <code>for c, g in res.groupby('city'):</code>"], check: {"tests":"from sklearn.metrics import recall_score as _rs\nassert by_city is not None and len(by_city) == 5, 'by_city should have 5 cities'\nfor _c, _g in res.groupby('city'):\n    assert abs(by_city[_c] - _rs(_g['y'], _g['pred'], zero_division=0)) < 1e-9, f'Wrong recall for {_c}'\nassert abs(by_city['Алматы'] - 8 / 14) < 1e-9, 'In Almaty recall = 8/14 ≈ 0.57'\nassert int(churners['Ақтөбе']) == 3 and int(churners.sum()) == 39, 'churners is y.sum() in each city'"} },
        { prompt: "Write a short <b>model card</b> for the churn model (at least 80 words): purpose, data, metrics and threshold, limitations, fairness by city. Then grade it honestly on four criteria. To pass you need at least <b>3 / 4</b> on each criterion.", done: "Put the model card in a MODEL_CARD.md file in the project repository.", criteria: [{"name":"Purpose and user","levels":["Not stated","Only \"predicts churn\"","Says who uses it and for which decision","States the decision, the user and what the model must NOT be used for"]},{"name":"Data and metrics","levels":["No numbers","Only accuracy","Test AUC, recall, precision and row count","Metrics, threshold and its justification by business cost"]},{"name":"Limitations","levels":["None","Vague words (\"may make mistakes\")","A specific limitation (missing values, little data, synthetic data)","Limitations, their effect on the decision and a retraining plan"]},{"name":"Fairness","levels":["Not mentioned","The claim \"the model is fair\"","Recall by city is given","Recall, group sizes, a small-sample warning and a concrete action"]}] }
      ]
    },
    "mp-gate": {
      title: "Module exam: ML in Practice",
      body: `
<p>The final check. Pipeline, leakage, feature engineering, tuning, ensembles, threshold and explanation, all together. Keep models small (n_estimators ≤ 100, cv ≤ 5) and set <code>random_state</code>.</p>`,
      ex: [
        { prompt: "Predict flat prices. Build a Pipeline (or GridSearchCV) named <code>model</code> that accepts the raw columns of <code>X_train</code> (district as text). Choose the feature engineering and the model yourself. The test R² (<code>model.score(X_test, y_test)</code>) must be at least <b>0.90</b>. Do not use <code>price_mln</code> as a feature.", hints: [], check: {"tests":"from sklearn.pipeline import Pipeline as _P\nfrom sklearn.model_selection import GridSearchCV as _G\nassert isinstance(model, (_P, _G)), 'model is a Pipeline or a GridSearchCV'\nassert 'price_mln' not in X_train.columns, 'price_mln must not be a feature'\nassert not any('price' in str(c) for c in X_test.columns), 'A feature built from the price is target leakage'\nassert len(X_test) == 100, 'Do not change X_test (100 rows)'\n_r2 = model.score(X_test, y_test)\nassert _r2 >= 0.90, f'Test R² should be at least 0.90, you have {_r2:.3f}. Did you add district with OneHotEncoder?'"} },
        { prompt: "Churn: the retention team wants to find at least <b>70%</b> of leavers (recall ≥ 0.70), while at least <b>40%</b> of alerts must be correct (precision ≥ 0.40). Provide <code>model</code> (a Pipeline with predict_proba) and a number <code>threshold</code>. The test: <code>(model.predict_proba(X_test)[:, 1] &gt;= threshold)</code>.", hints: [], check: {"tests":"from sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert model is not None and hasattr(model, 'predict_proba'), 'model is a fitted model with predict_proba'\nassert 0 < threshold < 1, 'threshold is between 0 and 1'\nassert len(X_test) == 150, 'Do not change X_test'\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\n_r, _p = _rs(y_test, _yp), _ps(y_test, _yp, zero_division=0)\nassert _r >= 0.70, f'recall {_r:.2f} < 0.70: lower the threshold or use class_weight'\nassert _p >= 0.40, f'precision {_p:.2f} < 0.40: the threshold is too low'"} },
        { prompt: "An analyst filled missing <code>age</code> with the median of the whole data, fit StandardScaler on the whole data, and then split into train/test. What is the best fix?", options: ["Use the mean instead of the median","Split first, put SimpleImputer and StandardScaler inside a Pipeline and fit them on train only","Increase test_size to 0.5","Replace StandardScaler with MinMaxScaler"], explain: "Every step that learns from data must be fit on train only. A Pipeline guarantees this automatically in CV and in production." },
        { prompt: "In a Random Forest, the feature_importances_ of <code>data_gb</code> is 0.14, but its permutation importance on test is ≈ 0. What is the best conclusion?", options: ["data_gb is one of the most important features","Impurity importance shows the feature was used to split noise in train; on test it does not improve predictions","Permutation importance was computed wrongly","data_gb causes churn"], explain: "Impurity importance is computed on train and overrates continuous features. Permutation on test directly measures \"how much worse the model gets without the feature\"." }
      ]
    }
  }
});
