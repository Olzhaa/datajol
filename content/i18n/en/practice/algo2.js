// algo2 practice tasks: English text. Code, solutions and checks are in content/practice/algo2.js.
DJ.i18n.patch({ lessons: {
 "alg-1": {
  "pr": [
   {
    "title": "The Second Largest Value",
    "prompt": "<p><code>second_largest(xs)</code> must return the second largest of the <b>distinct</b> values in the list; if there is none (the list is empty or all values are equal), return <code>None</code>. Go through the list once, keeping two variables. First, work out the edge cases.</p>\n<pre><code>second_largest([3, 9, 7, 9]) → 7\nsecond_largest([5, 5])       → None\nsecond_largest([])           → None</code></pre>",
    "hints": [
     "If a new maximum appears, the old maximum becomes the second largest.",
     "A value equal to the maximum must not change the second place."
    ],
    "check": {
     "tests": "\nassert second_largest([3, 9, 7, 9]) == 7, 'second_largest([3, 9, 7, 9]) 7'\nassert second_largest([5, 5]) is None, 'All equal: None'\nassert second_largest([]) is None, 'Empty list: None'\nassert second_largest([4]) is None, 'One element: None'\nassert second_largest([-1, -2]) == -2, 'Negative numbers: -2'\nassert second_largest([1, 2, 3]) == 2, 'In increasing order: 2'\nassert second_largest([0, 0, -5]) == -5, 'Second largest: -5'\n"
    }
   },
   {
    "title": "Interval Intersection",
    "prompt": "<p>Two bookings are given as half-open intervals: <code>[l, r)</code> — <code>l</code> is included, <code>r</code> is not. <code>overlap(a, b)</code> must return the length of their common part (0 if there is no overlap). Touching (<code>[1, 3)</code> and <code>[3, 5)</code>) is not an overlap.</p>\n<pre><code>overlap((1, 5), (3, 8)) → 2\noverlap((1, 3), (3, 5)) → 0\noverlap((2, 9), (4, 6)) → 2</code></pre>",
    "hints": [
     "The common part: <code>[max(l₁, l₂), min(r₁, r₂))</code>.",
     "Raise a negative length to 0."
    ],
    "check": {
     "tests": "\nassert overlap((1, 5), (3, 8)) == 2, 'overlap((1, 5), (3, 8)) 2'\nassert overlap((1, 3), (3, 5)) == 0, 'Touching is not an overlap: 0'\nassert overlap((2, 9), (4, 6)) == 2, 'One inside the other: 2'\nassert overlap((5, 8), (1, 2)) == 0, 'Far apart intervals: 0'\nassert overlap((3, 3), (0, 10)) == 0, 'Empty interval: 0'\nassert overlap((0, 10), (0, 10)) == 10, 'Identical intervals: 10'\n"
    }
   },
   {
    "title": "Splitting an Interval Evenly",
    "prompt": "<p>In a library, the books numbered <code>[lo, hi)</code> must be shared among <code>k</code> staff members. <code>split_range(lo, hi, k)</code> <code>k</code> must return a list of half-open intervals <code>(l, r)</code>: they follow one another, cover the whole <code>[lo, hi)</code> completely, their lengths differ by at most 1, and the longer ones come first. An interval may be empty.</p>\n<pre><code>split_range(0, 10, 3) → [(0, 4), (4, 7), (7, 10)]\nsplit_range(5, 7, 4)  → [(5, 6), (6, 7), (7, 7), (7, 7)]</code></pre>",
    "hints": [
     "<code>q, r = divmod(hi − lo, k)</code>: the first <code>r</code> parts have length <code>q + 1</code>, the rest have <code>q</code>.",
     "The next part starts where the previous one ends — that is the advantage of half-open intervals."
    ],
    "check": {
     "tests": "\nassert split_range(0, 10, 3) == [(0, 4), (4, 7), (7, 10)], 'Expected [(0, 4), (4, 7), (7, 10)]'\nassert split_range(5, 7, 4) == [(5, 6), (6, 7), (7, 7), (7, 7)], 'Empty parts are allowed too'\nassert split_range(0, 0, 2) == [(0, 0), (0, 0)], 'Empty interval'\nassert split_range(3, 9, 1) == [(3, 9)], 'One part is the whole interval'\nassert split_range(0, 9, 3) == [(0, 3), (3, 6), (6, 9)], 'Divides evenly'\n"
    }
   },
   {
    "title": "Intersection of Two Schedules",
    "prompt": "<p>The free times of two doctors: <code>a</code> and <code>b</code> are lists of non-overlapping <code>[l, r)</code> intervals, sorted by start. <code>common_free(a, b)</code> must return a sorted list of the intervals in which both doctors are free (do not include zero-length intervals). Two pointers: move the pointer of the interval with the smaller <code>r</code>. O(n + m).</p>\n<pre><code>common_free([(0, 2), (5, 10), (13, 23)], [(1, 5), (8, 12), (15, 24)])\n→ [(1, 2), (8, 10), (15, 23)]</code></pre>",
    "hints": [
     "For each pair, the intersection is <code>[max(l), min(r))</code>; add it only if <code>lo &lt; hi</code>.",
     "The interval that ends earlier cannot overlap anything else — move its pointer."
    ],
    "check": {
     "tests": "\nassert common_free([(0, 2), (5, 10), (13, 23)], [(1, 5), (8, 12), (15, 24)]) == [(1, 2), (8, 10), (15, 23)], 'Expected [(1, 2), (8, 10), (15, 23)]'\nassert common_free([], [(1, 2)]) == [], 'One schedule is empty: []'\nassert common_free([(1, 3)], [(3, 5)]) == [], 'Touching is not an overlap: []'\nassert common_free([(0, 10)], [(1, 2), (4, 6)]) == [(1, 2), (4, 6)], 'One long interval: [(1, 2), (4, 6)]'\nimport random as _random\n_rng = _random.Random(1)\ndef _mk():\n    pts = sorted(_rng.sample(range(40), 2 * _rng.randint(0, 5)))\n    return [(pts[i], pts[i + 1]) for i in range(0, len(pts), 2)]\nfor _ in range(60):\n    _a, _b = _mk(), _mk()\n    _cells = [x for x in range(40) if any(l <= x < r for l, r in _a) and any(l <= x < r for l, r in _b)]\n    _got = common_free(_a, _b)\n    _gc = [x for l, r in _got for x in range(l, r)]\n    assert _gc == _cells and all(l < r for l, r in _got), f'common_free({_a}, {_b}) қате: {_got}'\n"
    }
   },
   {
    "title": "Ranges of Unsold Numbers",
    "prompt": "<p>The train ticket numbers must lie in the range <code>[lo, hi)</code>. The sold ones <code>sold</code> are in increasing order, without repeats, all inside the range. <code>gaps(sold, lo, hi)</code> must return the gaps of unsold numbers as half-open intervals <code>(l, r)</code>, in order.</p>\n<pre><code>gaps([0, 1, 3, 50, 75], 0, 100) → [(2, 3), (4, 50), (51, 75), (76, 100)]\ngaps([], 1, 5)                  → [(1, 5)]\ngaps([1, 2, 3], 1, 4)           → []</code></pre>",
    "hints": [
     "<code>prev</code> is the next number that may be free. For each sold <code>x</code>: if <code>[prev, x)</code> is free, add the interval.",
     "So as not to forget the last interval, append <code>hi</code> to the end of the list as a 'gate'."
    ],
    "check": {
     "tests": "\nassert gaps([0, 1, 3, 50, 75], 0, 100) == [(2, 3), (4, 50), (51, 75), (76, 100)], 'Expected [(2, 3), (4, 50), (51, 75), (76, 100)]'\nassert gaps([], 1, 5) == [(1, 5)], 'If nothing is sold: the whole range'\nassert gaps([1, 2, 3], 1, 4) == [], 'Everything sold: []'\nassert gaps([], 3, 3) == [], 'Empty range: []'\nassert gaps([9], 0, 10) == [(0, 9)], 'Last number sold: [(0, 9)]'\nassert gaps([0], 0, 10) == [(1, 10)], 'First number sold: [(1, 10)]'\n_s = [1, 2, 3]; gaps(_s, 0, 5)\nassert _s == [1, 2, 3], 'Do not change the input list'\n"
    }
   },
   {
    "title": "Sum Closest to a Target",
    "prompt": "<p>The gift certificate is <code>target</code> tenge. The prices in the store, <code>prices</code>, are sorted in increasing order (at least two items). <code>closest_sum(prices, target)</code> must return the smallest difference between the sum of the prices of two <b>different</b> items and <code>target</code>: <code>|қосынды − target|</code>. Two pointers: O(n).</p>\n<pre><code>closest_sum([500, 1200, 3000, 4500], 5000) → 0       # 500 + 4500 = 5000\nclosest_sum([100, 200, 900], 1250)         → 150     # 200 + 900 = 1100</code></pre>",
    "hints": [
     "If the sum is less than <code>target</code>, move the left pointer; if it is greater, move the right pointer.",
     "Update the difference at each step; if it is 0, return 0 right away."
    ],
    "check": {
     "tests": "\nassert closest_sum([500, 1200, 3000, 4500], 5000) == 0, '500 + 4500 = 5000: difference 0'\nassert closest_sum([100, 200, 900], 1250) == 150, '200 + 900 = 1100: difference 150'\nassert closest_sum([1, 2], 100) == 97, 'Two items: 97'\nassert closest_sum([5, 5], 10) == 0, 'Equal prices: 0'\nassert closest_sum([10, 20, 30], 5) == 25, 'Smallest pair: 30 − 5 = 25'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(50):\n    _p = sorted(_rng.randint(0, 50) for _ in range(_rng.randint(2, 10))); _t = _rng.randint(0, 110)\n    _exp = min(abs(_p[i] + _p[j] - _t) for i in range(len(_p)) for j in range(i + 1, len(_p)))\n    assert closest_sum(_p, _t) == _exp, f'closest_sum({_p}, {_t}) {_exp} болуы керек'\n_big = sorted(_rng.randint(0, 10**9) for _ in range(100000))\n_t0 = _time.perf_counter(); closest_sum(_big, 7 * 10**8 + 3); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: an O(n) two-pointer solution is needed'\n"
    }
   },
   {
    "title": "Inserting a New Booking",
    "prompt": "<p>The conference room bookings <code>bookings</code> are <code>[l, r)</code> intervals sorted by start, which neither overlap nor touch each other. <code>insert_booking(bookings, new)</code> must add a new <code>new</code> interval and return a sorted list in which intervals that <b>overlap or touch</b> are merged. Do not sort; go through the list once, O(n): first those entirely to the left of <code>new</code>, then the merged ones, then those to the right.</p>\n<pre><code>insert_booking([(1, 3), (6, 9)], (2, 5))          → [(1, 5), (6, 9)]\ninsert_booking([(1, 2), (3, 5), (6, 7), (8, 10)], (4, 8)) → [(1, 2), (3, 10)]\ninsert_booking([(1, 3)], (3, 4))                 → [(1, 4)]     # түйісу</code></pre>",
    "hints": [
     "Intervals entirely on the left satisfy <code>b.r &lt; new.l</code> (touching is merged, so <code>&lt;</code>).",
     "Merge condition: <code>b.l ≤ r</code>; widen the bounds using <code>min</code>/<code>max</code>."
    ],
    "check": {
     "tests": "\nassert insert_booking([(1, 3), (6, 9)], (2, 5)) == [(1, 5), (6, 9)], 'Expected [(1, 5), (6, 9)]'\nassert insert_booking([(1, 2), (3, 5), (6, 7), (8, 10)], (4, 8)) == [(1, 2), (3, 10)], 'Expected [(1, 2), (3, 10)]'\nassert insert_booking([(1, 3)], (3, 4)) == [(1, 4)], 'Touching is merged: [(1, 4)]'\nassert insert_booking([], (2, 4)) == [(2, 4)], 'Empty schedule: [(2, 4)]'\nassert insert_booking([(5, 7)], (1, 2)) == [(1, 2), (5, 7)], 'Add at the start'\nassert insert_booking([(1, 2)], (5, 7)) == [(1, 2), (5, 7)], 'Add at the end'\nassert insert_booking([(1, 5)], (2, 3)) == [(1, 5)], 'Inside: unchanged'\nimport random as _random\n_rng = _random.Random(3)\ndef _merge(iv):\n    out = []\n    for l, r in sorted(iv):\n        if out and l <= out[-1][1]:\n            out[-1] = (out[-1][0], max(out[-1][1], r))\n        else:\n            out.append((l, r))\n    return out\nfor _ in range(80):\n    _pts = sorted(_rng.sample(range(1, 60), 2 * _rng.randint(0, 5)))\n    _b = _merge([(_pts[i], _pts[i + 1]) for i in range(0, len(_pts), 2)])\n    _l = _rng.randint(0, 59); _n = (_l, _rng.randint(_l + 1, 61))\n    assert insert_booking(_b, _n) == _merge(_b + [_n]), f'insert_booking({_b}, {_n}) {_merge(_b + [_n])} болуы керек'\n"
    }
   },
   {
    "title": "Common Free Time for Everyone",
    "prompt": "<p>The busy times of each team member are the list <code>schedules[i]</code> — <code>[l, r)</code> intervals (in any order). The working day is <code>[day_start, day_end)</code>. <code>team_free(schedules, day_start, day_end)</code> must return a sorted list of the intervals in which <b>everyone</b> is free during the working day. Collect all the busy intervals into one list, sort it and merge; then find the gaps inside the day.</p>\n<pre><code>team_free([[(9, 10), (12, 13)], [(9, 11)], [(15, 17)]], 9, 18)\n→ [(11, 12), (13, 15), (17, 18)]</code></pre>",
    "hints": [
     "You do not need to build the merge separately; just move the boundary <code>cur</code> — 'up to this moment everything is busy'.",
     "Clip the intervals that go outside the day to <code>[day_start, day_end)</code>."
    ],
    "check": {
     "tests": "\nassert team_free([[(9, 10), (12, 13)], [(9, 11)], [(15, 17)]], 9, 18) == [(11, 12), (13, 15), (17, 18)], 'Expected [(11, 12), (13, 15), (17, 18)]'\nassert team_free([], 9, 18) == [(9, 18)], 'No busy times: the whole day is free'\nassert team_free([[(8, 19)]], 9, 18) == [], 'The whole day is busy: []'\nassert team_free([[(9, 12)], [(12, 18)]], 9, 18) == [], 'Touching intervals leave no gap: []'\nassert team_free([[(13, 14)], [(10, 11)]], 9, 18) == [(9, 10), (11, 13), (14, 18)], 'Unsorted input'\nassert team_free([[(5, 7), (20, 22)]], 9, 18) == [(9, 18)], 'Intervals outside the day: the whole day is free'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _sch = [[(l, l + _rng.randint(1, 4)) for l in _rng.sample(range(0, 24), _rng.randint(0, 3))] for _ in range(_rng.randint(0, 3))]\n    _ds, _de = 6, 20\n    _free = [x for x in range(_ds, _de) if not any(l <= x < r for s in _sch for l, r in s)]\n    _got = team_free(_sch, _ds, _de)\n    assert [x for l, r in _got for x in range(l, r)] == _free and all(a[1] < b[0] for a, b in zip(_got, _got[1:])), f'team_free({_sch}, 6, 20) қате: {_got}'\n"
    }
   }
  ]
 },
 "alg-2": {
  "pr": [
   {
    "title": "Prefix Sums",
    "prompt": "<p><code>prefix_sums(a)</code> must return a list of length <code>len(a) + 1</code>: <code>P[0] = 0</code>, <code>P[i] = a[0] + ... + a[i−1]</code>. Then the sum of the range <code>[l, r)</code> is <code>P[r] − P[l]</code>.</p>\n<pre><code>prefix_sums([3, 1, 4, 1]) → [0, 3, 4, 8, 9]\nprefix_sums([])           → [0]</code></pre>",
    "hints": [
     "<code>P = [0]</code>, then for each element <code>P.append(P[-1] + x)</code>."
    ],
    "check": {
     "tests": "\nassert prefix_sums([3, 1, 4, 1]) == [0, 3, 4, 8, 9], 'Expected [0, 3, 4, 8, 9]'\nassert prefix_sums([]) == [0], 'Empty list: [0]'\nassert prefix_sums([-2, 2]) == [0, -2, 0], 'Negative numbers: [0, -2, 0]'\n_P = prefix_sums(list(range(1, 101)))\nassert len(_P) == 101 and _P[100] - _P[50] == sum(range(51, 101)), 'It must give the range sum P[r] − P[l]'\n"
    }
   },
   {
    "title": "Windows Above the Plan",
    "prompt": "<p><code>count_windows(sales, k, goal)</code> must return the number of contiguous windows of length exactly <code>k</code> whose sum is at least <code>goal</code>. Fixed-size window: O(n). If <code>k &gt; len(sales)</code>, the answer is 0.</p>\n<pre><code>count_windows([2, 2, 2, 2, 5, 5, 5, 8], 3, 12) → 3\ncount_windows([1, 1], 3, 0)                   → 0</code></pre>",
    "hints": [
     "Compute the sum of the first window once, then at each step <code>+ sales[i] − sales[i − k]</code>."
    ],
    "check": {
     "tests": "\nassert count_windows([2, 2, 2, 2, 5, 5, 5, 8], 3, 12) == 3, 'Expected 3'\nassert count_windows([1, 1], 3, 0) == 0, 'k > n: 0'\nassert count_windows([5], 1, 5) == 1, 'One window, on the boundary: 1'\nassert count_windows([1, 2, 3], 3, 7) == 0, 'The plan is not met: 0'\nassert count_windows([-1, 4, -1, 4], 2, 3) == 3, 'Negative values: 3'\nimport time as _time\n_big = list(range(200000))\n_t0 = _time.perf_counter(); _r = count_windows(_big, 1000, 10**8); _dt = _time.perf_counter() - _t0\nassert _r == 99500 and _dt < 1.0, f'Big test: 99500 expected, an O(n) window is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "The Coldest Week",
    "prompt": "<p><code>temps</code> are the daily temperatures in Astana. <code>coldest_week(temps)</code> must return the largest number of <b>frost</b> days (temperature &lt; 0) inside 7-day windows. If there are fewer than 7 days, return 0. Sliding window: add the day that enters the window and subtract the one that leaves.</p>\n<pre><code>coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4, -6]) → 5</code></pre>",
    "hints": [
     "<code>(x &lt; 0)</code> is <code>True</code>/<code>False</code>, that is 1/0: it can be summed directly."
    ],
    "check": {
     "tests": "\nassert coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4, -6]) == 5, 'Expected 5'\nassert coldest_week([-5, -3, 2, -1, -7, 0, 1, -2, -4]) == 4, 'Expected 4'\nassert coldest_week([1, 2, 3]) == 0, 'Fewer than 7 days: 0'\nassert coldest_week([-1] * 7) == 7, 'The whole week is frost: 7'\nassert coldest_week([0] * 10) == 0, '0 is not frost: 0'\nassert coldest_week([-1, 5, 5, 5, 5, 5, 5, -1]) == 1, 'Expected 1'\n"
    }
   },
   {
    "title": "Anagram Positions",
    "prompt": "<p><code>anagram_starts(s, p)</code> must return, in increasing order, the starting indices of the substrings of <code>s</code> that are anagrams of <code>p</code> (they contain the same characters with the same counts). A fixed-length window of length <code>len(p)</code> and character counters: O(n).</p>\n<pre><code>anagram_starts('cbaebabacd', 'abc') → [0, 6]\nanagram_starts('абаба', 'аб')       → [0, 1, 2, 3]</code></pre>",
    "hints": [
     "The window counter <code>win</code> and the pattern counter <code>need</code>; if a count is 0, delete the key, then the comparison <code>win == need</code> is correct.",
     "Comparing dictionaries takes O(alphabet), which is a constant."
    ],
    "check": {
     "tests": "\nassert anagram_starts('cbaebabacd', 'abc') == [0, 6], 'Expected [0, 6]'\nassert anagram_starts('абаба', 'аб') == [0, 1, 2, 3], 'Expected [0, 1, 2, 3]'\nassert anagram_starts('a', 'ab') == [], 'p is longer: []'\nassert anagram_starts('aaa', 'a') == [0, 1, 2], 'Expected [0, 1, 2]'\nassert anagram_starts('abc', 'd') == [], 'None: []'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12))); _p = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    _exp = [i for i in range(len(_s) - len(_p) + 1) if sorted(_s[i:i + len(_p)]) == sorted(_p)]\n    assert anagram_starts(_s, _p) == _exp, f'anagram_starts({_s!r}, {_p!r}) {_exp} болуы керек'\n_s = ''.join(_rng.choice('abcde') for _ in range(100000))\n_t0 = _time.perf_counter(); anagram_starts(_s, 'abcdeabcde' * 50); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} s: slide the window, do not recount at every position'\n"
    }
   },
   {
    "title": "Distinct Values in a Window",
    "prompt": "<p>The types of goods that arrived at the shop each day: <code>a</code>. <code>distinct_in_windows(a, k)</code> must return a list of the counts of <b>distinct</b> values in each window of length <code>k</code>. A counter dictionary: when an element enters the window, add it; when it leaves, decrease its count (if it reaches 0, delete it). <code>len(сөздік)</code> is the answer. O(n).</p>\n<pre><code>distinct_in_windows([1, 2, 1, 3, 4, 2, 3], 4) → [3, 4, 4, 3]\ndistinct_in_windows([5, 5], 3)              → []</code></pre>",
    "hints": [
     "If the counter of the value that left the window becomes 0, delete it from the dictionary using <code>del</code>."
    ],
    "check": {
     "tests": "\nassert distinct_in_windows([1, 2, 1, 3, 4, 2, 3], 4) == [3, 4, 4, 3], 'Expected [3, 4, 4, 3]'\nassert distinct_in_windows([5, 5], 3) == [], 'k > n: []'\nassert distinct_in_windows([7, 7, 7], 2) == [1, 1], 'Identical values: [1, 1]'\nassert distinct_in_windows([1, 2, 3], 1) == [1, 1, 1], 'k = 1: [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(0, 5) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 5)\n    _exp = [len(set(_x[i:i + _k])) for i in range(len(_x) - _k + 1)] if _k <= len(_x) else []\n    assert distinct_in_windows(_x, _k) == _exp, f'distinct_in_windows({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(0, 1000) for _ in range(100000)]\n_t0 = _time.perf_counter(); distinct_in_windows(_big, 5000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} s: do not build a set for each window, move the counter'\n"
    }
   },
   {
    "title": "Discount on a Range",
    "prompt": "<p>A shop has <code>n</code> items (<code>0..n−1</code>), and at the start all the prices are 0. The operation <code>updates</code> — <code>(l, r, v)</code>: <code>v</code> is added to the prices of the items <code>[l, r)</code>. <code>apply_updates(n, updates)</code> must return the list of final prices. Applying each operation with a loop is O(n·q) — slow. Use a difference array: <code>diff[l] += v</code>, <code>diff[r] −= v</code>, and at the end a prefix sum. O(n + q).</p>\n<pre><code>apply_updates(5, [(1, 4, 2), (0, 2, 3), (3, 5, -1)]) → [3, 5, 2, 1, -1]</code></pre>",
    "hints": [
     "<code>diff</code> of length <code>n + 1</code>: even when <code>r = n</code>, you will not go past the boundary.",
     "The final price is the prefix sum of <code>diff</code>."
    ],
    "check": {
     "tests": "\nassert apply_updates(5, [(1, 4, 2), (0, 2, 3), (3, 5, -1)]) == [3, 5, 2, 1, -1], 'Expected [3, 5, 2, 1, -1]'\nassert apply_updates(3, []) == [0, 0, 0], 'No updates: zeros'\nassert apply_updates(0, []) == [], 'n = 0: []'\nassert apply_updates(4, [(2, 2, 5)]) == [0, 0, 0, 0], 'An empty range changes nothing'\nassert apply_updates(3, [(0, 3, 1), (0, 3, 1)]) == [2, 2, 2], 'The whole range twice'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(30):\n    _n = _rng.randint(1, 10); _u = []\n    for _ in range(_rng.randint(0, 6)):\n        _l = _rng.randint(0, _n); _u.append((_l, _rng.randint(_l, _n), _rng.randint(-5, 5)))\n    _exp = [sum(v for l, r, v in _u if l <= i < r) for i in range(_n)]\n    assert apply_updates(_n, _u) == _exp, f'apply_updates({_n}, {_u}) {_exp} болуы керек'\n_u = [(0, 100000, 1)] * 100000\n_t0 = _time.perf_counter(); _r = apply_updates(100000, _u); _dt = _time.perf_counter() - _t0\nassert _r[0] == 100000 and _dt < 1.0, f'10^5 updates, n = 10^5: a difference array is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Longest Period with Sum k",
    "prompt": "<p><code>balance</code> — the daily income/expense (may be negative). <code>longest_sum(balance, k)</code> must return the length of the longest contiguous period whose sum is exactly <code>k</code>; if there is none, 0. Because there are negative numbers, a sliding window does not work: use prefix sums and a dictionary that stores the <b>first</b> index of each prefix value. O(n).</p>\n<pre><code>longest_sum([1, -1, 5, -2, 3], 3) → 4    # [1, -1, 5, -2]\nlongest_sum([-2, -1, 2, 1], 1)    → 2\nlongest_sum([1, 2], 7)            → 0</code></pre>",
    "hints": [
     "<code>P[j] − P[i] = k</code> ⇔ <code>P[i] = P[j] − k</code>.",
     "For the longest period, store the <b>very first</b> index of each prefix value; <code>first = {0: -1}</code>."
    ],
    "check": {
     "tests": "\nassert longest_sum([1, -1, 5, -2, 3], 3) == 4, 'Expected 4'\nassert longest_sum([-2, -1, 2, 1], 1) == 2, 'Expected 2'\nassert longest_sum([1, 2], 7) == 0, 'None: 0'\nassert longest_sum([], 0) == 0, 'Empty list: 0'\nassert longest_sum([0, 0, 0], 0) == 3, 'Zeros: 3'\nassert longest_sum([3], 3) == 1, 'One element: 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-4, 4) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(-4, 6)\n    _exp = max([j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if sum(_x[i:j]) == _k] + [0])\n    assert longest_sum(_x, _k) == _exp, f'longest_sum({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); longest_sum(_big, 50); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: an O(n) solution is needed'\n"
    }
   },
   {
    "title": "Rectangles with a Given Sum",
    "prompt": "<p>The yields of the field plots are <code>grid</code> (<code>R × C</code>, may be negative, <code>R, C ≤ 30</code>). <code>count_rects(grid, target)</code> must return the number of rectangular submatrices whose sum is exactly <code>target</code>. For each pair of rows <code>(top, bottom)</code>, collect the column sums into a one-dimensional list and count the 'subarrays with sum k' using prefix sums and a dictionary: O(R²·C).</p>\n<pre><code>count_rects([[0, 1, 0],\n             [1, 1, 1],\n             [0, 1, 0]], 0) → 4\ncount_rects([[1, -1],\n             [-1, 1]], 0)   → 5</code></pre>",
    "hints": [
     "With <code>top</code> fixed, move <code>bottom</code> down and update the column sums <code>col[j]</code>.",
     "For each <code>(top, bottom)</code>, <code>col</code> is a one-dimensional problem: <code>seen = {0: 1}</code> and <code>total += seen.get(s − target, 0)</code>."
    ],
    "check": {
     "tests": "\nassert count_rects([[0, 1, 0], [1, 1, 1], [0, 1, 0]], 0) == 4, 'Expected 4 (zeros in the four corners)'\nassert count_rects([[1, -1], [-1, 1]], 0) == 5, 'Expected 5'\nassert count_rects([[904]], 0) == 0, 'One cell: 0'\nassert count_rects([[5]], 5) == 1, 'One cell: 1'\nassert count_rects([], 0) == 0, 'Empty grid: 0'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(25):\n    _R, _C = _rng.randint(1, 4), _rng.randint(1, 4)\n    _g = [[_rng.randint(-2, 2) for _ in range(_C)] for _ in range(_R)]; _t = _rng.randint(-2, 3)\n    _exp = sum(1 for a in range(_R) for b in range(a, _R) for c in range(_C) for d in range(c, _C)\n               if sum(_g[i][j] for i in range(a, b + 1) for j in range(c, d + 1)) == _t)\n    assert count_rects(_g, _t) == _exp, f'count_rects({_g}, {_t}) {_exp} болуы керек'\n_g = [[_rng.randint(-5, 5) for _ in range(30)] for _ in range(30)]\n_t0 = _time.perf_counter(); count_rects(_g, 3); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'For 30×30, {_dt:.2f} s: an O(R²·C) solution is needed'\n"
    }
   }
  ]
 },
 "alg-3": {
  "pr": [
   {
    "title": "Polynomial Hash",
    "prompt": "<p>We write our own hash function. <code>poly_hash(s, base, m)</code>: <code>h = 0</code>, for each character <code>h = (h * base + ord(ch)) % m</code> (Horner's scheme). Return the result. Do not use Python's built-in <code>hash()</code>: for strings it changes on every run.</p>\n<pre><code>poly_hash('ab', 31, 1000)  → 135    # (97 · 31 + 98) % 1000\npoly_hash('', 31, 1000)    → 0</code></pre>",
    "hints": [
     "At each step take the remainder modulo <code>% m</code> — the number will not grow without limit."
    ],
    "check": {
     "tests": "\nassert poly_hash('ab', 31, 1000) == (97 * 31 + 98) % 1000, \"poly_hash('ab', 31, 1000) must be 135\"\nassert poly_hash('', 31, 1000) == 0, 'Empty string: 0'\nassert poly_hash('a', 31, 1000) == 97, \"poly_hash('a', 31, 1000) 97\"\nassert poly_hash('абай', 131, 10**9 + 7) == ((((1072 * 131 + 1073) * 131 + 1072) * 131 + 1081) % (10**9 + 7)), 'The hash of Cyrillic text is wrong'\nassert poly_hash('ab', 31, 1000) != poly_hash('ba', 31, 1000), 'The order of characters must affect the hash'\nassert 0 <= poly_hash('x' * 5000, 257, 97) < 97, 'The result must be in [0, m)'\n"
    }
   },
   {
    "title": "Filling the Buckets",
    "prompt": "<p>The integer keys <code>m</code> are spread across the table cells by the rule <code>key % m</code>. <code>bucket_sizes(keys, m)</code> must return a list of length <code>m</code>: how many keys fall into cell <code>i</code>. For negative keys, Python's <code>%</code> operator gives a non-negative remainder.</p>\n<pre><code>bucket_sizes([10, 18, 3, 26, 5], 8) → [0, 0, 3, 1, 0, 1, 0, 0]</code></pre>",
    "hints": [
     "<code>sizes = [0] * m</code>; for each key, <code>sizes[k % m] += 1</code>."
    ],
    "check": {
     "tests": "\nassert bucket_sizes([10, 18, 3, 26, 5], 8) == [0, 0, 3, 1, 0, 1, 0, 0], '10, 18, 26 — all in cell 2'\nassert bucket_sizes([], 3) == [0, 0, 0], 'No keys: zeros'\nassert bucket_sizes([-1, 7], 4) == [0, 0, 0, 2], '-1 % 4 = 3 and 7 % 4 = 3'\nassert bucket_sizes([0, 1, 2], 1) == [3], 'One cell'\n"
    }
   },
   {
    "title": "Number of Collisions",
    "prompt": "<p><code>collisions(keys, m)</code>: the keys are added one by one to a chaining hash table with <code>m</code> cells, using the rule <code>key % m</code>. The number of keys whose cell is not empty at the moment they are added is the number of collisions. Return it. A repeated key is not counted as a new element (it is updated, not a collision).</p>\n<pre><code>collisions([10, 18, 3, 26, 10], 8) → 2     # 18 және 26; екінші 10 — бар кілт\ncollisions([1, 2, 3], 8)           → 0</code></pre>",
    "hints": [
     "Keep a set of keys in each cell.",
     "If the key already exists, skip it; if the cell holds another key, it is a collision."
    ],
    "check": {
     "tests": "\nassert collisions([10, 18, 3, 26, 10], 8) == 2, 'Expected 2'\nassert collisions([1, 2, 3], 8) == 0, 'No collisions: 0'\nassert collisions([], 4) == 0, 'No keys: 0'\nassert collisions([5, 5, 5], 2) == 0, 'If one key repeats: 0'\nassert collisions([0, 4, 8, 12], 4) == 3, 'All in cell 0: 3'\nassert collisions([0, 4, 8, 12], 1) == 3, 'm = 1: 3'\n"
    }
   },
   {
    "title": "Linear Probing Lookup",
    "prompt": "<p>The linear probing table <code>table</code>: a list of length <code>m</code> where each cell holds <code>None</code> (empty) or <code>(key, value)</code>. The starting cell of an integer key is <code>key % m</code>. <code>probe_get(table, key)</code> must return the value, or <code>None</code> if the key is not there. Start from the starting cell and walk <code>(i + 1) % m</code>: if you reach an empty cell or go all the way round the table, the key is not there.</p>\n<pre><code>table = [(8, 'Тараз'), None, (2, 'Орал'), (10, 'Атырау'), None, None, None, (7, 'Жезқазған')]\nprobe_get(table, 10) → 'Атырау'    # 10 % 8 = 2 — бос емес, 3-те табылды\nprobe_get(table, 15) → None        # 7 → 0 → 1 (бос)</code></pre>",
    "hints": [
     "An empty cell <code>None</code> is the end of the chain: searching further makes no sense.",
     "To avoid looping forever in a full table, take at most <code>m</code> steps."
    ],
    "check": {
     "tests": "\n_t = [(8, 'Тараз'), None, (2, 'Орал'), (10, 'Атырау'), None, None, None, (7, 'Жезқазған')]\nassert probe_get(_t, 10) == 'Атырау', \"probe_get(table, 10) 'Атырау'\"\nassert probe_get(_t, 15) is None, '15 not found: None'\nassert probe_get(_t, 8) == 'Тараз', \"8 % 8 = 0: 'Тараз'\"\nassert probe_get(_t, 7) == 'Жезқазған', \"probe_get(table, 7) 'Жезқазған'\"\nassert probe_get(_t, 18) is None, '18: 2 → 3 → 4 (empty), None'\n_full = [(0, 'a'), (1, 'b'), (2, 'c')]\nassert probe_get(_full, 5) is None, 'A key missing from a full table: there must be no endless loop, None'\nassert probe_get(_full, 2) == 'c', \"probe_get(_full, 2) 'c'\"\nassert probe_get([None] * 4, 3) is None, 'Empty table: None'\n_wrap = [(3, 'x'), None, None, (7, 'y')]\nassert probe_get(_wrap, 7) == 'y' and probe_get(_wrap, 3) == 'x', 'Wrap from the end to the start'\n"
    }
   },
   {
    "title": "Rebuilding a Table",
    "prompt": "<p>The chaining table <code>buckets</code> is a list of lists; each cell holds <code>(key, value)</code> pairs (integer keys). <code>rehash(buckets, new_m)</code> must copy all the pairs into a new table of <code>new_m</code> cells using the rule <code>key % new_m</code>. Go through the old cells in order from 0, and go through the items inside each cell in order too (so the order within each new cell is defined). Do not change the old table.</p>\n<pre><code>rehash([[(4, 'a')], [(1, 'b'), (5, 'c')], [], []], 8)\n→ [[], [(1, 'b')], [], [], [(4, 'a')], [(5, 'c')], [], []]</code></pre>",
    "hints": [
     "<code>[[] for _ in range(new_m)]</code> — not <code>[[]] * new_m</code> (otherwise all the cells become copies of one list!).",
     "Recompute the index using the new <code>new_m</code>."
    ],
    "check": {
     "tests": "\nassert rehash([[(4, 'a')], [(1, 'b'), (5, 'c')], [], []], 8) == [[], [(1, 'b')], [], [], [(4, 'a')], [(5, 'c')], [], []], 'The new table is wrong'\nassert rehash([[], []], 3) == [[], [], []], 'Empty table'\n_old = [[(2, 'x'), (6, 'y')], []]\n_new = rehash(_old, 2)\nassert _new == [[(2, 'x'), (6, 'y')], []], 'new_m = 2: all in cell 0, order kept'\nassert _old == [[(2, 'x'), (6, 'y')], []], 'Do not change the old table'\n_n = rehash([[(1, 1)]], 4); _n[0].append(9)\nassert _n[1] == [(1, 1)] and _n[2] == [] and _n[3] == [], 'Cells must be separate lists (the [[]] * m mistake)'\n_old = [[(k, k) for k in range(i, 100, 4)] for i in range(4)]\n_new = rehash(_old, 16)\nassert all(k % 16 == i for i, b in enumerate(_new) for k, v in b) and sum(map(len, _new)) == 100, 'Each key must be in its own cell'\n"
    }
   },
   {
    "title": "Quadratic Probing",
    "prompt": "<p>Another kind of open addressing: <b>quadratic probing</b>. The <code>i</code>-th probe of a key looks at cell <code>(key % m + i * i) % m</code> (<code>i = 0, 1, 2, ..., m−1</code>). <code>quad_insert(table, key)</code> writes the key into the first empty (<code>None</code>) cell and returns its index; if the key is already there, it returns its index (without rewriting it); if no probe finds a place, return <code>-1</code>.</p>\n<pre><code>t = [None] * 7\nquad_insert(t, 10) → 3\nquad_insert(t, 17) → 4     # 3 бос емес, (3 + 1) % 7 = 4\nquad_insert(t, 24) → 0     # 3, 4 бос емес, (3 + 4) % 7 = 0</code></pre>",
    "hints": [
     "<code>h = key % m</code>, probe: <code>(h + i * i) % m</code>.",
     "If you hit an existing key, return its index."
    ],
    "check": {
     "tests": "\n_t = [None] * 7\nassert quad_insert(_t, 10) == 3, 'quad_insert(t, 10) 3'\nassert quad_insert(_t, 17) == 4, 'quad_insert(t, 17) 4'\nassert quad_insert(_t, 24) == 0, 'quad_insert(t, 24) 0'\nassert _t == [24, None, None, 10, 17, None, None], f'The table state is wrong: {_t}'\nassert quad_insert(_t, 17) == 4 and _t.count(17) == 1, 'An existing key is not overwritten'\n_t2 = [None] * 4\nfor _k in (0, 4, 8):\n    quad_insert(_t2, _k)\nassert _t2 == [0, 4, None, None] or _t2.count(None) == 2, 'm = 4: probes 0, 1, 0, 1 — only two slots'\nassert quad_insert([None] * 4, 2) == 2, 'Start cell in an empty table'\n_t3 = [0, 4, None, None]\nassert quad_insert(_t3, 8) == -1 and _t3 == [0, 4, None, None], 'm = 4: no place for 8, -1, the table does not change'\n"
    }
   },
   {
    "title": "A Set with Tombstones",
    "prompt": "<p>Write a set of integers <code>ProbingSet</code> with linear probing, without using <code>set</code>/<code>dict</code>. The initial capacity is 8. Methods: <code>add(x)</code>, <code>contains(x)</code>, <code>remove(x)</code> (if the element is missing, do nothing), <code>__len__</code>. When deleting, do not put <code>None</code> in the cell; mark it with a special <b>tombstone</b> marker (for example, <code>DELETED = object()</code>) — otherwise the keys after it will be 'lost'. If the number of elements and tombstones exceeds half the capacity, double the capacity and redistribute the live elements.</p>\n<pre><code>s = ProbingSet()\ns.add(1); s.add(9)          # екеуі де 1-ұяшыққа ұмтылады\ns.remove(1)\ns.contains(9) → True        # tombstone арқылы өтеміз\nlen(s)        → 1</code></pre>",
    "hints": [
     "Search stops at <code>None</code>, but goes past tombstones; insertion can reuse a tombstone.",
     "During rehash the tombstones are dropped: add only the live elements to the new table."
    ],
    "check": {
     "tests": "\n_s = ProbingSet()\nassert len(_s) == 0 and _s.contains(5) is False, 'The empty set'\n_s.add(1); _s.add(9)\nassert _s.contains(1) and _s.contains(9) and len(_s) == 2, '1 and 9 are added'\n_s.remove(1)\nassert _s.contains(9) is True, 'You must pass the tombstone and find 9'\nassert _s.contains(1) is False and len(_s) == 1, '1 is deleted'\n_s.remove(1); _s.remove(100)\nassert len(_s) == 1, 'Deleting a missing element changes nothing'\n_s.add(9)\nassert len(_s) == 1, 'Re-adding does not change the size'\n_s.add(-3)\nassert _s.contains(-3), 'Negative numbers must work too'\nimport random as _random\n_rng = _random.Random(6)\n_ps = ProbingSet(); _ref = set()\nfor _ in range(1500):\n    _x = _rng.randint(-200, 200); _op = _rng.random()\n    if _op < 0.5: _ps.add(_x); _ref.add(_x)\n    elif _op < 0.8: _ps.remove(_x); _ref.discard(_x)\n    else: assert _ps.contains(_x) == (_x in _ref), f'contains({_x}) қате'\n    assert len(_ps) == len(_ref), 'len() қате'\nassert all(_ps.contains(_x) for _x in _ref), 'Some elements were lost'\n_big = ProbingSet()\nfor _x in range(8000):\n    _big.add(_x * 8)\nassert len(_big) == 8000 and _big.contains(8 * 7999), 'Many elements: do not forget to grow the table'\n"
    }
   },
   {
    "title": "LRU Cache",
    "prompt": "<p>The site cache: <code>LRUCache(capacity)</code>. <code>get(key)</code> returns the value (if there is none, <code>-1</code>) and marks the key as 'recently used'. <code>put(key, value)</code> writes or updates a value; if the cache is full, it removes the key that was <b>used least recently</b>. Both operations must be O(1). Tip: Python's <code>dict</code> remembers the insertion order — if you <code>pop</code> the key and insert it again, it goes to the end; the oldest one is <code>next(iter(d))</code>.</p>\n<pre><code>c = LRUCache(2)\nc.put(1, 'Алматы'); c.put(2, 'Астана')\nc.get(1)            → 'Алматы'\nc.put(3, 'Шымкент') # 2 шығады\nc.get(2)            → -1</code></pre>",
    "hints": [
     "<code>get</code>: remove the key with <code>pop</code> and insert it again — it becomes the 'newest'.",
     "<code>put</code>: when updating an existing key no one is removed; if a new key comes into a full cache, <code>next(iter(self.d))</code> is removed."
    ],
    "check": {
     "tests": "\n_c = LRUCache(2)\n_c.put(1, 'Алматы'); _c.put(2, 'Астана')\nassert _c.get(1) == 'Алматы', \"get(1) 'Алматы'\"\n_c.put(3, 'Шымкент')\nassert _c.get(2) == -1, '2 was used least recently: it must be removed'\nassert _c.get(3) == 'Шымкент' and _c.get(1) == 'Алматы', '1 and 3 remain'\n_c.put(1, 'Алматы-2')\n_c.put(4, 'Тараз')\nassert _c.get(3) == -1, 'put updated 1, so it counts as new, and 3 is removed'\nassert _c.get(1) == 'Алматы-2' and _c.get(4) == 'Тараз', 'The updated value is kept'\n_c1 = LRUCache(1)\n_c1.put('а', 1); _c1.put('б', 2)\nassert _c1.get('а') == -1 and _c1.get('б') == 2, 'Capacity 1'\nfrom collections import OrderedDict as _OD\nimport random as _random, time as _time\n_rng = _random.Random(7)\n_lru = LRUCache(5); _ref = _OD()\nfor _ in range(2000):\n    _k = _rng.randint(0, 9)\n    if _rng.random() < 0.5:\n        _v = _rng.randint(0, 99); _lru.put(_k, _v)\n        if _k in _ref: _ref.move_to_end(_k)\n        _ref[_k] = _v\n        if len(_ref) > 5: _ref.popitem(last=False)\n    else:\n        _e = _ref.get(_k, -1)\n        if _k in _ref: _ref.move_to_end(_k)\n        assert _lru.get(_k) == _e, f'get({_k}) {_e} болуы керек'\n_big = LRUCache(20000); _t0 = _time.perf_counter()\nfor _i in range(40000):\n    _big.put(_i, _i); _big.get(_i // 2)\nassert _time.perf_counter() - _t0 < 2.0, 'Operations must be O(1)'\n"
    }
   }
  ]
 },
 "alg-4": {
  "pr": [
   {
    "title": "The Count Array",
    "prompt": "<p>The first step of counting sort. <code>count_array(a, max_value)</code> must return a list of length <code>max_value + 1</code>: <code>c[v]</code> — how many times the value <code>v</code> occurs in <code>a</code> (all values are in the range <code>0..max_value</code>).</p>\n<pre><code>count_array([2, 0, 2, 3, 0, 2], 4) → [2, 0, 3, 1, 0]</code></pre>",
    "hints": [
     "<code>c = [0] * (max_value + 1)</code>, then <code>c[x] += 1</code>."
    ],
    "check": {
     "tests": "\nassert count_array([2, 0, 2, 3, 0, 2], 4) == [2, 0, 3, 1, 0], 'Expected [2, 0, 3, 1, 0]'\nassert count_array([], 2) == [0, 0, 0], 'Empty list: zeros'\nassert count_array([0, 0], 0) == [2], 'max_value = 0: [2]'\nassert count_array([5], 5) == [0, 0, 0, 0, 0, 1], 'Last value: [0, 0, 0, 0, 0, 1]'\n"
    }
   },
   {
    "title": "Is It a Max-Heap?",
    "prompt": "<p>A tree stored as an array: the children of node <code>i</code> are <code>2i + 1</code> and <code>2i + 2</code>. <code>is_max_heap(a)</code>: if every node is not smaller than its own children (<code>a[i] ≥ a[бала]</code>), then <code>True</code>.</p>\n<pre><code>is_max_heap([9, 5, 8, 1, 2, 7]) → True\nis_max_heap([9, 5, 8, 6])       → False    # 5 &lt; 6\nis_max_heap([])                 → True</code></pre>",
    "hints": [
     "It is enough to compare each parent with its children; only while the child's index is less than <code>n</code>."
    ],
    "check": {
     "tests": "\nassert is_max_heap([9, 5, 8, 1, 2, 7]) is True, 'is_max_heap([9, 5, 8, 1, 2, 7]) True'\nassert is_max_heap([9, 5, 8, 6]) is False, 'The child of 5 is 6: False'\nassert is_max_heap([]) is True, 'Empty array: True'\nassert is_max_heap([1]) is True, 'One element: True'\nassert is_max_heap([3, 3, 3]) is True, 'Equal values: True'\nassert is_max_heap([5, 6]) is False, 'A child greater than the root: False'\nassert is_max_heap([10, 9, 8, 7, 6, 5, 11]) is False, 'The last child 11 > 8: False'\n"
    }
   },
   {
    "title": "Sorting Scores by Counting",
    "prompt": "<p>UNT scores lie in the range <code>0..140</code>. <code>sort_scores(scores)</code> must return a new list of the scores sorted in <b>descending</b> order. Counting sort: do not use <code>sorted</code> or <code>.sort</code>. O(n + 141).</p>\n<pre><code>sort_scores([95, 120, 95, 60]) → [120, 95, 95, 60]</code></pre>",
    "hints": [
     "Go through the count array from the end to the start."
    ],
    "check": {
     "tests": "\nassert sort_scores([95, 120, 95, 60]) == [120, 95, 95, 60], 'Expected [120, 95, 95, 60]'\nassert sort_scores([]) == [], 'Empty list: []'\nassert sort_scores([0, 140]) == [140, 0], 'Extreme values: [140, 0]'\nimport random as _random\n_rng = _random.Random(1)\n_x = [_rng.randint(0, 140) for _ in range(5000)]\nassert sort_scores(_x) == sorted(_x, reverse=True), 'The score 5000 was sorted wrongly'\n"
    }
   },
   {
    "title": "Sifting Down",
    "prompt": "<p>The main operation of heapsort. <code>sift_down(a, i, n)</code>: <code>a[0:n]</code> is a max-heap, except that node <code>i</code> may be out of place. Swap it with its larger child and move it down until it reaches its place (in place, returns nothing). Do not touch the elements after <code>n</code>.</p>\n<pre><code>a = [1, 9, 8, 5, 6]\nsift_down(a, 0, 5)    # a == [9, 6, 8, 5, 1]</code></pre>",
    "hints": [
     "Find the largest of the three elements (the node, the left and the right one); if the node itself is the largest, stop.",
     "Compare the child index with <code>n</code>, not with <code>len(a)</code>."
    ],
    "check": {
     "tests": "\n_a = [1, 9, 8, 5, 6]; sift_down(_a, 0, 5)\nassert _a == [9, 6, 8, 5, 1], f'Expected [9, 6, 8, 5, 1], yours is {_a}'\n_a = [3, 2, 1]; sift_down(_a, 0, 3)\nassert _a == [3, 2, 1], 'If it is already in place, it does not change'\n_a = [1, 5, 4, 100]; sift_down(_a, 0, 3)\nassert _a == [5, 1, 4, 100], 'Do not touch the elements after n: [5, 1, 4, 100]'\n_a = [7]; sift_down(_a, 0, 1); assert _a == [7], 'Бір элемент'\n_a = [5, 1, 4, 3, 2]; sift_down(_a, 1, 5)\nassert _a == [5, 3, 4, 1, 2], 'Sifting down an inner node: [5, 3, 4, 1, 2]'\n"
    }
   },
   {
    "title": "Radix Sort",
    "prompt": "<p>Radix sort (LSD): we sort non-negative integers first by the units digit, then by the tens, and so on, each time with a <b>stable</b> counting sort. <code>radix_sort(a)</code> must return a new sorted list, without using <code>sorted</code>/<code>.sort</code>. For each digit position, 10 'buckets' (lists) are enough: collecting them in order keeps the sort stable.</p>\n<pre><code>radix_sort([170, 45, 75, 90, 802, 24, 2, 66]) → [2, 24, 45, 66, 75, 90, 170, 802]</code></pre>",
    "hints": [
     "The digit at a position: <code>(x // exp) % 10</code>, <code>exp = 1, 10, 100, ...</code>.",
     "Repeat until the digits of the largest number run out; take into account an empty list and lists of only zeros."
    ],
    "check": {
     "tests": "\nassert radix_sort([170, 45, 75, 90, 802, 24, 2, 66]) == [2, 24, 45, 66, 75, 90, 170, 802], 'The sort is wrong'\nassert radix_sort([]) == [], 'Empty list: []'\nassert radix_sort([0, 0]) == [0, 0], 'Zeros: [0, 0]'\n_a = [3, 1, 2]; radix_sort(_a)\nassert _a == [3, 1, 2], 'Do not change the original list'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(20):\n    _x = [_rng.randint(0, 10**_rng.randint(1, 7)) for _ in range(_rng.randint(1, 60))]\n    assert radix_sort(_x) == sorted(_x), f'{_x[:6]}... қате сұрыпталды'\n"
    }
   },
   {
    "title": "Building a Heap",
    "prompt": "<p><code>build_heap(a)</code> must turn the array into a max-heap <b>in place</b>: starting from the last parent node (<code>n // 2 − 1</code>) and going down to 0, do sift down for each node. This is O(n), faster than inserting the elements one by one (O(n log n)). Do not use <code>heapq</code> (it is a min-heap).</p>\n<pre><code>a = [3, 1, 6, 5, 2, 4]\nbuild_heap(a)    # a == [6, 5, 4, 1, 2, 3]</code></pre>",
    "hints": [
     "The leaves are heaps already: only sift down the nodes from <code>n // 2 − 1</code> down to 0.",
     "Write sift down the same way as in the previous task."
    ],
    "check": {
     "tests": "\ndef _is_heap(a):\n    return all(a[(i - 1) // 2] >= a[i] for i in range(1, len(a)))\n_a = [3, 1, 6, 5, 2, 4]; build_heap(_a)\nassert _a == [6, 5, 4, 1, 2, 3], f'Expected [6, 5, 4, 1, 2, 3], yours is {_a}'\n_a = []; build_heap(_a); assert _a == [], 'Бос массив'\n_a = [1]; build_heap(_a); assert _a == [1], 'Бір элемент'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _x = [_rng.randint(0, 20) for _ in range(_rng.randint(0, 25))]; _y = list(_x)\n    build_heap(_y)\n    assert _is_heap(_y) and sorted(_y) == sorted(_x), f'{_x}: нәтиже max-heap емес немесе элементтер өзгерді'\n"
    }
   },
   {
    "title": "Nearly Sorted List",
    "prompt": "<p>The timestamps from a sensor are 'nearly sorted': each element is at most <code>k</code> positions away from its place in the sorted list. <code>sort_nearly(a, k)</code> must return a new sorted list in O(n log k): keep a min-heap of size <code>k + 1</code> (<code>heapq</code>) — its minimum always fits the next place. Do not use <code>sorted</code>/<code>.sort</code>.</p>\n<pre><code>sort_nearly([6, 5, 3, 2, 8, 10, 9], 3) → [2, 3, 5, 6, 8, 9, 10]</code></pre>",
    "hints": [
     "When <code>k + 1</code> elements have been collected in the heap, pop the minimum.",
     "At the end, take out the remaining elements of the heap in order."
    ],
    "check": {
     "tests": "\nassert sort_nearly([6, 5, 3, 2, 8, 10, 9], 3) == [2, 3, 5, 6, 8, 9, 10], 'Expected [2, 3, 5, 6, 8, 9, 10]'\nassert sort_nearly([], 2) == [], 'Empty list: []'\nassert sort_nearly([1, 2, 3], 0) == [1, 2, 3], 'k = 0: the list is already sorted'\nassert sort_nearly([2, 1], 5) == [1, 2], 'k is larger than the list'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(40):\n    _n = _rng.randint(0, 20); _k = _rng.randint(0, 4)\n    _s = sorted(_rng.randint(0, 50) for _ in range(_n)); _x = list(_s)\n    for _i in range(0, _n, _k + 1):\n        _blk = _x[_i:_i + _k + 1]; _rng.shuffle(_blk); _x[_i:_i + _k + 1] = _blk\n    assert sort_nearly(_x, _k) == _s, f'sort_nearly({_x}, {_k}) {_s} болуы керек'\n_big = list(range(200000))\nfor _i in range(0, 200000 - 10, 10):\n    _big[_i], _big[_i + 9] = _big[_i + 9], _big[_i]\n_t0 = _time.perf_counter(); _r = sort_nearly(_big, 9); _dt = _time.perf_counter() - _t0\nassert _r == list(range(200000)) and _dt < 2.0, f'200 000 elements, k = 9: O(n log k) is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "The Largest Gap",
    "prompt": "<p>The coordinates of the petrol stations along the road are <code>xs</code> (unordered, integers, non-negative). <code>max_gap(xs)</code> must return the largest distance between two neighbouring stations in sorted order; if there are fewer than two stations, return 0. Linear time: the bucket idea. If there are <code>n</code>, <code>lo = min</code> and <code>hi = max</code> stations, the largest gap is at least <code>⌈(hi − lo) / (n − 1)⌉</code>; so in buckets of that size it is enough to store only the min and max and check the gaps between neighbouring non-empty buckets. Do not use <code>sorted</code>/<code>.sort</code>.</p>\n<pre><code>max_gap([3, 6, 9, 1]) → 3\nmax_gap([10])         → 0\nmax_gap([5, 5, 5])    → 0</code></pre>",
    "hints": [
     "The difference inside one bucket is less than <code>size</code>, so the answer is always between two buckets: the min of the next non-empty bucket minus the max of the previous one.",
     "The bucket index: <code>(x − lo) // size</code>."
    ],
    "check": {
     "tests": "\nassert max_gap([3, 6, 9, 1]) == 3, 'Expected 3'\nassert max_gap([10]) == 0, 'One station: 0'\nassert max_gap([]) == 0, 'No stations: 0'\nassert max_gap([5, 5, 5]) == 0, 'All at one point: 0'\nassert max_gap([1, 10000000]) == 9999999, 'Two stations'\nassert max_gap([1, 1, 1, 5, 5]) == 4, 'Repeats: 4'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(60):\n    _x = [_rng.randint(0, 100) for _ in range(_rng.randint(0, 15))]\n    _s = sorted(_x)\n    _exp = max([b - a for a, b in zip(_s, _s[1:])] + [0])\n    assert max_gap(_x) == _exp, f'max_gap({_x}) {_exp} болуы керек'\n_big = [_rng.randint(0, 10**9) for _ in range(100000)]\n_s = sorted(_big)\nassert max_gap(_big) == max(b - a for a, b in zip(_s, _s[1:])), 'An error on the big test'\n"
    }
   }
  ]
 },
 "alg-5": {
  "pr": [
   {
    "title": "Balance Factor",
    "prompt": "<p><code>balance_factor(node)</code> = <code>height(left) − height(right)</code> (the height of an empty tree is 0). For an empty node — 0. Write a helper function that computes the height recursively.</p>\n<pre><code>balance_factor(Node(3, Node(2, Node(1)))) → 2\nbalance_factor(Node(1, None, Node(2)))    → -1</code></pre>",
    "hints": [
     "Use the function <code>height</code> from the lesson."
    ],
    "check": {
     "tests": "\nassert balance_factor(Node(3, Node(2, Node(1)))) == 2, 'Left height 2, right 0: 2'\nassert balance_factor(Node(1, None, Node(2))) == -1, 'Only a right child: -1'\nassert balance_factor(None) == 0, 'Empty node: 0'\nassert balance_factor(Node(5)) == 0, 'Leaf: 0'\nassert balance_factor(Node(4, Node(2, Node(1), Node(3)), Node(6))) == 1, 'Expected 1'\n"
    }
   },
   {
    "title": "Inserting a Key into a BST",
    "prompt": "<p><code>bst_insert(root, key)</code> inserts the key into a BST (a plain tree without balancing) and returns the root. When inserting into an empty tree, the new node becomes the root. If the key is already there, insert nothing.</p>\n<pre><code>root = None\nfor k in [50, 30, 70, 30]:\n    root = bst_insert(root, k)\n# inorder: [30, 50, 70]</code></pre>",
    "hints": [
     "<code>key &lt; root.key</code> — left, <code>key &gt; root.key</code> — right, equal — nothing.",
     "Assign the result of the recursion to <code>root.left</code>/<code>root.right</code>."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\n_r = None\nfor _k in [50, 30, 70, 30]:\n    _r = bst_insert(_r, _k)\nassert _ino(_r) == [30, 50, 70], f'Inorder must be [30, 50, 70], yours is {_ino(_r)}'\nassert _r.key == 50 and _r.left.key == 30 and _r.right.key == 70, 'The structure is wrong'\n_one = bst_insert(None, 5)\nassert _one.key == 5 and _one.left is None and _one.right is None, 'Inserting into an empty tree: a new node'\n_r2 = None\nfor _k in [1, 2, 3, 4]:\n    _r2 = bst_insert(_r2, _k)\nassert _h(_r2) == 4, 'Inserting in increasing order into an unbalanced BST gives height 4'\n"
    }
   },
   {
    "title": "Smallest and Largest Key",
    "prompt": "<p><code>min_max(root)</code> must return the smallest and the largest key of the BST as a tuple <code>(min, max)</code>. An empty tree — <code>None</code>. There is no need to traverse the whole tree: go down to the leftmost and the rightmost node — O(h).</p>\n<pre><code># BST: 8, 3, 10, 1, 6, 14\nmin_max(root) → (1, 14)</code></pre>",
    "hints": [
     "<code>while node.left:</code> — the smallest one is in the leftmost node."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert min_max(_bst([8, 3, 10, 1, 6, 14])) == (1, 14), 'Expected (1, 14)'\nassert min_max(None) is None, 'Empty tree: None'\nassert min_max(Node(7)) == (7, 7), 'One node: (7, 7)'\nassert min_max(_bst([5, 4, 3, 2])) == (2, 5), 'Only a left subtree: (2, 5)'\nassert min_max(_bst([-1, 0, 1])) == (-1, 1), 'Only a right subtree: (-1, 1)'\n"
    }
   },
   {
    "title": "Unbalanced Nodes",
    "prompt": "<p><code>unbalanced(root)</code> must return, in inorder, the keys of all nodes whose balance factor is <code>|bf| &gt; 1</code>. O(n): compute the heights bottom-up in one pass (do not call <code>height</code> again at each node).</p>\n<pre><code># 30 → сол 20 → сол 10,  30 → оң 40\nunbalanced(Node(30, Node(20, Node(10, Node(5))), Node(40))) → [20, 30]</code></pre>",
    "hints": [
     "The helper function <code>(биіктік, кілттер_тізімі)</code> returns a pair.",
     "Inorder: the left list + (this node, if it is unbalanced) + the right list."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert unbalanced(Node(30, Node(20, Node(10, Node(5))), Node(40))) == [20, 30], 'Expected [20, 30]'\nassert unbalanced(None) == [], 'Empty tree: []'\nassert unbalanced(_bst([4, 2, 6, 1, 3, 5, 7])) == [], 'A full tree is balanced: []'\nassert unbalanced(_bst([1, 2, 3, 4])) == [1, 2], 'A chain growing to the right: [1, 2]'\nassert unbalanced(Node(1, None, Node(2))) == [], 'Difference 1: []'\nimport time as _time\n_big = _bst(list(range(500)))\n_t0 = _time.perf_counter(); _r = unbalanced(_big); _dt = _time.perf_counter() - _t0\nassert _r == list(range(498)), 'In a chain of 500 nodes all except the last two are unbalanced'\nassert _dt < 1.0, f'{_dt:.2f} s: do not recompute the height at each node (O(n²))'\n"
    }
   },
   {
    "title": "Rotation Type",
    "prompt": "<p>After inserting the key <code>node</code>, the tree may become unbalanced. <code>rotation_case(node)</code> must return which rotation is needed. If <code>bf(node) &gt; 1</code>, then: when the <code>bf ≥ 0</code> of the left child is <code>'LL'</code>, otherwise <code>'LR'</code>. If <code>bf(node) &lt; −1</code>, then: when the <code>bf ≤ 0</code> of the right child is <code>'RR'</code>, otherwise <code>'RL'</code>. If the tree is balanced — <code>None</code>.</p>\n<pre><code>rotation_case(Node(30, Node(10, None, Node(20)))) → 'LR'\nrotation_case(Node(10, None, Node(20, None, Node(30)))) → 'RR'</code></pre>",
    "hints": [
     "First the helper functions <code>height</code> and <code>bf</code>.",
     "Example from the lesson: 30, 10, 20 — LR."
    ],
    "check": {
     "tests": "\nassert rotation_case(Node(30, Node(10, None, Node(20)))) == 'LR', \"30, 10, 20: 'LR'\"\nassert rotation_case(Node(10, None, Node(20, None, Node(30)))) == 'RR', \"10, 20, 30: 'RR'\"\nassert rotation_case(Node(30, Node(20, Node(10)))) == 'LL', \"30, 20, 10: 'LL'\"\nassert rotation_case(Node(10, None, Node(30, Node(20)))) == 'RL', \"10, 30, 20: 'RL'\"\nassert rotation_case(Node(2, Node(1), Node(3))) is None, 'Balanced: None'\nassert rotation_case(None) is None, 'Empty node: None'\nassert rotation_case(Node(5, Node(3, Node(2), Node(4)))) == 'LL', \"bf of the left child = 0: 'LL'\"\n"
    }
   },
   {
    "title": "Is It an AVL Tree?",
    "prompt": "<p><code>is_avl(root)</code>: the tree is at the same time (1) a strict BST (at every node <b>all</b> keys on the left are smaller and those on the right are larger) and (2) at every node, if <code>|bf| ≤ 1</code>, then <code>True</code>. Check both conditions in one recursive traversal: O(n).</p>\n<pre><code>is_avl(Node(2, Node(1), Node(3)))          → True\nis_avl(Node(2, Node(3), Node(1)))          → False   # BST емес\nis_avl(Node(3, Node(2, Node(1))))          → False   # теңгерімсіз</code></pre>",
    "hints": [
     "The helper function takes the allowed interval <code>(lo, hi)</code> and returns the height, or <code>−1</code> if there is an error."
    ],
    "check": {
     "tests": "\ndef _h(n):\n    return 0 if n is None else 1 + max(_h(n.left), _h(n.right))\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _bst(keys):\n    root = None\n    def ins(n, k):\n        if n is None: return Node(k)\n        if k < n.key: n.left = ins(n.left, k)\n        elif k > n.key: n.right = ins(n.right, k)\n        return n\n    for k in keys:\n        root = ins(root, k)\n    return root\n\nassert is_avl(Node(2, Node(1), Node(3))) is True, 'A correct AVL: True'\nassert is_avl(Node(2, Node(3), Node(1))) is False, 'Not a BST: False'\nassert is_avl(Node(3, Node(2, Node(1)))) is False, 'Unbalanced: False'\nassert is_avl(None) is True, 'Empty tree: True'\nassert is_avl(Node(10, Node(5, None, Node(12)), Node(15))) is False, '12 to the left of 10: False'\nassert is_avl(_bst([4, 2, 6, 1, 3, 5, 7])) is True, 'A full BST: True'\nassert is_avl(Node(5, Node(5))) is False, 'Equal key: False'\n"
    }
   },
   {
    "title": "Inserting a Key into an AVL Tree",
    "prompt": "<p>Each node stores its height: <code>Node(key)</code>, <code>height = 1</code>. <code>avl_insert(root, key)</code> must insert the key and return the new root, keeping the balance (if the key is already there — unchanged). After insertion, update the height at each node on the path, and if <code>|bf| &gt; 1</code>, perform a rotation for one of the four cases (LL, LR, RR, RL). Do not forget to update the heights bottom-up after a rotation. Each insertion is O(log n).</p>\n<pre><code>root = None\nfor k in [10, 20, 30, 40, 50, 25]:\n    root = avl_insert(root, k)\nroot.key → 30</code></pre>",
    "hints": [
     "After a rotation, first update the height of the node that moved down, then the height of the new root.",
     "LR: <code>root.left = rotate_left(root.left)</code>, then <code>rotate_right(root)</code>; RL is the opposite."
    ],
    "check": {
     "tests": "\ndef _ino(n):\n    return _ino(n.left) + [n.key] + _ino(n.right) if n else []\ndef _check(n):\n    if n is None: return 0\n    hl, hr = _check(n.left), _check(n.right)\n    assert abs(hl - hr) <= 1, f'{n.key} түйінінде теңгерім бұзылған'\n    assert n.height == 1 + max(hl, hr), f'{n.key} түйінінің height өрісі қате'\n    return 1 + max(hl, hr)\n_r = None\nfor _k in [10, 20, 30, 40, 50, 25]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 30, f'The root must be 30, yours is {_r.key}'\nassert _ino(_r) == [10, 20, 25, 30, 40, 50], 'Inorder error'\n_check(_r)\n_r = None\nfor _k in [30, 10, 20]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 20 and _r.left.key == 10 and _r.right.key == 30, 'LR case: root 20'\n_r = None\nfor _k in [10, 30, 20]:\n    _r = avl_insert(_r, _k)\nassert _r.key == 20, 'RL case: root 20'\n_r = avl_insert(avl_insert(None, 5), 5)\nassert _ino(_r) == [5], 'An existing key is not inserted again'\n_r = None\nfor _k in range(2000):\n    _r = avl_insert(_r, _k)\nassert _check(_r) <= 12, '2000 keys in increasing order: the height must be ≤ 12'\nassert _ino(_r) == list(range(2000)), 'Inorder must be 0..1999'\nimport random as _random\n_rng = _random.Random(1)\n_r = None; _keys = set()\nfor _ in range(1500):\n    _k = _rng.randint(0, 3000); _keys.add(_k); _r = avl_insert(_r, _k)\n_check(_r)\nassert _ino(_r) == sorted(_keys), 'Random keys: inorder error'\n"
    }
   },
   {
    "title": "Maximum Height of an AVL Tree",
    "prompt": "<p>An AVL tree of height <code>h</code> has at least <code>N(h)</code> nodes: <code>N(0) = 0</code>, <code>N(1) = 1</code>, <code>N(h) = N(h−1) + N(h−2) + 1</code> (the height of one subtree is <code>h−1</code>, the other is <code>h−2</code>). <code>max_avl_height(n)</code> must return the greatest height that an AVL tree with <code>n</code> nodes can have: the largest <code>h</code> for which <code>N(h) ≤ n</code>. <code>n</code> can be very large (<code>10<sup>18</sup></code>).</p>\n<pre><code>max_avl_height(0)  → 0\nmax_avl_height(4)  → 3\nmax_avl_height(7)  → 4</code></pre>",
    "hints": [
     "Compute the values <code>N</code> with DP in order, and increase <code>h</code> until it reaches <code>N(h) ≤ n</code>.",
     "<code>N(h)</code> grows exponentially, like Fibonacci: for 10<sup>18</sup> about 90 steps are needed."
    ],
    "check": {
     "tests": "\nassert max_avl_height(0) == 0, 'n = 0: 0'\nassert max_avl_height(1) == 1, 'n = 1: 1'\nassert max_avl_height(2) == 2 and max_avl_height(3) == 2, 'n = 2, 3: 2'\nassert max_avl_height(4) == 3, 'n = 4: 3'\nassert max_avl_height(6) == 3, 'n = 6: 3'\nassert max_avl_height(7) == 4, 'n = 7: 4'\nassert max_avl_height(12) == 5 and max_avl_height(11) == 4, 'N(5) = 12'\n_N = [0, 1]\nwhile len(_N) < 100:\n    _N.append(_N[-1] + _N[-2] + 1)\nfor _h in range(1, 90):\n    assert max_avl_height(_N[_h]) == _h and max_avl_height(_N[_h] - 1) == _h - 1, f'N({_h}) = {_N[_h]} шекарасында қате'\nimport math as _math\nassert max_avl_height(10**18) <= 1.45 * _math.log2(10**18) + 2, 'The height must not exceed about 1.44·log₂ n'\n"
    }
   }
  ]
 },
 "alg-6": {
  "pr": [
   {
    "title": "Path-Compressing Find",
    "prompt": "<p><code>parent</code> is a union-find array (if <code>parent[x] == x</code>, then <code>x</code> is the root). <code>find(parent, x)</code> must return the root of <code>x</code> and <b>compress the path</b>: point every vertex on the path directly at the root through <code>parent</code>. On a long chain the recursion may be deep: use a loop.</p>\n<pre><code>p = [0, 0, 1, 2]\nfind(p, 3) → 0      # p == [0, 0, 0, 0]</code></pre>",
    "hints": [
     "The first loop finds the root; the second loop walks the path again and points each vertex to the root."
    ],
    "check": {
     "tests": "\n_p = [0, 0, 1, 2]\nassert find(_p, 3) == 0, 'find(p, 3) must be 0'\nassert _p == [0, 0, 0, 0], f'The path must be compressed: [0, 0, 0, 0], yours is {_p}'\n_p = [0, 1, 2]\nassert find(_p, 2) == 2 and _p == [0, 1, 2], 'The root itself: unchanged'\n_p = [1, 1, 1, 0, 3]\nassert find(_p, 4) == 1 and _p == [1, 1, 1, 1, 1], 'Expected [1, 1, 1, 1, 1]'\n_n = 100000; _p = [max(0, i - 1) for i in range(_n)]\nassert find(_p, _n - 1) == 0 and _p[_n - 1] == 0 and _p[_n // 2] == 0, 'A chain of 100 000 links: without recursion, the path must be compressed'\n"
    }
   },
   {
    "title": "In the Same Group?",
    "prompt": "<p>In a school there are <code>n</code> pupils, <code>pairs</code> is a list of friend pairs (friends of friends are in the same group too). <code>same_group(n, pairs, a, b)</code>: if <code>a</code> and <code>b</code> are in the same group, then <code>True</code>. Union-find: for each pair <code>union</code>, then <code>find(a) == find(b)</code>.</p>\n<pre><code>same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 2) → True\nsame_group(5, [(0, 1), (1, 2), (3, 4)], 0, 4) → False</code></pre>",
    "hints": [
     "<code>parent = list(range(n))</code>.",
     "<code>union</code>: <code>parent[find(x)] = find(y)</code>."
    ],
    "check": {
     "tests": "\nassert same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 2) is True, '0 — 1 — 2: True'\nassert same_group(5, [(0, 1), (1, 2), (3, 4)], 0, 4) is False, 'Different groups: False'\nassert same_group(1, [], 0, 0) is True, 'With itself: True'\nassert same_group(3, [], 0, 1) is False, 'No pairs: False'\n_n = 50000; _pairs = [(i, i + 1) for i in range(_n - 1)]\nassert same_group(_n, _pairs, 0, _n - 1) is True, 'A long chain: True'\n"
    }
   },
   {
    "title": "The Largest Group",
    "prompt": "<p><code>largest_group(n, pairs)</code> returns the size of the largest group (connected component) using union-find. Union by size: store the group size at each root, and attach the smaller group to the larger one. <code>n ≥ 1</code>.</p>\n<pre><code>largest_group(6, [(0, 1), (1, 2), (3, 4)]) → 3\nlargest_group(3, [])                       → 1</code></pre>",
    "hints": [
     "When uniting, <code>size[ra] += size[rb]</code>.",
     "Do not unite a pair that is already in one group again — the size would be added twice."
    ],
    "check": {
     "tests": "\nassert largest_group(6, [(0, 1), (1, 2), (3, 4)]) == 3, 'Expected 3'\nassert largest_group(3, []) == 1, 'No pairs: 1'\nassert largest_group(3, [(0, 1), (1, 0), (0, 1)]) == 2, 'A repeated pair does not increase the size: 2'\nassert largest_group(4, [(0, 1), (2, 3), (1, 3)]) == 4, 'All in one group: 4'\nassert largest_group(2, [(1, 1)]) == 1, 'A pair with itself: 1'\n"
    }
   },
   {
    "title": "A System of Equalities",
    "prompt": "<p>The variables are single lowercase Latin letters. <code>eqs</code> — strings of the form <code>'a==b'</code> or <code>'a!=b'</code>. <code>consistent(eqs)</code> must return <code>True</code> if there are values that satisfy all the conditions at once. First unite all the <code>==</code> with union-find, then check each <code>!=</code>.</p>\n<pre><code>consistent(['a==b', 'b!=a'])          → False\nconsistent(['a==b', 'b==c', 'a!=d'])  → True\nconsistent(['a!=a'])                  → False</code></pre>",
    "hints": [
     "The structure of the string is fixed: <code>e[0]</code>, <code>e[1:3]</code>, <code>e[3]</code>.",
     "Two passes: first <code>==</code>, then <code>!=</code> — the order matters."
    ],
    "check": {
     "tests": "\nassert consistent(['a==b', 'b!=a']) is False, \"['a==b', 'b!=a']: False\"\nassert consistent(['a==b', 'b==c', 'a!=d']) is True, 'It must be True'\nassert consistent(['a!=a']) is False, \"'a!=a': False\"\nassert consistent([]) is True, 'No conditions: True'\nassert consistent(['a!=b', 'b==c', 'c==a']) is False, 'Even if != comes first: False'\nassert consistent(['a==a', 'b!=c']) is True, 'It must be True'\nassert consistent(['c==c', 'b==d', 'x!=z']) is True, 'It must be True'\n"
    }
   },
   {
    "title": "Connecting the Network",
    "prompt": "<p>An office has <code>n</code> computers, and <code>cables</code> are the existing cables. A cable can be taken from one pair and connected to another pair. What is the smallest number of cables that have to be moved to connect all the computers into one network? <code>moves_needed(n, cables)</code> must return it; if there are not enough cables, <code>-1</code>. Tip: if there are fewer cables than <code>n − 1</code>, it is impossible; otherwise the answer is the number of components − 1.</p>\n<pre><code>moves_needed(4, [(0, 1), (0, 2), (1, 2)])                 → 1\nmoves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2)])         → -1</code></pre>",
    "hints": [
     "Start the component count at <code>n</code> and decrease it by 1 at each successful <code>union</code> union."
    ],
    "check": {
     "tests": "\nassert moves_needed(4, [(0, 1), (0, 2), (1, 2)]) == 1, 'Expected 1'\nassert moves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2)]) == -1, 'Not enough cables: -1'\nassert moves_needed(6, [(0, 1), (0, 2), (0, 3), (1, 2), (1, 3)]) == 2, 'Expected 2'\nassert moves_needed(1, []) == 0, 'One computer: 0'\nassert moves_needed(3, [(0, 1), (1, 2)]) == 0, 'Everything is already connected: 0'\n"
    }
   },
   {
    "title": "Removable Stones",
    "prompt": "<p>On the board there are stones <code>stones</code> at coordinates <code>(жол, баған)</code> (all different). A stone can be removed if there is <b>another</b> stone in its row or column. <code>max_removed(stones)</code> must return the maximum number of stones that can be removed. Join stones that share a row or a column with union-find: from each group you can remove all the stones except one — the answer is <code>тас саны − топ саны</code>.</p>\n<pre><code>max_removed([(0, 0), (0, 1), (1, 0), (1, 2), (2, 1), (2, 2)]) → 5\nmax_removed([(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)])         → 3</code></pre>",
    "hints": [
     "Make the vertices not the stone itself but its row and its column: <code>('r', r)</code> and <code>('c', c)</code> — each stone joins these two vertices.",
     "The number of groups is the number of distinct roots of the stones' rows."
    ],
    "check": {
     "tests": "\nassert max_removed([(0, 0), (0, 1), (1, 0), (1, 2), (2, 1), (2, 2)]) == 5, 'Expected 5'\nassert max_removed([(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)]) == 3, 'Expected 3'\nassert max_removed([(0, 0)]) == 0, 'One stone: 0'\nassert max_removed([]) == 0, 'No stones: 0'\nassert max_removed([(0, 0), (1, 1), (2, 2)]) == 0, 'No common row/column: 0'\nassert max_removed([(0, 1), (1, 0)]) == 0, 'No common row/column: 0'\nassert max_removed([(5, 1), (5, 9), (3, 9)]) == 2, 'Chain: 2'\n"
    }
   },
   {
    "title": "Islands Appearing",
    "prompt": "<p>In the sea there is a grid <code>R × C</code>; at the start everything is water. Land appears one by one according to the list <code>positions</code>. <code>islands_over_time(R, C, positions)</code> must return the list of the number of islands after each addition (an island is a group of neighbouring land cells in the four directions). One position may repeat. Union-find: a new cell is +1 island, and each successful union with a neighbouring land is −1. Overall O(k·α).</p>\n<pre><code>islands_over_time(3, 3, [(0, 0), (0, 1), (1, 2), (2, 1), (1, 1)]) → [1, 1, 2, 3, 1]</code></pre>",
    "hints": [
     "The dictionary <code>parent</code> contains only land cells; no key means water.",
     "A repeated position does not change the count."
    ],
    "check": {
     "tests": "\nassert islands_over_time(3, 3, [(0, 0), (0, 1), (1, 2), (2, 1), (1, 1)]) == [1, 1, 2, 3, 1], 'Expected [1, 1, 2, 3, 1]'\nassert islands_over_time(1, 1, [(0, 0), (0, 0)]) == [1, 1], 'A repeated position: [1, 1]'\nassert islands_over_time(2, 2, []) == [], 'No positions: []'\nassert islands_over_time(1, 3, [(0, 0), (0, 2), (0, 1)]) == [1, 2, 1], 'The middle cell joins two islands'\nassert islands_over_time(2, 2, [(0, 0), (1, 1)]) == [1, 2], 'A diagonal is not a neighbour: [1, 2]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\ndef _count(land):\n    seen = set(); c = 0\n    for s in land:\n        if s in seen: continue\n        c += 1; st = [s]; seen.add(s)\n        while st:\n            r, cc = st.pop()\n            for q in ((r + 1, cc), (r - 1, cc), (r, cc + 1), (r, cc - 1)):\n                if q in land and q not in seen: seen.add(q); st.append(q)\n    return c\nfor _ in range(20):\n    _R, _C = _rng.randint(1, 5), _rng.randint(1, 5)\n    _pos = [(_rng.randrange(_R), _rng.randrange(_C)) for _ in range(_rng.randint(0, 15))]\n    _exp = [_count(set(_pos[:i + 1])) for i in range(len(_pos))]\n    assert islands_over_time(_R, _C, _pos) == _exp, f'islands_over_time({_R}, {_C}, {_pos}) {_exp} болуы керек'\n_pos = [(r, c) for r in range(200) for c in range(200)]; _rng.shuffle(_pos)\n_t0 = _time.perf_counter(); _r = islands_over_time(200, 200, _pos); _dt = _time.perf_counter() - _t0\nassert _r[-1] == 1 and _dt < 2.0, f'200×200: at the end 1 island, union-find is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "The Time Everyone Knows Each Other",
    "prompt": "<p>At a camp there are <code>n</code> children (<code>0..n−1</code>). <code>logs</code> — <code>(уақыт, a, b)</code>: at that time <code>a</code> and <code>b</code> got acquainted (the records are given in random order). Acquaintance is transitive. <code>all_connected_time(n, logs)</code> must return the <b>earliest</b> time at which all the children join one group; if they never join, <code>-1</code>. Sort the logs by time and track the number of components with union-find.</p>\n<pre><code>all_connected_time(4, [(20, 0, 1), (10, 1, 2), (30, 2, 3), (25, 0, 2)]) → 30\nall_connected_time(3, [(5, 0, 1)])                                   → -1</code></pre>",
    "hints": [
     "The tuples <code>sorted(logs)</code> are sorted by time first.",
     "The time at which the number of components reaches 1 is the answer. If there is one child — 0."
    ],
    "check": {
     "tests": "\nassert all_connected_time(4, [(20, 0, 1), (10, 1, 2), (30, 2, 3), (25, 0, 2)]) == 30, 'Expected 30'\nassert all_connected_time(3, [(5, 0, 1)]) == -1, 'They never join: -1'\nassert all_connected_time(1, []) == 0, 'One child: 0'\nassert all_connected_time(2, [(7, 1, 0), (3, 0, 1)]) == 3, 'The earliest time: 3'\nassert all_connected_time(3, [(1, 0, 1), (2, 1, 0), (9, 2, 1)]) == 9, 'Expected 9'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(30):\n    _n = _rng.randint(2, 6)\n    _logs = [(_rng.randint(0, 50), _rng.randrange(_n), _rng.randrange(_n)) for _ in range(_rng.randint(0, 10))]\n    _exp = -1\n    for _t in sorted(set(x[0] for x in _logs)):\n        _p = list(range(_n))\n        def _f(x):\n            while _p[x] != x: x = _p[x]\n            return x\n        for t2, a, b in _logs:\n            if t2 <= _t: _p[_f(a)] = _f(b)\n        if len({_f(i) for i in range(_n)}) == 1:\n            _exp = _t; break\n    assert all_connected_time(_n, _logs) == _exp, f'all_connected_time({_n}, {_logs}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "alg-7": {
  "pr": [
   {
    "title": "Building a Graph Dictionary",
    "prompt": "<p><code>build_graph(edges, directed)</code>: <code>edges</code> — <code>(u, v, w)</code> edges. Return a dictionary: vertex → list of <code>[(көрші, салмақ)]</code> (the edges in the given order). If <code>directed=False</code>, each edge is added in both directions. Every <b>vertex</b> that is met must be a key (even if it has no outgoing edges — with an empty list).</p>\n<pre><code>build_graph([('A', 'B', 5), ('B', 'C', 2)], True)\n→ {'A': [('B', 5)], 'B': [('C', 2)], 'C': []}</code></pre>",
    "hints": [
     "<code>g.setdefault(v, [])</code> — a vertex that has only an incoming edge also becomes a key."
    ],
    "check": {
     "tests": "\nassert build_graph([('A', 'B', 5), ('B', 'C', 2)], True) == {'A': [('B', 5)], 'B': [('C', 2)], 'C': []}, 'The directed graph is wrong'\nassert build_graph([('A', 'B', 5)], False) == {'A': [('B', 5)], 'B': [('A', 5)]}, 'Undirected graph: in both directions'\nassert build_graph([], False) == {}, 'No edges: {}'\nassert build_graph([(1, 2, 3), (1, 3, 4)], False) == {1: [(2, 3), (3, 4)], 2: [(1, 3)], 3: [(1, 4)]}, 'Integer vertices, the order is kept'\n"
    }
   },
   {
    "title": "Route Cost",
    "prompt": "<p><code>graph</code> — vertex → <code>[(көрші, салмақ)]</code>. <code>route_cost(graph, route)</code> must return the total distance along the route. If there are several edges between two vertices, take the shortest. If there is no edge on the route, return <code>None</code>. A route of one vertex — 0.</p>\n<pre><code>g = {'Алматы': [('Қонаев', 70), ('Талдықорған', 270)], 'Қонаев': [('Талдықорған', 210)]}\nroute_cost(g, ['Алматы', 'Қонаев', 'Талдықорған']) → 280\nroute_cost(g, ['Қонаев', 'Алматы'])                → None</code></pre>",
    "hints": [
     "Take the neighbouring pairs through <code>zip(route, route[1:])</code>.",
     "<code>graph.get(u, [])</code> — the vertex may not be a key either."
    ],
    "check": {
     "tests": "\n_g = {'Алматы': [('Қонаев', 70), ('Талдықорған', 270)], 'Қонаев': [('Талдықорған', 210)]}\nassert route_cost(_g, ['Алматы', 'Қонаев', 'Талдықорған']) == 280, 'Expected 280'\nassert route_cost(_g, ['Қонаев', 'Алматы']) is None, 'Directed: no reverse edge, None'\nassert route_cost(_g, ['Алматы']) == 0, 'One vertex: 0'\nassert route_cost(_g, ['Талдықорған', 'Алматы']) is None, 'A vertex with no outgoing edges: None'\nassert route_cost({'a': [('b', 9), ('b', 4)]}, ['a', 'b']) == 4, 'Several edges: the shortest is 4'\n"
    }
   },
   {
    "title": "Nearest Neighbouring City",
    "prompt": "<p><code>nearest(graph, u)</code> from <code>u</code> must return the neighbour along the edge with the smallest weight among the edges leaving it; in case of a tie, the neighbour with the smaller name (<code>&lt;</code>). If there are no outgoing edges, <code>None</code>.</p>\n<pre><code>nearest({'A': [('B', 5), ('C', 2), ('D', 2)]}, 'A') → 'C'\nnearest({'A': []}, 'A')                          → None</code></pre>",
    "hints": [
     "Comparing the tuples <code>(салмақ, көрші)</code> correctly handles the case of equal weights too."
    ],
    "check": {
     "tests": "\nassert nearest({'A': [('B', 5), ('C', 2), ('D', 2)]}, 'A') == 'C', \"Expected 'C'\"\nassert nearest({'A': []}, 'A') is None, 'No edge: None'\nassert nearest({}, 'X') is None, 'No vertex: None'\nassert nearest({'A': [('Z', 0)]}, 'A') == 'Z', \"Weight 0: 'Z'\"\n"
    }
   },
   {
    "title": "Nearest Fire Station",
    "prompt": "<p>The city map <code>graph</code> (undirected, each edge written in both directions), <code>stations</code> — the vertices where the fire stations are. <code>nearest_station(graph, stations)</code> must return a dictionary: for each reachable vertex → the <b>distance to the nearest</b> station. Multi-source Dijkstra: put all the stations into the heap at distance 0 at once — one run is enough.</p>\n<pre><code>g = {'A': [('B', 4)], 'B': [('A', 4), ('C', 1)], 'C': [('B', 1)], 'D': []}\nnearest_station(g, ['A', 'C']) → {'A': 0, 'C': 0, 'B': 1}</code></pre>",
    "hints": [
     "The starting heap: <code>[(0, s) for s in stations]</code>.",
     "The rest is the usual Dijkstra; the distance that comes out of the heap first is final."
    ],
    "check": {
     "tests": "\n_g = {'A': [('B', 4)], 'B': [('A', 4), ('C', 1)], 'C': [('B', 1)], 'D': []}\nassert nearest_station(_g, ['A', 'C']) == {'A': 0, 'C': 0, 'B': 1}, \"Expected {'A': 0, 'C': 0, 'B': 1}\"\nassert nearest_station(_g, []) == {}, 'No stations: {}'\nassert nearest_station(_g, ['D']) == {'D': 0}, 'An isolated station'\n_g2 = {0: [(1, 5), (2, 1)], 1: [(0, 5), (2, 1)], 2: [(0, 1), (1, 1), (3, 10)], 3: [(2, 10)]}\nassert nearest_station(_g2, [0, 3]) == {0: 0, 3: 0, 2: 1, 1: 2}, 'Expected {0: 0, 3: 0, 2: 1, 1: 2}'\nimport random as _random, time as _time\n_rng = _random.Random(1)\n_n = 20000; _G = {i: [] for i in range(_n)}\nfor _ in range(60000):\n    _a, _b, _w = _rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 100)\n    _G[_a].append((_b, _w)); _G[_b].append((_a, _w))\n_t0 = _time.perf_counter(); nearest_station(_G, list(range(0, _n, 100))); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'{_dt:.2f} s: run Dijkstra once, not separately for each station'\n"
    }
   },
   {
    "title": "The Most Reliable Path",
    "prompt": "<p>The communication network: <code>n</code> nodes, <code>edges[i] = (u, v)</code> — undirected channels, <code>probs[i]</code> — the probability that a message gets delivered over it (0..1). <code>best_prob(n, edges, probs, s, t)</code> must return the largest value of a path from <code>s</code> to <code>t</code> by the <b>product</b> of the probabilities (0.0 if there is no path). A variant of Dijkstra: a max-heap (with a minus sign), with the product instead of the distance. When multiplying, the probability never grows, so the greedy approach is correct.</p>\n<pre><code>best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.2], 0, 2) → 0.25</code></pre>",
    "hints": [
     "In the heap <code>(−ықтималдық, төбе)</code>: the largest probability comes out first.",
     "<code>t</code> is the answer when it comes out of the heap."
    ],
    "check": {
     "tests": "\nassert abs(best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.2], 0, 2) - 0.25) < 1e-9, 'Expected 0.25'\nassert abs(best_prob(3, [(0, 1), (1, 2), (0, 2)], [0.5, 0.5, 0.3], 0, 2) - 0.3) < 1e-9, 'The direct channel is better: 0.3'\nassert best_prob(3, [(0, 1)], [0.5], 0, 2) == 0.0, 'No path: 0.0'\nassert best_prob(2, [], [], 1, 1) == 1.0, 's = t: 1.0'\n_e = [(0, 1), (1, 2), (2, 3), (0, 3)]\nassert abs(best_prob(4, _e, [0.9, 0.9, 0.9, 0.7], 0, 3) - 0.729) < 1e-9, 'A longer path is more reliable: 0.729'\n"
    }
   },
   {
    "title": "Number of Shortest Paths",
    "prompt": "<p>The city <code>n</code>, <code>roads</code> — <code>(u, v, w)</code> two-way roads (<code>w &gt; 0</code>). <code>count_shortest(n, roads, s, t)</code> must return the number of different paths of the <b>shortest</b> length from <code>s</code> to <code>t</code> (0 if there is no path). During Dijkstra keep a counter <code>ways[v]</code>: if a shorter path is found — <code>ways[v] = ways[u]</code>; if an equal one is found — <code>ways[v] += ways[u]</code>.</p>\n<pre><code>count_shortest(4, [(0, 1, 1), (0, 2, 1), (1, 3, 1), (2, 3, 1)], 0, 3) → 2</code></pre>",
    "hints": [
     "Skip outdated heap entries using <code>d &gt; dist[u]</code> — otherwise the paths of one vertex are counted twice.",
     "Since the weight is positive, <code>ways[u]</code> is final when <code>u</code> comes out of the heap."
    ],
    "check": {
     "tests": "\nassert count_shortest(4, [(0, 1, 1), (0, 2, 1), (1, 3, 1), (2, 3, 1)], 0, 3) == 2, 'Expected 2'\nassert count_shortest(3, [(0, 1, 1)], 0, 2) == 0, 'No path: 0'\nassert count_shortest(1, [], 0, 0) == 1, 's = t: 1'\nassert count_shortest(3, [(0, 1, 1), (1, 2, 1), (0, 2, 2)], 0, 2) == 2, 'The direct and the detour are equal: 2'\nassert count_shortest(3, [(0, 1, 1), (0, 1, 1), (1, 2, 5)], 0, 2) == 2, 'Parallel paths: 2'\n_r = []\nfor _i in range(10):\n    _r += [(2 * _i, 2 * _i + 1, 1), (2 * _i, 2 * _i + 2, 2), (2 * _i + 1, 2 * _i + 2, 1)]\nassert count_shortest(21, _r, 0, 20) == 2 ** 10, 'A chain of 10 \\'diamonds\\': 2^10 paths'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(30):\n    _n = _rng.randint(2, 6)\n    _rd = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 3)) for _ in range(_rng.randint(0, 9))]\n    _rd = [x for x in _rd if x[0] != x[1]]\n    # brute force: DFS over simple paths with edge multiplicity\n    _adj = [[] for _ in range(_n)]\n    for _u, _v, _w in _rd: _adj[_u].append((_v, _w)); _adj[_v].append((_u, _w))\n    _lens = []\n    def _dfs(u, seen, L):\n        if u == _n - 1: _lens.append(L); return\n        for v, w in _adj[u]:\n            if v not in seen: _dfs(v, seen | {v}, L + w)\n    _dfs(0, {0}, 0)\n    _exp = _lens.count(min(_lens)) if _lens else 0\n    assert count_shortest(_n, _rd, 0, _n - 1) == _exp, f'count_shortest({_n}, {_rd}, 0, {_n - 1}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "One Discount Coupon",
    "prompt": "<p>The taxi roads are <code>roads</code> — <code>(u, v, баға)</code> undirected. The passenger has one coupon: it halves the price of one road (<code>баға // 2</code>). <code>cheapest_with_coupon(n, roads, s, t)</code> must return the smallest price when the coupon is used in the best way (or not used); if there is no path, <code>-1</code>. State space: <code>(төбе, купон_қолданылды_ма)</code> — Dijkstra on 2n states.</p>\n<pre><code>cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30), (0, 2, 150)], 0, 2) → 75    # 150 // 2\ncheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30)], 0, 2)              → 80    # 50 + 30</code></pre>",
    "hints": [
     "From each edge there are two transitions: without the coupon (the state does not change) and with the coupon (only if <code>used == 0</code>, then <code>used</code> becomes 1).",
     "When <code>t</code> in any state comes out of the heap first — that is the answer."
    ],
    "check": {
     "tests": "\nassert cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30), (0, 2, 150)], 0, 2) == 75, 'Expected 75'\nassert cheapest_with_coupon(3, [(0, 1, 100), (1, 2, 30)], 0, 2) == 80, 'Expected 80'\nassert cheapest_with_coupon(3, [(0, 1, 5)], 0, 2) == -1, 'No path: -1'\nassert cheapest_with_coupon(2, [], 1, 1) == 0, 's = t: 0'\nassert cheapest_with_coupon(2, [(0, 1, 7)], 0, 1) == 3, '7 // 2 = 3'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _n = _rng.randint(2, 6)\n    _rd = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 40)) for _ in range(_rng.randint(0, 9))]\n    _best = -1\n    for _ci in range(-1, len(_rd)):\n        _adj = [[] for _ in range(_n)]\n        for _i, (_u, _v, _w) in enumerate(_rd):\n            _ww = _w // 2 if _i == _ci else _w\n            _adj[_u].append((_v, _ww)); _adj[_v].append((_u, _ww))\n        _D = [None] * _n; _pq = [(0, 0)]\n        while _pq:\n            _d, _x = heapq.heappop(_pq)\n            if _D[_x] is not None: continue\n            _D[_x] = _d\n            for _y, _w in _adj[_x]: heapq.heappush(_pq, (_d + _w, _y))\n        if _D[_n - 1] is not None and (_best < 0 or _D[_n - 1] < _best): _best = _D[_n - 1]\n    assert cheapest_with_coupon(_n, _rd, 0, _n - 1) == _best, f'cheapest_with_coupon({_n}, {_rd}, 0, {_n - 1}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "Reaching by Train Timetable",
    "prompt": "<p>The timetable <code>trains</code> — <code>(u, v, жөнелту, жол_уақыты)</code>: a train leaves <code>u</code> at exactly <code>жөнелту</code> o'clock and arrives at <code>v</code> at <code>жөнелту + жол_уақыты</code> o'clock. At a station you can wait as long as you like. You set off at <code>start</code> o'clock from <code>src</code>. <code>earliest_arrival(trains, src, dst, start)</code> must return the earliest arrival time at <code>dst</code> (if it is impossible to get there, <code>-1</code>). Dijkstra by time: if we reach <code>u</code> at time <code>T</code>, we can only board the trains <code>жөнелту ≥ T</code>.</p>\n<pre><code>tr = [('Астана', 'Қарағанды', 8, 3), ('Қарағанды', 'Балқаш', 10, 5), ('Қарағанды', 'Балқаш', 12, 4), ('Астана', 'Балқаш', 9, 9)]\nearliest_arrival(tr, 'Астана', 'Балқаш', 7) → 16    # 8 → 11, 10-дағы кетті, 12 → 16\nearliest_arrival(tr, 'Астана', 'Балқаш', 9) → 18</code></pre>",
    "hints": [
     "In the heap <code>(келу_уақыты, бекет)</code>: an early arrival is always better, because you can also wait for later trains.",
     "Consider only the trains <code>жөнелту ≥ T</code>."
    ],
    "check": {
     "tests": "\n_tr = [('Астана', 'Қарағанды', 8, 3), ('Қарағанды', 'Балқаш', 10, 5), ('Қарағанды', 'Балқаш', 12, 4), ('Астана', 'Балқаш', 9, 9)]\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 7) == 16, 'Expected 16 (the train at 8, then the one at 12)'\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 9) == 18, 'The train at 8 has left: 18'\nassert earliest_arrival(_tr, 'Астана', 'Балқаш', 10) == -1, 'All trains have left: -1'\nassert earliest_arrival(_tr, 'Астана', 'Астана', 5) == 5, 'src = dst: start'\nassert earliest_arrival([('A', 'B', 5, 1)], 'A', 'B', 5) == 6, 'You can board exactly at the departure hour'\n_tr2 = [('A', 'B', 1, 10), ('A', 'C', 2, 1), ('C', 'B', 4, 1)]\nassert earliest_arrival(_tr2, 'A', 'B', 0) == 5, 'Transfers speed things up: 5'\nimport random as _random\n_rng = _random.Random(6)\nfor _ in range(40):\n    _st = 'PQRS'\n    _T = [(_rng.choice(_st), _rng.choice(_st), _rng.randint(0, 12), _rng.randint(1, 4)) for _ in range(_rng.randint(0, 10))]\n    _s0 = _rng.randint(0, 5)\n    _arr = {'P': _s0}\n    for _ in range(12):\n        for u, v, dep, dur in _T:\n            if u in _arr and _arr[u] <= dep and dep + dur < _arr.get(v, 10**9):\n                _arr[v] = dep + dur\n    _exp = _arr.get('S', -1)\n    assert earliest_arrival(_T, 'P', 'S', _s0) == _exp, f'earliest_arrival({_T}, P, S, {_s0}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "alg-8": {
  "pr": [
   {
    "title": "Is It a Spanning Tree?",
    "prompt": "<p><code>n</code> villages (<code>0..n−1</code>), <code>edges</code> — <code>(u, v, w)</code> built roads. Do they form a <b>spanning tree</b>: all the villages are connected and there are no cycles? <code>is_spanning_tree(n, edges)</code> must return the answer. Union-find: when adding each edge, if both ends are already in one group, there is a cycle; at the end the number of edges must be <code>n − 1</code>.</p>\n<pre><code>is_spanning_tree(3, [(0, 1, 4), (1, 2, 5)])            → True\nis_spanning_tree(3, [(0, 1, 4), (1, 2, 5), (0, 2, 1)]) → False</code></pre>",
    "hints": [
     "If there are <code>n − 1</code> edges and no cycle, the graph is necessarily connected."
    ],
    "check": {
     "tests": "\nassert is_spanning_tree(3, [(0, 1, 4), (1, 2, 5)]) is True, 'A tree: True'\nassert is_spanning_tree(3, [(0, 1, 4), (1, 2, 5), (0, 2, 1)]) is False, 'Too many edges: False'\nassert is_spanning_tree(1, []) is True, 'One village: True'\nassert is_spanning_tree(4, [(0, 1, 1), (1, 0, 2), (2, 3, 1)]) is False, 'n − 1 edges, but there is a cycle: False'\nassert is_spanning_tree(2, []) is False, 'Not connected: False'\n"
    }
   },
   {
    "title": "Edges Chosen by Kruskal",
    "prompt": "<p><code>kruskal_edges(n, edges)</code> must return the edges that Kruskal's algorithm chooses, <b>in the order of choice</b>. To make the answer unambiguous, sort the edges by <code>(w, u, v)</code> (return the tuples unchanged). If the graph is disconnected, the edges of a minimum spanning <b>forest</b> come out.</p>\n<pre><code>kruskal_edges(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)])\n→ [(1, 2, 1), (0, 2, 2), (2, 3, 4)]</code></pre>",
    "hints": [
     "<code>sorted(edges, key=lambda e: (e[2], e[0], e[1]))</code>.",
     "We take an edge only when its ends are in different groups."
    ],
    "check": {
     "tests": "\nassert kruskal_edges(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) == [(1, 2, 1), (0, 2, 2), (2, 3, 4)], 'The chosen edges are wrong'\nassert kruskal_edges(1, []) == [], 'One vertex: []'\nassert kruskal_edges(4, [(0, 1, 1), (2, 3, 1)]) == [(0, 1, 1), (2, 3, 1)], 'A forest: two edges'\nassert kruskal_edges(3, [(0, 1, 2), (1, 2, 2), (0, 2, 2)]) == [(0, 1, 2), (0, 2, 2)], 'With equal weight, by (u, v)'\nassert kruskal_edges(2, [(0, 0, 1), (0, 1, 9)]) == [(0, 1, 9)], 'A self-loop is not taken'\n"
    }
   },
   {
    "title": "The Cheapest Forest",
    "prompt": "<p>It may not be possible to connect all the villages into one network. <code>forest_cost(n, roads)</code> must return the total weight of the minimum spanning <b>forest</b>: the sum of the MST weights of each connected component. Kruskal gives it by itself: do not stop even if you have not collected <code>n − 1</code> edges.</p>\n<pre><code>forest_cost(5, [(0, 1, 4), (1, 2, 2), (0, 2, 3), (3, 4, 7)]) → 12</code></pre>",
    "hints": [
     "Sort the edges by weight and add the acyclic ones with union-find."
    ],
    "check": {
     "tests": "\nassert forest_cost(5, [(0, 1, 4), (1, 2, 2), (0, 2, 3), (3, 4, 7)]) == 12, 'Expected 12 (2 + 3 + 7)'\nassert forest_cost(3, []) == 0, 'No path: 0'\nassert forest_cost(2, [(0, 1, 5), (0, 1, 3)]) == 3, 'Parallel paths: 3'\nassert forest_cost(4, [(0, 1, 1), (1, 2, 1), (2, 0, 1), (2, 3, 10)]) == 12, 'Expected 12'\n"
    }
   },
   {
    "title": "Connecting Points",
    "prompt": "<p>The <code>points</code> points in the city must be connected with cable; the cable cost between two points is the Manhattan distance <code>|x₁ − x₂| + |y₁ − y₂|</code>. <code>connect_cost(points)</code> must return the smallest cost of connecting all the points. The graph is complete (<code>n²</code> edges), so Prim in O(n²) without a heap is convenient: keep in the array <code>dist</code> the smallest distance from each point to the tree.</p>\n<pre><code>connect_cost([(0, 0), (2, 2), (3, 10), (5, 2), (7, 0)]) → 20\nconnect_cost([(1, 1)])                                → 0</code></pre>",
    "hints": [
     "At each step take the point not yet in the tree with the smallest <code>dist</code>.",
     "After adding it, update the <code>dist</code> of the remaining points."
    ],
    "check": {
     "tests": "\nassert connect_cost([(0, 0), (2, 2), (3, 10), (5, 2), (7, 0)]) == 20, 'Expected 20'\nassert connect_cost([(1, 1)]) == 0, 'One point: 0'\nassert connect_cost([]) == 0, 'No points: 0'\nassert connect_cost([(3, 12), (-2, 5), (-4, 1)]) == 18, 'Expected 18'\nassert connect_cost([(0, 0), (0, 0)]) == 0, 'Points in one place: 0'\nimport random as _random, time as _time\n_rng = _random.Random(1)\n_pts = [(_rng.randint(-10**4, 10**4), _rng.randint(-10**4, 10**4)) for _ in range(500)]\n_t0 = _time.perf_counter(); connect_cost(_pts); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'500 points, {_dt:.2f} s: O(n²) Prim is needed'\n"
    }
   },
   {
    "title": "The Heaviest Edge in the MST",
    "prompt": "<p><code>mst_bottleneck(n, roads)</code> must return the weight of the heaviest (largest-weight) edge in the minimum spanning tree. This is the smallest permissible 'road quality limit' at which all the villages can be connected. If the graph is disconnected, <code>-1</code>; if there is one village, 0.</p>\n<pre><code>mst_bottleneck(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) → 4\nmst_bottleneck(3, [(0, 1, 1)])                                       → -1</code></pre>",
    "hints": [
     "Kruskal adds the edges in increasing order of weight: the last edge added is the heaviest.",
     "Stop when the number of components becomes 1."
    ],
    "check": {
     "tests": "\nassert mst_bottleneck(4, [(0, 1, 3), (1, 2, 1), (2, 3, 4), (0, 2, 2), (1, 3, 5)]) == 4, 'Expected 4'\nassert mst_bottleneck(3, [(0, 1, 1)]) == -1, 'Disconnected: -1'\nassert mst_bottleneck(1, []) == 0, 'One village: 0'\nassert mst_bottleneck(2, [(0, 1, 7), (1, 0, 2)]) == 2, 'Parallel paths: 2'\n"
    }
   },
   {
    "title": "Well and Pipe",
    "prompt": "<p>All villages (<code>n</code>) need water. <code>wells[i]</code> is the cost of digging a well in village <code>i</code>, <code>pipes</code> is <code>(u, v, баға)</code>: the cost of connecting two villages with a pipe. A village can get water from its own well or through a pipe from another village. <code>water_cost(wells, pipes)</code> must return the smallest total cost. A trick: add a virtual vertex <code>n</code> — an 'underground source' — and connect it to each village with edges of weight <code>wells[i]</code>: then the answer is an ordinary MST.</p>\n<pre><code>water_cost([1, 2, 2], [(0, 1, 1), (1, 2, 1)]) → 3     # 0-ге құдық, екі құбыр</code></pre>",
    "hints": [
     "The virtual vertex <code>n</code>: the edges <code>(n, i, wells[i])</code>.",
     "Now the MST weight of the graph with the vertex <code>n + 1</code> is the answer."
    ],
    "check": {
     "tests": "\nassert water_cost([1, 2, 2], [(0, 1, 1), (1, 2, 1)]) == 3, 'Expected 3'\nassert water_cost([5], []) == 5, 'One village: dig a well'\nassert water_cost([1, 1], [(0, 1, 100)]) == 2, 'A pipe is expensive: two wells, 2'\nassert water_cost([10, 10, 10], [(0, 1, 1), (1, 2, 1), (0, 2, 1)]) == 12, 'One well + two pipes: 12'\nassert water_cost([], []) == 0, 'No villages: 0'\nimport random as _random\nfrom itertools import product as _prod\n_rng = _random.Random(2)\nfor _ in range(25):\n    _n = _rng.randint(1, 4); _w = [_rng.randint(1, 20) for _ in range(_n)]\n    _p = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 20)) for _ in range(_rng.randint(0, 5))]\n    _best = None\n    for _mask in _prod([0, 1], repeat=_n):\n        if not any(_mask): continue\n        _cost = sum(_w[i] for i in range(_n) if _mask[i])\n        _par = list(range(_n + 1))\n        def _f(x):\n            while _par[x] != x: x = _par[x]\n            return x\n        for i in range(_n):\n            if _mask[i]: _par[_f(i)] = _f(_n)\n        for _ww, _u, _v in sorted((w, u, v) for u, v, w in _p):\n            if _f(_u) != _f(_v): _par[_f(_u)] = _f(_v); _cost += _ww\n        if len({_f(i) for i in range(_n + 1)}) == 1 and (_best is None or _cost < _best): _best = _cost\n    assert water_cost(_w, _p) == _best, f'water_cost({_w}, {_p}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "Critical Roads",
    "prompt": "<p><code>n</code> villages and <code>roads</code> — <code>(u, v, w)</code>; the graph is connected. A road is <b>critical</b> if removing it increases the MST weight (or leaves the graph disconnected). <code>critical_roads(n, roads)</code> must return the indices of the critical roads in increasing order. <code>n ≤ 30</code>, if there are at most 60 roads: it is enough to remove each road in turn and run Kruskal again.</p>\n<pre><code>critical_roads(5, [(0, 1, 1), (1, 2, 1), (2, 3, 2), (0, 3, 2), (0, 4, 3), (3, 4, 3), (1, 4, 6)])\n→ [0, 1]</code></pre>",
    "hints": [
     "Write Kruskal with a version 'without the edge with index <code>skip</code>'; if the graph becomes disconnected, return infinity.",
     "Do the sort once and keep the order of the indices."
    ],
    "check": {
     "tests": "\nassert critical_roads(5, [(0, 1, 1), (1, 2, 1), (2, 3, 2), (0, 3, 2), (0, 4, 3), (3, 4, 3), (1, 4, 6)]) == [0, 1], 'Expected [0, 1]'\nassert critical_roads(4, [(0, 1, 1), (1, 2, 1), (2, 3, 1), (0, 3, 1)]) == [], 'All edges in an equal-weight cycle: []'\nassert critical_roads(2, [(0, 1, 5)]) == [0], 'The only road: [0]'\nassert critical_roads(3, [(0, 1, 1), (1, 2, 1), (0, 2, 5)]) == [0, 1], 'Expected [0, 1]'\nassert critical_roads(1, []) == [], 'One village: []'\n"
    }
   },
   {
    "title": "Splitting into k Clusters",
    "prompt": "<p>The shops: <code>n</code> vertices, <code>dists</code> — <code>(u, v, қашықтық)</code>. We split them into <code>k</code> clusters (districts) so that the <b>smallest</b> distance between clusters (the spacing) is as large as possible. Kruskal: unite the edges until the number of components reaches <code>k</code>; then the lightest next edge that joins different components is the answer. <code>max_spacing(n, dists, k)</code> must return this value; if there is no such edge (there are no edges between clusters), <code>-1</code>. <code>1 ≤ k ≤ n</code>.</p>\n<pre><code>_d = [(0, 1, 1), (1, 2, 2), (2, 3, 10), (3, 4, 1), (0, 4, 12)]\nmax_spacing(5, _d, 2) → 10\nmax_spacing(5, _d, 3) → 2</code></pre>",
    "hints": [
     "The first 'different group' edge met after the number of components became <code>k</code> is the answer.",
     "Edges inside one group (which form a cycle) are not between clusters — skip them."
    ],
    "check": {
     "tests": "\n_d = [(0, 1, 1), (1, 2, 2), (2, 3, 10), (3, 4, 1), (0, 4, 12)]\nassert max_spacing(5, _d, 2) == 10, 'k = 2: 10'\nassert max_spacing(5, _d, 3) == 2, 'k = 3: 2'\nassert max_spacing(5, _d, 5) == 1, 'k = n: the lightest edge is 1'\nassert max_spacing(5, _d, 1) == -1, 'k = 1: no edges between clusters, -1'\nassert max_spacing(4, [(0, 1, 3)], 2) == -1, 'If no edges are left between clusters: -1'\nassert max_spacing(3, [(0, 1, 5), (1, 2, 5), (0, 2, 5)], 2) == 5, 'Equal weights: 5'\n"
    }
   }
  ]
 },
 "alg-9": {
  "pr": [
   {
    "title": "Reaching the End",
    "prompt": "<p>Stones on a mountain slope: <code>jumps[i]</code> — the longest jump forward from stone <code>i</code> (in stones). We start from stone 0. <code>can_reach(jumps)</code> must return <code>True</code> if the last stone can be reached. Greedy: keep in <code>far</code> the farthest reachable index; if <code>i &gt; far</code>, it is a dead end. O(n).</p>\n<pre><code>can_reach([2, 3, 1, 1, 4]) → True\ncan_reach([3, 2, 1, 0, 4]) → False</code></pre>",
    "hints": [
     "<code>far = max(far, i + jumps[i])</code>."
    ],
    "check": {
     "tests": "\nassert can_reach([2, 3, 1, 1, 4]) is True, 'It must be True'\nassert can_reach([3, 2, 1, 0, 4]) is False, 'Passing through stone 3 from 0 is impossible: False'\nassert can_reach([0]) is True, 'One stone: True'\nassert can_reach([0, 1]) is False, 'Starting stone 0: False'\nassert can_reach([1, 0, 1]) is False, 'Expected False'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _x = [_rng.randint(0, 3) for _ in range(_rng.randint(1, 10))]\n    _ok = [False] * len(_x); _ok[0] = True\n    for _i in range(len(_x)):\n        if _ok[_i]:\n            for _k in range(1, _x[_i] + 1):\n                if _i + _k < len(_x): _ok[_i + _k] = True\n    assert can_reach(_x) == _ok[-1], f'can_reach({_x}) {_ok[-1]} болуы керек'\n_big = [1] * 200000\n_t0 = _time.perf_counter(); _r = can_reach(_big); _dt = _time.perf_counter() - _t0\nassert _r is True and _dt < 1.0, f'An O(n) greedy is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Distributing Buns",
    "prompt": "<p>In a kindergarten each child has their own appetite <code>need[i]</code>, and the number of buns on the plates is <code>plates[j]</code>. Each child gets at most one plate, and a child is full only if <code>plates[j] ≥ need[i]</code>. <code>fed_children(need, plates)</code> must return how many children can be fed at most. Greedy: sort both lists and give the smallest appetite the smallest plate that satisfies it.</p>\n<pre><code>fed_children([1, 2, 3], [1, 1])    → 1\nfed_children([1, 2], [1, 2, 3])    → 2</code></pre>",
    "hints": [
     "Go through the plates from the smallest: if a plate satisfies the current child, move on to the next child."
    ],
    "check": {
     "tests": "\nassert fed_children([1, 2, 3], [1, 1]) == 1, 'Expected 1'\nassert fed_children([1, 2], [1, 2, 3]) == 2, 'Expected 2'\nassert fed_children([], [5]) == 0, 'No children: 0'\nassert fed_children([3], []) == 0, 'No plates: 0'\nassert fed_children([10, 9, 8, 7], [5, 6, 7, 8]) == 2, 'Unsorted input: 2'\nimport random as _random\nfrom itertools import permutations as _perm\n_rng = _random.Random(2)\nfor _ in range(30):\n    _g = [_rng.randint(1, 6) for _ in range(_rng.randint(0, 4))]; _s = [_rng.randint(1, 6) for _ in range(_rng.randint(0, 4))]\n    _best = 0\n    for _p in _perm(range(len(_s))):\n        _best = max(_best, sum(1 for i, j in zip(range(len(_g)), _p) if _s[j] >= _g[i]))\n    assert fed_children(_g, _s) == _best, f'fed_children({_g}, {_s}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "The Kumys Stand",
    "prompt": "<p>One cup of kumys costs 500 tenge. The customers in the queue pay with banknotes of 500, 1000 or 2000 tenge, in the order <code>bills</code>. At the start there is no money in the till. <code>can_change(bills)</code> must return <code>True</code> if every customer can be given the correct change. Greedy: when giving change from 2000 (1500), first give 1000 + 500; if that is not possible, 500 × 3. The 500 banknotes are universal, so it is worth keeping them.</p>\n<pre><code>can_change([500, 500, 1000, 2000]) → True\ncan_change([1000])                 → False\ncan_change([500, 500, 500, 2000, 1000]) → False</code></pre>",
    "hints": [
     "It is enough to keep the counts of the 500 and 1000 banknotes (the 2000 is never used for change)."
    ],
    "check": {
     "tests": "\nassert can_change([500, 500, 1000, 2000]) is True, 'It must be True'\nassert can_change([1000]) is False, 'No change: False'\nassert can_change([500, 500, 500, 2000, 1000]) is False, 'Three 500s went on the 2000: False'\nassert can_change([]) is True, 'No customers: True'\nassert can_change([500, 1000, 500, 2000]) is True, 'Change 1000 + 500: True'\nassert can_change([500, 500, 1000, 500, 2000, 1000]) is True, 'If greedy picks 1000 + 500, the last 1000 is left with 500: True'\n"
    }
   },
   {
    "title": "Fewest Arrows",
    "prompt": "<p>At a festival the blue balloons hang on a horizontal line: each balloon covers the closed segment <code>[start, end]</code>. A vertical arrow shot from the point <code>x</code> pops all the balloons for which <code>start ≤ x ≤ end</code>. <code>min_arrows(balloons)</code> must return the smallest number of arrows that pop all the balloons. Greedy: sort by the end and shoot each arrow at the <b>end</b> of the current balloon.</p>\n<pre><code>min_arrows([[10, 16], [2, 8], [1, 6], [7, 12]]) → 2\nmin_arrows([[1, 2], [2, 3], [3, 4], [4, 5]])     → 2\nmin_arrows([])                                   → 0</code></pre>",
    "hints": [
     "Sorting by the end — like in the interval scheduling problem.",
     "If the next balloon starts after the last arrow (<code>s &gt; last</code>), a new arrow is needed."
    ],
    "check": {
     "tests": "\nassert min_arrows([[10, 16], [2, 8], [1, 6], [7, 12]]) == 2, 'Expected 2'\nassert min_arrows([[1, 2], [2, 3], [3, 4], [4, 5]]) == 2, 'Closed intervals: a touching point with one arrow, 2'\nassert min_arrows([]) == 0, 'No balloons: 0'\nassert min_arrows([[1, 2], [3, 4], [5, 6]]) == 3, 'They do not overlap: 3'\nassert min_arrows([[1, 10], [2, 3], [4, 5]]) == 2, 'Expected 2'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _b = []\n    for _ in range(_rng.randint(0, 7)):\n        _s = _rng.randint(0, 15); _b.append([_s, _s + _rng.randint(0, 5)])\n    _best = None\n    from itertools import combinations as _comb\n    _pts = sorted(set(e for s, e in _b))\n    for _k in range(len(_pts) + 1):\n        if any(all(any(s <= x <= e for x in c) for s, e in _b) for c in _comb(_pts, _k)):\n            _best = _k; break\n    assert min_arrows(_b) == (_best or 0), f'min_arrows({_b}) {_best} болуы керек'\n"
    }
   },
   {
    "title": "Gas Stations",
    "prompt": "<p>On a circular road there are <code>n</code> stations. <code>fuel[i]</code> is the fuel poured at station <code>i</code>, <code>cost[i]</code> is the fuel used on the way from <code>i</code> to <code>i+1</code>. The tank is empty at the start. <code>start_station(fuel, cost)</code> must return the index of the starting station from which the full circle can be driven (if there is an answer, it is unique), otherwise <code>-1</code>. Greedy in O(n): if the total sum is negative — <code>-1</code>; otherwise start again from the station after the place where the tank became negative.</p>\n<pre><code>start_station([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) → 3\nstart_station([2, 3, 4], [3, 4, 3])             → -1</code></pre>",
    "hints": [
     "If, starting from <code>a</code>, the tank becomes negative at <code>b</code>, then no station between <code>a..b</code> works.",
     "If the overall balance is non-negative, the last 'restart' point is the answer."
    ],
    "check": {
     "tests": "\nassert start_station([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) == 3, 'Expected 3'\nassert start_station([2, 3, 4], [3, 4, 3]) == -1, 'Not enough fuel: -1'\nassert start_station([5], [4]) == 0, 'One station: 0'\nassert start_station([4], [5]) == -1, 'One station, not enough: -1'\nassert start_station([3, 1, 1], [1, 2, 2]) == 0, 'Expected 0'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _n = _rng.randint(1, 7); _f = [_rng.randint(0, 6) for _ in range(_n)]; _c = [_rng.randint(0, 6) for _ in range(_n)]\n    _ok = [s for s in range(_n) if all(sum(_f[(s + j) % _n] - _c[(s + j) % _n] for j in range(k + 1)) >= 0 for k in range(_n))]\n    _got = start_station(_f, _c)\n    if _ok:\n        assert _got in _ok, f'start_station({_f}, {_c}): {_got} жарамайды, мысалы {_ok[0]} болуы мүмкін'\n    else:\n        assert _got == -1, f'start_station({_f}, {_c}) -1 болуы керек'\n_n = 200000; _f = [1] * _n; _c = [1] * _n; _c[0] = 2; _f[-1] = 2\n_t0 = _time.perf_counter(); _r = start_station(_f, _c); _dt = _time.perf_counter() - _t0\nassert _r == 1 and _dt < 1.0, f'An O(n) solution is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Minimum Jumps",
    "prompt": "<p><code>jumps[i]</code> — from stone <code>i</code> you can jump forward by at most this many stones; the last stone can always be reached. <code>min_jumps(jumps)</code> must return the minimum number of jumps to the end. Greedy (like the levels of BFS): when the current jump reaches the boundary of its range, jump to the next, farthest boundary. O(n).</p>\n<pre><code>min_jumps([2, 3, 1, 1, 4]) → 2\nmin_jumps([0])             → 0</code></pre>",
    "hints": [
     "<code>end</code> is the farthest index reachable with the current number of jumps; <code>far</code> is the farthest index reachable with the next jump.",
     "When <code>i == end</code>, increase the number of jumps and set <code>end = far</code>."
    ],
    "check": {
     "tests": "\nassert min_jumps([2, 3, 1, 1, 4]) == 2, 'Expected 2'\nassert min_jumps([0]) == 0, 'One stone: 0'\nassert min_jumps([1, 1, 1, 1]) == 3, 'Expected 3'\nassert min_jumps([5, 1, 1, 1]) == 1, 'One jump is enough: 1'\nassert min_jumps([2, 3, 0, 1, 4]) == 2, 'Expected 2'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _x = [_rng.randint(1, 3) for _ in range(_rng.randint(1, 12))]\n    _d = [0] + [10**9] * (len(_x) - 1)\n    for _i in range(len(_x)):\n        for _k in range(1, _x[_i] + 1):\n            if _i + _k < len(_x): _d[_i + _k] = min(_d[_i + _k], _d[_i] + 1)\n    assert min_jumps(_x) == _d[-1], f'min_jumps({_x}) {_d[-1]} болуы керек'\n"
    }
   },
   {
    "title": "Divisible Cargo",
    "prompt": "<p>A vehicle can carry at most <code>cap</code> kg of cargo. <code>goods</code> are <code>(салмақ, құн)</code> pairs: the cargo can be taken in any part (flour, rice, sugar). <code>max_value(goods, cap)</code> must return the largest total value <code>float</code>. Greedy: take in decreasing order of 'price per 1 kg' (<code>құн / салмақ</code>), the last one partially. In this problem greedy is correct; for the 0/1 variant it is not.</p>\n<pre><code>max_value([(10, 600), (20, 1000), (30, 1200)], 50) → 2400.0</code></pre>",
    "hints": [
     "Sort by density: <code>key=lambda g: g[1] / g[0]</code>, <code>reverse=True</code>.",
     "If it fits, take all of it; if not, take the part <code>cap / w</code>."
    ],
    "check": {
     "tests": "\nassert abs(max_value([(10, 600), (20, 1000), (30, 1200)], 50) - 2400.0) < 1e-6, 'Expected 2400.0'\nassert max_value([], 10) == 0, 'No cargo: 0'\nassert max_value([(5, 100)], 0) == 0, 'Capacity 0: 0'\nassert abs(max_value([(4, 100)], 1) - 25.0) < 1e-6, 'A part: 25.0'\nassert abs(max_value([(1, 1), (1, 1)], 5) - 2.0) < 1e-6, 'Everything fits: 2.0'\nassert abs(max_value([(10, 10), (1, 5)], 2) - 6.0) < 1e-6, 'The densest cargo first: 5 + 1 = 6.0'\n"
    }
   },
   {
    "title": "Orders with Deadlines",
    "prompt": "<p>The sewing workshop completes one order per day (days 1, 2, 3, ...). <code>orders</code> — <code>(мерзім, пайда)</code>: if an order is completed no later than day <code>мерзім</code>, it brings a profit; otherwise we give it up. <code>max_profit(orders)</code> must return the largest total profit. Greedy: start with the orders that have the largest profit, and put each one on the <b>latest</b> free day not after its deadline. To find a free day quickly, use union-find: <code>find(d)</code> is the first free day, starting from <code>d</code> and going left (0 means there is no free day). Overall O(n log n).</p>\n<pre><code>max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)]) → 142   # 100 + 27 + 15</code></pre>",
    "hints": [
     "After day <code>parent[day] = day − 1</code> is taken, the next search automatically moves left.",
     "An order whose deadline is later than <code>n</code> can be limited to day <code>n</code> — in any case, more than <code>n</code> days are not needed."
    ],
    "check": {
     "tests": "\nassert max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)]) == 142, 'Expected 142'\nassert max_profit([]) == 0, 'No orders: 0'\nassert max_profit([(1, 5), (1, 7), (1, 3)]) == 7, 'All deadlines are 1: only one, 7'\nassert max_profit([(10**9, 4), (10**9, 6)]) == 10, 'A large deadline: both, 10'\nassert max_profit([(4, 20), (1, 10), (1, 40), (1, 30)]) == 60, 'Expected 60'\nimport random as _random, time as _time\nfrom itertools import permutations as _perm\n_rng = _random.Random(6)\nfor _ in range(30):\n    _o = [(_rng.randint(1, 4), _rng.randint(1, 30)) for _ in range(_rng.randint(0, 6))]\n    _best = 0\n    for _p in _perm(range(len(_o))):\n        _day, _s = 0, 0\n        for _i in _p:\n            if _day + 1 <= _o[_i][0]: _day += 1; _s += _o[_i][1]\n        _best = max(_best, _s)\n    assert max_profit(_o) == _best, f'max_profit({_o}) {_best} болуы керек'\n_big = [(_rng.randint(1, 50000), _rng.randint(1, 10**6)) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_profit(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} s: find a free day with union-find'\n"
    }
   }
  ]
 },
 "alg-10": {
  "pr": [
   {
    "title": "Collecting an Exact Sum",
    "prompt": "<p>The wallet holds banknotes of denominations <code>coins</code>, and each is used <b>once</b>. <code>can_pay(coins, total)</code> must return <code>True</code> if the exact sum <code>total</code> can be collected. DP like 0/1 knapsack: <code>ok[s]</code> — can the sum <code>s</code> be collected; for each banknote update the sums in <b>reverse</b> order.</p>\n<pre><code>can_pay([500, 200, 1000, 200], 1400) → True\ncan_pay([500, 500], 600)             → False</code></pre>",
    "hints": [
     "<code>ok[0] = True</code>.",
     "Go through the sums from larger to smaller, so one banknote is not used twice."
    ],
    "check": {
     "tests": "\nassert can_pay([500, 200, 1000, 200], 1400) is True, '1000 + 200 + 200: True'\nassert can_pay([500, 500], 600) is False, 'It must be False'\nassert can_pay([], 0) is True, 'total = 0: True'\nassert can_pay([5], 10) is False, 'A banknote cannot be used twice: False'\nassert can_pay([3, 34, 4, 12, 5, 2], 9) is True, '4 + 5: True'\nassert can_pay([3, 34, 4, 12, 5, 2], 30) is False, 'It must be False'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(1)\nfor _ in range(30):\n    _c = [_rng.randint(1, 15) for _ in range(_rng.randint(0, 7))]; _t = _rng.randint(0, 40)\n    _exp = any(sum(x) == _t for k in range(len(_c) + 1) for x in _comb(_c, k))\n    assert can_pay(_c, _t) == _exp, f'can_pay({_c}, {_t}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Longest Common Substring",
    "prompt": "<p><code>common_substring(a, b)</code> must return the length of the longest <b>contiguous</b> common substring of two strings. DP: <code>dp[i][j]</code> — the length of the common part ending at <code>a[i−1]</code> and <code>b[j−1]</code>; if the characters are equal, <code>dp[i−1][j−1] + 1</code>, otherwise 0. O(n·m).</p>\n<pre><code>common_substring('abcde', 'xbcdy') → 3    # 'bcd'\ncommon_substring('алматы', 'алма') → 4</code></pre>",
    "hints": [
     "It is enough to keep only the previous row.",
     "The difference from LCS (subsequence): if the characters are not equal, 0, not max."
    ],
    "check": {
     "tests": "\nassert common_substring('abcde', 'xbcdy') == 3, \"Common 'bcd': 3\"\nassert common_substring('abc', 'def') == 0, 'No common characters: 0'\nassert common_substring('', 'abc') == 0, 'Empty string: 0'\nassert common_substring('алматы', 'алма') == 4, \"'алма': 4\"\nassert common_substring('aaaa', 'aa') == 2, 'Expected 2'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 9))); _b = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 9)))\n    _exp = max([j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if _a[i:j] in _b] + [0])\n    assert common_substring(_a, _b) == _exp, f'common_substring({_a!r}, {_b!r}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Unlimited Warehouse",
    "prompt": "<p>In the wholesale warehouse, each item <code>(салмақ, пайда)</code> is available in unlimited quantity. A vehicle holds <code>cap</code> kg. <code>unbounded_best(items, cap)</code> must return the largest total profit (an item cannot be divided, but any number of each kind can be taken). DP: <code>best[c] = max(best[c − w] + v)</code>; go through the weight sums in <b>increasing</b> order — then one item can be taken again.</p>\n<pre><code>unbounded_best([(2, 3), (3, 5), (4, 7)], 10) → 17     # 4 + 4 + 2</code></pre>",
    "hints": [
     "The difference from 0/1 knapsack — go through the capacities in increasing order."
    ],
    "check": {
     "tests": "\nassert unbounded_best([(2, 3), (3, 5), (4, 7)], 10) == 17, 'Expected 17'\nassert unbounded_best([], 10) == 0, 'No items: 0'\nassert unbounded_best([(5, 10)], 4) == 0, 'Nothing fits: 0'\nassert unbounded_best([(1, 1), (3, 4)], 7) == 9, '3 + 3 + 1: 9'\nassert unbounded_best([(6, 30), (3, 14), (4, 16), (2, 9)], 10) == 48, 'Expected 48'\n"
    }
   },
   {
    "title": "Insert and Delete Operations",
    "prompt": "<p>Only <b>deleting a character</b> and <b>inserting a character</b> are allowed (no replacement). <code>min_ops(a, b)</code> must return the smallest number of operations to turn <code>a</code> into <code>b</code>. Tip: the longest common subsequence (LCS) stays unchanged; the rest we delete from <code>a</code> and insert into <code>b</code>: <code>len(a) + len(b) − 2·LCS</code>.</p>\n<pre><code>min_ops('қала', 'қалам') → 1\nmin_ops('sea', 'eat')    → 2\nmin_ops('abc', '')       → 3</code></pre>",
    "hints": [
     "First write the LCS DP from the DSA1 task."
    ],
    "check": {
     "tests": "\nassert min_ops('қала', 'қалам') == 1, \"min_ops('қала', 'қалам') 1\"\nassert min_ops('sea', 'eat') == 2, \"min_ops('sea', 'eat') 2\"\nassert min_ops('abc', '') == 3, 'Delete everything: 3'\nassert min_ops('', '') == 0, 'Empty strings: 0'\nassert min_ops('ab', 'ba') == 2, 'No replacement: 2'\nassert min_ops('leetcode', 'etco') == 4, 'Expected 4'\n"
    }
   },
   {
    "title": "Number of Longest Increasing Subsequences",
    "prompt": "<p><code>count_lis(a)</code> must return the <b>number</b> of the longest strictly increasing subsequences (distinct by their sets of indices). O(n²) DP: for each <code>i</code> — <code>length[i]</code> (the length of the longest chain ending at this element) and <code>count[i]</code> (the number of such chains). An empty list — 0.</p>\n<pre><code>count_lis([1, 3, 5, 4, 7]) → 2      # 1,3,5,7 және 1,3,4,7\ncount_lis([2, 2, 2])       → 3</code></pre>",
    "hints": [
     "If a longer chain is found, do <code>count[i] = count[j]</code>; if an equal length is found, do <code>count[i] += count[j]</code>.",
     "The answer is the sum of <code>count</code> over all <code>i</code> whose length is maximal."
    ],
    "check": {
     "tests": "\nassert count_lis([1, 3, 5, 4, 7]) == 2, 'Expected 2'\nassert count_lis([2, 2, 2]) == 3, 'Each element is a chain of length 1: 3'\nassert count_lis([]) == 0, 'Empty list: 0'\nassert count_lis([5]) == 1, 'One element: 1'\nassert count_lis([1, 2, 4, 3, 5, 4, 7, 2]) == 3, 'Expected 3'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(3)\nfor _ in range(30):\n    _x = [_rng.randint(0, 6) for _ in range(_rng.randint(1, 9))]\n    for _L in range(len(_x), 0, -1):\n        _c = sum(1 for idx in _comb(range(len(_x)), _L) if all(_x[idx[k]] < _x[idx[k + 1]] for k in range(_L - 1)))\n        if _c: break\n    assert count_lis(_x) == _c, f'count_lis({_x}) {_c} болуы керек'\n"
    }
   },
   {
    "title": "Splitting Work with a Bitmask",
    "prompt": "<p><code>n</code> couriers and <code>n</code> orders (<code>n ≤ 12</code>). <code>cost[i][j]</code> — the delivery time of order <code>j</code> by courier <code>i</code>. Each courier gets exactly one order. <code>min_assign(cost)</code> must return the smallest total time. Bitmask DP: <code>dp[mask]</code> — the smallest time when the first <code>popcount(mask)</code> couriers have taken the orders from the set <code>mask</code>. O(2ⁿ·n).</p>\n<pre><code>min_assign([[9, 2, 7], [6, 4, 3], [5, 8, 1]]) → 9     # 0→1 (2), 1→0 (6), 2→2 (1)</code></pre>",
    "hints": [
     "The number of the next courier is the number of ones in <code>mask</code>: <code>bin(mask).count('1')</code>.",
     "Adding a non-empty order <code>j</code>: <code>mask | (1 &lt;&lt; j)</code>."
    ],
    "check": {
     "tests": "\nassert min_assign([[9, 2, 7], [6, 4, 3], [5, 8, 1]]) == 9, 'Expected 9 (2 + 6 + 1)'\nassert min_assign([[5]]) == 5, 'One courier: 5'\nassert min_assign([]) == 0, 'No couriers: 0'\nassert min_assign([[1, 2], [2, 1]]) == 2, 'Expected 2'\nimport random as _random, time as _time\nfrom itertools import permutations as _perm\n_rng = _random.Random(4)\nfor _ in range(15):\n    _n = _rng.randint(1, 6); _c = [[_rng.randint(1, 30) for _ in range(_n)] for _ in range(_n)]\n    _exp = min(sum(_c[i][p[i]] for i in range(_n)) for p in _perm(range(_n)))\n    assert min_assign(_c) == _exp, f'min_assign({_c}) {_exp} болуы керек'\n_c = [[_rng.randint(1, 100) for _ in range(11)] for _ in range(11)]\n_t0 = _time.perf_counter(); min_assign(_c); _dt = _time.perf_counter() - _t0\nassert _dt < 4.0, f'For n = 11: {_dt:.2f} s, bitmask DP is needed (not n!)'\n"
    }
   },
   {
    "title": "Chosen Items",
    "prompt": "<p>0/1 knapsack, but now we need to know not only the value but also <b>which items</b> are taken. <code>items</code> is <code>(салмақ, пайда)</code>, <code>cap</code> is the capacity. <code>pick_items(items, cap)</code> must return <code>(ең_үлкен_пайда, индекстер)</code>, the indices in increasing order; if several optimal sets exist, any one. Build the 2D table <code>dp[i][c]</code> and restore the answer by going backwards: if <code>dp[i][c] != dp[i−1][c]</code>, then item <code>i</code> was taken.</p>\n<pre><code>pick_items([(1, 1), (3, 4), (4, 5), (5, 7)], 7) → (9, [1, 2])</code></pre>",
    "hints": [
     "A one-dimensional DP is not enough for restoring: a full table <code>(n + 1) × (cap + 1)</code> is needed.",
     "Going backwards, if an item was taken, subtract its weight from <code>c</code>."
    ],
    "check": {
     "tests": "\n_v, _idx = pick_items([(1, 1), (3, 4), (4, 5), (5, 7)], 7)\nassert _v == 9 and _idx == [1, 2], f'Expected (9, [1, 2]), yours is {(_v, _idx)}'\nassert pick_items([], 5) == (0, []), 'No items: (0, [])'\nassert pick_items([(10, 100)], 5) == (0, []), 'Nothing fits: (0, [])'\nassert pick_items([(2, 3)], 2) == (3, [0]), 'One item: (3, [0])'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(5)\nfor _ in range(40):\n    _it = [(_rng.randint(1, 8), _rng.randint(0, 20)) for _ in range(_rng.randint(0, 7))]; _cap = _rng.randint(0, 20)\n    _best = max(sum(_it[i][1] for i in c) for k in range(len(_it) + 1) for c in _comb(range(len(_it)), k) if sum(_it[i][0] for i in c) <= _cap)\n    _v, _idx = pick_items(_it, _cap)\n    assert _v == _best, f'pick_items({_it}, {_cap}): пайда {_best} болуы керек'\n    assert _idx == sorted(set(_idx)) and all(0 <= i < len(_it) for i in _idx), 'Индекстер өсу ретімен, қайталанусыз болуы керек'\n    assert sum(_it[i][0] for i in _idx) <= _cap and sum(_it[i][1] for i in _idx) == _best, f'Таңдалған заттар {_idx} жарамсыз немесе пайдасы сәйкес емес'\n"
    }
   },
   {
    "title": "Nested Boxes",
    "prompt": "<p>Gift boxes <code>(ені, биіктігі)</code>. One box can be put inside another if both of its sides are <b>strictly</b> smaller (rotation is not allowed). <code>max_nested(boxes)</code> must return the largest number of boxes nested one inside another. Trick: sort by width in increasing order, and for equal widths by height in <b>decreasing</b> order, then apply LIS to the heights (so boxes of equal width do not end up in one chain). O(n log n) — <code>bisect</code>.</p>\n<pre><code>max_nested([(5, 4), (6, 4), (6, 7), (2, 3)]) → 3     # (2,3) → (5,4) → (6,7)\nmax_nested([(1, 1), (1, 1)])                 → 1</code></pre>",
    "hints": [
     "The sort key: <code>(w, -h)</code>.",
     "The method <code>tails</code> from the DSA1 task: <code>bisect_left</code> — for a strictly increasing chain."
    ],
    "check": {
     "tests": "\nassert max_nested([(5, 4), (6, 4), (6, 7), (2, 3)]) == 3, 'Expected 3'\nassert max_nested([(1, 1), (1, 1)]) == 1, 'Identical boxes: 1'\nassert max_nested([]) == 0, 'No boxes: 0'\nassert max_nested([(1, 3), (1, 2), (1, 1)]) == 1, 'Equal width: 1'\nassert max_nested([(4, 5), (4, 6), (6, 7), (2, 3), (1, 1)]) == 4, 'Expected 4'\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(40):\n    _b = [(_rng.randint(1, 6), _rng.randint(1, 6)) for _ in range(_rng.randint(0, 9))]\n    _s = sorted(_b); _d = [1] * len(_s)\n    for _i in range(len(_s)):\n        for _j in range(_i):\n            if _s[_j][0] < _s[_i][0] and _s[_j][1] < _s[_i][1]: _d[_i] = max(_d[_i], _d[_j] + 1)\n    assert max_nested(_b) == max(_d + [0]), f'max_nested({_b}) {max(_d + [0])} болуы керек'\n_big = [(_rng.randint(1, 10**6), _rng.randint(1, 10**6)) for _ in range(50000)]\n_t0 = _time.perf_counter(); max_nested(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'50,000 boxes, {_dt:.2f} s: an O(n log n) LIS is needed'\n"
    }
   }
  ]
 },
 "alg-11": {
  "pr": [
   {
    "title": "Longest Border",
    "prompt": "<p>A <b>border</b> of a string is a substring that is not the string itself and is at the same time both a prefix and a suffix. <code>longest_border(s)</code> must return the longest border itself (as a string); if there is none, <code>''</code>. The last value of the prefix function, <code>pi[-1]</code>, is its length.</p>\n<pre><code>longest_border('abacaba') → 'aba'\nlongest_border('aaaa')    → 'aaa'\nlongest_border('abc')     → ''</code></pre>",
    "hints": [
     "Write <code>prefix_function</code> following the example from the lesson.",
     "Check the empty string separately."
    ],
    "check": {
     "tests": "\nassert longest_border('abacaba') == 'aba', \"Expected 'aba'\"\nassert longest_border('aaaa') == 'aaa', \"A border may overlap: 'aaa'\"\nassert longest_border('abc') == '', \"No border: ''\"\nassert longest_border('') == '', \"Empty string: ''\"\nassert longest_border('a') == '', \"One character: ''\"\nassert longest_border('ананана') == 'анана', \"Expected 'анана'\"\nimport time as _time\n_s = 'ab' * 50000\n_t0 = _time.perf_counter(); _r = longest_border(_s); _dt = _time.perf_counter() - _t0\nassert _r == 'ab' * 49999 and _dt < 1.0, f'An O(n) prefix function is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Cyclic Shift",
    "prompt": "<p><code>is_rotation(a, b)</code>: the string <code>b</code> is a cyclic shift of <code>a</code> (when several characters are moved from the start to the end) — <code>True</code>. The lengths must be equal. Trick: <code>b</code> occurs inside <code>a + a</code>. Search with KMP: does the prefix function of the string <code>b + '#' + a + a</code> contain the value <code>len(b)</code> (<code>'#'</code> does not occur in the strings).</p>\n<pre><code>is_rotation('алматы', 'атыалм') → True\nis_rotation('ab', 'ab')         → True\nis_rotation('ab', 'aa')         → False</code></pre>",
    "hints": [
     "First compare the lengths.",
     "At the place where the prefix function value equals <code>len(b)</code>, <code>b</code> has been fully found."
    ],
    "check": {
     "tests": "\nassert is_rotation('алматы', 'атыалм') is True, \"'атыалм' is a shift: True\"\nassert is_rotation('ab', 'ab') is True, 'An unshifted string is also a shift: True'\nassert is_rotation('ab', 'aa') is False, 'It must be False'\nassert is_rotation('', '') is True, 'Empty strings: True'\nassert is_rotation('abc', 'ab') is False, 'Different lengths: False'\nassert is_rotation('aab', 'aba') is True and is_rotation('aab', 'bba') is False, 'Shifts of aab'\n"
    }
   },
   {
    "title": "First Occurrence",
    "prompt": "<p><code>first_index(text, pattern)</code> in the text <code>pattern</code> must return the index of the first occurrence, or <code>-1</code> if there is none; an empty pattern — 0. Using KMP in O(n + m): for the <code>i</code> at which <code>len(pattern)</code> first appears in the prefix function of the string <code>pattern + '#' + text</code>, the answer is <code>i − 2·len(pattern)</code>. Do not use <code>find</code>, <code>index</code>, <code>in</code>. The text contains no <code>'#'</code>.</p>\n<pre><code>first_index('сәлем әлем', 'әлем') → 1\nfirst_index('aaa', 'b')           → -1</code></pre>",
    "hints": [
     "If the string <code>pattern + '#' + text</code> has <code>pi[i] == m</code> at position <code>i</code>, the pattern starts at <code>i − m + 1</code>; the index in the text is <code>i − 2m</code>."
    ],
    "check": {
     "tests": "\nassert first_index('сәлем әлем', 'әлем') == 1, \"first_index('сәлем әлем', 'әлем') 1\"\nassert first_index('aaa', 'b') == -1, 'None: -1'\nassert first_index('abc', '') == 0, 'Empty pattern: 0'\nassert first_index('', 'a') == -1, 'Empty text: -1'\nassert first_index('ababcabab', 'abab') == 0, 'At the start: 0'\nassert first_index('xxabab', 'abab') == 2, 'Expected 2'\nimport random as _random\n_rng = _random.Random(1)\nfor _ in range(60):\n    _t = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12))); _p = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    assert first_index(_t, _p) == _t.find(_p), f'first_index({_t!r}, {_p!r}) {_t.find(_p)} болуы керек'\n"
    }
   },
   {
    "title": "Counting Prefix Occurrences",
    "prompt": "<p><code>prefix_counts(s)</code> must return a list of length <code>len(s)</code>: <code>res[L−1]</code> — how many times the prefix of length <code>L</code> occurs in <code>s</code> (including overlapping occurrences). A classic use of the prefix function, O(n): for each <code>i</code> — <code>cnt[pi[i]] += 1</code>, then from the longest to the shortest distribute the counter <code>cnt[pi[L−1]] += cnt[L]</code>; at the end each prefix also occurs once by itself.</p>\n<pre><code>prefix_counts('abab') → [2, 2, 1, 1]\nprefix_counts('aaa')  → [3, 2, 1]</code></pre>",
    "hints": [
     "If <code>pi[i] = k</code>, then the prefix of length <code>k</code> ends at <code>i</code>; its borders also end there.",
     "So the counter must be distributed from <code>L</code> to <code>pi[L − 1]</code>; the longest ones first."
    ],
    "check": {
     "tests": "\nassert prefix_counts('abab') == [2, 2, 1, 1], 'Expected [2, 2, 1, 1]'\nassert prefix_counts('aaa') == [3, 2, 1], 'Expected [3, 2, 1]'\nassert prefix_counts('') == [], 'Empty string: []'\nassert prefix_counts('abc') == [1, 1, 1], 'Expected [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 12)))\n    _exp = [sum(1 for i in range(len(_s) - L + 1) if _s[i:i + L] == _s[:L]) for L in range(1, len(_s) + 1)]\n    assert prefix_counts(_s) == _exp, f'prefix_counts({_s!r}) {_exp} болуы керек'\n_s = 'a' * 100000\n_t0 = _time.perf_counter(); _r = prefix_counts(_s); _dt = _time.perf_counter() - _t0\nassert _r[0] == 100000 and _r[-1] == 1 and _dt < 1.5, f'An O(n) solution is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Comparing Parts with Hashing",
    "prompt": "<p>String hashing: the class <code>SubHash(s)</code> computes the prefix hashes in its constructor (<code>h[i+1] = (h[i] · B + ord(s[i])) % M</code>, <code>B = 131</code>, <code>M = 2<sup>61</sup> − 1</code>) and the powers <code>B</code>. <code>get(i, j)</code> — get the hash of <code>s[i:j]</code> in O(1): <code>(h[j] − h[i] · B<sup>j−i</sup>) % M</code>. <code>same(i, j, L)</code> — if the hashes of <code>s[i:i+L]</code> and <code>s[j:j+L]</code> are equal, then <code>True</code>. Do not make slices: each query is O(1).</p>\n<pre><code>h = SubHash('абракадабра')\nh.same(0, 7, 4) → True     # 'абра' == 'абра'\nh.same(0, 3, 2) → False</code></pre>",
    "hints": [
     "Precompute the array <code>p[k] = B<sup>k</sup> % M</code> in advance.",
     "In Python, <code>%</code> gives a non-negative result even for a negative number."
    ],
    "check": {
     "tests": "\n_h = SubHash('абракадабра')\nassert _h.same(0, 7, 4) is True, \"'абра' == 'абра': True\"\nassert _h.same(0, 3, 2) is False, \"'аб' != 'ак': False\"\nassert _h.same(2, 2, 5) is True, 'One position: True'\nassert _h.same(0, 5, 0) is True, 'Empty parts are equal: True'\nassert _h.get(0, 1) == ord('а'), 'The hash of one character is its code'\nassert _h.get(1, 3) == (ord('б') * 131 + ord('р')) % ((1 << 61) - 1), 'get(1, 3) is wrong'\nimport random as _random, time as _time\n_rng = _random.Random(3)\n_s = ''.join(_rng.choice('ab') for _ in range(300))\n_hh = SubHash(_s)\nfor _ in range(300):\n    _L = _rng.randint(0, 20); _i = _rng.randint(0, 300 - _L); _j = _rng.randint(0, 300 - _L)\n    assert _hh.same(_i, _j, _L) == (_s[_i:_i + _L] == _s[_j:_j + _L]), f'same({_i}, {_j}, {_L}) қате'\n_big = SubHash('x' * 200000)\n_t0 = _time.perf_counter()\nfor _q in range(50000):\n    _big.same(_q, _q + 1, 100000)\nassert _time.perf_counter() - _t0 < 1.5, 'Each query must be O(1) (do not make slices)'\n"
    }
   },
   {
    "title": "Prefix–Suffix Overlap",
    "prompt": "<p>When joining two words, we want to write the repeated part only once. <code>overlap_len(a, b)</code> must return the length of the longest <b>prefix</b> of <code>b</code> that is a <b>suffix</b> of <code>a</code>. KMP: the last prefix function value of the string <code>b + '#' + a</code> (<code>'#'</code> does not occur in the words).</p>\n<pre><code>overlap_len('қазақ', 'ақсу')  → 2      # 'ақ'\noverlap_len('abc', 'xyz')     → 0\noverlap_len('aaa', 'aaaa')    → 3</code></pre>",
    "hints": [
     "The separator <code>'#'</code> stops the value from exceeding <code>len(b)</code>."
    ],
    "check": {
     "tests": "\nassert overlap_len('қазақ', 'ақсу') == 2, \"'ақ': 2\"\nassert overlap_len('abc', 'xyz') == 0, 'No overlap: 0'\nassert overlap_len('aaa', 'aaaa') == 3, 'Expected 3'\nassert overlap_len('', 'abc') == 0 and overlap_len('abc', '') == 0, 'Empty string: 0'\nassert overlap_len('abab', 'abab') == 4, 'Identical words: 4'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _a = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 8))); _b = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 8)))\n    _exp = max([L for L in range(0, min(len(_a), len(_b)) + 1) if _a.endswith(_b[:L])])\n    assert overlap_len(_a, _b) == _exp, f'overlap_len({_a!r}, {_b!r}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Shortest Palindrome",
    "prompt": "<p><code>shortest_palindrome(s)</code>: add as few characters as possible <b>to the start</b> of the string to make a palindrome; return the result. For this we need to find the longest palindromic prefix of <code>s</code>: the last prefix function value of the string <code>s + '#' + reversed(s)</code> gives exactly that. Then reverse the remaining suffix and put it at the front. O(n).</p>\n<pre><code>shortest_palindrome('aacecaaa') → 'aaacecaaa'\nshortest_palindrome('abcd')     → 'dcbabcd'\nshortest_palindrome('')         → ''</code></pre>",
    "hints": [
     "A palindromic prefix is a prefix of <code>s</code> and a suffix of <code>reversed(s)</code>.",
     "The answer: <code>s[k:][::-1] + s</code>."
    ],
    "check": {
     "tests": "\nassert shortest_palindrome('aacecaaa') == 'aaacecaaa', \"Expected 'aaacecaaa'\"\nassert shortest_palindrome('abcd') == 'dcbabcd', \"Expected 'dcbabcd'\"\nassert shortest_palindrome('') == '', \"Empty string: ''\"\nassert shortest_palindrome('a') == 'a', 'One character'\nassert shortest_palindrome('қазақ') == 'қазақ', 'A palindrome does not change'\nassert shortest_palindrome('ab') == 'bab', \"Expected 'bab'\"\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(60):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 10)))\n    _k = max(L for L in range(1, len(_s) + 1) if _s[:L] == _s[:L][::-1])\n    _exp = _s[_k:][::-1] + _s\n    assert shortest_palindrome(_s) == _exp, f'shortest_palindrome({_s!r}) {_exp!r} болуы керек'\n_s = 'a' * 49999 + 'b' + 'a' * 50000\n_t0 = _time.perf_counter(); _r = shortest_palindrome(_s); _dt = _time.perf_counter() - _t0\nassert _r == 'a' + _s and _dt < 1.5, f'An O(n) solution is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Longest Repeated Fragment",
    "prompt": "<p><code>longest_repeat(s)</code> must return the <b>length</b> of the longest substring that occurs in the string at least twice (starting at different positions; the occurrences may overlap). Binary search on the length: the condition 'is there a repeated fragment of length <code>L</code>' is monotonic. Check it with rolling hash in O(n): collect the hashes of all fragments of length <code>L</code> into <code>set</code>. Overall O(n log n). <code>len(s) ≤ 20 000</code>.</p>\n<pre><code>longest_repeat('banana') → 3      # 'ana'\nlongest_repeat('abcd')   → 0\nlongest_repeat('aaaa')   → 3</code></pre>",
    "hints": [
     "If a fragment of length <code>L</code> repeats, then a fragment of length <code>L − 1</code> repeats too: binary search works.",
     "Compute the prefix hashes once, and inside <code>has(L)</code> take the hash of each fragment in O(1)."
    ],
    "check": {
     "tests": "\nassert longest_repeat('banana') == 3, \"longest_repeat('banana') 3\"\nassert longest_repeat('abcd') == 0, 'No repeats: 0'\nassert longest_repeat('aaaa') == 3, 'Overlap allowed: 3'\nassert longest_repeat('') == 0 and longest_repeat('a') == 0, 'Empty or a single character: 0'\nassert longest_repeat('абабаб') == 4, \"'абаб' twice: 4\"\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 12)))\n    _exp = max([L for L in range(1, len(_s)) if len(set(_s[i:i + L] for i in range(len(_s) - L + 1))) < len(_s) - L + 1] + [0])\n    assert longest_repeat(_s) == _exp, f'longest_repeat({_s!r}) {_exp} болуы керек'\n_s = ''.join(_rng.choice('abcdefgh') for _ in range(20000)); _s = _s + _s[5000:5600]\n_t0 = _time.perf_counter(); _r = longest_repeat(_s); _dt = _time.perf_counter() - _t0\nassert _r >= 600 and _dt < 4.0, f'Big test: at least 600, binary search + hash are needed ({_dt:.2f} s)'\n"
    }
   }
  ]
 },
 "alg-12": {
  "pr": [
   {
    "title": "Number of Trie Nodes",
    "prompt": "<p><code>trie_size(words)</code> must return how many nodes (other than the root) appear in the trie when the words are inserted. This is the number of distinct non-empty prefixes of the words. Build the trie and increase the counter each time a new node is created.</p>\n<pre><code>trie_size(['ат', 'ата', 'ару']) → 5     # а, ат, ата, ар, ару\ntrie_size([])                   → 0</code></pre>",
    "hints": [
     "A node can be written as a plain dictionary: <code>node = node.setdefault(ch, {})</code>.",
     "Count only when a new node is created."
    ],
    "check": {
     "tests": "\nassert trie_size(['ат', 'ата', 'ару']) == 5, 'Expected 5'\nassert trie_size([]) == 0, 'No words: 0'\nassert trie_size(['', '']) == 0, 'An empty word adds no node: 0'\nassert trie_size(['абв', 'абв']) == 3, 'A repeated word: 3'\nassert trie_size(['a', 'b', 'c']) == 3, 'No common prefix: 3'\nimport random as _random\n_rng = _random.Random(1)\n_w = [''.join(_rng.choice('аб') for _ in range(_rng.randint(0, 6))) for _ in range(40)]\nassert trie_size(_w) == len({w[:i] for w in _w for i in range(1, len(w) + 1)}), 'Random test: the number of distinct prefixes'\n"
    }
   },
   {
    "title": "Words with a Given Prefix",
    "prompt": "<p>A shop search: <code>with_prefix(words, p)</code> must return the words starting with <code>p</code>, without repeats, as a sorted list. Build a trie, go down to the node <code>p</code> and do a DFS from it: visit the children in the order <code>sorted(...)</code> — then the result is sorted by itself. An empty <code>p</code> means all the words.</p>\n<pre><code>with_prefix(['сүт', 'сүзбе', 'сүтті шоколад', 'сағыз'], 'сүт') → ['сүт', 'сүтті шоколад']</code></pre>",
    "hints": [
     "If the prefix node is not found — <code>[]</code>.",
     "In the DFS first the node itself (<code>end</code>), then its children — so 'сүт' comes before 'сүтті'."
    ],
    "check": {
     "tests": "\nassert with_prefix(['сүт', 'сүзбе', 'сүтті шоколад', 'сағыз'], 'сүт') == ['сүт', 'сүтті шоколад'], \"Expected ['сүт', 'сүтті шоколад']\"\nassert with_prefix(['нан', 'нан'], 'на') == ['нан'], 'There must be no repeats'\nassert with_prefix(['ет'], 'шай') == [], 'None: []'\nassert with_prefix(['б', 'а', 'ав'], '') == ['а', 'ав', 'б'], 'Empty prefix: everything is sorted'\nassert with_prefix([], 'а') == [], 'No words: []'\n"
    }
   },
   {
    "title": "Replacing Words with Roots",
    "prompt": "<p><code>roots</code> is a list of roots, <code>sentence</code> is a sentence of words separated by spaces. <code>replace_roots(roots, sentence)</code> must replace each word with its <b>shortest</b> root (a root that is a prefix of the word); a word without a root is not changed. Build a trie from the roots, and for each word walk down the trie until you first reach the node <code>end</code>.</p>\n<pre><code>replace_roots(['кітап', 'оқы'], 'кітаптар оқылды мектепте') → 'кітап оқы мектепте'</code></pre>",
    "hints": [
     "Walking the word through the trie, stop at the first node <code>end</code> — this is the shortest root."
    ],
    "check": {
     "tests": "\nassert replace_roots(['кітап', 'оқы'], 'кітаптар оқылды мектепте') == 'кітап оқы мектепте', 'Expected \"кітап оқы мектепте\"'\nassert replace_roots(['a', 'aa'], 'aaa ab b') == 'a a b', 'Shortest root: \"a a b\"'\nassert replace_roots([], 'сәлем әлем') == 'сәлем әлем', 'No root: unchanged'\nassert replace_roots(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery') == 'the cat was rat by the bat', 'The English example is wrong'\nassert replace_roots(['ата'], 'ат') == 'ат', 'A word shorter than the root: unchanged'\n"
    }
   },
   {
    "title": "Search with a Dot",
    "prompt": "<p>The class <code>WordDictionary</code>: the method <code>add(word)</code> adds a word; <code>search(pattern)</code> returns <code>True</code> if there is a word matching the pattern. In the pattern, <code>'.'</code> stands for <b>exactly one</b> any character. Trie + DFS: when you meet <code>'.'</code>, check all the children.</p>\n<pre><code>d = WordDictionary()\nd.add('бал'); d.add('бас'); d.add('мал')\nd.search('ба.') → True\nd.search('.ал') → True\nd.search('б..с') → False</code></pre>",
    "hints": [
     "<code>dfs(node, i)</code>: when the pattern has ended, return <code>node.end</code>.",
     "<code>'.'</code> for <code>any(...)</code> — over all the children."
    ],
    "check": {
     "tests": "\n_d = WordDictionary()\n_d.add('бал'); _d.add('бас'); _d.add('мал')\nassert _d.search('ба.') is True, \"'ба.': True\"\nassert _d.search('.ал') is True, \"'.ал': True\"\nassert _d.search('б..с') is False, \"'б..с': False (length 4)\"\nassert _d.search('бал') is True and _d.search('ба') is False, \"'ба' is only a prefix, not a word\"\nassert _d.search('...') is True and _d.search('..') is False, 'Only dots'\n_e = WordDictionary()\nassert _e.search('') is False and _e.search('.') is False, 'Empty dictionary: False'\n_e.add('')\nassert _e.search('') is True, 'If the empty word is added: True'\n"
    }
   },
   {
    "title": "Shortest Unique Prefix",
    "prompt": "<p>To find contacts on a phone quickly, each name needs its shortest <b>unique</b> prefix (no other name starts with it). <code>unique_prefixes(words)</code> must return the list of such prefixes for each word (in the same order). The names are different, and none is a prefix of another. Add the field <code>count</code> to the trie (how many words pass through this node): walk along the word and stop when you first reach a node with <code>count == 1</code>.</p>\n<pre><code>unique_prefixes(['айгүл', 'айдос', 'берік', 'бота']) → ['айг', 'айд', 'бе', 'бо']</code></pre>",
    "hints": [
     "When building <code>insert</code>, increase the counter at each node on the path.",
     "On the second pass, cut the prefix at the first position where the counter equals 1."
    ],
    "check": {
     "tests": "\nassert unique_prefixes(['айгүл', 'айдос', 'берік', 'бота']) == ['айг', 'айд', 'бе', 'бо'], \"Expected ['айг', 'айд', 'бе', 'бо']\"\nassert unique_prefixes(['зере']) == ['з'], 'One word: its first letter'\nassert unique_prefixes([]) == [], 'No words: []'\nassert unique_prefixes(['zebra', 'dog', 'duck', 'dove']) == ['z', 'dog', 'du', 'dov'], 'The English example is wrong'\nimport random as _random\n_rng = _random.Random(2)\n_w = list({''.join(_rng.choice('абв') for _ in range(6)) for _ in range(30)})\n_r = unique_prefixes(_w)\nfor _x, _p in zip(_w, _r):\n    assert _x.startswith(_p) and sum(1 for y in _w if y.startswith(_p)) == 1, f'{_x}: {_p} бірегей емес'\n    assert sum(1 for y in _w if y.startswith(_p[:-1])) > 1, f'{_x}: {_p} ең қысқа емес'\n"
    }
   },
   {
    "title": "Sum by Prefix",
    "prompt": "<p>The shop's goods and their prices: the class <code>PriceSum</code>. The method <code>insert(name, price)</code> adds an item (if it already exists, it <b>replaces</b> the price); the method <code>total(prefix)</code> returns the sum of the prices of the items whose names start with <code>prefix</code>. Store 'the sum for this prefix' in the trie node; when the price is replaced, add the difference to the nodes on the path — <code>жаңа − ескі</code>. Both operations are O(L).</p>\n<pre><code>s = PriceSum()\ns.insert('алма', 300); s.insert('алмұрт', 500)\ns.total('ал')   → 800\ns.insert('алма', 200)\ns.total('алм')  → 700</code></pre>",
    "hints": [
     "Keep the old prices in a separate dictionary: <code>delta = price − old</code>.",
     "Add <code>delta</code> to each node on the path (including the root)."
    ],
    "check": {
     "tests": "\n_s = PriceSum()\n_s.insert('алма', 300); _s.insert('алмұрт', 500)\nassert _s.total('ал') == 800, \"total('ал') 800\"\n_s.insert('алма', 200)\nassert _s.total('алм') == 700, 'Price replaced: 700'\nassert _s.total('алма') == 200, \"total('алма') 200\"\nassert _s.total('б') == 0, 'No such prefix: 0'\nassert _s.total('') == 700, 'Empty prefix: everything'\n_s.insert('ал', 50)\nassert _s.total('ал') == 750 and _s.total('алм') == 700, 'A prefix that is also a word is counted too'\nimport random as _random, time as _time\n_rng = _random.Random(3)\n_ps = PriceSum(); _ref = {}\nfor _ in range(500):\n    _nm = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 4)))\n    if _rng.random() < 0.6:\n        _v = _rng.randint(0, 100); _ps.insert(_nm, _v); _ref[_nm] = _v\n    else:\n        _pre = _nm[:_rng.randint(0, len(_nm))]\n        assert _ps.total(_pre) == sum(v for k, v in _ref.items() if k.startswith(_pre)), f'total({_pre!r}) қате'\n"
    }
   },
   {
    "title": "Largest XOR Pair",
    "prompt": "<p><code>max_xor(nums)</code> (<code>0 ≤ x &lt; 2<sup>31</sup></code>) must return the maximum of the value <code>a ^ b</code> over two numbers from the list (a number may form a pair with itself, then the result is 0). O(n²) is slow. Bit trie: insert each number into the trie from bit 30 down to bit 0; for each number at each level try to go to the <b>opposite</b> bit — then the high bits of the XOR will be 1. O(31·n).</p>\n<pre><code>max_xor([3, 10, 5, 25, 2, 8]) → 28     # 5 ^ 25\nmax_xor([7])                  → 0</code></pre>",
    "hints": [
     "Bit: <code>(x &gt;&gt; b) &amp; 1</code>; a trie node is the dictionary <code>{0: ..., 1: ...}</code>.",
     "If the opposite bit exists, add <code>1 &lt;&lt; b</code> to the answer and go down there."
    ],
    "check": {
     "tests": "\nassert max_xor([3, 10, 5, 25, 2, 8]) == 28, 'Expected 28'\nassert max_xor([7]) == 0, 'One number: 0'\nassert max_xor([0, 0]) == 0, 'Zeros: 0'\nassert max_xor([1, 2]) == 3, '1 ^ 2 = 3'\nassert max_xor([2**31 - 1, 0]) == 2**31 - 1, 'The highest bit'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(30):\n    _x = [_rng.randint(0, 200) for _ in range(_rng.randint(1, 12))]\n    _exp = max(a ^ b for a in _x for b in _x)\n    assert max_xor(_x) == _exp, f'max_xor({_x}) {_exp} болуы керек'\n_big = [_rng.randint(0, 2**31 - 1) for _ in range(20000)]\n_t0 = _time.perf_counter(); max_xor(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'20,000 numbers, {_dt:.2f} s: a bit trie is needed (not O(n²))'\n"
    }
   },
   {
    "title": "Words on a Grid",
    "prompt": "<p>The letter grid <code>board</code> (a list of strings) and the words <code>words</code>. A word can be built from neighbouring (up/down/left/right) cells, and in one word each cell is used at most once. <code>find_words(board, words)</code> must return the words found on the grid as a sorted list without repeats. Searching for each word separately is slow: build a trie from the words, and from each cell walk along the trie with backtracking — a prefix that is not in the trie is cut off at once.</p>\n<pre><code>find_words(['oaan', 'etae', 'ihkr', 'iflv'], ['oath', 'pea', 'eat', 'rain']) → ['eat', 'oath']</code></pre>",
    "hints": [
     "At the node where a word ends, store the word itself under the key <code>'$'</code>.",
     "Backtracking: mark the cell with <code>used</code>, and when going back remove the mark."
    ],
    "check": {
     "tests": "\nassert find_words(['oaan', 'etae', 'ihkr', 'iflv'], ['oath', 'pea', 'eat', 'rain']) == ['eat', 'oath'], \"Expected ['eat', 'oath']\"\nassert find_words(['ab', 'cd'], ['abcb']) == [], 'A cell cannot be reused twice: []'\nassert find_words(['a'], ['a', 'a', 'b']) == ['a'], \"No repeats: ['a']\"\nassert find_words(['ата', 'ұлы'], ['ата', 'атұ', 'тұл', 'ұлы', 'аталы', 'тлы']) == ['ата', 'тлы', 'ұлы'], \"A Cyrillic grid: ['ата', 'тлы', 'ұлы']\"\nassert find_words(['ab'], []) == [], 'No words: []'\nimport time as _time\n_b = ['a' * 4] * 4\n_ws = ['a' * k for k in range(1, 9)] + ['a' * 7 + 'b']\n_t0 = _time.perf_counter(); _r = find_words(_b, _ws); _dt = _time.perf_counter() - _t0\nassert _r == sorted('a' * k for k in range(1, 9)), \"On a 4×4 grid of 'a' there must be words of length 1..8\"\nassert _dt < 4.0, f'{_dt:.2f} s: cut off the prefixes earlier using the trie'\n"
    }
   }
  ]
 }
} });
