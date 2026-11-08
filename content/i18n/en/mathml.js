// M4.3 Math for ML: English text. Code, solutions and expected output are in content/mathml.js.
DJ.i18n.patch({
  modules: {
    'm4-3': { intro: 'Four ideas sit behind machine learning: vectors, matrices, derivatives and gradient descent. You will first write all of them by hand with plain Python lists, and at the end you will see why NumPy is needed.' }
  },
  lessons: {
    'mm-1': {
      title: 'Vector: a list of numbers',
      body: `
<p>In ML every object (a customer, a flat, a film) is described by a <b>vector</b>, which is just an ordered list of numbers. For example, a flat: <code>[area, rooms, floor]</code> = <code>[54, 2, 7]</code>. Each number in the list is one <b>feature</b>, and the length of the list is the vector's <b>dimension</b>.</p>
<h3>Three basic operations</h3>
<ul>
<li><b>Addition</b>: add two vectors of the same length element by element: <code>[1, 2] + [3, 4] = [4, 6]</code>.</li>
<li><b>Multiplying by a scalar</b> (scale): multiply each element by one number: <code>3 · [1, 2] = [3, 6]</code>.</li>
<li><b>Length</b> (norm): the Pythagorean theorem: <code>‖v‖ = √(v₁² + v₂² + …)</code>.</li>
</ul>
<pre><code>def add(u, v):
    return [a + b for a, b in zip(u, v)]

def scale(c, v):
    return [c * a for a in v]

def norm(v):
    return sum(a * a for a in v) ** 0.5</code></pre>
<p>If you write <code>[1, 2] + [3, 4]</code> in Python, you get <code>[1, 2, 3, 4]</code>. That joins the lists; it is not vector addition. So we write element-wise operations ourselves with <code>zip</code>.</p>
<h3>Step-by-step example</h3>
<p>The length of the vector v = [3, 4]:</p>
<ol>
<li>Squares: 3² = 9, 4² = 16.</li>
<li>Sum: 9 + 16 = 25.</li>
<li>Root: √25 = 5. So ‖v‖ = 5.</li>
</ol>
<p>Now 2 · v = [6, 8], and its length is √(36 + 64) = 10. Multiply a vector by 2 and its length doubles too. To get a <b>unit vector</b>, divide the vector by its own length: [3, 4] / 5 = [0.6, 0.8], whose length is 1. This means "keep the direction, drop the scale", and cosine similarity in the next lesson builds on it.</p>
<div class="tip"><b>Common mistakes:</b> (1) "Adding" lists with <code>u + v</code>: that joins them. (2) <code>2 * [1, 2]</code> in Python gives <code>[1, 2, 1, 2]</code>, not vector multiplication. (3) Adding vectors of different lengths: <code>zip</code> stops at the shorter one and silently hides the error.</div>`,
      ex: [
        { prompt: 'Write the functions <code>add(u, v)</code> (element-wise addition) and <code>scale(c, v)</code> (multiply each element by <code>c</code>). Both should return a new list.', check: { tests: 'assert add([1, 2, 3], [10, 20, 30]) == [11, 22, 33], "add([1, 2, 3], [10, 20, 30]) should be [11, 22, 33] (not joined lists!)"\nassert add([0.5], [0.25]) == [0.75], "One-element vectors should work too"\nassert scale(3, [1, -2, 0]) == [3, -6, 0], "scale(3, [1, -2, 0]) should be [3, -6, 0]"\nassert scale(0, [5, 7]) == [0, 0], "Multiplying by 0 gives the zero vector"' }, hints: ['<code>zip(u, v)</code> takes pairs from the two lists.', '<code>[c * a for a in v]</code>'] },
        { prompt: 'Write the function <code>norm(v)</code>: it should return the vector\'s length (√ of the sum of squares). Then store the unit vector of <code>v = [6, 8]</code> (each element / length) in the variable <code>unit</code>.', check: { tests: 'assert abs(norm([3, 4]) - 5) < 1e-9, "norm([3, 4]) should be 5"\nassert abs(norm([1, 2, 2]) - 3) < 1e-9, "norm([1, 2, 2]) should be 3"\nassert abs(norm([0, 0]) - 0) < 1e-9, "The zero vector has length 0"\nassert len(unit) == 2 and abs(unit[0] - 0.6) < 1e-9 and abs(unit[1] - 0.8) < 1e-9, "unit should be [0.6, 0.8]"' }, hints: ['<code>sum(a * a for a in v) ** 0.5</code> or <code>math.sqrt</code>.', 'Unit vector: <code>[a / norm(v) for a in v]</code>'] },
        { prompt: 'What does <code>[1, 2] + [3, 4]</code> give in Python?', options: ['[4, 6]', '[1, 2, 3, 4]', '10', 'An error (TypeError)'], explain: 'For lists, + joins them. To add vectors you need element-wise addition with zip.' }
      ]
    },
    'mm-2': {
      title: 'Dot product and cosine similarity',
      body: `
<p>The <b>dot product</b> turns two vectors into one number: multiply matching elements and add them up.</p>
<pre><code>def dot(u, v):
    return sum(a * b for a, b in zip(u, v))

dot([1, 2, 3], [4, 5, 6])   # 1·4 + 2·5 + 3·6 = 32</code></pre>
<p>The dot product is the most common operation in ML: a linear model's prediction is <code>w · x</code>, and every neuron in a neural network computes a dot product too.</p>
<h3>Cosine similarity</h3>
<p>The dot product depends on the vectors' lengths. To compare only the <b>direction</b>, we divide it by the lengths:</p>
<pre><code>cos(u, v) = dot(u, v) / (‖u‖ · ‖v‖)</code></pre>
<ul>
<li>1: same direction (very similar);</li>
<li>0: perpendicular (no relation);</li>
<li>−1: opposite.</li>
</ul>
<h3>Step-by-step example: a recommender system</h3>
<p>Take how many hours users spent on 3 film genres (comedy, drama, action):</p>
<table>
<tr><th>User</th><th>Comedy</th><th>Drama</th><th>Action</th></tr>
<tr><td>Aigul</td><td>4</td><td>0</td><td>2</td></tr>
<tr><td>Daulet</td><td>8</td><td>1</td><td>4</td></tr>
<tr><td>Saule</td><td>0</td><td>5</td><td>1</td></tr>
</table>
<ol>
<li>dot(Aigul, Daulet) = 4·8 + 0·1 + 2·4 = 40.</li>
<li>‖Aigul‖ = √(16 + 0 + 4) = √20 ≈ 4.47; ‖Daulet‖ = √(64 + 1 + 16) = 9.</li>
<li>cos = 40 / (4.47 · 9) ≈ 0.99: very similar tastes.</li>
<li>dot(Aigul, Saule) = 0 + 0 + 2 = 2; cos = 2 / (4.47 · 5.10) ≈ 0.09: not similar.</li>
</ol>
<p>Daulet watches twice as much as Aigul, but cosine ignores that: only the direction, "which genres they like", matters. So a new comedy Daulet liked can be recommended to Aigul.</p>
<div class="tip"><b>Common mistakes:</b> (1) The zero vector has length 0 and you cannot divide by it, so check for it separately. (2) Mixing up the dot product and cosine: a large dot product may mean just "big numbers", not "similar".</div>`,
      ex: [
        { prompt: 'Write the functions <code>dot(u, v)</code> and <code>cosine(u, v)</code>. Use <code>dot</code> inside <code>cosine</code>.', check: { tests: 'assert dot([1, 2, 3], [4, 5, 6]) == 32, "dot([1, 2, 3], [4, 5, 6]) should be 32"\nassert dot([1, 0], [0, 1]) == 0, "The dot product of perpendicular vectors is 0"\nassert abs(cosine([1, 2], [2, 4]) - 1) < 1e-9, "Vectors with the same direction have cosine = 1"\nassert abs(cosine([1, 0], [-1, 0]) + 1) < 1e-9, "Opposite vectors have cosine = -1"\nassert abs(cosine([4, 0, 2], [0, 5, 1]) - 2 / (20 ** 0.5 * 26 ** 0.5)) < 1e-9, "cosine([4, 0, 2], [0, 5, 1]) should be ≈ 0.088"' }, hints: ['<code>sum(a * b for a, b in zip(u, v))</code>', 'Length: <code>dot(u, u) ** 0.5</code>'] },
        { prompt: 'The dictionary <code>users</code> holds each user\'s genre vector. Write a <code>cosine</code> function and store in <code>best</code> the name of the <b>other</b> user most similar to <code>"Aigul"</code>. Then print it.', check: { tests: 'assert best == "Daulet", "The most similar user should be Daulet (cosine ≈ 0.99). Leave Aigul herself out of the comparison"' }, hints: ['If you compare Aigul with herself, cosine = 1 and she wins. Leave her out.', '<code>max(names, key=lambda n: cosine(users["Aigul"], users[n]))</code>'] },
        { prompt: 'u = [2, −1, 3], v = [4, 0, −2]. What is dot(u, v)?', explain: '2·4 + (−1)·0 + 3·(−2) = 8 + 0 − 6 = 2.' }
      ]
    },
    'mm-3': {
      title: 'Distance and the nearest neighbour',
      body: `
<p>Measuring how "far apart" two objects are is the basis of kNN, clustering and search systems.</p>
<h3>Euclidean distance</h3>
<p>Distance measured along a straight line, that is, the length of the difference vector:</p>
<pre><code>d(u, v) = √((u₁ − v₁)² + (u₂ − v₂)² + …)</code></pre>
<h3>Manhattan distance</h3>
<p>Like walking along city blocks: only horizontally and vertically. The sum of absolute differences:</p>
<pre><code>d(u, v) = |u₁ − v₁| + |u₂ − v₂| + …</code></pre>
<pre><code>def euclidean(u, v):
    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5

def manhattan(u, v):
    return sum(abs(a - b) for a, b in zip(u, v))</code></pre>
<h3>Step-by-step example</h3>
<p>A = [1, 2], B = [4, 6].</p>
<ol>
<li>Differences: 4 − 1 = 3, 6 − 2 = 4.</li>
<li>Euclidean: √(3² + 4²) = √25 = 5.</li>
<li>Manhattan: |3| + |4| = 7.</li>
</ol>
<p>Manhattan is never smaller than Euclidean, because we "go around the corner". Which one to pick depends on the task: Euclidean is the usual default, while Manhattan is more stable on high-dimensional data and data with outliers, because it does not square the differences.</p>
<h3>Nearest neighbour</h3>
<p>We don't know the price of a new flat, but we know its features. The simplest prediction: take the price of the flat with the closest features. The algorithm: compute the distance to every point and pick the smallest.</p>
<pre><code>points = [[50, 2], [80, 3], [35, 1]]
new = [52, 2]
best = min(range(len(points)), key=lambda i: euclidean(points[i], new))
print(best)   # 0</code></pre>
<div class="tip"><b>Common mistakes:</b> (1) Scale: if area (50–120 m²) and room count (1–4) are in one vector, area completely dominates the distance. That is why features are standardised first (z-score). (2) Forgetting to take the root after the squares. (3) <code>min(points, key=...)</code> returns the point itself; if you need the index, use <code>range(len(points))</code>.</div>`,
      ex: [
        { prompt: 'Write the functions <code>euclidean(u, v)</code> and <code>manhattan(u, v)</code>.', check: { tests: 'assert abs(euclidean([1, 2], [4, 6]) - 5) < 1e-9, "euclidean([1, 2], [4, 6]) should be 5"\nassert abs(manhattan([1, 2], [4, 6]) - 7) < 1e-9, "manhattan([1, 2], [4, 6]) should be 7"\nassert abs(manhattan([5, 1], [2, 4]) - 6) < 1e-9, "Take the absolute value: manhattan([5, 1], [2, 4]) = 6"\nassert abs(euclidean([0, 0, 0], [1, 2, 2]) - 3) < 1e-9, "In three dimensions: euclidean = 3"' }, hints: ['Add up the squares <code>(a - b) ** 2</code>, then <code>** 0.5</code>.', 'For Manhattan, <code>abs(a - b)</code>.'] },
        { prompt: 'Write the function <code>nearest(points, q)</code>: it should return the <b>index</b> of the point closest to <code>q</code> by Euclidean distance. Then store in <code>pred</code> the price of the flat in <code>flats</code> closest to <code>new_flat</code>.', starter: 'flats = [[45, 1], [62, 2], [75, 3], [58, 2], [90, 4]]\nprices = [21, 28, 34, 27, 41]   # million ₸\nnew_flat = [60, 2]\n\ndef nearest(points, q):\n    pass\n', check: { tests: 'assert nearest([[0, 0], [5, 5], [1, 1]], [2, 2]) == 2, "nearest should return the point\'s index: [1, 1] (index 2) is closest to [2, 2]"\nassert nearest([[3, 3]], [0, 0]) == 0, "With a single point, the index is 0"\nassert nearest(flats, [61, 2]) == 1, "The closest to [61, 2] is [62, 2] (index 1)"\nassert pred in (27, 28), "pred should be 28 or 27: [62, 2] and [58, 2] are equally far from [60, 2]"' }, hints: ['<code>min(range(len(points)), key=...)</code> returns an index.', '<code>pred = prices[nearest(flats, new_flat)]</code>'] },
        { prompt: 'A = [1, 5, 2], B = [4, 1, 2]. What is the Manhattan distance?', explain: '|1 − 4| + |5 − 1| + |2 − 2| = 3 + 4 + 0 = 7. (Euclidean: √(9 + 16 + 0) = 5.)' }
      ]
    },
    'mm-4': {
      title: 'Matrices and multiplication',
      body: `
<p>A <b>matrix</b> is a table of numbers. In Python we store it as a list of lists: each inner list is one row.</p>
<pre><code>A = [[1, 2, 3],
     [4, 5, 6]]      # shape: 2 × 3 (2 rows, 3 columns)
A[1][2]              # 6: row 2, column 3 (indices start at 0)</code></pre>
<p>A data table in ML looks exactly like this: each row is one object (a flat), each column is one feature.</p>
<h3>Multiplying a matrix by a vector</h3>
<p>A (m × n) · x (length n) = a vector of length m. Each result is the dot product of one row of A with x.</p>
<pre><code>def matvec(A, x):
    return [sum(a * b for a, b in zip(row, x)) for row in A]</code></pre>
<h3>Step-by-step example</h3>
<p>A = [[1, 2], [3, 4]], x = [5, 6].</p>
<ol>
<li>Row 1: 1·5 + 2·6 = 17.</li>
<li>Row 2: 3·5 + 4·6 = 39.</li>
<li>Result: [17, 39].</li>
</ol>
<h3>Multiplying a matrix by a matrix</h3>
<p>A (m × n) · B (n × p) = C (m × p). C[i][j] is the dot product of row i of A and column j of B. The condition: the number of columns of A must equal the number of rows of B.</p>
<pre><code>def matmul(A, B):
    n, p = len(B), len(B[0])
    return [[sum(A[i][k] * B[k][j] for k in range(n))
             for j in range(p)]
            for i in range(len(A))]

matmul([[1, 2], [3, 4]], [[5, 6], [7, 8]])
# [[1·5+2·7, 1·6+2·8], [3·5+4·7, 3·6+4·8]] = [[19, 22], [43, 50]]</code></pre>
<p>Matrix multiplication is <b>not commutative</b>: usually A · B ≠ B · A. The <b>identity matrix</b> I (1 on the diagonal, 0 elsewhere) works like 1 among numbers: A · I = A.</p>
<div class="tip"><b>Common mistakes:</b> (1) Mismatched shapes: (2 × 3) · (2 × 3) cannot be multiplied. Always check the inner dimensions. (2) Creating a zero matrix with <code>[[0] * n] * m</code>: all rows point to the same list, so changing one changes them all. Use <code>[[0] * n for _ in range(m)]</code> instead.</div>`,
      ex: [
        { prompt: 'Write the function <code>matvec(A, x)</code>: it should multiply a matrix by a vector (the dot product of each row with <code>x</code>).', check: { tests: 'assert matvec([[1, 2], [3, 4]], [5, 6]) == [17, 39], "matvec([[1, 2], [3, 4]], [5, 6]) should be [17, 39]"\nassert matvec([[1, 0, 2], [0, 1, 1]], [3, 4, 5]) == [13, 9], "2 × 3 matrix · vector of length 3 = vector of length 2: [13, 9]"\nassert matvec([[2, 0], [0, 2]], [7, -1]) == [14, -2], "A diagonal matrix scales each element"' }, hints: ['For each <code>row</code>: <code>sum(a * b for a, b in zip(row, x))</code>.'] },
        { prompt: 'Write the function <code>matmul(A, B)</code> (lists of lists, no NumPy). Assume the number of columns of <code>A</code> equals the number of rows of <code>B</code>.', check: { tests: 'assert matmul([[1, 2], [3, 4]], [[5, 6], [7, 8]]) == [[19, 22], [43, 50]], "matmul([[1, 2], [3, 4]], [[5, 6], [7, 8]]) should be [[19, 22], [43, 50]]"\nassert matmul([[1, 2, 3]], [[1], [2], [3]]) == [[14]], "(1 × 3) · (3 × 1) = (1 × 1): [[14]]"\nassert matmul([[1], [2]], [[3, 4]]) == [[3, 4], [6, 8]], "(2 × 1) · (1 × 2) = (2 × 2): [[3, 4], [6, 8]]"\nassert matmul([[2, 3], [4, 5]], [[1, 0], [0, 1]]) == [[2, 3], [4, 5]], "Multiplying by the identity matrix leaves the matrix unchanged"' }, hints: ['Result shape: <code>len(A)</code> × <code>len(B[0])</code>.', 'C[i][j] = <code>sum(A[i][k] * B[k][j] for k in range(len(B)))</code>'] },
        { prompt: 'A = [[2, 1], [0, 3]], B = [[1, 4], [2, 1]]. If C = A · B, what is C[0][1] (row 1, column 2)?', explain: 'Row 1 of A is [2, 1], column 2 of B is [4, 1]: 2·4 + 1·1 = 9.' }
      ]
    },
    'mm-5': {
      title: 'Transpose and the linear model y = Xw',
      body: `
<p><b>Transposing</b> swaps rows and columns. Aᵀ[i][j] = A[j][i]. A (2 × 3) matrix becomes (3 × 2).</p>
<pre><code>A = [[1, 2, 3],
     [4, 5, 6]]
At = [list(col) for col in zip(*A)]
# [[1, 4], [2, 5], [3, 6]]</code></pre>
<p><code>zip(*A)</code> is a Python trick: it "unpacks" the rows and gives back each column as one tuple.</p>
<h3>The linear model</h3>
<p>Let's predict a flat's price as a weighted sum of its features:</p>
<pre><code>price = w₀·1 + w₁·area + w₂·rooms</code></pre>
<p>We make each flat a row and collect them into a matrix X. The first column is always 1: it is there for the intercept w₀. Then all predictions come out of one operation: <b>ŷ = X · w</b>.</p>
<h3>Step-by-step example</h3>
<p>w = [5, 0.4, 2] (million ₸): a base of 5, 0.4 for each m², and 2 for each room.</p>
<table>
<tr><th>1</th><th>Area</th><th>Rooms</th><th>Prediction</th></tr>
<tr><td>1</td><td>50</td><td>2</td><td>5 + 20 + 4 = 29</td></tr>
<tr><td>1</td><td>70</td><td>3</td><td>5 + 28 + 6 = 39</td></tr>
<tr><td>1</td><td>40</td><td>1</td><td>5 + 16 + 2 = 23</td></tr>
</table>
<ol>
<li>X = [[1, 50, 2], [1, 70, 3], [1, 40, 1]], shape 3 × 3.</li>
<li>The length of w is 3, equal to the number of columns of X.</li>
<li>ŷ = matvec(X, w) = [29, 39, 23].</li>
</ol>
<p>"Training" the model means finding the w that makes ŷ as close as possible to the real prices. We will do this with gradient descent in lessons 8–9. Xᵀ shows up in the gradient formula: it collects the error across all features in one operation.</p>
<div class="tip"><b>Common mistakes:</b> (1) Forgetting the column of 1s: the model then assumes the line always passes through zero. (2) Not checking the shape: if X is (n × d), w must have length d and ŷ has length n. (3) <code>zip(*A)</code> gives tuples; if you need lists, use <code>list(...)</code>.</div>`,
      ex: [
        { prompt: 'Write the function <code>transpose(A)</code>: it should return a list of lists (not tuples).', check: { tests: 'assert transpose([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]], "transpose([[1, 2, 3], [4, 5, 6]]) should be [[1, 4], [2, 5], [3, 6]] (lists, not tuples)"\nassert transpose([[7]]) == [[7]], "A 1 × 1 matrix does not change"\nassert transpose([[1, 2]]) == [[1], [2]], "A row vector becomes a column vector"' }, hints: ['<code>zip(*A)</code> gives the columns.', '<code>[list(col) for col in zip(*A)]</code>'] },
        { prompt: 'Write the function <code>predict(X, w)</code> (ŷ = X · w). Then put a 1 in front of each row of <code>features</code> (area, rooms), build the matrix <code>X</code>, and compute <code>preds = predict(X, w)</code>.', check: { tests: 'assert X == [[1, 50, 2], [1, 70, 3], [1, 40, 1], [1, 85, 3]], "Each row of X should start with 1: [[1, 50, 2], ...]"\nassert len(preds) == 4, "The length of preds should equal the number of flats (4)"\nfor _p, _e in zip(preds, [29, 39, 23, 45]):\n    assert abs(_p - _e) < 1e-9, f"Expected prediction {_e}, got {_p}"\nassert predict([[1, 2]], [3, 4]) == [11], "predict([[1, 2]], [3, 4]) = [11]"' }, hints: ['<code>predict</code> is exactly <code>matvec</code> from mm-4.', '<code>X = [[1] + row for row in features]</code>'] },
        { prompt: 'X has shape 200 × 5 (200 customers, 5 columns including the intercept column). What lengths must w and ŷ have for ŷ = X · w?', options: ['w: 200, ŷ: 5', 'w: 5, ŷ: 200', 'w: 5, ŷ: 5', 'w: 200, ŷ: 200'], explain: 'The length of w equals the number of columns of X (5), and ŷ has one prediction per row, so 200.' }
      ]
    },
    'mm-6': {
      title: 'Functions, slope and the derivative',
      body: `
<p>A <b>function</b> is a rule that maps an input to an output: f(x) = 2x + 1. The <b>slope</b> of a line tells how much y changes when x grows by one unit:</p>
<pre><code>slope = (y₂ − y₁) / (x₂ − x₁)</code></pre>
<p>For f(x) = 2x + 1 the slope is 2 between any two points. On a curve (for example, f(x) = x²) the slope is different at every point: near x = 1 it grows slowly, near x = 5 it grows fast.</p>
<h3>The derivative: the instant rate of change</h3>
<p>The <b>derivative</b> f′(x) is the slope exactly at the point itself. We find it by taking two points very close to each other. In ML we often don't know the formula, so we use a <b>numerical derivative</b>:</p>
<pre><code>def derivative(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)</code></pre>
<p>This is the <b>central difference</b>: we take points at the same distance on both sides of x and estimate symmetrically. It is far more accurate than the one-sided version (f(x + h) − f(x)) / h.</p>
<h3>Step-by-step example</h3>
<p>f(x) = x², x = 3, h = 0.01.</p>
<ol>
<li>f(3.01) = 9.0601.</li>
<li>f(2.99) = 8.9401.</li>
<li>Difference: 0.12. Denominator: 2 · 0.01 = 0.02.</li>
<li>0.12 / 0.02 = 6. By the formula, (x²)′ = 2x = 6. An exact match!</li>
</ol>
<p>The meaning: at x = 3, if we increase x a little, f grows about 6 times as fast. If the derivative is positive, the function is rising; if negative, falling; if zero, it may be a peak or a valley (a minimum). Gradient descent uses exactly this information: "which way should I go so the error gets smaller?"</p>
<table>
<tr><th>f(x)</th><th>f′(x)</th></tr>
<tr><td>c (constant)</td><td>0</td></tr>
<tr><td>a·x + b</td><td>a</td></tr>
<tr><td>x²</td><td>2x</td></tr>
<tr><td>xⁿ</td><td>n·xⁿ⁻¹</td></tr>
</table>
<div class="tip"><b>Common mistakes:</b> (1) Dividing by h instead of 2h: the result comes out twice as large. (2) Taking h too small (1e-15): the computer's rounding error takes over. Something around 1e-5 usually works well. (3) Forgetting brackets: <code>f(x + h) - f(x - h) / 2 * h</code> computes something completely different.</div>`,
      ex: [
        { prompt: 'Write the function <code>slope(p1, p2)</code>: it should return the slope of the line through two points <code>(x, y)</code>.', check: { tests: 'assert abs(slope((0, 1), (2, 5)) - 2) < 1e-9, "slope((0, 1), (2, 5)) should be 2"\nassert abs(slope((1, 10), (3, 4)) + 3) < 1e-9, "A falling line has a negative slope: slope((1, 10), (3, 4)) = -3"\nassert abs(slope((2, 7), (5, 7))) < 1e-9, "A horizontal line has slope 0"' }, hints: ['<code>(y2 - y1) / (x2 - x1)</code>'] },
        { prompt: 'Write the function <code>derivative(f, x, h=1e-5)</code> using the central difference formula. Then store in <code>d</code> the derivative of <code>f(x) = x**3 - 2*x</code> at x = 2.', check: { tests: 'assert abs(derivative(lambda x: x ** 2, 3) - 6) < 1e-4, "(x²)′ at x = 3 should be 6. Did you divide by 2h?"\nassert abs(derivative(lambda x: 5 * x + 1, 10) - 5) < 1e-4, "The derivative of a line is its slope: 5"\nassert abs(d - 10) < 1e-4, "For f(x) = x³ − 2x, f′(2) = 3·4 − 2 = 10"' }, hints: ['<code>(f(x + h) - f(x - h)) / (2 * h)</code>: watch the brackets.', '<code>d = derivative(f, 2)</code>'] },
        { prompt: 'f(x) = x². Compute the numerical derivative at x = 4 with h = 0.1: (f(4.1) − f(3.9)) / 0.2 = ?', explain: 'f(4.1) = 16.81, f(3.9) = 15.21. The difference is 1.6, and 1.6 / 0.2 = 8. Formula: 2x = 8. For a parabola the central difference is exact.' }
      ]
    },
    'mm-7': {
      title: 'Partial derivatives and the gradient',
      body: `
<p>ML models have not one parameter but many: w₀, w₁, w₂, … The error (loss) is a function that depends on all of them. For example, f(a, b) = a² + 3b.</p>
<h3>Partial derivative</h3>
<p>The <b>partial derivative</b> ∂f/∂a is the derivative when only a changes and all the others are held constant.</p>
<ul>
<li>∂f/∂a: b is constant, so 3b disappears: ∂f/∂a = 2a.</li>
<li>∂f/∂b: a² is constant: ∂f/∂b = 3.</li>
</ul>
<h3>Gradient</h3>
<p>The <b>gradient</b> ∇f is the vector of all partial derivatives: ∇f = [∂f/∂a, ∂f/∂b]. Its key property: the gradient points in the direction where the function <b>grows fastest</b>. So −∇f is the direction where it <b>falls fastest</b>. Gradient descent builds on this.</p>
<h3>Numerical gradient</h3>
<p>Shift each parameter by h in turn, leaving the others in place:</p>
<pre><code>def gradient(f, p, h=1e-5):
    g = []
    for i in range(len(p)):
        up = p[:]          # a copy!
        down = p[:]
        up[i] += h
        down[i] -= h
        g.append((f(up) - f(down)) / (2 * h))
    return g</code></pre>
<p>Here f takes a single list: f([a, b]).</p>
<h3>Step-by-step example</h3>
<p>f(a, b) = a² + 3b, at the point (2, 5).</p>
<ol>
<li>∂f/∂a = 2a = 2 · 2 = 4.</li>
<li>∂f/∂b = 3.</li>
<li>∇f(2, 5) = [4, 3].</li>
<li>Check: if we increase a by 0.01, f grows by about 4 · 0.01 = 0.04; if we increase b by 0.01, by 0.03.</li>
</ol>
<p>So to decrease f, we should move a and b a little in the direction [−4, −3]. In the next lesson we put the model's error in place of f: the parameters are w and b, and the function is a number that shows how badly they predict. A neural network may have millions of parameters, but the idea is the same: a vector that, for each parameter, answers "if I change it a little, how much does the error change?"</p>
<div class="tip"><b>Common mistakes:</b> (1) Writing <code>up = p</code>: that is not a copy but a reference to the same list. <code>up[i] += h</code> then breaks the original p too. Use <code>p[:]</code> or <code>list(p)</code>. (2) Shifting one parameter and not putting it back before moving to the next. Taking a fresh copy for each i solves this.</div>`,
      ex: [
        { prompt: 'Write the function <code>gradient(f, p, h=1e-5)</code>: <code>f</code> takes a list, and the result is a list of numerical partial derivatives for each parameter. The original <code>p</code> must not change.', check: { tests: '_f = lambda p: p[0] ** 2 + 3 * p[1]\n_p = [2.0, 5.0]\n_g = gradient(_f, _p)\nassert isinstance(_g, list) and len(_g) == 2, "Return a list of length 2"\nassert abs(_g[0] - 4) < 1e-4 and abs(_g[1] - 3) < 1e-4, "For f(a, b) = a² + 3b at the point (2, 5) the gradient is [4, 3]"\nassert _p == [2.0, 5.0], "The original p was changed: make a copy with p[:]"\n_g2 = gradient(lambda p: p[0] * p[1] + p[2] ** 2, [1.0, 2.0, 3.0])\nassert all(abs(_a - _b) < 1e-4 for _a, _b in zip(_g2, [2, 1, 6])), "For f = a·b + c² at the point (1, 2, 3) the gradient is [2, 1, 6]"' }, hints: ['For each <code>i</code>: <code>up = p[:]</code>, <code>down = p[:]</code>.', '<code>(f(up) - f(down)) / (2 * h)</code>'] },
        { prompt: 'f(a, b) = a² · b. What is ∂f/∂a at the point (a, b) = (3, 2)?', explain: 'Treat b as constant and differentiate with respect to a: ∂f/∂a = 2a · b = 2 · 3 · 2 = 12.' },
        { prompt: 'The gradient of the loss function is [4, −2]. Which way should you move the parameters to reduce the loss fastest?', options: ['[4, −2]', '[−4, 2]', '[0, 0]', '[2, 4]'], explain: 'The gradient is the direction of fastest growth. To reduce, go the opposite way, that is, in the direction −∇ = [−4, 2].' }
      ]
    },
    'mm-8': {
      title: 'The loss function: MSE',
      body: `
<p>To improve a model, you first need to measure with one number how <b>bad</b> it is. That number is the <b>loss</b> (error function). In regression the most common one is <b>MSE</b> (mean squared error):</p>
<pre><code>MSE = (1/n) · Σ (ŷᵢ − yᵢ)²</code></pre>
<p>For a line with one feature, ŷ = w · x + b. Then MSE depends only on w and b: the data are fixed, and we only change the parameters.</p>
<pre><code>def mse(w, b, xs, ys):
    n = len(xs)
    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / n</code></pre>
<h3>Step-by-step example</h3>
<p>Data: x = [1, 2, 3], y = [3, 5, 7]. Model: w = 1, b = 2.</p>
<table>
<tr><th>x</th><th>y</th><th>ŷ = x + 2</th><th>ŷ − y</th><th>(ŷ − y)²</th></tr>
<tr><td>1</td><td>3</td><td>3</td><td>0</td><td>0</td></tr>
<tr><td>2</td><td>5</td><td>4</td><td>−1</td><td>1</td></tr>
<tr><td>3</td><td>7</td><td>5</td><td>−2</td><td>4</td></tr>
</table>
<p>MSE = (0 + 1 + 4) / 3 ≈ 1.67. But with w = 2, b = 1, ŷ = [3, 5, 7] and the error is 0. That is the best line.</p>
<h3>Why the square?</h3>
<ul>
<li>Positive and negative errors don't cancel each other out.</li>
<li>Large errors get a harsh "penalty": being off by 10 costs 100 times more than being off by 1.</li>
<li>The function is smooth (parabola-like) with an easy derivative: convenient for gradient descent.</li>
</ul>
<p>The root of MSE is <b>RMSE</b>: it has the same units as y, so it is easy to explain to the business: "on average the prediction is off by about 2 million ₸". The mean of absolute errors is <b>MAE</b>, which is more robust to outliers.</p>
<div class="tip"><b>Common mistakes:</b> (1) Forgetting to divide by n: that is SSE (the sum), which grows as you add data. (2) Adding plain differences without squaring: ± errors cancel and you may get a "perfect" 0. (3) Forgetting that MSE is in units of y² (million ₸²) and interpreting it directly.</div>`,
      ex: [
        { prompt: 'Write the function <code>mse(w, b, xs, ys)</code>: it should return the mean squared error of the line ŷ = w·x + b.', check: { tests: 'assert abs(mse(1, 2, [1, 2, 3], [3, 5, 7]) - 5 / 3) < 1e-9, "mse(1, 2, [1, 2, 3], [3, 5, 7]) should be 5/3 ≈ 1.667. Did you divide by n?"\nassert abs(mse(2, 1, [1, 2, 3], [3, 5, 7])) < 1e-9, "For the exact line (w=2, b=1) MSE = 0"\nassert abs(mse(0, 0, [1, 2], [1, -1]) - 1) < 1e-9, "Errors must be squared: mse(0, 0, [1, 2], [1, -1]) = 1"' }, hints: ['Sum of <code>(w * x + b - y) ** 2</code>, then <code>/ len(xs)</code>.'] },
        { prompt: 'Grid search: for each w in the list <code>ws</code> (with b = 0), compute MSE and store in <code>best_w</code> the w with the smallest MSE. Then print it.', check: { tests: 'assert best_w == 3.0, "best_w should be 3.0: y is roughly 3x"' }, hints: ['<code>min(ws, key=lambda w: ...)</code>'] },
        { prompt: 'y = [10, 20, 30], prediction ŷ = [12, 18, 33]. What is the MSE?', explain: 'Errors: 2, −2, 3. Squares: 4, 4, 9 = 17. 17 / 3 ≈ 5.67.' }
      ]
    },
    'mm-9': {
      title: 'Gradient descent from scratch',
      body: `
<p>Now we put it all together: to reduce MSE with respect to w and b, we take small steps against the gradient. This is <b>gradient descent</b>.</p>
<h3>Formulas</h3>
<p>MSE = (1/n) Σ (w·xᵢ + b − yᵢ)². If we write the error as eᵢ = w·xᵢ + b − yᵢ, the partial derivatives are:</p>
<pre><code>∂MSE/∂w = (2/n) · Σ eᵢ · xᵢ
∂MSE/∂b = (2/n) · Σ eᵢ</code></pre>
<p>The update rule (lr is the learning rate):</p>
<pre><code>w = w − lr · ∂MSE/∂w
b = b − lr · ∂MSE/∂b</code></pre>
<pre><code>def fit(xs, ys, lr=0.05, epochs=2000):
    w, b = 0.0, 0.0
    n = len(xs)
    for _ in range(epochs):
        errs = [w * x + b - y for x, y in zip(xs, ys)]
        dw = 2 / n * sum(e * x for e, x in zip(errs, xs))
        db = 2 / n * sum(errs)
        w -= lr * dw
        b -= lr * db
    return w, b</code></pre>
<h3>Step-by-step example: the first step</h3>
<p>x = [1, 2, 3], y = [3, 5, 7], start w = 0, b = 0, lr = 0.1.</p>
<ol>
<li>Prediction ŷ = [0, 0, 0], errors e = [−3, −5, −7].</li>
<li>dw = (2/3)·(−3·1 − 5·2 − 7·3) = (2/3)·(−34) ≈ −22.67.</li>
<li>db = (2/3)·(−15) = −10.</li>
<li>w = 0 − 0.1·(−22.67) ≈ 2.27; b = 0 − 0.1·(−10) = 1.</li>
</ol>
<p>The gradient is negative, so the parameters went up: the right direction, because the true answer is w = 2, b = 1. Repeat the step thousands of times and w and b get close to these values.</p>
<h3>The effect of the learning rate</h3>
<ul>
<li><b>Too small</b> (0.0001): the right direction, but very slow. On data x = [1..5], after 2000 steps b ≈ 0.6, while it should be 1.</li>
<li><b>Suitable</b> (0.01–0.05): the loss goes down steadily.</li>
<li><b>Too large</b>: it "jumps" over the minimum, the loss grows, and the numbers run off to infinity (divergence). On data x = [1..5], lr = 0.1 is already "large" enough for that.</li>
</ul>
<div class="tip"><b>Common mistakes:</b> (1) Getting the sign wrong: <code>w += lr * dw</code> increases the loss. (2) Updating w and then computing b's gradient with the new w: take both gradients from the same list of errors. (3) If features have different scales (area 50–120), choosing lr is hard, so standardise them first. (4) Not watching the loss: print MSE every 100 steps.</div>`,
      ex: [
        { prompt: 'Write the function <code>step(w, b, xs, ys, lr)</code>: it should take <b>one</b> gradient descent step and return the new <code>(w, b)</code>.', check: { tests: '_w, _b = step(0.0, 0.0, [1, 2, 3], [3, 5, 7], 0.1)\nassert abs(_w - 68 / 30) < 1e-9, "After the first step w should be ≈ 2.267: dw = (2/n)·Σ e·x"\nassert abs(_b - 1.0) < 1e-9, "After the first step b should be 1.0: db = (2/n)·Σ e"\n_w2, _b2 = step(2.0, 1.0, [1, 2, 3], [3, 5, 7], 0.1)\nassert abs(_w2 - 2) < 1e-9 and abs(_b2 - 1) < 1e-9, "At the minimum (w=2, b=1) the gradient is 0, so the parameters must not change"' }, hints: ['First <code>errs = [w * x + b - y ...]</code>.', 'The minus sign: <code>w - lr * dw</code>.'] },
        { prompt: 'Write the function <code>fit(xs, ys, lr, epochs)</code>: starting from w = 0, b = 0, it should take <code>epochs</code> gradient descent steps and return <code>(w, b)</code>. Then find <code>w, b</code> on the given data with <code>lr=0.05, epochs=2000</code>.', check: { tests: 'assert abs(w - 2) < 0.01 and abs(b - 1) < 0.01, f"Expected w ≈ 2, b ≈ 1, but got w={w:.3f}, b={b:.3f}. Check the sign and 2/n"\n_w1, _b1 = fit([0, 1, 2], [1, 1, 1], 0.1, 1000)\nassert abs(_w1) < 0.01 and abs(_b1 - 1) < 0.01, "For a constant y = 1 you should get w ≈ 0, b ≈ 1"\n_w0, _b0 = fit(xs, ys, 0.05, 1)\nassert abs(_w0 - 2.5) < 1e-9 and abs(_b0 - 0.7) < 1e-9, "After 1 step it should be w = 2.5, b = 0.7: start from w = 0, b = 0"' }, hints: ['Inside the loop, the <code>step</code> logic from the first mm-9 exercise.', '<code>w, b = fit(xs, ys, 0.05, 2000)</code>'] },
        { prompt: 'During gradient descent the loss grew at every step and became <code>inf</code> after 50 steps. What is the most likely cause?', options: ['The learning rate is too small', 'The learning rate is too large', 'Too few epochs', 'Too little data'], explain: 'A step that is too large overshoots the minimum and moves further away each time (divergence). Try making lr 10 times smaller.' }
      ]
    },
    'mm-10': {
      title: 'NumPy: the vectorised version',
      body: `
<p>We have understood everything with lists and loops. But in real work, with 1 000 000 rows, a Python loop is slow. With <b>NumPy</b> arrays, operations run on the whole array at once, in C. This is <b>vectorization</b>.</p>
<table>
<tr><th>Lists (by hand)</th><th>NumPy</th></tr>
<tr><td><code>[a + b for a, b in zip(u, v)]</code></td><td><code>u + v</code></td></tr>
<tr><td><code>[c * a for a in v]</code></td><td><code>c * v</code></td></tr>
<tr><td><code>sum(a * b for ...)</code></td><td><code>u @ v</code> or <code>np.dot(u, v)</code></td></tr>
<tr><td><code>sum(a * a ...) ** 0.5</code></td><td><code>np.linalg.norm(v)</code></td></tr>
<tr><td><code>matvec(A, x)</code></td><td><code>A @ x</code></td></tr>
<tr><td><code>matmul(A, B)</code></td><td><code>A @ B</code></td></tr>
<tr><td><code>transpose(A)</code></td><td><code>A.T</code></td></tr>
</table>
<pre><code>import numpy as np
u = np.array([1, 2, 3])
v = np.array([4, 5, 6])
u + v          # array([5, 7, 9])  — now this is not joining!
u @ v          # 32
X = np.array([[1, 50, 2], [1, 70, 3]])
X.shape        # (2, 3)</code></pre>
<h3>Step-by-step example: vectorised gradient descent</h3>
<p>The inner part of the mm-9 loop is three lines in NumPy:</p>
<pre><code>x = np.array([1, 2, 3, 4, 5], dtype=float)
y = np.array([3, 5, 7, 9, 11], dtype=float)
w, b, lr = 0.0, 0.0, 0.05
for _ in range(2000):
    e = w * x + b - y              # all errors at once
    w -= lr * 2 * (e @ x) / len(x)  # Σ e·x = e @ x
    b -= lr * 2 * e.mean()
print(round(w, 3), round(b, 3))    # 2.0 1.0</code></pre>
<ol>
<li><code>w * x + b</code>: for every element at once (broadcasting: the scalar b is added to each element).</li>
<li><code>e @ x</code>: the dot product, Σ eᵢ·xᵢ.</li>
<li><code>e.mean()</code>: Σ eᵢ / n.</li>
</ol>
<p>In a model with many features the gradient fits in one formula: <code>grad = 2 / n * X.T @ (X @ w - y)</code>. This is where the transpose from mm-5 is needed.</p>
<div class="tip"><b>Common mistakes:</b> (1) Mixing up <code>*</code> and <code>@</code>: <code>A * B</code> multiplies element by element, <code>A @ B</code> is matrix multiplication. (2) Not checking the shape: when in doubt, print <code>.shape</code>. (3) Writing floats into an integer array: set <code>dtype=float</code>.</div>`,
      ex: [
        { prompt: 'Write the function <code>cosine(u, v)</code> with NumPy (<code>@</code> and <code>np.linalg.norm</code>). Then compute the predictions from the matrix <code>X</code> and <code>w</code>: <code>preds = X @ w</code>.', check: { tests: 'import numpy as _np\nassert abs(float(cosine(_np.array([1.0, 2.0]), _np.array([2.0, 4.0]))) - 1) < 1e-9, "Vectors with the same direction have cosine = 1"\nassert abs(float(cosine(_np.array([1.0, 0.0]), _np.array([0.0, 3.0])))) < 1e-9, "Perpendicular vectors have cosine = 0"\nassert _np.allclose(preds, [29, 39, 23]), "preds should be [29, 39, 23]: X @ w"' }, hints: ['<code>(u @ v) / (np.linalg.norm(u) * np.linalg.norm(v))</code>', '<code>preds = X @ w</code>'] },
        { prompt: 'Vectorised gradient descent: on the arrays <code>x</code>, <code>y</code>, start from w = 0, b = 0, take 2000 steps with <code>lr = 0.05</code>, and store the result in <code>w</code>, <code>b</code>. Inside the loop use only NumPy operations (no inner <code>for x in ...</code>).', check: { tests: 'assert abs(float(w) - 3) < 0.01, f"w should be ≈ 3, got {float(w):.3f}"\nassert abs(float(b) - 1) < 0.01, f"b should be ≈ 1, got {float(b):.3f}"' }, hints: ['<code>e = w * x + b - y</code>', '<code>w -= lr * 2 * (e @ x) / len(x)</code>; <code>b -= lr * 2 * e.mean()</code>'] },
        { prompt: 'A and B are both 3 × 3 NumPy arrays. Which one gives matrix multiplication as in maths?', options: ['A * B', 'A @ B', 'A + B', 'A.T * B'], explain: 'A @ B is matrix multiplication (row · column). A * B multiplies each element separately.' }
      ]
    },
    'mm-gate': {
      title: 'Module exam: Math for ML',
      body: `
<p>The final check. The Python tasks use only the standard library and lists (no NumPy).</p>`,
      ex: [
        { prompt: 'Write the function <code>knn_predict(points, labels, q, k)</code>: it should return the mean of the <code>labels</code> of the <code>k</code> points closest to <code>q</code> by Euclidean distance.', check: { tests: '_pts = [[0, 0], [1, 0], [5, 5], [6, 5], [10, 10]]\n_lab = [10, 20, 50, 70, 100]\nassert abs(knn_predict(_pts, _lab, [0.2, 0], 1) - 10) < 1e-9, "k=1: the closest is [0, 0], result 10"\nassert abs(knn_predict(_pts, _lab, [0.4, 0], 2) - 15) < 1e-9, "k=2: [0, 0] and [1, 0], mean 15"\nassert abs(knn_predict(_pts, _lab, [5.4, 5], 2) - 60) < 1e-9, "k=2: [5, 5] and [6, 5], mean 60"\nassert abs(knn_predict(_pts, _lab, [9, 9], 3) - (50 + 70 + 100) / 3) < 1e-9, "k=3: [10, 10], [6, 5], [5, 5]"' }, hints: [] },
        { prompt: 'A two-feature model ŷ = X · w (X has an intercept column). Write the function <code>gd_matrix(X, y, lr, epochs)</code> with lists: w starts as zeros, and at each step ∂MSE/∂wⱼ = (2/n) Σᵢ eᵢ · X[i][j], where eᵢ = ŷᵢ − yᵢ. It should return the final list w.', check: { tests: '_X = [[1, 0, 1], [1, 1, 0], [1, 1, 1], [1, 2, 1], [1, 0, 2]]\n_y = [1 + 2 * r[1] + 3 * r[2] for r in _X]\n_w = gd_matrix(_X, _y, 0.05, 5000)\nassert isinstance(_w, list) and len(_w) == 3, "Return a list of length 3"\nfor _a, _e in zip(_w, [1, 2, 3]):\n    assert abs(_a - _e) < 0.01, f"Expected w ≈ [1, 2, 3], got {[round(v, 3) for v in _w]}"\n_w1 = gd_matrix([[1, 1], [1, 2]], [3, 5], 0.1, 1)\nassert abs(_w1[0] - 0.8) < 1e-9 and abs(_w1[1] - 1.3) < 1e-9, "After 1 step w should be [0.8, 1.3]"' }, hints: [] },
        { prompt: 'u = [1, 2, 2], v = [2, 0, 1]. What is the cosine similarity? (to 2 decimal places)', explain: 'dot = 2 + 0 + 2 = 4. ‖u‖ = 3, ‖v‖ = √5 ≈ 2.236. 4 / 6.708 ≈ 0.60.' },
        { prompt: 'f(w) = (w − 3)². If w = 5 and lr = 0.25, what is w after one gradient descent step?', options: ['4', '3', '6', '5.5'], explain: 'f′(w) = 2(w − 3) = 4. w = 5 − 0.25 · 4 = 4.' }
      ]
    }
  }
});
