// deeplearning practice tasks: Russian text. Code, solutions and checks are in content/practice/deeplearning.js.
DJ.i18n.patch({
 "lessons": {
  "dl-1": {
   "pr": [
    {
     "title": "Функция tanh",
     "prompt": "<p>Напишите функцию <code>tanh(z)</code> по формуле: <code>(e<sup>z</sup> − e<sup>−z</sup>) / (e<sup>z</sup> + e<sup>−z</sup>)</code>. Она должна работать с массивом numpy. Например, <code>tanh(np.array([0.0]))</code> → <code>[0.]</code>, а <code>tanh(1.0)</code> ≈ 0.7616.</p>",
     "hints": [
      "Возьмите <code>np.exp(z)</code> и <code>np.exp(-z)</code>",
      "Сравните результат с <code>np.tanh</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_z = _np.array([-2.0, 0.0, 0.5, 1.0])\nassert tanh(_z) is not None, 'tanh должен возвращать значение'\nassert _np.allclose(tanh(_z), _np.tanh(_z)), f'tanh([-2, 0, 0.5, 1]) ≈ {_np.tanh(_z).round(4)} болуы керек'\nassert abs(float(tanh(1.0)) - 0.7616) < 1e-4, 'tanh(1.0) ≈ 0.7616 болуы керек'"
     }
    },
    {
     "title": "Leaky ReLU",
     "prompt": "<p>Напишите <code>leaky_relu(z, alpha=0.01)</code>: положительные значения не меняются, а отрицательные умножаются на <code>alpha</code>. Например, <code>leaky_relu(np.array([-10.0, 0.0, 3.0]))</code> → <code>[-0.1, 0., 3.]</code>.</p>",
     "hints": [
      "<code>np.where(z > 0, z, alpha * z)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = leaky_relu(_np.array([-10.0, 0.0, 3.0]))\nassert _r is not None and _np.allclose(_r, [-0.1, 0.0, 3.0]), f'leaky_relu([-10, 0, 3]) должен быть [-0.1, 0, 3], у вас {_r}'\nassert _np.allclose(leaky_relu(_np.array([-2.0, 5.0]), alpha=0.2), [-0.4, 5.0]), 'Используйте параметр alpha: -2 · 0.2 = -0.4'"
     }
    },
    {
     "title": "Линейная часть нейрона",
     "prompt": "<p>Есть нейрон, который оценивает, сможет ли ученик сдать экзамен. Признаки: часы подготовки и доля посещения занятий. Функция <code>linear_part(x, w, b)</code> должна вернуть значение <code>z = x @ w + b</code>. Затем вычислите <code>x = [5, 0.8]</code>, <code>w = [0.3, 2.0]</code>, <code>b = -2.5</code> для <code>z</code> и <code>prob = sigmoid(z)</code> (z = 0.6).</p>",
     "hints": [
      "<code>x @ w + b</code>",
      "Сначала превратите список в массив с помощью <code>np.asarray(x, dtype=float)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert z is not None and abs(float(z) - 0.6) < 1e-9, f'z = 5·0.3 + 0.8·2.0 − 2.5 = 0.6, у вас {z}'\nassert prob is not None and abs(float(prob) - 0.6457) < 1e-3, f'prob = sigmoid(0.6) ≈ 0.646, у вас {prob}'\nassert abs(float(linear_part(_np.array([1.0, 1.0]), _np.array([2.0, 3.0]), 1.0)) - 6.0) < 1e-9, 'linear_part должен работать для любых x, w и b'"
     }
    },
    {
     "title": "Вероятности клиентов",
     "prompt": "<p>Интернет-магазин одним нейроном сразу считает вероятность покупки для нескольких клиентов. Функция <code>predict_proba(X, w, b)</code> должна вернуть <code>(n,)</code> вероятностей для матрицы <code>(n, k)</code>. <code>predict(X, w, b, threshold=0.5)</code> — это 1, если вероятность не меньше порога, иначе 0 (массив int). Пример: <code>X = [[3, 2], [1, 0], [5, 4]]</code>, <code>w = [0.4, 0.5]</code>, <code>b = -1.5</code> → <code>predict</code> = <code>[1, 0, 1]</code>.</p>",
     "hints": [
      "<code>X @ w</code> даёт одно z для каждой строки",
      "<code>(p >= threshold).astype(int)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.array([[3.0, 2.0], [1.0, 0.0], [5.0, 4.0]]); _w = _np.array([0.4, 0.5])\n_p = predict_proba(_X, _w, -1.5)\nassert _p is not None and _np.shape(_p) == (3,), f'Форма predict_proba должна быть (3,), у вас {_np.shape(_p)}'\nassert _np.allclose(_p, 1 / (1 + _np.exp(-(_X @ _w - 1.5)))), 'predict_proba = sigmoid(X @ w + b)'\nassert list(predict(_X, _w, -1.5)) == [1, 0, 1], f'predict = [1, 0, 1] должен быть, у вас {predict(_X, _w, -1.5)}'\nassert list(predict(_X, _w, -1.5, threshold=0.9)) == [0, 0, 1], 'Используйте параметр threshold: при пороге 0.9 проходит только третий клиент'"
     }
    },
    {
     "title": "Классы погоды",
     "prompt": "<p>Модель для каждого города выдаёт logit-значения для трёх классов (ясно, облачно, дождь): форма <code>Z</code> — <code>(n, 3)</code>. Напишите <code>softmax_rows(Z)</code>: для каждой строки считает softmax (сумма строки равна 1). Чтобы не было переполнения на больших числах, вычитайте из каждой строки её максимум: <code>Z.max(axis=1, keepdims=True)</code>. Затем <code>best_class(Z)</code> возвращает для каждой строки индекс самого вероятного класса.</p>",
     "hints": [
      "<code>e / e.sum(axis=1, keepdims=True)</code>",
      "<code>np.argmax(..., axis=1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_Z = _np.array([[2.0, 1.0, 0.1], [0.0, 0.0, 3.0], [1000.0, 1000.0, 0.0]])\n_P = softmax_rows(_Z)\nassert _P is not None and _np.shape(_P) == (3, 3), 'Форма результата должна совпадать с Z'\nassert _np.allclose(_P.sum(axis=1), 1), 'Сумма каждой строки должна быть равна 1'\nassert _np.allclose(_P[0], [0.659, 0.242, 0.099], atol=1e-3), f'Первая строка ≈ [0.659, 0.242, 0.099], у вас {_P[0]}'\nassert _np.allclose(_P[2], [0.5, 0.5, 0.0]), 'Для больших чисел не должно быть nan: вычитайте максимум из каждой строки'\nassert list(best_class(_Z[:2])) == [0, 2], 'best_class = [0, 2] болуы керек'"
     }
    },
    {
     "title": "Два слоя без activation",
     "prompt": "<p>Без activation два линейных слоя равны одному слою: <code>(x @ W1) @ W2 = x @ (W1 @ W2)</code>. Функция <code>collapse(W1, W2)</code> должна вернуть эту объединённую матрицу. <code>two_layers(X, W1, W2)</code> — применяет два слоя по очереди и возвращает <code>X @ W1 @ W2</code>. Результаты обоих способов должны совпадать.</p>",
     "hints": [
      "<code>W1 @ W2</code>, форма <code>(3, 2)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(5)\n_X = _r.normal(size=(4, 3)); _W1 = _r.normal(size=(3, 5)); _W2 = _r.normal(size=(5, 2))\n_W = collapse(_W1, _W2)\nassert _W is not None and _np.shape(_W) == (3, 2), f'Форма collapse должна быть (3, 2), у вас {_np.shape(_W)}'\nassert _np.allclose(two_layers(_X, _W1, _W2), _X @ _W1 @ _W2), 'two_layers = X @ W1 @ W2'\nassert _np.allclose(_X @ _W, two_layers(_X, _W1, _W2)), 'X @ collapse(W1, W2) должен совпадать с результатом двух слоёв'"
     }
    },
    {
     "title": "Softmax с температурой",
     "prompt": "<p>Напишите <code>softmax_t(z, T=1.0)</code>: делит logit-значения на температуру (<code>z / T</code>), а затем вычисляет устойчивый softmax. Если T мало, вероятность собирается в самом большом классе; если T велико, все значения становятся равными. <code>T &lt;= 0</code> — тогда <code>ValueError</code>. Например, <code>softmax_t(np.array([2.0, 1.0, 0.1]), 1.0)</code> ≈ <code>[0.659, 0.242, 0.099]</code>.</p>",
     "hints": [
      "Сначала <code>z / T</code>, потом <code>z - z.max()</code>",
      "<code>if T &lt;= 0: raise ValueError(...)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_z = _np.array([2.0, 1.0, 0.1])\n_a = softmax_t(_z, 1.0)\nassert _a is not None and _np.allclose(_a, [0.659, 0.242, 0.099], atol=1e-3), f'При T = 1 ≈ [0.659, 0.242, 0.099], у вас {_a}'\n_c = softmax_t(_z, 0.01)\nassert _np.isfinite(_c).all() and _c[0] > 0.999, 'При T = 0.01 вероятность должна собраться в первом классе (nan быть не должно)'\n_h = softmax_t(_z, 1000.0)\nassert _np.allclose(_h, 1 / 3, atol=1e-2), 'Если T большое, вероятности ≈ 1/3'\ntry:\n    softmax_t(_z, 0)\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'T = 0 болса ValueError тудыру керек'"
     }
    },
    {
     "title": "Слой с выбором activation",
     "prompt": "<p>Напишите <code>dense(X, W, b, act)</code>: <code>Z = X @ W + b</code>, затем activation по <code>act</code>: <code>\"sigmoid\"</code>, <code>\"tanh\"</code>, <code>\"relu\"</code>, <code>\"softmax\"</code> (по строкам, тогда softmax стабилен) или <code>\"linear\"</code> (без изменений). Если пришло другое название, поднимите <code>ValueError</code>. Форма результата — <code>(n, W.shape[1])</code>.</p>",
     "hints": [
      "Сначала вычислите <code>Z</code>, затем ветки <code>if act == ...</code>",
      "Для softmax <code>axis=1, keepdims=True</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(2)\n_X = _r.normal(size=(4, 3)); _W = _r.normal(size=(3, 2)); _b = _np.array([0.5, -0.5])\n_Z = _X @ _W + _b\nassert _np.allclose(dense(_X, _W, _b, 'linear'), _Z), 'linear: Z = X @ W + b'\nassert _np.allclose(dense(_X, _W, _b, 'relu'), _np.maximum(0, _Z)), 'relu: np.maximum(0, Z)'\nassert _np.allclose(dense(_X, _W, _b, 'tanh'), _np.tanh(_Z)), 'tanh: np.tanh(Z)'\nassert _np.allclose(dense(_X, _W, _b, 'sigmoid'), 1 / (1 + _np.exp(-_Z))), 'sigmoid: 1 / (1 + exp(-Z))'\n_s = dense(_X, _W, _b, 'softmax')\nassert _np.shape(_s) == (4, 2) and _np.allclose(_s.sum(axis=1), 1), 'softmax по строкам: сумма равна 1'\ntry:\n    dense(_X, _W, _b, 'swish')\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'Для неизвестной activation должна возникать ValueError'"
     }
    }
   ]
  },
  "dl-2": {
   "pr": [
    {
     "title": "Совместимость матриц",
     "prompt": "<p>Напишите функцию <code>can_multiply(shape_a, shape_b)</code>: даны две формы (кортежи). Можно ли перемножить <code>A @ B</code>? Правило: <code>(n, a) @ (a, b)</code> — средние размеры должны совпадать. Например, <code>can_multiply((5, 3), (3, 4))</code> → <code>True</code>, <code>can_multiply((5, 3), (4, 3))</code> → <code>False</code>.</p>",
     "hints": [
      "<code>shape_a[1] == shape_b[0]</code>"
     ],
     "check": {
      "tests": "assert can_multiply((5, 3), (3, 4)) is True, '(5, 3) @ (3, 4) возможно: True'\nassert can_multiply((5, 3), (4, 3)) is False, '(5, 3) @ (4, 3) невозможно: False'\nassert can_multiply((1, 784), (784, 128)) is True, '(1, 784) @ (784, 128) возможно'"
     }
    },
    {
     "title": "Формы слоёв",
     "prompt": "<p>Напишите <code>layer_shapes(n, layers)</code>: заданы <code>n</code> примеров и размеры слоёв <code>layers</code> (например, <code>[3, 4, 1]</code>). Функция должна вернуть список форм массивов после каждого слоя, включая вход: <code>layer_shapes(10, [3, 4, 1])</code> → <code>[(10, 3), (10, 4), (10, 1)]</code>.</p>",
     "hints": [
      "Форма каждого слоя <code>(n, k)</code>"
     ],
     "check": {
      "tests": "assert layer_shapes(10, [3, 4, 1]) == [(10, 3), (10, 4), (10, 1)], f'Должно быть [(10, 3), (10, 4), (10, 1)], у вас {layer_shapes(10, [3, 4, 1])}'\nassert layer_shapes(1, [784, 128, 10]) == [(1, 784), (1, 128), (1, 10)], 'Функция должна работать и для сети MNIST'"
     }
    },
    {
     "title": "Скрытый слой",
     "prompt": "<p>Напишите <code>hidden(X, W1, b1)</code>: она возвращает выход скрытого слоя с ReLU: <code>max(0, X @ W1 + b1)</code>. В примере с урока: <code>X = [[1, 0, 2]]</code> и заданное <code>W1</code> дают результат <code>[[0, 0, 0.7, 1]]</code>. Вычислите <code>H = hidden(X, W1, b1)</code>.</p>",
     "hints": [
      "<code>np.maximum(0, X @ W1 + b1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert H is not None and _np.shape(H) == (1, 4), f'Форма H должна быть (1, 4), у вас {_np.shape(H)}'\nassert _np.allclose(H, [[0, 0, 0.7, 1.0]]), f'H должен быть [[0, 0, 0.7, 1]], у вас {H}'\nassert _np.allclose(hidden(X, W1, _np.ones(4)), _np.maximum(0, X @ W1 + 1)), 'Не забудьте прибавить b1'"
     }
    },
    {
     "title": "Сеть любой глубины",
     "prompt": "<p>Напишите <code>forward_deep(X, params)</code>: <code>params</code> — это список пар <code>(W, b)</code>. Во всех слоях, кроме последнего, используется ReLU, в последнем — sigmoid. Выход будет иметь форму <code>(n, 1)</code>. Если слой один, применяйте только sigmoid.</p>",
     "hints": [
      "<code>for i, (W, b) in enumerate(params)</code>",
      "Последний слой найдите через <code>i == len(params) - 1</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(4)\n_X = _r.normal(size=(6, 3))\n_ps = [(_r.normal(size=(3, 5)), _r.normal(size=5)), (_r.normal(size=(5, 4)), _r.normal(size=4)), (_r.normal(size=(4, 1)), _r.normal(size=1))]\n_A = _X\nfor _W, _b in _ps[:-1]:\n    _A = _np.maximum(0, _A @ _W + _b)\n_ref = 1 / (1 + _np.exp(-(_A @ _ps[-1][0] + _ps[-1][1])))\n_out = forward_deep(_X, _ps)\nassert _out is not None and _np.shape(_out) == (6, 1), f'Форма выхода должна быть (6, 1), у вас {_np.shape(_out)}'\nassert _np.allclose(_out, _ref), 'В скрытых слоях ReLU, в последнем sigmoid'\nassert _np.allclose(forward_deep(_X, [(_np.ones((3, 1)), _np.zeros(1))]), 1 / (1 + _np.exp(-_X.sum(axis=1, keepdims=True)))), 'Если слой один, только sigmoid'"
     }
    },
    {
     "title": "Инициализация весов",
     "prompt": "<p>Напишите <code>init_params(layers, seed=0)</code>: для каждой пары соседних размеров <code>(a, b)</code> создайте <code>W</code> — из генератора <code>np.random.default_rng(seed)</code> <code>rng.normal(0, 0.1, (a, b))</code>, а <code>b</code> — <code>np.zeros(b)</code>. Функция вернёт список пар <code>(W, b)</code>. Один и тот же seed всегда должен давать одинаковые веса.</p>",
     "hints": [
      "Создайте генератор один раз перед циклом",
      "<code>zip(layers[:-1], layers[1:])</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_p = init_params([3, 4, 1], seed=1)\nassert len(_p) == 2, f'Для [3, 4, 1] должно быть 2 слоя, у вас {len(_p)}'\nassert _p[0][0].shape == (3, 4) and _p[0][1].shape == (4,), 'Первый слой: W (3, 4), b (4,)'\nassert _p[1][0].shape == (4, 1) and _p[1][1].shape == (1,), 'Второй слой: W (4, 1), b (1,)'\nassert sum(W.size + b.size for W, b in _p) == 21, 'Общее число параметров должно быть 21'\nassert _np.allclose(init_params([3, 4, 1], seed=1)[0][0], _p[0][0]), 'Один seed должен давать одинаковые веса'\nassert not _np.allclose(init_params([3, 4, 1], seed=2)[0][0], _p[0][0]), 'Другой seed должен давать другие веса'\nassert _np.all(_p[0][1] == 0) and 0 < _np.std(_p[0][0]) < 0.3, 'b — нули, W — маленькие случайные числа'"
     }
    },
    {
     "title": "Бюджет параметров",
     "prompt": "<p>Модель для телефона имеет ограниченное число параметров. Напишите <code>max_hidden(n_in, n_out, budget)</code>: она возвращает самое большое <code>h</code>, при котором число параметров сети <code>[n_in, h, n_out]</code> не превышает <code>budget</code> (в этой сети <code>n_in·h + h + h·n_out + n_out</code> параметров). Если ни один <code>h ≥ 1</code> не помещается, верните 0. Например, <code>max_hidden(3, 1, 21)</code> → 4.</p>",
     "hints": [
      "Число параметров = <code>h·(n_in + 1 + n_out) + n_out</code>",
      "Используйте целочисленное деление <code>//</code>"
     ],
     "check": {
      "tests": "assert max_hidden(3, 1, 21) == 4, f'max_hidden(3, 1, 21) должен быть 4, у вас {max_hidden(3, 1, 21)}'\nassert max_hidden(3, 1, 25) == 4, 'При 25 параметрах h = 5 не помещается (26), поэтому 4'\nassert max_hidden(784, 10, 101770) == 128, 'MNIST: 101 770 параметрге h = 128'\nassert max_hidden(10, 2, 5) == 0, 'Бюджет тым аз болса 0'"
     }
    },
    {
     "title": "Многоклассовый MLP",
     "prompt": "<p>Напишите MLP, который относит товары Kaspi к одной из трёх категорий. <code>forward_multi(X, W1, b1, W2, b2)</code>: в скрытом слое ReLU, на выходе стабильный softmax по строкам; <code>(n, k)</code> должна вернуть вероятности. <code>predict_class(X, W1, b1, W2, b2)</code> — возвращает индекс самого вероятного класса для каждого примера.</p>",
     "hints": [
      "Для softmax <code>Z - Z.max(axis=1, keepdims=True)</code>",
      "<code>np.argmax(P, axis=1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(8)\n_X = _r.normal(size=(7, 4)); _W1 = _r.normal(size=(4, 6)); _b1 = _r.normal(size=6); _W2 = _r.normal(size=(6, 3)); _b2 = _r.normal(size=3)\n_Z = _np.maximum(0, _X @ _W1 + _b1) @ _W2 + _b2\n_E = _np.exp(_Z - _Z.max(axis=1, keepdims=True)); _P = _E / _E.sum(axis=1, keepdims=True)\n_out = forward_multi(_X, _W1, _b1, _W2, _b2)\nassert _out is not None and _np.shape(_out) == (7, 3), f'Форма выхода должна быть (7, 3), у вас {_np.shape(_out)}'\nassert _np.allclose(_out.sum(axis=1), 1), 'Сумма каждой строки должна быть равна 1'\nassert _np.allclose(_out, _P), 'В скрытом слое ReLU, на выходе softmax'\nassert list(predict_class(_X, _W1, _b1, _W2, _b2)) == list(_P.argmax(axis=1)), 'predict_class = argmax(axis=1)'\n_big = forward_multi(_X, _W1, _b1, _W2 * 1000, _b2)\nassert _np.isfinite(_big).all(), 'Для больших logit-значений не должно быть nan'"
     }
    },
    {
     "title": "Поиск ошибки в форме",
     "prompt": "<p>Напишите <code>find_shape_error(n_features, params)</code>: <code>params</code> — список пар <code>(W, b)</code>. Вход имеет <code>n_features</code> признаков. Функция должна вернуть индекс (с 0) первого неверного слоя, а если всё верно — <code>None</code>. Слой неверен, если <code>W.shape[0]</code> не равно выходу предыдущего слоя, или <code>b.shape</code> ≠ <code>(W.shape[1],)</code>.</p>",
     "hints": [
      "Текущий размер храните в переменной <code>size</code>",
      "После каждого слоя <code>size = W.shape[1]</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_ok = [(_np.zeros((3, 4)), _np.zeros(4)), (_np.zeros((4, 1)), _np.zeros(1))]\nassert find_shape_error(3, _ok) is None, 'Для правильной сети None'\nassert find_shape_error(5, _ok) == 0, 'Вход 5 признаков, а W1 ожидает 3: слой 0'\n_bad = [(_np.zeros((3, 4)), _np.zeros(4)), (_np.zeros((5, 1)), _np.zeros(1))]\nassert find_shape_error(3, _bad) == 1, 'W2.shape[0] = 5, а предыдущий выход 4: слой 1'\n_badb = [(_np.zeros((3, 4)), _np.zeros(3)), (_np.zeros((4, 1)), _np.zeros(1))]\nassert find_shape_error(3, _badb) == 0, 'Форма b1 должна быть (4,): слой 0'\nassert find_shape_error(2, []) is None, 'Для пустого списка None'"
     }
    }
   ]
  },
  "dl-3": {
   "pr": [
    {
     "title": "Loss одного абонента",
     "prompt": "<p>Напишите <code>bce_one(y, p)</code>: значение binary cross-entropy для одного примера. Если <code>y = 1</code>, то <code>−log(p)</code>; если <code>y = 0</code>, то <code>−log(1 − p)</code>. Например, <code>bce_one(1, 0.9)</code> ≈ 0.105, <code>bce_one(1, 0.1)</code> ≈ 2.303.</p>",
     "hints": [
      "<code>np.log(p)</code> и <code>np.log(1 - p)</code>"
     ]
    },
    {
     "title": "RMSE цены квартир",
     "prompt": "<p>Мы оцениваем модель, которая предсказывает цену квартиры в Алматы (млн ₸). Напишите <code>rmse(y, pred)</code>: квадратный корень из MSE, <code>sqrt(mean((y − pred)²))</code>. Например, <code>rmse([30, 45], [33, 41])</code> = √12.5 ≈ 3.536.</p>",
     "hints": [
      "<code>np.sqrt(np.mean((y - pred) ** 2))</code>"
     ],
     "check": {
      "tests": "assert rmse([30, 45], [33, 41]) is not None and abs(rmse([30, 45], [33, 41]) - 3.5355) < 1e-3, 'rmse([30, 45], [33, 41]) ≈ 3.536'\nassert rmse([1, 2, 3], [1, 2, 3]) == 0, 'Если ошибок нет, то 0'\nassert abs(rmse([0, 0], [3, 4]) - 3.5355) < 1e-3, 'Должно работать и со списками'"
     }
    },
    {
     "title": "Вычисление accuracy",
     "prompt": "<p>Вместе с loss бизнесу показываем accuracy. Напишите <code>accuracy(y, p, threshold=0.5)</code>: предсказывайте 1, если вероятность не меньше порога, и верните долю верных предсказаний. Например, <code>accuracy([1, 0, 1], [0.8, 0.3, 0.4])</code> → 0.667.</p>",
     "hints": [
      "<code>(p >= threshold).astype(int)</code>",
      "<code>np.mean(pred == y)</code>"
     ],
     "check": {
      "tests": "assert accuracy([1, 0, 1], [0.8, 0.3, 0.4]) is not None and abs(accuracy([1, 0, 1], [0.8, 0.3, 0.4]) - 2 / 3) < 1e-9, 'accuracy([1, 0, 1], [0.8, 0.3, 0.4]) = 2/3'\nassert accuracy([1, 0, 1], [0.8, 0.3, 0.4], threshold=0.3) == 2 / 3, 'threshold = 0.3: предсказания [1, 1, 1], 2/3 верны'\nassert accuracy([1, 1], [0.51, 0.99]) == 1.0, 'Для accuracy 0.51 и 0.99 одинаково «верно»'"
     }
    },
    {
     "title": "Cross-entropy для многих классов",
     "prompt": "<p>Модель, которая узнаёт животное на фото (кошка, собака, птица). <code>y</code> — индексы правильных классов, <code>P</code> — матрица <code>(n, 3)</code> вероятностей. <code>cross_entropy(y, P)</code> = <code>−mean(log(P[i, y_i]))</code>. Ограничьте <code>P</code> через <code>np.clip(P, 1e-7, 1)</code>. Например, <code>y = [0, 2]</code>, <code>P = [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]]</code> → ≈ 0.434.</p>",
     "hints": [
      "<code>P[np.arange(len(y)), y]</code> берёт из каждой строки вероятность правильного класса"
     ],
     "check": {
      "tests": "import numpy as _np\n_v = cross_entropy([0, 2], [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]])\nassert _v is not None and abs(_v - 0.4338) < 1e-3, f'Должно быть ≈ 0.434, у вас {_v}'\nassert cross_entropy([1], [[0.0, 1.0, 0.0]]) < 1e-6, 'Если правильному классу дать 1, loss ≈ 0'\nassert _np.isfinite(cross_entropy([0], [[0.0, 1.0, 0.0]])), 'При P = 0 не должно быть inf: используйте np.clip'"
     }
    },
    {
     "title": "One-hot и loss",
     "prompt": "<p>Напишите <code>one_hot(y, k)</code>: превратите индексы классов в матрицу <code>(n, k)</code> (в правильном классе 1, в остальных 0). Затем вычислите <code>ce_onehot(Y, P)</code> = <code>−mean(sum(Y · log P, axis=1))</code> и ограничьте <code>P</code> снизу <code>1e-7</code>. Например, <code>one_hot([2, 0], 3)</code> → <code>[[0, 0, 1], [1, 0, 0]]</code>.</p>",
     "hints": [
      "<code>Y[np.arange(n), y] = 1</code>",
      "<code>np.sum(Y * np.log(P), axis=1)</code> даёт одно число на каждую строку"
     ],
     "check": {
      "tests": "import numpy as _np\nassert one_hot([2, 0], 3) is not None and _np.array_equal(one_hot([2, 0], 3), [[0, 0, 1], [1, 0, 0]]), 'one_hot([2, 0], 3) = [[0, 0, 1], [1, 0, 0]]'\nassert _np.shape(one_hot([0, 1, 1, 3], 4)) == (4, 4), 'Форма (n, k)'\n_P = _np.array([[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]])\nassert abs(ce_onehot(one_hot([0, 2], 3), _P) - 0.4338) < 1e-3, 'ce_onehot ≈ 0.434 болуы керек'\nassert _np.isfinite(ce_onehot(one_hot([0], 2), _np.array([[0.0, 1.0]]))), 'P = 0 болса inf болмауы керек'"
     }
    },
    {
     "title": "Самая уверенная ошибка",
     "prompt": "<p>Найдите в данных самый «уверенно ошибочный» пример. <code>worst_example(y, p)</code> вычисляет BCE для каждого примера и возвращает индекс самого большого (ограничьте <code>p</code> через <code>np.clip(p, 1e-7, 1 - 1e-7)</code>). Например, <code>y = [1, 0, 1, 0]</code>, <code>p = [0.9, 0.2, 0.3, 0.95]</code> → 3.</p>",
     "hints": [
      "Посчитайте loss каждого примера без <code>mean</code>",
      "<code>np.argmax(losses)</code>"
     ],
     "check": {
      "tests": "assert worst_example([1, 0, 1, 0], [0.9, 0.2, 0.3, 0.95]) == 3, 'Пример 4: y = 0, но p = 0.95 — самый большой loss, индекс 3'\nassert worst_example([1, 1, 1], [0.5, 0.01, 0.7]) == 1, 'y = 1, p = 0.01: индекс 1'\nassert worst_example([0, 1], [1.0, 1.0]) == 0, 'Должно работать и при p = 1 (np.clip)'"
     }
    },
    {
     "title": "Устойчивая BCE от logit",
     "prompt": "<p>Напишите <code>BCEWithLogitsLoss</code> как в PyTorch, то есть <code>bce_logits(y, z)</code>: на входе logit <code>z</code> (до sigmoid). Устойчивая формула: <code>mean(max(z, 0) − z·y + log(1 + e<sup>−|z|</sup>))</code>. Она равна <code>bce(y, sigmoid(z))</code>, но не даёт inf/nan даже при <code>z = 1000</code>. Например, <code>bce_logits([1, 0], [2.0, -1.0])</code> ≈ 0.2201.</p>",
     "hints": [
      "<code>np.maximum(z, 0)</code>, <code>np.abs(z)</code>",
      "<code>np.log1p(x)</code> = <code>log(1 + x)</code>, точнее"
     ],
     "check": {
      "tests": "import numpy as _np\n_v = bce_logits([1, 0], [2.0, -1.0])\nassert _v is not None and abs(_v - 0.2201) < 1e-3, f'Должно быть ≈ 0.2201, у вас {_v}'\n_r = _np.random.default_rng(0); _y = _r.integers(0, 2, 20); _z = _r.normal(0, 3, 20)\n_p = 1 / (1 + _np.exp(-_z))\nassert abs(bce_logits(_y, _z) - (-_np.mean(_y * _np.log(_p) + (1 - _y) * _np.log(1 - _p)))) < 1e-9, 'Результат должен равняться bce(y, sigmoid(z))'\n_big = bce_logits([0, 1], [1000.0, -1000.0])\nassert _np.isfinite(_big) and abs(_big - 1000) < 1e-6, 'Даже при z = ±1000 должно быть конечное число: 1000'"
     }
    },
    {
     "title": "Loss по задаче",
     "prompt": "<p>Напишите <code>task_loss(task, y, out)</code>: <code>\"regression\"</code> → MSE(<code>y</code>, <code>out</code>); <code>\"binary\"</code> → BCE, <code>out</code> — вероятности; <code>\"multiclass\"</code> → cross-entropy, <code>y</code> — индексы классов, <code>out</code> — <code>(n, k)</code> вероятностей. Ограничьте вероятности через <code>1e-7</code>. Если придёт название другой задачи, поднимите <code>ValueError</code>.</p>",
     "hints": [
      "Три ветки: <code>if task == \"regression\"</code> ...",
      "В конце <code>raise ValueError(...)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert task_loss('regression', [1.0, 2.0], [2.0, 4.0]) is not None and abs(task_loss('regression', [1.0, 2.0], [2.0, 4.0]) - 2.5) < 1e-9, 'regression: MSE = 2.5'\nassert abs(task_loss('binary', [1, 0, 1], [0.8, 0.3, 0.6]) - 0.3635) < 1e-3, 'binary: BCE ≈ 0.364'\nassert abs(task_loss('multiclass', [0, 2], [[0.7, 0.2, 0.1], [0.1, 0.3, 0.6]]) - 0.4338) < 1e-3, 'multiclass: CE ≈ 0.434'\nassert _np.isfinite(task_loss('binary', [1, 0], [0.0, 1.0])), 'binary: p = 0 немесе 1 болса inf болмауы керек'\ntry:\n    task_loss('ranking', [1], [1])\n    _ok = False\nexcept ValueError:\n    _ok = True\nassert _ok, 'Для неизвестной задачи ValueError'"
     }
    }
   ]
  },
  "dl-4": {
   "pr": [
    {
     "title": "Один шаг градиента",
     "prompt": "<p>Напишите <code>gd_step(w, grad, lr)</code>: она возвращает новый вес по правилу градиентного спуска: <code>w − lr · grad</code>. Например, <code>gd_step(np.array([0.5, -1.0]), np.array([2.0, -4.0]), 0.1)</code> → <code>[0.3, -0.6]</code>.</p>",
     "hints": [
      "Не забудьте минус: двигаемся <b>против</b> градиента"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = gd_step(_np.array([0.5, -1.0]), _np.array([2.0, -4.0]), 0.1)\nassert _r is not None and _np.allclose(_r, [0.3, -0.6]), f'Должно быть [0.3, -0.6], у вас {_r}'\nassert _np.allclose(gd_step(_np.array([1.0]), _np.array([1.0]), 0.5), [0.5]), 'Движение против градиента: 1 − 0.5·1 = 0.5'"
     }
    },
    {
     "title": "Производная sigmoid",
     "prompt": "<p>Напишите <code>sigmoid_grad(z)</code>: производная sigmoid — <code>p · (1 − p)</code>, где <code>p = sigmoid(z)</code>. Например, <code>sigmoid_grad(0.0)</code> = 0.25 — это её наибольшее значение.</p>",
     "hints": [
      "Сначала <code>p = 1 / (1 + np.exp(-z))</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert sigmoid_grad(0.0) is not None and abs(float(sigmoid_grad(0.0)) - 0.25) < 1e-12, 'sigmoid_grad(0) = 0.25'\n_z = _np.array([-3.0, 1.0, 4.0]); _p = 1 / (1 + _np.exp(-_z))\nassert _np.allclose(sigmoid_grad(_z), _p * (1 - _p)), 'sigmoid_grad = p · (1 − p)'\nassert float(sigmoid_grad(10.0)) < 1e-4, 'При большом z производная близка к нулю'"
     }
    },
    {
     "title": "Производная ReLU",
     "prompt": "<p>Напишите <code>relu_grad(z)</code>: если <code>z &gt; 0</code>, то 1.0, иначе 0.0 (массив float). Например, <code>relu_grad(np.array([-2.0, 0.0, 3.0]))</code> → <code>[0., 0., 1.]</code>.</p>",
     "hints": [
      "<code>(z > 0).astype(float)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = relu_grad(_np.array([-2.0, 0.0, 3.0]))\nassert _r is not None and _np.array_equal(_r, [0.0, 0.0, 1.0]), f'Должно быть [0, 0, 1], у вас {_r}'\nassert _r.dtype.kind == 'f', 'Результат должен быть массивом float: .astype(float)'"
     }
    },
    {
     "title": "Минимум параболы",
     "prompt": "<p><code>loss(w) = (w − 3)²</code>, её производная <code>2(w − 3)</code>. Напишите <code>gd_parabola(w0, lr, steps)</code>: начиная с <code>w0</code>, сделайте <code>steps</code> шагов градиентного спуска и верните последнее <code>w</code>. За 100 шагов <code>lr = 0.1</code> приходит к <code>w ≈ 3</code>; а если <code>lr = 1.1</code> слишком большой, <code>w</code> уходит всё дальше.</p>",
     "hints": [
      "На каждом шаге <code>w = w - lr * 2 * (w - 3)</code>"
     ],
     "check": {
      "tests": "_w = gd_parabola(0.0, 0.1, 100)\nassert _w is not None and abs(_w - 3) < 1e-6, f'lr = 0.1, 100 шагов: w ≈ 3, у вас {_w}'\nassert abs(gd_parabola(10.0, 0.1, 1) - 8.6) < 1e-9, 'Один шаг: 10 − 0.1·2·7 = 8.6'\nassert abs(gd_parabola(0.0, 1.1, 30) - 3) > 100, 'При lr = 1.1 w должен уходить далеко (растёт скачками)'\nassert abs(gd_parabola(0.0, 0.001, 10) - 3) > 2.5, 'Если lr слишком мал, за 10 шагов до минимума не дойдём'"
     }
    },
    {
     "title": "Градиент MSE",
     "prompt": "<p>Линейная регрессия <code>pred = X @ w + b</code>, loss = <code>mean((pred − y)²)</code>. Напишите <code>mse_grad(X, y, w, b)</code>: верните <code>(dw, db)</code>, где <code>dw = 2/n · X.T @ (pred − y)</code>, <code>db = 2 · mean(pred − y)</code>. Проверяющий сравнит результат с численным градиентом.</p>",
     "hints": [
      "<code>err = X @ w + b - y</code>",
      "Не забудьте разделить на n"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(3)\n_X = _r.normal(size=(8, 2)); _y = _r.normal(size=8); _w = _np.array([0.5, -0.3]); _b = 0.2\n_dw, _db = mse_grad(_X, _y, _w, _b)\ndef _L(w, b):\n    return _np.mean((_X @ w + b - _y) ** 2)\n_e = 1e-6\n_nw = _np.array([(_L(_w + _e * _np.eye(2)[i], _b) - _L(_w - _e * _np.eye(2)[i], _b)) / (2 * _e) for i in range(2)])\n_nb = (_L(_w, _b + _e) - _L(_w, _b - _e)) / (2 * _e)\nassert _np.allclose(_dw, _nw, atol=1e-5), f'dw не совпадает с численным градиентом: {_dw} и {_nw}'\nassert abs(_db - _nb) < 1e-5, f'db не совпадает с численным градиентом: {_db} и {_nb}'"
     }
    },
    {
     "title": "Проверка производной tanh",
     "prompt": "<p>Вычислите численную производную функции одной переменной: <code>num_deriv(f, x, eps=1e-5)</code> = <code>(f(x + eps) − f(x − eps)) / (2·eps)</code>. Затем напишите <code>tanh_grad(x)</code> = <code>1 − tanh(x)²</code>. Они должны совпасть в точке <code>x = 0.5</code>: <code>gap = abs(num_deriv(np.tanh, 0.5) − tanh_grad(0.5))</code>.</p>",
     "hints": [
      "Центральная разность: <code>(f(x + eps) - f(x - eps)) / (2 * eps)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert abs(tanh_grad(0.0) - 1.0) < 1e-12, 'tanh_grad(0) = 1'\nassert abs(tanh_grad(0.5) - 0.7864) < 1e-4, 'tanh_grad(0.5) ≈ 0.786'\nassert abs(num_deriv(lambda v: v ** 3, 2.0) - 12.0) < 1e-4, 'num_deriv работает для любого f: производная x³ равна 3x² = 12'\nassert gap is not None and gap < 1e-8, f'Разница gap должна быть очень маленькой, у вас {gap}'"
     }
    },
    {
     "title": "Обучение logistic regression",
     "prompt": "<p>Напишите <code>train_logreg(X, y, lr=0.5, epochs=500)</code>: <code>w</code> из нулей, начиная с <code>b = 0</code>, и на каждой эпохе обновляйте её градиентом sigmoid-нейрона (<code>dz = (p − y) / n</code>, <code>dw = X.T @ dz</code>, <code>db = dz.sum()</code>). Соберите BCE каждой эпохи в список <code>losses</code> и верните <code>(w, b, losses)</code>. В данных: часы подготовки ученика (стандартизованные) и результат экзамена.</p>",
     "hints": [
      "Посчитайте loss до обновления и добавьте в список",
      "<code>dz = (p - y) / n</code>, <code>w -= lr * X.T @ dz</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert len(losses) == 500, f'Длина losses должна быть 500, у вас {len(losses)}'\nassert abs(losses[0] - _np.log(2)) < 1e-6, 'Начальный loss = log 2 ≈ 0.693 (w = 0, b = 0)'\nassert losses[-1] < 0.4, f'Конечный loss должен быть меньше 0.4, у вас {losses[-1]:.3f}'\nassert all(a >= b2 - 1e-12 for a, b2 in zip(losses, losses[1:])), 'Loss должен уменьшаться на каждой эпохе'\nassert w[0] > 0, 'Чем больше часов подготовки, тем выше вероятность сдачи: w > 0'\n_p = 1 / (1 + _np.exp(-(X @ w + b)))\nassert ((_p >= 0.5).astype(int) == y).mean() >= 0.75, 'Точность на обучении должна быть не ниже 0.75 (6 из 8 учеников)'"
     }
    },
    {
     "title": "Автоматическая проверка градиента",
     "prompt": "<p>Напишите <code>grad_check(f, grad_f, w, eps=1e-5, tol=1e-6)</code>: для каждого элемента <code>w</code> вычислите численный градиент центральной разностью и сравните с аналитическим <code>grad_f(w)</code>. Если наибольшая абсолютная разность меньше <code>tol</code>, верните <code>True</code>, иначе <code>False</code>. Проверяющий даёт правильный градиент и намеренно неверный (без деления на n).</p>",
     "hints": [
      "Для каждого элемента <code>e = np.zeros_like(w); e[i] = eps</code>",
      "<code>bool(np.max(np.abs(num - grad_f(w))) < tol)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.array([[1.0, 2.0], [2.0, 0.5], [0.5, 1.5], [3.0, 1.0]]); _y = _np.array([1, 0, 1, 0])\ndef _f(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return -_np.mean(_y * _np.log(p) + (1 - _y) * _np.log(1 - p))\ndef _good(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return _X.T @ ((p - _y) / len(_X))\ndef _bad(w):\n    p = 1 / (1 + _np.exp(-(_X @ w)))\n    return _X.T @ (p - _y)\n_w = _np.array([0.3, -0.2])\nassert grad_check(_f, _good, _w) is True, 'Для правильного градиента должно быть True'\nassert grad_check(_f, _bad, _w) is False, 'Для градиента без деления на n должно быть False'\nassert grad_check(lambda v: (v ** 2).sum(), lambda v: 2 * v, _np.array([1.0, -2.0, 0.5])) is True, 'Для x² градиент 2x верный'\nassert grad_check(lambda v: (v ** 2).sum(), lambda v: v, _np.array([1.0, -2.0, 0.5])) is False, 'Для x² градиент x неверный'"
     }
    }
   ]
  },
  "dl-5": {
   "pr": [
    {
     "title": "Признаки XOR",
     "prompt": "<p>Напишите <code>xor_labels(X)</code>: в каждой строке два бинарных входа; если входы разные, результат 1, если одинаковые, то 0. Результат — float-массив формы <code>(n, 1)</code>. Для <code>X = [[0,0],[0,1],[1,0],[1,1]]</code> → <code>[[0],[1],[1],[0]]</code>.</p>",
     "hints": [
      "<code>X[:, 0] != X[:, 1]</code>",
      "<code>.reshape(-1, 1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_y = xor_labels(_np.array([[0, 0], [0, 1], [1, 0], [1, 1]]))\nassert _y is not None and _np.shape(_y) == (4, 1), f'Форма должна быть (4, 1), у вас {_np.shape(_y)}'\nassert _np.array_equal(_y.ravel(), [0, 1, 1, 0]), f'Должно быть [0, 1, 1, 0], у вас {_y.ravel()}'\nassert _np.array_equal(xor_labels(_np.array([[1, 1], [1, 0]])).ravel(), [0, 1]), 'Должно работать для любого X'"
     }
    },
    {
     "title": "Градиент скрытого слоя",
     "prompt": "<p>При backward градиент, проходя через tanh-слой, умножается на его производную. Напишите <code>tanh_backward(dh, h)</code>: <code>dz1 = dh · (1 − h²)</code>, где <code>h</code> — выход tanh. Например, <code>dh = [[1.0, 2.0]]</code>, <code>h = [[0.0, 0.5]]</code> → <code>[[1.0, 1.5]]</code>.</p>",
     "hints": [
      "<code>dh * (1 - h ** 2)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = tanh_backward(_np.array([[1.0, 2.0]]), _np.array([[0.0, 0.5]]))\nassert _r is not None and _np.allclose(_r, [[1.0, 1.5]]), f'Должно быть [[1.0, 1.5]], у вас {_r}'\nassert _np.allclose(tanh_backward(_np.ones((2, 2)), _np.full((2, 2), 0.9)), 0.19), '1 · (1 − 0.81) = 0.19'"
     }
    },
    {
     "title": "Ответ из вероятности",
     "prompt": "<p>Напишите <code>to_labels(p, threshold=0.5)</code>: превратите выход сети (<code>(n, 1)</code> вероятностей) в простой список целых 0/1. Например, <code>to_labels(np.array([[0.02], [0.97], [0.5], [0.3]]))</code> → <code>[0, 1, 1, 0]</code>.</p>",
     "hints": [
      "<code>np.asarray(p).ravel()</code> делает массив плоским",
      "Чтобы получить список, используйте <code>int(...)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert to_labels(_np.array([[0.02], [0.97], [0.5], [0.3]])) == [0, 1, 1, 0], 'Результат должен быть списком [0, 1, 1, 0]'\nassert to_labels(_np.array([[0.6], [0.8]]), threshold=0.7) == [0, 1], 'Используйте параметр threshold'"
     }
    },
    {
     "title": "Градиенты выходного слоя",
     "prompt": "<p>Напишите <code>output_grads(h, p, y)</code>: для выходного слоя sigmoid + BCE вычислите <code>dz2 = (p − y) / n</code>, <code>dW2 = h.T @ dz2</code>, <code>db2 = dz2.sum(axis=0, keepdims=True)</code>. Функция должна вернуть <code>(dz2, dW2, db2)</code>. Форма <code>h</code> — <code>(n, k)</code>, <code>p</code> и <code>y</code> — <code>(n, 1)</code>.</p>",
     "hints": [
      "<code>len(y)</code> — число примеров n",
      "<code>dz2.sum(axis=0, keepdims=True)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(1)\n_h = _np.tanh(_r.normal(size=(4, 3))); _p = _r.uniform(0.1, 0.9, (4, 1)); _y = _np.array([[0], [1], [1], [0]], dtype=float)\n_out = output_grads(_h, _p, _y)\nassert _out is not None and len(_out) == 3, 'Верните тройку (dz2, dW2, db2)'\n_dz2, _dW2, _db2 = _out\nassert _np.allclose(_dz2, (_p - _y) / 4), 'dz2 = (p − y) / n'\nassert _np.shape(_dW2) == (3, 1) and _np.allclose(_dW2, _h.T @ ((_p - _y) / 4)), 'dW2 = h.T @ dz2, форма (3, 1)'\nassert _np.shape(_db2) == (1, 1), f'Форма db2 должна быть (1, 1): используйте keepdims=True. У вас {_np.shape(_db2)}'"
     }
    },
    {
     "title": "Один нейрон не решает XOR",
     "prompt": "<p>Один sigmoid-нейрон без скрытого слоя выучивает OR, но не может выучить XOR. Напишите <code>train_neuron(X, y, lr=1.0, epochs=2000)</code>: <code>w = zeros(2)</code>, начиная с <code>b = 0</code>, выполните градиентный спуск (<code>dz = (p − y) / n</code>) и верните <code>(preds, final_loss)</code>: <code>preds</code> — список 0/1, <code>final_loss</code> — итоговый BCE. Затем вычислите <code>or_preds</code> (для OR) и <code>xor_loss</code> (для XOR).</p>",
     "hints": [
      "Это обучение одного нейрона из dl-4",
      "Посчитайте финальный loss после цикла"
     ],
     "check": {
      "tests": "assert or_preds == [0, 1, 1, 1], f'Один нейрон выучивает OR: [0, 1, 1, 1], у вас {or_preds}'\nassert xor_loss is not None and xor_loss > 0.6, f'Для XOR loss должен оставаться около log 2 ≈ 0.693, у вас {xor_loss}'\n_p, _l = train_neuron(X, y_or, epochs=10)\nassert isinstance(_p, list) and len(_p) == 4, 'preds — список из 4 элементов'"
     }
    },
    {
     "title": "Один шаг обучения",
     "prompt": "<p>Напишите <code>train_step(params, X, y, lr)</code>: <code>params</code> — словарь с ключами <code>W1, b1, W2, b2</code> (сеть 2 → 4 tanh → 1 sigmoid). Выполните один forward, BCE и backward, обновите веса <b>внутри словаря</b> и верните loss <b>до</b> обновления. При повторных вызовах loss должен уменьшаться.</p>",
     "hints": [
      "При вычислении dh используйте <b>старый</b> W2 (до обновления)",
      "Записывайте новые значения через <code>params[\"W1\"] = ...</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(0)\n_pp = {\"W1\": _r.normal(0, 1, (2, 4)), \"b1\": _np.zeros((1, 4)), \"W2\": _r.normal(0, 1, (4, 1)), \"b2\": _np.zeros((1, 1))}\n_W1 = _pp[\"W1\"].copy(); _W2 = _pp[\"W2\"].copy()\n_h = _np.tanh(X @ _W1); _p = 1 / (1 + _np.exp(-(_h @ _W2)))\n_l0 = train_step(_pp, X, y, 0.5)\nassert abs(_l0 - (-_np.mean(y * _np.log(_p) + (1 - y) * _np.log(1 - _p)))) < 1e-9, 'Возвращаемый loss — это BCE до обновления'\n_dz2 = (_p - y) / 4\nassert _np.allclose(_pp[\"W2\"], _W2 - 0.5 * (_h.T @ _dz2)), 'W2 = W2 − lr · h.T @ dz2 должен обновиться внутри словаря'\n_dz1 = (_dz2 @ _W2.T) * (1 - _h ** 2)\nassert _np.allclose(_pp[\"W1\"], _W1 - 0.5 * (X.T @ _dz1)), 'Проверьте обновление W1: dz1 = (dz2 @ W2.T) · (1 − h²), со старым W2'\n_ls = [train_step(_pp, X, y, 1.0) for _ in range(300)]\nassert _ls[-1] < _ls[0], 'После нескольких шагов loss должен уменьшаться'"
     }
    },
    {
     "title": "XOR-сеть с ReLU",
     "prompt": "<p>Напишите сеть для XOR с нуля, но в скрытом слое используйте ReLU: 2 → 8 (ReLU) → 1 (sigmoid). <code>train_xor_relu(epochs=3000, lr=0.5, seed=0)</code>: <code>rng = np.random.default_rng(seed)</code>, <code>W1 = rng.normal(0, 1, (2, 8))</code>, <code>b1 = zeros((1, 8))</code>, <code>W2 = rng.normal(0, 1, (8, 1))</code>, <code>b2 = zeros((1, 1))</code>. Производная ReLU: <code>z1 &gt; 0</code> даёт 1. Функция должна вернуть <code>(preds, losses)</code>: <code>preds</code> — список 0/1.</p>",
     "hints": [
      "Для производной ReLU сохраните <code>z1</code>: <code>(z1 > 0)</code>",
      "Backward как в dl-5, только вместо <code>(1 - h**2)</code> используйте <code>(z1 > 0)</code>"
     ],
     "check": {
      "tests": "_preds, _losses = train_xor_relu()\nassert len(_losses) == 3000, f'Длина losses должна равняться epochs, у вас {len(_losses)}'\nassert _preds == [0, 1, 1, 0], f'preds должен быть [0, 1, 1, 0], у вас {_preds}'\nassert _losses[-1] < 0.05, f'Конечный loss должен быть меньше 0.05, у вас {_losses[-1]:.4f}'\nassert _losses[-1] < _losses[0], 'Loss азаюы керек'"
     }
    },
    {
     "title": "Численная проверка backprop",
     "prompt": "<p>Напишите <code>backward(X, y, W1, b1, W2, b2)</code>: для сети 2 → tanh → 1 sigmoid верните градиенты BCE как словарь <code>{\"W1\": dW1, \"b1\": db1, \"W2\": dW2, \"b2\": db2}</code>. Проверяющий сравнит каждый градиент с численным (<code>(L(θ+ε) − L(θ−ε)) / 2ε</code>).</p>",
     "hints": [
      "Формулы backward из урока dl-5",
      "Для b1 и b2 <code>sum(axis=0, keepdims=True)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(11)\n_X = _r.normal(size=(5, 2)); _y = _np.array([[0], [1], [1], [0], [1]], dtype=float)\n_P = {\"W1\": _r.normal(size=(2, 3)), \"b1\": _r.normal(size=(1, 3)), \"W2\": _r.normal(size=(3, 1)), \"b2\": _r.normal(size=(1, 1))}\ndef _loss(P):\n    h = _np.tanh(_X @ P[\"W1\"] + P[\"b1\"]); p = 1 / (1 + _np.exp(-(h @ P[\"W2\"] + P[\"b2\"])))\n    return -_np.mean(_y * _np.log(p) + (1 - _y) * _np.log(1 - p))\n_g = backward(_X, _y, _P[\"W1\"], _P[\"b1\"], _P[\"W2\"], _P[\"b2\"])\nfor _k in [\"W1\", \"b1\", \"W2\", \"b2\"]:\n    assert _np.shape(_g[_k]) == _P[_k].shape, f'Форма градиента {_k} должна быть {_P[_k].shape}'\n    _num = _np.zeros_like(_P[_k])\n    for _i in _np.ndindex(_P[_k].shape):\n        _old = _P[_k][_i]\n        _P[_k][_i] = _old + 1e-6; _lp = _loss(_P)\n        _P[_k][_i] = _old - 1e-6; _lm = _loss(_P)\n        _P[_k][_i] = _old\n        _num[_i] = (_lp - _lm) / 2e-6\n    assert _np.allclose(_g[_k], _num, atol=1e-6), f'Градиент {_k} не совпадает с численным'"
     }
    }
   ]
  },
  "dl-6": {
   "pr": [
    {
     "title": "Шаги в эпохе",
     "prompt": "<p>Напишите <code>steps_per_epoch(n, batch_size)</code>: количество шагов в одной эпохе, <code>ceil(n / batch_size)</code>. Например, 5 000 фото магазина в Шымкенте, batch 128 → 40 шагов.</p>",
     "hints": [
      "<code>math.ceil(n / batch_size)</code>"
     ],
     "check": {
      "tests": "assert steps_per_epoch(5000, 128) == 40, f'5000 / 128 → 40 шагов, у вас {steps_per_epoch(5000, 128)}'\nassert steps_per_epoch(10000, 64) == 157, '10000 / 64 → 157'\nassert steps_per_epoch(256, 64) == 4, 'Если делится без остатка, будет ровно 4'"
     }
    },
    {
     "title": "Общее число шагов",
     "prompt": "<p>Напишите <code>total_steps(n, batch_size, epochs)</code>: число шагов градиента за всё обучение. Например, 10 000 примеров, batch 64, 20 эпох → 3 140.</p>",
     "hints": [
      "Умножьте число шагов в эпохе на число эпох"
     ],
     "check": {
      "tests": "assert total_steps(10000, 64, 20) == 3140, f'Должно быть 3140, у вас {total_steps(10000, 64, 20)}'\nassert total_steps(100, 100, 5) == 5, 'Один batch, 5 эпох: 5 шагов'\nassert total_steps(101, 100, 3) == 6, '101 пример → 2 шага в эпохе, 3 эпохи → 6'"
     }
    },
    {
     "title": "Размер последнего batch",
     "prompt": "<p>Напишите <code>last_batch_size(n, batch_size)</code>: сколько примеров в последнем batch эпохи? Например, <code>last_batch_size(10000, 64)</code> → 16, а <code>last_batch_size(256, 64)</code> → 64.</p>",
     "hints": [
      "Остаток: <code>n % batch_size</code>"
     ],
     "check": {
      "tests": "assert last_batch_size(10000, 64) == 16, f'10000 % 64 = 16, у вас {last_batch_size(10000, 64)}'\nassert last_batch_size(256, 64) == 64, 'Если остаток 0, последний batch полный: 64'\nassert last_batch_size(5, 8) == 5, 'Если данных меньше batch, всё в одном batch'"
     }
    },
    {
     "title": "Перемешанные batch-и",
     "prompt": "<p>Напишите <code>shuffled_batches(X, y, batch_size, seed)</code>: перемешайте порядок с помощью <code>np.random.default_rng(seed).permutation(len(X))</code> и верните список пар <code>(Xb, yb)</code>. Каждый пример должен встретиться ровно один раз, а строки <code>X</code> и <code>y</code> не должны расходиться друг с другом.</p>",
     "hints": [
      "Перемешайте индексы и возьмите <code>X[idx]</code>, <code>y[idx]</code>",
      "<code>range(0, len(X), batch_size)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.arange(20).reshape(10, 2); _y = _np.arange(10) * 10\n_b = shuffled_batches(_X, _y, 4, seed=1)\nassert [len(yb) for _, yb in _b] == [4, 4, 2], f'Размеры batch-ей должны быть [4, 4, 2], у вас {[len(yb) for _, yb in _b]}'\n_all = _np.concatenate([yb for _, yb in _b])\nassert sorted(_all.tolist()) == list(range(0, 100, 10)), 'Каждый пример должен встретиться ровно один раз'\nassert _all.tolist() != list(range(0, 100, 10)), 'Дерек араластырылуы керек (permutation)'\nfor _xb, _yb in _b:\n    assert _np.array_equal(_xb[:, 0] * 5, _yb), 'Строки X и y должны сдвигаться вместе'\nassert [yb.tolist() for _, yb in shuffled_batches(_X, _y, 4, seed=1)] == [yb.tolist() for _, yb in _b], 'Один seed должен давать одинаковый результат'"
     }
    },
    {
     "title": "Начало переобучения",
     "prompt": "<p>Напишите <code>overfit_start(train_losses, val_losses)</code>: верните индекс (с 0) первой эпохи, в которой train loss снизился по сравнению с предыдущей, а val loss, наоборот, <b>вырос</b>. Если такой эпохи нет, верните <code>None</code>. Например, train <code>[0.9, 0.6, 0.4, 0.3, 0.2]</code>, val <code>[0.95, 0.7, 0.6, 0.65, 0.7]</code> → 3.</p>",
     "hints": [
      "Сравнивайте каждую эпоху начиная с 1-й с предыдущей"
     ],
     "check": {
      "tests": "assert overfit_start([0.9, 0.6, 0.4, 0.3, 0.2], [0.95, 0.7, 0.6, 0.65, 0.7]) == 3, 'На 3-й эпохе val начал расти'\nassert overfit_start([0.9, 0.6, 0.4], [0.9, 0.7, 0.5]) is None, 'Если оба снижаются, None'\nassert overfit_start([0.5, 0.6, 0.4], [0.5, 0.7, 0.8]) == 2, 'На 1-й эпохе train тоже вырос — это не переобучение; ответ 2'"
     }
    },
    {
     "title": "Таблица learning rate",
     "prompt": "<p>Scheduler со временем уменьшает learning rate. Напишите <code>step_decay(lr0, epochs, drop=0.5, every=10)</code>: верните список learning rate для каждой эпохи (от 0 до <code>epochs − 1</code>): <code>lr0 · drop<sup>epoch // every</sup></code>. Например, <code>step_decay(0.1, 25)</code>: в эпохах 0–9 это 0.1, в 10–19 — 0.05, в 20–24 — 0.025.</p>",
     "hints": [
      "<code>e // every</code> — сколько раз уменьшили"
     ],
     "check": {
      "tests": "_s = step_decay(0.1, 25)\nassert len(_s) == 25, f'Для 25 эпох должно быть 25 значений, у вас {len(_s)}'\nassert abs(_s[0] - 0.1) < 1e-12 and abs(_s[9] - 0.1) < 1e-12, '0–9 эпохада 0.1'\nassert abs(_s[10] - 0.05) < 1e-12 and abs(_s[24] - 0.025) < 1e-12, '10-эпохада 0.05, 24-эпохада 0.025'\n_t = step_decay(1.0, 7, drop=0.1, every=3)\nassert all(abs(a - b) < 1e-12 for a, b in zip(_t, [1, 1, 1, 0.1, 0.1, 0.1, 0.01])), 'Используйте параметры drop и every'"
     }
    },
    {
     "title": "Mini-batch градиентный спуск",
     "prompt": "<p>Напишите <code>minibatch_gd(X, y, batch_size, lr, epochs, seed=0)</code>: обучите линейную регрессию (<code>pred = X @ w + b</code>, MSE) mini-batch-ами. В каждой эпохе перемешивайте через <code>rng.permutation</code> (<code>rng = np.random.default_rng(seed)</code> создаётся один раз), для каждого batch считайте <code>dw = 2/m · Xb.T @ err</code> и <code>db = 2 · mean(err)</code>. Верните <code>(w, b, steps)</code>, а <code>steps</code> — число выполненных обновлений.</p>",
     "hints": [
      "Генератор создайте один раз перед циклом",
      "Внутри batch делите на <code>len(yb)</code> (последний batch меньше)"
     ],
     "check": {
      "tests": "import numpy as _np\n_w, _b, _s = minibatch_gd(X, y, 32, 0.05, 30)\nassert _s == 7 * 30, f'200 примеров, batch 32 → 7 шагов в эпохе, 30 эпох → 210. У вас {_s}'\nassert _np.allclose(_w, [3.0, -2.0], atol=0.1), f'Должно быть w ≈ [3, -2], у вас {_w}'\nassert abs(_b - 5) < 0.1, f'Должно быть b ≈ 5, у вас {_b}'\n_w2, _b2, _ = minibatch_gd(X, y, 32, 0.05, 30)\nassert _np.allclose(_w, _w2), 'Один seed должен давать одинаковый результат'"
     }
    },
    {
     "title": "Обучение с early stopping",
     "prompt": "<p>Напишите <code>fit_early_stop(step_fn, val_fn, w0, max_epochs, patience)</code>. В каждой эпохе выполните <code>w = step_fn(w)</code> (одна эпоха обучения), затем <code>val_fn(w)</code> — validation loss. Запомните веса и номер эпохи (с 0) с наименьшим loss. Если в течение <code>patience</code> эпох нет улучшения, остановитесь. Верните <code>(best_w, best_epoch, epochs_run)</code>.</p><p>Пример: <code>step_fn = lambda w: w + 1</code>, <code>val_fn = lambda w: (w − 5)²</code>, <code>w0 = 0</code>, patience 3 → <code>(5, 4, 8)</code>.</p>",
     "hints": [
      "Начните лучший loss с <code>float(\"inf\")</code>",
      "Условие остановки: <code>epoch - best_epoch >= patience</code>"
     ],
     "check": {
      "tests": "_r = fit_early_stop(lambda w: w + 1, lambda w: (w - 5) ** 2, 0, 100, 3)\nassert tuple(_r) == (5, 4, 8), f'Должно быть (5, 4, 8): лучшая эпоха 4, в эпохах 5, 6, 7 нет улучшения. У вас {_r}'\n_r2 = fit_early_stop(lambda w: w + 1, lambda w: -w, 0, 6, 2)\nassert tuple(_r2) == (6, 5, 6), f'Если всё время улучшается, идёт до max_epochs: (6, 5, 6). У вас {_r2}'\n_r3 = fit_early_stop(lambda w: w + 1, lambda w: (w - 2) ** 2, 0, 100, 1)\nassert tuple(_r3) == (2, 1, 3), f'patience = 1: (2, 1, 3). У вас {_r3}'"
     }
    }
   ]
  },
  "dl-7": {
   "pr": [
    {
     "title": "Обнуление градиентов",
     "prompt": "<p>В PyTorch градиенты накапливаются, поэтому перед каждым шагом мы вызываем <code>optimizer.zero_grad()</code>. Напишите функцию <code>zero_grad(params)</code>: пусть она заменит <code>grad</code> каждого <code>Param</code> в списке на нули той же формы.</p>",
     "hints": [
      "<code>p.grad = np.zeros_like(p.value)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_a = Param([1.0, 2.0]); _a.grad = _np.array([3.0, -1.0])\n_b = Param([[1.0]]); _b.grad = _np.array([[5.0]])\nzero_grad([_a, _b])\nassert _np.array_equal(_a.grad, [0.0, 0.0]) and _np.array_equal(_b.grad, [[0.0]]), 'Все grad должны стать нулями'\nassert _a.grad.shape == (2,) and _b.grad.shape == (1, 1), 'Форма grad должна совпадать с формой value'\nassert _np.array_equal(_a.value, [1.0, 2.0]), 'value не должен меняться'"
     }
    },
    {
     "title": "Вес nn.Linear",
     "prompt": "<p>В PyTorch <code>nn.Linear(in, out)</code> хранит вес в форме <code>(out, in)</code> и вычисляет <code>y = x @ W.T + b</code>. Напишите <code>linear(x, W, b)</code>. Например, у <code>nn.Linear(2, 3)</code> форма <code>W</code> — <code>(3, 2)</code>, и вход <code>(4, 2)</code> даёт выход <code>(4, 3)</code>.</p>",
     "hints": [
      "Транспонируйте вес: <code>W.T</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(0)\n_x = _r.normal(size=(4, 2)); _W = _r.normal(size=(3, 2)); _b = _r.normal(size=3)\n_y = linear(_x, _W, _b)\nassert _y is not None and _np.shape(_y) == (4, 3), f'Форма выхода должна быть (4, 3), у вас {_np.shape(_y)}'\nassert _np.allclose(_y, _x @ _W.T + _b), 'y = x @ W.T + b'"
     }
    },
    {
     "title": "Предсказание из logit",
     "prompt": "<p>Когда модель обучена с <code>BCEWithLogitsLoss</code>, выход — это logit. На инференсе мы получаем <code>torch.sigmoid(model(x))</code>. Напишите <code>predict_from_logits(logits, threshold=0.5)</code>: она должна вернуть <code>(probs, labels)</code>, а <code>labels</code> — массив int из 0/1. Например, logit <code>[2.0, -1.0, 0.0]</code> → labels <code>[1, 0, 1]</code>.</p>",
     "hints": [
      "<code>1 / (1 + np.exp(-logits))</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = predict_from_logits([2.0, -1.0, 0.0])\nassert _r is not None and len(_r) == 2, 'Верните пару (probs, labels)'\n_p, _l = _r\nassert _np.allclose(_p, [0.8808, 0.2689, 0.5], atol=1e-4), f'probs = sigmoid(logits), у вас {_p}'\nassert list(_l) == [1, 0, 1], f'labels = [1, 0, 1], у вас {list(_l)}'\nassert list(predict_from_logits([2.0, -1.0, 0.0], threshold=0.9)[1]) == [0, 0, 0], 'Используйте параметр threshold'"
     }
    },
    {
     "title": "Класс MSELoss",
     "prompt": "<p>Напишите класс, похожий на <code>nn.MSELoss</code> из PyTorch. При вызове <code>loss = loss_fn(pred, y)</code> он возвращает <code>mean((pred − y)²)</code> и запоминает <code>pred</code> и <code>y</code>. Метод <code>loss_fn.backward()</code> должен вернуть градиент по pred: <code>2 · (pred − y) / n</code>.</p>",
     "hints": [
      "Внутри <code>__call__</code> используйте <code>self.pred, self.y = pred, y</code>",
      "<code>backward</code>: <code>2 * (self.pred - self.y) / len(self.y)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_f = MSELoss()\n_v = _f(_np.array([1.0, 2.0, 4.0]), _np.array([1.0, 3.0, 2.0]))\nassert abs(_v - 5 / 3) < 1e-9, f'loss = (0 + 1 + 4) / 3 ≈ 1.667, у вас {_v}'\n_g = _f.backward()\nassert _np.allclose(_g, [0.0, -2 / 3, 4 / 3]), f'backward = 2·(pred − y)/n = [0, -0.667, 1.333], у вас {_g}'\n_f(_np.array([0.0, 0.0]), _np.array([1.0, 1.0]))\nassert _np.allclose(_f.backward(), [-1.0, -1.0]), 'backward должен использовать значения последнего вызова'"
     }
    },
    {
     "title": "SGD с momentum",
     "prompt": "<p>Напишите класс <code>torch.optim.SGD(..., momentum=0.9)</code> как <code>SGDMomentum(params, lr, momentum=0.9)</code>. Для каждого параметра храните скорость <code>v</code> (вначале ноль). <code>step()</code>: <code>v = momentum · v + grad</code>, <code>value = value − lr · v</code>. <code>zero_grad()</code> — обнуляет каждый grad.</p>",
     "hints": [
      "Для каждого параметра создайте скорость <code>np.zeros_like(p.value)</code>",
      "Сначала обновите <code>v</code>, потом <code>value</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_p = Param([1.0]); _o = SGDMomentum([_p], lr=0.1, momentum=0.9)\n_p.grad = _np.array([1.0]); _o.step()\nassert abs(_p.value[0] - 0.9) < 1e-9, f'Шаг 1: v = 1, value = 1 − 0.1·1 = 0.9. У вас {_p.value}'\n_p.grad = _np.array([1.0]); _o.step()\nassert abs(_p.value[0] - 0.71) < 1e-9, f'Шаг 2: v = 0.9·1 + 1 = 1.9, value = 0.9 − 0.19 = 0.71. У вас {_p.value}'\n_o.zero_grad()\nassert _np.array_equal(_p.grad, [0.0]), 'zero_grad() должен обнулять градиент'\n_q = Param([0.0, 0.0]); _o2 = SGDMomentum([_q], lr=0.5, momentum=0.0); _q.grad = _np.array([2.0, -2.0]); _o2.step()\nassert _np.allclose(_q.value, [-1.0, 1.0]), 'При momentum = 0 это обычный SGD'"
     }
    },
    {
     "title": "Класс DataLoader",
     "prompt": "<p>Напишите класс, похожий на <code>DataLoader</code> из PyTorch: <code>DataLoader(X, y, batch_size, shuffle=False, seed=0)</code>. Он должен отдавать <code>for xb, yb in loader</code> batch-ей; если <code>shuffle=True</code>, то в каждой эпохе (в начале каждого <code>for</code>) перемешивание через <code>self.rng.permutation</code> делается заново. <code>len(loader)</code> — число batch-ей.</p>",
     "hints": [
      "Внутри <code>__iter__</code> используйте <code>yield</code>",
      "Создайте генератор в <code>__init__</code> один раз"
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.arange(10).reshape(10, 1); _y = _np.arange(10)\n_l = DataLoader(_X, _y, 4)\nassert len(_l) == 3, f'10 примеров, batch 4 → 3 batch-а, у вас {len(_l)}'\n_b = [yb.tolist() for _, yb in _l]\nassert _b == [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]], f'shuffle=False: порядок сохраняется, у вас {_b}'\n_s = DataLoader(_X, _y, 4, shuffle=True, seed=3)\n_e1 = _np.concatenate([yb for _, yb in _s]).tolist(); _e2 = _np.concatenate([yb for _, yb in _s]).tolist()\nassert sorted(_e1) == list(range(10)), 'Каждый пример должен встретиться один раз'\nassert _e1 != list(range(10)) and _e1 != _e2, 'shuffle=True: в каждой эпохе новый порядок'\nfor _xb, _yb in _s:\n    assert _np.array_equal(_xb.ravel(), _yb), 'X и y должны перемешиваться вместе'"
     }
    },
    {
     "title": "Полный цикл обучения",
     "prompt": "<p><code>Linear</code>, <code>MSELoss</code>, <code>SGD</code> и <code>DataLoader</code> уже готовы (как в PyTorch). Напишите <code>fit(model, loader, loss_fn, opt, epochs)</code>: в каждой эпохе для каждого batch выполните <b>zero_grad → forward → loss → backward → step</b>. Backward: <code>model.backward(loss_fn.backward())</code>. Верните список средних loss по эпохам. Модель должна найти <code>y = −3x + 4</code>.</p>",
     "hints": [
      "Соблюдайте порядок пяти шагов: <code>opt.zero_grad()</code> первым",
      "Loss эпохи — среднее loss-ов batch-ей"
     ],
     "check": {
      "tests": "assert len(history) == 100, f'В history должно быть 100 эпох, у вас {len(history)}'\nassert history[-1] < history[0], 'Loss азаюы керек'\nassert abs(float(model.w.value[0]) + 3) < 0.05 and abs(float(model.b.value[0]) - 4) < 0.05, f'Должно быть w ≈ −3, b ≈ 4, у вас w={model.w.value}, b={model.b.value}. Вы вызвали zero_grad()?'\nassert history[-1] < 1e-3, 'В последней эпохе loss должен быть очень маленьким'"
     }
    },
    {
     "title": "Dropout: train и eval",
     "prompt": "<p>Напишите класс <code>Dropout(p, seed=0)</code>. Методы <code>train()</code> и <code>eval()</code> переключают режим (вначале train). В режиме train <code>__call__(x)</code> обнуляет каждый элемент с вероятностью <code>p</code> и остальные умножает на <code>1 / (1 − p)</code>: маска <code>self.rng.random(x.shape) &gt;= p</code>. В режиме eval <code>x</code> возвращает вход без изменений (как <code>model.eval()</code>).</p>",
     "hints": [
      "Режим храните в переменной <code>self.training</code>",
      "<code>x * mask / (1 - self.p)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_d = Dropout(0.5, seed=1)\n_x = _np.ones((100, 100))\n_o = _d(_x)\n_zero = (_o == 0).mean()\nassert 0.45 < _zero < 0.55, f'При p = 0.5 около 50% элементов должны быть нулями, у вас {_zero:.2f}'\nassert _np.allclose(_o[_o != 0], 2.0), 'Остальные элементы умножаются на 1 / (1 − p) = 2'\nassert abs(_o.mean() - 1) < 0.05, 'Среднее значение должно сохраняться'\n_d.eval()\nassert _np.array_equal(_d(_x), _x), 'В режиме eval x не меняется'\n_d.train()\nassert (_d(_x) == 0).any(), 'Если снова вызвать train(), dropout включится'"
     }
    }
   ]
  },
  "dl-8": {
   "pr": [
    {
     "title": "Размер feature map",
     "prompt": "<p>Напишите <code>conv_out(n, k, padding=0, stride=1)</code>: размер после convolution — <code>(n − k + 2·padding) // stride + 1</code>. Например, 5×5 изображение, k = 3 → 3; 28×28, k = 3, padding = 1 → 28.</p>",
     "hints": [
      "Запишите формулу через целое деление (<code>//</code>)"
     ],
     "check": {
      "tests": "assert conv_out(5, 3) == 3, 'conv_out(5, 3) = 3'\nassert conv_out(28, 3, padding=1) == 28, '«same» padding: 28 → 28'\nassert conv_out(32, 5, stride=2) == 14, '(32 − 5) // 2 + 1 = 14'\nassert conv_out(224, 7, padding=3, stride=2) == 112, 'Первый слой ResNet: 224 → 112'"
     }
    },
    {
     "title": "Параметры Conv2d",
     "prompt": "<p>Напишите <code>conv_params(in_ch, out_ch, k)</code>: число параметров слоя <code>nn.Conv2d(in_ch, out_ch, k)</code>. В каждом фильтре <code>in_ch · k · k</code> весов и 1 bias. Например, <code>conv_params(3, 16, 3)</code> → 448.</p>",
     "hints": [
      "<code>out_ch * (in_ch * k * k + 1)</code>"
     ],
     "check": {
      "tests": "assert conv_params(3, 16, 3) == 448, f'16 · (27 + 1) = 448, у вас {conv_params(3, 16, 3)}'\nassert conv_params(1, 8, 3) == 80, '8 · (9 + 1) = 80'\nassert conv_params(64, 128, 1) == 8320, '1×1 kernel: 128 · (64 + 1) = 8320'"
     }
    },
    {
     "title": "Padding нулями",
     "prompt": "<p>Напишите <code>pad_zeros(img, p)</code>: добавьте по <code>p</code> ряда нулей с каждой из четырёх сторон 2D-изображения (<code>np.pad</code>). Например, изображение 3×3, <code>p = 1</code> → 5×5, в центре — исходное изображение.</p>",
     "hints": [
      "<code>np.pad(img, p)</code> по умолчанию добавляет нули"
     ],
     "check": {
      "tests": "import numpy as _np\n_a = _np.arange(1, 10, dtype=float).reshape(3, 3)\n_r = pad_zeros(_a, 1)\nassert _np.shape(_r) == (5, 5), f'Форма должна быть (5, 5), у вас {_np.shape(_r)}'\nassert _np.array_equal(_r[1:4, 1:4], _a) and _r[0].sum() == 0 and _r[:, -1].sum() == 0, 'В центре изображение, по краям нули'\nassert _np.shape(pad_zeros(_np.ones((4, 6)), 2)) == (8, 10), 'p = 2: (4, 6) → (8, 10)'"
     }
    },
    {
     "title": "Convolution с stride",
     "prompt": "<p>Напишите <code>conv2d_stride(img, k, stride)</code> (без padding): ядро <code>stride</code> сдвигается с шагом. Размер выхода <code>(H − kh) // stride + 1</code> × <code>(W − kw) // stride + 1</code>, элемент <code>(i, j)</code> = <code>(img[i·s : i·s+kh, j·s : j·s+kw] · k).sum()</code>.</p>",
     "hints": [
      "Начальное место: <code>r, c = i * stride, j * stride</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_img = _np.arange(25, dtype=float).reshape(5, 5); _k = _np.ones((3, 3))\n_r = conv2d_stride(_img, _k, 2)\nassert _np.shape(_r) == (2, 2), f'5×5, k = 3, stride = 2 → (2, 2), у вас {_np.shape(_r)}'\nassert _np.allclose(_r, [[54, 72], [144, 162]]), f'Должно быть [[54, 72], [144, 162]], у вас {_r}'\n_a = _np.random.default_rng(2).normal(size=(7, 7)); _kk = _np.random.default_rng(3).normal(size=(3, 3))\n_ref = _np.array([[(_a[i:i+3, j:j+3] * _kk).sum() for j in range(5)] for i in range(5)])\nassert _np.allclose(conv2d_stride(_a, _kk, 1), _ref), 'При stride = 1 это обычная convolution'"
     }
    },
    {
     "title": "Average pooling",
     "prompt": "<p>Напишите <code>avgpool2(x)</code>: блоки 2×2, шаг 2, среднее каждого блока (размеры чётные). Например, <code>[[1, 3, 2, 0], [5, 3, 2, 4], ...]</code> левого верхнего блока: (1 + 3 + 5 + 3) / 4 = 3.</p>",
     "hints": [
      "<code>x.reshape(h // 2, 2, w // 2, 2)</code>",
      "<code>.mean(axis=(1, 3))</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_fm = _np.array([[1, 3, 2, 0], [5, 3, 2, 4], [0, 0, 7, 1], [4, 0, 1, 3]], dtype=float)\n_r = avgpool2(_fm)\nassert _np.allclose(_r, [[3, 2], [1, 3]]), f'Должно быть [[3, 2], [1, 3]], у вас {_r}'\n_a = _np.arange(36, dtype=float).reshape(6, 6)\nassert _np.allclose(avgpool2(_a), _a.reshape(3, 2, 3, 2).mean(axis=(1, 3))), 'Должно работать и для 6×6'"
     }
    },
    {
     "title": "Поиск горизонтальной границы",
     "prompt": "<p>На картинке верхняя часть светлая, нижняя тёмная. Горизонтальная граница задаётся ядром <code>[[1, 1, 1], [0, 0, 0], [-1, -1, -1]]</code>. Напишите <code>edge_row(img)</code>: примените это ядро к изображению (без padding, stride 1) и верните индекс строки feature map, у которой сумма абсолютных значений наибольшая.</p>",
     "hints": [
      "Сначала вычислите feature map",
      "<code>np.abs(fmap).sum(axis=1)</code> — «сила» каждой строки"
     ],
     "check": {
      "tests": "import numpy as _np\n_img = _np.array([[9] * 5, [9] * 5, [9] * 5, [0] * 5, [0] * 5, [0] * 5], dtype=float)\nassert edge_row(_img) in (1, 2), f'Граница между строками 2 и 3: в feature map это строка 1 или 2, у вас {edge_row(_img)}'\n_img2 = _np.zeros((8, 6)); _img2[:2] = 5\nassert edge_row(_img2) in (0, 1), 'Если граница наверху, индекс 0 или 1'\n_img3 = _np.zeros((8, 6)); _img3[6:] = 5\nassert edge_row(_img3) in (4, 5), 'Если граница внизу, индекс 4 или 5'"
     }
    },
    {
     "title": "Conv → ReLU → Pool",
     "prompt": "<p>Напишите блок CNN: <code>conv_block(img, k)</code> — convolution (без padding, stride 1), ReLU, затем 2×2 max pooling (stride 2). Если размер результата convolution нечётный, перед pooling отбросьте последнюю строку/столбец. Например, изображение 7×7, ядро 3×3 → 5×5 → обрезка до 4×4 → 2×2.</p>",
     "hints": [
      "Обрежьте до чётного размера через <code>f[:h, :w]</code>, где <code>h = f.shape[0] // 2 * 2</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_r = _np.random.default_rng(5)\n_img = _r.normal(size=(7, 7)); _k = _r.normal(size=(3, 3))\n_f = _np.array([[(_img[i:i+3, j:j+3] * _k).sum() for j in range(5)] for i in range(5)])\n_f = _np.maximum(0, _f)[:4, :4]\n_ref = _f.reshape(2, 2, 2, 2).max(axis=(1, 3))\n_o = conv_block(_img, _k)\nassert _np.shape(_o) == (2, 2), f'7×7 → 5×5 → 2×2, у вас {_np.shape(_o)}'\nassert _np.allclose(_o, _ref), 'Порядок: conv → ReLU → max pool'\nassert (_o >= 0).all(), 'После ReLU отрицательных значений не будет'\n_o2 = conv_block(_r.normal(size=(10, 10)), _np.ones((3, 3)))\nassert _np.shape(_o2) == (4, 4), '10×10 → 8×8 → 4×4'"
     }
    },
    {
     "title": "Подсчёт формы CNN",
     "prompt": "<p>Напишите <code>cnn_summary(n, in_ch, layers)</code>: изображение <code>in_ch × n × n</code>. <code>layers</code> — кортежи из <code>(\"conv\", out_ch, k, padding)</code> или <code>(\"pool\", 2)</code> (stride: conv 1, pool — его размер). Функция вернёт последнюю форму <code>(C, H, W)</code> и общее число параметров всех conv-слоёв: <code>((C, H, W), params)</code>. Сеть из урока: <code>cnn_summary(28, 1, [(\"conv\", 8, 3, 1), (\"pool\", 2), (\"conv\", 16, 3, 1), (\"pool\", 2)])</code> → <code>((16, 7, 7), 1248)</code>.</p>",
     "hints": [
      "Текущее число каналов храните в <code>c</code>: у следующего conv <code>in_ch</code> такое же",
      "Pool не меняет число каналов"
     ],
     "check": {
      "tests": "_r = cnn_summary(28, 1, [(\"conv\", 8, 3, 1), (\"pool\", 2), (\"conv\", 16, 3, 1), (\"pool\", 2)])\nassert tuple(_r[0]) == (16, 7, 7), f'Последняя форма должна быть (16, 7, 7), у вас {_r[0]}'\nassert _r[1] == 1248, f'Параметры: 8·(9+1) + 16·(72+1) = 80 + 1168 = 1248, у вас {_r[1]}'\n_r2 = cnn_summary(32, 3, [(\"conv\", 16, 3, 0)])\nassert tuple(_r2[0]) == (16, 30, 30) and _r2[1] == 448, 'padding = 0: 32 → 30, параметр 448'\nassert cnn_summary(8, 1, []) == ((1, 8, 8), 0), 'Если слоёв нет — форма входа и 0 параметров'"
     }
    }
   ]
  },
  "dl-9": {
   "pr": [
    {
     "title": "Параметры новой head",
     "prompt": "<p>Напишите <code>head_params(in_features, n_classes)</code>: число параметров <code>nn.Linear(in_features, n_classes)</code>-head. Например, ResNet-18 (512 признаков) и 5 казахских блюд → 2 565.</p>",
     "hints": [
      "<code>in·n + n</code>"
     ],
     "check": {
      "tests": "assert head_params(512, 5) == 2565, f'512·5 + 5 = 2565, у вас {head_params(512, 5)}'\nassert head_params(2048, 10) == 20490, 'ResNet-50, 10 класс: 20490'\nassert head_params(768, 2) == 1538, 'BERT embedding (768), два класса: 1538'"
     }
    },
    {
     "title": "Доля замороженных параметров",
     "prompt": "<p>Напишите <code>frozen_share(layers, train)</code>: <code>layers</code> — словарь от имени блока к числу параметров, <code>train</code> — список блоков, которые обучаются. Верните долю замороженных параметров (0…1). Например, <code>{\"backbone\": 990, \"fc\": 10}</code>, <code>[\"fc\"]</code> → 0.99.</p>",
     "hints": [
      "<code>sum(v for k, v in layers.items() if k not in train)</code>"
     ],
     "check": {
      "tests": "assert abs(frozen_share({\"backbone\": 990, \"fc\": 10}, [\"fc\"]) - 0.99) < 1e-12, '990 / 1000 = 0.99'\nassert frozen_share({\"a\": 5, \"b\": 5}, [\"a\", \"b\"]) == 0, 'Если обучается всё, то 0'\n_l = {\"conv1\": 9408, \"layer1\": 147968, \"layer2\": 525568, \"layer3\": 2099712, \"layer4\": 8393728, \"fc\": 2565}\nassert abs(frozen_share(_l, [\"fc\"]) - 0.99977) < 1e-4, 'ResNet-18, тек fc: ≈ 0.9998'"
     }
    },
    {
     "title": "Feature extraction или fine-tuning",
     "prompt": "<p>Напишите <code>choose_strategy(n_examples, far_domain=False)</code>: если домен далёк от ImageNet (рентгеновские снимки, спутниковые фото) или примеров не меньше 1 000 — <code>\"fine_tuning\"</code>; иначе (сотни примеров) — <code>\"feature_extraction\"</code>.</p>",
     "hints": [
      "<code>if far_domain or n_examples >= 1000</code>"
     ],
     "check": {
      "tests": "assert choose_strategy(300) == 'feature_extraction', '300 фото блюд: feature_extraction'\nassert choose_strategy(5000) == 'fine_tuning', '5000 сурет: fine_tuning'\nassert choose_strategy(1000) == 'fine_tuning', 'Шекара: 1000 → fine_tuning'\nassert choose_strategy(200, far_domain=True) == 'fine_tuning', 'Домен алыс болса: fine_tuning'"
     }
    },
    {
     "title": "Подход по данным",
     "prompt": "<p>По таблице из урока напишите <code>recommend(projects)</code>: <code>projects</code> — список словарей <code>{\"name\": ..., \"data\": ...}</code>. <code>data</code>: <code>\"table\"</code> → <code>\"gradient_boosting\"</code>; <code>\"image\"</code>, <code>\"audio\"</code>, <code>\"video\"</code> → <code>\"pretrained_cnn\"</code>; <code>\"text\"</code> → <code>\"pretrained_lm\"</code>; иначе → <code>\"unknown\"</code>. Результат: словарь <code>{name: тәсіл}</code>.</p>",
     "hints": [
      "Запишите правила в словарь и примените <code>.get(data, \"unknown\")</code>"
     ],
     "check": {
      "tests": "_p = [{\"name\": \"churn\", \"data\": \"table\"}, {\"name\": \"тағамдар\", \"data\": \"image\"},\n      {\"name\": \"пікірлер\", \"data\": \"text\"}, {\"name\": \"қоңырау\", \"data\": \"audio\"}, {\"name\": \"x\", \"data\": \"graph\"}]\n_r = recommend(_p)\nassert _r.get(\"churn\") == \"gradient_boosting\", 'Табличные данные: gradient_boosting'\nassert _r.get(\"тағамдар\") == \"pretrained_cnn\" and _r.get(\"қоңырау\") == \"pretrained_cnn\", 'Сурет пен дыбыс: pretrained_cnn'\nassert _r.get(\"пікірлер\") == \"pretrained_lm\", 'Текст: pretrained_lm'\nassert _r.get(\"x\") == \"unknown\", 'Неизвестный тип данных: unknown'\nassert recommend([]) == {}, 'Пустой список — пустой словарь'"
     }
    },
    {
     "title": "Нормализация ImageNet",
     "prompt": "<p>Pretrained модели нужно подавать нормализованные изображения, как при обучении. Напишите <code>normalize(img, mean, std)</code>: <code>img</code> формы <code>(H, W, 3)</code>, значения 0…255. Сначала делите на 255, затем по каждому каналу вычитайте <code>(x − mean) / std</code> и делите на <code>denormalize(x, mean, std)</code>. Верните обратное преобразование, значения 0…255.</p>",
     "hints": [
      "Broadcasting: <code>(H, W, 3) − (3,)</code> берёт свой mean для каждого канала"
     ],
     "check": {
      "tests": "import numpy as _np\n_img = _np.random.default_rng(0).integers(0, 256, (4, 5, 3))\n_n = normalize(_img, MEAN, STD)\nassert _np.shape(_n) == (4, 5, 3), 'Форма должна сохраниться'\nassert _np.allclose(_n, (_img / 255 - MEAN) / STD), 'normalize = (img / 255 − mean) / std, по каждому каналу'\nassert _np.allclose(denormalize(_n, MEAN, STD), _img), 'denormalize(normalize(img)) = img'\n_g = normalize(_np.full((1, 1, 3), 255), MEAN, STD)\nassert _np.allclose(_g[0, 0], (1 - MEAN) / STD), 'Для белого пикселя (255) это (1 − mean) / std'"
     }
    },
    {
     "title": "Голова по центроидам",
     "prompt": "<p>Самая простая head — центроид каждого класса (середина его признаков). Напишите <code>fit_centroids(F, y)</code>: для каждого класса верните среднее строк <code>F</code> как словарь <code>{класс: вектор}</code>. <code>predict_centroid(F, centroids)</code> для каждой строки возвращает класс с наименьшим евклидовым расстоянием (список). <code>F</code> — признаки замороженного backbone.</p>",
     "hints": [
      "<code>F[y == c].mean(axis=0)</code>",
      "Для расстояния используйте <code>((F[:, None] - C[None]) ** 2).sum(axis=2)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_F = _np.array([[0.0, 0.0], [0.2, 0.0], [5.0, 5.0], [5.2, 4.8], [0.0, 5.0], [0.2, 5.2]])\n_y = _np.array([0, 0, 1, 1, 2, 2])\n_c = fit_centroids(_F, _y)\nassert set(_c) == {0, 1, 2}, 'Один центроид для каждого класса'\nassert _np.allclose(_c[0], [0.1, 0.0]) and _np.allclose(_c[1], [5.1, 4.9]), 'Центроид — среднее строк класса'\n_p = predict_centroid(_np.array([[0.3, 0.1], [4.0, 4.0], [0.0, 4.0]]), _c)\nassert [int(v) for v in _p] == [0, 1, 2], f'Предсказание должно быть [0, 1, 2], у вас {_p}'"
     }
    },
    {
     "title": "Обучение softmax-головы",
     "prompt": "<p>На признаках замороженного backbone (<code>extract</code> уже готовы) обучите многоклассовую head на numpy. <code>train_head(F, y, k, lr=0.5, epochs=300)</code>: <code>W = zeros((F.shape[1], k))</code>, <code>b = zeros(k)</code>. В каждой эпохе <code>P = softmax(F @ W + b)</code>, градиент <code>dZ = (P − Y) / n</code> (Y — one-hot), <code>dW = F.T @ dZ</code>, <code>db = dZ.sum(axis=0)</code>. Верните <code>(W, b)</code>. Затем запишите test accuracy в <code>head_acc</code>.</p>",
     "hints": [
      "One-hot: <code>Y[np.arange(n), y] = 1</code>",
      "Предсказание: <code>np.argmax(F @ W + b, axis=1)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert _np.shape(W) == (16, 3) and _np.shape(b) == (3,), f'Форма W (16, 3), b — (3,), у вас {_np.shape(W)}, {_np.shape(b)}'\nassert _np.abs(W).sum() > 0, 'W должен обучиться (не нули)'\nassert head_acc >= 0.9, f'head_acc должен быть не меньше 0.9, у вас {head_acc}'\nassert W_frozen.shape == (2, 16), 'Не меняйте веса backbone'\n_W1, _b1 = train_head(extract(X_train), y_train, 3, epochs=1)\nassert _np.allclose(_b1, -0.5 * (1 / 3 - _np.array([(y_train == c).mean() for c in range(3)]))), 'Первый шаг: P = 1/3, db = mean(P − Y)'"
     },
     "starter": "import numpy as np\nrng = np.random.default_rng(3)\ncenters = np.array([[0, 2], [2, -1], [-2, -1]])\ny_all = rng.integers(0, 3, 240)\nX_all = centers[y_all] + rng.normal(0, 0.6, (240, 2))\nX_train, X_test, y_train, y_test = X_all[:180], X_all[180:], y_all[:180], y_all[180:]\n\nW_frozen = np.random.default_rng(0).normal(0, 1, (2, 16))\ndef extract(X):\n    return np.tanh(X @ W_frozen)   # замороженный backbone\n\ndef train_head(F, y, k, lr=0.5, epochs=300):\n    W = np.zeros((F.shape[1], k)); b = np.zeros(k)\n    return W, b\n\nW, b = train_head(extract(X_train), y_train, 3)\nhead_acc = 0\n"
    },
    {
     "title": "Head и сырые признаки",
     "prompt": "<p>В данных важно, в какой четверти лежит точка: <code>x1 · x2 &gt; 0</code> означает класс 1 (как XOR). Обучите <code>X</code> на сырых <code>LogisticRegression(max_iter=1000)</code> и запишите test accuracy в <code>raw_acc</code>, а accuracy обученной <code>extract(X)</code> head на замороженных <code>head</code> признаках — в <code>head_acc</code>. <code>head_params</code> — число обученных параметров head (<code>coef_.size + intercept_.size</code>).</p>",
     "hints": [
      "<code>LogisticRegression(max_iter=1000).fit(extract(X_train), y_train)</code>",
      "<code>model.score(X, y)</code> даёт accuracy"
     ],
     "check": {
      "tests": "assert raw_acc < 0.7, f'Линейная модель на сырых X не может разделить четверти: raw_acc < 0.7, у вас {raw_acc}'\nassert head is not None and head.n_features_in_ == 100, 'Head должна обучаться на 100 признаках extract(X_train)'\nassert head_acc >= 0.9, f'head_acc должен быть не меньше 0.9, у вас {head_acc}'\nassert head_params == 101, f'head_params = 100 весов + 1 bias = 101, у вас {head_params}'"
     }
    }
   ]
  },
  "cap6-1": {
   "pr": [
    {
     "title": "Формула прибыли",
     "prompt": "<p>Напишите <code>profit(tp, contacted, cost=2000, value=40000, save_rate=0.3)</code>: прибыль от удержания клиента — <code>save_rate · value · tp − cost · contacted</code>. Пример из урока: <code>profit(29, 55)</code> → 238 000 ₸.</p>",
     "hints": [
      "Формула из урока: <code>save_rate * value * tp - cost * contacted</code>"
     ],
     "check": {
      "tests": "assert profit(29, 55) is not None and abs(profit(29, 55) - 238000) < 1e-6, 'profit(29, 55) = 348 000 − 110 000 = 238 000'\nassert abs(profit(0, 10) + 20000) < 1e-6, 'Если никто не остаётся, только потери: −20 000'\nassert abs(profit(10, 20, cost=1000, value=50000, save_rate=0.5) - 230000) < 1e-6, 'Используйте параметры: 0.5·50000·10 − 1000·20 = 230 000'"
     }
    },
    {
     "title": "Выполнен ли SLO",
     "prompt": "<p>SLO сервиса: p95 latency &lt; 200 ms и доля 5xx &lt; 0.1%. Напишите <code>slo_ok(latencies_ms, n_5xx, n_total)</code>: вычислите p95 через <code>np.percentile(latencies_ms, 95)</code> и верните <code>True</code>, если выполнены оба условия, иначе <code>False</code>.</p>",
     "hints": [
      "<code>np.percentile(latencies_ms, 95)</code>",
      "Объедините два условия через <code>and</code>"
     ],
     "check": {
      "tests": "_fast = [50] * 95 + [150] * 5\nassert slo_ok(_fast, 0, 10000) is True, 'p95 = 150 ms, ошибок нет: True'\nassert slo_ok([50] * 90 + [400] * 10, 0, 10000) is False, 'p95 = 400 ms: False'\nassert slo_ok(_fast, 10, 10000) is False, '10 / 10000 = 0.1% — равно порогу, SLO не выполнен: False'\nassert slo_ok(_fast, 9, 10000) is True, '9 / 10000 < 0.1%: True'"
     }
    },
    {
     "title": "Число ушедших клиентов",
     "prompt": "<p>Посчитайте по <code>churn.csv</code>: <code>n_customers</code> — число абонентов, <code>n_churned</code> — число ушедших (<code>churned == 1</code>), <code>churn_rate</code> — доля оттока.</p>",
     "hints": [
      "<code>churn[\"churned\"].sum()</code> считает единицы"
     ],
     "check": {
      "tests": "assert n_customers == 600, f'n_customers должно быть 600, у вас {n_customers}'\nassert n_churned == 155, f'n_churned должно быть 155, у вас {n_churned}'\nassert churn_rate is not None and abs(churn_rate - 155 / 600) < 1e-9, 'churn_rate = 155 / 600 ≈ 0.258'"
     }
    },
    {
     "title": "Отток по городам",
     "prompt": "<p>Чтобы оценить риск несправедливости, смотрим долю оттока в каждом городе. <code>city_rates</code> — словарь <code>{қала: үлес}</code> (округлённый до 3 знаков), <code>worst_city</code> — город с самой высокой долей, <code>gap</code> — разница между самой высокой и самой низкой долей (без округления).</p>",
     "hints": [
      "<code>churn.groupby(\"city\")[\"churned\"].mean()</code>",
      "<code>.idxmax()</code> даёт индекс наибольшего значения"
     ],
     "check": {
      "tests": "assert len(city_rates) == 5, f'Должно быть 5 городов, у вас {len(city_rates)}'\nassert city_rates.get('Қарағанды') == 0.31 and city_rates.get('Шымкент') == 0.228, f'Карағанды 0.31, Шымкент 0.228, у вас {city_rates}'\nassert worst_city == 'Қарағанды', f'worst_city = Қарағанды, у вас {worst_city}'\nassert gap is not None and abs(gap - (18 / 58 - 21 / 92)) < 1e-9, 'gap = 0.3103 − 0.2283 ≈ 0.082'"
     }
    },
    {
     "title": "Recall и precision",
     "prompt": "<p>Офлайн-метрика — recall по уходящим клиентам. Напишите <code>recall_precision(y_true, y_pred)</code>: верните <code>(recall, precision)</code>, <code>recall = TP / (TP + FN)</code>, <code>precision = TP / (TP + FP)</code>. Если знаменатель 0, метрика равна 0.0. Например, <code>y_true = [1, 1, 0, 0, 1]</code>, <code>y_pred = [1, 0, 1, 0, 1]</code> → <code>(0.667, 0.667)</code>.</p>",
     "hints": [
      "TP: <code>(y_true == 1) & (y_pred == 1)</code>",
      "Избегайте деления на ноль"
     ],
     "check": {
      "tests": "_r = recall_precision([1, 1, 0, 0, 1], [1, 0, 1, 0, 1])\nassert _r is not None and abs(_r[0] - 2 / 3) < 1e-9 and abs(_r[1] - 2 / 3) < 1e-9, f'Должно быть (2/3, 2/3), у вас {_r}'\nassert tuple(recall_precision([1, 1, 0], [1, 1, 1])) == (1.0, 2 / 3), 'Если предложить всем, recall = 1'\nassert tuple(recall_precision([1, 0], [0, 0])) == (0.0, 0.0), 'Если никому не предлагать, recall = 0, precision = 0 (знаменатель 0)'"
     }
    },
    {
     "title": "Клиент по правилу",
     "prompt": "<p>Простое правило без модели: делаем предложение абоненту, у которого нет договора (<code>has_contract == 0</code>) и кто был на связи с поддержкой не менее 3 раз. <code>campaign_profit</code> уже готов. Вычислите по всему <code>churn.csv</code> <code>rule_pred</code> (0/1 Series), <code>n_offers</code> (число предложений) и <code>profit_rule</code>.</p>",
     "hints": [
      "Объедините два условия через <code>&</code> и возьмите в скобки",
      "<code>.astype(int)</code>"
     ],
     "check": {
      "tests": "_ref = ((churn['has_contract'] == 0) & (churn['support_calls'] >= 3)).astype(int)\nassert rule_pred is not None and len(rule_pred) == 600 and (rule_pred.values == _ref.values).all(), 'rule_pred: has_contract == 0 И support_calls >= 3'\nassert n_offers == int(_ref.sum()), f'n_offers должно быть {int(_ref.sum())}, у вас {n_offers}'\nassert profit_rule is not None and abs(profit_rule - 268000) < 1e-6, f'profit_rule должно быть 268 000 ₸, у вас {profit_rule}'"
     }
    },
    {
     "title": "Самый выгодный порог",
     "prompt": "<p>Правило по количеству обращений в поддержку: если их <code>support_calls &gt;= t</code>, делаем предложение. Напишите <code>best_threshold(df, ts)</code>: для каждого <code>t</code> считайте прибыль по всем данным через <code>campaign_profit</code> и верните <code>(ең жақсы t, оның пайдасы, {t: пайда})</code> (при равенстве — меньший t). Затем <code>best_t, best_profit, table = best_threshold(churn, range(0, 7))</code>.</p>",
     "hints": [
      "Словарь: <code>{t: campaign_profit(...) for t in ts}</code>",
      "<code>max(table, key=...)</code>"
     ],
     "check": {
      "tests": "assert len(table) == 7, f'В table должно быть 7 порогов, у вас {len(table)}'\nassert abs(table[0] - 660000) < 1e-6, 't = 0 — предлагать всем: 660 000'\nassert best_t == 1 and abs(best_profit - 758000) < 1e-6, f'Лучший — t = 1, прибыль должна быть 758 000, у вас t={best_t}, {best_profit}'\nassert abs(table[3] - 354000) < 1e-6, 't = 3: 354 000'"
     }
    },
    {
     "title": "Сравнение стратегий",
     "prompt": "<p>Напишите <code>compare_strategies(y, strategies)</code>: <code>strategies</code> — <code>{атау: 0/1 болжамдар}</code>. Для каждой стратегии посчитайте прибыль и верните <code>(ең тиімді атау, {атау: пайда}, baseline-дан озды ма)</code>. Третье значение: если лучшая стратегия строго выше «предложить всем» и «никому не предлагать», то <code>True</code>. Затем для четырёх стратегий <code>best, profits, beats = compare_strategies(...)</code>: <code>all</code>, <code>none</code>, <code>no_contract</code> (<code>has_contract == 0</code>), <code>calls_2</code> (<code>support_calls &gt;= 2</code>).</p>",
     "hints": [
      "Прибыль «предложить всем» считайте через <code>np.ones(len(y))</code>",
      "Прибыль «никому не предлагать» всегда 0"
     ],
     "check": {
      "tests": "assert set(profits) == {'all', 'none', 'no_contract', 'calls_2'}, f'Нужны четыре стратегии, у вас {set(profits)}'\nassert abs(profits['all'] - 660000) < 1e-6 and abs(profits['none']) < 1e-6, 'all = 660 000, none = 0'\nassert abs(profits['no_contract'] - 718000) < 1e-6 and abs(profits['calls_2'] - 526000) < 1e-6, 'no_contract = 718 000, calls_2 = 526 000'\nassert best == 'no_contract' and beats is True, f'Лучшая — no_contract, она обходит baseline. У вас {best}, {beats}'\n_b2, _p2, _w2 = compare_strategies(y, {'all': strategies['all'], 'calls_5': (churn['support_calls'] >= 5).astype(int)})\nassert _b2 == 'all' and _w2 is False, 'Если лучшая — «предложить всем», то она не обходит baseline: False'"
     }
    }
   ]
  },
  "cap6-2": {
   "pr": [
    {
     "title": "Доля пропусков",
     "prompt": "<p>Напишите <code>missing_share(df)</code>: для столбцов, где есть пропуски, верните словарь <code>{баған: бос мәндер үлесі}</code>, доли округлите до 3 знаков. Для <code>churn.csv</code>: <code>{\"age\": 0.042, \"data_gb\": 0.028}</code>.</p>",
     "hints": [
      "<code>df.isna().mean()</code> даёт долю пропусков в каждом столбце"
     ],
     "check": {
      "tests": "import pandas as _pd\nassert missing_share(churn) == {'age': 0.042, 'data_gb': 0.028}, f\"Должно быть {{'age': 0.042, 'data_gb': 0.028}}, у вас {missing_share(churn)}\"\nassert missing_share(_pd.DataFrame({'a': [1, None, None, 4], 'b': [1, 2, 3, 4]})) == {'a': 0.5}, 'Столбец без пропусков не попадает в результат'"
     }
    },
    {
     "title": "Недостающие столбцы",
     "prompt": "<p>Когда приходят новые данные, сначала проверяем столбцы. Напишите <code>missing_columns(df, expected)</code>: верните столбцы из списка <code>expected</code>, которых нет в <code>df</code>, в том же порядке.</p>",
     "hints": [
      "<code>[c for c in expected if c not in df.columns]</code>"
     ],
     "check": {
      "tests": "assert missing_columns(churn, EXPECTED) == [], 'В churn.csv все столбцы есть: []'\n_bad = churn.drop(columns=['monthly_fee', 'city'])\nassert missing_columns(_bad, EXPECTED) == ['city', 'monthly_fee'], f\"Должно быть ['city', 'monthly_fee'] (порядок expected), у вас {missing_columns(_bad, EXPECTED)}\""
     }
    },
    {
     "title": "Значения категорий",
     "prompt": "<p>В data contract запишем разрешённые значения категориальных столбцов. Постройте словарь <code>categories</code>: по ключам <code>\"city\"</code> и <code>\"plan\"</code> — отсортированный список уникальных значений из <code>churn.csv</code>.</p>",
     "hints": [
      "<code>sorted(churn[\"city\"].unique().tolist())</code>"
     ],
     "check": {
      "tests": "assert categories.get('plan') == ['basic', 'premium', 'standard'], f\"plan: ['basic', 'premium', 'standard'], у вас {categories.get('plan')}\"\nassert categories.get('city') == sorted(['Алматы', 'Астана', 'Шымкент', 'Ақтөбе', 'Қарағанды']), f\"city: отсортированный список из 5 городов, у вас {categories.get('city')}\""
     }
    },
    {
     "title": "Проверка диапазонов",
     "prompt": "<p>Напишите <code>check_ranges(df, contract)</code>: <code>contract</code> — <code>{баған: (lo, hi)}</code>. Для каждого столбца верните число строк вне диапазона (пустые значения не считаются) как <code>{баған: сан}</code>, только для столбцов, где число больше 0. Для <code>churn.csv</code> по <code>CONTRACT</code> результат должен быть пустым словарём.</p>",
     "hints": [
      "Уберите пустые значения через <code>.dropna()</code>",
      "<code>(s < lo) | (s > hi)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\nassert check_ranges(churn, CONTRACT) == {}, f'churn.csv по contract соответствует: {{}}, у вас {check_ranges(churn, CONTRACT)}'\n_d = _pd.DataFrame({'age': [25, 5, None, 130], 'tenure_months': [1, 2, 3, 4], 'monthly_fee': [0, 5000, 7000, 200000],\n                    'support_calls': [0, 1, 2, 3], 'has_contract': [0, 1, 2, 1]})\nassert check_ranges(_d, CONTRACT) == {'age': 2, 'monthly_fee': 2, 'has_contract': 1}, f\"Должно быть {{'age': 2, 'monthly_fee': 2, 'has_contract': 1}}, у вас {check_ranges(_d, CONTRACT)}\""
     }
    },
    {
     "title": "Проверка stratify",
     "prompt": "<p>Сохранила ли разбивка на train/test долю оттока? Вычислите <code>train_rate</code>, <code>test_rate</code> (среднее <code>churned</code> в обоих наборах) и <code>rate_gap</code> (абсолютное значение разности). Затем разбейте <b>без</b> <code>stratify</code> (<code>random_state=0</code>) и вычислите <code>gap_no_strat</code>.</p>",
     "hints": [
      "<code>y_train.mean()</code>",
      "<code>train_test_split(..., random_state=0)</code> — без параметра stratify"
     ],
     "check": {
      "tests": "assert train_rate is not None and abs(train_rate - 116 / 450) < 1e-9, f'train_rate = 116 / 450 ≈ 0.258, у вас {train_rate}'\nassert test_rate is not None and abs(test_rate - 0.26) < 1e-9, f'test_rate = 39 / 150 = 0.26, у вас {test_rate}'\nassert rate_gap is not None and rate_gap < 0.005, 'С stratify разница очень мала'\nfrom sklearn.model_selection import train_test_split as _tts\n_, _, _ya, _yb = _tts(churn, churn['churned'], test_size=0.25, random_state=0)\nassert gap_no_strat is not None and abs(gap_no_strat - abs(_ya.mean() - _yb.mean())) < 1e-9, 'gap_no_strat: без stratify, random_state=0'"
     }
    },
    {
     "title": "Заполнение медианой train",
     "prompt": "<p>Заполняя пропуски, медиану берём только из <b>train</b> (чтобы информация о test не утекала в модель). Напишите <code>medians</code>: <code>age</code> и <code>data_gb</code> — медиана в train (словарь). <code>X_test_filled</code> — копия <code>X_test</code>, заполненная этими медианами.</p>",
     "hints": [
      "<code>X_train[c].median()</code>",
      "<code>X_test.fillna(medians)</code> возвращает новый DataFrame"
     ],
     "check": {
      "tests": "assert abs(medians.get('age', 0) - X_train['age'].median()) < 1e-9 and abs(medians.get('data_gb', 0) - X_train['data_gb'].median()) < 1e-9, 'Медиана train-нен алынуы керек'\nassert medians['age'] != churn['age'].median() or medians['data_gb'] != churn['data_gb'].median(), 'Нужна медиана train, а не всех данных'\nassert X_test_filled[['age', 'data_gb']].isna().sum().sum() == 0, 'X_test_filled-те age, data_gb бос болмауы керек'\n_m = X_test['age'].isna()\nassert (X_test_filled.loc[_m, 'age'] == medians['age']).all(), 'Пустые значения age должны заполниться медианой train'\nassert X_test['age'].isna().sum() > 0, 'Исходный X_test не должен меняться: работайте с копией'"
     }
    },
    {
     "title": "Базовый признак",
     "prompt": "<p>Какой один признак сам по себе лучше всего предсказывает отток? Для каждого <code>FEATURES</code> оцените <code>make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))</code> только по этому столбцу на train, по 5-fold CV ROC-AUC. <code>single_auc</code> — <code>{белгі: AUC}</code>, <code>best_feature</code> — признак с наибольшим AUC.</p>",
     "hints": [
      "Передайте один столбец как DataFrame: <code>X_train[[f]]</code>",
      "<code>cross_val_score(..., cv=5, scoring=\"roc_auc\").mean()</code>"
     ],
     "check": {
      "tests": "assert set(single_auc) == set(FEATURES), 'Для каждого признака FEATURES одно значение AUC'\nassert abs(single_auc['tenure_months'] - 0.7478) < 0.005, f\"AUC tenure_months должен быть ≈ 0.748, у вас {single_auc['tenure_months']:.4f}\"\nassert abs(single_auc['monthly_fee'] - 0.5315) < 0.005, f\"AUC monthly_fee должен быть ≈ 0.532, у вас {single_auc['monthly_fee']:.4f}\"\nassert best_feature == 'tenure_months', f'best_feature = tenure_months, у вас {best_feature}'"
     }
    },
    {
     "title": "Таблица baseline",
     "prompt": "<p>На тестовом наборе сравните ROC-AUC трёх вариантов: <code>\"dummy\"</code> — <code>DummyClassifier(strategy=\"most_frequent\")</code>; <code>\"calls_rule\"</code> — без модели, просто берём <code>support_calls</code> как оценку; <code>\"compact_lr\"</code> — imputer + scaler + LR, обученный на train <code>FEATURES</code>. Результат запишите в словарь <code>aucs</code>, а названия в список <code>ranking</code> по убыванию AUC.</p>",
     "hints": [
      "В качестве оценки можно взять сам столбец: <code>roc_auc_score(y_test, X_test[\"support_calls\"])</code>",
      "<code>sorted(aucs, key=aucs.get, reverse=True)</code>"
     ],
     "check": {
      "tests": "assert set(aucs) == {'dummy', 'calls_rule', 'compact_lr'}, f'Нужны три ключа, у вас {set(aucs)}'\nassert abs(aucs['dummy'] - 0.5) < 1e-9, 'dummy AUC = 0.5'\nassert abs(aucs['calls_rule'] - 0.5726) < 0.002, f\"AUC calls_rule должен быть ≈ 0.573, у вас {aucs['calls_rule']:.4f}\"\nassert abs(aucs['compact_lr'] - 0.8165) < 0.004, f\"AUC compact_lr должен быть ≈ 0.816, у вас {aucs['compact_lr']:.4f}\"\nassert ranking == ['compact_lr', 'calls_rule', 'dummy'], f\"ranking = ['compact_lr', 'calls_rule', 'dummy'], у вас {ranking}\""
     }
    }
   ]
  },
  "cap6-3": {
   "pr": [
    {
     "title": "Словарь метаданных",
     "prompt": "<p>Напишите <code>make_meta(version, features, threshold, test_auc)</code>: верните словарь с ключами <code>version</code>, <code>features</code>, <code>threshold</code>, <code>metrics</code>, где <code>metrics = {\"test_auc\": test_auc}</code>. <code>features</code> — копия списка (если исходный список изменится, meta не должна измениться).</p>",
     "hints": [
      "<code>list(features)</code> создаёт новый список"
     ],
     "check": {
      "tests": "_f = ['tenure_months', 'monthly_fee']\n_m = make_meta('churn-lr-1.0.0', _f, 0.3, 0.816)\nassert _m == {'version': 'churn-lr-1.0.0', 'features': ['tenure_months', 'monthly_fee'], 'threshold': 0.3, 'metrics': {'test_auc': 0.816}}, f'Проверьте структуру метаданных, у вас {_m}'\n_f.append('x')\nassert _m['features'] == ['tenure_months', 'monthly_fee'], 'features должен быть копией: list(features)'"
     }
    },
    {
     "title": "Сохранение в JSON",
     "prompt": "<p>Напишите <code>save_load_json(meta, path)</code>: запишите <code>meta</code> в файл <code>json.dump(..., ensure_ascii=False, indent=2)</code> через <code>path</code>, затем прочитайте этот файл снова и верните прочитанный словарь. Казахские буквы в файле должны сохраниться <code>\\u</code> без кодирования.</p>",
     "hints": [
      "<code>with open(path, \"w\", encoding=\"utf-8\") as f:</code>",
      "<code>json.load(f)</code>"
     ],
     "check": {
      "tests": "import os as _os\nif _os.path.exists('meta_practice.json'):\n    _os.remove('meta_practice.json')\n_m = {'version': 'churn-lr-1.0.0', 'owner': 'Дала Мобайл', 'threshold': 0.3}\n_r = save_load_json(_m, 'meta_practice.json')\nassert _r == _m, 'Прочитанный словарь должен совпадать с исходным'\nassert _os.path.exists('meta_practice.json'), 'Файл жазылуы керек'\n_txt = open('meta_practice.json', encoding='utf-8').read()\nassert 'Дала Мобайл' in _txt, 'ensure_ascii=False: казахские буквы должны сохраниться в файле как есть'"
     }
    },
    {
     "title": "Повышение номера версии",
     "prompt": "<p>Версия модели в виде <code>\"churn-lr-MAJOR.MINOR.PATCH\"</code>. Напишите <code>bump_version(version, part)</code>: <code>part</code> — <code>\"major\"</code>, <code>\"minor\"</code> или <code>\"patch\"</code>; эта часть увеличивается на 1, а все последующие обнуляются. Например, <code>bump_version(\"churn-lr-1.0.3\", \"minor\")</code> → <code>\"churn-lr-1.1.0\"</code>.</p>",
     "hints": [
      "<code>version.rsplit(\"-\", 1)</code> делит по последнему дефису"
     ],
     "check": {
      "tests": "assert bump_version('churn-lr-1.0.3', 'minor') == 'churn-lr-1.1.0', f'Должно быть churn-lr-1.1.0, у вас {bump_version(\"churn-lr-1.0.3\", \"minor\")}'\nassert bump_version('churn-lr-1.0.3', 'patch') == 'churn-lr-1.0.4', 'patch: 1.0.3 → 1.0.4'\nassert bump_version('churn-lr-1.4.2', 'major') == 'churn-lr-2.0.0', 'major: 1.4.2 → 2.0.0'\nassert bump_version('churn-lr-1.9.0', 'minor') == 'churn-lr-1.10.0', 'После 9 идёт 10: 1.10.0'"
     }
    },
    {
     "title": "Проверка метаданных",
     "prompt": "<p>При запуске сервиса проверяются метаданные. Напишите <code>check_meta(meta)</code>: верните список ошибок. Если нет ни одного из ключей <code>REQUIRED</code> — <code>\"{кілт}: missing\"</code>; если <code>threshold</code> есть, но это не число в диапазоне 0…1 — <code>\"threshold: invalid\"</code>; если <code>features</code> есть, но это пустой список — <code>\"features: empty\"</code>.</p>",
     "hints": [
      "Сначала проверьте отсутствующие ключи, затем значения"
     ],
     "check": {
      "tests": "_ok = {'version': 'churn-lr-1.0.0', 'features': ['tenure_months'], 'threshold': 0.3, 'metrics': {}}\nassert check_meta(_ok) == [], f'Для правильных meta пустой список, у вас {check_meta(_ok)}'\nassert check_meta({'features': ['a'], 'threshold': 0.5}) == ['version: missing', 'metrics: missing'], 'Отсутствующие ключи в порядке REQUIRED'\nassert check_meta(dict(_ok, threshold=1.5)) == ['threshold: invalid'], 'threshold > 1: invalid'\nassert check_meta(dict(_ok, threshold='0.3')) == ['threshold: invalid'], 'Текст в threshold: invalid'\nassert check_meta(dict(_ok, features=[])) == ['features: empty'], 'Бос features: empty'"
     }
    },
    {
     "title": "Копирование через pickle",
     "prompt": "<p>Превратите модель в байты через <code>pickle.dumps</code>, затем загрузите её обратно через <code>pickle.loads</code>: <code>loaded</code>. <code>n_bytes</code> — число байтов, <code>same</code> — совпадают ли результаты двух моделей в <code>X_test[FEATURES]</code> (<code>predict_proba</code>, bool) <code>np.allclose</code>.</p>",
     "hints": [
      "<code>blob = pickle.dumps(model)</code>, <code>len(blob)</code>"
     ],
     "check": {
      "tests": "assert loaded is not None and loaded is not model, 'loaded — результат pickle.loads (новый объект)'\nassert n_bytes > 100, f'n_bytes — число байтов, у вас {n_bytes}'\nassert same is True, 'Загруженная модель должна давать те же вероятности'\nassert hasattr(loaded, 'predict_proba') and list(loaded.feature_names_in_) == FEATURES, 'Должен сохраниться весь pipeline'"
     }
    },
    {
     "title": "Расхождение обучения и сервиса",
     "prompt": "<p>В ноутбуке <code>monthly_fee</code> делили на тысячу тенге при обучении (<code>model_k</code>), а API присылает тенге. <code>p_right</code> — вероятности на X_test с правильной обработкой (fee / 1000), <code>p_skew</code> — вероятности без обработки (в тенге). <code>skew</code> — их средняя абсолютная разность, <code>flipped</code> — доля абонентов, чьё <code>will_churn</code> решение (<code>p ≥ 0.3</code>) изменилось.</p>",
     "hints": [
      "Обработка, как при обучении на test: <code>Xk_test[\"monthly_fee\"] / 1000</code>",
      "<code>(p_right >= THRESHOLD) != (p_skew >= THRESHOLD)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_Xt = X_test[FEATURES].copy(); _Xt['monthly_fee'] = _Xt['monthly_fee'] / 1000\n_pr = model_k.predict_proba(_Xt)[:, 1]; _ps = model_k.predict_proba(X_test[FEATURES])[:, 1]\nassert p_right is not None and _np.allclose(p_right, _pr), 'p_right: X_test-те fee / 1000'\nassert p_skew is not None and _np.allclose(p_skew, _ps), 'p_skew: X_test[FEATURES] без обработки'\nassert skew is not None and abs(skew - _np.mean(_np.abs(_pr - _ps))) < 1e-9 and skew > 0.1, f'skew — средняя абсолютная разность, она должна быть большой, у вас {skew}'\nassert flipped is not None and abs(flipped - _np.mean((_pr >= 0.3) != (_ps >= 0.3))) < 1e-9, 'flipped — доля изменившихся решений'"
     }
    },
    {
     "title": "Кандидат на основе дерева",
     "prompt": "<p>Третий кандидат: <code>DecisionTreeClassifier(max_depth=3, random_state=0)</code> в <code>FEATURES</code> (дереву не нужен scaler). По 5-fold CV ROC-AUC на train вычислите <code>cv_tree</code> и <code>cv_compact</code> (imputer + scaler + LR). <code>chosen</code> — название победившей модели (<code>\"tree\"</code> или <code>\"compact\"</code>). Обучите победителя на всём train, назовите <code>final_model</code> и вычислите <code>test_auc</code>.</p>",
     "hints": [
      "Поместите кандидатов в словарь и оцените их одним циклом",
      "<code>max(scores, key=scores.get)</code>"
     ],
     "check": {
      "tests": "assert abs(cv_tree - 0.7808) < 0.01, f'cv_tree должен быть ≈ 0.781, у вас {cv_tree:.4f}'\nassert abs(cv_compact - 0.8134) < 0.003, f'cv_compact должен быть ≈ 0.813, у вас {cv_compact:.4f}'\nassert chosen == 'compact', f'По CV побеждает compact, у вас {chosen}'\nassert final_model is not None and hasattr(final_model, 'predict_proba') and final_model.n_features_in_ == 4, 'final_model — победитель, обученный на FEATURES'\nassert abs(test_auc - 0.8165) < 0.004, f'test_auc должен быть ≈ 0.816, у вас {test_auc:.4f}'"
     }
    },
    {
     "title": "Набор артефактов",
     "prompt": "<p>Напишите <code>save_artifact(model, meta, folder)</code>: она сохраняет <code>os.makedirs(folder, exist_ok=True)</code>, внутри которой <code>model.pkl</code> (pickle) и <code>meta.json</code>. <code>load_artifact(folder)</code> читает оба файла и возвращает <code>(model, meta)</code>, но выдаёт <code>meta[\"features\"]</code>, если <code>feature_names_in_</code> модели не совпадает со списком <code>ValueError</code> (защита от расхождения обучения и сервиса).</p>",
     "hints": [
      "<code>os.path.join(folder, \"model.pkl\")</code>",
      "В pipeline есть <code>feature_names_in_</code>, потому что он обучен на DataFrame"
     ],
     "check": {
      "tests": "import numpy as _np, os as _os\n_meta = {'version': MODEL_VERSION, 'features': FEATURES, 'threshold': THRESHOLD}\nsave_artifact(model, _meta, 'artifact_practice')\nassert _os.path.exists('artifact_practice/model.pkl') and _os.path.exists('artifact_practice/meta.json'), 'В папке должны быть model.pkl и meta.json'\n_m, _mt = load_artifact('artifact_practice')\nassert _mt == _meta, 'meta должна читаться правильно'\nassert _np.allclose(_m.predict_proba(X_test[FEATURES]), model.predict_proba(X_test[FEATURES])), 'Загруженная модель должна давать тот же результат'\nsave_artifact(model, dict(_meta, features=['monthly_fee', 'tenure_months', 'support_calls', 'has_contract']), 'artifact_bad')\ntry:\n    load_artifact('artifact_bad')\n    _raised = False\nexcept ValueError:\n    _raised = True\nassert _raised, 'При несовпадении порядка или состава features должно возникать ValueError'"
     }
    }
   ]
  },
  "cap6-4": {
   "pr": [
    {
     "title": "Endpoint проверки состояния",
     "prompt": "<p>Напишите <code>health(meta)</code>: она возвращает <code>/health</code> так же, как endpoint <code>(200, {\"status\": \"ok\", \"model_version\": meta[\"version\"]})</code>. Если в <code>meta</code> нет <code>version</code>, верните <code>(500, {\"status\": \"error\"})</code>.</p>",
     "hints": [
      "Верните кортеж: <code>return 200, {...}</code>"
     ],
     "check": {
      "tests": "assert health({'version': 'churn-lr-1.0.0'}) == (200, {'status': 'ok', 'model_version': 'churn-lr-1.0.0'}), 'Правильный ответ: (200, {status: ok, model_version: ...})'\nassert health({}) == (500, {'status': 'error'}), 'Если version нет: (500, {status: error})'"
     }
    },
    {
     "title": "Число или bool",
     "prompt": "<p>Напишите <code>is_number(v)</code>: <code>v</code> — <code>int</code> или <code>float</code> означает <code>True</code>, но если <code>bool</code> (True/False), то <code>False</code>. Текст <code>\"12\"</code> тоже <code>False</code>. Не забудьте, что в Python <code>isinstance(True, int)</code> → <code>True</code>.</p>",
     "hints": [
      "Сначала проверьте bool: <code>isinstance(v, bool)</code>"
     ],
     "check": {
      "tests": "assert is_number(5) and is_number(6500.0), 'int мен float — сан'\nassert is_number(True) is False and is_number(False) is False, 'bool не принимается как число'\nassert is_number('12') is False and is_number(None) is False, 'Текст и None — не число'"
     }
    },
    {
     "title": "Отсутствующие поля",
     "prompt": "<p>Напишите <code>missing_fields(payload, required)</code>: верните поля из списка <code>required</code>, которых нет в словаре <code>payload</code>, в том же порядке. Например, <code>{\"tenure_months\": 5}</code> и FEATURES → <code>[\"monthly_fee\", \"support_calls\", \"has_contract\"]</code>.</p>",
     "hints": [
      "<code>[f for f in required if f not in payload]</code>"
     ],
     "check": {
      "tests": "assert missing_fields({'tenure_months': 5}, FEATURES) == ['monthly_fee', 'support_calls', 'has_contract'], 'Не хватает трёх полей'\nassert missing_fields({'tenure_months': 5, 'monthly_fee': 1, 'support_calls': 0, 'has_contract': 1, 'customer_id': 'A'}, FEATURES) == [], 'Все поля есть, лишние поля не учитываются'"
     }
    },
    {
     "title": "DataFrame из запроса",
     "prompt": "<p>Напишите <code>to_frame(payload, features)</code>: она возвращает DataFrame из одной строки, столбцы ровно в порядке <code>features</code>, лишние поля (<code>customer_id</code>) не попадают внутрь. Модель чувствительна к порядку столбцов: если порядок нарушен, возникает training-serving skew.</p>",
     "hints": [
      "<code>{f: payload[f] for f in features}</code>"
     ],
     "check": {
      "tests": "_p = {'has_contract': 0, 'customer_id': 'A-17', 'support_calls': 3, 'monthly_fee': 6500, 'tenure_months': 5}\n_df = to_frame(_p, FEATURES)\nassert list(_df.columns) == FEATURES, f'Порядок столбцов должен совпадать с FEATURES, у вас {list(_df.columns)}'\nassert len(_df) == 1 and _df.iloc[0]['monthly_fee'] == 6500, 'Одна строка, значения сохраняются'\nassert 'customer_id' not in _df.columns, 'Лишнее поле не должно попасть внутрь'"
     }
    },
    {
     "title": "Уровень риска",
     "prompt": "<p>Оператор видит на экране не число, а уровень. Модель <code>validate</code>, <code>predict_endpoint</code> готовы. Напишите <code>risk_level(proba)</code>: <code>&lt; 0.3</code> → <code>\"low\"</code>, <code>&lt; 0.6</code> → <code>\"medium\"</code>, иначе <code>\"high\"</code>. <code>predict_with_risk(payload)</code>: если результат <code>predict_endpoint</code> равен 200, верните ответ с добавленным ключом <code>\"risk\"</code>; если 422 — без изменений.</p>",
     "hints": [
      "<code>dict(body, risk=...)</code> создаёт новый словарь"
     ],
     "check": {
      "tests": "assert risk_level(0.1) == 'low' and risk_level(0.3) == 'medium' and risk_level(0.59) == 'medium' and risk_level(0.6) == 'high', 'Границы: < 0.3 low, < 0.6 medium, остальное high'\n_s, _b = predict_with_risk({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})\nassert _s == 200 and _b.get('risk') == risk_level(_b['churn_proba']), 'Жауапта risk болуы керек'\nassert {'churn_proba', 'will_churn', 'model_version'} <= set(_b), 'Прежние ключи должны сохраниться'\n_s2, _b2 = predict_with_risk({'tenure_months': 5})\nassert _s2 == 422 and 'risk' not in _b2, 'Ответ 422 не меняется'"
     }
    },
    {
     "title": "Batch endpoint",
     "prompt": "<p>Для ночного скоринга напишите <code>predict_batch(payloads)</code>: она возвращает <code>(200, {\"results\": [...]})</code>. Для каждого элемента: если <code>validate</code> даёт ошибку, то <code>{\"errors\": [...]}</code>, иначе <code>{\"churn_proba\": round(proba, 4), \"will_churn\": proba ≥ THRESHOLD}</code>. Правильные строки отправьте в модель <b>одним DataFrame</b>. Если <code>payloads</code> — не список, верните <code>(422, {\"errors\": [\"payloads: list болуы керек\"]})</code>.</p>",
     "hints": [
      "Сначала проверьте всё и соберите правильные индексы",
      "Вызовите модель один раз: <code>model.predict_proba(df)</code>"
     ],
     "check": {
      "tests": "import pandas as _pd\n_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}\n_ok2 = {'tenure_months': 60, 'monthly_fee': 3000, 'support_calls': 0, 'has_contract': 1}\n_s, _b = predict_batch([_ok, {'tenure_months': 5}, _ok2])\nassert _s == 200 and len(_b['results']) == 3, 'Каждому запросу один результат, порядок сохраняется'\nassert 'errors' in _b['results'][1] and any('monthly_fee' in e for e in _b['results'][1]['errors']), 'В ошибочном элементе должен быть errors'\n_p = model.predict_proba(_pd.DataFrame([_ok, _ok2])[FEATURES])[:, 1]\nassert abs(_b['results'][0]['churn_proba'] - round(float(_p[0]), 4)) < 1e-9 and abs(_b['results'][2]['churn_proba'] - round(float(_p[1]), 4)) < 1e-9, 'churn_proba = round(proba, 4)'\nassert _b['results'][2]['will_churn'] == bool(_p[1] >= THRESHOLD), 'will_churn = proba >= THRESHOLD'\nassert predict_batch({'a': 1})[0] == 422, 'Для входа, который не список, 422'\nassert predict_batch([]) == (200, {'results': []}), 'Пустой список: пустой результат'"
     }
    },
    {
     "title": "Ошибка сервиса: 500",
     "prompt": "<p>Напишите <code>safe_endpoint(payload)</code>: если ошибка клиента (validate), верните <code>(422, {\"errors\": [...]})</code>; если при вызове модели возникло любое исключение — <code>(500, {\"error\": \"internal\"})</code> (клиента не винили); иначе <code>predict_endpoint</code>, как <code>(200, {...})</code>. Проверяющий специально подменит <code>model</code> на сломанный объект.</p>",
     "hints": [
      "Поместите вызов модели внутрь <code>try / except Exception</code>",
      "Валидация должна быть вне try: она даёт 422"
     ],
     "check": {
      "tests": "_ok = {'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0}\n_s, _b = safe_endpoint(_ok)\nassert _s == 200 and 0 <= _b['churn_proba'] <= 1, 'Правильный запрос: 200'\nassert safe_endpoint({'tenure_months': -1})[0] == 422, 'Ошибка клиента: 422'\nclass _Broken:\n    def predict_proba(self, X):\n        raise RuntimeError('model file corrupted')\n_real = model\nmodel = _Broken()\ntry:\n    _r = safe_endpoint(_ok)\nfinally:\n    model = _real\nassert _r == (500, {'error': 'internal'}), f'Если модель падает, должно быть (500, {{error: internal}}), у вас {_r}'\nassert safe_endpoint({'tenure_months': 'x'})[0] == 422, 'Валидация до модели: 422'"
     }
    },
    {
     "title": "Endpoint с расчётом предложения",
     "prompt": "<p>Напишите <code>predict_offer(payload)</code>: если <code>predict_endpoint</code> возвращает 422, верните его. Иначе добавьте в ответ два ключа: <code>expected_gain</code> = <code>round(proba · 0.3 · 40 000 − 2 000)</code> (₸, целое число; proba — округлённая <code>churn_proba</code>) и <code>offer</code> = <code>will_churn</code> и <code>expected_gain &gt; 0</code>. Например, proba 0.8427 → gain = 8 112.</p>",
     "hints": [
      "0.3 · 40 000 = 12 000: ожидаемая выгода сохранённого абонента",
      "<code>dict(body, expected_gain=..., offer=...)</code>"
     ],
     "check": {
      "tests": "_s, _b = predict_offer({'tenure_months': 5, 'monthly_fee': 6500, 'support_calls': 3, 'has_contract': 0})\nassert _s == 200 and 'expected_gain' in _b and 'offer' in _b, 'В ответе должны быть expected_gain и offer'\nassert _b['expected_gain'] == round(_b['churn_proba'] * 12000 - 2000), 'expected_gain = round(proba · 12 000 − 2 000)'\nassert _b['offer'] == (_b['will_churn'] and _b['expected_gain'] > 0), 'offer = will_churn и gain > 0'\n_s2, _b2 = predict_offer({'tenure_months': 70, 'monthly_fee': 3000, 'support_calls': 0, 'has_contract': 1})\nassert _s2 == 200 and _b2['offer'] is False, 'Абонентам с низким риском предложение не делается'\nassert predict_offer({'tenure_months': 5})[0] == 422, 'Ошибка валидации: 422'"
     }
    }
   ]
  },
  "cap6-5": {
   "pr": [
    {
     "title": "P95 задержки",
     "prompt": "<p>Напишите <code>latency_stats(ms)</code>: по времени запросов (миллисекунды) верните словарь <code>{\"p50\": ..., \"p95\": ..., \"max\": ...}</code> (<code>np.percentile</code>, float). Например, для чисел от 1 до 100 p95 = 95.05.</p>",
     "hints": [
      "<code>np.percentile(ms, 95)</code>"
     ],
     "check": {
      "tests": "_r = latency_stats(list(range(1, 101)))\nassert abs(_r.get('p50', 0) - 50.5) < 1e-9 and abs(_r.get('p95', 0) - 95.05) < 1e-9, f'p50 = 50.5, p95 = 95.05, у вас {_r}'\nassert _r.get('max') == 100, 'max = 100'"
     }
    },
    {
     "title": "Доли ошибок",
     "prompt": "<p>Напишите <code>error_rates(codes)</code>: по списку HTTP-кодов верните <code>{\"4xx\": үлес, \"5xx\": үлес}</code> (400–499 и 500–599). Для пустого списка оба значения равны 0.0. Например, <code>[200, 200, 422, 500]</code> → <code>{\"4xx\": 0.25, \"5xx\": 0.25}</code>.</p>",
     "hints": [
      "<code>sum(400 <= c < 500 for c in codes)</code>"
     ],
     "check": {
      "tests": "assert error_rates([200, 200, 422, 500]) == {'4xx': 0.25, '5xx': 0.25}, 'Каждая доля 1/4'\nassert error_rates([200] * 9 + [503]) == {'4xx': 0.0, '5xx': 0.1}, '503 — 5xx'\nassert error_rates([]) == {'4xx': 0.0, '5xx': 0.0}, 'Пустой список: 0.0'"
     }
    },
    {
     "title": "Распределение прогнозов",
     "prompt": "<p>Сами прогнозы тоже отслеживаются в мониторинге. Напишите <code>prediction_stats(probas, threshold=0.3)</code>: <code>{\"mean_proba\": орташа, \"churn_share\": proba ≥ threshold үлесі}</code>, оба округлены до 3 знаков.</p>",
     "hints": [
      "<code>(p >= threshold).mean()</code>"
     ],
     "check": {
      "tests": "assert prediction_stats([0.1, 0.2, 0.5, 0.9]) == {'mean_proba': 0.425, 'churn_share': 0.5}, 'mean = 0.425, доля ≥ 0.3 = 0.5'\nassert prediction_stats([0.1, 0.2, 0.5, 0.9], threshold=0.6) == {'mean_proba': 0.425, 'churn_share': 0.25}, 'Используйте параметр threshold'"
     }
    },
    {
     "title": "PSI по долям",
     "prompt": "<p>Если доли по bin-ам уже готовы, PSI можно сразу посчитать. Напишите <code>psi_from_shares(e, a)</code>: ограничьте обе через <code>np.clip(..., 1e-4, None)</code> и верните <code>Σ (a − e) · ln(a / e)</code>. Например, <code>e = [0.25, 0.25, 0.25, 0.25]</code>, <code>a = [0.1, 0.2, 0.3, 0.4]</code> → ≈ 0.228 (watch).</p>",
     "hints": [
      "<code>np.sum((a - e) * np.log(a / e))</code>"
     ],
     "check": {
      "tests": "assert abs(psi_from_shares([0.25] * 4, [0.1, 0.2, 0.3, 0.4]) - 0.2282) < 1e-3, 'PSI ≈ 0.228 болуы керек'\nassert abs(psi_from_shares([0.5, 0.5], [0.5, 0.5])) < 1e-12, 'Одинаковые доли: 0'\nimport numpy as _np\nassert _np.isfinite(psi_from_shares([0.5, 0.5], [1.0, 0.0])), 'При нулевой доле не должно быть inf: np.clip'"
     }
    },
    {
     "title": "Контрактный тест",
     "prompt": "<p>Сервис готов. Напишите тест в стиле pytest <code>test_contract_lowers_risk()</code>: отправьте два запроса с одинаковыми остальными полями и <code>has_contract</code> 0 и 1, проверьте через <code>churn_proba</code>, что оба статуса равны 200 и что у абонента с договором <code>assert</code> <b>строго меньше</b>. Проверяющий запустит тест на правильном сервисе и на сломанных вариантах.</p>",
     "hints": [
      "<code>dict(base, has_contract=0)</code> и <code>dict(base, has_contract=1)</code>",
      "Два assert: сравнение статуса и proba"
     ],
     "check": {
      "tests": "test_contract_lowers_risk()\ndef _breaks(_fn):\n    try:\n        _fn()\n    except Exception:\n        return True\n    return False\n_real = predict_endpoint\npredict_endpoint = lambda p: (200, {'churn_proba': 0.5, 'will_churn': True, 'model_version': MODEL_VERSION})\nassert _breaks(test_contract_lowers_risk), 'Тест должен поймать сервис, который всегда возвращает 0.5 (proba строго меньше)'\npredict_endpoint = lambda p: (200, {'churn_proba': 0.2 + 0.5 * p.get('has_contract', 0), 'will_churn': True, 'model_version': MODEL_VERSION})\nassert _breaks(test_contract_lowers_risk), 'Тест должен поймать сервис, который повышает риск при наличии договора'\npredict_endpoint = lambda p: (422, {'errors': ['x']})\nassert _breaks(test_contract_lowers_risk), 'Тест должен поймать сервис, который всегда отвечает 422 (status == 200)'\npredict_endpoint = _real"
     }
    },
    {
     "title": "Quality gate",
     "prompt": "<p>В CI качество проверяется перед merge. Напишите <code>quality_gate(model, X, y, min_auc=0.78)</code>: вычислите ROC-AUC по <code>model.predict_proba(X)[:, 1]</code> и верните <code>(passed, auc)</code>, где <code>passed = auc ≥ min_auc</code>. Готовая <code>model</code> должна пройти на test-наборе, а <code>DummyClassifier</code> — не пройти.</p>",
     "hints": [
      "<code>roc_auc_score(y, model.predict_proba(X)[:, 1])</code>"
     ],
     "check": {
      "tests": "_p, _a = quality_gate(model, X_test[FEATURES], y_test)\nassert _p is True and abs(_a - 0.8165) < 0.004, f'Готовая модель проходит: AUC ≈ 0.816, у вас {_a}'\n_d = DummyClassifier(strategy='most_frequent').fit(X_train[FEATURES], y_train)\n_pd2, _ad = quality_gate(_d, X_test[FEATURES], y_test)\nassert _pd2 is False and abs(_ad - 0.5) < 1e-9, 'Dummy не должен проходить: AUC = 0.5'\nassert quality_gate(model, X_test[FEATURES], y_test, min_auc=0.9)[0] is False, 'Используйте параметр min_auc'"
     }
    },
    {
     "title": "Расчёт drift",
     "prompt": "<p>Напишите <code>drift_report(train_df, new_df, cols, bins=5)</code>: для каждого столбца вычислите PSI (границы bin-ов — квантили train <code>np.unique(np.quantile(e, np.linspace(0, 1, bins + 1)))</code>, края <code>-inf</code>/<code>inf</code>, доли не меньше <code>1e-4</code>), и верните <code>{баған: {\"psi\": 3 таңбаға дөңгелектенген, \"status\": \"ok\" | \"watch\" | \"alert\"}}</code>. Пустые значения не учитывайте. <code>report</code> — расчёт для <code>new_month</code> и <code>tenure_months</code> с <code>monthly_fee</code>.</p>",
     "hints": [
      "Сначала напишите функцию <code>psi</code> из cap6-5",
      "Пустые значения уберите через <code>e[~np.isnan(e)]</code>"
     ],
     "check": {
      "tests": "assert set(report) == {'tenure_months', 'monthly_fee'}, 'Расчёт по двум столбцам'\nassert report['tenure_months']['status'] == 'alert' and abs(report['tenure_months']['psi'] - 3.557) < 0.02, f\"tenure_months: PSI ≈ 3.56, alert. У вас {report['tenure_months']}\"\nassert report['monthly_fee']['status'] == 'ok', f\"monthly_fee не изменился: ok. У вас {report['monthly_fee']}\"\n_r = drift_report(X_train, X_test, ['tenure_months', 'age'])\nassert abs(_r['tenure_months']['psi'] - 0.069) < 0.005, 'train vs test tenure_months: PSI ≈ 0.069'\nassert _r['age']['psi'] == _r['age']['psi'], 'Пустые значения в столбце age не должны давать nan'"
     }
    },
    {
     "title": "Сигналы мониторинга",
     "prompt": "<p>Напишите <code>alerts(m)</code>: <code>m</code> — суточные метрики: <code>p95_ms</code>, <code>error_rate</code> (доля 5xx), <code>psi</code> (<code>{баған: мән}</code>), <code>auc</code> (если неизвестно — <code>None</code>). Верните список сигналов в таком порядке: <code>\"latency\"</code> (p95 ≥ 200), <code>\"errors\"</code> (error_rate ≥ 0.001), для каждого столбца с PSI &gt; 0.25 — <code>\"drift:баған\"</code> (отсортировано по имени столбца), <code>\"quality\"</code> (если auc есть и &lt; 0.78).</p>",
     "hints": [
      "<code>sorted(m[\"psi\"])</code> сортирует по именам столбцов",
      "Проверьте <code>auc is not None</code>"
     ],
     "check": {
      "tests": "_ok = {'p95_ms': 120, 'error_rate': 0.0002, 'psi': {'tenure_months': 0.07, 'monthly_fee': 0.02}, 'auc': None}\nassert alerts(_ok) == [], 'Всё в норме: пустой список'\n_bad = {'p95_ms': 250, 'error_rate': 0.001, 'psi': {'tenure_months': 3.56, 'monthly_fee': 0.3, 'support_calls': 0.2}, 'auc': 0.74}\nassert alerts(_bad) == ['latency', 'errors', 'drift:monthly_fee', 'drift:tenure_months', 'quality'], f'Порядок: latency, errors, drift (отсортировано), quality. У вас {alerts(_bad)}'\nassert alerts(dict(_ok, psi={'x': 0.25})) == [], 'PSI = 0.25 — пока watch, не сигнал'\nassert alerts(dict(_ok, auc=0.79)) == [], 'AUC ≥ 0.78 — в норме'"
     }
    }
   ]
  }
 }
});
