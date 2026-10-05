// M6.4 Deep Learning Intro and M6.6 ML Capstone. Deep learning is taught with numpy in Pyodide (torch is shown as text only); the capstone uses sklearn on churn.csv from content/mldata.js.
(function () {
  const P = String.raw;
  const NP = 'import numpy as np\n';

  DJ.modules['m6-4'] = {
    intro: 'Нейрон желілері қалай «үйренетінін» ішінен көресіз: numpy арқылы нейрон, forward pass, loss, gradient descent және backpropagation жазып, XOR-ды шешетін кішкентай желіні өзіңіз үйретесіз. Сосын сол қадамдарды PyTorch-қа аударып, CNN мен transfer learning идеясын түсінесіз.',
    lessons: [
      {
        id: 'dl-1', title: 'Нейрон және activation функциялары', minutes: 14,
        body: `
<p>Deep learning-тің кірпіші — <b>нейрон</b>. Ол өте қарапайым есеп жасайды: кірістерді салмақтарға көбейтіп қосады, bias қосады, сосын нәтижені <b>activation функциясынан</b> өткізеді.</p>
<pre><code>z = w1·x1 + w2·x2 + ... + b      # сызықтық бөлік
a = f(z)                          # activation</code></pre>
<p>Бұл сізге таныс: logistic regression — дәл осындай бір нейрон, мұндағы <code>f</code> — sigmoid. Нейрон желісі — осындай нейрондарды қабат-қабат етіп қосу.</p>
<h3>Негізгі activation функциялары</h3>
<table>
<tr><th>Атауы</th><th>Формула</th><th>Қайда</th></tr>
<tr><td>sigmoid</td><td>1 / (1 + e<sup>−z</sup>), мәні 0…1</td><td>екі класты шығыс (ықтималдық)</td></tr>
<tr><td>tanh</td><td>мәні −1…1, нөлге қатысты симметриялы</td><td>жасырын қабаттар, RNN</td></tr>
<tr><td>ReLU</td><td>max(0, z)</td><td>жасырын қабаттардағы әдепкі таңдау</td></tr>
<tr><td>softmax</td><td>e<sup>z_i</sup> / Σ e<sup>z_j</sup></td><td>көп класты шығыс, қосындысы 1</td></tr>
</table>
<h3>Қадамдап мысал</h3>
<p>Kaspi-стильдегі дүкен клиенттің сатып алатынын болжайды. Екі белгі: сайтта өткізген минут <code>x1 = 3</code> және себеттегі тауар саны <code>x2 = 2</code>. Салмақтар <code>w = [0.4, 0.5]</code>, <code>b = −1.5</code>.</p>
<ol>
<li>z = 0.4·3 + 0.5·2 − 1.5 = 1.2 + 1.0 − 1.5 = 0.7</li>
<li>sigmoid(0.7) ≈ 0.668 — сатып алу ықтималдығы шамамен 67%.</li>
<li>ReLU(0.7) = 0.7, ал ReLU(−0.7) = 0.</li>
</ol>
<pre><code>import numpy as np
x = np.array([3.0, 2.0])
w = np.array([0.4, 0.5])
b = -1.5
z = x @ w + b          # 0.7
print(1 / (1 + np.exp(-z)))   # 0.668</code></pre>
<h3>Неге activation міндетті?</h3>
<p>Егер activation болмаса, екі сызықтық қабат қатар тұрса да, нәтиже бәрібір бір сызықтық функция: W2(W1·x) = (W2·W1)·x. Яғни 100 қабат та бір logistic regression-нан күшті болмайды. Сызықтық емес функция (ReLU, tanh) желіге қисық шекараларды үйренуге мүмкіндік береді.</p>
<div class="tip">ReLU-ды жасырын қабаттарда әдепкі ретінде алыңыз: ол жылдам есептеледі және терең желілерде градиенттің «өшіп» қалуы (vanishing gradient) sigmoid-тағыдан әлдеқайда сирек болады.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Шығыс қабатқа ReLU қою, ал керегі ықтималдық болса: sigmoid немесе softmax керек.</li>
<li><code>np.exp</code> орнына <code>math.exp</code>-ты массивке қолдану: <code>math</code> тек жалғыз санмен жұмыс істейді.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 15, prompt: 'Үш функция жазыңыз: <code>sigmoid(z)</code>, <code>relu(z)</code> және <code>neuron(x, w, b)</code>. Олар numpy массивтерімен жұмыс істесін. <code>neuron</code> sigmoid(x @ w + b) қайтарады.', starter: NP + P`def sigmoid(z):
    pass

def relu(z):
    pass

def neuron(x, w, b):
    pass
`, solution: NP + P`def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def relu(z):
    return np.maximum(0, z)

def neuron(x, w, b):
    return sigmoid(x @ w + b)

print(neuron(np.array([3.0, 2.0]), np.array([0.4, 0.5]), -1.5))
`, check: { tests: P`import numpy as _np
_z = _np.array([-2.0, 0.0, 0.7])
assert _np.allclose(sigmoid(_z), 1 / (1 + _np.exp(-_z))), 'sigmoid(z) = 1 / (1 + np.exp(-z)) болуы керек'
assert _np.allclose(relu(_z), [0.0, 0.0, 0.7]), 'relu теріс мәндерді 0-ге айналдырады: np.maximum(0, z)'
_o = neuron(_np.array([3.0, 2.0]), _np.array([0.4, 0.5]), -1.5)
assert abs(float(_o) - 0.6682) < 1e-3, f'neuron нәтижесі ≈ 0.668 болуы керек, сізде {_o}'` }, hints: ['<code>np.exp(-z)</code> массивтің әр элементіне жұмыс істейді', '<code>np.maximum(0, z)</code> — элемент бойынша максимум'] },
          { type: 'python', xp: 15, prompt: 'Softmax жазыңыз: <code>softmax(z)</code> 1D массив алып, қосындысы 1-ге тең ықтималдықтар қайтарады. Үлкен сандарда <code>exp</code> толып кетпеуі үшін алдымен <code>z - z.max()</code> алыңыз. <code>probs = softmax(np.array([2.0, 1.0, 0.1]))</code> есептеңіз.', starter: NP + P`def softmax(z):
    return np.exp(z)

probs = softmax(np.array([2.0, 1.0, 0.1]))
print(probs)
`, solution: NP + P`def softmax(z):
    e = np.exp(z - z.max())
    return e / e.sum()

probs = softmax(np.array([2.0, 1.0, 0.1]))
print(probs)
`, check: { tests: P`import numpy as _np
assert abs(float(_np.sum(probs)) - 1) < 1e-9, 'Ықтималдықтардың қосындысы 1 болуы керек: e / e.sum()'
assert _np.allclose(probs, [0.659, 0.242, 0.099], atol=1e-3), f'probs ≈ [0.659, 0.242, 0.099] болуы керек, сізде {probs}'
_big = softmax(_np.array([1000.0, 1000.0]))
assert _np.allclose(_big, [0.5, 0.5]), 'Үлкен сандарда nan шықпауы керек: алдымен z - z.max() алыңыз'` }, hints: ['<code>e = np.exp(z - z.max())</code>', '<code>return e / e.sum()</code>'] },
          { type: 'number', xp: 10, prompt: 'Нейрон: w = [0.5, −1.0], b = 0.2, кіріс x = [2, 1]. ReLU activation-нан кейінгі шығыс қанша?', answer: 0.2, tol: 0.001, explain: 'z = 0.5·2 − 1·1 + 0.2 = 0.2. ReLU(0.2) = 0.2.' },
          { type: 'quiz', xp: 10, prompt: 'Үш қабатты желіде activation-ды мүлде алып тастасақ не болады?', options: ['Желі тезірек әрі дәлірек үйренеді', 'Желі бір сызықтық модельге тең болып қалады', 'Желі тек бүтін сандарды болжайды', 'Ештеңе өзгермейді'], answer: 1, explain: 'Сызықтық функциялардың композициясы да сызықтық: W3·W2·W1 бір матрицаға жиналады. Қисық шекараны үйрену үшін сызықтық емес activation керек.' }
        ]
      },
      {
        id: 'dl-2', title: 'MLP: forward pass numpy-мен', minutes: 15,
        body: `
<p><b>MLP</b> (multi-layer perceptron) — бірнеше толық байланысқан (fully connected, PyTorch-та <code>Linear</code>) қабаттан тұратын желі. Әр қабат бір матрицалық көбейту: бір мезгілде барлық мысалдар мен барлық нейрондар үшін есептейді.</p>
<pre><code>H = relu(X @ W1 + b1)      # жасырын қабат
P = sigmoid(H @ W2 + b2)   # шығыс</code></pre>
<h3>Пішіндер — ең маңызды тексеріс</h3>
<table>
<tr><th>Массив</th><th>Пішін</th><th>Мағынасы</th></tr>
<tr><td>X</td><td>(n, 3)</td><td>n мысал, 3 белгі</td></tr>
<tr><td>W1</td><td>(3, 4)</td><td>3 кіріс → 4 жасырын нейрон</td></tr>
<tr><td>b1</td><td>(4,)</td><td>әр жасырын нейронға бір bias</td></tr>
<tr><td>H</td><td>(n, 4)</td><td>әр мысалдың жасырын көрінісі</td></tr>
<tr><td>W2</td><td>(4, 1)</td><td>4 жасырын → 1 шығыс</td></tr>
<tr><td>P</td><td>(n, 1)</td><td>әр мысалға бір ықтималдық</td></tr>
</table>
<p>Ереже: <code>(n, a) @ (a, b) → (n, b)</code>. Ортадағы өлшемдер сәйкес келмесе, numpy <i>shapes not aligned</i> қатесін береді. Bias broadcasting арқылы әр жолға қосылады.</p>
<h3>Параметрлер саны</h3>
<p>Бір <code>Linear(a, b)</code> қабатында <code>a·b</code> салмақ және <code>b</code> bias бар. Жоғарыдағы 3 → 4 → 1 желіде: 3·4 + 4 = 16 және 4·1 + 1 = 5, барлығы 21 параметр. ImageNet-тегі ResNet-50-де шамамен 25 миллион — бірақ принцип бірдей.</p>
<h3>Қадамдап мысал</h3>
<pre><code>import numpy as np
X = np.array([[1.0, 0.0, 2.0]])          # (1, 3)
W1 = np.array([[ 0.2, -0.5, 0.1, 0.0],
               [ 0.4,  0.3, 0.0, 0.1],
               [-0.1,  0.2, 0.3, 0.5]])  # (3, 4)
b1 = np.zeros(4)
H = np.maximum(0, X @ W1 + b1)
print(H)   # [[0.  0.  0.7 1. ]]</code></pre>
<p>Бірінші нейрон: 1·0.2 + 0·0.4 + 2·(−0.1) = 0 → ReLU → 0. Үшінші: 0.1 + 0.6 = 0.7. Бұл есепті қолмен бір рет жасау матрицалық көбейтудің не істейтінін түсінуге көмектеседі.</p>
<div class="tip">Forward pass жазғанда әр қадамнан кейін <code>print(H.shape)</code> қойыңыз. Deep learning-тегі қателердің жартысы — пішін қатесі.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>W1 @ X</code> деп ретін ауыстыру: біздің келісімде мысалдар жолдарда, сондықтан <code>X @ W1</code>.</li>
<li><code>*</code> (элемент бойынша) мен <code>@</code> (матрицалық) көбейтуді шатастыру.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>forward(X, W1, b1, W2, b2)</code> функциясын жазыңыз: жасырын қабатта ReLU, шығыста sigmoid. Ол шығыс ықтималдықтарын <code>(n, 1)</code> пішінінде қайтарсын. Берілген салмақтармен <code>P = forward(X, W1, b1, W2, b2)</code> есептеңіз.', starter: NP + P`X = np.array([[1.0, 0.0, 2.0], [0.5, 1.0, -1.0]])
W1 = np.array([[0.2, -0.5, 0.1, 0.0], [0.4, 0.3, 0.0, 0.1], [-0.1, 0.2, 0.3, 0.5]])
b1 = np.zeros(4)
W2 = np.array([[1.0], [-1.0], [0.5], [2.0]])
b2 = np.array([-1.0])

def forward(X, W1, b1, W2, b2):
    H = X @ W1 + b1
    return H

P = forward(X, W1, b1, W2, b2)
print(P)
`, solution: NP + P`X = np.array([[1.0, 0.0, 2.0], [0.5, 1.0, -1.0]])
W1 = np.array([[0.2, -0.5, 0.1, 0.0], [0.4, 0.3, 0.0, 0.1], [-0.1, 0.2, 0.3, 0.5]])
b1 = np.zeros(4)
W2 = np.array([[1.0], [-1.0], [0.5], [2.0]])
b2 = np.array([-1.0])

def forward(X, W1, b1, W2, b2):
    H = np.maximum(0, X @ W1 + b1)
    return 1 / (1 + np.exp(-(H @ W2 + b2)))

P = forward(X, W1, b1, W2, b2)
print(P)
`, check: { tests: P`import numpy as _np
_H = _np.maximum(0, X @ W1 + b1)
_P = 1 / (1 + _np.exp(-(_H @ W2 + b2)))
assert _np.shape(P) == (2, 1), f'P пішіні (2, 1) болуы керек, сізде {_np.shape(P)}'
assert _np.allclose(P, _P), 'Жасырын қабатта ReLU, шығыста sigmoid керек'
_X2 = _np.random.default_rng(1).normal(size=(5, 3))
assert _np.allclose(forward(_X2, W1, b1, W2, b2), 1 / (1 + _np.exp(-(_np.maximum(0, _X2 @ W1 + b1) @ W2 + b2)))), 'forward кез келген X үшін дұрыс жұмыс істеуі керек'` }, hints: ['<code>H = np.maximum(0, X @ W1 + b1)</code>', '<code>return 1 / (1 + np.exp(-(H @ W2 + b2)))</code>'] },
          { type: 'python', xp: 15, prompt: '<code>n_params(layers)</code> функциясын жазыңыз: <code>layers</code> — қабат өлшемдерінің тізімі, мысалы <code>[3, 4, 1]</code>. Әр көрші жұп <code>(a, b)</code> үшін <code>a·b + b</code> параметр. <code>[784, 128, 10]</code> үшін нәтижені <code>mnist_params</code>-қа жазыңыз.', starter: P`def n_params(layers):
    return 0

mnist_params = n_params([784, 128, 10])
print(mnist_params)
`, solution: P`def n_params(layers):
    total = 0
    for a, b in zip(layers[:-1], layers[1:]):
        total += a * b + b
    return total

mnist_params = n_params([784, 128, 10])
print(mnist_params)
`, check: { tests: P`assert n_params([3, 4, 1]) == 21, f'[3, 4, 1] үшін 21 болуы керек, сізде {n_params([3, 4, 1])}'
assert n_params([2, 2]) == 6, '[2, 2]: 2·2 + 2 = 6'
assert mnist_params == 101770, f'mnist_params = 784·128 + 128 + 128·10 + 10 = 101770 болуы керек, сізде {mnist_params}'` }, hints: ['<code>zip(layers[:-1], layers[1:])</code> көрші жұптарды береді', 'Әр жұпқа <code>a * b + b</code> қосыңыз'] },
          { type: 'quiz', xp: 10, prompt: '<code>X</code> пішіні (32, 10), <code>W1</code> пішіні (10, 64), <code>W2</code> пішіні (64, 3). <code>relu(X @ W1) @ W2</code> нәтижесінің пішіні қандай?', options: ['(10, 3)', '(32, 64)', '(32, 3)', '(64, 3)'], answer: 2, explain: '(32, 10) @ (10, 64) → (32, 64); ReLU пішінді өзгертпейді; (32, 64) @ (64, 3) → (32, 3): 32 мысалдың әрқайсысына 3 класс бойынша баға.' }
        ]
      },
      {
        id: 'dl-3', title: 'Loss функциялары', minutes: 13,
        body: `
<p>Желі үйренуі үшін оның қаншалықты қателескенін бір санмен өлшеу керек. Бұл сан — <b>loss</b>. Үйрету — loss-ты азайтатын салмақтарды іздеу.</p>
<h3>Тапсырмаға қарай loss</h3>
<table>
<tr><th>Тапсырма</th><th>Шығыс activation</th><th>Loss</th><th>PyTorch</th></tr>
<tr><td>Regression (пәтер бағасы)</td><td>жоқ (сызықтық)</td><td>MSE</td><td><code>nn.MSELoss</code></td></tr>
<tr><td>Екі класс (churn)</td><td>sigmoid</td><td>binary cross-entropy</td><td><code>nn.BCEWithLogitsLoss</code></td></tr>
<tr><td>Көп класс (сурет: мысық/ит/құс)</td><td>softmax</td><td>cross-entropy</td><td><code>nn.CrossEntropyLoss</code></td></tr>
</table>
<h3>Binary cross-entropy</h3>
<pre><code>BCE = −mean( y·log(p) + (1 − y)·log(1 − p) )</code></pre>
<p>Мағынасы: егер нақты жауап y = 1 болса, тек −log(p) қалады. Модель p = 0.9 десе, loss = 0.105 (кішкентай). p = 0.1 десе, loss = 2.303 (үлкен). Яғни сенімді түрде қате болжам қатты жазаланады. Accuracy мұны көрмейді: 0.51 мен 0.99 оған бірдей «дұрыс».</p>
<h3>Қадамдап мысал</h3>
<p>Үш абонент: y = [1, 0, 1], модель ықтималдықтары p = [0.8, 0.3, 0.6].</p>
<ol>
<li>1-абонент: −log(0.8) = 0.223</li>
<li>2-абонент: −log(1 − 0.3) = −log(0.7) = 0.357</li>
<li>3-абонент: −log(0.6) = 0.511</li>
<li>Орташасы: (0.223 + 0.357 + 0.511) / 3 ≈ 0.364</li>
</ol>
<pre><code>import numpy as np
y = np.array([1, 0, 1]); p = np.array([0.8, 0.3, 0.6])
print(-np.mean(y*np.log(p) + (1-y)*np.log(1-p)))   # 0.364</code></pre>
<h3>Неге accuracy-ді тікелей азайтпаймыз?</h3>
<p>Gradient descent-ке loss-тың <b>тегіс</b> өзгеруі керек: салмақты сәл өзгерткенде loss та сәл өзгеруі тиіс. Accuracy баспалдақ сияқты секіреді, оның градиенті барлық жерде нөл. Сондықтан үйретуде cross-entropy, ал есепте бизнеске accuracy, recall, ₸ көрсетеміз.</p>
<div class="tip">p = 0 немесе 1 болғанда log(0) = −∞. Практикада p-ны <code>np.clip(p, 1e-7, 1 - 1e-7)</code> арқылы шектейді. PyTorch-та <code>BCEWithLogitsLoss</code> мұны ішінде өзі шешеді, сондықтан оған sigmoid-қа дейінгі сан (logit) беріледі.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Классификацияға MSE қолдану: жұмыс істейді, бірақ баяу үйренеді.</li>
<li><code>CrossEntropyLoss</code>-қа softmax-тан өткен ықтималдық беру: ол logit күтеді, softmax ішінде бар.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>mse(y, pred)</code> және <code>bce(y, p)</code> функцияларын жазыңыз. <code>bce</code> ішінде <code>p</code>-ны <code>np.clip(p, 1e-7, 1 - 1e-7)</code> арқылы шектеңіз. Мысалдағы абоненттер үшін <code>loss = bce(y, p)</code> есептеңіз.', starter: NP + P`y = np.array([1, 0, 1])
p = np.array([0.8, 0.3, 0.6])

def mse(y, pred):
    return 0

def bce(y, p):
    return 0

loss = bce(y, p)
print(loss)
`, solution: NP + P`y = np.array([1, 0, 1])
p = np.array([0.8, 0.3, 0.6])

def mse(y, pred):
    return np.mean((y - pred) ** 2)

def bce(y, p):
    p = np.clip(p, 1e-7, 1 - 1e-7)
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

loss = bce(y, p)
print(loss)
`, check: { tests: P`import numpy as _np
assert abs(mse(_np.array([1.0, 2.0]), _np.array([2.0, 4.0])) - 2.5) < 1e-9, 'mse = mean((y - pred)**2): [1,2] мен [2,4] үшін 2.5'
assert abs(loss - 0.3635) < 1e-3, f'loss ≈ 0.364 болуы керек, сізде {loss}'
_v = bce(_np.array([1, 0]), _np.array([1.0, 0.0]))
assert _np.isfinite(_v) and _v < 1e-5, 'p = 0 немесе 1 болғанда nan/inf шықпауы керек: np.clip қолданыңыз'` }, hints: ['<code>np.mean((y - pred) ** 2)</code>', '<code>-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))</code>'] },
          { type: 'number', xp: 10, prompt: 'Абонент шынымен кетті (y = 1), модель оған p = 0.1 берді. Осы бір мысалдың BCE loss-ы қанша? (натурал логарифм, үш таңба)', answer: 2.303, tol: 0.002, explain: '−log(0.1) ≈ 2.303. Сенімді қате болжам үлкен loss береді.' },
          { type: 'quiz', xp: 10, prompt: 'Модель суреттерді 5 санатқа бөледі (тек біреуі дұрыс). Қандай шығыс және loss?', options: ['ReLU + MSE', 'sigmoid + BCE әр класқа бөлек', 'softmax + cross-entropy', 'Шығыссыз + MAE'], answer: 2, explain: 'Бір дұрыс жауапты көп класты тапсырма: softmax ықтималдықтары және cross-entropy. PyTorch-та nn.CrossEntropyLoss logit алып, softmax-ты ішінде жасайды.' }
        ]
      },
      {
        id: 'dl-4', title: 'Gradient descent және backpropagation', minutes: 18,
        body: `
<p>Loss бар, енді оны азайту керек. <b>Gradient descent</b>: әр салмақ үшін «оны сәл үлкейтсем, loss қалай өзгереді?» деген сұрақтың жауабын (туынды, градиент) табамыз да, салмақты қарсы бағытқа жылжытамыз.</p>
<pre><code>w = w − lr · ∂loss/∂w</code></pre>
<p><code>lr</code> (learning rate) — қадам өлшемі. Тым кіші болса, үйрету өте баяу; тым үлкен болса, loss секіріп, тіпті өсіп кетеді.</p>
<h3>Backpropagation — chain rule</h3>
<p>Желіде loss салмаққа тікелей емес, бірнеше қадам арқылы байланысты: w → z → p → loss. Туындыны <b>chain rule</b> бойынша көбейтіп табамыз:</p>
<pre><code>∂loss/∂w = ∂loss/∂p · ∂p/∂z · ∂z/∂w</code></pre>
<p>Backpropagation — осы көбейтінділерді шығыстан кіріске қарай, қабат-қабатымен есептеу. Әр қабат келесі қабаттан келген градиентті алып, оны өз туындысына көбейтеді де, артқа жібереді.</p>
<h3>Қадамдап мысал: бір sigmoid нейрон + BCE</h3>
<p>Sigmoid пен BCE бірге өте әдемі қысқарады: <code>∂loss/∂z = p − y</code>. Сондықтан n мысал үшін:</p>
<pre><code>p  = sigmoid(X @ w + b)
dz = (p - y) / n          # әр мысалдың «қатесі»
dw = X.T @ dz             # әр салмаққа
db = dz.sum()
w -= lr * dw;  b -= lr * db</code></pre>
<p>Мысал: бір абонент x = [1, 2], y = 1, w = [0, 0], b = 0. Онда z = 0, p = 0.5, dz = −0.5, dw = [−0.5, −1.0]. lr = 0.1 болса, жаңа w = [0.05, 0.1]: модель осы абонентке жоғарырақ ықтималдық бере бастайды.</p>
<h3>Градиентті тексеру</h3>
<p>Backprop-та қате жіберу оңай. Оны <b>сандық градиентпен</b> тексереді: салмақты ε-ға өзгертіп, loss айырмасын бөлеміз:</p>
<pre><code>(loss(w + ε) − loss(w − ε)) / (2ε)</code></pre>
<p>Бұл баяу (әр салмақ үшін екі forward), бірақ сенімді. Екі нәтиже 1e-6 дәлдікпен сәйкес келсе, backprop дұрыс. PyTorch-та мұны <code>autograd</code> автоматты жасайды, бірақ идеяны білу дебагқа көмектеседі.</p>
<div class="tip">Туынды көп қолданылатын үш функция: sigmoid′ = p(1 − p), tanh′ = 1 − h², ReLU′ = 1 (z &gt; 0 болса), әйтпесе 0.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Градиентті <code>n</code>-ге бөлмеу: batch үлкейген сайын қадам да үлкейіп, үйрету шашырайды.</li>
<li>Салмақты градиент бағытымен жылжыту (<code>+=</code>): loss өседі.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Бір sigmoid нейронды gradient descent-пен бір қадам жаңартыңыз. <code>p</code>, <code>dw</code>, <code>db</code> есептеп, <code>lr = 0.5</code> арқылы <code>w</code> мен <code>b</code>-ны жаңартыңыз. Жаңартудан кейінгі loss <code>loss_after</code> бұрынғы <code>loss_before</code>-дан аз болуы керек.', starter: NP + P`X = np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]])
y = np.array([1, 0, 1, 0])
w = np.array([0.1, -0.2])
b = 0.0
lr = 0.5

def bce(y, p):
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

p = 1 / (1 + np.exp(-(X @ w + b)))
loss_before = bce(y, p)
dw = np.zeros(2)
db = 0.0
w = w - lr * dw
b = b - lr * db
loss_after = bce(y, 1 / (1 + np.exp(-(X @ w + b))))
print(loss_before, loss_after)
`, solution: NP + P`X = np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]])
y = np.array([1, 0, 1, 0])
w = np.array([0.1, -0.2])
b = 0.0
lr = 0.5

def bce(y, p):
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

p = 1 / (1 + np.exp(-(X @ w + b)))
loss_before = bce(y, p)
dz = (p - y) / len(X)
dw = X.T @ dz
db = dz.sum()
w = w - lr * dw
b = b - lr * db
loss_after = bce(y, 1 / (1 + np.exp(-(X @ w + b))))
print(loss_before, loss_after)
`, check: { tests: P`import numpy as _np
_X = _np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]]); _y = _np.array([1, 0, 1, 0])
_w = _np.array([0.1, -0.2]); _p = 1 / (1 + _np.exp(-(_X @ _w)))
_dz = (_p - _y) / 4
assert _np.allclose(dw, _X.T @ _dz), 'dw = X.T @ ((p - y) / n)'
assert abs(float(db) - _dz.sum()) < 1e-9, 'db = ((p - y) / n).sum()'
assert _np.allclose(w, _w - 0.5 * (_X.T @ _dz)), 'w = w - lr * dw'
assert loss_after < loss_before, 'Бір қадамнан кейін loss азаюы керек'` }, hints: ['<code>dz = (p - y) / len(X)</code>', '<code>dw = X.T @ dz</code>, <code>db = dz.sum()</code>'] },
          { type: 'python', xp: 20, prompt: 'Сандық градиентпен тексеру. <code>num_grad(f, w, eps=1e-5)</code> функциясын жазыңыз: <code>w</code>-ның әр элементі үшін <code>(f(w + ε·e_i) − f(w − ε·e_i)) / (2ε)</code> есептеп, массив қайтарсын. Сосын <code>g_num = num_grad(loss_fn, w)</code> есептеңіз: ол аналитикалық <code>g_an</code>-мен сәйкес келуі керек.', starter: NP + P`X = np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5]])
