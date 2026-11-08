// inference practice tasks: English text. Code, solutions and checks are in content/practice/inference.js.
DJ.i18n.patch({
 "lessons": {
  "ab-1": {
   "pr": [
    {
     "title": "Sample means",
     "prompt": "<p>Write the function <code>sample_means(samples)</code>: <code>samples</code> is a list of samples (each sample is a list of numbers). Return the list of the means of each sample.</p><p>For example, <code>sample_means([[1, 3], [10, 20, 30]])</code> → <code>[2, 20]</code>.</p>",
     "hints": [
      "<code>[statistics.mean(s) for s in samples]</code>"
     ],
     "check": {
      "tests": "assert sample_means([[1, 3], [10, 20, 30]]) == [2, 20], \"sample_means([[1, 3], [10, 20, 30]]) = [2, 20]\"\nassert sample_means([[5]]) == [5], \"the mean of a sample with one value is that value\"\nassert sample_means([]) == [], \"if there are no samples, an empty list\""
     }
    },
    {
     "title": "Random sample",
     "prompt": "<p>Write the function <code>draw(pop, n)</code>: using <code>random.choice</code>, take <code>n</code> elements from the population (with replacement) and return a list. Do not set a seed inside the function.</p><p>For example, <code>draw([1200, 3500, 800], 5)</code> → a list like <code>[800, 1200, 1200, 3500, 800]</code>.</p>",
     "hints": [
      "<code>[random.choice(pop) for _ in range(n)]</code>"
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(1)\n_pop = [1200, 3500, 800, 15000]\n_s = draw(_pop, 30)\nassert isinstance(_s, list) and len(_s) == 30, \"return a list of length n = 30\"\nassert all(_x in _pop for _x in _s), \"all elements must be taken from the population\"\nassert draw(_pop, 0) == [], \"if n = 0, an empty list\"\n_r.seed(2)\n_big = draw([0, 1], 20000)\nassert abs(sum(_big) / 20000 - 0.5) < 0.02, \"each element must be chosen with the same probability\""
     }
    },
    {
     "title": "Expected spread",
     "prompt": "<p>By the CLT, the standard deviation of the sample means is σ / √n. Write the function <code>expected_spread(sigma, n)</code>.</p><p>For example, the SD of the receipts is 50 thousand ₸, the sample is 30 clients: <code>expected_spread(50, 30)</code> ≈ <code>9.13</code>.</p>",
     "hints": [
      "<code>sigma / math.sqrt(n)</code>"
     ],
     "check": {
      "tests": "assert abs(expected_spread(50, 30) - 50 / 30 ** 0.5) < 1e-9, \"expected_spread(50, 30) ≈ 9.13\"\nassert abs(expected_spread(10, 100) - 1) < 1e-12, \"expected_spread(10, 100) = 1\"\nassert abs(expected_spread(10, 400) - 0.5) < 1e-12, \"if n increases four times, the spread decreases by a factor of two: 0.5\""
     }
    },
    {
     "title": "Uniform population",
     "prompt": "<p>Write the function <code>sim_means(k, n)</code>: take <code>k</code> samples, each of <code>n</code> values (<code>random.random()</code>, that is, uniform from 0 to 1), and return the list of their means. Do not set a seed inside the function.</p><p>The mean of Uniform(0, 1) is 0.5, the SD ≈ 0.2887, so for n = 30 the SD of the means ≈ 0.2887 / √30 ≈ 0.0527.</p>",
     "hints": [
      "The outer loop runs <code>k</code> times, the inner one <code>n</code> times.",
      "Add the <code>statistics.mean</code> of each sample to the list."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\n_r.seed(5)\n_m = sim_means(2000, 30)\nassert len(_m) == 2000, \"k = 2000 орташа болуы керек\"\nassert abs(_st.mean(_m) - 0.5) < 0.01, f\"the mean of the means should be ≈ 0.5, you got {_st.mean(_m):.3f}\"\nassert abs(_st.stdev(_m) - 0.2887 / 30 ** 0.5) < 0.005, f\"the SD of the means should be ≈ 0.0527, you got {_st.stdev(_m):.4f}. Does each sample have n values?\""
     }
    },
    {
     "title": "Sample from receipts",
     "prompt": "<p>The receipts of a shop in Kostanay (thousand ₸) are in the list <code>checks</code>; the distribution is strongly skewed to the right. Write the function <code>resample_means(pop, n, k)</code>: using <code>random.choice</code>, take <code>k</code> samples of <code>n</code> elements from the population and return the list of means.</p><p>By the CLT, the SD of the means ≈ <code>statistics.pstdev(pop) / √n</code>.</p>",
     "hints": [
      "One sample: <code>[random.choice(pop) for _ in range(n)]</code>.",
      "Add its mean to the list <code>means</code>, repeat this <code>k</code> times."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\n_r.seed(7)\n_m = resample_means(checks, 40, 2000)\nassert len(_m) == 2000, \"k = 2000 орташа болуы керек\"\nassert abs(_st.mean(_m) - _st.mean(checks)) < 1.0, f\"the mean of the means should be close to the mean of the population (≈ 20.5), you got {_st.mean(_m):.2f}\"\n_e = _st.pstdev(checks) / 40 ** 0.5\nassert abs(_st.stdev(_m) - _e) < 0.4, f\"the SD of the means should be ≈ {_e:.2f}, you got {_st.stdev(_m):.2f}\""
     }
    },
    {
     "title": "Share inside the bounds",
     "prompt": "<p>Write the function <code>coverage(means, mu, se)</code>: return the share of the means from <code>means</code> that fall into the interval μ ± 1.96 × SE (the bounds included). By the CLT this should be ≈ 0.95.</p><p>For example, <code>coverage([48, 50, 70], 50, 5)</code> → 2 / 3.</p>",
     "hints": [
      "Bounds: <code>mu - 1.96 * se</code> and <code>mu + 1.96 * se</code>.",
      "Count those inside and divide by <code>len(means)</code>."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\nassert abs(coverage([48, 50, 70], 50, 5) - 2 / 3) < 1e-12, \"coverage([48, 50, 70], 50, 5) = 2/3: 70 is outside the interval\"\nassert coverage([40.2, 59.8], 50, 5) == 1, \"values on the boundary (50 ± 9.8) are included\"\n_r.seed(3)\n_ms = [_st.mean([_r.expovariate(1 / 50) for _ in range(40)]) for _ in range(1500)]\n_c = coverage(_ms, 50, 50 / 40 ** 0.5)\nassert 0.92 < _c < 0.97, f\"by the CLT the share should be ≈ 0.95, you got {_c:.3f}\""
     }
    },
    {
     "title": "Conversion shares",
     "prompt": "<p>Write the function <code>sim_props(k, n, p)</code>: run <code>k</code> experiments, in each of which <code>n</code> visitors arrive and each buys with probability <code>p</code>, and return the list of the conversion shares in each experiment. Do not set a seed inside the function.</p><p>The shares are also means (of 0 and 1), so by the CLT their SD ≈ √(p(1 − p) / n).</p>",
     "hints": [
      "In each experiment count those for whom <code>random.random() &lt; p</code>.",
      "Share: buyers / n."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\n_r.seed(10)\n_v = sim_props(2000, 100, 0.2)\nassert len(_v) == 2000, \"with k = 2000 there should be 2000 shares\"\nassert abs(_st.mean(_v) - 0.2) < 0.005, f\"the mean of the shares should be ≈ 0.2, you got {_st.mean(_v):.4f}\"\nassert abs(_st.stdev(_v) - 0.04) < 0.004, f\"the SD of the shares should be ≈ √(0.2 × 0.8 / 100) = 0.04, you got {_st.stdev(_v):.4f}\""
     }
    },
    {
     "title": "Distribution of the dice mean",
     "prompt": "<p>Without simulation, the exact distribution. Write the function <code>mean_dist(k)</code>: when <code>k</code> dice are rolled, return the distribution of their <b>mean</b> as a dictionary <code>{mean: Fraction}</code> (<code>itertools.product</code>). The mean is <code>sum(w) / k</code>.</p><p>For example, <code>mean_dist(2)[3.5]</code> → <code>Fraction(1, 6)</code>. As k grows, the distribution gathers around the middle (the CLT).</p>",
     "hints": [
      "Compute the mean of each outcome and count them in a dictionary.",
      "At the end convert each number to <code>Fraction(c, len(omega))</code>."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\n_d2 = mean_dist(2)\nassert _d2[3.5] == _F(1, 6), \"for two dice the mean 3.5 (sum 7): 1/6\"\nassert _d2[1.0] == _F(1, 36), \"Орташа 1: тек (1, 1)\"\nassert sum(_d2.values()) == 1, \"the sum of the probabilities is 1\"\n_d3 = mean_dist(3)\n_mu = sum(_m * _p for _m, _p in _d3.items())\n_var = sum((_m - _mu) ** 2 * _p for _m, _p in _d3.items())\nassert abs(_mu - 3.5) < 1e-9, \"the mean of the means is 3.5\"\nassert abs(_var - 35 / 12 / 3) < 1e-9, \"the variance of the mean: σ² / n = (35/12) / 3\""
     }
    }
   ]
  },
  "ab-2": {
   "pr": [
    {
     "title": "SE of a conversion",
     "prompt": "<p>Write the function <code>se_counts(x, n)</code>: <code>x</code> is the number of buyers, <code>n</code> is the number of visitors. Return the standard error of the conversion.</p><p>For example, <code>se_counts(48, 400)</code> ≈ <code>0.01625</code>.</p>",
     "hints": [
      "First <code>p = x / n</code>.",
      "SE = √(p(1 − p) / n)."
     ],
     "check": {
      "tests": "assert abs(se_counts(48, 400) - 0.0162481) < 1e-6, \"se_counts(48, 400) ≈ 0.01625\"\nassert abs(se_counts(50, 100) - 0.05) < 1e-12, \"se_counts(50, 100) = 0.05\"\nassert se_counts(0, 100) == 0, \"if nobody bought, SE = 0\""
     }
    },
    {
     "title": "When σ is known",
     "prompt": "<p>Write the function <code>se_known(sigma, n)</code>: if the SD of the population <code>sigma</code> is known, return the SE of the mean of <code>n</code> observations.</p><p>For example, the SD of the delivery time is 12 minutes, 36 orders: <code>se_known(12, 36)</code> → <code>2.0</code>.</p>",
     "hints": [
      "SE = σ / √n."
     ]
    },
    {
     "title": "SE in percentage points",
     "prompt": "<p>Write the function <code>se_pp(p, n)</code>: conversion <code>p</code>, sample <code>n</code>. Return the SE in <b>percentage points</b> (multiply by 100).</p><p>For example, <code>se_pp(0.2, 1600)</code> → <code>1.0</code>.</p>",
     "hints": [
      "In the formula use the share (0.2), multiply by 100 only at the end."
     ]
    },
    {
     "title": "Required sample size",
     "prompt": "<p>Write the function <code>n_for_se(p, target)</code>: if the conversion is about <code>p</code>, return the smallest n (an integer rounded up with <code>math.ceil</code>) for which the SE does not exceed <code>target</code>.</p><p>From the formula: n = p(1 − p) / target². For example, <code>n_for_se(0.12, 0.015)</code> → <code>470</code>.</p>",
     "hints": [
      "Solve for n from the equation SE = √(p(1 − p) / n).",
      "<code>math.ceil</code> rounds up."
     ],
     "check": {
      "tests": "assert n_for_se(0.12, 0.015) == 470, \"n_for_se(0.12, 0.015) = 470: 0.1056 / 0.000225 ≈ 469.3\"\nassert n_for_se(0.3, 0.02) == 525, \"n_for_se(0.3, 0.02) = 525\"\nassert isinstance(n_for_se(0.05, 0.01), int), \"return an integer: math.ceil\""
     }
    },
    {
     "title": "SE by city",
     "prompt": "<p>Write the function <code>se_by_city(data)</code>: <code>data</code> is <code>{city: list of receipts}</code>. Return the SE of the mean receipt of each city (the sample SD / √n) as a dictionary <code>{city: SE}</code>.</p>",
     "hints": [
      "Apply the <code>se_mean</code> formula from the lesson to each city.",
      "Build the dictionary: <code>{city: ... for city, xs in data.items()}</code>."
     ],
     "check": {
      "tests": "import statistics as _st\n_d = {\"Алматы\": [2, 4, 6, 8], \"Орал\": [5, 5, 6, 6, 7, 7]}\n_r = se_by_city(_d)\nassert set(_r) == {\"Алматы\", \"Орал\"}, \"one value for each city\"\nassert abs(_r[\"Алматы\"] - 1.2909944) < 1e-6, \"Алматы: stdev 2.582 / √4 ≈ 1.291\"\nassert abs(_r[\"Орал\"] - _st.stdev(_d[\"Орал\"]) / 6 ** 0.5) < 1e-9, \"Uralsk: the sample SD (n − 1) / √6\""
     }
    },
    {
     "title": "The difference between SD and SE",
     "prompt": "<p>Write the function <code>sd_and_se(xs)</code>: return the pair <code>(sd, se)</code>, where <code>sd</code> is the sample SD (<code>statistics.stdev</code>) and <code>se</code> = sd / √n.</p><p>For example, <code>sd_and_se([2, 4, 6, 8])</code> ≈ <code>(2.582, 1.291)</code>. If the data are multiplied by 4, the SD roughly does not change, while the SE decreases.</p>",
     "hints": [
      "<code>sd = statistics.stdev(xs)</code>, then <code>sd / math.sqrt(len(xs))</code>."
     ],
     "check": {
      "tests": "_sd, _se = sd_and_se([2, 4, 6, 8])\nassert abs(_sd - 2.5819889) < 1e-6 and abs(_se - 1.2909944) < 1e-6, \"sd_and_se([2, 4, 6, 8]) ≈ (2.582, 1.291)\"\n_sd4, _se4 = sd_and_se([2, 4, 6, 8] * 4)\nassert abs(_sd4 - _sd) < 0.3, \"if the data are multiplied by 4, the SD roughly does not change\"\nassert _se4 < _se / 1.8, \"if the data are multiplied by 4, the SE roughly halves\""
     }
    },
    {
     "title": "Checking SE by simulation",
     "prompt": "<p>Write the function <code>sim_se(p, n, k)</code>: run <code>k</code> samples of visitors of <code>n</code> people each (each buys with probability <code>p</code>) and return the <code>statistics.stdev</code> of the conversion shares. It should be close to √(p(1 − p) / n) from the formula.</p>",
     "hints": [
      "In each sample count the share of buyers.",
      "The empirical SE is the <code>statistics.stdev</code> of all the shares."
     ],
     "check": {
      "tests": "import random as _r, math as _m\n_r.seed(12)\n_v = sim_se(0.12, 400, 500)\n_e = _m.sqrt(0.12 * 0.88 / 400)\nassert abs(_v - _e) / _e < 0.1, f\"the simulated SE ≈ {_e:.4f} should be close, you got {_v:.4f}\"\n_r.seed(13)\n_v2 = sim_se(0.5, 100, 500)\nassert abs(_v2 - 0.05) < 0.006, f\"p = 0.5, n = 100: SE ≈ 0.05, you got {_v2:.4f}\""
     }
    },
    {
     "title": "The most precise estimate",
     "prompt": "<p>Write the function <code>most_precise(data)</code>: <code>data</code> is <code>{city: (buyers, visitors)}</code>. Return the name of the city whose conversion SE is the smallest.</p><p>For example, <code>{\"Алматы\": (300, 5000), \"Тараз\": (40, 400)}</code> → <code>\"Алматы\"</code>.</p>",
     "hints": [
      "For each city compute the SE through <code>se_prop(x / n, n)</code>.",
      "<code>min(data, key=...)</code> gives the smallest key."
     ],
     "check": {
      "tests": "assert most_precise({\"Алматы\": (300, 5000), \"Тараз\": (40, 400)}) == \"Алматы\", \"Almaty has a larger n, so its SE is smaller\"\nassert most_precise({\"Атырау\": (10, 1000), \"Ақтау\": (500, 1000)}) == \"Атырау\", \"if n are the same, the city where p(1 − p) is smaller is more precise: Atyrau (1%)\"\nassert most_precise({\"Семей\": (5, 50)}) == \"Семей\", \"if there is only one city, it is the answer\""
     }
    }
   ]
  },
  "ab-3": {
   "pr": [
    {
     "title": "Z-value from the level",
     "prompt": "<p>Write the function <code>z_for(level)</code>: for a confidence level <code>level</code> (for example, 0.95) return the two-sided z-value.</p><p>For example, <code>z_for(0.95)</code> ≈ <code>1.96</code>, <code>z_for(0.99)</code> ≈ <code>2.576</code>.</p>",
     "hints": [
      "There are two tails: <code>inv_cdf(1 - (1 - level) / 2)</code>."
     ]
    },
    {
     "title": "Margin of error",
     "prompt": "<p>Write the function <code>margin_prop(p, n, level=0.95)</code>: from the conversion share <code>p</code> and the sample <code>n</code>, return the margin of error of the CI (z × SE).</p><p>For example, <code>margin_prop(0.12, 400)</code> ≈ <code>0.0318</code>.</p>",
     "hints": [
      "z comes from the level, SE = √(p(1 − p) / n)."
     ],
     "check": {
      "tests": "assert abs(margin_prop(0.12, 400) - 0.0318458) < 1e-5, \"margin_prop(0.12, 400) ≈ 0.0318\"\nassert margin_prop(0.12, 400, 0.99) > margin_prop(0.12, 400), \"the margin of error for 99% should be larger than for 95%: use the level parameter\""
     }
    },
    {
     "title": "Is it inside the interval",
     "prompt": "<p>Write the function <code>contains(ci, value)</code>: <code>ci</code> is <code>(low, high)</code>. Return <code>True</code> if the value lies in the interval (the bounds included).</p><p>For example, <code>contains((0.088, 0.152), 0.1)</code> → <code>True</code>.</p>",
     "hints": [
      "<code>low &lt;= value &lt;= high</code>"
     ],
     "check": {
      "tests": "assert contains((0.088, 0.152), 0.1) is True, \"0.1 интервалда\"\nassert contains((0.088, 0.152), 0.2) is False, \"0.2 интервалдан тыс\"\nassert contains((4200, 4800), 4200) is True, \"the bound is included\""
     }
    },
    {
     "title": "Width of the interval",
     "prompt": "<p>Write the function <code>width_prop(x, n, level=0.95)</code>: return the width (high − low) of the confidence interval for a proportion.</p><p>For example, <code>width_prop(48, 400)</code> ≈ <code>0.0637</code>. If the sample is increased four times (192 / 1600), the width decreases by a factor of two.</p>",
     "hints": [
      "Width = 2 × z × SE."
     ],
     "check": {
      "tests": "assert abs(width_prop(48, 400) - 0.0636916) < 1e-5, \"width_prop(48, 400) ≈ 0.0637\"\nassert abs(width_prop(192, 1600) - width_prop(48, 400) / 2) < 1e-9, \"if n increases four times, the width decreases by a factor of two\"\nassert width_prop(48, 400, 0.9) < width_prop(48, 400), \"the 90% interval is narrower: use the level parameter\""
     }
    },
    {
     "title": "Survey size",
     "prompt": "<p>Survey planning. Write the function <code>n_for_margin(p, m, level=0.95)</code>: return the smallest n (an integer, <code>math.ceil</code>) for which the margin of error does not exceed <code>m</code>. Formula: n = z² × p(1 − p) / m².</p><p>For example, if p is unknown, take the most cautious assumption p = 0.5: <code>n_for_margin(0.5, 0.03)</code> → <code>1068</code>.</p>",
     "hints": [
      "Solve for n from the equation m = z × √(p(1 − p) / n)."
     ],
     "check": {
      "tests": "assert n_for_margin(0.5, 0.03) == 1068, \"n_for_margin(0.5, 0.03) = 1068\"\nassert n_for_margin(0.12, 0.02) == 1015, \"n_for_margin(0.12, 0.02) = 1015\"\nassert n_for_margin(0.5, 0.03, 0.99) > 1068, \"for the 99% level more people are needed: use the level parameter\""
     }
    },
    {
     "title": "Interval with known σ",
     "prompt": "<p>Write the function <code>ci_known(mean, sigma, n, level=0.95)</code>: if the SD of the population <code>sigma</code> is known, return the CI for the mean as <code>(low, high)</code>.</p><p>For example, the average taxi trip time in Almaty is 24 minutes, σ = 6, n = 36: <code>ci_known(24, 6, 36)</code> ≈ <code>(22.04, 25.96)</code>.</p>",
     "hints": [
      "SE = σ / √n, then mean ± z × SE."
     ],
     "check": {
      "tests": "_r = ci_known(24, 6, 36)\nassert _r is not None and len(_r) == 2, \"return (low, high)\"\nassert abs(_r[0] - 22.040036) < 1e-4 and abs(_r[1] - 25.959964) < 1e-4, f\"ci_known(24, 6, 36) ≈ (22.04, 25.96), you got {_r}\"\n_r9 = ci_known(24, 6, 36, 0.90)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], \"90% интервал тар болуы керек\""
     }
    },
    {
     "title": "Interval coverage",
     "prompt": "<p>\"95% CI\" is a statement about the method. Let us check it: the function <code>coverage_sim(p, n, k, level=0.95)</code> runs <code>k</code> samples of <code>n</code> visitors (true conversion <code>p</code>), builds a confidence interval for the proportion for each, and returns the share of intervals that contain the true <code>p</code>.</p><p>The result should be close to <code>level</code>.</p>",
     "hints": [
      "Use the <code>ci_prop</code> function from the lesson.",
      "In each sample count x and check whether the interval contains p."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(14)\n_c = coverage_sim(0.3, 200, 800)\nassert 0.92 < _c < 0.975, f\"about 95% of the intervals should contain p, you got {_c:.3f}\"\n_r.seed(15)\n_c9 = coverage_sim(0.3, 200, 800, 0.8)\nassert 0.75 < _c9 < 0.85, f\"at the 80% level it should be ≈ 0.8, you got {_c9:.3f}\""
     }
    },
    {
     "title": "Cities above the target",
     "prompt": "<p>Write the function <code>above_target(data, target, level=0.95)</code>: <code>data</code> is <code>{city: (buyers, visitors)}</code>. Return the list of names of the cities whose conversion CI lies <b>entirely</b> above <code>target</code> (low &gt; target), sorted alphabetically.</p>",
     "hints": [
      "For each city build <code>ci_prop</code> and compare the lower bound with <code>target</code>.",
      "At the end <code>sorted(...)</code>."
     ],
     "check": {
      "tests": "_d = {\"Алматы\": (600, 5000), \"Астана\": (130, 1000), \"Шымкент\": (28, 200), \"Ақтөбе\": (90, 1000)}\nassert above_target(_d, 0.1) == [\"Алматы\", \"Астана\"], \"Almaty (12%, CI ≈ 11.1–12.9%) and Astana (13%, CI ≈ 10.9–15.1%) are above 10%; the interval of Shymkent (14%) is wide and contains 10%\"\nassert above_target(_d, 0.2) == [], \"no city is clearly above 20%\"\nassert above_target(_d, 0.1, 0.5) == [\"Алматы\", \"Астана\", \"Шымкент\"], \"at the 50% level the interval is narrow: Shymkent is included too\""
     }
    }
   ]
  },
  "ab-4": {
   "pr": [
    {
     "title": "One-sided p-value",
     "prompt": "<p>Write the function <code>p_right(z)</code>: return the probability of the right tail P(Z &gt; z).</p><p>For example, <code>p_right(2.1)</code> ≈ <code>0.0179</code>.</p>",
     "hints": [
      "<code>1 - NormalDist().cdf(z)</code>"
     ],
     "check": {
      "tests": "assert abs(p_right(2.1) - 0.0178644) < 1e-6, \"p_right(2.1) ≈ 0.0179\"\nassert abs(p_right(0) - 0.5) < 1e-12, \"p_right(0) = 0.5\"\nassert p_right(-3) > 0.99, \"for a negative z the right tail is larger\""
     }
    },
    {
     "title": "Decision about H0",
     "prompt": "<p>Write the function <code>reject(p, alpha=0.05)</code>: if the p-value is less than α, return <code>True</code> (H0 is rejected), otherwise <code>False</code>.</p><p>For example, <code>reject(0.0357)</code> → <code>True</code>, <code>reject(0.134)</code> → <code>False</code>.</p>",
     "hints": [
      "<code>p &lt; alpha</code>"
     ],
     "check": {
      "tests": "assert reject(0.0357) is True, \"0.0357 < 0.05: H0 is rejected\"\nassert reject(0.134) is False, \"0.134 ≥ 0.05: the evidence is not sufficient\"\nassert reject(0.03, alpha=0.01) is False, \"at α = 0.01 the value 0.03 is not enough\"\nassert reject(0.05) is False, \"if p = α, we do not reject H0 (the inequality is strict)\""
     }
    },
    {
     "title": "Test statistic",
     "prompt": "<p>Write the function <code>z_stat(est, h0, se)</code>: return how many SEs the estimate is away from the H0 value.</p><p>For example, a conversion of 12%, H0: 10%, SE = 0.008: <code>z_stat(0.12, 0.10, 0.008)</code> → <code>2.5</code>.</p>",
     "hints": [
      "z = (estimate − H0 value) / SE."
     ],
     "check": {
      "tests": "assert abs(z_stat(0.12, 0.10, 0.008) - 2.5) < 1e-9, \"z_stat(0.12, 0.10, 0.008) = 2.5\"\nassert abs(z_stat(48, 50, 4) + 0.5) < 1e-12, \"if the estimate is smaller, z is negative: −0.5\""
     }
    },
    {
     "title": "Test against a norm",
     "prompt": "<p>A company claims a conversion of 10%. In a new month, <code>x</code> of <code>n</code> visitors bought. Write the function <code>one_prop_test(x, n, p0)</code>: under H0: p = p0, SE = √(p0(1 − p0) / n), z = (x / n − p0) / SE; return <code>(z, p)</code>, where p is two-sided.</p><p>For example, <code>one_prop_test(48, 400, 0.10)</code> ≈ <code>(1.333, 0.182)</code>.</p>",
     "hints": [
      "Under H0 the SE uses p0, not the estimate.",
      "Two-sided p-value: <code>2 * (1 - cdf(abs(z)))</code>."
     ],
     "check": {
      "tests": "_z, _p = one_prop_test(48, 400, 0.10)\nassert abs(_z - 1.3333333) < 1e-6, f\"z should be ≈ 1.333, you got {_z:.4f}. Use p0 in the SE\"\nassert abs(_p - 0.1824224) < 1e-5, f\"p should be ≈ 0.182, you got {_p:.4f}\"\n_z2, _p2 = one_prop_test(52, 400, 0.18)\nassert _z2 < 0 and abs(_p2 - 0.009244) < 0.0005, \"if the conversion is low, z is negative (≈ −2.60); p ≈ 0.009\""
     }
    },
    {
     "title": "Test of the mean receipt",
     "prompt": "<p>Earlier the mean receipt was 5 000 ₸. Write the function <code>mean_test(xs, mu0)</code>: H0: μ = mu0; z = (mean − mu0) / (stdev / √n), two-sided p-value; return <code>(z, p)</code>.</p>",
     "hints": [
      "SE = <code>statistics.stdev(xs) / math.sqrt(len(xs))</code>."
     ],
     "check": {
      "tests": "import statistics as _st\n_xs = [5200, 4800, 5600, 5100, 5900, 5300, 4700, 5500, 5800, 5000] * 4\n_z, _p = mean_test(_xs, 5000)\n_se = _st.stdev(_xs) / 40 ** 0.5\nassert abs(_z - (_st.mean(_xs) - 5000) / _se) < 1e-9, f\"z should be ≈ {(_st.mean(_xs) - 5000) / _se:.3f}, you got {_z}\"\nassert _p < 0.01, \"mean 5 290 ₸, n = 40: the difference should be significant (p < 0.01)\"\n_z0, _p0 = mean_test([4, 6, 5, 5], 5)\nassert abs(_z0) < 1e-12 and abs(_p0 - 1) < 1e-12, \"if the mean equals mu0, z = 0, p = 1\""
     }
    },
    {
     "title": "Critical value",
     "prompt": "<p>Write the function <code>critical_z(alpha, two_sided=True)</code>: return the bound above which H0 is rejected when |z| exceeds it. In a two-sided test α is split between two tails.</p><p>For example, <code>critical_z(0.05)</code> ≈ <code>1.96</code>, <code>critical_z(0.05, two_sided=False)</code> ≈ <code>1.645</code>.</p>",
     "hints": [
      "The probability in one tail: α / 2 for two-sided, otherwise α.",
      "<code>NormalDist().inv_cdf(1 - tail)</code>"
     ],
     "check": {
      "tests": "assert abs(critical_z(0.05) - 1.959964) < 1e-5, \"critical_z(0.05) ≈ 1.96\"\nassert abs(critical_z(0.05, two_sided=False) - 1.644854) < 1e-5, \"one-sided: ≈ 1.645\"\nassert abs(critical_z(0.01) - 2.575829) < 1e-5, \"critical_z(0.01) ≈ 2.576\""
     }
    },
    {
     "title": "Type I error rate",
     "prompt": "<p>What does α = 0.05 really mean? Write the function <code>type1_rate(p0, n, k, alpha=0.05)</code>: run <code>k</code> times a world where H0 is <b>true</b>: each time <code>n</code> visitors arrive, and each buys with probability <code>p0</code>. Apply the proportion test from the previous task (H0: p = p0) to each sample and return the share of experiments in which H0 is rejected (p &lt; α).</p><p>The result should be close to α.</p>",
     "hints": [
      "In each experiment count x and compute the p-value.",
      "Count the experiments where <code>p &lt; α</code> — these are the false positives."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(16)\n_v = type1_rate(0.3, 200, 1000)\nassert 0.03 < _v < 0.075, f\"if H0 is true, about 5% of the tests should wrongly show 'significant', you got {_v:.3f}\"\n_r.seed(17)\n_v1 = type1_rate(0.3, 200, 1000, alpha=0.01)\nassert _v1 < _v, \"at α = 0.01 the false positives should decrease: use the alpha parameter\""
     }
    },
    {
     "title": "Power of the test",
     "prompt": "<p>Now H0 is <b>false</b>: the true conversion is <code>p_true</code>, but we test H0: p = p0. The function <code>power_sim(p0, p_true, n, k, alpha=0.05)</code> should return the share of <code>k</code> experiments in which H0 is rejected (power = 1 − β).</p><p>For example, if p0 = 0.1, p_true = 0.15, n = 400, the power ≈ 0.87.</p>",
     "hints": [
      "As in the previous task, but generate the data with <code>p_true</code>.",
      "The test is still carried out against <code>p0</code>."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(18)\n_v = power_sim(0.1, 0.15, 400, 600)\nassert 0.82 < _v < 0.93, f\"the power should be ≈ 0.87, you got {_v:.3f}\"\n_r.seed(19)\n_v2 = power_sim(0.1, 0.15, 100, 600)\nassert _v2 < _v - 0.2, \"if n is small, the power should be noticeably lower\""
     }
    }
   ]
  },
  "ab-5": {
   "pr": [
    {
     "title": "Pooled conversion",
     "prompt": "<p>Write the function <code>pooled(x_a, n_a, x_b, n_b)</code>: return the pooled conversion under H0 (that the conversions are equal).</p><p>For example, <code>pooled(200, 2000, 250, 2000)</code> → <code>0.1125</code>.</p>",
     "hints": [
      "All buyers / all users."
     ],
     "check": {
      "tests": "assert abs(pooled(200, 2000, 250, 2000) - 0.1125) < 1e-12, \"pooled(200, 2000, 250, 2000) = 450 / 4000 = 0.1125\"\nassert abs(pooled(480, 10000, 540, 12000) - 1020 / 22000) < 1e-12, \"the group sizes differ: (x_a + x_b) / (n_a + n_b), not the average of p\""
     }
    },
    {
     "title": "Difference in percentage points",
     "prompt": "<p>Write the function <code>diff_pp(x_a, n_a, x_b, n_b)</code>: return the difference p_B − p_A in <b>percentage points</b>.</p><p>For example, <code>diff_pp(200, 2000, 250, 2000)</code> → <code>2.5</code>.</p>",
     "hints": [
      "<code>100 * (x_b / n_b - x_a / n_a)</code>"
     ],
     "check": {
      "tests": "assert abs(diff_pp(200, 2000, 250, 2000) - 2.5) < 1e-9, \"diff_pp(200, 2000, 250, 2000) = 2.5 п.п.\"\nassert abs(diff_pp(250, 2000, 200, 2000) + 2.5) < 1e-9, \"if B is worse, the difference is negative: −2.5\""
     }
    },
    {
     "title": "Pooled SE",
     "prompt": "<p>Write the function <code>pooled_se(x_a, n_a, x_b, n_b)</code>: SE = √(p(1 − p) × (1/n_A + 1/n_B)), where p is the pooled conversion.</p><p>For example, <code>pooled_se(200, 2000, 250, 2000)</code> ≈ <code>0.00999</code>.</p>",
     "hints": [
      "First the pooled p.",
      "<code>math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))</code>"
     ]
    },
    {
     "title": "Validity condition",
     "prompt": "<p>The z-test relies on the CLT. Write the function <code>valid(x_a, n_a, x_b, n_b, min_count=10)</code>: return <code>True</code> if in each group there are at least <code>min_count</code> both buyers and non-buyers.</p><p>For example, <code>valid(6, 32, 10, 32)</code> → <code>False</code> (A has only 6 buyers).</p>",
     "hints": [
      "Four numbers are checked: x_a, n_a − x_a, x_b, n_b − x_b."
     ],
     "check": {
      "tests": "assert valid(6, 32, 10, 32) is False, \"A-да 6 сатып алушы: < 10\"\nassert valid(200, 2000, 250, 2000) is True, \"all the numbers are sufficient\"\nassert valid(15, 20, 12, 30) is False, \"in A there are only 5 non-buyers\"\nassert valid(6, 32, 10, 32, min_count=5) is True, \"min_count = 5 болса, жарамды\""
     }
    },
    {
     "title": "Determining the winner",
     "prompt": "<p>Write the function <code>winner(x_a, n_a, x_b, n_b, alpha=0.05)</code>: if the z-test for two proportions gives p &lt; α, return the variant with the higher conversion (<code>\"A\"</code> or <code>\"B\"</code>), otherwise return <code>\"жоқ\"</code>.</p><p>For example, <code>winner(200, 2000, 250, 2000)</code> → <code>\"B\"</code>.</p>",
     "hints": [
      "Use the <code>two_prop_z</code> function from the lesson.",
      "If the result is significant, the sign of z shows the direction."
     ],
     "check": {
      "tests": "assert winner(200, 2000, 250, 2000) == \"B\", \"p ≈ 0.012, z > 0: B\"\nassert winner(250, 2000, 200, 2000) == \"A\", \"z < 0: A\"\nassert winner(480, 10000, 540, 10000) == \"жоқ\", \"p ≈ 0.054 > 0.05: there is no winner\"\nassert winner(480, 10000, 540, 10000, alpha=0.1) == \"B\", \"α = 0.1 болса, B\""
     }
    },
    {
     "title": "One-sided test",
     "prompt": "<p>Sometimes the question is \"is B better?\" Write the function <code>one_sided_p(x_a, n_a, x_b, n_b)</code>: compute z through the pooled SE and return the one-sided p-value for H1: p_B &gt; p_A, that is, 1 − cdf(z).</p><p>For example, <code>one_sided_p(480, 10000, 540, 10000)</code> ≈ <code>0.027</code>.</p>",
     "hints": [
      "z is the same as before.",
      "One-sided: no absolute value and no multiplication by 2, just <code>1 - cdf(z)</code>."
     ],
     "check": {
      "tests": "assert abs(one_sided_p(480, 10000, 540, 10000) - 0.0268) < 0.001, \"one_sided_p(480, 10000, 540, 10000) ≈ 0.027\"\nassert one_sided_p(540, 10000, 480, 10000) > 0.9, \"if B is worse, the one-sided p is large\""
     }
    },
    {
     "title": "A/B by cities",
     "prompt": "<p>Write the function <code>b_wins(data, alpha=0.05)</code>: <code>data</code> is <code>{city: (x_a, n_a, x_b, n_b)}</code>. Return the list of names of the cities where variant B is statistically significantly <b>better</b> (z &gt; 0 and p &lt; α), sorted alphabetically.</p>",
     "hints": [
      "For each city use <code>two_prop_z</code>.",
      "Two conditions: <code>z &gt; 0</code> and <code>p &lt; alpha</code>."
     ],
     "check": {
      "tests": "_d = {\"Алматы\": (200, 2000, 250, 2000), \"Астана\": (250, 2000, 200, 2000), \"Шымкент\": (100, 1000, 110, 1000), \"Ақтау\": (50, 1000, 80, 1000)}\nassert b_wins(_d) == [\"Алматы\", \"Ақтау\"], \"Almaty (p ≈ 0.012) and Ақтау (p ≈ 0.007): B is better. In Astana A is better, in Shymkent the difference is not significant\"\nassert b_wins(_d, alpha=0.01) == [\"Ақтау\"], \"if α = 0.01, only Ақтау\""
     }
    },
    {
     "title": "From sessions to users",
     "prompt": "<p>In the log each row is one <b>session</b>: <code>(user_id, variant, bought)</code>, and one person may have several sessions. Counting sessions artificially increases n. Write the function <code>user_level_test(rows)</code>: reduce the data to the user level (if a user bought in at least one session, the user bought), then return <code>(z, p)</code> of the z-test for two proportions.</p>",
     "hints": [
      "A dictionary: <code>user_id → (variant, bought or not)</code>; update it in a new session with <code>or</code>.",
      "Then count n and x for each variant and call <code>two_prop_z</code>."
     ],
     "check": {
      "tests": "_rows = []\nfor _u in range(400):\n    _v = \"A\" if _u % 2 == 0 else \"B\"\n    _buy = (_u % 20 == 0) if _v == \"A\" else (_u % 10 == 1)\n    _rows.append((_u, _v, False))\n    _rows.append((_u, _v, _buy))\n    _rows.append((_u, _v, False))\n_z, _p = user_level_test(_rows)\nassert abs(_z - 2.8006) < 0.01, f\"at the user level for A: 20/200, for B: 40/200, z ≈ 2.80, you got {_z:.3f}. Count users, not sessions\"\nassert abs(_p - 0.0051) < 0.0005, f\"it should be p ≈ 0.005, you got {_p:.4f}\""
     }
    }
   ]
  },
  "ab-6": {
   "pr": [
    {
     "title": "Sample variance",
     "prompt": "<p>Write the function <code>var_s(xs)</code> <b>without</b> <code>statistics</code>: return the sample variance (division by n − 1).</p><p>For example, <code>var_s([5, 7, 6, 8, 4])</code> → <code>2.5</code>.</p>",
     "hints": [
      "First the mean, then the sum of squared deviations.",
      "Divide by <code>n - 1</code>, not by n."
     ],
     "check": {
      "tests": "import statistics as _st\nassert abs(var_s([5, 7, 6, 8, 4]) - 2.5) < 1e-12, \"var_s([5, 7, 6, 8, 4]) = 2.5: did you divide by n − 1?\"\n_x = [12, 30, 8, 22, 15, 9]\nassert abs(var_s(_x) - _st.variance(_x)) < 1e-9, \"it should match statistics.variance\""
     }
    },
    {
     "title": "SE of the difference",
     "prompt": "<p>Write the function <code>se_diff(a, b)</code>: return the SE of the difference in Welch's formula √(s_A² / n_A + s_B² / n_B).</p><p>For example, <code>se_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>1.0</code>.</p>",
     "hints": [
      "Add the squared SEs: <code>variance(a) / len(a) + variance(b) / len(b)</code>."
     ]
    },
    {
     "title": "Difference of means",
     "prompt": "<p>Write the function <code>mean_diff(a, b)</code>: return m_B − m_A.</p><p>For example, time on the site: <code>mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>2</code>.</p>",
     "hints": [
      "The order matters: B minus A."
     ]
    },
    {
     "title": "Degrees of freedom",
     "prompt": "<p>The Welch–Satterthwaite formula: if v_A = s_A² / n_A and v_B = s_B² / n_B, then</p><p>df = (v_A + v_B)² / (v_A² / (n_A − 1) + v_B² / (n_B − 1)).</p><p>Write the function <code>welch_df(a, b)</code>. For example, <code>welch_df([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>8.0</code>.</p>",
     "hints": [
      "First compute <code>va</code> and <code>vb</code>.",
      "In the denominator divide each term by <code>n - 1</code>."
     ],
     "check": {
      "tests": "assert abs(welch_df([5, 7, 6, 8, 4], [9, 7, 8, 10, 6]) - 8) < 1e-9, \"equal variances, n = 5 + 5: df = 8\"\n_a = [10, 12, 9, 11, 13, 10, 12, 11]\n_b = [14, 30, 8, 22, 15, 9, 25, 12, 18, 20]\nassert abs(welch_df(_a, _b) - 9.7647) < 0.01, f\"in groups with different variances df ≈ 9.76, you got {welch_df(_a, _b):.3f}\""
     }
    },
    {
     "title": "CI for the difference of means",
     "prompt": "<p>Write the function <code>ci_mean_diff(a, b, level=0.95)</code>: return the confidence interval for the difference m_B − m_A (Welch SE and z) as <code>(low, high)</code>.</p><p>For example, <code>ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> ≈ <code>(0.04, 3.96)</code>.</p>",
     "hints": [
      "Difference ± z × SE.",
      "z comes from the level: <code>inv_cdf(1 - (1 - level) / 2)</code>."
     ],
     "check": {
      "tests": "_r = ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])\nassert _r is not None and len(_r) == 2, \"return (low, high)\"\nassert abs(_r[0] - 0.040036) < 1e-4 and abs(_r[1] - 3.959964) < 1e-4, f\"it should be ≈ (0.04, 3.96), you got {_r}\"\n_r9 = ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6], 0.9)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], \"90% интервал тар болуы керек\""
     }
    },
    {
     "title": "Effect of a \"whale\" customer",
     "prompt": "<p>In revenue data one very large payment can distort the result. Write the function <code>t_without_max(a, b)</code>: return <code>(t_all, t_trim)</code>: <code>t_all</code> is the Welch t (B minus A) over all the data, <code>t_trim</code> is the t after removing the single largest value from group B.</p>",
     "hints": [
      "Put the Welch t into a separate function.",
      "To remove the largest: <code>sorted(b)[:-1]</code> (the original list is not changed)."
     ],
     "check": {
      "tests": "_a = [0, 0, 5, 0, 3, 0, 4, 0, 0, 6, 2, 0]\n_b = [0, 4, 0, 0, 5, 0, 3, 0, 0, 2, 0, 120]\n_b0 = list(_b)\n_ta, _tt = t_without_max(_a, _b)\nassert abs(_ta - 0.9568) < 0.01, f\"t_all should be ≈ 0.96, you got {_ta:.3f}\"\nassert abs(_tt - (-0.4524)) < 0.01, f\"without the 'whale' t_trim ≈ −0.45, you got {_tt:.3f}: one client gave the whole 'effect'\"\nassert _b == _b0, \"the original list b must not change\""
     }
    },
    {
     "title": "ARPU test",
     "prompt": "<p>The revenue per user metric (ARPU): many users pay 0 ₸. Write the function <code>arpu_test(rev_a, rev_b, alpha=0.05)</code>: return <code>(t, p, significant)</code>, where t is the Welch t (B minus A), p is the two-sided p-value from the normal approximation, and <code>significant</code> is p &lt; α.</p>",
     "hints": [
      "To <code>welch_t</code> from the lesson add a third value: <code>p &lt; alpha</code>."
     ],
     "check": {
      "tests": "_a = ([0] * 9 + [5000]) * 10\n_b = ([0] * 8 + [5000, 6000]) * 10\n_t, _p, _s = arpu_test(_a, _b)\nassert abs(_t - 2.2342) < 0.01, f\"t should be ≈ 2.23, you got {_t:.3f}\"\nassert abs(_p - 0.0255) < 0.001 and _s is True, \"p ≈ 0.025 < 0.05: significant = True\"\n_t2, _p2, _s2 = arpu_test(_a, _b, alpha=0.01)\nassert _s2 is False, \"at α = 0.01 the result is not significant: use the alpha parameter\""
     }
    },
    {
     "title": "t and z for 0/1 data",
     "prompt": "<p>The conversion is also a mean: each user gives 1 or 0. Write the function <code>t_vs_z(x_a, n_a, x_b, n_b)</code>: build lists of 0s and 1s, compute the Welch t from them, and also the unpooled z = (p_B − p_A) / √(p_A(1 − p_A)/n_A + p_B(1 − p_B)/n_B). Return <code>(t, z)</code>. For a large n they are practically equal.</p>",
     "hints": [
      "The list: <code>[1] * x_a + [0] * (n_a - x_a)</code>.",
      "The difference is only in the variance: <code>variance</code> divides by n − 1, while p(1 − p) divides by n."
     ],
     "check": {
      "tests": "_t, _z = t_vs_z(200, 2000, 250, 2000)\nassert abs(_z - 2.5039) < 0.001, f\"unpooled z ≈ 2.504 should be, you got {_z:.4f}\"\nassert abs(_t - _z) < 0.002, f\"for a large n t ≈ z: {_t:.4f} and {_z:.4f}\"\n_t2, _z2 = t_vs_z(3, 10, 7, 10)\nassert abs(_t2 - 1.8516) < 0.001 and abs(_z2 - 1.9518) < 0.001, f\"for a small n the difference is noticeable: t ≈ 1.852, z ≈ 1.952, you got {_t2:.4f}, {_z2:.4f}\""
     }
    }
   ]
  },
  "ab-7": {
   "pr": [
    {
     "title": "Z for power",
     "prompt": "<p>Write the function <code>z_power(power)</code>: return the value z_{power} from the formula.</p><p>For example, <code>z_power(0.8)</code> ≈ <code>0.842</code>, <code>z_power(0.9)</code> ≈ <code>1.282</code>.</p>",
     "hints": [
      "<code>NormalDist().inv_cdf(power)</code> — one-sided."
     ]
    },
    {
     "title": "Relative MDE",
     "prompt": "<p>A manager says: \"We want to raise the conversion by 20%.\" Write the function <code>abs_mde(p1, rel)</code>: convert the relative MDE into an absolute one.</p><p>For example, baseline 5%, +20%: <code>abs_mde(0.05, 0.2)</code> → <code>0.01</code> (1 p.p.).</p>",
     "hints": [
      "Absolute MDE = baseline × relative growth."
     ]
    },
    {
     "title": "Test duration",
     "prompt": "<p>Write the function <code>days_needed(n_per_group, daily_users, groups=2)</code>: if <code>daily_users</code> new users arrive per day, return the number of days (rounded up) needed to collect the required number of people in all groups.</p><p>For example, <code>days_needed(3839, 1000)</code> → <code>8</code>.</p>",
     "hints": [
      "The total number of people needed: <code>n_per_group * groups</code>.",
      "<code>math.ceil</code> rounds up."
     ],
     "check": {
      "tests": "assert days_needed(3839, 1000) == 8, \"3839 × 2 / 1000 = 7.68 → 8 days\"\nassert days_needed(8155, 1000) == 17, \"8155 × 2 / 1000 = 16.31 → 17 days\"\nassert days_needed(1000, 500, groups=3) == 6, \"3 variants: 3000 / 500 = 6 days\""
     }
    },
    {
     "title": "Sample for a mean",
     "prompt": "<p>The metric is the average receipt. The required n for one group: n = 2 × (z_{1−α/2} + z_{power})² × σ² / δ², where σ is the SD and δ is the difference we want to detect. Write the function <code>n_mean(sigma, delta, alpha=0.05, power=0.8)</code> (rounded up).</p><p>For example, <code>n_mean(10, 2)</code> → <code>393</code>.</p>",
     "hints": [
      "z_a and z_b are as in the lesson.",
      "<code>math.ceil(2 * (z_a + z_b) ** 2 * sigma ** 2 / delta ** 2)</code>"
     ],
     "check": {
      "tests": "assert n_mean(10, 2) == 393, \"n_mean(10, 2) = 393 болуы керек\"\nassert n_mean(3000, 500) == 566, \"Чек: σ = 3000 ₸, δ = 500 ₸ → 566\"\nassert n_mean(10, 2, power=0.9) > 393, \"as power grows, n grows: use the power parameter\""
     }
    },
    {
     "title": "Computing the power",
     "prompt": "<p>The reverse question: n is known, what is the power? An approximate formula: power ≈ cdf(|MDE| / √((p₁(1 − p₁) + p₂(1 − p₂)) / n) − z_{1−α/2}). Write the function <code>power_of(p1, mde, n, alpha=0.05)</code>.</p><p>For example, <code>power_of(0.1, 0.02, 3839)</code> ≈ <code>0.80</code>, and <code>power_of(0.05, 0.01, 2000)</code> ≈ <code>0.28</code>.</p>",
     "hints": [
      "SE = √((p₁(1 − p₁) + p₂(1 − p₂)) / n), p₂ = p₁ + MDE.",
      "<code>NormalDist().cdf(abs(mde) / se - z_a)</code>"
     ],
     "check": {
      "tests": "assert abs(power_of(0.1, 0.02, 3839) - 0.8) < 0.001, \"with 3839 people the power ≈ 0.80 (matches the sample_size formula)\"\nassert abs(power_of(0.05, 0.01, 2000) - 0.2835) < 0.001, \"power_of(0.05, 0.01, 2000) ≈ 0.28: there is not enough traffic\"\nassert power_of(0.1, 0.02, 8000) > power_of(0.1, 0.02, 3839), \"as n grows, the power grows\""
     }
    },
    {
     "title": "Smallest detectable effect",
     "prompt": "<p>Traffic is limited: only <code>n</code> people in one group. Write the function <code>mde_for(p1, n)</code>: go through MDE = 0.001, 0.002, ... in steps of 0.001 and return the smallest MDE at which <code>sample_size(p1, mde)</code> from the lesson is not more than n.</p><p>For example, <code>mde_for(0.1, 3839)</code> → <code>0.02</code>.</p>",
     "hints": [
      "First write the <code>sample_size</code> function from the lesson.",
      "Take the MDE as <code>k / 1000</code> and increase k from 1."
     ],
     "check": {
      "tests": "assert mde_for(0.1, 3839) == 0.02, \"mde_for(0.1, 3839) = 0.02\"\nassert mde_for(0.1, 1000) == 0.041, \"with 1000 people we will detect only an effect of ≈ 4.1 p.p.\"\nassert mde_for(0.05, 8155) == 0.01, \"mde_for(0.05, 8155) = 0.01\""
     }
    },
    {
     "title": "Unequal split",
     "prompt": "<p>Sometimes most of the traffic goes to B: n_B = k × n_A. Then n_A = (z_{1−α/2} + z_{power})² × (p₁(1 − p₁) + p₂(1 − p₂) / k) / MDE². Write the function <code>sample_size_ratio(p1, mde, k, alpha=0.05, power=0.8)</code>: return <code>(n_a, n_b)</code>, where n_a = ceil(...), n_b = ceil(k × n_a).</p><p>For example, <code>sample_size_ratio(0.1, 0.02, 1)</code> → <code>(3839, 3839)</code>, <code>sample_size_ratio(0.1, 0.02, 2)</code> → <code>(2803, 5606)</code>.</p>",
     "hints": [
      "When k = 1 the formula becomes the one from the lesson.",
      "The variance of B is divided by k: <code>p2 * (1 - p2) / k</code>."
     ],
     "check": {
      "tests": "assert sample_size_ratio(0.1, 0.02, 1) == (3839, 3839), \"k = 1: (3839, 3839) — the example from the lesson\"\nassert sample_size_ratio(0.1, 0.02, 2) == (2803, 5606), \"k = 2: (2803, 5606)\"\n_a, _b = sample_size_ratio(0.1, 0.02, 3)\nassert _a + _b > 2 * 3839, \"an unequal split increases the total number of people\""
     }
    },
    {
     "title": "Checking power by simulation",
     "prompt": "<p>Check the formula: with a baseline conversion of 20% and an MDE of 10 p.p., <code>sample_size</code> gives 291 people per group. Write the function <code>sim_power(p_a, p_b, n, k, alpha=0.05)</code>: run <code>k</code> A/B tests (each group has <code>n</code> people, the true conversions are <code>p_a</code> and <code>p_b</code>), apply the z-test for two proportions to each, and return the share of tests with p &lt; α.</p><p>The result should be ≈ 0.8.</p>",
     "hints": [
      "In each test count x for the two groups separately.",
      "Use the <code>two_prop_z</code> function from lesson 5."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(20)\n_v = sim_power(0.2, 0.3, 291, 400)\nassert 0.73 < _v < 0.87, f\"with n = 291 the power should be ≈ 0.8, you got {_v:.3f}\"\n_r.seed(21)\n_v0 = sim_power(0.2, 0.2, 291, 400)\nassert _v0 < 0.1, f\"if there is no effect, the 'significant' result should be ≈ 5%, you got {_v0:.3f}\""
     }
    }
   ]
  },
  "ab-8": {
   "pr": [
    {
     "title": "Bonferroni correction",
     "prompt": "<p>Write the function <code>bonferroni(alpha, m)</code>: if <code>m</code> tests are run, return the corrected threshold for each test.</p><p>For example, <code>bonferroni(0.05, 5)</code> → <code>0.01</code>.</p>",
     "hints": [
      "α / m."
     ],
     "check": {
      "tests": "assert abs(bonferroni(0.05, 5) - 0.01) < 1e-12, \"bonferroni(0.05, 5) = 0.01\"\nassert bonferroni(0.05, 1) == 0.05, \"one test: no correction\""
     }
    },
    {
     "title": "Risk of multiple comparisons",
     "prompt": "<p>Write the function <code>fwer(alpha, m)</code>: if each of the <code>m</code> independent tests is run at level α, return the probability that at least one of them is \"significant\" by chance.</p><p>For example, <code>fwer(0.05, 5)</code> ≈ <code>0.226</code>.</p>",
     "hints": [
      "\"At least one\" is the complement: 1 − (1 − α)<sup>m</sup>."
     ],
     "check": {
      "tests": "assert abs(fwer(0.05, 5) - (1 - 0.95 ** 5)) < 1e-12, \"fwer(0.05, 5) ≈ 0.226\"\nassert abs(fwer(0.05, 1) - 0.05) < 1e-12, \"one test: α\"\nassert fwer(0.05, 20) > 0.6, \"20 segments: the risk is above 64%\""
     }
    },
    {
     "title": "Split by device",
     "prompt": "<p>Checking randomisation: from the table <code>assignments</code>, output the number of users <code>n</code> for each device (<code>device</code>).</p>",
     "hints": [
      "<code>COUNT(*) AS n</code> and <code>GROUP BY device</code>."
     ]
    },
    {
     "title": "Significant metrics",
     "prompt": "<p>Write the function <code>significant(pvals, alpha=0.05)</code>: <code>pvals</code> is <code>{metric: p-value}</code>. With the Bonferroni correction (α / m, where m is the number of metrics) return the list of names of the significant metrics, sorted alphabetically.</p><p>For example, <code>{\"конверсия\": 0.004, \"чек\": 0.03, \"қайту\": 0.2}</code> → <code>[\"конверсия\"]</code> (threshold 0.0167).</p>",
     "hints": [
      "Threshold: <code>alpha / len(pvals)</code>.",
      "At the end <code>sorted(...)</code>."
     ],
     "check": {
      "tests": "assert significant({\"конверсия\": 0.004, \"чек\": 0.03, \"қайту\": 0.2}) == [\"конверсия\"], \"Шек 0.05 / 3 ≈ 0.0167: тек конверсия\"\nassert significant({\"a\": 0.001, \"b\": 0.002}) == [\"a\", \"b\"], \"threshold 0.025: both are significant\"\nassert significant({\"a\": 0.02, \"b\": 0.03, \"c\": 0.04, \"d\": 0.01, \"e\": 0.011}) == [], \"5 metrics, threshold 0.01: none (0.01 < 0.01 is false)\""
     }
    },
    {
     "title": "SRM with an unequal split",
     "prompt": "<p>The test was planned as a 30/70 split. Write the function <code>srm_p_ratio(n_a, n_b, q)</code>: <code>q</code> is the planned share of A. Let N = n_a + n_b, z = (n_a − N × q) / √(N × q × (1 − q)); return the two-sided p-value.</p><p>For example, <code>srm_p_ratio(3100, 6900, 0.3)</code> ≈ <code>0.029</code>.</p>",
     "hints": [
      "With q = 0.5 you get <code>srm_p</code> from the lesson.",
      "SD = <code>math.sqrt(n * q * (1 - q))</code>."
     ],
     "check": {
      "tests": "assert abs(srm_p_ratio(3100, 6900, 0.3) - 0.0290) < 0.0005, \"srm_p_ratio(3100, 6900, 0.3) ≈ 0.029\"\nassert abs(srm_p_ratio(5120, 4880, 0.5) - 0.016395) < 1e-4, \"q = 0.5: the example from the lesson ≈ 0.0164\"\nassert abs(srm_p_ratio(300, 700, 0.3) - 1) < 1e-9, \"exactly according to the plan: p = 1\""
     }
    },
    {
     "title": "Variant shares",
     "prompt": "<p>For each variant output <code>variant</code>, the number of users <code>n</code>, and the share among all users <code>share</code> (<code>ROUND(..., 3)</code>). The subquery <code>(SELECT COUNT(*) FROM assignments)</code> gives the total.</p>",
     "hints": [
      "<code>COUNT(*) * 1.0 / (SELECT COUNT(*) FROM assignments)</code>",
      "<code>* 1.0</code> keeps the division from being an integer division."
     ]
    },
    {
     "title": "SRM by device",
     "prompt": "<p>Write the function <code>srm_by_device(rows)</code>: <code>rows</code> is a list of pairs <code>(variant, device)</code> (a 50/50 split was planned). For each device return the SRM p-value for the sizes of groups A and B (the <code>srm_p</code> formula from the lesson) as a dictionary <code>{device: p}</code>.</p>",
     "hints": [
      "For each device create a counter <code>{\"A\": 0, \"B\": 0}</code>.",
      "Then call <code>srm_p(c[\"A\"], c[\"B\"])</code> for each."
     ],
     "check": {
      "tests": "_rows = [(\"A\", \"mobile\")] * 5120 + [(\"B\", \"mobile\")] * 4880 + [(\"A\", \"desktop\")] * 500 + [(\"B\", \"desktop\")] * 500\n_r = srm_by_device(_rows)\nassert set(_r) == {\"mobile\", \"desktop\"}, \"one p-value for each device\"\nassert abs(_r[\"mobile\"] - 0.016395) < 1e-4, \"mobile: 5120 / 4880, p ≈ 0.0164\"\nassert abs(_r[\"desktop\"] - 1) < 1e-9, \"desktop: 500 / 500, p = 1\""
     }
    },
    {
     "title": "Table by device and variant",
     "prompt": "<p>For each device one row: <code>device</code>, <code>n_a</code> (users in A), <code>n_b</code> (in B) and <code>diff</code> = n_b − n_a. Sort by <code>device</code>. Hint: <code>SUM(CASE WHEN variant = 'A' THEN 1 ELSE 0 END)</code>.</p>",
     "hints": [
      "Count each variant separately with <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code>.",
      "<code>GROUP BY device ORDER BY device</code>"
     ]
    }
   ]
  },
  "ab-9": {
   "pr": [
    {
     "title": "Number of buyers",
     "prompt": "<p>For each variant output <code>variant</code> and the number of buyers <code>buyers</code>. Only those who bought are needed here, so <code>JOIN</code> is enough.</p>",
     "hints": [
      "<code>COUNT(*) AS buyers</code>, <code>GROUP BY a.variant</code>."
     ]
    },
    {
     "title": "Total revenue",
     "prompt": "<p>From the table <code>conversions</code> output the total revenue of the test <code>total_revenue</code> and the number of purchases <code>orders</code>.</p>",
     "hints": [
      "<code>SUM(revenue)</code> and <code>COUNT(*)</code>."
     ]
    },
    {
     "title": "The largest receipt",
     "prompt": "<p>For each variant output <code>variant</code>, the largest receipt <code>max_check</code> and the smallest receipt <code>min_check</code>.</p>",
     "hints": [
      "<code>MAX(c.revenue)</code>, <code>MIN(c.revenue)</code>."
     ]
    },
    {
     "title": "Average order value",
     "prompt": "<p>The average receipt of the buyers (AOV): for each variant output <code>variant</code> and <code>aov</code> (<code>ROUND(..., 1)</code>). This is not rpu: the denominator is only the buyers.</p>",
     "hints": [
      "<code>JOIN</code> keeps only the buyers, then <code>AVG(c.revenue)</code>."
     ]
    },
    {
     "title": "RPU by device",
     "prompt": "<p>For each device output <code>device</code>, <code>users</code> and the revenue per user <code>rpu</code> (divided by all users, <code>ROUND(..., 1)</code>). Sort by <code>device</code>.</p>",
     "hints": [
      "<code>LEFT JOIN</code> and <code>COALESCE(c.revenue, 0)</code>.",
      "At the end <code>ORDER BY a.device</code>."
     ]
    },
    {
     "title": "Non-buyers",
     "prompt": "<p>For each variant output <code>variant</code> and the number of users who did not buy, <code>non_buyers</code>.</p>",
     "hints": [
      "After <code>LEFT JOIN</code>: <code>COUNT(*)</code> — everyone, <code>COUNT(c.user_id)</code> — the buyers.",
      "The difference is the non-buyers."
     ]
    },
    {
     "title": "Conversion difference",
     "prompt": "<p>In one row: <code>cr_a</code>, <code>cr_b</code> (the conversion of each variant, <code>ROUND(..., 3)</code>) and <code>diff_pp</code> — the difference in percentage points (<code>ROUND(100 * (cr_b − cr_a), 1)</code>, computed from the unrounded shares).</p><p>Hint: <code>AVG(CASE WHEN a.variant = 'B' THEN (c.user_id IS NOT NULL) END)</code> is the conversion of B.</p>",
     "hints": [
      "<code>CASE WHEN ... THEN ... END</code> gives NULL for the other variant, and <code>AVG</code> skips NULL.",
      "<code>(c.user_id IS NOT NULL)</code> gives 1 for a buyer and 0 otherwise."
     ]
    },
    {
     "title": "Share of large buyers",
     "prompt": "<p>For each variant output <code>variant</code> and the share <code>big_share</code> (<code>ROUND(..., 3)</code>) of users who paid 10 000 ₸ or more, among <b>all</b> users. Sort by <code>variant</code>.</p>",
     "hints": [
      "<code>LEFT JOIN</code>: those who did not buy also go into the denominator.",
      "<code>AVG(CASE WHEN c.revenue &gt;= 10000 THEN 1.0 ELSE 0 END)</code>: NULL does not meet the condition and gives 0."
     ]
    }
   ]
  },
  "ab-10": {
   "pr": [
    {
     "title": "Above the threshold?",
     "prompt": "<p>Write the function <code>above_threshold(ci, thr)</code>: return <code>True</code> if the difference interval <code>ci = (low, high)</code> lies entirely above the business threshold <code>thr</code> (low ≥ thr).</p><p>For example, <code>above_threshold((0.0054, 0.0446), 0.01)</code> → <code>False</code>.</p>",
     "hints": [
      "It is enough to look only at the lower bound."
     ],
     "check": {
      "tests": "assert above_threshold((0.0054, 0.0446), 0.01) is False, \"the lower bound 0.5 p.p. < 1 p.p.\"\nassert above_threshold((0.012, 0.03), 0.01) is True, \"entirely above 1 p.p.\""
     }
    },
    {
     "title": "Monthly extra income",
     "prompt": "<p>Write the function <code>monthly_gain(diff, users, value)</code>: the conversion differs by <code>diff</code> (a share), there are <code>users</code> users per month, and one purchase costs <code>value</code> ₸. Return the extra income per month.</p><p>For example, <code>monthly_gain(0.025, 100000, 4000)</code> → <code>10000000</code> ₸.</p>",
     "hints": [
      "Extra purchases: diff × users. Each costs value ₸."
     ]
    },
    {
     "title": "Does it contain zero",
     "prompt": "<p>Write the function <code>includes_zero(ci)</code>: if the interval contains 0 (low ≤ 0 ≤ high), return <code>True</code>. This means the result is not statistically significant.</p>",
     "hints": [
      "<code>ci[0] &lt;= 0 &lt;= ci[1]</code>"
     ],
     "check": {
      "tests": "assert includes_zero((-0.01, 0.02)) is True, \"(−0.01, 0.02) contains 0\"\nassert includes_zero((0.0054, 0.0446)) is False, \"entirely positive: significant\"\nassert includes_zero((-0.03, -0.01)) is False, \"entirely negative: B is worse, but significant\""
     }
    },
    {
     "title": "Decision rule",
     "prompt": "<p>Turn the table from the lesson into a function. <code>verdict(ci, thr, max_width)</code> should check the conditions in this order:</p><ol><li>low ≥ thr → <code>\"енгіземіз\"</code>;</li><li>low &gt; 0 → <code>\"тәуекелмен енгіземіз\"</code>;</li><li>high &lt; 0 or the width of the interval (high − low) ≤ max_width → <code>\"енгізбейміз\"</code>;</li><li>otherwise → <code>\"дерек жеткіліксіз\"</code>.</li></ol>",
     "hints": [
      "Check the conditions in the given order with <code>if</code>."
     ],
     "check": {
      "tests": "assert verdict((0.012, 0.03), 0.01, 0.01) == \"енгіземіз\", \"entirely above the threshold\"\nassert verdict((0.0054, 0.0446), 0.01, 0.01) == \"тәуекелмен енгіземіз\", \"above 0, the threshold is crossed\"\nassert verdict((-0.002, 0.003), 0.01, 0.01) == \"енгізбейміз\", \"contains 0, narrow\"\nassert verdict((-0.03, 0.04), 0.01, 0.01) == \"дерек жеткіліксіз\", \"contains 0, wide\"\nassert verdict((-0.05, -0.01), 0.01, 0.01) == \"енгізбейміз\", \"B нашар\""
     }
    },
    {
     "title": "Relative lift",
     "prompt": "<p>Write the function <code>lift(x_a, n_a, x_b, n_b)</code>: return the relative lift p_B / p_A − 1.</p><p>For example, 10% → 12.5%: <code>lift(200, 2000, 250, 2000)</code> → <code>0.25</code> (+25%).</p>",
     "hints": [
      "Do not confuse the absolute difference (2.5 p.p.) with the relative lift (25%)."
     ],
     "check": {
      "tests": "assert abs(lift(200, 2000, 250, 2000) - 0.25) < 1e-12, \"lift(200, 2000, 250, 2000) = 0.25\"\nassert abs(lift(500, 10000, 504, 10000) - 0.008) < 1e-12, \"5.00% → 5.04%: +0.8%\"\nassert lift(100, 1000, 80, 1000) < 0, \"if B is worse, the lift is negative\""
     }
    },
    {
     "title": "Is the cost worth it",
     "prompt": "<p>Write the function <code>worth_it(ci, users, value, cost)</code>: the cautious estimate is the monthly extra income from the <b>lower</b> bound of the difference interval (low × users × value). If it is not less than the monthly cost <code>cost</code>, return <code>True</code>.</p><p>For example, <code>worth_it((0.0054, 0.0446), 100000, 4000, 2000000)</code> → <code>True</code> (2.16 million ≥ 2 million).</p>",
     "hints": [
      "Income: <code>ci[0] * users * value</code>."
     ],
     "check": {
      "tests": "assert worth_it((0.0054, 0.0446), 100000, 4000, 2000000) is True, \"0.0054 × 100 000 × 4000 = 2.16 млн ≥ 2 млн\"\nassert worth_it((0.0054, 0.0446), 100000, 4000, 3000000) is False, \"2.16 млн < 3 млн\"\nassert worth_it((-0.001, 0.01), 100000, 4000, 0) is False, \"the lower bound is negative: with the cautious estimate there is no income\""
     }
    },
    {
     "title": "Full report",
     "prompt": "<p>Write the function <code>report(x_a, n_a, x_b, n_b, thr)</code>: it returns a dictionary:</p><ul><li><code>\"diff\"</code> — p_B − p_A;</li><li><code>\"low\"</code>, <code>\"high\"</code> — the 95% CI of the difference (unpooled SE);</li><li><code>\"p\"</code> — the two-sided p-value of the z-test for two proportions (pooled SE);</li><li><code>\"launch\"</code> — <code>True</code> if p &lt; 0.05 and low ≥ thr.</li></ul>",
     "hints": [
      "For the CI use the unpooled SE (lesson 10), for the test the pooled SE (lesson 5).",
      "Dictionary keys: <code>\"diff\"</code>, <code>\"low\"</code>, <code>\"high\"</code>, <code>\"p\"</code>, <code>\"launch\"</code>."
     ],
     "check": {
      "tests": "_r = report(200, 2000, 250, 2000, 0.01)\nassert isinstance(_r, dict), \"return the dictionary\"\nassert abs(_r[\"diff\"] - 0.025) < 1e-12, \"diff = 0.025\"\nassert abs(_r[\"low\"] - 0.005441) < 1e-4 and abs(_r[\"high\"] - 0.044559) < 1e-4, \"CI ≈ (0.0054, 0.0446): unpooled SE\"\nassert abs(_r[\"p\"] - 0.01235) < 1e-4, \"p ≈ 0.0124: pooled SE\"\nassert _r[\"launch\"] is False, \"the lower bound is less than 1 p.p.: launch = False\"\nassert report(1000, 10000, 1300, 10000, 0.01)[\"launch\"] is True, \"10% → 13%, n = 10 000: launch = True\""
     }
    },
    {
     "title": "Summary sentence",
     "prompt": "<p>Write the function <code>summary(x_a, n_a, x_b, n_b)</code>: it returns one line for the manager:</p><p><code>\"B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012\"</code></p><p>Rules: the difference and the CI bounds are in percentage points, with a sign and one digit after the decimal point (<code>f\"{v:+.1f}\"</code>); p has three digits (<code>f\"{p:.3f}\"</code>); the CI uses the unpooled SE, p uses the pooled z-test; between the bounds put the \"…\" symbol.</p>",
     "hints": [
      "Multiply the shares by 100 and format with <code>f\"{v:+.1f}\"</code>.",
      "Reuse the calculations from the previous task."
     ],
     "check": {
      "tests": "_s = summary(200, 2000, 250, 2000)\nassert _s == \"B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012\", f\"expected: 'B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012', you got: {_s!r}\"\n_s2 = summary(250, 2000, 200, 2000)\nassert _s2 == \"B: -2.5 п.п. (95% CI -4.5…-0.5), p = 0.012\", f\"if B is worse, the sign is minus: {_s2!r}\""
     }
    }
   ]
  }
 }
});
