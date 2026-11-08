// M5.2 ML in Practice: Russian text. Code, solutions and expected output are in content/mlpractice.js.
DJ.i18n.patch({
  modules: {
    "m5-2": { intro: "В реальной работе важна не сама модель, а всё вокруг неё: подготовка данных, защита от утечки (leakage), подбор гиперпараметров, сильные ансамбли, несбалансированные классы, кластеризация и интерпретация модели. Всё это вы сделаете на данных churn.csv и flats.csv с помощью scikit-learn." }
  },
  lessons: {
    "mp-1": {
      title: "Pipeline и ColumnTransformer",
      body: `
<p>В M5.1 мы давали модели готовую числовую таблицу. Реальный churn.csv не такой: <code>city</code> и <code>plan</code> — текст, в <code>age</code> 25 пропусков, в <code>data_gb</code> 17, а <code>monthly_fee</code> измеряется тысячами, <code>support_calls</code> — единицами. Перед подачей в модель нужны три вещи: заполнить пропуски, превратить текст в числа, выровнять масштаб.</p>
<p>Это можно сделать вручную, но каждый шаг нужно обучать (<code>fit</code>) на train, а на test делать только <code>transform</code> — легко запутаться. <b>Pipeline</b> — это конвейер: вы перечисляете шаги по порядку и запускаете всё одним <code>fit</code>/<code>predict</code>. <b>ColumnTransformer</b> назначает каждой группе столбцов свою обработку.</p>
<h3>Пример по шагам</h3>
<ol>
<li>Числовые столбцы: заполнение медианой (<code>SimpleImputer</code>), затем <code>StandardScaler</code>.</li>
<li>Категориальные столбцы: <code>OneHotEncoder</code> — <code>plan</code> превращается в три столбца (basic, premium, standard).</li>
<li>В конце — модель.</li>
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
model.fit(X_train, y_train)      # всё обучается только на train
model.score(X_test, y_test)      # ≈ 0.78</code></pre>
<p>В результате получается 6 числовых + 5 городов + 3 тарифа = 14 столбцов. <code>pre.get_feature_names_out()</code> возвращает их названия: <code>num__age</code>, <code>cat__city_Алматы</code> и т. д.</p>
<table>
<tr><th>Шаг</th><th>fit (train)</th><th>transform (test)</th></tr>
<tr><td>SimpleImputer</td><td>запоминает медиану train</td><td>заполняет той же медианой</td></tr>
<tr><td>StandardScaler</td><td>среднее и SD train</td><td>масштабирует теми же числами</td></tr>
<tr><td>OneHotEncoder</td><td>список категорий</td><td>0/1 по тому же списку</td></tr>
</table>
<div class="tip"><b>Частые ошибки:</b> (1) Подавать <code>customer_id</code> как признак — он ничего не означает. (2) Не писать <code>handle_unknown='ignore'</code>: если в test встретится новый город, будет ошибка. (3) Обучать Pipeline на всех данных — это leakage из следующего урока. (4) Вызывать <code>fit_transform</code> на test.</div>`,
      ex: [
        { prompt: "Создайте ColumnTransformer <code>pre</code>: для столбцов <code>num</code> — Pipeline (SimpleImputer(strategy='median') → StandardScaler), для столбцов <code>cat</code> — <code>OneHotEncoder(handle_unknown='ignore')</code>. Затем <code>Xt = pre.fit_transform(X)</code> и <code>print(Xt.shape)</code>.", hints: ["Сначала <code>num_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])</code>.","<code>ColumnTransformer([('num', num_pipe, num), ('cat', OneHotEncoder(handle_unknown='ignore'), cat)])</code>"], check: {"tests":"import numpy as _np\nfrom sklearn.compose import ColumnTransformer as _CT\nassert isinstance(pre, _CT), 'pre должен быть ColumnTransformer'\n_A = _np.asarray(Xt.toarray() if hasattr(Xt, 'toarray') else Xt, dtype=float)\nassert _A.shape == (600, 14), f'Форма Xt должна быть (600, 14): 6 числовых + 5 городов + 3 тарифа. У вас {_A.shape}'\nassert not _np.isnan(_A).any(), 'В Xt остались NaN: добавьте SimpleImputer для числовых столбцов'\nassert _np.allclose(_A[:, :6].mean(axis=0), 0, atol=1e-6), 'Первые 6 столбцов после StandardScaler должны иметь среднее 0'"} },
        { prompt: "Объедините готовый <code>pre</code> и <code>LogisticRegression(max_iter=1000)</code> в один <code>Pipeline</code> и запишите его в переменную <code>model</code>. Обучите на <code>X_train</code>, запишите test accuracy в <code>acc</code> и выведите её.", hints: ["<code>Pipeline([('pre', pre), ('clf', LogisticRegression(max_iter=1000))])</code>","В Pipeline подаётся сырой <code>X_train</code>: заполнение и кодирование он делает сам."], check: {"tests":"from sklearn.pipeline import Pipeline as _P\nfrom sklearn.linear_model import LogisticRegression as _LR\nassert isinstance(model, _P), 'model должен быть Pipeline'\nassert isinstance(model.steps[-1][1], _LR), 'Последний шаг Pipeline должен быть LogisticRegression'\nassert hasattr(model.steps[-1][1], 'coef_'), 'Вызовите model.fit(X_train, y_train)'\nassert abs(acc - model.score(X_test, y_test)) < 1e-9, 'Должно быть acc = model.score(X_test, y_test)'\nassert 0.7 < acc < 0.9, f'accuracy должна быть около 0.78, у вас {acc:.3f}'"} },
        { prompt: "Зачем передавать в OneHotEncoder <code>handle_unknown='ignore'</code>?", options: ["Чтобы модель обучалась быстрее","Чтобы при появлении в новых данных категории, которой не было в train (например, нового города), не было ошибки, а все её столбцы стали 0","Чтобы заполнить пропуски","Чтобы удалить редкие категории"], explain: "В production может прийти новый город, например «Туркестан». С ignore он получит 0 во всех столбцах городов, и модель не упадёт." }
      ]
    },
    "mp-2": {
      title: "Data leakage: когда модель обманывает",
      body: `
<p><b>Data leakage</b> (утечка данных) — модель при обучении видит информацию, которая на самом деле недоступна в момент прогноза. Итог: на тесте отлично, в production слабо. Это одна из самых дорогих ошибок в ML, потому что метрика её скрывает.</p>
<h3>Три вида</h3>
<ul>
<li><b>Preprocessing leakage</b>: обучать scaler, imputer или отбор признаков на всех данных <i>до</i> split. Среднее и медиана test «утекают» в train.</li>
<li><b>Target leakage</b>: признак становится известен только после результата. В churn это «последний счёт не оплачен» или «штраф за расторжение договора» — они появляются после ухода клиента. В flats <code>price_per_m2</code> вычислен из самой цены.</li>
<li><b>Time leakage</b>: случайное разбиение данных, упорядоченных по времени. Предсказывать февраль по мартовским данным — значит видеть будущее. Нужно обучать на старом периоде и проверять на новом (<code>TimeSeriesSplit</code>).</li>
</ul>
<h3>Пример по шагам: «78%» из случайного шума</h3>
<p>100 строк, 2000 случайных признаков, случайный y. Истинная точность должна быть ≈ 50%.</p>
<pre><code>rng = np.random.default_rng(0)
X = rng.normal(size=(100, 2000))
y = rng.integers(0, 2, 100)

# НЕВЕРНО: отбираем признаки на всех данных, потом CV
Xs = SelectKBest(f_classif, k=20).fit_transform(X, y)
cross_val_score(LogisticRegression(), Xs, y, cv=5).mean()    # ≈ 0.78

# ВЕРНО: отбор внутри Pipeline, в каждом fold только на train
pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())
cross_val_score(pipe, X, y, cv=5).mean()                      # ≈ 0.59</code></pre>
<ol>
<li>SelectKBest находит среди 2000 признаков 20 с самой сильной <i>случайной</i> связью с y — глядя в том числе на строки test.</li>
<li>CV видит эти признаки «полезными»: 78%.</li>
<li>Внутри Pipeline отбор идёт только на train-части каждого fold — и получается правда: чуть выше случайного.</li>
</ol>
<p>Утечка от scaler обычно небольшая, но принцип тот же: <b>каждый шаг, который учится на данных, — внутри Pipeline</b>.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Делать <code>df.fillna(df.mean())</code> до split. (2) Радоваться «слишком хорошему» результату: если AUC 0.99, сначала ищите leakage. (3) Не спрашивать для каждого признака: «известен ли он в момент прогноза?». (4) Разносить несколько строк одного клиента по train и test.</div>`,
      ex: [
        { prompt: "В стартере есть <code>leaky</code>, посчитанный с утечкой. На тех же данных вычислите честную CV accuracy через <code>make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())</code> и запишите её в <code>honest</code> (cv=5). Выведите оба значения.", hints: ["<code>pipe = make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression())</code>","В CV подаётся исходный <code>X</code>, а не <code>Xs</code>: <code>cross_val_score(pipe, X, y, cv=5).mean()</code>"], check: {"tests":"assert honest is not None, 'Вычислите honest'\nassert 0 <= float(honest) <= 1, 'honest — это accuracy (от 0 до 1)'\nassert float(honest) < 0.7, f'Честный результат должен быть близок к случайному (≈0.59), у вас {honest:.2f}. SelectKBest внутри Pipeline и CV на исходном X?'\nassert leaky - honest > 0.1, 'Между leaky и honest должна быть большая разница'"} },
        { prompt: "В стартере к данным churn добавлен столбец <code>final_bill_unpaid</code> (заполняется после ухода клиента). Запишите абсолютную корреляцию каждого признака с <code>churned</code> в Series <code>corrs</code>, а название самого сильного — в <code>leaky_col</code>. Затем постройте <code>X_clean</code> без этого столбца и запишите test accuracy LogisticRegression в <code>acc_clean</code>.", hints: ["<code>corrs = df[cols].corrwith(y).abs()</code>, <code>leaky_col = corrs.idxmax()</code>","Есть пропуски, поэтому <code>make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))</code>."], check: {"tests":"import pandas as _pd\nassert isinstance(corrs, _pd.Series), 'corrs должен быть Series (df[cols].corrwith(y).abs())'\nassert leaky_col == 'final_bill_unpaid', 'Самая сильная корреляция у final_bill_unpaid: он появляется после результата'\nassert 'final_bill_unpaid' not in list(X_clean.columns), 'Из X_clean нужно убрать final_bill_unpaid'\nassert X_clean.shape[1] == 6, 'В X_clean должно остаться 6 признаков'\nassert 0.65 < acc_clean < 0.9, f'accuracy чистой модели должна быть реалистичной (≈0.78), у вас {acc_clean:.3f}'"} },
        { prompt: "Магазин прогнозирует ежедневные продажи за 2023–2025 годы. Аналитик случайно перемешал все дни, сделал train_test_split и получил R² = 0.95. Что не так?", options: ["Ничего: если R² высокий, модель хорошая","Time leakage: модель учится на будущих днях и предсказывает прошлое. Нужно обучать на старом периоде и проверять на последних месяцах","Слишком маленький test_size","Не хватает scaler"], explain: "Во временных данных train всегда должен идти раньше test (или используйте TimeSeriesSplit). Иначе модель заранее видит «завтрашние» значения." }
      ]
    },
    "mp-3": {
      title: "Feature engineering: создаём новые признаки",
      body: `
<p><b>Feature engineering</b> — создание из имеющихся столбцов новых признаков, полезных модели. Модель видит только то, что ей дали: понятие «последний этаж» она может сама не вывести из <code>floor</code> и <code>floors_total</code>. Вы знаете предметную область — и превращаете это знание в числа.</p>
<h3>Четыре основных приёма</h3>
<ul>
<li><b>Отношение</b> (ratio): <code>floor / floors_total</code>, <code>area_m2 / rooms</code>, в churn — <code>support_calls / (tenure_months / 12)</code>, число звонков в год.</li>
<li><b>Bin</b> (группировка): <code>pd.cut</code> делит непрерывное число на интервалы. Так линейная модель видит скачок вида «первые 6 месяцев опасны».</li>
<li><b>Interaction</b> (взаимодействие): произведение двух признаков. В Медеу 1 м² дороже, чем в Алатау, поэтому <code>area_m2 × district</code>.</li>
<li><b>Части даты</b>: <code>pd.to_datetime</code>, затем <code>.dt.month</code>, <code>.dt.dayofweek</code>, выходной ли день.</li>
</ul>
<h3>Пример по шагам</h3>
<p>1) В churn сгруппируем срок жизни клиента:</p>
<pre><code>df['tenure_bin'] = pd.cut(df['tenure_months'], bins=[0, 6, 12, 24, 48, 100],
                          labels=['0-6', '7-12', '13-24', '25-48', '49+'])
df.groupby('tenure_bin', observed=True)['churned'].mean()</code></pre>
<table>
<tr><th>tenure_bin</th><th>0-6</th><th>7-12</th><th>13-24</th><th>25-48</th><th>49+</th></tr>
<tr><td>churn rate</td><td>0.62</td><td>0.53</td><td>0.41</td><td>0.16</td><td>0.10</td></tr>
</table>
<p>Больше половины новых клиентов уходят — сильный сигнал.</p>
<p>2) В flats 5-fold R² у LinearRegression: только с числовыми столбцами 0.66, с one-hot district 0.91, а с interaction <code>area_m2 × каждый district</code> — 0.94. Одна идея из предметной области — +3 пункта.</p>
<p>3) Части даты:</p>
<pre><code>d = pd.to_datetime(pd.Series(['2025-03-08', '2025-03-10']))
d.dt.month        # 3, 3
d.dt.dayofweek    # 5 (суббота), 0 (понедельник)</code></pre>
<p>Саму дату (2025-03-08) подавать в модель нельзя: это не число, а если подать её как timestamp, модель будет опираться на ложный тренд «со временем». Месяц, день недели, праздник ли — это ловит повторяющиеся закономерности. Проверяйте каждый новый признак через CV: если пользы нет, удаляйте его, потому что лишний признак добавляет шум.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Строить признак из таргета: <code>price_per_m2 = price_mln / area_m2</code> — это сама цена, leakage. (2) Деление на ноль: если <code>tenure_months</code> равен 0, отношение даёт inf. (3) Выбирать границы bin, глядя на test. (4) Считать признак на train одной формулой, а в production другой — поэтому кладите его в функцию или в Pipeline.</div>`,
      ex: [
        { prompt: "Добавьте в <code>flats</code> четыре столбца: <code>age</code> = 2024 − year_built; <code>floor_ratio</code> = floor / floors_total; <code>is_last</code> = 1, если этаж последний, иначе 0 (int); <code>area_per_room</code> = area_m2 / rooms. Затем запишите среднюю цену квартир на последнем этаже в <code>last_price</code>.", hints: ["<code>(flats['floor'] == flats['floors_total']).astype(int)</code>","<code>flats.loc[flats['is_last'] == 1, 'price_mln'].mean()</code>"], check: {"tests":"import pandas as _pd\n_f = _pd.read_csv('flats.csv')\nfor _c in ['age', 'floor_ratio', 'is_last', 'area_per_room']:\n    assert _c in flats.columns, f'Нет столбца {_c}'\nassert (flats['age'] == 2024 - _f['year_built']).all(), 'age = 2024 - year_built'\nassert ((flats['floor_ratio'] - _f['floor'] / _f['floors_total']).abs() < 1e-9).all(), 'floor_ratio = floor / floors_total'\nassert set(flats['is_last'].unique()) <= {0, 1} and int(flats['is_last'].sum()) == int((_f['floor'] == _f['floors_total']).sum()), 'is_last: 1, если floor == floors_total'\nassert ((flats['area_per_room'] - _f['area_m2'] / _f['rooms']).abs() < 1e-9).all(), 'area_per_room = area_m2 / rooms'\nassert abs(last_price - _f.loc[_f['floor'] == _f['floors_total'], 'price_mln'].mean()) < 1e-6, 'last_price — средняя price_mln квартир с is_last == 1'"} },
        { prompt: "В churn создайте столбец <code>tenure_bin</code> через <code>pd.cut</code>: bins=[0, 6, 12, 24, 48, 100], labels=['0-6', '7-12', '13-24', '25-48', '49+']. Запишите churn rate каждой группы в Series <code>rate</code> (groupby, observed=True) и выведите.", hints: ["<code>pd.cut(df['tenure_months'], bins=[...], labels=[...])</code>","<code>df.groupby('tenure_bin', observed=True)['churned'].mean()</code>"], check: {"tests":"assert rate is not None and len(rate) == 5, 'В rate должно быть 5 групп'\nassert 'tenure_bin' in df.columns, 'Добавьте в df столбец tenure_bin'\nassert [str(i) for i in rate.index] == ['0-6', '7-12', '13-24', '25-48', '49+'], 'Названия групп должны совпадать с labels'\nassert abs(rate['0-6'] - 0.6154) < 0.005, f'churn rate группы 0-6 месяцев ≈ 0.62, у вас {rate.iloc[0]:.3f}'\nassert abs(rate['49+'] - 0.1036) < 0.005, 'churn rate группы 49+ ≈ 0.10'\nassert all(rate.values[i] > rate.values[i + 1] for i in range(4)), 'С ростом срока churn rate должен снижаться'"} },
        { prompt: "Вы добавили в модель flats признак <code>price_per_m2 = price_mln / area_m2</code>, и R² вырос до 0.99. Как вы это оцените?", options: ["Отличный feature engineering","Target leakage: признак вычислен из самой цены, для новой квартиры его значение неизвестно","Признак-взаимодействие, всё правильно","Нужно только масштабирование"], explain: "Цену новой квартиры мы не знаем, значит, не знаем и price_per_m2. Такой признак лишь обманывает тест. (А средняя цена м² по району, посчитанная по train, — это другой разговор.)" }
      ]
    },
    "mp-4": {
      title: "GridSearchCV: подбор гиперпараметров",
      body: `
<p><b>Параметры</b> (коэффициенты, разбиения дерева) модель выучивает сама во время <code>fit</code>. <b>Гиперпараметры</b> (<code>C</code>, <code>max_depth</code>, <code>n_estimators</code>) мы задаём заранее. Как их выбрать? Проверить каждый вариант и взять лучший. Но <i>на чём</i> проверять?</p>
<h3>Три выборки</h3>
<table>
<tr><th>Выборка</th><th>Для чего</th><th>Сколько раз используем</th></tr>
<tr><td>Train</td><td>Модель учится</td><td>Много</td></tr>
<tr><td>Validation</td><td>Выбираем гиперпараметры</td><td>Много</td></tr>
<tr><td>Test</td><td>Финальная честная оценка</td><td><b>Один раз</b></td></tr>
</table>
<p>Если выбирать гиперпараметры по test, test тоже участвует в «обучении», и его оценка становится оптимистичной. Роль validation чаще всего выполняет cross-validation: train делится на 5 частей, и они по очереди служат проверкой.</p>
<p><b>GridSearchCV</b> полностью перебирает сетку: каждая комбинация × каждый fold. Найдя лучшую, он заново обучает её на всём train (<code>refit=True</code>).</p>
<h3>Пример по шагам</h3>
<pre><code>from sklearn.model_selection import GridSearchCV
pipe = Pipeline([('pre', pre), ('model', LogisticRegression(max_iter=1000))])
grid = GridSearchCV(pipe, {'model__C': [0.01, 0.1, 1, 10]},
                    cv=5, scoring='roc_auc')
grid.fit(X_train, y_train)
grid.best_params_          # {'model__C': 0.1}
grid.best_score_           # ≈ 0.817 (CV, внутри train)
grid.score(X_test, y_test) # ≈ 0.804 (test, один раз)</code></pre>
<ol>
<li>Имя параметра внутри Pipeline: <code>имя_шага__параметр</code> (два подчёркивания).</li>
<li>4 значения × 5 fold = 20 fit, плюс 1 refit.</li>
<li><code>best_score_</code> немного выше test — это нормально: мы выбрали самый удачный из многих вариантов.</li>
</ol>
<p>Почему это важно? Если сравнить 50 вариантов на test и выбрать лучший, мы выберем и случайную удачу: оценка на test будет не реальной, а оптимистичной. Test — это сейф: его открывают один раз, в самом конце.</p>
<p>Сетка растёт быстро: 3 параметра × 4 значения = 64 комбинации × 5 fold = 320 fit. Поэтому сначала берут широкую редкую сетку, а затем плотную — в хорошей области.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Писать <code>'C'</code> — в Pipeline нужно <code>'model__C'</code>. (2) Запускать GridSearch на всём X, а потом выделять test из тех же данных. (3) Считать <code>best_score_</code> финальным результатом. (4) Большая сетка: в браузере каждый fit занимает время.</div>`,
      ex: [
        { prompt: "Создайте GridSearchCV для Pipeline <code>pre</code> + <code>LogisticRegression(max_iter=1000)</code> (имя шага <code>'model'</code>): <code>C</code> ∈ [0.01, 0.1, 1, 10], cv=5, scoring='roc_auc'. Обучите на train и выведите <code>best_C</code> и <code>test_auc = grid.score(X_test, y_test)</code>.", hints: ["Сетка: <code>{'model__C': [0.01, 0.1, 1, 10]}</code>","<code>best_C = grid.best_params_['model__C']</code>"], check: {"tests":"from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G), 'grid должен быть GridSearchCV'\nassert hasattr(grid, 'best_params_'), 'Вызовите grid.fit(X_train, y_train)'\nassert len(grid.cv_results_['params']) == 4, 'В сетке должно быть 4 значения C'\nassert grid.scoring == 'roc_auc', 'Передайте scoring=\\'roc_auc\\''\nassert best_C in [0.01, 0.1, 1, 10], 'best_C должно быть одним из значений сетки'\nassert abs(test_auc - grid.score(X_test, y_test)) < 1e-9, 'test_auc = grid.score(X_test, y_test)'\nassert 0.7 < test_auc < 0.9, f'test AUC должен быть ≈ 0.80, у вас {test_auc:.3f}'"} },
        { prompt: "Без GridSearch, вручную: ещё раз разделите <code>X_train</code> (<code>X_tr, X_val</code>, test_size=0.25, random_state=0, stratify) и запишите validation accuracy DecisionTreeClassifier для <code>max_depth</code> ∈ [2, 3, 4, 6, 10] в словарь <code>val_scores</code> (ключ — depth). Лучшую глубину запишите в <code>best_depth</code>. Затем обучите модель с этой глубиной на всём X_train и один раз посчитайте test accuracy в <code>test_acc</code>.", hints: ["<code>X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.25, random_state=0, stratify=y_train)</code>","<code>best_depth = max(val_scores, key=val_scores.get)</code>"], check: {"tests":"assert sorted(val_scores) == [2, 3, 4, 6, 10], 'Ключи val_scores: 2, 3, 4, 6, 10'\nassert all(0.5 < v <= 1 for v in val_scores.values()), 'В val_scores должны быть значения accuracy'\nassert best_depth == max(val_scores, key=val_scores.get), 'best_depth — depth с самой высокой validation accuracy'\nassert 'X_val' in dir() and len(X_val) == 113, 'Разделите X_train на X_tr и X_val (test_size=0.25): в X_val 113 строк'\nassert 0.6 < test_acc < 0.9, f'test_acc должна быть реалистичной, у вас {test_acc}'"} },
        { prompt: "Сетка: <code>max_depth</code> — 3 значения, <code>n_estimators</code> — 4 значения, <code>min_samples_leaf</code> — 2 значения. cv=5. Сколько раз GridSearchCV выполнит fit, не считая refit?", explain: "3 × 4 × 2 = 24 комбинации, каждая на 5 fold: 24 × 5 = 120. Плюс в конце один refit лучшей." }
      ]
    },
    "mp-5": {
      title: "Random Forest: почему усреднение помогает",
      body: `
<p>В M5.1 мы видели дерево решений (decision tree): понятное, но <b>неустойчивое</b>. Измените несколько строк данных — и дерево вырастет совсем другим. Глубокое дерево заучивает train — high variance.</p>
<h3>Интуиция: мудрость толпы</h3>
<p>Если один человек угадывает число бобов в банке, его ошибка велика. Среднее по догадкам 100 человек гораздо точнее — случайные ошибки взаимно гасятся. SD среднего из n независимых прогнозов равно σ / √n: 100 прогнозов → ошибка в 10 раз меньше. Условие: ошибки должны быть <b>разными</b>. Среднее 100 одинаковых деревьев — это то же самое одно дерево.</p>
<h3>Как Random Forest делает деревья разными</h3>
<ul>
<li><b>Bootstrap</b>: каждое дерево учится на случайной выборке из train с повторениями (bagging).</li>
<li><b>Случайные признаки</b>: при каждом разбиении рассматривается только часть признаков (<code>max_features</code>, в классификации обычно √p).</li>
<li>Прогноз: среднее вероятностей деревьев.</li>
</ul>
<h3>Пример по шагам: churn, 5-fold ROC AUC</h3>
<pre><code>from sklearn.ensemble import RandomForestClassifier
rf = Pipeline([('pre', pre),
               ('model', RandomForestClassifier(n_estimators=100, random_state=0))])
cross_val_score(rf, X, y, cv=5, scoring='roc_auc').mean()</code></pre>
<table>
<tr><th>Модель</th><th>AUC</th></tr>
<tr><td>Одно дерево (без ограничений)</td><td>0.61</td></tr>
<tr><td>RF, 1 дерево</td><td>0.56</td></tr>
<tr><td>RF, 10 деревьев</td><td>0.73</td></tr>
<tr><td>RF, 50 деревьев</td><td>0.76</td></tr>
<tr><td>RF, 100 деревьев</td><td>0.76</td></tr>
</table>
<ol>
<li>Одно глубокое дерево слабое: оно заучило шум.</li>
<li>С ростом числа деревьев AUC растёт — variance уменьшается.</li>
<li>После 50 рост прекращается: добавление деревьев не вызывает overfitting, а лишь занимает время.</li>
</ol>
<p>Дополнительные плюсы: RF не нужно масштабирование, он устойчив к выбросам (outlier) и мало чувствителен к гиперпараметрам. Поэтому на табличных данных это хорошая «первая сильная модель»: быстро запускаете и сравниваете с LogisticRegression.</p>
<p>Замечание: на этих данных LogisticRegression (0.81) всё ещё лучше — зависимость в основном линейная. Ансамбль не всегда побеждает, сравнивать нужно на практике.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Не задавать <code>random_state</code> — результат меняется при каждом запуске. (2) Думать, что «много деревьев — overfitting»: в RF это не так, но важна глубина каждого дерева (<code>max_depth</code>, <code>min_samples_leaf</code>). (3) n_estimators=1000 в браузере — слишком медленно.</div>`,
      ex: [
        { prompt: "Интуиция усреднения. Истинное значение — 10. 1000 опытов × 50 «деревьев», прогноз каждого — 10 + шум (SD = 3). Запишите SD прогнозов одного дерева в <code>single_sd</code>, а SD среднего 50 деревьев — в <code>avg_sd</code>. Выведите их отношение (≈ √50 ≈ 7.1).", hints: ["Одно дерево: <code>preds[:, 0].std()</code>","Среднее: <code>preds.mean(axis=1).std()</code>"], check: {"tests":"assert 2.7 < single_sd < 3.3, 'single_sd — SD одного столбца (одного дерева), ≈ 3'\nassert 0.35 < avg_sd < 0.5, 'avg_sd — SD среднего по строке (axis=1), ≈ 3/√50 ≈ 0.42'\nassert 5.5 < single_sd / avg_sd < 9, 'Отношение должно быть ≈ √50 ≈ 7.1'"} },
        { prompt: "Поместите один <code>DecisionTreeClassifier(random_state=0)</code> и <code>RandomForestClassifier(n_estimators=100, random_state=0)</code> в Pipeline с <code>pre</code> и посчитайте 5-fold ROC AUC на всех X, y: <code>tree_auc</code>, <code>rf_auc</code> (средние значения).", hints: ["<code>cross_val_score(pipe, X, y, cv=5, scoring='roc_auc').mean()</code>","Два Pipeline: в одном дерево, в другом лес."], check: {"tests":"assert tree_auc is not None and rf_auc is not None, 'Вычислите tree_auc и rf_auc'\nassert 0.5 < tree_auc < 0.7, f'AUC одного дерева ≈ 0.61, у вас {tree_auc:.3f}. scoring=\\'roc_auc\\', cv=5?'\nassert 0.7 < rf_auc < 0.85, f'AUC Random Forest ≈ 0.76, у вас {rf_auc:.3f}'\nassert rf_auc - tree_auc > 0.08, 'Лес должен быть заметно лучше одного дерева'"} },
        { prompt: "Зачем в Random Forest нужен <code>max_features</code> (при каждом разбиении смотреть только на часть признаков)?", options: ["Только чтобы ускорить модель","Чтобы деревья не были похожи друг на друга: если их ошибки разные, усреднение сильнее снижает variance","Чтобы отключить неважные признаки","Чтобы усилить overfitting"], explain: "Если все деревья начинают с одного сильного признака, они получаются похожими. Случайные признаки их декоррелируют, и тогда усреднение действительно помогает." }
      ]
    },
    "mp-6": {
      title: "Gradient boosting: исправляем ошибки по очереди",
      body: `
<p>Random Forest выращивает деревья <b>параллельно</b> и независимо. <b>Boosting</b> — <b>последовательно</b>: каждое новое маленькое дерево исправляет <i>ошибку</i> предыдущих. Это тот же gradient descent из M4.3: каждое дерево — один шаг в направлении антиградиента.</p>
<ul>
<li><code>learning_rate</code> — размер шага: какой вклад вносит каждое дерево.</li>
<li><code>n_estimators</code> — число шагов (число деревьев).</li>
<li><code>max_depth</code> — каждое дерево маленькое (2–3 уровня): «слабый ученик».</li>
</ul>
<h3>Пример по шагам: один шаг вручную</h3>
<p>Цены четырёх квартир: 30, 40, 50, 80 млн.</p>
<ol>
<li>Начальный прогноз — среднее: 50. Остатки (residuals): −20, −10, 0, +30.</li>
<li>Маленькое дерево предсказывает остатки, например: −10 для первых трёх, +30 для последней.</li>
<li><code>learning_rate = 0.1</code>: новый прогноз = 50 + 0.1 · (−10) = 49 (первые три), 50 + 0.1 · 30 = 53 (последняя).</li>
<li>На новых остатках — следующее дерево... Каждый шаг немного уменьшает MSE.</li>
</ol>
<p>Маленький learning_rate — осторожные шаги: нужно много деревьев, но результат устойчив. Большой learning_rate — быстро, но модель заучивает шум.</p>
<h3>На churn (max_depth=2, 5-fold AUC)</h3>
<table>
<tr><th>learning_rate</th><th>50 деревьев</th><th>100 деревьев</th></tr>
<tr><td>0.01</td><td>0.781</td><td>0.790</td></tr>
<tr><td>0.1</td><td><b>0.804</b></td><td>0.787</td></tr>
<tr><td>0.5</td><td>0.748</td><td>0.745</td></tr>
<tr><td>1.0</td><td>0.714</td><td>0.701</td></tr>
</table>
<p>При 0.01 деревьев не хватает (underfit), при 1.0 слишком агрессивно (overfit). Правило: уменьшили learning_rate в 2 раза — увеличьте n_estimators примерно в 2 раза.</p>
<h3>HistGradientBoosting</h3>
<p><code>HistGradientBoostingClassifier</code> раскладывает значения по корзинам гистограммы — на больших данных это намного быстрее. Бонус: он <b>сам обрабатывает NaN</b>, imputer не нужен. Число деревьев здесь называется <code>max_iter</code>. Большинство табличных соревнований на Kaggle выигрывает именно это семейство (XGBoost, LightGBM, CatBoost) — но только после тщательного тюнинга.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Считать boosting «всегда лучшим» — на этих данных LogisticRegression (0.81) всё ещё конкурентоспособна. (2) Изменить learning_rate и оставить n_estimators прежним. (3) Глубокие деревья (max_depth=10) — boosting быстро переобучается. (4) Думать, что деревьям обязателен StandardScaler — на дерево масштаб не влияет.</div>`,
      ex: [
        { prompt: "Сделайте один шаг boosting вручную. <code>x = area_m2</code>, <code>y = price_mln</code>. <code>pred0</code> = среднее y (для всех строк), <code>res</code> = y − pred0. Обучите <code>DecisionTreeRegressor(max_depth=2, random_state=0)</code> на (x, res) и посчитайте <code>pred1 = pred0 + 0.5 * tree.predict(x)</code>. Вычислите <code>mse0</code> и <code>mse1</code>.", hints: ["<code>pred0 = np.full(len(y), y.mean())</code>","Дерево учится не на y, а на <code>res</code>: <code>DecisionTreeRegressor(max_depth=2, random_state=0).fit(x, res)</code>"], check: {"tests":"import numpy as _np\nfrom sklearn.tree import DecisionTreeRegressor as _DT\n_p0 = _np.full(len(y), y.mean())\n_t = _DT(max_depth=2, random_state=0).fit(x, y - _p0)\n_p1 = _p0 + 0.5 * _t.predict(x)\nassert _np.allclose(_np.asarray(pred0) * _np.ones(len(y)), _p0), 'pred0 — среднее y'\nassert _np.allclose(res, y - _p0), 'res = y - pred0'\nassert _np.allclose(pred1, _p1), 'pred1 = pred0 + 0.5 * tree.predict(x), дерево обучается на (x, res)'\nassert abs(mse0 - ((y - _p0) ** 2).mean()) < 1e-6 and abs(mse1 - ((y - _p1) ** 2).mean()) < 1e-6, 'mse0, mse1 — среднее квадратов ошибок'\nassert mse1 < mse0, 'После одного шага MSE должна уменьшиться'"} },
        { prompt: "Оцените <code>HistGradientBoostingClassifier(max_iter=100, random_state=0)</code> на числовых столбцах с NaN (<code>X_num</code>, без imputer) по 3-fold ROC AUC для learning_rate ∈ [0.05, 0.3, 1.0]. Запишите результаты в словарь <code>scores</code> (ключ — learning_rate), а лучший — в <code>best_lr</code>.", hints: ["Цикл: <code>for lr in [0.05, 0.3, 1.0]:</code>","<code>cross_val_score(m, X_num, y, cv=3, scoring='roc_auc').mean()</code>"], check: {"tests":"assert sorted(scores) == [0.05, 0.3, 1.0], 'Ключи scores: 0.05, 0.3, 1.0'\nassert all(0.6 < v < 0.9 for v in scores.values()), 'Значения AUC должны быть в диапазоне 0.6–0.9 (scoring=\\'roc_auc\\')'\nassert best_lr == max(scores, key=scores.get), 'best_lr — learning_rate с самым высоким AUC'\nassert best_lr == 0.05, 'На этих данных выигрывает маленький learning_rate'\nassert scores[0.05] > scores[1.0], 'learning_rate=1.0 должен оказаться слишком агрессивным'"} },
        { prompt: "В модели boosting вы снизили learning_rate с 0.1 до 0.05. Что ещё нужно изменить?", options: ["Ничего","Увеличить n_estimators примерно в два раза: каждый шаг стал меньше, поэтому шагов нужно больше","Поставить max_depth равным 0","Уменьшить n_estimators в два раза"], explain: "learning_rate × n_estimators — это примерно «пройденный путь». Если шаг меньше, шагов нужно больше. Точное значение проверьте через CV." }
      ]
    },
    "mp-7": {
      title: "Несбалансированные классы и выбор threshold",
      body: `
<p>В churn уходят лишь 26% клиентов. Модель, которая предсказывает «никто не уйдёт», имеет accuracy 74% — но она бесполезна: не находит ни одного уходящего. При несбалансированных классах смотрят не на accuracy, а на <b>recall</b> (какую долю уходящих мы нашли), <b>precision</b> (какая доля предупреждённых действительно уходит) и на бизнес-стоимость.</p>
<h3>Два рычага</h3>
<ul>
<li><code>class_weight='balanced'</code>: ошибка на редком классе считается дороже. В churn recall LogisticRegression растёт с 0.38 до 0.72, а precision падает с 0.62 до 0.50.</li>
<li><b>Threshold</b>: <code>predict</code> по умолчанию использует <code>predict_proba ≥ 0.5</code>. Это не бизнес-решение, а просто привычка. Если понизить порог, recall растёт, а precision падает.</li>
</ul>
<table>
<tr><th>Threshold</th><th>Recall</th><th>Precision</th><th>FP</th><th>FN</th></tr>
<tr><td>0.5</td><td>0.38</td><td>0.62</td><td>9</td><td>24</td></tr>
<tr><td>0.4</td><td>0.56</td><td>0.58</td><td>16</td><td>17</td></tr>
<tr><td>0.3</td><td>0.67</td><td>0.54</td><td>22</td><td>13</td></tr>
<tr><td>0.2</td><td>0.77</td><td>0.42</td><td>41</td><td>9</td></tr>
</table>
<h3>Пример по шагам: бизнес-стоимость</h3>
<ol>
<li>Скидка клиенту, который не собирался уходить (FP), — 5 000 ₸ расходов.</li>
<li>Пропустить уходящего (FN) — 20 000 ₸ (доход за несколько месяцев).</li>
<li>Для каждого threshold: стоимость = FP · 5000 + FN · 20000.</li>
<li>Threshold выбираем <b>по CV-прогнозам на train</b> (<code>cross_val_predict</code>), а на test смотрим только для проверки.</li>
</ol>
<pre><code>p = cross_val_predict(model, X_train, y_train, cv=5,
                      method='predict_proba')[:, 1]
for t in np.arange(0.1, 0.91, 0.05):
    fp = ((p &gt;= t) &amp; (y_train == 0)).sum()
    fn = ((p &lt; t) &amp; (y_train == 1)).sum()
    cost = fp * 5000 + fn * 20000</code></pre>
<p>Выбор между recall и precision — вопрос не технический, а бизнесовый. Если скидка дешёвая, а потеря клиента дорогая, важен recall. Если каждое предупреждение — дорогой звонок оператора, важен precision. Поэтому узнавайте стоимости у бизнеса.</p>
<p>На этих данных самый выгодный порог ≈ 0.15: FN в четыре раза дороже, поэтому выгоднее предупреждать больше клиентов.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Хвастаться accuracy на несбалансированных данных. (2) Выбирать threshold на test — это тоже leakage. (3) Забыть <code>stratify=y</code> в <code>train_test_split</code>: доля уходящих в test может измениться. (4) Применять class_weight и threshold вместе «с перебором» — выберите один и проверьте по стоимости.</div>`,
      ex: [
        { prompt: "Обучите два Pipeline: <code>pre</code> + LogisticRegression(max_iter=1000) и такой же, но с <code>class_weight='balanced'</code>. Запишите recall на test в <code>rec_plain</code> и <code>rec_bal</code>, а precision — в <code>prec_plain</code> и <code>prec_bal</code>.", hints: ["<code>LogisticRegression(max_iter=1000, class_weight='balanced')</code>","<code>recall_score(y_test, model.predict(X_test))</code>"], check: {"tests":"assert 0.25 < rec_plain < 0.5, f'recall простой модели ≈ 0.38, у вас {rec_plain:.3f}'\nassert rec_bal > rec_plain + 0.15, 'recall модели с balanced должен быть заметно выше (≈0.72)'\nassert prec_bal < prec_plain, 'Когда recall растёт, precision обычно падает'\nassert 0.3 < prec_bal < 0.7, 'prec_bal около 0.5'"} },
        { prompt: "В стартере <code>p</code> — CV-вероятности на train. FP = 5000 ₸, FN = 20000 ₸. Для каждого threshold из <code>np.arange(0.1, 0.91, 0.05)</code> посчитайте стоимость и запишите её в словарь <code>costs</code> (ключ — <code>round(t, 2)</code>). Самый дешёвый порог запишите в <code>best_t</code>, его стоимость — в <code>best_cost</code>.", hints: ["FP: <code>((p &gt;= t) &amp; (yt == 0)).sum()</code>, FN: <code>((p &lt; t) &amp; (yt == 1)).sum()</code>","<code>best_t = min(costs, key=costs.get)</code>"], check: {"tests":"import numpy as _np\n_c = {}\nfor _t in _np.arange(0.1, 0.91, 0.05):\n    _c[round(_t, 2)] = ((p >= _t) & (yt == 0)).sum() * 5000 + ((p < _t) & (yt == 1)).sum() * 20000\nassert len(costs) == 17, f'Должно быть 17 порогов (0.10, 0.15, …, 0.90), у вас {len(costs)}'\nassert all(abs(costs[k] - _c[k]) < 1e-6 for k in _c if k in costs), 'Стоимость = FP * 5000 + FN * 20000; FP: p >= t и y = 0, FN: p < t и y = 1'\n_bt = min(_c, key=_c.get)\nassert abs(best_t - _bt) < 1e-9, f'Самый дешёвый порог {_bt}'\nassert best_cost == _c[_bt], 'best_cost — стоимость этого порога'\nassert best_t < 0.5, 'FN дороже, поэтому порог должен быть ниже 0.5'"} },
        { prompt: "Модель на test дала 20 FP и 5 FN. FP = 5 000 ₸, FN = 20 000 ₸. Какова общая стоимость в тенге?", unit: "₸", explain: "20 · 5 000 + 5 · 20 000 = 100 000 + 100 000 = 200 000 ₸." }
      ]
    },
    "mp-8": {
      title: "KMeans: сегменты клиентов",
      body: `
<p>До сих пор y был известен (supervised). В <b>кластеризации</b> y нет: мы спрашиваем «на какие естественные группы делятся клиенты?» (unsupervised). Так строят маркетинговые сегменты и группируют магазины.</p>
<h3>Алгоритм KMeans</h3>
<ol>
<li>Случайно выбираются k центров (centroid).</li>
<li>Каждая точка относится к ближайшему центру (евклидово расстояние).</li>
<li>Каждый центр сдвигается в среднее своих точек.</li>
<li>Шаги 2–3 повторяются, пока изменения не прекратятся.</li>
</ol>
<p>Результат зависит от начальных центров, поэтому <code>n_init=10</code> (10 запусков, берётся лучший) и <code>random_state=0</code>.</p>
<h3>Масштабирование обязательно</h3>
<p>Расстояние сравнивает единицы измерения: <code>monthly_fee</code> — тысячи (3 300–11 200), <code>support_calls</code> — 0–6. Без масштабирования KMeans смотрит только на тариф. После <code>StandardScaler</code> каждый признак получает равный голос.</p>
<h3>Выбор k</h3>
<ul>
<li><b>Inertia</b> — сумма квадратов расстояний от точек до их центра. С ростом k она всегда уменьшается; «локоть» (elbow) — точка, где спад замедляется.</li>
<li><b>Silhouette</b> (−1…1) — насколько точка ближе к своему кластеру, чем к соседнему. Чем выше, тем лучше.</li>
</ul>
<h3>Пример по шагам: сегменты churn</h3>
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
<p>Silhouette выбирает k=2 (premium против остальных). Но для бизнеса полезнее k=3: «новые клиенты на дешёвом тарифе» (~19 месяцев), «лояльные клиенты на дешёвом тарифе» (~55 месяцев), «premium, много трафика» (~35 GB). Можно посмотреть и churn rate сегмента: y не участвовал в кластеризации, но помогает объяснить результат. Метрика задаёт направление, а решение определяет то, насколько сегмент понятен и с ним можно работать.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Кластеризация без масштабирования. (2) Считать номера кластеров (0, 1, 2) осмысленными — это просто метки. (3) Включать в кластеризацию <code>customer_id</code> или y. (4) Выбирать k с наименьшей inertia — это всегда самый большой k.</div>`,
      ex: [
        { prompt: "Отмасштабируйте четыре столбца <code>seg</code> через <code>StandardScaler</code> (<code>Z</code>) и обучите <code>KMeans(n_clusters=3, n_init=10, random_state=0)</code>. Запишите метки в <code>seg['segment']</code> и выведите <code>profile = seg.groupby('segment').mean()</code>.", hints: ["<code>Z = StandardScaler().fit_transform(seg[cols])</code>","<code>seg['segment'] = km.labels_</code>"], check: {"tests":"import numpy as _np\nassert 'segment' in seg.columns and len(seg) == 583, 'Добавьте в seg столбец segment (583 строки)'\nassert set(seg['segment'].unique()) == {0, 1, 2}, 'Должно быть 3 кластера'\nassert profile.shape[0] == 3, 'В profile 3 строки'\nassert _np.allclose(_np.asarray(Z).mean(axis=0), 0, atol=1e-6), 'Z — данные после StandardScaler'\nassert profile['monthly_fee'].max() > 10000, 'Один кластер должен быть premium-клиентами (monthly_fee > 10 000)'\nassert profile['tenure_months'].max() - profile['tenure_months'].min() > 20, 'После масштабирования разница должна быть видна и по tenure'"} },
        { prompt: "Для k = 2…6 обучите KMeans(n_init=10, random_state=0) и заполните словари <code>inertias[k]</code> и <code>sils[k]</code> (silhouette_score). k с самым высоким silhouette запишите в <code>best_k</code>.", hints: ["<code>for k in range(2, 7):</code>","<code>silhouette_score(Z, km.labels_)</code>, <code>km.inertia_</code>"], check: {"tests":"assert sorted(inertias) == [2, 3, 4, 5, 6] and sorted(sils) == [2, 3, 4, 5, 6], 'Нужны значения для k = 2, 3, 4, 5, 6'\nassert all(inertias[k] > inertias[k + 1] for k in range(2, 6)), 'Inertia должна уменьшаться с ростом k'\nassert all(-1 <= v <= 1 for v in sils.values()), 'Silhouette между −1 и 1'\nassert best_k == max(sils, key=sils.get), 'best_k — k с самым высоким silhouette'\nassert best_k == 2, 'На этих данных silhouette выбирает k=2'"} },
        { prompt: "Вы разделили клиентов по <code>monthly_fee</code> (₸) и <code>support_calls</code> с помощью KMeans без масштабирования. Что произойдёт?", options: ["Оба признака влияют одинаково","Кластеры фактически делятся только по monthly_fee: его шкала в тысячи раз больше","KMeans выдаст ошибку","Кластеры делятся только по support_calls"], explain: "В евклидовом расстоянии разница в 1000 ₸ в тысячу раз «больше», чем 1 звонок. StandardScaler выравнивает признаки." }
      ]
    },
    "mp-9": {
      title: "Интерпретация модели: importance и SHAP",
      body: `
<p>Менеджер спрашивает: «Почему модель назвала этого клиента рискованным?» У объяснения два уровня: <b>глобальный</b> (какие признаки важны в целом) и <b>локальный</b> (почему конкретный прогноз именно такой).</p>
<h3>1. feature_importances_</h3>
<p>Есть у древесных моделей: насколько каждый признак уменьшил impurity в разбиениях. Быстро, но есть два недостатка: считается на train и переоценивает непрерывные признаки с большим числом значений.</p>
<h3>2. permutation_importance</h3>
<p>Идея очень простая: на test перемешиваем (shuffle) один столбец и измеряем, насколько упала метрика. Упала — модель опирается на этот признак. Не упала — признак бесполезен.</p>
<h3>Пример по шагам: churn, RandomForest (max_depth=5)</h3>
<pre><code>from sklearn.inspection import permutation_importance
r = permutation_importance(rf, X_test, y_test, n_repeats=5,
                           random_state=0, scoring='roc_auc')
pd.Series(r.importances_mean, index=X_test.columns).sort_values()</code></pre>
<table>
<tr><th>Признак</th><th>feature_importances_</th><th>permutation (падение AUC)</th></tr>
<tr><td>tenure_months</td><td>0.37</td><td>0.217</td></tr>
<tr><td>support_calls</td><td>0.14</td><td>0.041</td></tr>
<tr><td>data_gb</td><td>0.14</td><td>0.000</td></tr>
<tr><td>age</td><td>0.11</td><td>−0.007</td></tr>
<tr><td>has_contract</td><td>0.07</td><td>0.070</td></tr>
</table>
<ol>
<li>Оба метода ставят tenure_months на первое место.</li>
<li>data_gb и age «важны» по impurity, но при перемешивании AUC не меняется — они использовались лишь для разделения шума в train.</li>
<li>Permutation работает с сырыми столбцами Pipeline: <code>city</code> оценивается как один признак.</li>
</ol>
<p>Помните: оба метода говорят, «на что опирается модель», а не «что является причиной в мире». В LogisticRegression всё проще: коэффициенты масштабированных признаков показывают направление и силу (tenure −1.1, support_calls +0.8).</p>
<h3>3. SHAP (концепция)</h3>
<p>SHAP опирается на значения Шепли (Shapley) из теории игр: прогноз «честно делится» между признаками. Для каждого клиента: <b>прогноз = базовое значение + сумма вкладов признаков</b>. Например: базовое 0.26, tenure = 3 месяца +0.25, support_calls = 5 +0.12, has_contract = 1 −0.08 → 0.55. Это локальное объяснение. В браузере пакета <code>shap</code> нет; на работе используют <code>shap.TreeExplainer(model)</code>.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Понимать importance как причинно-следственную связь: модель видит корреляцию. (2) Коррелированные признаки делят важность между собой, и оба могут выглядеть «слабыми». (3) Считать permutation на train. (4) Сравнивать коэффициенты LogisticRegression без масштабирования.</div>`,
      ex: [
        { prompt: "Обучите Pipeline <code>rf</code> на train. Запишите <code>feature_importances_</code> леса в Series <code>imp</code> с названиями из <code>get_feature_names_out()</code> шага <code>pre</code> и отсортируйте по убыванию. Выведите первые 5.", hints: ["<code>rf.named_steps['pre'].get_feature_names_out()</code>","<code>pd.Series(rf.named_steps['model'].feature_importances_, index=names).sort_values(ascending=False)</code>"], check: {"tests":"import pandas as _pd\nassert isinstance(imp, _pd.Series), 'imp — pandas Series'\nassert len(imp) == 14, 'Должны быть все 14 признаков'\nassert abs(imp.sum() - 1) < 1e-6, 'Сумма feature_importances_ равна 1'\nassert imp.index[0] == 'num__tenure_months', f'Самый важный признак должен быть num__tenure_months, у вас {imp.index[0]}'\nassert list(imp.values) == sorted(imp.values, reverse=True), 'Отсортируйте по убыванию (ascending=False)'"} },
        { prompt: "Для обученного <code>rf</code> посчитайте <code>permutation_importance</code> на test (n_repeats=5, random_state=0, scoring='roc_auc'). Запишите <code>importances_mean</code> в Series <code>perm</code> с названиями из <code>X_test.columns</code> и отсортируйте по убыванию.", hints: ["<code>permutation_importance(rf, X_test, y_test, n_repeats=5, random_state=0, scoring='roc_auc')</code>","<code>pd.Series(r.importances_mean, index=X_test.columns)</code>"], check: {"tests":"import pandas as _pd\nassert isinstance(perm, _pd.Series) and len(perm) == 8, 'perm — Series по 8 столбцам X_test'\nassert perm.index[0] == 'tenure_months', 'Самый важный — tenure_months'\nassert perm['tenure_months'] > 0.1, 'Если перемешать tenure_months, AUC заметно падает'\nassert perm['data_gb'] < 0.03, 'data_gb по permutation должен оказаться неважным (scoring=\\'roc_auc\\', на X_test?)'\nassert list(perm.values) == sorted(perm.values, reverse=True), 'Отсортируйте по убыванию'"} },
        { prompt: "SHAP: базовое значение (средняя вероятность churn) — 0.26. Вклады для одного клиента: tenure +0.25, support_calls +0.12, has_contract −0.08, остальные 0. Каков прогноз модели для этого клиента?", explain: "SHAP аддитивен: 0.26 + 0.25 + 0.12 − 0.08 = 0.55." }
      ]
    },
    "mp-10": {
      title: "Сохранение модели и model card",
      body: `
<p>Если модель осталась в ноутбуке, пользы от неё никому нет. Её сохраняют в файл и загружают в другом месте (на сервере, в ежедневном скрипте). Самое важное — сохранять <b>весь Pipeline</b>: медианы imputer, scaler и категории one-hot едут вместе с моделью.</p>
<pre><code>import joblib
joblib.dump(model, 'churn_model.joblib')
loaded = joblib.load('churn_model.joblib')
loaded.predict(new_clients)      # подаётся сырой DataFrame</code></pre>
<h3>Model card: что документировать</h3>
<ul>
<li><b>Цель</b>: что предсказывает, кто использует, для какого решения.</li>
<li><b>Данные</b>: откуда, за какой период, сколько строк, как заполнены пропуски.</li>
<li><b>Метрики</b>: AUC, recall, precision на test, выбранный threshold и его бизнес-обоснование.</li>
<li><b>Ограничения</b>: где модель работает плохо, от каких признаков зависит.</li>
<li><b>Справедливость</b>: метрики по группам.</li>
<li>Версия, дата, владелец, версия sklearn.</li>
</ul>
<h3>Пример по шагам: fairness по городам</h3>
<p>Recall модели churn (LogisticRegression, threshold 0.5) на test:</p>
<table>
<tr><th>Город</th><th>Клиентов в test</th><th>Уходящих</th><th>Recall</th></tr>
<tr><td>Алматы</td><td>55</td><td>14</td><td>0.57</td></tr>
<tr><td>Астана</td><td>38</td><td>13</td><td>0.38</td></tr>
<tr><td>Караганда</td><td>16</td><td>5</td><td>0.40</td></tr>
<tr><td>Актобе</td><td>20</td><td>3</td><td>0.00</td></tr>
<tr><td>Шымкент</td><td>21</td><td>4</td><td>0.00</td></tr>
</table>
<ol>
<li>В Актобе и Шымкенте модель не нашла ни одного уходящего — клиенты в этих городах не получат предложение скидки.</li>
<li>Но уходящих всего 3–4: один клиент меняет recall на 0.25. Это не доказательство того, что «модель несправедлива», а сигнал «данных мало, нужен контроль».</li>
<li>Записываем в model card: размеры групп, метрики, рекомендацию (понизить threshold, собрать данные).</li>
</ol>
<p>Model card — не бюрократия. Если через полгода модель ухудшится, вы или ваш коллега спросите: «На каких данных и с каким threshold её обучали?» Ответ должен быть на этой странице. Повторяйте проверку fairness после каждого переобучения: данные меняются, меняется и разница между группами.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Сохранить только модель и забыть preprocessing. (2) Загружать в другой версии sklearn — предупреждение или ошибка. (3) Открывать файл .joblib/.pickle из неизвестного источника: он может выполнить код. (4) Проверять fairness только по общей accuracy.</div>`,
      ex: [
        { prompt: "Сохраните обученную <code>model</code> в файл <code>churn_model.joblib</code> через <code>joblib.dump</code>, затем загрузите её обратно в <code>loaded</code>. Совпадают ли их прогнозы на X_test — запишите в переменную <code>same</code> (bool).", hints: ["<code>joblib.dump(model, 'churn_model.joblib')</code>","<code>same = bool((loaded.predict(X_test) == model.predict(X_test)).all())</code>"], check: {"tests":"import os as _os\nfrom sklearn.pipeline import Pipeline as _P\nassert _os.path.exists('churn_model.joblib'), 'Файл churn_model.joblib не найден: joblib.dump(model, ...)'\nassert isinstance(loaded, _P), 'loaded — загруженный Pipeline (joblib.load)'\nassert loaded is not model, 'loaded должен быть загружен из файла'\nassert bool(same) is True, 'same = (loaded.predict(X_test) == model.predict(X_test)).all() → True'"} },
        { prompt: "Проверка fairness. В таблице <code>res</code> есть город, истинное значение и прогноз на test. Посчитайте recall для каждого города и запишите в Series <code>by_city</code> (индекс — город). Число уходящих в каждом городе запишите в Series <code>churners</code>.", hints: ["<code>res.groupby('city').apply(lambda g: recall_score(g['y'], g['pred'], zero_division=0), include_groups=False)</code>","Или цикл: <code>for c, g in res.groupby('city'):</code>"], check: {"tests":"from sklearn.metrics import recall_score as _rs\nassert by_city is not None and len(by_city) == 5, 'В by_city должно быть 5 городов'\nfor _c, _g in res.groupby('city'):\n    assert abs(by_city[_c] - _rs(_g['y'], _g['pred'], zero_division=0)) < 1e-9, f'Неверный recall для {_c}'\nassert abs(by_city['Алматы'] - 8 / 14) < 1e-9, 'В Алматы recall = 8/14 ≈ 0.57'\nassert int(churners['Ақтөбе']) == 3 and int(churners.sum()) == 39, 'churners — y.sum() в каждом городе'"} },
        { prompt: "Напишите короткую <b>model card</b> для модели churn (не меньше 80 слов): цель, данные, метрики и threshold, ограничения, справедливость по городам. Затем честно оцените её по четырём критериям. Для зачёта по каждому критерию нужно не меньше <b>3 / 4</b>.", done: "Положите model card в файл MODEL_CARD.md в репозитории проекта.", criteria: [{"name":"Цель и пользователь","levels":["Не указаны","Только «предсказывает churn»","Сказано, кто и для какого решения использует","Указаны решение, пользователь и то, для чего модель НЕ следует использовать"]},{"name":"Данные и метрики","levels":["Чисел нет","Только accuracy","AUC, recall, precision на test и число строк","Метрики, threshold и его обоснование бизнес-стоимостью"]},{"name":"Ограничения","levels":["Нет","Общие слова («может ошибаться»)","Конкретное ограничение (пропуски, мало данных, синтетика)","Ограничения, их влияние на решение и план переобучения"]},{"name":"Справедливость","levels":["Не упомянута","Утверждение «модель справедлива»","Приведён recall по городам","Recall, размеры групп, предупреждение о малой выборке и конкретное действие"]}] }
      ]
    },
    "mp-gate": {
      title: "Экзамен модуля: ML in Practice",
      body: `
<p>Итоговая проверка. Pipeline, leakage, feature engineering, тюнинг, ансамбли, threshold и интерпретация — всё вместе. Держите модели небольшими (n_estimators ≤ 100, cv ≤ 5) и задавайте <code>random_state</code>.</p>`,
      ex: [
        { prompt: "Предскажите цену квартир flats. Создайте Pipeline (или GridSearchCV) с именем <code>model</code>: он должен принимать сырые столбцы <code>X_train</code> (district — в текстовом виде). Feature engineering и модель выбирайте сами. Test R² (<code>model.score(X_test, y_test)</code>) должен быть не меньше <b>0.90</b>. Не используйте <code>price_mln</code> как признак.", hints: [], check: {"tests":"from sklearn.pipeline import Pipeline as _P\nfrom sklearn.model_selection import GridSearchCV as _G\nassert isinstance(model, (_P, _G)), 'model — Pipeline или GridSearchCV'\nassert 'price_mln' not in X_train.columns, 'price_mln не должен быть признаком'\nassert not any('price' in str(c) for c in X_test.columns), 'Признак, построенный из цены, — target leakage'\nassert len(X_test) == 100, 'X_test нельзя менять (100 строк)'\n_r2 = model.score(X_test, y_test)\nassert _r2 >= 0.90, f'Test R² должен быть не меньше 0.90, у вас {_r2:.3f}. Вы добавили district через OneHotEncoder?'"} },
        { prompt: "Churn: отдел удержания хочет находить не меньше <b>70%</b> уходящих (recall ≥ 0.70), но так, чтобы не меньше <b>40%</b> предупреждений были верными (precision ≥ 0.40). Задайте <code>model</code> (Pipeline с predict_proba) и число <code>threshold</code>. Проверка: <code>(model.predict_proba(X_test)[:, 1] &gt;= threshold)</code>.", hints: [], check: {"tests":"from sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert model is not None and hasattr(model, 'predict_proba'), 'model — обученная модель с predict_proba'\nassert 0 < threshold < 1, 'threshold между 0 и 1'\nassert len(X_test) == 150, 'X_test нельзя менять'\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\n_r, _p = _rs(y_test, _yp), _ps(y_test, _yp, zero_division=0)\nassert _r >= 0.70, f'recall {_r:.2f} < 0.70: понизьте threshold или используйте class_weight'\nassert _p >= 0.40, f'precision {_p:.2f} < 0.40: threshold слишком низкий'"} },
        { prompt: "Аналитик заполнил пропуски в <code>age</code> медианой по всем данным, обучил StandardScaler на всех данных, а затем разделил на train/test. Какое исправление самое правильное?", options: ["Использовать среднее вместо медианы","Сначала разделить, а SimpleImputer и StandardScaler поместить внутрь Pipeline и обучать только на train","Увеличить test_size до 0.5","Заменить StandardScaler на MinMaxScaler"], explain: "Каждый шаг, который учится на данных, должен обучаться только на train. Pipeline автоматически обеспечивает это в CV и в production." },
        { prompt: "В Random Forest feature_importances_ у <code>data_gb</code> равна 0.14, а permutation importance на test ≈ 0. Какой вывод самый правильный?", options: ["data_gb — один из самых важных признаков","Impurity importance показывает, что признак использовался для разделения шума в train; на test он не улучшает прогноз","Permutation importance посчитана неправильно","data_gb — причина churn"], explain: "Impurity importance считается на train и переоценивает непрерывные признаки. Permutation на test напрямую измеряет, «насколько хуже станет модель без признака»." }
      ]
    }
  }
});