y = np.array([1, 0, 1])
w = np.array([0.3, -0.1])

def loss_fn(w):
    p = 1 / (1 + np.exp(-(X @ w)))
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

p = 1 / (1 + np.exp(-(X @ w)))
g_an = X.T @ ((p - y) / len(X))

def num_grad(f, w, eps=1e-5):
    g = np.zeros_like(w)
    return g

g_num = num_grad(loss_fn, w)
print(g_an, g_num)
`, solution: NP + P`X = np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5]])
y = np.array([1, 0, 1])
w = np.array([0.3, -0.1])

def loss_fn(w):
    p = 1 / (1 + np.exp(-(X @ w)))
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

p = 1 / (1 + np.exp(-(X @ w)))
g_an = X.T @ ((p - y) / len(X))

def num_grad(f, w, eps=1e-5):
    g = np.zeros_like(w)
    for i in range(len(w)):
        e = np.zeros_like(w)
        e[i] = eps
        g[i] = (f(w + e) - f(w - e)) / (2 * eps)
    return g

g_num = num_grad(loss_fn, w)
print(g_an, g_num)
`, check: { tests: P`import numpy as _np
assert _np.allclose(g_num, g_an, atol=1e-6), f'g_num g_an-мен сәйкес келуі керек: {g_num} және {g_an}'
assert _np.allclose(num_grad(lambda v: (v ** 2).sum(), _np.array([1.0, -2.0, 3.0])), [2.0, -4.0, 6.0], atol=1e-4), 'num_grad кез келген f үшін жұмыс істеуі керек: x² туындысы 2x'` }, hints: ['Әр <code>i</code> үшін <code>e = np.zeros_like(w); e[i] = eps</code>', '<code>g[i] = (f(w + e) - f(w - e)) / (2 * eps)</code>'] },
          { type: 'number', xp: 10, prompt: 'Chain rule: y = (3x + 1)². x = 1 нүктесінде dy/dx қанша?', answer: 24, tol: 0.001, explain: 'Ішкі u = 3x + 1 = 4. dy/du = 2u = 8, du/dx = 3. Көбейтінді: 8 · 3 = 24.' },
          { type: 'quiz', xp: 10, prompt: 'Үйрету кезінде loss әр эпохада өсіп, кейін <code>nan</code> болды. Ең ықтимал себебі?', options: ['Learning rate тым үлкен', 'Learning rate тым кіші', 'Дерек тым аз', 'Activation ReLU'], answer: 0, explain: 'Тым үлкен қадам минимумнан асып кетеді, салмақтар шексіз өседі, сосын exp/log nan береді. lr-ды 3–10 есе азайтып көріңіз.' }
        ]
      },
      {
        id: 'dl-5', title: 'Практика: XOR-ды шешетін желіні үйрету', minutes: 20,
        body: `
<p>XOR — классикалық тест: кірістер бірдей болса 0, әртүрлі болса 1. Төрт нүктені бір түзумен бөлу мүмкін емес, сондықтан logistic regression оны шеше алмайды. Бір жасырын қабат жеткілікті — енді мұны өз көзімізбен көреміз.</p>
<table>
<tr><th>x1</th><th>x2</th><th>y</th></tr>
<tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr>
</table>
<h3>Желі: 2 → 4 (tanh) → 1 (sigmoid)</h3>
<p>Толық training loop төрт қадамнан тұрады, және бұл қадамдар PyTorch-та да дәл осындай:</p>
<ol>
<li><b>Forward</b>: <code>h = tanh(X @ W1 + b1)</code>, <code>p = sigmoid(h @ W2 + b2)</code>.</li>
<li><b>Loss</b>: BCE.</li>
<li><b>Backward</b> (шығыстан кіріске):
<pre><code>dz2 = (p - y) / n                 # шығыс қабат
dW2 = h.T @ dz2;  db2 = dz2.sum(axis=0, keepdims=True)
dh  = dz2 @ W2.T                  # градиент жасырын қабатқа өтеді
dz1 = dh * (1 - h**2)             # tanh туындысы
dW1 = X.T @ dz1;  db1 = dz1.sum(axis=0, keepdims=True)</code></pre></li>
<li><b>Update</b>: <code>W1 -= lr * dW1</code> және қалғандары.</li>
</ol>
<p>Назар аударыңыз: <code>dW2</code> формуласы бір нейрондағы <code>X.T @ dz</code>-пен бірдей, тек X-тің орнында жасырын қабат <code>h</code>. Әр қабат «кірісі.T @ өз градиенті».</p>
<h3>Неге кездейсоқ бастапқы салмақ?</h3>
<p>Барлық салмақ 0 болса, жасырын нейрондардың бәрі бірдей есептеп, бірдей градиент алады да, мәңгі бірдей болып қалады. Кездейсоқ инициализация симметрияны бұзады. Seed-ті бекітсек (<code>default_rng(42)</code>), нәтиже қайталанады. Кейде нашар seed-те желі «жергілікті» шешімге тұрып қалады (мысалы, 0.5 болжап): бұл кішкентай желілерде қалыпты жағдай.</p>
<div class="tip">Loss-ты тізімге жинап, басы мен соңын салыстырыңыз. Loss азаймаса, ең алдымен backward-тағы таңбаларды және пішіндерді тексеріңіз.</div>
<h3>Нәтиже</h3>
<p>2000 эпохадан кейін желі шамамен [0.00, 1.00, 1.00, 0.00] береді: XOR шешілді. Жасырын қабат кірістерді жаңа кеңістікке «бүктеп», ол жерде нүктелер бір түзумен бөлінетін болды. Deep learning-тің бүкіл идеясы осы: <b>қабаттар пайдалы белгілерді өздері үйренеді</b>.</p>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Training loop дайын, тек backward бөлігі жоқ (градиенттер нөл). <code>dz2</code>, <code>dW2</code>, <code>db2</code>, <code>dh</code>, <code>dz1</code>, <code>dW1</code>, <code>db1</code>-ды жазыңыз. Үйретуден кейін соңғы loss 0.05-тен аз болып, <code>preds</code> = [0, 1, 1, 0] болуы керек.', starter: NP + P`X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
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
    # backward: осы жолдарды түзетіңіз
    dW2 = np.zeros_like(W2); db2 = np.zeros_like(b2)
    dW1 = np.zeros_like(W1); db1 = np.zeros_like(b1)
    # update
    W1 -= lr * dW1; b1 -= lr * db1
    W2 -= lr * dW2; b2 -= lr * db2

preds = (p > 0.5).astype(int).ravel()
print(losses[0], losses[-1], preds)
`, solution: NP + P`X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
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
    # backward
    dz2 = (p - y) / len(X)
    dW2 = h.T @ dz2; db2 = dz2.sum(axis=0, keepdims=True)
    dh = dz2 @ W2.T
    dz1 = dh * (1 - h ** 2)
    dW1 = X.T @ dz1; db1 = dz1.sum(axis=0, keepdims=True)
    # update
    W1 -= lr * dW1; b1 -= lr * db1
    W2 -= lr * dW2; b2 -= lr * db2

