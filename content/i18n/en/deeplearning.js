// M6.4 Deep Learning Intro and M6.6 ML Capstone: English text. Code, solutions and expected output are in content/deeplearning.js.
DJ.i18n.patch({
  modules: {
    'm6-4': { intro: 'You will see from the inside how neural networks "learn": with numpy you write a neuron, a forward pass, a loss, gradient descent and backpropagation, and train a small network that solves XOR yourself. Then you move the same steps to PyTorch and get the idea behind CNNs and transfer learning.' },
    'm6-6': { intro: 'The churn model you built in a notebook in M5 now becomes a real service: defining the problem and the success metric, data and a baseline, a saved model artifact, a predict endpoint with validation, tests, drift monitoring and a README. All the ideas of modules M6.1–M6.3 come together in one project.' }
  },
  lessons: {
    'dl-1': {
      title: 'The neuron and activation functions',
      body: `
<p>The building block of deep learning is the <b>neuron</b>. It does a very simple calculation: multiplies the inputs by weights and adds them up, adds a bias, then passes the result through an <b>activation function</b>.</p>
<pre><code>z = w1·x1 + w2·x2 + ... + b      # linear part
a = f(z)                          # activation</code></pre>
<p>You already know this: logistic regression is exactly one such neuron, where <code>f</code> is the sigmoid. A neural network is many such neurons connected layer by layer.</p>
<h3>Main activation functions</h3>
<table>
<tr><th>Name</th><th>Formula</th><th>Where</th></tr>
<tr><td>sigmoid</td><td>1 / (1 + e<sup>−z</sup>), values 0…1</td><td>two-class output (probability)</td></tr>
<tr><td>tanh</td><td>values −1…1, symmetric around zero</td><td>hidden layers, RNN</td></tr>
<tr><td>ReLU</td><td>max(0, z)</td><td>default choice in hidden layers</td></tr>
<tr><td>softmax</td><td>e<sup>z_i</sup> / Σ e<sup>z_j</sup></td><td>multi-class output, sums to 1</td></tr>
</table>
<h3>Step-by-step example</h3>
<p>A Kaspi-style shop predicts whether a customer will buy. Two features: minutes spent on the site <code>x1 = 3</code> and items in the cart <code>x2 = 2</code>. Weights <code>w = [0.4, 0.5]</code>, <code>b = −1.5</code>.</p>
<ol>
<li>z = 0.4·3 + 0.5·2 − 1.5 = 1.2 + 1.0 − 1.5 = 0.7</li>
<li>sigmoid(0.7) ≈ 0.668 — the purchase probability is about 67%.</li>
<li>ReLU(0.7) = 0.7, while ReLU(−0.7) = 0.</li>
</ol>
<pre><code>import numpy as np
x = np.array([3.0, 2.0])
w = np.array([0.4, 0.5])
b = -1.5
z = x @ w + b          # 0.7
print(1 / (1 + np.exp(-z)))   # 0.668</code></pre>
<h3>Why is activation required?</h3>
<p>Without activation, two linear layers in a row still give one linear function: W2(W1·x) = (W2·W1)·x. So even 100 layers would be no stronger than one logistic regression. A non-linear function (ReLU, tanh) lets the network learn curved boundaries.</p>
<div class="tip">Use ReLU as the default in hidden layers: it is fast to compute, and in deep networks the gradient "dies out" (vanishing gradient) much less often than with sigmoid.</div>
<h3>Common mistakes</h3>
<ul>
<li>Putting ReLU on the output layer when you need a probability: you need sigmoid or softmax.</li>
<li>Using <code>math.exp</code> on an array instead of <code>np.exp</code>: <code>math</code> works only with a single number.</li>
</ul>`,
      ex: [
        { prompt: 'Write three functions: <code>sigmoid(z)</code>, <code>relu(z)</code> and <code>neuron(x, w, b)</code>. They should work with numpy arrays. <code>neuron</code> returns sigmoid(x @ w + b).', check: { tests: String.raw`import numpy as _np
_z = _np.array([-2.0, 0.0, 0.7])
assert _np.allclose(sigmoid(_z), 1 / (1 + _np.exp(-_z))), 'sigmoid(z) should be 1 / (1 + np.exp(-z))'
assert _np.allclose(relu(_z), [0.0, 0.0, 0.7]), 'relu turns negative values into 0: np.maximum(0, z)'
_o = neuron(_np.array([3.0, 2.0]), _np.array([0.4, 0.5]), -1.5)
assert abs(float(_o) - 0.6682) < 1e-3, f'neuron should return ≈ 0.668, you have {_o}'` }, hints: ['<code>np.exp(-z)</code> works on every element of the array', '<code>np.maximum(0, z)</code> is an element-wise maximum'] },
        { prompt: 'Write softmax: <code>softmax(z)</code> takes a 1D array and returns probabilities that sum to 1. So that <code>exp</code> does not overflow on large numbers, take <code>z - z.max()</code> first. Compute <code>probs = softmax(np.array([2.0, 1.0, 0.1]))</code>.', check: { tests: String.raw`import numpy as _np
assert abs(float(_np.sum(probs)) - 1) < 1e-9, 'The probabilities should sum to 1: e / e.sum()'
assert _np.allclose(probs, [0.659, 0.242, 0.099], atol=1e-3), f'probs should be ≈ [0.659, 0.242, 0.099], you have {probs}'
_big = softmax(_np.array([1000.0, 1000.0]))
assert _np.allclose(_big, [0.5, 0.5]), 'Large numbers must not give nan: take z - z.max() first'` }, hints: ['<code>e = np.exp(z - z.max())</code>', '<code>return e / e.sum()</code>'] },
        { prompt: 'A neuron: w = [0.5, −1.0], b = 0.2, input x = [2, 1]. What is the output after the ReLU activation?', explain: 'z = 0.5·2 − 1·1 + 0.2 = 0.2. ReLU(0.2) = 0.2.' },
        { prompt: 'What happens if we remove activation completely from a three-layer network?', options: ['The network learns faster and more accurately', 'The network becomes equal to one linear model', 'The network predicts only whole numbers', 'Nothing changes'], explain: 'A composition of linear functions is also linear: W3·W2·W1 collapses into one matrix. To learn a curved boundary you need a non-linear activation.' }
      ]
    },
    'dl-2': {
      title: 'MLP: the forward pass with numpy',
      body: `
<p>An <b>MLP</b> (multi-layer perceptron) is a network made of several fully connected layers (<code>Linear</code> in PyTorch). Each layer is one matrix multiplication: it computes for all examples and all neurons at once.</p>
<pre><code>H = relu(X @ W1 + b1)      # hidden layer
P = sigmoid(H @ W2 + b2)   # output</code></pre>
<h3>Shapes are the most important check</h3>
<table>
<tr><th>Array</th><th>Shape</th><th>Meaning</th></tr>
<tr><td>X</td><td>(n, 3)</td><td>n examples, 3 features</td></tr>
<tr><td>W1</td><td>(3, 4)</td><td>3 inputs → 4 hidden neurons</td></tr>
<tr><td>b1</td><td>(4,)</td><td>one bias per hidden neuron</td></tr>
<tr><td>H</td><td>(n, 4)</td><td>the hidden representation of each example</td></tr>
<tr><td>W2</td><td>(4, 1)</td><td>4 hidden → 1 output</td></tr>
<tr><td>P</td><td>(n, 1)</td><td>one probability per example</td></tr>
</table>
<p>The rule: <code>(n, a) @ (a, b) → (n, b)</code>. If the middle dimensions do not match, numpy raises a <i>shapes not aligned</i> error. The bias is added to every row through broadcasting.</p>
<h3>Number of parameters</h3>
<p>One <code>Linear(a, b)</code> layer has <code>a·b</code> weights and <code>b</code> biases. In the 3 → 4 → 1 network above: 3·4 + 4 = 16 and 4·1 + 1 = 5, 21 parameters in total. ResNet-50 for ImageNet has about 25 million — but the principle is the same.</p>
<h3>Step-by-step example</h3>
<pre><code>import numpy as np
X = np.array([[1.0, 0.0, 2.0]])          # (1, 3)
W1 = np.array([[ 0.2, -0.5, 0.1, 0.0],
               [ 0.4,  0.3, 0.0, 0.1],
               [-0.1,  0.2, 0.3, 0.5]])  # (3, 4)
b1 = np.zeros(4)
H = np.maximum(0, X @ W1 + b1)
print(H)   # [[0.  0.  0.7 1. ]]</code></pre>
<p>The first neuron: 1·0.2 + 0·0.4 + 2·(−0.1) = 0 → ReLU → 0. The third: 0.1 + 0.6 = 0.7. Doing this calculation by hand once helps you understand what matrix multiplication does.</p>
<div class="tip">When you write a forward pass, put <code>print(H.shape)</code> after each step. Half of the bugs in deep learning are shape bugs.</div>
<h3>Common mistakes</h3>
<ul>
<li>Swapping the order to <code>W1 @ X</code>: in our convention examples are in rows, so it is <code>X @ W1</code>.</li>
<li>Mixing up element-wise (<code>*</code>) and matrix (<code>@</code>) multiplication.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>forward(X, W1, b1, W2, b2)</code>: ReLU in the hidden layer, sigmoid at the output. It should return the output probabilities with shape <code>(n, 1)</code>. With the given weights compute <code>P = forward(X, W1, b1, W2, b2)</code>.', check: { tests: String.raw`import numpy as _np
_H = _np.maximum(0, X @ W1 + b1)
_P = 1 / (1 + _np.exp(-(_H @ W2 + b2)))
assert _np.shape(P) == (2, 1), f'P should have shape (2, 1), you have {_np.shape(P)}'
assert _np.allclose(P, _P), 'You need ReLU in the hidden layer and sigmoid at the output'
_X2 = _np.random.default_rng(1).normal(size=(5, 3))
assert _np.allclose(forward(_X2, W1, b1, W2, b2), 1 / (1 + _np.exp(-(_np.maximum(0, _X2 @ W1 + b1) @ W2 + b2)))), 'forward should work correctly for any X'` }, hints: ['<code>H = np.maximum(0, X @ W1 + b1)</code>', '<code>return 1 / (1 + np.exp(-(H @ W2 + b2)))</code>'] },
        { prompt: 'Write the function <code>n_params(layers)</code>: <code>layers</code> is a list of layer sizes, for example <code>[3, 4, 1]</code>. Each neighbouring pair <code>(a, b)</code> gives <code>a·b + b</code> parameters. Store the result for <code>[784, 128, 10]</code> in <code>mnist_params</code>.', check: { tests: String.raw`assert n_params([3, 4, 1]) == 21, f'For [3, 4, 1] it should be 21, you have {n_params([3, 4, 1])}'
assert n_params([2, 2]) == 6, '[2, 2]: 2·2 + 2 = 6'
assert mnist_params == 101770, f'mnist_params should be 784·128 + 128 + 128·10 + 10 = 101770, you have {mnist_params}'` }, hints: ['<code>zip(layers[:-1], layers[1:])</code> gives the neighbouring pairs', 'For each pair add <code>a * b + b</code>'] },
        { prompt: '<code>X</code> has shape (32, 10), <code>W1</code> has shape (10, 64), <code>W2</code> has shape (64, 3). What is the shape of <code>relu(X @ W1) @ W2</code>?', options: ['(10, 3)', '(32, 64)', '(32, 3)', '(64, 3)'], explain: '(32, 10) @ (10, 64) → (32, 64); ReLU does not change the shape; (32, 64) @ (64, 3) → (32, 3): a score for 3 classes for each of the 32 examples.' }
      ]
    },
    'dl-3': {
      title: 'Loss functions',
      body: `
<p>For a network to learn, we need to measure with one number how wrong it is. That number is the <b>loss</b>. Training is a search for the weights that make the loss smaller.</p>
<h3>Loss by task</h3>
<table>
<tr><th>Task</th><th>Output activation</th><th>Loss</th><th>PyTorch</th></tr>
<tr><td>Regression (apartment price)</td><td>none (linear)</td><td>MSE</td><td><code>nn.MSELoss</code></td></tr>
<tr><td>Two classes (churn)</td><td>sigmoid</td><td>binary cross-entropy</td><td><code>nn.BCEWithLogitsLoss</code></td></tr>
<tr><td>Many classes (image: cat/dog/bird)</td><td>softmax</td><td>cross-entropy</td><td><code>nn.CrossEntropyLoss</code></td></tr>
</table>
<h3>Binary cross-entropy</h3>
<pre><code>BCE = −mean( y·log(p) + (1 − y)·log(1 − p) )</code></pre>
<p>What it means: if the true answer is y = 1, only −log(p) remains. If the model says p = 0.9, loss = 0.105 (small). If it says p = 0.1, loss = 2.303 (large). So a confident wrong prediction is punished hard. Accuracy does not see this: for it 0.51 and 0.99 are equally "correct".</p>
<h3>Step-by-step example</h3>
<p>Three subscribers: y = [1, 0, 1], model probabilities p = [0.8, 0.3, 0.6].</p>
<ol>
<li>Subscriber 1: −log(0.8) = 0.223</li>
<li>Subscriber 2: −log(1 − 0.3) = −log(0.7) = 0.357</li>
<li>Subscriber 3: −log(0.6) = 0.511</li>
<li>Mean: (0.223 + 0.357 + 0.511) / 3 ≈ 0.364</li>
</ol>
<pre><code>import numpy as np
y = np.array([1, 0, 1]); p = np.array([0.8, 0.3, 0.6])
print(-np.mean(y*np.log(p) + (1-y)*np.log(1-p)))   # 0.364</code></pre>
<h3>Why not minimize accuracy directly?</h3>
<p>Gradient descent needs the loss to change <b>smoothly</b>: a small change in a weight should give a small change in the loss. Accuracy jumps like a staircase, and its gradient is zero everywhere. That is why we train with cross-entropy, and in the report for the business we show accuracy, recall, ₸.</p>
<div class="tip">When p = 0 or 1, log(0) = −∞. In practice p is clipped with <code>np.clip(p, 1e-7, 1 - 1e-7)</code>. In PyTorch <code>BCEWithLogitsLoss</code> handles this internally, so you give it the number before the sigmoid (the logit).</div>
<h3>Common mistakes</h3>
<ul>
<li>Using MSE for classification: it works, but learns slowly.</li>
<li>Passing probabilities after softmax to <code>CrossEntropyLoss</code>: it expects logits, softmax is already inside.</li>
</ul>`,
      ex: [
        { prompt: 'Write the functions <code>mse(y, pred)</code> and <code>bce(y, p)</code>. Inside <code>bce</code>, clip <code>p</code> with <code>np.clip(p, 1e-7, 1 - 1e-7)</code>. For the subscribers in the example compute <code>loss = bce(y, p)</code>.', check: { tests: String.raw`import numpy as _np
assert abs(mse(_np.array([1.0, 2.0]), _np.array([2.0, 4.0])) - 2.5) < 1e-9, 'mse = mean((y - pred)**2): 2.5 for [1,2] and [2,4]'
assert abs(loss - 0.3635) < 1e-3, f'loss should be ≈ 0.364, you have {loss}'
_v = bce(_np.array([1, 0]), _np.array([1.0, 0.0]))
assert _np.isfinite(_v) and _v < 1e-5, 'p = 0 or 1 must not give nan/inf: use np.clip'` }, hints: ['<code>np.mean((y - pred) ** 2)</code>', '<code>-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))</code>'] },
        { prompt: 'The subscriber really left (y = 1), and the model gave them p = 0.1. What is the BCE loss of this one example? (natural log, three decimals)', explain: '−log(0.1) ≈ 2.303. A confident wrong prediction gives a large loss.' },
        { prompt: 'A model sorts images into 5 categories (only one is correct). Which output and which loss?', options: ['ReLU + MSE', 'sigmoid + BCE separately for each class', 'softmax + cross-entropy', 'No output activation + MAE'], explain: 'A multi-class task with one correct answer: softmax probabilities and cross-entropy. In PyTorch nn.CrossEntropyLoss takes logits and does the softmax internally.' }
      ]
    },
    'dl-4': {
      title: 'Gradient descent and backpropagation',
      body: `
<p>We have a loss, now we need to make it smaller. <b>Gradient descent</b>: for each weight we find the answer to "if I increase this weight a little, how does the loss change?" (the derivative, the gradient) and move the weight in the opposite direction.</p>
<pre><code>w = w − lr · ∂loss/∂w</code></pre>
<p><code>lr</code> (learning rate) is the step size. If it is too small, training is very slow; if it is too large, the loss jumps around and can even grow.</p>
<h3>Backpropagation is the chain rule</h3>
<p>In a network the loss is linked to a weight not directly but through several steps: w → z → p → loss. We find the derivative by multiplying along the <b>chain rule</b>:</p>
<pre><code>∂loss/∂w = ∂loss/∂p · ∂p/∂z · ∂z/∂w</code></pre>
<p>Backpropagation computes these products from the output back to the input, layer by layer. Each layer takes the gradient coming from the next layer, multiplies it by its own derivative and passes it back.</p>
<h3>Step-by-step example: one sigmoid neuron + BCE</h3>
<p>Sigmoid and BCE together simplify very nicely: <code>∂loss/∂z = p − y</code>. So for n examples:</p>
<pre><code>p  = sigmoid(X @ w + b)
dz = (p - y) / n          # the "error" of each example
dw = X.T @ dz             # for each weight
db = dz.sum()
w -= lr * dw;  b -= lr * db</code></pre>
<p>Example: one subscriber x = [1, 2], y = 1, w = [0, 0], b = 0. Then z = 0, p = 0.5, dz = −0.5, dw = [−0.5, −1.0]. With lr = 0.1 the new w = [0.05, 0.1]: the model starts giving this subscriber a higher probability.</p>
<h3>Checking the gradient</h3>
<p>It is easy to make a mistake in backprop. It is checked with a <b>numerical gradient</b>: change the weight by ε and divide the difference in loss:</p>
<pre><code>(loss(w + ε) − loss(w − ε)) / (2ε)</code></pre>
<p>This is slow (two forward passes per weight), but reliable. If the two results match to 1e-6, backprop is correct. In PyTorch <code>autograd</code> does this automatically, but knowing the idea helps with debugging.</p>
<div class="tip">Derivatives of three common functions: sigmoid′ = p(1 − p), tanh′ = 1 − h², ReLU′ = 1 (if z &gt; 0), otherwise 0.</div>
<h3>Common mistakes</h3>
<ul>
<li>Not dividing the gradient by <code>n</code>: as the batch grows the step grows too, and training diverges.</li>
<li>Moving the weight along the gradient (<code>+=</code>): the loss grows.</li>
</ul>`,
      ex: [
        { prompt: 'Update one sigmoid neuron with one step of gradient descent. Compute <code>p</code>, <code>dw</code>, <code>db</code> and update <code>w</code> and <code>b</code> with <code>lr = 0.5</code>. The loss after the update, <code>loss_after</code>, should be smaller than the earlier <code>loss_before</code>.', check: { tests: String.raw`import numpy as _np
_X = _np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]]); _y = _np.array([1, 0, 1, 0])
_w = _np.array([0.1, -0.2]); _p = 1 / (1 + _np.exp(-(_X @ _w)))
_dz = (_p - _y) / 4
assert _np.allclose(dw, _X.T @ _dz), 'dw = X.T @ ((p - y) / n)'
assert abs(float(db) - _dz.sum()) < 1e-9, 'db = ((p - y) / n).sum()'
assert _np.allclose(w, _w - 0.5 * (_X.T @ _dz)), 'w = w - lr * dw'
assert loss_after < loss_before, 'After one step the loss should go down'` }, hints: ['<code>dz = (p - y) / len(X)</code>', '<code>dw = X.T @ dz</code>, <code>db = dz.sum()</code>'] },
        { prompt: 'Checking with a numerical gradient. Write the function <code>num_grad(f, w, eps=1e-5)</code>: for each element of <code>w</code> it computes <code>(f(w + ε·e_i) − f(w − ε·e_i)) / (2ε)</code> and returns an array. Then compute <code>g_num = num_grad(loss_fn, w)</code>: it should match the analytic <code>g_an</code>.', check: { tests: String.raw`import numpy as _np
assert _np.allclose(g_num, g_an, atol=1e-6), f'g_num should match g_an: {g_num} and {g_an}'
assert _np.allclose(num_grad(lambda v: (v ** 2).sum(), _np.array([1.0, -2.0, 3.0])), [2.0, -4.0, 6.0], atol=1e-4), 'num_grad should work for any f: the derivative of x² is 2x'` }, hints: ['For each <code>i</code>: <code>e = np.zeros_like(w); e[i] = eps</code>', '<code>g[i] = (f(w + e) - f(w - e)) / (2 * eps)</code>'] },
        { prompt: 'Chain rule: y = (3x + 1)². What is dy/dx at x = 1?', explain: 'Inner u = 3x + 1 = 4. dy/du = 2u = 8, du/dx = 3. The product: 8 · 3 = 24.' },
        { prompt: 'During training the loss grew every epoch and then became <code>nan</code>. What is the most likely cause?', options: ['The learning rate is too large', 'The learning rate is too small', 'There is too little data', 'The activation is ReLU'], explain: 'A step that is too large jumps over the minimum, the weights grow without limit, and then exp/log give nan. Try lowering lr by 3–10 times.' }
      ]
    },
    'dl-5': {
      title: 'Practice: training a network that solves XOR',
      body: `
<p>XOR is a classic test: if the inputs are equal the answer is 0, if they differ it is 1. The four points cannot be separated by one straight line, so logistic regression cannot solve it. One hidden layer is enough — now we will see this with our own eyes.</p>
<table>
<tr><th>x1</th><th>x2</th><th>y</th></tr>
<tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr>
</table>
<h3>Network: 2 → 4 (tanh) → 1 (sigmoid)</h3>
<p>A full training loop has four steps, and in PyTorch these steps are exactly the same:</p>
<ol>
<li><b>Forward</b>: <code>h = tanh(X @ W1 + b1)</code>, <code>p = sigmoid(h @ W2 + b2)</code>.</li>
<li><b>Loss</b>: BCE.</li>
<li><b>Backward</b> (from output to input):
<pre><code>dz2 = (p - y) / n                 # output layer
dW2 = h.T @ dz2;  db2 = dz2.sum(axis=0, keepdims=True)
dh  = dz2 @ W2.T                  # the gradient passes to the hidden layer
dz1 = dh * (1 - h**2)             # derivative of tanh
dW1 = X.T @ dz1;  db1 = dz1.sum(axis=0, keepdims=True)</code></pre></li>
<li><b>Update</b>: <code>W1 -= lr * dW1</code> and the rest.</li>
</ol>
<p>Note: the formula for <code>dW2</code> is the same as <code>X.T @ dz</code> for a single neuron, only the hidden layer <code>h</code> takes the place of X. For every layer: "its input.T @ its gradient".</p>
<h3>Why random initial weights?</h3>
<p>If all weights are 0, all hidden neurons compute the same thing, get the same gradient and stay identical forever. Random initialization breaks the symmetry. If we fix the seed (<code>default_rng(42)</code>), the result is reproducible. Sometimes with an unlucky seed the network gets stuck in a "local" solution (for example, predicting 0.5): this is normal for small networks.</p>
<div class="tip">Collect the loss in a list and compare the start and the end. If the loss does not go down, first check the signs and shapes in the backward pass.</div>
<h3>Result</h3>
<p>After 2000 epochs the network gives about [0.00, 1.00, 1.00, 0.00]: XOR is solved. The hidden layer "folded" the inputs into a new space where the points became separable by one line. This is the whole idea of deep learning: <b>layers learn useful features by themselves</b>.</p>`,
      ex: [
        { prompt: 'The training loop is ready, only the backward part is missing (the gradients are zero). Write <code>dz2</code>, <code>dW2</code>, <code>db2</code>, <code>dh</code>, <code>dz1</code>, <code>dW1</code>, <code>db1</code>. After training the last loss should be below 0.05 and <code>preds</code> = [0, 1, 1, 0].', starter: 'import numpy as np\n' + String.raw`X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
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
    # backward: fix these lines
    dW2 = np.zeros_like(W2); db2 = np.zeros_like(b2)
    dW1 = np.zeros_like(W1); db1 = np.zeros_like(b1)
    # update
    W1 -= lr * dW1; b1 -= lr * db1
    W2 -= lr * dW2; b2 -= lr * db2

preds = (p > 0.5).astype(int).ravel()
print(losses[0], losses[-1], preds)
`, check: { tests: String.raw`import numpy as _np
assert len(losses) == 2000, 'The loop should run for 2000 epochs'
assert losses[-1] < 0.05, f'The last loss should be below 0.05, you have {losses[-1]:.4f}. Check the backward formulas'
assert list(_np.asarray(preds).ravel()) == [0, 1, 1, 0], f'preds should be [0, 1, 1, 0], you have {preds}'
assert W1.shape == (2, 4) and W2.shape == (4, 1), 'The weight shapes must not change'` }, hints: ['Output: <code>dz2 = (p - y) / len(X)</code>, <code>dW2 = h.T @ dz2</code>', 'Hidden: <code>dz1 = (dz2 @ W2.T) * (1 - h ** 2)</code>, <code>dW1 = X.T @ dz1</code>'] },
        { prompt: 'A learning rate experiment. Wrap training in a function <code>train(lr)</code> that returns the last loss. For <code>lr</code> = 0.01, 0.1, 1.0 store the results in the dictionary <code>results</code> (<code>{lr: loss}</code>) and save the value that gave the lowest loss in <code>best_lr</code>.', check: { tests: String.raw`assert set(results) == {0.01, 0.1, 1.0}, 'results should have three keys: 0.01, 0.1, 1.0'
assert results[0.01] > 0.3, 'With lr = 0.01 the network should not have learned yet in 1500 epochs: did you call train(0.01)?'
assert best_lr == 1.0, f'best_lr should be 1.0, you have {best_lr}'` }, hints: ['<code>for lr in [0.01, 0.1, 1.0]: results[lr] = train(lr)</code>', '<code>best_lr = min(results, key=results.get)</code>'] },
        { prompt: 'Why can we not start with all weights equal to zero?', options: ['numpy cannot multiply by zero', 'The hidden neurons get the same gradient and stay identical', 'The loss becomes nan right away', 'The bias stops working'], explain: 'The symmetry is never broken: all hidden neurons compute the same thing and update the same way, so 4 neurons in effect remain 1 neuron.' }
      ]
    },
    'dl-6': {
      title: 'The training loop: epochs, batches, overfitting',
      body: `
<p>XOR had 4 examples, and we used all of them at every step. Real data has thousands or millions of examples, so the training loop relies on a few concepts.</p>
<h3>Key terms</h3>
<ul>
<li><b>Batch</b> (mini-batch) — the group of examples used for one gradient step, usually 32–256. A small batch makes the gradient "noisy", but it fits in memory and updates more often.</li>
<li><b>Step</b> (iteration) — one update on one batch.</li>
<li><b>Epoch</b> — one full pass over all the train data. Steps per epoch = ceil(N / batch_size).</li>
<li><b>Learning rate</b> — the step size; most often 1e-3 (Adam) or 0.01–0.1 (SGD). Sometimes it is reduced over time (scheduler).</li>
</ul>
<h3>Step-by-step example</h3>
<p>10,000 product photos of a shop in Almaty, batch_size = 64:</p>
<ol>
<li>One epoch has ceil(10000 / 64) = 157 steps (the last batch has 16 photos).</li>
<li>20 epochs — 3,140 steps.</li>
<li>Before each epoch the data is shuffled, otherwise the batches are the same every time and the model may memorize the order.</li>
</ol>
<h3>Overfitting and early stopping</h3>
<p>A network has many parameters, so it can easily memorize the train data. The sign: the train loss keeps going down, while the validation loss <b>starts to grow</b> after a certain epoch. Remedies:</p>
<ul>
<li><b>Early stopping</b>: if the validation loss does not improve for <code>patience</code> epochs, stop and return the weights from the best epoch.</li>
<li><b>Dropout</b>: randomly switch off part of the neurons during training.</li>
<li><b>Weight decay</b> (L2), more data, <b>data augmentation</b> (rotating, cropping images).</li>
</ul>
<pre><code>val = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47]
# the best is epoch 3 (counting from 0), patience = 3:
# no improvement in epochs 4, 5, 6 → stop after epoch 6</code></pre>
<div class="tip">Use the validation set only for stopping and choosing hyperparameters. Compute the final score once on a separate test set — the rule from module M5 does not change in deep learning.</div>
<h3>Common mistakes</h3>
<ul>
<li>Saving the model from the last epoch when the best one came earlier.</li>
<li>Shuffling the validation data and accidentally adding it to train.</li>
<li>Increasing the number of epochs again and again: a straight road to overfitting.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>make_batches(n, batch_size)</code>: it returns a list of <code>(start, end)</code> pairs, for example <code>make_batches(10, 4)</code> → <code>[(0, 4), (4, 8), (8, 10)]</code>. Compute <code>steps = len(make_batches(10000, 64))</code>.', check: { tests: String.raw`assert make_batches(10, 4) == [(0, 4), (4, 8), (8, 10)], f'make_batches(10, 4) should be [(0, 4), (4, 8), (8, 10)], you have {make_batches(10, 4)}'
assert make_batches(8, 4) == [(0, 4), (4, 8)], 'There should be no empty batch: make_batches(8, 4) = [(0, 4), (4, 8)]'
assert steps == 157, f'steps should be 157, you have {steps}'` }, hints: ['<code>range(0, n, batch_size)</code> gives the start of each batch', 'The end: <code>min(s + batch_size, n)</code>'] },
        { prompt: 'Early stopping. The function <code>early_stop(val_losses, patience)</code> returns <code>(best_epoch, stop_epoch)</code>: <code>best_epoch</code> is the epoch with the lowest loss (from 0), <code>stop_epoch</code> is the epoch at which <code>patience</code> epochs have passed since the last improvement. If there is no stop, <code>stop_epoch = len(val_losses) - 1</code>.', check: { tests: String.raw`_v = [0.70, 0.52, 0.45, 0.43, 0.44, 0.46, 0.47, 0.41]
