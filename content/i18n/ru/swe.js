// M6.1 Software Eng for Data and M6.2 Deployment: Russian text. Code, solutions and expected output are in content/swe.js.
DJ.i18n.patch({
  modules: {
    'm6-1': { intro: 'Вы научитесь превращать код из ноутбука в Python-код, которым могут пользоваться другие, который покрыт тестами и работает без ошибок: функции, классы, type hints, тесты, logging, venv и основы REST API.' },
    'm6-2': { intro: 'Вы превратите обученную модель в сервис, которым могут пользоваться другие: сохранение модели, проверка входных данных, FastAPI и Pydantic, Docker, конфигурация, деплой в облако и производительность.' }
  },
  lessons: {
    'swe-1': {
      title: 'Функции и модули',
      body: `
<p>Работа в ноутбуке обычно растёт так: в одной ячейке вы чистите цену, через месяц копируете этот код и применяете к другому файлу, потом ещё раз. Если ошибку исправили в одной из трёх копий, в двух других она остаётся. <b>Функция</b> решает эту проблему: логика написана в одном месте, у неё есть имя, понятные вход и выход.</p>
<h3>Признаки хорошей функции</h3>
<ul>
<li><b>Одна задача</b>: <code>parse_price</code> только превращает цену в число, не читает файл и не рисует график.</li>
<li><b>Возвращает результат через <code>return</code></b>, а не через <code>print</code>. Результатом print другой код воспользоваться не может.</li>
<li><b>Понятное имя</b>: глагол + существительное (<code>load_orders</code>, <code>clean_phone</code>).</li>
<li><b>Docstring</b>: одной строкой объясняет, что делает функция.</li>
<li><b>Значения по умолчанию (default)</b>: задают значение для часто используемого параметра: <code>city='Алматы'</code>.</li>
</ul>
<h3>Пример: выгрузка магазина в стиле Kaspi</h3>
<p>В выгрузке цена приходит текстом: <code>"12 500 ₸"</code>. Функция, которая превращает её в число:</p>
<pre><code>def parse_price(text):
    """Превращает текст вида '12 500 ₸' в целое число (тенге)."""
    digits = text.replace('₸', '').replace(' ', '').strip()
    return int(digits)

parse_price('12 500 ₸')   # 12500
parse_price('990₸')       # 990</code></pre>
<h3>Что такое модуль</h3>
<p>Когда функций становится много, их выносят в <b>модуль</b>, то есть в обычный файл <code>.py</code>. Например, в файле <code>cleaning.py</code> лежит <code>parse_price</code>, а ноутбук или другой скрипт её импортирует:</p>
<pre><code># cleaning.py
def parse_price(text):
    ...

if __name__ == '__main__':
    # выполняется, только когда файл запускают напрямую: python cleaning.py
    print(parse_price('12 500 ₸'))

# report.py
from cleaning import parse_price</code></pre>
<p>Блок <code>if __name__ == '__main__':</code> <b>не выполняется</b> при импорте файла. Поэтому проверочный код модуля мы кладём в этот блок, иначе он будет запускаться при каждом импорте.</p>
<div class="tip">Правило: если вам хочется скопировать один и тот же код второй раз, пора превратить его в функцию.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>parse_price(text)</code>: <code>"12 500 ₸"</code> → <code>12500</code>, <code>"990₸"</code> → <code>990</code>, <code>" 3 490 ₸ "</code> → <code>3490</code>. Результат должен быть <code>int</code> и возвращаться через <code>return</code>.', starter: String.raw`def parse_price(text):
    # уберите знак ₸ и пробелы, затем превратите в int
    pass
`, hints: ['<code>text.replace(\'₸\', \'\')</code> убирает знак, <code>.replace(\' \', \'\')</code> убирает пробелы.', 'В конце <code>return int(digits)</code>.'], check: { tests: String.raw`assert parse_price('12 500 ₸') == 12500, 'parse_price("12 500 ₸") должна вернуть 12500'
assert parse_price('990₸') == 990, 'parse_price("990₸") должна вернуть 990'
assert parse_price(' 3 490 ₸ ') == 3490, 'Уберите и пробелы по краям'
assert isinstance(parse_price('100 ₸'), int), 'Результат должен быть int'` } },
        { prompt: 'Напишите функцию <code>city_revenue(orders, city=\'Алматы\')</code>: <code>orders</code> — список словарей (<code>city</code>, <code>amount</code>), функция возвращает сумму <code>amount</code> по заданному городу. Если город не передан, считается Алматы.', hints: ['Значение параметра по умолчанию: <code>def city_revenue(orders, city=\'Алматы\'):</code>', 'В цикле прибавляйте <code>total += o[\'amount\']</code>, только если <code>if o[\'city\'] == city:</code>.'], check: { tests: String.raw`_o = [{'city': 'Алматы', 'amount': 100}, {'city': 'Астана', 'amount': 40}, {'city': 'Алматы', 'amount': 1}]
assert city_revenue(_o) == 101, 'Если город не передан, нужна сумма по Алматы (значение по умолчанию параметра city)'
assert city_revenue(_o, 'Астана') == 40, 'Если city="Астана", суммируются только заказы Астаны'
assert city_revenue(_o, 'Орал') == 0, 'Для города без заказов 0'` } },
        { prompt: 'В конце файла <code>cleaning.py</code> есть блок <code>if __name__ == \'__main__\':</code>. В другом файле написали <code>from cleaning import parse_price</code>. Что произойдёт с кодом внутри этого блока?', options: ['Выполнится один раз при импорте', 'Не выполнится: он работает, только когда файл запускают напрямую командой <code>python cleaning.py</code>', 'Импорт завершится ошибкой', 'Будет выполняться при каждом вызове <code>parse_price</code>'], explain: 'При импорте <code>__name__</code> равно <code>"cleaning"</code>, а при прямом запуске — <code>"__main__"</code>. Поэтому блок выполняется только при прямом запуске.' }
      ]
    },
    'swe-2': {
      title: 'Type hints: типы в коде',
      body: `
<p><b>Type hints</b> (аннотации типов) показывают, какие данные функция ожидает и что возвращает. Python не проверяет их во время выполнения, но они помогают в трёх местах: человеку, который читает код (как документация), редактору (автодополнение и предупреждения) и инструментам проверки вроде <b>mypy</b>.</p>
<h3>Синтаксис</h3>
<pre><code>def average_check(amounts: list[float]) -> float:
    if not amounts:
        return 0.0
    return sum(amounts) / len(amounts)

def find_customer(customers: dict[str, str], phone: str) -> str | None:
    return customers.get(phone)   # None, если не найден</code></pre>
<table>
<tr><th>Запись</th><th>Значение</th></tr>
<tr><td><code>x: int</code></td><td>целое число</td></tr>
<tr><td><code>list[float]</code></td><td>список float</td></tr>
<tr><td><code>dict[str, int]</code></td><td>словарь с ключами str и значениями int</td></tr>
<tr><td><code>str | None</code></td><td>текст или None (старая запись <code>Optional[str]</code>)</td></tr>
<tr><td><code>-> None</code></td><td>функция ничего не возвращает</td></tr>
<tr><td><code>pd.DataFrame</code></td><td>таблица pandas</td></tr>
</table>
<h3>Hint не проверяет, проверяет mypy</h3>
<pre><code>average_check('500')   # Python не проверяет hint, ошибка возникнет только внутри функции
$ mypy report.py
report.py:12: error: Argument 1 to "average_check" has incompatible type "str"; expected "list[float]"</code></pre>
<p>В командах mypy добавляют в CI: ошибки типов находятся до того, как код попадёт в merge. В коде обработки данных это очень полезно: вопрос «эта функция принимает DataFrame или список?» исчезает сам собой.</p>
<h3>Где увидеть аннотации</h3>
<p>Атрибут функции <code>__annotations__</code> хранит hints в виде словаря:</p>
<pre><code>average_check.__annotations__
# {'amounts': list[float], 'return': &lt;class 'float'&gt;}</code></pre>
<div class="tip">В первую очередь пишите hints для функций, которые вызывают другие («API» модуля). Для внутренних временных переменных это не обязательно.</div>`,
      ex: [
        { prompt: 'Добавьте type hints в функцию <code>average_check</code>: параметр <code>amounts</code> — <code>list[float]</code>, возвращаемое значение — <code>float</code>. Для пустого списка пусть возвращает <code>0.0</code>.', hints: ['После параметра <code>: list[float]</code>, после скобок <code>-> float</code>.', 'Проверьте пустой список через <code>if not amounts: return 0.0</code>.'], check: { tests: String.raw`_a = average_check.__annotations__
assert _a.get('amounts') == list[float], 'Hint параметра amounts должен быть list[float]'
assert _a.get('return') is float, 'Hint возвращаемого значения: -> float'
assert average_check([]) == 0.0, 'Для пустого списка верните 0.0 (без деления на ноль)'
assert average_check([1000.0, 3000.0]) == 2000.0, 'Среднее должно считаться правильно'` } },
        { prompt: 'Напишите функцию <code>find_customer(customers, phone)</code> с hints: <code>customers: dict[str, str]</code> (телефон → имя), <code>phone: str</code>, возвращаемое значение <code>str | None</code>. Если телефон не найден, пусть возвращается <code>None</code>.', hints: ['<code>customers.get(phone)</code> возвращает <code>None</code>, если ключа нет.', 'Hint возвращаемого значения: <code>-> str | None</code>.'], check: { tests: String.raw`import typing as _t
_a = find_customer.__annotations__
assert _a.get('customers') == dict[str, str], 'Hint для customers: dict[str, str]'
assert _a.get('phone') is str, 'Hint для phone: str'
assert set(_t.get_args(_a.get('return'))) == {str, type(None)}, 'Hint возвращаемого значения: str | None'
assert find_customer({'7701': 'Ерлан'}, '7701') == 'Ерлан', 'Верните имя найденного клиента'
assert find_customer({'7701': 'Ерлан'}, '7777') is None, 'Если не найден, верните None, а не KeyError'` } },
        { prompt: 'Функцию <code>def total(x: list[int]) -> int</code> вызвали как <code>total("abc")</code>. Что произойдёт?', options: ['Python сразу выдаст TypeError, потому что по hint нужен list', 'Python не проверяет hint: код запустится (если будет ошибка, она возникнет внутри функции); mypy заранее отметит этот вызов', 'Hint автоматически превратит текст в список', 'Функция всегда вернёт 0'], explain: 'Type hints не проверяются во время выполнения. Их используют инструменты статической проверки вроде mypy или библиотеки вроде Pydantic.' }
      ]
    },
    'swe-3': {
      title: 'OOP: классы pipeline и model wrapper',
      body: `
<p>Функция не хранит состояние (state): вызвали, получили результат. Но иногда объект должен что-то <b>запоминать</b>. Например, масштабирование: min и max один раз вычисляются по train-данным, а затем ко всем новым данным применяются <b>те же</b> значения. В таких случаях используют <b>класс</b>: данные (атрибуты) и действия (методы) находятся в одном месте.</p>
<h3>Основные понятия</h3>
<ul>
<li><code>class</code> — шаблон (чертёж). <b>Объект</b> (instance) — конкретный экземпляр, созданный по этому шаблону.</li>
<li><code>__init__</code> — метод, который вызывается при создании объекта и сохраняет начальные настройки.</li>
<li><code>self</code> — сам объект. <code>self.min_</code> — атрибут объекта.</li>
<li><b>Метод</b> — функция внутри класса: <code>scaler.fit(...)</code>.</li>
</ul>
<h3>Пример: transformer в стиле scikit-learn</h3>
<pre><code>class RangeScaler:
    def fit(self, values):
        self.min_ = min(values)
        self.max_ = max(values)
        return self            # для цепочки fit(...).transform(...)

    def transform(self, values):
        span = self.max_ - self.min_
        return [(v - self.min_) / span for v in values]

scaler = RangeScaler().fit([100, 300, 500])   # train
scaler.transform([200, 500])                  # [0.25, 1.0]</code></pre>
<p>Все transformer в sklearn работают по этому соглашению: <code>fit</code> выучивает параметры (их имена заканчиваются на <code>_</code>), <code>transform</code> их применяет. Благодаря этому train и test легко обрабатывать раздельно.</p>
<h3>Model wrapper</h3>
<p>В продакшене вокруг модели много дополнительной логики: порядок признаков, порог (threshold), версия. Всё это мы оборачиваем в один класс:</p>
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
<p>API или ноутбуку больше не нужно знать порядок признаков: они просто вызывают <code>predict_one({...})</code>. Если добавится признак, изменится только класс.</p>
<div class="tip">Для хранения параметров настройки удобен <code>@dataclass</code>: <code>__init__</code> Python напишет сам. Наследование (inheritance) в работе с данными нужно редко: начинайте с простого класса и композиции.</div>`,
      ex: [
        { prompt: 'Напишите класс <code>RangeScaler</code>: <code>fit(values)</code> сохраняет <code>self.min_</code> и <code>self.max_</code> и возвращает <code>self</code>; <code>transform(values)</code> возвращает список, где каждое значение превращено в <code>(v - min_) / (max_ - min_)</code>.', hints: ['Внутри <code>fit</code>: <code>self.min_ = min(values)</code>, <code>self.max_ = max(values)</code>, в конце <code>return self</code>.', '<code>transform</code>: <code>[(v - self.min_) / (self.max_ - self.min_) for v in values]</code>.'], check: { tests: String.raw`_s = RangeScaler()
assert _s.fit([10, 20, 30]) is _s, 'fit() должен возвращать self'
assert _s.min_ == 10 and _s.max_ == 30, 'fit() должен сохранять атрибуты min_ и max_'
assert _s.transform([10, 20, 30]) == [0.0, 0.5, 1.0], 'transform([10, 20, 30]) → [0.0, 0.5, 1.0]'
assert _s.transform([40]) == [1.5], 'transform использует min/max из train (не пересчитывает по новым данным)'` } },
        { prompt: 'Допишите wrapper <code>ChurnModel</code>: <code>__init__</code> сохраняет <code>features</code> и <code>threshold</code> и создаёт <code>LogisticRegression()</code>; <code>fit(df, target)</code> обучает модель только на столбцах <code>self.features</code> и возвращает <code>self</code>; <code>predict_one(customer)</code> возвращает вероятность ухода как <code>float</code>; <code>is_risky(customer)</code> возвращает <code>True</code>, если вероятность больше порога или равна ему. В конце <code>cm = ChurnModel(FEATURES, threshold=0.5).fit(data, \'churned\')</code>.', hints: ['<code>predict_one</code>: <code>pd.DataFrame([customer])[self.features]</code> убирает лишние ключи (например, city) и сохраняет порядок.', '<code>self.model.predict_proba(row)[0, 1]</code> — вероятность класса 1 (уйдёт). В конце <code>fit</code> — <code>return self</code>.'], check: { tests: String.raw`assert isinstance(cm, ChurnModel), 'Должно быть cm = ChurnModel(...).fit(...): пусть fit() возвращает self'
assert cm.features == FEATURES and cm.threshold == 0.5, '__init__ должен сохранять features и threshold'
assert hasattr(cm.model, 'coef_') and cm.model.n_features_in_ == 2, 'Модель должна обучаться только на столбцах features (2 признака)'
_hi = cm.predict_one({'support_calls': 6, 'tenure_months': 1, 'city': 'Астана'})
_lo = cm.predict_one({'tenure_months': 50, 'support_calls': 0})
assert isinstance(_hi, float) and 0 <= _hi <= 1, 'predict_one должен возвращать float от 0 до 1'
assert _hi > 0.5 > _lo, 'У нового абонента с большим числом обращений вероятность должна быть выше'
assert cm.is_risky({'tenure_months': 1, 'support_calls': 6}) is True and cm.is_risky({'tenure_months': 50, 'support_calls': 0}) is False, 'is_risky сравнивает вероятность с threshold'
_strict = ChurnModel(FEATURES, threshold=0.999).fit(data, 'churned')
assert _strict.is_risky({'tenure_months': 3, 'support_calls': 4}) is False, 'is_risky должен использовать self.threshold'` } },
        { prompt: 'Почему в transformer <code>fit</code> и <code>transform</code> — отдельные методы?', options: ['Python не разрешает два действия в одном методе', 'Чтобы выучить параметры (min, max) один раз только по train-данным и применять те же значения к test и новым данным: иначе будет leakage, а масштаб будет меняться каждый раз', 'Только чтобы код работал быстрее', 'transform всегда сам заново вызывает fit'], explain: 'fit = обучение (только train), transform = применение (любые данные). Повторный fit на test — это leakage, а в продакшене масштаб был бы разным для каждого запроса.' }
      ]
    },
    'swe-4': {
      title: 'Тестирование: assert и pytest',
      body: `
<p>Тест — небольшая функция, которая <b>автоматически</b> проверяет, что ваш код работает правильно. Сегодня <code>parse_price</code> работает верно, а завтра коллега может её «улучшить» и сломать формат <code>"990₸"</code>. Тест поймает это до merge. В командах по работе с данными тесты особенно часто пишут для функций очистки, расчёта признаков и входа-выхода API.</p>
<h3>assert: самый простой тест</h3>
<pre><code>def test_parse_price():
    assert parse_price('12 500 ₸') == 12500
    assert parse_price('990₸') == 990
    assert parse_price('0 ₸') == 0</code></pre>
<p><code>assert условие</code> выбрасывает <code>AssertionError</code>, если условие ложно. Тестовая функция ничего не возвращает: если ошибки не было, тест пройден.</p>
<h3>pytest</h3>
<p><b>pytest</b> — стандартный инструмент тестирования в Python. Он сам находит в файлах <code>test_*.py</code> функции, имена которых начинаются с <code>test_</code>, и запускает их:</p>
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

def test_city_revenue(orders):        # fixture приходит параметром по своему имени
    assert city_revenue(orders, 'Астана') == 40

$ pytest -q
.....                                  [100%]
5 passed in 0.04s</code></pre>
<ul>
<li><code>parametrize</code> — повторяет один тест с несколькими входами.</li>
<li><code>pytest.raises</code> — проверяет, что функция <b>должна выбросить</b> ошибку.</li>
<li><code>fixture</code> — готовые данные, общие для нескольких тестов.</li>
</ul>
<h3>Что тестировать</h3>
<ol>
<li><b>Обычный случай</b>: типичный вход.</li>
<li><b>Граничный случай</b>: пустой список, 0, один элемент, формат без пробела.</li>
<li><b>Неверный вход</b>: функция должна остановиться с понятной ошибкой.</li>
</ol>
<div class="tip">Хороший тест <b>ловит ошибочный код</b>. Проверка: специально сломайте функцию. Если тест всё равно проходит, он ничего не проверяет. Задания ниже проверяются именно так: ваш тест должен падать на сломанных версиях.</div>`,
      ex: [
        { prompt: 'Напишите тестовую функцию <code>test_parse_price()</code>. Пусть она проверяет как минимум три случая: <code>"12 500 ₸"</code> → 12500, <code>"990₸"</code> → 990, <code>"0 ₸"</code> → 0. На правильной функции тест должен проходить, а на сломанных версиях выдавать <code>AssertionError</code>.', starter: String.raw`def parse_price(text):
    return int(text.replace('₸', '').replace(' ', '').strip())

def test_parse_price():
    # напишите здесь assert
    pass

test_parse_price()
print('тест өтті')
`, hints: ['По одной строке на случай: <code>assert parse_price(\'12 500 ₸\') == 12500</code>.', 'Не забудьте случай <code>"990₸"</code> без пробела: некоторые ошибочные версии падают только на нём.'], check: { tests: String.raw`_ok = parse_price
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
assert _catches(lambda t: int(t.replace('₸', '').strip().split(' ')[0])), 'Ваш тест не проверяет случай "12 500 ₸": ошибочная версия, которая берёт только первую часть, прошла'
assert _catches(lambda t: int(t[:-2].replace(' ', ''))), 'Ваш тест не проверяет случай "990₸" (без пробела)'
assert _catches(lambda t: int(t.replace('₸', '').replace(' ', '')) or None), 'Ваш тест не проверяет случай "0 ₸"'` } },
        { prompt: 'Напишите <code>test_apply_discount()</code> для <code>apply_discount(price, percent)</code>: (1) скидка 10% на 10 000 ₸ → 9000; (2) 0% → цена не меняется; (3) при <code>percent=150</code> функция должна выбросить <code>ValueError</code> (pytest нет, поэтому используйте <code>try/except</code>).', hints: ['Шаблон проверки ошибки: <code>try: apply_discount(1000, 150)</code>, <code>except ValueError: pass</code>, <code>else: raise AssertionError(...)</code>.', 'Блок <code>else</code> выполняется, только если ошибка <b>не возникла</b>: именно в этом случае тест должен упасть.'], check: { tests: String.raw`_ok = apply_discount
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
assert _catches(_b1), 'Ваш тест не ловит случай percent=150: версия без ValueError прошла'
assert _catches(_b2), 'Ваш тест не проверяет случай 0%'
assert _catches(_b3), 'Ваш тест не проверяет формулу скидки (10000, 10 → 9000)'` } },
        { prompt: 'Какую функцию pytest найдёт как тест и запустит?', options: ['<code>check_price()</code> в <code>cleaning.py</code>', '<code>test_parse_price()</code> в <code>tests/test_cleaning.py</code>', '<code>parse_price_test()</code> в <code>tests/cleaning_tests.py</code>', 'Любую функцию с <code>assert</code> в любом файле'], explain: 'Правило по умолчанию: имя файла <code>test_*.py</code> (или <code>*_test.py</code>), имя функции начинается с <code>test_</code>.' },
        { prompt: 'У вас есть тест, но даже если специально сломать функцию, тест всё равно проходит. Что это значит?', options: ['Функция очень надёжная', 'Тест ничего не проверяет: ему нужны assert, которые падают, когда функция сломана', 'pytest установлен неправильно', 'Тест нужно удалить, он лишний'], explain: 'Цель теста — поймать ошибку. Тест, который не падает на сломанном коде, даёт ложную уверенность.' }
      ]
    },
    'swe-5': {
      title: 'Обработка ошибок и logging',
      body: `
<p>В реальных данных ошибочные строки есть всегда: «—» вместо суммы, отрицательное число, пустая ячейка. Код в таком случае либо <b>роняет весь pipeline</b>, либо (что ещё хуже) <b>молча</b> пропускает неверное значение. Правильный подход: обнаружить ошибку в конкретном месте, выбросить её с понятным сообщением, обработать на верхнем уровне и записать в журнал (log).</p>
<h3>try / except / raise</h3>
<pre><code>def parse_amount(value):
    amount = float(value)                    # для 'abc' сам выдаст ValueError
    if amount &lt; 0:
        raise ValueError(f'Сумма не должна быть отрицательной: {amount}')
    return amount

try:
    parse_amount('-500')
except ValueError as e:
    print('Ошибочная строка:', e)</code></pre>
<ul>
<li>Ловите <b>конкретную ошибку</b>: <code>except ValueError</code>. Голый <code>except:</code> скрывает всё, даже ошибки в коде.</li>
<li><code>else</code> выполняется, если ошибки не было, <code>finally</code> — всегда (закрыть файл, разорвать соединение).</li>
<li>Свою ошибку можно создать в виде класса: <code>class DataQualityError(Exception): pass</code>.</li>
</ul>
<h3>Почему logging, а не print</h3>
<p><code>print</code> на сервере теряется, у него нет уровня и времени. Модуль <b>logging</b> добавляет к сообщению уровень, время и источник, а место вывода (консоль, файл, облачная система логов) можно настроить, не меняя код.</p>
<table>
<tr><th>Уровень</th><th>Когда</th></tr>
<tr><td>DEBUG</td><td>подробности во время разработки</td></tr>
<tr><td>INFO</td><td>обычное событие: «загружено 2 400 строк»</td></tr>
<tr><td>WARNING</td><td>подозрительно, но работа продолжается: «строка пропущена»</td></tr>
<tr><td>ERROR</td><td>операция не выполнена: «файл не открылся»</td></tr>
<tr><td>CRITICAL</td><td>остановился весь сервис</td></tr>
</table>
<pre><code>import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s: %(message)s')
logger = logging.getLogger('orders')

logger.info('Загрузка началась')
logger.warning('Строка пропущена: %s', row)</code></pre>
<p>Каждый модуль получает свой logger через <code>logging.getLogger(__name__)</code>, тогда в журнале видно, из какого файла пришло сообщение.</p>
<div class="tip">Частое правило в pipeline: ошибка в отдельной строке → WARNING и пропуск строки; если ошибочных строк больше 5% → ERROR и остановка. Молчаливого пропуска не должно быть никогда.</div>`,
      ex: [
        { prompt: 'Напишите <code>parse_amount(value)</code>: превращает значение во <code>float</code>; для пустого текста или текста, который не является числом, — <code>ValueError</code>; для отрицательного числа — <code>ValueError</code> (в сообщении должно быть слово «теріс» (отрицательная)).', hints: ['<code>float(\'\')</code> и <code>float(\'abc\')</code> сами выдают ValueError.', 'Для отрицательного значения: <code>if amount < 0: raise ValueError(\'Сома теріс болмауы керек\')</code>.'], check: { tests: String.raw`assert parse_amount('12500') == 12500.0 and parse_amount(300) == 300.0, 'Обычные значения должны превращаться во float'
assert parse_amount('0') == 0.0, '0 — допустимая сумма'
for _v in ['', 'abc', '-500']:
    try:
        parse_amount(_v)
    except ValueError as _e:
        if _v == '-500':
            assert 'теріс' in str(_e), 'В сообщении об отрицательной сумме должно быть слово «теріс»'
    else:
        raise AssertionError(f'parse_amount({_v!r}) ValueError лақтыруы керек')` } },
        { prompt: 'Напишите <code>load_orders(rows)</code>: проверяет значение <code>amount</code> каждой строки через <code>parse_amount</code>. Правильные строки (копию, где amount превращён во float) добавляет в список <code>good</code>, на ошибочной строке пишет <code>logger.warning(...)</code> и пропускает её. Возвращает <code>(good, bad_count)</code>.', hints: ['Внутри цикла <code>try: amount = parse_amount(r[\'amount\'])</code>, <code>except ValueError as e:</code> → увеличьте счётчик, <code>logger.warning(...)</code>, <code>continue</code>.', 'Добавляйте копию правильной строки: <code>good.append(dict(r, amount=amount))</code>.'], check: { tests: String.raw`import logging as _lg
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
assert _bad == 2, f'Должно быть две ошибочные строки, у вас {_bad}'
assert [g['order_id'] for g in _good] == [1, 4], 'В списке good должны остаться только строки 1 и 4'
assert _good[1]['amount'] == 250.5, 'В good amount должен быть превращён во float'
assert _rows[3]['amount'] == '250.5', 'Не меняйте входные строки: делайте копию dict(r, amount=...)'
assert len([r for r in _h.records if r.levelno == _lg.WARNING]) == 2, 'logger.warning должен вызываться один раз на каждую ошибочную строку'` } },
        { prompt: 'Ночной pipeline пропустил 3 строки из 50 000 из-за сломанного формата даты, остальное загрузилось успешно. С каким уровнем вы запишете это событие в журнал?', options: ['DEBUG', 'WARNING', 'CRITICAL', 'Никаким, записывать не нужно'], explain: 'Работа продолжилась, но есть ситуация, требующая внимания: это WARNING. CRITICAL — когда остановился весь сервис, а молчаливый пропуск скрывает проблемы с качеством данных.' }
      ]
    },
    'swe-6': {
      title: 'Virtual environment и requirements.txt',
      body: `
<p>У вас на ноутбуке стоит pandas 2.2, у коллеги 1.5, а на сервере его нет вовсе. Код, который работает в одном проекте, падает в другом. <b>Virtual environment</b> (venv) — отдельная «коробка» Python для каждого проекта: библиотеки, установленные в неё, не влияют на другие проекты.</p>
<h3>Основные команды</h3>
<pre><code>python -m venv .venv              # один раз в папке проекта
source .venv/bin/activate         # macOS / Linux
.venv\\Scripts\\activate            # Windows
pip install pandas scikit-learn   # устанавливается только внутрь этого .venv
pip freeze > requirements.txt     # записать точные версии в файл
deactivate                        # выйти</code></pre>
<p>Новый человек (или сервер) воссоздаёт проект так:</p>
<pre><code>git clone ... && cd churn-api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt</code></pre>
<h3>requirements.txt</h3>
<pre><code># зависимости API
pandas==2.2.3
scikit-learn==1.6.1
fastapi==0.115.0
numpy>=1.26</code></pre>
<ul>
<li><code>==</code> — <b>фиксация</b> версии (pin). Обязательна для продакшена и модели: модель, сохранённая через pickle, может не открыться в другой версии sklearn.</li>
<li><code>>=</code> — минимальная версия. Удобно при написании библиотеки, но завтра может установиться другая версия.</li>
<li>Папка <code>.venv</code> в git <b>не кладётся</b>: добавьте её в <code>.gitignore</code>. В git хранится только requirements.txt.</li>
</ul>
<h3>Структура проекта</h3>
<pre><code>churn-api/
├── .venv/              (нет в git)
├── src/churn/          модули: cleaning.py, model.py, api.py
├── tests/              test_cleaning.py, test_api.py
├── notebooks/          исследовательские ноутбуки
├── requirements.txt
└── README.md</code></pre>
<div class="tip">Альтернативы: <b>conda</b> (если нужны библиотеки вне Python), <b>poetry</b> и <b>uv</b> (управляют зависимостями через lock-файл, uv очень быстрый). Идея у всех одна: отдельное окружение для проекта и список с зафиксированными версиями.</div>`,
      ex: [
        { prompt: 'Напишите <code>parse_requirements(text)</code>: возвращает словарь <code>{библиотека: версия}</code> из текста requirements.txt. Для строк, зафиксированных через <code>==</code>, записывается версия, для остальных строк (<code>>=</code> или без версии) — <code>None</code>. Пустые строки и комментарии <code>#</code> (в том числе в конце строки) игнорируются.', hints: ['Сначала отрежьте комментарий от каждой строки: <code>line.split(\'#\')[0].strip()</code>; если строка пустая — <code>continue</code>.', 'Если <code>==</code> нет, возьмите имя через <code>line.split(\'>=\')[0].strip()</code> и задайте значение <code>None</code>.'], check: { tests: String.raw`_r = parse_requirements(req)
assert _r == {'pandas': '2.2.3', 'scikit-learn': '1.6.1', 'numpy': None, 'joblib': None}, f'Неверный результат: {_r}'
assert parse_requirements('# тек түсініктеме\n\n') == {}, 'Пустые строки и комментарии должны игнорироваться'
assert parse_requirements('fastapi==0.115.0  # API') == {'fastapi': '0.115.0'}, 'Уберите комментарий в конце строки и пробелы'` } },
        { prompt: 'Нужно ли добавлять папку <code>.venv</code> в git-репозиторий?', options: ['Да, тогда коллегам ничего не придётся устанавливать', 'Нет: она большая и зависит от операционной системы. В git кладут requirements.txt, а .venv добавляют в .gitignore', 'Только в Windows', 'Только если установлен pandas'], explain: 'Каждый воссоздаёт .venv на своём компьютере через <code>pip install -r requirements.txt</code>.' },
        { prompt: 'Модель оттока сохранили через <code>joblib</code> в scikit-learn 1.6.1. Как sklearn должен быть записан в requirements.txt API?', options: ['<code>scikit-learn</code> (без версии, пусть ставится самая новая)', '<code>scikit-learn>=1.0</code>', '<code>scikit-learn==1.6.1</code>', 'Вообще не писать, он идёт вместе с pandas'], explain: 'Сохранённую модель нужно открывать той же версией, в которой её создали. Если не зафиксировать версию, при следующем деплое может установиться новый sklearn, и модель не загрузится.' }
      ]
    },
    'swe-7': {
      title: 'Clean code: разбиваем ноутбук на функции',
      body: `
<p>Во время исследования ноутбук — отличный инструмент. Но когда он превращается в ежедневный отчёт или API, «привычки ноутбука» обходятся дорого. Самые частые признаки (<b>code smells</b>):</p>
<ul>
<li><b>Скопированные блоки</b>: три одинаковых цикла для трёх городов.</li>
<li><b>Магические числа</b>: <code>/ 1.12</code> — что это НДС, знает только автор.</li>
<li><b>Бессмысленные имена</b>: <code>df2</code>, <code>a</code>, <code>tmp_final_v3</code>.</li>
<li><b>Глобальное состояние</b>: переменные, которые зависят от порядка выполнения ячеек.</li>
<li><b>Длинная ячейка</b>: чтение, очистка, расчёт и график — всё в одном месте.</li>
</ul>
<h3>Шаги рефакторинга</h3>
<ol>
<li>Вынесите магические числа в <b>константы</b>: <code>VAT_RATE = 0.12</code>.</li>
<li>Превратите повторяющуюся логику в <b>функцию с параметром</b>.</li>
<li>Разбейте pipeline на шаги: <code>load → clean → transform → report</code>, каждый — отдельная функция.</li>
<li>Пусть функции по возможности будут <b>чистыми</b> (pure): зависят только от входа и не меняют внешние переменные. Их легко тестировать.</li>
<li>Всё объединяет функция <code>main()</code>.</li>
</ol>
<h3>До и после</h3>
<pre><code># До
a = 0
for o in orders:
    if o['city'] == 'Алматы':
        a = a + o['gross'] / 1.12
b = 0
for o in orders:
    if o['city'] == 'Астана':
        b = b + o['gross'] / 1.12

# После
VAT_RATE = 0.12

def net_amount(gross: float) -> float:
    """Сумма без НДС."""
    return gross / (1 + VAT_RATE)

def revenue_by_city(orders: list[dict]) -> dict[str, float]:
    result = {}
    for o in orders:
        result[o['city']] = result.get(o['city'], 0) + net_amount(o['gross'])
    return result</code></pre>
<p>Новая версия работает для любого города (если добавится Орал, код не меняется), при изменении НДС правка делается в одном месте, а для <code>net_amount</code> и <code>revenue_by_city</code> можно написать отдельные тесты.</p>
<div class="tip">Рефакторинг — улучшение структуры <b>без изменения</b> поведения. Сначала сохраните результат старого кода, а после рефакторинга проверьте, что новый код даёт тот же результат.</div>`,
      ex: [
        { prompt: 'Отрефакторьте код из ноутбука: константа <code>VAT_RATE = 0.12</code>; <code>net_amount(gross)</code> — сумма без НДС (пусть использует <code>VAT_RATE</code>); <code>revenue_by_city(orders)</code> — словарь выручки без НДС по всем городам (названия городов не должны быть записаны в коде); <code>top_city(orders)</code> — город с наибольшей выручкой.', hints: ['<code>result[o[\'city\']] = result.get(o[\'city\'], 0) + net_amount(o[\'gross\'])</code> работает для любого города.', 'Ключ с наибольшим значением: <code>max(revenue, key=revenue.get)</code>.'], check: { tests: String.raw`assert VAT_RATE == 0.12, 'Определите константу VAT_RATE = 0.12'
assert abs(net_amount(1120) - 1000) < 1e-6, 'net_amount(1120) должна быть ≈ 1000'
VAT_RATE = 0.0
_n = net_amount(500)
VAT_RATE = 0.12
assert _n == 500, 'net_amount должна использовать константу VAT_RATE, а не число 1.12'
_o = [{'city': 'Орал', 'gross': 1120}, {'city': 'Ақтөбе', 'gross': 2240}, {'city': 'Орал', 'gross': 1120}]
_r = revenue_by_city(_o)
assert set(_r) == {'Орал', 'Ақтөбе'}, 'revenue_by_city должна работать с любым городом в данных (не прописывайте названия жёстко)'
assert abs(_r['Орал'] - 2000) < 1e-6 and abs(_r['Ақтөбе'] - 2000) < 1e-6, 'Суммы без НДС по городам неверны'
assert top_city(orders) == 'Алматы', 'top_city(orders) должна быть Алматы'
assert top_city([{'city': 'Орал', 'gross': 10}, {'city': 'Ақтөбе', 'gross': 20}]) == 'Ақтөбе', 'top_city должна возвращать город с наибольшей выручкой'` } },
        { prompt: 'Шаги очистки уже готовы в виде отдельных функций. Напишите <code>run_pipeline(data, steps)</code>: применяет функции из списка <code>steps</code> по порядку и возвращает результат. Затем <code>clean = run_pipeline(raw, [strip_spaces, drop_empty, unique])</code>.', hints: ['Функция сама по себе тоже значение: её можно положить в список и вызывать в цикле.', '<code>for step in steps: data = step(data)</code>, в конце <code>return data</code>.'], check: { tests: String.raw`assert clean == ['Алматы', 'Астана', 'Шымкент'], f'clean неверен: {clean}'
assert run_pipeline([1, 2], []) == [1, 2], 'Если шагов нет, данные не меняются'
assert run_pipeline(3, [lambda x: x + 1, lambda x: x * 10]) == 40, 'Шаги должны применяться в заданном порядке'` } },
        { prompt: 'Какое имя лучше всего подходит для функции?', options: ['<code>process(df)</code>', '<code>do_stuff2(df)</code>', '<code>drop_test_orders(df)</code>', '<code>f(df)</code>'], explain: 'Имя точно говорит, что делается: удаляет тестовые заказы. <code>process</code> и <code>f</code> ничего не объясняют.' }
      ]
    },
    'swe-8': {
      title: 'Основы REST API: HTTP и JSON',
      body: `
<p>Когда модель или отчёт нужны другим системам (сайту, мобильному приложению, CRM), мы отдаём их через <b>API</b>. Самый распространённый стиль — <b>REST</b>: клиент отправляет HTTP-запрос, сервер возвращает ответ в JSON.</p>
<h3>Части HTTP-запроса</h3>
<pre><code>POST /predict HTTP/1.1                     ← method + path
Host: api.dalamobile.kz
Content-Type: application/json            ← header
Authorization: Bearer abc123

{"tenure_months": 3, "support_calls": 5}  ← body (JSON)</code></pre>
<pre><code>HTTP/1.1 200 OK                            ← status code
Content-Type: application/json

{"churn_probability": 0.81, "label": 1}</code></pre>
<h3>Методы</h3>
<table>
<tr><th>Метод</th><th>Значение</th><th>Пример</th></tr>
<tr><td>GET</td><td>чтение, ничего не меняет</td><td><code>GET /products/42</code></td></tr>
<tr><td>POST</td><td>создание нового или расчёт</td><td><code>POST /products</code>, <code>POST /predict</code></td></tr>
<tr><td>PUT / PATCH</td><td>полное / частичное обновление</td><td><code>PATCH /products/42</code></td></tr>
<tr><td>DELETE</td><td>удаление</td><td><code>DELETE /products/42</code></td></tr>
</table>
<p>GET, PUT, DELETE — <b>идемпотентные</b>: отправить один и тот же запрос дважды — то же самое, что отправить его один раз. POST обычно не идемпотентен: отправите дважды — будет создано два товара.</p>
<h3>Status codes</h3>
<table>
<tr><th>Код</th><th>Значение</th></tr>
<tr><td>200 OK / 201 Created</td><td>успешно / создан новый ресурс</td></tr>
<tr><td>400 Bad Request</td><td>запрос составлен неверно (например, сломанный JSON)</td></tr>
<tr><td>401 / 403</td><td>неизвестно, кто вы / нет доступа</td></tr>
<tr><td>404 Not Found</td><td>такого ресурса нет</td></tr>
<tr><td>405 Method Not Allowed</td><td>path существует, но этот метод не поддерживается</td></tr>
<tr><td>422 Unprocessable</td><td>JSON корректен, но значения не прошли проверку</td></tr>
<tr><td>500 / 503</td><td>внутренняя ошибка сервера / сервис временно недоступен</td></tr>
</table>
<p>Правило: <b>4xx — ошибка клиента</b>, <b>5xx — ошибка сервера</b>.</p>
<h3>JSON и клиент в Python</h3>
<pre><code>import json
body = json.dumps({'city': 'Алматы'}, ensure_ascii=False)   # dict → str
data = json.loads('{"price": 15990}')                         # str → dict

import requests                                               # сторона клиента
r = requests.post('https://api.example.kz/predict', json={'tenure_months': 3}, timeout=5)
r.status_code, r.json()</code></pre>
<div class="tip">В Python в браузере нет сети, поэтому в заданиях мы моделируем сервер небольшой функцией: она принимает method, path и body и возвращает <code>(status, json)</code>. Настоящие фреймворки (FastAPI, Flask) внутри делают именно это.</div>`,
      ex: [
        { prompt: 'Ответ сервера пришёл текстом <code>raw</code>. (1) Превратите его в словарь <code>resp</code>, а в <code>prob</code> запишите вероятность ухода. (2) Превратите словарь <code>payload</code> для отправки в CRM (<code>customer_id</code> — id из ответа, <code>action</code> — <code>\'call\'</code>, <code>note</code> — <code>\'Ұсыныс: 20% жеңілдік\'</code> (предложение: скидка 20%)) в JSON-текст <code>body</code>. Казахские буквы не должны превращаться в коды <code>\\u</code>.', hints: ['<code>json.loads(raw)</code> превращает текст в словарь.', '<code>json.dumps(payload, ensure_ascii=False)</code> оставляет буквы как есть.'], check: { tests: String.raw`assert isinstance(resp, dict) and resp['city'] == 'Алматы', 'resp = json.loads(raw)'
assert prob == 0.81, 'prob — значение churn_probability'
assert isinstance(body, str), 'body должен быть текстом (str): используйте json.dumps'
assert json.loads(body) == {'customer_id': 1042, 'action': 'call', 'note': 'Ұсыныс: 20% жеңілдік'}, 'Содержимое payload неверно'
assert 'Ұсыныс' in body, 'Добавьте ensure_ascii=False, тогда казахские буквы останутся читаемыми'` } },
        { prompt: 'Напишите функцию <code>handle(method, path, body=None)</code>, которая моделирует API магазина. Она возвращает <code>(status, data)</code>:<br>• <code>GET /products</code> → 200, список всех товаров;<br>• <code>GET /products/&lt;id&gt;</code> → 200 и товар, если его нет — 404;<br>• <code>POST /products</code> → если в body есть <code>name</code> и <code>price &gt; 0</code>, присваивает новый id (наибольший id + 1), сохраняет и возвращает 201; иначе 400;<br>• другой метод для <code>/products</code> → 405; другой path → 404.<br>В случае ошибки data — <code>{\'error\': ...}</code>.', hints: ['Разбейте path на части: <code>parts = path.strip(\'/\').split(\'/\')</code>. <code>/products/2</code> → <code>[\'products\', \'2\']</code>.', 'Число ли id: <code>parts[1].isdigit()</code>. Новый id: <code>max(products) + 1</code>.'], check: { tests: String.raw`products.clear()
products.update({1: {'id': 1, 'name': 'Электр шәйнек', 'price': 15990}, 2: {'id': 2, 'name': 'Кофе машинасы', 'price': 89990}})
_s, _d = handle('GET', '/products')
assert _s == 200 and isinstance(_d, list) and len(_d) == 2, 'GET /products → 200 и список из 2 товаров'
_s, _d = handle('GET', '/products/2')
assert _s == 200 and _d['name'] == 'Кофе машинасы', 'GET /products/2 → 200 и этот товар'
assert handle('GET', '/products/99')[0] == 404, 'Несуществующий товар → 404'
assert handle('GET', '/products/abc')[0] == 404, 'Нечисловой id → 404'
assert handle('GET', '/orders')[0] == 404, 'Неизвестный path → 404'
assert handle('DELETE', '/products')[0] == 405, 'DELETE для /products → 405'
_s, _d = handle('POST', '/products', {'name': 'Тостер', 'price': 12990})
assert _s == 201 and _d['id'] == 3 and _d['price'] == 12990, 'POST → 201, новый id = 3'
assert handle('GET', '/products/3')[0] == 200, 'Новый товар должен сохраняться'
assert handle('POST', '/products', {'name': 'Тостер'})[0] == 400, 'Нет price → 400'
assert handle('POST', '/products', {'name': 'Тостер', 'price': -5})[0] == 400, 'Отрицательный price → 400'
assert 'error' in handle('POST', '/products', {})[1], 'В ответе с ошибкой должен быть ключ error'` } },
        { prompt: 'Клиент отправил на <code>POST /predict</code> корректный JSON, но значение <code>tenure_months</code> равно <code>-4</code>. Какой код должен вернуть сервер?', options: ['200', '404', '422 (или 400)', '500'], explain: 'Структура запроса правильная, но значение не прошло проверку: это ошибка клиента (4xx). FastAPI в таком случае возвращает 422. 500 — для собственной ошибки сервера.' },
        { prompt: 'Какой запрос <b>не идемпотентен</b>?', options: ['<code>GET /products/42</code>', '<code>PUT /products/42</code> (с одними и теми же полными данными)', '<code>DELETE /products/42</code>', '<code>POST /orders</code> (создаёт новый заказ)'], explain: 'Если отправить POST дважды, будет создано два заказа. Повтор остальных трёх результат не меняет.' }
      ]
    },
    'swe-gate': {
      title: 'Экзамен модуля: Software Eng for Data',
      body: `
<p>Итоговая проверка: класс, валидация, написание тестов, обработчик API и инженерные привычки. Подсказок нет. Проходной порог — 75%.</p>`,
      ex: [
        { prompt: 'Напишите класс <code>SalesLedger</code>. <code>__init__</code> создаёт пустой список <code>self.orders</code>. <code>add(city, amount)</code>: если <code>city</code> пустой или <code>amount</code> не превращается в число либо отрицателен — <code>ValueError</code>; иначе добавляет <code>{\'city\': city, \'amount\': float(amount)}</code>. <code>total(city=None)</code> — сумма по всем заказам или по одному городу (с hint <code>-> float</code>). <code>by_city()</code> — словарь <code>{город: сумма}</code>.', check: { tests: String.raw`_l = SalesLedger()
assert _l.orders == [], '__init__ должен создавать пустой список orders'
_l.add('Алматы', '12000')
_l.add('Астана', 8000)
_l.add('Алматы', 500.5)
assert _l.orders[0]['amount'] == 12000.0 and isinstance(_l.orders[0]['amount'], float), 'amount должен храниться как float'
for _args in [('', 100), ('Алматы', 'жүз'), ('Алматы', -1)]:
    try:
        _l.add(*_args)
    except ValueError:
        pass
    else:
        raise AssertionError(f'add{_args} ValueError лақтыруы керек')
assert len(_l.orders) == 3, 'Ошибочные строки не должны попадать в orders'
assert _l.total() == 20500.5, 'total() — общая сумма'
assert _l.total('Алматы') == 12500.5 and _l.total('Орал') == 0, 'total(city) — сумма по одному городу'
assert _l.by_city() == {'Алматы': 12500.5, 'Астана': 8000.0}, 'by_city() неверен'
assert SalesLedger.total.__annotations__.get('return') is float, 'Напишите hint -> float для total'` } },
        { prompt: 'Функция <code>normalize_phone</code> готова: приводит любой формат к виду <code>"77011234567"</code>, а если это не 11-значный казахстанский номер, выдаёт <code>ValueError</code>. Напишите <code>test_normalize_phone()</code>: он должен проходить на правильной версии и ловить сломанные. Как минимум такие случаи: <code>"+7 (701) 123-45-67"</code>, <code>"8 701 123 45 67"</code> и ValueError для <code>"12345"</code>.', check: { tests: String.raw`_ok = normalize_phone
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
assert _catches(_no8), 'Ваш тест не проверяет номер, начинающийся с 8 (8 701 ...)'
assert _catches(_nocheck), 'Ваш тест не проверяет, что на неверном номере возникает ValueError'
assert _catches(_spaces), 'Ваш тест не проверяет формат со скобками (+7 (701) ...)'` } },
        { prompt: 'Напишите <code>handle_request(method, path, raw_body)</code>, которая возвращает <code>(status, json_текст)</code>. Существует только <code>/score</code> (другой path → 404, другой метод → 405). Если тело POST — сломанный JSON → 400. Если любое из полей <code>tenure_months</code> и <code>support_calls</code> отсутствует, не является числом или отрицательно → 422 и <code>{"errors": [...]}</code> (по одной строке на каждое ошибочное поле, с названием поля). Иначе 200 и <code>{"risk": r}</code>, где <code>r = min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0))</code>, округлённое до 2 знаков.', check: { tests: String.raw`import json as _j
_s, _b = handle_request('POST', '/score', '{"tenure_months": 3, "support_calls": 4}')
assert _s == 200 and isinstance(_b, str), 'Успешный запрос: 200 и JSON-текст'
assert _j.loads(_b) == {'risk': 0.7}, f'Должно быть risk = 0.1*4 + 0.3 = 0.7, у вас {_b}'
assert _j.loads(handle_request('POST', '/score', '{"tenure_months": 24, "support_calls": 20}')[1])['risk'] == 1.0, 'risk не должен превышать 1.0'
assert _j.loads(handle_request('POST', '/score', '{"tenure_months": 24, "support_calls": 1}')[1])['risk'] == 0.1, 'Если tenure больше 6, 0.3 не прибавляется'
assert handle_request('POST', '/score', '{tenure: 3')[0] == 400, 'Сломанный JSON → 400'
_s, _b = handle_request('POST', '/score', '{"tenure_months": -1}')
assert _s == 422, 'Не прошло проверку → 422'
_e = _j.loads(_b)['errors']
assert len(_e) == 2 and any('tenure_months' in e for e in _e) and any('support_calls' in e for e in _e), 'По одному сообщению с названием на каждое ошибочное поле'
assert handle_request('POST', '/score', '{"tenure_months": "3", "support_calls": 1}')[0] == 422, 'Число в виде текста — тоже 422'
assert handle_request('GET', '/score', '')[0] == 405, 'GET /score → 405'
assert handle_request('POST', '/predict', '{}')[0] == 404, 'Неизвестный path → 404'` } },
        { prompt: 'Новый коллега склонировал проект и установил <code>pip install pandas scikit-learn</code>. При загрузке модели появились <code>InconsistentVersionWarning</code> и неверные прогнозы. Какое исправление правильное?', options: ['Пусть каждый коллега сам заново обучает модель', 'Создать в проекте <code>.venv</code> и устанавливать через <code>requirements.txt</code> с зафиксированными версиями (<code>pip install -r requirements.txt</code>); хранить файл в git', 'Заархивировать папку <code>.venv</code> в zip и переслать', 'Отключить предупреждение через <code>warnings.filterwarnings</code>'], explain: 'requirements.txt с зафиксированными версиями даёт всем одинаковое окружение. Отключение предупреждения лишь скрывает проблему.' },
        { prompt: 'В коде pipeline есть такой блок: <code>try: run_etl() except: pass</code>. Почему это опасно?', options: ['Он замедляет код', 'Он молча проглатывает все ошибки, даже ошибки в коде (NameError, KeyError): pipeline выглядит «успешно» завершённым, но данные не загружены, и в журнале не остаётся следа', 'В Python <code>except</code> нельзя писать без имени', 'Никакой опасности, это хорошая практика'], explain: 'Нужно ловить конкретную ошибку (<code>except ValueError</code>), записывать её через logger.error / logger.exception и при необходимости выбрасывать заново.' }
      ]
    },
    'dep-1': {
      title: 'Сохранение модели: pickle и joblib',
      body: `
<p>Модель мы обучаем в ноутбуке один раз, а прогнозы API делает тысячи раз в день. Переобучать её на каждый запрос невозможно. Поэтому обученный объект <b>сериализуют</b> (сохраняют) в файл, а сервер при запуске его загружает.</p>
<h3>pickle и joblib</h3>
<pre><code>import pickle, joblib

# pickle — стандартная библиотека
with open('model.pkl', 'wb') as f:
    pickle.dump(pipe, f)
with open('model.pkl', 'rb') as f:
    pipe = pickle.load(f)

# joblib эффективнее для объектов с большими массивами numpy, его рекомендует документация sklearn
joblib.dump(pipe, 'churn_model.joblib')
pipe = joblib.load('churn_model.joblib')</code></pre>
<h3>Что сохраняем</h3>
<ul>
<li><b>Весь Pipeline</b>, а не голую модель. Если <code>StandardScaler</code> отдельно, на сервере его легко забыть, а с немасштабированными данными модель молча будет давать неверные прогнозы.</li>
<li><b>Metadata</b>: список и порядок признаков, версию модели, дату обучения, метрику на test, версию sklearn. Их удобно положить вместе с моделью в один словарь («bundle»).</li>
</ul>
<pre><code>bundle = {
    'model': pipe,
    'features': ['tenure_months', 'support_calls'],
    'version': '1.2.0',
    'trained_at': '2026-09-30',
    'test_auc': 0.84,
}
joblib.dump(bundle, 'churn_v1.2.0.joblib')</code></pre>
<h3>Два важных предупреждения</h3>
<ol>
<li><b>Безопасность</b>: <code>pickle.load</code> может выполнить любой код, лежащий внутри файла. Не открывайте pickle из ненадёжного источника (из интернета, из файла, загруженного пользователем).</li>
<li><b>Версии</b>: модель, сохранённая в sklearn 1.6, может не открыться в 1.3 или работать иначе. Зафиксируйте версию в requirements.txt и запишите её в metadata.</li>
</ol>
<div class="tip">Если модель должна работать в разных языках и средах, её экспортируют в формат <b>ONNX</b>. А хранение версий моделей в registry вроде MLflow — тема модуля MLOps.</div>`,
      ex: [
        { prompt: 'Pipeline обучен. (1) Сохраните его в файл <code>churn_model.joblib</code> через <code>joblib.dump</code>. (2) Загрузите из файла в переменную <code>loaded</code>. (3) <code>same</code> — полностью ли совпадают прогнозы двух моделей на <code>data[FEATURES]</code> (<code>True</code>/<code>False</code>).', hints: ['<code>joblib.dump(pipe, \'churn_model.joblib\')</code>, затем <code>loaded = joblib.load(\'churn_model.joblib\')</code>.', 'Сравнение: <code>(loaded.predict(X) == pipe.predict(X)).all()</code>.'], check: { tests: String.raw`import os as _os
from sklearn.pipeline import Pipeline as _Pl
assert _os.path.exists('churn_model.joblib'), 'Файл churn_model.joblib не создан'
assert isinstance(loaded, _Pl) and loaded is not pipe, 'loaded должен быть Pipeline, загруженным из файла'
assert 'standardscaler' in loaded.named_steps, 'В сохранённом объекте должен быть и scaler (весь pipeline)'
assert same == True, 'same должно быть True: загруженная модель прогнозирует так же'` } },
        { prompt: 'Сохраните модель вместе с metadata. Словарь <code>bundle</code>: <code>model</code>, <code>features</code> (<code>FEATURES</code>), <code>version</code> = <code>\'1.0.0\'</code>. <code>blob = pickle.dumps(bundle)</code>, <code>restored = pickle.loads(blob)</code>. Затем напишите <code>predict_from_bundle(bundle, customer)</code>: берёт признаки в порядке из bundle и возвращает вероятность ухода как <code>float</code>.', hints: ['<code>pickle.dumps</code> превращает объект в bytes, <code>pickle.loads</code> — обратно.', 'Сохранение порядка: <code>pd.DataFrame([customer])[bundle[\'features\']]</code>.'], check: { tests: String.raw`assert isinstance(blob, bytes), 'blob = pickle.dumps(bundle) (bytes)'
assert restored['version'] == '1.0.0' and restored['features'] == FEATURES, 'В bundle должны быть version и features'
assert restored['model'] is not model and hasattr(restored['model'], 'coef_'), 'restored — результат pickle.loads'
_c = {'support_calls': 5, 'city': 'Алматы', 'tenure_months': 2}
_p = predict_from_bundle(restored, _c)
assert isinstance(_p, float) and 0 <= _p <= 1, 'predict_from_bundle возвращает float в диапазоне 0..1'
assert abs(_p - model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1]) < 1e-9, 'Признаки нужно брать в порядке bundle["features"] (даже если порядок ключей другой)'` } },
        { prompt: 'Пользователь загружает в API свой файл <code>.pkl</code> и просит: «сделайте прогноз этой моделью». Что нужно сделать?', options: ['Открыть через <code>pickle.load</code> и сделать прогноз', 'Не открывать: при загрузке pickle может выполниться любой код внутри, ненадёжный pickle открывать нельзя', 'Сначала проверить антивирусом, потом открыть', 'Если открыть через joblib, это безопасно'], explain: 'Форматы pickle и joblib опасны, если пришли из ненадёжного источника: файл может запустить произвольный код на вашем сервере.' },
        { prompt: 'Модель обучили на данных, масштабированных через <code>StandardScaler</code>, но сохранили только объект <code>LogisticRegression</code>. Что произойдёт на сервере?', options: ['Ничего, модель сама запоминает масштаб', 'Сервер передаёт немасштабированные данные, модель работает без ошибок, но возвращает <b>неверные</b> прогнозы', 'Модель не загрузится', 'Прогноз будет просто медленным'], explain: 'Поэтому весь Pipeline (preprocessing + модель) сохраняют как один объект.' }
      ]
    },
    'dep-2': {
      title: 'Функция прогноза и проверка входа',
      body: `
<p>Сердце API — одна функция: берёт данные из запроса и возвращает прогноз. В ноутбуке данные всегда были «правильными», а в продакшене приходит что угодно: нет поля, текст вместо числа, отрицательный стаж, <code>null</code>. На таких данных модель может не выдать ошибку, а просто предсказать бессмыслицу. Поэтому <b>проверку входа</b> (input validation) делают до модели.</p>
<h3>Контракт (contract) функции прогноза</h3>
<ul>
<li><b>Вход</b>: словарь (JSON). Какие поля обязательны, какого типа, в каком диапазоне.</li>
<li><b>Выход</b>: словарь: вероятность, класс, версия модели. Если ошибка — какое поле и почему.</li>
<li><b>Модель загружается один раз</b> (при запуске сервера), а не на каждый запрос.</li>
</ul>
<h3>Пример</h3>
<pre><code>MODEL = joblib.load('churn_model.joblib')   # на уровне модуля, один раз
MODEL_VERSION = '1.2.0'

def validate(data: dict) -> list[str]:
    errors = []
    t = data.get('tenure_months')
    if t is None:
        errors.append('tenure_months: обязательное поле')
    elif not isinstance(t, int) or t &lt; 0:
        errors.append('tenure_months: нужно неотрицательное целое число')
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
<h3>Что проверяем</h3>
<table>
<tr><th>Проверка</th><th>Пример</th></tr>
<tr><td>Есть ли обязательное поле</td><td>нет <code>monthly_fee</code></td></tr>
<tr><td>Тип</td><td><code>"12"</code> — текст, а не число</td></tr>
<tr><td>Диапазон</td><td><code>tenure_months = -3</code>, <code>monthly_fee = 0</code></td></tr>
<tr><td>Допустимые значения</td><td><code>has_contract</code> только 0 или 1</td></tr>
</table>
<p>Собирайте и возвращайте все ошибки сразу, не останавливайтесь на первой: клиент сможет исправить всё за один запрос. В каждом сообщении должно быть имя поля.</p>
<div class="tip">В Python <code>True</code> — подтип <code>int</code>: <code>isinstance(True, int)</code> → True. Если в числовое поле не должен приходить bool, проверяйте это отдельно.</div>`,
      ex: [
        { prompt: 'Напишите <code>validate_customer(data)</code>, которая возвращает список сообщений об ошибках (пустой список, если всё верно). Правила: <code>tenure_months</code> — целое число ≥ 0; <code>monthly_fee</code> — число (int или float) &gt; 0; <code>support_calls</code> — целое число ≥ 0; <code>has_contract</code> — 0 или 1. Отсутствие поля — тоже ошибка. Не больше одного сообщения на поле, в сообщении должно быть имя поля.', hints: ['Соберите функцию проверки для каждого поля в словарь: <code>{\'tenure_months\': lambda v: isinstance(v, int) and v >= 0, ...}</code>.', 'Сначала <code>if field not in data</code>, затем <code>elif not ok(data[field])</code>. Сообщение: <code>f\'{field}: ...\'</code>.'], check: { tests: String.raw`_good = {'tenure_months': 3, 'monthly_fee': 4990.0, 'support_calls': 2, 'has_contract': 1}
assert validate_customer(_good) == [], 'Для правильных данных пустой список'
assert validate_customer(dict(_good, monthly_fee=4990)) == [], 'monthly_fee в виде int тоже правильно'
_e = validate_customer({})
assert len(_e) == 4, f'Нет всех 4 полей: ожидалось 4 сообщения, у вас {len(_e)}'
_bad = {'tenure_months': -1, 'monthly_fee': 0, 'support_calls': 2.5, 'has_contract': 3}
_e = validate_customer(_bad)
assert len(_e) == 4, f'Все 4 поля ошибочны: ожидалось 4 сообщения, у вас {_e}'
for _f in _bad:
    assert any(_f in m for m in _e), f'Нет сообщения для {_f} (в сообщении должно быть имя поля)'
_e = validate_customer(dict(_good, tenure_months='12'))
assert len(_e) == 1 and 'tenure_months' in _e[0], 'Текст "12" — не число, это ошибка'` } },
        { prompt: 'Модель обучена один раз (<code>model</code>). Напишите <code>predict(data)</code>: <code>tenure_months</code> и <code>support_calls</code> должны быть целыми числами ≥ 0. При ошибке — <code>{\'ok\': False, \'errors\': [...]}</code>. Если всё верно — <code>{\'ok\': True, \'churn_probability\': p (округлённое до 3 знаков), \'label\': 1 или 0 (p ≥ 0.5), \'model_version\': MODEL_VERSION}</code>.', hints: ['Сначала цикл по <code>FEATURES</code>: является ли <code>customer.get(field)</code> целым числом ≥ 0?', 'Превратите вероятность в <code>float(...)</code> и сделайте <code>round(p, 3)</code>; <code>label = int(p >= 0.5)</code>.'], check: { tests: String.raw`_r = predict({'tenure_months': 2, 'support_calls': 5, 'city': 'Астана'})
assert _r.get('ok') is True, 'Для правильного входа ok=True'
assert set(_r) == {'ok', 'churn_probability', 'label', 'model_version'}, f'Ключи ответа: ok, churn_probability, label, model_version. У вас: {sorted(_r)}'
_p = float(model.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])
assert _r['churn_probability'] == round(_p, 3) and isinstance(_r['churn_probability'], float), 'churn_probability должна быть float, округлённым до 3 знаков'
assert _r['label'] == 1 and _r['model_version'] == '1.0.0', 'label и model_version неверны'
assert predict({'tenure_months': 50, 'support_calls': 0})['label'] == 0, 'Для давнего клиента label должен быть 0'
_r = predict({'tenure_months': -2})
assert _r.get('ok') is False and len(_r.get('errors', [])) == 2, 'Отрицательный tenure и отсутствующий support_calls: 2 ошибки'
assert predict({'tenure_months': '3', 'support_calls': 1})['ok'] is False, 'Текст "3" не должен приниматься'` } },
        { prompt: 'Где в API правильно загружать модель?', options: ['На каждый запрос внутри функции <code>predict</code> через <code>joblib.load</code>', 'Один раз при запуске сервера (на уровне модуля или в событии startup), затем все запросы используют этот объект', 'На каждый 10-й запрос', 'В браузере клиента'], explain: 'Загрузка из файла занимает от десятков до сотен миллисекунд. Если загружать на каждый запрос, latency вырастет в несколько раз.' }
      ]
    },
    'dep-3': {
      title: 'FastAPI: превращаем модель в endpoint',
      body: `
<p><b>FastAPI</b> — современный фреймворк для написания API на Python. В ML он очень популярен: по type hints автоматически делает проверку и документацию, работает быстро. В Python в браузере его нет, поэтому код мы разбираем как текст, а в заданиях сами моделируем его ядро (router).</p>
<h3>Самый маленький сервис</h3>
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
        raise HTTPException(status_code=404, detail='Клиент не найден')
    return DB[customer_id]</code></pre>
<pre><code>$ pip install fastapi uvicorn
$ uvicorn main:app --reload --port 8000
# http://localhost:8000/docs  → Swagger UI, endpoint можно испытать в браузере</code></pre>
<h3>Что происходит</h3>
<ul>
<li><code>@app.get('/health')</code> — <b>декоратор</b>: регистрирует функцию в таблице с правилом «если пришёл запрос GET /health, вызови её». Эта таблица — <b>router</b>.</li>
<li><code>customer: Customer</code> — FastAPI проверяет JSON body моделью Pydantic. Если есть ошибка, возвращается <b>422</b>, а функция даже не вызывается.</li>
<li><code>{customer_id}</code> — <b>path-параметр</b>, а <code>include_history</code> — <b>query-параметр</b>: <code>/customers/7?include_history=true</code>.</li>
<li>Словарь, который вернула функция, превращается в JSON, код по умолчанию — 200.</li>
<li><code>uvicorn main:app</code> — «запусти объект <code>app</code> из файла <code>main.py</code>».</li>
</ul>
<h3>Внутренняя логика router</h3>
<pre><code>routes = {('GET', '/health'): health, ('POST', '/predict'): predict}

def handle(method, path, body):
    func = routes.get((method, path))
    if func is None:
        return 404 (или 405, если path есть, но метод другой)
    return 200, func(...)</code></pre>
<div class="tip">В каждом ML-сервисе есть как минимум два endpoint: <code>GET /health</code> (жив ли сервис) и <code>POST /predict</code>. Добавлять версию модели в ответ или в <code>/health</code> — хорошая привычка.</div>`,
      ex: [
        { prompt: '<code>MiniApp</code>, похожий на FastAPI, уже готов. Зарегистрируйте через декораторы два endpoint: <code>GET /health</code> → <code>{\'status\': \'ok\', \'model_version\': MODEL_VERSION}</code>; <code>POST /predict</code> → берёт из body <code>support_calls</code> и возвращает <code>{\'risk\': round(min(1.0, 0.15 * support_calls), 2)}</code>. Если <code>support_calls</code> нет, пусть выбрасывается <code>ValueError</code> (MiniApp превратит его в 422).', hints: ['Декоратор пишется над функцией: <code>@app.get(\'/health\')</code>, на следующей строке <code>def health():</code>.', 'Функция POST принимает body: <code>def predict(body):</code>. Если поля нет — <code>raise ValueError(...)</code>.'], check: { tests: String.raw`assert app.handle('GET', '/health') == (200, {'status': 'ok', 'model_version': '1.0.0'}), 'GET /health → 200 и status/model_version'
assert app.handle('POST', '/predict', {'support_calls': 3}) == (200, {'risk': 0.45}), 'POST /predict {support_calls: 3} → risk 0.45'
assert app.handle('POST', '/predict', {'support_calls': 10}) == (200, {'risk': 1.0}), 'risk не должен превышать 1.0'
assert app.handle('POST', '/predict', {})[0] == 422, 'Если нет support_calls, ValueError → 422'
assert app.handle('GET', '/predict')[0] == 405, '/predict должен принимать только POST'` } },
        { prompt: 'Теперь напишите сам router. <code>MiniApp</code>: декораторы <code>get(path)</code> и <code>post(path)</code> регистрируют функцию в <code>self.routes[(method, path)]</code> и возвращают саму функцию. <code>handle(method, path, body=None)</code>: если маршрут найден — вызывает <code>func()</code> для GET или <code>func(body)</code> для POST и возвращает <code>(200, результат)</code>; если path есть, но метод другой — <code>(405, ...)</code>; если path нет вовсе — <code>(404, ...)</code>.', hints: ['Фабрика декораторов: внутри <code>def get(self, path):</code> — <code>def decorator(func): self.routes[(\'GET\', path)] = func; return func</code>, в конце <code>return decorator</code>.', 'Для 405: <code>any(p == path for _, p in self.routes)</code>.'], check: { tests: String.raw`_app = MiniApp()
@_app.get('/health')
def _h():
    return {'status': 'ok'}
@_app.post('/echo')
def _e(body):
    return {'got': body}
assert _h() == {'status': 'ok'}, 'Декоратор должен возвращать саму функцию (return func)'
assert ('GET', '/health') in _app.routes and ('POST', '/echo') in _app.routes, 'Ключи routes должны быть (method, path)'
assert _app.handle('GET', '/health') == (200, {'status': 'ok'}), 'GET /health → 200'
assert _app.handle('POST', '/echo', {'a': 1}) == (200, {'got': {'a': 1}}), 'В функцию POST передаётся body'
assert _app.handle('POST', '/health')[0] == 405, 'Path есть, метод другой → 405'
assert _app.handle('GET', '/nope')[0] == 404, 'Неизвестный path → 404'` } },
        { prompt: 'Что означает <code>main:app</code> в команде <code>uvicorn main:app --port 8000</code>?', options: ['Запустить функцию <code>main</code> на порту <code>app</code>', 'Запустить объект FastAPI с именем <code>app</code> из модуля <code>main.py</code>', 'Имя и тег Docker-образа', 'Ветку git и репозиторий'], explain: 'Формат: <code>модуль:переменная</code>. Uvicorn импортирует <code>main.py</code> и направляет запросы объекту <code>app</code> внутри него.' },
        { prompt: 'В FastAPI есть endpoint <code>GET /customers/{customer_id}</code>. Как правильнее всего поступить, если клиент не найден?', options: ['<code>return {}</code> (с кодом 200)', '<code>raise HTTPException(status_code=404, detail=\'Клиент не найден\')</code>', '<code>return None</code>', 'Остановить сервер'], explain: '404 ясно сообщает клиенту, что ресурса нет. Если пустой ответ придёт с кодом 200, клиент решит, что «всё в порядке».' }
      ]
    },
    'dep-4': {
      title: 'Pydantic: проверка данных по схеме',
      body: `
<p>В прошлом уроке мы писали проверки вручную через <code>if</code>. Когда полей много, это долго и чревато ошибками. <b>Pydantic</b> позволяет описать <b>схему</b> входа через type hints, а проверку и преобразование библиотека делает сама. Именно так FastAPI проверяет request body.</p>
<h3>Пример</h3>
<pre><code>from typing import Literal
from pydantic import BaseModel, Field

class CustomerIn(BaseModel):
    tenure_months: int = Field(ge=0, le=600)
    monthly_fee: float = Field(gt=0)
    support_calls: int = Field(ge=0)
    city: Literal['Алматы', 'Астана', 'Шымкент']

c = CustomerIn(tenure_months='12', monthly_fee=4990, support_calls=1, city='Алматы')
c.tenure_months      # 12  ← текст "12" преобразован в int
c.model_dump()       # {'tenure_months': 12, 'monthly_fee': 4990.0, ...}

CustomerIn(tenure_months=-3, monthly_fee=0, support_calls=1, city='Париж')
# ValidationError: 3 validation errors
#   tenure_months: Input should be greater than or equal to 0
#   monthly_fee:   Input should be greater than 0
#   city:          Input should be 'Алматы', 'Астана' or 'Шымкент'</code></pre>
<h3>Вместе с FastAPI</h3>
<p>Если написать <code>def predict(customer: CustomerIn)</code>, FastAPI проверит JSON по этой схеме. При ошибке функция вообще не вызывается, клиент получает <b>422</b> и список <code>detail</code>, где указано, какое поле и почему неверно. Схему можно задать и для выхода: <code>@app.post('/predict', response_model=PredictionOut)</code>.</p>
<h3>Основные возможности</h3>
<ul>
<li><b>Преобразование</b> (coercion): <code>"12"</code> → <code>12</code>; но <code>"двенадцать"</code> → ошибка.</li>
<li><b>Ограничения</b>: <code>Field(ge=0)</code> (≥), <code>gt</code> (&gt;), <code>le</code>, <code>max_length</code>.</li>
<li><b>Допустимые значения</b>: <code>Literal[...]</code> или <code>Enum</code>.</li>
<li><b>Значения по умолчанию</b> и необязательные поля: <code>promo: str | None = None</code>.</li>
<li><b>Лишние поля</b>: по умолчанию игнорируются, при <code>model_config = {'extra': 'forbid'}</code> — ошибка.</li>
</ul>
<p>В Python в браузере Pydantic нет, поэтому в заданиях мы повторяем его идею через стандартный <code>@dataclass</code> и <code>__post_init__</code>: сразу после создания объекта преобразуем и проверяем поля.</p>
<pre><code>@dataclass
class Point:
    x: int
    def __post_init__(self):
        self.x = int(self.x)       # преобразование
        if self.x &lt; 0:
            raise ValueError('x: не должно быть отрицательным')</code></pre>
<div class="tip">Схема — это договор между сервисом и клиентом. Держите её в одном месте (в одном классе), тогда документация (<code>/docs</code>), проверка и код не разойдутся друг с другом.</div>`,
      ex: [
        { prompt: 'Добавьте в dataclass <code>CustomerIn</code> метод <code>__post_init__</code>: преобразуйте <code>tenure_months</code> и <code>support_calls</code> через <code>int()</code> (для нечислового текста <code>int</code> сам выдаст ValueError); если значение отрицательное — <code>ValueError</code>; если <code>city</code> нет в <code>ALLOWED_CITIES</code> — <code>ValueError</code>. В сообщении должно быть имя поля.', hints: ['Внутри <code>def __post_init__(self):</code> — <code>self.tenure_months = int(self.tenure_months)</code>.', 'Затем <code>if self.city not in ALLOWED_CITIES: raise ValueError(\'city: ...\')</code>.'], check: { tests: String.raw`_c = CustomerIn('12', '3', 'Алматы')
assert _c.tenure_months == 12 and _c.support_calls == 3, '"12" и "3" должны преобразоваться в int'
assert isinstance(_c.tenure_months, int), 'tenure_months должен быть int'
for _args, _field in [((-1, 0, 'Алматы'), 'tenure_months'), ((5, -2, 'Астана'), 'support_calls'), ((5, 1, 'Париж'), 'city')]:
    try:
        CustomerIn(*_args)
    except ValueError as _e:
        assert _field in str(_e), f'В сообщении должно быть имя поля ({_field}), у вас: {_e}'
    else:
        raise AssertionError(f'CustomerIn{_args} ValueError лақтыруы керек')
try:
    CustomerIn('он екі', 1, 'Алматы')
except ValueError:
    pass
else:
    raise AssertionError('Сан емес мәтін ValueError беруі керек')` } },
        { prompt: 'Повторите поведение FastAPI с готовой схемой <code>CustomerIn</code>. <code>handle_predict(body)</code>: создайте <code>CustomerIn(**body)</code>; если поля нет или есть лишнее (<code>TypeError</code>) либо проверка не пройдена (<code>ValueError</code>) → <code>(422, {\'detail\': str(e)})</code>. При успехе → <code>(200, {\'customer\': asdict(c), \'risk\': r})</code>, где <code>r = round(min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0)), 2)</code>.', hints: ['<code>try: c = CustomerIn(**body)</code>, <code>except (TypeError, ValueError) as e: return 422, {\'detail\': str(e)}</code>.', 'При успехе <code>asdict(c)</code> даёт уже преобразованные значения.'], check: { tests: String.raw`_s, _d = handle_predict({'tenure_months': '3', 'support_calls': 2, 'city': 'Шымкент'})
assert _s == 200, 'Правильный body → 200'
assert _d.get('customer') == {'tenure_months': 3, 'support_calls': 2, 'city': 'Шымкент'}, 'customer — преобразованные значения (asdict)'
assert _d.get('risk') == 0.5, f'Должно быть risk = 0.1*2 + 0.3 = 0.5, у вас {_d.get("risk")}'
assert handle_predict({'tenure_months': 24, 'support_calls': 1, 'city': 'Алматы'})[1]['risk'] == 0.1, 'Если tenure ≥ 6, 0.3 не прибавляется'
_s, _d = handle_predict({'tenure_months': 3, 'city': 'Алматы'})
assert _s == 422 and 'detail' in _d, 'Нет поля → 422 и detail'
assert handle_predict({'tenure_months': 3, 'support_calls': 1, 'city': 'Алматы', 'promo': 'X'})[0] == 422, 'Лишнее поле → 422'
assert handle_predict({'tenure_months': 3, 'support_calls': 1, 'city': 'Орал'})[0] == 422, 'Недопустимый город → 422'
assert handle_predict({'tenure_months': 'abc', 'support_calls': 1, 'city': 'Алматы'})[0] == 422, 'Нечисловое значение → 422'` } },
        { prompt: 'Endpoint FastAPI принимает <code>CustomerIn</code> (Pydantic, <code>tenure_months: int = Field(ge=0)</code>). Клиент отправил <code>{"tenure_months": "abc", ...}</code>. Что произойдёт?', options: ['Функция вызовется, и tenure_months станет 0', 'Функция не вызовется, клиент получит 422 и сообщение об ошибке в поле tenure_months', 'Сервер вернёт 500', 'Запрос проигнорируется, вернётся 200'], explain: 'Pydantic не может преобразовать "abc" в int, и FastAPI возвращает 422, не доходя до функции. А если бы пришло "12", оно преобразовалось бы в 12.' }
      ]
    },
    'dep-5': {
      title: 'Docker: image, container, port',
      body: `
<p>«У меня на компьютере работает» — самая частая фраза при деплое. На сервере другая версия Python, нет библиотеки, другие системные зависимости. <b>Docker</b> упаковывает приложение вместе со всем его окружением (Python, библиотеки, код, файл модели) в один пакет, который одинаково работает на любой машине с Docker.</p>
<h3>Image и container</h3>
<ul>
<li><b>Image</b> — готовый «слепок»: файлы и настройки, он не меняется. Похож на класс в Python.</li>
<li><b>Container</b> — работающий экземпляр, запущенный из image. Похож на объект: из одного image можно запустить десятки container.</li>
<li><b>Registry</b> (Docker Hub, GitHub Container Registry) — место, где хранятся image.</li>
</ul>
<h3>Dockerfile построчно</h3>
<pre><code>FROM python:3.12-slim                 # базовый image: лёгкий Linux с Python
WORKDIR /app                          # рабочая папка внутри
COPY requirements.txt .               # сначала только список зависимостей
RUN pip install --no-cache-dir -r requirements.txt
COPY . .                              # затем весь код и модель
EXPOSE 8000                           # какой порт слушает container (документация)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</code></pre>
<p><b>Почему requirements.txt первым?</b> Docker кэширует каждую строку как <b>layer</b> (слой). Когда вы меняете код, пересобираются только <code>COPY . .</code> и последующие слои, а долгий <code>pip install</code> берётся из кэша. Если <code>COPY . .</code> стоит первым, при каждом изменении все библиотеки устанавливаются заново.</p>
<p><b>Почему 0.0.0.0?</b> <code>127.0.0.1</code> доступен только изнутри container. Чтобы принимать запросы снаружи, сервер должен слушать <code>0.0.0.0</code>.</p>
<h3>Команды</h3>
<pre><code>docker build -t churn-api:1.0 .            # собрать image
docker run -p 8080:8000 churn-api:1.0      # запустить container
#              ↑ хост   ↑ порт внутри container
curl http://localhost:8080/health          # с вашего компьютера
docker ps                                  # работающие container
docker logs &lt;container_id&gt;                 # журнал</code></pre>
<p>В файл <code>.dockerignore</code> записывают <code>.venv</code>, <code>.git</code>, <code>notebooks/</code>, данные и секреты: они не должны попасть в image.</p>
<div class="tip">Не кладите в image <b>секреты</b> (API-ключ, пароль): любой, кто получит image, сможет их прочитать. Секреты передаются при запуске как environment variable (следующий урок).</div>`,
      ex: [
        { prompt: 'Dockerfile коллеги лежит в переменной <code>dockerfile</code>. Он недоступен снаружи и медленно собирается. Исправьте: первым <code>FROM python:3.12-slim</code>; <code>WORKDIR /app</code>; <code>COPY requirements.txt .</code> → <code>RUN pip install ... -r requirements.txt</code> → <code>COPY . .</code> в этом порядке; <code>EXPOSE 8000</code>; последняя строка <code>CMD</code> пусть запускает uvicorn на хосте <code>0.0.0.0</code> и порту 8000.', hints: ['Ради кэша: сначала <code>COPY requirements.txt .</code>, затем <code>RUN pip install</code>, и только после этого <code>COPY . .</code>.', 'В CMD — <code>"--host", "0.0.0.0"</code>, а перед CMD — <code>EXPOSE 8000</code>.'], check: { tests: String.raw`_L = [l.strip() for l in dockerfile.strip().splitlines() if l.strip() and not l.strip().startswith('#')]
_I = [l.split()[0].upper() for l in _L]
assert _L[0].startswith('FROM python:3'), 'Первая строка: FROM python:3.12-slim'
assert 'WORKDIR' in _I and _I.index('WORKDIR') < _I.index('COPY'), 'WORKDIR /app до COPY'
_req = next((i for i, l in enumerate(_L) if l.split()[:2] == ['COPY', 'requirements.txt']), None)
_pip = next((i for i, l in enumerate(_L) if l.startswith('RUN') and 'pip install' in l and '-r requirements.txt' in l), None)
_all = next((i for i, l in enumerate(_L) if l.split() == ['COPY', '.', '.']), None)
assert _req is not None and _pip is not None and _all is not None, 'Нужны три строки: COPY requirements.txt . / RUN pip install -r requirements.txt / COPY . .'
assert _req < _pip < _all, 'Порядок: COPY requirements.txt → RUN pip install → COPY . . (ради кэша слоёв)'
assert any(l.split()[:2] == ['EXPOSE', '8000'] for l in _L), 'Добавьте EXPOSE 8000'
assert _I[-1] == 'CMD', 'Последней строкой должна быть CMD'
assert '0.0.0.0' in _L[-1] and '8000' in _L[-1] and 'uvicorn' in _L[-1], 'CMD должна запускать uvicorn на хосте 0.0.0.0 и порту 8000'` } },
        { prompt: 'Внутри container сервер слушает порт 8000. Вы запустили <code>docker run -p 9000:8000 churn-api:1.0</code>. Какой порт указать в браузере на своём компьютере: <code>http://localhost:____/health</code>?', explain: '<code>-p ХОСТ:CONTAINER</code>. 9000 слева — порт вашей машины, он соединён с 8000 внутри container.' },
        { prompt: 'Чем image отличается от container?', options: ['Это два названия одного и того же', 'Image — неизменяемый слепок (похож на класс), container — работающий экземпляр, запущенный из этого image (похож на объект)', 'Container — текст Dockerfile, image — запущенный процесс', 'Image только в Linux, container только в Windows'], explain: 'Из одного image можно запустить несколько container и распределить нагрузку.' },
        { prompt: 'В Dockerfile строка <code>COPY . .</code> стоит <b>до</b> <code>RUN pip install -r requirements.txt</code>. Вы изменили одну строку в коде. Что произойдёт?', options: ['Ничего, Docker копирует только изменённый файл', 'Поскольку слой COPY изменился, следующий за ним слой pip install тоже не возьмётся из кэша, и все библиотеки установятся заново', 'Сборка остановится с ошибкой', 'Container не запустится'], explain: 'Если меняется один слой, все последующие слои пересобираются. Поэтому то, что меняется редко (зависимости), ставят выше.' }
      ]
    },
    'dep-6': {
      title: 'Environment variables и config',
      body: `
<p>Один и тот же код работает в разных средах: на вашем ноутбуке (dev), на тестовом сервере (staging) и в продакшене (production). Разница — в <b>настройках</b>: путь к файлу модели, порт, порог, адрес базы данных, API-ключи. Мы не пишем их в код, а передаём через <b>environment variables</b> (переменные окружения). Это основное правило подхода «12-factor app».</p>
<h3>Чтение в Python</h3>
<pre><code>import os

MODEL_PATH = os.environ['MODEL_PATH']                  # обязательная: если нет — KeyError
PORT = int(os.getenv('PORT', '8000'))                  # есть значение по умолчанию
DEBUG = os.getenv('DEBUG', 'false').lower() in ('1', 'true', 'yes')
THRESHOLD = float(os.getenv('THRESHOLD', '0.5'))</code></pre>
<p>Важно: environment variable — это всегда <b>текст</b>. <code>'8000'</code> в <code>int</code>, а <code>'false'</code> в bool вы преобразуете сами. Не забывайте, что <code>bool('false')</code> → <code>True</code>!</p>
<h3>Как передаются</h3>
<pre><code># в терминале
export MODEL_PATH=models/churn_v1.2.0.joblib
# Docker
docker run -e THRESHOLD=0.35 --env-file .env -p 8080:8000 churn-api:1.0
# файл .env (в git не кладётся!)
MODEL_PATH=models/churn_v1.2.0.joblib
DB_PASSWORD=s3cr3t</code></pre>
<p>При локальной разработке файл <code>.env</code> читает <code>python-dotenv</code>, а на платформах вроде Render и Railway переменные задаются в dashboard. Пакет <code>pydantic-settings</code> от Pydantic описывает config как схему и сам делает преобразование и проверку.</p>
<h3>Правила</h3>
<ul>
<li><b>Секретов нет ни в коде, ни в git, ни в Docker image.</b> <code>.env</code> → <code>.gitignore</code>. В репозиторий кладут только шаблон без значений <code>.env.example</code>.</li>
<li>Читайте и проверяйте config <b>в одном месте</b>, один раз при запуске. Если обязательной переменной нет, сервер должен сразу остановиться с понятной ошибкой, а не на первом запросе.</li>
<li>Когда пишете config в журнал, <b>скрывайте</b> секреты.</li>
</ul>
<div class="tip">Если секрет случайно попал в git, удалить файл недостаточно: он остаётся в истории. Немедленно <b>замените</b> ключ (rotate).</div>`,
      ex: [
        { prompt: 'Напишите <code>load_config(env)</code> (<code>env</code> — словарь вроде <code>os.environ</code>, значения — текст). Возвращает: <code>{\'model_path\', \'port\', \'debug\', \'threshold\'}</code>. <code>MODEL_PATH</code> обязательна: если её нет — <code>RuntimeError</code> (в сообщении MODEL_PATH). <code>PORT</code> → int, по умолчанию 8000. <code>DEBUG</code> → bool: True, если <code>1/true/yes</code> (в любом регистре), по умолчанию False. <code>THRESHOLD</code> → float, по умолчанию 0.5; если вне диапазона 0..1 — <code>RuntimeError</code> (в сообщении THRESHOLD).', hints: ['Текст в bool: <code>env.get(\'DEBUG\', \'false\').lower() in (\'1\', \'true\', \'yes\')</code>. <code>bool(\'false\')</code> даёт True!', 'Обязательная переменная: <code>if \'MODEL_PATH\' not in env: raise RuntimeError(...)</code>.'], check: { tests: String.raw`_c = load_config({'MODEL_PATH': 'm.joblib'})
assert _c == {'model_path': 'm.joblib', 'port': 8000, 'debug': False, 'threshold': 0.5}, f'Значения по умолчанию неверны: {_c}'
_c = load_config({'MODEL_PATH': 'm.joblib', 'PORT': '10000', 'DEBUG': 'TRUE', 'THRESHOLD': '0.35'})
assert _c['port'] == 10000 and isinstance(_c['port'], int), 'Превратите текст PORT в int'
assert _c['debug'] is True, 'DEBUG="TRUE" → True (без учёта регистра)'
assert _c['threshold'] == 0.35, 'Превратите текст THRESHOLD во float'
assert load_config({'MODEL_PATH': 'm', 'DEBUG': 'false'})['debug'] is False, 'DEBUG="false" → False'
assert load_config({'MODEL_PATH': 'm', 'DEBUG': '0'})['debug'] is False, 'DEBUG="0" → False'
for _env, _w in [({}, 'MODEL_PATH'), ({'MODEL_PATH': 'm', 'THRESHOLD': '1.5'}, 'THRESHOLD')]:
    try:
        load_config(_env)
    except RuntimeError as _e:
        assert _w in str(_e), f'В сообщении должно упоминаться {_w}'
    else:
        raise AssertionError(f'{_env} үшін RuntimeError күтілді')` } },
        { prompt: 'При запуске сервиса config пишется в журнал. Напишите <code>safe_config(cfg)</code>: пусть возвращает <b>новый</b> словарь, в котором значения ключей, содержащих <code>KEY</code>, <code>SECRET</code>, <code>PASSWORD</code> или <code>TOKEN</code> (без учёта регистра), заменены на <code>\'***\'</code>. Исходный словарь меняться не должен.', hints: ['Приведите ключ к <code>k.upper()</code> и проверьте, есть ли в нём один из маркеров: <code>any(m in k.upper() for m in (...))</code>.', 'Новый словарь: <code>{k: ... for k, v in cfg.items()}</code>.'], check: { tests: String.raw`_s = safe_config(cfg)
assert _s == {'MODEL_PATH': 'models/churn.joblib', 'DB_PASSWORD': '***', 'openai_api_key': '***', 'PORT': '8000'}, f'Неверный результат: {_s}'
assert cfg['DB_PASSWORD'] == 's3cr3t', 'Исходный cfg не должен меняться: верните новый словарь'
assert safe_config({'Telegram_Token': 'x', 'secret_salt': 'y'}) == {'Telegram_Token': '***', 'secret_salt': '***'}, 'TOKEN и SECRET тоже должны скрываться (без учёта регистра)'` } },
        { prompt: 'Где правильно хранить пароль от базы данных?', options: ['В <code>main.py</code> в виде константы', 'В <code>requirements.txt</code>', 'В настройках environment variables / secrets платформы (локально — в файле .env, который не кладут в git)', 'В Dockerfile строкой <code>ENV DB_PASSWORD=...</code>'], explain: 'Код, git и Docker image доступны многим людям. Секрет передаётся из окружения только при запуске.' }
      ]
    },
    'dep-7': {
      title: 'Деплой в облако и health check',
      body: `
<p>Docker image готов. Теперь его нужно разместить там, где он будет постоянно работать в интернете. У начинающего есть три пути.</p>
<table>
<tr><th>Вариант</th><th>Как работает</th><th>Плюсы</th><th>Минусы</th></tr>
<tr><td><b>Render</b></td><td>Подключаете репозиторий GitHub, он сам собирает из Dockerfile и даёт HTTPS-адрес</td><td>Проще всего; есть бесплатный план; git push → автоматический деплой</td><td>Бесплатный сервис «засыпает» при простое: следующий запрос ждёт 30–60 с (cold start)</td></tr>
<tr><td><b>Railway</b></td><td>Похож на Render, Dockerfile или автоматическое определение</td><td>Удобный интерфейс, база данных подключается одной кнопкой</td><td>Оплата по использованным ресурсам, нужно следить за расходами</td></tr>
<tr><td><b>VPS</b> (Hetzner, DigitalOcean, ps.kz)</td><td>Арендованный Linux-сервер: ставите Docker и запускаете сами, впереди nginx и TLS</td><td>Полный контроль, фиксированная цена, данные можно хранить в Казахстане</td><td>Обновления, безопасность, бэкапы, мониторинг — всё на вас</td></tr>
</table>
<p>В крупных компаниях используют Google Cloud Run, AWS App Runner или Kubernetes, но идея та же: <b>container + config + health check</b>.</p>
<h3>Health check</h3>
<p>Платформа каждые несколько секунд отправляет запрос вашему сервису и проверяет, жив ли он. Если ответа нет, она перезапускает container или перестаёт направлять на него трафик.</p>
<ul>
<li><b>Liveness</b> (<code>/health</code>): жив ли процесс? Всегда быстро возвращает 200, тяжёлой работы не делает.</li>
<li><b>Readiness</b> (<code>/ready</code>): готов ли принимать запросы? Если модель ещё загружается — <b>503</b>, если готов — 200 и версия модели.</li>
</ul>
<pre><code>@app.get('/ready')
def ready():
    if STATE['model'] is None:
        raise HTTPException(status_code=503, detail='model loading')
    return {'status': 'ready', 'model_version': STATE['model_version']}</code></pre>
<h3>Чек-лист деплоя</h3>
<ol>
<li>Сервер читает номер порта из переменной <code>PORT</code> (Render задаёт её сам).</li>
<li>Все секреты и config — в разделе environment variables платформы.</li>
<li>Путь health check указан в платформе.</li>
<li>Журнал пишется в stdout: платформа его собирает и показывает.</li>
<li>После деплоя — <b>smoke test</b>: /health и один реальный запрос /predict.</li>
<li>План отката (rollback): вернуться к тегу предыдущего image.</li>
</ol>
<div class="tip">Пишите в теге image версию (<code>churn-api:1.3.0</code>), а не <code>latest</code>. Тогда на вопросы «какая именно версия стоит в продакшене?» и «как откатиться?» сразу есть ответ.</div>`,
      ex: [
        { prompt: 'Напишите две health-функции. <code>liveness()</code> всегда возвращает <code>(200, {\'status\': \'alive\'})</code>. <code>readiness(state)</code>: если <code>state[\'model\']</code> равно <code>None</code> — <code>(503, {\'status\': \'loading\'})</code>, иначе <code>(200, {\'status\': \'ready\', \'model_version\': state[\'model_version\']})</code>.', hints: ['<code>liveness</code> ничего не проверяет: <code>return 200, {\'status\': \'alive\'}</code>.', '<code>readiness</code>: <code>if state[\'model\'] is None: return 503, ...</code>.'], check: { tests: String.raw`assert liveness() == (200, {'status': 'alive'}), 'liveness() → (200, {"status": "alive"})'
assert readiness({'model': None, 'model_version': None}) == (503, {'status': 'loading'}), 'Если модель не загружена → 503 loading'
assert readiness({'model': 'm', 'model_version': '2.1.0'}) == (200, {'status': 'ready', 'model_version': '2.1.0'}), 'Модель готова → 200, ready и model_version'` } },
        { prompt: '<b>Smoke test</b> после деплоя. Напишите <code>smoke_test(handle)</code>: <code>handle(method, path, body=None)</code> → <code>(status, data)</code>. Три проверки: <code>\'health\'</code> — <code>GET /health</code> возвращает 200; <code>\'predict\'</code> — <code>POST /predict</code> с <code>{\'tenure_months\': 3, \'support_calls\': 4}</code> возвращает 200, и <code>data[\'churn_probability\']</code> в диапазоне 0..1; <code>\'validation\'</code> — <code>POST /predict</code> с пустым <code>{}</code> возвращает 422. Верните список названий непройденных проверок (если всё пройдено — пустой список).', hints: ['Пишите каждую проверку отдельно: <code>status, data = handle(\'POST\', \'/predict\', {...})</code>, если условие не выполнено — <code>failed.append(\'predict\')</code>.', 'Берите вероятность через <code>data.get(\'churn_probability\')</code>: если ключа нет, будет None, и проверка не пройдёт.'], check: { tests: String.raw`assert smoke_test(good_handle) == [], 'Для исправного сервиса пустой список'
def _down(method, path, body=None):
    return 503, {}
assert smoke_test(_down) == ['health', 'predict', 'validation'], 'Если сервис не работает, не проходят все три проверки (в этом порядке)'
def _badprob(method, path, body=None):
    if path == '/health':
        return 200, {}
    if not body:
        return 422, {}
    return 200, {'churn_probability': 7.1}
assert smoke_test(_badprob) == ['predict'], 'Вероятность вне диапазона 0..1 → predict не проходит'
def _nokey(method, path, body=None):
    if path == '/health':
        return 200, {}
    return 200, {'risk': 0.3}
assert smoke_test(_nokey) == ['predict', 'validation'], 'Нет churn_probability, а пустой body даёт 200 → predict, validation'` } },
        { prompt: 'API на бесплатном плане Render ночью никто не использовал, и на первый утренний запрос он ответил за 50 секунд, а следующие — быстро. В чём причина?', options: ['Модель плохо обучена', 'Бесплатный сервис при простое «засыпает», и первый запрос запускает его заново (cold start): загружаются container и модель', 'Медленный интернет', 'Долгая проверка Pydantic'], explain: 'Cold start: запускается container и загружается модель. Если нужна стабильная скорость, требуется платный план или постоянно включённый сервер.' },
        { prompt: 'Напишите план деплоя churn API компании «Дала Мобайл» (FastAPI + Docker, модель 40 МБ, ~5 000 запросов в день, данные содержат персональную информацию): какая платформа и почему, где config и секреты, как устроен health check, что вы проверяете после деплоя, как откатитесь при сбое. Затем честно оцените себя по четырём критериям.', criteria: [
          { name: 'Выбор платформы', levels: ['Платформа не названа', 'Названа, но без причины', 'Выбор объяснён через нагрузку и цену', 'Учтены выбор, альтернатива и то, где хранятся данные (персональная информация)'] },
          { name: 'Config и секреты', levels: ['Не упомянуты', 'Общие слова', 'Environment variables, секретов нет в image и git', 'Конкретный список переменных, .env.example и план замены (rotate) секретов'] },
          { name: 'Health check и проверка', levels: ['Нет', 'Сказано только «есть /health»', 'Liveness/readiness и smoke test после деплоя', 'Health, smoke test, журнал и мониторинг latency'] },
          { name: 'Rollback', levels: ['Нет', '«Задеплоим заново»', 'Возврат к image с тегом версии', 'Тег версии, шаги отката и условие принятия решения (когда откатываем)'] }
        ] }
      ]
    },
    'dep-8': {
      title: 'Latency, throughput и batch-прогноз',
      body: `
<p>Сервис работает, теперь вопрос: <b>насколько быстро</b>? Есть две метрики:</p>
<ul>
<li><b>Latency</b> — время ответа на один запрос (мс).</li>
<li><b>Throughput</b> — сколько запросов обрабатывается в секунду (RPS).</li>
</ul>
<h3>Почему перцентиль, а не среднее</h3>
<p>Даже если средняя latency 40 мс, каждый 20-й клиент может ждать 900 мс. Поэтому используют <b>p50</b> (медиану), <b>p95</b> и <b>p99</b>: «95% запросов быстрее этого времени». SLO (целевой уровень сервиса) обычно записывают так: «p95 ≤ 200 мс».</p>
<pre><code>import time, numpy as np
latencies = []
for row in sample:
    t0 = time.perf_counter()
    predict(row)
    latencies.append((time.perf_counter() - t0) * 1000)
np.percentile(latencies, [50, 95, 99])</code></pre>
<h3>Куда уходит время</h3>
<ol>
<li><b>Загрузка модели</b> — один раз, при запуске. Загрузка на каждый запрос — самая частая ошибка.</li>
<li><b>Проверка и создание DataFrame</b> — мелочи, но они накапливаются.</li>
<li><b>Прогноз</b> — у линейной модели микросекунды, у большого ансамбля или нейросети дольше.</li>
<li><b>Сеть</b> и расположение клиента: если сервер во Франкфурте, из Алматы ~80–100 мс уходит только на дорогу.</li>
</ol>
<h3>Batch: много строк сразу</h3>
<p>sklearn векторизован: прогноз 1 000 строк одним вызовом <code>predict_proba</code> в десятки раз быстрее, чем 1 000 прогнозов по одной строке. Поэтому:</p>
<ul>
<li><b>Online</b> (API, один клиент): важна latency, ответ в реальном времени.</li>
<li><b>Batch</b> (ночной job): спрогнозировать всех 2 млн абонентов частями (например, по 10 000) и записать результат в базу данных. API для такой работы не нужен.</li>
<li>В API тоже можно добавить <code>POST /predict_batch</code>, но ограничьте число строк в одном запросе (например, 100), иначе один клиент надолго займёт сервер.</li>
</ul>
<pre><code>def predict_batch(model, rows, batch_size=10_000):
    out = []
    for i in range(0, len(rows), batch_size):
        chunk = rows[i:i + batch_size]
        out.extend(model.predict_proba(chunk)[:, 1])
    return out</code></pre>
<div class="tip">Если один worker обрабатывает запрос за 25 мс, он выдаёт не больше 40 запросов в секунду. Если нужно больше, увеличивают число worker (<code>uvicorn --workers 4</code>) или количество container.</div>`,
      ex: [
        { prompt: 'Результаты нагрузочного теста лежат в списке <code>latencies</code> (мс). Посчитайте через <code>numpy.percentile</code> <code>p50</code> и <code>p95</code>, а также среднее <code>mean_ms</code>. SLO: p95 ≤ 200 мс. <code>slo_ok</code> — выполняется ли SLO (bool).', hints: ['<code>np.percentile(latencies, 95)</code> — 95-й перцентиль.', '<code>slo_ok = bool(p95 <= 200)</code>. Даже если медиана хорошая, p95 может говорить другое.'], check: { tests: String.raw`import numpy as _np
assert abs(p50 - _np.percentile(latencies, 50)) < 1e-9, 'p50 = np.percentile(latencies, 50)'
assert abs(p95 - _np.percentile(latencies, 95)) < 1e-9, 'p95 = np.percentile(latencies, 95)'
assert abs(mean_ms - _np.mean(latencies)) < 1e-9, 'mean_ms — среднее'
assert slo_ok is False or slo_ok == False, 'p95 ≈ 624 мс > 200: SLO не выполняется, slo_ok должно быть False'` } },
        { prompt: 'Напишите <code>predict_batch(model, rows, batch_size)</code>: делит <code>rows</code> на части размера <code>batch_size</code> и для каждой части <b>один</b> раз вызывает <code>model.predict_proba(chunk)</code>; возвращает список вероятностей класса 1 (элемент <code>[1]</code>) для каждой строки в исходном порядке.', starter: String.raw`class CountingModel:
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
`, hints: ['<code>for i in range(0, len(rows), batch_size):</code> и <code>chunk = rows[i:i + batch_size]</code>.', 'Из результата каждой части возьмите элемент 1: <code>out.extend(p[1] for p in model.predict_proba(chunk))</code>.'], check: { tests: String.raw`_m = CountingModel()
_rows = [{'support_calls': k % 10} for k in range(250)]
_out = predict_batch(_m, _rows, 100)
assert _m.calls == 3, f'250 строк, batch_size=100 → predict_proba должна вызываться 3 раза, у вас {_m.calls}'
assert len(_out) == 250, 'По одной вероятности на строку'
assert _out[:12] == [k % 10 / 10 for k in range(12)] and _out[-1] == 0.9, 'Вероятности в исходном порядке, элемент [1]'
_m2 = CountingModel()
assert predict_batch(_m2, [], 50) == [] and _m2.calls == 0, 'Для пустого списка модель не вызывается'` } },
        { prompt: 'Один worker обрабатывает запрос за 25 мс и обрабатывает запросы по очереди. Сколько запросов в секунду он может обработать максимум?', unit: 'запросов/с', explain: '1000 мс / 25 мс = 40 запросов/с. При 4 worker — примерно 160.' },
        { prompt: 'Маркетинг хочет каждое утро видеть в CRM вероятность оттока для всех 2 млн абонентов. Какая архитектура правильнее всего?', options: ['CRM отправляет в API отдельный запрос на каждого абонента (2 млн запросов)', 'Ночной batch job: модель прогнозирует всех абонентов частями и записывает результат в базу данных; CRM читает из базы', 'Запускать модель в браузере CRM', 'Отправить в API 2 млн строк одним запросом'], explain: 'Реальное время не нужно, а объём большой: классический случай batch scoring. API нужен для быстрого ответа одному клиенту.' }
      ]
    },
    'dep-gate': {
      title: 'Экзамен модуля: Deployment',
      body: `
<p>Итоговая проверка: сохранение и загрузка модели, логика endpoint, batch, Docker и план деплоя. Подсказок нет. Проходной порог — 75%.</p>`,
      ex: [
        { prompt: 'Полный цикл сервиса. (1) Обучите pipeline <code>StandardScaler</code> + <code>LogisticRegression</code> на <code>data[FEATURES]</code> и сохраните его в файл <code>gate_model.joblib</code>. (2) «При запуске сервера» загрузите его в переменную <code>MODEL</code>. (3) <code>predict_endpoint(body)</code>: если какой-либо из <code>FEATURES</code> не является целым числом ≥ 0 → <code>(422, {\'detail\': [сообщения об ошибках, в каждом имя поля]})</code>; иначе → <code>(200, {\'churn_probability\': p (3 знака), \'model_version\': \'2.0.0\'})</code>.', check: { tests: String.raw`import os as _os
from sklearn.pipeline import Pipeline as _Pl
assert _os.path.exists('gate_model.joblib'), 'gate_model.joblib не сохранён'
assert isinstance(MODEL, _Pl) and 'standardscaler' in MODEL.named_steps, 'MODEL — загруженный из файла Pipeline со scaler'
_s, _d = predict_endpoint({'support_calls': 5, 'tenure_months': 2, 'city': 'Алматы'})
_p = float(MODEL.predict_proba(pd.DataFrame([[2, 5]], columns=FEATURES))[0, 1])
assert _s == 200 and _d == {'churn_probability': round(_p, 3), 'model_version': '2.0.0'}, f'Неверный ответ на правильный запрос: {_d}'
assert predict_endpoint({'tenure_months': 48, 'support_calls': 0})[1]['churn_probability'] < 0.5, 'У давнего клиента вероятность должна быть низкой'
_s, _d = predict_endpoint({'tenure_months': -1, 'support_calls': '2'})
assert _s == 422 and len(_d['detail']) == 2, 'Оба поля ошибочны → 422, в detail 2 сообщения'
assert any('tenure_months' in m for m in _d['detail']) and any('support_calls' in m for m in _d['detail']), 'В сообщениях должны быть имена полей'
assert predict_endpoint({})[0] == 422, 'Пустой body → 422'` } },
        { prompt: 'Напишите <code>batch_endpoint(body)</code>. <code>body[\'customers\']</code> должен быть списком: если его нет, это не список или он пуст → <code>(422, {\'detail\': ...})</code>; если больше 100 → <code>(413, {\'detail\': ...})</code>. У каждого клиента <code>tenure_months</code> и <code>support_calls</code> должны быть целыми числами ≥ 0; если есть ошибочные клиенты → <code>(422, {\'detail\': [{\'index\': i, \'field\': поле}, ...]})</code> (каждое ошибочное поле отдельно). Если всё верно → <code>(200, {\'predictions\': [risk, ...]})</code>, <code>risk = round(min(1.0, 0.1 * support_calls + (0.3 if tenure_months &lt; 6 else 0)), 2)</code>.', check: { tests: String.raw`_ok = {'customers': [{'tenure_months': 3, 'support_calls': 4}, {'tenure_months': 30, 'support_calls': 1}, {'tenure_months': 2, 'support_calls': 9}]}
assert batch_endpoint(_ok) == (200, {'predictions': [0.7, 0.1, 1.0]}), f'Правильный batch → 200 и [0.7, 0.1, 1.0], у вас {batch_endpoint(_ok)}'
assert batch_endpoint({})[0] == 422, 'Нет customers → 422'
assert batch_endpoint({'customers': []})[0] == 422, 'Пустой список → 422'
assert batch_endpoint({'customers': 'abc'})[0] == 422, 'Не список → 422'
assert batch_endpoint({'customers': [{'tenure_months': 1, 'support_calls': 1}] * 101})[0] == 413, '101 клиент → 413'
assert batch_endpoint({'customers': [{'tenure_months': 1, 'support_calls': 1}] * 100})[0] == 200, '100 клиентов — в пределах лимита'
_s, _d = batch_endpoint({'customers': [{'tenure_months': 3, 'support_calls': 4}, {'tenure_months': -1}, {'tenure_months': 5, 'support_calls': 'x'}]})
assert _s == 422, 'Если есть ошибочный клиент → 422'
assert sorted((e['index'], e['field']) for e in _d['detail']) == [(1, 'support_calls'), (1, 'tenure_months'), (2, 'support_calls')], f'detail должен показывать каждое ошибочное поле через index и field, у вас {_d["detail"]}'` } },
        { prompt: 'Container запущен (<code>docker run -p 8080:8000 churn-api:1.3.0</code>), в <code>docker logs</code> написано «Uvicorn running on http://127.0.0.1:8000», но <code>curl localhost:8080/health</code> не отвечает. Что нужно исправить?', options: ['Поменять порт на <code>-p 8000:8080</code>', 'Запустить Uvicorn с <code>--host 0.0.0.0</code>: 127.0.0.1 доступен только изнутри container', 'Пересобрать image с тегом <code>latest</code>', 'Добавить curl в requirements.txt'], explain: 'Сервер слушает только loopback-интерфейс container. 0.0.0.0 слушает все интерфейсы, и тогда проброс порта работает.' },
        { prompt: 'В сервисе 4 worker, каждый обрабатывает запрос за 50 мс по очереди. Сколько запросов в секунду максимум обрабатывает один container?', unit: 'запросов/с', explain: 'Один worker: 1000 / 50 = 20 запросов/с. 4 worker: 80 запросов/с.' },
        { prompt: 'Ваша команда выводит модель оттока из ноутбука в продакшен. Напишите обзор production-readiness (не меньше 80 слов): как модель сохраняется и загружается; как проверяется вход; как собираются Docker image и config; на какую платформу делается деплой и какой health check; цель по latency и batch-сценарий. Затем честно оцените себя по четырём критериям. Для прохождения каждый критерий должен быть не ниже <b>3 / 4</b>.', criteria: [
          { name: 'Модель и вход', levels: ['Не упомянуто', 'Только «сохраним через joblib»', 'Сохраняются весь pipeline + metadata, вход проверяется схемой с возвратом 422', 'Дополнительно упомянуты фиксация версий и однократная загрузка модели'] },
          { name: 'Docker и config', levels: ['Не упомянуто', 'Docker назван, без содержания', 'Основные шаги Dockerfile, 0.0.0.0, секреты в environment variables', 'Кэш слоёв, .dockerignore, тег версии и отсутствие секретов в image'] },
          { name: 'Деплой и мониторинг', levels: ['Нет', 'Названа платформа', 'Платформа, liveness/readiness и smoke test', 'Дополнительно учтены журнал, rollback и cold start/цена'] },
          { name: 'Производительность', levels: ['Нет', '«Должно быть быстро»', 'Цель по p95 (например, ≤ 200 мс) и способ её измерить', 'Цель по p95, расчёт throughput и разделение online/batch'] }
        ] }
      ]
    }
  }
});