preds = (p > 0.5).astype(int).ravel()
print(losses[0], losses[-1], preds)
`, check: { tests: P`import numpy as _np
assert len(losses) == 2000, 'Цикл 2000 эпоха жүруі керек'
assert losses[-1] < 0.05, f'Соңғы loss 0.05-тен аз болуы керек, сізде {losses[-1]:.4f}. Backward формулаларын тексеріңіз'
assert list(_np.asarray(preds).ravel()) == [0, 1, 1, 0], f'preds = [0, 1, 1, 0] болуы керек, сізде {preds}'
assert W1.shape == (2, 4) and W2.shape == (4, 1), 'Салмақтардың пішіні өзгермеуі керек'`, mustInclude: ['W2.T'] }, hints: ['Шығыс: <code>dz2 = (p - y) / len(X)</code>, <code>dW2 = h.T @ dz2</code>', 'Жасырын: <code>dz1 = (dz2 @ W2.T) * (1 - h ** 2)</code>, <code>dW1 = X.T @ dz1</code>'] },
          { type: 'python', xp: 20, prompt: 'Learning rate тәжірибесі. Үйретуді <code>train(lr)</code> функциясына орап, соңғы loss-ты қайтарыңыз. <code>lr</code> = 0.01, 0.1, 1.0 үшін нәтижелерді <code>results</code> сөздігіне (<code>{lr: loss}</code>) жазып, ең аз loss берген мәнді <code>best_lr</code>-ге сақтаңыз.', starter: NP + P`X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
y = np.array([[0], [1], [1], [0]], dtype=float)

def train(lr, epochs=1500):
    rng = np.random.default_rng(42)
    W1 = rng.normal(0, 1, (2, 4)); b1 = np.zeros((1, 4))
    W2 = rng.normal(0, 1, (4, 1)); b2 = np.zeros((1, 1))
    for epoch in range(epochs):
        h = np.tanh(X @ W1 + b1)
        p = 1 / (1 + np.exp(-(h @ W2 + b2)))
        dz2 = (p - y) / len(X)
        dz1 = (dz2 @ W2.T) * (1 - h ** 2)
        W2 -= lr * h.T @ dz2; b2 -= lr * dz2.sum(axis=0, keepdims=True)
        W1 -= lr * X.T @ dz1; b1 -= lr * dz1.sum(axis=0, keepdims=True)
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

results = {}
best_lr = None
`, solution: NP + P`X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
y = np.array([[0], [1], [1], [0]], dtype=float)

def train(lr, epochs=1500):
    rng = np.random.default_rng(42)
    W1 = rng.normal(0, 1, (2, 4)); b1 = np.zeros((1, 4))
    W2 = rng.normal(0, 1, (4, 1)); b2 = np.zeros((1, 1))
    for epoch in range(epochs):
        h = np.tanh(X @ W1 + b1)
        p = 1 / (1 + np.exp(-(h @ W2 + b2)))
        dz2 = (p - y) / len(X)
        dz1 = (dz2 @ W2.T) * (1 - h ** 2)
        W2 -= lr * h.T @ dz2; b2 -= lr * dz2.sum(axis=0, keepdims=True)
        W1 -= lr * X.T @ dz1; b1 -= lr * dz1.sum(axis=0, keepdims=True)
    return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))

results = {}
for lr in [0.01, 0.1, 1.0]:
    results[lr] = train(lr)
best_lr = min(results, key=results.get)
print(results, best_lr)
`, check: { tests: P`assert set(results) == {0.01, 0.1, 1.0}, 'results-та үш кілт болуы керек: 0.01, 0.1, 1.0'
assert results[0.01] > 0.3, 'lr = 0.01 кезінде 1500 эпохада желі әлі үйренбеген болуы керек: train(0.01) шақырдыңыз ба?'
assert best_lr == 1.0, f'best_lr = 1.0 болуы керек, сізде {best_lr}'` }, hints: ['<code>for lr in [0.01, 0.1, 1.0]: results[lr] = train(lr)</code>', '<code>best_lr = min(results, key=results.get)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Неге барлық салмақты нөлмен бастауға болмайды?', options: ['numpy нөлге көбейте алмайды', 'Жасырын нейрондар бірдей градиент алып, бірдей болып қала береді', 'Loss бірден nan болады', 'Bias жұмыс істемейді'], answer: 1, explain: 'Симметрия бұзылмайды: барлық жасырын нейрон бірдей есептейді, бірдей жаңарады, сондықтан 4 нейрон іс жүзінде 1 нейрон болып қалады.' }
        ]
      },
      {
        id: 'dl-6', title: 'Training loop: epochs, batches, overfitting', minutes: 15,
        body: `
<p>XOR-да 4 мысал болды, әр қадамда бәрін қолдандық. Нақты деректе мыңдаған, миллиондаған мысал бар, сондықтан training loop бірнеше ұғымға сүйенеді.</p>
<h3>Негізгі терминдер</h3>
<ul>
<li><b>Batch</b> (mini-batch) — бір gradient қадамына алынатын мысалдар тобы, әдетте 32–256. Шағын batch градиентті «шулы» етеді, бірақ жадқа сыяды және жиі жаңартады.</li>
<li><b>Step</b> (iteration) — бір batch бойынша бір жаңарту.</li>
<li><b>Epoch</b> — бүкіл train деректі бір рет толық өту. Бір эпохадағы қадам саны = ceil(N / batch_size).</li>
<li><b>Learning rate</b> — қадам өлшемі; көбіне 1e-3 (Adam) немесе 0.01–0.1 (SGD). Кейде уақыт өте азайтады (scheduler).</li>
</ul>
<h3>Қадамдап мысал</h3>
<p>Алматыдағы дүкеннің 10 000 тауар суреті, batch_size = 64:</p>
<ol>
<li>Бір эпохада ceil(10000 / 64) = 157 қадам (соңғы batch-та 16 сурет).</li>
<li>20 эпоха — 3 140 қадам.</li>
<li>Әр эпохаға дейін дерек араластырылады (shuffle), әйтпесе batch-тар әр жолы бірдей болып, модель реттілікті жаттап алуы мүмкін.</li>
</ol>
<h3>Overfitting және early stopping</h3>
<p>Желіде параметр көп, сондықтан ол train деректі жаттап алуы оңай. Белгісі: train loss төмендей береді, ал validation loss белгілі бір эпохадан кейін <b>өсе бастайды</b>. Қарсы құралдар:</p>
<ul>
<li><b>Early stopping</b>: validation loss <code>patience</code> эпоха бойы жақсармаса, тоқтап, ең жақсы эпохадағы салмақтарды қайтарамыз.</li>
<li><b>Dropout</b>: үйретуде нейрондардың бір бөлігін кездейсоқ өшіру.</li>
<li><b>Weight decay</b> (L2), көбірек дерек, <b>data augmentation</b> (суретті бұру, қию).</li>
</ul>
<pre><code>val = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47]
# ең жақсысы 3-эпохада (0-ден санағанда), patience = 3:
# 4, 5, 6 эпохаларда жақсару жоқ → 6-эпохадан кейін тоқтаймыз</code></pre>
<div class="tip">Validation жиынын тек тоқтау мен hyperparameter таңдауға қолданыңыз. Соңғы бағаны бөлек test жиынында бір рет есептеңіз — M5 модуліндегі ереже deep learning-те де өзгермейді.</div>
<h3>Жиі қателер</h3>
<ul>
<li>Соңғы эпохадағы модельді сақтау, ал ең жақсысы ертерек болған.</li>
<li>Validation деректі де араластырып, train-ге қосып жіберу.</li>
<li>Эпохалар санын көбейте беру: overfitting-ке тура жол.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>make_batches(n, batch_size)</code> функциясын жазыңыз: ол <code>(start, end)</code> жұптарының тізімін қайтарсын, мысалы <code>make_batches(10, 4)</code> → <code>[(0, 4), (4, 8), (8, 10)]</code>. <code>steps = len(make_batches(10000, 64))</code> есептеңіз.', starter: P`def make_batches(n, batch_size):
    return []

steps = len(make_batches(10000, 64))
print(steps)
`, solution: P`def make_batches(n, batch_size):
    return [(s, min(s + batch_size, n)) for s in range(0, n, batch_size)]

steps = len(make_batches(10000, 64))
print(steps)
`, check: { tests: P`assert make_batches(10, 4) == [(0, 4), (4, 8), (8, 10)], f'make_batches(10, 4) = [(0, 4), (4, 8), (8, 10)] болуы керек, сізде {make_batches(10, 4)}'
assert make_batches(8, 4) == [(0, 4), (4, 8)], 'Бос batch болмауы керек: make_batches(8, 4) = [(0, 4), (4, 8)]'
assert steps == 157, f'steps = 157 болуы керек, сізде {steps}'` }, hints: ['<code>range(0, n, batch_size)</code> әр batch-тың басын береді', 'Соңы: <code>min(s + batch_size, n)</code>'] },
          { type: 'python', xp: 20, prompt: 'Early stopping. <code>early_stop(val_losses, patience)</code> функциясы <code>(best_epoch, stop_epoch)</code> қайтарсын: <code>best_epoch</code> — ең аз loss эпохасы (0-ден), <code>stop_epoch</code> — соңғы жақсарудан кейін <code>patience</code> эпоха өткен эпоха. Егер тоқтау болмаса, <code>stop_epoch = len(val_losses) - 1</code>.', starter: P`def early_stop(val_losses, patience):
    return 0, 0

val = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47, 0.41]
print(early_stop(val, 3))
`, solution: P`def early_stop(val_losses, patience):
    best, best_epoch, wait = float('inf'), 0, 0
    for epoch, v in enumerate(val_losses):
        if v < best:
            best, best_epoch, wait = v, epoch, 0
        else:
            wait += 1
            if wait >= patience:
                return best_epoch, epoch
    return best_epoch, len(val_losses) - 1

val = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47, 0.41]
print(early_stop(val, 3))
`, check: { tests: P`_v = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47, 0.41]
assert tuple(early_stop(_v, 3)) == (3, 6), f'patience=3: (3, 6) болуы керек, сізде {early_stop(_v, 3)}. 7-эпохадағы 0.41-ге дейін тоқтаймыз'
assert tuple(early_stop(_v, 5)) == (7, 7), f'patience=5: тоқтау жоқ, (7, 7) болуы керек, сізде {early_stop(_v, 5)}'
assert tuple(early_stop([0.5, 0.4, 0.3], 1)) == (2, 2), 'Үздіксіз жақсарса: (2, 2)'` }, hints: ['<code>best</code>, <code>best_epoch</code> және <code>wait</code> (жақсармаған эпохалар саны) сақтаңыз', 'Жақсарса <code>wait = 0</code>, әйтпесе <code>wait += 1</code>; <code>wait >= patience</code> болса қайтарыңыз'] },
          { type: 'number', xp: 10, prompt: '50 000 мысал, batch_size = 128, 10 эпоха. Барлығы неше gradient қадамы (step) болады?', answer: 3910, tol: 0, explain: 'ceil(50000 / 128) = 391 қадам эпохасына; 391 · 10 = 3910.' },
          { type: 'quiz', xp: 10, prompt: 'Train loss 15 эпоха бойы төмендеп келеді, ал validation loss 6-эпохадан бастап өсіп келеді. Не істейміз?', options: ['Эпохаларды 50-ге көбейтеміз', '6-эпоха шамасындағы салмақтарды аламыз және регуляризация қосамыз', 'Learning rate-ті 10 есе көбейтеміз', 'Validation жиынын train-ге қосамыз'], answer: 1, explain: 'Бұл overfitting. Early stopping ең жақсы validation эпохасын сақтайды; dropout, weight decay немесе көбірек дерек мәселенің өзін азайтады.' }
        ]
      },
      {
        id: 'dl-7', title: 'PyTorch: numpy қадамдарынан torch-қа', minutes: 18,
        body: `
<p><b>PyTorch</b> — deep learning-тің ең танымал кітапханасы. Ол біз numpy-мен қолмен жазғанның бәрін жасайды, бірақ екі артықшылығы бар: <b>autograd</b> (backward-ты өзі есептейді) және <b>GPU</b>. Браузердегі Python-да torch жоқ, сондықтан кодты оқып, numpy аналогтарымен салыстырамыз. Өз компьютеріңізде <code>pip install torch</code> арқылы іске қосуға болады.</p>
<h3>Tensor</h3>
<pre><code>import torch
x = torch.tensor([[0., 1.], [1., 0.]])   # numpy array сияқты
x.shape, x @ x.T, x.mean()               # бірдей операциялар
w = torch.randn(2, 4, requires_grad=True) # градиентін бақылау керек
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
        return self.out(h)               # logit, sigmoid жоқ

model = XorNet()
loss_fn = nn.BCEWithLogitsLoss()         # sigmoid + BCE бірге
optimizer = torch.optim.SGD(model.parameters(), lr=1.0)</code></pre>
<h3>Стандарт training loop</h3>
<pre><code>for epoch in range(2000):
    for xb, yb in train_loader:          # DataLoader batch береді
        optimizer.zero_grad()            # ескі градиенттерді тазалау
        logits = model(xb)               # forward
        loss = loss_fn(logits, yb)       # loss
        loss.backward()                  # backprop: барлық .grad толады
        optimizer.step()                 # W -= lr * W.grad

model.eval()                             # dropout/batchnorm инференс режимі
with torch.no_grad():                    # градиент есептемейміз
    probs = torch.sigmoid(model(X_test))</code></pre>
<h3>numpy ↔ PyTorch сәйкестігі</h3>
<table>
<tr><th>numpy (dl-5)</th><th>PyTorch</th></tr>
<tr><td><code>W1 = rng.normal(...)</code></td><td><code>nn.Linear(2, 4)</code></td></tr>
<tr><td><code>h = np.tanh(X @ W1 + b1)</code></td><td><code>model(x)</code> → <code>forward</code></td></tr>
<tr><td>BCE формуласы</td><td><code>nn.BCEWithLogitsLoss()</code></td></tr>
<tr><td><code>dz2 … dW1, db1</code> (бүкіл backward)</td><td><code>loss.backward()</code></td></tr>
<tr><td><code>W1 -= lr * dW1</code> …</td><td><code>optimizer.step()</code></td></tr>
<tr><td>әр эпохада градиентті қайта есептеу</td><td><code>optimizer.zero_grad()</code></td></tr>
</table>
<div class="tip">PyTorch-та градиенттер <b>жинақталады</b> (<code>+=</code>): <code>zero_grad()</code>-ты ұмытсаңыз, әр қадам алдыңғылардың градиентін қосып, үйрету бұзылады. Бұл — жаңадан бастағандардың №1 қатесі.</div>
<h3>Optimizer-лер</h3>
<p><code>SGD</code> — біз қолмен жазған ереже. <code>Adam</code> — әр параметрге бейімделетін қадам; көп жағдайда <code>lr=1e-3</code>-пен бірден жақсы жұмыс істейді, сондықтан әдепкі таңдау.</p>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Төменде <code>nn.Linear</code>-ға ұқсас кішкентай <code>Linear</code> класы бар: оның градиенттері PyTorch сияқты <b>жинақталады</b>. <code>SGD</code> класын жазыңыз (<code>zero_grad()</code> әр <code>p.grad</code>-ты нөлдейді, <code>step()</code> әр <code>p.value</code>-ны <code>lr * p.grad</code>-қа азайтады). Сосын стандарт loop-ты 200 қадам жүргізіңіз: zero_grad → forward → loss → backward → step. Модель y = 2x + 1-ді табуы керек.', starter: NP + P`class Param:
    def __init__(self, value):
        self.value = value
        self.grad = np.zeros_like(value)

class Linear:
    def __init__(self):
        self.w = Param(np.array([0.0]))
        self.b = Param(np.array([0.0]))
    def parameters(self):
        return [self.w, self.b]
    def __call__(self, x):
        self.x = x
        return x * self.w.value + self.b.value
    def backward(self, grad_out):
        self.w.grad += (grad_out * self.x).sum()
        self.b.grad += grad_out.sum()

class SGD:
    def __init__(self, params, lr):
        self.params = params
        self.lr = lr
    def zero_grad(self):
        pass
    def step(self):
        pass

x = np.linspace(-1, 1, 20)
y = 2 * x + 1
model = Linear()
optimizer = SGD(model.parameters(), lr=0.1)
for step in range(200):
    pred = model(x)
    loss = np.mean((pred - y) ** 2)
    model.backward(2 * (pred - y) / len(x))

print(model.w.value, model.b.value, loss)
`, solution: NP + P`class Param:
    def __init__(self, value):
        self.value = value
        self.grad = np.zeros_like(value)

class Linear:
    def __init__(self):
        self.w = Param(np.array([0.0]))
        self.b = Param(np.array([0.0]))
    def parameters(self):
        return [self.w, self.b]
    def __call__(self, x):
        self.x = x
        return x * self.w.value + self.b.value
    def backward(self, grad_out):
        self.w.grad += (grad_out * self.x).sum()
        self.b.grad += grad_out.sum()

class SGD:
    def __init__(self, params, lr):
        self.params = params
        self.lr = lr
    def zero_grad(self):
        for p in self.params:
            p.grad = np.zeros_like(p.value)
    def step(self):
        for p in self.params:
            p.value -= self.lr * p.grad