assert tuple(early_stop(_v, 3)) == (3, 6), f'patience=3: should be (3, 6), you have {early_stop(_v, 3)}. We stop before reaching 0.41 in epoch 7'
assert tuple(early_stop(_v, 5)) == (7, 7), f'patience=5: no stop, should be (7, 7), you have {early_stop(_v, 5)}'
assert tuple(early_stop([0.5, 0.4, 0.3], 1)) == (2, 2), 'With constant improvement: (2, 2)'` }, hints: ['Keep <code>best</code>, <code>best_epoch</code> and <code>wait</code> (the number of epochs without improvement)', 'On improvement <code>wait = 0</code>, otherwise <code>wait += 1</code>; if <code>wait >= patience</code>, return'] },
        { prompt: '50,000 examples, batch_size = 128, 10 epochs. How many gradient steps are there in total?', explain: 'ceil(50000 / 128) = 391 steps per epoch; 391 · 10 = 3910.' },
        { prompt: 'The train loss has been falling for 15 epochs, while the validation loss has been rising since epoch 6. What do we do?', options: ['Increase the epochs to 50', 'Take the weights from around epoch 6 and add regularization', 'Increase the learning rate 10 times', 'Add the validation set to train'], explain: 'This is overfitting. Early stopping keeps the best validation epoch; dropout, weight decay or more data reduce the problem itself.' }
      ]
    },
    'dl-7': {
      title: 'PyTorch: from numpy steps to torch',
      body: `
