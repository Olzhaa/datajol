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
<p>The data field has several roles. They share a common base (SQL, Python, statistics), but their day-to-day work differs.</p>
<table>
<tr><th>Role</th><th>What they do</th><th>Main tools</th></tr>
<tr><td><b>Data Analyst</b></td><td>Finds answers to business questions in data, builds dashboards</td><td>SQL, Excel, Power BI/Tableau, basic statistics</td></tr>
<tr><td><b>Data Scientist</b></td><td>Builds models that make predictions, analyzes experiments</td><td>Python, pandas, scikit-learn, statistics</td></tr>
<tr><td><b>Data Engineer</b></td><td>Builds systems that collect, clean and store data</td><td>SQL, Python, Airflow, Spark, cloud</td></tr>
<tr><td><b>ML Engineer</b></td><td>Puts a model into production and keeps it running reliably</td><td>Python, Docker, MLflow, FastAPI</td></tr>
<tr><td><b>GenAI Engineer</b></td><td>Builds products on top of LLMs (chatbots, RAG)</td><td>Python, LLM API, vector DB</td></tr>
</table>
<h3>Where do we start?</h3>
<p>Every path starts with SQL and Python. The Data Analyst path is the shortest: about 300–435 hours. Data Scientist adds probability, A/B testing and machine learning. ML Engineer also learns software engineering and deployment.</p>
<div class="tip">On the job market, most Data Scientist positions require a university degree. So the safest path is to get a job as a Data Analyst first and move to DS later.</div>`,
      ex: [
        { prompt: 'The director asks: "In which city did sales drop last month?" Whose job is this?', options: ['ML Engineer', 'Data Analyst', 'Data Engineer', 'GenAI Engineer'], explain: 'Answering business questions with data is the analyst\'s core job.' },
        { prompt: 'Whose job is it to ship a model as an API and monitor how it works?', options: ['ML Engineer', 'Data Analyst', 'Designer', 'Accountant'], explain: 'Deployment and monitoring are the ML Engineer\'s job.' },
        { prompt: 'Which core skill do all data roles share?', options: ['Docker', 'Power BI', 'SQL', 'PyTorch'], explain: 'SQL appears in the tool list of every role.' }
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
    'm02-1': {
      title: 'Percentages and percentage change',
      body: `
<p>The most common calculation in analytics is the percentage. It matters to calculate it correctly and to state it correctly.</p>
<h3>Share</h3>
<p><code>share = part / whole × 100%</code>. If 50 of 200 customers are from Almaty, the share = 50 / 200 × 100% = 25%.</p>
<h3>Percentage change</h3>
<p><code>change = (new − old) / old × 100%</code>. If sales grow from 80 million to 100 million: (100 − 80) / 80 = 25% growth.</p>
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
    }
  }
});
