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
    }
  }
});