<p><b>PyTorch</b> is the most popular deep learning library. It does everything we wrote by hand in numpy, but with two advantages: <b>autograd</b> (it computes the backward pass itself) and the <b>GPU</b>. The in-browser Python has no torch, so we read the code and compare it with the numpy equivalents. On your own computer you can run it after <code>pip install torch</code>.</p>
<h3>Tensor</h3>
<pre><code>import torch
x = torch.tensor([[0., 1.], [1., 0.]])   # like a numpy array
x.shape, x @ x.T, x.mean()               # the same operations
w = torch.randn(2, 4, requires_grad=True) # its gradient must be tracked
x.numpy(); torch.from_numpy(arr)          # numpy ↔ torch</code></pre>
<h3>The model: nn.Module</h3>
<pre><code>import torch.nn as nn

class XorNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.hidden = nn.Linear(2, 4)    # W1, b1
        self.out = nn.Linear(4, 1)       # W2, b2

    def forward(self, x):
        h = torch.tanh(self.hidden(x))
        return self.out(h)               # logit, no sigmoid

model = XorNet()
loss_fn = nn.BCEWithLogitsLoss()         # sigmoid + BCE together
optimizer = torch.optim.SGD(model.parameters(), lr=1.0)</code></pre>
<h3>The standard training loop</h3>
<pre><code>for epoch in range(2000):
    for xb, yb in train_loader:          # DataLoader yields batches
        optimizer.zero_grad()            # clear the old gradients
        logits = model(xb)               # forward
        loss = loss_fn(logits, yb)       # loss
        loss.backward()                  # backprop: fills every .grad
        optimizer.step()                 # W -= lr * W.grad

model.eval()                             # inference mode for dropout/batchnorm
with torch.no_grad():                    # no gradients computed
    probs = torch.sigmoid(model(X_test))</code></pre>
