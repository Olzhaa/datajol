// M4.1 Probability: English text. Code, solutions and expected output are in content/probability.js.
DJ.i18n.patch({
  modules: {
    'm4-1': { intro: 'Probability is the language for describing uncertainty with numbers. We start with coins and dice and go all the way to business questions: conversion, fraud alerts, orders per hour and whether a promo pays off. You compute every formula by hand first, then in Python.' }
  },
  lessons: {
    'pr-1': {
      title: 'Probability basics and the sample space',
      body: `
<p><b>Probability</b> measures how likely an event is with a number from 0 to 1. 0 means it never happens, 1 means it is certain, 0.5 means one case out of two.</p>
<p>Three key ideas:</p>
<ul>
<li><b>Experiment</b>: an action whose result is not known in advance. Rolling a die, a customer visiting the site.</li>
<li><b>Sample space</b> (Ω): the set of all possible outcomes. For one die, Ω = {1, 2, 3, 4, 5, 6}.</li>
<li><b>Event</b>: a subset of Ω. "An even number came up" = {2, 4, 6}.</li>
</ul>
<p>If all outcomes are <b>equally likely</b>, the classical formula works:</p>
<pre><code>P(A) = number of favorable outcomes / number of all outcomes</code></pre>
<h3>Step-by-step example</h3>
<p>We roll two dice. What is the probability that the sum is 7?</p>
<ol>
<li>Sample space: the first die has 6 values, the second has 6, so 6 × 6 = 36 pairs in total.</li>
<li>Favorable pairs: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — 6 pairs.</li>
<li>P(sum = 7) = 6 / 36 = 1/6 ≈ 0.167.</li>
</ol>
<p>In Python, <code>itertools.product</code> builds the sample space, and <code>fractions.Fraction</code> keeps the fraction exact:</p>
<pre><code>from itertools import product
from fractions import Fraction
omega = list(product(range(1, 7), repeat=2))   # 36 pairs
fav = [w for w in omega if sum(w) == 7]
print(Fraction(len(fav), len(omega)))           # 1/6</code></pre>
<h3>The frequentist view</h3>
<p>What if outcomes are not equally likely? For example, "will the customer buy?" Then we estimate probability as a <b>frequency</b>: if 320 of 10,000 visitors buy, P(purchase) ≈ 320 / 10,000 = 0.032. This is the <b>frequentist</b> view: probability is the share of times an event happens when the experiment is repeated many times.</p>
<div class="tip"><b>Common mistakes:</b> (1) Counting (3,4) and (4,3) as one outcome: the dice are different, so these are two separate outcomes. (2) Using the classical formula where outcomes are not equally likely: "it will rain tomorrow or it won't" does not mean 50/50. (3) Getting a probability above 1 or below 0: that is a sign of an error in the calculation.</div>`,
      ex: [
        { prompt: 'Build the sample space of two dice in the list <code>omega</code> (<code>itertools.product</code>). Then store the probability that the sum is 10 or more as a <code>Fraction</code> in <code>p_high</code> and print it.', check: { tests: 'assert len(omega) == 36, "omega should have 36 pairs: product(range(1, 7), repeat=2)"\nassert p_high == Fraction(1, 6), "Sum ≥ 10: (4,6), (5,5), (6,4), (5,6), (6,5), (6,6) — 6/36 = 1/6"' }, hints: ['<code>omega = list(product(range(1, 7), repeat=2))</code>', 'Favorable pairs: <code>[w for w in omega if sum(w) &gt;= 10]</code>, then <code>Fraction(len(fav), len(omega))</code>.'] },
        { prompt: 'One die is rolled. What is the probability of the event "a number greater than 3 came up"? (as a decimal)', explain: 'Favorable: {4, 5, 6} — 3 outcomes. 3 / 6 = 0.5.' },
        { prompt: 'In September, 8,000 people visited an online store and 240 of them bought something. Which view does the statement P(purchase) ≈ 0.03 take?', options: ['Classical: all outcomes are equally likely', 'Frequentist: probability is the observed frequency', 'A subjective guess', 'This is not a probability'], explain: 'We took the observed share of the event (240 / 8,000) as an estimate of the probability. That is the frequentist view.' }
      ]
    },
    'pr-2': {
      title: 'Simulation with the random module and the law of large numbers',
      body: `
<p>Sometimes it is hard to derive a probability with a formula. Then we let the computer "play" the experiment thousands of times and count the frequency. This is <b>simulation</b> (the Monte Carlo method).</p>
<pre><code>import random
random.seed(42)              # make the result repeatable
random.random()              # random number 0 ≤ x &lt; 1
random.randint(1, 6)         # die: 1..6
random.choice(["H", "T"])    # coin</code></pre>
<p><code>random.seed</code> fixes the sequence of random numbers: the same seed gives the same result. This matters so that someone else can reproduce your analysis.</p>
<h3>Step-by-step example</h3>
<p>Question: does the share of "heads" get close to 0.5 when we toss a coin?</p>
<pre><code>import random
random.seed(1)
def share_heads(n):
    heads = 0
    for _ in range(n):
        if random.random() &lt; 0.5:   # "heads" with a 50% chance
            heads += 1
    return heads / n

for n in (10, 100, 1000, 100000):
    print(n, share_heads(n))</code></pre>
<ol>
<li><code>random.random() &lt; 0.5</code> is the standard way to say "yes with probability p". If p = 0.03, write <code>&lt; 0.03</code>.</li>
<li>Each time we get a "yes", we increase the counter.</li>
<li>At the end we divide the counter by n to get the frequency.</li>
</ol>
<p>The result looks roughly like this: at n = 10 a "jumpy" number like 0.3 or 0.7, at n = 100,000 it is 0.50x. This is the <b>law of large numbers</b>: as the number of trials grows, the frequency gets closer to the true probability.</p>
<h3>Why it matters in business</h3>
<p>If 20 visitors came in one day and 3 bought, don't rush to say conversion is 15%: with little data the frequency swings a lot. With 20,000 visitors you can trust the estimate. In the next module (A/B testing) we put a number on "how sure are we".</p>
<div class="tip"><b>Common mistakes:</b> (1) Not setting a seed: every run gives a different result, which makes bugs hard to find. (2) Calling <code>random.seed</code> inside a loop: the same number repeats at every step. (3) The gambler's fallacy: after 5 "heads" in a row, the next toss is not "due" to be "tails". The coin has no memory, and the law of large numbers only works in the long run.</div>`,
      ex: [
        { prompt: 'Write a function <code>simulate(n, p)</code>: it plays the experiment "a purchase with probability p" n times using <code>random.random()</code> and returns the share of purchases (0..1). Do not set a seed inside the function.', check: { tests: 'import random as _r\n_r.seed(7)\n_v = simulate(100000, 0.03)\nassert isinstance(_v, float), "Return the share (a float): count / n"\nassert abs(_v - 0.03) < 0.003, f"Over 100,000 trials the share should be close to 0.03, you have {_v}"\nassert simulate(1000, 0) == 0, "If p = 0, the share is 0"\nassert simulate(1000, 1) == 1, "If p = 1, the share is 1"' }, hints: ['If <code>if random.random() &lt; p:</code> is true, increase the counter.', 'At the end, <code>return count / n</code>.'] },
        { prompt: 'Set <code>random.seed(42)</code> and roll two dice 60,000 times (<code>random.randint(1, 6)</code>). Store the share of rolls where the sum is 7 in <code>p_hat</code> and print it. It should be close to 1/6 ≈ 0.167.', check: { tests: 'assert 0 <= p_hat <= 1, "p_hat is a share, between 0 and 1"\nassert abs(p_hat - 1 / 6) < 0.01, f"p_hat should be close to 1/6 ≈ 0.1667, you have {p_hat}"' }, hints: ['In the loop, check <code>random.randint(1, 6) + random.randint(1, 6) == 7</code>.', '<code>p_hat = hits / N</code>'] },
        { prompt: 'On its first day a new cafe sold dessert to 6 of 12 visitors. The manager says: "Dessert conversion is 50%." Which opinion is right?', options: ['Right, frequency is probability', '12 visitors is too few: the frequency swings a lot, you need more data to trust the estimate', 'Conversion will be 6%', 'By the law of large numbers it will be 0% tomorrow'], explain: 'The law of large numbers says frequency approaches probability only over many trials. 12 observations give a noisy estimate.' }
      ]
    },
    'pr-3': {
      title: 'The addition rule and the complement',
      body: `
<p>When we combine events, two questions come up often: "A <b>or</b> B" and "<b>not</b> A".</p>
<h3>The complement</h3>
<pre><code>P(not A) = 1 − P(A)</code></pre>
<p>If the probability that a customer churns is 0.2, the probability that they stay is 0.8. Simple, but a very powerful tool for "at least once" questions.</p>
<h3>The addition rule</h3>
<pre><code>P(A or B) = P(A) + P(B) − P(A and B)</code></pre>
<p>Why subtract? Outcomes that belong to both events get counted twice. If A and B cannot happen at the same time (<b>mutually exclusive</b>), P(A and B) = 0 and the rule becomes a plain sum.</p>
<h3>Step-by-step example</h3>
<p>Customer base: 40% use the mobile app (M), 30% open emails (E), 12% do both.</p>
<table>
<tr><th>Question</th><th>Calculation</th><th>Answer</th></tr>
<tr><td>M or E</td><td>0.40 + 0.30 − 0.12</td><td>0.58</td></tr>
<tr><td>Neither</td><td>1 − 0.58</td><td>0.42</td></tr>
<tr><td>Only M (no E)</td><td>0.40 − 0.12</td><td>0.28</td></tr>
</table>
<p>So we cannot reach 42% of customers through either of the two channels. That is why a third channel such as SMS is needed.</p>
<h3>The "at least one" trick</h3>
<p>A site has 5 servers, and each fails on a given day with probability 2% (independently of each other). What is the probability that at least one fails?</p>
<ol>
<li>Counting directly is hard: one, two, ... five.</li>
<li>Take the complement: "none fails" = 0.98 × 0.98 × 0.98 × 0.98 × 0.98 = 0.98⁵ ≈ 0.904.</li>
<li>P(at least one) = 1 − 0.904 ≈ 0.096, about 10%.</li>
</ol>
<p>2% looks small for one server, but for five together it is 10%. We look at independence in more detail in the next lesson.</p>
<div class="tip"><b>Common mistakes:</b> (1) Not subtracting the overlap: 0.40 + 0.30 = 0.70 is wrong, the shared 12% was counted twice. (2) Simply adding probabilities for "at least one": 5 × 0.02 = 0.10 is close, but with 60 servers you would get 1.2, and a probability cannot exceed 1. (3) Confusing "independent" with "mutually exclusive": these are completely different ideas.</div>`,
      ex: [
        { prompt: 'Write a function <code>p_at_least_one(p, n)</code>: it returns the probability that an event happens <b>at least once</b> in n independent trials, each with probability p. Use the complement rule.', check: { tests: 'assert abs(p_at_least_one(0.02, 5) - (1 - 0.98 ** 5)) < 1e-9, "p_at_least_one(0.02, 5) ≈ 0.0961: 1 − (1 − p) ** n"\nassert abs(p_at_least_one(0.5, 1) - 0.5) < 1e-9, "With one trial the answer is p itself"\nassert abs(p_at_least_one(0.02, 60) - (1 - 0.98 ** 60)) < 1e-9, "Even with 60 servers it must not exceed 1: don\'t just add"' }, hints: ['The probability of "never": <code>(1 - p) ** n</code>.', 'Answer: <code>1 - (1 - p) ** n</code>'] },
        { prompt: 'P(A) = 0.3, P(B) = 0.4, P(A and B) = 0.1. What is P(A or B)?', explain: '0.3 + 0.4 − 0.1 = 0.6.' },
        { prompt: 'In one order a customer can choose either "delivery to Almaty" or "delivery to Astana", but not both. What kind of events are these?', options: ['Independent', 'Mutually exclusive: P(both) = 0', 'Complements', 'Conditional'], explain: 'They cannot happen at the same time, so the overlap is 0 and P(A or B) = P(A) + P(B).' }
      ]
    },
    'pr-4': {
      title: 'Conditional probability and independence',
      body: `
<p><b>Conditional probability</b> P(A | B) is "the probability of A when we know B happened". The vertical bar reads "given".</p>
<pre><code>P(A | B) = P(A and B) / P(B)</code></pre>
<p>Meaning: we no longer look at all the data, only at the rows where B happened, and count the share of A among them.</p>
<h3>Step-by-step example: a 2×2 table</h3>
<p>A store sent a promo email to 1,000 of its 2,000 customers. The result a week later:</p>
<table>
<tr><th></th><th>Bought</th><th>Did not buy</th><th>Total</th></tr>
<tr><td>Got the email</td><td>120</td><td>880</td><td>1 000</td></tr>
<tr><td>No email</td><td>60</td><td>940</td><td>1 000</td></tr>
<tr><td><b>Total</b></td><td>180</td><td>1 820</td><td>2 000</td></tr>
</table>
<ol>
<li>P(purchase) = 180 / 2,000 = 0.09.</li>
<li>P(purchase | email) = 120 / 1,000 = 0.12. We look only at the "Got the email" row.</li>
<li>P(purchase | no email) = 60 / 1,000 = 0.06.</li>
<li>Check with the formula: P(purchase and email) = 120 / 2,000 = 0.06, P(email) = 0.5, 0.06 / 0.5 = 0.12. It matches.</li>
</ol>
<h3>Independence</h3>
<p>A and B are <b>independent</b> if knowing B does not change the probability of A:</p>
<pre><code>P(A | B) = P(A)   or   P(A and B) = P(A) × P(B)</code></pre>
<p>In our example P(purchase | email) = 0.12 ≠ 0.09, so purchase depends on the email. Tossing a coin several times is the classic example of independence.</p>
<p>In Python it is handy to store the table in a dictionary:</p>
<pre><code>t = {("email", "buy"): 120, ("email", "no"): 880,
     ("none", "buy"): 60,   ("none", "no"): 940}
row = t[("email", "buy")] + t[("email", "no")]
print(t[("email", "buy")] / row)   # 0.12</code></pre>
<div class="tip"><b>Common mistakes:</b> (1) Confusing P(A | B) with P(B | A): P(email | purchase) = 120 / 180 ≈ 0.67, not 0.12. (2) Putting all the data in the denominator: in a conditional probability the denominator is the number of rows of the condition (B). (3) As with correlation, dependence is not causation: check whether you sent the email only to active customers.</div>`,
      ex: [
        { prompt: 'The table <code>t</code> shows how device and churn are related. Compute: <code>p_churn</code> (overall), <code>p_churn_mobile</code> = P(churn | mobile), <code>p_churn_web</code> = P(churn | web), and <code>independent</code> — is churn independent of the device (<code>True</code>/<code>False</code>; compare the conditional and overall probability to within 0.001).', check: { tests: 'assert abs(p_churn - 0.13) < 1e-9, "p_churn = 130 / 1000 = 0.13"\nassert abs(p_churn_mobile - 0.15) < 1e-9, "P(churn | mobile) = 90 / 600 = 0.15: the denominator is the number of mobile rows"\nassert abs(p_churn_web - 0.10) < 1e-9, "P(churn | web) = 40 / 400 = 0.10"\nassert independent is False, "0.15 ≠ 0.13, so not independent: independent = False"' }, hints: ['Number of mobile rows: <code>t[("mobile", "churn")] + t[("mobile", "stay")]</code> = 600.', '<code>independent = abs(p_churn_mobile - p_churn) &lt; 0.001</code>'] },
        { prompt: 'Using the <code>users</code> and <code>events</code> tables, compute P(purchase | channel) for each channel (<code>channel</code>). Columns: <code>channel</code>, <code>n</code> (number of users), <code>p_purchase</code> (share who bought, as a decimal). Sort by <code>channel</code>.', hints: ['<code>LEFT JOIN</code> <code>events</code> onto <code>users</code> and add <code>e.step = \'purchase\'</code> to the join condition.', 'Share: <code>AVG(CASE WHEN e.user_id IS NOT NULL THEN 1.0 ELSE 0 END)</code>.'] },
        { prompt: 'In the promo email table, what is P(email | purchase)?', options: ['0.12', '120 / 180 ≈ 0.67', '0.09', '0.5'], explain: 'The condition is "bought", so the denominator is 180 (everyone who bought), and 120 of them got the email.' }
      ]
    },
    'pr-5': {
      title: 'Bayes\' theorem and the base rate',
      body: `
<p>Bayes' theorem "flips" a conditional probability: if we know P(B | A), it finds P(A | B).</p>
<pre><code>P(A | B) = P(B | A) × P(A) / P(B)</code></pre>
<p>The most common use: "the test (or model) came back positive — is the person really sick (a fraudster)?"</p>
<ul>
<li><b>Prior</b> P(A): the probability before the test, i.e. the <b>base rate</b> (how common the disease is).</li>
<li><b>Sensitivity</b> P(+ | sick): how often the test catches the disease.</li>
<li><b>False positive rate</b> P(+ | healthy): how often the test wrongly says "positive" for a healthy person.</li>
<li><b>Posterior</b> P(sick | +): the number we actually care about.</li>
</ul>
<h3>Step-by-step example: 10,000 people</h3>
<p>The disease affects 1% of people. The test has 90% sensitivity and a 5% false positive rate. Instead of the formula, let's count real people:</p>
<table>
<tr><th></th><th>Test +</th><th>Test −</th><th>Total</th></tr>
<tr><td>Sick</td><td>90</td><td>10</td><td>100</td></tr>
<tr><td>Healthy</td><td>495</td><td>9 405</td><td>9 900</td></tr>
<tr><td><b>Total</b></td><td>585</td><td>9 415</td><td>10 000</td></tr>
</table>
<ol>
<li>Sick: 10,000 × 0.01 = 100. 90% of them test +: 90.</li>
<li>Healthy: 9,900. 5% of them get a false +: 495.</li>
<li>All positive results: 90 + 495 = 585.</li>
<li>P(sick | +) = 90 / 585 ≈ 0.154. Only 15%!</li>
</ol>
<p>Even though the test is "90% accurate", most positive results come from healthy people, because there are far more healthy people. This is the <b>base rate</b> effect.</p>
<h3>In Python</h3>
<pre><code>def posterior(prior, sens, fpr):
    p_pos = sens * prior + fpr * (1 - prior)   # P(+)
    return sens * prior / p_pos</code></pre>
<p>Business has exactly the same thing: fraud alerts, spam filters, churn models. If fraud is 0.5% of transactions, most alerts from a "99% accurate" model can be false. That is why you should show the team the number "when an alert fires, what is the chance it is real fraud?".</p>
<div class="tip"><b>Common mistakes:</b> (1) Reading sensitivity as the posterior: P(+ | sick) = 0.9, but P(sick | +) = 0.15. (2) Forgetting the base rate (the base rate fallacy). (3) Leaving out the false positives of healthy people when computing P(+).</div>`,
      ex: [
        { prompt: 'Write a function <code>posterior(prior, sens, fpr)</code> that returns P(A | +). Then compute it for a fraud alert: fraud is 0.5%, the model catches 99% of fraud and raises a false alert on 2% of normal transactions. Store the result in <code>p_fraud</code>.', check: { tests: 'assert abs(posterior(0.01, 0.9, 0.05) - 90 / 585) < 1e-9, "posterior(0.01, 0.9, 0.05) should be ≈ 0.154 (the lesson example)"\nassert abs(posterior(0.5, 0.8, 0.2) - 0.8) < 1e-9, "With prior 0.5, sens 0.8, fpr 0.2 the posterior is 0.8"\nassert p_fraud is not None and abs(p_fraud - 0.1992) < 0.001, "p_fraud ≈ 0.199: posterior(0.005, 0.99, 0.02)"' }, hints: ['First P(+) = <code>sens * prior + fpr * (1 - prior)</code>.', '<code>p_fraud = posterior(0.005, 0.99, 0.02)</code>'] },
        { prompt: 'Of 10,000 transactions, 50 are fraud. The model caught 40 of them and raised false alerts on 160 normal transactions. When an alert fires, what is the probability it is real fraud? (as a decimal)', explain: 'All alerts: 40 + 160 = 200. Real fraud: 40. 40 / 200 = 0.2.' },
        { prompt: 'Why can most alerts of a "99% accurate" fraud model be false?', options: ['The model is badly trained', 'Fraud is very rare (low base rate), so even a small share of false alerts on normal transactions outnumbers the real alerts', 'Bayes\' theorem does not apply to business', 'The alerts are random'], explain: 'Normal transactions are thousands of times more numerous. Even 1–2% of them exceed the total number of real fraud cases.' }
      ]
    },
    'pr-6': {
      title: 'Combinatorics: permutations and combinations',
      body: `
<p>Classical probability needs us to count outcomes. When there are millions of outcomes we cannot list them, so we need formulas.</p>
<h3>The multiplication rule</h3>
<p>If one choice has a options and another has b options, there are a × b in total. T-shirt: 3 colors × 4 sizes = 12 options. 4-digit PIN code: 10 × 10 × 10 × 10 = 10,000.</p>
<h3>Factorial and permutations</h3>
<p>The number of ways to arrange n items <b>in order</b>: n! = n × (n − 1) × ... × 1. Arranging 3 banners on a page: 3! = 6 ways.</p>
<p>Choosing k items out of n <b>in order</b> (permutations):</p>
<pre><code>P(n, k) = n! / (n − k)!
math.perm(10, 3)   # 720: 1st, 2nd and 3rd place among 10 candidates</code></pre>
<h3>Combinations: order does not matter</h3>
<pre><code>C(n, k) = n! / (k! × (n − k)!)
math.comb(10, 3)   # 120: a group of 3 people out of 10</code></pre>
<p>The difference: "winner, second, third" — order matters (perm). "A committee of three" — order does not matter (comb). Each group of 3 can be written in order 3! = 6 ways, so 720 / 6 = 120.</p>
<h3>Step-by-step example</h3>
<p>A warehouse has 12 items, 3 of them defective. 4 random items were checked. What is the probability of finding exactly 1 defective item?</p>
<ol>
<li>All ways: choose 4 of 12, order does not matter: C(12, 4) = 495.</li>
<li>Favorable: choose 1 of the 3 defective × 3 of the 9 good = C(3, 1) × C(9, 3) = 3 × 84 = 252.</li>
<li>P = 252 / 495 ≈ 0.509.</li>
</ol>
<pre><code>import math
p = math.comb(3, 1) * math.comb(9, 3) / math.comb(12, 4)
print(round(p, 3))   # 0.509</code></pre>
<p>This formula is also the basis of the Binomial distribution in the next lesson: "which k of n trials were successful" is C(n, k).</p>
<div class="tip"><b>Common mistakes:</b> (1) Decide first whether order matters. If you mix them up, the answer is off by a factor of k!. (2) Not checking whether repetition is allowed: in a PIN code digits can repeat (10⁴), but in race places one person cannot take two places (perm). (3) Mixing up <code>math.comb(n, k)</code> and <code>math.comb(k, n)</code>: if k &gt; n, the result is 0.</div>`,
      ex: [
        { prompt: 'Compute with the <code>math</code> module: <code>teams</code> — the number of ways to form a 4-person project team from 15 employees; <code>podium</code> — the number of ways to hand out 1st, 2nd and 3rd place among 8 teams; <code>pins</code> — the number of 4-digit PIN codes (0–9, repetition allowed).', check: { tests: 'assert teams == 1365, "teams: order does not matter — math.comb(15, 4) = 1365"\nassert podium == 336, "podium: order matters — math.perm(8, 3) = 336"\nassert pins == 10000, "pins: 10 digits for each position, 10 ** 4"' }, hints: ['A team is combinations, places are permutations.', 'PIN: the multiplication rule, <code>10 ** 4</code>.'] },
        { prompt: 'Write a function <code>p_defects(N, D, n, k)</code>: D of N items are defective; n items are taken at random; it returns the probability of finding exactly k defective items, using <code>math.comb</code>.', check: { tests: 'assert abs(p_defects(12, 3, 4, 1) - 252 / 495) < 1e-9, "p_defects(12, 3, 4, 1) ≈ 0.509 (the lesson example)"\nassert abs(p_defects(12, 3, 4, 0) - 126 / 495) < 1e-9, "k = 0: C(9, 4) / C(12, 4)"\nassert abs(sum(p_defects(20, 5, 6, _k) for _k in range(6)) - 1) < 1e-9, "The probabilities over all k should add up to 1"' }, hints: ['Choose k of the defective: <code>math.comb(D, k)</code>, the rest from the good ones: <code>math.comb(N - D, n - k)</code>.', 'Denominator: <code>math.comb(N, n)</code>.'] },
        { prompt: 'You need to pick 3 of 8 products for an ad (order does not matter). How many ways are there?', explain: 'C(8, 3) = 8 × 7 × 6 / (3 × 2 × 1) = 56.' }
      ]
    },
    'pr-7': {
      title: 'The Bernoulli and Binomial distributions',
      body: `
<p>A <b>random variable</b> is a rule that assigns a number to the outcome of an experiment. "Did the visitor buy?" → 1 or 0. "How many purchases out of 100 visitors?" → 0..100.</p>
<h3>Bernoulli</h3>
<p>One trial, two outcomes: success (1) with probability p, failure (0) with probability 1 − p. Conversion, opening an email, repaying a loan — all Bernoulli.</p>
<h3>Binomial</h3>
<p>The number of successes in n independent Bernoulli trials is X ~ Binomial(n, p). Its <b>pmf</b> (probability mass function — the probability of each value):</p>
<pre><code>P(X = k) = C(n, k) × p^k × (1 − p)^(n − k)</code></pre>
<p>Meaning: one specific sequence of k successes and n − k failures has probability p^k (1 − p)^(n − k), and there are C(n, k) such sequences.</p>
<h3>Step-by-step example: by hand</h3>
<p>Conversion is 10%. 4 visitors. What is the probability of exactly 1 purchase?</p>
<ol>
<li>One sequence, for example "yes, no, no, no": 0.1 × 0.9 × 0.9 × 0.9 = 0.0729.</li>
<li>The buyer can be any of the 4 people: C(4, 1) = 4 sequences.</li>
<li>P(X = 1) = 4 × 0.0729 = 0.2916.</li>
</ol>
<h3>In Python</h3>
<pre><code>import math
def binom_pmf(k, n, p):
    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)

binom_pmf(1, 4, 0.1)                              # 0.2916
sum(binom_pmf(k, 4, 0.1) for k in range(5))       # 1.0</code></pre>
<p>For "at least k" questions the complement is handy: P(X ≥ 3) = 1 − P(X = 0) − P(X = 1) − P(X = 2).</p>
<p>The Binomial mean is n × p and the variance is n × p × (1 − p). With 200 visitors and 5% conversion, we expect 10 purchases on average.</p>
<div class="tip"><b>Common mistakes:</b> (1) Forgetting C(n, k) and computing only one sequence. (2) Using the Binomial where independence is broken: 5 people from one family are not independent. (3) Taking only P(X = 3) for "at least 3". "At least" is the sum over 3, 4, ..., n.</div>`,
      ex: [
        { prompt: 'Write a function <code>binom_pmf(k, n, p)</code> using <code>math.comb</code>.', check: { tests: 'assert abs(binom_pmf(1, 4, 0.1) - 0.2916) < 1e-9, "binom_pmf(1, 4, 0.1) = 0.2916: did you forget C(n, k)?"\nassert abs(binom_pmf(2, 4, 0.5) - 0.375) < 1e-9, "binom_pmf(2, 4, 0.5) = 0.375"\nassert abs(sum(binom_pmf(_k, 10, 0.3) for _k in range(11)) - 1) < 1e-9, "The sum over all k should be 1"' }, hints: ['Formula: <code>math.comb(n, k) * p ** k * (1 - p) ** (n - k)</code>'] },
        { prompt: 'The chance that an email is opened is 10%. We sent it to 20 people. <code>p_at_least_3</code> — the probability that at least 3 people open it, <code>expected</code> — the expected number of opens (n × p). Use the complement.', check: { tests: 'assert abs(p_at_least_3 - 0.3231) < 0.0005, "p_at_least_3 ≈ 0.323: 1 − (P(0) + P(1) + P(2))"\nassert abs(expected - 2) < 1e-9, "expected = n × p = 2"' }, hints: ['First write the <code>binom_pmf</code> function (previous exercise).', '<code>1 - sum(binom_pmf(k, n, p) for k in range(3))</code>'] },
        { prompt: 'A coin is tossed 4 times. What is the probability of exactly 2 "heads"?', explain: 'C(4, 2) × 0.5² × 0.5² = 6 × 0.0625 = 0.375.' }
      ]
    },
    'pr-8': {
      title: 'The Poisson distribution: orders per hour',
      body: `
<p>In the Binomial, the number of trials n is known. But for questions like "how many orders arrive in an hour?" or "how many support tickets per day?" there is no n: events arrive randomly over time. Counts like these are described by the <b>Poisson</b> distribution.</p>
<p>X ~ Poisson(λ), where <b>λ</b> (lambda) is the average number of events in one interval.</p>
<pre><code>P(X = k) = λ^k × e^(−λ) / k!</code></pre>
<p>Properties: the mean is λ, and the variance is also λ. Values are 0, 1, 2, ... (no upper limit).</p>
<h3>When to use it</h3>
<ul>
<li>Events arrive independently of each other.</li>
<li>The average rate is constant (don't mix the lunch hour with a night hour).</li>
<li>Two events don't arrive at exactly the same moment.</li>
</ul>
<h3>Step-by-step example</h3>
<p>A cafe gets 4 online orders per hour on average (λ = 4). What is the probability of no orders at all in an hour, and of more than 6?</p>
<ol>
<li>P(X = 0) = 4⁰ × e⁻⁴ / 0! = e⁻⁴ ≈ 0.0183. About 2%.</li>
<li>P(X = 1) = 4 × e⁻⁴ ≈ 0.0733, P(X = 2) = 16 × e⁻⁴ / 2 ≈ 0.1465, ...</li>
<li>P(X ≤ 6) — the sum from 0 to 6 ≈ 0.889.</li>
<li>P(X &gt; 6) = 1 − 0.889 ≈ 0.111. About 11% of hours have more than 6 orders.</li>
</ol>
<pre><code>import math
def poisson_pmf(k, lam):
    return lam ** k * math.exp(-lam) / math.factorial(k)

p_le6 = sum(poisson_pmf(k, 4) for k in range(7))
print(round(1 - p_le6, 3))   # 0.111</code></pre>
<p>Business takeaway: if one courier can deliver 6 orders an hour, about 11% of hours will have delays. Whether a second courier is needed can now be discussed with numbers.</p>
<h3>Changing the interval</h3>
<p>λ is proportional to the length of the interval: if it is 4 per hour, then for 30 minutes λ = 2, and for a day (10 hours) λ = 40.</p>
<div class="tip"><b>Common mistakes:</b> (1) Not matching λ to the interval: if the question is about 30 minutes, scale λ to 30 minutes too. (2) Using <code>range(6)</code> for "more than 6": P(X &gt; 6) = 1 − P(X ≤ 6), and X ≤ 6 needs <code>range(7)</code>. (3) Using Poisson without checking on data where the mean and variance differ a lot (for example, promo days).</div>`,
      ex: [
        { prompt: 'Write a function <code>poisson_pmf(k, lam)</code> (<code>math.exp</code>, <code>math.factorial</code>).', check: { tests: 'import math as _m\nassert abs(poisson_pmf(0, 4) - _m.exp(-4)) < 1e-12, "poisson_pmf(0, 4) = e^(−4) ≈ 0.0183"\nassert abs(poisson_pmf(2, 4) - 8 * _m.exp(-4)) < 1e-12, "poisson_pmf(2, 4) = 16 × e^(−4) / 2 ≈ 0.1465"\nassert abs(sum(poisson_pmf(_k, 3) for _k in range(60)) - 1) < 1e-9, "The sum over all k should be ≈ 1"' }, hints: ['<code>lam ** k * math.exp(-lam) / math.factorial(k)</code>'] },
        { prompt: 'The support team gets 5 tickets per hour on average. <code>p_over8</code> — the probability of <b>more than</b> 8 tickets in an hour. <code>p_zero_30min</code> — the probability of no tickets at all in 30 minutes (scale λ to the interval).', check: { tests: 'import math as _m\nassert abs(p_over8 - 0.0681) < 0.0005, "p_over8 ≈ 0.068: 1 − P(X ≤ 8), and X ≤ 8 needs range(9)"\nassert abs(p_zero_30min - _m.exp(-2.5)) < 1e-9, "For 30 minutes λ = 2.5, P(0) = e^(−2.5) ≈ 0.082"' }, hints: ['More than 8 = 1 − P(X ≤ 8), i.e. <code>range(9)</code>.', '30 minutes is half an hour: λ = 5 / 2.'] },
        { prompt: 'Which quantity is most reasonable to model with a Poisson distribution?', options: ['The number of buyers among 100 visitors', 'The number of calls to a call center in an hour', 'A customer\'s height', 'The order amount (in tenge)'], explain: 'The number of independent events in a time interval is Poisson. 100 visitors (known n) is Binomial; height and amount are continuous quantities.' }
      ]
    },
    'pr-9': {
      title: 'Continuous distributions: uniform and NormalDist',
      body: `
<p>The number of orders is <b>discrete</b> (0, 1, 2, ...). But delivery time, height and amount are <b>continuous</b>: 40.0, 40.01, 40.013 ... minutes. For a continuous variable the probability of any single exact value is 0, so we ask about the probability of <b>intervals</b>: P(35 &lt; X &lt; 45).</p>
<p>For this we use the <b>CDF</b> (cumulative distribution function): F(x) = P(X ≤ x). An interval: P(a &lt; X ≤ b) = F(b) − F(a).</p>
<h3>The uniform distribution</h3>
<p>All values in [a, b] are equally likely. A bus comes every 20 minutes and you arrive at a random time: the waiting time is Uniform(0, 20). P(X ≤ x) = (x − a) / (b − a). Waiting less than 5 minutes: 5 / 20 = 0.25.</p>
<h3>The Normal distribution: statistics.NormalDist</h3>
<p>The 68–95–99.7 rule from M3.1 is approximate. For an exact number, Python has a ready-made class:</p>
<pre><code>from statistics import NormalDist
d = NormalDist(mu=40, sigma=5)   # delivery time, min
d.cdf(45)          # P(X ≤ 45) ≈ 0.841
d.inv_cdf(0.95)    # 95% of orders are faster than this: ≈ 48.2</code></pre>
<p><code>cdf</code> goes from a value to a probability, <code>inv_cdf</code> the other way: from a probability to a value (a percentile).</p>
<h3>Step-by-step example</h3>
<p>Delivery time is NormalDist(40, 5). The promise is 50 minutes. What percentage is late, and what promise covers 95% of orders?</p>
<ol>
<li>Late: P(X &gt; 50) = 1 − cdf(50). z = (50 − 40) / 5 = 2, cdf(50) ≈ 0.9772.</li>
<li>1 − 0.9772 = 0.0228: about 2.3% (the rule said 2.5%, the exact value is 2.28%).</li>
<li>The 95% promise: inv_cdf(0.95) ≈ 48.2 minutes.</li>
<li>Interval: P(35 &lt; X ≤ 45) = cdf(45) − cdf(35) ≈ 0.841 − 0.159 = 0.683.</li>
</ol>
<div class="tip"><b>Common mistakes:</b> (1) Using <code>cdf</code> itself for a "more than X" question: you need <code>1 - cdf(x)</code>. (2) Passing the variance instead of <code>sigma</code>: NormalDist expects the SD. (3) Modeling skewed data (salary, amount) as Normal — look at a histogram first.</div>`,
      ex: [
        { prompt: 'Delivery time is <code>NormalDist(mu=40, sigma=5)</code>. Compute: <code>p_late</code> — the probability that delivery takes longer than 50 minutes; <code>p_window</code> — between 35 and 45 minutes; <code>promise_95</code> — the number of minutes within which 95% of orders arrive.', check: { tests: 'assert abs(p_late - 0.02275) < 0.0001, "p_late ≈ 0.0228: 1 − d.cdf(50)"\nassert abs(p_window - 0.6827) < 0.0001, "p_window ≈ 0.683: d.cdf(45) − d.cdf(35)"\nassert abs(promise_95 - 48.224) < 0.01, "promise_95 ≈ 48.2: d.inv_cdf(0.95)"' }, hints: ['"Longer" is the right tail: <code>1 - d.cdf(50)</code>.', 'Percentile: <code>d.inv_cdf(0.95)</code>.'] },
        { prompt: 'A courier arrives at a random time between 0 and 30 minutes (Uniform). What is the probability that they arrive before 12 minutes?', explain: '(12 − 0) / (30 − 0) = 0.4.' },
        { prompt: 'What does <code>NormalDist(100, 15).inv_cdf(0.9)</code> return?', options: ['The probability of being below 100', 'The point below which 90% of values lie (the 90th percentile) ≈ 119', 'The probability of the value 0.9', 'The standard deviation'], explain: 'inv_cdf goes from a probability to a value: the x where P(X ≤ x) = 0.9 is ≈ 100 + 1.28 × 15 ≈ 119.' }
      ]
    },
    'pr-10': {
      title: 'Expected value and variance: does the promo pay off?',
      body: `
<p>The <b>expected value</b> (E[X]) is the "long-run average" of a random variable: multiply each value by its probability and add them up.</p>
<pre><code>E[X] = Σ x × P(X = x)
Var(X) = Σ (x − E[X])² × P(X = x)</code></pre>
<p>Variance and SD (√Var) measure risk: of two decisions with the same mean, one can be far more "jumpy".</p>
<pre><code>def expected_value(dist):          # dist: {value: probability}
    return sum(x * p for x, p in dist.items())

def variance(dist):
    m = expected_value(dist)
    return sum((x - m) ** 2 * p for x, p in dist.items())</code></pre>
<h3>Step-by-step example: does the promo pay off?</h3>
<p>An online store. Conversion is 5% now, and the margin per sale is 4,000 ₸. Marketing proposes a 1,000 ₸ discount: the forecast says conversion will grow to 7%.</p>
<table>
<tr><th></th><th>No promo</th><th>With promo</th></tr>
<tr><td>P(purchase)</td><td>0.05</td><td>0.07</td></tr>
<tr><td>Margin (if sold)</td><td>4 000 ₸</td><td>3 000 ₸</td></tr>
<tr><td>E[profit / visitor]</td><td>0.05 × 4 000 = 200 ₸</td><td>0.07 × 3 000 = 210 ₸</td></tr>
</table>
<ol>
<li>Each visitor is a random variable: the margin with probability p, otherwise 0.</li>
<li>E[no promo] = 200 ₸, E[with promo] = 210 ₸. The difference is +10 ₸ per visitor.</li>
<li>With 50,000 visitors a month: 50,000 × 10 = +500,000 ₸.</li>
<li>But if conversion grows only to 6.5%: 0.065 × 3,000 = 195 ₸ &lt; 200 ₸ — the promo loses money. The decision is very sensitive to the forecast, so run an A/B test first (M4.2).</li>
</ol>
<h3>A variance example</h3>
<p>No promo: X ∈ {0, 4 000}, P = {0.95, 0.05}. Var = 0.95 × 200² + 0.05 × 3 800² = 760 000, SD ≈ 872 ₸. Profit from one visitor is very noisy, but over thousands of visitors the average gets close to E[X] (the law of large numbers).</p>
<div class="tip"><b>Common mistakes:</b> (1) Not checking that the probabilities add up to 1. (2) Forgetting to subtract the discount from the margin. (3) Looking only at E[X] and ignoring risk (SD): if E[X] is the same, the more stable option may be better.</div>`,
      ex: [
        { prompt: 'Write the functions <code>expected_value(dist)</code> and <code>variance(dist)</code>. <code>dist</code> is a dictionary <code>{value: probability}</code>.', check: { tests: '_d = {0: 0.95, 4000: 0.05}\nassert abs(expected_value(_d) - 200) < 1e-9, "E[X] = 0.05 × 4000 = 200"\nassert abs(variance(_d) - 760000) < 1e-6, "Var(X) = 760,000: the sum of (x − E[X])² × p"\n_die = {_k: 1 / 6 for _k in range(1, 7)}\nassert abs(expected_value(_die) - 3.5) < 1e-9, "For a die, E[X] = 3.5"\nassert abs(variance(_die) - 35 / 12) < 1e-9, "For a die, Var(X) = 35/12 ≈ 2.917"' }, hints: ['<code>sum(x * p for x, p in dist.items())</code>', 'For the variance, first <code>m = expected_value(dist)</code>.'] },
        { prompt: 'The promo decision. No promo: 5% conversion, 4,000 ₸ margin. With promo: 6.5% conversion, a 1,000 ₸ discount (3,000 ₸ margin). <code>ev_base</code>, <code>ev_promo</code> — expected profit per visitor; <code>monthly_diff</code> — the difference for 50,000 visitors (<code>ev_promo - ev_base</code> × 50,000); <code>launch</code> — <code>True</code> if the promo pays off.', check: { tests: 'assert abs(ev_base - 200) < 1e-9, "ev_base = 0.05 × 4000 = 200"\nassert abs(ev_promo - 195) < 1e-9, "ev_promo = 0.065 × 3000 = 195: subtract the discount from the margin"\nassert abs(monthly_diff + 250000) < 1e-6, "monthly_diff = (195 − 200) × 50,000 = −250,000"\nassert launch is False, "195 < 200, the promo does not pay off: launch = False"' }, hints: ['Margin with the promo: <code>4000 - 1000</code>.', '<code>launch = ev_promo &gt; ev_base</code>'] },
        { prompt: 'A lottery ticket costs 500 ₸. With probability 1/1000 you win 100,000 ₸, with probability 1/100 you win 5,000 ₸, otherwise nothing. What is the expected <b>net</b> profit of one ticket (winnings − price) in tenge?', explain: 'E[winnings] = 0.001 × 100,000 + 0.01 × 5,000 = 100 + 50 = 150 ₸. Net: 150 − 500 = −350 ₸.' }
      ]
    },
    'pr-gate': {
      title: 'Module exam: Probability',
      body: `
<p>Final check: conditional probability, Bayes, Binomial, Poisson, Normal and expected value. In the Python exercises only the standard library is available (<code>math</code>, <code>statistics</code>, <code>random</code>).</p>`,
      ex: [
        { prompt: 'Write a function <code>prob_at_least(k, n, p)</code>: for X ~ Binomial(n, p) it returns P(X ≥ k) (<code>math.comb</code>). Then: with 4% conversion and 50 visitors, store the probability of at least 4 purchases in <code>p_goal</code>.', check: { tests: 'import math as _m\n_exp = lambda k, n, p: sum(_m.comb(n, i) * p ** i * (1 - p) ** (n - i) for i in range(k, n + 1))\nassert abs(prob_at_least(0, 10, 0.3) - 1) < 1e-9, "P(X ≥ 0) = 1"\nassert abs(prob_at_least(2, 4, 0.5) - 0.6875) < 1e-9, "prob_at_least(2, 4, 0.5) = 11/16 = 0.6875"\nassert abs(prob_at_least(3, 20, 0.1) - _exp(3, 20, 0.1)) < 1e-9, "prob_at_least(3, 20, 0.1) ≈ 0.323"\nassert p_goal is not None and abs(p_goal - _exp(4, 50, 0.04)) < 1e-9, f"p_goal should be ≈ {_exp(4, 50, 0.04):.4f}"' } },
        { prompt: 'A call center gets 3 complaints per hour on average (Poisson). One operator handles 5 complaints per hour. <code>p_overload</code> — the probability of more than 5 complaints in an hour. <code>p_quiet_day</code> — the probability of fewer than 15 (≤ 14) complaints in an 8-hour working day.', check: { tests: 'import math as _m\n_pmf = lambda k, l: l ** k * _m.exp(-l) / _m.factorial(k)\nassert abs(p_overload - (1 - sum(_pmf(_k, 3) for _k in range(6)))) < 1e-9, "p_overload ≈ 0.084: 1 − P(X ≤ 5)"\nassert abs(p_quiet_day - sum(_pmf(_k, 24) for _k in range(15))) < 1e-9, "For a day λ = 3 × 8 = 24, P(X ≤ 14) is the sum over range(15)"' } },
        { prompt: 'Screening test: the disease affects 2% of people, sensitivity is 95%, the false positive rate is 10%. <code>p_sick_pos</code> — the probability that a person is really sick when the test is positive. <code>p_pos</code> — the probability that a random person tests positive.', check: { tests: 'assert abs(p_pos - 0.117) < 1e-9, "p_pos = 0.95 × 0.02 + 0.10 × 0.98 = 0.117"\nassert abs(p_sick_pos - 0.019 / 0.117) < 1e-9, "p_sick_pos = 0.019 / 0.117 ≈ 0.162"' } },
        { prompt: 'Delivery time is NormalDist(30, 6). To promise "99% of orders arrive within X minutes", how do you find X?', options: ['<code>NormalDist(30, 6).cdf(0.99)</code>', '<code>NormalDist(30, 6).inv_cdf(0.99)</code>', '<code>30 + 0.99 * 6</code>', '<code>1 - NormalDist(30, 6).cdf(99)</code>'], explain: 'From a probability to a value — inv_cdf. The result is ≈ 30 + 2.33 × 6 ≈ 44 minutes.' },
        { prompt: 'An ad campaign: with probability 0.6 it brings 1,000,000 ₸ profit, with probability 0.4 a 500,000 ₸ loss (−500,000). What is the expected profit in tenge?', explain: '0.6 × 1,000,000 + 0.4 × (−500,000) = 600,000 − 200,000 = 400,000 ₸.' }
      ]
    }
  }
});
