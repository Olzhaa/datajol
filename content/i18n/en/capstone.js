// M3.7 DA Capstone & Interview: English text. Code, solutions and expected output are in content/capstone.js.
DJ.i18n.patch({
  modules: {
    'm3-7': { intro: 'Capstone project: you will analyse 6 months of data from the Birinshi Kofe coffee chain from start to finish. Business question → profiling → cleaning → metrics → segments → retention → recommendation → memo. At the end there are interview-prep tasks. You can add this project to your portfolio.' }
  },
  lessons: {
    'cap-1': {
      title: 'Brief: business question and plan',
      body: `
<p><b>Client:</b> Birinshi Kofe, a chain of coffee shops in Almaty, Astana and Shymkent. Customers place orders through the app.</p>
<p><b>Question from the marketing director:</b> “Next quarter, which advertising channel (Instagram, 2GIS, referral) should get more of the budget? Which city has a problem?”</p>
<p><b>Data</b> (the <code>cafe</code> database):</p>
<table>
<tr><th>Table</th><th>Columns</th></tr>
<tr><td><code>customers</code></td><td>id, city, channel (instagram / 2gis / referral), signup_date</td></tr>
<tr><td><code>orders</code></td><td>id, customer_id, order_date, amount, status (paid / refund)</td></tr>
</table>
<p>Advertising spend for the quarter: Instagram 300,000 ₸, 2GIS 150,000 ₸, referral programme 40,000 ₸.</p>
<h3>Plan</h3>
<ol>
<li>Profiling: how good is the data?</li>
<li>Write down the cleaning rules.</li>
<li>Monthly metrics: revenue, orders, average order value.</li>
<li>Segments by channel and city.</li>
<li>Repeat purchases (retention).</li>
<li>Revenue per tenge of advertising.</li>
<li>Memo: recommendation and limitations.</li>
</ol>
<h3>Turning the business question into analysis questions</h3>
<p>The director’s question is broad: “Where do we put the budget?” The analyst’s first job is to split it into questions you can measure:</p>
<ul>
<li>How many customers did each channel bring, and how much revenue did they generate?</li>
<li>Which channels’ customers come back (retention)?</li>
<li>How much revenue did each tenge spent on ads bring back in each channel (ROAS)?</li>
<li>How do average order value and order frequency differ between cities?</li>
</ul>
<p>Next to each question, write down: “Which decision does this affect?” A question that does not change a decision is interesting, but it is extra work.</p>
<div class="tip">Before you start, pin down what “revenue” means: do refunds (refund) count, and do corporate orders? Agree on the definition once and write it in the memo.</div>`,
      ex: [
        { prompt: 'Which comparison matters most for answering the director’s question?', options: ['Which channel registered more customers', 'The ratio of the revenue each channel’s customers bring to what that channel costs', 'Which city has more coffee shops', 'Which month had more orders'], explain: 'The budget decision depends on “how much comes back for each tenge spent”.' },
        { prompt: 'Why start with profiling rather than with metrics?', options: ['That is the convention', 'Data problems (empty values, refunds, outliers) can distort every number that follows', 'SQL does not work otherwise', 'To save time'], explain: 'Even a correct formula gives a wrong result if the input data is distorted.' }
      ]
    },
    'cap-2': {
      title: 'Profiling',
      body: `
<p>First we check the “health” of the <code>orders</code> table: how many rows, empty amounts, refunds (<code>refund</code>), and the date range.</p>
<p>Then we look at the largest orders: are there outliers?</p>
<div class="tip">Write down the profiling results. They go into the “Limitations” section of the memo.</div>
<h3>Profiling checklist</h3>
<p>The same questions are asked of every new table. Make them a habit:</p>
<table>
<tr><th>Question</th><th>Example SQL</th></tr>
<tr><td>How many rows?</td><td><code>COUNT(*)</code></td></tr>
<tr><td>How many empty values?</td><td><code>SUM(amount IS NULL)</code></td></tr>
<tr><td>Which statuses exist?</td><td><code>SELECT status, COUNT(*) ... GROUP BY status</code></td></tr>
<tr><td>What is the date range?</td><td><code>MIN(order_date)</code>, <code>MAX(order_date)</code></td></tr>
<tr><td>Are there outliers?</td><td><code>ORDER BY amount DESC LIMIT 5</code></td></tr>
<tr><td>Are there duplicates?</td><td>Compare <code>COUNT(*)</code> with <code>COUNT(DISTINCT id)</code></td></tr>
</table>
<p>In SQLite, the expression <code>amount IS NULL</code> gives 1 or 0, so if you wrap it in <code>SUM</code>, you get the number of empty values.</p>
<p>The goal of profiling is not to find mistakes but to understand the data. Every feature you find later becomes a cleaning rule or a limitation in the memo.</p>`,
      ex: [
        { prompt: 'From the <code>orders</code> table, return one row with: <code>n</code>, <code>null_amount</code>, <code>refunds</code>, <code>first_day</code>, <code>last_day</code>.', hints: ["<code>SUM(status = 'refund')</code>"] },
        { prompt: 'Show the 3 largest orders by amount: <code>id</code>, <code>customer_id</code>, <code>amount</code>, in descending order of amount.', hints: ['<code>ORDER BY amount DESC LIMIT 3</code>'] },
        { prompt: 'One order is 48,000 ₸, while a typical bill is about 2,500 ₸. What could this be, and what do we do?', options: ['An error, delete it right away', 'Possibly a corporate order: include it in revenue, but for average-order and customer-behaviour analysis keep it separate and document it', 'Ignore it', 'Replace it with the average'], explain: 'One large order distorts a channel’s average order value. Write down the decision.' }
      ]
    },
    'cap-3': {
      title: 'Cleaning rules',
      body: `
<p>The profiling results give these rules:</p>
<ul>
<li>Only orders with <code>status = 'paid'</code> (a refund is not revenue).</li>
<li><code>amount IS NOT NULL</code>.</li>
<li>When analysing average order value and customer behaviour, <code>amount &lt; 20000</code> (corporate orders are counted separately).</li>
</ul>
<p>Write the rules once as a CTE, then reuse it in every query:</p>
<pre><code>WITH clean AS (
  SELECT * FROM orders
  WHERE status = 'paid' AND amount IS NOT NULL AND amount &lt; 20000
)
SELECT ... FROM clean ...</code></pre>
<h3>Why keep the rules in one place?</h3>
<p>If you rewrite the filter in every query, it is easy to forget the <code>amount &lt; 20000</code> condition in one of them. Then revenue in two tables will not match, and the director will ask: “Which number is right?” One <code>clean</code> CTE makes sure every calculation relies on the same definition.</p>
<h3>Explain each rule</h3>
<table>
<tr><th>Rule</th><th>Reason</th></tr>
<tr><td><code>status = 'paid'</code></td><td>Money that was refunded is not revenue.</td></tr>
<tr><td><code>amount IS NOT NULL</code></td><td>An order with an unknown amount cannot be counted.</td></tr>
<tr><td><code>amount &lt; 20000</code></td><td>A one-off corporate order distorts the average order value.</td></tr>
</table>
<p>Count the rows you excluded and write in the memo: “N orders in the clean data, M rows excluded.” The reader must know what was dropped to trust your decision.</p>`,
      ex: [
        { prompt: 'Write the <code>clean</code> CTE and return one row with <code>orders</code> (the number of clean orders) and <code>revenue</code> (their total amount).', hints: ['Combine the three conditions with <code>AND</code>.'] }
      ]
    },
    'cap-4': {
      title: 'Monthly metrics',
      body: `
<p>The business’s “pulse”: in each month, how many orders, how much revenue, how many active customers, and the average order value.</p>
<p>You can plot the result as a line chart. We will look for the causes of growth and decline later, in the segments.</p>
<div class="tip">June is the last month, but the data is complete up to 30 June. Always check that a month is complete: an incomplete last month looks like a “decline”.</div>
<h3>How do we extract the month?</h3>
<p><code>order_date</code> is stored as text (<code>2024-03-05</code>). To get the month, take the first 7 characters:</p>
<pre><code>SELECT substr(order_date, 1, 7) AS month, COUNT(*) AS orders
FROM clean
GROUP BY month
ORDER BY month</code></pre>
<p><code>strftime('%Y-%m', order_date)</code> gives the same result.</p>
<h3>How the four metrics connect</h3>
<p>Revenue = orders × average order value. And orders = active customers × orders per customer. If revenue changes, look at which multiplier changed: are there fewer new customers, are they ordering less often, or has the average bill dropped? Each answer points the business to a different action.</p>
<div class="tip">You can calculate the average order value not only as <code>AVG(amount)</code> but also as <code>SUM(amount) * 1.0 / COUNT(*)</code>. The result is the same, but the second form is easier to check by eye.</div>`,
      ex: [
        { prompt: 'For clean orders, for each month: <code>month</code> (YYYY-MM), <code>orders</code>, <code>revenue</code>, <code>customers</code> (distinct), <code>aov</code> (average order value, rounded to a whole number with <code>ROUND</code>). Ordered by month.', hints: ['<code>clean</code> CTE + <code>GROUP BY substr(order_date, 1, 7)</code>'] },
        { prompt: 'June has fewer orders than May. What will you check before you write “decline in June” in the memo?', options: ['Nothing', 'The inflow of new customers (sign-up months) and the loss of old ones: where does the decline come from?', 'The font', 'Revenue only'], explain: 'If the total changed, break it into its parts and find the cause.' }
      ]
    },
    'cap-5': {
      title: 'Segments: channel and city',
      body: `
<p>Now we get closer to the director’s question: how do the channels differ from each other?</p>
<ul>
<li>Number of customers</li>
<li>Orders per customer (frequency)</li>
<li>Average order value</li>
<li>Revenue per customer</li>
</ul>
<p>A channel is linked to a customer in the <code>customers</code> table, so we need a <code>JOIN</code>.</p>
<h3>How is the query built?</h3>
<p>First we link the clean orders to the customer, then group by channel:</p>
<pre><code>WITH clean AS (...)
SELECT c.channel,
       COUNT(DISTINCT o.customer_id) AS customers,
       COUNT(*) AS orders,
       SUM(o.amount) AS revenue
FROM clean o
JOIN customers c ON c.id = o.customer_id
GROUP BY c.channel</code></pre>
<p>From this we get derived metrics: <code>orders * 1.0 / customers</code> is frequency, <code>revenue * 1.0 / orders</code> is average order value, and <code>revenue * 1.0 / customers</code> is the value of one customer.</p>
<h3>How to read the result</h3>
<p>The channel with the most customers is not always the best one. If a channel brings few customers but they come back often, the value of each customer is high. Show the director not only “who brings more”, but also “who is worth more”.</p>
<div class="tip">In the city analysis, also show the number of customers in each city. In a city with 5 customers, the average order value changes sharply because of a single person.</div>`,
      ex: [
        { prompt: 'Channel segments for clean orders: <code>channel</code>, <code>customers</code> (distinct customers who ordered), <code>orders</code>, <code>revenue</code>, <code>rev_per_customer</code> (revenue per customer, rounded to a whole number with <code>ROUND</code>). Ordered by revenue, descending.', hints: ['<code>customers c JOIN clean o ON o.customer_id = c.id</code>', '<code>ROUND(SUM(o.amount) * 1.0 / COUNT(DISTINCT c.id))</code>'] },
        { prompt: 'Average order value by city: <code>city</code>, <code>aov</code> (rounded to a whole number), descending.', hints: ['The JOIN from the previous query, but with <code>GROUP BY c.city</code>.'] }
      ]
    },
    'cap-6': {
      title: 'Repeat purchases (retention)',
      body: `
<p>The most important question for a coffee shop: do customers come back? A simple measure is the <b>repeat rate</b>: the share of customers who placed at least 3 clean orders.</p>
<pre><code>WITH per AS (
  SELECT customer_id, COUNT(*) AS n FROM clean GROUP BY customer_id
)
SELECT ... SUM(n >= 3) * 100.0 / COUNT(*) ...</code></pre>
<p>If the repeat rate differs by channel, we will see “cheap” customers who came once and left.</p>
<h3>Why exactly “3 orders”?</h3>
<p>The business chooses the threshold. For a coffee shop, one visit is chance, two is interest, three is a habit. In another business the threshold would be different: when renting an apartment, a second contract alone is a good result. In the memo, explain in one sentence why you chose this threshold.</p>
<h3>A small trick in SQLite</h3>
<p>The expression <code>n &gt;= 3</code> gives 1 or 0. So <code>SUM(n &gt;= 3)</code> counts the customers who meet the condition, and <code>* 100.0 / COUNT(*)</code> turns it into a percentage. It is important to write <code>100.0</code>: if you write <code>100</code>, you get integer division, and the decimal part can be lost.</p>
<h3>A cohort view</h3>
<p>The sign-up date also affects the repeat rate: a customer who signed up in June may not have had time to place three orders. A more precise analysis splits customers into cohorts by sign-up month and compares them over the same period. This project uses the simple version, but write this limitation in the memo.</p>`,
      ex: [
        { prompt: 'Repeat rate by channel: <code>channel</code>, <code>customers</code>, <code>repeat_rate</code> (share of customers with at least 3 clean orders, %, rounded to one decimal place). Descending.', hints: ['Two CTEs: <code>clean</code> and <code>per</code>.', '<code>ROUND(SUM(p.n &gt;= 3) * 100.0 / COUNT(*), 1)</code>'] }
      ]
    },
    'cap-7': {
      title: 'Advertising effectiveness in Python',
      body: `
<p>We take the SQL results into Python and compare them with advertising spend. <b>ROAS</b> (return on ad spend) = channel revenue / channel spend.</p>
<pre><code>spend = {"instagram": 300000, "2gis": 150000, "referral": 40000}</code></pre>
<p>If ROAS is below 1, the channel brought in less revenue than was spent on it (even before counting margin).</p>
<h3>How do we calculate it in Python?</h3>
<pre><code>revenue = {"instagram": 410000, "2gis": 260000, "referral": 120000}   # sample numbers
spend = {"instagram": 300000, "2gis": 150000, "referral": 40000}
for ch in spend:
    print(ch, round(revenue[ch] / spend[ch], 2))</code></pre>
<p>In this example, referral’s ROAS is 3.0 and Instagram’s is 1.37. But when you compare numbers, do not forget what stands behind them.</p>
<h3>Limitations of ROAS</h3>
<ul>
<li><b>Margin</b>: ROAS counts revenue, not profit. If the cost of coffee is 60%, even a ROAS of 1.5 can be a loss.</li>
<li><b>Attribution</b>: a customer may have heard about the shop on Instagram but signed up through a friend’s link. Then we credit them to referral.</li>
<li><b>Scale</b>: a small channel may have a high ROAS, but when you increase its budget, its efficiency usually falls.</li>
</ul>
<div class="tip">To sort a dictionary, use the pattern <code>sorted(d.items(), key=lambda x: x[1], reverse=True)</code>.</div>`,
      ex: [
        { prompt: 'Write the function <code>roas_ranking(revenue, spend)</code>: for each channel, return a list of <code>(channel, roas)</code> pairs sorted by ROAS in descending order. Round ROAS to two decimal places with <code>round</code>.', check: { tests: '_rev = {"instagram": 150000, "2gis": 138800, "referral": 79200}\n_sp = {"instagram": 300000, "2gis": 150000, "referral": 40000}\n_r = roas_ranking(_rev, _sp)\nassert _r == [("referral", 1.98), ("2gis", 0.93), ("instagram", 0.5)], f"Expected [(\'referral\', 1.98), (\'2gis\', 0.93), (\'instagram\', 0.5)], got {_r}"' }, hints: ['<code>round(revenue[ch] / spend[ch], 2)</code>', '<code>sorted(..., key=lambda p: p[1], reverse=True)</code>'] },
        { prompt: 'Referral has the highest ROAS. Can you immediately increase its budget tenfold?', options: ['Yes, of course', 'Be careful: referral has a limited reach (the number of customers who can bring in others), so increase the budget gradually and measure the result', 'No, referral is bad', 'Instagram should be switched off completely'], explain: 'A small channel’s efficiency may not hold up as it scales. Run an experiment.' }
      ]
    },
    'cap-8': {
      title: 'Memo and portfolio',
      body: `
<p>We gather the results on one page. Structure of the memo (from the Business Analytics module):</p>
<ol>
<li><b>Summary</b>: one or two sentences, with the recommendation.</li>
<li><b>Evidence</b>: channel table, repeat rate, ROAS.</li>
<li><b>Recommendation</b>: how to reallocate the budget and which experiment to run.</li>
<li><b>Limitations</b>: only 6 months, margin unknown, one corporate order calculated separately, empty amounts excluded.</li>
</ol>
<h3>How to present it in your portfolio</h3>
<ul>
<li>GitHub repository: <code>README.md</code> (question, data, method, result, recommendation), a <code>sql/</code> folder, one or two charts.</li>
<li>Put the result at the top of the README: an employer reads it in 30 seconds.</li>
<li>In your résumé: “Analysed 6 months of transactions, calculated ROAS and retention by channel, and prepared a recommendation for reallocating the budget.”</li>
</ul>
<h3>Signs of a good memo</h3>
<p>The numbers below are only an example. In your own memo, write your own results.</p>
<ul>
<li>The first sentence answers the question: “We recommend moving part of the budget from Instagram to referral.”</li>
<li>Each conclusion has a number next to it: “40% of referral customers come back, versus 22% for Instagram.”</li>
<li>The recommendation is framed as a testable experiment: “For one month, we double the referral budget and measure the number of new customers.”</li>
<li>Limitations are not hidden. They show your competence.</li>
</ul>
<h3>Common mistakes</h3>
<p>Writing the memo as a diary of your analysis (“first I did profiling, then…”) — the reader needs the result, not the process. Adding too many charts — one main table or one chart is enough. Ending without a recommendation — the director will ask again: “So what do we do?”</p>`,
      ex: [
        { prompt: 'Which opening paragraph for the memo is the best?', options: ['“I analysed 150 orders using SQL.”', '“Referral customers come back more often and bring in more revenue per advertising tenge (ROAS ≈ 2), while Instagram ads do not pay back their cost (ROAS ≈ 0.5). We recommend moving part of the budget from Instagram to referral and measuring the result over the quarter.”', '“There are many interesting things in the data.”', '“Instagram is bad.”'], explain: 'Result, evidence and action in one paragraph. (Your real numbers must match the results of your queries.)' },
        { prompt: 'Write your own memo (at least 60 words), then score it honestly against four criteria. To pass, each criterion must reach at least <b>3 / 4</b>. This is how an employer will judge your project.', done: 'Paste the memo into your portfolio README.', criteria: [
            { name: 'Answers the business question', levels: ['No answer', 'There is an answer, but it is at the end or unclear', 'The first paragraph has a clear answer', 'The first sentence has the answer, a number and a recommendation'] },
            { name: 'Evidence and numbers', levels: ['No numbers', 'One or two numbers, not verified', 'The main conclusions are backed by numbers', 'Every conclusion has a number from your queries (revenue, repeat rate, ROAS)'] },
            { name: 'Cleaning and limitations', levels: ['Not mentioned', 'Only “I cleaned the data”', 'The rules are named (NULL, refund, 48,000 ₸)', 'The rules, their effect on the result, and the limits of the data are stated'] },
            { name: 'Recommendation and next step', levels: ['No recommendation', 'A general recommendation (“improve the ads”)', 'A specific action (reallocate the budget)', 'A specific action, a deadline and how to measure the result (experiment)'] }
          ] },
        { prompt: 'What should the README of a portfolio project start with?', options: ['A list of libraries', 'The business question and the main result', 'The author’s biography', 'SQL code'], explain: 'The reader first wants to know: “What did you find?”' }
      ]
    },
    'cap-9': {
      title: 'Interview prep: SQL and case',
      body: `
<p>A Junior Data Analyst interview usually has three parts:</p>
<ol>
<li><b>SQL tasks</b> (live coding): JOIN, GROUP BY, window functions, “the second one”, duplicates.</li>
<li><b>Business case</b>: “A metric dropped by 10%, what would you do?” Structured thinking matters: check → break down → hypothesis → data.</li>
<li><b>Behavioural questions</b>: answer with the STAR method (Situation, Task, Action, Result).</li>
</ol>
<p>The tasks below are typical interview patterns, but they use our coffee shop database.</p>
<div class="tip">During live coding, think out loud: the interviewer grades not only the correct answer but also how you reason.</div>
<h3>The “second order” pattern</h3>
<p>A frequent interview task. It is solved with a window function:</p>
<pre><code>SELECT customer_id, order_date AS second_order
FROM (
  SELECT customer_id, order_date,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id) AS rn
  FROM orders
)
WHERE rn = 2</code></pre>
<p>Adding <code>id</code> to the <code>ORDER BY</code> keeps the result stable, even if two orders were placed on the same day.</p>
<h3>The “never did it” pattern</h3>
<p>To find customers who did not act within a given period, use <code>NOT EXISTS</code> or <code>LEFT JOIN ... WHERE o.id IS NULL</code>. If <code>NOT IN</code> meets a NULL in a subquery, the result is unexpectedly empty, so in an interview <code>NOT EXISTS</code> is the safer choice.</p>
<h3>An example STAR answer</h3>
<p><b>S</b>: a coffee-shop chain wanted to reallocate its advertising budget. <b>T</b>: find out which channel is effective. <b>A</b>: I cleaned the orders and calculated retention and ROAS by channel. <b>R</b>: I proposed moving 20% of the budget to referral and running a test experiment.</p>`,
      ex: [
        { prompt: 'Return the date of each customer’s <b>second</b> order (any status): <code>customer_id</code>, <code>second_order</code>. Only for customers with at least two orders.', hints: ['<code>ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id)</code>, with <code>rn = 2</code> outside.'] },
        { prompt: 'Customers who placed no orders from <code>2024-04-01</code> onward (inclusive): <code>id</code>, <code>city</code>, <code>channel</code>.', hints: ['<code>NOT IN (SELECT customer_id FROM orders WHERE ...)</code> or <code>LEFT JOIN ... IS NULL</code>.'] },
        { prompt: 'Interviewer: “Orders dropped by 30% last week. What do you do?” What is the best first step?', options: ['Blame marketing immediately', 'Check the data itself (export error, incomplete day), then break it down by city, channel and platform to find where the drop is', 'Build a model', 'Wait'], explain: 'First check whether the data is right, then answer “where?”, and only then “why?”.' }
      ]
    },
    'cap-gate': {
      title: 'Final exam: Junior Data Analyst',
      body: `
<p>The final check of the Data Analyst path. Database: <code>cafe</code>. Cleaning rule: <code>status = 'paid' AND amount IS NOT NULL AND amount &lt; 20000</code>.</p>`,
      ex: [
        { prompt: 'Return the month with the highest clean revenue: <code>month</code>, <code>revenue</code> (one row).', hints: [] },
        { prompt: 'In each city, the customer who spent the most on clean orders: <code>city</code>, <code>customer_id</code>, <code>spent</code>.', hints: [] },
        { prompt: 'Cohorts by sign-up month (the YYYY-MM part of <code>signup_date</code>): <code>cohort</code>, <code>customers</code> (all customers in the cohort), <code>buyers_q2</code> (how many of them placed at least one clean order on or after 2024-04-01). Ordered by cohort.', hints: [] },
        { prompt: 'The analysis shows that Instagram customers have a high average order value, but the reason is a single 48,000 ₸ corporate order. How will you write this in the memo?', options: ['“Instagram has the highest average order value” — with no qualification', 'I will single out the corporate order and report the average order value without it', 'I will quietly delete the order', 'I will not show the average order value at all'], explain: 'Transparency: name the outlier and show both versions. This builds trust.' }
      ]
    }
  }
});