<h3>numpy ↔ PyTorch mapping</h3>
<table>
<tr><th>numpy (dl-5)</th><th>PyTorch</th></tr>
<tr><td><code>W1 = rng.normal(...)</code></td><td><code>nn.Linear(2, 4)</code></td></tr>
<tr><td><code>h = np.tanh(X @ W1 + b1)</code></td><td><code>model(x)</code> → <code>forward</code></td></tr>
<tr><td>the BCE formula</td><td><code>nn.BCEWithLogitsLoss()</code></td></tr>
<tr><td><code>dz2 … dW1, db1</code> (the whole backward pass)</td><td><code>loss.backward()</code></td></tr>
<tr><td><code>W1 -= lr * dW1</code> …</td><td><code>optimizer.step()</code></td></tr>
<tr><td>recomputing the gradient from scratch every epoch</td><td><code>optimizer.zero_grad()</code></td></tr>
</table>
<div class="tip">In PyTorch gradients <b>accumulate</b> (<code>+=</code>): if you forget <code>zero_grad()</code>, each step adds the gradients of the previous ones and training breaks. This is beginners' mistake No. 1.</div>
<h3>Optimizers</h3>
<p><code>SGD</code> is the rule we wrote by hand. <code>Adam</code> uses a step that adapts to each parameter; in most cases it works well right away with <code>lr=1e-3</code>, so it is the default choice.</p>`,
      ex: [
        { prompt: 'Below is a small <code>Linear</code> class similar to <code>nn.Linear</code>: like in PyTorch, its gradients <b>accumulate</b>. Write the <code>SGD</code> class (<code>zero_grad()</code> sets every <code>p.grad</code> to zero, <code>step()</code> decreases every <code>p.value</code> by <code>lr * p.grad</code>). Then run the standard loop for 200 steps: zero_grad → forward → loss → backward → step. The model should find y = 2x + 1.', check: { tests: String.raw`import numpy as _np
_p = Param(_np.array([1.0])); _p.grad = _np.array([2.0])
_o = SGD([_p], lr=0.5); _o.step()
assert abs(float(_p.value[0])) < 1e-9, 'step(): value -= lr * grad (1 - 0.5·2 = 0)'
_o.zero_grad()
assert float(_p.grad[0]) == 0.0, 'zero_grad() should set the gradient to zero'
assert abs(float(model.w.value[0]) - 2) < 0.05 and abs(float(model.b.value[0]) - 1) < 0.05, f'The model should find w ≈ 2, b ≈ 1, you have w={model.w.value}, b={model.b.value}. Does the loop have zero_grad() and step()?'` }, hints: ['<code>zero_grad</code>: <code>for p in self.params: p.grad = np.zeros_like(p.value)</code>', '<code>optimizer.zero_grad()</code> at the start of the loop, <code>optimizer.step()</code> at the end'] },
        { prompt: 'What is the PyTorch equivalent of the numpy block <code>dz2 = (p - y) / n; dW2 = h.T @ dz2; ... dW1 = X.T @ dz1</code>?', options: ['optimizer.step()', 'loss.backward()', 'model.eval()', 'optimizer.zero_grad()'], explain: 'loss.backward() uses autograd to compute .grad of every parameter by the chain rule — the whole backward pass we wrote by hand.' },
        { prompt: 'The PyTorch equivalent of the lines <code>W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2</code>?', options: ['loss.backward()', 'model(x)', 'optimizer.step()', 'torch.no_grad()'], explain: 'optimizer.step() updates every parameter in model.parameters() using its .grad (for SGD, with exactly this formula).' },
        { prompt: 'The model is trained, now you need predictions on the test data. Which two lines are correct?', options: ['model.train() and loss.backward()', 'model.eval() and with torch.no_grad():', 'optimizer.zero_grad() and optimizer.step()', 'Nothing is needed, model(X_test) is enough'], explain: 'eval() puts dropout and batchnorm into inference mode, no_grad() does not build the gradient graph, saving memory and time.' }
      ]
    },
    'dl-8': {
      title: 'CNN intuition: convolution and pooling',
      body: `
<p>An image is a table of numbers: a 28×28 grayscale image is 784 pixels. If we feed it to an MLP as a plain list, there are two problems: there are far too many parameters, and the model does not know that "neighbouring pixels are related". A <b>convolutional neural network</b> (CNN) solves both.</p>
<h3>Convolution</h3>
<p>A small <b>kernel</b> (a filter, for example 3×3) slides over the image. At each position we multiply the kernel by the patch under it element by element and add up — we get one number. The result is a <b>feature map</b>.</p>
<pre><code>img (5×5)            kernel (3×3)
0 0 0 9 9            1 0 -1
0 0 0 9 9            1 0 -1
0 0 0 9 9     *      1 0 -1
0 0 0 9 9
0 0 0 9 9
                     result (3×3):
                     0 -27 -27   ← a vertical edge found
                     ...</code></pre>
<p>Top-left position: all pixels are 0, the result is 0. One step to the right: the right column of the patch holds 9s, the kernel multiplies them by −1: 3·(−9) = −27. This kernel finds <b>vertical edges</b>. In a CNN we do not write the kernel values — the network learns them itself through backprop: the first layers learn edges and colours, deeper ones learn shapes like eyes, wheels, letters.</p>
<h3>Output size</h3>
<pre><code>out = (n − k + 2·padding) / stride + 1
5×5, k=3, padding=0, stride=1 → 3×3
28×28, k=3, padding=1 → 28×28 ("same")</code></pre>
<h3>Pooling</h3>
<p><b>Max pooling 2×2</b> splits the feature map into 2×2 blocks and takes the largest value from each. The size is halved, while the information "is this feature somewhere nearby?" is kept. This reduces computation and gives tolerance to small shifts.</p>
<h3>Why so few parameters?</h3>
<p>One kernel is <b>shared</b> across the whole image (weight sharing). <code>nn.Conv2d(3, 16, kernel_size=3)</code>: 16 filters, each with 3 channels × 3 × 3 = 27 weights + 1 bias → 16·28 = 448 parameters. If we fed a 32×32×3 image to a Linear layer with 16 neurons: 3072·16 + 16 = 49,168.</p>
<pre><code>nn.Sequential(
    nn.Conv2d(1, 8, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),   # 28→14
    nn.Conv2d(8, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),  # 14→7
    nn.Flatten(), nn.Linear(16 * 7 * 7, 10))                     # 10 digits</code></pre>
<div class="tip">The "convolution" in deep learning libraries is really cross-correlation: the kernel is not flipped. We compute it the same way.</div>`,
      ex: [
        { prompt: 'Write the function <code>conv2d(img, k)</code>: no padding, stride 1. The output shape is <code>(H − kh + 1, W − kw + 1)</code>, each element is <code>(img[i:i+kh, j:j+kw] * k).sum()</code>. Apply the vertical-edge kernel to the example image and store the result in <code>fmap</code>.', check: { tests: String.raw`import numpy as _np
assert _np.shape(fmap) == (3, 3), f'fmap should have shape (3, 3), you have {_np.shape(fmap)}'
assert _np.allclose(fmap, [[0, -27, -27]] * 3), f'Every row of fmap should be [0, -27, -27], you have {fmap}'
_r = _np.random.default_rng(3); _a = _r.normal(size=(6, 7)); _kk = _r.normal(size=(2, 3))
_ref = _np.array([[(_a[i:i+2, j:j+3] * _kk).sum() for j in range(5)] for i in range(5)])
assert _np.allclose(conv2d(_a, _kk), _ref), 'conv2d should work for an image and a kernel of any size'` }, hints: ['<code>out = np.zeros((H - kh + 1, W - kw + 1))</code>', 'Two loops: <code>out[i, j] = (img[i:i+kh, j:j+kw] * k).sum()</code>'] },
        { prompt: 'Write <code>maxpool2(x)</code>: 2×2 blocks, stride 2 (assume even sizes). Compute <code>pooled = maxpool2(fm)</code>.', check: { tests: String.raw`import numpy as _np
assert _np.allclose(pooled, [[4, 5], [3, 7]]), f'pooled should be [[4, 5], [3, 7]], you have {pooled}'
_a = _np.arange(36, dtype=float).reshape(6, 6)
assert _np.allclose(maxpool2(_a), _a.reshape(3, 2, 3, 2).max(axis=(1, 3))), 'maxpool2 should also work for 6×6'` }, hints: ['The output shape is <code>(H // 2, W // 2)</code>', '<code>x[2*i:2*i+2, 2*j:2*j+2].max()</code>'] },
        { prompt: 'How many parameters (with bias) does the layer <code>nn.Conv2d(3, 16, kernel_size=3)</code> have?', explain: 'Each filter: 3 channels · 3 · 3 = 27 weights + 1 bias = 28. 16 filters: 16 · 28 = 448.' },
        { prompt: 'A 32×32 image, a 5×5 kernel, padding 0, stride 1. What is the side length of the feature map?', explain: '(32 − 5 + 0) / 1 + 1 = 28.' }
      ]
    },
    'dl-9': {
      title: 'Transfer learning and when to choose deep learning',
      body: `
<p>Training ResNet from scratch on ImageNet (14 million images) takes several days on a GPU. And you have, say, 300 photos of Kazakh dishes (beshbarmak, baursak, kuyrdak, manty, samsa). If we train from scratch, the network overfits right away. The solution is <b>transfer learning</b>: reusing the knowledge of a network trained on other, large data.</p>
<h3>The idea</h3>
<p>The first layers of a trained CNN recognize <b>general</b> features such as edges, textures and shapes — they are useful for any image. Only the last layer (the head) is built for the specific 1000 ImageNet classes. So:</p>
<ol>
<li><b>Feature extraction</b>: we "freeze" the backbone and train only a new head. This is the choice when data is small (hundreds of examples).</li>
<li><b>Fine-tuning</b>: after the head, we also train the last one or two blocks with a small learning rate. When there is more data (thousands) or the domain is far away (X-ray images).</li>
</ol>
<pre><code>import torch.nn as nn
from torchvision import models

model = models.resnet18(weights='IMAGENET1K_V1')   # pretrained weights
for p in model.parameters():
    p.requires_grad = False                         # backbone frozen
model.fc = nn.Linear(model.fc.in_features, 5)      # new head: 5 dishes
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
# training loop as in dl-7; normalize the images like ImageNet</code></pre>
<p>Only 512·5 + 5 = 2,565 parameters are trained in the new head, and the rest of the 11 million stay unchanged. That is why 300 images are enough and training takes a few minutes even on a CPU.</p>
<h3>The same with text</h3>
<p>Language models such as BERT and LLMs are backbones trained on a large text corpus. To classify reviews (for example, product reviews on Kaspi), you take their embeddings and put a small classifier on top — that is the same transfer learning. More on this in the GenAI module.</p>
<h3>When deep learning is not needed</h3>
<table>
<tr><th>Data</th><th>Usually the best choice</th></tr>
<tr><td>Table (churn, apartment price), thousands of rows</td><td>Gradient boosting, logistic regression</td></tr>
<tr><td>Images, audio, video</td><td>CNN / pretrained model</td></tr>
<tr><td>Text</td><td>Pretrained language model, embeddings</td></tr>
</table>
<div class="tip">On tabular data, first build the sklearn baseline from M5. Only if a neural network beats it is it worth the extra complexity (GPU, long training, harder explanations).</div>`,
      ex: [
        { prompt: 'We model feature extraction with sklearn. <code>extract</code> is a "frozen" backbone: its weights do not change. Train only the head: <code>fit</code> <code>head = LogisticRegression(max_iter=1000)</code> on the <code>extract(X_train)</code> features and store the test accuracy in <code>head_acc</code>. For comparison, store the accuracy of logistic regression on the raw <code>X_train</code> in <code>raw_acc</code>.', starter: 'import numpy as np\n' + String.raw`from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(7)
