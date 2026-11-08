// M3.1 Descriptive Statistics: English text. Code, solutions and expected output are in content/stats.js.
DJ.i18n.patch({
  modules: {
    'm3-1': { intro: 'Statistics is about describing data with one or two numbers and answering the question "is this normal?". You first write the formulas by hand in Python, then compare them with ready-made functions.' }
  },
  lessons: {
    'st-1': {
      title: 'Distributions and histograms',
      body: `
<p>A <b>distribution</b> shows how values are spread out: which values are common and which are rare. The simplest way to see it is a <b>frequency table</b> and a <b>histogram</b>.</p>
<p>A histogram splits the values into equal intervals (bins) and shows the number of values in each interval as the height of a bar.</p>
<pre><code>scores = [55, 62, 68, 71, 74, 75, 78, 81, 85, 93]
# bins: 50–59, 60–69, 70–79, 80–89, 90–99
bins = {}
for s in scores:
    start = s // 10 * 10        # 74 → 70
    bins[start] = bins.get(start, 0) + 1
print(bins)   # {50: 1, 60: 2, 70: 4, 80: 2, 90: 1}</code></pre>
<h3>The shape of a distribution</h3>
<ul>
<li><b>Symmetric</b>: both sides look the same, mean ≈ median.</li>
<li><b>Right-skewed</b> (right skew): a long "tail" on the right. Salaries and order amounts look like this: mean &gt; median.</li>
<li><b>Left-skewed</b>: the tail is on the left, mean &lt; median.</li>
</ul>
<div class="tip">Whenever you get new data, look at its histogram first. Computing the mean comes after that.</div>
<h3>How do you choose the bin width?</h3>
<p>If the bins are too wide (say, one bar for 0–100), all the data lands in one bar and you cannot see the shape. If they are too narrow (one bar per value), the histogram turns into a "noisy comb". As a starting point, take 5–20 bins and compare a few widths.</p>
<h3>Distributions with several peaks</h3>
<p>If a histogram has two "humps" (bimodal), the data usually comes from two different groups. For example, in café receipts one peak is a single coffee (~1,500 ₸) and the other is a family lunch (~8,000 ₸). A single mean of such data describes nobody: analyze the groups separately.</p>
<div class="tip">The Python trick <code>s // 10 * 10</code> works for any width: for 5-year bins use <code>s // 5 * 5</code>.</div>`,
      ex: [
        { prompt: 'For the list <code>ages</code>, build a frequency dictionary <code>bins</code> with 10-year bins (the key is the start of the bin, e.g. 20, 30). Then print <code>bins</code>.', check: { tests: 'assert bins == {20: 4, 30: 5, 40: 2, 50: 1}, "bins is wrong: check the count in each bin (a // 10 * 10)"' }, hints: ['<code>a // 10 * 10</code> gives the start of the bin.', '<code>bins[start] = bins.get(start, 0) + 1</code>'] },
        { prompt: 'The mean order amount is 18,000 ₸ and the median is 9,000 ₸. What does the distribution look like?', options: ['Symmetric', 'Right-skewed: there are a few very large orders', 'Left-skewed', 'Impossible to tell'], explain: 'When the mean is much higher than the median, there is a long tail on the right.' }
      ]
    },
    'st-2': {
      title: 'Measures of center in Python',
      body: `
<p>In the Math refresher we computed the mean and the median by hand. Now we write them as functions.</p>
<pre><code>def mean(xs):
    return sum(xs) / len(xs)

def median(xs):
    s = sorted(xs)
    n = len(s)
    mid = n // 2
    if n % 2 == 1:
        return s[mid]
    return (s[mid - 1] + s[mid]) / 2</code></pre>
<p>Python has a built-in <code>statistics</code> module: <code>statistics.mean</code>, <code>median</code>, <code>mode</code>. In real work you will use these (or pandas), but it matters to know what happens inside.</p>
<pre><code>import statistics
statistics.median([3, 1, 2, 10])   # 2.5</code></pre>
<h3>Mode</h3>
<p>The third measure of center is the <b>mode</b>, the most frequent value. For categorical data it is the only meaningful one: "the best-selling dress size is M". You cannot compute the "mean" of a city, but you can find its mode.</p>
<pre><code>statistics.mode(["M", "L", "M", "S", "M"])   # 'M'</code></pre>
<h3>Which one to use when?</h3>
<table>
<tr><th>Data</th><th>Measure</th></tr>
<tr><td>Symmetric, no outliers (height, temperature)</td><td>Mean</td></tr>
<tr><td>Skewed or with outliers (salary, price)</td><td>Median</td></tr>
<tr><td>Categorical (city, size, color)</td><td>Mode</td></tr>
</table>
<p>News about salaries often quotes the "average salary", but a few very high salaries push it up. That is why the median shows the situation of most people more accurately.</p>
<div class="tip">In a list of even length the median is the mean of the two middle values, so the median of a list of whole numbers can be a decimal: <code>median([1, 2, 3, 4])</code> = 2.5.</div>`,
      ex: [
        { prompt: 'Write a function <code>median(xs)</code> without <code>statistics</code>. It must work for lists of odd and even length.', check: { tests: 'assert median([5, 1, 3]) == 3, "median([5, 1, 3]) should be 3"\nassert median([4, 1, 3, 2]) == 2.5, "For even length, take the mean of the two middle values: median([4, 1, 3, 2]) = 2.5"\nassert median([7]) == 7, "A list with one value"' }, hints: ['Start with <code>sorted(xs)</code>.', 'If the length is even: <code>(s[mid - 1] + s[mid]) / 2</code>'] },
        { prompt: 'Using the <code>statistics</code> module, store the mean of <code>salaries</code> in <code>avg</code> and the median in <code>med</code>. Then <code>print(avg, med)</code>.', check: { tests: 'assert avg == 774, "avg should be 774"\nassert med == 350, "med should be 350"' }, hints: ['<code>statistics.mean(...)</code>, <code>statistics.median(...)</code>'] }
      ]
    },
    'st-3': {
      title: 'Spread: variance and standard deviation',
      body: `
<p>Two shops can both have average daily sales of 100, but one sells 95–105 every day and the other 20–180. Measures of <b>spread</b> capture this difference.</p>
<ul>
<li><b>Range</b> = max − min. Simple, but it depends on a single extreme value.</li>
<li><b>Variance</b> is the mean of the squared deviations from the mean.</li>
<li><b>Standard deviation</b> (SD) = √variance. It is in the same units as the data.</li>
</ul>
<p>A simple way to think of it: SD is the number for "how far values usually are from the mean". The first shop has a small SD, the second a large one.</p>
<h3>Step-by-step example</h3>
<p>Values: 2, 4, 6, 8. Mean = (2 + 4 + 6 + 8) / 4 = 5.</p>
<table>
<tr><th>x</th><th>x − mean</th><th>(x − mean)²</th></tr>
<tr><td>2</td><td>−3</td><td>9</td></tr>
<tr><td>4</td><td>−1</td><td>1</td></tr>
<tr><td>6</td><td>1</td><td>1</td></tr>
<tr><td>8</td><td>3</td><td>9</td></tr>
<tr><td><b>Sum</b></td><td>0</td><td>20</td></tr>
</table>
<ol>
<li>The deviations always add up to 0: the pluses and minuses cancel out. That is why we square them.</li>
<li>Sample variance: 20 / (4 − 1) ≈ 6.67.</li>
<li>Sample SD: √6.67 ≈ 2.58.</li>
<li>For comparison, the population formula: 20 / 4 = 5, SD = √5 ≈ 2.24.</li>
</ol>
<h3>The sample formula</h3>
<pre><code>def sample_var(xs):
    m = sum(xs) / len(xs)
    return sum((x - m) ** 2 for x in xs) / (len(xs) - 1)</code></pre>
<p>Why <code>n − 1</code>? We usually see not the whole population but a <b>sample</b> of it. Dividing by <code>n − 1</code> keeps the sample from systematically underestimating the population variance. <code>statistics.variance</code> and <code>statistics.stdev</code> use this formula, while <code>pvariance</code> and <code>pstdev</code> divide by <code>n</code>.</p>
<pre><code>import statistics
statistics.variance([2, 4, 6, 8])   # 6.666...
statistics.stdev([2, 4, 6, 8])      # 2.58...
statistics.pstdev([2, 4, 6, 8])     # 2.23...</code></pre>
<div class="tip"><b>Common mistakes:</b> (1) Mixing up <code>n</code> and <code>n − 1</code>: for a sample use <code>n − 1</code>. (2) Stopping at the variance: its unit is squared (tenge²), and to get the SD you need the square root (<code>math.sqrt</code> or <code>** 0.5</code>). (3) Adding up the plain deviations instead of the squares: the result is always 0.</div>`,
      ex: [
        { prompt: 'Write a function <code>sample_std(xs)</code>: the sample standard deviation (the <code>n − 1</code> formula). You may use <code>math.sqrt</code>, but not <code>statistics</code>.', check: { tests: 'import statistics as _st\nfor _xs in ([2, 4, 4, 4, 5, 5, 7, 9], [10, 12, 23, 23, 16, 23, 21, 16], [1, 2]):\n    assert abs(sample_std(_xs) - _st.stdev(_xs)) < 1e-9, f"sample_std({_xs}) should be {_st.stdev(_xs):.4f}: did you divide by n − 1?"' }, hints: ['First the mean <code>m</code>.', '<code>sum((x - m) ** 2 for x in xs) / (len(xs) - 1)</code>, then the square root.'] },
        { prompt: 'Values: 2, 4, 6. What is the sample variance (n − 1)?', explain: 'The mean is 4. Squared deviations: 4, 0, 4. Their sum is 8, and 8 / (3 − 1) = 4.' }
      ]
    },
    'st-4': {
      title: 'Percentiles, IQR and outliers',
      body: `
<p>A <b>percentile</b> is the point below which a given percentage of the values lie. The 50th percentile = the median. The 25th and 75th percentiles are the quartiles <b>Q1</b> and <b>Q3</b>.</p>
<p><b>IQR</b> (interquartile range) = Q3 − Q1. It is the width of the middle 50% of the data and is not sensitive to outliers.</p>
<h3>The outlier rule (Tukey)</h3>
<pre><code>low  = Q1 - 1.5 * IQR
high = Q3 + 1.5 * IQR
# values below low or above high are outliers</code></pre>
<p>Quartiles in Python:</p>
<pre><code>import statistics
q1, q2, q3 = statistics.quantiles(data, n=4)</code></pre>
<div class="tip">An outlier is not always an "error". It can be fraud, a big customer or a typing mistake. Find the reason first, and only then remove it.</div>
<h3>Example</h3>
<p>Weekly order counts: <code>[12, 14, 15, 15, 16, 17, 18, 19, 21, 48]</code>. The quartiles are about Q1 = 14.75 and Q3 = 19.5, so IQR = 4.75.</p>
<ul>
<li>Lower fence: 14.75 − 1.5 × 4.75 ≈ 7.6</li>
<li>Upper fence: 19.5 + 1.5 × 4.75 ≈ 26.6</li>
</ul>
<p>48 is above the upper fence, so it is an outlier. There was probably a promotion that week: we check the reason and show it separately in the analysis.</p>
<h3>Box plot</h3>
<p>A box plot shows these five numbers in one picture: the "box" runs from Q1 to Q3, the line inside is the median, the "whiskers" reach the most extreme values within the fences, and the dots are outliers. It is very handy for comparing the distributions of several groups side by side.</p>
<div class="tip">There are several ways to compute quartiles, so Excel, Python and SQL may give slightly different numbers. That is not an error; just say which tool you used when you report the result.</div>`,
      ex: [
        { prompt: 'Write a function <code>find_outliers(data)</code>: it returns the list of outliers by Tukey\'s rule, in their original order. Use <code>statistics.quantiles(data, n=4)</code> for the quartiles.', check: { tests: 'assert find_outliers([10, 12, 11, 13, 12, 95, 11, 10, 12]) == [95], "95 should be an outlier"\nassert find_outliers([1, 2, 3, 4, 5]) == [], "This list has no outliers"\nassert find_outliers([-40, 20, 21, 22, 23, 24, 25, 90]) == [-40, 90], "Find the outliers on both sides, in their original order"' }, hints: ['<code>q1, _, q3 = statistics.quantiles(data, n=4)</code>', 'List comprehension: <code>[x for x in data if x &lt; low or x &gt; high]</code>'] },
        { prompt: 'Q1 = 40, Q3 = 60. What is the upper fence (Q3 + 1.5 × IQR)?', explain: 'IQR = 20, 60 + 1.5 × 20 = 90.' }
      ]
    },
    'st-5': {
      title: 'Z-scores and standardization',
      body: `
<p>You are 180 cm tall. Is that a lot? On a basketball team it is little, in a kindergarten it is a huge amount. What matters is not the number itself but its <b>place within its group</b>. That is exactly what a z-score measures.</p>
<p>A <b>z-score</b> shows how many standard deviations a value is from the mean:</p>
<pre><code>z = (x - mean) / sd</code></pre>
<p>z = 0 is exactly the mean, z = 2 is 2 SD above the mean, z = −1 is 1 SD below. It has no unit, so you can compare values on different scales: which is the better result, "85 points in math" or "12.4 seconds in running"?</p>
<p>Answer: if the math mean is 70 and the SD is 10, then z = (85 − 70) / 10 = 1.5. If the running mean is 13.0 s and the SD is 0.4, then z = (12.4 − 13.0) / 0.4 = −1.5. In running, less time is better, so −1.5 also means "1.5 SD better than average". Both results are equally strong.</p>
<h3>Step-by-step example</h3>
<p>Values: 53, 59, 60, 61, 67. Mean = 300 / 5 = 60. Sum of squared deviations: 49 + 1 + 0 + 1 + 49 = 100. Sample SD = √(100 / 4) = √25 = 5.</p>
<table>
<tr><th>x</th><th>x − 60</th><th>z = (x − 60) / 5</th></tr>
<tr><td>53</td><td>−7</td><td>−1.4</td></tr>
<tr><td>59</td><td>−1</td><td>−0.2</td></tr>
<tr><td>60</td><td>0</td><td>0.0</td></tr>
<tr><td>61</td><td>1</td><td>0.2</td></tr>
<tr><td>67</td><td>7</td><td>1.4</td></tr>
</table>
<p>Notice: the z-scores add up to 0, and their SD is 1. This holds for any data.</p>
<p>In Python, <code>statistics.mean</code> and <code>statistics.stdev</code> give the mean and SD. Then you apply the formula to each value with a list comprehension.</p>
<p>Turning all values into z-scores is called <b>standardization</b>. You will need it often later in ML (StandardScaler).</p>
<div class="tip">In a normal distribution |z| &gt; 3 is very rare, so it is also used to find outliers.</div>
<h3>Common mistakes</h3>
<ul>
<li>Mixing up <code>stdev</code> (sample, <code>n − 1</code>) and <code>pstdev</code> (<code>n</code>): the z-score comes out slightly different. Use the one the task asks for.</li>
<li>Forgetting the sign: z = −2 is not "bad", just "below average". Whether it is good or bad depends on the metric.</li>
<li>If all values are the same, SD = 0, and you cannot divide by zero.</li>
</ul>`,
      ex: [
        { prompt: 'Write a function <code>zscores(xs)</code>: it returns the list of z-scores of the values. Use <code>statistics.stdev</code> (sample) for the SD.', check: { tests: 'import statistics as _st\n_r = zscores([2, 4, 6])\nassert isinstance(_r, list) and len(_r) == 3, "Return a list of 3 values"\nassert all(abs(a - b) < 1e-9 for a, b in zip(_r, [-1.0, 0.0, 1.0])), "zscores([2, 4, 6]) should be [-1.0, 0.0, 1.0]"\n_r2 = zscores([10, 20, 30, 40, 100])\nassert abs(sum(_r2)) < 1e-9, "The z-scores should add up to 0"' }, hints: ['<code>m = statistics.mean(xs)</code>, <code>sd = statistics.stdev(xs)</code>', '<code>[(x - m) / sd for x in xs]</code>'] },
        { prompt: 'The exam mean is 70, SD = 8. A student scored 86. What is their z-score?', explain: '(86 − 70) / 8 = 2.' }
      ]
    },
    'st-6': {
      title: 'Correlation',
      body: `
<p>Picture two people walking side by side. If one steps ahead, does the other step ahead too? If that always happens, they "move together". Correlation measures how much two numbers move together like this.</p>
<p><b>Correlation</b> (the Pearson coefficient, r) measures the linear relationship between two variables with a number from −1 to 1.</p>
<table>
<tr><th>r</th><th>Meaning</th></tr>
<tr><td>≈ 1</td><td>strong positive relationship: when one grows, so does the other</td></tr>
<tr><td>≈ 0</td><td>no linear relationship</td></tr>
<tr><td>≈ −1</td><td>strong negative relationship</td></tr>
</table>
<pre><code>def pearson(x, y):
    mx, my = sum(x) / len(x), sum(y) / len(y)
    cov = sum((a - mx) * (b - my) for a, b in zip(x, y))
    sx = sum((a - mx) ** 2 for a in x) ** 0.5
    sy = sum((b - my) ** 2 for b in y) ** 0.5
    return cov / (sx * sy)</code></pre>
<p>The idea: in each pair we multiply the two deviations. If both are above the mean (or both below), the product is positive. If one is above and the other below, it is negative. If the sum is positive, the relationship is positive. Then we divide by <code>sx × sy</code> to bring the result into the −1…1 range.</p>
<h3>Step-by-step example</h3>
<p>Ad spend <code>x</code> and sales <code>y</code> (5 weeks): x = 1, 2, 3, 4, 5; y = 2, 4, 5, 4, 5. Means: mx = 3, my = 4.</p>
<table>
<tr><th>x</th><th>y</th><th>x − 3</th><th>y − 4</th><th>product</th></tr>
<tr><td>1</td><td>2</td><td>−2</td><td>−2</td><td>4</td></tr>
<tr><td>2</td><td>4</td><td>−1</td><td>0</td><td>0</td></tr>
<tr><td>3</td><td>5</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>4</td><td>4</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>5</td><td>5</td><td>2</td><td>1</td><td>2</td></tr>
</table>
<ol>
<li><code>cov</code> = 4 + 0 + 0 + 0 + 2 = 6.</li>
<li><code>sx</code> = √(4 + 1 + 0 + 1 + 4) = √10 ≈ 3.16.</li>
<li><code>sy</code> = √(4 + 0 + 1 + 0 + 1) = √6 ≈ 2.45.</li>
<li>r = 6 / (3.16 × 2.45) ≈ 0.77, a fairly strong positive relationship.</li>
</ol>
<p>Python 3.10+ has a ready-made function: <code>statistics.correlation(x, y)</code>. It also gives ≈ 0.77 for this example.</p>
<h3>Correlation ≠ causation</h3>
<p>Ice cream sales and drownings are correlated, but neither causes the other: both have the same cause, hot weather (a <b>confounder</b>). To prove causation you need an experiment (an A/B test), which you will cover in Phase 4.</p>
<div class="tip"><b>Common mistakes:</b> (1) Reading r as a cause (the ice cream example above). (2) Thinking "there is no relationship at all" when r ≈ 0. r only sees <b>straight-line</b> relationships: if x = −2, −1, 0, 1, 2 and y = x², then y depends fully on x, yet r = 0. (3) Not checking for outliers: a single outlier can change r a lot. So draw a scatter plot first.</div>`,
      ex: [
        { prompt: 'Write a function <code>pearson(x, y)</code>. Do not use <code>statistics.correlation</code>.', check: { tests: 'import statistics as _st\nassert abs(pearson([1, 2, 3], [2, 4, 6]) - 1) < 1e-9, "Perfect positive relationship: r = 1"\nassert abs(pearson([1, 2, 3], [6, 4, 2]) + 1) < 1e-9, "Perfect negative relationship: r = -1"\n_x, _y = [10, 20, 30, 40, 50], [12, 25, 29, 48, 51]\nassert abs(pearson(_x, _y) - _st.correlation(_x, _y)) < 1e-9, "r is wrong on real data"' }, hints: ['The formula from the lesson: covariance / (sx × sy).'] },
        { prompt: 'Across city districts, the number of cafés and apartment prices have r = 0.8. Which conclusion is right?', options: ['Open a café and apartments get more expensive', 'The two grow together, but the cause may be another factor (for example, closeness to the center)', 'There is no relationship', 'When apartments get more expensive, cafés close'], explain: 'Correlation shows a relationship, not a cause. A shared cause (confounder) is common.' }
      ]
    },
    'st-7': {
      title: 'The normal distribution and the 68–95–99.7 rule',
      body: `
<p>The <b>normal distribution</b> is a symmetric, "bell"-shaped distribution. Height, measurement errors and the sum of many random factors look like this.</p>
<p>Its most useful property is the <b>68–95–99.7 rule</b>:</p>
<ul>
<li>≈68% of values lie within ±1 SD of the mean,</li>
<li>≈95% lie within ±2 SD,</li>
<li>≈99.7% lie within ±3 SD.</li>
</ul>
<p>Example: the mean IQ is 100, SD = 15. About 95% of people have an IQ between 70 and 130.</p>
<p>Why is height normally distributed? Hundreds of small factors affect it: genes, food, sleep, sport. Each one adds a little or takes away a little. When many random "plus-minus" effects add up, most values gather in the middle and the edges are rare. Salaries and purchase amounts, on the other hand, are bounded by 0 from below and stretch without limit upward, so they are not symmetric.</p>
<h3>Step-by-step example</h3>
<p>Women's height: mean 165 cm, SD = 6 cm. We compute the intervals:</p>
<table>
<tr><th>Interval</th><th>Calculation</th><th>Bounds</th><th>Inside</th></tr>
<tr><td>±1 SD</td><td>165 ± 6</td><td>159–171 cm</td><td>≈68%</td></tr>
<tr><td>±2 SD</td><td>165 ± 12</td><td>153–177 cm</td><td>≈95%</td></tr>
<tr><td>±3 SD</td><td>165 ± 18</td><td>147–183 cm</td><td>≈99.7%</td></tr>
</table>
<p>Now the question "what percentage are taller than 177 cm?" 177 = mean + 2 SD. Inside the interval is 95%, outside is 100 − 95 = 5%. The distribution is symmetric, so this 5% splits equally between the two "tails": 2.5% below (shorter than 153) and 2.5% above (taller than 177).</p>
<p>In the same way, taller than 171 cm is (100 − 68) / 2 = 16%. This ties in with z-scores: above z = 1 lies ≈16%, above z = 2 lies ≈2.5%.</p>
<div class="tip">Not all data is normal. Salaries, income and time on site are usually right-skewed. Do not apply this rule without looking at the histogram.</div>
<h3>Common mistakes</h3>
<ul>
<li>Answering a one-sided question without splitting the outside percentage: "above 2 SD" is not 5% but 2.5%.</li>
<li>Applying the rule to skewed data (salaries, orders per day where most days are 0).</li>
<li>Thinking 68/95/99.7 are exact. They are approximations (more precisely 68.3%, 95.4%, 99.7%).</li>
</ul>`,
      ex: [
        { prompt: 'Delivery time is normally distributed: mean 40 min, SD 5 min. About what percentage of orders are delivered within 35–45 min?', unit: '%', explain: '35–45 = mean ± 1 SD, so ≈68%.' },
        { prompt: 'In the same data (mean 40, SD 5), about what percentage of orders take longer than 50 minutes?', unit: '%', explain: '30–50 = ± 2 SD, with 95% inside. Outside is 5%, split equally between the two sides: 2.5%.' },
        { prompt: 'Which data is most likely to be normally distributed?', options: ['Employee salaries', 'Height of adult women', 'Purchase amounts of site visitors', 'Number of orders per day (mostly 0)'], explain: 'Height is the sum of many factors and is symmetric. The others are right-skewed.' }
      ]
    },
    'st-8': {
      title: 'Samples, bias and Simpson\'s paradox',
      body: `
<p>We rarely see the whole <b>population</b>. Most of the time we work with a <b>sample</b>, so the sample has to resemble the population.</p>
<h3>Common types of bias</h3>
<ul>
<li><b>Selection bias</b>: the sample is not random. For example, sending a survey only to your Instagram followers.</li>
<li><b>Survivorship bias</b>: seeing only the "survivors". There is no data on startups that closed, so the shared traits of successful startups are misleading.</li>
<li><b>Non-response bias</b>: only very satisfied or very unhappy people answer the survey.</li>
</ul>
<h3>Simpson's paradox</h3>
<p>Within groups you may see one direction, and in the combined data the opposite.</p>
<table>
<tr><th></th><th>Treatment A</th><th>Treatment B</th></tr>
<tr><td>Mild cases</td><td>81/87 = 93%</td><td>234/270 = 87%</td></tr>
<tr><td>Severe cases</td><td>192/263 = 73%</td><td>55/80 = 69%</td></tr>
<tr><td><b>Total</b></td><td><b>273/350 = 78%</b></td><td><b>289/350 = 83%</b></td></tr>
</table>
<p>In each group A is better, but overall B looks better. The reason is that A was given to severe cases more often. The lesson: check the make-up of the groups before comparing.</p>
<h3>What makes a good sample</h3>
<ul>
<li><b>Random</b>: every member of the population has the same chance of being picked.</li>
<li><b>Large enough</b>: the opinion of 10 people depends too much on chance.</li>
<li><b>Representative</b>: important groups (city, age, device) appear in the same share as in the population.</li>
</ul>
<h3>How do you reduce bias?</h3>
<p>Send the survey through several channels, not just one. Record the share of people who did not answer and compare their known characteristics (city, sign-up date) with those who did. And to test cause and effect, the most reliable method is a randomized experiment (an A/B test). We cover it in full in a later module.</p>
<div class="tip">Always ask how the data was collected: "who did not make it into this table?" This question prevents many mistakes.</div>`,
      ex: [
        { prompt: 'You analyzed reviews of a banking app using only the 5-star reviews in the App Store. What kind of bias is this?', options: ['Survivorship bias', 'Selection bias', 'Confounder', 'No bias'], explain: 'The sample was deliberately taken from one group, so it does not represent all users.' },
        { prompt: 'In World War II it was proposed to reinforce the places where returning planes had bullet holes. Why is this wrong?', options: ['The places hit by bullets do not matter', 'This is survivorship bias: the planes that were shot down were hit in other places', 'There were too few planes', 'Correlation is not causation'], explain: 'The planes that returned are the "survivors". There is no data on the ones that went down, and those are exactly the weak spots.' },
        { prompt: 'Why does B look better overall in the Simpson\'s paradox table?', options: ['B really is better', 'B was given to mild cases more often, and recovery is higher in mild cases', 'There is an error in the table', 'A is more expensive'], explain: 'The groups have a different make-up: 270 of B\'s 350 patients are in the mild group.' }
      ]
    },
    'st-9': {
      title: 'Descriptive statistics in SQL',
      body: `
<p>Often it is more convenient to compute statistics inside the database, without loading the data into Python.</p>
<pre><code>SELECT department,
  COUNT(*) AS n, AVG(salary) AS avg_salary,
  MIN(salary) AS min_salary, MAX(salary) AS max_salary
FROM employees
GROUP BY department;</code></pre>
<h3>Variance in SQL</h3>
<p>SQLite has no <code>STDDEV</code>, but you can compute the population variance with a formula: <code>AVG(x*x) - AVG(x)*AVG(x)</code>.</p>
<h3>Median in SQL</h3>
<p>For the median you have to sort the values and take the middle one. PostgreSQL has <code>PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary)</code>. In SQLite we take the middle rows with <code>ORDER BY ... LIMIT ... OFFSET</code>.</p>
<h3>Median in SQLite</h3>
<p>If the number of values is even, we take the mean of the two middle values. With 12 values you need positions 6 and 7 of the sorted list: <code>LIMIT 2 OFFSET 5</code>.</p>

<p><code>OFFSET 5</code> skips the first 5 rows and <code>LIMIT 2</code> takes the next two. Put these two rows in a subquery and compute their mean in the outer query, and you get the median.</p>
<h3>Standard deviation</h3>
<p>Variance is measured in squared units (tenge²), so it is hard to interpret. The standard deviation is the square root of the variance and is in the original unit (tenge). Some versions of SQLite have no <code>SQRT</code>, so we take the square root in Python or after getting the result.</p>
<div class="tip">The population variance divides by <code>n</code>, the sample variance by <code>n − 1</code>. With a small sample the difference is noticeable.</div>`,
      ex: [
        { prompt: 'For each department, return <code>department</code>, <code>n</code> (the count), <code>avg_salary</code>, <code>min_salary</code>, <code>max_salary</code>.', hints: ['The example from the lesson.'] },
        { prompt: 'Return the <b>median</b> salary of all employees as a single value (12 employees: the mean of the 6th and 7th values of the sorted list).', hints: ['<code>ORDER BY salary LIMIT 2 OFFSET 5</code> gives rows 6 and 7.'] },
        { prompt: 'Return the population variance of salaries for each department: <code>department</code>, <code>var</code> (<code>AVG(salary*salary) - AVG(salary)*AVG(salary)</code>).', hints: ['The formula is in the lesson; add <code>GROUP BY department</code>.'] }
      ]
    },
    'st-gate': {
      title: 'Module exam: Descriptive Statistics',
      body: `
<p>The final check. In the Python tasks only the standard library (<code>statistics</code>, <code>math</code>) is available.</p>`,
      ex: [
        { prompt: 'Write a function <code>describe(xs)</code>. It returns a dictionary with the keys <code>mean</code>, <code>median</code>, <code>std</code> (sample), <code>min</code>, <code>max</code>, <code>iqr</code>. For the IQR use <code>statistics.quantiles(xs, n=4)</code>.', check: { tests: 'import statistics as _st\n_xs = [12, 15, 11, 20, 18, 14, 13, 40]\n_d = describe(_xs)\nassert isinstance(_d, dict), "Return a dictionary"\nfor _k in ("mean", "median", "std", "min", "max", "iqr"):\n    assert _k in _d, f"The key {_k} is missing"\n_q = _st.quantiles(_xs, n=4)\n_exp = {"mean": _st.mean(_xs), "median": _st.median(_xs), "std": _st.stdev(_xs), "min": 11, "max": 40, "iqr": _q[2] - _q[0]}\nfor _k, _v in _exp.items():\n    assert abs(_d[_k] - _v) < 1e-9, f"{_k} is wrong: expected {_v:.4f}"' }, hints: [] },
        { prompt: 'Collect the values of <code>sales</code> whose z-score has an absolute value greater than 2 into the list <code>unusual</code>, in their original order (SD: <code>statistics.stdev</code>). Then print it.', check: { tests: 'assert unusual == [160], "unusual should be [160]"' }, hints: [] },
        { prompt: 'Customers\' monthly spending is strongly right-skewed. What should a report show to describe the "typical customer"?', options: ['The mean and SD', 'The median and IQR', 'Only the maximum', 'Only the mode'], explain: 'In skewed data the median and IQR are robust to outliers.' },
        { prompt: 'Values: 1, 2, 3, 4, 5. What is the sample variance (n − 1)?', explain: 'The mean is 3. Squares: 4, 1, 0, 1, 4 = 10. 10 / 4 = 2.5.' }
      ]
    }
  }
});
