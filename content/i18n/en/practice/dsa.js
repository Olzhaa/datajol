// dsa practice tasks: English text. Code, solutions and checks are in content/practice/dsa.js.
DJ.i18n.patch({ lessons: {
 "dsa-1": {
  "pr": [
   {
    "title": "Largest number",
    "prompt": "<p><code>max_value(xs)</code> must return the largest number in the list without using <code>max()</code>, going through the list once (O(n)). For an empty list — <code>None</code>.</p>\n<pre><code>max_value([3, -1, 7, 2]) → 7\nmax_value([-5, -9])      → -5\nmax_value([])            → None</code></pre>",
    "hints": [
     "Check for an empty list first.",
     "Use <code>xs[0]</code> as the starting value (not 0: all numbers may be negative)."
    ],
    "check": {
     "tests": "\nassert max_value([3, -1, 7, 2]) == 7, 'max_value([3, -1, 7, 2]) must return 7'\nassert max_value([-5, -9]) == -5, 'Even if all numbers are negative, return the largest: -5'\nassert max_value([]) is None, 'For an empty list: None'\nassert max_value([4]) == 4, 'In a list with one element: that element'\nassert max_value([2, 2, 2]) == 2, 'Equal values: 2'\n_big = list(range(100000))\nassert max_value(_big) == 99999, 'In the list 0..99999 it must be 99999'\n"
    }
   },
   {
    "title": "Count of even numbers",
    "prompt": "<p>Student numbers in a school queue are given. <code>count_even(xs)</code> must return how many even numbers there are (0 is even, negative numbers may also appear).</p>\n<pre><code>count_even([1, 2, 3, 4]) → 2\ncount_even([0, -2, 5])   → 2\ncount_even([])           → 0</code></pre>",
    "hints": [
     "<code>x % 2 == 0</code> is an even number."
    ],
    "check": {
     "tests": "\nassert count_even([1, 2, 3, 4]) == 2, 'count_even([1, 2, 3, 4]) must return 2'\nassert count_even([0, -2, 5]) == 2, '0 and -2 are even numbers: 2'\nassert count_even([]) == 0, 'For an empty list: 0'\nassert count_even([1, 3, 5]) == 0, 'No even numbers: 0'\nassert count_even(list(range(100000))) == 50000, 'In the range 0..99999 there must be 50000 even numbers'\n"
    }
   },
   {
    "title": "Common cities",
    "prompt": "<p>Two bus companies each have a list of cities they serve (duplicates are possible). <code>common_cities(a, b)</code> must return the cities that appear in both lists, <b>with no duplicates, sorted alphabetically</b>. The solution must run in O(n + m) using <code>set</code>.</p>\n<pre><code>common_cities(['Алматы', 'Тараз', 'Алматы'], ['Тараз', 'Алматы', 'Атырау'])\n→ ['Алматы', 'Тараз']</code></pre>",
    "hints": [
     "Convert both lists to <code>set</code> and find their intersection with <code>&amp;</code>.",
     "Turn the result into a list with <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "\nassert common_cities(['Алматы', 'Тараз', 'Алматы'], ['Тараз', 'Алматы', 'Атырау']) == ['Алматы', 'Тараз'], \"Expected ['Алматы', 'Тараз']\"\nassert common_cities([], ['Астана']) == [], 'If one of the lists is empty, there are no common cities'\nassert common_cities(['Орал'], ['Ақтөбе']) == [], 'No common cities: []'\nassert common_cities(['Шымкент', 'Шымкент'], ['Шымкент']) == ['Шымкент'], 'No duplicates: only once'\n_a = [str(i) for i in range(50000)]; _b = [str(i) for i in range(25000, 75000)]\nassert len(common_cities(_a, _b)) == 25000, 'In large lists there must be 25000 common values'\n"
    }
   },
   {
    "title": "Number and its double",
    "prompt": "<p><code>has_double(xs)</code>: if the list has two elements of the form <code>i != j</code> and <code>xs[j] == 2 * xs[i]</code>, return <code>True</code>. Note: for 0 you need a second 0 (an element does not pair with itself). The test checks 100 000 elements, so the solution must be O(n).</p>\n<pre><code>has_double([10, 2, 5, 3]) → True    # 10 = 2 · 5\nhas_double([3, 1, 7, 11]) → False\nhas_double([0])           → False\nhas_double([0, 0])        → True</code></pre>",
    "hints": [
     "For each <code>x</code>, check whether <code>2 * x</code> or <code>x / 2</code> has already been seen.",
     "Add the element to <code>seen</code> only <b>after</b> the check, so that 0 does not pair with itself."
    ],
    "check": {
     "tests": "\nassert has_double([10, 2, 5, 3]) is True, 'has_double([10, 2, 5, 3]) must return True: 10 = 2 · 5'\nassert has_double([3, 1, 7, 11]) is False, 'has_double([3, 1, 7, 11]) must return False'\nassert has_double([0]) is False, 'A single 0 does not pair with itself'\nassert has_double([0, 0]) is True, 'Two zeros: 0 = 2 · 0'\nassert has_double([-2, -4]) is True, '-4 = 2 · (-2)'\nassert has_double([7, 3]) is False, '7 // 2 = 3, but 7 is not equal to 2 · 3.5'\nassert has_double([]) is False, 'Empty list: False'\nimport time as _time\n_big = list(range(1, 200001, 2))\n_t0 = _time.perf_counter(); _r = has_double(_big); _dt = _time.perf_counter() - _t0\nassert _r is False, 'Among odd numbers only there is no pair of the form 2·x'\nassert _dt < 1.0, f'100 000 elements took {_dt:.2f} s: write an O(n) solution using a set'\n"
    }
   },
   {
    "title": "First repeated ticket",
    "prompt": "<p>Ticket numbers of people entering a stadium are given in order of arrival. <code>first_repeat(ids)</code> must return the number that is seen <b>for the second time</b> earliest; if there are no repeats, return <code>None</code>. O(n).</p>\n<pre><code>first_repeat([5, 1, 3, 1, 5]) → 1    # 1 екінші рет 3-позицияда, 5 тек 4-те\nfirst_repeat([4, 2, 9])       → None</code></pre>",
    "hints": [
     "Go from left to right and fill <code>seen</code>.",
     "As soon as you meet a value you have already seen, return it."
    ],
    "check": {
     "tests": "\nassert first_repeat([5, 1, 3, 1, 5]) == 1, 'first_repeat([5, 1, 3, 1, 5]) must return 1 (not 5)'\nassert first_repeat([4, 2, 9]) is None, 'No repeats: None'\nassert first_repeat([]) is None, 'Empty list: None'\nassert first_repeat([7, 7]) == 7, 'first_repeat([7, 7]) must return 7'\nassert first_repeat([0, 1, 0]) == 0, 'The number 0 can also be a correct answer'\n_big = list(range(100000)) + [123]\nassert first_repeat(_big) == 123, 'The 123 at the end is the first repeated one'\n"
    }
   },
   {
    "title": "Halving steps",
    "prompt": "<p><code>halving_steps(n)</code>: <code>n</code> is a non-negative integer. While <code>n &gt; 1</code> is not true, we perform <code>n //= 2</code>. Return the number of steps done. This is an example of an O(log n) loop: for <code>n = 10<sup>18</sup></code> it must also finish instantly.</p>\n<pre><code>halving_steps(8)  → 3    # 8 → 4 → 2 → 1\nhalving_steps(10) → 3    # 10 → 5 → 2 → 1\nhalving_steps(1)  → 0\nhalving_steps(0)  → 0</code></pre>",
    "hints": [
     "Increase the step counter inside the loop <code>while n &gt; 1:</code>."
    ],
    "check": {
     "tests": "\nassert halving_steps(8) == 3, 'halving_steps(8) must return 3'\nassert halving_steps(10) == 3, 'halving_steps(10) must return 3'\nassert halving_steps(1) == 0, 'n = 1: 0 steps'\nassert halving_steps(0) == 0, 'n = 0: 0 steps'\nassert halving_steps(2) == 1, 'n = 2: 1 step'\nassert halving_steps(1023) == 9, 'n = 1023: 9 steps'\nassert halving_steps(1024) == 10, 'n = 1024: 10 steps'\nassert halving_steps(10**18) == 59, 'n = 10^18: 59 steps'\n"
    }
   },
   {
    "title": "Sum equals zero",
    "prompt": "<p>Bank account operations: deposits are positive numbers, withdrawals are negative. <code>has_zero_pair(ops)</code>: if there is a pair of the form <code>i &lt; j</code> and <code>ops[i] + ops[j] == 0</code>, then <code>True</code>. The test checks 100 000 operations, so an O(n²) solution will not pass.</p>\n<pre><code>has_zero_pair([500, -200, 300, 200]) → True\nhas_zero_pair([0, 5])                → False   # 0 үшін екінші 0 керек\nhas_zero_pair([0, 5, 0])             → True</code></pre>",
    "hints": [
     "For each <code>x</code>, check in O(1) whether we have already seen <code>-x</code> — via <code>set</code>.",
     "Add <code>x</code> only after the check, so that a single 0 does not pair with itself."
    ],
    "check": {
     "tests": "\nassert has_zero_pair([500, -200, 300, 200]) is True, '-200 + 200 = 0: True'\nassert has_zero_pair([0, 5]) is False, 'A single 0 does not form a pair'\nassert has_zero_pair([0, 5, 0]) is True, 'Two zeros: True'\nassert has_zero_pair([]) is False, 'Empty list: False'\nassert has_zero_pair([1, 2, 3]) is False, 'Only positive numbers: False'\nassert has_zero_pair([-7, 7]) is True, '-7 + 7 = 0'\nimport time as _time, random as _random\n_rng = _random.Random(7)\n_big = _rng.sample(range(1, 10**6), 100000)\n_t0 = _time.perf_counter(); _r = has_zero_pair(_big); _dt = _time.perf_counter() - _t0\nassert _r is False, 'Among positive numbers only there are no pairs'\nassert _dt < 1.0, f'100 000 operations took {_dt:.2f} s: an O(n) solution is needed'\nassert has_zero_pair(_big + [-_big[500]]) is True, 'If a negative value is added at the end, then True'\n"
    }
   },
   {
    "title": "Appear exactly once",
    "prompt": "<p><code>count_singles(xs)</code> must return the number of values that appear in the list <b>exactly once</b>. Use two <code>set</code>: one for values seen once and one for values seen repeatedly. A dictionary (dict) is not needed. O(n), the test uses 100 000 elements.</p>\n<pre><code>count_singles([4, 1, 4, 2, 4, 3, 2]) → 2    # 1 және 3\ncount_singles([])                    → 0</code></pre>",
    "hints": [
     "<code>once</code> — values seen once so far; <code>dup</code> — values seen at least twice.",
     "If a value is in <code>once</code>, move it to <code>dup</code>; if it comes a third time, do nothing."
    ],
    "check": {
     "tests": "\nassert count_singles([4, 1, 4, 2, 4, 3, 2]) == 2, 'count_singles([4, 1, 4, 2, 4, 3, 2]) must return 2 (1 and 3)'\nassert count_singles([]) == 0, 'Empty list: 0'\nassert count_singles([9]) == 1, 'One element: 1'\nassert count_singles([5, 5, 5]) == 0, 'A value seen three times is not single: 0'\nassert count_singles([1, 2, 3]) == 3, 'All different: 3'\nimport time as _time\n_big = list(range(60000)) + list(range(20000))\n_t0 = _time.perf_counter(); _r = count_singles(_big); _dt = _time.perf_counter() - _t0\nassert _r == 40000, f'Expected 40000, got {_r}'\nassert _dt < 1.0, f'Took {_dt:.2f} s: an O(n) solution is needed'\n"
    }
   }
  ]
 },
 "dsa-2": {
  "pr": [
   {
    "title": "Rotate list right",
    "prompt": "<p><code>rotate_right(a, k)</code> must return a <b>new</b> list where the elements are shifted right by <code>k</code> positions: the last elements move to the front. <code>k</code> may be larger than the list length. For an empty list — <code>[]</code>.</p>\n<pre><code>rotate_right([1, 2, 3, 4, 5], 2) → [4, 5, 1, 2, 3]\nrotate_right([1, 2, 3], 4)       → [3, 1, 2]\nrotate_right([], 3)              → []</code></pre>",
    "hints": [
     "First <code>k %= len(a)</code> (check the empty list separately).",
     "Slices: the last <code>k</code> elements + everything else."
    ],
    "check": {
     "tests": "\nassert rotate_right([1, 2, 3, 4, 5], 2) == [4, 5, 1, 2, 3], 'rotate_right([1, 2, 3, 4, 5], 2) must return [4, 5, 1, 2, 3]'\nassert rotate_right([1, 2, 3], 4) == [3, 1, 2], 'k > n: use k % n'\nassert rotate_right([], 3) == [], 'For an empty list []'\nassert rotate_right([1, 2, 3], 0) == [1, 2, 3], 'k = 0: no change'\nassert rotate_right([1, 2, 3], 3) == [1, 2, 3], 'k = n: no change'\n_a = [1, 2, 3]; rotate_right(_a, 1)\nassert _a == [1, 2, 3], 'Do not change the original list, return a new one'\n"
    }
   },
   {
    "title": "Mirror list",
    "prompt": "<p><code>is_mirror(a)</code>: the list reads the same from both sides (<code>a[i] == a[n-1-i]</code>), then return <code>True</code>. Use two pointers: one from the start, one from the end. Do not make slices (<code>a[::-1]</code>).</p>\n<pre><code>is_mirror([1, 2, 3, 2, 1]) → True\nis_mirror([1, 2])          → False\nis_mirror([])              → True</code></pre>",
    "hints": [
     "<code>i = 0</code>, <code>j = len(a) - 1</code>; <code>while i &lt; j</code>.",
     "If you find at least one difference, return <code>False</code> right away."
    ],
    "check": {
     "tests": "\nassert is_mirror([1, 2, 3, 2, 1]) is True, 'is_mirror([1, 2, 3, 2, 1]) must return True'\nassert is_mirror([1, 2]) is False, 'is_mirror([1, 2]) must return False'\nassert is_mirror([]) is True, 'An empty list is a mirror: True'\nassert is_mirror([7]) is True, 'One element: True'\nassert is_mirror([4, 4]) is True, 'is_mirror([4, 4]) must return True'\nassert is_mirror([1, 2, 3, 1]) is False, 'is_mirror([1, 2, 3, 1]) must return False'\n"
    }
   },
   {
    "title": "Even numbers first",
    "prompt": "<p><code>evens_first(a)</code> must change the list <b>in place</b>: all even numbers must come before the odd ones (the order inside the groups does not matter). Use two pointers in O(n), do not create a new list. The function returns nothing.</p>\n<pre><code>a = [3, 1, 2, 4]\nevens_first(a)   # a мысалы [4, 2, 1, 3] немесе [2, 4, 3, 1]</code></pre>",
    "hints": [
     "The left pointer skips an even number, the right pointer skips an odd one.",
     "If both stop on \"wrong\" elements, swap them."
    ],
    "check": {
     "tests": "\ndef _ok(a, orig):\n    if sorted(a) != sorted(orig):\n        return False\n    k = sum(1 for x in orig if x % 2 == 0)\n    return all(x % 2 == 0 for x in a[:k]) and all(x % 2 == 1 for x in a[k:])\nfor _orig in [[3, 1, 2, 4], [], [1], [2], [1, 3, 5], [2, 4, 6], [0, -1, -2, 7, 8], [5, 2, 5, 2, 5, 2]]:\n    _a = list(_orig); _r = evens_first(_a)\n    assert _ok(_a, _orig), f'{_orig} үшін жұптар алдымен тұруы керек, сізде {_a}'\n_a = [3, 1, 2, 4]; _id = id(_a); evens_first(_a)\nassert id(_a) == _id and _a[:2] in ([2, 4], [4, 2]), 'Change the list in place'\n"
    }
   },
   {
    "title": "Sort squares",
    "prompt": "<p>Air temperatures are sorted in increasing order (they may be negative). <code>sorted_squares(a)</code> must return the list of squares sorted in increasing order in O(n): two pointers take the largest absolute value from the ends. Do not use <code>sorted</code>.</p>\n<pre><code>sorted_squares([-4, -1, 0, 3, 10]) → [0, 1, 9, 16, 100]\nsorted_squares([-3, -2])          → [4, 9]</code></pre>",
    "hints": [
     "The largest square is either the leftmost or the rightmost element.",
     "Fill the result from the end: <code>pos</code> from <code>n-1</code> down to 0."
    ],
    "check": {
     "tests": "\nassert sorted_squares([-4, -1, 0, 3, 10]) == [0, 1, 9, 16, 100], 'Expected [0, 1, 9, 16, 100]'\nassert sorted_squares([-3, -2]) == [4, 9], 'Only negative numbers: [4, 9]'\nassert sorted_squares([]) == [], 'Empty list: []'\nassert sorted_squares([5]) == [25], 'One element: [25]'\nassert sorted_squares([-2, 2]) == [4, 4], 'Equal absolute values: [4, 4]'\nassert sorted_squares([1, 2, 3]) == [1, 4, 9], 'Only positive numbers: [1, 4, 9]'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(50):\n    _a = sorted(_rng.randint(-50, 50) for _ in range(_rng.randint(0, 30)))\n    assert sorted_squares(_a) == sorted(x * x for x in _a), f'{_a} үшін қате нәтиже'\n"
    }
   },
   {
    "title": "Intersection of sorted lists",
    "prompt": "<p>The receipt totals of two shops are sorted in increasing order. <code>intersect_sorted(a, b)</code> must return the values that are in both lists: if a value appears in <code>a</code> <code>p</code> times and in <code>b</code> <code>q</code> times, then it appears <code>min(p, q)</code> times in the result. Two pointers, O(n + m).</p>\n<pre><code>intersect_sorted([1, 2, 2, 3, 5], [2, 2, 2, 5, 7]) → [2, 2, 5]\nintersect_sorted([1, 3], [2, 4])                → []</code></pre>",
    "hints": [
     "If the values are equal, add it to the result and move both pointers.",
     "Otherwise, move the pointer on the smaller value."
    ],
    "check": {
     "tests": "\nassert intersect_sorted([1, 2, 2, 3, 5], [2, 2, 2, 5, 7]) == [2, 2, 5], 'Expected [2, 2, 5]'\nassert intersect_sorted([1, 3], [2, 4]) == [], 'No common values: []'\nassert intersect_sorted([], [1, 2]) == [], 'The intersection with an empty list is empty'\nassert intersect_sorted([4, 4, 4], [4]) == [4], 'min(3, 1) = 1 time'\nassert intersect_sorted([1, 2, 3], [1, 2, 3]) == [1, 2, 3], 'Identical lists'\nimport random as _random\nfrom collections import Counter as _C\n_rng = _random.Random(5)\nfor _ in range(40):\n    _a = sorted(_rng.randint(0, 10) for _ in range(_rng.randint(0, 15)))\n    _b = sorted(_rng.randint(0, 10) for _ in range(_rng.randint(0, 15)))\n    _exp = sorted((_C(_a) & _C(_b)).elements())\n    assert intersect_sorted(_a, _b) == _exp, f'{_a} және {_b}: күтілгені {_exp}'\n"
    }
   },
   {
    "title": "Remove a value in place",
    "prompt": "<p><code>remove_value(a, x)</code>: remove from the list <b>in place</b> all elements equal to <code>x</code>. The other elements keep their order and are gathered at the start of the list. Return the new length: <code>k</code>. <code>a[:k]</code> is checked. Use read and write pointers, O(n). Do not create a new list, do not use <code>remove</code>.</p>\n<pre><code>a = [3, 2, 2, 3, 4]\nremove_value(a, 3) → 3     # a[:3] == [2, 2, 4]</code></pre>",
    "hints": [
     "<code>w</code> — the next position to write to. If <code>a[r] != x</code>, then <code>a[w] = a[r]</code>, <code>w += 1</code>."
    ],
    "check": {
     "tests": "\n_a = [3, 2, 2, 3, 4]; _k = remove_value(_a, 3)\nassert _k == 3 and _a[:_k] == [2, 2, 4], f'Expected k=3, [2, 2, 4]; got k={_k}, {_a[:_k] if isinstance(_k, int) else _a}'\n_a = []; assert remove_value(_a, 1) == 0, 'Бос тізім: 0'\n_a = [5, 5, 5]; assert remove_value(_a, 5) == 0, 'Барлығы өшірілсе: 0'\n_a = [1, 2, 3]; _k = remove_value(_a, 9)\nassert _k == 3 and _a == [1, 2, 3], 'If x is not in the list, the list does not change'\n_a = [0, 1, 0, 2, 0, 3]; _k = remove_value(_a, 0)\nassert _k == 3 and _a[:3] == [1, 2, 3], 'The order must be kept: [1, 2, 3]'\n_a = [1, 2, 1]; _id = id(_a); remove_value(_a, 1)\nassert id(_a) == _id and len(_a) == 3, 'Change the list in place: do not create a new list'\n"
    }
   },
   {
    "title": "Container with most water",
    "prompt": "<p>Along a canal stand walls of heights <code>h[i]</code>. Two walls <code>i &lt; j</code> and the bottom form a vessel with capacity <code>(j - i) * min(h[i], h[j])</code>. <code>max_area(h)</code> must return the largest capacity. Two pointers: move the lower wall inward — O(n). If there are fewer than two walls, return 0.</p>\n<pre><code>max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) → 49\nmax_area([1, 1])                      → 1</code></pre>",
    "hints": [
     "At the start <code>i = 0</code>, <code>j = n - 1</code> — the widest vessel.",
     "Moving the tall wall never helps: the width decreases, and the height is limited by the short wall."
    ],
    "check": {
     "tests": "\nassert max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49, 'Expected 49'\nassert max_area([1, 1]) == 1, 'max_area([1, 1]) must return 1'\nassert max_area([5]) == 0, 'One wall: 0'\nassert max_area([]) == 0, 'Empty list: 0'\nassert max_area([4, 3, 2, 1, 4]) == 16, 'Outer walls: 16'\nassert max_area([0, 0, 0]) == 0, 'Zero height: 0'\nimport random as _random, time as _time\n_rng = _random.Random(11)\nfor _ in range(30):\n    _h = [_rng.randint(0, 20) for _ in range(_rng.randint(2, 25))]\n    _exp = max((j - i) * min(_h[i], _h[j]) for i in range(len(_h)) for j in range(i + 1, len(_h)))\n    assert max_area(_h) == _exp, f'{_h} үшін күтілгені {_exp}'\n_big = [_rng.randint(1, 10**4) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_area(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'100 000 walls took {_dt:.2f} s: two pointers in O(n) are needed'\n"
    }
   },
   {
    "title": "Three-number sum",
    "prompt": "<p><code>three_sum(nums)</code>: return all <b>distinct</b> triples whose sum is 0, <code>[a, b, c]</code> (<code>a ≤ b ≤ c</code>). The list of triples must be sorted in increasing order. First sort the list (<code>sorted</code>), then for each <code>a</code> apply two pointers to the remaining elements: O(n²). Skip repeated triples.</p>\n<pre><code>three_sum([-1, 0, 1, 2, -1, -4]) → [[-1, -1, 2], [-1, 0, 1]]\nthree_sum([0, 0, 0, 0])          → [[0, 0, 0]]\nthree_sum([1, 2])                → []</code></pre>",
    "hints": [
     "After fixing <code>a[i]</code>, the rest is the task of finding a pair with sum <code>-a[i]</code> in a sorted list.",
     "To avoid repeats: skip an equal <code>a[i]</code>, and after finding a pair skip equal <code>a[lo]</code> as well."
    ],
    "check": {
     "tests": "\nassert three_sum([-1, 0, 1, 2, -1, -4]) == [[-1, -1, 2], [-1, 0, 1]], 'Expected [[-1, -1, 2], [-1, 0, 1]]'\nassert three_sum([0, 0, 0, 0]) == [[0, 0, 0]], 'Four zeros: only [[0, 0, 0]]'\nassert three_sum([1, 2]) == [], 'Two elements: []'\nassert three_sum([]) == [], 'Empty list: []'\nassert three_sum([1, 2, 3]) == [], 'No triples with sum 0'\nimport random as _random\nfrom itertools import combinations as _comb\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(-6, 6) for _ in range(_rng.randint(0, 12))]\n    _exp = sorted(set(tuple(sorted(c)) for c in _comb(_x, 3) if sum(c) == 0))\n    _exp = [list(c) for c in _exp]\n    assert three_sum(_x) == _exp, f'{_x} үшін күтілгені {_exp}'\n"
    }
   }
  ]
 },
 "dsa-3": {
  "pr": [
   {
    "title": "Words in reverse order",
    "prompt": "<p>Function <code>reverse_words(s)</code> must return the words of the sentence in reverse order. There may be several spaces between words, and also at the start and end: in the result, words must be separated by one space.</p>\n<pre><code>reverse_words('Алматы әдемі қала')   → 'қала әдемі Алматы'\nreverse_words('  сәлем   әлем ')     → 'әлем сәлем'\nreverse_words('   ')                 → ''</code></pre>",
    "hints": [
     "<code>s.split()</code> (without arguments) splits on any whitespace and drops empty parts.",
     "Join them with <code>' '.join(...)</code>."
    ],
    "check": {
     "tests": "\nassert reverse_words('Алматы әдемі қала') == 'қала әдемі Алматы', \"Expected 'қала әдемі Алматы'\"\nassert reverse_words('  сәлем   әлем ') == 'әлем сәлем', \"Remove the extra spaces: 'әлем сәлем'\"\nassert reverse_words('   ') == '', \"Only spaces: ''\"\nassert reverse_words('') == '', \"Empty string: ''\"\nassert reverse_words('жалғыз') == 'жалғыз', 'A single word stays the same'\n"
    }
   },
   {
    "title": "Longest word",
    "prompt": "<p>Function <code>longest_word(s)</code> must return the longest word in the sentence (words are separated by spaces). If several words have the same maximum length, return <b>the first one</b>. If there are no words — <code>''</code>.</p>\n<pre><code>longest_word('Тараз ежелгі қала')  → 'ежелгі'\nlongest_word('ит мен мысық бар')   → 'мысық'\nlongest_word('')                   → ''</code></pre>",
    "hints": [
     "Replace the answer only when you meet a <b>strictly</b> longer word (not <code>&gt;</code>, <code>&gt;=</code>)."
    ],
    "check": {
     "tests": "\nassert longest_word('Тараз ежелгі қала') == 'ежелгі', \"Expected 'ежелгі'\"\nassert longest_word('ит мен мысық бар') == 'мысық', \"Expected 'мысық'\"\nassert longest_word('') == '', \"Empty string: ''\"\nassert longest_word('ақ ой') == 'ақ', \"Same length, the first one: 'ақ'\"\nassert longest_word('  қар  ') == 'қар', \"Do not count spaces: 'қар'\"\n"
    }
   },
   {
    "title": "Acronym from capital letters",
    "prompt": "<p>Function <code>acronym(s)</code> must build a string from the first letter of each word, turned into an uppercase letter (words are separated by spaces, extra spaces are possible).</p>\n<pre><code>acronym('қазақ ұлттық университеті') → 'ҚҰУ'\nacronym('Ұлттық банк')               → 'ҰБ'\nacronym('')                          → ''</code></pre>",
    "hints": [
     "<code>w[0].upper()</code> — the first letter in uppercase.",
     "Collect them with <code>''.join(...)</code>."
    ],
    "check": {
     "tests": "\nassert acronym('қазақ ұлттық университеті') == 'ҚҰУ', \"Expected 'ҚҰУ'\"\nassert acronym('Ұлттық банк') == 'ҰБ', \"Expected 'ҰБ'\"\nassert acronym('') == '', \"Empty string: ''\"\nassert acronym('  еуразия   ұлттық  университеті ') == 'ЕҰУ', \"Extra spaces: 'ЕҰУ'\"\nassert acronym('әл-фараби') == 'Ә', \"One word: 'Ә'\"\n"
    }
   },
   {
    "title": "Decode RLE",
    "prompt": "<p>In the lesson you encoded a string as «character + count». Now the reverse: function <code>rle_decode(code)</code> must restore the encoded string. The count can have several digits (<code>'a12'</code>). Only letters are encoded.</p>\n<pre><code>rle_decode('a3b2c1') → 'aaabbc'\nrle_decode('x12')    → 'xxxxxxxxxxxx'\nrle_decode('')       → ''</code></pre>",
    "hints": [
     "After the character, read the digits until they end: <code>code[j].isdigit()</code>.",
     "Collect the parts into a list and at the end join them with <code>''.join</code>: building the string with <code>+=</code> in a loop is slow."
    ],
    "check": {
     "tests": "\nassert rle_decode('a3b2c1') == 'aaabbc', \"rle_decode('a3b2c1') must return 'aaabbc'\"\nassert rle_decode('x12') == 'x' * 12, 'Multi-digit count: x12 → 12 times x'\nassert rle_decode('') == '', \"Empty string: ''\"\nassert rle_decode('z1') == 'z', \"rle_decode('z1') must return 'z'\"\nassert rle_decode('a2a3') == 'aaaaa', 'The same character may appear again'\nassert rle_decode('q100w1') == 'q' * 100 + 'w', '100 times q, then w'\n"
    }
   },
   {
    "title": "Common prefix",
    "prompt": "<p>Function <code>common_prefix(words)</code> must return the longest prefix common to all words. If the list is empty or there is no common prefix — <code>''</code>.</p>\n<pre><code>common_prefix(['қалалар', 'қалам', 'қала']) → 'қала'\ncommon_prefix(['ит', 'құс'])               → ''\ncommon_prefix(['жол'])                     → 'жол'</code></pre>",
    "hints": [
     "Compare each position of the first word with the same position in the other words.",
     "Stop if the word is shorter (<code>i &gt;= len(w)</code>) or the character differs."
    ],
    "check": {
     "tests": "\nassert common_prefix(['қалалар', 'қалам', 'қала']) == 'қала', \"Expected 'қала'\"\nassert common_prefix(['ит', 'құс']) == '', \"No common prefix: ''\"\nassert common_prefix(['жол']) == 'жол', 'One word: the word itself'\nassert common_prefix([]) == '', \"Empty list: ''\"\nassert common_prefix(['', 'а']) == '', \"If there is an empty word: ''\"\nassert common_prefix(['аб', 'абв', 'абвг']) == 'аб', 'The shortest word limits it: аб'\nassert common_prefix(['тау', 'тау']) == 'тау', 'Identical words: тау'\n"
    }
   },
   {
    "title": "Isomorphic strings",
    "prompt": "<p>Function <code>is_isomorphic(a, b)</code>: if, by replacing each character of <code>a</code> with one character, we can get <code>b</code>, then return <code>True</code>. The replacement must be one-to-one: one character cannot map to two different characters, and two different characters cannot map to one. If the lengths differ, return <code>False</code>.</p>\n<pre><code>is_isomorphic('егер', 'алма')  → False   # е→а, г→л, е→м? жоқ\nis_isomorphic('қала', 'тата')  → False   # қ→т, а→а, л→т: екі таңба т-ға\nis_isomorphic('аппақ', 'ессек') → True</code></pre>",
    "hints": [
     "Keep two dictionaries: <code>a → b</code> and <code>b → a</code>.",
     "For each pair, check whether it contradicts an earlier mapping in either direction."
    ],
    "check": {
     "tests": "\nassert is_isomorphic('егер', 'алма') is False, \"is_isomorphic('егер', 'алма') must return False\"\nassert is_isomorphic('қала', 'тата') is False, \"Two different characters do not map to one: False\"\nassert is_isomorphic('аппақ', 'ессек') is True, \"is_isomorphic('аппақ', 'ессек') must return True\"\nassert is_isomorphic('', '') is True, 'Two empty strings: True'\nassert is_isomorphic('ab', 'a') is False, 'Different lengths: False'\nassert is_isomorphic('paper', 'title') is True, \"is_isomorphic('paper', 'title') must return True\"\nassert is_isomorphic('ab', 'aa') is False, \"is_isomorphic('ab', 'aa') must return False\"\nassert is_isomorphic('aa', 'ab') is False, \"is_isomorphic('aa', 'ab') must return False\"\n"
    }
   },
   {
    "title": "Longest palindromic substring",
    "prompt": "<p>Function <code>longest_palindrome(s)</code> must return the longest palindromic substring (consecutive characters). If there are several, return <b>the leftmost</b> one. Expand outward from each center (a character or the gap between two characters): O(n²) time, O(1) memory. For an empty string — <code>''</code>.</p>\n<pre><code>longest_palindrome('қазақпыз') → 'қазақ'\nlongest_palindrome('abba')     → 'abba'\nlongest_palindrome('abc')      → 'a'</code></pre>",
    "hints": [
     "The center of an odd-length palindrome is one character, of an even-length one — the gap between two characters: in total <code>2n − 1</code> centers.",
     "Expand while <code>s[l] == s[r]</code>; the length is <code>r − l − 1</code>. Update the answer only if it is strictly longer — then the leftmost one stays."
    ],
    "check": {
     "tests": "\nassert longest_palindrome('қазақпыз') == 'қазақ', \"Expected 'қазақ'\"\nassert longest_palindrome('abba') == 'abba', \"Even-length palindrome: 'abba'\"\nassert longest_palindrome('abc') == 'a', \"All characters are different: the leftmost 'a'\"\nassert longest_palindrome('') == '', \"Empty string: ''\"\nassert longest_palindrome('z') == 'z', \"One character: 'z'\"\nassert longest_palindrome('abacdfgdcaba') == 'aba', \"Expected 'aba' (the leftmost)\"\nassert longest_palindrome('cbbd') == 'bb', \"Expected 'bb'\"\nimport random as _random\n_rng = _random.Random(4)\ndef _ref(s):\n    best = ''\n    for i in range(len(s)):\n        for j in range(i + 1, len(s) + 1):\n            if s[i:j] == s[i:j][::-1] and j - i > len(best):\n                best = s[i:j]\n    return best\nfor _ in range(40):\n    _s = ''.join(_rng.choice('аб') for _ in range(_rng.randint(1, 14)))\n    assert longest_palindrome(_s) == _ref(_s), f'{_s!r} үшін күтілгені {_ref(_s)!r}'\n_s = 'а' * 1500\nassert longest_palindrome(_s) == _s, '1500 identical characters: the whole string'\n"
    }
   },
   {
    "title": "Adding numbers as strings",
    "prompt": "<p>A bank system stores very large sums as strings. Function <code>add_strings(a, b)</code> must return the sum of two non-negative integers (digit strings) as a string. Do not apply <code>int()</code> or <code>str()</code> to the whole number: add the digits from the end with two pointers, «carrying over» (carry). A single digit can be converted with <code>ord(ch) - ord('0')</code>.</p>\n<pre><code>add_strings('456', '77') → '533'\nadd_strings('999', '1')  → '1000'\nadd_strings('0', '0')    → '0'</code></pre>",
    "hints": [
     "The pointers <code>i</code> and <code>j</code> start from the end; the loop runs while <code>i &gt;= 0 or j &gt;= 0 or carry</code>.",
     "Get the digit with <code>s % 10</code>, the carry with <code>s // 10</code>; collect the result in reverse order."
    ],
    "check": {
     "tests": "\nassert add_strings('456', '77') == '533', \"add_strings('456', '77') must return '533'\"\nassert add_strings('999', '1') == '1000', \"Final carry: '1000'\"\nassert add_strings('0', '0') == '0', \"add_strings('0', '0') must return '0'\"\nassert add_strings('1', '999') == '1000', 'Different lengths: 1000'\nassert add_strings('12345678901234567890', '98765432109876543210') == '111111111011111111100', 'Large numbers were added incorrectly'\nimport random as _random\n_rng = _random.Random(9)\nfor _ in range(30):\n    _x, _y = _rng.randint(0, 10**30), _rng.randint(0, 10**5)\n    assert add_strings(str(_x), str(_y)) == str(_x + _y), f'{_x} + {_y} қате'\n"
    }
   }
  ]
 },
 "dsa-4": {
  "pr": [
   {
    "title": "Most frequent word",
    "prompt": "<p>In a survey, residents wrote down their favourite city. Function <code>most_common(words)</code> must return the most frequent word; if frequencies are equal, return the smallest one when strings are compared with <code>&lt;</code>. For an empty list — <code>None</code>. Count with a dictionary.</p>\n<pre><code>most_common(['Астана', 'Алматы', 'Астана']) → 'Астана'\nmost_common(['Тараз', 'Ақтау'])            → 'Ақтау'</code></pre>",
    "hints": [
     "<code>cnt[w] = cnt.get(w, 0) + 1</code>.",
     "When choosing the best word, two conditions: the frequency is higher, or the frequency is equal and the word is smaller."
    ],
    "check": {
     "tests": "\nassert most_common(['Астана', 'Алматы', 'Астана']) == 'Астана', \"Expected 'Астана'\"\nassert most_common(['Тараз', 'Ақтау']) == 'Ақтау', \"Same frequency, the alphabetically smaller one: 'Ақтау'\"\nassert most_common([]) is None, 'Empty list: None'\nassert most_common(['Орал']) == 'Орал', \"One word: 'Орал'\"\nassert most_common(['б', 'а', 'б', 'а', 'в']) == 'а', \"Equal frequency (2 and 2): 'а'\"\n"
    }
   },
   {
    "title": "Character frequency",
    "prompt": "<p>Function <code>char_freq(s)</code> must return a dictionary: how many times each character appears in the string. Spaces are not counted. Upper- and lowercase letters are counted as the same (<code>lower()</code>).</p>\n<pre><code>char_freq('Ата ана') → {'а': 4, 'т': 1, 'н': 1}\nchar_freq('')        → {}</code></pre>",
    "hints": [
     "First <code>s.lower()</code>, then count each character.",
     "If <code>ch == ' '</code>, skip it."
    ],
    "check": {
     "tests": "\nassert char_freq('Ата ана') == {'а': 4, 'т': 1, 'н': 1}, \"Expected {'а': 4, 'т': 1, 'н': 1}\"\nassert char_freq('') == {}, 'Empty string: {}'\nassert char_freq('   ') == {}, 'Only spaces: {}'\nassert char_freq('ААа') == {'а': 3}, \"The capital letter is counted together with the lowercase one: {'а': 3}\"\nassert char_freq('a1a!') == {'a': 2, '1': 1, '!': 1}, 'Digits and signs are counted too'\n"
    }
   },
   {
    "title": "Missing goods",
    "prompt": "<p>A shop ordered goods <code>ordered</code>, and <code>delivered</code> arrived (both lists may contain repeats). Function <code>missing(ordered, delivered)</code> must return the list of missing goods, repeating each one as many times as it is short, sorted in <code>sorted</code> order.</p>\n<pre><code>missing(['нан', 'сүт', 'нан', 'май'], ['нан', 'сүт'])\n→ ['май', 'нан']</code></pre>",
    "hints": [
     "Count the order with a dictionary, and decrease the count by 1 for each arrived item.",
     "So that extra arrivals do not make the count negative: <code>max(c, 0)</code>."
    ],
    "check": {
     "tests": "\nassert missing(['нан', 'сүт', 'нан', 'май'], ['нан', 'сүт']) == ['май', 'нан'], \"Expected ['май', 'нан']\"\nassert missing([], ['нан']) == [], 'No order: []'\nassert missing(['шай'], []) == ['шай'], \"If nothing arrived: ['шай']\"\nassert missing(['шай'], ['шай', 'шай', 'кофе']) == [], 'Extra arrivals do not cancel out missing ones: []'\nassert missing(['а', 'а', 'а'], ['а']) == ['а', 'а'], \"Two items are missing: ['а', 'а']\"\n"
    }
   },
   {
    "title": "Number of equal pairs",
    "prompt": "<p>Function <code>equal_pairs(xs)</code> must return the number of pairs of the form <code>i &lt; j</code> and <code>xs[i] == xs[j]</code>. O(n): if a value appears <code>c</code> times, it gives <code>c·(c−1)/2</code> pairs (or, while going through the list, add «how many times I have already seen this value»). The test uses 100 000 elements.</p>\n<pre><code>equal_pairs([1, 2, 3, 1, 1, 3]) → 4\nequal_pairs([5, 6])             → 0</code></pre>",
    "hints": [
     "Each new element forms a pair with every equal element seen before.",
     "First <code>total += seen.get(x, 0)</code>, then increase the counter."
    ],
    "check": {
     "tests": "\nassert equal_pairs([1, 2, 3, 1, 1, 3]) == 4, 'equal_pairs([1, 2, 3, 1, 1, 3]) must return 4'\nassert equal_pairs([5, 6]) == 0, 'No equal elements: 0'\nassert equal_pairs([]) == 0, 'Empty list: 0'\nassert equal_pairs([7, 7, 7, 7]) == 6, 'Four identical elements: 6 pairs'\nimport time as _time\n_big = [i % 10 for i in range(100000)]\n_t0 = _time.perf_counter(); _r = equal_pairs(_big); _dt = _time.perf_counter() - _t0\nassert _r == 10 * (10000 * 9999 // 2), f'Big test: expected {10 * (10000 * 9999 // 2)}, got {_r}'\nassert _dt < 1.0, f'Took {_dt:.2f} s: an O(n) solution is needed'\n"
    }
   },
   {
    "title": "Group by length",
    "prompt": "<p>Function <code>group_by_len(words)</code> must group the words by length: the key is the length, the value is the words of that length in <b>order of appearance</b> (if a word repeats, it repeats in the group). Return a dictionary.</p>\n<pre><code>group_by_len(['ат', 'түйе', 'ит', 'қой', 'ат'])\n→ {2: ['ат', 'ит', 'ат'], 4: ['түйе'], 3: ['қой']}</code></pre>",
    "hints": [
     "<code>groups.setdefault(len(w), []).append(w)</code> — in one line."
    ],
    "check": {
     "tests": "\nassert group_by_len(['ат', 'түйе', 'ит', 'қой', 'ат']) == {2: ['ат', 'ит', 'ат'], 4: ['түйе'], 3: ['қой']}, 'The groups are wrong'\nassert group_by_len([]) == {}, 'Empty list: {}'\nassert group_by_len(['']) == {0: ['']}, \"The length of an empty word is 0: {0: ['']}\"\nassert group_by_len(['бір', 'екі', 'үш']) == {3: ['бір', 'екі'], 2: ['үш']}, 'The order must be kept'\n"
    }
   },
   {
    "title": "Compose a notice",
    "prompt": "<p>We build a notice from newspaper clippings. Function <code>can_build(note, magazine)</code>: if every character of <code>note</code> (except spaces) can be taken from the characters of <code>magazine</code>, then return <code>True</code>. Each character may be used only once. Count with a dictionary, O(n + m).</p>\n<pre><code>can_build('ақ', 'қара')    → True\ncan_build('аа', 'ақ')      → False\ncan_build('', 'кез келген') → True</code></pre>",
    "hints": [
     "Count the characters of <code>magazine</code>.",
     "For each character of the notice, decrease its count; if it becomes 0 — return <code>False</code>."
    ],
    "check": {
     "tests": "\nassert can_build('ақ', 'қара') is True, \"can_build('ақ', 'қара') must return True\"\nassert can_build('аа', 'ақ') is False, \"Two 'а' are needed, but there is only one: False\"\nassert can_build('', 'кез келген') is True, 'Empty notice: True'\nassert can_build('а а', 'аа') is True, 'Spaces are not counted: True'\nassert can_build('б', '') is False, 'Empty newspaper: False'\nassert can_build('Ақ', 'ақ') is False, 'Uppercase and lowercase letters are different characters'\n"
    }
   },
   {
    "title": "Longest run of consecutive numbers",
    "prompt": "<p>The car numbers of a train are given in random order. Function <code>longest_run(nums)</code> must return the length of the longest run of consecutive numbers (<code>x, x+1, x+2, ...</code>). Do not sort; use <code>set</code> for an O(n) solution: count only from the <b>start</b> of a run (if <code>x − 1</code> is absent). The test uses 100 000 elements.</p>\n<pre><code>longest_run([100, 4, 200, 1, 3, 2]) → 4    # 1, 2, 3, 4\nlongest_run([])                      → 0\nlongest_run([7, 7, 7])               → 1</code></pre>",
    "hints": [
     "Put all values into <code>set</code>.",
     "Count to the right from <code>x</code> only when <code>x − 1</code> is not in the set: each element is visited only once."
    ],
    "check": {
     "tests": "\nassert longest_run([100, 4, 200, 1, 3, 2]) == 4, 'Expected 4 (1, 2, 3, 4)'\nassert longest_run([]) == 0, 'Empty list: 0'\nassert longest_run([7, 7, 7]) == 1, 'Repeats do not extend the run: 1'\nassert longest_run([-1, 0, 1]) == 3, 'Negative numbers: 3'\nassert longest_run([10, 5]) == 1, 'No neighbouring number: 1'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(30):\n    _a = [_rng.randint(0, 25) for _ in range(_rng.randint(0, 20))]\n    _s = sorted(set(_a)); _best = 0; _cur = 0\n    for _i, _v in enumerate(_s):\n        _cur = _cur + 1 if _i and _s[_i - 1] == _v - 1 else 1\n        _best = max(_best, _cur)\n    assert longest_run(_a) == _best, f'{_a} үшін күтілгені {_best}'\n_big = list(range(100000)); _rng.shuffle(_big)\n_t0 = _time.perf_counter(); _r = longest_run(_big); _dt = _time.perf_counter() - _t0\nassert _r == 100000 and _dt < 1.5, f'Shuffled 0..99999: must be 100000 ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Zero from four lists",
    "prompt": "<p>The daily profit/loss lists of four branches <code>a, b, c, d</code> (of equal length, <code>n ≤ 300</code>). Function <code>four_sum_count(a, b, c, d)</code> must return the number of quadruples <code>(i, j, k, l)</code> whose sum is 0 when one element is taken from each list. O(n⁴) will not pass: count the sums <code>a[i] + b[j]</code> in a dictionary and for <code>c[k] + d[l]</code> look up <code>−(c[k] + d[l])</code> — O(n²).</p>\n<pre><code>four_sum_count([1, 2], [-2, -1], [-1, 2], [0, 2]) → 2</code></pre>",
    "hints": [
     "Split the problem into two halves: <code>a + b</code> and <code>c + d</code>.",
     "Count the sums of the first half in the dictionary <code>{қосынды: саны}</code>."
    ],
    "check": {
     "tests": "\nassert four_sum_count([1, 2], [-2, -1], [-1, 2], [0, 2]) == 2, 'Expected 2'\nassert four_sum_count([0], [0], [0], [0]) == 1, 'All zeros: 1'\nassert four_sum_count([], [], [], []) == 0, 'Empty lists: 0'\nassert four_sum_count([1], [1], [1], [1]) == 0, 'Sum 4: 0'\nimport random as _random, time as _time\n_rng = _random.Random(8)\n_s = [[_rng.randint(-3, 3) for _ in range(6)] for _ in range(4)]\n_exp = sum(1 for x in _s[0] for y in _s[1] for z in _s[2] for w in _s[3] if x + y + z + w == 0)\nassert four_sum_count(*_s) == _exp, f'Random test: expected {_exp}'\n_big = [[_rng.randint(-1000, 1000) for _ in range(300)] for _ in range(4)]\n_t0 = _time.perf_counter(); four_sum_count(*_big); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'For n = 300 it took {_dt:.2f} s: an O(n²) solution is needed'\n"
    }
   }
  ]
 },
 "dsa-5": {
  "pr": [
   {
    "title": "Reverse a string with a stack",
    "prompt": "<p>Function <code>reverse_stack(s)</code> must reverse the string using a stack: put all characters into a list as <code>append</code>, then take them out via <code>pop</code>. Do not use the slices <code>[::-1]</code> and <code>reversed</code>.</p>\n<pre><code>reverse_stack('Абай') → 'йабА'\nreverse_stack('')     → ''</code></pre>",
    "hints": [
     "The last element pushed onto the stack comes out first (LIFO)."
    ],
    "check": {
     "tests": "\nassert reverse_stack('Абай') == 'йабА', \"reverse_stack('Абай') must return 'йабА'\"\nassert reverse_stack('') == '', \"Empty string: ''\"\nassert reverse_stack('x') == 'x', 'A single character stays the same'\nassert reverse_stack('ab cd') == 'dc ba', 'A space is reversed too'\n"
    }
   },
   {
    "title": "Backspace key",
    "prompt": "<p>A user types text: <code>'#'</code> is the key that deletes the previous character (if there is nothing to delete, nothing happens). Function <code>apply_backspace(s)</code> must return the final text. Use a stack.</p>\n<pre><code>apply_backspace('ab#c')  → 'ac'\napply_backspace('a##b')  → 'b'\napply_backspace('###')   → ''</code></pre>",
    "hints": [
     "If <code>'#'</code> comes and the stack is not empty — <code>pop()</code>, otherwise push the character: <code>append</code>."
    ],
    "check": {
     "tests": "\nassert apply_backspace('ab#c') == 'ac', \"apply_backspace('ab#c') must return 'ac'\"\nassert apply_backspace('a##b') == 'b', \"Deleting from an empty stack does nothing: 'b'\"\nassert apply_backspace('###') == '', \"Only deletions: ''\"\nassert apply_backspace('') == '', \"Empty string: ''\"\nassert apply_backspace('сәлем') == 'сәлем', 'If there is nothing to delete, nothing changes'\nassert apply_backspace('ab##cd#') == 'c', \"apply_backspace('ab##cd#') must return 'c'\"\n"
    }
   },
   {
    "title": "Bracket nesting depth",
    "prompt": "<p>A valid string is given that consists only of the brackets <code>(</code> and <code>)</code> (other characters may also appear; ignore them). Function <code>max_depth(s)</code> must return the maximum nesting depth of the brackets.</p>\n<pre><code>max_depth('(1+(2*3)+((8)/4))+1') → 3\nmax_depth('()()')                → 1\nmax_depth('abc')                 → 0</code></pre>",
    "hints": [
     "You need only the size of the stack, not the stack itself: a counter is enough.",
     "<code>(</code> — depth +1, <code>)</code> — −1; keep the maximum."
    ],
    "check": {
     "tests": "\nassert max_depth('(1+(2*3)+((8)/4))+1') == 3, 'Expected 3'\nassert max_depth('()()') == 1, \"max_depth('()()') must return 1\"\nassert max_depth('abc') == 0, 'No brackets: 0'\nassert max_depth('') == 0, 'Empty string: 0'\nassert max_depth('((()))') == 3, \"max_depth('((()))') must return 3\"\nassert max_depth('(' * 500 + ')' * 500) == 500, '500 levels'\n"
    }
   },
   {
    "title": "Hot potato",
    "prompt": "<p>Children stand in a circle (in the order <code>names</code>). Counting starts with the first child, every <code>k</code>-th child is out of the game, and counting continues from the next child. Function <code>last_child(names, k)</code> must return the name of the last remaining child. Use <code>collections.deque</code> and <code>rotate</code> or <code>popleft</code>/<code>append</code>.</p>\n<pre><code>last_child(['Әли', 'Бота', 'Дана', 'Ерлан'], 2) → 'Әли'\n# Бота шығады → [Дана, Ерлан, Әли] → Ерлан шығады → [Әли, Дана] → Дана шығады\nlast_child(['Жан'], 5)                         → 'Жан'</code></pre>",
    "hints": [
     "<code>k − 1</code> — take the child from the front and put them at the back; remove child <code>k</code> with <code>popleft()</code>.",
     "Repeat until one child is left in the queue."
    ],
    "check": {
     "tests": "\nassert last_child(['Әли', 'Бота', 'Дана', 'Ерлан'], 2) == 'Әли', \"Expected 'Әли'\"\nassert last_child(['Жан'], 5) == 'Жан', 'One child: that child'\nassert last_child(['а', 'б', 'в'], 1) == 'в', 'k = 1: they leave in order, the last one remains'\ndef _ref(n, k):\n    r = 0\n    for m in range(2, n + 1):\n        r = (r + k) % m\n    return r\nfor _n in range(1, 12):\n    for _k in range(1, 6):\n        _names = [f'бала{i}' for i in range(_n)]\n        assert last_child(_names, _k) == _names[_ref(_n, _k)], f'n={_n}, k={_k} үшін күтілгені {_names[_ref(_n, _k)]}'\n"
    }
   },
   {
    "title": "Simplify a file path",
    "prompt": "<p>A Unix file path is given. Function <code>simplify_path(path)</code> must simplify it: <code>'.'</code> is the current folder (removed), <code>'..'</code> is one level up (we do not go above the root), several <code>'/'</code> in a row count as one <code>'/'</code>. The result starts with <code>'/'</code> and does not end with <code>'/'</code> (except the root itself). Use a stack.</p>\n<pre><code>simplify_path('/home//user/./docs/../photos/') → '/home/user/photos'\nsimplify_path('/../')                          → '/'\nsimplify_path('/a/b/../../c')                  → '/c'</code></pre>",
    "hints": [
     "<code>path.split('/')</code> also gives empty parts — skip them.",
     "<code>'..'</code> — pop from the stack <code>pop</code> (if it is not empty), any other name — <code>append</code>."
    ],
    "check": {
     "tests": "\nassert simplify_path('/home//user/./docs/../photos/') == '/home/user/photos', \"Expected '/home/user/photos'\"\nassert simplify_path('/../') == '/', \"We do not go above the root: '/'\"\nassert simplify_path('/a/b/../../c') == '/c', \"Expected '/c'\"\nassert simplify_path('/') == '/', \"Root: '/'\"\nassert simplify_path('/...') == '/...', \"'...' is an ordinary folder name\"\nassert simplify_path('/a/./b/./') == '/a/b', \"Expected '/a/b'\"\n"
    }
   },
   {
    "title": "Remove adjacent pairs",
    "prompt": "<p>Function <code>remove_pairs(s)</code>: in the string we remove two identical characters standing next to each other; if removing them creates a new pair, we remove that too. We keep going until no pairs are left. Return the final string. Use a stack, O(n).</p>\n<pre><code>remove_pairs('abbaca') → 'ca'     # bb жойылады → aaca → aa жойылады → ca\nremove_pairs('aabb')   → ''\nremove_pairs('abc')    → 'abc'</code></pre>",
    "hints": [
     "If the top of the stack equals the new character — <code>pop()</code>, otherwise <code>append</code>."
    ],
    "check": {
     "tests": "\nassert remove_pairs('abbaca') == 'ca', \"remove_pairs('abbaca') must return 'ca'\"\nassert remove_pairs('aabb') == '', \"Everything is removed: ''\"\nassert remove_pairs('abc') == 'abc', 'No pairs: unchanged'\nassert remove_pairs('') == '', \"Empty string: ''\"\nassert remove_pairs('aaa') == 'a', \"Of three identical characters one remains: 'a'\"\nassert remove_pairs('abccba') == '', 'Removing the chain: empty string'\nimport time as _time\n_t0 = _time.perf_counter(); _r = remove_pairs('ab' * 50000 + 'ba' * 50000); _dt = _time.perf_counter() - _t0\nassert _r == '' and _dt < 1.0, f\"Big test: '' expected ({_dt:.2f} s), a stack in O(n) is needed\"\n"
    }
   },
   {
    "title": "Stack with minimum",
    "prompt": "<p>Write a class <code>MinStack</code> with the methods <code>push(x)</code>, <code>pop()</code> (removes the top element and returns it), <code>top()</code>, <code>get_min()</code> — all O(1). If the stack is empty, <code>pop</code>, <code>top</code>, <code>get_min</code> must return <code>None</code>. Tip: store with each element «the minimum at that moment».</p>\n<pre><code>s = MinStack()\ns.push(5); s.push(2); s.push(7)\ns.get_min() → 2\ns.pop()     → 7\ns.pop()     → 2\ns.get_min() → 5</code></pre>",
    "hints": [
     "Push a pair <code>(x, ағымдағы_минимум)</code> onto the stack.",
     "New minimum: <code>min(x, self.st[-1][1])</code>; on pop the previous minimum comes back by itself."
    ],
    "check": {
     "tests": "\n_s = MinStack()\nassert _s.get_min() is None and _s.top() is None and _s.pop() is None, 'On an empty stack return None'\n_s.push(5); _s.push(2); _s.push(7)\nassert _s.get_min() == 2, 'After push 5, 2, 7 the minimum is 2'\nassert _s.top() == 7, 'top() must return 7'\nassert _s.pop() == 7 and _s.pop() == 2, 'pop() must return 7, then 2'\nassert _s.get_min() == 5, 'After popping 2 the minimum is 5'\n_s.push(5); _s.push(5)\nassert _s.pop() == 5 and _s.get_min() == 5, 'Repeated minimum: after popping one 5 the minimum is still 5'\n_s2 = MinStack()\nfor _x in [3, -1, 4, -1, 5]:\n    _s2.push(_x)\n_exp = [-1, -1, -1, -1, 3]\nfor _e in _exp:\n    assert _s2.get_min() == _e, f'Кезекпен pop жасағанда минимумдар {_exp} болуы керек'\n    _s2.pop()\nassert _s2.get_min() is None, 'After popping everything: None'\nimport time as _time\n_s3 = MinStack(); _t0 = _time.perf_counter()\nfor _i in range(50000):\n    _s3.push(50000 - _i); _s3.get_min()\nfor _i in range(50000):\n    _s3.get_min(); _s3.pop()\nassert _time.perf_counter() - _t0 < 1.5, 'Operations must be O(1) (min(...) must not scan the whole stack)'\n"
    }
   },
   {
    "title": "Decode a string",
    "prompt": "<p>Function <code>decode(s)</code>: the notation <code>k[мәтін]</code> means that the text is repeated <code>k</code> times; the brackets may be nested, and <code>k</code> may have several digits. Decode the string and return the result. Two stacks: one for numbers and one for «the text collected up to this bracket».</p>\n<pre><code>decode('3[a]2[bc]')   → 'aaabcbc'\ndecode('2[a2[c]]')    → 'accacc'\ndecode('қаз10[а]')    → 'қаз' + 'а' * 10</code></pre>",
    "hints": [
     "Collect the digits with <code>k = k * 10 + цифр</code>.",
     "<code>'['</code> — push <code>k</code> and the current text onto the stack and start anew; <code>']'</code> — repeat the current text and append it to the previous text."
    ],
    "check": {
     "tests": "\nassert decode('3[a]2[bc]') == 'aaabcbc', \"decode('3[a]2[bc]') must return 'aaabcbc'\"\nassert decode('2[a2[c]]') == 'accacc', \"Nested brackets: 'accacc'\"\nassert decode('қаз10[а]') == 'қаз' + 'а' * 10, 'Multi-digit number: 10'\nassert decode('') == '', \"Empty string: ''\"\nassert decode('abc') == 'abc', 'No brackets: unchanged'\nassert decode('2[ab]cd3[e]') == 'ababcdeee', \"Expected 'ababcdeee'\"\nassert decode('2[2[2[x]]]') == 'x' * 8, \"Three levels: 8 times 'x'\"\nassert decode('1[]a') == 'a', \"Empty brackets: 'a'\"\n"
    }
   }
  ]
 },
 "dsa-6": {
  "pr": [
   {
    "title": "Length of a list",
    "prompt": "<p>Class <code>Node</code> is given. Function <code>length(head)</code> must return the number of nodes in a linked list. An empty list (<code>None</code>) — 0.</p>\n<pre><code>length(Node(1, Node(2, Node(3)))) → 3\nlength(None)                      → 0</code></pre>",
    "hints": [
     "In the loop <code>while head:</code> increase the counter and move on to <code>head = head.next</code>."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert length(_mk([1, 2, 3])) == 3, 'A list of three nodes: 3'\nassert length(None) == 0, 'Empty list: 0'\nassert length(_mk([9])) == 1, 'One node: 1'\nassert length(_mk(list(range(5000)))) == 5000, '5000 nodes'\n"
    }
   },
   {
    "title": "Value of the k-th node",
    "prompt": "<p>Function <code>value_at(head, k)</code> must return the value of the node with number <code>k</code> (counting from 0). If there is no such node (<code>k</code> is too large or negative) — <code>None</code>.</p>\n<pre><code>value_at(1 → 5 → 9, 1) → 5\nvalue_at(1 → 5 → 9, 3) → None</code></pre>",
    "hints": [
     "Do <code>head = head.next</code> <code>k</code> times; if you meet <code>None</code> on the way, stop.",
     "Check a negative <code>k</code> separately."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 5, 9])\nassert value_at(_h, 0) == 1, 'value_at(..., 0): the first value is 1'\nassert value_at(_h, 1) == 5, 'value_at(..., 1) must return 5'\nassert value_at(_h, 2) == 9, 'value_at(..., 2) must return 9'\nassert value_at(_h, 3) is None, 'No node: None'\nassert value_at(_h, -1) is None, 'Negative k: None'\nassert value_at(None, 0) is None, 'Empty list: None'\nassert value_at(_mk([0]), 0) == 0, 'The value may be 0: not None, return 0'\n"
    }
   },
   {
    "title": "Middle of a list",
    "prompt": "<p>Function <code>middle(head)</code> must return the middle node of the list (the node itself). If the number of nodes is even — the <b>second</b> of the two middle ones. Use two pointers with different speeds: <code>slow</code> makes one step, <code>fast</code> makes two steps; one pass. For an empty list — <code>None</code>.</p>\n<pre><code>1 → 2 → 3 → 4 → 5   ⇒  3-түйін\n1 → 2 → 3 → 4       ⇒  3-түйін</code></pre>",
    "hints": [
     "<code>while fast and fast.next:</code> — when fast reaches the end, slow is in the middle."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 2, 3, 4, 5]); _m = middle(_h)\nassert _m is _h.next.next, 'In a list of 5 nodes the middle is the third node (value 3)'\n_h = _mk([1, 2, 3, 4])\nassert middle(_h) is _h.next.next, 'With an even count, the second middle: the node with value 3'\nassert middle(None) is None, 'Empty list: None'\n_h = _mk([7]); assert middle(_h) is _h, 'Бір түйін: өзі'\n_h = _mk([1, 2]); assert middle(_h) is _h.next, 'Екі түйін: екіншісі'\n"
    }
   },
   {
    "title": "Remove by value",
    "prompt": "<p>Remove from the list all nodes whose <code>remove_all(head, x)</code> equals <code>x</code>, and return the new head (the head itself may be removed too). Tip: <code>dummy = Node(0, head)</code> — a dummy head node simplifies the edge cases.</p>\n<pre><code>remove_all(1 → 2 → 6 → 3 → 6, 6) → 1 → 2 → 3\nremove_all(7 → 7 → 7, 7)         → None</code></pre>",
    "hints": [
     "If <code>cur.next.val == x</code>, then <code>cur.next = cur.next.next</code> (cur stays in place).",
     "At the end return <code>dummy.next</code>."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(remove_all(_mk([1, 2, 6, 3, 6]), 6)) == [1, 2, 3], 'Expected [1, 2, 3]'\nassert remove_all(_mk([7, 7, 7]), 7) is None, 'If everything is removed: None'\nassert remove_all(None, 1) is None, 'Empty list: None'\nassert _tl(remove_all(_mk([5, 1, 5]), 5)) == [1], 'The head and the tail are removed: [1]'\nassert _tl(remove_all(_mk([1, 2]), 9)) == [1, 2], 'No x: unchanged'\n_h = _mk([1, 2, 3]); _second = _h.next\nassert remove_all(_h, 1) is _second, 'Do not create a new node: the former second node becomes the new head'\n"
    }
   },
   {
    "title": "k-th node from the end",
    "prompt": "<p>Function <code>kth_from_end(head, k)</code> must return the <code>k</code>-th node from the end of the list (<code>k = 1</code> is the last node). In one pass: first move <code>fast</code> forward by <code>k</code> steps, then move both pointers together. If <code>k</code> is larger than the list length or <code>k &lt; 1</code> — return <code>None</code>.</p>\n<pre><code>kth_from_end(1 → 2 → 3 → 4, 1) → 4-түйін\nkth_from_end(1 → 2 → 3 → 4, 4) → 1-түйін\nkth_from_end(1 → 2, 3)         → None</code></pre>",
    "hints": [
     "If <code>fast</code> is ahead by <code>k</code> steps, then when it reaches <code>None</code>, <code>slow</code> is exactly on the needed node.",
     "If <code>fast</code> becomes <code>None</code> before its time, then <code>k</code> is too large."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\n_h = _mk([1, 2, 3, 4])\nassert kth_from_end(_h, 1) is _h.next.next.next, 'k = 1: the last node (4)'\nassert kth_from_end(_h, 4) is _h, 'k = 4: the first node'\nassert kth_from_end(_h, 2).val == 3, 'k = 2: the node with value 3'\nassert kth_from_end(_mk([1, 2]), 3) is None, 'k is larger than the list length: None'\nassert kth_from_end(None, 1) is None, 'Empty list: None'\nassert kth_from_end(_h, 0) is None, 'k = 0: None'\n"
    }
   },
   {
    "title": "Remove duplicates from a sorted list",
    "prompt": "<p>The values of the list are sorted in increasing order. Function <code>dedup(head)</code> must keep only the first node of each value and return the head. Do not create new nodes, O(n).</p>\n<pre><code>dedup(1 → 1 → 2 → 3 → 3 → 3) → 1 → 2 → 3</code></pre>",
    "hints": [
     "The list is sorted: equal values are next to each other.",
     "If <code>cur.next.val == cur.val</code>, skip the next node."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(dedup(_mk([1, 1, 2, 3, 3, 3]))) == [1, 2, 3], 'Expected [1, 2, 3]'\nassert dedup(None) is None, 'Empty list: None'\nassert _tl(dedup(_mk([4, 4, 4]))) == [4], 'All identical: [4]'\nassert _tl(dedup(_mk([1, 2, 3]))) == [1, 2, 3], 'No repeats: unchanged'\n_h = _mk([1, 1, 2]); _last = _h.next.next\ndedup(_h)\nassert _h.next is _last, 'Use the existing nodes, do not create new ones'\n"
    }
   },
   {
    "title": "Palindrome list",
    "prompt": "<p><code>is_palindrome_list(head)</code>: the values of the list read the same from both sides, then <code>True</code>. Extra memory O(1): do not copy the values into a Python list. Find the middle (slow/fast), reverse the second half in place and compare the two halves.</p>\n<pre><code>1 → 2 → 2 → 1   ⇒ True\n1 → 2 → 3       ⇒ False</code></pre>",
    "hints": [
     "Finding the middle: <code>while fast and fast.next</code>.",
     "Reverse the second half, starting from the middle (<code>reverse_list</code> from the lesson), then walk side by side from the start and from the start of the reversed half."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert is_palindrome_list(_mk([1, 2, 2, 1])) is True, '1 → 2 → 2 → 1: True'\nassert is_palindrome_list(_mk([1, 2, 3])) is False, '1 → 2 → 3: False'\nassert is_palindrome_list(None) is True, 'Empty list: True'\nassert is_palindrome_list(_mk([5])) is True, 'One node: True'\nassert is_palindrome_list(_mk([1, 2, 1])) is True, '1 → 2 → 1: True'\nassert is_palindrome_list(_mk([1, 2])) is False, '1 → 2: False'\nassert is_palindrome_list(_mk([1, 1, 2, 1])) is False, '1 → 1 → 2 → 1: False'\nimport random as _random\n_rng = _random.Random(6)\nfor _ in range(40):\n    _v = [_rng.randint(0, 2) for _ in range(_rng.randint(0, 9))]\n    assert is_palindrome_list(_mk(_v)) == (_v == _v[::-1]), f'{_v} үшін {_v == _v[::-1]} күтілді'\n"
    }
   },
   {
    "title": "Adding two numbers as lists",
    "prompt": "<p>Two non-negative numbers are given as lists: the digits go in <b>reverse order</b> (the first node is the units). Function <code>add_lists(a, b)</code> must return the sum as a new list in the same format. The lists may have different lengths, and a carry may remain at the end. Do not turn the number into <code>int</code> — add the digits one by one.</p>\n<pre><code>(2 → 4 → 3) + (5 → 6 → 4) = 7 → 0 → 8     # 342 + 465 = 807\n(9 → 9) + (1)             = 0 → 0 → 1     # 99 + 1 = 100</code></pre>",
    "hints": [
     "<code>while a or b or carry:</code> — do not forget the last carry.",
     "Starting from the node <code>dummy</code>, build a new list via <code>tail.next = Node(s % 10)</code>."
    ],
    "check": {
     "tests": "\ndef _mk(vals):\n    h = None\n    for v in reversed(vals):\n        h = Node(v, h)\n    return h\ndef _tl(h):\n    out = []\n    while h:\n        out.append(h.val); h = h.next\n        if len(out) > 10000: raise AssertionError('Тізімде цикл пайда болды')\n    return out\n\nassert _tl(add_lists(_mk([2, 4, 3]), _mk([5, 6, 4]))) == [7, 0, 8], '342 + 465 = 807: [7, 0, 8]'\nassert _tl(add_lists(_mk([9, 9]), _mk([1]))) == [0, 0, 1], '99 + 1 = 100: [0, 0, 1]'\nassert _tl(add_lists(_mk([0]), _mk([0]))) == [0], '0 + 0 = 0: [0]'\nassert _tl(add_lists(_mk([5]), _mk([5]))) == [0, 1], '5 + 5 = 10: [0, 1]'\nimport random as _random\n_rng = _random.Random(12)\ndef _digits(n):\n    return [int(c) for c in reversed(str(n))]\nfor _ in range(30):\n    _x, _y = _rng.randint(0, 10**20), _rng.randint(0, 10**8)\n    assert _tl(add_lists(_mk(_digits(_x)), _mk(_digits(_y)))) == _digits(_x + _y), f'{_x} + {_y} қате қосылды'\n"
    }
   }
  ]
 },
 "dsa-7": {
  "pr": [
   {
    "title": "Fast power",
    "prompt": "<p>Function <code>power(a, n)</code> must compute <code>a<sup>n</sup></code> (<code>n ≥ 0</code> is an integer) recursively, without using <code>**</code> and <code>pow</code>. Fast method: <code>a<sup>n</sup> = (a<sup>n/2</sup>)²</code>; for odd <code>n</code> multiply once more by <code>a</code> — the recursion depth is O(log n).</p>\n<pre><code>power(2, 10) → 1024\npower(5, 0)  → 1\npower(3, 5)  → 243</code></pre>",
    "hints": [
     "Base case: <code>n == 0</code> → 1.",
     "Call <code>half = power(a, n // 2)</code> only once."
    ],
    "check": {
     "tests": "\nassert power(2, 10) == 1024, 'power(2, 10) must return 1024'\nassert power(5, 0) == 1, 'Zero power: 1'\nassert power(3, 5) == 243, 'power(3, 5) must return 243'\nassert power(0, 0) == 1, 'We agree that power(0, 0) is 1'\nassert power(-2, 3) == -8, 'power(-2, 3) must return -8'\nassert power(1, 10**6) == 1, 'For n = 10^6 the recursion depth must be log n'\nassert power(2, 3000) == 2 ** 3000, 'power(2, 3000) is computed incorrectly'\n"
    }
   },
   {
    "title": "Sum of nested lists",
    "prompt": "<p>In a storeroom, boxes contain boxes: a list consists of numbers and other lists. Function <code>nested_sum(items)</code> must return recursively the sum of all numbers at all levels. Check whether an element is a list using <code>isinstance(x, list)</code>.</p>\n<pre><code>nested_sum([1, [2, [3, 4]], 5]) → 15\nnested_sum([[], [[]]])          → 0</code></pre>",
    "hints": [
     "When you meet a list, call <code>nested_sum</code> on it again."
    ],
    "check": {
     "tests": "\nassert nested_sum([1, [2, [3, 4]], 5]) == 15, 'Expected 15'\nassert nested_sum([[], [[]]]) == 0, 'Empty boxes: 0'\nassert nested_sum([]) == 0, 'Empty list: 0'\nassert nested_sum([7]) == 7, 'One number: 7'\nassert nested_sum([[[[[-3]]]], 3]) == 0, 'Deeply nested list: 0'\n"
    }
   },
   {
    "title": "Reverse a string recursively",
    "prompt": "<p>Function <code>reverse_rec(s)</code> must reverse a string recursively: the reverse of an empty string is an empty string; otherwise <code>reverse_rec(s[1:]) + s[0]</code>. Do not use a loop, <code>[::-1]</code> or <code>reversed</code>. The string length does not exceed 500.</p>\n<pre><code>reverse_rec('Қазақ') → 'қазаҚ'\nreverse_rec('')      → ''</code></pre>",
    "hints": [
     "Base case: <code>s == ''</code>.",
     "The first character goes to the end of the result."
    ],
    "check": {
     "tests": "\nassert reverse_rec('Қазақ') == 'қазаҚ', \"reverse_rec('Қазақ') must return 'қазаҚ'\"\nassert reverse_rec('') == '', \"Empty string: ''\"\nassert reverse_rec('a') == 'a', 'One character'\nassert reverse_rec('ab') == 'ba', \"reverse_rec('ab') must return 'ba'\"\nassert reverse_rec('x' * 300 + 'y') == 'y' + 'x' * 300, 'A long string is reversed incorrectly'\n"
    }
   },
   {
    "title": "All permutations",
    "prompt": "<p>Function <code>permutations(items)</code> must build all permutations of distinct elements using backtracking (do not use <code>itertools</code>). The result is a list of lists. Order: <code>items</code> are chosen in the given order (so with sorted input the result comes out in lexicographic order).</p>\n<pre><code>permutations([1, 2, 3])\n→ [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]\npermutations([]) → [[]]</code></pre>",
    "hints": [
     "The list <code>used</code> marks which elements are already on the path.",
     "When the length is complete, save a copy of <code>path[:]</code>; when backtracking — <code>pop()</code> and <code>used[i] = False</code>."
    ],
    "check": {
     "tests": "\nassert permutations([1, 2, 3]) == [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], 'The order or the content is wrong'\nassert permutations([]) == [[]], 'An empty list has one permutation: [[]]'\nassert permutations(['а']) == [['а']], \"One element: [['а']]\"\n_p = permutations(['ит', 'құс', 'ат', 'бие'])\nassert len(_p) == 24 and len(set(map(tuple, _p))) == 24, '4 elements give 24 different permutations'\nassert _p[0] == ['ит', 'құс', 'ат', 'бие'] and _p[-1] == ['бие', 'ат', 'құс', 'ит'], 'The elements must be chosen in the given order'\nassert len(permutations(list(range(7)))) == 5040, '7! = 5040'\n"
    }
   },
   {
    "title": "Groups of k elements",
    "prompt": "<p>In a class there are students with numbers <code>1..n</code>. Function <code>combinations(n, k)</code> must return all groups of <code>k</code> students among them: each group in increasing order, the groups in lexicographic order. Backtracking: choose the next number greater than the previous one.</p>\n<pre><code>combinations(4, 2) → [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]\ncombinations(3, 0) → [[]]\ncombinations(2, 3) → []</code></pre>",
    "hints": [
     "<code>bt(start)</code>: choose the next element from the range <code>start..n</code>.",
     "If there are not enough elements left, you can prune the branch: <code>x ≤ n − (k − len(path)) + 1</code>."
    ],
    "check": {
     "tests": "\nassert combinations(4, 2) == [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]], 'Expected 6 groups in lexicographic order'\nassert combinations(3, 0) == [[]], 'k = 0: [[]]'\nassert combinations(2, 3) == [], 'k > n: []'\nassert combinations(3, 3) == [[1, 2, 3]], 'k = n: [[1, 2, 3]]'\nassert len(combinations(10, 5)) == 252, 'C(10, 5) = 252'\n_c = combinations(6, 3)\nassert _c == sorted(_c) and all(a < b < c for a, b, c in _c), 'Each group is in increasing order, and the groups are sorted'\n"
    }
   },
   {
    "title": "Letters of phone keys",
    "prompt": "<p>On an old phone the digits correspond to letters: <code>2: abc, 3: def, 4: ghi, 5: jkl, 6: mno, 7: pqrs, 8: tuv, 9: wxyz</code>. Function <code>letter_combos(digits)</code> must return all letter combinations for the given string of digits (in the order of the keys pressed). For an empty string — <code>[]</code>.</p>\n<pre><code>letter_combos('23') → ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']\nletter_combos('')   → []</code></pre>",
    "hints": [
     "<code>bt(i, cur)</code>: add each letter of the digit <code>i</code> to <code>cur</code> and move on to <code>i + 1</code>.",
     "Check empty input separately: <code>[]</code>, not <code>['']</code>."
    ],
    "check": {
     "tests": "\nassert letter_combos('23') == ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'], 'Expected 9 combinations in order'\nassert letter_combos('') == [], \"Empty string: [] (not [''])\"\nassert letter_combos('7') == ['p', 'q', 'r', 's'], \"'7': four letters\"\nassert len(letter_combos('79')) == 16, \"'79': 4 · 4 = 16\"\nassert letter_combos('22')[:3] == ['aa', 'ab', 'ac'], \"The start of '22': aa, ab, ac\"\n"
    }
   },
   {
    "title": "Sums from given numbers",
    "prompt": "<p>A shop has goods with prices <code>prices</code> (distinct positive numbers); each item may be taken any number of times. Function <code>combo_sum(prices, total)</code> must return all distinct sets whose total cost is exactly <code>total</code>: each set in increasing order, the sets in lexicographic order. Backtracking: choose the next item not less than the previous one; stop when the sum is exceeded.</p>\n<pre><code>combo_sum([2, 3, 6, 7], 7) → [[2, 2, 3], [7]]\ncombo_sum([2], 1)          → []\ncombo_sum([5, 1], 0)       → [[]]</code></pre>",
    "hints": [
     "First sort the prices; <code>bt(start, rem)</code> — the choice starting from <code>start</code>, <code>rem</code> — the remaining sum.",
     "To allow taking one item again, pass <code>i</code> to the recursion, not <code>i + 1</code>."
    ],
    "check": {
     "tests": "\nassert combo_sum([2, 3, 6, 7], 7) == [[2, 2, 3], [7]], 'Expected [[2, 2, 3], [7]]'\nassert combo_sum([2], 1) == [], 'It cannot be formed: []'\nassert combo_sum([5, 1], 0) == [[]], 'total = 0: the empty set [[]]'\nassert combo_sum([3, 5, 2], 8) == [[2, 2, 2, 2], [2, 3, 3], [3, 5]], 'Unsorted input: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]'\ndef _ways(ps, t):\n    dp = [1] + [0] * t\n    for p in ps:\n        for s in range(p, t + 1):\n            dp[s] += dp[s - p]\n    return dp[t]\n_r = combo_sum([2, 3, 5, 7], 30)\nassert len(_r) == _ways([2, 3, 5, 7], 30) and len(set(map(tuple, _r))) == len(_r), 'The number of sets is wrong or there are duplicates'\nassert all(sum(c) == 30 and c == sorted(c) for c in _r) and _r == sorted(_r), 'The sum of each set is 30; each set in increasing order, the list is sorted'\n"
    }
   },
   {
    "title": "Placing queens",
    "prompt": "<p>How many ways are there to place <code>n</code> queens on the chessboard <code>n × n</code> so that they do not attack each other? Return the number <code>n_queens(n)</code>. Backtracking: place one queen in each row and keep the occupied columns and the two diagonals (<code>r − c</code> and <code>r + c</code>) in sets <code>set</code>. <code>n ≤ 9</code>.</p>\n<pre><code>n_queens(4) → 2\nn_queens(1) → 1\nn_queens(3) → 0</code></pre>",
    "hints": [
     "On the cells of one diagonal <code>r − c</code> stays constant, on the other <code>r + c</code> stays constant.",
     "When backtracking, do not forget to remove the values from all three sets."
    ],
    "check": {
     "tests": "\nassert n_queens(4) == 2, 'n_queens(4) must return 2'\nassert n_queens(1) == 1, 'n_queens(1) must return 1'\nassert n_queens(2) == 0 and n_queens(3) == 0, 'For n = 2 and n = 3 there are no solutions'\nassert n_queens(5) == 10, 'n_queens(5) must return 10'\nassert n_queens(6) == 4, 'n_queens(6) must return 4'\nassert n_queens(8) == 92, 'n_queens(8) must return 92'\n"
    }
   }
  ]
 },
 "dsa-8": {
  "pr": [
   {
    "title": "Integer square root",
    "prompt": "<p>Function <code>isqrt(n)</code> (<code>n ≥ 0</code>) is the largest integer <code>x</code> for which <code>x * x ≤ n</code>. Without using <code>math</code> or <code>** 0.5</code>, run a binary search on the range <code>[0, n]</code>: O(log n).</p>\n<pre><code>isqrt(16) → 4\nisqrt(15) → 3\nisqrt(0)  → 0</code></pre>",
    "hints": [
     "The condition <code>mid * mid ≤ n</code> is monotonic: it is true for small <code>x</code>, then false.",
     "When searching for the largest 'true' value, <code>mid = (lo + hi + 1) // 2</code> — otherwise the loop never ends."
    ],
    "check": {
     "tests": "\nassert isqrt(16) == 4, 'isqrt(16) must return 4'\nassert isqrt(15) == 3, 'isqrt(15) must return 3'\nassert isqrt(0) == 0, 'isqrt(0) must return 0'\nassert isqrt(1) == 1, 'isqrt(1) must return 1'\nassert isqrt(2) == 1, 'isqrt(2) must return 1'\nassert isqrt(10**18) == 10**9, 'isqrt(10^18) = 10^9'\nassert isqrt(10**18 - 1) == 10**9 - 1, 'isqrt(10^18 − 1) = 10^9 − 1'\nfor _n in range(200):\n    _x = isqrt(_n)\n    assert _x * _x <= _n < (_x + 1) * (_x + 1), f'isqrt({_n}) қате: {_x}'\n"
    }
   },
   {
    "title": "Upper bound",
    "prompt": "<p><code>upper_bound(a, x)</code>: in a sorted <code>a</code>, find the smallest <code>i</code> for which <code>a[i] &gt; x</code>; if there is none — <code>len(a)</code>. Without using <code>bisect</code>, write a binary search.</p>\n<pre><code>upper_bound([1, 2, 2, 2, 5], 2) → 4\nupper_bound([1, 2, 2, 2, 5], 0) → 0\nupper_bound([1, 2, 2, 2, 5], 9) → 5</code></pre>",
    "hints": [
     "Similar to <code>lower_bound</code>, but if the condition <code>a[mid] &lt;= x</code> holds, we move right, not left.",
     "<code>hi = len(a)</code> — the answer may be <code>len(a)</code>."
    ],
    "check": {
     "tests": "\nassert upper_bound([1, 2, 2, 2, 5], 2) == 4, 'upper_bound([1, 2, 2, 2, 5], 2) must return 4'\nassert upper_bound([1, 2, 2, 2, 5], 0) == 0, 'All values are larger: 0'\nassert upper_bound([1, 2, 2, 2, 5], 9) == 5, 'All values are smaller: len(a) = 5'\nassert upper_bound([], 3) == 0, 'Empty list: 0'\nassert upper_bound([4, 4, 4], 4) == 3, 'All equal: 3'\nimport bisect as _b, random as _random\n_rng = _random.Random(3)\nfor _ in range(100):\n    _a = sorted(_rng.randint(0, 9) for _ in range(_rng.randint(0, 12)))\n    _x = _rng.randint(-1, 10)\n    assert upper_bound(_a, _x) == _b.bisect_right(_a, _x), f'upper_bound({_a}, {_x}) {_b.bisect_right(_a, _x)} болуы керек'\n"
    }
   },
   {
    "title": "How many times a value occurs",
    "prompt": "<p>Exam scores are sorted in increasing order. Function <code>count_of(a, x)</code> must return in O(log n) how many times the score <code>x</code> occurs: find the first position of <code>a[i] ≥ x</code> and the first position of <code>a[i] &gt; x</code> with binary search and take their difference.</p>\n<pre><code>count_of([50, 70, 70, 70, 90], 70) → 3\ncount_of([50, 70, 90], 60)         → 0</code></pre>",
    "hints": [
     "One helper function can find both bounds — compare with <code>&lt;</code> or <code>&lt;=</code>.",
     "Answer: <code>upper − lower</code>."
    ],
    "check": {
     "tests": "\nassert count_of([50, 70, 70, 70, 90], 70) == 3, 'count_of(..., 70) must return 3'\nassert count_of([50, 70, 90], 60) == 0, 'No such value: 0'\nassert count_of([], 5) == 0, 'Empty list: 0'\nassert count_of([5, 5, 5], 5) == 3, 'All equal: 3'\nassert count_of([1, 2, 3], 3) == 1, 'The last element: 1'\nimport time as _time\n_big = [i // 3 for i in range(300000)]\n_t0 = _time.perf_counter()\nfor _q in range(2000):\n    assert count_of(_big, _q * 37) == 3, f'count_of(_big, {_q * 37}) 3 болуы керек'\n_dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'2000 queries took {_dt:.2f} s: each query must be O(log n) (not count or a loop)'\n"
    }
   },
   {
    "title": "Search in a rotated list",
    "prompt": "<p>A list of distinct numbers sorted in increasing order is «rotated» at an unknown point: <code>[4, 5, 6, 7, 0, 1, 2]</code>. Function <code>search_rotated(a, x)</code> must return the index of <code>x</code> or <code>-1</code> in O(log n). At each step one of the halves of <code>mid</code> is always sorted — check whether <code>x</code> lies on the left.</p>\n<pre><code>search_rotated([4, 5, 6, 7, 0, 1, 2], 0) → 4\nsearch_rotated([4, 5, 6, 7, 0, 1, 2], 3) → -1</code></pre>",
    "hints": [
     "If <code>a[lo] ≤ a[mid]</code>, the left half is sorted; otherwise the right half is.",
     "If <code>x</code> falls into the range within the sorted half, go into that half; otherwise go into the other one."
    ],
    "check": {
     "tests": "\nassert search_rotated([4, 5, 6, 7, 0, 1, 2], 0) == 4, 'Expected 4'\nassert search_rotated([4, 5, 6, 7, 0, 1, 2], 3) == -1, 'No such value: -1'\nassert search_rotated([], 1) == -1, 'Empty list: -1'\nassert search_rotated([1], 1) == 0, 'One element: 0'\nassert search_rotated([3, 1], 1) == 1, 'search_rotated([3, 1], 1) must return 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(200):\n    _n = _rng.randint(1, 15); _base = sorted(_rng.sample(range(50), _n)); _k = _rng.randint(0, _n - 1)\n    _a = _base[_k:] + _base[:_k]; _x = _rng.randint(-1, 50)\n    _exp = _a.index(_x) if _x in _a else -1\n    assert search_rotated(_a, _x) == _exp, f'search_rotated({_a}, {_x}) {_exp} болуы керек'\n_big = list(range(500000, 1000000)) + list(range(500000))\n_t0 = _time.perf_counter()\nfor _q in range(0, 1000000, 997):\n    assert search_rotated(_big, _q) == (_q - 500000) % 1000000\nassert _time.perf_counter() - _t0 < 1.0, 'Each search must be O(log n)'\n"
    }
   },
   {
    "title": "Minimum of a rotated list",
    "prompt": "<p>A list of distinct numbers sorted in increasing order that may be rotated (or may not be). Function <code>find_min(a)</code> must return the smallest element in O(log n). Compare <code>a[mid]</code> with <code>a[hi]</code>. The list is not empty.</p>\n<pre><code>find_min([3, 4, 5, 1, 2]) → 1\nfind_min([11, 13, 15])    → 11</code></pre>",
    "hints": [
     "If <code>a[mid] &gt; a[hi]</code>, the «drop» point is on the right: <code>lo = mid + 1</code>.",
     "Otherwise the minimum is at <code>mid</code> or on the left: <code>hi = mid</code>."
    ],
    "check": {
     "tests": "\nassert find_min([3, 4, 5, 1, 2]) == 1, 'find_min([3, 4, 5, 1, 2]) must return 1'\nassert find_min([11, 13, 15]) == 11, 'Not rotated: 11'\nassert find_min([7]) == 7, 'One element: 7'\nassert find_min([2, 1]) == 1, 'find_min([2, 1]) must return 1'\nimport random as _random, time as _time\n_rng = _random.Random(5)\nfor _ in range(200):\n    _n = _rng.randint(1, 15); _base = sorted(_rng.sample(range(-30, 30), _n)); _k = _rng.randint(0, _n - 1)\n    _a = _base[_k:] + _base[:_k]\n    assert find_min(_a) == _base[0], f'find_min({_a}) {_base[0]} болуы керек'\n_big = list(range(300000, 1000000)) + list(range(300000))\n_t0 = _time.perf_counter()\nfor _ in range(3000):\n    find_min(_big)\nassert find_min(_big) == 0 and _time.perf_counter() - _t0 < 1.0, 'An O(log n) solution is needed, not min(a)'\n"
    }
   },
   {
    "title": "Mountain peak",
    "prompt": "<p>The height profile of a mountain: the list strictly increases, then strictly decreases (length at least 3, the peak is not at the edge). Function <code>peak_index(h)</code> must return the index of the peak in O(log n): if <code>h[mid] &lt; h[mid + 1]</code>, the peak is on the right.</p>\n<pre><code>peak_index([1, 3, 7, 4, 2]) → 2\npeak_index([0, 10, 5])      → 1</code></pre>",
    "hints": [
     "The condition «<code>h[i] &lt; h[i + 1]</code>» is true up to the peak and false from it on — search for that boundary."
    ],
    "check": {
     "tests": "\nassert peak_index([1, 3, 7, 4, 2]) == 2, 'peak_index([1, 3, 7, 4, 2]) must return 2'\nassert peak_index([0, 10, 5]) == 1, 'peak_index([0, 10, 5]) must return 1'\nassert peak_index([1, 2, 3, 4, 0]) == 3, 'The peak is near the end: 3'\nassert peak_index([5, 9, 8, 7, 6, 1]) == 1, 'The peak is near the start: 1'\nimport time as _time\n_big = list(range(400000)) + list(range(399998, -1, -1))\n_t0 = _time.perf_counter()\nfor _ in range(3000):\n    _r = peak_index(_big)\nassert _r == 399999 and _time.perf_counter() - _t0 < 1.0, 'An O(log n) solution is needed'\n"
    }
   },
   {
    "title": "Apple picking speed",
    "prompt": "<p>In a garden there are trees with apples: <code>piles[i]</code>. A worker picks <code>v</code> apples per hour: within one hour he works with only one tree (if fewer than <code>v</code> are left on a tree, the rest of that hour is wasted). Function <code>min_speed(piles, h)</code> must return the smallest <code>v</code> at which all the apples can be picked in <code>h</code> hours (<code>h ≥ len(piles)</code>). Find the answer with a binary search: the time at speed <code>v</code> is <code>sum(ceil(p / v))</code>.</p>\n<pre><code>min_speed([3, 6, 7, 11], 8)      → 4\nmin_speed([30, 11, 23, 4, 20], 5) → 30\nmin_speed([30, 11, 23, 4, 20], 6) → 23</code></pre>",
    "hints": [
     "The higher the speed, the less time — the condition is monotonic. The search range is <code>[1, max(piles)]</code>.",
     "Round the integer division up: <code>(p + v − 1) // v</code>."
    ],
    "check": {
     "tests": "\nassert min_speed([3, 6, 7, 11], 8) == 4, 'Expected 4'\nassert min_speed([30, 11, 23, 4, 20], 5) == 30, 'h = n: the largest tree, 30'\nassert min_speed([30, 11, 23, 4, 20], 6) == 23, 'Expected 23'\nassert min_speed([1], 1) == 1, 'One apple: 1'\nassert min_speed([10], 100) == 1, 'Plenty of time: the smallest speed is 1'\nassert min_speed([10**9], 2) == 5 * 10**8, 'Large number: 5·10^8'\nimport random as _random, time as _time\n_rng = _random.Random(6)\nfor _ in range(30):\n    _p = [_rng.randint(1, 30) for _ in range(_rng.randint(1, 6))]; _h = _rng.randint(len(_p), 40)\n    _exp = next(v for v in range(1, 31) if sum((x + v - 1) // v for x in _p) <= _h)\n    assert min_speed(_p, _h) == _exp, f'min_speed({_p}, {_h}) {_exp} болуы керек'\n_big = [_rng.randint(1, 10**9) for _ in range(20000)]\n_t0 = _time.perf_counter(); min_speed(_big, 10**6); _dt = _time.perf_counter() - _t0\nassert _dt < 2.0, f'{_dt:.2f} s: find the answer with binary search'\n"
    }
   },
   {
    "title": "Distance between shops",
    "prompt": "<p>On a street there are free places at points <code>positions</code> (in no particular order, all distinct). We need to open <code>k</code> shops on one line so that the distance between the two nearest shops is <b>as large as possible</b>. Function <code>max_min_gap(positions, k)</code> must return this largest possible distance (<code>2 ≤ k ≤ len(positions)</code>). Sort, then binary search on the answer: «can we place <code>k</code> shops so that the distance between them is at least <code>d</code>?» — a greedy check.</p>\n<pre><code>max_min_gap([1, 2, 8, 4, 9], 3) → 3     # 1, 4, 8 (немесе 1, 4, 9)\nmax_min_gap([5, 1], 2)          → 4</code></pre>",
    "hints": [
     "<code>ok(d)</code>: place the first shop at the far left, and each next one at the first spot at least <code>d</code> away from the previous one.",
     "We look for the largest true <code>d</code>: <code>mid = (lo + hi + 1) // 2</code>."
    ],
    "check": {
     "tests": "\nassert max_min_gap([1, 2, 8, 4, 9], 3) == 3, 'Expected 3'\nassert max_min_gap([5, 1], 2) == 4, 'Two places: 4'\nassert max_min_gap([1, 2, 3, 4], 4) == 1, 'All places are taken: 1'\nassert max_min_gap([0, 100, 50, 49, 51], 3) == 50, 'Expected 50'\nfrom itertools import combinations as _comb\nimport random as _random\n_rng = _random.Random(7)\nfor _ in range(40):\n    _p = _rng.sample(range(40), _rng.randint(2, 8)); _k = _rng.randint(2, len(_p))\n    _exp = max(min(b - a for a, b in zip(c, c[1:])) for c in _comb(sorted(_p), _k))\n    assert max_min_gap(_p, _k) == _exp, f'max_min_gap({_p}, {_k}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "dsa-9": {
  "pr": [
   {
    "title": "Insertion sort",
    "prompt": "<p>Function <code>insertion_sort(a)</code> must return a <b>new</b> list sorted in increasing order (do not change the original list). Write insertion sort yourself: insert each element into the sorted left part, shifting elements from right to left. Do not use <code>sorted</code> or <code>.sort</code>.</p>\n<pre><code>insertion_sort([5, 2, 4, 6, 1, 3]) → [1, 2, 3, 4, 5, 6]</code></pre>",
    "hints": [
     "<code>x = b[i]</code>; while <code>b[j] &gt; x</code> does not hold, shift the elements one place to the right.",
     "At the end <code>b[j + 1] = x</code>."
    ],
    "check": {
     "tests": "\n_a = [5, 2, 4, 6, 1, 3]\nassert insertion_sort(_a) == [1, 2, 3, 4, 5, 6], 'Expected [1, 2, 3, 4, 5, 6]'\nassert _a == [5, 2, 4, 6, 1, 3], 'Do not change the original list'\nassert insertion_sort([]) == [], 'Empty list: []'\nassert insertion_sort([1]) == [1], 'One element'\nassert insertion_sort([3, 3, 1, 1]) == [1, 1, 3, 3], 'Repeated values: [1, 1, 3, 3]'\nimport random as _random\n_rng = _random.Random(1)\nfor _ in range(30):\n    _x = [_rng.randint(-20, 20) for _ in range(_rng.randint(0, 25))]\n    assert insertion_sort(_x) == sorted(_x), f'{_x} қате сұрыпталды'\n"
    }
   },
   {
    "title": "By score and by name",
    "prompt": "<p>The olympiad participants are tuples of the form <code>(аты, балл)</code>. Function <code>rank(students)</code> must sort them by score in <b>descending</b> order, and by name in <b>ascending</b> order when the scores are equal, and return only the list of names. Use <code>sorted</code> and <code>key</code>.</p>\n<pre><code>rank([('Әсем', 90), ('Берік', 95), ('Арман', 90)]) → ['Берік', 'Арман', 'Әсем']</code></pre>",
    "hints": [
     "Use a tuple as the key: <code>(-балл, аты)</code> — a negative score gives the descending order."
    ],
    "check": {
     "tests": "\nassert rank([('Әсем', 90), ('Берік', 95), ('Арман', 90)]) == ['Берік', 'Арман', 'Әсем'], \"Expected ['Берік', 'Арман', 'Әсем']\"\nassert rank([]) == [], 'Empty list: []'\nassert rank([('Дана', 50)]) == ['Дана'], 'One participant'\nassert rank([('в', 1), ('б', 1), ('а', 1)]) == ['а', 'б', 'в'], 'All scores are equal: by name'\nassert rank([('а', 1), ('б', 2), ('в', 3)]) == ['в', 'б', 'а'], 'Descending by score'\n"
    }
   },
   {
    "title": "Stable sort by length",
    "prompt": "<p>Function <code>by_length(words)</code> must sort words by length in increasing order; words of the same length must <b>keep their original order</b> (a stable sort). In Python, <code>sorted</code> is stable.</p>\n<pre><code>by_length(['алма', 'ит', 'қой', 'ат', 'құс']) → ['ит', 'ат', 'қой', 'құс', 'алма']</code></pre>",
    "hints": [
     "<code>key=len</code> is enough: <code>sorted</code> keeps the order of equal keys."
    ],
    "check": {
     "tests": "\nassert by_length(['алма', 'ит', 'қой', 'ат', 'құс']) == ['ит', 'ат', 'қой', 'құс', 'алма'], \"Expected ['ит', 'ат', 'қой', 'құс', 'алма']\"\nassert by_length([]) == [], 'Empty list: []'\nassert by_length(['бб', 'аа']) == ['бб', 'аа'], 'Equal length: the original order is kept (not the alphabet)'\nassert by_length(['ccc', 'b', '']) == ['', 'b', 'ccc'], 'The empty word comes first'\n"
    }
   },
   {
    "title": "Write quicksort",
    "prompt": "<p>Function <code>quick_sort(a)</code> must return a new list sorted with quicksort: take the middle element as the pivot, split the list into three parts (<code>&lt; pivot</code>, <code>== pivot</code>, <code>&gt; pivot</code>) and sort the two outer ones recursively. Do not use <code>sorted</code> or <code>.sort</code>. The test will also check a list with many identical values.</p>\n<pre><code>quick_sort([3, 6, 1, 8, 2, 9, 2]) → [1, 2, 2, 3, 6, 8, 9]</code></pre>",
    "hints": [
     "Base case: length 0 or 1.",
     "Putting equal elements into their own group protects the recursion from going too deep when there are many identical values."
    ],
    "check": {
     "tests": "\nassert quick_sort([3, 6, 1, 8, 2, 9, 2]) == [1, 2, 2, 3, 6, 8, 9], 'Expected [1, 2, 2, 3, 6, 8, 9]'\nassert quick_sort([]) == [], 'Empty list: []'\nassert quick_sort([1]) == [1], 'One element'\n_a = [3, 1, 2]; quick_sort(_a)\nassert _a == [3, 1, 2], 'Do not change the original list'\nassert quick_sort([7] * 5000) == [7] * 5000, '5000 identical values: the recursion depth must not grow'\nassert quick_sort(list(range(3000, 0, -1))) == list(range(1, 3001)), 'A reverse-sorted list'\nimport random as _random\n_rng = _random.Random(2)\nfor _ in range(30):\n    _x = [_rng.randint(-9, 9) for _ in range(_rng.randint(0, 30))]\n    assert quick_sort(_x) == sorted(_x), f'{_x} қате сұрыпталды'\n"
    }
   },
   {
    "title": "Sort three colours",
    "prompt": "<p>A list of traffic light colours — <code>0</code> (red), <code>1</code> (yellow), <code>2</code> (green). Function <code>sort_colors(a)</code> must sort it <b>in place</b> in one pass (Dijkstra's «Dutch flag» method): three pointers <code>lo</code>, <code>mid</code>, <code>hi</code>. Do not use <code>sorted</code>, <code>.sort</code> or counting.</p>\n<pre><code>a = [2, 0, 2, 1, 1, 0]\nsort_colors(a)    # a == [0, 0, 1, 1, 2, 2]</code></pre>",
    "hints": [
     "<code>a[:lo]</code> — zeros, <code>a[lo:mid]</code> — ones, <code>a[hi+1:]</code> — twos.",
     "If you meet a 2, swap it with <code>hi</code>, but do not move <code>mid</code>: the element that came is not checked yet."
    ],
    "check": {
     "tests": "\n_a = [2, 0, 2, 1, 1, 0]; sort_colors(_a)\nassert _a == [0, 0, 1, 1, 2, 2], f'Expected [0, 0, 1, 1, 2, 2], got {_a}'\n_a = []; sort_colors(_a); assert _a == [], 'Бос тізім'\n_a = [1]; sort_colors(_a); assert _a == [1], 'Бір элемент'\n_a = [2, 2, 0]; sort_colors(_a); assert _a == [0, 2, 2], 'Күтілгені [0, 2, 2]'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(50):\n    _x = [_rng.randint(0, 2) for _ in range(_rng.randint(0, 20))]; _y = list(_x)\n    sort_colors(_y)\n    assert _y == sorted(_x), f'{_x} қате сұрыпталды: {_y}'\n"
    }
   },
   {
    "title": "k-th smallest element",
    "prompt": "<p>Function <code>kth_smallest(a, k)</code> must return the <code>k</code>-th smallest element of the list (<code>k = 1</code> is the minimum; repeats count). Quickselect: partition as in quicksort, but recurse only into the part where the <code>k</code>-th element lies — on average O(n). Do not use <code>sorted</code> or <code>.sort</code>.</p>\n<pre><code>kth_smallest([7, 10, 4, 3, 20, 15], 3) → 7\nkth_smallest([2, 2, 1], 2)             → 2</code></pre>",
    "hints": [
     "After partitioning: <code>k ≤ len(less)</code> — the answer is in <code>less</code>; <code>k ≤ len(less) + len(eq)</code> — the answer is in <code>p</code>.",
     "Otherwise move on to <code>more</code> and subtract <code>len(less) + len(eq)</code> from <code>k</code>."
    ],
    "check": {
     "tests": "\nassert kth_smallest([7, 10, 4, 3, 20, 15], 3) == 7, 'Expected 7'\nassert kth_smallest([2, 2, 1], 2) == 2, 'Repeats count: 2'\nassert kth_smallest([5], 1) == 5, 'One element'\nassert kth_smallest([9, 8, 7], 3) == 9, 'k = n: the maximum'\nimport random as _random\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-10, 10) for _ in range(_rng.randint(1, 20))]; _k = _rng.randint(1, len(_x))\n    assert kth_smallest(list(_x), _k) == sorted(_x)[_k - 1], f'kth_smallest({_x}, {_k}) {sorted(_x)[_k - 1]} болуы керек'\n_big = [_rng.randint(0, 10**9) for _ in range(100000)]\nassert kth_smallest(list(_big), 50000) == sorted(_big)[49999], 'The median of 100 000 elements is wrong'\n"
    }
   },
   {
    "title": "Sort by frequency",
    "prompt": "<p><code>freq_sort(nums)</code>: sort the numbers by frequency of occurrence in <b>ascending</b> order; numbers with the same frequency — by value in <b>descending</b> order. Each number is repeated as many times as it occurred. Count with a dictionary, then <code>sorted</code> + <code>key</code>.</p>\n<pre><code>freq_sort([1, 1, 2, 2, 2, 3]) → [3, 1, 1, 2, 2, 2]\nfreq_sort([2, 3, 1, 3, 2])    → [1, 3, 3, 2, 2]</code></pre>",
    "hints": [
     "First the dictionary <code>cnt</code>.",
     "Key: <code>(cnt[x], -x)</code>."
    ],
    "check": {
     "tests": "\nassert freq_sort([1, 1, 2, 2, 2, 3]) == [3, 1, 1, 2, 2, 2], 'Expected [3, 1, 1, 2, 2, 2]'\nassert freq_sort([2, 3, 1, 3, 2]) == [1, 3, 3, 2, 2], 'With equal frequency, the larger one first: [1, 3, 3, 2, 2]'\nassert freq_sort([]) == [], 'Empty list: []'\nassert freq_sort([-1, 1, -6, 4, 5, -6, 1, 4, 1]) == [5, -1, 4, 4, -6, -6, 1, 1, 1], 'The test with negative numbers is wrong'\nassert freq_sort([0, 0, 0]) == [0, 0, 0], 'One value'\n"
    }
   },
   {
    "title": "Closest pairs",
    "prompt": "<p>The times of athletes (distinct integers) are given in no particular order. Function <code>closest_pairs(times)</code> must return all pairs with the smallest difference as <code>[a, b]</code> (<code>a &lt; b</code>), sorted by <code>a</code> in increasing order. After sorting, the closest pairs are neighbours: O(n log n).</p>\n<pre><code>closest_pairs([4, 2, 1, 3])       → [[1, 2], [2, 3], [3, 4]]\nclosest_pairs([1, 3, 6, 10, 15])  → [[1, 3]]\nclosest_pairs([5])                → []</code></pre>",
    "hints": [
     "In a sorted list the smallest difference is always between neighbouring elements.",
     "If a smaller difference is found, clear the result and start again."
    ],
    "check": {
     "tests": "\nassert closest_pairs([4, 2, 1, 3]) == [[1, 2], [2, 3], [3, 4]], 'Expected [[1, 2], [2, 3], [3, 4]]'\nassert closest_pairs([1, 3, 6, 10, 15]) == [[1, 3]], 'Expected [[1, 3]]'\nassert closest_pairs([5]) == [], 'One element: []'\nassert closest_pairs([]) == [], 'Empty list: []'\nassert closest_pairs([3, 8, -10, 23, 19, -4, -14, 27]) == [[-14, -10], [19, 23], [23, 27]], 'The test with negative numbers is wrong'\nimport random as _random, time as _time\n_rng = _random.Random(9)\nfor _ in range(30):\n    _x = _rng.sample(range(-50, 50), _rng.randint(2, 10))\n    _d = min(abs(p - q) for i, p in enumerate(_x) for q in _x[i + 1:])\n    _exp = sorted([min(p, q), max(p, q)] for i, p in enumerate(_x) for q in _x[i + 1:] if abs(p - q) == _d)\n    assert closest_pairs(_x) == _exp, f'closest_pairs({_x}) {_exp} болуы керек'\n_big = _rng.sample(range(10**9), 100000)\n_t0 = _time.perf_counter(); closest_pairs(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} s: sort and compare the neighbours (O(n log n))'\n"
    }
   }
  ]
 },
 "dsa-10": {
  "pr": [
   {
    "title": "Sum of tree values",
    "prompt": "<p>Function <code>tree_sum(root)</code> must return recursively the sum of the values of all nodes of the tree. An empty tree — 0.</p>\n<pre><code>tree_sum(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) → 10\ntree_sum(None)                                              → 0</code></pre>",
    "hints": [
     "Base case: <code>None</code> → 0.",
     "Node value + left subtree + right subtree."
    ],
    "check": {
     "tests": "\nassert tree_sum(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) == 10, 'Expected 10'\nassert tree_sum(None) == 0, 'Empty tree: 0'\nassert tree_sum(TreeNode(-5)) == -5, 'One node: -5'\nassert tree_sum(TreeNode(0, TreeNode(-1), TreeNode(1))) == 0, 'Negative values: 0'\n"
    }
   },
   {
    "title": "Number of leaves",
    "prompt": "<p>Function <code>count_leaves(root)</code> must return the number of leaves of the tree (nodes without children). An empty tree has no leaves.</p>\n<pre><code>count_leaves(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) → 2\ncount_leaves(TreeNode(7))                                       → 1</code></pre>",
    "hints": [
     "If both children are <code>None</code>, it is a leaf: 1."
    ],
    "check": {
     "tests": "\nassert count_leaves(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))) == 2, 'Expected 2 (2 and 4)'\nassert count_leaves(TreeNode(7)) == 1, 'A single node is a leaf'\nassert count_leaves(None) == 0, 'Empty tree: 0'\nassert count_leaves(TreeNode(1, TreeNode(2, TreeNode(3)))) == 1, 'A chain in the tree has one leaf'\nassert count_leaves(TreeNode(1, None, TreeNode(2))) == 1, 'Only a right child: 1'\n"
    }
   },
   {
    "title": "Mirror a tree",
    "prompt": "<p>Function <code>mirror(root)</code> must mirror the tree <b>in place</b>: in each node swap the left and right children. Return the root.</p>\n<pre><code>    4              4\n   / \\            / \\\n  2   7    →     7   2\n / \\                / \\\n1   3              3   1</code></pre>",
    "hints": [
     "<code>root.left, root.right = mirror(root.right), mirror(root.left)</code>."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_t = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))\n_r = mirror(_t)\nassert _r is _t, 'Return the same root (do not create a new tree)'\nassert _ino(_r) == [7, 4, 3, 2, 1], f'The inorder of the mirror must be [7, 4, 3, 2, 1], got {_ino(_r)}'\nassert _r.left.val == 7 and _r.right.left.val == 3, 'The children were not swapped'\nassert mirror(None) is None, 'Empty tree: None'\n_one = TreeNode(5); assert mirror(_one) is _one and _one.left is None, 'Бір түйін өзгермейді'\n"
    }
   },
   {
    "title": "Check a BST",
    "prompt": "<p>Function <code>is_bst(root)</code>: if the tree is a valid BST, return <code>True</code>: for each node, <b>all</b> values in its left subtree must be strictly less than it, and all values in its right subtree strictly greater. Checking only the children is not enough! Pass the allowed interval <code>(lo, hi)</code> into the recursion.</p>\n<pre><code>is_bst(TreeNode(2, TreeNode(1), TreeNode(3)))                         → True\nis_bst(TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(4), TreeNode(8)))) → False   # 4 &lt; 5</code></pre>",
    "hints": [
     "<code>check(node, lo, hi)</code>: must be <code>lo &lt; node.val &lt; hi</code>.",
     "Going left, update <code>hi = node.val</code>; going right, update <code>lo = node.val</code>."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\nassert is_bst(TreeNode(2, TreeNode(1), TreeNode(3))) is True, 'A valid BST: True'\nassert is_bst(TreeNode(5, TreeNode(1), TreeNode(7, TreeNode(4), TreeNode(8)))) is False, '4 is to the right of the root, but smaller than 5: False'\nassert is_bst(None) is True, 'Empty tree: True'\nassert is_bst(TreeNode(1)) is True, 'One node: True'\nassert is_bst(TreeNode(2, TreeNode(2))) is False, 'An equal value is not allowed: False'\nassert is_bst(TreeNode(10, TreeNode(5, None, TreeNode(12)), TreeNode(15))) is False, '12 is to the left of 10: False'\nassert is_bst(_bst([50, 30, 70, 20, 40, 60, 80, 35])) is True, 'A BST built by insertions: True'\n"
    }
   },
   {
    "title": "Symmetric tree",
    "prompt": "<p><code>is_symmetric(root)</code>: if the tree equals its own mirror image (the left subtree is a mirrored copy of the right one), return <code>True</code>. Write a helper function that compares pairs of nodes: <code>a.left</code> and <code>b.right</code>, <code>a.right</code> and <code>b.left</code>.</p>\n<pre><code>    1\n   / \\\n  2   2      → True\n / \\ / \\\n3  4 4  3</code></pre>",
    "hints": [
     "<code>mir(a, b)</code>: if both nodes are <code>None</code> — <code>True</code>; if only one is — <code>False</code>.",
     "The values must match, and the outer and inner pairs must be mirrored."
    ],
    "check": {
     "tests": "\n_t = TreeNode(1, TreeNode(2, TreeNode(3), TreeNode(4)), TreeNode(2, TreeNode(4), TreeNode(3)))\nassert is_symmetric(_t) is True, 'Symmetric tree: True'\n_t2 = TreeNode(1, TreeNode(2, None, TreeNode(3)), TreeNode(2, None, TreeNode(3)))\nassert is_symmetric(_t2) is False, 'The structure is not symmetric: False'\nassert is_symmetric(None) is True, 'Empty tree: True'\nassert is_symmetric(TreeNode(1)) is True, 'One node: True'\nassert is_symmetric(TreeNode(1, TreeNode(2), TreeNode(3))) is False, 'The values differ: False'\nassert is_symmetric(TreeNode(1, TreeNode(2))) is False, 'Only a left child: False'\n"
    }
   },
   {
    "title": "Closest value in a BST",
    "prompt": "<p>Function <code>closest(root, target)</code> must return the value in the BST closest to <code>target</code> (if two values are equally close — the smaller one). There is no need to traverse the whole tree: using the BST property, go down from the root along one path — O(h).</p>\n<pre><code># BST: 4, 2, 5, 1, 3\nclosest(root, 3.7) → 4\nclosest(root, 2.5) → 2</code></pre>",
    "hints": [
     "At each node update the best answer, and go left if <code>target &lt; node.val</code>, otherwise right.",
     "When two values are equally close, choose the smaller one."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_r = _bst([4, 2, 5, 1, 3])\nassert closest(_r, 3.7) == 4, 'closest(..., 3.7) must return 4'\nassert closest(_r, 2.5) == 2, 'Equally close (2 and 3): the smaller one is 2'\nassert closest(_r, 100) == 5, 'Larger than all: 5'\nassert closest(_r, -7) == 1, 'Smaller than all: 1'\nassert closest(_r, 3) == 3, 'Exact value: 3'\nassert closest(TreeNode(10), 0) == 10, 'One node'\nimport random as _random\n_rng = _random.Random(10)\nfor _ in range(40):\n    _v = _rng.sample(range(0, 60, 2), _rng.randint(1, 12)); _root = _bst(_v); _q = _rng.uniform(-5, 65)\n    _exp = min(_v, key=lambda x: (abs(x - _q), x))\n    assert closest(_root, _q) == _exp, f'{_v} ағашында {_q:.2f}-ге ең жақыны {_exp}'\n"
    }
   },
   {
    "title": "Lowest common ancestor in a BST",
    "prompt": "<p>Function <code>lca(root, p, q)</code> must return the <b>value</b> of the lowest common ancestor of the nodes with values <code>p</code> and <code>q</code> in the BST (a node counts as its own ancestor). Both values are in the tree. BST property: if both are smaller — go left; if both are larger — go right; otherwise this node is the answer. O(h).</p>\n<pre><code># BST: 6, 2, 8, 0, 4, 7, 9, 3, 5\nlca(root, 2, 8) → 6\nlca(root, 2, 4) → 2\nlca(root, 3, 5) → 4</code></pre>",
    "hints": [
     "The first node where the paths split is the common ancestor.",
     "A loop is enough: recursion is not required."
    ],
    "check": {
     "tests": "\ndef _bst(vals):\n    root = None\n    def ins(n, v):\n        if n is None:\n            return TreeNode(v)\n        if v < n.val: n.left = ins(n.left, v)\n        else: n.right = ins(n.right, v)\n        return n\n    for v in vals:\n        root = ins(root, v)\n    return root\ndef _ino(n):\n    return _ino(n.left) + [n.val] + _ino(n.right) if n else []\n\n_r = _bst([6, 2, 8, 0, 4, 7, 9, 3, 5])\nassert lca(_r, 2, 8) == 6, 'lca(2, 8) must return 6'\nassert lca(_r, 2, 4) == 2, 'A node is its own ancestor: lca(2, 4) must return 2'\nassert lca(_r, 3, 5) == 4, 'lca(3, 5) must return 4'\nassert lca(_r, 5, 3) == 4, 'The order does not matter: lca(5, 3) must return 4'\nassert lca(_r, 7, 7) == 7, 'One value: 7'\nassert lca(_r, 0, 9) == 6, 'lca(0, 9) must return 6'\nimport random as _random\n_rng = _random.Random(11)\ndef _path(n, v):\n    out = []\n    while n:\n        out.append(n.val)\n        if v == n.val: break\n        n = n.left if v < n.val else n.right\n    return out\nfor _ in range(40):\n    _v = _rng.sample(range(100), _rng.randint(1, 15)); _root = _bst(_v)\n    _p, _q = _rng.choice(_v), _rng.choice(_v)\n    _a, _b = _path(_root, _p), _path(_root, _q)\n    _exp = [x for x, y in zip(_a, _b) if x == y][-1]\n    assert lca(_root, _p, _q) == _exp, f'{_v} BST-де lca({_p}, {_q}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Diameter of a tree",
    "prompt": "<p>Function <code>diameter(root)</code> must return the number of <b>edges</b> on the longest path between any two nodes of the tree (the path may not pass through the root). An empty tree and a single node — 0. One recursive traversal: each node returns its height, and the path length is updated via <code>сол биіктік + оң биіктік</code> — O(n).</p>\n<pre><code>        1\n       / \\\n      2   3        → 3   (4 → 2 → 1 → 3 немесе 5 → 2 → 1 → 3)\n     / \\\n    4   5</code></pre>",
    "hints": [
     "The helper <code>h(n)</code> returns the height (empty — 0).",
     "At each node <code>l + r</code> is the number of edges of the longest path through this node; keep the maximum in the variable <code>nonlocal</code>."
    ],
    "check": {
     "tests": "\n_t = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nassert diameter(_t) == 3, 'Expected 3'\nassert diameter(None) == 0, 'Empty tree: 0'\nassert diameter(TreeNode(1)) == 0, 'One node: 0'\nassert diameter(TreeNode(1, TreeNode(2))) == 1, 'Two nodes: 1'\n_deep = TreeNode(1, TreeNode(2, TreeNode(3, TreeNode(4), None), TreeNode(5, None, TreeNode(6, None, TreeNode(7)))), TreeNode(8))\nassert diameter(_deep) == 5, 'The longest path does not pass through the root: 4 → 3 → 2 → 5 → 6 → 7, 5 edges'\n"
    }
   }
  ]
 },
 "dsa-11": {
  "pr": [
   {
    "title": "The k smallest numbers",
    "prompt": "<p>Function <code>smallest_k(nums, k)</code> must return the <code>k</code> smallest numbers in <b>ascending</b> order. Use <code>heapq</code> (<code>heapify</code> + <code>k</code> times <code>heappop</code>, or <code>nsmallest</code>). If <code>k</code> is larger than the list length — return all the elements.</p>\n<pre><code>smallest_k([5, 1, 9, 3, 7], 2) → [1, 3]\nsmallest_k([4, 2], 5)          → [2, 4]</code></pre>",
    "hints": [
     "<code>heapq.heapify(h)</code> is O(n), each <code>heappop</code> is O(log n).",
     "Take <code>min(k, len(h))</code> times."
    ],
    "check": {
     "tests": "\nassert smallest_k([5, 1, 9, 3, 7], 2) == [1, 3], 'Expected [1, 3]'\nassert smallest_k([4, 2], 5) == [2, 4], 'k > n: everything is sorted'\nassert smallest_k([], 3) == [], 'Empty list: []'\nassert smallest_k([3, 1, 2], 0) == [], 'k = 0: []'\nassert smallest_k([2, 2, 1], 2) == [1, 2], 'Repeats: [1, 2]'\n_a = [3, 1, 2]; smallest_k(_a, 2)\nassert _a == [3, 1, 2], 'Do not change the original list'\n"
    }
   },
   {
    "title": "Smashing stones",
    "prompt": "<p>At each step we smash the two heaviest stones (<code>x ≤ y</code>): if they are equal, both are destroyed; otherwise a stone of weight <code>y − x</code> remains. Function <code>last_stone(stones)</code> must return the weight of the last remaining stone (0 if no stones remain). <code>heapq</code> is a min-heap, so store the weights with a minus sign.</p>\n<pre><code>last_stone([2, 7, 4, 1, 8, 1]) → 1\nlast_stone([3, 3])             → 0</code></pre>",
    "hints": [
     "Max-heap: <code>h = [-s for s in stones]</code>.",
     "Take two stones; if the difference is not zero, push <code>-(y − x)</code> back into the heap."
    ],
    "check": {
     "tests": "\nassert last_stone([2, 7, 4, 1, 8, 1]) == 1, 'Expected 1'\nassert last_stone([3, 3]) == 0, 'Equal stones are destroyed: 0'\nassert last_stone([5]) == 5, 'One stone: 5'\nassert last_stone([]) == 0, 'No stones: 0'\nassert last_stone([10, 4, 2, 10]) == 2, 'Expected 2'\n"
    }
   },
   {
    "title": "k-th largest",
    "prompt": "<p>Function <code>kth_largest(nums, k)</code> must return the <code>k</code>-th largest element (repeats count). Keep a min-heap of size <code>k</code>: its top is the answer. O(n log k). Do not use <code>sorted</code>.</p>\n<pre><code>kth_largest([3, 2, 1, 5, 6, 4], 2) → 5\nkth_largest([3, 3, 3, 1], 3)       → 3</code></pre>",
    "hints": [
     "Add each element; if the heap grows larger than <code>k</code>, remove the smallest via <code>heappop</code>.",
     "At the end <code>h[0]</code>."
    ],
    "check": {
     "tests": "\nassert kth_largest([3, 2, 1, 5, 6, 4], 2) == 5, 'Expected 5'\nassert kth_largest([3, 3, 3, 1], 3) == 3, 'Repeats count: 3'\nassert kth_largest([7], 1) == 7, 'One element'\nassert kth_largest([1, 2, 3], 3) == 1, 'k = n: the minimum'\nassert kth_largest([-1, -5, -3], 1) == -1, 'Negative numbers: -1'\nimport random as _random\n_rng = _random.Random(1)\n_big = [_rng.randint(0, 10**6) for _ in range(50000)]\nassert kth_largest(_big, 100) == sorted(_big)[-100], 'Wrong on the large test'\n"
    }
   },
   {
    "title": "Top k frequent words",
    "prompt": "<p>Function <code>top_words(words, k)</code> must return the <code>k</code> most frequent words: by descending frequency, and for equal frequency by the word in ascending order (strings are compared with <code>&lt;</code>). Count with a dictionary, then take <code>k</code> elements via <code>heapq</code> by <code>(-жиілік, сөз)</code>.</p>\n<pre><code>top_words(['ит', 'мысық', 'ит', 'ат', 'мысық', 'ит'], 2) → ['ит', 'мысық']\ntop_words(['б', 'а', 'в'], 2)                         → ['а', 'б']</code></pre>",
    "hints": [
     "The heap element is <code>(-жиілік, сөз)</code>: tuples are compared first by frequency, then by the word."
    ],
    "check": {
     "tests": "\nassert top_words(['ит', 'мысық', 'ит', 'ат', 'мысық', 'ит'], 2) == ['ит', 'мысық'], \"Expected ['ит', 'мысық']\"\nassert top_words(['б', 'а', 'в'], 2) == ['а', 'б'], \"Equal frequency: ['а', 'б']\"\nassert top_words([], 3) == [], 'Empty list: []'\nassert top_words(['x', 'y'], 5) == ['x', 'y'], 'k is larger than the number of words: all of them'\nassert top_words(['day', 'is', 'the', 'day', 'the', 'is', 'sunny', 'the', 'is', 'the'], 4) == ['the', 'is', 'day', 'sunny'], 'Expected the, is, day, sunny'\n"
    }
   },
   {
    "title": "Connecting ropes",
    "prompt": "<p>Ropes with lengths <code>ropes</code> must be joined into one rope. The cost of joining two ropes is the sum of their lengths. Function <code>min_cost(ropes)</code> must return the smallest total cost. Greedy + heap: at each step join the two shortest ropes. One or zero ropes — 0.</p>\n<pre><code>min_cost([4, 3, 2, 6]) → 29    # 2+3=5, 4+5=9, 6+9=15; 5+9+15=29\nmin_cost([5])          → 0</code></pre>",
    "hints": [
     "Take the two smallest via <code>heappop</code>, add their sum to the cost, and push it back via <code>heappush</code>."
    ],
    "check": {
     "tests": "\nassert min_cost([4, 3, 2, 6]) == 29, 'Expected 29'\nassert min_cost([5]) == 0, 'One rope: 0'\nassert min_cost([]) == 0, 'No ropes: 0'\nassert min_cost([1, 1]) == 2, 'Two ropes: 2'\nassert min_cost([1, 2, 3, 4, 5]) == 33, 'Expected 33'\nimport time as _time\n_t0 = _time.perf_counter(); _r = min_cost([1] * 50000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} s: a heap solution in O(n log n) is needed'\n"
    }
   },
   {
    "title": "K closest points",
    "prompt": "<p>The city centre is <code>(0, 0)</code>. Function <code>closest_points(points, k)</code> must return the <code>k</code> points closest to the centre (by Euclidean distance): in increasing order of distance, and for equal distances in increasing order of the point tuple. There is no need to take a square root: compare <code>x² + y²</code>. Use <code>heapq</code>.</p>\n<pre><code>closest_points([(1, 3), (-2, 2), (5, 0)], 1) → [(-2, 2)]\nclosest_points([(3, 3), (5, -1), (-2, 4)], 2) → [(3, 3), (-2, 4)]</code></pre>",
    "hints": [
     "The tuple <code>(x² + y², (x, y))</code> gives the right order right away.",
     "<code>heapq.nsmallest(k, ...)</code> — O(n log k)."
    ],
    "check": {
     "tests": "\nassert closest_points([(1, 3), (-2, 2), (5, 0)], 1) == [(-2, 2)], 'Expected [(-2, 2)]'\nassert closest_points([(3, 3), (5, -1), (-2, 4)], 2) == [(3, 3), (-2, 4)], 'Expected [(3, 3), (-2, 4)]'\nassert closest_points([], 2) == [], 'No points: []'\nassert closest_points([(1, 0), (0, 1), (-1, 0)], 2) == [(-1, 0), (0, 1)], 'Equal distance: by tuple in increasing order'\nassert closest_points([(2, 2)], 5) == [(2, 2)], 'k is larger than the number of points: all of them'\n"
    }
   },
   {
    "title": "Running median",
    "prompt": "<p>A weather station passes the temperature one value at a time. Class <code>MedianFinder</code>: <code>add(x)</code> adds a number, <code>median()</code> returns the median of the numbers so far (if the count is even — the average of the two middle ones, <code>float</code>). Use two heaps: a max-heap for the smaller half (with a minus sign) and a min-heap for the larger half; keep their sizes balanced. Each operation is O(log n). If there are no numbers, <code>median()</code> — <code>None</code>.</p>\n<pre><code>m = MedianFinder()\nm.add(5); m.median() → 5\nm.add(-3); m.median() → 1.0\nm.add(10); m.median() → 5</code></pre>",
    "hints": [
     "Push the new number into <code>lo</code>, move the largest of <code>lo</code> into <code>hi</code>; if <code>hi</code> becomes too big, move one element back.",
     "With an odd count the median is <code>-lo[0]</code>, with an even count — <code>(-lo[0] + hi[0]) / 2</code>."
    ],
    "check": {
     "tests": "\n_m = MedianFinder()\nassert _m.median() is None, 'No numbers: None'\n_m.add(5); assert _m.median() == 5, 'Бір сан: 5'\n_m.add(-3); assert _m.median() == 1.0, '5 және -3: 1.0'\n_m.add(10); assert _m.median() == 5, '-3, 5, 10: 5'\n_m.add(7); assert _m.median() == 6.0, '-3, 5, 7, 10: 6.0'\nimport random as _random, time as _time\n_rng = _random.Random(2)\n_m2 = MedianFinder(); _seen = []\nfor _ in range(200):\n    _x = _rng.randint(-50, 50); _m2.add(_x); _seen.append(_x)\n    _s = sorted(_seen); _n = len(_s)\n    _exp = _s[_n // 2] if _n % 2 else (_s[_n // 2 - 1] + _s[_n // 2]) / 2\n    assert _m2.median() == _exp, f'{len(_seen)} сан қосылғанда медиана {_exp} болуы керек'\n_m3 = MedianFinder(); _t0 = _time.perf_counter()\nfor _i in range(30000):\n    _m3.add(_rng.randint(0, 10**6)); _m3.median()\nassert _time.perf_counter() - _t0 < 2.0, 'Each operation must be O(log n) (do not sort every time)'\n"
    }
   },
   {
    "title": "Rearrange letters with no neighbours alike",
    "prompt": "<p>Function <code>rearrange(s)</code> must rearrange the letters of the string so that no two adjacent characters are the same. If this is impossible, return <code>''</code>. Any correct answer is accepted. Greedy + max-heap: at each step take the most frequent remaining letter, but return the letter of the previous step to the heap only one step later.</p>\n<pre><code>rearrange('aab')  → 'aba'\nrearrange('aaab') → ''</code></pre>",
    "hints": [
     "Heap: <code>(-саны, әріп)</code>.",
     "Do not put the taken letter back at once: keep it in <code>prev</code> and return it only after the next letter is taken; if <code>prev</code> is left at the end, it is impossible."
    ],
    "check": {
     "tests": "\ndef _valid(src, out):\n    return sorted(src) == sorted(out) and all(a != b for a, b in zip(out, out[1:]))\nassert _valid('aab', rearrange('aab')), \"rearrange('aab') must return 'aba'\"\nassert rearrange('aaab') == '', \"Impossible: ''\"\nassert rearrange('') == '', \"Empty string: ''\"\nassert rearrange('z') == 'z', 'One character'\nassert rearrange('aa') == '', \"rearrange('aa') must return ''\"\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(60):\n    _s = ''.join(_rng.choice('ққаб') for _ in range(_rng.randint(1, 12)))\n    _mx = max(_s.count(c) for c in set(_s))\n    _r = rearrange(_s)\n    if _mx > (len(_s) + 1) // 2:\n        assert _r == '', f'{_s!r} үшін мүмкін емес: \\'\\' күтілді'\n    else:\n        assert _valid(_s, _r), f'{_s!r} үшін дұрыс орналастыру табылмады: {_r!r}'\n"
    }
   }
  ]
 },
 "dsa-12": {
  "pr": [
   {
    "title": "City with the most roads",
    "prompt": "<p><code>roads</code> is a list of two-way roads between cities: <code>(a, b)</code>. Function <code>busiest_city(roads)</code> must return the city with the most roads connected to it (the highest-degree vertex); if tied — the one whose name is smallest alphabetically (<code>&lt;</code>). If there are no roads — <code>None</code>.</p>\n<pre><code>busiest_city([('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')])\n→ 'Алматы'</code></pre>",
    "hints": [
     "Each road increases the degree of both cities by 1.",
     "With equal degrees, choose the city with the smaller name."
    ],
    "check": {
     "tests": "\n_r = [('Алматы', 'Қонаев'), ('Алматы', 'Талдықорған'), ('Қонаев', 'Талдықорған'), ('Астана', 'Қарағанды')]\nassert busiest_city(_r) == 'Алматы', \"Almaty, Konayev, Taldykorgan: degree 2, the smallest name is 'Алматы'\"\nassert busiest_city([]) is None, 'No roads: None'\nassert busiest_city([('Б', 'А')]) == 'А', \"Equal degree: 'А'\"\nassert busiest_city([('Орал', 'Атырау'), ('Ақтөбе', 'Атырау'), ('Ақтау', 'Атырау')]) == 'Атырау', \"'Атырау' with degree 3\"\n"
    }
   },
   {
    "title": "Is there a path",
    "prompt": "<p>Given <code>n</code> stops (<code>0..n−1</code>) and two-way roads <code>edges</code>. Function <code>has_path(n, edges, s, t)</code>: if one can get from <code>s</code> to <code>t</code>, return <code>True</code>. Use BFS or DFS (do not forget <code>visited</code>).</p>\n<pre><code>has_path(4, [(0, 1), (1, 2)], 0, 2) → True\nhas_path(4, [(0, 1), (1, 2)], 0, 3) → False</code></pre>",
    "hints": [
     "Build the list of neighbours (in both directions).",
     "If during BFS you reach <code>t</code>, return <code>True</code>."
    ],
    "check": {
     "tests": "\nassert has_path(4, [(0, 1), (1, 2)], 0, 2) is True, '0 → 1 → 2: True'\nassert has_path(4, [(0, 1), (1, 2)], 0, 3) is False, '3 is isolated: False'\nassert has_path(1, [], 0, 0) is True, 's = t: True'\nassert has_path(3, [(0, 1), (1, 0), (1, 2)], 2, 0) is True, 'Two-way: 2 → 1 → 0'\n_n = 100000; _e = [(i, i + 1) for i in range(_n - 1)]\nassert has_path(_n, _e, 0, _n - 1) is True, 'A chain of 100 000 vertices: True (no recursion, use a stack or a queue)'\n"
    }
   },
   {
    "title": "Vertices at exactly k steps",
    "prompt": "<p>A social network: <code>adj</code> is a dictionary «person → list of friends» (two-way). Function <code>at_distance(adj, start, k)</code> must return the sorted list of people whose shortest distance from <code>start</code> is <b>exactly</b> <code>k</code>. BFS.</p>\n<pre><code>adj = {'Ата': ['Бек', 'Сая'], 'Бек': ['Ата', 'Дос'], 'Сая': ['Ата', 'Дос'], 'Дос': ['Бек', 'Сая', 'Ерж'], 'Ерж': ['Дос']}\nat_distance(adj, 'Ата', 2) → ['Дос']\nat_distance(adj, 'Ата', 0) → ['Ата']</code></pre>",
    "hints": [
     "The <code>bfs_dist</code> from the lesson: the dictionary <code>dist</code>.",
     "The result: the vertices at distance <code>dist[v] == k</code>, sorted."
    ],
    "check": {
     "tests": "\n_adj = {'Ата': ['Бек', 'Сая'], 'Бек': ['Ата', 'Дос'], 'Сая': ['Ата', 'Дос'], 'Дос': ['Бек', 'Сая', 'Ерж'], 'Ерж': ['Дос']}\nassert at_distance(_adj, 'Ата', 2) == ['Дос'], \"A friend — 2 steps (by both paths): ['Дос']\"\nassert at_distance(_adj, 'Ата', 0) == ['Ата'], \"k = 0: ['Ата']\"\nassert at_distance(_adj, 'Ата', 1) == ['Бек', 'Сая'], \"k = 1: ['Бек', 'Сая']\"\nassert at_distance(_adj, 'Ата', 3) == ['Ерж'], \"k = 3: ['Ерж']\"\nassert at_distance(_adj, 'Ата', 9) == [], 'No one that far away: []'\nassert at_distance({'Жан': []}, 'Жан', 1) == [], 'A person with no friends: []'\n"
    }
   },
   {
    "title": "Split into two groups",
    "prompt": "<p>In a football tournament there are <code>n</code> teams (<code>0..n−1</code>), and <code>edges</code> are pairs of teams that play each other. All teams must be split into two leagues so that every game is between teams from <b>different</b> leagues. Function <code>can_split(n, edges)</code> must return <code>True</code> if this is possible (the graph is bipartite). Colour each component with BFS in colours 0 and 1; if a neighbour has the same colour — <code>False</code>.</p>\n<pre><code>can_split(4, [(0, 1), (1, 2), (2, 3), (3, 0)]) → True\ncan_split(3, [(0, 1), (1, 2), (2, 0)])         → False</code></pre>",
    "hints": [
     "<code>color = [-1] * n</code>; start a new BFS from every uncoloured vertex (the graph may be disconnected).",
     "Give the neighbour <code>1 − color[u]</code>; if an already coloured neighbour has the same colour — a conflict."
    ],
    "check": {
     "tests": "\nassert can_split(4, [(0, 1), (1, 2), (2, 3), (3, 0)]) is True, 'An even cycle: True'\nassert can_split(3, [(0, 1), (1, 2), (2, 0)]) is False, 'An odd cycle: False'\nassert can_split(1, []) is True, 'One team: True'\nassert can_split(5, [(0, 1), (2, 3), (3, 4), (4, 2)]) is False, 'An odd cycle in the second component: False'\nassert can_split(2, [(0, 0)]) is False, 'A game with itself: False'\nassert can_split(6, [(0, 1), (2, 3), (4, 5)]) is True, 'Several components: True'\n"
    }
   },
   {
    "title": "Cycle in a directed graph",
    "prompt": "<p>There are dependencies between tasks: <code>(a, b)</code> is an edge «from <code>a</code> to <code>b</code>». Function <code>has_cycle(n, edges)</code> must return <code>True</code> if the directed graph has a cycle. Use DFS with three colours: 0 — not visited, 1 — currently on the stack (on the path), 2 — fully processed. If we come back to a vertex of colour 1 — a cycle. Beware of deep recursion: <code>n</code> up to 10 000.</p>\n<pre><code>has_cycle(3, [(0, 1), (1, 2), (2, 0)]) → True\nhas_cycle(3, [(0, 1), (0, 2), (1, 2)]) → False</code></pre>",
    "hints": [
     "Unlike an undirected graph, reaching an already finished vertex (colour 2) is not a cycle.",
     "Iterative DFS: keep the pairs <code>(төбе, келесі көршінің индексі)</code> on the stack."
    ],
    "check": {
     "tests": "\nassert has_cycle(3, [(0, 1), (1, 2), (2, 0)]) is True, '0 → 1 → 2 → 0: True'\nassert has_cycle(3, [(0, 1), (0, 2), (1, 2)]) is False, 'A diamond shape, no cycle: False'\nassert has_cycle(1, [(0, 0)]) is True, 'An edge to itself: True'\nassert has_cycle(4, []) is False, 'No edges: False'\nassert has_cycle(4, [(0, 1), (2, 3), (3, 2)]) is True, 'A cycle in the second component: True'\nassert has_cycle(2, [(0, 1), (0, 1)]) is False, 'A repeated edge is not a cycle'\n_n = 10000; _e = [(i, i + 1) for i in range(_n - 1)]\nassert has_cycle(_n, _e) is False, 'A chain of 10 000 vertices: False (do not exceed the recursion limit)'\nassert has_cycle(_n, _e + [(_n - 1, 0)]) is True, 'If the end of the chain is joined to its start: True'\n"
    }
   },
   {
    "title": "Is it a tree?",
    "prompt": "<p>There are <code>n</code> villages and <code>edges</code> two-way roads. Is the road network a <b>tree</b>: all villages connected and no cycles? Return <code>is_tree(n, edges)</code>. Tip: a tree has exactly <code>n − 1</code> edges; if the count is right, it is enough to check connectivity with BFS.</p>\n<pre><code>is_tree(5, [(0, 1), (0, 2), (0, 3), (1, 4)]) → True\nis_tree(5, [(0, 1), (1, 2), (2, 3), (1, 3), (1, 4)]) → False</code></pre>",
    "hints": [
     "First <code>len(edges) == n − 1</code>.",
     "BFS from vertex 0: if all <code>n</code> vertices are reached — it is a tree."
    ],
    "check": {
     "tests": "\nassert is_tree(5, [(0, 1), (0, 2), (0, 3), (1, 4)]) is True, 'A tree: True'\nassert is_tree(5, [(0, 1), (1, 2), (2, 3), (1, 3), (1, 4)]) is False, 'There is a cycle: False'\nassert is_tree(1, []) is True, 'One village: True'\nassert is_tree(2, []) is False, 'Not connected: False'\nassert is_tree(4, [(0, 1), (1, 0), (2, 3)]) is False, 'n − 1 edges, but not connected: False'\nassert is_tree(3, [(0, 1), (1, 2), (0, 2)]) is False, 'Too many edges: False'\n"
    }
   },
   {
    "title": "Word ladder",
    "prompt": "<p>Going from the word <code>begin</code> to the word <code>end</code>, we change one letter per step; every intermediate word must be in the dictionary <code>words</code> (<code>begin</code> may not be in the dictionary). Function <code>ladder_length(begin, end, words)</code> must return the number of words in the chain (including both ends), or 0 if the path is impossible. BFS: to find neighbours, put each letter in each position and check whether the result is in <code>set</code>.</p>\n<pre><code>ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']) → 5\n# hit → hot → dot → dog → cog\nladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])        → 0</code></pre>",
    "hints": [
     "Each word is a vertex; words that differ by one letter are neighbours.",
     "Take the set of letters from the dictionary as the alphabet: then Cyrillic works too."
    ],
    "check": {
     "tests": "\nassert ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']) == 5, 'Expected 5'\nassert ladder_length('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']) == 0, 'end is not in the dictionary: 0'\nassert ladder_length('қар', 'тар', ['тар']) == 2, \"қар → тар: 2\"\nassert ladder_length('ат', 'ит', ['ақ', 'ик']) == 0, 'No path: 0'\nassert ladder_length('ат', 'ит', ['ит', 'ат']) == 2, 'Even if begin is in the dictionary: 2'\nassert ladder_length('кел', 'кел', ['кел']) == 1, 'begin = end: 1'\nassert ladder_length('тау', 'сай', ['тай', 'сау', 'сай']) == 3, 'тау → тай → сай: 3'\n"
    }
   },
   {
    "title": "Knight's moves",
    "prompt": "<p>On a chessboard <code>n × n</code>, what is the smallest number of moves for a knight to get from the square <code>start = (r, c)</code> to <code>target</code>? Function <code>knight_moves(n, start, target)</code> must return this number; if it is impossible to get there — <code>-1</code>. The knight moves in an «L» shape: 8 directions <code>(±1, ±2)</code>, <code>(±2, ±1)</code>. The board is a graph, BFS.</p>\n<pre><code>knight_moves(8, (0, 0), (7, 7)) → 6\nknight_moves(8, (0, 0), (0, 0)) → 0\nknight_moves(2, (0, 0), (1, 1)) → -1</code></pre>",
    "hints": [
     "Write the eight moves as tuples.",
     "Check the board's edges and enter each cell once; the case <code>start == target</code> — the answer 0."
    ],
    "check": {
     "tests": "\nassert knight_moves(8, (0, 0), (7, 7)) == 6, 'On an 8×8 board from corner to corner: 6'\nassert knight_moves(8, (0, 0), (0, 0)) == 0, 'One cell: 0'\nassert knight_moves(2, (0, 0), (1, 1)) == -1, 'On a 2×2 board the knight cannot move: -1'\nassert knight_moves(3, (0, 0), (1, 1)) == -1, 'On a 3×3 board the centre cannot be reached: -1'\nassert knight_moves(8, (0, 0), (1, 2)) == 1, 'One move'\nassert knight_moves(8, (0, 0), (1, 1)) == 4, '(0, 0) → (1, 1): 4'\nassert knight_moves(1, (0, 0), (0, 0)) == 0, 'A 1×1 board: 0'\nassert knight_moves(100, (0, 0), (99, 99)) == 66, '100×100: 66'\n"
    }
   }
  ]
 },
 "dsa-13": {
  "pr": [
   {
    "title": "Tribonacci numbers",
    "prompt": "<p><code>T(0) = 0, T(1) = 1, T(2) = 1</code>, and <code>T(n) = T(n−1) + T(n−2) + T(n−3)</code>. Compute <code>trib(n)</code> with DP in O(n) time (plain recursion is exponential!). <code>n</code> — up to 1000.</p>\n<pre><code>trib(4)  → 4\ntrib(25) → 1389537</code></pre>",
    "hints": [
     "It is enough to keep only the last three values.",
     "<code>a, b, c = b, c, a + b + c</code>."
    ],
    "check": {
     "tests": "\nassert trib(0) == 0 and trib(1) == 1 and trib(2) == 1, 'Initial values: 0, 1, 1'\nassert trib(3) == 2, 'trib(3) must return 2'\nassert trib(4) == 4, 'trib(4) must return 4'\nassert trib(25) == 1389537, 'trib(25) must return 1389537'\n_v = [0, 1, 1]\nfor _ in range(997):\n    _v.append(_v[-1] + _v[-2] + _v[-3])\nassert trib(999) == _v[999], 'trib(999) is computed incorrectly'\n"
    }
   },
   {
    "title": "Non-adjacent days",
    "prompt": "<p>The profit on fair days is <code>income[i]</code>, but two days in a row cannot be worked. Function <code>best_income(income)</code> must return the largest total profit. DP: <code>dp[i] = max(dp[i−1], dp[i−2] + income[i])</code>. An empty list — 0.</p>\n<pre><code>best_income([2, 7, 9, 3, 1]) → 12    # 2 + 9 + 1\nbest_income([5, 1, 1, 5])    → 10</code></pre>",
    "hints": [
     "Two variables: 'the best result up to the previous day' and 'the best result up to the day before that'."
    ],
    "check": {
     "tests": "\nassert best_income([2, 7, 9, 3, 1]) == 12, 'Expected 12'\nassert best_income([5, 1, 1, 5]) == 10, 'Expected 10 (the first and the last day)'\nassert best_income([]) == 0, 'Empty list: 0'\nassert best_income([4]) == 4, 'One day: 4'\nassert best_income([1, 2]) == 2, 'Two days: 2'\nimport random as _random\nfrom itertools import product as _prod\n_rng = _random.Random(5)\nfor _ in range(30):\n    _a = [_rng.randint(0, 20) for _ in range(_rng.randint(0, 10))]\n    _exp = max(sum(x for x, m in zip(_a, mask) if m) for mask in _prod([0, 1], repeat=len(_a)) if all(not (p and q) for p, q in zip(mask, mask[1:])))\n    assert best_income(_a) == _exp, f'best_income({_a}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Cost of a staircase",
    "prompt": "<p><code>cost[i]</code> is the cost of stepping onto step <code>i</code>. You may start from step 0 or step 1, and at each move you climb 1 or 2 steps. The smallest cost to reach the top (the place after the last step): <code>min_climb_cost(cost)</code>. <code>dp[i] = cost[i] + min(dp[i−1], dp[i−2])</code>.</p>\n<pre><code>min_climb_cost([10, 15, 20])                         → 15\nmin_climb_cost([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) → 6</code></pre>",
    "hints": [
     "The top can be reached from the last or the second-to-last step: the answer <code>min(dp[n−1], dp[n−2])</code>."
    ],
    "check": {
     "tests": "\nassert min_climb_cost([10, 15, 20]) == 15, 'Expected 15'\nassert min_climb_cost([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6, 'Expected 6'\nassert min_climb_cost([5, 3]) == 3, 'Two steps: 3'\nassert min_climb_cost([0, 0, 0]) == 0, 'Free steps: 0'\nassert min_climb_cost([7]) == 0, 'One step: we start from step 1 (the top), 0'\n"
    }
   },
   {
    "title": "Number of ways to make change with coins",
    "prompt": "<p>Function <code>coin_ways(coins, amount)</code> must return in how many <b>ways</b> <code>amount</code> tenge can be collected from coins of denominations <code>coins</code> (each denomination any number of times). The order does not matter: <code>1+2</code> and <code>2+1</code> are one way. DP: the outer loop is over the coins, the inner loop over the sums.</p>\n<pre><code>coin_ways([1, 2, 5], 5) → 4\ncoin_ways([2], 3)       → 0\ncoin_ways([10], 0)      → 1</code></pre>",
    "hints": [
     "<code>dp[0] = 1</code> — the empty set.",
     "If the coins are in the outer loop, each set is counted once (the order is not taken into account)."
    ],
    "check": {
     "tests": "\nassert coin_ways([1, 2, 5], 5) == 4, 'Expected 4'\nassert coin_ways([2], 3) == 0, 'It cannot be collected: 0'\nassert coin_ways([10], 0) == 1, 'amount = 0: one way (take nothing)'\nassert coin_ways([], 0) == 1 and coin_ways([], 5) == 0, 'No coins'\nassert coin_ways([1, 2], 4) == 3, '1111, 112, 22: 3'\ndef _ref(cs, a, i=0):\n    if a == 0: return 1\n    if i == len(cs) or a < 0: return 0\n    return _ref(cs, a - cs[i], i) + _ref(cs, a, i + 1)\nfor _c, _a in [([2, 3, 7], 20), ([1, 3, 4], 12), ([5, 10], 30)]:\n    assert coin_ways(_c, _a) == _ref(_c, _a), f'coin_ways({_c}, {_a}) {_ref(_c, _a)} болуы керек'\n"
    }
   },
   {
    "title": "Paths in a grid with obstacles",
    "prompt": "<p>City map: <code>grid[i][j] == 1</code> — the road is closed, <code>0</code> — open. A courier goes from the top-left corner to the bottom-right corner, moving only <b>right</b> or <b>down</b>. Function <code>count_paths(grid)</code> must return the number of different paths (if one of the corners is closed — 0). DP: <code>dp[i][j] = dp[i−1][j] + dp[i][j−1]</code>.</p>\n<pre><code>count_paths([[0, 0, 0],\n             [0, 1, 0],\n             [0, 0, 0]]) → 2</code></pre>",
    "hints": [
     "A one-dimensional array <code>dp</code> is enough: <code>dp[j]</code> — from the cell above, <code>dp[j−1]</code> — from the cell on the left.",
     "In a closed cell <code>dp[j] = 0</code>."
    ],
    "check": {
     "tests": "\nassert count_paths([[0, 0, 0], [0, 1, 0], [0, 0, 0]]) == 2, 'Expected 2'\nassert count_paths([[0]]) == 1, 'One cell: 1'\nassert count_paths([[1]]) == 0, 'The start is closed: 0'\nassert count_paths([[0, 0], [0, 1]]) == 0, 'The end is closed: 0'\nassert count_paths([[0, 1], [1, 0]]) == 0, 'No path: 0'\nassert count_paths([[0] * 5 for _ in range(5)]) == 70, 'An empty 5×5 grid: C(8, 4) = 70'\nassert count_paths([[0, 0, 0, 0]]) == 1, 'One row: 1'\nassert count_paths([[0] * 18 for _ in range(18)]) == 2333606220, 'An empty 18×18 grid: C(34, 17)'\n"
    }
   },
   {
    "title": "Longest common subsequence",
    "prompt": "<p>Function <code>lcs(a, b)</code> must return the length of the longest common subsequence of two strings (characters in the same order, but not necessarily adjacent). 2D DP: if <code>a[i] == b[j]</code>, then <code>dp[i+1][j+1] = dp[i][j] + 1</code>, otherwise <code>max(dp[i][j+1], dp[i+1][j])</code>. O(n·m).</p>\n<pre><code>lcs('abcde', 'ace') → 3\nlcs('абай', 'абылай') → 4\nlcs('abc', 'def')   → 0</code></pre>",
    "hints": [
     "<code>dp[i][j]</code> — the answer for <code>a[:i]</code> and <code>b[:j]</code>; <code>dp[0][*] = dp[*][0] = 0</code>.",
     "To save memory, it is enough to keep only the previous row."
    ],
    "check": {
     "tests": "\nassert lcs('abcde', 'ace') == 3, 'Expected 3'\nassert lcs('абай', 'абылай') == 4, 'Expected 4 (а, б, а, й)'\nassert lcs('abc', 'def') == 0, 'No common character: 0'\nassert lcs('', 'abc') == 0, 'Empty string: 0'\nassert lcs('aaa', 'aa') == 2, 'Expected 2'\nimport random as _random, time as _time\n_rng = _random.Random(6)\ndef _ref(a, b):\n    from functools import lru_cache\n    @lru_cache(None)\n    def f(i, j):\n        if i == len(a) or j == len(b): return 0\n        if a[i] == b[j]: return 1 + f(i + 1, j + 1)\n        return max(f(i + 1, j), f(i, j + 1))\n    return f(0, 0)\nfor _ in range(30):\n    _a = ''.join(_rng.choice('абв') for _ in range(_rng.randint(0, 9)))\n    _b = ''.join(_rng.choice('абв') for _ in range(_rng.randint(0, 9)))\n    assert lcs(_a, _b) == _ref(_a, _b), f'lcs({_a!r}, {_b!r}) {_ref(_a, _b)} болуы керек'\n_a = ''.join(_rng.choice('ACGT') for _ in range(600)); _b = ''.join(_rng.choice('ACGT') for _ in range(600))\n_t0 = _time.perf_counter(); lcs(_a, _b); _dt = _time.perf_counter() - _t0\nassert _dt < 3.0, f'600×600 took {_dt:.2f} s: an O(n·m) DP is needed'\n"
    }
   },
   {
    "title": "Word break",
    "prompt": "<p>A message written without spaces: <code>s</code>, and a dictionary <code>words</code>. Function <code>can_split(s, words)</code>: if <code>s</code> can be fully split into words from the dictionary (words may be reused), return <code>True</code>. DP: <code>dp[i]</code> — can the prefix of length <code>s[:i]</code> be split; <code>dp[i] = True</code>, if there are <code>dp[j]</code> and <code>s[j:i]</code> such that <code>j</code> is in the dictionary. Put the dictionary into <code>set</code>.</p>\n<pre><code>can_split('алмаағаш', ['алма', 'ағаш'])         → True\ncan_split('қызылорда', ['қызыл', 'орда', 'қыз']) → True\ncan_split('ақсай', ['ақ', 'сары'])               → False</code></pre>",
    "hints": [
     "<code>dp[0] = True</code> — the empty prefix.",
     "To speed up the check, consider only the lengths of the words in the dictionary."
    ],
    "check": {
     "tests": "\nassert can_split('алмаағаш', ['алма', 'ағаш']) is True, \"can_split('алмаағаш', ...) True\"\nassert can_split('қызылорда', ['қызыл', 'орда', 'қыз']) is True, \"can_split('қызылорда', ...) True\"\nassert can_split('ақсай', ['ақ', 'сары']) is False, \"can_split('ақсай', ...) False\"\nassert can_split('', ['а']) is True, 'Empty string: True'\nassert can_split('aaaa', ['aa']) is True, 'A word can be repeated'\nassert can_split('aaa', ['aa']) is False, \"can_split('aaa', ['aa']) False\"\nassert can_split('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']) is False, 'catsandog: False'\nimport time as _time\n_s = 'a' * 400 + 'b'\n_t0 = _time.perf_counter(); _r = can_split(_s, ['a', 'aa', 'aaa', 'aaaa', 'aaaaa']); _dt = _time.perf_counter() - _t0\nassert _r is False and _dt < 1.0, f'Not exponential recursion: a DP is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Largest square",
    "prompt": "<p>A field map: <code>'1'</code> is fertile land, <code>'0'</code> is rocky land (a list of rows). Function <code>max_square(grid)</code> must return the <b>area</b> of the largest square consisting only of fertile land. DP: <code>dp[i][j]</code> is the side of the largest square whose bottom-right corner is at <code>(i, j)</code>; <code>dp[i][j] = 1 + min(жоғарғы, сол, сол-жоғарғы)</code>.</p>\n<pre><code>max_square(['10100',\n            '10111',\n            '11111',\n            '10010']) → 4</code></pre>",
    "hints": [
     "A table <code>(R+1) × (C+1)</code> with zeros on the edges saves you from checking the boundaries.",
     "The answer is the square of the side."
    ],
    "check": {
     "tests": "\nassert max_square(['10100', '10111', '11111', '10010']) == 4, 'Expected 4'\nassert max_square(['0']) == 0, 'No fertile land: 0'\nassert max_square(['1']) == 1, 'One cell: 1'\nassert max_square(['11', '11']) == 4, '2×2 fully: 4'\nassert max_square(['01', '10']) == 1, 'A diagonal is not a square: 1'\nassert max_square(['1111', '1111', '1101']) == 4, '3×3 not fully: 4'\nimport random as _random\n_rng = _random.Random(7)\nfor _ in range(20):\n    _R, _C = _rng.randint(1, 6), _rng.randint(1, 6)\n    _g = [''.join(_rng.choice('1110') for _ in range(_C)) for _ in range(_R)]\n    _best = 0\n    for _i in range(_R):\n        for _j in range(_C):\n            _k = 1\n            while _i + _k <= _R and _j + _k <= _C and all(_g[a][b] == '1' for a in range(_i, _i + _k) for b in range(_j, _j + _k)):\n                _best = max(_best, _k); _k += 1\n    assert max_square(_g) == _best * _best, f'{_g} үшін күтілгені {_best * _best}'\n"
    }
   }
  ]
 },
 "dsa-p1": {
  "pr": [
   {
    "title": "The Number Without a Pair",
    "prompt": "<p>Numbered tickets from the cloakroom were returned in pairs, and only one number was left without a pair. Function <code>single(nums)</code>: in the list, every number appears exactly twice except one, which appears once; return it. O(n) time, O(1) memory: use the XOR (<code>^</code>) operation — <code>x ^ x = 0</code>, <code>x ^ 0 = x</code>.</p>\n<pre><code>single([4, 1, 2, 1, 2]) → 4\nsingle([7])             → 7</code></pre>",
    "hints": [
     "Apply XOR to all the numbers: the pairs will cancel each other out."
    ],
    "check": {
     "tests": "\nassert single([4, 1, 2, 1, 2]) == 4, 'Expected 4'\nassert single([7]) == 7, 'One number: 7'\nassert single([-3, 5, 5]) == -3, 'Negative number: -3'\nassert single([0, 9, 9]) == 0, 'The single number can be 0'\n_big = list(range(1, 50001)) * 2 + [123456]\nassert single(_big) == 123456, 'Big test: 123456'\n"
    }
   },
   {
    "title": "Balance Index",
    "prompt": "<p><code>balance_index(nums)</code> must return the smallest index such that the sum of the elements to its left equals the sum of the elements to its right (the element at the index itself is not included on either side; the sum of an empty side is 0). If there is no such index, return <code>-1</code>. Prefix sum: O(n).</p>\n<pre><code>balance_index([1, 7, 3, 6, 5, 6]) → 3    # 1+7+3 = 11 = 5+6\nbalance_index([1, 2, 3])          → -1\nbalance_index([2, 1, -1])         → 0</code></pre>",
    "hints": [
     "If the total sum <code>total</code> is known, then the right side = <code>total − left − nums[i]</code>."
    ],
    "check": {
     "tests": "\nassert balance_index([1, 7, 3, 6, 5, 6]) == 3, 'Expected 3'\nassert balance_index([1, 2, 3]) == -1, 'No such index: -1'\nassert balance_index([2, 1, -1]) == 0, 'Left side empty (0) = 1 + (-1): 0'\nassert balance_index([]) == -1, 'Empty list: -1'\nassert balance_index([5]) == 0, 'One element: both sides are 0'\nassert balance_index([0, 0, 0]) == 0, 'Smallest index: 0'\nimport time as _time\n_big = [1] * 100001\n_t0 = _time.perf_counter(); _r = balance_index(_big); _dt = _time.perf_counter() - _t0\nassert _r == 50000 and _dt < 1.0, f'Big test: 50000, O(n) ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Add One to a Number",
    "prompt": "<p>A large number is given as a list of digits (the first one is the most significant). <code>plus_one(digits)</code> must return the number plus 1, again as a list of digits. Do not convert the number to <code>int</code>: go from the end and carry over.</p>\n<pre><code>plus_one([1, 2, 9]) → [1, 3, 0]\nplus_one([9, 9])    → [1, 0, 0]\nplus_one([0])       → [1]</code></pre>",
    "hints": [
     "Turn the trailing 9s into 0s, then add 1 to the first digit that is not 9.",
     "If all the digits are 9, a 1 is added at the front."
    ],
    "check": {
     "tests": "\nassert plus_one([1, 2, 9]) == [1, 3, 0], 'Expected [1, 3, 0]'\nassert plus_one([9, 9]) == [1, 0, 0], 'Expected [1, 0, 0]'\nassert plus_one([0]) == [1], 'Expected [1]'\nassert plus_one([4, 3, 2, 1]) == [4, 3, 2, 2], 'Expected [4, 3, 2, 2]'\n_d = [1, 9]; plus_one(_d)\nassert _d == [1, 9], 'Do not change the original list'\nassert plus_one([9] * 1000) == [1] + [0] * 1000, '1000 nines: 1 and 1000 zeros'\n"
    }
   },
   {
    "title": "Best Profit Period",
    "prompt": "<p><code>profit[i]</code> is the store's profit on day <code>i</code> (a negative value is a loss). <code>max_period(profit)</code> must return the largest total profit of a contiguous non-empty period of days. Kadane's algorithm: O(n) — if the current sum is negative, start again.</p>\n<pre><code>max_period([-2, 1, -3, 4, -1, 2, 1, -5, 4]) → 6     # 4, -1, 2, 1\nmax_period([-3, -1, -2])                    → -1</code></pre>",
    "hints": [
     "<code>cur = max(x, cur + x)</code> is the best period that ends on this day.",
     "Initial value <code>profit[0]</code>: correct even if all the values are negative."
    ],
    "check": {
     "tests": "\nassert max_period([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6, 'Expected 6'\nassert max_period([-3, -1, -2]) == -1, 'All negative: the smallest loss is -1'\nassert max_period([5]) == 5, 'One day: 5'\nassert max_period([5, 4, -1, 7, 8]) == 23, 'All days: 23'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _a = [_rng.randint(-10, 10) for _ in range(_rng.randint(1, 12))]\n    _exp = max(sum(_a[i:j]) for i in range(len(_a)) for j in range(i + 1, len(_a) + 1))\n    assert max_period(_a) == _exp, f'max_period({_a}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); max_period(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: O(n) Kadane is needed'\n"
    }
   },
   {
    "title": "Spiral Traversal",
    "prompt": "<p><code>spiral(matrix)</code> must return the elements of the matrix in spiral order: the top row from left to right, the right column from top to bottom, the bottom row from right to left, the left column from bottom to top, then inward. The matrix may be rectangular; an empty matrix — <code>[]</code>. Four boundaries: <code>top, bottom, left, right</code>.</p>\n<pre><code>spiral([[1, 2, 3],\n        [4, 5, 6],\n        [7, 8, 9]]) → [1, 2, 3, 6, 9, 8, 7, 4, 5]\nspiral([[1, 2, 3, 4]]) → [1, 2, 3, 4]</code></pre>",
    "hints": [
     "After each loop, move the four boundaries inward.",
     "To avoid taking elements twice when only one row or one column is left, check <code>top &lt; bottom</code> and <code>left &lt; right</code>."
    ],
    "check": {
     "tests": "\nassert spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 2, 3, 6, 9, 8, 7, 4, 5], 'Expected [1, 2, 3, 6, 9, 8, 7, 4, 5]'\nassert spiral([[1, 2, 3, 4]]) == [1, 2, 3, 4], 'One row'\nassert spiral([[1], [2], [3]]) == [1, 2, 3], 'One column'\nassert spiral([]) == [], 'Empty matrix: []'\nassert spiral([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) == [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7], 'The 3×4 matrix is wrong'\nassert spiral([[1, 2], [3, 4], [5, 6]]) == [1, 2, 4, 6, 5, 3], 'The 3×2 matrix is wrong'\n_m = [[i * 7 + j for j in range(7)] for i in range(5)]\n_r = spiral(_m)\nassert sorted(_r) == list(range(35)) and _r[:8] == [0, 1, 2, 3, 4, 5, 6, 13], 'In a 5×7 matrix each element must appear once'\n"
    }
   },
   {
    "title": "A Row of Pascal's Triangle",
    "prompt": "<p><code>pascal_row(n)</code> must return row <code>n</code> of Pascal's triangle (counting from 0): each number is the sum of the two numbers above it, and the edge numbers are 1. Keep only one row in memory: O(n²) time, O(n) memory. Do not use the factorial formula.</p>\n<pre><code>pascal_row(0) → [1]\npascal_row(4) → [1, 4, 6, 4, 1]</code></pre>",
    "hints": [
     "Next row: <code>[1] + [row[i] + row[i+1] ...] + [1]</code>."
    ],
    "check": {
     "tests": "\nassert pascal_row(0) == [1], 'pascal_row(0) [1]'\nassert pascal_row(1) == [1, 1], 'pascal_row(1) [1, 1]'\nassert pascal_row(4) == [1, 4, 6, 4, 1], 'pascal_row(4) [1, 4, 6, 4, 1]'\nfrom math import comb as _comb\nassert pascal_row(30) == [_comb(30, k) for k in range(31)], 'pascal_row(30) is wrong'\nassert sum(pascal_row(60)) == 2 ** 60, 'The row sum must be 2^n'\n"
    }
   },
   {
    "title": "Periods Divisible by k",
    "prompt": "<p><code>count_divisible(nums, k)</code> must return the number of non-empty contiguous subarrays whose sum is divisible by <code>k</code> (remainder 0). Prefix sum + dictionary: if two prefixes have the same remainder when divided by <code>k</code>, the subarray between them is divisible by <code>k</code>. In Python, <code>%</code> gives a non-negative remainder even for negative numbers. O(n).</p>\n<pre><code>count_divisible([4, 5, 0, -2, -3, 1], 5) → 7\ncount_divisible([5], 9)                  → 0</code></pre>",
    "hints": [
     "<code>seen = {0: 1}</code> — the empty prefix.",
     "At each step: <code>total += seen.get(s, 0)</code>, then <code>seen[s] += 1</code>."
    ],
    "check": {
     "tests": "\nassert count_divisible([4, 5, 0, -2, -3, 1], 5) == 7, 'Expected 7'\nassert count_divisible([5], 9) == 0, 'Expected 0'\nassert count_divisible([], 3) == 0, 'Empty list: 0'\nassert count_divisible([3, 3, 3], 3) == 6, 'All 6 subarrays are divisible'\nassert count_divisible([-1, 1], 2) == 1, 'Negative numbers: [-1, 1] has sum 0'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = [_rng.randint(-10, 10) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 6)\n    _exp = sum(1 for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if sum(_a[i:j]) % _k == 0)\n    assert count_divisible(_a, _k) == _exp, f'count_divisible({_a}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-1000, 1000) for _ in range(100000)]\n_t0 = _time.perf_counter(); count_divisible(_big, 7); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: an O(n) solution is needed'\n"
    }
   },
   {
    "title": "Equal Votes Period",
    "prompt": "<p>At a polling station, the votes came in time order, each for candidate <code>'А'</code> or candidate <code>'Б'</code>. <code>longest_tie(votes)</code> must return the length of the longest contiguous period in which the two candidates received <b>equal</b> numbers of votes. Let <code>'А'</code> = +1 and <code>'Б'</code> = −1; store in a dictionary the <b>first</b> index at which each prefix sum value appears. O(n).</p>\n<pre><code>longest_tie('ААББА') → 4    # 'ААББ'\nlongest_tie('ААА')   → 0\nlongest_tie('АББААБ') → 6</code></pre>",
    "hints": [
     "<code>first = {0: -1}</code> — the empty prefix at index <code>-1</code>.",
     "If a prefix value was seen before, the length is <code>i − first[s]</code>; do not update the first index."
    ],
    "check": {
     "tests": "\nassert longest_tie('ААББА') == 4, 'Expected 4'\nassert longest_tie('ААА') == 0, 'No equal period: 0'\nassert longest_tie('АББААБ') == 6, 'Whole sequence: 6'\nassert longest_tie('') == 0, 'Empty: 0'\nassert longest_tie('АБ') == 2, 'Expected 2'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(40):\n    _v = ''.join(_rng.choice('АБ') for _ in range(_rng.randint(0, 14)))\n    _exp = max([j - i for i in range(len(_v)) for j in range(i + 1, len(_v) + 1) if _v[i:j].count('А') * 2 == j - i] + [0])\n    assert longest_tie(_v) == _exp, f'longest_tie({_v!r}) {_exp} болуы керек'\n_big = ''.join(_rng.choice('АБ') for _ in range(200000))\n_t0 = _time.perf_counter(); longest_tie(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: an O(n) solution is needed'\n"
    }
   }
  ]
 },
 "dsa-p2": {
  "pr": [
   {
    "title": "Next Greater Price",
    "prompt": "<p><code>next_greater(prices)</code> must return, for each day, the price of the <b>first</b> strictly higher price after it; if there is none, <code>-1</code>. Monotonic stack: keep in the stack the indices whose answer has not been found yet. O(n).</p>\n<pre><code>next_greater([2, 1, 2, 4, 3]) → [4, 2, 4, -1, -1]\nnext_greater([5, 5])          → [-1, -1]</code></pre>",
    "hints": [
     "If the new price is higher than the price at the top of the stack, the answer for that index is this price.",
     "An equal price is not “higher”: the comparison uses <code>&lt;</code>."
    ],
    "check": {
     "tests": "\nassert next_greater([2, 1, 2, 4, 3]) == [4, 2, 4, -1, -1], 'Expected [4, 2, 4, -1, -1]'\nassert next_greater([5, 5]) == [-1, -1], 'An equal price is not higher: [-1, -1]'\nassert next_greater([]) == [], 'Empty list: []'\nassert next_greater([1, 2, 3]) == [2, 3, -1], 'Increasing: [2, 3, -1]'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _a = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = [next((y for y in _a[i + 1:] if y > x), -1) for i, x in enumerate(_a)]\n    assert next_greater(_a) == _exp, f'next_greater({_a}) {_exp} болуы керек'\n_big = list(range(100000, 0, -1))\n_t0 = _time.perf_counter(); next_greater(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: O(n) with a monotonic stack is needed'\n"
    }
   },
   {
    "title": "Vowels in a Window",
    "prompt": "<p><code>max_vowels(s, k)</code> must return the largest number of vowels in substrings whose length is exactly <code>k</code>. Vowels are the Kazakh vowels <code>'аәеиоөұүыіэюяу'</code> and the Latin vowels <code>'aeiou'</code>. Fixed-size sliding window: add the character that enters the window and subtract the one that leaves. O(n). If <code>k &gt; len(s)</code>, the answer is 0.</p>\n<pre><code>max_vowels('қазақстан', 3) → 2\nmax_vowels('abciiidef', 3)  → 3</code></pre>",
    "hints": [
     "Count the vowels in the first <code>k</code> characters.",
     "At each step <code>s[i]</code> enters and <code>s[i − k]</code> leaves."
    ],
    "check": {
     "tests": "\nassert max_vowels('қазақстан', 3) == 2, \"max_vowels('қазақстан', 3) 2\"\nassert max_vowels('abciiidef', 3) == 3, \"max_vowels('abciiidef', 3) 3\"\nassert max_vowels('ттт', 2) == 0, 'No vowels: 0'\nassert max_vowels('аб', 5) == 0, 'k > len(s): 0'\nassert max_vowels('ауыл', 4) == 3, 'Whole string: 3'\nimport time as _time\n_s = 'бт' * 100000 + 'аа'\n_t0 = _time.perf_counter(); _r = max_vowels(_s, 1000); _dt = _time.perf_counter() - _t0\nassert _r == 2 and _dt < 1.0, f'Big test: 2 expected, an O(n) window is needed ({_dt:.2f} s)'\n"
    }
   },
   {
    "title": "Prerequisite Subjects",
    "prompt": "<p>The university has <code>n</code> subjects. <code>prereq</code> is a list of <code>(a, b)</code> pairs: “to take <code>b</code> you must first take <code>a</code>”. <code>starters(n, prereq)</code> must return the subjects that can be taken right away (no prerequisites, that is, in-degree 0) in increasing order. This is the first step of Kahn's algorithm.</p>\n<pre><code>starters(4, [(0, 1), (1, 2), (3, 2)]) → [0, 3]\nstarters(2, [])                       → [0, 1]</code></pre>",
    "hints": [
     "<code>indeg[b] += 1</code> for each <code>(a, b)</code>."
    ],
    "check": {
     "tests": "\nassert starters(4, [(0, 1), (1, 2), (3, 2)]) == [0, 3], 'Expected [0, 3]'\nassert starters(2, []) == [0, 1], 'No prerequisites: all of them'\nassert starters(3, [(0, 1), (1, 2), (2, 0)]) == [], 'Cycle: no subject to start with'\nassert starters(1, []) == [0], 'One subject: [0]'\nassert starters(3, [(0, 2), (1, 2), (0, 2)]) == [0, 1], 'Repeated edge: [0, 1]'\n"
    }
   },
   {
    "title": "Shortest Enough Period",
    "prompt": "<p><code>sales</code> are positive numbers (daily sales), and <code>target</code> is the plan. <code>min_days(sales, target)</code> must return the length of the shortest contiguous period whose sum is at least <code>target</code>; if there is none, 0. Sliding window: move the right boundary forward, and move the left boundary in while the sum is still large enough. O(n).</p>\n<pre><code>min_days([2, 3, 1, 2, 4, 3], 7) → 2     # [4, 3]\nmin_days([1, 1, 1], 5)          → 0</code></pre>",
    "hints": [
     "The numbers are positive: widening the window increases the sum and narrowing it decreases the sum, so the window approach works.",
     "When the sum is ≥ target, update the length and move the left boundary forward."
    ],
    "check": {
     "tests": "\nassert min_days([2, 3, 1, 2, 4, 3], 7) == 2, 'Expected 2'\nassert min_days([1, 1, 1], 5) == 0, 'Plan not met: 0'\nassert min_days([1, 4, 4], 4) == 1, 'One day is enough: 1'\nassert min_days([], 1) == 0, 'Empty list: 0'\nassert min_days([1, 2, 3], 6) == 3, 'All days: 3'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _a = [_rng.randint(1, 9) for _ in range(_rng.randint(0, 12))]; _t = _rng.randint(1, 40)\n    _c = [j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if sum(_a[i:j]) >= _t]\n    _exp = min(_c) if _c else 0\n    assert min_days(_a, _t) == _exp, f'min_days({_a}, {_t}) {_exp} болуы керек'\n_big = [_rng.randint(1, 100) for _ in range(200000)]\n_t0 = _time.perf_counter(); min_days(_big, 50000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} s: an O(n) window is needed'\n"
    }
   },
   {
    "title": "Units With k Swaps",
    "prompt": "<p>Each day the plan was fulfilled (<code>1</code>) or not fulfilled (<code>0</code>). The manager can correct at most <code>k</code> days to “fulfilled”. <code>longest_ones(days, k)</code> must return the length of the longest contiguous period of units after the correction. Sliding window: if the window has more than <code>k</code> zeros, move the left boundary forward.</p>\n<pre><code>longest_ones([1, 1, 0, 0, 1, 1, 1, 0, 1], 1) → 5\nlongest_ones([0, 0, 0], 0)                   → 0</code></pre>",
    "hints": [
     "Keep the count of zeros in the window.",
     "Move the left boundary until <code>zeros &gt; k</code>, then update the length."
    ],
    "check": {
     "tests": "\nassert longest_ones([1, 1, 0, 0, 1, 1, 1, 0, 1], 1) == 5, 'Expected 5'\nassert longest_ones([0, 0, 0], 0) == 0, 'No correction, no units: 0'\nassert longest_ones([0, 0, 0], 5) == 3, 'All of them can be corrected: 3'\nassert longest_ones([], 2) == 0, 'Empty list: 0'\nassert longest_ones([1, 1, 1], 0) == 3, 'No correction needed: 3'\nimport random as _random\n_rng = _random.Random(3)\nfor _ in range(40):\n    _a = [_rng.randint(0, 1) for _ in range(_rng.randint(0, 14))]; _k = _rng.randint(0, 3)\n    _exp = max([j - i for i in range(len(_a)) for j in range(i + 1, len(_a) + 1) if _a[i:j].count(0) <= _k] + [0])\n    assert longest_ones(_a, _k) == _exp, f'longest_ones({_a}, {_k}) {_exp} болуы керек'\n"
    }
   },
   {
    "title": "Price Span",
    "prompt": "<p><code>spans(prices)</code>: for each day, count how many consecutive days, going backwards and including today, had a price not higher than today's price (<code>≤</code>). Return these counts as a list. Monotonic stack: keep <code>(баға, аралық)</code> pairs in the stack and merge the smaller or equal prices.</p>\n<pre><code>spans([100, 80, 60, 70, 60, 75, 85]) → [1, 1, 1, 2, 1, 4, 6]</code></pre>",
    "hints": [
     "If the price at the top of the stack is ≤ today's price, add its span to today's span and remove it from the stack."
    ],
    "check": {
     "tests": "\nassert spans([100, 80, 60, 70, 60, 75, 85]) == [1, 1, 1, 2, 1, 4, 6], 'Expected [1, 1, 1, 2, 1, 4, 6]'\nassert spans([]) == [], 'Empty list: []'\nassert spans([5, 5, 5]) == [1, 2, 3], 'Equal prices are counted too: [1, 2, 3]'\nassert spans([3, 2, 1]) == [1, 1, 1], 'Decreasing prices: [1, 1, 1]'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(40):\n    _a = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = []\n    for _i in range(len(_a)):\n        _j = _i\n        while _j >= 0 and _a[_j] <= _a[_i]: _j -= 1\n        _exp.append(_i - _j)\n    assert spans(_a) == _exp, f'spans({_a}) {_exp} болуы керек'\n_big = list(range(100000))\n_t0 = _time.perf_counter(); spans(_big); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: an O(n) stack is needed'\n"
    }
   },
   {
    "title": "Alien Alphabet Order",
    "prompt": "<p>A dictionary in an unknown alphabet: <code>words</code> is sorted by that alphabet. <code>alien_order(words)</code> must return a string with all the letters that appear in the words, in the order of that alphabet. The first difference between two neighbouring words gives one ordering rule <code>a → b</code> for a pair of letters; use topological sort (Kahn). If several correct orders exist, make the answer unique: at each step always take the smallest letter in the queue (by Python's order) — <code>heapq</code>. If the rules contradict each other (a cycle), or a longer word comes before its own prefix — <code>''</code>.</p>\n<pre><code>alien_order(['wrt', 'wrf', 'er', 'ett', 'rftt']) → 'wertf'\nalien_order(['z', 'x', 'z'])                     → ''\nalien_order(['abc', 'ab'])                       → ''</code></pre>",
    "hints": [
     "It is enough to compare pairs of neighbouring words; stop after the first difference.",
     "Kahn: put the letters with in-degree 0 into a heap; if not all the letters come out at the end, there is a cycle."
    ],
    "check": {
     "tests": "\nassert alien_order(['wrt', 'wrf', 'er', 'ett', 'rftt']) == 'wertf', \"Expected 'wertf'\"\nassert alien_order(['z', 'x', 'z']) == '', \"Cycle: ''\"\nassert alien_order(['abc', 'ab']) == '', \"The prefix must come after: ''\"\nassert alien_order(['z', 'x']) == 'zx', \"Expected 'zx'\"\nassert alien_order(['ab', 'abc']) == 'abc', \"No restrictions: the letters in order 'abc'\"\nassert alien_order(['ба', 'бв', 'ав']) == 'бав', \"Expected 'бав'\"\nassert alien_order([]) == '', \"No words: ''\"\nassert alien_order(['c', 'b', 'a']) == 'cba', \"Expected 'cba'\"\n"
    }
   },
   {
    "title": "Longest Same-Letter Part",
    "prompt": "<p><code>longest_same(s, k)</code>: in the string we can replace at most <code>k</code> characters with any other character. After the replacements, return the length of the longest contiguous part made of identical characters. Sliding window: window length − count of the most frequent character in the window must be ≤ <code>k</code>. O(n · alphabet).</p>\n<pre><code>longest_same('ABAB', 2)    → 4\nlongest_same('AABABBA', 1) → 4\nlongest_same('', 3)        → 0</code></pre>",
    "hints": [
     "In the window we replace everything except the most frequent character: number of replacements = length − <code>top</code>.",
     "There is no need to decrease <code>top</code>: it only stops windows bigger than the answer from getting through."
    ],
    "check": {
     "tests": "\nassert longest_same('ABAB', 2) == 4, \"longest_same('ABAB', 2) 4\"\nassert longest_same('AABABBA', 1) == 4, \"longest_same('AABABBA', 1) 4\"\nassert longest_same('', 3) == 0, 'Empty string: 0'\nassert longest_same('ABC', 0) == 1, 'No replacement: 1'\nassert longest_same('ҚҚҚ', 0) == 3, 'All identical: 3'\nimport random as _random\n_rng = _random.Random(5)\nfor _ in range(40):\n    _s = ''.join(_rng.choice('АБВ') for _ in range(_rng.randint(0, 12))); _k = _rng.randint(0, 3)\n    _exp = max([j - i for i in range(len(_s)) for j in range(i + 1, len(_s) + 1) if (j - i) - max(_s[i:j].count(c) for c in 'АБВ') <= _k] + [0])\n    assert longest_same(_s, _k) == _exp, f'longest_same({_s!r}, {_k}) {_exp} болуы керек'\n"
    }
   }
  ]
 },
 "dsa-p3": {
  "pr": [
   {
    "title": "Nearest Smaller on the Left",
    "prompt": "<p><code>prev_smaller(a)</code> must return, for each element, the nearest strictly smaller element on its <b>left</b>; if there is none, <code>-1</code>. Monotonic stack: O(n).</p>\n<pre><code>prev_smaller([4, 5, 2, 10, 8]) → [-1, 4, -1, 2, 2]</code></pre>",
    "hints": [
     "Only values in increasing order stay on the stack: remove the elements that are greater than or equal to the new one."
    ],
    "check": {
     "tests": "\nassert prev_smaller([4, 5, 2, 10, 8]) == [-1, 4, -1, 2, 2], 'Expected [-1, 4, -1, 2, 2]'\nassert prev_smaller([]) == [], 'Empty list: []'\nassert prev_smaller([3, 3]) == [-1, -1], 'An equal element is not smaller: [-1, -1]'\nimport random as _random, time as _time\n_rng = _random.Random(1)\nfor _ in range(40):\n    _x = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]\n    _exp = [next((y for y in reversed(_x[:i]) if y < v), -1) for i, v in enumerate(_x)]\n    assert prev_smaller(_x) == _exp, f'prev_smaller({_x}) {_exp} болуы керек'\n_big = list(range(100000))\n_t0 = _time.perf_counter(); prev_smaller(_big[::-1]); _dt = _time.perf_counter() - _t0\nassert _dt < 1.0, f'{_dt:.2f} s: O(n) with a stack is needed'\n"
    }
   },
   {
    "title": "Message Spread Time",
    "prompt": "<p>The network has <code>n</code> servers (<code>1..n</code>), <code>times</code> — <code>(u, v, w)</code> links: a message from <code>u</code> to <code>v</code> reaches it in <code>w</code> ms (the links are one-way). The message starts from server <code>k</code>. <code>delay(times, n, k)</code> must return the time needed to reach all the servers (the shortest distance to the farthest server); if some server cannot be reached, <code>-1</code>. Dijkstra + <code>heapq</code>.</p>\n<pre><code>delay([(2, 1, 1), (2, 3, 1), (3, 4, 1)], 4, 2) → 2\ndelay([(1, 2, 1)], 2, 2)                     → -1</code></pre>",
    "hints": [
     "When a vertex is taken from the heap for the first time, its distance is final.",
     "The answer is the maximum of the distances; if one of them is undefined — <code>-1</code>."
    ],
    "check": {
     "tests": "\nassert delay([(2, 1, 1), (2, 3, 1), (3, 4, 1)], 4, 2) == 2, 'Expected 2'\nassert delay([(1, 2, 1)], 2, 2) == -1, 'No path from 2 to 1: -1'\nassert delay([(1, 2, 1)], 2, 1) == 1, 'Expected 1'\nassert delay([], 1, 1) == 0, 'One server: 0'\nassert delay([(1, 2, 10), (1, 3, 1), (3, 2, 2)], 3, 1) == 3, 'A shorter detour: 3'\n"
    }
   },
   {
    "title": "Houses with a Sea View",
    "prompt": "<p>Along the coast the houses stand from left to right, and the sea is on the right. A house sees the sea if all the houses to its right are strictly lower than it. <code>sea_view(heights)</code> must return the indices of the houses that see the sea, in increasing order. Walk once from right to left, keeping the maximum (or use a monotonic stack).</p>\n<pre><code>sea_view([4, 2, 3, 1]) → [0, 2, 3]\nsea_view([1, 3, 2, 4]) → [3]\nsea_view([2, 2, 2])    → [2]</code></pre>",
    "hints": [
     "From right to left: if a house is strictly taller than the current maximum, it sees the sea."
    ],
    "check": {
     "tests": "\nassert sea_view([4, 2, 3, 1]) == [0, 2, 3], 'Expected [0, 2, 3]'\nassert sea_view([1, 3, 2, 4]) == [3], 'Expected [3]'\nassert sea_view([2, 2, 2]) == [2], 'Equal height blocks the view: [2]'\nassert sea_view([]) == [], 'No houses: []'\nassert sea_view([5]) == [0], 'One house: [0]'\n"
    }
   },
   {
    "title": "Bounded Deviation Window",
    "prompt": "<p>The sensor readings are <code>a</code>. <code>longest_stable(a, limit)</code> must return the length of the longest contiguous period in which the difference between the maximum and the minimum does not exceed <code>limit</code>. Use two monotonic deques: one for maximums (decreasing) and one for minimums (increasing). O(n).</p>\n<pre><code>longest_stable([8, 2, 4, 7], 4)            → 2\nlongest_stable([10, 1, 2, 4, 7, 2], 5)     → 4    # [2, 4, 7, 2]\nlongest_stable([4, 2, 2, 2, 4, 4, 2, 2], 0) → 3</code></pre>",
    "hints": [
     "Keep indices in the deques: <code>mx[0]</code> — the window maximum, <code>mn[0]</code> — the window minimum.",
     "If the difference exceeds the limit, move <code>lo</code> forward and remove the indices that have left the window from the fronts of the deques."
    ],
    "check": {
     "tests": "\nassert longest_stable([8, 2, 4, 7], 4) == 2, 'Expected 2'\nassert longest_stable([10, 1, 2, 4, 7, 2], 5) == 4, 'Expected 4'\nassert longest_stable([4, 2, 2, 2, 4, 4, 2, 2], 0) == 3, 'limit = 0: equal values, 3'\nassert longest_stable([], 3) == 0, 'Empty list: 0'\nassert longest_stable([7], 0) == 1, 'One value: 1'\nimport random as _random, time as _time\n_rng = _random.Random(2)\nfor _ in range(40):\n    _x = [_rng.randint(0, 9) for _ in range(_rng.randint(0, 12))]; _l = _rng.randint(0, 5)\n    _exp = max([j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if max(_x[i:j]) - min(_x[i:j]) <= _l] + [0])\n    assert longest_stable(_x, _l) == _exp, f'longest_stable({_x}, {_l}) {_exp} болуы керек'\n_big = [_rng.randint(0, 10**6) for _ in range(100000)]\n_t0 = _time.perf_counter(); longest_stable(_big, 10**5); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} s: an O(n) monotonic deque is needed'\n"
    }
   },
   {
    "title": "Easiest Mountain Path",
    "prompt": "<p>A mountain map: <code>h[i][j]</code> is the height. Tourists walk in four directions from the top-left corner to the bottom-right corner. The <b>effort</b> of a path is the largest height difference between neighbouring cells on it, <code>|h₁ − h₂|</code>. <code>min_effort(h)</code> must return the effort of the path with the least effort. Dijkstra: instead of distance, use “the smallest effort to reach this cell”; the update is <code>max(d, |айырма|)</code>.</p>\n<pre><code>min_effort([[1, 2, 2],\n            [3, 8, 2],\n            [5, 3, 5]]) → 2</code></pre>",
    "hints": [
     "A heap element is <code>(ауырлық, r, c)</code>.",
     "The effort of moving to a neighbour is <code>max(d, abs(h[nr][nc] − h[r][c]))</code>."
    ],
    "check": {
     "tests": "\nassert min_effort([[1, 2, 2], [3, 8, 2], [5, 3, 5]]) == 2, 'Expected 2'\nassert min_effort([[1, 2, 3], [3, 8, 4], [5, 3, 5]]) == 1, 'Expected 1'\nassert min_effort([[7]]) == 0, 'One cell: 0'\nassert min_effort([[1, 10, 6, 7, 9, 10, 4, 9]]) == 9, 'One row: 9'\nassert min_effort([[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]) == 0, 'A flat path exists: 0'\n"
    }
   },
   {
    "title": "Maximum Score with Jumps",
    "prompt": "<p>The player starts from cell <code>0</code> and must reach the last cell; in one jump they move forward by at most <code>k</code> cells. The score is the sum of the values in all the cells where they stop (including the first and the last; values may be negative). <code>max_score(nums, k)</code> must return the maximum score. DP: <code>dp[i] = nums[i] + max(dp[i−k..i−1])</code>; for the window maximum use a monotonic deque: O(n).</p>\n<pre><code>max_score([1, -1, -2, 4, -7, 3], 2) → 7    # 1 → -1 → 4 → 3\nmax_score([10, -5, -2, 4, 0, 3], 3) → 17</code></pre>",
    "hints": [
     "Indices in the deque whose <code>dp</code> values are in decreasing order.",
     "If the index at the front is smaller than <code>i − k</code>, remove it."
    ],
    "check": {
     "tests": "\nassert max_score([1, -1, -2, 4, -7, 3], 2) == 7, 'Expected 7'\nassert max_score([10, -5, -2, 4, 0, 3], 3) == 17, 'Expected 17'\nassert max_score([1, -5, -20, 4, -1, 3, -6, -3], 2) == 0, 'Expected 0'\nassert max_score([5], 1) == 5, 'One cell: 5'\nassert max_score([-1, -2], 1) == -3, 'Every cell must be a stop: -3'\nimport random as _random, time as _time\n_rng = _random.Random(3)\nfor _ in range(40):\n    _x = [_rng.randint(-9, 9) for _ in range(_rng.randint(1, 12))]; _k = _rng.randint(1, 4)\n    _d = [0] * len(_x)\n    for _i in range(len(_x)):\n        _d[_i] = _x[_i] + (max(_d[max(0, _i - _k):_i]) if _i else 0)\n    assert max_score(_x, _k) == _d[-1], f'max_score({_x}, {_k}) {_d[-1]} болуы керек'\n_big = [_rng.randint(-10**4, 10**4) for _ in range(100000)]\n_t0 = _time.perf_counter(); max_score(_big, 5000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'For k = 5000, {_dt:.2f} s: get the window maximum from the deque in O(1)'\n"
    }
   },
   {
    "title": "Short Period with Negatives",
    "prompt": "<p>Now the <code>profit</code> values may be <b>negative</b>. <code>shortest_at_least(profit, k)</code> must return the length of the shortest non-empty contiguous period whose sum is at least <code>k</code> (<code>k &gt; 0</code>); if there is none, <code>-1</code>. A plain sliding window does not work! Use prefix sums <code>P</code> and a monotonic deque: for each right end, find the nearest <code>i</code> for which <code>P[j] − P[i] ≥ k</code> holds. O(n).</p>\n<pre><code>shortest_at_least([2, -1, 2], 3)     → 3\nshortest_at_least([1, 2], 4)         → -1\nshortest_at_least([84, -37, 32, 40, 95], 167) → 3</code></pre>",
    "hints": [
     "Indices in the deque whose <code>P</code> values are in increasing order.",
     "From the front: update the answer and remove while <code>P[j] − P[dq[0]] ≥ k</code> holds. From the back: remove while <code>P[dq[-1]] ≥ P[j]</code> holds — that index will never be a better start again."
    ],
    "check": {
     "tests": "\nassert shortest_at_least([2, -1, 2], 3) == 3, 'Expected 3'\nassert shortest_at_least([1, 2], 4) == -1, 'Not found: -1'\nassert shortest_at_least([84, -37, 32, 40, 95], 167) == 3, 'Expected 3'\nassert shortest_at_least([1], 1) == 1, 'One element: 1'\nassert shortest_at_least([], 1) == -1, 'Empty list: -1'\nassert shortest_at_least([-5, 10], 10) == 1, 'Negative start: 1'\nimport random as _random, time as _time\n_rng = _random.Random(4)\nfor _ in range(60):\n    _x = [_rng.randint(-6, 9) for _ in range(_rng.randint(0, 12))]; _k = _rng.randint(1, 15)\n    _c = [j - i for i in range(len(_x)) for j in range(i + 1, len(_x) + 1) if sum(_x[i:j]) >= _k]\n    _exp = min(_c) if _c else -1\n    assert shortest_at_least(_x, _k) == _exp, f'shortest_at_least({_x}, {_k}) {_exp} болуы керек'\n_big = [_rng.randint(-100, 100) for _ in range(100000)]\n_t0 = _time.perf_counter(); shortest_at_least(_big, 2000); _dt = _time.perf_counter() - _t0\nassert _dt < 1.5, f'{_dt:.2f} s: an O(n) solution is needed'\n"
    }
   },
   {
    "title": "Cheap Flights with Limited Stops",
    "prompt": "<p><code>n</code> airports (<code>0..n−1</code>), <code>flights</code> — <code>(u, v, баға)</code> one-way flights. <code>cheapest(n, flights, src, dst, k)</code> must return the cheapest price from <code>src</code> to <code>dst</code> with <b>at most <code>k</code> intermediate stops</b> (that is, at most <code>k + 1</code> flights); if it is not possible, <code>-1</code>. Extend Dijkstra to a state: <code>(баға, әуежай, қолданылған рейс саны)</code>; an airport may be visited several times with different numbers of flights.</p>\n<pre><code>_f = [(0, 1, 100), (1, 2, 100), (2, 3, 100), (0, 2, 500)]\ncheapest(4, _f, 0, 3, 1) → 600     # 0 → 2 → 3\ncheapest(4, _f, 0, 3, 2) → 300     # 0 → 1 → 2 → 3\ncheapest(4, _f, 0, 3, 0) → -1</code></pre>",
    "hints": [
     "The heap sorts by price, so the first time <code>dst</code> is taken out is the answer.",
     "If we reached an airport earlier with <b>fewer or equal</b> flights and at a lower price, this state can be skipped."
    ],
    "check": {
     "tests": "\n_f = [(0, 1, 100), (1, 2, 100), (2, 3, 100), (0, 2, 500)]\nassert cheapest(4, _f, 0, 3, 1) == 600, 'k = 1: 600'\nassert cheapest(4, _f, 0, 3, 2) == 300, 'k = 2: 300'\nassert cheapest(4, _f, 0, 3, 0) == -1, 'k = 0: no direct flight, -1'\nassert cheapest(3, [(0, 1, 100), (1, 2, 100), (0, 2, 500)], 0, 2, 1) == 200, 'Expected 200'\nassert cheapest(2, [], 0, 1, 5) == -1, 'No flight: -1'\nassert cheapest(3, [(0, 1, 5)], 1, 1, 0) == 0, 'src = dst: 0'\nimport random as _random\n_rng = _random.Random(5)\ndef _bf(n, fl, s, d, k):\n    INF = float('inf'); dist = [INF] * n; dist[s] = 0\n    for _ in range(k + 1):\n        nd = list(dist)\n        for u, v, w in fl:\n            if dist[u] + w < nd[v]: nd[v] = dist[u] + w\n        dist = nd\n    return dist[d] if dist[d] < INF else -1\nfor _ in range(60):\n    _n = _rng.randint(2, 6)\n    _fl = [(_rng.randrange(_n), _rng.randrange(_n), _rng.randint(1, 50)) for _ in range(_rng.randint(0, 12))]\n    _fl = [x for x in _fl if x[0] != x[1]]\n    _s, _d, _k = _rng.randrange(_n), _rng.randrange(_n), _rng.randint(0, 3)\n    assert cheapest(_n, _fl, _s, _d, _k) == _bf(_n, _fl, _s, _d, _k), f'cheapest({_n}, {_fl}, {_s}, {_d}, {_k}) {_bf(_n, _fl, _s, _d, _k)} болуы керек'\n"
    }
   }
  ]
 }
} });
