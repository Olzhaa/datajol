// M4.3 Math for ML. Python exercises use only the standard library (math, lists); the last normal lesson (mm-10) may import numpy.
DJ.modules['m4-3'] = {
  intro: 'Машиналық оқытудың артында төрт идея тұр: вектор, матрица, туынды және gradient descent. Олардың бәрін алдымен қарапайым Python тізімдерімен қолмен жазасыз, соңында NumPy неге керек екенін көресіз.',
  lessons: [
    {
      id: 'mm-1', title: 'Вектор: сандар тізімі', minutes: 12,
      body: `
<p>ML-де әр объект (клиент, пәтер, фильм) <b>вектормен</b> сипатталады — ол жай ғана ретті сандар тізімі. Мысалы, пәтер: <code>[ауданы, бөлме саны, қабат]</code> = <code>[54, 2, 7]</code>. Тізімдегі әр сан — бір <b>белгі</b> (feature), ал тізімнің ұзындығы — вектордың <b>өлшемі</b> (dimension).</p>
<h3>Үш негізгі амал</h3>
<ul>
<li><b>Қосу</b>: бірдей ұзындықтағы екі векторды элемент бойынша қосамыз: <code>[1, 2] + [3, 4] = [4, 6]</code>.</li>
<li><b>Скалярға көбейту</b> (scale): әр элементті бір санға көбейтеміз: <code>3 · [1, 2] = [3, 6]</code>.</li>
<li><b>Ұзындық</b> (норма, norm): Пифагор теоремасы: <code>‖v‖ = √(v₁² + v₂² + …)</code>.</li>
</ul>
<pre><code>def add(u, v):
    return [a + b for a, b in zip(u, v)]

def scale(c, v):
    return [c * a for a in v]

def norm(v):
    return sum(a * a for a in v) ** 0.5</code></pre>
<p>Python-да <code>[1, 2] + [3, 4]</code> жазсаңыз, <code>[1, 2, 3, 4]</code> шығады — бұл тізімдерді жалғау, вектор қосу емес. Сондықтан элемент бойынша амалды <code>zip</code> арқылы өзіміз жазамыз.</p>
<h3>Қадамдап мысал</h3>
<p>v = [3, 4] векторының ұзындығы:</p>
<ol>
<li>Квадраттар: 3² = 9, 4² = 16.</li>
<li>Қосынды: 9 + 16 = 25.</li>
<li>Түбір: √25 = 5. Демек ‖v‖ = 5.</li>
</ol>
<p>Енді 2 · v = [6, 8], оның ұзындығы √(36 + 64) = 10. Векторды 2-ге көбейтсек, ұзындығы да 2 есе өседі. Ал <b>бірлік вектор</b> (unit vector) алу үшін векторды өз ұзындығына бөлеміз: [3, 4] / 5 = [0.6, 0.8], оның ұзындығы 1. Бұл «бағытты сақтап, масштабты алып тастау» деген сөз, келесі сабақта cosine similarity осыған сүйенеді.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>u + v</code> арқылы тізімдерді «қосу» — бұл жалғау. (2) <code>2 * [1, 2]</code> Python-да <code>[1, 2, 1, 2]</code> береді, вектор көбейту емес. (3) Ұзындығы әртүрлі векторларды қосу: <code>zip</code> қысқасына дейін ғана жүреді де, қатені үнсіз жасырады.</div>`,
      exercises: [
        { type: 'python', xp: 15, prompt: '<code>add(u, v)</code> (элемент бойынша қосу) және <code>scale(c, v)</code> (әр элементті <code>c</code>-ға көбейту) функцияларын жазыңыз. Екеуі де жаңа тізім қайтарсын.', starter: 'def add(u, v):\n    pass\n\ndef scale(c, v):\n    pass\n', solution: 'def add(u, v):\n    return [a + b for a, b in zip(u, v)]\n\ndef scale(c, v):\n    return [c * a for a in v]', check: { tests: 'assert add([1, 2, 3], [10, 20, 30]) == [11, 22, 33], "add([1, 2, 3], [10, 20, 30]) = [11, 22, 33] болуы керек (жалғау емес!)"\nassert add([0.5], [0.25]) == [0.75], "Бір элементті векторлар да жұмыс істеуі керек"\nassert scale(3, [1, -2, 0]) == [3, -6, 0], "scale(3, [1, -2, 0]) = [3, -6, 0] болуы керек"\nassert scale(0, [5, 7]) == [0, 0], "0-ге көбейткенде нөл вектор шығады"', mustInclude: ['def add', 'def scale'] }, hints: ['<code>zip(u, v)</code> екі тізімнен жұп-жұп алады.', '<code>[c * a for a in v]</code>'] },
        { type: 'python', xp: 15, prompt: '<code>norm(v)</code> функциясын жазыңыз: вектордың ұзындығын (√ квадраттар қосындысы) қайтарсын. Сосын <code>unit</code> айнымалысына <code>v = [6, 8]</code> векторының бірлік векторын (әр элемент / ұзындық) жазыңыз.', starter: 'v = [6, 8]\n\ndef norm(v):\n    pass\n', solution: 'v = [6, 8]\n\ndef norm(v):\n    return sum(a * a for a in v) ** 0.5\n\nunit = [a / norm(v) for a in v]', check: { tests: 'assert abs(norm([3, 4]) - 5) < 1e-9, "norm([3, 4]) = 5 болуы керек"\nassert abs(norm([1, 2, 2]) - 3) < 1e-9, "norm([1, 2, 2]) = 3 болуы керек"\nassert abs(norm([0, 0]) - 0) < 1e-9, "Нөл вектордың ұзындығы 0"\nassert len(unit) == 2 and abs(unit[0] - 0.6) < 1e-9 and abs(unit[1] - 0.8) < 1e-9, "unit = [0.6, 0.8] болуы керек"', mustInclude: ['def norm'] }, hints: ['<code>sum(a * a for a in v) ** 0.5</code> немесе <code>math.sqrt</code>.', 'Бірлік вектор: <code>[a / norm(v) for a in v]</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Python-да <code>[1, 2] + [3, 4]</code> нені береді?', options: ['[4, 6]', '[1, 2, 3, 4]', '10', 'Қате (TypeError)'], answer: 1, explain: 'Тізімдер үшін + жалғау амалы. Вектор қосу үшін zip арқылы элемент бойынша қосу керек.' }
      ]
    },
    {
      id: 'mm-2', title: 'Скаляр көбейтінді және cosine similarity', minutes: 14,
      body: `
<p><b>Скаляр көбейтінді</b> (dot product) — екі векторды бір санға айналдырады: сәйкес элементтерді көбейтіп, қосамыз.</p>
<pre><code>def dot(u, v):
    return sum(a * b for a, b in zip(u, v))

dot([1, 2, 3], [4, 5, 6])   # 1·4 + 2·5 + 3·6 = 32</code></pre>
<p>Dot product ML-дің ең жиі кездесетін амалы: сызықтық модельдің болжамы <code>w · x</code>, нейрон желісінің әр нейроны да dot product есептейді.</p>
<h3>Cosine similarity</h3>
<p>Dot product векторлардың ұзындығына тәуелді. Тек <b>бағытты</b> салыстыру үшін оны ұзындықтарға бөлеміз:</p>
<pre><code>cos(u, v) = dot(u, v) / (‖u‖ · ‖v‖)</code></pre>
<ul>
<li>1 — бағыттары бірдей (өте ұқсас);</li>
<li>0 — перпендикуляр (байланыс жоқ);</li>
<li>−1 — қарама-қарсы.</li>
</ul>
<h3>Қадамдап мысал: ұсыныс жүйесі</h3>
<p>Пайдаланушылар 3 фильм жанрына (комедия, драма, экшн) неше сағат жұмсағанын алайық:</p>
<table>
<tr><th>Пайдаланушы</th><th>Комедия</th><th>Драма</th><th>Экшн</th></tr>
<tr><td>Айгүл</td><td>4</td><td>0</td><td>2</td></tr>
<tr><td>Дәулет</td><td>8</td><td>1</td><td>4</td></tr>
<tr><td>Сәуле</td><td>0</td><td>5</td><td>1</td></tr>
</table>
<ol>
<li>dot(Айгүл, Дәулет) = 4·8 + 0·1 + 2·4 = 40.</li>
<li>‖Айгүл‖ = √(16 + 0 + 4) = √20 ≈ 4.47; ‖Дәулет‖ = √(64 + 1 + 16) = 9.</li>
<li>cos = 40 / (4.47 · 9) ≈ 0.99 — талғамы өте ұқсас.</li>
<li>dot(Айгүл, Сәуле) = 0 + 0 + 2 = 2; cos = 2 / (4.47 · 5.10) ≈ 0.09 — ұқсас емес.</li>
</ol>
<p>Дәулет Айгүлден 2 есе көп көреді, бірақ cosine оны елемейді: тек «қандай жанрды жақсы көреді» деген бағыт маңызды. Сондықтан Дәулетке ұнаған жаңа комедияны Айгүлге ұсынуға болады.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Нөл векторда ұзындық 0, бөлу мүмкін емес — оны бөлек тексеріңіз. (2) Dot product пен cosine-ды шатастыру: үлкен dot product «ұқсас» дегенді емес, жай «үлкен сандар» дегенді білдіруі мүмкін.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>dot(u, v)</code> және <code>cosine(u, v)</code> функцияларын жазыңыз. <code>cosine</code> ішінде <code>dot</code>-ты қолданыңыз.', starter: 'def dot(u, v):\n    pass\n\ndef cosine(u, v):\n    pass\n', solution: 'def dot(u, v):\n    return sum(a * b for a, b in zip(u, v))\n\ndef cosine(u, v):\n    return dot(u, v) / (dot(u, u) ** 0.5 * dot(v, v) ** 0.5)', check: { tests: 'assert dot([1, 2, 3], [4, 5, 6]) == 32, "dot([1, 2, 3], [4, 5, 6]) = 32 болуы керек"\nassert dot([1, 0], [0, 1]) == 0, "Перпендикуляр векторлардың dot product-ы 0"\nassert abs(cosine([1, 2], [2, 4]) - 1) < 1e-9, "Бағыты бірдей векторларда cosine = 1"\nassert abs(cosine([1, 0], [-1, 0]) + 1) < 1e-9, "Қарама-қарсы векторларда cosine = -1"\nassert abs(cosine([4, 0, 2], [0, 5, 1]) - 2 / (20 ** 0.5 * 26 ** 0.5)) < 1e-9, "cosine([4, 0, 2], [0, 5, 1]) ≈ 0.088 болуы керек"', mustInclude: ['def dot', 'def cosine'] }, hints: ['<code>sum(a * b for a, b in zip(u, v))</code>', 'Ұзындық: <code>dot(u, u) ** 0.5</code>'] },
        { type: 'python', xp: 20, prompt: '<code>users</code> сөздігінде әр пайдаланушының жанрлар векторы бар. <code>cosine</code> функциясын жазып, <code>"Aigul"</code>-ге ең ұқсас <b>басқа</b> пайдаланушының атын <code>best</code> айнымалысына жазыңыз. Сосын оны шығарыңыз.', starter: 'users = {\n    "Aigul": [4, 0, 2],\n    "Daulet": [8, 1, 4],\n    "Saule": [0, 5, 1],\n    "Nurlan": [1, 1, 5],\n}\n', solution: 'users = {\n    "Aigul": [4, 0, 2],\n    "Daulet": [8, 1, 4],\n    "Saule": [0, 5, 1],\n    "Nurlan": [1, 1, 5],\n}\n\ndef cosine(u, v):\n    d = sum(a * b for a, b in zip(u, v))\n    nu = sum(a * a for a in u) ** 0.5\n    nv = sum(b * b for b in v) ** 0.5\n    return d / (nu * nv)\n\nbest = max((name for name in users if name != "Aigul"), key=lambda n: cosine(users["Aigul"], users[n]))\nprint(best)', check: { tests: 'assert best == "Daulet", "Ең ұқсас пайдаланушы Daulet болуы керек (cosine ≈ 0.99). Aigul-дің өзін салыстырудан шығарыңыз"', stdout: true }, hints: ['Aigul-ді өзімен салыстырсаңыз, cosine = 1 болып, ол жеңеді. Оны алып тастаңыз.', '<code>max(names, key=lambda n: cosine(users["Aigul"], users[n]))</code>'] },
        { type: 'number', xp: 10, prompt: 'u = [2, −1, 3], v = [4, 0, −2]. dot(u, v) қанша?', answer: 2, tol: 0.001, explain: '2·4 + (−1)·0 + 3·(−2) = 8 + 0 − 6 = 2.' }
      ]
    },
    {
      id: 'mm-3', title: 'Қашықтық және ең жақын көрші', minutes: 13,
      body: `
<p>Екі объектінің қаншалықты «алыс» екенін өлшеу — kNN, кластерлеу және іздеу жүйелерінің негізі.</p>
<h3>Евклид қашықтығы (Euclidean)</h3>
<p>Түзу сызықпен өлшенген қашықтық, яғни айырма векторының ұзындығы:</p>
<pre><code>d(u, v) = √((u₁ − v₁)² + (u₂ − v₂)² + …)</code></pre>
<h3>Манхэттен қашықтығы (Manhattan)</h3>
<p>Қала кварталдары бойынша жүргендей: тек көлденең және тік. Абсолют айырмалардың қосындысы:</p>
<pre><code>d(u, v) = |u₁ − v₁| + |u₂ − v₂| + …</code></pre>
<pre><code>def euclidean(u, v):
    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5

def manhattan(u, v):
    return sum(abs(a - b) for a, b in zip(u, v))</code></pre>
<h3>Қадамдап мысал</h3>
<p>A = [1, 2], B = [4, 6].</p>
<ol>
<li>Айырмалар: 4 − 1 = 3, 6 − 2 = 4.</li>
<li>Евклид: √(3² + 4²) = √25 = 5.</li>
<li>Манхэттен: |3| + |4| = 7.</li>
</ol>
<p>Манхэттен әрқашан Евклидтен кем емес, себебі «бұрыштан айналып» жүреміз. Қайсысын таңдау есепке байланысты: Евклид — жалпы әдепкі таңдау, Манхэттен көп өлшемді және шеткі мәндері бар деректерде тұрақтырақ болады, себебі айырманы квадратқа шығармайды.</p>
<h3>Ең жақын көрші (nearest neighbour)</h3>
<p>Жаңа пәтердің бағасын білмейміз, бірақ белгілері бар. Ең қарапайым болжам: белгілері ең жақын пәтердің бағасын алу. Алгоритм: барлық нүктеге дейінгі қашықтықты есептеп, ең кішісін таңдаймыз.</p>
<pre><code>points = [[50, 2], [80, 3], [35, 1]]
new = [52, 2]
best = min(range(len(points)), key=lambda i: euclidean(points[i], new))
print(best)   # 0</code></pre>
<div class="tip"><b>Жиі қателер:</b> (1) Масштаб: ауданы (50–120 м²) мен бөлме саны (1–4) бір векторда болса, қашықтықты ауданы толық басып кетеді. Сондықтан алдымен белгілерді стандарттайды (z-score). (2) Квадраттан кейін түбір алуды ұмыту. (3) <code>min(points, key=...)</code> нүктенің өзін береді, ал индекс керек болса — <code>range(len(points))</code>.</div>`,
      exercises: [
        { type: 'python', xp: 15, prompt: '<code>euclidean(u, v)</code> және <code>manhattan(u, v)</code> функцияларын жазыңыз.', starter: 'def euclidean(u, v):\n    pass\n\ndef manhattan(u, v):\n    pass\n', solution: 'def euclidean(u, v):\n    return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n\ndef manhattan(u, v):\n    return sum(abs(a - b) for a, b in zip(u, v))', check: { tests: 'assert abs(euclidean([1, 2], [4, 6]) - 5) < 1e-9, "euclidean([1, 2], [4, 6]) = 5 болуы керек"\nassert abs(manhattan([1, 2], [4, 6]) - 7) < 1e-9, "manhattan([1, 2], [4, 6]) = 7 болуы керек"\nassert abs(manhattan([5, 1], [2, 4]) - 6) < 1e-9, "Абсолют мән алыңыз: manhattan([5, 1], [2, 4]) = 6"\nassert abs(euclidean([0, 0, 0], [1, 2, 2]) - 3) < 1e-9, "Үш өлшемде: euclidean = 3"', mustInclude: ['def euclidean', 'def manhattan'] }, hints: ['<code>(a - b) ** 2</code> квадраттарын қосып, <code>** 0.5</code>.', 'Манхэттенде <code>abs(a - b)</code>.'] },
        { type: 'python', xp: 20, prompt: '<code>nearest(points, q)</code> функциясын жазыңыз: <code>q</code>-ға Евклид бойынша ең жақын нүктенің <b>индексін</b> қайтарсын. Сосын <code>flats</code> ішінен <code>new_flat</code>-қа ең жақын пәтердің бағасын <code>pred</code>-ке жазыңыз.', starter: 'flats = [[45, 1], [62, 2], [75, 3], [58, 2], [90, 4]]\nprices = [21, 28, 34, 27, 41]   # млн ₸\nnew_flat = [60, 2]\n\ndef nearest(points, q):\n    pass\n', solution: 'flats = [[45, 1], [62, 2], [75, 3], [58, 2], [90, 4]]\nprices = [21, 28, 34, 27, 41]   # млн ₸\nnew_flat = [60, 2]\n\ndef nearest(points, q):\n    def dist(u, v):\n        return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n    return min(range(len(points)), key=lambda i: dist(points[i], q))\n\npred = prices[nearest(flats, new_flat)]', check: { tests: 'assert nearest([[0, 0], [5, 5], [1, 1]], [2, 2]) == 2, "nearest нүктенің индексін қайтаруы керек: [2, 2]-ге [1, 1] (индекс 2) жақын"\nassert nearest([[3, 3]], [0, 0]) == 0, "Жалғыз нүкте болса, индекс 0"\nassert nearest(flats, [61, 2]) == 1, "[61, 2]-ге ең жақыны [62, 2] (индекс 1)"\nassert pred in (27, 28), "pred = 28 немесе 27 болуы керек: [60, 2]-ден [62, 2] мен [58, 2] бірдей қашықтықта"', mustInclude: ['def nearest'] }, hints: ['<code>min(range(len(points)), key=...)</code> индекс қайтарады.', '<code>pred = prices[nearest(flats, new_flat)]</code>'] },
        { type: 'number', xp: 10, prompt: 'A = [1, 5, 2], B = [4, 1, 2]. Манхэттен қашықтығы қанша?', answer: 7, tol: 0.001, explain: '|1 − 4| + |5 − 1| + |2 − 2| = 3 + 4 + 0 = 7. (Евклид: √(9 + 16 + 0) = 5.)' }
      ]
    },
    {
      id: 'mm-4', title: 'Матрица және көбейту', minutes: 15,
      body: `
<p><b>Матрица</b> — сандар кестесі. Python-да оны тізімдер тізімі (list of lists) ретінде сақтаймыз: әр ішкі тізім — бір жол (row).</p>
<pre><code>A = [[1, 2, 3],
     [4, 5, 6]]      # пішіні (shape): 2 × 3 (2 жол, 3 баған)
A[1][2]              # 6: 2-жол, 3-баған (индекс 0-ден)</code></pre>
<p>ML-де деректер кестесі дәл осындай: әр жол — бір объект (пәтер), әр баған — бір белгі.</p>
<h3>Матрицаны векторға көбейту</h3>
<p>A (m × n) · x (ұзындығы n) = ұзындығы m вектор. Әр нәтиже — A-ның бір жолы мен x-тің dot product-ы.</p>
<pre><code>def matvec(A, x):
    return [sum(a * b for a, b in zip(row, x)) for row in A]</code></pre>
<h3>Қадамдап мысал</h3>
<p>A = [[1, 2], [3, 4]], x = [5, 6].</p>
<ol>
<li>1-жол: 1·5 + 2·6 = 17.</li>
<li>2-жол: 3·5 + 4·6 = 39.</li>
<li>Нәтиже: [17, 39].</li>
</ol>
<h3>Матрицаны матрицаға көбейту</h3>
<p>A (m × n) · B (n × p) = C (m × p). C[i][j] = A-ның i-жолы мен B-ның j-бағанының dot product-ы. Шарт: A-ның баған саны B-ның жол санына тең болуы керек.</p>
<pre><code>def matmul(A, B):
    n, p = len(B), len(B[0])
    return [[sum(A[i][k] * B[k][j] for k in range(n))
             for j in range(p)]
            for i in range(len(A))]

matmul([[1, 2], [3, 4]], [[5, 6], [7, 8]])
# [[1·5+2·7, 1·6+2·8], [3·5+4·7, 3·6+4·8]] = [[19, 22], [43, 50]]</code></pre>
<p>Матрица көбейтуі <b>коммутативті емес</b>: әдетте A · B ≠ B · A. Ал <b>бірлік матрица</b> I (диагоналында 1, қалғаны 0) сандардағы 1 сияқты: A · I = A.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Пішіндердің сәйкес келмеуі: (2 × 3) · (2 × 3) көбейтілмейді. Әрқашан ішкі өлшемдерді тексеріңіз. (2) <code>[[0] * n] * m</code> арқылы нөл матрица құру: барлық жол бір тізімге сілтейді, бірін өзгертсеңіз, бәрі өзгереді. Оның орнына <code>[[0] * n for _ in range(m)]</code>.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>matvec(A, x)</code> функциясын жазыңыз: матрицаны векторға көбейтсін (әр жол мен <code>x</code>-тің dot product-ы).', starter: 'def matvec(A, x):\n    pass\n', solution: 'def matvec(A, x):\n    return [sum(a * b for a, b in zip(row, x)) for row in A]', check: { tests: 'assert matvec([[1, 2], [3, 4]], [5, 6]) == [17, 39], "matvec([[1, 2], [3, 4]], [5, 6]) = [17, 39] болуы керек"\nassert matvec([[1, 0, 2], [0, 1, 1]], [3, 4, 5]) == [13, 9], "2 × 3 матрица · ұзындығы 3 вектор = ұзындығы 2 вектор: [13, 9]"\nassert matvec([[2, 0], [0, 2]], [7, -1]) == [14, -2], "Диагональ матрица әр элементті масштабтайды"', mustInclude: ['def matvec'] }, hints: ['Әр <code>row</code> үшін <code>sum(a * b for a, b in zip(row, x))</code>.'] },
        { type: 'python', xp: 25, prompt: '<code>matmul(A, B)</code> функциясын жазыңыз (тізімдер тізімі, NumPy-сыз). <code>A</code>-ның баған саны <code>B</code>-ның жол санына тең деп есептеңіз.', starter: 'def matmul(A, B):\n    pass\n', solution: 'def matmul(A, B):\n    n, p = len(B), len(B[0])\n    return [[sum(A[i][k] * B[k][j] for k in range(n)) for j in range(p)] for i in range(len(A))]', check: { tests: 'assert matmul([[1, 2], [3, 4]], [[5, 6], [7, 8]]) == [[19, 22], [43, 50]], "matmul([[1, 2], [3, 4]], [[5, 6], [7, 8]]) = [[19, 22], [43, 50]] болуы керек"\nassert matmul([[1, 2, 3]], [[1], [2], [3]]) == [[14]], "(1 × 3) · (3 × 1) = (1 × 1): [[14]]"\nassert matmul([[1], [2]], [[3, 4]]) == [[3, 4], [6, 8]], "(2 × 1) · (1 × 2) = (2 × 2): [[3, 4], [6, 8]]"\nassert matmul([[2, 3], [4, 5]], [[1, 0], [0, 1]]) == [[2, 3], [4, 5]], "Бірлік матрицаға көбейткенде матрица өзгермейді"', mustInclude: ['def matmul'] }, hints: ['Нәтиже пішіні: <code>len(A)</code> × <code>len(B[0])</code>.', 'C[i][j] = <code>sum(A[i][k] * B[k][j] for k in range(len(B)))</code>'] },
        { type: 'number', xp: 10, prompt: 'A = [[2, 1], [0, 3]], B = [[1, 4], [2, 1]]. C = A · B болса, C[0][1] (1-жол, 2-баған) қанша?', answer: 9, tol: 0.001, explain: 'A-ның 1-жолы [2, 1], B-ның 2-бағаны [4, 1]: 2·4 + 1·1 = 9.' }
      ]
    },
    {
      id: 'mm-5', title: 'Transpose және сызықтық модель y = Xw', minutes: 14,
      body: `
<p><b>Транспонирлеу</b> (transpose) — жолдар мен бағандарды ауыстыру. Aᵀ[i][j] = A[j][i]. (2 × 3) матрица (3 × 2)-ге айналады.</p>
<pre><code>A = [[1, 2, 3],
     [4, 5, 6]]
At = [list(col) for col in zip(*A)]
# [[1, 4], [2, 5], [3, 6]]</code></pre>
<p><code>zip(*A)</code> — Python трюгі: жолдарды «ашып», әр бағанды бір кортеж етіп береді.</p>
<h3>Сызықтық модель</h3>
<p>Пәтер бағасын белгілердің салмақты қосындысы ретінде болжайық:</p>
<pre><code>баға = w₀·1 + w₁·ауданы + w₂·бөлме</code></pre>
<p>Әр пәтерді жол етіп, X матрицасына жинаймыз. Бірінші баған әрқашан 1 — ол бос мүше (intercept) w₀ үшін. Сонда барлық болжам бір амалмен шығады: <b>ŷ = X · w</b>.</p>
<h3>Қадамдап мысал</h3>
<p>w = [5, 0.4, 2] (млн ₸): негізгі 5, әр м² үшін 0.4, әр бөлме үшін 2.</p>
<table>
<tr><th>1</th><th>Ауданы</th><th>Бөлме</th><th>Болжам</th></tr>
<tr><td>1</td><td>50</td><td>2</td><td>5 + 20 + 4 = 29</td></tr>
<tr><td>1</td><td>70</td><td>3</td><td>5 + 28 + 6 = 39</td></tr>
<tr><td>1</td><td>40</td><td>1</td><td>5 + 16 + 2 = 23</td></tr>
</table>
<ol>
<li>X = [[1, 50, 2], [1, 70, 3], [1, 40, 1]] — пішіні 3 × 3.</li>
<li>w ұзындығы 3 — X-тің баған санына тең.</li>
<li>ŷ = matvec(X, w) = [29, 39, 23].</li>
</ol>
<p>Модельді «оқыту» дегеніміз — ŷ нақты бағаларға ең жақын болатын w-ны табу. Мұны 8–9 сабақтарда gradient descent арқылы жасаймыз. Ал Xᵀ градиент формуласында пайда болады: барлық белгі бойынша қатені бір амалмен жинау үшін.</p>
<div class="tip"><b>Жиі қателер:</b> (1) 1-ден тұратын бағанды ұмыту: модель түзу әрқашан нөлден өтеді деп болжайды. (2) Пішінді тексермеу: X (n × d) болса, w ұзындығы d болуы керек, ал ŷ ұзындығы n. (3) <code>zip(*A)</code> кортеж береді; тізім керек болса, <code>list(...)</code>.</div>`,
      exercises: [
        { type: 'python', xp: 15, prompt: '<code>transpose(A)</code> функциясын жазыңыз: тізімдер тізімін қайтарсын (кортеж емес).', starter: 'def transpose(A):\n    pass\n', solution: 'def transpose(A):\n    return [list(col) for col in zip(*A)]', check: { tests: 'assert transpose([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]], "transpose([[1, 2, 3], [4, 5, 6]]) = [[1, 4], [2, 5], [3, 6]] болуы керек (тізімдер, кортеж емес)"\nassert transpose([[7]]) == [[7]], "1 × 1 матрица өзгермейді"\nassert transpose([[1, 2]]) == [[1], [2]], "Жол вектор баған векторға айналады"', mustInclude: ['def transpose'] }, hints: ['<code>zip(*A)</code> бағандарды береді.', '<code>[list(col) for col in zip(*A)]</code>'] },
        { type: 'python', xp: 20, prompt: '<code>predict(X, w)</code> функциясын жазыңыз (ŷ = X · w). Сосын <code>features</code> (ауданы, бөлме) тізіміне алдына 1 қосып, <code>X</code> матрицасын құрып, <code>preds = predict(X, w)</code> есептеңіз.', starter: 'features = [[50, 2], [70, 3], [40, 1], [85, 3]]\nw = [5, 0.4, 2]\n\ndef predict(X, w):\n    pass\n', solution: 'features = [[50, 2], [70, 3], [40, 1], [85, 3]]\nw = [5, 0.4, 2]\n\ndef predict(X, w):\n    return [sum(a * b for a, b in zip(row, w)) for row in X]\n\nX = [[1] + row for row in features]\npreds = predict(X, w)', check: { tests: 'assert X == [[1, 50, 2], [1, 70, 3], [1, 40, 1], [1, 85, 3]], "X әр жолының басында 1 болуы керек: [[1, 50, 2], ...]"\nassert len(preds) == 4, "preds ұзындығы пәтер санына (4) тең болуы керек"\nfor _p, _e in zip(preds, [29, 39, 23, 45]):\n    assert abs(_p - _e) < 1e-9, f"Болжам {_e} күтілді, {_p} шықты"\nassert predict([[1, 2]], [3, 4]) == [11], "predict([[1, 2]], [3, 4]) = [11]"', mustInclude: ['def predict'] }, hints: ['<code>predict</code> — mm-4-тегі <code>matvec</code>-тің дәл өзі.', '<code>X = [[1] + row for row in features]</code>'] },
        { type: 'quiz', xp: 10, prompt: 'X пішіні 200 × 5 (200 клиент, intercept бағанын қоса 5 баған). ŷ = X · w болу үшін w және ŷ ұзындықтары қандай?', options: ['w: 200, ŷ: 5', 'w: 5, ŷ: 200', 'w: 5, ŷ: 5', 'w: 200, ŷ: 200'], answer: 1, explain: 'w ұзындығы X-тің баған санына (5) тең, ал ŷ — әр жолға бір болжам, яғни 200.' }
      ]
    },
    {
      id: 'mm-6', title: 'Функция, көлбеулік және туынды', minutes: 15,
      body: `
<p><b>Функция</b> — кіріске шығыс сәйкестендіретін ереже: f(x) = 2x + 1. Түзудің <b>көлбеулігі</b> (slope) — x бір бірлікке өскенде y қаншаға өзгереді:</p>
<pre><code>slope = (y₂ − y₁) / (x₂ − x₁)</code></pre>
<p>f(x) = 2x + 1 үшін кез келген екі нүктеде slope = 2. Ал қисық сызықта (мысалы, f(x) = x²) көлбеулік әр нүктеде әртүрлі: x = 1 маңында баяу, x = 5 маңында тез өседі.</p>
<h3>Туынды — лездік өзгеру жылдамдығы</h3>
<p><b>Туынды</b> (derivative) f′(x) — нүктенің дәл өзіндегі көлбеулік. Оны екі нүктені бір-біріне өте жақын алып табамыз. ML-де формуланы жиі білмейміз, сондықтан <b>сандық туынды</b> (numerical derivative) қолданамыз:</p>
<pre><code>def derivative(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)</code></pre>
<p>Бұл <b>орталық айырма</b>: x-тің екі жағынан бірдей қашықтықта алып, симметриялы бағалаймыз. Бір жақты (f(x + h) − f(x)) / h нұсқасынан әлдеқайда дәл.</p>
<h3>Қадамдап мысал</h3>
<p>f(x) = x², x = 3, h = 0.01.</p>
<ol>
<li>f(3.01) = 9.0601.</li>
<li>f(2.99) = 8.9401.</li>
<li>Айырма: 0.12. Бөлгіш: 2 · 0.01 = 0.02.</li>
<li>0.12 / 0.02 = 6. Формула бойынша (x²)′ = 2x = 6. Дәл сәйкес!</li>
</ol>
<p>Мағынасы: x = 3 нүктесінде x-ті аздап өсірсек, f шамамен 6 есе тез өседі. Туынды оң болса — функция өсуде, теріс болса — кемуде, нөл болса — шың немесе шұңқыр (минимум) болуы мүмкін. Gradient descent дәл осы ақпаратты қолданады: «қай жаққа жүрсем, қате азаяды?»</p>
<table>
<tr><th>f(x)</th><th>f′(x)</th></tr>
<tr><td>c (тұрақты)</td><td>0</td></tr>
<tr><td>a·x + b</td><td>a</td></tr>
<tr><td>x²</td><td>2x</td></tr>
<tr><td>xⁿ</td><td>n·xⁿ⁻¹</td></tr>
</table>
<div class="tip"><b>Жиі қателер:</b> (1) 2h-ге емес, h-қа бөлу — нәтиже 2 есе үлкен шығады. (2) h-ты тым кіші алу (1e-15): компьютердің дөңгелектеу қатесі басым болады. 1e-5 шамасы әдетте жақсы. (3) Жақшаларды ұмыту: <code>f(x + h) - f(x - h) / 2 * h</code> мүлде басқа нәрсе есептейді.</div>`,
      exercises: [
        { type: 'python', xp: 15, prompt: '<code>slope(p1, p2)</code> функциясын жазыңыз: екі нүкте <code>(x, y)</code> арқылы өтетін түзудің көлбеулігін қайтарсын.', starter: 'def slope(p1, p2):\n    pass\n', solution: 'def slope(p1, p2):\n    (x1, y1), (x2, y2) = p1, p2\n    return (y2 - y1) / (x2 - x1)', check: { tests: 'assert abs(slope((0, 1), (2, 5)) - 2) < 1e-9, "slope((0, 1), (2, 5)) = 2 болуы керек"\nassert abs(slope((1, 10), (3, 4)) + 3) < 1e-9, "Кемитін түзуде көлбеулік теріс: slope((1, 10), (3, 4)) = -3"\nassert abs(slope((2, 7), (5, 7))) < 1e-9, "Көлденең түзудің көлбеулігі 0"', mustInclude: ['def slope'] }, hints: ['<code>(y2 - y1) / (x2 - x1)</code>'] },
        { type: 'python', xp: 20, prompt: 'Орталық айырма формуласымен <code>derivative(f, x, h=1e-5)</code> функциясын жазыңыз. Сосын <code>f(x) = x**3 - 2*x</code> функциясының x = 2 нүктесіндегі туындысын <code>d</code>-ға жазыңыз.', starter: 'def f(x):\n    return x ** 3 - 2 * x\n\ndef derivative(f, x, h=1e-5):\n    pass\n', solution: 'def f(x):\n    return x ** 3 - 2 * x\n\ndef derivative(f, x, h=1e-5):\n    return (f(x + h) - f(x - h)) / (2 * h)\n\nd = derivative(f, 2)', check: { tests: 'assert abs(derivative(lambda x: x ** 2, 3) - 6) < 1e-4, "(x²)′ x = 3-те 6 болуы керек. 2h-қа бөлдіңіз бе?"\nassert abs(derivative(lambda x: 5 * x + 1, 10) - 5) < 1e-4, "Түзудің туындысы оның көлбеулігі: 5"\nassert abs(d - 10) < 1e-4, "f(x) = x³ − 2x үшін f′(2) = 3·4 − 2 = 10"', mustInclude: ['def derivative'] }, hints: ['<code>(f(x + h) - f(x - h)) / (2 * h)</code> — жақшаларға назар аударыңыз.', '<code>d = derivative(f, 2)</code>'] },
        { type: 'number', xp: 10, prompt: 'f(x) = x². Сандық туындыны h = 0.1 арқылы x = 4 нүктесінде есептеңіз: (f(4.1) − f(3.9)) / 0.2 = ?', answer: 8, tol: 0.001, explain: 'f(4.1) = 16.81, f(3.9) = 15.21. Айырма 1.6, 1.6 / 0.2 = 8. Формула: 2x = 8. Орталық айырма парабола үшін дәл шығады.' }
      ]
    },
    {
      id: 'mm-7', title: 'Дербес туынды және градиент', minutes: 14,
      body: `
<p>ML модельдерінде параметр біреу емес, көп: w₀, w₁, w₂, … Қате (loss) олардың бәріне тәуелді функция. Мысалы, f(a, b) = a² + 3b.</p>
<h3>Дербес туынды</h3>
<p><b>Дербес туынды</b> (partial derivative) ∂f/∂a — тек a-ны өзгертіп, қалғандарын тұрақты ұстағандағы туынды.</p>
<ul>
<li>∂f/∂a: b тұрақты, сондықтан 3b жоғалады: ∂f/∂a = 2a.</li>
<li>∂f/∂b: a² тұрақты: ∂f/∂b = 3.</li>
</ul>
<h3>Градиент</h3>
<p><b>Градиент</b> (gradient) ∇f — барлық дербес туындылардан құралған вектор: ∇f = [∂f/∂a, ∂f/∂b]. Оның маңызды қасиеті: градиент функция <b>ең тез өсетін</b> бағытты көрсетеді. Демек −∇f ең тез <b>кемитін</b> бағыт. Gradient descent осыған сүйенеді.</p>
<h3>Сандық градиент</h3>
<p>Әр параметрді кезекпен h-қа жылжытып, қалғандарын орнында қалдырамыз:</p>
<pre><code>def gradient(f, p, h=1e-5):
    g = []
    for i in range(len(p)):
        up = p[:]          # көшірме!
        down = p[:]
        up[i] += h
        down[i] -= h
        g.append((f(up) - f(down)) / (2 * h))
    return g</code></pre>
<p>Мұнда f бір тізім қабылдайды: f([a, b]).</p>
<h3>Қадамдап мысал</h3>
<p>f(a, b) = a² + 3b, нүкте (2, 5).</p>
<ol>
<li>∂f/∂a = 2a = 2 · 2 = 4.</li>
<li>∂f/∂b = 3.</li>
<li>∇f(2, 5) = [4, 3].</li>
<li>Тексеру: a-ны 0.01-ге өсірсек, f шамамен 4 · 0.01 = 0.04-ке өседі; b-ны 0.01-ге өсірсек — 0.03-ке.</li>
</ol>
<p>Демек f-ті азайту үшін a мен b-ны [−4, −3] бағытында сәл жылжыту керек. Келесі сабақта f орнына модельдің қатесін қоямыз: параметрлер — w мен b, ал функция — олардың қаншалықты нашар болжайтынын көрсететін сан. Нейрон желісінде параметр миллиондаған болуы мүмкін, бірақ идея бірдей: әр параметр үшін «оны аздап өзгертсем, қате қаншаға өзгереді?» деген сұраққа жауап беретін вектор.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>up = p</code> жазу — көшірме емес, сол тізімге сілтеме. <code>up[i] += h</code> бастапқы p-ны да бұзады. <code>p[:]</code> немесе <code>list(p)</code> қолданыңыз. (2) Бір параметрді жылжытқаннан кейін келесісіне өткенде оны қайтармау. Әр i үшін жаңа көшірме алу мұны шешеді.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>gradient(f, p, h=1e-5)</code> функциясын жазыңыз: <code>f</code> тізім қабылдайды, нәтиже — әр параметр бойынша сандық дербес туындылар тізімі. Бастапқы <code>p</code> өзгермеуі керек.', starter: 'def gradient(f, p, h=1e-5):\n    pass\n', solution: 'def gradient(f, p, h=1e-5):\n    g = []\n    for i in range(len(p)):\n        up = p[:]\n        down = p[:]\n        up[i] += h\n        down[i] -= h\n        g.append((f(up) - f(down)) / (2 * h))\n    return g', check: { tests: '_f = lambda p: p[0] ** 2 + 3 * p[1]\n_p = [2.0, 5.0]\n_g = gradient(_f, _p)\nassert isinstance(_g, list) and len(_g) == 2, "Ұзындығы 2 тізім қайтарыңыз"\nassert abs(_g[0] - 4) < 1e-4 and abs(_g[1] - 3) < 1e-4, "f(a, b) = a² + 3b үшін (2, 5) нүктесінде градиент [4, 3]"\nassert _p == [2.0, 5.0], "Бастапқы p өзгеріп кетті: p[:] арқылы көшірме алыңыз"\n_g2 = gradient(lambda p: p[0] * p[1] + p[2] ** 2, [1.0, 2.0, 3.0])\nassert all(abs(_a - _b) < 1e-4 for _a, _b in zip(_g2, [2, 1, 6])), "f = a·b + c² үшін (1, 2, 3) нүктесінде градиент [2, 1, 6]"', mustInclude: ['def gradient'] }, hints: ['Әр <code>i</code> үшін <code>up = p[:]</code>, <code>down = p[:]</code>.', '<code>(f(up) - f(down)) / (2 * h)</code>'] },
        { type: 'number', xp: 10, prompt: 'f(a, b) = a² · b. (a, b) = (3, 2) нүктесінде ∂f/∂a қанша?', answer: 12, tol: 0.001, explain: 'b тұрақты деп, a бойынша дифференциалдаймыз: ∂f/∂a = 2a · b = 2 · 3 · 2 = 12.' },
        { type: 'quiz', xp: 10, prompt: 'Loss функциясының градиенті [4, −2]. Loss-ты ең тез азайту үшін параметрлерді қай бағытқа жылжыту керек?', options: ['[4, −2]', '[−4, 2]', '[0, 0]', '[2, 4]'], answer: 1, explain: 'Градиент ең тез өсу бағыты. Азайту үшін оған қарама-қарсы, яғни −∇ = [−4, 2] бағытында жүреміз.' }
      ]
    },
    {
      id: 'mm-8', title: 'Loss функциясы: MSE', minutes: 13,
      body: `
<p>Модельді жақсарту үшін алдымен оның қаншалықты <b>нашар</b> екенін бір санмен өлшеу керек. Бұл сан — <b>loss</b> (қате функциясы). Регрессияда ең жиісі <b>MSE</b> (mean squared error):</p>
<pre><code>MSE = (1/n) · Σ (ŷᵢ − yᵢ)²</code></pre>
<p>Бір белгілі түзу үшін ŷ = w · x + b. Сонда MSE тек w мен b-ға тәуелді: деректер тұрақты, біз тек параметрлерді өзгертеміз.</p>
<pre><code>def mse(w, b, xs, ys):
    n = len(xs)
    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / n</code></pre>
<h3>Қадамдап мысал</h3>
<p>Деректер: x = [1, 2, 3], y = [3, 5, 7]. Модель: w = 1, b = 2.</p>
<table>
<tr><th>x</th><th>y</th><th>ŷ = x + 2</th><th>ŷ − y</th><th>(ŷ − y)²</th></tr>
<tr><td>1</td><td>3</td><td>3</td><td>0</td><td>0</td></tr>
<tr><td>2</td><td>5</td><td>4</td><td>−1</td><td>1</td></tr>
<tr><td>3</td><td>7</td><td>5</td><td>−2</td><td>4</td></tr>
</table>
<p>MSE = (0 + 1 + 4) / 3 ≈ 1.67. Ал w = 2, b = 1 болса, ŷ = [3, 5, 7] — қате 0. Бұл ең жақсы түзу.</p>
<h3>Неге квадрат?</h3>
<ul>
<li>Оң және теріс қателер бірін-бірі жоймайды.</li>
<li>Үлкен қатеге қатаң «айып» салады: 10-ға қателесу 1-ге қателесуден 100 есе қымбат.</li>
<li>Функция тегіс (параболаға ұқсас), туындысы оңай: gradient descent үшін ыңғайлы.</li>
</ul>
<p>MSE-дің түбірі <b>RMSE</b> — бірлігі y-пен бірдей, сондықтан бизнеске түсіндіру оңай: «болжам орта есеппен ~2 млн ₸ қателеседі». Абсолют қателердің орташасы <b>MAE</b> — шеткі мәндерге төзімдірек.</p>
<div class="tip"><b>Жиі қателер:</b> (1) n-ге бөлуді ұмыту — бұл SSE (қосынды), деректер көбейген сайын өседі. (2) Квадрат алмай, жай айырманы қосу: ±қателер жойылып, «керемет» 0 шығуы мүмкін. (3) MSE бірлігі y²-та (млн ₸²) екенін ұмытып, оны тікелей түсіндіру.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: '<code>mse(w, b, xs, ys)</code> функциясын жазыңыз: ŷ = w·x + b түзуінің орташа квадраттық қатесін қайтарсын.', starter: 'def mse(w, b, xs, ys):\n    pass\n', solution: 'def mse(w, b, xs, ys):\n    n = len(xs)\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / n', check: { tests: 'assert abs(mse(1, 2, [1, 2, 3], [3, 5, 7]) - 5 / 3) < 1e-9, "mse(1, 2, [1, 2, 3], [3, 5, 7]) = 5/3 ≈ 1.667 болуы керек. n-ге бөлдіңіз бе?"\nassert abs(mse(2, 1, [1, 2, 3], [3, 5, 7])) < 1e-9, "Дәл түзу (w=2, b=1) үшін MSE = 0"\nassert abs(mse(0, 0, [1, 2], [1, -1]) - 1) < 1e-9, "Қателер квадратқа шығуы керек: mse(0, 0, [1, 2], [1, -1]) = 1"', mustInclude: ['def mse'] }, hints: ['<code>(w * x + b - y) ** 2</code> қосындысы, сосын <code>/ len(xs)</code>.'] },
        { type: 'python', xp: 20, prompt: 'Grid search: <code>ws</code> тізіміндегі әр w үшін (b = 0) MSE есептеп, ең кіші MSE беретін w-ны <code>best_w</code>-ға жазыңыз. Сосын оны шығарыңыз.', starter: 'xs = [1, 2, 3, 4]\nys = [2.9, 6.1, 9.2, 11.8]\nws = [2.0, 2.5, 3.0, 3.5, 4.0]\n', solution: 'xs = [1, 2, 3, 4]\nys = [2.9, 6.1, 9.2, 11.8]\nws = [2.0, 2.5, 3.0, 3.5, 4.0]\n\ndef mse(w, b, xs, ys):\n    return sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / len(xs)\n\nbest_w = min(ws, key=lambda w: mse(w, 0, xs, ys))\nprint(best_w)', check: { tests: 'assert best_w == 3.0, "best_w = 3.0 болуы керек: y шамамен 3x"', stdout: true }, hints: ['<code>min(ws, key=lambda w: ...)</code>'] },
        { type: 'number', xp: 10, prompt: 'y = [10, 20, 30], болжам ŷ = [12, 18, 33]. MSE қанша?', answer: 17 / 3, tol: 0.01, explain: 'Қателер: 2, −2, 3. Квадраттар: 4, 4, 9 = 17. 17 / 3 ≈ 5.67.' }
      ]
    },
    {
      id: 'mm-9', title: 'Gradient descent нөлден', minutes: 18,
      body: `
<p>Енді бәрін біріктіреміз: MSE-ді w және b бойынша азайту үшін градиентке қарама-қарсы кішкене қадамдар жасаймыз. Бұл — <b>gradient descent</b>.</p>
<h3>Формулалар</h3>
<p>MSE = (1/n) Σ (w·xᵢ + b − yᵢ)². Қатені eᵢ = w·xᵢ + b − yᵢ деп белгілесек, дербес туындылар:</p>
<pre><code>∂MSE/∂w = (2/n) · Σ eᵢ · xᵢ
∂MSE/∂b = (2/n) · Σ eᵢ</code></pre>
<p>Жаңарту ережесі (lr — learning rate, оқу жылдамдығы):</p>
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
<h3>Қадамдап мысал: бірінші қадам</h3>
<p>x = [1, 2, 3], y = [3, 5, 7], бастау w = 0, b = 0, lr = 0.1.</p>
<ol>
<li>Болжам ŷ = [0, 0, 0], қателер e = [−3, −5, −7].</li>
<li>dw = (2/3)·(−3·1 − 5·2 − 7·3) = (2/3)·(−34) ≈ −22.67.</li>
<li>db = (2/3)·(−15) = −10.</li>
<li>w = 0 − 0.1·(−22.67) ≈ 2.27; b = 0 − 0.1·(−10) = 1.</li>
</ol>
<p>Градиент теріс, сондықтан параметрлер өсті — дұрыс бағыт, себебі шын жауап w = 2, b = 1. Қадамды мыңдаған рет қайталасақ, w мен b осы мәндерге жақындайды.</p>
<h3>Learning rate әсері</h3>
<ul>
<li><b>Тым кіші</b> (0.0001): дұрыс бағытта, бірақ өте баяу. x = [1..5] деректерінде 2000 қадамнан кейін b ≈ 0.6, ал керегі 1.</li>
<li><b>Қолайлы</b> (0.01–0.05): loss тұрақты кемиді.</li>
<li><b>Тым үлкен</b>: минимумнан «секіріп» өтіп кетеді, loss өседі, сандар шексіздікке кетеді (divergence). x = [1..5] деректерінде lr = 0.1 жеткілікті «үлкен».</li>
</ul>
<div class="tip"><b>Жиі қателер:</b> (1) Таңбаны шатастыру: <code>w += lr * dw</code> — loss-ты өсіреді. (2) w-ны жаңартып, b-ның градиентін жаңа w-мен есептеу: екі градиентті де бір қателер тізімінен алыңыз. (3) Белгілер масштабы әртүрлі болса (ауданы 50–120), lr-ды таңдау қиындайды — алдымен стандарттаңыз. (4) Loss-ты бақыламау: әр 100 қадам сайын MSE-ді басып шығарыңыз.</div>`,
      exercises: [
        { type: 'python', xp: 25, prompt: '<code>step(w, b, xs, ys, lr)</code> функциясын жазыңыз: gradient descent-тің <b>бір</b> қадамын жасап, жаңа <code>(w, b)</code> қайтарсын.', starter: 'def step(w, b, xs, ys, lr):\n    pass\n', solution: 'def step(w, b, xs, ys, lr):\n    n = len(xs)\n    errs = [w * x + b - y for x, y in zip(xs, ys)]\n    dw = 2 / n * sum(e * x for e, x in zip(errs, xs))\n    db = 2 / n * sum(errs)\n    return w - lr * dw, b - lr * db', check: { tests: '_w, _b = step(0.0, 0.0, [1, 2, 3], [3, 5, 7], 0.1)\nassert abs(_w - 68 / 30) < 1e-9, "Бірінші қадамнан кейін w ≈ 2.267 болуы керек: dw = (2/n)·Σ e·x"\nassert abs(_b - 1.0) < 1e-9, "Бірінші қадамнан кейін b = 1.0 болуы керек: db = (2/n)·Σ e"\n_w2, _b2 = step(2.0, 1.0, [1, 2, 3], [3, 5, 7], 0.1)\nassert abs(_w2 - 2) < 1e-9 and abs(_b2 - 1) < 1e-9, "Минимумда (w=2, b=1) градиент 0, параметрлер өзгермеуі керек"', mustInclude: ['def step'] }, hints: ['Алдымен <code>errs = [w * x + b - y ...]</code>.', 'Минус таңбасы: <code>w - lr * dw</code>.'] },
        { type: 'python', xp: 30, prompt: '<code>fit(xs, ys, lr, epochs)</code> функциясын жазыңыз: w = 0, b = 0-ден бастап, <code>epochs</code> рет gradient descent қадамын жасап, <code>(w, b)</code> қайтарсын. Сосын берілген деректерде <code>lr=0.05, epochs=2000</code> арқылы <code>w, b</code> табыңыз.', starter: 'xs = [1, 2, 3, 4, 5]\nys = [3, 5, 7, 9, 11]   # y = 2x + 1\n\ndef fit(xs, ys, lr, epochs):\n    pass\n', solution: 'xs = [1, 2, 3, 4, 5]\nys = [3, 5, 7, 9, 11]   # y = 2x + 1\n\ndef fit(xs, ys, lr, epochs):\n    w, b = 0.0, 0.0\n    n = len(xs)\n    for _ in range(epochs):\n        errs = [w * x + b - y for x, y in zip(xs, ys)]\n        dw = 2 / n * sum(e * x for e, x in zip(errs, xs))\n        db = 2 / n * sum(errs)\n        w -= lr * dw\n        b -= lr * db\n    return w, b\n\nw, b = fit(xs, ys, 0.05, 2000)\nprint(w, b)', check: { tests: 'assert abs(w - 2) < 0.01 and abs(b - 1) < 0.01, f"w ≈ 2, b ≈ 1 күтілді, ал w={w:.3f}, b={b:.3f}. Таңбаны және 2/n-ді тексеріңіз"\n_w1, _b1 = fit([0, 1, 2], [1, 1, 1], 0.1, 1000)\nassert abs(_w1) < 0.01 and abs(_b1 - 1) < 0.01, "Тұрақты y = 1 үшін w ≈ 0, b ≈ 1 болуы керек"\n_w0, _b0 = fit(xs, ys, 0.05, 1)\nassert abs(_w0 - 2.5) < 1e-9 and abs(_b0 - 0.7) < 1e-9, "1 қадамнан кейін w = 2.5, b = 0.7 болуы керек: w = 0, b = 0-ден бастаңыз"', mustInclude: ['def fit'] }, hints: ['Циклдің ішінде mm-9 бірінші тапсырмасындағы <code>step</code> логикасы.', '<code>w, b = fit(xs, ys, 0.05, 2000)</code>'] },
        { type: 'quiz', xp: 10, prompt: 'Gradient descent кезінде loss әр қадамда өсіп, 50 қадамнан кейін <code>inf</code> болды. Ең ықтимал себеп?', options: ['Learning rate тым кіші', 'Learning rate тым үлкен', 'Epochs саны аз', 'Деректер тым аз'], answer: 1, explain: 'Тым үлкен қадам минимумнан асып кетеді, әр жолы алыстай береді (divergence). lr-ды 10 есе азайтып көріңіз.' }
      ]
    },
    {
      id: 'mm-10', title: 'NumPy: векторланған нұсқа', minutes: 14,
      body: `
<p>Тізімдер мен циклдармен бәрін түсіндік. Бірақ нақты жұмыста 1 000 000 жол болғанда Python циклі баяу. <b>NumPy</b> массивтерімен амалдар бүкіл массивке бірден, C тілінде жасалады — бұл <b>векторлау</b> (vectorization).</p>
<table>
<tr><th>Тізімдер (қолмен)</th><th>NumPy</th></tr>
<tr><td><code>[a + b for a, b in zip(u, v)]</code></td><td><code>u + v</code></td></tr>
<tr><td><code>[c * a for a in v]</code></td><td><code>c * v</code></td></tr>
<tr><td><code>sum(a * b for ...)</code></td><td><code>u @ v</code> немесе <code>np.dot(u, v)</code></td></tr>
<tr><td><code>sum(a * a ...) ** 0.5</code></td><td><code>np.linalg.norm(v)</code></td></tr>
<tr><td><code>matvec(A, x)</code></td><td><code>A @ x</code></td></tr>
<tr><td><code>matmul(A, B)</code></td><td><code>A @ B</code></td></tr>
<tr><td><code>transpose(A)</code></td><td><code>A.T</code></td></tr>
</table>
<pre><code>import numpy as np
u = np.array([1, 2, 3])
v = np.array([4, 5, 6])
u + v          # array([5, 7, 9])  — енді бұл жалғау емес!
u @ v          # 32
X = np.array([[1, 50, 2], [1, 70, 3]])
X.shape        # (2, 3)</code></pre>
<h3>Қадамдап мысал: векторланған gradient descent</h3>
<p>mm-9 циклінің ішкі бөлігі NumPy-да үш жол:</p>
<pre><code>x = np.array([1, 2, 3, 4, 5], dtype=float)
y = np.array([3, 5, 7, 9, 11], dtype=float)
w, b, lr = 0.0, 0.0, 0.05
for _ in range(2000):
    e = w * x + b - y              # барлық қате бірден
    w -= lr * 2 * (e @ x) / len(x)  # Σ e·x = e @ x
    b -= lr * 2 * e.mean()
print(round(w, 3), round(b, 3))    # 2.0 1.0</code></pre>
<ol>
<li><code>w * x + b</code> — әр элементке бірден (broadcasting: скаляр b әр элементке қосылады).</li>
<li><code>e @ x</code> — dot product, Σ eᵢ·xᵢ.</li>
<li><code>e.mean()</code> — Σ eᵢ / n.</li>
</ol>
<p>Көп белгілі модельде градиент бір формулаға сыяды: <code>grad = 2 / n * X.T @ (X @ w - y)</code>. Міне, mm-5-тегі transpose осында керек.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>*</code> мен <code>@</code>-ті шатастыру: <code>A * B</code> элемент бойынша көбейту, <code>A @ B</code> матрица көбейтуі. (2) Пішінді тексермеу: күмән болса, <code>.shape</code> басып шығарыңыз. (3) Бүтін сан массивіне float жазу: <code>dtype=float</code> қойыңыз.</div>`,
      exercises: [
        { type: 'python', xp: 20, prompt: 'NumPy арқылы <code>cosine(u, v)</code> функциясын жазыңыз (<code>@</code> және <code>np.linalg.norm</code>). Сосын <code>X</code> матрицасы мен <code>w</code> бойынша болжамдарды <code>preds = X @ w</code> есептеңіз.', starter: 'import numpy as np\nX = np.array([[1, 50, 2], [1, 70, 3], [1, 40, 1]], dtype=float)\nw = np.array([5, 0.4, 2])\n\ndef cosine(u, v):\n    pass\n', solution: 'import numpy as np\nX = np.array([[1, 50, 2], [1, 70, 3], [1, 40, 1]], dtype=float)\nw = np.array([5, 0.4, 2])\n\ndef cosine(u, v):\n    return (u @ v) / (np.linalg.norm(u) * np.linalg.norm(v))\n\npreds = X @ w', check: { tests: 'import numpy as _np\nassert abs(float(cosine(_np.array([1.0, 2.0]), _np.array([2.0, 4.0]))) - 1) < 1e-9, "Бағыты бірдей векторларда cosine = 1"\nassert abs(float(cosine(_np.array([1.0, 0.0]), _np.array([0.0, 3.0])))) < 1e-9, "Перпендикуляр векторларда cosine = 0"\nassert _np.allclose(preds, [29, 39, 23]), "preds = [29, 39, 23] болуы керек: X @ w"', mustInclude: ['def cosine', '@'] }, hints: ['<code>(u @ v) / (np.linalg.norm(u) * np.linalg.norm(v))</code>', '<code>preds = X @ w</code>'] },
        { type: 'python', xp: 25, prompt: 'Векторланған gradient descent: <code>x</code>, <code>y</code> массивтерінде w = 0, b = 0-ден бастап, <code>lr = 0.05</code> арқылы 2000 қадам жасап, нәтижені <code>w</code>, <code>b</code>-ға жазыңыз. Цикл ішінде тек NumPy амалдары (ішкі <code>for x in ...</code> жоқ).', starter: 'import numpy as np\nx = np.array([1, 2, 3, 4, 5], dtype=float)\ny = np.array([4, 7, 10, 13, 16], dtype=float)   # y = 3x + 1\n', solution: 'import numpy as np\nx = np.array([1, 2, 3, 4, 5], dtype=float)\ny = np.array([4, 7, 10, 13, 16], dtype=float)   # y = 3x + 1\nw, b, lr = 0.0, 0.0, 0.05\nfor _ in range(2000):\n    e = w * x + b - y\n    w -= lr * 2 * (e @ x) / len(x)\n    b -= lr * 2 * e.mean()\nprint(w, b)', check: { tests: 'assert abs(float(w) - 3) < 0.01, f"w ≈ 3 болуы керек, {float(w):.3f} шықты"\nassert abs(float(b) - 1) < 0.01, f"b ≈ 1 болуы керек, {float(b):.3f} шықты"', mustInclude: ['@'] }, hints: ['<code>e = w * x + b - y</code>', '<code>w -= lr * 2 * (e @ x) / len(x)</code>; <code>b -= lr * 2 * e.mean()</code>'] },
        { type: 'quiz', xp: 10, prompt: 'A мен B — екеуі де 3 × 3 NumPy массиві. Математикадағы матрица көбейтуін қайсысы береді?', options: ['A * B', 'A @ B', 'A + B', 'A.T * B'], answer: 1, explain: 'A @ B — матрица көбейтуі (жол · баған). A * B әр элементті жеке көбейтеді.' }
      ]
    },
    {
      id: 'mm-gate', gate: true, title: 'Модуль емтиханы: Math for ML', minutes: 25,
      body: `
<p>Қорытынды тексеріс. Python тапсырмаларында тек стандарт кітапхана мен тізімдер (NumPy жоқ).</p>`,
      exercises: [
        { type: 'python', xp: 40, prompt: '<code>knn_predict(points, labels, q, k)</code> функциясын жазыңыз: <code>q</code>-ға Евклид бойынша ең жақын <code>k</code> нүктенің <code>labels</code> мәндерінің орташасын қайтарсын.', starter: 'def knn_predict(points, labels, q, k):\n    pass\n', solution: 'def knn_predict(points, labels, q, k):\n    def dist(u, v):\n        return sum((a - b) ** 2 for a, b in zip(u, v)) ** 0.5\n    idx = sorted(range(len(points)), key=lambda i: dist(points[i], q))[:k]\n    return sum(labels[i] for i in idx) / k', check: { tests: '_pts = [[0, 0], [1, 0], [5, 5], [6, 5], [10, 10]]\n_lab = [10, 20, 50, 70, 100]\nassert abs(knn_predict(_pts, _lab, [0.2, 0], 1) - 10) < 1e-9, "k=1: ең жақын [0, 0], нәтиже 10"\nassert abs(knn_predict(_pts, _lab, [0.4, 0], 2) - 15) < 1e-9, "k=2: [0, 0] мен [1, 0], орташа 15"\nassert abs(knn_predict(_pts, _lab, [5.4, 5], 2) - 60) < 1e-9, "k=2: [5, 5] мен [6, 5], орташа 60"\nassert abs(knn_predict(_pts, _lab, [9, 9], 3) - (50 + 70 + 100) / 3) < 1e-9, "k=3: [10, 10], [6, 5], [5, 5]"' }, hints: [] },
        { type: 'python', xp: 40, prompt: 'Екі белгілі модель ŷ = X · w (X-те intercept бағаны бар). <code>gd_matrix(X, y, lr, epochs)</code> функциясын тізімдермен жазыңыз: w нөлдерден басталады, әр қадамда ∂MSE/∂wⱼ = (2/n) Σᵢ eᵢ · X[i][j], мұнда eᵢ = ŷᵢ − yᵢ. Соңғы w тізімін қайтарсын.', starter: 'def gd_matrix(X, y, lr, epochs):\n    pass\n', solution: 'def gd_matrix(X, y, lr, epochs):\n    n, d = len(X), len(X[0])\n    w = [0.0] * d\n    for _ in range(epochs):\n        errs = [sum(a * b for a, b in zip(row, w)) - t for row, t in zip(X, y)]\n        grad = [2 / n * sum(errs[i] * X[i][j] for i in range(n)) for j in range(d)]\n        w = [wj - lr * gj for wj, gj in zip(w, grad)]\n    return w', check: { tests: '_X = [[1, 0, 1], [1, 1, 0], [1, 1, 1], [1, 2, 1], [1, 0, 2]]\n_y = [1 + 2 * r[1] + 3 * r[2] for r in _X]\n_w = gd_matrix(_X, _y, 0.05, 5000)\nassert isinstance(_w, list) and len(_w) == 3, "Ұзындығы 3 тізім қайтарыңыз"\nfor _a, _e in zip(_w, [1, 2, 3]):\n    assert abs(_a - _e) < 0.01, f"w ≈ [1, 2, 3] күтілді, {[round(v, 3) for v in _w]} шықты"\n_w1 = gd_matrix([[1, 1], [1, 2]], [3, 5], 0.1, 1)\nassert abs(_w1[0] - 0.8) < 1e-9 and abs(_w1[1] - 1.3) < 1e-9, "1 қадамнан кейін w = [0.8, 1.3] болуы керек"' }, hints: [] },
        { type: 'number', xp: 20, prompt: 'u = [1, 2, 2], v = [2, 0, 1]. cosine similarity қанша? (2 ондық белгіге дейін)', answer: 4 / (3 * Math.sqrt(5)), tol: 0.01, explain: 'dot = 2 + 0 + 2 = 4. ‖u‖ = 3, ‖v‖ = √5 ≈ 2.236. 4 / 6.708 ≈ 0.60.' },
        { type: 'quiz', xp: 20, prompt: 'f(w) = (w − 3)². w = 5, lr = 0.25 болса, бір gradient descent қадамынан кейін w неге тең?', options: ['4', '3', '6', '5.5'], answer: 0, explain: 'f′(w) = 2(w − 3) = 4. w = 5 − 0.25 · 4 = 4.' }
      ]
    }
  ]
};
