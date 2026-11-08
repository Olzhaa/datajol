// M3.2 Cleaning & EDA: English text. Code, solutions and expected output are in content/cleaning.js.
DJ.i18n.patch({
  modules: {
    'm3-2': { intro: 'Real data never arrives clean: blanks, repeated customers, "Алматы" next to "Almaty", numbers stored as text. This takes up a large share of an analyst\'s time. In this module you clean the <code>raw</code> database with SQL and Python, and then do EDA.' }
  },
  lessons: {
    'cl-1': {
      title: 'Data profiling: a first check of the data',
      body: `
<p>Before starting the analysis, we check the "health" of the data. This is called <b>profiling</b>. Five questions for every table:</p>
<ol>
<li>How many rows are there? Does it match the number you expected?</li>
<li>How many missing values (<code>NULL</code>) are in each column?</li>
<li>How many unique values are there? Is a column that must be unique (email, id) really unique?</li>
<li>Is the range of values sensible? No negative prices, no 150-year-old customers?</li>
<li>What values do the categorical columns hold? Is one city written in several different ways?</li>
</ol>
<pre><code>SELECT COUNT(*) AS n,
  SUM(email IS NULL) AS null_email,
  COUNT(DISTINCT email) AS uniq_email
FROM raw_customers;</code></pre>
<p>In SQLite, <code>email IS NULL</code> gives 1 or 0, so <code>SUM</code> counts the missing values.</p>
<h3>Why not skip profiling?</h3>
<p>"Garbage in, garbage out." If 15% of customers have no city and you miss it and write "Almaty has the most customers", the conclusion may be wrong: many of the customers with a blank city probably live somewhere else.</p>
<h3>How do we record the profiling results?</h3>
<p>Make a short note for each table. Later it becomes the cleaning plan:</p>
<table>
<tr><th>Column</th><th>Problem</th><th>Fix</th></tr>
<tr><td><code>email</code></td><td>mixed letter case, duplicates</td><td>convert to lowercase and keep one record</td></tr>
<tr><td><code>city</code></td><td>one city written 4 ways</td><td>merge with <code>CASE</code></td></tr>
<tr><td><code>phone</code></td><td>missing values</td><td>mark as "none"</td></tr>
</table>
<p>This table helps the team too: the developers who collect the data can see the problem for themselves and fix it at the source.</p>
<div class="tip">Do profiling not just once but every time new data arrives. A table that was clean yesterday may come in with a new error today.</div>`,
      ex: [
        { prompt: 'For <code>raw_customers</code>, output in one row: <code>n</code> (number of rows), <code>null_email</code>, <code>null_city</code>, <code>null_phone</code>.', hints: ['<code>SUM(city IS NULL)</code>'] },
        { prompt: 'Output every value of the <code>city</code> column and how many times each appears (<code>n</code>). Look at the result: in how many ways is the city written?', hints: ['<code>GROUP BY city</code>'] },
        { prompt: 'The previous query returned "Алматы", "алматы", "Алматы␣" (with a trailing space) and "Almaty". What does this tell you?', options: ['There are four different cities', 'One city is written four ways: the text must be standardized before GROUP BY', 'An SQL error', 'This is normal, nothing to do'], explain: 'Without cleaning, Almaty\'s sales are split into four parts and lead to a wrong conclusion.' }
      ]
    },
    'cl-2': {
      title: 'Missing values',
      body: `
<p>What should you do with a missing value? The answer depends on <b>why it is missing</b>.</p>
<table>
<tr><th>Approach</th><th>When</th><th>Risk</th></tr>
<tr><td>Drop the row</td><td>Few blank rows, and they are random</td><td>If blanks are common in one group, the result is biased</td></tr>
<tr><td>Fill in (impute): median, mode, "Unknown"</td><td>Keeping the row matters</td><td>Artificially reduces the spread</td></tr>
<tr><td>Add a flag</td><td>The blank itself may carry information</td><td>An extra column</td></tr>
</table>
<p>In SQL, <code>COALESCE</code> replaces a missing value: it returns the first non-empty value in its list.</p>
<pre><code>SELECT name, COALESCE(phone, 'жоқ') AS phone FROM raw_customers;</code></pre>
<div class="tip">When filling a numeric column, the median is safer than the mean: outliers do not distort it.</div>
<h3>Three kinds of missing values</h3>
<ul>
<li><b>Completely random</b> (MCAR): the server was down for an hour and the records from that time were lost. Dropping the rows is usually safe.</li>
<li><b>Linked to another column</b> (MAR): the phone field is optional in the mobile app, so mobile customers have more blanks. Analyse by device separately.</li>
<li><b>Linked to the value itself</b> (MNAR): people with high incomes hide their income. Both dropping and filling bias the result. Write it down as a limitation.</li>
</ul>
<h3>Counting missing values correctly</h3>
<p><code>NULL</code> and an empty string (<code>''</code>) are not the same thing. Data contains both, so check for both:</p>
<pre><code>SELECT SUM(city IS NULL OR TRIM(city) = '') AS empty_city
FROM raw_customers;</code></pre>
<p>To compute a median in Python, we first filter out the <code>None</code> values and then use <code>statistics.median</code>.</p>`,
      ex: [
        { prompt: 'Output each customer\'s <code>id</code>, <code>name</code> and <code>city</code>. If the city is blank, it should say <code>Белгісіз</code> (Unknown).', hints: ["<code>COALESCE(city, 'Белгісіз')</code>"] },
        { prompt: 'Write a function <code>fill_median(xs)</code> that returns a <b>new</b> list in which the <code>None</code> values are replaced by the median of the other values.', check: { tests: '_src = [10, None, 30, 20, None]\n_r = fill_median(_src)\nassert _r == [10, 20, 30, 20, 20], "fill_median([10, None, 30, 20, None]) should be [10, 20, 30, 20, 20]"\nassert _src == [10, None, 30, 20, None], "Do not change the original list: return a new one"\nassert fill_median([1, 2, 3]) == [1, 2, 3], "A list with no missing values should not change"' }, hints: ['First find the median of the values that are not <code>None</code>.', '<code>[med if x is None else x for x in xs]</code>'] },
        { prompt: 'In a survey, people with high incomes often skipped the "income" question. What happens if we simply drop the blank rows?', options: ['Nothing changes', 'The average income comes out lower than it really is', 'The average income goes up', 'The median does not change'], explain: 'The blanks are not random: the high earners disappear, so the result is biased downward.' }
      ]
    },
    'cl-3': {
      title: 'Standardizing text',
      body: `
<p>The most common problems in text columns: extra spaces, letter case, and the same value written in different ways.</p>
<pre><code>SELECT TRIM(name) AS name,          -- spaces at the start and end
       LOWER(email) AS email,       -- email is case-insensitive
       REPLACE(phone, ' ', '') AS phone
FROM raw_customers;</code></pre>
<h3>Bringing values to one form</h3>
<p>We merge the variants of one city with <code>CASE</code>:</p>
<pre><code>CASE WHEN TRIM(city) IN ('Алматы', 'алматы', 'Almaty') THEN 'Алматы'
     ELSE TRIM(city) END</code></pre>
<div class="tip">SQLite's <code>LOWER</code> function only works with Latin letters: "АЛМАТЫ" stays unchanged. Cyrillic text is more reliably handled in Python (<code>str.lower()</code>) or in PostgreSQL.</div>
<h3>In Python</h3>
<pre><code>import re
digits = re.sub(r"\\D", "", "8 (701) 333-44-55")   # '87013334455'</code></pre>
<p><code>\\D</code> means "any character that is not a digit". This way only the digits of the phone number remain.</p>
<h3>The order of standardization</h3>
<p>When cleaning text, the order of the steps matters:</p>
<ol>
<li><b>TRIM</b>: remove the spaces. Otherwise "Алматы␣" and "Алматы" stay different.</li>
<li><b>Case</b>: bring everything to one case (for comparison).</li>
<li><b>Dictionary</b>: replace the known variants with one standard value.</li>
<li><b>Check</b>: look at the remaining values again with <code>GROUP BY</code>. If you find a new variant, add it to the dictionary.</li>
</ol>
<h3>Keeping the dictionary in a table</h3>
<p>When there are many variants, a mapping table is handier than a long <code>CASE</code>: <code>city_map(raw, clean)</code>. Then cleaning is a single <code>LEFT JOIN</code>, and to add a new variant you change the table, not the query.</p>
<div class="tip">After bringing a phone number to one format (<code>+77013334455</code>), check its length: a Kazakhstan number has 10 digits after <code>+7</code>. Any other length means the number was entered incorrectly.</div>`,
      ex: [
        { prompt: 'For customers who have an email, output <code>id</code>, <code>name</code> without extra spaces and <code>email</code> in lowercase.', hints: ['<code>TRIM(name)</code>, <code>LOWER(email)</code>, <code>WHERE email IS NOT NULL</code>'] },
        { prompt: 'Output each customer\'s <code>id</code> and a cleaned column <code>city_clean</code>: the Almaty variants (<code>Алматы</code>, <code>алматы</code>, <code>Almaty</code>) → <code>Алматы</code>, the Astana variants (<code>Астана</code>, <code>Astana</code>) → <code>Астана</code>, everything else after <code>TRIM</code>.', hints: ['Apply <code>TRIM(city)</code> before comparing: then "Алматы␣" is caught too.'] },
        { prompt: 'Write a function <code>clean_phone(p)</code>: it keeps only the digits of the phone number, replaces a leading <code>8</code> with <code>7</code> and returns the number in the format <code>+7XXXXXXXXXX</code>. If given <code>None</code>, it returns <code>None</code>.', hints: ['<code>re.sub(r"\\D", "", p)</code> keeps only the digits.', '<code>if d.startswith("8"): d = "7" + d[1:]</code>'] }
      ]
    },
    'cl-4': {
      title: 'Duplicates',
      body: `
<p>One customer may sign up twice: once as <code>NURLAN@mail.kz</code> and once as <code>nurlan@mail.kz</code>. Duplicates inflate the number of customers and make conversion look lower.</p>
<h3>1. Find them</h3>
<pre><code>SELECT LOWER(email) AS email, COUNT(*) AS n
FROM raw_customers
WHERE email IS NOT NULL
GROUP BY LOWER(email)
HAVING COUNT(*) > 1;</code></pre>
<h3>2. Keep one</h3>
<p>The <code>ROW_NUMBER</code> pattern from Advanced SQL: in each group we keep the first record (for example, the one with the smallest <code>id</code>).</p>
<pre><code>ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY id) AS rn
... WHERE rn = 1</code></pre>
<div class="tip">Which record to keep is a business decision: the oldest, the most complete, or the most recently updated? Write it down.</div>
<h3>Kinds of duplicates</h3>
<ul>
<li><b>Exact duplicate</b>: all columns are the same. It usually appears when a load ran twice. <code>SELECT DISTINCT</code> is enough.</li>
<li><b>Key duplicate</b>: the email is the same, but the name or phone differs. You have to decide which one to keep.</li>
<li><b>Fuzzy duplicate</b>: "Нұрлан Ахметов" and "Нурлан Ахметов". Merging such cases automatically is risky; it is better to list them and check them by hand.</li>
</ul>
<h3>Before deleting a duplicate</h3>
<p>The duplicate may have orders. If you simply delete the second record, its orders are left "orphaned". The right way: point the <code>customer_id</code> in the orders to the record you keep, and only then remove the extra record.</p>
<div class="tip">Check after cleaning: <code>COUNT(*)</code> and <code>COUNT(DISTINCT LOWER(email))</code> must be equal.</div>`,
      ex: [
        { prompt: 'Output the repeated emails (ignoring case) and how many times each appears: <code>email</code> (lowercase), <code>n</code>.', hints: ['Step 1 of the lesson.'] },
        { prompt: 'Keep one record per email, the one with the smallest <code>id</code>. For customers with an email, output their <code>id</code> and the lowercase <code>email</code>.', hints: ['In a subquery use <code>ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY id) AS rn</code>, and outside it <code>WHERE rn = 1</code>.'] }
      ]
    },
    'cl-5': {
      title: 'Data types: numbers and dates',
      body: `
<p>The <code>raw_orders.amount</code> column is text: <code>'12 500'</code>, <code>'-500'</code>, even <code>'abc'</code>. You cannot calculate with text, so it has to be converted to a number (<b>cast</b>).</p>
<pre><code>CAST(REPLACE(amount, ' ', '') AS INTEGER)</code></pre>
<div class="tip">Be careful: in SQLite <code>CAST('abc' AS INTEGER)</code> raises no error, it returns <b>0</b>. PostgreSQL raises an error. So always check the result after a cast.</div>
<h3>Dates</h3>
<p>The <code>signup</code> column has three formats: <code>2024-01-15</code>, <code>15.02.2024</code>, <code>2024/03/28</code>. The standard format is <b>ISO 8601</b> (<code>YYYY-MM-DD</code>): it sorts correctly even as text. In Python:</p>
<pre><code>from datetime import datetime
datetime.strptime("15.02.2024", "%d.%m.%Y").strftime("%Y-%m-%d")   # '2024-02-15'</code></pre>
<p>We "try" several formats in turn: if one does not match, a <code>ValueError</code> is raised and we move on to the next.</p>
<h3>Checking after a cast</h3>
<p>Because SQLite turns the text <code>'abc'</code> into 0, we check separately whether the conversion succeeded:</p>
<pre><code>SELECT id, amount
FROM raw_orders
WHERE REPLACE(amount, ' ', '') GLOB '*[^0-9-]*';</code></pre>
<p><code>GLOB '*[^0-9-]*'</code> finds values that contain characters other than digits and the minus sign. We mark such rows as "error" and leave them out of the calculations.</p>
<h3>Common date traps</h3>
<ul>
<li><b>Day and month order</b>: is <code>03/04/2024</code> 3 April or 4 March? Confirm the format of the source.</li>
<li><b>Time zone</b>: Almaty is 5 hours ahead of UTC. Orders near midnight may land on a different day.</li>
<li><b>Excel numbers</b>: a number like <code>45306</code> from Excel is the number of days since 1900, which means it is a date.</li>
</ul>
<div class="tip">After converting all dates to ISO format, look at the <code>MIN</code> and <code>MAX</code>: if you see the year 1900 or a future date, the conversion has a bug.</div>`,
      ex: [
        { prompt: 'From the <code>raw_orders</code> table, output <code>id</code> and an <code>amount_num</code> column converted to a number (remove the spaces and cast to <code>INTEGER</code>).', hints: ["<code>CAST(REPLACE(amount, ' ', '') AS INTEGER)</code>"] },
        { prompt: 'Write a function <code>parse_date(s)</code> that converts the formats <code>YYYY-MM-DD</code>, <code>DD.MM.YYYY</code> and <code>YYYY/MM/DD</code> to the text <code>YYYY-MM-DD</code>. If the format is not recognized, it returns <code>None</code>.', check: { tests: 'assert parse_date("2024-01-15") == "2024-01-15", "The ISO format should stay unchanged"\nassert parse_date("15.02.2024") == "2024-02-15", "15.02.2024 → 2024-02-15"\nassert parse_date("2024/03/28") == "2024-03-28", "2024/03/28 → 2024-03-28"\nassert parse_date("кеше") is None, "Unrecognized text → None"' }, hints: ['Loop over a list of formats with <code>for</code> and use <code>try/except ValueError</code>.'] },
        { prompt: 'What does <code>CAST(\'abc\' AS INTEGER)</code> return in SQLite?', options: ['An error', 'NULL', '0', "'abc'"], explain: 'SQLite treats text that cannot become a number as 0. It is a "silent" error, so you have to check for it.' }
      ]
    },
    'cl-6': {
      title: 'Wrong and suspicious values',
      body: `
<p>Even with the right type, a value can be meaningless: a negative amount, an order date in the future, a thermos for 990,000 ₸. We mark such values with <b>rules</b>:</p>
<table>
<tr><th>Rule</th><th>Flag</th></tr>
<tr><td>No value</td><td><code>жоқ</code></td></tr>
<tr><td>Amount ≤ 0 (including <code>'abc'</code> → 0)</td><td><code>қате</code></td></tr>
<tr><td>Amount far larger than usual</td><td><code>күдікті</code></td></tr>
<tr><td>Everything else</td><td><code>ok</code></td></tr>
</table>
<p>We do not delete values right away: first we flag them, then discuss how many there are and why with the business. A "suspicious" value may be a real large order.</p>
<h3>How do we decide what is "too large"?</h3>
<p>There are two common approaches:</p>
<ul>
<li><b>Business threshold</b>: a rule such as "a single order does not exceed 200,000 ₸". Easy to understand, but the threshold has to be agreed with the business.</li>
<li><b>Statistical threshold (IQR)</b>: find the quartiles Q1 and Q3 and flag values greater than <code>Q3 + 1.5 × (Q3 − Q1)</code> as suspicious. We cover this approach in more detail in the statistics module.</li>
</ul>
<h3>An SQL pattern for flagging</h3>
<pre><code>CASE
  WHEN amount IS NULL THEN 'жоқ'
  WHEN amount_num &lt;= 0 THEN 'қате'
  WHEN amount_num &gt; 200000 THEN 'күдікті'
  ELSE 'ok'
END AS flag</code></pre>
<p><code>CASE</code> checks the conditions from top to bottom and returns the first one that matches. So the order matters: the <code>NULL</code> check must come first.</p>
<div class="tip">Count the flags: <code>GROUP BY flag</code>. If 1% of rows are errors, it is a small problem; if 30% are, there is a serious fault in the data collection process.</div>`,
      ex: [
        { prompt: 'For each order, output <code>id</code>, <code>amount_num</code> and <code>flag</code>. Rules: <code>amount</code> is NULL → <code>жоқ</code> (missing); amount_num ≤ 0 → <code>қате</code> (error); amount_num &gt; 500000 → <code>күдікті</code> (suspicious); otherwise <code>ok</code>. Use a CTE.', hints: ['The order of the CASE conditions matters: check for NULL first.'] },
        { prompt: 'What is the best action for a 990,000 ₸ order flagged as "suspicious"?', options: ['Delete it right away', 'Do nothing', 'Check the reason (a typo or a real large order?) and document the decision', 'Replace it with the average'], explain: 'A suspicious value may be information. The decision depends on the reason, and it should be written down.' }
      ]
    },
    'cl-7': {
      title: 'EDA: exploration that starts with a question',
      body: `
<p><b>EDA</b> (Exploratory Data Analysis) means getting a "feel" for the data after cleaning it: what is there, how it is distributed, what patterns show up.</p>
<h3>EDA checklist</h3>
<ol>
<li><b>Question</b>: what does the business want to know? EDA without a question turns into endless tables.</li>
<li><b>One variable</b> (univariate): the distribution of each important column, mean/median, outliers.</li>
<li><b>Two variables</b> (bivariate): comparison by group (average order by city), correlation.</li>
<li><b>Time</b>: trend, seasonality, sudden jumps.</li>
<li><b>Conclusion</b>: 3–5 concrete observations and the next step.</li>
</ol>
<h3>Reading CSV in Python</h3>
<p>You can read CSV even without pandas. <code>csv.DictReader</code> turns each row into a dictionary:</p>
<pre><code>import csv, io
text = """city,amount
Алматы,12500
Астана,8000"""
for row in csv.DictReader(io.StringIO(text)):
    print(row["city"], int(row["amount"]))</code></pre>
<h3>An EDA example: a coffee shop</h3>
<p><b>Question:</b> "Is the average receipt bigger on weekends?"</p>
<ol>
<li><b>One variable</b>: the median receipt is 2,300 ₸, but there are a few 40,000 ₸ corporate orders.</li>
<li><b>Two variables</b>: median by day of week: 2,100 ₸ on weekdays, 2,900 ₸ on weekends.</li>
<li><b>Time</b>: the gap holds in every month, so it is not random.</li>
<li><b>Conclusion</b>: on weekends the receipt is about 40% higher. Next step: test a weekend combo offer.</li>
</ol>
<h3>Mean or median?</h3>
<p>If there are outliers, compare groups by the median. A single 40,000 ₸ order changes the mean of a small group a lot, but has little effect on the median.</p>
<div class="tip">During EDA, write down each observation in one sentence. At the end it will be easy to pick the 3–5 most important ones.</div>`,
      ex: [
        { prompt: 'From the CSV in <code>text</code>, compute the average order amount for each city and store it in the dictionary <code>avg_by_city</code> (key: city, value: average). Then print it.', check: { tests: 'assert avg_by_city == {"Алматы": 12000, "Астана": 9000, "Шымкент": 6000}, "Expected Алматы 12000, Астана 9000, Шымкент 6000"' }, hints: ['Keep two dictionaries: the total and the count.', '<code>int(row["amount"])</code>: the values in a CSV are text.'] },
        { prompt: 'A manager said "find something in the data". Where is the right place to start EDA?', options: ['Plotting every chart of every column', 'Clarifying the business question: what decision will be made?', 'An ML model', 'Going straight to a dashboard'], explain: 'The question guides the EDA and shows what you can ignore.' }
      ]
    },
    'cl-8': {
      title: 'Mini project: cleaning a messy CSV',
      body: `
<p>A real task: an export from the CRM has arrived. Columns: <code>name</code>, <code>city</code>, <code>amount</code>. The problems:</p>
<ul>
<li>names have extra spaces;</li>
<li>cities are written in different ways: <code>алматы</code>, <code>Almaty</code>, <code>АСТАНА</code>;</li>
<li>the amount has spaces (<code>12 500</code>), and is sometimes blank or text.</li>
</ul>
<p>The goal is a function <code>clean_rows(text)</code>: it returns a list of clean rows and drops the rows with an invalid amount.</p>
<pre><code>CITY_MAP = {"алматы": "Алматы", "almaty": "Алматы",
            "астана": "Астана", "astana": "Астана"}
key = city.strip().lower()
city = CITY_MAP.get(key, city.strip())</code></pre>
<div class="tip">Python's <code>str.lower()</code> works correctly with Cyrillic too: "АСТАНА".lower() → "астана".</div>
<h3>Structure of the solution</h3>
<p>It is handy to split the cleaning function into small parts. Each part can be tested on its own:</p>
<pre><code>def clean_amount(s):
    s = (s or "").replace(" ", "")
    return int(s) if s.isdigit() else None

def clean_city(s):
    key = s.strip().lower()
    return CITY_MAP.get(key, s.strip())</code></pre>
<p><code>str.isdigit()</code> returns <code>False</code> for an empty string, so both a blank amount and "abc" become <code>None</code>.</p>
<h3>Checking the result</h3>
<ul>
<li>How many rows came in and how many went out? Write down the number of dropped rows.</li>
<li>Look at the list of cleaned cities: is there a new variant left that is not in the dictionary?</li>
<li>Check the smallest and largest amounts.</li>
</ul>
<div class="tip">In real work you write the cleaning code once and reuse it on every new export. So give the function a clear name and add a comment for each rule.</div>`,
      ex: [
        { prompt: 'Write a function <code>clean_rows(text)</code>. For each row it should return a dictionary: <code>name</code> (strip), <code>city</code> (via <code>CITY_MAP</code>, or the stripped text if not found), <code>amount</code> (an <code>int</code> without spaces). Rows whose amount is blank, negative, zero or not a number are dropped.', check: { tests: '_t = """name,city,amount\n Айгерім ,алматы,12 500\nНұрлан,АСТАНА,8000\nДана,Almaty,\nЕржан,Шымкент,-300\nТимур, Ақтөбе ,abc\nӘсем,astana,7 200"""\n_r = clean_rows(_t)\nassert isinstance(_r, list), "Return a list"\nassert len(_r) == 3, f"3 clean rows should remain, you have {len(_r)}"\nassert _r[0] == {"name": "Айгерім", "city": "Алматы", "amount": 12500}, f"Row 1: {_r[0]}"\nassert _r[1] == {"name": "Нұрлан", "city": "Астана", "amount": 8000}, f"Row 2: {_r[1]}"\nassert _r[2] == {"name": "Әсем", "city": "Астана", "amount": 7200}, f"Row 3: {_r[2]}"' }, hints: ['For the amount: <code>try: int(...) except ValueError: continue</code>.', 'City: <code>CITY_MAP.get(city.lower(), city)</code>, where <code>city = row["city"].strip()</code>.'] }
      ]
    },
    'cl-gate': {
      title: 'Module exam: Cleaning & EDA',
      body: `
<p>Final check: profiling, standardization, duplicates and cleaning in Python. Database: <code>raw</code>.</p>`,
      ex: [
        { prompt: 'Output a clean list of customers: those with an email, keeping the smallest <code>id</code> for each email (ignoring case). Columns: <code>id</code>, <code>name</code> (TRIM), <code>email</code> (LOWER), <code>city</code> (Almaty/Astana variants merged, everything else TRIM).' },
        { prompt: 'Output the total amount of valid orders (amount greater than 0 and not over 500,000) as a single value <code>total</code>.' },
        { prompt: 'Write a function <code>profile(rows)</code>: it takes a list of dictionaries and returns a dictionary with the number of missing values (<code>None</code> or empty text <code>""</code>) for each key. The keys come from the first row.', check: { tests: '_rows = [{"a": 1, "b": None, "c": "x"}, {"a": None, "b": "", "c": "y"}, {"a": 3, "b": "z", "c": ""}]\nassert profile(_rows) == {"a": 1, "b": 2, "c": 1}, f"Expected {{\'a\': 1, \'b\': 2, \'c\': 1}}, you have {profile(_rows)}"' } },
        { prompt: 'Which cleaning step <b>must</b> be documented?', options: ['Removing spaces', 'Decisions to drop rows or fill in values', 'Changing the column order', 'None'], explain: 'Dropping rows or filling values changes the result: later someone will ask "why is the number different?".' }
      ]
    }
  }
});