x = np.linspace(-1, 1, 20)
y = 2 * x + 1
model = Linear()
optimizer = SGD(model.parameters(), lr=0.1)
for step in range(200):
    optimizer.zero_grad()
    pred = model(x)
    loss = np.mean((pred - y) ** 2)
    model.backward(2 * (pred - y) / len(x))
    optimizer.step()

print(model.w.value, model.b.value, loss)
`, check: { tests: P`import numpy as _np
_p = Param(_np.array([1.0])); _p.grad = _np.array([2.0])
_o = SGD([_p], lr=0.5); _o.step()
assert abs(float(_p.value[0])) < 1e-9, 'step(): value -= lr * grad (1 - 0.5·2 = 0)'
_o.zero_grad()
assert float(_p.grad[0]) == 0.0, 'zero_grad() градиентті нөлдеуі керек'
assert abs(float(model.w.value[0]) - 2) < 0.05 and abs(float(model.b.value[0]) - 1) < 0.05, f'Модель w ≈ 2, b ≈ 1 табуы керек, сізде w={model.w.value}, b={model.b.value}. Loop-та zero_grad() мен step() бар ма?'`, mustInclude: ['optimizer.zero_grad()', 'optimizer.step()'] }, hints: ['<code>zero_grad</code>: <code>for p in self.params: p.grad = np.zeros_like(p.value)</code>', 'Loop басында <code>optimizer.zero_grad()</code>, соңында <code>optimizer.step()</code>'] },
          { type: 'quiz', xp: 10, prompt: 'numpy-дегі <code>dz2 = (p - y) / n; dW2 = h.T @ dz2; ... dW1 = X.T @ dz1</code> блогының PyTorch-тағы баламасы қайсы?', options: ['optimizer.step()', 'loss.backward()', 'model.eval()', 'optimizer.zero_grad()'], answer: 1, explain: 'loss.backward() autograd арқылы барлық параметрдің .grad-ын chain rule бойынша есептейді — біз қолмен жазған бүкіл backward.' },
          { type: 'quiz', xp: 10, prompt: '<code>W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2</code> жолдарының PyTorch баламасы?', options: ['loss.backward()', 'model(x)', 'optimizer.step()', 'torch.no_grad()'], answer: 2, explain: 'optimizer.step() model.parameters()-тағы әр параметрді оның .grad-ы бойынша жаңартады (SGD үшін дәл осы формуламен).' },
          { type: 'quiz', xp: 10, prompt: 'Модель үйретілді, енді test деректе болжау керек. Қай екі жол дұрыс?', options: ['model.train() және loss.backward()', 'model.eval() және with torch.no_grad():', 'optimizer.zero_grad() және optimizer.step()', 'Ештеңе керек емес, model(X_test) жеткілікті'], answer: 1, explain: 'eval() dropout пен batchnorm-ды инференс режиміне қояды, no_grad() градиент графын құрмай, жад пен уақытты үнемдейді.' }
        ]
      },
      {
        id: 'dl-8', title: 'CNN интуициясы: convolution және pooling', minutes: 18,
        body: `
<p>Сурет — сандар кестесі: сұр түсті 28×28 сурет — 784 пиксель. Оны MLP-ге жай тізім етіп берсек, екі мәселе бар: параметр тым көп болады және модель «көрші пикселдер байланысты» екенін білмейді. <b>Convolutional neural network</b> (CNN) осы екеуін шешеді.</p>
<h3>Convolution</h3>
<p>Кішкентай <b>kernel</b> (сүзгі, мысалы 3×3) суреттің үстімен жылжиды. Әр орында kernel мен астындағы бөліктің элементтерін көбейтіп қосамыз — бір сан шығады. Нәтиже — <b>feature map</b>.</p>
<pre><code>img (5×5)            kernel (3×3)
0 0 0 9 9            1 0 -1
0 0 0 9 9            1 0 -1
0 0 0 9 9     *      1 0 -1
0 0 0 9 9
0 0 0 9 9
                     нәтиже (3×3):
                     0 -27 -27   ← тік шекара табылды
                     ...</code></pre>
<p>Сол жақ жоғарғы орын: барлық пиксель 0, нәтиже 0. Бір қадам оңға: бөліктің оң бағанында 9-дар, kernel оларды −1-ге көбейтеді: 3·(−9) = −27. Бұл kernel <b>тік шекараларды</b> табады. CNN-де kernel мәндерін біз жазбаймыз — желі оларды backprop арқылы өзі үйренеді: алғашқы қабаттар шекаралар мен түстерді, тереңдегілері көз, дөңгелек, әріп сияқты пішіндерді.</p>
<h3>Нәтиже өлшемі</h3>
<pre><code>out = (n − k + 2·padding) / stride + 1
5×5, k=3, padding=0, stride=1 → 3×3
28×28, k=3, padding=1 → 28×28 («same»)</code></pre>
<h3>Pooling</h3>
<p><b>Max pooling 2×2</b> feature map-ты 2×2 блоктарға бөліп, әр блоктан ең үлкенін алады. Өлшем екі есе кішірейеді, ал «белгі осы маңда бар ма?» деген ақпарат сақталады. Бұл есептеуді азайтады және кішкене жылжуларға төзімділік береді.</p>
<h3>Неге параметр аз?</h3>
<p>Бір kernel бүкіл суретте <b>ортақ</b> қолданылады (weight sharing). <code>nn.Conv2d(3, 16, kernel_size=3)</code>: 16 сүзгі, әрқайсысы 3 арна × 3 × 3 = 27 салмақ + 1 bias → 16·28 = 448 параметр. Ал 32×32×3 суретті 16 нейронды Linear қабатқа берсек: 3072·16 + 16 = 49 168.</p>
<pre><code>nn.Sequential(
    nn.Conv2d(1, 8, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),   # 28→14
    nn.Conv2d(8, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),  # 14→7
    nn.Flatten(), nn.Linear(16 * 7 * 7, 10))                     # 10 цифр</code></pre>
<div class="tip">Deep learning кітапханаларындағы «convolution» шын мәнінде cross-correlation: kernel аударылмайды. Біз де солай есептейміз.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>conv2d(img, k)</code> функциясын жазыңыз: padding жоқ, stride 1. Нәтиже пішіні <code>(H − kh + 1, W − kw + 1)</code>, әр элемент — <code>(img[i:i+kh, j:j+kw] * k).sum()</code>. Мысалдағы суретке тік шекара kernel-ін қолданып, нәтижені <code>fmap</code>-қа жазыңыз.', starter: NP + P`img = np.array([[0, 0, 0, 9, 9]] * 5, dtype=float)
k = np.array([[1, 0, -1]] * 3, dtype=float)

def conv2d(img, k):
    return img

fmap = conv2d(img, k)
print(fmap)
`, solution: NP + P`img = np.array([[0, 0, 0, 9, 9]] * 5, dtype=float)
k = np.array([[1, 0, -1]] * 3, dtype=float)

