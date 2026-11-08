// probability practice tasks: English text. Code, solutions and checks are in content/practice/probability.js.
DJ.i18n.patch({
 "lessons": {
  "pr-1": {
   "pr": [
    {
     "title": "Three coin flips sample space",
     "prompt": "<p>A coin is tossed 3 times: each toss gives <code>\"Е\"</code> (heads) or <code>\"С\"</code> (tails). Build the sample space <code>omega</code> as a list with <code>itertools.product</code>. Then store the probability of getting exactly two heads as a <code>Fraction</code> in <code>p_two</code>.</p><p>For example, <code>(\"Е\", \"Е\", \"С\")</code> is a suitable outcome.</p>",
     "hints": [
      "<code>product([\"Е\", \"С\"], repeat=3)</code> gives 8 outcomes.",
      "In each tuple, check the condition <code>w.count(\"Е\") == 2</code>."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\nassert len(omega) == 8, \"omega should have 2 × 2 × 2 = 8 outcomes\"\nassert len(set(omega)) == 8, \"omega should have no repeated outcomes\"\nassert p_two == _F(3, 8), \"exactly two heads: ЕЕС, ЕСЕ, СЕЕ — 3 / 8\""
     }
    },
    {
     "title": "Event on one die",
     "prompt": "<p>Write the function <code>p_die(event)</code>: <code>event</code> is the set of suitable faces of one die (a set). Return the probability by the classical formula as a <code>Fraction</code>. Numbers that are not on a die (for example, 7) are not counted.</p><p>For example, <code>p_die({2, 4, 6})</code> → <code>Fraction(1, 2)</code>.</p>",
     "hints": [
      "Sample space: <code>{1, 2, 3, 4, 5, 6}</code>.",
      "The intersection <code>event &amp; omega</code> keeps only the faces that are on the die."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\nassert p_die({2, 4, 6}) == _F(1, 2), \"p_die({2, 4, 6}) = 1/2 болуы керек\"\nassert p_die({5}) == _F(1, 6), \"one face: 1/6\"\nassert p_die({7, 8}) == 0, \"there is no 7 and 8 on the die: probability 0\"\nassert p_die({1, 2, 3, 4, 5, 6}) == 1, \"all faces: probability 1\""
     }
    },
    {
     "title": "Purchase frequency",
     "prompt": "<p>Frequentist approach. Write the function <code>freq(events, trials)</code> that returns the estimate of a probability (a decimal number) from the number of events <code>events</code> and the number of trials <code>trials</code>. If <code>trials</code> is 0, return <code>0.0</code>.</p><p>For example, if 10 000 people entered a shop in Shymkent and 320 of them bought something: <code>freq(320, 10000)</code> → <code>0.032</code>.</p>",
     "hints": [
      "Share: <code>events / trials</code>.",
      "To avoid dividing by zero, first check <code>trials == 0</code>."
     ],
     "check": {
      "tests": "assert abs(freq(320, 10000) - 0.032) < 1e-12, \"freq(320, 10000) = 0.032 болуы керек\"\nassert abs(freq(240, 8000) - 0.03) < 1e-12, \"freq(240, 8000) = 0.03 болуы керек\"\nassert freq(0, 0) == 0.0, \"if trials = 0, return 0.0\"\nassert freq(5, 5) == 1, \"if everyone bought, the share is 1\""
     }
    },
    {
     "title": "Two dice: difference of 2",
     "prompt": "<p>Build the sample space for two dice as a list <code>omega</code>. Compute (both results are <code>Fraction</code>):</p><ul><li><code>p_double</code> — the probability that both dice show the same number;</li><li><code>p_diff2</code> — the probability that the absolute difference of the numbers is exactly 2, for example (1, 3) or (5, 3).</li></ul>",
     "hints": [
      "Absolute difference: <code>abs(w[0] - w[1])</code>.",
      "(1, 3) and (3, 1) are two different outcomes."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\nassert len(omega) == 36, \"omega should have 36 pairs\"\nassert p_double == _F(1, 6), \"same number: 6 pairs, 6/36 = 1/6\"\nassert p_diff2 == _F(2, 9), \"difference 2: (1,3), (2,4), (3,5), (4,6) and the reverse — 8/36 = 2/9\""
     }
    },
    {
     "title": "Event function",
     "prompt": "<p>Write the function <code>prob(omega, event)</code>: <code>omega</code> is a list of equally likely outcomes, <code>event</code> is a function that receives an outcome and returns <code>True</code> or <code>False</code>. Return the probability as a <code>Fraction</code>.</p><p>For example, for two dice <code>prob(omega, lambda w: sum(w) == 7)</code> → <code>Fraction(1, 6)</code>.</p>",
     "hints": [
      "Suitable outcomes: <code>[w for w in omega if event(w)]</code>."
     ],
     "check": {
      "tests": "from itertools import product as _pr\nfrom fractions import Fraction as _F\n_om = list(_pr(range(1, 7), repeat=2))\nassert prob(_om, lambda w: sum(w) == 7) == _F(1, 6), \"sum 7: the probability should be 1/6\"\nassert prob(_om, lambda w: 6 in w) == _F(11, 36), \"at least one six: should be 11/36\"\nassert prob(list(range(1, 11)), lambda x: x % 3 == 0) == _F(3, 10), \"divisible by 3 among 1..10: 3/10\"\nassert prob([\"Е\", \"С\"], lambda x: x == \"Q\") == 0, \"impossible event: 0\""
     }
    },
    {
     "title": "Café drinks",
     "prompt": "<p>A list of orders from a café in Astana for one day is given. Write the function <code>shares(items)</code>: it should return a dictionary <code>{name: Fraction}</code> with the share of each drink.</p><p>For example, <code>shares([\"шай\", \"кофе\", \"шай\"])</code> → <code>{\"шай\": Fraction(2, 3), \"кофе\": Fraction(1, 3)}</code>.</p>",
     "hints": [
      "First count each name: <code>counts[x] = counts.get(x, 0) + 1</code>.",
      "Then divide each count by <code>len(items)</code>."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\nassert shares([\"шай\", \"кофе\", \"шай\"]) == {\"шай\": _F(2, 3), \"кофе\": _F(1, 3)}, \"shares(['шай', 'кофе', 'шай']) = {'шай': 2/3, 'кофе': 1/3}\"\n_s = shares([\"айран\", \"шай\", \"сок\", \"шай\", \"айран\", \"шай\"])\nassert _s[\"шай\"] == _F(1, 2) and _s[\"айран\"] == _F(1, 3) and _s[\"сок\"] == _F(1, 6), \"6 тапсырыс: шай 1/2, айран 1/3, сок 1/6\"\nassert sum(_s.values()) == 1, \"the sum of all shares should be 1\""
     }
    },
    {
     "title": "Sum of three dice",
     "prompt": "<p>Write the function <code>p_sum(s, k)</code>: it returns the probability that when <code>k</code> dice are rolled, the sum is exactly <code>s</code>, as a <code>Fraction</code>. Build the sample space with <code>product(range(1, 7), repeat=k)</code>.</p><p>For example, <code>p_sum(7, 2)</code> → <code>Fraction(1, 6)</code>, <code>p_sum(3, 3)</code> → <code>Fraction(1, 216)</code>.</p>",
     "hints": [
      "<code>repeat=k</code> is the number of dice.",
      "Suitable outcomes: <code>sum(w) == s</code>."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\nassert p_sum(7, 2) == _F(1, 6), \"p_sum(7, 2) = 1/6 болуы керек\"\nassert p_sum(3, 3) == _F(1, 216), \"with three dice the sum 3 occurs only for (1, 1, 1): 1/216\"\nassert p_sum(10, 3) == _F(1, 8), \"p_sum(10, 3) = 27/216 = 1/8 болуы керек\"\nassert p_sum(19, 3) == 0, \"the sum of three dice does not exceed 18\"\nassert sum(p_sum(_s, 3) for _s in range(3, 19)) == 1, \"the probabilities of all sums add up to 1\""
     }
    },
    {
     "title": "Most likely sum",
     "prompt": "<p>Write the function <code>most_likely_sum(k)</code>: it returns the sum that appears most often when <code>k</code> dice are rolled. If several sums are equally likely, return the smallest one.</p><p>For example, <code>most_likely_sum(2)</code> → <code>7</code>. For three dice, 10 and 11 are equally likely, so <code>most_likely_sum(3)</code> → <code>10</code>.</p>",
     "hints": [
      "Count in a dictionary how many times each sum occurs.",
      "Find the largest count and take the smallest sum with that count: <code>min(...)</code>."
     ],
     "check": {
      "tests": "assert most_likely_sum(2) == 7, \"for two dice the most frequent sum is 7\"\nassert most_likely_sum(3) == 10, \"for three dice 10 and 11 are equal (27/216), the smallest is 10\"\nassert most_likely_sum(1) == 1, \"for one die all faces are equally likely, the smallest is 1\"\nassert most_likely_sum(4) == 14, \"for four dice the most frequent sum is 14\""
     }
    }
   ]
  },
  "pr-2": {
   "pr": [
    {
     "title": "Coin toss",
     "prompt": "<p>Write the function <code>count_heads(n)</code>: toss a coin <code>n</code> times (<code>random.random() &lt; 0.5</code> is heads) and return the number of heads <b>(an integer)</b>. Do not set a seed inside the function.</p><p>For example, with 10 000 tosses the result will be about 5 000.</p>",
     "hints": [
      "Start the counter at 0 and add 1 each time you get a \"yes\"."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(3)\n_v = count_heads(10000)\nassert isinstance(_v, int), \"return an integer (the counter)\"\nassert 4800 < _v < 5200, f\"with 10 000 tosses there should be about 5 000 heads, you got {_v}\"\nassert count_heads(0) == 0, \"with 0 tosses there should be 0 heads\""
     }
    },
    {
     "title": "Share of sixes",
     "prompt": "<p>Write the function <code>face_share(n, face)</code>: roll a die <code>n</code> times (<code>random.randint(1, 6)</code>) and return the share (from 0 to 1) of rolls where the face <code>face</code> came up.</p><p>For example, <code>face_share(60000, 6)</code> will be close to 1/6 ≈ 0.167.</p>",
     "hints": [
      "If <code>random.randint(1, 6) == face</code>, increase the counter.",
      "At the end return <code>hits / n</code>."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(11)\n_v = face_share(60000, 6)\nassert abs(_v - 1 / 6) < 0.01, f\"with 60 000 rolls the share should be close to 1/6 ≈ 0.167, you got {_v}\"\nassert face_share(1000, 7) == 0, \"there is no 7 on the die: share 0\""
     }
    },
    {
     "title": "Repeating seed",
     "prompt": "<p>Write the function <code>draw5(seed)</code>: set <code>random.seed(seed)</code> and, using <code>random.randint(1, 100)</code>, return a list of 5 random numbers. The same seed must always give the same list.</p><p>For example, <code>draw5(5) == draw5(5)</code> → <code>True</code>.</p>",
     "hints": [
      "First <code>random.seed(seed)</code>, then the list.",
      "<code>[random.randint(1, 100) for _ in range(5)]</code>"
     ],
     "check": {
      "tests": "_a = draw5(5)\nassert isinstance(_a, list) and len(_a) == 5, \"return a list of 5 numbers\"\nassert all(1 <= _x <= 100 for _x in _a), \"the numbers should be in the range 1..100\"\nassert draw5(5) == _a, \"the same seed should give the same list: random.seed(seed) inside the function\"\nassert draw5(6) != _a, \"a different seed should give a different list\""
     }
    },
    {
     "title": "Coupon use",
     "prompt": "<p>In a shop in Almaty, each client uses a coupon with probability <code>p</code>. Write the function <code>sim_any(n, p, k)</code>: run <code>n</code> experiments, each with <code>k</code> clients arriving, and return the share of experiments in which <b>at least one</b> client used a coupon.</p><p>For example, <code>sim_any(50000, 0.2, 3)</code> will be about 0.488.</p>",
     "hints": [
      "The outer loop is the experiments, the inner loop is the <code>k</code> clients.",
      "If the inner loop has at least one \"yes\", the experiment is successful."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(2)\n_v = sim_any(50000, 0.2, 3)\nassert abs(_v - (1 - 0.8 ** 3)) < 0.01, f\"the share should be about 0.488, you got {_v}\"\nassert sim_any(1000, 0, 5) == 0, \"if p = 0, nobody uses a coupon\"\nassert sim_any(1000, 1, 1) == 1, \"if p = 1, every experiment is successful\""
     }
    },
    {
     "title": "Running share",
     "prompt": "<p>To see the law of large numbers, write the function <code>running_share(results)</code>: <code>results</code> is a list of 1 (bought) and 0 (did not buy). Return the list of running shares at each step.</p><p>For example, <code>running_share([1, 0, 1, 1])</code> → <code>[1.0, 0.5, 0.666..., 0.75]</code>.</p>",
     "hints": [
      "Keep accumulating the sum and at each step divide it by the step number.",
      "<code>enumerate(results, start=1)</code> gives the step number starting from 1."
     ],
     "check": {
      "tests": "_r = running_share([1, 0, 1, 1])\nassert len(_r) == 4, \"one share for each element: length 4\"\nassert all(abs(_a - _b) < 1e-12 for _a, _b in zip(_r, [1.0, 0.5, 2 / 3, 0.75])), f\"running_share([1, 0, 1, 1]) should be [1.0, 0.5, 0.667, 0.75], you got {_r}\"\nassert running_share([0, 0]) == [0.0, 0.0], \"if all are 0, the shares are 0\"\nassert running_share([]) == [], \"for an empty list — an empty list\""
     }
    },
    {
     "title": "Waiting for the bus",
     "prompt": "<p>In Karaganda a bus comes every <code>interval</code> minutes, and you arrive at the stop at a random moment: the waiting time is <code>random.random() * interval</code>. Write the function <code>sim_wait(n, interval, limit)</code>: run <code>n</code> experiments and return the share of those in which you waited <b>less than</b> <code>limit</code> minutes.</p><p>For example, <code>sim_wait(50000, 15, 5)</code> will be about 1/3.</p>",
     "hints": [
      "Waiting time: <code>random.random() * interval</code>.",
      "Compare it with <code>limit</code> and count the successful experiments."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(4)\n_v = sim_wait(50000, 15, 5)\nassert abs(_v - 1 / 3) < 0.01, f\"with an interval of 15 minutes, waiting less than 5 minutes ≈ 0.333, you got {_v}\"\n_r.seed(5)\n_v2 = sim_wait(50000, 20, 15)\nassert abs(_v2 - 0.75) < 0.01, f\"sim_wait(50000, 20, 15) should be ≈ 0.75, you got {_v2}\""
     }
    },
    {
     "title": "Double six",
     "prompt": "<p>Compare two approaches:</p><ol><li><code>p_exact</code> — the probability that both dice show 6, counted with <code>itertools.product</code>, as a <code>Fraction</code>.</li><li><code>sim_double_six(n)</code> — a function that rolls two dice <code>n</code> times (<code>random.randint</code>) and returns the share of rolls where both show 6.</li></ol><p>With a large <code>n</code>, the simulation gets close to <code>p_exact</code>.</p>",
     "hints": [
      "The exact answer: only one of the 36 pairs — (6, 6).",
      "In the simulation, check that both <code>randint</code> calls gave 6."
     ],
     "check": {
      "tests": "import random as _r\nfrom fractions import Fraction as _F\nassert p_exact == _F(1, 36), \"p_exact = 1/36 болуы керек\"\n_r.seed(8)\n_v = sim_double_six(60000)\nassert abs(_v - 1 / 36) < 0.003, f\"the simulation should be close to 1/36 ≈ 0.0278, you got {_v}\""
     }
    },
    {
     "title": "Penalty series",
     "prompt": "<p>A football player scores a penalty with probability <code>p</code>. Write the function <code>sim_series(n, p, shots, need)</code>: run <code>n</code> series of <code>shots</code> kicks and return the share of series in which he scored <b>at least</b> <code>need</code> goals.</p><p>For example, <code>sim_series(40000, 0.75, 5, 4)</code> will be about 0.633.</p>",
     "hints": [
      "In each series, count the goals (inner loop).",
      "A series is successful if <code>goals &gt;= need</code>."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(9)\n_v = sim_series(40000, 0.75, 5, 4)\nassert abs(_v - 0.6328) < 0.012, f\"at least 4 goals from 5 kicks ≈ 0.633, you got {_v}\"\nassert sim_series(500, 0.9, 3, 0) == 1, \"if need = 0, every series is successful\"\nassert sim_series(500, 0.5, 3, 4) == 0, \"you cannot score 4 goals in 3 kicks\""
     }
    }
   ]
  },
  "pr-3": {
   "pr": [
    {
     "title": "Complement",
     "prompt": "<p>Write the function <code>complement(p)</code> that returns the probability of the event \"not A\".</p><p>For example, if the probability that a client leaves is 0.2, then <code>complement(0.2)</code> → <code>0.8</code>.</p>",
     "hints": [
      "P(not A) = 1 − P(A)."
     ]
    },
    {
     "title": "The \"or\" rule",
     "prompt": "<p>Write the function <code>p_or(pa, pb, pab)</code> that returns P(A or B), where <code>pab</code> = P(A and B).</p><p>For example, 40% of clients use the app, 30% open the email, and 12% do both: <code>p_or(0.4, 0.3, 0.12)</code> → <code>0.58</code>.</p>",
     "hints": [
      "Subtract the intersection: <code>pa + pb - pab</code>."
     ],
     "check": {
      "tests": "assert abs(p_or(0.4, 0.3, 0.12) - 0.58) < 1e-12, \"p_or(0.4, 0.3, 0.12) should be 0.58: did you subtract the intersection?\"\nassert abs(p_or(0.5, 0.2, 0) - 0.7) < 1e-12, \"for mutually exclusive events the plain sum: 0.7\"\nassert abs(p_or(0.3, 0.3, 0.3) - 0.3) < 1e-12, \"if A and B are the same event, the answer is 0.3\""
     }
    },
    {
     "title": "Neither",
     "prompt": "<p>Write the function <code>p_neither(pa, pb, pab)</code> that returns the probability that neither A nor B happens (the addition rule and the complement).</p><p>For example, <code>p_neither(0.4, 0.3, 0.12)</code> → <code>0.42</code>.</p>",
     "hints": [
      "First find P(A or B), then subtract it from 1."
     ],
     "check": {
      "tests": "assert abs(p_neither(0.4, 0.3, 0.12) - 0.42) < 1e-12, \"p_neither(0.4, 0.3, 0.12) = 1 − 0.58 = 0.42\"\nassert abs(p_neither(0.5, 0.5, 0)) < 1e-12, \"if A or B always happens, the answer is 0\"\nassert abs(p_neither(0.1, 0.2, 0.05) - 0.75) < 1e-12, \"p_neither(0.1, 0.2, 0.05) = 0.75\""
     }
    },
    {
     "title": "Mutually exclusive events",
     "prompt": "<p>Events are sets of outcomes (set). Write two functions:</p><ul><li><code>exclusive(a, b)</code> — returns <code>True</code> if A and B cannot happen at the same time (there are no common outcomes);</li><li><code>p_union(a, b, omega)</code> — P(A or B) as a <code>Fraction</code> (the outcomes are equally likely).</li></ul><p>For example, on a die <code>exclusive({1, 2}, {5, 6})</code> → <code>True</code>, <code>p_union({2, 4, 6}, {4, 5, 6}, omega)</code> → <code>Fraction(2, 3)</code>.</p>",
     "hints": [
      "Common outcomes: <code>a &amp; b</code>, union: <code>a | b</code>.",
      "When counting the union, a common outcome is counted only once."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\n_om = {1, 2, 3, 4, 5, 6}\nassert exclusive({1, 2}, {5, 6}) is True, \"{1, 2} and {5, 6} have no common outcomes: True\"\nassert exclusive({2, 4, 6}, {4, 5, 6}) is False, \"{2, 4, 6} and {4, 5, 6} share 4 and 6: False\"\nassert p_union({2, 4, 6}, {4, 5, 6}, _om) == _F(2, 3), \"the union is {2, 4, 5, 6}: 4/6 = 2/3\"\nassert p_union({1}, {2}, _om) == _F(1, 3), \"if they do not intersect, the plain sum: 1/6 + 1/6 = 1/3\""
     }
    },
    {
     "title": "Server reliability",
     "prompt": "<p>Each server fails during a day with its own probability, and the servers are independent of each other. Write the function <code>p_any_fail(ps)</code>: <code>ps</code> is a list of probabilities; return the probability that <b>at least one</b> server fails.</p><p>For example, <code>p_any_fail([0.02, 0.02, 0.02, 0.02, 0.02])</code> ≈ <code>0.096</code>, <code>p_any_fail([0.1, 0.2])</code> → <code>0.28</code>.</p>",
     "hints": [
      "The probability that none fails: the product of all <code>(1 - p)</code>.",
      "Then the complement: 1 − the product."
     ],
     "check": {
      "tests": "assert abs(p_any_fail([0.02] * 5) - (1 - 0.98 ** 5)) < 1e-12, \"five servers at 2% each: ≈ 0.096\"\nassert abs(p_any_fail([0.1, 0.2]) - 0.28) < 1e-12, \"p_any_fail([0.1, 0.2]) = 1 − 0.9 × 0.8 = 0.28\"\nassert p_any_fail([]) == 0, \"if there are no servers, 0\"\nassert abs(p_any_fail([0.05] * 60) - (1 - 0.95 ** 60)) < 1e-12, \"60 servers at 5% each: ≈ 0.954, not more than 1 (do not add them directly)\""
     }
    },
    {
     "title": "How many tries",
     "prompt": "<p>Write the function <code>min_trials(p, target)</code>: in each trial the event happens with probability <code>p</code>. Return the smallest n for which the probability of \"at least once\" is not less than <code>target</code>.</p><p>For example, an ad is shown with a 2% chance per showing: <code>min_trials(0.02, 0.5)</code> → <code>35</code>.</p>",
     "hints": [
      "Start with n = 1 and increase n while <code>1 - (1 - p) ** n &lt; target</code>."
     ],
     "check": {
      "tests": "assert min_trials(0.02, 0.5) == 35, \"min_trials(0.02, 0.5) = 35 болуы керек\"\nassert min_trials(0.5, 0.5) == 1, \"if p = 0.5, one trial is enough\"\nassert min_trials(0.1, 0.95) == 29, \"min_trials(0.1, 0.95) = 29 болуы керек\""
     }
    },
    {
     "title": "A six or an even sum",
     "prompt": "<p>Two dice. A is \"at least one 6 shows\", B is \"the sum is even\". Count with <code>itertools.product</code> and write as <code>Fraction</code>: <code>p_a</code>, <code>p_b</code>, <code>p_ab</code> (both at once), and, by the addition rule, <code>p_or</code> = P(A or B).</p>",
     "hints": [
      "A: <code>6 in w</code>, B: <code>sum(w) % 2 == 0</code>.",
      "<code>p_or = p_a + p_b - p_ab</code>"
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\nassert p_a == _F(11, 36), \"at least one 6: 11/36\"\nassert p_b == _F(1, 2), \"even sum: 18/36 = 1/2\"\nassert p_ab == _F(5, 36), \"both conditions: (2,6), (4,6), (6,6), (6,2), (6,4) — 5/36\"\nassert p_or == _F(2, 3), \"P(A немесе B) = 11/36 + 18/36 − 5/36 = 24/36 = 2/3\""
     }
    },
    {
     "title": "Checking the formula",
     "prompt": "<p>Check the \"at least one\" formula with a simulation. The function <code>check_formula(p, n, trials)</code> should return a pair <code>(formula, simulated)</code>:</p><ul><li><code>formula</code> = 1 − (1 − p)<sup>n</sup>;</li><li><code>simulated</code> — the share of <code>trials</code> experiments in which <code>n</code> independent checks (<code>random.random() &lt; p</code>) are made and at least one of them is a success.</li></ul>",
     "hints": [
      "The formula is the complement of \"none\".",
      "In the simulation, in each experiment make <code>n</code> checks of <code>random.random() &lt; p</code> and see whether at least one was a \"yes\"."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(21)\n_f, _s = check_formula(0.1, 5, 30000)\nassert abs(_f - (1 - 0.9 ** 5)) < 1e-12, \"formula = 1 − 0.9⁵ ≈ 0.4095 болуы керек\"\nassert abs(_s - _f) < 0.012, f\"the simulation should be close to the formula: {_s} and {_f}\"\n_f2, _s2 = check_formula(0, 3, 100)\nassert _f2 == 0 and _s2 == 0, \"if p = 0, both values are 0\""
     }
    }
   ]
  },
  "pr-4": {
   "pr": [
    {
     "title": "Conditional probability",
     "prompt": "<p>Write the function <code>cond(p_ab, p_b)</code>: it returns P(A | B) = P(A and B) / P(B).</p><p>For example, P(purchase and email) = 0.06, P(email) = 0.5: <code>cond(0.06, 0.5)</code> → <code>0.12</code>.</p>",
     "hints": [
      "The denominator is the probability of the condition, P(B)."
     ],
     "check": {
      "tests": "assert abs(cond(0.06, 0.5) - 0.12) < 1e-12, \"cond(0.06, 0.5) = 0.12 болуы керек\"\nassert abs(cond(0.2, 0.2) - 1) < 1e-12, \"if A and B = B, then P(A | B) = 1\"\nassert abs(cond(0.03, 0.6) - 0.05) < 1e-12, \"cond(0.03, 0.6) = 0.05 болуы керек\""
     }
    },
    {
     "title": "Checking independence",
     "prompt": "<p>Write the function <code>independent(pa, pb, pab)</code>: it returns <code>True</code> if P(A and B) = P(A) × P(B) (the difference is less than 1e-9).</p><p>For example, <code>independent(0.4, 0.3, 0.12)</code> → <code>True</code>, <code>independent(0.4, 0.3, 0.2)</code> → <code>False</code>.</p>",
     "hints": [
      "Do not compare decimal numbers with <code>==</code>: <code>abs(pab - pa * pb) &lt; 1e-9</code>."
     ],
     "check": {
      "tests": "assert independent(0.4, 0.3, 0.12) is True, \"0.4 × 0.3 = 0.12: independent\"\nassert independent(0.4, 0.3, 0.2) is False, \"0.2 ≠ 0.12: dependent\"\nassert independent(0.1, 0.7, 0.07) is True, \"0.1 × 0.7 = 0.07 (mind the rounding error of decimal numbers)\""
     }
    },
    {
     "title": "Share who added to cart",
     "prompt": "Using the tables <code>users</code> and <code>events</code>, compute P(cart): the share of users who have a <code>step = 'cart'</code> event among all users. One column: <code>p_cart</code> (a decimal number).</p>",
     "hints": [
      "<code>LEFT JOIN</code> keeps those who did not add to the cart too.",
      "<code>AVG(CASE WHEN e.user_id IS NOT NULL THEN 1.0 ELSE 0 END)</code>"
     ]
    },
    {
     "title": "Conditional share from a table",
     "prompt": "<p>The table <code>t</code> shows a city and the delivery delay. Write the function <code>p_given(t, row, col)</code>: it returns P(col | row), that is, the share of <code>col</code> in the row <code>row</code>.</p><p>For example, <code>p_given(t, \"Алматы\", \"кешікті\")</code> → 30 / 200 = <code>0.15</code>.</p>",
     "hints": [
      "Row total: the sum of all cells that belong to <code>row</code>.",
      "<code>sum(v for (r, c), v in t.items() if r == row)</code>"
     ],
     "check": {
      "tests": "assert abs(p_given(t, \"Алматы\", \"кешікті\") - 0.15) < 1e-12, \"P(кешікті | Алматы) = 30 / 200 = 0.15\"\nassert abs(p_given(t, \"Астана\", \"кешікті\") - 0.1) < 1e-12, \"P(кешікті | Астана) = 12 / 120 = 0.1: the denominator is the Astana row\"\n_t2 = {(\"a\", \"x\"): 1, (\"a\", \"y\"): 3, (\"b\", \"x\"): 5, (\"b\", \"y\"): 5}\nassert abs(p_given(_t2, \"a\", \"y\") - 0.75) < 1e-12, \"it should also work on another table: 3 / 4\""
     }
    },
    {
     "title": "Reverse condition",
     "prompt": "<p>P(A | B) and P(B | A) are different numbers. Write the function <code>p_row_given_col(t, row, col)</code>: it returns P(row | col), that is, the share of <code>row</code> inside the column <code>col</code>.</p><p>For example, what share of delayed deliveries falls on Almaty: <code>p_row_given_col(t, \"Алматы\", \"кешікті\")</code> → 30 / 42 ≈ <code>0.714</code>.</p>",
     "hints": [
      "Now the denominator is the column total: the cells where <code>c == col</code>."
     ],
     "check": {
      "tests": "assert abs(p_row_given_col(t, \"Алматы\", \"кешікті\") - 30 / 42) < 1e-12, \"P(Almaty | delayed) = 30 / 42 ≈ 0.714\"\nassert abs(p_row_given_col(t, \"Астана\", \"уақытында\") - 108 / 278) < 1e-12, \"P(Astana | on time) = 108 / 278 ≈ 0.388\""
     }
    },
    {
     "title": "Purchase from cart",
     "prompt": "<p>P(purchase | cart): among the users who added to the cart (<code>step = 'cart'</code>), what share made a purchase (<code>step = 'purchase'</code>)? Make a <code>LEFT JOIN</code> of the table <code>events</code> with itself. One column: <code>p_buy_given_cart</code>.</p>",
     "hints": [
      "Condition: <code>WHERE c.step = 'cart'</code> — only those who added to the cart remain.",
      "Join a second copy with the condition <code>p.step = 'purchase'</code> and take the share where <code>p.user_id IS NOT NULL</code>."
     ]
    },
    {
     "title": "Conditional share by group",
     "prompt": "<p>Write the function <code>cond_by_group(records, target)</code>: <code>records</code> is a list of pairs <code>(group, result)</code>. For each group return P(result = target | group) as a dictionary <code>{group: share}</code>.</p><p>For example, <code>cond_by_group([(\"mobile\", \"buy\"), (\"mobile\", \"no\"), (\"web\", \"buy\")], \"buy\")</code> → <code>{\"mobile\": 0.5, \"web\": 1.0}</code>.</p>",
     "hints": [
      "Two dictionaries: the total in each group and the count of target.",
      "For a group without target use <code>hits.get(g, 0)</code>, which gives 0."
     ],
     "check": {
      "tests": "assert cond_by_group([(\"mobile\", \"buy\"), (\"mobile\", \"no\"), (\"web\", \"buy\")], \"buy\") == {\"mobile\": 0.5, \"web\": 1.0}, \"The result in the example: {'mobile': 0.5, 'web': 1.0}\"\n_rec = [(\"Алматы\", \"иә\")] * 3 + [(\"Алматы\", \"жоқ\")] * 7 + [(\"Шымкент\", \"жоқ\")] * 4\n_r = cond_by_group(_rec, \"иә\")\nassert abs(_r[\"Алматы\"] - 0.3) < 1e-12, \"Алматы: 3 / 10 = 0.3\"\nassert _r[\"Шымкент\"] == 0, \"there is no 'иә' in Shymkent: it should be 0 (the group should stay in the dictionary)\""
     }
    },
    {
     "title": "Is the table independent",
     "prompt": "<p>Write the function <code>is_independent(t, tol=0.001)</code>: <code>t</code> is any table of the form <code>{(row, column): number}</code>. Return <code>True</code> if for every cell the difference between P(column | row) and P(column) is less than <code>tol</code>.</p><p>Take the row and column names from the keys.</p>",
     "hints": [
      "Rows: <code>{r for r, c in t}</code>, columns: <code>{c for r, c in t}</code>.",
      "P(column) = count in the column / total; P(column | row) = cell / count in the row."
     ],
     "check": {
      "tests": "_t1 = {(\"ер\", \"иә\"): 30, (\"ер\", \"жоқ\"): 70, (\"әйел\", \"иә\"): 45, (\"әйел\", \"жоқ\"): 105}\nassert is_independent(_t1) is True, \"in both groups P(yes) = 0.3: independent\"\n_t2 = {(\"mobile\", \"churn\"): 90, (\"mobile\", \"stay\"): 510, (\"web\", \"churn\"): 40, (\"web\", \"stay\"): 360}\nassert is_independent(_t2) is False, \"0.15 ≠ 0.13: dependent\"\n_t3 = {(\"a\", \"x\"): 10, (\"a\", \"y\"): 20, (\"a\", \"z\"): 30, (\"b\", \"x\"): 20, (\"b\", \"y\"): 40, (\"b\", \"z\"): 60}\nassert is_independent(_t3) is True, \"it should also work for a 2 × 3 table\""
     }
    }
   ]
  },
  "pr-5": {
   "pr": [
    {
     "title": "Probability of a positive result",
     "prompt": "<p>Write the function <code>p_positive(prior, sens, fpr)</code>: it returns the probability that the test gives a positive result P(+) (for both sick and healthy people).</p><p>For example, <code>p_positive(0.01, 0.9, 0.05)</code> → 0.009 + 0.0495 = <code>0.0585</code>.</p>",
     "hints": [
      "P(+) = sens × prior + fpr × (1 − prior)."
     ],
     "check": {
      "tests": "assert abs(p_positive(0.01, 0.9, 0.05) - 0.0585) < 1e-12, \"p_positive(0.01, 0.9, 0.05) = 0.0585: did you add the false positives of healthy people?\"\nassert abs(p_positive(0.5, 1, 0) - 0.5) < 1e-12, \"a perfect test: P(+) = prior\""
     }
    },
    {
     "title": "Bayes' formula",
     "prompt": "<p>Write the function <code>bayes(p_b_given_a, p_a, p_b)</code>: it returns P(A | B) = P(B | A) × P(A) / P(B).</p><p>For example, <code>bayes(0.9, 0.01, 0.0585)</code> ≈ <code>0.154</code>.</p>",
     "hints": [
      "Write the formula directly."
     ]
    },
    {
     "title": "Natural frequencies",
     "prompt": "<p>Write the function <code>counts(N, prior, sens, fpr)</code>: among <code>N</code> people it returns the pair <code>(true_pos, false_pos)</code>: the sick people whose test is +, and the healthy people whose test is +.</p><p>For example, <code>counts(10000, 0.01, 0.9, 0.05)</code> → <code>(90, 495)</code> (it may be a decimal number).</p>",
     "hints": [
      "Sick people: <code>N * prior</code>, and the share <code>sens</code> of them give a positive result.",
      "Healthy people: <code>N - sick</code>, and the share <code>fpr</code> of them are false positives."
     ],
     "check": {
      "tests": "_tp, _fp = counts(10000, 0.01, 0.9, 0.05)\nassert abs(_tp - 90) < 1e-6 and abs(_fp - 495) < 1e-6, f\"counts(10000, 0.01, 0.9, 0.05) should be (90, 495), you got {(_tp, _fp)}\"\n_tp2, _fp2 = counts(2000, 0.1, 0.5, 0.1)\nassert abs(_tp2 - 100) < 1e-6 and abs(_fp2 - 180) < 1e-6, \"counts(2000, 0.1, 0.5, 0.1) = (100, 180)\""
     }
    },
    {
     "title": "After a negative result",
     "prompt": "<p>The test came out <b>negative</b>. What is then the probability that the person is sick? Write the function <code>posterior_neg(prior, sens, fpr)</code>: it returns P(sick | −), that is, P(sick | −).</p><p>Hint: P(− | sick) = 1 − sens, P(− | healthy) = 1 − fpr. For example, <code>posterior_neg(0.01, 0.9, 0.05)</code> = 10 / 9 415 ≈ <code>0.00106</code>.</p>",
     "hints": [
      "First P(−) = (1 − sens) × prior + (1 − fpr) × (1 − prior).",
      "Numerator: (1 − sens) × prior."
     ],
     "check": {
      "tests": "assert abs(posterior_neg(0.01, 0.9, 0.05) - 10 / 9415) < 1e-9, \"posterior_neg(0.01, 0.9, 0.05) = 10 / 9415 ≈ 0.00106 (the table from the lesson)\"\nassert abs(posterior_neg(0.5, 0.8, 0.2) - 0.2) < 1e-9, \"posterior_neg(0.5, 0.8, 0.2) = 0.2\"\nassert posterior_neg(0.3, 1.0, 0.1) == 0, \"if sens = 1, a negative result fully rules out the disease\""
     }
    },
    {
     "title": "Two tests in a row",
     "prompt": "<p>The first test gave a positive result, the person took a second (independent, identical) test, and it is also positive. Write the function <code>posterior_twice(prior, sens, fpr)</code>: use the first posterior as the prior for the second calculation and return the final P(sick | +, +).</p><p>For example, <code>posterior_twice(0.01, 0.9, 0.05)</code> ≈ <code>0.766</code>.</p>",
     "hints": [
      "First write the <code>posterior</code> function from the lesson.",
      "In the second step, put the result of the first step in place of the prior."
     ],
     "check": {
      "tests": "assert abs(posterior_twice(0.01, 0.9, 0.05) - 0.7659574) < 1e-6, \"posterior_twice(0.01, 0.9, 0.05) ≈ 0.766: two positive results sharply raise the confidence\"\nassert abs(posterior_twice(0.5, 0.8, 0.2) - 0.9411765) < 1e-6, \"posterior_twice(0.5, 0.8, 0.2) = 16/17 ≈ 0.941\""
     }
    },
    {
     "title": "The effect of the base rate",
     "prompt": "<p>Write the function <code>posteriors(priors, sens, fpr)</code>: for each prior it returns a list of P(A | +). You will see how badly the same test works for a rare event.</p><p>For example, <code>posteriors([0.001, 0.01, 0.1], 0.99, 0.02)</code> ≈ <code>[0.047, 0.333, 0.846]</code>.</p>",
     "hints": [
      "For each prior, repeat the formula from the lesson."
     ],
     "check": {
      "tests": "_r = posteriors([0.001, 0.01, 0.1], 0.99, 0.02)\nassert isinstance(_r, list) and len(_r) == 3, \"one value for each prior: a list of length 3\"\n_e = [0.99 * _p / (0.99 * _p + 0.02 * (1 - _p)) for _p in [0.001, 0.01, 0.1]]\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_r, _e)), f\"it should be ≈ [0.047, 0.333, 0.846], you got {_r}\"\nassert _r[0] < _r[1] < _r[2], \"as the prior grows, the posterior should grow too\""
     }
    },
    {
     "title": "Which factory the defect came from",
     "prompt": "<p>60% of the goods are made by the factory in Almaty, 40% by the factory in Shymkent. The share of defects: in Almaty 2%, in Shymkent 5%. Write the function <code>p_source(shares, defects, name)</code>: a random item turned out to be defective; return the probability that it came from the factory <code>name</code>. The number of factories can be any.</p><p>For example, <code>p_source({\"Алматы\": 0.6, \"Шымкент\": 0.4}, {\"Алматы\": 0.02, \"Шымкент\": 0.05}, \"Шымкент\")</code> → <code>0.625</code>.</p>",
     "hints": [
      "P(defect) = Σ share × defect share over all factories.",
      "Numerator: <code>shares[name] * defects[name]</code>."
     ],
     "check": {
      "tests": "_s = {\"Алматы\": 0.6, \"Шымкент\": 0.4}\n_d = {\"Алматы\": 0.02, \"Шымкент\": 0.05}\nassert abs(p_source(_s, _d, \"Шымкент\") - 0.625) < 1e-9, \"P(Shymkent | defect) = 0.02 / 0.032 = 0.625\"\nassert abs(p_source(_s, _d, \"Алматы\") - 0.375) < 1e-9, \"P(Almaty | defect) = 0.012 / 0.032 = 0.375\"\n_s3 = {\"A\": 0.5, \"B\": 0.3, \"C\": 0.2}\n_d3 = {\"A\": 0.01, \"B\": 0.02, \"C\": 0.05}\nassert abs(p_source(_s3, _d3, \"C\") - 0.01 / 0.021) < 1e-9, \"it should also work for three factories: 0.01 / 0.021 ≈ 0.476\""
     }
    },
    {
     "title": "Bayes simulation",
     "prompt": "<p>Check the formula with a simulation. Write the function <code>sim_posterior(n, prior, sens, fpr)</code>: simulate <code>n</code> people — each is sick with probability <code>prior</code>; if sick, the test is \"+\" with probability <code>sens</code>, if healthy — with probability <code>fpr</code>. Return the share of sick people among those whose test is positive.</p><p>For example, <code>sim_posterior(50000, 0.1, 0.8, 0.1)</code> will be about 0.47.</p>",
     "hints": [
      "For each person, draw two random numbers: the first decides the disease, the second decides the test result.",
      "Count only the positive results, and among them count the sick separately."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(13)\n_v = sim_posterior(50000, 0.1, 0.8, 0.1)\n_e = 0.08 / (0.08 + 0.09)\nassert abs(_v - _e) < 0.03, f\"the simulation should be close to the formula (≈ 0.471), you got {_v}\""
     }
    }
   ]
  },
  "pr-6": {
   "pr": [
    {
     "title": "Lunch menu",
     "prompt": "<p>In a canteen one chooses a salad, a main dish and a drink. Write the function <code>count_options(sizes)</code>: <code>sizes</code> is the number of options in each choice; by the multiplication rule return the total number of combinations.</p><p>For example, 3 salads, 4 main dishes, 5 drinks: <code>count_options([3, 4, 5])</code> → <code>60</code>.</p>",
     "hints": [
      "Start with 1 and multiply by each number."
     ],
     "check": {
      "tests": "assert count_options([3, 4, 5]) == 60, \"3 × 4 × 5 = 60 болуы керек\"\nassert count_options([3, 4]) == 12, \"a T-shirt: 3 colours × 4 sizes = 12\"\nassert count_options([10] * 4) == 10000, \"a 4-digit PIN: 10⁴\"\nassert count_options([]) == 1, \"if there is no choice, only one option (1)\""
     }
    },
    {
     "title": "Standing in a queue",
     "prompt": "<p>Write the function <code>queue_ways(n)</code>: it returns the number of ways in which <code>n</code> people can stand in a queue at the cash desk (<code>math.factorial</code>).</p><p>For example, <code>queue_ways(3)</code> → <code>6</code>.</p>",
     "hints": [
      "Arranging n elements in order: n!"
     ]
    },
    {
     "title": "Car plate numbers",
     "prompt": "<p>In Kazakhstan a car plate has the form \"123 ABC 02\": 3 digits (0–9, repetition allowed) and 3 letters (repetition allowed), the region code is fixed. Write the function <code>plates(letters)</code>: if the alphabet has <code>letters</code> letters, return the number of plates in one region.</p><p>For example, <code>plates(26)</code> → <code>17576000</code>.</p>",
     "hints": [
      "Multiplication rule: digits 10³, letters letters³."
     ],
     "check": {
      "tests": "assert plates(26) == 17576000, \"plates(26) = 1000 × 26³ = 17 576 000\"\nassert plates(1) == 1000, \"if there is only one letter, only the digits change: 1000\"\nassert plates(10) == 1000000, \"plates(10) = 10⁶\""
     }
    },
    {
     "title": "Number of passwords",
     "prompt": "<p>Write the function <code>pw_counts(a, L)</code>: from an alphabet of <code>a</code> symbols it returns the pair <code>(with_rep, without_rep)</code> — the number of passwords of length <code>L</code> when symbols may repeat and when they may not (<code>math.perm</code>).</p><p>For example, <code>pw_counts(10, 4)</code> → <code>(10000, 5040)</code>.</p>",
     "hints": [
      "With repetitions: <code>a ** L</code>.",
      "Without repetitions, the order matters: <code>math.perm(a, L)</code>."
     ],
     "check": {
      "tests": "assert pw_counts(10, 4) == (10000, 5040), \"pw_counts(10, 4) = (10000, 5040)\"\nassert pw_counts(26, 2) == (676, 650), \"pw_counts(26, 2) = (676, 650)\"\nassert pw_counts(3, 4)[1] == 0, \"you cannot make 4 symbols without repetition from 3 symbols: 0\""
     }
    },
    {
     "title": "Lottery match",
     "prompt": "<p>The \"5 of 36\" lottery: 5 numbers out of 36 win, and you also choose 5 numbers. Write the function <code>p_match(n, k, m)</code>: it returns the probability that exactly <code>m</code> numbers match when <code>k</code> are chosen out of <code>n</code> (<code>math.comb</code>).</p><p>For example, <code>p_match(36, 5, 5)</code> → 1 / 376 992.</p>",
     "hints": [
      "From the <code>k</code> winning numbers choose <code>m</code>: <code>math.comb(k, m)</code>; from the remaining <code>n − k</code> choose <code>k − m</code>: <code>math.comb(n - k, k - m)</code>.",
      "Denominator: <code>math.comb(n, k)</code>."
     ],
     "check": {
      "tests": "assert abs(p_match(36, 5, 5) - 1 / 376992) < 1e-15, \"Жекпот: 1 / C(36, 5) = 1 / 376 992\"\nassert abs(p_match(36, 5, 0) - 169911 / 376992) < 1e-12, \"no match at all: C(31, 5) / C(36, 5) ≈ 0.451\"\nassert abs(sum(p_match(36, 5, _m) for _m in range(6)) - 1) < 1e-12, \"the sum over all m should be 1\""
     }
    },
    {
     "title": "Balls of one colour",
     "prompt": "<p>A bag holds balls of different colours. Write the function <code>p_same_color(counts, k)</code>: <code>counts</code> is the number of balls of each colour; return the probability that, when <code>k</code> balls are taken at random, all of them are of one colour.</p><p>For example, 2 balls were taken from 5 red and 3 blue: <code>p_same_color([5, 3], 2)</code> → (C(5, 2) + C(3, 2)) / C(8, 2) = 13 / 28.</p>",
     "hints": [
      "Favourable cases: the sum of <code>math.comb(c, k)</code> over all colours.",
      "Total: <code>math.comb(sum(counts), k)</code>."
     ],
     "check": {
      "tests": "assert abs(p_same_color([5, 3], 2) - 13 / 28) < 1e-12, \"p_same_color([5, 3], 2) = 13/28 ≈ 0.464\"\nassert abs(p_same_color([4, 4, 4], 3) - 12 / 220) < 1e-12, \"three colours, 3 balls: 3 × C(4, 3) / C(12, 3) = 12/220\"\nassert p_same_color([2, 2], 3) == 0, \"if there are only 2 balls of each colour, you cannot take 3 balls of one colour\""
     }
    },
    {
     "title": "Birthday paradox",
     "prompt": "<p>Write the function <code>p_shared_birthday(n)</code>: a class has <code>n</code> pupils (a year has 365 days, all equally likely). Return the probability that some two of them share a birthday. Use the complement: \"all different\" = <code>math.perm(365, n) / 365 ** n</code>.</p><p>For example, <code>p_shared_birthday(23)</code> ≈ <code>0.507</code>.</p>",
     "hints": [
      "\"All days different\": the first pupil has 365 options, the second 364, and so on — this is <code>math.perm(365, n)</code>.",
      "Answer: 1 − perm / 365ⁿ."
     ],
     "check": {
      "tests": "assert abs(p_shared_birthday(23) - 0.5072972) < 1e-6, \"with 23 pupils ≈ 0.507\"\nassert p_shared_birthday(1) == 0, \"with one pupil there is no match: 0\"\nassert abs(p_shared_birthday(366) - 1) < 1e-12, \"with 366 pupils a match is certain: 1\"\nassert abs(p_shared_birthday(2) - 1 / 365) < 1e-12, \"two pupils: 1/365\""
     }
    },
    {
     "title": "At least one defective",
     "prompt": "<p>Write the function <code>p_any_defect(N, D, n)</code>: of <code>N</code> items, <code>D</code> are defective, and <code>n</code> items are checked at random. Return the probability of finding at least one defective item (combinatorics and the complement).</p><p>For example, <code>p_any_defect(12, 3, 4)</code> = 1 − C(9, 4) / C(12, 4) ≈ <code>0.745</code>.</p>",
     "hints": [
      "\"No defective\" means all n items are good: <code>math.comb(N - D, n)</code>.",
      "Then subtract from 1."
     ],
     "check": {
      "tests": "assert abs(p_any_defect(12, 3, 4) - (1 - 126 / 495)) < 1e-12, \"p_any_defect(12, 3, 4) = 1 − 126/495 ≈ 0.745\"\nassert p_any_defect(10, 0, 5) == 0, \"if there are no defective items, 0\"\nassert p_any_defect(10, 6, 5) == 1, \"if only 4 items are good, one of any 5 items must be defective: 1\""
     }
    }
   ]
  },
  "pr-7": {
   "pr": [
    {
     "title": "Probability of a specific sequence",
     "prompt": "<p>Write the function <code>seq_prob(seq, p)</code>: <code>seq</code> is a list of 1 (bought) and 0 (did not buy), each visitor is independent, and the probability of a purchase is <code>p</code>. Return the probability of exactly this sequence.</p><p>For example, <code>seq_prob([1, 0, 0, 0], 0.1)</code> → 0.1 × 0.9³ = <code>0.0729</code>.</p>",
     "hints": [
      "For 1 multiply by <code>p</code>, for 0 multiply by <code>1 - p</code>."
     ],
     "check": {
      "tests": "assert abs(seq_prob([1, 0, 0, 0], 0.1) - 0.0729) < 1e-12, \"seq_prob([1, 0, 0, 0], 0.1) = 0.0729\"\nassert abs(seq_prob([0, 1, 0, 0], 0.1) - 0.0729) < 1e-12, \"a different order, but the same probability: 0.0729\"\nassert abs(seq_prob([1, 1], 0.5) - 0.25) < 1e-12, \"seq_prob([1, 1], 0.5) = 0.25\"\nassert seq_prob([], 0.3) == 1, \"Бос рет: 1\""
     }
    },
    {
     "title": "Mean and variance",
     "prompt": "<p>Write the function <code>binom_stats(n, p)</code>: for X ~ Binomial(n, p) return the pair <code>(mean, var)</code>.</p><p>For example, 200 visitors, a 5% conversion: <code>binom_stats(200, 0.05)</code> → <code>(10.0, 9.5)</code>.</p>",
     "hints": [
      "Mean: n × p, variance: n × p × (1 − p)."
     ]
    },
    {
     "title": "All or none",
     "prompt": "<p>A basketball player makes a free throw with probability 80%. Write two functions:</p><ul><li><code>p_all(n, p)</code> — the probability that all <code>n</code> throws succeed;</li><li><code>p_none(n, p)</code> — the probability that none of the throws succeeds.</li></ul><p>For example, <code>p_all(3, 0.8)</code> → <code>0.512</code>, <code>p_none(3, 0.8)</code> → <code>0.008</code>.</p>",
     "hints": [
      "These are P(X = n) and P(X = 0): C(n, n) = C(n, 0) = 1."
     ]
    },
    {
     "title": "At most k successes",
     "prompt": "<p>Write the function <code>p_at_most(k, n, p)</code>: for X ~ Binomial(n, p) return P(X ≤ k).</p><p>For example, 20 emails, an open rate of 10%: <code>p_at_most(2, 20, 0.1)</code> ≈ <code>0.677</code>.</p>",
     "hints": [
      "First write the <code>binom_pmf</code> function.",
      "For X ≤ k use <code>range(k + 1)</code>."
     ],
     "check": {
      "tests": "assert abs(p_at_most(2, 20, 0.1) - 0.6769268) < 1e-6, \"p_at_most(2, 20, 0.1) ≈ 0.677: use range(k + 1)\"\nassert abs(p_at_most(3, 10, 0.5) - 0.171875) < 1e-9, \"p_at_most(3, 10, 0.5) = 176/1024 ≈ 0.172\"\nassert abs(p_at_most(10, 10, 0.3) - 1) < 1e-9, \"if k = n, the probability is 1\""
     }
    },
    {
     "title": "Distribution list",
     "prompt": "<p>Write the function <code>binom_dist(n, p)</code>: for k = 0, 1, ..., n it returns the list of values P(X = k).</p><p>For example, <code>binom_dist(2, 0.5)</code> → <code>[0.25, 0.5, 0.25]</code>.</p>",
     "hints": [
      "The length of the list is n + 1: <code>range(n + 1)</code>."
     ],
     "check": {
      "tests": "assert binom_dist(2, 0.5) == [0.25, 0.5, 0.25], \"binom_dist(2, 0.5) = [0.25, 0.5, 0.25]\"\n_d = binom_dist(4, 0.1)\nassert len(_d) == 5, \"if n = 4, there are 5 values (k = 0..4)\"\nassert abs(_d[1] - 0.2916) < 1e-12, \"P(X = 1) = 0.2916 (the example from the lesson)\"\nassert abs(sum(binom_dist(15, 0.37)) - 1) < 1e-9, \"the sum of all values is 1\""
     }
    },
    {
     "title": "Most likely number",
     "prompt": "<p>Write the function <code>binom_mode(n, p)</code>: it returns the value of k with the highest probability. If several are equal, take the smallest.</p><p>For example, 20 emails, an open rate of 10%: <code>binom_mode(20, 0.1)</code> → <code>2</code>.</p>",
     "hints": [
      "Build the list of pmf values for all k.",
      "<code>probs.index(max(probs))</code> gives the index of the first largest value."
     ],
     "check": {
      "tests": "assert binom_mode(20, 0.1) == 2, \"binom_mode(20, 0.1) = 2\"\nassert binom_mode(10, 0.5) == 5, \"binom_mode(10, 0.5) = 5\"\nassert binom_mode(4, 0.1) == 0, \"binom_mode(4, 0.1) = 0: 0.9⁴ ≈ 0.656 is the largest\"\nassert binom_mode(3, 0.5) == 1, \"1 and 2 are equal (0.375): the smallest is 1\""
     }
    },
    {
     "title": "Probability of a range",
     "prompt": "<p>Write the function <code>p_between(a, b, n, p)</code>: return P(a ≤ X ≤ b), where X ~ Binomial(n, p).</p><p>For example, 200 people enter a shop in Aktobe per day, with a 5% conversion. The probability that there will be from 5 to 15 purchases: <code>p_between(5, 15, 200, 0.05)</code> ≈ <code>0.929</code>.</p>",
     "hints": [
      "The bounds are included: <code>range(a, b + 1)</code>."
     ],
     "check": {
      "tests": "assert abs(p_between(5, 15, 200, 0.05) - 0.9291976) < 1e-6, \"p_between(5, 15, 200, 0.05) ≈ 0.929\"\nassert abs(p_between(1, 1, 4, 0.1) - 0.2916) < 1e-12, \"if a = b, this is P(X = a)\"\nassert abs(p_between(0, 10, 10, 0.4) - 1) < 1e-9, \"the whole range: 1\""
     }
    },
    {
     "title": "Overbooking",
     "prompt": "<p>A plane has <code>seats</code> seats. Each passenger who bought a ticket shows up with probability <code>p</code> (independently). Write the function <code>max_tickets(seats, p, risk)</code>: return the largest number of tickets to sell for which the probability that \"more people show up than there are seats\" does not exceed <code>risk</code>.</p><p>For example, <code>max_tickets(100, 0.9, 0.05)</code> → <code>106</code>.</p>",
     "hints": [
      "P(X &gt; seats) = 1 − P(X ≤ seats), where X ~ Binomial(n, p).",
      "Start with n = seats and increase n by 1 while the risk is still too high."
     ],
     "check": {
      "tests": "assert max_tickets(100, 0.9, 0.05) == 106, \"max_tickets(100, 0.9, 0.05) = 106 болуы керек\"\nassert max_tickets(50, 0.8, 0.1) == 58, \"max_tickets(50, 0.8, 0.1) = 58 болуы керек\"\nassert max_tickets(10, 1.0, 0.05) == 10, \"if everyone is sure to show up, you cannot sell more\""
     }
    }
   ]
  },
  "pr-8": {
   "pr": [
    {
     "title": "Converting λ to an interval",
     "prompt": "<p>Write the function <code>lam_for(rate_per_hour, minutes)</code>: if there are on average <code>rate_per_hour</code> events per hour, return λ for an interval of <code>minutes</code> minutes.</p><p>For example, <code>lam_for(4, 30)</code> → <code>2.0</code>, <code>lam_for(4, 600)</code> → <code>40.0</code>.</p>",
     "hints": [
      "λ is proportional to the interval: <code>rate_per_hour * minutes / 60</code>."
     ],
     "check": {
      "tests": "assert abs(lam_for(4, 30) - 2) < 1e-12, \"30 minutes is half an hour: λ = 2\"\nassert abs(lam_for(4, 600) - 40) < 1e-12, \"10 hours: λ = 40\"\nassert abs(lam_for(9, 20) - 3) < 1e-12, \"lam_for(9, 20) = 3\""
     }
    },
    {
     "title": "No orders",
     "prompt": "<p>Write the function <code>p_zero(lam)</code>: return the probability that no event happens under a Poisson distribution with parameter λ.</p><p>For example, a café has 4 orders per hour on average: <code>p_zero(4)</code> ≈ <code>0.0183</code>.</p>",
     "hints": [
      "P(X = 0) = λ⁰ × e^(−λ) / 0! = e^(−λ)."
     ],
     "check": {
      "tests": "import math as _m\nassert abs(p_zero(4) - _m.exp(-4)) < 1e-12, \"p_zero(4) = e^(−4) ≈ 0.0183\"\nassert p_zero(0) == 1, \"if λ = 0, the event does not happen: 1\""
     }
    },
    {
     "title": "Estimating λ from data",
     "prompt": "The list holds the number of taxi calls of a taxi company in Pavlodar for each hour. Write the function <code>lam_hat(counts)</code>: return the estimate of λ of the Poisson distribution (the mean value).</p><p>For example, <code>lam_hat([3, 5, 4, 4])</code> → <code>4.0</code>.</p>",
     "hints": [
      "For Poisson, λ is the mean: <code>sum(counts) / len(counts)</code>."
     ],
     "check": {
      "tests": "assert abs(lam_hat([3, 5, 4, 4]) - 4) < 1e-12, \"lam_hat([3, 5, 4, 4]) = 4\"\nassert abs(lam_hat([0, 1, 0, 2, 2]) - 1) < 1e-12, \"lam_hat([0, 1, 0, 2, 2]) = 1\"\nassert lam_hat([7]) == 7, \"one hour: λ = 7\""
     }
    },
    {
     "title": "Poisson CDF",
     "prompt": "<p>Write the function <code>poisson_cdf(k, lam)</code>: return P(X ≤ k).</p><p>For example, <code>poisson_cdf(6, 4)</code> ≈ <code>0.889</code>.</p>",
     "hints": [
      "Add up the pmf from 0 to k: <code>range(k + 1)</code>."
     ],
     "check": {
      "tests": "import math as _m\nassert abs(poisson_cdf(6, 4) - 0.8893260) < 1e-6, \"poisson_cdf(6, 4) ≈ 0.889: range(k + 1)\"\nassert abs(poisson_cdf(0, 2) - _m.exp(-2)) < 1e-12, \"poisson_cdf(0, 2) = e^(−2)\"\nassert abs(poisson_cdf(60, 5) - 1) < 1e-9, \"for a large k the CDF ≈ 1\""
     }
    },
    {
     "title": "Courier load",
     "prompt": "<p>Write the function <code>p_overload(lam, capacity)</code>: a courier can deliver <code>capacity</code> orders per hour, and the orders follow a Poisson distribution with parameter λ. Return the probability that there will be <b>more</b> orders than the courier can deliver.</p><p>For example, <code>p_overload(4, 6)</code> ≈ <code>0.111</code>.</p>",
     "hints": [
      "P(X &gt; c) = 1 − P(X ≤ c).",
      "For X ≤ c use <code>range(capacity + 1)</code>."
     ],
     "check": {
      "tests": "assert abs(p_overload(4, 6) - 0.1106740) < 1e-6, \"p_overload(4, 6) ≈ 0.111 (the example from the lesson)\"\nassert abs(p_overload(5, 8) - 0.0680936) < 1e-6, \"p_overload(5, 8) ≈ 0.068\"\nassert abs(p_overload(2, 0) - (1 - 2.718281828459045 ** -2)) < 1e-9, \"capacity = 0: 1 − e^(−2)\""
     }
    },
    {
     "title": "Orders in a range",
     "prompt": "<p>Write the function <code>p_range(a, b, lam)</code>: return P(a ≤ X ≤ b), where X ~ Poisson(λ).</p><p>For example, a pharmacy in Turkistan gets 3 clients per hour on average: <code>p_range(2, 4, 3)</code> ≈ <code>0.616</code>.</p>",
     "hints": [
      "The bounds are included: <code>range(a, b + 1)</code>."
     ]
    },
    {
     "title": "How many couriers are needed",
     "prompt": "<p>Within one hour the orders follow a Poisson distribution (λ), and one courier delivers <code>per_courier</code> orders per hour. Write the function <code>couriers_needed(lam, per_courier, risk)</code>: return the smallest m for which the probability that there are more orders than all the couriers (m × per_courier) can deliver does not exceed <code>risk</code>.</p><p>For example, <code>couriers_needed(10, 4, 0.05)</code> → <code>4</code>.</p>",
     "hints": [
      "Start with m = 1 and increase m while P(X &gt; m × per_courier) &gt; risk."
     ],
     "check": {
      "tests": "assert couriers_needed(10, 4, 0.05) == 4, \"couriers_needed(10, 4, 0.05) = 4: 3 couriers (12) are not enough\"\nassert couriers_needed(6, 3, 0.1) == 3, \"couriers_needed(6, 3, 0.1) = 3\"\nassert couriers_needed(20, 5, 0.01) == 7, \"couriers_needed(20, 5, 0.01) = 7\""
     }
    },
    {
     "title": "Binomial and Poisson",
     "prompt": "<p>If n is large and p is small, Binomial(n, p) ≈ Poisson(λ = n × p). Write the function <code>max_gap(n, p, kmax)</code>: for k = 0..kmax return the largest absolute difference between the two pmf values.</p><p>For example, <code>max_gap(1000, 0.003, 5)</code> is very small (&lt; 0.001), while <code>max_gap(10, 0.3, 5)</code> ≈ 0.043.</p>",
     "hints": [
      "Write both pmf functions (lessons 7 and 8).",
      "<code>max(abs(...) for k in range(kmax + 1))</code>"
     ],
     "check": {
      "tests": "assert abs(max_gap(1000, 0.003, 5) - 0.00033676) < 1e-6, \"max_gap(1000, 0.003, 5) ≈ 0.00034: λ = n × p\"\nassert abs(max_gap(10, 0.3, 5) - 0.0427861) < 1e-6, \"max_gap(10, 0.3, 5) ≈ 0.043: if n is small, the approximation is poor\""
     }
    }
   ]
  },
  "pr-9": {
   "pr": [
    {
     "title": "Uniform CDF",
     "prompt": "<p>Write the function <code>uniform_cdf(x, a, b)</code>: for X ~ Uniform(a, b) return P(X ≤ x). If x &lt; a, return 0; if x &gt; b, return 1.</p><p>For example, a bus comes every 20 minutes: <code>uniform_cdf(5, 0, 20)</code> → <code>0.25</code>.</p>",
     "hints": [
      "In the middle: <code>(x - a) / (b - a)</code>.",
      "At the ends return 0 or 1."
     ],
     "check": {
      "tests": "assert abs(uniform_cdf(5, 0, 20) - 0.25) < 1e-12, \"uniform_cdf(5, 0, 20) = 0.25\"\nassert abs(uniform_cdf(12, 10, 14) - 0.5) < 1e-12, \"uniform_cdf(12, 10, 14) = 0.5\"\nassert uniform_cdf(-3, 0, 20) == 0, \"for x less than a: 0\"\nassert uniform_cdf(25, 0, 20) == 1, \"for x greater than b: 1\""
     }
    },
    {
     "title": "Probability of a hot day",
     "prompt": "<p>The daytime temperature in Almaty in July is about <code>NormalDist(mu=29, sigma=4)</code>. Write the function <code>p_above(mu, sigma, x)</code>: return P(X &gt; x).</p><p>For example, <code>p_above(29, 4, 35)</code> ≈ <code>0.067</code>.</p>",
     "hints": [
      "\"Greater than\" is the right tail: <code>1 - cdf(x)</code>."
     ],
     "check": {
      "tests": "assert abs(p_above(29, 4, 35) - 0.0668072) < 1e-6, \"p_above(29, 4, 35) ≈ 0.067: 1 − cdf(35)\"\nassert abs(p_above(40, 5, 50) - 0.0227501) < 1e-6, \"p_above(40, 5, 50) ≈ 0.0228\"\nassert abs(p_above(0, 1, 0) - 0.5) < 1e-12, \"the probability of being above the mean is 0.5\""
     }
    },
    {
     "title": "Uniform interval",
     "prompt": "<p>Write the function <code>uniform_between(lo, hi, a, b)</code>: for X ~ Uniform(a, b) return P(lo &lt; X ≤ hi) = F(hi) − F(lo). If the bounds go outside [a, b], cut them.</p><p>For example, a courier arrives within 0–30 minutes: <code>uniform_between(10, 20, 0, 30)</code> → <code>0.333...</code>.</p>",
     "hints": [
      "First write <code>uniform_cdf</code>.",
      "Interval: F(hi) − F(lo)."
     ],
     "check": {
      "tests": "assert abs(uniform_between(10, 20, 0, 30) - 1 / 3) < 1e-12, \"uniform_between(10, 20, 0, 30) = 1/3\"\nassert abs(uniform_between(-5, 6, 0, 12) - 0.5) < 1e-12, \"a bound that goes below 0 is cut: 6/12 = 0.5\"\nassert abs(uniform_between(0, 100, 0, 30) - 1) < 1e-12, \"the whole interval: 1\""
     }
    },
    {
     "title": "Normal interval",
     "prompt": "<p>Write the function <code>p_between(mu, sigma, lo, hi)</code>: for X ~ Normal(mu, sigma) return P(lo &lt; X ≤ hi).</p><p>For example, the height of men is <code>NormalDist(176, 7)</code>: <code>p_between(176, 7, 170, 185)</code> ≈ <code>0.705</code>.</p>",
     "hints": [
      "<code>d.cdf(hi) - d.cdf(lo)</code>"
     ],
     "check": {
      "tests": "from statistics import NormalDist as _N\nassert abs(p_between(176, 7, 170, 185) - (_N(176, 7).cdf(185) - _N(176, 7).cdf(170))) < 1e-12, \"p_between(176, 7, 170, 185) ≈ 0.705\"\nassert abs(p_between(40, 5, 35, 45) - 0.6826895) < 1e-6, \"the interval ±1 SD ≈ 0.683\"\nassert abs(p_between(0, 1, -1.96, 1.96) - 0.95) < 1e-3, \"the interval ±1.96 ≈ 0.95\""
     }
    },
    {
     "title": "Entrance exam cut-off",
     "prompt": "<p>The scores of the national test are roughly distributed as <code>NormalDist(mu=70, sigma=15)</code>. Write the function <code>top_threshold(mu, sigma, top)</code>: return the score needed to get into the best share <code>top</code> (for example, 0.1 = the best 10%).</p><p>For example, <code>top_threshold(70, 15, 0.1)</code> ≈ <code>89.2</code>.</p>",
     "hints": [
      "The best 10% are above the 90th percentile: <code>inv_cdf(1 - top)</code>."
     ],
     "check": {
      "tests": "assert abs(top_threshold(70, 15, 0.1) - 89.2232735) < 1e-4, \"top_threshold(70, 15, 0.1) ≈ 89.2: inv_cdf(0.9)\"\nassert abs(top_threshold(40, 5, 0.05) - 48.2242681) < 1e-4, \"top_threshold(40, 5, 0.05) ≈ 48.2\"\nassert abs(top_threshold(100, 10, 0.5) - 100) < 1e-9, \"the best 50% are above the mean\""
     }
    },
    {
     "title": "z-score and probability",
     "prompt": "<p>Write two functions:</p><ul><li><code>z_score(x, mu, sigma)</code> — how many SDs x is away from the mean;</li><li><code>p_below_z(z)</code> — P(Z ≤ z) for the standard normal distribution (<code>NormalDist()</code>).</li></ul><p>For example, <code>z_score(50, 40, 5)</code> → <code>2.0</code>, <code>p_below_z(2.0)</code> ≈ <code>0.977</code>.</p>",
     "hints": [
      "z = (x − μ) / σ.",
      "<code>NormalDist()</code> means μ = 0, σ = 1."
     ],
     "check": {
      "tests": "from statistics import NormalDist as _N\nassert abs(z_score(50, 40, 5) - 2) < 1e-12, \"z_score(50, 40, 5) = 2\"\nassert abs(z_score(30, 40, 5) + 2) < 1e-12, \"below the mean: z = −2\"\nassert abs(p_below_z(2.0) - 0.9772499) < 1e-6, \"p_below_z(2.0) ≈ 0.977\"\nassert abs(p_below_z(z_score(45, 40, 5)) - _N(40, 5).cdf(45)) < 1e-12, \"the probability obtained through z should match NormalDist(40, 5).cdf(45)\""
     }
    },
    {
     "title": "Warranty period",
     "prompt": "<p>The service life of a battery (in years) follows <code>NormalDist(mu=5, sigma=1.2)</code>. Write two functions:</p><ul><li><code>warranty(mu, sigma, risk)</code> — the period (in years) by which only the share <code>risk</code> of the goods fail;</li><li><code>claim_cost(mu, sigma, w, n, cost)</code> — the expected warranty costs for the period <code>w</code> when <code>n</code> goods are sold: n × P(X &lt; w) × cost.</li></ul><p>For example, <code>warranty(5, 1.2, 0.03)</code> ≈ <code>2.74</code> years.</p>",
     "hints": [
      "The left tail: <code>inv_cdf(risk)</code>.",
      "Probability of failure: <code>cdf(w)</code>."
     ],
     "check": {
      "tests": "assert abs(warranty(5, 1.2, 0.03) - 2.7430477) < 1e-4, \"warranty(5, 1.2, 0.03) ≈ 2.74: inv_cdf(risk)\"\nassert abs(warranty(5, 1.2, 0.5) - 5) < 1e-9, \"if risk = 0.5, the period equals the mean\"\nassert abs(claim_cost(5, 1.2, 5, 1000, 20000) - 10000000) < 1e-3, \"period = mean: half of the goods fail, 1000 × 0.5 × 20 000\"\nassert abs(claim_cost(5, 1.2, warranty(5, 1.2, 0.03), 2000, 15000) - 900000) < 1, \"with a 3% risk out of 2000 goods: 2000 × 0.03 × 15 000 = 900 000\""
     }
    },
    {
     "title": "Normal approximation of Binomial",
     "prompt": "<p>When n is large, Binomial(n, p) ≈ Normal(np, √(np(1 − p))). Write the function <code>normal_approx(k, n, p)</code>: return the approximation of P(X ≤ k) through <code>NormalDist</code> with a correction: <code>cdf(k + 0.5)</code>.</p><p>For example, <code>normal_approx(35, 100, 0.3)</code> ≈ <code>0.885</code>, while the exact Binomial value is ≈ 0.884.</p>",
     "hints": [
      "mu = n × p, sigma = √(n × p × (1 − p)) — this is the SD, not the variance.",
      "<code>d.cdf(k + 0.5)</code>"
     ],
     "check": {
      "tests": "import math as _m\nassert abs(normal_approx(35, 100, 0.3) - 0.8849689) < 1e-5, \"normal_approx(35, 100, 0.3) ≈ 0.885: sigma = √(np(1 − p))\"\n_exact = sum(_m.comb(400, _k) * 0.1 ** _k * 0.9 ** (400 - _k) for _k in range(46))\nassert abs(normal_approx(45, 400, 0.1) - _exact) < 0.01, \"for n = 400 the approximation should be close to the exact value\""
     }
    }
   ]
  },
  "pr-10": {
   "pr": [
    {
     "title": "E[X] from two lists",
     "prompt": "<p>Write the function <code>expected(values, probs)</code>: the values and the probabilities are in two separate lists. Return E[X].</p><p>For example, <code>expected([0, 4000], [0.95, 0.05])</code> → <code>200.0</code>.</p>",
     "hints": [
      "Multiply the pairs from <code>zip(values, probs)</code> and add them up."
     ],
     "check": {
      "tests": "assert abs(expected([0, 4000], [0.95, 0.05]) - 200) < 1e-9, \"expected([0, 4000], [0.95, 0.05]) = 200\"\nassert abs(expected([1, 2, 3, 4, 5, 6], [1 / 6] * 6) - 3.5) < 1e-9, \"a die: 3.5\"\nassert expected([10], [1]) == 10, \"one value: E[X] = 10\""
     }
    },
    {
     "title": "Is the distribution valid",
     "prompt": "<p>Write the function <code>is_valid(dist)</code>: <code>dist</code> is <code>{value: probability}</code>. Return <code>True</code> if all probabilities lie between 0 and 1 and their sum equals 1 (the difference is less than 1e-9).</p><p>For example, <code>is_valid({0: 0.95, 4000: 0.05})</code> → <code>True</code>, <code>is_valid({0: 0.9, 1: 0.2})</code> → <code>False</code>.</p>",
     "hints": [
      "<code>all(0 &lt;= p &lt;= 1 for p in dist.values())</code>",
      "Check the sum with <code>abs(sum(...) - 1) &lt; 1e-9</code>."
     ],
     "check": {
      "tests": "assert is_valid({0: 0.95, 4000: 0.05}) is True, \"{0: 0.95, 4000: 0.05} — a valid distribution\"\nassert is_valid({0: 0.9, 1: 0.2}) is False, \"the sum is 1.1: not valid\"\nassert is_valid({0: 1.5, 1: -0.5}) is False, \"a negative probability cannot exist\"\nassert is_valid({1: 0.1, 2: 0.2, 3: 0.7}) is True, \"0.1 + 0.2 + 0.7 = 1 (mind the rounding error)\""
     }
    },
    {
     "title": "Standard deviation",
     "prompt": "<p>Write the function <code>sd(dist)</code>: for a distribution <code>{value: probability}</code> return the standard deviation (√Var).</p><p>For example, <code>sd({0: 0.95, 4000: 0.05})</code> ≈ <code>871.8</code>.</p>",
     "hints": [
      "First E[X], then Var(X), at the end <code>** 0.5</code>."
     ],
     "check": {
      "tests": "assert abs(sd({0: 0.95, 4000: 0.05}) - 760000 ** 0.5) < 1e-6, \"sd({0: 0.95, 4000: 0.05}) = √760 000 ≈ 871.8\"\nassert abs(sd({5: 1.0})) < 1e-12, \"a constant has SD 0\"\nassert abs(sd({-1: 0.5, 1: 0.5}) - 1) < 1e-12, \"sd({-1: 0.5, 1: 0.5}) = 1\""
     }
    },
    {
     "title": "Distribution of net profit",
     "prompt": "<p>Write the function <code>net_dist(price, prizes)</code>: a lottery ticket costs <code>price</code> tenge, <code>prizes</code> is <code>{prize: probability}</code>, and with the remaining probability the prize is 0. Return the distribution of the net profit (prize − price) as a dictionary <code>{net profit: probability}</code>.</p><p>For example, <code>net_dist(500, {100000: 0.001, 5000: 0.01})</code> → <code>{99500: 0.001, 4500: 0.01, -500: 0.989}</code>.</p>",
     "hints": [
      "Subtract the price from each prize.",
      "The no-prize case: net profit <code>-price</code>, probability <code>1 - sum(prizes.values())</code>."
     ],
     "check": {
      "tests": "_d = net_dist(500, {100000: 0.001, 5000: 0.01})\nassert set(_d) == {99500, 4500, -500}, f\"the values should be {{99500, 4500, -500}}, you got {set(_d)}\"\nassert abs(_d[-500] - 0.989) < 1e-9, \"the no-prize case: −500 ₸, probability 0.989\"\nassert abs(sum(_x * _p for _x, _p in _d.items()) + 350) < 1e-6, \"the expected net profit should be −350 ₸\""
     }
    },
    {
     "title": "Which option is better",
     "prompt": "<p>Write the function <code>choose(d1, d2)</code>: return the number of the distribution (<code>1</code> or <code>2</code>) with the larger E[X]. If the E[X] are equal (the difference is less than 1e-9), choose the option with the smaller variance (less risk).</p><p>For example, <code>choose({100: 1.0}, {0: 0.5, 200: 0.5})</code> → <code>1</code>.</p>",
     "hints": [
      "Use the <code>expected_value</code> and <code>variance</code> functions from the lesson.",
      "First check whether E[X] are equal."
     ],
     "check": {
      "tests": "assert choose({100: 1.0}, {0: 0.5, 200: 0.5}) == 1, \"E[X] are equal (100), the first is more stable: 1\"\nassert choose({0: 0.5, 200: 0.5}, {100: 1.0}) == 2, \"E[X] are equal, the second is more stable: 2\"\nassert choose({0: 0.95, 4000: 0.05}, {0: 0.93, 3000: 0.07}) == 2, \"210 > 200: 2\"\nassert choose({0: 0.9, 1000: 0.1}, {50: 1.0}) == 1, \"100 > 50: 1\""
     }
    },
    {
     "title": "Linear transformation",
     "prompt": "<p>Write the function <code>transform(dist, a, b)</code>: from the distribution of X return the distribution of Y = a × X + b as <code>{value: probability}</code>.</p><p>For example, if X is the number of sales of an item at 1 000 ₸, the income is Y = 1000 × X: <code>transform({0: 0.5, 1: 0.5}, 1000, 0)</code> → <code>{0: 0.5, 1000: 0.5}</code>. In the check you will see that E[Y] = a × E[X] + b and Var(Y) = a² × Var(X).</p>",
     "hints": [
      "Replace each value with <code>a * x + b</code>; the probability does not change."
     ],
     "check": {
      "tests": "assert transform({0: 0.5, 1: 0.5}, 1000, 0) == {0: 0.5, 1000: 0.5}, \"transform({0: 0.5, 1: 0.5}, 1000, 0) = {0: 0.5, 1000: 0.5}\"\ndef _ev(d): return sum(x * p for x, p in d.items())\ndef _var(d):\n    m = _ev(d)\n    return sum((x - m) ** 2 * p for x, p in d.items())\n_d = {1: 0.2, 2: 0.5, 4: 0.3}\n_y = transform(_d, 3, -2)\nassert abs(_ev(_y) - (3 * _ev(_d) - 2)) < 1e-9, \"E[Y] = a × E[X] + b болуы керек\"\nassert abs(_var(_y) - 9 * _var(_d)) < 1e-9, \"Var(Y) = a² × Var(X): b does not change the variance\""
     }
    },
    {
     "title": "E and Var for Binomial",
     "prompt": "<p>Write the function <code>binom_dict(n, p)</code>: return the distribution Binomial(n, p) as a dictionary <code>{k: P(X = k)}</code>. Then write the functions <code>expected_value</code> and <code>variance</code> and check that they give n × p and n × p × (1 − p).</p>",
     "hints": [
      "<code>{k: math.comb(n, k) * ... for k in range(n + 1)}</code>",
      "E and Var are the functions from the lesson."
     ],
     "check": {
      "tests": "_d = binom_dict(20, 0.1)\nassert len(_d) == 21 and abs(sum(_d.values()) - 1) < 1e-9, \"binom_dict(20, 0.1): 21 values, the sum is 1\"\nassert abs(expected_value(_d) - 2) < 1e-9, \"E[X] = n × p = 2\"\nassert abs(variance(_d) - 1.8) < 1e-9, \"Var(X) = n × p × (1 − p) = 1.8\"\n_d2 = binom_dict(50, 0.3)\nassert abs(expected_value(_d2) - 15) < 1e-9 and abs(variance(_d2) - 10.5) < 1e-9, \"n = 50, p = 0.3: E = 15, Var = 10.5\""
     }
    },
    {
     "title": "Courier's expected income",
     "prompt": "<p>A courier gets <code>per_order</code> ₸ for each order, and if during the day they deliver at least <code>threshold</code> orders, they get an extra bonus of <code>bonus</code> ₸. The number of orders per day is Poisson(λ). Write the function <code>expected_pay(lam, per_order, bonus, threshold)</code>: return the expected daily income.</p><p>Hint: E[income] = per_order × λ + bonus × P(X ≥ threshold). For example, <code>expected_pay(8, 500, 3000, 10)</code> ≈ <code>4850.1</code> ₸.</p>",
     "hints": [
      "The mean of Poisson is λ: the income from orders is per_order × λ.",
      "P(X ≥ t) = 1 − P(X ≤ t − 1), that is, <code>range(threshold)</code>."
     ],
     "check": {
      "tests": "assert abs(expected_pay(8, 500, 3000, 10) - 4850.1272) < 0.01, \"expected_pay(8, 500, 3000, 10) ≈ 4850.1: P(X ≥ 10) = 1 − P(X ≤ 9)\"\nassert abs(expected_pay(5, 400, 0, 3) - 2000) < 1e-9, \"Бонус 0 болса, тек 400 × 5 = 2000\"\nassert abs(expected_pay(4, 0, 1000, 0) - 1000) < 1e-9, \"if threshold = 0, the bonus is always paid\""
     }
    }
   ]
  }
 }
});
