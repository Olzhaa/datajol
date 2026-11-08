// DSA2 Advanced Algorithms: English text. Code, solutions and expected output are in content/algo2.js.
DJ.i18n.patch({
  modules: {
    'dsa-2': { intro: `The next step after DSA1: a systematic way to solve problems, sliding window and prefix sums, how a hash table works inside, linear sorts and heapsort, balanced trees, union-find, Dijkstra, minimum spanning tree, greedy, harder DP, KMP and tries. In each lesson you write the algorithm in Python yourself, and the tests check edge cases as well as speed.` }
  },
  lessons: {
    'alg-1': {
      title: 'How to approach an algorithm problem',
      body: `
<p>In the DSA1 course you learned the tools: hash maps, two pointers, binary search, BFS, DP. Now the question is different: <b>where do you start when you see a new problem?</b> An experienced developer does not write code right away. They follow the same steps every time.</p>
<h3>Five steps</h3>
<ul>
<li><b>Read the statement.</b> What is the input, what is the output, what are the constraints? If <code>n ≤ 10⁵</code>, then O(n²) will not pass. Can the numbers be negative? Can the list be empty?</li>
<li><b>Examples.</b> Solve the given example by hand, then come up with edge cases yourself: an empty input, a single element, all values equal, the largest value.</li>
<li><b>Brute force.</b> First name the simplest correct solution (sometimes it is worth writing it down). It may be slow, but it becomes the "reference" that you check your answer against.</li>
<li><b>Improve.</b> Which part of the brute force is repeated? Can you speed it up with a set, a dict, sorting, a prefix sum or a heap?</li>
<li><b>Check.</b> State the time and <b>memory</b> complexity, and test the edge cases in code.</li>
</ul>
<h3>Time and memory</h3>
<p>Big-O applies to memory as well as to time. If you collect n elements in a <code>set</code>, the extra memory is O(n). A DP table of size n×m takes O(n·m) memory, but if you keep only the previous row, O(m) is enough. Recursion uses memory too: with depth d, there are d frames on the stack.</p>
<h3>Half-open interval [l, r)</h3>
<p>In Python, <code>range(l, r)</code> and <code>a[l:r]</code> include the left end and exclude the right end. This is convenient: the length is <code>r - l</code>, and the intervals <code>[0, k)</code> and <code>[k, n)</code> do not overlap and split the list completely. Use the same convention in your own functions, and you will make fewer off-by-one mistakes.</p>
<pre><code>from bisect import bisect_left

# Sorted check totals from a shop in Almaty
checks = [800, 1200, 1200, 2500, 4000, 7300]
# Number of checks in [1000, 4000)
lo = bisect_left(checks, 1000)   # first index where the value is at least 1000: 1
hi = bisect_left(checks, 4000)   # first index where the value is at least 4000: 4
print(hi - lo)                   # 3 checks: 1200, 1200, 2500</code></pre>
<p>Two <code>bisect_left</code> calls and the difference <code>hi - lo</code> are the classic pattern for a half-open interval. Each query takes O(log n).</p>
<h3>Common mistakes</h3>
<ul>
<li>Writing an O(n²) solution right away, without reading the constraints.</li>
<li>The last index of a loop: <code>range(len(a) - 1)</code> skips the last element.</li>
<li>Not checking for empty input: <code>max([])</code> raises an error.</li>
<li>Trusting a fast solution without comparing it with brute force.</li>
</ul>
<h3>Interview stages</h3>
<p>A technical interview usually goes like this: clarifying questions about the problem (2–3 minutes), the brute force idea, the improved idea and its complexity, writing the code, and a hand "dry run" on an example. Do not stay silent: your thinking, said out loud, is judged just like the code itself.</p>
<div class="tip"><b>Tip:</b> when you write a fast version, keep the brute force next to it and compare the two on small random inputs. This is the cheapest and most reliable way to test.</div>`,
      ex: [
        {
          prompt: `An online library has <code>n</code> books, and one page holds <code>size</code> books. The function <code>pages(n, size)</code> must return each page as a half-open interval <code>(l, r)</code>: the books on the page from number <code>l</code> to <code>r - 1</code>.
<pre><code>pages(10, 4) → [(0, 4), (4, 8), (8, 10)]
pages(8, 4)  → [(0, 4), (4, 8)]
pages(0, 3)  → []</code></pre>`,
          hints: ['<code>range(0, n, size)</code> gives the start of each page.', 'The right end of the last page must not go past <code>n</code>: <code>min(l + size, n)</code>.'],
          check: { tests: String.raw`
assert pages(10, 4) == [(0, 4), (4, 8), (8, 10)], "pages(10, 4): the last page should be (8, 10)"
assert pages(8, 4) == [(0, 4), (4, 8)], "pages(8, 4): an empty page must not be added"
assert pages(0, 3) == [], "If there are no books, there are no pages: []"
assert pages(3, 5) == [(0, 3)], "One page is enough: [(0, 3)]"
assert pages(5, 1) == [(i, i + 1) for i in range(5)], "With size = 1, each page holds one book"
_p = pages(1003, 10)
assert sum(r - l for l, r in _p) == 1003 and _p[-1] == (1000, 1003), "The pages must cover every book exactly once"
` } },
        {
          prompt: `<code>count_between(checks, lo, hi)</code>: in the sorted list <code>checks</code>, count the values for which <code>lo ≤ x &lt; hi</code>. The tests make thousands of queries, so you cannot scan the whole list every time: use <code>bisect_left</code>.
<pre><code>count_between([800, 1200, 1200, 2500, 4000], 1000, 4000) → 3
count_between([800, 1200], 5000, 9000)                   → 0
count_between([], 0, 10)                                 → 0</code></pre>`,
          starter: `from bisect import bisect_left

def count_between(checks, lo, hi):
    return 0
`,
          hints: ['The answer is <code>bisect_left(checks, hi) - bisect_left(checks, lo)</code>.', '<code>hi ≤ lo</code> means an empty interval: 0.'],
          check: { tests: String.raw`
assert count_between([800, 1200, 1200, 2500, 4000], 1000, 4000) == 3, "The interval [1000, 4000) has three checks, 4000 is not included"
assert count_between([800, 1200, 1200, 2500, 4000], 1200, 1201) == 2, "The boundary value 1200 must be counted twice"
assert count_between([800, 1200], 5000, 9000) == 0, "No values in the interval: 0"
assert count_between([], 0, 10) == 0, "Empty list: 0"
assert count_between([5, 6, 7], 7, 5) == 0, "If hi ≤ lo, the interval is empty: 0"
assert count_between([1, 2, 3], 0, 100) == 3, "Everything is in the interval: 3"
import random as _random, time as _time
_R = _random.Random(7)
_a = sorted(_R.randint(0, 10**6) for _ in range(50000))
_qs = [(_R.randint(0, 10**6), _R.randint(0, 10**6)) for _ in range(3000)]
_t0 = _time.perf_counter()
_res = [count_between(_a, l, h) for l, h in _qs]
_dt = _time.perf_counter() - _t0
assert _res[0] == sum(1 for x in _a if _qs[0][0] <= x < _qs[0][1]), "The result on a large list is wrong"
assert _dt < 0.5, "3000 queries are too slow: solve each one in O(log n) with bisect"
` } },
        {
          prompt: `In a coffee shop, <code>a</code> holds check totals. <code>count_pairs_diff(a, k)</code> must return the number of index pairs <code>(i &lt; j)</code> for which the difference is exactly <code>k</code>: <code>|a[i] - a[j]| == k</code>. The starter code has a reference <code>brute</code> (O(n²)). Write an O(n) version: the test compares both solutions on random inputs, then measures the time on 60,000 elements.
<pre><code>count_pairs_diff([1, 5, 3, 4, 2], 2) → 3   # (1,3), (5,3), (4,2)
count_pairs_diff([7, 7, 7], 0)       → 3
count_pairs_diff([], 1)              → 0</code></pre>`,
          starter: `from collections import Counter

def brute(a, k):
    return sum(1 for i in range(len(a)) for j in range(i + 1, len(a)) if abs(a[i] - a[j]) == k)

def count_pairs_diff(a, k):
    return 0
`,
          hints: ['<code>Counter(a)</code> gives the count of each value. When <code>k &gt; 0</code>, for each <code>x</code> add <code>cnt[x] * cnt[x + k]</code>: each pair is counted once.', '<code>k == 0</code> is a special case: c equal values give <code>c * (c - 1) // 2</code> pairs.'],
          check: { tests: String.raw`
assert count_pairs_diff([1, 5, 3, 4, 2], 2) == 3, "[1, 5, 3, 4, 2], k=2: 3 pairs"
assert count_pairs_diff([7, 7, 7], 0) == 3, "k = 0: three equal values give 3 pairs"
assert count_pairs_diff([], 1) == 0, "Empty list: 0"
assert count_pairs_diff([1, 1, 2, 2], 1) == 4, "Repeated values: every 1 pairs with every 2, 4 in total"
import random as _random, time as _time
_R = _random.Random(3)
for _ in range(200):
    _a = [_R.randint(0, 9) for _ in range(_R.randint(0, 12))]
    _k = _R.randint(0, 4)
    assert count_pairs_diff(_a, _k) == brute(_a, _k), "The result does not match brute: " + str((_a, _k))
_big = [_R.randint(0, 10**5) for _ in range(60000)]
_t0 = _time.perf_counter(); count_pairs_diff(_big, 17); _dt = _time.perf_counter() - _t0
assert _dt < 0.5, "60,000 elements is too slow: solve it in O(n) with Counter"
` } },
        {
          prompt: `What is the <b>extra memory</b> complexity of this function (n = len(a))?<pre><code>def best_day(a):
    best, cur = 0, 0
    for x in a:
        cur = max(0, cur + x)
        best = max(best, cur)
    return best</code></pre>`,
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          explain: `The function keeps only two variables from the input: <code>best</code> and <code>cur</code>. Time is O(n), extra memory is O(1).`
        }
      ]
    },
    'alg-2': {
      title: 'Sliding window and prefix sums',
      body: `
<p>In DSA1 we saw a one-dimensional prefix sum and the problem "longest substring without repeating characters". In this lesson we organise two techniques: the <b>sliding window</b> and <b>prefix sums</b>, including the two-dimensional version.</p>
<h3>A window of fixed size</h3>
<p>A bus depot in Astana records the number of passengers each day. We need a 7-day moving sum. The naive approach recalculates every window from scratch: O(n·k). The smart way: when the window moves one step to the right, subtract the value that left on the left and add the value that entered on the right. Each step is O(1), so the total is O(n).</p>
<pre><code>def moving_sums(a, k):
    if k &gt; len(a):
        return []
    s = sum(a[:k])          # the first window [0, k)
    out = [s]
    for r in range(k, len(a)):
        s += a[r] - a[r - k]   # a[r] entered, a[r - k] left
        out.append(s)
    return out

print(moving_sums([3, 1, 4, 1, 5], 2))   # [4, 5, 5, 6]</code></pre>
<h3>A window of variable size</h3>
<p>Two pointers, <code>l</code> and <code>r</code>, set the bounds of the window <code>[l, r]</code>. The pointer <code>r</code> always moves right. If the window breaks the condition (for example, a character appears twice, or there are more than k distinct characters), move <code>l</code> to the right until the condition holds again. Each pointer moves at most n steps, so the total time is O(n). Keep the character counts in the window in a <code>dict</code> or a <code>Counter</code>. A key whose count drops to 0 must be deleted, otherwise <code>len</code> will give the wrong answer.</p>
<h3>Prefix sums: two dimensions</h3>
<p>In one dimension, <code>pre[i]</code> is the sum of the first i elements, and the segment <code>[l, r)</code> equals <code>pre[r] - pre[l]</code>. Picture a table for a chain of coffee shops: a row is a branch, a column is an hour. To answer many queries like "the revenue of branches 2–5 during hours 9–13", we build <code>P[i][j]</code> as the sum of the rectangle <code>[0, i) × [0, j)</code>:</p>
<pre><code>P[i + 1][j + 1] = g[i][j] + P[i][j + 1] + P[i + 1][j] - P[i][j]
# sum of [r1, r2) × [c1, c2):
P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1]</code></pre>
<p>The corner <code>P[r1][c1]</code> is subtracted twice, so we add it back once (the inclusion-exclusion principle). Building the table takes O(R·C), and each query takes O(1).</p>
<h3>Common mistakes</h3>
<ul>
<li>Forgetting the case where the window is larger than the list (<code>k &gt; n</code>) and not returning an empty result.</li>
<li>Building the prefix array with length <code>n</code> instead of <code>n + 1</code>: you need the element <code>pre[0] = 0</code>.</li>
<li>In a list with negative numbers, a sliding window does not work for the condition "sum ≥ target": shrinking the window does not necessarily reduce the sum. Then you need a prefix sum with a hash map or another approach.</li>
<li>Not deleting a key from the Counter when its count drops to zero.</li>
</ul>
<div class="tip"><b>Tip:</b> if the statement mentions "neighbouring elements", "subarray" or "the last k days", think about a sliding window first. If there are "many queries for the sum of a segment", build a prefix sum.</div>`,
      ex: [
        {
          prompt: `<code>moving_average(values, k)</code>: return a list of averages for every full window of <code>k</code> days, rounded to 2 decimal places (<code>round(x, 2)</code>). If <code>k &gt; len(values)</code>, return <code>[]</code>. The test measures the time on 100,000 days with a window of k = 2000, so do not recalculate each window from scratch.
<pre><code>moving_average([10, 20, 30, 40], 2) → [15.0, 25.0, 35.0]
moving_average([5], 3)              → []</code></pre>`,
          hints: ['Find the sum of the first window with <code>sum(values[:k])</code>.', 'At each next step: <code>s += values[r] - values[r - k]</code>.'],
          check: { tests: String.raw`
assert moving_average([10, 20, 30, 40], 2) == [15.0, 25.0, 35.0], "[10, 20, 30, 40], k=2 → [15.0, 25.0, 35.0]"
assert moving_average([5], 3) == [], "If k > len, then []"
assert moving_average([4, 8, 6], 3) == [6.0], "k = len: one window"
assert moving_average([1, 2], 1) == [1.0, 2.0], "k = 1: each value on its own"
assert moving_average([1, 2, 2], 3) == [1.67], "Rounding: 5/3 → 1.67"
import random as _random, time as _time
_R = _random.Random(5)
_v = [_R.randint(0, 500) for _ in range(100000)]
_t0 = _time.perf_counter(); _m = moving_average(_v, 2000); _dt = _time.perf_counter() - _t0
assert len(_m) == 98001 and _m[123] == round(sum(_v[123:2123]) / 2000, 2), "The result on a large input is wrong"
assert _dt < 0.5, "100,000 days is too slow: update the window sum in O(1)"
` } },
        {
          prompt: `<code>max_sum_window(a, k)</code>: find the window of length exactly <code>k</code> with the largest sum, and return <code>(sum, starting_index)</code>. If the sums are equal, take the leftmost window. If <code>k &gt; len(a)</code> or <code>k ≤ 0</code>, return <code>None</code>. The numbers can be negative too.
<pre><code>max_sum_window([2, -1, 3, 5, -2, 4], 2) → (8, 2)
max_sum_window([-3, -1, -2], 1)         → (-1, 1)</code></pre>`,
          hints: ['The starting value of <code>best</code> must not be 0: it should be the sum of the first window, because all the numbers may be negative.', 'Update only when <code>s &gt; best</code>: then the leftmost window is kept.'],
          check: { tests: String.raw`
assert max_sum_window([2, -1, 3, 5, -2, 4], 2) == (8, 2), "The sum of [3, 5] is 8, start 2"
assert max_sum_window([-3, -1, -2], 1) == (-1, 1), "All negative: (-1, 1)"
assert max_sum_window([1, 2, 3], 3) == (6, 0), "k = len: the whole list"
assert max_sum_window([1, 2], 3) is None, "If k > len, then None"
assert max_sum_window([4, 0, 4, 0], 2) == (4, 0), "With equal sums, take the leftmost window"
assert max_sum_window([], 1) is None, "Empty list: None"
import random as _random, time as _time
_R = _random.Random(11)
_a = [_R.randint(-100, 100) for _ in range(100000)]
_t0 = _time.perf_counter(); _res = max_sum_window(_a, 3000); _dt = _time.perf_counter() - _t0
assert _res[0] == sum(_a[_res[1]:_res[1] + 3000]), "On a large input the sum and the index do not match"
assert _dt < 0.5, "Too slow: update the window sum at every step in O(1)"
` } },
        {
          prompt: `<code>longest_k_distinct(s, k)</code>: the length of the longest substring (consecutive characters) that has at most <code>k</code> distinct characters. This is the general form of the "no repeating characters" problem from DSA1. The solution must run in O(n).
<pre><code>longest_k_distinct("eceba", 2)   → 3   # "ece"
longest_k_distinct("aaaa", 1)    → 4
longest_k_distinct("abc", 0)     → 0</code></pre>`,
          starter: `def longest_k_distinct(s, k):
    return len(s)
`,
          hints: ['Keep the count of each character in the window in the dictionary <code>cnt</code>. Move <code>l</code> while <code>len(cnt) &gt; k</code>.', 'Delete a character whose count has dropped to 0 with <code>del cnt[left]</code>.'],
          check: { tests: String.raw`
assert longest_k_distinct("eceba", 2) == 3, "eceba, k=2 → 3 (ece)"
assert longest_k_distinct("aaaa", 1) == 4, "aaaa, k=1 → 4"
assert longest_k_distinct("abc", 0) == 0, "k = 0 → 0"
assert longest_k_distinct("", 3) == 0, "Empty string → 0"
assert longest_k_distinct("abc", 5) == 3, "k is larger than the number of distinct characters: the whole string"
assert longest_k_distinct("aabbcc", 2) == 4, "aabbcc, k=2 → 4 (aabb)"
import random as _random, time as _time
_R = _random.Random(2)
def _brute(s, k):
    return max([j - i for i in range(len(s) + 1) for j in range(i, len(s) + 1) if len(set(s[i:j])) <= k] + [0])
for _ in range(60):
    _s = "".join(_R.choice("abc") for _ in range(_R.randint(0, 10)))
    _k = _R.randint(0, 3)
    assert longest_k_distinct(_s, _k) == _brute(_s, _k), "Error in the random check: " + repr((_s, _k))
_big = "".join(_R.choice("abcdefgh") for _ in range(100000))
_t0 = _time.perf_counter(); longest_k_distinct(_big, 4); _dt = _time.perf_counter() - _t0
assert _dt < 0.8, "100,000 characters is too slow: the sliding window must run in O(n)"
` } },
        {
          prompt: `A network of coffee shops: <code>grid[i][j]</code> is the revenue of branch <code>i</code> in hour <code>j</code>. For each query <code>(r1, c1, r2, c2)</code>, the function <code>rect_sums(grid, queries)</code> returns the sum over the half-open rectangle <code>[r1, r2) × [c1, c2)</code>. Build a two-dimensional prefix sum: the test sends 10,000 queries.
<pre><code>g = [[1, 2, 3],
     [4, 5, 6]]
rect_sums(g, [(0, 0, 2, 3), (1, 1, 2, 3), (0, 1, 0, 3)]) → [21, 11, 0]</code></pre>`,
          starter: `def rect_sums(grid, queries):
    return [0 for _ in queries]
`,
          hints: ['The table <code>P</code> has size <code>(R + 1) × (C + 1)</code> and is filled with zeros.', 'The answer to a query: <code>P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1]</code>.'],
          check: { tests: String.raw`
_g = [[1, 2, 3], [4, 5, 6]]
assert rect_sums(_g, [(0, 0, 2, 3), (1, 1, 2, 3), (0, 1, 0, 3)]) == [21, 11, 0], "Expected [21, 11, 0]"
assert rect_sums(_g, [(0, 2, 2, 3)]) == [9], "The last column: 3 + 6 = 9"
assert rect_sums(_g, []) == [], "No queries: []"
assert rect_sums([[7]], [(0, 0, 1, 1)]) == [7], "A 1×1 table"
import random as _random, time as _time
_R = _random.Random(9)
_G = [[_R.randint(0, 99) for _ in range(120)] for _ in range(120)]
_Q = [(0, 0, 120, 120)] * 10000
_t0 = _time.perf_counter(); _out = rect_sums(_G, _Q); _dt = _time.perf_counter() - _t0
assert _out[0] == sum(map(sum, _G)), "The sum of the whole table is wrong"
assert _dt < 0.5, "10,000 queries are too slow: build the prefix table so that each query runs in O(1)"
` } }
      ]
    },
    'alg-3': {
      title: 'Inside a hash table',
      body: `
<p>In DSA1 we used <code>dict</code> and <code>set</code> as a tool with "O(1) on average". In this lesson we look inside them and write our own <b>hash table</b>.</p>
<h3>Hash function and buckets</h3>
<p>A hash table is an array of <code>m</code> cells (buckets). To store a key, a <b>hash function</b> turns it into an integer, and then we find the index of the cell: <code>i = hash(key) % m</code>. A good hash function spreads the keys evenly across the cells. In Python, <code>hash("Almaty")</code> for strings can change from one run to the next, but for integers <code>hash(42) == 42</code>.</p>
<h3>Collision</h3>
<p>Two different keys can land in the same cell: this is a <b>collision</b>. There are two main ways to resolve it.</p>
<ul>
<li><b>Chaining:</b> each cell holds a list. Keys that land in the same cell are added to that list. To search, we find the cell and walk through its list.</li>
<li><b>Open addressing (linear probing):</b> everything lives in one array. If a cell is taken, we look at the next one, <code>(i + 1) % m</code>. Python's own <code>dict</code> uses open addressing (with a more complicated probe sequence).</li>
</ul>
<pre><code>m = 8
buckets = [[] for _ in range(m)]
for key, val in [(10, "Нан"), (18, "Сүт"), (3, "Шай")]:
    buckets[hash(key) % m].append((key, val))
# 10 % 8 = 2 and 18 % 8 = 2: a collision, both go into buckets[2]
print(buckets[2])   # [(10, 'Нан'), (18, 'Сүт')]</code></pre>
<h3>Load factor and rehashing</h3>
<p>The <b>load factor</b> α = n / m, where n is the number of elements. As α grows, the chains get longer and operations slow down. So when α goes above a set threshold (for example, 0.75), the table does <b>rehashing</b>: it doubles the number of cells and redistributes all keys using the new <code>% m</code>. One rehash costs O(n), but it happens rarely, so the average (amortized) cost of one <code>put</code> stays O(1).</p>
<table>
<tr><th></th><th>Chaining</th><th>Linear probing</th></tr>
<tr><td>In a cell</td><td>a list of pairs</td><td>one pair or empty</td></tr>
<tr><td>Can α be &gt; 1</td><td>yes</td><td>no, α must stay below 1</td></tr>
<tr><td>Deletion</td><td>remove from the list</td><td>needs a "tombstone" marker</td></tr>
<tr><td>Cache-friendly</td><td>worse</td><td>yes, the data lies side by side</td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li>Adding a pair in <code>put</code> without checking whether the key is already there: the key is stored twice.</li>
<li>Keeping the old index during a rehash: it must be recalculated with the new <code>m</code>.</li>
<li>Using a mutable object (a list) as a key: it has no hash.</li>
<li>Forgetting the worst case: if all keys land in one cell, the operation takes O(n).</li>
</ul>
<div class="tip"><b>Tip:</b> if an interviewer asks "why is dict O(1)?", name three things: the hash function, the way collisions are resolved, and the load factor with rehashing. And be sure to add: "O(1) on average, O(n) in the worst case".</div>`,
      ex: [
        { prompt: 'A chaining table has 8 cells, and the rehash threshold is α &gt; 0.75. After adding which element will the first rehash happen?', options: ['the 6th', 'the 7th', 'the 8th', 'the 9th'], explain: '6 / 8 = 0.75, which does not exceed the threshold. 7 / 8 = 0.875 &gt; 0.75, so at the 7th element the table grows to 16 cells.' },
        {
          prompt: `Implement the class <code>HashMap</code> with chaining. Do not use Python's built-in <code>dict</code> inside it.
<ul>
<li><code>self.buckets</code>: a list of <code>capacity</code> lists (8 by default); each inner list holds <code>(key, value)</code> pairs. <code>self.size</code>: the number of elements.</li>
<li><code>put(key, value)</code>: replaces the value of an existing key or adds a new one. After adding, if <code>size / len(buckets) &gt; 0.75</code>, double the number of cells and redistribute all the pairs.</li>
<li><code>get(key, default=None)</code>, <code>remove(key)</code> (returns <code>True</code> if the key was removed and <code>False</code> if it was not there), and <code>__len__</code>.</li>
</ul>
The cell index is <code>hash(key) % len(self.buckets)</code>.`,
          starter: `class HashMap:
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
          hints: ['The helper method <code>_bucket(key)</code> returns the cell list. <code>put</code>, <code>get</code> and <code>remove</code> all use it.', 'Rehash: keep the old <code>buckets</code>, create new empty lists, and place each pair again by <code>hash(k) % m</code>.'],
          check: { tests: String.raw`
_m = HashMap()
_m.put("Алматы", 2000000); _m.put("Астана", 1400000); _m.put("Алматы", 2200000)
assert _m.get("Алматы") == 2200000, "put should replace the value of an existing key"
assert len(_m) == 2, "If the key repeats, size must not grow"
assert _m.get("Шымкент") is None and _m.get("Шымкент", 0) == 0, "A missing key returns the default"
assert _m.remove("Астана") is True and _m.remove("Астана") is False, "remove: True for an existing key, False for a missing one"
assert len(_m) == 1 and _m.get("Астана") is None, "A removed key must not be found"
_c = HashMap()
for _i in range(6):
    _c.put(_i, _i)
assert len(_c.buckets) == 8, "With 6 elements α = 0.75, there must be no rehash yet"
_c.put(6, 6)
assert len(_c.buckets) == 16, "At the 7th element the table must grow to 16 cells"
assert all(_c.get(_i) == _i for _i in range(7)), "After the rehash, all keys must be found"
assert all(isinstance(b, list) for b in _c.buckets), "buckets: a list of lists"
import time as _time
_big = HashMap()
_t0 = _time.perf_counter()
for _i in range(20000):
    _big.put(_i * 7, _i)
_ok = all(_big.get(_i * 7) == _i for _i in range(0, 20000, 3))
_dt = _time.perf_counter() - _t0
assert _ok and len(_big) == 20000, "The values are wrong after 20,000 keys"
assert max(len(b) for b in _big.buckets) <= 8, "The chains are too long: rehash when the load factor is exceeded"
assert _dt < 1.0, "20,000 put/get calls are too slow"
` } },
        {
          prompt: `Linear probing. <code>table</code> is a list of length <code>m</code>; a free cell holds <code>None</code>. The function <code>probe_insert(table, key)</code> puts the integer <code>key</code> into the first free cell, starting from the cell <code>key % m</code> (when it reaches the end, it continues from the beginning), and returns its index. If the key is already in the table, return its index and change nothing. If the table is full, return <code>-1</code>.
<pre><code>t = [None] * 5
probe_insert(t, 7)   → 2
probe_insert(t, 12)  → 3    # 12 % 5 = 2 is taken
probe_insert(t, 4)   → 4
probe_insert(t, 9)   → 0    # 4 is taken, wrap around to the start</code></pre>`,
          hints: ['Check no more than <code>m</code> cells: <code>for _ in range(m)</code>.', 'The next cell: <code>i = (i + 1) % m</code>.'],
          check: { tests: String.raw`
_t = [None] * 5
assert probe_insert(_t, 7) == 2, "7 % 5 = 2: a free cell"
assert probe_insert(_t, 12) == 3, "12 % 5 = 2 is taken, the next one is 3"
assert probe_insert(_t, 4) == 4, "4 % 5 = 4: free"
assert probe_insert(_t, 9) == 0, "9 % 5 = 4 is taken, wrap around to the start: 0"
assert _t == [9, None, 7, 12, 4], "The table state is wrong: " + str(_t)
assert probe_insert(_t, 12) == 3 and _t.count(12) == 1, "An existing key must not be added again"
assert probe_insert(_t, 1) == 1, "The last free cell is 1"
assert probe_insert(_t, 100) == -1, "The table is full: -1"
` } }
      ]
    },
    'alg-4': {
      title: 'Linear sorts and heapsort',
      body: `
<p>In DSA1 we saw insertion, merge and quick sort. Any comparison-based sort does at least <b>O(n log n)</b> comparisons in the worst case. But if the values are integers from a small range, they can be sorted in linear time without comparing elements at all.</p>
<h3>Counting sort</h3>
<p>Exam scores lie between 0 and 100. We count how many times each score appears, then output the scores in order. The time is O(n + k), where k is the size of the value range. If k is small (100), this is faster than <code>sorted</code>; if k is huge (10⁹), the array will not fit in memory.</p>
<pre><code>def counting_sort(a, max_value):
    count = [0] * (max_value + 1)
    for x in a:
        count[x] += 1
    out = []
    for v, c in enumerate(count):
        out.extend([v] * c)
    return out</code></pre>
<h3>Stability</h3>
<p>A sort is <b>stable</b> if elements with the same key keep their original order. When sorting students by score, those with the same score must stay in the list in the order they were in. To make counting sort stable, create a "bucket" list for each score, place the students one by one, and then join the buckets in order. Python's built-in <code>sorted</code> is also stable, so you can apply it several times in a row with different keys.</p>
<h3>Heapsort</h3>
<p>In DSA1 we used <code>heapq</code> as a ready-made tool. Now we will implement the heap ourselves. In an array, a <b>max-heap</b> works like this: the children of node <code>i</code> are at indices <code>2i + 1</code> and <code>2i + 2</code>, and a parent's value is never smaller than its children's. The key operation is <code>sift_down(a, i, n)</code>: we push the value at position <code>i</code> down, swapping it with the larger child (only the part <code>[0, n)</code> is treated as the heap).</p>
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
<p>Heapsort has two phases: (1) build the heap by calling <code>sift_down</code> for the indices from <code>n // 2 - 1</code> down to 0 (O(n)); (2) swap the largest <code>a[0]</code> with the last element, shrink the heap by one, and call <code>sift_down</code> from the root. The result: O(n log n) time, O(1) extra memory, but the sort is not stable.</p>
<table>
<tr><th>Algorithm</th><th>Average</th><th>Worst</th><th>Memory</th><th>Stable</th></tr>
<tr><td>Insertion</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>yes</td></tr>
<tr><td>Merge</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>yes</td></tr>
<tr><td>Quick</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>no</td></tr>
<tr><td>Heapsort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>no</td></tr>
<tr><td>Counting</td><td>O(n + k)</td><td>O(n + k)</td><td>O(n + k)</td><td>yes (with buckets)</td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li>Using <code>len(a)</code> as the heap bound in <code>sift_down</code>: the already sorted right part gets spoiled again.</li>
<li>Building the heap from index 0: you must go from the bottom up, in reverse order.</li>
<li>Applying counting sort to negative numbers or to a very wide range of values.</li>
</ul>
<div class="tip"><b>Tip:</b> in everyday Python, <code>sorted</code> is enough (it is Timsort: stable, O(n log n)). Know heapsort and counting sort for interviews and for special constraints: when memory must be O(1), or when the values are small integers.</div>`,
      ex: [
        {
          prompt: `<code>counting_sort(a, max_value)</code>: sort the integers from the range <code>0..max_value</code> in ascending order and return a new list. The test measures the time on 200,000 scores.
<pre><code>counting_sort([3, 0, 2, 3, 1], 3) → [0, 1, 2, 3, 3]
counting_sort([], 5)              → []</code></pre>`,
          starter: `def counting_sort(a, max_value):
    return a
`,
          hints: ['<code>count = [0] * (max_value + 1)</code>, then for each <code>x</code> run <code>count[x] += 1</code>.', 'Then: <code>out.extend([v] * c)</code>.'],
          check: { tests: String.raw`
assert counting_sort([3, 0, 2, 3, 1], 3) == [0, 1, 2, 3, 3], "Expected [0, 1, 2, 3, 3]"
assert counting_sort([], 5) == [], "Empty list: []"
assert counting_sort([0, 0], 0) == [0, 0], "max_value = 0"
assert counting_sort([5, 5, 5], 9) == [5, 5, 5], "All values are equal"
_src = [2, 1]
_res = counting_sort(_src, 2)
assert _src == [2, 1] and _res == [1, 2], "The original list must not change, a new list must be returned"
import random as _random, time as _time
_R = _random.Random(4)
_a = [_R.randint(0, 100) for _ in range(200000)]
_t0 = _time.perf_counter(); _s = counting_sort(_a, 100); _dt = _time.perf_counter() - _t0
assert _s == sorted(_a), "The large list was not sorted correctly"
assert _dt < 0.8, "200,000 elements is too slow"
` } },
        {
          prompt: `<code>stable_by_grade(students)</code>: <code>students</code> is a list of <code>(name, grade)</code> pairs, with grades from 0 to 100. Return the names in ascending order of grade; for equal grades, keep the original order. Write a stable counting sort with buckets.
<pre><code>stable_by_grade([("Дана", 90), ("Әли", 75), ("Ерлан", 90), ("Сая", 60)])
→ ["Сая", "Әли", "Дана", "Ерлан"]</code></pre>`,
          starter: `def stable_by_grade(students):
    return [name for name, _ in students]
`,
          hints: ['Create 101 empty lists and put each name in its bucket: <code>buckets[g].append(name)</code>.', 'Collect the buckets in order: <code>[name for b in buckets for name in b]</code>.'],
          check: { tests: String.raw`
assert stable_by_grade([("Дана", 90), ("Әли", 75), ("Ерлан", 90), ("Сая", 60)]) == ["Сая", "Әли", "Дана", "Ерлан"], "Dana must come before Yerlan (stability)"
assert stable_by_grade([]) == [], "Empty list"
assert stable_by_grade([("Б", 100), ("А", 0)]) == ["А", "Б"], "The edge grades 0 and 100"
assert stable_by_grade([("x", 50), ("y", 50), ("z", 50)]) == ["x", "y", "z"], "All grades are equal: the original order"
` } },
        {
          prompt: `Write heapsort yourself (without <code>heapq</code> and <code>sorted</code>).
<ul>
<li><code>sift_down(a, i, n)</code>: treating <code>[0, n)</code> as a max-heap, it pushes the value at position <code>i</code> down.</li>
<li><code>heapsort(a)</code>: sorts the list in ascending order <b>in place</b> and returns the same list.</li>
</ul>
<pre><code>a = [1, 9, 8, 3, 7]
sift_down(a, 0, 5)  → a == [9, 7, 8, 3, 1]
heapsort([5, 2, 9, 1]) → [1, 2, 5, 9]</code></pre>`,
          starter: `def sift_down(a, i, n):
    pass

def heapsort(a):
    return a
`,
          hints: ['Building the heap: <code>for i in range(n // 2 - 1, -1, -1): sift_down(a, i, n)</code>.', 'Second phase: swap <code>a[0]</code> and <code>a[end]</code>, then call <code>sift_down(a, 0, end)</code>.'],
          check: { tests: String.raw`
_a = [1, 9, 8, 3, 7]
sift_down(_a, 0, 5)
assert _a == [9, 7, 8, 3, 1], "the result of sift_down(a, 0, 5) must be [9, 7, 8, 3, 1], you got " + str(_a)
_b = [1, 9, 8]
sift_down(_b, 0, 1)
assert _b == [1, 9, 8], "If n = 1, nothing should change"
_c = [5, 2, 9, 1]
assert heapsort(_c) == [1, 2, 5, 9] and _c == [1, 2, 5, 9], "heapsort must sort the list in place"
assert heapsort([]) == [] and heapsort([4]) == [4], "An empty list and a one-element list"
assert heapsort([3, 3, 1, 3]) == [1, 3, 3, 3], "Repeated values"
import random as _random, time as _time
_R = _random.Random(8)
_x = [_R.randint(-10**6, 10**6) for _ in range(30000)]
_y = list(_x)
_t0 = _time.perf_counter(); heapsort(_y); _dt = _time.perf_counter() - _t0
assert _y == sorted(_x), "The large list was not sorted correctly"
assert _dt < 1.0, "30,000 elements is too slow: heapsort must run in O(n log n)"
` } },
        { prompt: 'You first sorted the orders by time, and now you sort them by city. Within one city, the time order must stay the same. Which algorithm is <b>not suitable</b> for the second sort?', options: ['Merge sort', 'Python <code>sorted</code>', 'Heapsort', 'Counting sort with buckets'], explain: 'Heapsort is not a stable sort: the order of elements with the same key may change. The other three are stable.' }
      ]
    },
    'alg-5': {
      title: 'Balanced trees: AVL and rotations',
      body: `
<p>In DSA1 we saw that searching and inserting in a BST take O(h), where h is the height of the tree. If the tree is "full", h ≈ log₂ n. But there is a problem: if the keys arrive <b>in sorted order</b> (for example, check numbers 1, 2, 3, ...), each new node is added on the right, and the tree turns into a list. Then h = n, and a search takes O(n).</p>
<h3>Height and the balance factor</h3>
<p>Let us agree that the height of an empty tree is 0 and the height of a single node is 1. The <b>balance factor</b> of a node is <code>height(left) - height(right)</code>. In an <b>AVL tree</b>, every node has a balance factor of -1, 0 or 1. The height of such a tree does not exceed about 1.44·log₂ n, so searching, inserting and deleting always take O(log n).</p>
<pre><code>class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))</code></pre>
<h3>Rotation</h3>
<p>If, after inserting a new key, the balance factor of some node becomes 2 or -2, we restore the balance with a <b>rotation</b>. A rotation does not break the BST order (the inorder traversal does not change); it only rearranges O(1) links.</p>
<pre><code>#        y                x
#       / \              / \
#      x   C    →       A   y
#     / \                  / \
#    A   B                B   C
def rotate_right(y):
    x = y.left
    y.left = x.right    # now B is the left child of y
    x.right = y
    return x            # the new root</code></pre>
<p>There are four cases:</p>
<ul>
<li><b>LL</b> (the left branch of the left subtree is the heavy one): one <code>rotate_right</code>.</li>
<li><b>RR</b>: one <code>rotate_left</code>.</li>
<li><b>LR</b>: first <code>rotate_left</code> on the left child, then <code>rotate_right</code> on the node itself.</li>
<li><b>RL</b>: the opposite.</li>
</ul>
<p>Example: if you insert 30, 10, 20 in that order, then 30 has 10 on its left, and 10 has 20 on its right (the LR case). Rotate 10 to the left, then rotate 30 to the right: the root becomes 20, with children 10 and 30.</p>
<h3>Red-black tree</h3>
<p>Another well-known balanced tree is the <b>red-black tree</b>. Each node is red or black, and the colour rules guarantee that the longest path is no more than twice as long as the shortest. An AVL tree is balanced more strictly (searching is slightly faster), while a red-black tree does fewer rotations (inserting and deleting are slightly faster). Java's <code>TreeMap</code> and C++'s <code>std::map</code> use red-black trees. The Python standard library has no balanced tree: a sorted list with <code>bisect</code> or <code>heapq</code> is often enough.</p>
<h3>Common mistakes</h3>
<ul>
<li>Not returning the new root from a rotation function: part of the tree is "lost".</li>
<li>Forgetting the line <code>y.left = x.right</code>: subtree B disappears.</li>
<li>Checking only the root in <code>is_balanced</code>: balance is needed at every node.</li>
</ul>
<div class="tip"><b>Tip:</b> <code>is_balanced</code> can be written in O(n): a helper function returns the height if the subtree is balanced, and -1 if not. Then each node's height is computed only once.</div>`,
      ex: [
        {
          prompt: `The class <code>Node</code> is given. Write two functions: <code>height(node)</code> (an empty tree is 0, a single node is 1) and <code>is_balanced(node)</code>, which returns <code>True</code> if at every node the heights of the left and right subtrees differ by at most 1.
<pre><code>height(None)                    → 0
is_balanced(Node(2, Node(1)))   → True
is_balanced(Node(3, Node(2, Node(1)))) → False</code></pre>`,
          starter: `class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def height(node):
    return 0

def is_balanced(node):
    return True
`,
          hints: ['<code>height</code>: <code>1 + max(height(node.left), height(node.right))</code>.', 'For <code>is_balanced</code>, a helper function returns -1 if the balance is broken, and the height otherwise.'],
          check: { tests: String.raw`
assert height(None) == 0 and height(Node(5)) == 1, "An empty tree is 0, a single node is 1"
_t = Node(8, Node(3, Node(1), Node(6, Node(4))), Node(10))
assert height(_t) == 4, "The path 8 → 3 → 6 → 4: height 4"
assert is_balanced(None) is True and is_balanced(Node(1)) is True, "An empty tree and a single node are balanced"
assert is_balanced(Node(2, Node(1))) is True, "Difference 1: balanced"
assert is_balanced(Node(3, Node(2, Node(1)))) is False, "Left height 2, right 0: not balanced"
assert is_balanced(_t) is False, "At node 8 the left is 3, the right is 1: not balanced"
_bad = Node(50, Node(30, Node(20, Node(10))), Node(70, None, Node(80, None, Node(90))))
assert is_balanced(_bad) is False, "The root difference is 0, but at nodes 30 and 70 it is 2: not balanced"
_ok = Node(4, Node(2, Node(1), Node(3)), Node(6, Node(5)))
assert is_balanced(_ok) is True, "This tree is balanced"
` } },
        {
          prompt: `<code>rotate_right(y)</code> and <code>rotate_left(x)</code> are rotations. Both functions return the new root, and the BST order is kept. <code>rotate_left</code>: <code>y = x.right</code>, <code>x.right = y.left</code>, <code>y.left = x</code>.
<pre><code>y = Node(30, Node(20, Node(10), Node(25)), Node(40))
r = rotate_right(y)   # r.key == 20, r.right.key == 30, r.right.left.key == 25</code></pre>`,
          starter: `class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def rotate_right(y):
    return y

def rotate_left(x):
    return x
`,
          hints: ['Three steps: take the new root, move the middle subtree (B) across, and make the old root a child of the new one.', 'At the end, return the new root with <code>return</code>.'],
          check: { tests: String.raw`
def _inorder(n):
    return _inorder(n.left) + [n.key] + _inorder(n.right) if n else []
_y = Node(30, Node(20, Node(10), Node(25)), Node(40))
_r = rotate_right(_y)
assert _r.key == 20 and _r.left.key == 10 and _r.right.key == 30, "rotate_right: the new root is 20, children 10 and 30"
assert _r.right.left.key == 25 and _r.right.right.key == 40, "Now 25 must be the left child of 30"
assert _inorder(_r) == [10, 20, 25, 30, 40], "After the rotation the inorder order must be kept"
_x = Node(1, None, Node(2, None, Node(3)))
_l = rotate_left(_x)
assert _l.key == 2 and _l.left.key == 1 and _l.right.key == 3, "The RR case: rotate_left makes 2 the root"
assert _l.left.right is None, "The right child of 1 must now be empty"
_z = Node(30, Node(10, None, Node(20)))
_z.left = rotate_left(_z.left)
_z = rotate_right(_z)
assert (_z.key, _z.left.key, _z.right.key) == (20, 10, 30), "The LR case: rotate_left, then rotate_right, the root is 20"
` } },
        {
          prompt: `Build the <b>most balanced</b> BST from sorted distinct keys: <code>build_balanced(keys)</code> returns the root (for an empty list, <code>None</code>). The middle element becomes the root, and the left and right halves are built recursively. The test on 10,000 keys checks that the height is 14 (with a chain it would be 10,000).`,
          starter: `class Node:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def build_balanced(keys):
    root = None
    return root
`,
          hints: ['Work with a half-open interval: <code>build(l, r)</code>, and when <code>l &gt;= r</code> it returns <code>None</code>.', 'The middle: <code>m = (l + r) // 2</code>, then <code>Node(keys[m], build(l, m), build(m + 1, r))</code>.'],
          check: { tests: String.raw`
def _h(n):
    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))
def _inorder(n, out):
    if n:
        _inorder(n.left, out); out.append(n.key); _inorder(n.right, out)
    return out
assert build_balanced([]) is None, "Empty list: None"
_one = build_balanced([7])
assert _one.key == 7 and _one.left is None and _one.right is None, "One key: a single node"
_t = build_balanced([1, 2, 3, 4, 5, 6, 7])
assert _t.key == 4 and _h(_t) == 3, "7 keys: root 4, height 3"
assert _inorder(_t, []) == [1, 2, 3, 4, 5, 6, 7], "inorder must return the sorted list"
import time as _time
_keys = list(range(0, 20000, 2))
_t0 = _time.perf_counter(); _big = build_balanced(_keys); _dt = _time.perf_counter() - _t0
assert _inorder(_big, []) == _keys, "The BST order is broken on 10,000 keys"
assert _h(_big) == 14, "For 10,000 keys the minimum height is 14, you got " + str(_h(_big))
assert _dt < 1.0, "Building is too slow"
` } },
        { prompt: 'You inserted the keys 1, 2, 3, ..., 1000 in this order into an <b>ordinary</b> (unbalanced) BST. What will the height of the tree be?', options: ['10', '11', '500', '1000'], explain: 'Each new key is larger than the previous one, so it goes into the right subtree: the tree becomes a chain of 1000 nodes. In an AVL tree the height would be around 10–11.' }
      ]
    },
    'alg-6': {
      title: 'Union-Find and connected components',
      body: `
<p>In DSA1 we counted components with BFS/DFS: that works well when the whole graph is known. But what if the connections <b>arrive one after another</b>? For example, new roads are being built in the Karaganda region, and after each one we ask: "are Temirtau and Balkhash connected?" Running a BFS each time is expensive. This is what the <b>Disjoint Set Union</b> (DSU, union-find) structure is for.</p>
<h3>The idea</h3>
<p>Each set has one "representative" (its root). <code>parent[x]</code> is the parent of x, and the parent of a root is the root itself. There are two operations:</p>
<ul>
<li><code>find(x)</code>: find the root of x.</li>
<li><code>union(a, b)</code>: merge two sets, that is, hang one root under the other.</li>
</ul>
<p>Two elements are in the same component if <code>find(a) == find(b)</code>.</p>
<h3>Two optimisations</h3>
<ul>
<li><b>Path compression:</b> during <code>find</code>, all the nodes on the path are attached directly to the root. Next time, they are found in one step.</li>
<li><b>Union by rank:</b> the tree of smaller height is attached under the tree of larger height, and not the other way round. <code>rank</code> is an upper bound on the height of the tree.</li>
</ul>
<p>Together they give an amortised time of O(α(n)) per operation, where α is the inverse Ackermann function, which in practice never exceeds 5. So it is almost O(1).</p>
<pre><code>class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n                  # number of components

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
            return False                # already in the same set
        if self.rank[ra] &lt; self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        self.count -= 1
        return True</code></pre>
<p><code>find</code> is written iteratively: a recursive version on a long chain may hit Python's recursion limit.</p>
<h3>Finding a cycle</h3>
<p>We add the edges of an undirected graph one after another. If <code>union(u, v)</code> returns <code>False</code>, then u and v are already connected, and the new edge creates a <b>cycle</b>. This is the basis of Kruskal's algorithm in the next lesson.</p>
<h3>Common mistakes</h3>
<ul>
<li>Merging the elements themselves instead of the roots: <code>parent[a] = b</code> instead of the roots. The sets are then merged incorrectly.</li>
<li>Decreasing <code>count</code> when two elements of the same set are joined.</li>
<li>When working with names (string keys), forgetting to convert them to indices first: <code>idx = {name: i for i, name in enumerate(names)}</code>.</li>
</ul>
<div class="tip"><b>Tip:</b> questions like "merge the groups", "are they on the same network", "will a cycle appear when we add this?" point to DSU. If you need a "shortest path" or "in which order", you need BFS/DFS: DSU does not know the path.</div>`,
      ex: [
        {
          prompt: `Write the class <code>DSU</code>: the fields <code>parent</code>, <code>rank</code>, <code>count</code>; the method <code>find(x)</code> with path compression (iterative); the method <code>union(a, b)</code> with union by rank: it returns <code>True</code> if the two sets were different, and <code>False</code> if the elements are already in one set. The field <code>count</code> decreases only on a merge. The test checks the speed on 100,000 elements.`,
          starter: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x):
        return x

    def union(self, a, b):
        return True
`,
          hints: ['<code>find</code>: first find the root, then in a second loop set the <code>parent</code> of every node on the path to the root.', '<code>union</code>: hang the root with the smaller rank under the root with the larger one; if the ranks are equal, increase the rank of the new root by 1.'],
          check: { tests: String.raw`
_d = DSU(5)
assert _d.union(0, 1) is True and _d.union(1, 2) is True, "A new union returns True"
assert _d.union(0, 2) is False, "0 and 2 are already in one set: False"
assert _d.count == 3, "{0,1,2}, {3}, {4}: 3 components"
assert _d.find(2) == _d.find(0) and _d.find(3) != _d.find(0), "The roots returned by find are wrong"
_c = DSU(5)
_c.parent = [0, 0, 1, 2, 3]
assert _c.find(4) == 0, "The chain 4 → 3 → 2 → 1 → 0: root 0"
assert _c.parent[4] == 0 and _c.parent[3] == 0 and _c.parent[2] == 0, "Path compression: the nodes on the path must be attached directly to the root"
_e = DSU(4)
_e.union(0, 1); _e.union(2, 3)
_e.union(0, 2)
assert max(_e.rank) == 2, "Union by rank: when roots with equal rank are joined, the rank grows by 1"
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
assert _big.count == 1, "After joining the chain there is 1 component"
assert _dt < 1.5, "100,000 union and find calls are too slow: add path compression and union by rank"
` } },
        {
          prompt: `The students are friends with each other. <code>count_groups(names, friendships)</code>: <code>names</code> is a list of names, <code>friendships</code> is a list of <code>(name1, name2)</code> pairs. Friendship is transitive: a friend of my friend is in the same group. Return the number of groups using DSU.
<pre><code>count_groups(["Әли", "Дана", "Ерлан", "Сая"], [("Әли", "Дана"), ("Ерлан", "Дана")]) → 2
count_groups([], [])                                                       → 0</code></pre>`,
          starter: `def count_groups(names, friendships):
    return len(names)
`,
          hints: ['Convert the names to indices: <code>idx = {name: i for i, name in enumerate(names)}</code>.', 'Each successful union reduces the number of groups by 1.'],
          check: { tests: String.raw`
assert count_groups(["Әли", "Дана", "Ерлан", "Сая"], [("Әли", "Дана"), ("Ерлан", "Дана")]) == 2, "{Ali, Dana, Yerlan} and {Saya}: 2 groups"
assert count_groups([], []) == 0, "No students: 0"
assert count_groups(["А", "Б", "В"], []) == 3, "No friendships: everyone is in a group of their own"
assert count_groups(["А", "Б"], [("А", "Б"), ("Б", "А"), ("А", "Б")]) == 1, "A repeated friendship must not reduce the number of groups"
assert count_groups(["А"], [("А", "А")]) == 1, "Friendship with oneself: 1 group"
import random as _random, time as _time
_R = _random.Random(1)
_names = ["s" + str(i) for i in range(20000)]
_pairs = [(_names[i], _names[i + 1]) for i in range(0, 19999, 2)]
_t0 = _time.perf_counter(); _g = count_groups(_names, _pairs); _dt = _time.perf_counter() - _t0
assert _g == 10000, "20,000 students, in pairs: 10,000 groups"
assert _dt < 1.0, "Too slow: use DSU"
` } },
        {
          prompt: `Roads are added to a network of cities one at a time. <code>first_cycle_edge(n, edges)</code>: <code>n</code> cities (<code>0..n-1</code>), <code>edges</code> are undirected roads <code>(u, v)</code>. Return the <b>first</b> road that closes a cycle (in the form it is given), or <code>None</code> if there is no cycle.
<pre><code>first_cycle_edge(4, [(0, 1), (1, 2), (2, 0), (2, 3)]) → (2, 0)
first_cycle_edge(3, [(0, 1), (1, 2)])                 → None</code></pre>`,
          starter: `def first_cycle_edge(n, edges):
    return None
`,
          hints: ['If <code>find(u) == find(v)</code> for an edge, then this edge closes a cycle.', 'Otherwise join the roots: <code>parent[ru] = rv</code>.'],
          check: { tests: String.raw`
assert first_cycle_edge(4, [(0, 1), (1, 2), (2, 0), (2, 3)]) == (2, 0), "The third edge closes the cycle 0-1-2"
assert first_cycle_edge(3, [(0, 1), (1, 2)]) is None, "A tree has no cycle"
assert first_cycle_edge(2, [(0, 1), (1, 0)]) == (1, 0), "The second road between two cities also makes a cycle"
assert first_cycle_edge(1, [(0, 0)]) == (0, 0), "An edge from a city to itself: a cycle"
assert first_cycle_edge(5, []) is None, "No edges: None"
import time as _time
_n = 100000
_edges = [(_i, _i + 1) for _i in range(_n - 1)] + [(_n - 1, 0)]
_t0 = _time.perf_counter(); _r = first_cycle_edge(_n, _edges); _dt = _time.perf_counter() - _t0
assert _r == (_n - 1, 0), "The last edge of the long chain closes the cycle"
assert _dt < 1.0, "100,000 edges is too slow: use path compression"
` } },
        { prompt: 'The DSU uses <b>only</b> union by rank (no path compression). What is the worst-case time of one <code>find</code> call?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], explain: 'Union by rank keeps the height of the tree at O(log n): rank k means that the tree has at least 2ᵏ nodes. If path compression is added, the amortised time becomes O(α(n)).' }
      ]
    },
    'alg-7': {
      title: 'Dijkstra: the shortest path in a weighted graph',
      body: `
<p>In DSA1, BFS finds the shortest path when all edges are the same, and we have already seen the core code of Dijkstra in one problem. Now we will understand the algorithm fully: why it works, how to recover the path, and when it <b>does not work</b>.</p>
<h3>A weighted graph</h3>
<p>Bus routes between cities: <code>graph["Алматы"] = [("Қонаев", 70), ("Талдықорған", 270)]</code>. The weight of each edge (km, minutes, tenge) is non-negative. The goal: for every city other than the start, find the smallest distance from the start.</p>
<h3>The algorithm</h3>
<p>The heap holds <code>(distance, vertex)</code> pairs. At each step we take the nearest vertex out of the heap. Since all weights are non-negative, no shorter path to it can be found later: its distance is "fixed". Then we <b>relax</b> its neighbours: if the new path is shorter, we update the value and push an entry onto the heap. A vertex may appear in the heap several times; we skip an outdated entry (<code>d &gt; dist[u]</code>).</p>
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
                prev[v] = u            # we reached v through u
                heapq.heappush(h, (nd, v))
    return dist, prev</code></pre>
<p>The complexity is O((V + E) log V). Since only a <code>dict</code> is used, the vertices can be any hashable values: a city name or a tuple <code>(r, c)</code> on a grid.</p>
<h3>Recovering the path</h3>
<p><code>prev[v]</code> stores where we came from to each vertex. Starting from the target, walk back through <code>prev</code> and reverse the list:</p>
<pre><code>path = [dst]
while path[-1] != src:
    path.append(prev[path[-1]])
path.reverse()     # ['Алматы', 'Қонаев', ...]</code></pre>
<h3>Why a negative weight breaks the algorithm</h3>
<p>Dijkstra "assumes" that a vertex taken out of the heap will never get a smaller distance. With a negative edge this is false: if A → C = 2 is already fixed, the path A → B → C = 5 + (−4) = 1 can turn out to be shorter. For such a graph you need the <b>Bellman-Ford</b> algorithm: it relaxes all edges V − 1 times, O(V·E). If one more relaxation is still possible after that, the graph has a <b>negative cycle</b>: the distance can be decreased endlessly through it.</p>
<h3>Common mistakes</h3>
<ul>
<li>Putting <code>(vertex, distance)</code> into the heap instead of <code>(distance, vertex)</code>: the heap then sorts by the vertex name.</li>
<li>Not skipping outdated entries: the result is still correct, but the work is slower.</li>
<li>Ignoring vertices that appear only as neighbours: use <code>graph.get(u, [])</code>.</li>
<li>Not checking for an unreachable vertex: if it is not in <code>prev</code>, there is no path.</li>
</ul>
<div class="tip"><b>Tip:</b> if you need a path to only one target, you can stop as soon as that target is taken out of the heap. On large maps this noticeably speeds things up.</div>`,
      ex: [
        {
          prompt: `<code>dijkstra(graph, src)</code>: <code>graph</code> is a dictionary vertex → <code>[(neighbour, weight), ...]</code>. Return a dictionary of the shortest distances to all reachable vertices. Some vertices appear only as neighbours. The test checks the speed on a 100×100 grid.
<pre><code>g = {"Алматы": [("Қонаев", 70), ("Талдықорған", 270)],
     "Қонаев": [("Талдықорған", 180)]}
dijkstra(g, "Алматы") → {"Алматы": 0, "Қонаев": 70, "Талдықорған": 250}</code></pre>`,
          starter: `import heapq

def dijkstra(graph, src):
    return {src: 0}
`,
          hints: ['Put <code>(distance, vertex)</code> into the heap; if <code>d &gt; dist[u]</code>, then <code>continue</code>.', 'Neighbours: <code>graph.get(u, [])</code>.'],
          check: { tests: String.raw`
_g = {"Алматы": [("Қонаев", 70), ("Талдықорған", 270)], "Қонаев": [("Талдықорған", 180)]}
assert dijkstra(_g, "Алматы") == {"Алматы": 0, "Қонаев": 70, "Талдықорған": 250}, "Via Қонаев the route is shorter: 250 km"
assert dijkstra(_g, "Талдықорған") == {"Талдықорған": 0}, "No outgoing roads: only the city itself"
assert dijkstra({}, "X") == {"X": 0}, "Empty graph: {src: 0}"
_g2 = {"a": [("b", 1), ("c", 4)], "b": [("c", 1), ("d", 5)], "c": [("d", 1)], "e": [("a", 1)]}
assert dijkstra(_g2, "a") == {"a": 0, "b": 1, "c": 2, "d": 3}, "a → b → c → d = 3; e cannot be reached"
assert dijkstra({"a": [("b", 0)]}, "a") == {"a": 0, "b": 0}, "A zero weight"
import random as _random, time as _time
_R = _random.Random(10)
_N = 100
_G = {}
for _r in range(_N):
    for _c in range(_N):
        _G[(_r, _c)] = [((_r + dr, _c + dc), _R.randint(1, 9)) for dr, dc in ((1, 0), (0, 1), (-1, 0), (0, -1)) if 0 <= _r + dr < _N and 0 <= _c + dc < _N]
_t0 = _time.perf_counter(); _D = dijkstra(_G, (0, 0)); _dt = _time.perf_counter() - _t0
assert len(_D) == _N * _N, "Every cell of the grid can be reached"
assert all(_D[v] <= _D[u] + w for u in _G for v, w in _G[u]), "The distances are not minimal: one edge can still reduce them"
assert _dt < 1.5, "10,000 vertices is too slow: use heapq"
` } },
        {
          prompt: `<code>shortest_route(graph, src, dst)</code>: return <code>(distance, path)</code>, where the path is the list of vertices from <code>src</code> to <code>dst</code>. If the destination cannot be reached, return <code>(None, [])</code>. If <code>src == dst</code>, return <code>(0, [src])</code>. Keep a <code>prev</code> dictionary.
<pre><code>g = {"Астана": [("Қарағанды", 220), ("Көкшетау", 300)],
     "Қарағанды": [("Балқаш", 380)], "Көкшетау": [("Балқаш", 700)]}
shortest_route(g, "Астана", "Балқаш") → (600, ["Астана", "Қарағанды", "Балқаш"])</code></pre>`,
          starter: `import heapq

def shortest_route(graph, src, dst):
    return (None, [])
`,
          hints: ['When relaxing, record <code>prev[v] = u</code>.', 'For the path: start from <code>dst</code> and follow <code>prev</code> back to <code>src</code>, then call <code>reverse()</code> on the list.'],
          check: { tests: String.raw`
_g = {"Астана": [("Қарағанды", 220), ("Көкшетау", 300)], "Қарағанды": [("Балқаш", 380)], "Көкшетау": [("Балқаш", 700)]}
assert shortest_route(_g, "Астана", "Балқаш") == (600, ["Астана", "Қарағанды", "Балқаш"]), "Via Қарағанды: 600 km"
assert shortest_route(_g, "Астана", "Астана") == (0, ["Астана"]), "src == dst: (0, [src])"
assert shortest_route(_g, "Балқаш", "Астана") == (None, []), "No route in the reverse direction: (None, [])"
assert shortest_route(_g, "Астана", "Атырау") == (None, []), "The city is not in the graph: (None, [])"
_g2 = {1: [(2, 7), (3, 9), (6, 14)], 2: [(3, 10), (4, 15)], 3: [(4, 11), (6, 2)], 4: [(5, 6)], 6: [(5, 9)]}
assert shortest_route(_g2, 1, 5) == (20, [1, 3, 6, 5]), "1 → 3 → 6 → 5 = 20"
assert shortest_route(_g2, 1, 4) == (20, [1, 3, 4]), "1 → 3 → 4 = 20"
import time as _time
_line = {_i: [(_i + 1, 1), (_i + 2, 3)] for _i in range(20000)}
_t0 = _time.perf_counter(); _d, _p = shortest_route(_line, 0, 20000); _dt = _time.perf_counter() - _t0
assert _d == 20000 and len(_p) == 20001, "The path on the long chain is wrong"
assert _dt < 1.0, "Too slow"
` } },
        { prompt: 'Edges: A→B = 5, A→C = 2, B→C = −4. Dijkstra started from A fixes which distance to C, and what is the true shortest distance?', options: ['Fixes 2, true value 2', 'Fixes 2, true value 1', 'Fixes 1, true value 1', 'Fixes 5, true value 1'], explain: 'C (2) is taken out of the heap first and gets fixed. Later, a path through B gives 5 + (−4) = 1, but C is already fixed. A graph with negative weights needs Bellman-Ford.' },
        {
          prompt: `<code>bellman_ford(n, edges, src)</code>: <code>n</code> vertices, <code>edges</code> are directed edges <code>(u, v, w)</code>, and a weight can be negative. Return the list of shortest distances (an unreachable vertex gets <code>float("inf")</code>). If a negative cycle is reachable from <code>src</code>, return <code>None</code>. Relax all edges <code>n - 1</code> times, then check once more.
<pre><code>bellman_ford(3, [(0, 1, 5), (0, 2, 2), (1, 2, -4)], 0) → [0, 5, 1]
bellman_ford(2, [(0, 1, 1), (1, 0, -2)], 0)            → None</code></pre>`,
          starter: `def bellman_ford(n, edges, src):
    return [0] * n
`,
          hints: ['<code>dist[src] = 0</code>, the rest are <code>float("inf")</code>. <code>inf + w</code> stays <code>inf</code>, so unreachable vertices are not relaxed.', 'On the final check, if any edge still reduces a distance, return <code>None</code>.'],
          check: { tests: String.raw`
_inf = float("inf")
assert bellman_ford(3, [(0, 1, 5), (0, 2, 2), (1, 2, -4)], 0) == [0, 5, 1], "Through the negative edge, C gets 1"
assert bellman_ford(2, [(0, 1, 1), (1, 0, -2)], 0) is None, "The cycle 0 → 1 → 0 sums to -1: a negative cycle"
assert bellman_ford(3, [(0, 1, 4)], 0) == [0, 4, _inf], "An unreachable vertex: inf"
assert bellman_ford(1, [], 0) == [0], "One vertex"
assert bellman_ford(4, [(0, 1, 1), (2, 3, -1), (3, 2, -1)], 0) == [0, 1, _inf, _inf], "A negative cycle that cannot be reached from src does not affect the result"
assert bellman_ford(4, [(2, 3, 1), (1, 2, 1), (0, 1, 1)], 0) == [0, 1, 2, 3], "Correct even when the edges are given in reverse order"
import time as _time
_n = 300
_E = [(_i, _i + 1, 2) for _i in range(_n - 1)] + [(0, _i, 1000) for _i in range(1, _n)]
_t0 = _time.perf_counter(); _r = bellman_ford(_n, _E, 0); _dt = _time.perf_counter() - _t0
assert _r[-1] == 2 * (_n - 1), "The distance on the long chain is wrong"
assert _dt < 1.0, "Too slow: do not make more than n - 1 passes"
` } }
      ]
    },
    'alg-8': {
      title: 'Minimum spanning tree: Kruskal and Prim',
      body: `
<p>The regional administration wants to connect five villages with asphalt roads. The cost of building a road between any two villages is known. All the villages must end up in one network (directly or through another village), and the total cost must be as low as possible. This is the <b>minimum spanning tree</b> (MST) problem.</p>
<h3>Definition</h3>
<p>A <b>spanning tree</b> of a connected undirected graph with n vertices is a subgraph that contains all the vertices, has no cycles, and consists of n − 1 edges. An MST is the spanning tree with the smallest sum of edge weights. Do not confuse it with the shortest path: an MST does not give the shortest route between two particular cities; it reduces the total cost of the whole network.</p>
<h3>Kruskal</h3>
<p>The idea is very simple: sort the edges by weight and take the cheapest ones. If an edge would form a cycle (its ends are already connected), skip it. The cycle check is done with the DSU from the previous lesson.</p>
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
    return total if used == n - 1 else None   # None: the graph is not connected

roads = [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]
print(kruskal(5, roads))   # 1 + 2 + 3 + 5 = 11</code></pre>
<p>Complexity: the sort takes O(E log E), and each DSU operation takes almost O(1).</p>
<h3>Prim</h3>
<p>Prim "grows" the tree from a single vertex. The heap holds the edges that leave the tree. At each step we take the cheapest edge; if its other end is not in the tree yet, we add that vertex and push its edges onto the heap. This is similar to Dijkstra, but the heap receives <code>w</code>, not <code>d + w</code>. On a dense graph (many edges) Prim is more convenient; on a sparse one, Kruskal is.</p>
<h3>Why the greedy choice works</h3>
<p><b>Cut property:</b> if you split the vertices into two non-empty sets, the cheapest edge joining them must belong to some MST. Kruskal and Prim choose exactly such an edge at each step. This is a good example of the proofs for greedy algorithms in the next lesson.</p>
<h3>Common mistakes</h3>
<ul>
<li>Not checking whether the graph is connected: if fewer than n − 1 edges are collected, there is no MST.</li>
<li>In Prim, not checking whether the vertex taken from the heap is already in the tree: its cost would be added twice.</li>
<li>Thinking of the MST as the shortest path.</li>
</ul>
<div class="tip"><b>Tip:</b> if some roads are <b>already built</b>, first join them in the DSU (their cost is 0), then continue Kruskal with the remaining roads. Such tasks often come up in infrastructure planning.</div>`,
      ex: [
        {
          prompt: `<code>mst_cost(n, roads)</code>: <code>n</code> villages (<code>0..n-1</code>), <code>roads</code>: <code>(u, v, cost)</code>. Return the minimum cost of connecting all the villages, using Kruskal and the DSU. If it is impossible to connect them all, return <code>None</code>. When <code>n = 1</code>, return 0.
<pre><code>mst_cost(5, [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]) → 11
mst_cost(3, [(0, 1, 2)])                                                     → None</code></pre>`,
          starter: `def mst_cost(n, roads):
    return sum(c for _, _, c in roads)
`,
          hints: ['Sort the edges with <code>sorted(roads, key=lambda e: e[2])</code>.', 'Count the edges you added: if at the end there are not <code>n - 1</code> of them, return <code>None</code>.'],
          check: { tests: String.raw`
assert mst_cost(5, [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (3, 4, 3)]) == 11, "MST: 1 + 2 + 3 + 5 = 11"
assert mst_cost(3, [(0, 1, 2)]) is None, "Two villages are not connected: None"
assert mst_cost(1, []) == 0, "One village: 0"
assert mst_cost(2, [(0, 1, 7), (0, 1, 3)]) == 3, "Among parallel roads, take the cheapest one"
assert mst_cost(3, [(0, 1, 1), (1, 2, 1), (0, 2, 1)]) == 2, "Equal costs: 2 roads are enough"
assert mst_cost(4, [(0, 1, 5), (2, 3, 0), (1, 2, -1)]) == 4, "Zero and negative costs must work too"
import random as _random, time as _time
_R = _random.Random(13)
_n = 3000
_E = [(_i, _i + 1, 1000) for _i in range(_n - 1)] + [(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 999)) for _ in range(30000)]
_t0 = _time.perf_counter(); _c = mst_cost(_n, _E); _dt = _time.perf_counter() - _t0
assert _c is not None and _c < 1000 * (_n - 1), "The MST on a large graph is wrong"
assert _dt < 1.0, "30,000 edges is too slow: use path compression in the DSU"
` } },
        {
          prompt: `The Prim algorithm. <code>prim_cost(adj)</code>: <code>adj</code> is an undirected graph, city → <code>[(neighbour, price), ...]</code> (each edge is listed from both sides). Start from any city and, using <code>heapq</code>, return the cost of the MST. If the graph is not connected, return <code>None</code>; for an empty graph, return 0.
<pre><code>adj = {"Ақтау": [("Жаңаөзен", 150), ("Форт", 200)],
       "Жаңаөзен": [("Ақтау", 150), ("Форт", 400)],
       "Форт": [("Ақтау", 200), ("Жаңаөзен", 400)]}
prim_cost(adj) → 350</code></pre>`,
          starter: `import heapq

def prim_cost(adj):
    return 0
`,
          hints: ['Push <code>(price, city)</code> onto the heap. If the city taken out is already in <code>seen</code>, skip it.', 'At the end, if <code>len(seen) == len(adj)</code> does not hold, the graph is not connected.'],
          check: { tests: String.raw`
_adj = {"Ақтау": [("Жаңаөзен", 150), ("Форт", 200)], "Жаңаөзен": [("Ақтау", 150), ("Форт", 400)], "Форт": [("Ақтау", 200), ("Жаңаөзен", 400)]}
assert prim_cost(_adj) == 350, "150 + 200 = 350"
assert prim_cost({}) == 0, "Empty graph: 0"
assert prim_cost({"А": []}) == 0, "One city: 0"
assert prim_cost({"А": [("Б", 1)], "Б": [("А", 1)], "В": []}) is None, "V is not connected: None"
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
assert _c == _ref, "The Prim result does not match the Kruskal result"
assert _dt < 1.0, "Too slow: use heapq"
` } },
        { prompt: 'A connected graph of 6 cities has 10 roads, and all the prices are different. Which of these statements is <b>always</b> true?', options: ['The MST will have 6 roads', 'The cheapest road is certainly included in the MST', 'The most expensive road is never included in the MST', 'The MST gives the shortest path between any two cities'], explain: 'If you separate one end of the cheapest road as a group of its own, then by the cut property this road belongs to the MST (Kruskal takes it first). An MST has n − 1 = 5 roads. The most expensive road may be included if it is the only bridge. The MST does not solve the shortest path problem.' }
      ]
    },
    'alg-9': {
      title: 'Greedy algorithms',
      body: `
<p>A <b>greedy</b> algorithm makes, at each step, the choice that "looks best right now", and it never goes back on it. Kruskal and Dijkstra were greedy algorithms. Greedy is fast and simple, but risky: for many problems it gives a wrong answer. So the main question is: <b>why</b> does greedy work here?</p>
<h3>Interval scheduling</h3>
<p>A coworking space in Shymkent has one meeting room. Teams ask for bookings for time intervals <code>[start, end)</code>. How do we fit in the largest number of meetings? There are several "intuitive" rules: take the one that starts first, or take the shortest one. Both are wrong. The correct rule: take the one that <b>ends earliest</b>.</p>
<pre><code>def max_meetings(intervals):
    count, free_at = 0, float("-inf")
    for s, e in sorted(intervals, key=lambda x: x[1]):
        if s &gt;= free_at:         # [s, e) starts after the room is free
            count += 1
            free_at = e
    return count

print(max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]))   # 2</code></pre>
<p>Because the interval is half-open, a new meeting can start at 11:00 right after a meeting that ended at 11:00: <code>s &gt;= free_at</code>.</p>
<h3>Exchange argument: an informal proof</h3>
<p>Take any optimal schedule. Replace its first meeting with our chosen one (the one that ends earliest). Our meeting ends no later, so it does not get in the way of the others: the schedule is still valid, and the number of meetings does not change. If we repeat this swap at every step, the optimal schedule turns into our greedy schedule. So greedy is optimal. This technique is called the <b>exchange argument</b>: "if you move an optimal solution towards the greedy choice, it does not get worse".</p>
<h3>Change: when greedy works</h3>
<p>A cashier gives change with coins of 1, 2, 5, 10, 20, 50, 100 and 200 tenge. Greedy: take the largest coin as many times as possible. In such "canonical" systems, greedy gives the smallest number of coins. But if the system is different:</p>
<pre><code>coins = [1, 3, 4], amount = 6
greedy:  4 + 1 + 1   → 3 coins
optimal: 3 + 3       → 2 coins</code></pre>
<p>Here greedy makes a mistake. For the optimal answer you need the DP from DSA1 (coin change). To check a coin system, you can compare the greedy and DP results on many amounts: this is one of the next tasks.</p>
<h3>How to recognise a greedy problem</h3>
<ul>
<li>The choice is "local" and does not get in the way of later choices.</li>
<li>After sorting, a single pass is enough (intervals, tasks, grades).</li>
<li>You can build an exchange argument.</li>
<li>If you cannot find a counterexample (by comparing with brute force on small inputs), your trust in greedy grows.</li>
</ul>
<h3>Common mistakes</h3>
<ul>
<li>Sorting intervals by their start time (instead of their end time).</li>
<li>Applying greedy without a proof: in the 0/1 knapsack, "take the item with the highest value per unit of weight" is a mistake (for the fractional knapsack it is correct).</li>
<li>Forgetting the boundary equality: the difference between <code>&gt;</code> and <code>&gt;=</code>.</li>
</ul>
<div class="tip"><b>Tip:</b> once you have an idea for a greedy solution, compare it straight away with brute force on random small inputs. If a counterexample turns up, the problem is probably closer to DP.</div>`,
      ex: [
        {
          prompt: `<code>max_meetings(intervals)</code>: bookings as half-open intervals <code>(start, end)</code>, that is, <code>[start, end)</code>. Return the largest number of meetings that can be held in one room without overlapping. The test checks the speed on 100,000 bookings.
<pre><code>max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]) → 2
max_meetings([(1, 2), (2, 3), (3, 4)])                → 3
max_meetings([])                                      → 0</code></pre>`,
          starter: `def max_meetings(intervals):
    return len(intervals)
