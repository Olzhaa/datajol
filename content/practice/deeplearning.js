// Practice tasks after the lessons of m6-4, m6-6. Each lesson's list opens one task at a time.
DJ.addPractice('m6-4', {
 "dl-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Tanh функциясы",
   "prompt": "<p><code>tanh(z)</code> функциясын формула бойынша жазыңыз: <code>(e<sup>z</sup> − e<sup>−z</sup>) / (e<sup>z</sup> + e<sup>−z</sup>)</code>. Ол numpy массивімен жұмыс істесін. Мысалы, <code>tanh(np.array([0.0]))</code> → <code>[0.]</code>, ал <code>tanh(1.0)</code> ≈ 0.7616.</p>",
   "starter": "import numpy as np\ndef tanh(z):\n    pass\n",
   "solution": "import numpy as np\ndef tanh(z):\n    z = np.asarray(z, dtype=float)\n    return (np.exp(z) - np.exp(-z)) / (np.exp(z) + np.exp(-z))\n",
   "hints": [
    "<code>np.exp(z)</code> мен <code>np.exp(-z)</code> алыңыз",
    "Нәтижені <code>np.tanh</code>-пен салыстырып көріңіз"
   ],
   "check": {
    "tests": "import numpy as _np\n_z = _np.array([-2.0, 0.0, 0.5, 1.0])\nassert tanh(_z) is not None, 'tanh мән қайтаруы керек'\nassert _np.allclose(tanh(_z), _np.tanh(_z)), f'tanh([-2, 0, 0.5, 1]) ≈ {_np.tanh(_z).round(4)} болуы керек'\nassert abs(float(tanh(1.0)) - 0.7616) < 1e-4, 'tanh(1.0) ≈ 0.7616 болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Leaky ReLU",
   "prompt": "<p><code>leaky_relu(z, alpha=0.01)</code> жазыңыз: оң мәндер өзгермейді, ал теріс мәндер <code>alpha</code>-ға көбейтіледі. Мысалы, <code>leaky_relu(np.array([-10.0, 0.0, 3.0]))</code> → <code>[-0.1, 0., 3.]</code>.</p>",
   "starter": "import numpy as np\ndef leaky_relu(z, alpha=0.01):\n    pass\n",
   "solution": "import numpy as np\ndef leaky_relu(z, alpha=0.01):\n    z = np.asarray(z, dtype=float)\n    return np.where(z > 0, z, alpha * z)\n",
   "hints": [
    "<code>np.where(z > 0, z, alpha * z)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = leaky_relu(_np.array([-10.0, 0.0, 3.0]))\nassert _r is not None and _np.allclose(_r, [-0.1, 0.0, 3.0]), f'leaky_relu([-10, 0, 3]) = [-0.1, 0, 3] болуы керек, сізде {_r}'\nassert _np.allclose(leaky_relu(_np.array([-2.0, 5.0]), alpha=0.2), [-0.4, 5.0]), 'alpha параметрін қолданыңыз: -2 · 0.2 = -0.4'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нейронның сызықтық бөлігі",
   "prompt": "<p>Оқушының емтиханнан өту мүмкіндігін бағалайтын нейрон бар. Белгілер: дайындық сағаты және сабаққа қатысу үлесі. <code>linear_part(x, w, b)</code> функциясы <code>z = x @ w + b</code> мәнін қайтарсын. Сосын <code>x = [5, 0.8]</code>, <code>w = [0.3, 2.0]</code>, <code>b = -2.5</code> үшін <code>z</code> мен <code>prob = sigmoid(z)</code> есептеңіз (z = 0.6).</p>",
   "starter": "import numpy as np\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\ndef linear_part(x, w, b):\n    pass\n\nz = None\nprob = None\n",
   "solution": "import numpy as np\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\ndef linear_part(x, w, b):\n    return np.asarray(x, dtype=float) @ np.asarray(w, dtype=float) + b\n\nz = linear_part([5, 0.8], [0.3, 2.0], -2.5)\nprob = sigmoid(z)\nprint(z, prob)\n",
   "hints": [
    "<code>x @ w + b</code>",
    "Тізімді алдымен <code>np.asarray(x, dtype=float)</code> арқылы массивке айналдырыңыз"
   ],
   "check": {
    "tests": "import numpy as _np\nassert z is not None and abs(float(z) - 0.6) < 1e-9, f'z = 5·0.3 + 0.8·2.0 − 2.5 = 0.6 болуы керек, сізде {z}'\nassert prob is not None and abs(float(prob) - 0.6457) < 1e-3, f'prob = sigmoid(0.6) ≈ 0.646 болуы керек, сізде {prob}'\nassert abs(float(linear_part(_np.array([1.0, 1.0]), _np.array([2.0, 3.0]), 1.0)) - 6.0) < 1e-9, 'linear_part кез келген x, w, b үшін жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Клиенттер ықтималдығы",
   "prompt": "<p>Онлайн дүкен бір нейронмен бірнеше клиенттің сатып алу ықтималдығын бірден есептейді. <code>predict_proba(X, w, b)</code> — <code>(n, k)</code> матрица үшін <code>(n,)</code> ықтималдықтар қайтарсын. <code>predict(X, w, b, threshold=0.5)</code> — ықтималдық шектен кіші болмаса 1, әйтпесе 0 (int массив). Мысал: <code>X = [[3, 2], [1, 0], [5, 4]]</code>, <code>w = [0.4, 0.5]</code>, <code>b = -1.5</code> → <code>predict</code> = <code>[1, 0, 1]</code>.</p>",
   "starter": "import numpy as np\ndef predict_proba(X, w, b):\n    pass\n\ndef predict(X, w, b, threshold=0.5):\n    pass\n",
   "solution": "import numpy as np\ndef predict_proba(X, w, b):\n    z = np.asarray(X, dtype=float) @ np.asarray(w, dtype=float) + b\n    return 1 / (1 + np.exp(-z))\n\ndef predict(X, w, b, threshold=0.5):\n    return (predict_proba(X, w, b) >= threshold).astype(int)\n",
   "hints": [
    "<code>X @ w</code> әр жол үшін бір z береді",
    "<code>(p >= threshold).astype(int)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_X = _np.array([[3.0, 2.0], [1.0, 0.0], [5.0, 4.0]]); _w = _np.array([0.4, 0.5])\n_p = predict_proba(_X, _w, -1.5)\nassert _p is not None and _np.shape(_p) == (3,), f'predict_proba пішіні (3,) болуы керек, сізде {_np.shape(_p)}'\nassert _np.allclose(_p, 1 / (1 + _np.exp(-(_X @ _w - 1.5)))), 'predict_proba = sigmoid(X @ w + b)'\nassert list(predict(_X, _w, -1.5)) == [1, 0, 1], f'predict = [1, 0, 1] болуы керек, сізде {predict(_X, _w, -1.5)}'\nassert list(predict(_X, _w, -1.5, threshold=0.9)) == [0, 0, 1], 'threshold параметрін қолданыңыз: 0.9 шегінде тек үшінші клиент'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ауа райы кластары",
   "prompt": "<p>Модель әр қала үшін үш класқа (ашық, бұлтты, жаңбыр) logit береді: <code>Z</code> пішіні <code>(n, 3)</code>. <code>softmax_rows(Z)</code> жазыңыз: әр жолда softmax есептесін (әр жолдың қосындысы 1). Үлкен сандарда толып кетпеуі үшін әр жолдан сол жолдың максимумын алыңыз: <code>Z.max(axis=1, keepdims=True)</code>. Сосын <code>best_class(Z)</code> әр жол үшін ең ықтимал класс индексін қайтарсын.</p>",
   "starter": "import numpy as np\ndef softmax_rows(Z):\n    pass\n\ndef best_class(Z):\n    pass\n",
   "solution": "import numpy as np\ndef softmax_rows(Z):\n    Z = np.asarray(Z, dtype=float)\n    e = np.exp(Z - Z.max(axis=1, keepdims=True))\n    return e / e.sum(axis=1, keepdims=True)\n\ndef best_class(Z):\n    return np.argmax(softmax_rows(Z), axis=1)\n",
   "hints": [
    "<code>e / e.sum(axis=1, keepdims=True)</code>",
    "<code>np.argmax(..., axis=1)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_Z = _np.array([[2.0, 1.0, 0.1], [0.0, 0.0, 3.0], [1000.0, 1000.0, 0.0]])\n_P = softmax_rows(_Z)\nassert _P is not None and _np.shape(_P) == (3, 3), 'Нәтиже пішіні Z-пен бірдей болуы керек'\nassert _np.allclose(_P.sum(axis=1), 1), 'Әр жолдың қосындысы 1 болуы керек'\nassert _np.allclose(_P[0], [0.659, 0.242, 0.099], atol=1e-3), f'Бірінші жол ≈ [0.659, 0.242, 0.099], сізде {_P[0]}'\nassert _np.allclose(_P[2], [0.5, 0.5, 0.0]), 'Үлкен сандарда nan болмауы керек: әр жолдан максимумды алыңыз'\nassert list(best_class(_Z[:2])) == [0, 2], 'best_class = [0, 2] болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Activation-сыз екі қабат",
   "prompt": "<p>Activation болмаса, екі сызықтық қабат бір қабатқа тең: <code>(x @ W1) @ W2 = x @ (W1 @ W2)</code>. <code>collapse(W1, W2)</code> функциясы осы біріккен матрицаны қайтарсын. <code>two_layers(X, W1, W2)</code> — екі қабатты кезекпен қолданып, <code>X @ W1 @ W2</code> қайтарсын. Екеуінің нәтижесі бірдей болуы керек.</p>",
   "starter": "import numpy as np\ndef collapse(W1, W2):\n    pass\n\ndef two_layers(X, W1, W2):\n    pass\n",
   "solution": "import numpy as np\ndef collapse(W1, W2):\n    return np.asarray(W1) @ np.asarray(W2)\n\ndef two_layers(X, W1, W2):\n    H = np.asarray(X) @ np.asarray(W1)\n    return H @ np.asarray(W2)\n",
   "hints": [
    "<code>W1 @ W2</code> пішіні <code>(3, 2)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(5)\n_X = _r.normal(size=(4, 3)); _W1 = _r.normal(size=(3, 5)); _W2 = _r.normal(size=(5, 2))\n_W = collapse(_W1, _W2)\nassert _W is not None and _np.shape(_W) == (3, 2), f'collapse пішіні (3, 2) болуы керек, сізде {_np.shape(_W)}'\nassert _np.allclose(two_layers(_X, _W1, _W2), _X @ _W1 @ _W2), 'two_layers = X @ W1 @ W2'\nassert _np.allclose(_X @ _W, two_layers(_X, _W1, _W2)), 'X @ collapse(W1, W2) екі қабатқа тең болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Температуралы softmax",
   "prompt": "<p><code>softmax_t(z, T=1.0)</code> жазыңыз: logit-терді температураға бөліп (<code>z / T</code>), сосын тұрақты softmax есептейді. T кіші болса, ықтималдық ең үлкен класқа жиналады; T үлкен болса, бәрі теңеседі. <code>T &lt;= 0</code> болса <code>ValueError</code> тудырыңыз. Мысалы, <code>softmax_t(np.array([2.0, 1.0, 0.1]), 1.0)</code> ≈ <code>[0.659, 0.242, 0.099]</code>.</p>",
   "starter": "import numpy as np\ndef softmax_t(z, T=1.0):\n    pass\n",
   "solution": "import numpy as np\ndef softmax_t(z, T=1.0):\n    if T <= 0:\n        raise ValueError(\"T оң болуы керек\")\n    z = np.asarray(z, dtype=float) / T\n    e = np.exp(z - z.max())\n    return e / e.sum()\n",
   "hints": [
    "Алдымен <code>z / T</code>, сосын <code>z - z.max()</code>",
    "<code>if T &lt;= 0: raise ValueError(...)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_z = _np.array([2.0, 1.0, 0.1])\n_a = softmax_t(_z, 1.0)\nassert _a is not None and _np.allclose(_a, [0.659, 0.242, 0.099], atol=1e-3), f'T = 1 кезінде ≈ [0.659, 0.242, 0.099], сізде {_a}'\n_c = softmax_t(_z, 0.01)\nassert _np.isfinite(_c).all() and _c[0] > 0.999, 'T = 0.01 кезінде ықтималдық бірінші класқа жиналуы керек (nan болмауы керек)'\n_h = softmax_t(_z, 1000.0)\nassert _np.allclose(_h, 1 / 3, atol=1e-2), 'T үлкен болса, ықтималдықтар ≈ 1/3 болады'\ntry:\n    softmax_t(_z, 0)\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'T = 0 болса ValueError тудыру керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Activation таңдайтын қабат",
   "prompt": "<p><code>dense(X, W, b, act)</code> жазыңыз: <code>Z = X @ W + b</code>, сосын <code>act</code> бойынша activation: <code>\"sigmoid\"</code>, <code>\"tanh\"</code>, <code>\"relu\"</code>, <code>\"softmax\"</code> (әр жол бойынша, тұрақты) немесе <code>\"linear\"</code> (өзгеріссіз). Басқа атау келсе <code>ValueError</code>. Нәтиже пішіні <code>(n, W.shape[1])</code>.</p>",
   "starter": "import numpy as np\ndef dense(X, W, b, act):\n    pass\n",
   "solution": "import numpy as np\ndef dense(X, W, b, act):\n    Z = np.asarray(X, dtype=float) @ np.asarray(W, dtype=float) + b\n    if act == \"sigmoid\":\n        return 1 / (1 + np.exp(-Z))\n    if act == \"tanh\":\n        return np.tanh(Z)\n    if act == \"relu\":\n        return np.maximum(0, Z)\n    if act == \"softmax\":\n        e = np.exp(Z - Z.max(axis=1, keepdims=True))\n        return e / e.sum(axis=1, keepdims=True)\n    if act == \"linear\":\n        return Z\n    raise ValueError(\"белгісіз activation: \" + str(act))\n",
   "hints": [
    "Алдымен <code>Z</code>-ты есептеп, сосын <code>if act == ...</code> тармақтары",
    "Softmax үшін <code>axis=1, keepdims=True</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(2)\n_X = _r.normal(size=(4, 3)); _W = _r.normal(size=(3, 2)); _b = _np.array([0.5, -0.5])\n_Z = _X @ _W + _b\nassert _np.allclose(dense(_X, _W, _b, 'linear'), _Z), 'linear: Z = X @ W + b'\nassert _np.allclose(dense(_X, _W, _b, 'relu'), _np.maximum(0, _Z)), 'relu: np.maximum(0, Z)'\nassert _np.allclose(dense(_X, _W, _b, 'tanh'), _np.tanh(_Z)), 'tanh: np.tanh(Z)'\nassert _np.allclose(dense(_X, _W, _b, 'sigmoid'), 1 / (1 + _np.exp(-_Z))), 'sigmoid: 1 / (1 + exp(-Z))'\n_s = dense(_X, _W, _b, 'softmax')\nassert _np.shape(_s) == (4, 2) and _np.allclose(_s.sum(axis=1), 1), 'softmax әр жол бойынша: қосындысы 1'\ntry:\n    dense(_X, _W, _b, 'swish')\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'Белгісіз activation үшін ValueError керек'"
   }
  }
 ],
 "dl-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Матрицалар үйлесімі",
   "prompt": "<p><code>can_multiply(shape_a, shape_b)</code> жазыңыз: екі пішін (кортеж) берілген, <code>A @ B</code> орындала ма? Ереже: <code>(n, a) @ (a, b)</code> — ортадағы өлшемдер тең болуы керек. Мысалы, <code>can_multiply((5, 3), (3, 4))</code> → <code>True</code>, <code>can_multiply((5, 3), (4, 3))</code> → <code>False</code>.</p>",
   "starter": "def can_multiply(shape_a, shape_b):\n    pass\n",
   "solution": "def can_multiply(shape_a, shape_b):\n    return shape_a[1] == shape_b[0]\n",
   "hints": [
    "<code>shape_a[1] == shape_b[0]</code>"
   ],
   "check": {
    "tests": "assert can_multiply((5, 3), (3, 4)) is True, '(5, 3) @ (3, 4) мүмкін: True'\nassert can_multiply((5, 3), (4, 3)) is False, '(5, 3) @ (4, 3) мүмкін емес: False'\nassert can_multiply((1, 784), (784, 128)) is True, '(1, 784) @ (784, 128) мүмкін'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қабат пішіндері",
   "prompt": "<p><code>layer_shapes(n, layers)</code> жазыңыз: <code>n</code> мысал және қабат өлшемдері <code>layers</code> (мысалы <code>[3, 4, 1]</code>) берілген. Әр қабаттан кейінгі массив пішіндерінің тізімін қайтарсын, кірісті қоса: <code>layer_shapes(10, [3, 4, 1])</code> → <code>[(10, 3), (10, 4), (10, 1)]</code>.</p>",
   "starter": "def layer_shapes(n, layers):\n    pass\n",
   "solution": "def layer_shapes(n, layers):\n    return [(n, k) for k in layers]\n",
   "hints": [
    "Әр қабат пішіні <code>(n, k)</code>"
   ],
   "check": {
    "tests": "assert layer_shapes(10, [3, 4, 1]) == [(10, 3), (10, 4), (10, 1)], f'[(10, 3), (10, 4), (10, 1)] болуы керек, сізде {layer_shapes(10, [3, 4, 1])}'\nassert layer_shapes(1, [784, 128, 10]) == [(1, 784), (1, 128), (1, 10)], 'MNIST желісі үшін де жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жасырын қабат",
   "prompt": "<p><code>hidden(X, W1, b1)</code> жазыңыз: жасырын қабаттың шығысын ReLU-мен қайтарсын: <code>max(0, X @ W1 + b1)</code>. Сабақтағы мысал: <code>X = [[1, 0, 2]]</code> және берілген <code>W1</code> үшін нәтиже <code>[[0, 0, 0.7, 1]]</code>. <code>H = hidden(X, W1, b1)</code> есептеңіз.</p>",
   "starter": "import numpy as np\nX = np.array([[1.0, 0.0, 2.0]])\nW1 = np.array([[0.2, -0.5, 0.1, 0.0], [0.4, 0.3, 0.0, 0.1], [-0.1, 0.2, 0.3, 0.5]])\nb1 = np.zeros(4)\n\ndef hidden(X, W1, b1):\n    pass\n\nH = hidden(X, W1, b1)\nprint(H)\n",
   "solution": "import numpy as np\nX = np.array([[1.0, 0.0, 2.0]])\nW1 = np.array([[0.2, -0.5, 0.1, 0.0], [0.4, 0.3, 0.0, 0.1], [-0.1, 0.2, 0.3, 0.5]])\nb1 = np.zeros(4)\n\ndef hidden(X, W1, b1):\n    return np.maximum(0, X @ W1 + b1)\n\nH = hidden(X, W1, b1)\nprint(H)\n",
   "hints": [
    "<code>np.maximum(0, X @ W1 + b1)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert H is not None and _np.shape(H) == (1, 4), f'H пішіні (1, 4) болуы керек, сізде {_np.shape(H)}'\nassert _np.allclose(H, [[0, 0, 0.7, 1.0]]), f'H = [[0, 0, 0.7, 1]] болуы керек, сізде {H}'\nassert _np.allclose(hidden(X, W1, _np.ones(4)), _np.maximum(0, X @ W1 + 1)), 'b1-ді қосуды ұмытпаңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Кез келген тереңдік",
   "prompt": "<p><code>forward_deep(X, params)</code> жазыңыз: <code>params</code> — <code>(W, b)</code> жұптарының тізімі. Соңғысынан басқа барлық қабатта ReLU, соңғы қабатта sigmoid. Шығыс <code>(n, 1)</code> пішінінде болады. Бір қабат болса — тек sigmoid.</p>",
   "starter": "import numpy as np\ndef forward_deep(X, params):\n    pass\n",
   "solution": "import numpy as np\ndef forward_deep(X, params):\n    A = np.asarray(X, dtype=float)\n    for i, (W, b) in enumerate(params):\n        Z = A @ W + b\n        if i < len(params) - 1:\n            A = np.maximum(0, Z)\n        else:\n            A = 1 / (1 + np.exp(-Z))\n    return A\n",
   "hints": [
    "<code>for i, (W, b) in enumerate(params)</code>",
    "Соңғы қабатты <code>i == len(params) - 1</code> арқылы табыңыз"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(4)\n_X = _r.normal(size=(6, 3))\n_ps = [(_r.normal(size=(3, 5)), _r.normal(size=5)), (_r.normal(size=(5, 4)), _r.normal(size=4)), (_r.normal(size=(4, 1)), _r.normal(size=1))]\n_A = _X\nfor _W, _b in _ps[:-1]:\n    _A = _np.maximum(0, _A @ _W + _b)\n_ref = 1 / (1 + _np.exp(-(_A @ _ps[-1][0] + _ps[-1][1])))\n_out = forward_deep(_X, _ps)\nassert _out is not None and _np.shape(_out) == (6, 1), f'Шығыс пішіні (6, 1) болуы керек, сізде {_np.shape(_out)}'\nassert _np.allclose(_out, _ref), 'Жасырын қабаттарда ReLU, соңғысында sigmoid'\nassert _np.allclose(forward_deep(_X, [(_np.ones((3, 1)), _np.zeros(1))]), 1 / (1 + _np.exp(-_X.sum(axis=1, keepdims=True)))), 'Бір қабат болса — тек sigmoid'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Салмақтарды инициализациялау",
   "prompt": "<p><code>init_params(layers, seed=0)</code> жазыңыз: әр көрші жұп <code>(a, b)</code> үшін <code>W</code> — <code>np.random.default_rng(seed)</code> генераторынан <code>rng.normal(0, 0.1, (a, b))</code>, <code>b</code> — <code>np.zeros(b)</code>. <code>(W, b)</code> жұптарының тізімін қайтарсын. Бір seed әрқашан бірдей салмақ беруі керек.</p>",
   "starter": "import numpy as np\ndef init_params(layers, seed=0):\n    return []\n",
   "solution": "import numpy as np\ndef init_params(layers, seed=0):\n    rng = np.random.default_rng(seed)\n    params = []\n    for a, b in zip(layers[:-1], layers[1:]):\n        params.append((rng.normal(0, 0.1, (a, b)), np.zeros(b)))\n    return params\n",
   "hints": [
    "Генераторды цикл алдында бір рет жасаңыз",
    "<code>zip(layers[:-1], layers[1:])</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_p = init_params([3, 4, 1], seed=1)\nassert len(_p) == 2, f'[3, 4, 1] үшін 2 қабат болуы керек, сізде {len(_p)}'\nassert _p[0][0].shape == (3, 4) and _p[0][1].shape == (4,), 'Бірінші қабат: W (3, 4), b (4,)'\nassert _p[1][0].shape == (4, 1) and _p[1][1].shape == (1,), 'Екінші қабат: W (4, 1), b (1,)'\nassert sum(W.size + b.size for W, b in _p) == 21, 'Барлық параметр саны 21 болуы керек'\nassert _np.allclose(init_params([3, 4, 1], seed=1)[0][0], _p[0][0]), 'Бір seed бірдей салмақ беруі керек'\nassert not _np.allclose(init_params([3, 4, 1], seed=2)[0][0], _p[0][0]), 'Басқа seed басқа салмақ беруі керек'\nassert _np.all(_p[0][1] == 0) and 0 < _np.std(_p[0][0]) < 0.3, 'b нөлдер, W кішкентай кездейсоқ сандар'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Параметр бюджеті",
   "prompt": "<p>Телефонға орнатылатын модельде параметр саны шектеулі. <code>max_hidden(n_in, n_out, budget)</code> жазыңыз: <code>[n_in, h, n_out]</code> желісінің параметр саны <code>budget</code>-тен аспайтын ең үлкен <code>h</code> қайтарсын (бұл желіде <code>n_in·h + h + h·n_out + n_out</code> параметр). Ешбір <code>h ≥ 1</code> сыймаса — 0. Мысалы, <code>max_hidden(3, 1, 21)</code> → 4.</p>",
   "starter": "def max_hidden(n_in, n_out, budget):\n    pass\n",
   "solution": "def max_hidden(n_in, n_out, budget):\n    h = (budget - n_out) // (n_in + 1 + n_out)\n    return max(h, 0)\n",
   "hints": [
    "Параметр саны = <code>h·(n_in + 1 + n_out) + n_out</code>",
    "Бүтін бөлу <code>//</code> қолданыңыз"
   ],
   "check": {
    "tests": "assert max_hidden(3, 1, 21) == 4, f'max_hidden(3, 1, 21) = 4 болуы керек, сізде {max_hidden(3, 1, 21)}'\nassert max_hidden(3, 1, 25) == 4, '25 параметрге h = 5 сыймайды (26), сондықтан 4'\nassert max_hidden(784, 10, 101770) == 128, 'MNIST: 101 770 параметрге h = 128'\nassert max_hidden(10, 2, 5) == 0, 'Бюджет тым аз болса 0'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Көп класты MLP",
   "prompt": "<p>Kaspi-дегі тауарды үш санатқа жіктейтін MLP жазыңыз. <code>forward_multi(X, W1, b1, W2, b2)</code>: жасырын қабатта ReLU, шығыста әр жол бойынша тұрақты softmax; <code>(n, k)</code> ықтималдықтар қайтарсын. <code>predict_class(X, W1, b1, W2, b2)</code> әр мысалдың ең ықтимал класын (индексін) қайтарсын.</p>",
   "starter": "import numpy as np\ndef forward_multi(X, W1, b1, W2, b2):\n    pass\n\ndef predict_class(X, W1, b1, W2, b2):\n    pass\n",
   "solution": "import numpy as np\ndef forward_multi(X, W1, b1, W2, b2):\n    H = np.maximum(0, X @ W1 + b1)\n    Z = H @ W2 + b2\n    e = np.exp(Z - Z.max(axis=1, keepdims=True))\n    return e / e.sum(axis=1, keepdims=True)\n\ndef predict_class(X, W1, b1, W2, b2):\n    return np.argmax(forward_multi(X, W1, b1, W2, b2), axis=1)\n",
   "hints": [
    "Softmax үшін <code>Z - Z.max(axis=1, keepdims=True)</code>",
    "<code>np.argmax(P, axis=1)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(8)\n_X = _r.normal(size=(7, 4)); _W1 = _r.normal(size=(4, 6)); _b1 = _r.normal(size=6); _W2 = _r.normal(size=(6, 3)); _b2 = _r.normal(size=3)\n_Z = _np.maximum(0, _X @ _W1 + _b1) @ _W2 + _b2\n_E = _np.exp(_Z - _Z.max(axis=1, keepdims=True)); _P = _E / _E.sum(axis=1, keepdims=True)\n_out = forward_multi(_X, _W1, _b1, _W2, _b2)\nassert _out is not None and _np.shape(_out) == (7, 3), f'Шығыс пішіні (7, 3) болуы керек, сізде {_np.shape(_out)}'\nassert _np.allclose(_out.sum(axis=1), 1), 'Әр жолдың қосындысы 1 болуы керек'\nassert _np.allclose(_out, _P), 'Жасырын қабатта ReLU, шығыста softmax'\nassert list(predict_class(_X, _W1, _b1, _W2, _b2)) == list(_P.argmax(axis=1)), 'predict_class = argmax(axis=1)'\n_big = forward_multi(_X, _W1, _b1, _W2 * 1000, _b2)\nassert _np.isfinite(_big).all(), 'Үлкен logit-терде nan болмауы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Пішін қатесін табу",
   "prompt": "<p><code>find_shape_error(n_features, params)</code> жазыңыз: <code>params</code> — <code>(W, b)</code> жұптарының тізімі. Кіріс <code>n_features</code> белгіден басталады. Бірінші қате қабаттың индексін (0-ден) қайтарсын, бәрі дұрыс болса <code>None</code>. Қабат қате: <code>W.shape[0]</code> алдыңғы шығыс өлшеміне тең емес, немесе <code>b.shape</code> ≠ <code>(W.shape[1],)</code>.</p>",
   "starter": "import numpy as np\ndef find_shape_error(n_features, params):\n    pass\n",
   "solution": "import numpy as np\ndef find_shape_error(n_features, params):\n    size = n_features\n    for i, (W, b) in enumerate(params):\n        if W.shape[0] != size or b.shape != (W.shape[1],):\n            return i\n        size = W.shape[1]\n    return None\n",
   "hints": [
    "Ағымдағы өлшемді <code>size</code> айнымалысында сақтаңыз",
    "Әр қабаттан кейін <code>size = W.shape[1]</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_ok = [(_np.zeros((3, 4)), _np.zeros(4)), (_np.zeros((4, 1)), _np.zeros(1))]\nassert find_shape_error(3, _ok) is None, 'Дұрыс желі үшін None'\nassert find_shape_error(5, _ok) == 0, 'Кіріс 5 белгі, ал W1 3 күтеді: 0-қабат'\n_bad = [(_np.zeros((3, 4)), _np.zeros(4)), (_np.zeros((5, 1)), _np.zeros(1))]\nassert find_shape_error(3, _bad) == 1, 'W2.shape[0] = 5, бірақ алдыңғы шығыс 4: 1-қабат'\n_badb = [(_np.zeros((3, 4)), _np.zeros(3)), (_np.zeros((4, 1)), _np.zeros(1))]\nassert find_shape_error(3, _badb) == 0, 'b1 пішіні (4,) болуы керек еді: 0-қабат'\nassert find_shape_error(2, []) is None, 'Бос тізім үшін None'"
   }
  }
 ],
 "dl-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір абоненттің loss-ы",
   "prompt": "<p><code>bce_one(y, p)</code> жазыңыз: бір мысалдың binary cross-entropy мәні. <code>y = 1</code> болса <code>−log(p)</code>, <code>y = 0</code> болса <code>−log(1 − p)</code>. Мысалы, <code>bce_one(1, 0.9)</code> ≈ 0.105, <code>bce_one(1, 0.1)</code> ≈ 2.303.</p>",
   "starter": "import numpy as np\ndef bce_one(y, p):\n    pass\n",
   "solution": "import numpy as np\ndef bce_one(y, p):\n    return float(-np.log(p)) if y == 1 else float(-np.log(1 - p))\n",
   "hints": [
    "<code>np.log(p)</code> және <code>np.log(1 - p)</code>"
   ],
   "check": {
    "tests": "assert bce_one(1, 0.9) is not None and abs(bce_one(1, 0.9) - 0.1054) < 1e-3, 'bce_one(1, 0.9) ≈ 0.105'\nassert abs(bce_one(1, 0.1) - 2.3026) < 1e-3, 'bce_one(1, 0.1) ≈ 2.303'\nassert abs(bce_one(0, 0.3) - 0.3567) < 1e-3, 'bce_one(0, 0.3) = −log(0.7) ≈ 0.357'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пәтер бағасының RMSE",
   "prompt": "<p>Алматыдағы пәтер бағасын (млн ₸) болжайтын модельді бағалаймыз. <code>rmse(y, pred)</code> жазыңыз: MSE-дің квадрат түбірі, <code>sqrt(mean((y − pred)²))</code>. Мысалы, <code>rmse([30, 45], [33, 41])</code> = √12.5 ≈ 3.536.</p>",
   "starter": "import numpy as np\ndef rmse(y, pred):\n    pass\n",
   "solution": "import numpy as np\ndef rmse(y, pred):\n    y, pred = np.asarray(y, dtype=float), np.asarray(pred, dtype=float)\n    return float(np.sqrt(np.mean((y - pred) ** 2)))\n",
   "hints": [
    "<code>np.sqrt(np.mean((y - pred) ** 2))</code>"
   ],
   "check": {
    "tests": "assert rmse([30, 45], [33, 41]) is not None and abs(rmse([30, 45], [33, 41]) - 3.5355) < 1e-3, 'rmse([30, 45], [33, 41]) ≈ 3.536'\nassert rmse([1, 2, 3], [1, 2, 3]) == 0, 'Қате жоқ болса 0'\nassert abs(rmse([0, 0], [3, 4]) - 3.5355) < 1e-3, 'Тізімдермен де жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Accuracy есептеу",
   "prompt": "<p>Loss-пен қатар бизнеске accuracy көрсетеміз. <code>accuracy(y, p, threshold=0.5)</code> жазыңыз: ықтималдық шектен кіші болмаса 1 деп болжап, дұрыс болжамдардың үлесін қайтарсын. Мысалы, <code>accuracy([1, 0, 1], [0.8, 0.3, 0.4])</code> → 0.667.</p>",
   "starter": "import numpy as np\ndef accuracy(y, p, threshold=0.5):\n    pass\n",
   "solution": "import numpy as np\ndef accuracy(y, p, threshold=0.5):\n    pred = (np.asarray(p) >= threshold).astype(int)\n    return float(np.mean(pred == np.asarray(y)))\n",
   "hints": [
    "<code>(p >= threshold).astype(int)</code>",
    "<code>np.mean(pred == y)</code>"
   ],
   "check": {
    "tests": "assert accuracy([1, 0, 1], [0.8, 0.3, 0.4]) is not None and abs(accuracy([1, 0, 1], [0.8, 0.3, 0.4]) - 2 / 3) < 1e-9, 'accuracy([1, 0, 1], [0.8, 0.3, 0.4]) = 2/3'\nassert accuracy([1, 0, 1], [0.8, 0.3, 0.4], threshold=0.3) == 2 / 3, 'threshold = 0.3: [1, 1, 1] болжам, 2/3 дұрыс'\nassert accuracy([1, 1], [0.51, 0.99]) == 1.0, '0.51 мен 0.99 accuracy үшін бірдей «дұрыс»'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Көп класты cross-entropy",
   "prompt": "<p>Суреттегі жануарды (мысық, ит, құс) танитын модель. <code>y</code> — дұрыс класс индекстері, <code>P</code> — <code>(n, 3)</code> ықтималдықтар. <code>cross_entropy(y, P)</code> = <code>−mean(log(P[i, y_i]))</code>. <code>P</code>-ны <code>np.clip(P, 1e-7, 1)</code> арқылы шектеңіз. Мысалы, <code>y = [0, 2]</code>, <code>P = [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]]</code> → ≈ 0.434.</p>",
   "starter": "import numpy as np\ndef cross_entropy(y, P):\n    pass\n",
   "solution": "import numpy as np\ndef cross_entropy(y, P):\n    P = np.clip(np.asarray(P, dtype=float), 1e-7, 1)\n    y = np.asarray(y)\n    return float(-np.mean(np.log(P[np.arange(len(y)), y])))\n",
   "hints": [
    "<code>P[np.arange(len(y)), y]</code> әр жолдан дұрыс класс ықтималдығын алады"
   ],
   "check": {
    "tests": "import numpy as _np\n_v = cross_entropy([0, 2], [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]])\nassert _v is not None and abs(_v - 0.4338) < 1e-3, f'≈ 0.434 болуы керек, сізде {_v}'\nassert cross_entropy([1], [[0.0, 1.0, 0.0]]) < 1e-6, 'Дұрыс класқа 1 берсе, loss ≈ 0'\nassert _np.isfinite(cross_entropy([0], [[0.0, 1.0, 0.0]])), 'P = 0 болғанда inf болмауы керек: np.clip'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "One-hot және loss",
   "prompt": "<p><code>one_hot(y, k)</code> жазыңыз: класс индекстерін <code>(n, k)</code> матрицаға айналдырсын (дұрыс класта 1, қалғанында 0). Сосын <code>ce_onehot(Y, P)</code> = <code>−mean(sum(Y · log P, axis=1))</code>, <code>P</code>-ны <code>1e-7</code>-ден төмен түсірмей шектеңіз. Мысалы, <code>one_hot([2, 0], 3)</code> → <code>[[0, 0, 1], [1, 0, 0]]</code>.</p>",
   "starter": "import numpy as np\ndef one_hot(y, k):\n    pass\n\ndef ce_onehot(Y, P):\n    pass\n",
   "solution": "import numpy as np\ndef one_hot(y, k):\n    y = np.asarray(y)\n    Y = np.zeros((len(y), k))\n    Y[np.arange(len(y)), y] = 1\n    return Y\n\ndef ce_onehot(Y, P):\n    P = np.clip(np.asarray(P, dtype=float), 1e-7, 1)\n    return float(-np.mean(np.sum(Y * np.log(P), axis=1)))\n",
   "hints": [
    "<code>Y[np.arange(n), y] = 1</code>",
    "<code>np.sum(Y * np.log(P), axis=1)</code> әр жолға бір сан береді"
   ],
   "check": {
    "tests": "import numpy as _np\nassert one_hot([2, 0], 3) is not None and _np.array_equal(one_hot([2, 0], 3), [[0, 0, 1], [1, 0, 0]]), 'one_hot([2, 0], 3) = [[0, 0, 1], [1, 0, 0]]'\nassert _np.shape(one_hot([0, 1, 1, 3], 4)) == (4, 4), 'Пішіні (n, k)'\n_P = _np.array([[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]])\nassert abs(ce_onehot(one_hot([0, 2], 3), _P) - 0.4338) < 1e-3, 'ce_onehot ≈ 0.434 болуы керек'\nassert _np.isfinite(ce_onehot(one_hot([0], 2), _np.array([[0.0, 1.0]]))), 'P = 0 болса inf болмауы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең қате болжам",
   "prompt": "<p>Деректегі ең «сенімді қате» мысалды табыңыз. <code>worst_example(y, p)</code> әр мысалдың BCE мәнін есептеп, ең үлкенінің индексін қайтарсын (<code>p</code>-ны <code>np.clip(p, 1e-7, 1 - 1e-7)</code> арқылы шектеңіз). Мысалы, <code>y = [1, 0, 1, 0]</code>, <code>p = [0.9, 0.2, 0.3, 0.95]</code> → 3.</p>",
   "starter": "import numpy as np\ndef worst_example(y, p):\n    pass\n",
   "solution": "import numpy as np\ndef worst_example(y, p):\n    y = np.asarray(y)\n    p = np.clip(np.asarray(p, dtype=float), 1e-7, 1 - 1e-7)\n    losses = -(y * np.log(p) + (1 - y) * np.log(1 - p))\n    return int(np.argmax(losses))\n",
   "hints": [
    "Әр мысалдың loss-ын <code>mean</code>-сыз есептеңіз",
    "<code>np.argmax(losses)</code>"
   ],
   "check": {
    "tests": "assert worst_example([1, 0, 1, 0], [0.9, 0.2, 0.3, 0.95]) == 3, '4-мысал: y = 0, бірақ p = 0.95 — ең үлкен loss, индекс 3'\nassert worst_example([1, 1, 1], [0.5, 0.01, 0.7]) == 1, 'y = 1, p = 0.01: индекс 1'\nassert worst_example([0, 1], [1.0, 1.0]) == 0, 'p = 1 болса да жұмыс істеуі керек (np.clip)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Logit-тен тұрақты BCE",
   "prompt": "<p>PyTorch-тағы <code>BCEWithLogitsLoss</code> сияқты <code>bce_logits(y, z)</code> жазыңыз: кіріс — sigmoid-қа дейінгі logit <code>z</code>. Тұрақты формула: <code>mean(max(z, 0) − z·y + log(1 + e<sup>−|z|</sup>))</code>. Ол <code>bce(y, sigmoid(z))</code>-ға тең, бірақ <code>z = 1000</code> болса да inf/nan бермейді. Мысалы, <code>bce_logits([1, 0], [2.0, -1.0])</code> ≈ 0.2201.</p>",
   "starter": "import numpy as np\ndef bce_logits(y, z):\n    pass\n",
   "solution": "import numpy as np\ndef bce_logits(y, z):\n    y, z = np.asarray(y, dtype=float), np.asarray(z, dtype=float)\n    return float(np.mean(np.maximum(z, 0) - z * y + np.log1p(np.exp(-np.abs(z)))))\n",
   "hints": [
    "<code>np.maximum(z, 0)</code>, <code>np.abs(z)</code>",
    "<code>np.log1p(x)</code> = <code>log(1 + x)</code>, дәлірек"
   ],
   "check": {
    "tests": "import numpy as _np\n_v = bce_logits([1, 0], [2.0, -1.0])\nassert _v is not None and abs(_v - 0.2201) < 1e-3, f'≈ 0.2201 болуы керек, сізде {_v}'\n_r = _np.random.default_rng(0); _y = _r.integers(0, 2, 20); _z = _r.normal(0, 3, 20)\n_p = 1 / (1 + _np.exp(-_z))\nassert abs(bce_logits(_y, _z) - (-_np.mean(_y * _np.log(_p) + (1 - _y) * _np.log(1 - _p)))) < 1e-9, 'Нәтиже bce(y, sigmoid(z))-ға тең болуы керек'\n_big = bce_logits([0, 1], [1000.0, -1000.0])\nassert _np.isfinite(_big) and abs(_big - 1000) < 1e-6, 'z = ±1000 болса да ақырлы сан: 1000'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тапсырмаға сай loss",
   "prompt": "<p><code>task_loss(task, y, out)</code> жазыңыз: <code>\"regression\"</code> → MSE(<code>y</code>, <code>out</code>); <code>\"binary\"</code> → BCE, <code>out</code> — ықтималдықтар; <code>\"multiclass\"</code> → cross-entropy, <code>y</code> — класс индекстері, <code>out</code> — <code>(n, k)</code> ықтималдықтар. Ықтималдықтарды <code>1e-7</code>-мен шектеңіз. Басқа тапсырма атауы келсе <code>ValueError</code>.</p>",
   "starter": "import numpy as np\ndef task_loss(task, y, out):\n    pass\n",
   "solution": "import numpy as np\ndef task_loss(task, y, out):\n    y, out = np.asarray(y), np.asarray(out, dtype=float)\n    if task == \"regression\":\n        return float(np.mean((y - out) ** 2))\n    if task == \"binary\":\n        p = np.clip(out, 1e-7, 1 - 1e-7)\n        return float(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p)))\n    if task == \"multiclass\":\n        P = np.clip(out, 1e-7, 1)\n        return float(-np.mean(np.log(P[np.arange(len(y)), y])))\n    raise ValueError(\"белгісіз тапсырма: \" + str(task))\n",
   "hints": [
    "Үш тармақ: <code>if task == \"regression\"</code> ...",
    "Соңында <code>raise ValueError(...)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert task_loss('regression', [1.0, 2.0], [2.0, 4.0]) is not None and abs(task_loss('regression', [1.0, 2.0], [2.0, 4.0]) - 2.5) < 1e-9, 'regression: MSE = 2.5'\nassert abs(task_loss('binary', [1, 0, 1], [0.8, 0.3, 0.6]) - 0.3635) < 1e-3, 'binary: BCE ≈ 0.364'\nassert abs(task_loss('multiclass', [0, 2], [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]]) - 0.4338) < 1e-3, 'multiclass: CE ≈ 0.434'\nassert _np.isfinite(task_loss('binary', [1, 0], [0.0, 1.0])), 'binary: p = 0 немесе 1 болса inf болмауы керек'\ntry:\n    task_loss('ranking', [1], [1])\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'Белгісіз тапсырма үшін ValueError'"
   }
  }
 ],
 "dl-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір gradient қадамы",
   "prompt": "<p><code>gd_step(w, grad, lr)</code> жазыңыз: gradient descent ережесі бойынша жаңа салмақты қайтарсын: <code>w − lr · grad</code>. Мысалы, <code>gd_step(np.array([0.5, -1.0]), np.array([2.0, -4.0]), 0.1)</code> → <code>[0.3, -0.6]</code>.</p>",
   "starter": "import numpy as np\ndef gd_step(w, grad, lr):\n    pass\n",
   "solution": "import numpy as np\ndef gd_step(w, grad, lr):\n    return np.asarray(w, dtype=float) - lr * np.asarray(grad, dtype=float)\n",
   "hints": [
    "Минус таңбасын ұмытпаңыз: градиентке <b>қарсы</b> жылжимыз"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = gd_step(_np.array([0.5, -1.0]), _np.array([2.0, -4.0]), 0.1)\nassert _r is not None and _np.allclose(_r, [0.3, -0.6]), f'[0.3, -0.6] болуы керек, сізде {_r}'\nassert _np.allclose(gd_step(_np.array([1.0]), _np.array([1.0]), 0.5), [0.5]), 'Градиентке қарсы бағытта жылжу: 1 − 0.5·1 = 0.5'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Sigmoid туындысы",
   "prompt": "<p><code>sigmoid_grad(z)</code> жазыңыз: sigmoid туындысы <code>p · (1 − p)</code>, мұндағы <code>p = sigmoid(z)</code>. Мысалы, <code>sigmoid_grad(0.0)</code> = 0.25 — бұл ең үлкен мәні.</p>",
   "starter": "import numpy as np\ndef sigmoid_grad(z):\n    pass\n",
   "solution": "import numpy as np\ndef sigmoid_grad(z):\n    p = 1 / (1 + np.exp(-np.asarray(z, dtype=float)))\n    return p * (1 - p)\n",
   "hints": [
    "Алдымен <code>p = 1 / (1 + np.exp(-z))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert sigmoid_grad(0.0) is not None and abs(float(sigmoid_grad(0.0)) - 0.25) < 1e-12, 'sigmoid_grad(0) = 0.25'\n_z = _np.array([-3.0, 1.0, 4.0]); _p = 1 / (1 + _np.exp(-_z))\nassert _np.allclose(sigmoid_grad(_z), _p * (1 - _p)), 'sigmoid_grad = p · (1 − p)'\nassert float(sigmoid_grad(10.0)) < 1e-4, 'Үлкен z-та туынды нөлге жақын'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "ReLU туындысы",
   "prompt": "<p><code>relu_grad(z)</code> жазыңыз: <code>z &gt; 0</code> болса 1.0, әйтпесе 0.0 (float массив). Мысалы, <code>relu_grad(np.array([-2.0, 0.0, 3.0]))</code> → <code>[0., 0., 1.]</code>.</p>",
   "starter": "import numpy as np\ndef relu_grad(z):\n    pass\n",
   "solution": "import numpy as np\ndef relu_grad(z):\n    return (np.asarray(z) > 0).astype(float)\n",
   "hints": [
    "<code>(z > 0).astype(float)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = relu_grad(_np.array([-2.0, 0.0, 3.0]))\nassert _r is not None and _np.array_equal(_r, [0.0, 0.0, 1.0]), f'[0, 0, 1] болуы керек, сізде {_r}'\nassert _r.dtype.kind == 'f', 'Нәтиже float массив болуы керек: .astype(float)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Парабола минимумы",
   "prompt": "<p><code>loss(w) = (w − 3)²</code>, туындысы <code>2(w − 3)</code>. <code>gd_parabola(w0, lr, steps)</code> жазыңыз: <code>w0</code>-ден бастап <code>steps</code> рет gradient descent қадамын жасап, соңғы <code>w</code>-ны қайтарсын. <code>lr = 0.1</code>, 100 қадамда <code>w ≈ 3</code>; ал <code>lr = 1.1</code> тым үлкен — <code>w</code> алыстап кетеді.</p>",
   "starter": "def gd_parabola(w0, lr, steps):\n    pass\n",
   "solution": "def gd_parabola(w0, lr, steps):\n    w = w0\n    for _ in range(steps):\n        w = w - lr * 2 * (w - 3)\n    return w\n",
   "hints": [
    "Әр қадамда <code>w = w - lr * 2 * (w - 3)</code>"
   ],
   "check": {
    "tests": "_w = gd_parabola(0.0, 0.1, 100)\nassert _w is not None and abs(_w - 3) < 1e-6, f'lr = 0.1, 100 қадам: w ≈ 3 болуы керек, сізде {_w}'\nassert abs(gd_parabola(10.0, 0.1, 1) - 8.6) < 1e-9, 'Бір қадам: 10 − 0.1·2·7 = 8.6'\nassert abs(gd_parabola(0.0, 1.1, 30) - 3) > 100, 'lr = 1.1 кезінде w алыстап кетуі керек (секіріп өседі)'\nassert abs(gd_parabola(0.0, 0.001, 10) - 3) > 2.5, 'lr тым кіші болса, 10 қадамда минимумға жетпейміз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "MSE градиенті",
   "prompt": "<p>Сызықтық регрессия <code>pred = X @ w + b</code>, loss = <code>mean((pred − y)²)</code>. <code>mse_grad(X, y, w, b)</code> жазыңыз: <code>(dw, db)</code> қайтарсын, мұндағы <code>dw = 2/n · X.T @ (pred − y)</code>, <code>db = 2 · mean(pred − y)</code>. Тексеруші нәтижені сандық градиентпен салыстырады.</p>",
   "starter": "import numpy as np\ndef mse_grad(X, y, w, b):\n    return np.zeros_like(w), 0.0\n",
   "solution": "import numpy as np\ndef mse_grad(X, y, w, b):\n    err = X @ w + b - y\n    n = len(y)\n    return 2 / n * X.T @ err, 2 * float(err.mean())\n",
   "hints": [
    "<code>err = X @ w + b - y</code>",
    "n-ге бөлуді ұмытпаңыз"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(3)\n_X = _r.normal(size=(8, 2)); _y = _r.normal(size=8); _w = _np.array([0.5, -0.3]); _b = 0.2\n_dw, _db = mse_grad(_X, _y, _w, _b)\ndef _L(w, b):\n    return _np.mean((_X @ w + b - _y) ** 2)\n_e = 1e-6\n_nw = _np.array([(_L(_w + _e * _np.eye(2)[i], _b) - _L(_w - _e * _np.eye(2)[i], _b)) / (2 * _e) for i in range(2)])\n_nb = (_L(_w, _b + _e) - _L(_w, _b - _e)) / (2 * _e)\nassert _np.allclose(_dw, _nw, atol=1e-5), f'dw сандық градиентпен сәйкес келмейді: {_dw} және {_nw}'\nassert abs(_db - _nb) < 1e-5, f'db сандық градиентпен сәйкес келмейді: {_db} және {_nb}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Tanh туындысын тексеру",
   "prompt": "<p>Бір айнымалы функцияның сандық туындысын есептеңіз: <code>num_deriv(f, x, eps=1e-5)</code> = <code>(f(x + eps) − f(x − eps)) / (2·eps)</code>. Сосын <code>tanh_grad(x)</code> = <code>1 − tanh(x)²</code> жазыңыз. Екеуі <code>x = 0.5</code> нүктесінде сәйкес келуі керек: <code>gap = abs(num_deriv(np.tanh, 0.5) − tanh_grad(0.5))</code>.</p>",
   "starter": "import numpy as np\ndef num_deriv(f, x, eps=1e-5):\n    pass\n\ndef tanh_grad(x):\n    pass\n\ngap = None\n",
   "solution": "import numpy as np\ndef num_deriv(f, x, eps=1e-5):\n    return (f(x + eps) - f(x - eps)) / (2 * eps)\n\ndef tanh_grad(x):\n    return 1 - np.tanh(x) ** 2\n\ngap = abs(num_deriv(np.tanh, 0.5) - tanh_grad(0.5))\nprint(gap)\n",
   "hints": [
    "Орталық айырма: <code>(f(x + eps) - f(x - eps)) / (2 * eps)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert abs(tanh_grad(0.0) - 1.0) < 1e-12, 'tanh_grad(0) = 1'\nassert abs(tanh_grad(0.5) - 0.7864) < 1e-4, 'tanh_grad(0.5) ≈ 0.786'\nassert abs(num_deriv(lambda v: v ** 3, 2.0) - 12.0) < 1e-4, 'num_deriv кез келген f үшін: x³ туындысы 3x² = 12'\nassert gap is not None and gap < 1e-8, f'gap өте кішкентай болуы керек, сізде {gap}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Logistic regression үйрету",
   "prompt": "<p><code>train_logreg(X, y, lr=0.5, epochs=500)</code> жазыңыз: <code>w</code> нөлдерден, <code>b = 0</code>-ден бастап, әр эпохада sigmoid нейронның градиентімен (<code>dz = (p − y) / n</code>, <code>dw = X.T @ dz</code>, <code>db = dz.sum()</code>) жаңартсын. Әр эпоханың BCE-ін <code>losses</code> тізіміне жинап, <code>(w, b, losses)</code> қайтарсын. Деректе: оқушының дайындық сағаты (стандартталған) мен емтихан нәтижесі.</p>",
   "starter": "import numpy as np\nX = np.array([[-1.5], [-1.0], [-0.5], [0.0], [0.5], [1.0], [1.5], [2.0]])\ny = np.array([0, 0, 0, 1, 0, 1, 1, 1])\n\ndef train_logreg(X, y, lr=0.5, epochs=500):\n    w = np.zeros(X.shape[1])\n    b = 0.0\n    losses = []\n    return w, b, losses\n\nw, b, losses = train_logreg(X, y)\nprint(losses[:1], losses[-1:])\n",
   "solution": "import numpy as np\nX = np.array([[-1.5], [-1.0], [-0.5], [0.0], [0.5], [1.0], [1.5], [2.0]])\ny = np.array([0, 0, 0, 1, 0, 1, 1, 1])\n\ndef train_logreg(X, y, lr=0.5, epochs=500):\n    w = np.zeros(X.shape[1])\n    b = 0.0\n    losses = []\n    n = len(y)\n    for _ in range(epochs):\n        p = 1 / (1 + np.exp(-(X @ w + b)))\n        losses.append(float(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))))\n        dz = (p - y) / n\n        w = w - lr * (X.T @ dz)\n        b = b - lr * dz.sum()\n    return w, b, losses\n\nw, b, losses = train_logreg(X, y)\nprint(losses[0], losses[-1])\n",
   "hints": [
    "Loss-ты жаңартудан бұрын есептеп, тізімге қосыңыз",
    "<code>dz = (p - y) / n</code>, <code>w -= lr * X.T @ dz</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert len(losses) == 500, f'losses ұзындығы 500 болуы керек, сізде {len(losses)}'\nassert abs(losses[0] - _np.log(2)) < 1e-6, 'Бастапқы loss = log 2 ≈ 0.693 (w = 0, b = 0)'\nassert losses[-1] < 0.4, f'Соңғы loss 0.4-тен аз болуы керек, сізде {losses[-1]:.3f}'\nassert all(a >= b2 - 1e-12 for a, b2 in zip(losses, losses[1:])), 'Loss әр эпохада азаюы керек'\nassert w[0] > 0, 'Дайындық сағаты көп болса, өту ықтималдығы жоғары: w > 0'\n_p = 1 / (1 + _np.exp(-(X @ w + b)))\nassert ((_p >= 0.5).astype(int) == y).mean() >= 0.75, 'Train accuracy кемінде 0.75 болуы керек (8 оқушының 6-ы)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Градиентті автоматты тексеру",
   "prompt": "<p><code>grad_check(f, grad_f, w, eps=1e-5, tol=1e-6)</code> жазыңыз: <code>w</code>-ның әр элементі бойынша орталық айырмамен сандық градиент есептеп, оны аналитикалық <code>grad_f(w)</code>-мен салыстырсын. Ең үлкен абсолют айырма <code>tol</code>-дан кіші болса <code>True</code>, әйтпесе <code>False</code>. Тексеруші дұрыс және әдейі қате (n-ге бөлінбеген) градиентті береді.</p>",
   "starter": "import numpy as np\ndef grad_check(f, grad_f, w, eps=1e-5, tol=1e-6):\n    return True\n",
   "solution": "import numpy as np\ndef grad_check(f, grad_f, w, eps=1e-5, tol=1e-6):\n    w = np.asarray(w, dtype=float)\n    num = np.zeros_like(w)\n    for i in range(len(w)):\n        e = np.zeros_like(w)\n        e[i] = eps\n        num[i] = (f(w + e) - f(w - e)) / (2 * eps)\n    return bool(np.max(np.abs(num - grad_f(w))) < tol)\n",
   "hints": [
    "Әр элемент үшін <code>e = np.zeros_like(w); e[i] = eps</code>",
    "<code>bool(np.max(np.abs(num - grad_f(w))) < tol)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_X = _np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]]); _y = _np.array([1, 0, 1, 0])\ndef _f(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return -_np.mean(_y * _np.log(p) + (1 - _y) * _np.log(1 - p))\ndef _good(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return _X.T @ ((p - _y) / len(_X))\ndef _bad(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return _X.T @ (p - _y)\n_w = _np.array([0.3, -0.2])\nassert grad_check(_f, _good, _w) is True, 'Дұрыс градиент үшін True болуы керек'\nassert grad_check(_f, _bad, _w) is False, 'n-ге бөлінбеген градиент үшін False болуы керек'\nassert grad_check(lambda v: (v ** 2).sum(), lambda v: 2 * v, _np.array([1.0, -2.0, 0.5])) is True, 'x² үшін 2x градиенті дұрыс'\nassert grad_check(lambda v: (v ** 2).sum(), lambda v: v, _np.array([1.0, -2.0, 0.5])) is False, 'x² үшін x градиенті қате'"
   }
  }
 ],
 "dl-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "XOR белгілері",
   "prompt": "<p><code>xor_labels(X)</code> жазыңыз: әр жолда екі бинар кіріс бар, кірістер әртүрлі болса 1, бірдей болса 0. Нәтиже <code>(n, 1)</code> пішінді float массив. <code>X = [[0,0],[0,1],[1,0],[1,1]]</code> үшін → <code>[[0],[1],[1],[0]]</code>.</p>",
   "starter": "import numpy as np\ndef xor_labels(X):\n    pass\n",
   "solution": "import numpy as np\ndef xor_labels(X):\n    X = np.asarray(X)\n    return (X[:, 0] != X[:, 1]).astype(float).reshape(-1, 1)\n",
   "hints": [
    "<code>X[:, 0] != X[:, 1]</code>",
    "<code>.reshape(-1, 1)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_y = xor_labels(_np.array([[0, 0], [0, 1], [1, 0], [1, 1]]))\nassert _y is not None and _np.shape(_y) == (4, 1), f'Пішіні (4, 1) болуы керек, сізде {_np.shape(_y)}'\nassert _np.array_equal(_y.ravel(), [0, 1, 1, 0]), f'[0, 1, 1, 0] болуы керек, сізде {_y.ravel()}'\nassert _np.array_equal(xor_labels(_np.array([[1, 1], [1, 0]])).ravel(), [0, 1]), 'Кез келген X үшін жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жасырын қабат градиенті",
   "prompt": "<p>Backward-та градиент tanh қабатынан өткенде оның туындысына көбейтіледі. <code>tanh_backward(dh, h)</code> жазыңыз: <code>dz1 = dh · (1 − h²)</code>, мұндағы <code>h</code> — tanh шығысы. Мысалы, <code>dh = [[1.0, 2.0]]</code>, <code>h = [[0.0, 0.5]]</code> → <code>[[1.0, 1.5]]</code>.</p>",
   "starter": "import numpy as np\ndef tanh_backward(dh, h):\n    pass\n",
   "solution": "import numpy as np\ndef tanh_backward(dh, h):\n    return dh * (1 - h ** 2)\n",
   "hints": [
    "<code>dh * (1 - h ** 2)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = tanh_backward(_np.array([[1.0, 2.0]]), _np.array([[0.0, 0.5]]))\nassert _r is not None and _np.allclose(_r, [[1.0, 1.5]]), f'[[1.0, 1.5]] болуы керек, сізде {_r}'\nassert _np.allclose(tanh_backward(_np.ones((2, 2)), _np.full((2, 2), 0.9)), 0.19), '1 · (1 − 0.81) = 0.19'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ықтималдықтан жауап",
   "prompt": "<p><code>to_labels(p, threshold=0.5)</code> жазыңыз: желі шығысын (<code>(n, 1)</code> ықтималдықтар) 0/1 бүтін сандардың жай тізіміне айналдырсын. Мысалы, <code>to_labels(np.array([[0.02], [0.97], [0.5], [0.3]]))</code> → <code>[0, 1, 1, 0]</code>.</p>",
   "starter": "import numpy as np\ndef to_labels(p, threshold=0.5):\n    pass\n",
   "solution": "import numpy as np\ndef to_labels(p, threshold=0.5):\n    return [int(v) for v in (np.asarray(p).ravel() >= threshold)]\n",
   "hints": [
    "<code>np.asarray(p).ravel()</code> массивті жазық етеді",
    "Тізімге <code>int(...)</code> арқылы айналдырыңыз"
   ],
   "check": {
    "tests": "import numpy as _np\nassert to_labels(_np.array([[0.02], [0.97], [0.5], [0.3]])) == [0, 1, 1, 0], 'Нәтиже [0, 1, 1, 0] тізімі болуы керек'\nassert to_labels(_np.array([[0.6], [0.8]]), threshold=0.7) == [0, 1], 'threshold параметрін қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шығыс қабат градиенттері",
   "prompt": "<p><code>output_grads(h, p, y)</code> жазыңыз: sigmoid + BCE шығыс қабаты үшін <code>dz2 = (p − y) / n</code>, <code>dW2 = h.T @ dz2</code>, <code>db2 = dz2.sum(axis=0, keepdims=True)</code>. <code>(dz2, dW2, db2)</code> қайтарсын. <code>h</code> пішіні <code>(n, k)</code>, <code>p</code> мен <code>y</code> — <code>(n, 1)</code>.</p>",
   "starter": "import numpy as np\ndef output_grads(h, p, y):\n    pass\n",
   "solution": "import numpy as np\ndef output_grads(h, p, y):\n    dz2 = (p - y) / len(y)\n    return dz2, h.T @ dz2, dz2.sum(axis=0, keepdims=True)\n",
   "hints": [
    "<code>len(y)</code> — мысалдар саны n",
    "<code>dz2.sum(axis=0, keepdims=True)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(1)\n_h = _np.tanh(_r.normal(size=(4, 3))); _p = _r.uniform(0.1, 0.9, (4, 1)); _y = _np.array([[0], [1], [1], [0]], dtype=float)\n_out = output_grads(_h, _p, _y)\nassert _out is not None and len(_out) == 3, '(dz2, dW2, db2) үштігін қайтарыңыз'\n_dz2, _dW2, _db2 = _out\nassert _np.allclose(_dz2, (_p - _y) / 4), 'dz2 = (p − y) / n'\nassert _np.shape(_dW2) == (3, 1) and _np.allclose(_dW2, _h.T @ ((_p - _y) / 4)), 'dW2 = h.T @ dz2, пішіні (3, 1)'\nassert _np.shape(_db2) == (1, 1), f'db2 пішіні (1, 1) болуы керек: keepdims=True. Сізде {_np.shape(_db2)}'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір нейрон XOR-ды шешпейді",
   "prompt": "<p>Жасырын қабатсыз бір sigmoid нейрон OR-ды үйренеді, бірақ XOR-ды үйрене алмайды. <code>train_neuron(X, y, lr=1.0, epochs=2000)</code> жазыңыз: <code>w = zeros(2)</code>, <code>b = 0</code>-ден бастап gradient descent жасап (<code>dz = (p − y) / n</code>), <code>(preds, final_loss)</code> қайтарсын: <code>preds</code> — 0/1 тізімі, <code>final_loss</code> — соңғы BCE. Сосын <code>or_preds</code> (OR үшін) және <code>xor_loss</code> (XOR үшін) есептеңіз.</p>",
   "starter": "import numpy as np\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)\ny_or = np.array([0, 1, 1, 1])\ny_xor = np.array([0, 1, 1, 0])\n\ndef train_neuron(X, y, lr=1.0, epochs=2000):\n    pass\n\nor_preds = None\nxor_loss = None\n",
   "solution": "import numpy as np\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)\ny_or = np.array([0, 1, 1, 1])\ny_xor = np.array([0, 1, 1, 0])\n\ndef train_neuron(X, y, lr=1.0, epochs=2000):\n    w = np.zeros(2)\n    b = 0.0\n    for _ in range(epochs):\n        p = 1 / (1 + np.exp(-(X @ w + b)))\n        dz = (p - y) / len(y)\n        w = w - lr * (X.T @ dz)\n        b = b - lr * dz.sum()\n    p = 1 / (1 + np.exp(-(X @ w + b)))\n    loss = float(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p)))\n    return [int(v) for v in (p >= 0.5)], loss\n\nor_preds, _ = train_neuron(X, y_or)\n_, xor_loss = train_neuron(X, y_xor)\nprint(or_preds, xor_loss)\n",
   "hints": [
    "Бұл dl-4-тегі бір нейронның үйретуі",
    "Соңғы loss-ты циклден кейін есептеңіз"
   ],
   "check": {
    "tests": "assert or_preds == [0, 1, 1, 1], f'Бір нейрон OR-ды үйренеді: [0, 1, 1, 1], сізде {or_preds}'\nassert xor_loss is not None and xor_loss > 0.6, f'XOR-да loss log 2 ≈ 0.693 маңында қалуы керек, сізде {xor_loss}'\n_p, _l = train_neuron(X, y_or, epochs=10)\nassert isinstance(_p, list) and len(_p) == 4, 'preds — 4 элементті тізім'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір training қадамы",
   "prompt": "<p><code>train_step(params, X, y, lr)</code> жазыңыз: <code>params</code> — <code>W1, b1, W2, b2</code> кілттері бар сөздік (2 → 4 tanh → 1 sigmoid желі). Бір рет forward, BCE, backward жасап, салмақтарды <b>сөздік ішінде</b> жаңартсын және жаңартуға <b>дейінгі</b> loss-ты қайтарсын. Бірнеше рет шақырғанда loss азаюы керек.</p>",
   "starter": "import numpy as np\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)\ny = np.array([[0], [1], [1], [0]], dtype=float)\nrng = np.random.default_rng(42)\nparams = {\"W1\": rng.normal(0, 1, (2, 4)), \"b1\": np.zeros((1, 4)),\n          \"W2\": rng.normal(0, 1, (4, 1)), \"b2\": np.zeros((1, 1))}\n\ndef train_step(params, X, y, lr):\n    return 0.0\n",
   "solution": "import numpy as np\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)\ny = np.array([[0], [1], [1], [0]], dtype=float)\nrng = np.random.default_rng(42)\nparams = {\"W1\": rng.normal(0, 1, (2, 4)), \"b1\": np.zeros((1, 4)),\n          \"W2\": rng.normal(0, 1, (4, 1)), \"b2\": np.zeros((1, 1))}\n\ndef train_step(params, X, y, lr):\n    W1, b1, W2, b2 = params[\"W1\"], params[\"b1\"], params[\"W2\"], params[\"b2\"]\n    h = np.tanh(X @ W1 + b1)\n    p = 1 / (1 + np.exp(-(h @ W2 + b2)))\n    loss = float(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p)))\n    dz2 = (p - y) / len(X)\n    dW2 = h.T @ dz2; db2 = dz2.sum(axis=0, keepdims=True)\n    dz1 = (dz2 @ W2.T) * (1 - h ** 2)\n    dW1 = X.T @ dz1; db1 = dz1.sum(axis=0, keepdims=True)\n    params[\"W1\"] = W1 - lr * dW1; params[\"b1\"] = b1 - lr * db1\n    params[\"W2\"] = W2 - lr * dW2; params[\"b2\"] = b2 - lr * db2\n    return loss\n",
   "hints": [
    "dh есептегенде <b>ескі</b> W2-ні қолданыңыз (жаңартудан бұрын)",
    "Жаңа мәндерді <code>params[\"W1\"] = ...</code> арқылы жазыңыз"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(0)\n_pp = {\"W1\": _r.normal(0, 1, (2, 4)), \"b1\": _np.zeros((1, 4)), \"W2\": _r.normal(0, 1, (4, 1)), \"b2\": _np.zeros((1, 1))}\n_W1 = _pp[\"W1\"].copy(); _W2 = _pp[\"W2\"].copy()\n_h = _np.tanh(X @ _W1); _p = 1 / (1 + _np.exp(-(_h @ _W2)))\n_l0 = train_step(_pp, X, y, 0.5)\nassert abs(_l0 - (-_np.mean(y * _np.log(_p) + (1 - y) * _np.log(1 - _p)))) < 1e-9, 'Қайтарылатын loss — жаңартуға дейінгі BCE'\n_dz2 = (_p - y) / 4\nassert _np.allclose(_pp[\"W2\"], _W2 - 0.5 * (_h.T @ _dz2)), 'W2 = W2 − lr · h.T @ dz2 сөздік ішінде жаңаруы керек'\n_dz1 = (_dz2 @ _W2.T) * (1 - _h ** 2)\nassert _np.allclose(_pp[\"W1\"], _W1 - 0.5 * (X.T @ _dz1)), 'W1 жаңартуын тексеріңіз: dz1 = (dz2 @ W2.T) · (1 − h²), ескі W2-мен'\n_ls = [train_step(_pp, X, y, 1.0) for _ in range(300)]\nassert _ls[-1] < _ls[0], 'Бірнеше қадамнан кейін loss азаюы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "ReLU бар XOR желісі",
   "prompt": "<p>XOR желісін нөлден жазыңыз, бірақ жасырын қабатта ReLU қолданыңыз: 2 → 8 (ReLU) → 1 (sigmoid). <code>train_xor_relu(epochs=3000, lr=0.5, seed=0)</code>: <code>rng = np.random.default_rng(seed)</code>, <code>W1 = rng.normal(0, 1, (2, 8))</code>, <code>b1 = zeros((1, 8))</code>, <code>W2 = rng.normal(0, 1, (8, 1))</code>, <code>b2 = zeros((1, 1))</code>. ReLU туындысы: <code>z1 &gt; 0</code> болса 1. <code>(preds, losses)</code> қайтарсын: <code>preds</code> — 0/1 тізімі.</p>",
   "starter": "import numpy as np\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)\ny = np.array([[0], [1], [1], [0]], dtype=float)\n\ndef train_xor_relu(epochs=3000, lr=0.5, seed=0):\n    losses = []\n    return [0, 0, 0, 0], losses\n",
   "solution": "import numpy as np\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)\ny = np.array([[0], [1], [1], [0]], dtype=float)\n\ndef train_xor_relu(epochs=3000, lr=0.5, seed=0):\n    rng = np.random.default_rng(seed)\n    W1 = rng.normal(0, 1, (2, 8)); b1 = np.zeros((1, 8))\n    W2 = rng.normal(0, 1, (8, 1)); b2 = np.zeros((1, 1))\n    losses = []\n    for _ in range(epochs):\n        z1 = X @ W1 + b1\n        h = np.maximum(0, z1)\n        p = 1 / (1 + np.exp(-(h @ W2 + b2)))\n        losses.append(float(-np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))))\n        dz2 = (p - y) / len(X)\n        dW2 = h.T @ dz2; db2 = dz2.sum(axis=0, keepdims=True)\n        dz1 = (dz2 @ W2.T) * (z1 > 0)\n        dW1 = X.T @ dz1; db1 = dz1.sum(axis=0, keepdims=True)\n        W1 -= lr * dW1; b1 -= lr * db1\n        W2 -= lr * dW2; b2 -= lr * db2\n    p = 1 / (1 + np.exp(-(np.maximum(0, X @ W1 + b1) @ W2 + b2)))\n    return [int(v) for v in (p.ravel() >= 0.5)], losses\n",
   "hints": [
    "ReLU туындысы үшін <code>z1</code>-ді сақтап қойыңыз: <code>(z1 > 0)</code>",
    "Backward dl-5-тегідей, тек <code>(1 - h**2)</code> орнына <code>(z1 > 0)</code>"
   ],
   "check": {
    "tests": "_preds, _losses = train_xor_relu()\nassert len(_losses) == 3000, f'losses ұзындығы epochs-қа тең болуы керек, сізде {len(_losses)}'\nassert _preds == [0, 1, 1, 0], f'preds = [0, 1, 1, 0] болуы керек, сізде {_preds}'\nassert _losses[-1] < 0.05, f'Соңғы loss 0.05-тен аз болуы керек, сізде {_losses[-1]:.4f}'\nassert _losses[-1] < _losses[0], 'Loss азаюы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Backprop-ты сандық тексеру",
   "prompt": "<p><code>backward(X, y, W1, b1, W2, b2)</code> жазыңыз: 2 → tanh → 1 sigmoid желісі үшін BCE градиенттерін <code>{\"W1\": dW1, \"b1\": db1, \"W2\": dW2, \"b2\": db2}</code> сөздігі ретінде қайтарсын. Тексеруші әр градиентті сандық градиентпен (<code>(L(θ+ε) − L(θ−ε)) / 2ε</code>) салыстырады.</p>",
   "starter": "import numpy as np\ndef backward(X, y, W1, b1, W2, b2):\n    return {\"W1\": np.zeros_like(W1), \"b1\": np.zeros_like(b1), \"W2\": np.zeros_like(W2), \"b2\": np.zeros_like(b2)}\n",
   "solution": "import numpy as np\ndef backward(X, y, W1, b1, W2, b2):\n    h = np.tanh(X @ W1 + b1)\n    p = 1 / (1 + np.exp(-(h @ W2 + b2)))\n    dz2 = (p - y) / len(X)\n    dW2 = h.T @ dz2; db2 = dz2.sum(axis=0, keepdims=True)\n    dz1 = (dz2 @ W2.T) * (1 - h ** 2)\n    dW1 = X.T @ dz1; db1 = dz1.sum(axis=0, keepdims=True)\n    return {\"W1\": dW1, \"b1\": db1, \"W2\": dW2, \"b2\": db2}\n",
   "hints": [
    "dl-5 сабағындағы backward формулалары",
    "b1, b2 үшін <code>sum(axis=0, keepdims=True)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(11)\n_X = _r.normal(size=(5, 2)); _y = _np.array([[0], [1], [1], [0], [1]], dtype=float)\n_P = {\"W1\": _r.normal(size=(2, 3)), \"b1\": _r.normal(size=(1, 3)), \"W2\": _r.normal(size=(3, 1)), \"b2\": _r.normal(size=(1, 1))}\ndef _loss(P):\n    h = _np.tanh(_X @ P[\"W1\"] + P[\"b1\"]); p = 1 / (1 + _np.exp(-(h @ P[\"W2\"] + P[\"b2\"])))\n    return -_np.mean(_y * _np.log(p) + (1 - _y) * _np.log(1 - p))\n_g = backward(_X, _y, _P[\"W1\"], _P[\"b1\"], _P[\"W2\"], _P[\"b2\"])\nfor _k in [\"W1\", \"b1\", \"W2\", \"b2\"]:\n    assert _np.shape(_g[_k]) == _P[_k].shape, f'{_k} градиентінің пішіні {_P[_k].shape} болуы керек'\n    _num = _np.zeros_like(_P[_k])\n    for _i in _np.ndindex(_P[_k].shape):\n        _old = _P[_k][_i]\n        _P[_k][_i] = _old + 1e-6; _lp = _loss(_P)\n        _P[_k][_i] = _old - 1e-6; _lm = _loss(_P)\n        _P[_k][_i] = _old\n        _num[_i] = (_lp - _lm) / 2e-6\n    assert _np.allclose(_g[_k], _num, atol=1e-6), f'{_k} градиенті сандық градиентпен сәйкес келмейді'"
   }
  }
 ],
 "dl-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Эпохадағы қадамдар",
   "prompt": "<p><code>steps_per_epoch(n, batch_size)</code> жазыңыз: бір эпохадағы қадам саны <code>ceil(n / batch_size)</code>. Мысалы, Шымкенттегі дүкеннің 5 000 суреті, batch 128 → 40 қадам.</p>",
   "starter": "import math\n\ndef steps_per_epoch(n, batch_size):\n    pass\n",
   "solution": "import math\n\ndef steps_per_epoch(n, batch_size):\n    return math.ceil(n / batch_size)\n",
   "hints": [
    "<code>math.ceil(n / batch_size)</code>"
   ],
   "check": {
    "tests": "assert steps_per_epoch(5000, 128) == 40, f'5000 / 128 → 40 қадам, сізде {steps_per_epoch(5000, 128)}'\nassert steps_per_epoch(10000, 64) == 157, '10000 / 64 → 157'\nassert steps_per_epoch(256, 64) == 4, 'Бөлінсе, дәл 4'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Барлық қадам саны",
   "prompt": "<p><code>total_steps(n, batch_size, epochs)</code> жазыңыз: бүкіл үйретудегі gradient қадамдарының саны. Мысалы, 10 000 мысал, batch 64, 20 эпоха → 3 140.</p>",
   "starter": "import math\n\ndef total_steps(n, batch_size, epochs):\n    pass\n",
   "solution": "import math\n\ndef total_steps(n, batch_size, epochs):\n    return math.ceil(n / batch_size) * epochs\n",
   "hints": [
    "Эпохадағы қадамды эпоха санына көбейтіңіз"
   ],
   "check": {
    "tests": "assert total_steps(10000, 64, 20) == 3140, f'3140 болуы керек, сізде {total_steps(10000, 64, 20)}'\nassert total_steps(100, 100, 5) == 5, 'Бір batch, 5 эпоха: 5 қадам'\nassert total_steps(101, 100, 3) == 6, '101 мысал → эпохасына 2 қадам, 3 эпоха → 6'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Соңғы batch өлшемі",
   "prompt": "<p><code>last_batch_size(n, batch_size)</code> жазыңыз: эпоханың соңғы batch-ында неше мысал бар? Мысалы, <code>last_batch_size(10000, 64)</code> → 16, ал <code>last_batch_size(256, 64)</code> → 64.</p>",
   "starter": "def last_batch_size(n, batch_size):\n    pass\n",
   "solution": "def last_batch_size(n, batch_size):\n    r = n % batch_size\n    return r if r else batch_size\n",
   "hints": [
    "Қалдық: <code>n % batch_size</code>"
   ],
   "check": {
    "tests": "assert last_batch_size(10000, 64) == 16, f'10000 % 64 = 16, сізде {last_batch_size(10000, 64)}'\nassert last_batch_size(256, 64) == 64, 'Қалдық 0 болса, соңғы batch толық: 64'\nassert last_batch_size(5, 8) == 5, 'Дерек batch-тан аз болса, бәрі бір batch'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Араластырылған batch-тар",
   "prompt": "<p><code>shuffled_batches(X, y, batch_size, seed)</code> жазыңыз: <code>np.random.default_rng(seed).permutation(len(X))</code> арқылы ретті араластырып, <code>(Xb, yb)</code> жұптарының тізімін қайтарсын. Әр мысал дәл бір рет кездесуі керек, ал <code>X</code> мен <code>y</code> жолдары бір-бірінен ажырамауы керек.</p>",
   "starter": "import numpy as np\ndef shuffled_batches(X, y, batch_size, seed):\n    return [(X, y)]\n",
   "solution": "import numpy as np\ndef shuffled_batches(X, y, batch_size, seed):\n    idx = np.random.default_rng(seed).permutation(len(X))\n    out = []\n    for s in range(0, len(X), batch_size):\n        part = idx[s:s + batch_size]\n        out.append((X[part], y[part]))\n    return out\n",
   "hints": [
    "Индекстерді араластырып, <code>X[idx]</code>, <code>y[idx]</code> алыңыз",
    "<code>range(0, len(X), batch_size)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_X = _np.arange(20).reshape(10, 2); _y = _np.arange(10) * 10\n_b = shuffled_batches(_X, _y, 4, seed=1)\nassert [len(yb) for _, yb in _b] == [4, 4, 2], f'batch өлшемдері [4, 4, 2] болуы керек, сізде {[len(yb) for _, yb in _b]}'\n_all = _np.concatenate([yb for _, yb in _b])\nassert sorted(_all.tolist()) == list(range(0, 100, 10)), 'Әр мысал дәл бір рет кездесуі керек'\nassert _all.tolist() != list(range(0, 100, 10)), 'Дерек араластырылуы керек (permutation)'\nfor _xb, _yb in _b:\n    assert _np.array_equal(_xb[:, 0] * 5, _yb), 'X пен y жолдары бірге жылжуы керек'\nassert [yb.tolist() for _, yb in shuffled_batches(_X, _y, 4, seed=1)] == [yb.tolist() for _, yb in _b], 'Бір seed бірдей рет беруі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Overfitting басталуы",
   "prompt": "<p><code>overfit_start(train_losses, val_losses)</code> жазыңыз: train loss алдыңғы эпохадан төмендеп, ал val loss <b>өскен</b> бірінші эпоханың индексін (0-ден) қайтарсын. Ондай эпоха жоқ болса <code>None</code>. Мысалы, train <code>[0.9, 0.6, 0.4, 0.3, 0.2]</code>, val <code>[0.95, 0.7, 0.6, 0.65, 0.7]</code> → 3.</p>",
   "starter": "def overfit_start(train_losses, val_losses):\n    pass\n",
   "solution": "def overfit_start(train_losses, val_losses):\n    for e in range(1, len(train_losses)):\n        if train_losses[e] < train_losses[e - 1] and val_losses[e] > val_losses[e - 1]:\n            return e\n    return None\n",
   "hints": [
    "1-эпохадан бастап әр эпоханы алдыңғысымен салыстырыңыз"
   ],
   "check": {
    "tests": "assert overfit_start([0.9, 0.6, 0.4, 0.3, 0.2], [0.95, 0.7, 0.6, 0.65, 0.7]) == 3, '3-эпохада val өсе бастады'\nassert overfit_start([0.9, 0.6, 0.4], [0.9, 0.7, 0.5]) is None, 'Екеуі де азайса None'\nassert overfit_start([0.5, 0.6, 0.4], [0.5, 0.7, 0.8]) == 2, '1-эпохада train да өсті — бұл overfitting емес; 2-эпоха'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Learning rate кестесі",
   "prompt": "<p>Scheduler learning rate-ті уақыт өте азайтады. <code>step_decay(lr0, epochs, drop=0.5, every=10)</code> жазыңыз: әр эпохаға (0-ден <code>epochs − 1</code>-ге дейін) learning rate тізімін қайтарсын: <code>lr0 · drop<sup>epoch // every</sup></code>. Мысалы, <code>step_decay(0.1, 25)</code>: 0–9 эпохада 0.1, 10–19 — 0.05, 20–24 — 0.025.</p>",
   "starter": "def step_decay(lr0, epochs, drop=0.5, every=10):\n    return []\n",
   "solution": "def step_decay(lr0, epochs, drop=0.5, every=10):\n    return [lr0 * drop ** (e // every) for e in range(epochs)]\n",
   "hints": [
    "<code>e // every</code> — неше рет азайғаны"
   ],
   "check": {
    "tests": "_s = step_decay(0.1, 25)\nassert len(_s) == 25, f'25 эпохаға 25 мән, сізде {len(_s)}'\nassert abs(_s[0] - 0.1) < 1e-12 and abs(_s[9] - 0.1) < 1e-12, '0–9 эпохада 0.1'\nassert abs(_s[10] - 0.05) < 1e-12 and abs(_s[24] - 0.025) < 1e-12, '10-эпохада 0.05, 24-эпохада 0.025'\n_t = step_decay(1.0, 7, drop=0.1, every=3)\nassert all(abs(a - b) < 1e-12 for a, b in zip(_t, [1, 1, 1, 0.1, 0.1, 0.1, 0.01])), 'drop және every параметрлерін қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Mini-batch gradient descent",
   "prompt": "<p><code>minibatch_gd(X, y, batch_size, lr, epochs, seed=0)</code> жазыңыз: сызықтық регрессияны (<code>pred = X @ w + b</code>, MSE) mini-batch-пен үйретсін. Әр эпохада <code>rng.permutation</code> арқылы араластырыңыз (<code>rng = np.random.default_rng(seed)</code> бір рет жасалады), әр batch үшін <code>dw = 2/m · Xb.T @ err</code>, <code>db = 2 · mean(err)</code>. <code>(w, b, steps)</code> қайтарсын, <code>steps</code> — жасалған жаңарту саны.</p>",
   "starter": "import numpy as np\nrng0 = np.random.default_rng(1)\nX = rng0.normal(size=(200, 2))\ny = X @ np.array([3.0, -2.0]) + 5 + rng0.normal(0, 0.1, 200)\n\ndef minibatch_gd(X, y, batch_size, lr, epochs, seed=0):\n    w = np.zeros(X.shape[1]); b = 0.0; steps = 0\n    return w, b, steps\n",
   "solution": "import numpy as np\nrng0 = np.random.default_rng(1)\nX = rng0.normal(size=(200, 2))\ny = X @ np.array([3.0, -2.0]) + 5 + rng0.normal(0, 0.1, 200)\n\ndef minibatch_gd(X, y, batch_size, lr, epochs, seed=0):\n    rng = np.random.default_rng(seed)\n    w = np.zeros(X.shape[1]); b = 0.0; steps = 0\n    for _ in range(epochs):\n        idx = rng.permutation(len(X))\n        for s in range(0, len(X), batch_size):\n            part = idx[s:s + batch_size]\n            Xb, yb = X[part], y[part]\n            err = Xb @ w + b - yb\n            w = w - lr * 2 / len(yb) * (Xb.T @ err)\n            b = b - lr * 2 * err.mean()\n            steps += 1\n    return w, b, steps\n",
   "hints": [
    "Генераторды цикл алдында бір рет жасаңыз",
    "Batch ішінде <code>len(yb)</code>-ға бөліңіз (соңғы batch кішірек)"
   ],
   "check": {
    "tests": "import numpy as _np\n_w, _b, _s = minibatch_gd(X, y, 32, 0.05, 30)\nassert _s == 7 * 30, f'200 мысал, batch 32 → эпохасына 7 қадам, 30 эпоха → 210. Сізде {_s}'\nassert _np.allclose(_w, [3.0, -2.0], atol=0.1), f'w ≈ [3, -2] болуы керек, сізде {_w}'\nassert abs(_b - 5) < 0.1, f'b ≈ 5 болуы керек, сізде {_b}'\n_w2, _b2, _ = minibatch_gd(X, y, 32, 0.05, 30)\nassert _np.allclose(_w, _w2), 'Бір seed бірдей нәтиже беруі керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Early stopping бар үйрету",
   "prompt": "<p><code>fit_early_stop(step_fn, val_fn, w0, max_epochs, patience)</code> жазыңыз. Әр эпохада <code>w = step_fn(w)</code> (бір эпоха үйрету), сосын <code>val_fn(w)</code> — validation loss. Ең аз loss-тағы салмақты және эпохасын (0-ден) есте сақтаңыз. <code>patience</code> эпоха бойы жақсару болмаса — тоқтаңыз. <code>(best_w, best_epoch, epochs_run)</code> қайтарсын.</p><p>Мысал: <code>step_fn = lambda w: w + 1</code>, <code>val_fn = lambda w: (w − 5)²</code>, <code>w0 = 0</code>, patience 3 → <code>(5, 4, 8)</code>.</p>",
   "starter": "def fit_early_stop(step_fn, val_fn, w0, max_epochs, patience):\n    return w0, 0, 0\n",
   "solution": "def fit_early_stop(step_fn, val_fn, w0, max_epochs, patience):\n    w = w0\n    best_w, best_epoch, best_loss = w0, -1, float(\"inf\")\n    epochs_run = 0\n    for epoch in range(max_epochs):\n        w = step_fn(w)\n        loss = val_fn(w)\n        epochs_run += 1\n        if loss < best_loss:\n            best_loss, best_w, best_epoch = loss, w, epoch\n        elif epoch - best_epoch >= patience:\n            break\n    return best_w, best_epoch, epochs_run\n",
   "hints": [
    "Ең жақсы loss-ты <code>float(\"inf\")</code>-тен бастаңыз",
    "Тоқтау шарты: <code>epoch - best_epoch >= patience</code>"
   ],
   "check": {
    "tests": "_r = fit_early_stop(lambda w: w + 1, lambda w: (w - 5) ** 2, 0, 100, 3)\nassert tuple(_r) == (5, 4, 8), f'(5, 4, 8) болуы керек: ең жақсысы 4-эпохада, 5, 6, 7-эпохада жақсару жоқ. Сізде {_r}'\n_r2 = fit_early_stop(lambda w: w + 1, lambda w: -w, 0, 6, 2)\nassert tuple(_r2) == (6, 5, 6), f'Үнемі жақсарса, max_epochs-қа дейін жүреді: (6, 5, 6). Сізде {_r2}'\n_r3 = fit_early_stop(lambda w: w + 1, lambda w: (w - 2) ** 2, 0, 100, 1)\nassert tuple(_r3) == (2, 1, 3), f'patience = 1: (2, 1, 3). Сізде {_r3}'"
   }
  }
 ],
 "dl-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Градиенттерді нөлдеу",
   "prompt": "<p>PyTorch-та градиенттер жинақталады, сондықтан әр қадам алдында <code>optimizer.zero_grad()</code> шақырамыз. <code>zero_grad(params)</code> функциясын жазыңыз: тізімдегі әр <code>Param</code>-тың <code>grad</code>-ын сол пішіндегі нөлдерге ауыстырсын.</p>",
   "starter": "import numpy as np\nclass Param:\n    def __init__(self, value):\n        self.value = np.asarray(value, dtype=float)\n        self.grad = np.zeros_like(self.value)\n\ndef zero_grad(params):\n    pass\n",
   "solution": "import numpy as np\nclass Param:\n    def __init__(self, value):\n        self.value = np.asarray(value, dtype=float)\n        self.grad = np.zeros_like(self.value)\n\ndef zero_grad(params):\n    for p in params:\n        p.grad = np.zeros_like(p.value)\n",
   "hints": [
    "<code>p.grad = np.zeros_like(p.value)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_a = Param([1.0, 2.0]); _a.grad = _np.array([3.0, -1.0])\n_b = Param([[1.0]]); _b.grad = _np.array([[5.0]])\nzero_grad([_a, _b])\nassert _np.array_equal(_a.grad, [0.0, 0.0]) and _np.array_equal(_b.grad, [[0.0]]), 'Барлық grad нөлге айналуы керек'\nassert _a.grad.shape == (2,) and _b.grad.shape == (1, 1), 'grad пішіні value пішінімен бірдей болуы керек'\nassert _np.array_equal(_a.value, [1.0, 2.0]), 'value өзгермеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "nn.Linear салмағы",
   "prompt": "<p>PyTorch-тағы <code>nn.Linear(in, out)</code> салмағын <code>(out, in)</code> пішінінде сақтайды және <code>y = x @ W.T + b</code> есептейді. <code>linear(x, W, b)</code> жазыңыз. Мысалы, <code>nn.Linear(2, 3)</code>-тің <code>W</code> пішіні <code>(3, 2)</code>, <code>(4, 2)</code> кіріске <code>(4, 3)</code> шығыс береді.</p>",
   "starter": "import numpy as np\ndef linear(x, W, b):\n    pass\n",
   "solution": "import numpy as np\ndef linear(x, W, b):\n    return np.asarray(x) @ np.asarray(W).T + b\n",
   "hints": [
    "Салмақты транспонирлеу: <code>W.T</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(0)\n_x = _r.normal(size=(4, 2)); _W = _r.normal(size=(3, 2)); _b = _r.normal(size=3)\n_y = linear(_x, _W, _b)\nassert _y is not None and _np.shape(_y) == (4, 3), f'Шығыс пішіні (4, 3) болуы керек, сізде {_np.shape(_y)}'\nassert _np.allclose(_y, _x @ _W.T + _b), 'y = x @ W.T + b'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Logit-тен болжам",
   "prompt": "<p>Модель <code>BCEWithLogitsLoss</code>-пен үйретілгенде шығыс — logit. Инференсте <code>torch.sigmoid(model(x))</code> аламыз. <code>predict_from_logits(logits, threshold=0.5)</code> жазыңыз: <code>(probs, labels)</code> қайтарсын, <code>labels</code> — 0/1 int массиві. Мысалы, logit <code>[2.0, -1.0, 0.0]</code> → labels <code>[1, 0, 1]</code>.</p>",
   "starter": "import numpy as np\ndef predict_from_logits(logits, threshold=0.5):\n    pass\n",
   "solution": "import numpy as np\ndef predict_from_logits(logits, threshold=0.5):\n    probs = 1 / (1 + np.exp(-np.asarray(logits, dtype=float)))\n    return probs, (probs >= threshold).astype(int)\n",
   "hints": [
    "<code>1 / (1 + np.exp(-logits))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = predict_from_logits([2.0, -1.0, 0.0])\nassert _r is not None and len(_r) == 2, '(probs, labels) жұбын қайтарыңыз'\n_p, _l = _r\nassert _np.allclose(_p, [0.8808, 0.2689, 0.5], atol=1e-4), f'probs = sigmoid(logits), сізде {_p}'\nassert list(_l) == [1, 0, 1], f'labels = [1, 0, 1], сізде {list(_l)}'\nassert list(predict_from_logits([2.0, -1.0, 0.0], threshold=0.9)[1]) == [0, 0, 0], 'threshold параметрін қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "MSELoss класы",
   "prompt": "<p>PyTorch-тағы <code>nn.MSELoss</code> сияқты класс жазыңыз. <code>loss = loss_fn(pred, y)</code> шақырғанда ол <code>mean((pred − y)²)</code> қайтарып, <code>pred</code> пен <code>y</code>-ті есте сақтасын. <code>loss_fn.backward()</code> — pred бойынша градиентті қайтарсын: <code>2 · (pred − y) / n</code>.</p>",
   "starter": "import numpy as np\nclass MSELoss:\n    def __call__(self, pred, y):\n        return 0.0\n    def backward(self):\n        return 0.0\n",
   "solution": "import numpy as np\nclass MSELoss:\n    def __call__(self, pred, y):\n        self.pred, self.y = pred, y\n        return float(np.mean((pred - y) ** 2))\n    def backward(self):\n        return 2 * (self.pred - self.y) / len(self.y)\n",
   "hints": [
    "<code>__call__</code> ішінде <code>self.pred, self.y = pred, y</code>",
    "<code>backward</code>: <code>2 * (self.pred - self.y) / len(self.y)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_f = MSELoss()\n_v = _f(_np.array([1.0, 2.0, 4.0]), _np.array([1.0, 3.0, 2.0]))\nassert abs(_v - 5 / 3) < 1e-9, f'loss = (0 + 1 + 4) / 3 ≈ 1.667, сізде {_v}'\n_g = _f.backward()\nassert _np.allclose(_g, [0.0, -2 / 3, 4 / 3]), f'backward = 2·(pred − y)/n = [0, -0.667, 1.333], сізде {_g}'\n_f(_np.array([0.0, 0.0]), _np.array([1.0, 1.0]))\nassert _np.allclose(_f.backward(), [-1.0, -1.0]), 'backward соңғы шақырудың мәндерін қолдануы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Momentum бар SGD",
   "prompt": "<p><code>torch.optim.SGD(..., momentum=0.9)</code> сияқты <code>SGDMomentum(params, lr, momentum=0.9)</code> класын жазыңыз. Әр параметрге жылдамдық <code>v</code> (басында нөл). <code>step()</code>: <code>v = momentum · v + grad</code>, <code>value = value − lr · v</code>. <code>zero_grad()</code> — әр grad-ты нөлдейді.</p>",
   "starter": "import numpy as np\nclass Param:\n    def __init__(self, value):\n        self.value = np.asarray(value, dtype=float)\n        self.grad = np.zeros_like(self.value)\n\nclass SGDMomentum:\n    def __init__(self, params, lr, momentum=0.9):\n        self.params = params\n    def zero_grad(self):\n        pass\n    def step(self):\n        pass\n",
   "solution": "import numpy as np\nclass Param:\n    def __init__(self, value):\n        self.value = np.asarray(value, dtype=float)\n        self.grad = np.zeros_like(self.value)\n\nclass SGDMomentum:\n    def __init__(self, params, lr, momentum=0.9):\n        self.params, self.lr, self.m = params, lr, momentum\n        self.v = [np.zeros_like(p.value) for p in params]\n    def zero_grad(self):\n        for p in self.params:\n            p.grad = np.zeros_like(p.value)\n    def step(self):\n        for i, p in enumerate(self.params):\n            self.v[i] = self.m * self.v[i] + p.grad\n            p.value = p.value - self.lr * self.v[i]\n",
   "hints": [
    "Әр параметрге <code>np.zeros_like(p.value)</code> жылдамдық жасаңыз",
    "Алдымен <code>v</code>-ны жаңартыңыз, сосын <code>value</code>-ны"
   ],
   "check": {
    "tests": "import numpy as _np\n_p = Param([1.0]); _o = SGDMomentum([_p], lr=0.1, momentum=0.9)\n_p.grad = _np.array([1.0]); _o.step()\nassert abs(_p.value[0] - 0.9) < 1e-9, f'1-қадам: v = 1, value = 1 − 0.1·1 = 0.9. Сізде {_p.value}'\n_p.grad = _np.array([1.0]); _o.step()\nassert abs(_p.value[0] - 0.71) < 1e-9, f'2-қадам: v = 0.9·1 + 1 = 1.9, value = 0.9 − 0.19 = 0.71. Сізде {_p.value}'\n_o.zero_grad()\nassert _np.array_equal(_p.grad, [0.0]), 'zero_grad() градиентті нөлдеуі керек'\n_q = Param([0.0, 0.0]); _o2 = SGDMomentum([_q], lr=0.5, momentum=0.0); _q.grad = _np.array([2.0, -2.0]); _o2.step()\nassert _np.allclose(_q.value, [-1.0, 1.0]), 'momentum = 0 болса, қарапайым SGD'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "DataLoader класы",
   "prompt": "<p>PyTorch <code>DataLoader</code>-іне ұқсас класс жазыңыз: <code>DataLoader(X, y, batch_size, shuffle=False, seed=0)</code>. <code>for xb, yb in loader</code> batch-тарды берсін; <code>shuffle=True</code> болса, әр эпохада (әр <code>for</code> басында) <code>self.rng.permutation</code> арқылы жаңа рет. <code>len(loader)</code> — batch саны.</p>",
   "starter": "import numpy as np\nclass DataLoader:\n    def __init__(self, X, y, batch_size, shuffle=False, seed=0):\n        self.X, self.y = X, y\n    def __len__(self):\n        return 0\n    def __iter__(self):\n        yield self.X, self.y\n",
   "solution": "import numpy as np\nclass DataLoader:\n    def __init__(self, X, y, batch_size, shuffle=False, seed=0):\n        self.X, self.y, self.bs, self.shuffle = X, y, batch_size, shuffle\n        self.rng = np.random.default_rng(seed)\n    def __len__(self):\n        return (len(self.X) + self.bs - 1) // self.bs\n    def __iter__(self):\n        idx = self.rng.permutation(len(self.X)) if self.shuffle else np.arange(len(self.X))\n        for s in range(0, len(idx), self.bs):\n            part = idx[s:s + self.bs]\n            yield self.X[part], self.y[part]\n",
   "hints": [
    "<code>__iter__</code> ішінде <code>yield</code> қолданыңыз",
    "Генераторды <code>__init__</code>-те бір рет жасаңыз"
   ],
   "check": {
    "tests": "import numpy as _np\n_X = _np.arange(10).reshape(10, 1); _y = _np.arange(10)\n_l = DataLoader(_X, _y, 4)\nassert len(_l) == 3, f'10 мысал, batch 4 → 3 batch, сізде {len(_l)}'\n_b = [yb.tolist() for _, yb in _l]\nassert _b == [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]], f'shuffle=False: рет сақталады, сізде {_b}'\n_s = DataLoader(_X, _y, 4, shuffle=True, seed=3)\n_e1 = _np.concatenate([yb for _, yb in _s]).tolist(); _e2 = _np.concatenate([yb for _, yb in _s]).tolist()\nassert sorted(_e1) == list(range(10)), 'Әр мысал бір рет кездесуі керек'\nassert _e1 != list(range(10)) and _e1 != _e2, 'shuffle=True: әр эпохада жаңа рет'\nfor _xb, _yb in _s:\n    assert _np.array_equal(_xb.ravel(), _yb), 'X пен y бірге араластырылуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Толық training loop",
   "prompt": "<p><code>Linear</code>, <code>MSELoss</code>, <code>SGD</code> және <code>DataLoader</code> дайын (PyTorch-тағыдай). <code>fit(model, loader, loss_fn, opt, epochs)</code> жазыңыз: әр эпохада әр batch үшін <b>zero_grad → forward → loss → backward → step</b>. Backward: <code>model.backward(loss_fn.backward())</code>. Әр эпоханың орташа loss-ын тізімге жинап қайтарыңыз. Модель <code>y = −3x + 4</code>-ті табуы керек.</p>",
   "starter": "import numpy as np\nclass Param:\n    def __init__(self, value):\n        self.value = np.asarray(value, dtype=float)\n        self.grad = np.zeros_like(self.value)\n\nclass Linear:\n    \"\"\"y = x * w + b, градиенттер PyTorch сияқты жинақталады (+=).\"\"\"\n    def __init__(self):\n        self.w = Param([0.0])\n        self.b = Param([0.0])\n    def parameters(self):\n        return [self.w, self.b]\n    def __call__(self, x):\n        self.x = x\n        return x * self.w.value + self.b.value\n    def backward(self, grad_out):\n        self.w.grad += (grad_out * self.x).sum()\n        self.b.grad += grad_out.sum()\n\nclass MSELoss:\n    def __call__(self, pred, y):\n        self.pred, self.y = pred, y\n        return float(np.mean((pred - y) ** 2))\n    def backward(self):\n        return 2 * (self.pred - self.y) / len(self.y)\n\nclass SGD:\n    def __init__(self, params, lr):\n        self.params, self.lr = params, lr\n    def zero_grad(self):\n        for p in self.params:\n            p.grad = np.zeros_like(p.value)\n    def step(self):\n        for p in self.params:\n            p.value = p.value - self.lr * p.grad\n\nclass DataLoader:\n    def __init__(self, X, y, batch_size, shuffle=False, seed=0):\n        self.X, self.y, self.bs, self.shuffle = X, y, batch_size, shuffle\n        self.rng = np.random.default_rng(seed)\n    def __len__(self):\n        return (len(self.X) + self.bs - 1) // self.bs\n    def __iter__(self):\n        idx = self.rng.permutation(len(self.X)) if self.shuffle else np.arange(len(self.X))\n        for s in range(0, len(idx), self.bs):\n            part = idx[s:s + self.bs]\n            yield self.X[part], self.y[part]\n\nrng = np.random.default_rng(0)\nX = rng.uniform(-1, 1, 64)\ny = -3 * X + 4\n\ndef fit(model, loader, loss_fn, opt, epochs):\n    history = []\n    return history\n\nmodel = Linear()\nhistory = fit(model, DataLoader(X, y, 16, shuffle=True), MSELoss(), SGD(model.parameters(), lr=0.1), 100)\nprint(model.w.value, model.b.value)\n",
   "solution": "import numpy as np\nclass Param:\n    def __init__(self, value):\n        self.value = np.asarray(value, dtype=float)\n        self.grad = np.zeros_like(self.value)\n\nclass Linear:\n    \"\"\"y = x * w + b, градиенттер PyTorch сияқты жинақталады (+=).\"\"\"\n    def __init__(self):\n        self.w = Param([0.0])\n        self.b = Param([0.0])\n    def parameters(self):\n        return [self.w, self.b]\n    def __call__(self, x):\n        self.x = x\n        return x * self.w.value + self.b.value\n    def backward(self, grad_out):\n        self.w.grad += (grad_out * self.x).sum()\n        self.b.grad += grad_out.sum()\n\nclass MSELoss:\n    def __call__(self, pred, y):\n        self.pred, self.y = pred, y\n        return float(np.mean((pred - y) ** 2))\n    def backward(self):\n        return 2 * (self.pred - self.y) / len(self.y)\n\nclass SGD:\n    def __init__(self, params, lr):\n        self.params, self.lr = params, lr\n    def zero_grad(self):\n        for p in self.params:\n            p.grad = np.zeros_like(p.value)\n    def step(self):\n        for p in self.params:\n            p.value = p.value - self.lr * p.grad\n\nclass DataLoader:\n    def __init__(self, X, y, batch_size, shuffle=False, seed=0):\n        self.X, self.y, self.bs, self.shuffle = X, y, batch_size, shuffle\n        self.rng = np.random.default_rng(seed)\n    def __len__(self):\n        return (len(self.X) + self.bs - 1) // self.bs\n    def __iter__(self):\n        idx = self.rng.permutation(len(self.X)) if self.shuffle else np.arange(len(self.X))\n        for s in range(0, len(idx), self.bs):\n            part = idx[s:s + self.bs]\n            yield self.X[part], self.y[part]\n\nrng = np.random.default_rng(0)\nX = rng.uniform(-1, 1, 64)\ny = -3 * X + 4\n\ndef fit(model, loader, loss_fn, opt, epochs):\n    history = []\n    for _ in range(epochs):\n        total = []\n        for xb, yb in loader:\n            opt.zero_grad()\n            pred = model(xb)\n            loss = loss_fn(pred, yb)\n            model.backward(loss_fn.backward())\n            opt.step()\n            total.append(loss)\n        history.append(float(np.mean(total)))\n    return history\n\nmodel = Linear()\nhistory = fit(model, DataLoader(X, y, 16, shuffle=True), MSELoss(), SGD(model.parameters(), lr=0.1), 100)\nprint(model.w.value, model.b.value)\n",
   "hints": [
    "Бес қадамның ретін сақтаңыз: <code>opt.zero_grad()</code> бірінші",
    "Эпоха loss-ы — batch loss-тарының орташасы"
   ],
   "check": {
    "tests": "assert len(history) == 100, f'history ұзындығы 100 эпоха болуы керек, сізде {len(history)}'\nassert history[-1] < history[0], 'Loss азаюы керек'\nassert abs(float(model.w.value[0]) + 3) < 0.05 and abs(float(model.b.value[0]) - 4) < 0.05, f'w ≈ −3, b ≈ 4 болуы керек, сізде w={model.w.value}, b={model.b.value}. zero_grad() шақырылды ма?'\nassert history[-1] < 1e-3, 'Соңғы эпохада loss өте кішкентай болуы керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Dropout: train және eval",
   "prompt": "<p><code>Dropout(p, seed=0)</code> класын жазыңыз. <code>train()</code> және <code>eval()</code> әдістері режимді ауыстырады (басында train). Train режимінде <code>__call__(x)</code> әр элементті <code>p</code> ықтималдықпен 0-ге айналдырып, қалғанын <code>1 / (1 − p)</code>-ға көбейтеді: маска <code>self.rng.random(x.shape) &gt;= p</code>. Eval режимінде <code>x</code> өзгеріссіз қайтады (<code>model.eval()</code> сияқты).</p>",
   "starter": "import numpy as np\nclass Dropout:\n    def __init__(self, p, seed=0):\n        self.p = p\n    def train(self):\n        pass\n    def eval(self):\n        pass\n    def __call__(self, x):\n        return x * 0\n",
   "solution": "import numpy as np\nclass Dropout:\n    def __init__(self, p, seed=0):\n        self.p = p\n        self.rng = np.random.default_rng(seed)\n        self.training = True\n    def train(self):\n        self.training = True\n    def eval(self):\n        self.training = False\n    def __call__(self, x):\n        if not self.training:\n            return x\n        mask = self.rng.random(x.shape) >= self.p\n        return x * mask / (1 - self.p)\n",
   "hints": [
    "Режимді <code>self.training</code> айнымалысында сақтаңыз",
    "<code>x * mask / (1 - self.p)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_d = Dropout(0.5, seed=1)\n_x = _np.ones((100, 100))\n_o = _d(_x)\n_zero = (_o == 0).mean()\nassert 0.45 < _zero < 0.55, f'p = 0.5: элементтердің ~50%-ы 0 болуы керек, сізде {_zero:.2f}'\nassert _np.allclose(_o[_o != 0], 2.0), 'Қалған элементтер 1 / (1 − p) = 2-ге көбейтіледі'\nassert abs(_o.mean() - 1) < 0.05, 'Орташа мән сақталуы керек'\n_d.eval()\nassert _np.array_equal(_d(_x), _x), 'eval режимінде x өзгермейді'\n_d.train()\nassert (_d(_x) == 0).any(), 'train() қайта шақырылса, dropout қайта қосылады'"
   }
  }
 ],
 "dl-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Feature map өлшемі",
   "prompt": "<p><code>conv_out(n, k, padding=0, stride=1)</code> жазыңыз: convolution-нан кейінгі өлшем <code>(n − k + 2·padding) // stride + 1</code>. Мысалы, 5×5 сурет, k = 3 → 3; 28×28, k = 3, padding = 1 → 28.</p>",
   "starter": "def conv_out(n, k, padding=0, stride=1):\n    pass\n",
   "solution": "def conv_out(n, k, padding=0, stride=1):\n    return (n - k + 2 * padding) // stride + 1\n",
   "hints": [
    "Формуланы бүтін бөлумен (<code>//</code>) жазыңыз"
   ],
   "check": {
    "tests": "assert conv_out(5, 3) == 3, 'conv_out(5, 3) = 3'\nassert conv_out(28, 3, padding=1) == 28, '«same» padding: 28 → 28'\nassert conv_out(32, 5, stride=2) == 14, '(32 − 5) // 2 + 1 = 14'\nassert conv_out(224, 7, padding=3, stride=2) == 112, 'ResNet-тің бірінші қабаты: 224 → 112'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Conv2d параметрлері",
   "prompt": "<p><code>conv_params(in_ch, out_ch, k)</code> жазыңыз: <code>nn.Conv2d(in_ch, out_ch, k)</code> қабатының параметр саны. Әр сүзгіде <code>in_ch · k · k</code> салмақ және 1 bias. Мысалы, <code>conv_params(3, 16, 3)</code> → 448.</p>",
   "starter": "def conv_params(in_ch, out_ch, k):\n    pass\n",
   "solution": "def conv_params(in_ch, out_ch, k):\n    return out_ch * (in_ch * k * k + 1)\n",
   "hints": [
    "<code>out_ch * (in_ch * k * k + 1)</code>"
   ],
   "check": {
    "tests": "assert conv_params(3, 16, 3) == 448, f'16 · (27 + 1) = 448, сізде {conv_params(3, 16, 3)}'\nassert conv_params(1, 8, 3) == 80, '8 · (9 + 1) = 80'\nassert conv_params(64, 128, 1) == 8320, '1×1 kernel: 128 · (64 + 1) = 8320'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нөлмен padding",
   "prompt": "<p><code>pad_zeros(img, p)</code> жазыңыз: 2D суреттің төрт жағына <code>p</code> қатар нөл қосыңыз (<code>np.pad</code>). Мысалы, 3×3 сурет, <code>p = 1</code> → 5×5, ортасында бастапқы сурет.</p>",
   "starter": "import numpy as np\ndef pad_zeros(img, p):\n    return img\n",
   "solution": "import numpy as np\ndef pad_zeros(img, p):\n    return np.pad(img, p, mode=\"constant\", constant_values=0)\n",
   "hints": [
    "<code>np.pad(img, p)</code> әдепкі бойынша нөл қосады"
   ],
   "check": {
    "tests": "import numpy as _np\n_a = _np.arange(1, 10, dtype=float).reshape(3, 3)\n_r = pad_zeros(_a, 1)\nassert _np.shape(_r) == (5, 5), f'Пішіні (5, 5) болуы керек, сізде {_np.shape(_r)}'\nassert _np.array_equal(_r[1:4, 1:4], _a) and _r[0].sum() == 0 and _r[:, -1].sum() == 0, 'Ортасында сурет, шетінде нөлдер'\nassert _np.shape(pad_zeros(_np.ones((4, 6)), 2)) == (8, 10), 'p = 2: (4, 6) → (8, 10)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Stride бар convolution",
   "prompt": "<p><code>conv2d_stride(img, k, stride)</code> жазыңыз (padding жоқ): kernel <code>stride</code> қадаммен жылжиды. Шығыс өлшемі <code>(H − kh) // stride + 1</code> × <code>(W − kw) // stride + 1</code>, элемент <code>(i, j)</code> = <code>(img[i·s : i·s+kh, j·s : j·s+kw] · k).sum()</code>.</p>",
   "starter": "import numpy as np\ndef conv2d_stride(img, k, stride):\n    return img\n",
   "solution": "import numpy as np\ndef conv2d_stride(img, k, stride):\n    kh, kw = k.shape\n    oh = (img.shape[0] - kh) // stride + 1\n    ow = (img.shape[1] - kw) // stride + 1\n    out = np.zeros((oh, ow))\n    for i in range(oh):\n        for j in range(ow):\n            r, c = i * stride, j * stride\n            out[i, j] = (img[r:r + kh, c:c + kw] * k).sum()\n    return out\n",
   "hints": [
    "Бастапқы орын: <code>r, c = i * stride, j * stride</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_img = _np.arange(25, dtype=float).reshape(5, 5); _k = _np.ones((3, 3))\n_r = conv2d_stride(_img, _k, 2)\nassert _np.shape(_r) == (2, 2), f'5×5, k = 3, stride = 2 → (2, 2), сізде {_np.shape(_r)}'\nassert _np.allclose(_r, [[54, 72], [144, 162]]), f'[[54, 72], [144, 162]] болуы керек, сізде {_r}'\n_a = _np.random.default_rng(2).normal(size=(7, 7)); _kk = _np.random.default_rng(3).normal(size=(3, 3))\n_ref = _np.array([[(_a[i:i+3, j:j+3] * _kk).sum() for j in range(5)] for i in range(5)])\nassert _np.allclose(conv2d_stride(_a, _kk, 1), _ref), 'stride = 1 кезінде қарапайым convolution'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Average pooling",
   "prompt": "<p><code>avgpool2(x)</code> жазыңыз: 2×2 блоктар, stride 2, әр блоктың орташасы (өлшемдер жұп). Мысалы, <code>[[1, 3, 2, 0], [5, 3, 2, 4], ...]</code> жоғарғы сол блогы: (1 + 3 + 5 + 3) / 4 = 3.</p>",
   "starter": "import numpy as np\ndef avgpool2(x):\n    return x\n",
   "solution": "import numpy as np\ndef avgpool2(x):\n    h, w = x.shape\n    return x.reshape(h // 2, 2, w // 2, 2).mean(axis=(1, 3))\n",
   "hints": [
    "<code>x.reshape(h // 2, 2, w // 2, 2)</code>",
    "<code>.mean(axis=(1, 3))</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_fm = _np.array([[1, 3, 2, 0], [5, 3, 2, 4], [0, 0, 7, 1], [4, 0, 1, 3]], dtype=float)\n_r = avgpool2(_fm)\nassert _np.allclose(_r, [[3, 2], [1, 3]]), f'[[3, 2], [1, 3]] болуы керек, сізде {_r}'\n_a = _np.arange(36, dtype=float).reshape(6, 6)\nassert _np.allclose(avgpool2(_a), _a.reshape(3, 2, 3, 2).mean(axis=(1, 3))), '6×6 үшін де жұмыс істеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Көлденең шекараны табу",
   "prompt": "<p>Суретте жоғарғы бөлігі ашық, төменгі бөлігі қараңғы. Көлденең шекара kernel-і <code>[[1, 1, 1], [0, 0, 0], [-1, -1, -1]]</code>. <code>edge_row(img)</code> жазыңыз: суретке осы kernel-ді (padding жоқ, stride 1) қолданып, feature map-та абсолют мәндерінің қосындысы ең үлкен жолдың индексін қайтарсын.</p>",
   "starter": "import numpy as np\nK_H = np.array([[1, 1, 1], [0, 0, 0], [-1, -1, -1]], dtype=float)\n\ndef edge_row(img):\n    pass\n",
   "solution": "import numpy as np\nK_H = np.array([[1, 1, 1], [0, 0, 0], [-1, -1, -1]], dtype=float)\n\ndef edge_row(img):\n    H, W = img.shape\n    fmap = np.array([[(img[i:i + 3, j:j + 3] * K_H).sum() for j in range(W - 2)] for i in range(H - 2)])\n    return int(np.argmax(np.abs(fmap).sum(axis=1)))\n",
   "hints": [
    "Алдымен feature map есептеңіз",
    "<code>np.abs(fmap).sum(axis=1)</code> — әр жолдың «күші»"
   ],
   "check": {
    "tests": "import numpy as _np\n_img = _np.array([[9] * 5, [9] * 5, [9] * 5, [0] * 5, [0] * 5, [0] * 5], dtype=float)\nassert edge_row(_img) in (1, 2), f'Шекара 2- және 3-жолдар арасында: feature map-та 1 немесе 2-жол, сізде {edge_row(_img)}'\n_img2 = _np.zeros((8, 6)); _img2[:2] = 5\nassert edge_row(_img2) in (0, 1), 'Шекара жоғарыда болса, индекс 0 немесе 1'\n_img3 = _np.zeros((8, 6)); _img3[6:] = 5\nassert edge_row(_img3) in (4, 5), 'Шекара төменде болса, индекс 4 немесе 5'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Conv → ReLU → Pool",
   "prompt": "<p>CNN блогын жазыңыз: <code>conv_block(img, k)</code> — convolution (padding жоқ, stride 1), ReLU, сосын 2×2 max pooling (stride 2). Convolution нәтижесінің өлшемі тақ болса, pooling алдында соңғы жол/бағанды тастаңыз. Мысалы, 7×7 сурет, 3×3 kernel → 5×5 → 4×4-ке қию → 2×2.</p>",
   "starter": "import numpy as np\ndef conv_block(img, k):\n    return img\n",
   "solution": "import numpy as np\ndef conv_block(img, k):\n    kh, kw = k.shape\n    H, W = img.shape\n    f = np.array([[(img[i:i + kh, j:j + kw] * k).sum() for j in range(W - kw + 1)] for i in range(H - kh + 1)])\n    f = np.maximum(0, f)\n    h, w = f.shape[0] // 2 * 2, f.shape[1] // 2 * 2\n    f = f[:h, :w]\n    return f.reshape(h // 2, 2, w // 2, 2).max(axis=(1, 3))\n",
   "hints": [
    "Тақ өлшемді <code>f[:h, :w]</code> арқылы қиыңыз, мұндағы <code>h = f.shape[0] // 2 * 2</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_r = _np.random.default_rng(5)\n_img = _r.normal(size=(7, 7)); _k = _r.normal(size=(3, 3))\n_f = _np.array([[(_img[i:i+3, j:j+3] * _k).sum() for j in range(5)] for i in range(5)])\n_f = _np.maximum(0, _f)[:4, :4]\n_ref = _f.reshape(2, 2, 2, 2).max(axis=(1, 3))\n_o = conv_block(_img, _k)\nassert _np.shape(_o) == (2, 2), f'7×7 → 5×5 → 2×2, сізде {_np.shape(_o)}'\nassert _np.allclose(_o, _ref), 'Реті: conv → ReLU → max pool'\nassert (_o >= 0).all(), 'ReLU-дан кейін теріс мән болмайды'\n_o2 = conv_block(_r.normal(size=(10, 10)), _np.ones((3, 3)))\nassert _np.shape(_o2) == (4, 4), '10×10 → 8×8 → 4×4'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "CNN пішіндерін санау",
   "prompt": "<p><code>cnn_summary(n, in_ch, layers)</code> жазыңыз: сурет <code>in_ch × n × n</code>. <code>layers</code> — <code>(\"conv\", out_ch, k, padding)</code> немесе <code>(\"pool\", 2)</code> кортеждері (stride: conv 1, pool — өз өлшемі). Соңғы пішінді <code>(C, H, W)</code> және барлық conv параметрлерінің санын қайтарсын: <code>((C, H, W), params)</code>. Сабақтағы желі: <code>cnn_summary(28, 1, [(\"conv\", 8, 3, 1), (\"pool\", 2), (\"conv\", 16, 3, 1), (\"pool\", 2)])</code> → <code>((16, 7, 7), 1248)</code>.</p>",
   "starter": "def cnn_summary(n, in_ch, layers):\n    return (in_ch, n, n), 0\n",
   "solution": "def cnn_summary(n, in_ch, layers):\n    c, size, params = in_ch, n, 0\n    for layer in layers:\n        if layer[0] == \"conv\":\n            _, out_ch, k, pad = layer\n            params += out_ch * (c * k * k + 1)\n            size = size - k + 2 * pad + 1\n            c = out_ch\n        elif layer[0] == \"pool\":\n            size = size // layer[1]\n    return (c, size, size), params\n",
   "hints": [
    "Ағымдағы арна санын <code>c</code>-да сақтаңыз: келесі conv-тың <code>in_ch</code>-ы сол",
    "Pool арна санын өзгертпейді"
   ],
   "check": {
    "tests": "_r = cnn_summary(28, 1, [(\"conv\", 8, 3, 1), (\"pool\", 2), (\"conv\", 16, 3, 1), (\"pool\", 2)])\nassert tuple(_r[0]) == (16, 7, 7), f'Соңғы пішін (16, 7, 7) болуы керек, сізде {_r[0]}'\nassert _r[1] == 1248, f'Параметрлер: 8·(9+1) + 16·(72+1) = 80 + 1168 = 1248, сізде {_r[1]}'\n_r2 = cnn_summary(32, 3, [(\"conv\", 16, 3, 0)])\nassert tuple(_r2[0]) == (16, 30, 30) and _r2[1] == 448, 'padding = 0: 32 → 30, параметр 448'\nassert cnn_summary(8, 1, []) == ((1, 8, 8), 0), 'Қабат жоқ болса — кіріс пішіні, 0 параметр'"
   }
  }
 ],
 "dl-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жаңа head параметрлері",
   "prompt": "<p><code>head_params(in_features, n_classes)</code> жазыңыз: <code>nn.Linear(in_features, n_classes)</code> head-інің параметр саны. Мысалы, ResNet-18 (512 белгі) және 5 қазақ тағамы → 2 565.</p>",
   "starter": "def head_params(in_features, n_classes):\n    pass\n",
   "solution": "def head_params(in_features, n_classes):\n    return in_features * n_classes + n_classes\n",
   "hints": [
    "<code>in·n + n</code>"
   ],
   "check": {
    "tests": "assert head_params(512, 5) == 2565, f'512·5 + 5 = 2565, сізде {head_params(512, 5)}'\nassert head_params(2048, 10) == 20490, 'ResNet-50, 10 класс: 20490'\nassert head_params(768, 2) == 1538, 'BERT embedding (768), екі класс: 1538'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мұздатылған үлес",
   "prompt": "<p><code>frozen_share(layers, train)</code> жазыңыз: <code>layers</code> — блок атынан параметр санына сөздік, <code>train</code> — үйретілетін блоктар тізімі. Мұздатылған параметрлердің үлесін (0…1) қайтарсын. Мысалы, <code>{\"backbone\": 990, \"fc\": 10}</code>, <code>[\"fc\"]</code> → 0.99.</p>",
   "starter": "def frozen_share(layers, train):\n    pass\n",
   "solution": "def frozen_share(layers, train):\n    total = sum(layers.values())\n    frozen = sum(v for k, v in layers.items() if k not in train)\n    return frozen / total\n",
   "hints": [
    "<code>sum(v for k, v in layers.items() if k not in train)</code>"
   ],
   "check": {
    "tests": "assert abs(frozen_share({\"backbone\": 990, \"fc\": 10}, [\"fc\"]) - 0.99) < 1e-12, '990 / 1000 = 0.99'\nassert frozen_share({\"a\": 5, \"b\": 5}, [\"a\", \"b\"]) == 0, 'Бәрі үйретілсе — 0'\n_l = {\"conv1\": 9408, \"layer1\": 147968, \"layer2\": 525568, \"layer3\": 2099712, \"layer4\": 8393728, \"fc\": 2565}\nassert abs(frozen_share(_l, [\"fc\"]) - 0.99977) < 1e-4, 'ResNet-18, тек fc: ≈ 0.9998'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Feature extraction әлде fine-tuning",
   "prompt": "<p><code>choose_strategy(n_examples, far_domain=False)</code> жазыңыз: домен ImageNet-тен алыс болса (рентген, спутник суреттері) немесе мысалдар саны 1 000-нан кем болмаса — <code>\"fine_tuning\"</code>; әйтпесе (жүздеген мысал) — <code>\"feature_extraction\"</code>.</p>",
   "starter": "def choose_strategy(n_examples, far_domain=False):\n    pass\n",
   "solution": "def choose_strategy(n_examples, far_domain=False):\n    if far_domain or n_examples >= 1000:\n        return \"fine_tuning\"\n    return \"feature_extraction\"\n",
   "hints": [
    "<code>if far_domain or n_examples >= 1000</code>"
   ],
   "check": {
    "tests": "assert choose_strategy(300) == 'feature_extraction', '300 тағам суреті: feature_extraction'\nassert choose_strategy(5000) == 'fine_tuning', '5000 сурет: fine_tuning'\nassert choose_strategy(1000) == 'fine_tuning', 'Шекара: 1000 → fine_tuning'\nassert choose_strategy(200, far_domain=True) == 'fine_tuning', 'Домен алыс болса: fine_tuning'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Дерекке сай тәсіл",
   "prompt": "<p>Сабақтағы кесте бойынша <code>recommend(projects)</code> жазыңыз: <code>projects</code> — <code>{\"name\": ..., \"data\": ...}</code> сөздіктерінің тізімі. <code>data</code>: <code>\"table\"</code> → <code>\"gradient_boosting\"</code>; <code>\"image\"</code>, <code>\"audio\"</code>, <code>\"video\"</code> → <code>\"pretrained_cnn\"</code>; <code>\"text\"</code> → <code>\"pretrained_lm\"</code>; басқасы → <code>\"unknown\"</code>. Нәтиже: <code>{name: тәсіл}</code> сөздігі.</p>",
   "starter": "def recommend(projects):\n    return {}\n",
   "solution": "def recommend(projects):\n    rules = {\"table\": \"gradient_boosting\", \"image\": \"pretrained_cnn\", \"audio\": \"pretrained_cnn\",\n             \"video\": \"pretrained_cnn\", \"text\": \"pretrained_lm\"}\n    return {p[\"name\"]: rules.get(p[\"data\"], \"unknown\") for p in projects}\n",
   "hints": [
    "Ережелерді сөздікке жазып, <code>.get(data, \"unknown\")</code> қолданыңыз"
   ],
   "check": {
    "tests": "_p = [{\"name\": \"churn\", \"data\": \"table\"}, {\"name\": \"тағамдар\", \"data\": \"image\"},\n      {\"name\": \"пікірлер\", \"data\": \"text\"}, {\"name\": \"қоңырау\", \"data\": \"audio\"}, {\"name\": \"x\", \"data\": \"graph\"}]\n_r = recommend(_p)\nassert _r.get(\"churn\") == \"gradient_boosting\", 'Кестелік дерек: gradient_boosting'\nassert _r.get(\"тағамдар\") == \"pretrained_cnn\" and _r.get(\"қоңырау\") == \"pretrained_cnn\", 'Сурет пен дыбыс: pretrained_cnn'\nassert _r.get(\"пікірлер\") == \"pretrained_lm\", 'Мәтін: pretrained_lm'\nassert _r.get(\"x\") == \"unknown\", 'Белгісіз дерек түрі: unknown'\nassert recommend([]) == {}, 'Бос тізім — бос сөздік'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "ImageNet нормалау",
   "prompt": "<p>Pretrained модельге суретті үйретудегідей нормалап беру керек. <code>normalize(img, mean, std)</code> жазыңыз: <code>img</code> пішіні <code>(H, W, 3)</code>, мәндері 0…255. Алдымен 255-ке бөліп, сосын әр арна бойынша <code>(x − mean) / std</code>. <code>denormalize(x, mean, std)</code> кері түрлендіріп, 0…255 мәндерін қайтарсын.</p>",
   "starter": "import numpy as np\nMEAN = np.array([0.485, 0.456, 0.406])\nSTD = np.array([0.229, 0.224, 0.225])\n\ndef normalize(img, mean, std):\n    return img\n\ndef denormalize(x, mean, std):\n    return x\n",
   "solution": "import numpy as np\nMEAN = np.array([0.485, 0.456, 0.406])\nSTD = np.array([0.229, 0.224, 0.225])\n\ndef normalize(img, mean, std):\n    return (np.asarray(img, dtype=float) / 255 - mean) / std\n\ndef denormalize(x, mean, std):\n    return (x * std + mean) * 255\n",
   "hints": [
    "Broadcasting: <code>(H, W, 3) − (3,)</code> әр арнаға өз mean-ін алады"
   ],
   "check": {
    "tests": "import numpy as _np\n_img = _np.random.default_rng(0).integers(0, 256, (4, 5, 3))\n_n = normalize(_img, MEAN, STD)\nassert _np.shape(_n) == (4, 5, 3), 'Пішіні сақталуы керек'\nassert _np.allclose(_n, (_img / 255 - MEAN) / STD), 'normalize = (img / 255 − mean) / std, әр арна бойынша'\nassert _np.allclose(denormalize(_n, MEAN, STD), _img), 'denormalize(normalize(img)) = img'\n_g = normalize(_np.full((1, 1, 3), 255), MEAN, STD)\nassert _np.allclose(_g[0, 0], (1 - MEAN) / STD), 'Ақ пиксель (255) үшін (1 − mean) / std'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Центроид head",
   "prompt": "<p>Ең қарапайым head — әр класс белгілерінің ортасы (центроид). <code>fit_centroids(F, y)</code> әр класс үшін <code>F</code> жолдарының орташасын <code>{класс: вектор}</code> сөздігі ретінде қайтарсын. <code>predict_centroid(F, centroids)</code> әр жол үшін Евклид қашықтығы ең кіші класты қайтарсын (тізім). <code>F</code> — мұздатылған backbone-ның белгілері.</p>",
   "starter": "import numpy as np\ndef fit_centroids(F, y):\n    return {}\n\ndef predict_centroid(F, centroids):\n    return []\n",
   "solution": "import numpy as np\ndef fit_centroids(F, y):\n    y = np.asarray(y)\n    return {c: F[y == c].mean(axis=0) for c in np.unique(y)}\n\ndef predict_centroid(F, centroids):\n    classes = list(centroids)\n    C = np.array([centroids[c] for c in classes])\n    d = ((F[:, None, :] - C[None, :, :]) ** 2).sum(axis=2)\n    return [classes[i] for i in d.argmin(axis=1)]\n",
   "hints": [
    "<code>F[y == c].mean(axis=0)</code>",
    "Қашықтық үшін <code>((F[:, None] - C[None]) ** 2).sum(axis=2)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_F = _np.array([[0.0, 0.0], [0.2, 0.0], [5.0, 5.0], [5.2, 4.8], [0.0, 5.0], [0.2, 5.2]])\n_y = _np.array([0, 0, 1, 1, 2, 2])\n_c = fit_centroids(_F, _y)\nassert set(_c) == {0, 1, 2}, 'Әр класқа бір центроид'\nassert _np.allclose(_c[0], [0.1, 0.0]) and _np.allclose(_c[1], [5.1, 4.9]), 'Центроид — класс жолдарының орташасы'\n_p = predict_centroid(_np.array([[0.3, 0.1], [4.0, 4.0], [0.0, 4.0]]), _c)\nassert [int(v) for v in _p] == [0, 1, 2], f'Болжам [0, 1, 2] болуы керек, сізде {_p}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Softmax head үйрету",
   "prompt": "<p>Мұздатылған backbone белгілерінде (<code>extract</code> дайын) көп класты head-ті numpy-мен үйретіңіз. <code>train_head(F, y, k, lr=0.5, epochs=300)</code>: <code>W = zeros((F.shape[1], k))</code>, <code>b = zeros(k)</code>. Әр эпохада <code>P = softmax(F @ W + b)</code>, градиент <code>dZ = (P − Y) / n</code> (Y — one-hot), <code>dW = F.T @ dZ</code>, <code>db = dZ.sum(axis=0)</code>. <code>(W, b)</code> қайтарсын. Сосын test accuracy-ді <code>head_acc</code>-қа жазыңыз.</p>",
   "starter": "import numpy as np\nrng = np.random.default_rng(3)\ncenters = np.array([[0, 2], [2, -1], [-2, -1]])\ny_all = rng.integers(0, 3, 240)\nX_all = centers[y_all] + rng.normal(0, 0.6, (240, 2))\nX_train, X_test, y_train, y_test = X_all[:180], X_all[180:], y_all[:180], y_all[180:]\n\nW_frozen = np.random.default_rng(0).normal(0, 1, (2, 16))\ndef extract(X):\n    return np.tanh(X @ W_frozen)   # мұздатылған backbone\n\ndef train_head(F, y, k, lr=0.5, epochs=300):\n    W = np.zeros((F.shape[1], k)); b = np.zeros(k)\n    return W, b\n\nW, b = train_head(extract(X_train), y_train, 3)\nhead_acc = 0\n",
   "solution": "import numpy as np\nrng = np.random.default_rng(3)\ncenters = np.array([[0, 2], [2, -1], [-2, -1]])\ny_all = rng.integers(0, 3, 240)\nX_all = centers[y_all] + rng.normal(0, 0.6, (240, 2))\nX_train, X_test, y_train, y_test = X_all[:180], X_all[180:], y_all[:180], y_all[180:]\n\nW_frozen = np.random.default_rng(0).normal(0, 1, (2, 16))\ndef extract(X):\n    return np.tanh(X @ W_frozen)   # мұздатылған backbone\n\ndef train_head(F, y, k, lr=0.5, epochs=300):\n    W = np.zeros((F.shape[1], k)); b = np.zeros(k)\n    n = len(y)\n    Y = np.zeros((n, k)); Y[np.arange(n), y] = 1\n    for _ in range(epochs):\n        Z = F @ W + b\n        E = np.exp(Z - Z.max(axis=1, keepdims=True))\n        P = E / E.sum(axis=1, keepdims=True)\n        dZ = (P - Y) / n\n        W = W - lr * (F.T @ dZ)\n        b = b - lr * dZ.sum(axis=0)\n    return W, b\n\nW, b = train_head(extract(X_train), y_train, 3)\nhead_acc = float(np.mean(np.argmax(extract(X_test) @ W + b, axis=1) == y_test))\nprint(head_acc)\n",
   "hints": [
    "One-hot: <code>Y[np.arange(n), y] = 1</code>",
    "Болжам: <code>np.argmax(F @ W + b, axis=1)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\nassert _np.shape(W) == (16, 3) and _np.shape(b) == (3,), f'W пішіні (16, 3), b — (3,), сізде {_np.shape(W)}, {_np.shape(b)}'\nassert _np.abs(W).sum() > 0, 'W үйретілуі керек (нөл емес)'\nassert head_acc >= 0.9, f'head_acc кемінде 0.9 болуы керек, сізде {head_acc}'\nassert W_frozen.shape == (2, 16), 'Backbone салмақтарын өзгертпеңіз'\n_W1, _b1 = train_head(extract(X_train), y_train, 3, epochs=1)\nassert _np.allclose(_b1, -0.5 * (1 / 3 - _np.array([(y_train == c).mean() for c in range(3)]))), 'Бірінші қадам: P = 1/3, db = mean(P − Y)'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Head және шикі белгілер",
   "prompt": "<p>Деректе нүктенің қай ширекте жатқаны маңызды: <code>x1 · x2 &gt; 0</code> болса 1-класс (XOR сияқты). Шикі <code>X</code>-те <code>LogisticRegression(max_iter=1000)</code> үйретіп, test accuracy-ді <code>raw_acc</code>-қа, ал мұздатылған <code>extract(X)</code> белгілерінде үйретілген <code>head</code> accuracy-ін <code>head_acc</code>-қа жазыңыз. <code>head_params</code> — head-тің үйретілген параметр саны (<code>coef_.size + intercept_.size</code>).</p>",
   "starter": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\nrng = np.random.default_rng(5)\nX = rng.uniform(-1, 1, (300, 2))\ny = (X[:, 0] * X[:, 1] > 0).astype(int)\nX_train, X_test, y_train, y_test = X[:220], X[220:], y[:220], y[220:]\n\nW_frozen = np.random.default_rng(1).normal(0, 2, (2, 100))\nb_frozen = np.random.default_rng(2).uniform(-1, 1, 100)\ndef extract(X):\n    return np.maximum(0, X @ W_frozen + b_frozen)\n\nraw_acc = 0\nhead = None\nhead_acc = 0\nhead_params = 0\n",
   "solution": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\nrng = np.random.default_rng(5)\nX = rng.uniform(-1, 1, (300, 2))\ny = (X[:, 0] * X[:, 1] > 0).astype(int)\nX_train, X_test, y_train, y_test = X[:220], X[220:], y[:220], y[220:]\n\nW_frozen = np.random.default_rng(1).normal(0, 2, (2, 100))\nb_frozen = np.random.default_rng(2).uniform(-1, 1, 100)\ndef extract(X):\n    return np.maximum(0, X @ W_frozen + b_frozen)\n\nraw = LogisticRegression(max_iter=1000).fit(X_train, y_train)\nraw_acc = raw.score(X_test, y_test)\nhead = LogisticRegression(max_iter=1000).fit(extract(X_train), y_train)\nhead_acc = head.score(extract(X_test), y_test)\nhead_params = head.coef_.size + head.intercept_.size\nprint(raw_acc, head_acc, head_params)\n",
   "hints": [
    "<code>LogisticRegression(max_iter=1000).fit(extract(X_train), y_train)</code>",
    "<code>model.score(X, y)</code> accuracy береді"
   ],
   "check": {
    "tests": "assert raw_acc < 0.7, f'Шикі X-те сызықтық модель ширектерді бөле алмайды: raw_acc < 0.7, сізде {raw_acc}'\nassert head is not None and head.n_features_in_ == 100, 'head extract(X_train)-тің 100 белгісінде үйретілуі керек'\nassert head_acc >= 0.9, f'head_acc кемінде 0.9 болуы керек, сізде {head_acc}'\nassert head_params == 101, f'head_params = 100 салмақ + 1 bias = 101, сізде {head_params}'"
   }
  }
 ]
});
DJ.addPractice('m6-6', {
 "cap6-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пайда формуласы",
   "prompt": "<p><code>profit(tp, contacted, cost=2000, value=40000, save_rate=0.3)</code> жазыңыз: науқан пайдасы <code>save_rate · value · tp − cost · contacted</code>. Сабақтағы мысал: <code>profit(29, 55)</code> → 238 000 ₸.</p>",
   "starter": "def profit(tp, contacted, cost=2000, value=40000, save_rate=0.3):\n    pass\n",
   "solution": "def profit(tp, contacted, cost=2000, value=40000, save_rate=0.3):\n    return save_rate * value * tp - cost * contacted\n",
   "hints": [
    "Формула сабақта: <code>save_rate * value * tp - cost * contacted</code>"
   ],
   "check": {
    "tests": "assert profit(29, 55) is not None and abs(profit(29, 55) - 238000) < 1e-6, 'profit(29, 55) = 348 000 − 110 000 = 238 000'\nassert abs(profit(0, 10) + 20000) < 1e-6, 'Ешкім сақталмаса — тек шығын: −20 000'\nassert abs(profit(10, 20, cost=1000, value=50000, save_rate=0.5) - 230000) < 1e-6, 'Параметрлерді қолданыңыз: 0.5·50000·10 − 1000·20 = 230 000'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "SLO орындалды ма",
   "prompt": "<p>Сервистің SLO-сы: p95 latency &lt; 200 ms және 5xx үлесі &lt; 0.1%. <code>slo_ok(latencies_ms, n_5xx, n_total)</code> жазыңыз: p95-ті <code>np.percentile(latencies_ms, 95)</code> арқылы есептеп, екі шарт та орындалса <code>True</code>, әйтпесе <code>False</code> қайтарсын.</p>",
   "starter": "import numpy as np\n\ndef slo_ok(latencies_ms, n_5xx, n_total):\n    pass\n",
   "solution": "import numpy as np\n\ndef slo_ok(latencies_ms, n_5xx, n_total):\n    p95 = np.percentile(latencies_ms, 95)\n    return bool(p95 < 200 and n_5xx / n_total < 0.001)\n",
   "hints": [
    "<code>np.percentile(latencies_ms, 95)</code>",
    "Екі шартты <code>and</code>-пен біріктіріңіз"
   ],
   "check": {
    "tests": "_fast = [50] * 95 + [150] * 5\nassert slo_ok(_fast, 0, 10000) is True, 'p95 = 150 ms, қате жоқ: True'\nassert slo_ok([50] * 90 + [400] * 10, 0, 10000) is False, 'p95 = 400 ms: False'\nassert slo_ok(_fast, 10, 10000) is False, '10 / 10000 = 0.1% — шекті тең, SLO орындалмады: False'\nassert slo_ok(_fast, 9, 10000) is True, '9 / 10000 < 0.1%: True'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кетушілер саны",
   "prompt": "<p><code>churn.csv</code> бойынша есептеңіз: <code>n_customers</code> — абонент саны, <code>n_churned</code> — кеткендер саны (<code>churned == 1</code>), <code>churn_rate</code> — кету үлесі.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\nn_customers = None\nn_churned = None\nchurn_rate = None\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\nn_customers = len(churn)\nn_churned = int(churn[\"churned\"].sum())\nchurn_rate = churn[\"churned\"].mean()\nprint(n_customers, n_churned, churn_rate)\n",
   "hints": [
    "<code>churn[\"churned\"].sum()</code> бірлерді санайды"
   ],
   "check": {
    "tests": "assert n_customers == 600, f'n_customers = 600 болуы керек, сізде {n_customers}'\nassert n_churned == 155, f'n_churned = 155 болуы керек, сізде {n_churned}'\nassert churn_rate is not None and abs(churn_rate - 155 / 600) < 1e-9, 'churn_rate = 155 / 600 ≈ 0.258'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша кету",
   "prompt": "<p>Әділдік тәуекелін бағалау үшін әр қаладағы кету үлесін қараймыз. <code>city_rates</code> — <code>{қала: үлес}</code> сөздігі (3 таңбаға дейін дөңгелектелген), <code>worst_city</code> — үлесі ең жоғары қала, <code>gap</code> — ең жоғары мен ең төмен үлестің айырмасы (дөңгелектемей).</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\ncity_rates = {}\nworst_city = None\ngap = None\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\nrates = churn.groupby(\"city\")[\"churned\"].mean()\ncity_rates = rates.round(3).to_dict()\nworst_city = rates.idxmax()\ngap = rates.max() - rates.min()\nprint(city_rates, worst_city, gap)\n",
   "hints": [
    "<code>churn.groupby(\"city\")[\"churned\"].mean()</code>",
    "<code>.idxmax()</code> ең үлкен мәннің индексін береді"
   ],
   "check": {
    "tests": "assert len(city_rates) == 5, f'5 қала болуы керек, сізде {len(city_rates)}'\nassert city_rates.get('Қарағанды') == 0.31 and city_rates.get('Шымкент') == 0.228, f'Қарағанды 0.31, Шымкент 0.228 болуы керек, сізде {city_rates}'\nassert worst_city == 'Қарағанды', f'worst_city = Қарағанды, сізде {worst_city}'\nassert gap is not None and abs(gap - (18 / 58 - 21 / 92)) < 1e-9, 'gap = 0.3103 − 0.2283 ≈ 0.082'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Recall және precision",
   "prompt": "<p>Offline метрика — кетушілер бойынша recall. <code>recall_precision(y_true, y_pred)</code> жазыңыз: <code>(recall, precision)</code> қайтарсын, <code>recall = TP / (TP + FN)</code>, <code>precision = TP / (TP + FP)</code>. Бөлгіш 0 болса, сол метрика 0.0. Мысалы, <code>y_true = [1, 1, 0, 0, 1]</code>, <code>y_pred = [1, 0, 1, 0, 1]</code> → <code>(0.667, 0.667)</code>.</p>",
   "starter": "import numpy as np\n\ndef recall_precision(y_true, y_pred):\n    pass\n",
   "solution": "import numpy as np\n\ndef recall_precision(y_true, y_pred):\n    y_true, y_pred = np.asarray(y_true), np.asarray(y_pred)\n    tp = int(((y_true == 1) & (y_pred == 1)).sum())\n    fn = int(((y_true == 1) & (y_pred == 0)).sum())\n    fp = int(((y_true == 0) & (y_pred == 1)).sum())\n    recall = tp / (tp + fn) if tp + fn else 0.0\n    precision = tp / (tp + fp) if tp + fp else 0.0\n    return recall, precision\n",
   "hints": [
    "TP: <code>(y_true == 1) & (y_pred == 1)</code>",
    "Нөлге бөлуден сақтаныңыз"
   ],
   "check": {
    "tests": "_r = recall_precision([1, 1, 0, 0, 1], [1, 0, 1, 0, 1])\nassert _r is not None and abs(_r[0] - 2 / 3) < 1e-9 and abs(_r[1] - 2 / 3) < 1e-9, f'(2/3, 2/3) болуы керек, сізде {_r}'\nassert tuple(recall_precision([1, 1, 0], [1, 1, 1])) == (1.0, 2 / 3), 'Бәріне ұсынсақ: recall = 1'\nassert tuple(recall_precision([1, 0], [0, 0])) == (0.0, 0.0), 'Ешкімге ұсынбасақ: recall = 0, precision = 0 (бөлгіш 0)'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ережемен науқан",
   "prompt": "<p>Модельсіз қарапайым ереже: келісімшарты жоқ (<code>has_contract == 0</code>) және кемінде 3 рет қолдауға хабарласқан абонентке ұсыныс береміз. <code>campaign_profit</code> дайын. Бүкіл <code>churn.csv</code> бойынша <code>rule_pred</code> (0/1 Series), <code>n_offers</code> (ұсыныс саны) және <code>profit_rule</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\ndef campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):\n    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)\n    tp = int(((y_pred == 1) & (y_true == 1)).sum())\n    contacted = int((y_pred == 1).sum())\n    return save_rate * value * tp - cost * contacted\n\nrule_pred = None\nn_offers = None\nprofit_rule = None\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\ndef campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):\n    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)\n    tp = int(((y_pred == 1) & (y_true == 1)).sum())\n    contacted = int((y_pred == 1).sum())\n    return save_rate * value * tp - cost * contacted\n\nrule_pred = ((churn[\"has_contract\"] == 0) & (churn[\"support_calls\"] >= 3)).astype(int)\nn_offers = int(rule_pred.sum())\nprofit_rule = campaign_profit(churn[\"churned\"], rule_pred)\nprint(n_offers, profit_rule)\n",
   "hints": [
    "Екі шартты <code>&</code> арқылы біріктіріп, жақшаға алыңыз",
    "<code>.astype(int)</code>"
   ],
   "check": {
    "tests": "_ref = ((churn['has_contract'] == 0) & (churn['support_calls'] >= 3)).astype(int)\nassert rule_pred is not None and len(rule_pred) == 600 and (rule_pred.values == _ref.values).all(), 'rule_pred: has_contract == 0 ЖӘНЕ support_calls >= 3'\nassert n_offers == int(_ref.sum()), f'n_offers = {int(_ref.sum())} болуы керек, сізде {n_offers}'\nassert profit_rule is not None and abs(profit_rule - 268000) < 1e-6, f'profit_rule = 268 000 ₸ болуы керек, сізде {profit_rule}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең тиімді шек",
   "prompt": "<p>Қолдауға хабарласу саны бойынша ереже: <code>support_calls &gt;= t</code> болса ұсыныс береміз. <code>best_threshold(df, ts)</code> жазыңыз: әр <code>t</code> үшін бүкіл деректегі пайданы <code>campaign_profit</code>-пен есептеп, <code>(ең жақсы t, оның пайдасы, {t: пайда})</code> қайтарсын (тең болса — кіші t). Сосын <code>best_t, best_profit, table = best_threshold(churn, range(0, 7))</code>.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\ndef campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):\n    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)\n    tp = int(((y_pred == 1) & (y_true == 1)).sum())\n    contacted = int((y_pred == 1).sum())\n    return save_rate * value * tp - cost * contacted\n\ndef best_threshold(df, ts):\n    return None, None, {}\n\nbest_t, best_profit, table = best_threshold(churn, range(0, 7))\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\ndef campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):\n    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)\n    tp = int(((y_pred == 1) & (y_true == 1)).sum())\n    contacted = int((y_pred == 1).sum())\n    return save_rate * value * tp - cost * contacted\n\ndef best_threshold(df, ts):\n    table = {t: campaign_profit(df[\"churned\"], (df[\"support_calls\"] >= t).astype(int)) for t in ts}\n    best = max(table, key=lambda t: (table[t], -t))\n    return best, table[best], table\n\nbest_t, best_profit, table = best_threshold(churn, range(0, 7))\nprint(best_t, best_profit, table)\n",
   "hints": [
    "Сөздік: <code>{t: campaign_profit(...) for t in ts}</code>",
    "<code>max(table, key=...)</code>"
   ],
   "check": {
    "tests": "assert len(table) == 7, f'table-да 7 шек болуы керек, сізде {len(table)}'\nassert abs(table[0] - 660000) < 1e-6, 't = 0 — барлығына ұсыну: 660 000'\nassert best_t == 1 and abs(best_profit - 758000) < 1e-6, f'Ең жақсысы t = 1, пайда 758 000 болуы керек, сізде t={best_t}, {best_profit}'\nassert abs(table[3] - 354000) < 1e-6, 't = 3: 354 000'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Стратегияларды салыстыру",
   "prompt": "<p><code>compare_strategies(y, strategies)</code> жазыңыз: <code>strategies</code> — <code>{атау: 0/1 болжамдар}</code>. Әр стратегияның пайдасын есептеп, <code>(ең тиімді атау, {атау: пайда}, baseline-дан озды ма)</code> қайтарсын. Үшінші мән: ең тиімді стратегия «барлығына ұсыну» мен «ешкімге ұсынбау»-дан қатаң жоғары болса <code>True</code>. Сосын төрт стратегия үшін <code>best, profits, beats = compare_strategies(...)</code>: <code>all</code>, <code>none</code>, <code>no_contract</code> (<code>has_contract == 0</code>), <code>calls_2</code> (<code>support_calls &gt;= 2</code>).</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\ndef campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):\n    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)\n    tp = int(((y_pred == 1) & (y_true == 1)).sum())\n    contacted = int((y_pred == 1).sum())\n    return save_rate * value * tp - cost * contacted\n\ndef compare_strategies(y, strategies):\n    return None, {}, False\n\ny = churn[\"churned\"]\nstrategies = {}\nbest, profits, beats = compare_strategies(y, strategies)\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\ndef campaign_profit(y_true, y_pred, cost=2000, value=40000, save_rate=0.3):\n    y_true = np.asarray(y_true); y_pred = np.asarray(y_pred)\n    tp = int(((y_pred == 1) & (y_true == 1)).sum())\n    contacted = int((y_pred == 1).sum())\n    return save_rate * value * tp - cost * contacted\n\ndef compare_strategies(y, strategies):\n    profits = {name: campaign_profit(y, pred) for name, pred in strategies.items()}\n    best = max(profits, key=profits.get)\n    base_all = campaign_profit(y, np.ones(len(y), dtype=int))\n    beats = profits[best] > base_all and profits[best] > 0\n    return best, profits, bool(beats)\n\ny = churn[\"churned\"]\nstrategies = {\n    \"all\": np.ones(len(churn), dtype=int),\n    \"none\": np.zeros(len(churn), dtype=int),\n    \"no_contract\": (churn[\"has_contract\"] == 0).astype(int),\n    \"calls_2\": (churn[\"support_calls\"] >= 2).astype(int),\n}\nbest, profits, beats = compare_strategies(y, strategies)\nprint(best, profits, beats)\n",
   "hints": [
    "«Барлығына ұсыну» пайдасын <code>np.ones(len(y))</code> арқылы есептеңіз",
    "«Ешкімге ұсынбау» пайдасы әрқашан 0"
   ],
   "check": {
    "tests": "assert set(profits) == {'all', 'none', 'no_contract', 'calls_2'}, f'Төрт стратегия керек, сізде {set(profits)}'\nassert abs(profits['all'] - 660000) < 1e-6 and abs(profits['none']) < 1e-6, 'all = 660 000, none = 0'\nassert abs(profits['no_contract'] - 718000) < 1e-6 and abs(profits['calls_2'] - 526000) < 1e-6, 'no_contract = 718 000, calls_2 = 526 000'\nassert best == 'no_contract' and beats is True, f'Ең тиімдісі no_contract, ол baseline-дан озады. Сізде {best}, {beats}'\n_b2, _p2, _w2 = compare_strategies(y, {'all': strategies['all'], 'calls_5': (churn['support_calls'] >= 5).astype(int)})\nassert _b2 == 'all' and _w2 is False, 'Ең тиімдісі «барлығына ұсыну» болса, baseline-дан озбайды: False'"
   }
  }
 ],
 "cap6-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бос мәндер үлесі",
   "prompt": "<p><code>missing_share(df)</code> жазыңыз: тек бос мәні бар бағандар үшін <code>{баған: бос мәндер үлесі}</code> сөздігін қайтарсын, үлес 3 таңбаға дейін дөңгелектенсін. <code>churn.csv</code> үшін: <code>{\"age\": 0.042, \"data_gb\": 0.028}</code>.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\ndef missing_share(df):\n    return {}\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\ndef missing_share(df):\n    share = df.isna().mean()\n    return {c: round(float(v), 3) for c, v in share.items() if v > 0}\n",
   "hints": [
    "<code>df.isna().mean()</code> әр бағанның бос үлесін береді"
   ],
   "check": {
    "tests": "import pandas as _pd\nassert missing_share(churn) == {'age': 0.042, 'data_gb': 0.028}, f\"{{'age': 0.042, 'data_gb': 0.028}} болуы керек, сізде {missing_share(churn)}\"\nassert missing_share(_pd.DataFrame({'a': [1, None, None, 4], 'b': [1, 2, 3, 4]})) == {'a': 0.5}, 'Бос мәні жоқ баған кірмейді'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жетіспейтін бағандар",
   "prompt": "<p>Жаңа дерек келгенде алдымен бағандарын тексереміз. <code>missing_columns(df, expected)</code> жазыңыз: <code>expected</code> тізіміндегі, бірақ <code>df</code>-та жоқ бағандарды сол ретпен қайтарсын.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\nEXPECTED = ['customer_id', 'city', 'tenure_months', 'monthly_fee', 'support_calls', 'has_contract', 'churned']\n\ndef missing_columns(df, expected):\n    return None\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\nEXPECTED = ['customer_id', 'city', 'tenure_months', 'monthly_fee', 'support_calls', 'has_contract', 'churned']\n\ndef missing_columns(df, expected):\n    return [c for c in expected if c not in df.columns]\n",
   "hints": [
    "<code>[c for c in expected if c not in df.columns]</code>"
   ],
   "check": {
    "tests": "assert missing_columns(churn, EXPECTED) == [], 'churn.csv-та барлық баған бар: []'\n_bad = churn.drop(columns=['monthly_fee', 'city'])\nassert missing_columns(_bad, EXPECTED) == ['city', 'monthly_fee'], f\"['city', 'monthly_fee'] болуы керек (expected реті), сізде {missing_columns(_bad, EXPECTED)}\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Категория мәндері",
   "prompt": "<p>Data contract-қа категориялық бағандардың рұқсат етілген мәндерін жазамыз. <code>categories</code> сөздігін жасаңыз: <code>\"city\"</code> және <code>\"plan\"</code> кілттерінде <code>churn.csv</code>-тағы бірегей мәндердің сұрыпталған тізімі.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\ncategories = {}\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\n\ncategories = {c: sorted(churn[c].dropna().unique().tolist()) for c in [\"city\", \"plan\"]}\nprint(categories)\n",
   "hints": [
    "<code>sorted(churn[\"city\"].unique().tolist())</code>"
   ],
   "check": {
    "tests": "assert categories.get('plan') == ['basic', 'premium', 'standard'], f\"plan: ['basic', 'premium', 'standard'], сізде {categories.get('plan')}\"\nassert categories.get('city') == sorted(['Алматы', 'Астана', 'Шымкент', 'Ақтөбе', 'Қарағанды']), f\"city: 5 қаланың сұрыпталған тізімі, сізде {categories.get('city')}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мән аралығын тексеру",
   "prompt": "<p><code>check_ranges(df, contract)</code> жазыңыз: <code>contract</code> — <code>{баған: (lo, hi)}</code>. Әр баған үшін аралықтан тыс жолдар санын (бос мәндер есептелмейді) <code>{баған: сан}</code> ретінде қайтарсын, тек саны 0-ден көп бағандарды. <code>churn.csv</code> үшін <code>CONTRACT</code> бойынша нәтиже бос сөздік болуы керек.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\nCONTRACT = {'age': (18, 100), 'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef check_ranges(df, contract):\n    return None\n",
   "solution": "import pandas as pd\nimport numpy as np\nchurn = pd.read_csv('churn.csv')\nCONTRACT = {'age': (18, 100), 'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef check_ranges(df, contract):\n    out = {}\n    for col, (lo, hi) in contract.items():\n        s = df[col].dropna()\n        n = int(((s < lo) | (s > hi)).sum())\n        if n:\n            out[col] = n\n    return out\n\nprint(check_ranges(churn, CONTRACT))\n",
   "hints": [
    "Бос мәндерді <code>.dropna()</code> арқылы алып тастаңыз",
    "<code>(s < lo) | (s > hi)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\nassert check_ranges(churn, CONTRACT) == {}, f'churn.csv contract-қа сай: {{}}, сізде {check_ranges(churn, CONTRACT)}'\n_d = _pd.DataFrame({'age': [25, 5, None, 130], 'tenure_months': [1, 2, 3, 4], 'monthly_fee': [0, 5000, 7000, 200000],\n                    'support_calls': [0, 1, 2, 3], 'has_contract': [0, 1, 2, 1]})\nassert check_ranges(_d, CONTRACT) == {'age': 2, 'monthly_fee': 2, 'has_contract': 1}, f\"{{'age': 2, 'monthly_fee': 2, 'has_contract': 1}} болуы керек, сізде {check_ranges(_d, CONTRACT)}\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Stratify тексеру",
   "prompt": "<p>Train/test бөлу кету үлесін сақтады ма? <code>train_rate</code>, <code>test_rate</code> (екі жиындағы <code>churned</code> орташасы) және <code>rate_gap</code> (айырманың абсолют мәні) есептеңіз. Сосын <code>stratify</code>-сыз (<code>random_state=0</code>) бөліп, <code>gap_no_strat</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\n\ntrain_rate = None\ntest_rate = None\nrate_gap = None\ngap_no_strat = None\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\n\ntrain_rate = y_train.mean()\ntest_rate = y_test.mean()\nrate_gap = abs(train_rate - test_rate)\n_a, _b, ya, yb = train_test_split(churn, churn[\"churned\"], test_size=0.25, random_state=0)\ngap_no_strat = abs(ya.mean() - yb.mean())\nprint(train_rate, test_rate, rate_gap, gap_no_strat)\n",
   "hints": [
    "<code>y_train.mean()</code>",
    "<code>train_test_split(..., random_state=0)</code> — stratify параметрінсіз"
   ],
   "check": {
    "tests": "assert train_rate is not None and abs(train_rate - 116 / 450) < 1e-9, f'train_rate = 116 / 450 ≈ 0.258, сізде {train_rate}'\nassert test_rate is not None and abs(test_rate - 0.26) < 1e-9, f'test_rate = 39 / 150 = 0.26, сізде {test_rate}'\nassert rate_gap is not None and rate_gap < 0.005, 'Stratify бар: айырма өте аз'\nfrom sklearn.model_selection import train_test_split as _tts\n_, _, _ya, _yb = _tts(churn, churn['churned'], test_size=0.25, random_state=0)\nassert gap_no_strat is not None and abs(gap_no_strat - abs(_ya.mean() - _yb.mean())) < 1e-9, 'gap_no_strat: stratify жоқ, random_state=0'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Train медианасымен толтыру",
   "prompt": "<p>Бос мәндерді толтырғанда медиананы тек <b>train</b>-нен аламыз (test туралы ақпарат модельге ағып кетпеуі үшін). <code>medians</code> — <code>age</code> және <code>data_gb</code> бағандарының train-дегі медианасы (сөздік). <code>X_test_filled</code> — сол медианалармен толтырылған <code>X_test</code> көшірмесі.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\n\nmedians = {}\nX_test_filled = X_test.copy()\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\n\nmedians = {c: float(X_train[c].median()) for c in [\"age\", \"data_gb\"]}\nX_test_filled = X_test.fillna(medians)\nprint(medians, X_test_filled[[\"age\", \"data_gb\"]].isna().sum().to_dict())\n",
   "hints": [
    "<code>X_train[c].median()</code>",
    "<code>X_test.fillna(medians)</code> жаңа DataFrame қайтарады"
   ],
   "check": {
    "tests": "assert abs(medians.get('age', 0) - X_train['age'].median()) < 1e-9 and abs(medians.get('data_gb', 0) - X_train['data_gb'].median()) < 1e-9, 'Медиана train-нен алынуы керек'\nassert medians['age'] != churn['age'].median() or medians['data_gb'] != churn['data_gb'].median(), 'Бүкіл деректің емес, train-нің медианасы керек'\nassert X_test_filled[['age', 'data_gb']].isna().sum().sum() == 0, 'X_test_filled-те age, data_gb бос болмауы керек'\n_m = X_test['age'].isna()\nassert (X_test_filled.loc[_m, 'age'] == medians['age']).all(), 'Бос age мәндері train медианасымен толтырылуы керек'\nassert X_test['age'].isna().sum() > 0, 'Бастапқы X_test өзгермеуі керек: көшірмемен жұмыс істеңіз'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бір белгілі baseline",
   "prompt": "<p>Қай белгі жалғыз өзі кетуді жақсы болжайды? <code>FEATURES</code>-тің әрқайсысы үшін <code>make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))</code>-ды тек сол бағанда train-де 5-fold CV ROC-AUC бойынша бағалаңыз. <code>single_auc</code> — <code>{белгі: AUC}</code>, <code>best_feature</code> — ең жоғары AUC берген белгі.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\nsingle_auc = {}\nbest_feature = None\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\nsingle_auc = {}\nfor f in FEATURES:\n    pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))\n    single_auc[f] = cross_val_score(pipe, X_train[[f]], y_train, cv=5, scoring=\"roc_auc\").mean()\nbest_feature = max(single_auc, key=single_auc.get)\nprint(single_auc, best_feature)\n",
   "hints": [
    "Бір бағанды DataFrame ретінде беріңіз: <code>X_train[[f]]</code>",
    "<code>cross_val_score(..., cv=5, scoring=\"roc_auc\").mean()</code>"
   ],
   "check": {
    "tests": "assert set(single_auc) == set(FEATURES), 'Әр FEATURES белгісіне бір AUC'\nassert abs(single_auc['tenure_months'] - 0.7478) < 0.005, f\"tenure_months AUC ≈ 0.748 болуы керек, сізде {single_auc['tenure_months']:.4f}\"\nassert abs(single_auc['monthly_fee'] - 0.5315) < 0.005, f\"monthly_fee AUC ≈ 0.532 болуы керек, сізде {single_auc['monthly_fee']:.4f}\"\nassert best_feature == 'tenure_months', f'best_feature = tenure_months, сізде {best_feature}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Baseline кестесі",
   "prompt": "<p>Test жиынында үш нұсқаның ROC-AUC мәнін салыстырыңыз: <code>\"dummy\"</code> — <code>DummyClassifier(strategy=\"most_frequent\")</code>; <code>\"calls_rule\"</code> — модельсіз, тек <code>support_calls</code> мәнін балл ретінде алу; <code>\"compact_lr\"</code> — imputer + scaler + LR, <code>FEATURES</code>-те train-де үйретілген. Нәтижені <code>aucs</code> сөздігіне, ал атауларды AUC кемуі бойынша <code>ranking</code> тізіміне жазыңыз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\n\naucs = {}\nranking = []\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.dummy import DummyClassifier\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\n\ndummy = DummyClassifier(strategy=\"most_frequent\").fit(X_train[FEATURES], y_train)\nlr = make_pipeline(SimpleImputer(strategy=\"median\"), StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_train[FEATURES], y_train)\naucs = {\n    \"dummy\": roc_auc_score(y_test, dummy.predict_proba(X_test[FEATURES])[:, 1]),\n    \"calls_rule\": roc_auc_score(y_test, X_test[\"support_calls\"]),\n    \"compact_lr\": roc_auc_score(y_test, lr.predict_proba(X_test[FEATURES])[:, 1]),\n}\nranking = sorted(aucs, key=aucs.get, reverse=True)\nprint(aucs, ranking)\n",
   "hints": [
    "Балл ретінде бағанның өзін беруге болады: <code>roc_auc_score(y_test, X_test[\"support_calls\"])</code>",
    "<code>sorted(aucs, key=aucs.get, reverse=True)</code>"
   ],
   "check": {
    "tests": "assert set(aucs) == {'dummy', 'calls_rule', 'compact_lr'}, f'Үш кілт керек, сізде {set(aucs)}'\nassert abs(aucs['dummy'] - 0.5) < 1e-9, 'dummy AUC = 0.5'\nassert abs(aucs['calls_rule'] - 0.5726) < 0.002, f\"calls_rule AUC ≈ 0.573 болуы керек, сізде {aucs['calls_rule']:.4f}\"\nassert abs(aucs['compact_lr'] - 0.8165) < 0.004, f\"compact_lr AUC ≈ 0.816 болуы керек, сізде {aucs['compact_lr']:.4f}\"\nassert ranking == ['compact_lr', 'calls_rule', 'dummy'], f\"ranking = ['compact_lr', 'calls_rule', 'dummy'], сізде {ranking}\""
   }
  }
 ],
 "cap6-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Метадерек сөздігі",
   "prompt": "<p><code>make_meta(version, features, threshold, test_auc)</code> жазыңыз: кілттері <code>version</code>, <code>features</code>, <code>threshold</code>, <code>metrics</code> болатын сөздік қайтарсын, мұндағы <code>metrics = {\"test_auc\": test_auc}</code>. <code>features</code> — тізімнің көшірмесі (бастапқы тізім өзгерсе, meta өзгермеуі керек).</p>",
   "starter": "def make_meta(version, features, threshold, test_auc):\n    return {}\n",
   "solution": "def make_meta(version, features, threshold, test_auc):\n    return {\"version\": version, \"features\": list(features), \"threshold\": threshold, \"metrics\": {\"test_auc\": test_auc}}\n",
   "hints": [
    "<code>list(features)</code> жаңа тізім жасайды"
   ],
   "check": {
    "tests": "_f = ['tenure_months', 'monthly_fee']\n_m = make_meta('churn-lr-1.0.0', _f, 0.3, 0.816)\nassert _m == {'version': 'churn-lr-1.0.0', 'features': ['tenure_months', 'monthly_fee'], 'threshold': 0.3, 'metrics': {'test_auc': 0.816}}, f'Метадерек құрылымын тексеріңіз, сізде {_m}'\n_f.append('x')\nassert _m['features'] == ['tenure_months', 'monthly_fee'], 'features көшірме болуы керек: list(features)'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "JSON-ға сақтау",
   "prompt": "<p><code>save_load_json(meta, path)</code> жазыңыз: <code>meta</code>-ны <code>json.dump(..., ensure_ascii=False, indent=2)</code> арқылы <code>path</code> файлына жазып, сосын сол файлды қайта оқып, оқылған сөздікті қайтарсын. Қазақ әріптері файлда <code>\\u</code> кодсыз сақталуы керек.</p>",
   "starter": "import json\n\ndef save_load_json(meta, path):\n    return meta\n",
   "solution": "import json\n\ndef save_load_json(meta, path):\n    with open(path, \"w\", encoding=\"utf-8\") as f:\n        json.dump(meta, f, ensure_ascii=False, indent=2)\n    with open(path, encoding=\"utf-8\") as f:\n        return json.load(f)\n",
   "hints": [
    "<code>with open(path, \"w\", encoding=\"utf-8\") as f:</code>",
    "<code>json.load(f)</code>"
   ],
   "check": {
    "tests": "import os as _os\nif _os.path.exists('meta_practice.json'):\n    _os.remove('meta_practice.json')\n_m = {'version': 'churn-lr-1.0.0', 'owner': 'Дала Мобайл', 'threshold': 0.3}\n_r = save_load_json(_m, 'meta_practice.json')\nassert _r == _m, 'Оқылған сөздік бастапқысымен бірдей болуы керек'\nassert _os.path.exists('meta_practice.json'), 'Файл жазылуы керек'\n_txt = open('meta_practice.json', encoding='utf-8').read()\nassert 'Дала Мобайл' in _txt, 'ensure_ascii=False: қазақ әріптері файлда өз күйінде сақталуы керек'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нұсқа нөмірін көтеру",
   "prompt": "<p>Модель нұсқасы <code>\"churn-lr-MAJOR.MINOR.PATCH\"</code> түрінде. <code>bump_version(version, part)</code> жазыңыз: <code>part</code> — <code>\"major\"</code>, <code>\"minor\"</code> немесе <code>\"patch\"</code>; сол бөлікті 1-ге көбейтіп, одан кейінгілерін нөлдейді. Мысалы, <code>bump_version(\"churn-lr-1.0.3\", \"minor\")</code> → <code>\"churn-lr-1.1.0\"</code>.</p>",
   "starter": "def bump_version(version, part):\n    return version\n",
   "solution": "def bump_version(version, part):\n    prefix, nums = version.rsplit(\"-\", 1)\n    major, minor, patch = map(int, nums.split(\".\"))\n    if part == \"major\":\n        major, minor, patch = major + 1, 0, 0\n    elif part == \"minor\":\n        minor, patch = minor + 1, 0\n    else:\n        patch += 1\n    return f\"{prefix}-{major}.{minor}.{patch}\"\n",
   "hints": [
    "<code>version.rsplit(\"-\", 1)</code> соңғы сызықшадан бөледі"
   ],
   "check": {
    "tests": "assert bump_version('churn-lr-1.0.3', 'minor') == 'churn-lr-1.1.0', f'churn-lr-1.1.0 болуы керек, сізде {bump_version(\"churn-lr-1.0.3\", \"minor\")}'\nassert bump_version('churn-lr-1.0.3', 'patch') == 'churn-lr-1.0.4', 'patch: 1.0.3 → 1.0.4'\nassert bump_version('churn-lr-1.4.2', 'major') == 'churn-lr-2.0.0', 'major: 1.4.2 → 2.0.0'\nassert bump_version('churn-lr-1.9.0', 'minor') == 'churn-lr-1.10.0', '9-дан кейін 10: 1.10.0'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Метадеректі тексеру",
   "prompt": "<p>Сервис іске қосылғанда метадеректі тексереді. <code>check_meta(meta)</code> жазыңыз: қателер тізімін қайтарсын. <code>REQUIRED</code> кілттерінің әрқайсысы жоқ болса — <code>\"{кілт}: missing\"</code>; <code>threshold</code> бар, бірақ 0…1 аралығындағы сан емес болса — <code>\"threshold: invalid\"</code>; <code>features</code> бар, бірақ бос тізім болса — <code>\"features: empty\"</code>.</p>",
   "starter": "REQUIRED = ['version', 'features', 'threshold', 'metrics']\n\ndef check_meta(meta):\n    return []\n",
   "solution": "REQUIRED = ['version', 'features', 'threshold', 'metrics']\n\ndef check_meta(meta):\n    errors = [f'{k}: missing' for k in REQUIRED if k not in meta]\n    t = meta.get('threshold')\n    if 'threshold' in meta and (isinstance(t, bool) or not isinstance(t, (int, float)) or not 0 <= t <= 1):\n        errors.append('threshold: invalid')\n    if 'features' in meta and not meta['features']:\n        errors.append('features: empty')\n    return errors\n",
   "hints": [
    "Алдымен жоқ кілттерді, сосын мәндерді тексеріңіз"
   ],
   "check": {
    "tests": "_ok = {'version': 'churn-lr-1.0.0', 'features': ['tenure_months'], 'threshold': 0.3, 'metrics': {}}\nassert check_meta(_ok) == [], f'Дұрыс meta үшін бос тізім, сізде {check_meta(_ok)}'\nassert check_meta({'features': ['a'], 'threshold': 0.5}) == ['version: missing', 'metrics: missing'], 'Жоқ кілттер REQUIRED ретімен'\nassert check_meta(dict(_ok, threshold=1.5)) == ['threshold: invalid'], 'threshold > 1: invalid'\nassert check_meta(dict(_ok, threshold='0.3')) == ['threshold: invalid'], 'Мәтін threshold: invalid'\nassert check_meta(dict(_ok, features=[])) == ['features: empty'], 'Бос features: empty'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Pickle арқылы көшіру",
   "prompt": "<p>Модельді <code>pickle.dumps</code> арқылы байттарға айналдырып, <code>pickle.loads</code> арқылы қайта жүктеңіз: <code>loaded</code>. <code>n_bytes</code> — байттар саны, <code>same</code> — <code>X_test[FEATURES]</code>-те екі модельдің <code>predict_proba</code> нәтижелері бірдей ме (<code>np.allclose</code>, bool).</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nimport pickle\n\nloaded = None\nn_bytes = 0\nsame = False\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nimport pickle\n\nblob = pickle.dumps(model)\nn_bytes = len(blob)\nloaded = pickle.loads(blob)\nsame = bool(np.allclose(model.predict_proba(X_test[FEATURES]), loaded.predict_proba(X_test[FEATURES])))\nprint(n_bytes, same)\n",
   "hints": [
    "<code>blob = pickle.dumps(model)</code>, <code>len(blob)</code>"
   ],
   "check": {
    "tests": "assert loaded is not None and loaded is not model, 'loaded — pickle.loads нәтижесі (жаңа объект)'\nassert n_bytes > 100, f'n_bytes — байттар саны, сізде {n_bytes}'\nassert same is True, 'Жүктелген модель бірдей ықтималдық беруі керек'\nassert hasattr(loaded, 'predict_proba') and list(loaded.feature_names_in_) == FEATURES, 'Бүкіл pipeline сақталуы керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Training-serving skew",
   "prompt": "<p>Ноутбукта <code>monthly_fee</code>-ді мың теңгеге бөліп үйреттік (<code>model_k</code>), ал API теңгемен жібереді. <code>p_right</code> — X_test-ке дұрыс өңдеумен (fee / 1000) ықтималдықтар, <code>p_skew</code> — өңдеусіз (теңгемен) ықтималдықтар. <code>skew</code> — олардың орташа абсолют айырмасы, <code>flipped</code> — <code>will_churn</code> шешімі (<code>p ≥ 0.3</code>) өзгерген абоненттер үлесі.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nXk_train = X_train[FEATURES].copy()\nXk_train['monthly_fee'] = Xk_train['monthly_fee'] / 1000\nmodel_k = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000)).fit(Xk_train, y_train)\n\np_right = None\np_skew = None\nskew = None\nflipped = None\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nXk_train = X_train[FEATURES].copy()\nXk_train['monthly_fee'] = Xk_train['monthly_fee'] / 1000\nmodel_k = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000)).fit(Xk_train, y_train)\n\nXk_test = X_test[FEATURES].copy()\nXk_test['monthly_fee'] = Xk_test['monthly_fee'] / 1000\np_right = model_k.predict_proba(Xk_test)[:, 1]\np_skew = model_k.predict_proba(X_test[FEATURES])[:, 1]\nskew = float(np.mean(np.abs(p_right - p_skew)))\nflipped = float(np.mean((p_right >= THRESHOLD) != (p_skew >= THRESHOLD)))\nprint(skew, flipped)\n",
   "hints": [
    "Test-ке де үйретудегідей өңдеу: <code>Xk_test[\"monthly_fee\"] / 1000</code>",
    "<code>(p_right >= THRESHOLD) != (p_skew >= THRESHOLD)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_Xt = X_test[FEATURES].copy(); _Xt['monthly_fee'] = _Xt['monthly_fee'] / 1000\n_pr = model_k.predict_proba(_Xt)[:, 1]; _ps = model_k.predict_proba(X_test[FEATURES])[:, 1]\nassert p_right is not None and _np.allclose(p_right, _pr), 'p_right: X_test-те fee / 1000'\nassert p_skew is not None and _np.allclose(p_skew, _ps), 'p_skew: X_test[FEATURES] өңдеусіз'\nassert skew is not None and abs(skew - _np.mean(_np.abs(_pr - _ps))) < 1e-9 and skew > 0.1, f'skew — орташа абсолют айырма, ол үлкен болуы керек, сізде {skew}'\nassert flipped is not None and abs(flipped - _np.mean((_pr >= 0.3) != (_ps >= 0.3))) < 1e-9, 'flipped — шешімі өзгерген үлес'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шешім ағашы кандидаты",
   "prompt": "<p>Үшінші кандидат: <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> <code>FEATURES</code>-те (ағашқа scaler керек емес). Train-де 5-fold CV ROC-AUC бойынша <code>cv_tree</code> мен <code>cv_compact</code> (imputer + scaler + LR) есептеңіз. <code>chosen</code> — жеңген модель атауы (<code>\"tree\"</code> немесе <code>\"compact\"</code>). Жеңгенін бүкіл train-де үйретіп, <code>final_model</code> деп атап, <code>test_auc</code> есептеңіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import roc_auc_score\n\ncv_tree = 0\ncv_compact = 0\nchosen = None\nfinal_model = None\ntest_auc = 0\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.model_selection import cross_val_score\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import roc_auc_score\n\ncands = {\n    \"tree\": DecisionTreeClassifier(max_depth=3, random_state=0),\n    \"compact\": make_pipeline(SimpleImputer(strategy=\"median\"), StandardScaler(), LogisticRegression(max_iter=1000)),\n}\nscores = {n: cross_val_score(m, X_train[FEATURES], y_train, cv=5, scoring=\"roc_auc\").mean() for n, m in cands.items()}\ncv_tree, cv_compact = scores[\"tree\"], scores[\"compact\"]\nchosen = max(scores, key=scores.get)\nfinal_model = cands[chosen].fit(X_train[FEATURES], y_train)\ntest_auc = roc_auc_score(y_test, final_model.predict_proba(X_test[FEATURES])[:, 1])\nprint(scores, chosen, test_auc)\n",
   "hints": [
    "Кандидаттарды сөздікке салып, бір циклмен бағалаңыз",
    "<code>max(scores, key=scores.get)</code>"
   ],
   "check": {
    "tests": "assert abs(cv_tree - 0.7808) < 0.01, f'cv_tree ≈ 0.781 болуы керек, сізде {cv_tree:.4f}'\nassert abs(cv_compact - 0.8134) < 0.003, f'cv_compact ≈ 0.813 болуы керек, сізде {cv_compact:.4f}'\nassert chosen == 'compact', f'CV бойынша compact жеңеді, сізде {chosen}'\nassert final_model is not None and hasattr(final_model, 'predict_proba') and final_model.n_features_in_ == 4, 'final_model — FEATURES-те үйретілген жеңімпаз'\nassert abs(test_auc - 0.8165) < 0.004, f'test_auc ≈ 0.816 болуы керек, сізде {test_auc:.4f}'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Artifact жинағы",
   "prompt": "<p><code>save_artifact(model, meta, folder)</code> жазыңыз: <code>os.makedirs(folder, exist_ok=True)</code>, ішіне <code>model.pkl</code> (pickle) және <code>meta.json</code> жазады. <code>load_artifact(folder)</code> екеуін оқып, <code>(model, meta)</code> қайтарады, бірақ <code>meta[\"features\"]</code> модельдің <code>feature_names_in_</code> тізімімен сәйкес келмесе <code>ValueError</code> тудырады (training-serving skew-тен қорғау).</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nimport os, json, pickle\n\ndef save_artifact(model, meta, folder):\n    pass\n\ndef load_artifact(folder):\n    return None, None\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nimport os, json, pickle\n\ndef save_artifact(model, meta, folder):\n    os.makedirs(folder, exist_ok=True)\n    with open(os.path.join(folder, \"model.pkl\"), \"wb\") as f:\n        pickle.dump(model, f)\n    with open(os.path.join(folder, \"meta.json\"), \"w\", encoding=\"utf-8\") as f:\n        json.dump(meta, f, ensure_ascii=False, indent=2)\n\ndef load_artifact(folder):\n    with open(os.path.join(folder, \"model.pkl\"), \"rb\") as f:\n        m = pickle.load(f)\n    with open(os.path.join(folder, \"meta.json\"), encoding=\"utf-8\") as f:\n        meta = json.load(f)\n    if list(meta.get(\"features\", [])) != list(m.feature_names_in_):\n        raise ValueError(\"features сәйкес емес\")\n    return m, meta\n",
   "hints": [
    "<code>os.path.join(folder, \"model.pkl\")</code>",
    "Pipeline-да <code>feature_names_in_</code> бар — DataFrame-де үйретілгендіктен"
   ],
   "check": {
    "tests": "import numpy as _np, os as _os\n_meta = {'version': MODEL_VERSION, 'features': FEATURES, 'threshold': THRESHOLD}\nsave_artifact(model, _meta, 'artifact_practice')\nassert _os.path.exists('artifact_practice/model.pkl') and _os.path.exists('artifact_practice/meta.json'), 'Папкада model.pkl және meta.json болуы керек'\n_m, _mt = load_artifact('artifact_practice')\nassert _mt == _meta, 'meta дұрыс оқылуы керек'\nassert _np.allclose(_m.predict_proba(X_test[FEATURES]), model.predict_proba(X_test[FEATURES])), 'Жүктелген модель бірдей нәтиже беруі керек'\nsave_artifact(model, dict(_meta, features=['monthly_fee', 'tenure_months', 'support_calls', 'has_contract']), 'artifact_bad')\ntry:\n    load_artifact('artifact_bad')\n    _raised = False\nexcept ValueError:\n    _raised = True\nassert _raised, 'features реті немесе құрамы сәйкес келмесе ValueError керек'"
   }
  }
 ],
 "cap6-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Health endpoint",
   "prompt": "<p><code>health(meta)</code> жазыңыз: <code>/health</code> endpoint-і сияқты <code>(200, {\"status\": \"ok\", \"model_version\": meta[\"version\"]})</code> қайтарсын. <code>meta</code>-да <code>version</code> жоқ болса — <code>(500, {\"status\": \"error\"})</code>.</p>",
   "starter": "def health(meta):\n    pass\n",
   "solution": "def health(meta):\n    if \"version\" not in meta:\n        return 500, {\"status\": \"error\"}\n    return 200, {\"status\": \"ok\", \"model_version\": meta[\"version\"]}\n",
   "hints": [
    "Кортеж қайтарыңыз: <code>return 200, {...}</code>"
   ],
   "check": {
    "tests": "assert health({'version': 'churn-lr-1.0.0'}) == (200, {'status': 'ok', 'model_version': 'churn-lr-1.0.0'}), 'Дұрыс жауап: (200, {status: ok, model_version: ...})'\nassert health({}) == (500, {'status': 'error'}), 'version жоқ болса: (500, {status: error})'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сан ба, bool па",
   "prompt": "<p><code>is_number(v)</code> жазыңыз: <code>v</code> — <code>int</code> немесе <code>float</code> болса <code>True</code>, бірақ <code>bool</code> (True/False) болса <code>False</code>. Мәтін <code>\"12\"</code> де — <code>False</code>. Python-да <code>isinstance(True, int)</code> → <code>True</code> екенін ұмытпаңыз.</p>",
   "starter": "def is_number(v):\n    return isinstance(v, (int, float))\n",
   "solution": "def is_number(v):\n    return not isinstance(v, bool) and isinstance(v, (int, float))\n",
   "hints": [
    "Алдымен bool-ды тексеріңіз: <code>isinstance(v, bool)</code>"
   ],
   "check": {
    "tests": "assert is_number(5) and is_number(6500.0), 'int мен float — сан'\nassert is_number(True) is False and is_number(False) is False, 'bool сан ретінде қабылданбайды'\nassert is_number('12') is False and is_number(None) is False, 'Мәтін мен None — сан емес'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жоқ өрістер",
   "prompt": "<p><code>missing_fields(payload, required)</code> жазыңыз: <code>required</code> тізіміндегі, бірақ <code>payload</code> сөздігінде жоқ өрістерді сол ретпен қайтарсын. Мысалы, <code>{\"tenure_months\": 5}</code> және FEATURES → <code>[\"monthly_fee\", \"support_calls\", \"has_contract\"]</code>.</p>",
   "starter": "FEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n\ndef missing_fields(payload, required):\n    return None\n",
   "solution": "FEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n\ndef missing_fields(payload, required):\n    return [f for f in required if f not in payload]\n",
   "hints": [
    "<code>[f for f in required if f not in payload]</code>"
   ],
   "check": {
    "tests": "assert missing_fields({'tenure_months': 5}, FEATURES) == ['monthly_fee', 'support_calls', 'has_contract'], 'Үш өріс жетіспейді'\nassert missing_fields({'tenure_months': 5, 'monthly_fee': 1, 'support_calls': 0, 'has_contract': 1, 'customer_id': 'A'}, FEATURES) == [], 'Барлығы бар, артық өріс еленбейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сұраудан DataFrame",
   "prompt": "<p><code>to_frame(payload, features)</code> жазыңыз: бір жолды DataFrame қайтарсын, бағандары дәл <code>features</code> ретімен, артық өрістер (<code>customer_id</code>) кірмейді. Модель бағандар ретіне сезімтал: рет бұзылса, training-serving skew болады.</p>",
   "starter": "import pandas as pd\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n\ndef to_frame(payload, features):\n    return pd.DataFrame([payload])\n",
   "solution": "import pandas as pd\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\n\ndef to_frame(payload, features):\n    return pd.DataFrame([{f: payload[f] for f in features}], columns=features)\n",
   "hints": [
    "<code>{f: payload[f] for f in features}</code>"
   ],
   "check": {
    "tests": "_p = {'has_contract': 0, 'customer_id': 'A-17', 'support_calls': 3, 'monthly_fee': 6500, 'tenure_months': 5}\n_df = to_frame(_p, FEATURES)\nassert list(_df.columns) == FEATURES, f'Бағандар реті FEATURES-пен бірдей болуы керек, сізде {list(_df.columns)}'\nassert len(_df) == 1 and _df.iloc[0]['monthly_fee'] == 6500, 'Бір жол, мәндер сақталады'\nassert 'customer_id' not in _df.columns, 'Артық өріс кірмеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тәуекел деңгейі",
   "prompt": "<p>Оператор экранында сан емес, деңгей көрінеді. Модель, <code>validate</code>, <code>predict_endpoint</code> дайын. <code>risk_level(proba)</code>: <code>&lt; 0.3</code> → <code>\"low\"</code>, <code>&lt; 0.6</code> → <code>\"medium\"</code>, әйтпесе <code>\"high\"</code>. <code>predict_with_risk(payload)</code>: <code>predict_endpoint</code> нәтижесі 200 болса, жауапқа <code>\"risk\"</code> кілтін қосып қайтарсын; 422 болса өзгеріссіз.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {'errors': errors}\n    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n    proba = float(model.predict_proba(row)[0, 1])\n    return 200, {'churn_proba': round(proba, 4), 'will_churn': proba >= THRESHOLD, 'model_version': MODEL_VERSION}\n\ndef risk_level(proba):\n    pass\n\ndef predict_with_risk(payload):\n    return predict_endpoint(payload)\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {'errors': errors}\n    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n    proba = float(model.predict_proba(row)[0, 1])\n    return 200, {'churn_proba': round(proba, 4), 'will_churn': proba >= THRESHOLD, 'model_version': MODEL_VERSION}\n\ndef risk_level(proba):\n    if proba < 0.3:\n        return \"low\"\n    if proba < 0.6:\n        return \"medium\"\n    return \"high\"\n\ndef predict_with_risk(payload):\n    status, body = predict_endpoint(payload)\n    if status == 200:\n        body = dict(body, risk=risk_level(body[\"churn_proba\"]))\n    return status, body\n",
   "hints": [
    "<code>dict(body, risk=...)</code> жаңа сөздік жасайды"
   ],
   "check": {
    "tests": "assert risk_level(0.1) == 'low' and risk_level(0.3) == 'medium' and risk_level(0.59) == 'medium' and risk_level(0.6) == 'high', 'Шекаралар: < 0.3 low, < 0.6 medium, қалғаны high'\n_s, _b = predict_with_risk({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})\nassert _s == 200 and _b.get('risk') == risk_level(_b['churn_proba']), 'Жауапта risk болуы керек'\nassert {'churn_proba', 'will_churn', 'model_version'} <= set(_b), 'Бұрынғы кілттер сақталуы керек'\n_s2, _b2 = predict_with_risk({'tenure_months': 5})\nassert _s2 == 422 and 'risk' not in _b2, '422 жауабы өзгермейді'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Batch endpoint",
   "prompt": "<p>Түнгі скоринг үшін <code>predict_batch(payloads)</code> жазыңыз: <code>(200, {\"results\": [...]})</code> қайтарсын. Әр элемент үшін: <code>validate</code> қате берсе <code>{\"errors\": [...]}</code>, әйтпесе <code>{\"churn_proba\": round(proba, 4), \"will_churn\": proba ≥ THRESHOLD}</code>. Дұрыс жолдарды модельге <b>бір DataFrame-мен</b> бірге жіберіңіз. <code>payloads</code> тізім болмаса — <code>(422, {\"errors\": [\"payloads: list болуы керек\"]})</code>.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_batch(payloads):\n    return 200, {\"results\": []}\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_batch(payloads):\n    if not isinstance(payloads, list):\n        return 422, {\"errors\": [\"payloads: list болуы керек\"]}\n    results = [None] * len(payloads)\n    good = []\n    for i, p in enumerate(payloads):\n        errs = validate(p)\n        if errs:\n            results[i] = {\"errors\": errs}\n        else:\n            good.append(i)\n    if good:\n        df = pd.DataFrame([{f: payloads[i][f] for f in FEATURES} for i in good])\n        probas = model.predict_proba(df)[:, 1]\n        for i, pr in zip(good, probas):\n            results[i] = {\"churn_proba\": round(float(pr), 4), \"will_churn\": bool(pr >= THRESHOLD)}\n    return 200, {\"results\": results}\n",
   "hints": [
    "Алдымен бәрін тексеріп, дұрыс индекстерді жинаңыз",
    "Модельді бір рет шақырыңыз: <code>model.predict_proba(df)</code>"
   ],
   "check": {
    "tests": "import pandas as _pd\n_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}\n_ok2 = {'tenure_months': 60, 'monthly_fee': 3000, 'support_calls': 0, 'has_contract': 1}\n_s, _b = predict_batch([_ok, {'tenure_months': 5}, _ok2])\nassert _s == 200 and len(_b['results']) == 3, 'Әр сұрауға бір нәтиже, реті сақталады'\nassert 'errors' in _b['results'][1] and any('monthly_fee' in e for e in _b['results'][1]['errors']), 'Қате элементте errors болуы керек'\n_p = model.predict_proba(_pd.DataFrame([_ok, _ok2])[FEATURES])[:, 1]\nassert abs(_b['results'][0]['churn_proba'] - round(float(_p[0]), 4)) < 1e-9 and abs(_b['results'][2]['churn_proba'] - round(float(_p[1]), 4)) < 1e-9, 'churn_proba = round(proba, 4)'\nassert _b['results'][2]['will_churn'] == bool(_p[1] >= THRESHOLD), 'will_churn = proba >= THRESHOLD'\nassert predict_batch({'a': 1})[0] == 422, 'Тізім емес кіріс үшін 422'\nassert predict_batch([]) == (200, {'results': []}), 'Бос тізім: бос нәтиже'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сервис қатесі: 500",
   "prompt": "<p><code>safe_endpoint(payload)</code> жазыңыз: клиент қатесі (validate) болса <code>(422, {\"errors\": [...]})</code>; модель шақыру кезінде кез келген exception болса — <code>(500, {\"error\": \"internal\"})</code> (клиентті кінәламаймыз); әйтпесе <code>predict_endpoint</code>-тегідей <code>(200, {...})</code>. Тексеруші <code>model</code>-ді әдейі бұзылған объектіге ауыстырып көреді.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef safe_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {\"errors\": errors}\n    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n    proba = float(model.predict_proba(row)[0, 1])\n    return 200, {\"churn_proba\": round(proba, 4), \"will_churn\": proba >= THRESHOLD, \"model_version\": MODEL_VERSION}\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef safe_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {\"errors\": errors}\n    try:\n        row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n        proba = float(model.predict_proba(row)[0, 1])\n    except Exception:\n        return 500, {\"error\": \"internal\"}\n    return 200, {\"churn_proba\": round(proba, 4), \"will_churn\": proba >= THRESHOLD, \"model_version\": MODEL_VERSION}\n",
   "hints": [
    "Модель шақыруын <code>try / except Exception</code> ішіне алыңыз",
    "Валидация try-дан тыс қалсын: ол 422 береді"
   ],
   "check": {
    "tests": "_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}\n_s, _b = safe_endpoint(_ok)\nassert _s == 200 and 0 <= _b['churn_proba'] <= 1, 'Дұрыс сұрау: 200'\nassert safe_endpoint({'tenure_months': -1})[0] == 422, 'Клиент қатесі: 422'\nclass _Broken:\n    def predict_proba(self, X):\n        raise RuntimeError('model file corrupted')\n_real = model\nmodel = _Broken()\ntry:\n    _r = safe_endpoint(_ok)\nfinally:\n    model = _real\nassert _r == (500, {'error': 'internal'}), f'Модель құласа (500, {{error: internal}}) болуы керек, сізде {_r}'\nassert safe_endpoint({'tenure_months': 'x'})[0] == 422, 'Валидация модельден бұрын: 422'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ұсынысты есептейтін endpoint",
   "prompt": "<p><code>predict_offer(payload)</code> жазыңыз: <code>predict_endpoint</code> 422 берсе, соны қайтарыңыз. Әйтпесе жауапқа екі кілт қосыңыз: <code>expected_gain</code> = <code>round(proba · 0.3 · 40 000 − 2 000)</code> (₸, бүтін сан; proba — дөңгелектелген <code>churn_proba</code>) және <code>offer</code> = <code>will_churn</code> және <code>expected_gain &gt; 0</code>. Мысалы, proba 0.8427 → gain = 8 112.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {'errors': errors}\n    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n    proba = float(model.predict_proba(row)[0, 1])\n    return 200, {'churn_proba': round(proba, 4), 'will_churn': proba >= THRESHOLD, 'model_version': MODEL_VERSION}\n\ndef predict_offer(payload):\n    return predict_endpoint(payload)\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {'errors': errors}\n    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n    proba = float(model.predict_proba(row)[0, 1])\n    return 200, {'churn_proba': round(proba, 4), 'will_churn': proba >= THRESHOLD, 'model_version': MODEL_VERSION}\n\ndef predict_offer(payload):\n    status, body = predict_endpoint(payload)\n    if status != 200:\n        return status, body\n    gain = round(body[\"churn_proba\"] * 0.3 * 40000 - 2000)\n    return 200, dict(body, expected_gain=gain, offer=bool(body[\"will_churn\"] and gain > 0))\n",
   "hints": [
    "0.3 · 40 000 = 12 000: сақталған абоненттің күтілетін құны",
    "<code>dict(body, expected_gain=..., offer=...)</code>"
   ],
   "check": {
    "tests": "_s, _b = predict_offer({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})\nassert _s == 200 and 'expected_gain' in _b and 'offer' in _b, 'Жауапта expected_gain және offer болуы керек'\nassert _b['expected_gain'] == round(_b['churn_proba'] * 12000 - 2000), 'expected_gain = round(proba · 12 000 − 2 000)'\nassert _b['offer'] == (_b['will_churn'] and _b['expected_gain'] > 0), 'offer = will_churn және gain > 0'\n_s2, _b2 = predict_offer({'tenure_months': 70, 'monthly_fee': 3000, 'support_calls': 0, 'has_contract': 1})\nassert _s2 == 200 and _b2['offer'] is False, 'Қауіпі төмен абонентке ұсыныс берілмейді'\nassert predict_offer({'tenure_months': 5})[0] == 422, 'Валидация қатесі: 422'"
   }
  }
 ],
 "cap6-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "P95 latency",
   "prompt": "<p><code>latency_stats(ms)</code> жазыңыз: сұрау уақыттарынан (миллисекунд) <code>{\"p50\": ..., \"p95\": ..., \"max\": ...}</code> сөздігін қайтарсын (<code>np.percentile</code>, float). Мысалы, 1-ден 100-ге дейінгі сандар үшін p95 = 95.05.</p>",
   "starter": "import numpy as np\n\ndef latency_stats(ms):\n    return {}\n",
   "solution": "import numpy as np\n\ndef latency_stats(ms):\n    return {\"p50\": float(np.percentile(ms, 50)), \"p95\": float(np.percentile(ms, 95)), \"max\": float(np.max(ms))}\n",
   "hints": [
    "<code>np.percentile(ms, 95)</code>"
   ],
   "check": {
    "tests": "_r = latency_stats(list(range(1, 101)))\nassert abs(_r.get('p50', 0) - 50.5) < 1e-9 and abs(_r.get('p95', 0) - 95.05) < 1e-9, f'p50 = 50.5, p95 = 95.05, сізде {_r}'\nassert _r.get('max') == 100, 'max = 100'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қате үлестері",
   "prompt": "<p><code>error_rates(codes)</code> жазыңыз: HTTP статус кодтарының тізімінен <code>{\"4xx\": үлес, \"5xx\": үлес}</code> қайтарсын (400–499 және 500–599). Бос тізім үшін екеуі де 0.0. Мысалы, <code>[200, 200, 422, 500]</code> → <code>{\"4xx\": 0.25, \"5xx\": 0.25}</code>.</p>",
   "starter": "def error_rates(codes):\n    return {}\n",
   "solution": "def error_rates(codes):\n    n = len(codes)\n    if n == 0:\n        return {\"4xx\": 0.0, \"5xx\": 0.0}\n    return {\"4xx\": sum(400 <= c < 500 for c in codes) / n, \"5xx\": sum(500 <= c < 600 for c in codes) / n}\n",
   "hints": [
    "<code>sum(400 <= c < 500 for c in codes)</code>"
   ],
   "check": {
    "tests": "assert error_rates([200, 200, 422, 500]) == {'4xx': 0.25, '5xx': 0.25}, 'Әрқайсысы 1/4'\nassert error_rates([200] * 9 + [503]) == {'4xx': 0.0, '5xx': 0.1}, '503 — 5xx'\nassert error_rates([]) == {'4xx': 0.0, '5xx': 0.0}, 'Бос тізім: 0.0'"
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Болжамдар таралуы",
   "prompt": "<p>Болжамдардың өзі де мониторингте бақыланады. <code>prediction_stats(probas, threshold=0.3)</code> жазыңыз: <code>{\"mean_proba\": орташа, \"churn_share\": proba ≥ threshold үлесі}</code>, екеуі де 3 таңбаға дөңгелектенген.</p>",
   "starter": "import numpy as np\n\ndef prediction_stats(probas, threshold=0.3):\n    return {}\n",
   "solution": "import numpy as np\n\ndef prediction_stats(probas, threshold=0.3):\n    p = np.asarray(probas, dtype=float)\n    return {\"mean_proba\": round(float(p.mean()), 3), \"churn_share\": round(float((p >= threshold).mean()), 3)}\n",
   "hints": [
    "<code>(p >= threshold).mean()</code>"
   ],
   "check": {
    "tests": "assert prediction_stats([0.1, 0.2, 0.5, 0.9]) == {'mean_proba': 0.425, 'churn_share': 0.5}, 'mean = 0.425, ≥ 0.3 үлесі = 0.5'\nassert prediction_stats([0.1, 0.2, 0.5, 0.9], threshold=0.6) == {'mean_proba': 0.425, 'churn_share': 0.25}, 'threshold параметрін қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Үлестерден PSI",
   "prompt": "<p>Bin үлестері дайын болса, PSI-ды тікелей есептеуге болады. <code>psi_from_shares(e, a)</code> жазыңыз: екеуін де <code>np.clip(..., 1e-4, None)</code> арқылы шектеп, <code>Σ (a − e) · ln(a / e)</code> қайтарсын. Мысалы, <code>e = [0.25, 0.25, 0.25, 0.25]</code>, <code>a = [0.1, 0.2, 0.3, 0.4]</code> → ≈ 0.228 (watch).</p>",
   "starter": "import numpy as np\n\ndef psi_from_shares(e, a):\n    return 0.0\n",
   "solution": "import numpy as np\n\ndef psi_from_shares(e, a):\n    e = np.clip(np.asarray(e, dtype=float), 1e-4, None)\n    a = np.clip(np.asarray(a, dtype=float), 1e-4, None)\n    return float(np.sum((a - e) * np.log(a / e)))\n",
   "hints": [
    "<code>np.sum((a - e) * np.log(a / e))</code>"
   ],
   "check": {
    "tests": "assert abs(psi_from_shares([0.25] * 4, [0.1, 0.2, 0.3, 0.4]) - 0.2282) < 1e-3, 'PSI ≈ 0.228 болуы керек'\nassert abs(psi_from_shares([0.5, 0.5], [0.5, 0.5])) < 1e-12, 'Бірдей үлестер: 0'\nimport numpy as _np\nassert _np.isfinite(psi_from_shares([0.5, 0.5], [1.0, 0.0])), 'Нөл үлесте inf болмауы керек: np.clip'"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Келісімшарт тесті",
   "prompt": "<p>Сервис дайын. pytest стиліндегі <code>test_contract_lowers_risk()</code> жазыңыз: басқа өрістер бірдей, <code>has_contract</code> 0 мен 1 болатын екі сұрау жіберіп, екеуінің статусы 200 екенін және келісімшарты бар абоненттің <code>churn_proba</code>-сы <b>қатаң кіші</b> екенін <code>assert</code> арқылы тексерсін. Тексеруші тестті дұрыс сервисте және бұзылған нұсқаларда іске қосады.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {'errors': errors}\n    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n    proba = float(model.predict_proba(row)[0, 1])\n    return 200, {'churn_proba': round(proba, 4), 'will_churn': proba >= THRESHOLD, 'model_version': MODEL_VERSION}\n\ndef test_contract_lowers_risk():\n    pass\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nRULES = {'tenure_months': (0, 600), 'monthly_fee': (1, 100000), 'support_calls': (0, 100), 'has_contract': (0, 1)}\n\ndef validate(payload):\n    if not isinstance(payload, dict):\n        return ['payload: JSON object болуы керек']\n    errors = []\n    for name, (lo, hi) in RULES.items():\n        if name not in payload:\n            errors.append(f'{name}: missing')\n            continue\n        v = payload[name]\n        if isinstance(v, bool) or not isinstance(v, (int, float)):\n            errors.append(f'{name}: сан болуы керек')\n        elif not (lo <= v <= hi):\n            errors.append(f'{name}: out of range [{lo}, {hi}]')\n    return errors\n\ndef predict_endpoint(payload):\n    errors = validate(payload)\n    if errors:\n        return 422, {'errors': errors}\n    row = pd.DataFrame([{f: payload[f] for f in FEATURES}])\n    proba = float(model.predict_proba(row)[0, 1])\n    return 200, {'churn_proba': round(proba, 4), 'will_churn': proba >= THRESHOLD, 'model_version': MODEL_VERSION}\n\ndef test_contract_lowers_risk():\n    base = {'tenure_months': 12, 'monthly_fee': 6000, 'support_calls': 2}\n    s0, b0 = predict_endpoint(dict(base, has_contract=0))\n    s1, b1 = predict_endpoint(dict(base, has_contract=1))\n    assert s0 == 200 and s1 == 200\n    assert b1['churn_proba'] < b0['churn_proba']\n",
   "hints": [
    "<code>dict(base, has_contract=0)</code> және <code>dict(base, has_contract=1)</code>",
    "Екі assert: статус және proba салыстыру"
   ],
   "check": {
    "tests": "test_contract_lowers_risk()\ndef _breaks(_fn):\n    try:\n        _fn()\n    except Exception:\n        return True\n    return False\n_real = predict_endpoint\npredict_endpoint = lambda p: (200, {'churn_proba': 0.5, 'will_churn': True, 'model_version': MODEL_VERSION})\nassert _breaks(test_contract_lowers_risk), 'Тұрақты 0.5 қайтаратын сервисті тест ұстауы керек (proba қатаң кіші)'\npredict_endpoint = lambda p: (200, {'churn_proba': 0.2 + 0.5 * p.get('has_contract', 0), 'will_churn': True, 'model_version': MODEL_VERSION})\nassert _breaks(test_contract_lowers_risk), 'Келісімшарт қауіпті арттыратын сервисті тест ұстауы керек'\npredict_endpoint = lambda p: (422, {'errors': ['x']})\nassert _breaks(test_contract_lowers_risk), 'Әрқашан 422 беретін сервисті тест ұстауы керек (status == 200)'\npredict_endpoint = _real"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Quality gate",
   "prompt": "<p>CI-да merge алдында сапа тексеріледі. <code>quality_gate(model, X, y, min_auc=0.78)</code> жазыңыз: <code>model.predict_proba(X)[:, 1]</code> бойынша ROC-AUC есептеп, <code>(passed, auc)</code> қайтарсын, <code>passed = auc ≥ min_auc</code>. Дайын <code>model</code> test жиынында өтуі, ал <code>DummyClassifier</code> өтпеуі керек.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nfrom sklearn.metrics import roc_auc_score\nfrom sklearn.dummy import DummyClassifier\n\ndef quality_gate(model, X, y, min_auc=0.78):\n    return True, 1.0\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nmodel = make_pipeline(SimpleImputer(strategy='median'), StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train[FEATURES], y_train)\nMODEL_VERSION = 'churn-lr-1.0.0'\nTHRESHOLD = 0.3\nfrom sklearn.metrics import roc_auc_score\nfrom sklearn.dummy import DummyClassifier\n\ndef quality_gate(model, X, y, min_auc=0.78):\n    auc = roc_auc_score(y, model.predict_proba(X)[:, 1])\n    return bool(auc >= min_auc), float(auc)\n",
   "hints": [
    "<code>roc_auc_score(y, model.predict_proba(X)[:, 1])</code>"
   ],
   "check": {
    "tests": "_p, _a = quality_gate(model, X_test[FEATURES], y_test)\nassert _p is True and abs(_a - 0.8165) < 0.004, f'Дайын модель өтеді: AUC ≈ 0.816, сізде {_a}'\n_d = DummyClassifier(strategy='most_frequent').fit(X_train[FEATURES], y_train)\n_pd2, _ad = quality_gate(_d, X_test[FEATURES], y_test)\nassert _pd2 is False and abs(_ad - 0.5) < 1e-9, 'Dummy өтпеуі керек: AUC = 0.5'\nassert quality_gate(model, X_test[FEATURES], y_test, min_auc=0.9)[0] is False, 'min_auc параметрін қолданыңыз'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Drift есебі",
   "prompt": "<p><code>drift_report(train_df, new_df, cols, bins=5)</code> жазыңыз: әр баған үшін PSI есептеп (bin шекаралары — train квантильдері <code>np.unique(np.quantile(e, np.linspace(0, 1, bins + 1)))</code>, шеттері <code>-inf</code>/<code>inf</code>, үлестер <code>1e-4</code>-тен төмен емес), <code>{баған: {\"psi\": 3 таңбаға дөңгелектенген, \"status\": \"ok\" | \"watch\" | \"alert\"}}</code> қайтарсын. Бос мәндерді есепке алмаңыз. <code>report</code> — <code>new_month</code> үшін <code>tenure_months</code> пен <code>monthly_fee</code> есебі.</p>",
   "starter": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nnew_month = churn.sample(200, random_state=7).copy()\nnew_month['tenure_months'] = (new_month['tenure_months'] * 0.4).round().clip(lower=1)\n\ndef drift_report(train_df, new_df, cols, bins=5):\n    return {}\n\nreport = drift_report(X_train, new_month, ['tenure_months', 'monthly_fee'])\n",
   "solution": "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nchurn = pd.read_csv('churn.csv')\nFEATURES = ['tenure_months', 'monthly_fee', 'support_calls', 'has_contract']\nX_train, X_test, y_train, y_test = train_test_split(churn, churn['churned'], test_size=0.25, random_state=42, stratify=churn['churned'])\nnew_month = churn.sample(200, random_state=7).copy()\nnew_month['tenure_months'] = (new_month['tenure_months'] * 0.4).round().clip(lower=1)\n\ndef psi(expected, actual, bins=5):\n    e = np.asarray(expected, dtype=float); a = np.asarray(actual, dtype=float)\n    e, a = e[~np.isnan(e)], a[~np.isnan(a)]\n    edges = np.unique(np.quantile(e, np.linspace(0, 1, bins + 1)))\n    edges[0], edges[-1] = -np.inf, np.inf\n    pe = np.clip(np.histogram(e, edges)[0] / len(e), 1e-4, None)\n    pa = np.clip(np.histogram(a, edges)[0] / len(a), 1e-4, None)\n    return float(np.sum((pa - pe) * np.log(pa / pe)))\n\ndef status(v):\n    return 'ok' if v < 0.1 else ('watch' if v <= 0.25 else 'alert')\n\ndef drift_report(train_df, new_df, cols, bins=5):\n    out = {}\n    for c in cols:\n        v = psi(train_df[c], new_df[c], bins)\n        out[c] = {'psi': round(v, 3), 'status': status(v)}\n    return out\n\nreport = drift_report(X_train, new_month, ['tenure_months', 'monthly_fee'])\nprint(report)\n",
   "hints": [
    "Алдымен cap6-5-тегі <code>psi</code> функциясын жазыңыз",
    "Бос мәндерді <code>e[~np.isnan(e)]</code> арқылы алып тастаңыз"
   ],
   "check": {
    "tests": "assert set(report) == {'tenure_months', 'monthly_fee'}, 'Екі баған бойынша есеп'\nassert report['tenure_months']['status'] == 'alert' and abs(report['tenure_months']['psi'] - 3.557) < 0.02, f\"tenure_months: PSI ≈ 3.56, alert. Сізде {report['tenure_months']}\"\nassert report['monthly_fee']['status'] == 'ok', f\"monthly_fee өзгерген жоқ: ok. Сізде {report['monthly_fee']}\"\n_r = drift_report(X_train, X_test, ['tenure_months', 'age'])\nassert abs(_r['tenure_months']['psi'] - 0.069) < 0.005, 'train vs test tenure_months: PSI ≈ 0.069'\nassert _r['age']['psi'] == _r['age']['psi'], 'age бағанындағы бос мәндер nan бермеуі керек'"
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мониторинг дабылдары",
   "prompt": "<p><code>alerts(m)</code> жазыңыз: <code>m</code> — бір күндік метрикалар: <code>p95_ms</code>, <code>error_rate</code> (5xx үлесі), <code>psi</code> (<code>{баған: мән}</code>), <code>auc</code> (белгісіз болса <code>None</code>). Дабылдар тізімін мына ретпен қайтарсын: <code>\"latency\"</code> (p95 ≥ 200), <code>\"errors\"</code> (error_rate ≥ 0.001), әр PSI &gt; 0.25 баған үшін <code>\"drift:баған\"</code> (баған аты бойынша сұрыпталған), <code>\"quality\"</code> (auc бар және &lt; 0.78).</p>",
   "starter": "def alerts(m):\n    return []\n",
   "solution": "def alerts(m):\n    out = []\n    if m[\"p95_ms\"] >= 200:\n        out.append(\"latency\")\n    if m[\"error_rate\"] >= 0.001:\n        out.append(\"errors\")\n    for col in sorted(m.get(\"psi\", {})):\n        if m[\"psi\"][col] > 0.25:\n            out.append(\"drift:\" + col)\n    if m.get(\"auc\") is not None and m[\"auc\"] < 0.78:\n        out.append(\"quality\")\n    return out\n",
   "hints": [
    "<code>sorted(m[\"psi\"])</code> баған атаулары бойынша сұрыптайды",
    "<code>auc is not None</code> тексеріңіз"
   ],
   "check": {
    "tests": "_ok = {'p95_ms': 120, 'error_rate': 0.0002, 'psi': {'tenure_months': 0.07, 'monthly_fee': 0.02}, 'auc': None}\nassert alerts(_ok) == [], 'Бәрі қалыпты: бос тізім'\n_bad = {'p95_ms': 250, 'error_rate': 0.001, 'psi': {'tenure_months': 3.56, 'monthly_fee': 0.3, 'support_calls': 0.2}, 'auc': 0.74}\nassert alerts(_bad) == ['latency', 'errors', 'drift:monthly_fee', 'drift:tenure_months', 'quality'], f'Реті: latency, errors, drift (сұрыпталған), quality. Сізде {alerts(_bad)}'\nassert alerts(dict(_ok, psi={'x': 0.25})) == [], 'PSI = 0.25 — әлі watch, дабыл емес'\nassert alerts(dict(_ok, auc=0.79)) == [], 'AUC ≥ 0.78 — қалыпты'"
   }
  }
 ]
});
