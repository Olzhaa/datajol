// M3.6 Business Analytics: English text. Code, solutions and expected output are in content/business.js.
DJ.i18n.patch({
  modules: {
    'm3-6': { intro: 'Technical skills are valuable only when they answer a business question. In this module you will learn to work with KPIs, revenue metrics, the funnel, retention and churn, unit economics (CAC, LTV) and to write an analytical memo.' }
  },
  lessons: {
    'ba-1': {
      title: 'KPIs and the metrics tree',
      body: `
<p>A <b>metric</b> is a measurable number (for example, the number of orders). A <b>KPI</b> is a key metric directly linked to a business goal that management keeps track of.</p>
<h3>North Star and the metrics tree</h3>
<p>A company chooses one main metric (the <b>North Star Metric</b>), for example "customers who made a purchase in a week". Then it breaks this metric into its parts:</p>
<pre><code>Revenue
├── Number of buyers
│   ├── Site visitors (traffic)
│   └── Conversion
└── Average check (AOV)
    ├── Number of items in a check
    └── Item price</code></pre>
<p>If revenue drops, we go down the tree and look for the part that changed. This is the most frequent work of an analyst.</p>
<h3>Vanity metrics</h3>
<p>Nice-looking metrics that do not affect decisions: the number of downloads, the total number of sign-ups, likes. A good metric leads to an <b>action</b>.</p>
<h3>Example: a taxi app</h3>
<p>The North Star is "the number of completed rides per week". It matters both to the passenger (they got there) and to the business (revenue). Let's break it down:</p>
<pre><code>Completed rides
├── Passengers who placed an order
│   ├── Those who opened the app
│   └── Conversion from opening to ordering
└── Share of completed
    ├── Whether a driver was found
    └── Whether the passenger cancelled</code></pre>
<p>If there are fewer rides, the analyst checks each branch in turn: are there fewer passengers, or more cancellations because no driver is found? In these two cases the decisions are completely different: in the first, marketing; in the second, adding more drivers.</p>
<h3>Signs of a good KPI</h3>
<ul>
<li>It is clear: it can be defined in one sentence.</li>
<li>It can be influenced: the team can change it with its own actions.</li>
<li>It is measured often: every week or every day.</li>
<li>It is linked to customer value: if the customer gets no benefit, the KPI will not grow for long.</li>
</ul>`,
      ex: [
        { prompt: 'Which North Star metric fits an online store best?', options: ['The number of site visitors', 'App downloads', 'The number of customers who made at least one purchase in a month', 'Instagram followers'], explain: 'It measures customer value (a purchase) and the business result at the same time.' },
        { prompt: 'Revenue dropped by 10%, but traffic and conversion did not change. Where do you look in the tree?', options: ['In the number of buyers', 'In the average check (AOV)', 'In the advertising budget', 'Nowhere, it is a coincidence'], explain: 'Revenue = buyers × AOV. If the number of buyers did not change, the AOV went down.' }
      ]
    },
    'ba-2': {
      title: 'Revenue metrics: AOV, ARPU, ARPPU',
      body: `
<table>
<tr><th>Metric</th><th>Formula</th><th>What it shows</th></tr>
<tr><td><b>Revenue</b></td><td>sum of all payments</td><td>total revenue</td></tr>
<tr><td><b>AOV</b> (average order value)</td><td>revenue / number of orders</td><td>average check</td></tr>
<tr><td><b>ARPU</b></td><td>revenue / all active users</td><td>average revenue from one user</td></tr>
<tr><td><b>ARPPU</b></td><td>revenue / paying users</td><td>average revenue from one paying user</td></tr>
</table>
<p>In SQL, the AOV is calculated in two steps: first the sum of each order, then their average.</p>
<pre><code>WITH t AS (
  SELECT o.id, SUM(oi.quantity * p.price) AS total
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  WHERE o.status = 'delivered'
  GROUP BY o.id
)
SELECT AVG(total) AS aov FROM t;</code></pre>
<div class="tip">A common mistake: <code>AVG(quantity * price)</code> gives the average per <b>row</b> (one product), not per order. First collect the data at the order level.</div>
<h3>Example calculation</h3>
<p>In a month there were 1,000 active users, 200 of them paid, 250 orders were made, and the revenue was 5,000,000 ₸.</p>
<ul>
<li>AOV = 5,000,000 / 250 = <b>20,000 ₸</b></li>
<li>ARPU = 5,000,000 / 1,000 = <b>5,000 ₸</b></li>
<li>ARPPU = 5,000,000 / 200 = <b>25,000 ₸</b></li>
</ul>
<p>The difference between ARPU and ARPPU shows the share of paying users: 200 / 1,000 = 20%. If ARPU grows, there are two possible reasons: either more people started paying, or paying users started spending more.</p>
<h3>Which metric to use when?</h3>
<p>When you change a price or a "buy together" offer, look at the AOV. In a product with a free and a paid part (a mobile game, a subscription), ARPU and ARPPU matter: turning free users into paying ones raises ARPU, but may not change ARPPU.</p>
<div class="tip">When you name a metric, always state the denominator (divided by whom?) and the period (day, month). The term "ARPU" can be calculated differently in different teams.</div>`,
      ex: [
        { prompt: 'Output the average check (<code>aov</code>) of the orders with the status <code>delivered</code> as a single value.', hints: ['The example in the lesson is exactly this task: study it, then write the query yourself.'] },
        { prompt: 'From the <code>payments</code> table, for each month output <code>month</code>, <code>revenue</code>, <code>payers</code> (unique paying users) and <code>arppu</code> (revenue / payers). In month order.', hints: ['<code>SUM(amount) * 1.0 / COUNT(DISTINCT user_id)</code>'] },
        { prompt: 'In a month the revenue was 2,000,000 ₸, there were 800 orders and 500 buyers. What is the AOV (₸)?', explain: '2,000,000 / 800 = 2,500 ₸. (ARPPU = 2,000,000 / 500 = 4,000 ₸.)' }
      ]
    },
    'ba-3': {
      title: 'Funnel: where do we lose customers?',
      body: `
<p>The conversion between the steps of a funnel answers the question "where does the customer drop out?"</p>
<table>
<tr><th>Step</th><th>People</th><th>Conversion from the previous step</th></tr>
<tr><td>Visited the site</td><td>10,000</td><td>—</td></tr>
<tr><td>Viewed a product</td><td>4,000</td><td>40%</td></tr>
<tr><td>Added to cart</td><td>1,200</td><td>30%</td></tr>
<tr><td>Paid</td><td>300</td><td>25%</td></tr>
</table>
<p>Overall conversion = 300 / 10,000 = 3%. The biggest absolute loss is at the first step (6,000 people), and the weakest step in percentage terms is payment (25%).</p>
<h3>Segmentation</h3>
<p>The overall funnel is not enough. If you split it by channel, device or city, you can see that the problem is in a specific group: for example, the payment page is broken on mobile.</p>
<h3>How do you build a funnel in SQL?</h3>
<p>In an events table, each row is one action (<code>user_id</code>, <code>step</code>). We count the unique people who reached each step using <code>CASE</code>:</p>
<pre><code>SELECT
  COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END)    AS visit,
  COUNT(DISTINCT CASE WHEN step = 'cart' THEN user_id END)     AS cart,
  COUNT(DISTINCT CASE WHEN step = 'purchase' THEN user_id END) AS purchase
FROM events;</code></pre>
<p>If the condition is not met, <code>CASE</code> returns NULL, and <code>COUNT(DISTINCT ...)</code> does not count NULL. So each column counts only the people of its own step. To split by channel, we <code>JOIN</code> with the users table and add <code>GROUP BY channel</code> at the end.</p>
<h3>Which step should you improve first?</h3>
<p>Usually you start with the weakest step in percentage terms, but the decision also depends on the cost of the improvement. Fixing an error on the payment page is cheap, while bringing twice as much traffic to the site is expensive. In a recommendation, show the "effect" and the "cost" side by side.</p>`,
      ex: [
        { prompt: 'Output the funnel by channel: <code>channel</code>, <code>visit</code>, <code>cart</code>, <code>purchase</code> (unique users who reached each step). Join <code>users</code> and <code>events</code>.', hints: ['Add <code>JOIN users</code> and <code>GROUP BY u.channel</code> to the funnel query from Advanced SQL.'] },
        { prompt: 'What percentage of those who put an item in the cart in the funnel from the lesson did not pay?', explain: 'Of 1,200, 300 paid (25%), so 75% did not pay.' }
      ]
    },
    'ba-4': {
      title: 'Retention, churn and LTV',
      body: `
<p><b>Churn rate</b> is the share of customers who left during a period. If there were 200 customers at the start of the month, and 30 of them bought nothing the next month, churn = 30 / 200 = 15%.</p>
<p><b>Retention</b> = 1 − churn = 85%.</p>
<h3>LTV (lifetime value)</h3>
<p>The revenue that one customer brings over their whole "life". A simple formula:</p>
<pre><code>Average lifetime (months) = 1 / churn
LTV = ARPU (monthly) × margin × (1 / churn)</code></pre>
<p>Example: ARPU 4,000 ₸, margin 50%, churn 10% → 4,000 × 0.5 × 10 = <b>20,000 ₸</b>.</p>
<div class="tip">The formula assumes that customers leave evenly. In real work it is more accurate to calculate from the retention curves of cohorts.</div>
<h3>Cohort retention</h3>
<p>A cohort is a group of customers who arrived in the same month. For each cohort we calculate "what percentage is still active after N months?" and put the results into a table:</p>
<table>
<tr><th>Cohort</th><th>Month 0</th><th>Month 1</th><th>Month 2</th><th>Month 3</th></tr>
<tr><td>January</td><td>100%</td><td>45%</td><td>32%</td><td>28%</td></tr>
<tr><td>February</td><td>100%</td><td>50%</td><td>38%</td><td>—</td></tr>
<tr><td>March</td><td>100%</td><td>55%</td><td>—</td><td>—</td></tr>
</table>
<p>Read the table in the example along the diagonal: the new cohorts are retained better (45% → 50% → 55%), so the product is getting better. If the curve levels off (here at about 28%), that is a sign the product has its own audience.</p>
<h3>Do not confuse churn and retention</h3>
<p>Pay close attention to what you divide churn by: customers at the start of the month, not those who arrived during the month. Otherwise, in a fast-growing business the churn will look artificially low.</p>`,
      ex: [
        { prompt: 'At the start of the month there were 400 subscribers, and during the month 36 of them canceled their subscription. What is the churn, in percent?', explain: '36 / 400 = 9%.' },
        { prompt: 'Write the function <code>ltv(arpu, margin, churn)</code>: <code>arpu × margin / churn</code>. If churn is 0 or negative, let it raise <code>ValueError</code>.', check: { tests: 'assert abs(ltv(4000, 0.5, 0.1) - 20000) < 1e-6, "ltv(4000, 0.5, 0.1) = 20000"\nassert abs(ltv(1000, 1, 0.25) - 4000) < 1e-6, "ltv(1000, 1, 0.25) = 4000"\n_ok = False\ntry:\n    ltv(1000, 0.5, 0)\nexcept ValueError:\n    _ok = True\nassert _ok, "With churn = 0, raise ValueError"' }, hints: ['<code>raise ValueError("...")</code>'] },
        { prompt: 'Output the retention of the July (<code>2024-07</code>) cohort by month: <code>month</code>, <code>retention</code> (active / cohort size × 100, one decimal place). In month order.', hints: ["Get the cohort size with a subquery: <code>(SELECT COUNT(*) FROM users WHERE signup_month = '2024-07')</code>"] }
      ]
    },
    'ba-5': {
      title: 'Unit economics: CAC, LTV/CAC, payback',
      body: `
<p><b>Unit economics</b> shows whether one customer is profitable for the business.</p>
<ul>
<li><b>CAC</b> (customer acquisition cost) = marketing spend / new customers acquired.</li>
<li><b>LTV / CAC</b>: above 3 is considered good; below 1 means every customer brings a loss.</li>
<li><b>Payback period</b> = CAC / (ARPU × margin): how many months it takes to recover the spending.</li>
</ul>
<p>It is important to calculate CAC by channel: one channel may bring cheap customers, another expensive ones.</p>
<pre><code>WITH s AS (SELECT channel, SUM(spend) AS spend FROM ad_spend GROUP BY channel),
     u AS (SELECT channel, COUNT(*) AS n FROM users GROUP BY channel)
SELECT s.channel, s.spend * 1.0 / u.n AS cac
FROM s JOIN u ON u.channel = s.channel;</code></pre>
<h3>Example calculation</h3>
<p>An online course platform spends 1,500,000 ₸ a month on advertising and attracts 300 new customers. The monthly ARPU is 4,000 ₸, margin 50%, churn 10%.</p>
<ul>
<li>CAC = 1,500,000 / 300 = <b>5,000 ₸</b></li>
<li>LTV = 4,000 × 0.5 / 0.1 = <b>20,000 ₸</b></li>
<li>LTV / CAC = 20,000 / 5,000 = <b>4</b>, which is good</li>
<li>Payback = 5,000 / (4,000 × 0.5) = <b>2.5 months</b></li>
</ul>
<p>The business looks healthy: each customer pays back its cost in 2.5 months, and on average it stays for another 10 months.</p>
<h3>Common mistakes</h3>
<ul>
<li><b>Forgetting the margin</b>: if you calculate LTV from revenue and compare it with CAC, the business will look far too profitable.</li>
<li><b>Including organic customers</b>: if you add customers who came without advertising to the denominator, CAC artificially drops. Calculate paid channels separately.</li>
<li><b>A long payback</b>: even with a good LTV/CAC, if the payback is 18 months, a startup may run out of money.</li>
</ul>`,
      ex: [
        { prompt: 'Output by channel: <code>channel</code>, <code>spend</code>, <code>users</code> and <code>cac</code>. Only the channels with spending (those present in <code>ad_spend</code>).', hints: ['Add the columns <code>s.spend</code> and <code>u.n AS users</code> to the query from the lesson.'] },
        { prompt: 'CAC = 12,000 ₸, monthly ARPU = 3,000 ₸, margin 40%. How many months is the payback?', unit: 'months', explain: '3,000 × 0.4 = 1,200 ₸ per month. 12,000 / 1,200 = 10 months.' },
        { prompt: 'Channel A: CAC 5,000, LTV 30,000. Channel B: CAC 20,000, LTV 40,000. Where do we increase the budget?', options: ['B: higher LTV', 'A: LTV/CAC = 6, while B has 2', 'Equally in both', 'In neither'], explain: 'The decision is driven by the LTV/CAC ratio: A returns more on every tenge spent. (You also need to check that the channel capacity is limited.)' }
      ]
    },
    'ba-6': {
      title: 'Growth: MoM, YoY and seasonality',
      body: `
<ul>
<li><b>MoM</b> (month-over-month) = (this month − last month) / last month.</li>
<li><b>YoY</b> (year-over-year) = (this month − the same month last year) / the same month last year.</li>
</ul>
<p>In December sales rose by 40% compared with November. Is this good? Maybe it grows like this every December (<b>seasonality</b>). That is why in a seasonal business we look at YoY: it "removes" seasonality.</p>
<div class="tip">With small numbers, percentages are misleading: growth from 2 orders to 4 is "+100%", but for the business it does not matter much. Show the absolute number together with the percentage.</div>
<h3>How do you calculate MoM in SQL?</h3>
<p>To get the value of the previous month, we use the <code>LAG</code> window function:</p>
<pre><code>WITH m AS (
  SELECT month, SUM(amount) AS revenue
  FROM payments GROUP BY month
)
SELECT month, revenue,
       ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0
             / LAG(revenue) OVER (ORDER BY month), 1) AS mom_pct
FROM m;</code></pre>
<p>The first month has no previous month, so <code>LAG</code> returns NULL and <code>mom_pct</code> will be empty. This is not an error: there is nothing to compare with.</p>
<h3>One more tool: the moving average</h3>
<p>If the daily data is too "noisy", a 7-day moving average (<code>AVG(...) OVER (ORDER BY day ROWS 6 PRECEDING)</code>) smooths out the effect of the days of the week. Then the trend is clearly visible.</p>
<div class="tip">Months have different lengths: February has 28 days, March has 31. Comparing the average per day is sometimes fairer than comparing monthly totals.</div>`,
      ex: [
        { prompt: 'From <code>payments</code>, output the monthly revenue and the MoM growth in percent: <code>month</code>, <code>revenue</code>, <code>mom_pct</code> (one decimal place). In month order.', hints: ['In a CTE, get the monthly revenue, then use LAG to get the percentage change.'] },
        { prompt: 'A flower shop\'s sales in March are 60% lower than in February. Which comparison is fairer?', options: ['MoM', 'With March of last year (YoY)', 'With the annual average', 'None of them'], explain: 'February has a peak before March 8, so for a seasonal business YoY is fairer.' }
      ]
    },
    'ba-7': {
      title: 'Traps in metrics',
      body: `
<h3>1. An average of averages</h3>
<p>The conversion of two stores is 10% (from 100 visitors) and 2% (from 10,000 visitors). The average is not "6%": the overall conversion = (10 + 200) / 10,100 ≈ 2.1%. First add up the numerators and the denominators, and only then divide.</p>
<h3>2. Survivorship and selection</h3>
<p>"Premium customers buy more": perhaps the customers who buy a lot are the ones who move to premium. The direction may be the opposite.</p>
<h3>3. Goodhart's law</h3>
<p>"When a measure becomes a target, it ceases to be a good measure." If you give a call center the KPI "shorten the call duration", the operators will hang up without solving the problem. Pair every KPI with a "counter-balance" metric (for example, the number of repeat calls).</p>
<h3>4. Correlation is not a cause</h3>
<p>"Customers who received a push notification buy more": perhaps the notification was sent only to active customers. To prove a cause, you need an A/B test: send to a random group and compare it with a group that did not receive it.</p>
<h3>5. Simpson's paradox</h3>
<p>The new version can be better in both groups, but worse in the overall data. The reason is the different sizes of the groups. For example, a new design raised conversion both on mobile and on desktop, but since most of the traffic moved to mobile, where conversion is lower, the overall conversion dropped. Always check the main segments as well.</p>
<h3>6. A change of definition</h3>
<p>If the definition of an "active user" changed in the middle of the month, a jump on the chart shows a change in the calculation, not in the business. Mark such changes on the dashboard.</p>`,
      ex: [
        { prompt: 'Store A: 200 visitors, 20 purchases. Store B: 1,800 visitors, 36 purchases. What percentage is the overall conversion?', explain: '(20 + 36) / (200 + 1,800) = 56 / 2,000 = 2.8%. The average of averages (10% + 2%) / 2 = 6% is wrong.' },
        { prompt: 'The support team was given the KPI "close a ticket within 1 hour". Which counter-balance metric should be added?', options: ['The number of tickets', 'The share of reopened tickets and the customer rating (CSAT)', 'The number of agents', 'Working hours'], explain: 'A quality metric is needed so that speed does not sacrifice quality.' }
      ]
    },
    'ba-8': {
      title: 'How to write an analytical memo',
      body: `
<p>The final product of an analysis is not a table but a <b>decision</b>. We deliver it to the manager through a memo (a short note).</p>
<h3>Structure: the answer first</h3>
<ol>
<li><b>The main conclusion</b> (1–2 sentences): "In September revenue fell by 12%, because the payment conversion on mobile dropped from 25% to 14%".</li>
<li><b>Evidence</b>: 2–3 numbers or one chart with its source.</li>
<li><b>Recommendation</b>: a specific action and the person responsible.</li>
<li><b>Limitations</b>: what was not checked and which assumptions were made.</li>
</ol>
<div class="tip">Write as if the manager will read only the first paragraph. Do not start with "First I loaded the data, then I cleaned it...": the reader does not need the process.</div>
<h3>Example memo</h3>
<div class="tip"><b>Subject:</b> Revenue decline in September<br>
<b>Conclusion:</b> Revenue fell by 12% in September. The reason: after the update on September 9, the payment conversion in the mobile app dropped from 25% to 14%. There are no changes in the desktop version.<br>
<b>Evidence:</b> the number of mobile payments fell from about 320 to about 180 per day; in the error logs, "payment timeout" has appeared 6 times more often since September 9.<br>
<b>Recommendation:</b> the mobile team rolls back the old version of the payment module (owner: the head of the mobile team); until it is fixed, we show an alternative payment method on the payment page.<br>
<b>Limitations:</b> iOS and Android were not checked separately; the seasonal effect was not compared with last year.</div>
<p>In this example, each section is only one or two sentences. The numbers are specific, the recommendation can be verified, and the limitations tell the reader where to be careful.</p>
<h3>Checklist</h3>
<ul>
<li>Is the first paragraph clear if you read it on its own?</li>
<li>Is the source and the period given for every number?</li>
<li>Does the recommendation say "who, what, when"?</li>
</ul>`,
      ex: [
        { prompt: 'Which first sentence of a memo is better?', options: ['"In this report I analyzed the data for September."', '"Revenue fell by 12% in September: the payment conversion on mobile dropped from 25% to 14%, so we recommend fixing the payment page."', '"There is a lot of interesting stuff in the data."', '"The SQL queries are attached in the appendix."'], explain: 'The answer, the cause and the recommendation are in one sentence.' },
        { prompt: 'Why does a memo need a "Limitations" section?', options: ['To make it look longer', 'So that the reader knows how reliable the conclusion is and what was not checked', 'To hide the analyst\'s mistakes', 'It is not needed'], explain: 'Honest limitations build trust and protect against a wrong decision.' }
      ]
    },
    'ba-gate': {
      title: 'Module exam: Business Analytics',
      body: `
<p>Final check: revenue metrics, the funnel, retention, unit economics. Databases: <code>shop</code> and <code>metrics</code>.</p>`,
      ex: [
        { prompt: '<b>metrics.</b> Output by channel <code>channel</code>, <code>revenue</code> (the sum of <code>payments</code> of the users of this channel). Channels without revenue must be output with 0.' },
        { prompt: '<b>shop.</b> By category (<code>category</code>), output the revenue from orders with the status delivered and its share of the total revenue in percent (<code>share</code>, one decimal place): <code>category</code>, <code>revenue</code>, <code>share</code>.' },
        { prompt: 'Monthly ARPU 5,000 ₸, margin 60%, monthly churn 12.5%, CAC 8,000 ₸. What is the LTV/CAC ratio?', explain: 'LTV = 5,000 × 0.6 / 0.125 = 24,000. 24,000 / 8,000 = 3.' },
        { prompt: 'After launching a new registration feature, sign-ups grew by 30%, but the 30-day retention fell from 40% to 25%. What will you write in the memo?', options: ['The feature is a success: sign-ups grew', 'Although there are more sign-ups, their quality has dropped; we recommend calculating the effect on the number of active customers and reviewing the feature', 'Retention does not matter', 'There is an error in the data'], explain: 'If one metric improved and another got worse, you need to evaluate the overall result (active customers) together.' }
      ]
    }
  }
});
