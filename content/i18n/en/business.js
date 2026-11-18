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
<p>A company chooses one main metric (the <b>North Star Metric</b>). For an online store this could be, for example, "the number of customers who made at least one purchase in a month". It is directly tied to revenue: revenue = buyers × average check. So we put revenue at the root of the tree and break it into its parts. The North Star is one branch of this tree:</p>
<pre><code>Revenue
├── Number of buyers   ← North Star
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
        { prompt: 'A flower shop\'s sales in April are 60% lower than in March. Which comparison is fairer?', options: ['MoM', 'With April of last year (YoY)', 'With the annual average', 'None of them'], explain: 'March has a peak because of March 8 (Women\'s Day), so the drop in April is normal seasonality. For a seasonal business YoY is fairer.' }
      ]
    },
    'ba-7': {
      title: 'Traps in metrics',
      body: `
<h3>1. An average of averages</h3>
<p>The conversion of two stores is 10% (from 100 visitors) and 2% (from 10,000 visitors). The average is not "6%": the overall conversion = (10 + 200) / 10,100 ≈ 2.1%. First add up the numerators and the denominators, and only then divide.</p>
<h3>2. Reverse causality and selection</h3>
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
    },
    'ba-9': {
      title: 'RFM and ABC segmentation',
      body: `
<p>"Let's send every customer the same discount" is the most expensive and the weakest kind of marketing. Segmentation splits customers (or products) into groups that behave alike and lets you choose a <b>separate action</b> for each group. The two approaches named most often in analyst vacancies in Kazakhstan are RFM and ABC. The examples use the <code>qazaq</code> database (Qazaq Market).</p>
<h3>RFM: three questions</h3>
<ul>
<li><b>Recency</b>: how many days have passed since the last purchase? Fewer is better.</li>
<li><b>Frequency</b>: how many times did they buy?</li>
<li><b>Monetary</b>: how much money did they bring in total?</li>
</ul>
<p>Only delivered (<code>delivered</code>) orders count. As "today" we take a fixed date: <code>2026-07-01</code>. On a real job it is the day the report is built.</p>
<pre><code>SELECT o.customer_id,
  CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,
  COUNT(DISTINCT o.order_id) AS frequency,
  SUM(oi.quantity * oi.unit_price) AS monetary
FROM orders o JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.status = 'delivered'
GROUP BY o.customer_id;</code></pre>
<p>You need <code>COUNT(DISTINCT o.order_id)</code>: joining with <code>order_items</code> multiplies one order into several rows.</p>
<h3>Scoring: NTILE</h3>
<p>Raw numbers are hard to compare, so for each measure we split the customers into equal groups and give a score. Here there are 3 groups (1 is weak, 3 is strong); large databases use 5 groups.</p>
<pre><code>NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r,  -- bought recently = 3
NTILE(3) OVER (ORDER BY frequency, customer_id)         AS f,  -- buys often = 3
NTILE(3) OVER (ORDER BY monetary, customer_id)          AS m   -- spent a lot = 3</code></pre>
<p>For Recency the order is reversed: a customer with <b>many</b> days gets a score of 1. <code>customer_id</code> keeps the result stable when values are equal.</p>
<h3>Segment and action</h3>
<p>The 70 buyers of Qazaq Market (by R and F):</p>
<table>
<tr><th>Segment</th><th>Rule</th><th>Customers</th><th>Share of revenue</th><th>Action</th></tr>
<tr><td>Champions</td><td>r = 3, f = 3</td><td>10</td><td>15.8%</td><td>No discount. Early access, a loyalty programme, a request for a review</td></tr>
<tr><td>At risk</td><td>r = 1, f ≥ 2</td><td>14</td><td>27.7%</td><td>A win-back campaign: a personal offer, a "we miss you" email, asking for the reason</td></tr>
<tr><td>New</td><td>r = 3, f = 1</td><td>5</td><td>3.9%</td><td>Nudge towards a second purchase: a related product, a 14-day promo code</td></tr>
<tr><td>Everyone else</td><td>other</td><td>41</td><td>52.5%</td><td>General messaging, raising frequency</td></tr>
</table>
<p>The most important row is the second: 14 customers who used to buy often brought 27.7% of revenue but have not come for a long time. Winning them back is cheaper than acquiring new customers.</p>
<h3>ABC: splitting products by share</h3>
<p>ABC analysis rests on the Pareto principle: a small part of the products gives most of the revenue. We sort the products by revenue in descending order and compute the <b>cumulative share</b>:</p>
<ul>
<li><b>A</b>: cumulative share up to 80%. Must always be in stock, and we watch the price closely.</li>
<li><b>B</b>: from 80% to 95%. Normal control.</li>
<li><b>C</b>: the rest. Reduce stock, consider dropping from the range.</li>
</ul>
<pre><code>ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1) AS cum_pct</code></pre>
<p>In Qazaq Market, 7 of the 28 products sold fall into group A and give 77.5% of revenue.</p>
<h3>Common mistakes</h3>
<ul>
<li>Including cancelled and returned orders: the customer looks "strong" but brought no money.</li>
<li>Taking <code>date('now')</code> as "today": on old data every customer's recency comes out equally bad. Take a date close to the last date in the data.</li>
<li>Computing segments and then doing nothing. Segmentation is not a report; it is a list of what you do for each group.</li>
<li>Doing ABC on revenue alone: a low-margin product may sit in A. If you can, repeat it on profit.</li>
</ul>
<div class="tip">Compute RFM every month, not once, and track how customers <b>move</b> from segment to segment: "how many champions dropped to at risk?" That shows churn ahead of time.</div>`,
      ex: [
        { prompt: 'Compute the RFM measures of each buyer (only <code>delivered</code> orders, "today" = <code>2026-07-01</code>): <code>customer_id</code>, <code>recency_days</code>, <code>frequency</code> (number of orders), <code>monetary</code> (the sum of quantity × unit_price). Sort by <code>customer_id</code>.', hints: [`<code>CAST(julianday('2026-07-01') - julianday(MAX(o.order_date)) AS INTEGER)</code>`, '<code>COUNT(DISTINCT o.order_id)</code>: after the JOIN one order becomes several rows.', `<code>orders o JOIN order_items oi</code>, <code>WHERE o.status = 'delivered'</code>, <code>GROUP BY o.customer_id</code>.`] },
        { prompt: 'Score the ready-made <code>rfm</code> CTE with <code>NTILE(3)</code>: <code>r</code> (the customers with the most recent last order get 3), <code>f</code>, <code>m</code> (the largest get 3). Add <code>customer_id</code> as the second column in the <code>ORDER BY</code> of each window. Columns: <code>customer_id</code>, <code>r</code>, <code>f</code>, <code>m</code>.', hints: ['<code>NTILE(3) OVER (ORDER BY recency_days DESC, customer_id) AS r</code>: a customer with many days falls into group 1.', 'For <code>f</code> and <code>m</code> the order is ascending: <code>ORDER BY frequency, customer_id</code>.'] },
        { prompt: `ABC analysis of the products (only <code>delivered</code>): <code>name</code>, <code>revenue</code>, <code>cum_pct</code> (the cumulative share in descending order of revenue, %, 1 decimal place), <code>abc</code> ('A' if <code>cum_pct</code> ≤ 80, 'B' if ≤ 95, otherwise 'C'). Sort by revenue in descending order.`, hints: ['CTE 1: each product\'s revenue (order_items, orders, products).', 'CTE 2: <code>ROUND(100.0 * SUM(revenue) OVER (ORDER BY revenue DESC) / SUM(revenue) OVER (), 1) AS cum_pct</code>', `At the end: <code>CASE WHEN cum_pct &lt;= 80 THEN 'A' WHEN cum_pct &lt;= 95 THEN 'B' ELSE 'C' END</code>`] },
        { prompt: 'A customer\'s scores: r = 1, f = 3, m = 3. Which action is best?', options: ['Do nothing: they are already the best customer', 'A win-back campaign: send a personal offer and find out why they stopped coming', 'Delete them from the database', 'Send them the welcome email meant for new customers'], explain: 'They used to buy often and a lot (f and m are high) but have not come for a long time (r is low). This is a valuable customer who is slipping away.' },
        { prompt: 'In an ABC analysis a product fell into group C. What does that mean?', options: ['The product is of poor quality', 'It is one of the products that give the last ~5% of revenue: you can consider reducing its stock or dropping it from the range', 'Its price should be raised at once', 'It is the best-selling product'], explain: 'C means products with a small share of revenue. But before deciding, check the margin and whether it sells together with A products.' }
      ]
    },
    'ba-10': {
      title: 'Product metrics: DAU/MAU, stickiness, activation',
      body: `
