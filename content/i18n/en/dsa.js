// DSA-1 Data Structures & Algorithms: English text. Code, solutions and expected output are in content/dsa.js.
DJ.i18n.patch({
  modules: {
    'dsa-1': { intro: 'Algorithms and data structures: Big-O, arrays and two pointers, hash maps, stacks/queues, linked lists, recursion, binary search, sorting, trees, heaps, graphs and dynamic programming. After each topic you implement it yourself in Python, and at the end you solve a problem set at Easy / Medium / Hard levels.' }
  },
  lessons: {
    'dsa-1': {
      title: 'Big-O: measuring the cost of an algorithm',
      body: `
<p>The same task can be solved by two different programs: both give the right answer, but one runs in half a second on 1,000 orders and takes hours on 1,000,000 orders. <b>Big-O</b> is a notation that describes how the amount of work grows as the input size <code>n</code> grows. What matters is not the exact seconds but the <b>shape of the growth</b>.</p>
<h3>Counting operations</h3>
<p>A Kaspi-style shop has <code>n</code> orders. The question: does the same <code>order_id</code> appear twice?</p>
<pre><code># Version 1: compare every pair
def has_dup_slow(ids):
    for i in range(len(ids)):
        for j in range(i + 1, len(ids)):
            if ids[i] == ids[j]:
                return True
    return False

# Version 2: collect what we have seen in a set
def has_dup_fast(ids):
    seen = set()
    for x in ids:
        if x in seen:
            return True
        seen.add(x)
    return False</code></pre>
<p>In the first version the inner loop runs <code>(n−1) + (n−2) + … + 1 = n(n−1)/2</code> times — that is <b>O(n²)</b>. In the second we look at each element once, and a set lookup takes constant time on average — <b>O(n)</b>. With n = 100,000 the first does about 5 billion comparisons, the second 100 thousand.</p>
<h3>Main growth classes</h3>
<table>
<tr><th>Big-O</th><th>Example</th><th>Roughly at n = 10⁶</th></tr>
<tr><td>O(1)</td><td>getting a value from a dict by key</td><td>1</td></tr>
<tr><td>O(log n)</td><td>binary search</td><td>20</td></tr>
<tr><td>O(n)</td><td>one pass over a list</td><td>10⁶</td></tr>
<tr><td>O(n log n)</td><td>a good sort (merge sort, <code>sorted</code>)</td><td>2·10⁷</td></tr>
<tr><td>O(n²)</td><td>two nested loops</td><td>10¹²</td></tr>
<tr><td>O(2ⁿ)</td><td>checking all subsets</td><td>impossible</td></tr>
</table>
<p>Rules: constant factors and lower-order terms are dropped (<code>3n + 5</code> → O(n), <code>n² + n</code> → O(n²)). Loops one after another add up, nested loops multiply. We look at memory the same way: the <code>seen</code> set takes O(n) extra memory — we "bought" time with memory.</p>
<div class="tip"><b>A practical guide:</b> Python does about 10⁷ simple operations per second (even slower in the browser). With n = 10⁵, O(n²) ≈ 10¹⁰ — a failure, O(n log n) ≈ 2·10⁶ — instant.</div>`,
      ex: [
        { prompt: `What is the time complexity of this code?<pre><code>total = 0
for i in range(n):
    for j in range(n):
        total += a[i] * a[j]</code></pre>`, explain: 'The outer loop runs n times, and on each iteration the inner loop runs n more times: n · n = n².' },
        { prompt: `With n = 100, how many times does the line <code>count += 1</code> run?<pre><code>count = 0
for i in range(n):
    for j in range(i + 1, n):
        count += 1</code></pre>`, explain: 'Each pair (i, j) with i &lt; j is counted once: n(n−1)/2 = 100 · 99 / 2 = 4950.' },
        { prompt: 'What is the complexity of this loop?<pre><code>steps = 0\nwhile n &gt; 1:\n    n //= 2\n    steps += 1</code></pre>', explain: 'At each step n is halved, so the number of steps is ≈ log₂ n.' },
        { prompt: `Write a function <code>has_duplicate(ids)</code>: it returns <code>True</code> if at least one value appears twice in the list, otherwise <code>False</code>. The test also checks a list of 100,000 elements, so an O(n²) pairwise comparison will not pass — use a <code>set</code>.
<pre><code>has_duplicate([101, 205, 101])  → True
has_duplicate([7, 8, 9])        → False
has_duplicate([])               → False</code></pre>`, hints: ['Create an empty <code>seen = set()</code> and check each element with <code>x in seen</code>.', 'Add a new element with <code>seen.add(x)</code>; if there is no repeat by the end, return <code>False</code>.'], check: { tests: `
assert has_duplicate([101, 205, 101]) is True, 'has_duplicate([101, 205, 101]) should be True'
assert has_duplicate([7, 8, 9]) is False, 'has_duplicate([7, 8, 9]) should be False'
assert has_duplicate([]) is False, 'Return False for an empty list'
assert has_duplicate([5]) is False, 'A one-element list has no duplicates'
import time as _time
_big = list(range(5000))
_t0 = _time.perf_counter(); _r = has_duplicate(_big); _dt = _time.perf_counter() - _t0
assert _r is False, 'The list 0..4999 has no duplicates'
assert _dt < 0.15, f'n=5000 took {_dt:.2f} s — that is O(n²). Write an O(n) solution with a set'
_big = list(range(100000)) + [99999]
assert has_duplicate(_big) is True, 'A 100,000-element list with a duplicate at the end should give True'
` } }
      ]
    },
    'dsa-2': {
      title: 'Arrays, lists and two pointers',
      body: `
<p>A Python <code>list</code> is a dynamic array: the elements sit next to each other in memory. That is why access by index <code>a[i]</code> is O(1) and appending to the end with <code>append</code> is O(1) on average. But inserting at the front with <code>a.insert(0, x)</code> or <code>a.pop(0)</code> is O(n): all the other elements shift by one position.</p>
<table>
<tr><th>Operation</th><th>Complexity</th></tr>
<tr><td><code>a[i]</code>, <code>a[i] = x</code>, <code>len(a)</code></td><td>O(1)</td></tr>
<tr><td><code>a.append(x)</code>, <code>a.pop()</code></td><td>O(1) on average</td></tr>
<tr><td><code>a.insert(0, x)</code>, <code>a.pop(0)</code>, <code>x in a</code></td><td>O(n)</td></tr>
<tr><td><code>a[l:r]</code> (slice)</td><td>O(r − l) — makes a copy</td></tr>
</table>
<h3>Two pointers</h3>
<p>In many problems we keep two indexes and move them towards each other. Example: a list of prices is <b>sorted</b>, and the buyer's budget is 10,000 ₸. Are there two items whose sum is exactly the budget?</p>
<pre><code>def pair_with_sum(prices, budget):
    i, j = 0, len(prices) - 1
    while i &lt; j:
        s = prices[i] + prices[j]
        if s == budget:
            return (i, j)
        if s &lt; budget:
            i += 1      # sum too small — swap the cheap item for a pricier one
        else:
            j -= 1      # sum too big — swap the pricey item for a cheaper one
    return None</code></pre>
<p>Why is this correct? If <code>prices[i] + prices[j] &lt; budget</code>, then <code>prices[i]</code> with any <code>j' ≤ j</code> also gives less, so we can drop <code>i</code>. Each step moves one pointer — O(n) in total, while checking all pairs would be O(n²).</p>
<p>Another pattern is <b>read/write pointers</b>: removing duplicates from a sorted list in place. <code>w</code> is the next position to write, <code>r</code> is the position being read. When a new value appears, <code>a[w] = a[r]</code>, <code>w += 1</code>.</p>
<div class="tip"><b>Common mistakes:</b> (1) Using <code>a.pop(0)</code> inside a loop — accidentally O(n²). (2) Deleting elements from a list while iterating over it — indexes shift and elements get skipped. (3) Forgetting that two pointers only work on a sorted list.</div>`,
      ex: [
        { prompt: 'If we take all elements out of a 100,000-element list one by one from the front with <code>a.pop(0)</code>, what is the total complexity?', explain: 'Each pop(0) shifts the remaining elements: n + (n−1) + … ≈ n²/2. In this situation you need collections.deque.' },
        { prompt: `The function <code>reverse_in_place(a)</code> should reverse the list <b>in place</b>: swap elements using two pointers (front and back). Do not create a new list and do not return anything.
<pre><code>a = [1, 2, 3, 4]
reverse_in_place(a)   # a == [4, 3, 2, 1]</code></pre>`, hints: ['Inside a <code>while i &lt; j:</code> loop — <code>a[i], a[j] = a[j], a[i]</code>.', 'Then <code>i += 1</code>, <code>j -= 1</code>.'], starter: 'def reverse_in_place(a):\n    i, j = 0, len(a) - 1\n    # while i < j, swap a[i] and a[j]\n', check: { tests: `
_a = [1, 2, 3, 4]; _id = id(_a)
_r = reverse_in_place(_a)
assert _a == [4, 3, 2, 1], f'[1, 2, 3, 4] → should become [4, 3, 2, 1], you have {_a}'
assert id(_a) == _id and _r is None, 'Change the list in place and return nothing'
_b = [5, 6, 7]; reverse_in_place(_b)
assert _b == [7, 6, 5], 'An odd-length list should also be reversed correctly'
_c = []; reverse_in_place(_c)
assert _c == [], 'An empty list should stay empty'
` } },
        { prompt: `The prices are sorted in <b>ascending order</b>. <code>pair_with_sum(prices, budget)</code> should return the indexes <code>(i, j)</code>, <code>i &lt; j</code>, of two items whose sum is exactly <code>budget</code>; if there is no such pair — <code>None</code>. Write it in O(n) with two pointers: the test checks 100,000 prices.
<pre><code>pair_with_sum([1500, 2500, 4000, 6000, 9000], 10000) → (2, 3)
pair_with_sum([1000, 2000], 5000)                     → None</code></pre>`, hints: ['Start with <code>i = 0</code>, <code>j = len(prices) - 1</code>.', 'If the sum is too small — <code>i += 1</code>, if too big — <code>j -= 1</code>.'], check: { tests: `
_r = pair_with_sum([1500, 2500, 4000, 6000, 9000], 10000)
assert _r is not None and tuple(_r) == (2, 3), f'Expected (2, 3), you have {_r}'
assert pair_with_sum([1000, 2000], 5000) is None, 'Return None when there is no pair'
assert pair_with_sum([], 10) is None, 'None for an empty list'
assert pair_with_sum([5000], 10000) is None, 'An item cannot be paired with itself'
_r = pair_with_sum([1, 3, 3, 9], 6)
assert _r is not None and tuple(_r) == (1, 2), 'Two different items with the same price can also be a pair'
import time as _time
_p = list(range(0, 10000, 2))
_t0 = _time.perf_counter(); _r = pair_with_sum(_p, 1); _dt = _time.perf_counter() - _t0
assert _r is None, 'A sum of even numbers cannot be odd — None expected'
assert _dt < 0.15, f'n=5000 took {_dt:.2f} s — that is O(n²). Write O(n) with two pointers'
_p = list(range(100000))
_r = pair_with_sum(_p, 199997)
assert _r is not None and _p[_r[0]] + _p[_r[1]] == 199997 and _r[0] < _r[1], 'The correct pair was not found for n = 100,000'
` } },
        { prompt: `Remove duplicates from a sorted list <b>in place</b> (read/write pointers). <code>dedup_sorted(a)</code> should return the number of unique values <code>k</code>, and <code>a[:k]</code> should be those unique values (the rest of the list does not matter).
<pre><code>a = [1, 1, 2, 3, 3, 3]
k = dedup_sorted(a)   # k == 3, a[:3] == [1, 2, 3]</code></pre>`, hints: ['<code>for r in range(1, len(a)):</code> — compare <code>a[r]</code> with the last written <code>a[w - 1]</code>.', 'If it differs — <code>a[w] = a[r]</code>, <code>w += 1</code>.'], starter: `def dedup_sorted(a):
    if not a:
        return 0
    w = 1
    # r from 1 to the end: if a[r] differs from the last written value, write it to a[w]
    return w
`, check: { tests: `
_a = [1, 1, 2, 3, 3, 3]; _id = id(_a)
_k = dedup_sorted(_a)
assert _k == 3, f'For [1, 1, 2, 3, 3, 3] k = 3, you have {_k}'
assert _a[:3] == [1, 2, 3] and id(_a) == _id, f'a[:3] should be [1, 2, 3] (in place), you have {_a[:3]}'
assert dedup_sorted([]) == 0, '0 for an empty list'
_b = [4, 4, 4]
assert dedup_sorted(_b) == 1 and _b[0] == 4, 'k = 1 for [4, 4, 4]'
_c = [1, 2, 3]
assert dedup_sorted(_c) == 3 and _c == [1, 2, 3], 'A list without duplicates should not change'
` } }
      ]
    },
    'dsa-3': {
      title: 'Strings',
      body: `
<p>In Python, <code>str</code> is an <b>immutable</b> sequence of characters. <code>s[i]</code> is O(1), <code>len(s)</code> is O(1), but you cannot write <code>s[i] = 'а'</code>: any "change" creates a new string. This has an important consequence:</p>
<pre><code># Slow: each += creates a new string and copies the old one → can be O(n²)
out = ''
for ch in text:
    out += ch.upper()

# Right: collect the pieces in a list and join once at the end → O(n)
parts = []
for ch in text:
    parts.append(ch.upper())
out = ''.join(parts)</code></pre>
<h3>Common methods</h3>
<ul>
<li><code>s.lower()</code>, <code>s.upper()</code> — also work with Kazakh letters: <code>'ҚАЗАҚ'.lower() == 'қазақ'</code>.</li>
<li><code>ch.isalnum()</code>, <code>ch.isalpha()</code>, <code>ch.isdigit()</code> — check the kind of character.</li>
<li><code>s.split()</code>, <code>' '.join(words)</code>, <code>s.strip()</code>, <code>s[::-1]</code> (a reversed copy).</li>
</ul>
<h3>Example: palindrome</h3>
<p>The word «Қазақ» (Kazakh) reads the same from both ends — it is a palindrome. To check while ignoring punctuation and spaces, we use two pointers: from the left and from the right we skip characters that are not letters or digits, then lowercase and compare.</p>
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
<p>This is O(n) time and O(1) extra memory. The short version <code>t = ''.join(c.lower() for c in s if c.isalnum()); t == t[::-1]</code> is also O(n) but uses O(n) memory — in many cases that is fine too.</p>
<h3>Anagram</h3>
<p>If two words are made of the same letters, they are anagrams: «аспан» (sky) and «панас». There are two ways to check: <code>sorted(a) == sorted(b)</code> (O(n log n)) or counting letter frequencies <code>Counter(a) == Counter(b)</code> (O(n)). Counting frequencies is the first use of the hash map from the next lesson.</p>
<div class="tip"><b>Common mistakes:</b> (1) Growing a string with <code>+=</code> inside a loop. (2) Ignoring case: <code>'А' != 'а'</code>. (3) Forgetting the difference between <code>s.split(' ')</code> and <code>s.split()</code>: the latter treats consecutive spaces as one.</div>`,
      ex: [
        { prompt: 'Why is <code>\'\'.join(parts)</code> better than <code>out += ch</code> inside a loop when building a long string?', options: ['join only works with English letters', 'str is immutable, so += may create and copy a new string at every step; join concatenates once in O(n)', '+= raises a syntax error', 'There is no difference, it is just style'], explain: 'Strings are immutable: each += may copy the previous content into a new string, which adds up to O(n²). Collecting into a list and joining once is O(n).' },
        { prompt: `Write <code>is_palindrome(s)</code>: is the string a palindrome if you ignore everything except letters and digits (spaces, commas, exclamation marks) and ignore case?
<pre><code>is_palindrome('Қазақ')          → True
is_palindrome('Алма, алма!')      → False
is_palindrome('А роза упала на лапу Азора') → True
is_palindrome('')                → True</code></pre>`, hints: ['Two pointers: <code>i = 0</code>, <code>j = len(s) - 1</code>; skip characters that are not <code>isalnum()</code>.', 'Use <code>.lower()</code> before comparing.'], check: { tests: `
assert is_palindrome('Қазақ') is True, "'Қазақ' is a palindrome"
assert is_palindrome('Алма, алма!') is False, "'Алма, алма!' → 'алмаалма' is not a palindrome"
assert is_palindrome('А роза упала на лапу Азора') is True, 'Ignore spaces and case'
assert is_palindrome('') is True, 'An empty string counts as a palindrome'
assert is_palindrome('.,!') is True, 'A string of only punctuation is a palindrome'
assert is_palindrome('12321') is True and is_palindrome('123') is False, 'Digits count too'
` } },
        { prompt: `<code>is_anagram(a, b)</code>: <code>True</code> if the two words are made of the same letters (in the same quantities). Ignore case.
<pre><code>is_anagram('аспан', 'панас')  → True
is_anagram('Арман', 'намра')  → True
is_anagram('ала', 'алла')     → False</code></pre>`, hints: ['<code>from collections import Counter</code> — counts letter frequencies.', 'Or <code>sorted(a.lower()) == sorted(b.lower())</code>.'], check: { tests: `
assert is_anagram('аспан', 'панас') is True, "'аспан' and 'панас' are anagrams"
assert is_anagram('Арман', 'намра') is True, 'Ignore case'
assert is_anagram('ала', 'алла') is False, 'The letter counts must match too'
assert is_anagram('', '') is True, 'Two empty strings are anagrams'
assert is_anagram('abc', 'abd') is False, "'abc' and 'abd' are not anagrams"
` } },
        { prompt: `Run-length encoding: compress consecutive identical characters into "character + count"; if the count is 1, no number is written. <code>compress(s)</code> should collect the string in a list and return it with <code>''.join</code> at the end.
<pre><code>compress('ааабвв')  → 'а3бв2'
compress('xyz')     → 'xyz'
compress('')        → ''</code></pre>`, hints: ['<code>i</code> is the start of a group; move <code>j</code> while <code>s[j] == s[i]</code>.', 'The group length is <code>j - i</code>; add the number only if it is greater than 1, then <code>i = j</code>.'], starter: 'def compress(s):\n    parts = []\n    # count consecutive identical characters\n    return \'\'.join(parts)\n', check: { tests: `
assert compress('ааабвв') == 'а3бв2', f"'ааабвв' → 'а3бв2', you have {compress('ааабвв')!r}"
assert compress('xyz') == 'xyz', "A string without repeats does not change"
assert compress('zzzzzzzzzzzz') == 'z12', 'A two-digit count must also be written correctly'
assert compress('aabaa') == 'a2ba2', 'Identical characters are merged only when they are adjacent'
assert compress('q') == 'q', 'A one-character string does not change'
` } }
      ]
    },
    'dsa-4': {
      title: 'Hash maps and sets: frequencies and pairs',
      body: `
<p><code>dict</code> and <code>set</code> are <b>hash tables</b>. A hash function computes a number from the key, and that number takes the key straight to its slot in the table. That is why lookup, insertion and deletion are <b>O(1) on average</b>. In a list, <code>x in a</code> is O(n); in a set, <code>x in s</code> is O(1). A key must be hashable (immutable): <code>str</code>, <code>int</code>, <code>tuple</code> — yes, <code>list</code> — no.</p>
<h3>Pattern 1: counting frequencies</h3>
<pre><code>orders = ['Алматы', 'Астана', 'Алматы', 'Шымкент', 'Алматы']
freq = {}
for city in orders:
    freq[city] = freq.get(city, 0) + 1
# {'Алматы': 3, 'Астана': 1, 'Шымкент': 1}

from collections import Counter
Counter(orders).most_common(1)   # [('Алматы', 3)]</code></pre>
<h3>Pattern 2: "what have I seen before?" (two-sum)</h3>
<p>Find the indexes of two numbers in an unsorted list whose sum is <code>target</code>. For each <code>x</code> we need <code>target − x</code>. Whether we have met it before, we ask the dict in O(1):</p>
<pre><code>def two_sum(nums, target):
    pos = {}                       # value → index
    for i, x in enumerate(nums):
        need = target - x
        if need in pos:
            return (pos[need], i)
        pos[x] = i
    return None

two_sum([3000, 7000, 1500, 5500], 7000)   # (2, 3)</code></pre>
<p>Why is <code>pos[x] = i</code> <b>after</b> the check? Otherwise, when <code>x + x = target</code>, we would pair an element with itself. This is O(n) time and O(n) memory; two loops would be O(n²).</p>
<h3>Pattern 3: grouping</h3>
<p>We take a "signature" as the key and collect everything that belongs to it in a list: for example, when grouping anagrams, the key is <code>''.join(sorted(word))</code>. <code>collections.defaultdict(list)</code> creates the empty list for you.</p>
<div class="tip"><b>Common mistakes:</b> (1) <code>freq[k] += 1</code> — KeyError if the key is not there yet; use <code>get(k, 0)</code> or <code>Counter</code>. (2) Using a list as a key — TypeError: make it <code>tuple(lst)</code>. (3) Forgetting that a set is unordered: if you need "the first one seen", work with a list or an index.</div>`,
      ex: [
        { prompt: `<code>two_sum(nums, target)</code> should return the indexes <code>(i, j)</code>, <code>i &lt; j</code>, of two elements whose sum is <code>target</code> (assume there is only one answer); if there are none — <code>None</code>. The test checks 100,000 elements — use a dict.
<pre><code>two_sum([3000, 7000, 1500, 5500], 7000) → (2, 3)
two_sum([4, 4], 8)                     → (0, 1)
two_sum([1, 2], 10)                    → None</code></pre>`, hints: ['<code>pos = {}</code> — a value seen before → its index.', 'First check <code>target - x in pos</code>, and only then <code>pos[x] = i</code>.'], check: { tests: `
_r = two_sum([3000, 7000, 1500, 5500], 7000)
assert _r is not None and tuple(_r) == (2, 3), f'Expected (2, 3), you have {_r}'
_r = two_sum([4, 4], 8)
assert _r is not None and tuple(_r) == (0, 1), 'Two equal numbers: (0, 1)'
assert two_sum([1, 2], 10) is None, 'None when there is no answer'
assert two_sum([5], 10) is None, 'Do not pair an element with itself'
import time as _time
_n = list(range(1, 5001))
_t0 = _time.perf_counter(); _r = two_sum(_n, 20000); _dt = _time.perf_counter() - _t0
assert _r is None and _dt < 0.15, f'n=5000 took {_dt:.2f} s — looks like O(n²). Write O(n) with a dict'
_n = list(range(0, 300000, 3)) + [1]
_r = two_sum(_n, 299998)
assert _r is not None and tuple(_r) == (99999, 100000), 'The correct pair was not found for n = 100,000'
` } },
        { prompt: `<code>first_unique(s)</code> should return the index of the <b>first</b> character that appears only once in the string; if there is no such character — <code>-1</code>.
<pre><code>first_unique('алматы')  → 1   # 'л'
first_unique('аабб')    → -1</code></pre>`, hints: ['First count the frequency of every character (<code>Counter(s)</code>).', 'Then go through the string again from the start and return the first index with frequency 1.'], check: { tests: `
assert first_unique('алматы') == 1, f"For 'алматы' — 1 ('л'), you have {first_unique('алматы')}"
assert first_unique('аабб') == -1, '-1 if there is no unique character'
assert first_unique('') == -1, '-1 for an empty string'
assert first_unique('z') == 0, '0 for a one-character string'
assert first_unique('ababc') == 4, "4 for 'ababc'"
` } },
        { prompt: 'Which key <b>cannot</b> be put into a Python <code>dict</code>?', explain: 'A list is mutable, so it is not hashable (TypeError: unhashable type). tuple, str, int — are fine.' },
        { prompt: `Group anagrams. <code>group_anagrams(words)</code> should return a list of groups: each group holds words that are anagrams of each other, in their input order; the groups are ordered by where their first word appears in the input.
<pre><code>group_anagrams(['аспан', 'тал', 'панас', 'лат', 'нан'])
→ [['аспан', 'панас'], ['тал', 'лат'], ['нан']]</code></pre>`, hints: ['<code>key = \'\'.join(sorted(w))</code> — the same for anagrams.', '<code>groups.setdefault(key, []).append(w)</code>; a dict keeps insertion order.'], starter: `def group_anagrams(words):
    groups = {}
    # key: the word's letters as a sorted string
    return list(groups.values())
`, check: { tests: `
_r = group_anagrams(['аспан', 'тал', 'панас', 'лат', 'нан'])
assert _r == [['аспан', 'панас'], ['тал', 'лат'], ['нан']], f'Expected [[аспан, панас], [тал, лат], [нан]], you have {_r}'
assert group_anagrams(['a', 'a']) == [['a', 'a']], 'Identical words go in one group'
assert group_anagrams(['ab', 'ba', 'c']) == [['ab', 'ba'], ['c']], "['ab', 'ba', 'c'] → [['ab', 'ba'], ['c']]"
` } }
      ]
    },
    'dsa-5': {
      title: 'Stack and queue (deque)',
      body: `
<p>A <b>stack</b> is "last in, first out" (LIFO): like a pile of plates, you only add to the top and take from the top. In Python a stack is an ordinary <code>list</code>: <code>append(x)</code> pushes, <code>pop()</code> pops, <code>st[-1]</code> shows the top — all O(1).</p>
<p>A <b>queue</b> is "first in, first out" (FIFO): like the line at a public service centre. <code>list.pop(0)</code> is O(n), so we use <code>collections.deque</code>: <code>append(x)</code> adds to the back, <code>popleft()</code> takes from the front — both O(1).</p>
<pre><code>from collections import deque
q = deque()
q.append('Айгүл'); q.append('Ерлан'); q.append('Дана')
q.popleft()      # 'Айгүл' — first to arrive is served first
len(q)           # 2</code></pre>
<h3>Example: balanced brackets</h3>
<p>Are the brackets <code>( [ { } ] )</code> in a formula closed correctly? We push an opening bracket onto the stack. When a closing bracket arrives, its partner must be on top of the stack. At the end the stack must be empty.</p>
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
is_valid('([)]')     # False — ( was opened, but ] came</code></pre>
<h3>Example: a sliding window queue</h3>
<p>A call centre wants to know the number of calls in the last 3 seconds (3000 ms). The call times arrive in increasing order. We add each new call to the queue and remove the stale ones (earlier than <code>t − 3000</code>) from the front with <code>popleft</code>. Each call enters the queue once and leaves once — O(n) in total.</p>
<div class="tip"><b>Where you meet them:</b> stack — function calls (call stack), the browser's "Back" button, undo, evaluating expressions, DFS. Queue — task queues (Celery, Kafka), BFS, rate limiting. <b>Common mistake:</b> <code>pop()</code> from an empty stack — IndexError; check <code>if st</code> first.</div>`,
      ex: [
        { prompt: 'You need to model the line at a service centre: people join at the back and are served from the front. Which structure does both operations in O(1)?', options: ['list: append + pop(0)', 'collections.deque: append + popleft', 'set: add + pop', 'str: + and [1:]'], explain: 'deque gives O(1) adding/removing at both ends. list.pop(0) is O(n), and a set is unordered.' },
        { prompt: `<code>is_valid(s)</code>: <code>True</code> if the brackets <code>()</code>, <code>[]</code>, <code>{}</code> in the string open and close correctly. Ignore other characters. Use a stack.
<pre><code>is_valid('{[()]}')      → True
is_valid('([)]')        → False
is_valid('f(x[0]) + 1') → True
is_valid('((')          → False</code></pre>`, hints: ['Push an opening bracket with <code>st.append(ch)</code>; on a closing one, check whether the stack is empty and whether its partner is on top.', 'At the end <code>return not st</code> — no bracket should be left open.'], check: { tests: `
assert is_valid('{[()]}') is True, "'{[()]}' is valid"
assert is_valid('([)]') is False, "'([)]' is invalid: the closing order is broken"
assert is_valid('f(x[0]) + 1') is True, 'Ignore other characters'
assert is_valid('((') is False, 'False if a bracket is left open'
assert is_valid(')') is False, 'A closing bracket with an empty stack — False (not IndexError)'
assert is_valid('') is True, 'An empty string is valid'
` } },
        { prompt: `Reverse Polish notation (RPN): <code>['2', '3', '+', '4', '*']</code> = (2 + 3) × 4 = 20. Push numbers onto a stack; when an operator comes, pop two numbers and push the result back. <code>eval_rpn(tokens)</code> should return an integer. Division truncates toward zero: <code>int(a / b)</code>.
<pre><code>eval_rpn(['2', '3', '+', '4', '*'])       → 20
eval_rpn(['10', '3', '-'])                → 7
eval_rpn(['7', '-2', '/'])                → -3</code></pre>`, hints: ['On an operator, first <code>b = st.pop()</code>, then <code>a = st.pop()</code> — the order matters (<code>a - b</code>).', 'Push a number with <code>int(t)</code>; \'-2\' is a negative number, not an operator.'], check: { tests: `
assert eval_rpn(['2', '3', '+', '4', '*']) == 20, 'Expected 20'
assert eval_rpn(['10', '3', '-']) == 7, "['10', '3', '-'] → 7 (10 − 3, not the other way round)"
assert eval_rpn(['7', '-2', '/']) == -3, '7 / −2 = −3.5 → toward zero −3'
assert eval_rpn(['42']) == 42, 'A single number is itself'
assert eval_rpn(['4', '13', '5', '/', '+']) == 6, '4 + 13 / 5 = 4 + 2 = 6'
` } },
        { prompt: `Write a <code>CallCounter</code> class for the call centre. <code>ping(t)</code> — a call came in at <code>t</code> milliseconds (times arrive in increasing order); the method returns the number of calls in the interval <code>[t − 3000, t]</code> (including this one). Use a <code>deque</code>: the test sends 100,000 calls.
<pre><code>c = CallCounter()
c.ping(1)     → 1
c.ping(100)   → 2
c.ping(3001)  → 3
c.ping(3002)  → 3   # the call at 1 ms has left the window</code></pre>`, hints: ['Add the new time with <code>self.q.append(t)</code>.', '<code>while self.q[0] &lt; t - 3000: self.q.popleft()</code>, then <code>len(self.q)</code>.'], check: { tests: `
_c = CallCounter()
_r = [_c.ping(1), _c.ping(100), _c.ping(3001), _c.ping(3002)]
assert _r == [1, 2, 3, 3], f'Expected [1, 2, 3, 3], you have {_r}'
_c = CallCounter()
assert _c.ping(5000) == 1 and _c.ping(9000) == 1, 'A call that has left the window is not counted'
_c = CallCounter()
assert _c.ping(10) == 1 and _c.ping(10) == 2, 'Two calls at the same moment both count'
import time as _time
_c = CallCounter(); _t0 = _time.perf_counter()
for _t in range(0, 5000000, 1000):
    _c.ping(_t)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'5000 calls took {_dt:.2f} s — ping should not scan the whole history. Remove old ones from the deque with popleft()'
_c = CallCounter()
_t0 = _time.perf_counter()
for _t in range(0, 100000):
    _last = _c.ping(_t)
_dt = _time.perf_counter() - _t0
assert _last == 3001, f'After 100,000 calls the window should hold 3001, you have {_last}'
assert _dt < 3, f'{_dt:.2f} s — too slow. Remove old times with deque.popleft()'
` } }
      ]
    },
    'dsa-6': {
      title: 'Linked lists',
      body: `
<p>A <b>linked list</b> is a chain where each node stores a value and a reference to the next node. The difference from an array: the elements are not next to each other in memory, so to reach the <code>k</code>-th element you have to walk <code>k</code> steps from the start — O(n). In return, inserting at the front, inserting after a known node or deleting is O(1): we only change references.</p>
<pre><code>class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# 1 → 2 → 3
head = Node(1, Node(2, Node(3)))
cur = head
while cur:               # traversal: O(n)
    print(cur.val)
    cur = cur.next</code></pre>
<table>
<tr><th>Operation</th><th>list (array)</th><th>linked list</th></tr>
<tr><td>k-th element</td><td>O(1)</td><td>O(k)</td></tr>
<tr><td>Insert at front</td><td>O(n)</td><td>O(1)</td></tr>
<tr><td>Insert at end</td><td>O(1)</td><td>O(1), if we keep a <code>tail</code></td></tr>
</table>
<h3>Example: reversing a list</h3>
<p>A classic problem is to point the references the other way. We keep three variables: <code>prev</code> (the head of the reversed part), <code>cur</code> (the current node), <code>nxt</code> (so we do not lose the next one).</p>
<pre><code>def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next     # 1) save the next node
        cur.next = prev    # 2) turn the reference around
        prev = cur         # 3) move prev forward
        cur = nxt          # 4) move cur forward
    return prev            # the new head</code></pre>
<h3>Pointers at two speeds</h3>
<p>Does the list have a cycle (does the last node point to an earlier node)? Floyd's method: <code>slow</code> takes one step, <code>fast</code> takes two. If there is a cycle, they are sure to meet; if not, <code>fast</code> reaches <code>None</code>. Extra memory — O(1). The same trick finds the middle of a list: when <code>fast</code> reaches the end, <code>slow</code> is in the middle.</p>
<div class="tip"><b>In real life:</b> in Python you rarely write a linked list yourself — <code>deque</code> is a similar structure inside. But it comes up often in interviews, and it is the basis of structures like an LRU cache and browser history. <b>Common mistake:</b> not saving <code>cur.next</code> before <code>cur.next = prev</code> — the rest of the list is lost.</div>`,
      ex: [
        { prompt: 'What is the complexity of getting the 500,000th element of a linked list with 1,000,000 nodes?', explain: 'There is no index: you have to walk k steps along the references from the start, i.e. O(k) = O(n).' },
        { prompt: `Complete the <code>LinkedList</code> class. Keep <code>head</code> and <code>tail</code>, so every method is O(1) (except <code>to_list</code>):
<ul><li><code>push_front(x)</code> — add at the front;</li><li><code>push_back(x)</code> — add at the end;</li><li><code>pop_front()</code> — remove the first value and return it (<code>None</code> if empty);</li><li><code>__len__()</code> and <code>to_list()</code>.</li></ul>
<pre><code>ll = LinkedList()
ll.push_back(2); ll.push_back(3); ll.push_front(1)
ll.to_list()     → [1, 2, 3]
ll.pop_front()   → 1
len(ll)          → 2</code></pre>`, hints: ['When the first element is added to an empty list, both <code>head</code> and <code>tail</code> become that node.', 'Do not forget to set <code>tail = None</code> if the list becomes empty after <code>pop_front</code>.'], check: { tests: `
_l = LinkedList()
_l.push_back(2); _l.push_back(3); _l.push_front(1)
assert _l.to_list() == [1, 2, 3], f'Expected [1, 2, 3], you have {_l.to_list()}'
assert len(_l) == 3, 'len should be 3'
assert _l.pop_front() == 1 and _l.to_list() == [2, 3] and len(_l) == 2, 'pop_front should return 1 and leave [2, 3]'
assert _l.pop_front() == 2 and _l.pop_front() == 3, 'pop_front in turn: 2, 3'
assert _l.pop_front() is None and len(_l) == 0, 'pop_front on an empty list returns None'
_l.push_back(9)
assert _l.to_list() == [9] and _l.head is _l.tail, 'push_back into an emptied list: head and tail are one node'
_l2 = LinkedList(); _l2.push_front(5); _l2.push_back(6)
assert _l2.to_list() == [5, 6], 'push_back should work correctly after push_front (tail must be set)'
import time as _time
_l3 = LinkedList(); _t0 = _time.perf_counter()
for _i in range(8000):
    _l3.push_back(_i)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'8000 push_back calls took {_dt:.2f} s — you are walking the list from the start. Use the tail reference to make it O(1)'
_l3 = LinkedList(); _t0 = _time.perf_counter()
for _i in range(50000):
    _l3.push_back(_i)
assert _time.perf_counter() - _t0 < 2 and len(_l3) == 50000, 'push_back should be O(1): use the tail reference'
` } },
        { prompt: `<code>reverse_list(head)</code> should reverse the list <b>in place</b> and return the new head (do not create new nodes). For an empty list (<code>None</code>) — <code>None</code>.
<pre><code>1 → 2 → 3 → None   ⇒   3 → 2 → 1 → None</code></pre>`, hints: ['Inside the loop: <code>nxt = cur.next</code>, <code>cur.next = prev</code>, <code>prev = cur</code>, <code>cur = nxt</code>.', 'At the end <code>prev</code> is the new head.'], starter: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    cur = head
    # turn the references around
    return head
`, check: { tests: `
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
assert _tl(_r) == [3, 2, 1], f'Expected [3, 2, 1], you have {_tl(_r)}'
assert _r is _nodes[2], 'Do not create new nodes: the former last node should become the new head'
assert reverse_list(None) is None, 'None for an empty list'
assert _tl(reverse_list(_mk([7]))) == [7], 'A one-node list does not change'
` } },
        { prompt: '<code>has_cycle(head)</code>: <code>True</code> if the list has a cycle. Use Floyd\'s method: <code>slow</code> one step, <code>fast</code> two steps; if they meet, there is a cycle. Extra memory should be O(1) (do not collect nodes in a set).', hints: ['<code>while fast and fast.next:</code> — if fast reaches the end, there is no cycle.', 'Compare with <code>slow is fast</code> (the same node), not by value.'], check: { tests: `
_a = Node(1, Node(2, Node(3, Node(4))))
assert has_cycle(_a) is False, 'The list 1→2→3→4 has no cycle'
_last = _a.next.next.next; _last.next = _a.next
assert has_cycle(_a) is True, 'The reference 4 → 2 makes a cycle'
assert has_cycle(None) is False, 'An empty list has no cycle'
_s = Node(1); _s.next = _s
assert has_cycle(_s) is True, 'A node pointing to itself is a cycle'
_d = Node(5, Node(5, Node(5)))
assert has_cycle(_d) is False, 'The values are equal but there is no cycle: compare nodes with is'
` } }
      ]
    },
    'dsa-7': {
      title: 'Recursion and backtracking',
      body: `
<p><b>Recursion</b> is a function calling itself. Every recursive function has two parts: a <b>base case</b> (a small problem that is not split further and whose answer is known) and a <b>recursive step</b> (reducing the problem to a smaller problem of the same kind).</p>
<pre><code>def digit_sum(n):
    if n &lt; 10:                       # base case
        return n
    return n % 10 + digit_sum(n // 10)  # last digit + sum of the rest

digit_sum(2026)   # 6 + digit_sum(202) = 6 + 2 + digit_sum(20) = … = 10</code></pre>
<p>Each call adds a new "layer" to the <b>call stack</b>. If there is no base case or we never reach it, the stack overflows — <code>RecursionError</code>. In Python the depth limit is about 1000, so instead of recursion 10⁵ levels deep we write a loop.</p>
<h3>Backtracking: building every option</h3>
<p>Backtracking builds a solution step by step: at each step make a choice, go deeper, then <b>undo</b> the choice. Example: list every set of purchases from 3 items in Kaspi Red {phone, headphones, case}. For each item there are two choices: take / do not take → 2³ = 8 subsets.</p>
<pre><code>def subsets(items):
    res, cur = [], []
    def go(i):
        if i == len(items):          # decided on every item
            res.append(cur[:])       # save a copy!
            return
        cur.append(items[i])         # choice: take it
        go(i + 1)
        cur.pop()                    # undo the choice
        go(i + 1)                    # choice: skip it
    go(0)
    return res</code></pre>
<p>There are 2ⁿ subsets, so this is O(n · 2ⁿ) — it only works up to about n = 20. The power of backtracking is <b>pruning</b>: stop before entering a branch that cannot work. For example, when generating brackets, we never place more closing brackets than opened ones.</p>
<div class="tip"><b>Common mistakes:</b> (1) <code>res.append(cur)</code> — not a copy but a reference to one list; at the end they all come out empty. Write <code>cur[:]</code>. (2) Not undoing the choice (<code>cur.pop()</code>). (3) Forgetting the base case.</div>`,
      ex: [
        { prompt: 'What happens if we call this function as <code>f(5)</code>?<pre><code>def f(n):\n    return n * f(n - 1)</code></pre>', options: ['Returns 120', 'Returns 0', 'RecursionError: no base case', 'Returns None'], explain: 'There is no stopping condition: f(5) → f(4) → … → f(−1000) … the stack overflows and RecursionError is raised. You need if n &lt;= 1: return 1.' },
        { prompt: `<code>digit_sum(n)</code> should compute the sum of the digits of a non-negative integer using <b>recursion</b> (no loops and no <code>str</code>).
<pre><code>digit_sum(2026) → 10
digit_sum(7)    → 7
digit_sum(0)    → 0</code></pre>`, hints: ['Base case: if <code>n &lt; 10</code>, it is <code>n</code> itself.', 'Recursive step: <code>n % 10 + digit_sum(n // 10)</code>.'], check: { tests: `
assert digit_sum(2026) == 10, f'digit_sum(2026) = 10, you have {digit_sum(2026)}'
assert digit_sum(7) == 7 and digit_sum(0) == 0, 'A one-digit number is itself'
assert digit_sum(99999) == 45, 'digit_sum(99999) = 45'
assert 'digit_sum' in digit_sum.__code__.co_names, 'The function should call itself (recursion)'
` } },
        { prompt: `<code>subsets(items)</code> should return all subsets of the list using backtracking (each subset is a list, elements in their original order). The order of the subsets themselves does not matter.
<pre><code>subsets(['телефон', 'қап'])
→ [['телефон', 'қап'], ['телефон'], ['қап'], []]   # in any order</code></pre>`, hints: ['Base case <code>i == len(items)</code>: <code>res.append(cur[:])</code>.', 'First <code>cur.append(items[i]); go(i + 1); cur.pop()</code>, then without it <code>go(i + 1)</code>.'], check: { tests: `
_r = subsets(['телефон', 'қап'])
assert sorted(map(tuple, _r)) == sorted([('телефон', 'қап'), ('телефон',), ('қап',), ()]), f'Four subsets expected, you have {_r}'
assert subsets([]) == [[]], 'The only subset of an empty list is []'
_r = subsets([1, 2, 3, 4])
assert len(_r) == 16 and len(set(map(tuple, _r))) == 16, f'4 elements give 16 different subsets, you have {len(_r)}. Save a copy cur[:]'
assert all(list(s) == sorted(s) for s in _r), 'Elements should keep their original order'
` } },
        { prompt: `<code>gen_parens(n)</code> — return all valid sequences of <code>n</code> pairs of brackets as a <b>sorted</b> list. Pruning rule: you may place <code>(</code> if the number opened is <code>&lt; n</code>; you may place <code>)</code> if fewer have been closed than opened.
<pre><code>gen_parens(2) → ['(())', '()()']
gen_parens(3) → ['((()))', '(()())', '(())()', '()(())', '()()()']</code></pre>`, hints: ['Base case: <code>len(s) == 2 * n</code>.', 'Two branches: <code>if opened &lt; n</code> and <code>if closed &lt; opened</code>.'], check: { tests: `
assert gen_parens(2) == ['(())', '()()'], f'gen_parens(2) = [(()), ()()], you have {gen_parens(2)}'
assert gen_parens(3) == ['((()))', '(()())', '(())()', '()(())', '()()()'], 'gen_parens(3) gives five sequences'
assert gen_parens(1) == ['()'], "gen_parens(1) = ['()']"
assert len(gen_parens(8)) == 1430, 'For n = 8 there should be 1430 sequences (a Catalan number)'
` } }
      ]
    },
    'dsa-8': {
      title: 'Binary search: halving the search',
      body: `
<p>To find a value in a sorted list you do not have to look at every element (O(n)). <b>Binary search</b> looks at the middle element: if the target is bigger, it is in the right half; if smaller, in the left half. Each step halves the search area, so 1,000,000 elements need at most ~20 steps: O(log n).</p>
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
<h3>Finding a boundary (lower bound)</h3>
<p>More often the question is not "is it there?" but "where is the first element not less than <code>x</code>?". For example, the first of the items sorted by price that costs 15,000 ₸ or more. It is convenient to write it with a half-open interval <code>[lo, hi)</code>:</p>
<pre><code>def lower_bound(a, x):
    lo, hi = 0, len(a)
    while lo &lt; hi:
        mid = (lo + hi) // 2
        if a[mid] &lt; x:
            lo = mid + 1
        else:
            hi = mid
    return lo        # len(a) if everything is less than x</code></pre>
<p>Python has a ready-made version: <code>bisect.bisect_left(a, x)</code> — exactly this, and <code>bisect_right</code> — the first position of an element greater than <code>x</code>.</p>
<h3>Binary search on the answer</h3>
<p>The most powerful use: instead of searching for the answer directly, we write a check function "does value <code>C</code> work?". If whenever <code>C</code> works all larger values work too (monotonicity), we find the smallest working <code>C</code> with binary search. Example: cargo from Almaty to Astana must be delivered <b>in the given order</b> within <code>D</code> days; what is the minimum daily capacity? Given a capacity <code>C</code>, we count the days needed greedily in O(n). The search interval: <code>[max(weights), sum(weights)]</code>. In total O(n log S).</p>
<div class="tip"><b>Common mistakes:</b> (1) Mixing up <code>lo &lt;= hi</code> and <code>lo &lt; hi</code>, <code>hi = mid</code> and <code>hi = mid − 1</code> — an infinite loop. Pick one template and stick to it. (2) Using binary search on an unsorted list.</div>`,
      ex: [
        { prompt: 'At most how many comparisons (looks at the middle element) does binary search make on 1,000,000 sorted elements? Enter a whole number.', explain: '2²⁰ = 1,048,576 ≥ 1,000,000, so ⌈log₂ 1,000,000⌉ = 20 steps are enough.' },
        { prompt: `<code>binary_search(a, x)</code>: return the index of <code>x</code> in the sorted <code>a</code>, or <code>-1</code> if it is not there. Write it yourself without <code>in</code>, <code>index</code> or <code>bisect</code>. The test runs thousands of queries on 100,000 elements.
<pre><code>binary_search([1200, 3400, 5600, 9900], 5600) → 2
binary_search([1200, 3400], 1000)             → -1</code></pre>`, hints: ['<code>while lo &lt;= hi:</code>, <code>mid = (lo + hi) // 2</code>.', 'If <code>a[mid] &lt; x</code>, then <code>lo = mid + 1</code>; if bigger, <code>hi = mid - 1</code>.'], check: { tests: `
assert binary_search([1200, 3400, 5600, 9900], 5600) == 2, 'Expected 2'
assert binary_search([1200, 3400], 1000) == -1, '-1 for a missing value'
assert binary_search([], 5) == -1, '-1 for an empty list'
assert binary_search([7], 7) == 0 and binary_search([7], 8) == -1, 'A one-element list'
assert binary_search([1, 3, 5, 7, 9], 1) == 0 and binary_search([1, 3, 5, 7, 9], 9) == 4, 'The end elements should be found too'
import time as _time, random as _random
_R = _random.Random(1)
_a = list(range(0, 200000, 2))
_qs = [_R.randrange(0, 200000) for _ in range(300)]
_t0 = _time.perf_counter()
for _q in _qs:
    binary_search(_a, _q)
_dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'300 queries took {_dt:.2f} s — looks like a linear search. Write an O(log n) binary search'
_qs = [_R.randrange(0, 200000) for _ in range(5000)]
_t0 = _time.perf_counter()
_res = [binary_search(_a, _q) for _q in _qs]
_dt = _time.perf_counter() - _t0
assert all((_r == _q // 2) if _q % 2 == 0 else _r == -1 for _r, _q in zip(_res, _qs)), 'Wrong answers on a large list'
assert _dt < 1.0, f'5000 queries took {_dt:.2f} s — looks like a linear search. Write an O(log n) binary search'
` } },
        { prompt: `<code>lower_bound(a, x)</code>: return the <b>smallest</b> <code>i</code> with <code>a[i] &gt;= x</code> in the sorted <code>a</code>; if there is none, <code>len(a)</code>. Values may repeat.
<pre><code>lower_bound([5000, 8000, 8000, 15000, 22000], 8000)  → 1
lower_bound([5000, 8000, 8000, 15000, 22000], 9000)  → 3
lower_bound([5000, 8000], 30000)                     → 2</code></pre>`, hints: ['Half-open interval: <code>while lo &lt; hi</code>.', 'If <code>a[mid] &lt; x</code>, then <code>lo = mid + 1</code>, otherwise <code>hi = mid</code>; return <code>lo</code> at the end.'], check: { tests: `
_a = [5000, 8000, 8000, 15000, 22000]
assert lower_bound(_a, 8000) == 1, f'For 8000 — 1 (the first 8000), you have {lower_bound(_a, 8000)}'
assert lower_bound(_a, 9000) == 3, 'For 9000 — 3'
assert lower_bound(_a, 1) == 0, '0 for x smaller than everything'
assert lower_bound([5000, 8000], 30000) == 2, 'len(a) for x larger than everything'
assert lower_bound([], 3) == 0, '0 for an empty list'
assert lower_bound([2, 2, 2, 2], 2) == 0, '0 if all values are equal'
import bisect as _bisect, random as _random
_R = _random.Random(2)
_b = sorted(_R.randrange(100) for _ in range(300))
assert all(lower_bound(_b, _x) == _bisect.bisect_left(_b, _x) for _x in range(-1, 102)), 'Does not match bisect_left on a random list'
` } },
        { prompt: `Cargo is shipped from Almaty to Astana <b>in the given order</b> (the order cannot change). In one day a truck takes consecutive items with a total weight of at most <code>C</code>. <code>min_capacity(weights, days)</code> is the smallest <code>C</code> that is enough to deliver everything within <code>days</code> days. Use binary search on the answer: the test checks 100,000 items.
<pre><code>min_capacity([3, 2, 2, 4, 1, 4], 3)            → 6   # [3,2] [2,4] [1,4]
min_capacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) → 15
min_capacity([10, 50], 5)                      → 50</code></pre>`, hints: ['<code>days_needed(cap)</code>: add the items in order and start a new day when the sum goes over <code>cap</code>.', 'Binary search over <code>[max(weights), sum(weights)]</code>: if <code>days_needed(mid) &lt;= days</code>, then <code>hi = mid</code>, otherwise <code>lo = mid + 1</code>.'], check: { tests: `
assert min_capacity([3, 2, 2, 4, 1, 4], 3) == 6, f'Expected 6, you have {min_capacity([3, 2, 2, 4, 1, 4], 3)}'
assert min_capacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) == 15, 'Expected 15'
assert min_capacity([10, 50], 5) == 50, 'Cannot be less than the heaviest item'
assert min_capacity([5, 5, 5], 1) == 15, 'Everything in one day: the sum'
import time as _time, random as _random
_R = _random.Random(3)
_w = [_R.randint(1, 1000) for _ in range(200)]
_t0 = _time.perf_counter(); _c = min_capacity(_w, 2); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'200 items took {_dt:.2f} s — use binary search instead of trying capacities one by one'
_w = [_R.randint(1, 10000) for _ in range(100000)]
_t0 = _time.perf_counter(); _c = min_capacity(_w, 700); _dt = _time.perf_counter() - _t0
def _need(cap):
    d, load = 1, 0
    for w in _w:
        if load + w > cap:
            d += 1; load = 0
        load += w
    return d
assert _need(_c) <= 700 and _need(_c - 1) > 700, 'For n = 100,000 the C found is not the smallest or does not work'
assert _dt < 5, f'{_dt:.2f} s — too slow. Use binary search instead of trying capacities one by one'
` } }
      ]
    },
    'dsa-9': {
      title: 'Sorting: insertion, merge, quick and key',
      body: `
<p>Sorting is the first step of many algorithms: in a sorted list it is easy to use binary search, two pointers or find duplicates. It is important to know the main ideas, while in practice you use Python's <code>sorted</code> / <code>list.sort</code> (Timsort, O(n log n), stable).</p>
<h3>Simple O(n²) methods</h3>
<p><b>Bubble sort</b> compares neighbours and "bubbles" the bigger one to the right. <b>Insertion sort</b> works like picking up cards: each new element is inserted into its place in the sorted part on the left. Both are O(n²) in the worst case, but insertion sort runs close to O(n) on an almost sorted list.</p>
<h3>Merge sort: divide and conquer</h3>
<pre><code>def merge_sort(a):
    if len(a) &lt;= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i &lt; len(left) and j &lt; len(right):   # merge two sorted lists
        if left[i] &lt;= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out.extend(left[i:]); out.extend(right[j:])
    return out</code></pre>
<p>The list is halved log n times, and merging at each level costs O(n) in total — <b>O(n log n)</b> overall, always. The <code>&lt;=</code> sign keeps equal elements in their original order — this is <b>stability</b>.</p>
<h3>Quicksort</h3>
<p>It picks a pivot element, splits the list into "smaller / equal / larger" and sorts the parts recursively. O(n log n) on average, but if the pivot is always the smallest/largest (for example, taking the first element of a sorted list) — O(n²). That is why the pivot is chosen at random.</p>
<h3>Sorting with key in Python</h3>
<pre><code>students = [('Айгерім', 92), ('Бауыржан', 85), ('Әлия', 92), ('Данияр', 78)]
# Score descending, and name ascending on ties
sorted(students, key=lambda r: (-r[1], r[0]))
# [('Айгерім', 92), ('Әлия', 92), ('Бауыржан', 85), ('Данияр', 78)]</code></pre>
<p>A tuple key is compared by its first element, and on a tie by the second. To take a numeric field in descending order, we put a minus in front of it. Note: the Unicode order of Kazakh letters does not fully match alphabetical order (the codes of <code>'Ә'</code> come after the basic Cyrillic letters), so a real project needs a special key.</p>
<div class="tip"><b>Remember:</b> any comparison-based sort makes at least ~n log n comparisons in the worst case. But if the values lie in a small range (for example, scores 0–100), <b>counting sort</b> sorts in O(n + k).</div>`,
      ex: [
        { prompt: 'Quicksort always takes the <b>first</b> element as the pivot. On which input is it slowest (O(n²))?', options: ['A randomly shuffled list', 'An already sorted list', 'A list where all elements are different', 'A list of even length'], explain: 'In a sorted list the first element is the smallest: one part is empty and the other keeps n−1 elements. The depth is n, O(n²) in total.' },
        { prompt: 'How many times does insertion sort swap neighbours when sorting [4, 3, 2, 1]? (This is the number of inversions in the list — pairs where i &lt; j but a[i] &gt; a[j].)', explain: 'Every pair is in reverse order: 4·3/2 = 6 inversions, and insertion sort fixes each with one swap.' },
        { prompt: `Olympiad results are given as tuples <code>(name, score)</code>. <code>rank(rows)</code> should return a new list sorted by score in <b>descending</b> order, and by name in <b>ascending</b> order on equal scores. Use <code>sorted</code> and <code>key</code>.
<pre><code>rank([('Бауыржан', 85), ('Ерлан', 92), ('Айгерім', 92)])
→ [('Айгерім', 92), ('Ерлан', 92), ('Бауыржан', 85)]</code></pre>`, hints: ['<code>key=lambda r: (...)</code> — a tuple key.', 'For scores in descending order use <code>-r[1]</code>, then <code>r[0]</code>.'], check: { tests: `
_r = rank([('Бауыржан', 85), ('Ерлан', 92), ('Айгерім', 92)])
assert _r == [('Айгерім', 92), ('Ерлан', 92), ('Бауыржан', 85)], f'Expected Айгерім, Ерлан, Бауыржан, you have {_r}'
assert rank([]) == [], '[] for an empty list'
_x = [('b', 1), ('a', 1), ('c', 3)]
assert rank(_x) == [('c', 3), ('a', 1), ('b', 1)] and _x == [('b', 1), ('a', 1), ('c', 3)], 'Return a new list, do not change the original'
` } },
        { prompt: `Write <code>merge_sort(a)</code>: it should return a <b>new</b> sorted list. You may not use <code>sorted</code> or <code>.sort</code>. The test checks 50,000 elements — an O(n²) method will not pass.
<pre><code>merge_sort([5, 2, 9, 1, 5]) → [1, 2, 5, 5, 9]</code></pre>`, hints: ['<code>left = merge_sort(a[:mid])</code>, <code>right = merge_sort(a[mid:])</code>.', 'Merging: two pointers <code>i</code>, <code>j</code>; add the smaller one to <code>out</code>, and <code>extend</code> with the leftovers at the end.'], starter: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    # sort both halves and merge them
    return a
`, check: { tests: `
assert merge_sort([5, 2, 9, 1, 5]) == [1, 2, 5, 5, 9], f'Expected [1, 2, 5, 5, 9], you have {merge_sort([5, 2, 9, 1, 5])}'
assert merge_sort([]) == [] and merge_sort([3]) == [3], 'Empty and one-element lists'
_names = merge_sort.__code__.co_names
assert 'sorted' not in _names and 'sort' not in _names, 'Do not use sorted / .sort — write the merge yourself'
import random as _random, time as _time
_R = _random.Random(4)
_a = [_R.randint(-1000, 1000) for _ in range(2000)]
assert merge_sort(_a) == sorted(_a), 'Wrong result on 2000 random elements'
_a = [_R.randint(0, 10**9) for _ in range(8000)]
_t0 = _time.perf_counter(); merge_sort(_a); _dt = _time.perf_counter() - _t0
assert _dt < 0.5, f'8000 elements took {_dt:.2f} s — looks like an O(n²) sort. Split in half and merge (O(n log n))'
_a = [_R.randint(0, 10**9) for _ in range(50000)]
_t0 = _time.perf_counter(); _s = merge_sort(_a); _dt = _time.perf_counter() - _t0
assert _s == sorted(_a), 'Wrong result on 50,000 elements'
assert _dt < 4, f'50,000 elements took {_dt:.2f} s — it should be O(n log n)'
` } }
      ]
    },
    'dsa-10': {
      title: 'Trees: binary trees and BST',
      body: `
<p>A <b>tree</b> is a hierarchy of nodes: one root, each node has children, and there are no cycles. A file system, an org chart, the HTML DOM — they are all trees. In a <b>binary tree</b> each node has at most two children: <code>left</code> and <code>right</code>.</p>
<pre><code>class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

#        8
#       / \\
#      3   10
#     / \\    \\
#    1   6    14
root = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))</code></pre>
<h3>Traversal</h3>
<ul>
<li><b>Preorder</b> (root, left, right): 8, 3, 1, 6, 10, 14 — for copying a tree.</li>
<li><b>Inorder</b> (left, root, right): 1, 3, 6, 8, 10, 14 — gives sorted order in a BST.</li>
<li><b>Postorder</b> (left, right, root): 1, 6, 3, 14, 10, 8 — deleting, computing folder sizes.</li>
<li><b>Level order</b> (level by level, BFS, with a <code>deque</code>): [8], [3, 10], [1, 6, 14].</li>
</ul>
<pre><code>def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))</code></pre>
<h3>Binary Search Tree (BST)</h3>
<p>The BST rule: the values in the left subtree of each node are smaller than it, and those in the right subtree are larger. Then searching works like binary search: start at the root, go left if smaller, right if larger. If the tree is balanced, its height is ≈ log n and search and insertion are O(log n). But if we insert sorted values in order, the tree turns into a "list" — height n, operations O(n). That is why production systems use self-balancing trees (red-black, AVL, B-tree — database indexes).</p>
<pre><code>def bst_insert(node, x):
    if node is None:
        return TreeNode(x)
    if x &lt; node.val:
        node.left = bst_insert(node.left, x)
    elif x &gt; node.val:
        node.right = bst_insert(node.right, x)
    return node            # an equal value is not added again</code></pre>
<div class="tip"><b>Common mistakes:</b> (1) Accessing <code>node.left</code> without checking for a <code>None</code> node — AttributeError. (2) Not saving the result of the recursive insert as <code>node.left = ...</code> — the new node never gets attached to the tree.</div>`,
      ex: [
        { prompt: 'What is the <b>postorder</b> traversal of the tree from the lesson (root 8)?', explain: 'Postorder: first the left subtree (1, 6, 3), then the right (14, 10), and the root 8 last.' },
        { prompt: `<code>height(node)</code> should return the height of the tree (the number of nodes from the root to the deepest leaf) using recursion. An empty tree (<code>None</code>) is 0.
<pre><code>height(TreeNode(1, TreeNode(2, TreeNode(3)))) → 3
height(None)                                  → 0</code></pre>`, hints: ['Base case: <code>node is None</code> → 0.', '<code>1 + max(height(node.left), height(node.right))</code>.'], check: { tests: `
assert height(None) == 0, 'The height of an empty tree is 0'
assert height(TreeNode(5)) == 1, 'A single node is 1'
assert height(TreeNode(1, TreeNode(2, TreeNode(3)))) == 3, '3 nodes stretched to the left — 3'
_t = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6, TreeNode(4))), TreeNode(10, None, TreeNode(14)))
assert height(_t) == 4, f'The lesson tree with a 4th level added: 4, you have {height(_t)}'
` } },
        { prompt: `Complete the <code>BST</code> class:
<ul><li><code>insert(x)</code> — add a value (an existing value is not added again);</li><li><code>contains(x)</code> — <code>True</code>/<code>False</code>, walking down from the root along <b>a single path</b>;</li><li><code>inorder()</code> — a sorted list of the values.</li></ul>
<pre><code>t = BST()
for x in [8, 3, 10, 1, 6, 14]: t.insert(x)
t.contains(6)   → True
t.contains(7)   → False
t.inorder()     → [1, 3, 6, 8, 10, 14]</code></pre>`, hints: ['<code>insert</code>: from the root go left if smaller and right if larger, and attach a new <code>TreeNode</code> at the empty spot.', '<code>inorder</code>: an inner function <code>go(node)</code> — left, node, right.'], check: { tests: `
_t = BST()
for _x in [8, 3, 10, 1, 6, 14]:
    _t.insert(_x)
assert _t.inorder() == [1, 3, 6, 8, 10, 14], f'inorder should be sorted, you have {_t.inorder()}'
assert _t.contains(6) is True and _t.contains(7) is False, 'contains(6) True, contains(7) False'
assert _t.root.val == 8 and _t.root.left.val == 3 and _t.root.right.right.val == 14, 'The BST structure is wrong: smaller values go left, larger go right'
_t.insert(6)
assert _t.inorder() == [1, 3, 6, 8, 10, 14], 'Do not add an existing value again'
assert BST().contains(1) is False and BST().inorder() == [], 'An empty tree'
import random as _random
_R = _random.Random(5); _vals = _R.sample(range(100000), 3000)
_b = BST()
for _x in _vals:
    _b.insert(_x)
assert _b.inorder() == sorted(_vals), 'inorder is wrong on 3000 random values'
_seen = set(_vals)
assert all(_b.contains(_q) == (_q in _seen) for _q in range(0, 100000, 37)), 'contains is wrong in a tree of 3000 values'
` } },
        { prompt: `<code>level_order(root)</code> should traverse the tree level by level and return a list of the values on each level (use a <code>deque</code>).
<pre><code>#      8
#     / \\
#    3   10
#   / \\    \\
#  1   6    14
level_order(root) → [[8], [3, 10], [1, 6, 14]]
level_order(None) → []</code></pre>`, hints: ['<code>q = deque([root])</code>; in each round <code>len(q)</code> is the number of nodes on one level.', 'Pop that level\'s nodes with <code>popleft</code> and add their children to the queue.'], check: { tests: `
_t = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))
assert level_order(_t) == [[8], [3, 10], [1, 6, 14]], f'Expected [[8], [3, 10], [1, 6, 14]], you have {level_order(_t)}'
assert level_order(None) == [], '[] for an empty tree'
assert level_order(TreeNode(1, None, TreeNode(2, TreeNode(3)))) == [[1], [2], [3]], 'A one-sided tree'
` } }
      ]
    },
    'dsa-11': {
      title: 'Heaps and priority queues: top-k',
      body: `
<p>A <b>heap</b> is a structure that always shows the smallest (or largest) element in O(1) and adds and removes in O(log n). It is a "complete" binary tree, but it is stored in an array: the children of node <code>i</code> are <code>2i+1</code> and <code>2i+2</code>. The rule: a parent is smaller than its children (min-heap).</p>
<p>In Python the <code>heapq</code> module manages an ordinary list as a min-heap:</p>
<pre><code>import heapq
h = []
heapq.heappush(h, 5000)
heapq.heappush(h, 1200)
heapq.heappush(h, 3400)
h[0]                 # 1200 — the smallest, O(1)
heapq.heappop(h)     # 1200, O(log n)
heapq.heapify(arr)   # turn a list into a heap in place, O(n)</code></pre>
<p>If you need a max-heap, push the values with a minus sign: <code>heappush(h, -x)</code>. You can push tuples too: <code>(priority, name)</code> — they are compared by the first element.</p>
<h3>Example: top-k</h3>
<p>We need the 10 best-selling of 1,000,000 Kaspi products. Sorting everything is O(n log n). Better: keep a <b>min-heap</b> of size <code>k</code>. The root of the heap is "the weakest of the best k". If a new number is bigger than it, we drop the weakest and push the new one. O(n log k) in total.</p>
<pre><code>def top_k(nums, k):
    h = []
    for x in nums:
        if len(h) &lt; k:
            heapq.heappush(h, x)
        elif x &gt; h[0]:
            heapq.heapreplace(h, x)   # pop + push in one step
    return sorted(h, reverse=True)</code></pre>
<p>Ready-made versions: <code>heapq.nlargest(k, nums)</code>, <code>heapq.nsmallest(k, nums)</code>. Heaps are also used in Dijkstra's algorithm, task schedulers and merging k sorted lists.</p>
<div class="tip"><b>Common mistakes:</b> (1) <code>heapq</code> is a min-heap only; for max use a minus sign. (2) A heap list is not fully sorted: <code>h[1]</code> is not necessarily the second smallest. (3) When pushing tuples, if the first fields are equal the second ones are compared — if they are objects that cannot be compared, you get an error; put a sequence number in between.</div>`,
      ex: [
        { prompt: 'What is the complexity of adding an element to a <code>heapq</code> min-heap (<code>heappush</code>) and removing the smallest (<code>heappop</code>)?', options: ['O(1) and O(1)', 'O(log n) and O(log n)', 'O(n) and O(1)', 'O(n log n) and O(n)'], explain: 'A new element rises up through the height of the tree (log n); on removal, the last element is put at the root and sinks down in log n steps.' },
        { prompt: `<code>top_k(nums, k)</code> — return the <code>k</code> largest numbers in <b>descending</b> order. Use a min-heap of size k (the test checks 100,000 numbers). If <code>k</code> is larger than the length, return all of them.
<pre><code>top_k([120, 450, 90, 450, 300], 2) → [450, 450]
top_k([5, 1], 5)                   → [5, 1]</code></pre>`, hints: ['If the heap has fewer than k items — <code>heappush</code>; otherwise, when <code>x &gt; h[0]</code>, <code>heapreplace</code>.', 'At the end <code>sorted(h, reverse=True)</code>.'], check: { tests: `
assert top_k([120, 450, 90, 450, 300], 2) == [450, 450], f'Expected [450, 450], you have {top_k([120, 450, 90, 450, 300], 2)}'
assert top_k([5, 1], 5) == [5, 1], 'If k is larger than the length — all of them, descending'
assert top_k([], 3) == [] and top_k([4, 2], 0) == [], 'Empty result cases'
import random as _random
_R = _random.Random(6)
_a = [_R.randint(0, 10**6) for _ in range(100000)]
assert top_k(_a, 10) == sorted(_a, reverse=True)[:10], 'Wrong top-10 on 100,000 numbers'
` } },
        { prompt: `Shops in three cities sent their sales as lists sorted by time. <code>merge_k(lists)</code> should merge them into one sorted list. Keep <code>(value, list_number, index)</code> in the heap: O(N log k).
<pre><code>merge_k([[1, 4, 9], [2, 3], [5]]) → [1, 2, 3, 4, 5, 9]
merge_k([[], [7]])                 → [7]</code></pre>`, hints: ['Push the first element of every non-empty list as <code>(lst[0], i, 0)</code>.', 'Pop the smallest with <code>heappop</code> and push the next element of the same list (<code>j + 1</code>).'], check: { tests: `
assert merge_k([[1, 4, 9], [2, 3], [5]]) == [1, 2, 3, 4, 5, 9], f'Expected [1, 2, 3, 4, 5, 9], you have {merge_k([[1, 4, 9], [2, 3], [5]])}'
assert merge_k([[], [7]]) == [7], 'Skip empty lists'
assert merge_k([]) == [] and merge_k([[], []]) == [], '[] if all are empty'
assert merge_k([[1, 1], [1]]) == [1, 1, 1], 'Equal values'
import random as _random
_R = _random.Random(7)
_ls = [sorted(_R.randint(0, 1000) for _ in range(_R.randint(0, 50))) for _ in range(200)]
assert merge_k(_ls) == sorted(x for l in _ls for x in l), 'Error when merging 200 lists'
` } }
      ]
    },
    'dsa-12': {
      title: 'Graphs: BFS, DFS, shortest path',
      body: `
<p>A <b>graph</b> is vertices and the edges that connect them. Cities and roads, friends in a social network, dependencies — they are all graphs. Most often we store it as an <b>adjacency list</b>: for each vertex, a list of its neighbours. Memory is O(V + E).</p>
<pre><code>roads = [('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')]
from collections import defaultdict
adj = defaultdict(list)
for a, b in roads:          # undirected graph: both directions
    adj[a].append(b)
    adj[b].append(a)</code></pre>
<h3>BFS — breadth-first search</h3>
<p>From the start vertex it spreads level by level using a queue (<code>deque</code>): first the vertices 1 step away, then 2 steps away… That is why in an <b>unweighted</b> graph BFS gives the shortest path (in number of steps). The complexity is O(V + E).</p>
<pre><code>from collections import deque
def bfs_dist(adj, start):
    dist = {start: 0}
    q = deque([start])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if v not in dist:           # visit each vertex once
                dist[v] = dist[u] + 1
                q.append(v)
    return dist</code></pre>
<h3>DFS — depth-first search</h3>
<p>It goes as deep as possible along one path and backs up when it hits a dead end (a stack or recursion). It is used for counting connected components, finding cycles and topological sorting. Do not forget to mark each vertex in <code>visited</code> — otherwise you will loop forever in a cycle.</p>
<h3>A grid is a graph too</h3>
<p>If a city map is given with the characters <code>'.'</code> (road) and <code>'#'</code> (building), each cell is a vertex and the neighbours up/down/left/right are edges. A courier getting from (0, 0) to the bottom-right corner in the fewest steps is a BFS problem. We go through the neighbours with <code>for dr, dc in ((1,0), (-1,0), (0,1), (0,-1))</code> and check that we stay inside the borders.</p>
<div class="tip">For a <b>weighted graph</b> (roads of different lengths) BFS does not work — you need <b>Dijkstra's</b> algorithm: like BFS, but instead of a deque it uses a heap that hands out the nearest vertex. You will write it in the "Hard" problem set.</div>`,
      ex: [
        { prompt: 'On a metro map (assume all stops are equally far apart) you need the route from station A to station B with the fewest stops. Which algorithm?', explain: 'In an unweighted graph BFS discovers vertices in order of distance, so it gives the shortest path. DFS does not guarantee the shortest one.' },
        { prompt: `<code>count_components(n, edges)</code>: you are given vertices <code>0..n−1</code> and undirected edges. Return the number of connected components (DFS or BFS). For example, villages and the roads between them: how many separate "islands" are there?
<pre><code>count_components(5, [(0, 1), (1, 2), (3, 4)]) → 2
count_components(3, [])                       → 3</code></pre>`, hints: ['<code>seen = [False] * n</code>; every unvisited vertex starts a new component.', 'DFS with a stack (or deque): mark neighbours in <code>seen</code> and push them onto the stack. Beware of deep recursion.'], check: { tests: `
assert count_components(5, [(0, 1), (1, 2), (3, 4)]) == 2, 'Expected 2'
assert count_components(3, []) == 3, 'With no edges, every vertex is a separate component'
assert count_components(1, []) == 1, 'One vertex is one component'
assert count_components(4, [(0, 1), (1, 2), (2, 0), (3, 3)]) == 2, 'A cycle and a self-loop'
_n = 100000
_e = [(i, i + 1) for i in range(0, _n - 1) if i % 1000 != 999]
assert count_components(_n, _e) == 100, f'The 100,000-vertex chains should give 100 components, you have {count_components(_n, _e)}'
` } },
        { prompt: `The courier map is a list of strings: <code>'.'</code> — passable, <code>'#'</code> — a building. <code>shortest_path(grid)</code> should return the fewest steps from the top-left corner to the bottom-right corner (moving up/down/left/right); if there is no path or one of the corners is <code>'#'</code> — <code>-1</code>.
<pre><code>shortest_path(['..#',
               '#..',
               '#..'])   → 4
shortest_path(['.#',
               '#.'])    → -1</code></pre>`, hints: ['A <code>dist</code> matrix (-1 — not visited yet), <code>q = deque([(0, 0)])</code>.', 'Four directions; check the border, <code>\'#\'</code> and whether the cell was already visited.'], check: { tests: `
assert shortest_path(['..#', '#..', '#..']) == 4, f'Expected 4, you have {shortest_path(["..#", "#..", "#.."])}'
assert shortest_path(['.#', '#.']) == -1, '-1 if there is no path'
assert shortest_path(['.']) == 0, 'Start and end are the same cell — 0'
assert shortest_path(['#.', '..']) == -1, '-1 if the start cell is a building'
assert shortest_path(['....', '.##.', '....']) == 5, '5 steps on a 3×4 map'
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
assert shortest_path(_g) == _ref(_g), f'On a big "snake" maze expected {_ref(_g)}, you have {shortest_path(_g)}'
` } }
      ]
    },
    'dsa-13': {
      title: 'Dynamic programming',
      body: `
<p><b>Dynamic programming</b> (DP): when a problem splits into identical subproblems that come up again and again, solve each subproblem <b>once</b> and store its answer. There are two ways: <b>memoization</b> (top-down: recursion + cache) and <b>tabulation</b> (bottom-up: fill a table starting from the small problems).</p>
<h3>Example 1: the staircase</h3>
<p>The staircase up to Kok-Tobe has <code>n</code> steps, and each move climbs 1 or 2 steps. How many ways are there? If the last move is 1 step, before it come the ways to reach step <code>n−1</code>; if it is 2 steps, step <code>n−2</code>. So <code>ways(n) = ways(n−1) + ways(n−2)</code>.</p>
<pre><code># Naive recursion: O(2ⁿ) — ways(40) is very slow, one subproblem is solved a million times
from functools import lru_cache
@lru_cache(maxsize=None)            # memoization: O(n)
def ways(n):
    if n &lt;= 1:
        return 1
    return ways(n - 1) + ways(n - 2)

def ways_tab(n):                    # tabulation: O(n), no recursion
    a, b = 1, 1                     # ways(0), ways(1)
    for _ in range(n - 1):
        a, b = b, a + b
    return b if n &gt;= 1 else 1</code></pre>
<h3>Example 2: coin change</h3>
<p>Given coin denominations, make <code>amount</code> tenge with the fewest coins. The greedy approach (start from the biggest coin) is not always right: with coins [1, 3, 4], 6 = 4+1+1 (3 coins), while the right answer is 3+3 (2 coins). DP: <code>dp[x]</code> is the fewest coins for the sum <code>x</code>. <code>dp[0] = 0</code>, <code>dp[x] = min(dp[x − c] + 1)</code> over all <code>c ≤ x</code>. The complexity is O(amount · number of coins).</p>
<h3>Example 3: longest increasing subsequence (LIS)</h3>
<p>The longest strictly increasing sequence (not necessarily consecutive) among the daily values of the tenge exchange rate. O(n²) DP: <code>dp[i] = 1 + max(dp[j])</code> with <code>j &lt; i</code> and <code>a[j] &lt; a[i]</code>. A faster O(n log n) method: <code>tails[k]</code> is the smallest last element of increasing sequences of length <code>k+1</code>. For each new <code>x</code> we find its position with <code>bisect_left(tails, x)</code> and replace or append; the answer is <code>len(tails)</code>.</p>
<div class="tip"><b>A recipe for solving a DP problem:</b> (1) define the state (what does <code>dp[i]</code> mean?); (2) write the transition formula; (3) the base values; (4) the filling order; (5) which cell holds the answer. Deep recursion is limited in Python — for large n, tabulation is safer.</div>`,
      ex: [
        { prompt: 'What is the difference between memoization and tabulation?', options: ['Memoization only works with strings, tabulation only with numbers', 'Memoization is recursion + cache (top-down), tabulation fills a table with a loop starting from the small problems (bottom-up)', 'Tabulation is always O(2ⁿ)', 'There is no difference'], explain: 'Both solve each subproblem once; the difference is the filling direction and whether recursion is used.' },
        { prompt: `<code>climb(n)</code> — the number of ways to climb a staircase of <code>n</code> steps taking 1 or 2 steps at a time. <code>climb(0) = 1</code>. The test checks n = 90, so naive recursion will not pass — use tabulation or memoization.
<pre><code>climb(3) → 3    # 1+1+1, 1+2, 2+1
climb(5) → 8</code></pre>`, hints: ['<code>a, b = 1, 1</code> — climb(0), climb(1).', 'In a loop, <code>a, b = b, a + b</code>.'], check: { tests: `
assert climb(0) == 1 and climb(1) == 1, 'climb(0) = climb(1) = 1'
assert climb(3) == 3 and climb(5) == 8, 'climb(3) = 3, climb(5) = 8'
import time as _time
_t0 = _time.perf_counter(); _v = climb(32); _dt = _time.perf_counter() - _t0
assert _v == 3524578, 'climb(32) = 3524578'
assert _dt < 0.05, f'climb(32) took {_dt:.2f} s — that is exponential recursion. Compute each value once (DP)'
assert climb(90) == 4660046610375530309, 'climb(90) = 4660046610375530309'
` } },
        { prompt: `<code>coin_change(coins, amount)</code> — the fewest coins needed to make <code>amount</code> tenge; if it cannot be made, <code>-1</code>. There are unlimited coins of each denomination. The greedy approach does not work — write DP.
<pre><code>coin_change([1, 3, 4], 6)              → 2    # 3 + 3
coin_change([10, 20, 50, 100, 200], 370) → 4  # 200 + 100 + 50 + 20
coin_change([5, 10], 3)                → -1</code></pre>`, hints: ['<code>for x in range(1, amount + 1)</code>, and inside, for each coin <code>c &lt;= x</code>, <code>dp[x] = min(dp[x], dp[x - c] + 1)</code>.', 'At the end, -1 if <code>dp[amount]</code> is infinite.'], check: { tests: `
assert coin_change([1, 3, 4], 6) == 2, f'With coins [1, 3, 4], 6 = 3 + 3: 2 coins, you have {coin_change([1, 3, 4], 6)}'
assert coin_change([10, 20, 50, 100, 200], 370) == 4, '370 = 200 + 100 + 50 + 20'
assert coin_change([5, 10], 3) == -1, '-1 if it cannot be made'
assert coin_change([7], 0) == 0, '0 tenge — 0 coins'
assert coin_change([2], 3) == -1, '3 cannot be made with [2]'
assert coin_change([1, 5, 10, 20, 50, 100, 200], 9999) == 58, '9999 tenge can be made with 58 coins'
` } },
        { prompt: `<code>lis_length(a)</code> — the length of the longest strictly increasing subsequence (not necessarily consecutive). The test checks 100,000 elements: O(n²) will not pass — use the <code>tails</code> + <code>bisect_left</code> method.
<pre><code>lis_length([10, 9, 2, 5, 3, 7, 101, 18]) → 4   # 2, 3, 7, 18
lis_length([7, 7, 7])                    → 1
lis_length([])                           → 0</code></pre>`, hints: ['For each <code>x</code>, <code>i = bisect_left(tails, x)</code>.', 'If <code>i == len(tails)</code>, <code>append</code>, otherwise <code>tails[i] = x</code>; the answer is <code>len(tails)</code>.'], check: { tests: `
assert lis_length([10, 9, 2, 5, 3, 7, 101, 18]) == 4, f'Expected 4, you have {lis_length([10, 9, 2, 5, 3, 7, 101, 18])}'
assert lis_length([7, 7, 7]) == 1, 'Strictly increasing: equal values do not count'
assert lis_length([]) == 0, '0 for an empty list'
assert lis_length([1, 2, 3, 4]) == 4 and lis_length([4, 3, 2, 1]) == 1, 'Increasing and decreasing lists'
import time as _time, random as _random
_R = _random.Random(8)
_a = [_R.randint(0, 10**6) for _ in range(6000)]
_t0 = _time.perf_counter(); lis_length(_a); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'n=6000 took {_dt:.2f} s — that is O(n²). Write O(n log n) with bisect'
_a = list(range(0, 200000, 2))
assert lis_length(_a) == 100000, '100,000 for 100,000 increasing elements'
_a = [(_i % 1000) * 1000 + _i // 1000 for _i in range(100000)]
assert lis_length(_a) == 1099, f'Test n = 100,000: expected 1099, you have {lis_length(_a)}'
` } }
      ]
    },
    'dsa-p1': {
      title: 'Problems: Easy',
      body: `
<p>This lesson is a set of LeetCode-style problems. All of them are <b>Easy</b>: a single pass (O(n)), a hash map, two pointers, prefix sums. Each problem gives the function signature; the tests check edge cases (empty list, one element, all equal) and some check a 100,000-element input.</p>
<h3>How to solve a problem</h3>
<ol>
<li><b>Restate the problem in your own words.</b> What is the input, what is the output? Check the examples by hand.</li>
<li><b>Edge cases:</b> empty input, one element, negative numbers, duplicates.</li>
<li><b>Naive solution first</b> — estimate its complexity. With n = 10⁵, O(n²) will not do.</li>
<li><b>Improve it:</b> "what have I seen before?" → set/dict; "sorted" → two pointers or binary search; "range sum" → prefix sums.</li>
<li><b>After coding,</b> walk through the examples and check with the "Run" button.</li>
</ol>
<h3>Prefix sums — a new tool</h3>
<p>If many queries ask "what is the sum from <code>l</code> to <code>r</code>?", looping for each query costs O(n) per query. Instead, we build the array <code>pre[i+1] = pre[i] + a[i]</code> once; then <code>sum(a[l..r]) = pre[r+1] − pre[l]</code> — O(1).</p>
<pre><code>a   = [5, 2, 7, 1]
pre = [0, 5, 7, 14, 15]
# a[1..2] = 2 + 7 = pre[3] - pre[1] = 14 - 5 = 9</code></pre>`,
      ex: [
        { prompt: `<b>1. Zeros to the end.</b> In the warehouse records, items with zero stock should move to the end of the list while the others keep their relative order. <code>move_zeros(nums)</code> should change the list <b>in place</b> (do not create a new list).
<pre><code>a = [0, 12, 0, 3, 5]
move_zeros(a)   # a == [12, 3, 5, 0, 0]
a = [0]         # → [0]</code></pre>`, hints: ['A write pointer <code>w</code>: move each non-zero element to <code>nums[w]</code>.', 'The swap <code>nums[w], nums[r] = nums[r], nums[w]</code> pushes the zeros back on its own.'], check: { tests: `
_a = [0, 12, 0, 3, 5]; _id = id(_a); move_zeros(_a)
assert _a == [12, 3, 5, 0, 0] and id(_a) == _id, f'Expected [12, 3, 5, 0, 0] (in place), you have {_a}'
_b = [0]; move_zeros(_b); assert _b == [0], '[0] does not change'
_c = []; move_zeros(_c); assert _c == [], 'An empty list'
_d = [1, 2, 3]; move_zeros(_d); assert _d == [1, 2, 3], 'A list without zeros does not change'
_e = [0, 0, 7]; move_zeros(_e); assert _e == [7, 0, 0], '[0, 0, 7] → [7, 0, 0]'
_big = [(_i % 3) * _i for _i in range(100000)]
_exp = [x for x in _big if x != 0] + [0] * _big.count(0)
move_zeros(_big); assert _big == _exp, 'Wrong result on 100,000 elements'
` } },
        { prompt: `<b>2. The longest streak.</b> You are given a shop's daily sales. <code>max_streak(sales)</code> should return the largest number of <b>consecutive</b> days with sales above zero.
<pre><code>max_streak([3, 5, 0, 2, 4, 1, 0, 8]) → 3
max_streak([0, 0])                   → 0
max_streak([])                       → 0</code></pre>`, hints: ['Two variables: the current streak <code>cur</code> and the best one <code>best</code>.', 'When a zero appears, <code>cur = 0</code>.'], check: { tests: `
assert max_streak([3, 5, 0, 2, 4, 1, 0, 8]) == 3, f'Expected 3, you have {max_streak([3, 5, 0, 2, 4, 1, 0, 8])}'
assert max_streak([0, 0]) == 0 and max_streak([]) == 0, '0 if there are no sales'
assert max_streak([1, 1, 1]) == 3, 'If every day is positive — the length'
assert max_streak([0, 4]) == 1, 'A streak at the end counts too'
` } },
        { prompt: `<b>3. Currency trading.</b> <code>rates[i]</code> is the dollar rate (₸) on day <code>i</code>. You may buy once and sell once later. <code>best_profit(rates)</code> should return the largest profit; 0 if there is no profit. The test checks 100,000 days — write O(n).
<pre><code>best_profit([470, 465, 480, 462, 475, 490]) → 28   # buy at 462, sell at 490
best_profit([500, 490, 480])               → 0</code></pre>`, hints: ['Keep the lowest rate so far, <code>low</code>.', 'Each day compare the profit <code>r - low</code> with <code>best</code>.'], check: { tests: `
assert best_profit([470, 465, 480, 462, 475, 490]) == 28, f'Expected 28, you have {best_profit([470, 465, 480, 462, 475, 490])}'
assert best_profit([500, 490, 480]) == 0, '0 if it only goes down'
assert best_profit([]) == 0 and best_profit([470]) == 0, '0 for empty input or one day'
assert best_profit([3, 1, 4, 1, 5]) == 4, 'The lowest point can be in the middle'
import time as _time
_r = list(range(5000, 0, -1))
_t0 = _time.perf_counter(); _v = best_profit(_r); _dt = _time.perf_counter() - _t0
assert _v == 0 and _dt < 0.15, f'n=5000 took {_dt:.2f} s — looks like O(n²). Solve it in one pass'
_r = [(_i * 7919) % 100003 for _i in range(100000)]
_lo, _best = 10**9, 0
for _x in _r:
    _lo = min(_lo, _x); _best = max(_best, _x - _lo)
assert best_profit(_r) == _best, f'For n = 100,000 expected {_best}, you have {best_profit(_r)}'
` } },
        { prompt: `<b>4. Merging two sorted lists.</b> The order times of the Almaty and Astana branches are sorted in increasing order. <code>merge_sorted(a, b)</code> should return one sorted list. Do not use <code>sorted</code> / <code>.sort</code> — use two pointers.
<pre><code>merge_sorted([1, 4, 9], [2, 3, 10]) → [1, 2, 3, 4, 9, 10]
merge_sorted([], [5])               → [5]</code></pre>`, hints: ['<code>while i &lt; len(a) and j &lt; len(b)</code>: add the smaller one and move its pointer.', 'At the end, <code>extend</code> with the rest.'], check: { tests: `
assert merge_sorted([1, 4, 9], [2, 3, 10]) == [1, 2, 3, 4, 9, 10], f'Expected [1, 2, 3, 4, 9, 10], you have {merge_sorted([1, 4, 9], [2, 3, 10])}'
assert merge_sorted([], [5]) == [5] and merge_sorted([5], []) == [5], 'When one list is empty'
assert merge_sorted([], []) == [], 'Both empty'
assert merge_sorted([1, 1], [1]) == [1, 1, 1], 'Equal values'
assert 'sorted' not in merge_sorted.__code__.co_names and 'sort' not in merge_sorted.__code__.co_names, 'Do not use sorted / .sort'
_a = list(range(0, 200000, 2)); _b = list(range(1, 200000, 2))
assert merge_sorted(_a, _b) == list(range(200000)), 'Wrong result on 100,000 + 100,000 elements'
` } },
        { prompt: `<b>5. The missing receipt.</b> The till should have <code>n + 1</code> receipts numbered <code>0..n</code>, but one was lost; the numbers of the remaining <code>n</code> receipts are given in any order. <code>missing_number(nums)</code> should find the missing number in O(n).
<pre><code>missing_number([3, 0, 1]) → 2
missing_number([0])       → 1
missing_number([1])       → 0</code></pre>`, hints: ['The sum of the numbers from 0 to n is <code>n * (n + 1) // 2</code>.', 'Subtract the sum of the given numbers from it.'], check: { tests: `
assert missing_number([3, 0, 1]) == 2, f'Expected 2, you have {missing_number([3, 0, 1])}'
assert missing_number([0]) == 1 and missing_number([1]) == 0, 'Edge cases: [0] → 1, [1] → 0'
assert missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1]) == 8, 'Expected 8'
import random as _random, time as _time
_R = _random.Random(11)
_n = list(range(100001)); _gone = _n.pop(73519); _R.shuffle(_n)
_t0 = _time.perf_counter(); _v = missing_number(_n); _dt = _time.perf_counter() - _t0
assert _v == _gone, f'For n = 100,000 expected {_gone}, you have {_v}'
assert _dt < 1, f'{_dt:.2f} s — too slow; do not look up each number in the list with in'
` } },
        { prompt: `<b>6. A village election.</b> We know that one candidate got <b>more</b> than half of the votes. <code>majority(votes)</code> should return that candidate. Extra: try writing it with the Boyer–Moore method in O(1) memory (optional).
<pre><code>majority(['Асан', 'Үсен', 'Асан']) → 'Асан'
majority([7, 7, 5, 7, 5, 7, 7])     → 7</code></pre>`, hints: ['The simple way: <code>Counter(votes).most_common(1)[0][0]</code>.', 'Boyer–Moore: when the counter is 0, take a new candidate; +1 on a match, −1 otherwise.'], check: { tests: `
assert majority(['Асан', 'Үсен', 'Асан']) == 'Асан', "Expected 'Асан'"
assert majority([7, 7, 5, 7, 5, 7, 7]) == 7, 'Expected 7'
assert majority(['Дана']) == 'Дана', 'One vote'
_v = ['B'] * 49999 + ['A'] * 50001
assert majority(_v) == 'A', 'Error on 100,000 votes'
` } },
        { prompt: `<b>7. Vowels.</b> <code>count_vowels(text)</code> should return the number of vowel letters in the text. The vowels (both lowercase and uppercase) are the Kazakh vowels: <code>а ә е ё и і о ө у ұ ү ы э ю я</code>. Use a set.
<pre><code>count_vowels('Қазақстан')   → 3
count_vowels('Өскемен!')    → 3
count_vowels('')            → 0</code></pre>`, hints: ['<code>text.lower()</code> — so uppercase letters count too.', '<code>sum(1 for ch in ... if ch in VOWELS)</code>.'], check: { tests: `
assert count_vowels('Қазақстан') == 3, f"'Қазақстан' has 3 vowels, you have {count_vowels('Қазақстан')}"
assert count_vowels('Өскемен!') == 3, "'Өскемен!' — Ө, е, е: 3"
assert count_vowels('') == 0 and count_vowels('бмт 123') == 0, 'A text without vowels — 0'
assert count_vowels('ҮЙ ІШІ') == 3, 'Uppercase letters count too'
` } },
        { prompt: `<b>8. Range sums.</b> <code>sales</code> holds daily sales, <code>queries</code> holds pairs <code>(l, r)</code> (both ends included). <code>range_sums(sales, queries)</code> should return a list of sums, one per query. The test checks 100,000 days and 100,000 queries — build prefix sums.
<pre><code>range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)]) → [9, 15, 1]</code></pre>`, hints: ['<code>pre[i + 1] = pre[i] + sales[i]</code>.', 'The answer to a query: <code>pre[r + 1] - pre[l]</code>.'], check: { tests: `
assert range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)]) == [9, 15, 1], f'Expected [9, 15, 1], you have {range_sums([5, 2, 7, 1], [(1, 2), (0, 3), (3, 3)])}'
assert range_sums([4], [(0, 0)]) == [4], 'One day'
assert range_sums([1, 2], []) == [], '[] if there are no queries'
import random as _random, time as _time
_R = _random.Random(12)
_s = [_R.randint(0, 1000) for _ in range(10000)]
_q = [(0, 9999)] * 10000
_t0 = _time.perf_counter(); _v = range_sums(_s, _q); _dt = _time.perf_counter() - _t0
assert _v[0] == sum(_s), 'Wrong sum of the full range'
assert _dt < 0.15, f'10,000 queries took {_dt:.2f} s — do not re-add for each query, build prefix sums'
_s = [_R.randint(0, 1000) for _ in range(100000)]
_q = [(_i, 99999) for _i in range(0, 100000)]
_v = range_sums(_s, _q)
assert len(_v) == 100000 and _v[0] == sum(_s) and _v[-1] == _s[-1] and _v[50000] == sum(_s[50000:]), 'Wrong result on 100,000 queries'
` } }
      ]
    },
    'dsa-p2': {
      title: 'Problems: Medium',
      body: `
<p>In <b>Medium</b> problems one tool is not enough: sliding window, prefix sums + hash map, monotonic stack, topological sort, BFS on a grid and 2D DP. Often the naive O(n²) solution comes to mind easily, but the tests check sizes around 10⁵.</p>
<h3>Sliding window</h3>
<p>In questions about substrings/subarrays (the longest, the shortest, one that meets a condition), two pointers <code>l</code>, <code>r</code> define a window. <code>r</code> moves right and adds an element; if the condition breaks, <code>l</code> moves right and removes an element. Each element enters the window once and leaves once — O(n).</p>
<pre><code># Longest substring without repeating characters
last = {}; l = best = 0
for r, ch in enumerate(s):
    if ch in last and last[ch] &gt;= l:
        l = last[ch] + 1          # start the window after the repeat
    last[ch] = r
    best = max(best, r - l + 1)</code></pre>
<h3>Monotonic stack</h3>
<p>"For each element, where is the first larger one to its right?" — we keep the indexes whose answer is not found yet on a stack, in <b>decreasing</b> order of value. If a new element is larger than the top of the stack, it is the top's answer; we pop it. Each index is pushed once and popped once — O(n).</p>
<h3>Topological sort (Kahn)</h3>
<p>Courses and prerequisites form a directed graph. We put courses with in-degree 0 into a queue; each time we take one out, we decrease the in-degree of its neighbours. If not every course comes out, there is a circular dependency.</p>`,
      ex: [
        { prompt: `<b>1. Longest substring without repeats.</b> <code>longest_unique(s)</code> — the length of the longest <b>contiguous</b> substring with no repeated characters. Sliding window, O(n).
<pre><code>longest_unique('абвабвбб') → 3   # 'абв'
longest_unique('ққққ')     → 1
longest_unique('')         → 0</code></pre>`, hints: ['<code>last[ch]</code> is the last index of a character; <code>l</code> is the left edge of the window.', 'If the repeat is inside the window (<code>last[ch] &gt;= l</code>), <code>l = last[ch] + 1</code>.'], check: { tests: `
assert longest_unique('абвабвбб') == 3, f"'абвабвбб' → 3, you have {longest_unique('абвабвбб')}"
assert longest_unique('ққққ') == 1 and longest_unique('') == 0, 'Edge cases'
assert longest_unique('pwwkew') == 3, "'pwwkew' → 3 ('wke')"
assert longest_unique('abba') == 2, "'abba' → 2: l must not move back to the left"
import time as _time
_s = ''.join(chr(0x4e00 + _i) for _i in range(5000))
_t0 = _time.perf_counter(); _v = longest_unique(_s); _dt = _time.perf_counter() - _t0
assert _v == 5000, 'For a string of all different characters — its length'
assert _dt < 0.15, f'n=5000 took {_dt:.2f} s — O(n²). Write a sliding window'
_s = ''.join(chr(0x4e00 + (_i * 37) % 2000) for _i in range(100000))
assert longest_unique(_s) == 2000, 'Wrong result on a 100,000-character string'
` } },
        { prompt: `<b>2. Product of everything except itself.</b> <code>product_except_self(nums)</code> — <code>out[i]</code> = the product of all elements except the <code>i</code>-th. <b>Do not use division</b> (there may be zeros); O(n): left and right products.
<pre><code>product_except_self([1, 2, 3, 4]) → [24, 12, 8, 6]
product_except_self([2, 0, 5])    → [0, 10, 0]</code></pre>`, hints: ['First pass: <code>out[i]</code> = the product of the elements to the left.', 'Second pass from right to left: <code>out[i] *= right</code>, then <code>right *= nums[i]</code>.'], check: { tests: `
assert product_except_self([1, 2, 3, 4]) == [24, 12, 8, 6], f'Expected [24, 12, 8, 6], you have {product_except_self([1, 2, 3, 4])}'
assert product_except_self([2, 0, 5]) == [0, 10, 0], 'Division does not work when there is a zero'
assert product_except_self([0, 0, 3]) == [0, 0, 0], 'Two zeros'
assert product_except_self([-1, 2]) == [2, -1], 'Two elements'
import time as _time
_a = [1, -1] * 2500
_t0 = _time.perf_counter(); _v = product_except_self(_a); _dt = _time.perf_counter() - _t0
assert _v[0] == 1 and _v[1] == -1 and _dt < 0.15, f'n=5000 took {_dt:.2f} s — O(n²). Write O(n) with left/right products'
_a = [1] * 100000; _a[777] = 3
_v = product_except_self(_a)
assert _v[777] == 1 and _v[0] == 3 and len(_v) == 100000, 'Wrong result on 100,000 elements'
` } },
        { prompt: `<b>3. Subarrays that sum to k.</b> <code>count_subarrays(nums, k)</code> — the number of <b>contiguous</b> subarrays whose sum is exactly <code>k</code>. Numbers can be negative (so a sliding window does not work). Prefix sums + dict: O(n).
<pre><code>count_subarrays([1, 1, 1], 2)       → 2
count_subarrays([3, 4, -7, 5, 1], 0) → 1   # [3, 4, -7]
count_subarrays([1, 2, 3], 3)       → 2   # [1, 2], [3]</code></pre>`, hints: ['The current prefix sum is <code>s</code>. However many times the sum <code>s - k</code> appeared before, that many subarrays end here.', '<code>seen = {0: 1}</code> — the empty prefix; at each step <code>seen[s] += 1</code>.'], check: { tests: `
assert count_subarrays([1, 1, 1], 2) == 2, f'Expected 2, you have {count_subarrays([1, 1, 1], 2)}'
assert count_subarrays([3, 4, -7, 5, 1], 0) == 1, 'With negative numbers: [3, 4, -7]'
assert count_subarrays([1, 2, 3], 3) == 2, '[1, 2] and [3]'
assert count_subarrays([], 0) == 0, '0 for an empty list'
assert count_subarrays([0, 0, 0], 0) == 6, '[0, 0, 0] has 6 subarrays with sum 0'
import time as _time
_a = [1] * 5000
_t0 = _time.perf_counter(); _v = count_subarrays(_a, 10**9); _dt = _time.perf_counter() - _t0
assert _v == 0 and _dt < 0.15, f'n=5000 took {_dt:.2f} s — O(n²). Write prefix sums + dict'
_a = [(1 if _i % 2 == 0 else -1) for _i in range(100000)]
assert count_subarrays(_a, 0) == 2500000000, f'On 100,000 elements expected 2500000000, you have {count_subarrays(_a, 0)}'
` } },
        { prompt: `<b>4. Booking a hall.</b> Bookings for the Astana Hub hall are given as <code>[start, end]</code> (in hours). Merge overlapping or touching intervals (the end of one is the start of another); <code>merge_intervals(intervals)</code> should return a list sorted by start.
<pre><code>merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]]) → [[9, 12], [14, 17]]
merge_intervals([[13, 14], [8, 9]])                     → [[8, 9], [13, 14]]</code></pre>`, hints: ['First sort by start.', 'If the new interval\'s start is not greater than <code>out[-1][1]</code>, extend the end with <code>max</code>; otherwise add a new one.'], check: { tests: `
assert merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]]) == [[9, 12], [14, 17]], f'Expected [[9, 12], [14, 17]], you have {merge_intervals([[9, 11], [10, 12], [14, 15], [15, 17]])}'
assert merge_intervals([[13, 14], [8, 9]]) == [[8, 9], [13, 14]], 'Unsorted input'
assert merge_intervals([]) == [], 'An empty list'
assert merge_intervals([[1, 10], [2, 3], [4, 5]]) == [[1, 10]], 'Nested intervals are absorbed'
assert merge_intervals([[5, 5]]) == [[5, 5]], 'A zero-length interval'
_iv = [[_i * 3, _i * 3 + 2] for _i in range(100000)][::-1]
_r = merge_intervals(_iv)
assert len(_r) == 100000 and _r[0] == [0, 2], '100,000 separate intervals should not be merged'
_iv = [[_i, _i + 1] for _i in range(100000)]
assert merge_intervals(_iv) == [[0, 100000]], 'A chain of touching intervals should become one'
` } },
        { prompt: `<b>5. Lakes on a map.</b> The map is a list of strings: <code>'~'</code> — water, <code>'.'</code> — land. A lake is a group of water cells connected up/down/left/right. <code>count_lakes(grid)</code> should return the number of lakes. On a big map the recursion depth is not enough — use a stack or a <code>deque</code>.
<pre><code>count_lakes(['~~..',
             '~...',
             '..~~',
             '...~'])  → 2</code></pre>`, hints: ['Each unvisited <code>\'~\'</code> cell starts a new lake: increase the count and mark the whole lake.', 'Marking: DFS with a stack, four neighbours, checking the border and <code>seen</code>.'], check: { tests: `
assert count_lakes(['~~..', '~...', '..~~', '...~']) == 2, f'Expected 2, you have {count_lakes(["~~..", "~...", "..~~", "...~"])}'
assert count_lakes([]) == 0 and count_lakes(['...']) == 0, 'No water — 0'
assert count_lakes(['~.~', '.~.', '~.~']) == 5, 'Diagonal neighbours are not one lake'
assert count_lakes(['~']) == 1, 'One cell'
_g = ['~' * 300 for _ in range(300)]
assert count_lakes(_g) == 1, '300×300 of solid water is one lake (beware of recursion depth)'
_g = [''.join('~' if (_i + _j) % 2 == 0 and _i % 2 == 0 else '.' for _j in range(300)) for _i in range(300)]
assert count_lakes(_g) == 150 * 150, 'Wrong result on a 300×300 checkerboard map'
` } },
        { prompt: `<b>6. Waiting for a warmer day.</b> <code>temps[i]</code> is the temperature in Astana on day <code>i</code>. <code>days_until_warmer(temps)</code> should return, for each day, how many days later a <b>strictly warmer</b> day comes; 0 if it never does. Monotonic stack, O(n).
<pre><code>days_until_warmer([-5, -3, -8, 0, -1, 2]) → [1, 2, 1, 2, 1, 0]
days_until_warmer([3, 2, 1])             → [0, 0, 0]</code></pre>`, hints: ['The stack holds the indexes of days whose answer has not been found yet.', 'If the new <code>t</code> is warmer than the day on top of the stack, pop it and set <code>ans[j] = i - j</code>.'], check: { tests: `
assert days_until_warmer([-5, -3, -8, 0, -1, 2]) == [1, 2, 1, 2, 1, 0], f'Expected [1, 2, 1, 2, 1, 0], you have {days_until_warmer([-5, -3, -8, 0, -1, 2])}'
assert days_until_warmer([3, 2, 1]) == [0, 0, 0], 'If it only gets colder — all 0'
assert days_until_warmer([]) == [] and days_until_warmer([5]) == [0], 'Empty and one day'
assert days_until_warmer([1, 1, 2]) == [2, 1, 0], 'An equal temperature is not warmer'
import time as _time
_t = list(range(5000, 0, -1))
_t0 = _time.perf_counter(); days_until_warmer(_t); _dt = _time.perf_counter() - _t0
assert _dt < 0.15, f'n=5000 took {_dt:.2f} s — O(n²). Write a monotonic stack'
_t = list(range(50000, 0, -1)) + [10**6] * 50000
_v = days_until_warmer(_t)
assert _v[0] == 50000 and _v[49999] == 1 and _v[-1] == 0, 'Wrong result on 100,000 days'
` } },
        { prompt: `<b>7. Course order.</b> A university has <code>n</code> courses (<code>0..n−1</code>); <code>prereqs</code> holds pairs <code>(a, b)</code>: to take <code>a</code> you first need <code>b</code>. <code>course_order(n, prereqs)</code> should return any order in which all courses can be taken; if there is a cycle, <code>[]</code>. Kahn's algorithm.
<pre><code>course_order(3, [(1, 0), (2, 1)]) → [0, 1, 2]
course_order(2, [(0, 1), (1, 0)]) → []</code></pre>`, hints: ['Edge <code>b → a</code>; <code>indeg[a] += 1</code>. Start with courses of in-degree 0.', 'Each time you take a course, decrease its neighbours\' in-degree; if at the end <code>len(order) == n</code> is false, there is a cycle.'], check: { tests: `
def _valid(n, pr, order):
    if sorted(order) != list(range(n)):
        return False
    pos = {c: i for i, c in enumerate(order)}
    return all(pos[b] < pos[a] for a, b in pr)
assert course_order(3, [(1, 0), (2, 1)]) == [0, 1, 2], f'Expected [0, 1, 2], you have {course_order(3, [(1, 0), (2, 1)])}'
assert course_order(2, [(0, 1), (1, 0)]) == [], '[] if there is a cycle'
_o = course_order(4, [(1, 0), (2, 0), (3, 1), (3, 2)])
assert _valid(4, [(1, 0), (2, 0), (3, 1), (3, 2)], _o), f'The order breaks the prerequisites: {_o}'
assert sorted(course_order(3, [])) == [0, 1, 2], 'No dependencies — any order, but every course'
assert course_order(1, [(0, 0)]) == [], 'A course that depends on itself is a cycle'
_n = 50000; _pr = [(_i, _i - 1) for _i in range(1, _n)] + [(_i, _i // 2) for _i in range(2, _n)]
_o = course_order(_n, _pr)
assert _valid(_n, _pr, _o), 'Wrong order for 50,000 courses'
` } },
        { prompt: `<b>8. A taxi route.</b> A grid of Almaty streets: <code>grid[i][j]</code> is the cost (₸) of passing through that intersection. The taxi goes from the top-left corner to the bottom-right corner moving only <b>right</b> or <b>down</b>. <code>min_path_cost(grid)</code> — the smallest total cost of all cells on the path (including the first and last). 2D DP.
<pre><code>min_path_cost([[1, 3, 1],
               [1, 5, 1],
               [4, 2, 1]]) → 7    # 1→3→1→1→1</code></pre>`, hints: ['<code>dp[i][j]</code> is the smallest cost to reach (i, j); you can only arrive from above or from the left.', 'Fill the first row and first column separately.'], check: { tests: `
assert min_path_cost([[1, 3, 1], [1, 5, 1], [4, 2, 1]]) == 7, f'Expected 7, you have {min_path_cost([[1, 3, 1], [1, 5, 1], [4, 2, 1]])}'
assert min_path_cost([[5]]) == 5, 'One cell'
assert min_path_cost([[1, 2, 3]]) == 6 and min_path_cost([[1], [2], [3]]) == 6, 'One row / one column'
import random as _random
_R = _random.Random(13)
_g = [[_R.randint(1, 9) for _ in range(300)] for _ in range(300)]
_d = [row[:] for row in _g]
for _i in range(300):
    for _j in range(300):
        if _i or _j:
            _d[_i][_j] += min(_d[_i - 1][_j] if _i else 10**9, _d[_i][_j - 1] if _j else 10**9)
assert min_path_cost(_g) == _d[-1][-1], 'Wrong result on a 300×300 grid'
` } }
      ]
    },
    'dsa-p3': {
      title: 'Problems: Hard',
      body: `
<p><b>Hard</b> problems combine several ideas, and a naive solution does not work at all. Each problem is built on a proven pattern — recognise it and half the problem is solved.</p>
<table>
<tr><th>Problem</th><th>Key idea</th><th>Target complexity</th></tr>
<tr><td>Rainwater</td><td>two pointers + left/right maximum</td><td>O(n)</td></tr>
<tr><td>Window maximum</td><td>monotonic deque</td><td>O(n)</td></tr>
<tr><td>Shortest window</td><td>sliding window + frequency dict</td><td>O(n)</td></tr>
<tr><td>Edit distance</td><td>2D DP</td><td>O(n·m)</td></tr>
<tr><td>Route between cities</td><td>Dijkstra + heap</td><td>O((V + E) log V)</td></tr>
<tr><td>Largest rectangle</td><td>monotonic stack</td><td>O(n)</td></tr>
</table>
<h3>Monotonic deque</h3>
<p>To keep the maximum of a window, we store indexes in a deque with values in <b>decreasing</b> order. When a new element arrives, we pop smaller values from the back (they can never be the maximum again). If the front index leaves the window, we pop it from the front. Then <code>dq[0]</code> is always the window's maximum.</p>
<h3>Dijkstra</h3>
<p>Shortest paths in a graph with non-negative weights: the heap holds <code>(distance, vertex)</code>. We take the nearest vertex and "relax" its neighbours: if <code>d + w &lt; dist[v]</code>, we update it and push it onto the heap. Stale entries popped from the heap (<code>d &gt; dist[u]</code>) are skipped.</p>
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
<div class="tip"><b>Tip:</b> first walk through a small example step by step on paper. Most mistakes in hard problems are at the boundaries: empty input, <code>k = 1</code>, all values equal, an unreachable vertex.</div>`,
      ex: [
        { prompt: `<b>1. Rainwater in a gorge.</b> <code>heights[i]</code> is the height of a rock of width 1. How much water collects between the rocks after rain? <code>trap_water(heights)</code>, O(n): two pointers or left/right maximum arrays.
<pre><code>trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) → 6
trap_water([4, 2, 0, 3, 2, 5])                   → 9
trap_water([])                                   → 0</code></pre>`, hints: ['Water above each column = min(left maximum, right maximum) − height.', 'Two pointers: the lower side\'s boundary decides; when moving the left pointer update <code>lmax</code>, when moving the right one update <code>rmax</code>.'], check: { tests: `
assert trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6, f'Expected 6, you have {trap_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])}'
assert trap_water([4, 2, 0, 3, 2, 5]) == 9, 'Expected 9'
assert trap_water([]) == 0 and trap_water([5]) == 0 and trap_water([1, 2, 3]) == 0, 'Cases where no water collects'
assert trap_water([3, 0, 3]) == 3, '[3, 0, 3] → 3'
import time as _time
_h = [0] * 10000; _h[0] = _h[-1] = 5
_t0 = _time.perf_counter(); _v = trap_water(_h); _dt = _time.perf_counter() - _t0
assert _v == 5 * 9998, 'Wrong result on 10,000 columns'
assert _dt < 0.15, f'n=10,000 took {_dt:.2f} s — max(...) is recomputed for every column (O(n²)). Write O(n)'
_h = [(_i * 7919) % 1000 for _i in range(100000)]
_l = [0] * 100000; _r = [0] * 100000; _m = 0
for _i in range(100000):
    _m = max(_m, _h[_i]); _l[_i] = _m
_m = 0
for _i in range(99999, -1, -1):
    _m = max(_m, _h[_i]); _r[_i] = _m
_exp = sum(min(_l[_i], _r[_i]) - _h[_i] for _i in range(100000))
assert trap_water(_h) == _exp, f'For n = 100,000 expected {_exp}, you have {trap_water(_h)}'
` } },
        { prompt: `<b>2. Window maximum on the stock exchange.</b> <code>prices</code> is a share price every minute. <code>window_max(prices, k)</code> should return the maximum of each sliding window of length <code>k</code> (<code>len − k + 1</code> values). Monotonic deque, O(n).
<pre><code>window_max([1, 3, -1, -3, 5, 3, 6, 7], 3) → [3, 3, 5, 5, 6, 7]
window_max([9, 4], 1)                     → [9, 4]</code></pre>`, hints: ['The deque holds indexes with values in decreasing order: <code>pop</code> values less than or equal to the new <code>x</code> from the back.', 'If the front index is not greater than <code>i - k</code>, <code>popleft</code>; once <code>i &gt;= k - 1</code>, record <code>prices[dq[0]]</code>.'], check: { tests: `
assert window_max([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7], f'Expected [3, 3, 5, 5, 6, 7], you have {window_max([1, 3, -1, -3, 5, 3, 6, 7], 3)}'
assert window_max([9, 4], 1) == [9, 4], 'k = 1 — each element itself'
assert window_max([2, 2, 2], 3) == [2], 'One window'
assert window_max([1, 2, 3, 4], 2) == [2, 3, 4] and window_max([4, 3, 2, 1], 2) == [4, 3, 2], 'Increasing and decreasing'
import time as _time, random as _random
_R = _random.Random(21)
_p = [_R.randint(0, 10**6) for _ in range(20000)]
_t0 = _time.perf_counter(); _v = window_max(_p, 10000); _dt = _time.perf_counter() - _t0
assert len(_v) == 10001 and _v[0] == max(_p[:10000]) and _v[-1] == max(_p[-10000:]), 'Wrong result for n = 20,000, k = 10,000'
assert _dt < 0.3, f'n=20,000, k=10,000 took {_dt:.2f} s — max() is recomputed for every window. Write a monotonic deque'
_p = [_R.randint(0, 10**6) for _ in range(100000)]
_v = window_max(_p, 50)
assert len(_v) == 99951 and all(_v[_i] == max(_p[_i:_i + 50]) for _i in range(0, 99951, 997)), 'Wrong result on 100,000 elements'
` } },
        { prompt: `<b>3. The shortest covering window.</b> <code>min_window(s, t)</code> — the shortest <b>contiguous</b> substring of <code>s</code> that contains all the characters of <code>t</code> (with repeats). If there is none, <code>''</code>; if several have the same length, the leftmost one. Sliding window + frequency counter, O(|s| + |t|).
<pre><code>min_window('ADOBECODEBANC', 'ABC') → 'BANC'
min_window('алматыастана', 'тас')  → 'аст'
min_window('a', 'aa')              → ''</code></pre>`, hints: ['<code>need</code> — how many of each character are still needed, <code>missing</code> — how many are missing in total. Move <code>r</code> and widen the window until <code>missing == 0</code>.', 'Then drop extra characters on the left (<code>need[...] &lt; 0</code>), record the window, drop one needed character and keep searching.'], check: { tests: `
assert min_window('ADOBECODEBANC', 'ABC') == 'BANC', f"Expected 'BANC', you have {min_window('ADOBECODEBANC', 'ABC')!r}"
assert min_window('алматыастана', 'тас') == 'аст', "Expected 'аст'"
assert min_window('алматыастана', 'ата') == 'атыа', "'ата' needs two 'а' and one 'т': 'атыа'"
assert min_window('a', 'aa') == '', 'An empty string if characters are missing'
assert min_window('a', 'a') == 'a' and min_window('ab', 'b') == 'b', 'Small cases'
assert min_window('abcab', 'ab') == 'ab', 'On equal length, the leftmost one'
assert min_window('xyz', '') == '', 'An empty string if t is empty'
import time as _time
_s = 'x' * 1000 + 'ab'
_t0 = _time.perf_counter(); _v = min_window(_s, 'ab'); _dt = _time.perf_counter() - _t0
assert _v == 'ab', "The 'ab' at the end should be found"
assert _dt < 0.1, f'n=1000 took {_dt:.2f} s — do not search again from every starting point, write a sliding window'
_s = ''.join('абвгд'[(_i * _i) % 5] for _i in range(100000)) + 'е' + 'а' * 50 + 'ж'
assert min_window(_s, 'еж') == 'е' + 'а' * 50 + 'ж', 'Wrong result on a 100,000-character string'
` } },
        { prompt: `<b>4. Transliteration errors.</b> When switching to the Latin alphabet, one word gets spelled in different ways. <code>edit_distance(a, b)</code> — the fewest operations needed to turn <code>a</code> into <code>b</code> (insert, delete or replace one character; Levenshtein distance). 2D DP, O(n·m).
<pre><code>edit_distance('qazaq', 'kazakh')  → 3
edit_distance('kitten', 'sitting') → 3
edit_distance('', 'abc')           → 3</code></pre>`, hints: ['<code>dp[i][j]</code> is the cost of turning <code>a[:i]</code> into <code>b[:j]</code>; <code>dp[i][0] = i</code>, <code>dp[0][j] = j</code>.', 'If the characters are equal, <code>dp[i-1][j-1]</code>, otherwise <code>1 + min(delete, insert, replace)</code>.'], check: { tests: `
assert edit_distance('qazaq', 'kazakh') == 3, f"Expected 3, you have {edit_distance('qazaq', 'kazakh')}"
assert edit_distance('kitten', 'sitting') == 3, 'Expected 3'
assert edit_distance('', 'abc') == 3 and edit_distance('abc', '') == 3, 'From/to an empty string'
assert edit_distance('алма', 'алма') == 0, 'Identical words — 0'
assert edit_distance('шәй', 'шай') == 1, 'One replacement'
import time as _time
_t0 = _time.perf_counter(); _v = edit_distance('abcdefghi', 'jklmnopqr'); _dt = _time.perf_counter() - _t0
assert _v == 9, 'Two 9-letter words with no common characters — 9'
assert _dt < 0.1, f'{_dt:.2f} s — recursion without memoization is exponential. Fill a DP table'
_a = ''.join('абвгд'[_i % 5] for _i in range(700)); _b = ''.join('абвгд'[_i % 5] for _i in range(1, 701))
assert edit_distance(_a, _b) == 2, 'Wrong result on 700-character strings (one delete + one insert = 2)'
` } },
        { prompt: `<b>5. Shortest route between cities.</b> <code>n</code> cities (<code>0..n−1</code>), <code>roads</code> holds two-way roads <code>(u, v, km)</code>. <code>shortest_km(n, roads, src)</code> should return the list of shortest distances from <code>src</code> to every city; <code>-1</code> if a city cannot be reached. Dijkstra + <code>heapq</code>.
<pre><code># 0 Almaty, 1 Konaev, 2 Taldykorgan, 3 Balkhash, 4 Aktau
roads = [(0, 1, 70), (1, 2, 200), (0, 2, 280), (2, 3, 450)]
shortest_km(5, roads, 0) → [0, 70, 270, 720, -1]</code></pre>`, hints: ['<code>dist = [inf] * n</code>, <code>dist[src] = 0</code>, <code>(0, src)</code> in the heap.', 'If the popped <code>d &gt; dist[u]</code>, skip it; for a neighbour, if <code>d + w &lt; dist[v]</code>, update it and push it onto the heap. At the end inf → -1.'], check: { tests: `
_roads = [(0, 1, 70), (1, 2, 200), (0, 2, 280), (2, 3, 450)]
assert shortest_km(5, _roads, 0) == [0, 70, 270, 720, -1], f'Expected [0, 70, 270, 720, -1], you have {shortest_km(5, _roads, 0)}'
assert shortest_km(5, _roads, 3) == [720, 650, 450, 0, -1], 'From another start city'
assert shortest_km(1, [], 0) == [0], 'One city'
assert shortest_km(3, [(0, 1, 5), (0, 1, 2), (1, 2, 0)], 0) == [0, 2, 2], 'Parallel roads and zero length'
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
assert _d == list(range(6000)), 'Wrong distances on 6000 cities'
assert _dt < 0.3, f'6000 cities took {_dt:.2f} s — finding the nearest city by scanning a list is O(V²). Use heapq'
_e = _mk(20000, 80000)
assert shortest_km(20000, _e, 0) == list(range(20000)), 'Wrong result on 20,000 cities and 100,000 roads'
` } },
        { prompt: `<b>6. The biggest billboard.</b> The buildings along a street have width 1 and heights <code>heights</code>. What is the area of the biggest rectangular billboard that can hang on their walls (the rectangle covers adjacent buildings and its height is no more than the lowest of them)? <code>largest_rectangle(heights)</code>, monotonic stack, O(n).
<pre><code>largest_rectangle([2, 1, 5, 6, 2, 3]) → 10   # 5 and 6: 2 × 5
largest_rectangle([2, 4])             → 4
largest_rectangle([])                 → 0</code></pre>`, hints: ['The stack holds <code>(start_index, height)</code> in increasing order. Add a height of 0 at the end to "close" everything.', 'If the new <code>h</code> is lower than the top, pop it and compute the area <code>hh * (i - idx)</code>; the new element starts at <code>idx</code>.'], check: { tests: `
assert largest_rectangle([2, 1, 5, 6, 2, 3]) == 10, f'Expected 10, you have {largest_rectangle([2, 1, 5, 6, 2, 3])}'
assert largest_rectangle([2, 4]) == 4 and largest_rectangle([]) == 0, 'Small cases'
assert largest_rectangle([5]) == 5 and largest_rectangle([3, 3, 3]) == 9, 'One building and equal heights'
assert largest_rectangle([6, 2, 5, 4, 5, 1, 6]) == 12, 'Expected 12'
import time as _time
_h = list(range(1, 3001))
_t0 = _time.perf_counter(); _v = largest_rectangle(_h); _dt = _time.perf_counter() - _t0
assert _v == 1500 * 1501, 'Wrong result for 1..3000'
assert _dt < 0.15, f'n=3000 took {_dt:.2f} s — O(n²). Write a monotonic stack'
_n = 100000
assert largest_rectangle([7] * _n) == 7 * _n, 'Wrong result on 100,000 equal buildings'
assert largest_rectangle(list(range(_n, 0, -1))) == 50000 * 50001, 'Wrong result on 100,000 decreasing buildings'
` } }
      ]
    },
    'dsa-gate': {
      title: 'Module exam: Data Structures & Algorithms',
      body: `
<p>The final exam of the module: choosing a structure, estimating complexity and three algorithmic problems (heap, DP, counting based on merge sort). The pass mark is 75%. In the Python tasks the tests also check large inputs, so think about complexity first.</p>
<ul>
<li>Before writing a solution: what is the input size, which Big-O is enough?</li>
<li>Edge cases: empty input, one element, equal values.</li>
<li>First check a small example by hand, then run it.</li>
</ul>`,
      ex: [
        { prompt: 'A registration system holds 2,000,000 IINs (individual identification numbers). For every new application it must check "has this IIN been registered before?" thousands of times per second. Which structure?', options: ['An unsorted list and <code>in</code>', 'set', 'Linked list', 'Sort the list on every query and use binary search'], explain: 'A set lookup is O(1) on average. in on a list is O(n), and sorting on every query is O(n log n).' },
        { prompt: 'Merge sort halves a 1024-element list down to one-element pieces. How many levels of splitting (recursion depth) are there?', explain: '1024 = 2¹⁰: 1024 → 512 → … → 1, i.e. 10 levels. Merging at each level is O(n), O(n log n) in total.' },
        { prompt: 'What is the time complexity of BFS on a map grid with R rows and C columns?', explain: 'Each cell (vertex) enters the queue once, and at most 4 neighbours are checked for each: O(V + E) = O(R · C).' },
        { prompt: `<b>Meeting rooms.</b> Office meetings are given as <code>(start, end)</code> (the room is free at the moment <code>end</code>, so <code>(9, 10)</code> and <code>(10, 11)</code> can use the same room). <code>min_rooms(meetings)</code> — the fewest rooms needed for all meetings. Sort by start and keep a min-heap of end times: O(n log n). The test checks 100,000 meetings.
<pre><code>min_rooms([(9, 10), (9, 12), (11, 13)]) → 2
min_rooms([(1, 5), (5, 6)])             → 1
min_rooms([])                           → 0</code></pre>`, hints: ['The heap holds the time each room becomes free. If the earliest one <code>h[0] &lt;= s</code>, reuse that room (<code>heapreplace</code>).', 'Otherwise a new room: <code>heappush</code>. The answer is the heap size.'], check: { tests: `
assert min_rooms([(9, 10), (9, 12), (11, 13)]) == 2, f'Expected 2, you have {min_rooms([(9, 10), (9, 12), (11, 13)])}'
assert min_rooms([(1, 5), (5, 6)]) == 1, 'A meeting can start at the moment another ends'
assert min_rooms([]) == 0, 'No meetings — 0'
assert min_rooms([(1, 10), (2, 9), (3, 8)]) == 3, 'If all overlap — 3'
assert min_rooms([(5, 8), (1, 3), (2, 6)]) == 2, 'Unsorted input'
import time as _time
_m = [(_i, _i + 10**6) for _i in range(5000)]
_t0 = _time.perf_counter(); _v = min_rooms(_m); _dt = _time.perf_counter() - _t0
assert _v == 5000 and _dt < 0.15, f'n=5000 took {_dt:.2f} s — looks like O(n²). Use sorting + a heap'
_m = [((_i * 37) % 100000, (_i * 37) % 100000 + 10) for _i in range(100000)]
assert min_rooms(_m) == 10, f'On 100,000 meetings expected 10, you have {min_rooms(_m)}'
` } },
        { prompt: `<b>Ad slots.</b> A TV channel has forecast the ad income for each day: <code>income[i]</code> thousand ₸. So viewers do not get tired, ads cannot run on <b>two days in a row</b>. <code>best_income(income)</code> — the largest total income. DP: O(n), the test checks 100,000 days.
<pre><code>best_income([2, 7, 9, 3, 1]) → 12   # 2 + 9 + 1
best_income([2, 1, 1, 2])    → 4    # 2 + 2
best_income([])              → 0</code></pre>`, hints: ['Two states: ads ran today (<code>take</code>) / did not run (<code>skip</code>).', '<code>take = skip + x</code> (we must not have run ads yesterday), <code>skip = max(take, skip)</code> — update them at the same time.'], check: { tests: `
assert best_income([2, 7, 9, 3, 1]) == 12, f'Expected 12, you have {best_income([2, 7, 9, 3, 1])}'
assert best_income([2, 1, 1, 2]) == 4, 'Expected 4 (the first and the last)'
assert best_income([]) == 0 and best_income([5]) == 5, 'Empty and one day'
assert best_income([1, 100, 1]) == 100, 'A big day in the middle'
import time as _time
_t0 = _time.perf_counter(); _v = best_income(list(range(32))); _dt = _time.perf_counter() - _t0
assert _v == sum(range(1, 32, 2)), 'Wrong result for 0..31'
assert _dt < 0.05, f'{_dt:.2f} s — exponential recursion. Write a DP that handles each day once'
_inc = [(_i * 31) % 97 for _i in range(100000)]
_a, _b = 0, 0
for _x in _inc:
    _a, _b = _b + _x, max(_a, _b)
assert best_income(_inc) == max(_a, _b), 'Wrong result on 100,000 days'
` } },
        { prompt: `<b>Inversions.</b> In a list of ratings, pairs with <code>i &lt; j</code> but <code>a[i] &gt; a[j]</code> are inversions; they show "how unordered" the list is. <code>count_inversions(a)</code> should count them in O(n log n): count during the merge step of merge sort (when an element is taken from the right, every element left on the left side is larger than it). The test checks 100,000 elements.
<pre><code>count_inversions([2, 4, 1, 3, 5]) → 3    # (2,1), (4,1), (4,3)
count_inversions([5, 4, 3, 2, 1]) → 10
count_inversions([])              → 0</code></pre>`, hints: ['<code>sort_count</code> works like merge sort: process both halves recursively and add up their inversions.', 'When merging, if <code>right[j]</code> is taken, <code>inv += len(left) - i</code>. Equal values are not an inversion: <code>&lt;=</code>.'], starter: `def count_inversions(a):
    def sort_count(arr):
        # should return (sorted list, number of inversions)
        pass
    return 0
`, check: { tests: `
assert count_inversions([2, 4, 1, 3, 5]) == 3, f'Expected 3, you have {count_inversions([2, 4, 1, 3, 5])}'
assert count_inversions([5, 4, 3, 2, 1]) == 10, '5 decreasing elements — 10'
assert count_inversions([]) == 0 and count_inversions([7]) == 0, 'Empty and one element'
assert count_inversions([1, 1, 1]) == 0, 'Equal values are not an inversion'
import time as _time, random as _random
_R = _random.Random(41)
_a = [_R.randint(0, 50) for _ in range(300)]
assert count_inversions(_a) == sum(1 for _i in range(300) for _j in range(_i + 1, 300) if _a[_i] > _a[_j]), 'Wrong result on 300 random elements'
_a = list(range(8000, 0, -1))
_t0 = _time.perf_counter(); _v = count_inversions(_a); _dt = _time.perf_counter() - _t0
assert _v == 8000 * 7999 // 2, 'Wrong result on 8000 decreasing elements'
assert _dt < 0.5, f'n=8000 took {_dt:.2f} s — that is O(n²). Count with merge sort'
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
assert _v == _exp, f'On 100,000 elements expected {_exp}, you have {_v}'
` } }
      ]
    }
  }
});
