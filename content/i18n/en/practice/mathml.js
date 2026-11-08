// mathml practice tasks: English text. Code, solutions and checks are in content/practice/mathml.js.
DJ.i18n.patch({
 "lessons": {
  "mm-1": {
   "pr": [
    {
     "title": "Subtracting vectors",
     "prompt": "<p>Write the function <code>sub(u, v)</code>: return the vector u − v (element-wise subtraction) as a new list.</p><p>For example, <code>sub([5, 7, 9], [1, 2, 3])</code> → <code>[4, 5, 6]</code>.</p>",
     "hints": [
      "Take the pairs of elements with <code>zip(u, v)</code>."
     ],
     "check": {
      "tests": "assert sub([5, 7, 9], [1, 2, 3]) == [4, 5, 6], \"sub([5, 7, 9], [1, 2, 3]) = [4, 5, 6]\"\nassert sub([1, 1], [3, -2]) == [-2, 3], \"sub([1, 1], [3, -2]) = [-2, 3]\"\nassert sub([0.5], [0.5]) == [0.0], \"subtracting a vector from itself gives the zero vector\""
     }
    },
    {
     "title": "Zero vector",
     "prompt": "<p>Write two functions: <code>zeros(n)</code> — a zero vector of length <code>n</code>; <code>is_zero(v)</code> — <code>True</code> if all elements are 0.</p><p>For example, <code>zeros(3)</code> → <code>[0, 0, 0]</code>, <code>is_zero([0, 0.0])</code> → <code>True</code>.</p>",
     "hints": [
      "<code>[0] * n</code>",
      "<code>all(a == 0 for a in v)</code>"
     ],
     "check": {
      "tests": "assert zeros(3) == [0, 0, 0], \"zeros(3) = [0, 0, 0]\"\nassert zeros(0) == [], \"zeros(0) — an empty list\"\nassert is_zero([0, 0.0]) is True, \"[0, 0.0] — a zero vector\"\nassert is_zero([0, 1]) is False, \"[0, 1] is not a zero vector\""
     }
    },
    {
     "title": "Linear combination",
     "prompt": "<p>Write the function <code>lincomb(a, u, b, v)</code>: it returns the vector a·u + b·v.</p><p>For example, the weekly sales of two shops are u and v; if the first shop is doubled: <code>lincomb(2, [1, 2], 1, [10, 20])</code> → <code>[12, 24]</code>.</p>",
     "hints": [
      "At each position <code>a * x + b * y</code>."
     ],
     "check": {
      "tests": "assert lincomb(2, [1, 2], 1, [10, 20]) == [12, 24], \"lincomb(2, [1, 2], 1, [10, 20]) = [12, 24]\"\nassert lincomb(1, [3, 4], -1, [3, 4]) == [0, 0], \"u − u = the zero vector\"\nassert lincomb(0.5, [2, 4, 6], 0, [9, 9, 9]) == [1, 2, 3], \"lincomb(0.5, [2, 4, 6], 0, ...) = [1, 2, 3]\""
     }
    },
    {
     "title": "Mean vector",
     "prompt": "<p>Write the function <code>mean_vec(vs)</code>: <code>vs</code> is a list of vectors of the same length. Return the vector of element-wise means.</p><p>For example, the marks of three pupils (maths, physics): <code>mean_vec([[4, 5], [5, 3], [3, 4]])</code> → <code>[4.0, 4.0]</code>.</p>",
     "hints": [
      "For each position i add the i-th elements of all the vectors.",
      "Then divide by the number of vectors."
     ],
     "check": {
      "tests": "assert mean_vec([[4, 5], [5, 3], [3, 4]]) == [4.0, 4.0], \"mean_vec([[4, 5], [5, 3], [3, 4]]) = [4.0, 4.0]\"\nassert mean_vec([[1, 2, 3]]) == [1.0, 2.0, 3.0], \"the mean of one vector is the vector itself\"\nassert mean_vec([[0, 10], [1, 20]]) == [0.5, 15.0], \"mean_vec([[0, 10], [1, 20]]) = [0.5, 15.0]\""
     }
    },
    {
     "title": "Unit vector function",
     "prompt": "<p>Write the function <code>normalize(v)</code>: return the vector with the same direction and length 1. One cannot divide by the zero vector, so return it unchanged (a copy).</p><p>For example, <code>normalize([3, 4])</code> → <code>[0.6, 0.8]</code>.</p>",
     "hints": [
      "First the length: <code>sum(a * a for a in v) ** 0.5</code>.",
      "If the length is 0, return <code>list(v)</code>."
     ],
     "check": {
      "tests": "_u = normalize([3, 4])\nassert abs(_u[0] - 0.6) < 1e-12 and abs(_u[1] - 0.8) < 1e-12, \"normalize([3, 4]) = [0.6, 0.8]\"\n_w = normalize([1, 2, 2])\nassert abs(sum(_a * _a for _a in _w) - 1) < 1e-12, \"the length of a unit vector is 1\"\nassert normalize([0, 0]) == [0, 0], \"the zero vector does not change (do not divide by zero)\""
     }
    },
    {
     "title": "Longest vector",
     "prompt": "<p>Write the function <code>longest(vs)</code>: return the <b>index</b> of the vector with the greatest length (norm).</p><p>For example, <code>longest([[1, 1], [3, 4], [0, 2]])</code> → <code>1</code>.</p>",
     "hints": [
      "First write the <code>norm</code> function.",
      "<code>max(range(len(vs)), key=lambda i: norm(vs[i]))</code>"
     ],
     "check": {
      "tests": "assert longest([[1, 1], [3, 4], [0, 2]]) == 1, \"the length of [3, 4] is 5, the largest: index 1\"\nassert longest([[-10, 0], [6, 6]]) == 0, \"negative elements also count towards the length: [-10, 0] (10) > [6, 6] (≈ 8.49)\"\nassert longest([[7]]) == 0, \"one vector: index 0\""
     }
    },
    {
     "title": "Spread from the centre",
     "prompt": "<p>Write the function <code>spread(vs)</code>: subtract the mean vector from each vector, then return the mean of the lengths of the resulting difference vectors. This shows how far the points are spread from the centre.</p><p>For example, <code>spread([[0, 0], [6, 8]])</code> → <code>5.0</code> (centre [3, 4], both points are at distance 5).</p>",
     "hints": [
      "Three steps: the mean vector, the difference from each vector, the length of the difference.",
      "At the end take the mean of the lengths."
     ],
     "check": {
      "tests": "assert abs(spread([[0, 0], [6, 8]]) - 5) < 1e-12, \"spread([[0, 0], [6, 8]]) = 5\"\nassert abs(spread([[2, 2], [2, 2], [2, 2]])) < 1e-12, \"all points coincide: spread 0\"\nassert abs(spread([[1, 0], [-1, 0], [0, 1], [0, -1]]) - 1) < 1e-12, \"four points at distance 1 from the centre: 1\""
     }
    },
    {
     "title": "Route: displacements",
     "prompt": "<p>A courier moves on a city map, each step is a displacement vector (km). Write the function <code>route(steps)</code>: return the pair <code>(end, length)</code>: <code>end</code> is the sum of all steps (the final point, start [0, 0]), <code>length</code> is the distance travelled (the sum of the lengths of all steps).</p><p>For example, <code>route([[3, 4], [-3, -4]])</code> → <code>([0, 0], 10.0)</code>.</p>",
     "hints": [
      "Use the <code>add</code> and <code>norm</code> functions.",
      "The final point and the path length differ: if the courier returns to the start, end = [0, 0], but the path is long."
     ],
     "check": {
      "tests": "_e, _l = route([[3, 4], [-3, -4]])\nassert _e == [0, 0] and abs(_l - 10) < 1e-12, \"returned to the start: end = [0, 0], length = 10\"\n_e2, _l2 = route([[1, 0], [0, 2], [2, 0]])\nassert _e2 == [3, 2] and abs(_l2 - 5) < 1e-12, \"end = [3, 2], length = 1 + 2 + 2 = 5\"\nassert route([]) == ([0, 0], 0), \"no steps: ([0, 0], 0)\""
     }
    }
   ]
  },
  "mm-2": {
   "pr": [
    {
     "title": "Order total",
     "prompt": "<p>A basket has vectors of quantities <code>qty</code> and prices <code>price</code> (₸). Write the function <code>total(qty, price)</code>: return the total sum through the dot product.</p><p>For example, <code>total([2, 1, 3], [500, 1200, 300])</code> → <code>3100</code>.</p>",
     "hints": [
      "Dot product: <code>sum(a * b for a, b in zip(u, v))</code>."
     ]
    },
    {
     "title": "Are the vectors perpendicular",
     "prompt": "<p>Write the function <code>orthogonal(u, v)</code>: if the dot product is 0 (its absolute value is less than 1e-9), return <code>True</code>.</p><p>For example, <code>orthogonal([1, 2], [2, -1])</code> → <code>True</code>.</p>",
     "hints": [
      "Compute the dot product and check <code>abs(...) &lt; 1e-9</code>."
     ],
     "check": {
      "tests": "assert orthogonal([1, 2], [2, -1]) is True, \"1·2 + 2·(−1) = 0: перпендикуляр\"\nassert orthogonal([1, 0, 0], [0, 0, 5]) is True, \"Осьтер перпендикуляр\"\nassert orthogonal([1, 1], [1, 0]) is False, \"dot = 1: перпендикуляр емес\"\nassert orthogonal([0.1, 0.2], [0.2, -0.1]) is True, \"it should also work for decimal numbers\""
     }
    },
    {
     "title": "Length through the dot product",
     "prompt": "<p>Write the function <code>dot(u, v)</code>, and then the function <code>norm(v)</code> that computes the length only through <code>dot</code>: ‖v‖ = √(v · v).</p><p>For example, <code>norm([2, 3, 6])</code> → <code>7.0</code>.</p>",
     "hints": [
      "In <code>norm</code>: <code>dot(v, v) ** 0.5</code>."
     ]
    },
    {
     "title": "Angle in degrees",
     "prompt": "<p>Write the function <code>angle_deg(u, v)</code>: return the angle between two vectors in degrees: <code>math.degrees(math.acos(cos))</code>. Because of rounding error cos may slightly exceed 1, so clip it to the interval [−1, 1].</p><p>For example, <code>angle_deg([1, 0], [0, 1])</code> → <code>90.0</code>.</p>",
     "hints": [
      "First the cosine similarity.",
      "Clipping: <code>max(-1.0, min(1.0, c))</code>."
     ],
     "check": {
      "tests": "assert abs(angle_deg([1, 0], [0, 1]) - 90) < 1e-9, \"Перпендикуляр: 90°\"\nassert abs(angle_deg([1, 0], [1, 1]) - 45) < 1e-9, \"angle_deg([1, 0], [1, 1]) = 45°\"\nassert abs(angle_deg([1, 2], [-2, -4]) - 180) < 1e-4, \"opposite directions: 180°\"\nassert abs(angle_deg([3, 3, 3], [1, 1, 1])) < 1e-4, \"the same direction: 0° (did you clip cos?)\""
     }
    },
    {
     "title": "Top-k similar films",
     "prompt": "<p>Write the function <code>top_k(items, q, k)</code>: <code>items</code> is <code>{film: genre vector}</code>, <code>q</code> is the user's vector. Return the list of names of the <code>k</code> films with the highest cosine similarity, in decreasing order of similarity.</p>",
     "hints": [
      "First the <code>cosine</code> function from the lesson.",
      "<code>sorted(items, key=..., reverse=True)[:k]</code>"
     ],
     "check": {
      "tests": "_films = {\"Көшпенділер\": [5, 1, 0], \"Бауыржан Момышұлы\": [4, 0, 1], \"Махаббат\": [0, 5, 1], \"Күлкі\": [1, 1, 5]}\nassert top_k(_films, [3, 0, 0], 2) == [\"Көшпенділер\", \"Бауыржан Момышұлы\"], \"the two films most similar to the historical genre\"\nassert top_k(_films, [0, 0, 1], 1) == [\"Күлкі\"], \"Comedy: Күлкі\"\nassert len(top_k(_films, [1, 1, 1], 4)) == 4, \"k = 4: all the films\""
     }
    },
    {
     "title": "Sentence similarity",
     "prompt": "<p>Turning text into a vector (bag of words). Write the function <code>text_cosine(s1, s2)</code>:</p><ol><li>split the two sentences into words with <code>split()</code>;</li><li>the vocabulary — all the different words from the two sentences (<code>sorted(set(...))</code>);</li><li>for each sentence a vector: how many times each word occurs in the sentence (<code>count</code>);</li><li>return the cosine similarity of the two vectors.</li></ol><p>For example, <code>text_cosine(\"алма алма нан\", \"алма нан\")</code> ≈ <code>0.949</code>.</p>",
     "hints": [
      "Vocabulary: <code>sorted(set(w1 + w2))</code>.",
      "Vector: <code>[w1.count(w) for w in vocab]</code>."
     ],
     "check": {
      "tests": "assert abs(text_cosine(\"алма алма нан\", \"алма нан\") - 3 / (5 ** 0.5 * 2 ** 0.5)) < 1e-9, \"[2, 1] мен [1, 1]: 3 / (√5 · √2) ≈ 0.949\"\nassert abs(text_cosine(\"шай ішу\", \"шай ішу\") - 1) < 1e-9, \"identical sentences: 1\"\nassert abs(text_cosine(\"қызыл алма\", \"жасыл шөп\")) < 1e-9, \"no common words: 0\""
     }
    },
    {
     "title": "Similarity matrix",
     "prompt": "<p>Write the function <code>sim_matrix(vs)</code>: for n vectors return the n × n matrix (a list of lists), where [i][j] is the cosine similarity of the i-th and j-th vectors.</p><p>The diagonal equals 1, and the matrix is symmetric.</p>",
     "hints": [
      "A nested list comprehension: <code>[[cosine(u, v) for v in vs] for u in vs]</code>."
     ]
    },
    {
     "title": "Vector projection",
     "prompt": "<p>Write the function <code>project(u, v)</code>: return the projection of the vector u onto the direction of v: (u · v / v · v) × v. It combines the dot product and multiplication by a scalar.</p><p>For example, <code>project([3, 4], [1, 0])</code> → <code>[3.0, 0.0]</code>.</p>",
     "hints": [
      "The coefficient: <code>dot(u, v) / dot(v, v)</code>.",
      "Then multiply v by this number (<code>scale</code>)."
     ],
     "check": {
      "tests": "assert project([3, 4], [1, 0]) == [3.0, 0.0], \"project([3, 4], [1, 0]) = [3.0, 0.0]\"\n_p = project([2, 3], [1, 1])\nassert abs(_p[0] - 2.5) < 1e-12 and abs(_p[1] - 2.5) < 1e-12, \"project([2, 3], [1, 1]) = [2.5, 2.5]\"\n_r = [_a - _b for _a, _b in zip([2, 3], _p)]\nassert abs(sum(_a * _b for _a, _b in zip(_r, [1, 1]))) < 1e-12, \"the remainder u − projection must be perpendicular to v\""
     }
    }
   ]
  },
  "mm-3": {
   "pr": [
    {
     "title": "Distance to the origin",
     "prompt": "<p>Write the function <code>dist_origin(v)</code>: return the Euclidean distance from the point to the origin [0, 0, ...].</p><p>For example, <code>dist_origin([6, 8])</code> → <code>10.0</code>.</p>",
     "hints": [
      "It is the same as the length of the vector."
     ],
     "check": {
      "tests": "assert abs(dist_origin([6, 8]) - 10) < 1e-12, \"dist_origin([6, 8]) = 10\"\nassert abs(dist_origin([-3, 0, 4]) - 5) < 1e-12, \"dist_origin([-3, 0, 4]) = 5\"\nassert dist_origin([0, 0]) == 0, \"the origin itself: 0\""
     }
    },
    {
     "title": "Chebyshev distance",
     "prompt": "<p>One more distance: the <b>Chebyshev</b> distance — the largest absolute difference of the coordinates: max |uᵢ − vᵢ|. It shows in how many moves a king in chess reaches a square. Write the function <code>chebyshev(u, v)</code>.</p><p>For example, <code>chebyshev([1, 5], [4, 1])</code> → <code>4</code>.</p>",
     "hints": [
      "As in the Manhattan distance, but use <code>max</code> instead of the sum."
     ],
     "check": {
      "tests": "assert chebyshev([1, 5], [4, 1]) == 4, \"|1 − 4| = 3, |5 − 1| = 4: max = 4\"\nassert chebyshev([0, 0, 0], [2, -7, 1]) == 7, \"chebyshev([0, 0, 0], [2, -7, 1]) = 7\"\nassert chebyshev([3, 3], [3, 3]) == 0, \"one point: 0\""
     }
    },
    {
     "title": "List of distances",
     "prompt": "<p>Write the function <code>dists(points, q)</code>: return the list of Euclidean distances from each point to <code>q</code>.</p><p>For example, <code>dists([[0, 0], [3, 4]], [0, 0])</code> → <code>[0.0, 5.0]</code>.</p>",
     "hints": [
      "First <code>euclidean</code>, then <code>[euclidean(p, q) for p in points]</code>."
     ],
     "check": {
      "tests": "assert dists([[0, 0], [3, 4]], [0, 0]) == [0.0, 5.0], \"dists([[0, 0], [3, 4]], [0, 0]) = [0.0, 5.0]\"\n_d = dists([[1, 1], [4, 5], [1, 2]], [1, 1])\nassert len(_d) == 3 and abs(_d[1] - 5) < 1e-12 and abs(_d[2] - 1) < 1e-12, \"[0, 5, 1] болуы керек\"\nassert dists([], [1, 2]) == [], \"no points: an empty list\""
     }
    },
    {
     "title": "k nearest neighbours",
     "prompt": "<p>Write the function <code>k_nearest(points, q, k)</code>: return the list of <b>indices</b> of the <code>k</code> points nearest to <code>q</code> by Euclidean distance (from the nearest to the farthest).</p><p>For example, <code>k_nearest([[0, 0], [5, 5], [1, 1], [9, 9]], [2, 2], 2)</code> → <code>[2, 0]</code>.</p>",
     "hints": [
      "Sort the indices by distance: <code>sorted(range(len(points)), key=...)</code>.",
      "Take the first k: <code>[:k]</code>."
     ],
     "check": {
      "tests": "assert k_nearest([[0, 0], [5, 5], [1, 1], [9, 9]], [2, 2], 2) == [2, 0], \"for [2, 2] the nearer ones are [1, 1] (2), then [0, 0] (0)\"\nassert k_nearest([[0, 0], [5, 5], [1, 1], [9, 9]], [8, 8], 1) == [3], \"the nearest to [8, 8] is [9, 9]\"\nassert k_nearest([[1, 0], [0, 3]], [0, 0], 5) == [0, 1], \"if k is larger than the number of points, all of them are returned\""
     }
    },
    {
     "title": "Nearest city",
     "prompt": "<p>Write the function <code>closest_city(cities, q)</code>: <code>cities</code> is <code>{city: [x, y]}</code> (conventional coordinates on the map, km), <code>q</code> is a point. Return the name of the city nearest by Euclidean distance.</p>",
     "hints": [
      "<code>min(cities, key=lambda c: euclidean(cities[c], q))</code>"
     ],
     "check": {
      "tests": "_c = {\"Алматы\": [1130, 230], \"Астана\": [870, 860], \"Шымкент\": [570, 210], \"Қарағанды\": [930, 720]}\nassert closest_city(_c, [900, 800]) == \"Астана\", \"the nearest to [900, 800] is Astana\"\nassert closest_city(_c, [600, 250]) == \"Шымкент\", \"the nearest to [600, 250] is Shymkent\"\nassert closest_city(_c, [1000, 300]) == \"Алматы\", \"the nearest to [1000, 300] is Almaty\""
     }
    },
    {
     "title": "Farthest pair",
     "prompt": "<p>Write the function <code>farthest_pair(points)</code>: return the indices <code>(i, j)</code>, i &lt; j, of the two points that are farthest from each other (Euclidean).</p><p>For example, <code>farthest_pair([[0, 0], [1, 1], [5, 5]])</code> → <code>(0, 2)</code>.</p>",
     "hints": [
      "Two nested loops: <code>for i ...: for j in range(i + 1, ...)</code>.",
      "Keep the largest distance and its pair."
     ],
     "check": {
      "tests": "assert farthest_pair([[0, 0], [1, 1], [5, 5]]) == (0, 2), \"farthest_pair([[0, 0], [1, 1], [5, 5]]) = (0, 2)\"\nassert farthest_pair([[2, 2], [-3, 0], [4, 1], [0, 9]]) == (1, 3), \"[-3, 0] and [0, 9] are the farthest: (1, 3)\"\nassert farthest_pair([[1, 1], [2, 2]]) == (0, 1), \"two points: (0, 1)\""
     }
    },
    {
     "title": "Effect of scaling",
     "prompt": "<p>In apartments the area (m²) is much larger than the number of rooms, so the area determines the distance. Write two functions:</p><ul><li><code>minmax(points)</code> — brings each column to the range 0..1 by the formula (x − min) / (max − min) and returns the pair <code>(scaled, (mins, maxs))</code>: the list of scaled points and the tuple of minima and maxima;</li><li><code>nearest_scaled(points, q)</code> — scales the points, scales q with the same min/max, and returns the index of the nearest point.</li></ul>",
     "hints": [
      "Columns: <code>zip(*points)</code>, each with its own <code>min</code> and <code>max</code>.",
      "Scale q by the min/max of the points themselves, not by its own values."
     ],
     "check": {
      "tests": "_s, (_lo, _hi) = minmax([[40, 1], [60, 2], [100, 4]])\nassert _lo == [40, 1] and _hi == [100, 4], \"mins = [40, 1], maxs = [100, 4]\"\nassert _s[0] == [0.0, 0.0] and _s[2] == [1.0, 1.0], \"the smallest point should be [0, 0], the largest [1, 1]\"\n_flats = [[50, 1], [58, 4], [90, 3], [40, 2]]\nassert nearest_scaled(_flats, [52, 4]) == 1, \"without scaling [52, 4] looks closer to [50, 1], but after scaling the 4-room [58, 4] (index 1) is closer\""
     }
    },
    {
     "title": "Assigning to centres",
     "prompt": "<p>One step of the k-means algorithm. Write two functions:</p><ul><li><code>assign(points, centers)</code> — for each point the index of the nearest centre (a list);</li><li><code>new_centers(points, labels, k)</code> — the mean vector of the points of each group (0..k−1) (a list of lists).</li></ul><p>For example, <code>assign([[0, 0], [10, 10], [1, 0]], [[0, 0], [9, 9]])</code> → <code>[0, 1, 0]</code>.</p>",
     "hints": [
      "<code>assign</code>: for each point use the idea of <code>nearest</code> from lesson 3.",
      "<code>new_centers</code>: select the points of group j and compute <code>mean_vec</code> (lesson 1)."
     ],
     "check": {
      "tests": "_pts = [[0, 0], [10, 10], [1, 0], [9, 11], [0, 2]]\n_lab = assign(_pts, [[0, 0], [9, 9]])\nassert _lab == [0, 1, 0, 1, 0], f\"the result of assign should be [0, 1, 0, 1, 0], you got {_lab}\"\n_c = new_centers(_pts, _lab, 2)\nassert len(_c) == 2, \"2 centres\"\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_c[0], [1 / 3, 2 / 3])), \"the centre of group 0: [1/3, 2/3]\"\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_c[1], [9.5, 10.5])), \"the centre of group 1: [9.5, 10.5]\""
     }
    }
   ]
  },
  "mm-4": {
   "pr": [
    {
     "title": "Matrix shape",
     "prompt": "<p>Write the function <code>shape(A)</code>: return the size of the matrix as a tuple <code>(number of rows, number of columns)</code>.</p><p>For example, <code>shape([[1, 2, 3], [4, 5, 6]])</code> → <code>(2, 3)</code>.</p>",
     "hints": [
      "Rows: <code>len(A)</code>, columns: <code>len(A[0])</code>."
     ],
     "check": {
      "tests": "assert shape([[1, 2, 3], [4, 5, 6]]) == (2, 3), \"shape = (2, 3)\"\nassert shape([[7]]) == (1, 1), \"shape([[7]]) = (1, 1)\"\nassert shape([[1], [2], [3], [4]]) == (4, 1), \"a column vector: (4, 1)\""
     }
    },
    {
     "title": "Getting a column",
     "prompt": "<p>Write the function <code>column(A, j)</code>: return the j-th column of the matrix (indexing from 0) as a list.</p><p>For example, in a table of marks (row — pupil, column — subject): <code>column([[5, 4], [3, 5], [4, 4]], 1)</code> → <code>[4, 5, 4]</code>.</p>",
     "hints": [
      "<code>[row[j] for row in A]</code>"
     ]
    },
    {
     "title": "Adding matrices",
     "prompt": "<p>Write the function <code>mat_add(A, B)</code>: add two matrices of the same size element by element and return a new matrix.</p><p>For example, the sales for January and February (row — shop, column — item): <code>mat_add([[1, 2], [3, 4]], [[10, 20], [30, 40]])</code> → <code>[[11, 22], [33, 44]]</code>.</p>",
     "hints": [
      "Take the rows in pairs (<code>zip(A, B)</code>) and add the elements in each row."
     ],
     "check": {
      "tests": "assert mat_add([[1, 2], [3, 4]], [[10, 20], [30, 40]]) == [[11, 22], [33, 44]], \"mat_add = [[11, 22], [33, 44]]\"\nassert mat_add([[1, 2, 3]], [[-1, -2, -3]]) == [[0, 0, 0]], \"opposite matrices: zero\""
     }
    },
    {
     "title": "Identity matrix",
     "prompt": "<p>Write the function <code>identity(n)</code>: return the n × n identity matrix (1 on the diagonal, 0 elsewhere).</p><p>For example, <code>identity(2)</code> → <code>[[1, 0], [0, 1]]</code>.</p>",
     "hints": [
      "<code>1 if i == j else 0</code>"
     ],
     "check": {
      "tests": "assert identity(2) == [[1, 0], [0, 1]], \"identity(2) = [[1, 0], [0, 1]]\"\nassert identity(3) == [[1, 0, 0], [0, 1, 0], [0, 0, 1]], \"identity(3)\"\n_I = identity(3)\n_I[0][1] = 5\nassert _I[1][1] == 1 and _I[2][1] == 0, \"the rows must not be copies of the same list (the bug <code>[[0] * n] * n</code>)\""
     }
    },
    {
     "title": "Shop revenue",
     "prompt": "<p>Matrix <code>S</code>: row — shop, column — item, value — the number of items sold. <code>prices</code> are the prices of the items (₸). Write the function <code>shop_revenue(S, prices)</code>: return <code>(per_shop, total)</code>: the revenue of each shop (matrix × vector) and the total revenue.</p>",
     "hints": [
      "<code>matvec(S, prices)</code> gives the revenue of each shop.",
      "The total revenue is their sum."
     ],
     "check": {
      "tests": "_S = [[10, 2, 0], [5, 5, 5], [0, 1, 20]]\n_p = [300, 1500, 200]\n_ps, _t = shop_revenue(_S, _p)\nassert _ps == [6000, 10000, 5500], f\"each shop: [6000, 10000, 5500], you got {_ps}\"\nassert _t == 21500, \"Жалпы табыс 21 500 ₸\""
     }
    },
    {
     "title": "Matrix power",
     "prompt": "<p>Write the function <code>mat_pow(A, k)</code>: return the k-th power of a square matrix (A · A · ... · A, k times). When k = 0, return the identity matrix.</p><p>For example, <code>mat_pow([[1, 1], [1, 0]], 5)</code> → <code>[[8, 5], [5, 3]]</code> (Fibonacci numbers).</p>",
     "hints": [
      "Start with the identity matrix and multiply by A k times.",
      "Use the <code>matmul</code> function from the lesson."
     ],
     "check": {
      "tests": "assert mat_pow([[1, 1], [1, 0]], 5) == [[8, 5], [5, 3]], \"mat_pow([[1, 1], [1, 0]], 5) = [[8, 5], [5, 3]]\"\nassert mat_pow([[2, 0], [0, 3]], 3) == [[8, 0], [0, 27]], \"Диагональ матрица: [[8, 0], [0, 27]]\"\nassert mat_pow([[5, 7], [1, 2]], 0) == [[1, 0], [0, 1]], \"k = 0: the identity matrix\"\nassert mat_pow([[5, 7], [1, 2]], 1) == [[5, 7], [1, 2]], \"k = 1: the matrix itself\""
     }
    },
    {
     "title": "Commutativity",
     "prompt": "<p>In matrix multiplication the order matters. Write the function <code>commutes(A, B)</code>: for square matrices compute A · B and B · A and return <code>True</code> if they are equal.</p><p>For example, <code>commutes([[1, 2], [3, 4]], [[0, 1], [1, 0]])</code> → <code>False</code>, while the identity matrix commutes with any matrix.</p>",
     "hints": [
      "<code>matmul(A, B) == matmul(B, A)</code>"
     ],
     "check": {
      "tests": "assert commutes([[1, 2], [3, 4]], [[0, 1], [1, 0]]) is False, \"A·B ≠ B·A\"\nassert commutes([[1, 2], [3, 4]], [[1, 0], [0, 1]]) is True, \"commutes with the identity matrix\"\nassert commutes([[2, 0], [0, 3]], [[5, 0], [0, 7]]) is True, \"Диагональ матрицалар ауыстырымды\""
     }
    },
    {
     "title": "Number of routes",
     "prompt": "<p>The matrix of direct flights between cities <code>A</code>: A[i][j] = 1 if there is a direct flight from i to j. The element [i][j] of the k-th power of the matrix gives the number of ways to get from i to j in exactly k flights. Write the function <code>routes(A, i, j, k)</code>.</p>",
     "hints": [
      "The idea is the same as <code>mat_pow</code> in the previous task.",
      "The result is the [i][j] element of the power."
     ],
     "check": {
      "tests": "# 0 Алматы, 1 Астана, 2 Шымкент, 3 Ақтау\n_A = [[0, 1, 1, 0], [1, 0, 1, 1], [1, 1, 0, 0], [0, 1, 0, 0]]\nassert routes(_A, 0, 3, 1) == 0, \"there is no direct flight from Almaty to Aktau\"\nassert routes(_A, 0, 3, 2) == 1, \"in two flights: only through Astana\"\nassert routes(_A, 0, 0, 2) == 2, \"Almaty → X → Almaty: through Astana or Shymkent, 2 ways\"\nassert routes(_A, 2, 3, 3) == 1, \"from Shymkent to Aktau in 3 flights: 1 way (through Almaty, Astana)\""
     }
    }
   ]
  },
  "mm-5": {
   "pr": [
    {
     "title": "Intercept column",
     "prompt": "<p>Write the function <code>add_bias(features)</code>: return a new matrix in which each row starts with 1 (do not change the original list).</p><p>For example, <code>add_bias([[50, 2], [70, 3]])</code> → <code>[[1, 50, 2], [1, 70, 3]]</code>.</p>",
     "hints": [
      "<code>[[1] + row for row in features]</code> creates new lists."
     ],
     "check": {
      "tests": "_f = [[50, 2], [70, 3]]\nassert add_bias(_f) == [[1, 50, 2], [1, 70, 3]], \"add_bias = [[1, 50, 2], [1, 70, 3]]\"\nassert _f == [[50, 2], [70, 3]], \"the original features must not change\"\nassert add_bias([[7]]) == [[1, 7]], \"add_bias([[7]]) = [[1, 7]]\""
     }
    },
    {
     "title": "Symmetric matrix",
     "prompt": "<p>Write the function <code>is_symmetric(A)</code>: if the square matrix equals its transpose, return <code>True</code>.</p><p>For example, a table of distances between cities is symmetric: <code>is_symmetric([[0, 5], [5, 0]])</code> → <code>True</code>.</p>",
     "hints": [
      "Compute <code>transpose(A)</code> and compare it with <code>A</code>."
     ]
    },
    {
     "title": "Price of one flat",
     "prompt": "<p>Write the function <code>predict_one(x, w)</code>: <code>x</code> are the features (without intercept), <code>w</code> are the weights, w[0] is the intercept. Return ŷ = w₀ + w₁x₁ + w₂x₂ + ...</p><p>For example, <code>predict_one([50, 2], [5, 0.4, 2])</code> → 5 + 20 + 4 = <code>29.0</code>.</p>",
     "hints": [
      "Add a one at the start of x and compute the dot product with w."
     ],
     "check": {
      "tests": "assert abs(predict_one([50, 2], [5, 0.4, 2]) - 29) < 1e-9, \"predict_one([50, 2], [5, 0.4, 2]) = 29\"\nassert abs(predict_one([85, 3], [5, 0.4, 2]) - 45) < 1e-9, \"predict_one([85, 3], ...) = 45\"\nassert predict_one([], [7]) == 7, \"no features: only the intercept\""
     }
    },
    {
     "title": "Matrix Xᵀ · X",
     "prompt": "<p>Write the function <code>gram(X)</code>: return the matrix Xᵀ · X. Its element [i][j] is the dot product of the i-th and j-th columns of X. This matrix often appears in linear regression.</p><p>For example, <code>gram([[1, 2], [1, 3]])</code> → <code>[[2, 5], [5, 13]]</code>.</p>",
     "hints": [
      "<code>matmul(transpose(X), X)</code>",
      "The size of the result: number of columns × number of columns."
     ],
     "check": {
      "tests": "assert gram([[1, 2], [1, 3]]) == [[2, 5], [5, 13]], \"gram([[1, 2], [1, 3]]) = [[2, 5], [5, 13]]\"\n_g = gram([[1, 50, 2], [1, 70, 3], [1, 40, 1]])\nassert len(_g) == 3 and len(_g[0]) == 3, \"3 columns: a 3 × 3 matrix\"\nassert _g[0][0] == 3 and _g[1][1] == 50 ** 2 + 70 ** 2 + 40 ** 2, \"diagonal: the sum of squares in each column\"\nassert _g[0][1] == _g[1][0] == 160, \"Xᵀ·X симметриялы: [0][1] = 50 + 70 + 40 = 160\""
     }
    },
    {
     "title": "Residuals",
     "prompt": "<p>Write the function <code>residuals(X, w, y)</code>: for each observation return the list of residuals eᵢ = yᵢ − ŷᵢ, where ŷ = X · w (X has an intercept column).</p><p>For example, <code>residuals([[1, 50], [1, 70]], [5, 0.5], [32, 38])</code> → <code>[2.0, -2.0]</code>.</p>",
     "hints": [
      "First compute <code>predict(X, w)</code> from the lesson.",
      "Then <code>[t - p for t, p in zip(y, preds)]</code>."
     ],
     "check": {
      "tests": "assert residuals([[1, 50], [1, 70]], [5, 0.5], [32, 38]) == [2.0, -2.0], \"ŷ = [30, 40]: residuals [2, −2]\"\nassert residuals([[1, 2, 3]], [1, 1, 1], [6]) == [0], \"an exact prediction: residual 0\""
     }
    },
    {
     "title": "Vector Xᵀ · e",
     "prompt": "<p>Write the function <code>xt_e(X, e)</code>: return the vector Xᵀ · e (transpose and multiply the matrix by a vector). Its j-th element is Σᵢ X[i][j] · eᵢ; this quantity will be needed in gradient descent.</p><p>For example, <code>xt_e([[1, 2], [1, 3]], [1, -1])</code> → <code>[0, -1]</code>.</p>",
     "hints": [
      "<code>matvec(transpose(X), e)</code>"
     ],
     "check": {
      "tests": "assert xt_e([[1, 2], [1, 3]], [1, -1]) == [0, -1], \"xt_e([[1, 2], [1, 3]], [1, -1]) = [0, −1]\"\nassert xt_e([[1, 50, 2], [1, 70, 3]], [2, 1]) == [3, 170, 7], \"xt_e = [3, 170, 7]: the length equals the number of columns\""
     }
    },
    {
     "title": "Best weights",
     "prompt": "<p>Write the function <code>best_weights(X, y, candidates)</code>: <code>candidates</code> is a list of weight vectors. Return the vector for which the sum of absolute residuals Σ|yᵢ − ŷᵢ| is the smallest.</p>",
     "hints": [
      "Write a helper function that computes Σ|y − ŷ| for each candidate.",
      "<code>min(candidates, key=...)</code>"
     ],
     "check": {
      "tests": "_X = [[1, 50, 2], [1, 70, 3], [1, 40, 1], [1, 85, 3]]\n_y = [29, 39, 23, 45]\n_c = [[0, 0.5, 0], [5, 0.4, 2], [10, 0.3, 1]]\nassert best_weights(_X, _y, _c) == [5, 0.4, 2], \"[5, 0.4, 2] predicts exactly: error 0\"\nassert best_weights([[1, 1], [1, 2]], [3, 5], [[0, 2], [1, 2], [2, 2]]) == [1, 2], \"y = 1 + 2x: [1, 2]\""
     }
    },
    {
     "title": "Taxi price",
     "prompt": "<p>The taxi price in Almaty: ŷ = w₀ + w₁ · km + w₂ · minutes. Write the function <code>taxi(trips, w)</code>: <code>trips</code> is a list of <code>[km, minutes]</code>. Add the intercept column, build the matrix X, compute ŷ = X · w and return <code>(prices, total, top)</code>: the list of all prices, the total sum and the index of the most expensive trip.</p>",
     "hints": [
      "X: <code>[[1] + t for t in trips]</code>.",
      "The most expensive: <code>max(range(len(prices)), key=...)</code>."
     ],
     "check": {
      "tests": "_trips = [[5, 15], [12, 30], [3, 20]]\n_w = [400, 120, 20]\n_p, _t, _top = taxi(_trips, _w)\nassert _p == [1300, 2440, 1160], f\"the prices should be [1300, 2440, 1160], you got {_p}\"\nassert _t == 4900, \"Жалпы 4 900 ₸\"\nassert _top == 1, \"the most expensive is the 12 km trip (index 1)\""
     }
    }
   ]
  },
  "mm-6": {
   "pr": [
    {
     "title": "Average rate of change",
     "prompt": "<p>Write the function <code>avg_rate(f, a, b)</code>: return the average rate of change of the function f on the interval [a, b]: (f(b) − f(a)) / (b − a).</p><p>For example, <code>avg_rate(lambda x: x ** 2, 1, 3)</code> → <code>4.0</code>.</p>",
     "hints": [
      "This is the slope of the line through the two points of the graph."
     ],
     "check": {
      "tests": "assert abs(avg_rate(lambda x: x ** 2, 1, 3) - 4) < 1e-12, \"(9 − 1) / 2 = 4\"\nassert abs(avg_rate(lambda x: 3 * x - 7, -5, 10) - 3) < 1e-12, \"for a line the slope on any interval is 3\"\nassert abs(avg_rate(lambda x: 100 - x ** 2, 0, 10) + 10) < 1e-12, \"a decreasing function: −10\""
     }
    },
    {
     "title": "Forward difference",
     "prompt": "<p>Write the function <code>forward_diff(f, x, h=1e-5)</code>: return the simple estimate of the derivative (f(x + h) − f(x)) / h.</p><p>For example, <code>forward_diff(lambda x: x ** 2, 3)</code> ≈ <code>6.00001</code>.</p>",
     "hints": [
      "Be careful with the brackets: <code>(f(x + h) - f(x)) / h</code>."
     ],
     "check": {
      "tests": "assert abs(forward_diff(lambda x: x ** 2, 3) - 6) < 1e-3, \"(x²)′ x = 3-те ≈ 6\"\nassert abs(forward_diff(lambda x: x ** 2, 3, 0.1) - 6.1) < 1e-9, \"if h = 0.1, (9.61 − 9) / 0.1 = 6.1: the error of the forward difference is of order h\"\nassert abs(forward_diff(lambda x: 4 * x, 10) - 4) < 1e-6, \"the derivative of a line is 4\""
     }
    },
    {
     "title": "Equation of a line",
     "prompt": "<p>Write the function <code>line_through(p1, p2)</code>: return the pair <code>(k, b)</code> for the line y = kx + b passing through two points.</p><p>For example, <code>line_through((0, 1), (2, 5))</code> → <code>(2.0, 1.0)</code>.</p>",
     "hints": [
      "First the slope k.",
      "b = y₁ − k · x₁."
     ]
    },
    {
     "title": "List of derivatives",
     "prompt": "<p>Write the function <code>derivs(f, xs, h=1e-5)</code>: at each point of <code>xs</code> return the list of values f′(x) computed through the central difference.</p><p>For example, <code>derivs(lambda x: x ** 2, [0, 1, 2])</code> ≈ <code>[0, 2, 4]</code>.</p>",
     "hints": [
      "Apply the <code>derivative</code> function from the lesson to each x."
     ],
     "check": {
      "tests": "_d = derivs(lambda x: x ** 2, [0, 1, 2])\nassert len(_d) == 3 and all(abs(_a - _b) < 1e-6 for _a, _b in zip(_d, [0, 2, 4])), f\"it should be ≈ [0, 2, 4], you got {_d}\"\n_d3 = derivs(lambda x: x ** 3, [-1, 0, 2])\nassert all(abs(_a - _b) < 1e-6 for _a, _b in zip(_d3, [3, 0, 12])), \"(x³)′ = 3x²: [3, 0, 12]\""
     }
    },
    {
     "title": "Rising or falling",
     "prompt": "<p>Write the function <code>trend(f, x)</code>: by the sign of the derivative at the point x return <code>\"өседі\"</code> (f′ &gt; 1e-6), <code>\"кемиді\"</code> (f′ &lt; −1e-6) or <code>\"тұрақты\"</code>.</p><p>For example, <code>trend(lambda x: (x - 3) ** 2, 5)</code> → <code>\"өседі\"</code>.</p>",
     "hints": [
      "First <code>derivative(f, x)</code>.",
      "Check the three cases with <code>if</code>."
     ]
    },
    {
     "title": "Stationary points",
     "prompt": "<p>Write the function <code>stationary(f, xs, tol=1e-3)</code>: return from <code>xs</code> the points where |f′(x)| &lt; tol (these are the \"candidates\" for a minimum or a maximum).</p><p>For example, for f(x) = x³ − 3x: <code>stationary(f, [-2, -1, 0, 1, 2])</code> → <code>[-1, 1]</code>.</p>",
     "hints": [
      "<code>[x for x in xs if abs(derivative(f, x)) &lt; tol]</code>"
     ],
     "check": {
      "tests": "assert stationary(lambda x: x ** 3 - 3 * x, [-2, -1, 0, 1, 2]) == [-1, 1], \"f′ = 3x² − 3 = 0: x = ±1\"\nassert stationary(lambda x: (x - 3) ** 2, [i / 2 for i in range(13)]) == [3.0], \"Парабола минимумы x = 3\"\nassert stationary(lambda x: 2 * x, [0, 1, 2]) == [], \"a line has no stationary points\""
     }
    },
    {
     "title": "Marginal profit",
     "prompt": "<p>A bakery bakes q loaves per day, the profit is P(q) = −0.02q² + 120q − 5000 ₸. The task:</p><ul><li><code>marginal(q)</code> — the marginal profit, that is, P′(q) (central difference);</li><li><code>best_q</code> — among the integers q from 0 to 5000, the one at which P(q) is the largest.</li></ul><p>The profit is largest where the derivative is 0: −0.04q + 120 = 0.</p>",
     "hints": [
      "In <code>marginal</code> use <code>derivative(P, q)</code>.",
      "<code>best_q = max(range(5001), key=P)</code>"
     ],
     "check": {
      "tests": "assert abs(marginal(1000) - 80) < 1e-4, \"P′(1000) = −0.04 · 1000 + 120 = 80: it is profitable to bake one more loaf\"\nassert abs(marginal(4000) + 40) < 1e-4, \"P′(4000) = −40: excess production\"\nassert best_q == 3000, \"Максимум q = 3000 (P′ = 0)\"\nassert abs(marginal(best_q)) < 1e-4, \"at the best point the marginal profit ≈ 0\""
     }
    },
    {
     "title": "Second derivative",
     "prompt": "<p>Write the function <code>second_derivative(f, x, h=1e-4)</code>: (f(x + h) − 2f(x) + f(x − h)) / h². It shows the \"bend\" of the function: if positive — a hollow (minimum), if negative — a convex shape (maximum). Then write <code>kind(f, x)</code>: at a stationary point return <code>\"минимум\"</code> if the second derivative is &gt; 0, and <code>\"максимум\"</code> if it is &lt; 0.</p>",
     "hints": [
      "Write the formula carefully with brackets: the denominator <code>h ** 2</code>.",
      "In <code>kind</code> check the sign."
     ]
    }
   ]
  },
  "mm-7": {
   "pr": [
    {
     "title": "Partial derivative with respect to a",
     "prompt": "<p>Write the function <code>partial_a(f, a, b, h=1e-5)</code>: return the partial derivative of the function of two arguments f(a, b) with respect to a (b is fixed) through the central difference.</p><p>For example, for f(a, b) = a² · b: <code>partial_a(f, 3, 2)</code> ≈ <code>12</code>.</p>",
     "hints": [
      "Change only a by ±h: <code>(f(a + h, b) - f(a - h, b)) / (2 * h)</code>."
     ],
     "check": {
      "tests": "assert abs(partial_a(lambda a, b: a ** 2 * b, 3, 2) - 12) < 1e-4, \"∂(a²b)/∂a = 2ab = 12\"\nassert abs(partial_a(lambda a, b: 4 * a + b ** 3, 1, 5) - 4) < 1e-4, \"∂(4a + b³)/∂a = 4: b is fixed\""
     }
    },
    {
     "title": "Length of the gradient",
     "prompt": "<p>Write the function <code>grad_norm(g)</code>: return the length of the gradient vector. It shows how fast the function grows; at a minimum it is close to 0.</p><p>For example, <code>grad_norm([4, 3])</code> → <code>5.0</code>.</p>",
     "hints": [
      "The length of a vector: the square root of the sum of squares."
     ],
     "check": {
      "tests": "assert abs(grad_norm([4, 3]) - 5) < 1e-12, \"grad_norm([4, 3]) = 5\"\nassert grad_norm([0, 0, 0]) == 0, \"at a minimum the gradient is zero\""
     }
    },
    {
     "title": "The opposite direction",
     "prompt": "<p>Write the function <code>descent_dir(g)</code>: return the direction in which the loss decreases fastest — the negative gradient (−∇).</p><p>For example, <code>descent_dir([4, -2])</code> → <code>[-4, 2]</code>.</p>",
     "hints": [
      "Change the sign of each element."
     ]
    },
    {
     "title": "The i-th partial derivative",
     "prompt": "<p>Write the function <code>partial(f, p, i, h=1e-5)</code>: <code>f</code> takes a list; return the partial derivative only with respect to the i-th parameter. The original <code>p</code> must not change.</p><p>For example, for f(p) = p[0]² + 3·p[1]: <code>partial(f, [2.0, 5.0], 1)</code> ≈ <code>3</code>.</p>",
     "hints": [
      "Make a copy <code>p[:]</code> and change only the i-th element."
     ],
     "check": {
      "tests": "_f = lambda p: p[0] ** 2 + 3 * p[1]\n_p = [2.0, 5.0]\nassert abs(partial(_f, _p, 0) - 4) < 1e-4, \"∂f/∂p₀ = 2·p₀ = 4\"\nassert abs(partial(_f, _p, 1) - 3) < 1e-4, \"∂f/∂p₁ = 3\"\nassert _p == [2.0, 5.0], \"the original p must not change: make a copy p[:]\""
     }
    },
    {
     "title": "Gradient step",
     "prompt": "<p>Write the function <code>grad_step(f, p, lr, h=1e-5)</code>: compute the numerical gradient and return the new point (a list) p − lr · ∇f(p).</p><p>For example, for f(p) = p[0]² + p[1]²: <code>grad_step(f, [1.0, 2.0], 0.1)</code> ≈ <code>[0.8, 1.6]</code>.</p>",
     "hints": [
      "Use the <code>gradient</code> function from the lesson.",
      "The minus sign: <code>a - lr * b</code>."
     ],
     "check": {
      "tests": "_f = lambda p: p[0] ** 2 + p[1] ** 2\n_n = grad_step(_f, [1.0, 2.0], 0.1)\nassert len(_n) == 2 and abs(_n[0] - 0.8) < 1e-6 and abs(_n[1] - 1.6) < 1e-6, f\"it should be ≈ [0.8, 1.6], you got {_n}\"\nassert _f(_n) < _f([1.0, 2.0]), \"after one step f should decrease\""
     }
    },
    {
     "title": "Analytic gradient",
     "prompt": "<p>f(a, b) = a² · b + 3b². Find the partial derivatives by hand and write the function <code>grad_f(a, b)</code>: return the list <code>[∂f/∂a, ∂f/∂b]</code> by the formula (not numerically).</p><p>In the check it is compared with the numerical gradient.</p>",
     "hints": [
      "∂f/∂a: b is fixed, (a²)′ = 2a.",
      "∂f/∂b: a² · 1 + 6b."
     ],
     "check": {
      "tests": "_f = lambda a, b: a ** 2 * b + 3 * b ** 2\nfor _a, _b in [(1.0, 2.0), (-3.0, 0.5), (2.0, -1.0)]:\n    _g = grad_f(_a, _b)\n    _h = 1e-5\n    _na = (_f(_a + _h, _b) - _f(_a - _h, _b)) / (2 * _h)\n    _nb = (_f(_a, _b + _h) - _f(_a, _b - _h)) / (2 * _h)\n    assert abs(_g[0] - _na) < 1e-4 and abs(_g[1] - _nb) < 1e-4, f\"at the point ({_a}, {_b}) the gradient should be ≈ [{_na:.3f}, {_nb:.3f}], you got {_g}\""
     }
    },
    {
     "title": "Descent to a minimum",
     "prompt": "<p>Write the function <code>minimize(f, p, lr, steps)</code>: starting from the point <code>p</code>, make <code>steps</code> steps p ← p − lr · ∇f(p) (numerical gradient) and return the last point. The original <code>p</code> must not change.</p><p>For example, the minimum of f(p) = (p[0] − 1)² + (p[1] + 2)² is the point [1, −2].</p>",
     "hints": [
      "In the loop recompute the gradient at each step.",
      "At the start <code>p = p[:]</code> — the original list is kept."
     ],
     "check": {
      "tests": "_f = lambda p: (p[0] - 1) ** 2 + (p[1] + 2) ** 2\n_p0 = [5.0, 5.0]\n_r = minimize(_f, _p0, 0.1, 200)\nassert abs(_r[0] - 1) < 1e-3 and abs(_r[1] + 2) < 1e-3, f\"the minimum should be ≈ [1, −2], you got {_r}\"\nassert _p0 == [5.0, 5.0], \"the original p must not change\"\n_r2 = minimize(lambda p: (p[0] - 3) ** 2, [0.0], 0.25, 50)\nassert abs(_r2[0] - 3) < 1e-3, \"it should also work for a function of one parameter\""
     }
    },
    {
     "title": "Gradient check",
     "prompt": "<p>In practice a hand-written gradient is checked against a numerical one (gradient check). Write the function <code>grad_check(f, grad, p, tol=1e-4)</code>: return <code>True</code> if for each element the difference between <code>grad(p)</code> (analytic) and the numerical gradient is less than <code>tol</code>.</p>",
     "hints": [
      "Compute the numerical gradient as in the lesson.",
      "<code>all(abs(a - b) &lt; tol for a, b in zip(...))</code>"
     ],
     "check": {
      "tests": "_f = lambda p: p[0] ** 2 * p[1] + p[1] ** 3\n_good = lambda p: [2 * p[0] * p[1], p[0] ** 2 + 3 * p[1] ** 2]\n_bad = lambda p: [2 * p[0], p[0] ** 2 + 3 * p[1] ** 2]\nassert grad_check(_f, _good, [1.5, -2.0]) is True, \"a correct gradient must pass the check\"\nassert grad_check(_f, _bad, [1.5, -2.0]) is False, \"a wrong gradient (∂f/∂a has no b) must be detected\""
     }
    }
   ]
  },
  "mm-8": {
   "pr": [
    {
     "title": "Mean absolute error",
     "prompt": "<p>Write the function <code>mae(y, yhat)</code>: MAE = (1/n) · Σ |ŷᵢ − yᵢ|.</p><p>For example, <code>mae([10, 20, 30], [12, 18, 33])</code> → <code>7/3 ≈ 2.33</code>.</p>",
     "hints": [
      "Divide the sum of <code>abs(p - t)</code> by n."
     ],
     "check": {
      "tests": "assert abs(mae([10, 20, 30], [12, 18, 33]) - 7 / 3) < 1e-12, \"|2| + |−2| + |3| = 7, 7 / 3\"\nassert mae([1, 2], [1, 2]) == 0, \"an exact prediction: 0\""
     }
    },
    {
     "title": "MSE of predictions",
     "prompt": "<p>Write the function <code>mse_pred(y, yhat)</code>: return the MSE from the actual values and the predictions.</p><p>For example, <code>mse_pred([10, 20, 30], [12, 18, 33])</code> → <code>17/3 ≈ 5.67</code>.</p>",
     "hints": [
      "Sum of <code>(p - t) ** 2</code> / n."
     ],
     "check": {
      "tests": "assert abs(mse_pred([10, 20, 30], [12, 18, 33]) - 17 / 3) < 1e-12, \"4 + 4 + 9 = 17, 17 / 3\"\nassert mse_pred([5], [5]) == 0, \"an exact prediction: 0\"\nassert abs(mse_pred([0, 0], [1, -1]) - 1) < 1e-12, \"the errors are squared: 1\""
     }
    },
    {
     "title": "RMSE",
     "prompt": "<p>Write the function <code>rmse(y, yhat)</code>: return √MSE. RMSE has the same unit as y (for example, million ₸), so it is easy to explain.</p><p>For example, <code>rmse([3, 5], [0, 1])</code> → √((9 + 16) / 2) ≈ <code>3.54</code>.</p>",
     "hints": [
      "First the MSE, then <code>** 0.5</code>."
     ]
    },
    {
     "title": "Effect of an outlier",
     "prompt": "<p>Write the function <code>losses(y, yhat)</code>: return the pair <code>(mse, mae)</code>. In the check you will see that one large error affects the MSE much more than the MAE.</p>",
     "hints": [
      "Compute both formulas in one function."
     ],
     "check": {
      "tests": "_m1, _a1 = losses([10, 10, 10, 10], [11, 9, 11, 9])\nassert abs(_m1 - 1) < 1e-12 and abs(_a1 - 1) < 1e-12, \"all errors equal 1: MSE = MAE = 1\"\n_m2, _a2 = losses([10, 10, 10, 10], [11, 9, 11, 19])\nassert abs(_m2 - 21) < 1e-12 and abs(_a2 - 3) < 1e-12, \"if one error is 9: MSE = 21, MAE = 3\"\nassert _m2 / _m1 > 3 * (_a2 / _a1), \"the MSE is sensitive to outliers\""
     }
    },
    {
     "title": "Searching for b",
     "prompt": "<p>Write the function <code>best_b(w, xs, ys, bs)</code>: w is fixed; for each b in the list <code>bs</code> compute the MSE and return the b with the smallest MSE.</p>",
     "hints": [
      "Write the <code>mse</code> function from the lesson.",
      "<code>min(bs, key=lambda b: mse(w, b, xs, ys))</code>"
     ]
    },
    {
     "title": "Best constant prediction",
     "prompt": "<p>The simplest prediction without a model is one number c for everyone. Write the function <code>best_const(ys, cands)</code>: return from <code>cands</code> the c whose MSE is the smallest. In the check you will see that the MSE is minimised exactly by the mean value.</p>",
     "hints": [
      "For a constant prediction the MSE = Σ (c − y)² / n."
     ],
     "check": {
      "tests": "_ys = [3, 7, 8, 12, 20]\n_c = best_const(_ys, [5, 8, 10, 12])\nassert _c == 10, f\"the mean is 10: best_const should be 10, you got {_c}\"\nassert best_const(_ys, [i / 10 for i in range(0, 300)]) == 10.0, \"however dense the grid is, the answer is the mean (10.0)\""
     }
    },
    {
     "title": "Two-dimensional grid search",
     "prompt": "<p>Write the function <code>grid_search(xs, ys, ws, bs)</code>: check all pairs (w, b) and return the triple <code>(w, b, mse)</code> with the smallest MSE.</p>",
     "hints": [
      "Two nested loops: <code>for w in ws: for b in bs:</code>.",
      "Keep the smallest MSE and its pair (w, b)."
     ],
     "check": {
      "tests": "_xs = [1, 2, 3, 4, 5]\n_ys = [5.1, 6.9, 9.0, 11.2, 12.8]\n_w, _b, _m = grid_search(_xs, _ys, [1.5, 2.0, 2.5], [2, 3, 4])\nassert (_w, _b) == (2.0, 3), f\"for y ≈ 2x + 3 it should be (2.0, 3), you got {(_w, _b)}\"\nassert abs(_m - 0.02) < 1e-9, f\"the smallest MSE should be ≈ 0.02, you got {_m}\""
     }
    },
    {
     "title": "Numerical gradient of the MSE",
     "prompt": "<p>Write the function <code>mse_grad(w, b, xs, ys)</code>: treat the MSE as a function of the parameters (w, b) and, using the numerical <code>gradient</code> from lesson 7, return the list <code>[∂MSE/∂w, ∂MSE/∂b]</code>.</p><p>In the check it matches the formulas (2/n)·Σ eᵢxᵢ and (2/n)·Σ eᵢ (these come in the next lesson).</p>",
     "hints": [
      "f(p) = mse(p[0], p[1], xs, ys) — a function that takes a list.",
      "<code>gradient(lambda p: ..., [w, b])</code>"
     ],
     "check": {
      "tests": "_g = mse_grad(0.0, 0.0, [1, 2, 3], [3, 5, 7])\nassert len(_g) == 2, \"two elements: [∂/∂w, ∂/∂b]\"\nassert abs(_g[0] + 68 / 3) < 1e-4 and abs(_g[1] + 10) < 1e-4, f\"at the point w = b = 0 it should be ≈ [−22.67, −10], you got {_g}\"\n_g2 = mse_grad(2.0, 1.0, [1, 2, 3], [3, 5, 7])\nassert abs(_g2[0]) < 1e-4 and abs(_g2[1]) < 1e-4, \"Минимумда (w = 2, b = 1) градиент ≈ 0\""
     }
    }
   ]
  },
  "mm-9": {
   "pr": [
    {
     "title": "Computing dw",
     "prompt": "<p>Write the function <code>grad_w(w, b, xs, ys)</code>: ∂MSE/∂w = (2/n) · Σ eᵢ · xᵢ, where eᵢ = w·xᵢ + b − yᵢ.</p><p>For example, <code>grad_w(0, 0, [1, 2, 3], [3, 5, 7])</code> ≈ <code>−22.67</code>.</p>",
     "hints": [
      "Multiply the sum of eᵢ · xᵢ by 2/n."
     ]
    },
    {
     "title": "Computing db",
     "prompt": "<p>Write the function <code>grad_b(w, b, xs, ys)</code>: ∂MSE/∂b = (2/n) · Σ eᵢ.</p><p>For example, <code>grad_b(0, 0, [1, 2, 3], [3, 5, 7])</code> → <code>−10.0</code>.</p>",
     "hints": [
      "Multiply the sum of the errors by 2/n."
     ],
     "check": {
      "tests": "assert abs(grad_b(0, 0, [1, 2, 3], [3, 5, 7]) + 10) < 1e-9, \"grad_b(0, 0, ...) = −10\"\nassert abs(grad_b(2, 2, [1, 2, 3], [3, 5, 7]) - 2) < 1e-9, \"b is one unit too large: grad_b = 2\""
     }
    },
    {
     "title": "Updating a parameter",
     "prompt": "<p>Write the function <code>update(param, grad, lr)</code>: by the gradient descent rule return the new value param − lr · grad.</p><p>For example, <code>update(5, 4, 0.25)</code> → <code>4.0</code>.</p>",
     "hints": [
      "We move against the gradient: minus."
     ],
     "check": {
      "tests": "assert update(5, 4, 0.25) == 4.0, \"5 − 0.25 · 4 = 4\"\nassert abs(update(0, -10, 0.1) - 1) < 1e-12, \"if the gradient is negative, the parameter grows: 1\""
     }
    },
    {
     "title": "Loss history",
     "prompt": "<p>Write the function <code>fit_history(xs, ys, lr, epochs)</code>: starting from w = b = 0, make <code>epochs</code> steps and return the list of MSE values <b>after</b> each step (of length <code>epochs</code>).</p><p>With a suitable lr the loss decreases.</p>",
     "hints": [
      "At the end of the <code>fit</code> loop from the lesson add <code>hist.append(mse(w, b, xs, ys))</code>."
     ],
     "check": {
      "tests": "_h = fit_history([1, 2, 3, 4, 5], [3, 5, 7, 9, 11], 0.05, 300)\nassert isinstance(_h, list) and len(_h) == 300, \"a list of length epochs = 300\"\nassert all(_h[_i + 1] <= _h[_i] + 1e-12 for _i in range(299)), \"the loss should decrease at each step\"\nassert _h[-1] < 0.01, f\"after 300 steps the MSE should be < 0.01, you got {_h[-1]:.4f}\"\n_h1 = fit_history([1, 2, 3], [3, 5, 7], 0.1, 1)\nassert abs(_h1[0] - (sum((68 / 30 * _x + 1 - _y) ** 2 for _x, _y in zip([1, 2, 3], [3, 5, 7])) / 3)) < 1e-9, \"the first value is the MSE after the first step\""
     }
    },
    {
     "title": "Only w (b = 0)",
     "prompt": "<p>A model through the origin: ŷ = w · x. Write the function <code>fit_w(xs, ys, lr, epochs)</code>: starting from w = 0, update only w by ∂MSE/∂w = (2/n) · Σ eᵢxᵢ and return the final w.</p><p>For example, a courier in Almaty: distance (km) and time (min), y ≈ 3x.</p>",
     "hints": [
      "Error: eᵢ = w·xᵢ − yᵢ (without b).",
      "Only w is updated."
     ],
     "check": {
      "tests": "assert abs(fit_w([2, 4, 6, 8], [6, 12, 18, 24], 0.01, 500) - 3) < 1e-6, \"y = 3x: w ≈ 3\"\n_w = fit_w([1, 2, 3, 4], [2.9, 6.1, 9.2, 11.8], 0.02, 1000)\n_best = sum(_x * _y for _x, _y in zip([1, 2, 3, 4], [2.9, 6.1, 9.2, 11.8])) / 30\nassert abs(_w - _best) < 1e-6, f\"w ≈ {_best:.4f} should be, you got {_w:.4f}\""
     }
    },
    {
     "title": "Finding divergence",
     "prompt": "<p>Write the function <code>diverges(xs, ys, lr, epochs)</code>: starting from w = b = 0, make <code>epochs</code> steps; if the final MSE is greater than the initial MSE (at w = b = 0), return <code>True</code>. This means lr is too large.</p>",
     "hints": [
      "Save the initial MSE before the loop.",
      "The loop is as in <code>fit</code> from the lesson."
     ],
     "check": {
      "tests": "_xs, _ys = [1, 2, 3, 4, 5], [3, 5, 7, 9, 11]\nassert diverges(_xs, _ys, 0.05, 50) is False, \"lr = 0.05: converges\"\nassert diverges(_xs, _ys, 0.2, 50) is True, \"lr = 0.2: the loss grows (divergence)\"\nassert diverges(_xs, _ys, 0.001, 50) is False, \"a small lr is slow, but it converges\""
     }
    },
    {
     "title": "Early stopping",
     "prompt": "<p>Write the function <code>fit_tol(xs, ys, lr, tol, max_epochs)</code>: starting from w = b = 0, run gradient descent; if after a step the MSE decreased by less than <code>tol</code> (|previous − new| &lt; tol), stop. Return <code>(w, b, epochs_used)</code>, where epochs_used ≤ max_epochs.</p>",
     "hints": [
      "After each step compare the new MSE with the previous one.",
      "Count the step number from 1: <code>range(1, max_epochs + 1)</code>."
     ],
     "check": {
      "tests": "_w, _b, _e = fit_tol([1, 2, 3, 4, 5], [3, 5, 7, 9, 11], 0.05, 1e-10, 5000)\nassert abs(_w - 2) < 0.01 and abs(_b - 1) < 0.02, f\"w ≈ 2, b ≈ 1 should be, you got {_w:.3f}, {_b:.3f}\"\nassert 50 < _e < 5000, f\"there should be early stopping: epochs_used = {_e}\"\n_w2, _b2, _e2 = fit_tol([1, 2, 3], [2, 4, 6], 0.01, 1e-20, 30)\nassert _e2 == 30, \"if tol is very small, it stops at max_epochs\""
     }
    },
    {
     "title": "Scaling a feature",
     "prompt": "<p>The flat area (40–120 m²) is a large number, so gradient descent is slow. The solution is standardisation: x′ = (x − m) / s, where m is the mean and s is <code>statistics.pstdev</code>. Write the function <code>fit_scaled(xs, ys, lr, epochs)</code>: train ŷ = w′x′ + b′ on x′ (from w = b = 0), then return <code>(w, b)</code> in the original units: w = w′ / s, b = b′ − w′ · m / s.</p>",
     "hints": [
      "First train as in the <code>fit</code> of the lesson.",
      "Train on the standardised data, and at the end convert w and b back to the original units."
     ],
     "check": {
      "tests": "_xs = [40, 55, 60, 75, 90, 120]\n_ys = [0.4 * _x + 5 for _x in _xs]\n_w, _b = fit_scaled(_xs, _ys, 0.1, 300)\nassert abs(_w - 0.4) < 1e-3 and abs(_b - 5) < 0.05, f\"y = 0.4x + 5: it should be (0.4, 5), you got ({_w:.4f}, {_b:.3f})\""
     }
    }
   ]
  },
  "mm-10": {
   "pr": [
    {
     "title": "Vector operation",
     "prompt": "<p>Using NumPy, write the function <code>combo(u, v, c)</code>: return the array u + c · v (without loops).</p><p>For example, <code>combo(np.array([1, 2]), np.array([10, 20]), 0.5)</code> → <code>array([6., 12.])</code>.</p>",
     "hints": [
      "In NumPy <code>u + c * v</code> is computed at once for the whole array."
     ]
    },
    {
     "title": "Describing an array",
     "prompt": "<p>Write the function <code>describe(A)</code>: for a NumPy array return <code>(number of rows, number of columns, number of elements)</code> (<code>A.shape</code>, <code>A.size</code>).</p><p>For example, for a 2 × 3 array → <code>(2, 3, 6)</code>.</p>",
     "hints": [
      "<code>rows, cols = A.shape</code>",
      "<code>A.size</code> is the number of all elements."
     ]
    },
    {
     "title": "Distance with NumPy",
     "prompt": "<p>Write the function <code>dist(u, v)</code>: return the Euclidean distance between two NumPy vectors through <code>np.linalg.norm</code> (without loops).</p><p>For example, <code>dist(np.array([1, 2]), np.array([4, 6]))</code> → <code>5.0</code>.</p>",
     "hints": [
      "The length of the difference vector: <code>np.linalg.norm(u - v)</code>."
     ],
     "check": {
      "tests": "import numpy as _np\nassert abs(float(dist(_np.array([1, 2]), _np.array([4, 6]))) - 5) < 1e-12, \"dist([1, 2], [4, 6]) = 5\"\nassert abs(float(dist(_np.array([0.0, 0.0, 0.0]), _np.array([1.0, 2.0, 2.0]))) - 3) < 1e-12, \"in three dimensions: 3\""
     }
    },
    {
     "title": "Vectorised MSE",
     "prompt": "<p>Write the function <code>mse_np(w, b, x, y)</code>: return the MSE through NumPy arrays without loops.</p><p>For example, <code>mse_np(1, 2, np.array([1, 2, 3]), np.array([3, 5, 7]))</code> → <code>5/3 ≈ 1.667</code>.</p>",
     "hints": [
      "The errors for all at once: <code>e = w * x + b - y</code>.",
      "<code>(e ** 2).mean()</code>"
     ],
     "check": {
      "tests": "import numpy as _np\nassert abs(float(mse_np(1, 2, _np.array([1, 2, 3]), _np.array([3, 5, 7]))) - 5 / 3) < 1e-12, \"mse_np(1, 2, ...) = 5/3\"\nassert abs(float(mse_np(2, 1, _np.array([1.0, 2.0, 3.0]), _np.array([3.0, 5.0, 7.0])))) < 1e-12, \"an exact line: 0\""
     }
    },
    {
     "title": "Nearest point with NumPy",
     "prompt": "<p>Write the function <code>nearest_np(P, q)</code>: <code>P</code> is an array of points (each row is one point), <code>q</code> is a vector. Return the index (an integer) of the row nearest to q. Compute the distance to each point through <code>np.linalg.norm(p - q)</code>.</p>",
     "hints": [
      "The approach from lesson 3: <code>min(range(len(P)), key=...)</code>.",
      "Distance: <code>np.linalg.norm(P[i] - q)</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_P = _np.array([[45, 1], [62, 2], [75, 3], [58, 2], [90, 4]], dtype=float)\nassert int(nearest_np(_P, _np.array([60.0, 2.0]))) in (1, 3), \"[60, 2] is equally far from [62, 2] and [58, 2]\"\nassert int(nearest_np(_P, _np.array([88.0, 4.0]))) == 4, \"[90, 4] is nearer to [88, 4]\"\nassert int(nearest_np(_P, _np.array([0.0, 0.0]))) == 0, \"[45, 1] is nearer to the origin\""
     }
    },
    {
     "title": "Xᵀ · X with NumPy",
     "prompt": "<p>Write the function <code>gram_np(X)</code>: return the matrix <code>X.T @ X</code> (the <code>gram</code> function from lesson 5 in one line).</p><p>For example, <code>gram_np(np.array([[1, 2], [1, 3]]))</code> → <code>[[2, 5], [5, 13]]</code>.</p>",
     "hints": [
      "Transpose: <code>X.T</code>, multiplication: <code>@</code>."
     ]
    },
    {
     "title": "Matrix gradient descent",
     "prompt": "<p>A model with several features: ŷ = X @ w (X has an intercept column). Write the function <code>fit_np(X, y, lr, epochs)</code>: start with w of zeros (<code>np.zeros</code>), at each step compute <code>grad = 2 / n * X.T @ (X @ w - y)</code> and update <code>w -= lr * grad</code>. Return the final array w.</p>",
     "hints": [
      "<code>w = np.zeros(X.shape[1])</code> — zeros, one for each column.",
      "The one-line formula from the lesson: <code>2 / n * X.T @ (X @ w - y)</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_X = _np.array([[1, 1, 2], [1, 2, 0], [1, 3, 1], [1, 4, 3], [1, 0, 1]], dtype=float)\n_y = _X @ _np.array([1.0, 2.0, -1.0])\n_w = fit_np(_X, _y, 0.05, 3000)\nassert _w.shape == (3,), \"the length of w is the number of columns (3)\"\nassert _np.allclose(_w, [1, 2, -1], atol=1e-3), f\"it should be w ≈ [1, 2, −1], you got {_w}\""
     }
    },
    {
     "title": "Cosine matrix with NumPy",
     "prompt": "<p>Write the function <code>cos_matrix(M)</code>: the rows of <code>M</code> are vectors. Return the matrix of cosine similarity for all pairs. The way: divide each row by its length (unit vectors), then <code>U @ U.T</code>.</p><p>Hint: the row lengths are <code>np.linalg.norm(M, axis=1)</code>, and for the division <code>M / norms[:, None]</code>.</p>",
     "hints": [
      "Unit vectors: <code>U = M / norms[:, None]</code>.",
      "<code>U @ U.T</code> — the dot products of all pairs."
     ]
    }
   ]
  }
 }
});
