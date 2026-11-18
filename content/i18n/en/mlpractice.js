// M5.2 ML in Practice: English text. Code, solutions and expected output are in content/mlpractice.js.
DJ.i18n.patch({
  modules: {
    "m5-2": { intro: "In real work what matters is not the model itself but everything around it: preparing the data, guarding against leakage, tuning hyperparameters, strong ensembles, imbalanced classes, clustering and explaining the model. Then come the applied topics that vacancies ask for: time series, CatBoost/XGBoost/LightGBM in practice, PCA, text (TF-IDF), model monitoring (PSI, out-of-time), antifraud and recommender systems. You will do all of it with scikit-learn on real data: churn, flats, sales, reviews, loan applications, transactions." }
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
<p>Read the table row by row. At 0.01, 50 trees are not enough (0.781, underfit): going up to 100 trees the result is still growing (0.790), so even more trees are needed. At 0.1 it is the other way round: 50 trees are enough (0.804), and at 100 trees the model starts memorising noise (0.787). 0.5 and 1.0 are too aggressive: bad whatever the number of trees (overfit). Rule: if you halve learning_rate, roughly double n_estimators.</p>
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
    "mp-ts": {
      title: "Time series: splitting by time, lag and rolling features, baselines",
      body: `
<p>Until now the order of the rows did not matter: shuffle the flats and nothing changes. In a <b>time series</b>, order is everything. A shop owner asks you: "how many items will sell tomorrow?" You know only the <b>past</b>.</p>
<p>The data: <code>sales_daily.csv</code> — a shop's daily sales for 2024–2025 (730 days). Columns: <code>date</code>, <code>sales</code> (units), <code>promo</code> (was there a promotion that day, 0/1).</p>
<h3>What is inside the series</h3>
<ul>
<li><b>Trend</b>: sales grow slowly (an average of 199 in Q1 2024, 253 in Q4 2025).</li>
<li><b>Weekly seasonality</b>: Monday–Thursday ≈ 210–220, Friday 241, Saturday 272, Sunday 254.</li>
<li><b>Noise</b>: random variation that cannot be explained.</li>
</ul>
<h3>Rule 1: split by time</h3>
<p><code>train_test_split</code> shuffles the rows at random. In a time series that is leakage: to predict 15 March the model has already "seen" 16 March. The right way: <b>the past is train, the future is test</b>.</p>
<pre><code>df = pd.read_csv('sales_daily.csv', parse_dates=['date'])
train = df[df['date'] &lt; '2025-07-01']    # 547 days
test = df[df['date'] &gt;= '2025-07-01']    # 183 days</code></pre>
<h3>Rule 2: a baseline first</h3>
<table>
<tr><th>Baseline</th><th>Forecast</th><th>Code</th><th>Test MAE</th></tr>
<tr><td>Mean</td><td>the train mean</td><td><code>train['sales'].mean()</code></td><td>30.7</td></tr>
<tr><td><b>Naive</b></td><td>tomorrow = today</td><td><code>df['sales'].shift(1)</code></td><td>21.6</td></tr>
<tr><td><b>Seasonal naive</b></td><td>tomorrow = the same day last week</td><td><code>df['sales'].shift(7)</code></td><td><b>15.2</b></td></tr>
</table>
<p>Seasonal naive wins because the weekly seasonality is strong: a Saturday should be compared with last Saturday. Any model has to beat this 15.2, otherwise there is no point in it.</p>
<h3>MAE and MAPE</h3>
<p><b>MAPE</b> is the average error as a percentage: <code>mean(|actual − forecast| / actual) · 100</code>. The business understands it: "we are off by 6% on average".</p>
<ol>
<li>Actual values: 200, 250, 300. Forecast: 210, 240, 330.</li>
<li>Errors: 10, 10, 30. MAE = 50 / 3 ≈ 16.7 units.</li>
<li>Percentages: 5%, 4%, 10%. MAPE = 19 / 3 ≈ 6.3%.</li>
</ol>
<h3>Lag and rolling features</h3>
<p>To feed a time series to an ordinary model (LinearRegression, boosting), we turn the past into <b>features</b>:</p>
<pre><code>df['lag_1'] = df['sales'].shift(1)                      # yesterday's sales
df['lag_7'] = df['sales'].shift(7)                      # a week ago
df['roll_7'] = df['sales'].shift(1).rolling(7).mean()   # the mean of the last 7 days
d = df.dropna()                                         # the first 7 days have no lags</code></pre>
<ol>
<li><code>shift(1)</code> moves the column down one row: each day's row holds yesterday's value.</li>
<li><code>rolling(7).mean()</code> is a moving average. The <code>shift(1)</code> before it is essential: without it <b>today's</b> sales fall inside the window, and that is exactly what we are predicting.</li>
<li><code>promo</code> can be used as a feature: promotions are planned in advance, so tomorrow's value is known today.</li>
<li>LinearRegression with these four features gives a test MAE of 13.1 (MAPE 5.2%). Add the day of the week (<code>date.dt.dayofweek</code>, one-hot) and it is 9.6.</li>
</ol>
<h3>TimeSeriesSplit: CV that respects time</h3>
<p>Ordinary K-fold shuffles too. <code>TimeSeriesSplit</code> lengthens train in each fold and validates on the next period:</p>
<table>
<tr><th>Fold</th><th>Train (rows)</th><th>Validation (rows)</th><th>MAE</th></tr>
<tr><td>1</td><td>1–147</td><td>148–291</td><td>14.2</td></tr>
<tr><td>2</td><td>1–291</td><td>292–435</td><td>11.6</td></tr>
<tr><td>3</td><td>1–435</td><td>436–579</td><td>14.6</td></tr>
<tr><td>4</td><td>1–579</td><td>580–723</td><td>12.9</td></tr>
</table>
<div class="tip">In this lesson we forecast <b>one day ahead</b>: yesterday's actual sales are known and serve as lag_1. For a forecast 30 days ahead there is no lag_1: you either take lags that fit the horizon (lag_30) or feed the model's forecasts back in as its inputs, one step at a time. At an interview, always clarify: "what is the horizon?"</div>
<h3>Common mistakes</h3>
<ul>
<li>Splitting a time series at random, or using an ordinary <code>KFold(shuffle=True)</code>.</li>
<li>Computing <code>rolling</code> without <code>shift(1)</code>: the target ends up inside the feature.</li>
<li>Building a model with no baseline. Is "MAE = 13" good? You cannot say without knowing that seasonal naive gives 15.2.</li>
<li>Using MAPE on a series with values close to 0: division by zero, and the percentages blow up.</li>
<li>Adding a feature that will be unknown at forecast time (for example, the number of customers that same day).</li>
</ul>`,
      ex: [
        { prompt: "Split the data by time: <code>train</code> — the rows before <code>2025-07-01</code>, <code>test</code> — from that date on. Make two baselines: <code>df['naive']</code> = yesterday's sales, <code>df['snaive']</code> = sales 7 days ago. Store their MAE over the test period in <code>mae_naive</code> and <code>mae_snaive</code>. (Add the baseline columns <b>before</b> splitting.)", check: { tests: "import pandas as _pd\nimport numpy as _np\n_d = _pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_m = _d['date'] >= '2025-07-01'\n_n = (_d['sales'] - _d['sales'].shift(1)).abs()[_m].mean()\n_s = (_d['sales'] - _d['sales'].shift(7)).abs()[_m].mean()\nassert len(train) == 547 and len(test) == 183, f\"train should be 547 days and test 183, you have {len(train)} and {len(test)}\"\nassert train['date'].max() < test['date'].min(), \"The last day of train should come before the first day of test\"\nassert abs(mae_naive - _n) < 1e-6, f\"mae_naive should be ≈ {_n:.2f}: shift(1), over the test period only\"\nassert abs(mae_snaive - _s) < 1e-6, f\"mae_snaive should be ≈ {_s:.2f}: shift(7), over the test period only\"" }, hints: ["<code>df['naive'] = df['sales'].shift(1)</code>, <code>df['snaive'] = df['sales'].shift(7)</code>", "<code>test = df[df['date'] &gt;= '2025-07-01']</code>, then <code>(test['sales'] - test['naive']).abs().mean()</code>"] },
        { prompt: "Add three features to <code>df</code>: <code>lag_1</code>, <code>lag_7</code> and <code>roll_7</code> (the mean of the last 7 days, not counting today). <code>d = df.dropna()</code>. Split by time (<code>2025-07-01</code>) and train a <code>LinearRegression</code> named <code>model</code> on train with the features <code>['lag_1', 'lag_7', 'roll_7', 'promo']</code>. Compute <code>mae_model</code> and <code>mape_model</code> (in percent) on test.", check: { tests: "import pandas as _pd\nimport numpy as _np\n_d = _pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression as _LR\nassert abs(df.loc[7, 'roll_7'] - _d['sales'].iloc[0:7].mean()) < 1e-9, \"roll_7 must not include today's sales: df['sales'].shift(1).rolling(7).mean()\"\nassert abs(df.loc[7, 'lag_1'] - _d['sales'].iloc[6]) < 1e-9 and abs(df.loc[7, 'lag_7'] - _d['sales'].iloc[0]) < 1e-9, \"lag_1 = shift(1), lag_7 = shift(7)\"\n_d['lag_1'] = _d['sales'].shift(1); _d['lag_7'] = _d['sales'].shift(7); _d['roll_7'] = _d['sales'].shift(1).rolling(7).mean()\n_d = _d.dropna()\n_F = ['lag_1', 'lag_7', 'roll_7', 'promo']\n_tr = _d[_d['date'] < '2025-07-01']; _te = _d[_d['date'] >= '2025-07-01']\n_p = _LR().fit(_tr[_F], _tr['sales']).predict(_te[_F])\n_mae = _np.abs(_te['sales'] - _p).mean()\n_mape = (_np.abs(_te['sales'] - _p) / _te['sales']).mean() * 100\nassert hasattr(model, 'coef_') and len(model.coef_) == 4, \"model should be trained on four features\"\nassert abs(mae_model - _mae) < 1e-6, f\"mae_model should be ≈ {_mae:.2f}. Train: before 2025-07-01, test: after\"\nassert abs(mape_model - _mape) < 1e-6, f\"mape_model ≈ {_mape:.2f} (in percent): mean(|actual − forecast| / actual) * 100\"" }, hints: ["<code>df['roll_7'] = df['sales'].shift(1).rolling(7).mean()</code>", "MAPE: <code>(np.abs(test['sales'] - pred) / test['sales']).mean() * 100</code>"] },
        { prompt: "The features are ready (<code>d</code>, <code>F</code>). Score a <code>LinearRegression</code> with <code>cross_val_score</code> using <code>TimeSeriesSplit(n_splits=4)</code> (<code>scoring='neg_mean_absolute_error'</code>). Store each fold's MAE (a positive number) in the array <code>cv_mae</code> and the mean in <code>cv_mean</code>.", check: { tests: "import numpy as _np\nfrom sklearn.model_selection import TimeSeriesSplit as _TS, cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LR\n_c = -_cvs(_LR(), d[F], d['sales'], cv=_TS(n_splits=4), scoring='neg_mean_absolute_error')\nassert len(cv_mae) == 4, \"cv_mae is the MAE of the 4 folds\"\nassert all(v > 0 for v in cv_mae), \"MAE should be positive: cross_val_score returns negative values, put a minus in front\"\nassert _np.allclose(_np.asarray(cv_mae, dtype=float), _c, atol=1e-6), \"The MAE values do not match: cv=TimeSeriesSplit(n_splits=4), scoring='neg_mean_absolute_error'\"\nassert abs(cv_mean - _c.mean()) < 1e-6, f\"cv_mean should be ≈ {_c.mean():.2f}\"" }, hints: ["<code>tscv = TimeSeriesSplit(n_splits=4)</code>, and pass it as <code>cv=tscv</code>", "<code>cv_mae = -cross_val_score(LinearRegression(), d[F], d['sales'], cv=tscv, scoring='neg_mean_absolute_error')</code>"] },
        { prompt: "An analyst split daily sales data with <code>train_test_split(shuffle=True)</code> and got MAE = 8. In production the MAE was 15. What is the most likely reason?", options: ["The model is too simple", "With a random split, the days on either side of each test day were in train: the model learned while \"seeing the future\"", "random_state was chosen badly", "MAE does not work for time series"], explain: "In a time series neighbouring days are very similar. A random split is leakage. Only a split by time gives a score that resembles production." }
      ]
    },
    "mp-gbm": {
      title: "Gradient boosting in practice: CatBoost/XGBoost/LightGBM",
      body: `
<p>A third of Data Scientist vacancies in Kazakhstan mention <b>CatBoost, XGBoost</b> or <b>LightGBM</b>. These three are the production versions of gradient boosting: on tabular data (banking, telecom, retail) they are usually the strongest models. You saw the idea in an earlier lesson: trees fix errors one after another. Now — how they are tuned in practice.</p>
<p>These libraries are not available in the browser, so we use sklearn's <code>HistGradientBoostingClassifier</code>. It is modelled on LightGBM, and the parameters translate easily from one to another.</p>
<h3>A parameter dictionary</h3>
<table>
<tr><th>Meaning</th><th>sklearn HistGB</th><th>XGBoost</th><th>LightGBM</th><th>CatBoost</th></tr>
<tr><td>Number of trees</td><td><code>max_iter</code></td><td><code>n_estimators</code></td><td><code>n_estimators</code></td><td><code>iterations</code></td></tr>
<tr><td>Step size</td><td><code>learning_rate</code></td><td><code>learning_rate</code></td><td><code>learning_rate</code></td><td><code>learning_rate</code></td></tr>
<tr><td>Tree size</td><td><code>max_depth</code>, <code>max_leaf_nodes</code></td><td><code>max_depth</code></td><td><code>num_leaves</code></td><td><code>depth</code></td></tr>
<tr><td>L2 regularization</td><td><code>l2_regularization</code></td><td><code>reg_lambda</code></td><td><code>reg_lambda</code></td><td><code>l2_leaf_reg</code></td></tr>
<tr><td>Early stopping</td><td><code>early_stopping</code>, <code>n_iter_no_change</code></td><td><code>early_stopping_rounds</code></td><td><code>lgb.early_stopping()</code></td><td><code>early_stopping_rounds</code></td></tr>
<tr><td>Categories</td><td><code>categorical_features</code></td><td><code>enable_categorical</code></td><td><code>categorical_feature</code></td><td><code>cat_features</code></td></tr>
</table>
<h3>Early stopping: the model finds the number of trees itself</h3>
<p>With too many trees, boosting starts memorising noise. How many trees do we need? Instead of searching by hand, we split a <b>validation</b> part off train. After every new tree we measure the validation error. If it does not improve for N steps in a row, we stop.</p>
<pre><code>from sklearn.ensemble import HistGradientBoostingClassifier
es = HistGradientBoostingClassifier(
    max_iter=300, learning_rate=0.1, max_depth=3,
    early_stopping=True,        # by default it turns on only for 10,000+ rows
    validation_fraction=0.2,    # 20% of train goes to validation
    n_iter_no_change=10,        # stop after 10 steps with no improvement
    random_state=0)
es.fit(X_train[num], y_train)
print(es.n_iter_)               # 39</code></pre>
<table>
<tr><th>Model</th><th>Actual number of trees</th><th>Test AUC</th></tr>
<tr><td>300 trees, no early stopping</td><td>300</td><td>0.711</td></tr>
<tr><td>Up to 300, with early stopping</td><td><b>39</b></td><td><b>0.787</b></td></tr>
</table>
<ol>
<li><code>max_iter=300</code> is only an upper limit. The model stopped at 39: the validation error did not improve after that.</li>
<li>Without early stopping all 300 trees were grown and the model memorised train: test AUC 0.711.</li>
<li>The recipe in practice: a small <code>learning_rate</code> (0.03–0.1), a large tree limit, and leave the count to early stopping.</li>
</ol>
<div class="tip">The validation part for early stopping is <b>not test</b>. If you stop by looking at test, you fit the number of trees to test — that is leakage. Three parts: train (learning), validation (stopping), test (the final score).</div>
<h3>Categorical features: no one-hot needed</h3>
<p>Modern boosting accepts categories directly: a tree can split straight away on "city ∈ {Almaty, Astana}". It is faster than one-hot, and with many categories (hundreds of cities) the quality is higher too.</p>
<pre><code>for c in ['city', 'plan']:
    X[c] = X[c].astype('category')      # the pandas category type
model = HistGradientBoostingClassifier(
    categorical_features='from_dtype',  # finds the category columns itself
    max_iter=300, early_stopping=True, random_state=0)</code></pre>
<p>This model needs no imputer, no scaler and no encoder: it handles NaN and categories itself. On churn the test AUC is 0.794.</p>
<h3>The same code in CatBoost and LightGBM (for reading)</h3>
<pre><code>from catboost import CatBoostClassifier
model = CatBoostClassifier(iterations=1000, learning_rate=0.05, depth=4,
                           eval_metric='AUC', early_stopping_rounds=50,
                           random_seed=0, verbose=100)
model.fit(X_train, y_train,
          cat_features=['city', 'plan'],     # pass the text columns directly
          eval_set=(X_val, y_val))           # early stopping looks here
print(model.get_best_iteration())</code></pre>
<pre><code>import lightgbm as lgb
model = lgb.LGBMClassifier(n_estimators=1000, learning_rate=0.05,
                           num_leaves=15, random_state=0)
model.fit(X_train, y_train,
          eval_set=[(X_val, y_val)], eval_metric='auc',
          callbacks=[lgb.early_stopping(50)])
print(model.best_iteration_)</code></pre>
<p>The structure is the same: a large tree limit, a small learning_rate, a separate <code>eval_set</code>, early stopping. CatBoost's strength is categories (hence the name: <i>Cat</i>egorical <i>Boost</i>ing) and good defaults. LightGBM's is speed on large data. XGBoost is the oldest and most widespread.</p>
<h3>Common mistakes</h3>
<ul>
<li>Passing test as the <code>eval_set</code> for early stopping.</li>
<li>Leaving the default <code>n_estimators=100</code> and changing only learning_rate.</li>
<li>Turning a category into the numbers 0, 1, 2 with <code>LabelEncoder</code> and passing it as a numeric feature: the model sees a false order "Almaty &lt; Astana &lt; Shymkent". Use the category type or <code>cat_features</code>.</li>
<li>Putting a StandardScaler in front of boosting: scale does not affect trees.</li>
<li>Expecting boosting to win for sure on small data (a few hundred rows). On churn, LogisticRegression (0.81) is still ahead. The advantage of boosting shows on thousands of rows and complex relationships.</li>
</ul>`,
      ex: [
        { prompt: "Train two <code>HistGradientBoostingClassifier</code> models on the numeric columns (<code>X_train[num]</code>), both with <code>max_iter=300, learning_rate=0.1, max_depth=3, random_state=0</code>. <code>full</code>: <code>early_stopping=False</code>. <code>es</code>: <code>early_stopping=True, validation_fraction=0.2, n_iter_no_change=10</code>. Store the actual numbers of trees (<code>n_iter_</code>) in <code>n_full</code>, <code>n_es</code> and the test ROC AUCs in <code>auc_full</code>, <code>auc_es</code>.", check: { tests: "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_e = _H(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train[num], y_train)\n_a = _ras(y_test, _e.predict_proba(X_test[num])[:, 1])\nassert n_full == 300, f\"Without early stopping the model should grow all 300 trees, you have {n_full}: early_stopping=False\"\nassert n_es == _e.n_iter_, f\"n_es should be {_e.n_iter_}: early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0\"\nassert abs(auc_es - _a) < 1e-6, f\"auc_es should be ≈ {_a:.3f} (on test, predict_proba)\"\nassert 0.5 < auc_full < auc_es, \"On this data the early-stopped model should be better on test\"" }, hints: ["<code>HistGradientBoostingClassifier(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code>", "The number of trees: <code>es.n_iter_</code>. AUC: <code>roc_auc_score(y_test, es.predict_proba(X_test[num])[:, 1])</code>"] },
        { prompt: "Pass the categories without one-hot. (1) Convert <code>city</code> and <code>plan</code> in <code>X</code> to the <code>category</code> type. (2) <code>train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)</code>. (3) <code>model</code> = <code>HistGradientBoostingClassifier(categorical_features='from_dtype', max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code>, trained on all the columns. Test ROC AUC → <code>auc_cat</code>.", check: { tests: "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\nassert str(X_train['city'].dtype) == 'category' and str(X_train['plan'].dtype) == 'category', \"city and plan should have the category type: X[c] = X[c].astype('category')\"\nassert len(X_train) == 450 and len(X_test) == 150 and X_train.shape[1] == 8, \"The split: test_size=0.25, all 8 columns\"\nassert hasattr(model, 'is_categorical_') and model.is_categorical_ is not None and int(model.is_categorical_.sum()) == 2, \"The model should see two categorical columns: categorical_features='from_dtype'\"\n_m = _H(categorical_features='from_dtype', max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train, y_train)\n_a = _ras(y_test, _m.predict_proba(X_test)[:, 1])\nassert abs(auc_cat - _a) < 1e-6, f\"auc_cat should be ≈ {_a:.3f}: check the parameters and random_state=0\"" }, hints: ["<code>for c in cat: X[c] = X[c].astype('category')</code> — before the split", "<code>roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])</code>"] },
        { prompt: "A colleague trained CatBoost like this: <code>model.fit(X_train, y_train, eval_set=(X_test, y_test))</code>, <code>early_stopping_rounds=50</code>. Then they reported AUC = 0.86 on that same <code>X_test</code>. What is the problem?", options: ["No problem, this is the standard approach", "The number of trees was chosen by looking at test, so 0.86 is too optimistic: eval_set needs a separate validation set taken from train", "early_stopping_rounds is too large", "You cannot pass an eval_set to CatBoost"], explain: "Early stopping is choosing a hyperparameter (the number of trees). If you do it on test, test becomes \"seen\". Train → validation (stopping) → test (scored once)." },
        { prompt: "LightGBM code: <code>LGBMClassifier(n_estimators=2000, learning_rate=0.03)</code> + <code>callbacks=[lgb.early_stopping(100)]</code>. After training, <code>model.best_iteration_</code> = 412. What does that mean?", options: ["The model uses all 2000 trees", "The validation metric was best at tree 412; it then failed to improve for 100 steps, so training stopped", "The model trained for 412 seconds", "412 features were found to be important"], explain: "n_estimators is an upper limit. Early stopping remembers the best iteration: those 412 trees are the ones used for prediction." }
      ]
    },
    "mp-pca": {
      title: "PCA and dimensionality reduction",
      body: `
<p>A flat's number of rooms and its area say the same thing: how big the flat is. Two columns, but almost one piece of information (their correlation is 0.92). With 500 features instead of 5 there is a lot of this repetition: the model slows down, overfitting grows, and you cannot plot the data.</p>
<p><b>PCA</b> (Principal Component Analysis) rotates the features onto <b>new axes</b>. The first axis (PC1) is the direction in which the data is most spread out. The second (PC2) is perpendicular to it and takes the most of the remaining spread. The last axes carry little information and can be dropped.</p>
<h3>Step-by-step example: the 5 numeric features of flats</h3>
<pre><code>from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

num = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']
Xs = StandardScaler().fit_transform(flats[num])
pca = PCA(n_components=2)
X2 = pca.fit_transform(Xs)                 # (400, 2)
print(pca.explained_variance_ratio_)       # [0.387 0.306]</code></pre>
<ol>
<li><b>Scale first.</b> PCA looks at variance. Without scaling, the column with the largest numbers wins: on the raw data PC1 is effectively just <code>area_m2</code> (weight 0.97).</li>
<li><code>explained_variance_ratio_</code>: PC1 keeps 38.7% of the total spread and PC2 keeps 30.6%. Together, 69%.</li>
<li><code>pca.components_</code> shows the "recipe" of each axis. PC1 ≈ 0.69 · rooms + 0.69 · area_m2 — "the size of the flat". PC2 ≈ 0.69 · floor + 0.70 · floors_total — "the height of the building".</li>
</ol>
<table>
<tr><th>Number of components</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>Cumulative variance</td><td>0.387</td><td>0.693</td><td>0.891</td><td>0.983</td><td>1.000</td></tr>
</table>
<p>A common rule: take the number of components that keeps 90–95% of the variance. Here 90% needs 4 components (3 give 89.1%). The shortcut: <code>PCA(n_components=0.9)</code>.</p>
<h3>What PCA is used for</h3>
<ul>
<li><b>Visualization</b>: bring 20 features down to 2 axes and draw a scatter plot; see clusters (KMeans) with your own eyes.</li>
<li><b>Compression and noise reduction</b>: hundreds of correlated features (sensors, surveys, image pixels).</li>
<li><b>A step before the model</b>: inside a Pipeline, <code>StandardScaler → PCA → model</code>.</li>
</ul>
<p>Compression has a price. The 5-fold R² of LinearRegression on flats: 0.663 with all 5 features, 0.644 with 3 components, 0.535 with 2 components. PCA does not look at the target: it keeps spread, and a feature with little spread (<code>year_built</code>) may still matter for the price.</p>
<div class="tip">PCA is a step that learns from the data. <code>fit</code> it on train only, too, and keep it inside a Pipeline, otherwise you get leakage.</div>
<h3>Common mistakes</h3>
<ul>
<li>Running PCA without a StandardScaler.</li>
<li>Fitting PCA on all the data and splitting afterwards.</li>
<li>Reading components as if they were "features": PC1 is a mix of several columns and is hard to explain to the business. Where interpretation matters (scoring), PCA is not used.</li>
<li>Applying PCA to categorical one-hot columns: it makes little sense.</li>
<li>Treating PCA as mandatory on data with 5–10 features. It pays off with hundreds of features.</li>
</ul>`,
      ex: [
        { prompt: "Scale the 5 numeric features of flats with a <code>StandardScaler</code> (<code>Xs</code>) and fit <code>PCA(n_components=2)</code> under the name <code>pca</code>. Store the transformed data in <code>X2</code> and each component's share of variance in <code>evr</code>.", check: { tests: "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_Xs = _SS().fit_transform(X)\n_e = _PCA(n_components=2).fit(_Xs).explained_variance_ratio_\n_raw = _PCA(n_components=2).fit(X).explained_variance_ratio_\nassert _np.asarray(X2).shape == (400, 2), \"X2 is 400 rows, 2 columns: pca.fit_transform(Xs)\"\nassert len(evr) == 2, \"evr is two numbers: pca.explained_variance_ratio_\"\nassert not _np.allclose(evr, _raw, atol=1e-3), \"Scale first: StandardScaler().fit_transform(X). Without scaling PC1 comes out as just area_m2\"\nassert _np.allclose(evr, _e, atol=1e-6), f\"evr should be ≈ {_e.round(3)}\"\nassert abs(abs(_np.corrcoef(_np.asarray(X2)[:, 0], _Xs[:, 1])[0, 1]) - 1) < 0.1, \"The first column of X2 should be closely related to area_m2\"" }, hints: ["<code>Xs = StandardScaler().fit_transform(X)</code>", "<code>X2 = pca.fit_transform(Xs)</code>, <code>evr = pca.explained_variance_ratio_</code>"] },
        { prompt: "Fit <code>PCA()</code> with all components and store the cumulative share of variance in the array <code>cum</code> (<code>np.cumsum</code>). <code>n90</code> — the smallest number of components that keeps at least 90% of the variance.", check: { tests: "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_Xs = _SS().fit_transform(X)\n_c = _np.cumsum(_PCA().fit(_Xs).explained_variance_ratio_)\nassert len(cum) == 5, \"cum is 5 numbers: the cumulative share over all components\"\nassert _np.allclose(_np.asarray(cum, dtype=float), _c, atol=1e-6), f\"cum should be ≈ {_c.round(3)}: np.cumsum(pca.explained_variance_ratio_)\"\nassert n90 == int(_np.argmax(_c >= 0.9)) + 1, \"n90: the first position where cum >= 0.9 (counting from 1). 3 components give 0.891 — not enough\"" }, hints: ["<code>cum = np.cumsum(PCA().fit(Xs).explained_variance_ratio_)</code>", "<code>np.argmax(cum &gt;= 0.9)</code> gives the index of the first True (from 0); add 1 to it"] },
        { prompt: "PCA found three components with variances 6, 3 and 1. What share of the total variance do the first two components keep?", explain: "(6 + 3) / (6 + 3 + 1) = 9 / 10 = 0.9. Dropping the third component loses only 10% of the information." },
        { prompt: "The data has <code>income</code> (in tenge, 100,000 – 2,000,000) and <code>age</code> (18–70). What happens if you run PCA without scaling?", options: ["Nothing, PCA does not depend on scale", "PC1 will be almost entirely income: numerically its variance is millions of times larger", "PCA raises an error", "age comes out as more important"], explain: "PCA looks for the direction of largest variance. A column with large units swamps everything else. So StandardScaler comes first." }
      ]
    },
    "mp-text": {
      title: "Text features: TF-IDF + logistic regression",
      body: `
<p>A marketplace receives thousands of reviews a day. Which are complaints and which are thanks? A person cannot read them all. A model does not understand text — it needs <b>numbers</b>. The simplest, and still strong, way to turn text into numbers is <b>TF-IDF</b>.</p>
<p>The data: <code>reviews.csv</code> — 300 short reviews in Kazakh and Russian (mixed, as in real data from Kazakhstan). Columns: <code>text</code>, <code>label</code> (positive / negative), <code>lang</code>.</p>
<h3>Bag of words</h3>
<p>Every unique word is a column. Every review is a row. A cell holds how many times the word occurs in that review. The order of the words is lost (hence "bag").</p>
<h3>TF-IDF: a rare word is worth more</h3>
<p>Words like «және» (Kazakh for "and"), «и» (Russian for "and") or «өте» ("very") occur everywhere and are of little use. TF-IDF gives each word a weight:</p>
<ul>
<li><b>TF</b> (term frequency): how many times the word occurs in this review.</li>
<li><b>IDF</b> (inverse document frequency): the fewer reviews a word occurs in, the higher it is. In sklearn: <code>idf = ln((1 + n) / (1 + df)) + 1</code>, where n is the number of reviews and df is the number of reviews containing the word.</li>
</ul>
<ol>
<li>Train has 225 reviews. Say the word «және» occurs in 100 of them: idf = ln(226 / 101) + 1 ≈ 1.81.</li>
<li>And if the word «дөрекі» ("rude") occurs in only 3 reviews: idf = ln(226 / 4) + 1 ≈ 5.03. Its weight is about 3 times higher.</li>
<li>Finally each row is normalised to length 1: long and short reviews are put on equal terms.</li>
</ol>
<h3>Step-by-step example</h3>
<pre><code>from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

df = pd.read_csv('reviews.csv')
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])

vec = TfidfVectorizer()
V_train = vec.fit_transform(X_train)   # learns the vocabulary from train
V_test = vec.transform(X_test)         # transform only!
print(V_train.shape)                   # (225, 113): 113 unique words

model = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
                  ('clf', LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)
print(model.score(X_test, y_test))     # 0.947</code></pre>
<ol>
<li><code>TfidfVectorizer</code> lowercases the text, splits it into words and builds a matrix. The result is a <b>sparse</b> matrix: most cells are 0, and only the non-zero ones are kept in memory.</li>
<li>There are many features (hundreds; tens of thousands in a real project), each of them weak. On data like this <b>LogisticRegression</b> is the classic choice: fast, regularized (the C parameter), with coefficients you can read.</li>
<li><code>ngram_range=(1, 2)</code> makes features out of <b>word pairs</b> (bigrams) as well as single words: «не понравилось» ("did not like it"), «сай емес» ("does not match"), «өте нашар» ("very bad"). A single-word model reads «понравилось» ("liked it") as good, while «не» ("not") stands apart. Here accuracy goes 0.933 → 0.947.</li>
<li>The coefficients: the most negative n-gram is «не» ("not"), the most positive is «всем» (from «всем рекомендую», "I recommend it to everyone"). The word «рекомендую» ("recommend") itself appears in both classes («никому не рекомендую», "I don't recommend it to anyone"), so the model relies on the neighbouring words.</li>
</ol>
<p>Where does the model go wrong? On mixed reviews: «Курьер дөрекі екен бірақ тез жеткізді» ("The courier was rude but delivered quickly"). A bag of words does not know that the part after «бірақ» ("but") matters more. Handling such cases takes models that account for word order (transformers), but TF-IDF + LogisticRegression is always checked first as the baseline.</p>
<div class="tip">Kazakh is an agglutinative language: «ұнады», «ұнамады», «ұнайды» ("liked", "did not like", "likes") share one root but are three different word columns. A technique that helps: character n-grams, <code>TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4))</code>. It makes features out of parts of words («ұна», «мады»).</div>
<h3>Common mistakes</h3>
<ul>
<li>Calling <code>fit</code> on the vectorizer with all the data: the vocabulary and the IDF learn from test too — leakage. A Pipeline protects you from this.</li>
<li>Calling <code>fit_transform</code> on test: the number and order of columns change and the model cannot make sense of them.</li>
<li>Turning the sparse matrix into a full array with <code>.toarray()</code>: on large data you run out of memory.</li>
<li>Looking only at accuracy: if complaints are rare (5%), check precision and recall.</li>
<li>Not reading the misclassified examples. With text, looking at the errors yourself is the most useful diagnostic.</li>
</ul>`,
      ex: [
        { prompt: "The split is ready. Create a <code>TfidfVectorizer()</code> named <code>vec</code> and get the matrix <code>V_train</code> from the train texts. Transform the test texts into <code>V_test</code> <b>with the same vocabulary</b>. Store the number of words in the vocabulary in <code>n_words</code>.", check: { tests: "from sklearn.feature_extraction.text import TfidfVectorizer as _TV\n_v = _TV().fit(X_train)\n_n = len(_v.vocabulary_)\nassert V_train.shape == (225, _n), f\"The shape of V_train should be (225, {_n}): vec.fit_transform(X_train)\"\nassert V_test.shape == (75, _n), f\"The shape of V_test should be (75, {_n}). For test call vec.transform(X_test), not fit_transform\"\nassert n_words == _n, f\"n_words = {_n}: len(vec.vocabulary_)\"\nassert abs(V_test.sum() - _v.transform(X_test).sum()) < 1e-6, \"V_test should be computed with the train vocabulary: vec.transform(X_test)\"" }, hints: ["<code>V_train = vec.fit_transform(X_train)</code>", "<code>V_test = vec.transform(X_test)</code>, <code>n_words = len(vec.vocabulary_)</code>"] },
        { prompt: "Build a Pipeline named <code>model</code> with the steps <code>'tfidf'</code> — <code>TfidfVectorizer(ngram_range=(1, 2))</code> and <code>'clf'</code> — <code>LogisticRegression(max_iter=1000)</code>. Train it on train and store the test accuracy in <code>acc</code>. Store the n-gram with the most negative coefficient in <code>top_neg</code> and the one with the most positive in <code>top_pos</code> (<code>get_feature_names_out()</code> and <code>coef_[0]</code>).", check: { tests: "import numpy as _np\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_m = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(X_train, y_train)\n_nm = _m['tfidf'].get_feature_names_out(); _cf = _m['clf'].coef_[0]\nassert isinstance(model, _P) and hasattr(model[-1], 'coef_'), \"model is a trained Pipeline (tfidf + clf)\"\nassert len(model[0].vocabulary_) == len(_nm), f\"The vocabulary should have {len(_nm)} n-grams: TfidfVectorizer(ngram_range=(1, 2))\"\nassert abs(acc - _m.score(X_test, y_test)) < 1e-6, f\"acc should be ≈ {_m.score(X_test, y_test):.3f}: model.score(X_test, y_test)\"\nassert str(top_neg) == str(_nm[_np.argmin(_cf)]), \"top_neg is the n-gram with the smallest coef_[0]: names[np.argmin(coef)]\"\nassert str(top_pos) == str(_nm[_np.argmax(_cf)]), \"top_pos is the n-gram with the largest coef_[0]: names[np.argmax(coef)]\"" }, hints: ["<code>names = model['tfidf'].get_feature_names_out()</code>, <code>coef = model['clf'].coef_[0]</code>", "<code>top_neg = names[np.argmin(coef)]</code>. A positive coefficient means the <code>positive</code> class, because <code>classes_</code> is in alphabetical order: negative, positive"] },
        { prompt: "Why does a single-word (unigram) model often misclassify the review «Товар не понравился» (\"I did not like the product\"), while <code>ngram_range=(1, 2)</code> helps?", options: ["Bigrams make the model faster", "In a unigram model «не» (\"not\") and «понравился» (\"liked\") are separate features, while a bigram makes the phrase «не понравился» a single feature and captures the negation", "Unigrams do not support Russian", "Bigrams shrink the vocabulary"], explain: "A bag of words loses the order. A bigram keeps two neighbouring words together and turns the \"not + word\" negation into a feature. The price: the vocabulary grows several times over (here 113 → 429)." },
        { prompt: "A colleague ran <code>TfidfVectorizer().fit_transform(df['text'])</code> on all the data and then split it into train/test. What is wrong?", options: ["Nothing, there is no leakage with text", "The vocabulary and the IDF weights learned from the test texts too: that is leakage. The vectorizer must be fitted on train only, inside a Pipeline", "TF-IDF cannot be used after a split", "predict should have been used instead of fit_transform"], explain: "Any step that learns from the data (scaler, imputer, PCA, vectorizer) is fitted on train only." }
      ]
    },
    "mp-ops": {
      title: "Model monitoring: MLflow, PSI drift and out-of-time validation",
      body: `
<p>The day a model goes to production its work is not over — it begins. The world changes: salaries rise, new customers arrive, the economy swings. A model that worked well yesterday quietly gets worse today. Almost half of the DS vacancies in Kazakhstan carry the requirement "model validation and monitoring: PSI, Gini, out-of-time", especially in banks. That is what this lesson is about.</p>
<p>The data: <code>loans.csv</code> — 1,260 loan applications over 18 months (2024-01 … 2025-06). Columns: <code>month</code>, <code>age</code>, <code>income</code> (thousand ₸), <code>debt_ratio</code> (debt burden), <code>delays_12m</code> (number of late payments), <code>employment_years</code>, <code>default</code> (1 — the loan was not repaid).</p>
<h3>1. Tracking experiments: MLflow</h3>
<p>A single project trains hundreds of model variants. Three weeks later nobody can answer "which parameters gave Gini 0.52?". <b>MLflow</b> logs every run:</p>
<pre><code>import mlflow
with mlflow.start_run(run_name='logreg_C1'):
    mlflow.log_param('C', 1.0)                  # parameters
    mlflow.log_param('train_period', '2024-01..2024-09')
    model.fit(X_train, y_train)
    mlflow.log_metric('gini_val', 0.47)         # metrics
    mlflow.log_metric('gini_oot', 0.41)
    mlflow.sklearn.log_model(model, 'model')    # the model itself (an artifact)</code></pre>
<p>The result is a table: each row is one experiment, and the columns are parameters and metrics. You pick the best one and register it in the <b>Model Registry</b> (with a version number). MLflow is not available in the browser, but the idea is simple: <b>parameters + data period + metrics + model file</b> are stored together. You can even do it with a plain list of dictionaries.</p>
<h3>2. Out-of-time (OOT) validation</h3>
<p>A random test set gives the model "other customers from the same period". In production, though, the model works with <b>future</b> customers. OOT is a later period the model has never seen at all:</p>
<table>
<tr><th>Part</th><th>Period</th><th>Gini</th><th>Mean prediction (PD)</th><th>Actual default</th></tr>
<tr><td>Train (70%)</td><td>2024-01 … 2024-09</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>Validation (30%, random)</td><td>2024-01 … 2024-09</td><td>0.47</td><td>10.6%</td><td>11.6%</td></tr>
<tr><td><b>OOT</b></td><td>2025-01 … 2025-06</td><td><b>0.41</b></td><td><b>13.2%</b></td><td><b>23.3%</b></td></tr>
</table>
<ol>
<li>Gini fell from 0.47 to 0.41: the model got slightly worse at telling customers apart.</li>
<li>More important: the model expected 13.2% defaults and the actual figure is 23.3%. The order is nearly right, but the <b>level</b> is wrong. If the bank computes its reserves from this prediction, it understates losses almost by half.</li>
<li>The fix: <b>recalibration</b> (re-adjusting the probabilities to the new data) or retraining the model on the new period.</li>
</ol>
<h3>3. PSI: has the data changed?</h3>
<p>Whether a loan defaults becomes known only months after it is granted. A change in the <b>input data</b>, however, is visible at once. <b>PSI</b> (Population Stability Index) compares the distribution of one feature in two periods.</p>
<ol>
<li>Split the values of the old period into bins, usually 10 quantiles.</li>
<li>For each bin: <code>e</code> is the share in the old period, <code>a</code> is the share in the new period.</li>
<li><code>PSI = Σ (a − e) · ln(a / e)</code>.</li>
</ol>
<p>An example by hand, 4 bins. Before, each bin held 25%. Now: 10%, 20%, 30%, 40%.</p>
<table>
<tr><th>Bin</th><th>e</th><th>a</th><th>(a − e) · ln(a / e)</th></tr>
<tr><td>1</td><td>0.25</td><td>0.10</td><td>(−0.15) · ln(0.4) = 0.137</td></tr>
<tr><td>2</td><td>0.25</td><td>0.20</td><td>(−0.05) · ln(0.8) = 0.011</td></tr>
<tr><td>3</td><td>0.25</td><td>0.30</td><td>0.05 · ln(1.2) = 0.009</td></tr>
<tr><td>4</td><td>0.25</td><td>0.40</td><td>0.15 · ln(1.6) = 0.071</td></tr>
<tr><td colspan="3"><b>PSI</b></td><td><b>0.228</b></td></tr>
</table>
<table>
<tr><th>PSI</th><th>Interpretation</th><th>Action</th></tr>
<tr><td>&lt; 0.1</td><td>stable</td><td>nothing</td></tr>
<tr><td>0.1 – 0.25</td><td>moderate shift</td><td>watch it, look for the cause</td></tr>
<tr><td>&gt; 0.25</td><td>strong shift</td><td>review the model, recalibrate or retrain</td></tr>
</table>
<p>In loans, between 2024 and 2025: the PSI of <code>income</code> is <b>0.35</b> (nominal salaries rose), <code>debt_ratio</code> 0.15, <code>age</code> 0.12, and the rest are below 0.05. The model reads "income of 450 thousand" in its 2024 sense, while in 2025 the same amount means a different standard of living. That is one reason for the error on OOT.</p>
<div class="tip">PSI is computed not only for features but also for the model's <b>score</b>: if the distribution of predictions shifts, that is the first alarm. A monitoring dashboard usually shows three things: feature PSI, score PSI and (once the actual outcomes arrive) Gini.</div>
<h3>Common mistakes</h3>
<ul>
<li>Scoring the model only on a random test set and skipping OOT.</li>
<li>Taking the PSI bin edges from the new data. The edges always come from the <b>old</b> (reference) period.</li>
<li><code>ln(0)</code> in an empty bin: clip the shares from below with a small number (for example 0.0001).</li>
<li>Deciding at once that a high PSI means a bad model. PSI is a reason to investigate; quality is shown by Gini and calibration.</li>
<li>Thinking all is well because Gini is stable: Gini measures order, and the PD level (calibration) can break separately.</li>
<li>Not logging experiment results: the question "which data, which parameters" will certainly come up.</li>
</ul>`,
      ex: [
        { prompt: "Write the function <code>psi_from_shares(e, a)</code>: it takes two arrays of shares and returns <code>Σ (a − e) · ln(a / e)</code>. To avoid dividing by zero, first clip both with <code>np.clip(..., 0.0001, None)</code>. Store the result for the example from the lesson in <code>psi_example</code>.", check: { tests: "import numpy as _np\nassert psi_example is not None and abs(psi_example - 0.228217) < 1e-4, \"psi_example should be ≈ 0.228: np.sum((a - e) * np.log(a / e))\"\nassert abs(psi_from_shares([0.5, 0.5], [0.5, 0.5])) < 1e-12, \"With identical shares PSI = 0\"\nassert abs(psi_from_shares([0.5, 0.5], [0.3, 0.7]) - 0.169460) < 1e-4, \"psi_from_shares([0.5, 0.5], [0.3, 0.7]) should be ≈ 0.169\"\n_z = psi_from_shares([0.5, 0.5, 0.0], [0.4, 0.5, 0.1])\nassert _np.isfinite(_z) and _z > 0, \"An empty bin must not raise an error: clip the shares with np.clip(x, 0.0001, None)\"" }, hints: ["<code>e = np.clip(np.asarray(e, dtype=float), 0.0001, None)</code>, and the same for <code>a</code>", "<code>return float(np.sum((a - e) * np.log(a / e)))</code>"] },
        { prompt: "The starter has <code>psi(expected, actual)</code> ready: it builds 10 quantile bins from the old period and returns the PSI. <code>old</code> — the 2024 applications, <code>new</code> — the 2025 ones (<code>month</code> is a string column; compare it with <code>'2025-01'</code>). For each feature in the list <code>F</code>, store its PSI in the dictionary <code>psi_table</code>. Collect the features with PSI &gt; 0.25 in the list <code>drifted</code>.", starter: "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n\ndef psi(expected, actual, bins=10):\n    expected = np.asarray(expected, dtype=float)\n    actual = np.asarray(actual, dtype=float)\n    edges = np.quantile(expected, np.linspace(0, 1, bins + 1))   # the edges come from the old period\n    edges[0], edges[-1] = -np.inf, np.inf\n    e = np.clip(np.histogram(expected, edges)[0] / len(expected), 0.0001, None)\n    a = np.clip(np.histogram(actual, edges)[0] / len(actual), 0.0001, None)\n    return float(np.sum((a - e) * np.log(a / e)))\n\npsi_table = {}\n", check: { tests: "import pandas as _pd, numpy as _np\n_d = _pd.read_csv('loans.csv')\n_o = _d[_d['month'] < '2025-01']; _n = _d[_d['month'] >= '2025-01']\ndef _psi(ex, ac, bins=10):\n    ex = _np.asarray(ex, dtype=float); ac = _np.asarray(ac, dtype=float)\n    ed = _np.quantile(ex, _np.linspace(0, 1, bins + 1)); ed[0], ed[-1] = -_np.inf, _np.inf\n    e = _np.clip(_np.histogram(ex, ed)[0] / len(ex), 0.0001, None); a = _np.clip(_np.histogram(ac, ed)[0] / len(ac), 0.0001, None)\n    return float(_np.sum((a - e) * _np.log(a / e)))\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_t = {f: _psi(_o[f], _n[f]) for f in _F}\nassert len(old) == 840 and len(new) == 420, f\"old should be 840 rows (2024) and new 420 (2025), you have {len(old)} and {len(new)}\"\nassert sorted(psi_table) == sorted(_F), \"The keys of psi_table are the five features in the list F\"\nassert all(abs(psi_table[f] - _t[f]) < 1e-6 for f in _F), \"The PSI values do not match: psi(old[f], new[f]) — the first argument is the old period\"\nassert list(drifted) == [f for f in _F if _t[f] > 0.25], \"drifted is the features with PSI > 0.25 (in the order of F)\"" }, hints: ["<code>old = df[df['month'] &lt; '2025-01']</code>, <code>new = df[df['month'] &gt;= '2025-01']</code>", "<code>psi_table[f] = psi(old[f], new[f])</code>; <code>drifted = [f for f in F if psi_table[f] &gt; 0.25]</code>"] },
        { prompt: "Out-of-time validation. <code>dev</code> — the applications up to and including <code>2024-09</code>, <code>oot</code> — from <code>2025-01</code> on. Split <code>dev</code> into train/validation with <code>train_test_split(test_size=0.3, random_state=0, stratify=...)</code>. Train <code>model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))</code> on train. Compute: <code>gini_val</code>, <code>gini_oot</code> (2 · AUC − 1), <code>pd_pred</code> (the mean predicted probability on OOT), <code>pd_fact</code> (the actual default rate on OOT).", check: { tests: "import pandas as _pd\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = _pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_a, _b, _c, _e = _tts(_dev[_F], _dev['default'], test_size=0.3, random_state=0, stratify=_dev['default'])\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_a, _c)\n_gv = 2 * _ras(_e, _m.predict_proba(_b)[:, 1]) - 1\n_po = _m.predict_proba(_oot[_F])[:, 1]\n_go = 2 * _ras(_oot['default'], _po) - 1\nassert len(dev) == 630 and len(oot) == 420, f\"dev should be 630 rows and oot 420, you have {len(dev)} and {len(oot)}\"\nassert abs(gini_val - _gv) < 1e-6, f\"gini_val should be ≈ {_gv:.3f}: 2 * AUC - 1 on validation\"\nassert abs(gini_oot - _go) < 1e-6, f\"gini_oot should be ≈ {_go:.3f}: the model is trained on train only and just scored on OOT\"\nassert abs(pd_pred - _po.mean()) < 1e-6, f\"pd_pred ≈ {_po.mean():.3f}: the mean of predict_proba[:, 1] on OOT\"\nassert abs(pd_fact - _oot['default'].mean()) < 1e-9, f\"pd_fact ≈ {_oot['default'].mean():.3f}: oot['default'].mean()\"\nassert pd_fact > pd_pred, \"On this data the model understates the risk on OOT\"" }, hints: ["<code>dev = df[df['month'] &lt;= '2024-09']</code>, <code>oot = df[df['month'] &gt;= '2025-01']</code>", "The split: <code>train_test_split(dev[F], dev['default'], test_size=0.3, random_state=0, stratify=dev['default'])</code>", "<code>p_oot = model.predict_proba(oot[F])[:, 1]</code>; <code>pd_pred = p_oot.mean()</code>"] },
        { prompt: "Monthly monitoring of a scoring model: the PSI of <code>income</code> is 0.31, Gini fell from 0.52 to 0.50, and the predicted default rate is 8% against an actual 14%. What is the best action?", options: ["Do nothing: Gini has hardly changed", "PSI &gt; 0.25 and the calibration is broken: analyse the cause and recalibrate the model or retrain it on new data", "Drop the income feature immediately", "Set the threshold back to 0.5"], explain: "Gini measures only the order. The level (PD) is off by almost a factor of two — reserves and pricing are distorted. PSI shows which feature the shift comes from." },
        { prompt: "In MLflow (or any experiment log), what is the minimum that must be stored for every run?", options: ["Only the best metric", "The parameters, the data period/version, the metrics and the model file: so that the result can be reproduced at any time", "Only the code", "Only the model file"], explain: "The point of an experiment is reproducibility. A metric without its parameters and data is just a number." }
      ]
    },
    "mp-anom": {
      title: "Anomaly detection and antifraud basics",
      body: `
<p>A bank card pays 400,000 ₸ at 3 a.m., from a new phone, from abroad. Is it fraud? An antifraud system has to decide in a few milliseconds. The difficulty: fraud is very rare (under 1%), there are few labelled examples, and fraudsters keep changing their methods. So alongside ordinary classification, <b>anomaly detection</b> is used here: looking for "whatever does not look normal".</p>
<p>The data: <code>transactions.csv</code> — 1,000 transactions, 30 of them fraud (3%). Columns: <code>amount</code> (₸), <code>hour</code>, <code>tx_24h</code> (number of transactions in the last 24 hours), <code>new_device</code>, <code>foreign</code>, <code>is_fraud</code>.</p>
<h3>Layer 1: simple rules</h3>
<p><b>The IQR rule</b> (familiar from M3.1): a value above <code>Q3 + 1.5 · IQR</code> is an outlier.</p>
<ol>
<li><code>amount</code>: Q1 = 4,800, Q3 = 14,725. IQR = 9,925.</li>
<li>Upper bound = 14,725 + 1.5 · 9,925 = 29,612.5 ₸.</li>
<li>76 transactions exceed the bound. 24 of them really are fraud.</li>
<li>Recall = 24 / 30 = 0.80, precision = 24 / 76 = 0.32. Two alarms out of three are false.</li>
</ol>
<p>The <b>z-score</b> rule is similar: <code>|x − mean| / std &gt; 3</code>. For a skewed distribution such as amounts it is better to take the logarithm first. Business rules belong to this layer too: "new device <b>and</b> abroad", "8+ transactions a day".</p>
<p>The advantages of rules: they are clear, fast and easy to explain to a regulator. The drawback: they look at one feature at a time. A transaction with an average amount but made <i>at night + from a new device + frequently</i> slips through.</p>
<h3>Layer 2: IsolationForest</h3>
<p>The idea: an anomaly is <b>easy to isolate</b> from the rest. We pick a random feature and a random threshold and keep splitting the data. A normal point sits inside a dense group and takes many steps to separate. An unusual point sits at the edge — after two or three splits it is alone. The smaller the average "depth" across a hundred random trees, the more suspicious the point.</p>
<pre><code>from sklearn.ensemble import IsolationForest
F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']
iso = IsolationForest(n_estimators=100, contamination=0.03, random_state=0)
iso.fit(df[F])                       # does NOT see is_fraud: unsupervised
score = -iso.score_samples(df[F])    # higher = more suspicious
top = df.assign(score=score).sort_values('score', ascending=False).head(30)
print(top['is_fraud'].mean())        # 0.83</code></pre>
<ol>
<li>The model is not given <code>is_fraud</code>. It only looks for "who is unusual". The label is needed only for evaluation.</li>
<li><code>contamination=0.03</code> is a guess at the share of anomalies; it affects only the threshold of <code>predict</code>.</li>
<li><code>score_samples</code> has the opposite sign: lower = anomaly. We flip it with a minus for convenience.</li>
</ol>
<h3>Precision@k: the analyst's time is limited</h3>
<p>An antifraud team can check by hand only, say, 30 transactions a day. So the question is: "of the <b>k</b> most suspicious transactions, how many really are fraud?"</p>
<table>
<tr><th>Approach</th><th>Number of alarms</th><th>Fraud</th><th>Precision</th></tr>
<tr><td>IQR rule (amount)</td><td>76</td><td>24</td><td>0.32</td></tr>
<tr><td>IsolationForest, top 10</td><td>10</td><td>10</td><td>1.00</td></tr>
<tr><td>IsolationForest, top 30</td><td>30</td><td>25</td><td><b>0.83</b></td></tr>
</table>
<h3>A real system: layers</h3>
<ul>
<li><b>Rules</b>: strict, clear-cut cases (limits, blacklists). They block at once.</li>
<li><b>A supervised model</b> (boosting): when there is a labelled history of fraud. It catches known schemes well. Metrics: PR-AUC, recall at a given precision.</li>
<li><b>An anomaly detector</b>: for new schemes never seen before.</li>
<li><b>An analyst</b>: checks the suspicious cases by hand and labels them. Those labels become data for the next model.</li>
</ul>
<div class="tip">Anomaly ≠ fraud. IsolationForest finds an "unusual" transaction: it may just as well be a wealthy customer's large but legitimate purchase. So the outcome is "send for review", not "block".</div>
<h3>Common mistakes</h3>
<ul>
<li>Measuring quality with accuracy: an "everything is clean" model scores 97%.</li>
<li>Letting <code>is_fraud</code> slip into IsolationForest as a feature.</li>
<li>Not setting <code>random_state</code>: the trees are random and the result changes every time.</li>
<li>Forgetting the cost of a false alarm: every card blocked for nothing is an angry customer.</li>
<li>Building the model once and forgetting it. Fraudsters adapt; monitoring and retraining are a must.</li>
</ul>`,
      ex: [
        { prompt: "Build the IQR rule on <code>amount</code>. <code>upper</code> = Q3 + 1.5 · IQR. <code>flag</code> — the transactions with an amount above <code>upper</code> (a bool Series). Compute <code>n_flag</code> — the number of alarms, <code>n_caught</code> — the number of frauds among them, plus <code>precision_rule</code> and <code>recall_rule</code>.", check: { tests: "import pandas as _pd\n_d = _pd.read_csv('transactions.csv')\n_q1, _q3 = _d['amount'].quantile(0.25), _d['amount'].quantile(0.75)\n_u = _q3 + 1.5 * (_q3 - _q1)\n_f = _d['amount'] > _u\n_c = int((_f & (_d['is_fraud'] == 1)).sum())\nassert abs(upper - _u) < 1e-6, f\"upper should be {_u}: q3 + 1.5 * (q3 - q1)\"\nassert len(flag) == 1000 and int(flag.sum()) == int(_f.sum()), \"flag = df['amount'] > upper (a bool Series of 1000 values)\"\nassert n_flag == int(_f.sum()), f\"n_flag should be {int(_f.sum())}\"\nassert n_caught == _c, f\"n_caught should be {_c}: flag and is_fraud == 1\"\nassert abs(precision_rule - _c / _f.sum()) < 1e-9, \"precision_rule = n_caught / n_flag\"\nassert abs(recall_rule - _c / _d['is_fraud'].sum()) < 1e-9, \"recall_rule = n_caught / the total number of frauds (30)\"" }, hints: ["<code>q1 = df['amount'].quantile(0.25)</code>, <code>q3 = df['amount'].quantile(0.75)</code>", "<code>n_caught = int((flag &amp; (df['is_fraud'] == 1)).sum())</code>"] },
        { prompt: "Fit <code>IsolationForest(n_estimators=100, contamination=0.03, random_state=0)</code> on <code>df[F]</code> under the name <code>iso</code>. <code>score = -iso.score_samples(df[F])</code>. Store the share of fraud among the 30 transactions with the highest score in <code>p_at_30</code> (precision@30). Store how many frauds are among those 30 in <code>n_found</code>.", check: { tests: "import pandas as _pd, numpy as _np\nfrom sklearn.ensemble import IsolationForest as _IF\n_d = _pd.read_csv('transactions.csv')\n_F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n_s = -_IF(n_estimators=100, contamination=0.03, random_state=0).fit(_d[_F]).score_samples(_d[_F])\n_n = int(_d['is_fraud'].values[_np.argsort(-_s, kind='stable')[:30]].sum())\nassert len(score) == 1000, \"score is one number per transaction\"\nassert _np.allclose(_np.asarray(score, dtype=float), _s, atol=1e-9), \"score = -iso.score_samples(df[F]); parameters: n_estimators=100, contamination=0.03, random_state=0. is_fraud must not be a feature\"\nassert abs(n_found - _n) <= 1, f\"n_found should be {_n}: the number of frauds among the 30 transactions with the highest score\"\nassert abs(p_at_30 - n_found / 30) < 1e-9, \"p_at_30 = n_found / 30\"" }, hints: ["<code>iso.fit(df[F])</code>, then <code>score = -iso.score_samples(df[F])</code>", "<code>top = df.assign(score=score).sort_values('score', ascending=False).head(30)</code>"] },
        { prompt: "An antifraud model sent the 50 most suspicious transactions to an analyst. 20 of them turned out to be real fraud. There were 40 frauds in the whole day. What is Precision@50?", explain: "Precision@50 = 20 / 50 = 0.40. Recall@50 = 20 / 40 = 0.50 — that is a separate metric." },
        { prompt: "A bank has little labelled fraud history, and fraudsters keep inventing new schemes. Which architecture fits best?", options: ["A single supervised model tuned for accuracy", "Layers: strict business rules + a supervised model for known schemes + an anomaly detector for new schemes; suspicious cases go to an analyst for review", "The IQR rule alone", "Automatically block every large amount"], explain: "Each layer covers another's weak spot. The analyst's decisions become new labelled data and update the model." }
      ]
    },
    "mp-rec": {
      title: "Recommender system basics",
      body: `
<p>"You may also like" on a marketplace, "People who watched this also watched" in an online cinema — these are <b>recommender systems</b>. The goal: out of thousands of items, show each user the few that suit them best.</p>
<p>The data: <code>purchases.csv</code> — 415 purchases by 117 customers across 15 items. Columns: <code>user_id</code>, <code>item</code>. There are no ratings, only the fact "bought" — this is called <b>implicit feedback</b>, and in real life data usually looks like this. The item names in the file are in Kazakh.</p>
<h3>Baseline: popularity</h3>
<p>Recommend the best-selling items to everyone. It ignores personal taste, but for a new customer (we know nothing about them — the <b>cold start</b>) it is the only way. Here the top 3 are: бөтелке (bottle, 40), зарядтағыш (charger, 39), смартфон (smartphone, 38).</p>
<h3>The user-item matrix</h3>
<pre><code>M = pd.crosstab(df['user_id'], df['item'])   # 117 × 15, each cell is 0 or 1</code></pre>
<p>Each row is a customer and each column is an item. Now every item is a vector of length 117: who bought it.</p>
<h3>Item-item similarity</h3>
<p>If two items are bought by <b>the same people</b>, they are similar. The measure is the <b>cosine</b> between the vectors (M4.3):</p>
<ol>
<li>Item A was bought by 3 customers: {1, 2, 3}. Item B by 4 customers: {2, 3, 4, 5}.</li>
<li>Shared buyers: {2, 3} — 2 people.</li>
<li>cos = 2 / √(3 · 4) = 2 / 3.46 ≈ 0.58.</li>
</ol>
<pre><code>from sklearn.metrics.pairwise import cosine_similarity
sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)
print(sim['смартфон'].drop('смартфон').sort_values(ascending=False).head(3))
# құлаққап      0.552
# зарядтағыш    0.546
# қап           0.429</code></pre>
<p>The model found that "смартфон (smartphone), құлаққап (headphones), зарядтағыш (charger) and қап (case) form one group" from the purchase history alone, without anyone telling it.</p>
<h3>A recommendation for a customer</h3>
<ol>
<li>Customer no. 1 bought тышқан (a mouse) and пернетақта (a keyboard).</li>
<li>Each item's score = the sum of its similarities to the items the customer bought: <code>sim.values @ M.loc[1].values</code>.</li>
<li>We remove the items already bought and sort the rest by score.</li>
<li>The result: сөмке (bag), ноутбук (laptop), зарядтағыш (charger). The popularity baseline would have offered them бөтелке (a bottle).</li>
</ol>
<h3>How we evaluate: precision@k</h3>
<p>We hide one purchase of each customer, build recommendations from the rest, and check whether the hidden item is in the top k. On this data (top 3): popularity finds it 36% of the time, item-item 56% of the time. <b>Precision@k</b> is how many of the k recommended items were really needed.</p>
<div class="tip">In real systems an offline metric is always followed by an A/B test: does the recommendation block really increase sales? Offline precision@k is only for shortlisting candidates.</div>
<h3>Common mistakes</h3>
<ul>
<li>Building a complex model with no baseline. Beating popularity is harder than you think.</li>
<li>Recommending an item the customer has already bought (forgetting the filter).</li>
<li>Not splitting train and test by time when evaluating: "predicting" the past from future purchases.</li>
<li>Forgetting the cold start: a new customer and a new item have no history and need a separate strategy.</li>
<li>Recommending nothing but popular items: rare but well-matched items never get shown at all.</li>
</ul>`,
      ex: [
        { prompt: "The popularity baseline: store the names of the 3 best-selling items in the list <code>top3</code> (in descending order). Build the user-item matrix in <code>M</code>: <code>pd.crosstab</code>, rows <code>user_id</code>, columns <code>item</code>.", check: { tests: "import pandas as _pd\n_d = _pd.read_csv('purchases.csv')\n_vc = _d['item'].value_counts()\nassert list(top3) == list(_vc.head(3).index), \"top3 is df['item'].value_counts().head(3).index (as a list)\"\nassert isinstance(M, _pd.DataFrame) and M.shape == (117, 15), \"M is a 117 × 15 table: pd.crosstab(df['user_id'], df['item'])\"\nassert int(M.values.sum()) == len(_d) and int(M.values.max()) == 1, \"The cells of M are 0/1 and they sum to the number of purchases\"\nassert int(M['смартфон'].sum()) == int(_vc['смартфон']), \"The columns are the item names\"" }, hints: ["<code>df['item'].value_counts().head(3).index</code>", "<code>M = pd.crosstab(df['user_id'], df['item'])</code>"] },
        { prompt: "<code>M</code> is ready. Store the table of cosine similarities between items in <code>sim</code> (a 15 × 15 DataFrame whose index and columns are the item names). Store the 3 items most similar to смартфон (the smartphone, excluding itself) in the list <code>nearest</code>. Compute the scores for customer no. 1 and store in the list <code>recs</code> the 3 highest-scoring items among those they have not bought yet.", check: { tests: "import pandas as _pd, numpy as _np\n_d = _pd.read_csv('purchases.csv')\n_M = _pd.crosstab(_d['user_id'], _d['item'])\n_A = _M.values.astype(float); _nr = _np.sqrt((_A ** 2).sum(axis=0))\n_S = _pd.DataFrame((_A.T @ _A) / _np.outer(_nr, _nr), index=_M.columns, columns=_M.columns)\nassert isinstance(sim, _pd.DataFrame) and sim.shape == (15, 15), \"sim is a 15 × 15 DataFrame: the similarity between items (use M.T, not M)\"\nassert _np.allclose(sim.loc[_M.columns, _M.columns].values, _S.values, atol=1e-9), \"The similarity values do not match: cosine_similarity(M.T)\"\n_ne = list(_S['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index)\nassert list(nearest) == _ne, \"nearest: sim['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index\"\n_own = _M.loc[1]\n_sc = _pd.Series(_S.values @ _own.values, index=_M.columns)[_own == 0].sort_values(ascending=False)\nassert len(recs) == 3 and not any(_own[r] == 1 for r in recs), \"recs is 3 items that customer no. 1 has not bought yet\"\nassert set(recs) == set(_sc.head(3).index), \"recs: score = sim.values @ M.loc[1].values, drop the items already bought and take the top 3\"" }, hints: ["<code>sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)</code>", "<code>own = M.loc[1]</code>; <code>scores = pd.Series(sim.values @ own.values, index=M.columns)</code>; the filter: <code>scores[own == 0]</code>"] },
        { prompt: "The system recommended 5 items to a customer. The next week the customer bought 2 of them. What is Precision@5?", explain: "Precision@5 = 2 / 5 = 0.4: how many of the recommended items were needed." }
      ]
    },
    "mp-gate": {
      title: "Module exam: ML in Practice",
      body: `
<p>The final check. Pipeline, leakage, feature engineering, tuning, ensembles, threshold and explanation, all together. Keep models small (n_estimators ≤ 100, cv ≤ 5) and set <code>random_state</code>.</p>`,
      ex: [
        { prompt: "Predict flat prices. Build a Pipeline (or GridSearchCV) named <code>model</code> that accepts the raw columns of <code>X_train</code> (district as text). Choose the feature engineering and the model yourself: for example <code>LinearRegression</code> or <code>Ridge</code> from M5.1, or the regression version of the ensembles from this module. The test R² (<code>model.score(X_test, y_test)</code>) must be at least <b>0.90</b>. Do not use <code>price_mln</code> as a feature.", hints: [], check: {"tests":"from sklearn.pipeline import Pipeline as _P\nfrom sklearn.model_selection import GridSearchCV as _G\nassert isinstance(model, (_P, _G)), 'model is a Pipeline or a GridSearchCV'\nassert 'price_mln' not in X_train.columns, 'price_mln must not be a feature'\nassert not any('price' in str(c) for c in X_test.columns), 'A feature built from the price is target leakage'\nassert len(X_test) == 100, 'Do not change X_test (100 rows)'\n_r2 = model.score(X_test, y_test)\nassert _r2 >= 0.90, f'Test R² should be at least 0.90, you have {_r2:.3f}. Did you add district with OneHotEncoder?'"} },
        { prompt: "Churn: the retention team wants to find at least <b>70%</b> of leavers (recall ≥ 0.70), while at least <b>40%</b> of alerts must be correct (precision ≥ 0.40). Provide <code>model</code> (a Pipeline with predict_proba) and a number <code>threshold</code>. The test: <code>(model.predict_proba(X_test)[:, 1] &gt;= threshold)</code>.", hints: [], check: {"tests":"from sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert model is not None and hasattr(model, 'predict_proba'), 'model is a fitted model with predict_proba'\nassert 0 < threshold < 1, 'threshold is between 0 and 1'\nassert len(X_test) == 150, 'Do not change X_test'\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\n_r, _p = _rs(y_test, _yp), _ps(y_test, _yp, zero_division=0)\nassert _r >= 0.70, f'recall {_r:.2f} < 0.70: lower the threshold or use class_weight'\nassert _p >= 0.40, f'precision {_p:.2f} < 0.40: the threshold is too low'"} },
        { prompt: "An analyst filled missing <code>age</code> with the median of the whole data, fit StandardScaler on the whole data, and then split into train/test. What is the best fix?", options: ["Use the mean instead of the median","Split first, put SimpleImputer and StandardScaler inside a Pipeline and fit them on train only","Increase test_size to 0.5","Replace StandardScaler with MinMaxScaler"], explain: "Every step that learns from data must be fit on train only. A Pipeline guarantees this automatically in CV and in production." },
        { prompt: "In a Random Forest, the feature_importances_ of <code>data_gb</code> is 0.14, but its permutation importance on test is ≈ 0. What is the best conclusion?", options: ["data_gb is one of the most important features","Impurity importance shows the feature was used to split noise in train; on test it does not improve predictions","Permutation importance was computed wrongly","data_gb causes churn"], explain: "Impurity importance is computed on train and overrates continuous features. Permutation on test directly measures \"how much worse the model gets without the feature\"." }
      ]
    }
  }
});