`,
          hints: ['Sort by the end time: <code>key=lambda x: x[1]</code>.', 'Take a meeting if it starts after the room is free, or at that very moment: <code>s &gt;= free_at</code>.'],
          check: { tests: String.raw`
assert max_meetings([(9, 12), (10, 11), (11, 13), (12, 14)]) == 2, "Expected 2: (10, 11) and (11, 13), or (12, 14)"
assert max_meetings([(1, 2), (2, 3), (3, 4)]) == 3, "Touching intervals do not overlap: 3"
assert max_meetings([]) == 0, "No bookings: 0"
assert max_meetings([(0, 10), (1, 2), (2, 3), (3, 4)]) == 3, "The long meeting must not be taken: 3"
assert max_meetings([(5, 6), (5, 6)]) == 1, "Of two identical bookings only one counts"
import random as _random, time as _time
from itertools import combinations as _comb
_R = _random.Random(14)
def _ok(sel):
    sel = sorted(sel)
    return all(sel[i][1] <= sel[i + 1][0] for i in range(len(sel) - 1))
for _ in range(40):
    _iv = [(s, s + _R.randint(1, 4)) for s in (_R.randint(0, 10) for _ in range(_R.randint(1, 7)))]
    _best = max(k for k in range(len(_iv) + 1) if any(_ok(c) for c in _comb(_iv, k)))
    assert max_meetings(_iv) == _best, "Does not match brute force: " + str(_iv)
