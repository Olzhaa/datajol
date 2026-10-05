// M6.1 Software Eng for Data and M6.2 Deployment. Stdlib, pandas and scikit-learn in Pyodide; FastAPI, Docker, pytest and cloud tools are taught as text, runnable parts use small stubs.
(function () {
  const P = String.raw;

  // Tiny churn sample used by the sklearn exercises (12 rows, trains in milliseconds).
  const MINI = P`import pandas as pd
from sklearn.linear_model import LogisticRegression
data = pd.DataFrame({
    'tenure_months': [1, 2, 3, 5, 24, 36, 48, 12, 2, 60, 4, 30],
    'support_calls': [5, 4, 6, 3, 0, 1, 0, 1, 5, 0, 4, 1],
    'churned':       [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0],
})
FEATURES = ['tenure_months', 'support_calls']
`;

  DJ.modules['m6-1'] = {
    intro: 'Ноутбуктағы кодты басқалар қолдана алатын, тестіленген және қатесіз жұмыс істейтін Python кодына айналдыруды үйренесіз: функциялар, класстар, type hints, тесттер, logging, venv және REST API негіздері.',
    lessons: [
      {
        id: 'swe-1', title: 'Функциялар және модульдер', minutes: 14,
        body: `
<p>Ноутбукта жұмыс әдетте былай өседі: бір ұяшықта бағаны тазалайсыз, келесі айда сол кодты көшіріп, басқа файлға қолданасыз, сосын тағы бір рет. Үш көшірменің бірінде қате түзетілсе, қалған екеуінде қала береді. <b>Функция</b> бұл мәселені шешеді: логика бір жерде жазылады, атауы бар, кірісі мен шығысы анық.</p>
<h3>Жақсы функцияның белгілері</h3>
<ul>
<li><b>Бір міндет</b>: <code>parse_price</code> тек бағаны санға айналдырады, файл оқымайды, график салмайды.</li>
<li><b>Нәтижені <code>return</code> арқылы қайтарады</b>, <code>print</code> арқылы емес. Print-ті басқа код қолдана алмайды.</li>
<li><b>Түсінікті атау</b>: етістік + зат есім (<code>load_orders</code>, <code>clean_phone</code>).</li>
<li><b>Docstring</b>: не істейтінін бір жолмен түсіндіреді.</li>
<li><b>Әдепкі (default) мәндер</b>: жиі қолданылатын параметрге мән береді: <code>city='Алматы'</code>.</li>
</ul>
<h3>Мысал: Kaspi-стиліндегі дүкен экспорты</h3>
<p>Экспортта баға мәтін түрінде келеді: <code>"12 500 ₸"</code>. Оны санға айналдыратын функция:</p>
<pre><code>def parse_price(text):
    """'12 500 ₸' сияқты мәтінді бүтін санға (теңге) айналдырады."""
    digits = text.replace('₸', '').replace(' ', '').strip()
    return int(digits)

parse_price('12 500 ₸')   # 12500
parse_price('990₸')       # 990</code></pre>
<h3>Модуль деген не</h3>
<p>Функциялар көбейгенде оларды <b>модульге</b>, яғни жай <code>.py</code> файлға шығарамыз. Мысалы, <code>cleaning.py</code> файлында <code>parse_price</code> тұрады, ал ноутбук немесе басқа скрипт оны импорттайды:</p>
<pre><code># cleaning.py
def parse_price(text):
    ...

if __name__ == '__main__':
    # тек файлды тікелей іске қосқанда орындалады: python cleaning.py
    print(parse_price('12 500 ₸'))

# report.py
from cleaning import parse_price</code></pre>
<p><code>if __name__ == '__main__':</code> блогы файлды импорттағанда <b>орындалмайды</b>. Сондықтан модульде тексеру кодын сол блокқа қоямыз, әйтпесе әр импорт кезінде ол іске қосылып кетеді.</p>
<div class="tip">Ереже: бір кодты екінші рет көшіргіңіз келсе, оны функцияға айналдыратын уақыт келді.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>parse_price(text)</code> функциясын жазыңыз: <code>"12 500 ₸"</code> → <code>12500</code>, <code>"990₸"</code> → <code>990</code>, <code>" 3 490 ₸ "</code> → <code>3490</code>. Нәтиже <code>int</code> болсын және <code>return</code> арқылы қайтарылсын.', starter: P`def parse_price(text):
    # ₸ белгісін және бос орындарды алып тастап, int-ке айналдырыңыз
    pass
`, solution: P`def parse_price(text):
    """'12 500 ₸' сияқты мәтінді бүтін санға айналдырады."""
    digits = text.replace('₸', '').replace(' ', '').strip()
    return int(digits)

print(parse_price('12 500 ₸'))
`, hints: ['<code>text.replace(\'₸\', \'\')</code> белгіні жояды, <code>.replace(\' \', \'\')</code> бос орындарды жояды.', 'Соңында <code>return int(digits)</code>.'], check: { tests: P`assert parse_price('12 500 ₸') == 12500, 'parse_price("12 500 ₸") 12500 қайтаруы керек'
assert parse_price('990₸') == 990, 'parse_price("990₸") 990 қайтаруы керек'
assert parse_price(' 3 490 ₸ ') == 3490, 'Шеттегі бос орындарды да алып тастаңыз'
assert isinstance(parse_price('100 ₸'), int), 'Нәтиже int болуы керек'` } },
          { type: 'python', xp: 20, prompt: '<code>city_revenue(orders, city=\'Алматы\')</code> функциясын жазыңыз: <code>orders</code> — сөздіктер тізімі (<code>city</code>, <code>amount</code>), функция берілген қаладағы <code>amount</code> қосындысын қайтарады. Қала берілмесе, Алматы есептеледі.', starter: P`orders = [
    {'city': 'Алматы', 'amount': 12000},
    {'city': 'Астана', 'amount': 8000},
    {'city': 'Алматы', 'amount': 5500},
    {'city': 'Шымкент', 'amount': 3000},
]

def city_revenue(orders, city):
    total = 0
    for o in orders:
        print(o)
    return total
`, solution: P`orders = [
    {'city': 'Алматы', 'amount': 12000},
    {'city': 'Астана', 'amount': 8000},
    {'city': 'Алматы', 'amount': 5500},
    {'city': 'Шымкент', 'amount': 3000},
]

def city_revenue(orders, city='Алматы'):
    """Берілген қаладағы тапсырыстар сомасы."""
    total = 0
    for o in orders:
        if o['city'] == city:
            total += o['amount']
    return total

print(city_revenue(orders), city_revenue(orders, 'Астана'))
`, hints: ['Параметрге әдепкі мән: <code>def city_revenue(orders, city=\'Алматы\'):</code>', 'Циклде <code>if o[\'city\'] == city:</code> болса ғана <code>total += o[\'amount\']</code>.'], check: { tests: P`_o = [{'city': 'Алматы', 'amount': 100}, {'city': 'Астана', 'amount': 40}, {'city': 'Алматы', 'amount': 1}]
assert city_revenue(_o) == 101, 'Қала берілмесе, Алматы бойынша қосынды керек (city параметрінің әдепкі мәні)'
assert city_revenue(_o, 'Астана') == 40, 'city="Астана" болса, тек Астана тапсырыстары қосылады'
assert city_revenue(_o, 'Орал') == 0, 'Тапсырыс жоқ қала үшін 0'` } },
          { type: 'quiz', xp: 10, prompt: '<code>cleaning.py</code> файлының соңында <code>if __name__ == \'__main__\':</code> блогы бар. Басқа файлда <code>from cleaning import parse_price</code> жазылды. Сол блоктың ішіндегі код не болады?', options: ['Импорт кезінде бір рет орындалады', 'Орындалмайды: ол тек <code>python cleaning.py</code> деп тікелей іске қосқанда жұмыс істейді', 'Импорт қатемен аяқталады', '<code>parse_price</code> шақырылған сайын орындалады'], answer: 1, explain: 'Импорттағанда <code>__name__</code> мәні <code>"cleaning"</code> болады, ал тікелей іске қосқанда <code>"__main__"</code>. Сондықтан блок тек тікелей іске қосуда орындалады.' }
        ]
      },
      {
        id: 'swe-2', title: 'Type hints: кодқа типтер жазу', minutes: 12,
        body: `
<p><b>Type hints</b> (тип аннотациялары) функцияның қандай дерек күтетінін және не қайтаратынын көрсетеді. Python оларды орындау кезінде тексермейді, бірақ олар үш жерде көмектеседі: оқитын адамға (құжат ретінде), редакторға (автотолықтыру мен ескертулер) және <b>mypy</b> сияқты тексеру құралдарына.</p>
<h3>Синтаксис</h3>
<pre><code>def average_check(amounts: list[float]) -> float:
    if not amounts:
        return 0.0
    return sum(amounts) / len(amounts)

def find_customer(customers: dict[str, str], phone: str) -> str | None:
    return customers.get(phone)   # табылмаса None</code></pre>
<table>
<tr><th>Жазу</th><th>Мағынасы</th></tr>
<tr><td><code>x: int</code></td><td>бүтін сан</td></tr>
<tr><td><code>list[float]</code></td><td>float-тардың тізімі</td></tr>
<tr><td><code>dict[str, int]</code></td><td>кілті str, мәні int сөздік</td></tr>
<tr><td><code>str | None</code></td><td>мәтін немесе None (ескі жазуы <code>Optional[str]</code>)</td></tr>
<tr><td><code>-> None</code></td><td>функция ештеңе қайтармайды</td></tr>
<tr><td><code>pd.DataFrame</code></td><td>pandas кестесі</td></tr>
</table>
<h3>Hint тексермейді, mypy тексереді</h3>
<pre><code>average_check('500')   # Python hint-ті тексермейді, қате тек функция ішінен шығады
$ mypy report.py
report.py:12: error: Argument 1 to "average_check" has incompatible type "str"; expected "list[float]"</code></pre>
<p>Командада mypy-ды CI-ға қосады: код merge болмас бұрын тип қателері табылады. Деректі өңдейтін кодта бұл өте пайдалы: «бұл функция DataFrame ала ма, әлде тізім бе?» деген сұрақ өздігінен жойылады.</p>
<h3>Аннотацияларды қайдан көруге болады</h3>
<p>Функцияның <code>__annotations__</code> атрибуты hints-ті сөздік ретінде сақтайды:</p>
<pre><code>average_check.__annotations__
# {'amounts': list[float], 'return': &lt;class 'float'&gt;}</code></pre>
<div class="tip">Hints-ті ең алдымен басқалар шақыратын функцияларға (модульдің «API»-ына) жазыңыз. Ішкі уақытша айнымалыларға міндетті емес.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: '<code>average_check</code> функциясына type hints қосыңыз: параметр <code>amounts</code> — <code>list[float]</code>, қайтаратыны — <code>float</code>. Бос тізім үшін <code>0.0</code> қайтарсын.', starter: P`def average_check(amounts):
    return sum(amounts) / len(amounts)
`, solution: P`def average_check(amounts: list[float]) -> float:
    if not amounts:
        return 0.0
    return sum(amounts) / len(amounts)

print(average_check([1200.0, 800.0]))
`, hints: ['Параметрдің артынан <code>: list[float]</code>, жақшадан кейін <code>-> float</code>.', 'Бос тізімді <code>if not amounts: return 0.0</code> арқылы тексеріңіз.'], check: { tests: P`_a = average_check.__annotations__
assert _a.get('amounts') == list[float], 'amounts параметрінің hint-і list[float] болуы керек'
assert _a.get('return') is float, 'Қайтару hint-і: -> float'
assert average_check([]) == 0.0, 'Бос тізім үшін 0.0 қайтарыңыз (нөлге бөлу болмасын)'
assert average_check([1000.0, 3000.0]) == 2000.0, 'Орташа дұрыс есептелуі керек'` } },
          { type: 'python', xp: 20, prompt: '<code>find_customer(customers, phone)</code> функциясын hints-пен жазыңыз: <code>customers: dict[str, str]</code> (телефон → аты), <code>phone: str</code>, қайтаратыны <code>str | None</code>. Телефон табылмаса <code>None</code> қайтсын.', starter: P`def find_customer(customers, phone):
    return customers[phone]
`, solution: P`def find_customer(customers: dict[str, str], phone: str) -> str | None:
    return customers.get(phone)

print(find_customer({'77011234567': 'Айгерім'}, '77011234567'))
`, hints: ['<code>customers.get(phone)</code> кілт жоқ болса <code>None</code> қайтарады.', 'Қайтару hint-і: <code>-> str | None</code>.'], check: { tests: P`import typing as _t
_a = find_customer.__annotations__
assert _a.get('customers') == dict[str, str], 'customers hint-і: dict[str, str]'
assert _a.get('phone') is str, 'phone hint-і: str'
assert set(_t.get_args(_a.get('return'))) == {str, type(None)}, 'Қайтару hint-і: str | None'
assert find_customer({'7701': 'Ерлан'}, '7701') == 'Ерлан', 'Табылған клиенттің атын қайтарыңыз'
assert find_customer({'7701': 'Ерлан'}, '7777') is None, 'Табылмаса None қайтарыңыз, KeyError емес'` } },
          { type: 'quiz', xp: 10, prompt: '<code>def total(x: list[int]) -> int</code> функциясын <code>total("abc")</code> деп шақырдық. Не болады?', options: ['Python бірден TypeError береді, себебі hint бойынша list керек', 'Python hint-ті тексермейді: код іске қосылады (қате болса, функцияның ішінен шығады); mypy бұл шақыруды алдын ала белгілейді', 'Hint мәтінді тізімге автоматты айналдырады', 'Функция әрқашан 0 қайтарады'], answer: 1, explain: 'Type hints орындау кезінде тексерілмейді. Оларды mypy сияқты статикалық тексеру құралдары немесе Pydantic сияқты кітапханалар пайдаланады.' }
        ]
      },
      {
        id: 'swe-3', title: 'OOP: pipeline және model wrapper класстары', minutes: 16,
        body: `
<p>Функция күйді (state) сақтамайды: шақырдыңыз, нәтиже алдыңыз. Ал кейде объект бір нәрсені <b>есте сақтауы</b> керек. Мысалы, масштабтау: min мен max train деректен бір рет есептеледі, сосын жаңа деректің бәріне <b>сол</b> мәндермен қолданылады. Мұндайда <b>класс</b> қолданамыз: дерек (атрибуттар) мен әрекет (методтар) бір жерде тұрады.</p>
<h3>Негізгі сөздер</h3>
<ul>
<li><code>class</code> — үлгі (сызба). <b>Объект</b> (instance) — сол үлгіден жасалған нақты дана.</li>
<li><code>__init__</code> — объект жасалғанда шақырылатын метод, бастапқы баптауларды сақтайды.</li>
<li><code>self</code> — объектінің өзі. <code>self.min_</code> — объектінің атрибуты.</li>
<li><b>Метод</b> — класс ішіндегі функция: <code>scaler.fit(...)</code>.</li>
</ul>
<h3>Мысал: scikit-learn стиліндегі transformer</h3>
<pre><code>class RangeScaler:
    def fit(self, values):
        self.min_ = min(values)
        self.max_ = max(values)
        return self            # fit(...).transform(...) тізбегі үшін

    def transform(self, values):
        span = self.max_ - self.min_
        return [(v - self.min_) / span for v in values]

scaler = RangeScaler().fit([100, 300, 500])   # train
scaler.transform([200, 500])                  # [0.25, 1.0]</code></pre>
<p>sklearn-дағы барлық transformer осы келісіммен жұмыс істейді: <code>fit</code> параметрлерді үйренеді (атауы <code>_</code>-мен аяқталады), <code>transform</code> оларды қолданады. Train мен test-ті бөлек өңдеу осының арқасында оңай.</p>
<h3>Model wrapper</h3>
<p>Өнімде модельдің айналасында қосымша логика көп: белгілердің реті, шек (threshold), нұсқа. Мұның бәрін бір класқа ораймыз:</p>
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
<p>API немесе ноутбук енді белгілердің ретін білмейді: ол тек <code>predict_one({...})</code> шақырады. Белгі қосылса, тек класс өзгереді.</p>
<div class="tip">Баптау параметрлерін сақтау үшін <code>@dataclass</code> ыңғайлы: <code>__init__</code>-ті Python өзі жазады. Мұрагерлік (inheritance) деректе сирек керек: алдымен қарапайым класс пен композициядан бастаңыз.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>RangeScaler</code> класын жазыңыз: <code>fit(values)</code> <code>self.min_</code> мен <code>self.max_</code>-ты сақтап, <code>self</code> қайтарады; <code>transform(values)</code> әр мәнді <code>(v - min_) / (max_ - min_)</code> етіп тізім қайтарады.', starter: P`class RangeScaler:
    def fit(self, values):
        pass

    def transform(self, values):
        pass
`, solution: P`class RangeScaler:
    def fit(self, values):
        self.min_ = min(values)
        self.max_ = max(values)
        return self

    def transform(self, values):
        span = self.max_ - self.min_
        return [(v - self.min_) / span for v in values]

print(RangeScaler().fit([100, 300, 500]).transform([200, 500]))
`, hints: ['<code>fit</code> ішінде <code>self.min_ = min(values)</code>, <code>self.max_ = max(values)</code>, соңында <code>return self</code>.', '<code>transform</code>: <code>[(v - self.min_) / (self.max_ - self.min_) for v in values]</code>.'], check: { tests: P`_s = RangeScaler()
assert _s.fit([10, 20, 30]) is _s, 'fit() self қайтаруы керек'
assert _s.min_ == 10 and _s.max_ == 30, 'fit() min_ және max_ атрибуттарын сақтауы керек'
assert _s.transform([10, 20, 30]) == [0.0, 0.5, 1.0], 'transform([10, 20, 30]) → [0.0, 0.5, 1.0]'
assert _s.transform([40]) == [1.5], 'transform train-дегі min/max-ты қолданады (жаңа деректен қайта есептемейді)'` } },
          { type: 'python', xp: 25, prompt: '<code>ChurnModel</code> wrapper-ін аяқтаңыз: <code>__init__</code> <code>features</code> мен <code>threshold</code>-ты сақтап, <code>LogisticRegression()</code> жасайды; <code>fit(df, target)</code> модельді тек <code>self.features</code> бағандарында үйретіп, <code>self</code> қайтарады; <code>predict_one(customer)</code> кету ықтималдығын <code>float</code> ретінде қайтарады; <code>is_risky(customer)</code> ықтималдық шектен үлкен немесе тең болса <code>True</code>. Соңында <code>cm = ChurnModel(FEATURES, threshold=0.5).fit(data, \'churned\')</code>.', starter: MINI + P`
class ChurnModel:
    def __init__(self, features, threshold=0.5):
        pass

    def fit(self, df, target):
        pass

    def predict_one(self, customer):
        pass

    def is_risky(self, customer):
        pass
`, solution: MINI + P`
class ChurnModel:
    def __init__(self, features, threshold=0.5):
        self.features = features
        self.threshold = threshold
        self.model = LogisticRegression()

    def fit(self, df, target):
        self.model.fit(df[self.features], df[target])
        return self

    def predict_one(self, customer):
        row = pd.DataFrame([customer])[self.features]
        return float(self.model.predict_proba(row)[0, 1])

    def is_risky(self, customer):
        return self.predict_one(customer) >= self.threshold

cm = ChurnModel(FEATURES, threshold=0.5).fit(data, 'churned')
print(cm.predict_one({'tenure_months': 2, 'support_calls': 5, 'city': 'Алматы'}))
`, hints: ['<code>predict_one</code>: <code>pd.DataFrame([customer])[self.features]</code> артық кілттерді (мысалы, city) алып тастайды және ретті сақтайды.', '<code>self.model.predict_proba(row)[0, 1]</code> — 1-класс (кетеді) ықтималдығы. <code>fit</code> соңында <code>return self</code>.'], check: { tests: P`assert isinstance(cm, ChurnModel), 'cm = ChurnModel(...).fit(...) болуы керек: fit() self қайтарсын'
assert cm.features == FEATURES and cm.threshold == 0.5, '__init__ features пен threshold-ты сақтауы керек'
assert hasattr(cm.model, 'coef_') and cm.model.n_features_in_ == 2, 'Модель тек features бағандарында үйретілуі керек (2 белгі)'
_hi = cm.predict_one({'support_calls': 6, 'tenure_months': 1, 'city': 'Астана'})
_lo = cm.predict_one({'tenure_months': 50, 'support_calls': 0})
assert isinstance(_hi, float) and 0 <= _hi <= 1, 'predict_one 0 мен 1 аралығындағы float қайтаруы керек'
assert _hi > 0.5 > _lo, 'Жаңа, шағымы көп абонентте ықтималдық жоғары болуы керек'
assert cm.is_risky({'tenure_months': 1, 'support_calls': 6}) is True and cm.is_risky({'tenure_months': 50, 'support_calls': 0}) is False, 'is_risky ықтималдықты threshold-пен салыстырады'
_strict = ChurnModel(FEATURES, threshold=0.999).fit(data, 'churned')
assert _strict.is_risky({'tenure_months': 3, 'support_calls': 4}) is False, 'is_risky self.threshold-ты қолдануы керек'` } },
          { type: 'quiz', xp: 10, prompt: 'Неге transformer-де <code>fit</code> пен <code>transform</code> бөлек методтар?', options: ['Python бір методта екі әрекетке рұқсат бермейді', 'Параметрлерді (min, max) тек train деректен бір рет үйреніп, test пен жаңа деректерге сол мәндермен қолдану үшін: әйтпесе leakage болады және масштаб әр жолы өзгереді', 'Код жылдам жұмыс істеуі үшін ғана', 'transform әрқашан fit-ті ішінен қайта шақырады'], answer: 1, explain: 'fit = үйрену (тек train), transform = қолдану (кез келген дерек). Test-те қайта fit жасау — leakage, ал өнімде әр сұрауда масштаб әртүрлі болып кетеді.' }
        ]
      }
      ,
      {
        id: 'swe-4', title: 'Тестілеу: assert және pytest', minutes: 16,
        body: `
<p>Тест — кодыңыздың дұрыс жұмыс істейтінін <b>автоматты түрде</b> тексеретін кішкене функция. Бүгін <code>parse_price</code> дұрыс, ал ертең әріптесіңіз оны «жақсартып», <code>"990₸"</code> форматын бұзып жіберуі мүмкін. Тест мұны merge-ден бұрын ұстайды. Дерек командаларында тест әсіресе тазалау функцияларына, белгілерді есептеуге және API-дің кіріс-шығысына жазылады.</p>
<h3>assert: ең қарапайым тест</h3>
<pre><code>def test_parse_price():
    assert parse_price('12 500 ₸') == 12500
    assert parse_price('990₸') == 990
    assert parse_price('0 ₸') == 0</code></pre>
<p><code>assert шарт</code> шарт жалған болса <code>AssertionError</code> лақтырады. Тест функциясы ештеңе қайтармайды: қате шықпаса, тест өтті.</p>
<h3>pytest</h3>
<p><b>pytest</b> — Python-дағы стандартты тест құралы. Ол <code>test_*.py</code> файлдарынан <code>test_</code>-пен басталатын функцияларды өзі тауып, іске қосады:</p>
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

def test_city_revenue(orders):        # fixture атауымен параметр ретінде келеді
    assert city_revenue(orders, 'Астана') == 40

$ pytest -q
.....                                  [100%]
5 passed in 0.04s</code></pre>
<ul>
<li><code>parametrize</code> — бір тестті бірнеше кіріспен қайталайды.</li>
<li><code>pytest.raises</code> — функция қате <b>лақтыруы керек</b> екенін тексереді.</li>
<li><code>fixture</code> — бірнеше тестке ортақ дайын дерек.</li>
</ul>
<h3>Нені тестілейміз</h3>
<ol>
<li><b>Қалыпты жағдай</b>: әдеттегі кіріс.</li>
<li><b>Шекаралық жағдай</b>: бос тізім, 0, бір элемент, бос орынсыз формат.</li>
<li><b>Қате кіріс</b>: функция түсінікті қатемен тоқтауы керек.</li>
</ol>
<div class="tip">Жақсы тест <b>қате кодты ұстайды</b>. Тексеру: функцияны әдейі бұзып көріңіз. Тест бәрібір өтсе, ол ештеңені тексермейді. Төмендегі тапсырмалар дәл осылай тексеріледі: сіздің тестіңіз бұзылған нұсқаларда құлауы керек.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>test_parse_price()</code> тест функциясын жазыңыз. Ол кемінде үш жағдайды тексерсін: <code>"12 500 ₸"</code> → 12500, <code>"990₸"</code> → 990, <code>"0 ₸"</code> → 0. Дұрыс функцияда тест өтуі, ал бұзылған нұсқаларда <code>AssertionError</code> беруі керек.', starter: P`def parse_price(text):
    return int(text.replace('₸', '').replace(' ', '').strip())

def test_parse_price():
    # осында assert-тер жазыңыз
    pass

test_parse_price()
print('тест өтті')
`, solution: P`def parse_price(text):
    return int(text.replace('₸', '').replace(' ', '').strip())

def test_parse_price():
    assert parse_price('12 500 ₸') == 12500
    assert parse_price('990₸') == 990
    assert parse_price('0 ₸') == 0

test_parse_price()
print('тест өтті')
`, hints: ['Әр жағдайға бір жол: <code>assert parse_price(\'12 500 ₸\') == 12500</code>.', 'Бос орынсыз <code>"990₸"</code> жағдайын ұмытпаңыз: кейбір қате нұсқалар тек сонда құлайды.'], check: { tests: P`_ok = parse_price
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
assert _catches(lambda t: int(t.replace('₸', '').strip().split(' ')[0])), 'Тестіңіз "12 500 ₸" жағдайын тексермейді: тек бірінші бөлікті алатын қате нұсқа өтіп кетті'
assert _catches(lambda t: int(t[:-2].replace(' ', ''))), 'Тестіңіз "990₸" (бос орынсыз) жағдайын тексермейді'
assert _catches(lambda t: int(t.replace('₸', '').replace(' ', '')) or None), 'Тестіңіз "0 ₸" жағдайын тексермейді'` } },
          { type: 'python', xp: 25, prompt: '<code>apply_discount(price, percent)</code> үшін <code>test_apply_discount()</code> жазыңыз: (1) 10 000 ₸-ге 10% жеңілдік → 9000; (2) 0% → баға өзгермейді; (3) <code>percent=150</code> болса функция <code>ValueError</code> лақтыруы керек (pytest жоқ, сондықтан <code>try/except</code> қолданыңыз).', starter: P`def apply_discount(price, percent):
    if not 0 <= percent <= 100:
        raise ValueError('percent 0 мен 100 аралығында болуы керек')
    return price * (100 - percent) / 100

def test_apply_discount():
    assert apply_discount(10000, 10) == 9000

test_apply_discount()
`, solution: P`def apply_discount(price, percent):
    if not 0 <= percent <= 100:
        raise ValueError('percent 0 мен 100 аралығында болуы керек')
    return price * (100 - percent) / 100

def test_apply_discount():
    assert apply_discount(10000, 10) == 9000
    assert apply_discount(5000, 0) == 5000
    try:
        apply_discount(1000, 150)
    except ValueError:
        pass
    else:
        raise AssertionError('percent=150 болғанда ValueError күтілді')

test_apply_discount()
print('тест өтті')
`, hints: ['Қатені тексеру үлгісі: <code>try: apply_discount(1000, 150)</code>, <code>except ValueError: pass</code>, <code>else: raise AssertionError(...)</code>.', '<code>else</code> блогы тек қате <b>шықпаса</b> орындалады: дәл сол жағдайда тест құлауы керек.'], check: { tests: P`_ok = apply_discount
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
assert _catches(_b1), 'Тестіңіз percent=150 жағдайын ұстамайды: ValueError лақтырмайтын нұсқа өтіп кетті'
assert _catches(_b2), 'Тестіңіз 0% жағдайын тексермейді'
assert _catches(_b3), 'Тестіңіз жеңілдіктің формуласын тексермейді(10000, 10 → 9000)'` } },
          { type: 'quiz', xp: 10, prompt: 'pytest қай функцияны тест деп тауып, іске қосады?', options: ['<code>cleaning.py</code> ішіндегі <code>check_price()</code>', '<code>tests/test_cleaning.py</code> ішіндегі <code>test_parse_price()</code>', '<code>tests/cleaning_tests.py</code> ішіндегі <code>parse_price_test()</code>', 'Кез келген файлдағы <code>assert</code> бар кез келген функция'], answer: 1, explain: 'Әдепкі ереже: файл атауы <code>test_*.py</code> (немесе <code>*_test.py</code>), функция атауы <code>test_</code>-пен басталады.' },
          { type: 'quiz', xp: 10, prompt: 'Тестіңіз бар, бірақ функцияны әдейі бұзсаңыз да тест өте береді. Бұл не білдіреді?', options: ['Функция өте сенімді', 'Тест ештеңені тексермейді: оған функция бұзылғанда құлайтын assert-тер керек', 'pytest қате орнатылған', 'Тестті жою керек, ол артық'], answer: 1, explain: 'Тесттің мақсаты — қатені ұстау. Бұзылған кодта құламайтын тест жалған сенім береді.' }
        ]
      },
      {
        id: 'swe-5', title: 'Қателерді өңдеу және logging', minutes: 15,
        body: `
<p>Нақты деректе қате жол әрқашан болады: сома орнында «—», теріс сан, бос ұяшық. Код мұндайда не <b>бүкіл pipeline-ды құлатады</b>, не (одан да жаман) қате мәнді <b>үнсіз</b> өткізеді. Дұрыс тәсіл: қатені нақты жерде анықтау, түсінікті хабармен лақтыру, жоғарғы деңгейде өңдеу және журналға (log) жазу.</p>
<h3>try / except / raise</h3>
<pre><code>def parse_amount(value):
    amount = float(value)                    # 'abc' болса өзі ValueError береді
    if amount &lt; 0:
        raise ValueError(f'Сома теріс болмауы керек: {amount}')
    return amount

try:
    parse_amount('-500')
except ValueError as e:
    print('Қате жол:', e)</code></pre>
<ul>
<li><b>Нақты қатені</b> ұстаңыз: <code>except ValueError</code>. Жай <code>except:</code> бәрін, тіпті код қателерін де жасырады.</li>
<li><code>else</code> — қате шықпаса орындалады, <code>finally</code> — әрқашан (файлды жабу, байланысты үзу).</li>
<li>Өз қатеңізді класс ретінде жасауға болады: <code>class DataQualityError(Exception): pass</code>.</li>
</ul>
<h3>Неге print емес, logging</h3>
<p><code>print</code> серверде жоғалып кетеді, деңгейі жоқ, уақыты жоқ. <b>logging</b> модулі хабарға деңгей, уақыт және көзін қосады, ал шығатын жерін (консоль, файл, бұлттағы log жүйесі) кодты өзгертпей баптауға болады.</p>
<table>
<tr><th>Деңгей</th><th>Қашан</th></tr>
<tr><td>DEBUG</td><td>әзірлеу кезіндегі егжей-тегжей</td></tr>
<tr><td>INFO</td><td>қалыпты оқиға: «2 400 жол жүктелді»</td></tr>
<tr><td>WARNING</td><td>күдікті, бірақ жұмыс жалғасады: «жол өткізілді»</td></tr>
<tr><td>ERROR</td><td>операция орындалмады: «файл ашылмады»</td></tr>
<tr><td>CRITICAL</td><td>бүкіл сервис тоқтады</td></tr>
</table>
<pre><code>import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s: %(message)s')
logger = logging.getLogger('orders')

logger.info('Жүктеу басталды')
logger.warning('Жол өткізілді: %s', row)</code></pre>
<p>Әр модуль өз logger-ін <code>logging.getLogger(__name__)</code> арқылы алады, сонда журналда хабардың қай файлдан келгені көрінеді.</p>
<div class="tip">Pipeline-да жиі ереже: жеке жолдағы қате → WARNING және жолды өткізу; барлық жолдың 5%-ынан көбі қате болса → ERROR және тоқтау. Үнсіз өткізу ешқашан болмасын.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>parse_amount(value)</code> жазыңыз: мәнді <code>float</code>-қа айналдырады; бос мәтін немесе сан емес мәтін болса <code>ValueError</code>; теріс сан болса <code>ValueError</code> (хабарында «теріс» сөзі болсын).', starter: P`def parse_amount(value):
    return float(value)
`, solution: P`def parse_amount(value):
    amount = float(value)
    if amount < 0:
        raise ValueError(f'Сома теріс болмауы керек: {amount}')
    return amount

print(parse_amount('12500'))
`, hints: ['<code>float(\'\')</code> және <code>float(\'abc\')</code> өздері ValueError береді.', 'Теріс мән үшін: <code>if amount < 0: raise ValueError(\'Сома теріс болмауы керек\')</code>.'], check: { tests: P`assert parse_amount('12500') == 12500.0 and parse_amount(300) == 300.0, 'Қалыпты мәндер float-қа айналуы керек'
assert parse_amount('0') == 0.0, '0 — дұрыс сома'
for _v in ['', 'abc', '-500']:
    try:
        parse_amount(_v)
    except ValueError as _e:
        if _v == '-500':
            assert 'теріс' in str(_e), 'Теріс сома хабарында «теріс» сөзі болсын'
    else:
        raise AssertionError(f'parse_amount({_v!r}) ValueError лақтыруы керек')` } },
          { type: 'python', xp: 25, prompt: '<code>load_orders(rows)</code> жазыңыз: әр жолдың <code>amount</code> мәнін <code>parse_amount</code> арқылы тексереді. Дұрыс жолдарды (amount float-қа айналған көшірмесін) <code>good</code> тізіміне қосады, қате жолда <code>logger.warning(...)</code> жазып, оны өткізеді. <code>(good, bad_count)</code> қайтарады.', starter: P`import logging
logger = logging.getLogger('orders')

def parse_amount(value):
    amount = float(value)
    if amount < 0:
        raise ValueError(f'Сома теріс болмауы керек: {amount}')
    return amount

def load_orders(rows):
    good = [dict(r, amount=parse_amount(r['amount'])) for r in rows]
    return good, 0
`, solution: P`import logging
logger = logging.getLogger('orders')

def parse_amount(value):
    amount = float(value)
    if amount < 0:
        raise ValueError(f'Сома теріс болмауы керек: {amount}')
    return amount

def load_orders(rows):
    good, bad_count = [], 0
    for r in rows:
        try:
            amount = parse_amount(r['amount'])
        except ValueError as e:
            bad_count += 1
            logger.warning('Жол өткізілді (%s): %s', r.get('order_id'), e)
            continue
        good.append(dict(r, amount=amount))
    return good, bad_count

rows = [{'order_id': 1, 'amount': '5000'}, {'order_id': 2, 'amount': '—'}]
print(load_orders(rows))
`, hints: ['Циклдің ішінде <code>try: amount = parse_amount(r[\'amount\'])</code>, <code>except ValueError as e:</code> → санауышты арттырып, <code>logger.warning(...)</code>, <code>continue</code>.', 'Дұрыс жолды көшіріп қосыңыз: <code>good.append(dict(r, amount=amount))</code>.'], check: { tests: P`import logging as _lg
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
assert _bad == 2, f'Екі қате жол болуы керек, сізде {_bad}'
assert [g['order_id'] for g in _good] == [1, 4], 'good тізімінде тек 1 және 4 жолдар қалуы керек'
assert _good[1]['amount'] == 250.5, 'good ішінде amount float-қа айналған болсын'
assert _rows[3]['amount'] == '250.5', 'Кіріс жолдарды өзгертпеңіз: dict(r, amount=...) көшірмесін жасаңыз'
assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 2, 'Әр қате жол үшін logger.warning бір рет шақырылуы керек'` } },
          { type: 'quiz', xp: 10, prompt: 'Түнгі pipeline 50 000 жолдың 3-еуін бұзылған күн форматы үшін өткізіп жіберді, қалғаны сәтті жүктелді. Бұл оқиғаны қай деңгеймен журналға жазасыз?', options: ['DEBUG', 'WARNING', 'CRITICAL', 'Ешқандай, жазудың қажеті жоқ'], answer: 1, explain: 'Жұмыс жалғасты, бірақ назар аударатын жағдай бар: бұл WARNING. CRITICAL — бүкіл сервис тоқтағанда, ал үнсіз өткізу дерек сапасын жасырады.' }
        ]
      },
      {
        id: 'swe-6', title: 'Virtual environment және requirements.txt', minutes: 12,
        body: `
<p>Сіздің ноутбукта pandas 2.2 тұр, ал әріптесіңізде 1.5, серверде мүлде жоқ. Бір жобада жұмыс істейтін код басқасында құлайды. <b>Virtual environment</b> (venv) — әр жобаға арналған жеке Python «қорабы»: оның ішіне орнатылған кітапханалар басқа жобаларға әсер етпейді.</p>
<h3>Негізгі командалар</h3>
<pre><code>python -m venv .venv              # жоба папкасында бір рет
source .venv/bin/activate         # macOS / Linux
.venv\\Scripts\\activate            # Windows
pip install pandas scikit-learn   # тек осы .venv ішіне орнатылады
pip freeze > requirements.txt     # нақты нұсқаларды файлға жазу
deactivate                        # шығу</code></pre>
<p>Жаңа адам (немесе сервер) жобаны былай қайта құрады:</p>
<pre><code>git clone ... && cd churn-api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt</code></pre>
<h3>requirements.txt</h3>
<pre><code># API тәуелділіктері
pandas==2.2.3
scikit-learn==1.6.1
fastapi==0.115.0
numpy>=1.26</code></pre>
<ul>
<li><code>==</code> — нұсқаны <b>бекіту</b> (pin). Өнімге және модельге міндетті: pickle-мен сақталған модель sklearn-нің басқа нұсқасында ашылмауы мүмкін.</li>
<li><code>>=</code> — ең төменгі нұсқа. Кітапхана жазғанда ыңғайлы, бірақ ертең басқа нұсқа орнатылуы мүмкін.</li>
<li><code>.venv</code> папкасы git-ке <b>салынбайды</b>: оны <code>.gitignore</code>-ға қосыңыз. Git-те тек requirements.txt тұрады.</li>
</ul>
<h3>Жоба құрылымы</h3>
<pre><code>churn-api/
├── .venv/              (git-те жоқ)
├── src/churn/          модульдер: cleaning.py, model.py, api.py
├── tests/              test_cleaning.py, test_api.py
├── notebooks/          зерттеу ноутбуктары
├── requirements.txt
└── README.md</code></pre>
<div class="tip">Баламалар: <b>conda</b> (Python-нан тыс кітапханалар керек болса), <b>poetry</b> және <b>uv</b> (тәуелділіктерді lock-файлмен басқарады, uv өте жылдам). Идеясы бәрінде бірдей: жобаға жеке орта және нұсқалары бекітілген тізім.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>parse_requirements(text)</code> жазыңыз: requirements.txt мәтінінен <code>{кітапхана: нұсқа}</code> сөздігін қайтарады. <code>==</code> арқылы бекітілген жолдарда нұсқа жазылады, басқа жолдарда (<code>>=</code> немесе нұсқасыз) — <code>None</code>. Бос жолдар мен <code>#</code> түсініктемелер (жол соңындағысы да) еленбейді.', starter: P`req = """# API тәуелділіктері
pandas==2.2.3
scikit-learn==1.6.1   # модель осы нұсқада сақталған

numpy>=1.26
joblib
"""

def parse_requirements(text):
    result = {}
    for line in text.splitlines():
        name, version = line.split('==')
        result[name] = version
    return result
`, solution: P`req = """# API тәуелділіктері
pandas==2.2.3
scikit-learn==1.6.1   # модель осы нұсқада сақталған

numpy>=1.26
joblib
"""

def parse_requirements(text):
    result = {}
    for line in text.splitlines():
        line = line.split('#')[0].strip()
        if not line:
            continue
        if '==' in line:
            name, version = line.split('==')
            result[name.strip()] = version.strip()
        else:
            name = line.split('>=')[0].strip()
            result[name] = None
    return result

print(parse_requirements(req))
`, hints: ['Әр жолдан алдымен түсініктемені кесіңіз: <code>line.split(\'#\')[0].strip()</code>; бос болса <code>continue</code>.', '<code>==</code> болмаса, атауды <code>line.split(\'>=\')[0].strip()</code> арқылы алып, мәнін <code>None</code> етіңіз.'], check: { tests: P`_r = parse_requirements(req)
assert _r == {'pandas': '2.2.3', 'scikit-learn': '1.6.1', 'numpy': None, 'joblib': None}, f'Нәтиже дұрыс емес: {_r}'
assert parse_requirements('# тек түсініктеме\n\n') == {}, 'Бос жолдар мен түсініктемелер еленбеуі керек'
assert parse_requirements('fastapi==0.115.0  # API') == {'fastapi': '0.115.0'}, 'Жол соңындағы түсініктеме мен бос орындарды алып тастаңыз'` } },
          { type: 'quiz', xp: 10, prompt: '<code>.venv</code> папкасын git репозиторийіне қосу керек пе?', options: ['Иә, сонда әріптестер ештеңе орнатпайды', 'Жоқ: ол үлкен және операциялық жүйеге тәуелді. Git-ке requirements.txt салынады, ал .venv .gitignore-ға қосылады', 'Тек Windows-та', 'Тек pandas орнатылған болса'], answer: 1, explain: '.venv-ті әр адам өз компьютерінде <code>pip install -r requirements.txt</code> арқылы қайта құрады.' },
          { type: 'quiz', xp: 10, prompt: 'Churn моделі <code>joblib</code>-пен scikit-learn 1.6.1-де сақталды. API-дің requirements.txt-інде sklearn қалай жазылуы керек?', options: ['<code>scikit-learn</code> (нұсқасыз, ең жаңасы орнатылсын)', '<code>scikit-learn>=1.0</code>', '<code>scikit-learn==1.6.1</code>', 'Мүлде жазбау керек, ол pandas-пен бірге келеді'], answer: 2, explain: 'Сақталған модель оны жасаған нұсқамен ашылуы керек. Нұсқаны бекітпесеңіз, келесі деплойда жаңа sklearn орнатылып, модель жүктелмей қалуы мүмкін.' }
        ]
      }
      ,
      {
        id: 'swe-7', title: 'Clean code: ноутбукты функцияларға бөлу', minutes: 15,
        body: `
<p>Зерттеу кезінде ноутбук — тамаша құрал. Бірақ ол күнде іске қосылатын есепке немесе API-ге айналғанда, «ноутбук әдеттері» қымбатқа түседі. Ең жиі кездесетін белгілер (<b>code smells</b>):</p>
<ul>
<li><b>Көшірілген блоктар</b>: үш қалаға үш бірдей цикл.</li>
<li><b>Сиқырлы сандар</b>: <code>/ 1.12</code> — бұл ҚҚС екенін тек автор біледі.</li>
<li><b>Мағынасыз атаулар</b>: <code>df2</code>, <code>a</code>, <code>tmp_final_v3</code>.</li>
<li><b>Жаһандық күй</b>: ұяшықтардың орындалу ретіне тәуелді айнымалылар.</li>
<li><b>Ұзын ұяшық</b>: оқу, тазалау, есептеу және график — бәрі бір жерде.</li>
</ul>
<h3>Рефакторинг қадамдары</h3>
<ol>
<li>Сиқырлы сандарды <b>константаға</b> шығарыңыз: <code>VAT_RATE = 0.12</code>.</li>
<li>Қайталанатын логиканы <b>параметрі бар функцияға</b> айналдырыңыз.</li>
<li>Pipeline-ды қадамдарға бөліңіз: <code>load → clean → transform → report</code>, әрқайсысы — жеке функция.</li>
<li>Функциялар мүмкіндігінше <b>таза</b> (pure) болсын: тек кірісіне тәуелді, сыртқы айнымалыны өзгертпейді. Оларды тестілеу оңай.</li>
<li>Бәрін <code>main()</code> функциясы біріктіреді.</li>
</ol>
<h3>Бұрын және кейін</h3>
<pre><code># Бұрын
a = 0
for o in orders:
    if o['city'] == 'Алматы':
        a = a + o['gross'] / 1.12
b = 0
for o in orders:
    if o['city'] == 'Астана':
        b = b + o['gross'] / 1.12

# Кейін
VAT_RATE = 0.12

def net_amount(gross: float) -> float:
    """ҚҚС-сыз сома."""
    return gross / (1 + VAT_RATE)

def revenue_by_city(orders: list[dict]) -> dict[str, float]:
    result = {}
    for o in orders:
        result[o['city']] = result.get(o['city'], 0) + net_amount(o['gross'])
    return result</code></pre>
<p>Жаңа нұсқа кез келген қалаға жұмыс істейді (Орал қосылса, код өзгермейді), ҚҚС өзгерсе бір жерде түзетіледі, ал <code>net_amount</code> пен <code>revenue_by_city</code>-ге бөлек тест жазуға болады.</p>
<div class="tip">Рефакторинг — мінез-құлықты <b>өзгертпей</b> құрылымды жақсарту. Алдымен ескі кодтың нәтижесін сақтап алыңыз, рефакторингтен кейін жаңа код сол нәтижені беретінін тексеріңіз.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: 'Ноутбуктан келген кодты рефакторинг жасаңыз: <code>VAT_RATE = 0.12</code> константасы; <code>net_amount(gross)</code> — ҚҚС-сыз сома (<code>VAT_RATE</code>-ті қолдансын); <code>revenue_by_city(orders)</code> — барлық қалалар бойынша ҚҚС-сыз түсім сөздігі (қала атаулары кодта жазылмасын); <code>top_city(orders)</code> — түсімі ең көп қала.', starter: P`orders = [
    {'city': 'Алматы', 'gross': 11200},
    {'city': 'Астана', 'gross': 5600},
    {'city': 'Алматы', 'gross': 2240},
    {'city': 'Шымкент', 'gross': 3360},
]
# ноутбуктан көшірілген код
a = 0
for o in orders:
    if o['city'] == 'Алматы':
        a = a + o['gross'] / 1.12
b = 0
for o in orders:
    if o['city'] == 'Астана':
        b = b + o['gross'] / 1.12
c = 0
for o in orders:
    if o['city'] == 'Шымкент':
        c = c + o['gross'] / 1.12
print(a, b, c)
`, solution: P`orders = [
    {'city': 'Алматы', 'gross': 11200},
    {'city': 'Астана', 'gross': 5600},
    {'city': 'Алматы', 'gross': 2240},
    {'city': 'Шымкент', 'gross': 3360},
]

VAT_RATE = 0.12

def net_amount(gross):
    """ҚҚС-сыз сома."""
    return gross / (1 + VAT_RATE)

def revenue_by_city(orders):
    result = {}
    for o in orders:
        result[o['city']] = result.get(o['city'], 0) + net_amount(o['gross'])
    return result

def top_city(orders):
    revenue = revenue_by_city(orders)
    return max(revenue, key=revenue.get)

print(revenue_by_city(orders), top_city(orders))
`, hints: ['<code>result[o[\'city\']] = result.get(o[\'city\'], 0) + net_amount(o[\'gross\'])</code> — кез келген қалаға жұмыс істейді.', 'Ең көп мәнді кілт: <code>max(revenue, key=revenue.get)</code>.'], check: { tests: P`assert VAT_RATE == 0.12, 'VAT_RATE = 0.12 константасын анықтаңыз'
assert abs(net_amount(1120) - 1000) < 1e-6, 'net_amount(1120) ≈ 1000 болуы керек'
VAT_RATE = 0.0
_n = net_amount(500)
VAT_RATE = 0.12
assert _n == 500, 'net_amount 1.12 санын емес, VAT_RATE константасын қолдануы керек'
_o = [{'city': 'Орал', 'gross': 1120}, {'city': 'Ақтөбе', 'gross': 2240}, {'city': 'Орал', 'gross': 1120}]
_r = revenue_by_city(_o)
assert set(_r) == {'Орал', 'Ақтөбе'}, 'revenue_by_city деректегі кез келген қаламен жұмыс істеуі керек (атауларды қатаң жазбаңыз)'
assert abs(_r['Орал'] - 2000) < 1e-6 and abs(_r['Ақтөбе'] - 2000) < 1e-6, 'Қала бойынша ҚҚС-сыз сомалар дұрыс емес'
assert top_city(orders) == 'Алматы', 'top_city(orders) Алматы болуы керек'
assert top_city([{'city': 'Орал', 'gross': 10}, {'city': 'Ақтөбе', 'gross': 20}]) == 'Ақтөбе', 'top_city түсімі ең көп қаланы қайтаруы керек'` } },
          { type: 'python', xp: 20, prompt: 'Тазалау қадамдары бөлек функциялар ретінде дайын. <code>run_pipeline(data, steps)</code> жазыңыз: <code>steps</code> тізіміндегі функцияларды ретімен қолданып, нәтижені қайтарады. Сосын <code>clean = run_pipeline(raw, [strip_spaces, drop_empty, unique])</code>.', starter: P`raw = [' Алматы', 'Астана ', '', 'Алматы', '  ', 'Шымкент']

def strip_spaces(items):
    return [s.strip() for s in items]

def drop_empty(items):
    return [s for s in items if s]

def unique(items):
    return list(dict.fromkeys(items))

def run_pipeline(data, steps):
    return data
`, solution: P`raw = [' Алматы', 'Астана ', '', 'Алматы', '  ', 'Шымкент']

def strip_spaces(items):
    return [s.strip() for s in items]

def drop_empty(items):
    return [s for s in items if s]

def unique(items):
    return list(dict.fromkeys(items))

def run_pipeline(data, steps):
    for step in steps:
        data = step(data)
    return data

clean = run_pipeline(raw, [strip_spaces, drop_empty, unique])
print(clean)
`, hints: ['Функцияның өзі де мән: оны тізімге салып, циклде шақыруға болады.', '<code>for step in steps: data = step(data)</code>, соңында <code>return data</code>.'], check: { tests: P`assert clean == ['Алматы', 'Астана', 'Шымкент'], f'clean дұрыс емес: {clean}'
assert run_pipeline([1, 2], []) == [1, 2], 'Қадам жоқ болса, дерек өзгермейді'
assert run_pipeline(3, [lambda x: x + 1, lambda x: x * 10]) == 40, 'Қадамдар берілген ретпен қолданылуы керек'` } },
          { type: 'quiz', xp: 10, prompt: 'Қай атау функция үшін ең жақсы?', options: ['<code>process(df)</code>', '<code>do_stuff2(df)</code>', '<code>drop_test_orders(df)</code>', '<code>f(df)</code>'], answer: 2, explain: 'Атау не істелетінін нақты айтады: тест тапсырыстарын алып тастайды. <code>process</code> мен <code>f</code> ештеңе түсіндірмейді.' }
        ]
      },
      {
        id: 'swe-8', title: 'REST API негіздері: HTTP және JSON', minutes: 16,
        body: `
<p>Модель немесе есеп басқа жүйелерге (сайтқа, мобильді қосымшаға, CRM-ге) керек болғанда, оны <b>API</b> арқылы береміз. Ең кең тараған стиль — <b>REST</b>: клиент HTTP сұрау жібереді, сервер JSON жауап қайтарады.</p>
<h3>HTTP сұраудың бөліктері</h3>
<pre><code>POST /predict HTTP/1.1                     ← method + path
Host: api.dalamobile.kz
Content-Type: application/json            ← header
Authorization: Bearer abc123

{"tenure_months": 3, "support_calls": 5}  ← body (JSON)</code></pre>
<pre><code>HTTP/1.1 200 OK                            ← status code
Content-Type: application/json

{"churn_probability": 0.81, "label": 1}</code></pre>
<h3>Методтар</h3>
<table>
<tr><th>Метод</th><th>Мағынасы</th><th>Мысал</th></tr>
<tr><td>GET</td><td>оқу, ештеңе өзгертпейді</td><td><code>GET /products/42</code></td></tr>
<tr><td>POST</td><td>жаңасын жасау немесе есептеу</td><td><code>POST /products</code>, <code>POST /predict</code></td></tr>
<tr><td>PUT / PATCH</td><td>толық / ішінара жаңарту</td><td><code>PATCH /products/42</code></td></tr>
<tr><td>DELETE</td><td>жою</td><td><code>DELETE /products/42</code></td></tr>
</table>
<p>GET, PUT, DELETE — <b>идемпотентті</b>: бірдей сұрауды екі рет жіберу бір рет жібергенмен бірдей нәтиже береді. POST әдетте идемпотентті емес: екі рет жіберсеңіз, екі тауар жасалады.</p>
<h3>Status codes</h3>
<table>
<tr><th>Код</th><th>Мағынасы</th></tr>
<tr><td>200 OK / 201 Created</td><td>сәтті / жаңа ресурс жасалды</td></tr>
<tr><td>400 Bad Request</td><td>сұрау қате құрылған (мысалы, JSON бұзық)</td></tr>
<tr><td>401 / 403</td><td>кім екені белгісіз / рұқсат жоқ</td></tr>
<tr><td>404 Not Found</td><td>мұндай ресурс жоқ</td></tr>
<tr><td>405 Method Not Allowed</td><td>path бар, бірақ бұл метод қолданылмайды</td></tr>
<tr><td>422 Unprocessable</td><td>JSON дұрыс, бірақ мәндері тексеруден өтпеді</td></tr>
<tr><td>500 / 503</td><td>сервердің ішкі қатесі / сервис уақытша қолжетімсіз</td></tr>
</table>
<p>Ереже: <b>4xx — клиенттің қатесі</b>, <b>5xx — сервердің қатесі</b>.</p>
<h3>Python-да JSON және клиент</h3>
<pre><code>import json
body = json.dumps({'city': 'Алматы'}, ensure_ascii=False)   # dict → str
data = json.loads('{"price": 15990}')                         # str → dict

import requests                                               # клиент жағы
r = requests.post('https://api.example.kz/predict', json={'tenure_months': 3}, timeout=5)
r.status_code, r.json()</code></pre>
<div class="tip">Браузердегі Python-да желі жоқ, сондықтан тапсырмаларда серверді кішкене функциямен модельдейміз: ол method, path және body алып, <code>(status, json)</code> қайтарады. Нағыз фреймворктар (FastAPI, Flask) іштей дәл осыны істейді.</div>`,
        exercises: [
          { type: 'python', xp: 15, prompt: 'Сервер жауабы <code>raw</code> мәтін ретінде келді. (1) Оны <code>resp</code> сөздігіне айналдырыңыз, <code>prob</code>-қа кету ықтималдығын жазыңыз. (2) CRM-ге жіберетін <code>payload</code> сөздігін (<code>customer_id</code> — жауаптағы id, <code>action</code> — <code>\'call\'</code>, <code>note</code> — <code>\'Ұсыныс: 20% жеңілдік\'</code>) JSON мәтініне <code>body</code> ретінде айналдырыңыз. Қазақ әріптері <code>\\u</code> кодтарына айналмасын.', starter: P`import json
raw = '{"customer_id": 1042, "city": "Алматы", "churn_probability": 0.81, "tags": ["new", "complaints"]}'
`, solution: P`import json
raw = '{"customer_id": 1042, "city": "Алматы", "churn_probability": 0.81, "tags": ["new", "complaints"]}'
resp = json.loads(raw)
prob = resp['churn_probability']
payload = {'customer_id': resp['customer_id'], 'action': 'call', 'note': 'Ұсыныс: 20% жеңілдік'}
body = json.dumps(payload, ensure_ascii=False)
print(prob, body)
`, hints: ['<code>json.loads(raw)</code> мәтінді сөздікке айналдырады.', '<code>json.dumps(payload, ensure_ascii=False)</code> әріптерді сол күйінде қалдырады.'], check: { tests: P`assert isinstance(resp, dict) and resp['city'] == 'Алматы', 'resp = json.loads(raw)'
assert prob == 0.81, 'prob — churn_probability мәні'
assert isinstance(body, str), 'body мәтін (str) болуы керек: json.dumps қолданыңыз'
assert json.loads(body) == {'customer_id': 1042, 'action': 'call', 'note': 'Ұсыныс: 20% жеңілдік'}, 'payload мазмұны дұрыс емес'
assert 'Ұсыныс' in body, 'ensure_ascii=False қосыңыз, сонда қазақ әріптері оқылатын болып қалады'` } },
          { type: 'python', xp: 25, prompt: 'Дүкен API-ін модельдейтін <code>handle(method, path, body=None)</code> функциясын жазыңыз. Ол <code>(status, data)</code> қайтарады:<br>• <code>GET /products</code> → 200, барлық тауарлар тізімі;<br>• <code>GET /products/&lt;id&gt;</code> → 200 және тауар, жоқ болса 404;<br>• <code>POST /products</code> → body-де <code>name</code> және <code>price &gt; 0</code> болса, жаңа id (ең үлкен id + 1) береді, сақтайды және 201 қайтарады; әйтпесе 400;<br>• <code>/products</code>-қа басқа метод → 405; басқа path → 404.<br>Қате жағдайда data — <code>{\'error\': ...}</code>.', starter: P`products = {
    1: {'id': 1, 'name': 'Электр шәйнек', 'price': 15990},
    2: {'id': 2, 'name': 'Кофе машинасы', 'price': 89990},
}

def handle(method, path, body=None):
    return 500, {'error': 'әзірге жазылмаған'}
`, solution: P`products = {
    1: {'id': 1, 'name': 'Электр шәйнек', 'price': 15990},
    2: {'id': 2, 'name': 'Кофе машинасы', 'price': 89990},
}

def handle(method, path, body=None):
    parts = path.strip('/').split('/')
    if parts[0] != 'products' or len(parts) > 2:
        return 404, {'error': 'not found'}
    if len(parts) == 1:
        if method == 'GET':
            return 200, list(products.values())
        if method == 'POST':
            body = body or {}
            price = body.get('price')
            if not body.get('name') or not isinstance(price, (int, float)) or price <= 0:
                return 400, {'error': 'name және оң price керек'}
            new_id = max(products, default=0) + 1
            products[new_id] = {'id': new_id, 'name': body['name'], 'price': price}
            return 201, products[new_id]
        return 405, {'error': 'method not allowed'}
    if method != 'GET':
        return 405, {'error': 'method not allowed'}
    if not parts[1].isdigit() or int(parts[1]) not in products:
        return 404, {'error': 'not found'}
    return 200, products[int(parts[1])]

print(handle('GET', '/products/1'))
print(handle('POST', '/products', {'name': 'Тостер', 'price': 12990}))
`, hints: ['Path-ты бөліктерге бөліңіз: <code>parts = path.strip(\'/\').split(\'/\')</code>. <code>/products/2</code> → <code>[\'products\', \'2\']</code>.', 'Id сан ба: <code>parts[1].isdigit()</code>. Жаңа id: <code>max(products) + 1</code>.'], check: { tests: P`products.clear()
products.update({1: {'id': 1, 'name': 'Электр шәйнек', 'price': 15990}, 2: {'id': 2, 'name': 'Кофе машинасы', 'price': 89990}})
_s, _d = handle('GET', '/products')
assert _s == 200 and isinstance(_d, list) and len(_d) == 2, 'GET /products → 200 және 2 тауар тізімі'
_s, _d = handle('GET', '/products/2')
assert _s == 200 and _d['name'] == 'Кофе машинасы', 'GET /products/2 → 200 және сол тауар'
assert handle('GET', '/products/99')[0] == 404, 'Жоқ тауар → 404'
assert handle('GET', '/products/abc')[0] == 404, 'Сан емес id → 404'
assert handle('GET', '/orders')[0] == 404, 'Белгісіз path → 404'
assert handle('DELETE', '/products')[0] == 405, '/products үшін DELETE → 405'
_s, _d = handle('POST', '/products', {'name': 'Тостер', 'price': 12990})
assert _s == 201 and _d['id'] == 3 and _d['price'] == 12990, 'POST → 201, жаңа id = 3'
assert handle('GET', '/products/3')[0] == 200, 'Жаңа тауар сақталуы керек'
assert handle('POST', '/products', {'name': 'Тостер'})[0] == 400, 'price жоқ → 400'
assert handle('POST', '/products', {'name': 'Тостер', 'price': -5})[0] == 400, 'Теріс price → 400'
assert 'error' in handle('POST', '/products', {})[1], 'Қате жауапта error кілті болсын'` } },
          { type: 'quiz', xp: 10, prompt: 'Клиент <code>POST /predict</code>-қа дұрыс JSON жіберді, бірақ <code>tenure_months</code> мәні <code>-4</code>. Сервер қандай код қайтаруы керек?', options: ['200', '404', '422 (немесе 400)', '500'], answer: 2, explain: 'Сұрау құрылымы дұрыс, бірақ мән тексеруден өтпеді: бұл клиенттің қатесі (4xx). FastAPI мұндайда 422 қайтарады. 500 — сервердің өз қатесі үшін.' },
          { type: 'quiz', xp: 10, prompt: 'Қай сұрау <b>идемпотентті емес</b>?', options: ['<code>GET /products/42</code>', '<code>PUT /products/42</code> (бірдей толық дерекпен)', '<code>DELETE /products/42</code>', '<code>POST /orders</code> (жаңа тапсырыс жасайды)'], answer: 3, explain: 'POST-ты екі рет жіберсеңіз, екі тапсырыс жасалады. Қалған үшеуін қайталау нәтижені өзгертпейді.' }
        ]
      },
      {
        id: 'swe-gate', gate: true, title: 'Модуль емтиханы: Software Eng for Data', minutes: 35,
        body: `
<p>Қорытынды тексеріс: класс, валидация, тест жазу, API өңдеушісі және инженерлік әдеттер. Кеңестер жоқ. Өту шегі — 75%.</p>`,
        exercises: [
          { type: 'python', xp: 35, prompt: '<code>SalesLedger</code> класын жазыңыз. <code>__init__</code> бос <code>self.orders</code> тізімін жасайды. <code>add(city, amount)</code>: <code>city</code> бос болса немесе <code>amount</code> санға айналмаса не теріс болса — <code>ValueError</code>; әйтпесе <code>{\'city\': city, \'amount\': float(amount)}</code> қосады. <code>total(city=None)</code> — барлық немесе бір қаланың қосындысы (<code>-> float</code> hint-імен). <code>by_city()</code> — <code>{қала: қосынды}</code> сөздігі.', starter: P`class SalesLedger:
    def __init__(self):
        self.orders = []

    def add(self, city, amount):
        self.orders.append({'city': city, 'amount': amount})
`, solution: P`class SalesLedger:
    def __init__(self):
        self.orders = []

    def add(self, city: str, amount) -> None:
        if not city or not city.strip():
            raise ValueError('city бос болмауы керек')
        value = float(amount)
        if value < 0:
            raise ValueError('amount теріс болмауы керек')
        self.orders.append({'city': city, 'amount': value})

    def total(self, city: str | None = None) -> float:
        return float(sum(o['amount'] for o in self.orders if city is None or o['city'] == city))

    def by_city(self) -> dict[str, float]:
        result = {}
        for o in self.orders:
            result[o['city']] = result.get(o['city'], 0.0) + o['amount']
        return result

ledger = SalesLedger()
ledger.add('Алматы', '12000')
ledger.add('Астана', 8000)
print(ledger.total(), ledger.by_city())
`, check: { tests: P`_l = SalesLedger()
assert _l.orders == [], '__init__ бос orders тізімін жасауы керек'
_l.add('Алматы', '12000')
_l.add('Астана', 8000)
_l.add('Алматы', 500.5)
assert _l.orders[0]['amount'] == 12000.0 and isinstance(_l.orders[0]['amount'], float), 'amount float ретінде сақталсын'
for _args in [('', 100), ('Алматы', 'жүз'), ('Алматы', -1)]:
    try:
        _l.add(*_args)
    except ValueError:
        pass
    else:
        raise AssertionError(f'add{_args} ValueError лақтыруы керек')
assert len(_l.orders) == 3, 'Қате жолдар orders-ке қосылмауы керек'
assert _l.total() == 20500.5, 'total() — барлық сома'
assert _l.total('Алматы') == 12500.5 and _l.total('Орал') == 0, 'total(city) — бір қаланың сомасы'
assert _l.by_city() == {'Алматы': 12500.5, 'Астана': 8000.0}, 'by_city() дұрыс емес'
assert SalesLedger.total.__annotations__.get('return') is float, 'total үшін -> float hint-ін жазыңыз'` } },
          { type: 'python', xp: 35, prompt: '<code>normalize_phone</code> дайын: кез келген форматты <code>"77011234567"</code> түріне келтіреді, ал 11 цифрлы қазақстандық нөмір болмаса <code>ValueError</code> береді. <code>test_normalize_phone()</code> жазыңыз: ол дұрыс нұсқада өтіп, бұзылған нұсқаларды ұстауы керек. Кемінде мына жағдайлар: <code>"+7 (701) 123-45-67"</code>, <code>"8 701 123 45 67"</code>, және <code>"12345"</code> үшін ValueError.', starter: P`def normalize_phone(text):
    digits = ''.join(ch for ch in text if ch.isdigit())
    if len(digits) == 11 and digits[0] == '8':
        digits = '7' + digits[1:]
    if len(digits) != 11 or digits[0] != '7':
        raise ValueError(f'Нөмір дұрыс емес: {text}')
    return digits

def test_normalize_phone():
    assert normalize_phone('77011234567') == '77011234567'
`, solution: P`def normalize_phone(text):
    digits = ''.join(ch for ch in text if ch.isdigit())
    if len(digits) == 11 and digits[0] == '8':
        digits = '7' + digits[1:]
    if len(digits) != 11 or digits[0] != '7':
        raise ValueError(f'Нөмір дұрыс емес: {text}')
    return digits

def test_normalize_phone():
    assert normalize_phone('+7 (701) 123-45-67') == '77011234567'
    assert normalize_phone('8 701 123 45 67') == '77011234567'
    try:
        normalize_phone('12345')
    except ValueError:
        pass
    else:
        raise AssertionError('12345 үшін ValueError күтілді')

test_normalize_phone()
print('тест өтті')
`, check: { tests: P`_ok = normalize_phone
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
assert _catches(_no8), 'Тестіңіз 8-ден басталатын нөмірді (8 701 ...) тексермейді'
assert _catches(_nocheck), 'Тестіңіз қате нөмірде ValueError шығатынын тексермейді'
assert _catches(_spaces), 'Тестіңіз жақшасы бар форматты (+7 (701) ...) тексермейді'` } },
          { type: 'python', xp: 35, prompt: '<code>handle_request(method, path, raw_body)</code> жазыңыз, ол <code>(status, json_мәтін)</code> қайтарады. Тек <code>/score</code> бар (басқа path → 404, басқа метод → 405). POST денесі бұзық JSON болса → 400. <code>tenure_months</code> және <code>support_calls</code> өрістерінің әрқайсысы жоқ, сан емес немесе теріс болса → 422 және <code>{"errors": [...]}</code> (әр қате өріске бір жол, өріс атауы аталсын). Әйтпесе 200 және <code>{"risk": r}</code>, мұндағы <code>r = min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0))</code>, 2 таңбаға дейін дөңгелектенген.', starter: P`import json

def handle_request(method, path, raw_body):
    data = json.loads(raw_body)
    return 200, json.dumps({'risk': 0})
`, solution: P`import json

def handle_request(method, path, raw_body):
    if path != '/score':
        return 404, json.dumps({'error': 'not found'})
    if method != 'POST':
        return 405, json.dumps({'error': 'method not allowed'})
    try:
        data = json.loads(raw_body)
    except json.JSONDecodeError:
        return 400, json.dumps({'error': 'invalid JSON'})
    errors = []
    for field in ['tenure_months', 'support_calls']:
        value = data.get(field)
        if isinstance(value, bool) or not isinstance(value, (int, float)) or value < 0:
            errors.append(f'{field}: теріс емес сан керек')
    if errors:
        return 422, json.dumps({'errors': errors}, ensure_ascii=False)
    risk = min(1.0, 0.1 * data['support_calls'] + (0.3 if data['tenure_months'] < 6 else 0))
    return 200, json.dumps({'risk': round(risk, 2)})

print(handle_request('POST', '/score', '{"tenure_months": 3, "support_calls": 4}'))
`, check: { tests: P`import json as _j
_s, _b = handle_request('POST', '/score', '{"tenure_months": 3, "support_calls": 4}')
assert _s == 200 and isinstance(_b, str), 'Сәтті сұрау: 200 және JSON мәтін'
assert _j.loads(_b) == {'risk': 0.7}, f'risk = 0.1*4 + 0.3 = 0.7 болуы керек, сізде {_b}'
assert _j.loads(handle_request('POST', '/score', '{"tenure_months": 24, "support_calls": 20}')[1])['risk'] == 1.0, 'risk 1.0-ден аспауы керек'
assert _j.loads(handle_request('POST', '/score', '{"tenure_months": 24, "support_calls": 1}')[1])['risk'] == 0.1, 'tenure 6-дан көп болса, 0.3 қосылмайды'
assert handle_request('POST', '/score', '{tenure: 3')[0] == 400, 'Бұзық JSON → 400'
_s, _b = handle_request('POST', '/score', '{"tenure_months": -1}')
assert _s == 422, 'Тексеруден өтпесе → 422'
_e = _j.loads(_b)['errors']
assert len(_e) == 2 and any('tenure_months' in e for e in _e) and any('support_calls' in e for e in _e), 'Әр қате өріс үшін атауы бар бір хабар'
assert handle_request('POST', '/score', '{"tenure_months": "3", "support_calls": 1}')[0] == 422, 'Мәтін түріндегі сан да 422'
assert handle_request('GET', '/score', '')[0] == 405, 'GET /score → 405'
assert handle_request('POST', '/predict', '{}')[0] == 404, 'Белгісіз path → 404'` } },
          { type: 'quiz', xp: 30, prompt: 'Жаңа әріптес жобаны клондап, <code>pip install pandas scikit-learn</code> орнатты. Модель жүктелгенде <code>InconsistentVersionWarning</code> және қате болжамдар шықты. Дұрыс түзету қайсы?', options: ['Модельді әр әріптес өзі қайта үйретсін', 'Жобада <code>.venv</code> жасап, нұсқалары бекітілген <code>requirements.txt</code> арқылы (<code>pip install -r requirements.txt</code>) орнату; файлды git-те сақтау', '<code>.venv</code> папкасын zip-теп жіберу', 'Ескертуді <code>warnings.filterwarnings</code> арқылы өшіру'], answer: 1, explain: 'Нұсқалары бекітілген requirements.txt бәріне бірдей ортаны береді. Ескертуді өшіру мәселені жасырады ғана.' },
          { type: 'quiz', xp: 30, prompt: 'Pipeline кодында мынадай блок бар: <code>try: run_etl() except: pass</code>. Бұл неге қауіпті?', options: ['Ол кодты баяулатады', 'Ол барлық қатені, тіпті код қателерін (NameError, KeyError) де үнсіз жұтады: pipeline «сәтті» аяқталғандай көрінеді, бірақ дерек жүктелмейді және журналда із қалмайды', 'Python-да <code>except</code> атаусыз жазылмайды', 'Ешқандай қаупі жоқ, бұл жақсы тәжірибе'], answer: 1, explain: 'Нақты қатені ұстап (<code>except ValueError</code>), оны logger.error / logger.exception арқылы жазып, қажет болса қайта лақтыру керек.' }
        ]
      }
    ]
  };
  const MINIAPP = P`class MiniApp:
    """FastAPI-ге ұқсас кішкене router: (method, path) → функция."""
    def __init__(self):
        self.routes = {}

    def get(self, path):
        def register(func):
            self.routes[('GET', path)] = func
            return func
        return register

    def post(self, path):
        def register(func):
            self.routes[('POST', path)] = func
            return func
        return register

    def handle(self, method, path, body=None):
        func = self.routes.get((method, path))
        if func is None:
            if any(p == path for _, p in self.routes):
                return 405, {'detail': 'Method Not Allowed'}
            return 404, {'detail': 'Not Found'}
        try:
            result = func(body) if method == 'POST' else func()
        except ValueError as e:
            return 422, {'detail': str(e)}
        return 200, result
`;

  DJ.modules['m6-2'] = {
    intro: 'Үйретілген модельді басқалар қолдана алатын сервиске айналдырасыз: модельді сақтау, кірісті тексеру, FastAPI және Pydantic, Docker, config, бұлтқа деплой және жылдамдық.',
    lessons: [
      {
        id: 'dep-1', title: 'Модельді сақтау: pickle және joblib', minutes: 14,
        body: `
<p>Модельді ноутбукта бір рет үйретеміз, ал болжамды API күніне мыңдаған рет жасайды. Әр сұрауда қайта үйрету мүмкін емес. Сондықтан үйретілген объектіні файлға <b>сериализация</b> жасаймыз (сақтаймыз), ал сервер іске қосылғанда оны жүктейді.</p>
<h3>pickle және joblib</h3>
<pre><code>import pickle, joblib

# pickle — стандартты кітапхана
with open('model.pkl', 'wb') as f:
    pickle.dump(pipe, f)
with open('model.pkl', 'rb') as f:
    pipe = pickle.load(f)

# joblib — numpy массивтері көп объектілерге тиімдірек, sklearn құжаттамасы осыны ұсынады
joblib.dump(pipe, 'churn_model.joblib')
pipe = joblib.load('churn_model.joblib')</code></pre>
<h3>Нені сақтаймыз</h3>
<ul>
<li><b>Бүкіл Pipeline</b>, жалаң модель емес. Егер <code>StandardScaler</code> бөлек болса, серверде оны ұмытып кету оңай, ал масштабталмаған дерекпен модель үнсіз қате болжайды.</li>
<li><b>Metadata</b>: белгілердің тізімі мен реті, модель нұсқасы, үйретілген күні, test метрикасы, sklearn нұсқасы. Оларды модельмен бірге бір сөздікке («bundle») салу ыңғайлы.</li>
</ul>
<pre><code>bundle = {
    'model': pipe,
    'features': ['tenure_months', 'support_calls'],
    'version': '1.2.0',
    'trained_at': '2026-09-30',
    'test_auc': 0.84,
}
joblib.dump(bundle, 'churn_v1.2.0.joblib')</code></pre>
<h3>Екі маңызды ескерту</h3>
<ol>
<li><b>Қауіпсіздік</b>: <code>pickle.load</code> файлдың ішіндегі кез келген кодты орындай алады. Сенімсіз көзден (интернеттен, пайдаланушы жүктеген файлдан) pickle ашпаңыз.</li>
<li><b>Нұсқалар</b>: sklearn 1.6-да сақталған модель 1.3-те ашылмауы немесе басқаша жұмыс істеуі мүмкін. requirements.txt-те нұсқаны бекітіңіз, нұсқаны metadata-ға жазыңыз.</li>
</ol>
<div class="tip">Әр түрлі тілдер мен ортада жұмыс істеу керек болса, модельді <b>ONNX</b> форматына экспорттайды. Ал модельдердің нұсқаларын MLflow сияқты registry-де сақтау — MLOps модулінің тақырыбы.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Pipeline үйретілген. (1) Оны <code>joblib.dump</code> арқылы <code>churn_model.joblib</code> файлына сақтаңыз. (2) Файлдан <code>loaded</code> айнымалысына жүктеңіз. (3) <code>same</code> — екі модельдің <code>data[FEATURES]</code> бойынша болжамдары толық бірдей ме (<code>True</code>/<code>False</code>).', starter: MINI + P`import joblib
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(data[FEATURES], data['churned'])
`, solution: MINI + P`import joblib
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(data[FEATURES], data['churned'])

joblib.dump(pipe, 'churn_model.joblib')
loaded = joblib.load('churn_model.joblib')
same = bool((loaded.predict(data[FEATURES]) == pipe.predict(data[FEATURES])).all())
print(same)
`, hints: ['<code>joblib.dump(pipe, \'churn_model.joblib\')</code>, сосын <code>loaded = joblib.load(\'churn_model.joblib\')</code>.', 'Салыстыру: <code>(loaded.predict(X) == pipe.predict(X)).all()</code>.'], check: { tests: P`import os as _os
from sklearn.pipeline import Pipeline as _Pl
assert _os.path.exists('churn_model.joblib'), 'churn_model.joblib файлы жасалмаған'
assert isinstance(loaded, _Pl) and loaded is not pipe, 'loaded — файлдан жүктелген Pipeline болуы керек'
assert 'standardscaler' in loaded.named_steps, 'Сақталған объектіде scaler да болуы керек (бүкіл pipeline)'
assert same == True, 'same True болуы керек: жүктелген модель бірдей болжайды'` } },
          { type: 'python', xp: 25, prompt: 'Модельді metadata-мен бірге сақтаңыз. <code>bundle</code> сөздігі: <code>model</code>, <code>features</code> (<code>FEATURES</code>), <code>version</code> = <code>\'1.0.0\'</code>. <code>blob = pickle.dumps(bundle)</code>, <code>restored = pickle.loads(blob)</code>. Сосын <code>predict_from_bundle(bundle, customer)</code> жазыңыз: белгілерді bundle-дағы ретпен алып, кету ықтималдығын <code>float</code> қайтарады.', starter: MINI + P`import pickle

model = LogisticRegression().fit(data[FEATURES], data['churned'])
`, solution: MINI + P`import pickle

model = LogisticRegression().fit(data[FEATURES], data['churned'])
bundle = {'model': model, 'features': FEATURES, 'version': '1.0.0'}
blob = pickle.dumps(bundle)
restored = pickle.loads(blob)

def predict_from_bundle(bundle, customer):
    row = pd.DataFrame([customer])[bundle['features']]
    return float(bundle['model'].predict_proba(row)[0, 1])

print(predict_from_bundle(restored, {'support_calls': 5, 'tenure_months': 2}))
`, hints: ['<code>pickle.dumps</code> объектіні bytes-қа айналдырады, <code>pickle.loads</code> кері қайтарады.', 'Ретті сақтау: <code>pd.DataFrame([customer])[bundle[\'features\']]</code>.'], check: { tests: P`assert isinstance(blob, bytes), 'blob = pickle.dumps(bundle) (bytes)'
assert restored['version'] == '1.0.0' and restored['features'] == FEATURES, 'bundle-да version мен features болуы керек'
assert restored['model'] is not model and hasattr(restored['model'], 'coef_'), 'restored — pickle.loads нәтижесі'
_c = {'support_calls': 5, 'city': 'Алматы', 'tenure_months': 2}
_p = predict_from_bundle(restored, _c)
assert isinstance(_p, float) and 0 <= _p <= 1, 'predict_from_bundle 0..1 аралығындағы float қайтарады'
assert abs(_p - model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1]) < 1e-9, 'Белгілер bundle["features"] ретімен алынуы керек (кілттердің реті басқаша болса да)'` } },
          { type: 'quiz', xp: 10, prompt: 'Пайдаланушы API-ге өз <code>.pkl</code> файлын жүктеп, «осы модельмен болжап беріңіз» дейді. Не істеу керек?', options: ['<code>pickle.load</code> арқылы ашып, болжау', 'Ашпау: pickle жүктелгенде ішіндегі кез келген код орындалуы мүмкін, сенімсіз pickle ашуға болмайды', 'Алдымен антивируспен тексеріп, сосын ашу', 'joblib арқылы ашса, қауіпсіз'], answer: 1, explain: 'pickle және joblib форматтары сенімсіз көзден келсе қауіпті: файл серверіңізде ерікті код іске қоса алады.' },
          { type: 'quiz', xp: 10, prompt: 'Модель <code>StandardScaler</code>-мен масштабталған деректе үйретілді, бірақ тек <code>LogisticRegression</code> объектісі сақталды. Серверде не болады?', options: ['Ештеңе, модель масштабты өзі есте сақтайды', 'Сервер масштабталмаған дерек береді, модель қатесіз, бірақ <b>қате</b> болжамдар қайтарады', 'Модель жүктелмейді', 'Болжам тек баяу болады'], answer: 1, explain: 'Сондықтан бүкіл Pipeline-ды (preprocessing + модель) бір объект ретінде сақтаймыз.' }
        ]
      },
      {
        id: 'dep-2', title: 'Болжам функциясы және кірісті тексеру', minutes: 15,
        body: `
<p>API-дің жүрегі — бір функция: сұраудан келген деректі алып, болжам қайтарады. Ноутбукта дерек әрқашан «дұрыс» болды, ал өнімде кез келген нәрсе келеді: өріс жоқ, сан орнына мәтін, теріс тенюр, <code>null</code>. Модель мұндай деректе қате бермей, жай бос сөз болжауы мүмкін. Сондықтан <b>кірісті тексеру</b> (input validation) модельге дейін жасалады.</p>
<h3>Болжам функциясының келісімі (contract)</h3>
<ul>
<li><b>Кіріс</b>: сөздік (JSON). Қай өрістер міндетті, қандай типте, қандай аралықта.</li>
<li><b>Шығыс</b>: сөздік: ықтималдық, класс, модель нұсқасы. Қате болса, қай өріс және неге.</li>
<li><b>Модель бір рет</b> жүктеледі (сервер іске қосылғанда), әр сұрауда емес.</li>
</ul>
<h3>Мысал</h3>
<pre><code>MODEL = joblib.load('churn_model.joblib')   # модуль деңгейінде, бір рет
MODEL_VERSION = '1.2.0'

def validate(data: dict) -> list[str]:
    errors = []
    t = data.get('tenure_months')
    if t is None:
        errors.append('tenure_months: міндетті өріс')
    elif not isinstance(t, int) or t &lt; 0:
        errors.append('tenure_months: теріс емес бүтін сан керек')
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
<h3>Нені тексереміз</h3>
<table>
<tr><th>Тексеріс</th><th>Мысал</th></tr>
<tr><td>Міндетті өріс бар ма</td><td><code>monthly_fee</code> жоқ</td></tr>
<tr><td>Типі</td><td><code>"12"</code> мәтін, сан емес</td></tr>
<tr><td>Аралығы</td><td><code>tenure_months = -3</code>, <code>monthly_fee = 0</code></td></tr>
<tr><td>Рұқсат етілген мәндер</td><td><code>has_contract</code> тек 0 немесе 1</td></tr>
</table>
<p>Барлық қатені бірден жинап қайтарыңыз, біріншісінде тоқтамаңыз: клиент бір сұраумен бәрін түзете алады. Әр хабарда өріс атауы болсын.</p>
<div class="tip">Python-да <code>True</code> — <code>int</code>-тің ішкі түрі: <code>isinstance(True, int)</code> → True. Сан өрісіне bool келмеуі керек болса, оны бөлек тексеріңіз.</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>validate_customer(data)</code> жазыңыз, ол қате хабарларының тізімін қайтарады (бәрі дұрыс болса бос тізім). Ережелер: <code>tenure_months</code> — бүтін сан ≥ 0; <code>monthly_fee</code> — сан (int немесе float) &gt; 0; <code>support_calls</code> — бүтін сан ≥ 0; <code>has_contract</code> — 0 немесе 1. Өріс жоқ болса да қате. Әр өріске ең көбі бір хабар, хабарда өріс атауы болсын.', starter: P`def validate_customer(data):
    errors = []
    if data['tenure_months'] < 0:
        errors.append('tenure_months: теріс')
    return errors
`, solution: P`def validate_customer(data):
    errors = []
    rules = {
        'tenure_months': lambda v: isinstance(v, int) and not isinstance(v, bool) and v >= 0,
        'monthly_fee': lambda v: isinstance(v, (int, float)) and not isinstance(v, bool) and v > 0,
        'support_calls': lambda v: isinstance(v, int) and not isinstance(v, bool) and v >= 0,
        'has_contract': lambda v: v in (0, 1),
    }
    for field, ok in rules.items():
        if field not in data:
            errors.append(f'{field}: міндетті өріс')
        elif not ok(data[field]):
            errors.append(f'{field}: мәні дұрыс емес ({data[field]!r})')
    return errors

print(validate_customer({'tenure_months': 3, 'monthly_fee': 4990, 'support_calls': 2, 'has_contract': 0}))
`, hints: ['Әр өріске тексеру функциясын сөздікке жинаңыз: <code>{\'tenure_months\': lambda v: isinstance(v, int) and v >= 0, ...}</code>.', 'Алдымен <code>if field not in data</code>, сосын <code>elif not ok(data[field])</code>. Хабар: <code>f\'{field}: ...\'</code>.'], check: { tests: P`_good = {'tenure_months': 3, 'monthly_fee': 4990.0, 'support_calls': 2, 'has_contract': 1}
assert validate_customer(_good) == [], 'Дұрыс дерек үшін бос тізім'
assert validate_customer(dict(_good, monthly_fee=4990)) == [], 'monthly_fee int болса да дұрыс'
_e = validate_customer({})
assert len(_e) == 4, f'Барлық 4 өріс жоқ: 4 хабар күтілді, сізде {len(_e)}'
_bad = {'tenure_months': -1, 'monthly_fee': 0, 'support_calls': 2.5, 'has_contract': 3}
_e = validate_customer(_bad)
assert len(_e) == 4, f'4 өріс те қате: 4 хабар күтілді, сізде {_e}'
for _f in _bad:
    assert any(_f in m for m in _e), f'{_f} үшін хабар жоқ (хабарда өріс атауы болсын)'
_e = validate_customer(dict(_good, tenure_months='12'))
assert len(_e) == 1 and 'tenure_months' in _e[0], 'Мәтін "12" — сан емес, қате'` } },
          { type: 'python', xp: 25, prompt: 'Модель бір рет үйретілген (<code>model</code>). <code>predict(data)</code> жазыңыз: <code>tenure_months</code> және <code>support_calls</code> — бүтін сан ≥ 0 болуы керек. Қате болса <code>{\'ok\': False, \'errors\': [...]}</code>. Дұрыс болса <code>{\'ok\': True, \'churn_probability\': p (3 таңбаға дөңгелектенген), \'label\': 1 немесе 0 (p ≥ 0.5), \'model_version\': MODEL_VERSION}</code>.', starter: MINI + P`MODEL_VERSION = '1.0.0'
model = LogisticRegression().fit(data[FEATURES], data['churned'])

def predict(customer):
    p = model.predict_proba(pd.DataFrame([customer])[FEATURES])[0, 1]
    return {'churn_probability': p}
`, solution: MINI + P`MODEL_VERSION = '1.0.0'
model = LogisticRegression().fit(data[FEATURES], data['churned'])

def predict(customer):
    errors = []
    for field in FEATURES:
        v = customer.get(field)
        if not isinstance(v, int) or isinstance(v, bool) or v < 0:
            errors.append(f'{field}: теріс емес бүтін сан керек')
    if errors:
        return {'ok': False, 'errors': errors}
    p = float(model.predict_proba(pd.DataFrame([customer])[FEATURES])[0, 1])
    return {'ok': True, 'churn_probability': round(p, 3), 'label': int(p >= 0.5), 'model_version': MODEL_VERSION}

print(predict({'tenure_months': 2, 'support_calls': 5}))
print(predict({'tenure_months': -2}))
`, hints: ['Алдымен <code>FEATURES</code> бойынша цикл: <code>customer.get(field)</code> бүтін сан ≥ 0 ма?', 'Ықтималдықты <code>float(...)</code>-қа айналдырып, <code>round(p, 3)</code>; <code>label = int(p >= 0.5)</code>.'], check: { tests: P`_r = predict({'tenure_months': 2, 'support_calls': 5, 'city': 'Астана'})
assert _r.get('ok') is True, 'Дұрыс кірісте ok=True'
assert set(_r) == {'ok', 'churn_probability', 'label', 'model_version'}, f'Жауап кілттері: ok, churn_probability, label, model_version. Сізде: {sorted(_r)}'
_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])
assert _r['churn_probability'] == round(_p, 3) and isinstance(_r['churn_probability'], float), 'churn_probability 3 таңбаға дөңгелектенген float болсын'
assert _r['label'] == 1 and _r['model_version'] == '1.0.0', 'label және model_version дұрыс емес'
assert predict({'tenure_months': 50, 'support_calls': 0})['label'] == 0, 'Ұзақ клиент үшін label 0 болуы керек'
_r = predict({'tenure_months': -2})
assert _r.get('ok') is False and len(_r.get('errors', [])) == 2, 'Теріс tenure және жоқ support_calls: 2 қате'
assert predict({'tenure_months': '3', 'support_calls': 1})['ok'] is False, 'Мәтін "3" қабылданбауы керек'` } },
          { type: 'quiz', xp: 10, prompt: 'API-де модельді қай жерде жүктеген дұрыс?', options: ['Әр сұрауда <code>predict</code> функциясының ішінде <code>joblib.load</code>', 'Сервер іске қосылғанда бір рет (модуль деңгейінде немесе startup оқиғасында), сосын барлық сұрау сол объектіні қолданады', 'Әр 10-шы сұрауда', 'Клиенттің браузерінде'], answer: 1, explain: 'Файлдан жүктеу ондаған-жүздеген миллисекунд алады. Әр сұрауда жүктесеңіз, latency бірнеше есе өседі.' }
        ]
      },
      {
        id: 'dep-3', title: 'FastAPI: модельді endpoint-ке айналдыру', minutes: 16,
        body: `
<p><b>FastAPI</b> — Python-да API жазуға арналған заманауи фреймворк. ML-де өте танымал: type hints-тен автоматты тексеру мен құжаттама жасайды, жылдам жұмыс істейді. Ол браузердегі Python-да жоқ, сондықтан кодты мәтін ретінде талдаймыз, ал тапсырмаларда оның өзегін (router) өзіміз модельдейміз.</p>
<h3>Ең кішкене сервис</h3>
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
        raise HTTPException(status_code=404, detail='Клиент табылмады')
    return DB[customer_id]</code></pre>
<pre><code>$ pip install fastapi uvicorn
$ uvicorn main:app --reload --port 8000
# http://localhost:8000/docs  → Swagger UI, endpoint-терді браузерде сынауға болады</code></pre>
<h3>Не болып жатыр</h3>
<ul>
<li><code>@app.get('/health')</code> — <b>декоратор</b>: функцияны «GET /health сұрауы келсе, осыны шақыр» деп кестеге тіркейді. Бұл кесте — <b>router</b>.</li>
<li><code>customer: Customer</code> — FastAPI JSON body-ді Pydantic моделімен тексереді. Қате болса, функция шақырылмай-ақ <b>422</b> қайтады.</li>
<li><code>{customer_id}</code> — <b>path параметрі</b>, ал <code>include_history</code> — <b>query параметрі</b>: <code>/customers/7?include_history=true</code>.</li>
<li>Функция қайтарған сөздік JSON-ға айналады, әдепкі код 200.</li>
<li><code>uvicorn main:app</code> — «<code>main.py</code> файлындағы <code>app</code> объектісін іске қос».</li>
</ul>
<h3>Router-дің ішкі логикасы</h3>
<pre><code>routes = {('GET', '/health'): health, ('POST', '/predict'): predict}

def handle(method, path, body):
    func = routes.get((method, path))
    if func is None:
        return 404 (немесе path бар, метод басқа болса 405)
    return 200, func(...)</code></pre>
<div class="tip">Әрбір ML сервисінде кемінде екі endpoint болады: <code>GET /health</code> (сервис тірі ме) және <code>POST /predict</code>. Модель нұсқасын жауапқа немесе <code>/health</code>-қа қосу — жақсы әдет.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'FastAPI-ге ұқсас <code>MiniApp</code> дайын. Декораторлар арқылы екі endpoint тіркеңіз: <code>GET /health</code> → <code>{\'status\': \'ok\', \'model_version\': MODEL_VERSION}</code>; <code>POST /predict</code> → body-ден <code>support_calls</code> алып, <code>{\'risk\': round(min(1.0, 0.15 * support_calls), 2)}</code> қайтарады. <code>support_calls</code> жоқ болса, <code>ValueError</code> лақтырсын (MiniApp оны 422-ге айналдырады).', starter: MINIAPP + P`
app = MiniApp()
MODEL_VERSION = '1.0.0'

# осында @app.get және @app.post endpoint-терін жазыңыз
`, solution: MINIAPP + P`
app = MiniApp()
MODEL_VERSION = '1.0.0'

@app.get('/health')
def health():
    return {'status': 'ok', 'model_version': MODEL_VERSION}

@app.post('/predict')
def predict(body):
    if 'support_calls' not in body:
        raise ValueError('support_calls: міндетті өріс')
    return {'risk': round(min(1.0, 0.15 * body['support_calls']), 2)}

print(app.handle('GET', '/health'))
print(app.handle('POST', '/predict', {'support_calls': 3}))
`, hints: ['Декоратор функцияның үстіне жазылады: <code>@app.get(\'/health\')</code>, келесі жолда <code>def health():</code>.', 'POST функциясы body алады: <code>def predict(body):</code>. Өріс жоқ болса <code>raise ValueError(...)</code>.'], check: { tests: P`assert app.handle('GET', '/health') == (200, {'status': 'ok', 'model_version': '1.0.0'}), 'GET /health → 200 және status/model_version'
assert app.handle('POST', '/predict', {'support_calls': 3}) == (200, {'risk': 0.45}), 'POST /predict {support_calls: 3} → risk 0.45'
assert app.handle('POST', '/predict', {'support_calls': 10}) == (200, {'risk': 1.0}), 'risk 1.0-ден аспауы керек'
assert app.handle('POST', '/predict', {})[0] == 422, 'support_calls жоқ болса ValueError → 422'
assert app.handle('GET', '/predict')[0] == 405, '/predict тек POST қабылдауы керек'` } },
          { type: 'python', xp: 25, prompt: 'Енді router-дің өзін жазыңыз. <code>MiniApp</code>: <code>get(path)</code> және <code>post(path)</code> декораторлары функцияны <code>self.routes[(method, path)]</code>-ге тіркеп, функцияның өзін қайтарады. <code>handle(method, path, body=None)</code>: маршрут табылса — GET үшін <code>func()</code>, POST үшін <code>func(body)</code> шақырып, <code>(200, нәтиже)</code>; path бар, бірақ метод басқа болса <code>(405, ...)</code>; path мүлде жоқ болса <code>(404, ...)</code>.', starter: P`class MiniApp:
    def __init__(self):
        self.routes = {}

    def get(self, path):
        pass

    def post(self, path):
        pass

    def handle(self, method, path, body=None):
        return 404, {'detail': 'Not Found'}
`, solution: P`class MiniApp:
    def __init__(self):
        self.routes = {}

    def _register(self, method, path):
        def decorator(func):
            self.routes[(method, path)] = func
            return func
        return decorator

    def get(self, path):
        return self._register('GET', path)

    def post(self, path):
        return self._register('POST', path)

    def handle(self, method, path, body=None):
        func = self.routes.get((method, path))
        if func is None:
            if any(p == path for _, p in self.routes):
                return 405, {'detail': 'Method Not Allowed'}
            return 404, {'detail': 'Not Found'}
        result = func(body) if method == 'POST' else func()
        return 200, result

app = MiniApp()

@app.get('/ping')
def ping():
    return {'pong': True}

print(app.handle('GET', '/ping'))
`, hints: ['Декоратор фабрикасы: <code>def get(self, path):</code> ішінде <code>def decorator(func): self.routes[(\'GET\', path)] = func; return func</code>, соңында <code>return decorator</code>.', '405 үшін: <code>any(p == path for _, p in self.routes)</code>.'], check: { tests: P`_app = MiniApp()
@_app.get('/health')
def _h():
    return {'status': 'ok'}
@_app.post('/echo')
def _e(body):
    return {'got': body}
assert _h() == {'status': 'ok'}, 'Декоратор функцияның өзін қайтаруы керек (return func)'
assert ('GET', '/health') in _app.routes and ('POST', '/echo') in _app.routes, 'routes кілттері (method, path) болуы керек'
assert _app.handle('GET', '/health') == (200, {'status': 'ok'}), 'GET /health → 200'
assert _app.handle('POST', '/echo', {'a': 1}) == (200, {'got': {'a': 1}}), 'POST функциясына body беріледі'
assert _app.handle('POST', '/health')[0] == 405, 'Path бар, метод басқа → 405'
assert _app.handle('GET', '/nope')[0] == 404, 'Белгісіз path → 404'` } },
          { type: 'quiz', xp: 10, prompt: '<code>uvicorn main:app --port 8000</code> командасындағы <code>main:app</code> нені білдіреді?', options: ['<code>main</code> деген функцияны <code>app</code> портында іске қосу', '<code>main.py</code> модуліндегі <code>app</code> деген FastAPI объектісін іске қосу', 'Docker образының атауы мен тегі', 'Git тармағы мен репозиторий'], answer: 1, explain: 'Формат: <code>модуль:айнымалы</code>. Uvicorn <code>main.py</code>-ды импорттап, ішіндегі <code>app</code> объектісіне сұрауларды жібереді.' },
          { type: 'quiz', xp: 10, prompt: 'FastAPI-де <code>GET /customers/{customer_id}</code> endpoint-і бар. Клиент табылмаса, ең дұрыс әрекет қайсы?', options: ['<code>return {}</code> (200 кодымен)', '<code>raise HTTPException(status_code=404, detail=\'Клиент табылмады\')</code>', '<code>return None</code>', 'Серверді тоқтату'], answer: 1, explain: '404 клиентке ресурстың жоқ екенін анық айтады. Бос жауап 200 кодымен келсе, клиент «бәрі дұрыс» деп ойлайды.' }
        ]
      }
      ,
      {
        id: 'dep-4', title: 'Pydantic: деректі схема арқылы тексеру', minutes: 14,
        body: `
<p>Алдыңғы сабақта тексерулерді <code>if</code>-тармен қолмен жаздық. Өріс көп болса, бұл ұзақ әрі қатеге бейім. <b>Pydantic</b> кірістің <b>схемасын</b> type hints арқылы сипаттауға мүмкіндік береді, ал тексеру мен түрлендіруді кітапхана өзі жасайды. FastAPI request body-ді дәл осымен тексереді.</p>
<h3>Мысал</h3>
<pre><code>from typing import Literal
from pydantic import BaseModel, Field

class CustomerIn(BaseModel):
    tenure_months: int = Field(ge=0, le=600)
    monthly_fee: float = Field(gt=0)
    support_calls: int = Field(ge=0)
    city: Literal['Алматы', 'Астана', 'Шымкент']

c = CustomerIn(tenure_months='12', monthly_fee=4990, support_calls=1, city='Алматы')
c.tenure_months      # 12  ← "12" мәтіні int-ке түрлендірілді
c.model_dump()       # {'tenure_months': 12, 'monthly_fee': 4990.0, ...}

CustomerIn(tenure_months=-3, monthly_fee=0, support_calls=1, city='Париж')
# ValidationError: 3 validation errors
#   tenure_months: Input should be greater than or equal to 0
#   monthly_fee:   Input should be greater than 0
#   city:          Input should be 'Алматы', 'Астана' or 'Шымкент'</code></pre>
<h3>FastAPI-мен бірге</h3>
<p><code>def predict(customer: CustomerIn)</code> деп жазсаңыз, FastAPI JSON-ды осы схемамен тексереді. Қате болса, функция мүлде шақырылмайды, клиент <b>422</b> және қай өріс неге қате екенін көрсететін <code>detail</code> тізімін алады. Шығысқа да схема беруге болады: <code>@app.post('/predict', response_model=PredictionOut)</code>.</p>
<h3>Негізгі мүмкіндіктер</h3>
<ul>
<li><b>Түрлендіру</b> (coercion): <code>"12"</code> → <code>12</code>; бірақ <code>"он екі"</code> → қате.</li>
<li><b>Шектеулер</b>: <code>Field(ge=0)</code> (≥), <code>gt</code> (&gt;), <code>le</code>, <code>max_length</code>.</li>
<li><b>Рұқсат етілген мәндер</b>: <code>Literal[...]</code> немесе <code>Enum</code>.</li>
<li><b>Әдепкі мәндер</b> және міндетті емес өрістер: <code>promo: str | None = None</code>.</li>
<li><b>Артық өрістер</b>: әдепкіде еленбейді, <code>model_config = {'extra': 'forbid'}</code> болса қате.</li>
</ul>
<p>Pydantic браузердегі Python-да жоқ, сондықтан тапсырмаларда оның идеясын стандартты <code>@dataclass</code> пен <code>__post_init__</code> арқылы қайталаймыз: объект жасалған бойда өрістерді түрлендіріп, тексереміз.</p>
<pre><code>@dataclass
class Point:
    x: int
    def __post_init__(self):
        self.x = int(self.x)       # түрлендіру
        if self.x &lt; 0:
            raise ValueError('x: теріс болмауы керек')</code></pre>
<div class="tip">Схема — сервис пен клиенттің арасындағы келісімшарт. Оны бір жерде (бір класта) ұстаңыз, сонда құжаттама (<code>/docs</code>), тексеру және код бір-бірінен алшақтамайды.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: '<code>CustomerIn</code> dataclass-ына <code>__post_init__</code> қосыңыз: <code>tenure_months</code> пен <code>support_calls</code>-ты <code>int()</code> арқылы түрлендіріңіз (сан емес мәтін болса <code>int</code> өзі ValueError береді); теріс болса <code>ValueError</code>; <code>city</code> <code>ALLOWED_CITIES</code> ішінде болмаса <code>ValueError</code>. Хабарда өріс атауы болсын.', starter: P`from dataclasses import dataclass

ALLOWED_CITIES = {'Алматы', 'Астана', 'Шымкент'}

@dataclass
class CustomerIn:
    tenure_months: int
    support_calls: int
    city: str
`, solution: P`from dataclasses import dataclass

ALLOWED_CITIES = {'Алматы', 'Астана', 'Шымкент'}

@dataclass
class CustomerIn:
    tenure_months: int
    support_calls: int
    city: str

    def __post_init__(self):
        self.tenure_months = int(self.tenure_months)
        self.support_calls = int(self.support_calls)
        if self.tenure_months < 0:
            raise ValueError('tenure_months: теріс болмауы керек')
        if self.support_calls < 0:
            raise ValueError('support_calls: теріс болмауы керек')
        if self.city not in ALLOWED_CITIES:
            raise ValueError(f'city: {self.city} рұқсат етілмеген')

print(CustomerIn('12', 3, 'Алматы'))
`, hints: ['<code>def __post_init__(self):</code> ішінде <code>self.tenure_months = int(self.tenure_months)</code>.', 'Сосын <code>if self.city not in ALLOWED_CITIES: raise ValueError(\'city: ...\')</code>.'], check: { tests: P`_c = CustomerIn('12', '3', 'Алматы')
assert _c.tenure_months == 12 and _c.support_calls == 3, '"12" және "3" int-ке түрлендірілуі керек'
assert isinstance(_c.tenure_months, int), 'tenure_months int болуы керек'
for _args, _field in [((-1, 0, 'Алматы'), 'tenure_months'), ((5, -2, 'Астана'), 'support_calls'), ((5, 1, 'Париж'), 'city')]:
    try:
        CustomerIn(*_args)
    except ValueError as _e:
        assert _field in str(_e), f'Хабарда өріс атауы ({_field}) болсын, сізде: {_e}'
    else:
        raise AssertionError(f'CustomerIn{_args} ValueError лақтыруы керек')
try:
    CustomerIn('он екі', 1, 'Алматы')
except ValueError:
    pass
else:
    raise AssertionError('Сан емес мәтін ValueError беруі керек')` } },
          { type: 'python', xp: 25, prompt: 'Дайын <code>CustomerIn</code> схемасымен FastAPI-дің мінез-құлқын қайталаңыз. <code>handle_predict(body)</code>: <code>CustomerIn(**body)</code> жасаңыз; өріс жоқ немесе артық болса (<code>TypeError</code>), не тексеруден өтпесе (<code>ValueError</code>) → <code>(422, {\'detail\': str(e)})</code>. Сәтті болса → <code>(200, {\'customer\': asdict(c), \'risk\': r})</code>, мұндағы <code>r = round(min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0)), 2)</code>.', starter: P`from dataclasses import dataclass, asdict

ALLOWED_CITIES = {'Алматы', 'Астана', 'Шымкент'}

@dataclass
class CustomerIn:
    tenure_months: int
    support_calls: int
    city: str

    def __post_init__(self):
        self.tenure_months = int(self.tenure_months)
        self.support_calls = int(self.support_calls)
        if self.tenure_months < 0 or self.support_calls < 0:
            raise ValueError('tenure_months, support_calls: теріс болмауы керек')
        if self.city not in ALLOWED_CITIES:
            raise ValueError(f'city: {self.city} рұқсат етілмеген')

def handle_predict(body):
    c = CustomerIn(**body)
    return 200, {'customer': asdict(c)}
`, solution: P`from dataclasses import dataclass, asdict

ALLOWED_CITIES = {'Алматы', 'Астана', 'Шымкент'}

@dataclass
class CustomerIn:
    tenure_months: int
    support_calls: int
    city: str

    def __post_init__(self):
        self.tenure_months = int(self.tenure_months)
        self.support_calls = int(self.support_calls)
        if self.tenure_months < 0 or self.support_calls < 0:
            raise ValueError('tenure_months, support_calls: теріс болмауы керек')
        if self.city not in ALLOWED_CITIES:
            raise ValueError(f'city: {self.city} рұқсат етілмеген')

def handle_predict(body):
    try:
        c = CustomerIn(**body)
    except (TypeError, ValueError) as e:
        return 422, {'detail': str(e)}
    risk = round(min(1.0, 0.1 * c.support_calls + (0.3 if c.tenure_months < 6 else 0)), 2)
    return 200, {'customer': asdict(c), 'risk': risk}

print(handle_predict({'tenure_months': '3', 'support_calls': 2, 'city': 'Шымкент'}))
`, hints: ['<code>try: c = CustomerIn(**body)</code>, <code>except (TypeError, ValueError) as e: return 422, {\'detail\': str(e)}</code>.', 'Сәтті жағдайда <code>asdict(c)</code> түрлендірілген мәндерді береді.'], check: { tests: P`_s, _d = handle_predict({'tenure_months': '3', 'support_calls': 2, 'city': 'Шымкент'})
assert _s == 200, 'Дұрыс body → 200'
assert _d.get('customer') == {'tenure_months': 3, 'support_calls': 2, 'city': 'Шымкент'}, 'customer — түрлендірілген мәндер (asdict)'
assert _d.get('risk') == 0.5, f'risk = 0.1*2 + 0.3 = 0.5 болуы керек, сізде {_d.get("risk")}'
assert handle_predict({'tenure_months': 24, 'support_calls': 1, 'city': 'Алматы'})[1]['risk'] == 0.1, 'tenure ≥ 6 болса 0.3 қосылмайды'
_s, _d = handle_predict({'tenure_months': 3, 'city': 'Алматы'})
assert _s == 422 and 'detail' in _d, 'Өріс жоқ → 422 және detail'
assert handle_predict({'tenure_months': 3, 'support_calls': 1, 'city': 'Алматы', 'promo': 'X'})[0] == 422, 'Артық өріс → 422'
assert handle_predict({'tenure_months': 3, 'support_calls': 1, 'city': 'Орал'})[0] == 422, 'Рұқсат етілмеген қала → 422'
assert handle_predict({'tenure_months': 'abc', 'support_calls': 1, 'city': 'Алматы'})[0] == 422, 'Сан емес мән → 422'` } },
          { type: 'quiz', xp: 10, prompt: 'FastAPI endpoint-і <code>CustomerIn</code> (Pydantic, <code>tenure_months: int = Field(ge=0)</code>) қабылдайды. Клиент <code>{"tenure_months": "abc", ...}</code> жіберді. Не болады?', options: ['Функция шақырылып, tenure_months = 0 болады', 'Функция шақырылмайды, клиент 422 және tenure_months өрісі туралы қате хабарын алады', 'Сервер 500 қайтарады', 'Сұрау еленбей, 200 қайтады'], answer: 1, explain: 'Pydantic "abc"-ны int-ке түрлендіре алмайды, FastAPI функцияға жетпей 422 қайтарады. Ал "12" болса, ол 12-ге түрлендірілер еді.' }
        ]
      },
      {
        id: 'dep-5', title: 'Docker: image, container, port', minutes: 16,
        body: `
<p>«Менің компьютерімде жұмыс істейді» — деплойдағы ең көп айтылатын сөз. Серверде Python-ның басқа нұсқасы, кітапхана жоқ, жүйелік тәуелділік басқа. <b>Docker</b> қосымшаны оның бүкіл ортасымен (Python, кітапханалар, код, модель файлы) бірге бір пакетке салады, ол кез келген Docker бар машинада бірдей жұмыс істейді.</p>
<h3>Image және container</h3>
<ul>
<li><b>Image</b> — дайын «қалып»: файлдар мен баптаулар, өзгермейді. Python-дағы класқа ұқсайды.</li>
<li><b>Container</b> — image-тен іске қосылған жұмыс істеп тұрған дана. Объектіге ұқсайды: бір image-тен ондаған container іске қосуға болады.</li>
<li><b>Registry</b> (Docker Hub, GitHub Container Registry) — image-тер сақталатын орын.</li>
</ul>
<h3>Dockerfile жол-жолымен</h3>
<pre><code>FROM python:3.12-slim                 # базалық image: Python бар жеңіл Linux
WORKDIR /app                          # ішкі жұмыс папкасы
COPY requirements.txt .               # алдымен тек тәуелділіктер тізімі
RUN pip install --no-cache-dir -r requirements.txt
COPY . .                              # сосын бүкіл код пен модель
EXPOSE 8000                           # container қай портты тыңдайды (құжат)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
<p><b>Неге requirements.txt бірінші?</b> Docker әр жолды <b>layer</b> (қабат) ретінде кэштейді. Кодты өзгерткенде тек <code>COPY . .</code> және одан кейінгі қабаттар қайта құрылады, ал ұзақ <code>pip install</code> кэштен алынады. Егер <code>COPY . .</code> бірінші тұрса, әр өзгерісте барлық кітапхана қайта орнатылады.</p>
<p><b>Неге 0.0.0.0?</b> <code>127.0.0.1</code> тек container-дің ішінен қолжетімді. Сырттан келетін сұрауларды қабылдау үшін сервер <code>0.0.0.0</code>-ды тыңдауы керек.</p>
<h3>Командалар</h3>
<pre><code>docker build -t churn-api:1.0 .            # image құру
docker run -p 8080:8000 churn-api:1.0      # container іске қосу
#              ↑ хост   ↑ container ішіндегі порт
curl http://localhost:8080/health          # сіздің компьютерден
docker ps                                  # жұмыс істеп тұрған container-лер
docker logs &lt;container_id&gt;                 # журнал</code></pre>
<p><code>.dockerignore</code> файлына <code>.venv</code>, <code>.git</code>, <code>notebooks/</code>, деректер мен құпиялар жазылады: олар image-ке кірмеуі керек.</p>
<div class="tip">Image-ге <b>құпия</b> (API кілт, пароль) салмаңыз: image-ті алған кез келген адам оны оқи алады. Құпиялар іске қосу кезінде environment variable ретінде беріледі (келесі сабақ).</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Әріптестің Dockerfile-ы <code>dockerfile</code> айнымалысында. Ол сырттан қолжетімсіз және баяу құрылады. Түзетіңіз: <code>FROM python:3.12-slim</code> бірінші; <code>WORKDIR /app</code>; <code>COPY requirements.txt .</code> → <code>RUN pip install ... -r requirements.txt</code> → <code>COPY . .</code> осы ретпен; <code>EXPOSE 8000</code>; соңғы жол <code>CMD</code> uvicorn-ды <code>0.0.0.0</code> хостында 8000 портта іске қоссын.', starter: P`dockerfile = """
FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]
"""
`, solution: P`dockerfile = """
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
"""
print(dockerfile)
`, hints: ['Кэш үшін: алдымен <code>COPY requirements.txt .</code>, сосын <code>RUN pip install</code>, тек содан кейін <code>COPY . .</code>.', 'CMD-де <code>"--host", "0.0.0.0"</code>, ал CMD алдында <code>EXPOSE 8000</code>.'], check: { tests: P`_L = [l.strip() for l in dockerfile.strip().splitlines() if l.strip() and not l.strip().startswith('#')]
_I = [l.split()[0].upper() for l in _L]
assert _L[0].startswith('FROM python:3'), 'Бірінші жол: FROM python:3.12-slim'
assert 'WORKDIR' in _I and _I.index('WORKDIR') < _I.index('COPY'), 'COPY-дан бұрын WORKDIR /app'
_req = next((i for i, l in enumerate(_L) if l.split()[:2] == ['COPY', 'requirements.txt']), None)
_pip = next((i for i, l in enumerate(_L) if l.startswith('RUN') and 'pip install' in l and '-r requirements.txt' in l), None)
_all = next((i for i, l in enumerate(_L) if l.split() == ['COPY', '.', '.']), None)
assert _req is not None and _pip is not None and _all is not None, 'Үш жол керек: COPY requirements.txt . / RUN pip install -r requirements.txt / COPY . .'
assert _req < _pip < _all, 'Рет: COPY requirements.txt → RUN pip install → COPY . . (layer кэші үшін)'
assert any(l.split()[:2] == ['EXPOSE', '8000'] for l in _L), 'EXPOSE 8000 қосыңыз'
assert _I[-1] == 'CMD', 'Соңғы жол CMD болуы керек'
assert '0.0.0.0' in _L[-1] and '8000' in _L[-1] and 'uvicorn' in _L[-1], 'CMD uvicorn-ды 0.0.0.0 хостында 8000 портта іске қоссын'` } },
          { type: 'number', xp: 10, prompt: 'Container ішінде сервер 8000 портты тыңдайды. Сіз <code>docker run -p 9000:8000 churn-api:1.0</code> деп іске қостыңыз. Өз компьютеріңіздің браузерінде <code>http://localhost:____/health</code> — қай порт?', answer: 9000, tol: 0, explain: '<code>-p ХОСТ:CONTAINER</code>. Сол жақтағы 9000 — сіздің машинаңыздың порты, ол container ішіндегі 8000-ға жалғанады.' },
          { type: 'quiz', xp: 10, prompt: 'Image мен container-дің айырмасы қандай?', options: ['Олар бір нәрсенің екі атауы', 'Image — өзгермейтін қалып (класқа ұқсас), container — сол image-тен іске қосылған жұмыс істеп тұрған дана (объектіге ұқсас)', 'Container — Dockerfile-дың мәтіні, image — іске қосылған процесс', 'Image тек Linux-та, container тек Windows-та'], answer: 1, explain: 'Бір image-тен бірнеше container іске қосып, жүктемені бөлуге болады.' },
          { type: 'quiz', xp: 10, prompt: 'Dockerfile-да <code>COPY . .</code> жолы <code>RUN pip install -r requirements.txt</code>-тен <b>бұрын</b> тұр. Кодтағы бір жолды өзгерттіңіз. Не болады?', options: ['Ештеңе, Docker тек өзгерген файлды көшіреді', 'COPY қабаты өзгергендіктен, одан кейінгі pip install қабаты да кэштен алынбай, барлық кітапхана қайта орнатылады', 'Build қатемен тоқтайды', 'Container іске қосылмайды'], answer: 1, explain: 'Бір қабат өзгерсе, одан кейінгі барлық қабат қайта құрылады. Сондықтан сирек өзгеретін нәрселер (тәуелділіктер) жоғарыда тұрады.' }
        ]
      },
      {
        id: 'dep-6', title: 'Environment variables және config', minutes: 13,
        body: `
<p>Бір код әр түрлі ортада жұмыс істейді: сіздің ноутбукта (dev), тексеру серверінде (staging) және өнімде (production). Айырмасы — <b>баптауларда</b>: модель файлының жолы, порт, шек, дерекқор адресі, API кілттері. Оларды кодқа жазбай, <b>environment variables</b> (орта айнымалылары) арқылы береміз. Бұл «12-factor app» тәсілінің негізгі ережесі.</p>
<h3>Python-да оқу</h3>
<pre><code>import os

MODEL_PATH = os.environ['MODEL_PATH']                  # міндетті: жоқ болса KeyError
PORT = int(os.getenv('PORT', '8000'))                  # әдепкі мәні бар
DEBUG = os.getenv('DEBUG', 'false').lower() in ('1', 'true', 'yes')
THRESHOLD = float(os.getenv('THRESHOLD', '0.5'))</code></pre>
<p>Маңызды: environment variable әрқашан <b>мәтін</b>. <code>'8000'</code>-ды <code>int</code>-ке, <code>'false'</code>-ты bool-ға өзіңіз түрлендіресіз. <code>bool('false')</code> → <code>True</code> екенін ұмытпаңыз!</p>
<h3>Қалай беріледі</h3>
<pre><code># терминалда
export MODEL_PATH=models/churn_v1.2.0.joblib
# Docker
docker run -e THRESHOLD=0.35 --env-file .env -p 8080:8000 churn-api:1.0
# .env файлы (git-ке салынбайды!)
MODEL_PATH=models/churn_v1.2.0.joblib
DB_PASSWORD=s3cr3t</code></pre>
<p>Жергілікті әзірлеуде <code>.env</code> файлын <code>python-dotenv</code> оқиды, ал Render, Railway сияқты платформаларда айнымалылар dashboard-та беріледі. Pydantic-тің <code>pydantic-settings</code> пакеті config-ті схема ретінде сипаттап, түрлендіру мен тексеруді өзі жасайды.</p>
<h3>Ережелер</h3>
<ul>
<li><b>Құпия кодта да, git-те де, Docker image-те де болмайды.</b> <code>.env</code> → <code>.gitignore</code>. Репозиторийге тек мәнсіз үлгі <code>.env.example</code> салынады.</li>
<li>Config-ті <b>бір жерде</b>, іске қосылғанда бір рет оқып, тексеріңіз. Міндетті айнымалы жоқ болса, сервер бірден түсінікті қатемен тоқтасын: бірінші сұрауда емес.</li>
<li>Config-ті журналға жазғанда құпияларды <b>жасырыңыз</b>.</li>
</ul>
<div class="tip">Құпия кездейсоқ git-ке түсіп кетсе, файлды жою жеткіліксіз: ол тарихта қалады. Кілтті бірден <b>ауыстырыңыз</b> (rotate).</div>`,
        exercises: [
          { type: 'python', xp: 25, prompt: '<code>load_config(env)</code> жазыңыз (<code>env</code> — <code>os.environ</code> сияқты сөздік, мәндері мәтін). Қайтаратыны: <code>{\'model_path\', \'port\', \'debug\', \'threshold\'}</code>. <code>MODEL_PATH</code> міндетті: жоқ болса <code>RuntimeError</code> (хабарында MODEL_PATH). <code>PORT</code> → int, әдепкі 8000. <code>DEBUG</code> → bool: <code>1/true/yes</code> (кез келген регистр) болса True, әдепкі False. <code>THRESHOLD</code> → float, әдепкі 0.5; 0..1 аралығынан тыс болса <code>RuntimeError</code> (хабарында THRESHOLD).', starter: P`def load_config(env):
    return {
        'model_path': env.get('MODEL_PATH'),
        'port': env.get('PORT', 8000),
        'debug': bool(env.get('DEBUG', False)),
        'threshold': env.get('THRESHOLD', 0.5),
    }
`, solution: P`def load_config(env):
    if 'MODEL_PATH' not in env:
        raise RuntimeError('MODEL_PATH environment variable міндетті')
    threshold = float(env.get('THRESHOLD', '0.5'))
    if not 0 <= threshold <= 1:
        raise RuntimeError(f'THRESHOLD 0 мен 1 аралығында болуы керек: {threshold}')
    return {
        'model_path': env['MODEL_PATH'],
        'port': int(env.get('PORT', '8000')),
        'debug': env.get('DEBUG', 'false').strip().lower() in ('1', 'true', 'yes'),
        'threshold': threshold,
    }

print(load_config({'MODEL_PATH': 'models/churn.joblib', 'DEBUG': 'True'}))
`, hints: ['Мәтінді bool-ға: <code>env.get(\'DEBUG\', \'false\').lower() in (\'1\', \'true\', \'yes\')</code>. <code>bool(\'false\')</code> True береді!', 'Міндетті айнымалы: <code>if \'MODEL_PATH\' not in env: raise RuntimeError(...)</code>.'], check: { tests: P`_c = load_config({'MODEL_PATH': 'm.joblib'})
assert _c == {'model_path': 'm.joblib', 'port': 8000, 'debug': False, 'threshold': 0.5}, f'Әдепкі мәндер дұрыс емес: {_c}'
_c = load_config({'MODEL_PATH': 'm.joblib', 'PORT': '10000', 'DEBUG': 'TRUE', 'THRESHOLD': '0.35'})
assert _c['port'] == 10000 and isinstance(_c['port'], int), 'PORT мәтінін int-ке айналдырыңыз'
assert _c['debug'] is True, 'DEBUG="TRUE" → True (регистрге қарамай)'
assert _c['threshold'] == 0.35, 'THRESHOLD мәтінін float-қа айналдырыңыз'
assert load_config({'MODEL_PATH': 'm', 'DEBUG': 'false'})['debug'] is False, 'DEBUG="false" → False'
assert load_config({'MODEL_PATH': 'm', 'DEBUG': '0'})['debug'] is False, 'DEBUG="0" → False'
for _env, _w in [({}, 'MODEL_PATH'), ({'MODEL_PATH': 'm', 'THRESHOLD': '1.5'}, 'THRESHOLD')]:
    try:
        load_config(_env)
    except RuntimeError as _e:
        assert _w in str(_e), f'Хабарда {_w} аталсын'
    else:
        raise AssertionError(f'{_env} үшін RuntimeError күтілді')` } },
          { type: 'python', xp: 15, prompt: 'Сервис іске қосылғанда config журналға жазылады. <code>safe_config(cfg)</code> жазыңыз: кілтінде <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> немесе <code>TOKEN</code> бар (регистрге қарамай) мәндерді <code>\'***\'</code>-мен ауыстырған <b>жаңа</b> сөздік қайтарсын. Бастапқы сөздік өзгермесін.', starter: P`cfg = {
    'MODEL_PATH': 'models/churn.joblib',
    'DB_PASSWORD': 's3cr3t',
    'openai_api_key': 'sk-abc123',
    'PORT': '8000',
}

def safe_config(cfg):
    return cfg
`, solution: P`cfg = {
    'MODEL_PATH': 'models/churn.joblib',
    'DB_PASSWORD': 's3cr3t',
    'openai_api_key': 'sk-abc123',
    'PORT': '8000',
}

SECRET_MARKERS = ('KEY', 'SECRET', 'PASSWORD', 'TOKEN')

def safe_config(cfg):
    return {k: '***' if any(m in k.upper() for m in SECRET_MARKERS) else v for k, v in cfg.items()}

print(safe_config(cfg))
`, hints: ['Кілтті <code>k.upper()</code> етіп, ішінде маркерлердің бірі бар ма тексеріңіз: <code>any(m in k.upper() for m in (...))</code>.', 'Жаңа сөздік: <code>{k: ... for k, v in cfg.items()}</code>.'], check: { tests: P`_s = safe_config(cfg)
assert _s == {'MODEL_PATH': 'models/churn.joblib', 'DB_PASSWORD': '***', 'openai_api_key': '***', 'PORT': '8000'}, f'Нәтиже дұрыс емес: {_s}'
assert cfg['DB_PASSWORD'] == 's3cr3t', 'Бастапқы cfg өзгермеуі керек: жаңа сөздік қайтарыңыз'
assert safe_config({'Telegram_Token': 'x', 'secret_salt': 'y'}) == {'Telegram_Token': '***', 'secret_salt': '***'}, 'TOKEN және SECRET да жасырылсын (регистрге қарамай)'` } },
          { type: 'quiz', xp: 10, prompt: 'Дерекқор паролін қай жерде сақтау дұрыс?', options: ['<code>main.py</code>-да константа ретінде', '<code>requirements.txt</code>-те', 'Платформаның environment variables / secrets баптауында (жергілікті жерде git-ке салынбайтын .env файлында)', 'Dockerfile-да <code>ENV DB_PASSWORD=...</code> жолымен'], answer: 2, explain: 'Код, git және Docker image көп адамға қолжетімді. Құпия тек іске қосу кезінде ортадан беріледі.' }
        ]
      }
      ,
      {
        id: 'dep-7', title: 'Бұлтқа деплой және health check', minutes: 15,
        body: `
<p>Docker image дайын. Енді оны интернетте үнемі жұмыс істейтін жерге қою керек. Бастаушыға үш жол бар.</p>
<table>
<tr><th>Нұсқа</th><th>Қалай жұмыс істейді</th><th>Артықшылығы</th><th>Кемшілігі</th></tr>
<tr><td><b>Render</b></td><td>GitHub репозиторийін қосасыз, ол Dockerfile-дан өзі құрып, HTTPS адрес береді</td><td>Ең оңай; тегін жоспар бар; git push → автоматты деплой</td><td>Тегін сервис бос тұрса «ұйықтайды»: келесі сұрау 30–60 с күтеді (cold start)</td></tr>
<tr><td><b>Railway</b></td><td>Render-ге ұқсас, Dockerfile немесе автоматты анықтау</td><td>Ыңғайлы интерфейс, дерекқорды бір батырмамен қосу</td><td>Қолданған ресурс бойынша төлем, шығынды бақылау керек</td></tr>
<tr><td><b>VPS</b> (Hetzner, DigitalOcean, ps.kz)</td><td>Жалға алынған Linux сервер: Docker орнатып, өзіңіз іске қосасыз, алдына nginx және TLS</td><td>Толық бақылау, тұрақты баға, дерек Қазақстанда сақталуы мүмкін</td><td>Жаңарту, қауіпсіздік, бэкап, мониторинг — бәрі өзіңізде</td></tr>
</table>
<p>Үлкен компанияларда Google Cloud Run, AWS App Runner немесе Kubernetes қолданылады, бірақ идея бірдей: <b>container + config + health check</b>.</p>
<h3>Health check</h3>
<p>Платформа сервисіңізге әр бірнеше секунд сайын сұрау жіберіп, оның тірі екенін тексереді. Жауап бермесе, container-ді қайта іске қосады немесе оған трафик жібермейді.</p>
<ul>
<li><b>Liveness</b> (<code>/health</code>): процесс тірі ме? Әрқашан жылдам 200 қайтарады, ауыр жұмыс жасамайды.</li>
<li><b>Readiness</b> (<code>/ready</code>): сұрау қабылдауға дайын ба? Модель әлі жүктеліп жатса — <b>503</b>, дайын болса — 200 және модель нұсқасы.</li>
</ul>
<pre><code>@app.get('/ready')
def ready():
    if STATE['model'] is None:
        raise HTTPException(status_code=503, detail='model loading')
    return {'status': 'ready', 'model_version': STATE['model_version']}</code></pre>
<h3>Деплой чек-листі</h3>
<ol>
<li>Сервер порт нөмірін <code>PORT</code> айнымалысынан оқиды (Render оны өзі береді).</li>
<li>Барлық құпия мен config — платформаның environment variables бөлімінде.</li>
<li>Health check path платформада көрсетілген.</li>
<li>Журнал stdout-қа жазылады: платформа оны жинап көрсетеді.</li>
<li>Деплойдан кейін <b>smoke test</b>: /health және бір нақты /predict сұрауы.</li>
<li>Rollback жоспары: алдыңғы image тегіне қайту.</li>
</ol>
<div class="tip">Image тегіне нұсқа жазыңыз (<code>churn-api:1.3.0</code>), <code>latest</code> емес. Сонда «өнімде дәл қай нұсқа тұр?» және «қалай қайтарамыз?» деген сұрақтарға бірден жауап бар.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Екі health функциясын жазыңыз. <code>liveness()</code> әрқашан <code>(200, {\'status\': \'alive\'})</code>. <code>readiness(state)</code>: <code>state[\'model\']</code> <code>None</code> болса <code>(503, {\'status\': \'loading\'})</code>, әйтпесе <code>(200, {\'status\': \'ready\', \'model_version\': state[\'model_version\']})</code>.', starter: P`STATE = {'model': None, 'model_version': None}

def liveness():
    pass

def readiness(state):
    return 200, {'status': 'ready'}
`, solution: P`STATE = {'model': None, 'model_version': None}

def liveness():
    return 200, {'status': 'alive'}

def readiness(state):
    if state['model'] is None:
        return 503, {'status': 'loading'}
    return 200, {'status': 'ready', 'model_version': state['model_version']}

print(readiness(STATE))
STATE.update(model=object(), model_version='1.3.0')
print(readiness(STATE))
`, hints: ['<code>liveness</code> ештеңені тексермейді: <code>return 200, {\'status\': \'alive\'}</code>.', '<code>readiness</code>: <code>if state[\'model\'] is None: return 503, ...</code>.'], check: { tests: P`assert liveness() == (200, {'status': 'alive'}), 'liveness() → (200, {"status": "alive"})'
assert readiness({'model': None, 'model_version': None}) == (503, {'status': 'loading'}), 'Модель жүктелмесе → 503 loading'
assert readiness({'model': 'm', 'model_version': '2.1.0'}) == (200, {'status': 'ready', 'model_version': '2.1.0'}), 'Модель дайын → 200, ready және model_version'` } },
          { type: 'python', xp: 25, prompt: 'Деплойдан кейінгі <b>smoke test</b>. <code>smoke_test(handle)</code> жазыңыз: <code>handle(method, path, body=None)</code> → <code>(status, data)</code>. Үш тексеріс: <code>\'health\'</code> — <code>GET /health</code> 200 береді; <code>\'predict\'</code> — <code>POST /predict</code> <code>{\'tenure_months\': 3, \'support_calls\': 4}</code>-пен 200 береді және <code>data[\'churn_probability\']</code> 0..1 аралығында; <code>\'validation\'</code> — <code>POST /predict</code> бос <code>{}</code>-пен 422 береді. Өтпеген тексерістердің атауларын тізім ретінде қайтарыңыз (бәрі өтсе, бос тізім).', starter: P`def good_handle(method, path, body=None):
    if (method, path) == ('GET', '/health'):
        return 200, {'status': 'alive'}
    if (method, path) == ('POST', '/predict'):
        if 'tenure_months' not in body:
            return 422, {'detail': 'tenure_months'}
        return 200, {'churn_probability': 0.71}
    return 404, {}

def smoke_test(handle):
    failed = []
    return failed
`, solution: P`def good_handle(method, path, body=None):
    if (method, path) == ('GET', '/health'):
        return 200, {'status': 'alive'}
    if (method, path) == ('POST', '/predict'):
        if 'tenure_months' not in body:
            return 422, {'detail': 'tenure_months'}
        return 200, {'churn_probability': 0.71}
    return 404, {}

def smoke_test(handle):
    failed = []
    status, _ = handle('GET', '/health')
    if status != 200:
        failed.append('health')
    status, data = handle('POST', '/predict', {'tenure_months': 3, 'support_calls': 4})
    p = data.get('churn_probability') if isinstance(data, dict) else None
    if status != 200 or not isinstance(p, (int, float)) or not 0 <= p <= 1:
        failed.append('predict')
    status, _ = handle('POST', '/predict', {})
    if status != 422:
        failed.append('validation')
    return failed

print(smoke_test(good_handle))
`, hints: ['Әр тексерісті бөлек жазыңыз: <code>status, data = handle(\'POST\', \'/predict\', {...})</code>, шарт орындалмаса <code>failed.append(\'predict\')</code>.', 'Ықтималдықты <code>data.get(\'churn_probability\')</code> арқылы алыңыз: кілт жоқ болса None, сонда тексеріс өтпейді.'], check: { tests: P`assert smoke_test(good_handle) == [], 'Дұрыс сервисте бос тізім'
def _down(method, path, body=None):
    return 503, {}
assert smoke_test(_down) == ['health', 'predict', 'validation'], 'Сервис жұмыс істемесе, үш тексеріс те өтпейді (осы ретпен)'
def _badprob(method, path, body=None):
    if path == '/health':
        return 200, {}
    if not body:
        return 422, {}
    return 200, {'churn_probability': 7.1}
assert smoke_test(_badprob) == ['predict'], 'Ықтималдық 0..1 аралығынан тыс → predict өтпейді'
def _nokey(method, path, body=None):
    if path == '/health':
        return 200, {}
    return 200, {'risk': 0.3}
assert smoke_test(_nokey) == ['predict', 'validation'], 'churn_probability жоқ және бос body 200 берсе → predict, validation'` } },
          { type: 'quiz', xp: 10, prompt: 'Render-дің тегін жоспарындағы API түнде ешкім қолданбаған соң, таңғы бірінші сұрауға 50 секунд жауап берді, келесілері жылдам. Себебі?', options: ['Модель нашар үйретілген', 'Бос тұрған тегін сервис «ұйықтайды», бірінші сұрау оны қайта іске қосады (cold start): container және модель жүктеледі', 'Интернет баяу', 'Pydantic тексерісі ұзақ'], answer: 1, explain: 'Cold start: container іске қосылып, модель жүктеледі. Тұрақты жылдамдық керек болса, ақылы жоспар немесе әрқашан қосулы сервер қажет.' },
          { type: 'rubric', xp: 30, minWords: 60, prompt: '«Дала Мобайл» churn API-ін (FastAPI + Docker, модель 40 МБ, күніне ~5 000 сұрау, дерек жеке мәліметтерді қамтиды) деплой жоспарын жазыңыз: қай платформа және неге, config пен құпиялар қайда, health check қалай, деплойдан кейін не тексересіз, ақау болса қалай қайтарасыз. Сосын төрт критерий бойынша адал бағалаңыз.', criteria: [
            { name: 'Платформа таңдауы', levels: ['Платформа аталмаған', 'Аталған, бірақ себебі жоқ', 'Таңдау жүктеме мен бағаға байланысты түсіндірілген', 'Таңдау, балама және дерек қай жерде сақталатыны (жеке мәлімет) ескерілген'] },
            { name: 'Config және құпиялар', levels: ['Айтылмаған', 'Жалпы сөз', 'Environment variables, құпиялар image пен git-те жоқ', 'Нақты айнымалылар тізімі, .env.example және құпияларды ауыстыру (rotate) жоспары'] },
            { name: 'Health check және тексеру', levels: ['Жоқ', 'Тек «/health бар» деген', 'Liveness/readiness және деплойдан кейінгі smoke test', 'Health, smoke test, журнал және latency-ді бақылау'] },
            { name: 'Rollback', levels: ['Жоқ', '«Қайта деплой жасаймыз»', 'Нұсқа тегі бар image-ке қайту', 'Нұсқа тегі, қайту қадамдары және шешім қабылдау шарты (қашан қайтарамыз)'] }
          ] }
        ]
      },
      {
        id: 'dep-8', title: 'Latency, throughput және batch болжам', minutes: 14,
        body: `
<p>Сервис жұмыс істейді, енді сұрақ: <b>қаншалықты жылдам</b>? Екі метрика бар:</p>
<ul>
<li><b>Latency</b> — бір сұраудың жауап уақыты (мс).</li>
<li><b>Throughput</b> — секундына қанша сұрау өңделеді (RPS).</li>
</ul>
<h3>Неге орташа емес, перцентиль</h3>
<p>Орташа latency 40 мс болса да, әр 20-шы клиент 900 мс күтуі мүмкін. Сондықтан <b>p50</b> (медиана), <b>p95</b> және <b>p99</b> қолданамыз: «сұраулардың 95%-ы осы уақыттан жылдам». SLO (қызмет деңгейінің мақсаты) әдетте осылай жазылады: «p95 ≤ 200 мс».</p>
<pre><code>import time, numpy as np
latencies = []
for row in sample:
    t0 = time.perf_counter()
    predict(row)
    latencies.append((time.perf_counter() - t0) * 1000)
np.percentile(latencies, [50, 95, 99])</code></pre>
<h3>Уақыт қайда кетеді</h3>
<ol>
<li><b>Модельді жүктеу</b> — бір рет, іске қосылғанда. Әр сұрауда жүктеу — ең жиі қате.</li>
<li><b>Тексеру және DataFrame құру</b> — ұсақ, бірақ жиналады.</li>
<li><b>Болжам</b> — сызықтық модельде микросекундтар, үлкен ансамбльде немесе нейрожелілерде ұзағырақ.</li>
<li><b>Желі</b> және клиенттің орналасуы: сервер Франкфуртта болса, Алматыдан ~80–100 мс тек жолға кетеді.</li>
</ol>
<h3>Batch: бірден көп жол</h3>
<p>sklearn векторланған: 1 000 жолды бір <code>predict_proba</code>-мен болжау 1 000 рет бір-бірден болжаудан ондаған есе жылдам. Сондықтан:</p>
<ul>
<li><b>Online</b> (API, бір клиент): latency маңызды, нақты уақытта жауап.</li>
<li><b>Batch</b> (түнгі job): 2 млн абоненттің бәрін бөліктермен (мысалы, 10 000-нан) болжап, нәтижені дерекқорға жазу. API мұндай жұмысқа керек емес.</li>
<li>API-ге де <code>POST /predict_batch</code> қосуға болады, бірақ бір сұраудағы жол санына шек қойыңыз (мысалы, 100), әйтпесе бір клиент серверді ұзақ иеленеді.</li>
</ul>
<pre><code>def predict_batch(model, rows, batch_size=10_000):
    out = []
    for i in range(0, len(rows), batch_size):
        chunk = rows[i:i + batch_size]
        out.extend(model.predict_proba(chunk)[:, 1])
    return out</code></pre>
<div class="tip">Бір worker 25 мс-та бір сұрауды өңдесе, ол секундына ең көбі 40 сұрау береді. Көбірек керек болса, worker-лер санын арттырады (<code>uvicorn --workers 4</code>) немесе container-лерді көбейтеді.</div>`,
        exercises: [
          { type: 'python', xp: 20, prompt: 'Жүктеме тестінің нәтижесі <code>latencies</code> (мс) тізімінде. <code>numpy.percentile</code> арқылы <code>p50</code> мен <code>p95</code>-ті, сондай-ақ орташа <code>mean_ms</code>-ті есептеңіз. SLO: p95 ≤ 200 мс. <code>slo_ok</code> — SLO орындала ма (bool).', starter: P`import numpy as np
latencies = [38, 41, 35, 44, 39, 52, 40, 37, 43, 36,
             42, 39, 610, 41, 38, 45, 40, 37, 890, 42]
`, solution: P`import numpy as np
latencies = [38, 41, 35, 44, 39, 52, 40, 37, 43, 36,
             42, 39, 610, 41, 38, 45, 40, 37, 890, 42]
p50 = np.percentile(latencies, 50)
p95 = np.percentile(latencies, 95)
mean_ms = np.mean(latencies)
slo_ok = bool(p95 <= 200)
print(p50, p95, mean_ms, slo_ok)
`, hints: ['<code>np.percentile(latencies, 95)</code> — 95-перцентиль.', '<code>slo_ok = bool(p95 <= 200)</code>. Медиана жақсы болса да, p95 басқаша айтуы мүмкін.'], check: { tests: P`import numpy as _np
assert abs(p50 - _np.percentile(latencies, 50)) < 1e-9, 'p50 = np.percentile(latencies, 50)'
assert abs(p95 - _np.percentile(latencies, 95)) < 1e-9, 'p95 = np.percentile(latencies, 95)'
assert abs(mean_ms - _np.mean(latencies)) < 1e-9, 'mean_ms — орташа'
assert slo_ok is False or slo_ok == False, 'p95 ≈ 624 мс > 200: SLO орындалмайды, slo_ok False болуы керек'` } },
          { type: 'python', xp: 25, prompt: '<code>predict_batch(model, rows, batch_size)</code> жазыңыз: <code>rows</code>-ты <code>batch_size</code> өлшемді бөліктерге бөліп, әр бөлікке <b>бір</b> рет <code>model.predict_proba(chunk)</code> шақырады; әр жолдың 1-класс ықтималдығын (<code>[1]</code> элементі) бастапқы ретпен тізім етіп қайтарады.', starter: P`class CountingModel:
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
`, solution: P`class CountingModel:
    """Шақырулар санын есептейтін жалған модель."""
    def __init__(self):
        self.calls = 0
    def predict_proba(self, rows):
        self.calls += 1
        return [[1 - r['support_calls'] / 10, r['support_calls'] / 10] for r in rows]

def predict_batch(model, rows, batch_size):
    out = []
    for i in range(0, len(rows), batch_size):
        chunk = rows[i:i + batch_size]
        out.extend(p[1] for p in model.predict_proba(chunk))
    return out

m = CountingModel()
print(predict_batch(m, [{'support_calls': k % 10} for k in range(25)], 10), m.calls)
`, hints: ['<code>for i in range(0, len(rows), batch_size):</code> және <code>chunk = rows[i:i + batch_size]</code>.', 'Әр бөліктің нәтижесінен 1-элементті алыңыз: <code>out.extend(p[1] for p in model.predict_proba(chunk))</code>.'], check: { tests: P`_m = CountingModel()
_rows = [{'support_calls': k % 10} for k in range(250)]
_out = predict_batch(_m, _rows, 100)
assert _m.calls == 3, f'250 жол, batch_size=100 → predict_proba 3 рет шақырылуы керек, сізде {_m.calls}'
assert len(_out) == 250, 'Әр жолға бір ықтималдық'
assert _out[:12] == [k % 10 / 10 for k in range(12)] and _out[-1] == 0.9, 'Ықтималдықтар бастапқы ретпен, [1] элементі'
_m2 = CountingModel()
assert predict_batch(_m2, [], 50) == [] and _m2.calls == 0, 'Бос тізімде модель шақырылмайды'` } },
          { type: 'number', xp: 10, prompt: 'Бір worker бір сұрауды 25 мс-та өңдейді және сұрауларды кезекпен өңдейді. Ол секундына ең көбі қанша сұрау өңдей алады?', answer: 40, tol: 0, unit: 'сұрау/с', explain: '1000 мс / 25 мс = 40 сұрау/с. 4 worker болса, шамамен 160.' },
          { type: 'quiz', xp: 10, prompt: 'Маркетинг әр таңертең 2 млн абоненттің бәрінің churn ықтималдығын CRM-де көргісі келеді. Ең дұрыс архитектура?', options: ['CRM әр абонент үшін API-ге жеке сұрау жібереді (2 млн сұрау)', 'Түнгі batch job: модель барлық абонентті бөліктермен болжап, нәтижені дерекқорға жазады; CRM дерекқордан оқиды', 'Модельді CRM-нің браузерінде іске қосу', 'API-ге бір сұраумен 2 млн жол жіберу'], answer: 1, explain: 'Нақты уақыт керек емес, ал көлем үлкен: бұл batch scoring-тің классикалық жағдайы. API бір клиентке жылдам жауап беру үшін.' }
        ]
      },
      {
        id: 'dep-gate', gate: true, title: 'Модуль емтиханы: Deployment', minutes: 35,
        body: `
<p>Қорытынды тексеріс: модельді сақтау және жүктеу, endpoint логикасы, batch, Docker және деплой жоспары. Кеңестер жоқ. Өту шегі — 75%.</p>`,
        exercises: [
          { type: 'python', xp: 40, prompt: 'Сервистің толық циклі. (1) <code>StandardScaler</code> + <code>LogisticRegression</code> pipeline-ын <code>data[FEATURES]</code>-те үйретіп, <code>gate_model.joblib</code> файлына сақтаңыз. (2) «Сервер іске қосылғанда» оны <code>MODEL</code> айнымалысына жүктеңіз. (3) <code>predict_endpoint(body)</code>: <code>FEATURES</code>-тің әрқайсысы бүтін сан ≥ 0 болмаса → <code>(422, {\'detail\': [қате хабарлар, әрқайсысында өріс атауы]})</code>; әйтпесе → <code>(200, {\'churn_probability\': p (3 таңба), \'model_version\': \'2.0.0\'})</code>.', starter: MINI + P`import joblib
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

MODEL_VERSION = '2.0.0'
`, solution: MINI + P`import joblib
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

MODEL_VERSION = '2.0.0'

pipe = make_pipeline(StandardScaler(), LogisticRegression()).fit(data[FEATURES], data['churned'])
joblib.dump(pipe, 'gate_model.joblib')

MODEL = joblib.load('gate_model.joblib')

def predict_endpoint(body):
    errors = []
    for field in FEATURES:
        v = body.get(field)
        if not isinstance(v, int) or isinstance(v, bool) or v < 0:
            errors.append(f'{field}: теріс емес бүтін сан керек')
    if errors:
        return 422, {'detail': errors}
    p = float(MODEL.predict_proba(pd.DataFrame([body])[FEATURES])[0, 1])
    return 200, {'churn_probability': round(p, 3), 'model_version': MODEL_VERSION}

print(predict_endpoint({'tenure_months': 2, 'support_calls': 5}))
`, check: { tests: P`import os as _os
from sklearn.pipeline import Pipeline as _Pl
assert _os.path.exists('gate_model.joblib'), 'gate_model.joblib сақталмаған'
assert isinstance(MODEL, _Pl) and 'standardscaler' in MODEL.named_steps, 'MODEL — файлдан жүктелген, scaler-і бар Pipeline'
_s, _d = predict_endpoint({'support_calls': 5, 'tenure_months': 2, 'city': 'Алматы'})
_p = float(MODEL.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])
assert _s == 200 and _d == {'churn_probability': round(_p, 3), 'model_version': '2.0.0'}, f'Дұрыс сұрауға жауап қате: {_d}'
assert predict_endpoint({'tenure_months': 48, 'support_calls': 0})[1]['churn_probability'] < 0.5, 'Ұзақ клиентте ықтималдық төмен болуы керек'
_s, _d = predict_endpoint({'tenure_months': -1, 'support_calls': '2'})
assert _s == 422 and len(_d['detail']) == 2, 'Екі өріс те қате → 422, detail-де 2 хабар'
assert any('tenure_months' in m for m in _d['detail']) and any('support_calls' in m for m in _d['detail']), 'Хабарларда өріс атаулары болсын'
assert predict_endpoint({})[0] == 422, 'Бос body → 422'` } },
          { type: 'python', xp: 35, prompt: '<code>batch_endpoint(body)</code> жазыңыз. <code>body[\'customers\']</code> — тізім болуы керек: жоқ, тізім емес немесе бос болса → <code>(422, {\'detail\': ...})</code>; 100-ден көп болса → <code>(413, {\'detail\': ...})</code>. Әр клиентте <code>tenure_months</code> және <code>support_calls</code> бүтін сан ≥ 0 болсын; қате клиенттер болса → <code>(422, {\'detail\': [{\'index\': i, \'field\': өріс}, ...]})</code> (әр қате өріс бөлек). Бәрі дұрыс болса → <code>(200, {\'predictions\': [risk, ...]})</code>, <code>risk = round(min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0)), 2)</code>.', starter: P`MAX_BATCH = 100

def batch_endpoint(body):
    preds = [0.1 * c['support_calls'] for c in body['customers']]
    return 200, {'predictions': preds}
`, solution: P`MAX_BATCH = 100
FIELDS = ['tenure_months', 'support_calls']

def risk(c):
    return round(min(1.0, 0.1 * c['support_calls'] + (0.3 if c['tenure_months'] < 6 else 0)), 2)

def batch_endpoint(body):
    customers = body.get('customers') if isinstance(body, dict) else None
    if not isinstance(customers, list) or not customers:
        return 422, {'detail': 'customers бос емес тізім болуы керек'}
    if len(customers) > MAX_BATCH:
        return 413, {'detail': f'Бір сұрауда ең көбі {MAX_BATCH} клиент'}
    errors = []
    for i, c in enumerate(customers):
        for field in FIELDS:
            v = c.get(field) if isinstance(c, dict) else None
            if not isinstance(v, int) or isinstance(v, bool) or v < 0:
                errors.append({'index': i, 'field': field})
    if errors:
        return 422, {'detail': errors}
    return 200, {'predictions': [risk(c) for c in customers]}

print(batch_endpoint({'customers': [{'tenure_months': 3, 'support_calls': 4}, {'tenure_months': 30, 'support_calls': 1}]}))
`, check: { tests: P`_ok = {'customers': [{'tenure_months': 3, 'support_calls': 4}, {'tenure_months': 30, 'support_calls': 1}, {'tenure_months': 2, 'support_calls': 9}]}
assert batch_endpoint(_ok) == (200, {'predictions': [0.7, 0.1, 1.0]}), f'Дұрыс batch → 200 және [0.7, 0.1, 1.0], сізде {batch_endpoint(_ok)}'
assert batch_endpoint({})[0] == 422, 'customers жоқ → 422'
assert batch_endpoint({'customers': []})[0] == 422, 'Бос тізім → 422'
assert batch_endpoint({'customers': 'abc'})[0] == 422, 'Тізім емес → 422'
assert batch_endpoint({'customers': [{'tenure_months': 1, 'support_calls': 1}] * 101})[0] == 413, '101 клиент → 413'
assert batch_endpoint({'customers': [{'tenure_months': 1, 'support_calls': 1}] * 100})[0] == 200, '100 клиент — шектің ішінде'
_s, _d = batch_endpoint({'customers': [{'tenure_months': 3, 'support_calls': 4}, {'tenure_months': -1}, {'tenure_months': 5, 'support_calls': 'x'}]})
assert _s == 422, 'Қате клиент болса → 422'
assert sorted((e['index'], e['field']) for e in _d['detail']) == [(1, 'support_calls'), (1, 'tenure_months'), (2, 'support_calls')], f'detail әр қате өрісті index және field-пен көрсетсін, сізде {_d["detail"]}'` } },
          { type: 'quiz', xp: 30, prompt: 'Container іске қосылды (<code>docker run -p 8080:8000 churn-api:1.3.0</code>), <code>docker logs</code>-та «Uvicorn running on http://127.0.0.1:8000» тұр, бірақ <code>curl localhost:8080/health</code> жауап бермейді. Не түзету керек?', options: ['Портты <code>-p 8000:8080</code> деп ауыстыру', 'Uvicorn-ды <code>--host 0.0.0.0</code>-мен іске қосу: 127.0.0.1 тек container ішінен қолжетімді', 'Image-ті <code>latest</code> тегімен қайта құру', 'requirements.txt-ке curl қосу'], answer: 1, explain: 'Сервер container-дің loopback интерфейсін ғана тыңдап тұр. 0.0.0.0 барлық интерфейсті тыңдайды, сонда порт жалғауы жұмыс істейді.' },
          { type: 'number', xp: 30, prompt: 'Сервисте 4 worker бар, әрқайсысы бір сұрауды 50 мс-та кезекпен өңдейді. Бір container секундына ең көбі қанша сұрау өңдейді?', answer: 80, tol: 0, unit: 'сұрау/с', explain: 'Бір worker: 1000 / 50 = 20 сұрау/с. 4 worker: 80 сұрау/с.' },
          { type: 'rubric', xp: 40, minWords: 80, prompt: 'Командаңыз churn моделін ноутбуктан өнімге шығарады. Production-readiness шолуын жазыңыз (кемінде 80 сөз): модель қалай сақталып, жүктеледі; кіріс қалай тексеріледі; Docker image мен config қалай құрылады; қай платформаға деплой жасалады және health check қандай; latency мақсаты және batch сценарийі. Сосын төрт критерий бойынша адал бағалаңыз. Өту үшін әр критерий кемінде <b>3 / 4</b> болуы керек.', criteria: [
            { name: 'Модель және кіріс', levels: ['Айтылмаған', 'Тек «joblib-пен сақтаймыз»', 'Бүкіл pipeline + metadata сақталады, кіріс схемамен тексеріліп 422 қайтарылады', 'Оған қоса нұсқаларды бекіту және модельді бір рет жүктеу айтылған'] },
            { name: 'Docker және config', levels: ['Айтылмаған', 'Docker аталған, мазмұнсыз', 'Dockerfile-дың негізгі қадамдары, 0.0.0.0, құпиялар environment variables-та', 'Layer кэші, .dockerignore, нұсқа тегі және құпиялар image-те жоқ екені'] },
            { name: 'Деплой және бақылау', levels: ['Жоқ', 'Платформа аталған', 'Платформа, liveness/readiness және smoke test', 'Оған қоса журнал, rollback және cold start/баға ескерілген'] },
            { name: 'Өнімділік', levels: ['Жоқ', '«Жылдам болуы керек»', 'p95 мақсаты (мысалы, ≤ 200 мс) және оны өлшеу тәсілі', 'p95 мақсаты, throughput есебі және online/batch бөлінуі'] }
          ] }
        ]
      }
    ]
  };
})();