X = rng.uniform(-1, 1, (200, 2))
y = ((X ** 2).sum(axis=1) < 0.4).astype(int)     # inside the circle?
X_train, X_test, y_train, y_test = X[:150], X[150:], y[:150], y[150:]

frng = np.random.default_rng(0)
W_frozen = frng.normal(0, 1, (2, 64))
b_frozen = frng.uniform(-1, 1, 64)

def extract(X):
    return np.maximum(0, X @ W_frozen + b_frozen)   # frozen backbone

raw_acc = 0
head_acc = 0
`, check: { tests: String.raw`assert abs(raw_acc - 0.70) < 0.03, f'raw_acc should be ≈ 0.70 (on raw X), you have {raw_acc}'
assert head.n_features_in_ == 64, 'head should be trained on the 64 features of extract(X_train)'
assert head_acc >= 0.95, f'head_acc should be at least 0.95, you have {head_acc}'
assert W_frozen.shape == (2, 64), 'Do not change the backbone weights'` }, hints: ['<code>head.fit(extract(X_train), y_train)</code>', '<code>head_acc = head.score(extract(X_test), y_test)</code>'] },
        { prompt: 'The parameter counts of the ResNet-18 blocks are given in the dictionary <code>layers</code>. Write the function <code>trainable(layers, train)</code>: it adds up the parameters of only the blocks in the <code>train</code> list. Compute <code>head_only = trainable(layers, ["fc"])</code> and <code>finetune = trainable(layers, ["layer4", "fc"])</code>.', check: { tests: String.raw`assert head_only == 2565, f'head_only should be 2565, you have {head_only}'
assert finetune == 8396293, f'finetune should be 8393728 + 2565 = 8396293, you have {finetune}'
assert trainable({"a": 1, "b": 2}, []) == 0, 'If nothing is trained, 0'` }, hints: ['Loop over <code>layers.items()</code> and check <code>name in train</code>', '<code>sum(n for name, n in layers.items() if name in train)</code>'] },
        { prompt: 'A restaurant in Astana collected 300 photos of 5 dishes and wants to recognize the dish from a photo. What is the best starting point?', options: ['Train a CNN from scratch on 300 photos', 'Freeze a pretrained ResNet and train a new 5-class head', 'Feed the pixels to logistic regression', 'First collect 1 million photos'], explain: 'Data is small: the pretrained backbone gives general visual features, and 300 photos are enough for a head with 2,565 parameters.' },
        { prompt: 'Telecom churn: 600 subscribers, 9 tabular columns. Which model do we start with?', options: ['A large MLP with 10 layers', 'Pretrained ResNet', 'A logistic regression / gradient boosting baseline', 'LLM fine-tuning'], explain: 'On tabular and small data, classical ML is usually no worse than deep learning, and it is faster and explainable.' }
      ]
    },
    'dl-gate': {
      title: 'Module exam: Deep Learning Intro',
      body: `
<p>The final check: forward pass, softmax and cross-entropy, a full training loop, convolution, PyTorch. No torch is used, only numpy. There are no hints, and the pass mark is 75%.</p>`,
      ex: [
        { prompt: 'A 3-class MLP (ReLU in the hidden layer). With the given weights compute: <code>logits</code> (shape (4, 3)), a stable softmax over each row → <code>probs</code>, the predicted class → <code>pred_class</code> (argmax), and the mean cross-entropy against the true <code>y</code> → <code>ce_loss</code>.', check: { tests: String.raw`import numpy as _np
_L = _np.maximum(0, X @ W1 + b1) @ W2 + b2
_e = _np.exp(_L - _L.max(axis=1, keepdims=True)); _Pr = _e / _e.sum(axis=1, keepdims=True)
assert _np.allclose(logits, _L), 'logits = relu(X @ W1 + b1) @ W2 + b2'
assert _np.allclose(probs, _Pr), 'probs is a softmax over each row (axis=1), every row sums to 1'
assert list(_np.asarray(pred_class)) == list(_Pr.argmax(axis=1)), 'pred_class = probs.argmax(axis=1)'
assert abs(float(ce_loss) - (-_np.mean(_np.log(_Pr[_np.arange(4), y])))) < 1e-6, 'ce_loss is the mean of −log of the true class probability'` } },
        { prompt: 'Is the point inside the circle? Logistic regression gives only ~71% on this data. Train a 2 → 8 (ReLU) → 1 (sigmoid) network with gradient descent (the weights are named <code>W1</code>, <code>b1</code>, <code>W2</code>, <code>b2</code>, shapes are ready). Store the train accuracy after training in <code>acc</code>: at least 0.95 is required. The ReLU derivative: <code>(z1 > 0)</code>.', check: { tests: String.raw`import numpy as _np
assert W1.shape == (2, 8) and W2.shape == (8, 1), 'The weight shapes should be (2, 8) and (8, 1)'
_p = 1 / (1 + _np.exp(-(_np.maximum(0, X @ W1 + b1) @ W2 + b2)))
_acc = float(((_p > 0.5) == y).mean())
assert _acc >= 0.95, f'The train accuracy of the network is {_acc:.3f}, at least 0.95 is required'
assert abs(float(acc) - _acc) < 0.02, f'acc should be the accuracy of the trained network ({_acc:.3f})'` } },
        { prompt: 'One CNN block: <code>block(img, k)</code> = maxpool 2×2 (ReLU (conv2d(img, k))). conv2d has no padding, stride 1. For a 6×6 image and a 3×3 kernel the result is 2×2. For the example <code>img</code> and <code>k</code> compute <code>out = block(img, k)</code>.', check: { tests: String.raw`import numpy as _np
def _conv(a, kk):
    return _np.array([[(a[i:i+kk.shape[0], j:j+kk.shape[1]] * kk).sum() for j in range(a.shape[1] - kk.shape[1] + 1)] for i in range(a.shape[0] - kk.shape[0] + 1)])
def _blk(a, kk):
    c = _np.maximum(0, _conv(a, kk)); h, w = c.shape
    return c.reshape(h // 2, 2, w // 2, 2).max(axis=(1, 3))
assert _np.shape(out) == (2, 2), f'out should have shape (2, 2), you have {_np.shape(out)}'
assert _np.allclose(out, _blk(img, k)), f'out should be {_blk(img, k).tolist()}, you have {out}'
_a = _np.random.default_rng(5).normal(size=(6, 6))
assert _np.allclose(block(_a, k), _blk(_a, k)), 'block should work for any 6×6 image (did you forget ReLU?)'` } },
        { prompt: 'Which order inside a PyTorch training loop is correct?', options: ['loss.backward() → optimizer.zero_grad() → model(xb) → optimizer.step()', 'optimizer.zero_grad() → model(xb) → loss_fn(...) → loss.backward() → optimizer.step()', 'model(xb) → optimizer.step() → loss.backward() → optimizer.zero_grad()', 'optimizer.step() → model(xb) → loss_fn(...) → loss.backward()'], explain: 'Clear → forward → loss → backward (gradients) → step (update). If step comes before backward, it updates with old gradients.' },
        { prompt: 'An MLP: <code>nn.Linear(784, 256)</code> → ReLU → <code>nn.Linear(256, 10)</code>. How many trainable parameters in total?', explain: '784·256 + 256 = 200,960; 256·10 + 10 = 2,570; total 203,530.' }
      ]
    },
    'cap6-1': {
      title: 'Defining the problem and the success metric',
      body: `
<p>In this capstone we build a <b>churn prediction service</b> for the telecom company "Dala Mobile". In the M5 capstone you built a model and wrote a memo. Now the question is different: how do we turn the model into a <b>product</b> that other systems can use every day?</p>
<h3>1. Who uses it, when and how?</h3>
<ul>
<li><b>Consumer</b>: the CRM system. When a call-centre operator talks to a subscriber, a "high churn risk" flag appears on the screen.</li>
<li><b>Mode</b>: online — one request per subscriber (REST API, M6.2). Nightly batch scoring is the second stage.</li>
<li><b>Decision</b>: if the probability is above the threshold, the operator offers a 2,000 ₸ discount.</li>
</ul>
<h3>2. A success metric on three levels</h3>
<table>
<tr><th>Level</th><th>Metric</th><th>Target</th></tr>
<tr><td>Offline (model)</td><td>ROC-AUC, recall on churners</td><td>AUC ≥ 0.78, above the baseline</td></tr>
<tr><td>Business</td><td>Campaign profit, ₸</td><td>higher than "offer to nobody" and "offer to everyone"</td></tr>
<tr><td>Service (SLO)</td><td>p95 latency, error rate</td><td>p95 &lt; 200 ms, 5xx &lt; 0.1%</td></tr>
</table>
<h3>Step-by-step example: the profit formula</h3>
<p>Assumptions: a subscriber who leaves would have brought the company 40,000 ₸ in revenue; the discount saves 30% of that; an offer costs 2,000 ₸ (whoever we make it to).</p>
<pre><code>profit = 0.3 · 40 000 · TP − 2 000 · (number who got an offer)</code></pre>
<p>The model made an offer to 55 people, 29 of whom would really have left (TP = 29): 0.3 · 40,000 · 29 − 2,000 · 55 = 348,000 − 110,000 = <b>238,000 ₸</b>. This number must be compared with the "zero" options without a model: offer to nobody (0 ₸) and offer to everyone.</p>
<h3>3. Constraints and risks</h3>
<ul>
<li>Data: 600 subscribers, some columns have missing values.</li>
<li>Fairness: the model must not systematically discriminate against a particular city.</li>
<li>Privacy: names and national ID numbers (IIN) are not sent to the API, only features.</li>
</ul>
<div class="tip">Start the project not with code but with a one-page "problem framing" document. It becomes the first section of the README and answers the interview question "why did you build this project?".</div>`,
      ex: [
        { prompt: 'Write the function <code>campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3)</code> (the formula is in the lesson). Then, over the whole <code>churn.csv</code>, compute the profit of two simple strategies: <code>profit_all</code> — offer to everyone, <code>profit_none</code> — offer to nobody.', check: { tests: String.raw`import numpy as _np
assert abs(campaign_profit([1, 0, 1, 0], [1, 1, 0, 0]) - 8000) < 1e-6, 'TP = 1, offer to 2 people: should be 12 000 − 4 000 = 8 000'
assert abs(campaign_profit([1, 1], [1, 1], cost=1000, value=10000, save_rate=0.5) - 8000) < 1e-6, 'Use the cost, value and save_rate parameters'
assert profit_all is not None and abs(profit_all - 660000) < 1e-6, f'profit_all should be 0.3·40000·155 − 2000·600 = 660 000, you have {profit_all}'
assert profit_none is not None and abs(profit_none) < 1e-6, 'profit_none = 0'` }, hints: ['TP: <code>((y_pred == 1) & (y_true == 1)).sum()</code>', 'Everyone: <code>np.ones(len(y))</code>, nobody: <code>np.zeros(len(y))</code>'] },
        { prompt: 'The model made an offer to 80 subscribers, 32 of whom would really have left. What is the profit in ₸ by the formula from the lesson?', explain: '0.3 · 40,000 · 32 = 384,000; 2,000 · 80 = 160,000; 384,000 − 160,000 = 224,000 ₸.' },
        { prompt: 'Which set of metrics evaluates the success of the service most fully?', options: ['Only accuracy', 'ROC-AUC + campaign profit (₸) + p95 latency and error rate', 'Only p95 latency', 'The number of model parameters'], explain: 'A service has to succeed on three levels: model quality (offline), business result and reliable operation (SLO).' },
        { done: 'This text is the "Problem" section of the README. Save it: you will add it to the README in the last lesson.', prompt: 'Write a one-page problem framing text for your project (at least 70 words): who uses it, what decision is made, the success metrics (offline, business, SLO) and at least two risks. Then grade yourself honestly: at least <b>3 / 4</b> on every criterion.', criteria: [
          { name: 'User and decision', levels: ['Not stated', 'A general phrase like "useful for the company"', 'Specific: who uses it and what action is taken', 'User, action, mode (online/batch) and how the threshold is chosen'] },
          { name: 'Success metric', levels: ['None', 'Only accuracy or only AUC', 'Offline and business metrics with a numeric target', 'Offline, business and SLO, each compared with a baseline'] },
          { name: 'Risks', levels: ['None', 'One, general', 'Two specific risks', 'Risks and a countermeasure for each of them'] }
        ] }
      ]
    },
    'cap6-2': {
      title: 'Data, data contract and baseline',
      body: `
<p>A service receives data not "once" but every day. So we do not just look through the data, we write a <b>data contract</b>: which columns, which types, which range of values is expected. Later this contract becomes the basis of API validation and drift monitoring.</p>
<h3>churn.csv: what is inside</h3>
<table>
<tr><th>Column</th><th>Type</th><th>Note</th></tr>
<tr><td><code>customer_id</code></td><td>int</td><td>not a feature, only a key; must not repeat</td></tr>
<tr><td><code>city</code>, <code>plan</code></td><td>category</td><td>5 cities, 3 plans</td></tr>
<tr><td><code>age</code>, <code>data_gb</code></td><td>number</td><td>has missing values</td></tr>
<tr><td><code>tenure_months</code>, <code>monthly_fee</code>, <code>support_calls</code>, <code>has_contract</code></td><td>number</td><td>complete</td></tr>
<tr><td><code>churned</code></td><td>0/1</td><td>target, about 26%</td></tr>
</table>
<h3>Step-by-step example: checking the data</h3>
<pre><code>churn = pd.read_csv('churn.csv')
print(len(churn))                              # 600
na = churn.isna().sum()
print(na[na > 0].to_dict())                    # {'age': 25, 'data_gb': 17}
print(churn['customer_id'].duplicated().sum()) # 0
print(churn['churned'].mean())                 # 0.258</code></pre>
<p>These numbers are the project's "passport". We write them into the README, and when new data arrives we repeat the same checks automatically (CI from M6.3).</p>
<h3>No model without a baseline</h3>
<p>A baseline answers the question "what would happen if we did not build a model?". We measure two:</p>
<ol>
<li><b>DummyClassifier</b> — the same answer for everyone. ROC-AUC = 0.5: the level of chance.</li>
<li><b>A simple model</b> — logistic regression on 4 numeric features. Every extra bit of complexity after this must beat it.</li>
</ol>
<pre><code>from sklearn.model_selection import cross_val_score
pipe = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(),
                     LogisticRegression(max_iter=1000))
