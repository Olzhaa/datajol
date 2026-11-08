// DSA2 Advanced Algorithms. Continues DSA1: problem-solving method, sliding window and prefix sums, hash table internals, counting sort and heapsort, AVL rotations, union-find, Dijkstra, MST, greedy, DP II, KMP and trie; all exercises are pure-Python (stdlib) functions checked in Pyodide.
// Efficiency tests build their inputs inside the tests (random.Random with a fixed seed) and time a run that the intended solution finishes far below the limit.
(function () {
  const P = String.raw;

  DJ.modules['dsa-2'] = {
    intro: 'DSA1-ден кейінгі қадам: есепті жүйелі шешу тәсілі, sliding window мен prefix sum, hash table-дың ішкі құрылысы, сызықтық сұрыптау мен heapsort, теңгерімді ағаштар, union-find, Dijkstra, minimum spanning tree, greedy, күрделірек DP, KMP және trie. Әр сабақта алгоритмді Python-да өзіңіз жазасыз, тесттер шеткі жағдайларды да, жылдамдықты да тексереді.',
    lessons: [
      {
        id: 'alg-1', title: 'Алгоритмдік есепті шешу тәсілі', minutes: 15,
        body: `
<p>DSA1 курсында құралдарды үйрендіңіз: hash map, екі көрсеткіш, binary search, BFS, DP. Енді сұрақ басқа: <b>жаңа есепті көргенде қайдан бастау керек?</b> Тәжірибелі әзірлеуші бірден код жазбайды. Ол бірнеше қадамнан тұратын тұрақты тәртіппен жүреді.</p>
<h3>Бес қадам</h3>
<ul>
<li><b>Шартты оқу.</b> Кіріс не, шығыс не, шектеулер қандай? <code>n ≤ 10⁵</code> болса, O(n²) өтпейді. Сандар теріс бола ала ма? Бос тізім келуі мүмкін бе?</li>
<li><b>Мысалдар.</b> Берілген мысалды қолмен шешіңіз, сосын өзіңіз шеткі мысал ойлап табыңыз: бос кіріс, бір элемент, барлығы бірдей, ең үлкен мән.</li>
<li><b>Brute force.</b> Алдымен ең қарапайым дұрыс шешімді айтыңыз (кейде жазыңыз). Ол баяу болса да, жауапты тексеретін «эталон» болады.</li>
<li><b>Жақсарту.</b> Brute force-тың қай бөлігі қайталанады? Оны set, dict, сұрыптау, prefix sum немесе heap арқылы жылдамдатуға бола ма?</li>
<li><b>Тексеру.</b> Уақыт пен <b>жад</b> күрделілігін атаңыз, шеткі жағдайларды кодпен өткізіңіз.</li>
</ul>
<h3>Уақыт және жад</h3>
<p>Big-O тек уақытқа емес, жадқа да қолданылады. <code>set</code>-ке n элемент жинасаңыз, қосымша жад O(n). n×m DP кестесі O(n·m) жад алады, ал тек алдыңғы қатарды сақтасаңыз, O(m) жеткілікті. Рекурсия да жад жейді: тереңдігі d болса, стекте d кадр тұрады.</p>
<h3>Жартылай ашық аралық [l, r)</h3>
<p>Python-да <code>range(l, r)</code> және <code>a[l:r]</code> сол жақты қосады, оң жақты қоспайды. Бұл ыңғайлы: ұзындығы <code>r - l</code>, ал <code>[0, k)</code> және <code>[k, n)</code> бір-бірін жаппай, тізімді толық бөледі. Өз функцияларыңызда да осы келісімді ұстаныңыз, сонда «бір артық, бір кем» (off-by-one) қателері азаяды.</p>
<pre><code>from bisect import bisect_left

# Алматыдағы дүкеннің сұрыпталған чек сомалары
checks = [800, 1200, 1200, 2500, 4000, 7300]
# [1000, 4000) аралығындағы чектер саны
lo = bisect_left(checks, 1000)   # 1000-нан кіші емес бірінші индекс: 1
hi = bisect_left(checks, 4000)   # 4000-нан кіші емес бірінші индекс: 4
print(hi - lo)                   # 3 чек: 1200, 1200, 2500</code></pre>
<p>Екі <code>bisect_left</code> шақыруы және <code>hi - lo</code> айырмасы: жартылай ашық аралықтың классикалық үлгісі. Әр сұрау O(log n).</p>
<h3>Жиі қателер</h3>
<ul>
<li>Шектеулерді оқымай, бірден O(n²) жазу.</li>
<li>Циклдің соңғы индексі: <code>range(len(a) - 1)</code> соңғы элементті өткізіп жібереді.</li>
<li>Бос кірісті тексермеу: <code>max([])</code> қате береді.</li>
<li>Brute force-пен салыстырмай, жылдам шешімге сеніп қалу.</li>
</ul>
<h3>Сұхбат кезеңдері</h3>
<p>Техникалық сұхбат әдетте осылай өтеді: есепті нақтылау сұрақтары (2-3 минут), brute force идеясы, жақсартылған идея және оның күрделілігі, код жазу, мысалмен қолмен «жүгіріп» шығу. Үнсіз отырмаңыз: ойлау барысын дауыстап айту кодтың өзі сияқты бағаланады.</p>
<div class="tip"><b>Кеңес:</b> кез келген жылдам шешімді жазғанда brute force нұсқасын қатар ұстаңыз да, кездейсоқ шағын кірістерде екеуін салыстырыңыз. Бұл тестілеудің ең арзан әрі ең сенімді тәсілі.</div>`,
        exercises: [
          { type: 'python', level: 'easy', xp: 15, prompt: P`Онлайн-кітапханада <code>n</code> кітап бар, бір бетке <code>size</code> кітап сыяды. <code>pages(n, size)</code> функциясы әр бетті жартылай ашық аралық <code>(l, r)</code> ретінде қайтарсын: бетте <code>l</code>-ден <code>r - 1</code>-ге дейінгі кітаптар.
<pre><code>pages(10, 4) → [(0, 4), (4, 8), (8, 10)]
pages(8, 4)  → [(0, 4), (4, 8)]
pages(0, 3)  → []</code></pre>`,
            starter: P`def pages(n, size):
    return []
`,
            solution: P`def pages(n, size):
    return [(l, min(l + size, n)) for l in range(0, n, size)]
`,
            hints: ['<code>range(0, n, size)</code> әр беттің басын береді.', 'Соңғы беттің оң шеті <code>n</code>-нен аспауы керек: <code>min(l + size, n)</code>.'],
            check: { tests: P`
assert pages(10, 4) == [(0, 4), (4, 8), (8, 10)], "pages(10, 4): соңғы бет (8, 10) болуы керек"
assert pages(8, 4) == [(0, 4), (4, 8)], "pages(8, 4): бос бет қосылмауы керек"
assert pages(0, 3) == [], "Кітап жоқ болса, бет те жоқ: []"
assert pages(3, 5) == [(0, 3)], "Бір бет жеткілікті: [(0, 3)]"
assert pages(5, 1) == [(i, i + 1) for i in range(5)], "size = 1 болса, әр бетте бір кітап"
_p = pages(1003, 10)
assert sum(r - l for l, r in _p) == 1003 and _p[-1] == (1000, 1003), "Беттер барлық кітаптарды дәл бір рет жабуы керек"
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>count_between(checks, lo, hi)</code>: сұрыпталған <code>checks</code> тізімінде <code>lo ≤ x &lt; hi</code> болатын мәндер саны. Тест мыңдаған сұрау жасайды, сондықтан тізімді әр жолы толық аралау өтпейді: <code>bisect_left</code> қолданыңыз.
<pre><code>count_between([800, 1200, 1200, 2500, 4000], 1000, 4000) → 3
count_between([800, 1200], 5000, 9000)                   → 0
count_between([], 0, 10)                                 → 0</code></pre>`,
            starter: P`from bisect import bisect_left

def count_between(checks, lo, hi):
    return 0
`,
            solution: P`from bisect import bisect_left

def count_between(checks, lo, hi):
    if hi <= lo:
        return 0
    return bisect_left(checks, hi) - bisect_left(checks, lo)
`,
            hints: ['Жауап: <code>bisect_left(checks, hi) - bisect_left(checks, lo)</code>.', '<code>hi ≤ lo</code> болса, аралық бос: 0.'],
            check: { tests: P`
assert count_between([800, 1200, 1200, 2500, 4000], 1000, 4000) == 3, "[1000, 4000) аралығында 3 чек бар, 4000 кірмейді"
assert count_between([800, 1200, 1200, 2500, 4000], 1200, 1201) == 2, "Шеттегі 1200 екі рет саналуы керек"
assert count_between([800, 1200], 5000, 9000) == 0, "Аралықта мән жоқ: 0"
assert count_between([], 0, 10) == 0, "Бос тізім: 0"
assert count_between([5, 6, 7], 7, 5) == 0, "hi ≤ lo болса, аралық бос: 0"
assert count_between([1, 2, 3], 0, 100) == 3, "Барлығы аралықта: 3"
import random as _random, time as _time
_R = _random.Random(7)
_a = sorted(_R.randint(0, 10**6) for _ in range(50000))
_qs = [(_R.randint(0, 10**6), _R.randint(0, 10**6)) for _ in range(3000)]
_t0 = _time.perf_counter()
_res = [count_between(_a, l, h) for l, h in _qs]
_dt = _time.perf_counter() - _t0
assert _res[0] == sum(1 for x in _a if _qs[0][0] <= x < _qs[0][1]), "Үлкен тізімде нәтиже қате"
assert _dt < 0.5, "3000 сұрау тым баяу: әр сұрауды O(log n) bisect арқылы шешіңіз"
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`Кофеханада <code>a</code>: чек сомалары. <code>count_pairs_diff(a, k)</code> айырмасы дәл <code>k</code> болатын индекс жұптарының <code>(i &lt; j)</code> санын қайтарсын: <code>|a[i] - a[j]| == k</code>. Стартерде <code>brute</code> эталоны бар (O(n²)). Сіз O(n) нұсқасын жазыңыз: тест екеуін кездейсоқ кірістерде салыстырады, сосын 60 000 элементпен уақытты өлшейді.
<pre><code>count_pairs_diff([1, 5, 3, 4, 2], 2) → 3   # (1,3), (5,3), (4,2)
count_pairs_diff([7, 7, 7], 0)       → 3
count_pairs_diff([], 1)              → 0</code></pre>`,
            starter: P`from collections import Counter

def brute(a, k):
    return sum(1 for i in range(len(a)) for j in range(i + 1, len(a)) if abs(a[i] - a[j]) == k)

def count_pairs_diff(a, k):
    return 0
`,
            solution: P`from collections import Counter

def brute(a, k):
    return sum(1 for i in range(len(a)) for j in range(i + 1, len(a)) if abs(a[i] - a[j]) == k)

def count_pairs_diff(a, k):
    cnt = Counter(a)
    if k == 0:
        return sum(c * (c - 1) // 2 for c in cnt.values())
    return sum(c * cnt.get(x + k, 0) for x, c in cnt.items())
`,
            hints: ['<code>Counter(a)</code> әр мәннің санын береді. <code>k &gt; 0</code> болса, әр <code>x</code> үшін <code>cnt[x] * cnt[x + k]</code> қосыңыз: әр жұп бір рет саналады.', '<code>k == 0</code> ерекше жағдай: c бірдей мәннен <code>c * (c - 1) // 2</code> жұп шығады.'],
            check: { tests: P`
assert count_pairs_diff([1, 5, 3, 4, 2], 2) == 3, "[1, 5, 3, 4, 2], k=2: 3 жұп"
assert count_pairs_diff([7, 7, 7], 0) == 3, "k = 0: үш бірдей мәннен 3 жұп"
assert count_pairs_diff([], 1) == 0, "Бос тізім: 0"
assert count_pairs_diff([1, 1, 2, 2], 1) == 4, "Қайталанатын мәндер: әр 1 әр 2-мен жұп, барлығы 4"
import random as _random, time as _time
_R = _random.Random(3)
for _ in range(200):
    _a = [_R.randint(0, 9) for _ in range(_R.randint(0, 12))]
    _k = _R.randint(0, 4)
    assert count_pairs_diff(_a, _k) == brute(_a, _k), "brute нәтижесімен сәйкес келмеді: " + str((_a, _k))
_big = [_R.randint(0, 10**5) for _ in range(60000)]
_t0 = _time.perf_counter(); count_pairs_diff(_big, 17); _dt = _time.perf_counter() - _t0
assert _dt < 0.5, "60 000 элемент тым баяу: Counter арқылы O(n) шешіңіз"
` } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Мына функцияның <b>қосымша жад</b> күрделілігі қандай (n = len(a))?<pre><code>def best_day(a):\n    best, cur = 0, 0\n    for x in a:\n        cur = max(0, cur + x)\n        best = max(best, cur)\n    return best</code></pre>', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 0, explain: 'Кіріс тізімнен басқа тек екі айнымалы сақталады: <code>best</code> және <code>cur</code>. Уақыт O(n), қосымша жад O(1).' }
        ]
      },
      {
        id: 'alg-2', title: 'Sliding window және prefix sums', minutes: 17,
        body: `
<p>DSA1-де бір өлшемді prefix sum мен «қайталанбайтын символдары бар ең ұзын жол» есебін көрдік. Бұл сабақта екі техниканы жүйелейміз: <b>sliding window</b> (жылжымалы терезе) және <b>prefix sums</b>, оның ішінде екі өлшемді нұсқасы.</p>
<h3>Тұрақты өлшемді терезе</h3>
<p>Астанадағы автобус паркінде күндік жолаушы саны бар. 7 күндік жылжымалы орташаны есептеу керек. Аңғал тәсіл әр терезені қайта қосады: O(n·k). Ақылды тәсіл: терезе бір қадам оңға жылжығанда, сол жақтан шыққан мәнді алып, оң жақтан кірген мәнді қосамыз. Әр қадам O(1), барлығы O(n).</p>
<pre><code>def moving_sums(a, k):
    if k &gt; len(a):
        return []
    s = sum(a[:k])          # бірінші терезе [0, k)
    out = [s]
    for r in range(k, len(a)):
        s += a[r] - a[r - k]   # a[r] кірді, a[r - k] шықты
        out.append(s)
    return out

print(moving_sums([3, 1, 4, 1, 5], 2))   # [4, 5, 5, 6]</code></pre>
<h3>Өзгермелі өлшемді терезе</h3>
<p>Екі көрсеткіш <code>l</code> мен <code>r</code> терезенің шекарасы <code>[l, r]</code>. <code>r</code> әрқашан оңға жүреді. Терезе шартты бұзса (мысалы, бірдей символ екі рет кездессе немесе әртүрлі символ саны k-дан асса), <code>l</code>-ді шарт қайта орындалғанша оңға жылжытамыз. Әр көрсеткіш n қадамнан аспайды, сондықтан жалпы O(n). Терезедегі символ санын <code>dict</code> немесе <code>Counter</code>-да ұстаймыз; саны 0-ге түскен кілтті өшіру керек, әйтпесе <code>len</code> қате болады.</p>
<h3>Prefix sums: екі өлшем</h3>
<p>Бір өлшемде <code>pre[i]</code> = алғашқы i элементтің қосындысы, ал <code>[l, r)</code> аралығы <code>pre[r] - pre[l]</code>. Кофеханалар желісінің кестесін елестетіңіз: жол = филиал, баған = сағат. «2-5 филиалдардың 9-13 сағаттағы түсімі» сияқты көп сұрауға жауап беру үшін <code>P[i][j]</code> = <code>[0, i) × [0, j)</code> тіктөртбұрышының қосындысы деп құрамыз:</p>
<pre><code>P[i + 1][j + 1] = g[i][j] + P[i][j + 1] + P[i + 1][j] - P[i][j]
# [r1, r2) × [c1, c2) қосындысы:
P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1]</code></pre>
<p>Екі рет алынған бұрыш <code>P[r1][c1]</code> бір рет қайта қосылады (қосу-алу принципі). Кестені құру O(R·C), әр сұрау O(1).</p>
<h3>Жиі қателер</h3>
<ul>
<li>Терезе өлшемі тізімнен үлкен болғанда (<code>k &gt; n</code>) бос нәтижені ұмыту.</li>
<li>Prefix массивін <code>n</code> емес, <code>n + 1</code> ұзындықта құру керек: <code>pre[0] = 0</code>.</li>
<li>Теріс сандар бар тізімде «қосынды ≥ target» үшін sliding window жарамайды: терезені тарылту қосындыны міндетті түрде кемітпейді. Ондай кезде prefix sum + hash map немесе басқа тәсіл керек.</li>
<li>Counter-дан нөлге түскен кілтті өшірмеу.</li>
</ul>
<div class="tip"><b>Кеңес:</b> «қатар тұрған элементтер», «ішкі жол», «соңғы k күн» сөздерін көрсеңіз, алдымен sliding window туралы ойлаңыз. «Көп сұрау, аралық қосындысы» деген болса, prefix sum құрыңыз.</div>`,
        exercises: [
          { type: 'python', level: 'easy', xp: 20, prompt: P`<code>moving_average(values, k)</code>: әр толық <code>k</code> күндік терезенің орташасын 2 таңбаға дейін дөңгелектеп (<code>round(x, 2)</code>) тізім етіп қайтарыңыз. <code>k &gt; len(values)</code> болса, <code>[]</code>. Тест 100 000 күн және k = 2000 тереземен уақытты өлшейді, сондықтан әр терезені қайта қоспаңыз.
<pre><code>moving_average([10, 20, 30, 40], 2) → [15.0, 25.0, 35.0]
moving_average([5], 3)              → []</code></pre>`,
            starter: P`def moving_average(values, k):
    return []
`,
            solution: P`def moving_average(values, k):
    if k <= 0 or k > len(values):
        return []
    s = sum(values[:k])
    out = [round(s / k, 2)]
    for r in range(k, len(values)):
        s += values[r] - values[r - k]
        out.append(round(s / k, 2))
    return out
`,
            hints: ['Бірінші терезенің қосындысын <code>sum(values[:k])</code> арқылы табыңыз.', 'Әр келесі қадамда: <code>s += values[r] - values[r - k]</code>.'],
            check: { tests: P`
assert moving_average([10, 20, 30, 40], 2) == [15.0, 25.0, 35.0], "[10, 20, 30, 40], k=2 → [15.0, 25.0, 35.0]"
assert moving_average([5], 3) == [], "k > len болса, []"
assert moving_average([4, 8, 6], 3) == [6.0], "k = len: бір ғана терезе"
assert moving_average([1, 2], 1) == [1.0, 2.0], "k = 1: әр мән өзі"
assert moving_average([1, 2, 2], 3) == [1.67], "Дөңгелектеу: 5/3 → 1.67"
import random as _random, time as _time
_R = _random.Random(5)
_v = [_R.randint(0, 500) for _ in range(100000)]
_t0 = _time.perf_counter(); _m = moving_average(_v, 2000); _dt = _time.perf_counter() - _t0
assert len(_m) == 98001 and _m[123] == round(sum(_v[123:2123]) / 2000, 2), "Үлкен кірісте нәтиже қате"
assert _dt < 0.5, "100 000 күн тым баяу: терезе қосындысын O(1)-де жаңартыңыз"
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>max_sum_window(a, k)</code>: ұзындығы дәл <code>k</code> болатын терезелердің ішінде қосындысы ең үлкенін тауып, <code>(қосынды, бастапқы_индекс)</code> қайтарыңыз. Бірдей қосынды болса, ең сол жақтағы терезе. <code>k &gt; len(a)</code> немесе <code>k ≤ 0</code> болса, <code>None</code>. Сандар теріс те болады.
<pre><code>max_sum_window([2, -1, 3, 5, -2, 4], 2) → (8, 2)
max_sum_window([-3, -1, -2], 1)         → (-1, 1)</code></pre>`,
            starter: P`def max_sum_window(a, k):
    return (0, 0)
`,
            solution: P`def max_sum_window(a, k):
    if k <= 0 or k > len(a):
        return None
    s = sum(a[:k])
    best, start = s, 0
    for r in range(k, len(a)):
        s += a[r] - a[r - k]
        if s > best:
            best, start = s, r - k + 1
    return (best, start)
`,
            hints: ['Бастапқы <code>best</code> мәні 0 емес, бірінші терезенің қосындысы болуы керек: барлық сан теріс болуы мүмкін.', 'Тек <code>s &gt; best</code> болғанда жаңартыңыз, сонда ең сол жақтағы терезе қалады.'],
            check: { tests: P`
assert max_sum_window([2, -1, 3, 5, -2, 4], 2) == (8, 2), "[3, 5] қосындысы 8, басы 2"
assert max_sum_window([-3, -1, -2], 1) == (-1, 1), "Барлығы теріс: (-1, 1)"
assert max_sum_window([1, 2, 3], 3) == (6, 0), "k = len: бүкіл тізім"
assert max_sum_window([1, 2], 3) is None, "k > len болса, None"
assert max_sum_window([4, 0, 4, 0], 2) == (4, 0), "Тең қосындыда ең сол жақтағы терезе"
assert max_sum_window([], 1) is None, "Бос тізім: None"
import random as _random, time as _time
_R = _random.Random(11)
_a = [_R.randint(-100, 100) for _ in range(100000)]
_t0 = _time.perf_counter(); _res = max_sum_window(_a, 3000); _dt = _time.perf_counter() - _t0
assert _res[0] == sum(_a[_res[1]:_res[1] + 3000]), "Үлкен кірісте қосынды мен индекс сәйкес емес"
assert _dt < 0.5, "Тым баяу: терезе қосындысын әр қадамда O(1)-де жаңартыңыз"
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>longest_k_distinct(s, k)</code>: ең көп дегенде <code>k</code> түрлі символдан тұратын ең ұзын ішкі жолдың (қатар тұрған символдар) ұзындығы. DSA1-дегі «қайталанбайтын символдар» есебінің жалпы түрі. O(n) болуы керек.
<pre><code>longest_k_distinct("eceba", 2)   → 3   # "ece"
longest_k_distinct("aaaa", 1)    → 4
longest_k_distinct("abc", 0)     → 0</code></pre>`,
            starter: P`def longest_k_distinct(s, k):
    return len(s)
`,
            solution: P`def longest_k_distinct(s, k):
    cnt = {}
    l = best = 0
    for r, ch in enumerate(s):
        cnt[ch] = cnt.get(ch, 0) + 1
        while len(cnt) > k:
            left = s[l]
            cnt[left] -= 1
            if cnt[left] == 0:
                del cnt[left]
            l += 1
        best = max(best, r - l + 1)
    return best
`,
            hints: ['<code>cnt</code> сөздігінде терезедегі символдар санын ұстаңыз. <code>len(cnt) &gt; k</code> болғанша <code>l</code>-ді жылжытыңыз.', 'Саны 0-ге түскен символды <code>del cnt[left]</code> арқылы өшіріңіз.'],
            check: { tests: P`
assert longest_k_distinct("eceba", 2) == 3, "eceba, k=2 → 3 (ece)"
assert longest_k_distinct("aaaa", 1) == 4, "aaaa, k=1 → 4"
assert longest_k_distinct("abc", 0) == 0, "k = 0 → 0"
assert longest_k_distinct("", 3) == 0, "Бос жол → 0"
assert longest_k_distinct("abc", 5) == 3, "k символдар санынан көп: бүкіл жол"
assert longest_k_distinct("aabbcc", 2) == 4, "aabbcc, k=2 → 4 (aabb)"
import random as _random, time as _time
_R = _random.Random(2)
def _brute(s, k):
    return max([j - i for i in range(len(s) + 1) for j in range(i, len(s) + 1) if len(set(s[i:j])) <= k] + [0])
for _ in range(60):
    _s = "".join(_R.choice("abc") for _ in range(_R.randint(0, 10)))
    _k = _R.randint(0, 3)
    assert longest_k_distinct(_s, _k) == _brute(_s, _k), "Кездейсоқ тексеруде қате: " + repr((_s, _k))
_big = "".join(_R.choice("abcdefgh") for _ in range(100000))
_t0 = _time.perf_counter(); longest_k_distinct(_big, 4); _dt = _time.perf_counter() - _t0
assert _dt < 0.8, "100 000 символ тым баяу: sliding window O(n) болуы керек"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`Кофеханалар желісі: <code>grid[i][j]</code>: <code>i</code>-филиалдың <code>j</code>-сағаттағы түсімі. <code>rect_sums(grid, queries)</code> әр сұрау <code>(r1, c1, r2, c2)</code> үшін жартылай ашық тіктөртбұрыштың <code>[r1, r2) × [c1, c2)</code> қосындысын қайтарсын. Екі өлшемді prefix sum құрыңыз: тест 10 000 сұрау жібереді.
<pre><code>g = [[1, 2, 3],
     [4, 5, 6]]
rect_sums(g, [(0, 0, 2, 3), (1, 1, 2, 3), (0, 1, 0, 3)]) → [21, 11, 0]</code></pre>`,
            starter: P`def rect_sums(grid, queries):
    return [0 for _ in queries]
`,
            solution: P`def rect_sums(grid, queries):
    R = len(grid)
    C = len(grid[0]) if R else 0
    P = [[0] * (C + 1) for _ in range(R + 1)]
    for i in range(R):
        for j in range(C):
            P[i + 1][j + 1] = grid[i][j] + P[i][j + 1] + P[i + 1][j] - P[i][j]
    return [P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1] for r1, c1, r2, c2 in queries]
`,
            hints: ['<code>P</code> өлшемі <code>(R + 1) × (C + 1)</code>, нөлдермен толтырылған.', 'Сұрау: <code>P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1]</code>.'],
            check: { tests: P`
_g = [[1, 2, 3], [4, 5, 6]]
assert rect_sums(_g, [(0, 0, 2, 3), (1, 1, 2, 3), (0, 1, 0, 3)]) == [21, 11, 0], "Күтілгені [21, 11, 0]"
assert rect_sums(_g, [(0, 2, 2, 3)]) == [9], "Соңғы баған: 3 + 6 = 9"
assert rect_sums(_g, []) == [], "Сұрау жоқ: []"
assert rect_sums([[7]], [(0, 0, 1, 1)]) == [7], "1×1 кесте"
import random as _random, time as _time
_R = _random.Random(9)
_G = [[_R.randint(0, 99) for _ in range(120)] for _ in range(120)]
_Q = [(0, 0, 120, 120)] * 10000
_t0 = _time.perf_counter(); _out = rect_sums(_G, _Q); _dt = _time.perf_counter() - _t0
assert _out[0] == sum(map(sum, _G)), "Толық кестенің қосындысы қате"
assert _dt < 0.5, "10 000 сұрау тым баяу: әр сұрау O(1) болуы үшін prefix кестесін құрыңыз"
` } }
        ]
      },
      {
        id: 'alg-3', title: 'Hash table ішінен', minutes: 18,
        body: `
<p>DSA1-де <code>dict</code> пен <code>set</code>-ті «орташа O(1)» құрал ретінде қолдандық. Бұл сабақта олардың ішінде не болатынын көреміз және өз <b>hash table</b>-ымызды жазамыз.</p>
<h3>Hash function және bucket</h3>
<p>Hash table: <code>m</code> ұяшықтан (bucket) тұратын массив. Кілтті сақтау үшін <b>hash function</b> оны бүтін санға айналдырады, сосын ұяшық индексін табамыз: <code>i = hash(key) % m</code>. Жақсы hash function кілттерді ұяшықтарға біркелкі таратады. Python-да <code>hash("Алматы")</code> жолдар үшін әр іске қосқанда өзгеруі мүмкін, ал бүтін сандар үшін <code>hash(42) == 42</code>.</p>
<h3>Collision: соқтығысу</h3>
<p>Екі түрлі кілт бір ұяшыққа түсуі мүмкін: бұл <b>collision</b>. Оны шешудің екі негізгі тәсілі бар.</p>
<ul>
<li><b>Chaining:</b> әр ұяшықта тізім. Соқтығысқан кілттер сол тізімге қосылады. Іздеу: ұяшықты табамыз да, тізімді аралаймыз.</li>
<li><b>Open addressing (linear probing):</b> бәрі бір массивте. Ұяшық бос емес болса, келесі <code>(i + 1) % m</code> ұяшыққа қараймыз. Python-ның өз <code>dict</code>-і open addressing қолданады (күрделірек probing тізбегімен).</li>
</ul>
<pre><code>m = 8
buckets = [[] for _ in range(m)]
for key, val in [(10, "Нан"), (18, "Сүт"), (3, "Шай")]:
    buckets[hash(key) % m].append((key, val))
# 10 % 8 = 2 және 18 % 8 = 2: collision, екеуі де buckets[2] ішінде
print(buckets[2])   # [(10, 'Нан'), (18, 'Сүт')]</code></pre>
<h3>Load factor және rehashing</h3>
<p><b>Load factor</b> α = n / m, мұндағы n: элементтер саны. α өскен сайын тізбектер ұзарады, операция баяулайды. Сондықтан α белгілі шектен (мысалы, 0.75) асқанда, кесте <b>rehashing</b> жасайды: ұяшық санын екі есе көбейтіп, барлық кілтті жаңа <code>% m</code> бойынша қайта таратады. Бір rehash O(n), бірақ ол сирек болғандықтан, бір <code>put</code>-тің орташа (amortized) құны O(1) болып қалады.</p>
<table>
<tr><th></th><th>Chaining</th><th>Linear probing</th></tr>
<tr><td>Ұяшықта</td><td>жұптар тізімі</td><td>бір жұп немесе бос</td></tr>
<tr><td>α &gt; 1 бола ма</td><td>иә</td><td>жоқ, α &lt; 1 болуы шарт</td></tr>
<tr><td>Өшіру</td><td>тізімнен алып тастау</td><td>«tombstone» белгісі керек</td></tr>
<tr><td>Кэшке ыңғайлы</td><td>аздау</td><td>иә, деректер қатар тұрады</td></tr>
</table>
<h3>Жиі қателер</h3>
<ul>
<li><code>put</code> кезінде бар кілтті тексермей, екінші жұп қосу: кілт екі рет сақталады.</li>
<li>Rehash кезінде ескі индексті сақтау: жаңа <code>m</code> бойынша қайта есептеу міндетті.</li>
<li>Өзгермелі объектіні (list) кілт ету: оның hash-і жоқ.</li>
<li>Ең нашар жағдайды ұмыту: барлық кілт бір ұяшыққа түссе, операция O(n).</li>
</ul>
<div class="tip"><b>Кеңес:</b> сұхбатта «dict неге O(1)?» деп сұраса, үш сөзді айтыңыз: hash function, collision шешу тәсілі және load factor-мен rehashing. «Орташа O(1), ең нашар O(n)» деп нақтылауды ұмытпаңыз.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Chaining қолданатын кестеде 8 ұяшық бар, rehash шегі α &gt; 0.75. Неше элемент қосылғанда (қосылған сәтте) алғашқы rehash болады?', options: ['6-шы', '7-ші', '8-ші', '9-шы'], answer: 1, explain: '6 / 8 = 0.75, бұл шектен аспайды. 7 / 8 = 0.875 &gt; 0.75, сондықтан 7-ші элементте кесте 16 ұяшыққа ұлғаяды.' },
          { type: 'python', level: 'hard', xp: 30, prompt: P`Chaining тәсілімен <code>HashMap</code> класын жазыңыз (Python <code>dict</code>-ін ішінде қолданбаңыз).
<ul>
<li><code>self.buckets</code>: <code>capacity</code> (әдепкі 8) тізімнен тұратын тізім, әр ішкі тізімде <code>(key, value)</code> жұптары; <code>self.size</code>: элементтер саны.</li>
<li><code>put(key, value)</code>: бар кілттің мәнін ауыстырады, жаңасын қосады. Қосқаннан кейін <code>size / len(buckets) &gt; 0.75</code> болса, ұяшық санын екі есе көбейтіп, бәрін қайта таратады.</li>
<li><code>get(key, default=None)</code>, <code>remove(key)</code> (өшірсе <code>True</code>, кілт жоқ болса <code>False</code>), <code>__len__</code>.</li>
</ul>
Ұяшық индексі: <code>hash(key) % len(self.buckets)</code>.`,
            starter: P`class HashMap:
    def __init__(self, capacity=8):
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0

    def put(self, key, value):
        pass

    def get(self, key, default=None):
        return default

    def remove(self, key):
        return False

    def __len__(self):
        return self.size
`,
            solution: P`class HashMap:
    def __init__(self, capacity=8):
        self.buckets = [[] for _ in range(capacity)]
        self.size = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        b = self._bucket(key)
        for i, (k, _) in enumerate(b):
            if k == key:
                b[i] = (key, value)
                return
        b.append((key, value))
        self.size += 1
        if self.size / len(self.buckets) > 0.75:
            self._resize(2 * len(self.buckets))

    def _resize(self, m):
        old = self.buckets
        self.buckets = [[] for _ in range(m)]
        for b in old:
            for k, v in b:
                self.buckets[hash(k) % m].append((k, v))

    def get(self, key, default=None):
        for k, v in self._bucket(key):
            if k == key:
                return v
        return default

    def remove(self, key):
        b = self._bucket(key)
        for i, (k, _) in enumerate(b):
            if k == key:
                b.pop(i)
                self.size -= 1
                return True
        return False

    def __len__(self):
        return self.size
`,
            hints: ['Көмекші әдіс: <code>_bucket(key)</code> ұяшық тізімін қайтарсын. <code>put</code>, <code>get</code>, <code>remove</code> үшеуі де оны қолданады.', 'Rehash: ескі <code>buckets</code>-ты сақтап, жаңа бос тізімдер жасаңыз да, әр жұпты <code>hash(k) % m</code> бойынша қайта салыңыз.'],
            check: { tests: P`
_m = HashMap()
_m.put("Алматы", 2000000); _m.put("Астана", 1400000); _m.put("Алматы", 2200000)
assert _m.get("Алматы") == 2200000, "put бар кілттің мәнін ауыстыруы керек"
assert len(_m) == 2, "Кілт қайталанса, size өспеуі керек"
assert _m.get("Шымкент") is None and _m.get("Шымкент", 0) == 0, "Жоқ кілтке default қайтарылады"
assert _m.remove("Астана") is True and _m.remove("Астана") is False, "remove: бар кілтке True, жоқ кілтке False"
assert len(_m) == 1 and _m.get("Астана") is None, "Өшірілген кілт табылмауы керек"
_c = HashMap()
for _i in range(6):
    _c.put(_i, _i)
assert len(_c.buckets) == 8, "6 элементте α = 0.75, rehash әлі болмайды"
_c.put(6, 6)
assert len(_c.buckets) == 16, "7-ші элементте кесте 16 ұяшыққа ұлғаюы керек"
assert all(_c.get(_i) == _i for _i in range(7)), "Rehash-тен кейін барлық кілт табылуы керек"
assert all(isinstance(b, list) for b in _c.buckets), "buckets: тізімдер тізімі"
import time as _time
_big = HashMap()
_t0 = _time.perf_counter()
for _i in range(20000):
    _big.put(_i * 7, _i)
_ok = all(_big.get(_i * 7) == _i for _i in range(0, 20000, 3))
_dt = _time.perf_counter() - _t0
assert _ok and len(_big) == 20000, "20 000 кілттен кейін мәндер қате"
assert max(len(b) for b in _big.buckets) <= 8, "Тізбектер тым ұзын: load factor асқанда rehash жасаңыз"
assert _dt < 1.0, "20 000 put/get тым баяу"
`, mustInclude: ['hash('] } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Linear probing. <code>table</code>: ұзындығы <code>m</code> тізім, бос ұяшық <code>None</code>. <code>probe_insert(table, key)</code> бүтін <code>key</code>-ді <code>key % m</code> ұяшығынан бастап бірінші бос ұяшыққа салсын (соңына жетсе, басынан жалғасады) және индексті қайтарсын. Кілт кестеде бұрыннан бар болса, оның индексін қайтарып, ештеңені өзгертпесін. Кесте толы болса, <code>-1</code>.
<pre><code>t = [None] * 5
probe_insert(t, 7)   → 2
probe_insert(t, 12)  → 3    # 12 % 5 = 2 бос емес
probe_insert(t, 4)   → 4
probe_insert(t, 9)   → 0    # 4 бос емес, басына оралды</code></pre>`,
            starter: P`def probe_insert(table, key):
    i = key % len(table)
    table[i] = key
    return i
`,
            solution: P`def probe_insert(table, key):
    m = len(table)
    i = key % m
    for _ in range(m):
        if table[i] is None:
            table[i] = key
            return i
        if table[i] == key:
            return i
        i = (i + 1) % m
    return -1
`,
            hints: ['Ең көп дегенде <code>m</code> ұяшықты тексеріңіз: <code>for _ in range(m)</code>.', 'Келесі ұяшық: <code>i = (i + 1) % m</code>.'],
            check: { tests: P`
_t = [None] * 5
assert probe_insert(_t, 7) == 2, "7 % 5 = 2: бос ұяшық"
assert probe_insert(_t, 12) == 3, "12 % 5 = 2 бос емес, келесі 3"
assert probe_insert(_t, 4) == 4, "4 % 5 = 4: бос"
assert probe_insert(_t, 9) == 0, "9 % 5 = 4 бос емес, басына оралып 0"
assert _t == [9, None, 7, 12, 4], "Кесте күйі қате: " + str(_t)
assert probe_insert(_t, 12) == 3 and _t.count(12) == 1, "Бар кілт қайта қосылмауы керек"
assert probe_insert(_t, 1) == 1, "Соңғы бос ұяшық 1"
assert probe_insert(_t, 100) == -1, "Кесте толы: -1"
` } }
        ]
      },
      {
        id: 'alg-4', title: 'Сызықтық сұрыптаулар және heapsort', minutes: 17,
        body: `
<p>DSA1-де insertion, merge және quick sort-ты көрдік. Салыстыруға негізделген кез келген сұрыптау ең нашар жағдайда кемінде <b>O(n log n)</b> салыстыру жасайды. Бірақ мәндер шағын аралықтағы бүтін сан болса, салыстырмай-ақ сызықтық уақытта сұрыптауға болады.</p>
<h3>Counting sort</h3>
<p>Емтихан баллдары 0-ден 100-ге дейін. Әр балл неше рет кездескенін санаймыз, сосын баллдарды ретімен шығарамыз. Уақыт O(n + k), мұндағы k: мәндер аралығының өлшемі. k кішкентай болса (100), бұл <code>sorted</code>-тан да жылдам; k өте үлкен болса (10⁹), жадқа сыймайды.</p>
<pre><code>def counting_sort(a, max_value):
    count = [0] * (max_value + 1)
    for x in a:
        count[x] += 1
    out = []
    for v, c in enumerate(count):
        out.extend([v] * c)
    return out</code></pre>
<h3>Тұрақтылық (stability)</h3>
<p>Сұрыптау <b>тұрақты</b> болса, кілті бірдей элементтер бастапқы ретін сақтайды. Студенттерді баллы бойынша сұрыптағанда, бірдей балл алғандар тізімде қалай тұрса, солай қалуы керек. Counting sort-ты тұрақты ету үшін әр баллға «себет» тізімін жасап, студенттерді кезекпен салып, себеттерді ретімен біріктіреміз. Python-ның <code>sorted</code>-ы да тұрақты, сондықтан бірнеше кілт бойынша кезекпен сұрыптауға болады.</p>
<h3>Heapsort</h3>
<p>DSA1-де <code>heapq</code>-ты дайын күйінде қолдандық. Енді heap-ті өзіміз басқарамыз. Массивтегі <b>max-heap</b>: <code>i</code> түйіннің балалары <code>2i + 1</code> және <code>2i + 2</code>, ата-ананың мәні балаларынан кіші емес. Негізгі амал <code>sift_down(a, i, n)</code>: <code>i</code> орнындағы мәнді үлкен баласымен ауыстыра отырып, төмен түсіреміз (тек <code>[0, n)</code> бөлігі heap деп есептеледі).</p>
<pre><code>def sift_down(a, i, n):
    while True:
        big = i
        l, r = 2 * i + 1, 2 * i + 2
        if l &lt; n and a[l] &gt; a[big]: big = l
        if r &lt; n and a[r] &gt; a[big]: big = r
        if big == i:
            return
        a[i], a[big] = a[big], a[i]
        i = big</code></pre>
<p>Heapsort екі кезеңнен тұрады: (1) <code>n // 2 - 1</code>-ден 0-ге дейін кері ретпен <code>sift_down</code> шақырып, heap құрамыз (O(n)); (2) ең үлкен <code>a[0]</code>-ді соңғы орынға ауыстырып, heap өлшемін бірге кемітеміз де, түбірге <code>sift_down</code> жасаймыз. Нәтиже: O(n log n) уақыт, O(1) қосымша жад, бірақ тұрақты емес.</p>
<table>
<tr><th>Алгоритм</th><th>Орташа</th><th>Ең нашар</th><th>Жад</th><th>Тұрақты</th></tr>
<tr><td>Insertion</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>иә</td></tr>
<tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>иә</td></tr>
<tr><td>Quick</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>жоқ</td></tr>
<tr><td>Heapsort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>жоқ</td></tr>
<tr><td>Counting</td><td>O(n + k)</td><td>O(n + k)</td><td>O(n + k)</td><td>иә (себетпен)</td></tr>
</table>
<h3>Жиі қателер</h3>
<ul>
<li><code>sift_down</code>-да heap шекарасын <code>len(a)</code> деп алу: сұрыпталған соңғы бөлік қайта бұзылады.</li>
<li>Heap құруды 0-ден бастау: төменнен жоғары, кері ретпен жүру керек.</li>
<li>Counting sort-ты теріс сандарға немесе үлкен аралыққа қолдану.</li>
</ul>
<div class="tip"><b>Кеңес:</b> Python-да күнделікті жұмыста <code>sorted</code> жеткілікті (ол Timsort: тұрақты, O(n log n)). Heapsort пен counting sort-ты білу сұхбатта және шектеулер ерекше болғанда керек: жад O(1) болуы шарт немесе мәндер шағын бүтін сандар.</div>`,
        exercises: [
          { type: 'python', level: 'easy', xp: 20, prompt: P`<code>counting_sort(a, max_value)</code>: <code>0..max_value</code> аралығындағы бүтін сандарды өсу ретімен жаңа тізімге сұрыптаңыз. Тест 200 000 баллмен уақытты өлшейді.
<pre><code>counting_sort([3, 0, 2, 3, 1], 3) → [0, 1, 2, 3, 3]
counting_sort([], 5)              → []</code></pre>`,
            starter: P`def counting_sort(a, max_value):
    return a
`,
            solution: P`def counting_sort(a, max_value):
    count = [0] * (max_value + 1)
    for x in a:
        count[x] += 1
    out = []
    for v, c in enumerate(count):
        out.extend([v] * c)
    return out
`,
            hints: ['<code>count = [0] * (max_value + 1)</code>, әр <code>x</code> үшін <code>count[x] += 1</code>.', 'Сосын <code>out.extend([v] * c)</code>.'],
            check: { tests: P`
assert counting_sort([3, 0, 2, 3, 1], 3) == [0, 1, 2, 3, 3], "Күтілгені [0, 1, 2, 3, 3]"
assert counting_sort([], 5) == [], "Бос тізім: []"
assert counting_sort([0, 0], 0) == [0, 0], "max_value = 0"
assert counting_sort([5, 5, 5], 9) == [5, 5, 5], "Барлығы бірдей"
_src = [2, 1]
_res = counting_sort(_src, 2)
assert _src == [2, 1] and _res == [1, 2], "Бастапқы тізім өзгермеуі, жаңа тізім қайтарылуы керек"
import random as _random, time as _time
_R = _random.Random(4)
_a = [_R.randint(0, 100) for _ in range(200000)]
_t0 = _time.perf_counter(); _s = counting_sort(_a, 100); _dt = _time.perf_counter() - _t0
assert _s == sorted(_a), "Үлкен тізім дұрыс сұрыпталмады"
assert _dt < 0.8, "200 000 элемент тым баяу"
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>stable_by_grade(students)</code>: <code>students</code>: <code>(аты, балл)</code> жұптары, балл 0..100. Атауларды балл бойынша өсу ретімен қайтарыңыз; бірдей балл алғандар бастапқы ретін сақтасын. Себеттер (bucket) арқылы тұрақты counting sort жазыңыз.
<pre><code>stable_by_grade([("Дана", 90), ("Әли", 75), ("Ерлан", 90), ("Сая", 60)])
→ ["Сая", "Әли", "Дана", "Ерлан"]</code></pre>`,
            starter: P`def stable_by_grade(students):
    return [name for name, _ in students]
`,
            solution: P`def stable_by_grade(students):
    buckets = [[] for _ in range(101)]
    for name, g in students:
        buckets[g].append(name)
    return [name for b in buckets for name in b]
`,
            hints: ['101 бос тізім жасаңыз: <code>buckets[g].append(name)</code>.', 'Себеттерді ретімен біріктіріңіз: <code>[name for b in buckets for name in b]</code>.'],
            check: { tests: P`
assert stable_by_grade([("Дана", 90), ("Әли", 75), ("Ерлан", 90), ("Сая", 60)]) == ["Сая", "Әли", "Дана", "Ерлан"], "Дана Ерланнан бұрын тұруы керек (тұрақтылық)"
assert stable_by_grade([]) == [], "Бос тізім"
assert stable_by_grade([("Б", 100), ("А", 0)]) == ["А", "Б"], "Шеткі баллдар 0 және 100"
assert stable_by_grade([("x", 50), ("y", 50), ("z", 50)]) == ["x", "y", "z"], "Барлығы бірдей: бастапқы рет"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`Heapsort-ты өзіңіз жазыңыз (<code>heapq</code> және <code>sorted</code> қолданбай).
<ul>
<li><code>sift_down(a, i, n)</code>: <code>[0, n)</code> бөлігін max-heap деп есептеп, <code>i</code> орнындағы мәнді төмен түсіреді.</li>
<li><code>heapsort(a)</code>: тізімді <b>орнында</b> өсу ретімен сұрыптап, сол тізімді қайтарады.</li>
</ul>
<pre><code>a = [1, 9, 8, 3, 7]
sift_down(a, 0, 5)  → a == [9, 7, 8, 3, 1]
heapsort([5, 2, 9, 1]) → [1, 2, 5, 9]</code></pre>`,
            starter: P`def sift_down(a, i, n):
    pass

def heapsort(a):
    return a
`,
            solution: P`def sift_down(a, i, n):
    while True:
        big = i
        l, r = 2 * i + 1, 2 * i + 2
        if l < n and a[l] > a[big]:
            big = l
        if r < n and a[r] > a[big]:
            big = r
        if big == i:
            return
        a[i], a[big] = a[big], a[i]
        i = big

def heapsort(a):
    n = len(a)
    for i in range(n // 2 - 1, -1, -1):
        sift_down(a, i, n)
    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        sift_down(a, 0, end)
    return a
`,
            hints: ['Heap құру: <code>for i in range(n // 2 - 1, -1, -1): sift_down(a, i, n)</code>.', 'Екінші кезең: <code>a[0]</code> мен <code>a[end]</code>-ті ауыстырып, <code>sift_down(a, 0, end)</code>.'],
            check: { tests: P`
_a = [1, 9, 8, 3, 7]
sift_down(_a, 0, 5)
assert _a == [9, 7, 8, 3, 1], "sift_down(a, 0, 5) нәтижесі [9, 7, 8, 3, 1] болуы керек, сізде " + str(_a)
_b = [1, 9, 8]
sift_down(_b, 0, 1)
assert _b == [1, 9, 8], "n = 1 болса, ештеңе өзгермеуі керек"
_c = [5, 2, 9, 1]
assert heapsort(_c) == [1, 2, 5, 9] and _c == [1, 2, 5, 9], "heapsort тізімді орнында сұрыптауы керек"
assert heapsort([]) == [] and heapsort([4]) == [4], "Бос және бір элементті тізім"
assert heapsort([3, 3, 1, 3]) == [1, 3, 3, 3], "Қайталанатын мәндер"
import random as _random, time as _time
_R = _random.Random(8)
_x = [_R.randint(-10**6, 10**6) for _ in range(30000)]
_y = list(_x)
_t0 = _time.perf_counter(); heapsort(_y); _dt = _time.perf_counter() - _t0
assert _y == sorted(_x), "Үлкен тізім дұрыс сұрыпталмады"
assert _dt < 1.0, "30 000 элемент тым баяу: heapsort O(n log n) болуы керек"
`, mustInclude: ['sift_down('] } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Тапсырыстарды алдымен уақыт бойынша сұрыптадыңыз, енді қала бойынша сұрыптағанда бір қаланың ішіндегі уақыт реті сақталуы керек. Екінші сұрыптау үшін қайсысы <b>жарамайды</b>?', options: ['Merge sort', 'Python <code>sorted</code>', 'Heapsort', 'Себеттері бар counting sort'], answer: 2, explain: 'Heapsort тұрақты емес: бірдей кілтті элементтердің реті ауысуы мүмкін. Қалған үшеуі тұрақты.' }
        ]
      },
      {
        id: 'alg-5', title: 'Теңгерімді ағаштар: AVL және айналдыру', minutes: 18,
        body: `
<p>DSA1-де BST-де іздеу, қосу O(h) екенін көрдік, мұндағы h: ағаштың биіктігі. Ағаш «толық» болса, h ≈ log₂ n. Бірақ мәселе бар: кілттер <b>сұрыпталған ретпен</b> келсе (мысалы, чек нөмірлері 1, 2, 3, ...), әр жаңа түйін оң жаққа қосылып, ағаш тізімге айналады. Сонда h = n, ал іздеу O(n).</p>
<h3>Биіктік және balance factor</h3>
<p>Бос ағаштың биіктігі 0, жалғыз түйіннің биіктігі 1 деп келісейік. Түйіннің <b>balance factor</b>-ы: <code>height(left) - height(right)</code>. <b>AVL ағашы</b>: әр түйінде balance factor -1, 0 немесе 1. Мұндай ағаштың биіктігі шамамен 1.44·log₂ n-нан аспайды, сондықтан іздеу, қосу, өшіру әрқашан O(log n).</p>
<pre><code>class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))</code></pre>
<h3>Айналдыру (rotation)</h3>
<p>Жаңа кілт қосқаннан кейін бір түйіннің balance factor-ы 2 немесе -2 болса, оны <b>айналдыру</b> арқылы түзетеміз. Айналдыру BST ретін бұзбайды (inorder өзгермейді), тек O(1) сілтемені ауыстырады.</p>
<pre><code>#        y                x
#       / \              / \
#      x   C    →       A   y
#     / \                  / \
#    A   B                B   C
def rotate_right(y):
    x = y.left
    y.left = x.right    # B енді y-тың сол баласы
    x.right = y
    return x            # жаңа түбір</code></pre>
<p>Төрт жағдай бар:</p>
<ul>
<li><b>LL</b> (сол жақтың сол жағы ауыр): бір <code>rotate_right</code>.</li>
<li><b>RR</b>: бір <code>rotate_left</code>.</li>
<li><b>LR</b>: алдымен сол балаға <code>rotate_left</code>, сосын түйінге <code>rotate_right</code>.</li>
<li><b>RL</b>: керісінше.</li>
</ul>
<p>Мысал: 30, 10, 20 ретімен қосылса, 30-дың сол жағында 10, оның оң жағында 20 тұрады (LR). 10-ды солға айналдырып, сосын 30-ды оңға айналдырсақ, түбір 20, балалары 10 және 30.</p>
<h3>Red-black tree</h3>
<p>Тағы бір танымал теңгерімді ағаш: <b>red-black tree</b>. Әр түйін қызыл немесе қара, ал түстер ережесі ең ұзын жолдың ең қысқадан екі еседен аспауын қамтамасыз етеді. AVL қатаңырақ теңгерілген (іздеу сәл жылдам), red-black азырақ айналдыру жасайды (қосу/өшіру сәл жылдам). Java-ның <code>TreeMap</code>-і, C++-тың <code>std::map</code>-і red-black tree қолданады. Python стандартты кітапханасында теңгерімді ағаш жоқ: сұрыпталған тізім + <code>bisect</code> немесе <code>heapq</code> жиі жеткілікті.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Айналдырудан кейін жаңа түбірді ата-анаға қайтармау: ағаштың бір бөлігі «жоғалады».</li>
<li><code>y.left = x.right</code> жолын ұмыту: B ішкі ағашы жоғалады.</li>
<li><code>is_balanced</code>-та тек түбірді тексеру: теңгерім әр түйінде керек.</li>
</ul>
<div class="tip"><b>Кеңес:</b> <code>is_balanced</code>-ты O(n)-де жазуға болады: көмекші функция ішкі ағаш теңгерімді болса биіктігін, болмаса -1 қайтарсын. Сонда биіктік әр түйінде бір рет қана есептеледі.</div>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>Node</code> класы берілген. Екі функция жазыңыз: <code>height(node)</code> (бос ағаш 0, жалғыз түйін 1) және <code>is_balanced(node)</code>: әр түйінде сол және оң ішкі ағаштардың биіктік айырмасы 1-ден аспаса, <code>True</code>.
<pre><code>height(None)                    → 0
is_balanced(Node(2, Node(1)))   → True
is_balanced(Node(3, Node(2, Node(1)))) → False</code></pre>`,
            starter: P`class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def height(node):
    return 0

def is_balanced(node):
    return True
`,
            solution: P`class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))

def is_balanced(node):
    def check(n):
        if n is None:
            return 0
        hl = check(n.left)
        hr = check(n.right)
        if hl < 0 or hr < 0 or abs(hl - hr) > 1:
            return -1
        return 1 + max(hl, hr)
    return check(node) >= 0
`,
            hints: ['<code>height</code>: <code>1 + max(height(node.left), height(node.right))</code>.', '<code>is_balanced</code> үшін көмекші функция теңгерім бұзылса -1, әйтпесе биіктікті қайтарсын.'],
            check: { tests: P`
assert height(None) == 0 and height(Node(5)) == 1, "Бос ағаш 0, жалғыз түйін 1"
_t = Node(8, Node(3, Node(1), Node(6, Node(4))), Node(10))
assert height(_t) == 4, "8 → 3 → 6 → 4 жолы: биіктік 4"
assert is_balanced(None) is True and is_balanced(Node(1)) is True, "Бос ағаш пен жалғыз түйін теңгерімді"
assert is_balanced(Node(2, Node(1))) is True, "Айырма 1: теңгерімді"
assert is_balanced(Node(3, Node(2, Node(1)))) is False, "Сол жақ биіктігі 2, оң жақ 0: теңгерімсіз"
assert is_balanced(_t) is False, "8-де сол жақ 3, оң жақ 1: теңгерімсіз"
_bad = Node(50, Node(30, Node(20, Node(10))), Node(70, None, Node(80, None, Node(90))))
assert is_balanced(_bad) is False, "Түбірде айырма 0, бірақ 30 және 70 түйіндерінде 2: теңгерімсіз"
_ok = Node(4, Node(2, Node(1), Node(3)), Node(6, Node(5)))
assert is_balanced(_ok) is True, "Бұл ағаш теңгерімді"
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>rotate_right(y)</code> және <code>rotate_left(x)</code> айналдыруларын жазыңыз. Екеуі де жаңа түбірді қайтарады, BST реті сақталады. <code>rotate_left</code>: <code>y = x.right</code>, <code>x.right = y.left</code>, <code>y.left = x</code>.
<pre><code>y = Node(30, Node(20, Node(10), Node(25)), Node(40))
r = rotate_right(y)   # r.key == 20, r.right.key == 30, r.right.left.key == 25</code></pre>`,
            starter: P`class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def rotate_right(y):
    return y

def rotate_left(x):
    return x
`,
            solution: P`class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    return x

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    return y
`,
            hints: ['Үш жол: жаңа түбірді алу, ортаңғы ішкі ағашты (B) ауыстыру, ескі түбірді жаңа түбірдің баласы ету.', 'Соңында жаңа түбірді <code>return</code> етіңіз.'],
            check: { tests: P`
def _inorder(n):
    return _inorder(n.left) + [n.key] + _inorder(n.right) if n else []
_y = Node(30, Node(20, Node(10), Node(25)), Node(40))
_r = rotate_right(_y)
assert _r.key == 20 and _r.left.key == 10 and _r.right.key == 30, "rotate_right: жаңа түбір 20, балалары 10 және 30"
assert _r.right.left.key == 25 and _r.right.right.key == 40, "25 енді 30-дың сол баласы болуы керек"
assert _inorder(_r) == [10, 20, 25, 30, 40], "Айналдырудан кейін inorder реті сақталуы керек"
_x = Node(1, None, Node(2, None, Node(3)))
_l = rotate_left(_x)
assert _l.key == 2 and _l.left.key == 1 and _l.right.key == 3, "RR жағдайы: rotate_left түбірді 2 етеді"
assert _l.left.right is None, "1-дің оң баласы енді бос болуы керек"
_z = Node(30, Node(10, None, Node(20)))
_z.left = rotate_left(_z.left)
_z = rotate_right(_z)
assert (_z.key, _z.left.key, _z.right.key) == (20, 10, 30), "LR жағдайы: rotate_left, сосын rotate_right, түбір 20"
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`Сұрыпталған қайталанбайтын кілттерден <b>ең аласа</b> BST құрыңыз: <code>build_balanced(keys)</code> түбірді қайтарады (бос тізімге <code>None</code>). Ортаңғы элемент түбір болады, сол және оң жартысы рекурсивті құрылады. Тест 10 000 кілтпен биіктіктің 14 екенін тексереді (тізбек болса, 10 000 болар еді).`,
            starter: P`class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def build_balanced(keys):
    root = None
    return root
`,
            solution: P`class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def build_balanced(keys):
    def build(l, r):
        if l >= r:
            return None
        m = (l + r) // 2
        return Node(keys[m], build(l, m), build(m + 1, r))
    return build(0, len(keys))
`,
            hints: ['Жартылай ашық аралықпен жұмыс істеңіз: <code>build(l, r)</code>, <code>l &gt;= r</code> болса <code>None</code>.', 'Ортасы <code>m = (l + r) // 2</code>: <code>Node(keys[m], build(l, m), build(m + 1, r))</code>.'],
            check: { tests: P`
def _h(n):
    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))
def _inorder(n, out):
    if n:
        _inorder(n.left, out); out.append(n.key); _inorder(n.right, out)
    return out
assert build_balanced([]) is None, "Бос тізім: None"
_one = build_balanced([7])
assert _one.key == 7 and _one.left is None and _one.right is None, "Бір кілт: жалғыз түйін"
_t = build_balanced([1, 2, 3, 4, 5, 6, 7])
assert _t.key == 4 and _h(_t) == 3, "7 кілт: түбір 4, биіктік 3"
assert _inorder(_t, []) == [1, 2, 3, 4, 5, 6, 7], "inorder сұрыпталған тізімді беруі керек"
import time as _time
_keys = list(range(0, 20000, 2))
_t0 = _time.perf_counter(); _big = build_balanced(_keys); _dt = _time.perf_counter() - _t0
assert _inorder(_big, []) == _keys, "10 000 кілтте BST реті бұзылды"
assert _h(_big) == 14, "10 000 кілт үшін ең аз биіктік 14, сізде " + str(_h(_big))
assert _dt < 1.0, "Құру тым баяу"
` } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: '1, 2, 3, ..., 1000 кілттерін осы ретпен <b>кәдімгі</b> (теңгерілмейтін) BST-ге қосты. Ағаштың биіктігі қандай болады?', options: ['10', '11', '500', '1000'], answer: 3, explain: 'Әр жаңа кілт алдыңғысынан үлкен, сондықтан оң жаққа қосылады: ағаш 1000 түйінді тізбекке айналады. AVL ағашында биіктік 10-11 шамасында болар еді.' }
        ]
      },
      {
        id: 'alg-6', title: 'Union-Find және байланысқан компоненттер', minutes: 16,
        body: `
<p>DSA1-де компоненттерді BFS/DFS арқылы санадық: граф толық белгілі болса, бұл жақсы. Ал байланыстар <b>бірінен соң бірі келсе</b> ше? Мысалы, Қарағанды облысында жаңа жолдар салынып жатыр, әр жаңа жолдан кейін «Теміртау мен Балқаш байланысты ма?» деп сұраймыз. Әр жолы BFS жасау қымбат. Бұған <b>Disjoint Set Union</b> (DSU, union-find) құрылымы арналған.</p>
<h3>Идея</h3>
<p>Әр жиынның бір «өкілі» (түбірі) бар. <code>parent[x]</code>: x-тің ата-анасы, түбірдің ата-анасы өзі. Екі амал:</p>
<ul>
<li><code>find(x)</code>: x-тің түбірін табу.</li>
<li><code>union(a, b)</code>: екі жиынды біріктіру, яғни бір түбірді екіншісіне ілу.</li>
</ul>
<p>Екі элемент бір компонентте болуы үшін <code>find(a) == find(b)</code> жеткілікті.</p>
<h3>Екі оңтайландыру</h3>
<ul>
<li><b>Path compression:</b> <code>find</code> кезінде жолдағы барлық түйінді тікелей түбірге іледі. Келесі жолы олар бір қадамда табылады.</li>
<li><b>Union by rank:</b> аласа ағашты биік ағашқа іледі, керісінше емес. <code>rank</code>: ағаш биіктігінің жоғарғы бағасы.</li>
</ul>
<p>Екеуі бірге болса, бір амалдың орташа құны O(α(n)), мұндағы α: кері Аккерман функциясы, іс жүзінде 5-тен аспайды. Яғни дерлік O(1).</p>
<pre><code>class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n                  # компоненттер саны

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:   # path compression
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False                # бұрыннан бір жиында
        if self.rank[ra] &lt; self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        self.count -= 1
        return True</code></pre>
<p><code>find</code> итеративті жазылған: рекурсивті нұсқа ұзын тізбекте Python-ның рекурсия шегіне соғылуы мүмкін.</p>
<h3>Цикл табу</h3>
<p>Бағытсыз графтың қырларын бірінен соң бірі қосамыз. <code>union(u, v)</code> <code>False</code> қайтарса, u мен v бұрыннан байланысқан, демек жаңа қыр <b>цикл</b> жасайды. Бұл келесі сабақтағы Kruskal алгоритмінің негізі.</p>
<h3>Жиі қателер</h3>
<ul>
<li><code>parent[a] = b</code> деп түбірлерді емес, элементтердің өзін біріктіру: жиындар дұрыс біріктірілмейді.</li>
<li>Бір жиындағы екі элементті біріктіргенде <code>count</code>-ты азайту.</li>
<li>Атаулармен (жол түріндегі кілттер) жұмыс істегенде алдымен оларды индекске айналдыруды ұмыту: <code>idx = {name: i for i, name in enumerate(names)}</code>.</li>
</ul>
<div class="tip"><b>Кеңес:</b> «топтарды біріктіру», «бір желіде ме», «қосылғанда цикл пайда бола ма» деген сұрақтар DSU-ды білдіреді. Ал «ең қысқа жол» немесе «қай ретпен» керек болса, BFS/DFS қажет: DSU жолды білмейді.</div>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>DSU</code> класын жазыңыз: <code>parent</code>, <code>rank</code>, <code>count</code> өрістері; <code>find(x)</code> path compression-мен (итеративті); <code>union(a, b)</code> union by rank-пен, біріктірсе <code>True</code>, бұрыннан бір жиында болса <code>False</code> қайтарады және <code>count</code>-ты тек біріктіргенде азайтады. Тест 100 000 элементпен жылдамдықты тексереді.`,
            starter: P`class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x):
        return x

    def union(self, a, b):
        return True
`,
            solution: P`class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        self.count -= 1
        return True
`,
            hints: ['<code>find</code>: алдымен түбірді табыңыз, сосын екінші циклмен жолдағы әр түйіннің <code>parent</code>-ін түбірге қойыңыз.', '<code>union</code>: rank-ы кіші түбірді үлкеніне іліңіз; тең болса, жаңа түбірдің rank-ын 1-ге арттырыңыз.'],
            check: { tests: P`
_d = DSU(5)
assert _d.union(0, 1) is True and _d.union(1, 2) is True, "Жаңа біріктіру True қайтарады"
assert _d.union(0, 2) is False, "0 мен 2 бұрыннан бір жиында: False"
assert _d.count == 3, "{0,1,2}, {3}, {4}: 3 компонент"
assert _d.find(2) == _d.find(0) and _d.find(3) != _d.find(0), "find түбірлері қате"
_c = DSU(5)
_c.parent = [0, 0, 1, 2, 3]
assert _c.find(4) == 0, "Тізбек 4 → 3 → 2 → 1 → 0: түбір 0"
assert _c.parent[4] == 0 and _c.parent[3] == 0 and _c.parent[2] == 0, "Path compression: жолдағы түйіндер тікелей түбірге ілінуі керек"
_e = DSU(4)
_e.union(0, 1); _e.union(2, 3)
_e.union(0, 2)
assert max(_e.rank) == 2, "Union by rank: тең rank-тағы түбірлер біріккенде rank 1-ге өседі"
import random as _random, time as _time
_R = _random.Random(6)
_n = 100000
_big = DSU(_n)
_t0 = _time.perf_counter()
for _i in range(1, _n):
    _big.union(_i - 1, _i)
for _ in range(100000):
    _big.find(_R.randrange(_n))
_dt = _time.perf_counter() - _t0
assert _big.count == 1, "Тізбек бойынша біріктірілгеннен кейін 1 компонент"
assert _dt < 1.5, "100 000 union және find тым баяу: path compression мен union by rank қосыңыз"
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`Мектептегі студенттер достасады. <code>count_groups(names, friendships)</code>: <code>names</code>: аттар тізімі, <code>friendships</code>: <code>(аты1, аты2)</code> жұптары. Достық транзитивті: досымның досы бір топта. Топтар санын DSU арқылы қайтарыңыз.
<pre><code>count_groups(["Әли", "Дана", "Ерлан", "Сая"], [("Әли", "Дана"), ("Ерлан", "Дана")]) → 2
count_groups([], [])                                                       → 0</code></pre>`,
            starter: P`def count_groups(names, friendships):
    return len(names)
`,
            solution: P`def count_groups(names, friendships):
    idx = {name: i for i, name in enumerate(names)}
    parent = list(range(len(names)))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    groups = len(names)
    for a, b in friendships:
        ra, rb = find(idx[a]), find(idx[b])
        if ra != rb:
            parent[ra] = rb
            groups -= 1
    return groups
`,
            hints: ['Аттарды индекске айналдырыңыз: <code>idx = {name: i for i, name in enumerate(names)}</code>.', 'Әр сәтті біріктіруде топ саны 1-ге азаяды.'],
            check: { tests: P`
assert count_groups(["Әли", "Дана", "Ерлан", "Сая"], [("Әли", "Дана"), ("Ерлан", "Дана")]) == 2, "{Әли, Дана, Ерлан} және {Сая}: 2 топ"
assert count_groups([], []) == 0, "Студент жоқ: 0"
assert count_groups(["А", "Б", "В"], []) == 3, "Достық жоқ: әркім жеке топ"
assert count_groups(["А", "Б"], [("А", "Б"), ("Б", "А"), ("А", "Б")]) == 1, "Қайталанған достық топ санын азайтпауы керек"
assert count_groups(["А"], [("А", "А")]) == 1, "Өзімен достық: 1 топ"
import random as _random, time as _time
_R = _random.Random(1)
_names = ["s" + str(i) for i in range(20000)]
_pairs = [(_names[i], _names[i + 1]) for i in range(0, 19999, 2)]
_t0 = _time.perf_counter(); _g = count_groups(_names, _pairs); _dt = _time.perf_counter() - _t0
assert _g == 10000, "20 000 студент, жұп-жұппен: 10 000 топ"
assert _dt < 1.0, "Тым баяу: DSU қолданыңыз"
` } },
          { type: 'python', level: 'hard', xp: 25, prompt: P`Жол желісіне қырлар кезекпен қосылады. <code>first_cycle_edge(n, edges)</code>: <code>n</code> қала (<code>0..n-1</code>), <code>edges</code>: <code>(u, v)</code> бағытсыз жолдар. Цикл жасайтын <b>бірінші</b> жолды қайтарыңыз (кортеж түрінде, берілгендей), цикл болмаса <code>None</code>.
<pre><code>first_cycle_edge(4, [(0, 1), (1, 2), (2, 0), (2, 3)]) → (2, 0)
first_cycle_edge(3, [(0, 1), (1, 2)])                 → None</code></pre>`,
            starter: P`def first_cycle_edge(n, edges):
    return None
`,
            solution: P`def first_cycle_edge(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            return (u, v)
        parent[ru] = rv
    return None
`,
            hints: ['Әр жолда <code>find(u) == find(v)</code> болса, бұл жол цикл жасайды.', 'Әйтпесе түбірлерді біріктіріңіз: <code>parent[ru] = rv</code>.'],
            check: { tests: P`
assert first_cycle_edge(4, [(0, 1), (1, 2), (2, 0), (2, 3)]) == (2, 0), "Үшінші жол 0-1-2 циклін жабады"
assert first_cycle_edge(3, [(0, 1), (1, 2)]) is None, "Ағашта цикл жоқ"
assert first_cycle_edge(2, [(0, 1), (1, 0)]) == (1, 0), "Екі қала арасындағы екінші жол да цикл"
assert first_cycle_edge(1, [(0, 0)]) == (0, 0), "Өзіне апаратын жол: цикл"
assert first_cycle_edge(5, []) is None, "Жол жоқ: None"
import time as _time
_n = 100000
_edges = [(_i, _i + 1) for _i in range(_n - 1)] + [(_n - 1, 0)]
_t0 = _time.perf_counter(); _r = first_cycle_edge(_n, _edges); _dt = _time.perf_counter() - _t0
assert _r == (_n - 1, 0), "Ұзын тізбектің соңғы жолы циклді жабады"
assert _dt < 1.0, "100 000 жол тым баяу: path compression қолданыңыз"
` } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'DSU-да <b>тек</b> union by rank қолданылса (path compression жоқ), <code>find</code>-тың ең нашар уақыты қандай?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], answer: 1, explain: 'Union by rank ағаш биіктігін O(log n) шамасында ұстайды: rank-ы k ағашта кемінде 2ᵏ түйін болады. Path compression қосылса, орташа құн O(α(n)) болады.' }
        ]
      },
      {
        id: 'alg-7', title: 'Dijkstra: салмақты графтағы ең қысқа жол', minutes: 18,
        body: `
<p>DSA1-де BFS барлық қыр бірдей болғанда ең қысқа жолды табады, ал Dijkstra-ның негізгі кодын бір есепте көрдік. Енді алгоритмді толық түсінеміз: неге дұрыс жұмыс істейді, жолды қалай қалпына келтіреміз және қашан <b>жарамайды</b>.</p>
<h3>Салмақты граф</h3>
<p>Қалалар арасындағы автобус жолдары: <code>graph["Алматы"] = [("Қонаев", 70), ("Талдықорған", 270)]</code>. Әр қырдың салмағы (км, минут, теңге) теріс емес. Мақсат: бастапқы қаладан басқа қалалардың әрқайсысына дейінгі ең аз қашықтық.</p>
<h3>Алгоритм</h3>
<p>Heap-те <code>(қашықтық, төбе)</code> жұптары. Әр қадамда heap-тен ең жақын төбені аламыз. Барлық салмақ теріс емес болғандықтан, оған бұдан қысқа жол табылмайды: оның қашықтығы «бекітілді». Сосын оның көршілерін <b>relax</b> етеміз: жаңа жол қысқа болса, жаңартып, heap-ке саламыз. Бір төбе heap-те бірнеше рет болуы мүмкін; ескірген жазбаны (<code>d &gt; dist[u]</code>) өткізіп жібереміз.</p>
<pre><code>import heapq

def dijkstra(graph, src):
    dist = {src: 0}
    prev = {}
    h = [(0, src)]
    while h:
        d, u = heapq.heappop(h)
        if d &gt; dist[u]:
            continue
        for v, w in graph.get(u, []):
            nd = d + w
            if v not in dist or nd &lt; dist[v]:
                dist[v] = nd
                prev[v] = u            # v-ға u арқылы келдік
                heapq.heappush(h, (nd, v))
    return dist, prev</code></pre>
<p>Күрделілігі O((V + E) log V). Тек <code>dict</code> қолданғандықтан, төбелер кез келген hashable мән бола алады: қала атауы, тордағы <code>(r, c)</code> кортежі.</p>
<h3>Жолды қалпына келтіру</h3>
<p><code>prev[v]</code> әр төбеге қайдан келгенімізді сақтайды. Мақсаттан бастап <code>prev</code> бойынша артқа жүріп, тізімді аударамыз:</p>
<pre><code>path = [dst]
while path[-1] != src:
    path.append(prev[path[-1]])
path.reverse()     # ['Алматы', 'Қонаев', ...]</code></pre>
<h3>Теріс салмақ неге бұзады</h3>
<p>Dijkstra «heap-тен алынған төбенің қашықтығы енді өзгермейді» деп сенеді. Теріс қыр болса, бұл дұрыс емес: A → C = 2 бекітілгеннен кейін A → B → C = 5 + (−4) = 1 табылуы мүмкін. Мұндай графқа <b>Bellman-Ford</b> алгоритмі керек: барлық қырды V − 1 рет relax етеді, O(V·E). Тағы бір рет relax мүмкін болса, графта <b>теріс цикл</b> бар: ол арқылы қашықтықты шексіз азайтуға болады.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Heap-ке <code>(төбе, қашықтық)</code> ретімен салу: heap төбе атауы бойынша сұрыптайды.</li>
<li>Ескірген жазбаларды өткізбеу: дұрыс, бірақ баяу.</li>
<li>Тек кілт ретінде бар төбелерді ескеру: кейбір төбе тек көрші ретінде кездеседі, <code>graph.get(u, [])</code> қолданыңыз.</li>
<li>Жеткізу мүмкін емес төбені тексермеу: <code>prev</code>-те жоқ болса, жол жоқ.</li>
</ul>
<div class="tip"><b>Кеңес:</b> тек бір мақсатқа жол керек болса, heap-тен сол мақсат алынғанда бірден тоқтауға болады. Ірі карталарда бұл жұмысты бірнеше есе қысқартады.</div>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>dijkstra(graph, src)</code>: <code>graph</code>: сөздік, төбе → <code>[(көрші, салмақ), ...]</code>. Жетуге болатын барлық төбеге дейінгі ең қысқа қашықтықты сөздік ретінде қайтарыңыз. Кейбір төбелер тек көрші ретінде кездеседі. Тест 100×100 торда жылдамдықты тексереді.
<pre><code>g = {"Алматы": [("Қонаев", 70), ("Талдықорған", 270)],
     "Қонаев": [("Талдықорған", 180)]}
dijkstra(g, "Алматы") → {"Алматы": 0, "Қонаев": 70, "Талдықорған": 250}</code></pre>`,
            starter: P`import heapq

def dijkstra(graph, src):
    return {src: 0}
`,
            solution: P`import heapq

def dijkstra(graph, src):
    dist = {src: 0}
    h = [(0, src)]
    while h:
        d, u = heapq.heappop(h)
        if d > dist[u]:
            continue
        for v, w in graph.get(u, []):
            nd = d + w
            if v not in dist or nd < dist[v]:
                dist[v] = nd
                heapq.heappush(h, (nd, v))
    return dist
`,
            hints: ['Heap-те <code>(қашықтық, төбе)</code>; <code>d &gt; dist[u]</code> болса, <code>continue</code>.', 'Көршілер: <code>graph.get(u, [])</code>.'],
            check: { tests: P`
_g = {"Алматы": [("Қонаев", 70), ("Талдықорған", 270)], "Қонаев": [("Талдықорған", 180)]}
assert dijkstra(_g, "Алматы") == {"Алматы": 0, "Қонаев": 70, "Талдықорған": 250}, "Қонаев арқылы 250 км қысқа"
assert dijkstra(_g, "Талдықорған") == {"Талдықорған": 0}, "Шығатын жол жоқ: тек өзі"
assert dijkstra({}, "X") == {"X": 0}, "Бос граф: {src: 0}"
_g2 = {"a": [("b", 1), ("c", 4)], "b": [("c", 1), ("d", 5)], "c": [("d", 1)], "e": [("a", 1)]}
assert dijkstra(_g2, "a") == {"a": 0, "b": 1, "c": 2, "d": 3}, "a → b → c → d = 3; e жетуге болмайды"
assert dijkstra({"a": [("b", 0)]}, "a") == {"a": 0, "b": 0}, "Нөлдік салмақ"
import random as _random, time as _time
_R = _random.Random(10)
_N = 100
_G = {}
for _r in range(_N):
    for _c in range(_N):
        _G[(_r, _c)] = [((_r + dr, _c + dc), _R.randint(1, 9)) for dr, dc in ((1, 0), (0, 1), (-1, 0), (0, -1)) if 0 <= _r + dr < _N and 0 <= _c + dc < _N]
_t0 = _time.perf_counter(); _D = dijkstra(_G, (0, 0)); _dt = _time.perf_counter() - _t0
assert len(_D) == _N * _N, "Тордың барлық ұяшығына жетуге болады"
assert all(_D[v] <= _D[u] + w for u in _G for v, w in _G[u]), "Қашықтықтар ең қысқа емес: бір қыр арқылы азайтуға болады"
assert _dt < 1.5, "10 000 төбе тым баяу: heapq қолданыңыз"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<code>shortest_route(graph, src, dst)</code>: <code>(қашықтық, жол)</code> қайтарыңыз, мұндағы жол: <code>src</code>-тан <code>dst</code>-ға дейінгі төбелер тізімі. Жету мүмкін болмаса, <code>(None, [])</code>. <code>src == dst</code> болса, <code>(0, [src])</code>. <code>prev</code> сөздігін сақтаңыз.
<pre><code>g = {"Астана": [("Қарағанды", 220), ("Көкшетау", 300)],
     "Қарағанды": [("Балқаш", 380)], "Көкшетау": [("Балқаш", 700)]}
shortest_route(g, "Астана", "Балқаш") → (600, ["Астана", "Қарағанды", "Балқаш"])</code></pre>`,
            starter: P`import heapq

def shortest_route(graph, src, dst):
    return (None, [])
`,
            solution: P`import heapq

def shortest_route(graph, src, dst):
    dist = {src: 0}
    prev = {}
    h = [(0, src)]
    while h:
        d, u = heapq.heappop(h)
        if d > dist[u]:
            continue
        if u == dst:
            break
        for v, w in graph.get(u, []):
            nd = d + w
            if v not in dist or nd < dist[v]:
                dist[v] = nd
                prev[v] = u
                heapq.heappush(h, (nd, v))
    if dst not in dist:
        return (None, [])
    path = [dst]
    while path[-1] != src:
        path.append(prev[path[-1]])
    path.reverse()
    return (dist[dst], path)
`,
            hints: ['Relax кезінде <code>prev[v] = u</code> жазыңыз.', 'Жол: <code>dst</code>-тан бастап <code>prev</code> бойынша <code>src</code>-қа дейін жүріп, тізімді <code>reverse()</code> етіңіз.'],
            check: { tests: P`
_g = {"Астана": [("Қарағанды", 220), ("Көкшетау", 300)], "Қарағанды": [("Балқаш", 380)], "Көкшетау": [("Балқаш", 700)]}
assert shortest_route(_g, "Астана", "Балқаш") == (600, ["Астана", "Қарағанды", "Балқаш"]), "Қарағанды арқылы 600 км"
assert shortest_route(_g, "Астана", "Астана") == (0, ["Астана"]), "src == dst: (0, [src])"
assert shortest_route(_g, "Балқаш", "Астана") == (None, []), "Кері бағытта жол жоқ: (None, [])"
assert shortest_route(_g, "Астана", "Атырау") == (None, []), "Графта жоқ қала: (None, [])"
_g2 = {1: [(2, 7), (3, 9), (6, 14)], 2: [(3, 10), (4, 15)], 3: [(4, 11), (6, 2)], 4: [(5, 6)], 6: [(5, 9)]}
assert shortest_route(_g2, 1, 5) == (20, [1, 3, 6, 5]), "1 → 3 → 6 → 5 = 20"
assert shortest_route(_g2, 1, 4) == (20, [1, 3, 4]), "1 → 3 → 4 = 20"
import time as _time
_line = {_i: [(_i + 1, 1), (_i + 2, 3)] for _i in range(20000)}
_t0 = _time.perf_counter(); _d, _p = shortest_route(_line, 0, 20000); _dt = _time.perf_counter() - _t0
assert _d == 20000 and len(_p) == 20001, "Ұзын тізбекте жол қате"
assert _dt < 1.0, "Тым баяу"
` } },
          { type: 'quiz', level: 'medium', xp: 15, prompt: 'Қырлар: A→B = 5, A→C = 2, B→C = −4. Dijkstra A-дан бастағанда C-ның қашықтығын қандай деп бекітеді және шын ең қысқа қашықтық қандай?', options: ['Бекітеді 2, шын мәні 2', 'Бекітеді 2, шын мәні 1', 'Бекітеді 1, шын мәні 1', 'Бекітеді 5, шын мәні 1'], answer: 1, explain: 'Heap-тен алдымен C (2) алынып, бекітіледі. Кейін B (5) арқылы 5 + (−4) = 1 жол бар, бірақ C бұрыннан бекітілген. Теріс салмақты графқа Bellman-Ford керек.' },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<code>bellman_ford(n, edges, src)</code>: <code>n</code> төбе, <code>edges</code>: <code>(u, v, w)</code> бағытталған қырлар, салмақ теріс те болады. Ең қысқа қашықтықтар тізімін қайтарыңыз (жетуге болмайтын төбе <code>float("inf")</code>). <code>src</code>-тан жетуге болатын теріс цикл болса, <code>None</code>. Барлық қырды <code>n - 1</code> рет relax етіп, сосын тағы бір рет тексеріңіз.
<pre><code>bellman_ford(3, [(0, 1, 5), (0, 2, 2), (1, 2, -4)], 0) → [0, 5, 1]
bellman_ford(2, [(0, 1, 1), (1, 0, -2)], 0)            → None</code></pre>`,
            starter: P`def bellman_ford(n, edges, src):
    return [0] * n
`,
            solution: P`def bellman_ford(n, edges, src):
    INF = float("inf")
    dist = [INF] * n
    dist[src] = 0
    for _ in range(n - 1):
        changed = False
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:
            break
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return None
    return dist
`,
            hints: ['<code>dist[src] = 0</code>, қалғаны <code>float("inf")</code>. <code>inf + w</code> әлі де <code>inf</code>, сондықтан жетпеген төбелер relax болмайды.', 'Соңғы тексеруде кез келген қыр қашықтықты азайтса, <code>None</code>.'],
            check: { tests: P`
_inf = float("inf")
assert bellman_ford(3, [(0, 1, 5), (0, 2, 2), (1, 2, -4)], 0) == [0, 5, 1], "Теріс қыр арқылы C-ға 1"
assert bellman_ford(2, [(0, 1, 1), (1, 0, -2)], 0) is None, "0 → 1 → 0 циклінің қосындысы -1: теріс цикл"
assert bellman_ford(3, [(0, 1, 4)], 0) == [0, 4, _inf], "Жетуге болмайтын төбе: inf"
assert bellman_ford(1, [], 0) == [0], "Бір төбе"
assert bellman_ford(4, [(0, 1, 1), (2, 3, -1), (3, 2, -1)], 0) == [0, 1, _inf, _inf], "src-тан жетуге болмайтын теріс цикл нәтижеге әсер етпейді"
assert bellman_ford(4, [(2, 3, 1), (1, 2, 1), (0, 1, 1)], 0) == [0, 1, 2, 3], "Қырлар реті кері болса да дұрыс"
import time as _time
_n = 300
_E = [(_i, _i + 1, 2) for _i in range(_n - 1)] + [(0, _i, 1000) for _i in range(1, _n)]
_t0 = _time.perf_counter(); _r = bellman_ford(_n, _E, 0); _dt = _time.perf_counter() - _t0
assert _r[-1] == 2 * (_n - 1), "Ұзын тізбекте қашықтық қате"
assert _dt < 1.0, "Тым баяу: n - 1 айналымнан артық жүрмеңіз"
` } }
        ]
      },
      {
        id: 'alg-8', title: 'Minimum spanning tree: Kruskal және Prim', minutes: 16,
        body: `
<p>Облыс әкімдігі бес ауылды асфальт жолмен қосқысы келеді. Кез келген екі ауыл арасында жол салудың бағасы белгілі. Барлық ауыл бір желіде болуы керек (тікелей не басқа ауыл арқылы), ал жалпы баға ең аз болуы керек. Бұл: <b>minimum spanning tree</b> (MST, ең аз қамтушы ағаш) есебі.</p>
<h3>Анықтама</h3>
<p>n төбелі байланысқан бағытсыз графтың <b>spanning tree</b>-і: барлық төбені қамтитын, циклсіз, n − 1 қырдан тұратын ішкі граф. MST: қыр салмақтарының қосындысы ең аз spanning tree. Ең қысқа жолмен шатастырмаңыз: MST екі нақты қала арасындағы ең қысқа жолды бермейді, ол бүкіл желінің жалпы құнын азайтады.</p>
<h3>Kruskal</h3>
<p>Идея өте қарапайым: қырларды салмағы бойынша сұрыптаймыз да, ең арзанынан бастап аламыз. Қыр цикл жасаса (екі шеті бұрыннан байланысқан), өткізіп жібереміз. Цикл тексеру: алдыңғы сабақтағы DSU.</p>
<pre><code>def kruskal(n, roads):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    total, used = 0, 0
    for u, v, cost in sorted(roads, key=lambda e: e[2]):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            total += cost
            used += 1
    return total if used == n - 1 else None   # None: граф байланыспаған

roads = [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]
print(kruskal(5, roads))   # 1 + 2 + 3 + 5 = 11</code></pre>
<p>Күрделілігі: сұрыптау O(E log E), DSU амалдары дерлік O(E).</p>
<h3>Prim</h3>
<p>Prim бір төбеден бастап ағашты «өсіреді». Heap-те ағаштан шығатын қырлар тұрады. Әр қадамда ең арзан қырды аламыз; оның екінші шеті ағашта жоқ болса, оны қосып, оның қырларын heap-ке саламыз. Бұл Dijkstra-ға ұқсас, бірақ heap-ке <code>d + w</code> емес, тек <code>w</code> салынады. Тығыз графта (қыр көп) Prim, сирек графта Kruskal ыңғайлы.</p>
<h3>Неге greedy дұрыс жұмыс істейді</h3>
<p><b>Cut property:</b> төбелерді кез келген екі топқа бөлсек, топтарды қосатын ең арзан қыр қандай да бір MST-ге міндетті түрде кіреді. Kruskal да, Prim да әр қадамда дәл осындай қырды таңдайды. Бұл келесі сабақтағы greedy алгоритмдердің дәлелдеу тәсіліне жақсы мысал.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Граф байланыспаған жағдайды тексермеу: n − 1 қыр жиналмаса, MST жоқ.</li>
<li>Prim-де heap-тен алынған төбе ағашта бар-жоғын тексермеу: оның құны екі рет қосылады.</li>
<li>MST-ні ең қысқа жол деп ойлау.</li>
</ul>
<div class="tip"><b>Кеңес:</b> егер кейбір жолдар <b>бұрыннан</b> салынған болса, оларды алдымен DSU-ға біріктіріп (құны 0), сосын Kruskal-ды қалған жолдармен жалғастырыңыз. Бұл нақты инфрақұрылым есептерінде жиі кездеседі.</div>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>mst_cost(n, roads)</code>: <code>n</code> ауыл (<code>0..n-1</code>), <code>roads</code>: <code>(u, v, баға)</code>. Kruskal + DSU арқылы барлық ауылды қосудың ең аз бағасын қайтарыңыз. Барлығын қосу мүмкін болмаса, <code>None</code>. <code>n = 1</code> болса, 0.
<pre><code>mst_cost(5, [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]) → 11
mst_cost(3, [(0, 1, 2)])                                                     → None</code></pre>`,
            starter: P`def mst_cost(n, roads):
    return sum(c for _, _, c in roads)
`,
            solution: P`def mst_cost(n, roads):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    total, used = 0, 0
    for u, v, cost in sorted(roads, key=lambda e: e[2]):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            total += cost
            used += 1
    return total if used == n - 1 else None
`,
            hints: ['Қырларды <code>sorted(roads, key=lambda e: e[2])</code> арқылы сұрыптаңыз.', 'Қосылған қыр санын санаңыз: соңында <code>n - 1</code> болмаса, <code>None</code>.'],
            check: { tests: P`
assert mst_cost(5, [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]) == 11, "MST: 1 + 2 + 3 + 5 = 11"
assert mst_cost(3, [(0, 1, 2)]) is None, "2-ауыл қосылмаған: None"
assert mst_cost(1, []) == 0, "Бір ауыл: 0"
assert mst_cost(2, [(0, 1, 7), (0, 1, 3)]) == 3, "Параллель жолдардың арзанын алу керек"
assert mst_cost(3, [(0, 1, 1), (1, 2, 1), (0, 2, 1)]) == 2, "Бірдей бағалар: 2 жол жеткілікті"
assert mst_cost(4, [(0, 1, 5), (2, 3, 0), (1, 2, -1)]) == 4, "Нөлдік және теріс бағалар да жұмыс істеуі керек"
import random as _random, time as _time
_R = _random.Random(13)
_n = 3000
_E = [(_i, _i + 1, 1000) for _i in range(_n - 1)] + [(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 999)) for _ in range(30000)]
_t0 = _time.perf_counter(); _c = mst_cost(_n, _E); _dt = _time.perf_counter() - _t0
assert _c is not None and _c < 1000 * (_n - 1), "Үлкен графта MST қате"
assert _dt < 1.0, "30 000 қыр тым баяу: DSU-да path compression қолданыңыз"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`Prim алгоритмі. <code>prim_cost(adj)</code>: <code>adj</code>: бағытсыз граф, қала → <code>[(көрші, баға), ...]</code> (әр жол екі жақта да жазылған). Кез келген қаладан бастап, <code>heapq</code> арқылы MST бағасын қайтарыңыз. Граф байланыспаса, <code>None</code>; бос граф үшін 0.
<pre><code>adj = {"Ақтау": [("Жаңаөзен", 150), ("Форт", 200)],
       "Жаңаөзен": [("Ақтау", 150), ("Форт", 400)],
       "Форт": [("Ақтау", 200), ("Жаңаөзен", 400)]}
prim_cost(adj) → 350</code></pre>`,
            starter: P`import heapq

def prim_cost(adj):
    return 0
`,
            solution: P`import heapq

def prim_cost(adj):
    if not adj:
        return 0
    start = next(iter(adj))
    seen = {start}
    h = [(w, v) for v, w in adj[start]]
    heapq.heapify(h)
    total = 0
    while h and len(seen) < len(adj):
        w, v = heapq.heappop(h)
        if v in seen:
            continue
        seen.add(v)
        total += w
        for x, wx in adj.get(v, []):
            if x not in seen:
                heapq.heappush(h, (wx, x))
    return total if len(seen) == len(adj) else None
`,
            hints: ['Heap-ке <code>(баға, қала)</code> салыңыз. Алынған қала <code>seen</code>-де болса, өткізіп жіберіңіз.', 'Соңында <code>len(seen) == len(adj)</code> болмаса, граф байланыспаған.'],
            check: { tests: P`
_adj = {"Ақтау": [("Жаңаөзен", 150), ("Форт", 200)], "Жаңаөзен": [("Ақтау", 150), ("Форт", 400)], "Форт": [("Ақтау", 200), ("Жаңаөзен", 400)]}
assert prim_cost(_adj) == 350, "150 + 200 = 350"
assert prim_cost({}) == 0, "Бос граф: 0"
assert prim_cost({"А": []}) == 0, "Бір қала: 0"
assert prim_cost({"А": [("Б", 1)], "Б": [("А", 1)], "В": []}) is None, "В қосылмаған: None"
_sq = {0: [(1, 1), (3, 4), (2, 3)], 1: [(0, 1), (2, 2)], 2: [(1, 2), (3, 5), (0, 3)], 3: [(0, 4), (2, 5)]}
assert prim_cost(_sq) == 7, "1 + 2 + 4 = 7"
import random as _random, time as _time
_R = _random.Random(21)
_n = 2000
_A = {_i: [] for _i in range(_n)}
def _add(u, v, w):
    _A[u].append((v, w)); _A[v].append((u, w))
for _i in range(_n - 1):
    _add(_i, _i + 1, 500)
for _ in range(15000):
    _add(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 499))
_t0 = _time.perf_counter(); _c = prim_cost(_A); _dt = _time.perf_counter() - _t0
_edges = sorted(set((min(u, v), max(u, v), w) for u in _A for v, w in _A[u]), key=lambda e: e[2])
_p = list(range(_n))
def _f(x):
    while _p[x] != x:
        _p[x] = _p[_p[x]]; x = _p[x]
    return x
_ref = 0
for u, v, w in _edges:
    if _f(u) != _f(v):
        _p[_f(u)] = _f(v); _ref += w
assert _c == _ref, "Prim нәтижесі Kruskal нәтижесімен сәйкес келмеді"
assert _dt < 1.0, "Тым баяу: heapq қолданыңыз"
` } },
          { type: 'quiz', level: 'medium', xp: 15, prompt: '6 қаланың байланысқан жол графында 10 жол бар, барлық баға әртүрлі. Төмендегі тұжырымдардың қайсысы <b>әрқашан</b> дұрыс?', options: ['MST-де 6 жол болады', 'Ең арзан жол MST-ге міндетті түрде кіреді', 'Ең қымбат жол MST-ге ешқашан кірмейді', 'MST кез келген екі қала арасындағы ең қысқа жолды береді'], answer: 1, explain: 'Ең арзан жолдың бір шетін бөлек топ деп алсақ, cut property бойынша ол кіреді (Kruskal оны бірінші алады). MST-де n − 1 = 5 жол. Ең қымбат жол көпір болса, кіруі мүмкін. MST ең қысқа жол есебін шешпейді.' }
        ]
      },
      {
        id: 'alg-9', title: 'Greedy алгоритмдер', minutes: 16,
        body: `
<p><b>Greedy</b> (ашкөз) алгоритм әр қадамда «қазір ең жақсы көрінетін» таңдауды жасайды және оған қайта оралмайды. Kruskal мен Dijkstra greedy алгоритмдер еді. Greedy тез әрі қарапайым, бірақ қауіпті: көп есепте ол қате жауап береді. Сондықтан негізгі сұрақ: <b>неге</b> бұл жерде greedy дұрыс?</p>
<h3>Interval scheduling</h3>
<p>Шымкенттегі коворкингте бір мәжіліс залы бар. Командалар <code>[start, end)</code> уақытына брондау сұрайды. Ең көп кездесуді қалай орналастырамыз? Бірнеше «интуитивті» ереже бар: ең ерте басталатынын алу, ең қысқасын алу. Екеуі де қате. Дұрыс ереже: <b>ең ерте аяқталатынын</b> алу.</p>
<pre><code>def max_meetings(intervals):
    count, free_at = 0, float("-inf")
    for s, e in sorted(intervals, key=lambda x: x[1]):
        if s &gt;= free_at:         # [s, e) зал босағаннан кейін басталады
            count += 1
            free_at = e
    return count

print(max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]))   # 2</code></pre>
<p>Жартылай ашық аралық болғандықтан, 11:00-де аяқталған кездесуден кейін 11:00-де жаңасы басталуы мүмкін: <code>s &gt;= free_at</code>.</p>
<h3>Exchange argument: бейресми дәлел</h3>
<p>Кез келген оңтайлы кесте алайық. Оның бірінші кездесуін біздің таңдауымызбен (ең ерте аяқталатын) <b>алмастырайық</b>. Біздікі ертерек не сол уақытта аяқталады, сондықтан қалған кездесулерге кедергі жасамайды: кесте әлі де жарамды, кездесу саны өзгерген жоқ. Осылай қадам сайын алмастыра берсек, оңтайлы кесте біздің greedy кестемізге айналады. Демек greedy оңтайлы. Бұл тәсіл <b>exchange argument</b> деп аталады: «оңтайлы шешімді greedy таңдауға жақындатқанда, ол нашарламайды».</p>
<h3>Тиын беру: greedy қашан жұмыс істейді</h3>
<p>Кассир 1, 2, 5, 10, 20, 50, 100, 200 теңгелік монеталармен қайтарым береді. Greedy: ең үлкен монетаны мүмкін болғанша алу. Мұндай «канондық» жүйелерде greedy монета санын азайтады. Бірақ жүйе басқаша болса:</p>
<pre><code>coins = [1, 3, 4], amount = 6
greedy:  4 + 1 + 1   → 3 монета
оңтайлы: 3 + 3       → 2 монета</code></pre>
<p>Мұнда greedy қате. Оңтайлы жауап үшін DSA1-дегі coin change DP керек. Монеталар жүйесін тексеру үшін greedy мен DP нәтижесін көп сомада салыстыруға болады: бұл келесі тапсырмалардың бірі.</p>
<h3>Greedy-ді қалай тану керек</h3>
<ul>
<li>Таңдау «жергілікті» және кейін ешқандай таңдауға кедергі жасамайды.</li>
<li>Сұрыптаудан кейін бір өту жеткілікті (интервалдар, тапсырмалар, бағалар).</li>
<li>Exchange argument құрастыруға болады.</li>
<li>Кішкентай қарсы мысал таппасаңыз (brute force-пен салыстырып), greedy-ге сенімділік артады.</li>
</ul>
<h3>Жиі қателер</h3>
<ul>
<li>Интервалдарды басталу уақыты бойынша сұрыптау.</li>
<li>Greedy-ді дәлелсіз қолдану: 0/1 knapsack-те «бағасы/салмағы ең жоғарысын алу» қате (бөлшек knapsack-те дұрыс).</li>
<li>Шекарадағы теңдікті ұмыту: <code>&gt;</code> мен <code>&gt;=</code> айырмасы.</li>
</ul>
<div class="tip"><b>Кеңес:</b> greedy идеясын тапқанда, оны бірден brute force-пен кездейсоқ шағын кірістерде салыстырыңыз. Қарсы мысал табылса, есеп DP-ге жақын болуы ықтимал.</div>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>max_meetings(intervals)</code>: <code>(start, end)</code> жартылай ашық <code>[start, end)</code> брондаулар. Бір залда қатар өтпейтін ең көп кездесу санын қайтарыңыз. Тест 100 000 брондаумен жылдамдықты тексереді.
<pre><code>max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]) → 2
max_meetings([(1, 2), (2, 3), (3, 4)])                → 3
max_meetings([])                                      → 0</code></pre>`,
            starter: P`def max_meetings(intervals):
    return len(intervals)
`,
            solution: P`def max_meetings(intervals):
    count, free_at = 0, float("-inf")
    for s, e in sorted(intervals, key=lambda x: x[1]):
        if s >= free_at:
            count += 1
            free_at = e
    return count
`,
            hints: ['Аяқталу уақыты бойынша сұрыптаңыз: <code>key=lambda x: x[1]</code>.', 'Кездесу зал босаған уақыттан кейін немесе сол сәтте басталса, оны алыңыз: <code>s &gt;= free_at</code>.'],
            check: { tests: P`
assert max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]) == 2, "Күтілгені 2: (10, 11) және (11, 13) немесе (12, 14)"
assert max_meetings([(1, 2), (2, 3), (3, 4)]) == 3, "Жанасатын аралықтар қиылыспайды: 3"
assert max_meetings([]) == 0, "Брондау жоқ: 0"
assert max_meetings([(0, 10), (1, 2), (2, 3), (3, 4)]) == 3, "Ұзын кездесуді алмау керек: 3"
assert max_meetings([(5, 6), (5, 6)]) == 1, "Бірдей екі брондаудың біреуі ғана"
import random as _random, time as _time
from itertools import combinations as _comb
_R = _random.Random(14)
def _ok(sel):
    sel = sorted(sel)
    return all(sel[i][1] <= sel[i + 1][0] for i in range(len(sel) - 1))
for _ in range(40):
    _iv = [(s, s + _R.randint(1, 4)) for s in (_R.randint(0, 10) for _ in range(_R.randint(1, 7)))]
    _best = max(k for k in range(len(_iv) + 1) if any(_ok(c) for c in _comb(_iv, k)))
    assert max_meetings(_iv) == _best, "brute force-пен сәйкес емес: " + str(_iv)
_big = [(s, s + _R.randint(1, 50)) for s in (_R.randint(0, 10**6) for _ in range(100000))]
_t0 = _time.perf_counter(); max_meetings(_big); _dt = _time.perf_counter() - _t0
assert _dt < 1.0, "100 000 брондау тым баяу: бір сұрыптау және бір өту жеткілікті"
` } },
          { type: 'python', level: 'easy', xp: 15, prompt: P`<code>greedy_change(coins, amount)</code>: ең үлкен монетадан бастап, мүмкін болғанша алып, қолданылған монеталар тізімін кему ретімен қайтарыңыз. Greedy соманы дәл жинай алмаса, <code>None</code>. <code>coins</code> реттелмеген болуы мүмкін.
<pre><code>greedy_change([1, 5, 10, 2], 18) → [10, 5, 2, 1]
greedy_change([1, 3, 4], 6)      → [4, 1, 1]
greedy_change([5, 3], 7)         → None    # 5, қалды 2</code></pre>`,
            starter: P`def greedy_change(coins, amount):
    return []
`,
            solution: P`def greedy_change(coins, amount):
    out = []
    for c in sorted(coins, reverse=True):
        k = amount // c
        out.extend([c] * k)
        amount -= k * c
    return out if amount == 0 else None
`,
            hints: ['<code>sorted(coins, reverse=True)</code>, әр монета үшін <code>k = amount // c</code>.', 'Соңында <code>amount</code> 0 болмаса, <code>None</code>.'],
            check: { tests: P`
assert greedy_change([1, 5, 10, 2], 18) == [10, 5, 2, 1], "18 = 10 + 5 + 2 + 1"
assert greedy_change([1, 3, 4], 6) == [4, 1, 1], "Greedy [4, 1, 1] береді (оңтайлы емес, бірақ greedy солай)"
assert greedy_change([5, 3], 7) is None, "5 алынғаннан кейін 2 қалады: None"
assert greedy_change([2, 1], 0) == [], "Сома 0: []"
assert greedy_change([200, 100, 50, 20, 10, 5, 2, 1], 389) == [200, 100, 50, 20, 10, 5, 2, 2], "389 теңге: 8 монета"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<code>first_greedy_failure(coins, limit)</code>: <code>1..limit</code> сомаларының ішінен greedy монета саны оңтайлыдан көп болатын (немесе greedy жинай алмайтын, ал оңтайлы жинай алатын) <b>ең кіші</b> соманы қайтарыңыз. Ондай сома жоқ болса, <code>None</code>. Оңтайлы санды DP арқылы есептеңіз: <code>best[x] = min(best[x - c] + 1)</code>.
<pre><code>first_greedy_failure([1, 3, 4], 20)                 → 6
first_greedy_failure([1, 7, 10], 50)                → 14
first_greedy_failure([1, 2, 5, 10, 20, 50], 1000)   → None</code></pre>`,
            starter: P`def first_greedy_failure(coins, limit):
    return None
`,
            solution: P`def first_greedy_failure(coins, limit):
    INF = float("inf")
    desc = sorted(coins, reverse=True)
    best = [0] + [INF] * limit
    for x in range(1, limit + 1):
        for c in coins:
            if c <= x and best[x - c] + 1 < best[x]:
                best[x] = best[x - c] + 1
    for x in range(1, limit + 1):
        rest, cnt = x, 0
        for c in desc:
            cnt += rest // c
            rest %= c
        g = cnt if rest == 0 else INF
        if g > best[x]:
            return x
    return None
`,
            hints: ['Алдымен DP: <code>best = [0] + [inf] * limit</code>, әр <code>x</code> үшін әр монетаны қарап шығыңыз.', 'Greedy сан: <code>cnt += rest // c</code>, <code>rest %= c</code>. Жинай алмаса, greedy саны шексіз деп есептеңіз.'],
            check: { tests: P`
assert first_greedy_failure([1, 3, 4], 20) == 6, "6: greedy 4+1+1, оңтайлы 3+3"
assert first_greedy_failure([1, 7, 10], 50) == 14, "14: greedy 10+1+1+1+1, оңтайлы 7+7"
assert first_greedy_failure([1, 2, 5, 10, 20, 50], 1000) is None, "Канондық жүйеде greedy әрқашан оңтайлы"
assert first_greedy_failure([1, 3, 4], 5) is None, "5-ке дейін greedy дұрыс"
assert first_greedy_failure([4, 3], 10) == 6, "6: greedy 4 алып тұрып қалады, оңтайлы 3+3"
assert first_greedy_failure([2], 9) is None, "Тақ сомаларды ешкім жинай алмайды: бұл greedy қатесі емес"
import time as _time
_t0 = _time.perf_counter(); _r = first_greedy_failure([1, 2, 5, 10, 20, 50, 100, 200], 20000); _dt = _time.perf_counter() - _t0
assert _r is None, "Теңге монеталары канондық: None"
assert _dt < 1.5, "Тым баяу: DP O(limit · len(coins)) болуы керек"
` } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Interval scheduling-те қай greedy ереже <b>әрқашан</b> ең көп кездесуді береді?', options: ['Ең ерте басталатынын алу', 'Ең қысқасын алу', 'Ең ерте аяқталатынын алу', 'Басқалармен ең аз қиылысатынын алу'], answer: 2, explain: 'Ең ерте аяқталатын кездесу залды ең ерте босатады. Exchange argument: оңтайлы кестенің бірінші кездесуін оған алмастырсақ, кесте бұзылмайды. Қалған ережелердің әрқайсысына қарсы мысал бар.' }
        ]
      },
      {
        id: 'alg-10', title: 'DP II: LIS, knapsack, edit distance, bitmask', minutes: 20,
        body: `
<p>DSA1-де DP-нің негізін көрдік: күй, ауысу, базалық жағдай; LIS ұзындығын O(n log n)-де және edit distance-ты 2D кестемен есептедік. Енді бір қадам әрі: жауаптың <b>өзін</b> қалпына келтіру, ресурсқа шектеулі таңдау және ішкі жиындар бойынша DP.</p>
<h3>LIS-ті қалпына келтіру</h3>
<p><code>tails[k]</code>: ұзындығы k + 1 өспелі тізбектің ең кіші соңғы мәні. Тізбектің өзін алу үшін <code>tails_idx[k]</code> (сол мәннің индексі) және <code>prev[i]</code> (i-ден алдыңғы элементтің индексі) сақтаймыз. Соңында ең ұзын тізбектің соңынан <code>prev</code> бойынша артқа жүреміз. Бұл Dijkstra-дағы <code>prev</code>-пен бірдей идея.</p>
<h3>0/1 knapsack</h3>
<p>Студент Бурабайға жорыққа шығады, рюкзак ең көбі <code>W</code> кг көтереді. Әр заттың салмағы мен пайдасы бар, әр затты бір рет алуға болады. <code>dp[w]</code>: салмағы <code>w</code>-дан аспайтын ең жоғары пайда.</p>
<pre><code>def knapsack(items, W):
    dp = [0] * (W + 1)
    for weight, value in items:
        for w in range(W, weight - 1, -1):   # КЕРІ ретпен!
            dp[w] = max(dp[w], dp[w - weight] + value)
    return dp[W]

print(knapsack([(3, 40), (4, 50), (2, 30)], 6))   # 80: 4 кг + 2 кг</code></pre>
<p>Ішкі цикл неге кері? Алға жүрсек, <code>dp[w - weight]</code> осы заттың өзін қамтып үлгеруі мүмкін: бір затты екі рет аламыз (бұл шексіз knapsack болып кетеді). Уақыт O(n·W), жад O(W).</p>
<h3>Edit distance-ты қолдану</h3>
<p>DSA1-дегі <code>edit_distance(a, b)</code> бір символды қою, өшіру немесе ауыстыру санын береді. Нақты қолдану: іздеу жолағындағы қате теруді түзету. Қолданушы «Алмты» деп терсе, қалалар тізімінен қашықтығы ең аз сөзді ұсынамыз. Ұзын жолдарда кестенің тек екі қатарын сақтасақ, жад O(min(n, m)) болады.</p>
<h3>Bitmask DP</h3>
<p>Курьер қоймадан (0) шығып, n нүктенің бәріне барып, қоймаға оралады. Барлық ретті тексеру O(n!). Ішкі жиын бойынша DP: <code>dp[mask][v]</code> = mask-тағы нүктелерге барып, v-да тұрған кездегі ең қысқа жол. <code>mask</code>: биттері барылған нүктелерді білдіретін бүтін сан.</p>
<pre><code>mask = 0b1011        # 0, 1, 3 нүктелеріне бардық
mask &gt;&gt; 2 &amp; 1       # 0: 2-нүктеге әлі бармадық
mask | (1 &lt;&lt; 2)      # 0b1111: 2-нүктені қостық</code></pre>
<p>Күйлер саны 2ⁿ · n, әр күйден n ауысу: O(2ⁿ · n²). n = 15 үшін бұл шамамен 7 млн, ал 15! ≈ 1.3 трлн.</p>
<h3>Жиі қателер</h3>
<ul>
<li>0/1 knapsack-те ішкі циклді алға жүргізу.</li>
<li>LIS-те қатаң өсу үшін <code>bisect_left</code>, қатаң емес үшін <code>bisect_right</code> керегін шатастыру.</li>
<li>Bitmask-та операция басымдығы: <code>mask &amp; 1 &lt;&lt; v</code> емес, <code>mask &amp; (1 &lt;&lt; v)</code> деп жақшамен жазыңыз.</li>
</ul>
<div class="tip"><b>Кеңес:</b> n ≤ 20 шектеуін көрсеңіз, bitmask DP-ді ойлаңыз. W ≤ 10⁴ сияқты шағын «сыйымдылық» болса, knapsack тәрізді 1D DP-ді ойлаңыз.</div>`,
        exercises: [
          { type: 'python', level: 'hard', xp: 30, prompt: P`<code>lis_sequence(a)</code>: ең ұзын <b>қатаң өспелі</b> ішкі тізбектің (элементтер ретін сақтап, міндетті түрде қатар емес) өзін тізім ретінде қайтарыңыз. Бірнеше жауап болса, кез келгені. O(n log n): <code>tails_idx</code> және <code>prev</code> сақтаңыз. Тест 100 000 элементпен тексереді.
<pre><code>lis_sequence([3, 1, 4, 1, 5, 9, 2, 6]) → [1, 4, 5, 9]  (немесе [1, 4, 5, 6], [3, 4, 5, 9], ...)
lis_sequence([])                       → []</code></pre>`,
            starter: P`from bisect import bisect_left

def lis_sequence(a):
    return a[:1]
`,
            solution: P`from bisect import bisect_left

def lis_sequence(a):
    tails, tails_idx = [], []
    prev = [-1] * len(a)
    for i, x in enumerate(a):
        k = bisect_left(tails, x)
        if k == len(tails):
            tails.append(x)
            tails_idx.append(i)
        else:
            tails[k] = x
            tails_idx[k] = i
        prev[i] = tails_idx[k - 1] if k > 0 else -1
    out = []
    i = tails_idx[-1] if tails_idx else -1
    while i != -1:
        out.append(a[i])
        i = prev[i]
    return out[::-1]
`,
            hints: ['Элемент <code>k</code> орнына түссе, оның алдыңғысы <code>tails_idx[k - 1]</code>: <code>prev[i]</code>-ге соны жазыңыз.', 'Соңында <code>tails_idx[-1]</code>-ден бастап <code>prev</code> бойынша жүріп, тізімді аударыңыз.'],
            check: { tests: P`
from bisect import bisect_left as _bl
def _len(a):
    t = []
    for x in a:
        k = _bl(t, x)
        if k == len(t): t.append(x)
        else: t[k] = x
    return len(t)
def _valid(a, s):
    it = iter(a)
    return all(x in it for x in s) and all(s[i] < s[i + 1] for i in range(len(s) - 1))
_s = lis_sequence([3, 1, 4, 1, 5, 9, 2, 6])
assert len(_s) == 4 and _valid([3, 1, 4, 1, 5, 9, 2, 6], _s), "Ұзындығы 4 қатаң өспелі ішкі тізбек болуы керек, сізде " + str(_s)
assert lis_sequence([]) == [], "Бос тізім: []"
assert lis_sequence([7, 7, 7]) == [7], "Қатаң өсу: бірдей мәндерден тек біреуі"
assert lis_sequence([5, 4, 3]) in ([5], [4], [3]), "Кемімелі тізімде ұзындық 1"
assert lis_sequence([1, 2, 3]) == [1, 2, 3], "Өспелі тізім: өзі"
import random as _random, time as _time
_R = _random.Random(15)
for _ in range(100):
    _a = [_R.randint(0, 9) for _ in range(_R.randint(1, 12))]
    _r = lis_sequence(_a)
    assert len(_r) == _len(_a) and _valid(_a, _r), "Кездейсоқ тексеруде қате: " + str(_a)
_big = [_R.randint(0, 10**6) for _ in range(100000)]
_t0 = _time.perf_counter(); _r = lis_sequence(_big); _dt = _time.perf_counter() - _t0
assert len(_r) == _len(_big) and _valid(_big, _r), "100 000 элементте нәтиже қате"
assert _dt < 1.0, "Тым баяу: O(n log n) болуы керек"
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>knapsack(items, capacity)</code>: <code>items</code>: <code>(салмақ, пайда)</code> жұптары, әр затты ең көбі бір рет алуға болады. Жалпы салмағы <code>capacity</code>-тен аспайтын ең жоғары пайданы қайтарыңыз. 1D DP, ішкі цикл кері ретпен.
<pre><code>knapsack([(3, 40), (4, 50), (2, 30)], 6) → 80
knapsack([(5, 10)], 4)                   → 0</code></pre>`,
            starter: P`def knapsack(items, capacity):
    return sum(v for w, v in items if w <= capacity)
`,
            solution: P`def knapsack(items, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in items:
        for w in range(capacity, weight - 1, -1):
            if dp[w - weight] + value > dp[w]:
                dp[w] = dp[w - weight] + value
    return dp[capacity]
`,
            hints: ['<code>dp = [0] * (capacity + 1)</code>.', '<code>for w in range(capacity, weight - 1, -1): dp[w] = max(dp[w], dp[w - weight] + value)</code>.'],
            check: { tests: P`
assert knapsack([(3, 40), (4, 50), (2, 30)], 6) == 80, "4 кг + 2 кг = 80 пайда"
assert knapsack([(5, 10)], 4) == 0, "Зат сыймайды: 0"
assert knapsack([], 10) == 0, "Зат жоқ: 0"
assert knapsack([(2, 5)], 10) == 5, "Бір затты екі рет алуға болмайды: 5"
assert knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7) == 9, "3 кг + 4 кг = 9"
assert knapsack([(0, 3), (1, 1)], 0) == 3, "Салмағы 0 зат"
import random as _random, time as _time
from itertools import combinations as _comb
_R = _random.Random(16)
for _ in range(30):
    _it = [(_R.randint(1, 6), _R.randint(1, 20)) for _ in range(_R.randint(0, 6))]
    _W = _R.randint(0, 12)
    _best = max(sum(v for _, v in c) for k in range(len(_it) + 1) for c in _comb(_it, k) if sum(w for w, _ in c) <= _W)
    assert knapsack(_it, _W) == _best, "brute force-пен сәйкес емес: " + str((_it, _W))
_big = [(_R.randint(1, 100), _R.randint(1, 1000)) for _ in range(80)]
_t0 = _time.perf_counter(); knapsack(_big, 3000); _dt = _time.perf_counter() - _t0
assert _dt < 1.5, "80 зат, сыйымдылық 3000: тым баяу"
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`Іздеу жолағындағы қате теруді түзету. <code>suggest(word, dictionary)</code>: <code>dictionary</code>-дағы <code>word</code>-қа edit distance-ы (қою, өшіру, ауыстыру) ең аз сөзді қайтарыңыз. Тең болса, алфавит бойынша ең кішісі. Сөздік бос болса, <code>None</code>. Edit distance-ты екі қатармен жазыңыз.
<pre><code>suggest("Алмты", ["Астана", "Алматы", "Атырау"]) → "Алматы"
suggest("кот", ["кит", "кет"])                     → "кет"</code></pre>`,
            starter: P`def suggest(word, dictionary):
    return dictionary[0] if dictionary else None
`,
            solution: P`def edit_distance(a, b):
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                cur[j] = prev[j - 1]
            else:
                cur[j] = 1 + min(prev[j], cur[j - 1], prev[j - 1])
        prev = cur
    return prev[len(b)]

def suggest(word, dictionary):
    if not dictionary:
        return None
    return min(dictionary, key=lambda w: (edit_distance(word, w), w))
`,
            hints: ['Edit distance: <code>prev</code> қатары <code>list(range(len(b) + 1))</code>-дан басталады, әр жаңа қатар <code>[i] + ...</code>.', 'Таңдау: <code>min(dictionary, key=lambda w: (edit_distance(word, w), w))</code>.'],
            check: { tests: P`
assert suggest("Алмты", ["Астана", "Алматы", "Атырау"]) == "Алматы", "Алмты → Алматы (бір символ қою)"
assert suggest("кот", ["кит", "кет"]) == "кет", "Екеуінің де қашықтығы 1: алфавит бойынша кет"
assert suggest("x", []) is None, "Бос сөздік: None"
assert suggest("", ["аб", "а"]) == "а", "Бос сөзге ең қысқа сөз жақын"
assert suggest("Шымкент", ["Шымкент", "Шемонаиха"]) == "Шымкент", "Дәл сәйкестік: қашықтық 0"
assert suggest("Kostanai", ["Qostanai", "Kokshetau"]) == "Qostanai", "Бір ауыстыру: Qostanai"
assert suggest("sitting", ["kitten", "mitten"]) == "kitten", "sitting → kitten және mitten екеуі де 3: алфавит бойынша kitten"
import random as _random, time as _time
_R = _random.Random(17)
_words = ["".join(_R.choice("абвгдеж") for _ in range(_R.randint(5, 12))) for _ in range(400)]
_t0 = _time.perf_counter(); suggest("абвгдежабв", _words); _dt = _time.perf_counter() - _t0
assert _dt < 1.5, "400 сөз тым баяу"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`Bitmask DP. Курьер қоймадан (0-нүкте) шығып, барлық нүктеге дәл бір рет барып, қоймаға оралады. <code>min_tour(dist)</code>, мұндағы <code>dist[i][j]</code> i-ден j-ге жүру уақыты, ең аз жалпы уақытты қайтарыңыз. <code>n = 1</code> болса, 0. Тест n = 11 нүктемен тексереді: <code>permutations</code> арқылы 10! ретті аралау тым баяу.
<pre><code>dist = [[0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]]
min_tour(dist) → 80     # 0 → 1 → 3 → 2 → 0</code></pre>`,
            starter: P`def min_tour(dist):
    return 0
`,
            solution: P`def min_tour(dist):
    n = len(dist)
    if n <= 1:
        return 0
    INF = float("inf")
    full = 1 << n
    dp = [[INF] * n for _ in range(full)]
    dp[1][0] = 0
    for mask in range(full):
        if not mask & 1:
            continue
        row = dp[mask]
        for v in range(n):
            d = row[v]
            if d == INF:
                continue
            for u in range(n):
                if mask & (1 << u):
                    continue
                nm = mask | (1 << u)
                nd = d + dist[v][u]
                if nd < dp[nm][u]:
                    dp[nm][u] = nd
    return min(dp[full - 1][v] + dist[v][0] for v in range(1, n))
`,
            hints: ['<code>dp[mask][v]</code>: mask-тағы нүктелерге барып, v-да тұрғандағы ең аз уақыт. Бастапқы күй <code>dp[1][0] = 0</code>.', 'Жауап: <code>min(dp[full - 1][v] + dist[v][0] for v in range(1, n))</code>.'],
            check: { tests: P`
_d = [[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]
assert min_tour(_d) == 80, "0 → 1 → 3 → 2 → 0 = 80"
assert min_tour([[0]]) == 0, "Тек қойма: 0"
assert min_tour([[0, 4], [6, 0]]) == 10, "0 → 1 → 0 = 4 + 6"
assert min_tour([[0, 1, 9], [9, 0, 1], [1, 9, 0]]) == 3, "Бағытталған: 0 → 1 → 2 → 0 = 3"
from itertools import permutations as _perm
import random as _random, time as _time
_R = _random.Random(18)
for _ in range(10):
    _n = _R.randint(2, 6)
    _m = [[0 if i == j else _R.randint(1, 50) for j in range(_n)] for i in range(_n)]
    _ref = min(sum(_m[a][b] for a, b in zip((0,) + p, p + (0,))) for p in _perm(range(1, _n)))
    assert min_tour(_m) == _ref, "brute force-пен сәйкес емес: " + str(_m)
_n = 11
_m = [[0 if i == j else _R.randint(1, 100) for j in range(_n)] for i in range(_n)]
_t0 = _time.perf_counter(); _v = min_tour(_m); _dt = _time.perf_counter() - _t0
assert isinstance(_v, int) and _v > 0, "11 нүктеде нәтиже қате"
assert _dt < 2.0, "n = 11 тым баяу: bitmask DP O(2ⁿ · n²) қолданыңыз"
` } }
        ]
      },
      {
        id: 'alg-11', title: 'Жолдар алгоритмдері: prefix function және KMP', minutes: 18,
        body: `
<p>DSA1-де жолдармен жұмыс істеп, палиндром мен анаграммаларды тексердік. Енді классикалық есеп: ұзын мәтіннен (<code>text</code>, ұзындығы n) үлгіні (<code>pattern</code>, ұзындығы m) табу. Аңғал тәсіл әр позицияда үлгіні басынан салыстырады: ең нашар жағдайда O(n·m). Мысалы, мәтін <code>"aaaa...a"</code>, үлгі <code>"aaa...ab"</code> болса, әр позицияда m − 1 символ сәйкес келіп, соңында сәтсіз болады.</p>
<h3>Prefix function</h3>
<p><code>pi[i]</code>: <code>s[0..i]</code> префиксінің ең ұзын <b>меншікті</b> (өзіне тең емес) префиксінің ұзындығы, ол сол префикстің суффиксі де болады. Мысалы, <code>s = "abcabd"</code>:</p>
<table>
<tr><th>i</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><th>s[i]</th><td>a</td><td>b</td><td>c</td><td>a</td><td>b</td><td>d</td></tr>
<tr><th>pi[i]</th><td>0</td><td>0</td><td>0</td><td>1</td><td>2</td><td>0</td></tr>
</table>
<p>i = 4-те <code>"abcab"</code> префиксі <code>"ab"</code>-мен басталып, <code>"ab"</code>-мен аяқталады: pi = 2.</p>
<pre><code>def prefix_function(s):
    pi = [0] * len(s)
    for i in range(1, len(s)):
        k = pi[i - 1]
        while k &gt; 0 and s[i] != s[k]:
            k = pi[k - 1]            # қысқарақ «шекараға» секіреміз
        if s[i] == s[k]:
            k += 1
        pi[i] = k
    return pi</code></pre>
<p>Неге O(n)? <code>k</code> әр қадамда ең көбі 1-ге өседі, ал <code>while</code> оны тек азайтады. Барлық азайту саны барлық өсуден аспайды.</p>
<h3>KMP іздеу</h3>
<p>Knuth-Morris-Pratt алгоритмі: сәйкессіздік болғанда мәтінде артқа оралмаймыз, үлгіде <code>pi</code> бойынша секіреміз. Ең оңай жазу тәсілі: <code>pattern + "#" + text</code> жолының prefix function-ын есептеу. <code>"#"</code> екі жолда да жоқ символ болуы керек. <code>pi[i] == m</code> болған жерде үлгі аяқталды, оның мәтіндегі басы <code>i - 2m</code>. Уақыт O(n + m).</p>
<p>Нақты мысал: оқушылардың эсселерінен «жасанды интеллект» тіркесінің неше рет кездесетінін санау, логтардан қате кодын табу, ДНҚ тізбегінен үлгі іздеу.</p>
<h3>String hashing</h3>
<p>Тағы бір тәсіл: жолды санға айналдыру. Полиномдық hash: <code>h(s) = (s[0]·Bᵐ⁻¹ + s[1]·Bᵐ⁻² + ... + s[m−1]) mod M</code>. Терезе бір символға жылжығанда hash-ті O(1)-де жаңартуға болады (<b>rolling hash</b>, Rabin-Karp алгоритмі). Екі жолдың hash-і тең болмаса, жолдар әртүрлі; тең болса, <b>ықтимал</b> тең, себебі collision болуы мүмкін. Сондықтан hash сәйкес келгенде жолдарды тікелей салыстырып тексереміз немесе екі түрлі M қолданамыз.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Сәйкестік табылғаннан кейін іздеуді тоқтату: қабаттасқан кездесулер өткізіліп кетеді (<code>"aa"</code> үлгісі <code>"aaa"</code>-да 2 рет).</li>
<li>Python-ның <code>str.count</code> қабаттаспайтын кездесулерді санайды: <code>"aaa".count("aa") == 1</code>.</li>
<li>Бөлгіш символ мәтінде кездеседі: <code>"#"</code> орнына мәтінде жоқ символ таңдаңыз немесе бөлек KMP циклін жазыңыз.</li>
<li>Бос үлгіні ескермеу.</li>
</ul>
<div class="tip"><b>Кеңес:</b> prefix function тек іздеу үшін емес. Ол жолдың ең қысқа периодын да береді: <code>p = n - pi[n - 1]</code>, ал <code>n % p == 0</code> болса, жол p ұзындықты бөліктің қайталануы.</div>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>prefix_function(s)</code>: әр <code>i</code> үшін <code>s[0..i]</code>-нің суффиксі де болатын ең ұзын меншікті префикстің ұзындығы. O(n).
<pre><code>prefix_function("abcabd")  → [0, 0, 0, 1, 2, 0]
prefix_function("aabaaab") → [0, 1, 0, 1, 2, 2, 3]
prefix_function("")        → []</code></pre>`,
            starter: P`def prefix_function(s):
    return [0] * len(s)
`,
            solution: P`def prefix_function(s):
    pi = [0] * len(s)
    for i in range(1, len(s)):
        k = pi[i - 1]
        while k > 0 and s[i] != s[k]:
            k = pi[k - 1]
        if s[i] == s[k]:
            k += 1
        pi[i] = k
    return pi
`,
            hints: ['<code>k = pi[i - 1]</code>-ден бастаңыз; сәйкес келмесе, <code>k = pi[k - 1]</code>.', '<code>s[i] == s[k]</code> болса, <code>k += 1</code>.'],
            check: { tests: P`
assert prefix_function("abcabd") == [0, 0, 0, 1, 2, 0], "abcabd → [0, 0, 0, 1, 2, 0]"
assert prefix_function("aabaaab") == [0, 1, 0, 1, 2, 2, 3], "aabaaab → [0, 1, 0, 1, 2, 2, 3]"
assert prefix_function("") == [], "Бос жол: []"
assert prefix_function("a") == [0], "Бір символ: [0]"
assert prefix_function("aaaa") == [0, 1, 2, 3], "aaaa → [0, 1, 2, 3]"
import time as _time
_s = "ab" * 50000 + "c"
_t0 = _time.perf_counter(); _p = prefix_function(_s); _dt = _time.perf_counter() - _t0
assert _p[-2] == 99998 and _p[-1] == 0, "Ұзын жолда нәтиже қате"
assert _dt < 1.0, "100 000 символ тым баяу: O(n) болуы керек"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<code>kmp_search(text, pattern)</code>: <code>pattern</code> кездесетін барлық бастапқы индекстерді (қабаттасқандарын да) өсу ретімен қайтарыңыз. Бос үлгі болса, <code>[]</code>. Мәтінде кез келген символ (<code>#</code> да) болуы мүмкін, сондықтан бөлек KMP циклін жазыңыз: үлгінің prefix function-ын есептеп, мәтінді бір рет аралаңыз.
<pre><code>kmp_search("abababa", "aba") → [0, 2, 4]
kmp_search("Алматы", "ты")   → [4]
kmp_search("abc", "")        → []</code></pre>`,
            starter: P`def kmp_search(text, pattern):
    i = text.find(pattern)
    return [i] if i >= 0 and pattern else []
`,
            solution: P`def kmp_search(text, pattern):
    m = len(pattern)
    if m == 0:
        return []
    pi = [0] * m
    for i in range(1, m):
        k = pi[i - 1]
        while k > 0 and pattern[i] != pattern[k]:
            k = pi[k - 1]
        if pattern[i] == pattern[k]:
            k += 1
        pi[i] = k
    out = []
    k = 0
    for i, ch in enumerate(text):
        while k > 0 and ch != pattern[k]:
            k = pi[k - 1]
        if ch == pattern[k]:
            k += 1
        if k == m:
            out.append(i - m + 1)
            k = pi[k - 1]
    return out
`,
            hints: ['Мәтінді аралағанда <code>k</code>: үлгінің қанша символы сәйкес келді. Сәйкессіздікте <code>k = pi[k - 1]</code>.', '<code>k == m</code> болса, индекс <code>i - m + 1</code>, сосын <code>k = pi[k - 1]</code> (қабаттасу үшін).'],
            check: { tests: P`
assert kmp_search("abababa", "aba") == [0, 2, 4], "Қабаттасқан кездесулер: [0, 2, 4]"
assert kmp_search("Алматы", "ты") == [4], "Алматы ішінде ты: [4]"
assert kmp_search("abc", "") == [], "Бос үлгі: []"
assert kmp_search("", "a") == [], "Бос мәтін: []"
assert kmp_search("ab", "abc") == [], "Үлгі мәтіннен ұзын: []"
assert kmp_search("a#b#a#b", "#b") == [1, 5], "Мәтінде # символы болса да дұрыс жұмыс істеуі керек"
assert kmp_search("aaaa", "aa") == [0, 1, 2], "aaaa ішінде aa үш рет"
import random as _random, time as _time
_R = _random.Random(19)
for _ in range(100):
    _t = "".join(_R.choice("ab") for _ in range(_R.randint(0, 15)))
    _p = "".join(_R.choice("ab") for _ in range(_R.randint(1, 3)))
    assert kmp_search(_t, _p) == [i for i in range(len(_t) - len(_p) + 1) if _t[i:i + len(_p)] == _p], "Кездейсоқ тексеруде қате: " + repr((_t, _p))
_text = "a" * 100000
_t0 = _time.perf_counter(); _r = kmp_search(_text, "a" * 300 + "b"); _r2 = kmp_search(_text, "aaa"); _dt = _time.perf_counter() - _t0
assert _r == [] and len(_r2) == 99998, "Ұзын мәтінде нәтиже қате"
assert _dt < 1.5, "Тым баяу: KMP O(n + m) болуы керек"
` } },
          { type: 'python', level: 'medium', xp: 20, prompt: P`<code>shortest_period(s)</code>: <code>s</code> жолы қайталанып құралатын ең қысқа бөліктің ұзындығы. Жол ешбір қысқа бөліктің қайталануы болмаса, <code>len(s)</code>. Бос жолға 0. Prefix function қолданыңыз: <code>p = n - pi[n - 1]</code>.
<pre><code>shortest_period("abcabcabc") → 3
shortest_period("abab")      → 2
shortest_period("abcab")     → 5
shortest_period("zzzz")      → 1</code></pre>`,
            starter: P`def shortest_period(s):
    return len(s)
`,
            solution: P`def shortest_period(s):
    n = len(s)
    if n == 0:
        return 0
    pi = [0] * n
    for i in range(1, n):
        k = pi[i - 1]
        while k > 0 and s[i] != s[k]:
            k = pi[k - 1]
        if s[i] == s[k]:
            k += 1
        pi[i] = k
    p = n - pi[-1]
    return p if n % p == 0 else n
`,
            hints: ['Алдымен prefix function-ды есептеңіз (өткен тапсырмадағы кодты қайта жазыңыз).', '<code>p = n - pi[-1]</code>; <code>n % p == 0</code> болса, p, әйтпесе n.'],
            check: { tests: P`
assert shortest_period("abcabcabc") == 3, "abc × 3: 3"
assert shortest_period("abab") == 2, "ab × 2: 2"
assert shortest_period("abcab") == 5, "Толық қайталану емес: 5"
assert shortest_period("zzzz") == 1, "z × 4: 1"
assert shortest_period("") == 0, "Бос жол: 0"
assert shortest_period("a") == 1, "Бір символ: 1"
assert shortest_period("aabaab") == 3, "aab × 2: 3"
import time as _time
_s = "қазақ" * 20000
_t0 = _time.perf_counter(); _r = shortest_period(_s); _dt = _time.perf_counter() - _t0
assert _r == 5, "қазақ × 20000: 5"
assert _dt < 1.0, "Тым баяу: prefix function O(n)"
` } },
          { type: 'quiz', level: 'medium', xp: 15, prompt: 'Rabin-Karp іздеуінде мәтін терезесінің hash-і үлгінің hash-іне тең шықты. Ең дұрыс келесі әрекет қандай?', options: ['Бірден кездесу деп есептеу', 'Терезе мен үлгіні символ бойынша салыстырып тексеру', 'Hash-ті басқа B-мен қайта есептеп, тең болса да бас тарту', 'Терезені өткізіп жіберу'], answer: 1, explain: 'Hash теңдігі жолдардың тең екенін тек ықтимал етеді: collision болуы мүмкін. Тікелей салыстыру (немесе екі тәуелсіз hash) дұрыстықты қамтамасыз етеді.' }
        ]
      },
      {
        id: 'alg-12', title: 'Trie: префикс ағашы және автотолықтыру', minutes: 16,
        body: `
<p>Kaspi-стильді дүкен қосымшасының іздеу жолағына «сүт» деп тергенде «сүт», «сүтті шоколад», «сүзбе» емес, «сүт...»-тен басталатын тауарлар ұсынылуы керек. Сөздер тізімін әр жолы толық аралау O(N·L). Бұған арнайы құрылым бар: <b>trie</b> (префикс ағашы).</p>
<h3>Құрылымы</h3>
<p>Trie-дің әр түйіні бір символды білдіреді, түбірден түйінге дейінгі жол: бір префикс. Әр түйінде балалары (символ → түйін сөздігі) және «осы жерде сөз аяқтала ма» деген белгі бар. Ортақ префиксі бар сөздер ортақ түйіндерді бөліседі.</p>
<pre><code>class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True

    def _walk(self, s):
        node = self.root
        for ch in s:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None</code></pre>
<p>Барлық амал O(L), мұндағы L: сөз немесе префикс ұзындығы. Сөздер саны N-ге тәуелді емес.</p>
<h3>Автотолықтыру</h3>
<p>Префикс түйініне жеткен соң, одан төмен DFS жасап, <code>end</code> белгісі бар түйіндердің сөздерін жинаймыз. Балаларды <code>sorted(node.children)</code> ретімен аралағанда, сөздер алфавит бойынша шығады, сондықтан алғашқы k сөзден кейін тоқтай аламыз.</p>
<h3>Санауыштар</h3>
<p>«Осы префикспен неше сөз басталады?» сұрағын жиі қоямыз. Әр түйінге <code>count</code> өрісін қосамыз: <code>insert</code> кезінде жолдағы әр түйіннің <code>count</code>-ын 1-ге арттырамыз. Сонда жауап префикс түйінінің <code>count</code>-ы, O(L).</p>
<h3>Trie, set және сұрыпталған тізім</h3>
<table>
<tr><th>Сұрақ</th><th>set</th><th>Сұрыпталған тізім + bisect</th><th>Trie</th></tr>
<tr><td>Сөз бар ма</td><td>O(L) орташа</td><td>O(L log N)</td><td>O(L)</td></tr>
<tr><td>Префикспен басталатындар</td><td>O(N·L)</td><td>O(L log N + k)</td><td>O(L + k)</td></tr>
<tr><td>Жад</td><td>аз</td><td>аз</td><td>көп (әр түйін dict)</td></tr>
</table>
<p>Python-да шағын тапсырмалар үшін сұрыпталған тізім мен <code>bisect</code> жиі жеткілікті. Trie префикс сұраулары өте көп болғанда, сөздер ағыны үздіксіз келгенде немесе әр префикске қосымша ақпарат (санауыш, ең танымал сөз) сақтау керек болғанда ұтады.</p>
<h3>Жиі қателер</h3>
<ul>
<li><code>search</code>-те <code>end</code> белгісін тексермеу: «сүт» сөзі болса, «сү» де табылып кетеді.</li>
<li>Бос жолды ескермеу: <code>starts_with("")</code> әрқашан <code>True</code>.</li>
<li>Бір сөзді екі рет қосқанда санауышты қайта арттыру (егер есеп қайталанбайтын сөздерді санаса).</li>
</ul>
<div class="tip"><b>Кеңес:</b> түйінді бөлек класс емес, жай сөздік ретінде де жазуға болады: <code>node = node.setdefault(ch, {})</code>, ал сөз соңын <code>"$"</code> кілтімен белгілейміз. Код қысқарады, бірақ символдар ішінде <code>"$"</code> болмауы керек.</div>`,
        exercises: [
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>Trie</code> класын жазыңыз: <code>insert(word)</code>, <code>search(word)</code> (дәл сөз бар ма), <code>starts_with(prefix)</code> (осы префикспен басталатын сөз бар ма). Барлық амал O(L) болуы керек: тест 20 000 сөз және 20 000 сұраумен уақытты өлшейді.`,
            starter: P`class Trie:
    def __init__(self):
        self.words = []

    def insert(self, word):
        self.words.append(word)

    def search(self, word):
        return False

    def starts_with(self, prefix):
        return False
`,
            solution: P`class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True

    def _walk(self, s):
        node = self.root
        for ch in s:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None
`,
            hints: ['Түйін: <code>children</code> сөздігі және <code>end</code> белгісі. <code>insert</code>: <code>node = node.children.setdefault(ch, TrieNode())</code>.', '<code>search</code> мен <code>starts_with</code> бір көмекші <code>_walk</code> әдісін қолдана алады; айырмасы тек <code>end</code> тексерісінде.'],
            check: { tests: P`
_t = Trie()
for _w in ["сүт", "сүтті", "сүзбе", "нан"]:
    _t.insert(_w)
assert _t.search("сүт") and _t.search("сүзбе"), "Қосылған сөздер табылуы керек"
assert not _t.search("сү"), "сү: префикс, бірақ сөз емес"
assert _t.starts_with("сү") and _t.starts_with("сүтт"), "Префикстер табылуы керек"
assert not _t.starts_with("шай") and not _t.search("сүттер"), "Жоқ сөз бен префикс: False"
assert _t.starts_with(""), "Бос префикс әрқашан True"
_e = Trie()
assert not _e.search("") and not _e.search("a"), "Бос trie-де сөз жоқ"
_e.insert("")
assert _e.search(""), "Бос сөз қосылғаннан кейін табылады"
import random as _random, time as _time
_R = _random.Random(20)
_words = ["".join(_R.choice("абвгдежзик") for _ in range(_R.randint(4, 10))) for _ in range(20000)]
_big = Trie()
_t0 = _time.perf_counter()
for _w in _words:
    _big.insert(_w)
_hits = sum(_big.starts_with(_w[:3]) for _w in _words)
_miss = sum(_big.search(_w + "я") for _w in _words)
_dt = _time.perf_counter() - _t0
assert _hits == 20000 and _miss == 0, "Үлкен trie-де нәтиже қате"
assert _dt < 1.5, "Тым баяу: сөздерді тізімде емес, trie түйіндерінде сақтаңыз"
` } },
          { type: 'python', level: 'hard', xp: 30, prompt: P`<code>Autocomplete(words)</code> класы: конструктор сөздерді trie-ге салады. <code>suggest(prefix, limit=3)</code> осы префикспен басталатын сөздердің алфавит бойынша алғашқы <code>limit</code> данасын қайтарады. Қайталанған сөз бір рет қана ұсынылады.
<pre><code>ac = Autocomplete(["сүт", "сүзбе", "сүтті шоколад", "сода", "сүт"])
ac.suggest("сү")     → ["сүзбе", "сүт", "сүтті шоколад"]
ac.suggest("с", 2)   → ["сода", "сүзбе"]
ac.suggest("шай")    → []</code></pre>`,
            starter: P`class Autocomplete:
    def __init__(self, words):
        self.words = words

    def suggest(self, prefix, limit=3):
        return []
`,
            solution: P`class Autocomplete:
    def __init__(self, words):
        self.root = {}
        for w in words:
            node = self.root
            for ch in w:
                node = node.setdefault(ch, {})
            node["$"] = True

    def suggest(self, prefix, limit=3):
        node = self.root
        for ch in prefix:
            if ch not in node:
                return []
            node = node[ch]
        out = []
        def dfs(n, path):
            if len(out) >= limit:
                return
            if "$" in n:
                out.append(prefix + path)
            for ch in sorted(k for k in n if k != "$"):
                dfs(n[ch], path + ch)
        dfs(node, "")
        return out[:limit]
`,
            hints: ['Префикс түйініне дейін жүріңіз; жоқ символ кездессе, <code>[]</code>.', 'DFS: алдымен ағымдағы түйінде сөз аяқтала ма тексеріңіз, сосын балаларды <code>sorted</code> ретімен аралаңыз; <code>limit</code>-ке жеткенде тоқтаңыз.'],
            check: { tests: P`
_ac = Autocomplete(["сүт", "сүзбе", "сүтті шоколад", "сода", "сүт"])
assert _ac.suggest("сү") == ["сүзбе", "сүт", "сүтті шоколад"], "сү: алфавит бойынша үш сөз"
assert _ac.suggest("с", 2) == ["сода", "сүзбе"], "limit = 2"
assert _ac.suggest("шай") == [], "Жоқ префикс: []"
assert _ac.suggest("сүт") == ["сүт", "сүтті шоколад"], "Префикстің өзі сөз болса, ол бірінші"
assert _ac.suggest("", 10) == ["сода", "сүзбе", "сүт", "сүтті шоколад"], "Бос префикс: барлық сөз, қайталанусыз"
assert Autocomplete([]).suggest("а") == [], "Бос сөздік: []"
import random as _random, time as _time
_R = _random.Random(22)
_ws = ["".join(_R.choice("абвгд") for _ in range(_R.randint(3, 9))) for _ in range(20000)]
_t0 = _time.perf_counter()
_big = Autocomplete(_ws)
_res = [_big.suggest(_w[:4], 3) for _w in _ws[:3000]]
_dt = _time.perf_counter() - _t0
assert _res[0] == sorted(set(w for w in _ws if w.startswith(_ws[0][:4])))[:3], "Үлкен сөздікте ұсыныс қате"
assert _dt < 2.0, "Тым баяу: limit-ке жеткенде DFS-ті тоқтатыңыз"
` } },
          { type: 'python', level: 'medium', xp: 25, prompt: P`<code>PrefixCounter</code> класы: <code>add(word)</code> сөзді қосады (қайталанса да, әр қосу саналады), <code>count(prefix)</code> осы префикспен басталатын қосылған сөздер санын O(len(prefix))-те қайтарады. Әр trie түйінінде санауыш ұстаңыз. Тест 20 000 сұрау жасайды: әр жолы тізімді аралау өтпейді.
<pre><code>pc = PrefixCounter()
for w in ["алма", "алмұрт", "анар", "алма"]: pc.add(w)
pc.count("ал")  → 3
pc.count("")    → 4</code></pre>`,
            starter: P`class PrefixCounter:
    def __init__(self):
        self.words = []

    def add(self, word):
        self.words.append(word)

    def count(self, prefix):
        return 0
`,
            solution: P`class PrefixCounter:
    def __init__(self):
        self.root = {"#": 0}

    def add(self, word):
        node = self.root
        node["#"] += 1
        for ch in word:
            if ch not in node:
                node[ch] = {"#": 0}
            node = node[ch]
            node["#"] += 1

    def count(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node:
                return 0
            node = node[ch]
        return node["#"]
`,
            hints: ['Әр түйін: сөздік, ішінде санауыш (мысалы, <code>"#"</code> кілті) және балалар.', '<code>add</code> кезінде түбір мен жолдағы әр түйіннің санауышын 1-ге арттырыңыз.'],
            check: { tests: P`
_pc = PrefixCounter()
for _w in ["алма", "алмұрт", "анар", "алма"]:
    _pc.add(_w)
assert _pc.count("ал") == 3, "ал: алма, алмұрт, алма = 3"
assert _pc.count("алма") == 2, "алма екі рет қосылды"
assert _pc.count("") == 4, "Бос префикс: барлық сөз"
assert _pc.count("б") == 0 and _pc.count("алмаз") == 0, "Жоқ префикс: 0"
assert PrefixCounter().count("а") == 0, "Бос санауыш: 0"
import random as _random, time as _time
_R = _random.Random(23)
_ws = ["".join(_R.choice("абвгдеж") for _ in range(_R.randint(3, 8))) for _ in range(20000)]
_big = PrefixCounter()
_t0 = _time.perf_counter()
for _w in _ws:
    _big.add(_w)
_c = [_big.count(_w[:2]) for _w in _ws]
_dt = _time.perf_counter() - _t0
assert _c[0] == sum(1 for w in _ws if w.startswith(_ws[0][:2])), "Үлкен кірісте санау қате"
assert _dt < 1.0, "20 000 сұрау тым баяу: санауышты trie түйінінде сақтаңыз"
` } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Trie-де N сөз бар, ең ұзыны L символ. Ұзындығы m префикспен басталатын сөз бар-жоғын тексеру (<code>starts_with</code>) қанша уақыт алады?', options: ['O(N)', 'O(m)', 'O(N · m)', 'O(log N)'], answer: 1, explain: 'Түбірден префикстің әр символы бойынша бір түйінге түсеміз: m қадам. Сөздер санына тәуелді емес.' }
        ]
      },
      {
        id: 'alg-gate', gate: true, title: 'Модуль емтиханы: Advanced Algorithms', minutes: 45,
        body: `
<p>Емтихан бүкіл модульді қамтиды: sliding window, union-find мен MST, Dijkstra, KMP және алгоритм таңдау. Өту үшін ұпайдың кемінде <b>75%</b>-ын жинау керек.</p>
<ul>
<li>Функция атаулары мен қайтарылатын мән түрі дәл берілгендей болуы керек.</li>
<li>Әр тапсырмада тесттер шеткі жағдайларды да (бос кіріс, жету мүмкін емес төбе, бір элемент) және жылдамдықты да тексереді.</li>
<li>Алдымен brute force-ты ойлаңыз, сосын қай құрылым оны жылдамдататынын таңдаңыз. Кеңестер берілмейді.</li>
</ul>`,
        exercises: [
          { type: 'python', level: 'hard', xp: 35, prompt: P`Облыста <code>n</code> ауыл (<code>0..n-1</code>). Кейбір жолдар бұрыннан бар (<code>existing</code>, <code>(u, v)</code> жұптары, тегін). <code>options</code>: салуға болатын жолдар <code>(u, v, баға)</code>. <code>min_extra_cost(n, existing, options)</code>: барлық ауылды бір желіге қосу үшін қосымша ең аз шығынды қайтарыңыз; мүмкін болмаса <code>None</code>.
<pre><code>min_extra_cost(4, [(0, 1)], [(1, 2, 5), (2, 3, 1), (0, 3, 2), (0, 2, 9)]) → 3
min_extra_cost(3, [(0, 1), (1, 2)], [])                                   → 0
min_extra_cost(3, [], [(0, 1, 4)])                                        → None</code></pre>`,
            starter: P`def min_extra_cost(n, existing, options):
    return 0
`,
            solution: P`def min_extra_cost(n, existing, options):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    comps = n
    for u, v in existing:
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            comps -= 1
    total = 0
    for u, v, c in sorted(options, key=lambda e: e[2]):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            comps -= 1
            total += c
    return total if comps <= 1 else None
`,
            hints: [],
            check: { tests: P`
assert min_extra_cost(4, [(0, 1)], [(1, 2, 5), (2, 3, 1), (0, 3, 2), (0, 2, 9)]) == 3, "2-3 (1) және 0-3 (2): 3"
assert min_extra_cost(3, [(0, 1), (1, 2)], []) == 0, "Бәрі бұрыннан қосылған: 0"
assert min_extra_cost(3, [], [(0, 1, 4)]) is None, "2-ауылды қосу мүмкін емес: None"
assert min_extra_cost(1, [], []) == 0, "Бір ауыл: 0"
assert min_extra_cost(3, [(0, 1)], [(0, 1, 1), (1, 2, 6)]) == 6, "Бұрыннан бар жолды қайта салу керек емес"
import random as _random, time as _time
_R = _random.Random(30)
_n = 5000
_ex = [(_R.randrange(_n), _R.randrange(_n)) for _ in range(3000)]
_op = [(_i, _i + 1, 100) for _i in range(_n - 1)] + [(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 99)) for _ in range(30000)]
_t0 = _time.perf_counter(); _r = min_extra_cost(_n, _ex, _op); _dt = _time.perf_counter() - _t0
assert _r is not None and _r < 100 * (_n - 1), "Үлкен кірісте нәтиже қате"
assert _dt < 1.5, "Тым баяу: DSU + Kruskal"
` } },
          { type: 'python', level: 'medium', xp: 30, prompt: P`Студент кафеде күн сайын түскі ас алады, <code>prices</code>: күндік шығын (оң сандар). <code>longest_within_budget(prices, budget)</code>: қосындысы <code>budget</code>-тен аспайтын қатар тұрған күндердің ең ұзын санын қайтарыңыз. O(n).
<pre><code>longest_within_budget([1200, 900, 1500, 800, 700, 2500], 3000) → 3
longest_within_budget([5000], 3000)                            → 0</code></pre>`,
            starter: P`def longest_within_budget(prices, budget):
    return len(prices)
`,
            solution: P`def longest_within_budget(prices, budget):
    l = s = best = 0
    for r, x in enumerate(prices):
        s += x
        while s > budget:
            s -= prices[l]
            l += 1
        best = max(best, r - l + 1)
    return best
`,
            hints: [],
            check: { tests: P`
assert longest_within_budget([1200, 900, 1500, 800, 700, 2500], 3000) == 3, "1500 + 800 + 700 = 3000: 3 күн"
assert longest_within_budget([5000], 3000) == 0, "Бір күн де сыймайды: 0"
assert longest_within_budget([], 100) == 0, "Бос тізім: 0"
assert longest_within_budget([1, 1, 1], 3) == 3, "Бүкіл тізім сыяды"
assert longest_within_budget([4, 1, 1, 4, 1, 1, 1], 3) == 3, "Соңғы үш күн: 3"
import random as _random, time as _time
_R = _random.Random(31)
for _ in range(80):
    _p = [_R.randint(1, 9) for _ in range(_R.randint(0, 10))]
    _b = _R.randint(0, 20)
    _ref = max([j - i for i in range(len(_p) + 1) for j in range(i, len(_p) + 1) if sum(_p[i:j]) <= _b] + [0])
    assert longest_within_budget(_p, _b) == _ref, "brute force-пен сәйкес емес: " + str((_p, _b))
_big = [_R.randint(500, 3000) for _ in range(100000)]
_t0 = _time.perf_counter(); longest_within_budget(_big, 200000); _dt = _time.perf_counter() - _t0
assert _dt < 1.0, "Тым баяу: sliding window O(n)"
` } },
          { type: 'python', level: 'hard', xp: 35, prompt: P`Курьерлік қызмет: <code>graph</code>: бағытталған салмақты граф (төбе → <code>[(көрші, минут), ...]</code>). <code>delivery_total(graph, src, targets)</code>: <code>src</code>-тан әр мақсатқа дейінгі ең қысқа уақыттардың қосындысы (әр мақсатқа бөлек барамыз). Кемінде бір мақсатқа жету мүмкін болмаса, <code>None</code>. Мақсаттар тізімі бос болса, 0.
<pre><code>g = {"Қойма": [("Абай", 10), ("Сатпаев", 25)], "Абай": [("Сатпаев", 5), ("Төле би", 20)]}
delivery_total(g, "Қойма", ["Сатпаев", "Төле би"]) → 45    # 15 + 30</code></pre>`,
            starter: P`import heapq

def delivery_total(graph, src, targets):
    return 0
`,
            solution: P`import heapq

def delivery_total(graph, src, targets):
    dist = {src: 0}
    h = [(0, src)]
    while h:
        d, u = heapq.heappop(h)
        if d > dist[u]:
            continue
        for v, w in graph.get(u, []):
            nd = d + w
            if v not in dist or nd < dist[v]:
                dist[v] = nd
                heapq.heappush(h, (nd, v))
    total = 0
    for t in targets:
        if t not in dist:
            return None
        total += dist[t]
    return total
`,
            hints: [],
            check: { tests: P`
_g = {"Қойма": [("Абай", 10), ("Сатпаев", 25)], "Абай": [("Сатпаев", 5), ("Төле би", 20)]}
assert delivery_total(_g, "Қойма", ["Сатпаев", "Төле би"]) == 45, "15 + 30 = 45"
assert delivery_total(_g, "Қойма", []) == 0, "Мақсат жоқ: 0"
assert delivery_total(_g, "Қойма", ["Қойма"]) == 0, "Қоймаға жеткізу: 0"
assert delivery_total(_g, "Абай", ["Қойма"]) is None, "Кері жол жоқ: None"
assert delivery_total(_g, "Қойма", ["Сатпаев", "Сатпаев"]) == 30, "Бір мақсат екі рет: 15 + 15"
import random as _random, time as _time
_R = _random.Random(32)
_n = 8000
_G = {_i: [(_i + 1, _R.randint(1, 9)), (_R.randrange(_n), _R.randint(5, 50))] for _i in range(_n - 1)}
_t0 = _time.perf_counter(); _r = delivery_total(_G, 0, list(range(0, _n, 50))); _dt = _time.perf_counter() - _t0
assert _r is not None and _r > 0, "Үлкен графта нәтиже қате"
assert _dt < 1.5, "Тым баяу: Dijkstra-ны бір рет іске қосып, барлық мақсатқа қолданыңыз"
` } },
          { type: 'python', level: 'hard', xp: 35, prompt: P`<code>count_pattern(text, pattern)</code>: <code>pattern</code> мәтінде неше рет кездесетінін (қабаттасқандарын да) санаңыз. Бос үлгі болса, 0. KMP арқылы O(n + m). Ескерту: <code>str.count</code> қабаттасқан кездесулерді санамайды.
<pre><code>count_pattern("ананананас", "анан") → 3
count_pattern("aaaa", "aa")         → 3
count_pattern("abc", "")            → 0</code></pre>`,
            starter: P`def count_pattern(text, pattern):
    return text.count(pattern) if pattern else 0
`,
            solution: P`def count_pattern(text, pattern):
    m = len(pattern)
    if m == 0:
        return 0
    pi = [0] * m
    for i in range(1, m):
        k = pi[i - 1]
        while k > 0 and pattern[i] != pattern[k]:
            k = pi[k - 1]
        if pattern[i] == pattern[k]:
            k += 1
        pi[i] = k
    cnt = k = 0
    for ch in text:
        while k > 0 and ch != pattern[k]:
            k = pi[k - 1]
        if ch == pattern[k]:
            k += 1
        if k == m:
            cnt += 1
            k = pi[k - 1]
    return cnt
`,
            hints: [],
            check: { tests: P`
assert count_pattern("ананананас", "анан") == 3, "ананананас ішінде анан: 3 (қабаттасып)"
assert count_pattern("aaaa", "aa") == 3, "aaaa ішінде aa: 3"
assert count_pattern("abc", "") == 0, "Бос үлгі: 0"
assert count_pattern("", "a") == 0, "Бос мәтін: 0"
assert count_pattern("abcabc", "abc") == 2, "Қабаттаспайтын: 2"
assert count_pattern("ab", "abc") == 0, "Үлгі ұзын: 0"
import time as _time
_t0 = _time.perf_counter(); _r = count_pattern("ab" * 50000, "abab"); _r2 = count_pattern("a" * 100000, "a" * 400 + "b"); _dt = _time.perf_counter() - _t0
assert _r == 49999 and _r2 == 0, "Ұзын мәтінде санау қате"
assert _dt < 1.5, "Тым баяу: KMP O(n + m)"
` } },
          { type: 'quiz', level: 'medium', xp: 30, prompt: 'Такси қосымшасында қала картасы: 50 000 қиылыс, 120 000 көше, әр көшенің жүру уақыты (оң сан) белгілі. Жолаушыға ең жылдам маршрутты табу керек. Қай алгоритм дұрыс әрі жеткілікті жылдам?', options: ['BFS', 'Dijkstra + heap', 'Bellman-Ford', 'Kruskal'], answer: 1, explain: 'Салмақтар әртүрлі және теріс емес: Dijkstra, O((V + E) log V). BFS салмақты ескермейді, Bellman-Ford O(V·E) ≈ 6·10⁹ тым баяу, Kruskal ең қысқа жолды емес, MST-ні табады.' }
        ]
      }
    ]
  };
})();
