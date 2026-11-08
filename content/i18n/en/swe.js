// M6.1 Software Eng for Data and M6.2 Deployment: English text. Code, solutions and expected output are in content/swe.js.
DJ.i18n.patch({
  modules: {
    'm6-1': { intro: 'You will learn to turn notebook code into Python code that others can use, that is tested and works without errors: functions, classes, type hints, tests, logging, venv and REST API basics.' },
    'm6-2': { intro: 'You will turn a trained model into a service that others can use: saving the model, validating input, FastAPI and Pydantic, Docker, config, cloud deployment and speed.' }
  },
  lessons: {
    'swe-1': {
      title: 'Functions and modules',
      body: `
<p>Notebook work usually grows like this: in one cell you clean a price, a month later you copy that code and apply it to another file, then once more. If a bug is fixed in one of the three copies, it stays in the other two. A <b>function</b> solves this: the logic is written in one place, it has a name, and its input and output are clear.</p>
<h3>Signs of a good function</h3>
<ul>
<li><b>One job</b>: <code>parse_price</code> only turns a price into a number; it does not read files or draw charts.</li>
<li><b>Returns its result with <code>return</code></b>, not with <code>print</code>. Other code cannot use what print shows.</li>
<li><b>A clear name</b>: verb + noun (<code>load_orders</code>, <code>clean_phone</code>).</li>
<li><b>A docstring</b>: one line explaining what it does.</li>
<li><b>Default values</b>: give a value to a parameter that is often the same: <code>city='Алматы'</code>.</li>
</ul>
<h3>Example: a Kaspi-style shop export</h3>
<p>In the export the price arrives as text: <code>"12 500 ₸"</code>. A function that turns it into a number:</p>
<pre><code>def parse_price(text):
    """Turns text like '12 500 ₸' into a whole number (tenge)."""
    digits = text.replace('₸', '').replace(' ', '').strip()
    return int(digits)

parse_price('12 500 ₸')   # 12500
parse_price('990₸')       # 990</code></pre>
<h3>What a module is</h3>
<p>When you have many functions, you move them into a <b>module</b>, which is just a <code>.py</code> file. For example, <code>parse_price</code> lives in <code>cleaning.py</code>, and a notebook or another script imports it:</p>
<pre><code># cleaning.py
def parse_price(text):
    ...

if __name__ == '__main__':
    # runs only when the file is run directly: python cleaning.py
    print(parse_price('12 500 ₸'))

# report.py
from cleaning import parse_price</code></pre>
<p>The <code>if __name__ == '__main__':</code> block <b>does not run</b> when the file is imported. That is why a module's test code goes into that block; otherwise it would run on every import.</p>
<div class="tip">Rule: if you want to copy the same code a second time, it is time to turn it into a function.</div>`,
      ex: [
        { prompt: 'Write the function <code>parse_price(text)</code>: <code>"12 500 ₸"</code> → <code>12500</code>, <code>"990₸"</code> → <code>990</code>, <code>" 3 490 ₸ "</code> → <code>3490</code>. The result must be an <code>int</code> and be returned with <code>return</code>.', starter: String.raw`def parse_price(text):
    # remove the ₸ sign and the spaces, then convert to int
    pass
`, hints: ['<code>text.replace(\'₸\', \'\')</code> removes the sign, <code>.replace(\' \', \'\')</code> removes the spaces.', 'Finish with <code>return int(digits)</code>.'], check: { tests: String.raw`assert parse_price('12 500 ₸') == 12500, 'parse_price("12 500 ₸") should return 12500'
assert parse_price('990₸') == 990, 'parse_price("990₸") should return 990'
assert parse_price(' 3 490 ₸ ') == 3490, 'Remove the spaces at the edges too'
assert isinstance(parse_price('100 ₸'), int), 'The result should be an int'` } },
        { prompt: 'Write the function <code>city_revenue(orders, city=\'Алматы\')</code>: <code>orders</code> is a list of dictionaries (<code>city</code>, <code>amount</code>), and the function returns the sum of <code>amount</code> for the given city. If no city is given, Almaty (Алматы) is used.', hints: ['A default parameter value: <code>def city_revenue(orders, city=\'Алматы\'):</code>', 'In the loop, add <code>total += o[\'amount\']</code> only when <code>if o[\'city\'] == city:</code>.'], check: { tests: String.raw`_o = [{'city': 'Алматы', 'amount': 100}, {'city': 'Астана', 'amount': 40}, {'city': 'Алматы', 'amount': 1}]
assert city_revenue(_o) == 101, 'If no city is given, the sum for Алматы is needed (the default value of city)'
assert city_revenue(_o, 'Астана') == 40, 'With city="Астана", only Астана orders are added'
assert city_revenue(_o, 'Орал') == 0, 'For a city with no orders, 0'` } },
        { prompt: 'At the end of <code>cleaning.py</code> there is an <code>if __name__ == \'__main__\':</code> block. Another file has <code>from cleaning import parse_price</code>. What happens to the code inside that block?', options: ['It runs once during the import', 'It does not run: it works only when the file is run directly with <code>python cleaning.py</code>', 'The import fails with an error', 'It runs every time <code>parse_price</code> is called'], explain: 'On import, <code>__name__</code> is <code>"cleaning"</code>; when the file is run directly, it is <code>"__main__"</code>. So the block runs only on a direct run.' }
      ]
    },
    'swe-2': {
      title: 'Type hints: writing types in code',
      body: `
<p><b>Type hints</b> (type annotations) show what data a function expects and what it returns. Python does not check them at run time, but they help in three places: the person reading the code (as documentation), the editor (autocomplete and warnings) and checking tools such as <b>mypy</b>.</p>
<h3>Syntax</h3>
<pre><code>def average_check(amounts: list[float]) -> float:
    if not amounts:
        return 0.0
    return sum(amounts) / len(amounts)

def find_customer(customers: dict[str, str], phone: str) -> str | None:
    return customers.get(phone)   # None if not found</code></pre>
<table>
<tr><th>Notation</th><th>Meaning</th></tr>
<tr><td><code>x: int</code></td><td>whole number</td></tr>
<tr><td><code>list[float]</code></td><td>a list of floats</td></tr>
<tr><td><code>dict[str, int]</code></td><td>a dictionary with str keys and int values</td></tr>
<tr><td><code>str | None</code></td><td>text or None (older form <code>Optional[str]</code>)</td></tr>
<tr><td><code>-> None</code></td><td>the function returns nothing</td></tr>
<tr><td><code>pd.DataFrame</code></td><td>a pandas table</td></tr>
</table>
<h3>Hints do not check, mypy does</h3>
<pre><code>average_check('500')   # Python does not check the hint, the error only appears inside the function
$ mypy report.py
report.py:12: error: Argument 1 to "average_check" has incompatible type "str"; expected "list[float]"</code></pre>
<p>Teams add mypy to CI: type errors are found before the code is merged. In data-processing code this is very useful: the question "does this function take a DataFrame or a list?" goes away on its own.</p>
<h3>Where to see annotations</h3>
<p>A function's <code>__annotations__</code> attribute stores the hints as a dictionary:</p>
<pre><code>average_check.__annotations__
# {'amounts': list[float], 'return': &lt;class 'float'&gt;}</code></pre>
<div class="tip">Write hints first for the functions others call (the module's "API"). They are not required for internal temporary variables.</div>`,
      ex: [
        { prompt: 'Add type hints to <code>average_check</code>: the parameter <code>amounts</code> is <code>list[float]</code>, the return type is <code>float</code>. For an empty list it should return <code>0.0</code>.', hints: ['After the parameter write <code>: list[float]</code>, after the parentheses <code>-> float</code>.', 'Check for an empty list with <code>if not amounts: return 0.0</code>.'], check: { tests: String.raw`_a = average_check.__annotations__
assert _a.get('amounts') == list[float], 'The hint for amounts should be list[float]'
assert _a.get('return') is float, 'Return hint: -> float'
assert average_check([]) == 0.0, 'Return 0.0 for an empty list (no division by zero)'
assert average_check([1000.0, 3000.0]) == 2000.0, 'The average should be computed correctly'` } },
        { prompt: 'Write <code>find_customer(customers, phone)</code> with hints: <code>customers: dict[str, str]</code> (phone → name), <code>phone: str</code>, return type <code>str | None</code>. If the phone is not found, return <code>None</code>.', hints: ['<code>customers.get(phone)</code> returns <code>None</code> when the key is missing.', 'Return hint: <code>-> str | None</code>.'], check: { tests: String.raw`import typing as _t
_a = find_customer.__annotations__
assert _a.get('customers') == dict[str, str], 'Hint for customers: dict[str, str]'
assert _a.get('phone') is str, 'Hint for phone: str'
assert set(_t.get_args(_a.get('return'))) == {str, type(None)}, 'Return hint: str | None'
assert find_customer({'7701': 'Ерлан'}, '7701') == 'Ерлан', 'Return the name of the customer found'
assert find_customer({'7701': 'Ерлан'}, '7777') is None, 'If not found, return None, not a KeyError'` } },
        { prompt: 'The function <code>def total(x: list[int]) -> int</code> was called as <code>total("abc")</code>. What happens?', options: ['Python raises a TypeError right away, because the hint requires a list', 'Python does not check hints: the code runs (if there is an error, it comes from inside the function); mypy flags this call in advance', 'The hint automatically turns the text into a list', 'The function always returns 0'], explain: 'Type hints are not checked at run time. They are used by static checkers such as mypy or by libraries such as Pydantic.' }
      ]
    },
    'swe-3': {
      title: 'OOP: pipeline and model wrapper classes',
      body: `
<p>A function keeps no state: you call it and get a result. But sometimes an object has to <b>remember</b> something. Take scaling: min and max are computed once from the train data, then applied with <b>the same</b> values to all new data. For this we use a <b>class</b>: data (attributes) and actions (methods) live in one place.</p>
<h3>Key words</h3>
<ul>
<li><code>class</code> is a template (blueprint). An <b>object</b> (instance) is a concrete copy made from that template.</li>
<li><code>__init__</code> is the method called when an object is created; it stores the initial settings.</li>
<li><code>self</code> is the object itself. <code>self.min_</code> is an attribute of the object.</li>
<li>A <b>method</b> is a function inside a class: <code>scaler.fit(...)</code>.</li>
</ul>
<h3>Example: a scikit-learn-style transformer</h3>
<pre><code>class RangeScaler:
    def fit(self, values):
        self.min_ = min(values)
        self.max_ = max(values)
        return self            # for the fit(...).transform(...) chain

    def transform(self, values):
        span = self.max_ - self.min_
        return [(v - self.min_) / span for v in values]

scaler = RangeScaler().fit([100, 300, 500])   # train
scaler.transform([200, 500])                  # [0.25, 1.0]</code></pre>
<p>Every transformer in sklearn follows this convention: <code>fit</code> learns the parameters (their names end in <code>_</code>), <code>transform</code> applies them. Thanks to this, processing train and test separately is easy.</p>
<h3>Model wrapper</h3>
<p>In production a model comes with a lot of extra logic: feature order, threshold, version. We wrap all of it in one class:</p>
<pre><code>class ChurnModel:
    def __init__(self, features, threshold=0.5):
        self.features = features
        self.threshold = threshold
        self.model = LogisticRegression()

    def fit(self, df, target):
        self.model.fit(df[self.features], df[target])
        return self

    def predict_one(self, customer: dict) -> float:
        row = pd.DataFrame([customer])[self.features]
        return float(self.model.predict_proba(row)[0, 1])</code></pre>
<p>The API or notebook no longer needs to know the feature order: it just calls <code>predict_one({...})</code>. If a feature is added, only the class changes.</p>
<div class="tip">To store settings, <code>@dataclass</code> is handy: Python writes <code>__init__</code> for you. Inheritance is rarely needed in data work: start with a simple class and composition.</div>`,
      ex: [
        { prompt: 'Write the <code>RangeScaler</code> class: <code>fit(values)</code> stores <code>self.min_</code> and <code>self.max_</code> and returns <code>self</code>; <code>transform(values)</code> returns a list where each value becomes <code>(v - min_) / (max_ - min_)</code>.', hints: ['Inside <code>fit</code>: <code>self.min_ = min(values)</code>, <code>self.max_ = max(values)</code>, and at the end <code>return self</code>.', '<code>transform</code>: <code>[(v - self.min_) / (self.max_ - self.min_) for v in values]</code>.'], check: { tests: String.raw`_s = RangeScaler()
assert _s.fit([10, 20, 30]) is _s, 'fit() should return self'
assert _s.min_ == 10 and _s.max_ == 30, 'fit() should store the min_ and max_ attributes'
assert _s.transform([10, 20, 30]) == [0.0, 0.5, 1.0], 'transform([10, 20, 30]) → [0.0, 0.5, 1.0]'
assert _s.transform([40]) == [1.5], 'transform uses the min/max from train (it does not recompute them from new data)'` } },
        { prompt: 'Finish the <code>ChurnModel</code> wrapper: <code>__init__</code> stores <code>features</code> and <code>threshold</code> and creates <code>LogisticRegression()</code>; <code>fit(df, target)</code> trains the model only on the <code>self.features</code> columns and returns <code>self</code>; <code>predict_one(customer)</code> returns the churn probability as a <code>float</code>; <code>is_risky(customer)</code> returns <code>True</code> if the probability is greater than or equal to the threshold. At the end: <code>cm = ChurnModel(FEATURES, threshold=0.5).fit(data, \'churned\')</code>.', hints: ['<code>predict_one</code>: <code>pd.DataFrame([customer])[self.features]</code> drops extra keys (such as city) and keeps the order.', '<code>self.model.predict_proba(row)[0, 1]</code> is the probability of class 1 (churns). End <code>fit</code> with <code>return self</code>.'], check: { tests: String.raw`assert isinstance(cm, ChurnModel), 'It should be cm = ChurnModel(...).fit(...): make fit() return self'
assert cm.features == FEATURES and cm.threshold == 0.5, '__init__ should store features and threshold'
assert hasattr(cm.model, 'coef_') and cm.model.n_features_in_ == 2, 'The model should be trained only on the features columns (2 features)'
_hi = cm.predict_one({'support_calls': 6, 'tenure_months': 1, 'city': 'Астана'})
_lo = cm.predict_one({'tenure_months': 50, 'support_calls': 0})
assert isinstance(_hi, float) and 0 <= _hi <= 1, 'predict_one should return a float between 0 and 1'
assert _hi > 0.5 > _lo, 'A new subscriber with many complaints should get a higher probability'
assert cm.is_risky({'tenure_months': 1, 'support_calls': 6}) is True and cm.is_risky({'tenure_months': 50, 'support_calls': 0}) is False, 'is_risky compares the probability with threshold'
_strict = ChurnModel(FEATURES, threshold=0.999).fit(data, 'churned')
assert _strict.is_risky({'tenure_months': 3, 'support_calls': 4}) is False, 'is_risky should use self.threshold'` } },
        { prompt: 'Why are <code>fit</code> and <code>transform</code> separate methods in a transformer?', options: ['Python does not allow two actions in one method', 'To learn the parameters (min, max) once, from train data only, and apply the same values to test and new data: otherwise there is leakage and the scale changes every time', 'Only to make the code run faster', 'transform always calls fit again internally'], explain: 'fit = learn (train only), transform = apply (any data). Refitting on test is leakage, and in production the scale would differ for every request.' }
      ]
    },
    'swe-4': {
      title: 'Testing: assert and pytest',
      body: `
<p>A test is a small function that checks <b>automatically</b> that your code works correctly. Today <code>parse_price</code> is correct, but tomorrow a colleague may "improve" it and break the <code>"990₸"</code> format. A test catches this before the merge. In data teams, tests are written especially for cleaning functions, feature calculations and API input and output.</p>
<h3>assert: the simplest test</h3>
<pre><code>def test_parse_price():
    assert parse_price('12 500 ₸') == 12500
    assert parse_price('990₸') == 990
    assert parse_price('0 ₸') == 0</code></pre>
<p><code>assert condition</code> raises an <code>AssertionError</code> if the condition is false. A test function returns nothing: if no error is raised, the test passed.</p>
<h3>pytest</h3>
<p><b>pytest</b> is the standard testing tool in Python. It finds functions starting with <code>test_</code> in <code>test_*.py</code> files on its own and runs them:</p>
<pre><code># tests/test_cleaning.py
import pytest
from cleaning import parse_price, apply_discount

@pytest.mark.parametrize('text, expected', [
    ('12 500 ₸', 12500),
    ('990₸', 990),
    ('0 ₸', 0),
])
def test_parse_price(text, expected):
    assert parse_price(text) == expected

def test_discount_rejects_bad_percent():
    with pytest.raises(ValueError):
        apply_discount(1000, 150)

@pytest.fixture
def orders():
    return [{'city': 'Алматы', 'amount': 100}, {'city': 'Астана', 'amount': 40}]

def test_city_revenue(orders):        # the fixture arrives as a parameter by its name
    assert city_revenue(orders, 'Астана') == 40

$ pytest -q
.....                                  [100%]
5 passed in 0.04s</code></pre>
<ul>
<li><code>parametrize</code> repeats one test with several inputs.</li>
<li><code>pytest.raises</code> checks that a function <b>must raise</b> an error.</li>
<li><code>fixture</code> is ready-made data shared by several tests.</li>
</ul>
<h3>What to test</h3>
<ol>
<li><b>The normal case</b>: typical input.</li>
<li><b>Edge cases</b>: an empty list, 0, one element, a format without a space.</li>
<li><b>Bad input</b>: the function should stop with a clear error.</li>
</ol>
<div class="tip">A good test <b>catches broken code</b>. To check: break the function on purpose. If the test still passes, it tests nothing. The exercises below are checked exactly like this: your test must fail on broken versions.</div>`,
      ex: [
        { prompt: 'Write the test function <code>test_parse_price()</code>. It should check at least three cases: <code>"12 500 ₸"</code> → 12500, <code>"990₸"</code> → 990, <code>"0 ₸"</code> → 0. With the correct function the test should pass, and with broken versions it should raise <code>AssertionError</code>.', starter: String.raw`def parse_price(text):
    return int(text.replace('₸', '').replace(' ', '').strip())

def test_parse_price():
    # write the asserts here
    pass

test_parse_price()
print('тест өтті')
`, hints: ['One line per case: <code>assert parse_price(\'12 500 ₸\') == 12500</code>.', 'Do not forget the <code>"990₸"</code> case without a space: some broken versions fail only there.'], check: { tests: String.raw`_ok = parse_price
test_parse_price()
def _catches(_bad):
    global parse_price
    parse_price = _bad
    try:
        test_parse_price()
        return False
    except Exception:
        return True
    finally:
        parse_price = _ok
assert _catches(lambda t: int(t.replace('₸', '').strip().split(' ')[0])), 'Your test does not check "12 500 ₸": a broken version that takes only the first part passed'
assert _catches(lambda t: int(t[:-2].replace(' ', ''))), 'Your test does not check "990₸" (no space)'
assert _catches(lambda t: int(t.replace('₸', '').replace(' ', '')) or None), 'Your test does not check "0 ₸"'` } },
        { prompt: 'Write <code>test_apply_discount()</code> for <code>apply_discount(price, percent)</code>: (1) a 10% discount on 10 000 ₸ → 9000; (2) 0% → the price does not change; (3) with <code>percent=150</code> the function must raise <code>ValueError</code> (there is no pytest, so use <code>try/except</code>).', hints: ['Pattern for checking an error: <code>try: apply_discount(1000, 150)</code>, <code>except ValueError: pass</code>, <code>else: raise AssertionError(...)</code>.', 'The <code>else</code> block runs only if <b>no</b> error was raised: exactly the case where the test must fail.'], check: { tests: String.raw`_ok = apply_discount
test_apply_discount()
def _catches(_bad):
    global apply_discount
    apply_discount = _bad
    try:
        test_apply_discount()
        return False
    except Exception:
        return True
    finally:
        apply_discount = _ok
def _valid(pc):
    if not 0 <= pc <= 100:
        raise ValueError('bad percent')
def _b1(p, pc):
    return p * (100 - pc) / 100
def _b2(p, pc):
    _valid(pc)
    return p * 0.9 if pc == 0 else p * (100 - pc) / 100
def _b3(p, pc):
    _valid(pc)
    return p * pc / 100
assert _catches(_b1), 'Your test does not catch percent=150: a version without ValueError passed'
assert _catches(_b2), 'Your test does not check the 0% case'
assert _catches(_b3), 'Your test does not check the discount formula (10000, 10 → 9000)'` } },
        { prompt: 'Which function will pytest find as a test and run?', options: ['<code>check_price()</code> in <code>cleaning.py</code>', '<code>test_parse_price()</code> in <code>tests/test_cleaning.py</code>', '<code>parse_price_test()</code> in <code>tests/cleaning_tests.py</code>', 'Any function with an <code>assert</code> in any file'], explain: 'The default rule: the file name is <code>test_*.py</code> (or <code>*_test.py</code>), and the function name starts with <code>test_</code>.' },
        { prompt: 'You have a test, but even when you break the function on purpose, the test still passes. What does that mean?', options: ['The function is very reliable', 'The test checks nothing: it needs asserts that fail when the function is broken', 'pytest is installed incorrectly', 'The test should be deleted, it is unnecessary'], explain: 'The purpose of a test is to catch errors. A test that does not fail on broken code gives false confidence.' }
      ]
    },
    'swe-5': {
      title: 'Error handling and logging',
      body: `
<p>Real data always has bad rows: "—" instead of an amount, a negative number, an empty cell. In such cases code either <b>crashes the whole pipeline</b> or (even worse) lets the bad value through <b>silently</b>. The right approach: detect the error at a specific place, raise it with a clear message, handle it at the top level and write it to a log.</p>
<h3>try / except / raise</h3>
<pre><code>def parse_amount(value):
    amount = float(value)                    # for 'abc' it raises ValueError itself
    if amount &lt; 0:
        raise ValueError(f'Amount must not be negative: {amount}')
    return amount

try:
    parse_amount('-500')
except ValueError as e:
    print('Bad row:', e)</code></pre>
<ul>
<li>Catch a <b>specific error</b>: <code>except ValueError</code>. A bare <code>except:</code> hides everything, even bugs in the code.</li>
<li><code>else</code> runs if no error occurred, <code>finally</code> always runs (closing a file, dropping a connection).</li>
<li>You can create your own error as a class: <code>class DataQualityError(Exception): pass</code>.</li>
</ul>
<h3>Why logging, not print</h3>
<p><code>print</code> gets lost on a server and has no level and no time. The <b>logging</b> module adds a level, time and source to each message, and where it goes (console, file, a cloud log system) can be configured without changing the code.</p>
<table>
<tr><th>Level</th><th>When</th></tr>
<tr><td>DEBUG</td><td>details during development</td></tr>
<tr><td>INFO</td><td>a normal event: "2 400 rows loaded"</td></tr>
<tr><td>WARNING</td><td>suspicious, but work continues: "row skipped"</td></tr>
<tr><td>ERROR</td><td>an operation failed: "could not open the file"</td></tr>
<tr><td>CRITICAL</td><td>the whole service stopped</td></tr>
</table>
<pre><code>import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s: %(message)s')
logger = logging.getLogger('orders')

logger.info('Loading started')
logger.warning('Row skipped: %s', row)</code></pre>
<p>Each module gets its own logger with <code>logging.getLogger(__name__)</code>, so the log shows which file a message came from.</p>
<div class="tip">A common pipeline rule: an error in a single row → WARNING and skip the row; if more than 5% of all rows are bad → ERROR and stop. Never skip silently.</div>`,
      ex: [
        { prompt: 'Write <code>parse_amount(value)</code>: it converts the value to <code>float</code>; for empty text or text that is not a number, <code>ValueError</code>; for a negative number, <code>ValueError</code> (the message must contain the word "теріс" (negative)).', hints: ['<code>float(\'\')</code> and <code>float(\'abc\')</code> raise ValueError themselves.', 'For a negative value: <code>if amount < 0: raise ValueError(\'Сома теріс болмауы керек\')</code>.'], check: { tests: String.raw`assert parse_amount('12500') == 12500.0 and parse_amount(300) == 300.0, 'Normal values should be converted to float'
assert parse_amount('0') == 0.0, '0 is a valid amount'
for _v in ['', 'abc', '-500']:
    try:
        parse_amount(_v)
    except ValueError as _e:
        if _v == '-500':
            assert 'теріс' in str(_e), 'The message for a negative amount should contain the word "теріс"'
    else:
        raise AssertionError(f'parse_amount({_v!r}) ValueError лақтыруы керек')` } },
        { prompt: 'Write <code>load_orders(rows)</code>: it checks each row\'s <code>amount</code> with <code>parse_amount</code>. Good rows (a copy with amount converted to float) go to the <code>good</code> list; on a bad row it writes <code>logger.warning(...)</code> and skips it. It returns <code>(good, bad_count)</code>.', hints: ['Inside the loop: <code>try: amount = parse_amount(r[\'amount\'])</code>, <code>except ValueError as e:</code> → increase the counter, <code>logger.warning(...)</code>, <code>continue</code>.', 'Add a copy of the good row: <code>good.append(dict(r, amount=amount))</code>.'], check: { tests: String.raw`import logging as _lg
class _H(_lg.Handler):
    def __init__(self):
        super().__init__()
        self.records = []
    def emit(self, record):
        self.records.append(record)
_h = _H()
_lg.getLogger('orders').addHandler(_h)
_rows = [{'order_id': 1, 'amount': '5000'}, {'order_id': 2, 'amount': '—'}, {'order_id': 3, 'amount': '-10'}, {'order_id': 4, 'amount': '250.5'}]
_good, _bad = load_orders(_rows)
_lg.getLogger('orders').removeHandler(_h)
assert _bad == 2, f'There should be two bad rows, you have {_bad}'
assert [g['order_id'] for g in _good] == [1, 4], 'Only rows 1 and 4 should stay in good'
assert _good[1]['amount'] == 250.5, 'In good, amount should be converted to float'
assert _rows[3]['amount'] == '250.5', 'Do not change the input rows: make a copy with dict(r, amount=...)'
assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 2, 'logger.warning should be called once for each bad row'` } },
        { prompt: 'A nightly pipeline skipped 3 of 50 000 rows because of a broken date format; the rest loaded successfully. At what level do you log this event?', options: ['DEBUG', 'WARNING', 'CRITICAL', 'None, there is no need to log it'], explain: 'Work continued, but there is something to pay attention to: that is WARNING. CRITICAL is for when the whole service stops, and skipping silently hides data quality problems.' }
      ]
    },
    'swe-6': {
      title: 'Virtual environments and requirements.txt',
      body: `
<p>Your laptop has pandas 2.2, your colleague has 1.5, and the server has none at all. Code that works in one project crashes in another. A <b>virtual environment</b> (venv) is a separate Python "box" for each project: libraries installed in it do not affect other projects.</p>
<h3>Main commands</h3>
<pre><code>python -m venv .venv              # once, in the project folder
source .venv/bin/activate         # macOS / Linux
.venv\\Scripts\\activate            # Windows
pip install pandas scikit-learn   # installed only inside this .venv
pip freeze > requirements.txt     # write the exact versions to a file
deactivate                        # leave</code></pre>
<p>A new person (or a server) rebuilds the project like this:</p>
<pre><code>git clone ... && cd churn-api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt</code></pre>
<h3>requirements.txt</h3>
<pre><code># API dependencies
pandas==2.2.3
scikit-learn==1.6.1
fastapi==0.115.0
numpy>=1.26</code></pre>
<ul>
<li><code>==</code> <b>pins</b> the version. Required for production and models: a model saved with pickle may not open in another version of sklearn.</li>
<li><code>>=</code> is a minimum version. Handy when writing a library, but tomorrow a different version may get installed.</li>
<li>The <code>.venv</code> folder is <b>not</b> put in git: add it to <code>.gitignore</code>. Only requirements.txt lives in git.</li>
</ul>
<h3>Project structure</h3>
<pre><code>churn-api/
├── .venv/              (not in git)
├── src/churn/          modules: cleaning.py, model.py, api.py
├── tests/              test_cleaning.py, test_api.py
├── notebooks/          exploration notebooks
├── requirements.txt
└── README.md</code></pre>
<div class="tip">Alternatives: <b>conda</b> (if you need libraries outside Python), <b>poetry</b> and <b>uv</b> (manage dependencies with a lock file; uv is very fast). The idea is the same in all of them: a separate environment per project and a list with pinned versions.</div>`,
      ex: [
        { prompt: 'Write <code>parse_requirements(text)</code>: it returns a <code>{library: version}</code> dictionary from requirements.txt text. Lines pinned with <code>==</code> get their version; other lines (<code>>=</code> or no version) get <code>None</code>. Empty lines and <code>#</code> comments (including at the end of a line) are ignored.', hints: ['First cut the comment off each line: <code>line.split(\'#\')[0].strip()</code>; if it is empty, <code>continue</code>.', 'If there is no <code>==</code>, take the name with <code>line.split(\'>=\')[0].strip()</code> and set the value to <code>None</code>.'], check: { tests: String.raw`_r = parse_requirements(req)
assert _r == {'pandas': '2.2.3', 'scikit-learn': '1.6.1', 'numpy': None, 'joblib': None}, f'Wrong result: {_r}'
assert parse_requirements('# тек түсініктеме\n\n') == {}, 'Empty lines and comments should be ignored'
assert parse_requirements('fastapi==0.115.0  # API') == {'fastapi': '0.115.0'}, 'Remove the comment at the end of the line and the spaces'` } },
        { prompt: 'Should the <code>.venv</code> folder be added to the git repository?', options: ['Yes, then colleagues do not have to install anything', 'No: it is large and depends on the operating system. requirements.txt goes into git, and .venv is added to .gitignore', 'Only on Windows', 'Only if pandas is installed'], explain: 'Each person rebuilds .venv on their own computer with <code>pip install -r requirements.txt</code>.' },
        { prompt: 'The churn model was saved with <code>joblib</code> in scikit-learn 1.6.1. How should sklearn be written in the API\'s requirements.txt?', options: ['<code>scikit-learn</code> (no version, let the newest be installed)', '<code>scikit-learn>=1.0</code>', '<code>scikit-learn==1.6.1</code>', 'Do not write it at all, it comes with pandas'], explain: 'A saved model must be opened with the version that created it. If you do not pin the version, the next deploy may install a newer sklearn and the model may fail to load.' }
      ]
    },
    'swe-7': {
      title: 'Clean code: splitting a notebook into functions',
      body: `
<p>During exploration a notebook is a great tool. But when it turns into a daily report or an API, "notebook habits" get expensive. The most common signs (<b>code smells</b>):</p>
<ul>
<li><b>Copied blocks</b>: three identical loops for three cities.</li>
<li><b>Magic numbers</b>: <code>/ 1.12</code>: only the author knows this is VAT.</li>
<li><b>Meaningless names</b>: <code>df2</code>, <code>a</code>, <code>tmp_final_v3</code>.</li>
<li><b>Global state</b>: variables that depend on the order in which cells were run.</li>
<li><b>A long cell</b>: reading, cleaning, calculating and plotting, all in one place.</li>
</ul>
<h3>Refactoring steps</h3>
<ol>
<li>Move magic numbers into <b>constants</b>: <code>VAT_RATE = 0.12</code>.</li>
<li>Turn repeated logic into a <b>function with a parameter</b>.</li>
<li>Split the pipeline into steps: <code>load → clean → transform → report</code>, each one a separate function.</li>
<li>Keep functions <b>pure</b> where you can: they depend only on their input and do not change outside variables. They are easy to test.</li>
<li>A <code>main()</code> function ties everything together.</li>
</ol>
<h3>Before and after</h3>
<pre><code># Before
a = 0
for o in orders:
    if o['city'] == 'Алматы':
        a = a + o['gross'] / 1.12
b = 0
for o in orders:
    if o['city'] == 'Астана':
        b = b + o['gross'] / 1.12

# After
VAT_RATE = 0.12

def net_amount(gross: float) -> float:
    """Amount without VAT."""
    return gross / (1 + VAT_RATE)

def revenue_by_city(orders: list[dict]) -> dict[str, float]:
    result = {}
    for o in orders:
        result[o['city']] = result.get(o['city'], 0) + net_amount(o['gross'])
    return result</code></pre>
<p>The new version works for any city (if Oral is added, the code does not change), a VAT change is fixed in one place, and <code>net_amount</code> and <code>revenue_by_city</code> can each get their own tests.</p>
<div class="tip">Refactoring means improving the structure <b>without changing</b> the behavior. First save the output of the old code, then after refactoring check that the new code gives the same output.</div>`,
      ex: [
        { prompt: 'Refactor the code from the notebook: a constant <code>VAT_RATE = 0.12</code>; <code>net_amount(gross)</code>, the amount without VAT (it must use <code>VAT_RATE</code>); <code>revenue_by_city(orders)</code>, a dictionary of revenue without VAT for all cities (no city names written in the code); <code>top_city(orders)</code>, the city with the highest revenue.', hints: ['<code>result[o[\'city\']] = result.get(o[\'city\'], 0) + net_amount(o[\'gross\'])</code> works for any city.', 'The key with the largest value: <code>max(revenue, key=revenue.get)</code>.'], check: { tests: String.raw`assert VAT_RATE == 0.12, 'Define the constant VAT_RATE = 0.12'
assert abs(net_amount(1120) - 1000) < 1e-6, 'net_amount(1120) should be ≈ 1000'
VAT_RATE = 0.0
_n = net_amount(500)
VAT_RATE = 0.12
assert _n == 500, 'net_amount should use the VAT_RATE constant, not the number 1.12'
_o = [{'city': 'Орал', 'gross': 1120}, {'city': 'Ақтөбе', 'gross': 2240}, {'city': 'Орал', 'gross': 1120}]
_r = revenue_by_city(_o)
assert set(_r) == {'Орал', 'Ақтөбе'}, 'revenue_by_city should work with any city in the data (do not hard-code names)'
assert abs(_r['Орал'] - 2000) < 1e-6 and abs(_r['Ақтөбе'] - 2000) < 1e-6, 'The amounts without VAT per city are wrong'
assert top_city(orders) == 'Алматы', 'top_city(orders) should be Алматы'
assert top_city([{'city': 'Орал', 'gross': 10}, {'city': 'Ақтөбе', 'gross': 20}]) == 'Ақтөбе', 'top_city should return the city with the highest revenue'` } },
        { prompt: 'The cleaning steps are ready as separate functions. Write <code>run_pipeline(data, steps)</code>: it applies the functions in the <code>steps</code> list in order and returns the result. Then <code>clean = run_pipeline(raw, [strip_spaces, drop_empty, unique])</code>.', hints: ['A function is a value too: you can put it in a list and call it in a loop.', '<code>for step in steps: data = step(data)</code>, then <code>return data</code>.'], check: { tests: String.raw`assert clean == ['Алматы', 'Астана', 'Шымкент'], f'clean is wrong: {clean}'
assert run_pipeline([1, 2], []) == [1, 2], 'With no steps, the data does not change'
assert run_pipeline(3, [lambda x: x + 1, lambda x: x * 10]) == 40, 'The steps should be applied in the given order'` } },
        { prompt: 'Which name is best for a function?', options: ['<code>process(df)</code>', '<code>do_stuff2(df)</code>', '<code>drop_test_orders(df)</code>', '<code>f(df)</code>'], explain: 'The name says exactly what is done: it removes test orders. <code>process</code> and <code>f</code> explain nothing.' }
      ]
    },
    'swe-8': {
      title: 'REST API basics: HTTP and JSON',
      body: `
<p>When a model or a report is needed by other systems (a website, a mobile app, a CRM), we provide it through an <b>API</b>. The most common style is <b>REST</b>: the client sends an HTTP request, and the server returns a JSON response.</p>
<h3>Parts of an HTTP request</h3>
<pre><code>POST /predict HTTP/1.1                     ← method + path
Host: api.dalamobile.kz
Content-Type: application/json            ← header
Authorization: Bearer abc123

{"tenure_months": 3, "support_calls": 5}  ← body (JSON)</code></pre>
<pre><code>HTTP/1.1 200 OK                            ← status code
Content-Type: application/json

{"churn_probability": 0.81, "label": 1}</code></pre>
<h3>Methods</h3>
<table>
<tr><th>Method</th><th>Meaning</th><th>Example</th></tr>
<tr><td>GET</td><td>read, changes nothing</td><td><code>GET /products/42</code></td></tr>
<tr><td>POST</td><td>create something new or compute</td><td><code>POST /products</code>, <code>POST /predict</code></td></tr>
<tr><td>PUT / PATCH</td><td>full / partial update</td><td><code>PATCH /products/42</code></td></tr>
<tr><td>DELETE</td><td>delete</td><td><code>DELETE /products/42</code></td></tr>
</table>
<p>GET, PUT and DELETE are <b>idempotent</b>: sending the same request twice gives the same result as sending it once. POST is usually not idempotent: send it twice and two products are created.</p>
<h3>Status codes</h3>
<table>
<tr><th>Code</th><th>Meaning</th></tr>
<tr><td>200 OK / 201 Created</td><td>success / a new resource was created</td></tr>
<tr><td>400 Bad Request</td><td>the request is malformed (for example, broken JSON)</td></tr>
<tr><td>401 / 403</td><td>unknown who you are / no permission</td></tr>
<tr><td>404 Not Found</td><td>no such resource</td></tr>
<tr><td>405 Method Not Allowed</td><td>the path exists, but this method is not supported</td></tr>
<tr><td>422 Unprocessable</td><td>the JSON is valid, but the values failed validation</td></tr>
<tr><td>500 / 503</td><td>internal server error / service temporarily unavailable</td></tr>
</table>
<p>Rule: <b>4xx is the client's error</b>, <b>5xx is the server's error</b>.</p>
<h3>JSON and a client in Python</h3>
<pre><code>import json
body = json.dumps({'city': 'Алматы'}, ensure_ascii=False)   # dict → str
data = json.loads('{"price": 15990}')                         # str → dict

import requests                                               # client side
r = requests.post('https://api.example.kz/predict', json={'tenure_months': 3}, timeout=5)
r.status_code, r.json()</code></pre>
<div class="tip">Python in the browser has no network, so in the exercises we model the server with a small function: it takes method, path and body and returns <code>(status, json)</code>. Real frameworks (FastAPI, Flask) do exactly this inside.</div>`,
      ex: [
        { prompt: 'The server response arrived as the text <code>raw</code>. (1) Turn it into the dictionary <code>resp</code> and put the churn probability into <code>prob</code>. (2) Turn the <code>payload</code> dictionary for the CRM (<code>customer_id</code> is the id from the response, <code>action</code> is <code>\'call\'</code>, <code>note</code> is <code>\'Ұсыныс: 20% жеңілдік\'</code> (offer: 20% discount)) into JSON text <code>body</code>. Kazakh letters must not turn into <code>\\u</code> codes.', hints: ['<code>json.loads(raw)</code> turns the text into a dictionary.', '<code>json.dumps(payload, ensure_ascii=False)</code> leaves the letters as they are.'], check: { tests: String.raw`assert isinstance(resp, dict) and resp['city'] == 'Алматы', 'resp = json.loads(raw)'
assert prob == 0.81, 'prob is the churn_probability value'
assert isinstance(body, str), 'body should be text (str): use json.dumps'
assert json.loads(body) == {'customer_id': 1042, 'action': 'call', 'note': 'Ұсыныс: 20% жеңілдік'}, 'The payload content is wrong'
assert 'Ұсыныс' in body, 'Add ensure_ascii=False so the Kazakh letters stay readable'` } },
        { prompt: 'Write the function <code>handle(method, path, body=None)</code> that models a shop API. It returns <code>(status, data)</code>:<br>• <code>GET /products</code> → 200, a list of all products;<br>• <code>GET /products/&lt;id&gt;</code> → 200 and the product, 404 if it does not exist;<br>• <code>POST /products</code> → if the body has <code>name</code> and <code>price &gt; 0</code>, assign a new id (largest id + 1), save it and return 201; otherwise 400;<br>• another method on <code>/products</code> → 405; another path → 404.<br>On an error, data is <code>{\'error\': ...}</code>.', hints: ['Split the path into parts: <code>parts = path.strip(\'/\').split(\'/\')</code>. <code>/products/2</code> → <code>[\'products\', \'2\']</code>.', 'Is the id a number: <code>parts[1].isdigit()</code>. New id: <code>max(products) + 1</code>.'], check: { tests: String.raw`products.clear()
products.update({1: {'id': 1, 'name': 'Электр шәйнек', 'price': 15990}, 2: {'id': 2, 'name': 'Кофе машинасы', 'price': 89990}})
_s, _d = handle('GET', '/products')
assert _s == 200 and isinstance(_d, list) and len(_d) == 2, 'GET /products → 200 and a list of 2 products'
_s, _d = handle('GET', '/products/2')
assert _s == 200 and _d['name'] == 'Кофе машинасы', 'GET /products/2 → 200 and that product'
assert handle('GET', '/products/99')[0] == 404, 'Missing product → 404'
assert handle('GET', '/products/abc')[0] == 404, 'Non-numeric id → 404'
assert handle('GET', '/orders')[0] == 404, 'Unknown path → 404'
assert handle('DELETE', '/products')[0] == 405, 'DELETE on /products → 405'
_s, _d = handle('POST', '/products', {'name': 'Тостер', 'price': 12990})
assert _s == 201 and _d['id'] == 3 and _d['price'] == 12990, 'POST → 201, new id = 3'
assert handle('GET', '/products/3')[0] == 200, 'The new product should be saved'
assert handle('POST', '/products', {'name': 'Тостер'})[0] == 400, 'No price → 400'
assert handle('POST', '/products', {'name': 'Тостер', 'price': -5})[0] == 400, 'Negative price → 400'
assert 'error' in handle('POST', '/products', {})[1], 'An error response should have an error key'` } },
        { prompt: 'A client sent valid JSON to <code>POST /predict</code>, but <code>tenure_months</code> is <code>-4</code>. What code should the server return?', options: ['200', '404', '422 (or 400)', '500'], explain: 'The request structure is fine, but a value failed validation: that is a client error (4xx). FastAPI returns 422 in this case. 500 is for the server\'s own errors.' },
        { prompt: 'Which request is <b>not idempotent</b>?', options: ['<code>GET /products/42</code>', '<code>PUT /products/42</code> (with the same full data)', '<code>DELETE /products/42</code>', '<code>POST /orders</code> (creates a new order)'], explain: 'If you send POST twice, two orders are created. Repeating the other three does not change the result.' }
      ]
    },
    'swe-gate': {
      title: 'Module exam: Software Eng for Data',
      body: `
<p>Final check: a class, validation, writing tests, an API handler and engineering habits. No hints. The pass mark is 75%.</p>`,
      ex: [
        { prompt: 'Write the <code>SalesLedger</code> class. <code>__init__</code> creates an empty list <code>self.orders</code>. <code>add(city, amount)</code>: if <code>city</code> is empty, or <code>amount</code> cannot be converted to a number or is negative, raise <code>ValueError</code>; otherwise append <code>{\'city\': city, \'amount\': float(amount)}</code>. <code>total(city=None)</code> is the sum for all orders or for one city (with a <code>-> float</code> hint). <code>by_city()</code> is a <code>{city: sum}</code> dictionary.', check: { tests: String.raw`_l = SalesLedger()
assert _l.orders == [], '__init__ should create an empty orders list'
_l.add('Алматы', '12000')
_l.add('Астана', 8000)
_l.add('Алматы', 500.5)
assert _l.orders[0]['amount'] == 12000.0 and isinstance(_l.orders[0]['amount'], float), 'amount should be stored as a float'
for _args in [('', 100), ('Алматы', 'жүз'), ('Алматы', -1)]:
    try:
        _l.add(*_args)
    except ValueError:
        pass
    else:
        raise AssertionError(f'add{_args} ValueError лақтыруы керек')
assert len(_l.orders) == 3, 'Bad rows should not be added to orders'
assert _l.total() == 20500.5, 'total() is the overall sum'
assert _l.total('Алматы') == 12500.5 and _l.total('Орал') == 0, 'total(city) is the sum for one city'
assert _l.by_city() == {'Алматы': 12500.5, 'Астана': 8000.0}, 'by_city() is wrong'
assert SalesLedger.total.__annotations__.get('return') is float, 'Write the -> float hint for total'` } },
        { prompt: '<code>normalize_phone</code> is ready: it brings any format to the form <code>"77011234567"</code> and raises <code>ValueError</code> if it is not an 11-digit Kazakhstan number. Write <code>test_normalize_phone()</code>: it must pass on the correct version and catch broken ones. At least these cases: <code>"+7 (701) 123-45-67"</code>, <code>"8 701 123 45 67"</code>, and ValueError for <code>"12345"</code>.', check: { tests: String.raw`_ok = normalize_phone
test_normalize_phone()
def _catches(_bad):
    global normalize_phone
    normalize_phone = _bad
    try:
        test_normalize_phone()
        return False
    except Exception:
        return True
    finally:
        normalize_phone = _ok
def _no8(text):
    d = ''.join(ch for ch in text if ch.isdigit())
    if len(d) != 11:
        raise ValueError(text)
    return d
def _nocheck(text):
    d = ''.join(ch for ch in text if ch.isdigit())
    return '7' + d[1:] if d[:1] == '8' else d
def _spaces(text):
    d = text.replace(' ', '').replace('-', '').replace('+', '')
    d = '7' + d[1:] if d[:1] == '8' else d
    if not d.isdigit():
        return d
    if len(d) != 11:
        raise ValueError(text)
    return d
assert _catches(_no8), 'Your test does not check a number starting with 8 (8 701 ...)'
assert _catches(_nocheck), 'Your test does not check that a bad number raises ValueError'
assert _catches(_spaces), 'Your test does not check the format with parentheses (+7 (701) ...)'` } },
        { prompt: 'Write <code>handle_request(method, path, raw_body)</code>, which returns <code>(status, json_text)</code>. Only <code>/score</code> exists (another path → 404, another method → 405). If the POST body is broken JSON → 400. If either of the fields <code>tenure_months</code> and <code>support_calls</code> is missing, not a number or negative → 422 and <code>{"errors": [...]}</code> (one line per bad field, naming the field). Otherwise 200 and <code>{"risk": r}</code>, where <code>r = min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0))</code>, rounded to 2 decimals.', check: { tests: String.raw`import json as _j
_s, _b = handle_request('POST', '/score', '{"tenure_months": 3, "support_calls": 4}')
assert _s == 200 and isinstance(_b, str), 'Successful request: 200 and JSON text'
assert _j.loads(_b) == {'risk': 0.7}, f'risk should be 0.1*4 + 0.3 = 0.7, you have {_b}'
assert _j.loads(handle_request('POST', '/score', '{"tenure_months": 24, "support_calls": 20}')[1])['risk'] == 1.0, 'risk should not exceed 1.0'
assert _j.loads(handle_request('POST', '/score', '{"tenure_months": 24, "support_calls": 1}')[1])['risk'] == 0.1, 'If tenure is more than 6, 0.3 is not added'
assert handle_request('POST', '/score', '{tenure: 3')[0] == 400, 'Broken JSON → 400'
_s, _b = handle_request('POST', '/score', '{"tenure_months": -1}')
assert _s == 422, 'Failed validation → 422'
_e = _j.loads(_b)['errors']
assert len(_e) == 2 and any('tenure_months' in e for e in _e) and any('support_calls' in e for e in _e), 'One message naming the field for each bad field'
assert handle_request('POST', '/score', '{"tenure_months": "3", "support_calls": 1}')[0] == 422, 'A number given as text is also 422'
assert handle_request('GET', '/score', '')[0] == 405, 'GET /score → 405'
assert handle_request('POST', '/predict', '{}')[0] == 404, 'Unknown path → 404'` } },
        { prompt: 'A new colleague cloned the project and ran <code>pip install pandas scikit-learn</code>. When the model loaded, an <code>InconsistentVersionWarning</code> and wrong predictions appeared. What is the right fix?', options: ['Let every colleague retrain the model themselves', 'Create a <code>.venv</code> in the project and install from a <code>requirements.txt</code> with pinned versions (<code>pip install -r requirements.txt</code>); keep the file in git', 'Zip the <code>.venv</code> folder and send it', 'Turn off the warning with <code>warnings.filterwarnings</code>'], explain: 'A requirements.txt with pinned versions gives everyone the same environment. Turning off the warning only hides the problem.' },
        { prompt: 'The pipeline code has this block: <code>try: run_etl() except: pass</code>. Why is it dangerous?', options: ['It slows the code down', 'It silently swallows every error, even bugs (NameError, KeyError): the pipeline looks like it finished "successfully", but the data was not loaded and nothing is left in the log', 'In Python <code>except</code> cannot be written without a name', 'It is not dangerous at all, it is good practice'], explain: 'Catch a specific error (<code>except ValueError</code>), log it with logger.error / logger.exception, and re-raise it if needed.' }
      ]
    },
    'dep-1': {
      title: 'Saving a model: pickle and joblib',
      body: `
<p>We train a model in a notebook once, but an API makes predictions thousands of times a day. Retraining on every request is impossible. So we <b>serialize</b> (save) the trained object to a file, and the server loads it when it starts.</p>
<h3>pickle and joblib</h3>
<pre><code>import pickle, joblib

# pickle is the standard library
with open('model.pkl', 'wb') as f:
    pickle.dump(pipe, f)
with open('model.pkl', 'rb') as f:
    pipe = pickle.load(f)

# joblib is more efficient for objects with large numpy arrays; the sklearn docs recommend it
joblib.dump(pipe, 'churn_model.joblib')
pipe = joblib.load('churn_model.joblib')</code></pre>
<h3>What to save</h3>
<ul>
<li><b>The whole Pipeline</b>, not the bare model. If the <code>StandardScaler</code> is separate, it is easy to forget it on the server, and with unscaled data the model silently predicts wrong.</li>
<li><b>Metadata</b>: the list and order of features, model version, training date, test metric, sklearn version. It is handy to put them into one dictionary (a "bundle") together with the model.</li>
</ul>
<pre><code>bundle = {
    'model': pipe,
    'features': ['tenure_months', 'support_calls'],
    'version': '1.2.0',
    'trained_at': '2026-09-30',
    'test_auc': 0.84,
}
joblib.dump(bundle, 'churn_v1.2.0.joblib')</code></pre>
<h3>Two important warnings</h3>
<ol>
<li><b>Security</b>: <code>pickle.load</code> can run any code stored in the file. Never open a pickle from an untrusted source (the internet, a file uploaded by a user).</li>
<li><b>Versions</b>: a model saved in sklearn 1.6 may not open in 1.3, or may behave differently. Pin the version in requirements.txt and write it into the metadata.</li>
</ol>
<div class="tip">If the model has to work across different languages and environments, it is exported to the <b>ONNX</b> format. Storing model versions in a registry such as MLflow is a topic of the MLOps module.</div>`,
      ex: [
        { prompt: 'The pipeline is trained. (1) Save it to the file <code>churn_model.joblib</code> with <code>joblib.dump</code>. (2) Load it from the file into the variable <code>loaded</code>. (3) <code>same</code>: are the predictions of the two models on <code>data[FEATURES]</code> exactly the same (<code>True</code>/<code>False</code>).', hints: ['<code>joblib.dump(pipe, \'churn_model.joblib\')</code>, then <code>loaded = joblib.load(\'churn_model.joblib\')</code>.', 'Comparison: <code>(loaded.predict(X) == pipe.predict(X)).all()</code>.'], check: { tests: String.raw`import os as _os
from sklearn.pipeline import Pipeline as _Pl
assert _os.path.exists('churn_model.joblib'), 'The file churn_model.joblib was not created'
assert isinstance(loaded, _Pl) and loaded is not pipe, 'loaded should be a Pipeline loaded from the file'
assert 'standardscaler' in loaded.named_steps, 'The saved object should include the scaler too (the whole pipeline)'
assert same == True, 'same should be True: the loaded model predicts the same'` } },
        { prompt: 'Save the model together with metadata. The <code>bundle</code> dictionary: <code>model</code>, <code>features</code> (<code>FEATURES</code>), <code>version</code> = <code>\'1.0.0\'</code>. <code>blob = pickle.dumps(bundle)</code>, <code>restored = pickle.loads(blob)</code>. Then write <code>predict_from_bundle(bundle, customer)</code>: it takes the features in the bundle\'s order and returns the churn probability as a <code>float</code>.', hints: ['<code>pickle.dumps</code> turns an object into bytes, <code>pickle.loads</code> turns it back.', 'Keeping the order: <code>pd.DataFrame([customer])[bundle[\'features\']]</code>.'], check: { tests: String.raw`assert isinstance(blob, bytes), 'blob = pickle.dumps(bundle) (bytes)'
assert restored['version'] == '1.0.0' and restored['features'] == FEATURES, 'The bundle should have version and features'
assert restored['model'] is not model and hasattr(restored['model'], 'coef_'), 'restored is the result of pickle.loads'
_c = {'support_calls': 5, 'city': 'Алматы', 'tenure_months': 2}
_p = predict_from_bundle(restored, _c)
assert isinstance(_p, float) and 0 <= _p <= 1, 'predict_from_bundle returns a float in the 0..1 range'
assert abs(_p - model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1]) < 1e-9, 'Features should be taken in the order of bundle["features"] (even if the keys come in another order)'` } },
        { prompt: 'A user uploads their own <code>.pkl</code> file to the API and says "predict with this model". What should you do?', options: ['Open it with <code>pickle.load</code> and predict', 'Do not open it: loading a pickle can run any code inside it, so an untrusted pickle must never be opened', 'Scan it with an antivirus first, then open it', 'It is safe if you open it with joblib'], explain: 'The pickle and joblib formats are dangerous when they come from an untrusted source: the file can run arbitrary code on your server.' },
        { prompt: 'The model was trained on data scaled with <code>StandardScaler</code>, but only the <code>LogisticRegression</code> object was saved. What happens on the server?', options: ['Nothing, the model remembers the scale itself', 'The server passes unscaled data; the model runs without errors but returns <b>wrong</b> predictions', 'The model does not load', 'The prediction is just slow'], explain: 'That is why we save the whole Pipeline (preprocessing + model) as one object.' }
      ]
    },
    'dep-2': {
      title: 'The prediction function and input validation',
      body: `
<p>The heart of an API is one function: it takes the data from the request and returns a prediction. In the notebook the data was always "right", but in production anything arrives: a missing field, text instead of a number, a negative tenure, <code>null</code>. On such data a model may not raise an error but simply predict nonsense. That is why <b>input validation</b> happens before the model.</p>
<h3>The contract of the prediction function</h3>
<ul>
<li><b>Input</b>: a dictionary (JSON). Which fields are required, of what type, in what range.</li>
<li><b>Output</b>: a dictionary: probability, class, model version. On an error, which field and why.</li>
<li><b>The model is loaded once</b> (when the server starts), not on every request.</li>
</ul>
<h3>Example</h3>
<pre><code>MODEL = joblib.load('churn_model.joblib')   # at module level, once
MODEL_VERSION = '1.2.0'

def validate(data: dict) -> list[str]:
    errors = []
    t = data.get('tenure_months')
    if t is None:
        errors.append('tenure_months: required field')
    elif not isinstance(t, int) or t &lt; 0:
        errors.append('tenure_months: a non-negative whole number is required')
    ...
    return errors

def predict(data: dict) -> dict:
    errors = validate(data)
    if errors:
        return {'ok': False, 'errors': errors}
    row = pd.DataFrame([data])[FEATURES]
    p = float(MODEL.predict_proba(row)[0, 1])
    return {'ok': True, 'churn_probability': round(p, 3), 'label': int(p >= 0.5),
            'model_version': MODEL_VERSION}</code></pre>
<h3>What we check</h3>
<table>
<tr><th>Check</th><th>Example</th></tr>
<tr><td>Is the required field present</td><td><code>monthly_fee</code> is missing</td></tr>
<tr><td>Type</td><td><code>"12"</code> is text, not a number</td></tr>
<tr><td>Range</td><td><code>tenure_months = -3</code>, <code>monthly_fee = 0</code></td></tr>
<tr><td>Allowed values</td><td><code>has_contract</code> only 0 or 1</td></tr>
</table>
<p>Collect and return all errors at once instead of stopping at the first one: the client can then fix everything in one request. Every message should contain the field name.</p>
<div class="tip">In Python, <code>True</code> is a subtype of <code>int</code>: <code>isinstance(True, int)</code> → True. If a numeric field must not accept a bool, check for it separately.</div>`,
      ex: [
        { prompt: 'Write <code>validate_customer(data)</code>, which returns a list of error messages (an empty list if everything is fine). Rules: <code>tenure_months</code> is a whole number ≥ 0; <code>monthly_fee</code> is a number (int or float) &gt; 0; <code>support_calls</code> is a whole number ≥ 0; <code>has_contract</code> is 0 or 1. A missing field is also an error. At most one message per field, and the message must contain the field name.', hints: ['Collect a check function for each field in a dictionary: <code>{\'tenure_months\': lambda v: isinstance(v, int) and v >= 0, ...}</code>.', 'First <code>if field not in data</code>, then <code>elif not ok(data[field])</code>. Message: <code>f\'{field}: ...\'</code>.'], check: { tests: String.raw`_good = {'tenure_months': 3, 'monthly_fee': 4990.0, 'support_calls': 2, 'has_contract': 1}
assert validate_customer(_good) == [], 'An empty list for valid data'
assert validate_customer(dict(_good, monthly_fee=4990)) == [], 'monthly_fee as an int is also valid'
_e = validate_customer({})
assert len(_e) == 4, f'All 4 fields are missing: 4 messages expected, you have {len(_e)}'
_bad = {'tenure_months': -1, 'monthly_fee': 0, 'support_calls': 2.5, 'has_contract': 3}
_e = validate_customer(_bad)
assert len(_e) == 4, f'All 4 fields are wrong: 4 messages expected, you have {_e}'
for _f in _bad:
    assert any(_f in m for m in _e), f'No message for {_f} (the message should contain the field name)'
_e = validate_customer(dict(_good, tenure_months='12'))
assert len(_e) == 1 and 'tenure_months' in _e[0], 'The text "12" is not a number, it is an error'` } },
        { prompt: 'The model is trained once (<code>model</code>). Write <code>predict(data)</code>: <code>tenure_months</code> and <code>support_calls</code> must be whole numbers ≥ 0. On an error, <code>{\'ok\': False, \'errors\': [...]}</code>. If valid, <code>{\'ok\': True, \'churn_probability\': p (rounded to 3 decimals), \'label\': 1 or 0 (p ≥ 0.5), \'model_version\': MODEL_VERSION}</code>.', hints: ['First loop over <code>FEATURES</code>: is <code>customer.get(field)</code> a whole number ≥ 0?', 'Convert the probability with <code>float(...)</code> and use <code>round(p, 3)</code>; <code>label = int(p >= 0.5)</code>.'], check: { tests: String.raw`_r = predict({'tenure_months': 2, 'support_calls': 5, 'city': 'Астана'})
assert _r.get('ok') is True, 'ok=True for valid input'
assert set(_r) == {'ok', 'churn_probability', 'label', 'model_version'}, f'Response keys: ok, churn_probability, label, model_version. You have: {sorted(_r)}'
_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])
assert _r['churn_probability'] == round(_p, 3) and isinstance(_r['churn_probability'], float), 'churn_probability should be a float rounded to 3 decimals'
assert _r['label'] == 1 and _r['model_version'] == '1.0.0', 'label and model_version are wrong'
assert predict({'tenure_months': 50, 'support_calls': 0})['label'] == 0, 'For a long-time customer, label should be 0'
_r = predict({'tenure_months': -2})
assert _r.get('ok') is False and len(_r.get('errors', [])) == 2, 'Negative tenure and missing support_calls: 2 errors'
assert predict({'tenure_months': '3', 'support_calls': 1})['ok'] is False, 'The text "3" should not be accepted'` } },
        { prompt: 'Where is the right place to load the model in an API?', options: ['On every request, inside the <code>predict</code> function, with <code>joblib.load</code>', 'Once, when the server starts (at module level or in a startup event); then all requests use that object', 'On every 10th request', 'In the client\'s browser'], explain: 'Loading from a file takes tens to hundreds of milliseconds. If you load it on every request, latency grows several times over.' }
      ]
    },
    'dep-3': {
      title: 'FastAPI: turning a model into an endpoint',
      body: `
<p><b>FastAPI</b> is a modern framework for writing APIs in Python. It is very popular in ML: it builds validation and documentation automatically from type hints and it is fast. It is not available in browser Python, so we read the code as text, and in the exercises we model its core (the router) ourselves.</p>
<h3>The smallest service</h3>
<pre><code># main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib, pandas as pd

app = FastAPI(title='Churn API')
MODEL = joblib.load('churn_model.joblib')

class Customer(BaseModel):
    tenure_months: int
    support_calls: int

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/predict')
def predict(customer: Customer):
    row = pd.DataFrame([customer.model_dump()])
    p = float(MODEL.predict_proba(row)[0, 1])
    return {'churn_probability': round(p, 3)}

@app.get('/customers/{customer_id}')
def get_customer(customer_id: int, include_history: bool = False):
    if customer_id not in DB:
        raise HTTPException(status_code=404, detail='Customer not found')
    return DB[customer_id]</code></pre>
<pre><code>$ pip install fastapi uvicorn
$ uvicorn main:app --reload --port 8000
# http://localhost:8000/docs  → Swagger UI, you can try the endpoints in the browser</code></pre>
<h3>What is going on</h3>
<ul>
<li><code>@app.get('/health')</code> is a <b>decorator</b>: it registers the function in a table under the rule "when a GET /health request arrives, call this". That table is the <b>router</b>.</li>
<li><code>customer: Customer</code>: FastAPI validates the JSON body with the Pydantic model. If something is wrong, it returns <b>422</b> without calling the function at all.</li>
<li><code>{customer_id}</code> is a <b>path parameter</b>, and <code>include_history</code> is a <b>query parameter</b>: <code>/customers/7?include_history=true</code>.</li>
<li>The dictionary the function returns becomes JSON; the default code is 200.</li>
<li><code>uvicorn main:app</code> means "run the <code>app</code> object from the file <code>main.py</code>".</li>
</ul>
<h3>Inside the router</h3>
<pre><code>routes = {('GET', '/health'): health, ('POST', '/predict'): predict}

def handle(method, path, body):
    func = routes.get((method, path))
    if func is None:
        return 404 (or 405 if the path exists but the method differs)
    return 200, func(...)</code></pre>
<div class="tip">Every ML service has at least two endpoints: <code>GET /health</code> (is the service alive) and <code>POST /predict</code>. Adding the model version to the response or to <code>/health</code> is a good habit.</div>`,
      ex: [
        { prompt: 'A FastAPI-like <code>MiniApp</code> is ready. Register two endpoints with decorators: <code>GET /health</code> → <code>{\'status\': \'ok\', \'model_version\': MODEL_VERSION}</code>; <code>POST /predict</code> → takes <code>support_calls</code> from the body and returns <code>{\'risk\': round(min(1.0, 0.15 * support_calls), 2)}</code>. If <code>support_calls</code> is missing, raise <code>ValueError</code> (MiniApp turns it into 422).', hints: ['A decorator goes above the function: <code>@app.get(\'/health\')</code>, and on the next line <code>def health():</code>.', 'The POST function takes the body: <code>def predict(body):</code>. If the field is missing, <code>raise ValueError(...)</code>.'], check: { tests: String.raw`assert app.handle('GET', '/health') == (200, {'status': 'ok', 'model_version': '1.0.0'}), 'GET /health → 200 and status/model_version'
assert app.handle('POST', '/predict', {'support_calls': 3}) == (200, {'risk': 0.45}), 'POST /predict {support_calls: 3} → risk 0.45'
assert app.handle('POST', '/predict', {'support_calls': 10}) == (200, {'risk': 1.0}), 'risk should not exceed 1.0'
assert app.handle('POST', '/predict', {})[0] == 422, 'If support_calls is missing, ValueError → 422'
assert app.handle('GET', '/predict')[0] == 405, '/predict should accept only POST'` } },
        { prompt: 'Now write the router itself. <code>MiniApp</code>: the <code>get(path)</code> and <code>post(path)</code> decorators register the function in <code>self.routes[(method, path)]</code> and return the function itself. <code>handle(method, path, body=None)</code>: if the route is found, call <code>func()</code> for GET or <code>func(body)</code> for POST and return <code>(200, result)</code>; if the path exists but the method differs, <code>(405, ...)</code>; if the path does not exist at all, <code>(404, ...)</code>.', hints: ['A decorator factory: inside <code>def get(self, path):</code> write <code>def decorator(func): self.routes[(\'GET\', path)] = func; return func</code>, and finish with <code>return decorator</code>.', 'For 405: <code>any(p == path for _, p in self.routes)</code>.'], check: { tests: String.raw`_app = MiniApp()
@_app.get('/health')
def _h():
    return {'status': 'ok'}
@_app.post('/echo')
def _e(body):
    return {'got': body}
assert _h() == {'status': 'ok'}, 'The decorator should return the function itself (return func)'
assert ('GET', '/health') in _app.routes and ('POST', '/echo') in _app.routes, 'The routes keys should be (method, path)'
assert _app.handle('GET', '/health') == (200, {'status': 'ok'}), 'GET /health → 200'
assert _app.handle('POST', '/echo', {'a': 1}) == (200, {'got': {'a': 1}}), 'The POST function receives the body'
assert _app.handle('POST', '/health')[0] == 405, 'Path exists, method differs → 405'
assert _app.handle('GET', '/nope')[0] == 404, 'Unknown path → 404'` } },
        { prompt: 'What does <code>main:app</code> mean in the command <code>uvicorn main:app --port 8000</code>?', options: ['Run the function <code>main</code> on the port <code>app</code>', 'Run the FastAPI object named <code>app</code> from the module <code>main.py</code>', 'The name and tag of a Docker image', 'A git branch and repository'], explain: 'The format is <code>module:variable</code>. Uvicorn imports <code>main.py</code> and sends requests to the <code>app</code> object inside it.' },
        { prompt: 'FastAPI has the endpoint <code>GET /customers/{customer_id}</code>. What is the best thing to do when the customer is not found?', options: ['<code>return {}</code> (with code 200)', '<code>raise HTTPException(status_code=404, detail=\'Customer not found\')</code>', '<code>return None</code>', 'Stop the server'], explain: '404 tells the client clearly that the resource does not exist. If an empty response comes with code 200, the client will think "everything is fine".' }
      ]
    },
    'dep-4': {
      title: 'Pydantic: validating data with a schema',
      body: `
<p>In the previous lesson we wrote the checks by hand with <code>if</code> statements. With many fields this is long and error-prone. <b>Pydantic</b> lets you describe the input <b>schema</b> with type hints, and the library does the validation and conversion itself. This is exactly how FastAPI validates the request body.</p>
<h3>Example</h3>
<pre><code>from typing import Literal
from pydantic import BaseModel, Field

class CustomerIn(BaseModel):
    tenure_months: int = Field(ge=0, le=600)
    monthly_fee: float = Field(gt=0)
    support_calls: int = Field(ge=0)
    city: Literal['Алматы', 'Астана', 'Шымкент']

c = CustomerIn(tenure_months='12', monthly_fee=4990, support_calls=1, city='Алматы')
c.tenure_months      # 12  ← the text "12" was converted to int
c.model_dump()       # {'tenure_months': 12, 'monthly_fee': 4990.0, ...}

CustomerIn(tenure_months=-3, monthly_fee=0, support_calls=1, city='Париж')
# ValidationError: 3 validation errors
#   tenure_months: Input should be greater than or equal to 0
#   monthly_fee:   Input should be greater than 0
#   city:          Input should be 'Алматы', 'Астана' or 'Шымкент'</code></pre>
<h3>With FastAPI</h3>
<p>If you write <code>def predict(customer: CustomerIn)</code>, FastAPI validates the JSON against this schema. On an error the function is not called at all: the client gets <b>422</b> and a <code>detail</code> list showing which field is wrong and why. You can also give the output a schema: <code>@app.post('/predict', response_model=PredictionOut)</code>.</p>
<h3>Main features</h3>
<ul>
<li><b>Conversion</b> (coercion): <code>"12"</code> → <code>12</code>; but <code>"twelve"</code> → error.</li>
<li><b>Constraints</b>: <code>Field(ge=0)</code> (≥), <code>gt</code> (&gt;), <code>le</code>, <code>max_length</code>.</li>
<li><b>Allowed values</b>: <code>Literal[...]</code> or <code>Enum</code>.</li>
<li><b>Default values</b> and optional fields: <code>promo: str | None = None</code>.</li>
<li><b>Extra fields</b>: ignored by default; with <code>model_config = {'extra': 'forbid'}</code> they are an error.</li>
</ul>
<p>Pydantic is not available in browser Python, so in the exercises we repeat its idea with the standard <code>@dataclass</code> and <code>__post_init__</code>: right after the object is created, we convert and check the fields.</p>
<pre><code>@dataclass
class Point:
    x: int
    def __post_init__(self):
        self.x = int(self.x)       # conversion
        if self.x &lt; 0:
            raise ValueError('x: must not be negative')</code></pre>
<div class="tip">A schema is a contract between the service and the client. Keep it in one place (one class), so the documentation (<code>/docs</code>), validation and code do not drift apart.</div>`,
      ex: [
        { prompt: 'Add <code>__post_init__</code> to the <code>CustomerIn</code> dataclass: convert <code>tenure_months</code> and <code>support_calls</code> with <code>int()</code> (for non-numeric text <code>int</code> raises ValueError itself); if negative, <code>ValueError</code>; if <code>city</code> is not in <code>ALLOWED_CITIES</code>, <code>ValueError</code>. The message must contain the field name.', hints: ['Inside <code>def __post_init__(self):</code> write <code>self.tenure_months = int(self.tenure_months)</code>.', 'Then <code>if self.city not in ALLOWED_CITIES: raise ValueError(\'city: ...\')</code>.'], check: { tests: String.raw`_c = CustomerIn('12', '3', 'Алматы')
assert _c.tenure_months == 12 and _c.support_calls == 3, '"12" and "3" should be converted to int'
assert isinstance(_c.tenure_months, int), 'tenure_months should be an int'
for _args, _field in [((-1, 0, 'Алматы'), 'tenure_months'), ((5, -2, 'Астана'), 'support_calls'), ((5, 1, 'Париж'), 'city')]:
    try:
        CustomerIn(*_args)
    except ValueError as _e:
        assert _field in str(_e), f'The message should contain the field name ({_field}), you have: {_e}'
    else:
        raise AssertionError(f'CustomerIn{_args} ValueError лақтыруы керек')
try:
    CustomerIn('он екі', 1, 'Алматы')
except ValueError:
    pass
else:
    raise AssertionError('Сан емес мәтін ValueError беруі керек')` } },
        { prompt: 'Reproduce FastAPI\'s behavior with the ready <code>CustomerIn</code> schema. <code>handle_predict(body)</code>: create <code>CustomerIn(**body)</code>; if a field is missing or extra (<code>TypeError</code>), or validation fails (<code>ValueError</code>) → <code>(422, {\'detail\': str(e)})</code>. On success → <code>(200, {\'customer\': asdict(c), \'risk\': r})</code>, where <code>r = round(min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0)), 2)</code>.', hints: ['<code>try: c = CustomerIn(**body)</code>, <code>except (TypeError, ValueError) as e: return 422, {\'detail\': str(e)}</code>.', 'On success, <code>asdict(c)</code> gives the converted values.'], check: { tests: String.raw`_s, _d = handle_predict({'tenure_months': '3', 'support_calls': 2, 'city': 'Шымкент'})
assert _s == 200, 'A valid body → 200'
assert _d.get('customer') == {'tenure_months': 3, 'support_calls': 2, 'city': 'Шымкент'}, 'customer holds the converted values (asdict)'
assert _d.get('risk') == 0.5, f'risk should be 0.1*2 + 0.3 = 0.5, you have {_d.get("risk")}'
assert handle_predict({'tenure_months': 24, 'support_calls': 1, 'city': 'Алматы'})[1]['risk'] == 0.1, 'If tenure ≥ 6, 0.3 is not added'
_s, _d = handle_predict({'tenure_months': 3, 'city': 'Алматы'})
assert _s == 422 and 'detail' in _d, 'Missing field → 422 and detail'
assert handle_predict({'tenure_months': 3, 'support_calls': 1, 'city': 'Алматы', 'promo': 'X'})[0] == 422, 'Extra field → 422'
assert handle_predict({'tenure_months': 3, 'support_calls': 1, 'city': 'Орал'})[0] == 422, 'City not allowed → 422'
assert handle_predict({'tenure_months': 'abc', 'support_calls': 1, 'city': 'Алматы'})[0] == 422, 'Non-numeric value → 422'` } },
        { prompt: 'A FastAPI endpoint accepts <code>CustomerIn</code> (Pydantic, <code>tenure_months: int = Field(ge=0)</code>). A client sent <code>{"tenure_months": "abc", ...}</code>. What happens?', options: ['The function is called and tenure_months becomes 0', 'The function is not called; the client gets 422 and an error message about the tenure_months field', 'The server returns 500', 'The request is ignored and 200 is returned'], explain: 'Pydantic cannot convert "abc" to int, so FastAPI returns 422 before reaching the function. If it were "12", it would be converted to 12.' }
      ]
    },
    'dep-5': {
      title: 'Docker: image, container, port',
      body: `
<p>"It works on my machine" is the most common phrase in deployment. The server has a different Python version, a missing library, other system dependencies. <b>Docker</b> packs an application together with its whole environment (Python, libraries, code, model file) into one package that works the same on any machine with Docker.</p>
<h3>Image and container</h3>
<ul>
<li>An <b>image</b> is a ready "mold": files and settings that do not change. It is like a class in Python.</li>
<li>A <b>container</b> is a running instance started from an image. It is like an object: you can start dozens of containers from one image.</li>
<li>A <b>registry</b> (Docker Hub, GitHub Container Registry) is where images are stored.</li>
</ul>
<h3>A Dockerfile line by line</h3>
<pre><code>FROM python:3.12-slim                 # base image: a light Linux with Python
WORKDIR /app                          # working folder inside
COPY requirements.txt .               # first only the list of dependencies
RUN pip install --no-cache-dir -r requirements.txt
COPY . .                              # then all the code and the model
EXPOSE 8000                           # which port the container listens on (documentation)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
<p><b>Why requirements.txt first?</b> Docker caches every line as a <b>layer</b>. When you change the code, only <code>COPY . .</code> and the layers after it are rebuilt, and the long <code>pip install</code> comes from the cache. If <code>COPY . .</code> came first, every change would reinstall all the libraries.</p>
<p><b>Why 0.0.0.0?</b> <code>127.0.0.1</code> is reachable only from inside the container. To accept requests from outside, the server must listen on <code>0.0.0.0</code>.</p>
<h3>Commands</h3>
<pre><code>docker build -t churn-api:1.0 .            # build an image
docker run -p 8080:8000 churn-api:1.0      # start a container
#              ↑ host   ↑ port inside the container
curl http://localhost:8080/health          # from your computer
docker ps                                  # running containers
docker logs &lt;container_id&gt;                 # the log</code></pre>
<p>The <code>.dockerignore</code> file lists <code>.venv</code>, <code>.git</code>, <code>notebooks/</code>, data and secrets: they must not end up in the image.</p>
<div class="tip">Do not put <b>secrets</b> (API key, password) into an image: anyone who gets the image can read them. Secrets are passed at start-up as environment variables (next lesson).</div>`,
      ex: [
        { prompt: 'A colleague\'s Dockerfile is in the <code>dockerfile</code> variable. It is not reachable from outside and builds slowly. Fix it: <code>FROM python:3.12-slim</code> first; <code>WORKDIR /app</code>; <code>COPY requirements.txt .</code> → <code>RUN pip install ... -r requirements.txt</code> → <code>COPY . .</code> in this order; <code>EXPOSE 8000</code>; the last line, <code>CMD</code>, should start uvicorn on host <code>0.0.0.0</code> and port 8000.', hints: ['For the cache: first <code>COPY requirements.txt .</code>, then <code>RUN pip install</code>, and only after that <code>COPY . .</code>.', 'In CMD use <code>"--host", "0.0.0.0"</code>, and put <code>EXPOSE 8000</code> before CMD.'], check: { tests: String.raw`_L = [l.strip() for l in dockerfile.strip().splitlines() if l.strip() and not l.strip().startswith('#')]
_I = [l.split()[0].upper() for l in _L]
assert _L[0].startswith('FROM python:3'), 'First line: FROM python:3.12-slim'
assert 'WORKDIR' in _I and _I.index('WORKDIR') < _I.index('COPY'), 'WORKDIR /app before COPY'
_req = next((i for i, l in enumerate(_L) if l.split()[:2] == ['COPY', 'requirements.txt']), None)
_pip = next((i for i, l in enumerate(_L) if l.startswith('RUN') and 'pip install' in l and '-r requirements.txt' in l), None)
_all = next((i for i, l in enumerate(_L) if l.split() == ['COPY', '.', '.']), None)
assert _req is not None and _pip is not None and _all is not None, 'Three lines are needed: COPY requirements.txt . / RUN pip install -r requirements.txt / COPY . .'
assert _req < _pip < _all, 'Order: COPY requirements.txt → RUN pip install → COPY . . (for the layer cache)'
assert any(l.split()[:2] == ['EXPOSE', '8000'] for l in _L), 'Add EXPOSE 8000'
assert _I[-1] == 'CMD', 'The last line should be CMD'
assert '0.0.0.0' in _L[-1] and '8000' in _L[-1] and 'uvicorn' in _L[-1], 'CMD should start uvicorn on host 0.0.0.0 and port 8000'` } },
        { prompt: 'Inside the container the server listens on port 8000. You started it with <code>docker run -p 9000:8000 churn-api:1.0</code>. Which port goes in your own browser: <code>http://localhost:____/health</code>?', explain: '<code>-p HOST:CONTAINER</code>. The 9000 on the left is your machine\'s port, and it is connected to 8000 inside the container.' },
        { prompt: 'What is the difference between an image and a container?', options: ['They are two names for the same thing', 'An image is an unchanging mold (like a class); a container is a running instance started from that image (like an object)', 'A container is the text of the Dockerfile, an image is a running process', 'Images exist only on Linux, containers only on Windows'], explain: 'You can start several containers from one image and spread the load.' },
        { prompt: 'In the Dockerfile, the line <code>COPY . .</code> comes <b>before</b> <code>RUN pip install -r requirements.txt</code>. You changed one line of code. What happens?', options: ['Nothing, Docker copies only the changed file', 'Because the COPY layer changed, the pip install layer after it is not taken from the cache either, and all libraries are reinstalled', 'The build stops with an error', 'The container does not start'], explain: 'When one layer changes, every layer after it is rebuilt. That is why things that rarely change (dependencies) go near the top.' }
      ]
    },
    'dep-6': {
      title: 'Environment variables and config',
      body: `
<p>The same code runs in different environments: on your laptop (dev), on a test server (staging) and in production. The difference is in the <b>settings</b>: the model file path, port, threshold, database address, API keys. Instead of writing them into the code, we pass them through <b>environment variables</b>. This is the core rule of the "12-factor app" approach.</p>
<h3>Reading them in Python</h3>
<pre><code>import os

MODEL_PATH = os.environ['MODEL_PATH']                  # required: KeyError if missing
PORT = int(os.getenv('PORT', '8000'))                  # has a default value
DEBUG = os.getenv('DEBUG', 'false').lower() in ('1', 'true', 'yes')
THRESHOLD = float(os.getenv('THRESHOLD', '0.5'))</code></pre>
<p>Important: an environment variable is always <b>text</b>. You convert <code>'8000'</code> to <code>int</code> and <code>'false'</code> to bool yourself. Remember that <code>bool('false')</code> → <code>True</code>!</p>
<h3>How they are passed</h3>
<pre><code># in the terminal
export MODEL_PATH=models/churn_v1.2.0.joblib
# Docker
docker run -e THRESHOLD=0.35 --env-file .env -p 8080:8000 churn-api:1.0
# the .env file (never put in git!)
MODEL_PATH=models/churn_v1.2.0.joblib
DB_PASSWORD=s3cr3t</code></pre>
<p>In local development, <code>python-dotenv</code> reads the <code>.env</code> file; on platforms such as Render and Railway the variables are set in the dashboard. Pydantic's <code>pydantic-settings</code> package describes the config as a schema and does conversion and validation itself.</p>
<h3>Rules</h3>
<ul>
<li><b>Secrets are never in the code, in git or in the Docker image.</b> <code>.env</code> → <code>.gitignore</code>. Only a template without values, <code>.env.example</code>, goes into the repository.</li>
<li>Read and validate the config <b>in one place</b>, once at start-up. If a required variable is missing, the server should stop right away with a clear error, not on the first request.</li>
<li>When you write the config to the log, <b>mask</b> the secrets.</li>
</ul>
<div class="tip">If a secret accidentally lands in git, deleting the file is not enough: it stays in the history. <b>Replace</b> (rotate) the key immediately.</div>`,
      ex: [
        { prompt: 'Write <code>load_config(env)</code> (<code>env</code> is a dictionary like <code>os.environ</code>, values are text). It returns <code>{\'model_path\', \'port\', \'debug\', \'threshold\'}</code>. <code>MODEL_PATH</code> is required: if missing, <code>RuntimeError</code> (with MODEL_PATH in the message). <code>PORT</code> → int, default 8000. <code>DEBUG</code> → bool: True for <code>1/true/yes</code> (any case), default False. <code>THRESHOLD</code> → float, default 0.5; outside 0..1 it raises <code>RuntimeError</code> (with THRESHOLD in the message).', hints: ['Text to bool: <code>env.get(\'DEBUG\', \'false\').lower() in (\'1\', \'true\', \'yes\')</code>. <code>bool(\'false\')</code> gives True!', 'A required variable: <code>if \'MODEL_PATH\' not in env: raise RuntimeError(...)</code>.'], check: { tests: String.raw`_c = load_config({'MODEL_PATH': 'm.joblib'})
assert _c == {'model_path': 'm.joblib', 'port': 8000, 'debug': False, 'threshold': 0.5}, f'The default values are wrong: {_c}'
_c = load_config({'MODEL_PATH': 'm.joblib', 'PORT': '10000', 'DEBUG': 'TRUE', 'THRESHOLD': '0.35'})
assert _c['port'] == 10000 and isinstance(_c['port'], int), 'Convert the PORT text to int'
assert _c['debug'] is True, 'DEBUG="TRUE" → True (case-insensitive)'
assert _c['threshold'] == 0.35, 'Convert the THRESHOLD text to float'
assert load_config({'MODEL_PATH': 'm', 'DEBUG': 'false'})['debug'] is False, 'DEBUG="false" → False'
assert load_config({'MODEL_PATH': 'm', 'DEBUG': '0'})['debug'] is False, 'DEBUG="0" → False'
for _env, _w in [({}, 'MODEL_PATH'), ({'MODEL_PATH': 'm', 'THRESHOLD': '1.5'}, 'THRESHOLD')]:
    try:
        load_config(_env)
    except RuntimeError as _e:
        assert _w in str(_e), f'The message should mention {_w}'
    else:
        raise AssertionError(f'{_env} үшін RuntimeError күтілді')` } },
        { prompt: 'When the service starts, the config is written to the log. Write <code>safe_config(cfg)</code>: it returns a <b>new</b> dictionary where the values of keys containing <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> or <code>TOKEN</code> (case-insensitive) are replaced with <code>\'***\'</code>. The original dictionary must not change.', hints: ['Convert the key with <code>k.upper()</code> and check whether it contains one of the markers: <code>any(m in k.upper() for m in (...))</code>.', 'A new dictionary: <code>{k: ... for k, v in cfg.items()}</code>.'], check: { tests: String.raw`_s = safe_config(cfg)
assert _s == {'MODEL_PATH': 'models/churn.joblib', 'DB_PASSWORD': '***', 'openai_api_key': '***', 'PORT': '8000'}, f'Wrong result: {_s}'
assert cfg['DB_PASSWORD'] == 's3cr3t', 'The original cfg must not change: return a new dictionary'
assert safe_config({'Telegram_Token': 'x', 'secret_salt': 'y'}) == {'Telegram_Token': '***', 'secret_salt': '***'}, 'TOKEN and SECRET should be masked too (case-insensitive)'` } },
        { prompt: 'Where is the right place to store a database password?', options: ['In <code>main.py</code> as a constant', 'In <code>requirements.txt</code>', 'In the platform\'s environment variables / secrets settings (locally, in a .env file that is not put in git)', 'In the Dockerfile as <code>ENV DB_PASSWORD=...</code>'], explain: 'Code, git and Docker images are available to many people. A secret is passed in from the environment only at start-up.' }
      ]
    },
    'dep-7': {
      title: 'Cloud deployment and health checks',
      body: `
<p>The Docker image is ready. Now it has to go somewhere it will run on the internet all the time. A beginner has three options.</p>
<table>
<tr><th>Option</th><th>How it works</th><th>Pros</th><th>Cons</th></tr>
<tr><td><b>Render</b></td><td>You connect a GitHub repository; it builds from the Dockerfile itself and gives you an HTTPS address</td><td>The easiest; has a free plan; git push → automatic deploy</td><td>A free service "sleeps" when idle: the next request waits 30–60 s (cold start)</td></tr>
<tr><td><b>Railway</b></td><td>Similar to Render, Dockerfile or automatic detection</td><td>Convenient interface, add a database with one button</td><td>You pay for the resources used, so you need to watch costs</td></tr>
<tr><td><b>VPS</b> (Hetzner, DigitalOcean, ps.kz)</td><td>A rented Linux server: you install Docker and run it yourself, with nginx and TLS in front</td><td>Full control, fixed price, data can be stored in Kazakhstan</td><td>Updates, security, backups, monitoring: all on you</td></tr>
</table>
<p>Large companies use Google Cloud Run, AWS App Runner or Kubernetes, but the idea is the same: <b>container + config + health check</b>.</p>
<h3>Health check</h3>
<p>The platform sends a request to your service every few seconds to check that it is alive. If there is no answer, it restarts the container or stops sending traffic to it.</p>
<ul>
<li><b>Liveness</b> (<code>/health</code>): is the process alive? It always returns 200 quickly and does no heavy work.</li>
<li><b>Readiness</b> (<code>/ready</code>): is it ready to take requests? While the model is still loading, <b>503</b>; when ready, 200 and the model version.</li>
</ul>
<pre><code>@app.get('/ready')
def ready():
    if STATE['model'] is None:
        raise HTTPException(status_code=503, detail='model loading')
    return {'status': 'ready', 'model_version': STATE['model_version']}</code></pre>
<h3>Deployment checklist</h3>
<ol>
<li>The server reads the port number from the <code>PORT</code> variable (Render sets it for you).</li>
<li>All secrets and config are in the platform's environment variables section.</li>
<li>The health check path is set on the platform.</li>
<li>Logs go to stdout: the platform collects and shows them.</li>
<li>After the deploy, a <b>smoke test</b>: /health and one real /predict request.</li>
<li>A rollback plan: go back to the previous image tag.</li>
</ol>
<div class="tip">Put the version in the image tag (<code>churn-api:1.3.0</code>), not <code>latest</code>. Then "which exact version is in production?" and "how do we roll back?" have immediate answers.</div>`,
      ex: [
        { prompt: 'Write two health functions. <code>liveness()</code> always returns <code>(200, {\'status\': \'alive\'})</code>. <code>readiness(state)</code>: if <code>state[\'model\']</code> is <code>None</code>, return <code>(503, {\'status\': \'loading\'})</code>, otherwise <code>(200, {\'status\': \'ready\', \'model_version\': state[\'model_version\']})</code>.', hints: ['<code>liveness</code> checks nothing: <code>return 200, {\'status\': \'alive\'}</code>.', '<code>readiness</code>: <code>if state[\'model\'] is None: return 503, ...</code>.'], check: { tests: String.raw`assert liveness() == (200, {'status': 'alive'}), 'liveness() → (200, {"status": "alive"})'
assert readiness({'model': None, 'model_version': None}) == (503, {'status': 'loading'}), 'If the model is not loaded → 503 loading'
assert readiness({'model': 'm', 'model_version': '2.1.0'}) == (200, {'status': 'ready', 'model_version': '2.1.0'}), 'Model ready → 200, ready and model_version'` } },
        { prompt: 'A <b>smoke test</b> after deployment. Write <code>smoke_test(handle)</code>: <code>handle(method, path, body=None)</code> → <code>(status, data)</code>. Three checks: <code>\'health\'</code>: <code>GET /health</code> returns 200; <code>\'predict\'</code>: <code>POST /predict</code> with <code>{\'tenure_months\': 3, \'support_calls\': 4}</code> returns 200 and <code>data[\'churn_probability\']</code> is within 0..1; <code>\'validation\'</code>: <code>POST /predict</code> with an empty <code>{}</code> returns 422. Return a list of the names of the checks that failed (an empty list if all pass).', hints: ['Write each check separately: <code>status, data = handle(\'POST\', \'/predict\', {...})</code>; if the condition fails, <code>failed.append(\'predict\')</code>.', 'Get the probability with <code>data.get(\'churn_probability\')</code>: if the key is missing, you get None and the check fails.'], check: { tests: String.raw`assert smoke_test(good_handle) == [], 'An empty list for a healthy service'
def _down(method, path, body=None):
    return 503, {}
assert smoke_test(_down) == ['health', 'predict', 'validation'], 'If the service is down, all three checks fail (in this order)'
def _badprob(method, path, body=None):
    if path == '/health':
        return 200, {}
    if not body:
        return 422, {}
    return 200, {'churn_probability': 7.1}
assert smoke_test(_badprob) == ['predict'], 'Probability outside 0..1 → predict fails'
def _nokey(method, path, body=None):
    if path == '/health':
        return 200, {}
    return 200, {'risk': 0.3}
assert smoke_test(_nokey) == ['predict', 'validation'], 'No churn_probability, and an empty body gives 200 → predict, validation'` } },
        { prompt: 'An API on Render\'s free plan was unused overnight; it answered the first morning request in 50 seconds, and later ones quickly. Why?', options: ['The model is badly trained', 'An idle free service "sleeps", and the first request starts it again (cold start): the container and the model are loaded', 'The internet is slow', 'Pydantic validation takes long'], explain: 'Cold start: the container starts and the model loads. If you need steady speed, you need a paid plan or an always-on server.' },
        { prompt: 'Write a deployment plan for the Dala Mobile churn API (FastAPI + Docker, a 40 MB model, ~5 000 requests a day, the data includes personal information): which platform and why, where the config and secrets live, how the health check works, what you check after the deploy, and how you roll back if something breaks. Then grade yourself honestly on the four criteria.', criteria: [
          { name: 'Platform choice', levels: ['No platform named', 'Named, but no reason', 'The choice is explained by load and price', 'The choice, an alternative and where the data is stored (personal information) are all considered'] },
          { name: 'Config and secrets', levels: ['Not mentioned', 'General words', 'Environment variables; no secrets in the image or git', 'A concrete list of variables, .env.example and a plan to rotate secrets'] },
          { name: 'Health check and verification', levels: ['None', 'Only "there is a /health"', 'Liveness/readiness and a smoke test after the deploy', 'Health, smoke test, logs and latency monitoring'] },
          { name: 'Rollback', levels: ['None', '"We will deploy again"', 'Go back to an image with a version tag', 'Version tag, rollback steps and the decision rule (when we roll back)'] }
        ] }
      ]
    },
    'dep-8': {
      title: 'Latency, throughput and batch prediction',
      body: `
<p>The service works; now the question is: <b>how fast</b>? There are two metrics:</p>
<ul>
<li><b>Latency</b>: the response time of one request (ms).</li>
<li><b>Throughput</b>: how many requests are handled per second (RPS).</li>
</ul>
<h3>Why percentiles, not the average</h3>
<p>Even if the average latency is 40 ms, every 20th customer may wait 900 ms. That is why we use <b>p50</b> (the median), <b>p95</b> and <b>p99</b>: "95% of requests are faster than this". An SLO (service level objective) is usually written like this: "p95 ≤ 200 ms".</p>
<pre><code>import time, numpy as np
latencies = []
for row in sample:
    t0 = time.perf_counter()
    predict(row)
    latencies.append((time.perf_counter() - t0) * 1000)
np.percentile(latencies, [50, 95, 99])</code></pre>
<h3>Where the time goes</h3>
<ol>
<li><b>Loading the model</b>: once, at start-up. Loading it on every request is the most common mistake.</li>
<li><b>Validation and building the DataFrame</b>: small, but it adds up.</li>
<li><b>The prediction</b>: microseconds for a linear model, longer for a large ensemble or a neural network.</li>
<li><b>The network</b> and where the client is: if the server is in Frankfurt, ~80–100 ms from Almaty go on the trip alone.</li>
</ol>
<h3>Batch: many rows at once</h3>
<p>sklearn is vectorized: predicting 1 000 rows with one <code>predict_proba</code> call is tens of times faster than 1 000 one-row predictions. So:</p>
<ul>
<li><b>Online</b> (API, one client): latency matters, answers in real time.</li>
<li><b>Batch</b> (a nightly job): predict all 2 million subscribers in chunks (for example, 10 000 at a time) and write the results to a database. An API is not needed for this kind of work.</li>
<li>You can add <code>POST /predict_batch</code> to an API too, but limit the number of rows per request (for example, 100), otherwise one client ties up the server for a long time.</li>
</ul>
<pre><code>def predict_batch(model, rows, batch_size=10_000):
    out = []
    for i in range(0, len(rows), batch_size):
        chunk = rows[i:i + batch_size]
        out.extend(model.predict_proba(chunk)[:, 1])
    return out</code></pre>
<div class="tip">If one worker handles a request in 25 ms, it delivers at most 40 requests per second. If you need more, increase the number of workers (<code>uvicorn --workers 4</code>) or add more containers.</div>`,
      ex: [
        { prompt: 'The load test results are in the <code>latencies</code> list (ms). Use <code>numpy.percentile</code> to compute <code>p50</code> and <code>p95</code>, and also the average <code>mean_ms</code>. SLO: p95 ≤ 200 ms. <code>slo_ok</code>: is the SLO met (bool).', hints: ['<code>np.percentile(latencies, 95)</code> is the 95th percentile.', '<code>slo_ok = bool(p95 <= 200)</code>. Even when the median looks good, p95 may tell a different story.'], check: { tests: String.raw`import numpy as _np
assert abs(p50 - _np.percentile(latencies, 50)) < 1e-9, 'p50 = np.percentile(latencies, 50)'
assert abs(p95 - _np.percentile(latencies, 95)) < 1e-9, 'p95 = np.percentile(latencies, 95)'
assert abs(mean_ms - _np.mean(latencies)) < 1e-9, 'mean_ms is the average'
assert slo_ok is False or slo_ok == False, 'p95 ≈ 624 ms > 200: the SLO is not met, slo_ok should be False'` } },
        { prompt: 'Write <code>predict_batch(model, rows, batch_size)</code>: it splits <code>rows</code> into chunks of size <code>batch_size</code> and calls <code>model.predict_proba(chunk)</code> <b>once</b> per chunk; it returns a list of the class-1 probability (element <code>[1]</code>) for each row, in the original order.', starter: String.raw`class CountingModel:
    """Шақырулар санын есептейтін жалған модель."""
    def __init__(self):
        self.calls = 0
    def predict_proba(self, rows):
        self.calls += 1
        return [[1 - r['support_calls'] / 10, r['support_calls'] / 10] for r in rows]

def predict_batch(model, rows, batch_size):
    out = []
    for r in rows:
        out.append(model.predict_proba([r])[0][1])
    return out
`, hints: ['<code>for i in range(0, len(rows), batch_size):</code> and <code>chunk = rows[i:i + batch_size]</code>.', 'From each chunk\'s result take element 1: <code>out.extend(p[1] for p in model.predict_proba(chunk))</code>.'], check: { tests: String.raw`_m = CountingModel()
_rows = [{'support_calls': k % 10} for k in range(250)]
_out = predict_batch(_m, _rows, 100)
assert _m.calls == 3, f'250 rows, batch_size=100 → predict_proba should be called 3 times, you have {_m.calls}'
assert len(_out) == 250, 'One probability per row'
assert _out[:12] == [k % 10 / 10 for k in range(12)] and _out[-1] == 0.9, 'Probabilities in the original order, element [1]'
_m2 = CountingModel()
assert predict_batch(_m2, [], 50) == [] and _m2.calls == 0, 'For an empty list the model is not called'` } },
        { prompt: 'One worker handles a request in 25 ms and handles requests one after another. What is the maximum number of requests it can handle per second?', unit: 'requests/s', explain: '1000 ms / 25 ms = 40 requests/s. With 4 workers, about 160.' },
        { prompt: 'Marketing wants to see the churn probability of all 2 million subscribers in the CRM every morning. What is the best architecture?', options: ['The CRM sends a separate API request for each subscriber (2 million requests)', 'A nightly batch job: the model predicts all subscribers in chunks and writes the results to a database; the CRM reads from the database', 'Run the model in the CRM\'s browser', 'Send 2 million rows to the API in one request'], explain: 'Real time is not needed, and the volume is large: a classic case for batch scoring. An API is for answering one client quickly.' }
      ]
    },
    'dep-gate': {
      title: 'Module exam: Deployment',
      body: `
<p>Final check: saving and loading a model, endpoint logic, batch, Docker and a deployment plan. No hints. The pass mark is 75%.</p>`,
      ex: [
        { prompt: 'The full service cycle. (1) Train a <code>StandardScaler</code> + <code>LogisticRegression</code> pipeline on <code>data[FEATURES]</code> and save it to the file <code>gate_model.joblib</code>. (2) "At server start-up", load it into the variable <code>MODEL</code>. (3) <code>predict_endpoint(body)</code>: if any of the <code>FEATURES</code> is not a whole number ≥ 0 → <code>(422, {\'detail\': [error messages, each naming the field]})</code>; otherwise → <code>(200, {\'churn_probability\': p (3 decimals), \'model_version\': \'2.0.0\'})</code>.', check: { tests: String.raw`import os as _os
from sklearn.pipeline import Pipeline as _Pl
assert _os.path.exists('gate_model.joblib'), 'gate_model.joblib was not saved'
assert isinstance(MODEL, _Pl) and 'standardscaler' in MODEL.named_steps, 'MODEL is a Pipeline with a scaler, loaded from the file'
_s, _d = predict_endpoint({'support_calls': 5, 'tenure_months': 2, 'city': 'Алматы'})
_p = float(MODEL.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])
assert _s == 200 and _d == {'churn_probability': round(_p, 3), 'model_version': '2.0.0'}, f'Wrong response to a valid request: {_d}'
assert predict_endpoint({'tenure_months': 48, 'support_calls': 0})[1]['churn_probability'] < 0.5, 'A long-time customer should get a low probability'
_s, _d = predict_endpoint({'tenure_months': -1, 'support_calls': '2'})
assert _s == 422 and len(_d['detail']) == 2, 'Both fields are wrong → 422, 2 messages in detail'
assert any('tenure_months' in m for m in _d['detail']) and any('support_calls' in m for m in _d['detail']), 'The messages should contain the field names'
assert predict_endpoint({})[0] == 422, 'Empty body → 422'` } },
        { prompt: 'Write <code>batch_endpoint(body)</code>. <code>body[\'customers\']</code> must be a list: if it is missing, not a list or empty → <code>(422, {\'detail\': ...})</code>; if more than 100 → <code>(413, {\'detail\': ...})</code>. Each customer must have <code>tenure_months</code> and <code>support_calls</code> as whole numbers ≥ 0; if some customers are invalid → <code>(422, {\'detail\': [{\'index\': i, \'field\': field}, ...]})</code> (each bad field separately). If everything is valid → <code>(200, {\'predictions\': [risk, ...]})</code>, <code>risk = round(min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0)), 2)</code>.', check: { tests: String.raw`_ok = {'customers': [{'tenure_months': 3, 'support_calls': 4}, {'tenure_months': 30, 'support_calls': 1}, {'tenure_months': 2, 'support_calls': 9}]}
assert batch_endpoint(_ok) == (200, {'predictions': [0.7, 0.1, 1.0]}), f'A valid batch → 200 and [0.7, 0.1, 1.0], you have {batch_endpoint(_ok)}'
assert batch_endpoint({})[0] == 422, 'No customers → 422'
assert batch_endpoint({'customers': []})[0] == 422, 'Empty list → 422'
assert batch_endpoint({'customers': 'abc'})[0] == 422, 'Not a list → 422'
assert batch_endpoint({'customers': [{'tenure_months': 1, 'support_calls': 1}] * 101})[0] == 413, '101 customers → 413'
assert batch_endpoint({'customers': [{'tenure_months': 1, 'support_calls': 1}] * 100})[0] == 200, '100 customers is within the limit'
_s, _d = batch_endpoint({'customers': [{'tenure_months': 3, 'support_calls': 4}, {'tenure_months': -1}, {'tenure_months': 5, 'support_calls': 'x'}]})
assert _s == 422, 'If a customer is invalid → 422'
assert sorted((e['index'], e['field']) for e in _d['detail']) == [(1, 'support_calls'), (1, 'tenure_months'), (2, 'support_calls')], f'detail should show each bad field with index and field, you have {_d["detail"]}'` } },
        { prompt: 'The container is running (<code>docker run -p 8080:8000 churn-api:1.3.0</code>), <code>docker logs</code> shows "Uvicorn running on http://127.0.0.1:8000", but <code>curl localhost:8080/health</code> gets no answer. What needs fixing?', options: ['Change the port to <code>-p 8000:8080</code>', 'Start Uvicorn with <code>--host 0.0.0.0</code>: 127.0.0.1 is reachable only from inside the container', 'Rebuild the image with the <code>latest</code> tag', 'Add curl to requirements.txt'], explain: 'The server is listening only on the container\'s loopback interface. 0.0.0.0 listens on all interfaces, and then the port mapping works.' },
        { prompt: 'The service has 4 workers, each handling a request in 50 ms, one after another. What is the maximum number of requests per second one container can handle?', unit: 'requests/s', explain: 'One worker: 1000 / 50 = 20 requests/s. 4 workers: 80 requests/s.' },
        { prompt: 'Your team is taking the churn model from a notebook to production. Write a production-readiness review (at least 80 words): how the model is saved and loaded; how input is validated; how the Docker image and config are built; which platform it is deployed to and what the health check is; the latency target and the batch scenario. Then grade yourself honestly on the four criteria. To pass, every criterion must be at least <b>3 / 4</b>.', criteria: [
          { name: 'Model and input', levels: ['Not mentioned', 'Only "we save it with joblib"', 'The whole pipeline + metadata are saved; input is validated with a schema and returns 422', 'Also covers pinning versions and loading the model once'] },
          { name: 'Docker and config', levels: ['Not mentioned', 'Docker is named, no content', 'The main Dockerfile steps, 0.0.0.0, secrets in environment variables', 'Layer cache, .dockerignore, version tag and no secrets in the image'] },
          { name: 'Deployment and monitoring', levels: ['None', 'A platform is named', 'Platform, liveness/readiness and smoke test', 'Also covers logs, rollback and cold start/price'] },
          { name: 'Performance', levels: ['None', '"It should be fast"', 'A p95 target (for example, ≤ 200 ms) and how to measure it', 'A p95 target, a throughput calculation and the online/batch split'] }
        ] }
      ]
    }
  }
});
