// M5.1 ML Foundations: English text. Code, solutions and expected output are in content/ml.js.
DJ.i18n.patch({
  modules: {
    "m5-1": { intro: "Machine learning means teaching a computer from examples instead of writing the rules by hand. In this module you use scikit-learn to predict the prices of flats in Almaty (flats.csv), classify which telecom subscribers will leave (churn.csv), and learn to evaluate a model fairly." }
  },
  lessons: {
    "ml-1": {
      title: "What is machine learning?",
      body: `
<p>In an ordinary program <b>a person writes the rule</b>: "if the area is over 60 m², the price is 40 mln". Machine learning works the other way round: we give the computer many <b>examples</b> (400 flats and their real prices), and the model finds the rule itself from the data.</p>
<h3>Key words</h3>
<ul>
<li><b>Features</b> (<code>X</code>): the columns the model looks at, such as area, number of rooms, year built.</li>
<li><b>Target</b> (<code>y</code>): the column we predict, <code>price_mln</code>.</li>
<li><b>Supervised learning</b>: every example has a correct answer (target). This whole module is about it.</li>
<li><b>Unsupervised learning</b>: there is no answer; the model looks for structure inside the data, for example splitting subscribers into similar groups (clustering).</li>
</ul>
<h3>Regression or classification</h3>
<table>
<tr><th>Task</th><th>Target</th><th>Type</th></tr>
<tr><td>Predict the price of a flat</td><td>a number (mln ₸)</td><td>regression</td></tr>
<tr><td>Will the subscriber leave?</td><td>0 or 1</td><td>classification</td></tr>
</table>
<h3>Step-by-step example</h3>
<ol>
<li>Business question: "What price should we list a new flat at?"</li>
<li>Target: <code>price_mln</code>. It is a continuous number, so this is regression.</li>
<li>Features: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>. We leave out <code>flat_id</code>: it is just a number with nothing to do with the price.</li>
<li>In code:</li>
</ol>
<pre><code>import pandas as pd
flats = pd.read_csv('flats.csv')
X = flats[['area_m2', 'rooms', 'year_built']]   # 2D table
y = flats['price_mln']                          # 1D column
print(X.shape, y.shape)   # (400, 3) (400,)</code></pre>
<h3>When you do not need ML</h3>
<ul>
<li>When the rule is known exactly: to compute VAT you need a formula, not a model.</li>
<li>When there is little data or no correct answers (target).</li>
<li>When every decision must be fully explained by law and a simple rule is enough.</li>
</ul>
<div class="tip">First ask: "Would a simple rule or a SQL query do the job?" ML is the last tool, not the first.</div>
<h3>Common mistakes</h3>
<ul>
<li><b>Letting the target slip into the features</b> (leakage): for example, putting a "price per m²" column computed from the price into X. The model looks "perfect", but a new flat will not have that column.</li>
<li>Using ID columns (<code>flat_id</code>, <code>customer_id</code>) as features.</li>
<li>Treating a 0/1 target as regression because it is a number. It is a class, so it is classification.</li>
</ul>`,
      ex: [
        { prompt: "From <code>flats.csv</code> create <code>X</code> (columns <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) and <code>y</code> (<code>price_mln</code>). Then <code>print(X.shape, y.shape)</code>.", hints: ["Several columns: <code>flats[['area_m2', 'rooms', 'year_built']]</code>","One column: <code>flats['price_mln']</code>"], check: {"tests":"assert isinstance(X, pd.DataFrame), 'X must be a DataFrame: use double brackets [[...]]'\nassert list(X.columns) == ['area_m2', 'rooms', 'year_built'], 'X columns: area_m2, rooms, year_built (in this order)'\nassert isinstance(y, pd.Series) and y.name == 'price_mln', 'y is the price_mln column (a Series, single brackets)'\nassert len(X) == 400 and len(y) == 400, 'All 400 flats should stay'"} },
        { prompt: "Which task is <b>classification</b>?", options: ["Predict the price of a flat in mln ₸","Predict whether a subscriber leaves next month (0/1)","Predict a subscriber's monthly data use (GB)","Predict the year a building was built"], explain: "The target is one of two classes (leaves / stays), so it is classification. In the others the target is a continuous number, which is regression." },
        { prompt: "In which case do you <b>not</b> need ML?", options: ["Predict who will leave from data on 600 subscribers","Compute a plan's monthly fee with VAT (the rate is known)","Estimate a new flat's price from data on 400 flats","Find unhappy customers among thousands of reviews"], explain: "VAT has an exact formula. If the rule is known, there is no need to train a model." }
      ]
    },
    "ml-2": {
      title: "The scikit-learn API: fit, predict, score",
      body: `
<p><b>scikit-learn</b> (<code>sklearn</code>) is the classic ML library in Python. Its beauty is that every model works through the same three steps.</p>
<ol>
<li><b>Create the model</b>: <code>model = LinearRegression()</code>, an "empty brain" for now.</li>
<li><b>Train</b>: <code>model.fit(X, y)</code>, the model looks at the examples and finds its parameters.</li>
<li><b>Predict</b>: <code>model.predict(X_new)</code> gives answers for new rows.</li>
</ol>
<p>Also: <code>model.score(X, y)</code> returns <b>R²</b> for regression: 1 is perfect, 0 means the model is no better than predicting the mean.</p>
<h3>The shape rule</h3>
<ul>
<li><code>X</code> is always <b>2D</b>: rows × columns. Even with one feature: <code>flats[['area_m2']]</code> (double brackets).</li>
<li><code>y</code> is <b>1D</b>: <code>flats['price_mln']</code> (single brackets).</li>
</ul>
<h3>Step-by-step example: price from area</h3>
<pre><code>import pandas as pd
from sklearn.linear_model import LinearRegression

flats = pd.read_csv('flats.csv')
X = flats[['area_m2']]
y = flats['price_mln']

model = LinearRegression()
model.fit(X, y)
print(model.coef_, model.intercept_)   # [0.648] -0.47
new = pd.DataFrame({'area_m2': [60]})
print(model.predict(new))              # [38.41]
print(model.score(X, y))               # 0.62</code></pre>
<ol>
<li><code>fit</code> found a straight line: price ≈ 0.648 × area − 0.47. This is the same MSE-minimising line we searched for by hand with gradient descent in the Math for ML module.</li>
<li>One square metre adds about 0.65 mln ₸.</li>
<li>A 60 m² flat: 0.648 × 60 − 0.47 ≈ 38.4 mln ₸.</li>
<li>R² = 0.62: area alone explains 62% of the variation in price.</li>
</ol>
<p>Attributes of a trained model end with an underscore: <code>coef_</code>, <code>intercept_</code>, <code>n_features_in_</code>. They appear only after <code>fit</code>.</p>
<div class="tip">Pass new data as a DataFrame with the same columns as <code>X</code>. Then sklearn checks the column names and catches mistakes early.</div>
<h3>Common mistakes</h3>
<ul>
<li><code>model.fit(flats['area_m2'], y)</code>: a 1D <code>X</code>. Error: <i>Expected 2D array, got 1D array</i>. Fix: double brackets.</li>
<li>Calling <code>predict</code> without <code>fit</code>: <code>NotFittedError</code>.</li>
<li><code>predict([60])</code> is also 1D. You need <code>[[60]]</code> or a DataFrame.</li>
</ul>`,
      ex: [
        { prompt: "Train a <code>LinearRegression</code> model named <code>model</code> to predict price (<code>price_mln</code>) from area (<code>area_m2</code>). Store the predicted price of a 60 m² flat in the variable <code>pred60</code> as a number and print it.", hints: ["<code>X = flats[['area_m2']]</code> (double brackets)","<code>model.predict(pd.DataFrame({'area_m2': [60]}))[0]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\nassert isinstance(model, _LinR), 'model must be LinearRegression()'\nassert hasattr(model, 'coef_'), 'The model is not fitted: call model.fit(X, y)'\nassert model.n_features_in_ == 1, 'Only one feature is needed: area_m2'\nassert abs(float(pred60) - 38.41) < 0.1, f'pred60 should be ≈ 38.41, you have {float(pred60):.2f}. Did you take predict(...)[0]?'"} },
        { prompt: "The code has a bug: <code>X</code> is 1D. Fix it: <code>model2</code> should now be trained on <b>two</b> features (<code>area_m2</code>, <code>rooms</code>). Store the R² on the training data in the variable <code>r2</code> using <code>score</code>, and print it.", hints: ["<code>X = flats[['area_m2', 'rooms']]</code>","<code>r2 = model2.score(X, y)</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[['area_m2', 'rooms']]\n_r2 = _LinR().fit(_X, _f['price_mln']).score(_X, _f['price_mln'])\nassert hasattr(model2, 'coef_') and model2.n_features_in_ == 2, 'model2 should be fitted on two features: area_m2 and rooms'\nassert abs(r2 - _r2) < 1e-6, f'r2 should be {_r2:.4f}: model2.score(X, y)'"} },
        { prompt: "The model found the formula: price = 0.65 × area − 0.5 (mln ₸). What is the predicted price of an 80 m² flat in mln ₸?", unit: "mln ₸", explain: "0.65 × 80 = 52, 52 − 0.5 = 51.5." }
      ]
    },
    "ml-3": {
      title: "Train/test split: testing the model fairly",
      body: `
<p>Imagine a teacher handed out the exam questions in advance. A student memorises the answers and scores 100, but does not understand the topic. A model is the same: if we score it on the data it learned from, the result is always falsely good.</p>
<p>The fix: split the data in two. <b>Train</b> (usually 80%) is where the model learns. <b>Test</b> (20%) is never shown to the model; we only score on it at the end. It is a "rehearsal" of predicting new flats.</p>
<h3>Overfitting</h3>
<p><b>Overfitting</b> is when the model memorises the specific examples (noise included) instead of the general pattern. The sign: very good on train, much worse on test. For example, an unlimited decision tree (we cover it later) gives train R² = 1.00 on flats but test R² = 0.51.</p>
<h3>Step-by-step example</h3>
<pre><code>from sklearn.model_selection import train_test_split

X = flats[['area_m2']]
y = flats['price_mln']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
print(len(X_train), len(X_test))      # 320 80

model = LinearRegression().fit(X_train, y_train)
print(model.score(X_train, y_train))  # 0.633
print(model.score(X_test, y_test))    # 0.587</code></pre>
<ol>
<li><code>test_size=0.2</code>: 80 of the 400 flats go to test.</li>
<li>The split is random. <code>random_state=42</code> fixes the randomness: whoever runs it gets the same split. Without it the result changes every time.</li>
<li>The function returns <b>four</b> things, and the order matters: <code>X_train, X_test, y_train, y_test</code>.</li>
<li><code>fit</code> only on train. Test R² (0.587) is a bit below train (0.633), which is normal. A big gap means overfitting.</li>
</ol>
<div class="tip">For classification add <code>stratify=y</code>: then train and test have the same share of subscribers who left (≈26%).</div>
<h3>Common mistakes</h3>
<ul>
<li>Training the model on all the data and then scoring on test: the model has "already seen" the test.</li>
<li>Mixing up the order of the returned values (writing <code>X_train, y_train, ...</code>).</li>
<li>Changing <code>random_state</code> until the test result looks nice. That is fooling yourself too.</li>
<li>Looking at test often and tuning the model to it. Test is the final exam; it is best taken only once.</li>
<li>Splitting time-ordered data (for example, by month) at random: to predict the future, keep the latest period for test.</li>
</ul>`,
      ex: [
        { prompt: "Create <code>X</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) and <code>y</code> (<code>price_mln</code>). Split them into <code>X_train, X_test, y_train, y_test</code> with <code>test_size=0.2</code>, <code>random_state=42</code>. Print the train and test sizes.", hints: ["<code>train_test_split(X, y, test_size=0.2, random_state=42)</code>","Get all four variables in one line: <code>X_train, X_test, y_train, y_test = ...</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\nassert len(X_train) == 320 and len(X_test) == 80, 'Train should have 320 rows and test 80 (test_size=0.2)'\nassert list(X_train.columns) == ['area_m2', 'rooms', 'year_built'], 'X columns: area_m2, rooms, year_built'\nassert list(X_test.index) == list(_b.index), 'The split came out different: did you set random_state=42?'\nassert list(y_train.index) == list(X_train.index), 'Check the order: X_train, X_test, y_train, y_test'"} },
        { prompt: "The split is ready. Train a <code>LinearRegression</code> named <code>model</code> <b>on train only</b>. Store R² on train in <code>train_r2</code> and on test in <code>test_r2</code>, and print them.", hints: ["<code>model.fit(X_train, y_train)</code>","<code>model.score(X_test, y_test)</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert hasattr(model, 'coef_'), 'model is not fitted'\nassert abs(train_r2 - _m.score(_a, _c)) < 1e-6, f'train_r2 should be {_m.score(_a, _c):.4f}: model.score(X_train, y_train)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, f'test_r2 should be {_m.score(_b, _d):.4f}. Did you fit the model on X_train, y_train only?'"} },
        { prompt: "A model gave R² = 0.99 on train and R² = 0.45 on test. What is this?", options: ["Underfitting: the model is too simple","Overfitting: the model memorised the training data","A great model, the test just came out badly by chance","There is an error in the data"], explain: "A big gap between train and test is the classic sign of overfitting." }
      ]
    },
    "ml-4": {
      title: "Linear regression: coefficients and MAE, RMSE, R²",
      body: `
<p>Linear regression with several features: <code>price = b0 + b1 × area + b2 × year</code>. The model chooses <code>b0</code> (<code>intercept_</code>) and <code>b1, b2</code> (<code>coef_</code>) so that MSE is as small as possible.</p>
<h3>Reading a coefficient</h3>
<p><code>b1</code> is how much the price changes when the area grows by 1 m² <b>while the other features stay the same</b>. The sign shows the direction: positive means it goes up, negative means it goes down.</p>
<h3>Error metrics</h3>
<table>
<tr><th>Metric</th><th>Meaning</th><th>Unit</th></tr>
<tr><td><b>MAE</b></td><td>mean of |errors|: "how much it is usually off by"</td><td>mln ₸</td></tr>
<tr><td><b>RMSE</b></td><td>√(mean of errors²): punishes large errors harder</td><td>mln ₸</td></tr>
<tr><td><b>R²</b></td><td>what share of the price variation the model explains</td><td>no unit</td></tr>
</table>
<p>R² = 1 is perfect, R² = 0 is the same as predicting the mean, R² &lt; 0 is worse than the mean.</p>
<h3>Step-by-step example</h3>
<p>First by hand: true prices 30, 40, 50, predictions 32, 37, 50.</p>
<ol>
<li>Errors: +2, −3, 0. MAE = (2 + 3 + 0) / 3 ≈ 1.67.</li>
<li>Squares: 4, 9, 0. RMSE = √(13 / 3) ≈ 2.08. RMSE ≥ MAE always.</li>
</ol>
<p>Now on the flats data:</p>
<pre><code>from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score
X = flats[['area_m2', 'year_built']]
y = flats['price_mln']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_train, y_train)
print(model.coef_)          # [0.656 0.255]
pred = model.predict(X_test)
print(mean_absolute_error(y_test, pred))      # 8.99
print(root_mean_squared_error(y_test, pred))  # 10.64
print(r2_score(y_test, pred))                 # 0.635</code></pre>
<ol>
<li>With the same year, +1 m² ≈ +0.656 mln ₸.</li>
<li>With the same area, a building 1 year newer ≈ +0.255 mln ₸.</li>
<li>The model is usually off by ±9 mln ₸. For comparison, predicting the plain mean gives MAE = 13.8. The model is useful but still rough: in the next lesson we add the district.</li>
</ol>
<div class="tip">Always compare with a <b>baseline</b>: the prediction "the mean price for everyone". If the model is not better than that, you do not need it.</div>
<h3>Common mistakes</h3>
<ul>
<li>Trying to interpret <code>intercept_</code>: −510 is "the price of a 0 m² flat built in year 0", which means nothing.</li>
<li>Comparing coefficients in different units and saying "which one matters more".</li>
<li>Computing the metric on train.</li>
<li>Swapping the argument order: it is <code>(y_true, y_pred)</code>.</li>
</ul>`,
      ex: [
        { prompt: "Compute MAE and RMSE <b>by hand</b> with NumPy and store them in the variables <code>mae</code> and <code>rmse</code> (do not use sklearn).", hints: ["Errors: <code>err = y_pred - y_true</code>","<code>np.mean(np.abs(err))</code> and <code>np.sqrt(np.mean(err ** 2))</code>"], check: {"tests":"assert abs(mae - 2.75) < 1e-9, 'mae should be 2.75: the mean of |errors|'\nassert abs(rmse - 3.5) < 1e-9, 'rmse should be 3.5: the square root of the mean of squares'"} },
        { prompt: "Features <code>area_m2</code>, <code>year_built</code>, split <code>test_size=0.2</code>, <code>random_state=42</code>. Train <code>model</code> on train and compute <code>mae</code>, <code>rmse</code>, <code>r2</code> on test. Store the area coefficient in the variable <code>coef_area</code>.", hints: ["Metrics: <code>mean_absolute_error(y_test, pred)</code> and so on.","<code>coef_area = model.coef_[0]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\n_e = _m.predict(_b) - _d\nassert abs(mae - _np.mean(_np.abs(_e))) < 1e-6, f'mae should be ≈ {_np.mean(_np.abs(_e)):.2f} (on the test data)'\nassert abs(rmse - _np.sqrt(_np.mean(_e ** 2))) < 1e-6, f'rmse should be ≈ {_np.sqrt(_np.mean(_e ** 2)):.2f}'\nassert abs(r2 - _m.score(_b, _d)) < 1e-6, f'r2 should be ≈ {_m.score(_b, _d):.3f}'\nassert abs(coef_area - _m.coef_[0]) < 1e-6, 'coef_area is model.coef_[0] (area_m2 is the first column)'"} },
        { prompt: "In the model the <code>area_m2</code> coefficient is 0.656 (mln ₸ / m²). Of two flats built in the same year, one is 10 m² larger. By how much (mln ₸) do their prices differ according to the model?", unit: "mln ₸", explain: "10 × 0.656 = 6.56 mln ₸. We can read it this way only when the other features are the same." }
      ]
    },
    "ml-5": {
      title: "Categorical features: one-hot encoding",
      body: `
<p>In Almaty the district is what drives the price most. But <code>district</code> is text ("Медеу", "Алатау"), and a model works only with numbers.</p>
<h3>Why not number them 1, 2, 3...?</h3>
<p>If we say Alatau = 0, Almaly = 1, ..., Medeu = 3, the model thinks "Medeu is three times Almaly" or "the districts lie on one line". There is no such order. We checked: with numbered districts the test R² = 0.63, as if the district were not added at all.</p>
<h3>One-hot encoding</h3>
<p>A separate 0/1 column for each district: 1 if the flat is in that district, otherwise 0.</p>
<table>
<tr><th>district</th><th>district_Алмалы</th><th>district_Медеу</th><th>...</th></tr>
<tr><td>Алмалы</td><td>1</td><td>0</td><td>...</td></tr>
<tr><td>Медеу</td><td>0</td><td>1</td><td>...</td></tr>
<tr><td>Алатау</td><td>0</td><td>0</td><td>...</td></tr>
</table>
<h3>Step-by-step example</h3>
<pre><code>X = pd.get_dummies(flats[['area_m2', 'year_built', 'district']],
                   columns=['district'], drop_first=True, dtype=int)
print(X.shape)        # (400, 7)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))   # 0.911 (was 0.635)</code></pre>
<ol>
<li>6 districts → 6 columns. <code>drop_first=True</code> drops the first one (Alatau): if the other five are 0, the flat is clearly in Alatau. This is the <b>baseline</b> district.</li>
<li><code>dtype=int</code> gives 1/0 instead of True/False.</li>
<li>Result: 2 numeric columns + 5 district columns = 7.</li>
<li>Coefficients: <code>district_Медеу</code> ≈ 21.8. That is, a flat of the same area and year costs about 21.8 mln ₸ more in Medeu than in Alatau.</li>
<li>Test R² 0.635 → 0.911, MAE 9.0 → 3.8 mln ₸. One column transformed the model.</li>
</ol>
<div class="tip">Run get_dummies once on the whole X, before the train/test split. Then both parts have the same columns.</div>
<h3>Common mistakes</h3>
<ul>
<li>Feeding a category as a number (label encoding) to a linear model.</li>
<li>Running get_dummies separately on train and test: if a district is missing from test, the column counts do not match.</li>
<li>One-hot encoding a column with thousands of values (for example, <code>customer_id</code>): thousands of useless columns appear.</li>
<li>Forgetting <code>columns=</code> and passing the whole DataFrame: then every text column gets encoded, which sometimes gives unexpected results.</li>
</ul>`,
      ex: [
        { prompt: "Create <code>X</code> from the <code>area_m2</code>, <code>year_built</code>, <code>district</code> columns of <code>flats</code> with <code>pd.get_dummies</code>: <code>columns=['district']</code>, <code>drop_first=True</code>, <code>dtype=int</code>. Print <code>X.columns</code>.", hints: ["<code>pd.get_dummies(flats[[...]], columns=['district'], drop_first=True, dtype=int)</code>"], check: {"tests":"assert isinstance(X, pd.DataFrame), 'X must be a DataFrame'\nassert 'district' not in X.columns, 'The text column district should be gone: columns=[\"district\"]'\nassert X.shape == (400, 7), f'X should have shape (400, 7), you have {X.shape}. Did you set drop_first=True?'\nassert 'district_Медеу' in X.columns and 'district_Алатау' not in X.columns, 'Алатау (the first) is dropped, district_Медеу stays'\nassert all(str(_t).startswith('int') or str(_t).startswith('float') for _t in X.dtypes), 'All columns should be numbers: dtype=int'"} },
        { prompt: "The one-hot <code>X</code> is ready. Split it with <code>test_size=0.2</code>, <code>random_state=42</code> and train <code>model</code>. Store the test R² in <code>test_r2</code> and the <code>district_Медеу</code> coefficient in <code>coef_medeu</code>.", hints: ["Index: <code>list(X.columns).index('district_Медеу')</code>","<code>model.coef_[i]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_a, _b, _c, _d = _tts(_X, _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert hasattr(model, 'coef_') and model.n_features_in_ == 7, 'model should be fitted on the one-hot X (7 columns)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, f'test_r2 should be ≈ {_m.score(_b, _d):.3f}: fit on train, evaluate on test'\n_cm = _m.coef_[list(_X.columns).index('district_Медеу')]\nassert abs(coef_medeu - _cm) < 1e-6, f'coef_medeu should be ≈ {_cm:.2f}: find the index of the district_Медеу column'"} },
        { prompt: "Why is it bad to number district as 0, 1, 2, ... and feed it to a linear model?", options: ["The numbers are too big","The model \"invents\" an order and distances between districts that do not exist","sklearn understands text by itself","Numbering is too slow"], explain: "A linear model reads it as \"the number goes up by 1, the price goes up by b\". Districts have no such order, so you need one-hot." }
      ]
    },
    "ml-6": {
      title: "k-nearest neighbours and feature scaling",
      body: `
<p><b>k-nearest neighbours</b> (KNN) is the easiest model to understand. To find the price of a new flat, you find the <b>k most similar flats</b> in train and take the mean of their prices. In classification it is the majority vote of the neighbours. Similarity is measured with the Euclidean distance from the Math for ML module.</p>
<h3>The scale problem</h3>
<p>The distance adds up all columns equally. But <code>area_m2</code> varies by tens of units, while <code>district_Медеу</code> is only 0 or 1. As a result, to KNN a 3 m² difference looks bigger than a difference in district.</p>
<h3>Step-by-step example</h3>
<table>
<tr><th>Flat</th><th>area_m2</th><th>district_Медеу</th><th>district_Алатау</th></tr>
<tr><td>A</td><td>60</td><td>1</td><td>0</td></tr>
<tr><td>B</td><td>63</td><td>0</td><td>1</td></tr>
<tr><td>C</td><td>70</td><td>1</td><td>0</td></tr>
</table>
<ol>
<li>Raw distance: A–B = √(3² + 1² + 1²) ≈ 3.3, A–C = √(10²) = 10. To KNN, B is "closer", even though it is in a cheap district!</li>
<li><b>StandardScaler</b> turns each column into a z-score: <code>(x − mean) / SD</code> (familiar from the Statistics module). Area SD ≈ 20, dummy SD ≈ 0.37.</li>
<li>After scaling: A–B ≈ √(0.15² + 2.7² + 2.7²) ≈ 3.8, A–C ≈ 10 / 20 = 0.5. Now C is much closer. Correct.</li>
</ol>
<pre><code>from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
scaler.fit(X_train)                     # mean and SD from train only
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)     # with the same numbers

knn = KNeighborsRegressor(n_neighbors=5).fit(X_train_s, y_train)
print(knn.score(X_test_s, y_test))      # 0.91 (0.57 without scaling)</code></pre>
<p>With area, year and the one-hot district columns, KNN without scaling gives test R² = 0.57, with scaling 0.91.</p>
<div class="tip">Scaling is needed by models that rely on distance or gradients (KNN, logistic regression, neural networks). A decision tree does not need it.</div>
<h3>Common mistakes</h3>
<ul>
<li>Fitting the scaler on all the data or on test: information about test "leaks" into the model (leakage).</li>
<li>Forgetting to <code>transform</code> test: the model compares a scaled train with a raw test.</li>
<li><code>n_neighbors=1</code>: the model memorises every bit of noise, overfitting.</li>
<li>Scaling the target (<code>y</code>): KNN and regression do not need it.</li>
</ul>`,
      ex: [
        { prompt: "Scale <code>flats[['area_m2', 'year_built']]</code> with <code>StandardScaler</code> and store the result in <code>Xs</code> (<code>fit_transform</code>). Print the mean and SD of each column.", hints: ["<code>scaler = StandardScaler()</code>","<code>Xs = scaler.fit_transform(flats[['area_m2', 'year_built']])</code>"], check: {"tests":"import numpy as _np\nassert _np.asarray(Xs).shape == (400, 2), 'Xs should have shape (400, 2)'\nassert _np.all(_np.abs(_np.asarray(Xs).mean(axis=0)) < 1e-9), 'The scaled columns should have mean 0'\nassert _np.all(_np.abs(_np.asarray(Xs).std(axis=0) - 1) < 1e-9), 'The scaled columns should have SD 1'"} },
        { prompt: "The split is ready. Train two KNN models (<code>n_neighbors=5</code>): (1) on raw data, test R² → <code>r2_raw</code>; (2) with a <code>StandardScaler</code> fit on train, test R² → <code>r2_scaled</code>. Print both.", hints: ["<code>scaler = StandardScaler().fit(X_train)</code>","<code>knn_s.fit(scaler.transform(X_train), y_train)</code>, and score with <code>scaler.transform(X_test)</code>"], check: {"tests":"assert abs(r2_raw - 0.574) < 0.01, f'r2_raw should be ≈ 0.574 (no scaling, k=5), you have {r2_raw:.3f}'\nassert abs(r2_scaled - 0.912) < 0.01, f'r2_scaled should be ≈ 0.912, you have {r2_scaled:.3f}. Did you fit the scaler on X_train and transform both parts?'"} },
        { prompt: "Which data should <code>StandardScaler</code> be <code>fit</code> on?", options: ["All the data (train + test)","Train only, then transform both train and test","Test only","Train and test separately"], explain: "The mean and SD must come from train only. Otherwise information about test leaks into the model, and separate fits put the two parts on different scales." }
      ]
    },
    "ml-7": {
      title: "Logistic regression: churn probability",
      body: `
<p>Now classification: will a telecom subscriber leave next month (<code>churned</code> = 1) or stay (0)? Linear regression is awkward here: it gives meaningless values like −0.3 or 1.4. We need a <b>probability</b> between 0 and 1.</p>
<h3>Sigmoid</h3>
<p><b>Logistic regression</b> first computes a linear sum: <code>z = b0 + b1·x1 + ...</code>, then passes it through the <b>sigmoid</b> function: <code>p = 1 / (1 + e<sup>−z</sup>)</code>. If z = 0 then p = 0.5; if z is large, p → 1; if z is negative, p → 0.</p>
<h3>Step-by-step example</h3>
<pre><code>from sklearn.linear_model import LogisticRegression
churn = pd.read_csv('churn.csv')
features = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']
X = churn[features]
y = churn['churned']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y)

clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)
proba = clf.predict_proba(X_test)[:, 1]
print(proba[:3])                  # [0.44 0.438 0.058]
print(clf.predict(X_test)[:3])    # [0 0 0]
print(clf.score(X_test, y_test))  # 0.807 (accuracy)</code></pre>
<ol>
<li><code>age</code> and <code>data_gb</code> have missing values, and sklearn does not accept NaN. So we took the four features with no gaps.</li>
<li><code>stratify=y</code>: train and test have the same share of leavers (≈26%).</li>
<li><code>predict_proba</code> returns two columns: [P(0), P(1)]. We want the probability of leaving, which is <code>[:, 1]</code>.</li>
<li><code>predict</code> gives 1 if the probability is ≥ <b>0.5</b>. The first subscriber has p = 0.44, so 0, but they are right on the border.</li>
<li>Coefficient signs: <code>tenure_months</code> is negative (long-time customers are loyal), <code>support_calls</code> is positive (many complaints signal leaving), <code>has_contract</code> is negative.</li>
</ol>
<h3>Changing the threshold</h3>
<p>0.5 is not a law. If the retention team wants to hold on to more subscribers, it lowers the threshold with <code>(proba &gt;= 0.3).astype(int)</code>: more people get marked as "at risk".</p>
<div class="tip">If you see a <i>ConvergenceWarning</i>, set <code>max_iter=1000</code> or scale the features.</div>
<h3>Common mistakes</h3>
<ul>
<li>Taking <code>predict_proba(X)[:, 0]</code>: that is the probability of <b>staying</b>.</li>
<li>Passing columns with NaN without checking: the error <i>Input X contains NaN</i>.</li>
<li>Using <code>predict</code> where you need a probability: you lose the chance to choose the threshold.</li>
</ul>`,
      ex: [
        { prompt: "The split is ready. Train <code>LogisticRegression(max_iter=1000)</code> named <code>clf</code>. Store the probability of leaving on test in <code>proba</code> (<code>predict_proba(...)[:, 1]</code>) and the accuracy in <code>acc</code>, and print them.", hints: ["<code>clf.fit(X_train, y_train)</code>","<code>clf.predict_proba(X_test)[:, 1]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nassert hasattr(clf, 'coef_'), 'clf is not fitted: clf.fit(X_train, y_train)'\nassert len(proba) == 150, 'proba should cover the 150 subscribers in test'\nassert _np.all((_np.asarray(proba) >= 0) & (_np.asarray(proba) <= 1)), 'proba should be between 0 and 1'\nassert abs(_np.mean(proba) - _np.mean(_p)) < 0.02, 'proba should be the probability of leaving: take column [:, 1]'\nassert abs(acc - _m.score(_Xte, _yte)) < 0.02, f'acc should be ≈ {_m.score(_Xte, _yte):.3f}: clf.score(X_test, y_test)'"} },
        { prompt: "The model and <code>proba</code> are ready. Use a threshold of 0.3 and store the prediction in <code>pred_03</code> (a 0/1 array). Store the number of \"at risk\" subscribers with threshold 0.5 in <code>n_05</code> and with threshold 0.3 in <code>n_03</code>, and print them.", hints: ["<code>(proba &gt;= 0.3).astype(int)</code>","<code>int(pred_03.sum())</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_n5 = int((_p >= 0.5).sum())\n_n3 = int((_p >= 0.3).sum())\nassert len(pred_03) == 150 and set(_np.unique(pred_03)) <= {0, 1}, 'pred_03 is an array of 150 values 0/1'\nassert abs(n_05 - _n5) <= 2, f'n_05 should be ≈ {_n5}: clf.predict(X_test).sum()'\nassert abs(n_03 - _n3) <= 2 and n_03 == int(_np.sum(pred_03)), f'n_03 should be ≈ {_n3}: (proba >= 0.3).sum()'\nassert n_03 > n_05, 'Lowering the threshold should flag more subscribers at risk'"} },
        { prompt: "Logistic regression computed z = 2 for one subscriber. What is the probability of leaving by the sigmoid, p = 1 / (1 + e<sup>−2</sup>)? (to three decimals)", explain: "e<sup>−2</sup> ≈ 0.135. 1 / 1.135 ≈ 0.881." }
      ]
    },
    "ml-8": {
      title: "Classification metrics: accuracy is not enough",
      body: `
<p>Our model's accuracy is 80.7%. Is that good? Let us check: of the 150 subscribers in test, 39 left (26%). A dumb model that says "nobody leaves" gets 111 / 150 = <b>74%</b> accuracy. We beat it by only 7 points. When classes are imbalanced, accuracy misleads.</p>
<h3>Confusion matrix</h3>
<p>In sklearn, <code>confusion_matrix(y_test, pred)</code> is laid out like this:</p>
<table>
<tr><th></th><th>Predicted 0</th><th>Predicted 1</th></tr>
<tr><td><b>Actual 0</b></td><td>TN = 105</td><td>FP = 6</td></tr>
<tr><td><b>Actual 1</b></td><td>FN = 23</td><td>TP = 16</td></tr>
</table>
<ul>
<li><b>Precision</b> = TP / (TP + FP): of those we said "will leave", how many really left.</li>
<li><b>Recall</b> = TP / (TP + FN): of those who really left, how many we found.</li>
<li><b>F1</b> is the harmonic mean of the two: 2·P·R / (P + R).</li>
</ul>
<h3>Step-by-step example</h3>
<ol>
<li>Precision = 16 / (16 + 6) = 0.727. When we raise an alert, we are right 73% of the time.</li>
<li>Recall = 16 / (16 + 23) = 0.41. We missed 59% of the leavers!</li>
<li>F1 = 2 · 0.727 · 0.41 / (0.727 + 0.41) ≈ 0.525.</li>
<li>If we lower the threshold to 0.3: TP = 30, FP = 29, FN = 9. Recall = 0.77, precision = 0.51. We catch more leavers, but also raise more "false alarms".</li>
<li>Which is right is a business decision: if offering a subscriber a discount is cheap and losing them is expensive, recall matters more.</li>
</ol>
<h3>ROC AUC</h3>
<p>Precision and recall depend on the threshold. <b>ROC AUC</b> does not: take one random subscriber who left and one who stayed; AUC is the chance the model gives the leaver the higher probability. 0.5 is a coin toss, 1.0 is perfect. Ours is ≈ 0.82.</p>
<pre><code>from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score
pred = clf.predict(X_test)
print(confusion_matrix(y_test, pred))
print(precision_score(y_test, pred), recall_score(y_test, pred), f1_score(y_test, pred))
print(roc_auc_score(y_test, proba))   # probabilities, not 0/1!</code></pre>
<h3>Common mistakes</h3>
<ul>
<li>Looking only at accuracy on imbalanced data. Always compare with the baseline.</li>
<li>Swapping the argument order: <code>(y_true, y_pred)</code>, not the reverse. Otherwise precision and recall swap places.</li>
<li>Passing 0/1 predictions to <code>roc_auc_score</code>: AUC loses its meaning.</li>
</ul>`,
      ex: [
        { prompt: "Without sklearn, by hand: count <code>tp</code>, <code>fp</code>, <code>fn</code>, <code>tn</code> and compute <code>precision</code> and <code>recall</code>.", hints: ["TP: actual 1, predicted 1. FP: actual 0, predicted 1. FN: actual 1, predicted 0.","<code>list(zip(y_true, y_pred)).count((1, 1))</code>"], check: {"tests":"assert (tp, fp, fn, tn) == (3, 1, 2, 4), 'It should be tp=3, fp=1, fn=2, tn=4: count each (actual, predicted) pair'\nassert abs(precision - 0.75) < 1e-9, 'precision = tp / (tp + fp) = 0.75'\nassert abs(recall - 0.6) < 1e-9, 'recall = tp / (tp + fn) = 0.6'"} },
        { prompt: "The model is ready. From <code>pred = clf.predict(X_test)</code> compute <code>cm</code> (confusion matrix), <code>prec</code>, <code>rec</code>, <code>f1</code>. Compute <code>auc</code> from <code>proba</code>. Print everything.", hints: ["Every metric: <code>(y_test, pred)</code>","<code>roc_auc_score(y_test, proba)</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_pr = _m.predict(_Xte)\nassert _np.asarray(cm).shape == (2, 2) and _np.asarray(cm).sum() == 150, 'cm is a 2×2 matrix that sums to 150'\nassert _np.asarray(cm)[1, 1] == _mt.confusion_matrix(_yte, _pr)[1, 1], 'cm[1, 1] (TP) does not match: confusion_matrix(y_test, pred)'\nassert abs(prec - _mt.precision_score(_yte, _pr)) < 0.02, f'prec ≈ {_mt.precision_score(_yte, _pr):.3f}. Argument order: (y_test, pred)'\nassert abs(rec - _mt.recall_score(_yte, _pr)) < 0.02, f'rec ≈ {_mt.recall_score(_yte, _pr):.3f}'\nassert abs(f1 - _mt.f1_score(_yte, _pr)) < 0.02, f'f1 ≈ {_mt.f1_score(_yte, _pr):.3f}'\nassert abs(auc - _mt.roc_auc_score(_yte, _p)) < 0.02, f'auc ≈ {_mt.roc_auc_score(_yte, _p):.3f}. Pass proba to roc_auc_score, not pred'"} },
        { prompt: "Confusion matrix: TN = 82, FP = 29, FN = 9, TP = 30. What is the recall? (to three decimals)", explain: "Recall = TP / (TP + FN) = 30 / 39 ≈ 0.769." }
      ]
    },
    "ml-9": {
      title: "Decision trees: depth and overfitting",
      body: `
<p>A <b>decision tree</b> is a chain of yes/no questions, like the game "20 questions". On our churn training data a tree of depth 2 found this:</p>
<pre><code>tenure_months &lt;= 26.5 ?
├─ yes → has_contract == 0 ?
│        ├─ yes → leaves  (63 left / 107)
│        └─ no → stays    (22 / 74)
└─ no → support_calls &lt;= 2.5 ?
         ├─ yes → stays   (17 / 221)
         └─ no → stays    (14 / 48)</code></pre>
<p>At each step the tree picks the question (feature and threshold) that best separates the classes. Purity is measured with the Gini index, but the intuition is simple: after the split, one class should dominate each group.</p>
<h3>Depth = complexity</h3>
<p><code>max_depth</code> is the longest chain of questions. If we do not limit it, the tree makes a separate leaf for every subscriber and memorises the training data completely.</p>
<h3>Step-by-step example</h3>
<pre><code>from sklearn.tree import DecisionTreeClassifier
for d in [1, 2, 3, 5, 8, None]:
    tree = DecisionTreeClassifier(max_depth=d, random_state=0)
    tree.fit(X_train, y_train)
    print(d, tree.score(X_train, y_train), tree.score(X_test, y_test))</code></pre>
<table>
<tr><th>max_depth</th><th>train</th><th>test</th></tr>
<tr><td>1</td><td>0.742</td><td>0.740</td></tr>
<tr><td>2</td><td>0.784</td><td>0.800</td></tr>
<tr><td>3</td><td>0.793</td><td>0.807</td></tr>
<tr><td>5</td><td>0.836</td><td>0.780</td></tr>
<tr><td>8</td><td>0.907</td><td>0.720</td></tr>
<tr><td>None</td><td>0.989</td><td>0.687</td></tr>
</table>
<ol>
<li>Depth 1: just one question, the model is too simple (underfitting): both scores are low.</li>
<li>Depth 3: the best on test.</li>
<li>As depth grows, train goes up and test goes <b>down</b>: overfitting.</li>
<li>The unlimited tree gets 99% on train, and on test it is worse even than the "nobody leaves" baseline (74%).</li>
</ol>
<p><code>tree.feature_importances_</code> shows each feature's share in the splits: in the depth-3 tree <code>tenure_months</code> ≈ 0.55, <code>support_calls</code> ≈ 0.24.</p>
<div class="tip">A tree needs no scaling: it only asks "x ≤ threshold?", so units do not matter.</div>
<h3>Common mistakes</h3>
<ul>
<li>Not setting <code>max_depth</code>: by default the tree grows without limit.</li>
<li>Reading <code>feature_importances_</code> as cause or direction: it only says "how useful for splitting".</li>
<li>Choosing the depth by the test result. That "wears out" the test. In the next lesson we choose it properly with cross-validation.</li>
</ul>`,
      ex: [
        { prompt: "Train <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> named <code>tree</code>. Test accuracy → <code>test_acc</code>. Store the name of the most important feature (by <code>feature_importances_</code>) in <code>top_feature</code>.", hints: ["<code>pd.Series(tree.feature_importances_, index=features)</code>","<code>.idxmax()</code> gives the index (name) of the largest value"], check: {"tests":"from sklearn.tree import DecisionTreeClassifier as _DT\nassert isinstance(tree, _DT) and tree.get_depth() <= 3, 'tree is a DecisionTreeClassifier with max_depth=3'\nassert abs(test_acc - 0.807) < 0.02, f'test_acc should be ≈ 0.807, you have {test_acc:.3f}'\nassert top_feature == 'tenure_months', 'The most important feature is a different one: take the name with the largest feature_importances_ value'"} },
        { prompt: "For depths <code>[1, 2, 3, 4, 5, 6, 8, None]</code> train a tree (<code>random_state=0</code>) and store <code>depth: (train_acc, test_acc)</code> in the dict <code>results</code>. Store the depth with the highest test accuracy in <code>best_depth</code>.", hints: ["Loop: <code>for d in [1, 2, 3, 4, 5, 6, 8, None]:</code>","<code>max(results, key=lambda d: results[d][1])</code>"], check: {"tests":"assert set(results) == {1, 2, 3, 4, 5, 6, 8, None}, 'results should hold all 8 depths (None included)'\nassert all(len(v) == 2 for v in results.values()), 'Each value is a (train_acc, test_acc) pair'\nassert results[None][0] > 0.95, 'The unlimited tree should have train accuracy ≈ 0.99: train first, then test'\nassert results[None][1] < results[3][1], 'On test the unlimited tree should be worse than the depth-3 tree'\nassert best_depth == 3, f'best_depth should be 3, you have {best_depth}. Choose by test accuracy (the second element)'"} },
        { prompt: "A tree scored 0.99 on train and 0.69 on test. What should you do?", options: ["Increase max_depth","Decrease max_depth (make the tree simpler)","Scale the features","Add the test data to train"], explain: "This is overfitting. Limiting the depth makes the model simpler. Scaling has no effect on a tree, and adding test to train breaks the evaluation." }
      ]
    },
    "ml-10": {
      title: "Cross-validation and the bias-variance trade-off",
      body: `
<p>One train/test split is just one exam. If "easy" subscribers land in test, the model looks better than it really is. On top of that, if we choose the depth by looking at test, the test is no longer fair.</p>
<h3>K-fold cross-validation</h3>
<p>We split the data into 5 equal parts (folds). 5 times: train on 4 parts, score on the remaining 1. Every subscriber is in test exactly once. The result is 5 scores, summarised as <b>mean ± SD</b>.</p>
<pre><code>from sklearn.model_selection import cross_val_score
scores = cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=0),
                         X, y, cv=5)
print(scores)                       # [0.742 0.742 0.833 0.767 0.808]
print(scores.mean(), scores.std())  # 0.778 0.037</code></pre>
<p>For a classifier, <code>cv=5</code> uses a stratified split automatically. SD is stability: 0.74 in one fold, 0.83 in another, so you should not trust a single split to better than ±4 points.</p>
<h3>Step-by-step example: choosing the depth</h3>
<table>
<tr><th>max_depth</th><th>CV mean</th><th>SD</th></tr>
<tr><td>2</td><td>0.772</td><td>0.039</td></tr>
<tr><td>3</td><td>0.778</td><td>0.037</td></tr>
<tr><td>5</td><td>0.758</td><td>0.015</td></tr>
<tr><td>None</td><td>0.715</td><td>0.038</td></tr>
</table>
<ol>
<li>For each depth, <code>cross_val_score</code> (on the whole X, y).</li>
<li>We pick the highest mean: 3.</li>
<li>The gap between 0.772 and 0.778 is much smaller than the SD. In reality 2 and 3 are equally good, and you can take the simpler one.</li>
</ol>
<h3>Bias-variance trade-off</h3>
<ul>
<li><b>High bias</b> (underfitting): the model is too simple, bad on both train and test. Depth 1.</li>
<li><b>High variance</b> (overfitting): great on train, bad on test, and a small change in the data changes the result a lot. The unlimited tree.</li>
<li>The goal is the middle: choose the complexity where CV is best.</li>
</ul>
<h3>Scaling and Pipeline</h3>
<p>Fitting the scaler on all the data before CV is leakage. <code>make_pipeline(StandardScaler(), LogisticRegression())</code> acts as one model, so in every fold the scaler is fit only on that fold's train part. Logistic regression: CV 0.790 ± 0.033.</p>
<h3>Common mistakes</h3>
<ul>
<li>Reporting only the mean and forgetting the SD.</li>
<li>Scaling all the data before CV.</li>
<li>A very large <code>cv</code> (for example, 50): slow, and each fold is too small.</li>
<li>After choosing the depth with CV, forgetting to retrain the final model on all the training data.</li>
</ul>`,
      ex: [
        { prompt: "Run <code>cross_val_score</code> for <code>make_pipeline(StandardScaler(), LogisticRegression())</code> with <code>cv=5</code> on the whole <code>X</code>, <code>y</code>. Store the result in <code>scores</code>, the mean in <code>cv_mean</code> and the SD in <code>cv_std</code>, and print them.", hints: ["<code>pipe = make_pipeline(StandardScaler(), LogisticRegression())</code>","<code>cross_val_score(pipe, X, y, cv=5)</code>"], check: {"tests":"import numpy as _np\nassert len(scores) == 5, 'cv=5: there should be 5 scores'\nassert abs(cv_mean - _np.mean(scores)) < 1e-9 and abs(cv_std - _np.std(scores)) < 1e-9, 'cv_mean = scores.mean(), cv_std = scores.std()'\nassert abs(cv_mean - 0.79) < 0.02, f'cv_mean should be ≈ 0.79, you have {cv_mean:.3f}. Did you score the Pipeline on the whole X, y with cv=5?'"} },
        { prompt: "For depths <code>[1, 2, 3, 4, 5, None]</code> store the 5-fold CV mean of <code>DecisionTreeClassifier(max_depth=d, random_state=0)</code> in the dict <code>cv_means</code>. Store the best depth in <code>best_depth</code>.", hints: ["<code>cross_val_score(DecisionTreeClassifier(max_depth=d, random_state=0), X, y, cv=5).mean()</code>","<code>max(cv_means, key=cv_means.get)</code>"], check: {"tests":"from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.tree import DecisionTreeClassifier as _DT\nassert set(cv_means) == {1, 2, 3, 4, 5, None}, 'cv_means should hold 6 depths (None included)'\n_ref = {d: _cvs(_DT(max_depth=d, random_state=0), X, y, cv=5).mean() for d in [1, 2, 3, 4, 5, None]}\nassert all(abs(cv_means[d] - _ref[d]) < 0.01 for d in _ref), 'CV means do not match: cv=5, random_state=0, the whole X, y'\nassert best_depth == max(_ref, key=_ref.get), f'best_depth should be {max(_ref, key=_ref.get)}: the depth with the largest CV mean'\nassert cv_means[None] < cv_means[best_depth], 'The unlimited tree should have a lower CV score than the best one'"} },
        { prompt: "A model has train accuracy 0.74, CV accuracy 0.74, and the \"nobody leaves\" baseline is also 0.74. What is this?", options: ["High variance (overfitting)","High bias (underfitting): the model is too simple","A great model","Data leakage"], explain: "Both train and CV are at baseline level: the model failed to capture the pattern. You need a more complex model or better features." }
      ]
    },
    "ml-gate": {
      title: "Module exam: ML Foundations",
      body: `
<p>The final check: regression, classification and model selection. In every task use the given <code>random_state</code> and train the model on train only. No hints.</p>`,
      ex: [
        { prompt: "A flat price model. Build <code>X</code> from <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> and one-hot <code>district</code> (<code>drop_first=True</code>, <code>dtype=int</code>), with <code>y = price_mln</code>. Split with <code>test_size=0.2</code>, <code>random_state=42</code> and train a <code>LinearRegression</code> named <code>model</code>. Compute <code>test_mae</code> and <code>test_r2</code> on test.", hints: [], check: {"tests":"assert hasattr(model, 'coef_') and model.n_features_in_ == 8, 'model should be fitted on 8 features: 3 numeric + 5 district columns'\nassert len(X_test) == 80, 'Test should have 80 rows'\nassert abs(test_r2 - 0.911) < 0.01, f'test_r2 should be ≈ 0.911, you have {test_r2:.3f}'\nassert abs(test_mae - 3.83) < 0.1, f'test_mae should be ≈ 3.83, you have {test_mae:.2f}'"} },
        { prompt: "The retention team asks to find at least 70% of leavers (recall ≥ 0.70), while at least 45% of alerts must be correct (precision ≥ 0.45). The split is ready. Train a model, choose a threshold and store the 0/1 test prediction in <code>pred</code>. Compute and print <code>rec</code> and <code>prec</code>.", hints: [], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\nassert len(pred) == 150, 'pred is for the 150 subscribers in test'\nassert list(y_test.index) == list(_yte.index), 'Do not change the split'\n_r = _mt.recall_score(_yte, _np.asarray(pred))\n_q = _mt.precision_score(_yte, _np.asarray(pred), zero_division=0)\nassert _r >= 0.70, f'Recall {_r:.3f}, at least 0.70 is needed: lower the threshold'\nassert _q >= 0.45, f'Precision {_q:.3f}, at least 0.45 is needed: you lowered the threshold too far'\nassert abs(rec - _r) < 1e-9 and abs(prec - _q) < 1e-9, 'rec, prec — recall_score(y_test, pred), precision_score(y_test, pred)'"} },
        { prompt: "Choose the best k for a KNN classifier. For each k in <code>[3, 5, 9, 15, 25]</code> store the mean 5-fold CV accuracy of <code>make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))</code> in the dict <code>cv_scores</code>. Best k → <code>best_k</code>.", hints: [], check: {"tests":"from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.neighbors import KNeighborsClassifier as _KNC\nassert set(cv_scores) == {3, 5, 9, 15, 25}, 'cv_scores should hold 5 values of k'\n_ref = {k: _cvs(_mp(_SS(), _KNC(n_neighbors=k)), X, y, cv=5).mean() for k in [3, 5, 9, 15, 25]}\nassert all(abs(cv_scores[k] - _ref[k]) < 0.005 for k in _ref), 'CV results do not match: scaler inside the pipeline, cv=5'\nassert best_k == max(_ref, key=_ref.get), f'best_k should be {max(_ref, key=_ref.get)}'"} },
        { prompt: "A churn model (26% leavers) gave accuracy = 0.74 and recall = 0 on test. What happened?", options: ["The model is great, accuracy is high","The model tells everyone \"will not leave\": it is just the baseline","Overfitting","No scaling is needed"], explain: "Recall = 0 means not a single leaver was found. 74% accuracy is exactly the \"nobody leaves\" baseline." },
        { prompt: "Confusion matrix: TN = 105, FP = 6, FN = 23, TP = 16. What is the precision? (to three decimals)", explain: "Precision = TP / (TP + FP) = 16 / 22 ≈ 0.727." }
      ]
    }
  }
});
