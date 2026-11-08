// stats practice tasks: English text. Code, solutions and checks are in content/practice/stats.js.
DJ.i18n.patch({ lessons: {
 "st-1": {
  "pr": [
   {
    "title": "Start of a bin",
    "prompt": "<p>Write the function <code>bin_start(x, width)</code>: it should return the start of the bin that the value <code>x</code> falls into. For example, <code>bin_start(74, 10)</code> → <code>70</code>, <code>bin_start(37, 5)</code> → <code>35</code>.</p>",
    "hints": [
     "<code>x // width * width</code>"
    ],
    "check": {
     "tests": "assert bin_start(74, 10) == 70, \"bin_start(74, 10) should return 70\"\nassert bin_start(37, 5) == 35, \"bin_start(37, 5) should return 35\"\nassert bin_start(40, 10) == 40, \"A value at the start of a bin stays in its own bin: bin_start(40, 10) = 40\""
    }
   },
   {
    "title": "Five-year bins",
    "prompt": "<p>Write the function <code>bins5(ages)</code>: it should return a frequency dictionary by five-year bins (the key is the start of the bin). For example, <code>bins5([21, 23, 26, 34])</code> → <code>{20: 2, 25: 1, 30: 1}</code>.</p>",
    "hints": [
     "<code>a // 5 * 5</code>",
     "<code>bins[start] = bins.get(start, 0) + 1</code>"
    ],
    "check": {
     "tests": "assert bins5([21, 23, 26, 34]) == {20: 2, 25: 1, 30: 1}, \"bins5([21, 23, 26, 34]) should be {20: 2, 25: 1, 30: 1}\"\nassert bins5([18, 19, 20]) == {15: 2, 20: 1}, \"bins5([18, 19, 20]) should be {15: 2, 20: 1}\"\nassert bins5([]) == {}, \"For an empty list, an empty dictionary\""
    }
   },
   {
    "title": "The fullest bin",
    "prompt": "<p>Write the function <code>top_bin(xs)</code>: it should return the start of the 10-wide bin that contains the most values. If two bins have the same count, return the smaller one. For example, <code>top_bin([12, 25, 27, 29, 31])</code> → <code>20</code>.</p>",
    "hints": [
     "First build the frequency dictionary.",
     "Go through the keys in <code>sorted(bins)</code> order and look for the largest count."
    ],
    "check": {
     "tests": "assert top_bin([12, 25, 27, 29, 31]) == 20, \"top_bin([12, 25, 27, 29, 31]) should return 20\"\nassert top_bin([5, 15, 16, 45, 47]) == 10, \"If the counts are equal, take the smaller bin: top_bin([5, 15, 16, 45, 47]) = 10\"\nassert top_bin([88]) == 80, \"top_bin([88]) should return 80\""
    }
   },
   {
    "title": "Bin labels",
    "prompt": "<p>Write the function <code>bin_labels(xs, width)</code>: it should return a frequency dictionary where the key is a text label of the form <code>\"басы-соңы\"</code>. For example, <code>bin_labels([55, 62, 68], 10)</code> → <code>{\"50-59\": 1, \"60-69\": 2}</code>.</p>",
    "hints": [
     "The end of a bin: <code>start + width - 1</code>.",
     "Label: <code>f\"{start}-{start + width - 1}\"</code>"
    ],
    "check": {
     "tests": "assert bin_labels([55, 62, 68], 10) == {\"50-59\": 1, \"60-69\": 2}, \"bin_labels([55, 62, 68], 10) should be {'50-59': 1, '60-69': 2}\"\nassert bin_labels([3, 4, 7], 5) == {\"0-4\": 2, \"5-9\": 1}, \"bin_labels([3, 4, 7], 5) should be {'0-4': 2, '5-9': 1}\""
    }
   },
   {
    "title": "Empty bins are needed too",
    "prompt": "<p>An empty bin should also appear in the histogram. The function <code>full_bins(xs, width)</code> should return <b>all</b> bins from the bin of the smallest value to the bin of the largest value, and an empty bin gets <code>0</code>. For example, <code>full_bins([12, 15, 41], 10)</code> → <code>{10: 2, 20: 0, 30: 0, 40: 1}</code>.</p>",
    "hints": [
     "<code>range(lo, hi + 1, width)</code> gives all bin starts.",
     "First set every key to 0, then count."
    ],
    "check": {
     "tests": "assert full_bins([12, 15, 41], 10) == {10: 2, 20: 0, 30: 0, 40: 1}, \"full_bins([12, 15, 41], 10) should be {10: 2, 20: 0, 30: 0, 40: 1}\"\nassert full_bins([5, 6], 5) == {5: 2}, \"full_bins([5, 6], 5) should be {5: 2}\"\nassert full_bins([0, 14], 5) == {0: 1, 5: 0, 10: 1}, \"full_bins([0, 14], 5) should be {0: 1, 5: 0, 10: 1}\""
    }
   },
   {
    "title": "Direction of skew",
    "prompt": "<p>Write the function <code>skew_side(xs)</code>: if the mean is greater than the median, it returns <code>\"оң\"</code>; if it is smaller, <code>\"сол\"</code>; if they are equal, <code>\"симметриялы\"</code>. Find the median from the middle of the sorted list (for an even length, the average of the two middle values). For example, salaries <code>[300, 320, 350, 2500]</code> → <code>\"оң\"</code>.</p>",
    "hints": [
     "With right skew, the mean is greater than the median.",
     "Median: <code>s = sorted(xs)</code>, and the middle values."
    ],
    "check": {
     "tests": "assert skew_side([300, 320, 350, 2500]) == \"оң\", \"Long tail on the right: [300, 320, 350, 2500] → оң\"\nassert skew_side([10, 80, 85, 90]) == \"сол\", \"[10, 80, 85, 90] → сол\"\nassert skew_side([1, 2, 3, 4, 5]) == \"симметриялы\", \"[1, 2, 3, 4, 5] → симметриялы\""
    }
   },
   {
    "title": "Text histogram",
    "prompt": "<p>Write the function <code>hist_lines(xs, width)</code>: it returns a list of lines for the bins in increasing order, and empty bins are included too. Each line: <code>f\"{басы}: {'#' * саны}\"</code>. For example, <code>hist_lines([1, 2, 21], 10)</code> → <code>[\"0: ##\", \"10: \", \"20: #\"]</code>.</p>",
    "hints": [
     "First build a full dictionary that includes the empty bins.",
     "<code>'#' * 3</code> → <code>'###'</code>"
    ],
    "check": {
     "tests": "assert hist_lines([1, 2, 21], 10) == [\"0: ##\", \"10: \", \"20: #\"], f\"hist_lines([1, 2, 21], 10) is wrong: {hist_lines([1, 2, 21], 10)}\"\n_r = hist_lines([55, 62, 68, 71, 74, 75, 78, 81, 85, 93], 10)\nassert _r == [\"50: #\", \"60: ##\", \"70: ####\", \"80: ##\", \"90: #\"], f\"The lines for the lesson's grades are wrong: {_r}\""
    }
   },
   {
    "title": "Peaks of the distribution",
    "prompt": "<p>Are there two \"humps\"? The function <code>peaks(xs, width)</code> should return, in increasing order, a list of bin starts that are <b>peaks</b> of the full histogram (empty bins count as 0). A peak is a bin whose count is strictly greater than both neighbours (if there is no neighbour on one side, count it as 0). For example, cafe bills <code>[1400, 1500, 1600, 1550, 2100, 7100, 8000, 8100, 8200]</code>, <code>width=1000</code> → <code>[1000, 8000]</code>.</p>",
    "hints": [
     "Keep the bin starts in a list <code>starts</code>, so you can get the neighbours by index.",
     "Treat a neighbour beyond the edge as 0."
    ],
    "check": {
     "tests": "_r = peaks([1400, 1500, 1600, 1550, 2100, 7100, 8000, 8100, 8200], 1000)\nassert _r == [1000, 8000], f\"The two peaks should be 1000 and 8000, you have {_r}\"\nassert peaks([1, 11, 12, 13, 21], 10) == [10], \"A distribution with one peak: [10]\"\nassert peaks([5, 6, 15, 16], 10) == [], \"Equal neighbours do not make a peak: []\""
    }
   }
  ]
 },
 "st-2": {
  "pr": [
   {
    "title": "Mean function",
    "prompt": "<p>Write the function <code>mean(xs)</code> without using <code>statistics</code>. For example, <code>mean([2, 4, 9])</code> → <code>5.0</code>.</p>",
    "hints": [
     "<code>sum(xs) / len(xs)</code>"
    ],
    "check": {
     "tests": "assert mean([2, 4, 9]) == 5, \"mean([2, 4, 9]) should be 5\"\nassert mean([7]) == 7, \"mean([7]) should be 7\"\nassert abs(mean([1, 2]) - 1.5) < 1e-9, \"mean([1, 2]) should be 1.5\""
    }
   },
   {
    "title": "Most common size",
    "prompt": "<p>The function <code>top_size(sizes)</code> should use <code>statistics.mode</code> to return the most frequently sold size. For example, <code>top_size([\"M\", \"L\", \"M\", \"S\"])</code> → <code>\"M\"</code>.</p>",
    "hints": [
     "<code>statistics.mode(sizes)</code>"
    ],
    "check": {
     "tests": "assert top_size([\"M\", \"L\", \"M\", \"S\"]) == \"M\", \"top_size(['M', 'L', 'M', 'S']) should be M\"\nassert top_size([\"XL\", \"S\", \"S\", \"L\", \"XL\", \"S\"]) == \"S\", \"The most common size in this list is S\""
    }
   },
   {
    "title": "February median temperature",
    "prompt": "<p>Night temperatures in Astana for one week in February are given. The function <code>med_temp(temps)</code> should use <code>statistics.median</code> to return the median. For example, <code>med_temp([-25, -18, -30, -21])</code> → <code>-23.0</code>.</p>",
    "hints": [
     "<code>statistics.median(temps)</code>"
    ],
    "check": {
     "tests": "assert med_temp([-25, -18, -30, -21]) == -23, \"med_temp([-25, -18, -30, -21]) should be -23\"\nassert med_temp([-12, -20, -15]) == -15, \"med_temp([-12, -20, -15]) should be -15\""
    }
   },
   {
    "title": "Difference between mean and median",
    "prompt": "<p>The function <code>gap(xs)</code> should return the difference between the mean and the median (<code>орташа − медиана</code>). A positive number is a sign of a right tail. You may use <code>statistics</code>. For example, <code>gap([300, 320, 350, 400, 2500])</code> → <code>424</code>.</p>",
    "hints": [
     "<code>statistics.mean(xs) - statistics.median(xs)</code>"
    ],
    "check": {
     "tests": "assert gap([300, 320, 350, 400, 2500]) == 424, \"gap([300, 320, 350, 400, 2500]) should be 424 (774 − 350)\"\nassert gap([1, 2, 3]) == 0, \"In a symmetric list the difference is 0\"\nassert gap([1, 9, 10]) < 0, \"With a left tail the difference is negative\""
    }
   },
   {
    "title": "Mode by hand",
    "prompt": "<p>Write the function <code>my_mode(xs)</code> without using <code>statistics</code>: it returns the most frequent value. If several values are equally frequent, take the one that appears <b>first</b> in the list. For example, <code>my_mode([\"Алматы\", \"Астана\", \"Астана\", \"Алматы\", \"Шымкент\"])</code> → <code>\"Алматы\"</code>.</p>",
    "hints": [
     "First count each value in the dictionary <code>counts</code>.",
     "Then go through the list from the start and replace the value with a strict <code>&gt;</code> comparison when its count is larger."
    ],
    "check": {
     "tests": "assert my_mode([\"Алматы\", \"Астана\", \"Астана\", \"Алматы\", \"Шымкент\"]) == \"Алматы\", \"On a tie, the one that appeared first: Алматы\"\nassert my_mode([3, 1, 1, 2]) == 1, \"my_mode([3, 1, 1, 2]) should be 1\"\nassert my_mode([5]) == 5, \"A list with one value\""
    }
   },
   {
    "title": "Choosing the right measure",
    "prompt": "<p>The function <code>pick_center(xs)</code> should return a pair according to the table from the lesson:</p><ul><li>if the values are text (<code>isinstance(xs[0], str)</code>) → <code>(\"мода\", мода)</code>;</li><li>if the mean differs from the median by more than 10% (<code>abs(орташа − медиана) &gt; 0.1 * медиана</code>) → <code>(\"медиана\", медиана)</code>;</li><li>otherwise → <code>(\"орташа\", орташа)</code>.</li></ul><p>For example, <code>[300, 320, 350, 400, 2500]</code> → <code>(\"медиана\", 350)</code>.</p>",
    "hints": [
     "First check that the values are text, and only then compute the mean."
    ],
    "check": {
     "tests": "assert pick_center([300, 320, 350, 400, 2500]) == (\"медиана\", 350), \"There is an outlier: ('медиана', 350)\"\nassert pick_center([\"S\", \"M\", \"M\"]) == (\"мода\", \"M\"), \"Categorical data: ('мода', 'M')\"\nassert pick_center([160, 165, 170, 175]) == (\"орташа\", 167.5), \"Symmetric data: ('орташа', 167.5)\""
    }
   },
   {
    "title": "Median by city",
    "prompt": "<p>The function <code>median_by_city(rows)</code> takes a list of <code>(қала, жалақы)</code> pairs and returns a dictionary <code>{қала: жалақы медианасы}</code>. For example, <code>[(\"Алматы\", 400), (\"Алматы\", 600), (\"Астана\", 500)]</code> → <code>{\"Алматы\": 500.0, \"Астана\": 500}</code>.</p>",
    "hints": [
     "First collect the salaries of each city into a list: <code>groups.setdefault(city, []).append(salary)</code>.",
     "Then take the <code>statistics.median</code> of each list."
    ],
    "check": {
     "tests": "_rows = [(\"Алматы\", 400), (\"Астана\", 500), (\"Алматы\", 600), (\"Шымкент\", 300), (\"Алматы\", 5000), (\"Астана\", 450)]\n_r = median_by_city(_rows)\nassert isinstance(_r, dict), \"Return a dictionary\"\nassert _r == {\"Алматы\": 600, \"Астана\": 475, \"Шымкент\": 300}, f\"Almaty 600, Astana 475, Shymkent 300 should be the result, you have {_r}\""
    }
   },
   {
    "title": "Average without the edges",
    "prompt": "<p>The function <code>trimmed_mean(xs, k)</code> sorts the list, removes the <code>k</code> smallest and the <code>k</code> largest values, and returns the mean of the rest. For example, <code>trimmed_mean([5, 100, 7, 6, 1], 1)</code> → <code>6.0</code>.</p>",
    "hints": [
     "<code>s = sorted(xs)</code>, then <code>s[k:len(s) - k]</code>."
    ],
    "check": {
     "tests": "assert trimmed_mean([5, 100, 7, 6, 1], 1) == 6, \"trimmed_mean([5, 100, 7, 6, 1], 1) should be 6\"\nassert trimmed_mean([1, 2, 3, 4], 0) == 2.5, \"When k = 0, it is the ordinary mean\"\n_src = [9, 1, 5, 3]\ntrimmed_mean(_src, 1)\nassert _src == [9, 1, 5, 3], \"Do not change the original list: use sorted()\""
    }
   }
  ]
 },
 "st-3": {
  "pr": [
   {
    "title": "Range",
    "prompt": "<p>The function <code>value_range(xs)</code> should return the range (<code>max − min</code>). For example, the daytime temperature in Shymkent for one week <code>[31, 35, 29, 38]</code> → <code>9</code>.</p>",
    "hints": [
     "<code>max(xs) - min(xs)</code>"
    ],
    "check": {
     "tests": "assert value_range([31, 35, 29, 38]) == 9, \"value_range([31, 35, 29, 38]) should be 9\"\nassert value_range([5, 5]) == 0, \"The range of identical values is 0\""
    }
   },
   {
    "title": "Population variance",
    "prompt": "<p>Write the function <code>pop_var(xs)</code> without using <code>statistics</code>: it is the population variance, that is, the sum of squared deviations divided by <code>n</code>. For example, <code>pop_var([2, 4, 6, 8])</code> → <code>5.0</code>.</p>",
    "hints": [
     "First find the mean <code>m</code>.",
     "<code>sum((x - m) ** 2 for x in xs) / len(xs)</code>"
    ],
    "check": {
     "tests": "import statistics as _st\nassert abs(pop_var([2, 4, 6, 8]) - 5) < 1e-9, \"pop_var([2, 4, 6, 8]) should be 5: divide by n\"\nfor _xs in ([1, 2, 3, 10], [7, 7, 7]):\n    assert abs(pop_var(_xs) - _st.pvariance(_xs)) < 1e-9, f\"pop_var({_xs}) should be {_st.pvariance(_xs):.4f}\""
    }
   },
   {
    "title": "Two standard deviations",
    "prompt": "<p>The function <code>two_std(xs)</code> should return a pair <code>(таңдама SD, популяция SD)</code>: one from <code>statistics.stdev</code> and one from <code>statistics.pstdev</code>. For example, <code>two_std([2, 4, 6, 8])</code> → about <code>(2.58, 2.24)</code>.</p>",
    "hints": [
     "<code>(statistics.stdev(xs), statistics.pstdev(xs))</code>"
    ],
    "check": {
     "tests": "import statistics as _st\n_r = two_std([2, 4, 6, 8])\nassert isinstance(_r, tuple) and len(_r) == 2, \"Return a tuple of two values\"\nassert abs(_r[0] - _st.stdev([2, 4, 6, 8])) < 1e-9, \"The first value should be the sample SD (stdev)\"\nassert abs(_r[1] - _st.pstdev([2, 4, 6, 8])) < 1e-9, \"The second value should be the population SD (pstdev)\""
    }
   },
   {
    "title": "Find the steadier shop",
    "prompt": "<p>The daily sales of two shops are given. The function <code>steadier(a, b)</code> returns <code>\"A\"</code> or <code>\"B\"</code>, the shop with the smaller sample SD (on a tie, <code>\"A\"</code>). For example, <code>steadier([95, 100, 105], [20, 100, 180])</code> → <code>\"A\"</code>.</p>",
    "hints": [
     "Compare <code>statistics.stdev(a)</code> and <code>statistics.stdev(b)</code>."
    ],
    "check": {
     "tests": "assert steadier([95, 100, 105], [20, 100, 180]) == \"A\", \"The first shop is steadier: A\"\nassert steadier([10, 50, 90], [48, 50, 52]) == \"B\", \"The second shop is steadier: B\"\nassert steadier([1, 2, 3], [11, 12, 13]) == \"A\", \"If the SDs are equal, A\""
    }
   },
   {
    "title": "Deviations from the mean",
    "prompt": "<p>The function <code>deviations(xs)</code> should return the list of each value's deviation from the mean (<code>x − орташа</code>). For example, <code>deviations([2, 4, 6, 8])</code> → <code>[-3.0, -1.0, 1.0, 3.0]</code>. Note: the sum is always 0.</p>",
    "hints": [
     "<code>[x - m for x in xs]</code>"
    ],
    "check": {
     "tests": "assert deviations([2, 4, 6, 8]) == [-3, -1, 1, 3], \"deviations([2, 4, 6, 8]) should be [-3.0, -1.0, 1.0, 3.0]\"\n_r = deviations([10, 20, 60])\nassert isinstance(_r, list) and len(_r) == 3, \"Each value gets one deviation\"\nassert abs(sum(_r)) < 1e-9, \"The sum of the deviations should be 0\""
    }
   },
   {
    "title": "Days far from the mean",
    "prompt": "<p>The function <code>far_days(sales)</code> should return the number of values that are more than one sample SD away from the mean (<code>abs(x − орташа) &gt; SD</code>). You may use <code>statistics</code>. For example, <code>far_days([10, 12, 11, 30, 9])</code> → <code>1</code>.</p>",
    "hints": [
     "Count the values that satisfy the condition <code>abs(x - m) &gt; sd</code>."
    ],
    "check": {
     "tests": "assert far_days([10, 12, 11, 30, 9]) == 1, \"far_days([10, 12, 11, 30, 9]) should be 1\"\nassert far_days([2, 4, 6, 8]) == 2, \"far_days([2, 4, 6, 8]) should be 2: these are 2 and 8\"\nassert far_days([5, 5, 6, 6]) == 0, \"far_days([5, 5, 6, 6]) should be 0\""
    }
   },
   {
    "title": "SD by city",
    "prompt": "<p>The function <code>std_by_city(rows)</code> takes <code>(қала, сома)</code> pairs and returns a dictionary <code>{қала: таңдама SD, 1 ондық белгіге дейін round}</code>, rounded to one decimal place. Do not include a city that has only one value (the sample SD cannot be computed). For example, <code>[(\"Алматы\", 2), (\"Алматы\", 4), (\"Ақтау\", 9)]</code> → <code>{\"Алматы\": 1.4}</code>.</p>",
    "hints": [
     "First collect the values of each city into lists.",
     "Add the condition <code>if len(v) &gt;= 2</code>."
    ],
    "check": {
     "tests": "_rows = [(\"Алматы\", 2), (\"Ақтау\", 9), (\"Алматы\", 4), (\"Алматы\", 6), (\"Астана\", 10), (\"Астана\", 20)]\n_r = std_by_city(_rows)\nassert _r == {\"Алматы\": 2.0, \"Астана\": 7.1}, f\"Expected {{'Алматы': 2.0, 'Астана': 7.1}}, you have {_r}\""
    }
   },
   {
    "title": "The most stable week",
    "prompt": "<p>The function <code>steadiest_week(daily)</code> splits the list of daily sales into weeks of 7 days (the length is a multiple of 7) and returns the number (from 0) of the week with the smallest sample SD. On a tie, take the earlier week.</p>",
    "hints": [
     "Week <code>i</code>: <code>daily[i * 7:(i + 1) * 7]</code>.",
     "Keep the smallest SD and its number together."
    ],
    "check": {
     "tests": "_d = [10, 30, 15, 40, 12, 35, 20] + [20, 21, 19, 22, 20, 21, 20] + [5, 50, 5, 50, 5, 50, 5]\nassert steadiest_week(_d) == 1, \"The second week (number 1) is the most stable\"\nassert steadiest_week([1, 2, 3, 4, 5, 6, 7] * 2) == 0, \"On a tie, the earlier week: 0\"\nassert steadiest_week([5, 5, 5, 5, 5, 5, 6] + [1, 9, 1, 9, 1, 9, 1]) == 0, \"Here week 0 is stable\""
    }
   }
  ]
 },
 "st-4": {
  "pr": [
   {
    "title": "Calculating the IQR",
    "prompt": "<p>The function <code>iqr(xs)</code> should return the IQR (<code>Q3 − Q1</code>) using <code>statistics.quantiles(xs, n=4)</code>.</p>",
    "hints": [
     "<code>q1, _, q3 = statistics.quantiles(xs, n=4)</code>"
    ],
    "check": {
     "tests": "import statistics as _st\nfor _xs in ([12, 14, 15, 15, 16, 17, 18, 19, 21, 48], [1, 2, 3, 4, 5, 6, 7, 8]):\n    _q = _st.quantiles(_xs, n=4)\n    assert abs(iqr(_xs) - (_q[2] - _q[0])) < 1e-9, f\"iqr({_xs}) should be {_q[2] - _q[0]}\""
    }
   },
   {
    "title": "Tukey fences",
    "prompt": "<p>The function <code>fences(xs)</code> should return the pair <code>(low, high)</code>: <code>low = Q1 − 1.5 × IQR</code>, <code>high = Q3 + 1.5 × IQR</code>. Quartiles: <code>statistics.quantiles(xs, n=4)</code>.</p>",
    "hints": [
     "First <code>iqr = q3 - q1</code>."
    ],
    "check": {
     "tests": "_r = fences([12, 14, 15, 15, 16, 17, 18, 19, 21, 48])\nassert isinstance(_r, tuple) and len(_r) == 2, \"Return the tuple (low, high)\"\nassert abs(_r[0] - 7.625) < 1e-9 and abs(_r[1] - 26.625) < 1e-9, f\"The example from the lesson should be (7.625, 26.625), you have {_r}\""
    }
   },
   {
    "title": "Values above the upper fence",
    "prompt": "<p>The function <code>high_outliers(xs)</code> returns only the values greater than the upper fence (<code>Q3 + 1.5 × IQR</code>), in their original order. For example, weekly orders <code>[12, 14, 15, 15, 16, 17, 18, 19, 21, 48]</code> → <code>[48]</code>.</p>",
    "hints": [
     "<code>high = q3 + 1.5 * (q3 - q1)</code>"
    ],
    "check": {
     "tests": "assert high_outliers([12, 14, 15, 15, 16, 17, 18, 19, 21, 48]) == [48], \"[48] is in this list\"\nassert high_outliers([-50, 10, 11, 12, 13, 14]) == [], \"The low outlier is not in this list\"\nassert high_outliers([90, 10, 11, 12, 13, 14, 12, 11, 13, 95]) == [90, 95], \"In original order: [90, 95]\""
    }
   },
   {
    "title": "List without outliers",
    "prompt": "<p>The function <code>drop_outliers(xs)</code> removes the outliers by Tukey's rule and returns the other values in their original order. For example, <code>[10, 12, 11, 13, 12, 95, 11, 10, 12]</code> → <code>[10, 12, 11, 13, 12, 11, 10, 12]</code>.</p>",
    "hints": [
     "Keep the values that satisfy the condition <code>low &lt;= x &lt;= high</code>."
    ],
    "check": {
     "tests": "assert drop_outliers([10, 12, 11, 13, 12, 95, 11, 10, 12]) == [10, 12, 11, 13, 12, 11, 10, 12], \"95 is removed, the rest must stay in their original order\"\nassert drop_outliers([-40, 20, 21, 22, 23, 24, 25, 90]) == [20, 21, 22, 23, 24, 25], \"Outliers on both sides are removed too\"\nassert drop_outliers([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5], \"If there are no outliers, the list does not change\""
    }
   },
   {
    "title": "Above the 90th percentile",
    "prompt": "<p>The function <code>above_p90(xs)</code> returns the values greater than the 90th percentile, in their original order. The 90th percentile is the last element of the list <code>statistics.quantiles(xs, n=10)</code>.</p>",
    "hints": [
     "<code>statistics.quantiles(xs, n=10)[-1]</code> is the 90th percentile."
    ],
    "check": {
     "tests": "import statistics as _st\n_xs = [5, 12, 8, 30, 7, 9, 11, 6, 10, 25, 13, 14, 4, 15, 16, 18, 17, 20, 19, 3]\n_p = _st.quantiles(_xs, n=10)[-1]\n_exp = [x for x in _xs if x > _p]\nassert above_p90(_xs) == _exp, f\"Expected {_exp}, you have {above_p90(_xs)}\"\nassert above_p90(list(range(1, 11))) == [10], \"In the list 1…10 only [10]\""
    }
   },
   {
    "title": "Share of outliers",
    "prompt": "<p>The function <code>outlier_share(xs)</code> returns the percentage of outliers by Tukey's rule (rounded to one decimal place, <code>round</code>). For example, <code>[12, 14, 15, 15, 16, 17, 18, 19, 21, 48]</code> → <code>10.0</code>.</p>",
    "hints": [
     "Count the outliers, divide by <code>len(xs)</code> and multiply by 100."
    ],
    "check": {
     "tests": "assert outlier_share([12, 14, 15, 15, 16, 17, 18, 19, 21, 48]) == 10.0, \"1 of 10 values is an outlier: 10.0\"\nassert outlier_share([-40, 20, 21, 22, 23, 24, 25, 90]) == 25.0, \"2 of 8 values are outliers: 25.0\"\nassert outlier_share([1, 2, 3, 4, 5, 6]) == 0.0, \"No outliers: 0.0\""
    }
   },
   {
    "title": "Five-number summary",
    "prompt": "<p>The five numbers for a box plot. The function <code>five_numbers(xs)</code> should return a dictionary with the keys <code>min</code>, <code>q1</code>, <code>median</code>, <code>q3</code>, <code>max</code>. The quartiles come from <code>statistics.quantiles(xs, n=4)</code>, and the median is the middle value of them.</p>",
    "hints": [
     "<code>q1, q2, q3 = statistics.quantiles(xs, n=4)</code>"
    ],
    "check": {
     "tests": "import statistics as _st\n_xs = [3200, 1500, 2100, 2800, 1900, 2500, 9000, 2300]\n_d = five_numbers(_xs)\nassert isinstance(_d, dict), \"Return a dictionary\"\n_q = _st.quantiles(_xs, n=4)\n_exp = {\"min\": 1500, \"q1\": _q[0], \"median\": _q[1], \"q3\": _q[2], \"max\": 9000}\nfor _k, _v in _exp.items():\n    assert _k in _d, f\"The key {_k} is missing\"\n    assert abs(_d[_k] - _v) < 1e-9, f\"{_k} is wrong: expected {_v}\""
    }
   },
   {
    "title": "Flagging each value",
    "prompt": "<p>The function <code>flag_values(xs)</code> returns a list of flags for each value: below the lower fence → <code>\"төмен\"</code>, above the upper fence → <code>\"жоғары\"</code>, otherwise <code>\"ok\"</code> (Tukey's rule). For example, <code>[-40, 20, 21, 22, 23, 24, 25, 90]</code> → <code>[\"төмен\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"жоғары\"]</code>.</p>",
    "hints": [
     "Calculate the fences once, then check each value with <code>if / elif / else</code>."
    ],
    "check": {
     "tests": "assert flag_values([-40, 20, 21, 22, 23, 24, 25, 90]) == [\"төмен\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"жоғары\"], f\"The flags are wrong: {flag_values([-40, 20, 21, 22, 23, 24, 25, 90])}\"\nassert flag_values([5, 6, 7, 8]) == [\"ok\"] * 4, \"There are no outliers: everything should be ok\""
    }
   }
  ]
 },
 "st-5": {
  "pr": [
   {
    "title": "z-score of one value",
    "prompt": "<p>The function <code>z(x, mean, sd)</code> should return the z-score. For example, a maths score of 85, mean 70, SD 10 → <code>z(85, 70, 10)</code> = <code>1.5</code>.</p>",
    "hints": [
     "<code>(x - mean) / sd</code>"
    ],
    "check": {
     "tests": "assert z(85, 70, 10) == 1.5, \"z(85, 70, 10) should be 1.5\"\nassert abs(z(12.4, 13.0, 0.4) + 1.5) < 1e-9, \"z(12.4, 13.0, 0.4) should be -1.5\"\nassert z(70, 70, 10) == 0, \"The z-score of a value equal to the mean is 0\""
    }
   },
   {
    "title": "From a z-score back to a value",
    "prompt": "<p>The reverse problem: the function <code>from_z(zv, mean, sd)</code> returns the original value from a z-score (<code>mean + zv × sd</code>). For example, a mean height of 165 cm, SD 6: <code>from_z(2, 165, 6)</code> → <code>177</code>.</p>",
    "hints": [
     "<code>mean + zv * sd</code>"
    ],
    "check": {
     "tests": "assert from_z(2, 165, 6) == 177, \"from_z(2, 165, 6) should be 177\"\nassert from_z(-1, 100, 15) == 85, \"from_z(-1, 100, 15) should be 85\"\nassert from_z(0, 50, 7) == 50, \"When z = 0, it is the mean\""
    }
   },
   {
    "title": "Population z-scores",
    "prompt": "<p>The function <code>zscores_p(xs)</code> should return a list of z-scores, but use <code>statistics.pstdev</code> (the population) for the SD. For example, <code>zscores_p([2, 4, 6, 8])</code> → about <code>[-1.34, -0.45, 0.45, 1.34]</code>.</p>",
    "hints": [
     "<code>sd = statistics.pstdev(xs)</code>"
    ],
    "check": {
     "tests": "import statistics as _st\n_r = zscores_p([2, 4, 6, 8])\nassert isinstance(_r, list) and len(_r) == 4, \"Return a list of 4 values\"\n_sd = _st.pstdev([2, 4, 6, 8])\nassert all(abs(a - (x - 5) / _sd) < 1e-9 for a, x in zip(_r, [2, 4, 6, 8])), \"Use pstdev, not stdev\""
    }
   },
   {
    "title": "The most unusual value",
    "prompt": "<p>The function <code>most_unusual(xs)</code> returns the value with the largest absolute z-score (SD: <code>statistics.stdev</code>). For example, <code>most_unusual([100, 102, 98, 60, 101])</code> → <code>60</code>.</p>",
    "hints": [
     "<code>max(xs, key=lambda x: abs((x - m) / sd))</code>"
    ],
    "check": {
     "tests": "assert most_unusual([100, 102, 98, 60, 101]) == 60, \"most_unusual([100, 102, 98, 60, 101]) should be 60\"\nassert most_unusual([5, 6, 7, 30]) == 30, \"most_unusual([5, 6, 7, 30]) should be 30\""
    }
   },
   {
    "title": "Which result is stronger",
    "prompt": "<p>A student on the national test got <code>x1</code> points in maths and <code>x2</code> in history. The function <code>stronger(x1, xs1, x2, xs2)</code> compares the z-score of each score within its own group (<code>xs1</code>, <code>xs2</code>) and returns <code>\"математика\"</code> or <code>\"тарих\"</code> (on a tie, <code>\"математика\"</code>). SD: <code>statistics.stdev</code>.</p>",
    "hints": [
     "Calculate the z-score of each subject from the mean and SD of its group."
    ],
    "check": {
     "tests": "assert stronger(30, [20, 25, 30], 18, [10, 14, 18]) == \"математика\", \"If z is equal, maths\"\nassert stronger(35, [30, 32, 34, 36], 19, [10, 12, 14, 16]) == \"тарих\", \"The history result is stronger within its group\"\nassert stronger(38, [20, 25, 30], 17, [15, 16, 17]) == \"математика\", \"The maths z-score is larger\""
    }
   },
   {
    "title": "Students above the mean",
    "prompt": "<p>The function <code>top_students(names, scores, k)</code> returns, in their original order, the names of the students whose z-score is greater than <code>k</code> (SD: <code>statistics.stdev</code>). For example, <code>top_students([\"Ата\", \"Бек\", \"Сая\"], [60, 70, 95], 0.5)</code> → <code>[\"Сая\"]</code>.</p>",
    "hints": [
     "Go through the names together with the scores using <code>zip(names, scores)</code>."
    ],
    "check": {
     "tests": "assert top_students([\"Ата\", \"Бек\", \"Сая\"], [60, 70, 95], 0.5) == [\"Сая\"], \"Only Saya: z ≈ 1.1\"\n_n = [\"Әли\", \"Дана\", \"Ерік\", \"Жан\", \"Мира\"]\n_s = [50, 80, 85, 60, 90]\nassert top_students(_n, _s, 0) == [\"Дана\", \"Ерік\", \"Мира\"], \"With k = 0: above the mean are Dana, Erik, Mira\"\nassert top_students(_n, _s, 2) == [], \"With k = 2 there is nobody\""
    }
   },
   {
    "title": "Cleaning by z-score",
    "prompt": "<p>The function <code>clean_by_z(xs, limit)</code> removes the values for which <code>|z| &gt; limit</code>, returns the rest in their original order, and returns the number of removed values as a pair <code>(таза_тізім, алынғандар_саны)</code>. SD: <code>statistics.stdev</code>.</p>",
    "hints": [
     "First build the list of kept values, then calculate <code>len(xs) - len(kept)</code>."
    ],
    "check": {
     "tests": "_xs = [102, 98, 105, 97, 101, 99, 160, 103, 100, 96]\nassert clean_by_z(_xs, 2) == ([102, 98, 105, 97, 101, 99, 103, 100, 96], 1), f\"limit = 2: 160 is removed, you have {clean_by_z(_xs, 2)}\"\nassert clean_by_z(_xs, 3) == (_xs, 0), \"limit = 3: nothing is removed\""
    }
   },
   {
    "title": "z-score within a group",
    "prompt": "<p>Each class has its own mean. The function <code>z_in_group(rows)</code> takes <code>(сынып, ұпай)</code> pairs and returns, in the original order, the z-score of each row within its <b>own class</b> (SD: <code>statistics.stdev</code>, rounded to 2 decimal places, <code>round</code>).</p><p>For example, <code>[(\"9А\", 60), (\"9Б\", 80), (\"9А\", 70), (\"9Б\", 90), (\"9А\", 80)]</code> → <code>[-1.0, -0.71, 0.0, 0.71, 1.0]</code>.</p>",
    "hints": [
     "First collect the values of each class, then calculate the mean and SD.",
     "Then go through <code>rows</code> again and apply each class's measure to its rows."
    ],
    "check": {
     "tests": "_rows = [(\"9А\", 60), (\"9Б\", 80), (\"9А\", 70), (\"9Б\", 90), (\"9А\", 80)]\n_r = z_in_group(_rows)\nassert _r == [-1.0, -0.71, 0.0, 0.71, 1.0], f\"Expected [-1.0, -0.71, 0.0, 0.71, 1.0], you have {_r}\""
    }
   }
  ]
 },
 "st-6": {
  "pr": [
   {
    "title": "Sum of covariances",
    "prompt": "<p>The function <code>cov_sum(x, y)</code> should return the sum of the products of deviations: <code>Σ (a − mx)(b − my)</code>. In the lesson's example <code>cov_sum([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])</code> → <code>6.0</code>.</p>",
    "hints": [
     "Go through the pairs with <code>zip(x, y)</code>."
    ],
    "check": {
     "tests": "assert abs(cov_sum([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) - 6) < 1e-9, \"cov_sum([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) should be 6\"\nassert abs(cov_sum([1, 2, 3], [3, 2, 1]) + 2) < 1e-9, \"With a negative relationship the sum is negative: -2\""
    }
   },
   {
    "title": "Ready-made correlation",
    "prompt": "<p>The function <code>r2(x, y)</code> returns the result of <code>statistics.correlation</code>, rounded to 2 decimal places (<code>round</code>). For example, <code>r2([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])</code> → <code>0.77</code>.</p>",
    "hints": [
     "<code>round(statistics.correlation(x, y), 2)</code>"
    ],
    "check": {
     "tests": "assert r2([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) == 0.77, \"r2([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) should be 0.77\"\nassert r2([1, 2, 3], [6, 4, 2]) == -1.0, \"A perfect negative relationship: -1.0\""
    }
   },
   {
    "title": "Direction of a relationship",
    "prompt": "<p>The function <code>direction(r)</code> returns a text based on the correlation coefficient: <code>r &gt;= 0.1</code> → <code>\"оң\"</code>, <code>r &lt;= -0.1</code> → <code>\"теріс\"</code>, otherwise <code>\"жоқ\"</code>.</p>",
    "hints": [
     "<code>if / if / return</code>: three branches are enough."
    ],
    "check": {
     "tests": "assert direction(0.77) == \"оң\", \"direction(0.77) should be оң\"\nassert direction(-0.5) == \"теріс\", \"direction(-0.5) should be теріс\"\nassert direction(0.02) == \"жоқ\", \"direction(0.02) should be жоқ\"\nassert direction(-0.1) == \"теріс\", \"Boundary: direction(-0.1) should be теріс\""
    }
   },
   {
    "title": "Correlation through z-scores",
    "prompt": "<p>The correlation can also be computed in another way: <code>r = Σ(zx × zy) / (n − 1)</code>, where the z-scores are calculated with the sample SD (<code>statistics.stdev</code>). Write the function <code>r_from_z(x, y)</code> with this formula (without using <code>statistics.correlation</code>).</p>",
    "hints": [
     "First the mean and SD of both lists.",
     "Divide the sum of products by <code>len(x) - 1</code>."
    ],
    "check": {
     "tests": "import statistics as _st\nfor _x, _y in (([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]), ([10, 20, 30, 40], [7, 3, 5, 1])):\n    assert abs(r_from_z(_x, _y) - _st.correlation(_x, _y)) < 1e-9, f\"r_from_z({_x}, {_y}) should be {_st.correlation(_x, _y):.4f}: did you divide by n − 1?\""
    }
   },
   {
    "title": "Sample covariance",
    "prompt": "<p>The function <code>sample_cov(x, y)</code> returns the sample covariance: <code>Σ (a − mx)(b − my) / (n − 1)</code>. For example, <code>sample_cov([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])</code> → <code>1.5</code>.</p>",
    "hints": [
     "Divide <code>cov</code> by <code>len(x) - 1</code>."
    ],
    "check": {
     "tests": "assert abs(sample_cov([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) - 1.5) < 1e-9, \"sample_cov([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) should be 1.5\"\nassert abs(sample_cov([2, 4], [10, 6]) + 4) < 1e-9, \"sample_cov([2, 4], [10, 6]) should be -4\""
    }
   },
   {
    "title": "Strongest link",
    "prompt": "<p>The weekly sales of a shop <code>sales</code> and several factors <code>factors</code> (a dictionary: name → list of values) are given. The function <code>strongest(factors, sales)</code> returns the name of the factor with the largest <b>absolute</b> correlation with sales (you may use <code>statistics.correlation</code>).</p>",
    "hints": [
     "<code>max(factors, key=lambda k: abs(...))</code>"
    ],
    "check": {
     "tests": "_sales = [100, 120, 90, 150, 130]\n_f = {\"жарнама\": [10, 12, 9, 15, 13], \"температура\": [20, 18, 25, 22, 19], \"аяз\": [30, 25, 35, 10, 20]}\nassert strongest(_f, _sales) == \"жарнама\", \"Advertising has the strongest link in this data\"\n_f2 = {\"а\": [1, 2, 3, 4, 5], \"ә\": [9, 7, 8, 2, 1]}\nassert strongest(_f2, [5, 4, 4, 2, 1]) == \"ә\", \"Take the absolute value: a strong negative link is strong too\""
    }
   },
   {
    "title": "Correlation matrix",
    "prompt": "<p>The function <code>corr_matrix(data)</code> returns a dictionary of dictionaries: <code>result[a][b]</code> is the correlation of <code>data[a]</code> and <code>data[b]</code>, rounded to 2 decimal places (<code>round</code>). On the diagonal it is <code>1.0</code>. You may use <code>statistics.correlation</code>.</p>",
    "hints": [
     "A nested dict comprehension: <code>{a: {b: ... for b in data} for a in data}</code>."
    ],
    "check": {
     "tests": "_d = {\"x\": [1, 2, 3, 4], \"y\": [2, 4, 6, 8], \"w\": [4, 1, 3, 2]}\n_m = corr_matrix(_d)\nassert _m[\"x\"][\"x\"] == 1.0, \"The diagonal is 1.0\"\nassert _m[\"x\"][\"y\"] == 1.0, \"The full link of x and y: 1.0\"\nassert _m[\"x\"][\"w\"] == _m[\"w\"][\"x\"] == -0.4, f\"For x and w it should be -0.4, you have {_m['x']['w']}\"\nassert set(_m) == {\"x\", \"y\", \"w\"} and all(set(_m[k]) == {\"x\", \"y\", \"w\"} for k in _m), \"All pairs must be present\""
    }
   },
   {
    "title": "Lagged effect",
    "prompt": "<p>Advertising is spent today, and sales grow next week. The function <code>lag_corr(x, y, k)</code> compares the first values of <code>x</code> with the values of <code>y</code> shifted forward by <code>k</code> steps, and returns the correlation rounded to 2 decimal places: <code>x[:len(x) - k]</code> and <code>y[k:]</code>. With <code>k = 0</code> it is the ordinary correlation. Calculate the correlation yourself with the Pearson formula from the lesson (<code>pearson</code>).</p>",
    "hints": [
     "First slice the two lists: <code>x[:len(x) - k]</code>, <code>y[k:]</code>.",
     "Then the Pearson formula from the lesson."
    ],
    "check": {
     "tests": "import statistics as _st\n_ads = [5, 1, 4, 2, 6, 3]\n_sales = [50, 90, 30, 70, 40, 100]\nassert lag_corr(_ads, _sales, 1) == round(_st.correlation(_ads[:5], _sales[1:]), 2), \"For k = 1, the correlation of x[:5] and y[1:]\"\nassert lag_corr(_ads, _sales, 1) > 0.9, \"With a one-week lag the link should be strong\"\nassert lag_corr([1, 2, 3], [3, 2, 1], 0) == -1.0, \"k = 0: the ordinary correlation\""
    }
   }
  ]
 },
 "st-9": {
  "pr": [
   {
    "title": "Company summary",
    "prompt": "<p>Output in one row for all employees: <code>n</code> (count), <code>avg_salary</code>, <code>min_salary</code>, <code>max_salary</code>.</p>",
    "hints": [
     "<code>GROUP BY</code> is not needed here: all rows form one group."
    ]
   },
   {
    "title": "Salary range by department",
    "prompt": "<p>For each department, output <code>department</code> and the salary range <code>salary_range</code> (<code>MAX − MIN</code>).</p>",
    "hints": [
     "<code>MAX(salary) - MIN(salary)</code>"
    ]
   },
   {
    "title": "Department sizes",
    "prompt": "<p>Output the number of employees in each department: <code>department</code>, <code>n</code>. Sort by the count in descending order, and by department name when the counts are equal.</p>",
    "hints": [
     "<code>ORDER BY n DESC, department</code>"
    ]
   },
   {
    "title": "Analytics median",
    "prompt": "<p>Output the median salary of the Analytics department as one value <code>Аналитика</code> <code>median_salary</code>. The department has 4 people: the average of the 2nd and 3rd values in the sorted list.</p>",
    "hints": [
     "In a subquery, use <code>WHERE department = 'Аналитика'</code> and <code>ORDER BY salary LIMIT 2 OFFSET 1</code>."
    ]
   },
   {
    "title": "Company variance",
    "prompt": "<p>Output the population variance of all employees' salaries as one value <code>var</code> (<code>AVG(x*x) − AVG(x)*AVG(x)</code>).</p>",
    "hints": [
     "The formula from the lesson, but without <code>GROUP BY</code>."
    ]
   },
   {
    "title": "Departments above average",
    "prompt": "<p>Output the departments whose average salary is higher than the average of the whole company: <code>department</code>, <code>avg_salary</code>.</p>",
    "hints": [
     "The condition for a group: <code>HAVING AVG(salary) &gt; (SELECT AVG(salary) FROM employees)</code>"
    ]
   },
   {
    "title": "Deviation from the department mean",
    "prompt": "<p>For each employee, output <code>name</code>, <code>department</code>, <code>salary</code> and <code>diff</code>: how much their salary differs from the average salary of their department (<code>salary − бөлім орташасы</code>).</p>",
    "hints": [
     "Window function: <code>AVG(salary) OVER (PARTITION BY department)</code>."
    ]
   },
   {
    "title": "Mean and median in one row",
    "prompt": "<p>Output two values in one row: <code>avg_salary</code> (the company's average salary) and <code>median_salary</code> (the median, 12 employees). Which one is larger, and why?</p>",
    "hints": [
     "Write each value as a separate subquery in <code>SELECT</code>.",
     "Median: <code>ORDER BY salary LIMIT 2 OFFSET 5</code>."
    ]
   }
  ]
 }
} });
