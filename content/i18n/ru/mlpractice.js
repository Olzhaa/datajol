// M5.2 ML in Practice: Russian text. Code, solutions and expected output are in content/mlpractice.js.
DJ.i18n.patch({
  modules: {
    "m5-2": { intro: "В реальной работе важна не сама модель, а всё вокруг неё: подготовка данных, защита от утечки (leakage), подбор гиперпараметров, сильные ансамбли, несбалансированные классы, кластеризация и интерпретация модели. Затем прикладные темы, которые спрашивают в вакансиях: временные ряды, практика CatBoost/XGBoost/LightGBM, PCA, текст (TF-IDF), мониторинг моделей (PSI, out-of-time), антифрод и рекомендательные системы. Всё это вы сделаете с помощью scikit-learn на реальных данных: churn, flats, продажи, отзывы, кредитные заявки, транзакции." }
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
<p>Читайте таблицу по строкам. При 0.01 50 деревьев не хватает (0.781, underfit): при увеличении до 100 деревьев результат всё ещё растёт (0.790), то есть деревьев нужно ещё больше. При 0.1 наоборот: 50 деревьев достаточно (0.804), а на 100 деревьях модель начинает заучивать шум (0.787). 0.5 и 1.0 слишком агрессивны: плохо при любом числе деревьев (overfit). Правило: уменьшили learning_rate в 2 раза — увеличьте n_estimators примерно в 2 раза.</p>
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
    "mp-ts": {
      title: "Временные ряды: разбиение по времени, признаки lag и rolling, baseline",
      body: `
<p>До сих пор порядок строк не имел значения: если перемешать квартиры, ничего не изменится. Во <b>временном ряде</b> (time series) порядок — это всё. Владелец магазина спрашивает вас: «сколько товаров продастся завтра?» Вы знаете только <b>прошлое</b>.</p>
<p>Данные: <code>sales_daily.csv</code> — ежедневные продажи магазина за 2024–2025 годы (730 дней). Столбцы: <code>date</code>, <code>sales</code> (штуки), <code>promo</code> (была ли в этот день акция, 0/1).</p>
<h3>Что есть в ряде</h3>
<ul>
<li><b>Тренд</b>: продажи медленно растут (в 1-м квартале 2024 года в среднем 199, в 4-м квартале 2025 года — 253).</li>
<li><b>Недельная сезонность</b>: понедельник–четверг ≈ 210–220, пятница 241, суббота 272, воскресенье 254.</li>
<li><b>Шум</b>: случайные колебания, которые не объяснить.</li>
</ul>
<h3>Правило 1: разбиение по времени</h3>
<p><code>train_test_split</code> перемешивает строки случайно. Во временном ряде это leakage: чтобы предсказать 15 марта, модель уже «видела» 16 марта. Правильно: <b>прошлое — train, будущее — test</b>.</p>
<pre><code>df = pd.read_csv('sales_daily.csv', parse_dates=['date'])
train = df[df['date'] &lt; '2025-07-01']    # 547 дней
test = df[df['date'] &gt;= '2025-07-01']    # 183 дня</code></pre>
<h3>Правило 2: сначала baseline</h3>
<table>
<tr><th>Baseline</th><th>Прогноз</th><th>Код</th><th>Test MAE</th></tr>
<tr><td>Среднее</td><td>среднее по train</td><td><code>train['sales'].mean()</code></td><td>30.7</td></tr>
<tr><td><b>Naive</b></td><td>завтра = сегодня</td><td><code>df['sales'].shift(1)</code></td><td>21.6</td></tr>
<tr><td><b>Seasonal naive</b></td><td>завтра = тот же день прошлой недели</td><td><code>df['sales'].shift(7)</code></td><td><b>15.2</b></td></tr>
</table>
<p>Seasonal naive побеждает, потому что недельная сезонность сильная: субботу правильно сравнивать с прошлой субботой. Любая модель должна быть лучше этих 15.2, иначе она не нужна.</p>
<h3>MAE и MAPE</h3>
<p><b>MAPE</b> — средняя ошибка в процентах: <code>mean(|факт − прогноз| / факт) · 100</code>. Она понятна бизнесу: «в среднем ошибаемся на 6%».</p>
<ol>
<li>Фактические значения: 200, 250, 300. Прогноз: 210, 240, 330.</li>
<li>Ошибки: 10, 10, 30. MAE = 50 / 3 ≈ 16.7 штуки.</li>
<li>Проценты: 5%, 4%, 10%. MAPE = 19 / 3 ≈ 6.3%.</li>
</ol>
<h3>Признаки lag и rolling</h3>
<p>Чтобы дать временной ряд обычной модели (LinearRegression, boosting), превращаем прошлое в <b>признаки</b>:</p>
<pre><code>df['lag_1'] = df['sales'].shift(1)                      # вчерашние продажи
df['lag_7'] = df['sales'].shift(7)                      # неделю назад
df['roll_7'] = df['sales'].shift(1).rolling(7).mean()   # среднее за последние 7 дней
d = df.dropna()                                         # в первые 7 дней lag нет</code></pre>
<ol>
<li><code>shift(1)</code> сдвигает столбец на одну строку вниз: в строке каждого дня стоит вчерашнее значение.</li>
<li><code>rolling(7).mean()</code> — скользящее среднее. Перед ним обязателен <code>shift(1)</code>: без него в окно попадут <b>сегодняшние</b> продажи, а именно их мы и предсказываем.</li>
<li><code>promo</code> можно использовать как признак: акции планируют заранее, завтрашнее значение известно уже сегодня.</li>
<li>LinearRegression с этими четырьмя признаками даёт test MAE = 13.1 (MAPE 5.2%). Если добавить день недели (<code>date.dt.dayofweek</code>, one-hot) — 9.6.</li>
</ol>
<h3>TimeSeriesSplit: CV, которая сохраняет время</h3>
<p>Обычный K-fold тоже перемешивает. <code>TimeSeriesSplit</code> в каждом fold удлиняет train и проверяет на следующем периоде:</p>
<table>
<tr><th>Fold</th><th>Train (строки)</th><th>Validation (строки)</th><th>MAE</th></tr>
<tr><td>1</td><td>1–147</td><td>148–291</td><td>14.2</td></tr>
<tr><td>2</td><td>1–291</td><td>292–435</td><td>11.6</td></tr>
<tr><td>3</td><td>1–435</td><td>436–579</td><td>14.6</td></tr>
<tr><td>4</td><td>1–579</td><td>580–723</td><td>12.9</td></tr>
</table>
<div class="tip">В этом уроке мы прогнозируем <b>на один день вперёд</b>: в качестве lag_1 известны вчерашние фактические продажи. Для прогноза на 30 дней вперёд lag_1 нет: нужно либо брать lag под горизонт (lag_30), либо по очереди подавать прогноз модели на её же вход. На собеседовании обязательно уточняйте: «какой горизонт?»</div>
<h3>Частые ошибки</h3>
<ul>
<li>Делить временной ряд случайно или использовать обычный <code>KFold(shuffle=True)</code>.</li>
<li>Считать <code>rolling</code> без <code>shift(1)</code>: target попадает внутрь признака.</li>
<li>Строить модель без baseline. «MAE = 13» — это хорошо? Не зная, что у seasonal naive 15.2, сказать нельзя.</li>
<li>Использовать MAPE на ряде со значениями около 0: деление на ноль, проценты растут до бесконечности.</li>
<li>Добавить признак, который в момент прогноза неизвестен (например, число клиентов в тот же день).</li>
</ul>`,
      ex: [
        { prompt: "Разбейте данные по времени: <code>train</code> — строки до <code>2025-07-01</code>, <code>test</code> — начиная с этой даты. Сделайте два baseline: <code>df['naive']</code> = вчерашние продажи, <code>df['snaive']</code> = продажи 7 дней назад. Запишите их MAE на периоде test в <code>mae_naive</code> и <code>mae_snaive</code>. (Столбцы baseline добавьте <b>до</b> разбиения.)", check: { tests: "import pandas as _pd\nimport numpy as _np\n_d = _pd.read_csv('sales_daily.csv', parse_dates=['date'])\n_m = _d['date'] >= '2025-07-01'\n_n = (_d['sales'] - _d['sales'].shift(1)).abs()[_m].mean()\n_s = (_d['sales'] - _d['sales'].shift(7)).abs()[_m].mean()\nassert len(train) == 547 and len(test) == 183, f\"train должен быть 547 дней, test — 183, у вас {len(train)} и {len(test)}\"\nassert train['date'].max() < test['date'].min(), \"Последний день train должен быть раньше первого дня test\"\nassert abs(mae_naive - _n) < 1e-6, f\"mae_naive должна быть ≈ {_n:.2f}: shift(1), только на периоде test\"\nassert abs(mae_snaive - _s) < 1e-6, f\"mae_snaive должна быть ≈ {_s:.2f}: shift(7), только на периоде test\"" }, hints: ["<code>df['naive'] = df['sales'].shift(1)</code>, <code>df['snaive'] = df['sales'].shift(7)</code>", "<code>test = df[df['date'] &gt;= '2025-07-01']</code>, затем <code>(test['sales'] - test['naive']).abs().mean()</code>"] },
        { prompt: "Добавьте в <code>df</code> три признака: <code>lag_1</code>, <code>lag_7</code> и <code>roll_7</code> (среднее за последние 7 дней, без сегодняшнего). <code>d = df.dropna()</code>. Разбейте по времени (<code>2025-07-01</code>) и обучите на train <code>LinearRegression</code> под именем <code>model</code> на признаках <code>['lag_1', 'lag_7', 'roll_7', 'promo']</code>. Посчитайте на test <code>mae_model</code> и <code>mape_model</code> (в процентах).", check: { tests: "import pandas as _pd\nimport numpy as _np\n_d = _pd.read_csv('sales_daily.csv', parse_dates=['date'])\nfrom sklearn.linear_model import LinearRegression as _LR\nassert abs(df.loc[7, 'roll_7'] - _d['sales'].iloc[0:7].mean()) < 1e-9, \"roll_7 не должен включать сегодняшние продажи: df['sales'].shift(1).rolling(7).mean()\"\nassert abs(df.loc[7, 'lag_1'] - _d['sales'].iloc[6]) < 1e-9 and abs(df.loc[7, 'lag_7'] - _d['sales'].iloc[0]) < 1e-9, \"lag_1 = shift(1), lag_7 = shift(7)\"\n_d['lag_1'] = _d['sales'].shift(1); _d['lag_7'] = _d['sales'].shift(7); _d['roll_7'] = _d['sales'].shift(1).rolling(7).mean()\n_d = _d.dropna()\n_F = ['lag_1', 'lag_7', 'roll_7', 'promo']\n_tr = _d[_d['date'] < '2025-07-01']; _te = _d[_d['date'] >= '2025-07-01']\n_p = _LR().fit(_tr[_F], _tr['sales']).predict(_te[_F])\n_mae = _np.abs(_te['sales'] - _p).mean()\n_mape = (_np.abs(_te['sales'] - _p) / _te['sales']).mean() * 100\nassert hasattr(model, 'coef_') and len(model.coef_) == 4, \"model должна быть обучена на четырёх признаках\"\nassert abs(mae_model - _mae) < 1e-6, f\"mae_model должна быть ≈ {_mae:.2f}. Train: до 2025-07-01, test: после\"\nassert abs(mape_model - _mape) < 1e-6, f\"mape_model ≈ {_mape:.2f} (в процентах): mean(|факт − прогноз| / факт) * 100\"" }, hints: ["<code>df['roll_7'] = df['sales'].shift(1).rolling(7).mean()</code>", "MAPE: <code>(np.abs(test['sales'] - pred) / test['sales']).mean() * 100</code>"] },
        { prompt: "Признаки готовы (<code>d</code>, <code>F</code>). Оцените <code>LinearRegression</code> через <code>cross_val_score</code> с <code>TimeSeriesSplit(n_splits=4)</code> (<code>scoring='neg_mean_absolute_error'</code>). Запишите MAE каждого fold (положительное число) в массив <code>cv_mae</code>, а среднее — в <code>cv_mean</code>.", check: { tests: "import numpy as _np\nfrom sklearn.model_selection import TimeSeriesSplit as _TS, cross_val_score as _cvs\nfrom sklearn.linear_model import LinearRegression as _LR\n_c = -_cvs(_LR(), d[F], d['sales'], cv=_TS(n_splits=4), scoring='neg_mean_absolute_error')\nassert len(cv_mae) == 4, \"cv_mae — MAE четырёх fold\"\nassert all(v > 0 for v in cv_mae), \"MAE должна быть положительной: cross_val_score возвращает отрицательные значения, поставьте перед ним минус\"\nassert _np.allclose(_np.asarray(cv_mae, dtype=float), _c, atol=1e-6), \"Значения MAE не совпадают: cv=TimeSeriesSplit(n_splits=4), scoring='neg_mean_absolute_error'\"\nassert abs(cv_mean - _c.mean()) < 1e-6, f\"cv_mean должно быть ≈ {_c.mean():.2f}\"" }, hints: ["<code>tscv = TimeSeriesSplit(n_splits=4)</code>, передайте его как <code>cv=tscv</code>", "<code>cv_mae = -cross_val_score(LinearRegression(), d[F], d['sales'], cv=tscv, scoring='neg_mean_absolute_error')</code>"] },
        { prompt: "Аналитик разбил данные о ежедневных продажах через <code>train_test_split(shuffle=True)</code> и получил MAE = 8. В production MAE оказалась 15. Какова самая вероятная причина?", options: ["Модель слишком простая", "При случайном разбиении соседние дни по обе стороны от дней test оказались в train: модель училась, «видя будущее»", "Неправильно выбран random_state", "MAE не подходит для временных рядов"], explain: "Во временном ряде соседние дни очень похожи. Случайное разбиение — это leakage. Только разбиение по времени даёт оценку, похожую на production." }
      ]
    },
    "mp-gbm": {
      title: "Градиентный бустинг на практике: CatBoost/XGBoost/LightGBM",
      body: `
<p>В трети вакансий Data Scientist в Казахстане упоминаются <b>CatBoost, XGBoost</b> или <b>LightGBM</b>. Эти три библиотеки — промышленные реализации gradient boosting: на табличных данных (банк, телеком, ритейл) это обычно самые сильные модели. Идею вы видели в предыдущем уроке: деревья по очереди исправляют ошибки. Теперь — как их настраивают на практике.</p>
<p>В браузере этих библиотек нет, поэтому используем <code>HistGradientBoostingClassifier</code> из sklearn. Он сделан по образцу LightGBM, и параметры легко переводятся из одной библиотеки в другую.</p>
<h3>Словарь параметров</h3>
<table>
<tr><th>Смысл</th><th>sklearn HistGB</th><th>XGBoost</th><th>LightGBM</th><th>CatBoost</th></tr>
<tr><td>Число деревьев</td><td><code>max_iter</code></td><td><code>n_estimators</code></td><td><code>n_estimators</code></td><td><code>iterations</code></td></tr>
<tr><td>Шаг</td><td><code>learning_rate</code></td><td><code>learning_rate</code></td><td><code>learning_rate</code></td><td><code>learning_rate</code></td></tr>
<tr><td>Размер дерева</td><td><code>max_depth</code>, <code>max_leaf_nodes</code></td><td><code>max_depth</code></td><td><code>num_leaves</code></td><td><code>depth</code></td></tr>
<tr><td>L2-регуляризация</td><td><code>l2_regularization</code></td><td><code>reg_lambda</code></td><td><code>reg_lambda</code></td><td><code>l2_leaf_reg</code></td></tr>
<tr><td>Ранняя остановка</td><td><code>early_stopping</code>, <code>n_iter_no_change</code></td><td><code>early_stopping_rounds</code></td><td><code>lgb.early_stopping()</code></td><td><code>early_stopping_rounds</code></td></tr>
<tr><td>Категории</td><td><code>categorical_features</code></td><td><code>enable_categorical</code></td><td><code>categorical_feature</code></td><td><code>cat_features</code></td></tr>
</table>
<h3>Early stopping: модель сама находит число деревьев</h3>
<p>Если деревьев слишком много, boosting начинает заучивать шум. Сколько деревьев нужно? Вместо ручного поиска отделяем от train часть <b>validation</b>. После каждого нового дерева измеряем ошибку на validation. Если она не улучшается N шагов подряд — останавливаемся.</p>
<pre><code>from sklearn.ensemble import HistGradientBoostingClassifier
es = HistGradientBoostingClassifier(
    max_iter=300, learning_rate=0.1, max_depth=3,
    early_stopping=True,        # по умолчанию включается только от 10 000 строк
    validation_fraction=0.2,    # 20% train уходит в validation
    n_iter_no_change=10,        # нет улучшения 10 шагов — стоп
    random_state=0)
es.fit(X_train[num], y_train)
print(es.n_iter_)               # 39</code></pre>
<table>
<tr><th>Модель</th><th>Фактическое число деревьев</th><th>Test AUC</th></tr>
<tr><td>300 деревьев, без early stopping</td><td>300</td><td>0.711</td></tr>
<tr><td>До 300, с early stopping</td><td><b>39</b></td><td><b>0.787</b></td></tr>
</table>
<ol>
<li><code>max_iter=300</code> — только верхняя граница. Модель остановилась на 39: дальше ошибка на validation не улучшалась.</li>
<li>Без ранней остановки выросли все 300 деревьев, и модель заучила train: test AUC 0.711.</li>
<li>Рецепт из практики: маленький <code>learning_rate</code> (0.03–0.1), большой лимит деревьев, а их число доверить early stopping.</li>
</ol>
<div class="tip">Часть validation для early stopping — <b>это не test</b>. Если останавливаться, глядя на test, вы подгоняете число деревьев под test — это leakage. Три части: train (обучение), validation (остановка), test (итоговая оценка).</div>
<h3>Категориальные признаки: one-hot не нужен</h3>
<p>Современный boosting принимает категории напрямую: дерево может сразу разделить по условию «город ∈ {Алматы, Астана}». Это быстрее, чем one-hot, а когда категорий много (сотни городов), выше и качество.</p>
<pre><code>for c in ['city', 'plan']:
    X[c] = X[c].astype('category')      # тип category в pandas
model = HistGradientBoostingClassifier(
    categorical_features='from_dtype',  # сам находит столбцы category
    max_iter=300, early_stopping=True, random_state=0)</code></pre>
<p>Этой модели не нужны ни imputer, ни scaler, ни encoder: NaN и категории она обрабатывает сама. На churn test AUC = 0.794.</p>
<h3>Тот же код в CatBoost и LightGBM (для чтения)</h3>
<pre><code>from catboost import CatBoostClassifier
model = CatBoostClassifier(iterations=1000, learning_rate=0.05, depth=4,
                           eval_metric='AUC', early_stopping_rounds=50,
                           random_seed=0, verbose=100)
model.fit(X_train, y_train,
          cat_features=['city', 'plan'],     # текстовые столбцы передаём напрямую
          eval_set=(X_val, y_val))           # сюда смотрит early stopping
print(model.get_best_iteration())</code></pre>
<pre><code>import lightgbm as lgb
model = lgb.LGBMClassifier(n_estimators=1000, learning_rate=0.05,
                           num_leaves=15, random_state=0)
model.fit(X_train, y_train,
          eval_set=[(X_val, y_val)], eval_metric='auc',
          callbacks=[lgb.early_stopping(50)])
print(model.best_iteration_)</code></pre>
<p>Структура одна и та же: большой лимит деревьев, маленький learning_rate, отдельный <code>eval_set</code>, ранняя остановка. Сильная сторона CatBoost — категории (отсюда и название: <i>Cat</i>egorical <i>Boost</i>ing) и хорошие параметры по умолчанию. LightGBM — скорость на больших данных. XGBoost — самый старый и самый распространённый.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Передавать test как <code>eval_set</code> для early stopping.</li>
<li>Оставить значение по умолчанию <code>n_estimators=100</code> и менять только learning_rate.</li>
<li>Превратить категорию через <code>LabelEncoder</code> в числа 0, 1, 2 и передать как числовой признак: модель увидит ложный порядок «Алматы &lt; Астана &lt; Шымкент». Используйте тип category или <code>cat_features</code>.</li>
<li>Ставить StandardScaler перед boosting: масштаб на деревья не влияет.</li>
<li>Ждать, что на маленьких данных (несколько сотен строк) boosting обязательно победит. На churn LogisticRegression (0.81) всё ещё впереди. Преимущество boosting раскрывается на тысячах строк и сложных зависимостях.</li>
</ul>`,
      ex: [
        { prompt: "Обучите на числовых столбцах (<code>X_train[num]</code>) два <code>HistGradientBoostingClassifier</code>, оба с <code>max_iter=300, learning_rate=0.1, max_depth=3, random_state=0</code>. <code>full</code>: <code>early_stopping=False</code>. <code>es</code>: <code>early_stopping=True, validation_fraction=0.2, n_iter_no_change=10</code>. Запишите фактическое число деревьев (<code>n_iter_</code>) в <code>n_full</code>, <code>n_es</code>, а ROC AUC на test — в <code>auc_full</code>, <code>auc_es</code>.", check: { tests: "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\n_e = _H(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train[num], y_train)\n_a = _ras(y_test, _e.predict_proba(X_test[num])[:, 1])\nassert n_full == 300, f\"Без early stopping модель должна вырастить все 300 деревьев, у вас {n_full}: early_stopping=False\"\nassert n_es == _e.n_iter_, f\"n_es должно быть = {_e.n_iter_}: early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0\"\nassert abs(auc_es - _a) < 1e-6, f\"auc_es должен быть ≈ {_a:.3f} (на test, predict_proba)\"\nassert 0.5 < auc_full < auc_es, \"На этих данных модель с ранней остановкой должна быть лучше на test\"" }, hints: ["<code>HistGradientBoostingClassifier(max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code>", "Число деревьев: <code>es.n_iter_</code>. AUC: <code>roc_auc_score(y_test, es.predict_proba(X_test[num])[:, 1])</code>"] },
        { prompt: "Передайте категории без one-hot. (1) Преобразуйте <code>city</code> и <code>plan</code> в <code>X</code> в тип <code>category</code>. (2) <code>train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)</code>. (3) <code>model</code> = <code>HistGradientBoostingClassifier(categorical_features='from_dtype', max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0)</code>, обучите на всех столбцах. ROC AUC на test → <code>auc_cat</code>.", check: { tests: "from sklearn.ensemble import HistGradientBoostingClassifier as _H\nfrom sklearn.metrics import roc_auc_score as _ras\nassert str(X_train['city'].dtype) == 'category' and str(X_train['plan'].dtype) == 'category', \"city и plan должны иметь тип category: X[c] = X[c].astype('category')\"\nassert len(X_train) == 450 and len(X_test) == 150 and X_train.shape[1] == 8, \"Разбиение: test_size=0.25, все 8 столбцов\"\nassert hasattr(model, 'is_categorical_') and model.is_categorical_ is not None and int(model.is_categorical_.sum()) == 2, \"Модель должна видеть два категориальных столбца: categorical_features='from_dtype'\"\n_m = _H(categorical_features='from_dtype', max_iter=300, learning_rate=0.1, max_depth=3, early_stopping=True, validation_fraction=0.2, n_iter_no_change=10, random_state=0).fit(X_train, y_train)\n_a = _ras(y_test, _m.predict_proba(X_test)[:, 1])\nassert abs(auc_cat - _a) < 1e-6, f\"auc_cat должен быть ≈ {_a:.3f}: проверьте параметры и random_state=0\"" }, hints: ["<code>for c in cat: X[c] = X[c].astype('category')</code> — до разбиения", "<code>roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])</code>"] },
        { prompt: "Коллега обучил CatBoost так: <code>model.fit(X_train, y_train, eval_set=(X_test, y_test))</code>, <code>early_stopping_rounds=50</code>. Затем отчитался, что на том же <code>X_test</code> AUC = 0.86. В чём проблема?", options: ["Проблемы нет, это стандартный подход", "Число деревьев выбрано с оглядкой на test, поэтому 0.86 слишком оптимистично: для eval_set нужна отдельная validation из train", "early_stopping_rounds слишком большой", "В CatBoost нельзя передавать eval_set"], explain: "Early stopping — это подбор гиперпараметра (числа деревьев). Если делать его на test, test становится «увиденным». Train → validation (остановка) → test (одна оценка)." },
        { prompt: "Код LightGBM: <code>LGBMClassifier(n_estimators=2000, learning_rate=0.03)</code> + <code>callbacks=[lgb.early_stopping(100)]</code>. После обучения <code>model.best_iteration_</code> = 412. Что это значит?", options: ["Модель использует все 2000 деревьев", "Метрика на validation была лучшей на 412-м дереве; после этого 100 шагов улучшения не было, и обучение остановилось", "Модель обучалась 412 секунд", "Важными признаны 412 признаков"], explain: "n_estimators — верхняя граница. Early stopping запоминает лучшую итерацию: при прогнозе используются именно эти 412 деревьев." }
      ]
    },
    "mp-pca": {
      title: "PCA и снижение размерности",
      body: `
<p>Число комнат и площадь квартиры говорят об одном и том же: насколько квартира большая. Столбцов два, а информация почти одна (корреляция 0.92). Если признаков не 5, а 500, таких повторов много: модель замедляется, overfitting растёт, а нарисовать данные на графике невозможно.</p>
<p><b>PCA</b> (Principal Component Analysis) поворачивает признаки к <b>новым осям</b>. Первая ось (PC1) — направление, вдоль которого данные разбросаны сильнее всего. Вторая (PC2) перпендикулярна ей и забирает наибольшую часть оставшегося разброса. В последних осях информации мало, их можно отбросить.</p>
<h3>Пример по шагам: 5 числовых признаков flats</h3>
<pre><code>from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

num = ['rooms', 'area_m2', 'floor', 'floors_total', 'year_built']
Xs = StandardScaler().fit_transform(flats[num])
pca = PCA(n_components=2)
X2 = pca.fit_transform(Xs)                 # (400, 2)
print(pca.explained_variance_ratio_)       # [0.387 0.306]</code></pre>
<ol>
<li><b>Сначала масштаб.</b> PCA смотрит на дисперсию. Без масштабирования побеждает столбец с самыми большими числами: на сырых данных PC1 — это фактически просто <code>area_m2</code> (вес 0.97).</li>
<li><code>explained_variance_ratio_</code>: PC1 сохраняет 38.7% общего разброса, PC2 — 30.6%. Вместе 69%.</li>
<li><code>pca.components_</code> показывает «рецепт» каждой оси. PC1 ≈ 0.69 · rooms + 0.69 · area_m2 — «размер квартиры». PC2 ≈ 0.69 · floor + 0.70 · floors_total — «высота дома».</li>
</ol>
<table>
<tr><th>Число компонент</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>Накопленная дисперсия</td><td>0.387</td><td>0.693</td><td>0.891</td><td>0.983</td><td>1.000</td></tr>
</table>
<p>Распространённое правило: брать столько компонент, чтобы сохранить 90–95% дисперсии. Здесь для 90% нужны 4 компоненты (3 дают 89.1%). Короткий путь: <code>PCA(n_components=0.9)</code>.</p>
<h3>Для чего применяют PCA</h3>
<ul>
<li><b>Визуализация</b>: свести 20 признаков к 2 осям и построить scatter plot; увидеть кластеры (KMeans) глазами.</li>
<li><b>Сжатие и подавление шума</b>: сотни коррелированных признаков (датчики, анкеты, пиксели изображений).</li>
<li><b>Шаг перед моделью</b>: внутри Pipeline <code>StandardScaler → PCA → модель</code>.</li>
</ul>
<p>У сжатия есть цена. 5-fold R² для LinearRegression на flats: 0.663 со всеми 5 признаками, 0.644 с 3 компонентами, 0.535 с 2 компонентами. PCA не смотрит на target: он сохраняет разброс, а признак с небольшим разбросом (<code>year_built</code>) может быть важен для цены.</p>
<div class="tip">PCA — шаг, который учится на данных. Его тоже нужно <code>fit</code> только на train и держать внутри Pipeline, иначе будет leakage.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Делать PCA без StandardScaler.</li>
<li>Сделать fit PCA на всех данных, а затем делить.</li>
<li>Трактовать компоненты как «признаки»: PC1 — смесь нескольких столбцов, объяснить её бизнесу трудно. Там, где важна интерпретация (скоринг), PCA не применяют.</li>
<li>Применять PCA к категориальным one-hot столбцам: смысла мало.</li>
<li>Считать PCA обязательным на данных с 5–10 признаками. Он полезен на сотнях признаков.</li>
</ul>`,
      ex: [
        { prompt: "Отмасштабируйте 5 числовых признаков flats через <code>StandardScaler</code> (<code>Xs</code>) и обучите <code>PCA(n_components=2)</code> под именем <code>pca</code>. Запишите преобразованные данные в <code>X2</code>, а долю дисперсии каждой компоненты — в <code>evr</code>.", check: { tests: "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_Xs = _SS().fit_transform(X)\n_e = _PCA(n_components=2).fit(_Xs).explained_variance_ratio_\n_raw = _PCA(n_components=2).fit(X).explained_variance_ratio_\nassert _np.asarray(X2).shape == (400, 2), \"X2 — 400 строк, 2 столбца: pca.fit_transform(Xs)\"\nassert len(evr) == 2, \"evr — два числа: pca.explained_variance_ratio_\"\nassert not _np.allclose(evr, _raw, atol=1e-3), \"Сначала отмасштабируйте: StandardScaler().fit_transform(X). Без масштаба PC1 получается просто area_m2\"\nassert _np.allclose(evr, _e, atol=1e-6), f\"evr должен быть ≈ {_e.round(3)}\"\nassert abs(abs(_np.corrcoef(_np.asarray(X2)[:, 0], _Xs[:, 1])[0, 1]) - 1) < 0.1, \"Первый столбец X2 должен быть тесно связан с area_m2\"" }, hints: ["<code>Xs = StandardScaler().fit_transform(X)</code>", "<code>X2 = pca.fit_transform(Xs)</code>, <code>evr = pca.explained_variance_ratio_</code>"] },
        { prompt: "Обучите <code>PCA()</code> со всеми компонентами и запишите накопленную долю дисперсии в массив <code>cum</code> (<code>np.cumsum</code>). <code>n90</code> — наименьшее число компонент, сохраняющее не менее 90% дисперсии.", check: { tests: "import numpy as _np\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.decomposition import PCA as _PCA\n_Xs = _SS().fit_transform(X)\n_c = _np.cumsum(_PCA().fit(_Xs).explained_variance_ratio_)\nassert len(cum) == 5, \"cum — 5 чисел: накопленная доля всех компонент\"\nassert _np.allclose(_np.asarray(cum, dtype=float), _c, atol=1e-6), f\"cum должен быть ≈ {_c.round(3)}: np.cumsum(pca.explained_variance_ratio_)\"\nassert n90 == int(_np.argmax(_c >= 0.9)) + 1, \"n90: первая позиция, где cum >= 0.9 (считая с 1). 3 компоненты дают 0.891 — этого мало\"" }, hints: ["<code>cum = np.cumsum(PCA().fit(Xs).explained_variance_ratio_)</code>", "<code>np.argmax(cum &gt;= 0.9)</code> даёт индекс первого True (с 0), прибавьте к нему 1"] },
        { prompt: "PCA нашёл три компоненты, их дисперсии равны 6, 3 и 1. Какую долю общей дисперсии сохраняют первые две компоненты?", explain: "(6 + 3) / (6 + 3 + 1) = 9 / 10 = 0.9. Отбросив третью компоненту, мы теряем только 10% информации." },
        { prompt: "В данных есть <code>income</code> (в тенге, 100 000 – 2 000 000) и <code>age</code> (18–70). Что будет, если сделать PCA без масштабирования?", options: ["Ничего, PCA не зависит от масштаба", "PC1 почти целиком окажется income: его дисперсия численно больше в миллионы раз", "PCA выдаст ошибку", "age окажется важнее"], explain: "PCA ищет направление наибольшей дисперсии. Столбец с крупными единицами подавляет все остальные. Поэтому сначала StandardScaler." }
      ]
    },
    "mp-text": {
      title: "Текстовые признаки: TF-IDF + логистическая регрессия",
      body: `
<p>На маркетплейс приходят тысячи отзывов в день. Какие из них жалобы, а какие благодарности? Человек не успеет прочитать все. Модель текст не понимает — ей нужны <b>числа</b>. Самый простой и до сих пор сильный способ превратить текст в числа — <b>TF-IDF</b>.</p>
<p>Данные: <code>reviews.csv</code> — 300 коротких отзывов на казахском и русском (вперемешку, как в реальных данных в Казахстане). Столбцы: <code>text</code>, <code>label</code> (positive / negative), <code>lang</code>.</p>
<h3>Bag of words: мешок слов</h3>
<p>Каждое уникальное слово — столбец. Каждый отзыв — строка. В ячейке — сколько раз слово встречается в этом отзыве. Порядок слов теряется (поэтому «мешок»).</p>
<h3>TF-IDF: редкое слово ценнее</h3>
<p>Слова вроде «және» («и» по-казахски), «и», «өте» («очень») встречаются везде, пользы от них мало. TF-IDF даёт каждому слову вес:</p>
<ul>
<li><b>TF</b> (term frequency): сколько раз слово встречается в этом отзыве.</li>
<li><b>IDF</b> (inverse document frequency): чем в меньшем числе отзывов встречается слово, тем он выше. В sklearn: <code>idf = ln((1 + n) / (1 + df)) + 1</code>, где n — число отзывов, df — число отзывов со словом.</li>
</ul>
<ol>
<li>В train 225 отзывов. Допустим, слово «және» встречается в 100 отзывах: idf = ln(226 / 101) + 1 ≈ 1.81.</li>
<li>А если слово «дөрекі» («грубый») встречается только в 3 отзывах: idf = ln(226 / 4) + 1 ≈ 5.03. Вес примерно в 3 раза выше.</li>
<li>В конце каждая строка нормируется до длины 1: длинные и короткие отзывы уравниваются.</li>
</ol>
<h3>Пример по шагам</h3>
<pre><code>from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

df = pd.read_csv('reviews.csv')
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.25, random_state=0, stratify=df['label'])

vec = TfidfVectorizer()
V_train = vec.fit_transform(X_train)   # словарь учится на train
V_test = vec.transform(X_test)         # только transform!
print(V_train.shape)                   # (225, 113): 113 уникальных слов

model = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
                  ('clf', LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)
print(model.score(X_test, y_test))     # 0.947</code></pre>
<ol>
<li><code>TfidfVectorizer</code> переводит текст в нижний регистр, делит на слова и строит матрицу. Результат — <b>sparse</b>-матрица: большинство ячеек равны 0, в памяти хранятся только ненулевые.</li>
<li>Признаков много (сотни, в реальном проекте — десятки тысяч), каждый слабый. Для таких данных <b>LogisticRegression</b> — классический выбор: быстрая, с регуляризацией (параметр C), коэффициенты можно читать.</li>
<li><code>ngram_range=(1, 2)</code> делает признаками не только отдельные слова, но и <b>пары слов</b> (биграммы): «не понравилось», «сай емес» («не соответствует»), «өте нашар» («очень плохо»). Модель на отдельных словах считает слово «понравилось» хорошим, а «не» стоит отдельно. Здесь accuracy 0.933 → 0.947.</li>
<li>Коэффициенты: самая отрицательная n-грамма — «не», самая положительная — «всем» («всем рекомендую»). Само слово «рекомендую» есть в обоих классах («никому не рекомендую»), поэтому модель опирается на соседние слова.</li>
</ol>
<p>Где модель ошибается? На смешанных отзывах: «Курьер дөрекі екен бірақ тез жеткізді» («Курьер был груб, но доставил быстро»). Мешок слов не знает, что часть после «бірақ» («но») важнее. Для таких случаев нужны модели, учитывающие порядок слов (трансформеры), но в качестве baseline первым всегда проверяют TF-IDF + LogisticRegression.</p>
<div class="tip">Казахский язык агглютинативный: «ұнады», «ұнамады», «ұнайды» («понравилось», «не понравилось», «нравится») — один корень, но три разных слова-столбца. Помогает такой приём: символьные n-граммы, <code>TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4))</code>. Он делает признаками части слова («ұна», «мады»).</div>
<h3>Частые ошибки</h3>
<ul>
<li>Делать <code>fit</code> векторизатора на всех данных: словарь и IDF учатся и на test — это leakage. Pipeline от этого защищает.</li>
<li>Вызывать <code>fit_transform</code> на test: число и порядок столбцов меняются, модель их не понимает.</li>
<li>Превращать sparse-матрицу в полный массив через <code>.toarray()</code>: на больших данных не хватит памяти.</li>
<li>Смотреть только на accuracy: если жалобы редкие (5%), проверяйте precision и recall.</li>
<li>Не читать неверно классифицированные примеры. Для текста просмотр ошибок глазами — самая полезная диагностика.</li>
</ul>`,
      ex: [
        { prompt: "Разбиение готово. Создайте <code>TfidfVectorizer()</code> под именем <code>vec</code> и получите матрицу <code>V_train</code> из текстов train. Преобразуйте тексты test в <code>V_test</code> <b>с тем же словарём</b>. Запишите число слов в словаре в <code>n_words</code>.", check: { tests: "from sklearn.feature_extraction.text import TfidfVectorizer as _TV\n_v = _TV().fit(X_train)\n_n = len(_v.vocabulary_)\nassert V_train.shape == (225, _n), f\"Размер V_train должен быть (225, {_n}): vec.fit_transform(X_train)\"\nassert V_test.shape == (75, _n), f\"Размер V_test должен быть (75, {_n}). Для test вызывайте не fit_transform, а vec.transform(X_test)\"\nassert n_words == _n, f\"n_words = {_n}: len(vec.vocabulary_)\"\nassert abs(V_test.sum() - _v.transform(X_test).sum()) < 1e-6, \"V_test должен считаться по словарю train: vec.transform(X_test)\"" }, hints: ["<code>V_train = vec.fit_transform(X_train)</code>", "<code>V_test = vec.transform(X_test)</code>, <code>n_words = len(vec.vocabulary_)</code>"] },
        { prompt: "Постройте Pipeline с именем <code>model</code>: шаги <code>'tfidf'</code> — <code>TfidfVectorizer(ngram_range=(1, 2))</code> и <code>'clf'</code> — <code>LogisticRegression(max_iter=1000)</code>. Обучите на train и запишите accuracy на test в <code>acc</code>. Запишите n-грамму с самым отрицательным коэффициентом в <code>top_neg</code>, а с самым положительным — в <code>top_pos</code> (<code>get_feature_names_out()</code> и <code>coef_[0]</code>).", check: { tests: "import numpy as _np\nfrom sklearn.feature_extraction.text import TfidfVectorizer as _TV\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.pipeline import Pipeline as _P\n_m = _P([('tfidf', _TV(ngram_range=(1, 2))), ('clf', _LR(max_iter=1000))]).fit(X_train, y_train)\n_nm = _m['tfidf'].get_feature_names_out(); _cf = _m['clf'].coef_[0]\nassert isinstance(model, _P) and hasattr(model[-1], 'coef_'), \"model — обученный Pipeline (tfidf + clf)\"\nassert len(model[0].vocabulary_) == len(_nm), f\"В словаре должно быть {len(_nm)} n-грамм: TfidfVectorizer(ngram_range=(1, 2))\"\nassert abs(acc - _m.score(X_test, y_test)) < 1e-6, f\"acc должна быть ≈ {_m.score(X_test, y_test):.3f}: model.score(X_test, y_test)\"\nassert str(top_neg) == str(_nm[_np.argmin(_cf)]), \"top_neg — n-грамма с наименьшим coef_[0]: names[np.argmin(coef)]\"\nassert str(top_pos) == str(_nm[_np.argmax(_cf)]), \"top_pos — n-грамма с наибольшим coef_[0]: names[np.argmax(coef)]\"" }, hints: ["<code>names = model['tfidf'].get_feature_names_out()</code>, <code>coef = model['clf'].coef_[0]</code>", "<code>top_neg = names[np.argmin(coef)]</code>. Положительный коэффициент — класс <code>positive</code>, потому что <code>classes_</code> идут по алфавиту: negative, positive"] },
        { prompt: "Почему отзыв «Товар не понравился» модель на отдельных словах (unigram) часто классифицирует неверно, а <code>ngram_range=(1, 2)</code> помогает?", options: ["Биграммы ускоряют модель", "В unigram «не» и «понравился» — отдельные признаки, а биграмма делает сочетание «не понравился» одним признаком и ловит отрицание", "Unigram не поддерживает русский язык", "Биграммы уменьшают словарь"], explain: "Мешок слов теряет порядок. Биграмма хранит два соседних слова вместе и превращает отрицание «не + слово» в признак. Цена: словарь вырастает в несколько раз (здесь 113 → 429)." },
        { prompt: "Коллега выполнил <code>TfidfVectorizer().fit_transform(df['text'])</code> на всех данных, а затем разделил их на train/test. Что не так?", options: ["Ничего, в тексте leakage не бывает", "Словарь и веса IDF учились и на текстах test: это leakage. Векторизатор должен делать fit только на train, внутри Pipeline", "TF-IDF нельзя применять после разбиения", "Вместо fit_transform нужен был predict"], explain: "Любой шаг, который учится на данных (scaler, imputer, PCA, векторизатор), делает fit только на train." }
      ]
    },
    "mp-ops": {
      title: "Мониторинг модели: MLflow, дрейф по PSI и out-of-time валидация",
      body: `
<p>В день выхода в production работа модели не заканчивается — она начинается. Мир меняется: зарплаты растут, приходят новые клиенты, экономику лихорадит. Модель, которая вчера работала хорошо, сегодня молча деградирует. Почти в половине DS-вакансий в Казахстане есть требование «валидация и мониторинг моделей: PSI, Gini, out-of-time», особенно в банках. Этот урок — об этом.</p>
<p>Данные: <code>loans.csv</code> — 1 260 кредитных заявок за 18 месяцев (2024-01 … 2025-06). Столбцы: <code>month</code>, <code>age</code>, <code>income</code> (тыс. ₸), <code>debt_ratio</code> (долговая нагрузка), <code>delays_12m</code> (число просрочек), <code>employment_years</code>, <code>default</code> (1 — кредит не возвращён).</p>
<h3>1. Учёт экспериментов: MLflow</h3>
<p>В одном проекте обучают сотни вариантов модели. Через три недели на вопрос «с какими параметрами был Gini 0.52?» ответа уже нет. <b>MLflow</b> записывает каждый запуск (run) в журнал:</p>
<pre><code>import mlflow
with mlflow.start_run(run_name='logreg_C1'):
    mlflow.log_param('C', 1.0)                  # параметры
    mlflow.log_param('train_period', '2024-01..2024-09')
    model.fit(X_train, y_train)
    mlflow.log_metric('gini_val', 0.47)         # метрики
    mlflow.log_metric('gini_oot', 0.41)
    mlflow.sklearn.log_model(model, 'model')    # сама модель (артефакт)</code></pre>
<p>Результат — таблица: каждая строка — один эксперимент, столбцы — параметры и метрики. Лучший вы выбираете и регистрируете в <b>Model Registry</b> (с номером версии). В браузере MLflow нет, но идея проста: <b>параметры + период данных + метрики + файл модели</b> хранятся вместе. Это можно сделать даже обычным списком словарей.</p>
<h3>2. Out-of-time (OOT) валидация</h3>
<p>Случайный test даёт модели «других клиентов того же периода». А в production модель работает с <b>будущими</b> клиентами. OOT — более поздний период, который модель не видела вообще:</p>
<table>
<tr><th>Часть</th><th>Период</th><th>Gini</th><th>Средний прогноз (PD)</th><th>Фактический default</th></tr>
<tr><td>Train (70%)</td><td>2024-01 … 2024-09</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>Validation (30%, случайно)</td><td>2024-01 … 2024-09</td><td>0.47</td><td>10.6%</td><td>11.6%</td></tr>
<tr><td><b>OOT</b></td><td>2025-01 … 2025-06</td><td><b>0.41</b></td><td><b>13.2%</b></td><td><b>23.3%</b></td></tr>
</table>
<ol>
<li>Gini упал с 0.47 до 0.41: модель стала чуть хуже различать клиентов.</li>
<li>Ещё важнее: модель ожидала 13.2% дефолтов, а фактически их 23.3%. Порядок почти верный, но <b>уровень</b> неверный. Если банк посчитает резервы по этому прогнозу, он недооценит потери почти вдвое.</li>
<li>Решение: <b>рекалибровка</b> (заново подстроить вероятности под новые данные) или переобучение модели на новом периоде.</li>
</ol>
<h3>3. PSI: изменились ли данные?</h3>
<p>Факт дефолта становится известен только через месяцы после выдачи кредита. А изменение <b>входных данных</b> видно сразу. <b>PSI</b> (Population Stability Index) сравнивает распределение одного признака в двух периодах.</p>
<ol>
<li>Делим значения старого периода на группы (bin), обычно 10 квантилей.</li>
<li>Для каждой группы: <code>e</code> — доля в старом периоде, <code>a</code> — доля в новом периоде.</li>
<li><code>PSI = Σ (a − e) · ln(a / e)</code>.</li>
</ol>
<p>Пример вручную, 4 группы. Раньше в каждой группе было по 25%. Сейчас: 10%, 20%, 30%, 40%.</p>
<table>
<tr><th>Группа</th><th>e</th><th>a</th><th>(a − e) · ln(a / e)</th></tr>
<tr><td>1</td><td>0.25</td><td>0.10</td><td>(−0.15) · ln(0.4) = 0.137</td></tr>
<tr><td>2</td><td>0.25</td><td>0.20</td><td>(−0.05) · ln(0.8) = 0.011</td></tr>
<tr><td>3</td><td>0.25</td><td>0.30</td><td>0.05 · ln(1.2) = 0.009</td></tr>
<tr><td>4</td><td>0.25</td><td>0.40</td><td>0.15 · ln(1.6) = 0.071</td></tr>
<tr><td colspan="3"><b>PSI</b></td><td><b>0.228</b></td></tr>
</table>
<table>
<tr><th>PSI</th><th>Толкование</th><th>Действие</th></tr>
<tr><td>&lt; 0.1</td><td>стабильно</td><td>ничего</td></tr>
<tr><td>0.1 – 0.25</td><td>умеренный сдвиг</td><td>наблюдать, искать причину</td></tr>
<tr><td>&gt; 0.25</td><td>сильный сдвиг</td><td>проверить модель, рекалибровка или переобучение</td></tr>
</table>
<p>В loans между 2024 и 2025 годами: PSI для <code>income</code> = <b>0.35</b> (номинальные зарплаты выросли), для <code>debt_ratio</code> 0.15, для <code>age</code> 0.12, у остальных ниже 0.05. Модель понимает «доход 450 тыс.» в смысле 2024 года, а в 2025 году та же сумма означает другой уровень жизни. Это одна из причин ошибки на OOT.</p>
<div class="tip">PSI считают не только по признакам, но и по <b>скору</b> модели: если распределение прогнозов изменилось, это первый сигнал. На дашборде мониторинга обычно стоят три вещи: PSI признаков, PSI скора и (когда появятся фактические данные) Gini.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Оценивать модель только на случайном test и не делать OOT.</li>
<li>Брать границы групп для PSI из новых данных. Границы всегда берутся из <b>старого</b> (эталонного) периода.</li>
<li><code>ln(0)</code> в пустой группе: ограничивайте доли снизу маленьким числом (например, 0.0001).</li>
<li>Сразу решать, что высокий PSI = плохая модель. PSI — повод для проверки; качество показывают Gini и калибровка.</li>
<li>Думать, что при стабильном Gini всё хорошо: Gini измеряет порядок, а уровень PD (калибровка) может сломаться отдельно.</li>
<li>Не записывать результаты экспериментов: вопрос «на каких данных, с какими параметрами» возникнет обязательно.</li>
</ul>`,
      ex: [
        { prompt: "Напишите функцию <code>psi_from_shares(e, a)</code>: она принимает два массива долей и возвращает <code>Σ (a − e) · ln(a / e)</code>. Чтобы не делить на ноль, сначала ограничьте оба массива через <code>np.clip(..., 0.0001, None)</code>. Запишите результат для примера из урока в <code>psi_example</code>.", check: { tests: "import numpy as _np\nassert psi_example is not None and abs(psi_example - 0.228217) < 1e-4, \"psi_example должен быть ≈ 0.228: np.sum((a - e) * np.log(a / e))\"\nassert abs(psi_from_shares([0.5, 0.5], [0.5, 0.5])) < 1e-12, \"При одинаковых долях PSI = 0\"\nassert abs(psi_from_shares([0.5, 0.5], [0.3, 0.7]) - 0.169460) < 1e-4, \"psi_from_shares([0.5, 0.5], [0.3, 0.7]) должен быть ≈ 0.169\"\n_z = psi_from_shares([0.5, 0.5, 0.0], [0.4, 0.5, 0.1])\nassert _np.isfinite(_z) and _z > 0, \"На пустой группе не должно быть ошибки: ограничьте доли через np.clip(x, 0.0001, None)\"" }, hints: ["<code>e = np.clip(np.asarray(e, dtype=float), 0.0001, None)</code>, так же и для <code>a</code>", "<code>return float(np.sum((a - e) * np.log(a / e)))</code>"] },
        { prompt: "В стартере готова функция <code>psi(expected, actual)</code>: она строит 10 квантильных групп по старому периоду и возвращает PSI. <code>old</code> — заявки 2024 года, <code>new</code> — заявки 2025 года (<code>month</code> — строковый столбец, сравнивайте с <code>'2025-01'</code>). Для каждого признака из списка <code>F</code> запишите PSI в словарь <code>psi_table</code>. Признаки с PSI &gt; 0.25 соберите в список <code>drifted</code>.", starter: "import pandas as pd\nimport numpy as np\ndf = pd.read_csv('loans.csv')\nF = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n\ndef psi(expected, actual, bins=10):\n    expected = np.asarray(expected, dtype=float)\n    actual = np.asarray(actual, dtype=float)\n    edges = np.quantile(expected, np.linspace(0, 1, bins + 1))   # границы берутся из старого периода\n    edges[0], edges[-1] = -np.inf, np.inf\n    e = np.clip(np.histogram(expected, edges)[0] / len(expected), 0.0001, None)\n    a = np.clip(np.histogram(actual, edges)[0] / len(actual), 0.0001, None)\n    return float(np.sum((a - e) * np.log(a / e)))\n\npsi_table = {}\n", check: { tests: "import pandas as _pd, numpy as _np\n_d = _pd.read_csv('loans.csv')\n_o = _d[_d['month'] < '2025-01']; _n = _d[_d['month'] >= '2025-01']\ndef _psi(ex, ac, bins=10):\n    ex = _np.asarray(ex, dtype=float); ac = _np.asarray(ac, dtype=float)\n    ed = _np.quantile(ex, _np.linspace(0, 1, bins + 1)); ed[0], ed[-1] = -_np.inf, _np.inf\n    e = _np.clip(_np.histogram(ex, ed)[0] / len(ex), 0.0001, None); a = _np.clip(_np.histogram(ac, ed)[0] / len(ac), 0.0001, None)\n    return float(_np.sum((a - e) * _np.log(a / e)))\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_t = {f: _psi(_o[f], _n[f]) for f in _F}\nassert len(old) == 840 and len(new) == 420, f\"old должен быть 840 строк (2024), new — 420 (2025), у вас {len(old)} и {len(new)}\"\nassert sorted(psi_table) == sorted(_F), \"Ключи psi_table — пять признаков из списка F\"\nassert all(abs(psi_table[f] - _t[f]) < 1e-6 for f in _F), \"Значения PSI не совпадают: psi(old[f], new[f]) — первый аргумент — старый период\"\nassert list(drifted) == [f for f in _F if _t[f] > 0.25], \"drifted — признаки с PSI > 0.25 (в порядке F)\"" }, hints: ["<code>old = df[df['month'] &lt; '2025-01']</code>, <code>new = df[df['month'] &gt;= '2025-01']</code>", "<code>psi_table[f] = psi(old[f], new[f])</code>; <code>drifted = [f for f in F if psi_table[f] &gt; 0.25]</code>"] },
        { prompt: "Out-of-time валидация. <code>dev</code> — заявки до <code>2024-09</code> (включительно), <code>oot</code> — начиная с <code>2025-01</code>. Разбейте <code>dev</code> на train/validation через <code>train_test_split(test_size=0.3, random_state=0, stratify=...)</code>. Обучите на train <code>model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))</code>. Посчитайте: <code>gini_val</code>, <code>gini_oot</code> (2 · AUC − 1), <code>pd_pred</code> (средняя прогнозная вероятность на OOT), <code>pd_fact</code> (фактическая доля default на OOT).", check: { tests: "import pandas as _pd\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.linear_model import LogisticRegression as _LR\nfrom sklearn.metrics import roc_auc_score as _ras\n_d = _pd.read_csv('loans.csv')\n_F = ['age', 'income', 'debt_ratio', 'delays_12m', 'employment_years']\n_dev = _d[_d['month'] <= '2024-09']; _oot = _d[_d['month'] >= '2025-01']\n_a, _b, _c, _e = _tts(_dev[_F], _dev['default'], test_size=0.3, random_state=0, stratify=_dev['default'])\n_m = _mp(_SS(), _LR(max_iter=1000)).fit(_a, _c)\n_gv = 2 * _ras(_e, _m.predict_proba(_b)[:, 1]) - 1\n_po = _m.predict_proba(_oot[_F])[:, 1]\n_go = 2 * _ras(_oot['default'], _po) - 1\nassert len(dev) == 630 and len(oot) == 420, f\"dev должен быть 630 строк, oot — 420, у вас {len(dev)} и {len(oot)}\"\nassert abs(gini_val - _gv) < 1e-6, f\"gini_val должен быть ≈ {_gv:.3f}: 2 * AUC - 1 на validation\"\nassert abs(gini_oot - _go) < 1e-6, f\"gini_oot должен быть ≈ {_go:.3f}: модель обучается только на train, на OOT только оценивается\"\nassert abs(pd_pred - _po.mean()) < 1e-6, f\"pd_pred ≈ {_po.mean():.3f}: среднее predict_proba[:, 1] на OOT\"\nassert abs(pd_fact - _oot['default'].mean()) < 1e-9, f\"pd_fact ≈ {_oot['default'].mean():.3f}: oot['default'].mean()\"\nassert pd_fact > pd_pred, \"На этих данных модель недооценивает риск на OOT\"" }, hints: ["<code>dev = df[df['month'] &lt;= '2024-09']</code>, <code>oot = df[df['month'] &gt;= '2025-01']</code>", "Разбиение: <code>train_test_split(dev[F], dev['default'], test_size=0.3, random_state=0, stratify=dev['default'])</code>", "<code>p_oot = model.predict_proba(oot[F])[:, 1]</code>; <code>pd_pred = p_oot.mean()</code>"] },
        { prompt: "Ежемесячный мониторинг скоринговой модели: PSI для <code>income</code> = 0.31, Gini упал с 0.52 до 0.50, а прогнозный дефолт 8% при фактическом 14%. Какое действие самое правильное?", options: ["Ничего не делать: Gini почти не изменился", "PSI &gt; 0.25 и калибровка нарушена: разобрать причину и рекалибровать модель или переобучить её на новых данных", "Немедленно удалить признак income", "Вернуть threshold к 0.5"], explain: "Gini измеряет только порядок. Уровень (PD) ошибочен почти вдвое — резервы и ценообразование искажаются. PSI показывает, от какого признака идёт сдвиг." },
        { prompt: "Что как минимум должно сохраняться для каждого run в MLflow (или любом журнале экспериментов)?", options: ["Только лучшая метрика", "Параметры, период/версия данных, метрики и файл модели: чтобы результат можно было воспроизвести в любой момент", "Только код", "Только файл модели"], explain: "Смысл эксперимента — воспроизводимость (reproducibility). Метрика без параметров и данных — просто число." }
      ]
    },
    "mp-anom": {
      title: "Поиск аномалий и основы антифрода",
      body: `
<p>Банковской картой в 3 часа ночи, с нового телефона, из-за границы оплатили 400 000 ₸. Мошенничество? Антифрод-система должна решить это за несколько миллисекунд. Сложность в том, что мошенничество очень редкое (меньше 1%), размеченных примеров мало, а мошенники постоянно меняют приёмы. Поэтому здесь кроме обычной classification применяют <b>поиск аномалий</b>: ищут «то, что не похоже на нормальное».</p>
<p>Данные: <code>transactions.csv</code> — 1 000 транзакций, 30 из них мошеннические (3%). Столбцы: <code>amount</code> (₸), <code>hour</code>, <code>tx_24h</code> (число транзакций за последние сутки), <code>new_device</code>, <code>foreign</code>, <code>is_fraud</code>.</p>
<h3>Слой 1: простые правила</h3>
<p><b>Правило IQR</b> (знакомо по M3.1): если значение выше <code>Q3 + 1.5 · IQR</code> — это выброс (outlier).</p>
<ol>
<li><code>amount</code>: Q1 = 4 800, Q3 = 14 725. IQR = 9 925.</li>
<li>Верхняя граница = 14 725 + 1.5 · 9 925 = 29 612.5 ₸.</li>
<li>Границу превышают 76 транзакций. Из них 24 действительно мошеннические.</li>
<li>Recall = 24 / 30 = 0.80, precision = 24 / 76 = 0.32. Две тревоги из трёх ложные.</li>
</ol>
<p>Правило <b>z-score</b> похожее: <code>|x − среднее| / std &gt; 3</code>. Для скошенных (skewed) распределений, таких как сумма, сначала лучше взять логарифм. Бизнес-правила тоже относятся к этому слою: «новое устройство <b>и</b> заграница», «8+ транзакций в сутки».</p>
<p>Преимущества правил: они понятны, быстры, их легко объяснить регулятору. Недостаток: они смотрят на признаки по одному. Транзакцию со средней суммой, но сделанную <i>ночью + с нового устройства + часто</i>, они не поймают.</p>
<h3>Слой 2: IsolationForest</h3>
<p>Идея: аномалию <b>легко изолировать</b> от остальных. Выбираем случайный признак и случайный порог и делим данные снова и снова. Нормальная точка находится внутри плотной группы, чтобы отделить её, нужно много шагов. Необычная точка стоит на краю — после двух-трёх делений она остаётся одна. Чем меньше средняя «глубина» в сотне случайных деревьев, тем подозрительнее точка.</p>
<pre><code>from sklearn.ensemble import IsolationForest
F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']
iso = IsolationForest(n_estimators=100, contamination=0.03, random_state=0)
iso.fit(df[F])                       # is_fraud НЕ ВИДИТ: unsupervised
score = -iso.score_samples(df[F])    # выше = подозрительнее
top = df.assign(score=score).sort_values('score', ascending=False).head(30)
print(top['is_fraud'].mean())        # 0.83</code></pre>
<ol>
<li>Модель не получает <code>is_fraud</code>. Она только ищет, «кто необычный». Метка (label) нужна только для оценки.</li>
<li><code>contamination=0.03</code> — предположение о доле аномалий; оно влияет только на порог <code>predict</code>.</li>
<li><code>score_samples</code> идёт с обратным знаком: ниже = аномалия. Для удобства переворачиваем его минусом.</li>
</ol>
<h3>Precision@k: время аналитика ограничено</h3>
<p>Отдел антифрода может проверить вручную, скажем, только 30 транзакций в день. Поэтому вопрос звучит так: «сколько из <b>k</b> самых подозрительных транзакций действительно мошеннические?»</p>
<table>
<tr><th>Подход</th><th>Число тревог</th><th>Мошенничество</th><th>Precision</th></tr>
<tr><td>Правило IQR (amount)</td><td>76</td><td>24</td><td>0.32</td></tr>
<tr><td>IsolationForest, топ-10</td><td>10</td><td>10</td><td>1.00</td></tr>
<tr><td>IsolationForest, топ-30</td><td>30</td><td>25</td><td><b>0.83</b></td></tr>
</table>
<h3>Реальная система: слои</h3>
<ul>
<li><b>Правила</b>: жёсткие, понятные случаи (лимиты, чёрные списки). Блокируют сразу.</li>
<li><b>Supervised-модель</b> (boosting): если есть размеченная история мошенничества. Хорошо ловит известные схемы. Метрики: PR-AUC, recall при заданной precision.</li>
<li><b>Детектор аномалий</b>: для новых, ранее не встречавшихся схем.</li>
<li><b>Аналитик</b>: вручную проверяет подозрительные случаи и ставит метки. Эти метки становятся данными для следующей модели.</li>
</ul>
<div class="tip">Аномалия ≠ мошенничество. IsolationForest находит «необычную» транзакцию: это может быть и крупная, но законная покупка состоятельного клиента. Поэтому результат — не «заблокировать», а «отправить на проверку».</div>
<h3>Частые ошибки</h3>
<ul>
<li>Измерять качество через accuracy: модель «всё чисто» получает 97%.</li>
<li>Случайно передать <code>is_fraud</code> в IsolationForest как признак.</li>
<li>Не задать <code>random_state</code>: деревья случайны, результат каждый раз меняется.</li>
<li>Забыть о цене ложной тревоги: каждая зря заблокированная карта — это рассерженный клиент.</li>
<li>Построить модель один раз и забыть. Мошенники адаптируются; мониторинг и переобучение обязательны.</li>
</ul>`,
      ex: [
        { prompt: "Постройте правило IQR по <code>amount</code>. <code>upper</code> = Q3 + 1.5 · IQR. <code>flag</code> — транзакции с суммой выше <code>upper</code> (bool Series). Посчитайте <code>n_flag</code> — число тревог, <code>n_caught</code> — число мошеннических среди них, а также <code>precision_rule</code> и <code>recall_rule</code>.", check: { tests: "import pandas as _pd\n_d = _pd.read_csv('transactions.csv')\n_q1, _q3 = _d['amount'].quantile(0.25), _d['amount'].quantile(0.75)\n_u = _q3 + 1.5 * (_q3 - _q1)\n_f = _d['amount'] > _u\n_c = int((_f & (_d['is_fraud'] == 1)).sum())\nassert abs(upper - _u) < 1e-6, f\"upper должен быть = {_u}: q3 + 1.5 * (q3 - q1)\"\nassert len(flag) == 1000 and int(flag.sum()) == int(_f.sum()), \"flag = df['amount'] > upper (bool Series из 1000 значений)\"\nassert n_flag == int(_f.sum()), f\"n_flag должно быть = {int(_f.sum())}\"\nassert n_caught == _c, f\"n_caught должно быть = {_c}: flag и is_fraud == 1\"\nassert abs(precision_rule - _c / _f.sum()) < 1e-9, \"precision_rule = n_caught / n_flag\"\nassert abs(recall_rule - _c / _d['is_fraud'].sum()) < 1e-9, \"recall_rule = n_caught / число всех мошеннических транзакций (30)\"" }, hints: ["<code>q1 = df['amount'].quantile(0.25)</code>, <code>q3 = df['amount'].quantile(0.75)</code>", "<code>n_caught = int((flag &amp; (df['is_fraud'] == 1)).sum())</code>"] },
        { prompt: "Обучите <code>IsolationForest(n_estimators=100, contamination=0.03, random_state=0)</code> под именем <code>iso</code> на <code>df[F]</code>. <code>score = -iso.score_samples(df[F])</code>. Запишите долю мошенничества среди 30 транзакций с самым высоким скором в <code>p_at_30</code> (precision@30). Запишите в <code>n_found</code>, сколько мошеннических транзакций среди этих 30.", check: { tests: "import pandas as _pd, numpy as _np\nfrom sklearn.ensemble import IsolationForest as _IF\n_d = _pd.read_csv('transactions.csv')\n_F = ['amount', 'hour', 'tx_24h', 'new_device', 'foreign']\n_s = -_IF(n_estimators=100, contamination=0.03, random_state=0).fit(_d[_F]).score_samples(_d[_F])\n_n = int(_d['is_fraud'].values[_np.argsort(-_s, kind='stable')[:30]].sum())\nassert len(score) == 1000, \"score — одно число на каждую транзакцию\"\nassert _np.allclose(_np.asarray(score, dtype=float), _s, atol=1e-9), \"score = -iso.score_samples(df[F]); параметры: n_estimators=100, contamination=0.03, random_state=0. is_fraud не должен быть признаком\"\nassert abs(n_found - _n) <= 1, f\"n_found должно быть = {_n}: число мошеннических среди 30 транзакций с самым высоким скором\"\nassert abs(p_at_30 - n_found / 30) < 1e-9, \"p_at_30 = n_found / 30\"" }, hints: ["<code>iso.fit(df[F])</code>, затем <code>score = -iso.score_samples(df[F])</code>", "<code>top = df.assign(score=score).sort_values('score', ascending=False).head(30)</code>"] },
        { prompt: "Антифрод-модель отправила аналитику 50 самых подозрительных транзакций. 20 из них действительно оказались мошенническими. Всего за день было 40 случаев мошенничества. Чему равна Precision@50?", explain: "Precision@50 = 20 / 50 = 0.40. Recall@50 = 20 / 40 = 0.50 — это отдельная метрика." },
        { prompt: "В банке мало размеченной истории мошенничества, а мошенники постоянно придумывают новые схемы. Какая архитектура подходит лучше всего?", options: ["Только одна supervised-модель, настроенная по accuracy", "Слои: жёсткие бизнес-правила + supervised-модель для известных схем + детектор аномалий для новых схем; подозрительные случаи идут на проверку аналитику", "Только правило IQR", "Автоматически блокировать все крупные суммы"], explain: "Каждый слой закрывает слабое место другого. Решения аналитика превращаются в новые размеченные данные и обновляют модель." }
      ]
    },
    "mp-rec": {
      title: "Основы рекомендательных систем",
      body: `
<p>«Вам может понравиться» на маркетплейсе, «Те, кто смотрел это, смотрели и вот это» в онлайн-кинотеатре — это <b>рекомендательные системы</b> (recommender systems). Цель: показать каждому пользователю несколько самых нужных ему товаров из тысяч.</p>
<p>Данные: <code>purchases.csv</code> — 415 покупок 117 клиентов по 15 товарам. Столбцы: <code>user_id</code>, <code>item</code>. Оценок (рейтингов) нет, есть только факт «купил» — это называют <b>implicit feedback</b>, в реальной жизни данные чаще всего именно такие. Названия товаров в файле на казахском.</p>
<h3>Baseline: популярность</h3>
<p>Рекомендовать всем самые продаваемые товары. Личный вкус не учитывается, но для нового клиента (о нём мы ничего не знаем — <b>cold start</b>) это единственный путь. Здесь топ-3: бөтелке (бутылка, 40), зарядтағыш (зарядка, 39), смартфон (38).</p>
<h3>Матрица user-item</h3>
<pre><code>M = pd.crosstab(df['user_id'], df['item'])   # 117 × 15, в ячейке 0 или 1</code></pre>
<p>Каждая строка — клиент, каждый столбец — товар. Теперь каждый товар — вектор длины 117: кто его купил.</p>
<h3>Сходство item-item</h3>
<p>Если два товара покупают <b>одни и те же люди</b>, они похожи. Мера — <b>косинус</b> между векторами (M4.3):</p>
<ol>
<li>Товар A купили 3 клиента: {1, 2, 3}. Товар B — 4 клиента: {2, 3, 4, 5}.</li>
<li>Общие покупатели: {2, 3} — 2 человека.</li>
<li>cos = 2 / √(3 · 4) = 2 / 3.46 ≈ 0.58.</li>
</ol>
<pre><code>from sklearn.metrics.pairwise import cosine_similarity
sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)
print(sim['смартфон'].drop('смартфон').sort_values(ascending=False).head(3))
# құлаққап      0.552
# зарядтағыш    0.546
# қап           0.429</code></pre>
<p>Модель обнаружила, что «смартфон, құлаққап (наушники), зарядтағыш (зарядка), қап (чехол) — одна группа», только по истории покупок: ей никто об этом не говорил.</p>
<h3>Рекомендация клиенту</h3>
<ol>
<li>Клиент №1 купил тышқан (мышь) и пернетақта (клавиатуру).</li>
<li>Скор каждого товара = сумма его сходств с товарами, которые купил клиент: <code>sim.values @ M.loc[1].values</code>.</li>
<li>Убираем уже купленные товары, остальные сортируем по скору.</li>
<li>Результат: сөмке (сумка), ноутбук, зарядтағыш (зарядка). Baseline по популярности предложил бы ему бөтелке (бутылку).</li>
</ol>
<h3>Как оцениваем: precision@k</h3>
<p>У каждого клиента скрываем одну покупку, по остальным строим рекомендации и проверяем, попал ли скрытый товар в топ-k. На этих данных (топ-3): популярность находит его в 36% случаев, item-item — в 56%. <b>Precision@k</b> — сколько из k рекомендованных товаров действительно пригодилось.</p>
<div class="tip">В реальных системах после офлайн-метрики обязательно проводят A/B-тест: действительно ли блок рекомендаций увеличивает продажи? Офлайн precision@k нужна только для отбора кандидатов.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Строить сложную модель без baseline. Обыграть популярность труднее, чем кажется.</li>
<li>Снова рекомендовать клиенту уже купленный товар (забыть фильтр).</li>
<li>Не разделять train и test по времени при оценке: «предсказывать» прошлое по будущим покупкам.</li>
<li>Забыть о cold start: у нового клиента и нового товара нет истории, для них нужна отдельная стратегия.</li>
<li>Рекомендовать только популярные товары: редкие, но точно подходящие товары вообще перестают показываться.</li>
</ul>`,
      ex: [
        { prompt: "Baseline по популярности: запишите названия 3 самых продаваемых товаров в список <code>top3</code> (по убыванию). Постройте матрицу user-item в <code>M</code>: <code>pd.crosstab</code>, строки — <code>user_id</code>, столбцы — <code>item</code>.", check: { tests: "import pandas as _pd\n_d = _pd.read_csv('purchases.csv')\n_vc = _d['item'].value_counts()\nassert list(top3) == list(_vc.head(3).index), \"top3 — df['item'].value_counts().head(3).index (список)\"\nassert isinstance(M, _pd.DataFrame) and M.shape == (117, 15), \"M — таблица 117 × 15: pd.crosstab(df['user_id'], df['item'])\"\nassert int(M.values.sum()) == len(_d) and int(M.values.max()) == 1, \"Ячейки M — 0/1, их сумма равна числу покупок\"\nassert int(M['смартфон'].sum()) == int(_vc['смартфон']), \"Столбцы — названия товаров\"" }, hints: ["<code>df['item'].value_counts().head(3).index</code>", "<code>M = pd.crosstab(df['user_id'], df['item'])</code>"] },
        { prompt: "<code>M</code> готова. Запишите таблицу косинусного сходства между товарами в <code>sim</code> (DataFrame 15 × 15, индекс и столбцы — названия товаров). Запишите 3 товара, наиболее похожих на смартфон (не считая его самого), в список <code>nearest</code>. Посчитайте скоры для клиента №1 и запишите в список <code>recs</code> 3 товара с самым высоким скором среди тех, что он ещё не покупал.", check: { tests: "import pandas as _pd, numpy as _np\n_d = _pd.read_csv('purchases.csv')\n_M = _pd.crosstab(_d['user_id'], _d['item'])\n_A = _M.values.astype(float); _nr = _np.sqrt((_A ** 2).sum(axis=0))\n_S = _pd.DataFrame((_A.T @ _A) / _np.outer(_nr, _nr), index=_M.columns, columns=_M.columns)\nassert isinstance(sim, _pd.DataFrame) and sim.shape == (15, 15), \"sim — DataFrame 15 × 15: сходство между товарами (используйте M.T, а не M)\"\nassert _np.allclose(sim.loc[_M.columns, _M.columns].values, _S.values, atol=1e-9), \"Значения сходства не совпадают: cosine_similarity(M.T)\"\n_ne = list(_S['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index)\nassert list(nearest) == _ne, \"nearest: sim['смартфон'].drop('смартфон').sort_values(ascending=False).head(3).index\"\n_own = _M.loc[1]\n_sc = _pd.Series(_S.values @ _own.values, index=_M.columns)[_own == 0].sort_values(ascending=False)\nassert len(recs) == 3 and not any(_own[r] == 1 for r in recs), \"recs — 3 товара, которые клиент №1 ещё не покупал\"\nassert set(recs) == set(_sc.head(3).index), \"recs: скор = sim.values @ M.loc[1].values, уберите купленные товары и возьмите 3 с самым высоким скором\"" }, hints: ["<code>sim = pd.DataFrame(cosine_similarity(M.T), index=M.columns, columns=M.columns)</code>", "<code>own = M.loc[1]</code>; <code>scores = pd.Series(sim.values @ own.values, index=M.columns)</code>; фильтр: <code>scores[own == 0]</code>"] },
        { prompt: "Система порекомендовала клиенту 5 товаров. На следующей неделе клиент купил 2 из них. Чему равна Precision@5?", explain: "Precision@5 = 2 / 5 = 0.4: сколько из рекомендованного пригодилось." }
      ]
    },
    "mp-gate": {
      title: "Экзамен модуля: ML in Practice",
      body: `
<p>Итоговая проверка. Pipeline, leakage, feature engineering, тюнинг, ансамбли, threshold и интерпретация — всё вместе. Держите модели небольшими (n_estimators ≤ 100, cv ≤ 5) и задавайте <code>random_state</code>.</p>`,
      ex: [
        { prompt: "Предскажите цену квартир flats. Создайте Pipeline (или GridSearchCV) с именем <code>model</code>: он должен принимать сырые столбцы <code>X_train</code> (district — в текстовом виде). Feature engineering и модель выбирайте сами: например, <code>LinearRegression</code> или <code>Ridge</code> из M5.1 либо регрессионный вариант ансамблей из этого модуля. Test R² (<code>model.score(X_test, y_test)</code>) должен быть не меньше <b>0.90</b>. Не используйте <code>price_mln</code> как признак.", hints: [], check: {"tests":"from sklearn.pipeline import Pipeline as _P\nfrom sklearn.model_selection import GridSearchCV as _G\nassert isinstance(model, (_P, _G)), 'model — Pipeline или GridSearchCV'\nassert 'price_mln' not in X_train.columns, 'price_mln не должен быть признаком'\nassert not any('price' in str(c) for c in X_test.columns), 'Признак, построенный из цены, — target leakage'\nassert len(X_test) == 100, 'X_test нельзя менять (100 строк)'\n_r2 = model.score(X_test, y_test)\nassert _r2 >= 0.90, f'Test R² должен быть не меньше 0.90, у вас {_r2:.3f}. Вы добавили district через OneHotEncoder?'"} },
        { prompt: "Churn: отдел удержания хочет находить не меньше <b>70%</b> уходящих (recall ≥ 0.70), но так, чтобы не меньше <b>40%</b> предупреждений были верными (precision ≥ 0.40). Задайте <code>model</code> (Pipeline с predict_proba) и число <code>threshold</code>. Проверка: <code>(model.predict_proba(X_test)[:, 1] &gt;= threshold)</code>.", hints: [], check: {"tests":"from sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert model is not None and hasattr(model, 'predict_proba'), 'model — обученная модель с predict_proba'\nassert 0 < threshold < 1, 'threshold между 0 и 1'\nassert len(X_test) == 150, 'X_test нельзя менять'\n_yp = (model.predict_proba(X_test)[:, 1] >= threshold).astype(int)\n_r, _p = _rs(y_test, _yp), _ps(y_test, _yp, zero_division=0)\nassert _r >= 0.70, f'recall {_r:.2f} < 0.70: понизьте threshold или используйте class_weight'\nassert _p >= 0.40, f'precision {_p:.2f} < 0.40: threshold слишком низкий'"} },
        { prompt: "Аналитик заполнил пропуски в <code>age</code> медианой по всем данным, обучил StandardScaler на всех данных, а затем разделил на train/test. Какое исправление самое правильное?", options: ["Использовать среднее вместо медианы","Сначала разделить, а SimpleImputer и StandardScaler поместить внутрь Pipeline и обучать только на train","Увеличить test_size до 0.5","Заменить StandardScaler на MinMaxScaler"], explain: "Каждый шаг, который учится на данных, должен обучаться только на train. Pipeline автоматически обеспечивает это в CV и в production." },
        { prompt: "В Random Forest feature_importances_ у <code>data_gb</code> равна 0.14, а permutation importance на test ≈ 0. Какой вывод самый правильный?", options: ["data_gb — один из самых важных признаков","Impurity importance показывает, что признак использовался для разделения шума в train; на test он не улучшает прогноз","Permutation importance посчитана неправильно","data_gb — причина churn"], explain: "Impurity importance считается на train и переоценивает непрерывные признаки. Permutation на test напрямую измеряет, «насколько хуже станет модель без признака»." }
      ]
    }
  }
});
