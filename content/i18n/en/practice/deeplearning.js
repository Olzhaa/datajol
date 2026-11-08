// deeplearning practice tasks: English text. Code, solutions and checks are in content/practice/deeplearning.js.
DJ.i18n.patch({
 "lessons": {
  "dl-1": {
   "pr": [
    {
     "title": "The tanh function",
     "prompt": "<p>Write the function <code>tanh(z)</code> using the formula: <code>(e<sup>z</sup> − e<sup>−z</sup>) / (e<sup>z</sup> + e<sup>−z</sup>)</code>. It must work with a numpy array. For example, <code>tanh(np.array([0.0]))</code> → <code>[0.]</code>, and <code>tanh(1.0)</code> ≈ 0.7616.</p>",
     "hints": [
      "Use <code>np.exp(z)</code> and <code>np.exp(-z)</code>",
      "Compare the result with <code>np.tanh</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_z = _np.array([-2.0, 0.0, 0.5, 1.0])\nassert tanh(_z) is not None, 'tanh must return a value'\nassert _np.allclose(tanh(_z), _np.tanh(_z)), f'tanh([-2, 0, 0.5, 1]) ≈ {_np.tanh(_z).round(4)} болуы керек'\nassert abs(float(tanh(1.0)) - 0.7616) < 1e-4, 'tanh(1.0) ≈ 0.7616 болуы керек'"
     }
    },
    {
     "title": "Leaky ReLU",
     "prompt": "<p>Write <code>leaky_relu(z, alpha=0.01)</code>: positive values stay the same, and negative values are multiplied by <code>alpha</code>. For example, <code>leaky_relu(np.array([-10.0, 0.0, 3.0]))</code> → <code>[-0.1, 0., 3.]</code>.</p>",
     "hints": [
      "<code>np.where(z > 0, z, alpha * z)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = leaky_relu(_np.array([-10.0, 0.0, 3.0]))\nassert _r is not None and _np.allclose(_r, [-0.1, 0.0, 3.0]), f'leaky_relu([-10, 0, 3]) should equal [-0.1, 0, 3], you have {_r}'\nassert _np.allclose(leaky_relu(_np.array([-2.0, 5.0]), alpha=0.2), [-0.4, 5.0]), 'Use the alpha parameter: -2 · 0.2 = -0.4'"
     }
    },
    {
     "title": "The linear part of a neuron",
     "prompt": "<p>A neuron estimates whether a student will pass an exam. Features: hours of study and share of attended classes. The function <code>linear_part(x, w, b)</code> must return the value <code>z = x @ w + b</code>. Then compute <code>x = [5, 0.8]</code>, <code>w = [0.3, 2.0]</code>, <code>b = -2.5</code> for <code>z</code> and <code>prob = sigmoid(z)</code> (z = 0.6).</p>",
     "hints": [
      "<code>x @ w + b</code>",
      "First turn the list into an array with <code>np.asarray(x, dtype=float)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert z is not None and abs(float(z) - 0.6) < 1e-9, f'z = 5·0.3 + 0.8·2.0 − 2.5 = 0.6, you have {z}'\nassert prob is not None and abs(float(prob) - 0.6457) < 1e-3, f'prob = sigmoid(0.6) ≈ 0.646, you have {prob}'\nassert abs(float(linear_part(_np.array([1.0, 1.0]), _np.array([2.0, 3.0]), 1.0)) - 6.0) < 1e-9, 'linear_part must work for any x, w and b'"
     }
    },
    {
     "title": "Customer probabilities",
     "prompt": "<p>An online shop uses one neuron to compute purchase probabilities for several customers at once. The function <code>predict_proba(X, w, b)</code> must return <code>(n,)</code> probabilities for the matrix <code>(n, k)</code>. <code>predict(X, w, b, threshold=0.5)</code> is 1 if the probability is not below the threshold, otherwise 0 (int array). Example: <code>X = [[3, 2], [1, 0], [5, 4]]</code>, <code>w = [0.4, 0.5]</code>, <code>b = -1.5</code> → <code>predict</code> = <code>[1, 0, 1]</code>.</p>",
     "hints": [
      "<code>X @ w</code> gives one z for each row",
      "<code>(p >= threshold).astype(int)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.array([[3.0, 2.0], [1.0, 0.0], [5.0, 4.0]]); _w = _np.array([0.4, 0.5])\n_p = predict_proba(_X, _w, -1.5)\nassert _p is not None and _np.shape(_p) == (3,), f'The shape of predict_proba must be (3,), you have {_np.shape(_p)}'\nassert _np.allclose(_p, 1 / (1 + _np.exp(-(_X @ _w - 1.5)))), 'predict_proba = sigmoid(X @ w + b)'\nassert list(predict(_X, _w, -1.5)) == [1, 0, 1], f'predict = [1, 0, 1] must hold, you have {predict(_X, _w, -1.5)}'\nassert list(predict(_X, _w, -1.5, threshold=0.9)) == [0, 0, 1], 'Use the threshold parameter: at a threshold of 0.9 only the third customer passes'"
     }
    },
    {
     "title": "Weather classes",
     "prompt": "<p>For each city the model outputs logit values for three classes (clear, cloudy, rain): the shape of <code>Z</code> is <code>(n, 3)</code>. Write <code>softmax_rows(Z)</code>: for each row it computes softmax (each row sums to 1). To avoid overflow with large numbers, subtract the row's maximum from each row: <code>Z.max(axis=1, keepdims=True)</code>. Then <code>best_class(Z)</code> returns the index of the most likely class for each row.</p>",
     "hints": [
      "<code>e / e.sum(axis=1, keepdims=True)</code>",
      "<code>np.argmax(..., axis=1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_Z = _np.array([[2.0, 1.0, 0.1], [0.0, 0.0, 3.0], [1000.0, 1000.0, 0.0]])\n_P = softmax_rows(_Z)\nassert _P is not None and _np.shape(_P) == (3, 3), 'The result shape must match Z'\nassert _np.allclose(_P.sum(axis=1), 1), 'The sum of each row must equal 1'\nassert _np.allclose(_P[0], [0.659, 0.242, 0.099], atol=1e-3), f'The first row ≈ [0.659, 0.242, 0.099], you have {_P[0]}'\nassert _np.allclose(_P[2], [0.5, 0.5, 0.0]), 'There must be no nan for large numbers: subtract the maximum from each row'\nassert list(best_class(_Z[:2])) == [0, 2], 'best_class = [0, 2] болуы керек'"
     }
    },
    {
     "title": "Two layers without activation",
     "prompt": "<p>Without an activation, two linear layers are equal to one layer: <code>(x @ W1) @ W2 = x @ (W1 @ W2)</code>. The function <code>collapse(W1, W2)</code> must return this combined matrix. <code>two_layers(X, W1, W2)</code> applies the two layers in turn and returns <code>X @ W1 @ W2</code>. The results of both ways must match.</p>",
     "hints": [
      "<code>W1 @ W2</code>, shape <code>(3, 2)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(5)\n_X = _r.normal(size=(4, 3)); _W1 = _r.normal(size=(3, 5)); _W2 = _r.normal(size=(5, 2))\n_W = collapse(_W1, _W2)\nassert _W is not None and _np.shape(_W) == (3, 2), f'The shape of collapse must be (3, 2), you have {_np.shape(_W)}'\nassert _np.allclose(two_layers(_X, _W1, _W2), _X @ _W1 @ _W2), 'two_layers = X @ W1 @ W2'\nassert _np.allclose(_X @ _W, two_layers(_X, _W1, _W2)), 'X @ collapse(W1, W2) must equal the result of the two layers'"
     }
    },
    {
     "title": "Softmax with temperature",
     "prompt": "<p>Write <code>softmax_t(z, T=1.0)</code>: it divides the logit values by the temperature (<code>z / T</code>), and then computes a stable softmax. If T is small, the probability piles up in the largest class; if T is large, all values become equal. <code>T &lt;= 0</code> — then <code>ValueError</code>. For example, <code>softmax_t(np.array([2.0, 1.0, 0.1]), 1.0)</code> ≈ <code>[0.659, 0.242, 0.099]</code>.</p>",
     "hints": [
      "First <code>z / T</code>, then <code>z - z.max()</code>",
      "<code>if T &lt;= 0: raise ValueError(...)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_z = _np.array([2.0, 1.0, 0.1])\n_a = softmax_t(_z, 1.0)\nassert _a is not None and _np.allclose(_a, [0.659, 0.242, 0.099], atol=1e-3), f'At T = 1 ≈ [0.659, 0.242, 0.099], you have {_a}'\n_c = softmax_t(_z, 0.01)\nassert _np.isfinite(_c).all() and _c[0] > 0.999, 'At T = 0.01 the probability must pile up in the first class (there must be no nan)'\n_h = softmax_t(_z, 1000.0)\nassert _np.allclose(_h, 1 / 3, atol=1e-2), 'If T is large, the probabilities are ≈ 1/3'\ntry:\n    softmax_t(_z, 0)\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'T = 0 болса ValueError тудыру керек'"
     }
    },
    {
     "title": "Layer with a chosen activation",
     "prompt": "<p>Write <code>dense(X, W, b, act)</code>: <code>Z = X @ W + b</code>, then the activation according to <code>act</code>: <code>\"sigmoid\"</code>, <code>\"tanh\"</code>, <code>\"relu\"</code>, <code>\"softmax\"</code> (row by row, so softmax is stable) or <code>\"linear\"</code> (unchanged). If another name comes in, raise <code>ValueError</code>. The result shape is <code>(n, W.shape[1])</code>.</p>",
     "hints": [
      "First compute <code>Z</code>, then the branches of <code>if act == ...</code>",
      "For softmax <code>axis=1, keepdims=True</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(2)\n_X = _r.normal(size=(4, 3)); _W = _r.normal(size=(3, 2)); _b = _np.array([0.5, -0.5])\n_Z = _X @ _W + _b\nassert _np.allclose(dense(_X, _W, _b, 'linear'), _Z), 'linear: Z = X @ W + b'\nassert _np.allclose(dense(_X, _W, _b, 'relu'), _np.maximum(0, _Z)), 'relu: np.maximum(0, Z)'\nassert _np.allclose(dense(_X, _W, _b, 'tanh'), _np.tanh(_Z)), 'tanh: np.tanh(Z)'\nassert _np.allclose(dense(_X, _W, _b, 'sigmoid'), 1 / (1 + _np.exp(-_Z))), 'sigmoid: 1 / (1 + exp(-Z))'\n_s = dense(_X, _W, _b, 'softmax')\nassert _np.shape(_s) == (4, 2) and _np.allclose(_s.sum(axis=1), 1), 'softmax by rows: the sum is 1'\ntry:\n    dense(_X, _W, _b, 'swish')\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'An unknown activation must raise a ValueError'"
     }
    }
   ]
  },
  "dl-2": {
   "pr": [
    {
     "title": "Matrix compatibility",
     "prompt": "<p>Write the function <code>can_multiply(shape_a, shape_b)</code>: given two shapes (tuples). Can you multiply <code>A @ B</code>? Rule: <code>(n, a) @ (a, b)</code> — the inner sizes must match. For example, <code>can_multiply((5, 3), (3, 4))</code> → <code>True</code>, <code>can_multiply((5, 3), (4, 3))</code> → <code>False</code>.</p>",
     "hints": [
      "<code>shape_a[1] == shape_b[0]</code>"
     ],
     "check": {
      "tests": "assert can_multiply((5, 3), (3, 4)) is True, '(5, 3) @ (3, 4) is possible: True'\nassert can_multiply((5, 3), (4, 3)) is False, '(5, 3) @ (4, 3) is not possible: False'\nassert can_multiply((1, 784), (784, 128)) is True, '(1, 784) @ (784, 128) is possible'"
     }
    },
    {
     "title": "Layer shapes",
     "prompt": "<p>Write <code>layer_shapes(n, layers)</code>: given <code>n</code> examples and layer sizes <code>layers</code> (for example, <code>[3, 4, 1]</code>). The function must return the list of array shapes after each layer, including the input: <code>layer_shapes(10, [3, 4, 1])</code> → <code>[(10, 3), (10, 4), (10, 1)]</code>.</p>",
     "hints": [
      "The shape of each layer <code>(n, k)</code>"
     ],
     "check": {
      "tests": "assert layer_shapes(10, [3, 4, 1]) == [(10, 3), (10, 4), (10, 1)], f'It must be [(10, 3), (10, 4), (10, 1)], you have {layer_shapes(10, [3, 4, 1])}'\nassert layer_shapes(1, [784, 128, 10]) == [(1, 784), (1, 128), (1, 10)], 'The function must also work for an MNIST network'"
     }
    },
    {
     "title": "Hidden layer",
     "prompt": "<p>Write <code>hidden(X, W1, b1)</code>: it returns the output of the hidden layer with ReLU: <code>max(0, X @ W1 + b1)</code>. In the example from the lesson: <code>X = [[1, 0, 2]]</code> and the given <code>W1</code> give the result <code>[[0, 0, 0.7, 1]]</code>. Compute <code>H = hidden(X, W1, b1)</code>.</p>",
     "hints": [
      "<code>np.maximum(0, X @ W1 + b1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert H is not None and _np.shape(H) == (1, 4), f'The shape of H must be (1, 4), you have {_np.shape(H)}'\nassert _np.allclose(H, [[0, 0, 0.7, 1.0]]), f'H must be [[0, 0, 0.7, 1]], you have {H}'\nassert _np.allclose(hidden(X, W1, _np.ones(4)), _np.maximum(0, X @ W1 + 1)), 'Do not forget to add b1'"
     }
    },
    {
     "title": "A network of any depth",
     "prompt": "<p>Write <code>forward_deep(X, params)</code>: <code>params</code> is a list of <code>(W, b)</code> pairs. All layers except the last use ReLU, and the last one uses sigmoid. The output will have the shape <code>(n, 1)</code>. If there is only one layer, apply only sigmoid.</p>",
     "hints": [
      "<code>for i, (W, b) in enumerate(params)</code>",
      "Find the last layer using <code>i == len(params) - 1</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(4)\n_X = _r.normal(size=(6, 3))\n_ps = [(_r.normal(size=(3, 5)), _r.normal(size=5)), (_r.normal(size=(5, 4)), _r.normal(size=4)), (_r.normal(size=(4, 1)), _r.normal(size=1))]\n_A = _X\nfor _W, _b in _ps[:-1]:\n    _A = _np.maximum(0, _A @ _W + _b)\n_ref = 1 / (1 + _np.exp(-(_A @ _ps[-1][0] + _ps[-1][1])))\n_out = forward_deep(_X, _ps)\nassert _out is not None and _np.shape(_out) == (6, 1), f'The output shape must be (6, 1), you have {_np.shape(_out)}'\nassert _np.allclose(_out, _ref), 'Hidden layers use ReLU, the last one uses sigmoid'\nassert _np.allclose(forward_deep(_X, [(_np.ones((3, 1)), _np.zeros(1))]), 1 / (1 + _np.exp(-_X.sum(axis=1, keepdims=True)))), 'If there is only one layer, only sigmoid'"
     }
    },
    {
     "title": "Weight initialization",
     "prompt": "<p>Write <code>init_params(layers, seed=0)</code>: for each pair of neighbouring sizes <code>(a, b)</code> create <code>W</code> from the generator <code>np.random.default_rng(seed)</code> <code>rng.normal(0, 0.1, (a, b))</code>, and <code>b</code> as <code>np.zeros(b)</code>. The function returns the list of pairs <code>(W, b)</code>. The same seed must always give the same weights.</p>",
     "hints": [
      "Create the generator once before the loop",
      "<code>zip(layers[:-1], layers[1:])</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_p = init_params([3, 4, 1], seed=1)\nassert len(_p) == 2, f'For [3, 4, 1] there must be 2 layers, you have {len(_p)}'\nassert _p[0][0].shape == (3, 4) and _p[0][1].shape == (4,), 'First layer: W (3, 4), b (4,)'\nassert _p[1][0].shape == (4, 1) and _p[1][1].shape == (1,), 'Second layer: W (4, 1), b (1,)'\nassert sum(W.size + b.size for W, b in _p) == 21, 'The total number of parameters must be 21'\nassert _np.allclose(init_params([3, 4, 1], seed=1)[0][0], _p[0][0]), 'One seed must give the same weights'\nassert not _np.allclose(init_params([3, 4, 1], seed=2)[0][0], _p[0][0]), 'A different seed must give different weights'\nassert _np.all(_p[0][1] == 0) and 0 < _np.std(_p[0][0]) < 0.3, 'b are zeros, W are small random numbers'"
     }
    },
    {
     "title": "Parameter budget",
     "prompt": "<p>A model for a phone has a limited number of parameters. Write <code>max_hidden(n_in, n_out, budget)</code>: it returns the largest <code>h</code> for which the number of parameters of the network <code>[n_in, h, n_out]</code> does not exceed <code>budget</code> (this network has <code>n_in·h + h + h·n_out + n_out</code> parameters). If no <code>h ≥ 1</code> fits, return 0. For example, <code>max_hidden(3, 1, 21)</code> → 4.</p>",
     "hints": [
      "Number of parameters = <code>h·(n_in + 1 + n_out) + n_out</code>",
      "Use integer division <code>//</code>"
     ],
     "check": {
      "tests": "assert max_hidden(3, 1, 21) == 4, f'max_hidden(3, 1, 21) must be 4, you have {max_hidden(3, 1, 21)}'\nassert max_hidden(3, 1, 25) == 4, 'With 25 parameters h = 5 does not fit (26), so 4'\nassert max_hidden(784, 10, 101770) == 128, 'MNIST: 101 770 параметрге h = 128'\nassert max_hidden(10, 2, 5) == 0, 'Бюджет тым аз болса 0'"
     }
    },
    {
     "title": "Multi-class MLP",
     "prompt": "<p>Write an MLP that assigns Kaspi products to one of three categories. <code>forward_multi(X, W1, b1, W2, b2)</code>: ReLU in the hidden layer, and a stable softmax by rows at the output; <code>(n, k)</code> must return the probabilities. <code>predict_class(X, W1, b1, W2, b2)</code> — returns the index of the most likely class for each example.</p>",
     "hints": [
      "For softmax <code>Z - Z.max(axis=1, keepdims=True)</code>",
      "<code>np.argmax(P, axis=1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(8)\n_X = _r.normal(size=(7, 4)); _W1 = _r.normal(size=(4, 6)); _b1 = _r.normal(size=6); _W2 = _r.normal(size=(6, 3)); _b2 = _r.normal(size=3)\n_Z = _np.maximum(0, _X @ _W1 + _b1) @ _W2 + _b2\n_E = _np.exp(_Z - _Z.max(axis=1, keepdims=True)); _P = _E / _E.sum(axis=1, keepdims=True)\n_out = forward_multi(_X, _W1, _b1, _W2, _b2)\nassert _out is not None and _np.shape(_out) == (7, 3), f'The output shape must be (7, 3), you have {_np.shape(_out)}'\nassert _np.allclose(_out.sum(axis=1), 1), 'The sum of each row must equal 1'\nassert _np.allclose(_out, _P), 'ReLU in the hidden layer, softmax at the output'\nassert list(predict_class(_X, _W1, _b1, _W2, _b2)) == list(_P.argmax(axis=1)), 'predict_class = argmax(axis=1)'\n_big = forward_multi(_X, _W1, _b1, _W2 * 1000, _b2)\nassert _np.isfinite(_big).all(), 'There must be no nan for large logit values'"
     }
    },
    {
     "title": "Finding a shape error",
     "prompt": "<p>Write <code>find_shape_error(n_features, params)</code>: <code>params</code> is a list of <code>(W, b)</code> pairs. The input starts with <code>n_features</code> features. The function must return the index (from 0) of the first wrong layer, and if everything is correct, <code>None</code>. A layer is wrong if <code>W.shape[0]</code> is not equal to the output of the previous layer, or <code>b.shape</code> ≠ <code>(W.shape[1],)</code>.</p>",
     "hints": [
      "Keep the current size in the variable <code>size</code>",
      "After each layer <code>size = W.shape[1]</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_ok = [(_np.zeros((3, 4)), _np.zeros(4)), (_np.zeros((4, 1)), _np.zeros(1))]\nassert find_shape_error(3, _ok) is None, 'For a correct network — None'\nassert find_shape_error(5, _ok) == 0, 'The input has 5 features, but W1 expects 3: layer 0'\n_bad = [(_np.zeros((3, 4)), _np.zeros(4)), (_np.zeros((5, 1)), _np.zeros(1))]\nassert find_shape_error(3, _bad) == 1, 'W2.shape[0] = 5, but the previous output is 4: layer 1'\n_badb = [(_np.zeros((3, 4)), _np.zeros(3)), (_np.zeros((4, 1)), _np.zeros(1))]\nassert find_shape_error(3, _badb) == 0, 'The shape of b1 must be (4,): layer 0'\nassert find_shape_error(2, []) is None, 'For an empty list — None'"
     }
    }
   ]
  },
  "dl-3": {
   "pr": [
    {
     "title": "Loss for one subscriber",
     "prompt": "<p>Write <code>bce_one(y, p)</code>: the binary cross-entropy value for one example. If <code>y = 1</code>, then <code>−log(p)</code>; if <code>y = 0</code>, then <code>−log(1 − p)</code>. For example, <code>bce_one(1, 0.9)</code> ≈ 0.105, <code>bce_one(1, 0.1)</code> ≈ 2.303.</p>",
     "hints": [
      "<code>np.log(p)</code> and <code>np.log(1 - p)</code>"
     ]
    },
    {
     "title": "RMSE of apartment prices",
     "prompt": "<p>We evaluate a model that predicts the price of an apartment in Almaty (million ₸). Write <code>rmse(y, pred)</code>: the square root of the MSE, <code>sqrt(mean((y − pred)²))</code>. For example, <code>rmse([30, 45], [33, 41])</code> = √12.5 ≈ 3.536.</p>",
     "hints": [
      "<code>np.sqrt(np.mean((y - pred) ** 2))</code>"
     ],
     "check": {
      "tests": "assert rmse([30, 45], [33, 41]) is not None and abs(rmse([30, 45], [33, 41]) - 3.5355) < 1e-3, 'rmse([30, 45], [33, 41]) ≈ 3.536'\nassert rmse([1, 2, 3], [1, 2, 3]) == 0, 'If there are no errors, 0'\nassert abs(rmse([0, 0], [3, 4]) - 3.5355) < 1e-3, 'It must also work with lists'"
     }
    },
    {
     "title": "Computing accuracy",
     "prompt": "<p>Along with the loss, we show the business the accuracy. Write <code>accuracy(y, p, threshold=0.5)</code>: predict 1 if the probability is not below the threshold, and return the share of correct predictions. For example, <code>accuracy([1, 0, 1], [0.8, 0.3, 0.4])</code> → 0.667.</p>",
     "hints": [
      "<code>(p >= threshold).astype(int)</code>",
      "<code>np.mean(pred == y)</code>"
     ],
     "check": {
      "tests": "assert accuracy([1, 0, 1], [0.8, 0.3, 0.4]) is not None and abs(accuracy([1, 0, 1], [0.8, 0.3, 0.4]) - 2 / 3) < 1e-9, 'accuracy([1, 0, 1], [0.8, 0.3, 0.4]) = 2/3'\nassert accuracy([1, 0, 1], [0.8, 0.3, 0.4], threshold=0.3) == 2 / 3, 'threshold = 0.3: predictions [1, 1, 1], 2/3 correct'\nassert accuracy([1, 1], [0.51, 0.99]) == 1.0, 'For accuracy, 0.51 and 0.99 are equally correct'"
     }
    },
    {
     "title": "Multi-class cross-entropy",
     "prompt": "<p>A model that recognizes an animal in a photo (cat, dog, bird). <code>y</code> — the indices of the correct classes, <code>P</code> — the matrix of <code>(n, 3)</code> probabilities. <code>cross_entropy(y, P)</code> = <code>−mean(log(P[i, y_i]))</code>. Clip <code>P</code> with <code>np.clip(P, 1e-7, 1)</code>. For example, <code>y = [0, 2]</code>, <code>P = [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]]</code> → ≈ 0.434.</p>",
     "hints": [
      "<code>P[np.arange(len(y)), y]</code> takes the probability of the correct class from each row"
     ],
     "check": {
      "tests": "import numpy as _np\n_v = cross_entropy([0, 2], [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]])\nassert _v is not None and abs(_v - 0.4338) < 1e-3, f'It must be ≈ 0.434, you have {_v}'\nassert cross_entropy([1], [[0.0, 1.0, 0.0]]) < 1e-6, 'If the correct class gets 1, the loss ≈ 0'\nassert _np.isfinite(cross_entropy([0], [[0.0, 1.0, 0.0]])), 'When P = 0 there must be no inf: use np.clip'"
     }
    },
    {
     "title": "One-hot and loss",
     "prompt": "<p>Write <code>one_hot(y, k)</code>: turn the class indices into a <code>(n, k)</code> matrix (1 in the correct class, 0 elsewhere). Then compute <code>ce_onehot(Y, P)</code> = <code>−mean(sum(Y · log P, axis=1))</code> and clip <code>P</code> from below at <code>1e-7</code>. For example, <code>one_hot([2, 0], 3)</code> → <code>[[0, 0, 1], [1, 0, 0]]</code>.</p>",
     "hints": [
      "<code>Y[np.arange(n), y] = 1</code>",
      "<code>np.sum(Y * np.log(P), axis=1)</code> gives one number for each row"
     ],
     "check": {
      "tests": "import numpy as _np\nassert one_hot([2, 0], 3) is not None and _np.array_equal(one_hot([2, 0], 3), [[0, 0, 1], [1, 0, 0]]), 'one_hot([2, 0], 3) = [[0, 0, 1], [1, 0, 0]]'\nassert _np.shape(one_hot([0, 1, 1, 3], 4)) == (4, 4), 'Shape (n, k)'\n_P = _np.array([[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]])\nassert abs(ce_onehot(one_hot([0, 2], 3), _P) - 0.4338) < 1e-3, 'ce_onehot ≈ 0.434 болуы керек'\nassert _np.isfinite(ce_onehot(one_hot([0], 2), _np.array([[0.0, 1.0]]))), 'P = 0 болса inf болмауы керек'"
     }
    },
    {
     "title": "The most confident mistake",
     "prompt": "<p>Find the example in the data with the most 'confident mistake'. <code>worst_example(y, p)</code> computes the BCE for each example and returns the index of the largest one (clip <code>p</code> with <code>np.clip(p, 1e-7, 1 - 1e-7)</code>). For example, <code>y = [1, 0, 1, 0]</code>, <code>p = [0.9, 0.2, 0.3, 0.95]</code> → 3.</p>",
     "hints": [
      "Compute the loss of each example without <code>mean</code>",
      "<code>np.argmax(losses)</code>"
     ],
     "check": {
      "tests": "assert worst_example([1, 0, 1, 0], [0.9, 0.2, 0.3, 0.95]) == 3, 'Example 4: y = 0, but p = 0.95 — the largest loss, index 3'\nassert worst_example([1, 1, 1], [0.5, 0.01, 0.7]) == 1, 'y = 1, p = 0.01: индекс 1'\nassert worst_example([0, 1], [1.0, 1.0]) == 0, 'It must also work when p = 1 (np.clip)'"
     }
    },
    {
     "title": "Stable BCE from logits",
     "prompt": "<p>Write <code>BCEWithLogitsLoss</code> as in PyTorch, that is <code>bce_logits(y, z)</code>: the input is the logit <code>z</code> (before sigmoid). The stable formula: <code>mean(max(z, 0) − z·y + log(1 + e<sup>−|z|</sup>))</code>. It equals <code>bce(y, sigmoid(z))</code>, but gives no inf/nan even when <code>z = 1000</code>. For example, <code>bce_logits([1, 0], [2.0, -1.0])</code> ≈ 0.2201.</p>",
     "hints": [
      "<code>np.maximum(z, 0)</code>, <code>np.abs(z)</code>",
      "<code>np.log1p(x)</code> = <code>log(1 + x)</code>, more precisely"
     ],
     "check": {
      "tests": "import numpy as _np\n_v = bce_logits([1, 0], [2.0, -1.0])\nassert _v is not None and abs(_v - 0.2201) < 1e-3, f'It must be ≈ 0.2201, you have {_v}'\n_r = _np.random.default_rng(0); _y = _r.integers(0, 2, 20); _z = _r.normal(0, 3, 20)\n_p = 1 / (1 + _np.exp(-_z))\nassert abs(bce_logits(_y, _z) - (-_np.mean(_y * _np.log(_p) + (1 - _y) * _np.log(1 - _p)))) < 1e-9, 'The result must equal bce(y, sigmoid(z))'\n_big = bce_logits([0, 1], [1000.0, -1000.0])\nassert _np.isfinite(_big) and abs(_big - 1000) < 1e-6, 'Even for z = ±1000 it must be a finite number: 1000'"
     }
    },
    {
     "title": "Loss by task",
     "prompt": "<p>Write <code>task_loss(task, y, out)</code>: <code>\"regression\"</code> → MSE(<code>y</code>, <code>out</code>); <code>\"binary\"</code> → BCE, <code>out</code> — probabilities; <code>\"multiclass\"</code> → cross-entropy, <code>y</code> — class indices, <code>out</code> — <code>(n, k)</code> probabilities. Clip the probabilities with <code>1e-7</code>. If another task name comes in, raise <code>ValueError</code>.</p>",
     "hints": [
      "Three branches: <code>if task == \"regression\"</code> ...",
      "At the end <code>raise ValueError(...)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert task_loss('regression', [1.0, 2.0], [2.0, 4.0]) is not None and abs(task_loss('regression', [1.0, 2.0], [2.0, 4.0]) - 2.5) < 1e-9, 'regression: MSE = 2.5'\nassert abs(task_loss('binary', [1, 0, 1], [0.8, 0.3, 0.6]) - 0.3635) < 1e-3, 'binary: BCE ≈ 0.364'\nassert abs(task_loss('multiclass', [0, 2], [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]]) - 0.4338) < 1e-3, 'multiclass: CE ≈ 0.434'\nassert _np.isfinite(task_loss('binary', [1, 0], [0.0, 1.0])), 'binary: p = 0 немесе 1 болса inf болмауы керек'\ntry:\n    task_loss('ranking', [1], [1])\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'For an unknown task — ValueError'"
     }
    }
   ]
  },
  "dl-4": {
   "pr": [
    {
     "title": "One gradient step",
     "prompt": "<p>Write <code>gd_step(w, grad, lr)</code>: it returns the new weight by the gradient descent rule: <code>w − lr · grad</code>. For example, <code>gd_step(np.array([0.5, -1.0]), np.array([2.0, -4.0]), 0.1)</code> → <code>[0.3, -0.6]</code>.</p>",
     "hints": [
      "Do not forget the minus sign: we move <b>against</b> the gradient"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = gd_step(_np.array([0.5, -1.0]), _np.array([2.0, -4.0]), 0.1)\nassert _r is not None and _np.allclose(_r, [0.3, -0.6]), f'It must be [0.3, -0.6], you have {_r}'\nassert _np.allclose(gd_step(_np.array([1.0]), _np.array([1.0]), 0.5), [0.5]), 'Moving against the gradient: 1 − 0.5·1 = 0.5'"
     }
    },
    {
     "title": "Derivative of sigmoid",
     "prompt": "<p>Write <code>sigmoid_grad(z)</code>: the derivative of sigmoid is <code>p · (1 − p)</code>, where <code>p = sigmoid(z)</code>. For example, <code>sigmoid_grad(0.0)</code> = 0.25 is its largest value.</p>",
     "hints": [
      "First <code>p = 1 / (1 + np.exp(-z))</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert sigmoid_grad(0.0) is not None and abs(float(sigmoid_grad(0.0)) - 0.25) < 1e-12, 'sigmoid_grad(0) = 0.25'\n_z = _np.array([-3.0, 1.0, 4.0]); _p = 1 / (1 + _np.exp(-_z))\nassert _np.allclose(sigmoid_grad(_z), _p * (1 - _p)), 'sigmoid_grad = p · (1 − p)'\nassert float(sigmoid_grad(10.0)) < 1e-4, 'For a large z the derivative is close to zero'"
     }
    },
    {
     "title": "Derivative of ReLU",
     "prompt": "<p>Write <code>relu_grad(z)</code>: if <code>z &gt; 0</code>, then 1.0, otherwise 0.0 (a float array). For example, <code>relu_grad(np.array([-2.0, 0.0, 3.0]))</code> → <code>[0., 0., 1.]</code>.</p>",
     "hints": [
      "<code>(z > 0).astype(float)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = relu_grad(_np.array([-2.0, 0.0, 3.0]))\nassert _r is not None and _np.array_equal(_r, [0.0, 0.0, 1.0]), f'It must be [0, 0, 1], you have {_r}'\nassert _r.dtype.kind == 'f', 'The result must be a float array: .astype(float)'"
     }
    },
    {
     "title": "Minimum of a parabola",
     "prompt": "<p><code>loss(w) = (w − 3)²</code>, its derivative is <code>2(w − 3)</code>. Write <code>gd_parabola(w0, lr, steps)</code>: starting from <code>w0</code>, take <code>steps</code> steps of gradient descent and return the last <code>w</code>. In 100 steps <code>lr = 0.1</code> reaches <code>w ≈ 3</code>; but if <code>lr = 1.1</code> is too large, <code>w</code> moves further and further away.</p>",
     "hints": [
      "At each step <code>w = w - lr * 2 * (w - 3)</code>"
     ],
     "check": {
      "tests": "_w = gd_parabola(0.0, 0.1, 100)\nassert _w is not None and abs(_w - 3) < 1e-6, f'lr = 0.1, 100 steps: w ≈ 3, you have {_w}'\nassert abs(gd_parabola(10.0, 0.1, 1) - 8.6) < 1e-9, 'One step: 10 − 0.1·2·7 = 8.6'\nassert abs(gd_parabola(0.0, 1.1, 30) - 3) > 100, 'With lr = 1.1, w must move far away (it grows in jumps)'\nassert abs(gd_parabola(0.0, 0.001, 10) - 3) > 2.5, 'If lr is too small, we will not reach the minimum in 10 steps'"
     }
    },
    {
     "title": "Gradient of the MSE",
     "prompt": "<p>Linear regression <code>pred = X @ w + b</code>, loss = <code>mean((pred − y)²)</code>. Write <code>mse_grad(X, y, w, b)</code>: return <code>(dw, db)</code>, where <code>dw = 2/n · X.T @ (pred − y)</code>, <code>db = 2 · mean(pred − y)</code>. The checker will compare the result with the numerical gradient.</p>",
     "hints": [
      "<code>err = X @ w + b - y</code>",
      "Do not forget to divide by n"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(3)\n_X = _r.normal(size=(8, 2)); _y = _r.normal(size=8); _w = _np.array([0.5, -0.3]); _b = 0.2\n_dw, _db = mse_grad(_X, _y, _w, _b)\ndef _L(w, b):\n    return _np.mean((_X @ w + b - _y) ** 2)\n_e = 1e-6\n_nw = _np.array([(_L(_w + _e * _np.eye(2)[i], _b) - _L(_w - _e * _np.eye(2)[i], _b)) / (2 * _e) for i in range(2)])\n_nb = (_L(_w, _b + _e) - _L(_w, _b - _e)) / (2 * _e)\nassert _np.allclose(_dw, _nw, atol=1e-5), f'dw does not match the numerical gradient: {_dw} and {_nw}'\nassert abs(_db - _nb) < 1e-5, f'db does not match the numerical gradient: {_db} and {_nb}'"
     }
    },
    {
     "title": "Checking the derivative of tanh",
     "prompt": "<p>Compute the numerical derivative of a function of one variable: <code>num_deriv(f, x, eps=1e-5)</code> = <code>(f(x + eps) − f(x − eps)) / (2·eps)</code>. Then write <code>tanh_grad(x)</code> = <code>1 − tanh(x)²</code>. They must match at the point <code>x = 0.5</code>: <code>gap = abs(num_deriv(np.tanh, 0.5) − tanh_grad(0.5))</code>.</p>",
     "hints": [
      "Central difference: <code>(f(x + eps) - f(x - eps)) / (2 * eps)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert abs(tanh_grad(0.0) - 1.0) < 1e-12, 'tanh_grad(0) = 1'\nassert abs(tanh_grad(0.5) - 0.7864) < 1e-4, 'tanh_grad(0.5) ≈ 0.786'\nassert abs(num_deriv(lambda v: v ** 3, 2.0) - 12.0) < 1e-4, 'num_deriv works for any f: the derivative of x³ is 3x² = 12'\nassert gap is not None and gap < 1e-8, f'The difference gap must be very small, you have {gap}'"
     }
    },
    {
     "title": "Training logistic regression",
     "prompt": "<p>Write <code>train_logreg(X, y, lr=0.5, epochs=500)</code>: <code>w</code> made of zeros, starting from <code>b = 0</code>, and in each epoch update it with the gradient of the sigmoid neuron (<code>dz = (p − y) / n</code>, <code>dw = X.T @ dz</code>, <code>db = dz.sum()</code>). Collect the BCE of each epoch in the list <code>losses</code> and return <code>(w, b, losses)</code>. The data: students' hours of study (standardized) and the exam result.</p>",
     "hints": [
      "Compute the loss before the update and add it to the list",
      "<code>dz = (p - y) / n</code>, <code>w -= lr * X.T @ dz</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert len(losses) == 500, f'The length of losses must be 500, you have {len(losses)}'\nassert abs(losses[0] - _np.log(2)) < 1e-6, 'The initial loss = log 2 ≈ 0.693 (w = 0, b = 0)'\nassert losses[-1] < 0.4, f'The final loss must be less than 0.4, you have {losses[-1]:.3f}'\nassert all(a >= b2 - 1e-12 for a, b2 in zip(losses, losses[1:])), 'The loss must decrease in each epoch'\nassert w[0] > 0, 'The more hours of study, the higher the chance to pass: w > 0'\n_p = 1 / (1 + _np.exp(-(X @ w + b)))\nassert ((_p >= 0.5).astype(int) == y).mean() >= 0.75, 'Training accuracy must be at least 0.75 (6 of 8 students)'"
     }
    },
    {
     "title": "Automatic gradient check",
     "prompt": "<p>Write <code>grad_check(f, grad_f, w, eps=1e-5, tol=1e-6)</code>: for each element of <code>w</code> compute the numerical gradient with a central difference and compare it with the analytic <code>grad_f(w)</code>. If the largest absolute difference is less than <code>tol</code>, return <code>True</code>, otherwise <code>False</code>. The checker gives a correct gradient and a deliberately wrong one (without division by n).</p>",
     "hints": [
      "For each element <code>e = np.zeros_like(w); e[i] = eps</code>",
      "<code>bool(np.max(np.abs(num - grad_f(w))) < tol)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]]); _y = _np.array([1, 0, 1, 0])\ndef _f(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return -_np.mean(_y * _np.log(p) + (1 - _y) * _np.log(1 - p))\ndef _good(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return _X.T @ ((p - _y) / len(_X))\ndef _bad(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return _X.T @ (p - _y)\n_w = _np.array([0.3, -0.2])\nassert grad_check(_f, _good, _w) is True, 'For a correct gradient it must be True'\nassert grad_check(_f, _bad, _w) is False, 'For a gradient without division by n it must be False'\nassert grad_check(lambda v: (v ** 2).sum(), lambda v: 2 * v, _np.array([1.0, -2.0, 0.5])) is True, 'For x² the gradient 2x is correct'\nassert grad_check(lambda v: (v ** 2).sum(), lambda v: v, _np.array([1.0, -2.0, 0.5])) is False, 'For x² the gradient x is wrong'"
     }
    }
   ]
  },
  "dl-5": {
   "pr": [
    {
     "title": "XOR labels",
     "prompt": "<p>Write <code>xor_labels(X)</code>: each row has two binary inputs; if the inputs differ, the result is 1, and if they are the same, 0. The result is a float array of shape <code>(n, 1)</code>. For <code>X = [[0,0],[0,1],[1,0],[1,1]]</code> → <code>[[0],[1],[1],[0]]</code>.</p>",
     "hints": [
      "<code>X[:, 0] != X[:, 1]</code>",
      "<code>.reshape(-1, 1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_y = xor_labels(_np.array([[0, 0], [0, 1], [1, 0], [1, 1]]))\nassert _y is not None and _np.shape(_y) == (4, 1), f'The shape must be (4, 1), you have {_np.shape(_y)}'\nassert _np.array_equal(_y.ravel(), [0, 1, 1, 0]), f'It must be [0, 1, 1, 0], you have {_y.ravel()}'\nassert _np.array_equal(xor_labels(_np.array([[1, 1], [1, 0]])).ravel(), [0, 1]), 'It must work for any X'"
     }
    },
    {
     "title": "Gradient of the hidden layer",
     "prompt": "<p>During backward, the gradient passing through a tanh layer is multiplied by its derivative. Write <code>tanh_backward(dh, h)</code>: <code>dz1 = dh · (1 − h²)</code>, where <code>h</code> is the output of tanh. For example, <code>dh = [[1.0, 2.0]]</code>, <code>h = [[0.0, 0.5]]</code> → <code>[[1.0, 1.5]]</code>.</p>",
     "hints": [
      "<code>dh * (1 - h ** 2)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = tanh_backward(_np.array([[1.0, 2.0]]), _np.array([[0.0, 0.5]]))\nassert _r is not None and _np.allclose(_r, [[1.0, 1.5]]), f'It must be [[1.0, 1.5]], you have {_r}'\nassert _np.allclose(tanh_backward(_np.ones((2, 2)), _np.full((2, 2), 0.9)), 0.19), '1 · (1 − 0.81) = 0.19'"
     }
    },
    {
     "title": "An answer from a probability",
     "prompt": "<p>Write <code>to_labels(p, threshold=0.5)</code>: turn the network output (<code>(n, 1)</code> probabilities) into a plain list of integers 0/1. For example, <code>to_labels(np.array([[0.02], [0.97], [0.5], [0.3]]))</code> → <code>[0, 1, 1, 0]</code>.</p>",
     "hints": [
      "<code>np.asarray(p).ravel()</code> flattens the array",
      "To get a list, use <code>int(...)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert to_labels(_np.array([[0.02], [0.97], [0.5], [0.3]])) == [0, 1, 1, 0], 'The result must be the list [0, 1, 1, 0]'\nassert to_labels(_np.array([[0.6], [0.8]]), threshold=0.7) == [0, 1], 'Use the threshold parameter'"
     }
    },
    {
     "title": "Output layer gradients",
     "prompt": "<p>Write <code>output_grads(h, p, y)</code>: for the output layer with sigmoid + BCE, compute <code>dz2 = (p − y) / n</code>, <code>dW2 = h.T @ dz2</code>, <code>db2 = dz2.sum(axis=0, keepdims=True)</code>. The function must return <code>(dz2, dW2, db2)</code>. The shape of <code>h</code> is <code>(n, k)</code>, and <code>p</code> and <code>y</code> are <code>(n, 1)</code>.</p>",
     "hints": [
      "<code>len(y)</code> — the number of examples n",
      "<code>dz2.sum(axis=0, keepdims=True)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(1)\n_h = _np.tanh(_r.normal(size=(4, 3))); _p = _r.uniform(0.1, 0.9, (4, 1)); _y = _np.array([[0], [1], [1], [0]], dtype=float)\n_out = output_grads(_h, _p, _y)\nassert _out is not None and len(_out) == 3, 'Return the triple (dz2, dW2, db2)'\n_dz2, _dW2, _db2 = _out\nassert _np.allclose(_dz2, (_p - _y) / 4), 'dz2 = (p − y) / n'\nassert _np.shape(_dW2) == (3, 1) and _np.allclose(_dW2, _h.T @ ((_p - _y) / 4)), 'dW2 = h.T @ dz2, shape (3, 1)'\nassert _np.shape(_db2) == (1, 1), f'The shape of db2 must be (1, 1): use keepdims=True. You have {_np.shape(_db2)}'"
     }
    },
    {
     "title": "One neuron cannot solve XOR",
     "prompt": "<p>A single sigmoid neuron without a hidden layer learns OR, but cannot learn XOR. Write <code>train_neuron(X, y, lr=1.0, epochs=2000)</code>: <code>w = zeros(2)</code>, starting from <code>b = 0</code>, run gradient descent (<code>dz = (p − y) / n</code>) and return <code>(preds, final_loss)</code>: <code>preds</code> — a 0/1 list, <code>final_loss</code> — the final BCE. Then compute <code>or_preds</code> (for OR) and <code>xor_loss</code> (for XOR).</p>",
     "hints": [
      "This is training one neuron from dl-4",
      "Compute the final loss after the loop"
     ],
     "check": {
      "tests": "assert or_preds == [0, 1, 1, 1], f'A single neuron learns OR: [0, 1, 1, 1], you have {or_preds}'\nassert xor_loss is not None and xor_loss > 0.6, f'For XOR the loss must stay around log 2 ≈ 0.693, you have {xor_loss}'\n_p, _l = train_neuron(X, y_or, epochs=10)\nassert isinstance(_p, list) and len(_p) == 4, 'preds — a list of 4 elements'"
     }
    },
    {
     "title": "One training step",
     "prompt": "<p>Write <code>train_step(params, X, y, lr)</code>: <code>params</code> is a dictionary with the keys <code>W1, b1, W2, b2</code> (a network 2 → 4 tanh → 1 sigmoid). Run one forward pass, the BCE and the backward pass, update the weights <b>inside the dictionary</b>, and return the loss <b>before</b> the update. When called repeatedly, the loss must decrease.</p>",
     "hints": [
      "When computing dh, use the <b>old</b> W2 (before the update)",
      "Write the new values through <code>params[\"W1\"] = ...</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(0)\n_pp = {\"W1\": _r.normal(0, 1, (2, 4)), \"b1\": _np.zeros((1, 4)), \"W2\": _r.normal(0, 1, (4, 1)), \"b2\": _np.zeros((1, 1))}\n_W1 = _pp[\"W1\"].copy(); _W2 = _pp[\"W2\"].copy()\n_h = _np.tanh(X @ _W1); _p = 1 / (1 + _np.exp(-(_h @ _W2)))\n_l0 = train_step(_pp, X, y, 0.5)\nassert abs(_l0 - (-_np.mean(y * _np.log(_p) + (1 - y) * _np.log(1 - _p)))) < 1e-9, 'The returned loss is the BCE before the update'\n_dz2 = (_p - y) / 4\nassert _np.allclose(_pp[\"W2\"], _W2 - 0.5 * (_h.T @ _dz2)), 'W2 = W2 − lr · h.T @ dz2 must be updated inside the dictionary'\n_dz1 = (_dz2 @ _W2.T) * (1 - _h ** 2)\nassert _np.allclose(_pp[\"W1\"], _W1 - 0.5 * (X.T @ _dz1)), 'Check the update of W1: dz1 = (dz2 @ W2.T) · (1 − h²), with the old W2'\n_ls = [train_step(_pp, X, y, 1.0) for _ in range(300)]\nassert _ls[-1] < _ls[0], 'After several steps the loss must decrease'"
     }
    },
    {
     "title": "XOR network with ReLU",
     "prompt": "<p>Write a network for XOR from scratch, but use ReLU in the hidden layer: 2 → 8 (ReLU) → 1 (sigmoid). <code>train_xor_relu(epochs=3000, lr=0.5, seed=0)</code>: <code>rng = np.random.default_rng(seed)</code>, <code>W1 = rng.normal(0, 1, (2, 8))</code>, <code>b1 = zeros((1, 8))</code>, <code>W2 = rng.normal(0, 1, (8, 1))</code>, <code>b2 = zeros((1, 1))</code>. The derivative of ReLU: <code>z1 &gt; 0</code> gives 1. The function must return <code>(preds, losses)</code>: <code>preds</code> — a 0/1 list.</p>",
     "hints": [
      "For the derivative of ReLU, keep <code>z1</code>: <code>(z1 > 0)</code>",
      "Backward as in dl-5, only use <code>(z1 > 0)</code> instead of <code>(1 - h**2)</code>"
     ],
     "check": {
      "tests": "_preds, _losses = train_xor_relu()\nassert len(_losses) == 3000, f'The length of losses must equal epochs, you have {len(_losses)}'\nassert _preds == [0, 1, 1, 0], f'preds must be [0, 1, 1, 0], you have {_preds}'\nassert _losses[-1] < 0.05, f'The final loss must be less than 0.05, you have {_losses[-1]:.4f}'\nassert _losses[-1] < _losses[0], 'Loss азаюы керек'"
     }
    },
    {
     "title": "Numerical check of backprop",
     "prompt": "<p>Write <code>backward(X, y, W1, b1, W2, b2)</code>: for the network 2 → tanh → 1 sigmoid, return the BCE gradients as the dictionary <code>{\"W1\": dW1, \"b1\": db1, \"W2\": dW2, \"b2\": db2}</code>. The checker will compare each gradient with the numerical one (<code>(L(θ+ε) − L(θ−ε)) / 2ε</code>).</p>",
     "hints": [
      "The backward formulas from the dl-5 lesson",
      "For b1 and b2 <code>sum(axis=0, keepdims=True)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(11)\n_X = _r.normal(size=(5, 2)); _y = _np.array([[0], [1], [1], [0], [1]], dtype=float)\n_P = {\"W1\": _r.normal(size=(2, 3)), \"b1\": _r.normal(size=(1, 3)), \"W2\": _r.normal(size=(3, 1)), \"b2\": _r.normal(size=(1, 1))}\ndef _loss(P):\n    h = _np.tanh(_X @ P[\"W1\"] + P[\"b1\"]); p = 1 / (1 + _np.exp(-(h @ P[\"W2\"] + P[\"b2\"])))\n    return -_np.mean(_y * _np.log(p) + (1 - _y) * _np.log(1 - p))\n_g = backward(_X, _y, _P[\"W1\"], _P[\"b1\"], _P[\"W2\"], _P[\"b2\"])\nfor _k in [\"W1\", \"b1\", \"W2\", \"b2\"]:\n    assert _np.shape(_g[_k]) == _P[_k].shape, f'The shape of the gradient {_k} must be {_P[_k].shape}'\n    _num = _np.zeros_like(_P[_k])\n    for _i in _np.ndindex(_P[_k].shape):\n        _old = _P[_k][_i]\n        _P[_k][_i] = _old + 1e-6; _lp = _loss(_P)\n        _P[_k][_i] = _old - 1e-6; _lm = _loss(_P)\n        _P[_k][_i] = _old\n        _num[_i] = (_lp - _lm) / 2e-6\n    assert _np.allclose(_g[_k], _num, atol=1e-6), f'The gradient {_k} does not match the numerical one'"
     }
    }
   ]
  },
  "dl-6": {
   "pr": [
    {
     "title": "Steps in an epoch",
     "prompt": "<p>Write <code>steps_per_epoch(n, batch_size)</code>: the number of steps in one epoch, <code>ceil(n / batch_size)</code>. For example, 5,000 photos from a shop in Shymkent, batch 128 → 40 steps.</p>",
     "hints": [
      "<code>math.ceil(n / batch_size)</code>"
     ],
     "check": {
      "tests": "assert steps_per_epoch(5000, 128) == 40, f'5000 / 128 → 40 steps, you have {steps_per_epoch(5000, 128)}'\nassert steps_per_epoch(10000, 64) == 157, '10000 / 64 → 157'\nassert steps_per_epoch(256, 64) == 4, 'If it divides without a remainder, it will be exactly 4'"
     }
    },
    {
     "title": "Total number of steps",
     "prompt": "<p>Write <code>total_steps(n, batch_size, epochs)</code>: the number of gradient steps for the whole training. For example, 10,000 examples, batch 64, 20 epochs → 3,140.</p>",
     "hints": [
      "Multiply the number of steps in an epoch by the number of epochs"
     ],
     "check": {
      "tests": "assert total_steps(10000, 64, 20) == 3140, f'It must be 3140, you have {total_steps(10000, 64, 20)}'\nassert total_steps(100, 100, 5) == 5, 'One batch, 5 epochs: 5 steps'\nassert total_steps(101, 100, 3) == 6, '101 examples → 2 steps per epoch, 3 epochs → 6'"
     }
    },
    {
     "title": "Size of the last batch",
     "prompt": "<p>Write <code>last_batch_size(n, batch_size)</code>: how many examples are in the last batch of an epoch? For example, <code>last_batch_size(10000, 64)</code> → 16, and <code>last_batch_size(256, 64)</code> → 64.</p>",
     "hints": [
      "The remainder: <code>n % batch_size</code>"
     ],
     "check": {
      "tests": "assert last_batch_size(10000, 64) == 16, f'10000 % 64 = 16, you have {last_batch_size(10000, 64)}'\nassert last_batch_size(256, 64) == 64, 'If the remainder is 0, the last batch is full: 64'\nassert last_batch_size(5, 8) == 5, 'If there is less data than a batch, everything is in one batch'"
     }
    },
    {
     "title": "Shuffled batches",
     "prompt": "<p>Write <code>shuffled_batches(X, y, batch_size, seed)</code>: shuffle the order using <code>np.random.default_rng(seed).permutation(len(X))</code> and return a list of pairs <code>(Xb, yb)</code>. Each example must appear exactly once, and the rows <code>X</code> and <code>y</code> must not get separated from each other.</p>",
     "hints": [
      "Shuffle the indices and take <code>X[idx]</code>, <code>y[idx]</code>",
      "<code>range(0, len(X), batch_size)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.arange(20).reshape(10, 2); _y = _np.arange(10) * 10\n_b = shuffled_batches(_X, _y, 4, seed=1)\nassert [len(yb) for _, yb in _b] == [4, 4, 2], f'The batch sizes must be [4, 4, 2], you have {[len(yb) for _, yb in _b]}'\n_all = _np.concatenate([yb for _, yb in _b])\nassert sorted(_all.tolist()) == list(range(0, 100, 10)), 'Each example must appear exactly once'\nassert _all.tolist() != list(range(0, 100, 10)), 'Дерек араластырылуы керек (permutation)'\nfor _xb, _yb in _b:\n    assert _np.array_equal(_xb[:, 0] * 5, _yb), 'The rows of X and y must shift together'\nassert [yb.tolist() for _, yb in shuffled_batches(_X, _y, 4, seed=1)] == [yb.tolist() for _, yb in _b], 'One seed must give the same result'"
     }
    },
    {
     "title": "The start of overfitting",
     "prompt": "<p>Write <code>overfit_start(train_losses, val_losses)</code>: return the index (from 0) of the first epoch in which the train loss decreased compared to the previous one, while the val loss, on the contrary, <b>increased</b>. If there is no such epoch, return <code>None</code>. For example, train <code>[0.9, 0.6, 0.4, 0.3, 0.2]</code>, val <code>[0.95, 0.7, 0.6, 0.65, 0.7]</code> → 3.</p>",
     "hints": [
      "Compare each epoch starting from the 1st with the previous one"
     ],
     "check": {
      "tests": "assert overfit_start([0.9, 0.6, 0.4, 0.3, 0.2], [0.95, 0.7, 0.6, 0.65, 0.7]) == 3, 'At the 3rd epoch val started to grow'\nassert overfit_start([0.9, 0.6, 0.4], [0.9, 0.7, 0.5]) is None, 'If both decrease, None'\nassert overfit_start([0.5, 0.6, 0.4], [0.5, 0.7, 0.8]) == 2, 'At the 1st epoch the train loss also grew — this is not overfitting; the answer is 2'"
     }
    },
    {
     "title": "Learning rate schedule",
     "prompt": "<p>A scheduler reduces the learning rate over time. Write <code>step_decay(lr0, epochs, drop=0.5, every=10)</code>: return a list of the learning rate for each epoch (from 0 to <code>epochs − 1</code>): <code>lr0 · drop<sup>epoch // every</sup></code>. For example, <code>step_decay(0.1, 25)</code>: in epochs 0–9 it is 0.1, in 10–19 it is 0.05, in 20–24 it is 0.025.</p>",
     "hints": [
      "<code>e // every</code> — how many times it was reduced"
     ],
     "check": {
      "tests": "_s = step_decay(0.1, 25)\nassert len(_s) == 25, f'For 25 epochs there must be 25 values, you have {len(_s)}'\nassert abs(_s[0] - 0.1) < 1e-12 and abs(_s[9] - 0.1) < 1e-12, '0–9 эпохада 0.1'\nassert abs(_s[10] - 0.05) < 1e-12 and abs(_s[24] - 0.025) < 1e-12, '10-эпохада 0.05, 24-эпохада 0.025'\n_t = step_decay(1.0, 7, drop=0.1, every=3)\nassert all(abs(a - b) < 1e-12 for a, b in zip(_t, [1, 1, 1, 0.1, 0.1, 0.1, 0.01])), 'Use the drop and every parameters'"
     }
    },
    {
     "title": "Mini-batch gradient descent",
     "prompt": "<p>Write <code>minibatch_gd(X, y, batch_size, lr, epochs, seed=0)</code>: train linear regression (<code>pred = X @ w + b</code>, MSE) with mini-batches. In each epoch shuffle through <code>rng.permutation</code> (<code>rng = np.random.default_rng(seed)</code> is created once), and for each batch compute <code>dw = 2/m · Xb.T @ err</code> and <code>db = 2 · mean(err)</code>. Return <code>(w, b, steps)</code>, and <code>steps</code> is the number of updates made.</p>",
     "hints": [
      "Create the generator once before the loop",
      "Inside a batch divide by <code>len(yb)</code> (the last batch is smaller)"
     ],
     "check": {
      "tests": "import numpy as _np\n_w, _b, _s = minibatch_gd(X, y, 32, 0.05, 30)\nassert _s == 7 * 30, f'200 examples, batch 32 → 7 steps per epoch, 30 epochs → 210. You have {_s}'\nassert _np.allclose(_w, [3.0, -2.0], atol=0.1), f'It must be w ≈ [3, -2], you have {_w}'\nassert abs(_b - 5) < 0.1, f'It must be b ≈ 5, you have {_b}'\n_w2, _b2, _ = minibatch_gd(X, y, 32, 0.05, 30)\nassert _np.allclose(_w, _w2), 'One seed must give the same result'"
     }
    },
    {
     "title": "Training with early stopping",
     "prompt": "<p>Write <code>fit_early_stop(step_fn, val_fn, w0, max_epochs, patience)</code>. In each epoch run <code>w = step_fn(w)</code> (one epoch of training), then <code>val_fn(w)</code> — the validation loss. Remember the weights and the epoch number (from 0) with the smallest loss. If there is no improvement for <code>patience</code> epochs, stop. Return <code>(best_w, best_epoch, epochs_run)</code>.</p><p>Example: <code>step_fn = lambda w: w + 1</code>, <code>val_fn = lambda w: (w − 5)²</code>, <code>w0 = 0</code>, patience 3 → <code>(5, 4, 8)</code>.</p>",
     "hints": [
      "Start the best loss from <code>float(\"inf\")</code>",
      "The stopping condition: <code>epoch - best_epoch >= patience</code>"
     ],
     "check": {
      "tests": "_r = fit_early_stop(lambda w: w + 1, lambda w: (w - 5) ** 2, 0, 100, 3)\nassert tuple(_r) == (5, 4, 8), f'It must be (5, 4, 8): the best epoch is 4, with no improvement in epochs 5, 6, 7. You have {_r}'\n_r2 = fit_early_stop(lambda w: w + 1, lambda w: -w, 0, 6, 2)\nassert tuple(_r2) == (6, 5, 6), f'If it keeps improving, it runs up to max_epochs: (6, 5, 6). You have {_r2}'\n_r3 = fit_early_stop(lambda w: w + 1, lambda w: (w - 2) ** 2, 0, 100, 1)\nassert tuple(_r3) == (2, 1, 3), f'patience = 1: (2, 1, 3). You have {_r3}'"
     }
    }
   ]
  },
  "dl-7": {
   "pr": [
    {
     "title": "Zeroing gradients",
     "prompt": "<p>In PyTorch gradients accumulate, so before each step we call <code>optimizer.zero_grad()</code>. Write the function <code>zero_grad(params)</code>: it must replace the <code>grad</code> of each <code>Param</code> in the list with zeros of the same shape.</p>",
     "hints": [
      "<code>p.grad = np.zeros_like(p.value)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_a = Param([1.0, 2.0]); _a.grad = _np.array([3.0, -1.0])\n_b = Param([[1.0]]); _b.grad = _np.array([[5.0]])\nzero_grad([_a, _b])\nassert _np.array_equal(_a.grad, [0.0, 0.0]) and _np.array_equal(_b.grad, [[0.0]]), 'All grad must become zeros'\nassert _a.grad.shape == (2,) and _b.grad.shape == (1, 1), 'The shape of grad must match the shape of value'\nassert _np.array_equal(_a.value, [1.0, 2.0]), 'value must not change'"
     }
    },
    {
     "title": "The weight of nn.Linear",
     "prompt": "<p>In PyTorch <code>nn.Linear(in, out)</code> stores the weight in the shape <code>(out, in)</code> and computes <code>y = x @ W.T + b</code>. Write <code>linear(x, W, b)</code>. For example, <code>nn.Linear(2, 3)</code> has the weight shape <code>W</code> — <code>(3, 2)</code>, and the input <code>(4, 2)</code> gives the output <code>(4, 3)</code>.</p>",
     "hints": [
      "Transpose the weight: <code>W.T</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(0)\n_x = _r.normal(size=(4, 2)); _W = _r.normal(size=(3, 2)); _b = _r.normal(size=3)\n_y = linear(_x, _W, _b)\nassert _y is not None and _np.shape(_y) == (4, 3), f'The output shape must be (4, 3), you have {_np.shape(_y)}'\nassert _np.allclose(_y, _x @ _W.T + _b), 'y = x @ W.T + b'"
     }
    },
    {
     "title": "Prediction from logits",
     "prompt": "<p>When the model is trained with <code>BCEWithLogitsLoss</code>, the output is the logit. At inference we get <code>torch.sigmoid(model(x))</code>. Write <code>predict_from_logits(logits, threshold=0.5)</code>: it must return <code>(probs, labels)</code>, and <code>labels</code> is an int array of 0/1. For example, logits <code>[2.0, -1.0, 0.0]</code> → labels <code>[1, 0, 1]</code>.</p>",
     "hints": [
      "<code>1 / (1 + np.exp(-logits))</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = predict_from_logits([2.0, -1.0, 0.0])\nassert _r is not None and len(_r) == 2, 'Return the pair (probs, labels)'\n_p, _l = _r\nassert _np.allclose(_p, [0.8808, 0.2689, 0.5], atol=1e-4), f'probs = sigmoid(logits), you have {_p}'\nassert list(_l) == [1, 0, 1], f'labels = [1, 0, 1], you have {list(_l)}'\nassert list(predict_from_logits([2.0, -1.0, 0.0], threshold=0.9)[1]) == [0, 0, 0], 'Use the threshold parameter'"
     }
    },
    {
     "title": "The MSELoss class",
     "prompt": "<p>Write a class similar to <code>nn.MSELoss</code> from PyTorch. When called, <code>loss = loss_fn(pred, y)</code> returns <code>mean((pred − y)²)</code> and remembers <code>pred</code> and <code>y</code>. The method <code>loss_fn.backward()</code> must return the gradient with respect to pred: <code>2 · (pred − y) / n</code>.</p>",
     "hints": [
      "Inside <code>__call__</code> use <code>self.pred, self.y = pred, y</code>",
      "<code>backward</code>: <code>2 * (self.pred - self.y) / len(self.y)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_f = MSELoss()\n_v = _f(_np.array([1.0, 2.0, 4.0]), _np.array([1.0, 3.0, 2.0]))\nassert abs(_v - 5 / 3) < 1e-9, f'loss = (0 + 1 + 4) / 3 ≈ 1.667, you have {_v}'\n_g = _f.backward()\nassert _np.allclose(_g, [0.0, -2 / 3, 4 / 3]), f'backward = 2·(pred − y)/n = [0, -0.667, 1.333], you have {_g}'\n_f(_np.array([0.0, 0.0]), _np.array([1.0, 1.0]))\nassert _np.allclose(_f.backward(), [-1.0, -1.0]), 'backward must use the values of the last call'"
     }
    },
    {
     "title": "SGD with momentum",
     "prompt": "<p>Write the class <code>torch.optim.SGD(..., momentum=0.9)</code> like <code>SGDMomentum(params, lr, momentum=0.9)</code>. For each parameter store the velocity <code>v</code> (zero at the start). <code>step()</code>: <code>v = momentum · v + grad</code>, <code>value = value − lr · v</code>. <code>zero_grad()</code> — zeroes each grad.</p>",
     "hints": [
      "For each parameter create the velocity <code>np.zeros_like(p.value)</code>",
      "First update <code>v</code>, then <code>value</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_p = Param([1.0]); _o = SGDMomentum([_p], lr=0.1, momentum=0.9)\n_p.grad = _np.array([1.0]); _o.step()\nassert abs(_p.value[0] - 0.9) < 1e-9, f'Step 1: v = 1, value = 1 − 0.1·1 = 0.9. You have {_p.value}'\n_p.grad = _np.array([1.0]); _o.step()\nassert abs(_p.value[0] - 0.71) < 1e-9, f'Step 2: v = 0.9·1 + 1 = 1.9, value = 0.9 − 0.19 = 0.71. You have {_p.value}'\n_o.zero_grad()\nassert _np.array_equal(_p.grad, [0.0]), 'zero_grad() must zero the gradient'\n_q = Param([0.0, 0.0]); _o2 = SGDMomentum([_q], lr=0.5, momentum=0.0); _q.grad = _np.array([2.0, -2.0]); _o2.step()\nassert _np.allclose(_q.value, [-1.0, 1.0]), 'With momentum = 0 it is plain SGD'"
     }
    },
    {
     "title": "The DataLoader class",
     "prompt": "<p>Write a class similar to <code>DataLoader</code> from PyTorch: <code>DataLoader(X, y, batch_size, shuffle=False, seed=0)</code>. It must yield <code>for xb, yb in loader</code> batches; if <code>shuffle=True</code>, then in each epoch (at the start of each <code>for</code>) the shuffling through <code>self.rng.permutation</code> is done anew. <code>len(loader)</code> — the number of batches.</p>",
     "hints": [
      "Inside <code>__iter__</code> use <code>yield</code>",
      "Create the generator in <code>__init__</code> once"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.arange(10).reshape(10, 1); _y = _np.arange(10)\n_l = DataLoader(_X, _y, 4)\nassert len(_l) == 3, f'10 examples, batch 4 → 3 batches, you have {len(_l)}'\n_b = [yb.tolist() for _, yb in _l]\nassert _b == [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]], f'shuffle=False: the order is kept, you have {_b}'\n_s = DataLoader(_X, _y, 4, shuffle=True, seed=3)\n_e1 = _np.concatenate([yb for _, yb in _s]).tolist(); _e2 = _np.concatenate([yb for _, yb in _s]).tolist()\nassert sorted(_e1) == list(range(10)), 'Each example must appear once'\nassert _e1 != list(range(10)) and _e1 != _e2, 'shuffle=True: a new order in each epoch'\nfor _xb, _yb in _s:\n    assert _np.array_equal(_xb.ravel(), _yb), 'X and y must be shuffled together'"
     }
    },
    {
     "title": "A full training loop",
     "prompt": "<p><code>Linear</code>, <code>MSELoss</code>, <code>SGD</code> and <code>DataLoader</code> are already ready (as in PyTorch). Write <code>fit(model, loader, loss_fn, opt, epochs)</code>: in each epoch, for each batch, run <b>zero_grad → forward → loss → backward → step</b>. Backward: <code>model.backward(loss_fn.backward())</code>. Return the list of the mean loss per epoch. The model must find <code>y = −3x + 4</code>.</p>",
     "hints": [
      "Keep the order of the five steps: <code>opt.zero_grad()</code> first",
      "The loss of an epoch is the mean of the batch losses"
     ],
     "check": {
      "tests": "assert len(history) == 100, f'history must have 100 epochs, you have {len(history)}'\nassert history[-1] < history[0], 'Loss азаюы керек'\nassert abs(float(model.w.value[0]) + 3) < 0.05 and abs(float(model.b.value[0]) - 4) < 0.05, f'It must be w ≈ −3, b ≈ 4, you have w={model.w.value}, b={model.b.value}. Did you call zero_grad()?'\nassert history[-1] < 1e-3, 'In the last epoch the loss must be very small'"
     }
    },
    {
     "title": "Dropout: train and eval",
     "prompt": "<p>Write the class <code>Dropout(p, seed=0)</code>. The methods <code>train()</code> and <code>eval()</code> switch the mode (train at the start). In train mode <code>__call__(x)</code> sets each element to zero with probability <code>p</code> and multiplies the rest by <code>1 / (1 − p)</code>: the mask <code>self.rng.random(x.shape) &gt;= p</code>. In eval mode <code>x</code> returns the input unchanged (like <code>model.eval()</code>).</p>",
     "hints": [
      "Keep the mode in the variable <code>self.training</code>",
      "<code>x * mask / (1 - self.p)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_d = Dropout(0.5, seed=1)\n_x = _np.ones((100, 100))\n_o = _d(_x)\n_zero = (_o == 0).mean()\nassert 0.45 < _zero < 0.55, f'With p = 0.5 about 50% of the elements must be zeros, you have {_zero:.2f}'\nassert _np.allclose(_o[_o != 0], 2.0), 'The remaining elements are multiplied by 1 / (1 − p) = 2'\nassert abs(_o.mean() - 1) < 0.05, 'The mean value must be preserved'\n_d.eval()\nassert _np.array_equal(_d(_x), _x), 'In eval mode x does not change'\n_d.train()\nassert (_d(_x) == 0).any(), 'If train() is called again, dropout is turned on again'"
     }
    }
   ]
  },
  "dl-8": {
   "pr": [
    {
     "title": "Feature map size",
     "prompt": "<p>Write <code>conv_out(n, k, padding=0, stride=1)</code>: the size after a convolution is <code>(n − k + 2·padding) // stride + 1</code>. For example, a 5×5 image, k = 3 → 3; 28×28, k = 3, padding = 1 → 28.</p>",
     "hints": [
      "Write the formula using integer division (<code>//</code>)"
     ],
     "check": {
      "tests": "assert conv_out(5, 3) == 3, 'conv_out(5, 3) = 3'\nassert conv_out(28, 3, padding=1) == 28, '«same» padding: 28 → 28'\nassert conv_out(32, 5, stride=2) == 14, '(32 − 5) // 2 + 1 = 14'\nassert conv_out(224, 7, padding=3, stride=2) == 112, 'The first layer of ResNet: 224 → 112'"
     }
    },
    {
     "title": "Conv2d parameters",
     "prompt": "<p>Write <code>conv_params(in_ch, out_ch, k)</code>: the number of parameters of the layer <code>nn.Conv2d(in_ch, out_ch, k)</code>. Each filter has <code>in_ch · k · k</code> weights and 1 bias. For example, <code>conv_params(3, 16, 3)</code> → 448.</p>",
     "hints": [
      "<code>out_ch * (in_ch * k * k + 1)</code>"
     ],
     "check": {
      "tests": "assert conv_params(3, 16, 3) == 448, f'16 · (27 + 1) = 448, you have {conv_params(3, 16, 3)}'\nassert conv_params(1, 8, 3) == 80, '8 · (9 + 1) = 80'\nassert conv_params(64, 128, 1) == 8320, '1×1 kernel: 128 · (64 + 1) = 8320'"
     }
    },
    {
     "title": "Zero padding",
     "prompt": "<p>Write <code>pad_zeros(img, p)</code>: add <code>p</code> rows of zeros on each of the four sides of a 2D image (<code>np.pad</code>). For example, a 3×3 image, <code>p = 1</code> → 5×5, with the original image in the center.</p>",
     "hints": [
      "<code>np.pad(img, p)</code> adds zeros by default"
     ],
     "check": {
      "tests": "import numpy as _np\n_a = _np.arange(1, 10, dtype=float).reshape(3, 3)\n_r = pad_zeros(_a, 1)\nassert _np.shape(_r) == (5, 5), f'The shape must be (5, 5), you have {_np.shape(_r)}'\nassert _np.array_equal(_r[1:4, 1:4], _a) and _r[0].sum() == 0 and _r[:, -1].sum() == 0, 'The image is in the center, zeros at the edges'\nassert _np.shape(pad_zeros(_np.ones((4, 6)), 2)) == (8, 10), 'p = 2: (4, 6) → (8, 10)'"
     }
    },
    {
     "title": "Convolution with stride",
     "prompt": "<p>Write <code>conv2d_stride(img, k, stride)</code> (without padding): the kernel <code>stride</code> moves with a step. The output size is <code>(H − kh) // stride + 1</code> × <code>(W − kw) // stride + 1</code>, and the element <code>(i, j)</code> = <code>(img[i·s : i·s+kh, j·s : j·s+kw] · k).sum()</code>.</p>",
     "hints": [
      "The starting position: <code>r, c = i * stride, j * stride</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_img = _np.arange(25, dtype=float).reshape(5, 5); _k = _np.ones((3, 3))\n_r = conv2d_stride(_img, _k, 2)\nassert _np.shape(_r) == (2, 2), f'5×5, k = 3, stride = 2 → (2, 2), you have {_np.shape(_r)}'\nassert _np.allclose(_r, [[54, 72], [144, 162]]), f'It must be [[54, 72], [144, 162]], you have {_r}'\n_a = _np.random.default_rng(2).normal(size=(7, 7)); _kk = _np.random.default_rng(3).normal(size=(3, 3))\n_ref = _np.array([[(_a[i:i+3, j:j+3] * _kk).sum() for j in range(5)] for i in range(5)])\nassert _np.allclose(conv2d_stride(_a, _kk, 1), _ref), 'With stride = 1 it is an ordinary convolution'"
     }
    },
    {
     "title": "Average pooling",
     "prompt": "<p>Write <code>avgpool2(x)</code>: 2×2 blocks, stride 2, the mean of each block (the sizes are even). For example, <code>[[1, 3, 2, 0], [5, 3, 2, 4], ...]</code> of the upper left block: (1 + 3 + 5 + 3) / 4 = 3.</p>",
     "hints": [
      "<code>x.reshape(h // 2, 2, w // 2, 2)</code>",
      "<code>.mean(axis=(1, 3))</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_fm = _np.array([[1, 3, 2, 0], [5, 3, 2, 4], [0, 0, 7, 1], [4, 0, 1, 3]], dtype=float)\n_r = avgpool2(_fm)\nassert _np.allclose(_r, [[3, 2], [1, 3]]), f'It must be [[3, 2], [1, 3]], you have {_r}'\n_a = _np.arange(36, dtype=float).reshape(6, 6)\nassert _np.allclose(avgpool2(_a), _a.reshape(3, 2, 3, 2).mean(axis=(1, 3))), 'It must also work for 6×6'"
     }
    },
    {
     "title": "Finding a horizontal edge",
     "prompt": "<p>In the picture the upper part is light and the lower part is dark. A horizontal edge is given by the kernel <code>[[1, 1, 1], [0, 0, 0], [-1, -1, -1]]</code>. Write <code>edge_row(img)</code>: apply this kernel to the image (without padding, stride 1) and return the index of the feature-map row where the sum of absolute values is the largest.</p>",
     "hints": [
      "First compute the feature map",
      "<code>np.abs(fmap).sum(axis=1)</code> — the 'strength' of each row"
     ],
     "check": {
      "tests": "import numpy as _np\n_img = _np.array([[9] * 5, [9] * 5, [9] * 5, [0] * 5, [0] * 5, [0] * 5], dtype=float)\nassert edge_row(_img) in (1, 2), f'The edge is between rows 2 and 3: in the feature map this is row 1 or 2, you have {edge_row(_img)}'\n_img2 = _np.zeros((8, 6)); _img2[:2] = 5\nassert edge_row(_img2) in (0, 1), 'If the edge is at the top, the index is 0 or 1'\n_img3 = _np.zeros((8, 6)); _img3[6:] = 5\nassert edge_row(_img3) in (4, 5), 'If the edge is at the bottom, the index is 4 or 5'"
     }
    },
    {
     "title": "Conv → ReLU → Pool",
     "prompt": "<p>Write a CNN block: <code>conv_block(img, k)</code> — convolution (without padding, stride 1), ReLU, then 2×2 max pooling (stride 2). If the size of the convolution result is odd, drop the last row/column before pooling. For example, a 7×7 image, a 3×3 kernel → 5×5 → cropped to 4×4 → 2×2.</p>",
     "hints": [
      "Crop to an even size through <code>f[:h, :w]</code>, where <code>h = f.shape[0] // 2 * 2</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(5)\n_img = _r.normal(size=(7, 7)); _k = _r.normal(size=(3, 3))\n_f = _np.array([[(_img[i:i+3, j:j+3] * _k).sum() for j in range(5)] for i in range(5)])\n_f = _np.maximum(0, _f)[:4, :4]\n_ref = _f.reshape(2, 2, 2, 2).max(axis=(1, 3))\n_o = conv_block(_img, _k)\nassert _np.shape(_o) == (2, 2), f'7×7 → 5×5 → 2×2, you have {_np.shape(_o)}'\nassert _np.allclose(_o, _ref), 'The order: conv → ReLU → max pool'\nassert (_o >= 0).all(), 'After ReLU there are no negative values'\n_o2 = conv_block(_r.normal(size=(10, 10)), _np.ones((3, 3)))\nassert _np.shape(_o2) == (4, 4), '10×10 → 8×8 → 4×4'"
     }
    },
    {
     "title": "Counting the shapes of a CNN",
     "prompt": "<p>Write <code>cnn_summary(n, in_ch, layers)</code>: the image <code>in_ch × n × n</code>. <code>layers</code> are tuples of <code>(\"conv\", out_ch, k, padding)</code> or <code>(\"pool\", 2)</code> (stride: conv 1, pool — its own size). The function returns the final shape <code>(C, H, W)</code> and the total number of parameters of all conv layers: <code>((C, H, W), params)</code>. The network from the lesson: <code>cnn_summary(28, 1, [(\"conv\", 8, 3, 1), (\"pool\", 2), (\"conv\", 16, 3, 1), (\"pool\", 2)])</code> → <code>((16, 7, 7), 1248)</code>.</p>",
     "hints": [
      "Keep the current number of channels in <code>c</code>: the next conv <code>in_ch</code> is the same",
      "Pool does not change the number of channels"
     ],
     "check": {
      "tests": "_r = cnn_summary(28, 1, [(\"conv\", 8, 3, 1), (\"pool\", 2), (\"conv\", 16, 3, 1), (\"pool\", 2)])\nassert tuple(_r[0]) == (16, 7, 7), f'The final shape must be (16, 7, 7), you have {_r[0]}'\nassert _r[1] == 1248, f'Parameters: 8·(9+1) + 16·(72+1) = 80 + 1168 = 1248, you have {_r[1]}'\n_r2 = cnn_summary(32, 3, [(\"conv\", 16, 3, 0)])\nassert tuple(_r2[0]) == (16, 30, 30) and _r2[1] == 448, 'padding = 0: 32 → 30, параметр 448'\nassert cnn_summary(8, 1, []) == ((1, 8, 8), 0), 'If there are no layers — the input shape and 0 parameters'"
     }
    }
   ]
  },
  "dl-9": {
   "pr": [
    {
     "title": "Parameters of a new head",
     "prompt": "<p>Write <code>head_params(in_features, n_classes)</code>: the number of parameters of a <code>nn.Linear(in_features, n_classes)</code>-head. For example, ResNet-18 (512 features) and 5 Kazakh dishes → 2,565.</p>",
     "hints": [
      "<code>in·n + n</code>"
     ],
     "check": {
      "tests": "assert head_params(512, 5) == 2565, f'512·5 + 5 = 2565, you have {head_params(512, 5)}'\nassert head_params(2048, 10) == 20490, 'ResNet-50, 10 класс: 20490'\nassert head_params(768, 2) == 1538, 'BERT embedding (768), two classes: 1538'"
     }
    },
    {
     "title": "Share of frozen parameters",
     "prompt": "<p>Write <code>frozen_share(layers, train)</code>: <code>layers</code> is a dictionary from the block name to the number of parameters, <code>train</code> is the list of blocks that are trained. Return the share of frozen parameters (0…1). For example, <code>{\"backbone\": 990, \"fc\": 10}</code>, <code>[\"fc\"]</code> → 0.99.</p>",
     "hints": [
      "<code>sum(v for k, v in layers.items() if k not in train)</code>"
     ],
     "check": {
      "tests": "assert abs(frozen_share({\"backbone\": 990, \"fc\": 10}, [\"fc\"]) - 0.99) < 1e-12, '990 / 1000 = 0.99'\nassert frozen_share({\"a\": 5, \"b\": 5}, [\"a\", \"b\"]) == 0, 'If everything is trained, then 0'\n_l = {\"conv1\": 9408, \"layer1\": 147968, \"layer2\": 525568, \"layer3\": 2099712, \"layer4\": 8393728, \"fc\": 2565}\nassert abs(frozen_share(_l, [\"fc\"]) - 0.99977) < 1e-4, 'ResNet-18, тек fc: ≈ 0.9998'"
     }
    },
    {
     "title": "Feature extraction or fine-tuning",
     "prompt": "<p>Write <code>choose_strategy(n_examples, far_domain=False)</code>: if the domain is far from ImageNet (X-ray images, satellite photos) or there are at least 1,000 examples — <code>\"fine_tuning\"</code>; otherwise (hundreds of examples) — <code>\"feature_extraction\"</code>.</p>",
     "hints": [
      "<code>if far_domain or n_examples >= 1000</code>"
     ],
     "check": {
      "tests": "assert choose_strategy(300) == 'feature_extraction', '300 dish photos: feature_extraction'\nassert choose_strategy(5000) == 'fine_tuning', '5000 сурет: fine_tuning'\nassert choose_strategy(1000) == 'fine_tuning', 'Шекара: 1000 → fine_tuning'\nassert choose_strategy(200, far_domain=True) == 'fine_tuning', 'Домен алыс болса: fine_tuning'"
     }
    },
    {
     "title": "An approach by data type",
     "prompt": "<p>Following the table from the lesson, write <code>recommend(projects)</code>: <code>projects</code> is a list of dictionaries <code>{\"name\": ..., \"data\": ...}</code>. <code>data</code>: <code>\"table\"</code> → <code>\"gradient_boosting\"</code>; <code>\"image\"</code>, <code>\"audio\"</code>, <code>\"video\"</code> → <code>\"pretrained_cnn\"</code>; <code>\"text\"</code> → <code>\"pretrained_lm\"</code>; otherwise → <code>\"unknown\"</code>. The result: the dictionary <code>{name: тәсіл}</code>.</p>",
     "hints": [
      "Write the rules into a dictionary and apply <code>.get(data, \"unknown\")</code>"
     ],
     "check": {
      "tests": "_p = [{\"name\": \"churn\", \"data\": \"table\"}, {\"name\": \"тағамдар\", \"data\": \"image\"},\n      {\"name\": \"пікірлер\", \"data\": \"text\"}, {\"name\": \"қоңырау\", \"data\": \"audio\"}, {\"name\": \"x\", \"data\": \"graph\"}]\n_r = recommend(_p)\nassert _r.get(\"churn\") == \"gradient_boosting\", 'Tabular data: gradient_boosting'\nassert _r.get(\"тағамдар\") == \"pretrained_cnn\" and _r.get(\"қоңырау\") == \"pretrained_cnn\", 'Сурет пен дыбыс: pretrained_cnn'\nassert _r.get(\"пікірлер\") == \"pretrained_lm\", 'Text: pretrained_lm'\nassert _r.get(\"x\") == \"unknown\", 'Unknown data type: unknown'\nassert recommend([]) == {}, 'An empty list — an empty dictionary'"
     }
    },
    {
     "title": "ImageNet normalization",
     "prompt": "<p>A pretrained model needs normalized images, as in training. Write <code>normalize(img, mean, std)</code>: <code>img</code> of shape <code>(H, W, 3)</code>, values 0…255. First divide by 255, then for each channel subtract <code>(x − mean) / std</code> and divide by <code>denormalize(x, mean, std)</code>. Return the inverse transform, the values 0…255.</p>",
     "hints": [
      "Broadcasting: <code>(H, W, 3) − (3,)</code> takes its own mean for each channel"
     ],
     "check": {
      "tests": "import numpy as _np\n_img = _np.random.default_rng(0).integers(0, 256, (4, 5, 3))\n_n = normalize(_img, MEAN, STD)\nassert _np.shape(_n) == (4, 5, 3), 'The shape must be kept'\nassert _np.allclose(_n, (_img / 255 - MEAN) / STD), 'normalize = (img / 255 − mean) / std, for each channel'\nassert _np.allclose(denormalize(_n, MEAN, STD), _img), 'denormalize(normalize(img)) = img'\n_g = normalize(_np.full((1, 1, 3), 255), MEAN, STD)\nassert _np.allclose(_g[0, 0], (1 - MEAN) / STD), 'For a white pixel (255) it is (1 − mean) / std'"
     }
    },
    {
     "title": "A centroid head",
     "prompt": "<p>The simplest head is the centroid of each class (the middle of its features). Write <code>fit_centroids(F, y)</code>: for each class return the mean of the rows <code>F</code> as the dictionary <code>{класс: вектор}</code>. <code>predict_centroid(F, centroids)</code> returns for each row the class with the smallest Euclidean distance (a list). <code>F</code> — the features of the frozen backbone.</p>",
     "hints": [
      "<code>F[y == c].mean(axis=0)</code>",
      "For the distance use <code>((F[:, None] - C[None]) ** 2).sum(axis=2)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_F = _np.array([[0.0, 0.0], [0.2, 0.0], [5.0, 5.0], [5.2, 4.8], [0.0, 5.0], [0.2, 5.2]])\n_y = _np.array([0, 0, 1, 1, 2, 2])\n_c = fit_centroids(_F, _y)\nassert set(_c) == {0, 1, 2}, 'One centroid for each class'\nassert _np.allclose(_c[0], [0.1, 0.0]) and _np.allclose(_c[1], [5.1, 4.9]), 'The centroid is the mean of the rows of the class'\n_p = predict_centroid(_np.array([[0.3, 0.1], [4.0, 4.0], [0.0, 4.0]]), _c)\nassert [int(v) for v in _p] == [0, 1, 2], f'The prediction must be [0, 1, 2], you have {_p}'"
     }
    },
    {
     "title": "Training a softmax head",
     "prompt": "<p>On the features of the frozen backbone (<code>extract</code> are already ready) train a multi-class head with numpy. <code>train_head(F, y, k, lr=0.5, epochs=300)</code>: <code>W = zeros((F.shape[1], k))</code>, <code>b = zeros(k)</code>. In each epoch <code>P = softmax(F @ W + b)</code>, the gradient <code>dZ = (P − Y) / n</code> (Y is one-hot), <code>dW = F.T @ dZ</code>, <code>db = dZ.sum(axis=0)</code>. Return <code>(W, b)</code>. Then write the test accuracy into <code>head_acc</code>.</p>",
     "hints": [
      "One-hot: <code>Y[np.arange(n), y] = 1</code>",
      "Prediction: <code>np.argmax(F @ W + b, axis=1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert _np.shape(W) == (16, 3) and _np.shape(b) == (3,), f'The shape of W is (16, 3), b is (3,), you have {_np.shape(W)}, {_np.shape(b)}'\nassert _np.abs(W).sum() > 0, 'W must be trained (not zeros)'\nassert head_acc >= 0.9, f'head_acc must be at least 0.9, you have {head_acc}'\nassert W_frozen.shape == (2, 16), 'Do not change the backbone weights'\n_W1, _b1 = train_head(extract(X_train), y_train, 3, epochs=1)\nassert _np.allclose(_b1, -0.5 * (1 / 3 - _np.array([(y_train == c).mean() for c in range(3)]))), 'First step: P = 1/3, db = mean(P − Y)'"
     },
     "starter": "import numpy as np\nrng = np.random.default_rng(3)\ncenters = np.array([[0, 2], [2, -1], [-2, -1]])\ny_all = rng.integers(0, 3, 240)\nX_all = centers[y_all] + rng.normal(0, 0.6, (240, 2))\nX_train, X_test, y_train, y_test = X_all[:180], X_all[180:], y_all[:180], y_all[180:]\n\nW_frozen = np.random.default_rng(0).normal(0, 1, (2, 16))\ndef extract(X):\n    return np.tanh(X @ W_frozen)   # frozen backbone\n\ndef train_head(F, y, k, lr=0.5, epochs=300):\n    W = np.zeros((F.shape[1], k)); b = np.zeros(k)\n    return W, b\n\nW, b = train_head(extract(X_train), y_train, 3)\nhead_acc = 0\n"
    },
    {
     "title": "Head and raw features",
     "prompt": "<p>In the data it matters which quadrant a point lies in: <code>x1 · x2 &gt; 0</code> means class 1 (like XOR). Train <code>X</code> on the raw <code>LogisticRegression(max_iter=1000)</code> and write the test accuracy into <code>raw_acc</code>, and the accuracy of the trained <code>extract(X)</code> head on the frozen <code>head</code> features into <code>head_acc</code>. <code>head_params</code> is the number of trained parameters of the head (<code>coef_.size + intercept_.size</code>).</p>",
     "hints": [
      "<code>LogisticRegression(max_iter=1000).fit(extract(X_train), y_train)</code>",
      "<code>model.score(X, y)</code> gives the accuracy"
     ],
     "check": {
      "tests": "assert raw_acc < 0.7, f'A linear model on the raw X cannot separate the quadrants: raw_acc < 0.7, you have {raw_acc}'\nassert head is not None and head.n_features_in_ == 100, 'The head must be trained on 100 features extract(X_train)'\nassert head_acc >= 0.9, f'head_acc must be at least 0.9, you have {head_acc}'\nassert head_params == 101, f'head_params = 100 weights + 1 bias = 101, you have {head_params}'"
     }
    }
   ]
  },
  "cap6-1": {
   "pr": [
    {
     "title": "The profit formula",
     "prompt": "<p>Write <code>profit(tp, contacted, cost=2000, value=40000, save_rate=0.3)</code>: the profit from retaining a customer is <code>save_rate · value · tp − cost · contacted</code>. The example from the lesson: <code>profit(29, 55)</code> → 238,000 ₸.</p>",
     "hints": [
      "The formula from the lesson: <code>save_rate * value * tp - cost * contacted</code>"
     ],
     "check": {
      "tests": "assert profit(29, 55) is not None and abs(profit(29, 55) - 238000) < 1e-6, 'profit(29, 55) = 348 000 − 110 000 = 238 000'\nassert abs(profit(0, 10) + 20000) < 1e-6, 'If nobody stays, only the losses: −20 000'\nassert abs(profit(10, 20, cost=1000, value=50000, save_rate=0.5) - 230000) < 1e-6, 'Use the parameters: 0.5·50000·10 − 1000·20 = 230 000'"
     }
    },
    {
     "title": "Was the SLO met",
     "prompt": "<p>The SLO of the service: p95 latency &lt; 200 ms and the share of 5xx &lt; 0.1%. Write <code>slo_ok(latencies_ms, n_5xx, n_total)</code>: compute the p95 through <code>np.percentile(latencies_ms, 95)</code> and return <code>True</code> if both conditions are met, otherwise <code>False</code>.</p>",
     "hints": [
      "<code>np.percentile(latencies_ms, 95)</code>",
      "Combine the two conditions with <code>and</code>"
     ],
     "check": {
      "tests": "_fast = [50] * 95 + [150] * 5\nassert slo_ok(_fast, 0, 10000) is True, 'p95 = 150 ms, no errors: True'\nassert slo_ok([50] * 90 + [400] * 10, 0, 10000) is False, 'p95 = 400 ms: False'\nassert slo_ok(_fast, 10, 10000) is False, '10 / 10000 = 0.1% — equal to the limit, the SLO is not met: False'\nassert slo_ok(_fast, 9, 10000) is True, '9 / 10000 < 0.1%: True'"
     }
    },
    {
     "title": "The number of departed customers",
     "prompt": "<p>Compute from <code>churn.csv</code>: <code>n_customers</code> is the number of subscribers, <code>n_churned</code> is the number of those who left (<code>churned == 1</code>), <code>churn_rate</code> is the churn share.</p>",
     "hints": [
      "<code>churn[\"churned\"].sum()</code> counts the ones"
     ],
     "check": {
      "tests": "assert n_customers == 600, f'n_customers must be 600, you have {n_customers}'\nassert n_churned == 155, f'n_churned must be 155, you have {n_churned}'\nassert churn_rate is not None and abs(churn_rate - 155 / 600) < 1e-9, 'churn_rate = 155 / 600 ≈ 0.258'"
     }
    },
    {
     "title": "Churn by city",
     "prompt": "<p>To assess the risk of unfairness, we look at the churn share in each city. <code>city_rates</code> is the dictionary <code>{қала: үлес}</code> (rounded to 3 digits), <code>worst_city</code> is the city with the highest share, <code>gap</code> is the difference between the highest and the lowest share (not rounded).</p>",
     "hints": [
      "<code>churn.groupby(\"city\")[\"churned\"].mean()</code>",
      "<code>.idxmax()</code> gives the index of the largest value"
     ],
     "check": {
      "tests": "assert len(city_rates) == 5, f'There must be 5 cities, you have {len(city_rates)}'\nassert city_rates.get('Қарағанды') == 0.31 and city_rates.get('Шымкент') == 0.228, f'Karaganda 0.31, Shymkent 0.228, you have {city_rates}'\nassert worst_city == 'Қарағанды', f'worst_city = Karaganda, you have {worst_city}'\nassert gap is not None and abs(gap - (18 / 58 - 21 / 92)) < 1e-9, 'gap = 0.3103 − 0.2283 ≈ 0.082'"
     }
    },
    {
     "title": "Recall and precision",
     "prompt": "<p>The offline metric is recall for the customers who leave. Write <code>recall_precision(y_true, y_pred)</code>: return <code>(recall, precision)</code>, <code>recall = TP / (TP + FN)</code>, <code>precision = TP / (TP + FP)</code>. If the denominator is 0, the metric is 0.0. For example, <code>y_true = [1, 1, 0, 0, 1]</code>, <code>y_pred = [1, 0, 1, 0, 1]</code> → <code>(0.667, 0.667)</code>.</p>",
     "hints": [
      "TP: <code>(y_true == 1) & (y_pred == 1)</code>",
      "Avoid division by zero"
     ],
     "check": {
      "tests": "_r = recall_precision([1, 1, 0, 0, 1], [1, 0, 1, 0, 1])\nassert _r is not None and abs(_r[0] - 2 / 3) < 1e-9 and abs(_r[1] - 2 / 3) < 1e-9, f'It must be (2/3, 2/3), you have {_r}'\nassert tuple(recall_precision([1, 1, 0], [1, 1, 1])) == (1.0, 2 / 3), 'If we offer to everyone, recall = 1'\nassert tuple(recall_precision([1, 0], [0, 0])) == (0.0, 0.0), 'If we offer to nobody, recall = 0, precision = 0 (the denominator is 0)'"
     }
    },
    {
     "title": "A customer by the rule",
     "prompt": "<p>A simple rule without a model: we make an offer to a subscriber who has no contract (<code>has_contract == 0</code>) and who contacted support at least 3 times. <code>campaign_profit</code> is already ready. Compute over the whole <code>churn.csv</code> <code>rule_pred</code> (a 0/1 Series), <code>n_offers</code> (the number of offers) and <code>profit_rule</code>.</p>",
     "hints": [
      "Combine the two conditions with <code>&</code> and put them in brackets",
      "<code>.astype(int)</code>"
     ],
     "check": {
      "tests": "_ref = ((churn['has_contract'] == 0) & (churn['support_calls'] >= 3)).astype(int)\nassert rule_pred is not None and len(rule_pred) == 600 and (rule_pred.values == _ref.values).all(), 'rule_pred: has_contract == 0 AND support_calls >= 3'\nassert n_offers == int(_ref.sum()), f'n_offers must be {int(_ref.sum())}, you have {n_offers}'\nassert profit_rule is not None and abs(profit_rule - 268000) < 1e-6, f'profit_rule must be 268,000 ₸, you have {profit_rule}'"
     }
    },
    {
     "title": "The most profitable threshold",
     "prompt": "<p>A rule by the number of calls to support: if there are <code>support_calls &gt;= t</code>, we make an offer. Write <code>best_threshold(df, ts)</code>: for each <code>t</code> compute the profit over all the data through <code>campaign_profit</code> and return <code>(ең жақсы t, оның пайдасы, {t: пайда})</code> (on a tie, the smaller t). Then <code>best_t, best_profit, table = best_threshold(churn, range(0, 7))</code>.</p>",
     "hints": [
      "Dictionary: <code>{t: campaign_profit(...) for t in ts}</code>",
      "<code>max(table, key=...)</code>"
     ],
     "check": {
      "tests": "assert len(table) == 7, f'There must be 7 thresholds in table, you have {len(table)}'\nassert abs(table[0] - 660000) < 1e-6, 't = 0 — offer to everyone: 660,000'\nassert best_t == 1 and abs(best_profit - 758000) < 1e-6, f'The best is t = 1, the profit must be 758,000, you have t={best_t}, {best_profit}'\nassert abs(table[3] - 354000) < 1e-6, 't = 3: 354 000'"
     }
    },
    {
     "title": "Comparing strategies",
     "prompt": "<p>Write <code>compare_strategies(y, strategies)</code>: <code>strategies</code> — <code>{атау: 0/1 болжамдар}</code>. For each strategy compute the profit and return <code>(ең тиімді атау, {атау: пайда}, baseline-дан озды ма)</code>. The third value: if the best strategy is strictly above both 'offer to everyone' and 'offer to nobody', then <code>True</code>. Then for four strategies <code>best, profits, beats = compare_strategies(...)</code>: <code>all</code>, <code>none</code>, <code>no_contract</code> (<code>has_contract == 0</code>), <code>calls_2</code> (<code>support_calls &gt;= 2</code>).</p>",
     "hints": [
      "Compute the profit of 'offer to everyone' through <code>np.ones(len(y))</code>",
      "The profit of 'offer to nobody' is always 0"
     ],
     "check": {
      "tests": "assert set(profits) == {'all', 'none', 'no_contract', 'calls_2'}, f'Four strategies are needed, you have {set(profits)}'\nassert abs(profits['all'] - 660000) < 1e-6 and abs(profits['none']) < 1e-6, 'all = 660 000, none = 0'\nassert abs(profits['no_contract'] - 718000) < 1e-6 and abs(profits['calls_2'] - 526000) < 1e-6, 'no_contract = 718 000, calls_2 = 526 000'\nassert best == 'no_contract' and beats is True, f'The best is no_contract, it beats the baseline. You have {best}, {beats}'\n_b2, _p2, _w2 = compare_strategies(y, {'all': strategies['all'], 'calls_5': (churn['support_calls'] >= 5).astype(int)})\nassert _b2 == 'all' and _w2 is False, 'If the best is offer to everyone, it does not beat the baseline: False'"
     }
    }
   ]
  },
  "cap6-2": {
   "pr": [
    {
     "title": "Share of missing values",
     "prompt": "<p>Write <code>missing_share(df)</code>: for the columns that have missing values, return the dictionary <code>{баған: бос мәндер үлесі}</code>, rounding the shares to 3 digits. For <code>churn.csv</code>: <code>{\"age\": 0.042, \"data_gb\": 0.028}</code>.</p>",
     "hints": [
      "<code>df.isna().mean()</code> gives the share of missing values in each column"
     ],
     "check": {
      "tests": "import pandas as _pd\nassert missing_share(churn) == {'age': 0.042, 'data_gb': 0.028}, f\"It must be {{'age': 0.042, 'data_gb': 0.028}}, you have {missing_share(churn)}\"\nassert missing_share(_pd.DataFrame({'a': [1, None, None, 4], 'b': [1, 2, 3, 4]})) == {'a': 0.5}, 'A column without missing values is not in the result'"
     }
    },
    {
     "title": "Missing columns",
     "prompt": "<p>When new data arrives, we first check the columns. Write <code>missing_columns(df, expected)</code>: return the columns from the list <code>expected</code> that are not in <code>df</code>, in the same order.</p>",
     "hints": [
      "<code>[c for c in expected if c not in df.columns]</code>"
     ],
     "check": {
      "tests": "assert missing_columns(churn, EXPECTED) == [], 'churn.csv has all the columns: []'\n_bad = churn.drop(columns=['monthly_fee', 'city'])\nassert missing_columns(_bad, EXPECTED) == ['city', 'monthly_fee'], f\"It must be ['city', 'monthly_fee'] (the order of expected), you have {missing_columns(_bad, EXPECTED)}\""
     }
    },
    {
     "title": "Category values",
     "prompt": "<p>In the data contract we write the allowed values of the categorical columns. Build the dictionary <code>categories</code>: under the keys <code>\"city\"</code> and <code>\"plan\"</code> — the sorted list of unique values from <code>churn.csv</code>.</p>",
     "hints": [
      "<code>sorted(churn[\"city\"].unique().tolist())</code>"
     ],
     "check": {
      "tests": "assert categories.get('plan') == ['basic', 'premium', 'standard'], f\"plan: ['basic', 'premium', 'standard'], you have {categories.get('plan')}\"\nassert categories.get('city') == sorted(['Алматы', 'Астана', 'Шымкент', 'Ақтөбе', 'Қарағанды']), f\"city: a sorted list of 5 cities, you have {categories.get('city')}\""
     }
    },
    {
     "title": "Checking value ranges",
     "prompt": "<p>Write <code>check_ranges(df, contract)</code>: <code>contract</code> — <code>{баған: (lo, hi)}</code>. For each column return the number of rows outside the range (empty values are not counted) as <code>{баған: сан}</code>, only for the columns where the number is greater than 0. For <code>churn.csv</code> by <code>CONTRACT</code> the result must be an empty dictionary.</p>",
     "hints": [
      "Remove the empty values through <code>.dropna()</code>",
      "<code>(s < lo) | (s > hi)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\nassert check_ranges(churn, CONTRACT) == {}, f'churn.csv matches the contract: {{}}, you have {check_ranges(churn, CONTRACT)}'\n_d = _pd.DataFrame({'age': [25, 5, None, 130], 'tenure_months': [1, 2, 3, 4], 'monthly_fee': [0, 5000, 7000, 200000],\n                    'support_calls': [0, 1, 2, 3], 'has_contract': [0, 1, 2, 1]})\nassert check_ranges(_d, CONTRACT) == {'age': 2, 'monthly_fee': 2, 'has_contract': 1}, f\"It must be {{'age': 2, 'monthly_fee': 2, 'has_contract': 1}}, you have {check_ranges(_d, CONTRACT)}\""
     }
    },
    {
     "title": "Checking stratify",
     "prompt": "<p>Did the train/test split keep the churn share? Compute <code>train_rate</code>, <code>test_rate</code> (the mean of <code>churned</code> in both sets) and <code>rate_gap</code> (the absolute value of the difference). Then split <b>without</b> <code>stratify</code> (<code>random_state=0</code>) and compute <code>gap_no_strat</code>.</p>",
     "hints": [
      "<code>y_train.mean()</code>",
      "<code>train_test_split(..., random_state=0)</code> — without the stratify parameter"
     ],
     "check": {
      "tests": "assert train_rate is not None and abs(train_rate - 116 / 450) < 1e-9, f'train_rate = 116 / 450 ≈ 0.258, you have {train_rate}'\nassert test_rate is not None and abs(test_rate - 0.26) < 1e-9, f'test_rate = 39 / 150 = 0.26, you have {test_rate}'\nassert rate_gap is not None and rate_gap < 0.005, 'With stratify the difference is very small'\nfrom sklearn.model_selection import train_test_split as _tts\n_, _, _ya, _yb = _tts(churn, churn['churned'], test_size=0.25, random_state=0)\nassert gap_no_strat is not None and abs(gap_no_strat - abs(_ya.mean() - _yb.mean())) < 1e-9, 'gap_no_strat: without stratify, random_state=0'"
     }
    },
    {
     "title": "Filling with the train median",
     "prompt": "<p>When filling in missing values, we take the median only from <b>train</b> (so that information about test does not leak into the model). Write <code>medians</code>: <code>age</code> and <code>data_gb</code> — the median in train (a dictionary). <code>X_test_filled</code> is a copy of <code>X_test</code> filled with these medians.</p>",
     "hints": [
      "<code>X_train[c].median()</code>",
      "<code>X_test.fillna(medians)</code> returns a new DataFrame"
     ],
     "check": {
      "tests": "assert abs(medians.get('age', 0) - X_train['age'].median()) < 1e-9 and abs(medians.get('data_gb', 0) - X_train['data_gb'].median()) < 1e-9, 'Медиана train-нен алынуы керек'\nassert medians['age'] != churn['age'].median() or medians['data_gb'] != churn['data_gb'].median(), 'It needs the median of train, not of all the data'\nassert X_test_filled[['age', 'data_gb']].isna().sum().sum() == 0, 'X_test_filled-те age, data_gb бос болмауы керек'\n_m = X_test['age'].isna()\nassert (X_test_filled.loc[_m, 'age'] == medians['age']).all(), 'The empty age values must be filled with the median of train'\nassert X_test['age'].isna().sum() > 0, 'The original X_test must not change: work with a copy'"
     }
    },
    {
     "title": "A single-feature baseline",
     "prompt": "<p>Which single feature by itself predicts the churn best? For each <code>FEATURES</code> evaluate <code>make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))</code> on this column only, on train, by 5-fold CV ROC-AUC. <code>single_auc</code> — <code>{белгі: AUC}</code>, <code>best_feature</code> — the feature with the largest AUC.</p>",
     "hints": [
      "Pass one column as a DataFrame: <code>X_train[[f]]</code>",
      "<code>cross_val_score(..., cv=5, scoring=\"roc_auc\").mean()</code>"
     ],
     "check": {
      "tests": "assert set(single_auc) == set(FEATURES), 'One AUC value for each feature in FEATURES'\nassert abs(single_auc['tenure_months'] - 0.7478) < 0.005, f\"The AUC of tenure_months must be ≈ 0.748, you have {single_auc['tenure_months']:.4f}\"\nassert abs(single_auc['monthly_fee'] - 0.5315) < 0.005, f\"The AUC of monthly_fee must be ≈ 0.532, you have {single_auc['monthly_fee']:.4f}\"\nassert best_feature == 'tenure_months', f'best_feature = tenure_months, you have {best_feature}'"
     }
    },
    {
     "title": "A baseline table",
     "prompt": "<p>On the test set compare the ROC-AUC of three variants: <code>\"dummy\"</code> — <code>DummyClassifier(strategy=\"most_frequent\")</code>; <code>\"calls_rule\"</code> — without a model, simply take <code>support_calls</code> as the score; <code>\"compact_lr\"</code> — imputer + scaler + LR, trained on train <code>FEATURES</code>. Write the result into the dictionary <code>aucs</code>, and the names into the list <code>ranking</code> in descending order of AUC.</p>",
     "hints": [
      "As the score you can take the column itself: <code>roc_auc_score(y_test, X_test[\"support_calls\"])</code>",
      "<code>sorted(aucs, key=aucs.get, reverse=True)</code>"
     ],
     "check": {
      "tests": "assert set(aucs) == {'dummy', 'calls_rule', 'compact_lr'}, f'Three keys are needed, you have {set(aucs)}'\nassert abs(aucs['dummy'] - 0.5) < 1e-9, 'dummy AUC = 0.5'\nassert abs(aucs['calls_rule'] - 0.5726) < 0.002, f\"The AUC of calls_rule must be ≈ 0.573, you have {aucs['calls_rule']:.4f}\"\nassert abs(aucs['compact_lr'] - 0.8165) < 0.004, f\"The AUC of compact_lr must be ≈ 0.816, you have {aucs['compact_lr']:.4f}\"\nassert ranking == ['compact_lr', 'calls_rule', 'dummy'], f\"ranking = ['compact_lr', 'calls_rule', 'dummy'], you have {ranking}\""
     }
    }
   ]
  },
  "cap6-3": {
   "pr": [
    {
     "title": "Metadata dictionary",
     "prompt": "<p>Write <code>make_meta(version, features, threshold, test_auc)</code>: return the dictionary with the keys <code>version</code>, <code>features</code>, <code>threshold</code>, <code>metrics</code>, where <code>metrics = {\"test_auc\": test_auc}</code>. <code>features</code> — a copy of the list (if the original list changes, meta must not change).</p>",
     "hints": [
      "<code>list(features)</code> creates a new list"
     ],
     "check": {
      "tests": "_f = ['tenure_months', 'monthly_fee']\n_m = make_meta('churn-lr-1.0.0', _f, 0.3, 0.816)\nassert _m == {'version': 'churn-lr-1.0.0', 'features': ['tenure_months', 'monthly_fee'], 'threshold': 0.3, 'metrics': {'test_auc': 0.816}}, f'Check the structure of the metadata, you have {_m}'\n_f.append('x')\nassert _m['features'] == ['tenure_months', 'monthly_fee'], 'features must be a copy: list(features)'"
     }
    },
    {
     "title": "Saving to JSON",
     "prompt": "<p>Write <code>save_load_json(meta, path)</code>: write <code>meta</code> to the file <code>json.dump(..., ensure_ascii=False, indent=2)</code> through <code>path</code>, then read this file again and return the dictionary that was read. The Kazakh letters in the file must be kept <code>\\u</code> without escaping.</p>",
     "hints": [
      "<code>with open(path, \"w\", encoding=\"utf-8\") as f:</code>",
      "<code>json.load(f)</code>"
     ],
     "check": {
      "tests": "import os as _os\nif _os.path.exists('meta_practice.json'):\n    _os.remove('meta_practice.json')\n_m = {'version': 'churn-lr-1.0.0', 'owner': 'Дала Мобайл', 'threshold': 0.3}\n_r = save_load_json(_m, 'meta_practice.json')\nassert _r == _m, 'The dictionary that is read must match the original'\nassert _os.path.exists('meta_practice.json'), 'Файл жазылуы керек'\n_txt = open('meta_practice.json', encoding='utf-8').read()\nassert 'Дала Мобайл' in _txt, 'ensure_ascii=False: the Kazakh letters must be kept in the file as they are'"
     }
    },
    {
     "title": "Bumping the version number",
     "prompt": "<p>The model version has the form <code>\"churn-lr-MAJOR.MINOR.PATCH\"</code>. Write <code>bump_version(version, part)</code>: <code>part</code> — <code>\"major\"</code>, <code>\"minor\"</code> or <code>\"patch\"</code>; that part increases by 1, and all the parts after it are reset to zero. For example, <code>bump_version(\"churn-lr-1.0.3\", \"minor\")</code> → <code>\"churn-lr-1.1.0\"</code>.</p>",
     "hints": [
      "<code>version.rsplit(\"-\", 1)</code> splits at the last hyphen"
     ],
     "check": {
      "tests": "assert bump_version('churn-lr-1.0.3', 'minor') == 'churn-lr-1.1.0', f'It must be churn-lr-1.1.0, you have {bump_version(\"churn-lr-1.0.3\", \"minor\")}'\nassert bump_version('churn-lr-1.0.3', 'patch') == 'churn-lr-1.0.4', 'patch: 1.0.3 → 1.0.4'\nassert bump_version('churn-lr-1.4.2', 'major') == 'churn-lr-2.0.0', 'major: 1.4.2 → 2.0.0'\nassert bump_version('churn-lr-1.9.0', 'minor') == 'churn-lr-1.10.0', 'After 9 comes 10: 1.10.0'"
     }
    },
    {
     "title": "Checking the metadata",
     "prompt": "<p>When the service starts, the metadata is checked. Write <code>check_meta(meta)</code>: return the list of errors. If any of the keys <code>REQUIRED</code> is missing — <code>\"{кілт}: missing\"</code>; if <code>threshold</code> is present but it is not a number in the range 0…1 — <code>\"threshold: invalid\"</code>; if <code>features</code> is present but it is an empty list — <code>\"features: empty\"</code>.</p>",
     "hints": [
      "First check the missing keys, then the values"
     ],
     "check": {
      "tests": "_ok = {'version': 'churn-lr-1.0.0', 'features': ['tenure_months'], 'threshold': 0.3, 'metrics': {}}\nassert check_meta(_ok) == [], f'For correct meta an empty list, you have {check_meta(_ok)}'\nassert check_meta({'features': ['a'], 'threshold': 0.5}) == ['version: missing', 'metrics: missing'], 'The missing keys in the REQUIRED order'\nassert check_meta(dict(_ok, threshold=1.5)) == ['threshold: invalid'], 'threshold > 1: invalid'\nassert check_meta(dict(_ok, threshold='0.3')) == ['threshold: invalid'], 'Text in threshold: invalid'\nassert check_meta(dict(_ok, features=[])) == ['features: empty'], 'Бос features: empty'"
     }
    },
    {
     "title": "Copying with pickle",
     "prompt": "<p>Turn the model into bytes with <code>pickle.dumps</code>, then load it back with <code>pickle.loads</code>: <code>loaded</code>. <code>n_bytes</code> is the number of bytes, <code>same</code> — whether the results of the two models in <code>X_test[FEATURES]</code> are the same (<code>predict_proba</code>, bool) <code>np.allclose</code>.</p>",
     "hints": [
      "<code>blob = pickle.dumps(model)</code>, <code>len(blob)</code>"
     ],
     "check": {
      "tests": "assert loaded is not None and loaded is not model, 'loaded — the result of pickle.loads (a new object)'\nassert n_bytes > 100, f'n_bytes — the number of bytes, you have {n_bytes}'\nassert same is True, 'The loaded model must give the same probabilities'\nassert hasattr(loaded, 'predict_proba') and list(loaded.feature_names_in_) == FEATURES, 'The whole pipeline must be kept'"
     }
    },
    {
     "title": "Training-serving skew",
     "prompt": "<p>In the notebook we divided <code>monthly_fee</code> by a thousand tenge during training (<code>model_k</code>), but the API sends tenge. <code>p_right</code> — the probabilities on X_test with the correct processing (fee / 1000), <code>p_skew</code> — the probabilities without processing (in tenge). <code>skew</code> — their mean absolute difference, <code>flipped</code> — the share of subscribers whose <code>will_churn</code> decision (<code>p ≥ 0.3</code>) has changed.</p>",
     "hints": [
      "Processing as in training, on test: <code>Xk_test[\"monthly_fee\"] / 1000</code>",
      "<code>(p_right >= THRESHOLD) != (p_skew >= THRESHOLD)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_Xt = X_test[FEATURES].copy(); _Xt['monthly_fee'] = _Xt['monthly_fee'] / 1000\n_pr = model_k.predict_proba(_Xt)[:, 1]; _ps = model_k.predict_proba(X_test[FEATURES])[:, 1]\nassert p_right is not None and _np.allclose(p_right, _pr), 'p_right: X_test-те fee / 1000'\nassert p_skew is not None and _np.allclose(p_skew, _ps), 'p_skew: X_test[FEATURES] without processing'\nassert skew is not None and abs(skew - _np.mean(_np.abs(_pr - _ps))) < 1e-9 and skew > 0.1, f'skew — the mean absolute difference, it must be large, you have {skew}'\nassert flipped is not None and abs(flipped - _np.mean((_pr >= 0.3) != (_ps >= 0.3))) < 1e-9, 'flipped — the share of changed decisions'"
     }
    },
    {
     "title": "A tree-based candidate",
     "prompt": "<p>The third candidate: <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> in <code>FEATURES</code> (a tree does not need a scaler). By 5-fold CV ROC-AUC on train, compute <code>cv_tree</code> and <code>cv_compact</code> (imputer + scaler + LR). <code>chosen</code> — the name of the winning model (<code>\"tree\"</code> or <code>\"compact\"</code>). Train the winner on the whole train, call it <code>final_model</code> and compute <code>test_auc</code>.</p>",
     "hints": [
      "Put the candidates into a dictionary and evaluate them in one loop",
      "<code>max(scores, key=scores.get)</code>"
     ],
     "check": {
      "tests": "assert abs(cv_tree - 0.7808) < 0.01, f'cv_tree must be ≈ 0.781, you have {cv_tree:.4f}'\nassert abs(cv_compact - 0.8134) < 0.003, f'cv_compact must be ≈ 0.813, you have {cv_compact:.4f}'\nassert chosen == 'compact', f'By CV compact wins, you have {chosen}'\nassert final_model is not None and hasattr(final_model, 'predict_proba') and final_model.n_features_in_ == 4, 'final_model — the winner trained on FEATURES'\nassert abs(test_auc - 0.8165) < 0.004, f'test_auc must be ≈ 0.816, you have {test_auc:.4f}'"
     }
    },
    {
     "title": "A set of artifacts",
     "prompt": "<p>Write <code>save_artifact(model, meta, folder)</code>: it saves <code>os.makedirs(folder, exist_ok=True)</code>, inside which there is <code>model.pkl</code> (pickle) and <code>meta.json</code>. <code>load_artifact(folder)</code> reads both files and returns <code>(model, meta)</code>, but raises <code>meta[\"features\"]</code> if the <code>feature_names_in_</code> of the model does not match the list <code>ValueError</code> (protection against training-serving skew).</p>",
     "hints": [
      "<code>os.path.join(folder, \"model.pkl\")</code>",
      "The pipeline has <code>feature_names_in_</code>, because it is trained on a DataFrame"
     ],
     "check": {
      "tests": "import numpy as _np, os as _os\n_meta = {'version': MODEL_VERSION, 'features': FEATURES, 'threshold': THRESHOLD}\nsave_artifact(model, _meta, 'artifact_practice')\nassert _os.path.exists('artifact_practice/model.pkl') and _os.path.exists('artifact_practice/meta.json'), 'The folder must contain model.pkl and meta.json'\n_m, _mt = load_artifact('artifact_practice')\nassert _mt == _meta, 'meta must be read correctly'\nassert _np.allclose(_m.predict_proba(X_test[FEATURES]), model.predict_proba(X_test[FEATURES])), 'The loaded model must give the same result'\nsave_artifact(model, dict(_meta, features=['monthly_fee', 'tenure_months', 'support_calls', 'has_contract']), 'artifact_bad')\ntry:\n    load_artifact('artifact_bad')\n    _raised = False\nexcept ValueError:\n    _raised = True\nassert _raised, 'If the order or the set of features does not match, a ValueError must be raised'"
     }
    }
   ]
  },
  "cap6-4": {
   "pr": [
    {
     "title": "Health endpoint",
     "prompt": "<p>Write <code>health(meta)</code>: it must return <code>/health</code> the same way as the endpoint <code>(200, {\"status\": \"ok\", \"model_version\": meta[\"version\"]})</code>. If there is no <code>version</code> in <code>meta</code>, return <code>(500, {\"status\": \"error\"})</code>.</p>",
     "hints": [
      "Return a tuple: <code>return 200, {...}</code>"
     ],
     "check": {
      "tests": "assert health({'version': 'churn-lr-1.0.0'}) == (200, {'status': 'ok', 'model_version': 'churn-lr-1.0.0'}), 'The correct answer: (200, {status: ok, model_version: ...})'\nassert health({}) == (500, {'status': 'error'}), 'If there is no version: (500, {status: error})'"
     }
    },
    {
     "title": "Number or bool",
     "prompt": "<p>Write <code>is_number(v)</code>: <code>v</code> — if it is <code>int</code> or <code>float</code>, it means <code>True</code>, but if it is <code>bool</code> (True/False), then <code>False</code>. A text <code>\"12\"</code> is also <code>False</code>. Do not forget that in Python <code>isinstance(True, int)</code> → <code>True</code>.</p>",
     "hints": [
      "First check for bool: <code>isinstance(v, bool)</code>"
     ],
     "check": {
      "tests": "assert is_number(5) and is_number(6500.0), 'int мен float — сан'\nassert is_number(True) is False and is_number(False) is False, 'A bool is not accepted as a number'\nassert is_number('12') is False and is_number(None) is False, 'Text and None are not numbers'"
     }
    },
    {
     "title": "Missing fields",
     "prompt": "<p>Write <code>missing_fields(payload, required)</code>: return the fields from the list <code>required</code> that are not in the dictionary <code>payload</code>, in the same order. For example, <code>{\"tenure_months\": 5}</code> and FEATURES → <code>[\"monthly_fee\", \"support_calls\", \"has_contract\"]</code>.</p>",
     "hints": [
      "<code>[f for f in required if f not in payload]</code>"
     ],
     "check": {
      "tests": "assert missing_fields({'tenure_months': 5}, FEATURES) == ['monthly_fee', 'support_calls', 'has_contract'], 'Three fields are missing'\nassert missing_fields({'tenure_months': 5, 'monthly_fee': 1, 'support_calls': 0, 'has_contract': 1, 'customer_id': 'A'}, FEATURES) == [], 'Everything is there, extra fields are ignored'"
     }
    },
    {
     "title": "A DataFrame from the request",
     "prompt": "<p>Write <code>to_frame(payload, features)</code>: it returns a DataFrame of one row, with the columns in exactly the order <code>features</code>, and the extra fields (<code>customer_id</code>) do not get in. The model is sensitive to the order of the columns: if the order is broken, a training-serving skew appears.</p>",
     "hints": [
      "<code>{f: payload[f] for f in features}</code>"
     ],
     "check": {
      "tests": "_p = {'has_contract': 0, 'customer_id': 'A-17', 'support_calls': 3, 'monthly_fee': 6500, 'tenure_months': 5}\n_df = to_frame(_p, FEATURES)\nassert list(_df.columns) == FEATURES, f'The order of the columns must match FEATURES, you have {list(_df.columns)}'\nassert len(_df) == 1 and _df.iloc[0]['monthly_fee'] == 6500, 'One row, the values are kept'\nassert 'customer_id' not in _df.columns, 'An extra field must not get in'"
     }
    },
    {
     "title": "Risk level",
     "prompt": "<p>The operator sees a level on the screen, not a number. The model <code>validate</code>, <code>predict_endpoint</code> are ready. Write <code>risk_level(proba)</code>: <code>&lt; 0.3</code> → <code>\"low\"</code>, <code>&lt; 0.6</code> → <code>\"medium\"</code>, otherwise <code>\"high\"</code>. <code>predict_with_risk(payload)</code>: if the result of <code>predict_endpoint</code> is 200, return the answer with the added key <code>\"risk\"</code>; if it is 422 — unchanged.</p>",
     "hints": [
      "<code>dict(body, risk=...)</code> creates a new dictionary"
     ],
     "check": {
      "tests": "assert risk_level(0.1) == 'low' and risk_level(0.3) == 'medium' and risk_level(0.59) == 'medium' and risk_level(0.6) == 'high', 'Boundaries: < 0.3 low, < 0.6 medium, the rest high'\n_s, _b = predict_with_risk({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})\nassert _s == 200 and _b.get('risk') == risk_level(_b['churn_proba']), 'Жауапта risk болуы керек'\nassert {'churn_proba', 'will_churn', 'model_version'} <= set(_b), 'The previous keys must be kept'\n_s2, _b2 = predict_with_risk({'tenure_months': 5})\nassert _s2 == 422 and 'risk' not in _b2, 'The 422 answer does not change'"
     }
    },
    {
     "title": "Batch endpoint",
     "prompt": "<p>For the nightly scoring write <code>predict_batch(payloads)</code>: it returns <code>(200, {\"results\": [...]})</code>. For each element: if <code>validate</code> gives an error, then <code>{\"errors\": [...]}</code>, otherwise <code>{\"churn_proba\": round(proba, 4), \"will_churn\": proba ≥ THRESHOLD}</code>. Send the correct rows to the model <b>in one DataFrame</b>. If <code>payloads</code> is not a list, return <code>(422, {\"errors\": [\"payloads: list болуы керек\"]})</code>.</p>",
     "hints": [
      "First check everything and collect the correct indices",
      "Call the model once: <code>model.predict_proba(df)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}\n_ok2 = {'tenure_months': 60, 'monthly_fee': 3000, 'support_calls': 0, 'has_contract': 1}\n_s, _b = predict_batch([_ok, {'tenure_months': 5}, _ok2])\nassert _s == 200 and len(_b['results']) == 3, 'Each request gets one result, the order is kept'\nassert 'errors' in _b['results'][1] and any('monthly_fee' in e for e in _b['results'][1]['errors']), 'The erroneous element must have errors'\n_p = model.predict_proba(_pd.DataFrame([_ok, _ok2])[FEATURES])[:, 1]\nassert abs(_b['results'][0]['churn_proba'] - round(float(_p[0]), 4)) < 1e-9 and abs(_b['results'][2]['churn_proba'] - round(float(_p[1]), 4)) < 1e-9, 'churn_proba = round(proba, 4)'\nassert _b['results'][2]['will_churn'] == bool(_p[1] >= THRESHOLD), 'will_churn = proba >= THRESHOLD'\nassert predict_batch({'a': 1})[0] == 422, 'For an input that is not a list — 422'\nassert predict_batch([]) == (200, {'results': []}), 'An empty list: an empty result'"
     }
    },
    {
     "title": "Service error: 500",
     "prompt": "<p>Write <code>safe_endpoint(payload)</code>: if there is a client error (validate), return <code>(422, {\"errors\": [...]})</code>; if any exception occurs when calling the model — <code>(500, {\"error\": \"internal\"})</code> (the client is not blamed); otherwise <code>predict_endpoint</code>, like <code>(200, {...})</code>. The checker will deliberately replace <code>model</code> with a broken object.</p>",
     "hints": [
      "Put the model call inside <code>try / except Exception</code>",
      "Validation must be outside the try: it gives 422"
     ],
     "check": {
      "tests": "_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}\n_s, _b = safe_endpoint(_ok)\nassert _s == 200 and 0 <= _b['churn_proba'] <= 1, 'A correct request: 200'\nassert safe_endpoint({'tenure_months': -1})[0] == 422, 'A client error: 422'\nclass _Broken:\n    def predict_proba(self, X):\n        raise RuntimeError('model file corrupted')\n_real = model\nmodel = _Broken()\ntry:\n    _r = safe_endpoint(_ok)\nfinally:\n    model = _real\nassert _r == (500, {'error': 'internal'}), f'If the model fails, it must be (500, {{error: internal}}), you have {_r}'\nassert safe_endpoint({'tenure_months': 'x'})[0] == 422, 'Validation before the model: 422'"
     }
    },
    {
     "title": "An endpoint that computes an offer",
     "prompt": "<p>Write <code>predict_offer(payload)</code>: if <code>predict_endpoint</code> returns 422, return it. Otherwise add two keys to the answer: <code>expected_gain</code> = <code>round(proba · 0.3 · 40 000 − 2 000)</code> (₸, an integer; proba is the rounded <code>churn_proba</code>) and <code>offer</code> = <code>will_churn</code> and <code>expected_gain &gt; 0</code>. For example, proba 0.8427 → gain = 8,112.</p>",
     "hints": [
      "0.3 · 40 000 = 12 000: the expected value of a retained subscriber",
      "<code>dict(body, expected_gain=..., offer=...)</code>"
     ],
     "check": {
      "tests": "_s, _b = predict_offer({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})\nassert _s == 200 and 'expected_gain' in _b and 'offer' in _b, 'The answer must contain expected_gain and offer'\nassert _b['expected_gain'] == round(_b['churn_proba'] * 12000 - 2000), 'expected_gain = round(proba · 12 000 − 2 000)'\nassert _b['offer'] == (_b['will_churn'] and _b['expected_gain'] > 0), 'offer = will_churn and gain > 0'\n_s2, _b2 = predict_offer({'tenure_months': 70, 'monthly_fee': 3000, 'support_calls': 0, 'has_contract': 1})\nassert _s2 == 200 and _b2['offer'] is False, 'No offer is made to subscribers with a low risk'\nassert predict_offer({'tenure_months': 5})[0] == 422, 'Validation error: 422'"
     }
    }
   ]
  },
  "cap6-5": {
   "pr": [
    {
     "title": "P95 latency",
     "prompt": "<p>Write <code>latency_stats(ms)</code>: from the request times (milliseconds) return the dictionary <code>{\"p50\": ..., \"p95\": ..., \"max\": ...}</code> (<code>np.percentile</code>, float). For example, for the numbers from 1 to 100, p95 = 95.05.</p>",
     "hints": [
      "<code>np.percentile(ms, 95)</code>"
     ],
     "check": {
      "tests": "_r = latency_stats(list(range(1, 101)))\nassert abs(_r.get('p50', 0) - 50.5) < 1e-9 and abs(_r.get('p95', 0) - 95.05) < 1e-9, f'p50 = 50.5, p95 = 95.05, you have {_r}'\nassert _r.get('max') == 100, 'max = 100'"
     }
    },
    {
     "title": "Error shares",
     "prompt": "<p>Write <code>error_rates(codes)</code>: from the list of HTTP codes return <code>{\"4xx\": үлес, \"5xx\": үлес}</code> (400–499 and 500–599). For an empty list both values are 0.0. For example, <code>[200, 200, 422, 500]</code> → <code>{\"4xx\": 0.25, \"5xx\": 0.25}</code>.</p>",
     "hints": [
      "<code>sum(400 <= c < 500 for c in codes)</code>"
     ],
     "check": {
      "tests": "assert error_rates([200, 200, 422, 500]) == {'4xx': 0.25, '5xx': 0.25}, 'Each share is 1/4'\nassert error_rates([200] * 9 + [503]) == {'4xx': 0.0, '5xx': 0.1}, '503 — 5xx'\nassert error_rates([]) == {'4xx': 0.0, '5xx': 0.0}, 'Empty list: 0.0'"
     }
    },
    {
     "title": "Distribution of predictions",
     "prompt": "<p>The predictions themselves are also tracked in monitoring. Write <code>prediction_stats(probas, threshold=0.3)</code>: <code>{\"mean_proba\": орташа, \"churn_share\": proba ≥ threshold үлесі}</code>, both rounded to 3 digits.</p>",
     "hints": [
      "<code>(p >= threshold).mean()</code>"
     ],
     "check": {
      "tests": "assert prediction_stats([0.1, 0.2, 0.5, 0.9]) == {'mean_proba': 0.425, 'churn_share': 0.5}, 'mean = 0.425, the share of ≥ 0.3 = 0.5'\nassert prediction_stats([0.1, 0.2, 0.5, 0.9], threshold=0.6) == {'mean_proba': 0.425, 'churn_share': 0.25}, 'Use the threshold parameter'"
     }
    },
    {
     "title": "PSI from shares",
     "prompt": "<p>If the shares per bin are already ready, the PSI can be computed directly. Write <code>psi_from_shares(e, a)</code>: clip both through <code>np.clip(..., 1e-4, None)</code> and return <code>Σ (a − e) · ln(a / e)</code>. For example, <code>e = [0.25, 0.25, 0.25, 0.25]</code>, <code>a = [0.1, 0.2, 0.3, 0.4]</code> → ≈ 0.228 (watch).</p>",
     "hints": [
      "<code>np.sum((a - e) * np.log(a / e))</code>"
     ],
     "check": {
      "tests": "assert abs(psi_from_shares([0.25] * 4, [0.1, 0.2, 0.3, 0.4]) - 0.2282) < 1e-3, 'PSI ≈ 0.228 болуы керек'\nassert abs(psi_from_shares([0.5, 0.5], [0.5, 0.5])) < 1e-12, 'Identical shares: 0'\nimport numpy as _np\nassert _np.isfinite(psi_from_shares([0.5, 0.5], [1.0, 0.0])), 'With a zero share there must be no inf: np.clip'"
     }
    },
    {
     "title": "Contract test",
     "prompt": "<p>The service is ready. Write a pytest-style test <code>test_contract_lowers_risk()</code>: send two requests with the same other fields and <code>has_contract</code> 0 and 1, check through <code>churn_proba</code> that both statuses are 200 and that for the subscriber with a contract the <code>assert</code> is <b>strictly less</b>. The checker will run the test on the correct service and on broken variants.</p>",
     "hints": [
      "<code>dict(base, has_contract=0)</code> and <code>dict(base, has_contract=1)</code>",
      "Two asserts: the comparison of the status and the proba"
     ],
     "check": {
      "tests": "test_contract_lowers_risk()\ndef _breaks(_fn):\n    try:\n        _fn()\n    except Exception:\n        return True\n    return False\n_real = predict_endpoint\npredict_endpoint = lambda p: (200, {'churn_proba': 0.5, 'will_churn': True, 'model_version': MODEL_VERSION})\nassert _breaks(test_contract_lowers_risk), 'The test must catch a service that always returns 0.5 (proba strictly less)'\npredict_endpoint = lambda p: (200, {'churn_proba': 0.2 + 0.5 * p.get('has_contract', 0), 'will_churn': True, 'model_version': MODEL_VERSION})\nassert _breaks(test_contract_lowers_risk), 'The test must catch a service that raises the risk when there is a contract'\npredict_endpoint = lambda p: (422, {'errors': ['x']})\nassert _breaks(test_contract_lowers_risk), 'The test must catch a service that always answers 422 (status == 200)'\npredict_endpoint = _real"
     }
    },
    {
     "title": "Quality gate",
     "prompt": "<p>In CI the quality is checked before the merge. Write <code>quality_gate(model, X, y, min_auc=0.78)</code>: compute the ROC-AUC on <code>model.predict_proba(X)[:, 1]</code> and return <code>(passed, auc)</code>, where <code>passed = auc ≥ min_auc</code>. The finished <code>model</code> must pass on the test set, and <code>DummyClassifier</code> must not pass.</p>",
     "hints": [
      "<code>roc_auc_score(y, model.predict_proba(X)[:, 1])</code>"
     ],
     "check": {
      "tests": "_p, _a = quality_gate(model, X_test[FEATURES], y_test)\nassert _p is True and abs(_a - 0.8165) < 0.004, f'The finished model passes: AUC ≈ 0.816, you have {_a}'\n_d = DummyClassifier(strategy='most_frequent').fit(X_train[FEATURES], y_train)\n_pd2, _ad = quality_gate(_d, X_test[FEATURES], y_test)\nassert _pd2 is False and abs(_ad - 0.5) < 1e-9, 'The dummy must not pass: AUC = 0.5'\nassert quality_gate(model, X_test[FEATURES], y_test, min_auc=0.9)[0] is False, 'Use the min_auc parameter'"
     }
    },
    {
     "title": "The drift calculation",
     "prompt": "<p>Write <code>drift_report(train_df, new_df, cols, bins=5)</code>: for each column compute the PSI (the bin edges are the quantiles of train <code>np.unique(np.quantile(e, np.linspace(0, 1, bins + 1)))</code>, the outer edges <code>-inf</code>/<code>inf</code>, the shares not less than <code>1e-4</code>), and return <code>{баған: {\"psi\": 3 таңбаға дөңгелектенген, \"status\": \"ok\" | \"watch\" | \"alert\"}}</code>. Do not count the empty values. <code>report</code> — the calculation for <code>new_month</code> and <code>tenure_months</code> with <code>monthly_fee</code>.</p>",
     "hints": [
      "First write the function <code>psi</code> from cap6-5",
      "Remove the empty values through <code>e[~np.isnan(e)]</code>"
     ],
     "check": {
      "tests": "assert set(report) == {'tenure_months', 'monthly_fee'}, 'The calculation for two columns'\nassert report['tenure_months']['status'] == 'alert' and abs(report['tenure_months']['psi'] - 3.557) < 0.02, f\"tenure_months: PSI ≈ 3.56, alert. You have {report['tenure_months']}\"\nassert report['monthly_fee']['status'] == 'ok', f\"monthly_fee did not change: ok. You have {report['monthly_fee']}\"\n_r = drift_report(X_train, X_test, ['tenure_months', 'age'])\nassert abs(_r['tenure_months']['psi'] - 0.069) < 0.005, 'train vs test tenure_months: PSI ≈ 0.069'\nassert _r['age']['psi'] == _r['age']['psi'], 'Empty values in the age column must not give nan'"
     }
    },
    {
     "title": "Monitoring alerts",
     "prompt": "<p>Write <code>alerts(m)</code>: <code>m</code> are the daily metrics: <code>p95_ms</code>, <code>error_rate</code> (the share of 5xx), <code>psi</code> (<code>{баған: мән}</code>), <code>auc</code> (if unknown — <code>None</code>). Return the list of alerts in this order: <code>\"latency\"</code> (p95 ≥ 200), <code>\"errors\"</code> (error_rate ≥ 0.001), for each column with PSI &gt; 0.25 — <code>\"drift:баған\"</code> (sorted by the column name), <code>\"quality\"</code> (if auc is present and &lt; 0.78).</p>",
     "hints": [
      "<code>sorted(m[\"psi\"])</code> sorts by the column names",
      "Check <code>auc is not None</code>"
     ],
     "check": {
      "tests": "_ok = {'p95_ms': 120, 'error_rate': 0.0002, 'psi': {'tenure_months': 0.07, 'monthly_fee': 0.02}, 'auc': None}\nassert alerts(_ok) == [], 'Everything is normal: an empty list'\n_bad = {'p95_ms': 250, 'error_rate': 0.001, 'psi': {'tenure_months': 3.56, 'monthly_fee': 0.3, 'support_calls': 0.2}, 'auc': 0.74}\nassert alerts(_bad) == ['latency', 'errors', 'drift:monthly_fee', 'drift:tenure_months', 'quality'], f'The order: latency, errors, drift (sorted), quality. You have {alerts(_bad)}'\nassert alerts(dict(_ok, psi={'x': 0.25})) == [], 'PSI = 0.25 — still watch, not an alert'\nassert alerts(dict(_ok, auc=0.79)) == [], 'AUC ≥ 0.78 — normal'"
     }
    }
   ]
  }
 }
});