def conv2d(img, k):
    kh, kw = k.shape
    H, W = img.shape
    out = np.zeros((H - kh + 1, W - kw + 1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i, j] = (img[i:i + kh, j:j + kw] * k).sum()
    return out

fmap = conv2d(img, k)
print(fmap)
`, check: { tests: P`import numpy as _np
assert _np.shape(fmap) == (3, 3), f'fmap пішіні (3, 3) болуы керек, сізде {_np.shape(fmap)}'
assert _np.allclose(fmap, [[0, -27, -27]] * 3), f'fmap әр жолы [0, -27, -27] болуы керек, сізде {fmap}'
_r = _np.random.default_rng(3); _a = _r.normal(size=(6, 7)); _kk = _r.normal(size=(2, 3))
_ref = _np.array([[(_a[i:i+2, j:j+3] * _kk).sum() for j in range(5)] for i in range(5)])
assert _np.allclose(conv2d(_a, _kk), _ref), 'conv2d кез келген өлшемдегі сурет пен kernel үшін жұмыс істеуі керек'` }, hints: ['<code>out = np.zeros((H - kh + 1, W - kw + 1))</code>', 'Екі цикл: <code>out[i, j] = (img[i:i+kh, j:j+kw] * k).sum()</code>'] },
          { type: 'python', xp: 15, prompt: '<code>maxpool2(x)</code> жазыңыз: 2×2 блоктар, stride 2 (жұп өлшем деп есептеңіз). <code>pooled = maxpool2(fm)</code> есептеңіз.', starter: NP + P`fm = np.array([[1, 3, 2, 0],
               [4, 2, 1, 5],
               [0, 1, 7, 2],
               [3, 2, 1, 6]], dtype=float)

def maxpool2(x):
    return x

pooled = maxpool2(fm)
print(pooled)
`, solution: NP + P`fm = np.array([[1, 3, 2, 0],
               [4, 2, 1, 5],
               [0, 1, 7, 2],
               [3, 2, 1, 6]], dtype=float)

def maxpool2(x):
    H, W = x.shape
    out = np.zeros((H // 2, W // 2))
    for i in range(H // 2):
        for j in range(W // 2):
            out[i, j] = x[2 * i:2 * i + 2, 2 * j:2 * j + 2].max()
    return out

pooled = maxpool2(fm)
print(pooled)
`, check: { tests: P`import numpy as _np
assert _np.allclose(pooled, [[4, 5], [3, 7]]), f'pooled = [[4, 5], [3, 7]] болуы керек, сізде {pooled}'
_a = _np.arange(36, dtype=float).reshape(6, 6)
assert _np.allclose(maxpool2(_a), _a.reshape(3, 2, 3, 2).max(axis=(1, 3))), 'maxpool2 6×6 үшін де жұмыс істеуі керек'` }, hints: ['Нәтиже пішіні <code>(H // 2, W // 2)</code>', '<code>x[2*i:2*i+2, 2*j:2*j+2].max()</code>'] },
          { type: 'number', xp: 10, prompt: '<code>nn.Conv2d(3, 16, kernel_size=3)</code> қабатында неше параметр бар (bias-пен)?', answer: 448, tol: 0, explain: 'Әр сүзгі: 3 арна · 3 · 3 = 27 салмақ + 1 bias = 28. 16 сүзгі: 16 · 28 = 448.' },
          { type: 'number', xp: 10, prompt: '32×32 сурет, kernel 5×5, padding 0, stride 1. Feature map жағының өлшемі қанша?', answer: 28, tol: 0, explain: '(32 − 5 + 0) / 1 + 1 = 28.' }
        ]
      },
      {
        id: 'dl-9', title: 'Transfer learning және deep learning-ті қашан таңдау', minutes: 16,
        body: `
<p>ImageNet-те (14 млн сурет) ResNet-ті нөлден үйрету GPU-да бірнеше күн алады. Ал сізде, мысалы, қазақ тағамдарының 300 суреті (бешбармақ, бауырсақ, қуырдақ, манты, самса) бар. Нөлден үйретсек, желі бірден overfitting болады. Шешім — <b>transfer learning</b>: басқа үлкен деректе үйретілген желінің білімін қайта қолдану.</p>
<h3>Идея</h3>
<p>Үйретілген CNN-нің алғашқы қабаттары шекаралар, текстуралар, пішіндер сияқты <b>жалпы</b> белгілерді таниды — олар кез келген суретке пайдалы. Тек соңғы қабат (head) нақты 1000 ImageNet класына арналған. Сондықтан:</p>
<ol>
<li><b>Feature extraction</b>: backbone-ды «мұздатамыз» (freeze), тек жаңа head үйретеміз. Дерек аз болса (жүздеген мысал) — осы.</li>
<li><b>Fine-tuning</b>: head-тен кейін соңғы бір-екі блокты да кіші learning rate-пен үйретеміз. Дерек көбірек болса (мыңдаған) немесе домен алыс болса (рентген суреттері).</li>
</ol>
<pre><code>import torch.nn as nn
from torchvision import models

model = models.resnet18(weights='IMAGENET1K_V1')   # дайын салмақтар
for p in model.parameters():
    p.requires_grad = False                         # backbone мұздатылды
model.fc = nn.Linear(model.fc.in_features, 5)      # жаңа head: 5 тағам
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
# training loop dl-7-дегідей; суреттерді ImageNet сияқты нормалау керек</code></pre>
<p>Жаңа head-те тек 512·5 + 5 = 2 565 параметр үйретіледі, ал 11 млн-ның қалғаны өзгермейді. Сондықтан 300 сурет жеткілікті болады, ал үйрету CPU-да да бірнеше минут.</p>
<h3>Мәтінде де солай</h3>
<p>BERT, LLM сияқты тілдік модельдер — үлкен мәтін корпусында үйретілген backbone. Пікірлерді (мысалы, Kaspi-дегі тауар пікірлерін) жіктеу үшін олардың embedding-ін алып, үстіне кішкентай классификатор қою — сол transfer learning. Бұл GenAI модулінде толығырақ.</p>
<h3>Deep learning қашан керек емес</h3>
<table>
<tr><th>Дерек</th><th>Әдетте ең жақсы таңдау</th></tr>
<tr><td>Кесте (churn, пәтер бағасы), мыңдаған жол</td><td>Gradient boosting, logistic regression</td></tr>
<tr><td>Сурет, дыбыс, видео</td><td>CNN / pretrained модель</td></tr>
<tr><td>Мәтін</td><td>Pretrained тілдік модель, embeddings</td></tr>
</table>
<div class="tip">Кестелік деректе алдымен M5-тегі sklearn baseline-ды жасаңыз. Нейрон желісі оны жеңсе ғана, қосымша күрделілікке (GPU, ұзақ үйрету, түсіндіру қиындығы) тұрарлық.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Feature extraction-ды sklearn-мен модельдейміз. <code>extract</code> — «мұздатылған» backbone: оның салмақтары өзгермейді. Тек head-ті үйретіңіз: <code>head = LogisticRegression(max_iter=1000)</code>-ды <code>extract(X_train)</code> белгілерінде <code>fit</code> етіп, test accuracy-ді <code>head_acc</code>-қа жазыңыз. Салыстыру үшін шикі <code>X_train</code>-дағы logistic regression accuracy-ін <code>raw_acc</code>-қа жазыңыз.', starter: NP + P`from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(7)
X = rng.uniform(-1, 1, (200, 2))
y = ((X ** 2).sum(axis=1) < 0.4).astype(int)     # шеңбер ішінде ме?
X_train, X_test, y_train, y_test = X[:150], X[150:], y[:150], y[150:]

frng = np.random.default_rng(0)
W_frozen = frng.normal(0, 1, (2, 64))
b_frozen = frng.uniform(-1, 1, 64)

def extract(X):
    return np.maximum(0, X @ W_frozen + b_frozen)   # мұздатылған backbone

raw_acc = 0
head_acc = 0
`, solution: NP + P`from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(7)
X = rng.uniform(-1, 1, (200, 2))
y = ((X ** 2).sum(axis=1) < 0.4).astype(int)     # шеңбер ішінде ме?
X_train, X_test, y_train, y_test = X[:150], X[150:], y[:150], y[150:]

frng = np.random.default_rng(0)
W_frozen = frng.normal(0, 1, (2, 64))
b_frozen = frng.uniform(-1, 1, 64)

def extract(X):
    return np.maximum(0, X @ W_frozen + b_frozen)   # мұздатылған backbone

raw_acc = LogisticRegression(max_iter=1000).fit(X_train, y_train).score(X_test, y_test)
head = LogisticRegression(max_iter=1000)
head.fit(extract(X_train), y_train)
head_acc = head.score(extract(X_test), y_test)
print(raw_acc, head_acc)
`, check: { tests: P`assert abs(raw_acc - 0.70) < 0.03, f'raw_acc ≈ 0.70 болуы керек (шикі X-те), сізде {raw_acc}'
assert head.n_features_in_ == 64, 'head extract(X_train)-тің 64 белгісінде үйретілуі керек'
assert head_acc >= 0.95, f'head_acc кемінде 0.95 болуы керек, сізде {head_acc}'
assert W_frozen.shape == (2, 64), 'Backbone салмақтарын өзгертпеңіз'`, mustInclude: ['extract(X_train)'] }, hints: ['<code>head.fit(extract(X_train), y_train)</code>', '<code>head_acc = head.score(extract(X_test), y_test)</code>'] },
          { type: 'python', xp: 15, prompt: 'ResNet-18 блоктарының параметр саны <code>layers</code> сөздігінде берілген. <code>trainable(layers, train)</code> функциясын жазыңыз: тек <code>train</code> тізіміндегі блоктардың параметрлерін қоссын. <code>head_only = trainable(layers, ["fc"])</code> және <code>finetune = trainable(layers, ["layer4", "fc"])</code> есептеңіз.', starter: P`layers = {"conv1": 9408, "layer1": 147968, "layer2": 525568,
          "layer3": 2099712, "layer4": 8393728, "fc": 2565}

def trainable(layers, train):
    return sum(layers.values())

head_only = trainable(layers, ["fc"])
finetune = trainable(layers, ["layer4", "fc"])
print(head_only, finetune)
`, solution: P`layers = {"conv1": 9408, "layer1": 147968, "layer2": 525568,
          "layer3": 2099712, "layer4": 8393728, "fc": 2565}

def trainable(layers, train):
    return sum(n for name, n in layers.items() if name in train)

head_only = trainable(layers, ["fc"])
finetune = trainable(layers, ["layer4", "fc"])
print(head_only, finetune)
`, check: { tests: P`assert head_only == 2565, f'head_only = 2565 болуы керек, сізде {head_only}'
assert finetune == 8396293, f'finetune = 8393728 + 2565 = 8396293 болуы керек, сізде {finetune}'
assert trainable({"a": 1, "b": 2}, []) == 0, 'Ештеңе үйретілмесе, 0'` }, hints: ['<code>layers.items()</code> арқылы жүріп, <code>name in train</code> тексеріңіз', '<code>sum(n for name, n in layers.items() if name in train)</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Астанадағы мейрамхана 5 тағамның 300 суретін жинады және суреттен тағамды тануды қалайды. Ең дұрыс бастама?', options: ['CNN-ді нөлден 300 суретте үйрету', 'Pretrained ResNet-ті мұздатып, жаңа 5 класты head үйрету', 'Пиксельдерді logistic regression-ға беру', 'Алдымен 1 млн сурет жинау'], answer: 1, explain: 'Дерек аз: pretrained backbone жалпы көру белгілерін береді, ал 2 565 параметрлі head-ке 300 сурет жеткілікті.' },
          { type: 'quiz', xp: 10, prompt: 'Telecom churn: 600 абонент, 9 кестелік баған. Қандай модельден бастаймыз?', options: ['Үлкен MLP, 10 қабат', 'Pretrained ResNet', 'Logistic regression / gradient boosting baseline', 'LLM fine-tuning'], answer: 2, explain: 'Кестелік және аз деректе классикалық ML әдетте deep learning-тен кем емес, әрі жылдам және түсіндірілетін.' }
        ]
      },
      {
        id: 'dl-gate', gate: true, title: 'Модуль емтиханы: Deep Learning Intro', minutes: 35,
        body: `
<p>Қорытынды тексеріс: forward pass, softmax және cross-entropy, толық training loop, convolution, PyTorch. Torch қолданылмайды, тек numpy. Кеңестер жоқ, өту шегі — 75%.</p>`,
        exercises: [
          { type: 'python', xp: 40, prompt: '3 класты MLP (жасырын қабатта ReLU). Берілген салмақтармен: <code>logits</code> (пішіні (4, 3)), әр жол бойынша тұрақты softmax → <code>probs</code>, болжанған класс → <code>pred_class</code> (argmax), және нақты <code>y</code> бойынша орташа cross-entropy → <code>ce_loss</code> есептеңіз.', starter: NP + P`X = np.array([[1.0, 0.5, -1.0], [0.0, 2.0, 1.0], [-1.0, 1.0, 0.5], [2.0, -0.5, 0.0]])
y = np.array([0, 2, 1, 0])
W1 = np.array([[0.5, -0.3, 0.8, 0.1], [0.2, 0.7, -0.5, 0.4], [-0.6, 0.1, 0.3, 0.9]])
b1 = np.array([0.1, 0.0, -0.1, 0.2])
W2 = np.array([[1.0, -0.5, 0.2], [-0.4, 0.3, 0.9], [0.6, 0.8, -1.0], [0.1, -0.2, 0.7]])
b2 = np.array([0.0, 0.1, -0.1])
`, solution: NP + P`X = np.array([[1.0, 0.5, -1.0], [0.0, 2.0, 1.0], [-1.0, 1.0, 0.5], [2.0, -0.5, 0.0]])
y = np.array([0, 2, 1, 0])
W1 = np.array([[0.5, -0.3, 0.8, 0.1], [0.2, 0.7, -0.5, 0.4], [-0.6, 0.1, 0.3, 0.9]])
b1 = np.array([0.1, 0.0, -0.1, 0.2])
W2 = np.array([[1.0, -0.5, 0.2], [-0.4, 0.3, 0.9], [0.6, 0.8, -1.0], [0.1, -0.2, 0.7]])
b2 = np.array([0.0, 0.1, -0.1])

H = np.maximum(0, X @ W1 + b1)
logits = H @ W2 + b2
e = np.exp(logits - logits.max(axis=1, keepdims=True))
probs = e / e.sum(axis=1, keepdims=True)
pred_class = probs.argmax(axis=1)
ce_loss = -np.mean(np.log(probs[np.arange(len(y)), y]))
print(probs.round(3), pred_class, ce_loss)
`, check: { tests: P`import numpy as _np
_L = _np.maximum(0, X @ W1 + b1) @ W2 + b2
_e = _np.exp(_L - _L.max(axis=1, keepdims=True)); _Pr = _e / _e.sum(axis=1, keepdims=True)
assert _np.allclose(logits, _L), 'logits = relu(X @ W1 + b1) @ W2 + b2'
assert _np.allclose(probs, _Pr), 'probs — әр жол бойынша softmax (axis=1), әр жолдың қосындысы 1'
assert list(_np.asarray(pred_class)) == list(_Pr.argmax(axis=1)), 'pred_class = probs.argmax(axis=1)'
assert abs(float(ce_loss) - (-_np.mean(_np.log(_Pr[_np.arange(4), y])))) < 1e-6, 'ce_loss — нақты класс ықтималдығының −log орташасы'` }, hints: [] },
          { type: 'python', xp: 40, prompt: 'Нүкте шеңбер ішінде ме? Logistic regression бұл деректе ~71% ғана береді. 2 → 8 (ReLU) → 1 (sigmoid) желіні gradient descent-пен үйретіңіз (салмақтар <code>W1</code>, <code>b1</code>, <code>W2</code>, <code>b2</code> атымен, пішіндері дайын). Үйретуден кейінгі train accuracy-ді <code>acc</code>-қа жазыңыз: кемінде 0.95 керек. ReLU туындысы: <code>(z1 > 0)</code>.', starter: NP + P`rng = np.random.default_rng(7)
X = rng.uniform(-1, 1, (80, 2))
y = ((X ** 2).sum(axis=1) < 0.4).astype(float).reshape(-1, 1)

rng = np.random.default_rng(0)
W1 = rng.normal(0, 1, (2, 8)); b1 = np.zeros((1, 8))
W2 = rng.normal(0, 1, (8, 1)); b2 = np.zeros((1, 1))
lr = 0.5
`, solution: NP + P`rng = np.random.default_rng(7)
X = rng.uniform(-1, 1, (80, 2))
y = ((X ** 2).sum(axis=1) < 0.4).astype(float).reshape(-1, 1)

rng = np.random.default_rng(0)
W1 = rng.normal(0, 1, (2, 8)); b1 = np.zeros((1, 8))
W2 = rng.normal(0, 1, (8, 1)); b2 = np.zeros((1, 1))
lr = 0.5

for epoch in range(3000):
    z1 = X @ W1 + b1
    h = np.maximum(0, z1)
    p = 1 / (1 + np.exp(-(h @ W2 + b2)))
    dz2 = (p - y) / len(X)
    dW2 = h.T @ dz2; db2 = dz2.sum(axis=0, keepdims=True)
    dz1 = (dz2 @ W2.T) * (z1 > 0)
    dW1 = X.T @ dz1; db1 = dz1.sum(axis=0, keepdims=True)
    W1 -= lr * dW1; b1 -= lr * db1
    W2 -= lr * dW2; b2 -= lr * db2

acc = ((p > 0.5) == y).mean()
print(acc)
`, check: { tests: P`import numpy as _np
assert W1.shape == (2, 8) and W2.shape == (8, 1), 'Салмақтардың пішіні (2, 8) және (8, 1) болуы керек'
_p = 1 / (1 + _np.exp(-(_np.maximum(0, X @ W1 + b1) @ W2 + b2)))
_acc = float(((_p > 0.5) == y).mean())
assert _acc >= 0.95, f'Желінің train accuracy-і {_acc:.3f}, кемінде 0.95 керек'
assert abs(float(acc) - _acc) < 0.02, f'acc үйретілген желінің accuracy-і болуы керек ({_acc:.3f})'` }, hints: [] },
          { type: 'python', xp: 35, prompt: 'Бір CNN блогы: <code>block(img, k)</code> = maxpool 2×2 (ReLU (conv2d(img, k))). conv2d — padding жоқ, stride 1. 6×6 сурет пен 3×3 kernel үшін нәтиже 2×2 болады. Мысалдағы <code>img</code> пен <code>k</code> үшін <code>out = block(img, k)</code> есептеңіз.', starter: NP + P`img = np.array([[1, 2, 0, 1, 3, 1],
                [0, 1, 3, 2, 1, 0],
                [2, 0, 1, 4, 0, 2],
                [1, 3, 2, 0, 1, 1],
                [0, 1, 0, 2, 3, 0],
                [2, 2, 1, 0, 1, 4]], dtype=float)
k = np.array([[0, -1, 0], [-1, 4, -1], [0, -1, 0]], dtype=float)
`, solution: NP + P`img = np.array([[1, 2, 0, 1, 3, 1],
                [0, 1, 3, 2, 1, 0],
                [2, 0, 1, 4, 0, 2],
                [1, 3, 2, 0, 1, 1],
                [0, 1, 0, 2, 3, 0],
                [2, 2, 1, 0, 1, 4]], dtype=float)
k = np.array([[0, -1, 0], [-1, 4, -1], [0, -1, 0]], dtype=float)

def conv2d(img, k):
    kh, kw = k.shape
    out = np.zeros((img.shape[0] - kh + 1, img.shape[1] - kw + 1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i, j] = (img[i:i + kh, j:j + kw] * k).sum()
    return out

def maxpool2(x):
    H, W = x.shape
    return x[:H // 2 * 2, :W // 2 * 2].reshape(H // 2, 2, W // 2, 2).max(axis=(1, 3))

def block(img, k):
    return maxpool2(np.maximum(0, conv2d(img, k)))

out = block(img, k)
print(out)
`, check: { tests: P`import numpy as _np
def _conv(a, kk):
    return _np.array([[(a[i:i+kk.shape[0], j:j+kk.shape[1]] * kk).sum() for j in range(a.shape[1] - kk.shape[1] + 1)] for i in range(a.shape[0] - kk.shape[0] + 1)])
def _blk(a, kk):
    c = _np.maximum(0, _conv(a, kk)); h, w = c.shape
    return c.reshape(h // 2, 2, w // 2, 2).max(axis=(1, 3))
assert _np.shape(out) == (2, 2), f'out пішіні (2, 2) болуы керек, сізде {_np.shape(out)}'
assert _np.allclose(out, _blk(img, k)), f'out = {_blk(img, k).tolist()} болуы керек, сізде {out}'
_a = _np.random.default_rng(5).normal(size=(6, 6))
assert _np.allclose(block(_a, k), _blk(_a, k)), 'block кез келген 6×6 сурет үшін жұмыс істеуі керек (ReLU ұмытылмады ма?)'` }, hints: [] },
          { type: 'quiz', xp: 30, prompt: 'PyTorch training loop ішіндегі дұрыс рет қайсы?', options: ['loss.backward() → optimizer.zero_grad() → model(xb) → optimizer.step()', 'optimizer.zero_grad() → model(xb) → loss_fn(...) → loss.backward() → optimizer.step()', 'model(xb) → optimizer.step() → loss.backward() → optimizer.zero_grad()', 'optimizer.step() → model(xb) → loss_fn(...) → loss.backward()'], answer: 1, explain: 'Тазалау → forward → loss → backward (градиенттер) → step (жаңарту). step backward-тан бұрын тұрса, ол ескі градиентпен жаңартады.' },
          { type: 'number', xp: 30, prompt: 'MLP: <code>nn.Linear(784, 256)</code> → ReLU → <code>nn.Linear(256, 10)</code>. Барлығы неше үйретілетін параметр?', answer: 203530, tol: 0, explain: '784·256 + 256 = 200 960; 256·10 + 10 = 2 570; қосындысы 203 530.' }
        ]
      }
    ]
  };

  // ---------- M6.6 ML Capstone ----------
  const CS = P`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
churn = pd.read_csv('churn.csv')
FEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']
X_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])
`;
  const MS = CS + P`from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
model = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))
model.fit(X_train[FEATURES], y_train)
MODEL_VERSION = 'churn-lr-1.0.0'
THRESHOLD = 0.3
`;
  const PROFIT = P`def campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):
    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)
    tp = int(((y_pred == 1) & (y_true == 1)).sum())
    contacted = int((y_pred == 1).sum())
    return save_rate * value * tp - cost * contacted
`;
  const VALIDATE = P`RULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}

def validate(payload):
    if not isinstance(payload, dict):
        return ['payload: JSON object болуы керек']
    errors = []
    for name, (lo, hi) in RULES.items():
        if name not in payload:
            errors.append(f'{name}: missing')
            continue
        v = payload[name]
        if isinstance(v, bool) or not isinstance(v, (int, float)):
            errors.append(f'{name}: сан болуы керек')
        elif not (lo <= v <= hi):
            errors.append(f'{name}: out of range [{lo}, {hi}]')
    return errors
`;
  const ENDPOINT = P`def predict_endpoint(payload):
    errors = validate(payload)
    if errors:
        return 422, {'errors': errors}
    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])
    proba = float(model.predict_proba(row)[0, 1])
    return 200, {'churn_proba': round(proba, 4), 'will_churn': proba >= THRESHOLD, 'model_version': MODEL_VERSION}
`;

  DJ.modules['m6-6'] = {
    intro: 'M5-те ноутбукта жасаған churn моделін енді нағыз сервиске айналдырасыз: мәселені және табыс метрикасын анықтау, дерек пен baseline, сақталатын модель artifact-ы, валидациясы бар predict endpoint, тесттер, drift мониторингі және README. M6.1–M6.3 модульдеріндегі идеялардың бәрі бір жобада тоғысады.',
    lessons: [
      {
        id: 'cap6-1', title: 'Мәселені анықтау және табыс метрикасы', minutes: 18,
        body: `
<p>Бұл capstone-да «Дала Мобайл» телеком компаниясы үшін <b>churn prediction сервисін</b> құрамыз. M5 capstone-да сіз модель жасап, memo жаздыңыз. Енді сұрақ басқа: модельді басқа жүйелер күн сайын қолдана алатындай қалай <b>өнімге</b> айналдырамыз?</p>
<h3>1. Кім, қашан, қалай қолданады?</h3>
<ul>
<li><b>Тұтынушы</b>: CRM жүйесі. Call-центр операторы абонентпен сөйлескенде экранда «кету қаупі жоғары» белгісі шығады.</li>
<li><b>Режим</b>: online — бір абонентке бір сұрау (REST API, M6.2). Түнгі batch скоринг — екінші кезең.</li>
<li><b>Шешім</b>: ықтималдық шектен (threshold) жоғары болса, оператор 2 000 ₸ жеңілдік ұсынады.</li>
</ul>
<h3>2. Үш деңгейлі табыс метрикасы</h3>
<table>
<tr><th>Деңгей</th><th>Метрика</th><th>Мақсат</th></tr>
<tr><td>Offline (модель)</td><td>ROC-AUC, кетушілер бойынша recall</td><td>AUC ≥ 0.78, baseline-дан жоғары</td></tr>
<tr><td>Бизнес</td><td>Науқан пайдасы, ₸</td><td>«ешкімге ұсынбау» және «барлығына ұсыну»-дан жоғары</td></tr>
<tr><td>Сервис (SLO)</td><td>p95 latency, қате үлесі</td><td>p95 &lt; 200 ms, 5xx &lt; 0.1%</td></tr>
</table>
<h3>Қадамдап мысал: пайда формуласы</h3>
<p>Болжамдар: кеткен абонент компанияға 40 000 ₸ табыс әкелетін еді; жеңілдік оның 30%-ын сақтап қалады; ұсыныс құны 2 000 ₸ (кімге ұсынсақ та).</p>
<pre><code>пайда = 0.3 · 40 000 · TP − 2 000 · (ұсыныс алғандар саны)</code></pre>
<p>Модель 55 адамға ұсыныс берді, олардың 29-ы шынымен кететін еді (TP = 29): 0.3 · 40 000 · 29 − 2 000 · 55 = 348 000 − 110 000 = <b>238 000 ₸</b>. Бұл санды модельдің «нөлдік» нұсқаларымен салыстыру керек: ешкімге ұсынбау (0 ₸) және барлығына ұсыну.</p>
<h3>3. Шектеулер мен тәуекелдер</h3>
<ul>
<li>Дерек: 600 абонент, кейбір бағандарда бос мәндер бар.</li>
<li>Әділдік: модель бір қаланы жүйелі түрде кемсітпеуі керек.</li>
<li>Құпиялылық: API-ге аты-жөні, ЖСН жіберілмейді, тек белгілер.</li>
</ul>
<div class="tip">Жобаны кодтан емес, бір беттік «problem framing» құжатынан бастаңыз. Ол README-дің бірінші бөлімі болады және сұхбатта «бұл жобаны неге жасадыңыз?» деген сұраққа жауап береді.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3)</code> функциясын жазыңыз (формула сабақта). Сосын бүкіл <code>churn.csv</code> бойынша екі қарапайым стратегияның пайдасын есептеңіз: <code>profit_all</code> — барлығына ұсыну, <code>profit_none</code> — ешкімге ұсынбау.', starter: P`import pandas as pd
import numpy as np
churn = pd.read_csv('churn.csv')
y = churn['churned']

def campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):
    return 0

profit_all = None
profit_none = None
`, solution: P`import pandas as pd
import numpy as np
churn = pd.read_csv('churn.csv')
y = churn['churned']

def campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):
    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)
    tp = int(((y_pred == 1) & (y_true == 1)).sum())
    contacted = int((y_pred == 1).sum())
    return save_rate * value * tp - cost * contacted

profit_all = campaign_profit(y, np.ones(len(y)))
profit_none = campaign_profit(y, np.zeros(len(y)))
print(profit_all, profit_none)
`, check: { tests: P`import numpy as _np
assert abs(campaign_profit([1, 0, 1, 0], [1, 1, 0, 0]) - 8000) < 1e-6, 'TP = 1, ұсыныс 2 адамға: 12 000 − 4 000 = 8 000 болуы керек'
assert abs(campaign_profit([1, 1], [1, 1], cost=1000, value=10000, save_rate=0.5) - 8000) < 1e-6, 'cost, value, save_rate параметрлерін қолданыңыз'
assert profit_all is not None and abs(profit_all - 660000) < 1e-6, f'profit_all = 0.3·40000·155 − 2000·600 = 660 000 болуы керек, сізде {profit_all}'
assert profit_none is not None and abs(profit_none) < 1e-6, 'profit_none = 0'` }, hints: ['TP: <code>((y_pred == 1) & (y_true == 1)).sum()</code>', 'Барлығына: <code>np.ones(len(y))</code>, ешкімге: <code>np.zeros(len(y))</code>'] },
          { type: 'number', xp: 10, prompt: 'Модель 80 абонентке ұсыныс берді, олардың 32-сі шынымен кететін еді. Сабақтағы формула бойынша пайда қанша ₸?', answer: 224000, tol: 1, unit: '₸', explain: '0.3 · 40 000 · 32 = 384 000; 2 000 · 80 = 160 000; 384 000 − 160 000 = 224 000 ₸.' },
          { type: 'quiz', xp: 10, prompt: 'Сервистің табысын бағалау үшін қай метрикалар жиыны ең толық?', options: ['Тек accuracy', 'ROC-AUC + науқан пайдасы (₸) + p95 latency мен қате үлесі', 'Тек p95 latency', 'Модель параметрлерінің саны'], answer: 1, explain: 'Сервис үш деңгейде табысты болуы керек: модель сапасы (offline), бизнес нәтиже және сенімді жұмыс (SLO).' },
          { type: 'rubric', xp: 30, minWords: 70, done: 'Бұл мәтін — README-дің «Problem» бөлімі. Оны сақтап қойыңыз: соңғы сабақта README-ге қосасыз.', prompt: 'Жобаңыздың бір беттік problem framing мәтінін жазыңыз (кемінде 70 сөз): кім қолданады, қандай шешім қабылданады, табыс метрикалары (offline, бизнес, SLO) және кемінде екі тәуекел. Сосын адал бағалаңыз: әр критерий кемінде <b>3 / 4</b>.', criteria: [
            { name: 'Қолданушы және шешім', levels: ['Айтылмаған', '«Компанияға пайдалы» деген жалпы сөз', 'Кім қолданады және қандай әрекет жасалады — нақты', 'Қолданушы, әрекет, режим (online/batch) және шек қалай таңдалатыны'] },
            { name: 'Табыс метрикасы', levels: ['Жоқ', 'Тек accuracy немесе тек AUC', 'Offline және бизнес метрикасы сандық мақсатпен', 'Offline, бизнес және SLO, әрқайсысы baseline-мен салыстырылған'] },
            { name: 'Тәуекелдер', levels: ['Жоқ', 'Біреуі, жалпы', 'Екі нақты тәуекел', 'Тәуекелдер және олардың әрқайсысына қарсы шара'] }
          ] }
        ]
      },
      {
        id: 'cap6-2', title: 'Дерек, data contract және baseline', minutes: 20,
        body: `
<p>Сервис деректі «бір рет» емес, күн сайын алады. Сондықтан деректі жай қарап шықпаймыз, <b>data contract</b> жазамыз: қандай бағандар, қандай типтер, қандай мән аралығы күтіледі. Бұл contract кейін API валидациясы мен drift мониторингінің негізі болады.</p>
<h3>churn.csv: не бар</h3>
<table>
<tr><th>Баған</th><th>Тип</th><th>Ескерту</th></tr>
<tr><td><code>customer_id</code></td><td>int</td><td>белгі емес, тек кілт; қайталанбауы керек</td></tr>
<tr><td><code>city</code>, <code>plan</code></td><td>категория</td><td>5 қала, 3 тариф</td></tr>
<tr><td><code>age</code>, <code>data_gb</code></td><td>сан</td><td>бос мәндер бар</td></tr>
<tr><td><code>tenure_months</code>, <code>monthly_fee</code>, <code>support_calls</code>, <code>has_contract</code></td><td>сан</td><td>толық</td></tr>
<tr><td><code>churned</code></td><td>0/1</td><td>target, шамамен 26%</td></tr>
</table>
<h3>Қадамдап мысал: деректі тексеру</h3>
<pre><code>churn = pd.read_csv('churn.csv')
print(len(churn))                              # 600
na = churn.isna().sum()
print(na[na > 0].to_dict())                    # {'age': 25, 'data_gb': 17}
print(churn['customer_id'].duplicated().sum()) # 0
print(churn['churned'].mean())                 # 0.258</code></pre>
<p>Бұл сандар — жобаның «паспорты». Оларды README-ге жазамыз, ал жаңа дерек келгенде дәл осы тексерістерді автоматты қайталаймыз (M6.3-тегі CI).</p>
<h3>Baseline-сыз модель жоқ</h3>
<p>Baseline — «модель жасамасақ не болар еді?» деген сұрақтың жауабы. Екеуін өлшейміз:</p>
<ol>
<li><b>DummyClassifier</b> — бәріне бірдей жауап. ROC-AUC = 0.5: кездейсоқ деңгей.</li>
<li><b>Қарапайым модель</b> — 4 сандық белгідегі logistic regression. Осыдан кейінгі әр күрделілік оны жеңуі керек.</li>
</ol>
<pre><code>from sklearn.model_selection import cross_val_score
pipe = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(),
                     LogisticRegression(max_iter=1000))
cross_val_score(pipe, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()</code></pre>
<div class="tip">Test жиынын осы кезеңде бір рет бөліп, «сейфке» салыңыз (<code>random_state=42</code>, <code>stratify</code>). Модель таңдау тек train ішіндегі cross-validation арқылы. Test-ті соңында бір рет ашамыз.</div>
<h3>Жиі қателер</h3>
<ul>
<li><code>customer_id</code>-ді белгі ретінде қалдыру.</li>
<li>Бос мәндерді бүкіл дерекке орташамен толтырып, сосын бөлу: test туралы ақпарат train-ге өтеді (leakage). Imputer pipeline ішінде болуы керек.</li>
</ul>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>data_report(df)</code> функциясын жазыңыз. Ол сөздік қайтарсын: <code>n_rows</code>, <code>missing</code> (тек бос мәні бар бағандар: <code>{баған: саны}</code>), <code>dup_ids</code> (қайталанған <code>customer_id</code> саны), <code>churn_rate</code>. <code>report = data_report(churn)</code> есептеңіз.', starter: P`import pandas as pd
churn = pd.read_csv('churn.csv')

def data_report(df):
    return {}

report = data_report(churn)
print(report)
`, solution: P`import pandas as pd
churn = pd.read_csv('churn.csv')

def data_report(df):
    na = df.isna().sum()
    return {
        'n_rows': len(df),
        'missing': {k: int(v) for k, v in na[na > 0].items()},
        'dup_ids': int(df['customer_id'].duplicated().sum()),
        'churn_rate': float(df['churned'].mean()),
    }

report = data_report(churn)
print(report)
`, check: { tests: P`import pandas as _pd
assert report.get('n_rows') == 600, 'n_rows = 600'
assert report.get('missing') == {'age': 25, 'data_gb': 17}, f"missing = {{'age': 25, 'data_gb': 17}} болуы керек, сізде {report.get('missing')}"
assert report.get('dup_ids') == 0, 'dup_ids = 0'
assert abs(report.get('churn_rate', 0) - 0.2583) < 1e-3, 'churn_rate = churned бағанының орташасы'
_d = _pd.DataFrame({'customer_id': [1, 1, 2], 'x': [None, 1, 2], 'churned': [1, 0, 0]})
_r = data_report(_d)
assert _r['dup_ids'] == 1 and _r['missing'] == {'x': 1}, 'data_report кез келген DataFrame үшін жұмыс істеуі керек'` }, hints: ['<code>na = df.isna().sum()</code>, сосын <code>na[na > 0]</code>', "<code>df['customer_id'].duplicated().sum()</code>"] },
          { type: 'python', xp: 20, prompt: 'Екі baseline. Train-де 5-fold CV ROC-AUC есептеңіз: <code>dummy_auc</code> — <code>DummyClassifier(strategy="most_frequent")</code>; <code>base_auc</code> — <code>make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression(max_iter=1000))</code>, тек <code>FEATURES</code> бағандарында.', starter: CS + P`from sklearn.model_selection import cross_val_score
from sklearn.dummy import DummyClassifier
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

dummy_auc = 0
base_auc = 0
`, solution: CS + P`from sklearn.model_selection import cross_val_score
from sklearn.dummy import DummyClassifier
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

dummy_auc = cross_val_score(DummyClassifier(strategy='most_frequent'), X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()
pipe = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))
base_auc = cross_val_score(pipe, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()
print(dummy_auc, base_auc)
`, check: { tests: P`assert abs(dummy_auc - 0.5) < 1e-9, f'dummy_auc = 0.5 болуы керек, сізде {dummy_auc}'
assert abs(base_auc - 0.8134) < 0.003, f'base_auc ≈ 0.813 болуы керек, сізде {base_auc:.4f}. FEATURES, cv=5, scoring="roc_auc" қолдандыңыз ба?'
assert len(X_train) == 450, 'Бөлуді өзгертпеңіз'`, mustInclude: ['cross_val_score('] }, hints: ["<code>cross_val_score(model, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()</code>", 'Pipeline-ды <code>make_pipeline(...)</code> арқылы құрыңыз'] },
          { type: 'quiz', xp: 10, prompt: 'Неге <code>SimpleImputer</code> бүкіл дерекке алдын ала емес, pipeline ішінде қолданылады?', options: ['Солай жылдамырақ', 'CV мен test-те медиана тек train бөлігінен есептеледі, leakage болмайды, және сол қадам сервисте де автоматты қайталанады', 'pandas бос мәндерді толтыра алмайды', 'Imputer тек pipeline-да жұмыс істейді'], answer: 1, explain: 'Pipeline ішіндегі алдын ала өңдеу әр fold-та тек train бөлігінде fit болады және модельмен бірге сақталады: сервиске келген бос мән дәл сол медианамен толтырылады.' }
        ]
      },
      {
        id: 'cap6-3', title: 'Модель таңдау және artifact сақтау', minutes: 20,
        body: `
<p>Енді baseline-ды жеңуге тырысамыз және жеңген модельді сервис жүктей алатын <b>artifact</b> ретінде сақтаймыз.</p>
<h3>Екі кандидат</h3>
<ol>
<li><b>Compact</b>: 4 сандық белгі, imputer + scaler + logistic regression.</li>
<li><b>Full</b>: барлық белгі. Сандықтарға imputer + scaler, <code>city</code> мен <code>plan</code>-ға <code>OneHotEncoder(handle_unknown='ignore')</code> — <code>ColumnTransformer</code> арқылы.</li>
</ol>
<pre><code>NUM = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
CAT = ['city', 'plan']
pre = ColumnTransformer([
    ('num', make_pipeline(SimpleImputer(strategy='median'), StandardScaler()), NUM),
    ('cat', OneHotEncoder(handle_unknown='ignore'), CAT)])
full = make_pipeline(pre, LogisticRegression(max_iter=1000))</code></pre>
<p>Бұл деректе CV ROC-AUC шамамен: compact ≈ 0.813, full ≈ 0.811. Көп белгі жеңбеді. Мұндайда <b>қарапайымын</b> таңдаймыз: API-ге 4 өріс жеткілікті, валидация оңай, drift бақылайтын баған аз, түсіндіру жеңіл. Бұл — нағыз инженерлік шешім, оны README-де негіздейміз.</p>
<h3>Artifact: модель + метадеректер</h3>
<p>Сервис ноутбукты емес, файлды жүктейді. Бір модельге екі файл:</p>
<pre><code>import pickle, json
with open('churn_model.pkl', 'wb') as f:
    pickle.dump(model, f)               # бүкіл pipeline: imputer + scaler + модель
meta = {'version': 'churn-lr-1.0.0', 'features': FEATURES, 'threshold': 0.3,
        'metrics': {'cv_auc': 0.813, 'test_auc': 0.816}, 'sklearn_version': sklearn.__version__}
with open('model_meta.json', 'w') as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)</code></pre>
<p>Неге метадеректер? Сервис қай белгілерді күтетінін, қай шекті қолданатынын осы файлдан оқиды; ал мониторингте «қай нұсқа жауап берді?» сұрағына <code>version</code> жауап береді. M6.3-те MLflow бұл істі жүйелі жасайды: <code>mlflow.log_params</code>, <code>mlflow.log_metric('test_auc', ...)</code>, <code>mlflow.sklearn.log_model(model, 'model')</code> және Model Registry-де нұсқа.</p>
<div class="tip">Pickle-ды тек өзіңіз жасаған файлдан жүктеңіз: бөтен pickle кез келген кодты орындай алады. Және sklearn нұсқасын бекітіңіз (<code>requirements.txt</code>): басқа нұсқада сақталған модель жүктелмеуі немесе басқаша жұмыс істеуі мүмкін.</div>
<h3>Training-serving skew</h3>
<p>Ең қауіпті қате: үйретуде бір өңдеу, сервисте басқа өңдеу. Мысалы, ноутбукта <code>monthly_fee</code>-ді мың теңгеге бөлдіңіз, ал API теңгемен келеді. Модель қате жауап береді, бірақ ешқандай exception болмайды. Шешімі — барлық өңдеуді pipeline ішіне салып, бір artifact етіп сақтау.</p>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Екі кандидатты train-де 5-fold CV ROC-AUC бойынша салыстырыңыз: <code>cv_compact</code> (FEATURES, imputer + scaler + LR) және <code>cv_full</code> (сабақтағы ColumnTransformer, NUM + CAT). Жеңгенін <code>chosen</code> (<code>"compact"</code> немесе <code>"full"</code>) деп жазыңыз; тең болса қарапайымын. Сосын compact pipeline-ды <code>model</code> атымен бүкіл train-де үйретіп, <code>test_auc</code> есептеңіз.', starter: CS + P`from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
NUM = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
CAT = ['city', 'plan']

cv_compact = 0
cv_full = 0
chosen = None
`, solution: CS + P`from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
NUM = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
CAT = ['city', 'plan']

compact = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))
pre = ColumnTransformer([
    ('num', make_pipeline(SimpleImputer(strategy='median'), StandardScaler()), NUM),
    ('cat', OneHotEncoder(handle_unknown='ignore'), CAT)])
full = make_pipeline(pre, LogisticRegression(max_iter=1000))
cv_compact = cross_val_score(compact, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()
cv_full = cross_val_score(full, X_train[NUM + CAT], y_train, cv=5, scoring='roc_auc').mean()
chosen = 'compact' if cv_compact >= cv_full else 'full'
model = compact.fit(X_train[FEATURES], y_train)
test_auc = roc_auc_score(y_test, model.predict_proba(X_test[FEATURES])[:, 1])
print(cv_compact, cv_full, chosen, test_auc)
`, check: { tests: P`assert abs(cv_compact - 0.8134) < 0.003, f'cv_compact ≈ 0.813 болуы керек, сізде {cv_compact:.4f}'
assert abs(cv_full - 0.8111) < 0.004, f'cv_full ≈ 0.811 болуы керек, сізде {cv_full:.4f}. NUM + CAT және OneHotEncoder(handle_unknown="ignore") қолданыңыз'
assert chosen == 'compact', 'CV бойынша compact жеңді (немесе тең): chosen = "compact"'
assert hasattr(model, 'predict_proba') and model.n_features_in_ == 4, 'model — FEATURES-те үйретілген compact pipeline'
assert abs(test_auc - 0.8161) < 0.003, f'test_auc ≈ 0.816 болуы керек, сізде {test_auc:.4f}'`, mustInclude: ['ColumnTransformer('] }, hints: ["<code>cross_val_score(full, X_train[NUM + CAT], y_train, cv=5, scoring='roc_auc').mean()</code>", "<code>chosen = 'compact' if cv_compact >= cv_full else 'full'</code>"] },
          { type: 'python', xp: 20, prompt: 'Artifact сақтаңыз. <code>model</code>-ді <code>pickle</code> арқылы <code>churn_model.pkl</code> файлына жазыңыз. <code>model_meta.json</code> файлына кілттері <code>version</code> (<code>"churn-lr-1.0.0"</code>), <code>features</code> (FEATURES), <code>threshold</code> (0.3), <code>metrics</code> (<code>{"test_auc": ...}</code>) болатын сөздік жазыңыз. Сосын модельді файлдан <code>loaded</code> атымен қайта жүктеңіз.', starter: MS + P`import pickle, json
from sklearn.metrics import roc_auc_score
test_auc = roc_auc_score(y_test, model.predict_proba(X_test[FEATURES])[:, 1])

loaded = None
`, solution: MS + P`import pickle, json
from sklearn.metrics import roc_auc_score
test_auc = roc_auc_score(y_test, model.predict_proba(X_test[FEATURES])[:, 1])

with open('churn_model.pkl', 'wb') as f:
    pickle.dump(model, f)
meta = {'version': 'churn-lr-1.0.0', 'features': FEATURES, 'threshold': 0.3, 'metrics': {'test_auc': round(test_auc, 4)}}
with open('model_meta.json', 'w') as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)
with open('churn_model.pkl', 'rb') as f:
    loaded = pickle.load(f)
