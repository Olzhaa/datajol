// M3.4 Visualization & Storytelling: English text. Code, solutions and expected output are in content/viz.js.
DJ.i18n.patch({
  modules: {
    'm3-4': { intro: 'A good chart makes sense at a glance, while a bad one misleads. In this module you will learn to choose the chart type, clean it up, use colour to highlight the main point, spot misleading charts and build a story from data (storytelling). You will prepare the chart data in SQL and Python.' }
  },
  lessons: {
    'viz-1': {
      title: 'Why visualize?',
      body: `
<p>Reading a table of numbers is slow. A chart shows the <b>pattern</b> at once: a trend, a difference, an unusual point.</p>
<h3>Anscombe’s quartet</h3>
<p>In 1973 the statistician Francis Anscombe built four data sets. Their means, variances and correlations (r ≈ 0.82) are identical. But on a chart they look completely different: one is a straight line, one is a curve, and in another a single outlier changes the whole result.</p>
<div class="tip">Lesson: do not rely on summary statistics alone. Always look at the data as a chart.</div>
<h3>Two purposes of a chart</h3>
<ul>
<li><b>Exploratory</b>: for yourself, quick, many charts. Used during EDA.</li>
<li><b>Explanatory</b>: for other people, one main message, carefully designed.</li>
</ul>
<h3>Why are charts easier for the brain?</h3>
<p>The eye compares length, position and colour almost instantly, while reading a number means processing each digit separately. For example, 12 months of sales in a table are 12 numbers. To find the best month, you have to compare them all. On a line chart the peak is visible at once.</p>
<h3>Best uses of a chart</h3>
<ul>
<li><b>Trend</b>: is the metric going up or down?</li>
<li><b>Comparison</b>: which city, channel or product is ahead?</li>
<li><b>Distribution</b>: what amount do most orders fall into?</li>
<li><b>Outlier</b>: is there a point that stands far apart from the rest?</li>
</ul>
<h3>When is a table better?</h3>
<p>If the reader needs exact values (accounting, a price list) or is looking for a few specific numbers, a table is better than a chart. The rule: to show a pattern, use a chart; to find an exact number, use a table.</p>
<div class="tip">In this module we focus on understanding charts and preparing data. The tool that draws the chart (Excel, Power BI, matplotlib) may change later, but these rules stay the same.</div>`,
      ex: [
        { prompt: 'What does Anscombe’s quartet show?', options: ['The mean is always enough', 'Data sets with identical statistics can look completely different on a chart', 'Correlation proves cause', 'Charts are not necessary'], explain: 'Only a chart reveals what lies behind the numbers.' },
        { prompt: 'What kind of chart should you show the manager at a meeting?', options: ['Exploratory: all the columns in one chart', 'Explanatory: one main message, no extra elements', 'A table only', 'As colourful as possible'], explain: 'An explanatory chart leads the audience to one conclusion.' }
      ]
    },
    'viz-2': {
      title: 'Choosing a chart type',
      body: `
<p>The question you are answering decides the chart type:</p>
<table>
<tr><th>Question</th><th>Chart</th></tr>
<tr><td>Compare categories</td><td>Bar chart; horizontal for long labels</td></tr>
<tr><td>Change over time</td><td>Line chart</td></tr>
<tr><td>Parts of a whole</td><td>Stacked bar or 100% bar; pie only for 2–3 parts</td></tr>
<tr><td>Distribution</td><td>Histogram, box plot</td></tr>
<tr><td>Relationship between two variables</td><td>Scatter plot</td></tr>
<tr><td>One important number</td><td>Big number (KPI card)</td></tr>
</table>
<p>Example: customers by city. Horizontal bars sorted in descending order make the comparison easier:</p>
<svg class="chart" viewBox="0 0 520 162" role="img" aria-label="Customers by city"><text x="88" y="24" text-anchor="end" font-size="13" fill="var(--ink-2)">Алматы</text><rect x="96" y="10" width="376" height="20" rx="3" fill="var(--accent)"/><text x="478" y="24" font-size="12" fill="var(--ink)">420</text><text x="88" y="54" text-anchor="end" font-size="13" fill="var(--ink-2)">Астана</text><rect x="96" y="40" width="277.5238095238095" height="20" rx="3" fill="var(--accent)"/><text x="379.5238095238095" y="54" font-size="12" fill="var(--ink)">310</text><text x="88" y="84" text-anchor="end" font-size="13" fill="var(--ink-2)">Шымкент</text><rect x="96" y="70" width="161.1428571428571" height="20" rx="3" fill="var(--accent)"/><text x="263.1428571428571" y="84" font-size="12" fill="var(--ink)">180</text><text x="88" y="114" text-anchor="end" font-size="13" fill="var(--ink-2)">Ақтөбе</text><rect x="96" y="100" width="107.42857142857142" height="20" rx="3" fill="var(--accent)"/><text x="209.42857142857142" y="114" font-size="12" fill="var(--ink)">120</text><text x="88" y="144" text-anchor="end" font-size="13" fill="var(--ink-2)">Қарағанды</text><rect x="96" y="130" width="85.04761904761904" height="20" rx="3" fill="var(--accent)"/><text x="187.04761904761904" y="144" font-size="12" fill="var(--ink)">95</text></svg>
<div class="tip">In a pie chart the eye compares angles poorly. With more than 5 slices, a bar chart is always better.</div>
<h3>Selection algorithm</h3>
<ol>
<li>Write the question in one sentence: “Which city has the most customers?”</li>
<li>Find the key words: “which … the most” means a comparison.</li>
<li>From the table, pick the chart that answers that kind of question: a comparison means a bar chart.</li>
<li>Check the number of categories and the length of the labels: long labels mean a horizontal bar chart.</li>
</ol>
<h3>Common mistakes</h3>
<ul>
<li><b>Bar chart for time</b>: fine for 3–4 periods, but for 24 months a line chart is clearer.</li>
<li><b>Line chart for categories</b>: there is no “time” between cities, so the line falsely connects them.</li>
<li><b>Pie with many slices</b>: 8 categories cannot be compared; use a sorted bar chart.</li>
<li><b>Scatter with too few points</b>: drawing a conclusion about a relationship from 5 points is risky.</li>
</ul>
<p>If you are not sure, choose a bar chart: any reader understands it at once.</p>`,
      ex: [
        { prompt: 'Which chart shows the trend in monthly revenue over the last 12 months?', options: ['Pie (pie chart)', 'Line (line chart)', 'Scatter (scatter plot)', 'Histogram'], explain: 'A change over time is best seen on a line.' },
        { prompt: 'How do you show the relationship between advertising spend and sales (50 regions)?', options: ['Scatter plot', 'Pie chart', 'Line chart', 'Table'], explain: 'A relationship between two numeric variables is shown with a scatter plot.' },
        { prompt: 'You need to show the share of 8 product categories in revenue. What is the best choice?', options: ['An 8-slice pie chart', 'A horizontal bar chart sorted in descending order', '3D pie', 'Line chart'], explain: 'Eight pie slices are hard to read, while a sorted bar chart shows the comparison at once.' },
        { prompt: 'How do you see how order amounts are distributed?', options: ['Histogram', 'Pie', 'Line', 'KPI card'], explain: 'A distribution is shown with a histogram or a box plot.' }
      ]
    },
    'viz-3': {
      title: 'Drawing a bar chart correctly',
      body: `
<h3>Rules</h3>
<ol>
<li><b>The axis starts at zero.</b> Bar length must be proportional to the value.</li>
<li><b>Sort the bars.</b> Sort by value, not alphabetically (except for categories with a natural order: months, age groups).</li>
<li><b>Use horizontal bars for long labels.</b> The text stays readable without tilting.</li>
<li><b>Label the values directly.</b> Then gridlines are not needed.</li>
</ol>
<h3>Preparing the data</h3>
<p>Chart data usually comes from SQL already aggregated and sorted:</p>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
ORDER BY customers DESC;</code></pre>
<h3>A text chart in Python</h3>
<p>You can draw a quick “chart” without any library: each value is shown as a row of symbols.</p>
<pre><code>for name, v in [("Алматы", 420), ("Астана", 310)]:
    print(f"{name:&lt;8} {'█' * (v // 30)} {v}")</code></pre>
<h3>Grouped and stacked bars</h3>
<p>If you need to compare two dimensions (for example city × year), there are two options:</p>
<ul>
<li><b>Grouped</b>: two bars next to each city, this year and last year. Good for comparing the change within each city.</li>
<li><b>Stacked</b>: parts inside one bar. They show the total and its composition, but the middle parts are hard to compare.</li>
</ul>
<h3>A tip for the Python task</h3>
<p>To sort a dictionary by value, use <code>sorted(data.items(), key=lambda kv: kv[1], reverse=True)</code>. If the largest value gets the width <code>width</code>, the others are scaled proportionally: <code>round(v / max_v * width)</code>. Do not forget to turn the result into a whole number, because a string cannot be multiplied by a fractional number.</p>
<div class="tip">The bar widths and the gaps between them should be roughly equal. Bars that are too thin look like lines, and bars that are too thick tire the eye.</div>`,
      ex: [
        { prompt: 'Prepare data for a bar chart: revenue for each category from delivered orders, with the columns <code>category</code> and <code>revenue</code>, sorted by revenue in descending order.', hints: ['Join the three tables with JOIN and use <code>GROUP BY p.category ORDER BY revenue DESC</code>.'] },
        { prompt: '<code>text_bars(data, width=20)</code>: write the function. <code>data</code> is a dictionary. It must return a list of strings sorted by value in descending order. Each string is <code>f"{name:&lt;10}{\'█\' * n} {value}"</code>, where <code>n = round(value / max * width)</code>.', check: { tests: '_r = text_bars({"Астана": 310, "Алматы": 420, "Шымкент": 105}, width=8)\nassert isinstance(_r, list) and len(_r) == 3, "Return a list of 3 strings"\nassert _r[0] == "Алматы    ████████ 420", f"1st string: {_r[0]!r}"\nassert _r[1] == "Астана    ██████ 310", f"2nd string: {_r[1]!r} (310 / 420 * 8 ≈ 6)"\nassert _r[2] == "Шымкент   ██ 105", f"3rd string: {_r[2]!r}"' }, hints: ['<code>sorted(data.items(), key=lambda kv: kv[1], reverse=True)</code>', '<code>f"{name:&lt;10}"</code> pads the name to 10 characters.'] }
      ]
    },
    'viz-4': {
      title: 'Time series: the line chart',
      body: `
<p>A line chart shows continuous time: days, weeks, months. The rules:</p>
<ul>
<li>Time always goes on the horizontal axis, from left to right.</li>
<li>No more than 3–4 lines on one chart. If there are more, highlight one and grey out the rest.</li>
<li>Two different Y axes (dual axis) are often misleading: by changing the scales you can make any “relationship” appear.</li>
<li>If the daily noise is large, add a 7-day moving average (in the Advanced SQL course this is <code>ROWS BETWEEN</code>).</li>
</ul>
<p>On a line chart the Y axis does not have to start at zero: here we look at the <b>change</b>, not at the length. But do not squeeze the axis so much that small fluctuations look like a collapse.</p>
<h3>Preparing data for a line chart</h3>
<p>A time series needs one value per period. If one day has several rows, aggregate them first:</p>
<pre><code>SELECT day, SUM(revenue) AS revenue
FROM daily_sales
GROUP BY day
ORDER BY day;</code></pre>
<p><code>ORDER BY day</code> matters: if the data is not sorted, the line jumps back and forth and becomes a tangled thread.</p>
<h3>Empty periods</h3>
<p>If there were no sales on some day, that day does not appear in the SQL result at all. On the chart the line then connects the two neighbouring days directly, and it looks as if there was no drop. Make a <code>LEFT JOIN</code> with a calendar table and put 0 for the empty day.</p>
<h3>Annotation</h3>
<p>Next to a sharp change on the line, write the reason: “promotion launched”, “site was down”. The reader will not waste time looking for the cause.</p>
<div class="tip">A weekly or monthly aggregate reduces the daily noise, but it can hide short events. Choose the period that fits your goal.</div>`,
      ex: [
        { prompt: 'For a line chart, output the total daily revenue for two regions from <code>daily_sales</code>: <code>day</code>, <code>revenue</code>, in day order.', hints: ['<code>GROUP BY day ORDER BY day</code>'] },
        { prompt: 'One chart shows the monthly sales of 12 cities, each in its own colour. What do we do?', options: ['Make the colours brighter', 'Highlight 1–2 main cities in colour and grey out the rest, or split them into small charts', 'Switch to a pie chart', 'Add 3D'], explain: 'A “spaghetti” chart becomes clear after highlighting or small multiples.' }
      ]
    },
    'viz-5': {
      title: 'Colour and unnecessary elements',
      body: `
<p><b>Data-ink ratio</b> (Edward Tufte): the ink in a chart should be spent on showing the data. An extra frame, a shadow, 3D or thick gridlines are noise.</p>
<h3>Use colour on purpose</h3>
<p>If everything is coloured differently, nothing stands out. Make everything grey and highlight the main point with one colour:</p>
<svg class="chart" viewBox="0 0 520 162" role="img" aria-label="Chart with Shymkent highlighted"><text x="88" y="24" text-anchor="end" font-size="13" fill="var(--ink-2)">Алматы</text><rect x="96" y="10" width="376" height="20" rx="3" fill="var(--line-strong)"/><text x="478" y="24" font-size="12" fill="var(--ink)">420</text><text x="88" y="54" text-anchor="end" font-size="13" fill="var(--ink-2)">Астана</text><rect x="96" y="40" width="277.5238095238095" height="20" rx="3" fill="var(--line-strong)"/><text x="379.5238095238095" y="54" font-size="12" fill="var(--ink)">310</text><text x="88" y="84" text-anchor="end" font-size="13" fill="var(--ink-2)">Шымкент</text><rect x="96" y="70" width="161.1428571428571" height="20" rx="3" fill="var(--accent)"/><text x="263.1428571428571" y="84" font-size="12" fill="var(--ink)">180</text><text x="88" y="114" text-anchor="end" font-size="13" fill="var(--ink-2)">Ақтөбе</text><rect x="96" y="100" width="107.42857142857142" height="20" rx="3" fill="var(--line-strong)"/><text x="209.42857142857142" y="114" font-size="12" fill="var(--ink)">120</text><text x="88" y="144" text-anchor="end" font-size="13" fill="var(--ink-2)">Қарағанды</text><rect x="96" y="130" width="85.04761904761904" height="20" rx="3" fill="var(--line-strong)"/><text x="187.04761904761904" y="144" font-size="12" fill="var(--ink)">95</text></svg>
<p>Now it is immediately clear that the chart is about Shymkent.</p>
<h3>Accessibility</h3>
<ul>
<li>About 8% of men find it hard to tell red from green. Do not rely on these two colours alone.</li>
<li>Add a difference beyond colour: a label, a shape, a line style.</li>
</ul>
<h3>Three types of colour palettes</h3>
<table>
<tr><th>Type</th><th>When</th><th>Example</th></tr>
<tr><td>Categorical</td><td>Groups with no order</td><td>Cities, channels: different colours</td></tr>
<tr><td>Sequential</td><td>From small to large</td><td>Revenue map: from light to dark</td></tr>
<tr><td>Diverging</td><td>From a middle point out to two sides</td><td>Deviation from plan: red ← grey → blue</td></tr>
</table>
<h3>What do we remove?</h3>
<ul>
<li>The frame around the chart and the background colour.</li>
<li>Thick gridlines: if the values are labelled right on the bars, gridlines are not needed.</li>
<li>The legend when there is only one series: the chart title already explains it.</li>
<li>3D effects and shadows: they distort the values.</li>
</ul>
<p>Remove the elements one at a time and ask yourself: “Did the chart become unclear?” If not, that element was extra.</p>`,
      ex: [
        { prompt: 'How do you convey the point “sales fell only in Shymkent this year”?', options: ['A bright colour for every city', 'All cities in grey, Shymkent in one accent colour with a short label', 'Remove Shymkent', 'Add a 3D effect'], explain: 'One accent colour directs the eye to where it is needed.' },
        { prompt: 'What improves the data-ink ratio?', options: ['A background picture', 'Labelling the values next to the bars and dropping the thick gridlines', 'A shadow', 'A gradient on each bar'], explain: 'Direct labels make the gridlines unnecessary.' }
      ]
    },
    'viz-6': {
      title: 'Misleading charts',
      body: `
<p>You can mislead people even with correct numbers. The most common tricks:</p>
<h3>1. A truncated axis</h3>
<p>Sales grew from 95 to 100 (≈5%). But if the axis starts at 90, the bars show a twofold difference:</p>
<svg class="chart" viewBox="0 0 520 72" role="img" aria-label="Chart with a truncated axis"><text x="88" y="24" text-anchor="end" font-size="13" fill="var(--ink-2)">Last year</text><rect x="96" y="10" width="188" height="20" rx="3" fill="var(--accent)"/><text x="290" y="24" font-size="12" fill="var(--ink)">95</text><text x="88" y="54" text-anchor="end" font-size="13" fill="var(--ink-2)">This year</text><rect x="96" y="40" width="376" height="20" rx="3" fill="var(--accent)"/><text x="478" y="54" font-size="12" fill="var(--ink)">100</text></svg>
<p>The same data on an axis that starts at zero:</p>
<svg class="chart" viewBox="0 0 520 72" role="img" aria-label="Chart with an axis starting at zero"><text x="88" y="24" text-anchor="end" font-size="13" fill="var(--ink-2)">Last year</text><rect x="96" y="10" width="357.2" height="20" rx="3" fill="var(--accent)"/><text x="459.2" y="24" font-size="12" fill="var(--ink)">95</text><text x="88" y="54" text-anchor="end" font-size="13" fill="var(--ink-2)">This year</text><rect x="96" y="40" width="376" height="20" rx="3" fill="var(--accent)"/><text x="478" y="54" font-size="12" fill="var(--ink)">100</text></svg>
<h3>2. Cherry picking</h3>
<p>Showing only 3 months when there was growth and hiding the annual decline.</p>
<h3>3. 3D and disproportionate shapes</h3>
<p>In a 3D pie the front slice looks bigger. If you make an icon twice as tall, its area grows fourfold.</p>
<div class="tip">The “lie factor” = size of the effect in the chart / size of the effect in the data. It should be close to 1.</div>
<h3>4. Area and volume</h3>
<p>If you double the radius of a circle, its area grows fourfold. In an infographic, a value shown through the radius exaggerates the difference. Show the value through the area or, better, through the bar length.</p>
<h3>5. Mismatched scales</h3>
<p>If two charts stand side by side and their Y axes differ, the reader compares the bars and draws a wrong conclusion. For comparison, make the axes the same.</p>
<h3>6. Cumulative sums (a running total)</h3>
<p>A running total always grows, so even when daily sales fall, a cumulative chart shows “growth”. When you show such a chart, add the daily values too.</p>
<div class="tip">To check your chart, show it to a colleague who has not seen the data and ask: “What is happening here?” If their answer differs from your point, the chart misleads.</div>`,
      ex: [
        { prompt: 'On a chart the axis starts at 90. Visually, how many times longer is the bar for 100 than the bar for 95?', explain: 'Bar lengths: 95 − 90 = 5 and 100 − 90 = 10. 10 / 5 = 2 times, while the real ratio is 100 / 95 ≈ 1.05.' },
        { prompt: 'In which chart is a truncated axis acceptable?', options: ['In a bar chart', 'In a line chart, to show a change, if this is clearly marked', 'In a pie chart', 'Nowhere'], explain: 'The length of a bar represents the value, while a line shows the change.' }
      ]
    },
    'viz-7': {
      title: 'Building a story from data',
      body: `
<p>An analyst’s chart should lead to action. The “Storytelling with Data” approach by Cole Nussbaumer Knaflic:</p>
<ol>
<li><b>Know your audience</b>: who are they, what do they decide, what do they already know?</li>
<li><b>One main message</b> (the Big Idea): in one sentence, with a concrete action.</li>
<li><b>The title is the conclusion.</b> Not “Monthly sales”, but “Sales fell 12% in September because of a mobile payment bug”.</li>
<li><b>Annotation</b>: a short explanation next to the important point.</li>
<li><b>Structure</b>: context → problem → solution.</li>
</ol>
<div class="tip">Test: can a person who looks at the chart for 5 seconds name the main message? If not, fix the title or the highlighting.</div>
<h3>Example: two versions of one chart</h3>
<p><b>Bad:</b> the title “Monthly sales 2024”, a line in 12 colours, a legend on the right, no annotations. The reader spends 30 seconds looking for what happened and still does not understand.</p>
<p><b>Good:</b> the title “Mobile payments halved since 9 September”. The mobile payments line is red, the rest are grey. Next to 9 September is the note “app update”. The reader sees the problem in 5 seconds.</p>
<h3>Presentation structure</h3>
<ol>
<li><b>Context</b>: “We track mobile payments; usually there are about 320 a day.”</li>
<li><b>Problem</b>: “Since 9 September there are about 180, a difference of roughly X ₸ per month.”</li>
<li><b>Cause</b>: “After the update, a bug appeared in the payment module.”</li>
<li><b>Action</b>: “Roll back to the previous version. Owner: mobile team. Deadline: Friday.”</li>
</ol>
<div class="tip">If someone reads only the slide titles, the full story should still make sense. This is called the “title test”.</div>`,
      ex: [
        { prompt: 'Which chart title is the best?', options: ['“Sales, 2024”', '“Customers by channel”', '“Referral CAC is 4 times lower than ads: we suggest moving part of the budget to referral”', '“Chart 1”'], explain: 'The title names both the conclusion and the action.' },
        { prompt: 'What is a “Big Idea”?', options: ['The biggest chart', 'The one main message and the recommendation you deliver to the audience, in one sentence', 'A list of all the data', 'The name of the dashboard'], explain: 'If the idea does not fit into one sentence, it is not clear yet.' }
      ]
    },
    'viz-8': {
      title: 'Dashboard design',
      body: `
<p>A dashboard is a set of several charts on one screen. A good dashboard answers one question: “How is the business doing, and where should I look?”</p>
<h3>Structure</h3>
<ul>
<li><b>KPIs on top</b>: 3–5 key numbers, compared with the previous period.</li>
<li><b>Trend in the middle</b>: a line chart of the main metric.</li>
<li><b>Breakdowns below</b>: by category, region, channel.</li>
<li><b>Filters</b>: date, region — at the top or on the left, and only a few.</li>
</ul>
<p>People read a screen like the letter “F”: the most important place is the top-left corner.</p>
<div class="tip">Every chart must answer the question “what is it for?” If there is no answer, remove it.</div>
<h3>Steps to design a dashboard</h3>
<ol>
<li><b>Identify the user</b>: who opens the dashboard, and how often? A director needs a weekly overview, a manager needs daily monitoring.</li>
<li><b>Write down the questions</b>: which 3–5 questions should the user get answers to from the dashboard?</li>
<li><b>One chart per question</b>: pick the type that fits the question (lesson viz-2).</li>
<li><b>Sketch</b>: draw it on paper or in a slide and show it to the user. Changing a sketch is much cheaper than changing a dashboard.</li>
<li><b>Build and check</b>: do the numbers match the SQL query?</li>
</ol>
<h3>KPI card</h3>
<p>A good card has three things: the metric itself (as a big number), a comparison (“+8% vs last week”) and a colour for the direction (good — green, bad — red). Add an ↑ or ↓ sign too, so the meaning is clear even without colour.</p>
<div class="tip">Show clearly when the dashboard was last updated. Decisions based on old data are a common mistake.</div>`,
      ex: [
        { prompt: 'What do we put in the top-left corner of a dashboard?', options: ['The company logo', 'The most important KPI', 'A list of filters', 'The most detailed table'], explain: 'The eye falls there first.' },
        { prompt: 'A management dashboard has 24 charts. What is the best step?', options: ['Add one more chart', 'Ask what decision each chart helps to make, then remove the rest or move them to a separate page', 'Reduce the font size', 'Replace them all with pie charts'], explain: 'A few purposeful charts make a dashboard useful.' }
      ]
    },
    'viz-gate': {
      title: 'Module exam: Visualization & Storytelling',
      body: `
<p>Final check: choosing a chart, preparing data, misleading charts and building a story.</p>`,
      ex: [
        { prompt: '<b>metrics.</b> Data for a bar chart by channel: <code>channel</code> and <code>buyers</code> (unique users who reached the <code>purchase</code> step), in descending order. Channels with no buyers must also appear, with 0.' },
        { prompt: '<code>top_n_other(data, n)</code>: write the function. It keeps the <code>n</code> largest values in the dictionary and adds up the rest under one key, <code>"Басқа"</code> (“other”). If nothing is left over, the key <code>"Басқа"</code> is not added.', check: { tests: '_d = {"A": 50, "B": 30, "C": 10, "D": 6, "E": 4}\nassert top_n_other(_d, 2) == {"A": 50, "B": 30, "Басқа": 20}, f"top_n_other(_d, 2) is wrong: {top_n_other(_d, 2)}"\nassert top_n_other({"A": 1, "B": 2}, 5) == {"B": 2, "A": 1}, "If nothing is left over, «Басқа» is not added"' } },
        { prompt: 'Conversion rose from 2.1% to 2.3%. On a slide, a bar chart with the axis starting at 2.0% makes it look as if conversion tripled. What do you do?', options: ['Leave it, it looks impressive', 'Start the axis at zero, or state the change as a number: +0.2 pp (+9.5%)', 'Switch to a pie chart', 'Remove the chart and just write “grew”'], explain: 'A bar’s length must be proportional to its value, and the change is better stated as an exact number.' },
        { prompt: 'A rise of 0.2 percentage points (2.1% → 2.3%) is how many percent in relative terms? (one digit after the decimal point)', unit: '%', explain: '(2.3 − 2.1) / 2.1 ≈ 9.5%.' }
      ]
    },
    'viz-9': {
      title: 'BI tools: Superset, DataLens, Tableau, Looker Studio, Qlik',
      body: `
<p>Analyst vacancies in Kazakhstan name Power BI most often, but it is not the only one: banks and telecoms use <b>Qlik Sense</b> and <b>Tableau</b>, IT companies use the open-source <b>Apache Superset</b>, startups in the CIS market use <b>Yandex DataLens</b>, and marketing teams use <b>Looker Studio</b>. The good news: they all share the same logic. Once you understand one, you can move to another in a week.</p>
<h3>The same path in every BI tool</h3>
<pre><code>Source (connection) → Dataset → Chart → Dashboard → Filters</code></pre>
<ol>
<li><b>Connecting to a source</b>: PostgreSQL, ClickHouse, Google Sheets, CSV.</li>
<li><b>Dataset</b>: the table a chart is built on. It can be an existing table, a view, or a SQL query you wrote.</li>
<li><b>Chart</b>: you pick a dimension (city, month) and a measure (SUM, COUNT), and the tool computes the aggregate itself.</li>
<li><b>Dashboard</b>: several charts on one page.</li>
<li><b>Filters</b>: a date range, a city. One filter affects every chart.</li>
</ol>
<h3>A map of terms</h3>
<table>
<tr><th>Concept</th><th>Power BI</th><th>Superset</th><th>DataLens</th><th>Tableau</th><th>Looker Studio</th></tr>
<tr><td>Data table</td><td>Semantic model (dataset)</td><td>Dataset</td><td>Dataset</td><td>Data source</td><td>Data source</td></tr>
<tr><td>Calculated metric</td><td>Measure (DAX)</td><td>Metric (a SQL expression)</td><td>Calculated field</td><td>Calculated field</td><td>Calculated field</td></tr>
<tr><td>One chart</td><td>Visual</td><td>Chart</td><td>Chart</td><td>Worksheet</td><td>Chart</td></tr>
<tr><td>Page of charts</td><td>Report</td><td>Dashboard</td><td>Dashboard</td><td>Dashboard</td><td>Report</td></tr>
<tr><td>Filter control</td><td>Slicer</td><td>Native filter</td><td>Selector</td><td>Filter, parameter</td><td>Control</td></tr>
<tr><td>Where you write SQL</td><td>Power Query (native query)</td><td>SQL Lab</td><td>QL chart</td><td>Custom SQL</td><td>Custom query</td></tr>
</table>
<p>What sets Qlik Sense apart is its <b>associative model</b>: click one value and the related values in every table are highlighted at once; formulas are written in the set analysis language, like <code>Sum({&lt;Year={2026}&gt;} Sales)</code>.</p>
<h3>Superset: a tool for the analyst who knows SQL</h3>
<p><b>SQL Lab</b> is a SQL editor in the browser. You write a query, look at the result, then save that query as a dataset with the "Create chart" button. The SQL skills from this course apply here directly. DataLens and Looker Studio let you start from SQL in the same way.</p>
<h3>How to build a chart-ready dataset</h3>
<ul>
<li><b>Define the grain</b>: what does one row mean? "One order" or "month × category". Do not mix two levels in one table.</li>
<li><b>Long format</b>: categories belong in rows, not in column names: <code>month, category, revenue</code>. Then a new category does not change the dataset, and the BI tool can easily turn it into a colour or a filter.</li>
<li><b>Store the components, not the ratio</b>: <code>revenue</code> and <code>orders</code> instead of the average order value. BI computes the average order value correctly under any filter as <code>SUM(revenue) / SUM(orders)</code>. Averaging ready-made averages again gives a wrong result.</li>
<li><b>A date should be a real date</b>: <code>2026-03-01</code>, not the text <code>'2026-03'</code>. Then the time axis and the "last 90 days" filter work.</li>
<li><b>Add the dimensions your filters need</b>: city, status, channel. You cannot filter by a column that is not in the dataset.</li>
</ul>
<h3>Which tool when</h3>
<table>
<tr><th>Situation</th><th>Tool</th></tr>
<tr><td>Corporate reporting, a Microsoft environment, users who are close to Excel</td><td>Power BI</td></tr>
<tr><td>Data in ClickHouse/PostgreSQL, the team knows SQL, no budget for licences</td><td>Superset</td></tr>
<tr><td>A quick, free cloud dashboard that works well with ClickHouse</td><td>DataLens</td></tr>
<tr><td>Marketing: Google Analytics, Google Ads, Sheets</td><td>Looker Studio</td></tr>
<tr><td>Complex interactive visualization, exploration</td><td>Tableau</td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li>Putting precomputed percentages and averages into the dataset and then summing or averaging them in BI.</li>
<li>Writing separate SQL for every chart: the numbers stop matching each other. Build one dataset per topic and draw every chart from it.</li>
<li>Connecting a raw million-row table directly: the dashboard opens slowly. Aggregate to the day or month level.</li>
</ul>
<div class="tip">On your résumé, write what you did, not just the tool's name: "Built a sales dashboard in Superset on ClickHouse data: 1 dataset, 6 charts, 3 filters". Superset and DataLens can be installed for free, so you can build a portfolio project.</div>`,
      ex: [
        { prompt: 'What does "dataset" mean in Superset?', options: ['A finished chart', 'A table, a view or a saved SQL query that charts are built on', 'A PDF copy of a dashboard', 'A list of users'], explain: 'A dataset is the data source of a chart. You can also create one from a query written in SQL Lab. It corresponds to a model table in Power BI and a data source in Tableau.' },
        { prompt: `<b>qazaq.</b> Prepare a long-format dataset for a "Monthly revenue by category" chart: for the delivered orders of 2026, show <code>month</code> (the first day of the month, <code>date(order_date, 'start of month')</code>), <code>category</code>, <code>revenue</code>. Sort by <code>month</code>, <code>category</code>.`, hints: ['Three tables: <code>orders</code>, <code>order_items</code>, <code>products</code>.', `<code>WHERE o.status = 'delivered' AND o.order_date &gt;= '2026-01-01'</code>, <code>GROUP BY month, p.category</code>.`] },
        { prompt: '<b>qazaq.</b> Build the main dataset of a dashboard, with one order as its grain: <code>order_id</code>, <code>order_date</code>, <code>city</code> (the customer\'s city), <code>status</code>, <code>items</code> (the number of order lines in the order), <code>order_total</code> (the sum of quantity × unit_price). Every status is included. Sort by <code>order_id</code>.', hints: ['Join <code>orders</code> with <code>customers</code> and <code>order_items</code>.', 'The grain is the order: <code>GROUP BY o.order_id, o.order_date, c.city, o.status</code>. The result should have 308 rows.'] },
        { prompt: 'A dataset has a ready <code>avg_check</code> column for each city and month. On the dashboard, the "All cities" card shows it as <code>AVG(avg_check)</code>. What is wrong?', options: ['Nothing, this is the correct average order value', 'It is an average of averages: a city with 5 orders and a city with 500 orders get the same weight. Put revenue and orders into the dataset and compute SUM(revenue) / SUM(orders)', 'You should use MAX instead of AVG', 'A card cannot show an average order value'], explain: 'Do not precompute ratios; store the numerator and the denominator separately. Then BI computes the right ratio itself under any filter.' },
        { prompt: 'A company\'s data is in ClickHouse, the analysts know SQL, and there is no budget for licences. Which tool makes the most sense?', options: ['Tableau', 'Apache Superset', 'Qlik Sense', 'Excel'], explain: 'Superset is open source and free, connects to ClickHouse, and lets you build a chart straight from a query in SQL Lab. DataLens is a fitting alternative for this case too.' }
      ]
    },
    'viz-10': {
      title: 'Charts in Python: matplotlib and seaborn',
      body: `
<p>"matplotlib/seaborn" appears in many vacancies: when you analyse data in Python, it is convenient to draw the chart right there. The in-browser Python on this site has no matplotlib, so in this lesson you learn to <b>read</b> the code and to <b>prepare the data</b> for a chart. That preparation is 80% of making a chart. Try running the code on your own computer or in Google Colab.</p>
<h3>The standard pattern</h3>
<pre><code>import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('orders.csv')
clean = df[(df['status'] == 'paid') &amp; df['amount'].notna() &amp; (df['amount'] &lt; 20000)]
monthly = clean.groupby(clean['order_date'].str[:7])['amount'].sum()   # 1. data

fig, ax = plt.subplots(figsize=(8, 4))            # 2. figure and axes
ax.plot(monthly.index, monthly.values, marker='o')  # 3. line
ax.set_title('Monthly revenue, 2024')             # 4. title and axes
ax.set_ylabel('Revenue, ₸')
ax.set_ylim(0)
ax.spines[['top', 'right']].set_visible(False)    # remove the extra borders
plt.tight_layout()
plt.savefig('revenue.png', dpi=150)               # 5. save
plt.show()</code></pre>
<p>Every chart is made of these five steps: data → <code>fig, ax</code> → plot → style → save. <code>fig</code> is the whole figure, and <code>ax</code> is one chart inside it (with its axes).</p>
<h3>Chart types</h3>
<table>
<tr><th>Goal</th><th>matplotlib</th><th>What the data should look like</th></tr>
<tr><td>A trend over time</td><td><code>ax.plot(x, y)</code></td><td>A Series sorted by time</td></tr>
<tr><td>Comparing categories</td><td><code>ax.barh(names, values)</code></td><td>A Series sorted by value</td></tr>
<tr><td>A distribution</td><td><code>ax.hist(x, bins=20)</code></td><td>Raw values (not aggregated)</td></tr>
<tr><td>The relationship between two variables</td><td><code>ax.scatter(x, y)</code></td><td>Two numeric columns</td></tr>
</table>
<h3>seaborn: working directly with a DataFrame</h3>
<p><b>seaborn</b> is built on top of matplotlib. You give it a long-format DataFrame and column names:</p>
<pre><code>import seaborn as sns

sns.barplot(data=m, x='channel', y='amount', estimator='sum', errorbar=None)
sns.histplot(data=clean, x='amount', bins=20)
sns.lineplot(data=long_df, x='month', y='revenue', hue='channel')
sns.heatmap(pivot, annot=True, fmt='.0f', cmap='Blues')</code></pre>
<ul>
<li><code>hue='channel'</code> draws each channel in its own colour.</li>
<li><code>sns.barplot</code> shows the <b>mean</b> and a confidence interval line by default. If you need the sum, write <code>estimator='sum'</code>.</li>
<li><code>sns.heatmap</code> expects a wide-format table (a pivot): the rows are one dimension, the columns another.</li>
</ul>
<h3>Long and wide format</h3>
<p><code>lineplot</code> and <code>barplot</code> need long format (<code>month, channel, revenue</code>), and <code>heatmap</code> needs wide format. <code>pivot_table</code> converts one into the other:</p>
<pre><code>pivot = m.pivot_table(index='channel', columns='month', values='amount', aggfunc='sum')</code></pre>
<h3>Common mistakes</h3>
<ul>
<li>Calling <code>plt.savefig</code> after <code>plt.show()</code>: in a script, <code>show</code> closes the figure and the file is saved empty. Save first.</li>
<li>Not starting the axis at zero in a bar chart (giving <code>set_ylim</code> a lower bound other than zero): the difference is inflated artificially.</li>
<li>An unsorted bar chart: <code>sort_values()</code> makes the chart easier to read at once.</li>
<li>Leaving dates as text: the months may end up in alphabetical order on the axis. Use <code>pd.to_datetime</code> or stick to the <code>YYYY-MM</code> format.</li>
<li>A chart with no title and no units. Put the conclusion in the title: "Revenue peaked in March".</li>
</ul>
<div class="tip">If a chart does not come out as expected, look at the data itself first with <code>print(monthly)</code>. The mistake is usually in the groupby and the filter, not in the plot.</div>`,
      ex: [
        { prompt: `Prepare the data for the line chart from the lesson. From the clean orders (<code>status</code> = paid, <code>amount</code> not missing and below 20,000), compute monthly revenue and store it in the Series <code>monthly</code>: the index is the month as <code>'YYYY-MM'</code> (ascending), the value is the sum of <code>amount</code>.`, check: { tests: `assert 'monthly' in globals(), 'Create the variable monthly'
assert hasattr(monthly, 'index') and getattr(monthly, 'ndim', 0) == 1, 'monthly should be a pandas Series'
assert [str(i) for i in monthly.index] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], f'The index should be the months 2024-01 … 2024-06, you have {list(monthly.index)}'
assert [float(v) for v in monthly.values] == [31950.0, 66650.0, 89650.0, 66000.0, 48700.0, 31900.0], f'The monthly revenue is wrong: check the cleaning rules. You have {list(monthly.values)}'` }, hints: [`<code>clean = df[(df['status'] == 'paid') &amp; df['amount'].notna() &amp; (df['amount'] &lt; 20000)]</code>`, `The month: <code>clean['order_date'].str[:7]</code>`, `<code>clean.groupby(clean['order_date'].str[:7])['amount'].sum()</code>`] },
        { prompt: 'Prepare the data for a horizontal bar chart (<code>ax.barh</code>): from the clean orders, compute each city\'s revenue and store it in the Series <code>by_city</code>, sorted in <b>ascending order</b> (the index is the city). <code>barh</code> draws the first value at the bottom, so the largest ends up on top.', check: { tests: `assert 'by_city' in globals(), 'Create the variable by_city'
assert getattr(by_city, 'ndim', 0) == 1, 'by_city should be a pandas Series'
assert list(by_city.index) == ['Шымкент', 'Астана', 'Алматы'], f'The cities should be in ascending order of revenue, you have {list(by_city.index)}'
assert [float(v) for v in by_city.values] == [37500.0, 142950.0, 154400.0], f'The city revenue is wrong, you have {list(by_city.values)}'` }, hints: [`The city is in the <code>customers</code> table: <code>clean.merge(customers, on='customer_id')</code>`, `<code>m.groupby('city')['amount'].sum().sort_values()</code>`] },
        { prompt: `Prepare a wide-format table for <code>sns.heatmap</code>: in the DataFrame <code>pivot</code>, the rows are the channel (<code>channel</code>), the columns are the month (<code>'YYYY-MM'</code>), and the values are the sum of clean revenue.`, check: { tests: `assert 'pivot' in globals(), 'Create the variable pivot'
assert getattr(pivot, 'ndim', 0) == 2, 'pivot should be a DataFrame'
assert pivot.shape == (3, 6), f'pivot should be 3 channels × 6 months, you have {pivot.shape}'
assert sorted(pivot.index) == ['2gis', 'instagram', 'referral'], 'The rows should be channels: index="channel"'
assert [str(c) for c in pivot.columns] == ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'], 'The columns should be months: columns="month"'
assert float(pivot.loc['instagram', '2024-03']) == 47750.0 and float(pivot.loc['referral', '2024-05']) == 20200.0, 'The values should be the sum of amount: aggfunc="sum"'` }, hints: [`<code>m.pivot_table(index='channel', columns='month', values='amount', aggfunc='sum')</code>`, 'Without <code>aggfunc</code>, pandas computes the mean, not the sum.'] },
        { prompt: `The code: <code>sns.barplot(data=m, x='channel', y='amount')</code>. What does the height of the bars show?`, options: ['The total revenue of each channel', 'The mean order amount in each channel (with a confidence interval line on top)', 'The number of orders in each channel', 'The largest order'], explain: `seaborn's barplot draws the mean by default. If you need total revenue: <code>estimator='sum'</code>; to remove the line: <code>errorbar=None</code>.` },
        { prompt: `The end of a script: <code>plt.show()</code>, and on the next line <code>plt.savefig('chart.png')</code>. What is saved in the file?`, options: ['The finished chart', 'An empty image: show closes the figure after displaying the chart, so savefig must be called before show', 'It raises an error', 'Two charts'], explain: 'The order matters: first <code>savefig</code>, then <code>show</code>. Or save the specific figure object: <code>fig.savefig(...)</code>.' }
      ]
    }
  }
});
