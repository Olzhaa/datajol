// M5.3 DS Capstone: Russian text. Code, solutions and expected output are in content/dscapstone.js.
DJ.i18n.patch({
  modules: {
    'm5-3': { intro: 'Итоговый проект по DS: оператор «Дала Мобайл» хочет снизить отток (churn) с помощью retention-предложения. Вы пройдёте весь путь на данных <code>churn.csv</code>: бизнес-вопрос и цена ошибки → EDA → baseline → Pipeline → более сильная модель → выбор порога в тенге → интерпретация и проверка → memo и презентация. Этот проект можно добавить в портфолио.' }
  },
  lessons: {
    'dc-1': {
      title: 'Бриф: бизнес-вопрос и цена ошибки',
      body: `
<p><b>Клиент:</b> «Дала Мобайл» — оператор мобильной связи в Казахстане. Каждый месяц часть абонентов уходит к другому оператору (churn). Отдел удержания (retention) хочет отправлять склонным к уходу абонентам <b>предложение</b> (offer): дополнительные 10 GB бесплатно на один месяц.</p>
<p><b>Бизнес-вопрос:</b> «Кому отправить предложение, чтобы сэкономить больше всего денег?» Это не задача «постройте модель». Модель — лишь инструмент, а ответ измеряется в тенге.</p>
<h3>Данные: <code>churn.csv</code></h3>
<p>600 абонентов: <code>city</code>, <code>age</code>, <code>tenure_months</code> (сколько месяцев с нами), <code>plan</code> (basic / standard / premium), <code>monthly_fee</code>, <code>data_gb</code>, <code>support_calls</code>, <code>has_contract</code>. Целевая переменная (target): <code>churned</code> — ушёл ли абонент в следующем квартале (1) или нет (0).</p>
<h3>Цена ошибки</h3>
<ul>
<li>Стоимость предложения: <b>2 000 ₸</b> на одного абонента.</li>
<li>Потери от ушедшего абонента: <b>40 000 ₸</b> (будущая выручка).</li>
<li>Опыт отдела удержания: предложение удерживает <b>30%</b> абонентов, собиравшихся уйти.</li>
</ul>
<h3>Пример по шагам</h3>
<ol>
<li><b>TP</b> (собирался уйти, получил предложение): средняя выгода 0.3 × 40 000 − 2 000 = <b>+10 000 ₸</b>.</li>
<li><b>FP</b> (не собирался уходить, но получил предложение): деньги потрачены впустую, <b>−2 000 ₸</b>.</li>
<li><b>FN</b> (собирался уйти, не получил предложение) и <b>TN</b>: 0 ₸ по сравнению с вариантом «ничего не делать».</li>
<li>Ожидаемая выгода от отправки предложения абоненту с вероятностью оттока <code>p</code>: <code>p × 12 000 − 2 000</code>. Она больше нуля, если <code>p &gt; 2 000 / 12 000 ≈ 0.17</code>.</li>
</ol>
<p>Вывод: один FN (упущенный клиент) в несколько раз дороже одного FP. Поэтому нам важнее <b>recall</b>, а порог (threshold) может быть не 0.5, а гораздо ниже. Метрика успеха: <b>ожидаемая выгода на тестовой выборке, ₸</b>. Accuracy и AUC — вспомогательные метрики.</p>
<pre><code>SAVE, LOST, OFFER = 0.3, 40000, 2000
tp_value = SAVE * LOST - OFFER   # 10000
fp_value = -OFFER                # -2000</code></pre>
<div class="tip"><b>Частые ошибки:</b> (1) Начинать проект с цели «достичь accuracy 90%». Бизнес видит не accuracy, а тенге. (2) Считать, что предложение удержит всех, кто собирался уйти. В реальности доля согласившихся намного ниже 100%. (3) Придумывать цифры самому: узнайте потери и стоимость у бизнеса и запишите их в memo.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>expected_value(p)</code>, которая считает ожидаемую выгоду от отправки предложения одному абоненту: <code>p × SAVE × LOST − OFFER</code>. Затем вычислите точку безубыточности <code>breakeven = OFFER / (SAVE * LOST)</code> и выведите её.', check: { tests: 'assert expected_value(0.5) is not None, "Функция должна возвращать значение (return)"\nassert abs(expected_value(0.5) - 4000) < 1e-6, "При p = 0.5: 0.5 × 0.3 × 40000 − 2000 = 4000"\nassert abs(expected_value(0.1) + 800) < 1e-6, "При p = 0.1 выгода отрицательная: −800"\nassert breakeven is not None and abs(breakeven - 1 / 6) < 1e-9, "breakeven = 2000 / 12000 ≈ 0.167"' }, hints: ['<code>return p * SAVE * LOST - OFFER</code>', '<code>breakeven = OFFER / (SAVE * LOST)</code>'] },
        { prompt: 'Один FN теряет 10 000 ₸ выгоды, один FP приносит 2 000 ₸ расходов. Что важнее при оценке модели?', options: ['Precision: отправлять предложение только при высокой уверенности', 'Recall: ловить как можно больше уходящих, соглашаясь на часть FP', 'Accuracy: все ошибки одинаковы', 'Ничего, важен только AUC'], explain: 'FN в пять раз дороже FP. Поэтому выгоднее отправить несколько лишних предложений и удержать больше уходящих. Но порог в итоге выбираем в тенге.' },
        { prompt: 'В тестовой выборке 150 абонентов: 39 уйдут, 111 останутся. Если без модели отправить предложение <b>всем</b>, какова ожидаемая выгода в тенге? (TP = +10 000 ₸, FP = −2 000 ₸)', explain: '39 × 10 000 − 111 × 2 000 = 390 000 − 222 000 = 168 000 ₸. Это «простая стратегия», которую модель должна обыграть.' }
      ]
    },
    'dc-2': {
      title: 'EDA: здоровье данных',
      body: `
<p>Не спешим с моделью. Как и в капстоуне Data Analyst, сначала проверяем «здоровье» данных: сколько строк, какие столбцы, где пропуски, как распределена целевая переменная.</p>
<h3>Четыре вопроса</h3>
<ol>
<li>Сколько абонентов и столбцов? <code>df.shape</code></li>
<li>Какова доля оттока? <code>df["churned"].mean()</code> — среднее столбца 0/1 равно доле единиц.</li>
<li>В каких столбцах есть пропуски? <code>df.isna().sum()</code></li>
<li>Как меняется отток по категориям? <code>groupby</code></li>
</ol>
<h3>Пример по шагам</h3>
<pre><code>import pandas as pd
df = pd.read_csv("churn.csv")
print(df.shape)                       # (600, 10)
print(round(df["churned"].mean(), 3)) # 0.258
print(df.isna().sum())                # age 25, data_gb 17</code></pre>
<ol>
<li>Из 600 абонентов ушли примерно 26%. Значит, классы несбалансированы: модель, которая говорит «никто не уйдёт», получит accuracy 74%. Запомните это число.</li>
<li>В <code>age</code> 25 пропусков, в <code>data_gb</code> — 17. Если удалить строки, мы потеряем 42 абонента (7%). Вместо этого заполним их медианой внутри Pipeline (этап 3).</li>
<li>Теперь сравним по тарифу и наличию контракта:</li>
</ol>
<pre><code>df.groupby("has_contract")["churned"].mean()
# 0    0.335
# 1    0.147</code></pre>
<p>Почему EDA — отдельный этап капстоуна? Потому что модель лишь повторяет закономерности из данных. Если мы не увидим их заранее, то не сможем проверить результат модели: откуда мы знаем, что утверждение «tenure важен» верно? Каждый вывод из EDA потом сравнивается с permutation importance, а факты о пропусках и дисбалансе попадают в раздел memo «Ограничения». Поэтому записывайте результаты.</p>
<p>Абоненты без контракта уходят более чем в два раза чаще. Это первый вывод для memo. Но это <b>корреляция</b>: мы пока не можем сказать, что контракт останавливает уход, возможно, лояльные клиенты просто чаще подписывают контракт.</p>
<table>
<tr><th>plan</th><th>доля оттока</th></tr>
<tr><td>basic</td><td>0.235</td></tr>
<tr><td>standard</td><td>0.262</td></tr>
<tr><td>premium</td><td>0.321</td></tr>
</table>
<div class="tip"><b>Частые ошибки:</b> (1) Оставить <code>customer_id</code> как признак (feature): это просто номер, и модель может его «выучить». (2) Бездумно вызывать <code>dropna()</code>: если пропуски не случайны, выборка искажается. (3) Заполнять пропуски на всех данных <b>до</b> разбиения. Это утечка (leakage), мы видели это в M5.2.</div>`,
      ex: [
        { prompt: 'Прочитайте <code>churn.csv</code> и создайте переменные <code>n_rows</code> (число строк), <code>churn_rate</code> (среднее <code>churned</code>) и <code>missing</code> (число пропусков в каждом столбце, Series). Выведите все три.', check: { tests: 'import pandas as _pd\nassert n_rows == 600, "Строк должно быть 600: len(df)"\nassert churn_rate is not None and abs(churn_rate - 0.2583) < 0.001, "churn_rate = df[\\"churned\\"].mean() ≈ 0.258"\nassert isinstance(missing, _pd.Series), "missing должен быть Series: df.isna().sum()"\nassert missing["age"] == 25 and missing["data_gb"] == 17, "В age должно быть 25 пропусков, в data_gb — 17"' }, hints: ['<code>len(df)</code>, <code>df["churned"].mean()</code>', '<code>df.isna().sum()</code> считает пропуски по каждому столбцу.'] },
        { prompt: 'Создайте два Series: <code>by_plan</code> — доля оттока по каждому <code>plan</code>, <code>by_contract</code> — доля оттока по <code>has_contract</code>. Выведите оба.', check: { tests: 'import pandas as _pd\nassert isinstance(by_plan, _pd.Series), "by_plan должен быть Series: df.groupby(\\"plan\\")[\\"churned\\"].mean()"\nassert set(by_plan.index) == {"basic", "standard", "premium"}, "Индекс by_plan — три тарифа"\nassert abs(by_plan["premium"] - 0.3214) < 0.001, "Для premium отток ≈ 0.321"\nassert isinstance(by_contract, _pd.Series) and abs(by_contract[0] - 0.3352) < 0.001 and abs(by_contract[1] - 0.1469) < 0.001, "by_contract: 0 → 0.335, 1 → 0.147"' }, hints: ['<code>df.groupby("plan")["churned"].mean()</code>'] }
      ]
    },
    'dc-3': {
      title: 'EDA: группы по tenure и служба поддержки',
      body: `
<p><code>tenure_months</code> — числовой столбец (от 1 до 72 месяцев). Если считать отток для каждого значения отдельно, таблица будет шумной. Нужны понятные бизнесу <b>группы</b> (bands): «первый год», «второй год», «2–4 года», «больше 4 лет».</p>
<pre><code>df["band"] = pd.cut(df["tenure_months"],
                    bins=[0, 12, 24, 48, 72],
                    labels=["0-12", "13-24", "25-48", "49-72"])</code></pre>
<p><code>pd.cut</code> раскладывает каждое значение по интервалам. <code>bins=[0, 12, ...]</code> означает «больше 0 и до 12 включительно», поэтому 12 месяцев попадают в первую группу.</p>
<h3>Пример по шагам</h3>
<ol>
<li>Создаём группы (код выше).</li>
<li>Доля оттока и число абонентов в каждой группе:</li>
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
<li>Вывод: больше половины новых абонентов уходят в первый год, а из тех, кто с нами больше 4 лет, — только 10%. Tenure, вероятно, самый сильный признак.</li>
<li>Ещё один признак: звонки в службу поддержки. У тех, кто звонил 3 раза и больше, доля оттока около 43%, у остальных — 22%. Это признак «недовольного клиента».</li>
</ol>
<p>Почему это важно? Для бизнеса «коэффициент tenure равен −0.9» непонятен, а «половина абонентов первого года уходит» — понятно сразу и подталкивает к действию: возможно, предложение нужно направить на новых абонентов. Такие таблицы потом становятся вторым слайдом презентации. Кроме того, они помогают проверить модель: если модель не даёт новым абонентам высокую вероятность, где-то ошибка.</p>
<p><code>observed=True</code> — при группировке по категориальному столбцу показывает только существующие группы (иначе pandas выдаёт предупреждение).</p>
<div class="tip"><b>Частые ошибки:</b> (1) Подавать в модель столбец <code>band</code> вместе с <code>tenure_months</code>: одна и та же информация дважды. Группы нужны только для EDA и рассказа. (2) Делать большие выводы по маленькой группе: все 3 абонента, звонившие 6 раз, ушли, но 3 человека — не доказательство. Всегда показывайте рядом <code>size</code>. (3) Не проверять границы интервалов: если <code>bins</code> начинается не с 0, значение 0 станет <code>NaN</code>.</div>`,
      ex: [
        { prompt: 'Создайте столбец <code>band</code> с помощью <code>pd.cut</code> (границы <code>[0, 12, 24, 48, 72]</code>, метки <code>"0-12", "13-24", "25-48", "49-72"</code>). Затем <code>by_band</code> — доля оттока в каждой группе (Series, <code>observed=True</code>).', check: { tests: 'assert by_band is not None and len(by_band) == 4, "Должно быть четыре группы"\nassert [str(i) for i in by_band.index] == ["0-12", "13-24", "25-48", "49-72"], "Метки групп: 0-12, 13-24, 25-48, 49-72"\nassert abs(by_band.iloc[0] - 0.5607) < 0.001 and abs(by_band.iloc[-1] - 0.1036) < 0.001, "В группе 0-12 должно быть ≈ 0.561, в группе 49-72 — ≈ 0.104: проверьте границы"\nassert all(by_band.diff().dropna() < 0), "С ростом tenure отток должен уменьшаться"' }, hints: ['<code>pd.cut(df["tenure_months"], bins=[0, 12, 24, 48, 72], labels=[...])</code>', '<code>df.groupby("band", observed=True)["churned"].mean()</code>'] },
        { prompt: 'Запишите в <code>high_calls</code> долю оттока среди тех, кто звонил в поддержку хотя бы 3 раза, а в <code>low_calls</code> — долю среди остальных.', check: { tests: 'assert high_calls is not None and abs(high_calls - 0.4324) < 0.001, "Для support_calls >= 3 отток ≈ 0.432"\nassert low_calls is not None and abs(low_calls - 0.2188) < 0.001, "Для support_calls < 3 отток ≈ 0.219"' }, hints: ['<code>df[df["support_calls"] &gt;= 3]["churned"].mean()</code>'] },
        { prompt: 'В столбце <code>age</code> 25 пропусков. Как мы обработаем их в проекте?', options: ['Заполним средним по всем данным до разбиения', 'Удалим эти строки', '<code>SimpleImputer(strategy="median")</code> внутри Pipeline: медиана считается только по train', 'Заполним пропуски нулями'], explain: 'Если импьютер стоит внутри Pipeline, он обучается (fit) только на train, а при cross-validation — отдельно на каждом fold. Это метод без утечки. Возраст 0 — бессмысленное значение.' }
      ]
    },
    'dc-4': {
      title: 'Разбиение train/test и baseline',
      body: `
<p>Любая модель должна ответить на один вопрос: «лучше ли она простого правила?» Это правило — <b>baseline</b>. Самый простой baseline: всегда предсказывать самый частый класс (majority class). В наших данных это «никто не уйдёт».</p>
<h3>Признаки и target</h3>
<pre><code>num = ["age", "tenure_months", "monthly_fee", "data_gb",
       "support_calls", "has_contract"]
cat = ["plan"]
X = df[num + cat]
y = df["churned"]</code></pre>
<p><code>customer_id</code> не берём (это номер). <code>city</code> тоже не добавляем в модель: бизнес не хочет распределять предложения по городу проживания. Но мы сохраняем его для <b>проверки</b> на этапе 7.</p>
<h3>Пример по шагам</h3>
<ol>
<li>Разбиение: 75% train, 25% test. <code>stratify=y</code> делает долю оттока одинаковой (≈26%) в обеих частях.</li>
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
<li>Accuracy 74%, но recall 0: не ловит ни одного уходящего. На языке бизнеса это «ничего не делать», выгода 0 ₸. А на этапе 1 «отправить всем» дало 168 000 ₸. Модель должна быть лучше обоих вариантов.</li>
</ol>
<p>Зачем два baseline? «Ничего не делать» — текущее положение бизнеса, а «отправить всем» — самое простое действие без модели. Бизнес спросит вас: «окупается ли модель?» Ответить можно только сравнением: если модель не приносит больше выгоды, чем оба варианта, нет смысла её строить, внедрять и поддерживать. Это честный вывод, который часто встречается в реальной работе.</p>
<p>Тестовую выборку храним «в сейфе» до конца проекта: выбор модели идёт только на train через cross-validation.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Забыть <code>stratify</code>: на маленьких данных доля оттока в test может оказаться 20% или 32%, и метрики скачут. (2) Не задать <code>random_state</code>: при каждом запуске другой результат, и цифры в memo не воспроизводятся. (3) Хвалиться «accuracy 80%» без baseline: по сравнению с 74% это слабое достижение.</div>`,
      ex: [
        { prompt: 'Разбейте данные (<code>test_size=0.25</code>, <code>stratify=y</code>, <code>random_state=0</code>). Обучите <code>DummyClassifier(strategy="most_frequent")</code> и посчитайте на test <code>acc_dummy</code> (accuracy) и <code>rec_dummy</code> (recall).', check: { tests: 'assert len(X_test) == 150, "В тестовой выборке должно быть 150 строк: test_size=0.25"\nassert int(y_test.sum()) == 39, "При stratify=y и random_state=0 в test будет 39 уходящих"\nassert isinstance(dummy, DummyClassifier) and hasattr(dummy, "classes_"), "Нужно обучить (fit) DummyClassifier с именем dummy"\nassert acc_dummy is not None and abs(acc_dummy - 0.74) < 1e-9, "acc_dummy должно быть 0.74"\nassert rec_dummy == 0, "Majority baseline никого не ловит: recall = 0"' }, hints: ['<code>train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)</code>', '<code>dummy = DummyClassifier(strategy="most_frequent")</code>, затем <code>fit</code> и <code>predict(X_test)</code>.'] },
        { prompt: 'Коллега: «У нашей первой модели accuracy 76%, отлично!» Что вы ответите?', options: ['Да, 76% — хороший результат', 'Сам baseline даёт 74%. Вместо accuracy нужно сравнить с baseline recall, precision и выгоду в тенге', 'Если accuracy ниже 90%, модель непригодна', 'Важен только AUC, на accuracy мы никогда не смотрим'], explain: 'При несбалансированных классах accuracy обманчива. 76% против 74% — это всего 3 абонента. Главная мера — выгода.' }
      ]
    },
    'dc-5': {
      title: 'Логистическая регрессия в Pipeline',
      body: `
<p>Первая настоящая модель — логистическая регрессия (logistic regression). Она простая, быстрая, и её коэффициенты можно объяснить. Но ей нужны подготовленные данные: пропуски заполнены, числа отмасштабированы, текстовые столбцы (<code>plan</code>) превращены в числа.</p>
<p>Из M5.2 мы знаем: всё это кладём внутрь <b>Pipeline</b> и <b>ColumnTransformer</b>. Тогда <code>fit</code> учится только на train, а <code>predict</code> применяет к test те же правила. Утечки нет.</p>
<h3>Пример по шагам</h3>
<ol>
<li>Для числовых столбцов: заполнение медианой → стандартизация.</li>
<li>Для категориального столбца: one-hot кодирование.</li>
<li>В конце — модель.</li>
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
<li>Оценка. <code>predict</code> даёт 0/1 с порогом 0.5, а <code>predict_proba(X_test)[:, 1]</code> — вероятность оттока. AUC считается по вероятностям.</li>
</ol>
<pre><code>proba = pipe.predict_proba(X_test)[:, 1]
pred = pipe.predict(X_test)
recall_score(y_test, pred)      # ≈ 0.44
precision_score(y_test, pred)   # ≈ 0.68
roc_auc_score(y_test, proba)    # ≈ 0.79</code></pre>
<p>У Pipeline есть ещё одна польза: вся подготовка и модель хранятся в одном объекте. Когда в следующем месяце придёт новый список абонентов, достаточно <code>pipe.predict_proba(new_df)</code>: медиана, масштаб и столбцы one-hot применятся так же, как при обучении. А если повторять отдельные шаги вручную, легко забыть один из них. В production такая ошибка молчалива, но дорога.</p>
<p>Результат: при пороге 0.5 модель ловит только 44% уходящих. А на этапе 1 мы видели, что recall важнее. Эту проблему решим изменением порога (этап 6). AUC 0.79 означает, что модель хорошо упорядочивает уходящих по вероятности.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Передавать в <code>roc_auc_score</code> результат <code>predict</code> (0/1): AUC считается по вероятностям. (2) Применять <code>StandardScaler</code> ко всему <code>X</code> без Pipeline (утечка). (3) Забыть <code>handle_unknown="ignore"</code>: если в новых данных появится тариф, которого не было раньше, модель упадёт.</div>`,
      ex: [
        { prompt: 'Постройте Pipeline с логистической регрессией (<code>pre</code> уже готов) и обучите его на train. Посчитайте на test <code>rec_lr</code> (recall), <code>prec_lr</code> (precision) и <code>auc_lr</code> (ROC AUC, по вероятностям) и выведите их.', check: { tests: 'from sklearn.pipeline import Pipeline as _P\nfrom sklearn.metrics import recall_score as _rs, precision_score as _ps\nassert isinstance(pipe, _P), "pipe должен быть Pipeline"\nassert hasattr(pipe.named_steps["model"], "coef_"), "Модель не обучена: pipe.fit(X_train, y_train)"\n_pred = pipe.predict(X_test)\nassert rec_lr is not None and abs(rec_lr - _rs(y_test, _pred)) < 1e-9, "rec_lr = recall_score(y_test, pred)"\nassert prec_lr is not None and abs(prec_lr - _ps(y_test, _pred)) < 1e-9, "prec_lr = precision_score(y_test, pred)"\nassert auc_lr is not None and 0.75 < auc_lr < 0.85, "auc_lr должно быть ≈ 0.79: передайте в roc_auc_score predict_proba(X_test)[:, 1]"' }, hints: ['<code>Pipeline([("pre", pre), ("model", LogisticRegression(max_iter=1000))])</code>', 'Для AUC: <code>pipe.predict_proba(X_test)[:, 1]</code>'] },
        { prompt: 'Почему <code>SimpleImputer</code> и <code>StandardScaler</code> должны стоять внутри Pipeline?', options: ['Только чтобы код был короче', 'Тогда медиана и масштаб вычисляются только по train (при CV — по train-части каждого fold). Информация о test не утекает в модель', 'Без Pipeline LogisticRegression не работает', 'Pipeline всегда повышает точность модели'], explain: 'Это защита от утечки. Test — образец будущих клиентов, модель не должна ничего о нём знать.' }
      ]
    },
    'dc-6': {
      title: 'Модель посильнее: random forest и CV',
      body: `
<p>Логистическая регрессия линейна: «если tenure вырастет на месяц, логит оттока изменится на определённую величину». А случайный лес (random forest) сам находит взаимодействия вроде «если tenure &lt; 12 <b>и</b> нет контракта». Будет ли он сильнее? Проверяем это не на test, а с помощью <b>cross-validation</b> (только внутри train).</p>
<h3>Пример по шагам</h3>
<ol>
<li>Повторно используем тот же <code>pre</code>, меняется только модель.</li>
<li>Маленькая сетка (grid): глубина дерева и минимальное число строк в листе. 2 × 2 = 4 комбинации × 5 fold = 20 моделей.</li>
<li>Метрика: <code>scoring="roc_auc"</code>. Порог мы выберем позже, поэтому важно, насколько хорошо модель <b>упорядочивает</b> вероятности.</li>
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
<li>Логистическую регрессию оцениваем точно так же:</li>
</ol>
<pre><code>cv_lr = cross_val_score(pipe, X_train, y_train,
                        cv=5, scoring="roc_auc").mean()   # ≈ 0.819</code></pre>
<ol start="5">
<li>Результат неожиданный: простая модель немного лучше! На 450 строках сигнал в основном линейный (tenure, контракт, звонки), а лес тратит лишнюю сложность на «шум».</li>
</ol>
<p>Одна оговорка: разница в CV очень мала, поэтому с другим <code>random_state</code> или другими fold лес может немного обогнать. В реальной работе смотрят на стандартное отклонение AUC по fold (<code>cross_val_score(...).std()</code>) и проверяют, больше ли разница, чем шум. В нашем случае две модели статистически равны.</p>
<p>Решение: выбираем <b>логистическую регрессию</b>. При одинаковом качестве лучше простая модель: быстрая, легко объяснимая, дешёвая в поддержке. Это честный вывод, который мы запишем в memo.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Сравнивать модели по результату на test и выбирать лучшую: тогда test перестаёт быть «чистым». (2) Большая сетка: 100 комбинаций на маленьких данных лишь находят случайного «победителя». (3) Вера в то, что «сложная модель всегда лучше». Разница между 0.811 и 0.819 может быть меньше разброса между fold.</div>`,
      ex: [
        { prompt: 'Сделайте <code>GridSearchCV</code> для Pipeline со случайным лесом: <code>model__max_depth</code> ∈ [3, 5], <code>model__min_samples_leaf</code> ∈ [1, 5], <code>cv=5</code>, <code>scoring="roc_auc"</code>. Обучите и запишите лучший CV AUC в <code>cv_rf</code>.', check: { tests: 'from sklearn.model_selection import GridSearchCV as _G\nassert isinstance(grid, _G), "grid должен быть GridSearchCV"\nassert hasattr(grid, "best_estimator_"), "Не вызван grid.fit(X_train, y_train)"\nassert len(grid.cv_results_["params"]) == 4, "В сетке должно быть 2 × 2 = 4 комбинации"\nassert grid.scoring == "roc_auc", "Укажите scoring=\\"roc_auc\\""\nassert cv_rf is not None and abs(cv_rf - grid.best_score_) < 1e-12, "cv_rf = grid.best_score_"\nassert 0.75 < cv_rf < 0.88, "CV AUC должен быть ≈ 0.81"' }, hints: ['<code>GridSearchCV(rf, {"model__max_depth": [3, 5], "model__min_samples_leaf": [1, 5]}, cv=5, scoring="roc_auc")</code>', '<code>cv_rf = grid.best_score_</code>'] },
        { prompt: 'Посчитайте 5-fold CV AUC для Pipeline с логистической регрессией и запишите в <code>cv_lr</code>. Затем запишите в переменную <code>final</code> значение <code>"logreg"</code> (если <code>cv_lr &gt;= cv_rf</code>) или <code>"forest"</code>. <code>cv_rf</code> дан из предыдущего задания.', check: { tests: 'assert cv_lr is not None and 0.78 < cv_lr < 0.86, "cv_lr должно быть ≈ 0.82: cross_val_score(pipe, X_train, y_train, cv=5, scoring=\\"roc_auc\\").mean()"\nassert final == ("logreg" if cv_lr >= cv_rf else "forest"), "final: \\"logreg\\", если cv_lr >= cv_rf, иначе \\"forest\\""' }, hints: ['<code>cross_val_score(pipe, X_train, y_train, cv=5, scoring="roc_auc").mean()</code>', '<code>final = "logreg" if cv_lr &gt;= cv_rf else "forest"</code>'] },
        { prompt: 'CV AUC: логистическая регрессия 0.819, случайный лес 0.811. Какую модель правильно выбрать?', options: ['Random forest: он всегда сильнее', 'Логистическую регрессию: качество практически одинаковое, а простая модель быстрее, понятнее и дешевле в поддержке', 'Отбросить обе и построить нейросеть', 'Ту, что лучше на test'], explain: 'Когда разница незначительна, побеждает простота. Выбирать по test — значит «загрязнить» test.' }
      ]
    },
    'dc-7': {
      title: 'Выбор порога в тенге',
      body: `
<p>Модель даёт каждому абоненту вероятность. Кому отправить предложение, зависит от <b>порога</b> (threshold): отправляем, если <code>proba &gt;= th</code>. Значение по умолчанию 0.5 — математическая привычка, а не бизнес-решение. Наше решение измеряется в тенге.</p>
<h3>Функция выгоды</h3>
<pre><code>def profit(y_true, y_pred):
    tp = ((y_pred == 1) &amp; (y_true == 1)).sum()
    fp = ((y_pred == 1) &amp; (y_true == 0)).sum()
    return int(10000 * tp - 2000 * fp)</code></pre>
<h3>Пример по шагам</h3>
<ol>
<li>Проверяем пороги от 0.05 до 0.90 с шагом 0.05.</li>
<li>Для каждого порога считаем <code>pred = (proba &gt;= th).astype(int)</code> и выгоду.</li>
<li>Выбираем порог с наибольшей выгодой.</li>
</ol>
<pre><code>for th in np.arange(0.05, 0.95, 0.05):
    th = round(th, 2)
    pred = (proba &gt;= th).astype(int)
    print(th, profit(y_test, pred))</code></pre>
<table>
<tr><th>Порог</th><th>TP</th><th>FP</th><th>Выгода, ₸</th></tr>
<tr><td>0.10</td><td>36</td><td>65</td><td><b>230 000</b></td></tr>
<tr><td>0.20</td><td>30</td><td>42</td><td>216 000</td></tr>
<tr><td>0.30</td><td>27</td><td>23</td><td>224 000</td></tr>
<tr><td>0.50</td><td>17</td><td>8</td><td>154 000</td></tr>
<tr><td>всем</td><td>39</td><td>111</td><td>168 000</td></tr>
</table>
<ol start="4">
<li>Вывод: порог 0.5 хуже даже, чем «отправить всем»! А в интервале 0.10–0.30 выгода примерно одинакова (216–230 тыс. ₸) — кривая плоская. Теоретический порог 1/6 ≈ 0.17 (этап 1) находится в середине этого интервала.</li>
</ol>
<p>Почему 0.5 так плох? Порог 0.5 «оценивает» FN и FP одинаково. А у нас FN в пять раз дороже, поэтому, чтобы ловить больше уходящих, модель должна отправлять предложение и «неуверенным» абонентам. При снижении порога recall растёт, precision падает, а выгода сначала растёт, потом падает: слишком много FP съедает бюджет предложений.</p>
<p>В плоской зоне можно выбрать удобную для бизнеса точку: порог 0.3 вдвое сокращает число предложений (50 против 101), а выгоду уменьшает лишь на 6 000 ₸. Если предложения отнимают время операторов, это важный аргумент.</p>
<div class="tip"><b>Частые ошибки:</b> (1) Выбирать порог на test — небольшая утечка: 230 000 ₸ — слишком оптимистичная оценка. Правильно: выбрать порог на train через <code>cross_val_predict</code> и проверить на test один раз. Мы упростили это для обучения, в memo запишите это как «ограничение». (2) <code>np.arange</code> даёт числа вроде 0.15000000000000002, используйте <code>round</code>. (3) Писать <code>and</code> вместо <code>&amp;</code>: на массивах это даёт ошибку.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>profit(y_true, y_pred)</code>: +10 000 ₸ за TP, −2 000 ₸ за FP, остальное 0. Результат должен быть <code>int</code>. Чтобы функция работала и со списками, сначала примените <code>np.asarray</code>.', check: { tests: 'assert profit([1, 0, 1, 0], [1, 1, 0, 0]) == 8000, "1 TP и 1 FP: 10000 − 2000 = 8000"\nassert profit([1, 1, 1], [0, 0, 0]) == 0, "Если никому не отправлять, выгода 0"\nassert profit([0, 0, 1], [1, 1, 1]) == 6000, "1 TP, 2 FP: 10000 − 4000 = 6000"\nassert isinstance(profit([1], [1]), int), "Верните int: int(...)"' }, hints: ['<code>tp = ((y_pred == 1) &amp; (y_true == 1)).sum()</code>', '<code>return int(10000 * tp - 2000 * fp)</code>'] },
        { prompt: 'Переберите пороги <code>np.arange(0.05, 0.95, 0.05)</code> (каждый через <code>round(th, 2)</code>) и найдите <code>best_th</code> и <code>best_profit</code> с наибольшей выгодой. Для сравнения посчитайте <code>profit_05</code> (порог 0.5) и <code>profit_all</code> (отправить всем).', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_ths = [round(t, 2) for t in _np.arange(0.05, 0.95, 0.05)]\n_ps = [_profit(_yte, (_proba >= t).astype(int)) for t in _ths]\nassert best_profit == max(_ps), f"Наибольшая выгода должна быть {max(_ps)} ₸, у вас {best_profit}"\nassert best_th is not None and abs(best_th - _ths[_ps.index(max(_ps))]) < 1e-9, "best_th — (наименьший) порог с наибольшей выгодой"\nassert profit_05 == _profit(_yte, (_proba >= 0.5).astype(int)), "profit_05: выгода при пороге 0.5"\nassert profit_all == 168000, "Отправить всем: 39 × 10000 − 111 × 2000 = 168000"\nassert best_profit > profit_05, "Выбранный порог должен быть лучше 0.5"' }, hints: ['<code>p = profit(y_test, (proba &gt;= th).astype(int))</code>', 'Всем: <code>np.ones(len(y_test), dtype=int)</code>'] },
        { prompt: 'Выгода при пороге 0.10 — 230 000 ₸, при пороге 0.30 — 224 000 ₸, но при 0.30 предложений отправляется вдвое меньше. Что вы напишете в memo?', options: ['Только 0.10, потому что выгода наибольшая', 'Покажу, что в интервале 0.10–0.30 выгода практически одинакова, предложу 0.30 с учётом операционных ограничений и предупрежу, что эта оценка выбрана на test', '0.5, это стандарт', 'Пусть бизнес сам выберет порог, цифр не покажу'], explain: 'Разница в 6 000 ₸ на 150 абонентах — на уровне шума. Плоская зона даёт бизнесу свободу выбора.' }
      ]
    },
    'dc-8': {
      title: 'Интерпретация и проверка по городам',
      body: `
<p>Бизнес задаёт два вопроса: «На что опирается модель?» и «Не несправедлива ли она к какой-то группе?» На первый вопрос отвечает <b>permutation importance</b>, на второй — <b>метрики по группам</b>.</p>
<h3>Permutation importance</h3>
<p>Случайно перемешиваем один столбец (связь разрушается) и измеряем, насколько упал AUC на test. Если сильно упал, модель сильно опирается на этот столбец. Метод применяется прямо к Pipeline, поэтому оцениваются исходные столбцы (<code>plan</code> — как один столбец).</p>
<pre><code>from sklearn.inspection import permutation_importance
r = permutation_importance(pipe, X_test, y_test, n_repeats=5,
                           random_state=0, scoring="roc_auc")
imp = pd.Series(r.importances_mean, index=X_test.columns)
imp.sort_values(ascending=False)
# tenure_months   0.18
# support_calls   0.07
# has_contract    0.06
# ...             ≈ 0</code></pre>
<p>Три вывода из EDA подтвердились: tenure, звонки, контракт. Возраст, тариф и трафик практически ничего не добавляют модели.</p>
<h3>Пример по шагам: проверка по городам</h3>
<ol>
<li><code>city</code> нет в модели, но мы снова добавляем его к строкам test: <code>te = df.loc[X_test.index].copy()</code>.</li>
<li>Метка по выбранному порогу: <code>te["flag"] = (proba &gt;= 0.1).astype(int)</code>.</li>
<li>Для каждого города: число абонентов, фактический отток, доля получивших предложение и <b>recall</b> (сколько уходящих получили предложение):</li>
</ol>
<pre><code>te[te["churned"] == 1].groupby("city")["flag"].mean()</code></pre>
<table>
<tr><th>city</th><th>в test</th><th>уходящих</th><th>recall</th></tr>
<tr><td>Алматы</td><td>55</td><td>14</td><td>1.00</td></tr>
<tr><td>Астана</td><td>38</td><td>13</td><td>0.92</td></tr>
<tr><td>Шымкент</td><td>21</td><td>4</td><td>1.00</td></tr>
<tr><td>Қарағанды</td><td>16</td><td>5</td><td>0.80</td></tr>
<tr><td>Ақтөбе</td><td>20</td><td>3</td><td>0.67</td></tr>
</table>
<p>Ещё одна проверка здравого смысла (sanity check): соответствует ли доля получающих предложение фактическому оттоку? При пороге 0.1 модель отправляет предложение 73% абонентов Алматы и 50% абонентов Актобе. Это логично, потому что в Актобе отток низкий (15%). Если бы было наоборот (много предложений в городе с низким оттоком), это был бы повод подозревать ошибку в модели или данных.</p>
<ol start="4">
<li>В Актобе recall выглядит низким, но это 2 из 3 уходящих. Делать выводы из-за одного человека не будем, но упомянем это в memo и предложим наблюдать в следующем квартале.</li>
</ol>
<div class="tip"><b>Частые ошибки:</b> (1) Понимать importance как причину: «tenure важен» не означает «если продлить tenure, отток уменьшится». (2) Считать importance на train: модель покажет «важным» и выученный шум. (3) Объявлять разницу в маленькой группе «несправедливостью модели» или, наоборот, вообще не проверять группы.</div>`,
      ex: [
        { prompt: 'Посчитайте permutation importance для обученного <code>pipe</code> на test (<code>n_repeats=5</code>, <code>random_state=0</code>, <code>scoring="roc_auc"</code>). <code>imp</code> — Series с названиями столбцов в индексе, отсортированный по убыванию; <code>top</code> — название самого важного столбца.', check: { tests: 'assert isinstance(imp, pd.Series), "imp должен быть pandas Series"\nassert len(imp) == 7 and set(imp.index) == set(X_test.columns), "Индекс — 7 столбцов X_test"\nassert list(imp.values) == sorted(imp.values, reverse=True), "imp нужно отсортировать по убыванию"\nassert top == "tenure_months", "Самый важный признак должен быть tenure_months"' }, hints: ['<code>permutation_importance(pipe, X_test, y_test, n_repeats=5, random_state=0, scoring="roc_auc")</code>', '<code>pd.Series(r.importances_mean, index=X_test.columns).sort_values(ascending=False)</code>'] },
        { prompt: 'Верните <code>city</code> к строкам test (<code>te = df.loc[X_test.index].copy()</code>) и добавьте столбец <code>flag</code> по порогу 0.1. <code>city_recall</code> — recall в каждом городе (доля <code>flag</code> среди уходящих), Series. <code>worst_city</code> — город с самым низким recall.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_t = _df.loc[_Xte.index].copy()\n_t["flag"] = (_proba >= 0.1).astype(int)\n_cr = _t[_t["churned"] == 1].groupby("city")["flag"].mean()\nassert isinstance(city_recall, _pd.Series) and len(city_recall) == 5, "city_recall — Series с 5 городами"\nassert all(abs(city_recall[c] - _cr[c]) < 1e-9 for c in _cr.index), "Recall считается только среди уходящих (churned == 1)"\nassert worst_city == _cr.idxmin(), f"worst_city должен быть {_cr.idxmin()}: city_recall.idxmin()"' }, hints: ['<code>te["flag"] = (proba &gt;= 0.1).astype(int)</code>', '<code>te[te["churned"] == 1].groupby("city")["flag"].mean()</code>, затем <code>.idxmin()</code>'] },
        { prompt: 'В Актобе recall 0.67 (2 из 3 уходящих), в других городах 0.8–1.0. Какой вывод верный?', options: ['Модель несправедлива к Актобе, её нельзя использовать', 'Для Актобе нужно построить отдельную модель', 'Разница основана на 3 людях, это не статистическое доказательство. Упомянем в memo и в следующем квартале будем наблюдать recall по городам', 'Нужно добавить город в модель как признак'], explain: 'В маленькой группе один человек меняет recall на 33 процентных пункта. План наблюдения — честный и ответственный ответ.' }
      ]
    },
    'dc-9': {
      title: 'Memo о модели для бизнеса',
      body: `
<p>Руководитель отдела удержания не читает Python. Он ждёт на одной странице ответов на четыре вопроса: <b>что делать, сколько денег, насколько можно доверять, какой следующий шаг.</b> Адаптируем структуру memo из капстоуна Data Analyst под ML.</p>
<ol>
<li><b>Вывод</b> (1–2 предложения): рекомендация и результат в тенге.</li>
<li><b>Что делает модель</b>: простым языком, один абзац. «Оценивает вероятность того, что каждый абонент уйдёт в следующем квартале.»</li>
<li><b>Доказательства</b>: таблица сравнения с baseline, порог, выгода; главные признаки модели.</li>
<li><b>Риски и ограничения</b>: объём данных, способ выбора порога, допущение 30%, проверка по городам.</li>
<li><b>Следующий шаг</b>: пилот и как мы его измерим.</li>
</ol>
<h3>Пример по шагам: таблица доказательств</h3>
<table>
<tr><th>Стратегия</th><th>Число предложений (из 150)</th><th>Ожидаемая выгода</th></tr>
<tr><td>Ничего не делать</td><td>0</td><td>0 ₸</td></tr>
<tr><td>Всем</td><td>150</td><td>168 000 ₸</td></tr>
<tr><td>Модель, порог 0.5</td><td>25</td><td>154 000 ₸</td></tr>
<tr><td>Модель, порог 0.3</td><td>50</td><td>224 000 ₸</td></tr>
</table>
<p>150 абонентов — лишь часть всей базы. Результат понятнее в расчёте на одного абонента: 224 000 / 150 ≈ <b>1 500 ₸ на абонента</b> за квартал. Если масштабировать на 100 000 абонентов, получится около 150 млн ₸, но условие этого прогноза (удержание 30%) обязательно указываем.</p>
<p>В разделе рисков выделите самое важное допущение: весь расчёт зависит от числа «предложение удерживает 30% уходящих». Если на самом деле это 15%, выгода от одного TP падает до 4 000 ₸, а выгодный порог повышается. Поэтому последний раздел memo — пилот, который проверяет это число.</p>
<h3>Признаки хорошего memo</h3>
<ul>
<li>Мало жаргона: вместо «AUC 0.79» — «модель ловит 70% уходящих абонентов, каждое второе предложение попадает в цель».</li>
<li>Каждое число взято из реального результата.</li>
<li>Ограничения не скрываются: они повышают доверие.</li>
</ul>
<div class="tip"><b>Частые ошибки:</b> (1) Начинать memo с метода («Мы использовали GridSearchCV...»). Читатель сначала ждёт решения. (2) Писать допущения как факты: не «сэкономим 150 млн ₸», а «если предложение удерживает 30%, примерно 150 млн ₸». (3) Совсем не писать об ограничениях или, наоборот, посвятить им половину memo.</div>`,
      ex: [
        { prompt: 'Какой вариант лучше всего подходит для первого абзаца memo?', options: ['«Мы сравнили logistic regression и random forest на данных 600 абонентов, CV AUC 0.82.»', '«Рекомендуем отправлять предложение только абонентам, у которых модель оценивает вероятность оттока выше 30%: на test это даёт на 33% больше выгоды, чем отправка всем (224 000 против 168 000 ₸), и сокращает число предложений в три раза. Предлагаем проверить результат пилотом в одном городе.»', '«Модель работает очень хорошо.»', '«Абоненты без контракта уходят чаще.»'], explain: 'Действие, доказательство в тенге, сравнение и следующий шаг — всё в первом абзаце.' },
        { done: 'Поставьте memo в начало файла README.md проекта. В портфолио его читают раньше кода: работодатель смотрит, «умеет ли этот человек говорить на языке бизнеса?». Строка для резюме: «Построил модель оттока и выбрал порог по ожидаемой выгоде: +45% выгоды на test по сравнению со стандартным порогом».', prompt: 'Напишите memo руководителю отдела удержания «Дала Мобайл» (не меньше 80 слов). Используйте свои результаты: baseline, выбранная модель, порог, выгода, главные признаки, проверка по городам. Затем честно оцените его по четырём критериям. Чтобы пройти, по каждому критерию нужно не меньше <b>3 / 4</b>.', criteria: [
            { name: 'Решение и бизнес-результат', levels: ['Рекомендации нет', 'Рекомендация есть, но без тенге или в конце', 'В первом абзаце есть рекомендация и выгода (₸)', 'В первом абзаце есть рекомендация, выгода и сравнение с baseline'] },
            { name: 'Объяснение модели', levels: ['Только технические термины или объяснения нет', 'Модель названа, но что она делает — неясно', 'Простым языком сказано, что делает модель и какие у неё главные признаки', 'Сказано о признаках, о разнице между корреляцией и причиной и о том, почему выбрана простая модель'] },
            { name: 'Риски и ограничения', levels: ['Не упомянуты', 'Общие слова («данных мало»)', 'Конкретные ограничения: допущение 30%, выбор порога на test, объём данных', 'Ограничения, их влияние на результат и итог проверки по городам'] },
            { name: 'Следующий шаг', levels: ['Нет', 'Общий («улучшить модель»)', 'Конкретное действие (пилот, переобучение)', 'Дизайн пилота: контрольная группа, срок, измеряемая метрика'] }
          ] }
      ]
    },
    'dc-10': {
      title: 'Презентация и следующие шаги',
      body: `
<p>Memo — для чтения, презентация — для совещания, на котором принимают решение. На 10 минут достаточно 5–6 слайдов. Заголовок каждого слайда — это <b>вывод</b>, а не просто тема: не «Данные», а «Половина новых абонентов уходит в первый год».</p>
<h3>План слайдов</h3>
<ol>
<li><b>Проблема и вопрос</b>: за квартал уходит 26% абонентов; предложение стоит 2 000 ₸, ушедший абонент — 40 000 ₸.</li>
<li><b>Кто уходит</b>: группы по tenure, контракт, звонки (EDA).</li>
<li><b>Четыре стратегии</b>: никому / всем / модель 0.5 / модель с выбранным порогом — одна столбчатая диаграмма, в ₸.</li>
<li><b>Можно ли доверять модели</b>: CV, почему выбрана простая модель, проверка по городам.</li>
<li><b>Рекомендация и пилот</b>.</li>
<li>Приложение (backup): технические детали, готовые к вопросам.</li>
</ol>
<h3>Пример по шагам: таблица сравнения</h3>
<p>Данные для 3-го слайда собираем кодом, тогда цифры точно совпадают с результатом в ноутбуке:</p>
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
<p>Готовясь к презентации, заранее выпишите ожидаемые вопросы: «Почему не нейросеть?», «Как часто модель ошибается?», «Почему в Актобе хуже?», «Откуда взялись 30%?». Если на каждый вопрос готов ответ в одно предложение и backup-слайд, совещание закончится решением, а не поручением «проанализируйте ещё раз».</p>
<h3>Следующие шаги</h3>
<ul>
<li><b>Пилот (A/B-тест)</b>: в течение месяца случайно делим абонентов с высоким риском на две группы и одной из них отправляем предложение. Разница в оттоке проверит допущение 30% (методы A/B-тестов из модуля M4).</li>
<li><b>Мониторинг</b>: каждый месяц recall, число предложений и показатели по городам.</li>
<li><b>Переобучение</b>: каждый квартал на новых данных; поведение клиентов меняется (data drift).</li>
</ul>
<div class="tip"><b>Частые ошибки:</b> (1) Ставить на слайд код или confusion matrix без объяснения. (2) Пять разных чисел на одном слайде: один слайд — одна мысль. (3) Внедрять сразу на всю базу без пилота: если допущение 30% неверно, потери будут большими.</div>`,
      ex: [
        { prompt: 'Создайте DataFrame <code>summary</code> для 3-го слайда презентации: индекс <code>"none"</code>, <code>"all"</code>, <code>"model_05"</code>, <code>"model_03"</code>; столбцы <code>offers</code> (число предложений) и <code>profit</code> (₸). Пороги: 0.5 и 0.3.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\nassert isinstance(summary, _pd.DataFrame), "summary должен быть DataFrame"\nassert set(summary.index) == {"none", "all", "model_05", "model_03"}, "Индекс: none, all, model_05, model_03"\nassert {"offers", "profit"} <= set(summary.columns), "Нужны столбцы offers и profit"\nassert summary.loc["none", "profit"] == 0 and summary.loc["all", "profit"] == 168000, "none → 0 ₸, all → 168000 ₸"\nassert summary.loc["all", "offers"] == 150, "В стратегии all 150 предложений"\nfor _k, _t in [("model_05", 0.5), ("model_03", 0.3)]:\n    _pr = (_proba >= _t).astype(int)\n    assert summary.loc[_k, "offers"] == _pr.sum() and summary.loc[_k, "profit"] == _profit(_yte, _pr), f"Строка {_k} неверна: порог {_t}"' }, hints: ['Каждая стратегия — массив 0/1: <code>np.zeros</code>, <code>np.ones</code>, <code>(proba &gt;= 0.5).astype(int)</code>.', '<code>pd.DataFrame({"offers": {...}, "profit": {...}})</code> — ключи внутреннего словаря становятся индексом.'] },
        { prompt: 'Какой заголовок слайда лучше всего?', options: ['«Результаты EDA»', '«Больше половины новых абонентов уходит в первый год»', '«Слайд 2: данные»', '«pd.cut и groupby»'], explain: 'Заголовок-вывод сразу сообщает слушателю главную мысль слайда.' },
        { prompt: 'Руководитель: «Модель хорошая, давайте завтра включим её на всю базу». Какой ответ лучше всего?', options: ['Согласен', 'Сначала месячный пилот: случайно делим абонентов с высоким риском на две группы и измеряем реальный эффект предложения (допущение 30%), потом масштабируем', 'Сначала нужно заменить модель нейросетью', 'Данных недостаточно, проект нужно остановить'], explain: 'Модель предсказывает, «кто уйдёт», а на причинно-следственный вопрос «остановит ли его предложение» отвечает только эксперимент.' }
      ]
    },
    'dc-gate': {
      title: 'Экзамен модуля: проект по оттоку от начала до конца',
      body: `
<p>Последняя проверка трека Data Science. Данные: <code>churn.csv</code>. Признаки: <code>age</code>, <code>tenure_months</code>, <code>monthly_fee</code>, <code>data_gb</code>, <code>support_calls</code>, <code>has_contract</code>, <code>plan</code>. Разбиение: <code>test_size=0.25</code>, <code>stratify=y</code>, <code>random_state=0</code>. Экономика: TP = +10 000 ₸, FP = −2 000 ₸.</p>
<p>Каждое задание проверяет один этап: EDA → Pipeline → порог → проверка по городам → вывод.</p>`,
      ex: [
        { prompt: 'EDA: <code>n_missing</code> — общее число пропусков во всей таблице (int). <code>gap</code> — разница долей оттока абонентов без контракта и с контрактом (без минус с).', check: { tests: 'assert n_missing == 42, "Всего пропусков: 25 + 17 = 42"\nassert gap is not None and abs(gap - 0.1883) < 0.001, "gap ≈ 0.335 − 0.147 = 0.188"' } },
        { prompt: 'Pipeline: постройте Pipeline <code>pipe</code> с <code>LogisticRegression(max_iter=1000)</code>, который заполняет пропуски медианой, масштабирует числа и кодирует <code>plan</code> через one-hot, и обучите его на train. <code>auc</code> — ROC AUC на test.', check: { tests: 'from sklearn.pipeline import Pipeline as _P\nassert isinstance(pipe, _P), "pipe должен быть Pipeline"\nassert hasattr(pipe.named_steps[list(pipe.named_steps)[-1]], "coef_"), "Последний шаг — обученная LogisticRegression"\nassert auc is not None and 0.75 < auc < 0.85, "AUC на test должен быть ≈ 0.79"' } },
        { prompt: 'Порог: среди порогов <code>np.arange(0.05, 0.95, 0.05)</code> (каждый через <code>round(th, 2)</code>) найдите <code>best_th</code> и <code>best_profit</code>, дающие наибольшую выгоду на test (TP = +10 000 ₸, FP = −2 000 ₸). <code>proba</code> уже готов.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_ths = [round(t, 2) for t in _np.arange(0.05, 0.95, 0.05)]\n_ps = [_profit(_yte, (_proba >= t).astype(int)) for t in _ths]\nassert best_profit == max(_ps), "best_profit — наибольшая выгода среди проверенных порогов"\nassert best_th is not None and abs(best_th - _ths[_ps.index(max(_ps))]) < 1e-9, "best_th — порог с наибольшей выгодой"' } },
        { prompt: 'Проверка: при пороге 0.3 создайте DataFrame <code>plan_check</code>, который для каждого <code>plan</code> показывает долю получающих предложение (<code>offer_rate</code>) и фактическую долю оттока (<code>churn_rate</code>) (индекс — тариф). Строки test возьмите через <code>df.loc[X_test.index]</code>.', check: { tests: 'import pandas as _pd, numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.pipeline import Pipeline as _Pl\nfrom sklearn.compose import ColumnTransformer as _CT\nfrom sklearn.impute import SimpleImputer as _SI\nfrom sklearn.preprocessing import StandardScaler as _SS, OneHotEncoder as _OH\nfrom sklearn.linear_model import LogisticRegression as _LR\n_df = _pd.read_csv("churn.csv")\n_num = ["age", "tenure_months", "monthly_fee", "data_gb", "support_calls", "has_contract"]\n_X = _df[_num + ["plan"]]\n_y = _df["churned"]\n_Xtr, _Xte, _ytr, _yte = _tts(_X, _y, test_size=0.25, stratify=_y, random_state=0)\n_pre = _CT([("num", _Pl([("imp", _SI(strategy="median")), ("sc", _SS())]), _num), ("cat", _OH(handle_unknown="ignore"), ["plan"])])\n_pipe = _Pl([("pre", _pre), ("model", _LR(max_iter=1000))]).fit(_Xtr, _ytr)\n_proba = _pipe.predict_proba(_Xte)[:, 1]\ndef _profit(t, p):\n    t = _np.asarray(t); p = _np.asarray(p)\n    return int(10000 * ((p == 1) & (t == 1)).sum() - 2000 * ((p == 1) & (t == 0)).sum())\n_t = _df.loc[_Xte.index].copy()\n_t["flag"] = (_proba >= 0.3).astype(int)\n_g = _t.groupby("plan").agg(offer_rate=("flag", "mean"), churn_rate=("churned", "mean"))\nassert isinstance(plan_check, _pd.DataFrame), "plan_check — DataFrame"\nassert set(plan_check.index) == {"basic", "standard", "premium"}, "Индекс — три тарифа"\nassert {"offer_rate", "churn_rate"} <= set(plan_check.columns), "Нужны столбцы offer_rate и churn_rate"\nassert all(abs(plan_check.loc[p, "offer_rate"] - _g.loc[p, "offer_rate"]) < 1e-9 and abs(plan_check.loc[p, "churn_rate"] - _g.loc[p, "churn_rate"]) < 1e-9 for p in _g.index), "Доли не совпадают: проверьте порог 0.3 и строки test"' } },
        { prompt: 'По permutation importance самый важный признак — <code>tenure_months</code>. Как вы напишете об этом в memo?', options: ['«Если дольше удерживать абонентов, отток уменьшится: tenure — причина оттока.»', '«Модель в первую очередь опирается на то, как долго абонент с нами: новые абоненты уходят чаще. Это связь, а не причина; эффект предложения покажет пилот.»', '«tenure_months importance 0.18.»', 'Не буду писать об importance в memo'], explain: 'Простой язык, конкретный смысл и разница между корреляцией и причиной.' }
      ]
    }
  }
});
