// M7.1 Career & Portfolio: English text. Code, solutions and expected output are in content/career.js.
DJ.i18n.patch({
  modules: {
    'm7-1': { intro: 'Turning knowledge into a job: portfolio, CV, LinkedIn, SQL and case interviews, take-home tasks and the first 90 days. Concrete steps for anyone looking for their first data job in Kazakhstan.' }
  },
  lessons: {
    'cr-1': {
      title: 'The job market and data roles',
      body: `
<p>"Data specialist" is not a single profession. Job postings list different roles, and at junior level their requirements are quite similar.</p>
<table>
<tr><th>Role</th><th>Main work</th><th>What a junior is asked for</th></tr>
<tr><td>Data Analyst (DA)</td><td>Answering business questions with data, reports</td><td>SQL, Excel/Sheets, basic statistics, clear conclusions</td></tr>
<tr><td>BI Analyst</td><td>Dashboards, metrics, automating reporting</td><td>SQL, Power BI/Tableau/Superset, data model</td></tr>
<tr><td>Product Analyst</td><td>Product metrics, funnel, retention, A/B tests</td><td>SQL (window functions), A/B tests, product sense</td></tr>
<tr><td>Data Scientist (DS)</td><td>Predictive models, ML</td><td>Python, pandas, statistics, ML basics</td></tr>
</table>
<p>What all roles have in common is <b>SQL</b>. So solid SQL opens any door.</p>
<h3>The market in Kazakhstan</h3>
<ul>
<li><b>Where to look:</b> hh.kz, LinkedIn, company career pages, professional Telegram channels and communities.</li>
<li><b>Who hires:</b> banks and fintech, telecom, e-commerce and marketplaces, retail, logistics, government digital services, IT companies.</li>
<li><b>Language:</b> job postings are often written in Russian or English. Know the terms in those languages and be ready to interview in them.</li>
</ul>
<p>Don't trust ready-made numbers about salaries and demand: collect real postings from hh.kz yourself and look at the median. That is a small data project too.</p>
<h3>Step-by-step example: reading a job posting</h3>
<p>Text (in Russian): «Junior аналитик. SQL (JOIN, оконные функции), Excel, Power BI будет плюсом, понимание A/B тестов, умение объяснять результаты бизнесу» ("Junior analyst. SQL (JOIN, window functions), Excel, Power BI is a plus, understanding of A/B tests, ability to explain results to the business").</p>
<ol>
<li><b>Required:</b> SQL including window functions, Excel.</li>
<li><b>Nice to have:</b> Power BI ("is a plus").</li>
<li><b>Type of role:</b> A/B tests are mentioned, so it is closer to Product Analyst.</li>
<li><b>Action:</b> in the CV we move SQL window functions and the A/B test project higher up.</li>
</ol>
<div class="tip"><b>Common mistakes:</b> (1) applying only to "Data Scientist" postings, although there are few junior DS openings; the DA and BI path is often an easier entry point. (2) Waiting because "I'm not ready yet": if you match 60–70% of the requirements, apply. (3) Sending the same CV to everyone without changes.</div>`,
      ex: [
        { prompt: 'A posting says: "building and maintaining dashboards, Power BI, DAX, SQL, automating reports". Which role is this closest to?', options: ['Data Scientist', 'BI Analyst', 'Data Engineer', 'Product Manager'], explain: 'Dashboards, Power BI and automating reporting are the work of a BI Analyst.' },
        { prompt: 'As a junior analyst, which skill should you strengthen first, because it is asked for in all of the DA, BI, Product and DS roles?', options: ['Deep learning', 'SQL', 'Kubernetes', 'Java'], explain: 'SQL is the common foundation of all data roles and the most frequent part of junior interviews.' },
        { prompt: 'You match about 65% of a posting\'s requirements. What should you do?', options: ['Not apply and wait until I have learned everything', 'Apply and tailor the CV to this posting', 'Switch to another profession', 'Lie that I meet all the requirements'], explain: 'The list of requirements usually describes the "ideal candidate". Show the matching part clearly in your CV and apply.' }
      ]
    },
    'cr-2': {
      title: 'Portfolio: 2–3 projects and a README',
      body: `
<p>The main evidence a junior without experience has is a <b>portfolio</b>. <b>2–3 finished</b> projects are better than ten half-done ones. An employer spends 1–2 minutes on each project, so the README must tell everything on the first screen.</p>
<h3>Choosing projects</h3>
<ul>
<li><b>SQL + a business question:</b> for example, a retention or funnel analysis of an online shop.</li>
<li><b>A dashboard:</b> a metrics page in Power BI or Looker Studio, with a screenshot.</li>
<li><b>A Python analysis:</b> cleaning open data, EDA, an A/B test or a forecast.</li>
</ul>
<p>Use open data (Kaggle, open portals such as data.egov.kz, hh.kz postings you collected yourself). Don't publish another company's confidential data.</p>
<h3>README structure</h3>
<ol>
<li><b>Question:</b> what business problem did you solve?</li>
<li><b>Data:</b> where from, how many rows, which period, limitations.</li>
<li><b>Method:</b> what steps (cleaning, SQL, A/B test), briefly.</li>
<li><b>Result:</b> 2–3 key findings with numbers.</li>
<li><b>Recommendation:</b> what the business should do and the next step.</li>
</ol>
<h3>Step-by-step example</h3>
<pre><code># Online shop: why don't customers come back?
Question: why were repeat purchases low in the 2nd half of 2024?
Data: 15 orders, 10 customers, August–December 2024 (SQLite).
Method: SQL JOIN + GROUP BY, retention by cohort.
Result: only 5 of 10 customers (50%) placed a repeat order;
        customers from Almaty account for most repeat orders.
Recommendation: send a promo code 14 days after the first order,
        test it with an A/B test.</code></pre>
<p>Make each project different from the others: let one show SQL strength, one visualization and a dashboard, one Python and statistics. Then the three projects together give the picture of a "complete junior analyst". The project name matters too: not "project1" but something meaningful such as "Online shop: retention analysis".</p>
<p>Notice: the reader learns what was found from the first five lines. Code and charts come below, after the "Method" section.</p>
<div class="tip"><b>Common mistakes:</b> (1) no README, or just "Kaggle titanic notebook". (2) A result without numbers: "I found interesting patterns". (3) No recommendation, while an analyst's value is helping with decisions. (4) Copying a course exercise unchanged: at least frame the question in your own way.</div>`,
      ex: [
        { prompt: 'Write a README for one of your projects (for example, the capstone project of the Data Analyst track): Question, Data, Method, Result, Recommendation. At least 60 words. Then grade it honestly against the four criteria; to pass, each must be at least <b>3 / 4</b>.', criteria: [
          { name: 'Business question', levels: ['No question', 'Only a topic ("sales analysis")', 'There is a concrete question', 'There is a concrete question and it says who needs it and why'] },
          { name: 'Data and method', levels: ['Not mentioned', 'Only a list of tools', 'Data source, size and main steps', 'Source, size, period, limitations and steps'] },
          { name: 'Result with numbers', levels: ['No result', 'General words, no numbers', '1–2 findings with numbers', '2–3 findings, each with a number and a comparison'] },
          { name: 'Recommendation', levels: ['None', 'Vague ("needs improving")', 'A concrete action', 'A concrete action and how to test it (metric, experiment)'] }
        ] },
        { prompt: 'An employer reads a README for 1 minute. What should be on the first screen?', options: ['Instructions for installing libraries', 'The question, the main result and the recommendation', 'All the SQL queries', 'Copyright text'], explain: 'The reader first wants to know "what did you ask, what did you find, what should be done?" Technical details go below.' },
        { prompt: 'Which portfolio makes a stronger impression on an employer?', options: ['12 half-done notebooks without a README', '2–3 finished projects, each with a question, a result and a recommendation', 'Only a list of certificates', 'One big but unfinished ML project'], explain: 'A few finished, clear projects show quality and that you can carry work through to the end.' }
      ]
    },
    'cr-3': {
      title: 'A CV for a data role',
      body: `
<p>A CV is a tool for getting invited to an interview. A recruiter first looks at it for a few seconds, and many companies use an <b>ATS</b> (Applicant Tracking System): it compares the keywords in your CV with the job posting.</p>
<h3>Structure (one page)</h3>
<ol>
<li>Full name, city, phone, email, LinkedIn, GitHub/portfolio link.</li>
<li>A short summary (2 lines): who you are and what you can do.</li>
<li><b>Skills:</b> SQL, Python (pandas), Excel, Power BI, statistics, A/B testing.</li>
<li><b>Projects</b> (if you have little experience, put projects higher).</li>
<li>Experience (any job, internship, freelance), Education, languages.</li>
</ol>
<h3>Impact bullet</h3>
<p>Formula: <b>verb + what you did + tool + result with a number</b>. The result is a comparison: "from X to Y", "saved N hours", "found M customer segments".</p>
<h3>Step-by-step example</h3>
<table>
<tr><th>Weak</th><th>Strong</th></tr>
<tr><td>Worked with reports in Excel</td><td>Moved the weekly sales report from Excel to SQL + Power BI, cutting preparation time from 4 hours to 20 minutes</td></tr>
<tr><td>Did an A/B test</td><td>Analysed an A/B test of the checkout page (n = 8 000): conversion grew from 2.0% to 2.5%, p = 0.03; version B was shipped</td></tr>
</table>
<ol>
<li>Start from the weak line: what did I do?</li>
<li>Add the tool: SQL, Power BI.</li>
<li>Measure the result: time, percent, money, number of customers.</li>
<li>Give a comparison: "before → after".</li>
</ol>
<p>Compute relative growth correctly: growth from 2.0% to 2.5% is <b>0.5 percentage points</b>, but in relative terms it is (2.5 − 2.0) / 2.0 = <b>25%</b>.</p>
<p><b>ATS keywords:</b> write the words from the posting exactly as they appear (Power BI, SQL, A/B testing). Don't complicate the CV with tables, images or two columns: an ATS may not read it correctly. Save the file as a PDF and name it "Aty_Zhoni_Data_Analyst.pdf" (your first and last name).</p>
<p>Tailor your CV to each posting for 10–15 minutes: change the role name in the summary, move the matching project up, check that the posting's keywords are present.</p>
<div class="tip"><b>Common mistakes:</b> (1) two or three pages; (2) a list of duties without results; (3) made-up numbers: in the interview you must be able to explain every number; (4) mixing up percentage points and percent.</div>`,
      ex: [
        { prompt: 'Write <b>3 impact bullets</b> for your CV based on your projects or experience (at least 40 words in total). Each one: verb + what you did + tool + numeric result. Then grade them; to pass, each criterion must be at least <b>3 / 4</b>.', criteria: [
          { name: 'Starts with an action verb', levels: ['No verb, only "was responsible for"', 'Only one bullet starts with a verb', 'All start with a concrete verb', 'All start with a concrete verb and fit on one line'] },
          { name: 'Numeric result', levels: ['No numbers', 'One bullet has a number', 'Every bullet has a number', 'Every bullet has a "before → after" comparison or business impact'] },
          { name: 'Tools and keywords', levels: ['No tools named', 'One tool', 'The main tools from the posting (SQL, Python, BI)', 'Tools are written exactly as in the posting text'] },
          { name: 'Honesty and ability to explain', levels: ['The numbers are made up', 'I don\'t know the source of some numbers', 'I can explain every number', 'The source of every number is shown in the project or README'] }
        ] },
        { prompt: 'Email open rate grew from 16% to 20%. What <b>relative</b> growth in percent do you write in your CV?', unit: '%', explain: '(20 − 16) / 16 = 0.25, i.e. 25%. The absolute change is 4 percentage points.' },
        { prompt: 'What should you do so that an ATS matches your CV with the posting better?', options: ['Send the CV as an image (PNG)', 'Write the tools and skills from the posting with exactly the same names (for example, "Power BI", "SQL")', 'Hide keywords in white text', 'Use a three-column design'], explain: 'An ATS reads text and compares keywords. A simple layout and exact names are the most reliable way.' }
      ]
    },
    'cr-4': {
      title: 'LinkedIn and GitHub profiles',
      body: `
<p>If a recruiter likes your CV, the next step is opening your LinkedIn and GitHub. Both should tell the same story: "this person can answer business questions with data".</p>
<h3>LinkedIn</h3>
<ul>
<li><b>Headline:</b> not just "Student", but a concrete role and tools: "Junior Data Analyst | SQL, Python, Power BI".</li>
<li><b>About:</b> 3–5 sentences: who you are, what problems you solve, 1–2 projects with results, what interests you.</li>
<li><b>Featured:</b> links to portfolio projects, a dashboard screenshot.</li>
<li><b>Skills:</b> matching the names used in job postings.</li>
<li><b>Open to work:</b> list the roles and cities you want (Almaty, Astana, remote).</li>
</ul>
<h3>GitHub</h3>
<ul>
<li>A profile README: 3–4 lines about yourself and links to your best projects.</li>
<li>2–3 portfolio projects in the <b>Pinned</b> section.</li>
<li>In each repository: a README (the structure from the last lesson), <code>data/</code>, <code>notebooks/</code> or <code>sql/</code>, <code>requirements.txt</code>.</li>
<li>No secrets: passwords, API keys, personal data.</li>
</ul>
<h3>Step-by-step example: headline and About</h3>
<ol>
<li>Starting point: "Student. Interested in data."</li>
<li>Add a role: "Junior Data Analyst".</li>
<li>Tools: "SQL, Python (pandas), Power BI".</li>
<li>Evidence in About: "I did a retention analysis on online shop data and showed that only 50% of customers place a repeat order; I proposed a test of a promo code after the first order."</li>
<li>A call to action at the end: "Open to junior DA/BI roles in Almaty/Astana or remote."</li>
</ol>
<p>Once the profile is filled in, keep it "alive": when you finish a new project, write a short post (what you asked, what you found, one chart). Recruiters see active profiles more often, and a post becomes an extra link to your portfolio.</p>
<h3>Networking</h3>
<p>The data community in Kazakhstan is small: go to meetups, join Telegram communities, write short posts about your projects. Write to analysts not with "please give me a job" but with a concrete question: "What does your team expect from a junior?" Such messages are easier to answer.</p>
<div class="tip"><b>Common mistakes:</b> (1) dates and roles on LinkedIn and in the CV don't match; (2) GitHub has only forks and course exercises; (3) no photo, an empty About; (4) accidentally uploading a <code>.env</code> file to the repository.</div>`,
      ex: [
        { prompt: 'Which LinkedIn headline works best for a junior analyst?', options: ['Student', 'Looking for job', 'Junior Data Analyst | SQL, Python, Power BI', 'I love data'], explain: 'The headline shows up in search: the role and key tools match the recruiter\'s search terms.' },
        { prompt: 'What should not be in a GitHub repository?', options: ['README.md', 'requirements.txt', 'A .env file with an API key', 'An sql/ folder'], explain: 'Never publish secret keys or personal data. Add the .env file to .gitignore.' },
        { prompt: 'A first LinkedIn message to an analyst you don\'t know. Which one is more likely to get a reply?', options: ['"Please give me a job"', '"Hello! I\'m a junior DA and I built a retention project. What SQL level does your team expect from a junior?"', 'Sending a CV without any comment', 'Writing "?" three times a day'], explain: 'A short, concrete question that respects the person\'s time has a better chance of getting a reply.' }
      ]
    },
    'cr-5': {
      title: 'SQL interview I: second highest salary and duplicates',
      body: `
<p>SQL tasks in junior interviews repeat a lot. Learn their "classic" patterns and practise thinking out loud. Database: <code>staff</code>, table <code>employees(id, name, department, salary, hire_date, manager_id)</code>.</p>
<h3>1. Second highest salary</h3>
<p>The most popular question. There are two approaches:</p>
<pre><code>-- (a) subquery: the maximum of the values below the maximum
SELECT MAX(salary) AS second_salary
FROM employees
WHERE salary &lt; (SELECT MAX(salary) FROM employees);

-- (b) DISTINCT + LIMIT/OFFSET
SELECT DISTINCT salary FROM employees
ORDER BY salary DESC LIMIT 1 OFFSET 1;</code></pre>
<h3>Step-by-step example</h3>
<ol>
<li>Clarify: "If two people share the highest salary, who is second?" The interviewer expects exactly this question.</li>
<li>Subquery: <code>SELECT MAX(salary)</code> → 1 200 000.</li>
<li>Outer query: the maximum of the values below 1 200 000 → 900 000.</li>
<li>Edge case: if there is only one employee, (a) returns <code>NULL</code> and (b) an empty table. Say so.</li>
</ol>
<h3>2. Finding duplicates</h3>
<p>"Which values occur more than once?" — <code>GROUP BY</code> + <code>HAVING</code>:</p>
<pre><code>SELECT department, salary, COUNT(*) AS cnt
FROM employees
GROUP BY department, salary
HAVING COUNT(*) &gt; 1;</code></pre>
<p>In real data a duplicate is the same <code>email</code> or the same order row. The logic is the same: choose the grouping key and <code>COUNT(*) &gt; 1</code>.</p>
<p>One note: in this query we grouped by <code>department</code> and <code>salary</code>, i.e. "people with the same salary in one department". If you group only by <code>salary</code>, people from different departments also fall into one group. Choosing the grouping key is part of clarifying the task.</p>
<h3>How to talk in the interview</h3>
<ul>
<li>Clarify the table, the columns and the shape of the result.</li>
<li>Start with a simple solution, then name edge cases (NULL, ties).</li>
<li>Check the result on a small example.</li>
</ul>
<div class="tip"><b>Common mistakes:</b> (1) <code>ORDER BY salary DESC LIMIT 1 OFFSET 1</code> without <code>DISTINCT</code> gives a wrong result when salaries tie; (2) <code>WHERE COUNT(*) &gt; 1</code> — a condition on an aggregate goes in <code>HAVING</code>; (3) writing right away without clarifying the question.</div>`,
      ex: [
        { prompt: 'Output the second highest (distinct) salary in the company. One column: <code>second_salary</code>.', hints: ['Subquery: <code>SELECT MAX(salary) FROM employees</code>.', 'Outside: <code>WHERE salary &lt; (...)</code> and <code>MAX(salary)</code>.'] },
        { prompt: 'Are there employees with the same salary in one department? Output <code>department</code>, <code>salary</code>, <code>cnt</code> (number of people), only rows where <code>cnt</code> is greater than 1.', hints: ['<code>GROUP BY department, salary</code>', 'Condition on an aggregate: <code>HAVING COUNT(*) &gt; 1</code>'] },
        { prompt: 'In which case does <code>SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1</code> give a wrong "second highest salary"?', options: ['If the table is not empty', 'If two people have the highest salary', 'If salaries are integers', 'It is never wrong'], explain: 'If two people earn 1 200 000, the second row is also 1 200 000. You need <code>DISTINCT</code> or <code>DENSE_RANK</code>.' }
      ]
    },
    'cr-6': {
      title: 'SQL interview II: top-N per group and retention',
      body: `
<p>Second-level questions test window functions and cohorts. Retention questions come up often in Product Analyst interviews.</p>
<h3>Top-N per group</h3>
<p>"The 2 highest-paid people in each department" — <code>GROUP BY</code> can't do this, because it collapses rows. A window function keeps the rows and numbers them within each group:</p>
<table>
<tr><th>Function</th><th>Ties (520, 520)</th></tr>
<tr><td><code>ROW_NUMBER()</code></td><td>1, 2, 3 — tied values get different numbers</td></tr>
<tr><td><code>RANK()</code></td><td>1, 2, 2, 4 — there is a gap</td></tr>
<tr><td><code>DENSE_RANK()</code></td><td>1, 2, 2, 3 — no gap</td></tr>
</table>
<pre><code>SELECT department, name, salary
FROM (
  SELECT department, name, salary,
         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
)
WHERE rnk &lt;= 2;</code></pre>
<p>You can't use a window function result directly in <code>WHERE</code>, so you need a subquery (or a CTE).</p>
<h3>Retention: a step-by-step example</h3>
<p>Database <code>metrics</code>: <code>users(id, signup_month, channel)</code>, <code>activity(user_id, month)</code>. Question: "What percentage of each cohort was active in the following month?"</p>
<ol>
<li>Cohort = signup month. The July cohort: 1, 2, 3, 4 (4 people).</li>
<li>Next month: <code>strftime('%Y-%m', signup_month || '-01', '+1 month')</code> → "2024-08".</li>
<li><code>LEFT JOIN activity</code> with this condition: active in August were 1, 2, 4 → 3 people.</li>
<li>Retention = 3 / 4 = 75%.</li>
</ol>
<pre><code>SELECT u.signup_month,
       COUNT(DISTINCT u.id) AS cohort_size,
       COUNT(DISTINCT a.user_id) AS retained
FROM users u
LEFT JOIN activity a
  ON a.user_id = u.id
 AND a.month = strftime('%Y-%m', u.signup_month || '-01', '+1 month')
GROUP BY u.signup_month;</code></pre>
<p><code>LEFT JOIN</code> matters: a cohort from which nobody returned must also appear in the result with 0.</p>
<div class="tip"><b>Common mistakes:</b> (1) using <code>ROW_NUMBER</code> without asking about ties; (2) putting the condition in <code>WHERE</code> instead of <code>ON</code> — then the <code>LEFT JOIN</code> turns into an <code>INNER JOIN</code>; (3) using <code>COUNT(*)</code>, although rows may multiply after a JOIN; <code>COUNT(DISTINCT ...)</code> is safer; (4) integer division: add <code>100.0 *</code>.</div>`,
      ex: [
        { prompt: 'Employees in the top <b>2 salary levels</b> of each department (tied salaries are one level, <code>DENSE_RANK</code>): <code>department</code>, <code>name</code>, <code>salary</code>.', hints: ['<code>DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC)</code>', 'Write a subquery, and outside it <code>WHERE rnk &lt;= 2</code>.'] },
        { prompt: 'Next-month retention for each signup cohort: <code>signup_month</code>, <code>cohort_size</code>, <code>retained</code> (users present in <code>activity</code> in the following month), <code>retention_pct</code> (percent, rounded to 1 decimal place).', hints: ['Next month: <code>strftime(\'%Y-%m\', u.signup_month || \'-01\', \'+1 month\')</code>', 'Put the condition inside <code>LEFT JOIN ... ON</code>, not in <code>WHERE</code>.', '<code>ROUND(100.0 * retained / cohort_size, 1)</code> — but instead of the aliases, repeat the <code>COUNT(DISTINCT ...)</code> expressions.'] },
        { prompt: 'The August cohort had 5 users, 3 of them were active in September. What is next-month retention in percent?', unit: '%', explain: '3 / 5 = 0.6 = 60%.' }
      ]
    },
    'cr-7': {
      title: 'Python/pandas take-home: how to do the task',
      body: `
<p>A <b>take-home</b> is a task you do at home: a CSV file and 3–5 questions, with a deadline of 2–7 days. What is graded is not only the right answer but also how <b>clean and clear</b> the work is.</p>
<h3>Notebook structure</h3>
<ol>
<li><b>Goal:</b> restate the task's questions in your own words.</li>
<li><b>Load and check:</b> <code>df.shape</code>, <code>df.info()</code>, <code>df.isna().sum()</code>, <code>df.duplicated().sum()</code>.</li>
<li><b>Cleaning:</b> write down each rule (why, and how many rows it affected).</li>
<li><b>Analysis:</b> a separate section per question, with a short conclusion.</li>
<li><b>Summary:</b> answers, recommendations, limitations, assumptions.</li>
</ol>
<h3>Step-by-step example</h3>
<pre><code>import pandas as pd
df = pd.read_csv('orders.csv')
print(df.shape)                      # (10 250, 5)
print(df.duplicated('order_id').sum())   # 250 duplicates
df = df.drop_duplicates('order_id')
df = df[df['status'] != 'cancelled']
df = df.dropna(subset=['amount'])
assert df['order_id'].is_unique, 'order_id қайталанбауы керек'
by_city = df.groupby('city')['amount'].sum().sort_values(ascending=False)</code></pre>
<ol>
<li>We looked at the size → counted the duplicates.</li>
<li>After each cleaning step we note how many rows are left.</li>
<li><code>assert</code> is a self-check (its message means "order_id must not repeat"): interviewers see it as a good sign.</li>
<li>We explain the result in one sentence: "45% of revenue comes from Almaty".</li>
</ol>
<p>When you submit the task, write a short cover note: the 3 main answers, the assumptions you made and how to run the notebook. The reviewer sees the result before even opening your work. Many companies have a discussion stage after the take-home: think in advance about answers to "why did you choose this approach?" and "what would you do with more time?". Even if you don't know pandas, the logic is the same: duplicates, missing values, filtering, grouping. In the exercise below you write that logic in standard Python.</p>
<h3>General tips</h3>
<ul>
<li><b>Limit your time:</b> if the task says "3–4 hours", don't spend 2 days. Write what you didn't do in a "Next steps" section.</li>
<li><b>State your assumptions:</b> "I did not include cancelled orders in revenue".</li>
<li><b>Reproducible:</b> the notebook must run from top to bottom without errors; add <code>requirements.txt</code>.</li>
<li><b>Clean code:</b> functions, clear names, no unnecessary output.</li>
</ul>
<div class="tip"><b>Common mistakes:</b> (1) cleaning without explaining; (2) 40 charts but no answer to the question; (3) adding an ML model when nobody asked for one; (4) submitting a notebook that was run out of order.</div>`,
      ex: [
        { prompt: 'Write the cleaning step of a take-home in standard Python. The function <code>revenue_by_city(rows)</code> takes a list of tuples <code>(order_id, city, amount, status)</code>. Keep only the <b>first</b> row of each <code>order_id</code>, skip rows with <code>status == \'cancelled\'</code> and <code>amount is None</code>, then return the dictionary <code>{city: sum of amount}</code>.', hints: ['Keep the ids you have seen in <code>seen = set()</code>.', 'Do the duplicate check <b>before</b> the status/amount check.', '<code>result[city] = result.get(city, 0) + amount</code>'], check: { tests: '_rows = [(1, "Алматы", 5000, "delivered"), (2, "Астана", 3000, "delivered"), (1, "Алматы", 5000, "delivered"), (3, "Алматы", 2000, "cancelled"), (4, "Шымкент", None, "delivered"), (5, "Астана", 4000, "shipped")]\n_r = revenue_by_city(_rows)\nassert isinstance(_r, dict), "Return a dictionary"\nassert _r.get("Алматы") == 5000, "Алматы (Almaty) should be 5000: the repeated order_id 1 counts once, cancelled is excluded"\nassert _r.get("Астана") == 7000, "Астана (Astana) should be 7000"\nassert "Шымкент" not in _r, "Skip the row where amount is None"\nassert revenue_by_city([(7, "X", 100, "delivered"), (7, "X", 999, "delivered")]) == {"X": 100}, "Keep only the first row of a repeated order_id"' } },
        { prompt: 'A take-home is given as "about 4 hours". You want to add a complex ML model as a bonus, but one of the main questions still has no answer. What do you do?', options: ['I build the ML model first', 'First a clean answer to every question, then, if time is left, I describe the model idea in a "Next steps" section', 'I submit the task a week later', 'I delete the unanswered question'], explain: 'What is graded is clear answers to the questions and clean work. Writing the extra idea down briefly is enough.' },
        { prompt: 'During cleaning you removed 8% of the rows. How should you show this in the notebook?', options: ['Write nothing', 'Write the rule, the reason and the number of affected rows', 'Show only the final result', 'Reload the data and not clean it'], explain: 'For the reviewer to trust the work, every cleaning decision should be visible: what, why and how many rows.' }
      ]
    },
    'cr-8': {
      title: 'Case interview: a metric dropped 10%',
      body: `
<p>In a product sense or case interview you get an open question: "Yesterday revenue dropped 10%. How would you investigate?" There is no single "right answer"; what is graded is <b>structured thinking</b>.</p>
<h3>A five-step framework</h3>
<ol>
<li><b>Clarify:</b> which metric, compared with which period (yesterday vs the day before, vs the same day last week)? Is 10% outside normal fluctuation?</li>
<li><b>Check the data:</b> tracking, ETL delay, an incomplete day, a new release, a dashboard bug.</li>
<li><b>Internal/external causes:</b> a holiday, seasonality, a competitor's promotion, a payment system outage.</li>
<li><b>Decompose:</b> split the metric into parts: revenue = users × conversion × average order value. Then segments: region, platform (iOS/Android/web), channel, new/returning customer.</li>
<li><b>Hypothesis → test → recommendation:</b> which segment the drop is concentrated in, why, and what to do.</li>
</ol>
<h3>Step-by-step example</h3>
<p>Database <code>metrics</code>, table <code>daily_sales(day, region, revenue)</code>. We compare total daily revenue with the previous day using <code>LAG</code>:</p>
<pre><code>WITH t AS (
  SELECT day, SUM(revenue) AS revenue FROM daily_sales GROUP BY day
)
SELECT day, revenue,
       LAG(revenue) OVER (ORDER BY day) AS prev_revenue
FROM t;</code></pre>
<ol>
<li>2024-09-07: 315, 2024-09-08: 250. Change −65, i.e. about −20.6%.</li>
<li>Split by region: Almaty 190 → 140 (−50), Astana 125 → 110 (−15).</li>
<li>50 / 65 ≈ 77% of the drop comes from Almaty. Next question: what happened in Almaty? (delivery, did a promotion end, which platform?)</li>
<li>The next day revenue went back to 295: it may be a one-day deviation, but the cause should be checked.</li>
</ol>
<p>In the interview, say these steps out loud and name at each step what data you would ask for. The interviewer often gives new information ("it dropped only on Android"), and then you steer the framework in that direction.</p>
<div class="tip"><b>Common mistakes:</b> (1) naming a cause right away ("marketing is bad"); (2) not checking that the data is correct; (3) drawing conclusions only from the total without splitting into segments; (4) ignoring the day of the week: comparing Sunday with Saturday is not fair; (5) not giving a recommendation and next step at the end.</div>`,
      ex: [
        { prompt: 'Using <code>daily_sales</code>, find the days when total revenue was <b>lower</b> than the previous day: <code>day</code>, <code>revenue</code> (the day\'s total revenue), <code>prev_revenue</code>, <code>change</code> (= revenue − prev_revenue).', hints: ['First <code>SUM(revenue)</code> by day (a CTE).', '<code>LAG(revenue) OVER (ORDER BY day)</code> is the previous day\'s value.', 'To filter on the window result you need another CTE or a subquery.'] },
        { prompt: 'On 2024-09-08 total revenue fell by 65: Almaty −50, Astana −15. What percentage of the drop comes from Almaty? (to 1 decimal place)', unit: '%', explain: '50 / 65 ≈ 0.769 = 76.9%. It makes sense to start the investigation with Almaty.' },
        { prompt: 'Interviewer: "Orders in the mobile app dropped 10%". What is the best <b>first</b> step?', options: ['Propose a new ad campaign right away', 'Clarify the metric and check the data is correct (tracking, release, incomplete day), then split by platform/region/channel', 'Send a survey to all users', 'Build an ML model and forecast'], explain: 'First "is this a real drop?", then "where?", and only after that "why?" and "what do we do?".' }
      ]
    },
    'cr-9': {
      title: 'Behavioural interview: the STAR method',
      body: `
<p>Besides the technical part, every company asks "how do you work?": "Tell me about a difficult situation", "A time you made a mistake", "How did you resolve a disagreement?". Answer such questions with the <b>STAR</b> structure. It makes your answer short, ordered and convincing, and helps the interviewer see your specific contribution.</p>
<table>
<tr><th>Letter</th><th>Meaning</th><th>Share</th></tr>
<tr><td><b>S</b>ituation</td><td>The situation: when, where, what context</td><td>~15%</td></tr>
<tr><td><b>T</b>ask</td><td>What your task was</td><td>~10%</td></tr>
<tr><td><b>A</b>ction</td><td>What <b>you</b> specifically did ("I", not "we")</td><td>~50%</td></tr>
<tr><td><b>R</b>esult</td><td>The result with numbers and what you learned</td><td>~25%</td></tr>
</table>
<h3>Step-by-step example</h3>
<p>Question: "Tell me about a time you found an error in data."</p>
<ol>
<li><b>S:</b> "In a course project I was preparing an online shop's monthly revenue report, with two days left before the defence."</li>
<li><b>T:</b> "I was responsible for the report's numbers being correct."</li>
<li><b>A:</b> "I compared the order count with the source file and noticed it was 3% too high. I found that rows had multiplied after a JOIN, switched to <code>COUNT(DISTINCT order_id)</code> and added an assert that checks the row count after each step."</li>
<li><b>R:</b> "Revenue was corrected by 3% and the report was submitted on time. Since then I check the row count after every JOIN."</li>
</ol>
<p>Notice: the Result is not just "everything went well" but a concrete fact (corrected by 3%, submitted on time) and a lesson (now I check after every JOIN). The lesson part shows the interviewer that you grow.</p>
<h3>Preparation</h3>
<ul>
<li>Prepare 5–6 stories: a hard task, a mistake, a disagreement, a tight deadline, your own initiative, learning something new quickly.</li>
<li>If you have little experience, study projects, volunteering and any previous job all work.</li>
<li>Each answer takes 1.5–2 minutes. Say it out loud, record yourself and listen.</li>
<li>At the end, ask a question yourself: "How is a junior analyst's success measured in the first 3 months?"</li>
</ul>
<div class="tip"><b>Common mistakes:</b> (1) only "we" in the Action — the interviewer wants to know <b>your</b> contribution; (2) ending without a result; (3) a long 5-minute story; (4) saying "I don't make mistakes": a real mistake and the lesson you took from it are far stronger.</div>`,
      ex: [
        { prompt: 'Write an answer using the STAR structure to the question: "Tell me about a time you ran into a difficulty while working with data and solved it." At least 80 words. Mark the S, T, A and R parts. Then grade it; to pass, each criterion must be at least <b>3 / 4</b>.', criteria: [
          { name: 'Structure (S, T, A, R)', levels: ['No structure', 'Only two or three parts', 'All four parts are there', 'All four parts are there, and Action is the most detailed'] },
          { name: 'Personal contribution', levels: ['Only "we"', 'My contribution is vague', 'It says what exactly I did ("I did ...")', 'Concrete actions and the reasons for my decisions are given'] },
          { name: 'Result', levels: ['No result', 'Vague ("it went well")', 'A result with a number or a concrete fact', 'A result with a number and the lesson learned'] }
        ] },
        { prompt: 'Which part of a STAR answer should be the longest and most detailed?', options: ['Situation', 'Task', 'Action', 'Result'], explain: 'The interviewer grades what you did. The situation and task are only short context.' },
        { prompt: 'Which answer to "What is your biggest weakness?" is good?', options: ['"I have no weaknesses"', '"I work too much"', 'A real weakness, how you noticed it and what you are doing to fix it', 'Not answering the question'], explain: 'When you show honesty and self-development, this question becomes an advantage.' }
      ]
    },
    'cr-10': {
      title: 'Offer, salary and the first 30-60-90 days',
      body: `
<p>You passed the interview — now you need to evaluate the offer properly and make a good impression in the first months.</p>
<h3>Salary and offer basics</h3>
<ul>
<li><b>Know the market:</b> collect the salary ranges of similar junior postings on hh.kz and find the median. Don't name a number out of thin air.</li>
<li><b>«На руки» or «до вычета» (take-home or gross):</b> always clarify whether the amount is before or after taxes and mandatory contributions.</li>
<li><b>Full package:</b> monthly salary × 12 + annual bonus + health insurance, learning budget, remote/hybrid, probation period.</li>
<li><b>Negotiation:</b> when you are asked first, name a <b>range</b> based on market data. Instead of saying "yes" to an offer immediately, it is normal to ask for 1–2 days to think.</li>
<li><b>Written confirmation:</b> the job title, salary, start date and probation period should be in writing.</li>
</ul>
<h3>Step-by-step example: comparing two offers</h3>
<ol>
<li>A: 450 000 ₸ a month, no bonus → 450 000 × 12 = 5 400 000 ₸ a year.</li>
<li>B: 400 000 ₸ a month + an annual bonus of 1 000 000 ₸ → 4 800 000 + 1 000 000 = 5 800 000 ₸.</li>
<li>B pays 400 000 ₸ more a year, but is the bonus guaranteed? Ask about its conditions.</li>
<li>Beyond money: which one has a mentor and a strong data team? In your first job, how fast you learn matters a lot.</li>
</ol>
<h3>A 30-60-90 day plan</h3>
<table>
<tr><th>Period</th><th>Goal</th><th>Concrete result</th></tr>
<tr><td>Days 1–30</td><td>Learn</td><td>The data warehouse and main tables, metric definitions, 1:1 meetings with the team, finishing one small task</td></tr>
<tr><td>Days 31–60</td><td>Contribute</td><td>Building one report or dashboard on your own, keeping a library of queries</td></tr>
<tr><td>Days 61–90</td><td>Take initiative</td><td>A proposal to automate or improve one process, discussing the result with your manager</td></tr>
</table>
<div class="tip"><b>Common mistakes:</b> (1) not clarifying whether the salary is take-home; (2) proposing to "redo" everything in the first week; (3) being afraid to ask questions: in the first month asking questions is part of the job; (4) not writing down metric definitions, and later getting different numbers.</div>`,
      ex: [
        { prompt: 'Offer A: 450 000 ₸ a month, no bonus. Offer B: 400 000 ₸ a month + an annual bonus of 1 000 000 ₸. What is the annual difference (B − A) in tenge?', unit: '₸', explain: 'A: 5 400 000 ₸. B: 4 800 000 + 1 000 000 = 5 800 000 ₸. The difference is 400 000 ₸. Don\'t forget to clarify the bonus conditions.' },
        { prompt: 'HR: "What salary do you expect?" What is the best answer?', options: ['"Whatever you offer is fine"', 'Name a justified range based on similar hh.kz postings and clarify whether it is take-home or gross', 'Name a number twice the market rate', 'Don\'t answer and change the subject'], explain: 'A range based on market data leaves room for negotiation and shows you are prepared.' },
        { prompt: 'What is the most important goal in the first 30 days of a new job?', options: ['Redoing all the dashboards', 'Getting to know the data, metric definitions and people, and finishing one small task well', 'Asking for a promotion', 'Trying to figure everything out yourself without asking questions'], explain: 'The first month\'s job is learning the context and building trust. Big changes come after 60–90 days.' }
      ]
    },
    'cr-gate': {
      title: 'Module exam: Career & Portfolio',
      body: `
<p>The final check of your interview preparation. The SQL exercises use the <code>staff</code> and <code>metrics</code> databases, as in an interview. Think out loud and submit only after checking the result.</p>`,
      ex: [
        { prompt: 'The <b>second</b> highest (distinct) salary in each department: <code>department</code>, <code>second_salary</code>. A department with only one salary level is not included in the result.' },
        { prompt: 'Employees whose salary is <b>above</b> the average salary of their department: <code>name</code>, <code>department</code>, <code>salary</code>.' },
        { prompt: 'The <code>events</code> funnel: for each <code>step</code>, the number of distinct users <code>users</code> and their percentage of the <code>visit</code> step, <code>pct_of_visit</code> (rounded to 1 decimal place).' },
        { prompt: 'Case interview: "Weekly active users dropped 10%". Which sequence is right?', options: ['Guess the cause → recommendation → check the data', 'Clarify the metric → check the data is correct → split into segments → test hypotheses → recommendation', 'Split into segments → ML model → release', 'Notify all teams right away'], explain: 'A structured framework: what is measured, is the data correct, where is the drop, why, what do we do.' },
        { prompt: 'Which CV bullet is the strongest?', options: ['Was responsible for working with data', 'I know SQL and Python', 'Built a retention cohort analysis in SQL and found the segment that leaves in the second month; the proposed promo code raised repeat purchases from 12% to 15% in an A/B test', 'Worked well in a team'], explain: 'It has a verb, a tool, a concrete action and a numeric "before → after" result.' }
      ]
    }
  }
});