<p>A shop counts revenue, while an app or a service first counts <b>usage</b>: do people come, do they return, do they get value. These metrics are always asked about in interviews at product companies such as Kaspi, Kolesa and Yandex.</p>
<h3>DAU, WAU, MAU</h3>
<ul>
<li><b>DAU</b> (daily active users): the <b>unique</b> users active on one day.</li>
<li><b>WAU</b>, <b>MAU</b>: those active at least once in a week, in a month.</li>
</ul>
<p>The team itself defines what "active" means: opening the app, or a meaningful action (a search, a payment)? When the definition changes, the metric jumps too, so write it down on the dashboard.</p>
<p>The example table: <code>daily_active(user_id, day)</code> in the <code>metrics</code> database, September 2024.</p>
<pre><code>SELECT day, COUNT(DISTINCT user_id) AS dau
FROM daily_active GROUP BY day;</code></pre>
<h3>Stickiness: DAU / MAU</h3>
<p><b>Stickiness</b> = average DAU / MAU. It shows "what part of the monthly audience comes every day".</p>
<p>Example: MAU = 8, and over the 30 days of September there were 98 "user-days" in total. Average DAU = 98 / 30 ≈ 3.27. Stickiness = 3.27 / 8 ≈ 40.8%. So the average user logs in on about 12 days a month (30 × 0.408).</p>
<table>
<tr><th>Stickiness</th><th>What it means</th></tr>
<tr><td>50% and above</td><td>A daily habit: a messenger, a social network</td></tr>
<tr><td>20–30%</td><td>Once or twice a week: a banking app, delivery</td></tr>
<tr><td>Below 10%</td><td>An occasional need: buying tickets, a repair service. Such a product needs a different metric, not stickiness</td></tr>
</table>
<h3>Activation: reaching the first value</h3>
<p>A signup is not a customer yet. <b>Activation</b> is the moment a new user first gets the product's core value (the "aha moment"). It differs by product: the first ride in a taxi app, the first order in a shop, the first completed lesson on a learning platform.</p>
<p><b>Activation rate</b> = new users activated within a set period / all signups. The period is required: "a first order within 30 days of signing up". In Qazaq Market this figure is 62.5% (50 of 80 customers).</p>
<p>If activation is low, improving retention makes little sense: people leave without seeing the value. First you shorten the path from signup to first value.</p>
<h3>How the metrics connect</h3>
<pre><code>Acquisition → Activation → Retention → Revenue
  signups     first value   coming back  payment</code></pre>
