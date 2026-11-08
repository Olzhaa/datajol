// M1.1 Spreadsheets: English text. Formulas, solutions and sheet data are in content/spreadsheets.js and content/sheets.js.
DJ.i18n.patch({
  modules: {
    'm1-1': { intro: 'Excel and Google Sheets are the first tool of every analyst. In this module you learn formulas, references, conditional aggregates (SUMIFS), lookup functions (XLOOKUP), text cleaning and pivot tables. The exercises run in a built-in spreadsheet trainer: you type a formula, and it is calculated and checked at once. Both English (SUM) and Russian (СУММ) function names work, and you can use either a comma or a semicolon as the separator. Sheets and column headers in the trainer are labeled in Kazakh: «Сатылым» is Sales, «Өнімдер» is Products, «Қызметкерлер» is Staff, «Бонус» is Bonus.' }
  },
  lessons: {
    'ss-1': {
      title: 'Cells, formulas and references',
      body: `
<p>A sheet is made of columns (<b>A, B, C…</b>) and rows (<b>1, 2, 3…</b>). Every cell has an address: <code>C2</code> is column C, row 2. A range: <code>H2:H25</code> is the cells from H2 to H25.</p>
<p>A formula always starts with the <code>=</code> sign:</p>
<pre><code>=F2*G2          quantity × price
=H2*0.12        12% VAT
=(G2-650)/G2    margin share</code></pre>
<h3>Relative and absolute references</h3>
<p>If you copy a formula down (fill down), <code>=F2*G2</code> becomes <code>=F3*G3</code> on the next row: the references are <b>relative</b>. If a cell must not change, add <code>$</code>: <code>=H2/$H$26</code>. That is an <b>absolute</b> reference.</p>
<table>
<tr><th>Written as</th><th>When copied</th></tr>
<tr><td><code>A1</code></td><td>both column and row change</td></tr>
<tr><td><code>$A$1</code></td><td>nothing changes</td></tr>
<tr><td><code>A$1</code></td><td>only the row is locked</td></tr>
<tr><td><code>$A1</code></td><td>only the column is locked</td></tr>
</table>
<div class="tip">In Excel the <kbd>F4</kbd> key cycles through reference types. Do not type numbers into a formula by hand: when the data changes, the formula goes stale. The trainer checks for this.</div>
<h3>Example: calculating a share</h3>
<p>Column H holds the amount of each order, and cell H26 holds the total. To find each order's share, we write <code>=H2/$H$26</code> in I2 and copy it down. In I3 the formula becomes <code>=H3/$H$26</code>: the numerator moves, while the denominator (the total) stays locked. Without the <code>$</code>, I3 would get <code>=H3/H27</code>, and dividing by an empty cell would give a <code>#DIV/0!</code> error.</p>
<h3>Common errors</h3>
<table>
<tr><th>Error</th><th>Cause</th></tr>
<tr><td><code>#DIV/0!</code></td><td>Dividing by zero or by an empty cell</td></tr>
<tr><td><code>#VALUE!</code></td><td>Arithmetic on text: <code>="12 500"*2</code></td></tr>
<tr><td><code>#REF!</code></td><td>The cell the formula pointed to was deleted</td></tr>
<tr><td><code>#NAME?</code></td><td>The function name is misspelled</td></tr>
</table>
<div class="tip">To see formulas in Excel, press <kbd>Ctrl</kbd> + <kbd>&#96;</kbd>: the cells show formulas instead of results. It is the fastest way to check a sheet.</div>`,
      ex: [
        { prompt: 'On the «Сатылым» (Sales) sheet, column H (Сома, the amount) is quantity × price. Write the formula for cell H2.', hints: ['Quantity is in column F, price is in column G.'] },
        { prompt: 'Calculate 12% VAT on the amount of the first order (row 2).', hints: ['12% = 0.12 (you can also write <code>12%</code>).'] },
        { prompt: 'Cell I2 contains <code>=H2/$H$26</code>. What does the formula become if you copy it to I3?', options: ['=H2/$H$26', '=H3/$H$26', '=H3/$H$27', '=H3/H27'], explain: 'H2 is relative, so it becomes H3. $H$26 is absolute and does not change.' }
      ]
    },
    'ss-2': {
      title: 'Basic functions: SUM, AVERAGE, COUNT',
      body: `
<table>
<tr><th>Function</th><th>What it does</th><th>In Russian</th></tr>
<tr><td><code>SUM(H2:H25)</code></td><td>sum</td><td>СУММ</td></tr>
<tr><td><code>AVERAGE(H2:H25)</code></td><td>average</td><td>СРЗНАЧ</td></tr>
<tr><td><code>COUNT(H2:H25)</code></td><td>number of cells with numbers</td><td>СЧЁТ</td></tr>
<tr><td><code>COUNTA(C2:C25)</code></td><td>number of non-empty cells</td><td>СЧЁТЗ</td></tr>
<tr><td><code>MIN</code>, <code>MAX</code>, <code>MEDIAN</code></td><td>smallest, largest, median</td><td>МИН, МАКС, МЕДИАНА</td></tr>
<tr><td><code>ROUND(x, 0)</code></td><td>rounding</td><td>ОКРУГЛ</td></tr>
</table>
<p>Functions can be nested inside each other: <code>=ROUND(AVERAGE(H2:H25), 0)</code>.</p>
<p>This is familiar from SQL: <code>SUM</code>, <code>AVG</code>, <code>COUNT</code>, <code>MIN</code>, <code>MAX</code>.</p>
<h3>Example: an order summary</h3>
<p>The «Сатылым» sheet has 24 orders (rows 2–25). We build a small table and calculate each metric in its own cell:</p>
<pre><code>Total revenue:     =SUM(H2:H25)
Number of orders:  =COUNT(H2:H25)
Average order:     =ROUND(AVERAGE(H2:H25), 0)
Largest order:     =MAX(H2:H25)
Median:            =MEDIAN(H2:H25)</code></pre>
<p>Compare the average and the median: if the average is much larger than the median, a few big orders are pulling the average up.</p>
<h3>COUNT vs COUNTA</h3>
<p><code>COUNT</code> counts only numbers, while <code>COUNTA</code> counts any non-empty cell. If the amount column contains the text "none", <code>COUNT</code> skips it. The difference between the two shows how many non-numeric values the column has: a sign that it needs cleaning.</p>
<div class="tip">You can give a whole column as the range: <code>=SUM(H:H)</code>. When new rows are added, the formula picks them up by itself. But if a total cell sits in that same column, it adds itself and gives an error.</div>`,
      ex: [
        { prompt: 'Calculate the total amount of all orders.', hints: ['The amount is in column H, rows 2 to 25.'] },
        { prompt: 'Calculate the average order value (the average order amount), rounded to a whole number.', hints: ['<code>=ROUND(AVERAGE(...), 0)</code>'] },
        { prompt: 'Find the largest number of items in a single order.' }
      ]
    },
    'ss-3': {
      title: 'Conditions: IF, AND, OR',
      body: `
<pre><code>=IF(condition, if true, if false)
=IF(H2&gt;=2500, "Үлкен", "Кіші")
=IF(AND(C2="Алматы", F2&gt;=3), "Иә", "Жоқ")
=IF(OR(D2="instagram", D2="2gis"), "Жарнама", "Ұсыныс")</code></pre>
<p>Text is always written in double quotes. Comparison operators: <code>=</code>, <code>&lt;&gt;</code> (not equal), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
<p>For a multi-level condition, use <code>IFS</code> or nest an IF inside an IF:</p>
<pre><code>=IFS(H2&gt;=4000, "A", H2&gt;=2000, "B", TRUE, "C")</code></pre>
<div class="tip">The SQL equivalent is <code>CASE WHEN ... THEN ... ELSE ... END</code>.</div>
<h3>Example: classifying orders</h3>
<p>We give each order a segment: 4,000 ₸ and above is "A", 2,000 ₸ and above is "B", the rest are "C".</p>
<pre><code>=IF(H2&gt;=4000, "A", IF(H2&gt;=2000, "B", "C"))</code></pre>
<p>The order of conditions matters: Excel checks them from left to right. If you check <code>H2&gt;=2000</code> first, a 5,000 ₸ order also ends up as "B", because it already meets the first condition.</p>
<h3>Logical values</h3>
<p>A comparison by itself returns <code>TRUE</code> or <code>FALSE</code>: <code>=H2&gt;=2500</code>. These can be counted as 1 and 0: <code>=SUMPRODUCT(--(H2:H25&gt;=2500))</code> counts the large orders. But for this kind of task, <code>COUNTIF</code> from the next lesson is simpler.</p>
<div class="tip">Text in a condition is not case-sensitive: <code>C2="алматы"</code> returns <code>TRUE</code> for «Алматы» too. But it is sensitive to extra spaces: «Алматы␣» does not match.</div>`,
      ex: [
        { prompt: 'If the order amount in row 2 is 2500 or more, return <code>"Үлкен"</code> (large), otherwise <code>"Кіші"</code> (small).', hints: ['In the form <code>=IF(H2&gt;=2500, "Үлкен", "Кіші")</code>.'] },
        { prompt: 'If the order in row 4 is from Шымкент (Shymkent) <b>and</b> its quantity is at least 3, return <code>"Иә"</code> (yes), otherwise <code>"Жоқ"</code> (no).', hints: ['<code>AND(C4="Шымкент", F4&gt;=3)</code>'] }
      ]
    },
    'ss-4': {
      title: 'Conditional aggregates: COUNTIF, SUMIFS',
      body: `
<p>An analyst's daily work: "How many orders came from Shymkent?", "How much revenue did instagram bring?"</p>
<pre><code>=COUNTIF(C2:C25, "Шымкент")                       count by city
=SUMIF(D2:D25, "instagram", H2:H25)               sum by channel
=SUMIFS(H2:H25, C2:C25, "Астана", E2:E25, "Латте") several conditions
=AVERAGEIF(C2:C25, "Алматы", H2:H25)              average by condition
=COUNTIFS(F2:F25, "&gt;=3", C2:C25, "Шымкент")</code></pre>
<p>Watch the order: <code>SUMIF(criteria range, criterion, sum range)</code>, but <code>SUMIFS(sum range, criteria range1, criterion1, ...)</code>.</p>
<p>Kinds of criteria: <code>"Шымкент"</code>, <code>"&gt;=3"</code>, <code>"&lt;&gt;instagram"</code> (not equal), <code>"Лат*"</code> (starts with "Лат").</p>
<div class="tip">SQL equivalent: <code>SELECT SUM(amount) FROM t WHERE city = 'Астана' AND product = 'Латте'</code>.</div>
<h3>Example: a summary by channel</h3>
<p>We write the channels in one column (K2: instagram, K3: 2gis, K4: referral) and put formulas next to them:</p>
<pre><code>L2: =COUNTIF($D$2:$D$25, K2)              number of orders
M2: =SUMIF($D$2:$D$25, K2, $H$2:$H$25)    revenue
N2: =M2/L2                                average order</code></pre>
<p>As the criterion we gave a cell reference (<code>K2</code>) instead of text, and we locked the ranges with <code>$</code>. Now when we copy the formula down, each row calculates its own channel. If a new channel appears, we just add a new row.</p>
<h3>Combining a criterion with a cell</h3>
<p>In a criterion, join the operator and the cell with <code>&amp;</code>: <code>=COUNTIF(H2:H25, "&gt;=" &amp; P1)</code>. Change the threshold in P1 and you see the result at once.</p>
<div class="tip">Check: the revenue of all channels added together must equal <code>=SUM(H2:H25)</code>. If it does not, there is a mistake in the channel names (a space, a different spelling).</div>`,
      ex: [
        { prompt: 'Count how many orders came from Шымкент (Shymkent).', hints: ['The city is in column C.'] },
        { prompt: 'Calculate the total amount of orders that came from the <code>instagram</code> channel.', hints: ['<code>SUMIF(channel range, "instagram", amount range)</code>'] },
        { prompt: 'Using <code>SUMIFS</code>, calculate the sales amount of <b>Латте</b> (latte) in Астана (Astana).', hints: ['The first argument is the sum range <code>H2:H25</code>.', 'Then the pairs: <code>C2:C25, "Астана", E2:E25, "Латте"</code>.'] },
        { prompt: 'Count the orders where at least 3 items were bought.', hints: ['The criterion goes in quotes: <code>"&gt;=3"</code>.'] }
      ]
    },
    'ss-5': {
      title: 'Lookups: XLOOKUP, VLOOKUP, INDEX/MATCH',
      body: `
<p>Joining two tables is a <code>JOIN</code> in SQL. In a spreadsheet you do it with lookup functions.</p>
<h3>XLOOKUP (Excel 2021+, Google Sheets)</h3>
<pre><code>=XLOOKUP(E2, Өнімдер!A2:A7, Өнімдер!C2:C7)
        what to find  where to look     what to return</code></pre>
<h3>VLOOKUP (old, but still very common)</h3>
<pre><code>=VLOOKUP(E2, Өнімдер!A2:C7, 3, FALSE)</code></pre>
<p>The third argument is which column of the table to return, and the fourth, <code>FALSE</code>, means exact match. <b>Do not forget FALSE:</b> otherwise Excel looks for an approximate match.</p>
<h3>INDEX + MATCH</h3>
<pre><code>=INDEX(Өнімдер!B2:B7, MATCH(E2, Өнімдер!A2:A7, 0))</code></pre>
<p>A case where approximate match is useful: a bonus scale (thresholds in ascending order).</p>
<pre><code>=VLOOKUP(50000, Бонус!A2:B5, 2, TRUE)   → 5   (40 000 ≤ 50 000 &lt; 80 000)</code></pre>
<div class="tip">If the value is not found, you get <code>#N/A</code>. <code>IFERROR(..., "none")</code> catches it.</div>
<h3>Which one to choose?</h3>
<table>
<tr><th>Function</th><th>Pros</th><th>Cons</th></tr>
<tr><td><code>XLOOKUP</code></td><td>Simple, can look to the left, returns a value of your choice when nothing is found</td><td>Missing in old Excel</td></tr>
<tr><td><code>VLOOKUP</code></td><td>Works everywhere</td><td>Looks only to the right; the column number breaks when columns are inserted</td></tr>
<tr><td><code>INDEX/MATCH</code></td><td>Flexible, works in any direction</td><td>Long to write</td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li><b>The range is not locked</b>: when you copy the formula down, the lookup table moves too. Lock it: <code>Өнімдер!$A$2:$C$7</code>.</li>
<li><b>Types do not match</b>: in one table the code is a number (<code>101</code>), in the other it is text (<code>"101"</code>). Excel does not treat them as equal, and the result is <code>#N/A</code>.</li>
<li><b>An extra space</b>: «Латте␣» does not match «Латте». Apply <code>TRIM</code> first.</li>
</ul>`,
      ex: [
        { prompt: 'Using <code>XLOOKUP</code>, find the unit cost of the product in row 2 from the «Өнімдер» (Products) sheet.', hints: ['The value to look up is <code>E2</code>.', 'A reference to another sheet: <code>Өнімдер!A2:A7</code>.'] },
        { prompt: 'Find the category (<code>Санат</code>) of the product in row 6 using <code>VLOOKUP</code> with an exact match.', hints: ['The category (Санат) is the 2nd column of the table.', 'The last argument is <code>FALSE</code>.'] },
        { prompt: 'Calculate the profit of the order in row 2: amount minus (quantity × unit cost). Get the unit cost with XLOOKUP.', hints: ['<code>=H2 - F2 * XLOOKUP(...)</code>'] },
        { prompt: 'What can happen with <code>=VLOOKUP(E2, Өнімдер!A2:C7, 3)</code> (without the fourth argument)?', options: ['It returns an error', 'It looks for an approximate match and may return a wrong value on an unsorted table', 'It always works correctly', 'It returns the first column'], explain: 'If the fourth argument is omitted, it is treated as TRUE: approximate match. For product names, always write FALSE.' }
      ]
    },
    'ss-6': {
      title: 'Text functions and cleaning',
      body: `
<p>Real data is messy: extra spaces, mixed case, different formats. Look at the «Қызметкерлер» (Staff) sheet.</p>
<table>
<tr><th>Function</th><th>Example</th><th>Result</th></tr>
<tr><td><code>TRIM</code></td><td><code>TRIM("  асқар  нұрлан")</code></td><td>асқар нұрлан</td></tr>
<tr><td><code>PROPER</code></td><td><code>PROPER("асқар нұрлан")</code></td><td>Асқар Нұрлан</td></tr>
<tr><td><code>UPPER</code>, <code>LOWER</code></td><td><code>LOWER("ASKAR@MAIL.KZ")</code></td><td>askar@mail.kz</td></tr>
<tr><td><code>LEFT</code>, <code>RIGHT</code>, <code>MID</code></td><td><code>LEFT("2024-03-07", 7)</code></td><td>2024-03</td></tr>
<tr><td><code>LEN</code></td><td><code>LEN("Латте")</code></td><td>5</td></tr>
<tr><td><code>FIND</code></td><td><code>FIND("@", "dina@mail.kz")</code></td><td>5</td></tr>
<tr><td><code>SUBSTITUTE</code></td><td><code>SUBSTITUTE("8 705", " ", "")</code></td><td>8705</td></tr>
<tr><td><code>&amp;</code>, <code>CONCAT</code></td><td><code>A2 &amp; " (" &amp; D2 &amp; ")"</code></td><td>joining text</td></tr>
</table>
<h3>Tools</h3>
<ul>
<li><b>Remove duplicates</b> (Data → Remove duplicates): deletes repeated rows.</li>
<li><b>Text to columns</b>: splits one column into several by a delimiter.</li>
<li><b>Data validation</b>: allows only permitted values in a cell (for example, a list of departments).</li>
<li><b>Filter</b> and <b>Sort</b>: filtering and sorting (they do not change the data).</li>
</ul>
<h3>Example: cleaning a name</h3>
<p>On the «Қызметкерлер» sheet, names are written like <code>"  асқар  НҰРЛАН "</code>. We combine functions from the inside out:</p>
<pre><code>=PROPER(TRIM(A2))   → Асқар Нұрлан</code></pre>
<p><code>TRIM</code> removes spaces at the start and end and extra spaces between words, and <code>PROPER</code> starts each word with a capital letter.</p>
<h3>A safe way to clean</h3>
<ol>
<li>Do not change the original column: write the cleaned value into a new column with a formula.</li>
<li>Check the result: look at a few rows by eye, and compare lengths with <code>LEN</code>.</li>
<li>If needed, copy the new column and paste it as values with <b>Paste values</b>. Then clean values remain instead of formulas.</li>
</ol>
<div class="tip">Extracting the domain from an email: <code>=MID(B2, FIND("@", B2) + 1, 100)</code>. <code>FIND</code> finds the position of "@", and <code>MID</code> takes the text after it.</div>`,
      ex: [
        { prompt: 'On the «Қызметкерлер» (Staff) sheet, clean the name in A2: remove the extra spaces and capitalize each word.', hints: ['Put one function inside another: <code>PROPER(TRIM(...))</code>.'] },
        { prompt: 'Extract the login (the part before the <code>@</code> sign) from the email in B3, in lowercase.', hints: ['<code>FIND("@", B3)</code> gives the position of the @ sign.', '<code>LEFT(B3, FIND("@", B3) - 1)</code>, then <code>LOWER</code>.'] },
        { prompt: 'The department column contains «маркетинг», «Маркетинг» and «маркетинг » (marketing). How will a pivot table show them?', options: ['As one group', 'Possibly as separate groups, so first apply TRIM and bring them to one case', 'It returns an error', 'As an empty value'], explain: 'Spaces and case differences make the values different. Clean first, then aggregate.' }
      ]
    },
    'ss-7': {
      title: 'Pivot tables and charts',
      body: `
<p>A <b>pivot table</b> is grouping without formulas: the <code>GROUP BY</code> of SQL. Insert → PivotTable.</p>
<table>
<tr><th>Area</th><th>What we put there</th><th>SQL</th></tr>
<tr><td><b>Rows</b></td><td>City</td><td><code>GROUP BY city</code></td></tr>
<tr><td><b>Columns</b></td><td>Month</td><td>a second grouping</td></tr>
<tr><td><b>Values</b></td><td>Amount (Sum)</td><td><code>SUM(amount)</code></td></tr>
<tr><td><b>Filters</b></td><td>Channel</td><td><code>WHERE channel = ...</code></td></tr>
</table>
<p>Any cell of a pivot table can be reproduced with <code>SUMIFS</code>. This is a good way to check the result.</p>
<h3>Choosing a chart</h3>
<ul>
<li>Change over time → <b>Line</b></li>
<li>Comparing categories → <b>Bar/Column</b> (sorted)</li>
<li>Shares of 2–4 parts → <b>Stacked bar</b> or, rarely, <b>Pie</b></li>
<li>Relationship between two numbers → <b>Scatter</b></li>
</ul>
<div class="tip">If you turn the data into a "table" with <b>Format as Table</b> (Ctrl+T), new rows are added to pivots and formulas automatically.</div>
<h3>Steps to build a pivot table</h3>
<ol>
<li>Select any cell inside the table.</li>
<li><b>Insert → PivotTable</b> (Google Sheets: <b>Insert → Pivot table</b>).</li>
<li>Drag a category (for example, city) into the <b>Rows</b> area and a number (amount) into the <b>Values</b> area.</li>
<li>Choose the aggregate in Values: Sum, Count, Average.</li>
<li>If needed, add a second dimension (channel) to <b>Columns</b> and a filter to <b>Filters</b>.</li>
</ol>
<p>A pivot table is the point-and-click version of SQL's <code>GROUP BY</code>. Rows are the grouping columns, Values are the aggregate functions.</p>
<h3>Preparing data for a pivot</h3>
<ul>
<li>The first row should hold the column names, with no empty names.</li>
<li>There should be no merged cells.</li>
<li>One column, one kind of data: no text in the amount column.</li>
</ul>
<div class="tip">When the source data changes, the pivot does not update by itself: press <b>Refresh</b>. If you turn the data into a table with <b>Format as Table</b>, new rows get into the pivot automatically.</div>`,
      ex: [
        { prompt: 'To see each city\'s revenue for each month in a pivot table, where do you put the "Month" field?', options: ['Values', 'Columns', 'Filters', 'Nowhere'], explain: 'Rows: city, Columns: month, Values: Sum of Сома (amount).' },
        { prompt: 'Check one cell of the pivot: the amount for the <b>instagram</b> channel in Шымкент (Shymkent).', hints: ['Two conditions: city and channel.'] },
        { prompt: 'The clearest chart for comparing the revenue of three cities:', options: ['Pie', 'A sorted bar chart', 'Line chart', 'Scatter'], explain: 'To compare categories, lengths are easy to compare by eye, while angles (pie) are hard.' }
      ]
    },
    'ss-gate': {
      title: 'Module exam: Spreadsheets',
      body: `<p>Final exercises. Formulas are calculated on the «Сатылым» (Sales), «Өнімдер» (Products) and «Бонус» (Bonus) sheets.</p>`,
      ex: [
        { prompt: 'Calculate the average order value (the average order amount) in Алматы (Almaty).' },
        { prompt: 'Count the orders from Шымкент (Shymkent) where at least 2 items were bought.' },
        { prompt: 'A manager\'s sales are the total amount of all orders. Find their bonus percentage from the «Бонус» (Bonus) scale with an approximate match (in one formula).' },
        { prompt: 'We wrote each city\'s share of total sales as <code>=SUMIF(C:C, K2, H:H) / SUM(H2:H25)</code> and copied it down. What is wrong?', options: ['Nothing', 'SUM(H2:H25) must be absolute: $H$2:$H$25, otherwise it moves when copied', 'COUNTIF is needed instead of SUMIF', 'K2 must be absolute'], explain: 'The denominator must be the same in every row, so you add $.' },
        { prompt: 'When joining two sheets by product name, <code>#N/A</code> appeared in many places, even though the names look the same. The most likely cause:', options: ['XLOOKUP does not work', 'The names contain an invisible extra space', 'The sheet is too big', 'The number format'], explain: 'A common cause is extra spaces. Clean them with TRIM.' }
      ]
    }
  }
});
