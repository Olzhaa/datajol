// M2.3 Git and GitHub: English text. Commands, solutions and accept patterns are in content/git.js.
DJ.i18n.patch({
  modules: {
    'm2-3': { intro: 'Git is a system that keeps the history of changes to code, and GitHub is the cloud place where that history is stored and shared. For an analyst, it means keeping SQL scripts and notebooks, working in a team and building a portfolio. In the tasks we check which command you type in the terminal.' }
  },
  lessons: {
    'git-1': {
      title: 'Why do we need Git?',
      body: `
<p>You may know this situation: <code>report_final.xlsx</code>, <code>report_final_v2.xlsx</code>, <code>report_final_ACTUAL.xlsx</code>. Which one is the latest? What changed? Git solves exactly this problem.</p>
<ul>
<li><b>Repository</b>: the project folder and its whole history.</li>
<li><b>Commit</b>: a "snapshot" of the project at a certain moment, plus a message about what changed.</li>
<li><b>Branch</b>: a separate line of work that does not break the main version.</li>
<li><b>Remote</b>: a copy of the repository in the cloud (GitHub, GitLab).</li>
</ul>
<h3>Three areas</h3>
<pre><code>Working directory  ──git add──▶  Staging area  ──git commit──▶  Repository
(changed files)                  (ready for the next commit)     (saved history)</code></pre>
<div class="tip">Git is a program (on your computer), GitHub is a website (in the cloud). You can use Git without GitHub.</div>
<h3>What does Git give an analyst?</h3>
<ul>
<li><b>History</b>: with one command you can see which filter a report had three months ago.</li>
<li><b>Safe experiments</b>: you try a new approach in a separate branch, and if it does not work, you simply delete it.</li>
<li><b>Teamwork</b>: several people can change one SQL file without erasing each other's work.</li>
<li><b>Portfolio</b>: your GitHub profile shows employers your real projects.</li>
</ul>
<h3>What does Git store well?</h3>
<p>Git works best with text files: <code>.sql</code>, <code>.py</code>, <code>.md</code>, <code>.csv</code> (small ones). It shows how each line has changed. Excel and Power BI files (<code>.xlsx</code>, <code>.pbix</code>) are stored in a binary format, so Git only knows that they "changed", but it cannot show what exactly changed. That is why it is worth keeping the logic of a report (SQL, Python) in text files.</p>
<div class="tip">You type the commands of this module in the learning terminal on the site. If you install Git on your own computer and repeat the same commands there, they will be easier to remember.</div>`,
      ex: [
        { prompt: 'What is a commit?', options: ['Deleting a file', 'A saved state of the project at a certain moment, with a message', 'An account on GitHub', 'The name of a branch'], explain: 'A commit is one point in the history: which files changed, how they changed and why.' },
        { prompt: 'The difference between Git and GitHub:', options: ['They are the same thing', 'Git is a version control program, GitHub is a cloud service for storing repositories', 'GitHub is a program, Git is a website', 'Git is only for Python'] }
      ]
    },
    'git-2': {
      title: 'init, status, add, commit',
      body: `
<pre><code>git init                         # start a new repository in the folder
git status                       # what changed, what is in staging
git add sales.sql                # add one file to staging
git add .                        # add all changes
git commit -m "Айлық табыс сұрауын қостым"</code></pre>
<p>First-time setup (only once):</p>
<pre><code>git config --global user.name "Асқар Нұрлан"
git config --global user.email "askar@mail.kz"</code></pre>
<h3>A good commit message</h3>
<ul>
<li>Briefly says <b>what and why</b> changed: "Removed refunds from the cleaning step".</li>
<li>Bad: "fix", "update", "asdf".</li>
<li>One commit = one logical change.</li>
</ul>
<h3>One work cycle</h3>
<p>Everyday work consists of these steps:</p>
<ol>
<li>You change a file (for example, you add a new filter to <code>sales.sql</code>).</li>
<li><code>git status</code>: Git shows the file as "modified".</li>
<li><code>git add sales.sql</code>: you prepare the change for the next snapshot.</li>
<li><code>git commit -m "..."</code>: you save the snapshot to the history.</li>
</ol>
<h3>Why do we need the staging area?</h3>
<p>Suppose you changed two different things at the same time: you fixed a bug in the cleaning query and prepared data for a new chart. With staging, you make two separate commits from them: first <code>git add cleaning.sql</code> and commit, then <code>git add chart.sql</code> and commit. The history stays clean, and if needed, you can roll back just one of the changes.</p>
<div class="tip"><code>git add .</code> is convenient, but it adds all files, including accidental ones. Before committing, check the list with <code>git status</code>.</div>`,
      ex: [
        { prompt: 'Start a new Git repository in the current folder.', hints: ['Think "initialize".'] },
        { prompt: 'Check which files have changed and what is in staging.' },
        { prompt: 'Add the file <code>cleaning.sql</code> to the next commit (staging).' },
        { prompt: 'Save the changes from staging with the message "Тазалау сұрауын қостым" ("Added a cleaning query"). Write the message exactly like this, in Kazakh.', hints: ['The <code>-m</code> flag sets the message, and the message goes in quotes.'] }
      ]
    },
    'git-3': {
      title: 'History: log, diff, restore',
      body: `
<pre><code>git log --oneline          # list of commits, short form
git diff                   # changes not yet added to staging
git diff --staged          # changes in staging
git restore report.sql     # discard unsaved changes in a file
git restore --staged a.sql # remove a file from staging (the change stays)
git revert a1b2c3d         # undo a past commit with a new commit</code></pre>
<div class="tip"><code>git restore</code> permanently deletes unsaved changes. Be careful. To avoid changing the shared history, undo a published commit with <code>revert</code>.</div>
<h3>Looking at commits</h3>
<p><code>git log --oneline</code> shows each commit with its short hash:</p>
<pre><code>a1b2c3d Removed refunds in the cleaning step
9f8e7d6 Added the monthly revenue query
4c5b6a7 Started the project</code></pre>
<p>To see what changed in a specific commit, use <code>git show a1b2c3d</code>, and to see the history of a file, use <code>git log -- sales.sql</code>.</p>
<h3>How to read a diff</h3>
<p>In the output of <code>git diff</code>, lines that start with <code>-</code> were removed, and lines that start with <code>+</code> were added:</p>
<pre><code>-WHERE status = 'paid'
+WHERE status = 'paid' AND amount IS NOT NULL</code></pre>
<p>Always look at the diff before a commit: you will see whether there is an accidental change or a forgotten test line.</p>
<h3>Which command and when?</h3>
<ul>
<li>You broke a file and have not committed → <code>git restore file</code>.</li>
<li>You added the wrong file to staging → <code>git restore --staged file</code>.</li>
<li>A mistaken commit is already on GitHub → <code>git revert hash</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Show the commit history briefly, so that each commit takes one line.' },
        { prompt: 'Look line by line at the changes that are not yet added to staging.' },
        { prompt: 'You broke the file <code>report.sql</code>, but you have not made a commit yet. Return the file to the state of the last commit.' }
      ]
    },
    'git-4': {
      title: 'Branches: branch, switch, merge',
      body: `
<p>We do a new analysis in a separate branch, and the main branch <code>main</code> stays clean.</p>
<pre><code>git branch                      # list of branches
git switch -c churn-analysis    # create a new branch and switch to it
# ... work, add, commit ...
git switch main                 # go back to main
git merge churn-analysis        # merge the branch into main
git branch -d churn-analysis    # delete the merged branch</code></pre>
<h3>Merge conflict</h3>
<p>If the same line was changed differently in two branches, Git cannot decide by itself. Markers appear in the file:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
WHERE status = 'paid'
=======
WHERE status IN ('paid', 'refund')
&gt;&gt;&gt;&gt;&gt;&gt;&gt; churn-analysis</code></pre>
<p>You keep the correct version by hand and delete the markers, then run <code>git add</code> and <code>git commit</code>.</p>
<div class="tip">In older materials you will see <code>git checkout -b name</code>. It does the same thing as <code>git switch -c name</code>.</div>
<h3>A branch in practice</h3>
<p>You maintain a monthly report that works in <code>main</code>. Your manager asked for a new churn analysis. If you start it in <code>main</code>, unfinished code may break the report. So you create a branch called <code>churn-analysis</code>. If at that time the monthly report urgently needs a fix, you go back with <code>git switch main</code>, fix it, and switch back to your branch.</p>
<h3>Branch names</h3>
<p>Give branches short and meaningful names with hyphens: <code>churn-analysis</code>, <code>fix-refund-filter</code>. It is better not to use spaces or Cyrillic letters: some tools handle them incorrectly.</p>
<h3>How to avoid conflicts</h3>
<ul>
<li>Do not keep branches open for long: merge them every few days.</li>
<li>Before you start working, get the latest version of <code>main</code>.</li>
<li>Agree that two people do not change the same file at the same time.</li>
</ul>`,
      ex: [
        { prompt: 'Create a new branch <code>cohort-report</code> and switch to it right away.' },
        { prompt: 'You are in the branch <code>main</code>. Merge the work from the branch <code>cohort-report</code> into main.' },
        { prompt: 'What should you do when there is a merge conflict?', options: ['Delete the repository and start again', 'Keep the correct version between the markers in the file, delete the markers, then add and commit', 'git push --force', 'Nothing, Git will decide by itself'] }
      ]
    },
    'git-5': {
      title: 'GitHub: clone, push, pull, pull request',
      body: `
<pre><code>git clone https://github.com/user/repo.git   # copy a repository from the cloud
git remote add origin https://github.com/user/repo.git
git push -u origin main                      # send your local commits
git pull                                     # get other people's changes</code></pre>
<h3>Pull request (PR)</h3>
<ol>
<li>You work in a new branch and run <code>git push -u origin my-branch</code>.</li>
<li>On GitHub you open a <b>Pull request</b>: "Please add these changes to main".</li>
<li>A colleague does a <b>code review</b> and leaves comments.</li>
<li>After approval, you <b>Merge</b>.</li>
</ol>
<p><b>Fork</b> is a copy of someone else's repository in your own account (to contribute to open projects).</p>
<h3>Local and cloud repository</h3>
<p> A commit is first saved only on your computer. <code>git push</code> sends it to GitHub, and <code>git pull</code> brings you the commits of others. If you do not push, your colleagues will not see your work, and if your computer breaks, the work is lost.</p>
<h3>What is checked in a code review?</h3>
<ul>
<li>Is the SQL logic correct: filters, JOIN type, grouping?</li>
<li>Do the numbers match the previous reports?</li>
<li>Is the code clear: names, comments?</li>
<li>Did any secret data (a password, personal information) get in by accident?</li>
</ul>
<p>A review is not criticism, but a way to raise quality together. It is normal to ask "why?" in reply to a comment, or to explain your own decision.</p>
<div class="tip">If <code>git push</code> shows an error ("rejected"), most often it means there are new commits on GitHub that you do not have. First run <code>git pull</code>, then push again.</div>`,
      ex: [
        { prompt: 'Copy the repository <code>https://github.com/tolqyn/cafe.git</code> to your computer.' },
        { prompt: 'Push the branch <code>cohort-report</code> to GitHub (<code>origin</code>) for the first time and set up the link to it.' },
        { prompt: 'Your colleagues added new commits to main. Get them onto your computer.' },
        { prompt: 'Why do we need a pull request?', options: ['To download a file', 'To discuss and check the changes (code review) before adding them to the main branch', 'To delete the repository', 'To change a commit message'] }
      ]
    },
    'git-6': {
      title: '.gitignore, README and the portfolio',
      body: `
<h3>.gitignore</h3>
<p>A file that tells Git what <b>not to save</b>:</p>
<pre><code># .gitignore
.env                 # secret keys and passwords
data/raw/*.csv       # large or personal data
__pycache__/
.ipynb_checkpoints/</code></pre>
<div class="tip">If you commit a password or an API key even once, it stays in the history, even if you delete the file later. Change the key immediately.</div>
<h3>An analyst's portfolio repository</h3>
<pre><code>cafe-analysis/
├── README.md          ← the most important file
├── sql/               ← queries
├── notebooks/         ← analysis in pandas
├── dashboard/         ← Power BI screenshots
└── data/              ← small sample data</code></pre>
<p>The structure of a <b>README</b>: business question → data → method → main results (with numbers) → recommendation → how to run it. An employer reads the README first.</p>
<h3>An example of a good README</h3>
<pre><code># Coffee shop network: reallocating the advertising budget

**Result:** customers from the referral channel come back 2 times more often.
I recommend moving 20% of the budget from Instagram to referral.

## Data
Orders for 6 months (2,400 rows), customers (40 rows).

## Method
SQL: cleaning, monthly metrics, channel segments, retention.
Python: ROAS calculation.

## How to run
Run the files from the sql/ folder in order.</code></pre>
<p>The numbers in the example are illustrative. What matters is the structure: the result first, a short method, and the run instructions at the end.</p>
<h3>Data in a repository</h3>
<p>Never put real client data in a public repository. Instead, use a small synthetic or anonymized sample, and say so in the README.</p>`,
      ex: [
        { prompt: 'Which file must never be committed to a repository?', options: ['README.md', 'cleaning.sql', '.env (passwords and API keys)', '.gitignore'], explain: 'Add .env to .gitignore.' },
        { prompt: 'What should be at the very beginning of a portfolio README?', options: ['The full listing of the code', 'The business question and the main result', 'The license', 'The Python version'], explain: 'A reader should understand within 30 seconds what was solved and what was found.' }
      ]
    },
    'git-gate': {
      title: 'Module exam: Git',
      body: `<p>The full workflow: a new branch → commit → GitHub.</p>`,
      ex: [
        { prompt: 'Create a new branch <code>ab-test</code> and switch to it.' },
        { prompt: 'Add all the changed files to staging.' },
        { prompt: 'Make a commit with the message "A/B тест нәтижесін қостым" ("Added the A/B test result"). Write the message exactly like this, in Kazakh.' },
        { prompt: 'Push the branch to GitHub (<code>origin</code>) for the first time.' },
        { prompt: 'The difference between <code>git add</code> and <code>git commit</code>:', options: ['There is no difference', 'add prepares the change for the next commit (staging), commit saves it to the history', 'add sends it to GitHub', 'commit deletes a file'] }
      ]
    }
  }
});