<p>MAU is the outcome of this chain: newly activated users + returning users. When MAU grows, break down which part it grew from.</p>
<h3>Common mistakes</h3>
<ul>
<li>Computing MAU as the sum of DAUs. One person who logs in every day is counted 30 times in DAU and once in MAU. MAU is computed only with <code>COUNT(DISTINCT user_id)</code>.</li>
<li>Dividing average DAU only by the days that have data. A day when nobody logged in is still a day: the denominator is the number of calendar days.</li>
<li>Computing activation with no time limit: old cohorts have had more time, so they always look "better".</li>
<li>Comparing an incomplete month with a full one: on the 10th of a month MAU is always lower.</li>
</ul>
<div class="tip">DAU swings a lot on weekends and holidays. To see the trend, use a 7-day moving average or WAU.</div>`,
      ex: [
        { prompt: '<b>metrics.</b> From <code>daily_active</code>, show each day\'s DAU: <code>day</code>, <code>dau</code>. In date order.', hints: ['<code>COUNT(DISTINCT user_id)</code>, <code>GROUP BY day</code>.'] },
        { prompt: '<b>metrics.</b> Show September\'s stickiness in one row: <code>avg_dau</code> (number of user-days / 30 days, 2 decimal places), <code>mau</code> (unique users), <code>stickiness_pct</code> (average DAU / MAU, %, 1 decimal place). The day when nobody logged in is part of the 30 days too.', hints: ['In the table one row = one day of one user, so the number of user-days is <code>COUNT(*)</code>.', '<code>ROUND(COUNT(*) * 1.0 / 30, 2)</code> and <code>COUNT(DISTINCT user_id)</code>.', '<code>ROUND(COUNT(*) * 100.0 / 30 / COUNT(DISTINCT user_id), 1)</code>'] },
        { prompt: '<b>qazaq.</b> Activation rate by signup year: <code>reg_year</code>, <code>registered</code> (signups), <code>activated</code> (those who placed their first order, with any status, within 30 days of signing up), <code>activation_pct</code> (%, 1 decimal place). Sort by year.', hints: ['The difference in days: <code>julianday(first_order) - julianday(registered_at)</code>. For a customer with no orders it is NULL and the condition does not hold.', '<code>SUM(CASE WHEN julianday(first_order) - julianday(registered_at) &lt;= 30 THEN 1 ELSE 0 END) AS activated</code>', `Group by <code>strftime('%Y', registered_at)</code>.`] },
        { prompt: 'An app\'s average DAU in April is 1,200 and its MAU is 6,000. What is the stickiness, in percent?', explain: '1,200 / 6,000 = 0.2 = 20%. The average user logs in on about 6 days a month (30 × 0.2).' },
        { prompt: 'An analyst computed MAU by "adding up the DAUs of 30 days" and got 98, while the real MAU is 8. What is the mistake?', options: ['There is no mistake, both are correct', 'The sum of DAUs counts one person again for every day they logged in; MAU is the number of unique users over the month', 'MAU should have been divided by 30', 'The DAUs should have been added by week'], explain: 'You cannot add up unique counts (DISTINCT). MAU is computed only with COUNT(DISTINCT user_id) over the whole month.' }
      ]
    },
    'ba-ab': {
      title: 'Reading an A/B test: the basics for an analyst',
      body: `