_big = [(s, s + _R.randint(1, 50)) for s in (_R.randint(0, 10**6) for _ in range(100000))]
_t0 = _time.perf_counter(); max_meetings(_big); _dt = _time.perf_counter() - _t0
assert _dt < 1.0, "100,000 bookings is too slow: one sort and one pass are enough"
` } },
        {
          prompt: `<code>greedy_change(coins, amount)</code>: starting from the largest coin, take it while you can, and return the list of coins used, in descending order. If greedy cannot make the amount exactly, return <code>None</code>. <code>coins</code> may be unsorted.
<pre><code>greedy_change([1, 5, 10, 2], 18) → [10, 5, 2, 1]
greedy_change([1, 3, 4], 6)      → [4, 1, 1]
greedy_change([5, 3], 7)         → None    # took 5, 2 is left</code></pre>`,
          starter: `def greedy_change(coins, amount):
    return []
`,
          hints: ['<code>sorted(coins, reverse=True)</code>, and for each coin <code>k = amount // c</code>.', 'At the end, if <code>amount</code> is not 0, return <code>None</code>.'],
          check: { tests: String.raw`
assert greedy_change([1, 5, 10, 2], 18) == [10, 5, 2, 1], "18 = 10 + 5 + 2 + 1"
assert greedy_change([1, 3, 4], 6) == [4, 1, 1], "Greedy gives [4, 1, 1] (not optimal, but that is what greedy does)"
assert greedy_change([5, 3], 7) is None, "After taking 5, 2 is left: None"
assert greedy_change([2, 1], 0) == [], "Sum 0: []"
assert greedy_change([200, 100, 50, 20, 10, 5, 2, 1], 389) == [200, 100, 50, 20, 10, 5, 2, 2], "389 tenge: 8 coins"
` } },
        {
          prompt: `<code>first_greedy_failure(coins, limit)</code>: among the sums <code>1..limit</code>, find the <b>smallest</b> sum for which greedy takes more coins than the optimum (or cannot make the sum at all, although an optimum exists). If there is no such sum, return <code>None</code>. Compute the optimal number of coins with a DP: <code>best[x] = min(best[x - c] + 1)</code>.
<pre><code>first_greedy_failure([1, 3, 4], 20)                 → 6
first_greedy_failure([1, 7, 10], 50)                → 14
first_greedy_failure([1, 2, 5, 10, 20, 50], 1000)   → None</code></pre>`,
          starter: `def first_greedy_failure(coins, limit):
    return None
`,
          hints: ['First the DP: <code>best = [0] + [inf] * limit</code>, and for each <code>x</code> go through all the coins.', 'The greedy count: <code>cnt += rest // c</code>, <code>rest %= c</code>. If the sum cannot be made, treat the greedy count as infinite.'],
          check: { tests: String.raw`
assert first_greedy_failure([1, 3, 4], 20) == 6, "6: greedy gives 4+1+1, the optimal is 3+3"
assert first_greedy_failure([1, 7, 10], 50) == 14, "14: greedy gives 10+1+1+1+1, the optimal is 7+7"
assert first_greedy_failure([1, 2, 5, 10, 20, 50], 1000) is None, "In a canonical system greedy is always optimal"
assert first_greedy_failure([1, 3, 4], 5) is None, "Up to 5 greedy is correct"
assert first_greedy_failure([4, 3], 10) == 6, "6: greedy takes 4 and gets stuck, the optimal is 3+3"
assert first_greedy_failure([2], 9) is None, "Odd sums cannot be made at all: this is not a greedy mistake"
import time as _time
_t0 = _time.perf_counter(); _r = first_greedy_failure([1, 2, 5, 10, 20, 50, 100, 200], 20000); _dt = _time.perf_counter() - _t0
assert _r is None, "The tenge coins are canonical: None"
assert _dt < 1.5, "Too slow: the DP must run in O(limit · len(coins))"
` } },
        { prompt: 'For interval scheduling, which greedy rule <b>always</b> gives the largest number of meetings?', options: ['Take the meeting that starts first', 'Take the shortest meeting', 'Take the meeting that ends first', 'Take the meeting that overlaps the others least'], explain: 'The meeting that ends first frees the room the earliest. Exchange argument: if the first meeting of an optimal schedule is replaced with it, the schedule does not break. Each of the other rules has a counterexample.' }
      ]
    },
    'alg-10': {
      title: 'DP II: LIS, knapsack, edit distance, bitmask',
      body: `
<p>In DSA1 we learned the basics of DP: the state, the transition, the base case. We computed LIS in O(n log n), and edit distance with a two-dimensional table. Now one step further: recover the <b>answer itself</b>, choose under a limited resource, and apply DP over subsets.</p>
<h3>Recovering the LIS</h3>
<p><code>tails[k]</code> is the smallest last value of an increasing subsequence of length k + 1. To get the subsequence itself, we store <code>tails_idx[k]</code> (the index of that value) and <code>prev[i]</code> (the index of the element before i). At the end we walk backwards from the end of the longest chain through <code>prev</code>. This is the same idea as <code>prev</code> in Dijkstra.</p>
<h3>0/1 knapsack</h3>
<p>A student is going on a hike to Burabay, and the backpack can carry at most <code>W</code> kg. Each item has a weight and a value, and each item can be taken only once. <code>dp[w]</code> is the highest value at a weight of at most <code>w</code>.</p>
<pre><code>def knapsack(items, W):
    dp = [0] * (W + 1)
    for weight, value in items:
        for w in range(W, weight - 1, -1):   # in REVERSE order!
            dp[w] = max(dp[w], dp[w - weight] + value)
    return dp[W]

print(knapsack([(3, 40), (4, 50), (2, 30)], 6))   # 80: 4 kg + 2 kg</code></pre>
<p>Why is the inner loop reversed? If we went forwards, <code>dp[w - weight]</code> might already include this same item: the item would be taken twice, and the result would be an unbounded knapsack. The time is O(n·W), the memory is O(W).</p>
<h3>Using edit distance</h3>
<p>The function <code>edit_distance(a, b)</code> from DSA1 gives the number of character insertions, deletions and substitutions. A practical use: correcting typos in a search box. If a user types "Алмты", we suggest the word from the list of cities with the smallest distance. For long strings it is enough to keep just two rows of the table, and then the memory is O(min(n, m)).</p>
<h3>Bitmask DP</h3>
<p>A courier leaves the depot (0), must visit all n points and return to the depot. Trying every order takes O(n!). DP over subsets: <code>dp[mask][v]</code> is the smallest time at which the points in <code>mask</code> have been visited and we are standing at point v. <code>mask</code> is an integer whose bits mark the visited points.</p>
<pre><code>mask = 0b1011        # visited points 0, 1, 3
mask &gt;&gt; 2 &amp; 1       # 0: we have not been to point 2 yet
mask | (1 &lt;&lt; 2)      # 0b1111: we added point 2</code></pre>
<p>There are 2ⁿ · n states, and from each state n transitions: O(2ⁿ · n²). For n = 15 that is about 7 million, while 15! ≈ 1.3 trillion.</p>
<h3>Common mistakes</h3>
<ul>
<li>Running the inner loop forwards in the 0/1 knapsack.</li>
<li>In the LIS, confusing <code>bisect_left</code> (strictly increasing) with <code>bisect_right</code> (non-strict).</li>
<li>In a bitmask, getting the operator precedence wrong: <code>mask &amp; 1 &lt;&lt; v</code> instead of <code>mask &amp; (1 &lt;&lt; v)</code>. The brackets are required.</li>
</ul>
<div class="tip"><b>Tip:</b> if the statement says n ≤ 20, think about bitmask DP. If there is a small "capacity", W ≤ 10⁴, think about a 1D DP similar to the knapsack.</div>`,
      ex: [
        {
          prompt: `<code>lis_sequence(a)</code>: return the <b>strictly increasing</b> subsequence of the greatest length itself (the order of the elements is kept, but they need not be adjacent). If there are several answers, any one will do. Solve it in O(n log n): keep <code>tails_idx</code> and <code>prev</code>. The test checks 100,000 elements.
<pre><code>lis_sequence([3, 1, 4, 1, 5, 9, 2, 6]) → [1, 4, 5, 9]  (or [1, 4, 5, 6], [3, 4, 5, 9], ...)
lis_sequence([])                       → []</code></pre>`,
          starter: `from bisect import bisect_left

def lis_sequence(a):
    return a[:1]
`,
          hints: ['If an element lands at position <code>k</code>, its predecessor is <code>tails_idx[k - 1]</code>: store it in <code>prev[i]</code>.', 'At the end, start from <code>tails_idx[-1]</code>, follow <code>prev</code>, and reverse the list.'],
          check: { tests: String.raw`
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
assert len(_s) == 4 and _valid([3, 1, 4, 1, 5, 9, 2, 6], _s), "There must be a strictly increasing subsequence of length 4, you got " + str(_s)
assert lis_sequence([]) == [], "Empty list: []"
assert lis_sequence([7, 7, 7]) == [7], "Strictly increasing: only one of the equal values is taken"
assert lis_sequence([5, 4, 3]) in ([5], [4], [3]), "In a decreasing list the length is 1"
assert lis_sequence([1, 2, 3]) == [1, 2, 3], "An increasing list: the list itself"
import random as _random, time as _time
_R = _random.Random(15)
for _ in range(100):
    _a = [_R.randint(0, 9) for _ in range(_R.randint(1, 12))]
    _r = lis_sequence(_a)
    assert len(_r) == _len(_a) and _valid(_a, _r), "Error in the random check: " + str(_a)
_big = [_R.randint(0, 10**6) for _ in range(100000)]
_t0 = _time.perf_counter(); _r = lis_sequence(_big); _dt = _time.perf_counter() - _t0
assert len(_r) == _len(_big) and _valid(_big, _r), "The result on 100,000 elements is wrong"
assert _dt < 1.0, "Too slow: it must run in O(n log n)"
` } },
        {
          prompt: `<code>knapsack(items, capacity)</code>: <code>items</code> are <code>(weight, value)</code> pairs, and each item can be taken at most once. Return the highest value with a total weight of at most <code>capacity</code>. Use a 1D DP, with the inner loop running in reverse order.
<pre><code>knapsack([(3, 40), (4, 50), (2, 30)], 6) → 80
knapsack([(5, 10)], 4)                   → 0</code></pre>`,
          starter: `def knapsack(items, capacity):
    return sum(v for w, v in items if w <= capacity)
`,
          hints: ['<code>dp = [0] * (capacity + 1)</code>.', '<code>for w in range(capacity, weight - 1, -1): dp[w] = max(dp[w], dp[w - weight] + value)</code>.'],
          check: { tests: String.raw`
assert knapsack([(3, 40), (4, 50), (2, 30)], 6) == 80, "4 kg + 2 kg = profit 80"
assert knapsack([(5, 10)], 4) == 0, "The item does not fit: 0"
assert knapsack([], 10) == 0, "No items: 0"
assert knapsack([(2, 5)], 10) == 5, "An item cannot be taken twice: 5"
assert knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7) == 9, "3 kg + 4 kg = 9"
assert knapsack([(0, 3), (1, 1)], 0) == 3, "An item of weight 0"
import random as _random, time as _time
from itertools import combinations as _comb
_R = _random.Random(16)
for _ in range(30):
    _it = [(_R.randint(1, 6), _R.randint(1, 20)) for _ in range(_R.randint(0, 6))]
    _W = _R.randint(0, 12)
    _best = max(sum(v for _, v in c) for k in range(len(_it) + 1) for c in _comb(_it, k) if sum(w for w, _ in c) <= _W)
    assert knapsack(_it, _W) == _best, "Does not match brute force: " + str((_it, _W))
_big = [(_R.randint(1, 100), _R.randint(1, 1000)) for _ in range(80)]
_t0 = _time.perf_counter(); knapsack(_big, 3000); _dt = _time.perf_counter() - _t0
assert _dt < 1.5, "80 items, capacity 3000: too slow"
` } },
        {
          prompt: `Correcting a typo in a search box. <code>suggest(word, dictionary)</code>: return the word from <code>dictionary</code> with the smallest edit distance (insertion, deletion, substitution) to <code>word</code>. On a tie, choose the one that comes first alphabetically. If the dictionary is empty, return <code>None</code>. Write the edit distance with two rows of the table.
<pre><code>suggest("Алмты", ["Астана", "Алматы", "Атырау"]) → "Алматы"
suggest("кот", ["кит", "кет"])                     → "кет"</code></pre>`,
          starter: `def suggest(word, dictionary):
    return dictionary[0] if dictionary else None
`,
          hints: ['Edit distance: the first row <code>prev</code> starts as <code>list(range(len(b) + 1))</code>, and each new row starts with <code>[i] + ...</code>.', 'The choice: <code>min(dictionary, key=lambda w: (edit_distance(word, w), w))</code>.'],
          check: { tests: String.raw`
assert suggest("Алмты", ["Астана", "Алматы", "Атырау"]) == "Алматы", "Алмты → Алматы (insert one character)"
assert suggest("кот", ["кит", "кет"]) == "кет", "Both are at distance 1: by alphabet, кет"
assert suggest("x", []) is None, "Empty dictionary: None"
assert suggest("", ["аб", "а"]) == "а", "The shortest word is the closest to an empty string"
assert suggest("Шымкент", ["Шымкент", "Шемонаиха"]) == "Шымкент", "An exact match: distance 0"
assert suggest("Kostanai", ["Qostanai", "Kokshetau"]) == "Qostanai", "One substitution: Qostanai"
assert suggest("sitting", ["kitten", "mitten"]) == "kitten", "sitting → kitten and mitten are both at distance 3: by alphabet, kitten"
import random as _random, time as _time
_R = _random.Random(17)
_words = ["".join(_R.choice("абвгдеж") for _ in range(_R.randint(5, 12))) for _ in range(400)]
_t0 = _time.perf_counter(); suggest("абвгдежабв", _words); _dt = _time.perf_counter() - _t0
assert _dt < 1.5, "400 words is too slow"
` } },
        {
          prompt: `Bitmask DP. A courier leaves the depot (point 0), visits each point exactly once and returns to the depot. <code>min_tour(dist)</code>, where <code>dist[i][j]</code> is the travel time from i to j: return the smallest total time. When <code>n = 1</code>, return 0. The test checks n = 11 points: trying all orders with <code>permutations</code> (10! orders) is too slow.
<pre><code>dist = [[0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]]
min_tour(dist) → 80     # 0 → 1 → 3 → 2 → 0</code></pre>`,
          starter: `def min_tour(dist):
    return 0
`,
          hints: ['<code>dp[mask][v]</code>: the smallest time at which the points in mask have been visited and we are at v. Initial state: <code>dp[1][0] = 0</code>.', 'The answer: <code>min(dp[full - 1][v] + dist[v][0] for v in range(1, n))</code>.'],
          check: { tests: String.raw`
_d = [[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]
assert min_tour(_d) == 80, "0 → 1 → 3 → 2 → 0 = 80"
assert min_tour([[0]]) == 0, "Only the depot: 0"
assert min_tour([[0, 4], [6, 0]]) == 10, "0 → 1 → 0 = 4 + 6"
assert min_tour([[0, 1, 9], [9, 0, 1], [1, 9, 0]]) == 3, "Directed: 0 → 1 → 2 → 0 = 3"
from itertools import permutations as _perm
import random as _random, time as _time
_R = _random.Random(18)
for _ in range(10):
    _n = _R.randint(2, 6)
    _m = [[0 if i == j else _R.randint(1, 50) for j in range(_n)] for i in range(_n)]
    _ref = min(sum(_m[a][b] for a, b in zip((0,) + p, p + (0,))) for p in _perm(range(1, _n)))
    assert min_tour(_m) == _ref, "Does not match brute force: " + str(_m)
_n = 11
_m = [[0 if i == j else _R.randint(1, 100) for j in range(_n)] for i in range(_n)]
_t0 = _time.perf_counter(); _v = min_tour(_m); _dt = _time.perf_counter() - _t0
assert isinstance(_v, int) and _v > 0, "The result for 11 points is wrong"
assert _dt < 2.0, "n = 11 is too slow: use bitmask DP in O(2ⁿ · n²)"
` } }
      ]
    },
    'alg-11': {
      title: 'String algorithms: prefix function and KMP',
      body: `
<p>In DSA1 we worked with strings and checked palindromes and anagrams. Now a classic problem: find a pattern (<code>pattern</code>, length m) in a long text (<code>text</code>, length n). The naive approach compares the pattern with the text from the start at every position: in the worst case that is O(n·m). For example, with the text <code>"aaaa...a"</code> and the pattern <code>"aaa...ab"</code>, at every position m − 1 characters match, and the comparison fails at the end.</p>
<h3>Prefix function</h3>
<p><code>pi[i]</code> is the length of the longest <b>proper</b> prefix (not equal to the whole string) of the substring <code>s[0..i]</code> that is also its suffix. For example, for <code>s = "abcabd"</code>:</p>
<table>
<tr><th>i</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
<tr><th>s[i]</th><td>a</td><td>b</td><td>c</td><td>a</td><td>b</td><td>d</td></tr>
<tr><th>pi[i]</th><td>0</td><td>0</td><td>0</td><td>1</td><td>2</td><td>0</td></tr>
</table>
<p>At i = 4 the string <code>"abcab"</code> starts with <code>"ab"</code> and ends with <code>"ab"</code>: pi = 2.</p>
<pre><code>def prefix_function(s):
    pi = [0] * len(s)
    for i in range(1, len(s)):
        k = pi[i - 1]
        while k &gt; 0 and s[i] != s[k]:
            k = pi[k - 1]            # jump to a shorter "border"
        if s[i] == s[k]:
            k += 1
        pi[i] = k
    return pi</code></pre>
<p>Why is this O(n)? At each step <code>k</code> grows by at most 1, and the <code>while</code> loop only decreases it. The total number of decreases never exceeds the total number of increases.</p>
<h3>KMP search</h3>
<p>The Knuth-Morris-Pratt algorithm: on a mismatch we do not go back in the text; instead we jump along the pattern using <code>pi</code>. The easiest way to write it: compute the prefix function of the string <code>pattern + "#" + text</code>. The character <code>"#"</code> must not occur in either string. Wherever <code>pi[i] == m</code>, the pattern has ended, and its start in the text is <code>i - 2m</code>. The time is O(n + m).</p>
<p>Practical examples: counting how many times the phrase "artificial intelligence" appears in pupils' essays, finding an error code in logs, searching for a pattern in a DNA chain.</p>
<h3>String hashing</h3>
<p>Another approach: turn the string into a number. A polynomial hash: <code>h(s) = (s[0]·Bᵐ⁻¹ + s[1]·Bᵐ⁻² + ... + s[m−1]) mod M</code>. When the window shifts by one character, the hash can be updated in O(1) (a <b>rolling hash</b>, the Rabin-Karp algorithm). If the hashes of two strings differ, the strings are different; if they are equal, they are <b>probably</b> equal, because a collision is possible. So when the hashes match, compare the strings directly or use two different values of M.</p>
<h3>Common mistakes</h3>
<ul>
<li>Stopping the search after the first match: overlapping occurrences are missed (the pattern <code>"aa"</code> occurs twice in <code>"aaa"</code>).</li>
<li>Python's <code>str.count</code> counts non-overlapping occurrences: <code>"aaa".count("aa") == 1</code>.</li>
<li>The separator occurs in the text: choose a character that is not in the text, or write a separate KMP loop.</li>
<li>Not handling an empty pattern.</li>
</ul>
<div class="tip"><b>Tip:</b> the prefix function is useful for more than searching. It also gives the shortest period of a string: <code>p = n - pi[n - 1]</code>. If <code>n % p == 0</code>, the string consists of a block of length p repeated.</div>`,
      ex: [
        {
          prompt: `<code>prefix_function(s)</code>: for each <code>i</code>, the length of the longest proper prefix of <code>s[0..i]</code> that is also a suffix of it. O(n).
<pre><code>prefix_function("abcabd")  → [0, 0, 0, 1, 2, 0]
prefix_function("aabaaab") → [0, 1, 0, 1, 2, 2, 3]
prefix_function("")        → []</code></pre>`,
          starter: `def prefix_function(s):
    return [0] * len(s)
`,
          hints: ['Start with <code>k = pi[i - 1]</code>; if the characters do not match, use <code>k = pi[k - 1]</code>.', 'If <code>s[i] == s[k]</code>, then <code>k += 1</code>.'],
          check: { tests: String.raw`
assert prefix_function("abcabd") == [0, 0, 0, 1, 2, 0], "abcabd → [0, 0, 0, 1, 2, 0]"
assert prefix_function("aabaaab") == [0, 1, 0, 1, 2, 2, 3], "aabaaab → [0, 1, 0, 1, 2, 2, 3]"
assert prefix_function("") == [], "Empty string: []"
assert prefix_function("a") == [0], "One character: [0]"
assert prefix_function("aaaa") == [0, 1, 2, 3], "aaaa → [0, 1, 2, 3]"
import time as _time
_s = "ab" * 50000 + "c"
_t0 = _time.perf_counter(); _p = prefix_function(_s); _dt = _time.perf_counter() - _t0
assert _p[-2] == 99998 and _p[-1] == 0, "The result on a long string is wrong"
assert _dt < 1.0, "100,000 characters is too slow: it must run in O(n)"
` } },
        {
          prompt: `<code>kmp_search(text, pattern)</code>: return all the starting indices at which <code>pattern</code> occurs (including overlapping ones), in ascending order. If the pattern is empty, return <code>[]</code>. Any character (including <code>#</code>) may occur in the text, so write a separate KMP loop: compute the prefix function of the pattern and go through the text once.
<pre><code>kmp_search("abababa", "aba") → [0, 2, 4]
kmp_search("Алматы", "ты")   → [4]
kmp_search("abc", "")        → []</code></pre>`,
          starter: `def kmp_search(text, pattern):
    i = text.find(pattern)
    return [i] if i >= 0 and pattern else []
`,
          hints: ['While going through the text, <code>k</code> is how many characters of the pattern have matched. On a mismatch: <code>k = pi[k - 1]</code>.', 'If <code>k == m</code>, the index is <code>i - m + 1</code>, then <code>k = pi[k - 1]</code> (for overlaps).'],
          check: { tests: String.raw`
assert kmp_search("abababa", "aba") == [0, 2, 4], "Overlapping occurrences: [0, 2, 4]"
assert kmp_search("Алматы", "ты") == [4], "ты in Алматы: [4]"
assert kmp_search("abc", "") == [], "Empty pattern: []"
assert kmp_search("", "a") == [], "Empty text: []"
assert kmp_search("ab", "abc") == [], "The pattern is longer than the text: []"
assert kmp_search("a#b#a#b", "#b") == [1, 5], "The # character in the text must not break the search"
assert kmp_search("aaaa", "aa") == [0, 1, 2], "aa occurs three times in aaaa"
import random as _random, time as _time
_R = _random.Random(19)
for _ in range(100):
    _t = "".join(_R.choice("ab") for _ in range(_R.randint(0, 15)))
    _p = "".join(_R.choice("ab") for _ in range(_R.randint(1, 3)))
    assert kmp_search(_t, _p) == [i for i in range(len(_t) - len(_p) + 1) if _t[i:i + len(_p)] == _p], "Error in the random check: " + repr((_t, _p))
_text = "a" * 100000
_t0 = _time.perf_counter(); _r = kmp_search(_text, "a" * 300 + "b"); _r2 = kmp_search(_text, "aaa"); _dt = _time.perf_counter() - _t0
assert _r == [] and len(_r2) == 99998, "The result on a long text is wrong"
assert _dt < 1.5, "Too slow: KMP must run in O(n + m)"
` } },
        {
          prompt: `<code>shortest_period(s)</code>: the length of the shortest block whose repetition makes up the string <code>s</code>. If the string is not made of repeats of a shorter block, return <code>len(s)</code>. For an empty string, return 0. Use the prefix function: <code>p = n - pi[n - 1]</code>.
<pre><code>shortest_period("abcabcabc") → 3
shortest_period("abab")      → 2
shortest_period("abcab")     → 5
shortest_period("zzzz")      → 1</code></pre>`,
          starter: `def shortest_period(s):
    return len(s)
`,
          hints: ['First compute the prefix function (rewrite the code from the previous exercise).', '<code>p = n - pi[-1]</code>; if <code>n % p == 0</code>, the answer is p, otherwise n.'],
          check: { tests: String.raw`
assert shortest_period("abcabcabc") == 3, "abc × 3: 3"
assert shortest_period("abab") == 2, "ab × 2: 2"
assert shortest_period("abcab") == 5, "No full repetition: 5"
assert shortest_period("zzzz") == 1, "z × 4: 1"
assert shortest_period("") == 0, "Empty string: 0"
assert shortest_period("a") == 1, "One character: 1"
assert shortest_period("aabaab") == 3, "aab × 2: 3"
import time as _time
_s = "қазақ" * 20000
_t0 = _time.perf_counter(); _r = shortest_period(_s); _dt = _time.perf_counter() - _t0
assert _r == 5, "қазақ × 20000: 5"
assert _dt < 1.0, "Too slow: the prefix function in O(n)"
` } },
        { prompt: 'In the Rabin-Karp search, the hash of a text window turned out to equal the hash of the pattern. What is the best next step?', options: ['Count it as a match straight away', 'Compare the window and the pattern character by character', 'Recompute the hash with a different B and reject the match, even if it is equal', 'Skip the window'], explain: 'Equal hashes only make a match likely: a collision is possible. A direct comparison (or two independent hashes) guarantees correctness.' }
      ]
    },
    'alg-12': {
      title: 'Trie: prefix tree and autocomplete',
      body: `
<p>When you type "сүт" into the search box of a shop (in the style of Kaspi), the suggestions should be items that start with "сүт…", for example "сүт" and "сүтті шоколад", not "сүзбе". If you scan the whole list of words every time, it takes O(N·L). For this kind of task there is a special structure: the <b>trie</b> (a prefix tree).</p>
<h3>Structure</h3>
<p>Each node of a trie stands for one character, and the path from the root to a node is a prefix. Each node holds its children (character → dictionary of nodes) and a flag saying whether a word ends here. Words with a common prefix share the common nodes.</p>
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
<p>Every operation takes O(L), where L is the length of the word or prefix. The number of words N does not affect this.</p>
<h3>Autocomplete</h3>
<p>Having reached the node of the prefix, we run a DFS downwards and collect the words from the nodes marked <code>end</code>. If we visit the children in the order <code>sorted(node.children)</code>, the words come out alphabetically, so we can stop after the first k words.</p>
<h3>Counters</h3>
<p>A common question is: "How many words start with this prefix?" We add a <code>count</code> field to every node: on <code>insert</code> we increase the <code>count</code> of every node on the path by 1. Then the answer is the <code>count</code> of the prefix node, in O(L).</p>
<h3>Trie, set and a sorted list</h3>
<table>
<tr><th>Question</th><th>set</th><th>Sorted list + bisect</th><th>Trie</th></tr>
<tr><td>Is the word there</td><td>O(L) on average</td><td>O(L log N)</td><td>O(L)</td></tr>
<tr><td>Start with a prefix</td><td>O(N·L)</td><td>O(L log N + k)</td><td>O(L + k)</td></tr>
<tr><td>Memory</td><td>low</td><td>low</td><td>high (a dict in every node)</td></tr>
</table>
<p>In Python, for small tasks a sorted list with <code>bisect</code> is often enough. A trie wins when there are very many prefix queries, when words arrive as a stream, or when you need to store extra information for each prefix (a counter, the most popular word).</p>
<h3>Common mistakes</h3>
<ul>
<li>Not checking the <code>end</code> flag in <code>search</code>: if the word "сүт" is there, then "сү" will also be found.</li>
<li>Not handling the empty string: <code>starts_with("")</code> is always <code>True</code>.</li>
<li>Increasing the counter twice when the same word is added twice (if unique words are being counted).</li>
</ul>
<div class="tip"><b>Tip:</b> a node does not have to be a separate class; a plain dictionary works too: <code>node = node.setdefault(ch, {})</code>, with the end of a word marked by the key <code>"$"</code>. The code gets shorter, but the words must not contain the character <code>"$"</code>.</div>`,
      ex: [
        {
          prompt: `Write the class <code>Trie</code>: <code>insert(word)</code>, <code>search(word)</code> (is this exact word there) and <code>starts_with(prefix)</code> (is there a word with this prefix). Every operation must run in O(L): the test measures the time on 20,000 words and 20,000 queries.`,
          starter: `class Trie:
    def __init__(self):
        self.words = []

    def insert(self, word):
        self.words.append(word)

    def search(self, word):
        return False

    def starts_with(self, prefix):
        return False
`,
          hints: ['A node: a dictionary <code>children</code> and an <code>end</code> flag. <code>insert</code>: <code>node = node.children.setdefault(ch, TrieNode())</code>.', '<code>search</code> and <code>starts_with</code> can share one helper method <code>_walk</code>; the only difference is the check of <code>end</code>.'],
          check: { tests: String.raw`
_t = Trie()
for _w in ["сүт", "сүтті", "сүзбе", "нан"]:
    _t.insert(_w)
assert _t.search("сүт") and _t.search("сүзбе"), "The words that were added must be found"
assert not _t.search("сү"), "сү: a prefix, but not a word"
assert _t.starts_with("сү") and _t.starts_with("сүтт"), "The prefixes must be found"
assert not _t.starts_with("шай") and not _t.search("сүттер"), "A missing word and prefix: False"
assert _t.starts_with(""), "An empty prefix is always True"
_e = Trie()
assert not _e.search("") and not _e.search("a"), "An empty trie has no words"
_e.insert("")
assert _e.search(""), "The empty word is found after it is added"
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
assert _hits == 20000 and _miss == 0, "The result is wrong in the large trie"
assert _dt < 1.5, "Too slow: store the words in the trie nodes, not in a list"
` } },
        {
          prompt: `The class <code>Autocomplete(words)</code>: the constructor puts the words into a trie. <code>suggest(prefix, limit=3)</code> returns the first <code>limit</code> words with this prefix in alphabetical order. A repeated word is suggested only once.
<pre><code>ac = Autocomplete(["сүт", "сүзбе", "сүтті шоколад", "сода", "сүт"])
ac.suggest("сү")     → ["сүзбе", "сүт", "сүтті шоколад"]
ac.suggest("с", 2)   → ["сода", "сүзбе"]
ac.suggest("шай")    → []</code></pre>`,
          starter: `class Autocomplete:
    def __init__(self, words):
        self.words = words

    def suggest(self, prefix, limit=3):
        return []
`,
          hints: ['Go down the prefix to a node; if a character is missing, return <code>[]</code>.', 'DFS: first check whether a word ends at the current node, then visit the children in <code>sorted</code> order; stop when <code>limit</code> words have been collected.'],
          check: { tests: String.raw`
_ac = Autocomplete(["сүт", "сүзбе", "сүтті шоколад", "сода", "сүт"])
assert _ac.suggest("сү") == ["сүзбе", "сүт", "сүтті шоколад"], "сү: three words in alphabetical order"
assert _ac.suggest("с", 2) == ["сода", "сүзбе"], "limit = 2"
assert _ac.suggest("шай") == [], "No such prefix: []"
assert _ac.suggest("сүт") == ["сүт", "сүтті шоколад"], "If the prefix is itself a word, it comes first"
assert _ac.suggest("", 10) == ["сода", "сүзбе", "сүт", "сүтті шоколад"], "Empty prefix: all the words, with no repeats"
assert Autocomplete([]).suggest("а") == [], "Empty dictionary: []"
import random as _random, time as _time
_R = _random.Random(22)
_ws = ["".join(_R.choice("абвгд") for _ in range(_R.randint(3, 9))) for _ in range(20000)]
_t0 = _time.perf_counter()
_big = Autocomplete(_ws)
_res = [_big.suggest(_w[:4], 3) for _w in _ws[:3000]]
_dt = _time.perf_counter() - _t0
assert _res[0] == sorted(set(w for w in _ws if w.startswith(_ws[0][:4])))[:3], "The suggestion in the large dictionary is wrong"
assert _dt < 2.0, "Too slow: stop the DFS once the limit is reached"
` } },
        {
          prompt: `The class <code>PrefixCounter</code>: <code>add(word)</code> adds a word (even a repeated one: every addition counts), and <code>count(prefix)</code> returns the number of added words with this prefix in O(len(prefix)). Keep a counter in each trie node. The test runs 20,000 queries, so scanning a list will not pass.
<pre><code>pc = PrefixCounter()
for w in ["алма", "алмұрт", "анар", "алма"]: pc.add(w)
pc.count("ал")  → 3
pc.count("")    → 4</code></pre>`,
          starter: `class PrefixCounter:
    def __init__(self):
        self.words = []

    def add(self, word):
        self.words.append(word)

    def count(self, prefix):
        return 0
`,
          hints: ['Each node: a dictionary with a counter inside (for example, under the key <code>"#"</code>) and the children.', 'On <code>add</code>, increase the counter of the root and of every node on the path by 1.'],
          check: { tests: String.raw`
_pc = PrefixCounter()
for _w in ["алма", "алмұрт", "анар", "алма"]:
    _pc.add(_w)
assert _pc.count("ал") == 3, "ал: алма, алмұрт, алма = 3"
assert _pc.count("алма") == 2, "алма was added twice"
assert _pc.count("") == 4, "Empty prefix: all the words"
assert _pc.count("б") == 0 and _pc.count("алмаз") == 0, "No such prefix: 0"
assert PrefixCounter().count("а") == 0, "Empty counter: 0"
import random as _random, time as _time
_R = _random.Random(23)
_ws = ["".join(_R.choice("абвгдеж") for _ in range(_R.randint(3, 8))) for _ in range(20000)]
_big = PrefixCounter()
_t0 = _time.perf_counter()
for _w in _ws:
    _big.add(_w)
_c = [_big.count(_w[:2]) for _w in _ws]
_dt = _time.perf_counter() - _t0
assert _c[0] == sum(1 for w in _ws if w.startswith(_ws[0][:2])), "The count on a large input is wrong"
assert _dt < 1.0, "20,000 queries are too slow: keep the counter in the trie node"
` } },
        { prompt: 'A trie holds N words, and the longest has L characters. How long does it take to check whether a word with a prefix of length m exists (<code>starts_with</code>)?', options: ['O(N)', 'O(m)', 'O(N · m)', 'O(log N)'], explain: 'From the root we go down one node for each character of the prefix: m steps. The number of words does not matter.' }
      ]
    },
    'alg-gate': {
      title: 'Module exam: Advanced Algorithms',
      body: `
<p>The exam covers the whole module: sliding window, union-find and MST, Dijkstra, KMP, and choosing an algorithm. To pass you need at least <b>75%</b> of the points.</p>
<ul>
<li>Function names and the type of the returned value must match exactly what is given.</li>
<li>In each task the tests check edge cases (an empty input, an unreachable vertex, a single element) as well as speed.</li>
<li>Think about brute force first, then choose the structure that will speed it up. No hints are given.</li>
</ul>`,
      ex: [
        {
          prompt: `A region has <code>n</code> villages (<code>0..n-1</code>). Some roads already exist (<code>existing</code>, pairs <code>(u, v)</code>, free of charge). <code>options</code>: the roads that can be built, as <code>(u, v, price)</code>. <code>min_extra_cost(n, existing, options)</code>: return the smallest extra cost needed to join all the villages into one network; if it is impossible, return <code>None</code>.
<pre><code>min_extra_cost(4, [(0, 1)], [(1, 2, 5), (2, 3, 1), (0, 3, 2), (0, 2, 9)]) → 3
min_extra_cost(3, [(0, 1), (1, 2)], [])                                   → 0
min_extra_cost(3, [], [(0, 1, 4)])                                        → None</code></pre>`,
          starter: `def min_extra_cost(n, existing, options):
    return 0
`,
          hints: [],
          check: { tests: String.raw`
assert min_extra_cost(4, [(0, 1)], [(1, 2, 5), (2, 3, 1), (0, 3, 2), (0, 2, 9)]) == 3, "2-3 (1) and 0-3 (2): 3"
assert min_extra_cost(3, [(0, 1), (1, 2)], []) == 0, "Everything is already connected: 0"
assert min_extra_cost(3, [], [(0, 1, 4)]) is None, "Village 2 cannot be connected: None"
assert min_extra_cost(1, [], []) == 0, "One village: 0"
assert min_extra_cost(3, [(0, 1)], [(0, 1, 1), (1, 2, 6)]) == 6, "An existing road does not need to be built again"
import random as _random, time as _time
_R = _random.Random(30)
_n = 5000
_ex = [(_R.randrange(_n), _R.randrange(_n)) for _ in range(3000)]
_op = [(_i, _i + 1, 100) for _i in range(_n - 1)] + [(_R.randrange(_n), _R.randrange(_n), _R.randint(1, 99)) for _ in range(30000)]
_t0 = _time.perf_counter(); _r = min_extra_cost(_n, _ex, _op); _dt = _time.perf_counter() - _t0
assert _r is not None and _r < 100 * (_n - 1), "The result on a large input is wrong"
assert _dt < 1.5, "Too slow: DSU + Kruskal"
` } },
        {
          prompt: `A student has lunch in a café every day, and <code>prices</code> are the daily costs (positive numbers). <code>longest_within_budget(prices, budget)</code>: return the length of the longest run of consecutive days whose total cost does not exceed <code>budget</code>. O(n).
<pre><code>longest_within_budget([1200, 900, 1500, 800, 700, 2500], 3000) → 3
longest_within_budget([5000], 3000)                            → 0</code></pre>`,
          starter: `def longest_within_budget(prices, budget):
    return len(prices)
`,
          hints: [],
          check: { tests: String.raw`
assert longest_within_budget([1200, 900, 1500, 800, 700, 2500], 3000) == 3, "1500 + 800 + 700 = 3000: 3 days"
assert longest_within_budget([5000], 3000) == 0, "Not even one day fits: 0"
assert longest_within_budget([], 100) == 0, "Empty list: 0"
assert longest_within_budget([1, 1, 1], 3) == 3, "The whole list fits"
assert longest_within_budget([4, 1, 1, 4, 1, 1, 1], 3) == 3, "The last three days: 3"
import random as _random, time as _time
_R = _random.Random(31)
for _ in range(80):
    _p = [_R.randint(1, 9) for _ in range(_R.randint(0, 10))]
    _b = _R.randint(0, 20)
    _ref = max([j - i for i in range(len(_p) + 1) for j in range(i, len(_p) + 1) if sum(_p[i:j]) <= _b] + [0])
    assert longest_within_budget(_p, _b) == _ref, "Does not match brute force: " + str((_p, _b))
_big = [_R.randint(500, 3000) for _ in range(100000)]
_t0 = _time.perf_counter(); longest_within_budget(_big, 200000); _dt = _time.perf_counter() - _t0
assert _dt < 1.0, "Too slow: sliding window in O(n)"
` } },
        {
          prompt: `A courier service: <code>graph</code> is a directed weighted graph (vertex → <code>[(neighbour, minutes), ...]</code>). <code>delivery_total(graph, src, targets)</code>: the sum of the shortest times from <code>src</code> to each target (each target is reached separately). If at least one target is unreachable, return <code>None</code>. If the list of targets is empty, return 0.
<pre><code>g = {"Қойма": [("Абай", 10), ("Сатпаев", 25)], "Абай": [("Сатпаев", 5), ("Төле би", 20)]}
delivery_total(g, "Қойма", ["Сатпаев", "Төле би"]) → 45    # 15 + 30</code></pre>`,
          starter: `import heapq

def delivery_total(graph, src, targets):
    return 0
`,
          hints: [],
          check: { tests: String.raw`
_g = {"Қойма": [("Абай", 10), ("Сатпаев", 25)], "Абай": [("Сатпаев", 5), ("Төле би", 20)]}
assert delivery_total(_g, "Қойма", ["Сатпаев", "Төле би"]) == 45, "15 + 30 = 45"
assert delivery_total(_g, "Қойма", []) == 0, "No targets: 0"
assert delivery_total(_g, "Қойма", ["Қойма"]) == 0, "The target is the depot itself: 0"
assert delivery_total(_g, "Абай", ["Қойма"]) is None, "No way back: None"
assert delivery_total(_g, "Қойма", ["Сатпаев", "Сатпаев"]) == 30, "One target twice: 15 + 15"
import random as _random, time as _time
_R = _random.Random(32)
_n = 8000
_G = {_i: [(_i + 1, _R.randint(1, 9)), (_R.randrange(_n), _R.randint(5, 50))] for _i in range(_n - 1)}
_t0 = _time.perf_counter(); _r = delivery_total(_G, 0, list(range(0, _n, 50))); _dt = _time.perf_counter() - _t0
assert _r is not None and _r > 0, "The result on a large graph is wrong"
assert _dt < 1.5, "Too slow: run Dijkstra once and use it for all the targets"
` } },
        {
          prompt: `<code>count_pattern(text, pattern)</code>: count how many times <code>pattern</code> occurs in the text (including overlapping occurrences). If the pattern is empty, return 0. Solve it with KMP in O(n + m). Note: <code>str.count</code> does not count overlapping occurrences.
<pre><code>count_pattern("ananananas", "anan") → 3
count_pattern("aaaa", "aa")         → 3
count_pattern("abc", "")            → 0</code></pre>`,
          starter: `def count_pattern(text, pattern):
    return text.count(pattern) if pattern else 0
`,
          hints: [],
          check: { tests: String.raw`
assert count_pattern("ананананас", "анан") == 3, "anan occurs 3 times in ananananas (overlapping)"
assert count_pattern("aaaa", "aa") == 3, "aa in aaaa: 3"
assert count_pattern("abc", "") == 0, "Empty pattern: 0"
assert count_pattern("", "a") == 0, "Empty text: 0"
assert count_pattern("abcabc", "abc") == 2, "Non-overlapping: 2"
assert count_pattern("ab", "abc") == 0, "The pattern is longer: 0"
import time as _time
_t0 = _time.perf_counter(); _r = count_pattern("ab" * 50000, "abab"); _r2 = count_pattern("a" * 100000, "a" * 400 + "b"); _dt = _time.perf_counter() - _t0
assert _r == 49999 and _r2 == 0, "The count on a long text is wrong"
assert _dt < 1.5, "Too slow: KMP in O(n + m)"
` } },
        { prompt: 'A taxi app has a city map: 50,000 intersections and 120,000 streets, and the travel time of each street (a positive number) is known. The passenger needs the fastest route. Which algorithm is correct and fast enough?', options: ['BFS', 'Dijkstra + heap', 'Bellman-Ford', 'Kruskal'], explain: 'The weights are different and non-negative: Dijkstra, O((V + E) log V). BFS ignores the weights, Bellman-Ford in O(V·E) ≈ 6·10⁹ is far too slow, and Kruskal finds an MST, not the shortest path.' }
      ]
    }
  }
});
