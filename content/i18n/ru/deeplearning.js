// M6.4 Deep Learning Intro and M6.6 ML Capstone: Russian text. Code, solutions and expected output are in content/deeplearning.js.
DJ.i18n.patch({
  modules: {
    'm6-4': { intro: 'Вы увидите изнутри, как нейронные сети «учатся»: на numpy напишете нейрон, forward pass, loss, gradient descent и backpropagation и сами обучите маленькую сеть, которая решает XOR. Затем переложите те же шаги на PyTorch и разберётесь в идее CNN и transfer learning.' },
    'm6-6': { intro: 'Модель churn, которую вы сделали в ноутбуке в M5, теперь превратится в настоящий сервис: постановка задачи и метрика успеха, данные и baseline, сохраняемый artifact модели, predict endpoint с валидацией, тесты, мониторинг drift и README. Все идеи модулей M6.1–M6.3 сходятся в одном проекте.' }
  },
  lessons: {
    'dl-1': {
      title: 'Нейрон и функции активации',
      body: `
<p>Кирпичик deep learning — <b>нейрон</b>. Он делает очень простой расчёт: умножает входы на веса и складывает, добавляет bias, а затем пропускает результат через <b>функцию активации</b>.</p>
<pre><code>z = w1·x1 + w2·x2 + ... + b      # линейная часть
a = f(z)                          # activation</code></pre>
<p>Это вам знакомо: logistic regression — ровно такой же один нейрон, где <code>f</code> — sigmoid. Нейронная сеть — это такие нейроны, соединённые слой за слоем.</p>
<h3>Основные функции активации</h3>
<table>
<tr><th>Название</th><th>Формула</th><th>Где</th></tr>
<tr><td>sigmoid</td><td>1 / (1 + e<sup>−z</sup>), значения 0…1</td><td>выход для двух классов (вероятность)</td></tr>
<tr><td>tanh</td><td>значения −1…1, симметрична относительно нуля</td><td>скрытые слои, RNN</td></tr>
<tr><td>ReLU</td><td>max(0, z)</td><td>выбор по умолчанию в скрытых слоях</td></tr>
<tr><td>softmax</td><td>e<sup>z_i</sup> / Σ e<sup>z_j</sup></td><td>выход для многих классов, сумма равна 1</td></tr>
</table>
<h3>Пример по шагам</h3>
<p>Магазин в стиле Kaspi предсказывает, купит ли клиент. Два признака: минуты на сайте <code>x1 = 3</code> и число товаров в корзине <code>x2 = 2</code>. Веса <code>w = [0.4, 0.5]</code>, <code>b = −1.5</code>.</p>
<ol>
<li>z = 0.4·3 + 0.5·2 − 1.5 = 1.2 + 1.0 − 1.5 = 0.7</li>
<li>sigmoid(0.7) ≈ 0.668 — вероятность покупки примерно 67%.</li>
<li>ReLU(0.7) = 0.7, а ReLU(−0.7) = 0.</li>
</ol>
<pre><code>import numpy as np
x = np.array([3.0, 2.0])
w = np.array([0.4, 0.5])
b = -1.5
z = x @ w + b          # 0.7
print(1 / (1 + np.exp(-z)))   # 0.668</code></pre>
<h3>Зачем нужна активация?</h3>
<p>Без активации два линейных слоя подряд всё равно дают одну линейную функцию: W2(W1·x) = (W2·W1)·x. То есть даже 100 слоёв не будут сильнее одной logistic regression. Нелинейная функция (ReLU, tanh) позволяет сети выучивать криволинейные границы.</p>
<div class="tip">Берите ReLU по умолчанию в скрытых слоях: она быстро считается, и в глубоких сетях «затухание» градиента (vanishing gradient) случается с ней гораздо реже, чем с sigmoid.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Ставить ReLU на выходной слой, когда нужна вероятность: нужна sigmoid или softmax.</li>
<li>Применять к массиву <code>math.exp</code> вместо <code>np.exp</code>: <code>math</code> работает только с одним числом.</li>
</ul>`,
      ex: [
        { prompt: 'Напишите три функции: <code>sigmoid(z)</code>, <code>relu(z)</code> и <code>neuron(x, w, b)</code>. Они должны работать с массивами numpy. <code>neuron</code> возвращает sigmoid(x @ w + b).', check: { tests: String.raw`import numpy as _np
_z = _np.array([-2.0, 0.0, 0.7])
assert _np.allclose(sigmoid(_z), 1 / (1 + _np.exp(-_z))), 'sigmoid(z) должна быть 1 / (1 + np.exp(-z))'
assert _np.allclose(relu(_z), [0.0, 0.0, 0.7]), 'relu превращает отрицательные значения в 0: np.maximum(0, z)'
_o = neuron(_np.array([3.0, 2.0]), _np.array([0.4, 0.5]), -1.5)
assert abs(float(_o) - 0.6682) < 1e-3, f'Результат neuron должен быть ≈ 0.668, у вас {_o}'` }, hints: ['<code>np.exp(-z)</code> работает с каждым элементом массива', '<code>np.maximum(0, z)</code> — поэлементный максимум'] },
        { prompt: 'Напишите softmax: <code>softmax(z)</code> принимает 1D-массив и возвращает вероятности с суммой 1. Чтобы <code>exp</code> не переполнялся на больших числах, сначала возьмите <code>z - z.max()</code>. Вычислите <code>probs = softmax(np.array([2.0, 1.0, 0.1]))</code>.', check: { tests: String.raw`import numpy as _np
assert abs(float(_np.sum(probs)) - 1) < 1e-9, 'Сумма вероятностей должна быть 1: e / e.sum()'
assert _np.allclose(probs, [0.659, 0.242, 0.099], atol=1e-3), f'probs должно быть ≈ [0.659, 0.242, 0.099], у вас {probs}'
_big = softmax(_np.array([1000.0, 1000.0]))
assert _np.allclose(_big, [0.5, 0.5]), 'На больших числах не должно быть nan: сначала возьмите z - z.max()'` }, hints: ['<code>e = np.exp(z - z.max())</code>', '<code>return e / e.sum()</code>'] },
        { prompt: 'Нейрон: w = [0.5, −1.0], b = 0.2, вход x = [2, 1]. Чему равен выход после активации ReLU?', explain: 'z = 0.5·2 − 1·1 + 0.2 = 0.2. ReLU(0.2) = 0.2.' },
        { prompt: 'Что будет, если в трёхслойной сети совсем убрать активацию?', options: ['Сеть будет учиться быстрее и точнее', 'Сеть сведётся к одной линейной модели', 'Сеть будет предсказывать только целые числа', 'Ничего не изменится'], explain: 'Композиция линейных функций тоже линейна: W3·W2·W1 собирается в одну матрицу. Чтобы выучить криволинейную границу, нужна нелинейная активация.' }
      ]
    },
    'dl-2': {
      title: 'MLP: forward pass на numpy',
      body: `
<p><b>MLP</b> (multi-layer perceptron) — сеть из нескольких полносвязных слоёв (fully connected, в PyTorch — <code>Linear</code>). Каждый слой — одно матричное умножение: он считает сразу для всех примеров и всех нейронов.</p>
<pre><code>H = relu(X @ W1 + b1)      # скрытый слой
P = sigmoid(H @ W2 + b2)   # выход</code></pre>
<h3>Формы — самая важная проверка</h3>
<table>
<tr><th>Массив</th><th>Форма</th><th>Смысл</th></tr>
<tr><td>X</td><td>(n, 3)</td><td>n примеров, 3 признака</td></tr>
<tr><td>W1</td><td>(3, 4)</td><td>3 входа → 4 скрытых нейрона</td></tr>
<tr><td>b1</td><td>(4,)</td><td>по одному bias на каждый скрытый нейрон</td></tr>
<tr><td>H</td><td>(n, 4)</td><td>скрытое представление каждого примера</td></tr>
<tr><td>W2</td><td>(4, 1)</td><td>4 скрытых → 1 выход</td></tr>
<tr><td>P</td><td>(n, 1)</td><td>по одной вероятности на пример</td></tr>
</table>
<p>Правило: <code>(n, a) @ (a, b) → (n, b)</code>. Если средние размерности не совпадают, numpy выдаёт ошибку <i>shapes not aligned</i>. Bias прибавляется к каждой строке через broadcasting.</p>
<h3>Число параметров</h3>
<p>В одном слое <code>Linear(a, b)</code> есть <code>a·b</code> весов и <code>b</code> bias. В сети 3 → 4 → 1 выше: 3·4 + 4 = 16 и 4·1 + 1 = 5, всего 21 параметр. У ResNet-50 для ImageNet их около 25 миллионов — но принцип тот же.</p>
<h3>Пример по шагам</h3>
<pre><code>import numpy as np
X = np.array([[1.0, 0.0, 2.0]])          # (1, 3)
W1 = np.array([[ 0.2, -0.5, 0.1, 0.0],
               [ 0.4,  0.3, 0.0, 0.1],
               [-0.1,  0.2, 0.3, 0.5]])  # (3, 4)
b1 = np.zeros(4)
H = np.maximum(0, X @ W1 + b1)
print(H)   # [[0.  0.  0.7 1. ]]</code></pre>
<p>Первый нейрон: 1·0.2 + 0·0.4 + 2·(−0.1) = 0 → ReLU → 0. Третий: 0.1 + 0.6 = 0.7. Если один раз посчитать это вручную, становится понятно, что делает матричное умножение.</p>
<div class="tip">Когда пишете forward pass, ставьте <code>print(H.shape)</code> после каждого шага. Половина ошибок в deep learning — ошибки формы.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Переставить порядок на <code>W1 @ X</code>: в нашем соглашении примеры лежат в строках, поэтому <code>X @ W1</code>.</li>
<li>Путать поэлементное (<code>*</code>) и матричное (<code>@</code>) умножение.</li>
</ul>`,
      ex: [
        { prompt: 'Напишите функцию <code>forward(X, W1, b1, W2, b2)</code>: ReLU в скрытом слое, sigmoid на выходе. Она должна возвращать выходные вероятности формы <code>(n, 1)</code>. С данными весами вычислите <code>P = forward(X, W1, b1, W2, b2)</code>.', check: { tests: String.raw`import numpy as _np
_H = _np.maximum(0, X @ W1 + b1)
_P = 1 / (1 + _np.exp(-(_H @ W2 + b2)))
assert _np.shape(P) == (2, 1), f'Форма P должна быть (2, 1), у вас {_np.shape(P)}'
assert _np.allclose(P, _P), 'Нужны ReLU в скрытом слое и sigmoid на выходе'
_X2 = _np.random.default_rng(1).normal(size=(5, 3))
assert _np.allclose(forward(_X2, W1, b1, W2, b2), 1 / (1 + _np.exp(-(_np.maximum(0, _X2 @ W1 + b1) @ W2 + b2)))), 'forward должна правильно работать для любого X'` }, hints: ['<code>H = np.maximum(0, X @ W1 + b1)</code>', '<code>return 1 / (1 + np.exp(-(H @ W2 + b2)))</code>'] },
        { prompt: 'Напишите функцию <code>n_params(layers)</code>: <code>layers</code> — список размеров слоёв, например <code>[3, 4, 1]</code>. Для каждой соседней пары <code>(a, b)</code> — <code>a·b + b</code> параметров. Результат для <code>[784, 128, 10]</code> запишите в <code>mnist_params</code>.', check: { tests: String.raw`assert n_params([3, 4, 1]) == 21, f'Для [3, 4, 1] должно быть 21, у вас {n_params([3, 4, 1])}'
assert n_params([2, 2]) == 6, '[2, 2]: 2·2 + 2 = 6'
assert mnist_params == 101770, f'mnist_params должно быть 784·128 + 128 + 128·10 + 10 = 101770, у вас {mnist_params}'` }, hints: ['<code>zip(layers[:-1], layers[1:])</code> даёт соседние пары', 'Для каждой пары прибавьте <code>a * b + b</code>'] },
        { prompt: 'Форма <code>X</code> — (32, 10), <code>W1</code> — (10, 64), <code>W2</code> — (64, 3). Какая форма у результата <code>relu(X @ W1) @ W2</code>?', options: ['(10, 3)', '(32, 64)', '(32, 3)', '(64, 3)'], explain: '(32, 10) @ (10, 64) → (32, 64); ReLU форму не меняет; (32, 64) @ (64, 3) → (32, 3): для каждого из 32 примеров оценка по 3 классам.' }
      ]
    },
    'dl-3': {
      title: 'Функции потерь',
      body: `
<p>Чтобы сеть училась, нужно измерить одним числом, насколько она ошибается. Это число — <b>loss</b>. Обучение — это поиск весов, которые уменьшают loss.</p>
<h3>Loss в зависимости от задачи</h3>
<table>
<tr><th>Задача</th><th>Активация на выходе</th><th>Loss</th><th>PyTorch</th></tr>
<tr><td>Regression (цена квартиры)</td><td>нет (линейный)</td><td>MSE</td><td><code>nn.MSELoss</code></td></tr>
<tr><td>Два класса (churn)</td><td>sigmoid</td><td>binary cross-entropy</td><td><code>nn.BCEWithLogitsLoss</code></td></tr>
<tr><td>Много классов (картинка: кошка/собака/птица)</td><td>softmax</td><td>cross-entropy</td><td><code>nn.CrossEntropyLoss</code></td></tr>
</table>
<h3>Binary cross-entropy</h3>
<pre><code>BCE = −mean( y·log(p) + (1 − y)·log(1 − p) )</code></pre>
<p>Смысл: если правильный ответ y = 1, остаётся только −log(p). Если модель говорит p = 0.9, loss = 0.105 (маленький). Если p = 0.1, loss = 2.303 (большой). То есть уверенный неверный прогноз сильно штрафуется. Accuracy этого не видит: для неё 0.51 и 0.99 одинаково «правильные».</p>
<h3>Пример по шагам</h3>
<p>Три абонента: y = [1, 0, 1], вероятности модели p = [0.8, 0.3, 0.6].</p>
<ol>
<li>Абонент 1: −log(0.8) = 0.223</li>
<li>Абонент 2: −log(1 − 0.3) = −log(0.7) = 0.357</li>
<li>Абонент 3: −log(0.6) = 0.511</li>
<li>Среднее: (0.223 + 0.357 + 0.511) / 3 ≈ 0.364</li>
</ol>
<pre><code>import numpy as np
y = np.array([1, 0, 1]); p = np.array([0.8, 0.3, 0.6])
print(-np.mean(y*np.log(p) + (1-y)*np.log(1-p)))   # 0.364</code></pre>
<h3>Почему не уменьшать accuracy напрямую?</h3>
<p>Gradient descent нужно, чтобы loss менялся <b>гладко</b>: при небольшом изменении веса loss тоже должен меняться немного. Accuracy скачет ступеньками, её градиент везде равен нулю. Поэтому при обучении используют cross-entropy, а в отчёте для бизнеса показывают accuracy, recall, ₸.</p>
<div class="tip">При p = 0 или 1 получается log(0) = −∞. На практике p ограничивают через <code>np.clip(p, 1e-7, 1 - 1e-7)</code>. В PyTorch <code>BCEWithLogitsLoss</code> решает это внутри сам, поэтому ему передают число до sigmoid (logit).</div>
<h3>Частые ошибки</h3>
<ul>
<li>Использовать MSE для классификации: работает, но учится медленно.</li>
<li>Передавать в <code>CrossEntropyLoss</code> вероятности после softmax: он ждёт logits, softmax уже есть внутри.</li>
</ul>`,
      ex: [
        { prompt: 'Напишите функции <code>mse(y, pred)</code> и <code>bce(y, p)</code>. Внутри <code>bce</code> ограничьте <code>p</code> через <code>np.clip(p, 1e-7, 1 - 1e-7)</code>. Для абонентов из примера вычислите <code>loss = bce(y, p)</code>.', check: { tests: String.raw`import numpy as _np
assert abs(mse(_np.array([1.0, 2.0]), _np.array([2.0, 4.0])) - 2.5) < 1e-9, 'mse = mean((y - pred)**2): для [1,2] и [2,4] это 2.5'
assert abs(loss - 0.3635) < 1e-3, f'loss должен быть ≈ 0.364, у вас {loss}'
_v = bce(_np.array([1, 0]), _np.array([1.0, 0.0]))
assert _np.isfinite(_v) and _v < 1e-5, 'При p = 0 или 1 не должно быть nan/inf: используйте np.clip'` }, hints: ['<code>np.mean((y - pred) ** 2)</code>', '<code>-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))</code>'] },
        { prompt: 'Абонент действительно ушёл (y = 1), а модель дала ему p = 0.1. Чему равен BCE loss этого одного примера? (натуральный логарифм, три знака)', explain: '−log(0.1) ≈ 2.303. Уверенный неверный прогноз даёт большой loss.' },
        { prompt: 'Модель делит картинки на 5 категорий (верна только одна). Какой выход и какой loss?', options: ['ReLU + MSE', 'sigmoid + BCE отдельно для каждого класса', 'softmax + cross-entropy', 'Без выходной активации + MAE'], explain: 'Многоклассовая задача с одним правильным ответом: вероятности softmax и cross-entropy. В PyTorch nn.CrossEntropyLoss принимает logits и делает softmax внутри.' }
      ]
    },
    'dl-4': {
      title: 'Gradient descent и backpropagation',
      body: `
<p>Loss есть, теперь его нужно уменьшить. <b>Gradient descent</b>: для каждого веса находим ответ на вопрос «если чуть увеличить этот вес, как изменится loss?» (производную, градиент) и сдвигаем вес в противоположную сторону.</p>
<pre><code>w = w − lr · ∂loss/∂w</code></pre>
<p><code>lr</code> (learning rate) — размер шага. Если он слишком мал, обучение идёт очень медленно; если слишком велик, loss скачет и даже растёт.</p>
<h3>Backpropagation — chain rule</h3>
<p>В сети loss связан с весом не напрямую, а через несколько шагов: w → z → p → loss. Производную находим, перемножая по <b>chain rule</b>:</p>
<pre><code>∂loss/∂w = ∂loss/∂p · ∂p/∂z · ∂z/∂w</code></pre>
<p>Backpropagation — это вычисление этих произведений от выхода ко входу, слой за слоем. Каждый слой берёт градиент, пришедший от следующего слоя, умножает его на свою производную и передаёт назад.</p>
<h3>Пример по шагам: один sigmoid-нейрон + BCE</h3>
<p>Sigmoid и BCE вместе очень красиво сокращаются: <code>∂loss/∂z = p − y</code>. Поэтому для n примеров:</p>
<pre><code>p  = sigmoid(X @ w + b)
dz = (p - y) / n          # «ошибка» каждого примера
dw = X.T @ dz             # для каждого веса
db = dz.sum()
w -= lr * dw;  b -= lr * db</code></pre>
<p>Пример: один абонент x = [1, 2], y = 1, w = [0, 0], b = 0. Тогда z = 0, p = 0.5, dz = −0.5, dw = [−0.5, −1.0]. При lr = 0.1 новый w = [0.05, 0.1]: модель начинает давать этому абоненту более высокую вероятность.</p>
<h3>Проверка градиента</h3>
<p>В backprop легко ошибиться. Его проверяют <b>численным градиентом</b>: меняем вес на ε и делим разность loss:</p>
<pre><code>(loss(w + ε) − loss(w − ε)) / (2ε)</code></pre>
<p>Это медленно (два forward на каждый вес), но надёжно. Если два результата совпадают с точностью 1e-6, backprop верен. В PyTorch это автоматически делает <code>autograd</code>, но знание идеи помогает при отладке.</p>
<div class="tip">Производные трёх частых функций: sigmoid′ = p(1 − p), tanh′ = 1 − h², ReLU′ = 1 (если z &gt; 0), иначе 0.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Не делить градиент на <code>n</code>: с ростом batch растёт и шаг, обучение расходится.</li>
<li>Сдвигать вес по направлению градиента (<code>+=</code>): loss растёт.</li>
</ul>`,
      ex: [
        { prompt: 'Обновите один sigmoid-нейрон одним шагом gradient descent. Вычислите <code>p</code>, <code>dw</code>, <code>db</code> и обновите <code>w</code> и <code>b</code> с <code>lr = 0.5</code>. Loss после обновления <code>loss_after</code> должен быть меньше прежнего <code>loss_before</code>.', check: { tests: String.raw`import numpy as _np
_X = _np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]]); _y = _np.array([1, 0, 1, 0])
_w = _np.array([0.1, -0.2]); _p = 1 / (1 + _np.exp(-(_X @ _w)))
_dz = (_p - _y) / 4
assert _np.allclose(dw, _X.T @ _dz), 'dw = X.T @ ((p - y) / n)'
assert abs(float(db) - _dz.sum()) < 1e-9, 'db = ((p - y) / n).sum()'
assert _np.allclose(w, _w - 0.5 * (_X.T @ _dz)), 'w = w - lr * dw'
assert loss_after < loss_before, 'После одного шага loss должен уменьшиться'` }, hints: ['<code>dz = (p - y) / len(X)</code>', '<code>dw = X.T @ dz</code>, <code>db = dz.sum()</code>'] },
        { prompt: 'Проверка численным градиентом. Напишите функцию <code>num_grad(f, w, eps=1e-5)</code>: для каждого элемента <code>w</code> она вычисляет <code>(f(w + ε·e_i) − f(w − ε·e_i)) / (2ε)</code> и возвращает массив. Затем вычислите <code>g_num = num_grad(loss_fn, w)</code>: он должен совпасть с аналитическим <code>g_an</code>.', check: { tests: String.raw`import numpy as _np
assert _np.allclose(g_num, g_an, atol=1e-6), f'g_num должен совпадать с g_an: {g_num} и {g_an}'
assert _np.allclose(num_grad(lambda v: (v ** 2).sum(), _np.array([1.0, -2.0, 3.0])), [2.0, -4.0, 6.0], atol=1e-4), 'num_grad должна работать для любой f: производная x² равна 2x'` }, hints: ['Для каждого <code>i</code>: <code>e = np.zeros_like(w); e[i] = eps</code>', '<code>g[i] = (f(w + e) - f(w - e)) / (2 * eps)</code>'] },
        { prompt: 'Chain rule: y = (3x + 1)². Чему равна dy/dx в точке x = 1?', explain: 'Внутренняя u = 3x + 1 = 4. dy/du = 2u = 8, du/dx = 3. Произведение: 8 · 3 = 24.' },
        { prompt: 'Во время обучения loss рос с каждой эпохой, а потом стал <code>nan</code>. Самая вероятная причина?', options: ['Learning rate слишком большой', 'Learning rate слишком маленький', 'Слишком мало данных', 'Активация ReLU'], explain: 'Слишком большой шаг перескакивает минимум, веса растут до бесконечности, и затем exp/log дают nan. Попробуйте уменьшить lr в 3–10 раз.' }
      ]
    },
    'dl-5': {
      title: 'Практика: обучаем сеть, которая решает XOR',
      body: `
<p>XOR — классический тест: если входы одинаковые, ответ 0, если разные — 1. Четыре точки невозможно разделить одной прямой, поэтому logistic regression не может решить эту задачу. Достаточно одного скрытого слоя — сейчас мы увидим это своими глазами.</p>
<table>
<tr><th>x1</th><th>x2</th><th>y</th></tr>
<tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr>
</table>
<h3>Сеть: 2 → 4 (tanh) → 1 (sigmoid)</h3>
<p>Полный training loop состоит из четырёх шагов, и в PyTorch эти шаги точно такие же:</p>
<ol>
<li><b>Forward</b>: <code>h = tanh(X @ W1 + b1)</code>, <code>p = sigmoid(h @ W2 + b2)</code>.</li>
<li><b>Loss</b>: BCE.</li>
<li><b>Backward</b> (от выхода ко входу):
<pre><code>dz2 = (p - y) / n                 # выходной слой
dW2 = h.T @ dz2;  db2 = dz2.sum(axis=0, keepdims=True)
dh  = dz2 @ W2.T                  # градиент переходит в скрытый слой
dz1 = dh * (1 - h**2)             # производная tanh
dW1 = X.T @ dz1;  db1 = dz1.sum(axis=0, keepdims=True)</code></pre></li>
<li><b>Update</b>: <code>W1 -= lr * dW1</code> и остальные.</li>
</ol>
<p>Обратите внимание: формула <code>dW2</code> совпадает с <code>X.T @ dz</code> для одного нейрона, только вместо X стоит скрытый слой <code>h</code>. Для каждого слоя: «его вход.T @ его градиент».</p>
<h3>Почему начальные веса случайные?</h3>
<p>Если все веса равны 0, все скрытые нейроны считают одно и то же, получают одинаковый градиент и навсегда остаются одинаковыми. Случайная инициализация ломает симметрию. Если зафиксировать seed (<code>default_rng(42)</code>), результат воспроизводится. Иногда при неудачном seed сеть застревает в «локальном» решении (например, предсказывает 0.5): для маленьких сетей это нормально.</p>
<div class="tip">Собирайте loss в список и сравнивайте начало и конец. Если loss не уменьшается, первым делом проверьте знаки и формы в backward.</div>
<h3>Результат</h3>
<p>После 2000 эпох сеть выдаёт примерно [0.00, 1.00, 1.00, 0.00]: XOR решён. Скрытый слой «сложил» входы в новое пространство, где точки стали разделимы одной прямой. В этом вся идея deep learning: <b>слои сами выучивают полезные признаки</b>.</p>`,
      ex: [
        { prompt: 'Training loop готов, не хватает только части backward (градиенты нулевые). Напишите <code>dz2</code>, <code>dW2</code>, <code>db2</code>, <code>dh</code>, <code>dz1</code>, <code>dW1</code>, <code>db1</code>. После обучения последний loss должен быть меньше 0.05, а <code>preds</code> = [0, 1, 1, 0].', starter: 'import numpy as np\n' + String.raw`X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
y = np.array([[0], [1], [1], [0]], dtype=float)
rng = np.random.default_rng(42)
W1 = rng.normal(0, 1, (2, 4)); b1 = np.zeros((1, 4))
W2 = rng.normal(0, 1, (4, 1)); b2 = np.zeros((1, 1))
lr = 1.0
losses = []

for epoch in range(2000):
    # forward
    h = np.tanh(X @ W1 + b1)
    p = 1 / (1 + np.exp(-(h @ W2 + b2)))
    losses.append(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p)))
    # backward: исправьте эти строки
    dW2 = np.zeros_like(W2); db2 = np.zeros_like(b2)
    dW1 = np.zeros_like(W1); db1 = np.zeros_like(b1)
    # update
    W1 -= lr * dW1; b1 -= lr * db1
    W2 -= lr * dW2; b2 -= lr * db2

preds = (p > 0.5).astype(int).ravel()
print(losses[0], losses[-1], preds)
`, check: { tests: String.raw`import numpy as _np
assert len(losses) == 2000, 'Цикл должен пройти 2000 эпох'
assert losses[-1] < 0.05, f'Последний loss должен быть меньше 0.05, у вас {losses[-1]:.4f}. Проверьте формулы backward'
assert list(_np.asarray(preds).ravel()) == [0, 1, 1, 0], f'preds должно быть [0, 1, 1, 0], у вас {preds}'
assert W1.shape == (2, 4) and W2.shape == (4, 1), 'Формы весов не должны меняться'` }, hints: ['Выход: <code>dz2 = (p - y) / len(X)</code>, <code>dW2 = h.T @ dz2</code>', 'Скрытый слой: <code>dz1 = (dz2 @ W2.T) * (1 - h ** 2)</code>, <code>dW1 = X.T @ dz1</code>'] },
        { prompt: 'Эксперимент с learning rate. Оберните обучение в функцию <code>train(lr)</code>, которая возвращает последний loss. Для <code>lr</code> = 0.01, 0.1, 1.0 запишите результаты в словарь <code>results</code> (<code>{lr: loss}</code>), а значение с наименьшим loss сохраните в <code>best_lr</code>.', check: { tests: String.raw`assert set(results) == {0.01, 0.1, 1.0}, 'В results должно быть три ключа: 0.01, 0.1, 1.0'
assert results[0.01] > 0.3, 'При lr = 0.01 за 1500 эпох сеть ещё не должна научиться: вы вызвали train(0.01)?'
assert best_lr == 1.0, f'best_lr должно быть 1.0, у вас {best_lr}'` }, hints: ['<code>for lr in [0.01, 0.1, 1.0]: results[lr] = train(lr)</code>', '<code>best_lr = min(results, key=results.get)</code>'] },
        { prompt: 'Почему нельзя начинать со всех весов, равных нулю?', options: ['numpy не умеет умножать на ноль', 'Скрытые нейроны получают одинаковый градиент и так и остаются одинаковыми', 'Loss сразу станет nan', 'Bias не будет работать'], explain: 'Симметрия не ломается: все скрытые нейроны считают одно и то же и одинаково обновляются, поэтому 4 нейрона фактически остаются 1 нейроном.' }
      ]
    },
    'dl-6': {
      title: 'Training loop: эпохи, batch, overfitting',
      body: `
<p>В XOR было 4 примера, и на каждом шаге мы использовали все. В реальных данных тысячи и миллионы примеров, поэтому training loop опирается на несколько понятий.</p>
<h3>Основные термины</h3>
<ul>
<li><b>Batch</b> (mini-batch) — группа примеров для одного шага градиента, обычно 32–256. Маленький batch делает градиент «шумным», но помещается в память и обновляет веса чаще.</li>
<li><b>Step</b> (iteration) — одно обновление по одному batch.</li>
<li><b>Epoch</b> — один полный проход по всем train-данным. Число шагов в эпохе = ceil(N / batch_size).</li>
<li><b>Learning rate</b> — размер шага; чаще всего 1e-3 (Adam) или 0.01–0.1 (SGD). Иногда его уменьшают со временем (scheduler).</li>
</ul>
<h3>Пример по шагам</h3>
<p>10 000 фотографий товаров магазина в Алматы, batch_size = 64:</p>
<ol>
<li>В одной эпохе ceil(10000 / 64) = 157 шагов (в последнем batch 16 фото).</li>
<li>20 эпох — 3 140 шагов.</li>
<li>Перед каждой эпохой данные перемешивают (shuffle), иначе batch каждый раз одинаковые и модель может запомнить порядок.</li>
</ol>
<h3>Overfitting и early stopping</h3>
<p>В сети много параметров, поэтому ей легко запомнить train-данные. Признак: train loss продолжает падать, а validation loss после определённой эпохи <b>начинает расти</b>. Средства против этого:</p>
<ul>
<li><b>Early stopping</b>: если validation loss не улучшается <code>patience</code> эпох подряд, останавливаемся и возвращаем веса лучшей эпохи.</li>
<li><b>Dropout</b>: во время обучения случайно отключать часть нейронов.</li>
<li><b>Weight decay</b> (L2), больше данных, <b>data augmentation</b> (повороты, обрезка картинок).</li>
</ul>
<pre><code>val = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47]
# лучшая — эпоха 3 (считая с 0), patience = 3:
# в эпохах 4, 5, 6 улучшения нет → останавливаемся после эпохи 6</code></pre>
<div class="tip">Используйте validation-выборку только для остановки и выбора hyperparameters. Итоговую оценку считайте один раз на отдельной test-выборке — правило из модуля M5 в deep learning не меняется.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Сохранять модель последней эпохи, хотя лучшая была раньше.</li>
<li>Перемешать validation-данные и случайно добавить их в train.</li>
<li>Всё увеличивать число эпох: прямая дорога к overfitting.</li>
</ul>`,
      ex: [
        { prompt: 'Напишите функцию <code>make_batches(n, batch_size)</code>: она возвращает список пар <code>(start, end)</code>, например <code>make_batches(10, 4)</code> → <code>[(0, 4), (4, 8), (8, 10)]</code>. Вычислите <code>steps = len(make_batches(10000, 64))</code>.', check: { tests: String.raw`assert make_batches(10, 4) == [(0, 4), (4, 8), (8, 10)], f'make_batches(10, 4) должно быть [(0, 4), (4, 8), (8, 10)], у вас {make_batches(10, 4)}'
assert make_batches(8, 4) == [(0, 4), (4, 8)], 'Пустых batch быть не должно: make_batches(8, 4) = [(0, 4), (4, 8)]'
assert steps == 157, f'steps должно быть 157, у вас {steps}'` }, hints: ['<code>range(0, n, batch_size)</code> даёт начало каждого batch', 'Конец: <code>min(s + batch_size, n)</code>'] },
        { prompt: 'Early stopping. Функция <code>early_stop(val_losses, patience)</code> возвращает <code>(best_epoch, stop_epoch)</code>: <code>best_epoch</code> — эпоха с наименьшим loss (с 0), <code>stop_epoch</code> — эпоха, на которой после последнего улучшения прошло <code>patience</code> эпох. Если остановки нет, <code>stop_epoch = len(val_losses) - 1</code>.', check: { tests: String.raw`_v = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47, 0.41]
assert tuple(early_stop(_v, 3)) == (3, 6), f'patience=3: должно быть (3, 6), у вас {early_stop(_v, 3)}. Останавливаемся раньше, чем дойдём до 0.41 в эпохе 7'
assert tuple(early_stop(_v, 5)) == (7, 7), f'patience=5: остановки нет, должно быть (7, 7), у вас {early_stop(_v, 5)}'
assert tuple(early_stop([0.5, 0.4, 0.3], 1)) == (2, 2), 'При непрерывном улучшении: (2, 2)'` }, hints: ['Храните <code>best</code>, <code>best_epoch</code> и <code>wait</code> (число эпох без улучшения)', 'При улучшении <code>wait = 0</code>, иначе <code>wait += 1</code>; если <code>wait >= patience</code>, возвращайте результат'] },
        { prompt: '50 000 примеров, batch_size = 128, 10 эпох. Сколько всего будет шагов градиента (step)?', explain: 'ceil(50000 / 128) = 391 шаг за эпоху; 391 · 10 = 3910.' },
        { prompt: 'Train loss падает уже 15 эпох, а validation loss растёт начиная с 6-й эпохи. Что делаем?', options: ['Увеличиваем число эпох до 50', 'Берём веса примерно 6-й эпохи и добавляем регуляризацию', 'Увеличиваем learning rate в 10 раз', 'Добавляем validation-выборку в train'], explain: 'Это overfitting. Early stopping сохраняет лучшую по validation эпоху; dropout, weight decay или больше данных уменьшают саму проблему.' }
      ]
    },
    'dl-7': {
      title: 'PyTorch: от шагов на numpy к torch',
      body: `
<p><b>PyTorch</b> — самая популярная библиотека deep learning. Она делает всё, что мы писали вручную на numpy, но у неё два преимущества: <b>autograd</b> (сама считает backward) и <b>GPU</b>. В браузерном Python torch нет, поэтому мы читаем код и сравниваем его с аналогами на numpy. На своём компьютере его можно запустить после <code>pip install torch</code>.</p>
<h3>Tensor</h3>
<pre><code>import torch
x = torch.tensor([[0., 1.], [1., 0.]])   # как numpy array
x.shape, x @ x.T, x.mean()               # те же операции
w = torch.randn(2, 4, requires_grad=True) # нужно отслеживать градиент
x.numpy(); torch.from_numpy(arr)          # numpy ↔ torch</code></pre>
<h3>Модель: nn.Module</h3>
<pre><code>import torch.nn as nn

class XorNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.hidden = nn.Linear(2, 4)    # W1, b1
        self.out = nn.Linear(4, 1)       # W2, b2

    def forward(self, x):
        h = torch.tanh(self.hidden(x))
        return self.out(h)               # logit, без sigmoid

model = XorNet()
loss_fn = nn.BCEWithLogitsLoss()         # sigmoid + BCE вместе
optimizer = torch.optim.SGD(model.parameters(), lr=1.0)</code></pre>
<h3>Стандартный training loop</h3>
<pre><code>for epoch in range(2000):
    for xb, yb in train_loader:          # DataLoader выдаёт batch
        optimizer.zero_grad()            # очистить старые градиенты
        logits = model(xb)               # forward
        loss = loss_fn(logits, yb)       # loss
        loss.backward()                  # backprop: заполняются все .grad
        optimizer.step()                 # W -= lr * W.grad

model.eval()                             # режим инференса для dropout/batchnorm
with torch.no_grad():                    # градиенты не считаем
    probs = torch.sigmoid(model(X_test))</code></pre>
<h3>Соответствие numpy ↔ PyTorch</h3>
<table>
<tr><th>numpy (dl-5)</th><th>PyTorch</th></tr>
<tr><td><code>W1 = rng.normal(...)</code></td><td><code>nn.Linear(2, 4)</code></td></tr>
<tr><td><code>h = np.tanh(X @ W1 + b1)</code></td><td><code>model(x)</code> → <code>forward</code></td></tr>
<tr><td>формула BCE</td><td><code>nn.BCEWithLogitsLoss()</code></td></tr>
<tr><td><code>dz2 … dW1, db1</code> (весь backward)</td><td><code>loss.backward()</code></td></tr>
<tr><td><code>W1 -= lr * dW1</code> …</td><td><code>optimizer.step()</code></td></tr>
<tr><td>пересчёт градиента заново в каждой эпохе</td><td><code>optimizer.zero_grad()</code></td></tr>
</table>
<div class="tip">В PyTorch градиенты <b>накапливаются</b> (<code>+=</code>): если забыть <code>zero_grad()</code>, каждый шаг прибавляет градиенты предыдущих, и обучение ломается. Это ошибка №1 у новичков.</div>
<h3>Optimizer-ы</h3>
<p><code>SGD</code> — правило, которое мы писали вручную. <code>Adam</code> — шаг, который подстраивается под каждый параметр; в большинстве случаев сразу хорошо работает с <code>lr=1e-3</code>, поэтому это выбор по умолчанию.</p>`,
      ex: [
        { prompt: 'Ниже есть маленький класс <code>Linear</code>, похожий на <code>nn.Linear</code>: его градиенты, как в PyTorch, <b>накапливаются</b>. Напишите класс <code>SGD</code> (<code>zero_grad()</code> обнуляет каждый <code>p.grad</code>, <code>step()</code> уменьшает каждый <code>p.value</code> на <code>lr * p.grad</code>). Затем прогоните стандартный loop 200 шагов: zero_grad → forward → loss → backward → step. Модель должна найти y = 2x + 1.', check: { tests: String.raw`import numpy as _np
_p = Param(_np.array([1.0])); _p.grad = _np.array([2.0])
_o = SGD([_p], lr=0.5); _o.step()
assert abs(float(_p.value[0])) < 1e-9, 'step(): value -= lr * grad (1 - 0.5·2 = 0)'
_o.zero_grad()
assert float(_p.grad[0]) == 0.0, 'zero_grad() должен обнулять градиент'
assert abs(float(model.w.value[0]) - 2) < 0.05 and abs(float(model.b.value[0]) - 1) < 0.05, f'Модель должна найти w ≈ 2, b ≈ 1, у вас w={model.w.value}, b={model.b.value}. Есть ли в loop zero_grad() и step()?'` }, hints: ['<code>zero_grad</code>: <code>for p in self.params: p.grad = np.zeros_like(p.value)</code>', 'В начале loop — <code>optimizer.zero_grad()</code>, в конце — <code>optimizer.step()</code>'] },
        { prompt: 'Какой аналог в PyTorch у блока numpy <code>dz2 = (p - y) / n; dW2 = h.T @ dz2; ... dW1 = X.T @ dz1</code>?', options: ['optimizer.step()', 'loss.backward()', 'model.eval()', 'optimizer.zero_grad()'], explain: 'loss.backward() через autograd вычисляет .grad всех параметров по chain rule — это весь backward, который мы писали вручную.' },
        { prompt: 'Аналог в PyTorch для строк <code>W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2</code>?', options: ['loss.backward()', 'model(x)', 'optimizer.step()', 'torch.no_grad()'], explain: 'optimizer.step() обновляет каждый параметр из model.parameters() по его .grad (для SGD — именно по этой формуле).' },
        { prompt: 'Модель обучена, теперь нужно предсказывать на test-данных. Какие две строки верны?', options: ['model.train() и loss.backward()', 'model.eval() и with torch.no_grad():', 'optimizer.zero_grad() и optimizer.step()', 'Ничего не нужно, хватит model(X_test)'], explain: 'eval() переводит dropout и batchnorm в режим инференса, no_grad() не строит граф градиентов и экономит память и время.' }
      ]
    },
    'dl-8': {
      title: 'Интуиция CNN: convolution и pooling',
      body: `
<p>Картинка — это таблица чисел: серая картинка 28×28 — это 784 пикселя. Если подать её в MLP простым списком, будет две проблемы: параметров станет слишком много, и модель не знает, что «соседние пиксели связаны». <b>Convolutional neural network</b> (CNN) решает обе.</p>
<h3>Convolution</h3>
<p>Маленький <b>kernel</b> (фильтр, например 3×3) скользит по картинке. В каждой позиции перемножаем элементы kernel и участка под ним и складываем — получается одно число. Результат — <b>feature map</b>.</p>
<pre><code>img (5×5)            kernel (3×3)
0 0 0 9 9            1 0 -1
0 0 0 9 9            1 0 -1
0 0 0 9 9     *      1 0 -1
0 0 0 9 9
0 0 0 9 9
                     результат (3×3):
                     0 -27 -27   ← найдена вертикальная граница
                     ...</code></pre>
<p>Левая верхняя позиция: все пиксели 0, результат 0. Один шаг вправо: в правом столбце участка стоят девятки, kernel умножает их на −1: 3·(−9) = −27. Этот kernel находит <b>вертикальные границы</b>. В CNN значения kernel мы не пишем — сеть сама выучивает их через backprop: первые слои — границы и цвета, более глубокие — формы вроде глаз, колёс, букв.</p>
<h3>Размер результата</h3>
<pre><code>out = (n − k + 2·padding) / stride + 1
5×5, k=3, padding=0, stride=1 → 3×3
28×28, k=3, padding=1 → 28×28 («same»)</code></pre>
<h3>Pooling</h3>
<p><b>Max pooling 2×2</b> делит feature map на блоки 2×2 и берёт из каждого наибольшее значение. Размер уменьшается вдвое, а информация «есть ли признак где-то рядом?» сохраняется. Это сокращает вычисления и даёт устойчивость к небольшим сдвигам.</p>
<h3>Почему параметров мало?</h3>
<p>Один kernel используется <b>совместно</b> по всей картинке (weight sharing). <code>nn.Conv2d(3, 16, kernel_size=3)</code>: 16 фильтров, у каждого 3 канала × 3 × 3 = 27 весов + 1 bias → 16·28 = 448 параметров. А если подать картинку 32×32×3 в слой Linear на 16 нейронов: 3072·16 + 16 = 49 168.</p>
<pre><code>nn.Sequential(
    nn.Conv2d(1, 8, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),   # 28→14
    nn.Conv2d(8, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),  # 14→7
    nn.Flatten(), nn.Linear(16 * 7 * 7, 10))                     # 10 цифр</code></pre>
<div class="tip">«Convolution» в библиотеках deep learning на самом деле — cross-correlation: kernel не переворачивается. Мы считаем так же.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>conv2d(img, k)</code>: без padding, stride 1. Форма результата <code>(H − kh + 1, W − kw + 1)</code>, каждый элемент — <code>(img[i:i+kh, j:j+kw] * k).sum()</code>. Примените kernel вертикальной границы к картинке из примера и запишите результат в <code>fmap</code>.', check: { tests: String.raw`import numpy as _np
assert _np.shape(fmap) == (3, 3), f'Форма fmap должна быть (3, 3), у вас {_np.shape(fmap)}'
assert _np.allclose(fmap, [[0, -27, -27]] * 3), f'Каждая строка fmap должна быть [0, -27, -27], у вас {fmap}'
_r = _np.random.default_rng(3); _a = _r.normal(size=(6, 7)); _kk = _r.normal(size=(2, 3))
_ref = _np.array([[(_a[i:i+2, j:j+3] * _kk).sum() for j in range(5)] for i in range(5)])
assert _np.allclose(conv2d(_a, _kk), _ref), 'conv2d должна работать для картинки и kernel любого размера'` }, hints: ['<code>out = np.zeros((H - kh + 1, W - kw + 1))</code>', 'Два цикла: <code>out[i, j] = (img[i:i+kh, j:j+kw] * k).sum()</code>'] },
        { prompt: 'Напишите <code>maxpool2(x)</code>: блоки 2×2, stride 2 (считайте, что размеры чётные). Вычислите <code>pooled = maxpool2(fm)</code>.', check: { tests: String.raw`import numpy as _np
assert _np.allclose(pooled, [[4, 5], [3, 7]]), f'pooled должно быть [[4, 5], [3, 7]], у вас {pooled}'
_a = _np.arange(36, dtype=float).reshape(6, 6)
assert _np.allclose(maxpool2(_a), _a.reshape(3, 2, 3, 2).max(axis=(1, 3))), 'maxpool2 должна работать и для 6×6'` }, hints: ['Форма результата <code>(H // 2, W // 2)</code>', '<code>x[2*i:2*i+2, 2*j:2*j+2].max()</code>'] },
        { prompt: 'Сколько параметров (с bias) в слое <code>nn.Conv2d(3, 16, kernel_size=3)</code>?', explain: 'Каждый фильтр: 3 канала · 3 · 3 = 27 весов + 1 bias = 28. 16 фильтров: 16 · 28 = 448.' },
        { prompt: 'Картинка 32×32, kernel 5×5, padding 0, stride 1. Какой размер стороны у feature map?', explain: '(32 − 5 + 0) / 1 + 1 = 28.' }
      ]
    },
    'dl-9': {
      title: 'Transfer learning и когда выбирать deep learning',
      body: `
<p>Обучение ResNet с нуля на ImageNet (14 млн картинок) занимает на GPU несколько дней. А у вас, например, 300 фотографий казахских блюд (бешбармак, баурсак, куырдак, манты, самса). Если учить с нуля, сеть сразу переобучится. Решение — <b>transfer learning</b>: повторно использовать знания сети, обученной на других больших данных.</p>
<h3>Идея</h3>
<p>Первые слои обученной CNN распознают <b>общие</b> признаки — границы, текстуры, формы, — они полезны для любых картинок. Только последний слой (head) заточен под конкретные 1000 классов ImageNet. Поэтому:</p>
<ol>
<li><b>Feature extraction</b>: «замораживаем» backbone (freeze) и обучаем только новый head. Это вариант для малого объёма данных (сотни примеров).</li>
<li><b>Fine-tuning</b>: после head дообучаем ещё один-два последних блока с маленьким learning rate. Когда данных больше (тысячи) или домен далёкий (рентгеновские снимки).</li>
</ol>
<pre><code>import torch.nn as nn
from torchvision import models

model = models.resnet18(weights='IMAGENET1K_V1')   # готовые веса
for p in model.parameters():
    p.requires_grad = False                         # backbone заморожен
model.fc = nn.Linear(model.fc.in_features, 5)      # новый head: 5 блюд
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
# training loop как в dl-7; картинки нужно нормировать как для ImageNet</code></pre>
<p>В новом head обучается всего 512·5 + 5 = 2 565 параметров, а остальные из 11 млн не меняются. Поэтому 300 картинок хватает, а обучение даже на CPU занимает несколько минут.</p>
<h3>С текстом так же</h3>
<p>Языковые модели вроде BERT и LLM — это backbone, обученный на большом корпусе текстов. Чтобы классифицировать отзывы (например, отзывы о товарах на Kaspi), берут их embeddings и ставят сверху маленький классификатор — это тот же transfer learning. Подробнее — в модуле GenAI.</p>
<h3>Когда deep learning не нужен</h3>
<table>
<tr><th>Данные</th><th>Обычно лучший выбор</th></tr>
<tr><td>Таблица (churn, цена квартиры), тысячи строк</td><td>Gradient boosting, logistic regression</td></tr>
<tr><td>Картинки, звук, видео</td><td>CNN / pretrained-модель</td></tr>
<tr><td>Текст</td><td>Pretrained языковая модель, embeddings</td></tr>
</table>
<div class="tip">На табличных данных сначала сделайте sklearn baseline из M5. Только если нейросеть его побеждает, она стоит дополнительной сложности (GPU, долгое обучение, трудность объяснения).</div>`,
      ex: [
        { prompt: 'Смоделируем feature extraction с помощью sklearn. <code>extract</code> — «замороженный» backbone: его веса не меняются. Обучите только head: сделайте <code>fit</code> для <code>head = LogisticRegression(max_iter=1000)</code> на признаках <code>extract(X_train)</code> и запишите test accuracy в <code>head_acc</code>. Для сравнения запишите в <code>raw_acc</code> accuracy logistic regression на сырых <code>X_train</code>.', starter: 'import numpy as np\n' + String.raw`from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(7)
X = rng.uniform(-1, 1, (200, 2))
y = ((X ** 2).sum(axis=1) < 0.4).astype(int)     # внутри круга?
X_train, X_test, y_train, y_test = X[:150], X[150:], y[:150], y[150:]

frng = np.random.default_rng(0)
W_frozen = frng.normal(0, 1, (2, 64))
b_frozen = frng.uniform(-1, 1, 64)

def extract(X):
    return np.maximum(0, X @ W_frozen + b_frozen)   # замороженный backbone

raw_acc = 0
head_acc = 0
`, check: { tests: String.raw`assert abs(raw_acc - 0.70) < 0.03, f'raw_acc должно быть ≈ 0.70 (на сыром X), у вас {raw_acc}'
assert head.n_features_in_ == 64, 'head должен обучаться на 64 признаках extract(X_train)'
assert head_acc >= 0.95, f'head_acc должно быть не меньше 0.95, у вас {head_acc}'
assert W_frozen.shape == (2, 64), 'Не меняйте веса backbone'` }, hints: ['<code>head.fit(extract(X_train), y_train)</code>', '<code>head_acc = head.score(extract(X_test), y_test)</code>'] },
        { prompt: 'Число параметров блоков ResNet-18 дано в словаре <code>layers</code>. Напишите функцию <code>trainable(layers, train)</code>: она суммирует параметры только блоков из списка <code>train</code>. Вычислите <code>head_only = trainable(layers, ["fc"])</code> и <code>finetune = trainable(layers, ["layer4", "fc"])</code>.', check: { tests: String.raw`assert head_only == 2565, f'head_only должно быть 2565, у вас {head_only}'
assert finetune == 8396293, f'finetune должно быть 8393728 + 2565 = 8396293, у вас {finetune}'
assert trainable({"a": 1, "b": 2}, []) == 0, 'Если ничего не обучается, 0'` }, hints: ['Пройдите по <code>layers.items()</code> и проверьте <code>name in train</code>', '<code>sum(n for name, n in layers.items() if name in train)</code>'] },
        { prompt: 'Ресторан в Астане собрал 300 фотографий 5 блюд и хочет распознавать блюдо по фото. С чего правильнее всего начать?', options: ['Обучить CNN с нуля на 300 фото', 'Заморозить pretrained ResNet и обучить новый head на 5 классов', 'Подать пиксели в logistic regression', 'Сначала собрать 1 млн фото'], explain: 'Данных мало: pretrained backbone даёт общие визуальные признаки, а для head на 2 565 параметров 300 фото достаточно.' },
        { prompt: 'Telecom churn: 600 абонентов, 9 табличных столбцов. С какой модели начинаем?', options: ['Большой MLP, 10 слоёв', 'Pretrained ResNet', 'Baseline: logistic regression / gradient boosting', 'Fine-tuning LLM'], explain: 'На табличных и небольших данных классический ML обычно не хуже deep learning, а к тому же быстрее и объяснимее.' }
      ]
    },
    'dl-gate': {
      title: 'Экзамен модуля: Deep Learning Intro',
      body: `
<p>Итоговая проверка: forward pass, softmax и cross-entropy, полный training loop, convolution, PyTorch. Torch не используется, только numpy. Подсказок нет, проходной порог — 75%.</p>`,
      ex: [
        { prompt: 'MLP на 3 класса (ReLU в скрытом слое). С данными весами вычислите: <code>logits</code> (форма (4, 3)), устойчивый softmax по каждой строке → <code>probs</code>, предсказанный класс → <code>pred_class</code> (argmax) и среднюю cross-entropy по истинным <code>y</code> → <code>ce_loss</code>.', check: { tests: String.raw`import numpy as _np
_L = _np.maximum(0, X @ W1 + b1) @ W2 + b2
_e = _np.exp(_L - _L.max(axis=1, keepdims=True)); _Pr = _e / _e.sum(axis=1, keepdims=True)
assert _np.allclose(logits, _L), 'logits = relu(X @ W1 + b1) @ W2 + b2'
assert _np.allclose(probs, _Pr), 'probs — softmax по каждой строке (axis=1), сумма каждой строки равна 1'
assert list(_np.asarray(pred_class)) == list(_Pr.argmax(axis=1)), 'pred_class = probs.argmax(axis=1)'
assert abs(float(ce_loss) - (-_np.mean(_np.log(_Pr[_np.arange(4), y])))) < 1e-6, 'ce_loss — среднее −log вероятности истинного класса'` } },
        { prompt: 'Лежит ли точка внутри круга? Logistic regression на этих данных даёт всего ~71%. Обучите сеть 2 → 8 (ReLU) → 1 (sigmoid) методом gradient descent (веса называются <code>W1</code>, <code>b1</code>, <code>W2</code>, <code>b2</code>, формы готовы). Запишите train accuracy после обучения в <code>acc</code>: нужно не меньше 0.95. Производная ReLU: <code>(z1 > 0)</code>.', check: { tests: String.raw`import numpy as _np
assert W1.shape == (2, 8) and W2.shape == (8, 1), 'Формы весов должны быть (2, 8) и (8, 1)'
_p = 1 / (1 + _np.exp(-(_np.maximum(0, X @ W1 + b1) @ W2 + b2)))
_acc = float(((_p > 0.5) == y).mean())
assert _acc >= 0.95, f'Train accuracy сети {_acc:.3f}, нужно не меньше 0.95'
assert abs(float(acc) - _acc) < 0.02, f'acc должно быть accuracy обученной сети ({_acc:.3f})'` } },
        { prompt: 'Один блок CNN: <code>block(img, k)</code> = maxpool 2×2 (ReLU (conv2d(img, k))). conv2d — без padding, stride 1. Для картинки 6×6 и kernel 3×3 результат будет 2×2. Для <code>img</code> и <code>k</code> из примера вычислите <code>out = block(img, k)</code>.', check: { tests: String.raw`import numpy as _np
def _conv(a, kk):
    return _np.array([[(a[i:i+kk.shape[0], j:j+kk.shape[1]] * kk).sum() for j in range(a.shape[1] - kk.shape[1] + 1)] for i in range(a.shape[0] - kk.shape[0] + 1)])
def _blk(a, kk):
    c = _np.maximum(0, _conv(a, kk)); h, w = c.shape
    return c.reshape(h // 2, 2, w // 2, 2).max(axis=(1, 3))
assert _np.shape(out) == (2, 2), f'Форма out должна быть (2, 2), у вас {_np.shape(out)}'
assert _np.allclose(out, _blk(img, k)), f'out должно быть {_blk(img, k).tolist()}, у вас {out}'
_a = _np.random.default_rng(5).normal(size=(6, 6))
assert _np.allclose(block(_a, k), _blk(_a, k)), 'block должна работать для любой картинки 6×6 (не забыли ReLU?)'` } },
        { prompt: 'Какой порядок внутри training loop в PyTorch верный?', options: ['loss.backward() → optimizer.zero_grad() → model(xb) → optimizer.step()', 'optimizer.zero_grad() → model(xb) → loss_fn(...) → loss.backward() → optimizer.step()', 'model(xb) → optimizer.step() → loss.backward() → optimizer.zero_grad()', 'optimizer.step() → model(xb) → loss_fn(...) → loss.backward()'], explain: 'Очистка → forward → loss → backward (градиенты) → step (обновление). Если step стоит до backward, он обновляет веса старыми градиентами.' },
        { prompt: 'MLP: <code>nn.Linear(784, 256)</code> → ReLU → <code>nn.Linear(256, 10)</code>. Сколько всего обучаемых параметров?', explain: '784·256 + 256 = 200 960; 256·10 + 10 = 2 570; сумма 203 530.' }
      ]
    },
    'cap6-1': {
      title: 'Постановка задачи и метрика успеха',
      body: `
<p>В этом capstone мы строим <b>сервис churn prediction</b> для телеком-компании «Дала Мобайл». В capstone M5 вы сделали модель и написали memo. Теперь вопрос другой: как превратить модель в <b>продукт</b>, которым другие системы могут пользоваться каждый день?</p>
<h3>1. Кто, когда и как будет пользоваться?</h3>
<ul>
<li><b>Потребитель</b>: CRM-система. Когда оператор call-центра разговаривает с абонентом, на экране появляется отметка «высокий риск ухода».</li>
<li><b>Режим</b>: online — один запрос на одного абонента (REST API, M6.2). Ночной batch-скоринг — второй этап.</li>
<li><b>Решение</b>: если вероятность выше порога (threshold), оператор предлагает скидку 2 000 ₸.</li>
</ul>
<h3>2. Метрика успеха на трёх уровнях</h3>
<table>
<tr><th>Уровень</th><th>Метрика</th><th>Цель</th></tr>
<tr><td>Offline (модель)</td><td>ROC-AUC, recall по уходящим</td><td>AUC ≥ 0.78, выше baseline</td></tr>
<tr><td>Бизнес</td><td>Прибыль кампании, ₸</td><td>выше, чем «никому не предлагать» и «предлагать всем»</td></tr>
<tr><td>Сервис (SLO)</td><td>p95 latency, доля ошибок</td><td>p95 &lt; 200 ms, 5xx &lt; 0.1%</td></tr>
</table>
<h3>Пример по шагам: формула прибыли</h3>
<p>Допущения: ушедший абонент принёс бы компании 40 000 ₸ выручки; скидка сохраняет 30% от этого; предложение стоит 2 000 ₸ (кому бы мы его ни сделали).</p>
<pre><code>прибыль = 0.3 · 40 000 · TP − 2 000 · (число получивших предложение)</code></pre>
<p>Модель сделала предложение 55 людям, из них 29 действительно ушли бы (TP = 29): 0.3 · 40 000 · 29 − 2 000 · 55 = 348 000 − 110 000 = <b>238 000 ₸</b>. Это число нужно сравнить с «нулевыми» вариантами без модели: никому не предлагать (0 ₸) и предлагать всем.</p>
<h3>3. Ограничения и риски</h3>
<ul>
<li>Данные: 600 абонентов, в некоторых столбцах есть пропуски.</li>
<li>Справедливость: модель не должна систематически дискриминировать какой-то город.</li>
<li>Конфиденциальность: в API не передаются ФИО и ИИН, только признаки.</li>
</ul>
<div class="tip">Начинайте проект не с кода, а с одностраничного документа «problem framing». Он станет первым разделом README и ответит на вопрос на собеседовании «зачем вы сделали этот проект?».</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3)</code> (формула в уроке). Затем посчитайте по всему <code>churn.csv</code> прибыль двух простых стратегий: <code>profit_all</code> — предлагать всем, <code>profit_none</code> — никому не предлагать.', check: { tests: String.raw`import numpy as _np
assert abs(campaign_profit([1, 0, 1, 0], [1, 1, 0, 0]) - 8000) < 1e-6, 'TP = 1, предложение 2 людям: должно быть 12 000 − 4 000 = 8 000'
assert abs(campaign_profit([1, 1], [1, 1], cost=1000, value=10000, save_rate=0.5) - 8000) < 1e-6, 'Используйте параметры cost, value, save_rate'
assert profit_all is not None and abs(profit_all - 660000) < 1e-6, f'profit_all должно быть 0.3·40000·155 − 2000·600 = 660 000, у вас {profit_all}'
assert profit_none is not None and abs(profit_none) < 1e-6, 'profit_none = 0'` }, hints: ['TP: <code>((y_pred == 1) & (y_true == 1)).sum()</code>', 'Всем: <code>np.ones(len(y))</code>, никому: <code>np.zeros(len(y))</code>'] },
        { prompt: 'Модель сделала предложение 80 абонентам, из них 32 действительно ушли бы. Какая прибыль в ₸ по формуле из урока?', explain: '0.3 · 40 000 · 32 = 384 000; 2 000 · 80 = 160 000; 384 000 − 160 000 = 224 000 ₸.' },
        { prompt: 'Какой набор метрик полнее всего оценивает успех сервиса?', options: ['Только accuracy', 'ROC-AUC + прибыль кампании (₸) + p95 latency и доля ошибок', 'Только p95 latency', 'Число параметров модели'], explain: 'Сервис должен быть успешным на трёх уровнях: качество модели (offline), бизнес-результат и надёжная работа (SLO).' },
        { done: 'Этот текст — раздел «Problem» в README. Сохраните его: в последнем уроке вы добавите его в README.', prompt: 'Напишите одностраничный текст problem framing для своего проекта (не меньше 70 слов): кто пользуется, какое решение принимается, метрики успеха (offline, бизнес, SLO) и не меньше двух рисков. Затем честно оцените себя: по каждому критерию не меньше <b>3 / 4</b>.', criteria: [
          { name: 'Пользователь и решение', levels: ['Не указаны', 'Общие слова «полезно компании»', 'Конкретно: кто пользуется и какое действие выполняется', 'Пользователь, действие, режим (online/batch) и как выбирается порог'] },
          { name: 'Метрика успеха', levels: ['Нет', 'Только accuracy или только AUC', 'Offline- и бизнес-метрика с числовой целью', 'Offline, бизнес и SLO, каждая в сравнении с baseline'] },
          { name: 'Риски', levels: ['Нет', 'Один, общий', 'Два конкретных риска', 'Риски и мера против каждого из них'] }
        ] }
      ]
    },
    'cap6-2': {
      title: 'Данные, data contract и baseline',
      body: `
<p>Сервис получает данные не «один раз», а каждый день. Поэтому мы не просто просматриваем данные, а пишем <b>data contract</b>: какие столбцы, какие типы, какой диапазон значений ожидается. Позже этот contract станет основой валидации API и мониторинга drift.</p>
<h3>churn.csv: что внутри</h3>
<table>
<tr><th>Столбец</th><th>Тип</th><th>Примечание</th></tr>
<tr><td><code>customer_id</code></td><td>int</td><td>не признак, только ключ; не должен повторяться</td></tr>
<tr><td><code>city</code>, <code>plan</code></td><td>категория</td><td>5 городов, 3 тарифа</td></tr>
<tr><td><code>age</code>, <code>data_gb</code></td><td>число</td><td>есть пропуски</td></tr>
<tr><td><code>tenure_months</code>, <code>monthly_fee</code>, <code>support_calls</code>, <code>has_contract</code></td><td>число</td><td>заполнены полностью</td></tr>
<tr><td><code>churned</code></td><td>0/1</td><td>target, примерно 26%</td></tr>
</table>
<h3>Пример по шагам: проверка данных</h3>
<pre><code>churn = pd.read_csv('churn.csv')
print(len(churn))                              # 600
na = churn.isna().sum()
print(na[na > 0].to_dict())                    # {'age': 25, 'data_gb': 17}
print(churn['customer_id'].duplicated().sum()) # 0
print(churn['churned'].mean())                 # 0.258</code></pre>
<p>Эти числа — «паспорт» проекта. Мы записываем их в README, а когда приходят новые данные, автоматически повторяем те же проверки (CI из M6.3).</p>
<h3>Без baseline нет модели</h3>
<p>Baseline — ответ на вопрос «что было бы, если бы мы не делали модель?». Измеряем два:</p>
<ol>
<li><b>DummyClassifier</b> — одинаковый ответ для всех. ROC-AUC = 0.5: уровень случайности.</li>
<li><b>Простая модель</b> — logistic regression на 4 числовых признаках. Каждое следующее усложнение должно её побеждать.</li>
</ol>
<pre><code>from sklearn.model_selection import cross_val_score
pipe = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(),
                     LogisticRegression(max_iter=1000))
cross_val_score(pipe, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()</code></pre>
<div class="tip">Отделите test-выборку один раз на этом этапе и положите её «в сейф» (<code>random_state=42</code>, <code>stratify</code>). Модель выбирается только через cross-validation внутри train. Test открываем один раз в самом конце.</div>
<h3>Частые ошибки</h3>
<ul>
<li>Оставить <code>customer_id</code> в качестве признака.</li>
<li>Заполнить пропуски средним по всем данным, а потом разделить: информация о test попадает в train (leakage). Imputer должен быть внутри pipeline.</li>
</ul>`,
      ex: [
        { prompt: 'Напишите функцию <code>data_report(df)</code>. Она возвращает словарь: <code>n_rows</code>, <code>missing</code> (только столбцы с пропусками: <code>{столбец: число}</code>), <code>dup_ids</code> (число повторяющихся <code>customer_id</code>), <code>churn_rate</code>. Вычислите <code>report = data_report(churn)</code>.', check: { tests: String.raw`import pandas as _pd
assert report.get('n_rows') == 600, 'n_rows = 600'
assert report.get('missing') == {'age': 25, 'data_gb': 17}, f"missing должно быть {{'age': 25, 'data_gb': 17}}, у вас {report.get('missing')}"
assert report.get('dup_ids') == 0, 'dup_ids = 0'
assert abs(report.get('churn_rate', 0) - 0.2583) < 1e-3, 'churn_rate = среднее столбца churned'
_d = _pd.DataFrame({'customer_id': [1, 1, 2], 'x': [None, 1, 2], 'churned': [1, 0, 0]})
_r = data_report(_d)
assert _r['dup_ids'] == 1 and _r['missing'] == {'x': 1}, 'data_report должна работать для любого DataFrame'` }, hints: ['<code>na = df.isna().sum()</code>, затем <code>na[na > 0]</code>', "<code>df['customer_id'].duplicated().sum()</code>"] },
        { prompt: 'Два baseline. Посчитайте на train 5-fold CV ROC-AUC: <code>dummy_auc</code> — для <code>DummyClassifier(strategy="most_frequent")</code>; <code>base_auc</code> — для <code>make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression(max_iter=1000))</code>, только на столбцах <code>FEATURES</code>.', check: { tests: String.raw`assert abs(dummy_auc - 0.5) < 1e-9, f'dummy_auc должно быть 0.5, у вас {dummy_auc}'
assert abs(base_auc - 0.8134) < 0.003, f'base_auc должно быть ≈ 0.813, у вас {base_auc:.4f}. Вы использовали FEATURES, cv=5, scoring="roc_auc"?'
assert len(X_train) == 450, 'Не меняйте разбиение'` }, hints: ["<code>cross_val_score(model, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()</code>", 'Соберите pipeline через <code>make_pipeline(...)</code>'] },
        { prompt: 'Почему <code>SimpleImputer</code> применяется внутри pipeline, а не заранее ко всем данным?', options: ['Так быстрее', 'В CV и на test медиана считается только по train-части, leakage нет, и тот же шаг автоматически повторяется в сервисе', 'pandas не умеет заполнять пропуски', 'Imputer работает только в pipeline'], explain: 'Предобработка внутри pipeline в каждом fold обучается (fit) только на train-части и сохраняется вместе с моделью: пропуск, пришедший в сервис, заполняется той же самой медианой.' }
      ]
    },
    'cap6-3': {
      title: 'Выбор модели и сохранение artifact',
      body: `
<p>Теперь попробуем победить baseline и сохранить модель-победителя как <b>artifact</b>, который сервис сможет загрузить.</p>
<h3>Два кандидата</h3>
<ol>
<li><b>Compact</b>: 4 числовых признака, imputer + scaler + logistic regression.</li>
<li><b>Full</b>: все признаки. Для числовых — imputer + scaler, для <code>city</code> и <code>plan</code> — <code>OneHotEncoder(handle_unknown='ignore')</code>, через <code>ColumnTransformer</code>.</li>
</ol>
<pre><code>NUM = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
CAT = ['city', 'plan']
pre = ColumnTransformer([
    ('num', make_pipeline(SimpleImputer(strategy='median'), StandardScaler()), NUM),
    ('cat', OneHotEncoder(handle_unknown='ignore'), CAT)])
full = make_pipeline(pre, LogisticRegression(max_iter=1000))</code></pre>
<p>На этих данных CV ROC-AUC примерно такой: compact ≈ 0.813, full ≈ 0.811. Больше признаков не победило. В таком случае выбираем <b>более простую</b>: API хватает 4 полей, валидация проще, столбцов для отслеживания drift меньше, объяснять легче. Это настоящее инженерное решение, и мы обосновываем его в README.</p>
<h3>Artifact: модель + метаданные</h3>
<p>Сервис загружает не ноутбук, а файл. На одну модель — два файла:</p>
<pre><code>import pickle, json
with open('churn_model.pkl', 'wb') as f:
    pickle.dump(model, f)               # весь pipeline: imputer + scaler + модель
meta = {'version': 'churn-lr-1.0.0', 'features': FEATURES, 'threshold': 0.3,
        'metrics': {'cv_auc': 0.813, 'test_auc': 0.816}, 'sklearn_version': sklearn.__version__}
with open('model_meta.json', 'w') as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)</code></pre>
<p>Зачем метаданные? Из этого файла сервис узнаёт, какие признаки ждать и какой порог использовать, а в мониторинге на вопрос «какая версия ответила?» отвечает <code>version</code>. В M6.3 MLflow делает это системно: <code>mlflow.log_params</code>, <code>mlflow.log_metric('test_auc', ...)</code>, <code>mlflow.sklearn.log_model(model, 'model')</code> и версия в Model Registry.</p>
<div class="tip">Загружайте pickle только из файлов, которые создали сами: чужой pickle может выполнить любой код. И зафиксируйте версию sklearn (<code>requirements.txt</code>): модель, сохранённая в другой версии, может не загрузиться или работать иначе.</div>
<h3>Training-serving skew</h3>
<p>Самая опасная ошибка: при обучении одна предобработка, в сервисе — другая. Например, в ноутбуке вы делили <code>monthly_fee</code> на тысячу тенге, а в API значение приходит в тенге. Модель отвечает неправильно, но никакого exception нет. Решение — поместить всю предобработку внутрь pipeline и сохранить её как один artifact.</p>`,
      ex: [
        { prompt: 'Сравните двух кандидатов на train по 5-fold CV ROC-AUC: <code>cv_compact</code> (FEATURES, imputer + scaler + LR) и <code>cv_full</code> (ColumnTransformer из урока, NUM + CAT). Победителя запишите в <code>chosen</code> (<code>"compact"</code> или <code>"full"</code>); при равенстве — более простой. Затем обучите compact pipeline под именем <code>model</code> на всём train и вычислите <code>test_auc</code>.', check: { tests: String.raw`assert abs(cv_compact - 0.8134) < 0.003, f'cv_compact должно быть ≈ 0.813, у вас {cv_compact:.4f}'
assert abs(cv_full - 0.8111) < 0.004, f'cv_full должно быть ≈ 0.811, у вас {cv_full:.4f}. Используйте NUM + CAT и OneHotEncoder(handle_unknown="ignore")'
assert chosen == 'compact', 'По CV победил compact (или ничья): chosen = "compact"'
assert hasattr(model, 'predict_proba') and model.n_features_in_ == 4, 'model — compact pipeline, обученный на FEATURES'
assert abs(test_auc - 0.8161) < 0.003, f'test_auc должно быть ≈ 0.816, у вас {test_auc:.4f}'` }, hints: ["<code>cross_val_score(full, X_train[NUM + CAT], y_train, cv=5, scoring='roc_auc').mean()</code>", "<code>chosen = 'compact' if cv_compact >= cv_full else 'full'</code>"] },
        { prompt: 'Сохраните artifact. Запишите <code>model</code> через <code>pickle</code> в файл <code>churn_model.pkl</code>. В файл <code>model_meta.json</code> запишите словарь с ключами <code>version</code> (<code>"churn-lr-1.0.0"</code>), <code>features</code> (FEATURES), <code>threshold</code> (0.3), <code>metrics</code> (<code>{"test_auc": ...}</code>). Затем снова загрузите модель из файла под именем <code>loaded</code>.', check: { tests: String.raw`import json as _json, pickle as _pk, numpy as _np
with open('churn_model.pkl', 'rb') as _f:
    _m = _pk.load(_f)
assert _np.allclose(_m.predict_proba(X_test[FEATURES])[:, 1], model.predict_proba(X_test[FEATURES])[:, 1]), 'В churn_model.pkl должна лежать обученная model'
with open('model_meta.json') as _f:
    _meta = _json.load(_f)
assert _meta.get('version') == 'churn-lr-1.0.0', 'meta["version"] = "churn-lr-1.0.0"'
assert _meta.get('features') == FEATURES, 'meta["features"] = FEATURES'
assert _meta.get('threshold') == 0.3, 'meta["threshold"] = 0.3'
assert abs(_meta.get('metrics', {}).get('test_auc', 0) - test_auc) < 1e-3, 'meta["metrics"]["test_auc"] — вычисленный test_auc'
assert loaded is not None and _np.allclose(loaded.predict_proba(X_test[FEATURES])[:, 1], model.predict_proba(X_test[FEATURES])[:, 1]), 'loaded = pickle.load(...) — модель, загруженная из файла'` }, hints: ["<code>with open('churn_model.pkl', 'wb') as f: pickle.dump(model, f)</code>", "Загрузка: <code>with open('churn_model.pkl', 'rb') as f: loaded = pickle.load(f)</code>"] },
        { prompt: 'В ноутбуке модель обучали на <code>monthly_fee</code>, делённом на тысячу тенге, а API принимает значение в тенге. Сервис не выдаёт ошибок, но прогнозы странные. Что это и как это предотвратить?', options: ['Overfitting; нужно больше данных', 'Training-serving skew; поместить всю предобработку внутрь pipeline и сохранить как один artifact', 'Data drift; переобучить модель', 'Проблема latency; добавить кэш'], explain: 'Предобработка при обучении и в сервисе разная — это training-serving skew. Если предобработка внутри pipeline, сервис получает те же шаги вместе с artifact.' }
      ]
    },
    'cap6-4': {
      title: 'Predict endpoint и валидация входа',
      body: `
<p>Модель готова, теперь сделаем из неё <b>endpoint</b>, который может вызывать CRM. В M6.2 вы делали это на FastAPI. В production код выглядит примерно так:</p>
<pre><code>from fastapi import FastAPI
from pydantic import BaseModel, Field
import pickle, json, pandas as pd

class Customer(BaseModel):
    tenure_months: int = Field(ge=0, le=600)
    monthly_fee: float = Field(ge=1, le=100000)
    support_calls: int = Field(ge=0, le=100)
    has_contract: int = Field(ge=0, le=1)

app = FastAPI()
model = pickle.load(open('churn_model.pkl', 'rb'))
meta = json.load(open('model_meta.json'))

@app.get('/health')
def health():
    return {'status': 'ok', 'model_version': meta['version']}

@app.post('/predict')
def predict(c: Customer):
    proba = float(model.predict_proba(pd.DataFrame([c.model_dump()]))[0, 1])
    return {'churn_proba': round(proba, 4),
            'will_churn': proba >= meta['threshold'],
            'model_version': meta['version']}</code></pre>
<p>Pydantic проверяет запрос до того, как он попадёт в модель: если поля нет, тип неверный или значение вне диапазона, FastAPI сам возвращает <b>422 Unprocessable Entity</b>. В браузере FastAPI нет, поэтому ту же логику мы моделируем обычной функцией Python: <code>predict_endpoint(payload) → (status, body)</code>.</p>
<h3>Правила валидации (из data contract)</h3>
<table>
<tr><th>Поле</th><th>Тип</th><th>Диапазон</th></tr>
<tr><td><code>tenure_months</code></td><td>число</td><td>0…600</td></tr>
<tr><td><code>monthly_fee</code></td><td>число</td><td>1…100 000 ₸</td></tr>
<tr><td><code>support_calls</code></td><td>число</td><td>0…100</td></tr>
<tr><td><code>has_contract</code></td><td>число</td><td>0 или 1</td></tr>
</table>
<h3>Пример по шагам</h3>
<pre><code>predict_endpoint({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})
# (200, {'churn_proba': 0.8427, 'will_churn': True, 'model_version': 'churn-lr-1.0.0'})

predict_endpoint({'tenure_months': '5', 'monthly_fee': 6500, 'support_calls': -1})
# (422, {'errors': ['tenure_months: сан болуы керек',
#                   'support_calls: out of range [0, 100]', 'has_contract: missing']})</code></pre>
<p>Возвращаем все ошибки сразу — клиент исправит их за один раз. Лишние поля (<code>customer_id</code>) игнорируются. (Сообщение <code>сан болуы керек</code> по-казахски означает «должно быть числом».)</p>
<div class="tip">В Python <code>True</code> — подкласс <code>int</code>: <code>isinstance(True, int)</code> → <code>True</code>. Поэтому bool проверяем отдельно и не принимаем как число. Коды: <b>200</b> — успех, <b>422</b> — клиент прислал неверные данные, <b>500</b> — собственная ошибка сервиса (никогда не выдавайте её за вину клиента).</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>validate(payload)</code>: она возвращает список ошибок (пустой список — всё в порядке). Если <code>payload</code> не словарь — одна ошибка. Для каждого поля из <code>RULES</code>: если его нет — <code>"{поле}: missing"</code>; если это не число или bool — <code>"{поле}: сан болуы керек"</code> (по-казахски «должно быть числом»); если вне диапазона — <code>"{поле}: out of range [lo, hi]"</code>. В каждой ошибке должно быть имя поля.', check: { tests: String.raw`_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
assert validate(_ok) == [], f'Для корректного payload нужен пустой список, у вас {validate(_ok)}'
assert validate(dict(_ok, customer_id='A-17')) == [], 'Лишние поля игнорируются'
_e = validate({k: v for k, v in _ok.items() if k != 'monthly_fee'})
assert len(_e) == 1 and 'monthly_fee' in _e[0], f'Нет monthly_fee: одна ошибка с именем поля. У вас {_e}'
_e = validate(dict(_ok, tenure_months='12'))
assert len(_e) == 1 and 'tenure_months' in _e[0], 'Текст "12" — не число, должна быть ошибка'
_e = validate(dict(_ok, has_contract=True))
assert len(_e) == 1 and 'has_contract' in _e[0], 'bool не принимается как число'
_e = validate(dict(_ok, support_calls=-1))
assert len(_e) == 1 and 'support_calls' in _e[0], 'support_calls = -1 вне диапазона'
assert len(validate({})) == 4, 'Пустой словарь: 4 ошибки (каждое поле missing)'
assert len(validate([1, 2])) >= 1, 'payload, который не является словарём, должен давать ошибку'
assert validate(dict(_ok, monthly_fee=6500.5)) == [], 'Число float тоже принимается'` }, hints: ['<code>if not isinstance(payload, dict): return [...]</code>', "<code>if isinstance(v, bool) or not isinstance(v, (int, float))</code>, затем <code>lo <= v <= hi</code>"] },
        { prompt: 'Модель, <code>validate</code>, <code>MODEL_VERSION</code> и <code>THRESHOLD</code> готовы. Напишите <code>predict_endpoint(payload)</code>: при ошибках — <code>(422, {"errors": [...]})</code>; иначе создайте однострочный DataFrame в порядке FEATURES и верните <code>(200, {"churn_proba": round(proba, 4), "will_churn": proba >= THRESHOLD, "model_version": MODEL_VERSION})</code>.', check: { tests: String.raw`import pandas as _pd
_ok = {'customer_id': 'A-17', 'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
_s, _b = predict_endpoint(_ok)
_p = float(model.predict_proba(_pd.DataFrame([{f: _ok[f] for f in FEATURES}]))[0, 1])
assert _s == 200, f'Для корректного payload статус 200, у вас {_s}'
assert set(_b) == {'churn_proba', 'will_churn', 'model_version'}, f'Ключи ответа: churn_proba, will_churn, model_version. У вас {set(_b)}'
assert abs(_b['churn_proba'] - round(_p, 4)) < 1e-9, 'churn_proba = round(proba, 4)'
assert _b['will_churn'] == (_p >= THRESHOLD) and _b['model_version'] == MODEL_VERSION, 'will_churn = proba >= THRESHOLD, model_version = MODEL_VERSION'
_s2, _b2 = predict_endpoint({'tenure_months': 48, 'monthly_fee': 3500, 'support_calls': 0, 'has_contract': 1})
assert _s2 == 200 and not _b2['will_churn'], 'Давний клиент с договором — will_churn False'
_s3, _b3 = predict_endpoint({'tenure_months': 5})
assert _s3 == 422 and len(_b3.get('errors', [])) == 3, 'Недостающие поля: 422 и 3 ошибки'` }, hints: ['Сначала <code>errors = validate(payload)</code>; если они есть — <code>return 422, {"errors": errors}</code>', '<code>row = pd.DataFrame([{f: payload[f] for f in FEATURES}])</code>, <code>proba = float(model.predict_proba(row)[0, 1])</code>'] },
        { prompt: 'Клиент прислал <code>{"tenure_months": "бес"}</code> (по-казахски «пять»), а сервис упал внутри <code>predict_proba</code> и вернул <b>500</b>. Что не так?', options: ['Всё верно, 500 означает ошибку', 'Валидация не сделана до модели: это ошибка клиента, нужны 422 и понятное сообщение', 'Нужно переобучить модель', 'Нужно вернуть клиенту 200 и proba = 0'], explain: 'Неверный вход — ошибка клиента (4xx). 500 означает собственную неисправность сервиса и вызывает ложные alert в мониторинге. Pydantic/validate должен стоять до модели.' }
      ]
    },
    'cap6-5': {
      title: 'Тесты, мониторинг и drift',
      body: `
<p>После запуска сервиса остаются два вопроса: «ничего ли не сломалось после изменений?» (тесты, M6.1) и «не ухудшается ли модель со временем?» (мониторинг, M6.3).</p>
<h3>Виды тестов</h3>
<table>
<tr><th>Вид</th><th>Пример</th></tr>
<tr><td>Unit</td><td><code>validate</code> находит отсутствующее поле</td></tr>
<tr><td>Contract</td><td>в ответе есть <code>churn_proba</code>, <code>will_churn</code>, <code>model_version</code>, proba ∈ [0, 1]</td></tr>
<tr><td>Directional (направление)</td><td>если support_calls растёт, риск не может не расти</td></tr>
<tr><td>Quality gate</td><td>в CI на зафиксированной test-выборке AUC ≥ 0.78, иначе merge нет</td></tr>
</table>
<pre><code># tests/test_api.py — pytest сам найдёт и запустит его
def test_missing_field_422():
    status, body = predict_endpoint({'tenure_months': 5})
    assert status == 422
    assert any('monthly_fee' in e for e in body['errors'])</code></pre>
<p>Хороший тест <b>способен поймать</b> ошибку. Один из способов это проверить — подсунуть намеренно сломанную версию (mutant) и посмотреть, упадёт ли тест.</p>
<h3>Мониторинг: три слоя</h3>
<ol>
<li><b>Сервис</b>: число запросов, p95 latency, доля 4xx/5xx.</li>
<li><b>Данные</b>: отклонилось ли распределение входных признаков от обучающего (<b>data drift</b>)? Изменилось ли распределение прогнозов (среднее proba, доля will_churn)?</li>
<li><b>Качество модели</b>: истинный ответ (ушёл/не ушёл) становится известен только через 1–3 месяца. Тогда пересчитываем AUC и прибыль кампании.</li>
</ol>
<h3>PSI — Population Stability Index</h3>
<p>Строим bin-ы по квантилям обучающих данных и сравниваем долю в каждом bin «раньше» (e) и «сейчас» (a):</p>
<pre><code>PSI = Σ (a − e) · ln(a / e)
&lt; 0.1 — стабильно · 0.1–0.25 — наблюдать · &gt; 0.25 — alert</code></pre>
<p>Пример: маркетинговая кампания привела много новых абонентов, и в новом месяце <code>tenure_months</code> намного меньше, чем при обучении. PSI ≈ 3.6 — явный drift: таких абонентов модель видела мало, прогнозы нужно проверить. PSI между train и test ≈ 0.07 — это просто случайное отклонение.</p>
<div class="tip">Drift не означает автоматически «переобучите модель». Сначала найдите причину: сломался ли pipeline данных (например, тенге превратились в тиыны), изменился ли бизнес (новый тариф) или действительно изменилось поведение.</div>`,
      ex: [
        { prompt: 'Сервис (<code>predict_endpoint</code>) готов. Напишите три теста в стиле pytest: <code>test_valid_returns_200</code> (статус 200, <code>0 ≤ churn_proba ≤ 1</code>), <code>test_missing_field_422</code> (нет поля → 422), <code>test_more_calls_higher_risk</code> (остальные поля одинаковые, support_calls 0 и 5: proba строго растёт). Проверяющий запустит ваши тесты на правильном сервисе и на намеренно сломанных версиях.', check: { tests: String.raw`_real = predict_endpoint
for _t in (test_valid_returns_200, test_missing_field_422, test_more_calls_higher_risk):
    _t()
def _breaks(_fn):
    try:
        _fn()
    except Exception:
        return True
    return False
predict_endpoint = lambda p: (200, {'churn_proba': 0.5, 'will_churn': True, 'model_version': MODEL_VERSION})
assert _breaks(test_missing_field_422), 'Сервис без валидации отвечает 200 на любой запрос: test_missing_field_422 должен это поймать (проверьте status == 422)'
assert _breaks(test_more_calls_higher_risk), 'Сервис, который всегда возвращает 0.5, должен ловить test_more_calls_higher_risk (high > low)'
predict_endpoint = lambda p: (200, {'churn_proba': 1.7, 'will_churn': True, 'model_version': MODEL_VERSION})
assert _breaks(test_valid_returns_200), 'Сервис, возвращающий proba = 1.7, должен ловить test_valid_returns_200 (0 ≤ proba ≤ 1)'
predict_endpoint = lambda p: (500, {'error': 'internal'})
assert _breaks(test_valid_returns_200), 'Сервис, возвращающий 500, должен ловить test_valid_returns_200 (status == 200)'
predict_endpoint = _real` }, hints: ['<code>status, body = predict_endpoint(BASE)</code>, затем <code>assert status == 200</code> и диапазон proba', "Сравните ответы для <code>dict(BASE, support_calls=0)</code> и <code>dict(BASE, support_calls=5)</code>"] },
        { prompt: 'Напишите <code>psi(expected, actual, bins=5)</code>: границы bin — квантили <code>expected</code> (<code>np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))</code>, крайние — <code>-inf</code>/<code>inf</code>), доли ограничьте через <code>np.clip(..., 1e-4, None)</code>. Вычислите <code>psi_same</code> (tenure в train и test) и <code>psi_new</code> (tenure в train и в <code>new_month</code>), а функцией <code>status(psi)</code> (<code>"ok"</code> &lt; 0.1 ≤ <code>"watch"</code> ≤ 0.25 &lt; <code>"alert"</code>) получите <code>new_status</code>.', check: { tests: String.raw`import numpy as _np
assert abs(psi_same - 0.0693) < 0.005, f'psi_same должно быть ≈ 0.069, у вас {psi_same:.4f}'
assert abs(psi_new - 3.557) < 0.02, f'psi_new должно быть ≈ 3.56, у вас {psi_new:.3f}'
assert abs(psi(_np.arange(100), _np.arange(100))) < 1e-9, 'При одинаковом распределении PSI = 0'
assert status(0.05) == 'ok' and status(0.1) == 'watch' and status(0.25) == 'watch' and status(0.3) == 'alert', 'status: < 0.1 ok, 0.1–0.25 watch, > 0.25 alert'
assert new_status == 'alert', 'Для new_month должен быть alert'` }, hints: ['<code>e = np.histogram(expected, edges)[0] / len(expected)</code>, для actual так же', '<code>np.sum((a - e) * np.log(a / e))</code>'] },
        { done: 'Это раздел «Monitoring» в README и готовый ответ на вопрос на собеседовании «как вы следите за моделью в production?».', prompt: 'Напишите план мониторинга сервиса churn (не меньше 80 слов): что логируется, какие метрики и пороги (сервис, drift, качество), как вы учитываете, что истинные ответы приходят поздно, кому уходит alert, когда и как делается переобучение. Затем честно оцените себя: по каждому критерию не меньше <b>3 / 4</b>.', criteria: [
          { name: 'Что логируется', levels: ['Не указано', '«Логируем всё»', 'Входные признаки, proba, model_version, время, статус', 'А также request id, latency и то, что персональные данные в лог не попадают'] },
          { name: 'Метрики и пороги', levels: ['Нет', 'Метрики названы, без порогов', 'Метрики сервиса, drift (PSI) и качества с конкретными порогами', 'А также распределение прогнозов и учёт задержки истинных ответов'] },
          { name: 'План действий', levels: ['Нет', '«Обновим модель»', 'Кому уходит alert и условие переобучения', 'Шаги проверки причины, переобучение, выпуск новой версии через test/shadow и rollback'] }
        ] }
      ]
    },
    'cap6-gate': {
      title: 'Итоговый проект: ML-сервис churn',
      body: `
<p>Последний этап: выбор порога по бизнес-критерию, полный endpoint и batch endpoint, отчёт о drift и README для портфолио. Подсказок нет, проходной порог — 75%. Когда всё будет готово, выложите проект на GitHub: <code>src/</code> (train.py, service.py), <code>tests/</code>, <code>models/</code> (artifact + meta), <code>Dockerfile</code>, <code>README.md</code>.</p>
<h3>Рекомендуемая структура репозитория</h3>
<pre><code>churn-service/
├── src/train.py          # данные → pipeline → churn_model.pkl + model_meta.json
├── src/service.py        # FastAPI: /health, /predict, /predict_batch
├── tests/test_api.py     # unit, contract, directional, quality gate
├── monitoring/drift.py   # расчёт PSI, cron или Airflow
├── Dockerfile            # python:3.11-slim, requirements.txt, uvicorn
├── .github/workflows/ci.yml   # pytest + quality gate
└── README.md</code></pre>`,
      ex: [
        { prompt: 'Выбор порога. Train снова разделён на <code>X_fit</code>/<code>X_val</code>. Обучите compact pipeline под именем <code>model</code> на <code>X_fit</code>. Из порогов <code>[0.1, 0.15, …, 0.8]</code> выберите тот, что максимизирует <code>campaign_profit</code> на validation, и запишите его в <code>best_threshold</code>, а эту прибыль — в <code>val_profit</code>. Затем с тем же порогом посчитайте <code>test_profit</code> на test.', check: { tests: String.raw`assert hasattr(model, 'predict_proba') and model.n_features_in_ == 4, 'model — compact pipeline, обученный на FEATURES'
assert len(X_fit) == 315, 'Не меняйте разбиение'
assert abs(float(best_threshold) - 0.2) < 1e-9, f'best_threshold должно быть 0.2, у вас {best_threshold}. Выбирайте порог на validation, а не на test'
assert abs(val_profit - 222000) < 1, f'val_profit должно быть 222 000, у вас {val_profit}'
assert abs(test_profit - 218000) < 1, f'test_profit должно быть 218 000, у вас {test_profit}'` } },
        { prompt: 'Endpoint-ы. <code>RULES</code> и модель готовы. (1) <code>predict_endpoint(payload)</code>: валидация по правилам из cap6-4, при ошибках — <code>(422, {"errors": [...]})</code>, иначе <code>(200, {"churn_proba", "will_churn", "model_version"})</code>. (2) <code>predict_batch(records)</code>: пустой или не список → <code>(422, ...)</code>; больше 100 → <code>(413, ...)</code>; иначе <code>(200, {"results": [...], "n_ok": k, "n_errors": m})</code>, где каждый результат — <code>{"index": i, "status": s, **body}</code>. Одна ошибочная запись не должна ронять весь batch.', check: { tests: String.raw`import pandas as _pd
_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
_s, _b = predict_endpoint(_ok)
_p = float(model.predict_proba(_pd.DataFrame([{f: _ok[f] for f in FEATURES}]))[0, 1])
assert _s == 200 and abs(_b['churn_proba'] - round(_p, 4)) < 1e-9 and _b['will_churn'] == (_p >= THRESHOLD) and _b['model_version'] == MODEL_VERSION, 'predict_endpoint на корректном payload должен давать 200 и правильный ответ'
for _bad in ({}, dict(_ok, has_contract=True), dict(_ok, monthly_fee='6500'), dict(_ok, tenure_months=-3), 'text'):
    _s, _b = predict_endpoint(_bad)
    assert _s == 422 and _b.get('errors'), f'Неверный payload {_bad!r}: нужны 422 и errors'
_s, _b = predict_batch([_ok, {'tenure_months': 5}, dict(_ok, support_calls=0)])
assert _s == 200 and _b['n_ok'] == 2 and _b['n_errors'] == 1, 'Batch: 2 успешных, 1 ошибка'
assert [r['index'] for r in _b['results']] == [0, 1, 2] and _b['results'][1]['status'] == 422, 'results даёт index и status для каждой записи'
assert _b['results'][0]['churn_proba'] > _b['results'][2]['churn_proba'], 'В results должен быть churn_proba'
assert predict_batch([])[0] == 422 and predict_batch('x')[0] == 422, 'Пустой batch или не список: 422'
assert predict_batch([_ok] * 101)[0] == 413, 'Больше 100 записей: 413'` } },
        { prompt: 'Отчёт о drift. <code>psi</code> готова. Напишите <code>drift_report(ref, new, cols, threshold=0.25)</code>: она возвращает <code>(scores, alerts)</code>, где <code>scores = {столбец: psi}</code>, а <code>alerts</code> — столбцы с PSI выше порога (список, отсортированный по алфавиту). Для <code>new_month</code>, где тарифы подорожали на 15%, вычислите <code>scores, alerts = drift_report(X_train, new_month, ["tenure_months", "monthly_fee", "support_calls"])</code>.', check: { tests: String.raw`assert set(scores) == {'tenure_months', 'monthly_fee', 'support_calls'}, 'В scores должно быть три столбца'
assert abs(scores['monthly_fee'] - psi(X_train['monthly_fee'], new_month['monthly_fee'])) < 1e-9, 'scores[столбец] = psi(ref[столбец], new[столбец])'
assert alerts == ['monthly_fee'], f"alerts должно быть ['monthly_fee'], у вас {alerts}"
_s, _a = drift_report(X_train, X_train, ['tenure_months', 'support_calls'])
assert _a == [] and all(abs(v) < 1e-9 for v in _s.values()), 'На одинаковых данных alert нет'
_s, _a = drift_report(X_train, new_month, ['monthly_fee', 'tenure_months'], threshold=0.0)
assert _a == ['monthly_fee', 'tenure_months'], 'alerts должны быть отсортированы по алфавиту и использовать параметр threshold'` } },
        { prompt: 'После новых тарифов PSI по <code>monthly_fee</code> = 5.8 (alert), а истинные ответы о churn станут известны только через 2 месяца. Какое действие самое правильное?', options: ['Тревога — сразу отключить сервис', 'Ничего не делать: AUC пока неизвестен', 'Подтвердить причину (изменение тарифов, а не ошибка pipeline), посмотреть распределение прогнозов, сделать monthly_fee относительным к тарифу или запланировать переобучение на новых данных, проверить новую версию в режиме shadow', 'Быстро убрать столбец monthly_fee из модели и сделать deploy без тестов'], explain: 'Drift — начало расследования. Находим причину, оцениваем влияние на модель (распределение прогнозов) и обновляем её контролируемо: shadow/canary, тесты, план rollback.' },
        { done: 'Поздравляем — это самый сильный проект в вашем портфолио. Закрепите (pin) README на GitHub и добавьте 2-минутное demo-видео (curl /predict, тесты, отчёт о drift). В резюме: «Сервис churn prediction: sklearn pipeline, FastAPI + валидация pydantic, pytest (contract + directional), мониторинг drift через PSI, Docker; +218 000 ₸ прибыли на test при бизнес-пороге».', prompt: 'Напишите текст <b>README.md</b> проекта (не меньше 120 слов): Problem (cap6-1), Data & baseline, Model (почему compact, результаты CV/test, порог и прибыль в ₸), API (endpoint-ы, пример запроса/ответа, коды ошибок), Testing, Monitoring, как запустить (Docker/uvicorn) и Limitations. В конце добавьте сценарий 2-минутного demo (3–5 шагов). Затем честно оцените себя: по каждому критерию не меньше <b>3 / 4</b>.', criteria: [
          { name: 'Структура и полнота', levels: ['Только описание кода', 'Есть несколько разделов, но нет Problem или API', 'Есть все основные разделы', 'Все разделы, и ценность проекта понятна с первого абзаца'] },
          { name: 'Числа и решения', levels: ['Чисел нет', 'Только одна метрика', 'Baseline, CV/test AUC, порог и прибыль в ₸', 'Числа и обоснование каждого решения (почему compact, почему порог 0.2/0.3)'] },
          { name: 'Воспроизводимость', levels: ['Нет инструкции по запуску', 'Общая («запустите через Docker»)', 'Конкретные команды и пример запроса/ответа', 'Команды, зафиксированные версии, запуск тестов и сценарий demo'] },
          { name: 'Ограничения и следующие шаги', levels: ['Нет', 'Общие слова', 'Конкретные ограничения (объём данных, допущение о 30%, поздние ответы)', 'Ограничения, риски и конкретные следующие шаги (пилот, batch-скоринг, график переобучения)'] }
        ] }
      ]
    }
  }
});