print(loaded.predict_proba(X_test[FEATURES].head(3)))
`, check: { tests: P`import json as _json, pickle as _pk, numpy as _np
with open('churn_model.pkl', 'rb') as _f:
    _m = _pk.load(_f)
assert _np.allclose(_m.predict_proba(X_test[FEATURES])[:, 1], model.predict_proba(X_test[FEATURES])[:, 1]), 'churn_model.pkl ішінде үйретілген model болуы керек'
with open('model_meta.json') as _f:
    _meta = _json.load(_f)
assert _meta.get('version') == 'churn-lr-1.0.0', 'meta["version"] = "churn-lr-1.0.0"'
assert _meta.get('features') == FEATURES, 'meta["features"] = FEATURES'
assert _meta.get('threshold') == 0.3, 'meta["threshold"] = 0.3'
assert abs(_meta.get('metrics', {}).get('test_auc', 0) - test_auc) < 1e-3, 'meta["metrics"]["test_auc"] — есептелген test_auc'
assert loaded is not None and _np.allclose(loaded.predict_proba(X_test[FEATURES])[:, 1], model.predict_proba(X_test[FEATURES])[:, 1]), 'loaded = pickle.load(...) — файлдан жүктелген модель'`, mustInclude: ['pickle.dump(', 'json.dump('] }, hints: ["<code>with open('churn_model.pkl', 'wb') as f: pickle.dump(model, f)</code>", "Жүктеу: <code>with open('churn_model.pkl', 'rb') as f: loaded = pickle.load(f)</code>"] },
          { type: 'quiz', xp: 10, prompt: 'Ноутбукта <code>monthly_fee</code> мың теңгеге бөлініп үйретілді, ал API теңгемен қабылдайды. Сервис қате бермейді, бірақ болжамдар біртүрлі. Бұл не және алдын алу жолы?', options: ['Overfitting; көбірек дерек керек', 'Training-serving skew; барлық өңдеуді pipeline ішіне салып, бір artifact етіп сақтау', 'Data drift; модельді қайта үйрету', 'Latency мәселесі; кэш қосу'], answer: 1, explain: 'Үйрету мен сервистегі өңдеу әртүрлі — training-serving skew. Өңдеу pipeline-да болса, сервис дәл сол қадамдарды artifact-пен бірге алады.' }
        ]
      },
      {
        id: 'cap6-4', title: 'Predict endpoint және input validation', minutes: 22,
        body: `
<p>Модель дайын, енді оны CRM шақыра алатын <b>endpoint</b> етеміз. M6.2-де мұны FastAPI-мен жасадыңыз. Production-да код шамамен былай болады:</p>
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
<p>Pydantic сұрауды модельге жібермей тұрып тексереді: өріс жоқ болса, типі қате болса немесе аралықтан тыс болса, FastAPI өзі <b>422 Unprocessable Entity</b> қайтарады. Браузерде FastAPI жоқ, сондықтан дәл осы логиканы қарапайым Python функциясымен модельдейміз: <code>predict_endpoint(payload) → (status, body)</code>.</p>
<h3>Валидация ережелері (data contract-тан)</h3>
<table>
<tr><th>Өріс</th><th>Тип</th><th>Аралық</th></tr>
<tr><td><code>tenure_months</code></td><td>сан</td><td>0…600</td></tr>
<tr><td><code>monthly_fee</code></td><td>сан</td><td>1…100 000 ₸</td></tr>
<tr><td><code>support_calls</code></td><td>сан</td><td>0…100</td></tr>
<tr><td><code>has_contract</code></td><td>сан</td><td>0 немесе 1</td></tr>
</table>
<h3>Қадамдап мысал</h3>
<pre><code>predict_endpoint({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})
# (200, {'churn_proba': 0.8427, 'will_churn': True, 'model_version': 'churn-lr-1.0.0'})

predict_endpoint({'tenure_months': '5', 'monthly_fee': 6500, 'support_calls': -1})
# (422, {'errors': ['tenure_months: сан болуы керек',
#                   'support_calls: out of range [0, 100]', 'has_contract: missing']})</code></pre>
<p>Барлық қатені бірден қайтарамыз — клиент оларды бір рет түзетеді. Артық өрістер (<code>customer_id</code>) еленбейді.</p>
<div class="tip">Python-да <code>True</code> — <code>int</code>-тің ішкі класы: <code>isinstance(True, int)</code> → <code>True</code>. Сондықтан bool-ды бөлек тексеріп, сан ретінде қабылдамаймыз. Кодтар: <b>200</b> — сәтті, <b>422</b> — клиент деректі қате жіберді, <b>500</b> — сервистің өз қатесі (оны ешқашан клиент кінәсі деп көрсетпеңіз).</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>validate(payload)</code> функциясын жазыңыз: ол қателер тізімін қайтарады (бос тізім — бәрі дұрыс). <code>payload</code> сөздік болмаса — бір қате. Әр <code>RULES</code> өрісі үшін: жоқ болса <code>"{өріс}: missing"</code>; сан емес немесе bool болса <code>"{өріс}: сан болуы керек"</code>; аралықтан тыс болса <code>"{өріс}: out of range [lo, hi]"</code>. Әр қатеде өріс аты болуы керек.', starter: P`RULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}

def validate(payload):
    errors = []
    return errors
`, solution: VALIDATE, check: { tests: P`_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
assert validate(_ok) == [], f'Дұрыс payload үшін бос тізім керек, сізде {validate(_ok)}'
assert validate(dict(_ok, customer_id='A-17')) == [], 'Артық өрістер еленбейді'
_e = validate({k: v for k, v in _ok.items() if k != 'monthly_fee'})
assert len(_e) == 1 and 'monthly_fee' in _e[0], f'monthly_fee жоқ: бір қате, ішінде өріс аты. Сізде {_e}'
_e = validate(dict(_ok, tenure_months='12'))
assert len(_e) == 1 and 'tenure_months' in _e[0], 'Мәтін "12" — сан емес, қате болуы керек'
_e = validate(dict(_ok, has_contract=True))
assert len(_e) == 1 and 'has_contract' in _e[0], 'bool сан ретінде қабылданбайды'
_e = validate(dict(_ok, support_calls=-1))
assert len(_e) == 1 and 'support_calls' in _e[0], 'support_calls = -1 аралықтан тыс'
assert len(validate({})) == 4, 'Бос сөздік: 4 қате (әр өріс missing)'
assert len(validate([1, 2])) >= 1, 'Сөздік емес payload қате беруі керек'
assert validate(dict(_ok, monthly_fee=6500.5)) == [], 'float сан да қабылданады'` }, hints: ['<code>if not isinstance(payload, dict): return [...]</code>', "<code>if isinstance(v, bool) or not isinstance(v, (int, float))</code>, сосын <code>lo <= v <= hi</code>"] },
          { type: 'python', xp: 25, prompt: 'Модель, <code>validate</code>, <code>MODEL_VERSION</code> және <code>THRESHOLD</code> дайын. <code>predict_endpoint(payload)</code> жазыңыз: қате болса <code>(422, {"errors": [...]})</code>; әйтпесе FEATURES ретімен бір жолды DataFrame жасап, <code>(200, {"churn_proba": round(proba, 4), "will_churn": proba >= THRESHOLD, "model_version": MODEL_VERSION})</code> қайтарыңыз.', starter: MS + VALIDATE + P`
def predict_endpoint(payload):
    return 200, {}
`, solution: MS + VALIDATE + '\n' + ENDPOINT + P`
print(predict_endpoint({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}))
`, check: { tests: P`import pandas as _pd
_ok = {'customer_id': 'A-17', 'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
_s, _b = predict_endpoint(_ok)
_p = float(model.predict_proba(_pd.DataFrame([{f: _ok[f] for f in FEATURES}]))[0, 1])
assert _s == 200, f'Дұрыс payload үшін статус 200, сізде {_s}'
assert set(_b) == {'churn_proba', 'will_churn', 'model_version'}, f'Жауап кілттері: churn_proba, will_churn, model_version. Сізде {set(_b)}'
assert abs(_b['churn_proba'] - round(_p, 4)) < 1e-9, 'churn_proba = round(proba, 4)'
assert _b['will_churn'] == (_p >= THRESHOLD) and _b['model_version'] == MODEL_VERSION, 'will_churn = proba >= THRESHOLD, model_version = MODEL_VERSION'
_s2, _b2 = predict_endpoint({'tenure_months': 48, 'monthly_fee': 3500, 'support_calls': 0, 'has_contract': 1})
assert _s2 == 200 and not _b2['will_churn'], 'Ұзақ клиент, келісімшартпен — will_churn False'
_s3, _b3 = predict_endpoint({'tenure_months': 5})
assert _s3 == 422 and len(_b3.get('errors', [])) == 3, 'Жетіспейтін өрістер: 422 және 3 қате'` }, hints: ['Алдымен <code>errors = validate(payload)</code>; бар болса <code>return 422, {"errors": errors}</code>', '<code>row = pd.DataFrame([{f: payload[f] for f in FEATURES}])</code>, <code>proba = float(model.predict_proba(row)[0, 1])</code>'] },
          { type: 'quiz', xp: 10, prompt: 'Клиент <code>{"tenure_months": "бес"}</code> жіберді, ал сервис <code>predict_proba</code> ішінде құлап, <b>500</b> қайтарды. Не дұрыс емес?', options: ['Бәрі дұрыс, 500 — қате деген сөз', 'Валидация модельге дейін жасалмаған: бұл клиент қатесі, 422 және түсінікті хабар керек', 'Модельді қайта үйрету керек', 'Клиентке 200 және proba = 0 қайтару керек'], answer: 1, explain: 'Қате кіріс — клиенттің қатесі (4xx). 500 сервистің өз ақауын білдіреді және мониторингте жалған alert туғызады. Pydantic/validate модельге дейін тұруы керек.' }
        ]
      },
      {
        id: 'cap6-5', title: 'Тесттер, мониторинг және drift', minutes: 22,
        body: `
<p>Сервис іске қосылғаннан кейін екі сұрақ қалады: «өзгеріс енгізгенде ештеңе бұзылмады ма?» (тесттер, M6.1) және «модель уақыт өте нашарламай ма?» (мониторинг, M6.3).</p>
<h3>Тест түрлері</h3>
<table>
<tr><th>Түрі</th><th>Мысал</th></tr>
<tr><td>Unit</td><td><code>validate</code> missing өрісті табады</td></tr>
<tr><td>Contract</td><td>жауапта <code>churn_proba</code>, <code>will_churn</code>, <code>model_version</code> бар, proba ∈ [0, 1]</td></tr>
<tr><td>Directional (бағыт)</td><td>support_calls көбейсе, қауіп өспеуі мүмкін емес</td></tr>
<tr><td>Quality gate</td><td>CI-да бекітілген test жиынында AUC ≥ 0.78, әйтпесе merge жоқ</td></tr>
</table>
<pre><code># tests/test_api.py — pytest оны өзі тауып, іске қосады
def test_missing_field_422():
    status, body = predict_endpoint({'tenure_months': 5})
    assert status == 422
    assert any('monthly_fee' in e for e in body['errors'])</code></pre>
<p>Жақсы тест қателікті <b>ұстай алады</b>. Тексерудің бір тәсілі — әдейі бұзылған нұсқаны (mutant) беріп, тест құлай ма, соны қарау.</p>
<h3>Мониторинг: үш қабат</h3>
<ol>
<li><b>Сервис</b>: сұрау саны, p95 latency, 4xx/5xx үлесі.</li>
<li><b>Дерек</b>: кіріс белгілерінің таралуы үйретудегіден ауытқыды ма (<b>data drift</b>)? Болжамдар таралуы (proba орташасы, will_churn үлесі) өзгерді ме?</li>
<li><b>Модель сапасы</b>: шын жауап (кетті/кетпеді) 1–3 айдан кейін ғана белгілі. Сол кезде AUC мен науқан пайдасын қайта есептейміз.</li>
</ol>
<h3>PSI — Population Stability Index</h3>
<p>Үйрету дерегінің квантильдері бойынша bin-дер жасаймыз, әр bin-дегі үлесті «бұрын» (e) және «қазір» (a) салыстырамыз:</p>
<pre><code>PSI = Σ (a − e) · ln(a / e)
&lt; 0.1 — тұрақты · 0.1–0.25 — бақылау · &gt; 0.25 — alert</code></pre>
<p>Мысал: маркетинг науқаны көп жаңа абонент әкелді, жаңа айда <code>tenure_months</code> үйретудегіден әлдеқайда аз. PSI ≈ 3.6 — айқын drift: модель мұндай абоненттерді аз көрген, болжамдарды тексеру керек. Train мен test арасындағы PSI ≈ 0.07 — бұл жай кездейсоқ ауытқу.</p>
<div class="tip">Drift — автоматты түрде «модельді қайта үйрет» дегенді білдірмейді. Алдымен себебін табыңыз: дерек pipeline-ы бұзылды ма (мысалы, теңге тиынға айналды), бизнес өзгерді ме (жаңа тариф), әлде шын мінез-құлық өзгерді ме.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Сервис (<code>predict_endpoint</code>) дайын. pytest стиліндегі үш тест жазыңыз: <code>test_valid_returns_200</code> (статус 200, <code>0 ≤ churn_proba ≤ 1</code>), <code>test_missing_field_422</code> (өріс жоқ → 422), <code>test_more_calls_higher_risk</code> (басқа өрістер бірдей, support_calls 0 мен 5: proba қатаң өседі). Тексеруші тесттеріңізді дұрыс сервисте және әдейі бұзылған нұсқаларда іске қосады.', starter: MS + VALIDATE + '\n' + ENDPOINT + P`
def test_valid_returns_200():
    pass

def test_missing_field_422():
    pass

def test_more_calls_higher_risk():
    pass
`, solution: MS + VALIDATE + '\n' + ENDPOINT + P`
BASE = {'tenure_months': 12, 'monthly_fee': 6500, 'support_calls': 1, 'has_contract': 0}

def test_valid_returns_200():
    status, body = predict_endpoint(BASE)
    assert status == 200
    assert 0 <= body['churn_proba'] <= 1

def test_missing_field_422():
    status, body = predict_endpoint({'tenure_months': 5})
    assert status == 422

def test_more_calls_higher_risk():
    _, low = predict_endpoint(dict(BASE, support_calls=0))
    _, high = predict_endpoint(dict(BASE, support_calls=5))
    assert high['churn_proba'] > low['churn_proba']

test_valid_returns_200(); test_missing_field_422(); test_more_calls_higher_risk()
print('3 тест өтті')
`, check: { tests: P`_real = predict_endpoint
for _t in (test_valid_returns_200, test_missing_field_422, test_more_calls_higher_risk):
    _t()
def _breaks(_fn):
    try:
        _fn()
    except Exception:
        return True
    return False
predict_endpoint = lambda p: (200, {'churn_proba': 0.5, 'will_churn': True, 'model_version': MODEL_VERSION})
assert _breaks(test_missing_field_422), 'Валидациясыз сервис әр сұрауға 200 береді: test_missing_field_422 оны ұстауы керек (status == 422 тексеріңіз)'
assert _breaks(test_more_calls_higher_risk), 'Тұрақты 0.5 қайтаратын сервисті test_more_calls_higher_risk ұстауы керек (high > low)'
predict_endpoint = lambda p: (200, {'churn_proba': 1.7, 'will_churn': True, 'model_version': MODEL_VERSION})
assert _breaks(test_valid_returns_200), 'proba = 1.7 қайтаратын сервисті test_valid_returns_200 ұстауы керек (0 ≤ proba ≤ 1)'
predict_endpoint = lambda p: (500, {'error': 'internal'})
assert _breaks(test_valid_returns_200), '500 қайтаратын сервисті test_valid_returns_200 ұстауы керек (status == 200)'
predict_endpoint = _real`, mustInclude: ['assert'] }, hints: ['<code>status, body = predict_endpoint(BASE)</code>, сосын <code>assert status == 200</code> және proba аралығы', "<code>dict(BASE, support_calls=0)</code> мен <code>dict(BASE, support_calls=5)</code> жауаптарын салыстырыңыз"] },
          { type: 'python', xp: 20, prompt: '<code>psi(expected, actual, bins=5)</code> жазыңыз: bin шекаралары — <code>expected</code>-тің квантильдері (<code>np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))</code>, шеттері <code>-inf</code>/<code>inf</code>), үлестерді <code>np.clip(..., 1e-4, None)</code>-мен шектеңіз. <code>psi_same</code> (train vs test tenure) және <code>psi_new</code> (train vs <code>new_month</code> tenure) есептеп, <code>status(psi)</code> функциясымен (<code>"ok"</code> &lt; 0.1 ≤ <code>"watch"</code> ≤ 0.25 &lt; <code>"alert"</code>) <code>new_status</code> алыңыз.', starter: CS + P`new_month = churn.sample(200, random_state=7).copy()
new_month['tenure_months'] = (new_month['tenure_months'] * 0.4).round().clip(lower=1)

def psi(expected, actual, bins=5):
    return 0.0

def status(value):
    return 'ok'

psi_same = psi(X_train['tenure_months'], X_test['tenure_months'])
psi_new = psi(X_train['tenure_months'], new_month['tenure_months'])
new_status = status(psi_new)
print(psi_same, psi_new, new_status)
`, solution: CS + P`new_month = churn.sample(200, random_state=7).copy()
new_month['tenure_months'] = (new_month['tenure_months'] * 0.4).round().clip(lower=1)

def psi(expected, actual, bins=5):
    expected = np.asarray(expected, dtype=float)
    actual = np.asarray(actual, dtype=float)
    edges = np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))
    edges[0], edges[-1] = -np.inf, np.inf
    e = np.histogram(expected, edges)[0] / len(expected)
    a = np.histogram(actual, edges)[0] / len(actual)
    e = np.clip(e, 1e-4, None)
    a = np.clip(a, 1e-4, None)
    return float(np.sum((a - e) * np.log(a / e)))