cross_val_score(pipe, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()</code></pre>
<div class="tip">Split off the test set once at this stage and put it "in the safe" (<code>random_state=42</code>, <code>stratify</code>). The model is chosen only through cross-validation inside train. We open the test set once, at the very end.</div>
<h3>Common mistakes</h3>
<ul>
<li>Leaving <code>customer_id</code> in as a feature.</li>
<li>Filling missing values with the mean over all the data and then splitting: information about test leaks into train (leakage). The imputer must be inside the pipeline.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>data_report(df)</code>. It returns a dictionary: <code>n_rows</code>, <code>missing</code> (only columns with missing values: <code>{column: count}</code>), <code>dup_ids</code> (the number of repeated <code>customer_id</code> values), <code>churn_rate</code>. Compute <code>report = data_report(churn)</code>.', check: { tests: String.raw`import pandas as _pd
assert report.get('n_rows') == 600, 'n_rows = 600'
assert report.get('missing') == {'age': 25, 'data_gb': 17}, f"missing should be {{'age': 25, 'data_gb': 17}}, you have {report.get('missing')}"
assert report.get('dup_ids') == 0, 'dup_ids = 0'
assert abs(report.get('churn_rate', 0) - 0.2583) < 1e-3, 'churn_rate = the mean of the churned column'
_d = _pd.DataFrame({'customer_id': [1, 1, 2], 'x': [None, 1, 2], 'churned': [1, 0, 0]})
_r = data_report(_d)
assert _r['dup_ids'] == 1 and _r['missing'] == {'x': 1}, 'data_report should work for any DataFrame'` }, hints: ['<code>na = df.isna().sum()</code>, then <code>na[na > 0]</code>', "<code>df['customer_id'].duplicated().sum()</code>"] },
        { prompt: 'Two baselines. Compute the 5-fold CV ROC-AUC on train: <code>dummy_auc</code> — for <code>DummyClassifier(strategy="most_frequent")</code>; <code>base_auc</code> — for <code>make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression(max_iter=1000))</code>, only on the <code>FEATURES</code> columns.', check: { tests: String.raw`assert abs(dummy_auc - 0.5) < 1e-9, f'dummy_auc should be 0.5, you have {dummy_auc}'
assert abs(base_auc - 0.8134) < 0.003, f'base_auc should be ≈ 0.813, you have {base_auc:.4f}. Did you use FEATURES, cv=5, scoring="roc_auc"?'
assert len(X_train) == 450, 'Do not change the split'` }, hints: ["<code>cross_val_score(model, X_train[FEATURES], y_train, cv=5, scoring='roc_auc').mean()</code>", 'Build the pipeline with <code>make_pipeline(...)</code>'] },
        { prompt: 'Why is <code>SimpleImputer</code> used inside the pipeline and not applied to all the data beforehand?', options: ['It is faster that way', 'In CV and on test the median is computed only from the train part, there is no leakage, and the same step is repeated automatically in the service', 'pandas cannot fill missing values', 'The imputer only works in a pipeline'], explain: 'Preprocessing inside a pipeline is fitted only on the train part in each fold and is saved together with the model: a missing value that reaches the service is filled with exactly the same median.' }
      ]
    },
    'cap6-3': {
      title: 'Choosing a model and saving the artifact',
      body: `
<p>Now we try to beat the baseline and save the winning model as an <b>artifact</b> that the service can load.</p>
<h3>Two candidates</h3>
<ol>
<li><b>Compact</b>: 4 numeric features, imputer + scaler + logistic regression.</li>
<li><b>Full</b>: all features. For the numeric ones imputer + scaler, for <code>city</code> and <code>plan</code> <code>OneHotEncoder(handle_unknown='ignore')</code> — through a <code>ColumnTransformer</code>.</li>
</ol>
<pre><code>NUM = ['age', 'tenure_months', 'monthly_fee', 'data_gb', 'support_calls', 'has_contract']
CAT = ['city', 'plan']
pre = ColumnTransformer([
    ('num', make_pipeline(SimpleImputer(strategy='median'), StandardScaler()), NUM),
    ('cat', OneHotEncoder(handle_unknown='ignore'), CAT)])
full = make_pipeline(pre, LogisticRegression(max_iter=1000))</code></pre>
<p>On this data the CV ROC-AUC is about: compact ≈ 0.813, full ≈ 0.811. More features did not win. In such a case we choose the <b>simpler</b> one: 4 fields are enough for the API, validation is easier, fewer columns to watch for drift, easier to explain. This is a real engineering decision, and we justify it in the README.</p>
<h3>Artifact: model + metadata</h3>
<p>The service loads a file, not a notebook. Two files per model:</p>
<pre><code>import pickle, json
with open('churn_model.pkl', 'wb') as f:
    pickle.dump(model, f)               # the whole pipeline: imputer + scaler + model
meta = {'version': 'churn-lr-1.0.0', 'features': FEATURES, 'threshold': 0.3,
        'metrics': {'cv_auc': 0.813, 'test_auc': 0.816}, 'sklearn_version': sklearn.__version__}
with open('model_meta.json', 'w') as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)</code></pre>
<p>Why metadata? The service reads from this file which features to expect and which threshold to use, and in monitoring <code>version</code> answers the question "which version responded?". In M6.3 MLflow does this systematically: <code>mlflow.log_params</code>, <code>mlflow.log_metric('test_auc', ...)</code>, <code>mlflow.sklearn.log_model(model, 'model')</code> and a version in the Model Registry.</p>
<div class="tip">Load pickle only from files you created yourself: a foreign pickle can run any code. And pin the sklearn version (<code>requirements.txt</code>): a model saved with another version may fail to load or behave differently.</div>
<h3>Training-serving skew</h3>
<p>The most dangerous bug: one kind of preprocessing in training, another in the service. For example, in the notebook you divided <code>monthly_fee</code> by a thousand tenge, while the API receives it in tenge. The model answers wrongly, but no exception is raised. The fix is to put all preprocessing inside the pipeline and save it as one artifact.</p>`,
      ex: [
        { prompt: 'Compare the two candidates on train by 5-fold CV ROC-AUC: <code>cv_compact</code> (FEATURES, imputer + scaler + LR) and <code>cv_full</code> (the ColumnTransformer from the lesson, NUM + CAT). Store the winner in <code>chosen</code> (<code>"compact"</code> or <code>"full"</code>); on a tie, the simpler one. Then train the compact pipeline as <code>model</code> on the whole train set and compute <code>test_auc</code>.', check: { tests: String.raw`assert abs(cv_compact - 0.8134) < 0.003, f'cv_compact should be ≈ 0.813, you have {cv_compact:.4f}'
assert abs(cv_full - 0.8111) < 0.004, f'cv_full should be ≈ 0.811, you have {cv_full:.4f}. Use NUM + CAT and OneHotEncoder(handle_unknown="ignore")'
assert chosen == 'compact', 'By CV compact won (or tied): chosen = "compact"'
assert hasattr(model, 'predict_proba') and model.n_features_in_ == 4, 'model is the compact pipeline trained on FEATURES'
assert abs(test_auc - 0.8161) < 0.003, f'test_auc should be ≈ 0.816, you have {test_auc:.4f}'` }, hints: ["<code>cross_val_score(full, X_train[NUM + CAT], y_train, cv=5, scoring='roc_auc').mean()</code>", "<code>chosen = 'compact' if cv_compact >= cv_full else 'full'</code>"] },
        { prompt: 'Save the artifact. Write <code>model</code> with <code>pickle</code> to the file <code>churn_model.pkl</code>. Write to the file <code>model_meta.json</code> a dictionary with the keys <code>version</code> (<code>"churn-lr-1.0.0"</code>), <code>features</code> (FEATURES), <code>threshold</code> (0.3), <code>metrics</code> (<code>{"test_auc": ...}</code>). Then load the model back from the file as <code>loaded</code>.', check: { tests: String.raw`import json as _json, pickle as _pk, numpy as _np
with open('churn_model.pkl', 'rb') as _f:
    _m = _pk.load(_f)
assert _np.allclose(_m.predict_proba(X_test[FEATURES])[:, 1], model.predict_proba(X_test[FEATURES])[:, 1]), 'churn_model.pkl should contain the trained model'
with open('model_meta.json') as _f:
    _meta = _json.load(_f)