<p>The "Traps in metrics" lesson said it: the reliable way to prove a cause is an <b>A/B test</b>. An analyst is rarely asked to derive the maths of a test from scratch, but <b>reading</b> a results table correctly and answering "do we ship it or not?" is everyday work. The deeper theory (distributions, power, sample size) is in module M4.2 "Inference &amp; A/B Testing".</p>
<h3>How a test is set up</h3>
<ol>
<li><b>Hypothesis</b>: "A 'Buy in one click' button will raise payment conversion".</li>
<li><b>Two groups</b>: users are split <b>at random</b>. A (control) sees the old version, B (test) sees the new one. Random assignment makes the groups the same in every other respect.</li>
<li><b>One primary metric</b> and the <b>duration</b> of the test are fixed before it starts.</li>
</ol>
<h3>Reading the results table</h3>
<table>
<tr><th>Group</th><th>Users</th><th>Purchases</th><th>Conversion</th></tr>
<tr><td>A (control)</td><td>10 000</td><td>500</td><td>5.0%</td></tr>
<tr><td>B (test)</td><td>10 000</td><td>560</td><td>5.6%</td></tr>
</table>
<p>The difference: +0.6 percentage points (absolute), +12% (relative: 0.6 / 5.0). p-value = 0.058. The 95% confidence interval of the difference: from −0.02 to +1.22 pp.</p>
<ul>
<li><b>Absolute and relative lift</b>. "Conversion grew by 12%" and "grew by 0.6 pp" are the same thing. Always say in the report which one you mean.</li>
<li><b>p-value</b>: the probability of seeing a difference this large or larger by chance if there is in fact <b>no</b> difference between A and B. Here it is 5.8%. The usual threshold is 5% (0.05). If p is below it, the result is called "statistically significant". Here it is just above the threshold: the difference is not proven.</li>
<li><b>Confidence interval (CI)</b>: the range where the true difference probably lies. If the interval <b>contains zero</b> (here −0.02 … +1.22), we cannot rule out "no effect". A CI is more useful than a p-value: it also shows the possible <b>size</b> of the effect.</li>
</ul>
<p>A p-value does <b>not</b> mean "the probability that B is better is 94.2%". That is the most common misreading.</p>
<h3>Before trusting the result: the SRM check</h3>
<p><b>SRM</b> (sample ratio mismatch) is when the group sizes deviate from the plan. If 50/50 was planned and A has 10,000 people while B has 9,400, the assignment mechanism has a bug: for example, the new page loads slowly and some users never get counted. You cannot trust the result of such a test.</p>
<p>The check: the expected size e = (10,000 + 9,400) / 2 = 9,700. χ² = (10,000 − 9,700)² / 9,700 + (9,400 − 9,700)² / 9,700 ≈ 18.56. If χ² is above 3.84 (p &lt; 0.05), the deviation is not random. Many teams use a stricter threshold: 10.83 (p &lt; 0.001).</p>
<h3>Peeking: looking early, stopping early</h3>
<p>If you look at the test every day and stop the moment p &lt; 0.05, the share of false "wins" grows from 5% to 20–30%: the p-value fluctuates from day to day and sooner or later crosses the threshold by chance. The rule: compute the sample size and duration in advance and wait until the end. The duration should be at least 1–2 <b>full weeks</b>, because behaviour differs between weekdays and weekends.</p>
<h3>Statistical significance and practical significance</h3>
<p>With a million users, even a +0.05 pp difference comes out "significant". But does it pay for the cost of development and support? That is why an <b>MDE</b> (minimum detectable effect), the smallest effect that matters to the business, is set before the test. And the other way round, in a small test a large useful effect may stay "not significant": there was not enough data.</p>
<h3>Making the decision</h3>
<table>
<tr><th>Situation</th><th>Decision</th></tr>
<tr><td>There is SRM</td><td>We do not use the result. Find the assignment bug and rerun the test</td></tr>
<tr><td>The CI is entirely above zero and the effect is larger than the MDE</td><td>Ship the new version</td></tr>
<tr><td>The CI contains zero and the planned sample was collected</td><td>The effect is not proven. Do not ship, or revisit the hypothesis</td></tr>
<tr><td>The primary metric grew, a guardrail metric (returns, complaints) got worse</td><td>Do not ship; investigate the cause</td></tr>
</table>
<div class="tip">Write the test conclusion in one sentence: "Variant B changed payment conversion from 5.0% to 5.6% (+0.6 pp, 95% CI −0.02…+1.22, p = 0.058); no SRM; the effect is not proven, I recommend not shipping". The numbers, the confidence and the recommendation together.</div>`,
      ex: [
        { prompt: 'A test result: p-value = 0.03. Which interpretation is correct?', options: ['The probability that variant B is better is 97%', 'If there is in fact no difference between the variants, the probability of seeing a difference this large or larger by chance is 3%', 'Conversion grew by 3%', '3% of the users did not like variant B'], explain: 'A p-value is the probability of data like this when the "no difference" assumption is true. It is not the probability that B is better.' },
        { prompt: 'Group A: 8,000 users, 400 purchases. Group B: 8,000 users, 460 purchases. What is the <b>relative</b> lift in conversion, in percent?', explain: 'A: 400 / 8,000 = 5.0%. B: 460 / 8,000 = 5.75%. Relative lift = (5.75 − 5.0) / 5.0 = 15%. The absolute lift is 0.75 pp.' },
        { prompt: 'Write a function <code>ab_summary(a_users, a_conv, b_users, b_conv)</code>. It should return a dictionary: <code>cr_a</code> and <code>cr_b</code> (conversion, %), <code>abs_lift_pp</code> (B − A, percentage points), <code>rel_lift_pct</code> (relative lift, %). Round every value to 2 decimal places with <code>round</code>.', check: { tests: `_r = ab_summary(10000, 500, 10000, 560)
