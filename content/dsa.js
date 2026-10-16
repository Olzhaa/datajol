// DSA-1 Data Structures & Algorithms. Pure-Python (stdlib) exercises in Pyodide; every exercise carries level: 'easy' | 'medium' | 'hard'.
// Performance tests generate their inputs inside the tests (random.Random with a fixed seed) and time a mid-size run before the 10^5 run.
(function () {
  const P = String.raw;

  DJ.modules['dsa-1'] = {
    intro: 'Алгоритмдер мен деректер құрылымдары: Big-O, массив пен екі көрсеткіш, hash map, stack/queue, linked list, рекурсия, binary search, сұрыптау, ағаш, heap, граф және динамикалық бағдарламалау. Әр тақырыптан кейін Python-да өзіңіз іске асырасыз, соңында Оңай / Орташа / Қиын деңгейлі есептер жинағын шешесіз.',
    lessons: [
      {
        id: 'dsa-1', title: 'Big-O: алгоритмнің құнын санау', minutes: 14,
        body: `
<p>Бір тапсырманы екі түрлі кодпен шешуге болады: екеуі де дұрыс жауап береді, бірақ біреуі 1 000 тапсырыста жарты секундта, 1 000 000 тапсырыста сағаттап жұмыс істейді. <b>Big-O</b> — кіріс өлшемі <code>n</code> өскенде жұмыс көлемі қалай өсетінін сипаттайтын белгі. Нақты секундтар емес, <b>өсу формасы</b> маңызды.</p>
<h3>Операцияларды санау</h3>
<p>Kaspi-стильді дүкенде <code>n</code> тапсырыс бар. Сұрақ: бірдей <code>order_id</code> екі рет кездесе ме?</p>
<pre><code># 1-нұсқа: әр жұпты салыстыру
def has_dup_slow(ids):
    for i in range(len(ids)):
        for j in range(i + 1, len(ids)):
            if ids[i] == ids[j]:
                return True
    return False

# 2-нұсқа: көргенді set-ке жинау
def has_dup_fast(ids):
    seen = set()
    for x in ids:
        if x in seen:
            return True
        seen.add(x)
    return False</code></pre>
<p>Бірінші нұсқада ішкі цикл <code>(n−1) + (n−2) + … + 1 = n(n−1)/2</code> рет орындалады — бұл <b>O(n²)</b>. Екіншісінде әр элементке бір рет қараймыз, ал set-те тексеру орта есеппен тұрақты уақыт алады — <b>O(n)</b>. n = 100 000 болса, біріншісі шамамен 5 млрд салыстыру жасайды, екіншісі — 100 мың.</p>
<h3>Негізгі өсу кластары</h3>
<table>
<tr><th>Big-O</th><th>Мысал</th><th>n = 10⁶ кезінде шамамен</th></tr>
<tr><td>O(1)</td><td>dict-тен кілт бойынша алу</td><td>1</td></tr>
<tr><td>O(log n)</td><td>binary search</td><td>20</td></tr>
<tr><td>O(n)</td><td>тізімді бір рет аралау</td><td>10⁶</td></tr>
<tr><td>O(n log n)</td><td>жақсы сұрыптау (merge sort, <code>sorted</code>)</td><td>2·10⁷</td></tr>
<tr><td>O(n²)</td><td>екі кірістірілген цикл</td><td>10¹²</td></tr>
<tr><td>O(2ⁿ)</td><td>барлық ішкі жиындарды тексеру</td><td>мүмкін емес</td></tr>
</table>
<p>Ережелер: тұрақты көбейткіштер мен кіші мүшелер тасталады (<code>3n + 5</code> → O(n), <code>n² + n</code> → O(n²)). Қатар тұрған циклдер қосылады, кірістірілгендер көбейтіледі. Жадқа да осылай қараймыз: <code>seen</code> set-і O(n) қосымша жад алады — уақытты жадпен «сатып алдық».</p>
<div class="tip"><b>Практикалық бағдар:</b> Python бір секундта шамамен 10⁷ қарапайым операция жасайды (браузерде одан да баяу). n = 10⁵ болса, O(n²) ≈ 10¹⁰ — сәтсіз, O(n log n) ≈ 2·10⁶ — лезде.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Бұл кодтың уақыт күрделілігі қандай?<pre><code>total = 0\nfor i in range(n):\n    for j in range(n):\n        total += a[i] * a[j]</code></pre>', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'], answer: 2, explain: 'Сыртқы цикл n рет, әр қайталауда ішкі цикл тағы n рет: n · n = n².' },
          { type: 'number', level: 'easy', xp: 10, prompt: 'n = 100 болса, <code>count += 1</code> жолы неше рет орындалады?<pre><code>count = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        count += 1</code></pre>', answer: 4950, tol: 0, explain: 'Әр жұп (i, j), i &lt; j, бір рет саналады: n(n−1)/2 = 100 · 99 / 2 = 4950.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Бұл циклдің күрделілігі қандай?<pre><code>steps = 0\nwhile n &gt; 1:\n    n //= 2\n    steps += 1</code></pre>', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 1, explain: 'Әр қадамда n екі есе кішірейеді, сондықтан қадам саны ≈ log₂ n.' },
          { type: 'python', level: 'easy', xp: 20, prompt: P`<code>has_duplicate(ids)</code> функциясын жазыңыз: тізімде кемінде бір мән екі рет кездессе <code>True</code>, әйтпесе <code>False</code> қайтарсын. Тест 100 000 элементпен де тексереді, сондықтан O(n²) жұп салыстыру өтпейді — <code>set</code> қолданыңыз.
<pre><code>has_duplicate([101, 205, 101])  → True
has_duplicate([7, 8, 9])        → False
has_duplicate([])               → False</code></pre>`,
            starter: P`def has_duplicate(ids):
    pass
`,
            solution: P`def has_duplicate(ids):
    seen = set()
    for x in ids:
        if x in seen:
            return True
        seen.add(x)
    return False
`,
            hints: ['Бос <code>seen = set()</code> жасап, әр элементті <code>x in seen</code> арқылы тексеріңіз.', 'Жаңа элементті <code>seen.add(x)</code> арқылы қосыңыз; соңына дейін қайталанбаса, <code>False</code>.'],
            check: { tests: P`
assert has_duplicate([101, 205, 101]) is True, 'has_duplicate([101, 205, 101]) True болуы керек'
assert has_duplicate([7, 8, 9]) is False, 'has_duplicate([7, 8, 9]) False болуы керек'
assert has_duplicate([]) is False, 'Бос тізім үшін False қайтарыңыз'
assert has_duplicate([5]) is False, 'Бір элементті тізімде қайталану жоқ'
import time as _time
_big = list(range(5000))
_t0 = _time.perf_counter(); _r = has_duplicate(_big); _dt = _time.perf_counter() - _t0
assert _r is False, '0..4999 тізімінде қайталану жоқ'
assert _dt < 0.15, f'n=5000 үшін {_dt:.2f} с кетті — бұл O(n²). set арқылы O(n) шешім жазыңыз'
_big = list(range(100000)) + [99999]
assert has_duplicate(_big) is True, 'Соңында қайталанатын 100 000 элементті тізімде True болуы керек'
` } }
        ]
      },
      {
        id: 'dsa-2', title: 'Массив, тізім және екі көрсеткіш', minutes: 14,
        body: `
<p>Python <code>list</code> — динамикалық массив: элементтер жадта қатар тұрады. Сондықтан индекс бойынша алу <code>a[i]</code> — O(1), соңына қосу <code>append</code> — орта есеппен O(1). Ал басына қосу <code>a.insert(0, x)</code> немесе <code>a.pop(0)</code> — O(n): қалған элементтердің бәрі бір орынға жылжиды.</p>
<table>
<tr><th>Операция</th><th>Күрделілік</th></tr>
<tr><td><code>a[i]</code>, <code>a[i] = x</code>, <code>len(a)</code></td><td>O(1)</td></tr>
<tr><td><code>a.append(x)</code>, <code>a.pop()</code></td><td>O(1) орта есеппен</td></tr>
<tr><td><code>a.insert(0, x)</code>, <code>a.pop(0)</code>, <code>x in a</code></td><td>O(n)</td></tr>
<tr><td><code>a[l:r]</code> (кесінді)</td><td>O(r − l) — көшірме жасайды</td></tr>
</table>
<h3>Екі көрсеткіш (two pointers)</h3>
<p>Көп есепте екі индекс ұстап, оларды бір-біріне қарай жылжытамыз. Мысал: баға тізімі <b>сұрыпталған</b>, сатып алушының бюджеті 10 000 ₸. Қосындысы дәл бюджетке тең екі тауар бар ма?</p>
<pre><code>def pair_with_sum(prices, budget):
    i, j = 0, len(prices) - 1
    while i &lt; j:
        s = prices[i] + prices[j]
        if s == budget:
            return (i, j)
        if s &lt; budget:
            i += 1      # қосынды аз — арзанын қымбатырағымен ауыстырамыз
        else:
            j -= 1      # қосынды көп — қымбатын арзандатамыз
    return None</code></pre>
<p>Неге дұрыс? Егер <code>prices[i] + prices[j] &lt; budget</code> болса, <code>prices[i]</code> кез келген <code>j' ≤ j</code>-мен де аз береді, сондықтан <code>i</code>-ді тастай аламыз. Әр қадамда бір көрсеткіш жылжиды — барлығы O(n), ал барлық жұпты тексеру O(n²) болар еді.</p>
<p>Тағы бір үлгі — <b>оқу/жазу көрсеткіші</b>: сұрыпталған тізімнен қайталануларды орнында (in place) алып тастау. <code>w</code> — келесі жазатын орын, <code>r</code> — оқып жатқан орын. Жаңа мән кездессе, <code>a[w] = a[r]</code>, <code>w += 1</code>.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Цикл ішінде <code>a.pop(0)</code> қолдану — байқаусызда O(n²). (2) Тізімді аралап жатып одан элемент өшіру — индекстер жылжып, элементтер өткізіліп кетеді. (3) Екі көрсеткіш тек сұрыпталған тізімде жұмыс істейтінін ұмыту.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: '100 000 элементті тізімнің басынан <code>a.pop(0)</code> арқылы бәрін бір-бірлеп алып шықсақ, жалпы күрделілік қандай?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], answer: 2, explain: 'Әр pop(0) қалған элементтерді жылжытады: n + (n−1) + … ≈ n²/2. Мұндай жағдайда collections.deque керек.' },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>reverse_in_place(a)</code> функциясы тізімді <b>орнында</b> аударсын: екі көрсеткішпен (басы мен соңы) элементтерді алмастырыңыз. Жаңа тізім жасамаңыз, ештеңе қайтармаңыз.
<pre><code>a = [1, 2, 3, 4]
reverse_in_place(a)   # a == [4, 3, 2, 1]</code></pre>`,
            starter: P`def reverse_in_place(a):
    i, j = 0, len(a) - 1
    # i < j болғанша a[i] мен a[j]-ді алмастырыңыз
`,
            solution: P`def reverse_in_place(a):
    i, j = 0, len(a) - 1
    while i < j:
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1
`,
            hints: ['<code>while i &lt; j:</code> циклі ішінде <code>a[i], a[j] = a[j], a[i]</code>.', 'Сосын <code>i += 1</code>, <code>j -= 1</code>.'],
            check: { tests: P`
_a = [1, 2, 3, 4]; _id = id(_a)
_r = reverse_in_place(_a)
assert _a == [4, 3, 2, 1], f'[1, 2, 3, 4] → [4, 3, 2, 1] болуы керек, сізде {_a}'
assert id(_a) == _id and _r is None, 'Тізімді орнында өзгертіңіз, ештеңе қайтармаңыз'
_b = [5, 6, 7]; reverse_in_place(_b)
assert _b == [7, 6, 5], 'Тақ ұзындықты тізім де дұрыс аударылуы керек'
_c = []; reverse_in_place(_c)
assert _c == [], 'Бос тізім бос күйінде қалуы керек'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Бағалар <b>өсу ретімен</b> сұрыпталған. <code>pair_with_sum(prices, budget)</code> қосындысы дәл <code>budget</code>-ке тең екі тауардың индекстерін <code>(i, j)</code>, <code>i &lt; j</code>, қайтарсын; ондай жұп болмаса — <code>None</code>. Екі көрсеткішпен O(n) жазыңыз: тест 100 000 бағамен тексереді.
<pre><code>pair_with_sum([1500, 2500, 4000, 6000, 9000], 10000) → (2, 3)
pair_with_sum([1000, 2000], 5000)                     → None</code></pre>`,
            starter: P`def pair_with_sum(prices, budget):
    pass
`,
            solution: P`def pair_with_sum(prices, budget):
    i, j = 0, len(prices) - 1
    while i < j:
        s = prices[i] + prices[j]
        if s == budget:
            return (i, j)
        if s < budget:
            i += 1
        else:
            j -= 1
    return None
`,
            hints: ['<code>i = 0</code>, <code>j = len(prices) - 1</code> деп бастаңыз.', 'Қосынды аз болса <code>i += 1</code>, көп болса <code>j -= 1</code>.'],
            check: { tests: P`
_r = pair_with_sum([1500, 2500, 4000, 6000, 9000], 10000)
assert _r is not None and tuple(_r) == (2, 3), f'Күтілгені (2, 3), сізде {_r}'
assert pair_with_sum([1000, 2000], 5000) is None, 'Жұп жоқ болса None қайтарыңыз'
assert pair_with_sum([], 10) is None, 'Бос тізім үшін None'
assert pair_with_sum([5000], 10000) is None, 'Бір тауарды өзімен жұптауға болмайды'
_r = pair_with_sum([1, 3, 3, 9], 6)
assert _r is not None and tuple(_r) == (1, 2), 'Бірдей бағалы екі түрлі тауар да жұп бола алады'
import time as _time
_p = list(range(0, 10000, 2))
_t0 = _time.perf_counter(); _r = pair_with_sum(_p, 1); _dt = _time.perf_counter() - _t0
assert _r is None, 'Жұп сандар қосындысы тақ бола алмайды — None күтілді'
assert _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — бұл O(n²). Екі көрсеткішпен O(n) жазыңыз'
_p = list(range(100000))
_r = pair_with_sum(_p, 199997)
assert _r is not None and _p[_r[0]] + _p[_r[1]] == 199997 and _r[0] < _r[1], 'n = 100 000 кезінде дұрыс жұп табылмады'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Сұрыпталған тізімнен қайталануларды <b>орнында</b> алып тастаңыз (оқу/жазу көрсеткіші). <code>dedup_sorted(a)</code> бірегей мәндер санын <code>k</code> қайтарсын, ал <code>a[:k]</code> сол бірегей мәндер болсын (тізімнің қалғаны маңызды емес).
<pre><code>a = [1, 1, 2, 3, 3, 3]
k = dedup_sorted(a)   # k == 3, a[:3] == [1, 2, 3]</code></pre>`,
            starter: P`def dedup_sorted(a):
    if not a:
        return 0
    w = 1
    # r = 1-ден соңына дейін: a[r] алдыңғы жазылғаннан өзгеше болса, a[w]-ге жазыңыз
    return w
`,
            solution: P`def dedup_sorted(a):
    if not a:
        return 0
    w = 1
    for r in range(1, len(a)):
        if a[r] != a[w - 1]:
            a[w] = a[r]
            w += 1
    return w
`,
            hints: ['<code>for r in range(1, len(a)):</code> — <code>a[r]</code>-ді соңғы жазылған <code>a[w - 1]</code>-мен салыстырыңыз.', 'Өзгеше болса <code>a[w] = a[r]</code>, <code>w += 1</code>.'],
            check: { tests: P`
_a = [1, 1, 2, 3, 3, 3]; _id = id(_a)
_k = dedup_sorted(_a)
assert _k == 3, f'[1, 1, 2, 3, 3, 3] үшін k = 3, сізде {_k}'
assert _a[:3] == [1, 2, 3] and id(_a) == _id, f'a[:3] == [1, 2, 3] болуы керек (орнында), сізде {_a[:3]}'
assert dedup_sorted([]) == 0, 'Бос тізім үшін 0'
_b = [4, 4, 4]
assert dedup_sorted(_b) == 1 and _b[0] == 4, '[4, 4, 4] үшін k = 1'
_c = [1, 2, 3]
assert dedup_sorted(_c) == 3 and _c == [1, 2, 3], 'Қайталанусыз тізім өзгермеуі керек'
` } }
        ]
      },
      {
        id: 'dsa-3', title: 'Жолдар (strings)', minutes: 13,
        body: `
<p>Python-да <code>str</code> — <b>өзгермейтін</b> (immutable) таңбалар тізбегі. <code>s[i]</code> — O(1), <code>len(s)</code> — O(1), бірақ <code>s[i] = 'а'</code> жазуға болмайды: кез келген «өзгеріс» жаңа жол жасайды. Бұдан маңызды салдар шығады:</p>
<pre><code># Баяу: әр += жаңа жол жасап, бұрынғыны көшіреді → O(n²) болуы мүмкін
out = ''
for ch in text:
    out += ch.upper()

# Дұрыс: бөліктерді тізімге жинап, соңында бір рет біріктіру → O(n)
parts = []
for ch in text:
    parts.append(ch.upper())
out = ''.join(parts)</code></pre>
<h3>Жиі кездесетін әдістер</h3>
<ul>
<li><code>s.lower()</code>, <code>s.upper()</code> — қазақ әріптерімен де жұмыс істейді: <code>'ҚАЗАҚ'.lower() == 'қазақ'</code>.</li>
<li><code>ch.isalnum()</code>, <code>ch.isalpha()</code>, <code>ch.isdigit()</code> — таңба түрін тексеру.</li>
<li><code>s.split()</code>, <code>' '.join(words)</code>, <code>s.strip()</code>, <code>s[::-1]</code> (аударылған көшірме).</li>
</ul>
<h3>Мысал: палиндром</h3>
<p>«Қазақ» сөзі екі жақтан бірдей оқылады — бұл палиндром. Тыныс белгілері мен бос орындарды елемей тексеру үшін екі көрсеткіш қолданамыз: сол жақтан және оң жақтан әріп емес таңбаларды өткізіп жібереміз, сосын кіші әріпке келтіріп салыстырамыз.</p>
<pre><code>def is_palindrome(s):
    i, j = 0, len(s) - 1
    while i &lt; j:
        if not s[i].isalnum():
            i += 1
        elif not s[j].isalnum():
            j -= 1
        else:
            if s[i].lower() != s[j].lower():
                return False
            i += 1
            j -= 1
    return True</code></pre>
<p>Бұл O(n) уақыт пен O(1) қосымша жад. Қысқа нұсқа <code>t = ''.join(c.lower() for c in s if c.isalnum()); t == t[::-1]</code> да O(n), бірақ O(n) жад алады — көп жағдайда бұл да жарайды.</p>
<h3>Анаграмма</h3>
<p>Екі сөз бір әріптерден құралса, олар анаграмма: «аспан» мен «панас». Тексерудің екі жолы: <code>sorted(a) == sorted(b)</code> (O(n log n)) немесе әріп жиілігін санау <code>Counter(a) == Counter(b)</code> (O(n)). Жиілік санау — келесі сабақтағы hash map-тің алғашқы қолданысы.</p>
<div class="tip"><b>Жиі қателер:</b> (1) Цикл ішінде жолды <code>+=</code> арқылы ұзарту. (2) Регистрді ескермеу: <code>'А' != 'а'</code>. (3) <code>s.split(' ')</code> мен <code>s.split()</code> айырмасын ұмыту: соңғысы қатар тұрған бос орындарды бірге өткізеді.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Неге ұзын жолды құрастырғанда <code>\'\'.join(parts)</code> цикл ішіндегі <code>out += ch</code>-ден жақсы?', options: ['join тек ағылшын әріптерімен жұмыс істейді', 'str өзгермейді, сондықтан += әр қадамда жаңа жол жасап көшіруі мүмкін; join бір рет O(n) біріктіреді', '+= синтаксистік қате береді', 'Айырмасы жоқ, тек стиль мәселесі'], answer: 1, explain: 'Жолдар immutable: әр += бұрынғы мазмұнды жаңа жолға көшіруі мүмкін, жалпы O(n²) болады. Тізімге жинап, бір рет join — O(n).' },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>is_palindrome(s)</code> жазыңыз: әріп пен цифрдан басқа таңбаларды (бос орын, үтір, леп белгісі) елемей және регистрді ескермей, жол палиндром ба?
<pre><code>is_palindrome('Қазақ')          → True
is_palindrome('Алма, алма!')      → False
is_palindrome('А роза упала на лапу Азора') → True
is_palindrome('')                → True</code></pre>`,
            starter: P`def is_palindrome(s):
    pass
`,
            solution: P`def is_palindrome(s):
    i, j = 0, len(s) - 1
    while i < j:
        if not s[i].isalnum():
            i += 1
        elif not s[j].isalnum():
            j -= 1
        else:
            if s[i].lower() != s[j].lower():
                return False
            i += 1
            j -= 1
    return True
`,
            hints: ['Екі көрсеткіш: <code>i = 0</code>, <code>j = len(s) - 1</code>; <code>isalnum()</code> емес таңбаларды өткізіңіз.', 'Салыстыру алдында <code>.lower()</code>.'],
            check: { tests: P`
assert is_palindrome('Қазақ') is True, "'Қазақ' — палиндром"
assert is_palindrome('Алма, алма!') is False, "'Алма, алма!' → 'алмаалма' палиндром емес"
assert is_palindrome('А роза упала на лапу Азора') is True, 'Бос орындар мен регистрді елемеңіз'
assert is_palindrome('') is True, 'Бос жол палиндром деп саналады'
assert is_palindrome('.,!') is True, 'Тек тыныс белгілерінен тұратын жол — палиндром'
assert is_palindrome('12321') is True and is_palindrome('123') is False, 'Цифрлар да ескеріледі'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>is_anagram(a, b)</code>: екі сөз бірдей әріптерден (бірдей санмен) құралса <code>True</code>. Регистрді ескермеңіз.
<pre><code>is_anagram('аспан', 'панас')  → True
is_anagram('Арман', 'намра')  → True
is_anagram('ала', 'алла')     → False</code></pre>`,
            starter: P`def is_anagram(a, b):
    pass
`,
            solution: P`from collections import Counter

def is_anagram(a, b):
    return Counter(a.lower()) == Counter(b.lower())
`,
            hints: ['<code>from collections import Counter</code> — әріп жиілігін санайды.', 'Немесе <code>sorted(a.lower()) == sorted(b.lower())</code>.'],
            check: { tests: P`
assert is_anagram('аспан', 'панас') is True, "'аспан' мен 'панас' — анаграмма"
assert is_anagram('Арман', 'намра') is True, 'Регистрді ескермеңіз'
assert is_anagram('ала', 'алла') is False, 'Әріп саны да сәйкес келуі керек'
assert is_anagram('', '') is True, 'Екі бос жол — анаграмма'
assert is_anagram('abc', 'abd') is False, "'abc' мен 'abd' анаграмма емес"
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Run-length кодтау: қатар тұрған бірдей таңбаларды «таңба + саны» түрінде қысыңыз; саны 1 болса, сан жазылмайды. <code>compress(s)</code> жолды тізімге жинап, соңында <code>''.join</code> арқылы қайтарсын.
<pre><code>compress('ааабвв')  → 'а3бв2'
compress('xyz')     → 'xyz'
compress('')        → ''</code></pre>`,
            starter: P`def compress(s):
    parts = []
    # қатар тұрған бірдей таңбаларды санаңыз
    return ''.join(parts)
`,
            solution: P`def compress(s):
    parts = []
    i = 0
    while i < len(s):
        j = i
        while j < len(s) and s[j] == s[i]:
            j += 1
        parts.append(s[i])
        if j - i > 1:
            parts.append(str(j - i))
        i = j
    return ''.join(parts)
`,
            hints: ['<code>i</code> — топтың басы; <code>j</code>-ді <code>s[j] == s[i]</code> болғанша жылжытыңыз.', 'Топ ұзындығы <code>j - i</code>; 1-ден үлкен болса ғана санды қосыңыз, сосын <code>i = j</code>.'],
            check: { tests: P`
assert compress('ааабвв') == 'а3бв2', f"'ааабвв' → 'а3бв2', сізде {compress('ааабвв')!r}"
assert compress('xyz') == 'xyz', "Қайталанусыз жол өзгермейді"
assert compress('zzzzzzzzzzzz') == 'z12', 'Екі таңбалы сан да дұрыс жазылуы керек'
assert compress('aabaa') == 'a2ba2', 'Бірдей таңбалар тек қатар тұрса ғана біріктіріледі'
assert compress('q') == 'q', 'Бір таңбалы жол өзгермейді'
` } }
        ]
      },
      {
        id: 'dsa-4', title: 'Hash map және set: жиілік пен жұптар', minutes: 15,
        body: `
<p><code>dict</code> пен <code>set</code> — <b>hash table</b>. Кілттен hash-функция сан есептейді, сол сан бойынша кілт кестедегі орнына тікелей барады. Сондықтан іздеу, қосу, өшіру — <b>орта есеппен O(1)</b>. Тізімде <code>x in a</code> — O(n), set-те <code>x in s</code> — O(1). Кілт hash-талатын (өзгермейтін) болуы керек: <code>str</code>, <code>int</code>, <code>tuple</code> — болады, <code>list</code> — болмайды.</p>
<h3>Үлгі 1: жиілік санау</h3>
<pre><code>orders = ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Алматы']
freq = {}
for city in orders:
    freq[city] = freq.get(city, 0) + 1
# {'Алматы': 3, 'Астана': 1, 'Шымкент': 1}

from collections import Counter
Counter(orders).most_common(1)   # [('Алматы', 3)]</code></pre>
<h3>Үлгі 2: «бұрын не көрдім?» (two-sum)</h3>
<p>Сұрыпталмаған тізімде қосындысы <code>target</code> болатын екі санның индекстерін табу. Әр <code>x</code> үшін бізге <code>target − x</code> керек. Оны бұрын кездестірдік пе — dict-тен O(1)-де сұраймыз:</p>
<pre><code>def two_sum(nums, target):
    pos = {}                       # мән → индекс
    for i, x in enumerate(nums):
        need = target - x
        if need in pos:
            return (pos[need], i)
        pos[x] = i
    return None

two_sum([3000, 7000, 1500, 5500], 7000)   # (2, 3)</code></pre>
<p>Неге <code>pos[x] = i</code> тексеруден <b>кейін</b>? Әйтпесе <code>x + x = target</code> болғанда элементті өзімен жұптап қоямыз. Бұл O(n) уақыт пен O(n) жад; екі цикл O(n²) болар еді.</p>
<h3>Үлгі 3: топтау</h3>
<p>Кілт ретінде «қолтаңба» алып, соған жататындарды тізімге жинаймыз: мысалы, анаграммаларды топтауда кілт <code>''.join(sorted(word))</code>. <code>collections.defaultdict(list)</code> бос тізімді өзі жасайды.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>freq[k] += 1</code> — кілт әлі жоқ болса KeyError; <code>get(k, 0)</code> немесе <code>Counter</code> қолданыңыз. (2) Тізімді кілт қылу — TypeError: <code>tuple(lst)</code> жасаңыз. (3) set ретсіз екенін ұмыту: «бірінші кездескен» керек болса, тізіммен немесе индекспен жұмыс істеңіз.</div>`,
        exercises: [
          { type: 'python', level: 'easy', xp: 20, prompt: P`<code>two_sum(nums, target)</code> қосындысы <code>target</code> болатын екі элементтің индекстерін <code>(i, j)</code>, <code>i &lt; j</code>, қайтарсын (тек бір жауап бар деп есептеңіз); жоқ болса <code>None</code>. Тест 100 000 элементпен тексереді — dict қолданыңыз.
<pre><code>two_sum([3000, 7000, 1500, 5500], 7000) → (2, 3)
two_sum([4, 4], 8)                     → (0, 1)
two_sum([1, 2], 10)                    → None</code></pre>`,
            starter: P`def two_sum(nums, target):
    pass
`,
            solution: P`def two_sum(nums, target):
    pos = {}
    for i, x in enumerate(nums):
        need = target - x
        if need in pos:
            return (pos[need], i)
        pos[x] = i
    return None
`,
            hints: ['<code>pos = {}</code> — бұрын көрген мән → оның индексі.', 'Алдымен <code>target - x in pos</code> тексеріңіз, сосын ғана <code>pos[x] = i</code>.'],
            check: { tests: P`
_r = two_sum([3000, 7000, 1500, 5500], 7000)
assert _r is not None and tuple(_r) == (2, 3), f'Күтілгені (2, 3), сізде {_r}'
_r = two_sum([4, 4], 8)
assert _r is not None and tuple(_r) == (0, 1), 'Бірдей екі сан: (0, 1)'
assert two_sum([1, 2], 10) is None, 'Жауап жоқ болса None'
assert two_sum([5], 10) is None, 'Элементті өзімен жұптамаңыз'
import time as _time
_n = list(range(1, 5001))
_t0 = _time.perf_counter(); _r = two_sum(_n, 20000); _dt = _time.perf_counter() - _t0
assert _r is None and _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — O(n²) сияқты. dict арқылы O(n) жазыңыз'
_n = list(range(0, 300000, 3)) + [1]
_r = two_sum(_n, 299998)
assert _r is not None and tuple(_r) == (99999, 100000), 'n = 100 000 кезінде дұрыс жұп табылмады'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>first_unique(s)</code> жолда тек бір рет кездесетін <b>бірінші</b> таңбаның индексін қайтарсын; ондай таңба болмаса <code>-1</code>.
<pre><code>first_unique('алматы')  → 1   # 'л'
first_unique('аабб')    → -1</code></pre>`,
            starter: P`def first_unique(s):
    pass
`,
            solution: P`from collections import Counter

def first_unique(s):
    freq = Counter(s)
    for i, ch in enumerate(s):
        if freq[ch] == 1:
            return i
    return -1
`,
            hints: ['Алдымен барлық таңба жиілігін санаңыз (<code>Counter(s)</code>).', 'Сосын жолды басынан қайта аралап, жиілігі 1 болған алғашқы индексті қайтарыңыз.'],
            check: { tests: P`
assert first_unique('алматы') == 1, f"'алматы' үшін 1 ('л'), сізде {first_unique('алматы')}"
assert first_unique('аабб') == -1, 'Бірегей таңба болмаса -1'
assert first_unique('') == -1, 'Бос жол үшін -1'
assert first_unique('z') == 0, 'Бір таңбалы жол үшін 0'
assert first_unique('ababc') == 4, "'ababc' үшін 4"
` } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Қай кілтті Python <code>dict</code>-іне қоюға <b>болмайды</b>?', options: ["'Алматы'", '(43.2, 76.9)', '[1, 2, 3]', '2026'], answer: 2, explain: 'list өзгермелі, сондықтан hash-талмайды (TypeError: unhashable type). tuple, str, int — болады.' },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Анаграммаларды топтаңыз. <code>group_anagrams(words)</code> топтар тізімін қайтарсын: әр топ — бір-бірінің анаграммасы болатын сөздер, сөздердің кірістегі ретімен; топтар өздерінің бірінші сөзінің кірістегі ретімен.
<pre><code>group_anagrams(['аспан', 'тал', 'панас', 'лат', 'нан'])
→ [['аспан', 'панас'], ['тал', 'лат'], ['нан']]</code></pre>`,
            starter: P`def group_anagrams(words):
    groups = {}
    # кілт: сөз әріптерінің сұрыпталған жолы
    return list(groups.values())
`,
            solution: P`def group_anagrams(words):
    groups = {}
    for w in words:
        key = ''.join(sorted(w))
        groups.setdefault(key, []).append(w)
    return list(groups.values())
`,
            hints: ['<code>key = \'\'.join(sorted(w))</code> — анаграммаларда бірдей.', '<code>groups.setdefault(key, []).append(w)</code>; dict кірістіру ретін сақтайды.'],
            check: { tests: P`
_r = group_anagrams(['аспан', 'тал', 'панас', 'лат', 'нан'])
assert _r == [['аспан', 'панас'], ['тал', 'лат'], ['нан']], f'Күтілгені [[аспан, панас], [тал, лат], [нан]], сізде {_r}'
assert group_anagrams(['a', 'a']) == [['a', 'a']], 'Бірдей сөздер бір топта'
assert group_anagrams(['ab', 'ba', 'c']) == [['ab', 'ba'], ['c']], "['ab', 'ba', 'c'] → [['ab', 'ba'], ['c']]"
` } }
        ]
      },
      {
        id: 'dsa-5', title: 'Stack және queue (deque)', minutes: 14,
        body: `
<p><b>Stack</b> (стек) — «соңғы кірген бірінші шығады» (LIFO): табақтар үйіндісі сияқты, тек үстінен қосып, үстінен аламыз. Python-да стек — кәдімгі <code>list</code>: <code>append(x)</code> салады, <code>pop()</code> алады, <code>st[-1]</code> үстіңгісін көрсетеді — бәрі O(1).</p>
<p><b>Queue</b> (кезек) — «бірінші кірген бірінші шығады» (FIFO): ЦОН-дағы кезек сияқты. <code>list.pop(0)</code> — O(n), сондықтан <code>collections.deque</code> қолданамыз: <code>append(x)</code> артқа қосады, <code>popleft()</code> алдынан алады — екеуі де O(1).</p>
<pre><code>from collections import deque
q = deque()
q.append('Айгүл'); q.append('Ерлан'); q.append('Дана')
q.popleft()      # 'Айгүл' — бірінші келген бірінші қызмет алады
len(q)           # 2</code></pre>
<h3>Мысал: жақшалар балансы</h3>
<p>Формулада <code>( [ { } ] )</code> жақшалары дұрыс жабылған ба? Ашылған жақшаны стекке саламыз. Жабылатын жақша келгенде стектің үстінде оның жұбы тұруы керек. Соңында стек бос болуы тиіс.</p>
<pre><code>def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    st = []
    for ch in s:
        if ch in '([{':
            st.append(ch)
        elif ch in pairs:
            if not st or st.pop() != pairs[ch]:
                return False
    return not st

is_valid('{[()]}')   # True
is_valid('([)]')     # False — ( ашылды, бірақ ] келді</code></pre>
<h3>Мысал: жылжымалы терезе кезегі</h3>
<p>Колл-орталық соңғы 3 секундтағы (3000 мс) қоңырау санын білгісі келеді. Уақыттары өсу ретімен келеді. Әр жаңа қоңырауды кезекке қосып, алдынан ескіргендерін (<code>t − 3000</code>-нан ертерек) <code>popleft</code> арқылы алып тастаймыз. Әр қоңырау кезекке бір рет кіріп, бір рет шығады — жалпы O(n).</p>
<div class="tip"><b>Қайда кездеседі:</b> стек — функция шақырулары (call stack), браузердің «Артқа» батырмасы, undo, өрнекті есептеу, DFS. Кезек — тапсырмалар кезегі (Celery, Kafka), BFS, rate limiting. <b>Жиі қате:</b> бос стектен <code>pop()</code> — IndexError; алдымен <code>if st</code> тексеріңіз.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'ЦОН кезегін модельдеу керек: адамдар соңына қосылады, алдынан қызмет алады. Қай құрылым екі операцияны да O(1)-де жасайды?', options: ['list: append + pop(0)', 'collections.deque: append + popleft', 'set: add + pop', 'str: + және [1:]'], answer: 1, explain: 'deque екі шетінен де O(1) қосу/алу береді. list.pop(0) — O(n), set ретсіз.' },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>is_valid(s)</code>: жолдағы <code>()</code>, <code>[]</code>, <code>{}</code> жақшалары дұрыс ашылып-жабылса <code>True</code>. Басқа таңбаларды елемеңіз. Стек қолданыңыз.
<pre><code>is_valid('{[()]}')      → True
is_valid('([)]')        → False
is_valid('f(x[0]) + 1') → True
is_valid('((')          → False</code></pre>`,
            starter: P`def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    st = []
    pass
`,
            solution: P`def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    st = []
    for ch in s:
        if ch in '([{':
            st.append(ch)
        elif ch in pairs:
            if not st or st.pop() != pairs[ch]:
                return False
    return not st
`,
            hints: ['Ашылатын жақшаны <code>st.append(ch)</code>; жабылатынында стек бос па, үстіндегісі жұбы ма — тексеріңіз.', 'Соңында <code>return not st</code> — ашық қалған жақша болмауы керек.'],
            check: { tests: P`
assert is_valid('{[()]}') is True, "'{[()]}' дұрыс"
assert is_valid('([)]') is False, "'([)]' дұрыс емес: жабылу реті бұзылған"
assert is_valid('f(x[0]) + 1') is True, 'Басқа таңбаларды елемеңіз'
assert is_valid('((') is False, 'Ашық қалған жақша болса False'
assert is_valid(')') is False, 'Бос стекпен жабылатын жақша — False (IndexError емес)'
assert is_valid('') is True, 'Бос жол дұрыс'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Кері поляк жазбасы (RPN): <code>['2', '3', '+', '4', '*']</code> = (2 + 3) × 4 = 20. Сандарды стекке салыңыз; амал келгенде екі санды алып, нәтижені қайта салыңыз. <code>eval_rpn(tokens)</code> бүтін сан қайтарсын. Бөлу нөлге қарай қиылады: <code>int(a / b)</code>.
<pre><code>eval_rpn(['2', '3', '+', '4', '*'])       → 20
eval_rpn(['10', '3', '-'])                → 7
eval_rpn(['7', '-2', '/'])                → -3</code></pre>`,
            starter: P`def eval_rpn(tokens):
    st = []
    pass
`,
            solution: P`def eval_rpn(tokens):
    st = []
    for t in tokens:
        if t in ('+', '-', '*', '/'):
            b = st.pop()
            a = st.pop()
            if t == '+':
                st.append(a + b)
            elif t == '-':
                st.append(a - b)
            elif t == '*':
                st.append(a * b)
            else:
                st.append(int(a / b))
        else:
            st.append(int(t))
    return st[-1]
`,
            hints: ['Амал келгенде алдымен <code>b = st.pop()</code>, сосын <code>a = st.pop()</code> — рет маңызды (<code>a - b</code>).', "Санды <code>int(t)</code> арқылы салыңыз; '-2' — теріс сан, амал емес."],
            check: { tests: P`
assert eval_rpn(['2', '3', '+', '4', '*']) == 20, 'Күтілгені 20'
assert eval_rpn(['10', '3', '-']) == 7, "['10', '3', '-'] → 7 (10 − 3, керісінше емес)"
assert eval_rpn(['7', '-2', '/']) == -3, '7 / −2 = −3.5 → нөлге қарай −3'
assert eval_rpn(['42']) == 42, 'Бір сан — өзі'
assert eval_rpn(['4', '13', '5', '/', '+']) == 6, '4 + 13 / 5 = 4 + 2 = 6'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Колл-орталыққа <code>CallCounter</code> класын жазыңыз. <code>ping(t)</code> — <code>t</code> миллисекундта қоңырау түсті (уақыттар өсу ретімен келеді); әдіс <code>[t − 3000, t]</code> аралығындағы қоңырау санын (осыны қоса) қайтарсын. <code>deque</code> қолданыңыз: тест 100 000 қоңырау жібереді.
<pre><code>c = CallCounter()
c.ping(1)     → 1
c.ping(100)   → 2
c.ping(3001)  → 3
c.ping(3002)  → 3   # 1 мс-тегі қоңырау терезеден шықты</code></pre>`,
            starter: P`from collections import deque

class CallCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t):
        pass
`,
            solution: P`from collections import deque

class CallCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t):
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)
`,
            hints: ['Жаңа уақытты <code>self.q.append(t)</code>.', '<code>while self.q[0] &lt; t - 3000: self.q.popleft()</code>, сосын <code>len(self.q)</code>.'],
            check: { tests: P`
_c = CallCounter()
_r = [_c.ping(1), _c.ping(100), _c.ping(3001), _c.ping(3002)]
assert _r == [1, 2, 3, 3], f'Күтілгені [1, 2, 3, 3], сізде {_r}'
_c = CallCounter()
assert _c.ping(5000) == 1 and _c.ping(9000) == 1, 'Терезеден шыққан қоңырау саналмайды'
_c = CallCounter()
assert _c.ping(10) == 1 and _c.ping(10) == 2, 'Бір уақыттағы екі қоңырау екеуі де саналады'
import time as _time
_c = CallCounter(); _t0 = _time.perf_counter()
for _t in range(0, 5000000, 1000):
    _c.ping(_t)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'5000 қоңырау {_dt:.2f} с алды — әр ping барлық тарихты қарап шықпауы керек. deque-ден ескілерін popleft() арқылы алыңыз'
_c = CallCounter()
_t0 = _time.perf_counter()
for _t in range(0, 100000):
    _last = _c.ping(_t)
_dt = _time.perf_counter() - _t0
assert _last == 3001, f'100 000 қоңыраудан кейін терезеде 3001 болуы керек, сізде {_last}'
assert _dt < 3, f'{_dt:.2f} с — тым баяу. Ескі уақыттарды deque.popleft() арқылы алыңыз'
` } }
        ]
      },
      {
        id: 'dsa-6', title: 'Linked list: байланысқан тізім', minutes: 15,
        body: `
<p><b>Linked list</b> — әр түйін (node) мәнді және келесі түйінге сілтемені сақтайтын тізбек. Массивтен айырмасы: элементтер жадта қатар тұрмайды, сондықтан <code>k</code>-шы элементке жету үшін басынан <code>k</code> қадам жүру керек — O(n). Есесіне басына қосу, белгілі түйіннен кейін кірістіру немесе өшіру — O(1): тек сілтемелерді ауыстырамыз.</p>
<pre><code>class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# 1 → 2 → 3
head = Node(1, Node(2, Node(3)))
cur = head
while cur:               # аралау: O(n)
    print(cur.val)
    cur = cur.next</code></pre>
<table>
<tr><th>Операция</th><th>list (массив)</th><th>linked list</th></tr>
<tr><td>k-шы элемент</td><td>O(1)</td><td>O(k)</td></tr>
<tr><td>Басына қосу</td><td>O(n)</td><td>O(1)</td></tr>
<tr><td>Соңына қосу</td><td>O(1)</td><td>O(1), егер <code>tail</code> сақтасақ</td></tr>
</table>
<h3>Мысал: тізімді аудару</h3>
<p>Классикалық есеп — сілтемелерді кері бағыттау. Үш айнымалы ұстаймыз: <code>prev</code> (аударылған бөліктің басы), <code>cur</code> (қазіргі түйін), <code>nxt</code> (келесісін жоғалтпау үшін).</p>
<pre><code>def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next     # 1) келесіні сақтаймыз
        cur.next = prev    # 2) сілтемені кері бұрамыз
        prev = cur         # 3) prev алға
        cur = nxt          # 4) cur алға
    return prev            # жаңа бас</code></pre>
<h3>Екі жылдамдықты көрсеткіш</h3>
<p>Тізімде цикл бар ма (соңғы түйін бұрынғы түйінге сілтейді ме)? Floyd әдісі: <code>slow</code> бір қадам, <code>fast</code> екі қадам жүреді. Цикл болса, олар міндетті түрде кездеседі; болмаса, <code>fast</code> <code>None</code>-ға жетеді. Қосымша жад — O(1). Дәл осы тәсілмен тізімнің ортасын да табады: <code>fast</code> соңына жеткенде, <code>slow</code> ортада.</p>
<div class="tip"><b>Шын өмірде:</b> Python-да linked list-ті сирек өзіңіз жазасыз — <code>deque</code> іштей соған ұқсас құрылым. Бірақ сұхбатта (interview) жиі сұралады, және LRU кэш, браузер тарихы сияқты құрылымдардың негізі. <b>Жиі қате:</b> <code>cur.next = prev</code> жасамас бұрын <code>cur.next</code>-ті сақтамау — тізімнің қалғаны жоғалады.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: '1 000 000 түйінді linked list-тің 500 000-шы элементін алудың күрделілігі қандай?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2, explain: 'Индекс жоқ: басынан сілтемелер бойынша k қадам жүру керек, яғни O(k) = O(n).' },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>LinkedList</code> класын аяқтаңыз. <code>head</code> мен <code>tail</code> сақтаңыз, сонда барлық әдіс O(1) болады (<code>to_list</code>-тен басқа):
<ul><li><code>push_front(x)</code> — басына қосу;</li><li><code>push_back(x)</code> — соңына қосу;</li><li><code>pop_front()</code> — бірінші мәнді алып тастап, қайтару (бос болса <code>None</code>);</li><li><code>__len__()</code> және <code>to_list()</code>.</li></ul>
<pre><code>ll = LinkedList()
ll.push_back(2); ll.push_back(3); ll.push_front(1)
ll.to_list()     → [1, 2, 3]
ll.pop_front()   → 1
len(ll)          → 2</code></pre>`,
            starter: P`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def push_front(self, x):
        pass

    def push_back(self, x):
        pass

    def pop_front(self):
        pass

    def __len__(self):
        return self.size

    def to_list(self):
        out = []
        cur = self.head
        while cur:
            out.append(cur.val)
            cur = cur.next
        return out
`,
            solution: P`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def push_front(self, x):
        self.head = Node(x, self.head)
        if self.tail is None:
            self.tail = self.head
        self.size += 1

    def push_back(self, x):
        node = Node(x)
        if self.tail is None:
            self.head = self.tail = node
        else:
            self.tail.next = node
            self.tail = node
        self.size += 1

    def pop_front(self):
        if self.head is None:
            return None
        val = self.head.val
        self.head = self.head.next
        if self.head is None:
            self.tail = None
        self.size -= 1
        return val

    def __len__(self):
        return self.size

    def to_list(self):
        out = []
        cur = self.head
        while cur:
            out.append(cur.val)
            cur = cur.next
        return out
`,
            hints: ['Бос тізімге бірінші элемент қосылғанда <code>head</code> да, <code>tail</code> да сол түйін болады.', '<code>pop_front</code>-тан кейін тізім босаса, <code>tail = None</code> етуді ұмытпаңыз.'],
            check: { tests: P`
_l = LinkedList()
_l.push_back(2); _l.push_back(3); _l.push_front(1)
assert _l.to_list() == [1, 2, 3], f'Күтілгені [1, 2, 3], сізде {_l.to_list()}'
assert len(_l) == 3, 'len 3 болуы керек'
assert _l.pop_front() == 1 and _l.to_list() == [2, 3] and len(_l) == 2, 'pop_front 1-ді қайтарып, [2, 3] қалдыруы керек'
assert _l.pop_front() == 2 and _l.pop_front() == 3, 'pop_front рет-ретімен 2, 3'
assert _l.pop_front() is None and len(_l) == 0, 'Бос тізімнен pop_front None қайтарады'
_l.push_back(9)
assert _l.to_list() == [9] and _l.head is _l.tail, 'Босаған тізімге push_back: head пен tail бір түйін'
_l2 = LinkedList(); _l2.push_front(5); _l2.push_back(6)
assert _l2.to_list() == [5, 6], 'push_front-тан кейін push_back дұрыс жұмыс істеуі керек (tail орнатылуы керек)'
import time as _time
_l3 = LinkedList(); _t0 = _time.perf_counter()
for _i in range(8000):
    _l3.push_back(_i)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'8000 push_back {_dt:.2f} с алды — тізімді басынан аралап жатырсыз. tail сілтемесін қолданып, O(1) жасаңыз'
_l3 = LinkedList(); _t0 = _time.perf_counter()
for _i in range(50000):
    _l3.push_back(_i)
assert _time.perf_counter() - _t0 < 2 and len(_l3) == 50000, 'push_back O(1) болуы керек: tail сілтемесін қолданыңыз'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>reverse_list(head)</code> тізімді <b>орнында</b> аударып, жаңа басын қайтарсын (жаңа түйін жасамаңыз). Бос тізім (<code>None</code>) үшін <code>None</code>.
<pre><code>1 → 2 → 3 → None   ⇒   3 → 2 → 1 → None</code></pre>`,
            starter: P`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    cur = head
    # сілтемелерді кері бұрыңыз
    return head
`,
            solution: P`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev
`,
            hints: ['Цикл ішінде: <code>nxt = cur.next</code>, <code>cur.next = prev</code>, <code>prev = cur</code>, <code>cur = nxt</code>.', 'Соңында <code>prev</code> — жаңа бас.'],
            check: { tests: P`
def _mk(vals):
    h = None
    for v in reversed(vals):
        h = Node(v, h)
    return h
def _tl(h):
    out = []
    while h:
        out.append(h.val); h = h.next
    return out
_h = _mk([1, 2, 3]); _nodes = [_h, _h.next, _h.next.next]
_r = reverse_list(_h)
assert _tl(_r) == [3, 2, 1], f'Күтілгені [3, 2, 1], сізде {_tl(_r)}'
assert _r is _nodes[2], 'Жаңа түйін жасамаңыз: бұрынғы соңғы түйін жаңа бас болуы керек'
assert reverse_list(None) is None, 'Бос тізім үшін None'
assert _tl(reverse_list(_mk([7]))) == [7], 'Бір түйінді тізім өзгермейді'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>has_cycle(head)</code>: тізімде цикл болса <code>True</code>. Floyd әдісін қолданыңыз: <code>slow</code> бір қадам, <code>fast</code> екі қадам; олар кездессе — цикл бар. Қосымша жад O(1) болсын (set-ке түйін жинамаңыз).`,
            starter: P`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    slow = fast = head
    pass
`,
            solution: P`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
`,
            hints: ['<code>while fast and fast.next:</code> — fast соңына жетсе, цикл жоқ.', 'Салыстыруда <code>slow is fast</code> (бір түйін бе), мәнмен емес.'],
            check: { tests: P`
_a = Node(1, Node(2, Node(3, Node(4))))
assert has_cycle(_a) is False, '1→2→3→4 тізімінде цикл жоқ'
_last = _a.next.next.next; _last.next = _a.next
assert has_cycle(_a) is True, '4 → 2 сілтемесі цикл жасайды'
assert has_cycle(None) is False, 'Бос тізімде цикл жоқ'
_s = Node(1); _s.next = _s
assert has_cycle(_s) is True, 'Өзіне сілтейтін бір түйін — цикл'
_d = Node(5, Node(5, Node(5)))
assert has_cycle(_d) is False, 'Мәндер бірдей болғанымен цикл жоқ: түйіндерді is арқылы салыстырыңыз'
`, mustInclude: ['fast'] } }
        ]
      },
      {
        id: 'dsa-7', title: 'Рекурсия және backtracking', minutes: 16,
        body: `
<p><b>Рекурсия</b> — функцияның өзін-өзі шақыруы. Әр рекурсивті функцияда екі бөлік бар: <b>базалық жағдай</b> (бұдан әрі бөлінбейтін, жауабы белгілі кіші есеп) және <b>рекурсивті қадам</b> (есепті кішірек дәл сондай есепке келтіру).</p>
<pre><code>def digit_sum(n):
    if n &lt; 10:                       # базалық жағдай
        return n
    return n % 10 + digit_sum(n // 10)  # соңғы цифр + қалғанының қосындысы

digit_sum(2026)   # 6 + digit_sum(202) = 6 + 2 + digit_sum(20) = … = 10</code></pre>
<p>Әр шақыру <b>call stack</b>-ке жаңа «қабат» қосады. Базалық жағдай жоқ немесе оған жетпесек, стек толады — <code>RecursionError</code>. Python-да тереңдік шегі шамамен 1000, сондықтан 10⁵ тереңдіктегі рекурсия орнына цикл жазамыз.</p>
<h3>Backtracking: барлық нұсқаны құру</h3>
<p>Backtracking — шешімді қадам-қадаммен құрып, әр қадамда таңдау жасап, тереңге кіріп, сосын таңдауды <b>қайтарып алу</b>. Мысал: Kaspi Red-тағы 3 тауардан {телефон, құлаққап, қап} сатып алудың барлық жиынын тізу. Әр тауар үшін екі таңдау: аламыз / алмаймыз → 2³ = 8 ішкі жиын.</p>
<pre><code>def subsets(items):
    res, cur = [], []
    def go(i):
        if i == len(items):          # барлық тауар бойынша шештік
            res.append(cur[:])       # көшірмесін сақтаймыз!
            return
        cur.append(items[i])         # таңдау: аламыз
        go(i + 1)
        cur.pop()                    # таңдауды қайтарамыз
        go(i + 1)                    # таңдау: алмаймыз
    go(0)
    return res</code></pre>
<p>Ішкі жиын саны 2ⁿ, сондықтан бұл O(n · 2ⁿ) — n = 20 шамасында ғана жарайды. Backtracking-тің күші — <b>кесу</b> (pruning): жарамсыз жолға кірмей тоқтау. Мысалы, жақшалар генерациясында жабылатын жақшаны ашылғандардан көп қоймаймыз.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>res.append(cur)</code> — көшірме емес, бір тізімге сілтеме; соңында бәрі бос болып шығады. <code>cur[:]</code> жазыңыз. (2) Таңдауды қайтармау (<code>cur.pop()</code>). (3) Базалық жағдайды ұмыту.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Бұл функцияны <code>f(5)</code> деп шақырсақ не болады?<pre><code>def f(n):\n    return n * f(n - 1)</code></pre>', options: ['120 қайтарады', '0 қайтарады', 'RecursionError: базалық жағдай жоқ', 'None қайтарады'], answer: 2, explain: 'Тоқтау шарты жоқ: f(5) → f(4) → … → f(−1000) … стек толып, RecursionError шығады. if n &lt;= 1: return 1 керек.' },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>digit_sum(n)</code> теріс емес бүтін санның цифрлар қосындысын <b>рекурсия</b> арқылы есептесін (цикл мен <code>str</code> қолданбаңыз).
<pre><code>digit_sum(2026) → 10
digit_sum(7)    → 7
digit_sum(0)    → 0</code></pre>`,
            starter: P`def digit_sum(n):
    pass
`,
            solution: P`def digit_sum(n):
    if n < 10:
        return n
    return n % 10 + digit_sum(n // 10)
`,
            hints: ['Базалық жағдай: <code>n &lt; 10</code> болса, <code>n</code>-нің өзі.', 'Рекурсивті қадам: <code>n % 10 + digit_sum(n // 10)</code>.'],
            check: { tests: P`
assert digit_sum(2026) == 10, f'digit_sum(2026) = 10, сізде {digit_sum(2026)}'
assert digit_sum(7) == 7 and digit_sum(0) == 0, 'Бір цифрлы сан — өзі'
assert digit_sum(99999) == 45, 'digit_sum(99999) = 45'
assert 'digit_sum' in digit_sum.__code__.co_names, 'Функция өзін-өзі шақыруы керек (рекурсия)'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>subsets(items)</code> тізімнің барлық ішкі жиындарын backtracking арқылы қайтарсын (әр ішкі жиын — тізім, элементтер бастапқы ретімен). Ішкі жиындардың өз реті маңызды емес.
<pre><code>subsets(['телефон', 'қап'])
→ [['телефон', 'қап'], ['телефон'], ['қап'], []]   # кез келген ретпен</code></pre>`,
            starter: P`def subsets(items):
    res, cur = [], []
    def go(i):
        pass
    go(0)
    return res
`,
            solution: P`def subsets(items):
    res, cur = [], []
    def go(i):
        if i == len(items):
            res.append(cur[:])
            return
        cur.append(items[i])
        go(i + 1)
        cur.pop()
        go(i + 1)
    go(0)
    return res
`,
            hints: ['Базалық жағдай <code>i == len(items)</code>: <code>res.append(cur[:])</code>.', 'Алдымен <code>cur.append(items[i]); go(i + 1); cur.pop()</code>, сосын алмай <code>go(i + 1)</code>.'],
            check: { tests: P`
_r = subsets(['телефон', 'қап'])
assert sorted(map(tuple, _r)) == sorted([('телефон', 'қап'), ('телефон',), ('қап',), ()]), f'Төрт ішкі жиын күтілді, сізде {_r}'
assert subsets([]) == [[]], 'Бос тізімнің жалғыз ішкі жиыны — []'
_r = subsets([1, 2, 3, 4])
assert len(_r) == 16 and len(set(map(tuple, _r))) == 16, f'4 элементтен 16 түрлі ішкі жиын, сізде {len(_r)}. cur[:] көшірмесін сақтаңыз'
assert all(list(s) == sorted(s) for s in _r), 'Элементтер бастапқы ретімен тұруы керек'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>gen_parens(n)</code> — <code>n</code> жұп жақшадан құралған барлық дұрыс тізбекті <b>сұрыпталған</b> тізім ретінде қайтарсын. Кесу ережесі: ашылған саны <code>&lt; n</code> болса <code>(</code> қоюға болады; жабылғаны ашылғаннан аз болса <code>)</code> қоюға болады.
<pre><code>gen_parens(2) → ['(())', '()()']
gen_parens(3) → ['((()))', '(()())', '(())()', '()(())', '()()()']</code></pre>`,
            starter: P`def gen_parens(n):
    res = []
    def go(s, opened, closed):
        pass
    go('', 0, 0)
    return sorted(res)
`,
            solution: P`def gen_parens(n):
    res = []
    def go(s, opened, closed):
        if len(s) == 2 * n:
            res.append(s)
            return
        if opened < n:
            go(s + '(', opened + 1, closed)
        if closed < opened:
            go(s + ')', opened, closed + 1)
    go('', 0, 0)
    return sorted(res)
`,
            hints: ['Базалық жағдай: <code>len(s) == 2 * n</code>.', 'Екі тармақ: <code>if opened &lt; n</code> және <code>if closed &lt; opened</code>.'],
            check: { tests: P`
assert gen_parens(2) == ['(())', '()()'], f'gen_parens(2) = [(()), ()()], сізде {gen_parens(2)}'
assert gen_parens(3) == ['((()))', '(()())', '(())()', '()(())', '()()()'], 'gen_parens(3) бес тізбек береді'
assert gen_parens(1) == ['()'], "gen_parens(1) = ['()']"
assert len(gen_parens(8)) == 1430, 'n = 8 үшін 1430 тізбек (Каталан саны) болуы керек'
` } }
        ]
      },
      {
        id: 'dsa-8', title: 'Binary search: екіге бөліп іздеу', minutes: 16,
        body: `
<p>Сұрыпталған тізімнен мән іздеу үшін әр элементті қарау (O(n)) міндетті емес. <b>Binary search</b> ортаңғы элементке қарайды: іздегеніміз одан үлкен болса — оң жартысында, кіші болса — сол жартысында. Әр қадамда іздеу аймағы екі есе кішірейеді, сондықтан 1 000 000 элементте ең көбі ~20 қадам: O(log n).</p>
<pre><code>def binary_search(a, x):
    lo, hi = 0, len(a) - 1
    while lo &lt;= hi:
        mid = (lo + hi) // 2
        if a[mid] == x:
            return mid
        if a[mid] &lt; x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1</code></pre>
<h3>Шекараны іздеу (lower bound)</h3>
<p>Көбіне «бар ма?» емес, «<code>x</code>-тен кіші емес бірінші элемент қай жерде?» деген сұрақ қойылады. Мысалы, бағасы бойынша сұрыпталған тауарлардан 15 000 ₸-ден басталатынның біріншісі. Жарты ашық аралықпен <code>[lo, hi)</code> жазу ыңғайлы:</p>
<pre><code>def lower_bound(a, x):
    lo, hi = 0, len(a)
    while lo &lt; hi:
        mid = (lo + hi) // 2
        if a[mid] &lt; x:
            lo = mid + 1
        else:
            hi = mid
    return lo        # барлығы x-тен кіші болса, len(a)</code></pre>
<p>Python-да дайын нұсқасы бар: <code>bisect.bisect_left(a, x)</code> — дәл осы, <code>bisect_right</code> — <code>x</code>-тен үлкен бірінші орын.</p>
<h3>Жауап бойынша binary search</h3>
<p>Ең күшті қолданысы: жауапты тікелей іздемей, «<code>C</code> мәні жарай ма?» деген тексеру функциясын жазамыз. Егер <code>C</code> жараса, одан үлкендері де жарайтын болса (монотондық), ең кіші жарайтын <code>C</code>-ны binary search-пен табамыз. Мысал: Алматыдан Астанаға жүктерді <b>берілген ретпен</b> <code>D</code> күнде жеткізу керек; күнделікті сыйымдылық кемінде қанша? Сыйымдылық <code>C</code> берілсе, неше күн керегін ашкөз (greedy) түрде O(n)-де санаймыз. Ізделетін аралық: <code>[max(weights), sum(weights)]</code>. Барлығы O(n log S).</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>lo &lt;= hi</code> мен <code>lo &lt; hi</code>-ді, <code>hi = mid</code> мен <code>hi = mid − 1</code>-ді араластыру — шексіз цикл. Бір үлгіні таңдап, соған берік болыңыз. (2) Сұрыпталмаған тізімде binary search қолдану.</div>`,
        exercises: [
          { type: 'number', level: 'easy', xp: 10, prompt: '1 000 000 сұрыпталған элементте binary search ең көп дегенде неше салыстыру (ортаңғы элементке қарау) жасайды? Бүтін санмен жазыңыз.', answer: 20, tol: 0, explain: '2²⁰ = 1 048 576 ≥ 1 000 000, сондықтан ⌈log₂ 1 000 000⌉ = 20 қадам жеткілікті.' },
          { type: 'python', level: 'easy', xp: 20, prompt: P`<code>binary_search(a, x)</code>: сұрыпталған <code>a</code>-да <code>x</code>-тің индексін қайтарсын, жоқ болса <code>-1</code>. <code>in</code>, <code>index</code>, <code>bisect</code> қолданбай, өзіңіз жазыңыз. Тест 100 000 элементте мыңдаған сұраумен тексереді.
<pre><code>binary_search([1200, 3400, 5600, 9900], 5600) → 2
binary_search([1200, 3400], 1000)             → -1</code></pre>`,
            starter: P`def binary_search(a, x):
    lo, hi = 0, len(a) - 1
    pass
`,
            solution: P`def binary_search(a, x):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == x:
            return mid
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
            hints: ['<code>while lo &lt;= hi:</code>, <code>mid = (lo + hi) // 2</code>.', '<code>a[mid] &lt; x</code> болса <code>lo = mid + 1</code>, үлкен болса <code>hi = mid - 1</code>.'],
            check: { tests: P`
assert binary_search([1200, 3400, 5600, 9900], 5600) == 2, 'Күтілгені 2'
assert binary_search([1200, 3400], 1000) == -1, 'Жоқ мән үшін -1'
assert binary_search([], 5) == -1, 'Бос тізім үшін -1'
assert binary_search([7], 7) == 0 and binary_search([7], 8) == -1, 'Бір элементті тізім'
assert binary_search([1, 3, 5, 7, 9], 1) == 0 and binary_search([1, 3, 5, 7, 9], 9) == 4, 'Шеткі элементтер де табылуы керек'
import time as _time, random as _random
_R = _random.Random(1)
_a = list(range(0, 200000, 2))
_qs = [_R.randrange(0, 200000) for _ in range(300)]
_t0 = _time.perf_counter()
for _q in _qs:
    binary_search(_a, _q)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'300 сұрау {_dt:.2f} с алды — сызықтық іздеу сияқты. O(log n) binary search жазыңыз'
_qs = [_R.randrange(0, 200000) for _ in range(5000)]
_t0 = _time.perf_counter()
_res = [binary_search(_a, _q) for _q in _qs]
_dt = _time.perf_counter() - _t0
assert all((_r == _q // 2) if _q % 2 == 0 else _r == -1 for _r, _q in zip(_res, _qs)), 'Үлкен тізімде жауаптар қате'
assert _dt < 1.0, f'5000 сұрау {_dt:.2f} с алды — сызықтық іздеу сияқты. O(log n) binary search жазыңыз'
`, mustInclude: ['while'] } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>lower_bound(a, x)</code>: сұрыпталған <code>a</code>-да <code>a[i] &gt;= x</code> болатын <b>ең кіші</b> <code>i</code>-ді қайтарсын; ондай жоқ болса <code>len(a)</code>. Қайталанатын мәндер болуы мүмкін.
<pre><code>lower_bound([5000, 8000, 8000, 15000, 22000], 8000)  → 1
lower_bound([5000, 8000, 8000, 15000, 22000], 9000)  → 3
lower_bound([5000, 8000], 30000)                     → 2</code></pre>`,
            starter: P`def lower_bound(a, x):
    lo, hi = 0, len(a)
    pass
`,
            solution: P`def lower_bound(a, x):
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo
`,
            hints: ['Жарты ашық аралық: <code>while lo &lt; hi</code>.', '<code>a[mid] &lt; x</code> болса <code>lo = mid + 1</code>, әйтпесе <code>hi = mid</code>; соңында <code>lo</code>.'],
            check: { tests: P`
_a = [5000, 8000, 8000, 15000, 22000]
assert lower_bound(_a, 8000) == 1, f'8000 үшін 1 (бірінші 8000), сізде {lower_bound(_a, 8000)}'
assert lower_bound(_a, 9000) == 3, '9000 үшін 3'
assert lower_bound(_a, 1) == 0, 'Барлығынан кіші x үшін 0'
assert lower_bound([5000, 8000], 30000) == 2, 'Барлығынан үлкен x үшін len(a)'
assert lower_bound([], 3) == 0, 'Бос тізім үшін 0'
assert lower_bound([2, 2, 2, 2], 2) == 0, 'Барлығы бірдей болса, 0'
import bisect as _bisect, random as _random
_R = _random.Random(2)
_b = sorted(_R.randrange(100) for _ in range(300))
assert all(lower_bound(_b, _x) == _bisect.bisect_left(_b, _x) for _x in range(-1, 102)), 'Кездейсоқ тізімде bisect_left-пен сәйкес келмейді'
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`Жүктер Алматыдан Астанаға <b>берілген ретпен</b> жөнелтіледі (ретін ауыстыруға болмайды). Бір күнде жүк көлігі жалпы салмағы <code>C</code>-дан аспайтын қатар тұрған жүктерді алады. <code>min_capacity(weights, days)</code> — барлық жүкті <code>days</code> күнде жеткізуге жететін ең кіші <code>C</code>. Жауап бойынша binary search қолданыңыз: тест 100 000 жүкпен тексереді.
<pre><code>min_capacity([3, 2, 2, 4, 1, 4], 3)            → 6   # [3,2] [2,4] [1,4]
min_capacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) → 15
min_capacity([10, 50], 5)                      → 50</code></pre>`,
            starter: P`def min_capacity(weights, days):
    def days_needed(cap):
        pass
    lo, hi = max(weights), sum(weights)
    pass
`,
            solution: P`def min_capacity(weights, days):
    def days_needed(cap):
        d, load = 1, 0
        for w in weights:
            if load + w > cap:
                d += 1
                load = 0
            load += w
        return d
    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if days_needed(mid) <= days:
            hi = mid
        else:
            lo = mid + 1
    return lo
`,
            hints: ['<code>days_needed(cap)</code>: жүктерді ретімен қосып, <code>cap</code>-тен асса жаңа күн бастаңыз.', 'Binary search <code>[max(weights), sum(weights)]</code> аралығында: <code>days_needed(mid) &lt;= days</code> болса <code>hi = mid</code>, әйтпесе <code>lo = mid + 1</code>.'],
            check: { tests: P`
assert min_capacity([3, 2, 2, 4, 1, 4], 3) == 6, f'Күтілгені 6, сізде {min_capacity([3, 2, 2, 4, 1, 4], 3)}'
assert min_capacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) == 15, 'Күтілгені 15'
assert min_capacity([10, 50], 5) == 50, 'Ең ауыр жүктен кіші бола алмайды'
assert min_capacity([5, 5, 5], 1) == 15, 'Бір күнде барлығын: қосынды'
import time as _time, random as _random
_R = _random.Random(3)
_w = [_R.randint(1, 1000) for _ in range(200)]
_t0 = _time.perf_counter(); _c = min_capacity(_w, 2); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'200 жүк үшін {_dt:.2f} с — сыйымдылықтарды бір-бірлеп тексермей, binary search қолданыңыз'
_w = [_R.randint(1, 10000) for _ in range(100000)]
_t0 = _time.perf_counter(); _c = min_capacity(_w, 700); _dt = _time.perf_counter() - _t0
def _need(cap):
    d, load = 1, 0
    for w in _w:
        if load + w > cap:
            d += 1; load = 0
        load += w
    return d
assert _need(_c) <= 700 and _need(_c - 1) > 700, 'n = 100 000 кезінде табылған C ең кіші емес немесе жарамсыз'
assert _dt < 5, f'{_dt:.2f} с — тым баяу. Сыйымдылықтарды бір-бірлеп тексермей, binary search қолданыңыз'
` } }
        ]
      },
      {
        id: 'dsa-9', title: 'Сұрыптау: insertion, merge, quick және key', minutes: 18,
        body: `
<p>Сұрыптау — көп алгоритмнің бірінші қадамы: сұрыпталған тізімде binary search, екі көрсеткіш, қайталануды табу оңай. Негізгі идеяларды білу маңызды, ал практикада Python-ның <code>sorted</code> / <code>list.sort</code> (Timsort, O(n log n), тұрақты) қолданылады.</p>
<h3>Қарапайым O(n²) әдістер</h3>
<p><b>Bubble sort</b> көршілерді салыстырып, үлкенін оңға «көпіршіктетеді». <b>Insertion sort</b> карталарды қолға алғандай: әр жаңа элементті сол жақтағы сұрыпталған бөліктегі орнына кірістіреді. Екеуі де ең нашар жағдайда O(n²), бірақ insertion sort дерлік сұрыпталған тізімде O(n)-ге жақын жұмыс істейді.</p>
<h3>Merge sort: бөл де билей бер</h3>
<pre><code>def merge_sort(a):
    if len(a) &lt;= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i &lt; len(left) and j &lt; len(right):   # екі сұрыпталған тізімді біріктіру
        if left[i] &lt;= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out.extend(left[i:]); out.extend(right[j:])
    return out</code></pre>
<p>Тізім log n рет екіге бөлінеді, әр деңгейде біріктіру барлығы O(n) — жалпы <b>O(n log n)</b>, әрқашан. <code>&lt;=</code> белгісі тең элементтердің бастапқы ретін сақтайды — бұл <b>тұрақтылық</b> (stability).</p>
<h3>Quicksort</h3>
<p>Тірек элемент (pivot) таңдап, тізімді «кішілер / теңдер / үлкендер» деп бөледі де, бөліктерді рекурсивті сұрыптайды. Орташа O(n log n), бірақ pivot әрдайым ең кіші/үлкен болса (мысалы, сұрыпталған тізімде бірінші элементті алсақ) — O(n²). Сондықтан pivot кездейсоқ таңдалады.</p>
<h3>Python-да key арқылы сұрыптау</h3>
<pre><code>students = [('Айгерім', 92), ('Бауыржан', 85), ('Әлия', 92), ('Данияр', 78)]
# Ұпай бойынша кемуі, тең болса аты бойынша өсуі
sorted(students, key=lambda r: (-r[1], r[0]))
# [('Айгерім', 92), ('Әлия', 92), ('Бауыржан', 85), ('Данияр', 78)]</code></pre>
<p>Кортеж-кілт бірінші элемент бойынша, тең болса екіншісі бойынша салыстырылады. Сандық өрісті кему ретімен алу үшін алдына минус қоямыз. Ескерту: қазақ әріптерінің Unicode реті әліпбилік ретпен толық сәйкес келмейді (<code>'Ә'</code> кодтары кириллицадан кейін тұр), шын жобада арнайы кілт керек.</p>
<div class="tip"><b>Есте сақтаңыз:</b> салыстыруға негізделген кез келген сұрыптау ең нашар жағдайда кемінде ~n log n салыстыру жасайды. Ал мәндер шағын аралықта болса (мысалы, 0–100 ұпай), <b>counting sort</b> O(n + k)-де сұрыптайды.</div>`,
        exercises: [
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Quicksort pivot ретінде әрдайым <b>бірінші</b> элементті алады. Қай кірісте ол ең баяу (O(n²)) жұмыс істейді?', options: ['Кездейсоқ араластырылған тізім', 'Бұрыннан сұрыпталған тізім', 'Барлық элементі әртүрлі тізім', 'Ұзындығы жұп тізім'], answer: 1, explain: 'Сұрыпталған тізімде бірінші элемент — ең кішісі: бір бөлік бос, екіншісінде n−1 элемент қалады. Тереңдік n, жалпы O(n²).' },
          { type: 'number', level: 'medium', xp: 10, prompt: 'Insertion sort [4, 3, 2, 1] тізімін сұрыптағанда көршілерді неше рет орын ауыстырады? (Бұл тізімдегі инверсиялар саны — i &lt; j, бірақ a[i] &gt; a[j] болатын жұптар.)', answer: 6, tol: 0, explain: 'Әр жұп теріс ретте: 4·3/2 = 6 инверсия, insertion sort әрқайсысын бір алмастырумен түзейді.' },
          { type: 'python', level: 'easy', xp: 15, prompt: P`Олимпиада нәтижелері <code>(аты, ұпайы)</code> кортеждері түрінде берілген. <code>rank(rows)</code> оларды ұпай бойынша <b>кему</b>, тең ұпайда аты бойынша <b>өсу</b> ретімен сұрыпталған жаңа тізім қайтарсын. <code>sorted</code> мен <code>key</code> қолданыңыз.
<pre><code>rank([('Бауыржан', 85), ('Ерлан', 92), ('Айгерім', 92)])
→ [('Айгерім', 92), ('Ерлан', 92), ('Бауыржан', 85)]</code></pre>`,
            starter: P`def rank(rows):
    return sorted(rows)
`,
            solution: P`def rank(rows):
    return sorted(rows, key=lambda r: (-r[1], r[0]))
`,
            hints: ['<code>key=lambda r: (...)</code> — кортеж-кілт.', 'Ұпайды кему ретімен алу үшін <code>-r[1]</code>, сосын <code>r[0]</code>.'],
            check: { tests: P`
_r = rank([('Бауыржан', 85), ('Ерлан', 92), ('Айгерім', 92)])
assert _r == [('Айгерім', 92), ('Ерлан', 92), ('Бауыржан', 85)], f'Күтілгені Айгерім, Ерлан, Бауыржан, сізде {_r}'
assert rank([]) == [], 'Бос тізім үшін []'
_x = [('b', 1), ('a', 1), ('c', 3)]
assert rank(_x) == [('c', 3), ('a', 1), ('b', 1)] and _x == [('b', 1), ('a', 1), ('c', 3)], 'Жаңа тізім қайтарыңыз, бастапқысын өзгертпеңіз'
`, mustInclude: ['key'] } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>merge_sort(a)</code> жазыңыз: сұрыпталған <b>жаңа</b> тізім қайтарсын. <code>sorted</code> мен <code>.sort</code> қолдануға болмайды. Тест 50 000 элементпен тексереді — O(n²) әдіс өтпейді.
<pre><code>merge_sort([5, 2, 9, 1, 5]) → [1, 2, 5, 5, 9]</code></pre>`,
            starter: P`def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    # екі жартысын сұрыптап, біріктіріңіз
    return a
`,
            solution: P`def merge_sort(a):
    if len(a) <= 1:
        return list(a)
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out
`,
            hints: ['<code>left = merge_sort(a[:mid])</code>, <code>right = merge_sort(a[mid:])</code>.', 'Біріктіру: екі көрсеткіш <code>i</code>, <code>j</code>; кішісін <code>out</code>-қа қосып, соңында қалдықтарды <code>extend</code>.'],
            check: { tests: P`
assert merge_sort([5, 2, 9, 1, 5]) == [1, 2, 5, 5, 9], f'Күтілгені [1, 2, 5, 5, 9], сізде {merge_sort([5, 2, 9, 1, 5])}'
assert merge_sort([]) == [] and merge_sort([3]) == [3], 'Бос және бір элементті тізім'
_names = merge_sort.__code__.co_names
assert 'sorted' not in _names and 'sort' not in _names, 'sorted / .sort қолданбаңыз — біріктіруді өзіңіз жазыңыз'
import random as _random, time as _time
_R = _random.Random(4)
_a = [_R.randint(-1000, 1000) for _ in range(2000)]
assert merge_sort(_a) == sorted(_a), 'Кездейсоқ 2000 элементте нәтиже қате'
_a = [_R.randint(0, 10**9) for _ in range(8000)]
_t0 = _time.perf_counter(); merge_sort(_a); _dt = _time.perf_counter() - _t0
assert _dt < 0.5, f'8000 элемент {_dt:.2f} с алды — бұл O(n²) сұрыптау сияқты. Екіге бөліп, біріктіріңіз (O(n log n))'
_a = [_R.randint(0, 10**9) for _ in range(50000)]
_t0 = _time.perf_counter(); _s = merge_sort(_a); _dt = _time.perf_counter() - _t0
assert _s == sorted(_a), '50 000 элементте нәтиже қате'
assert _dt < 4, f'50 000 элемент {_dt:.2f} с алды — O(n log n) болуы керек'
` } }
        ]
      },
      {
        id: 'dsa-10', title: 'Ағаштар: binary tree және BST', minutes: 17,
        body: `
<p><b>Ағаш</b> (tree) — түйіндер иерархиясы: бір түбір (root), әр түйіннің балалары бар, циклдер жоқ. Файл жүйесі, ұйым құрылымы, HTML DOM — бәрі ағаш. <b>Binary tree</b>-де әр түйінде ең көбі екі бала: <code>left</code> және <code>right</code>.</p>
<pre><code>class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

#        8
#       / \
#      3   10
#     / \    \
#    1   6    14
root = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))</code></pre>
<h3>Аралау (traversal)</h3>
<ul>
<li><b>Preorder</b> (түбір, сол, оң): 8, 3, 1, 6, 10, 14 — ағашты көшіру үшін.</li>
<li><b>Inorder</b> (сол, түбір, оң): 1, 3, 6, 8, 10, 14 — BST-де сұрыпталған рет береді.</li>
<li><b>Postorder</b> (сол, оң, түбір): 1, 6, 3, 14, 10, 8 — өшіру, қалталар көлемін есептеу.</li>
<li><b>Level order</b> (деңгей-деңгеймен, BFS, <code>deque</code> арқылы): [8], [3, 10], [1, 6, 14].</li>
</ul>
<pre><code>def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))</code></pre>
<h3>Binary Search Tree (BST)</h3>
<p>BST ережесі: әр түйіннің сол жақ ішкі ағашындағы мәндер одан кіші, оң жағындағылар үлкен. Сонда іздеу binary search сияқты: түбірден бастап, кіші болса солға, үлкен болса оңға жүреміз. Ағаш теңгерілген болса, биіктігі ≈ log n, іздеу мен кірістіру O(log n). Бірақ сұрыпталған мәндерді ретімен кірістірсек, ағаш «тізімге» айналады — биіктік n, операциялар O(n). Сондықтан өндірісте өзін-өзі теңгеретін ағаштар (red-black, AVL, B-tree — дерекқор индекстері) қолданылады.</p>
<pre><code>def bst_insert(node, x):
    if node is None:
        return TreeNode(x)
    if x &lt; node.val:
        node.left = bst_insert(node.left, x)
    elif x &gt; node.val:
        node.right = bst_insert(node.right, x)
    return node            # тең мән қайта қосылмайды</code></pre>
<div class="tip"><b>Жиі қателер:</b> (1) <code>None</code> түйінді тексермей <code>node.left</code>-ке жүгіну — AttributeError. (2) Рекурсивті кірістірудің нәтижесін <code>node.left = ...</code> деп сақтамау — жаңа түйін ағашқа ілінбей қалады.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Сабақтағы ағаштың (түбірі 8) <b>postorder</b> аралауы қандай?', options: ['8, 3, 1, 6, 10, 14', '1, 3, 6, 8, 10, 14', '1, 6, 3, 14, 10, 8', '8, 3, 10, 1, 6, 14'], answer: 2, explain: 'Postorder: алдымен сол ішкі ағаш (1, 6, 3), сосын оң (14, 10), соңында түбір 8.' },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>height(node)</code> ағаштың биіктігін (түбірден ең терең жапыраққа дейінгі түйін саны) рекурсия арқылы қайтарсын. Бос ағаш (<code>None</code>) — 0.
<pre><code>height(TreeNode(1, TreeNode(2, TreeNode(3)))) → 3
height(None)                                  → 0</code></pre>`,
            starter: P`class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def height(node):
    pass
`,
            solution: P`class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))
`,
            hints: ['Базалық жағдай: <code>node is None</code> → 0.', '<code>1 + max(height(node.left), height(node.right))</code>.'],
            check: { tests: P`
assert height(None) == 0, 'Бос ағаш биіктігі 0'
assert height(TreeNode(5)) == 1, 'Жалғыз түйін — 1'
assert height(TreeNode(1, TreeNode(2, TreeNode(3)))) == 3, 'Солға созылған 3 түйін — 3'
_t = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6, TreeNode(4))), TreeNode(10, None, TreeNode(14)))
assert height(_t) == 4, f'Сабақтағы ағашқа 4 түйін қосылған нұсқасы: 4, сізде {height(_t)}'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>BST</code> класын аяқтаңыз:
<ul><li><code>insert(x)</code> — мәнді қосу (бар мән қайта қосылмайды);</li><li><code>contains(x)</code> — <code>True</code>/<code>False</code>, ағашты түбірден төмен қарай <b>бір жолмен</b> жүріп;</li><li><code>inorder()</code> — мәндердің сұрыпталған тізімі.</li></ul>
<pre><code>t = BST()
for x in [8, 3, 10, 1, 6, 14]: t.insert(x)
t.contains(6)   → True
t.contains(7)   → False
t.inorder()     → [1, 3, 6, 8, 10, 14]</code></pre>`,
            starter: P`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, x):
        pass

    def contains(self, x):
        pass

    def inorder(self):
        return []
`,
            solution: P`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, x):
        if self.root is None:
            self.root = TreeNode(x)
            return
        cur = self.root
        while True:
            if x < cur.val:
                if cur.left is None:
                    cur.left = TreeNode(x)
                    return
                cur = cur.left
            elif x > cur.val:
                if cur.right is None:
                    cur.right = TreeNode(x)
                    return
                cur = cur.right
            else:
                return

    def contains(self, x):
        cur = self.root
        while cur:
            if x == cur.val:
                return True
            cur = cur.left if x < cur.val else cur.right
        return False

    def inorder(self):
        out = []
        def go(node):
            if node:
                go(node.left)
                out.append(node.val)
                go(node.right)
        go(self.root)
        return out
`,
            hints: ['<code>insert</code>: түбірден бастап кіші болса солға, үлкен болса оңға жүріп, бос орынға жаңа <code>TreeNode</code> іліңіз.', '<code>inorder</code>: ішкі <code>go(node)</code> функциясы — сол, түйін, оң.'],
            check: { tests: P`
_t = BST()
for _x in [8, 3, 10, 1, 6, 14]:
    _t.insert(_x)
assert _t.inorder() == [1, 3, 6, 8, 10, 14], f'inorder сұрыпталған болуы керек, сізде {_t.inorder()}'
assert _t.contains(6) is True and _t.contains(7) is False, 'contains(6) True, contains(7) False'
assert _t.root.val == 8 and _t.root.left.val == 3 and _t.root.right.right.val == 14, 'BST құрылымы дұрыс емес: кіші мән солға, үлкен оңға'
_t.insert(6)
assert _t.inorder() == [1, 3, 6, 8, 10, 14], 'Бар мәнді қайта қоспаңыз'
assert BST().contains(1) is False and BST().inorder() == [], 'Бос ағаш'
import random as _random
_R = _random.Random(5); _vals = _R.sample(range(100000), 3000)
_b = BST()
for _x in _vals:
    _b.insert(_x)
assert _b.inorder() == sorted(_vals), '3000 кездейсоқ мәнде inorder қате'
_seen = set(_vals)
assert all(_b.contains(_q) == (_q in _seen) for _q in range(0, 100000, 37)), '3000 мәнді ағашта contains қате'
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>level_order(root)</code> ағашты деңгей-деңгеймен аралап, әр деңгейдің мәндер тізімін қайтарсын (<code>deque</code> қолданыңыз).
<pre><code>#      8
#     / \
#    3   10
#   / \    \
#  1   6    14
level_order(root) → [[8], [3, 10], [1, 6, 14]]
level_order(None) → []</code></pre>`,
            starter: P`from collections import deque

class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    pass
`,
            solution: P`from collections import deque

class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    if root is None:
        return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)
    return res
`,
            hints: ['<code>q = deque([root])</code>; әр айналымда <code>len(q)</code> — бір деңгейдегі түйін саны.', 'Сол деңгейдің түйіндерін <code>popleft</code> етіп, балаларын кезекке қосыңыз.'],
            check: { tests: P`
_t = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))
assert level_order(_t) == [[8], [3, 10], [1, 6, 14]], f'Күтілгені [[8], [3, 10], [1, 6, 14]], сізде {level_order(_t)}'
assert level_order(None) == [], 'Бос ағаш үшін []'
assert level_order(TreeNode(1, None, TreeNode(2, TreeNode(3)))) == [[1], [2], [3]], 'Бір жақты ағаш'
` } }
        ]
      },
      {
        id: 'dsa-11', title: 'Heap және priority queue: top-k', minutes: 14,
        body: `
<p><b>Heap</b> (үйме) — ең кіші (немесе ең үлкен) элементті әрдайым O(1)-де көрсетіп, қосу мен алуды O(log n)-де жасайтын құрылым. Ол «толық» binary tree, бірақ массивте сақталады: <code>i</code> түйінінің балалары — <code>2i+1</code> және <code>2i+2</code>. Ереже: ата-ана балаларынан кіші (min-heap).</p>
<p>Python-да <code>heapq</code> модулі кәдімгі тізімді min-heap ретінде басқарады:</p>
<pre><code>import heapq
h = []
heapq.heappush(h, 5000)
heapq.heappush(h, 1200)
heapq.heappush(h, 3400)
h[0]                 # 1200 — ең кішісі, O(1)
heapq.heappop(h)     # 1200, O(log n)
heapq.heapify(arr)   # тізімді орнында heap-ке айналдыру, O(n)</code></pre>
<p>Max-heap керек болса, мәндерді теріс таңбамен саламыз: <code>heappush(h, -x)</code>. Кортеждер де салуға болады: <code>(басымдық, аты)</code> — бірінші элемент бойынша салыстырылады.</p>
<h3>Мысал: top-k</h3>
<p>Kaspi-дегі 1 000 000 тауардан ең көп сатылған 10-ын табу керек. Бәрін сұрыптау — O(n log n). Жақсырақ: өлшемі <code>k</code> болатын <b>min-heap</b> ұстаймыз. Heap-тің түбірі — «үздік k-ның ең әлсізі». Жаңа сан одан үлкен болса, әлсізін шығарып, жаңасын саламыз. Барлығы O(n log k).</p>
<pre><code>def top_k(nums, k):
    h = []
    for x in nums:
        if len(h) &lt; k:
            heapq.heappush(h, x)
        elif x &gt; h[0]:
            heapq.heapreplace(h, x)   # pop + push бір қадамда
    return sorted(h, reverse=True)</code></pre>
<p>Дайын нұсқасы: <code>heapq.nlargest(k, nums)</code>, <code>heapq.nsmallest(k, nums)</code>. Heap сонымен қатар Dijkstra алгоритмінде, тапсырмалар жоспарлаушысында, k сұрыпталған тізімді біріктіруде қолданылады.</p>
<div class="tip"><b>Жиі қателер:</b> (1) <code>heapq</code> — тек min-heap; max үшін теріс таңба. (2) Heap-тізім толық сұрыпталған емес: <code>h[1]</code> міндетті түрде екінші ең кіші емес. (3) Кортеж салғанда бірінші өрістер тең болса, екіншілері салыстырылады — олар салыстырылмайтын объект болса, қате шығады; арасына реттік нөмір қойыңыз.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: '<code>heapq</code> min-heap-ке элемент қосудың (<code>heappush</code>) және ең кішісін алудың (<code>heappop</code>) күрделілігі қандай?', options: ['O(1) және O(1)', 'O(log n) және O(log n)', 'O(n) және O(1)', 'O(n log n) және O(n)'], answer: 1, explain: 'Жаңа элемент ағаш биіктігі бойынша (log n) жоғары көтеріледі; алғанда соңғы элемент түбірге қойылып, log n қадам төмен түседі.' },
          { type: 'python', level: 'easy', xp: 20, prompt: P`<code>top_k(nums, k)</code> — ең үлкен <code>k</code> санды <b>кему</b> ретімен қайтарсын. Өлшемі k болатын min-heap қолданыңыз (тест 100 000 санмен тексереді). <code>k</code> ұзындықтан үлкен болса, бәрін қайтарыңыз.
<pre><code>top_k([120, 450, 90, 450, 300], 2) → [450, 450]
top_k([5, 1], 5)                   → [5, 1]</code></pre>`,
            starter: P`import heapq

def top_k(nums, k):
    h = []
    pass
`,
            solution: P`import heapq

def top_k(nums, k):
    h = []
    if k <= 0:
        return []
    for x in nums:
        if len(h) < k:
            heapq.heappush(h, x)
        elif x > h[0]:
            heapq.heapreplace(h, x)
    return sorted(h, reverse=True)
`,
            hints: ['Heap-те k-дан аз болса — <code>heappush</code>; әйтпесе <code>x &gt; h[0]</code> болғанда <code>heapreplace</code>.', 'Соңында <code>sorted(h, reverse=True)</code>.'],
            check: { tests: P`
assert top_k([120, 450, 90, 450, 300], 2) == [450, 450], f'Күтілгені [450, 450], сізде {top_k([120, 450, 90, 450, 300], 2)}'
assert top_k([5, 1], 5) == [5, 1], 'k ұзындықтан үлкен болса, бәрі кему ретімен'
assert top_k([], 3) == [] and top_k([4, 2], 0) == [], 'Бос нәтиже жағдайлары'
import random as _random
_R = _random.Random(6)
_a = [_R.randint(0, 10**6) for _ in range(100000)]
assert top_k(_a, 10) == sorted(_a, reverse=True)[:10], '100 000 санда top-10 қате'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`Үш қаладағы дүкендер сатылымын уақыт бойынша сұрыпталған тізімдер ретінде жіберді. <code>merge_k(lists)</code> оларды бір сұрыпталған тізімге біріктірсін. Heap-те <code>(мән, тізім_нөмірі, индекс)</code> ұстаңыз: O(N log k).
<pre><code>merge_k([[1, 4, 9], [2, 3], [5]]) → [1, 2, 3, 4, 5, 9]
merge_k([[], [7]])                 → [7]</code></pre>`,
            starter: P`import heapq

def merge_k(lists):
    h = []
    out = []
    pass
    return out
`,
            solution: P`import heapq

def merge_k(lists):
    h = []
    out = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(h, (lst[0], i, 0))
    while h:
        val, i, j = heapq.heappop(h)
        out.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(h, (lists[i][j + 1], i, j + 1))
    return out
`,
            hints: ['Әр бос емес тізімнің бірінші элементін <code>(lst[0], i, 0)</code> түрінде heap-ке салыңыз.', 'Ең кішісін <code>heappop</code> етіп, сол тізімнің келесі элементін (<code>j + 1</code>) салыңыз.'],
            check: { tests: P`
assert merge_k([[1, 4, 9], [2, 3], [5]]) == [1, 2, 3, 4, 5, 9], f'Күтілгені [1, 2, 3, 4, 5, 9], сізде {merge_k([[1, 4, 9], [2, 3], [5]])}'
assert merge_k([[], [7]]) == [7], 'Бос тізімдерді өткізіп жіберіңіз'
assert merge_k([]) == [] and merge_k([[], []]) == [], 'Бәрі бос болса []'
assert merge_k([[1, 1], [1]]) == [1, 1, 1], 'Тең мәндер'
import random as _random
_R = _random.Random(7)
_ls = [sorted(_R.randint(0, 1000) for _ in range(_R.randint(0, 50))) for _ in range(200)]
assert merge_k(_ls) == sorted(x for l in _ls for x in l), '200 тізімді біріктіруде қате'
` } }
        ]
      },
      {
        id: 'dsa-12', title: 'Графтар: BFS, DFS, ең қысқа жол', minutes: 18,
        body: `
<p><b>Граф</b> — төбелер (vertices) мен оларды қосатын қырлар (edges). Қалалар мен жолдар, әлеуметтік желідегі достар, тәуелділіктер — бәрі граф. Көбіне <b>adjacency list</b> түрінде сақтаймыз: әр төбеге көршілер тізімі. Жады — O(V + E).</p>
<pre><code>roads = [('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')]
from collections import defaultdict
adj = defaultdict(list)
for a, b in roads:          # бағытсыз граф: екі жаққа да
    adj[a].append(b)
    adj[b].append(a)</code></pre>
<h3>BFS — енінен іздеу</h3>
<p>Бастапқы төбеден кезек (<code>deque</code>) арқылы деңгей-деңгеймен тарайды: алдымен 1 қадамдағылар, сосын 2 қадамдағылар… Сондықтан <b>салмақсыз</b> графта BFS ең қысқа жолды (қадам санын) береді. Күрделілігі O(V + E).</p>
<pre><code>from collections import deque
def bfs_dist(adj, start):
    dist = {start: 0}
    q = deque([start])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in dist:           # әр төбеге бір рет кіреміз
                dist[v] = dist[u] + 1
                q.append(v)
    return dist</code></pre>
<h3>DFS — тереңнен іздеу</h3>
<p>Бір жолмен мүмкіндігінше тереңге барып, тұйыққа тірелгенде артқа қайтады (стек немесе рекурсия). Байланыс компоненттерін санау, цикл табу, топологиялық сұрыптау үшін қолданылады. Әр төбені <code>visited</code>-ке белгілеуді ұмытпаңыз — әйтпесе циклде шексіз айналасыз.</p>
<h3>Тор (grid) — да граф</h3>
<p>Қала картасы <code>'.'</code> (жол) және <code>'#'</code> (ғимарат) таңбаларымен берілсе, әр ұяшық — төбе, ал жоғары/төмен/солға/оңға көршілер — қырлар. Курьердің (0, 0)-ден оң жақ төменгі бұрышқа ең аз қадаммен жетуі — BFS есебі. Көршілерді <code>for dr, dc in ((1,0), (-1,0), (0,1), (0,-1))</code> арқылы аралаймыз, шекарадан шықпауын тексереміз.</p>
<div class="tip"><b>Салмақты граф</b> (жол ұзындығы әртүрлі) үшін BFS жарамайды — <b>Dijkstra</b> алгоритмі керек: BFS сияқты, бірақ deque орнына ең жақын төбені беретін heap. Оны «Қиын» есептер жинағында жазасыз.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Метро картасында (барлық аялдама аралығы бірдей деп есептейік) А бекетінен Б бекетіне ең аз аялдамамен жету жолын табу керек. Қай алгоритм?', options: ['DFS', 'BFS', 'Binary search', 'Merge sort'], answer: 1, explain: 'Салмақсыз графта BFS төбелерді қашықтық ретімен ашады, сондықтан ең қысқа жолды береді. DFS ең қысқасын кепілдемейді.' },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>count_components(n, edges)</code>: <code>0..n−1</code> төбелері және бағытсыз қырлар берілген. Байланыс компоненттерінің санын қайтарыңыз (DFS немесе BFS). Мысалы, ауылдар мен олардың арасындағы жолдар: неше бөлек «арал» бар?
<pre><code>count_components(5, [(0, 1), (1, 2), (3, 4)]) → 2
count_components(3, [])                       → 3</code></pre>`,
            starter: P`def count_components(n, edges):
    adj = [[] for _ in range(n)]
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)
    pass
`,
            solution: P`def count_components(n, edges):
    adj = [[] for _ in range(n)]
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)
    seen = [False] * n
    comps = 0
    for s in range(n):
        if seen[s]:
            continue
        comps += 1
        seen[s] = True
        stack = [s]
        while stack:
            u = stack.pop()
            for v in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    stack.append(v)
    return comps
`,
            hints: ['<code>seen = [False] * n</code>; әр көрілмеген төбеден жаңа компонент басталады.', 'Стекпен (немесе deque) DFS: көршілерді <code>seen</code>-ге белгілеп, стекке салыңыз. Терең рекурсиядан сақ болыңыз.'],
            check: { tests: P`
assert count_components(5, [(0, 1), (1, 2), (3, 4)]) == 2, 'Күтілгені 2'
assert count_components(3, []) == 3, 'Қыр жоқ болса, әр төбе — бөлек компонент'
assert count_components(1, []) == 1, 'Бір төбе — бір компонент'
assert count_components(4, [(0, 1), (1, 2), (2, 0), (3, 3)]) == 2, 'Цикл мен өз-өзіне қыр'
_n = 100000
_e = [(i, i + 1) for i in range(0, _n - 1) if i % 1000 != 999]
assert count_components(_n, _e) == 100, f'100 000 төбелі тізбекте 100 компонент болуы керек, сізде {count_components(_n, _e)}'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`Курьер картасы — жолдар тізімі: <code>'.'</code> — өтуге болады, <code>'#'</code> — ғимарат. <code>shortest_path(grid)</code> сол жақ жоғарғы бұрыштан оң жақ төменгі бұрышқа дейінгі ең аз қадам санын қайтарсын (жоғары/төмен/солға/оңға жүруге болады); жол жоқ немесе бұрыштардың бірі <code>'#'</code> болса — <code>-1</code>.
<pre><code>shortest_path(['..#',
               '#..',
               '#..'])   → 4
shortest_path(['.#',
               '#.'])    → -1</code></pre>`,
            starter: P`from collections import deque

def shortest_path(grid):
    R, C = len(grid), len(grid[0])
    pass
`,
            solution: P`from collections import deque

def shortest_path(grid):
    R, C = len(grid), len(grid[0])
    if grid[0][0] == '#' or grid[R - 1][C - 1] == '#':
        return -1
    dist = [[-1] * C for _ in range(R)]
    dist[0][0] = 0
    q = deque([(0, 0)])
    while q:
        r, c = q.popleft()
        if (r, c) == (R - 1, C - 1):
            return dist[r][c]
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == '.' and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                q.append((nr, nc))
    return -1
`,
            hints: ['<code>dist</code> матрицасы (-1 — әлі барылмаған), <code>q = deque([(0, 0)])</code>.', 'Төрт бағыт; шекараны, <code>\'#\'</code>-ті және бұрын барғанын тексеріңіз.'],
            check: { tests: P`
assert shortest_path(['..#', '#..', '#..']) == 4, f'Күтілгені 4, сізде {shortest_path(["..#", "#..", "#.."])}'
assert shortest_path(['.#', '#.']) == -1, 'Жол жоқ болса -1'
assert shortest_path(['.']) == 0, 'Бастау мен соңы бір ұяшық — 0'
assert shortest_path(['#.', '..']) == -1, 'Бастау ұяшығы ғимарат болса -1'
assert shortest_path(['....', '.##.', '....']) == 5, '3×4 картада 5 қадам'
from collections import deque as _dq
def _ref(g):
    R, C = len(g), len(g[0]); d = {(0, 0): 0}; q = _dq([(0, 0)])
    while q:
        r, c = q.popleft()
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < R and 0 <= nc < C and g[nr][nc] == '.' and (nr, nc) not in d:
                d[(nr, nc)] = d[(r, c)] + 1; q.append((nr, nc))
    return d.get((R - 1, C - 1), -1)
_g = [('#' * 199 + '.') if i % 4 == 1 else ('.' + '#' * 199) if i % 4 == 3 else '.' * 200 for i in range(201)]
assert shortest_path(_g) == _ref(_g), f'үлкен «жылан» лабиринтінде күтілгені {_ref(_g)}, сізде {shortest_path(_g)}'
` } }
        ]
      },
      {
        id: 'dsa-13', title: 'Динамикалық бағдарламалау', minutes: 20,
        body: `
<p><b>Динамикалық бағдарламалау</b> (DP) — есеп бірдей ішкі есептерге бөлінсе және олар қайта-қайта кездессе, әр ішкі есепті <b>бір рет</b> шешіп, жауабын сақтау. Екі жолы бар: <b>memoization</b> (жоғарыдан төмен: рекурсия + кэш) және <b>tabulation</b> (төменнен жоғары: кестені кіші есептерден бастап толтыру).</p>
<h3>Мысал 1: баспалдақ</h3>
<p>Көктөбеге баратын баспалдақта <code>n</code> саты бар, бір қадамда 1 немесе 2 саты көтерілеміз. Неше тәсіл бар? Соңғы қадам 1 саты болса, оған дейін <code>n−1</code> сатыға жету тәсілдері; 2 саты болса — <code>n−2</code>. Демек <code>ways(n) = ways(n−1) + ways(n−2)</code>.</p>
<pre><code># Аңғал рекурсия: O(2ⁿ) — ways(40) өте баяу, бір ішкі есеп миллион рет шешіледі
from functools import lru_cache
@lru_cache(maxsize=None)            # memoization: O(n)
def ways(n):
    if n &lt;= 1:
        return 1
    return ways(n - 1) + ways(n - 2)

def ways_tab(n):                    # tabulation: O(n), рекурсиясыз
    a, b = 1, 1                     # ways(0), ways(1)
    for _ in range(n - 1):
        a, b = b, a + b
    return b if n &gt;= 1 else 1</code></pre>
<h3>Мысал 2: тиындар (coin change)</h3>
<p>Тиындар номиналы берілген, <code>amount</code> теңгені ең аз тиынмен жинау керек. Ашкөз тәсіл (ең үлкен тиыннан бастау) әрдайым дұрыс емес: [1, 3, 4] тиындарымен 6 = 4+1+1 (3 тиын), ал дұрысы 3+3 (2 тиын). DP: <code>dp[x]</code> — <code>x</code> сомасына ең аз тиын. <code>dp[0] = 0</code>, <code>dp[x] = min(dp[x − c] + 1)</code> барлық <code>c ≤ x</code> үшін. Күрделілігі O(amount · тиын саны).</p>
<h3>Мысал 3: ең ұзын өспелі ішкі тізбек (LIS)</h3>
<p>Теңге бағамының күндік мәндерінен (міндетті түрде қатар емес) қатаң өсетін ең ұзын тізбек. O(n²) DP: <code>dp[i] = 1 + max(dp[j])</code>, <code>j &lt; i</code> және <code>a[j] &lt; a[i]</code>. Жылдамырақ O(n log n) әдіс: <code>tails[k]</code> — ұзындығы <code>k+1</code> өспелі тізбектердің ең кіші соңғы элементі. Әр жаңа <code>x</code> үшін <code>bisect_left(tails, x)</code> орнын тауып, ауыстырамыз немесе соңына қосамыз; жауап — <code>len(tails)</code>.</p>
<div class="tip"><b>DP есебін шешу рецепті:</b> (1) күйді анықта (<code>dp[i]</code> нені білдіреді?); (2) өту формуласын жаз; (3) базалық мәндер; (4) толтыру реті; (5) жауап қай ұяшықта. Python-да терең рекурсия шектелген — үлкен n үшін tabulation қауіпсіз.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Memoization мен tabulation айырмасы неде?', options: ['Memoization тек жолдармен, tabulation тек сандармен жұмыс істейді', 'Memoization — рекурсия + кэш (жоғарыдан төмен), tabulation — кестені кіші есептерден бастап циклмен толтыру (төменнен жоғары)', 'Tabulation әрдайым O(2ⁿ)', 'Айырмасы жоқ'], answer: 1, explain: 'Екеуі де әр ішкі есепті бір рет шешеді; айырмасы — толтыру бағыты мен рекурсияның бар-жоғында.' },
          { type: 'python', level: 'easy', xp: 20, prompt: P`<code>climb(n)</code> — <code>n</code> сатылы баспалдаққа 1 немесе 2 сатыдан көтерілу тәсілдерінің саны. <code>climb(0) = 1</code>. Тест n = 90 тексереді, сондықтан аңғал рекурсия өтпейді — tabulation немесе memoization қолданыңыз.
<pre><code>climb(3) → 3    # 1+1+1, 1+2, 2+1
climb(5) → 8</code></pre>`,
            starter: P`def climb(n):
    if n <= 1:
        return 1
    return climb(n - 1) + climb(n - 2)
`,
            solution: P`def climb(n):
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b if n >= 1 else 1
`,
            hints: ['<code>a, b = 1, 1</code> — climb(0), climb(1).', 'Циклде <code>a, b = b, a + b</code>.'],
            check: { tests: P`
assert climb(0) == 1 and climb(1) == 1, 'climb(0) = climb(1) = 1'
assert climb(3) == 3 and climb(5) == 8, 'climb(3) = 3, climb(5) = 8'
import time as _time
_t0 = _time.perf_counter(); _v = climb(32); _dt = _time.perf_counter() - _t0
assert _v == 3524578, 'climb(32) = 3524578'
assert _dt < 0.05, f'climb(32) {_dt:.2f} с алды — бұл экспоненциал рекурсия. Әр мәнді бір рет есептеңіз (DP)'
assert climb(90) == 4660046610375530309, 'climb(90) = 4660046610375530309'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>coin_change(coins, amount)</code> — <code>amount</code> теңгені жинауға қажет ең аз тиын саны; жинау мүмкін болмаса <code>-1</code>. Әр номинал шексіз көп. Ашкөз тәсіл жарамайды — DP жазыңыз.
<pre><code>coin_change([1, 3, 4], 6)              → 2    # 3 + 3
coin_change([10, 20, 50, 100, 200], 370) → 4  # 200 + 100 + 50 + 20
coin_change([5, 10], 3)                → -1</code></pre>`,
            starter: P`def coin_change(coins, amount):
    INF = float('inf')
    dp = [0] + [INF] * amount
    pass
`,
            solution: P`def coin_change(coins, amount):
    INF = float('inf')
    dp = [0] + [INF] * amount
    for x in range(1, amount + 1):
        for c in coins:
            if c <= x and dp[x - c] + 1 < dp[x]:
                dp[x] = dp[x - c] + 1
    return dp[amount] if dp[amount] != INF else -1
`,
            hints: ['<code>for x in range(1, amount + 1)</code>, ішінде әр тиын <code>c &lt;= x</code> үшін <code>dp[x] = min(dp[x], dp[x - c] + 1)</code>.', 'Соңында <code>dp[amount]</code> шексіз болса -1.'],
            check: { tests: P`
assert coin_change([1, 3, 4], 6) == 2, f'[1, 3, 4] тиындарымен 6 = 3 + 3: 2 тиын, сізде {coin_change([1, 3, 4], 6)}'
assert coin_change([10, 20, 50, 100, 200], 370) == 4, '370 = 200 + 100 + 50 + 20'
assert coin_change([5, 10], 3) == -1, 'Жинау мүмкін емес болса -1'
assert coin_change([7], 0) == 0, '0 теңге — 0 тиын'
assert coin_change([2], 3) == -1, '[2]-мен 3 жиналмайды'
assert coin_change([1, 5, 10, 20, 50, 100, 200], 9999) == 58, '9999 теңгені 58 тиынмен жинауға болады'
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<code>lis_length(a)</code> — қатаң өсетін ең ұзын ішкі тізбектің (міндетті түрде қатар емес) ұзындығы. Тест 100 000 элементпен тексереді: O(n²) өтпейді — <code>tails</code> + <code>bisect_left</code> әдісін қолданыңыз.
<pre><code>lis_length([10, 9, 2, 5, 3, 7, 101, 18]) → 4   # 2, 3, 7, 18
lis_length([7, 7, 7])                    → 1
lis_length([])                           → 0</code></pre>`,
            starter: P`from bisect import bisect_left

def lis_length(a):
    tails = []
    pass
`,
            solution: P`from bisect import bisect_left

def lis_length(a):
    tails = []
    for x in a:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)
`,
            hints: ['Әр <code>x</code> үшін <code>i = bisect_left(tails, x)</code>.', '<code>i == len(tails)</code> болса <code>append</code>, әйтпесе <code>tails[i] = x</code>; жауап <code>len(tails)</code>.'],
            check: { tests: P`
assert lis_length([10, 9, 2, 5, 3, 7, 101, 18]) == 4, f'Күтілгені 4, сізде {lis_length([10, 9, 2, 5, 3, 7, 101, 18])}'
assert lis_length([7, 7, 7]) == 1, 'Қатаң өсу: тең мәндер саналмайды'
assert lis_length([]) == 0, 'Бос тізім үшін 0'
assert lis_length([1, 2, 3, 4]) == 4 and lis_length([4, 3, 2, 1]) == 1, 'Өспелі және кемімелі тізімдер'
import time as _time, random as _random
_R = _random.Random(8)
_a = [_R.randint(0, 10**6) for _ in range(6000)]
_t0 = _time.perf_counter(); lis_length(_a); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'n=6000 үшін {_dt:.2f} с — бұл O(n²). bisect арқылы O(n log n) жазыңыз'
_a = list(range(0, 200000, 2))
assert lis_length(_a) == 100000, 'Өспелі 100 000 элементте 100 000'
_a = [(_i % 1000) * 1000 + _i // 1000 for _i in range(100000)]
assert lis_length(_a) == 1099, f'n = 100 000 тесті: күтілгені 1099, сізде {lis_length(_a)}'
` } }
        ]
      },
      {
        id: 'dsa-p1', title: 'Есептер: Оңай', minutes: 40,
        body: `
<p>Бұл сабақ — LeetCode стиліндегі есептер жинағы. Барлығы <b>Оңай</b> деңгейде: бір өту (O(n)), hash map, екі көрсеткіш, prefix sum. Әр есепте функция сигнатурасы берілген; тесттер шеткі жағдайларды (бос тізім, бір элемент, бәрі бірдей) және кейбірінде 100 000 элементтік кірісті тексереді.</p>
<h3>Есепті шешу тәртібі</h3>
<ol>
<li><b>Шартты өз сөзіңізбен айтыңыз.</b> Кіріс не, шығыс не? Мысалдарды қолмен тексеріңіз.</li>
<li><b>Шеткі жағдайлар:</b> бос кіріс, бір элемент, теріс сандар, қайталанулар.</li>
<li><b>Алдымен аңғал шешім</b>, оның күрделілігін бағалаңыз. n = 10⁵ болса, O(n²) жарамайды.</li>
<li><b>Жақсартыңыз:</b> «бұрын не көрдім?» → set/dict; «сұрыпталған» → екі көрсеткіш немесе binary search; «аралық қосындысы» → prefix sum.</li>
<li><b>Кодтан кейін</b> мысалдарды бойынан өткізіп, «Іске қосу» батырмасымен тексеріңіз.</li>
</ol>
<h3>Prefix sum — бір жаңа құрал</h3>
<p>Көп сұрау «<code>l</code>-ден <code>r</code>-ге дейінгі қосынды қанша?» деп сұраса, әр сұрауда цикл жүргізу — O(n) әрқайсысына. Оның орнына бір рет <code>pre[i+1] = pre[i] + a[i]</code> массивін құрамыз; сонда <code>sum(a[l..r]) = pre[r+1] − pre[l]</code> — O(1).</p>
<pre><code>a   = [5, 2, 7, 1]
pre = [0, 5, 7, 14, 15]
# a[1..2] = 2 + 7 = pre[3] - pre[1] = 14 - 5 = 9</code></pre>`,
        exercises: [
          { type: 'python', level: 'easy', xp: 15, prompt: P`<b>1. Нөлдерді соңына.</b> Қойма есебінде қалдығы 0 болған тауарлар тізімнің соңына жылжуы керек, қалғандарының салыстырмалы реті сақталады. <code>move_zeros(nums)</code> тізімді <b>орнында</b> өзгертсін (жаңа тізім жасамаңыз).
<pre><code>a = [0, 12, 0, 3, 5]
move_zeros(a)   # a == [12, 3, 5, 0, 0]
a = [0]         # → [0]</code></pre>`,
            starter: P`def move_zeros(nums):
    pass
`,
            solution: P`def move_zeros(nums):
    w = 0
    for r in range(len(nums)):
        if nums[r] != 0:
            nums[w], nums[r] = nums[r], nums[w]
            w += 1
`,
            hints: ['Жазу көрсеткіші <code>w</code>: нөл емес элементті <code>nums[w]</code>-ге жылжытыңыз.', '<code>nums[w], nums[r] = nums[r], nums[w]</code> алмастыруы нөлдерді өздігінен артқа ығыстырады.'],
            check: { tests: P`
_a = [0, 12, 0, 3, 5]; _id = id(_a); move_zeros(_a)
assert _a == [12, 3, 5, 0, 0] and id(_a) == _id, f'Күтілгені [12, 3, 5, 0, 0] (орнында), сізде {_a}'
_b = [0]; move_zeros(_b); assert _b == [0], '[0] өзгермейді'
_c = []; move_zeros(_c); assert _c == [], 'Бос тізім'
_d = [1, 2, 3]; move_zeros(_d); assert _d == [1, 2, 3], 'Нөлсіз тізім өзгермейді'
_e = [0, 0, 7]; move_zeros(_e); assert _e == [7, 0, 0], '[0, 0, 7] → [7, 0, 0]'
_big = [(_i % 3) * _i for _i in range(100000)]
_exp = [x for x in _big if x != 0] + [0] * _big.count(0)
move_zeros(_big); assert _big == _exp, '100 000 элементте нәтиже қате'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<b>2. Ең ұзақ сериясы.</b> Дүкеннің күндік сатылымы берілген. <code>max_streak(sales)</code> сатылым нөлден үлкен болған <b>қатарынан</b> келген күндердің ең көп санын қайтарсын.
<pre><code>max_streak([3, 5, 0, 2, 4, 1, 0, 8]) → 3
max_streak([0, 0])                   → 0
max_streak([])                       → 0</code></pre>`,
            starter: P`def max_streak(sales):
    pass
`,
            solution: P`def max_streak(sales):
    best = cur = 0
    for x in sales:
        if x > 0:
            cur += 1
            best = max(best, cur)
        else:
            cur = 0
    return best
`,
            hints: ['Екі айнымалы: ағымдағы серия <code>cur</code> және ең жақсысы <code>best</code>.', 'Нөл кездессе <code>cur = 0</code>.'],
            check: { tests: P`
assert max_streak([3, 5, 0, 2, 4, 1, 0, 8]) == 3, f'Күтілгені 3, сізде {max_streak([3, 5, 0, 2, 4, 1, 0, 8])}'
assert max_streak([0, 0]) == 0 and max_streak([]) == 0, 'Сатылым болмаса 0'
assert max_streak([1, 1, 1]) == 3, 'Барлық күн оң болса — ұзындығы'
assert max_streak([0, 4]) == 1, 'Соңындағы серия да саналады'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<b>3. Валюта саудасы.</b> <code>rates[i]</code> — <code>i</code>-күнгі доллар бағамы (₸). Бір рет сатып алып, кейінірек бір рет сатуға болады. <code>best_profit(rates)</code> ең үлкен пайданы қайтарсын; пайда жоқ болса 0. Тест 100 000 күнмен тексереді — O(n) жазыңыз.
<pre><code>best_profit([470, 465, 480, 462, 475, 490]) → 28   # 462-де ал, 490-да сат
best_profit([500, 490, 480])               → 0</code></pre>`,
            starter: P`def best_profit(rates):
    pass
`,
            solution: P`def best_profit(rates):
    best = 0
    low = float('inf')
    for r in rates:
        low = min(low, r)
        best = max(best, r - low)
    return best
`,
            hints: ['Осы күнге дейінгі ең төмен бағамды <code>low</code> ұстаңыз.', 'Әр күні <code>r - low</code> пайдасын <code>best</code>-пен салыстырыңыз.'],
            check: { tests: P`
assert best_profit([470, 465, 480, 462, 475, 490]) == 28, f'Күтілгені 28, сізде {best_profit([470, 465, 480, 462, 475, 490])}'
assert best_profit([500, 490, 480]) == 0, 'Тек төмендесе — 0'
assert best_profit([]) == 0 and best_profit([470]) == 0, 'Бос немесе бір күн — 0'
assert best_profit([3, 1, 4, 1, 5]) == 4, 'Ең төмен нүкте ортада болуы мүмкін'
import time as _time
_r = list(range(5000, 0, -1))
_t0 = _time.perf_counter(); _v = best_profit(_r); _dt = _time.perf_counter() - _t0
assert _v == 0 and _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — O(n²) сияқты. Бір өтумен шешіңіз'
_r = [(_i * 7919) % 100003 for _i in range(100000)]
_lo, _best = 10**9, 0
for _x in _r:
    _lo = min(_lo, _x); _best = max(_best, _x - _lo)
assert best_profit(_r) == _best, f'n = 100 000 кезінде күтілгені {_best}, сізде {best_profit(_r)}'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<b>4. Екі сұрыпталған тізімді біріктіру.</b> Алматы мен Астана филиалдарының тапсырыс уақыттары өсу ретімен сұрыпталған. <code>merge_sorted(a, b)</code> бір сұрыпталған тізім қайтарсын. <code>sorted</code> / <code>.sort</code> қолданбаңыз — екі көрсеткіш.
<pre><code>merge_sorted([1, 4, 9], [2, 3, 10]) → [1, 2, 3, 4, 9, 10]
merge_sorted([], [5])               → [5]</code></pre>`,
            starter: P`def merge_sorted(a, b):
    out = []
    i = j = 0
    return out
`,
            solution: P`def merge_sorted(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out
`,
            hints: ['<code>while i &lt; len(a) and j &lt; len(b)</code>: кішісін қосып, сол көрсеткішті жылжытыңыз.', 'Соңында қалғанын <code>extend</code>.'],
            check: { tests: P`
assert merge_sorted([1, 4, 9], [2, 3, 10]) == [1, 2, 3, 4, 9, 10], f'Күтілгені [1, 2, 3, 4, 9, 10], сізде {merge_sorted([1, 4, 9], [2, 3, 10])}'
assert merge_sorted([], [5]) == [5] and merge_sorted([5], []) == [5], 'Бір тізім бос болса'
assert merge_sorted([], []) == [], 'Екеуі де бос'
assert merge_sorted([1, 1], [1]) == [1, 1, 1], 'Тең мәндер'
assert 'sorted' not in merge_sorted.__code__.co_names and 'sort' not in merge_sorted.__code__.co_names, 'sorted / .sort қолданбаңыз'
_a = list(range(0, 200000, 2)); _b = list(range(1, 200000, 2))
assert merge_sorted(_a, _b) == list(range(200000)), '100 000 + 100 000 элементте нәтиже қате'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<b>5. Жоғалған чек.</b> Кассада <code>0..n</code> нөмірлі <code>n + 1</code> чек болуы керек еді, бірақ біреуі жоғалды; қалған <code>n</code> чек нөмірі кез келген ретпен берілген. <code>missing_number(nums)</code> жоғалған нөмірді O(n)-де тапсын.
<pre><code>missing_number([3, 0, 1]) → 2
missing_number([0])       → 1
missing_number([1])       → 0</code></pre>`,
            starter: P`def missing_number(nums):
    pass
`,
            solution: P`def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)
`,
            hints: ['0-ден n-ге дейінгі сандар қосындысы <code>n * (n + 1) // 2</code>.', 'Одан берілгендердің қосындысын алып тастаңыз.'],
            check: { tests: P`
assert missing_number([3, 0, 1]) == 2, f'Күтілгені 2, сізде {missing_number([3, 0, 1])}'
assert missing_number([0]) == 1 and missing_number([1]) == 0, 'Шеткі жағдайлар: [0] → 1, [1] → 0'
assert missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1]) == 8, 'Күтілгені 8'
import random as _random, time as _time
_R = _random.Random(11)
_n = list(range(100001)); _gone = _n.pop(73519); _R.shuffle(_n)
_t0 = _time.perf_counter(); _v = missing_number(_n); _dt = _time.perf_counter() - _t0
assert _v == _gone, f'n = 100 000 кезінде күтілгені {_gone}, сізде {_v}'
assert _dt < 1, f'{_dt:.2f} с — тым баяу; әр санды тізімнен in арқылы іздемеңіз'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<b>6. Ауыл сайлауы.</b> Дауыстар тізімінде бір кандидат дауыстардың жартысынан <b>көбін</b> алғаны белгілі. <code>majority(votes)</code> сол кандидатты қайтарсын. Қосымша: Boyer–Moore әдісімен O(1) жадта жазып көріңіз (міндетті емес).
<pre><code>majority(['Асан', 'Үсен', 'Асан']) → 'Асан'
majority([7, 7, 5, 7, 5, 7, 7])     → 7</code></pre>`,
            starter: P`def majority(votes):
    pass
`,
            solution: P`def majority(votes):
    cand, cnt = None, 0
    for v in votes:
        if cnt == 0:
            cand = v
        cnt += 1 if v == cand else -1
    return cand
`,
            hints: ['Қарапайым жолы: <code>Counter(votes).most_common(1)[0][0]</code>.', 'Boyer–Moore: есептегіш 0 болса, жаңа кандидат аламыз; сәйкес келсе +1, келмесе −1.'],
            check: { tests: P`
assert majority(['Асан', 'Үсен', 'Асан']) == 'Асан', "Күтілгені 'Асан'"
assert majority([7, 7, 5, 7, 5, 7, 7]) == 7, 'Күтілгені 7'
assert majority(['Дана']) == 'Дана', 'Бір дауыс'
_v = ['B'] * 49999 + ['A'] * 50001
assert majority(_v) == 'A', '100 000 дауыста қате'
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<b>7. Дауысты дыбыстар.</b> <code>count_vowels(text)</code> мәтіндегі дауысты әріптер санын қайтарсын. Дауыстылар (кіші және бас әріптер де): <code>а ә е ё и і о ө у ұ ү ы э ю я</code>. Set қолданыңыз.
<pre><code>count_vowels('Қазақстан')   → 3
count_vowels('Өскемен!')    → 3
count_vowels('')            → 0</code></pre>`,
            starter: P`VOWELS = set('аәеёиіоөуұүыэюя')

def count_vowels(text):
    pass
`,
            solution: P`VOWELS = set('аәеёиіоөуұүыэюя')

def count_vowels(text):
    return sum(1 for ch in text.lower() if ch in VOWELS)
`,
            hints: ['<code>text.lower()</code> — бас әріптерді де санау үшін.', '<code>sum(1 for ch in ... if ch in VOWELS)</code>.'],
            check: { tests: P`
assert count_vowels('Қазақстан') == 3, f"'Қазақстан' — 3 дауысты, сізде {count_vowels('Қазақстан')}"
assert count_vowels('Өскемен!') == 3, "'Өскемен!' — Ө, е, е: 3"
assert count_vowels('') == 0 and count_vowels('бмт 123') == 0, 'Дауыстысыз мәтін — 0'
assert count_vowels('ҮЙ ІШІ') == 3, 'Бас әріптер де саналады'
` } },
          { type: 'python', level: 'easy', xp: 20, prompt: P`<b>8. Аралық қосындылар.</b> <code>sales</code> — күндік сатылым, <code>queries</code> — <code>(l, r)</code> жұптары (екі шеті қоса). <code>range_sums(sales, queries)</code> әр сұрауға қосындылар тізімін қайтарсын. Тест 100 000 күн мен 100 000 сұрауды тексереді — prefix sum құрыңыз.
<pre><code>range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)]) → [9, 15, 1]</code></pre>`,
            starter: P`def range_sums(sales, queries):
    pre = [0]
    pass
`,
            solution: P`def range_sums(sales, queries):
    pre = [0]
    for x in sales:
        pre.append(pre[-1] + x)
    return [pre[r + 1] - pre[l] for l, r in queries]
`,
            hints: ['<code>pre[i + 1] = pre[i] + sales[i]</code>.', 'Сұрау жауабы: <code>pre[r + 1] - pre[l]</code>.'],
            check: { tests: P`
assert range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)]) == [9, 15, 1], f'Күтілгені [9, 15, 1], сізде {range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)])}'
assert range_sums([4], [(0, 0)]) == [4], 'Бір күн'
assert range_sums([1, 2], []) == [], 'Сұрау жоқ болса []'
import random as _random, time as _time
_R = _random.Random(12)
_s = [_R.randint(0, 1000) for _ in range(10000)]
_q = [(0, 9999)] * 10000
_t0 = _time.perf_counter(); _v = range_sums(_s, _q); _dt = _time.perf_counter() - _t0
assert _v[0] == sum(_s), 'Толық аралық қосындысы қате'
assert _dt < 0.15, f'10 000 сұрау {_dt:.2f} с алды — әр сұрауда қайта қоспаңыз, prefix sum құрыңыз'
_s = [_R.randint(0, 1000) for _ in range(100000)]
_q = [(_i, 99999) for _i in range(0, 100000)]
_v = range_sums(_s, _q)
assert len(_v) == 100000 and _v[0] == sum(_s) and _v[-1] == _s[-1] and _v[50000] == sum(_s[50000:]), '100 000 сұрауда нәтиже қате'
` } }
        ]
      },
      {
        id: 'dsa-p2', title: 'Есептер: Орташа', minutes: 60,
        body: `
<p><b>Орташа</b> деңгейдегі есептерде бір құрал жетпейді: sliding window, prefix sum + hash map, monotonic stack, топологиялық сұрыптау, торда BFS және 2D DP. Көбінде аңғал O(n²) шешім оңай ойға келеді, бірақ тесттер 10⁵ көлемде тексереді.</p>
<h3>Sliding window (жылжымалы терезе)</h3>
<p>Ішкі жол/ішкі тізім туралы сұрақтарда (ең ұзын, ең қысқа, шартқа сай) екі көрсеткіш <code>l</code>, <code>r</code> терезені анықтайды. <code>r</code> оңға жылжып, элемент қосады; шарт бұзылса, <code>l</code> оңға жылжып, элемент шығарады. Әр элемент терезеге бір рет кіріп, бір рет шығады — O(n).</p>
<pre><code># Қайталанбайтын таңбалы ең ұзын ішкі жол
last = {}; l = best = 0
for r, ch in enumerate(s):
    if ch in last and last[ch] &gt;= l:
        l = last[ch] + 1          # терезені қайталанудан кейін бастаймыз
    last[ch] = r
    best = max(best, r - l + 1)</code></pre>
<h3>Monotonic stack</h3>
<p>«Әр элемент үшін оң жақтағы бірінші үлкенірегі қай жерде?» — стекте әлі жауабы табылмаған индекстерді <b>кему</b> ретімен ұстаймыз. Жаңа элемент стектің үстіндегісінен үлкен болса, соның жауабы — осы элемент; оны шығарамыз. Әр индекс бір рет кіріп, бір рет шығады — O(n).</p>
<h3>Топологиялық сұрыптау (Kahn)</h3>
<p>Пәндер мен пререквизиттер — бағытталған граф. Кіріс дәрежесі (in-degree) 0 болған пәндерді кезекке саламыз; біреуін алған сайын оның көршілерінің дәрежесін азайтамыз. Барлық пән шықпаса — циклдік тәуелділік бар.</p>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>1. Қайталанбайтын ең ұзын ішкі жол.</b> <code>longest_unique(s)</code> — таңбалары қайталанбайтын ең ұзын <b>үздіксіз</b> ішкі жолдың ұзындығы. Sliding window, O(n).
<pre><code>longest_unique('абвабвбб') → 3   # 'абв'
longest_unique('ққққ')     → 1
longest_unique('')         → 0</code></pre>`,
            starter: P`def longest_unique(s):
    pass
`,
            solution: P`def longest_unique(s):
    last = {}
    l = best = 0
    for r, ch in enumerate(s):
        if ch in last and last[ch] >= l:
            l = last[ch] + 1
        last[ch] = r
        best = max(best, r - l + 1)
    return best
`,
            hints: ['<code>last[ch]</code> — таңбаның соңғы индексі; <code>l</code> — терезенің сол шеті.', 'Қайталану терезе ішінде болса (<code>last[ch] &gt;= l</code>), <code>l = last[ch] + 1</code>.'],
            check: { tests: P`
assert longest_unique('абвабвбб') == 3, f"'абвабвбб' → 3, сізде {longest_unique('абвабвбб')}"
assert longest_unique('ққққ') == 1 and longest_unique('') == 0, 'Шеткі жағдайлар'
assert longest_unique('pwwkew') == 3, "'pwwkew' → 3 ('wke')"
assert longest_unique('abba') == 2, "'abba' → 2: l солға қайта жылжымауы керек"
import time as _time
_s = ''.join(chr(0x4e00 + _i) for _i in range(5000))
_t0 = _time.perf_counter(); _v = longest_unique(_s); _dt = _time.perf_counter() - _t0
assert _v == 5000, 'Барлық таңбасы әртүрлі жолда — оның ұзындығы'
assert _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — O(n²). Sliding window жазыңыз'
_s = ''.join(chr(0x4e00 + (_i * 37) % 2000) for _i in range(100000))
assert longest_unique(_s) == 2000, '100 000 таңбалы жолда нәтиже қате'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>2. Өзінен басқалардың көбейтіндісі.</b> <code>product_except_self(nums)</code> — <code>out[i]</code> = <code>i</code>-ден басқа барлық элементтердің көбейтіндісі. <b>Бөлуді қолданбаңыз</b> (нөл болуы мүмкін); O(n): сол жақ және оң жақ көбейтінділер.
<pre><code>product_except_self([1, 2, 3, 4]) → [24, 12, 8, 6]
product_except_self([2, 0, 5])    → [0, 10, 0]</code></pre>`,
            starter: P`def product_except_self(nums):
    n = len(nums)
    out = [1] * n
    return out
`,
            solution: P`def product_except_self(nums):
    n = len(nums)
    out = [1] * n
    left = 1
    for i in range(n):
        out[i] = left
        left *= nums[i]
    right = 1
    for i in range(n - 1, -1, -1):
        out[i] *= right
        right *= nums[i]
    return out
`,
            hints: ['Бірінші өту: <code>out[i]</code> = сол жақтағылардың көбейтіндісі.', 'Екінші өту оңнан солға: <code>out[i] *= right</code>, сосын <code>right *= nums[i]</code>.'],
            check: { tests: P`
assert product_except_self([1, 2, 3, 4]) == [24, 12, 8, 6], f'Күтілгені [24, 12, 8, 6], сізде {product_except_self([1, 2, 3, 4])}'
assert product_except_self([2, 0, 5]) == [0, 10, 0], 'Нөл болғанда бөлу жарамайды'
assert product_except_self([0, 0, 3]) == [0, 0, 0], 'Екі нөл'
assert product_except_self([-1, 2]) == [2, -1], 'Екі элемент'
import time as _time
_a = [1, -1] * 2500
_t0 = _time.perf_counter(); _v = product_except_self(_a); _dt = _time.perf_counter() - _t0
assert _v[0] == 1 and _v[1] == -1 and _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — O(n²). Сол/оң көбейтінділермен O(n) жазыңыз'
_a = [1] * 100000; _a[777] = 3
_v = product_except_self(_a)
assert _v[777] == 1 and _v[0] == 3 and len(_v) == 100000, '100 000 элементте нәтиже қате'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>3. Қосындысы k болатын ішкі тізімдер.</b> <code>count_subarrays(nums, k)</code> — қосындысы дәл <code>k</code> болатын <b>үздіксіз</b> ішкі тізімдер саны. Сандар теріс те болуы мүмкін (сондықтан sliding window жарамайды). Prefix sum + dict: O(n).
<pre><code>count_subarrays([1, 1, 1], 2)       → 2
count_subarrays([3, 4, -7, 5, 1], 0) → 1   # [3, 4, -7]
count_subarrays([1, 2, 3], 3)       → 2   # [1, 2], [3]</code></pre>`,
            starter: P`def count_subarrays(nums, k):
    seen = {0: 1}
    pass
`,
            solution: P`def count_subarrays(nums, k):
    seen = {0: 1}
    s = cnt = 0
    for x in nums:
        s += x
        cnt += seen.get(s - k, 0)
        seen[s] = seen.get(s, 0) + 1
    return cnt
`,
            hints: ['Ағымдағы prefix қосындысы <code>s</code>. Бұрын <code>s - k</code> қосындысы неше рет болды — сонша ішкі тізім осында аяқталады.', '<code>seen = {0: 1}</code> — бос prefix; әр қадамда <code>seen[s] += 1</code>.'],
            check: { tests: P`
assert count_subarrays([1, 1, 1], 2) == 2, f'Күтілгені 2, сізде {count_subarrays([1, 1, 1], 2)}'
assert count_subarrays([3, 4, -7, 5, 1], 0) == 1, 'Теріс сандармен: [3, 4, -7]'
assert count_subarrays([1, 2, 3], 3) == 2, '[1, 2] және [3]'
assert count_subarrays([], 0) == 0, 'Бос тізім үшін 0'
assert count_subarrays([0, 0, 0], 0) == 6, '[0, 0, 0]-де қосындысы 0 болатын 6 ішкі тізім'
import time as _time
_a = [1] * 5000
_t0 = _time.perf_counter(); _v = count_subarrays(_a, 10**9); _dt = _time.perf_counter() - _t0
assert _v == 0 and _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — O(n²). Prefix sum + dict жазыңыз'
_a = [(1 if _i % 2 == 0 else -1) for _i in range(100000)]
assert count_subarrays(_a, 0) == 2500000000, f'100 000 элементте күтілгені 2500000000, сізде {count_subarrays(_a, 0)}'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>4. Залды брондау.</b> Astana Hub залына брондаулар <code>[start, end]</code> түрінде (сағатпен) берілген. Қиылысатын немесе түйісетін (бірінің соңы — екіншісінің басы) аралықтарды біріктіріп, <code>merge_intervals(intervals)</code> басы бойынша сұрыпталған тізім қайтарсын.
<pre><code>merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]]) → [[9, 12], [14, 17]]
merge_intervals([[13, 14], [8, 9]])                     → [[8, 9], [13, 14]]</code></pre>`,
            starter: P`def merge_intervals(intervals):
    out = []
    return out
`,
            solution: P`def merge_intervals(intervals):
    out = []
    for s, e in sorted(intervals):
        if out and s <= out[-1][1]:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return out
`,
            hints: ['Алдымен басы бойынша сұрыптаңыз.', 'Жаңа аралықтың басы <code>out[-1][1]</code>-ден аспаса, соңын <code>max</code> арқылы созыңыз; әйтпесе жаңасын қосыңыз.'],
            check: { tests: P`
assert merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]]) == [[9, 12], [14, 17]], f'Күтілгені [[9, 12], [14, 17]], сізде {merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]])}'
assert merge_intervals([[13, 14], [8, 9]]) == [[8, 9], [13, 14]], 'Сұрыпталмаған кіріс'
assert merge_intervals([]) == [], 'Бос тізім'
assert merge_intervals([[1, 10], [2, 3], [4, 5]]) == [[1, 10]], 'Ішіндегі аралықтар жұтылады'
assert merge_intervals([[5, 5]]) == [[5, 5]], 'Нөл ұзындықты аралық'
_iv = [[_i * 3, _i * 3 + 2] for _i in range(100000)][::-1]
_r = merge_intervals(_iv)
assert len(_r) == 100000 and _r[0] == [0, 2], '100 000 бөлек аралық біріктірілмеуі керек'
_iv = [[_i, _i + 1] for _i in range(100000)]
assert merge_intervals(_iv) == [[0, 100000]], 'Тізбектей түйіскен аралықтар біреу болуы керек'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>5. Картадағы көлдер.</b> Карта жолдар тізімі: <code>'~'</code> — су, <code>'.'</code> — құрлық. Көл — жоғары/төмен/солға/оңға жалғасқан су ұяшықтарының тобы. <code>count_lakes(grid)</code> көлдер санын қайтарсын. Үлкен картада рекурсия тереңдігі жетпейді — стек немесе <code>deque</code> қолданыңыз.
<pre><code>count_lakes(['~~..',
             '~...',
             '..~~',
             '...~'])  → 2</code></pre>`,
            starter: P`def count_lakes(grid):
    if not grid:
        return 0
    R, C = len(grid), len(grid[0])
    seen = [[False] * C for _ in range(R)]
    pass
`,
            solution: P`def count_lakes(grid):
    if not grid:
        return 0
    R, C = len(grid), len(grid[0])
    seen = [[False] * C for _ in range(R)]
    lakes = 0
    for i in range(R):
        for j in range(C):
            if grid[i][j] == '~' and not seen[i][j]:
                lakes += 1
                seen[i][j] = True
                stack = [(i, j)]
                while stack:
                    r, c = stack.pop()
                    for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                        if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == '~' and not seen[nr][nc]:
                            seen[nr][nc] = True
                            stack.append((nr, nc))
    return lakes
`,
            hints: ['Әр көрілмеген <code>\'~\'</code> ұяшығынан жаңа көл басталады: санды арттырып, бүкіл көлді белгілеңіз.', 'Белгілеу: стекпен DFS, төрт көрші, шекара мен <code>seen</code> тексеріледі.'],
            check: { tests: P`
assert count_lakes(['~~..', '~...', '..~~', '...~']) == 2, f'Күтілгені 2, сізде {count_lakes(["~~..", "~...", "..~~", "...~"])}'
assert count_lakes([]) == 0 and count_lakes(['...']) == 0, 'Су жоқ — 0'
assert count_lakes(['~.~', '.~.', '~.~']) == 5, 'Диагональ көршілер бір көл емес'
assert count_lakes(['~']) == 1, 'Бір ұяшық'
_g = ['~' * 300 for _ in range(300)]
assert count_lakes(_g) == 1, '300×300 бүтін су — бір көл (рекурсия тереңдігінен сақ болыңыз)'
_g = [''.join('~' if (_i + _j) % 2 == 0 and _i % 2 == 0 else '.' for _j in range(300)) for _i in range(300)]
assert count_lakes(_g) == 150 * 150, '300×300 шахмат тәрізді картада нәтиже қате'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>6. Жылырақ күнді күту.</b> <code>temps[i]</code> — Астанадағы <code>i</code>-күнгі температура. <code>days_until_warmer(temps)</code> әр күн үшін қанша күннен кейін <b>қатаң жылырақ</b> күн келетінін қайтарсын; келмесе 0. Monotonic stack, O(n).
<pre><code>days_until_warmer([-5, -3, -8, 0, -1, 2]) → [1, 2, 1, 2, 1, 0]
days_until_warmer([3, 2, 1])             → [0, 0, 0]</code></pre>`,
            starter: P`def days_until_warmer(temps):
    ans = [0] * len(temps)
    st = []
    return ans
`,
            solution: P`def days_until_warmer(temps):
    ans = [0] * len(temps)
    st = []
    for i, t in enumerate(temps):
        while st and temps[st[-1]] < t:
            j = st.pop()
            ans[j] = i - j
        st.append(i)
    return ans
`,
            hints: ['Стекте жауабы әлі табылмаған күндердің индекстері.', 'Жаңа <code>t</code> стек үстіндегі күннен жылы болса, оны шығарып, <code>ans[j] = i - j</code>.'],
            check: { tests: P`
assert days_until_warmer([-5, -3, -8, 0, -1, 2]) == [1, 2, 1, 2, 1, 0], f'Күтілгені [1, 2, 1, 2, 1, 0], сізде {days_until_warmer([-5, -3, -8, 0, -1, 2])}'
assert days_until_warmer([3, 2, 1]) == [0, 0, 0], 'Тек суыса — бәрі 0'
assert days_until_warmer([]) == [] and days_until_warmer([5]) == [0], 'Бос және бір күн'
assert days_until_warmer([1, 1, 2]) == [2, 1, 0], 'Тең температура жылырақ емес'
import time as _time
_t = list(range(5000, 0, -1))
_t0 = _time.perf_counter(); days_until_warmer(_t); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — O(n²). Monotonic stack жазыңыз'
_t = list(range(50000, 0, -1)) + [10**6] * 50000
_v = days_until_warmer(_t)
assert _v[0] == 50000 and _v[49999] == 1 and _v[-1] == 0, '100 000 күнде нәтиже қате'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>7. Пәндер реті.</b> Университетте <code>n</code> пән (<code>0..n−1</code>) бар; <code>prereqs</code> — <code>(a, b)</code> жұптары: <code>a</code>-ны оқу үшін алдымен <code>b</code> керек. <code>course_order(n, prereqs)</code> барлық пәнді оқуға болатын кез келген ретті қайтарсын; цикл болса <code>[]</code>. Kahn алгоритмі.
<pre><code>course_order(3, [(1, 0), (2, 1)]) → [0, 1, 2]
course_order(2, [(0, 1), (1, 0)]) → []</code></pre>`,
            starter: P`from collections import deque

def course_order(n, prereqs):
    adj = [[] for _ in range(n)]
    indeg = [0] * n
    pass
`,
            solution: P`from collections import deque

def course_order(n, prereqs):
    adj = [[] for _ in range(n)]
    indeg = [0] * n
    for a, b in prereqs:
        adj[b].append(a)
        indeg[a] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return order if len(order) == n else []
`,
            hints: ['Қыр <code>b → a</code>; <code>indeg[a] += 1</code>. Дәрежесі 0 пәндерден бастаңыз.', 'Пәнді алған сайын көршілерінің дәрежесін азайтыңыз; соңында <code>len(order) == n</code> болмаса — цикл.'],
            check: { tests: P`
def _valid(n, pr, order):
    if sorted(order) != list(range(n)):
        return False
    pos = {c: i for i, c in enumerate(order)}
    return all(pos[b] < pos[a] for a, b in pr)
assert course_order(3, [(1, 0), (2, 1)]) == [0, 1, 2], f'Күтілгені [0, 1, 2], сізде {course_order(3, [(1, 0), (2, 1)])}'
assert course_order(2, [(0, 1), (1, 0)]) == [], 'Цикл болса []'
_o = course_order(4, [(1, 0), (2, 0), (3, 1), (3, 2)])
assert _valid(4, [(1, 0), (2, 0), (3, 1), (3, 2)], _o), f'Рет пререквизиттерді бұзады: {_o}'
assert sorted(course_order(3, [])) == [0, 1, 2], 'Тәуелділік жоқ — кез келген рет, бірақ барлық пән'
assert course_order(1, [(0, 0)]) == [], 'Өзіне тәуелді пән — цикл'
_n = 50000; _pr = [(_i, _i - 1) for _i in range(1, _n)] + [(_i, _i // 2) for _i in range(2, _n)]
_o = course_order(_n, _pr)
assert _valid(_n, _pr, _o), '50 000 пәнде рет дұрыс емес'
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<b>8. Такси маршруты.</b> Алматы көшелерінің торы: <code>grid[i][j]</code> — сол қиылыстан өту құны (₸). Такси сол жақ жоғарғы бұрыштан оң жақ төменгі бұрышқа тек <b>оңға</b> немесе <b>төмен</b> жүреді. <code>min_path_cost(grid)</code> — жолдағы барлық ұяшық құнының (бастапқы мен соңғысын қоса) ең аз қосындысы. 2D DP.
<pre><code>min_path_cost([[1, 3, 1],
               [1, 5, 1],
               [4, 2, 1]]) → 7    # 1→3→1→1→1</code></pre>`,
            starter: P`def min_path_cost(grid):
    R, C = len(grid), len(grid[0])
    dp = [[0] * C for _ in range(R)]
    pass
`,
            solution: P`def min_path_cost(grid):
    R, C = len(grid), len(grid[0])
    dp = [[0] * C for _ in range(R)]
    for i in range(R):
        for j in range(C):
            if i == 0 and j == 0:
                dp[i][j] = grid[0][0]
            elif i == 0:
                dp[i][j] = dp[i][j - 1] + grid[i][j]
            elif j == 0:
                dp[i][j] = dp[i - 1][j] + grid[i][j]
            else:
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    return dp[R - 1][C - 1]
`,
            hints: ['<code>dp[i][j]</code> — (i, j)-ге жетудің ең аз құны; оған тек жоғарыдан немесе солдан келеміз.', 'Бірінші жол мен бірінші бағанды бөлек толтырыңыз.'],
            check: { tests: P`
assert min_path_cost([[1, 3, 1], [1, 5, 1], [4, 2, 1]]) == 7, f'Күтілгені 7, сізде {min_path_cost([[1, 3, 1], [1, 5, 1], [4, 2, 1]])}'
assert min_path_cost([[5]]) == 5, 'Бір ұяшық'
assert min_path_cost([[1, 2, 3]]) == 6 and min_path_cost([[1], [2], [3]]) == 6, 'Бір жол / бір баған'
import random as _random
_R = _random.Random(13)
_g = [[_R.randint(1, 9) for _ in range(300)] for _ in range(300)]
_d = [row[:] for row in _g]
for _i in range(300):
    for _j in range(300):
        if _i or _j:
            _d[_i][_j] += min(_d[_i - 1][_j] if _i else 10**9, _d[_i][_j - 1] if _j else 10**9)
assert min_path_cost(_g) == _d[-1][-1], '300×300 торда нәтиже қате'
` } }
        ]
      },
      {
        id: 'dsa-p3', title: 'Есептер: Қиын', minutes: 75,
        body: `
<p><b>Қиын</b> деңгейдегі есептер бірнеше идеяны біріктіреді және аңғал шешім мүлде жарамайды. Әр есептің астында тексерілген үлгі жатыр — оны танысаңыз, жартысы шешілді.</p>
<table>
<tr><th>Есеп</th><th>Негізгі идея</th><th>Мақсатты күрделілік</th></tr>
<tr><td>Жаңбыр суы</td><td>екі көрсеткіш + сол/оң максимум</td><td>O(n)</td></tr>
<tr><td>Терезедегі максимум</td><td>monotonic deque</td><td>O(n)</td></tr>
<tr><td>Ең қысқа терезе</td><td>sliding window + жиілік dict</td><td>O(n)</td></tr>
<tr><td>Редакциялық қашықтық</td><td>2D DP</td><td>O(n·m)</td></tr>
<tr><td>Қалалар арасындағы жол</td><td>Dijkstra + heap</td><td>O((V + E) log V)</td></tr>
<tr><td>Ең үлкен тіктөртбұрыш</td><td>monotonic stack</td><td>O(n)</td></tr>
</table>
<h3>Monotonic deque</h3>
<p>Терезеде максимумды ұстау үшін deque-де индекстерді мәндері <b>кему</b> ретімен сақтаймыз. Жаңа элемент келгенде, одан кіші мәндерді артынан шығарамыз (олар енді ешқашан максимум болмайды). Алдыңғы индекс терезеден шықса, алдынан шығарамыз. Сонда <code>dq[0]</code> — әрдайым терезенің максимумы.</p>
<h3>Dijkstra</h3>
<p>Салмағы теріс емес графта ең қысқа жол: heap-те <code>(қашықтық, төбе)</code>. Ең жақын төбені алып, көршілерін «босаңсытамыз» (relax): <code>d + w &lt; dist[v]</code> болса, жаңартып heap-ке саламыз. Heap-тен алынған ескірген жазбаларды (<code>d &gt; dist[u]</code>) өткізіп жібереміз.</p>
<pre><code>dist = [INF] * n; dist[src] = 0
h = [(0, src)]
while h:
    d, u = heapq.heappop(h)
    if d &gt; dist[u]:
        continue
    for v, w in adj[u]:
        if d + w &lt; dist[v]:
            dist[v] = d + w
            heapq.heappush(h, (dist[v], v))</code></pre>
<div class="tip"><b>Кеңес:</b> алдымен шағын мысалды қағазда қадамдап жүріп шығыңыз. Қиын есептердегі қателердің көбі — шекаралар: бос кіріс, <code>k = 1</code>, барлық мән бірдей, жету мүмкін емес төбе.</div>`,
        exercises: [
          { type: 'python', level: 'hard', xp: 30, prompt: P`<b>1. Шатқалдағы жаңбыр суы.</b> <code>heights[i]</code> — ені 1 болатын жартастың биіктігі. Жаңбырдан кейін жартастар арасында қанша су жиналады? <code>trap_water(heights)</code>, O(n): екі көрсеткіш немесе сол/оң максимум массивтері.
<pre><code>trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) → 6
trap_water([4, 2, 0, 3, 2, 5])                   → 9
trap_water([])                                   → 0</code></pre>`,
            starter: P`def trap_water(heights):
    pass
`,
            solution: P`def trap_water(heights):
    i, j = 0, len(heights) - 1
    lmax = rmax = water = 0
    while i < j:
        if heights[i] < heights[j]:
            lmax = max(lmax, heights[i])
            water += lmax - heights[i]
            i += 1
        else:
            rmax = max(rmax, heights[j])
            water += rmax - heights[j]
            j -= 1
    return water
`,
            hints: ['Әр бағанадағы су = min(сол жақ максимум, оң жақ максимум) − биіктік.', 'Екі көрсеткіш: аласа жақтағы шекара шешуші, сол жақты жылжытып <code>lmax</code>, оң жақты жылжытып <code>rmax</code> жаңартыңыз.'],
            check: { tests: P`
assert trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6, f'Күтілгені 6, сізде {trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])}'
assert trap_water([4, 2, 0, 3, 2, 5]) == 9, 'Күтілгені 9'
assert trap_water([]) == 0 and trap_water([5]) == 0 and trap_water([1, 2, 3]) == 0, 'Су жиналмайтын жағдайлар'
assert trap_water([3, 0, 3]) == 3, '[3, 0, 3] → 3'
import time as _time
_h = [0] * 10000; _h[0] = _h[-1] = 5
_t0 = _time.perf_counter(); _v = trap_water(_h); _dt = _time.perf_counter() - _t0
assert _v == 5 * 9998, '10 000 бағанда нәтиже қате'
assert _dt < 0.15, f'n=10 000 үшін {_dt:.2f} с — әр бағанда max(...) қайта есептелуде (O(n²)). O(n) жазыңыз'
_h = [(_i * 7919) % 1000 for _i in range(100000)]
_l = [0] * 100000; _r = [0] * 100000; _m = 0
for _i in range(100000):
    _m = max(_m, _h[_i]); _l[_i] = _m
_m = 0
for _i in range(99999, -1, -1):
    _m = max(_m, _h[_i]); _r[_i] = _m
_exp = sum(min(_l[_i], _r[_i]) - _h[_i] for _i in range(100000))
assert trap_water(_h) == _exp, f'n = 100 000 кезінде күтілгені {_exp}, сізде {trap_water(_h)}'
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<b>2. Биржадағы терезе максимумы.</b> <code>prices</code> — минут сайынғы акция бағасы. <code>window_max(prices, k)</code> ұзындығы <code>k</code> болатын әр жылжымалы терезенің максимумын қайтарсын (<code>len − k + 1</code> мән). Monotonic deque, O(n).
<pre><code>window_max([1, 3, -1, -3, 5, 3, 6, 7], 3) → [3, 3, 5, 5, 6, 7]
window_max([9, 4], 1)                     → [9, 4]</code></pre>`,
            starter: P`from collections import deque

def window_max(prices, k):
    dq = deque()
    out = []
    return out
`,
            solution: P`from collections import deque

def window_max(prices, k):
    dq = deque()
    out = []
    for i, x in enumerate(prices):
        while dq and prices[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(prices[dq[0]])
    return out
`,
            hints: ['Deque-де индекстер, мәндері кему ретімен: жаңа <code>x</code>-тен кіші не тең мәндерді артынан <code>pop</code>.', 'Алдыңғы индекс <code>i - k</code>-дан аспаса, <code>popleft</code>; <code>i &gt;= k - 1</code> болғанда <code>prices[dq[0]]</code>-ді жазыңыз.'],
            check: { tests: P`
assert window_max([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7], f'Күтілгені [3, 3, 5, 5, 6, 7], сізде {window_max([1, 3, -1, -3, 5, 3, 6, 7], 3)}'
assert window_max([9, 4], 1) == [9, 4], 'k = 1 — әр элементтің өзі'
assert window_max([2, 2, 2], 3) == [2], 'Бір терезе'
assert window_max([1, 2, 3, 4], 2) == [2, 3, 4] and window_max([4, 3, 2, 1], 2) == [4, 3, 2], 'Өспелі және кемімелі'
import time as _time, random as _random
_R = _random.Random(21)
_p = [_R.randint(0, 10**6) for _ in range(20000)]
_t0 = _time.perf_counter(); _v = window_max(_p, 10000); _dt = _time.perf_counter() - _t0
assert len(_v) == 10001 and _v[0] == max(_p[:10000]) and _v[-1] == max(_p[-10000:]), 'n = 20 000, k = 10 000 кезінде нәтиже қате'
assert _dt < 0.3, f'n=20 000, k=10 000 үшін {_dt:.2f} с — әр терезеде max() қайта есептелуде. Monotonic deque жазыңыз'
_p = [_R.randint(0, 10**6) for _ in range(100000)]
_v = window_max(_p, 50)
assert len(_v) == 99951 and all(_v[_i] == max(_p[_i:_i + 50]) for _i in range(0, 99951, 997)), '100 000 элементте нәтиже қате'
` } },
          { type: 'python', level: 'hard', xp: 35, prompt: P`<b>3. Ең қысқа қамтитын терезе.</b> <code>min_window(s, t)</code> — <code>s</code>-тың <code>t</code>-дағы барлық таңбаны (қайталануларымен) қамтитын ең қысқа <b>үздіксіз</b> ішкі жолы. Ондай жоқ болса <code>''</code>; ұзындығы бірдей бірнеше болса — ең сол жақтағысы. Sliding window + жиілік санауыш, O(|s| + |t|).
<pre><code>min_window('ADOBECODEBANC', 'ABC') → 'BANC'
min_window('алматыастана', 'тас')  → 'аст'
min_window('a', 'aa')              → ''</code></pre>`,
            starter: P`from collections import Counter

def min_window(s, t):
    need = Counter(t)
    pass
`,
            solution: P`from collections import Counter

def min_window(s, t):
    need = Counter(t)
    missing = len(t)
    if missing == 0:
        return ''
    l = 0
    best = (float('inf'), 0, 0)
    for r, ch in enumerate(s):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        if missing == 0:
            while need[s[l]] < 0:
                need[s[l]] += 1
                l += 1
            if r - l + 1 < best[0]:
                best = (r - l + 1, l, r + 1)
            need[s[l]] += 1
            missing += 1
            l += 1
    return '' if best[0] == float('inf') else s[best[1]:best[2]]
`,
            hints: ['<code>need</code> — әлі керек таңбалар саны, <code>missing</code> — барлығы қанша жетіспейді. <code>r</code>-ді жылжытып, <code>missing == 0</code> болғанша кеңейтіңіз.', 'Сосын сол жақтан артық таңбаларды (<code>need[...] &lt; 0</code>) тастап, терезені жазыңыз да, бір керекті таңбаны шығарып, іздеуді жалғастырыңыз.'],
            check: { tests: P`
assert min_window('ADOBECODEBANC', 'ABC') == 'BANC', f"Күтілгені 'BANC', сізде {min_window('ADOBECODEBANC', 'ABC')!r}"
assert min_window('алматыастана', 'тас') == 'аст', "Күтілгені 'аст'"
assert min_window('алматыастана', 'ата') == 'атыа', "'ата' үшін екі 'а' мен бір 'т' керек: 'атыа'"
assert min_window('a', 'aa') == '', 'Таңба жетпесе бос жол'
assert min_window('a', 'a') == 'a' and min_window('ab', 'b') == 'b', 'Шағын жағдайлар'
assert min_window('abcab', 'ab') == 'ab', 'Бірдей ұзындықта ең сол жақтағысы'
assert min_window('xyz', '') == '', 't бос болса бос жол'
import time as _time
_s = 'x' * 1000 + 'ab'
_t0 = _time.perf_counter(); _v = min_window(_s, 'ab'); _dt = _time.perf_counter() - _t0
assert _v == 'ab', "Соңындағы 'ab' табылуы керек"
assert _dt < 0.1, f'n=1000 үшін {_dt:.2f} с — әр бастау нүктесінен қайта іздемеңіз, sliding window жазыңыз'
_s = ''.join('абвгд'[(_i * _i) % 5] for _i in range(100000)) + 'е' + 'а' * 50 + 'ж'
assert min_window(_s, 'еж') == 'е' + 'а' * 50 + 'ж', '100 000 таңбалы жолда нәтиже қате'
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<b>4. Транслитерация қателері.</b> Латын әліпбиіне көшкенде бір сөз әртүрлі жазылады. <code>edit_distance(a, b)</code> — <code>a</code>-ны <code>b</code>-ға айналдыруға қажет ең аз амал саны (бір таңбаны қосу, өшіру немесе ауыстыру; Левенштейн қашықтығы). 2D DP, O(n·m).
<pre><code>edit_distance('qazaq', 'kazakh')  → 3
edit_distance('kitten', 'sitting') → 3
edit_distance('', 'abc')           → 3</code></pre>`,
            starter: P`def edit_distance(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    pass
`,
            solution: P`def edit_distance(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        dp[i][0] = i
    for j in range(m + 1):
        dp[0][j] = j
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[n][m]
`,
            hints: ['<code>dp[i][j]</code> — <code>a[:i]</code>-ды <code>b[:j]</code>-ға айналдыру құны; <code>dp[i][0] = i</code>, <code>dp[0][j] = j</code>.', 'Таңбалар тең болса <code>dp[i-1][j-1]</code>, әйтпесе <code>1 + min(өшіру, қосу, ауыстыру)</code>.'],
            check: { tests: P`
assert edit_distance('qazaq', 'kazakh') == 3, f"Күтілгені 3, сізде {edit_distance('qazaq', 'kazakh')}"
assert edit_distance('kitten', 'sitting') == 3, 'Күтілгені 3'
assert edit_distance('', 'abc') == 3 and edit_distance('abc', '') == 3, 'Бос жолдан/бос жолға'
assert edit_distance('алма', 'алма') == 0, 'Бірдей сөздер — 0'
assert edit_distance('шәй', 'шай') == 1, 'Бір ауыстыру'
import time as _time
_t0 = _time.perf_counter(); _v = edit_distance('abcdefghi', 'jklmnopqr'); _dt = _time.perf_counter() - _t0
assert _v == 9, 'Ортақ таңбасыз 9 әріпті сөздер — 9'
assert _dt < 0.1, f'{_dt:.2f} с — мемоизациясыз рекурсия экспоненциал. DP кестесін толтырыңыз'
_a = ''.join('абвгд'[_i % 5] for _i in range(700)); _b = ''.join('абвгд'[_i % 5] for _i in range(1, 701))
assert edit_distance(_a, _b) == 2, '700 таңбалы жолдарда нәтиже қате (бір өшіру + бір қосу = 2)'
` } },
          { type: 'python', level: 'hard', xp: 35, prompt: P`<b>5. Қалалар арасындағы ең қысқа жол.</b> <code>n</code> қала (<code>0..n−1</code>), <code>roads</code> — <code>(u, v, km)</code> екі бағытты жолдар. <code>shortest_km(n, roads, src)</code> <code>src</code>-тан әр қалаға дейінгі ең қысқа қашықтықтар тізімін қайтарсын; жетуге болмаса <code>-1</code>. Dijkstra + <code>heapq</code>.
<pre><code># 0 Алматы, 1 Қонаев, 2 Талдықорған, 3 Балқаш, 4 Ақтау
roads = [(0, 1, 70), (1, 2, 200), (0, 2, 280), (2, 3, 450)]
shortest_km(5, roads, 0) → [0, 70, 270, 720, -1]</code></pre>`,
            starter: P`import heapq

def shortest_km(n, roads, src):
    adj = [[] for _ in range(n)]
    for u, v, w in roads:
        adj[u].append((v, w))
        adj[v].append((u, w))
    pass
`,
            solution: P`import heapq

def shortest_km(n, roads, src):
    adj = [[] for _ in range(n)]
    for u, v, w in roads:
        adj[u].append((v, w))
        adj[v].append((u, w))
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0
    h = [(0, src)]
    while h:
        d, u = heapq.heappop(h)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(h, (dist[v], v))
    return [x if x != INF else -1 for x in dist]
`,
            hints: ['<code>dist = [inf] * n</code>, <code>dist[src] = 0</code>, heap-те <code>(0, src)</code>.', 'Алынған <code>d &gt; dist[u]</code> болса өткізіңіз; көршіге <code>d + w &lt; dist[v]</code> болса жаңартып, heap-ке салыңыз. Соңында inf → -1.'],
            check: { tests: P`
_roads = [(0, 1, 70), (1, 2, 200), (0, 2, 280), (2, 3, 450)]
assert shortest_km(5, _roads, 0) == [0, 70, 270, 720, -1], f'Күтілгені [0, 70, 270, 720, -1], сізде {shortest_km(5, _roads, 0)}'
assert shortest_km(5, _roads, 3) == [720, 650, 450, 0, -1], 'Басқа бастау қаласынан'
assert shortest_km(1, [], 0) == [0], 'Бір қала'
assert shortest_km(3, [(0, 1, 5), (0, 1, 2), (1, 2, 0)], 0) == [0, 2, 2], 'Параллель жолдар мен нөлдік ұзындық'
import random as _random, time as _time
_R = _random.Random(31)
def _mk(n, m):
    e = [(_i, _i + 1, 1) for _i in range(n - 1)]
    for _ in range(m):
        u = _R.randrange(n); v = _R.randrange(n)
        if u > v: u, v = v, u
        e.append((u, v, (v - u) + _R.randint(0, 5)))
    return e
_e = _mk(6000, 20000)
_t0 = _time.perf_counter(); _d = shortest_km(6000, _e, 0); _dt = _time.perf_counter() - _t0
assert _d == list(range(6000)), '6000 қалада қашықтықтар қате'
assert _dt < 0.3, f'6000 қала үшін {_dt:.2f} с — ең жақын қаланы тізімнен іздеу O(V²). heapq қолданыңыз'
_e = _mk(20000, 80000)
assert shortest_km(20000, _e, 0) == list(range(20000)), '20 000 қала, 100 000 жолда нәтиже қате'
` } },
          { type: 'python', level: 'hard', xp: 35, prompt: P`<b>6. Ең үлкен билборд.</b> Көше бойындағы ғимараттар ені 1, биіктіктері <code>heights</code>. Олардың қабырғасына ілінетін ең үлкен тіктөртбұрышты билбордтың ауданы қандай (тіктөртбұрыш қатар тұрған ғимараттарды қамтиды, биіктігі олардың ең аласасынан аспайды)? <code>largest_rectangle(heights)</code>, monotonic stack, O(n).
<pre><code>largest_rectangle([2, 1, 5, 6, 2, 3]) → 10   # 5 және 6: 2 × 5
largest_rectangle([2, 4])             → 4
largest_rectangle([])                 → 0</code></pre>`,
            starter: P`def largest_rectangle(heights):
    st = []
    best = 0
    return best
`,
            solution: P`def largest_rectangle(heights):
    st = []
    best = 0
    hs = list(heights) + [0]
    for i, h in enumerate(hs):
        start = i
        while st and st[-1][1] >= h:
            idx, hh = st.pop()
            best = max(best, hh * (i - idx))
            start = idx
        st.append((start, h))
    return best
`,
            hints: ['Стекте <code>(басталу_индексі, биіктік)</code> өспелі ретпен. Соңына 0 биіктік қосып, бәрін «жабыңыз».', 'Жаңа <code>h</code> үстіңгіден аласа болса, шығарып, ауданын <code>hh * (i - idx)</code> есептеңіз; жаңа элемент <code>idx</code>-тен басталады.'],
            check: { tests: P`
assert largest_rectangle([2, 1, 5, 6, 2, 3]) == 10, f'Күтілгені 10, сізде {largest_rectangle([2, 1, 5, 6, 2, 3])}'
assert largest_rectangle([2, 4]) == 4 and largest_rectangle([]) == 0, 'Шағын жағдайлар'
assert largest_rectangle([5]) == 5 and largest_rectangle([3, 3, 3]) == 9, 'Бір ғимарат және бірдей биіктіктер'
assert largest_rectangle([6, 2, 5, 4, 5, 1, 6]) == 12, 'Күтілгені 12'
import time as _time
_h = list(range(1, 3001))
_t0 = _time.perf_counter(); _v = largest_rectangle(_h); _dt = _time.perf_counter() - _t0
assert _v == 1500 * 1501, '1..3000 үшін нәтиже қате'
assert _dt < 0.15, f'n=3000 үшін {_dt:.2f} с — O(n²). Monotonic stack жазыңыз'
_n = 100000
assert largest_rectangle([7] * _n) == 7 * _n, '100 000 бірдей ғимаратта нәтиже қате'
assert largest_rectangle(list(range(_n, 0, -1))) == 50000 * 50001, '100 000 кемімелі ғимаратта нәтиже қате'
` } }
        ]
      },
      {
        id: 'dsa-gate', gate: true, title: 'Модуль емтиханы: Data Structures & Algorithms', minutes: 45,
        body: `
<p>Модульдің қорытынды емтиханы: құрылымды таңдау, күрделілікті бағалау және үш алгоритмдік есеп (heap, DP, merge sort негізіндегі санау). Өту шегі — 75%. Python тапсырмаларында тест үлкен кіріспен де тексереді, сондықтан алдымен күрделілікті ойлаңыз.</p>
<ul>
<li>Шешім жазбас бұрын: кіріс өлшемі қандай, қандай Big-O жеткілікті?</li>
<li>Шеткі жағдайлар: бос кіріс, бір элемент, тең мәндер.</li>
<li>Алдымен кішкентай мысалды қолмен тексеріңіз, сосын іске қосыңыз.</li>
</ul>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 30, prompt: 'Тіркеу жүйесінде 2 000 000 ЖСН (ИИН) бар. Жаңа өтінім келгенде «бұл ЖСН бұрын тіркелген бе?» деп секундына мыңдаған рет тексеру керек. Қай құрылым?', options: ['Сұрыпталмаған list және <code>in</code>', 'set', 'Linked list', 'Әр сұрауда list-ті сұрыптап, binary search'], answer: 1, explain: 'set-те тексеру орта есеппен O(1). list-те in — O(n), әр сұрауда сұрыптау — O(n log n).' },
          { type: 'number', level: 'medium', xp: 30, prompt: 'Merge sort 1024 элементті тізімді бір элементті бөліктерге дейін екіге бөледі. Неше бөлу деңгейі (рекурсия тереңдігі) болады?', answer: 10, tol: 0, explain: '1024 = 2¹⁰: 1024 → 512 → … → 1, яғни 10 деңгей. Әр деңгейде біріктіру O(n), жалпы O(n log n).' },
          { type: 'quiz', level: 'medium', xp: 30, prompt: 'R жол, C бағаннан тұратын карта торында BFS-тің уақыт күрделілігі қандай?', options: ['O(R + C)', 'O(R · C)', 'O((R · C)²)', 'O(log(R · C))'], answer: 1, explain: 'Әр ұяшық (төбе) бір рет кезекке кіреді, әрқайсысында ең көбі 4 көрші тексеріледі: O(V + E) = O(R · C).' },
          { type: 'python', level: 'medium', xp: 35, prompt: P`<b>Кездесу бөлмелері.</b> Кеңседегі кездесулер <code>(start, end)</code> түрінде берілген (<code>end</code> сәтінде бөлме босайды, сондықтан <code>(9, 10)</code> мен <code>(10, 11)</code> бір бөлмеде өте алады). <code>min_rooms(meetings)</code> — барлық кездесуге қажет ең аз бөлме саны. Басталуы бойынша сұрыптап, аяқталу уақыттарының min-heap-ін ұстаңыз: O(n log n). Тест 100 000 кездесумен тексереді.
<pre><code>min_rooms([(9, 10), (9, 12), (11, 13)]) → 2
min_rooms([(1, 5), (5, 6)])             → 1
min_rooms([])                           → 0</code></pre>`,
            starter: P`import heapq

def min_rooms(meetings):
    pass
`,
            solution: P`import heapq

def min_rooms(meetings):
    h = []
    for s, e in sorted(meetings):
        if h and h[0] <= s:
            heapq.heapreplace(h, e)
        else:
            heapq.heappush(h, e)
    return len(h)
`,
            hints: ['Heap-те әр бөлменің босайтын уақыты. Ең ерте босайтын <code>h[0] &lt;= s</code> болса, сол бөлмені қайта қолданыңыз (<code>heapreplace</code>).', 'Әйтпесе жаңа бөлме: <code>heappush</code>. Жауап — heap өлшемі.'],
            check: { tests: P`
assert min_rooms([(9, 10), (9, 12), (11, 13)]) == 2, f'Күтілгені 2, сізде {min_rooms([(9, 10), (9, 12), (11, 13)])}'
assert min_rooms([(1, 5), (5, 6)]) == 1, 'Біреуі аяқталған сәтте екіншісі бастала алады'
assert min_rooms([]) == 0, 'Кездесу жоқ — 0'
assert min_rooms([(1, 10), (2, 9), (3, 8)]) == 3, 'Бәрі қиылысса — 3'
assert min_rooms([(5, 8), (1, 3), (2, 6)]) == 2, 'Сұрыпталмаған кіріс'
import time as _time
_m = [(_i, _i + 10**6) for _i in range(5000)]
_t0 = _time.perf_counter(); _v = min_rooms(_m); _dt = _time.perf_counter() - _t0
assert _v == 5000 and _dt < 0.15, f'n=5000 үшін {_dt:.2f} с — O(n²) сияқты. Сұрыптау + heap қолданыңыз'
_m = [((_i * 37) % 100000, (_i * 37) % 100000 + 10) for _i in range(100000)]
assert min_rooms(_m) == 10, f'100 000 кездесуде күтілгені 10, сізде {min_rooms(_m)}'
` } },
          { type: 'python', level: 'medium', xp: 35, prompt: P`<b>Жарнама слоттары.</b> Телеарна әр күнге жарнама табысын болжады: <code>income[i]</code> мың ₸. Көрермен шаршамауы үшін <b>қатар тұрған екі күнге</b> жарнама қоюға болмайды. <code>best_income(income)</code> — ең көп жалпы табыс. DP: O(n), тест 100 000 күнмен тексереді.
<pre><code>best_income([2, 7, 9, 3, 1]) → 12   # 2 + 9 + 1
best_income([2, 1, 1, 2])    → 4    # 2 + 2
best_income([])              → 0</code></pre>`,
            starter: P`def best_income(income):
    pass
`,
            solution: P`def best_income(income):
    take, skip = 0, 0
    for x in income:
        take, skip = skip + x, max(take, skip)
    return max(take, skip)
`,
            hints: ['Екі күй: бүгін жарнама қойдық (<code>take</code>) / қоймадық (<code>skip</code>).', '<code>take = skip + x</code> (кеше қоймаған болуымыз керек), <code>skip = max(take, skip)</code> — бір мезгілде жаңартыңыз.'],
            check: { tests: P`
assert best_income([2, 7, 9, 3, 1]) == 12, f'Күтілгені 12, сізде {best_income([2, 7, 9, 3, 1])}'
assert best_income([2, 1, 1, 2]) == 4, 'Күтілгені 4 (бірінші мен соңғы)'
assert best_income([]) == 0 and best_income([5]) == 5, 'Бос және бір күн'
assert best_income([1, 100, 1]) == 100, 'Ортадағы үлкен күн'
import time as _time
_t0 = _time.perf_counter(); _v = best_income(list(range(32))); _dt = _time.perf_counter() - _t0
assert _v == sum(range(1, 32, 2)), '0..31 үшін нәтиже қате'
assert _dt < 0.05, f'{_dt:.2f} с — экспоненциал рекурсия. Әр күнді бір рет өңдейтін DP жазыңыз'
_inc = [(_i * 31) % 97 for _i in range(100000)]
_a, _b = 0, 0
for _x in _inc:
    _a, _b = _b + _x, max(_a, _b)
assert best_income(_inc) == max(_a, _b), '100 000 күнде нәтиже қате'
` } },
          { type: 'python', level: 'hard', xp: 40, prompt: P`<b>Инверсиялар.</b> Рейтингтер тізімінде <code>i &lt; j</code>, бірақ <code>a[i] &gt; a[j]</code> болатын жұптар — инверсиялар; олар тізімнің «қаншалықты ретсіз» екенін көрсетеді. <code>count_inversions(a)</code> олардың санын O(n log n)-де есептесін: merge sort-ты біріктіру кезінде санаңыз (оң жақтан элемент алынғанда, сол жақта қалғандардың бәрі одан үлкен). Тест 100 000 элементпен тексереді.
<pre><code>count_inversions([2, 4, 1, 3, 5]) → 3    # (2,1), (4,1), (4,3)
count_inversions([5, 4, 3, 2, 1]) → 10
count_inversions([])              → 0</code></pre>`,
            starter: P`def count_inversions(a):
    def sort_count(arr):
        # (сұрыпталған тізім, инверсия саны) қайтарсын
        pass
    return 0
`,
            solution: P`def count_inversions(a):
    def sort_count(arr):
        if len(arr) <= 1:
            return list(arr), 0
        mid = len(arr) // 2
        left, x = sort_count(arr[:mid])
        right, y = sort_count(arr[mid:])
        out, i, j, inv = [], 0, 0, x + y
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                out.append(left[i]); i += 1
            else:
                out.append(right[j]); j += 1
                inv += len(left) - i
        out.extend(left[i:])
        out.extend(right[j:])
        return out, inv
    return sort_count(a)[1]
`,
            hints: ['<code>sort_count</code> merge sort сияқты: екі жартысын рекурсивті өңдеп, инверсияларын қосыңыз.', 'Біріктіруде <code>right[j]</code> алынса, <code>inv += len(left) - i</code>. Тең мәндер инверсия емес: <code>&lt;=</code>.'],
            check: { tests: P`
assert count_inversions([2, 4, 1, 3, 5]) == 3, f'Күтілгені 3, сізде {count_inversions([2, 4, 1, 3, 5])}'
assert count_inversions([5, 4, 3, 2, 1]) == 10, 'Кемімелі 5 элемент — 10'
assert count_inversions([]) == 0 and count_inversions([7]) == 0, 'Бос және бір элемент'
assert count_inversions([1, 1, 1]) == 0, 'Тең мәндер инверсия емес'
import time as _time, random as _random
_R = _random.Random(41)
_a = [_R.randint(0, 50) for _ in range(300)]
assert count_inversions(_a) == sum(1 for _i in range(300) for _j in range(_i + 1, 300) if _a[_i] > _a[_j]), 'Кездейсоқ 300 элементте нәтиже қате'
_a = list(range(8000, 0, -1))
_t0 = _time.perf_counter(); _v = count_inversions(_a); _dt = _time.perf_counter() - _t0
assert _v == 8000 * 7999 // 2, '8000 кемімелі элементте нәтиже қате'
assert _dt < 0.5, f'n=8000 үшін {_dt:.2f} с — бұл O(n²). Merge sort арқылы санаңыз'
_a = [(_i * 7) % 100000 for _i in range(100000)]
_v = count_inversions(_a)
_bit = [0] * 100001; _exp = 0
for _k, _x in enumerate(_a):
    _p = _x + 1; _s = 0
    while _p > 0:
        _s += _bit[_p]; _p -= _p & -_p
    _exp += _k - _s
    _p = _x + 1
    while _p <= 100000:
        _bit[_p] += 1; _p += _p & -_p
assert _v == _exp, f'100 000 элементте күтілгені {_exp}, сізде {_v}'
` } }
        ]
      }
    ]
  };
})();