assert _meta.get('version') == 'churn-lr-1.0.0', 'meta["version"] = "churn-lr-1.0.0"'
assert _meta.get('features') == FEATURES, 'meta["features"] = FEATURES'
assert _meta.get('threshold') == 0.3, 'meta["threshold"] = 0.3'
assert abs(_meta.get('metrics', {}).get('test_auc', 0) - test_auc) < 1e-3, 'meta["metrics"]["test_auc"] is the computed test_auc'
assert loaded is not None and _np.allclose(loaded.predict_proba(X_test[FEATURES])[:, 1], model.predict_proba(X_test[FEATURES])[:, 1]), 'loaded = pickle.load(...) is the model loaded from the file'` }, hints: ["<code>with open('churn_model.pkl', 'wb') as f: pickle.dump(model, f)</code>", "Loading: <code>with open('churn_model.pkl', 'rb') as f: loaded = pickle.load(f)</code>"] },
        { prompt: 'In the notebook the model was trained on <code>monthly_fee</code> divided by a thousand tenge, while the API accepts tenge. The service raises no errors, but the predictions look odd. What is this and how do you prevent it?', options: ['Overfitting; more data is needed', 'Training-serving skew; put all preprocessing inside the pipeline and save it as one artifact', 'Data drift; retrain the model', 'A latency problem; add a cache'], explain: 'Preprocessing in training and in the service differ — training-serving skew. If preprocessing is in the pipeline, the service gets exactly the same steps together with the artifact.' }
      ]
    },
    'cap6-4': {
      title: 'Predict endpoint and input validation',
      body: `
<p>The model is ready, now we turn it into an <b>endpoint</b> that the CRM can call. In M6.2 you did this with FastAPI. In production the code looks roughly like this:</p>
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
<p>Pydantic checks the request before it reaches the model: if a field is missing, has the wrong type or is out of range, FastAPI itself returns <b>422 Unprocessable Entity</b>. There is no FastAPI in the browser, so we model the same logic with a plain Python function: <code>predict_endpoint(payload) → (status, body)</code>.</p>
<h3>Validation rules (from the data contract)</h3>
<table>
<tr><th>Field</th><th>Type</th><th>Range</th></tr>
<tr><td><code>tenure_months</code></td><td>number</td><td>0…600</td></tr>
<tr><td><code>monthly_fee</code></td><td>number</td><td>1…100,000 ₸</td></tr>
<tr><td><code>support_calls</code></td><td>number</td><td>0…100</td></tr>
<tr><td><code>has_contract</code></td><td>number</td><td>0 or 1</td></tr>
</table>
<h3>Step-by-step example</h3>
<pre><code>predict_endpoint({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})
# (200, {'churn_proba': 0.8427, 'will_churn': True, 'model_version': 'churn-lr-1.0.0'})

predict_endpoint({'tenure_months': '5', 'monthly_fee': 6500, 'support_calls': -1})
# (422, {'errors': ['tenure_months: сан болуы керек',
#                   'support_calls: out of range [0, 100]', 'has_contract: missing']})</code></pre>
<p>We return all errors at once — the client fixes them in one go. Extra fields (<code>customer_id</code>) are ignored. (The Kazakh message <code>сан болуы керек</code> means "must be a number".)</p>
<div class="tip">In Python <code>True</code> is a subclass of <code>int</code>: <code>isinstance(True, int)</code> → <code>True</code>. So we check bool separately and do not accept it as a number. Codes: <b>200</b> — success, <b>422</b> — the client sent bad data, <b>500</b> — the service's own error (never present it as the client's fault).</div>`,
      ex: [
        { prompt: 'Write the function <code>validate(payload)</code>: it returns a list of errors (an empty list means everything is fine). If <code>payload</code> is not a dictionary — one error. For each field in <code>RULES</code>: if it is missing — <code>"{field}: missing"</code>; if it is not a number or is a bool — <code>"{field}: сан болуы керек"</code> (Kazakh for "must be a number"); if it is out of range — <code>"{field}: out of range [lo, hi]"</code>. Every error must contain the field name.', check: { tests: String.raw`_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
assert validate(_ok) == [], f'A valid payload needs an empty list, you have {validate(_ok)}'
assert validate(dict(_ok, customer_id='A-17')) == [], 'Extra fields are ignored'
_e = validate({k: v for k, v in _ok.items() if k != 'monthly_fee'})
assert len(_e) == 1 and 'monthly_fee' in _e[0], f'monthly_fee is missing: one error with the field name. You have {_e}'
_e = validate(dict(_ok, tenure_months='12'))
assert len(_e) == 1 and 'tenure_months' in _e[0], 'The text "12" is not a number, it should be an error'
_e = validate(dict(_ok, has_contract=True))
assert len(_e) == 1 and 'has_contract' in _e[0], 'A bool is not accepted as a number'
_e = validate(dict(_ok, support_calls=-1))
assert len(_e) == 1 and 'support_calls' in _e[0], 'support_calls = -1 is out of range'
assert len(validate({})) == 4, 'An empty dictionary: 4 errors (every field missing)'
assert len(validate([1, 2])) >= 1, 'A payload that is not a dictionary should give an error'
assert validate(dict(_ok, monthly_fee=6500.5)) == [], 'A float number is accepted too'` }, hints: ['<code>if not isinstance(payload, dict): return [...]</code>', "<code>if isinstance(v, bool) or not isinstance(v, (int, float))</code>, then <code>lo <= v <= hi</code>"] },
        { prompt: 'The model, <code>validate</code>, <code>MODEL_VERSION</code> and <code>THRESHOLD</code> are ready. Write <code>predict_endpoint(payload)</code>: on errors return <code>(422, {"errors": [...]})</code>; otherwise build a one-row DataFrame in FEATURES order and return <code>(200, {"churn_proba": round(proba, 4), "will_churn": proba >= THRESHOLD, "model_version": MODEL_VERSION})</code>.', check: { tests: String.raw`import pandas as _pd
