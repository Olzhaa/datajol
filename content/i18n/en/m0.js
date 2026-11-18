// Phase 0: M0.1 The world of data, M0.2 Math refresher: English text. Code, solutions and expected output are in content/m0.js.
DJ.i18n.patch({
  lessons: {
    'm01-1': {
      title: 'What is data?',
      body: `
<p>Data is a fact about something that has been recorded and stored. Every receipt in a shop, every bank transfer, every click on a website is data. Companies look in this data for answers to questions: <em>which product sells best? why are customers leaving? how many orders will come next month?</em></p>
<h3>Two kinds of data</h3>
<ul>
<li><b>Structured</b>: in the form of a table, with rows and columns. Excel, SQL databases. This is where 80% of an analyst's work happens.</li>
<li><b>Unstructured</b>: text, images, sound, video. To process it you need ML and GenAI.</li>
</ul>
<h3>How a table is built</h3>
<p>Each <b>row</b> is one object, for example one customer. Each <b>column</b> is one property of that object, for example their city.</p>
<table><tr><th>id</th><th>name</th><th>city</th></tr><tr><td>1</td><td>Айгерім</td><td>Алматы</td></tr><tr><td>2</td><td>Нұрлан</td><td>Астана</td></tr></table>
<h3>Column types</h3>
<p><b>Numeric</b> (price, age): you can add them up and take the average. <b>Categorical</b> (city, category): you can count and group them. <b>Date and time</b> (order date): you can see a trend. Getting the type right is the first step of any analysis.</p>
<div class="tip">On this platform you do everything in the browser: there is nothing to install.</div>`,
      ex: [
        { prompt: 'What does one row in a customers table stand for?', options: ['One city', 'One customer', 'The names of all customers', 'One column'], explain: 'Each row is one object, in this case one customer.' },
        { prompt: 'What type is the "Order amount" column?', options: ['Categorical', 'Date and time', 'Numeric', 'Unstructured'], explain: 'You can add amounts up and take their average, so the column is numeric.' },
        { prompt: 'Which of these is unstructured data?', options: ['A table of bank transfers', 'The text of customer reviews', 'A product price list', 'A sales report in Excel'], explain: 'Free text has no rows or columns, so it is unstructured.' }
      ]
    },
    'm01-2': {
      title: 'Data jobs: who does what?',
      body: `
<p>The data field has several roles. Their day-to-day work differs, but all of them start from data. This platform prepares you for the first two: <b>Data Analyst</b> and <b>Data Scientist</b>.</p>
<table>
<tr><th>Role</th><th>What they do</th><th>Main tools</th></tr>
<tr><td><b>Data Analyst</b></td><td>Finds answers to business questions in data, builds dashboards</td><td>SQL, Excel, Power BI/Tableau, basic statistics</td></tr>
<tr><td><b>Data Scientist</b></td><td>Builds models that make predictions, analyzes experiments</td><td>SQL, Python, pandas, scikit-learn, statistics</td></tr>
<tr><td><b>Data Engineer</b></td><td>Builds systems that collect, clean and store data</td><td>SQL, Python, Airflow, Spark, cloud</td></tr>
<tr><td><b>ML Engineer</b></td><td>Puts a model into production and keeps it running reliably</td><td>Python, Docker, MLflow, FastAPI</td></tr>
<tr><td><b>GenAI Engineer</b></td><td>Builds products on top of LLMs (chatbots, RAG)</td><td>Python, LLM API, vector DB</td></tr>
</table>
<h3>Where do we start?</h3>
<p>Our path has two stages: <b>Data Analyst → Data Scientist</b>. Both start with SQL and Python. The Data Analyst path is the shortest: about 300–435 hours. Data Scientist adds probability, A/B testing and machine learning. The other roles in the table (Data Engineer, ML Engineer, GenAI Engineer) are specializations for after you have gained experience; you can choose one later.</p>
<div class="tip">On the job market, most Data Scientist positions require a university degree. So the safest path is to get a job as a Data Analyst first and move to DS later.</div>`,
      ex: [
        { prompt: 'The director asks: "In which city did sales drop last month?" Whose job is this?', options: ['ML Engineer', 'Data Analyst', 'Data Engineer', 'GenAI Engineer'], explain: 'Answering business questions with data is the analyst\'s core job.' },
        { prompt: 'Whose job is it to ship a model as an API and monitor how it works?', options: ['ML Engineer', 'Data Analyst', 'Designer', 'Accountant'], explain: 'Deployment and monitoring are the ML Engineer\'s job.' },
        { prompt: 'Which core skill do all three of Data Analyst, Data Scientist and Data Engineer share?', options: ['Docker', 'Power BI', 'SQL', 'PyTorch'], explain: 'In the table, SQL is in the tool list of all three of these roles: data lives in a database, and queries against it are written in SQL.' }
      ]
    },
    'm01-3': {
      title: 'Asking the right question',
      body: `
<p>Good analysis starts with a good question. A task like "analyze the sales" is too broad. An analyst turns it into a <b>measurable</b> question.</p>
<h3>Vague question → analytical question</h3>
<table>
<tr><th>Vague</th><th>Analytical</th></tr>
<tr><td>Are customers happy?</td><td>What share of customers made a repeat purchase in the last 3 months, and has it grown?</td></tr>
<tr><td>Is the advertising working?</td><td>How many tenge does each customer who came from Instagram ads cost us (CAC)?</td></tr>
</table>
<h3>Checklist</h3>
<ul>
<li>Is the <b>metric</b> clear? (count, sum, share, average)</li>
<li>Is the <b>period</b> stated? (week, month, quarter)</li>
<li>Is there a <b>comparison</b>? (with the previous period, with another group)</li>
<li>What <b>decision</b> will the answer affect?</li>
</ul>
<h3>Correlation ≠ cause</h3>
<p>In summer, both ice cream sales and drowning incidents go up. But ice cream does not cause drowning: hot weather drives both. When an analyst sees two metrics move together, they ask: "Is this a cause, or a shared factor?"</p>`,
      ex: [
        { prompt: 'Which is the best analytical question?', options: ['Is our website good?', 'How did the average amount of orders from the mobile app change in September compared with August?', 'Do customers love us?', 'Analyze the sales'], explain: 'It has a metric (average amount), a period (September), a segment (mobile) and a comparison (August).' },
        { prompt: 'Sales went up on discount days. Which conclusion is the most correct?', options: ['Discounts increase sales, this is proven', 'Other factors (a holiday, payday) may also have been at play on discount days, this needs checking', 'Discounts have no effect', 'The data is wrong'], explain: 'Moving together does not prove cause. You need to check shared factors or run an A/B test.' }
      ]
    },
    'm01-4': {
      title: 'The analysis cycle and data files',
      body: `
<p>An analyst's job is not "open a table and produce a number". Every task goes through the same cycle. If you skip a step, the result may look good and still be wrong.</p>
<h3>The 6 steps of an analysis</h3>
<ol>
<li><b>Question.</b> What does the business want to decide? Are the metric, the period and the comparison clear? (previous lesson)</li>
<li><b>Collecting data.</b> Which table or file do you need? Do you have access to it?</li>
<li><b>Checking and cleaning.</b> Empty values, duplicate rows, wrong formats. This is where most of the time goes.</li>
<li><b>Analysis.</b> Filtering, grouping, comparing: SQL, Excel or Python.</li>
<li><b>Presenting.</b> A chart, a dashboard or a short note: one conclusion, one piece of evidence.</li>
<li><b>Decision and feedback.</b> A recommendation is made, its result is measured, a new question comes up. The cycle starts again.</li>
</ol>
<div class="tip">A beginner analyst jumps straight to step 4. An experienced analyst first pins down step 1 and checks the data at step 3: a correct calculation on wrong data is still a wrong answer.</div>
<h3>What files does data come in?</h3>
<table>
<tr><th>Format</th><th>What is inside</th><th>Where you meet it</th></tr>
<tr><td><b>CSV</b></td><td>Plain text: each line is one record, values are separated by a delimiter</td><td>Exports from systems, pandas, loading into SQL</td></tr>
<tr><td><b>XLSX</b></td><td>An Excel workbook: several sheets, formulas, formatting</td><td>Accounting, the sales department, reports kept by hand</td></tr>
<tr><td><b>JSON</b></td><td>"Key: value" pairs, structures nested inside one another</td><td>API responses of websites and apps</td></tr>
</table>
<p>What a CSV file looks like inside:</p>
<pre><code>id,city,amount
1001,Алматы,2150
1002,Астана,2400</code></pre>
<p>The same record as JSON:</p>
<pre><code>{"id": 1001, "city": "Алматы", "amount": 2150}</code></pre>
<h3>Two CSV traps: the delimiter and the encoding</h3>
<ul>
<li><b>Delimiter.</b> CSV stands for "comma-separated values". But Excel in Kazakhstan uses the comma for decimals (<code>2,5</code>), so CSV files are often saved with a <b>semicolon</b> (<code>;</code>) instead. If a file opens with everything stuck in one column, the delimiter is different from the one expected.</li>
<li><b>Encoding.</b> How letters are stored in the file. The modern standard is <b>UTF-8</b>. Older systems use Windows-1251. If Kazakh text turns into unreadable characters (<code>ÐÐ»Ð¼Ð°ÑÑ</code>), the file was opened with a different encoding.</li>
</ul>
<h3>Granularity: "what is one row?"</h3>
<p>Before you start working with a table, answer one question: <b>what does one row stand for?</b> This is called the granularity of the table.</p>
<table>
<tr><th>Table</th><th>One row</th></tr>
<tr><td><code>customers</code></td><td>one customer</td></tr>
<tr><td><code>orders</code></td><td>one order</td></tr>
<tr><td><code>order_items</code></td><td>one product line in an order</td></tr>
<tr><td><code>daily_sales</code></td><td>one day of one region</td></tr>
</table>
<p>If you get the granularity wrong, the number comes out wrong. Count the rows of <code>order_items</code> and call it "the number of orders", and an order with two products is counted twice.</p>
<h3>Measure and dimension</h3>
<p>A <b>measure</b> (metric) is a number you calculate: revenue, number of orders, average order value. A <b>dimension</b> is a property you break that number down by: city, channel, month, product category. In "monthly revenue by city" the measure is revenue, and the dimensions are city and month.</p>
<h3>Two more roles: BI Analyst and Product Analyst</h3>
<p>Job postings often mention two close relatives of the Data Analyst. A <b>BI Analyst</b> builds and maintains dashboards and regular reports (Power BI, SQL). A <b>Product Analyst</b> studies how users of an app or website behave: funnels, retention, A/B tests. Both rest on the same base: SQL, tables, statistics.</p>
<h3>Common mistakes</h3>
<ul>
<li>Starting the calculation without pinning down the question.</li>
<li>Analyzing data without checking it: duplicate rows can make revenue look twice as high.</li>
<li>Counting rows without asking "what is one row?".</li>
<li>Opening a CSV in Excel and saving it without checking the delimiter and the encoding.</li>
</ul>`,
      ex: [
        { prompt: 'You have received a new table. Which step is required before you calculate the average order value?', options: ['Drawing a chart', 'Checking the data: empty values, duplicate rows, wrong formats', 'Writing a recommendation for your manager', 'Styling the dashboard'], explain: 'The cycle: question → data → checking and cleaning → analysis → presenting → decision. You cannot trust a calculation made on unchecked data.' },
        { prompt: 'You opened a CSV file in Excel: all the values are stuck in one column (<code>1001;Алматы;2150</code>). What is the most likely cause?', options: ['The file is corrupted', 'The delimiter is a semicolon, not a comma', 'The encoding is not UTF-8', 'The file contains a formula'], explain: 'The values are separated by <code>;</code>, but the program expected a comma. You need to set the right delimiter when opening the file. With a wrong encoding the columns would split, but the letters would be garbled.' },
        { prompt: 'In the <code>order_items</code> table one row is one product line in an order. There are three orders: the first has 2 different products, the second has 1, the third has 4. How many rows does the table have?', explain: '2 + 1 + 4 = 7 rows. There are only 3 orders, so counting the rows of this table does not give the number of orders.' },
        { prompt: 'In the report "Weekly number of orders by channel", which is the measure?', options: ['Channel', 'Week', 'Number of orders', 'Channel and week'], explain: 'A measure is a number you calculate (the number of orders). Channel and week are the dimensions that break it down.' },
        { prompt: 'A mobile app sends its data to your system through an API. The response looks like <code>{"user": 15, "events": [{"type": "open"}, {"type": "pay"}]}</code>. Which format is this?', options: ['CSV', 'XLSX', 'JSON', 'SQL'], explain: '"Key: value" pairs in curly braces with a nested list: this is JSON. To turn it into a table you first have to "flatten" it.' }
      ]
    },
    'm02-1': {
      title: 'Percentages and percentage change',
      body: `
<p>The most common calculation in analytics is the percentage. It matters to calculate it correctly and to state it correctly.</p>
<h3>Share</h3>
<p><code>share = part / whole × 100%</code>. If 50 of 200 customers are from Almaty, the share = 50 / 200 × 100% = 25%.</p>
<h3>Percentage change</h3>
<p><code>change = (new − old) / old × 100%</code>. If sales grow from 80 million to 100 million: (100 − 80) / 80 × 100% = 25% growth.</p>
<h3>Percent vs percentage point</h3>
<p>If conversion grows from 4% to 5%, that is growth of <b>1 percentage point</b> (p.p.), but growth of <b>25%</b>. Do not mix them up in a report.</p>
<div class="tip">Always ask "of what?": which number was the percentage calculated against?</div>`,
      ex: [
        { prompt: '400 people walked into a shop and 60 of them bought something. What is the conversion in percent?', explain: '60 / 400 × 100% = 15%.' },
        { prompt: 'The number of orders fell from 250 to 200. What is the percentage change? (write it with a minus sign)', explain: '(200 − 250) / 250 × 100% = −20%.' },
        { prompt: 'Retention grew from 20% to 30%. Which statement is correct?', options: ['It grew by 10%', 'It grew by 10 percentage points, that is by 50%', 'It grew by 30%', 'It grew by 150%'], explain: 'The difference is 10 p.p., and the relative growth is 10 / 20 = 50%.' }
      ]
    },
    'm02-2': {
      title: 'Mean, median, mode',
      body: `
<p>To describe a lot of data with one number, we use measures of the "center".</p>
<ul>
<li><b>Mean</b>: the sum of all values / their count.</li>
<li><b>Median</b>: the value exactly in the middle of the sorted list.</li>
<li><b>Mode</b>: the most frequent value.</li>
</ul>
<h3>Example: salaries</h3>
<p>Five employees: 300, 320, 350, 400, 2 500 thousand tenge. Mean = 774 thousand. Median = 350 thousand. One director's salary pushed the mean up a lot, while the median shows the "typical" employee better.</p>
<div class="tip">If the data has very large or very small values (outliers), use the median. Salaries, apartment prices and incomes are usually reported as medians.</div>
<p>With an even number of values, the median is the average of the two middle values: 2, 4, 6, 8 → (4 + 6) / 2 = 5.</p>`,
      ex: [
        { prompt: 'Values: 4, 8, 6, 2, 10. What is the mean?', explain: '(4 + 8 + 6 + 2 + 10) / 5 = 30 / 5 = 6.' },
        { prompt: 'Values: 7, 1, 9, 3, 100. What is the median?', explain: 'Sort them: 1, 3, 7, 9, 100. The middle value is 7.' },
        { prompt: 'You need to describe apartment prices in a city with one number. What do you choose?', options: ['Mean', 'Median', 'Maximum value', 'Sum'], explain: 'A few very expensive apartments distort the mean; the median is more stable.' }
      ]
    },
    'm02-3': {
      title: 'Reading charts correctly',
      body: `
<p>A chart helps you understand data quickly, but if you read it wrong, it leads to a wrong decision.</p>
<h3>Main types</h3>
<ul>
<li><b>Line</b>: change over time, such as monthly sales.</li>
<li><b>Bar</b>: comparing categories, such as revenue by city.</li>
<li><b>Histogram</b>: the distribution of one numeric variable, such as how order amounts are spread.</li>
<li><b>Scatter</b>: the relationship between two numeric variables, such as ad spend and sales.</li>
</ul>
<h3>Traps</h3>
<p><b>If the axis does not start at zero</b>, a small difference looks big: bars for 98 and 100 can look as if one is twice the other. Always check the axis scale.</p>
<p><b>Absolute vs relative:</b> when someone says "Almaty has the most complaints", remember that Almaty also has the most customers. Comparing complaints per 1000 customers is fairer.</p>`,
      ex: [
        { prompt: 'Which chart suits showing the trend of revenue over 12 months?', options: ['Pie', 'Line', 'Scatter', 'Table'], explain: 'Change over time is shown with a line chart.' },
        { prompt: 'Branch A has 50 complaints (5 000 customers), branch B has 30 complaints (1 000 customers). Which branch has the bigger problem?', options: ['A, because it has more complaints', 'B, because it has 30 complaints per 1000 customers, while A has 10', 'They are the same', 'Impossible to tell'], explain: 'Relative measure: A = 10, B = 30 complaints per 1000 customers.' }
      ]
    },
    'm02-4': {
      title: 'Weighted average, reverse percentage and rates',
      body: `
<p>You know percentages and averages. Now let's look at four situations where analysts often go wrong. In all of them the mistake has the same cause: forgetting <b>what the number was calculated against</b>.</p>
<h3>1. Weighted average</h3>
<p>The average order value of two branches:</p>
<table>
<tr><th>Branch</th><th>Number of orders</th><th>Average order value</th><th>Revenue</th></tr>
<tr><td>Almaty</td><td>80</td><td>3 000 ₸</td><td>240 000 ₸</td></tr>
<tr><td>Shymkent</td><td>20</td><td>2 000 ₸</td><td>40 000 ₸</td></tr>
</table>
<p>What is the overall average order value? The answer "(3 000 + 2 000) / 2 = 2 500" is <b>wrong</b>: it treats the two branches as equal, while Almaty has 4 times as many orders. The right way is to divide all the revenue by all the orders:</p>
<pre><code>(80 × 3 000 + 20 × 2 000) / (80 + 20) = 280 000 / 100 = 2 800 ₸</code></pre>
<p>This is a <b>weighted average</b>: each group's average is multiplied by its size (its weight). The rule: <b>do not take an average of averages</b>, divide the total by the total. The same goes for percentages: if two channels convert at 10% and 2%, the overall conversion is not 6% but <code>all buyers / all visitors</code>.</p>
<h3>2. Reverse percentage: finding the original value</h3>
<p>A product costs 6 400 ₸ with a 20% discount. What was the price before the discount? "6 400 + 20% = 7 680" is wrong: the 20% was taken from the <b>old</b> price, not the new one. The new price is 80% of the old one:</p>
<pre><code>old × 0.8 = 6 400   →   old = 6 400 / 0.8 = 8 000 ₸</code></pre>
<p>In the same way, to get the price without VAT from 11 200 ₸ that includes 12% VAT: 11 200 / 1.12 = 10 000 ₸. The general rule: <code>original = final / (1 ± percentage)</code>.</p>
<h3>3. Successive changes</h3>
<p>A price first rose by 20%, then fell by 20%. Is it back where it started? No. 100 ₸ → 120 ₸ → 96 ₸. The second 20% was taken from a bigger number (120). Percentages do not add up, they <b>multiply</b>:</p>
<pre><code>1.2 × 0.8 = 0.96   →   overall change −4%</code></pre>
<p>Growth of 10% two months in a row is not 20%: 1.1 × 1.1 = 1.21, that is 21%.</p>
<h3>4. Rates: "per 1000"</h3>
<p>Absolute numbers cannot be compared between groups of different sizes. So the figure is brought to a common base:</p>
<pre><code>complaints per 1000 orders = number of complaints / number of orders × 1000</code></pre>
<p>12 complaints on 8 000 orders: 12 / 8 000 × 1000 = 1.5. The second branch has 6 complaints on 2 000 orders: 6 / 2 000 × 1000 = 3. Fewer complaints, but the problem is twice as frequent.</p>
<h3>Rounding</h3>
<ul>
<li>Do not round <b>in the middle</b> of a calculation, round only the final result. Rounding along the way accumulates error.</li>
<li>Rounded shares may not add up to 100% (33.3% + 33.3% + 33.3% = 99.9%). This is not a mistake, but it is worth a note in the report.</li>
<li>Choose precision by meaning: revenue to whole tenge, conversion to one decimal place (4.7%).</li>
</ul>
<div class="tip">Whenever you see a percentage or an average, ask two questions: "what is in the denominator?" and "are the groups the same size?". These two questions catch most mistakes.</div>`,
      ex: [
        { prompt: 'Branch A: 300 orders, average order value 2 000 ₸. Branch B: 100 orders, average order value 4 000 ₸. What is the overall average order value of the two branches?', explain: '(300 × 2 000 + 100 × 4 000) / (300 + 100) = 1 000 000 / 400 = 2 500 ₸. The simple average (3 000) is wrong: branch A has 3 times as many orders.' },
        { prompt: 'Headphones cost 18 000 ₸ with a 25% discount. What was the price before the discount?', explain: 'The new price is 75% of the old one: 18 000 / 0.75 = 24 000 ₸. Check: 24 000 − 25% = 18 000.' },
        { prompt: 'Sales rose by 50% in January and fell by 50% in February. What is the overall change over the two months, in percent? (write it with a minus sign)', explain: '1.5 × 0.5 = 0.75, so 75% of the starting level is left: −25%.' },
        { prompt: 'A delivery service was late with 18 of 4 000 orders. How many late deliveries is that per 1000 orders?', explain: '18 / 4 000 × 1000 = 4.5.' },
        { prompt: 'Instagram: 1 000 visitors, conversion 2%. Referral: 100 visitors, conversion 13%. What is the overall conversion?', options: ['7.5% (the average of the two)', '3% (33 buyers / 1 100 visitors)', '15% (the sum)', '13%'], explain: 'Buyers: 20 + 13 = 33. Visitors: 1 100. 33 / 1 100 = 3%. The average of averages (7.5%) gives the small channel far too much weight.' },
        { prompt: 'You calculated the revenue shares of three cities: 33.3%, 33.3%, 33.3%. They add up to 99.9%. What do you do?', options: ['Add 0.1% to one city to make it 100%', 'Redo the report: there is a mistake', 'Change nothing: this is a consequence of rounding, and I add a note if needed', 'Round the shares to whole numbers'], explain: 'Each share is rounded separately, so the sum is slightly off. "Fixing" a number by hand is distorting the data.' }
      ]
    }
  }
});