def status(value):
    if value < 0.1:
        return 'ok'
    if value <= 0.25:
        return 'watch'
    return 'alert'

psi_same = psi(X_train['tenure_months'], X_test['tenure_months'])
psi_new = psi(X_train['tenure_months'], new_month['tenure_months'])
new_status = status(psi_new)
print(psi_same, psi_new, new_status)
`, check: { tests: P`import numpy as _np
assert abs(psi_same - 0.0693) < 0.005, f'psi_same ≈ 0.069 болуы керек, сізде {psi_same:.4f}'
assert abs(psi_new - 3.557) < 0.02, f'psi_new ≈ 3.56 болуы керек, сізде {psi_new:.3f}'
assert abs(psi(_np.arange(100), _np.arange(100))) < 1e-9, 'Бірдей таралуда PSI = 0'
assert status(0.05) == 'ok' and status(0.1) == 'watch' and status(0.25) == 'watch' and status(0.3) == 'alert', 'status: < 0.1 ok, 0.1–0.25 watch, > 0.25 alert'
assert new_status == 'alert', 'new_month үшін alert болуы керек'` }, hints: ['<code>e = np.histogram(expected, edges)[0] / len(expected)</code>, actual үшін де солай', '<code>np.sum((a - e) * np.log(a / e))</code>'] },
          { type: 'rubric', xp: 30, minWords: 80, done: 'Бұл — README-дің «Monitoring» бөлімі және сұхбаттағы «модельді production-да қалай бақылайсыз?» сұрағына дайын жауап.', prompt: 'Churn сервисінің мониторинг жоспарын жазыңыз (кемінде 80 сөз): не логталады, қандай метрикалар мен шектер (сервис, drift, сапа), шын жауаптар кеш келетінін қалай ескересіз, alert кімге барады, қайта үйрету қашан және қалай жасалады. Сосын адал бағалаңыз: әр критерий кемінде <b>3 / 4</b>.', criteria: [
            { name: 'Не логталады', levels: ['Айтылмаған', '«Бәрін логтаймыз»', 'Кіріс белгілері, proba, model_version, уақыт, статус', 'Сонымен қатар request id, latency және дербес деректі логқа жібермеу'] },
            { name: 'Метрикалар мен шектер', levels: ['Жоқ', 'Метрикалар аталған, шексіз', 'Сервис, drift (PSI) және сапа метрикалары нақты шектермен', 'Сонымен қатар болжамдар таралуы және шын жауаптың кешігуін ескеру'] },
            { name: 'Әрекет жоспары', levels: ['Жоқ', '«Модельді жаңартамыз»', 'Alert кімге барады және қайта үйрету шарты', 'Себепті тексеру қадамдары, қайта үйрету, жаңа нұсқаны test/shadow арқылы шығару және rollback'] }
          ] }
        ]
      },
      {
        id: 'cap6-gate', gate: true, title: 'Қорытынды жоба: Churn ML сервисі', minutes: 45,
        body: `
<p>Соңғы кезең: шекті бизнес бойынша таңдау, толық endpoint пен batch endpoint, drift есебі және портфолиоға арналған README. Кеңестер жоқ, өту шегі — 75%. Дайын болғанда жобаны GitHub-қа салыңыз: <code>src/</code> (train.py, service.py), <code>tests/</code>, <code>models/</code> (artifact + meta), <code>Dockerfile</code>, <code>README.md</code>.</p>
<h3>Ұсынылатын репозиторий құрылымы</h3>
<pre><code>churn-service/
├── src/train.py          # дерек → pipeline → churn_model.pkl + model_meta.json
├── src/service.py        # FastAPI: /health, /predict, /predict_batch
├── tests/test_api.py     # unit, contract, directional, quality gate
├── monitoring/drift.py   # PSI есебі, cron немесе Airflow
├── Dockerfile            # python:3.11-slim, requirements.txt, uvicorn
├── .github/workflows/ci.yml   # pytest + quality gate
└── README.md</code></pre>`,
        exercises: [
          { type: 'python', xp: 40, prompt: 'Шекті таңдау. Train бөлігі қайта <code>X_fit</code>/<code>X_val</code>-ға бөлінген. Compact pipeline-ды <code>model</code> атымен <code>X_fit</code>-те үйретіңіз. <code>[0.1, 0.15, …, 0.8]</code> шектерінің ішінен validation-да <code>campaign_profit</code>-ты максималдайтынын <code>best_threshold</code>-қа, сол пайданы <code>val_profit</code>-қа жазыңыз. Сосын test-те сол шекпен <code>test_profit</code> есептеңіз.', starter: CS + PROFIT + P`from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
X_fit, X_val, y_fit, y_val = train_test_split(X_train, y_train, test_size=0.3, random_state=0, stratify=y_train)
thresholds = np.round(np.arange(0.1, 0.81, 0.05), 2)
`, solution: CS + PROFIT + P`from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
X_fit, X_val, y_fit, y_val = train_test_split(X_train, y_train, test_size=0.3, random_state=0, stratify=y_train)
thresholds = np.round(np.arange(0.1, 0.81, 0.05), 2)

model = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))
model.fit(X_fit[FEATURES], y_fit)
p_val = model.predict_proba(X_val[FEATURES])[:, 1]
profits = {t: campaign_profit(y_val, (p_val >= t).astype(int)) for t in thresholds}
best_threshold = max(profits, key=profits.get)
val_profit = profits[best_threshold]
p_test = model.predict_proba(X_test[FEATURES])[:, 1]
test_profit = campaign_profit(y_test, (p_test >= best_threshold).astype(int))
print(best_threshold, val_profit, test_profit)
`, check: { tests: P`assert hasattr(model, 'predict_proba') and model.n_features_in_ == 4, 'model — FEATURES-те үйретілген compact pipeline'
assert len(X_fit) == 315, 'Бөлуді өзгертпеңіз'
assert abs(float(best_threshold) - 0.2) < 1e-9, f'best_threshold = 0.2 болуы керек, сізде {best_threshold}. Шекті validation-да таңдаңыз, test-те емес'
assert abs(val_profit - 222000) < 1, f'val_profit = 222 000 болуы керек, сізде {val_profit}'
assert abs(test_profit - 218000) < 1, f'test_profit = 218 000 болуы керек, сізде {test_profit}'` }, hints: [] },
          { type: 'python', xp: 40, prompt: 'Endpoint-тер. <code>RULES</code> мен модель дайын. (1) <code>predict_endpoint(payload)</code>: cap6-4-тегі ережелер бойынша валидация, қате болса <code>(422, {"errors": [...]})</code>, әйтпесе <code>(200, {"churn_proba", "will_churn", "model_version"})</code>. (2) <code>predict_batch(records)</code>: бос немесе тізім емес → <code>(422, ...)</code>; 100-ден көп → <code>(413, ...)</code>; әйтпесе <code>(200, {"results": [...], "n_ok": k, "n_errors": m})</code>, мұнда әр нәтиже <code>{"index": i, "status": s, **body}</code>. Бір қате жазба бүкіл batch-ты құлатпауы керек.', starter: MS + P`RULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}
`, solution: MS + VALIDATE + '\n' + ENDPOINT + P`
def predict_batch(records):
    if not isinstance(records, list) or len(records) == 0:
        return 422, {'errors': ['records: бос емес тізім керек']}
    if len(records) > 100:
        return 413, {'errors': ['records: ең көбі 100 жазба']}
    results = []
    for i, rec in enumerate(records):
        s, body = predict_endpoint(rec)
        results.append({'index': i, 'status': s, **body})
    n_ok = sum(r['status'] == 200 for r in results)
    return 200, {'results': results, 'n_ok': n_ok, 'n_errors': len(results) - n_ok}
`, check: { tests: P`import pandas as _pd
_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
_s, _b = predict_endpoint(_ok)
_p = float(model.predict_proba(_pd.DataFrame([{f: _ok[f] for f in FEATURES}]))[0, 1])
assert _s == 200 and abs(_b['churn_proba'] - round(_p, 4)) < 1e-9 and _b['will_churn'] == (_p >= THRESHOLD) and _b['model_version'] == MODEL_VERSION, 'predict_endpoint дұрыс payload-та 200 және дұрыс жауап беруі керек'
for _bad in ({}, dict(_ok, has_contract=True), dict(_ok, monthly_fee='6500'), dict(_ok, tenure_months=-3), 'text'):
    _s, _b = predict_endpoint(_bad)
    assert _s == 422 and _b.get('errors'), f'Қате payload {_bad!r}: 422 және errors керек'
_s, _b = predict_batch([_ok, {'tenure_months': 5}, dict(_ok, support_calls=0)])
assert _s == 200 and _b['n_ok'] == 2 and _b['n_errors'] == 1, 'Batch: 2 сәтті, 1 қате'
assert [r['index'] for r in _b['results']] == [0, 1, 2] and _b['results'][1]['status'] == 422, 'results әр жазбаға index пен status береді'
assert _b['results'][0]['churn_proba'] > _b['results'][2]['churn_proba'], 'results-та churn_proba болуы керек'
assert predict_batch([])[0] == 422 and predict_batch('x')[0] == 422, 'Бос немесе тізім емес batch: 422'
assert predict_batch([_ok] * 101)[0] == 413, '100-ден көп жазба: 413'` }, hints: [] },
          { type: 'python', xp: 35, prompt: 'Drift есебі. <code>psi</code> дайын. <code>drift_report(ref, new, cols, threshold=0.25)</code> жазыңыз: <code>(scores, alerts)</code> қайтарсын, мұнда <code>scores = {баған: psi}</code>, <code>alerts</code> — PSI шектен жоғары бағандар (алфавит бойынша сұрыпталған тізім). Тарифтер 15%-ға қымбаттаған <code>new_month</code> үшін <code>scores, alerts = drift_report(X_train, new_month, ["tenure_months", "monthly_fee", "support_calls"])</code> есептеңіз.', starter: CS + P`new_month = churn.sample(200, random_state=3).copy()
new_month['monthly_fee'] = (new_month['monthly_fee'] * 1.15).round(-2)

def psi(expected, actual, bins=5):
    expected = np.asarray(expected, dtype=float)
    actual = np.asarray(actual, dtype=float)
    edges = np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))
    edges[0], edges[-1] = -np.inf, np.inf
    e = np.clip(np.histogram(expected, edges)[0] / len(expected), 1e-4, None)
    a = np.clip(np.histogram(actual, edges)[0] / len(actual), 1e-4, None)
    return float(np.sum((a - e) * np.log(a / e)))
`, solution: CS + P`new_month = churn.sample(200, random_state=3).copy()
new_month['monthly_fee'] = (new_month['monthly_fee'] * 1.15).round(-2)

def psi(expected, actual, bins=5):
    expected = np.asarray(expected, dtype=float)
    actual = np.asarray(actual, dtype=float)
    edges = np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))
    edges[0], edges[-1] = -np.inf, np.inf
    e = np.clip(np.histogram(expected, edges)[0] / len(expected), 1e-4, None)
    a = np.clip(np.histogram(actual, edges)[0] / len(actual), 1e-4, None)
    return float(np.sum((a - e) * np.log(a / e)))

def drift_report(ref, new, cols, threshold=0.25):
    scores = {c: psi(ref[c], new[c]) for c in cols}
    alerts = sorted(c for c, v in scores.items() if v > threshold)
    return scores, alerts

scores, alerts = drift_report(X_train, new_month, ['tenure_months', 'monthly_fee', 'support_calls'])
print(scores, alerts)
`, check: { tests: P`assert set(scores) == {'tenure_months', 'monthly_fee', 'support_calls'}, 'scores-та үш баған болуы керек'
assert abs(scores['monthly_fee'] - psi(X_train['monthly_fee'], new_month['monthly_fee'])) < 1e-9, 'scores[баған] = psi(ref[баған], new[баған])'
assert alerts == ['monthly_fee'], f"alerts = ['monthly_fee'] болуы керек, сізде {alerts}"
_s, _a = drift_report(X_train, X_train, ['tenure_months', 'support_calls'])
assert _a == [] and all(abs(v) < 1e-9 for v in _s.values()), 'Бірдей деректе alert жоқ'
_s, _a = drift_report(X_train, new_month, ['monthly_fee', 'tenure_months'], threshold=0.0)
assert _a == ['monthly_fee', 'tenure_months'], 'alerts алфавит бойынша сұрыпталсын және threshold параметрін қолдансын'` }, hints: [] },
          { type: 'quiz', xp: 30, prompt: 'Жаңа тарифтерден кейін <code>monthly_fee</code> бойынша PSI = 5.8 (alert), ал шын churn жауаптары тек 2 айдан кейін белгілі болады. Ең дұрыс әрекет?', options: ['Ескерту — сервисті бірден өшіру', 'Ештеңе жасамау: AUC әлі белгісіз', 'Себепті растау (тариф өзгерісі, pipeline қатесі емес), болжамдар таралуын қарау, monthly_fee-ді тарифке қатысты етіп өзгерту немесе жаңа дерекпен қайта үйретуді жоспарлау, жаңа нұсқаны shadow режимінде тексеру', 'monthly_fee бағанын модельден тез алып тастап, тестсіз deploy жасау'], answer: 2, explain: 'Drift — тергеудің басы. Себепті тауып, модельге әсерін (болжамдар таралуы) бағалап, бақыланатын түрде жаңартамыз: shadow/canary, тесттер, rollback жоспары.' },
          { type: 'rubric', xp: 40, minWords: 120, done: 'Құттықтаймыз — бұл портфолиоңыздағы ең күшті жоба. README-ді GitHub-та pin жасаңыз, 2 минуттық demo видео (curl /predict, тесттер, drift есебі) қосыңыз. Резюмеге: «Churn prediction сервисі: sklearn pipeline, FastAPI + pydantic валидация, pytest (contract + directional), PSI drift мониторингі, Docker; бизнес шегі бойынша +218 000 ₸ test пайдасы».', prompt: 'Жобаның <b>README.md</b> мәтінін жазыңыз (кемінде 120 сөз): Problem (cap6-1), Data & baseline, Model (неге compact, CV/test нәтижелері, шек және ₸ пайда), API (endpoint-тер, мысал сұрау/жауап, қате кодтары), Testing, Monitoring, Қалай іске қосу (Docker/uvicorn) және Limitations. Соңына 2 минуттық demo сценарийін (3–5 қадам) қосыңыз. Сосын адал бағалаңыз: әр критерий кемінде <b>3 / 4</b>.', criteria: [
            { name: 'Құрылым және толықтық', levels: ['Тек код сипаттамасы', 'Бірнеше бөлім бар, бірақ Problem немесе API жоқ', 'Барлық негізгі бөлім бар', 'Барлық бөлім және бірінші абзацтан жобаның құндылығы түсінікті'] },
            { name: 'Сандар және шешімдер', levels: ['Сандар жоқ', 'Тек бір метрика', 'Baseline, CV/test AUC, шек және ₸ пайда', 'Сандар және әр шешімнің негіздемесі (неге compact, неге шек 0.2/0.3)'] },
            { name: 'Қайталанатындық', levels: ['Іске қосу нұсқауы жоқ', 'Жалпы («Docker арқылы іске қосыңыз»)', 'Нақты командалар және мысал сұрау/жауап', 'Командалар, нұсқалар бекітілген, тесттерді іске қосу және demo сценарийі'] },
            { name: 'Шектеулер және келесі қадамдар', levels: ['Жоқ', 'Жалпы сөз', 'Нақты шектеулер (дерек көлемі, 30% болжамы, кеш жауаптар)', 'Шектеулер, тәуекелдер және нақты келесі қадамдар (пилот, batch скоринг, қайта үйрету кестесі)'] }
          ] }
        ]
      }
    ]
  };
})();
