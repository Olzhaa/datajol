// M4.2 Inference & A/B Testing: English text. Code, solutions and expected output are in content/inference.js.
DJ.i18n.patch({
  modules: {
    'm4-2': { intro: 'Inference means drawing reliable conclusions about a whole population from a small sample. By the end of the module you will be able to plan an A/B test, analyse it and write up the result as a decision the business can understand.' }
  },
  lessons: {
    'ab-1': {
      title: 'Sampling distribution and the CLT',
      body: `
<p>You want to know the average order value of all customers, but you only have data on 30 of them. The mean of those 30 people is a <b>statistic</b>, while the true mean of all customers is a <b>parameter</b>. Take 30 other customers and the mean comes out a little different. The sample mean is itself a random variable.</p>
<h3>Sampling distribution</h3>
<p>A thought experiment: we draw a sample of 30 people from the population a thousand times and write down the mean each time. The distribution of those thousand means is called the <b>sampling distribution</b>. All of inference rests on this distribution.</p>
<h3>The Central Limit Theorem (CLT)</h3>
<p><b>Central Limit Theorem</b>: whatever the shape of the population (even strongly right-skewed), when the sample is large enough (usually n ≥ 30), sample means are approximately <b>normally</b> distributed. Their:</p>
<ul>
<li>mean equals the population mean (μ);</li>
<li>standard deviation is σ / √n — in the next lesson we will call it the <b>standard error</b>.</li>
</ul>
<h3>Step-by-step example: a simulation</h3>
<p>Order value is right-skewed: most orders are small, some are very large. We model it with <code>random.expovariate</code> (mean 50 thousand ₸).</p>
<pre><code>import random, statistics
random.seed(1)
means = []
for _ in range(1000):
    sample = [random.expovariate(1 / 50) for _ in range(30)]
    means.append(statistics.mean(sample))
print(statistics.mean(means))    # ≈ 50
print(statistics.stdev(means))   # ≈ 50 / √30 ≈ 9.1</code></pre>
<ol>
<li>One sample: 30 random orders. Its histogram is skewed.</li>
<li>We compute its mean and add it to the list. We repeat this 1000 times.</li>
<li>If you plot a histogram of the 1000 means, it is bell-shaped and symmetric. That is the CLT.</li>
<li>The SD of the means is √30 times smaller than the SD of individual orders (≈50).</li>
</ol>
<div class="tip">The CLT does not make the data itself normal. It only talks about the distribution of <b>means</b>.</div>
<h3>Common mistakes</h3>
<ul>
<li>Thinking "with n = 30 the data itself is normal". No, only the mean is.</li>
<li>Believing n = 30 is enough for very skewed data (for example, 99% of revenue values are 0). Such data needs a much larger n.</li>
</ul>`,
      ex: [
        { prompt: 'Repeat the simulation from the lesson: <code>random.seed(1)</code>, 1000 samples of 30 values each (<code>random.expovariate(1 / 50)</code>), and collect the mean of each sample in the list <code>sample_means</code>. Then print the mean and SD of those means.', hints: ['An outer loop of 1000 iterations, inside it <code>[random.expovariate(1 / 50) for _ in range(30)]</code>.', '<code>sample_means.append(statistics.mean(sample))</code>'], check: { tests: 'import statistics as _st\nassert len(sample_means) == 1000, "sample_means should contain 1000 means"\n_m = _st.mean(sample_means)\nassert abs(_m - 50) < 3, f"The mean of the means should be ≈ 50, you have {_m:.2f}"\n_s = _st.stdev(sample_means)\nassert abs(_s - 50 / 30 ** 0.5) < 1.5, f"The SD of the means should be ≈ 9.1 (50 / √30), you have {_s:.2f}. Does each sample have 30 values?"' } },
        { prompt: 'Order amounts are strongly right-skewed. If we take the <b>means</b> of many samples of 100 orders each, how will they be distributed?', options: ['Just as right-skewed', 'Approximately normal (CLT)', 'Uniform', 'Left-skewed'], explain: 'CLT: for large n, sample means are approximately normal regardless of the population shape.' }
      ]
    },
    'ab-2': {
      title: 'Standard error',
      body: `
<p>In the last lesson we saw that the SD of sample means is σ / √n. This number has its own name: the <b>standard error</b> (SE). SD measures the spread of the data, while SE measures the spread of an <b>estimate</b> (for example, the mean): "if I took another sample, how much would the mean change?"</p>
<h3>Formulas</h3>
<table>
<tr><th>Estimate</th><th>SE</th></tr>
<tr><td>Mean</td><td>s / √n (s is the sample SD)</td></tr>
<tr><td>Proportion (conversion)</td><td>√(p(1 − p) / n)</td></tr>
</table>
<p>A proportion is a special case of a mean: each user is 1 (bought) or 0 (did not buy). Recall the Bernoulli distribution from M4.1: its variance is p(1 − p).</p>
<h3>Step-by-step example</h3>
<p>400 people visited the site, 48 of them bought.</p>
<ol>
<li>Conversion: p = 48 / 400 = 0.12.</li>
<li>Variance: p(1 − p) = 0.12 × 0.88 = 0.1056.</li>
<li>Divide by n: 0.1056 / 400 = 0.000264.</li>
<li>Square root: SE = √0.000264 ≈ 0.0162, i.e. ≈ 1.6 percentage points.</li>
</ol>
<p>Meaning: if we took the same kind of 400-person sample again and again, the conversion would usually vary within about 12% ± 1.6 pp.</p>
<pre><code>import math, statistics

def se_mean(xs):
    return statistics.stdev(xs) / math.sqrt(len(xs))

def se_prop(p, n):
    return math.sqrt(p * (1 - p) / n)

se_prop(0.12, 400)   # 0.01624...</code></pre>
<h3>The √n law</h3>
<p>SE is inversely proportional to √n. To double the precision (halve the SE) you need a sample <b>four</b> times larger. That is why A/B tests sometimes run for weeks: you need many users to see a small difference. For example, at the same 12% conversion with n = 1 600 (four times more), SE shrinks to ≈ 1.6 / 2 ≈ 0.8 pp.</p>
<div class="tip">SD is "how different customers are from each other", SE is "how precise my mean is". As n grows, SD does not change, but SE gets smaller.</div>
<h3>Common mistakes</h3>
<ul>
<li>Reporting the SD instead of the SE (or the other way round).</li>
<li>Plugging in the proportion as a percentage (12) and computing √(12 × 88 / 400). The formula needs a share (0.12).</li>
</ul>`,
      ex: [
        { prompt: 'Write two functions: <code>se_mean(xs)</code> (sample SD / √n) and <code>se_prop(p, n)</code> (√(p(1 − p) / n)).', hints: ['<code>statistics.stdev(xs) / math.sqrt(len(xs))</code>', 'p is a share (0.12), not a percentage.'], check: { tests: 'assert se_mean([2, 4, 6, 8]) is not None, "se_mean should return a value"\nassert abs(se_mean([2, 4, 6, 8]) - 1.2909944) < 1e-6, "se_mean([2, 4, 6, 8]) should be ≈ 1.2910: stdev = 2.582, √4 = 2"\nassert se_prop(0.12, 400) is not None, "se_prop should return a value"\nassert abs(se_prop(0.12, 400) - 0.0162481) < 1e-6, "se_prop(0.12, 400) should be ≈ 0.01625"\nassert abs(se_prop(0.5, 100) - 0.05) < 1e-9, "se_prop(0.5, 100) should be 0.05"' } },
        { prompt: 'Conversion is 20%, n = 1 600. How many percentage points is the standard error of the conversion? (to two decimal places)', unit: 'pp', explain: '√(0.2 × 0.8 / 1600) = √0.0001 = 0.01, i.e. 1.00 pp.' }
      ]
    },
    'ab-3': {
      title: 'Confidence interval',
      body: `
<p>A single number such as "conversion is 12%" (a point estimate) says nothing about how precise it is. A <b>confidence interval</b> (CI) adds a "margin of error" around the estimate: <b>estimate ± z × SE</b>.</p>
<h3>Where z comes from</h3>
<p>By the CLT, the estimate is approximately normally distributed. For a 95% interval we need the boundary that cuts out the middle 95% of the standard normal distribution: 2.5% in each of the two tails. <code>NormalDist().inv_cdf</code> gives it (the inverse of the cdf: probability → z).</p>
<pre><code>from statistics import NormalDist
NormalDist().inv_cdf(0.975)   # 1.95996...  (95% CI)
NormalDist().inv_cdf(0.95)    # 1.6449      (90% CI)
NormalDist().inv_cdf(0.995)   # 2.5758      (99% CI)</code></pre>
<p>In general, for a level <code>level</code>: <code>z = NormalDist().inv_cdf(1 - (1 - level) / 2)</code>.</p>
<h3>Step-by-step example: a proportion</h3>
<p>48 of 400 visitors bought. What is the 95% CI?</p>
<ol>
<li>p = 48 / 400 = 0.12.</li>
<li>SE = √(0.12 × 0.88 / 400) ≈ 0.01625.</li>
<li>z = 1.96. Margin of error: 1.96 × 0.01625 ≈ 0.0318.</li>
<li>CI = 0.12 ± 0.0318 = [0.088; 0.152], i.e. from 8.8% to 15.2%.</li>
</ol>
<h3>For a mean</h3>
<pre><code>m = statistics.mean(xs)
se = statistics.stdev(xs) / math.sqrt(len(xs))
low, high = m - z * se, m + z * se</code></pre>
<p>For a small sample (n &lt; 30) it is more correct to use a t-distribution value instead of z. For large n the two are practically the same; since we work with the standard library, we use z.</p>
<h3>Correct interpretation</h3>
<p>"95% CI" is a statement about the <b>method</b>: 95% of intervals built this way contain the true parameter. A specific interval either contains it or does not. In practice it is enough to say "we are confident the true conversion is roughly between 8.8% and 15.2%".</p>
<div class="tip">The width of the interval is inversely proportional to √n. To make it twice as narrow, you need four times more data.</div>
<h3>Common mistakes</h3>
<ul>
<li>Using <code>inv_cdf(0.95)</code> for a 95% CI. That gives a 90% interval: there are two tails.</li>
<li>Saying "95% of the data is in this interval". A CI is about the mean, not individual values.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>ci_prop(x, n, level=0.95)</code>: <code>x</code> is the number of buyers, <code>n</code> is the total. It should return the tuple <code>(low, high)</code>. Compute z from <code>level</code> with <code>NormalDist().inv_cdf</code>.', hints: ['<code>z = NormalDist().inv_cdf(1 - (1 - level) / 2)</code>', 'SE = <code>math.sqrt(p * (1 - p) / n)</code>'], check: { tests: '_r = ci_prop(48, 400)\nassert _r is not None and len(_r) == 2, "Return the tuple (low, high)"\nassert abs(_r[0] - 0.08815) < 1e-4 and abs(_r[1] - 0.15185) < 1e-4, f"ci_prop(48, 400) should be ≈ (0.0882, 0.1518), you have {_r}"\n_r9 = ci_prop(48, 400, 0.90)\nassert abs(_r9[1] - _r9[0] - 2 * 1.644854 * 0.0162481) < 1e-4, "For level=0.90, z should be ≈ 1.645: inv_cdf(1 - (1 - level) / 2)"' } },
        { prompt: 'Write the function <code>ci_mean(xs, level=0.95)</code>: mean ± z × (stdev / √n), returning <code>(low, high)</code>.', hints: ['Like the previous exercise, only SE = <code>statistics.stdev(xs) / math.sqrt(len(xs))</code>.'], check: { tests: 'import statistics as _st, math as _m\n_xs = [12, 15, 11, 20, 18, 14, 13, 17, 16, 19, 10, 15]\n_r = ci_mean(_xs)\nassert _r is not None and len(_r) == 2, "Return the tuple (low, high)"\n_se = _st.stdev(_xs) / _m.sqrt(len(_xs))\n_mu = _st.mean(_xs)\nassert abs(_r[0] - (_mu - 1.959964 * _se)) < 1e-4 and abs(_r[1] - (_mu + 1.959964 * _se)) < 1e-4, f"The 95% CI should be ≈ ({_mu - 1.96 * _se:.3f}, {_mu + 1.96 * _se:.3f}), you have {_r}"\n_r99 = ci_mean(_xs, 0.99)\nassert _r99[1] - _r99[0] > _r[1] - _r[0], "A 99% interval should be wider than a 95% one: use the level parameter"' } },
        { prompt: 'The 95% CI of the average order value is [4 200; 4 800] ₸. Which statement is correct?', options: ['95% of customers spend between 4 200 and 4 800 ₸', '95% of intervals built with this method contain the true mean', 'The true mean is exactly 4 500 ₸', 'The next customer\'s order will fall in this range with 95% probability'], explain: 'A CI describes the reliability of the method for estimating the mean. It says nothing about individual customers\' values.' }
      ]
    },
    'ab-4': {
      title: 'The logic of hypothesis testing',
      body: `
<p>Did the new "Buy" button raise conversion, or is the difference random? Hypothesis testing is the standard way to answer this question. It is like a court: we start from "innocent" and only give a verdict if the evidence is strong enough.</p>
<h3>Steps</h3>
<ol>
<li><b>H0</b> (null hypothesis): there is no difference, for example p_B = p_A.</li>
<li><b>H1</b> (alternative hypothesis): there is a difference, p_B ≠ p_A (two-sided).</li>
<li><b>α</b> (significance level) is chosen before looking at the data, usually 0.05.</li>
<li><b>Test statistic</b>: how many SEs the observed difference is from what H0 expects. For example, z = (estimate − H0 value) / SE.</li>
<li><b>p-value</b>: the probability of getting a result this extreme or more extreme if H0 is true.</li>
<li>If p &lt; α, we <b>reject</b> H0. Otherwise we say "there is not enough evidence to reject H0".</li>
</ol>
<h3>Step-by-step example</h3>
<p>The test statistic is z = 2.1, α = 0.05, the test is two-sided.</p>
<ol>
<li>One tail: P(Z &gt; 2.1) = 1 − cdf(2.1) ≈ 0.0179.</li>
<li>The test is two-sided, so we add both tails: p ≈ 2 × 0.0179 = 0.0357.</li>
<li>0.0357 &lt; 0.05, so we reject H0: the difference is statistically significant.</li>
</ol>
<pre><code>from statistics import NormalDist
def p_two_sided(z):
    return 2 * (1 - NormalDist().cdf(abs(z)))
p_two_sided(2.1)   # 0.0357</code></pre>
<h3>Two kinds of error</h3>
<table>
<tr><th></th><th>H0 actually true</th><th>H0 actually false</th></tr>
<tr><td>Rejected H0</td><td><b>Type I</b> (false positive), probability α</td><td>Correct decision (power)</td></tr>
<tr><td>Did not reject</td><td>Correct decision</td><td><b>Type II</b> (false negative), probability β</td></tr>
</table>
<p>Type I: declaring a change that does not work a "winner". Type II: missing a real improvement. Power = 1 − β.</p>
<div class="tip">The p-value is <b>not</b> "the probability that H0 is true". It is the probability of the data assuming H0 is true.</div>
<h3>Common mistakes</h3>
<ul>
<li>Saying "it is proven there is no effect" when p = 0.2. Correct: there is not enough evidence.</li>
<li>Choosing α after seeing the result ("0.05 didn't work, let's take 0.1").</li>
<li>Forgetting to double the tail in a two-sided test.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>p_two_sided(z)</code>: it should return the two-sided p-value under the standard normal distribution. It must also work correctly for negative z.', hints: ['One tail: <code>1 - NormalDist().cdf(abs(z))</code>.', 'Multiply by two.'], check: { tests: 'assert p_two_sided(2.1) is not None, "Return a value"\nassert abs(p_two_sided(2.1) - 0.035729) < 1e-5, "p_two_sided(2.1) should be ≈ 0.0357: add both tails"\nassert abs(p_two_sided(-2.1) - 0.035729) < 1e-5, "For negative z, p should also be ≈ 0.0357: use abs(z)"\nassert abs(p_two_sided(0) - 1) < 1e-9, "If z = 0, p = 1"' } },
        { prompt: 'The test statistic is z = 1.5 and the test is two-sided. What is the p-value? (to three decimal places)', explain: '2 × (1 − cdf(1.5)) = 2 × 0.0668 ≈ 0.134. This is greater than 0.05, so H0 is not rejected.' },
        { prompt: 'The new design actually has no effect on conversion, but the test showed p = 0.03 and you declared it the "winner". What kind of error is this?', options: ['Type II error', 'Type I error (false positive)', 'No error, p &lt; 0.05', 'Power is too high'], explain: 'Rejecting H0 when it is actually true is a Type I error. At α = 0.05 it happens in about 5% of tests.' }
      ]
    },
    'ab-5': {
      title: 'Two-proportion z-test: the core of an A/B test',
      body: `
<p>A classic A/B test: users are randomly split into two groups. A is the old version (control), B is the new version (treatment). The metric is conversion, i.e. a proportion. The question: can the difference between p_B and p_A be explained by chance?</p>
<h3>Formula</h3>
<ul>
<li>Conversions: p_A = x_A / n_A, p_B = x_B / n_B.</li>
<li>Under H0 both groups have the same conversion, so we estimate it from the combined data (<b>pooled</b>): p = (x_A + x_B) / (n_A + n_B).</li>
<li>SE = √(p(1 − p) × (1/n_A + 1/n_B)).</li>
<li>z = (p_B − p_A) / SE, p-value = 2 × (1 − cdf(|z|)).</li>
</ul>
<h3>Step-by-step example</h3>
<p>A: 2 000 people, 200 bought. B: 2 000 people, 250 bought.</p>
<ol>
<li>p_A = 0.10, p_B = 0.125. Difference: 2.5 pp.</li>
<li>Pooled: p = 450 / 4 000 = 0.1125.</li>
<li>SE = √(0.1125 × 0.8875 × (1/2000 + 1/2000)) = √(0.09984 × 0.001) ≈ 0.00999.</li>
<li>z = 0.025 / 0.00999 ≈ 2.50.</li>
<li>p = 2 × (1 − cdf(2.50)) ≈ 0.0124 &lt; 0.05. H0 is rejected.</li>
</ol>
<pre><code>import math
from statistics import NormalDist

def two_prop_z(x_a, n_a, x_b, n_b):
    p_a, p_b = x_a / n_a, x_b / n_b
    p = (x_a + x_b) / (n_a + n_b)
    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))
    z = (p_b - p_a) / se
    return z, 2 * (1 - NormalDist().cdf(abs(z)))

two_prop_z(200, 2000, 250, 2000)   # (2.50, 0.0124)</code></pre>
<h3>When it is valid</h3>
<p>The test relies on the CLT, so each group needs enough buyers and enough non-buyers (usually at least 10 of each). Users must be independent of each other: one person does not end up in both groups.</p>
<div class="tip">If z is positive, B is better; if negative, A is better. The p-value does not tell you the direction, so always look at the sign of the difference.</div>
<h3>Common mistakes</h3>
<ul>
<li>Counting <b>sessions</b> or impressions instead of users, artificially inflating n. One person's sessions are not independent.</li>
<li>Using each group's own p instead of the pooled SE and mixing up the formulas. Use the pooled SE for the test, and the unpooled SE for the interval of the difference (lesson 10).</li>
<li>Deciding "B is worse" when p = 0.06. It only means the evidence is insufficient.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>two_prop_z(x_a, n_a, x_b, n_b)</code>: it should return <code>(z, p)</code> using the pooled SE, where z = (p_B − p_A) / SE and p is the two-sided p-value.', hints: ['Pooled: <code>p = (x_a + x_b) / (n_a + n_b)</code>.', '<code>se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))</code>', 'p-value: <code>2 * (1 - NormalDist().cdf(abs(z)))</code>'], check: { tests: '_r = two_prop_z(200, 2000, 250, 2000)\nassert _r is not None and len(_r) == 2, "Return the tuple (z, p)"\nassert abs(_r[0] - 2.50196) < 1e-3, f"z should be ≈ 2.502, you have {_r[0]:.4f}. Pooled p = (x_a + x_b) / (n_a + n_b)"\nassert abs(_r[1] - 0.01235) < 1e-4, f"p should be ≈ 0.0124, you have {_r[1]:.4f}. Two-sided: 2 * (1 - cdf(|z|))"\n_r2 = two_prop_z(250, 2000, 200, 2000)\nassert _r2[0] < 0 and abs(_r2[1] - _r[1]) < 1e-9, "If A is better, z is negative and p stays the same: z = (p_b - p_a) / se"\n_r3 = two_prop_z(480, 10000, 540, 12000)\nassert abs(_r3[0] - (-1.05371)) < 1e-3, "It should also work when the group sizes differ: (1 / n_a + 1 / n_b)"' } },
        { prompt: 'A: 10 000 users, 480 bought. B: 10 000 users, 540 bought. What is the two-sided p-value of the two-proportion z-test? (to three decimal places)', explain: 'p_A = 4.8%, p_B = 5.4%, pooled 5.1%, SE ≈ 0.00311, z ≈ 1.93, p ≈ 0.054. Slightly above 0.05: not significant at α = 0.05.' }
      ]
    },
    'ab-6': {
      title: 'Comparing means: Welch\'s t-test',
      body: `
<p>The metric is not always conversion. Often we compare <b>means</b>: revenue per user (ARPU), time on site, order value. Here a two-sample t-test is used. Its safest variant is <b>Welch's t-test</b>: it does not assume the groups have equal variances.</p>
<h3>Formula</h3>
<p>t = (m_B − m_A) / √(s_A² / n_A + s_B² / n_B)</p>
<p>Here m is the mean, s² is the sample variance (<code>statistics.variance</code>), n is the group size. The square root in the denominator is the standard error of the difference: we add each group's SE².</p>
<h3>About the p-value</h3>
<p>The exact p-value comes from the t-distribution, which has degrees of freedom (the Welch–Satterthwaite formula). The standard library has no t-distribution. But when n is large (hundreds of people per group, and A/B tests usually have thousands), the t-distribution is very close to the normal. So we use the <b>normal approximation</b>: p = 2 × (1 − cdf(|t|)). In small groups (n &lt; 30) it slightly understates the p-value; in that case use <code>scipy.stats.ttest_ind(a, b, equal_var=False)</code>.</p>
<h3>Step-by-step example</h3>
<p>Time on site (min): A = [5, 7, 6, 8, 4], B = [9, 7, 8, 10, 6].</p>
<ol>
<li>m_A = 6, m_B = 8. Difference: 2 min.</li>
<li>s_A² = 2.5, s_B² = 2.5 (<code>statistics.variance</code>).</li>
<li>SE = √(2.5/5 + 2.5/5) = √1 = 1.</li>
<li>t = 2 / 1 = 2.0.</li>
<li>Normal approximation: p ≈ 0.046. But n = 5 is very small; the exact t-test gives p ≈ 0.08. Do not trust the approximation on a small sample.</li>
</ol>
<pre><code>import math, statistics
from statistics import NormalDist

def welch_t(a, b):
    se = math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))
    t = (statistics.mean(b) - statistics.mean(a)) / se
    p = 2 * (1 - NormalDist().cdf(abs(t)))   # approximation for large n
    return t, p</code></pre>
<div class="tip">Revenue metrics are strongly right-skewed: most values are 0, a few are very large. The CLT works for means, but on such data n must be large, and a single "whale" customer can distort the result. Check for outliers in advance.</div>
<h3>Common mistakes</h3>
<ul>
<li>Using <code>pvariance</code> (dividing by n). You need the sample variance.</li>
<li>Adding the SEs in the denominator without squaring them: √(SE_A² + SE_B²), not SE_A + SE_B.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>welch_t(a, b)</code>: it should return Welch\'s t statistic (B minus A) and the two-sided p-value from the normal approximation: <code>(t, p)</code>.', hints: ['SE = <code>math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))</code>', 't = (mean(b) − mean(a)) / SE, p as in lesson 4.'], check: { tests: '_r = welch_t([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])\nassert _r is not None and len(_r) == 2, "Return the tuple (t, p)"\nassert abs(_r[0] - 2.0) < 1e-9, f"t should be 2.0, you have {_r[0]}"\nassert abs(_r[1] - 0.0455) < 1e-3, f"p should be ≈ 0.0455, you have {_r[1]:.4f}"\n_a = [10, 12, 9, 11, 13, 10, 12, 11]\n_b = [14, 30, 8, 22, 15, 9, 25, 12, 18, 20]\n_t, _p = welch_t(_a, _b)\nassert abs(_t - 2.75865) < 1e-3, f"For groups with different variances t should be ≈ 2.759, you have {_t:.4f}. Use statistics.variance (n − 1)"' } },
        { prompt: 'Why can the p-value of Welch\'s t-test be approximated with the normal distribution?', options: ['The t-distribution and the normal distribution are always the same', 'For large n the t-distribution is very close to the normal', 'Welch\'s test ignores variance', 'The p-value does not depend on n'], explain: 'As the degrees of freedom grow, the t-distribution approaches the normal. With hundreds of observations per group the difference is negligible.' }
      ]
    },
    'ab-7': {
      title: 'Power and sample size',
      body: `
<p>Before starting a test you should ask "how many users do we need?" Too few, and we miss a real improvement (a Type II error). Too many, and we waste time and traffic.</p>
<h3>Four inputs</h3>
<ul>
<li><b>Baseline</b> p₁ — the current conversion, for example 10%.</li>
<li><b>MDE</b> (minimum detectable effect) — the smallest difference we want to detect. It can be absolute (10% → 12%, i.e. +2 pp) or relative (+20%); we use absolute.</li>
<li><b>α</b> — the Type I error level, 0.05.</li>
<li><b>Power</b> = 1 − β — the probability of detecting a real effect, usually 0.8.</li>
</ul>
<h3>Formula (per group)</h3>
<p>n = (z_{1−α/2} + z_{power})² × (p₁(1 − p₁) + p₂(1 − p₂)) / MDE², where p₂ = p₁ + MDE. We round the result up to an integer (<code>math.ceil</code>). This is a widely used approximation; online calculators may give a slightly different number.</p>
<h3>Step-by-step example</h3>
<p>Baseline 10%, MDE = 2 pp, α = 0.05, power = 0.8.</p>
<ol>
<li>z_{1−α/2} = inv_cdf(0.975) ≈ 1.960, z_{power} = inv_cdf(0.8) ≈ 0.842. Square of the sum: 2.802² ≈ 7.849.</li>
<li>p₂ = 0.12. Variances: 0.1 × 0.9 + 0.12 × 0.88 = 0.09 + 0.1056 = 0.1956.</li>
<li>MDE² = 0.02² = 0.0004.</li>
<li>n = 7.849 × 0.1956 / 0.0004 ≈ 3 838.2 → <b>3 839</b> people per group, ≈ 7 700 in total.</li>
</ol>
<pre><code>import math
from statistics import NormalDist

def sample_size(p1, mde, alpha=0.05, power=0.8):
    p2 = p1 + mde
    z_a = NormalDist().inv_cdf(1 - alpha / 2)
    z_b = NormalDist().inv_cdf(power)
    var = p1 * (1 - p1) + p2 * (1 - p2)
    return math.ceil((z_a + z_b) ** 2 * var / mde ** 2)</code></pre>
<h3>Intuition</h3>
<p>n is inversely proportional to MDE²: to detect an effect half as large (1 pp) you need roughly <b>four</b> times as many people. With 1 000 new users a day, a test for 2 pp takes ≈ 8 days, and for 1 pp ≈ a month. The business decides the MDE: "what lift matters to us?"</p>
<div class="tip">Fix the test duration in advance and run it for at least one full week (two is better): users behave differently at weekends.</div>
<h3>Common mistakes</h3>
<ul>
<li>Plugging a relative MDE (20%) into the formula as absolute (0.20).</li>
<li>Thinking the n for one group is the number needed for the whole test. Multiply by two.</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>sample_size(p1, mde, alpha=0.05, power=0.8)</code>: it should return the number of users needed <b>per group</b> by the formula from the lesson (an integer rounded up).', hints: ['<code>z_a = NormalDist().inv_cdf(1 - alpha / 2)</code>, <code>z_b = NormalDist().inv_cdf(power)</code>', '<code>math.ceil((z_a + z_b) ** 2 * var / mde ** 2)</code>'], check: { tests: 'assert sample_size(0.10, 0.02) == 3839, f"sample_size(0.10, 0.02) should be 3839, you have {sample_size(0.10, 0.02)}"\nassert sample_size(0.05, 0.01) == 8155, "sample_size(0.05, 0.01) should be 8155"\nassert isinstance(sample_size(0.2, 0.02), int), "Return an integer: math.ceil"\nassert sample_size(0.10, 0.02, power=0.9) > 3839, "If power grows, n should grow too: use the power parameter"\nassert sample_size(0.10, 0.02, alpha=0.01) > 3839, "If alpha gets smaller, n should grow: use the alpha parameter"' } },
        { prompt: 'Baseline conversion is 20%, MDE = 2 pp (20% → 22%), α = 0.05, power = 0.8. How many users per group are needed by the formula from the lesson?', unit: 'people', explain: '7.849 × (0.2 × 0.8 + 0.22 × 0.78) / 0.0004 = 7.849 × 0.3316 / 0.0004 ≈ 6 506.3 → 6 507.' },
        { prompt: 'The test was planned for an MDE of 2 pp. The product manager says "we also want to catch a 1 pp lift". Roughly how does n per group change?', options: ['It halves', 'It does not change', 'It grows about four times', 'It doubles'], explain: 'n ∝ 1 / MDE². If the MDE is halved, n grows about four times.' }
      ]
    },
    'ab-8': {
      title: 'A/B test design and pitfalls',
      body: `
<p>Even with the right formula, a badly planned test gives misleading results. The most common pitfalls:</p>
<h3>1. Unit of randomization</h3>
<p>Usually <b>users</b> are randomized (by user_id), not sessions or page views. Otherwise one person sees both versions and the observations are not independent. The unit of analysis must match the unit of randomization.</p>
<h3>2. Peeking</h3>
<p>Checking the result every day and stopping as soon as p &lt; 0.05 raises the Type I error far above 5%: a random fluctuation can temporarily cross the threshold. Solution: calculate n in advance and decide only once you reach it (or use special sequential methods).</p>
<h3>3. Multiple comparisons</h3>
<p>If you test five metrics or five variants at α = 0.05, the probability that at least one comes out "significant" by chance is ≈ 1 − 0.95⁵ ≈ 23%. The simplest correction is <b>Bonferroni</b>: α / m for each test. 5 metrics: 0.05 / 5 = 0.01. Another way is to pick one primary metric in advance.</p>
<h3>4. Novelty effect</h3>
<p>A new design gets more clicks in the first days just because it is "new", and then the effect fades. Look at the effect by day and run the test long enough.</p>
<h3>5. SRM (sample ratio mismatch)</h3>
<p>If you planned 50/50, the group sizes should be roughly equal. If the difference cannot be explained by chance, there is a bug in the assignment (bot filter, redirect, cache) and you cannot trust the result.</p>
<h3>Step-by-step example: an SRM check</h3>
<p>A: 5 120, B: 4 880, total N = 10 000.</p>
<ol>
<li>Under H0 the size of A is binomial: mean N/2 = 5 000, SD = √(N × 0.5 × 0.5) = 50.</li>
<li>z = (5 120 − 5 000) / 50 = 2.4.</li>
<li>p = 2 × (1 − cdf(2.4)) ≈ 0.016.</li>
<li>For SRM a strict threshold is used (often p &lt; 0.001). Here 0.016 is a warning sign: check the assignment. With 100 000 people, 50 600 / 49 400 gives p ≈ 0.0001 — a clear SRM.</li>
</ol>
<div class="tip">SRM is the <b>first</b> step of the analysis. If the group sizes are wrong, comparing conversion makes no sense.</div>
<h3>Common mistakes</h3>
<ul>
<li>Stopping the test on the day a "win" appears.</li>
<li>Looking at 20 segments and announcing the one significant one as "the result".</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>srm_p(n_a, n_b)</code>: it should return the two-sided p-value of the group sizes when a 50/50 split was planned. N = n_a + n_b, z = (n_a − N/2) / √(N × 0.25).', hints: ['SD = <code>math.sqrt(n * 0.25)</code>, where n is the total.', 'The p-value is two-sided, as before.'], check: { tests: 'assert srm_p(5120, 4880) is not None, "Return the p-value"\nassert abs(srm_p(5120, 4880) - 0.016395) < 1e-4, f"srm_p(5120, 4880) should be ≈ 0.0164, you have {srm_p(5120, 4880):.5f}"\nassert abs(srm_p(4880, 5120) - 0.016395) < 1e-4, "The result should not depend on the order of the groups: abs(z)"\nassert srm_p(50600, 49400) < 0.001, "50600 / 49400 is a clear SRM: p should be < 0.001"\nassert abs(srm_p(500, 500) - 1) < 1e-9, "For equal groups p = 1"' } },
        { prompt: 'The first step of an SRM check: from the <code>assignments</code> table, output <code>variant</code> and the number of users <code>n</code> for each version.', hints: ['<code>COUNT(*) AS n</code> and <code>GROUP BY variant</code>.'] },
        { prompt: 'The test is planned for 14 days. On day 4, p = 0.03 and the manager says "we won, let\'s stop". What do you say?', options: ['I agree: p &lt; 0.05', 'We don\'t stop: peeking raises the Type I error, we wait until we reach the planned n', 'Let\'s raise α to 0.1', 'Let\'s restart the test from scratch'], explain: 'Peeking: the p-value fluctuates over time, and stopping early raises the false positive probability far above 5%. Besides, the novelty effect may not have worn off yet.' }
      ]
    },
    'ab-9': {
      title: 'Analysing an A/B test in SQL',
      body: `
<p>In real work, test data lives in a database: one table says who got which version (<code>assignments</code>), another who bought (<code>conversions</code>). The conversions table only contains buyers, so the key step is a <b>LEFT JOIN</b>: users who did not buy must be counted too.</p>
<h3>The main query</h3>
<pre><code>SELECT a.variant,
  COUNT(*) AS users,
  COUNT(c.user_id) AS buyers,
  ROUND(COUNT(c.user_id) * 1.0 / COUNT(*), 3) AS cr
FROM assignments a
LEFT JOIN conversions c ON c.user_id = a.user_id
GROUP BY a.variant;</code></pre>
<h3>Step-by-step example</h3>
<ol>
<li><code>LEFT JOIN</code> keeps every user. For non-buyers the columns <code>c.user_id</code> and <code>c.revenue</code> are <code>NULL</code>.</li>
<li><code>COUNT(*)</code> counts all rows (the group size), while <code>COUNT(c.user_id)</code> counts only non-NULL ones (buyers).</li>
<li><code>* 1.0</code> saves you from integer division (in SQLite 6 / 32 = 0).</li>
<li>In our data: A — 6 / 32 ≈ 0.188, B — 10 / 32 ≈ 0.313.</li>
<li>We pass these numbers to <code>two_prop_z(6, 32, 10, 32)</code> in Python: z ≈ 1.15, p ≈ 0.25. A 12 pp difference looks impressive, but with 64 people it may well be chance.</li>
</ol>
<h3>Revenue metric</h3>
<p>Revenue per user is divided by all users, not only buyers. To turn NULL revenue into 0, use <code>COALESCE(c.revenue, 0)</code>.</p>
<pre><code>SUM(COALESCE(c.revenue, 0)) * 1.0 / COUNT(*)</code></pre>
<h3>Segments</h3>
<p><code>GROUP BY a.variant, a.device</code> shows the effect on each device. Remember: looking at many segments is a multiple comparisons problem (lesson 8). A segment result is only a hypothesis, not proof.</p>
<div class="tip">SQL does the counting, and you run the statistical test in Python (or with a formula in SQL). First SRM, then the primary metric, segments last.</div>
<h3>Common mistakes</h3>
<ul>
<li>Using <code>INNER JOIN</code>: non-buyers disappear and conversion comes out as 100%.</li>
<li>Computing revenue per user as <code>AVG(c.revenue)</code>: that is only the average order value of buyers.</li>
</ul>`,
      ex: [
        { prompt: 'For each version, output <code>variant</code>, <code>users</code> (all users), <code>buyers</code> (those who bought) and the conversion <code>cr</code> (<code>ROUND(..., 3)</code>).', hints: ['<code>COUNT(c.user_id)</code> counts only buyers.', '<code>ROUND(COUNT(c.user_id) * 1.0 / COUNT(*), 3) AS cr</code>'] },
        { prompt: 'Conversion by version and device: <code>variant</code>, <code>device</code>, <code>users</code>, <code>cr</code> (<code>ROUND(..., 3)</code>). Order: variant, then device.', hints: ['<code>GROUP BY a.variant, a.device</code>', 'At the end, <code>ORDER BY a.variant, a.device</code>.'] },
        { prompt: 'For each version, output <code>variant</code>, total revenue <code>revenue</code> and revenue per user <code>rpu</code> (divided by all users, <code>ROUND(..., 1)</code>).', hints: ['<code>COALESCE(c.revenue, 0)</code> puts 0 for non-buyers.', 'rpu: <code>SUM(...) * 1.0 / COUNT(*)</code>, not <code>AVG(c.revenue)</code>.'] }
      ]
    },
    'ab-10': {
      title: 'Practical significance and writing the decision',
      body: `
<p>"p &lt; 0.05" is not the end of a decision but its beginning. <b>Statistical significance</b> says "the difference is probably not random". <b>Practical significance</b> asks "does the difference matter to the business?" With millions of users even a 0.05 pp lift gives p &lt; 0.001, but it may not pay for the development cost.</p>
<h3>Confidence interval of the difference</h3>
<p>More informative than the p-value is the <b>CI of the difference p_B − p_A</b>. Here the unpooled SE is used (we do not assume H0):</p>
<p>SE = √(p_A(1 − p_A)/n_A + p_B(1 − p_B)/n_B), CI = (p_B − p_A) ± z × SE.</p>
<h3>Step-by-step example</h3>
<p>A: 200 / 2 000, B: 250 / 2 000. The business said in advance: "a lift below 1 pp is not worth shipping".</p>
<ol>
<li>Difference: 0.125 − 0.10 = 0.025 (2.5 pp).</li>
<li>SE = √(0.1 × 0.9 / 2000 + 0.125 × 0.875 / 2000) = √(0.000045 + 0.0000547) ≈ 0.00998.</li>
<li>95% CI = 0.025 ± 1.96 × 0.00998 = [0.0054; 0.0446], i.e. from +0.5 pp to +4.5 pp.</li>
<li>The interval does not contain 0 — statistically significant. But the lower bound (0.5 pp) is below our 1 pp threshold: the effect could also be small.</li>
</ol>
<table>
<tr><th>Where the CI is</th><th>Decision</th></tr>
<tr><td>Entirely above the threshold</td><td>Ship it</td></tr>
<tr><td>Above 0 but crosses the threshold</td><td>Can ship while stating the risk, or extend the test</td></tr>
<tr><td>Contains 0, narrow</td><td>Practically no effect, don't ship</td></tr>
<tr><td>Contains 0, wide</td><td>Not enough data, no conclusion</td></tr>
</table>
<h3>Writing the decision</h3>
<p>A good conclusion states the decision in the first sentence, then: the effect and CI ("+2.5 pp, 95% CI +0.5…+4.5"), the p-value, checks (SRM, duration, no peeking), guardrail metrics (bounces, returns), risks and the next step.</p>
<div class="tip">Write to the manager not "p = 0.012" but "B raises conversion by about 2.5 pp, ≈ X ₸ of extra revenue per month".</div>
<h3>Common mistakes</h3>
<ul>
<li>Giving only the p-value without the size of the effect.</li>
<li>Writing up a non-significant result as "B doesn't work".</li>
</ul>`,
      ex: [
        { prompt: 'Write the function <code>ci_diff(x_a, n_a, x_b, n_b, level=0.95)</code>: it should return the confidence interval of the difference p_B − p_A, using the unpooled SE, as <code>(low, high)</code>.', hints: ['<code>se = math.sqrt(p_a * (1 - p_a) / n_a + p_b * (1 - p_b) / n_b)</code>', 'z as in lesson 3, from <code>level</code>.'], check: { tests: '_r = ci_diff(200, 2000, 250, 2000)\nassert _r is not None and len(_r) == 2, "Return the tuple (low, high)"\nassert abs(_r[0] - 0.005441) < 1e-4 and abs(_r[1] - 0.044559) < 1e-4, f"ci_diff(200, 2000, 250, 2000) should be ≈ (0.0054, 0.0446), you have {_r}. Unpooled SE: the sum of each group\'s p(1 − p)/n"\n_r2 = ci_diff(250, 2000, 200, 2000)\nassert _r2[1] < 0, "The difference is p_b − p_a: if B is worse, the interval is negative"\n_r9 = ci_diff(200, 2000, 250, 2000, 0.90)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], "A 90% interval should be narrower than a 95% one: use the level parameter"' } },
        { prompt: 'A test ran on 2 million users: conversion 5.00% → 5.04%, p = 0.004. Supporting the new feature costs 3 million ₸ a month, while +0.04 pp brings ≈ 500 thousand ₸ of revenue a month. What is the decision?', options: ['Ship it: p &lt; 0.01', 'Statistically significant but not practically significant: don\'t ship', 'Stop the test and start over', 'Lower α to 0.001'], explain: 'With a large n even a tiny effect comes out "significant". The effect does not cover the cost, so shipping is not worth it.' },
        { prompt: 'Example: A — 200 / 2 000, B — 250 / 2 000, p ≈ 0.012, difference +2.5 pp (95% CI +0.5…+4.5), the SRM check passed, the test ran for 14 days. Write a short decision of 60+ words for the head of product, then grade it honestly (each criterion at least 3 / 4).', criteria: [
          { name: 'Decision in the first sentence', levels: ['No decision', 'The decision is at the end of the text or vague', 'There is a clear decision in the first paragraph', 'The first sentence has the decision and the key number'] },
          { name: 'Effect and uncertainty', levels: ['Only "B is better"', 'Only the p-value is given', 'The effect size and p-value are there', 'The effect, the 95% CI and its business meaning (comparison with the threshold) are there'] },
          { name: 'Checks', levels: ['Not mentioned', 'Only one (for example, duration)', 'SRM and duration are named', 'SRM, duration, no peeking and a guardrail metric are named'] },
          { name: 'Risk and next step', levels: ['None', 'Vague words ("we\'ll monitor")', 'A concrete risk or next step', 'The risk (the CI lower bound is small), the next step and how it will be measured'] }
        ] }
      ]
    },
    'ab-chi': {
      title: 'Chi-square and scipy.stats',
      body: `
<p>So far we have written tests by hand with <code>NormalDist</code>: that was needed to understand the formulas. At work you use a ready-made library: <code>scipy.stats</code>. In this lesson we learn its four main tests and pin down which one to choose when.</p>
<table>
<tr><th>Question</th><th>Data type</th><th>Test</th></tr>
<tr><td>Are the proportions the same across groups? (2 or more groups)</td><td>A table of categories</td><td><code>chi2_contingency</code></td></tr>
<tr><td>Are the means of two groups the same?</td><td>Numbers, independent groups</td><td><code>ttest_ind(..., equal_var=False)</code></td></tr>
<tr><td>Does one group give "larger" values than the other? (skewed data, outliers)</td><td>Numbers or ranks</td><td><code>mannwhitneyu</code></td></tr>
<tr><td>Did the "before" and "after" measurements of the same people change?</td><td>Paired numbers</td><td><code>ttest_rel</code></td></tr>
</table>
<h3>1. Chi-square (χ²): is the table far from chance?</h3>
<p><b>The idea:</b> if the variant does not affect conversion (H0), the share of buyers in each group would equal the overall share. We compute that "expected" table and compare it with the actual one. If the gap is large, we do not believe H0.</p>
<pre><code>Expected cell E = row total × column total / grand total
χ² = Σ (O − E)² / E            # O is the observed count
df = (rows − 1) × (columns − 1)</code></pre>
<p><b>Step-by-step example.</b> Three variants with 1,000 users each:</p>
<table>
<tr><th>Variant</th><th>Bought</th><th>Did not buy</th><th>Total</th></tr>
<tr><td>A</td><td>100</td><td>900</td><td>1,000</td></tr>
<tr><td>B</td><td>120</td><td>880</td><td>1,000</td></tr>
<tr><td>C</td><td>150</td><td>850</td><td>1,000</td></tr>
<tr><td>Total</td><td>370</td><td>2,630</td><td>3,000</td></tr>
</table>
<ol>
<li>Overall conversion: 370 / 3,000 = 12.33%.</li>
<li>Under H0 the expected buyers in each group: 1,000 × 370 / 3,000 = 123.33; non-buyers: 876.67.</li>
<li>The "Bought" column: (100 − 123.33)² + (120 − 123.33)² + (150 − 123.33)² = 544.4 + 11.1 + 711.1 = 1,266.7; divide by 123.33 → 10.27.</li>
<li>The "Did not buy" column: the same 1,266.7 / 876.67 → 1.44.</li>
<li>χ² = 10.27 + 1.44 = 11.72, df = (3 − 1) × (2 − 1) = 2, p ≈ 0.003. The variants do not have the same conversion.</li>
</ol>
<pre><code>from scipy import stats
table = [[100, 900], [120, 880], [150, 850]]
chi2, p, dof, expected = stats.chi2_contingency(table)
print(round(chi2, 2), round(p, 4), dof)     # 11.72 0.0029 2</code></pre>
<p>With two groups and two outcomes (a 2 × 2 table) the χ² test gives the same answer as the two-proportion z-test from lesson ab-5: χ² = z². But for a 2 × 2 table scipy applies the Yates correction by default (<code>correction=True</code>), so p comes out slightly larger. If you need an exact match with the z-test, write <code>correction=False</code>.</p>
<p>The χ² test says "there is a difference somewhere" but not <b>in which group</b>. After it you run pairwise comparisons and adjust α with the Bonferroni correction (α / number of comparisons).</p>
<h3>2. The exact Welch t-test</h3>
<p>In lesson ab-6 we approximated the p-value with the normal distribution. scipy computes the t-distribution exactly:</p>
<pre><code>a = [5, 7, 6, 8, 4]
b = [9, 7, 8, 10, 6]
res = stats.ttest_ind(b, a, equal_var=False)       # Welch
print(res.statistic, res.pvalue)                   # 2.0  0.0805</code></pre>
<p>The approximation gave p ≈ 0.046; the exact answer is 0.08. In a small sample that difference changes the decision. Do not forget <code>equal_var=False</code>: the default assumes equal variances.</p>
<h3>3. Mann–Whitney U: ranks, not means</h3>
<p>In skewed data such as revenue, order value or session length, a single "whale" customer drags the mean. Mann–Whitney compares the <b>ranks</b> of the values rather than the values themselves: "is the probability that a random person from group B has a higher value than one from group A different from 50%?" It is robust to outliers.</p>
<pre><code>res = stats.mannwhitneyu(b, a, alternative='two-sided')
print(res.pvalue)                                  # 0.114</code></pre>
<p>Remember: this test does <b>not</b> compare <b>means</b>. If the business question is "did revenue per user go up?", the answer lies in the mean: use Welch or the bootstrap (next lesson).</p>
<h3>4. One-sided and two-sided tests</h3>
<p>A two-sided test asks "is there a difference?" (in either direction). A one-sided test asks "is B <b>larger</b>?". If the difference is in the expected direction, the one-sided p is half the two-sided one:</p>
<pre><code>stats.ttest_ind(b, a, equal_var=False, alternative='greater').pvalue   # 0.040</code></pre>
<p>That is exactly why you must choose the direction <b>before you see the data</b>. Looking at the result and saying "let's switch to one-sided" is p-hacking. In A/B tests the default is two-sided: it also matters to us if B got worse.</p>
<h3>5. The paired test</h3>
<p>If we measure the same people twice (before and after a promotion), the observations are not independent. Here we compute each person's <b>difference</b> and test whether its mean differs from 0. The large spread between people drops out, so the test is more sensitive.</p>
<pre><code>after  = [12, 15, 11, 14, 13, 16]
before = [10, 14, 11, 12, 12, 13]
stats.ttest_rel(after, before).pvalue                    # 0.017
stats.ttest_ind(after, before, equal_var=False).pvalue   # 0.151: if we ignore the pairing</code></pre>
<div class="tip"><b>Common mistakes:</b> (1) Passing percentages or shares to <code>chi2_contingency</code>: it needs <b>counts</b> (numbers of people) only. (2) Putting only the "bought" column in the table: the "did not buy" column is required too. (3) If an expected cell is below 5, χ² is unreliable: merge categories. (4) Switching to a one-sided test after seeing the result. (5) Using an independent-groups test on paired data. (6) Reading a Mann–Whitney result as "the mean went up".</div>`,
      ex: [
        { prompt: '<code>table</code> holds the numbers of buyers and non-buyers by device (rows: mobile, desktop, tablet). Use <code>stats.chi2_contingency</code> to get <code>chi2</code>, <code>p</code>, <code>dof</code>, <code>expected</code>. <code>significant</code> is <code>True</code> if conversion depends on the device at α = 0.05.', check: { tests: '# sklearn: scipy scikit-learn бумасымен бірге жүктеледі, алғашқы іске қосу ұзағырақ\nfrom scipy import stats as _st\n_c, _p, _d, _e = _st.chi2_contingency([[90, 1410], [95, 905], [30, 470]])\nassert abs(float(chi2) - _c) < 1e-6, f"chi2 should be ≈ {_c:.2f}, you have {float(chi2):.2f}. Pass the whole table, unchanged"\nassert abs(float(p) - _p) < 1e-9, f"p should be ≈ {_p:.4f}"\nassert int(dof) == 2, "dof = (3 − 1) × (2 − 1) = 2"\nassert abs(float(expected[0][0]) - 107.5) < 1e-6, "Expected buyers on mobile: 1500 × 215 / 3000 = 107.5"\nassert bool(significant) is True, "p ≈ 0.002 < 0.05: significant = True"' }, hints: ['The function returns four values: <code>chi2, p, dof, expected = stats.chi2_contingency(table)</code>', '<code>significant = p &lt; 0.05</code>'] },
        { prompt: '<code>a</code> and <code>b</code> are the order values of two groups (strongly right-skewed). Compute: <code>t_p</code> — the two-sided p-value of the Welch t-test; <code>u_p</code> — the two-sided Mann–Whitney p-value; <code>t_p_one</code> — the one-sided Welch p-value for "the mean of B is <b>greater</b> than that of A". In every call pass <code>b</code> first, then <code>a</code>.', starter: 'import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(6)\na = rng.lognormal(8.0, 1.0, 500)   # group A, ₸\nb = rng.lognormal(8.2, 1.0, 500)   # group B, ₸\n', check: { tests: '# sklearn: scipy scikit-learn бумасымен бірге жүктеледі, алғашқы іске қосу ұзағырақ\nfrom scipy import stats as _st\n_t = _st.ttest_ind(b, a, equal_var=False).pvalue\n_s = _st.ttest_ind(b, a).pvalue\n_u = _st.mannwhitneyu(b, a, alternative="two-sided").pvalue\n_o = _st.ttest_ind(b, a, equal_var=False, alternative="greater").pvalue\nassert abs(float(t_p) - _t) < 1e-9 or abs(float(t_p) - _s) > 1e-12, "t_p: you need the Welch version, add equal_var=False"\nassert abs(float(t_p) - _t) < 1e-9, f"t_p should be ≈ {_t:.4f}, you have {float(t_p):.4f}: stats.ttest_ind(b, a, equal_var=False).pvalue"\nassert abs(float(u_p) - _u) < 1e-9, f"u_p should be ≈ {_u:.4f}, you have {float(u_p):.4f}: alternative=\'two-sided\'"\nassert abs(float(t_p_one) - _o) < 1e-9, f"t_p_one should be ≈ {_o:.4f}, you have {float(t_p_one):.4f}: alternative=\'greater\', b first, then a"' }, hints: ['<code>stats.ttest_ind(b, a, equal_var=False).pvalue</code>', '<code>stats.mannwhitneyu(b, a, alternative=\'two-sided\').pvalue</code>', 'One-sided: <code>alternative=\'greater\'</code> is the hypothesis that the mean of the first argument is larger. Compare the p-values of the two tests: on skewed data they can lead to different conclusions.'] },
        { prompt: 'A table: mobile — 1,000 users, 60 of them bought; desktop — 500 users, 40 bought. Under H0 (conversion does not depend on the device), how many buyers are <b>expected</b> on mobile? (to 1 decimal place)', explain: 'E = row total × column total / grand total = 1,000 × 100 / 1,500 = 66.67. Overall conversion is 100 / 1,500 = 6.67%, and we apply it to the 1,000 mobile users.' },
        { prompt: 'The average delivery time of 40 couriers was measured <b>before</b> and <b>after</b> a new routing algorithm (the same 40 couriers). Which test fits best?', options: ['<code>stats.ttest_ind(after, before, equal_var=False)</code>: two independent groups', '<code>stats.ttest_rel(after, before)</code>: a paired test that analyses each courier\'s difference', '<code>stats.chi2_contingency</code>: a table of categories', 'No test is needed, comparing the means is enough'], explain: 'The same people were measured twice, so the observations are dependent. A paired test looks at the difference for each courier and removes the spread between couriers, which makes it more sensitive.' }
      ]
    },
    'ab-boot': {
      title: 'Bootstrap and the permutation test',
      body: `
<p>We know the standard error formulas for a mean and a proportion. But what about a confidence interval for the <b>median</b>? For the 90th percentile? For revenue per user (RPU) when 95% of users spent 0 ₸? In such cases there is no convenient formula, or its assumptions do not hold. The solution is to tell the computer "try it many times". These are <b>resampling</b> methods.</p>
<h3>1. Bootstrap: sampling from the sample</h3>
<p><b>The idea.</b> A CI measures "how much would the statistic change if we repeated the study?". We cannot repeat the study, but the sample we have is the best copy of the population. So we draw new samples of the same size from it <b>with replacement</b>.</p>
<ol>
<li>From the n observations, draw n observations with replacement (some appear two or three times, some not at all).</li>
<li>Compute the statistic (median, mean, anything).</li>
<li>Repeat steps 1–2 between 2,000 and 10,000 times.</li>
<li>The 2.5th and 97.5th percentiles of the resulting values are the 95% CI (the percentile method).</li>
</ol>
<p><b>Example by hand.</b> Order values (thousand ₸): [2, 4, 4, 10], median 4.</p>
<table>
<tr><th>Repeat</th><th>New sample</th><th>Median</th></tr>
<tr><td>1</td><td>[4, 2, 4, 4]</td><td>4</td></tr>
<tr><td>2</td><td>[10, 10, 2, 4]</td><td>7</td></tr>
<tr><td>3</td><td>[2, 2, 4, 2]</td><td>2</td></tr>
<tr><td>…</td><td>…</td><td>…</td></tr>
</table>
<p>After thousands of repeats we have a distribution of medians: its width is our uncertainty.</p>
<pre><code>import numpy as np

def boot_ci(x, stat, n_boot=2000, level=0.95, seed=0):
    rng = np.random.default_rng(seed)        # so the result is reproducible
    x = np.asarray(x)
    vals = [stat(rng.choice(x, size=len(x), replace=True)) for _ in range(n_boot)]
    a = (1 - level) / 2
    return np.quantile(vals, a), np.quantile(vals, 1 - a)

boot_ci(checks, np.median)      # 95% CI of the median</code></pre>
<p><b>The difference between two groups.</b> In an A/B test we resample each group separately and compute the difference: <code>stat(b*) − stat(a*)</code>. If the CI of the difference does not contain 0, the result is significant at α = 0.05.</p>
<p><b>Revenue per user (RPU).</b> The data: one number per user (mostly 0). RPU is the mean of those numbers. Because the distribution is very skewed, a bootstrap CI is a good alternative to the t-interval. The important part: the resampling unit is the <b>user</b> (whatever the experiment randomized), not an order or click row.</p>
<h3>2. The permutation test: shuffling the labels</h3>
<p><b>The idea.</b> If H0 is true (the variant changes nothing), the labels "A" and "B" are meaningless: shuffle them at random and the difference would come out about the same. Let us check.</p>
<ol>
<li>Compute the actual difference: obs = mean(B) − mean(A).</li>
<li>Pool the two groups and shuffle; call the first n_A values "A" and the rest "B".</li>
<li>Compute the difference for this fake split.</li>
<li>Repeat steps 2–3 thousands of times.</li>
<li>p-value = the share of cases where |fake difference| ≥ |obs| (two-sided).</li>
</ol>
<p><b>Example by hand.</b> A = [1, 2, 3], B = [4, 5, 9]. obs = 6 − 2 = 4. There are 20 ways to split six numbers into two triples. Splits with a difference of at least 4: only the actual split itself and its mirror image (A = [4, 5, 9]). The exact p = 2 / 20 = 0.10. With only 6 numbers in the data, a smaller p is impossible.</p>
<pre><code>def perm_test(a, b, n_perm=5000, seed=0):
    rng = np.random.default_rng(seed)
    a, b = np.asarray(a, float), np.asarray(b, float)
    obs = b.mean() - a.mean()
    pooled = np.concatenate([a, b])
    count = 0
    for _ in range(n_perm):
        s = rng.permutation(pooled)
        d = s[len(a):].mean() - s[:len(a)].mean()
        if abs(d) &gt;= abs(obs):
            count += 1
    return obs, count / n_perm</code></pre>
<p>This is the definition of the p-value itself: "the probability of a result this extreme or more extreme when H0 is true". No assumption of a normal distribution is needed.</p>
<table>
<tr><th></th><th>Bootstrap</th><th>Permutation</th></tr>
<tr><td>What it gives</td><td>A confidence interval</td><td>A p-value</td></tr>
<tr><td>How it samples</td><td>With replacement, within each group</td><td>Without replacement, mixing the groups</td></tr>
<tr><td>Question</td><td>What range is the effect in?</td><td>Is the effect down to chance?</td></tr>
</table>
<div class="tip"><b>Common mistakes:</b> (1) Leaving <code>replace=False</code> in the bootstrap: every "new" sample equals the original and the interval width is 0. (2) Using a resample size other than n. (3) Too few repeats (100): the percentiles jump around, take at least 2,000. (4) Resampling rows (orders) when the experiment randomized users. (5) Not setting a <code>seed</code>: nobody can reproduce the calculation. (6) Thinking the bootstrap "fixes" a small sample: 15 observations will not give a reliable interval.</div>`,
      ex: [
        { prompt: 'Write the function <code>boot_ci(x, stat, n_boot=2000, level=0.95, seed=0)</code>: it should draw <code>n_boot</code> samples of size <code>len(x)</code> from <code>x</code> with replacement, compute the function <code>stat</code> on each, and return <code>(low, high)</code> by the percentile method.', check: { tests: 'import numpy as _np\n_x = _np.random.default_rng(5).lognormal(8, 1, 300)\ndef _ref(x, stat, n_boot, level, seed):\n    r = _np.random.default_rng(seed)\n    v = [stat(r.choice(x, size=len(x), replace=True)) for _ in range(n_boot)]\n    a = (1 - level) / 2\n    return float(_np.quantile(v, a)), float(_np.quantile(v, 1 - a))\n_r = boot_ci(_x, _np.mean)\nassert _r is not None and len(_r) == 2, "Return a tuple (low, high)"\n_lo, _hi = float(_r[0]), float(_r[1])\n_e = _ref(_x, _np.mean, 2000, 0.95, 0)\n_w = _e[1] - _e[0]\nassert _hi - _lo > 1e-9, "The interval width is 0: sample with replacement (replace=True)"\nassert _lo < _x.mean() < _hi, "The CI of the mean should contain the sample mean"\nassert abs(_lo - _e[0]) < 0.25 * _w and abs(_hi - _e[1]) < 0.25 * _w, f"The 95% CI of the mean should be about ({_e[0]:.0f}, {_e[1]:.0f}), you have ({_lo:.0f}, {_hi:.0f}). Each sample has size len(x), and the bounds are the (1 − level) / 2 and 1 − (1 − level) / 2 quantiles"\nassert abs((_hi - _lo) - _w) < 0.2 * _w, f"The interval width should be about {_w:.0f}, you have {_hi - _lo:.0f}: each new sample must have size exactly len(x)"\n_r8 = boot_ci(_x, _np.mean, level=0.8)\nassert float(_r8[1]) - float(_r8[0]) < 0.85 * (_hi - _lo), "The 80% interval should be narrower than the 95% one: use the level parameter"\n_m = boot_ci(_x, _np.median)\nassert float(_m[0]) <= float(_np.median(_x)) <= float(_m[1]), "When np.median is passed as stat, the result should be the CI of the median"' }, hints: ['One repeat: <code>stat(rng.choice(x, size=len(x), replace=True))</code>', 'Collect the values in a list: <code>vals = [... for _ in range(n_boot)]</code>', '<code>a = (1 - level) / 2</code>; <code>np.quantile(vals, a)</code> and <code>np.quantile(vals, 1 - a)</code>'] },
        { prompt: 'Write the function <code>perm_test(a, b, n_perm=5000, seed=0)</code>: it should return <code>(obs, p)</code>. <code>obs</code> = mean(b) − mean(a). <code>p</code> is the share of cases, over <code>n_perm</code> shuffles of the pooled data, where |fake difference| ≥ |obs| (two-sided).', check: { tests: 'import numpy as _np\n_g = _np.random.default_rng(3)\n_a = _g.normal(100, 10, 60)\n_b = _g.normal(108, 10, 60)\n_r = perm_test(_a, _b, n_perm=2000)\nassert _r is not None and len(_r) == 2, "Return a tuple (obs, p)"\nassert abs(float(_r[0]) - (_b.mean() - _a.mean())) < 1e-9, "obs = mean(b) − mean(a)"\nassert 0 <= float(_r[1]) < 0.01, f"With a clear difference p should be < 0.01, you have {float(_r[1]):.4f}"\n_c = _np.arange(40.0)\n_r0 = perm_test(_c, _c[::-1].copy(), n_perm=500)\nassert float(_r0[1]) > 0.9, f"If the groups are the same p should be ≈ 1, you have {float(_r0[1]):.3f}"\n_u = _g.normal(50, 12, 50)\n_v = _u[::-1].copy() + _np.linspace(-9, 15, 50)\ndef _ref(a, b, n, seed):\n    r = _np.random.default_rng(seed); obs = b.mean() - a.mean(); pool = _np.concatenate([a, b]); c = 0\n    for _ in range(n):\n        s = r.permutation(pool)\n        c += abs(s[len(a):].mean() - s[:len(a)].mean()) >= abs(obs)\n    return c / n\n_e = _ref(_u, _v, 3000, 1)\n_p = float(perm_test(_u, _v, n_perm=3000)[1])\nassert abs(_p - _e) < 0.05, f"On this data p should be ≈ {_e:.2f}, you have {_p:.2f}. Two-sided test: abs(d) >= abs(obs); the denominator is n_perm"' }, hints: ['<code>pooled = np.concatenate([a, b])</code>, and in each repeat <code>s = rng.permutation(pooled)</code>', 'The fake groups: <code>s[:len(a)]</code> and <code>s[len(a):]</code>', 'The counter: <code>if abs(d) &gt;= abs(obs): count += 1</code>; at the end <code>count / n_perm</code>'] },
        { prompt: 'In an online store A/B test, users were split into two groups. To get a CI for the "average order value" metric, the analyst bootstrapped the rows of the <b>orders</b> table. One user can have several orders. What is wrong?', options: ['Nothing: the more rows, the more precise the interval', 'The resampling unit must match the randomization unit (the user): one person\'s orders are dependent, so the interval comes out falsely narrow', 'The bootstrap only works for the median', 'The sampling should have been without replacement'], explain: 'The experiment randomized users, so the independent unit is the user. Treating orders as independent artificially inflates n and understates the uncertainty. You should resample users and take all of each user\'s orders together.' }
      ]
    },
    'ab-cuped': {
      title: 'Variance reduction (CUPED), ratio metrics and quasi-experiments',
      body: `
<p>Four topics a little above junior level that are often named in product analyst and Data Scientist vacancies in Kazakhstan: CUPED, ratio metrics, the A/A test, and methods for when randomization is impossible (DiD, PSM, uplift). The goal is to understand the idea behind each and be able to explain it in two or three sentences at an interview.</p>
<h3>1. CUPED: removing the noise</h3>
<p><b>The problem.</b> A test's sensitivity depends on the variance of the metric (ab-7): with more noise you need more users to see the same effect. But a large part of that noise is <b>known in advance</b>: a customer who spent a lot last month will spend a lot this month too. That difference has nothing to do with the test.</p>
<p><b>The idea.</b> From each user's metric we subtract the part explained by their behaviour <b>before</b> the experiment:</p>
<pre><code>Y_cuped = Y − θ × (X − mean(X))
θ = Cov(X, Y) / Var(X)</code></pre>
<p>Y is the metric during the experiment, X is the same user's metric before the experiment (the covariate). θ is the slope of the regression of Y on X.</p>
<ul>
<li><b>The mean does not change:</b> X − mean(X) has mean 0, so the estimate of the difference between groups is not biased.</li>
<li><b>The variance goes down:</b> Var(Y_cuped) = Var(Y) × (1 − ρ²), where ρ is the correlation between X and Y.</li>
</ul>
<p><b>In numbers.</b> With ρ = 0.7, 1 − 0.49 = 0.51: the variance is almost halved. Sample size is proportional to variance, so the same power takes half as many users or a test half as long. With ρ = 0.3 the gain is only 9%.</p>
<pre><code>import numpy as np
x = np.concatenate([x_a, x_b]); y = np.concatenate([y_a, y_b])
theta = np.cov(x, y)[0, 1] / x.var(ddof=1)     # both groups together
c_a = y_a - theta * (x_a - x.mean())
c_b = y_b - theta * (x_b - x.mean())
# then the usual Welch t-test: c_b vs c_a</code></pre>
<p><b>Why is it fair?</b> X was measured before the experiment started, so the variant cannot affect it, and randomization balances X across the two groups. If you take a quantity <b>from the experiment period</b> as the covariate (say, the number of sessions), you subtract part of the effect yourself.</p>
<h3>2. Ratio metrics</h3>
<p>CTR = clicks / impressions, average order value = revenue / orders. Here the denominator is not the number of users but a <b>random variable</b>. One user's 50 impressions depend on each other, while randomization was done by user. If we treat impressions as independent observations and run a plain z- or t-test on them, the SE is understated and false "significant" results multiply.</p>
<p>The right ways:</p>
<ul>
<li><b>The delta method:</b> a formula that approximates the variance of a ratio from the variances of the numerator and the denominator and their covariance.</li>
<li><b>Bootstrap by user:</b> resample users and compute Σ clicks / Σ impressions each time (previous lesson).</li>
<li><b>Change the metric:</b> "the mean of each user's own CTR" is a plain mean, but it answers a different question.</li>
</ul>
<p>You do not have to recite the formula at an interview. It is enough to say: "This is a ratio metric, the unit of observation does not match the unit of randomization, so we need the delta method or the bootstrap."</p>
<h3>3. The A/A test</h3>
<p>We show <b>the same</b> variant to both groups. There should be no difference. What we check: is the splitting system working (no SRM), is the metric computed correctly, is our test honest. Across many A/A simulations the p-value should be uniformly distributed, and at α = 0.05 about 5% of the runs should come out "significant". If you get 15% instead of 5%, the SE is understated (usually because of a ratio metric or dependent observations).</p>
<h3>4. When there is no randomization: Difference-in-Differences (DiD)</h3>
<p>Sometimes an A/B test is impossible: a new tariff was switched on for a whole city at once. You cannot simply compare "before and after": season, advertising and holidays all play a part. DiD subtracts the change over the same period in a <b>control group</b> where nothing changed.</p>
<pre><code>DiD = (treat_after − treat_before) − (control_after − control_before)</code></pre>
<p><b>Step-by-step example.</b> Free delivery was switched on in Taraz but not in Shymkent. Average orders per day:</p>
<table>
<tr><th></th><th>Before</th><th>After</th><th>Change</th></tr>
<tr><td>Taraz (treatment)</td><td>100</td><td>130</td><td>+30</td></tr>
<tr><td>Shymkent (control)</td><td>90</td><td>105</td><td>+15</td></tr>
</table>
<ol>
<li>Growth in Taraz: +30. But not all of it comes from free delivery.</li>
<li>Shymkent grew by +15 even though nothing changed there: that is the general trend (season).</li>
<li>DiD = 30 − 15 = <b>+15</b> orders: the estimated effect of free delivery.</li>
</ol>
<p><b>The key assumption is parallel trends:</b> without the change, the two cities would have moved at the same pace. You check this on a chart of the several weeks before the change. If the cities were already moving differently, DiD cannot be trusted.</p>
<h3>5. PSM and uplift: knowing the names is enough</h3>
<ul>
<li><b>Propensity Score Matching (PSM).</b> People ended up in a group by their own choice (for example, those who installed the app). They differ from the non-installers from the start. For each person we estimate the "probability of getting the treatment" (the propensity score) with logistic regression, and pair each treatment person with a control person who has a similar score. It balances only the <b>measured</b> features; hidden differences remain.</li>
<li><b>Uplift modelling.</b> The question is not "who will buy?" but "who will buy <b>because of the promotion</b>?". Uplift = P(purchase | promotion) − P(purchase | no promotion). Sending a promotion to people who would buy anyway is money thrown away; the target is the "persuadable" segment. The data comes from an A/B test.</li>
</ul>
<div class="tip"><b>Common mistakes:</b> (1) Taking the CUPED covariate from the experiment period. (2) Computing θ separately for each group and centring each group on its own mean: that distorts the difference between groups; use one θ and one shared mean(X). (3) Comparing a ratio metric with a row-level t-test. (4) Panicking over one "significant" A/A result: one test in 20 comes out that way by chance. (5) Not checking parallel trends in DiD. (6) Treating a PSM result as equal to a randomized test.</div>`,
      ex: [
        { prompt: '<code>x</code> is the users\' spend <b>before</b> the experiment, <code>y</code> is their spend during the experiment. Compute: <code>theta</code> = Cov(x, y) / Var(x); <code>y_cuped</code> = y − theta × (x − mean(x)); <code>var_ratio</code> = Var(y_cuped) / Var(y).', starter: 'import numpy as np\nrng = np.random.default_rng(42)\nn = 4000\nx = rng.gamma(2.0, 3000, n)               # the previous 4 weeks, ₸\ny = 0.8 * x + rng.normal(0, 3000, n)      # the experiment period, ₸\n', check: { tests: 'import numpy as _np\n_th = _np.cov(x, y)[0, 1] / x.var(ddof=1)\n_rho = _np.corrcoef(x, y)[0, 1]\nassert abs(float(theta) - _th) < 1e-3 * abs(_th), f"theta should be ≈ {_th:.3f}, you have {float(theta):.3f}: np.cov(x, y)[0, 1] / x.var(ddof=1)"\nassert len(y_cuped) == len(y), "y_cuped is an array of the same length as y"\nassert abs(float(_np.mean(y_cuped)) - float(y.mean())) < 1e-6, "CUPED must not change the mean: subtract mean(x) from x"\nassert abs(float(var_ratio) - (1 - _rho ** 2)) < 2e-3, f"var_ratio should be ≈ 1 − ρ² = {1 - _rho ** 2:.3f}, you have {float(var_ratio):.3f}"' }, hints: ['<code>theta = np.cov(x, y)[0, 1] / x.var(ddof=1)</code>', '<code>y_cuped = y - theta * (x - x.mean())</code>', '<code>var_ratio = y_cuped.var() / y.var()</code>'] },
        { prompt: 'An A/B test: a real effect was added to group B, but there is a lot of noise. Compute: <code>p_raw</code> — the Welch t-test p-value for <code>y_b</code> vs <code>y_a</code>; <code>theta</code> — Cov(x, y) / Var(x) computed on the two groups pooled; <code>c_a</code>, <code>c_b</code> — the CUPED-adjusted metrics (one θ, one shared mean(x)); <code>p_cuped</code> — the Welch p-value for <code>c_b</code> vs <code>c_a</code>.', starter: 'import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(3)\nn = 3000\nx_a = rng.gamma(2.0, 3000, n)\nx_b = rng.gamma(2.0, 3000, n)\ny_a = 0.8 * x_a + rng.normal(0, 3000, n)\ny_b = 0.8 * x_b + rng.normal(0, 3000, n) + 200    # the real effect: +200 ₸\n', check: { tests: '# sklearn: scipy scikit-learn бумасымен бірге жүктеледі, алғашқы іске қосу ұзағырақ\nimport numpy as _np\nfrom scipy import stats as _st\n_x = _np.concatenate([x_a, x_b]); _y = _np.concatenate([y_a, y_b])\n_th = _np.cov(_x, _y)[0, 1] / _x.var(ddof=1)\n_ca = y_a - _th * (x_a - _x.mean()); _cb = y_b - _th * (x_b - _x.mean())\n_pr = _st.ttest_ind(y_b, y_a, equal_var=False).pvalue\n_pc = _st.ttest_ind(_cb, _ca, equal_var=False).pvalue\nassert abs(float(p_raw) - _pr) < 1e-9, f"p_raw should be ≈ {_pr:.4f}: stats.ttest_ind(y_b, y_a, equal_var=False).pvalue"\nassert abs(float(theta) - _th) < 1e-3 * abs(_th), f"theta should be ≈ {_th:.3f}: compute it on the two groups pooled with np.concatenate"\nassert abs(float(_np.mean(c_b) - _np.mean(c_a)) - float(_cb.mean() - _ca.mean())) < 1.0, "Use one theta and one shared mean(x) for c_a and c_b (not each group\'s own mean)"\nassert abs(_np.log(float(p_cuped)) - _np.log(_pc)) < 0.05, f"p_cuped should be ≈ {_pc:.4f}, you have {float(p_cuped):.4f}"\nassert float(p_cuped) < float(p_raw), "The p-value should be smaller after CUPED"' }, hints: ['<code>x = np.concatenate([x_a, x_b])</code>, <code>y = np.concatenate([y_a, y_b])</code>', '<code>c_a = y_a - theta * (x_a - x.mean())</code>, and <code>c_b</code> in the same way.', '<code>p_cuped = stats.ttest_ind(c_b, c_a, equal_var=False).pvalue</code>'] },
        { prompt: 'A new bonus programme was launched in the Astana stores but not in Almaty. Average weekly sales (mln ₸): Astana 40 → 52, Almaty 60 → 66. By Difference-in-Differences, what is the effect of the programme in mln ₸?', unit: 'mln ₸', explain: 'Astana: 52 − 40 = +12. Almaty (the general trend): 66 − 60 = +6. DiD = 12 − 6 = 6 mln ₸.' },
        { prompt: 'The metric is CTR = all clicks / all impressions. Randomisation is by user. The analyst took every impression as a separate observation and ran a two-proportion z-test. What is the problem?', options: ['No problem: there are many impressions and the CLT applies', 'One user\'s impressions are dependent, so the SE is understated; you need the delta method or a bootstrap by user', 'Only chi-square works for CTR', 'A one-sided t-test should be used instead of the z-test'], explain: 'The unit of observation (the impression) does not match the unit of randomization (the user). Treating dependent observations as independent makes the SE too small and produces many false positives. In an A/A test this shows up as "significant" results far more often than 5% of the time.' },
        { prompt: 'Marketing asks who should get a 10% discount coupon. From an uplift point of view, which segment pays off most?', options: ['Customers with the highest probability of buying', 'Customers who would not buy without the coupon but would buy with it', 'Customers who spent the most last month', 'All customers: the wider the reach, the better'], explain: 'Uplift = P(purchase | coupon) − P(purchase | no coupon). Giving a coupon to people who would buy anyway cuts the margin, and it does nothing for people who would never buy. The profit comes only from the "persuadable" segment.' }
      ]
    },
    'ab-gate': {
      title: 'Module exam: Inference & A/B Testing',
      body: `
<p>The final check. The exam tasks can be solved with the standard library (<code>math</code>, <code>statistics</code>, including <code>NormalDist</code>): write the formulas yourself. There are no hints: rely on the formulas from the module.</p>`,
      ex: [
        { prompt: 'Write the function <code>ab_decision(x_a, n_a, x_b, n_b, alpha=0.05)</code>. It runs a pooled two-proportion z-test and returns a dictionary: <code>"lift"</code> (p_B − p_A), <code>"z"</code>, <code>"p"</code> (two-sided) and <code>"decision"</code>: <code>"ship B"</code> if p &lt; alpha and lift &gt; 0, <code>"keep A"</code> if p &lt; alpha and lift &lt; 0, otherwise <code>"inconclusive"</code>.', check: { tests: '_d = ab_decision(200, 2000, 250, 2000)\nassert isinstance(_d, dict), "Return a dictionary"\nfor _k in ("lift", "z", "p", "decision"):\n    assert _k in _d, f"The key {_k} is missing"\nassert abs(_d["lift"] - 0.025) < 1e-9, "lift = p_b - p_a should be 0.025"\nassert abs(_d["z"] - 2.50196) < 1e-3, "z should be ≈ 2.502 (pooled SE)"\nassert abs(_d["p"] - 0.01235) < 1e-4, "p should be ≈ 0.0124"\nassert _d["decision"] == "ship B", "200/2000 vs 250/2000: ship B"\nassert ab_decision(250, 2000, 200, 2000)["decision"] == "keep A", "B is worse and it is significant: keep A"\nassert ab_decision(480, 10000, 540, 10000)["decision"] == "inconclusive", "p ≈ 0.054 > 0.05: inconclusive"\nassert ab_decision(480, 10000, 540, 10000, alpha=0.1)["decision"] == "ship B", "At alpha = 0.1, p ≈ 0.054 is significant: use the alpha parameter"' } },
        { prompt: 'Baseline 5%, MDE = 1 pp (absolute), α = 0.05, power = 0.8. Using the module\'s formula, compute the number needed per group, <code>n_per_group</code>, and, with 2 000 new users a day (split equally between the two groups), the number of full days the test needs, <code>days</code> (<code>math.ceil</code>).', check: { tests: 'assert n_per_group == 8155, f"n_per_group should be 8155, you have {n_per_group}"\nassert days == 9, f"days should be 9: 2 × 8155 / 2000 = 8.16 → 9, you have {days}"' } },
        { prompt: 'A test compares 4 variants (B, C, D, E) with the control, overall α = 0.05. With the Bonferroni correction, what is α for each comparison?', explain: 'α / m = 0.05 / 4 = 0.0125.' },
        { prompt: 'A/B test result: A — 50 400 users, B — 49 600 (a 50/50 split was planned), B has higher conversion, p = 0.01. What do you do first?', options: ['Ship B right away', 'Check for SRM: is 50 400 / 49 600 random, or is there a bug in the assignment?', 'Extend the test by another month', 'Lower α to 0.01'], explain: 'z = (50 400 − 50 000) / √(100 000 × 0.25) ≈ 2.53, p ≈ 0.011. The split is suspicious, so first find the cause of the SRM; otherwise the result cannot be trusted.' }
      ]
    }
  }
});
