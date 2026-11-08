// M3.5 Power BI: English text. Code, solutions and expected output are in content/powerbi.js.
DJ.i18n.patch({
  modules: {
    'm3-5': { intro: 'Power BI is the BI tool most often asked for in analyst job ads in Kazakhstan. In this module you learn the workflow, Power Query, the data model (star schema), DAX measures, time intelligence, visual design and publishing. Power BI does not run in the browser, so the lessons are text and quizzes, and we check the logic of DAX measures in SQL. Install the free Power BI Desktop (Windows) and repeat each lesson alongside.' }
  },
  lessons: {
    'pbi-1': {
      title: 'What is Power BI: the workflow',
      body: `
<p><b>Power BI</b> is a Microsoft tool for loading, cleaning and modeling data and building interactive reports. Its main parts:</p>
<table>
<tr><th>Part</th><th>What for</th></tr>
<tr><td><b>Power BI Desktop</b></td><td>Building reports on your computer (free, Windows)</td></tr>
<tr><td><b>Power BI Service</b></td><td>Publishing, sharing and refreshing reports in the browser</td></tr>
<tr><td><b>Power BI Mobile</b></td><td>Viewing reports on your phone</td></tr>
</table>
<h3>The workflow</h3>
<pre><code>Get Data → Power Query (cleaning) → Model (relationships)
        → DAX (measures) → Visuals (report) → Publish (sharing)</code></pre>
<p>This flow is the same as what you did in SQL and Python: clean, combine, aggregate, show. The difference is that much of it is done with the mouse, and the logic is stored in <b>Power Query (the M language)</b> and <b>DAX</b> formulas.</p>
<div class="tip">If you know Excel, Power Query and Power Pivot will feel familiar: Power BI is built on top of them.</div>
<h3>When do you need Power BI?</h3>
<p>For a one-off question, a SQL query and an Excel sheet are enough. But if management looks at the same report every day or every week, rebuilding it by hand takes time and it is easy to make mistakes. In Power BI you build the report once, it refreshes itself from the source, and users answer their own questions with filters.</p>
<h3>What you learn in this module</h3>
<ul>
<li>Data cleaning steps in Power Query.</li>
<li>The star schema model and relationships between tables.</li>
<li>DAX: measures, <code>CALCULATE</code>, time functions.</li>
<li>Report design and publishing.</li>
</ul>
<p>Power BI itself is not on this site, so the exercises check concepts, and we practice DAX logic through its SQL equivalent. Install Power BI Desktop on your own computer (Windows) for free and repeat the examples alongside.</p>
<div class="tip">If you use a Mac, Power BI Desktop does not run directly. Power BI Service in the browser or a Windows virtual machine can help.</div>`,
      ex: [
        { prompt: 'What do you need to share a report with colleagues through the browser?', options: ['Power BI Desktop', 'Power BI Service', 'Power Query', 'DAX Studio'], explain: 'We build in Desktop, then publish to Service (app.powerbi.com) and share.' },
        { prompt: 'Which order of the workflow is correct?', options: ['Visuals → DAX → Power Query → Model', 'Get Data → Power Query → Model → DAX → Visuals', 'DAX → Get Data → Visuals → Model', 'Model → Visuals → Power Query → Publish'], explain: 'First we bring in and clean the data, then the model and measures, and finally the visuals.' }
      ]
    },
    'pbi-2': {
      title: 'Power Query: cleaning data',
      body: `
<p><b>Power Query</b> is the editor that loads and transforms data. Every action is recorded as a step in the <b>Applied Steps</b> list, and when the data refreshes, all steps run again automatically. Behind it is the <b>M language</b>.</p>
<h3>Common steps</h3>
<table>
<tr><th>Power Query</th><th>SQL equivalent</th></tr>
<tr><td>Change Type</td><td><code>CAST(amount AS INTEGER)</code></td></tr>
<tr><td>Filter Rows</td><td><code>WHERE status = 'paid'</code></td></tr>
<tr><td>Remove Duplicates</td><td><code>SELECT DISTINCT</code></td></tr>
<tr><td>Replace Values / Fill Down</td><td><code>COALESCE</code>, <code>CASE</code></td></tr>
<tr><td>Merge Queries</td><td><code>JOIN</code></td></tr>
<tr><td>Append Queries</td><td><code>UNION ALL</code></td></tr>
<tr><td>Group By</td><td><code>GROUP BY</code></td></tr>
<tr><td>Unpivot Columns</td><td>turning a wide table into a long one</td></tr>
</table>
<p>Example M code (Power Query writes it for you):</p>
<pre><code>= Table.SelectRows(Orders, each [status] = "paid" and [amount] &lt;&gt; null)</code></pre>
<div class="tip">Rule: do the cleaning in Power Query (or in SQL at the source) whenever you can, not in DAX. Only clean data should enter the model.</div>
<h3>How to organize the steps</h3>
<p>The longer the Applied Steps list, the harder it is to read. Three tips:</p>
<ul>
<li><b>Name your steps</b>: not "Changed Type1" but "Amount converted to number".</li>
<li><b>Filter early</b>: if you remove unneeded rows at the start, the following steps run faster.</li>
<li><b>Keep lookup tables separate</b>: make tables like a city dictionary a separate query and join them with Merge.</li>
</ul>
<h3>Unpivot example</h3>
<p>Excel often gives you a "wide" table:</p>
<table>
<tr><th>Branch</th><th>January</th><th>February</th></tr>
<tr><td>Almaty</td><td>120</td><td>135</td></tr>
</table>
<p>Select the Branch column and click <b>Unpivot Other Columns</b>, and the table becomes "long": <code>Branch | Month | Amount</code>. Now when a new month is added, you do not need to change the report: it arrives as a new row.</p>`,
      ex: [
        { prompt: 'Two branches have sales tables with the same structure. Which Power Query action combines them into one table?', options: ['Merge Queries', 'Append Queries', 'Group By', 'Unpivot'], explain: 'Append adds rows underneath (UNION ALL). Merge joins columns by a key (JOIN).' },
        { prompt: 'The months are in columns: January, February, March... How do you get the chart-friendly "month | amount" shape?', options: ['Pivot Column', 'Unpivot Columns', 'Transpose', 'Fill Down'], explain: 'Unpivot turns a wide table into a long one: each month becomes its own row.' },
        { prompt: 'Repeat the Power Query steps in SQL. From the <code>orders</code> table keep only clean orders: <code>status = \'paid\'</code>, <code>amount</code> not empty and less than 20,000. Output the columns <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>.', hints: ['Combine the three conditions with <code>AND</code>.', '<code>amount IS NOT NULL</code> checks for an empty value.'] }
      ]
    },
    'pbi-3': {
      title: 'The data model: star schema',
      body: `
<p>In Power BI it is better to have several related tables than one big table. The best structure is the <b>star schema</b>.</p>
<pre><code>        dim_date
            │
dim_customer ── fact_orders ── dim_product
            │
        dim_city</code></pre>
<table>
<tr><th>Table type</th><th>What it stores</th><th>Example</th></tr>
<tr><td><b>Fact</b></td><td>Events and numbers, many rows</td><td>orders: date, customer, amount</td></tr>
<tr><td><b>Dimension</b></td><td>Descriptions: "who, what, when, where"</td><td>customer: city, channel</td></tr>
</table>
<h3>Relationships</h3>
<ul>
<li>Usually <b>one-to-many (1:*)</b>: one customer has many orders.</li>
<li>The <b>filter direction</b> goes from the dimension to the fact. If you pick "Almaty" in a slicer, the filter flows along customers → orders.</li>
<li>Turn on a two-way (both) filter only when you really need it: it slows the model down and gives unexpected results.</li>
</ul>
<h3>The date table</h3>
<p>For time intelligence functions to work, you need a separate date table with continuous days. You mark it with <b>Mark as date table</b>.</p>
<pre><code>Date = CALENDAR(DATE(2024,1,1), DATE(2024,12,31))</code></pre>
<h3>Why is one big table bad?</h3>
<p>If you merge all columns into one table, the customer's city is repeated in every order. With 1 million orders, the word "Almaty" is stored a million times. The model gets heavy, and if a customer's city changes, you have to fix it in thousands of rows. In a star schema the city is stored once, in the customers table.</p>
<h3>Checking the model</h3>
<ul>
<li>Is the key column unique in each dimension table? If not, the relationship becomes many-to-many (*:*).</li>
<li>Does the fact table have keys that are missing from the dimension? They show up in the report as "(Blank)".</li>
<li>Are all relationships active, and is their direction correct?</li>
</ul>
<div class="tip">Take a screenshot of the model diagram (Model view) and add it to your portfolio. Looking at the model, an employer sees how you think about data.</div>`,
      ex: [
        { prompt: 'In the "First Coffee" data, which table is the fact table?', options: ['customers', 'orders', 'Date table', 'List of cities'], explain: 'orders holds events (orders) and numbers (amount). customers is the dimension that describes them.' },
        { prompt: 'In the relationship between customers (1) and orders (*), which way does the filter usually go?', options: ['orders → customers', 'customers → orders', 'Always both ways', 'No filter passes'], explain: 'From dimension to fact: if you pick a city, the orders of that city remain.' },
        { prompt: 'Why do you need a separate date table?', options: ['So the report looks nice', 'Time intelligence functions such as TOTALYTD and SAMEPERIODLASTYEAR need continuous dates', 'Power BI cannot read a date column', 'To make the file smaller'], explain: 'Days with no orders must also be in the table, otherwise calculations over time come out wrong.' }
      ]
    },
    'pbi-4': {
      title: 'DAX basics: measures and calculated columns',
      body: `
<p><b>DAX</b> (Data Analysis Expressions) is the formula language of Power BI. It looks like Excel formulas, but it works with <b>columns and tables</b>, not cells.</p>
<h3>Measure vs calculated column</h3>
<table>
<tr><th></th><th>Calculated column</th><th>Measure</th></tr>
<tr><td>When it is computed</td><td>At load time, for each row</td><td>In the visual, depending on the filter</td></tr>
<tr><td>Where it is stored</td><td>In the table (uses memory)</td><td>Not stored, just a formula</td></tr>
<tr><td>Example</td><td><code>Size = IF(orders[amount] &gt; 3000, "Big", "Small")</code></td><td><code>Revenue = SUM(orders[amount])</code></td></tr>
</table>
<p>An analogy: a calculated column is a new column added to the table, with its own value written in every row. A measure is a calculator sitting on top of the table: it computes over whatever rows are visible on screen right now.</p>
<p>Rule: an aggregate (sum, average, share) is always a <b>measure</b>. A calculated column is for describing a row, for example a category for a slicer.</p>
<h3>Example: one table, two approaches</h3>
<table>
<tr><th>id</th><th>customer_id</th><th>amount</th><th>Size (column)</th></tr>
<tr><td>1</td><td>1</td><td>2500</td><td>Small</td></tr>
<tr><td>2</td><td>2</td><td>4200</td><td>Big</td></tr>
<tr><td>3</td><td>1</td><td>1800</td><td>Small</td></tr>
<tr><td>4</td><td>1</td><td>3600</td><td>Big</td></tr>
</table>
<p>The <code>Size</code> column was computed once per row at load time. Now if we put <code>Size</code> on the rows of a matrix and the measures below in the values, each cell is computed over its own rows:</p>
<table>
<tr><th>Size</th><th>Revenue</th><th>Orders</th><th>Customers</th><th>AOV</th></tr>
<tr><td>Small</td><td>4300</td><td>2</td><td>1</td><td>2150</td></tr>
<tr><td>Big</td><td>7800</td><td>2</td><td>2</td><td>3900</td></tr>
<tr><td><b>Total</b></td><td>12100</td><td>4</td><td>2</td><td>3025</td></tr>
</table>
<p>Customers in the Total row is 2, not 1 + 2 = 3: in the total row a measure does not add up the rows, it <b>recomputes</b> over all the data. Customer 1 is in both groups but is counted only once.</p>
<h3>Core measures</h3>
<pre><code>Revenue   = SUM(orders[amount])
Orders    = COUNTROWS(orders)
Customers = DISTINCTCOUNT(orders[customer_id])
AOV       = DIVIDE([Revenue], [Orders])</code></pre>
<div class="tip"><code>DIVIDE(a, b)</code> does not throw an error on division by zero; it returns a blank. Always use it instead of <code>a / b</code>.</div>
<p>Measures can refer to each other: <code>AOV</code> uses <code>[Revenue]</code> and <code>[Orders]</code>. This helps you avoid repeating code.</p>
<h3>SQL equivalent</h3>
<table>
<tr><th>DAX</th><th>SQL</th></tr>
<tr><td><code>SUM(orders[amount])</code></td><td><code>SUM(amount)</code></td></tr>
<tr><td><code>COUNTROWS(orders)</code></td><td><code>COUNT(*)</code></td></tr>
<tr><td><code>DISTINCTCOUNT(orders[customer_id])</code></td><td><code>COUNT(DISTINCT customer_id)</code></td></tr>
<tr><td><code>DIVIDE(a, b)</code></td><td><code>a * 1.0 / b</code> (1.0 avoids integer division), rounding is <code>ROUND()</code></td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li>Making a sum a calculated column: it does not react to slicers and uses memory.</li>
<li>Counting unique customers with <code>COUNT(orders[customer_id])</code>: that gives the number of orders, while <code>COUNTROWS(customers)</code> also includes people who have not bought anything yet.</li>
<li>Dividing with <code>/</code>: an empty filter gives a division-by-zero error.</li>
</ul>`,
      ex: [
        { prompt: 'How do you build an "Average check" that changes when a city is picked in a slicer?', options: ['Calculated column', 'Measure', 'A Power Query step', 'A new table'], explain: 'A measure is computed in the context of the visual and filters, so it changes with the selection.' },
        { prompt: 'Which DAX function gives the number of unique buyers?', options: ['COUNT(orders[customer_id])', 'COUNTROWS(customers)', 'DISTINCTCOUNT(orders[customer_id])', 'SUM(orders[customer_id])'], explain: 'DISTINCTCOUNT is SQL\'s COUNT(DISTINCT ...). COUNTROWS(customers) also counts people who never ordered.' },
        { prompt: 'Over clean orders, output the SQL equivalent of the DAX measures: <code>revenue</code>, <code>orders</code>, <code>customers</code> (unique) and <code>aov</code> (rounded to a whole number).', hints: ['<code>COUNT(DISTINCT customer_id)</code> = DISTINCTCOUNT.', '<code>ROUND(SUM(amount) * 1.0 / COUNT(*))</code>'] }
      ]
    },
    'pbi-5': {
      title: 'CALCULATE and filter context',
      body: `
<p>The most important idea in DAX is <b>filter context</b>. Every cell in a visual is computed with its own filters: <code>[Revenue]</code> in the "Almaty" row adds up only Almaty orders.</p>
<h3>CALCULATE</h3>
<p><code>CALCULATE</code> computes a measure with a <b>modified</b> filter:</p>
<pre><code>Instagram Revenue = CALCULATE([Revenue], customers[channel] = "instagram")</code></pre>
<h3>ALL: removing a filter, and shares</h3>
<pre><code>Total Revenue = CALCULATE([Revenue], ALL(customers[channel]))
Share %       = DIVIDE([Revenue], [Total Revenue])</code></pre>
<p>In a table, in each channel's row <code>[Revenue]</code> is that channel's revenue, and <code>[Total Revenue]</code> is the revenue of all channels. Divide one by the other and you get the channel's share.</p>
<h3>Example: the filter context of each cell</h3>
<p>Clean orders: instagram 5000, 2gis 3000, referral 2000, total 10000. The matrix rows are <code>customers[channel]</code>:</p>
<table>
<tr><th>channel</th><th>Filter context</th><th>Revenue</th><th>Instagram Revenue</th><th>Total Revenue</th><th>Share %</th></tr>
<tr><td>instagram</td><td>channel = instagram</td><td>5000</td><td>5000</td><td>10000</td><td>50%</td></tr>
<tr><td>2gis</td><td>channel = 2gis</td><td>3000</td><td>5000</td><td>10000</td><td>30%</td></tr>
<tr><td>referral</td><td>channel = referral</td><td>2000</td><td>5000</td><td>10000</td><td>20%</td></tr>
<tr><td><b>Total</b></td><td>no filter</td><td>10000</td><td>5000</td><td>10000</td><td>100%</td></tr>
</table>
<ul>
<li><b>Revenue</b> uses the row's filter as is.</li>
<li><b>Instagram Revenue</b>: <code>channel = "instagram"</code> inside CALCULATE <b>replaces</b> the row's filter on that column (for example 2gis), so every row shows 5000.</li>
<li><b>Total Revenue</b>: <code>ALL(customers[channel])</code> removes the channel filter, so every row shows 10000.</li>
</ul>
<p>If the rows are cities, then to get the overall total you put that column, the city, inside <code>ALL</code>.</p>
<p>In SQL this is like a window function: <code>SUM(revenue) OVER ()</code> is the grand total over all rows. In a query with <code>GROUP BY channel</code>, to add up the group totals you wrap the aggregate in a window: <code>SUM(SUM(amount)) OVER ()</code>. For a percentage use <code>* 100.0</code>, and for rounding <code>ROUND(..., 1)</code>.</p>
<h3>Common mistakes</h3>
<ul>
<li>Putting a different column in <code>ALL</code>: the rows are by channel, but with <code>ALL(customers[city])</code> the channel filter stays and the share is 100% in every row.</li>
<li>Dividing the share with <code>/</code>: errors on empty rows. Use <code>DIVIDE</code>.</li>
<li>Thinking CALCULATE "adds to" the outer filter: on the same column it <b>replaces</b> the outer filter.</li>
</ul>
<div class="tip">A common interview question: "What is the difference between row context and filter context?" Row context is the "current row" in a calculated column. Filter context is the filters set by visuals and slicers. CALCULATE turns row context into filter context (context transition).</div>`,
      ex: [
        { prompt: 'A matrix has city rows. Which formula shows the total revenue of all cities in every row?', options: ['SUM(orders[amount])', 'CALCULATE([Revenue], ALL(customers[city]))', 'FILTER(orders, orders[amount] > 0)', 'DISTINCTCOUNT(customers[city])'], explain: 'ALL removes the city filter, so every row shows the overall total.' },
        { prompt: 'What does <code>CALCULATE([Revenue], customers[city] = "Астана")</code> show in the "Almaty" row?', options: ['Almaty revenue', 'Astana revenue', 'A blank', 'Total revenue'], explain: 'The filter inside CALCULATE replaces the outer filter on that column (Almaty), so every row shows Astana revenue.' },
        { prompt: 'Repeat the Share % measure in SQL. Over clean orders, for each channel (<code>customers.channel</code>) output <code>channel</code>, <code>revenue</code> and <code>share_pct</code> (share of total revenue, %, 1 decimal place). Sort by revenue, highest first.', hints: ['First JOIN <code>orders</code> and <code>customers</code>, then GROUP BY channel.', 'The grand total: <code>SUM(SUM(o.amount)) OVER ()</code>.'] }
      ]
    },
    'pbi-6': {
      title: 'Time intelligence: YTD, MoM, YoY',
      body: `
<p>The business always asks: "How does this compare with the previous period?" DAX has ready-made functions for this (a date table is required):</p>
<table>
<tr><th>Measure</th><th>DAX</th></tr>
<tr><td>Year to date (YTD)</td><td><code>TOTALYTD([Revenue], 'Date'[Date])</code></td></tr>
<tr><td>Previous month</td><td><code>CALCULATE([Revenue], DATEADD('Date'[Date], -1, MONTH))</code></td></tr>
<tr><td>Same period last year</td><td><code>CALCULATE([Revenue], SAMEPERIODLASTYEAR('Date'[Date]))</code></td></tr>
<tr><td>MoM growth %</td><td><code>DIVIDE([Revenue] - [Revenue PM], [Revenue PM])</code></td></tr>
</table>
<p>It is like a cashier's notebook: next to each month's revenue you copy the previous month's number, then compute the difference. In DAX, <code>DATEADD</code> "finds" the previous month: it shifts the filter on the date table back by one month.</p>
<pre><code>Revenue PM = CALCULATE([Revenue], DATEADD('Date'[Date], -1, MONTH))
MoM %      = DIVIDE([Revenue] - [Revenue PM], [Revenue PM])
Revenue YTD = TOTALYTD([Revenue], 'Date'[Date])</code></pre>
<h3>Example: a monthly table</h3>
<table>
<tr><th>Month</th><th>Revenue</th><th>Revenue PM</th><th>MoM %</th><th>YTD</th></tr>
<tr><td>2024-01</td><td>50 000</td><td>(blank)</td><td>(blank)</td><td>50 000</td></tr>
<tr><td>2024-02</td><td>60 000</td><td>50 000</td><td>20%</td><td>110 000</td></tr>
<tr><td>2024-03</td><td>45 000</td><td>60 000</td><td>−25%</td><td>155 000</td></tr>
<tr><td>2024-04</td><td>54 000</td><td>45 000</td><td>20%</td><td>209 000</td></tr>
</table>
<p>February: (60 000 − 50 000) / 50 000 = 0.2 = 20%. March: (45 000 − 60 000) / 60 000 = −25%. January has no previous month, so Revenue PM is blank, and <code>DIVIDE</code> gives a blank, not an error. YTD is the running total since the start of the year: 50 000 + 60 000 + 45 000 = 155 000. <code>SAMEPERIODLASTYEAR</code> works exactly the same way, only it shifts back one year (YoY). Our data covers only 2024, so it will be blank.</p>
<h3>SQL equivalent</h3>
<p>In SQL, <code>LAG()</code> gives the previous month and <code>SUM() OVER (ORDER BY month)</code> gives the running total since the start of the year. First we compute monthly revenue in a CTE, then add the window functions.</p>
<pre><code>SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev
FROM monthly;</code></pre>
<p>With several years, add <code>PARTITION BY</code> year so that YTD starts from zero in each new year.</p>
<div class="tip"><b>Common mistakes:</b>
<ul>
<li>Dividing MoM by the current month: the divisor is always the <b>previous</b> month.</li>
<li>Not marking the date table with <b>Mark as date table</b>, or using the <code>orders[order_date]</code> column: days without orders drop out and the result is wrong.</li>
<li>Putting the month on the matrix from orders instead of the date table: the filter never reaches the Date table.</li>
</ul></div>`,
      ex: [
        { prompt: 'Revenue in March is 90 000 ₸, in February 60 000 ₸. What is the MoM growth?', options: ['30%', '50%', '33%', '150%'], explain: '(90 000 − 60 000) / 60 000 = 0.5 = 50%.' },
        { prompt: 'Which function compares with exactly the same period last year?', options: ['TOTALYTD', 'SAMEPERIODLASTYEAR', 'DATEADD(..., -1, MONTH)', 'ALL'], explain: 'SAMEPERIODLASTYEAR shifts the dates back by one year.' },
        { prompt: 'Over clean orders, for each month (<code>substr(order_date,1,7)</code>) output <code>month</code>, <code>revenue</code>, <code>prev_revenue</code> (previous month, LAG) and <code>ytd</code> (running revenue since the start of the year). Sort by month.', hints: ['<code>LAG(revenue) OVER (ORDER BY month)</code>', '<code>SUM(revenue) OVER (ORDER BY month)</code> is a running total.'] }
      ]
    },
    'pbi-7': {
      title: 'Visuals and report design',
      body: `
<p>A good report answers the main question in 5 seconds. The layout:</p>
<ol>
<li><b>KPI cards at the top</b> (Card): revenue, orders, AOV, change %.</li>
<li><b>The trend in the middle</b>: a line chart by month.</li>
<li><b>The breakdown at the bottom</b>: bar chart (channel, city), Matrix (table).</li>
<li><b>Slicers on the left or at the top</b>: date, city, channel.</li>
</ol>
<h3>Which visual?</h3>
<table>
<tr><th>Question</th><th>Visual</th></tr>
<tr><td>How did it change over time?</td><td>Line chart</td></tr>
<tr><td>Compare categories</td><td>Bar chart (sorted)</td></tr>
<tr><td>One key number</td><td>Card / KPI</td></tr>
<tr><td>Exact numbers, many dimensions</td><td>Matrix</td></tr>
<tr><td>Share of a part (2–4 parts)</td><td>Stacked bar, rarely pie</td></tr>
</table>
<h3>Interactivity</h3>
<ul>
<li><b>Slicer</b>: a user filter.</li>
<li><b>Cross-filtering</b>: clicking one visual filters the others.</li>
<li><b>Drill-down</b>: going deeper through a year → month → day hierarchy.</li>
<li><b>Drill-through</b>: jumping from a row to a separate detail page (for example, a customer card).</li>
<li><b>Tooltip</b>: extra information when you hover the cursor.</li>
</ul>
<div class="tip">Do not put more than 6–8 visuals on one page. Use color only for meaning (good/bad, selected).</div>
<h3>The role of pages</h3>
<p>One report can have several pages, but each should have its own audience and question:</p>
<ul>
<li><b>Overview</b>: for the manager, 5 KPIs and one trend.</li>
<li><b>Details</b>: for a team lead, a table by city and channel.</li>
<li><b>Customer card</b>: a drill-through page, the history of one customer.</li>
</ul>
<h3>Report checklist</h3>
<ul>
<li>Does every visual's title state a conclusion?</li>
<li>Are the numbers formatted: thousands separator, the ₸ sign, percentages?</li>
<li>Do slicers work the same on every page (Sync slicers)?</li>
<li>Is the report readable on a phone (Mobile layout)?</li>
</ul>`,
      ex: [
        { prompt: 'The manager asks: "How did revenue change over 6 months?" Which visual?', options: ['Pie chart', 'Line chart', 'Matrix', 'Card'], explain: 'A line chart shows change over time most clearly.' },
        { prompt: 'In a customer list, you click one customer and go to a separate page with all their orders. What is this called?', options: ['Drill-down', 'Drill-through', 'Cross-filtering', 'Bookmark'], explain: 'Drill-through goes to another page with the context of the selected item. Drill-down goes deeper through a hierarchy inside one visual.' }
      ]
    },
    'pbi-8': {
      title: 'Publishing, refresh and security',
      body: `
<p>When the report is ready, we publish it to <b>Power BI Service</b> (Publish).</p>
<table>
<tr><th>Concept</th><th>Meaning</th></tr>
<tr><td><b>Workspace</b></td><td>The place where a team's reports and datasets live</td></tr>
<tr><td><b>Semantic model</b> (formerly dataset)</td><td>The model and measures; several reports can share it</td></tr>
<tr><td><b>Dashboard</b></td><td>A single page of visuals pinned from different reports</td></tr>
<tr><td><b>App</b></td><td>A way to distribute a workspace to a wide audience</td></tr>
<tr><td><b>Scheduled refresh</b></td><td>Automatic data refresh on a schedule</td></tr>
<tr><td><b>Gateway</b></td><td>Connecting from the cloud to a database inside the company (on-premises)</td></tr>
<tr><td><b>RLS</b> (Row-Level Security)</td><td>Each user sees only their own rows</td></tr>
</table>
<p>RLS example: so that the Almaty manager sees only Almaty data, we create a role:</p>
<pre><code>[city] = "Алматы"</code></pre>
<div class="tip">For your portfolio: build a report in Power BI Desktop, put the .pbix file on GitHub and write a README with screenshots. On a free account, creating a public web link may be limited.</div>
<h3>How does refresh work?</h3>
<p>When you publish a report, Power BI takes a copy of the data with it (Import mode). If the source changes, the copy has to be refreshed: in Power BI Service you can set up automatic refresh several times a day. In DirectQuery mode the data is not copied: every click sends a query to the source. It is always fresh, but slower.</p>
<h3>Security rules</h3>
<ul>
<li>Publishing with "Publish to web" opens the report to anyone on the internet. Do not use it for company data.</li>
<li>Give access to a workspace through roles: a Viewer only views the report, a Member can change it.</li>
<li>Test RLS roles with the <b>View as</b> button in Power BI Desktop: sign in as the manager and make sure you see only your own city.</li>
</ul>`,
      ex: [
        { prompt: 'Regional managers open the same report, and each one must see only their own city. What do we use?', options: ['A separate report for each city', 'Row-Level Security (RLS)', 'Slicer', 'Bookmark'], explain: 'RLS filters data by the user\'s role. A user can change a slicer themselves, so it is not security.' },
        { prompt: 'What is needed for Power BI Service to refresh data every day from a SQL Server database on the company\'s own server?', options: ['Gateway', 'DAX', 'Drill-through', 'Only Power Query Online'], explain: 'To connect from the cloud to an on-premises source, you install a gateway.' }
      ]
    },
    'pbi-gate': {
      title: 'Module exam: Power BI',
      body: `<p>The final test for the module. Complete all the tasks to pass.</p>`,
      ex: [
        { prompt: 'Where is the right place to fill in blank values and fix data types?', options: ['In a DAX measure', 'In Power Query', 'In the visual\'s format settings', 'In a slicer'], explain: 'Cleaning happens before the model, in Power Query.' },
        { prompt: 'In a star schema, the table that stores sales amounts and counts is:', options: ['Dimension', 'Fact', 'Date table', 'Bridge'], explain: 'The fact table stores events and numeric values.' },
        { prompt: 'Why do we write <code>DIVIDE([Revenue], [Orders])</code> instead of <code>[Revenue] / [Orders]</code>?', options: ['It is faster to type', 'On division by zero it returns a blank instead of an error', 'It rounds the result', 'There is no difference'], explain: 'DIVIDE handles division by zero safely.' },
        { prompt: 'In a table by channel, what should the divisor be to show each channel\'s share of total revenue?', options: ['SUM(orders[amount])', 'CALCULATE([Revenue], ALL(customers[channel]))', 'COUNTROWS(customers)', '[Revenue]'], explain: 'ALL removes the channel filter and gives the total revenue of all channels.' },
        { prompt: 'An "Average check" that should be filtered by city was built as a calculated column. What happens?', options: ['Everything works correctly', 'The value is computed once at row level and does not respond correctly to the filter', 'Power BI throws an error', 'The report gets faster'], explain: 'Aggregates must be measures. A calculated column is computed row by row at load time.' },
        { prompt: 'Revenue in April is 66 000 ₸, in March 88 000 ₸. What is the MoM change in percent? (if negative, write it with a minus sign)', unit: '%', explain: '(66 000 − 88 000) / 88 000 = −0.25 = −25%.' },
        { prompt: 'Build the Power BI matrix in SQL. Over clean orders, for each city (<code>customers.city</code>) output <code>city</code>, <code>revenue</code>, <code>orders</code>, <code>aov</code> (to a whole number) and <code>share_pct</code> (share of total revenue, %, 1 decimal place). Sort by revenue, highest first.' }
      ]
    }
  }
});
