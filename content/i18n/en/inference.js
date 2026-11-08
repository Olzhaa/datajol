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
    'ab-gate': {
      title: 'Module exam: Inference & A/B Testing',
      body: `
<p>The final check. In the Python exercises only the standard library is available (<code>math</code>, <code>statistics</code>, including <code>NormalDist</code>). There are no hints: rely on the formulas from the module.</p>`,
      ex: [
        { prompt: 'Write the function <code>ab_decision(x_a, n_a, x_b, n_b, alpha=0.05)</code>. It runs a pooled two-proportion z-test and returns a dictionary: <code>"lift"</code> (p_B − p_A), <code>"z"</code>, <code>"p"</code> (two-sided) and <code>"decision"</code>: <code>"ship B"</code> if p &lt; alpha and lift &gt; 0, <code>"keep A"</code> if p &lt; alpha and lift &lt; 0, otherwise <code>"inconclusive"</code>.', check: { tests: '_d = ab_decision(200, 2000, 250, 2000)\nassert isinstance(_d, dict), "Return a dictionary"\nfor _k in ("lift", "z", "p", "decision"):\n    assert _k in _d, f"The key {_k} is missing"\nassert abs(_d["lift"] - 0.025) < 1e-9, "lift = p_b - p_a should be 0.025"\nassert abs(_d["z"] - 2.50196) < 1e-3, "z should be ≈ 2.502 (pooled SE)"\nassert abs(_d["p"] - 0.01235) < 1e-4, "p should be ≈ 0.0124"\nassert _d["decision"] == "ship B", "200/2000 vs 250/2000: ship B"\nassert ab_decision(250, 2000, 200, 2000)["decision"] == "keep A", "B is worse and it is significant: keep A"\nassert ab_decision(480, 10000, 540, 10000)["decision"] == "inconclusive", "p ≈ 0.054 > 0.05: inconclusive"\nassert ab_decision(480, 10000, 540, 10000, alpha=0.1)["decision"] == "ship B", "At alpha = 0.1, p ≈ 0.054 is significant: use the alpha parameter"' } },
        { prompt: 'Baseline 5%, MDE = 1 pp (absolute), α = 0.05, power = 0.8. Using the module\'s formula, compute the number needed per group, <code>n_per_group</code>, and, with 2 000 new users a day (split equally between the two groups), the number of full days the test needs, <code>days</code> (<code>math.ceil</code>).', check: { tests: 'assert n_per_group == 8155, f"n_per_group should be 8155, you have {n_per_group}"\nassert days == 9, f"days should be 9: 2 × 8155 / 2000 = 8.16 → 9, you have {days}"' } },
        { prompt: 'A test compares 4 variants (B, C, D, E) with the control, overall α = 0.05. With the Bonferroni correction, what is α for each comparison?', explain: 'α / m = 0.05 / 4 = 0.0125.' },
        { prompt: 'A/B test result: A — 50 400 users, B — 49 600 (a 50/50 split was planned), B has higher conversion, p = 0.01. What do you do first?', options: ['Ship B right away', 'Check for SRM: is 50 400 / 49 600 random, or is there a bug in the assignment?', 'Extend the test by another month', 'Lower α to 0.01'], explain: 'z = (50 400 − 50 000) / √(100 000 × 0.25) ≈ 2.53, p ≈ 0.011. The split is suspicious, so first find the cause of the SRM; otherwise the result cannot be trusted.' }
      ]
    }
  }
});