assert isinstance(_r, dict), "The function should return a dictionary"
for _k, _v in [("cr_a", 5.0), ("cr_b", 5.6), ("abs_lift_pp", 0.6), ("rel_lift_pct", 12.0)]:
    assert _k in _r, f"The dictionary has no key {_k}"
    assert abs(_r[_k] - _v) < 0.011, f"ab_summary(10000, 500, 10000, 560): expected {_k} = {_v}, you have {_r[_k]}"
_r = ab_summary(8000, 400, 4000, 230)
assert abs(_r["cr_b"] - 5.75) < 0.011, "Each group's conversion is divided by its own number of users"
assert abs(_r["rel_lift_pct"] - 15.0) < 0.011, "Relative lift: (cr_b - cr_a) / cr_a * 100"` }, hints: ['<code>cr_a = a_conv / a_users * 100</code>', 'Relative lift: <code>(cr_b - cr_a) / cr_a * 100</code>'] },
        { prompt: 'Write an SRM check for a test that should split 50/50. The function <code>srm_check(n_a, n_b)</code> should return the pair <code>(chi2, has_srm)</code>: <code>chi2</code> = (n_a − e)² / e + (n_b − e)² / e, where e is the average size of the two groups (<code>round</code> to 2 decimal places); <code>has_srm</code> is <code>True</code> when <code>chi2</code> is greater than 3.84.', check: { tests: `_c, _f = srm_check(10000, 9400)
assert abs(_c - 18.56) < 0.011, f"srm_check(10000, 9400): expected chi2 = 18.56, you have {_c}"
assert _f is True, "chi2 is greater than 3.84: has_srm should be True"
_c, _f = srm_check(5050, 4950)
assert abs(_c - 1.0) < 0.011, f"srm_check(5050, 4950): expected chi2 = 1.0, you have {_c}"
assert _f is False, "chi2 is less than 3.84: has_srm should be False"` }, hints: ['<code>e = (n_a + n_b) / 2</code>', '<code>return chi2, chi2 &gt; 3.84</code>'] },
        { prompt: 'A test ran for the planned 2 weeks and there is no SRM. The 95% confidence interval of the difference in conversion: from −0.02 to +1.22 pp. What is the conclusion?', options: ['B won: most of the interval is positive', 'The interval contains zero: the effect is not proven. There are no grounds to ship the new version as one that "raises conversion"', 'B lost: conversion went down', 'Check the test every day until p &lt; 0.05 and stop at that moment'], explain: 'Zero is inside the interval, so the "no difference" option has not been ruled out. Waiting until p &lt; 0.05 is peeking, which multiplies false wins.' }
      ]
    }
  }
});