_ok = {'customer_id': 'A-17', 'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
_s, _b = predict_endpoint(_ok)
_p = float(model.predict_proba(_pd.DataFrame([{f: _ok[f] for f in FEATURES}]))[0, 1])
assert _s == 200, f'For a valid payload the status is 200, you have {_s}'
assert set(_b) == {'churn_proba', 'will_churn', 'model_version'}, f'Response keys: churn_proba, will_churn, model_version. You have {set(_b)}'
assert abs(_b['churn_proba'] - round(_p, 4)) < 1e-9, 'churn_proba = round(proba, 4)'
assert _b['will_churn'] == (_p >= THRESHOLD) and _b['model_version'] == MODEL_VERSION, 'will_churn = proba >= THRESHOLD, model_version = MODEL_VERSION'
_s2, _b2 = predict_endpoint({'tenure_months': 48, 'monthly_fee': 3500, 'support_calls': 0, 'has_contract': 1})
assert _s2 == 200 and not _b2['will_churn'], 'A long-time customer with a contract: will_churn False'
_s3, _b3 = predict_endpoint({'tenure_months': 5})
assert _s3 == 422 and len(_b3.get('errors', [])) == 3, 'Missing fields: 422 and 3 errors'` }, hints: ['First <code>errors = validate(payload)</code>; if there are any, <code>return 422, {"errors": errors}</code>', '<code>row = pd.DataFrame([{f: payload[f] for f in FEATURES}])</code>, <code>proba = float(model.predict_proba(row)[0, 1])</code>'] },
        { prompt: 'A client sent <code>{"tenure_months": "бес"}</code> (Kazakh for "five"), and the service crashed inside <code>predict_proba</code> and returned <b>500</b>. What is wrong?', options: ['Everything is fine, 500 means an error', 'Validation was not done before the model: this is a client error, it needs 422 and a clear message', 'The model must be retrained', 'The client should get 200 and proba = 0'], explain: 'Bad input is a client error (4xx). 500 means a fault in the service itself and causes false alerts in monitoring. Pydantic/validate must come before the model.' }
      ]
    },
    'cap6-5': {
      title: 'Tests, monitoring and drift',
      body: `
<p>Once the service is running, two questions remain: "did a change break anything?" (tests, M6.1) and "does the model get worse over time?" (monitoring, M6.3).</p>
<h3>Kinds of tests</h3>
<table>
<tr><th>Kind</th><th>Example</th></tr>
<tr><td>Unit</td><td><code>validate</code> finds a missing field</td></tr>
<tr><td>Contract</td><td>the response has <code>churn_proba</code>, <code>will_churn</code>, <code>model_version</code>, proba ∈ [0, 1]</td></tr>
<tr><td>Directional</td><td>if support_calls goes up, the risk cannot fail to go up</td></tr>
<tr><td>Quality gate</td><td>in CI, AUC ≥ 0.78 on the fixed test set, otherwise no merge</td></tr>
</table>
<pre><code># tests/test_api.py — pytest finds and runs it by itself
def test_missing_field_422():
    status, body = predict_endpoint({'tenure_months': 5})
    assert status == 422
    assert any('monthly_fee' in e for e in body['errors'])</code></pre>
<p>A good test is <b>able to catch</b> a bug. One way to check this is to feed it a deliberately broken version (a mutant) and see whether the test fails.</p>
<h3>Monitoring: three layers</h3>
<ol>
<li><b>Service</b>: number of requests, p95 latency, share of 4xx/5xx.</li>
<li><b>Data</b>: has the distribution of input features moved away from the training one (<b>data drift</b>)? Has the distribution of predictions (mean proba, share of will_churn) changed?</li>
<li><b>Model quality</b>: the true answer (left / did not leave) is known only after 1–3 months. Then we recompute AUC and campaign profit.</li>
</ol>
<h3>PSI — Population Stability Index</h3>
<p>We build bins from the quantiles of the training data and compare the share in each bin "before" (e) and "now" (a):</p>
<pre><code>PSI = Σ (a − e) · ln(a / e)
&lt; 0.1 — stable · 0.1–0.25 — watch · &gt; 0.25 — alert</code></pre>
<p>Example: a marketing campaign brought many new subscribers, and in the new month <code>tenure_months</code> is much lower than in training. PSI ≈ 3.6 — clear drift: the model has seen few such subscribers, and the predictions need checking. The PSI between train and test ≈ 0.07 — just random variation.</p>
<div class="tip">Drift does not automatically mean "retrain the model". First find the cause: did the data pipeline break (for example, tenge turned into tiyn), did the business change (a new plan), or did behaviour really change?</div>`,
      ex: [
        { prompt: 'The service (<code>predict_endpoint</code>) is ready. Write three pytest-style tests: <code>test_valid_returns_200</code> (status 200, <code>0 ≤ churn_proba ≤ 1</code>), <code>test_missing_field_422</code> (a missing field → 422), <code>test_more_calls_higher_risk</code> (other fields equal, support_calls 0 and 5: proba strictly grows). The checker runs your tests on the correct service and on deliberately broken versions.', check: { tests: String.raw`_real = predict_endpoint
for _t in (test_valid_returns_200, test_missing_field_422, test_more_calls_higher_risk):
    _t()
def _breaks(_fn):
    try:
        _fn()
    except Exception:
        return True
    return False
predict_endpoint = lambda p: (200, {'churn_proba': 0.5, 'will_churn': True, 'model_version': MODEL_VERSION})
assert _breaks(test_missing_field_422), 'A service without validation answers 200 to every request: test_missing_field_422 should catch it (check status == 422)'
assert _breaks(test_more_calls_higher_risk), 'test_more_calls_higher_risk should catch a service that always returns 0.5 (high > low)'
predict_endpoint = lambda p: (200, {'churn_proba': 1.7, 'will_churn': True, 'model_version': MODEL_VERSION})
assert _breaks(test_valid_returns_200), 'test_valid_returns_200 should catch a service that returns proba = 1.7 (0 ≤ proba ≤ 1)'
predict_endpoint = lambda p: (500, {'error': 'internal'})
assert _breaks(test_valid_returns_200), 'test_valid_returns_200 should catch a service that returns 500 (status == 200)'
predict_endpoint = _real` }, hints: ['<code>status, body = predict_endpoint(BASE)</code>, then <code>assert status == 200</code> and the proba range', "Compare the responses for <code>dict(BASE, support_calls=0)</code> and <code>dict(BASE, support_calls=5)</code>"] },
        { prompt: 'Write <code>psi(expected, actual, bins=5)</code>: the bin edges are the quantiles of <code>expected</code> (<code>np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))</code>, with the outer edges <code>-inf</code>/<code>inf</code>); clip the shares with <code>np.clip(..., 1e-4, None)</code>. Compute <code>psi_same</code> (train vs test tenure) and <code>psi_new</code> (train vs <code>new_month</code> tenure), and get <code>new_status</code> with the function <code>status(psi)</code> (<code>"ok"</code> &lt; 0.1 ≤ <code>"watch"</code> ≤ 0.25 &lt; <code>"alert"</code>).', check: { tests: String.raw`import numpy as _np
assert abs(psi_same - 0.0693) < 0.005, f'psi_same should be ≈ 0.069, you have {psi_same:.4f}'
assert abs(psi_new - 3.557) < 0.02, f'psi_new should be ≈ 3.56, you have {psi_new:.3f}'
assert abs(psi(_np.arange(100), _np.arange(100))) < 1e-9, 'For identical distributions PSI = 0'
assert status(0.05) == 'ok' and status(0.1) == 'watch' and status(0.25) == 'watch' and status(0.3) == 'alert', 'status: < 0.1 ok, 0.1–0.25 watch, > 0.25 alert'
assert new_status == 'alert', 'new_month should give alert'` }, hints: ['<code>e = np.histogram(expected, edges)[0] / len(expected)</code>, and the same for actual', '<code>np.sum((a - e) * np.log(a / e))</code>'] },
        { done: 'This is the "Monitoring" section of the README and a ready answer to the interview question "how do you monitor a model in production?".', prompt: 'Write a monitoring plan for the churn service (at least 80 words): what is logged, which metrics and thresholds (service, drift, quality), how you account for the true answers arriving late, who gets the alert, when and how retraining is done. Then grade yourself honestly: at least <b>3 / 4</b> on every criterion.', criteria: [
          { name: 'What is logged', levels: ['Not stated', '"We log everything"', 'Input features, proba, model_version, time, status', 'Also request id, latency, and keeping personal data out of the logs'] },
          { name: 'Metrics and thresholds', levels: ['None', 'Metrics named, no thresholds', 'Service, drift (PSI) and quality metrics with specific thresholds', 'Also the prediction distribution and handling the delay of true answers'] },
          { name: 'Action plan', levels: ['None', '"We will update the model"', 'Who gets the alert and the retraining condition', 'Steps to check the cause, retraining, releasing the new version through test/shadow, and rollback'] }
        ] }
      ]
    },
    'cap6-gate': {
      title: 'Final project: the churn ML service',
      body: `
<p>The last stage: choosing the threshold by business value, a full endpoint and a batch endpoint, a drift report and a README for your portfolio. There are no hints, and the pass mark is 75%. When you are ready, put the project on GitHub: <code>src/</code> (train.py, service.py), <code>tests/</code>, <code>models/</code> (artifact + meta), <code>Dockerfile</code>, <code>README.md</code>.</p>
<h3>Recommended repository structure</h3>
<pre><code>churn-service/
├── src/train.py          # data → pipeline → churn_model.pkl + model_meta.json
├── src/service.py        # FastAPI: /health, /predict, /predict_batch
├── tests/test_api.py     # unit, contract, directional, quality gate
├── monitoring/drift.py   # PSI report, cron or Airflow
├── Dockerfile            # python:3.11-slim, requirements.txt, uvicorn
├── .github/workflows/ci.yml   # pytest + quality gate
└── README.md</code></pre>`,
      ex: [
        { prompt: 'Choosing the threshold. The train part is split again into <code>X_fit</code>/<code>X_val</code>. Train the compact pipeline as <code>model</code> on <code>X_fit</code>. From the thresholds <code>[0.1, 0.15, …, 0.8]</code>, store the one that maximizes <code>campaign_profit</code> on validation in <code>best_threshold</code>, and that profit in <code>val_profit</code>. Then compute <code>test_profit</code> on test with the same threshold.', check: { tests: String.raw`assert hasattr(model, 'predict_proba') and model.n_features_in_ == 4, 'model is the compact pipeline trained on FEATURES'
assert len(X_fit) == 315, 'Do not change the split'
assert abs(float(best_threshold) - 0.2) < 1e-9, f'best_threshold should be 0.2, you have {best_threshold}. Choose the threshold on validation, not on test'
assert abs(val_profit - 222000) < 1, f'val_profit should be 222 000, you have {val_profit}'
assert abs(test_profit - 218000) < 1, f'test_profit should be 218 000, you have {test_profit}'` } },
        { prompt: 'Endpoints. <code>RULES</code> and the model are ready. (1) <code>predict_endpoint(payload)</code>: validation by the rules from cap6-4, on errors <code>(422, {"errors": [...]})</code>, otherwise <code>(200, {"churn_proba", "will_churn", "model_version"})</code>. (2) <code>predict_batch(records)</code>: empty or not a list → <code>(422, ...)</code>; more than 100 → <code>(413, ...)</code>; otherwise <code>(200, {"results": [...], "n_ok": k, "n_errors": m})</code>, where each result is <code>{"index": i, "status": s, **body}</code>. One bad record must not bring down the whole batch.', check: { tests: String.raw`import pandas as _pd
_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}
_s, _b = predict_endpoint(_ok)
_p = float(model.predict_proba(_pd.DataFrame([{f: _ok[f] for f in FEATURES}]))[0, 1])
assert _s == 200 and abs(_b['churn_proba'] - round(_p, 4)) < 1e-9 and _b['will_churn'] == (_p >= THRESHOLD) and _b['model_version'] == MODEL_VERSION, 'predict_endpoint should give 200 and a correct response on a valid payload'
for _bad in ({}, dict(_ok, has_contract=True), dict(_ok, monthly_fee='6500'), dict(_ok, tenure_months=-3), 'text'):
    _s, _b = predict_endpoint(_bad)
    assert _s == 422 and _b.get('errors'), f'Bad payload {_bad!r}: 422 and errors are required'
_s, _b = predict_batch([_ok, {'tenure_months': 5}, dict(_ok, support_calls=0)])
assert _s == 200 and _b['n_ok'] == 2 and _b['n_errors'] == 1, 'Batch: 2 successful, 1 error'
assert [r['index'] for r in _b['results']] == [0, 1, 2] and _b['results'][1]['status'] == 422, 'results gives index and status for each record'
assert _b['results'][0]['churn_proba'] > _b['results'][2]['churn_proba'], 'results should contain churn_proba'
assert predict_batch([])[0] == 422 and predict_batch('x')[0] == 422, 'An empty batch or not a list: 422'
assert predict_batch([_ok] * 101)[0] == 413, 'More than 100 records: 413'` } },
        { prompt: 'Drift report. <code>psi</code> is ready. Write <code>drift_report(ref, new, cols, threshold=0.25)</code>: it returns <code>(scores, alerts)</code>, where <code>scores = {column: psi}</code> and <code>alerts</code> are the columns with PSI above the threshold (a list sorted alphabetically). For <code>new_month</code>, where prices went up by 15%, compute <code>scores, alerts = drift_report(X_train, new_month, ["tenure_months", "monthly_fee", "support_calls"])</code>.', check: { tests: String.raw`assert set(scores) == {'tenure_months', 'monthly_fee', 'support_calls'}, 'scores should have three columns'
assert abs(scores['monthly_fee'] - psi(X_train['monthly_fee'], new_month['monthly_fee'])) < 1e-9, 'scores[column] = psi(ref[column], new[column])'
assert alerts == ['monthly_fee'], f"alerts should be ['monthly_fee'], you have {alerts}"
_s, _a = drift_report(X_train, X_train, ['tenure_months', 'support_calls'])
assert _a == [] and all(abs(v) < 1e-9 for v in _s.values()), 'No alert on identical data'
_s, _a = drift_report(X_train, new_month, ['monthly_fee', 'tenure_months'], threshold=0.0)
assert _a == ['monthly_fee', 'tenure_months'], 'alerts should be sorted alphabetically and use the threshold parameter'` } },
        { prompt: 'After the new prices, PSI for <code>monthly_fee</code> = 5.8 (alert), and the true churn answers will be known only in 2 months. What is the best action?', options: ['Alarm — switch the service off at once', 'Do nothing: AUC is still unknown', 'Confirm the cause (a price change, not a pipeline bug), look at the prediction distribution, make monthly_fee relative to the plan or plan retraining on new data, test the new version in shadow mode', 'Quickly drop the monthly_fee column from the model and deploy without tests'], explain: 'Drift is the start of an investigation. We find the cause, assess the effect on the model (the prediction distribution) and update in a controlled way: shadow/canary, tests, a rollback plan.' },
        { done: 'Congratulations — this is the strongest project in your portfolio. Pin the README on GitHub and add a 2-minute demo video (curl /predict, tests, drift report). For your CV: "Churn prediction service: sklearn pipeline, FastAPI + pydantic validation, pytest (contract + directional), PSI drift monitoring, Docker; +218,000 ₸ test profit at the business threshold".', prompt: 'Write the text of the project <b>README.md</b> (at least 120 words): Problem (cap6-1), Data & baseline, Model (why compact, CV/test results, the threshold and the profit in ₸), API (endpoints, an example request/response, error codes), Testing, Monitoring, How to run (Docker/uvicorn) and Limitations. At the end add a 2-minute demo script (3–5 steps). Then grade yourself honestly: at least <b>3 / 4</b> on every criterion.', criteria: [
          { name: 'Structure and completeness', levels: ['Only a description of the code', 'Several sections, but no Problem or API', 'All the main sections are there', 'All sections, and the value of the project is clear from the first paragraph'] },
          { name: 'Numbers and decisions', levels: ['No numbers', 'Only one metric', 'Baseline, CV/test AUC, threshold and profit in ₸', 'Numbers plus a justification for each decision (why compact, why threshold 0.2/0.3)'] },
          { name: 'Reproducibility', levels: ['No run instructions', 'General ("run it with Docker")', 'Specific commands and an example request/response', 'Commands, pinned versions, how to run the tests, and a demo script'] },
          { name: 'Limitations and next steps', levels: ['None', 'General words', 'Specific limitations (data size, the 30% assumption, late answers)', 'Limitations, risks and specific next steps (pilot, batch scoring, retraining schedule)'] }
        ] }
      ]
    }
  }
});
