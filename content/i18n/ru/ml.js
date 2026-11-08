// M5.1 ML Foundations: Russian text. Code, solutions and expected output are in content/ml.js.
DJ.i18n.patch({
  modules: {
    "m5-1": { intro: "Machine learning — это обучение компьютера на примерах, без ручного написания правил. В этом модуле вы с помощью scikit-learn предскажете цены квартир в Алматы (flats.csv), классифицируете уход абонентов телеком-оператора (churn.csv) и научитесь честно оценивать модель." }
  },
  lessons: {
    "ml-1": {
      title: "Что такое machine learning?",
      body: `
<p>В обычной программе <b>правило пишет человек</b>: «если площадь больше 60 м², цена 40 млн». В machine learning наоборот: мы даём компьютеру много <b>примеров</b> (400 квартир и их реальные цены), а само правило модель находит в данных.</p>
<h3>Основные слова</h3>
<ul>
<li><b>Features</b> (признаки, <code>X</code>) — столбцы, на которые смотрит модель: площадь, число комнат, год постройки.</li>
<li><b>Target</b> (целевая переменная, <code>y</code>) — столбец, который предсказываем: <code>price_mln</code>.</li>
<li><b>Supervised learning</b> (обучение с учителем) — у каждого примера есть правильный ответ (target). Весь этот модуль — об этом.</li>
<li><b>Unsupervised learning</b> (обучение без учителя) — ответа нет, модель ищет внутреннюю структуру данных, например делит абонентов на похожие группы (clustering).</li>
</ul>
<h3>Regression или classification</h3>
<table>
<tr><th>Задача</th><th>Target</th><th>Тип</th></tr>
<tr><td>Предсказать цену квартиры</td><td>число (млн ₸)</td><td>regression</td></tr>
<tr><td>Уйдёт ли абонент?</td><td>0 или 1</td><td>classification</td></tr>
</table>
<h3>Пример по шагам</h3>
<ol>
<li>Бизнес-вопрос: «За сколько выставить новую квартиру?»</li>
<li>Target: <code>price_mln</code>. Это непрерывное число, значит, regression.</li>
<li>Features: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>. <code>flat_id</code> не берём: это просто номер, к цене он отношения не имеет.</li>
<li>В коде:</li>
</ol>
<pre><code>import pandas as pd
flats = pd.read_csv('flats.csv')
X = flats[['area_m2', 'rooms', 'year_built']]   # 2D-таблица
y = flats['price_mln']                          # 1D-столбец
print(X.shape, y.shape)   # (400, 3) (400,)</code></pre>
<h3>Когда ML не нужен</h3>
<ul>
<li>Если правило точно известно: чтобы посчитать НДС, нужна формула, а не модель.</li>
<li>Если данных мало или нет правильных ответов (target).</li>
<li>Если каждое решение по закону нужно полностью объяснять, а простого правила достаточно.</li>
</ul>
<div class="tip">Сначала спросите себя: «А не хватит ли простого правила или SQL-запроса?» ML — последний инструмент, а не первый.</div>
<h3>Частые ошибки</h3>
<ul>
<li><b>Случайно добавить target в features</b> (leakage): например, положить в X столбец «цена 1 м²», вычисленный из цены. Модель выглядит «отличной», но у новой квартиры такого столбца не будет.</li>
<li>Брать ID-столбцы (<code>flat_id</code>, <code>customer_id</code>) как признаки.</li>
<li>Считать target 0/1 регрессией, потому что это число. Это класс, то есть classification.</li>
</ul>`,
      ex: [
        { prompt: "Создайте из <code>flats.csv</code> <code>X</code> (столбцы: <code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) и <code>y</code> (<code>price_mln</code>). Затем <code>print(X.shape, y.shape)</code>.", hints: ["Несколько столбцов: <code>flats[['area_m2', 'rooms', 'year_built']]</code>","Один столбец: <code>flats['price_mln']</code>"], check: {"tests":"assert isinstance(X, pd.DataFrame), 'X должен быть DataFrame: используйте двойные скобки [[...]]'\nassert list(X.columns) == ['area_m2', 'rooms', 'year_built'], 'Столбцы X: area_m2, rooms, year_built (в этом порядке)'\nassert isinstance(y, pd.Series) and y.name == 'price_mln', 'y — столбец price_mln (Series, одинарные скобки)'\nassert len(X) == 400 and len(y) == 400, 'Должны остаться все 400 квартир'"} },
        { prompt: "Какая задача — <b>classification</b>?", options: ["Предсказать цену квартиры в млн ₸","Предсказать, уйдёт ли абонент в следующем месяце (0/1)","Предсказать месячный трафик абонента (GB)","Предсказать год постройки дома"], explain: "Target — один из двух классов (уйдёт / останется), поэтому это classification. В остальных случаях target — непрерывное число, то есть regression." },
        { prompt: "В каком случае ML <b>не нужен</b>?", options: ["Предсказать по данным 600 абонентов, кто уйдёт","Посчитать месячный платёж по тарифу с НДС (ставка известна)","Оценить цену новой квартиры по данным 400 квартир","Найти недовольных клиентов среди тысяч отзывов"], explain: "Для НДС есть точная формула. Если правило известно, обучать модель не нужно." }
      ]
    },
    "ml-2": {
      title: "API scikit-learn: fit, predict, score",
      body: `
<p><b>scikit-learn</b> (<code>sklearn</code>) — классическая библиотека ML в Python. Её красота в том, что все модели работают по одним и тем же трём шагам.</p>
<ol>
<li><b>Создать модель</b>: <code>model = LinearRegression()</code> — пока это «пустой мозг».</li>
<li><b>Обучить</b>: <code>model.fit(X, y)</code> — модель смотрит на примеры и находит свои параметры.</li>
<li><b>Предсказать</b>: <code>model.predict(X_new)</code> — даёт ответ для новых строк.</li>
</ol>
<p>Дополнительно: <code>model.score(X, y)</code> для регрессии возвращает <b>R²</b>: 1 — идеально, 0 — модель как будто просто предсказывает среднее.</p>
<h3>Правило формы</h3>
<ul>
<li><code>X</code> всегда <b>2D</b>: строки × столбцы. Даже если признак один — <code>flats[['area_m2']]</code> (двойные скобки).</li>
<li><code>y</code> — <b>1D</b>: <code>flats['price_mln']</code> (одинарные скобки).</li>
</ul>
<h3>Пример по шагам: предсказываем цену по площади</h3>
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
<li><code>fit</code> нашёл прямую: цена ≈ 0.648 × площадь − 0.47. Это та же прямая, минимизирующая MSE, которую в модуле Math for ML мы искали вручную через gradient descent.</li>
<li>Один квадратный метр добавляет примерно 0.65 млн ₸.</li>
<li>Квартира 60 м²: 0.648 × 60 − 0.47 ≈ 38.4 млн ₸.</li>
<li>R² = 0.62: 62% разброса цен объясняет одна только площадь.</li>
</ol>
<p>Атрибуты обученной модели заканчиваются подчёркиванием: <code>coef_</code>, <code>intercept_</code>, <code>n_features_in_</code>. Они появляются только после <code>fit</code>.</p>
<div class="tip">Передавайте новые данные как DataFrame с теми же столбцами, что и у <code>X</code>. Тогда sklearn проверит названия столбцов и поймает ошибку рано.</div>
<h3>Частые ошибки</h3>
<ul>
<li><code>model.fit(flats['area_m2'], y)</code> — <code>X</code> в 1D. Ошибка: <i>Expected 2D array, got 1D array</i>. Решение: двойные скобки.</li>
<li>Вызвать <code>predict</code> без <code>fit</code>: <code>NotFittedError</code>.</li>
<li><code>predict([60])</code> — это тоже 1D. Нужно: <code>[[60]]</code> или DataFrame.</li>
</ul>`,
      ex: [
        { prompt: "Обучите модель <code>LinearRegression</code> с именем <code>model</code> предсказывать цену (<code>price_mln</code>) по площади (<code>area_m2</code>). Запишите прогноз цены квартиры 60 м² в переменную <code>pred60</code> как число и выведите его.", hints: ["<code>X = flats[['area_m2']]</code> (двойные скобки)","<code>model.predict(pd.DataFrame({'area_m2': [60]}))[0]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\nassert isinstance(model, _LinR), 'model должна быть LinearRegression()'\nassert hasattr(model, 'coef_'), 'Модель не обучена: вызовите model.fit(X, y)'\nassert model.n_features_in_ == 1, 'Нужен только один признак: area_m2'\nassert abs(float(pred60) - 38.41) < 0.1, f'pred60 должно быть ≈ 38.41, у вас {float(pred60):.2f}. Вы взяли predict(...)[0]?'"} },
        { prompt: "В коде ошибка: <code>X</code> одномерный. Исправьте её: теперь <code>model2</code> должна обучаться на <b>двух</b> признаках (<code>area_m2</code>, <code>rooms</code>). Запишите R² на обучающих данных в переменную <code>r2</code> через <code>score</code> и выведите.", hints: ["<code>X = flats[['area_m2', 'rooms']]</code>","<code>r2 = model2.score(X, y)</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _f[['area_m2', 'rooms']]\n_r2 = _LinR().fit(_X, _f['price_mln']).score(_X, _f['price_mln'])\nassert hasattr(model2, 'coef_') and model2.n_features_in_ == 2, 'model2 должна обучаться на двух признаках: area_m2 и rooms'\nassert abs(r2 - _r2) < 1e-6, f'Должно быть r2 = {_r2:.4f}: model2.score(X, y)'"} },
        { prompt: "Модель нашла формулу: цена = 0.65 × площадь − 0.5 (млн ₸). Какова прогнозная цена квартиры 80 м² в млн ₸?", unit: "млн ₸", explain: "0.65 × 80 = 52, 52 − 0.5 = 51.5." }
      ]
    },
    "ml-3": {
      title: "Train/test split: честная проверка модели",
      body: `
<p>Представьте, что учитель заранее раздал вопросы экзамена. Студент заучит ответы и наберёт 100 баллов, но тему не поймёт. С моделью так же: если оценивать её на данных, на которых она училась, результат всегда будет обманчиво хорошим.</p>
<p>Решение: делим данные на две части. <b>Train</b> (обычно 80%) — на нём модель учится. <b>Test</b> (20%) — модель его вообще не видит, мы оцениваем на нём только в конце. Это «репетиция» прогноза для новых квартир.</p>
<h3>Overfitting</h3>
<p><b>Overfitting</b> (переобучение) — модель заучивает не общую закономерность, а конкретные примеры (вместе с шумом). Признак: на train очень хорошо, на test намного хуже. Например, decision tree без ограничений (мы пройдём его позже) на данных flats даёт train R² = 1.00, а test R² = 0.51.</p>
<h3>Пример по шагам</h3>
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
<li><code>test_size=0.2</code>: 80 из 400 квартир уходят в test.</li>
<li>Разбиение случайное. <code>random_state=42</code> фиксирует случайность: у любого, кто запустит код, разбиение будет одинаковым. Без него результат меняется при каждом запуске.</li>
<li>Функция возвращает <b>четыре</b> объекта, и порядок важен: <code>X_train, X_test, y_train, y_test</code>.</li>
<li><code>fit</code> — только на train. Test R² (0.587) немного ниже train (0.633) — это нормально. Если разница большая — overfitting.</li>
</ol>
<div class="tip">В classification добавляйте <code>stratify=y</code>: тогда доля ушедших абонентов в train и test будет одинаковой (≈26%).</div>
<h3>Частые ошибки</h3>
<ul>
<li>Обучить модель на всех данных, а потом оценить на test: модель «уже видела» test.</li>
<li>Перепутать порядок возвращаемых значений (написать <code>X_train, y_train, ...</code>).</li>
<li>Менять <code>random_state</code>, пока результат на test не понравится. Это тоже самообман.</li>
<li>Часто смотреть на test и подгонять под него модель. Test — это финальный экзамен, лучше сдавать его один раз.</li>
<li>Случайно разбивать данные, упорядоченные по времени (например, по месяцам): чтобы предсказывать будущее, последний период лучше оставить в test.</li>
</ul>`,
      ex: [
        { prompt: "Создайте <code>X</code> (<code>area_m2</code>, <code>rooms</code>, <code>year_built</code>) и <code>y</code> (<code>price_mln</code>). Разделите их на <code>X_train, X_test, y_train, y_test</code> с <code>test_size=0.2</code>, <code>random_state=42</code>. Выведите размеры train и test.", hints: ["<code>train_test_split(X, y, test_size=0.2, random_state=42)</code>","Получите четыре переменные в одной строке: <code>X_train, X_test, y_train, y_test = ...</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\nassert len(X_train) == 320 and len(X_test) == 80, 'Должно быть 320 строк в train и 80 в test (test_size=0.2)'\nassert list(X_train.columns) == ['area_m2', 'rooms', 'year_built'], 'Столбцы X: area_m2, rooms, year_built'\nassert list(X_test.index) == list(_b.index), 'Разбиение получилось другим: вы указали random_state=42?'\nassert list(y_train.index) == list(X_train.index), 'Проверьте порядок: X_train, X_test, y_train, y_test'"} },
        { prompt: "Разбиение готово. Обучите <code>LinearRegression</code> с именем <code>model</code> <b>только на train</b>. Запишите R² на train в <code>train_r2</code>, на test — в <code>test_r2</code> и выведите их.", hints: ["<code>model.fit(X_train, y_train)</code>","<code>model.score(X_test, y_test)</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'rooms', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert hasattr(model, 'coef_'), 'model не обучена'\nassert abs(train_r2 - _m.score(_a, _c)) < 1e-6, f'Должно быть train_r2 = {_m.score(_a, _c):.4f}: model.score(X_train, y_train)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, f'Должно быть test_r2 = {_m.score(_b, _d):.4f}. Вы обучали модель только на X_train, y_train?'"} },
        { prompt: "Модель дала R² = 0.99 на train и R² = 0.45 на test. Что это?", options: ["Underfitting: модель слишком простая","Overfitting: модель заучила обучающие данные","Отличная модель, test случайно получился плохим","В данных ошибка"], explain: "Большой разрыв между train и test — классический признак overfitting." }
      ]
    },
    "ml-4": {
      title: "Линейная регрессия: коэффициенты и MAE, RMSE, R²",
      body: `
<p>Линейная регрессия с несколькими признаками: <code>цена = b0 + b1 × площадь + b2 × год</code>. Модель подбирает <code>b0</code> (<code>intercept_</code>) и <code>b1, b2</code> (<code>coef_</code>) так, чтобы MSE была минимальной.</p>
<h3>Как читать коэффициент</h3>
<p><code>b1</code> — насколько изменится цена, если площадь вырастет на 1 м², <b>при неизменных остальных признаках</b>. Знак показывает направление: положительный — растёт, отрицательный — снижается.</p>
<h3>Метрики ошибки</h3>
<table>
<tr><th>Метрика</th><th>Смысл</th><th>Единица</th></tr>
<tr><td><b>MAE</b></td><td>среднее |ошибок|: «на сколько обычно ошибается»</td><td>млн ₸</td></tr>
<tr><td><b>RMSE</b></td><td>√(среднее ошибок²): сильнее штрафует большие ошибки</td><td>млн ₸</td></tr>
<tr><td><b>R²</b></td><td>какую долю разброса цен объясняет модель</td><td>безразмерная</td></tr>
</table>
<p>R² = 1 — идеально, R² = 0 — то же самое, что предсказывать среднее, R² &lt; 0 — хуже даже среднего.</p>
<h3>Пример по шагам</h3>
<p>Сначала вручную: истинные цены 30, 40, 50, прогноз 32, 37, 50.</p>
<ol>
<li>Ошибки: +2, −3, 0. MAE = (2 + 3 + 0) / 3 ≈ 1.67.</li>
<li>Квадраты: 4, 9, 0. RMSE = √(13 / 3) ≈ 2.08. Всегда RMSE ≥ MAE.</li>
</ol>
<p>Теперь на данных flats:</p>
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
<li>При одинаковом годе +1 м² ≈ +0.656 млн ₸.</li>
<li>При одинаковой площади дом на 1 год новее ≈ +0.255 млн ₸.</li>
<li>Модель обычно ошибается на ±9 млн ₸. Для сравнения: если просто предсказывать среднее, MAE = 13.8. Модель полезна, но пока грубая: в следующем уроке добавим район (district).</li>
</ol>
<div class="tip">Всегда сравнивайте с <b>baseline</b>: прогнозом «всем среднюю цену». Если модель не лучше него, она не нужна.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Пытаться интерпретировать <code>intercept_</code>: −510 — это «цена квартиры 0 м², построенной в 0 году», смысла нет.</li>
<li>Сравнивать коэффициенты в разных единицах и говорить, «какой важнее».</li>
<li>Считать метрику на train.</li>
<li>Менять порядок аргументов: <code>(y_true, y_pred)</code>.</li>
</ul>`,
      ex: [
        { prompt: "Посчитайте MAE и RMSE <b>вручную</b> с помощью NumPy и запишите их в переменные <code>mae</code> и <code>rmse</code> (sklearn не используйте).", hints: ["Ошибки: <code>err = y_pred - y_true</code>","<code>np.mean(np.abs(err))</code> и <code>np.sqrt(np.mean(err ** 2))</code>"], check: {"tests":"assert abs(mae - 2.75) < 1e-9, 'Должно быть mae = 2.75: среднее |ошибок|'\nassert abs(rmse - 3.5) < 1e-9, 'Должно быть rmse = 3.5: корень из среднего квадратов'"} },
        { prompt: "Признаки <code>area_m2</code>, <code>year_built</code>, разбиение <code>test_size=0.2</code>, <code>random_state=42</code>. Обучите <code>model</code> на train и посчитайте на test <code>mae</code>, <code>rmse</code>, <code>r2</code>. Коэффициент площади запишите в переменную <code>coef_area</code>.", hints: ["Метрики: <code>mean_absolute_error(y_test, pred)</code> и т. д.","<code>coef_area = model.coef_[0]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_a, _b, _c, _d = _tts(_f[['area_m2', 'year_built']], _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\n_e = _m.predict(_b) - _d\nassert abs(mae - _np.mean(_np.abs(_e))) < 1e-6, f'Должно быть mae ≈ {_np.mean(_np.abs(_e)):.2f} (на test-данных)'\nassert abs(rmse - _np.sqrt(_np.mean(_e ** 2))) < 1e-6, f'Должно быть rmse ≈ {_np.sqrt(_np.mean(_e ** 2)):.2f}'\nassert abs(r2 - _m.score(_b, _d)) < 1e-6, f'Должно быть r2 ≈ {_m.score(_b, _d):.3f}'\nassert abs(coef_area - _m.coef_[0]) < 1e-6, 'coef_area — model.coef_[0] (area_m2 — первый столбец)'"} },
        { prompt: "В модели коэффициент <code>area_m2</code> равен 0.656 (млн ₸ / м²). Из двух квартир одного года одна на 10 м² больше. На сколько (млн ₸) различаются их цены по модели?", unit: "млн ₸", explain: "10 × 0.656 = 6.56 млн ₸. Так читать можно только при одинаковых остальных признаках." }
      ]
    },
    "ml-5": {
      title: "Категориальные признаки: one-hot encoding",
      body: `
<p>В Алматы цену сильнее всего определяет район (district). Но <code>district</code> — это текст («Медеу», «Алатау»), а модель работает только с числами.</p>
<h3>Почему не пронумеровать 1, 2, 3...?</h3>
<p>Если сказать Алатау = 0, Алмалы = 1, ..., Медеу = 3, модель решит, что «Медеу в три раза больше Алмалы» или что «районы стоят на одной линии». Такого порядка нет. Проверено: с пронумерованным district test R² = 0.63 — как будто район не добавляли вовсе.</p>
<h3>One-hot encoding</h3>
<p>Для каждого района — отдельный столбец 0/1: 1, если квартира в этом районе, иначе 0.</p>
<table>
<tr><th>district</th><th>district_Алмалы</th><th>district_Медеу</th><th>...</th></tr>
<tr><td>Алмалы</td><td>1</td><td>0</td><td>...</td></tr>
<tr><td>Медеу</td><td>0</td><td>1</td><td>...</td></tr>
<tr><td>Алатау</td><td>0</td><td>0</td><td>...</td></tr>
</table>
<h3>Пример по шагам</h3>
<pre><code>X = pd.get_dummies(flats[['area_m2', 'year_built', 'district']],
                   columns=['district'], drop_first=True, dtype=int)
print(X.shape)        # (400, 7)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))   # 0.911 (раньше 0.635)</code></pre>
<ol>
<li>6 районов → 6 столбцов. <code>drop_first=True</code> удаляет первый (Алатау): если остальные пять равны 0, понятно, что квартира в Алатау. Это <b>базовый</b> (baseline) район.</li>
<li><code>dtype=int</code> даёт 1/0 вместо True/False.</li>
<li>Итог: 2 числовых столбца + 5 столбцов районов = 7.</li>
<li>Коэффициенты: <code>district_Медеу</code> ≈ 21.8. То есть квартира той же площади и того же года в Медеу примерно на 21.8 млн ₸ дороже, чем в Алатау.</li>
<li>Test R² 0.635 → 0.911, MAE 9.0 → 3.8 млн ₸. Один столбец радикально улучшил модель.</li>
</ol>
<div class="tip">Делайте get_dummies один раз для всего X, до разбиения на train/test. Тогда в обеих частях столбцы будут одинаковыми.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Подавать категорию номером (label encoding) в линейную модель.</li>
<li>Делать get_dummies отдельно для train и test: если какой-то район не встретится в test, число столбцов не совпадёт.</li>
<li>Применять one-hot к столбцу с тысячами значений (например, <code>customer_id</code>): появятся тысячи бесполезных столбцов.</li>
<li>Забыть <code>columns=</code> и подать весь DataFrame: тогда закодируются все текстовые столбцы, что иногда даёт неожиданный результат.</li>
</ul>`,
      ex: [
        { prompt: "Создайте <code>X</code> из столбцов <code>area_m2</code>, <code>year_built</code>, <code>district</code> таблицы <code>flats</code> с помощью <code>pd.get_dummies</code>: <code>columns=['district']</code>, <code>drop_first=True</code>, <code>dtype=int</code>. Выведите <code>X.columns</code>.", hints: ["<code>pd.get_dummies(flats[[...]], columns=['district'], drop_first=True, dtype=int)</code>"], check: {"tests":"assert isinstance(X, pd.DataFrame), 'X должен быть DataFrame'\nassert 'district' not in X.columns, 'Текстового столбца district не должно остаться: columns=[\"district\"]'\nassert X.shape == (400, 7), f'Форма X должна быть (400, 7), у вас {X.shape}. Вы указали drop_first=True?'\nassert 'district_Медеу' in X.columns and 'district_Алатау' not in X.columns, 'Алатау (первый) удаляется, district_Медеу остаётся'\nassert all(str(_t).startswith('int') or str(_t).startswith('float') for _t in X.dtypes), 'Все столбцы должны быть числовыми: dtype=int'"} },
        { prompt: "One-hot <code>X</code> готов. Разделите его с <code>test_size=0.2</code>, <code>random_state=42</code> и обучите <code>model</code>. Запишите test R² в <code>test_r2</code>, а коэффициент <code>district_Медеу</code> — в <code>coef_medeu</code>.", hints: ["Индекс: <code>list(X.columns).index('district_Медеу')</code>","<code>model.coef_[i]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.linear_model import LinearRegression as _LinR\nfrom sklearn.model_selection import train_test_split as _tts\n_f = _pd.read_csv('flats.csv')\n_X = _pd.get_dummies(_f[['area_m2', 'year_built', 'district']], columns=['district'], drop_first=True, dtype=int)\n_a, _b, _c, _d = _tts(_X, _f['price_mln'], test_size=0.2, random_state=42)\n_m = _LinR().fit(_a, _c)\nassert hasattr(model, 'coef_') and model.n_features_in_ == 7, 'model должна обучаться на one-hot X (7 столбцов)'\nassert abs(test_r2 - _m.score(_b, _d)) < 1e-6, f'Должно быть test_r2 ≈ {_m.score(_b, _d):.3f}: обучите на train, оцените на test'\n_cm = _m.coef_[list(_X.columns).index('district_Медеу')]\nassert abs(coef_medeu - _cm) < 1e-6, f'Должно быть coef_medeu ≈ {_cm:.2f}: найдите индекс столбца district_Медеу'"} },
        { prompt: "Почему плохо пронумеровать district как 0, 1, 2, ... и подать в линейную модель?", options: ["Числа слишком большие","Модель «придумывает» между районами порядок и расстояния, которых нет","sklearn сам понимает текст","Нумерация слишком медленная"], explain: "Линейная модель читает это как «номер вырос на 1 — цена выросла на b». У районов такого порядка нет, поэтому нужен one-hot." }
      ]
    },
    "ml-6": {
      title: "k-nearest neighbours и масштабирование признаков",
      body: `
<p><b>k-nearest neighbours</b> (KNN, метод k ближайших соседей) — самая понятная модель. Чтобы узнать цену новой квартиры, вы находите в train <b>k самых похожих квартир</b> и берёте среднее их цен. В classification — большинство голосов соседей. Сходство измеряется евклидовым расстоянием из модуля Math for ML.</p>
<h3>Проблема масштаба</h3>
<p>Расстояние складывает все столбцы одинаково. А <code>area_m2</code> меняется на десятки единиц, тогда как <code>district_Медеу</code> — только 0 или 1. В результате для KNN разница в 3 м² выглядит больше, чем разница в районе.</p>
<h3>Пример по шагам</h3>
<table>
<tr><th>Квартира</th><th>area_m2</th><th>district_Медеу</th><th>district_Алатау</th></tr>
<tr><td>A</td><td>60</td><td>1</td><td>0</td></tr>
<tr><td>B</td><td>63</td><td>0</td><td>1</td></tr>
<tr><td>C</td><td>70</td><td>1</td><td>0</td></tr>
</table>
<ol>
<li>Сырое расстояние: A–B = √(3² + 1² + 1²) ≈ 3.3, A–C = √(10²) = 10. Для KNN B «ближе», хотя она в дешёвом районе!</li>
<li><b>StandardScaler</b> переводит каждый столбец в z-score: <code>(x − среднее) / SD</code> (знакомо по модулю Statistics). SD площади ≈ 20, SD dummy ≈ 0.37.</li>
<li>После масштабирования: A–B ≈ √(0.15² + 2.7² + 2.7²) ≈ 3.8, A–C ≈ 10 / 20 = 0.5. Теперь C намного ближе. Правильно.</li>
</ol>
<pre><code>from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
scaler.fit(X_train)                     # среднее и SD только по train
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)     # теми же числами

knn = KNeighborsRegressor(n_neighbors=5).fit(X_train_s, y_train)
print(knn.score(X_test_s, y_test))      # 0.91 (без масштабирования 0.57)</code></pre>
<p>С площадью, годом и one-hot столбцами district KNN без масштабирования даёт test R² = 0.57, с масштабированием — 0.91.</p>
<div class="tip">Масштабирование нужно моделям, которые опираются на расстояние или градиент (KNN, logistic regression, нейронные сети). Decision tree оно не нужно.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Обучать (<code>fit</code>) scaler на всех данных или на test: информация о test «утекает» в модель (leakage).</li>
<li>Забыть сделать <code>transform</code> для test: модель сравнивает масштабированный train с сырым test.</li>
<li><code>n_neighbors=1</code>: модель заучивает каждый шум, overfitting.</li>
<li>Масштабировать target (<code>y</code>): для KNN и регрессии это не нужно.</li>
</ul>`,
      ex: [
        { prompt: "Отмасштабируйте <code>flats[['area_m2', 'year_built']]</code> через <code>StandardScaler</code> и запишите результат в <code>Xs</code> (<code>fit_transform</code>). Выведите среднее и SD каждого столбца.", hints: ["<code>scaler = StandardScaler()</code>","<code>Xs = scaler.fit_transform(flats[['area_m2', 'year_built']])</code>"], check: {"tests":"import numpy as _np\nassert _np.asarray(Xs).shape == (400, 2), 'Форма Xs должна быть (400, 2)'\nassert _np.all(_np.abs(_np.asarray(Xs).mean(axis=0)) < 1e-9), 'Среднее масштабированных столбцов должно быть 0'\nassert _np.all(_np.abs(_np.asarray(Xs).std(axis=0) - 1) < 1e-9), 'SD масштабированных столбцов должно быть 1'"} },
        { prompt: "Разбиение готово. Обучите две модели KNN (<code>n_neighbors=5</code>): (1) на сырых данных, test R² → <code>r2_raw</code>; (2) со <code>StandardScaler</code>, обученным на train, test R² → <code>r2_scaled</code>. Выведите оба значения.", hints: ["<code>scaler = StandardScaler().fit(X_train)</code>","<code>knn_s.fit(scaler.transform(X_train), y_train)</code>, оценка — с <code>scaler.transform(X_test)</code>"], check: {"tests":"assert abs(r2_raw - 0.574) < 0.01, f'Должно быть r2_raw ≈ 0.574 (без масштабирования, k=5), у вас {r2_raw:.3f}'\nassert abs(r2_scaled - 0.912) < 0.01, f'Должно быть r2_scaled ≈ 0.912, у вас {r2_scaled:.3f}. Вы обучили scaler (fit) на X_train и сделали transform обеих частей?'"} },
        { prompt: "На каких данных нужно обучать (<code>fit</code>) <code>StandardScaler</code>?", options: ["На всех данных (train + test)","Только на train, затем сделать transform для train и test","Только на test","Отдельно на train и на test"], explain: "Среднее и SD должны браться только из train. Иначе информация о test утекает в модель, а отдельный fit приводит две части к разным шкалам." }
      ]
    },
    "ml-7": {
      title: "Логистическая регрессия: вероятность churn",
      body: `
<p>Теперь classification: уйдёт ли абонент телеком-оператора в следующем месяце (<code>churned</code> = 1) или останется (0)? Линейная регрессия здесь неудобна: она даёт бессмысленные значения вроде −0.3 или 1.4. Нам нужна <b>вероятность</b> от 0 до 1.</p>
<h3>Sigmoid</h3>
<p><b>Logistic regression</b> сначала считает линейную сумму: <code>z = b0 + b1·x1 + ...</code>, а затем пропускает её через функцию <b>sigmoid</b>: <code>p = 1 / (1 + e<sup>−z</sup>)</code>. При z = 0 p = 0.5, при большом z p → 1, при отрицательном z p → 0.</p>
<h3>Пример по шагам</h3>
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
<li>В <code>age</code> и <code>data_gb</code> есть пропуски, а sklearn не принимает NaN. Поэтому мы взяли четыре признака без пропусков.</li>
<li><code>stratify=y</code>: доля ушедших в train и test одинакова (≈26%).</li>
<li><code>predict_proba</code> возвращает два столбца: [P(0), P(1)]. Нам нужна вероятность ухода, то есть <code>[:, 1]</code>.</li>
<li><code>predict</code> = 1, если вероятность ≥ <b>0.5</b>. У первого абонента p = 0.44, поэтому 0, но он на границе.</li>
<li>Знаки коэффициентов: <code>tenure_months</code> отрицательный (давние клиенты лояльны), <code>support_calls</code> положительный (много жалоб — признак ухода), <code>has_contract</code> отрицательный.</li>
</ol>
<h3>Меняем порог</h3>
<p>0.5 — не закон. Если отдел удержания (retention) хочет удержать больше абонентов, он снижает порог: <code>(proba &gt;= 0.3).astype(int)</code> — и «рискованными» помечается больше людей.</p>
<div class="tip">Если появилось <i>ConvergenceWarning</i>, поставьте <code>max_iter=1000</code> или отмасштабируйте признаки.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Брать <code>predict_proba(X)[:, 0]</code> — это вероятность <b>остаться</b>.</li>
<li>Подавать столбцы с NaN без проверки: ошибка <i>Input X contains NaN</i>.</li>
<li>Использовать <code>predict</code> там, где нужна вероятность: теряется возможность выбрать порог.</li>
</ul>`,
      ex: [
        { prompt: "Разбиение готово. Обучите <code>LogisticRegression(max_iter=1000)</code> с именем <code>clf</code>. Запишите вероятность ухода на test в <code>proba</code> (<code>predict_proba(...)[:, 1]</code>), accuracy — в <code>acc</code> и выведите их.", hints: ["<code>clf.fit(X_train, y_train)</code>","<code>clf.predict_proba(X_test)[:, 1]</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nassert hasattr(clf, 'coef_'), 'clf не обучен: clf.fit(X_train, y_train)'\nassert len(proba) == 150, 'proba должна быть для 150 абонентов из test'\nassert _np.all((_np.asarray(proba) >= 0) & (_np.asarray(proba) <= 1)), 'proba должна быть между 0 и 1'\nassert abs(_np.mean(proba) - _np.mean(_p)) < 0.02, 'proba должна быть вероятностью ухода: возьмите столбец [:, 1]'\nassert abs(acc - _m.score(_Xte, _yte)) < 0.02, f'Должно быть acc ≈ {_m.score(_Xte, _yte):.3f}: clf.score(X_test, y_test)'"} },
        { prompt: "Модель и <code>proba</code> готовы. Поставьте порог 0.3 и запишите прогноз в <code>pred_03</code> (массив 0/1). Число «рискованных» абонентов при пороге 0.5 запишите в <code>n_05</code>, при пороге 0.3 — в <code>n_03</code> и выведите.", hints: ["<code>(proba &gt;= 0.3).astype(int)</code>","<code>int(pred_03.sum())</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\n_n5 = int((_p >= 0.5).sum())\n_n3 = int((_p >= 0.3).sum())\nassert len(pred_03) == 150 and set(_np.unique(pred_03)) <= {0, 1}, 'pred_03 — массив из 150 значений 0/1'\nassert abs(n_05 - _n5) <= 2, f'Должно быть n_05 ≈ {_n5}: clf.predict(X_test).sum()'\nassert abs(n_03 - _n3) <= 2 and n_03 == int(_np.sum(pred_03)), f'Должно быть n_03 ≈ {_n3}: (proba >= 0.3).sum()'\nassert n_03 > n_05, 'Если понизить порог, рискованных абонентов должно стать больше'"} },
        { prompt: "Logistic regression для одного абонента посчитала z = 2. Какова вероятность ухода по sigmoid p = 1 / (1 + e<sup>−2</sup>)? (до трёх знаков)", explain: "e<sup>−2</sup> ≈ 0.135. 1 / 1.135 ≈ 0.881." }
      ]
    },
    "ml-8": {
      title: "Метрики classification: accuracy недостаточно",
      body: `
<p>Accuracy нашей модели — 80.7%. Это хорошо? Проверим: из 150 абонентов в test ушли 39 (26%). Глупая модель, которая говорит «никто не уйдёт», получит accuracy 111 / 150 = <b>74%</b>. Мы обгоняем её всего на 7 пунктов. Когда классы несбалансированы (imbalanced), accuracy обманывает.</p>
<h3>Confusion matrix</h3>
<p>В sklearn <code>confusion_matrix(y_test, pred)</code> устроена так:</p>
<table>
<tr><th></th><th>Прогноз 0</th><th>Прогноз 1</th></tr>
<tr><td><b>Факт 0</b></td><td>TN = 105</td><td>FP = 6</td></tr>
<tr><td><b>Факт 1</b></td><td>FN = 23</td><td>TP = 16</td></tr>
</table>
<ul>
<li><b>Precision</b> = TP / (TP + FP): какая доля тех, про кого сказали «уйдёт», действительно ушла.</li>
<li><b>Recall</b> = TP / (TP + FN): какую долю реально ушедших мы нашли.</li>
<li><b>F1</b> — гармоническое среднее двух: 2·P·R / (P + R).</li>
</ul>
<h3>Пример по шагам</h3>
<ol>
<li>Precision = 16 / (16 + 6) = 0.727. Когда предупреждаем, мы правы в 73% случаев.</li>
<li>Recall = 16 / (16 + 23) = 0.41. 59% ушедших мы не заметили!</li>
<li>F1 = 2 · 0.727 · 0.41 / (0.727 + 0.41) ≈ 0.525.</li>
<li>Если снизить порог до 0.3: TP = 30, FP = 29, FN = 9. Recall = 0.77, precision = 0.51. Ловим больше уходящих, но и «ложных тревог» больше.</li>
<li>Что правильно — решает бизнес: если предложить скидку абоненту дёшево, а потерять его дорого, recall важнее.</li>
</ol>
<h3>ROC AUC</h3>
<p>Precision и recall зависят от порога. <b>ROC AUC</b> от порога не зависит: это вероятность того, что для случайно выбранных ушедшего и оставшегося абонентов модель даст ушедшему более высокую вероятность. 0.5 — подбрасывание монеты, 1.0 — идеал. У нас ≈ 0.82.</p>
<pre><code>from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score
pred = clf.predict(X_test)
print(confusion_matrix(y_test, pred))
print(precision_score(y_test, pred), recall_score(y_test, pred), f1_score(y_test, pred))
print(roc_auc_score(y_test, proba))   # вероятность, а не 0/1!</code></pre>
<h3>Частые ошибки</h3>
<ul>
<li>На несбалансированных данных смотреть только на accuracy. Всегда сравнивайте с baseline.</li>
<li>Менять порядок аргументов: <code>(y_true, y_pred)</code>, а не наоборот. Иначе precision и recall поменяются местами.</li>
<li>Подавать в <code>roc_auc_score</code> прогноз 0/1: AUC теряет смысл.</li>
</ul>`,
      ex: [
        { prompt: "Без sklearn, вручную: посчитайте <code>tp</code>, <code>fp</code>, <code>fn</code>, <code>tn</code> и вычислите <code>precision</code> и <code>recall</code>.", hints: ["TP: факт 1, прогноз 1. FP: факт 0, прогноз 1. FN: факт 1, прогноз 0.","<code>list(zip(y_true, y_pred)).count((1, 1))</code>"], check: {"tests":"assert (tp, fp, fn, tn) == (3, 1, 2, 4), 'Должно быть tp=3, fp=1, fn=2, tn=4: посчитайте каждую пару (факт, прогноз)'\nassert abs(precision - 0.75) < 1e-9, 'precision = tp / (tp + fp) = 0.75'\nassert abs(recall - 0.6) < 1e-9, 'recall = tp / (tp + fn) = 0.6'"} },
        { prompt: "Модель готова. По <code>pred = clf.predict(X_test)</code> посчитайте <code>cm</code> (confusion matrix), <code>prec</code>, <code>rec</code>, <code>f1</code>. <code>auc</code> посчитайте по <code>proba</code>. Выведите всё.", hints: ["Все метрики: <code>(y_test, pred)</code>","<code>roc_auc_score(y_test, proba)</code>"], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\n_pr = _m.predict(_Xte)\nassert _np.asarray(cm).shape == (2, 2) and _np.asarray(cm).sum() == 150, 'cm — матрица 2×2, сумма 150'\nassert _np.asarray(cm)[1, 1] == _mt.confusion_matrix(_yte, _pr)[1, 1], 'cm[1, 1] (TP) не совпадает: confusion_matrix(y_test, pred)'\nassert abs(prec - _mt.precision_score(_yte, _pr)) < 0.02, f'prec ≈ {_mt.precision_score(_yte, _pr):.3f}. Порядок аргументов: (y_test, pred)'\nassert abs(rec - _mt.recall_score(_yte, _pr)) < 0.02, f'rec ≈ {_mt.recall_score(_yte, _pr):.3f}'\nassert abs(f1 - _mt.f1_score(_yte, _pr)) < 0.02, f'f1 ≈ {_mt.f1_score(_yte, _pr):.3f}'\nassert abs(auc - _mt.roc_auc_score(_yte, _p)) < 0.02, f'auc ≈ {_mt.roc_auc_score(_yte, _p):.3f}. Передайте в roc_auc_score proba, а не pred'"} },
        { prompt: "Confusion matrix: TN = 82, FP = 29, FN = 9, TP = 30. Чему равен recall? (до трёх знаков)", explain: "Recall = TP / (TP + FN) = 30 / 39 ≈ 0.769." }
      ]
    },
    "ml-9": {
      title: "Decision trees: глубина и overfitting",
      body: `
<p><b>Decision tree</b> (дерево решений) — цепочка вопросов «да/нет», как в игре «20 вопросов». На наших обучающих данных churn дерево глубины 2 нашло вот что:</p>
<pre><code>tenure_months &lt;= 26.5 ?
├─ да → has_contract == 0 ?
│        ├─ да → уходит    (63 ушедших / 107)
│        └─ нет → остаётся (22 / 74)
└─ нет → support_calls &lt;= 2.5 ?
         ├─ да → остаётся  (17 / 221)
         └─ нет → остаётся (14 / 48)</code></pre>
<p>На каждом шаге дерево само выбирает вопрос (признак и порог), который лучше всего разделяет классы. Чистота измеряется индексом Gini, но интуиция простая: после разбиения в каждой группе должен преобладать один класс.</p>
<h3>Глубина = сложность</h3>
<p><code>max_depth</code> — самая длинная цепочка вопросов. Если её не ограничить, дерево сделает отдельный лист для каждого абонента и полностью заучит обучающие данные.</p>
<h3>Пример по шагам</h3>
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
<li>Глубина 1: всего один вопрос, модель слишком простая (underfitting): обе оценки низкие.</li>
<li>Глубина 3: лучшая на test.</li>
<li>С ростом глубины train растёт, а test <b>падает</b>: overfitting.</li>
<li>Дерево без ограничений даёт 99% на train, а на test хуже даже baseline «никто не уйдёт» (74%).</li>
</ol>
<p><code>tree.feature_importances_</code> показывает вклад каждого признака в разбиения: у дерева глубины 3 <code>tenure_months</code> ≈ 0.55, <code>support_calls</code> ≈ 0.24.</p>
<div class="tip">Дереву масштабирование не нужно: оно спрашивает только «x ≤ порог?», единицы измерения не важны.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Не задавать <code>max_depth</code>: по умолчанию дерево растёт без ограничений.</li>
<li>Читать <code>feature_importances_</code> как причину или направление: это лишь «насколько признак полезен для разбиения».</li>
<li>Выбирать глубину по результату на test. Так test «изнашивается». В следующем уроке выберем правильно — через cross-validation.</li>
</ul>`,
      ex: [
        { prompt: "Обучите <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> с именем <code>tree</code>. Test accuracy → <code>test_acc</code>. Название самого важного признака (по <code>feature_importances_</code>) запишите в <code>top_feature</code>.", hints: ["<code>pd.Series(tree.feature_importances_, index=features)</code>","<code>.idxmax()</code> возвращает индекс (название) наибольшего значения"], check: {"tests":"from sklearn.tree import DecisionTreeClassifier as _DT\nassert isinstance(tree, _DT) and tree.get_depth() <= 3, 'tree — DecisionTreeClassifier с max_depth=3'\nassert abs(test_acc - 0.807) < 0.02, f'Должно быть test_acc ≈ 0.807, у вас {test_acc:.3f}'\nassert top_feature == 'tenure_months', 'Самый важный признак другой: возьмите название с наибольшим значением feature_importances_'"} },
        { prompt: "Для глубин <code>[1, 2, 3, 4, 5, 6, 8, None]</code> обучите дерево (<code>random_state=0</code>) и запишите в словарь <code>results</code> пары <code>depth: (train_acc, test_acc)</code>. Глубину с самой высокой test accuracy запишите в <code>best_depth</code>.", hints: ["Цикл: <code>for d in [1, 2, 3, 4, 5, 6, 8, None]:</code>","<code>max(results, key=lambda d: results[d][1])</code>"], check: {"tests":"assert set(results) == {1, 2, 3, 4, 5, 6, 8, None}, 'В results должны быть все 8 глубин (включая None)'\nassert all(len(v) == 2 for v in results.values()), 'Каждое значение — пара (train_acc, test_acc)'\nassert results[None][0] > 0.95, 'train accuracy дерева без ограничений должна быть ≈ 0.99: сначала train, потом test'\nassert results[None][1] < results[3][1], 'Дерево без ограничений на test должно быть хуже дерева глубины 3'\nassert best_depth == 3, f'Должно быть best_depth = 3, у вас {best_depth}. Выбирайте по test accuracy (второй элемент)'"} },
        { prompt: "Дерево дало 0.99 на train и 0.69 на test. Что нужно сделать?", options: ["Увеличить max_depth","Уменьшить max_depth (упростить дерево)","Отмасштабировать признаки","Добавить test-данные в train"], explain: "Это overfitting. Ограничение глубины упрощает модель. Масштаб на дерево не влияет, а добавление test в train ломает оценку." }
      ]
    },
    "ml-10": {
      title: "Cross-validation и bias-variance trade-off",
      body: `
<p>Одно разбиение train/test — это всего один экзамен. Если в test попадут «лёгкие» абоненты, модель будет выглядеть лучше, чем есть. Вдобавок, если выбирать глубину по test, он больше не честный.</p>
<h3>K-fold cross-validation</h3>
<p>Делим данные на 5 равных частей (fold). 5 раз: учимся на 4 частях, оцениваем на оставшейся 1. Каждый абонент ровно один раз попадает в test. Результат — 5 оценок, по ним считаем <b>среднее ± SD</b>.</p>
<pre><code>from sklearn.model_selection import cross_val_score
scores = cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=0),
                         X, y, cv=5)
print(scores)                       # [0.742 0.742 0.833 0.767 0.808]
print(scores.mean(), scores.std())  # 0.778 0.037</code></pre>
<p>Для classifier <code>cv=5</code> сам использует стратифицированное (stratified) разбиение. SD — это устойчивость: в одном fold 0.74, в другом 0.83, то есть результату одного разбиения нельзя доверять с точностью лучше ±4 пунктов.</p>
<h3>Пример по шагам: выбираем глубину</h3>
<table>
<tr><th>max_depth</th><th>Среднее CV</th><th>SD</th></tr>
<tr><td>2</td><td>0.772</td><td>0.039</td></tr>
<tr><td>3</td><td>0.778</td><td>0.037</td></tr>
<tr><td>5</td><td>0.758</td><td>0.015</td></tr>
<tr><td>None</td><td>0.715</td><td>0.038</td></tr>
</table>
<ol>
<li>Для каждой глубины — <code>cross_val_score</code> (на всех X, y).</li>
<li>Выбираем самое высокое среднее: 3.</li>
<li>Разница между 0.772 и 0.778 намного меньше SD. На самом деле 2 и 3 одинаково хороши, можно взять более простую.</li>
</ol>
<h3>Bias-variance trade-off</h3>
<ul>
<li><b>High bias</b> (underfitting): модель слишком простая, плохо и на train, и на test. Глубина 1.</li>
<li><b>High variance</b> (overfitting): отлично на train, плохо на test; если немного изменить данные, результат сильно меняется. Дерево без ограничений.</li>
<li>Цель — середина: выбрать сложность, при которой CV лучше всего.</li>
</ul>
<h3>Масштабирование и Pipeline</h3>
<p>Если обучить scaler на всех данных до CV — это leakage. <code>make_pipeline(StandardScaler(), LogisticRegression())</code> ведёт себя как одна модель, поэтому в каждом fold scaler обучается только на train-части этого fold. Logistic regression: CV 0.790 ± 0.033.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Сообщать только среднее и забывать SD.</li>
<li>Масштабировать все данные до CV.</li>
<li>Слишком большой <code>cv</code> (например, 50): долго, и каждый fold слишком маленький.</li>
<li>Выбрав глубину через CV, забыть заново обучить финальную модель на всех обучающих данных.</li>
</ul>`,
      ex: [
        { prompt: "Выполните <code>cross_val_score</code> для <code>make_pipeline(StandardScaler(), LogisticRegression())</code> с <code>cv=5</code> на всех <code>X</code>, <code>y</code>. Запишите результат в <code>scores</code>, среднее — в <code>cv_mean</code>, SD — в <code>cv_std</code> и выведите.", hints: ["<code>pipe = make_pipeline(StandardScaler(), LogisticRegression())</code>","<code>cross_val_score(pipe, X, y, cv=5)</code>"], check: {"tests":"import numpy as _np\nassert len(scores) == 5, 'cv=5: должно быть 5 оценок'\nassert abs(cv_mean - _np.mean(scores)) < 1e-9 and abs(cv_std - _np.std(scores)) < 1e-9, 'cv_mean = scores.mean(), cv_std = scores.std()'\nassert abs(cv_mean - 0.79) < 0.02, f'Должно быть cv_mean ≈ 0.79, у вас {cv_mean:.3f}. Вы оценили Pipeline на всех X, y с cv=5?'"} },
        { prompt: "Для глубин <code>[1, 2, 3, 4, 5, None]</code> запишите среднее 5-fold CV для <code>DecisionTreeClassifier(max_depth=d, random_state=0)</code> в словарь <code>cv_means</code>. Лучшую глубину запишите в <code>best_depth</code>.", hints: ["<code>cross_val_score(DecisionTreeClassifier(max_depth=d, random_state=0), X, y, cv=5).mean()</code>","<code>max(cv_means, key=cv_means.get)</code>"], check: {"tests":"from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.tree import DecisionTreeClassifier as _DT\nassert set(cv_means) == {1, 2, 3, 4, 5, None}, 'В cv_means должно быть 6 глубин (включая None)'\n_ref = {d: _cvs(_DT(max_depth=d, random_state=0), X, y, cv=5).mean() for d in [1, 2, 3, 4, 5, None]}\nassert all(abs(cv_means[d] - _ref[d]) < 0.01 for d in _ref), 'Средние CV не совпадают: cv=5, random_state=0, все X, y'\nassert best_depth == max(_ref, key=_ref.get), f'Должно быть best_depth = {max(_ref, key=_ref.get)}: глубина с наибольшим средним CV'\nassert cv_means[None] < cv_means[best_depth], 'CV-результат дерева без ограничений должен быть ниже лучшего'"} },
        { prompt: "У модели train accuracy 0.74, CV accuracy 0.74, и baseline «никто не уйдёт» тоже 0.74. Что это?", options: ["High variance (overfitting)","High bias (underfitting): модель слишком простая","Отличная модель","Data leakage"], explain: "И на train, и на CV — уровень baseline: модель не уловила закономерность. Нужна более сложная модель или лучшие признаки." }
      ]
    },
    "ml-gate": {
      title: "Экзамен модуля: ML Foundations",
      body: `
<p>Итоговая проверка: регрессия, классификация и выбор модели. Во всех заданиях используйте указанный <code>random_state</code> и обучайте модель только на train. Подсказок нет.</p>`,
      ex: [
        { prompt: "Модель цены квартир. Создайте <code>X</code> из признаков <code>area_m2</code>, <code>rooms</code>, <code>year_built</code> и one-hot <code>district</code> (<code>drop_first=True</code>, <code>dtype=int</code>), <code>y = price_mln</code>. Разделите с <code>test_size=0.2</code>, <code>random_state=42</code> и обучите <code>LinearRegression</code> с именем <code>model</code>. Посчитайте на test <code>test_mae</code> и <code>test_r2</code>.", hints: [], check: {"tests":"assert hasattr(model, 'coef_') and model.n_features_in_ == 8, 'model должна обучаться на 8 признаках: 3 числовых + 5 столбцов district'\nassert len(X_test) == 80, 'В test должно быть 80 строк'\nassert abs(test_r2 - 0.911) < 0.01, f'Должно быть test_r2 ≈ 0.911, у вас {test_r2:.3f}'\nassert abs(test_mae - 3.83) < 0.1, f'Должно быть test_mae ≈ 3.83, у вас {test_mae:.2f}'"} },
        { prompt: "Отдел удержания просит находить не меньше 70% ушедших (recall ≥ 0.70), но так, чтобы не меньше 45% предупреждений были верными (precision ≥ 0.45). Разбиение готово. Обучите модель, выберите порог и запишите прогноз 0/1 на test в <code>pred</code>. Посчитайте и выведите <code>rec</code> и <code>prec</code>.", hints: [], check: {"tests":"import pandas as _pd\nimport numpy as _np\nfrom sklearn.model_selection import train_test_split as _tts\nfrom sklearn.linear_model import LogisticRegression as _LogR\n_c = _pd.read_csv('churn.csv')\n_F = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n_Xtr, _Xte, _ytr, _yte = _tts(_c[_F], _c['churned'], test_size=0.25, random_state=42, stratify=_c['churned'])\n_m = _LogR(max_iter=1000).fit(_Xtr, _ytr)\n_p = _m.predict_proba(_Xte)[:, 1]\nfrom sklearn import metrics as _mt\nassert len(pred) == 150, 'pred — для 150 абонентов из test'\nassert list(y_test.index) == list(_yte.index), 'Не меняйте разбиение'\n_r = _mt.recall_score(_yte, _np.asarray(pred))\n_q = _mt.precision_score(_yte, _np.asarray(pred), zero_division=0)\nassert _r >= 0.70, f'Recall {_r:.3f}, нужно не меньше 0.70: понизьте порог'\nassert _q >= 0.45, f'Precision {_q:.3f}, нужно не меньше 0.45: вы слишком сильно понизили порог'\nassert abs(rec - _r) < 1e-9 and abs(prec - _q) < 1e-9, 'rec, prec — recall_score(y_test, pred), precision_score(y_test, pred)'"} },
        { prompt: "Выберите лучшее k для KNN classifier. Для каждого k из <code>[3, 5, 9, 15, 25]</code> запишите среднюю accuracy 5-fold CV для <code>make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k))</code> в словарь <code>cv_scores</code>. Лучшее k → <code>best_k</code>.", hints: [], check: {"tests":"from sklearn.model_selection import cross_val_score as _cvs\nfrom sklearn.pipeline import make_pipeline as _mp\nfrom sklearn.preprocessing import StandardScaler as _SS\nfrom sklearn.neighbors import KNeighborsClassifier as _KNC\nassert set(cv_scores) == {3, 5, 9, 15, 25}, 'В cv_scores должно быть 5 значений k'\n_ref = {k: _cvs(_mp(_SS(), _KNC(n_neighbors=k)), X, y, cv=5).mean() for k in [3, 5, 9, 15, 25]}\nassert all(abs(cv_scores[k] - _ref[k]) < 0.005 for k in _ref), 'Результаты CV не совпадают: scaler внутри pipeline, cv=5'\nassert best_k == max(_ref, key=_ref.get), f'Должно быть best_k = {max(_ref, key=_ref.get)}'"} },
        { prompt: "Модель churn (уходящих 26%) дала на test accuracy = 0.74 и recall = 0. Что произошло?", options: ["Модель отличная, accuracy высокая","Модель всем говорит «не уйдёт»: это просто baseline","Overfitting","Масштабирование не нужно"], explain: "Recall = 0 — не найден ни один уходящий. Accuracy 74% — это в точности baseline «никто не уйдёт»." },
        { prompt: "Confusion matrix: TN = 105, FP = 6, FN = 23, TP = 16. Чему равен precision? (до трёх знаков)", explain: "Precision = TP / (TP + FP) = 16 / 22 ≈ 0.727." }
      ]
    }
  }
});
