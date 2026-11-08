// PY3 Python Backend: Russian text. Code, solutions and expected output are in content/backend.js.
DJ.i18n.patch({
  modules: {
    'py-3': { intro: 'Следующий шаг после Python-основ и Intermediate Python: вы сами построите серверную часть и поймёте, как она устроена. Разберёте HTTP-запрос, дизайн REST, роутер, валидацию, идею ORM, аутентификацию, тесты, regex, асинхронность и деплой. В браузере нет настоящего сервера, поэтому всё делаем на чистых Python-моделях, а в конце собираете сервис сокращения URL.' }
  },
  lessons: {
    'pyb-1': {
      title: 'Как работает веб: HTTP-запрос и ответ',
      body: `
<p>Вы открываете приложение доставки на телефоне и видите список кофеен в Алматы. В этот момент телефон (<b>client</b>) по интернету отправляет запрос удалённому компьютеру (<b>server</b>), а сервер возвращает ответ. Backend-разработчик пишет именно серверную часть: принимает запрос, получает данные из базы и собирает ответ.</p>
<p>На занятии по REST в курсе Software Eng вы видели методы и таблицу status code. Теперь спустимся на уровень ниже: HTTP-запрос на самом деле является <b>обычным текстом</b>, и его можно разобрать самим.</p>
<h3>Путь одного запроса</h3>
<ul>
<li><b>DNS</b>: имя <code>api.kofe.kz</code> превращается в IP-адрес.</li>
<li><b>TCP-соединение</b> открывается (для HTTPS поверх него включается шифрование TLS).</li>
<li>Клиент отправляет текст HTTP-запроса, а сервер возвращает текст HTTP-ответа.</li>
</ul>
<h3>Структура запроса</h3>
<pre><code>GET /cafes?city=Алматы&amp;page=2 HTTP/1.1      ← request line: метод, путь, версия
Host: api.kofe.kz                          ← headers: "Имя: значение"
Accept: application/json
User-Agent: KofeApp/3.1
                                           ← пустая строка: headers закончились
(в GET обычно нет body)</code></pre>
<p>Строки разделяются <code>\\r\\n</code> (CRLF). Между headers и body стоит <b>пустая строка</b>, то есть <code>\\r\\n\\r\\n</code>. Часть пути после знака <code>?</code> называется <b>query string</b>: <code>city=Алматы&amp;page=2</code>.</p>
<h3>Часто встречающиеся headers</h3>
<table>
<tr><th>Header</th><th>Для чего</th></tr>
<tr><td><code>Content-Type</code></td><td>формат body: <code>application/json</code>, <code>text/html</code></td></tr>
<tr><td><code>Content-Length</code></td><td>длина body в <b>байтах</b></td></tr>
<tr><td><code>Authorization</code></td><td>кто делает запрос: <code>Bearer &lt;token&gt;</code></td></tr>
<tr><td><code>Cookie</code> / <code>Set-Cookie</code></td><td>идентификатор сессии</td></tr>
<tr><td><code>Cache-Control</code></td><td>как долго ответ можно сохранять в кэше</td></tr>
</table>
<p>Имена headers не зависят от регистра: <code>content-type</code> и <code>Content-Type</code> означают одно и то же. Поэтому при разборе удобно приводить имя к нижнему регистру.</p>
<h3>Разбор запроса в Python</h3>
<pre><code>raw = "POST /orders HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nContent-Type: application/json\\r\\n\\r\\n{\\"drink\\": \\"latte\\"}"
head, body = raw.split("\\r\\n\\r\\n", 1)
lines = head.split("\\r\\n")
method, path, version = lines[0].split(" ")
headers = {}
for line in lines[1:]:
    name, value = line.split(":", 1)
    headers[name.strip().lower()] = value.strip()
print(method, path, headers["content-type"], body)</code></pre>
<p>Ответ устроен так же: в первой строке стоит <code>HTTP/1.1 201 Created</code>, затем headers, пустая строка и body. Группа ответа определяется по первой цифре status code: 1xx — информация, 2xx — успех, 3xx — перенаправление (redirect), 4xx — ошибка клиента, 5xx — ошибка сервера.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Вызов <code>split(":")</code> без ограничения: в <code>Host: localhost:8000</code> есть ещё одно двоеточие. Пишите <code>split(":", 1)</code>.</li>
<li>Подсчёт <code>Content-Length</code> по количеству символов: «Алматы» — 6 символов, но в UTF-8 это 12 байт.</li>
<li>Поиск конца body по <code>"\\n\\n"</code>: в HTTP разделитель — <code>"\\r\\n\\r\\n"</code>.</li>
</ul>
<p>Обработка одного запроса на сервере всегда состоит из трёх шагов: разбор текста (parse), выполнение бизнес-логики и сборка текста ответа. В этом модуле мы напишем каждый шаг отдельной функцией, а в конце соберём их в один сервис.</p>
<div class="tip">Фреймворки вроде Flask, FastAPI и Django делают этот разбор за вас и отдают готовый объект <code>request</code>. Но когда возникает ошибка (например, 400 Bad Request), полезно понимать, что происходит внутри.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>parse_request(raw)</code>. Она должна вернуть словарь: <code>method</code>, <code>path</code> (без query), <code>query</code> (словарь пар <code>k=v</code> после <code>?</code>; если их нет, то <code>{}</code>), <code>headers</code> (имена в нижнем регистре, значения очищены через <code>strip</code>) и <code>body</code> (строка, или <code>""</code>, если тела нет).', hints: ['Сначала разделите <code>raw</code> на head и body через <code>raw.partition("\\r\\n\\r\\n")</code>.', 'Строку заголовка разбейте через <code>line.split(":", 1)</code>, потому что в значении тоже может быть двоеточие.'], check: { tests: `_raw = "POST /orders?city=Shymkent&size=L HTTP/1.1\\r\\nHost: localhost:8000\\r\\nContent-Type:  application/json \\r\\n\\r\\n{\\"drink\\": \\"latte\\"}"
_r = parse_request(_raw)
assert _r.get("method") == "POST", "method: первое слово первой строки"
assert _r.get("path") == "/orders", "path должен быть без query: /orders"
assert _r.get("query") == {"city": "Shymkent", "size": "L"}, "query: пары k=v после ?"
assert _r.get("headers") == {"host": "localhost:8000", "content-type": "application/json"}, "headers: имена в нижнем регистре, значения очищены, двоеточие порта сохранено"
assert _r.get("body") == '{"drink": "latte"}', "body: текст после пустой строки"
_g = parse_request("GET /cafes HTTP/1.1\\r\\nAccept: */*\\r\\n\\r\\n")
assert _g["query"] == {} and _g["body"] == "" and _g["path"] == "/cafes", "Если query и body нет: {} и пустая строка"
` } },
        { prompt: 'Напишите функцию <code>status_group(code)</code>: 100–199 → <code>"info"</code>, 200–299 → <code>"success"</code>, 300–399 → <code>"redirect"</code>, 400–499 → <code>"client_error"</code>, 500–599 → <code>"server_error"</code>, любое другое число → <code>ValueError</code>. Затем заполните словарь <code>REASONS</code>: для кодов 200, 201, 204, 301, 400, 401, 403, 404 и 500 запишите стандартные названия (<code>"OK"</code>, <code>"Created"</code>, <code>"No Content"</code>, <code>"Moved Permanently"</code>, <code>"Bad Request"</code>, <code>"Unauthorized"</code>, <code>"Forbidden"</code>, <code>"Not Found"</code>, <code>"Internal Server Error"</code>).', hints: ['Номер группы: <code>code // 100</code>.', 'Проверка диапазона: <code>if not 100 &lt;= code &lt;= 599: raise ValueError(...)</code>'], check: { tests: `assert status_group(204) == "success", "204 относится к группе success"
assert status_group(302) == "redirect", "3xx: redirect"
assert status_group(422) == "client_error", "4xx: ошибка клиента"
assert status_group(503) == "server_error", "5xx: ошибка сервера"
assert status_group(101) == "info", "1xx: info"
try:
    status_group(42)
    assert False, "Для 42 должна выбрасываться ValueError"
except ValueError:
    pass
assert REASONS.get(404) == "Not Found" and REASONS.get(201) == "Created" and REASONS.get(403) == "Forbidden", "REASONS: названия для 404, 201 и 403"
assert len(REASONS) == 9 and REASONS.get(204) == "No Content" and REASONS.get(500) == "Internal Server Error", "В REASONS должно быть девять кодов"
` } },
        { prompt: 'Напишите функцию <code>build_response(status, data)</code>. Она должна возвращать текст HTTP-ответа: <code>"HTTP/1.1 &lt;status&gt; &lt;reason&gt;\\r\\nContent-Type: application/json\\r\\nContent-Length: &lt;N&gt;\\r\\n\\r\\n&lt;body&gt;"</code>. Body: <code>json.dumps(data, ensure_ascii=False)</code>. <code>N</code> — количество <b>байтов</b> body в UTF-8. Причину (reason) возьмите из словаря <code>REASONS</code>.', hints: ['Количество байтов: <code>len(body.encode("utf-8"))</code>, а <code>len(body)</code> даёт количество символов.'], check: { tests: `_r = build_response(201, {"city": "Алматы"})
_head, _body = _r.split("\\r\\n\\r\\n", 1)
assert _head.split("\\r\\n")[0] == "HTTP/1.1 201 Created", "Первая строка: HTTP/1.1 201 Created"
assert "Content-Type: application/json" in _head.split("\\r\\n"), "Нужен заголовок Content-Type"
assert "Content-Length: 24" in _head.split("\\r\\n"), "Content-Length в байтах: кириллица в UTF-8 занимает 2 байта, поэтому тело 24 байта"
assert _body == '{"city": "Алматы"}', "Body: json.dumps(data, ensure_ascii=False)"
assert build_response(404, {}).startswith("HTTP/1.1 404 Not Found\\r\\n"), "Для 404 причина: Not Found"
` } },
        { prompt: 'В каком месте заканчивается блок headers в HTTP-запросе?', options: ['На первом <code>\\r\\n</code>', 'На пустой строке, то есть на <code>\\r\\n\\r\\n</code>', 'После header <code>Content-Length</code>', 'На первом символе <code>{</code> в body'], explain: 'Каждый header стоит в отдельной строке, а между headers и body есть пустая строка: <code>\\r\\n\\r\\n</code>. Content-Length говорит, где заканчивается body.' }
      ]
    },
    'pyb-2': {
      title: 'Отладка и стиль кода: traceback, PEP 8, docstring',
      body: `
<p>Большая часть работы с backend-кодом уходит на поиск ответа на вопрос «почему это не работает?». Умение быстро находить ошибку так же важно, как знание нового синтаксиса. А чистый стиль помогает, чтобы ошибок было меньше.</p>
<h3>Читаем traceback снизу вверх</h3>
<pre><code>Traceback (most recent call last):
  File "app.py", line 14, in &lt;module&gt;
    print(order_total(cart))
  File "app.py", line 9, in order_total
    total += item["price"] * item["qty"]
KeyError: 'qty'</code></pre>
<ul>
<li><b>Самая нижняя строка</b>: тип ошибки и её причина. Здесь <code>KeyError: 'qty'</code>, то есть в одном из товаров нет ключа <code>qty</code>.</li>
<li>Выше: в какой <b>строке</b> произошла ошибка (<code>line 9, in order_total</code>).</li>
<li>Ещё выше: кто вызвал эту функцию. Эта цепочка называется «стек вызовов» (call stack).</li>
</ul>
<p>Часто встречающиеся типы: <code>TypeError</code> (несовместимые типы, например <code>"#" + 5</code>), <code>KeyError</code>, <code>IndexError</code>, <code>AttributeError</code> (у объекта <code>None</code> нет такого метода), <code>ZeroDivisionError</code>.</p>
<h3>print и breakpoint</h3>
<p>Самый простой способ: поставить <code>print(f"{item=}")</code> в подозрительном месте. Знак <code>=</code> выведет и имя переменной: <code>item={'name': 'latte'}</code>. В более сложном случае пишут <code>breakpoint()</code>: программа остановится в этом месте и откроется отладчик <code>pdb</code>.</p>
<table>
<tr><th>Команда pdb</th><th>Что делает</th></tr>
<tr><td><code>p x</code></td><td>показать значение переменной</td></tr>
<tr><td><code>n</code></td><td>следующая строка (next)</td></tr>
<tr><td><code>s</code></td><td>войти внутрь функции (step)</td></tr>
<tr><td><code>c</code></td><td>продолжить до следующей остановки</td></tr>
<tr><td><code>l</code></td><td>показать код вокруг текущей строки</td></tr>
</table>
<p>В Python в браузере нет интерактивного отладчика, поэтому здесь используем <code>print</code>. В VS Code и PyCharm можно поставить точку остановки рядом с номером строки и сделать то же самое мышкой.</p>
<h3>PEP 8: общий стиль</h3>
<pre><code>MAX_ITEMS = 50                      # константа: UPPER_CASE

class OrderService:                 # класс: CamelCase
    def total_price(self, items):   # функция, переменная: snake_case
        """Возвращает общую стоимость товаров в тенге."""
        return sum(i["price"] * i["qty"] for i in items)</code></pre>
<ul>
<li>Отступ: 4 пробела, а не табуляция. Длина строки примерно 79–99 символов.</li>
<li>Пробелы вокруг операторов: <code>x = a + b</code>, но внутри <code>f(a=1)</code> пробелов нет.</li>
<li><code>import</code> пишется в начале файла. Имена должны быть понятными: не <code>d</code>, а <code>delivery_fee</code>.</li>
</ul>
<h3>Docstring</h3>
<p>Тройные кавычки в первой строке функции называются <b>docstring</b>. Его можно прочитать через <code>func.__doc__</code> или <code>help(func)</code>. Хороший docstring говорит, что делает функция, какие у неё параметры, что она возвращает и какие ошибки может выбросить.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Прочитать только верхнюю строку traceback и пропустить настоящую причину (самую нижнюю).</li>
<li>Указать <code>[]</code> как значение по умолчанию: тогда список будет общим для всех вызовов.</li>
<li>Оставить отладочные <code>print</code> в коде. В production используйте <code>logging</code> (мы проходили его в курсе Software Eng).</li>
</ul>
<div class="tip">Прежде чем исправлять ошибку, найдите самый маленький пример, который её <b>воспроизводит</b>. Если пример сокращается до 3 строк, причина обычно становится видна сама.</div>`,
      ex: [
        { prompt: 'В функции кассы <code>average_bill(bills)</code> две ошибки: первый чек не учитывается, а на пустом списке возникает <code>ZeroDivisionError</code>. Исправьте функцию: среднее значение должно округляться через <code>round(..., 1)</code>, а для пустого списка функция должна возвращать <code>0</code>.', hints: ['<code>range(1, ...)</code> пропускает нулевой индекс.', 'В начале функции: <code>if not bills: return 0</code>'], check: { tests: `assert average_bill([1200, 1800, 2400]) == 1800.0, "Все чеки должны учитываться: (1200+1800+2400)/3 = 1800.0"
assert average_bill([1500]) == 1500.0, "Если чек один, среднее равно этому чеку"
assert average_bill([]) == 0, "Для пустого списка верните 0"
` } },
        { prompt: 'В двух функциях есть ошибки. <code>order_label(order_id)</code> должна возвращать строку вида <code>"Тапсырыс #17"</code> («Тапсырыс» — это «заказ» на казахском), но выдаёт <code>TypeError</code>. <code>add_tag(tag, tags=[])</code> должна возвращать новый список при каждом вызове, но теги накапливаются между вызовами. Исправьте обе функции.', hints: ['Соедините строку и число через f-string.', 'Сделайте значением по умолчанию <code>None</code> и внутри функции создавайте новый список.'], check: { tests: `assert order_label(17) == "Тапсырыс #17", "order_label(17) должна возвращать 'Тапсырыс #17'"
assert add_tag("vegan") == ["vegan"], "Первый вызов: ['vegan']"
assert add_tag("hot") == ["hot"], "Второй вызов не должен видеть предыдущий тег: ['hot']"
assert add_tag("x", ["a"]) == ["a", "x"], "Тег должен добавляться в переданный список"
` } },
        { prompt: 'Напишите функцию <code>delivery_fee(distance_km, express=False)</code> с docstring по правилам PEP 8. Правило: до 3 км — 500 ₸, за каждый дополнительный полный или неполный километр — 150 ₸ (<code>math.ceil</code>). Если <code>express=True</code>, к цене добавляется 700 ₸. В docstring должно быть слово <code>km</code>. При отрицательном расстоянии выбросьте <code>ValueError</code>.', hints: ['Первой строкой внутри функции напишите <code>"""..."""</code>.', 'Дополнительные километры: <code>max(0, math.ceil(distance_km - 3))</code>'], check: { tests: `assert "delivery_fee" in dir(), "Имя функции в стиле snake_case: delivery_fee"
assert delivery_fee.__doc__ and "km" in delivery_fee.__doc__, "Нужен docstring, и в нём должно быть слово km"
assert delivery_fee(2) == 500, "До 3 км — 500"
assert delivery_fee(4.2) == 800, "4.2 км: 500 + 2*150 = 800"
assert delivery_fee(3, express=True) == 1200, "express: +700"
try:
    delivery_fee(-1)
    assert False, "При отрицательном расстоянии нужен ValueError"
except ValueError:
    pass
` } },
        { prompt: 'Последняя строка traceback: <code>AttributeError: \'NoneType\' object has no attribute \'get\'</code>. Какова наиболее вероятная причина?', options: ['В словаре нет нужного ключа', 'Переменная должна была быть словарём, но оказалась <code>None</code>, например функция завершилась без <code>return</code>', 'Версия Python устарела', 'Метод <code>get</code> есть только у списков'], explain: 'У <code>None</code> нет метода <code>.get</code>. Обычно это значит, что функция ничего не вернула (забыли <code>return</code>) или поиск ничего не нашёл, и переменная стала <code>None</code>. По traceback найдите, откуда пришло значение этой переменной.' }
      ]
    },
    'pyb-3': {
      title: 'REST API: дизайн ресурсов, CRUD, пагинация',
      body: `
<p>Увидев хороший API один раз, разработчик может предсказать остальные endpoint-ы. В этом и смысл REST-дизайна: всё является <b>ресурсом</b> (существительным), а действие задаёт HTTP-метод.</p>
<h3>Названия</h3>
<ul>
<li>Ресурс называется во множественном числе, существительным: <code>/products</code>, <code>/orders</code>. Не <code>/getProducts</code> и не <code>/createOrder</code>.</li>
<li>Один объект: <code>/products/42</code>. Вложенный ресурс: <code>/shops/3/orders</code> (заказы магазина 3).</li>
<li>Строчные буквы, слова через дефис: <code>/gift-cards</code>. Версия ставится перед ресурсом: <code>/v1/products</code>.</li>
<li>Фильтры и сортировка идут в query string: <code>/products?city=Алматы&amp;sort=-price</code>.</li>
</ul>
<h3>CRUD и методы</h3>
<table>
<tr><th>Действие</th><th>Запрос</th><th>Успешный ответ</th></tr>
<tr><td>Список</td><td><code>GET /products</code></td><td>200 + список</td></tr>
<tr><td>Создание</td><td><code>POST /products</code></td><td>201 + новый объект (и header <code>Location</code>)</td></tr>
<tr><td>Чтение одного</td><td><code>GET /products/42</code></td><td>200 или 404</td></tr>
<tr><td>Полная замена</td><td><code>PUT /products/42</code></td><td>200</td></tr>
<tr><td>Частичное изменение</td><td><code>PATCH /products/42</code></td><td>200</td></tr>
<tr><td>Удаление</td><td><code>DELETE /products/42</code></td><td>204, без body</td></tr>
</table>
<h3>JSON payload</h3>
<pre><code>POST /v1/orders
{"cafe_id": 7, "items": [{"drink": "latte", "qty": 2}], "pickup": "12:30"}

201 Created
Location: /v1/orders/1051
{"id": 1051, "status": "new", "total": 3200}</code></pre>
<p>Ключи должны быть в одном стиле (обычно <code>snake_case</code> или <code>camelCase</code>, не смешивайте их). Дата и время — в формате ISO: <code>"2026-03-21T12:30:00+05:00"</code>. Деньги храните целым числом (в тиынах или в тенге), а не в float.</p>
<h3>Идемпотентность</h3>
<p>Представьте, что мобильный интернет оборвался и клиент отправил один и тот же запрос повторно. <code>PUT</code> и <code>DELETE</code> идемпотентны: повтор не меняет результат. Если повторить <code>POST</code>, могут создаться два заказа, и деньги могут списаться дважды. Поэтому платёжные API требуют header <code>Idempotency-Key</code>: сервер запоминает ключ и при повторном запросе возвращает прежний ответ.</p>
<h3>Пагинация</h3>
<p>Отдавать 10 000 товаров одним ответом медленно. Есть два подхода:</p>
<ul>
<li><b>Page/offset</b>: <code>?page=2&amp;per_page=20</code>. Просто, но если список меняется, элементы могут повториться или пропасть.</li>
<li><b>Cursor</b>: <code>?after=1050&amp;limit=20</code>, то есть «20 элементов после id 1050». Подходит для больших и часто меняющихся списков, потому что результат стабилен.</li>
</ul>
<pre><code>def page_of(items, page, per_page):
    start = (page - 1) * per_page
    return items[start:start + per_page]</code></pre>
<h3>Формат ошибки</h3>
<p>Даже при ошибке ответ должен иметь одинаковую форму, тогда клиент сможет обработать её в одном месте. Например: <code>{"error": {"code": "not_found", "message": "Товар не найден"}}</code>. Status code называет общую категорию, а поле <code>code</code> называет конкретную причину. В следующих уроках роутер и валидация будут возвращать именно такой формат.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Писать глаголы в URL (<code>/deleteUser/5</code>) или делать всё через <code>POST</code>.</li>
<li>Возвращать 200 при ошибке и класть в body <code>{"error": ...}</code>. Клиент полагается на status code.</li>
<li>Список без пагинации: сегодня 50 записей, а через год — 500 000.</li>
</ul>
<div class="tip">Прежде чем писать API, выпишите таблицу endpoint-ов (метод, путь, запрос, ответ, коды) на одной странице. Это самый дешёвый способ договориться с фронтенд-разработчиком.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>crud_routes(resource)</code>. Она должна вернуть словарь <code>(method, path) → action</code>. Для <code>crud_routes("products")</code>: <code>("GET", "/products")</code> → <code>"list"</code>, <code>("POST", "/products")</code> → <code>"create"</code>, <code>("GET", "/products/&lt;id&gt;")</code> → <code>"retrieve"</code>, <code>PUT</code> → <code>"replace"</code>, <code>PATCH</code> → <code>"update"</code>, <code>DELETE</code> → <code>"delete"</code> (последние три — для пути <code>/products/&lt;id&gt;</code>).', hints: ['Путей два: коллекция <code>"/" + resource</code> и объект <code>"/" + resource + "/&lt;id&gt;"</code>.'], check: { tests: `_r = crud_routes("products")
assert len(_r) == 6, "Должно быть шесть маршрутов"
assert _r.get(("GET", "/products")) == "list" and _r.get(("POST", "/products")) == "create", "Коллекция: GET → list, POST → create"
assert _r.get(("GET", "/products/<id>")) == "retrieve", "GET /products/<id> → retrieve"
assert _r.get(("PUT", "/products/<id>")) == "replace" and _r.get(("PATCH", "/products/<id>")) == "update", "PUT → replace, PATCH → update"
assert _r.get(("DELETE", "/products/<id>")) == "delete", "DELETE /products/<id> → delete"
assert ("POST", "/cafes") in crud_routes("cafes"), "Функция должна работать с любым именем ресурса"
` } },
        { prompt: 'Напишите функцию <code>paginate(items, page=1, per_page=10)</code>. Она должна вернуть словарь: <code>items</code> (элементы этой страницы), <code>page</code>, <code>per_page</code>, <code>total</code> (общее количество элементов), <code>pages</code> (количество страниц; для пустого списка 0), <code>has_next</code> (есть ли следующая страница). Если <code>page &lt; 1</code> или <code>per_page</code> вне диапазона 1–100, выбросьте <code>ValueError</code>.', hints: ['Количество страниц: <code>math.ceil(total / per_page)</code>.', 'Срез: <code>items[(page - 1) * per_page : page * per_page]</code>'], check: { tests: `_cafes = [f"cafe-{i}" for i in range(1, 24)]
_p = paginate(_cafes, page=3, per_page=10)
assert _p["items"] == ["cafe-21", "cafe-22", "cafe-23"], "Страница 3: последние три элемента"
assert _p["total"] == 23 and _p["pages"] == 3, "total=23, pages=3"
assert _p["has_next"] is False, "На последней странице has_next False"
_p1 = paginate(_cafes, page=1, per_page=10)
assert _p1["has_next"] is True and len(_p1["items"]) == 10 and _p1["page"] == 1 and _p1["per_page"] == 10, "Страница 1: 10 элементов, has_next True"
assert paginate([], 1, 10)["pages"] == 0, "В пустом списке pages = 0"
assert paginate(_cafes, page=5, per_page=10)["items"] == [], "За пределами страниц — пустой список"
for _bad in [(0, 10), (1, 0), (1, 101)]:
    try:
        paginate(_cafes, *_bad)
        assert False, "При неверных параметрах нужен ValueError"
    except ValueError:
        pass
` } },
        { prompt: 'Cursor-пагинация. Список <code>items</code> состоит из словарей, отсортированных по <code>id</code> по возрастанию. Функция <code>after_cursor(items, after=None, limit=3)</code> должна взять первые <code>limit</code> элементов, у которых <code>id &gt; after</code> (если <code>after=None</code>, то с начала). Результат: <code>{"items": [...], "next": &lt;id последнего элемента или None&gt;}</code>. Значение <code>next</code> будет id только в том случае, если после них есть ещё элементы.', hints: ['Сначала отфильтруйте элементы с <code>id &gt; after</code>, затем возьмите <code>[:limit]</code>.', '<code>next</code> заполняется, только если отфильтрованный список длиннее <code>limit</code>.'], check: { tests: `_orders = [{"id": i, "total": i * 100} for i in [3, 5, 8, 9, 12, 15, 20]]
_a = after_cursor(_orders, limit=3)
assert [o["id"] for o in _a["items"]] == [3, 5, 8], "Первые три с начала"
assert _a["next"] == 8, "next = id последнего возвращённого элемента (8)"
_b = after_cursor(_orders, after=_a["next"], limit=3)
assert [o["id"] for o in _b["items"]] == [9, 12, 15] and _b["next"] == 15, "after=8: 9, 12, 15 и next=15"
_c = after_cursor(_orders, after=15, limit=3)
assert [o["id"] for o in _c["items"]] == [20] and _c["next"] is None, "Последняя страница: next None"
assert after_cursor(_orders, after=12, limit=3)["next"] is None, "Если элементов ровно limit и больше нет, next None"
` } },
        { prompt: 'Клиент отправил <code>POST /v1/payments</code>, но связь оборвалась до получения ответа. Какое решение лучше всего защищает от двойного списания?', options: ['Использовать GET вместо POST', 'Клиент отправляет для каждого платежа уникальный header <code>Idempotency-Key</code>, а сервер на повторный ключ возвращает прежний ответ', 'Сервер возвращает 500', 'Клиент никогда не повторяет запрос'], explain: 'POST не идемпотентен. Idempotency-Key позволяет серверу понять, что это тот же самый запрос. GET не должен менять данные, поэтому для оплаты он не подходит.' }
      ]
    },
    'pyb-4': {
      title: 'Роутинг: пишем свой роутер с декоратором',
      body: `
<p>Сервер уже разобрал запрос: <code>GET /users/42</code>. Какая функция должна ответить на него? На этот вопрос отвечает <b>router</b> (роутер). Во Flask это выглядит так:</p>
<pre><code>@app.route("/users/&lt;id&gt;", methods=["GET"])
def get_user(id):
    ...</code></pre>
<p>В курсе Intermediate Python вы видели, что декоратор принимает функцию и возвращает функцию. <code>app.route(...)</code> — это декоратор с параметрами: сначала он вызывается сам и возвращает настоящий декоратор, а тот регистрирует функцию в таблице маршрутов и возвращает её <b>без изменений</b>.</p>
<h3>Сопоставление path с шаблоном</h3>
<p>Разбиваем шаблон и path на части по <code>/</code>. Количество частей должно совпадать. Часть вида <code>&lt;id&gt;</code> принимает любое значение и сохраняет его как параметр, остальные части должны совпасть точно.</p>
<pre><code>def match(pattern, path):
    p_parts = pattern.strip("/").split("/")
    parts = path.strip("/").split("/")
    if len(p_parts) != len(parts):
        return None
    params = {}
    for p, v in zip(p_parts, parts):
        if p.startswith("&lt;") and p.endswith("&gt;"):
            params[p[1:-1]] = v
        elif p != v:
            return None
    return params

match("/users/&lt;id&gt;", "/users/42")        # {'id': '42'}
match("/users/&lt;id&gt;", "/users/42/orders") # None</code></pre>
<h3>Простой класс App</h3>
<pre><code>class App:
    def __init__(self):
        self.routes = []            # (шаблон, методы, handler)

    def route(self, pattern, methods=("GET",)):
        def decorator(func):
            self.routes.append((pattern, set(methods), func))
            return func
        return decorator

    def handle(self, method, path):
        path_found = False
        for pattern, methods, func in self.routes:
            params = match(pattern, path)
            if params is None:
                continue
            path_found = True
            if method in methods:
                return func(**params)
        if path_found:
            return 405, {"error": "method not allowed"}
        return 404, {"error": "not found"}

app = App()

@app.route("/cafes/&lt;cafe_id&gt;/menu")
def menu(cafe_id):
    return 200, {"cafe": cafe_id, "drinks": ["latte", "americano"]}

app.handle("GET", "/cafes/7/menu")    # (200, {...})
app.handle("POST", "/cafes/7/menu")   # (405, ...)
app.handle("GET", "/bus/12")          # (404, ...)</code></pre>
<p>Наши handler-ы возвращают пару <code>(status, body)</code>. В настоящем фреймворке то же самое: объект ответа состоит из status, headers и body.</p>
<h3>Разница между 404 и 405</h3>
<p><b>404</b>: такого пути вообще нет. <b>405</b>: путь есть, но этот метод не разрешён, например <code>POST</code> на меню, которое доступно только для чтения. Правильный сервер при ответе 405 добавляет header <code>Allow: GET</code>.</p>
<h3>Преобразователи (converters)</h3>
<p>Во Flask можно написать <code>&lt;int:id&gt;</code>: часть подходит, только если состоит из цифр, и сразу приводится к <code>int</code>. Тогда <code>/users/abc</code> вернёт 404 ещё до вызова handler-а, а внутри handler-а не нужно вызывать <code>int()</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Забыть <code>return func</code> в декораторе: тогда после декорирования функция станет <code>None</code>.</li>
<li>Завершающий <code>/</code>: <code>/users/42/</code> и <code>/users/42</code> — одно и то же? Договоритесь заранее (мы делаем <code>strip("/")</code>).</li>
<li>Порядок маршрутов: если есть <code>/users/me</code> и <code>/users/&lt;id&gt;</code>, сначала регистрируйте более конкретный, иначе <code>me</code> будет принято за id.</li>
</ul>
<div class="tip">В FastAPI идея та же: <code>@app.get("/users/{user_id}")</code>, а type hint <code>user_id: int</code> выполняет роль преобразователя.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>match_path(pattern, path)</code>. Часть <code>&lt;name&gt;</code> в шаблоне принимает любое непустое значение. При совпадении верните словарь параметров (если параметров нет, то <code>{}</code>), при несовпадении — <code>None</code>. Начальный и конечный <code>/</code> не имеют значения.', hints: ['Разбейте оба значения через <code>.strip("/").split("/")</code>, количество частей должно совпадать.', 'Если часть начинается с <code>&lt;</code> и заканчивается на <code>&gt;</code>, это параметр: <code>params[p[1:-1]] = v</code>.'], check: { tests: `assert match_path("/users/<id>", "/users/42") == {"id": "42"}, "/users/<id> и /users/42 → {'id': '42'}"
assert match_path("/shops/<shop>/orders/<oid>", "/shops/almaty-1/orders/77/") == {"shop": "almaty-1", "oid": "77"}, "Два параметра, завершающий / не важен"
assert match_path("/health", "/health") == {}, "Шаблон без параметров: {}"
assert match_path("/users/<id>", "/users/42/orders") is None, "Число частей разное: None"
assert match_path("/users/<id>", "/cafes/42") is None, "Постоянная часть не совпадает: None"
` } },
        { prompt: 'Напишите класс <code>App</code>. Метод <code>route(pattern, methods=("GET",))</code> — декоратор, который регистрирует handler и возвращает функцию без изменений. Метод <code>handle(method, path)</code> вызывает подходящий handler с параметрами пути (<code>**params</code>) и возвращает его результат <code>(status, body)</code>. Если путь есть, но метода нет, верните <code>(405, {"error": "method not allowed"})</code>; если пути нет — <code>(404, {"error": "not found"})</code>. Используйте уже данную функцию <code>match_path</code>.', hints: ['В декораторе: <code>self.routes.append((pattern, set(methods), func))</code>, затем <code>return func</code>.', 'Запомните, что путь совпал, с помощью флага (<code>path_found = True</code>): так можно отличить 404 от 405.'], check: { tests: `_app = App()
@_app.route("/cafes/<cafe_id>/menu")
def _menu(cafe_id):
    return 200, {"cafe": cafe_id}
@_app.route("/orders", methods=["POST"])
def _create():
    return 201, {"id": 1}
@_app.route("/orders", methods=["GET"])
def _list():
    return 200, []
assert _menu is not None and _menu("x") == (200, {"cafe": "x"}), "Декоратор должен возвращать функцию без изменений"
assert _app.handle("GET", "/cafes/7/menu") == (200, {"cafe": "7"}), "Значение параметра пути должно передаваться в handler"
assert _app.handle("POST", "/orders") == (201, {"id": 1}), "POST /orders → create"
assert _app.handle("GET", "/orders") == (200, []), "Один путь может принимать разные методы"
assert _app.handle("DELETE", "/orders") == (405, {"error": "method not allowed"}), "Путь есть, метода нет: 405"
assert _app.handle("GET", "/buses/12") == (404, {"error": "not found"}), "Пути нет: 404"
` } },
        { prompt: 'Добавьте преобразователь. Функция <code>match_typed(pattern, path)</code> работает как <code>match_path</code>, но часть <code>&lt;int:name&gt;</code> подходит только тогда, когда состоит из цифр, и значение приводится к <code>int</code> (иначе <code>None</code>). Обычная часть <code>&lt;name&gt;</code> остаётся строкой, как раньше.', hints: ['<code>inner = p[1:-1]</code>; если <code>inner.startswith("int:")</code>, имя параметра равно <code>inner[4:]</code>.', 'Проверка цифр: <code>v.isdigit()</code>'], check: { tests: `assert match_typed("/users/<int:id>", "/users/42") == {"id": 42}, "Значение <int:id> должно быть int: 42"
assert match_typed("/users/<int:id>", "/users/abc") is None, "Нецифровое значение не подходит под <int:...>"
assert match_typed("/cities/<name>/stops/<int:n>", "/cities/Taraz/stops/5") == {"name": "Taraz", "n": 5}, "Смешанный шаблон: строка и int"
assert match_typed("/health", "/health") == {}, "Без параметров: {}"
assert match_typed("/users/<int:id>", "/users/1/2") is None, "Число частей разное: None"
` } },
        { prompt: 'В роутере зарегистрирован только <code>GET /menu</code>. Клиент отправляет <code>DELETE /menu</code>. Какой код правильный?', options: ['200', '404 Not Found', '405 Method Not Allowed', '500 Internal Server Error'], explain: 'Путь существует, но метод не разрешён: 405. Код 404 возвращается, когда путь вообще не найден.' }
      ]
    },
    'pyb-5': {
      title: 'Валидация и ошибки: 400, 422, свои исключения',
      body: `
<p>Сервер никогда не должен слепо доверять клиенту. Мобильное приложение может быть старой версии, а кто-то может отправить любой текст через <code>curl</code>. Поэтому каждые входящие данные проходят <b>валидацию</b>, а при ошибке клиент точно знает, что не так.</p>
<h3>400 или 422?</h3>
<ul>
<li><b>400 Bad Request</b>: запрос вообще нельзя прочитать. Например, JSON сломан: <code>{"name": "Дана",</code>.</li>
<li><b>422 Unprocessable Entity</b>: JSON прочитан правильно, но значения не соответствуют правилам: <code>{"age": -5}</code>.</li>
</ul>
<p>Некоторые команды используют 400 для обоих случаев. Важно другое: внутри одного API быть последовательным и возвращать ошибку с понятным телом.</p>
<h3>Тело ошибки: по полям</h3>
<pre><code>422 Unprocessable Entity
{"errors": {"email": "неверный формат email", "age": "должно быть больше 18"}}</code></pre>
<p>Лучше вернуть все ошибки сразу: пользователь исправит форму один раз, а не пять раз.</p>
<h3>dataclass: модель запроса</h3>
<p><code>dataclass</code> сам создаёт методы <code>__init__</code>, <code>__repr__</code>, <code>__eq__</code>. Это упрощённый вариант моделей Pydantic из FastAPI.</p>
<pre><code>import json
from dataclasses import dataclass, asdict

@dataclass
class SignupRequest:
    name: str
    age: int
    city: str = "Алматы"

def validate_signup(data):
    errors = {}
    name = data.get("name")
    if not isinstance(name, str) or not name.strip():
        errors["name"] = "аты міндетті"
    age = data.get("age")
    if not isinstance(age, int) or isinstance(age, bool) or age &lt; 14:
        errors["age"] = "жасы 14-тен кем емес бүтін сан"
    return errors

def signup(raw_body):
    try:
        data = json.loads(raw_body)
    except json.JSONDecodeError:
        return 400, {"error": "JSON оқылмады"}
    if not isinstance(data, dict):
        return 400, {"error": "JSON объект күтілді"}
    errors = validate_signup(data)
    if errors:
        return 422, {"errors": errors}
    req = SignupRequest(data["name"].strip(), data["age"], data.get("city", "Алматы"))
    return 201, asdict(req)</code></pre>
<p>Обратите внимание: в Python <code>isinstance(True, int)</code> возвращает <code>True</code>, потому что <code>bool</code> является потомком <code>int</code>. Поэтому <code>bool</code> проверяем отдельно.</p>
<h3>Свои классы исключений</h3>
<p>Из глубоких функций неудобно возвращать <code>(status, body)</code> и передавать его наверх. Вместо этого выбрасываем исключение и ловим его в одном месте:</p>
<pre><code>class ApiError(Exception):
    status = 500
    def __init__(self, message):
        super().__init__(message)
        self.message = message

class NotFound(ApiError):
    status = 404

class Conflict(ApiError):
    status = 409

def safe(handler):
    def wrapper(*args, **kwargs):
        try:
            return handler(*args, **kwargs)
        except ApiError as e:
            return e.status, {"error": e.message}
    return wrapper</code></pre>
<p>Теперь внутри handler-а достаточно написать <code>raise NotFound("кофехана табылмады")</code>, а декоратор <code>safe</code> превратит это в правильный ответ. Во Flask для этого есть <code>@app.errorhandler</code>, в FastAPI — <code>HTTPException</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Остановиться на первой ошибке и не сообщить о остальных.</li>
<li>Ловить всё через <code>except Exception</code> и возвращать 200: настоящие баги тогда остаются незамеченными.</li>
<li>Показывать во сообщении об ошибке внутренние данные (SQL-запросы, traceback, пароли).</li>
</ul>
<div class="tip">Проверяйте данные один раз на границе, там, где запрос приходит. Внутренние функции пусть работают с чистыми, уже проверенными данными.</div>`,
      ex: [
        { prompt: 'Функция <code>validate_order(data)</code> должна вернуть словарь ошибок (если ошибок нет, то <code>{}</code>). Правила: <code>drink</code> должен быть в <code>MENU</code>, иначе ошибка <code>"drink": "мәзірде жоқ"</code> («нет в меню»). <code>qty</code> — целое число от 1 до 10, не bool, иначе <code>"qty": "1-10 бүтін сан"</code> («целое число от 1 до 10»). <code>size</code> необязателен, но если он передан, то должен быть <code>"S"</code>, <code>"M"</code> или <code>"L"</code>, иначе <code>"size": "S, M немесе L"</code> («S, M или L»).', hints: ['Ключ может отсутствовать: используйте <code>data.get("drink")</code>.', 'Bool проверяйте отдельно: <code>isinstance(qty, bool)</code>.'], check: { tests: `assert validate_order({"drink": "latte", "qty": 2}) == {}, "В правильном заказе нет ошибок"
assert validate_order({"drink": "latte", "qty": 2, "size": "L"}) == {}, "size L корректен"
assert validate_order({"drink": "kumys", "qty": 0, "size": "XL"}) == {"drink": "мәзірде жоқ", "qty": "1-10 бүтін сан", "size": "S, M немесе L"}, "Все ошибки должны собираться вместе"
assert validate_order({}) == {"drink": "мәзірде жоқ", "qty": "1-10 бүтін сан"}, "Пустой словарь: ошибки drink и qty (size необязателен)"
assert validate_order({"drink": "raf", "qty": True}) == {"qty": "1-10 бүтін сан"}, "True — не число"
assert validate_order({"drink": "raf", "qty": "2"}) == {"qty": "1-10 бүтін сан"}, "Число в виде строки не подходит"
` } },
        { prompt: 'Напишите иерархию исключений: <code>ApiError(Exception)</code> (<code>status = 500</code>, конструктор принимает <code>message</code> и сохраняет его в <code>self.message</code>), от него наследуются <code>NotFound</code> (404) и <code>Forbidden</code> (403). Декоратор <code>safe(handler)</code> должен ловить <code>ApiError</code> и возвращать <code>(e.status, {"error": e.message})</code>, а другие исключения не ловить.', hints: ['В наследнике достаточно написать <code>status = 404</code>.', '<code>except ApiError as e:</code> ловит всех наследников.'], check: { tests: `CAFES = {1: "Kofe Bar, Астана"}
@safe
def _get_cafe(cid, role="guest"):
    if role == "banned":
        raise Forbidden("рұқсат жоқ")
    if cid not in CAFES:
        raise NotFound("кофехана табылмады")
    return 200, {"name": CAFES[cid]}
assert issubclass(NotFound, ApiError) and issubclass(Forbidden, ApiError), "NotFound и Forbidden наследуют ApiError"
assert _get_cafe(1) == (200, {"name": "Kofe Bar, Астана"}), "Без ошибки результат handler-а не меняется"
assert _get_cafe(9) == (404, {"error": "кофехана табылмады"}), "NotFound → 404"
assert _get_cafe(1, role="banned") == (403, {"error": "рұқсат жоқ"}), "Forbidden → 403"
def _boom():
    raise ApiError("boom")
assert safe(_boom)() == (500, {"error": "boom"}), "ApiError → 500"
try:
    safe(lambda: 1 / 0)()
    assert False, "ZeroDivisionError не должна перехватываться"
except ZeroDivisionError:
    pass
` } },
        { prompt: 'Напишите handler <code>create_student(raw_body)</code>. Если JSON не читается или это не объект (dict), верните <code>(400, {"error": "invalid json"})</code>. Валидация: <code>name</code> — непустая строка, <code>grade</code> — целое число от 1 до 11 (не bool). При ошибках верните <code>(422, {"errors": {...}})</code> с ключами <code>"name"</code> и <code>"grade"</code> (текст сообщения свободный). Если всё верно, создайте dataclass <code>Student</code> (<code>name: str</code>, <code>grade: int</code>, <code>city: str = "Қарағанды"</code> — «Караганда»), и верните <code>(201, asdict(student))</code>. Имя очистите через <code>strip</code>.', hints: ['<code>json.loads</code> поместите в <code>try/except json.JSONDecodeError</code>.', 'Результат: <code>Student(name.strip(), grade, data.get("city", "Қарағанды"))</code>'], check: { tests: `from dataclasses import is_dataclass
assert is_dataclass(Student), "Нужен dataclass Student"
assert create_student('{"name": " Айгерім ", "grade": 9}') == (201, {"name": "Айгерім", "grade": 9, "city": "Қарағанды"}), "Корректный запрос: 201, city по умолчанию"
assert create_student('{"name": "Ерлан", "grade": 11, "city": "Павлодар"}')[1]["city"] == "Павлодар", "Если city передан, используется он"
assert create_student('{"name": "Дана", ') == (400, {"error": "invalid json"}), "Испорченный JSON: 400"
assert create_student('[1, 2]') == (400, {"error": "invalid json"}), "JSON не объект: 400"
_s, _b = create_student('{"name": "", "grade": 12}')
assert _s == 422 and set(_b["errors"]) == {"name", "grade"}, "Обе ошибки: 422 и два ключа"
_s, _b = create_student('{"name": "Тимур", "grade": true}')
assert _s == 422 and set(_b["errors"]) == {"grade"}, "true — не номер класса"
` } },
        { prompt: 'Клиент отправил <code>{"email": "dana@mail", "age": "жиырма"}</code> («жиырма» — «двадцать»). JSON прочитан правильно, но значения не проходят проверку. Какой код самый точный?', options: ['200 OK', '400 Bad Request', '422 Unprocessable Entity', '500 Internal Server Error'], explain: 'Синтаксис JSON верный, но значения не прошли проверку — это 422. Код 400 ставят, когда запрос вообще нельзя прочитать, а 500 — это собственная ошибка сервера.' }
      ]
    },
    'pyb-6': {
      title: 'ORM: модели, repository, N+1',
      body: `
<p>В курсе SQL вы писали запросы <code>SELECT</code> и <code>INSERT</code> прямо к таблицам. В backend писать SQL-строку для каждого handler-а быстро утомляет и приводит к ошибкам. <b>ORM</b> (Object-Relational Mapping) превращает таблицу в класс, а строку — в объект: SQLAlchemy, Django ORM, Peewee.</p>
<h3>Модель = таблица, объект = строка</h3>
<pre><code># стиль Django (для понимания)
class Cafe(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    rating = models.FloatField()

Cafe.objects.filter(city="Астана").order_by("-rating")[:5]
# SELECT * FROM cafe WHERE city = 'Астана' ORDER BY rating DESC LIMIT 5</code></pre>
<p>Последняя строка превращается в SQL. Важная особенность: <code>filter</code> и <code>order_by</code> не выполняют запрос сразу, а только собирают <b>QuerySet</b>. Данные из базы берутся, только когда результат действительно нужен (цикл, <code>list()</code>, <code>len()</code>). Это называется <b>ленивым</b> вычислением (lazy).</p>
<h3>Repository в памяти</h3>
<p>Чтобы понять внутреннюю идею ORM, напишем её поверх списка. <b>Repository</b> скрывает способ хранения данных: handler вызывает <code>repo.get(5)</code>, а что под этим — SQLite, PostgreSQL или обычный словарь, ему не важно. Поэтому в тестах удобно использовать версию в памяти.</p>
<pre><code>from dataclasses import dataclass

@dataclass
class Cafe:
    name: str
    city: str
    rating: float
    id: int = None

class Repo:
    def __init__(self):
        self.rows, self.next_id = {}, 1
    def add(self, obj):
        obj.id = self.next_id
        self.rows[obj.id] = obj
        self.next_id += 1
        return obj
    def get(self, id):
        return self.rows.get(id)
    def filter(self, **kw):
        return [o for o in self.rows.values()
                if all(getattr(o, k) == v for k, v in kw.items())]

repo = Repo()
repo.add(Cafe("Kofe Bar", "Астана", 4.6))
repo.add(Cafe("Daily Cup", "Алматы", 4.8))
repo.filter(city="Алматы")    # [Cafe(name='Daily Cup', ...)]</code></pre>
<p><code>**kw</code> собирает именованные аргументы в словарь, а <code>getattr(o, "city")</code> означает то же, что <code>o.city</code>. В Django синтаксис вроде <code>rating__gte=4.5</code> разбивает ключ по <code>__</code> и получает поле и оператор.</p>
<h3>Миграции</h3>
<p>Вы добавили в модель новое поле (<code>phone</code>). Таблица в базе данных сама не меняется. <b>Migration</b> — это описание изменения схемы: файл <code>0003_add_phone.py</code> выполняет <code>ALTER TABLE cafe ADD COLUMN phone</code>. Файлы миграций хранятся в git, и все окружения (ноутбук, тесты, production) применяют их в одном порядке. Инструменты: Alembic, <code>python manage.py migrate</code>.</p>
<h3>Проблема N+1</h3>
<pre><code>orders = Order.objects.all()           # 1 запрос
for o in orders:
    print(o.customer.name)             # +1 запрос на каждый заказ!</code></pre>
<p>Если заказов 100, уйдёт 101 запрос. Даже если каждый запрос по сети занимает 2 мс, страница всё равно загрузится на 200 мс дольше. Решение: получить связанные данные <b>одним запросом</b> заранее. В SQL это <code>JOIN</code> или <code>WHERE id IN (...)</code>, в Django — <code>select_related("customer")</code> или <code>prefetch_related</code>, в SQLAlchemy — <code>joinedload</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Думать, что с ORM не нужно знать SQL: чтобы найти медленный запрос, нужно уметь читать SQL, который генерирует ORM.</li>
<li>Обращаться к связанному полю внутри цикла (N+1).</li>
<li>Менять модель без миграции: на production появится ошибка «column does not exist».</li>
</ul>
<div class="tip">В dev-окружении включите лог SQL-запросов ORM (Django: <code>connection.queries</code>, SQLAlchemy: <code>echo=True</code>). Если одна страница делает 50 запросов, значит, там есть N+1.</div>`,
      ex: [
        { prompt: 'Напишите класс <code>Repo</code>: метод <code>add(obj)</code> присваивает объекту <code>id</code>, начиная с 1, сохраняет его и возвращает объект. Метод <code>get(id)</code> возвращает объект или <code>None</code>. Метод <code>all()</code> возвращает список в порядке добавления. Метод <code>delete(id)</code> удаляет объект и возвращает <code>True</code>, а если его нет — <code>False</code>.', hints: ['Следующий id храните в счётчике <code>self.next_id</code>: удалённый id не должен выдаваться повторно.'], check: { tests: `_r = Repo()
_a = _r.add(Bus("92", "Алматы")); _b = _r.add(Bus("10", "Астана"))
assert (_a.id, _b.id) == (1, 2), "id растут с 1"
assert _r.get(2) is _b and _r.get(7) is None, "get: объект или None"
assert [x.route for x in _r.all()] == ["92", "10"], "all: порядок добавления"
assert _r.delete(1) is True and _r.delete(1) is False, "delete: первый раз True, затем False"
assert _r.add(Bus("37", "Шымкент")).id == 3, "Удалённый id не выдаётся повторно: следующий id 3"
` } },
        { prompt: 'Напишите небольшой класс <code>QuerySet</code>. Конструктор принимает список объектов. <code>filter(**kw)</code>: <code>city="Алматы"</code> — точное совпадение, <code>rating__gte=4.5</code> (≥), <code>rating__lt=4</code> (&lt;), <code>name__contains="Kofe"</code> (содержит). <code>order_by(field)</code>: <code>"-rating"</code> — по убыванию. Оба метода возвращают <b>новый</b> QuerySet (их можно вызывать цепочкой, исходный не меняется). <code>all()</code> возвращает список, <code>count()</code> — число, <code>first()</code> — первый объект или <code>None</code>.', hints: ['Разбейте ключ: <code>field, _, op = key.partition("__")</code>; если <code>op</code> пуст, это точное совпадение.', 'Сортировка: <code>sorted(self.items, key=lambda o: getattr(o, name), reverse=desc)</code>'], check: { tests: `_qs = QuerySet([Cafe("Kofe Bar", "Астана", 4.6), Cafe("Daily Cup", "Алматы", 4.8), Cafe("Kofe Lab", "Алматы", 4.1), Cafe("Bean", "Алматы", 3.7), Cafe("Steppe", "Астана", 4.9)])
assert [c.name for c in _qs.filter(city="Алматы").all()] == ["Daily Cup", "Kofe Lab", "Bean"], "filter(city=...) — точное совпадение"
assert _qs.filter(city="Алматы", rating__gte=4.1).count() == 2, "Несколько условий: city и rating__gte"
assert [c.name for c in _qs.filter(rating__lt=4).all()] == ["Bean"], "rating__lt=4"
assert [c.name for c in _qs.filter(name__contains="Kofe").order_by("-rating").all()] == ["Kofe Bar", "Kofe Lab"], "contains и сортировка по убыванию"
assert _qs.order_by("rating").first().name == "Bean", "order_by('rating') — по возрастанию"
assert _qs.filter(city="Тараз").first() is None, "Если результат пуст, first() возвращает None"
assert _qs.count() == 5, "filter не должен менять исходный QuerySet"
assert isinstance(_qs.filter(city="Астана"), QuerySet), "filter возвращает новый QuerySet"
` } },
        { prompt: 'Решите проблему N+1. <code>FakeDB</code> считает каждый вызов метода в <code>db.queries</code>. Функция <code>order_lines(db)</code> должна вернуть для каждого заказа список <code>(order_id, customer_name)</code> (порядок заказов сохраняется), но всего должно быть не больше <b>2 запросов</b>: <code>get_orders()</code> и <code>get_customers(ids)</code>.', hints: ['Сначала соберите все <code>customer_id</code> и вызовите <code>get_customers</code> один раз.'], check: { tests: `_cust = {1: {"name": "Әли"}, 2: {"name": "Сая"}, 3: {"name": "Мадина"}}
_ords = [{"id": 100 + i, "customer_id": (i % 3) + 1} for i in range(30)]
_db = FakeDB(_ords, _cust)
_res = order_lines(_db)
assert _res[:4] == [(100, "Әли"), (101, "Сая"), (102, "Мадина"), (103, "Әли")], "Результат: (order_id, customer_name), порядок заказов сохранён"
assert len(_res) == 30, "Нужны все 30 заказов"
assert _db.queries <= 2, "N+1: на 30 заказов не должно уходить больше 2 запросов"
` } },
        { prompt: 'В модель добавили поле <code>phone</code>, но migration не создали и выкатили код в production. Что произойдёт?', options: ['ORM сам изменит таблицу', 'В базе данных такого столбца нет, поэтому при обращении возникает ошибка (например, «column does not exist»)', 'Ничего не произойдёт', 'Все старые данные удалятся'], explain: 'Класс модели находится в коде, а таблица — в базе данных. Migration связывает их. Без неё ORM запрашивает несуществующий столбец и получает ошибку.' }
      ]
    },
    'pyb-7': {
      title: 'Аутентификация и права доступа: hash, token, роли',
      body: `
<p>Различайте два вопроса. <b>Authentication</b>: кто ты? (логин и пароль). <b>Authorization</b>: что тебе можно делать? (бариста видит заказ, но не может менять цены в меню). Если не пройдена первая проверка, это <b>401</b>; если не пройдена вторая, это <b>403</b>.</p>
<h3>Никогда не храните пароль открытым текстом</h3>
<p>Если база данных утечёт, открытые пароли сразу начнут использовать на других сайтах. Поэтому храним <b>hash</b>. Но просто <code>sha256(password)</code> недостаточно:</p>
<ul>
<li>Одинаковый пароль даёт одинаковый hash, поэтому его быстро находят по готовым таблицам (rainbow table). Решение: у каждого пользователя свой случайный <b>salt</b> (<code>os.urandom(16)</code>).</li>
<li>SHA-256 очень быстрый: видеокарта проверяет миллиарды вариантов в секунду. Решение: повторять хеширование тысячи раз (<b>key stretching</b>).</li>
</ul>
<pre><code>import hashlib, hmac, os

salt = os.urandom(16)
stored = hashlib.pbkdf2_hmac("sha256", b"qwerty123", salt, 600_000)

def check(password, salt, stored):
    candidate = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 600_000)
    return hmac.compare_digest(candidate, stored)</code></pre>
<p><b>PBKDF2</b> многократно вычисляет HMAC и объединяет результаты через XOR. <code>hmac.compare_digest</code> сравнивает значения за постоянное время, поэтому злоумышленник не может угадывать символы по времени ответа. В production также широко используются библиотеки bcrypt и Argon2. В Python в браузере нет <code>pbkdf2_hmac</code>, поэтому в задании вы напишете алгоритм сами через <code>hmac</code>: это лучший способ понять, как он работает.</p>
<h3>Session или token</h3>
<table>
<tr><th></th><th>Session</th><th>Token (например, JWT)</th></tr>
<tr><td>Сервер ничего не хранит</td><td>таблица <code>session_id → user</code></td><td>ничего: token подписан сам</td></tr>
<tr><td>Что отправляет клиент</td><td><code>Cookie: sid=...</code></td><td><code>Authorization: Bearer ...</code></td></tr>
<tr><td>Выход (logout)</td><td>достаточно удалить запись</td><td>сложно: нужно ждать окончания срока или вести чёрный список</td></tr>
<tr><td>Где удобнее</td><td>классический сайт</td><td>мобильное приложение, микросервисы</td></tr>
</table>
<h3>Подписанный token</h3>
<pre><code>import base64, json
payload = {"user": 7, "role": "barista", "exp": 1767225600}
body = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
sig = hmac.new(b"server-secret", body.encode(), hashlib.sha256).hexdigest()
token = body + "." + sig</code></pre>
<p>Token может прочитать любой (base64 — это не шифрование!), но <b>изменить его нельзя</b>: если заменить <code>role</code> на <code>admin</code>, подпись перестанет совпадать. Поэтому в token не кладут секретные данные, а срок действия ограничивают полем <code>exp</code>. JWT устроен именно так и состоит из трёх частей: header, payload и signature.</p>
<h3>Роли и права</h3>
<pre><code>ROLES = {"barista": {"orders:read"}, "manager": {"orders:read", "menu:edit"}}
def can(user, perm):
    return perm in ROLES.get(user["role"], set())</code></pre>
<p>Вместо того чтобы писать <code>if role == "manager"</code>, проверяйте название права: при добавлении новой роли код менять не придётся.</p>
<h3>OAuth 2.0 (только идея)</h3>
<p>Кнопка «Войти через Google» использует поток OAuth 2.0 <b>authorization code</b>:</p>
<ul>
<li>Сайт отправляет пользователя на страницу входа Google и показывает, какие разрешения (<b>scope</b>: email, profile) он запрашивает.</li>
<li>Пользователь даёт согласие, и Google возвращает сайту короткоживущий <b>code</b>.</li>
<li>Сервер сайта обменивает code на <b>access token</b> (иногда и на refresh token) с помощью своего секретного ключа.</li>
<li>Через access token сервер получает email пользователя из API Google.</li>
</ul>
<p>Главный итог: сайт никогда не видит пароль пользователя от Google.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Сравнивать hash через <code>==</code>, хранить его без salt или использовать быстрый hash.</li>
<li>Записать секретный ключ в код и отправить в git (храните его в переменной окружения, урок 11).</li>
<li>Доверять payload токена без проверки подписи.</li>
</ul>
<div class="tip">Не придумывайте аутентификацию сами: в production используйте проверенные библиотеки. Цель этого урока — понять, что они делают внутри.</div>`,
      ex: [
        { prompt: 'Напишите алгоритм PBKDF2-HMAC-SHA256 (один блок по 32 байта): <code>pbkdf2_sha256(password, salt, iterations)</code> возвращает hex-строку. Шаги: <code>U = HMAC(password, salt + b"\\x00\\x00\\x00\\x01")</code>, результат <code>T = U</code>; затем <code>iterations - 1</code> раз: <code>U = HMAC(password, U)</code>, <code>T = T XOR U</code> (побайтно). HMAC: <code>hmac.new(password.encode(), msg, hashlib.sha256).digest()</code>. Затем функция <code>verify_password(password, salt, iterations, stored_hex)</code> должна сравнить значения через <code>hmac.compare_digest</code>.', hints: ['Для XOR используйте <code>t = bytearray(u)</code>, затем в цикле <code>t[i] ^= u[i]</code>.', 'В конце верните <code>bytes(t).hex()</code>.'], check: { tests: `assert pbkdf2_sha256("a", b"s", 1) == "4f5b39c97eaa4ecb0904d5f9ad05f7c02fc72ffc386f1bdd3c6f53d19944e258", "1 итерация: HMAC(password, salt + 00000001)"
assert pbkdf2_sha256("Сәлем2026", b"nmb", 5) == "19f4f0a49306f0eb5c1044c62eb6c48e2ea8ca5278348439d787d82551b4a0f8", "5 итераций: объедините результаты через XOR"
_h = pbkdf2_sha256("qwerty123", b"almaty-salt", 1000)
assert _h == "93bd40730f33dae177cb66c44b7325b2a9b43c807fc0000c21539497ed80f645", "Результат для 1000 итераций должен совпадать с hashlib.pbkdf2_hmac"
assert verify_password("qwerty123", b"almaty-salt", 1000, _h) is True, "Верный пароль: True"
assert verify_password("qwerty124", b"almaty-salt", 1000, _h) is False, "Неверный пароль: False"
assert pbkdf2_sha256("qwerty123", b"other-salt", 3) != pbkdf2_sha256("qwerty123", b"almaty-salt", 3), "Другой salt даёт другой hash"
` } },
        { prompt: 'Напишите подписанный token. <code>make_token(payload, secret)</code>: <code>body</code> — результат <code>base64.urlsafe_b64encode</code> от строки <code>json.dumps(payload, sort_keys=True)</code> без завершающих символов <code>=</code>; <code>sig</code> = <code>hmac.new(secret.encode(), body.encode(), hashlib.sha256).hexdigest()</code>; результат — <code>body + "." + sig</code>. Функция <code>read_token(token, secret, now)</code> возвращает <code>None</code>, если подпись неверна, формат испорчен или <code>payload["exp"] &lt;= now</code>; иначе возвращает словарь payload.', hints: ['Перед декодированием верните символы <code>=</code>: <code>body + "=" * (-len(body) % 4)</code>.', 'Сначала проверьте подпись, и только потом читайте JSON.'], check: { tests: `import base64 as _b64, hmac as _hm, hashlib as _hl, json as _js
_t = make_token({"user": 7, "role": "barista", "exp": 1000}, "s3cret")
_body, _sig = _t.split(".")
assert "=" not in _body, "В body должны быть убраны символы = в конце"
assert _sig == _hm.new(b"s3cret", _body.encode(), _hl.sha256).hexdigest(), "Подпись: hex-значение HMAC-SHA256 от body"
assert read_token(_t, "s3cret", now=500) == {"user": 7, "role": "barista", "exp": 1000}, "Верный token: возвращается payload"
assert read_token(_t, "s3cret", now=1000) is None, "Просроченный token (exp <= now): None"
assert read_token(_t, "wrong", now=500) is None, "Другой секрет: None"
_evil = _b64.urlsafe_b64encode(_js.dumps({"user": 7, "role": "admin", "exp": 1000}, sort_keys=True).encode()).decode().rstrip("=")
assert read_token(_evil + "." + _sig, "s3cret", now=500) is None, "Если payload изменён, подпись не совпадает: None"
assert read_token("garbage", "s3cret", now=1) is None, "Испорченный формат: None"
` } },
        { prompt: 'Напишите функцию <code>can(user, perm)</code> и декоратор <code>require(perm)</code>. Словарь <code>ROLES</code> сопоставляет роль с набором разрешений; <code>"*"</code> даёт все разрешения. Handler получает первым аргументом <code>user</code>. Если <code>user is None</code>, верните <code>(401, {"error": "login required"})</code>; если разрешения нет — <code>(403, {"error": "forbidden"})</code>; иначе верните результат handler-а.', hints: ['Для неизвестной роли используйте <code>ROLES.get(role, set())</code>.', 'Сигнатура wrapper: <code>def wrapper(user, *args, **kwargs)</code>'], check: { tests: `@require("menu:edit")
def _set_price(user, drink, price):
    return 200, {"drink": drink, "price": price}
_b = {"name": "Сая", "role": "barista"}
_m = {"name": "Ерлан", "role": "manager"}
_a = {"name": "Admin", "role": "admin"}
assert can(_m, "reports:read") and not can(_b, "menu:edit"), "can: проверяйте набор разрешений роли"
assert can(_a, "anything:else"), "* даёт все разрешения"
assert can({"role": "intern"}, "orders:read") is False, "Для неизвестной роли разрешений нет"
assert _set_price(None, "latte", 1500) == (401, {"error": "login required"}), "Неавторизованный пользователь: 401"
assert _set_price(_b, "latte", 1500) == (403, {"error": "forbidden"}), "Баристе нельзя менять меню: 403"
assert _set_price(_m, "latte", 1500) == (200, {"drink": "latte", "price": 1500}), "Менеджеру можно: результат handler-а"
` } },
        { prompt: 'OAuth 2.0 authorization code: чтобы получить данные пользователя, серверу сайта в итоге нужно использовать что?', options: ['Пароль пользователя от Google', 'Короткоживущий code, который пришёл из браузера, напрямую', 'Access token, полученный в обмен на code', 'Cookie пользователя'], explain: 'Code выдаётся браузеру, а затем на стороне сервера обменивается на access token. Запросы к API делаются с access token. Пароль от Google сайт никогда не видит.' }
      ]
    },
    'pyb-8': {
      title: 'Тестирование: unittest, test client, ошибочные пути',
      body: `
<p>В курсе Software Eng вы проверяли функции через <code>assert</code> и <code>pytest</code>. В backend тесты ещё важнее: одно изменение затрагивает десятки endpoint-ов, а проверять их вручную через <code>curl</code> невозможно. В этом уроке мы изучим стандартную библиотеку <code>unittest</code> и идею «test client» без HTTP.</p>
<h3>unittest.TestCase</h3>
<pre><code>import unittest

def bus_fare(age, card=True):
    if age &lt; 0:
        raise ValueError("жас теріс болмайды")
    if age &lt; 7:
        return 0
    return 80 if card else 150

class FareTests(unittest.TestCase):
    def test_child_is_free(self):
        self.assertEqual(bus_fare(5), 0)

    def test_cash_is_more_expensive(self):
        self.assertGreater(bus_fare(30, card=False), bus_fare(30))

    def test_negative_age(self):
        with self.assertRaises(ValueError):
            bus_fare(-1)</code></pre>
<p>Каждый тест — метод, название которого начинается с <code>test_</code>. Часто используются проверки: <code>assertEqual</code>, <code>assertTrue</code>, <code>assertIn</code>, <code>assertIsNone</code>, <code>assertRaises</code>. В терминале запускайте <code>python -m unittest</code> или <code>pytest</code> (он тоже запускает тесты unittest). В браузере запустим тесты кодом:</p>
<pre><code>import io
suite = unittest.defaultTestLoader.loadTestsFromTestCase(FareTests)
result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)
print(result.testsRun, result.wasSuccessful())   # 3 True</code></pre>
<h3>setUp: чистая среда для каждого теста</h3>
<p><code>setUp</code> вызывается <b>перед</b> каждым тестовым методом, а <code>tearDown</code> — после него. Тесты не должны зависеть друг от друга: если заказ, созданный одним тестом, «переходит» к следующему, тесты начнут падать в зависимости от порядка запуска. В pytest эту роль выполняет <b>fixture</b>.</p>
<h3>Test client</h3>
<p>В Flask и FastAPI есть <code>TestClient</code>: он передаёт запрос приложению напрямую, без запуска сервера. Мы напишем его сами: клиент превращает body в JSON, вызывает <code>app.handle</code> и оборачивает ответ в удобный объект.</p>
<pre><code>import json
from dataclasses import dataclass

@dataclass
class Response:
    status: int
    json: object

class TestClient:
    def __init__(self, app):
        self.app = app
    def request(self, method, path, json_body=None):
        raw = "" if json_body is None else json.dumps(json_body)
        status, body = self.app.handle(method, path, raw)
        return Response(status, json.loads(body) if body else None)

class CafeApiTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(make_app())     # новое приложение для каждого теста
    def test_unknown_cafe(self):
        r = self.client.request("GET", "/cafes/999")
        self.assertEqual(r.status, 404)</code></pre>
<h3>Тестирование ошибочных путей</h3>
<p>Начинающий разработчик обычно проверяет только случай «всё хорошо». Но большинство багов прячется по краям: пустое body, испорченный JSON, несуществующий id, пользователь без прав, граничные значения (0, 10, 11). Для каждого endpoint-а напишите минимум: один успешный случай, одну ошибку валидации (400/422) и один случай «не найдено» (404).</p>
<h3>Какой тест хороший?</h3>
<ul>
<li>Быстрый и детерминированный: без сети, без реального времени, без случайности (время и random передавайте снаружи).</li>
<li>Один тест проверяет одну вещь, а название говорит, какую: <code>test_order_with_zero_qty_returns_422</code>.</li>
<li>Тест умеет находить баги: если намеренно сломать код, тест должен упасть. Если не падает, он ничего не проверяет.</li>
</ul>
<div class="tip">Когда нашли баг, сначала напишите тест, который его воспроизводит, и только потом исправляйте код. Тест падает, вы исправляете, тест проходит, и этот баг уже не вернётся незамеченным.</div>`,
      ex: [
        { prompt: 'Дана функция <code>apply_promo(total, code)</code>. Напишите класс <code>PromoTests(unittest.TestCase)</code>: минимум 3 теста, которые проверяют (1), что <code>"KOFE10"</code> даёт скидку 10%, (2), что <code>"STUDENT"</code> даёт скидку 15%, и (3), что неизвестный код выбрасывает <code>ValueError</code> (<code>assertRaises</code>). Тесты запускаются и на правильной функции, и на намеренно сломанных вариантах: на сломанных тест должен падать.', hints: ['<code>self.assertEqual(apply_promo(2000, "KOFE10"), 1800)</code>', 'Для ошибки: <code>with self.assertRaises(ValueError): apply_promo(2000, "FREE")</code>'], check: { tests: `import io as _io, unittest as _ut
def _run():
    _s = _ut.defaultTestLoader.loadTestsFromTestCase(PromoTests)
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_s)
_ok = _run()
assert _ok.testsRun >= 3, "Нужно не меньше 3 тестов (имена начинаются с test_)"
assert _ok.wasSuccessful(), "Тесты должны проходить на правильной функции"
_good = apply_promo
def _m1(total, code):
    return total
def _m2(total, code):
    if code not in PROMOS:
        raise ValueError("x")
    return total * 90 // 100
def _m3(total, code):
    if code not in PROMOS:
        raise ValueError("x")
    return total * 80 // 100 if code == "KOFE10" else total * 85 // 100
def _with(_mut):
    global apply_promo
    apply_promo = _mut
    try:
        return _run().wasSuccessful()
    finally:
        apply_promo = _good
assert not _with(_m1), "Тесты не поймали сломанную версию: неизвестный код должен выбрасывать ValueError"
assert not _with(_m2), "Тесты не поймали сломанную версию: STUDENT должен давать 15%"
assert not _with(_m3), "Тесты не поймали сломанную версию: KOFE10 должен давать 10%"
` } },
        { prompt: 'Напишите класс <code>TestClient</code>. Метод <code>request(method, path, json_body=None)</code> превращает body в строку через <code>json.dumps</code> (если <code>None</code>, то <code>""</code>), вызывает <code>self.app.handle(method, path, raw)</code>, читает body ответа через <code>json.loads</code> и возвращает <code>Response(status, json)</code> (если body пустой, то <code>json=None</code>). Также добавьте методы <code>get(path)</code> и <code>post(path, json_body)</code>.', hints: ['<code>status, body = self.app.handle(method, path, raw)</code>', '<code>get</code> и <code>post</code> просто вызывают <code>self.request(...)</code>.'], check: { tests: `_c = TestClient(MiniApp())
_r = _c.post("/items", {"name": "Самса"})
assert isinstance(_r, Response) and _r.status == 201 and _r.json == {"id": 1, "name": "Самса"}, "POST /items: 201 и JSON прочитан"
assert _c.get("/items/1").json["name"] == "Самса", "GET /items/1: созданный объект"
assert _c.get("/items/5").status == 404, "Несуществующий id: 404"
assert _c.post("/items", {}).status == 422, "Нет имени: 422"
_d = _c.request("DELETE", "/items/1")
assert _d.status == 204 and _d.json is None, "Пустое body: json=None"
` } },
        { prompt: 'Напишите класс <code>ItemApiTests(unittest.TestCase)</code>. В <code>setUp</code> создайте <code>self.client = TestClient(MiniApp())</code>. Минимум 3 теста: успешный <code>POST /items</code> возвращает 201; POST без имени возвращает 422; <code>GET</code> несуществующего id возвращает 404. Тесты также запускаются на сломанном приложении (которое вместо 422 возвращает 201), и там тест должен падать.', hints: ['<code>def setUp(self): self.client = TestClient(MiniApp())</code>', 'В тесте: <code>r = self.client.request("POST", "/items", {})</code>, затем <code>self.assertEqual(r.status, 422)</code>'], check: { tests: `import io as _io, unittest as _ut
def _run():
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(ItemApiTests))
assert "setUp" in ItemApiTests.__dict__, "Нужен метод setUp"
_ok = _run()
assert _ok.testsRun >= 3, "Нужно не меньше 3 тестов"
assert _ok.wasSuccessful(), "Тесты должны проходить на правильном приложении"
_Good = MiniApp
class _Broken(_Good):
    def handle(self, method, path, body=""):
        if path == "/items" and method == "POST" and not json.loads(body or "{}").get("name"):
            return 201, json.dumps({"id": 0, "name": ""})
        return super().handle(method, path, body)
MiniApp = _Broken
_bad = _run()
MiniApp = _Good
assert not _bad.wasSuccessful(), "Тесты должны падать на сломанном приложении (201 вместо 422)"
` } },
        { prompt: 'Когда вызывается метод <code>setUp</code>?', options: ['Один раз для всего класса, в самом начале', 'Перед каждым тестовым методом', 'Только после упавшего теста', 'Только когда вызывается <code>tearDown</code>'], explain: '<code>setUp</code> заново вызывается перед каждым методом <code>test_</code>, поэтому каждый тест начинается с чистой среды. Если нужно выполнить что-то один раз на весь класс, есть <code>setUpClass</code>.' }
      ]
    },
    'pyb-9': {
      title: 'Регулярные выражения: проверка, поиск, замена',
      body: `
<p>Пользователь пишет номер телефона как <code>+7 (701) 234-56-78</code>, <code>87012345678</code> или <code>+7 701 234 5678</code>. Чтобы проверить все эти варианты и привести их к одному формату, удобно использовать <b>регулярное выражение</b> (regex): маленький язык, который описывает шаблон в тексте. В Python он находится в модуле <code>re</code>.</p>
<h3>Основные символы</h3>
<table>
<tr><th>Шаблон</th><th>Значение</th></tr>
<tr><td><code>\\d</code>, <code>\\w</code>, <code>\\s</code></td><td>цифра; буква, цифра или <code>_</code>; пробельный символ</td></tr>
<tr><td><code>.</code></td><td>любой один символ (кроме перевода строки)</td></tr>
<tr><td><code>[abc]</code>, <code>[^0-9]</code></td><td>один символ из списка; любой символ, кроме цифры</td></tr>
<tr><td><code>*</code>, <code>+</code>, <code>?</code>, <code>{3}</code>, <code>{2,4}</code></td><td>0 и более, 1 и более, 0 или 1, ровно 3, от 2 до 4</td></tr>
<tr><td><code>^</code>, <code>$</code></td><td>начало строки, конец строки</td></tr>
<tr><td><code>( )</code>, <code>(?P&lt;name&gt; )</code>, <code>(?: )</code></td><td>группа; именованная группа; группа без захвата</td></tr>
<tr><td><code>a|b</code></td><td>a или b</td></tr>
</table>
<p>Шаблон всегда записывайте как <b>raw string</b>: <code>r"\\d+"</code>. Иначе Python сам преобразует такие последовательности, как <code>\\b</code>.</p>
<h3>Основные функции</h3>
<pre><code>import re
re.match(r"\\d+", "42 latte")        # ищет только с начала строки → match '42'
re.search(r"\\d+", "latte 42")       # первое совпадение в любом месте → '42'
re.fullmatch(r"\\d{6}", "050000")    # совпадать должна вся строка
re.findall(r"#(\\d+)", "#12 және #305")   # ['12', '305']: если есть группа, вернётся только группа
re.sub(r"\\s+", " ", "Абай   даңғылы  10")   # 'Абай даңғылы 10'</code></pre>
<p>Для проверки (валидации) используйте <code>fullmatch</code> или <code>^...$</code>. Вызов <code>match(r"\\d{6}", "0500001")</code> будет успешным, потому что он смотрит только на начало строки.</p>
<h3>Группы</h3>
<pre><code>m = re.search(r"(?P&lt;city&gt;[А-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІі]+), (?P&lt;zip&gt;\\d{6})", "Мекенжай: Атырау, 060011")
m.group("city"), m.group("zip")     # ('Атырау', '060011')
m.groupdict()                       # {'city': 'Атырау', 'zip': '060011'}</code></pre>
<h3>Казахстанский телефон</h3>
<pre><code>def normalize_phone(text):
    digits = re.sub(r"[\\s()\\-]", "", text)          # удаляются пробелы, скобки, дефисы
    m = re.fullmatch(r"(?:\\+7|8)(7\\d{9})", digits)
    return "+7" + m.group(1) if m else None

normalize_phone("+7 (701) 234-56-78")   # '+77012345678'
normalize_phone("8 777 111 22 33")      # '+77771112233'
normalize_phone("+7 495 123 45 67")     # None: не мобильный</code></pre>
<h3>Разбор URL path</h3>
<pre><code>PATH = re.compile(r"^/api/v(?P&lt;version&gt;\\d+)/(?P&lt;resource&gt;[a-z-]+)(?:/(?P&lt;id&gt;\\d+))?/?$")
PATH.match("/api/v2/orders/15").groupdict()
# {'version': '2', 'resource': 'orders', 'id': '15'}</code></pre>
<p><code>re.compile</code> готовит шаблон один раз. Если им пользуются в тысячах запросов, это удобно и быстро, а код читается легче.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Использовать <code>search</code> или <code>match</code> для валидации и не проверять конец строки.</li>
<li>Не экранировать точку: шаблон <code>r"mail.kz"</code> подходит и для <code>mailXkz</code>, правильно — <code>r"mail\\.kz"</code>.</li>
<li>Пытаться проверить email «идеальным» регулярным выражением. Простой проверки достаточно, а настоящая проверка — это отправка письма с подтверждением.</li>
<li>Жадный (greedy) <code>.*</code>: <code>&lt;.*&gt;</code> захватывает всё от первого <code>&lt;</code> до последнего <code>&gt;</code>. Ленивый вариант: <code>.*?</code>.</li>
</ul>
<div class="tip">Сложный шаблон можно разбить на несколько строк с флагом <code>re.VERBOSE</code> и добавить комментарии. Проверяйте шаблон на нескольких правильных и нескольких неправильных примерах.</div>`,
      ex: [
        { prompt: 'Напишите функцию <code>normalize_phone(text)</code>. Сначала удалите пробелы, скобки и дефисы. Затем, если номер начинается с <code>+7</code> или <code>8</code>, после которых идут <code>7</code> и ещё 9 цифр (казахстанский мобильный номер), верните его в формате <code>"+77XXXXXXXXX"</code>, иначе верните <code>None</code>.', hints: ['Очистка: <code>re.sub(r"[\\s()\\-]", "", text)</code>', 'Проверка: <code>re.fullmatch(r"(?:\\+7|8)(7\\d{9})", digits)</code>'], check: { tests: `assert normalize_phone("+7 (701) 234-56-78") == "+77012345678", "+7 (701) 234-56-78 → +77012345678"
assert normalize_phone("87771112233") == "+77771112233", "Номер, начинающийся с 8, тоже корректен"
assert normalize_phone("8 747 000 11 22") == "+77470001122", "Пробелы удаляются"
assert normalize_phone("+7 495 123 45 67") is None, "Код, не начинающийся с 7: None"
assert normalize_phone("+7 701 234 56 789") is None, "Лишняя цифра: None"
assert normalize_phone("+7 701 23a 56 78") is None, "Есть буква: None"
` } },
        { prompt: 'Напишите функцию <code>is_valid_email(s)</code>: простая проверка. Вся строка должна совпадать: до <code>@</code> — одна или несколько букв, цифр, <code>.</code>, <code>_</code>, <code>-</code> или <code>+</code>; затем <code>@</code>; затем домен: части через точку (в каждой части буквы, цифры, дефис), а последняя часть — минимум 2 латинские буквы. Верните <code>True</code> или <code>False</code>.', hints: ['Часть домена: <code>(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,}</code>', '<code>fullmatch</code> проверяет всю строку целиком.'], check: { tests: `assert is_valid_email("dana.serik@mail.kz") is True, "dana.serik@mail.kz корректен"
assert is_valid_email("erlan+shop@edu.astana.kz") is True, "Знак + и несколько частей домена корректны"
assert is_valid_email("dana@mail") is False, "В домене нужны точка и зона в конце"
assert is_valid_email("@mail.kz") is False, "До @ ничего нет"
assert is_valid_email("dana@mail.kz extra") is False, "Пробелы и лишний текст недопустимы"
assert is_valid_email("dana@@mail.kz") is False, "Двух @ быть не должно"
` } },
        { prompt: 'В логе чата заказов встречаются номера заказов вида <code>#A-1234</code> (<code>#</code>, одна заглавная латинская буква, дефис, 4 цифры) и телефоны. (1) Функция <code>order_ids(text)</code> возвращает номера без <code>#</code> в виде списка: <code>["A-1234", ...]</code>. (2) Функция <code>mask_phones(text)</code> скрывает середину номеров, которые начинаются с <code>+7</code> и состоят из 11 цифр (без пробелов, например <code>+77012345678</code>): получается <code>+7701***5678</code> (остаются первые 5 символов и последние 4 цифры).', hints: ['<code>findall</code> при наличии группы в шаблоне возвращает только группу: <code>r"#([A-Z]-\\d{4})"</code>.', 'В замене ссылка на группу: <code>r"\\1***\\2"</code>.'], check: { tests: `_log = "Клиент +77012345678 #A-1234 тапсырысын сұрады. #B-0007 дайын, #c-1111 қате, #D-12345 де қате. Курьер: +77775550011"
assert order_ids(_log) == ["A-1234", "B-0007"], "Только номера правильного формата: A-1234, B-0007"
assert mask_phones(_log) == "Клиент +7701***5678 #A-1234 тапсырысын сұрады. #B-0007 дайын, #c-1111 қате, #D-12345 де қате. Курьер: +7777***0011", "Середина телефона заменяется на ***, остальной текст не меняется"
assert mask_phones("Нөмір жоқ") == "Нөмір жоқ", "Если телефона нет, текст не меняется"
` } },
        { prompt: 'Функция <code>parse_api_path(path)</code> разбирает path вида <code>/api/v&lt;version&gt;/&lt;resource&gt;</code> или <code>/api/v&lt;version&gt;/&lt;resource&gt;/&lt;id&gt;</code> одним regex с именованными группами (завершающий <code>/</code> необязателен). Resource: строчные латинские буквы и дефис. Результат: <code>{"version": int, "resource": str, "id": int или None}</code>. Если путь не совпадает, верните <code>None</code>.', hints: ['Необязательная часть: <code>(?:/(?P&lt;id&gt;\\d+))?</code>', 'Если группа не совпала, <code>groupdict()</code> вернёт для неё <code>None</code>.'], check: { tests: `assert parse_api_path("/api/v2/orders/15") == {"version": 2, "resource": "orders", "id": 15}, "/api/v2/orders/15 → version 2, id 15"
assert parse_api_path("/api/v1/gift-cards/") == {"version": 1, "resource": "gift-cards", "id": None}, "id нет, завершающий / допустим"
assert parse_api_path("/api/v1/Orders") is None, "Заглавные буквы не допускаются"
assert parse_api_path("/api/v1/orders/abc") is None, "id — только цифры"
assert parse_api_path("/api/orders") is None, "Версия обязательна"
assert parse_api_path("/api/v3/orders/7/items") is None, "Лишняя часть: None"
` } }
      ]
    },
    'pyb-10': {
      title: 'Асинхронность, фоновые задачи, кэш и rate limiting',
      body: `
<p>Сервер кофейни на один запрос: достаёт меню из базы (20 мс), отправляет запрос платёжной системе (300 мс) и сообщает SMS-сервису (150 мс). Процессор большую часть этого времени ничего не делает, а <b>ждёт ответа</b>. Такая работа называется <b>I/O-bound</b>, и ускорить её можно, занимаясь другим запросом во время ожидания.</p>
<h3>Concurrency и parallelism</h3>
<ul>
<li><b>Concurrency</b>: один бариста делает три заказа по очереди. Пока греется молоко, он размалывает кофе. В каждый момент выполняется одно действие, но ожидание не пропадает впустую.</li>
<li><b>Parallelism</b>: три бариста делают три заказа действительно одновременно (несколько ядер процессора, несколько процессов).</li>
</ul>
<p>Для I/O-bound работы достаточно concurrency (async, threads). Для CPU-bound работы (обработка изображений, большие вычисления) нужен parallelism (несколько процессов).</p>
<h3>async / await</h3>
<pre><code>async def fetch_menu(cafe_id):
    await db.query("SELECT ...")      # во время ожидания event loop выполняет другую задачу
    return ["latte", "raf"]

coro = fetch_menu(7)        # функция ещё не выполнена! это объект coroutine
print(type(coro).__name__)  # coroutine
coro.close()</code></pre>
<p>Вызов функции <code>async def</code> её не выполняет, а лишь создаёт объект <b>coroutine</b>. Его запускает <b>event loop</b>: на каждом <code>await</code> coroutine говорит «я жду» и останавливается, а loop переключается на следующую готовую coroutine. Так работают FastAPI, aiohttp и async-часть Django.</p>
<h3>Собственный event loop на генераторах</h3>
<p>Идея coroutine выросла из генераторов: <code>yield</code> тоже приостанавливает функцию и отдаёт управление планировщику. Этот небольшой scheduler получает через <code>yield</code>, сколько секунд задача хочет «поспать», и запускает ту задачу, которая проснётся раньше всех, на поддельных часах (без реального ожидания):</p>
<pre><code>import heapq

def order(name, steps):
    for step, seconds in steps:
        print(f"{name}: {step}")
        yield seconds                     # «await sleep(seconds)»

def run(tasks):
    clock, queue = 0, [(0, i, t) for i, t in enumerate(tasks)]
    heapq.heapify(queue)
    while queue:
        clock, i, task = heapq.heappop(queue)
        try:
            delay = next(task)
            heapq.heappush(queue, (clock + delay, i, task))
        except StopIteration:
            print(f"t={clock}: тапсырма {i} бітті")

run([order("Латте", [("сүт қыздыру", 3), ("құю", 1)]),
     order("Американо", [("кофе тарту", 1), ("су қосу", 1)])])</code></pre>
<p>Настоящий <code>asyncio</code> устроен так же: очередь задач, heap по времени и выполнение готовых задач по очереди.</p>
<h3>Фоновые задачи: Celery, RabbitMQ</h3>
<p>Некоторая работа не должна выполняться внутри запроса: превращение чека в PDF, рассылка 10 000 клиентам, ночной отчёт. Handler ставит задачу в <b>очередь</b> (broker: RabbitMQ или Redis) и сразу возвращает <code>202 Accepted</code>. Отдельные процессы <b>worker</b> (Celery, RQ) берут задачи из очереди и выполняют их. Если задача завершилась с ошибкой, её повторяют позже (retry), поэтому её лучше писать идемпотентно.</p>
<h3>Кэш и rate limiting</h3>
<p>Часто запрашиваемые и редко меняющиеся данные (курс валюты, меню) кэшируют: внутри процесса — <code>functools.lru_cache</code>, между несколькими серверами — Redis. Для каждого кэша нужен срок жизни (TTL). <b>Rate limiting</b> ограничивает число запросов от одного клиента (например, 60 в минуту), а сверх лимита возвращает <code>429 Too Many Requests</code>. Известный алгоритм — <b>token bucket</b>: в корзине не больше <code>capacity</code> token-ов, каждую секунду добавляется <code>rate</code> token-ов, а каждый запрос тратит один token.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Вызывать блокирующий код (<code>time.sleep</code>, синхронный драйвер базы данных) внутри async-функции: тогда останавливается весь loop.</li>
<li>Забыть <code>await</code>: coroutine создаётся, но никогда не выполняется.</li>
<li>Привязать rate limiter к реальному <code>time.time()</code>: его трудно тестировать. Передавайте часы снаружи.</li>
</ul>
<div class="tip">Передавайте часы в код, который зависит от времени, как параметр (<code>clock=time.monotonic</code>). В тесте вместо них ставьте вручную управляемые фальшивые часы, и «прошла минута» записывается одной строкой.</div>`,
      ex: [
        { prompt: '<code>async def get_rate(): return 470</code> задана. Что будет с <code>x</code> после строки <code>x = get_rate()</code>?', options: ['<code>470</code>', 'Объект coroutine: функция ещё не выполнялась', '<code>None</code>', 'SyntaxError, потому что нет await'], explain: 'Вызов async-функции только создаёт coroutine. Чтобы получить результат, её нужно выполнить через <code>await</code> или event loop.' },
        { prompt: 'Напишите round-robin планировщик. <code>run_all(tasks)</code> получает список генераторов. По очереди берите из каждого генератора одно значение (<code>next</code>), добавляйте его в список <code>log</code> и ставьте генератор в конец очереди. Когда генератор закончился (<code>StopIteration</code>), удалите его из очереди. Верните список <code>log</code>. Удобно использовать <code>collections.deque</code>.', hints: ['<code>task = queue.popleft()</code>, затем <code>next(task)</code>.', 'Вызов <code>queue.append(task)</code> — только если не было <code>StopIteration</code>.'], check: { tests: `_log = run_all([barista("Сая", ["латте", "раф", "какао"]), barista("Әли", ["американо"]), barista("Нұр", ["капучино", "шай"])])
assert _log == ["Сая: латте", "Әли: американо", "Нұр: капучино", "Сая: раф", "Нұр: шай", "Сая: какао"], "Задачи должны чередоваться по очереди"
assert run_all([]) == [], "Если задач нет, лог пустой"
` } },
        { prompt: 'Напишите <code>RateLimiter(capacity, rate, clock)</code> на основе token bucket. <code>clock()</code> возвращает время в секундах. Для каждого <code>key</code> (например, IP) — отдельная корзина, в начале полная (<code>capacity</code>). <code>allow(key)</code>: сначала добавляет token-ы за прошедшее время (<code>rate</code> token-ов в секунду, но не больше <code>capacity</code>), затем, если token-ов ≥ 1, забирает один и возвращает <code>True</code>, иначе возвращает <code>False</code>.', hints: ['Для каждого key храните <code>(tokens, last_time)</code>.', 'Пополнение: <code>min(capacity, tokens + (now - last) * rate)</code>'], check: { tests: `class _Clock:
    def __init__(self):
        self.t = 0.0
    def __call__(self):
        return self.t
_c = _Clock()
_rl = RateLimiter(capacity=3, rate=1, clock=_c)
assert [_rl.allow("1.1.1.1") for _ in range(4)] == [True, True, True, False], "Вначале 3 token: проходят 3 запроса, четвёртый нет"
assert _rl.allow("2.2.2.2") is True, "У каждого key свой bucket"
_c.t = 1.0
assert _rl.allow("1.1.1.1") is True and _rl.allow("1.1.1.1") is False, "Через 1 секунду добавляется 1 token"
_c.t = 100.0
assert [_rl.allow("1.1.1.1") for _ in range(4)] == [True, True, True, False], "Bucket не превышает capacity"
_c2 = _Clock(); _half = RateLimiter(capacity=1, rate=0.5, clock=_c2)
assert _half.allow("k") is True and _half.allow("k") is False, "capacity=1: один запрос"
_c2.t = 1.0
assert _half.allow("k") is False, "rate=0.5: за 1 секунду набирается только полтокена"
_c2.t = 2.0
assert _half.allow("k") is True, "За 2 секунды — один полный token"
` } },
        { prompt: '<code>exchange_rate(currency)</code> обращается к медленному «внешнему API» (счётчик <code>CALLS["n"]</code> увеличивается). Закэшируйте её через <code>functools.lru_cache(maxsize=128)</code>, чтобы для каждой валюты API вызывался только один раз.', hints: ['Над функцией напишите <code>@lru_cache(maxsize=128)</code>.'], check: { tests: `_vals = [exchange_rate(c) for c in ["USD", "EUR", "USD", "USD", "RUB", "EUR"]]
assert _vals == [470, 510, 470, 470, 5, 510], "Значения не должны меняться"
assert CALLS["n"] == 3, "Три разные валюты: API должен вызываться только 3 раза"
assert exchange_rate.cache_info().hits == 3, "cache_info().hits = 3"
` } }
      ]
    },
    'pyb-11': {
      title: 'Деплой: Gunicorn, Nginx, Docker, CI/CD, env',
      body: `
<p>Код на ноутбуке работает. Теперь его нужно выложить на сервер, которым днём и ночью смогут пользоваться тысячи людей. Это и есть <b>деплой</b>. В браузере запустить его нельзя, но разберём роль каждой части.</p>
<h3>Virtualenv: напоминание</h3>
<p>В курсе Software Eng мы проходили <code>python -m venv .venv</code> и <code>requirements.txt</code>. На сервере то же самое: зависимости с зафиксированными версиями (<code>flask==3.0.3</code>), чтобы production и ноутбук использовали одинаковые библиотеки.</p>
<h3>Как запрос доходит до сервера</h3>
<pre><code>Браузер ──HTTPS──▶ Nginx ──HTTP──▶ Gunicorn ──▶ ваше приложение Flask/Django
                    │                (4 worker-процесса)
                    └── /static/ файлы отдаёт сам</code></pre>
<ul>
<li><b>Встроенный <code>app.run()</code> во Flask</b> предназначен только для разработки: он медленный и небезопасный.</li>
<li><b>Gunicorn</b> (WSGI-сервер) или <b>Uvicorn</b> (ASGI, для async): запускает несколько worker-процессов приложения. Базовое правило: <code>2 × количество ядер + 1</code>. Если worker падает, его перезапускают.</li>
<li><b>Nginx</b> (reverse proxy): входная дверь. Он хранит HTTPS-сертификат, отдаёт статические файлы, защищает от медленных клиентов и распределяет нагрузку между несколькими серверами.</li>
</ul>
<pre><code>gunicorn --workers 4 --bind 0.0.0.0:8000 app:app</code></pre>
<h3>Docker</h3>
<p>Проблему «у меня на компьютере работает» решает Docker: приложение, версия Python и зависимости собираются в один <b>image</b>, который одинаково запускается на любом сервере в виде <b>container</b>.</p>
<pre><code># Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8000", "app:app"]</code></pre>
<p>Важно копировать <code>requirements.txt</code> раньше кода: когда код меняется, Docker берёт слой с зависимостями из кэша, и build проходит быстрее.</p>
<h3>docker-compose</h3>
<pre><code># docker-compose.yml
services:
  web:
    build: .
    ports: ["8000:8000"]
    env_file: .env
    depends_on: [db, redis]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: example
  redis:
    image: redis:7</code></pre>
<p><code>docker compose up</code> одной командой поднимает приложение, PostgreSQL и Redis вместе. Новый разработчик запускает проект за несколько минут.</p>
<h3>Переменные окружения</h3>
<p>Секретные ключи и настройки хранятся не в коде, а в <b>окружении</b>: <code>os.environ["DATABASE_URL"]</code>. Локально они лежат в файле <code>.env</code>, а этот файл добавляется в <code>.gitignore</code>. Один и тот же image отличается в dev, staging и production только переменными окружения.</p>
<h3>Health check</h3>
<p><code>GET /health</code> возвращает 200, сообщая, что сервис «жив». Docker, Kubernetes или load balancer проверяют его каждые несколько секунд и перезапускают container, если он не отвечает. Расширенная версия также проверяет связь с базой данных и Redis и возвращает 503, если что-то не работает.</p>
<h3>CI/CD: GitHub Actions</h3>
<p>В курсе MLOps вы видели CI-workflow. В backend цепочка такая: push → тесты и linter (CI) → сборка Docker image → push в registry → автоматический деплой на сервер (CD). Если тесты упали, деплоя не будет.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Положить <code>.env</code> в git или выкатить в production с <code>DEBUG=True</code>.</li>
<li>Хранить данные внутри container: при пересоздании container они пропадают. Для базы нужен volume.</li>
<li>Деплой без health check: ситуацию «приложение запустилось, но не отвечает» никто не заметит.</li>
</ul>
<div class="tip">Один image — много окружений: не меняйте код для каждой среды отдельно. Все различия должны быть в переменных окружения.</div>`,
      ex: [
        { prompt: '<code>parse_env(text)</code> превращает текст <code>.env</code> в словарь. Правила: пустые строки и строки, начинающиеся с <code>#</code>, пропускаются; может быть префикс <code>export </code>; делим по первому <code>=</code>, ключ и значение очищаются через <code>strip</code>; если значение взято в одинаковые кавычки (<code>"..."</code> или <code>\'...\'</code>), кавычки снимаются, а текст внутри не меняется; у значения без кавычек комментарий после <code> #</code> отбрасывается. Строка без <code>=</code> вызывает <code>ValueError</code>.', hints: ['Делим по первому <code>=</code>: <code>line.split("=", 1)</code>, потому что в URL тоже может быть <code>=</code>.', 'Проверка кавычек: <code>value[0] == value[-1] and value[0] in "\\"\'"</code>'], check: { tests: `_text = """
# Kofe API баптаулары
export DEBUG=false
DATABASE_URL=postgres://kofe:pw@db:5432/kofe?sslmode=require
SECRET_KEY="a#b c"
GREETING='Сәлем, Алматы'
WORKERS = 4  # 2 * ядро + 1

"""
_env = parse_env(_text)
assert _env.get("DEBUG") == "false", "Префикс export удаляется"
assert _env.get("DATABASE_URL") == "postgres://kofe:pw@db:5432/kofe?sslmode=require", "Делить нужно по первому ="
assert _env.get("SECRET_KEY") == "a#b c", "Символ # внутри кавычек — не комментарий"
assert _env.get("GREETING") == "Сәлем, Алматы", "Одинарные кавычки тоже снимаются"
assert _env.get("WORKERS") == "4", "Пробелы и комментарий ' #' удаляются"
assert len(_env) == 5, "Пустые строки и комментарии пропускаются"
try:
    parse_env("DEBUG")
    assert False, "Для строки без = нужен ValueError"
except ValueError:
    pass
` } },
        { prompt: 'Напишите handler <code>health(checks)</code>. <code>checks</code> — словарь: имя → функция без аргументов. Если функция возвращает <code>True</code>, результат <code>"ok"</code>; если <code>False</code> или выбрасывает исключение, результат <code>"fail"</code>. Если всё ok, верните <code>(200, {"status": "ok", "checks": {...}})</code>, иначе <code>(503, {"status": "fail", "checks": {...}})</code>.', hints: ['Каждую проверку вызывайте внутри <code>try/except Exception</code>: даже если одна проверка упала, health endpoint не должен падать.'], check: { tests: `def _db():
    return True
def _redis():
    raise ConnectionError("redis:6379 жауап бермейді")
def _disk():
    return False
assert health({"db": _db}) == (200, {"status": "ok", "checks": {"db": "ok"}}), "Все ok: 200"
assert health({"db": _db, "redis": _redis}) == (503, {"status": "fail", "checks": {"db": "ok", "redis": "fail"}}), "Exception: fail и 503"
assert health({"disk": _disk})[0] == 503, "При False тоже fail"
assert health({}) == (200, {"status": "ok", "checks": {}}), "Нет проверок: 200"
` } },
        { prompt: 'В схеме Nginx + Gunicorn какая основная роль у Nginx?', options: ['Выполняет Python-код', 'Reverse proxy: HTTPS, статические файлы, передача запросов worker-ам Gunicorn', 'Хранит базу данных', 'Создаёт Docker image'], explain: 'Python-код выполняют worker-ы Gunicorn. Nginx — это входная дверь: TLS, статика, буферизация и распределение нагрузки.' },
        { prompt: 'Зачем в Dockerfile строки <code>COPY requirements.txt .</code> и <code>RUN pip install</code> стоят <b>раньше</b> <code>COPY . .</code>?', options: ['Docker не принимает другой порядок', 'При изменении кода слой с зависимостями берётся из кэша, и build проходит быстрее', 'Размер image уменьшается вдвое', 'Иначе requirements.txt не будет прочитан'], explain: 'Docker кэширует каждый шаг как слой. Если requirements.txt не меняется, слой с pip install не выполняется заново, перестраивается только слой с копированием кода.' }
      ]
    },
    'pyb-12': {
      title: 'Мини-проект: сервис сокращения URL',
      body: `
<p>Соберём всё, что мы изучили в модуле, в один сервис. «Tolqyn Link» — сокращатель URL: он превращает длинную ссылку в короткий код вида <code>https://tq.kz/q0U</code>, перенаправляет того, кто перешёл по коду, на исходный адрес и считает переходы. Такие сервисы каждый день используют маркетологи для рекламы, QR-кодов и SMS-рассылок.</p>
<h3>Таблица API</h3>
<table>
<tr><th>Запрос</th><th>Body</th><th>Ответ</th></tr>
<tr><td><code>POST /links</code></td><td><code>{"url": "...", "alias": "nauryz"}</code> (alias необязателен)</td><td>201 новая ссылка; 200, если этот URL уже сокращён; 400 испорченный JSON; 422 неверный URL/alias; 409 alias занят</td></tr>
<tr><td><code>GET /&lt;code&gt;</code></td><td>нет</td><td>302 + <code>location</code>; 404</td></tr>
<tr><td><code>GET /links/&lt;code&gt;/stats</code></td><td>нет</td><td>200 <code>{"code", "url", "clicks"}</code>; 404</td></tr>
</table>
<h3>Base62: число в короткий код</h3>
<p>Каждой ссылке мы даём возрастающий id, а код делаем из id. В десятичной системе 10 цифр, а в base62 — 62 символа: <code>0-9</code>, <code>a-z</code>, <code>A-Z</code>. Тогда код из 6 символов вмещает 62<sup>6</sup> ≈ 56 миллиардов ссылок.</p>
<pre><code>ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n == 0:
        return "0"
    out = []
    while n:
        n, r = divmod(n, 62)     # последняя «цифра» и остаток
        out.append(ALPHABET[r])
    return "".join(reversed(out))

encode(61)       # 'Z'
encode(62)       # '10'
encode(100000)   # 'q0U'</code></pre>
<p>Обратное преобразование выполняется по схеме Горнера: <code>n = n * 62 + ALPHABET.index(ch)</code>. Если id начинается с 1, первые коды получаются очень короткими и предсказуемыми, поэтому мы начинаем со 100000. В настоящих сервисах id перемешивают (или генерируют случайный код), чтобы было сложнее подбирать коды по порядку.</p>
<h3>Логика сервиса</h3>
<pre><code>class Shortener:
    def create(self, raw_body):
        # 1) чтение JSON → 400       (урок 5)
        # 2) валидация url и alias регулярными выражениями → 422   (уроки 5, 9)
        # 3) если URL уже есть, вернуть тот же код → 200 (идемпотентность, урок 3)
        # 4) alias занят → 409
        # 5) создать код, сохранить → 201
    def resolve(self, code):
        # если есть: clicks += 1 и 302, иначе 404
    def stats(self, code):
        # 200 или 404</code></pre>
<p>Данные храним в словаре: <code>self.links[code] = {"url": ..., "clicks": 0}</code>. В настоящем проекте это была бы таблица PostgreSQL (repository из урока 6), а для быстрого подсчёта кликов используют команду <code>INCR</code> в Redis.</p>
<h3>Почему 302, а не 301?</h3>
<p><code>301 Moved Permanently</code> браузер кэширует: в следующий раз он сразу идёт на исходный сайт, минуя сервер, и клик не засчитывается. <code>302 Found</code> (или <code>307</code>) — временное перенаправление, браузер каждый раз обращается к серверу.</p>
<h3>Тесты</h3>
<p>Каждую часть сервиса защитим тестом: для base62 — «encode, затем decode возвращает исходное число» (round-trip), для create — успешные и ошибочные пути, для resolve — подсчёт кликов. Как в уроке 8, при намеренно сломанной версии тест должен падать.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Принимать URL вроде <code>javascript:alert(1)</code>: разрешайте только <code>http</code> и <code>https</code>.</li>
<li>Конфликт alias и автоматического кода: если пользователь занял alias <code>q0U</code>, генератор не должен выдать его повторно.</li>
<li>Увеличивать клики при вызове endpoint-а stats.</li>
</ul>
<div class="tip">Следующим шагом добавьте в свою версию роутер из урока 4 (<code>POST /links</code>, <code>GET /&lt;code&gt;</code>), rate limiter из урока 10 и <code>/health</code> из урока 11. Тогда получится полноценный небольшой backend.</div>`,
      ex: [
        { prompt: 'Напишите функции base62 <code>encode(n)</code> и <code>decode(s)</code> (<code>ALPHABET</code> дан). <code>encode(0) == "0"</code>, для отрицательного числа — <code>ValueError</code>. <code>decode</code> выбрасывает <code>ValueError</code> для пустой строки или символа, которого нет в алфавите.', hints: ['<code>n, r = divmod(n, 62)</code> даёт последнюю «цифру», поэтому в конце результат нужно перевернуть через <code>reversed</code>.', 'decode: <code>n = n * 62 + ALPHABET.find(ch)</code>; если <code>find</code> ничего не нашёл, он возвращает <code>-1</code>.'], check: { tests: `assert encode(0) == "0" and encode(9) == "9" and encode(10) == "a", "0 → '0', 9 → '9', 10 → 'a'"
assert encode(61) == "Z" and encode(62) == "10" and encode(3844) == "100", "61 → 'Z', 62 → '10', 3844 → '100'"
assert encode(100000) == "q0U", "100000 → 'q0U'"
assert decode("q0U") == 100000 and decode("Z") == 61, "decode: обратное преобразование"
assert all(decode(encode(n)) == n for n in list(range(0, 5000, 7)) + [10 ** 12]), "Round-trip: decode(encode(n)) == n"
for _bad in ["", "ab!", "тест"]:
    try:
        decode(_bad)
        assert False, "Для неверного символа нужен ValueError"
    except ValueError:
        pass
try:
    encode(-1)
    assert False, "Для отрицательного числа нужен ValueError"
except ValueError:
    pass
` } },
        { prompt: 'Напишите класс <code>Shortener</code> (<code>encode</code>, <code>URL_RE</code>, <code>ALIAS_RE</code> даны). <code>create(raw_body)</code>: испорченный JSON или не объект → <code>(400, {"error": "invalid json"})</code>; если <code>url</code> не проходит <code>URL_RE.fullmatch</code>, или <code>alias</code>, если он передан, не проходит <code>ALIAS_RE</code> → <code>(422, {"errors": {...}})</code> (ключи <code>"url"</code> / <code>"alias"</code>); без alias, если такой URL уже сокращён → <code>(200, view)</code>; alias занят → <code>(409, {"error": "alias taken"})</code>; иначе код (alias или <code>encode(self.next_id)</code>: id начинается со 100000 и растёт, занятый код пропускается) → <code>(201, view)</code>. View: <code>{"code", "short_url": base + code, "url"}</code>. <code>resolve(code)</code>: <code>(302, {"location": url})</code> и клик +1, либо <code>(404, {"error": "not found"})</code>. <code>stats(code)</code>: <code>(200, {"code", "url", "clicks"})</code> или 404.', hints: ['Соберите все ошибки валидации в один словарь <code>errors</code> и, если он не пуст, верните 422.', 'Автоматический код: <code>while code in self.links: self.next_id += 1; code = encode(self.next_id)</code>'], check: { tests: `_s = Shortener()
_st, _v = _s.create('{"url": "https://kofe.kz/menu?city=almaty"}')
assert _st == 201 and _v == {"code": "q0U", "short_url": "https://tq.kz/q0U", "url": "https://kofe.kz/menu?city=almaty"}, "Первая ссылка: 201, код encode(100000) = q0U"
assert _s.create('{"url": "https://kofe.kz/menu?city=almaty"}') == (200, _v), "Тот же URL снова: 200 и тот же код"
assert _s.create('{"url": "https://tolqyn.kz", "alias": "nauryz"}')[1]["code"] == "nauryz", "Alias используется как код"
assert _s.create('{"url": "https://other.kz", "alias": "nauryz"}') == (409, {"error": "alias taken"}), "Занятый alias: 409"
assert _s.create('{"url": "https://x.kz", "alias": "q0V"}')[0] == 201, "Alias q0V принят"
assert _s.create('{"url": "https://bus.kz/route/92"}')[1]["code"] == "q0W", "Генератор должен пропустить занятый код q0V"
_st, _b = _s.create('{"url": "javascript:alert(1)", "alias": "a!"}')
assert _st == 422 and set(_b["errors"]) == {"url", "alias"}, "Неверные url и alias: 422, два ключа"
assert _s.create('{"url": ') == (400, {"error": "invalid json"}), "Испорченный JSON: 400"
assert _s.create('"https://kofe.kz"') == (400, {"error": "invalid json"}), "JSON не объект: 400"
assert _s.resolve("q0U") == (302, {"location": "https://kofe.kz/menu?city=almaty"}), "resolve: 302 и location"
_s.resolve("q0U")
assert _s.stats("q0U") == (200, {"code": "q0U", "url": "https://kofe.kz/menu?city=almaty", "clicks": 2}), "Два клика должны засчитаться"
assert _s.stats("q0U")[1]["clicks"] == 2, "stats не увеличивает клики"
assert _s.resolve("nope") == (404, {"error": "not found"}) and _s.stats("nope")[0] == 404, "Несуществующий код: 404"
` } },
        { prompt: 'Для готового <code>Shortener</code> напишите <code>ShortenerTests(unittest.TestCase)</code>: в <code>setUp</code> — <code>self.s = Shortener()</code>, минимум 4 теста. Проверка запустит ваши тесты на трёх сломанных вариантах: (1) <code>resolve</code> не считает клики, (2) <code>create</code> принимает URL не в формате http(s), например <code>"ftp://files.kz"</code>, (3) тот же URL получает новый код. На каждом из них ваши тесты должны падать.', hints: ['Тест на клики: create, два раза resolve, затем <code>stats(code)[1]["clicks"]</code> должен равняться 2.', 'Тест на ошибочный URL: <code>self.s.create(\'{"url": "ftp://files.kz"}\')</code> возвращает 422.'], check: { tests: `import io as _io, unittest as _ut, re as _re
def _ok():
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(ShortenerTests))
assert "setUp" in ShortenerTests.__dict__, "Нужен метод setUp"
_r = _ok()
assert _r.testsRun >= 4, "Нужно не меньше 4 тестов"
assert _r.wasSuccessful(), "Тесты должны проходить на правильном Shortener"
_Good = Shortener
class _NoClicks(_Good):
    def resolve(self, code):
        link = self.links.get(code)
        if link is None:
            return 404, {"error": "not found"}
        return 302, {"location": link["url"]}
class _AnyUrl(_Good):
    def create(self, raw_body):
        global URL_RE
        _saved = URL_RE
        URL_RE = _re.compile(r"\\S+")
        try:
            return super().create(raw_body)
        finally:
            URL_RE = _saved
class _NoDedup(_Good):
    def create(self, raw_body):
        self.by_url = {}
        return super().create(raw_body)
def _broken(_cls):
    global Shortener
    Shortener = _cls
    try:
        return _ok().wasSuccessful()
    finally:
        Shortener = _Good
assert not _broken(_NoClicks), "Тесты не поймали то, что клики не считаются"
assert not _broken(_AnyUrl), "Тесты не поймали принятие неверного URL вроде ftp://"
assert not _broken(_NoDedup), "Тесты не поймали выдачу нового кода для того же URL"
` } },
        { prompt: 'Почему короткая ссылка возвращает <code>302</code>, а не <code>301</code>?', options: ['302 работает быстрее', '301 браузер кэширует, и при следующем переходе запрос не придёт на сервер, поэтому клик не засчитается', '301 используется только для POST', 'Разницы нет'], explain: '301 — постоянное перенаправление: браузер его запоминает. 302 — временное, браузер каждый раз обращается к сокращателю, поэтому сервис может считать клики и позже изменить цель ссылки.' }
      ]
    },
    'pyb-gate': {
      title: 'Экзамен модуля: Python Backend',
      body: `
<p>Экзамен охватывает весь модуль: разбор HTTP-запроса, роутинг, валидацию и status code, подписанный token, regex, rate limiting и мышление ORM. Чтобы сдать, наберите не меньше <b>75%</b> баллов.</p>
<ul>
<li>Названия функций и классов должны точно совпадать с заданными. Handler-ы возвращают пару <code>(status, body)</code>.</li>
<li>Сначала проверьте себя на небольшом примере через <code>print</code>, затем нажмите кнопку «Проверить».</li>
<li>Помните: 400 — запрос нельзя прочитать, 422 — значение не соответствует правилам, 401 — неизвестно, кто вы, 403 — прав нет, 404 — не найдено, 405 — такого метода нет.</li>
</ul>`,
      ex: [
        { prompt: 'Клиент отправил действительный token, в котором <code>"role": "barista"</code>, а endpoint требует право <code>menu:edit</code>. Кроме того, <code>price</code> в body отрицательный. Что должен вернуть сервер?', options: ['401, потому что нет прав', '403, потому что пользователь известен, но у него нет права на это действие; до валидации дело не доходит', '422, потому что price отрицательный', '400, потому что body неверный'], explain: 'Token действителен, значит аутентификация пройдена (не 401). Проверка прав идёт раньше валидации: тому, у кого нет права, не нужно объяснять, какое поле неверно. Поэтому 403.' },
        { prompt: 'Напишите <code>handle_raw(raw)</code>: получает полный текст HTTP-запроса и возвращает <code>(status, body)</code>. Маршруты: <code>GET /v1/cafes/&lt;id&gt;</code> (id должен состоять из цифр) → если есть в <code>CAFES</code>, то <code>(200, cafe)</code>, иначе <code>(404, {"error": "not found"})</code>; <code>POST /v1/orders</code> → body в JSON: если он испорчен или не объект, то <code>(400, {"error": "invalid json"})</code>; если <code>cafe_id</code> нет в <code>CAFES</code> или <code>qty</code> не целое число от 1 до 10 (не bool), то <code>(422, {"errors": {...}})</code> (ключи <code>"cafe_id"</code>, <code>"qty"</code>); иначе <code>(201, {"id": &lt;растёт от 1&gt;, "cafe_id": ..., "qty": ...})</code>. Если path есть, но метод другой, — <code>(405, {"error": "method not allowed"})</code>; для другого path — 404. Query string (всё после <code>?</code>) игнорируйте.', hints: [], check: { tests: `def _req(method, path, body=""):
    return f"{method} {path} HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nContent-Type: application/json\\r\\n\\r\\n{body}"
assert handle_raw(_req("GET", "/v1/cafes/2?lang=kk")) == (200, CAFES[2]), "GET /v1/cafes/2: 200, query игнорируется"
assert handle_raw(_req("GET", "/v1/cafes/9")) == (404, {"error": "not found"}), "Нет такой кофейни: 404"
assert handle_raw(_req("GET", "/v1/cafes/abc"))[0] == 404, "id не цифры: 404"
assert handle_raw(_req("DELETE", "/v1/cafes/1")) == (405, {"error": "method not allowed"}), "Другой метод: 405"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 1, "qty": 2}')) == (201, {"id": 1, "cafe_id": 1, "qty": 2}), "Успешный заказ: 201, id 1"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 2, "qty": 10}'))[1]["id"] == 2, "Следующий заказ — id 2"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 1,')) == (400, {"error": "invalid json"}), "Испорченный JSON: 400"
_st, _b = handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 5, "qty": true}'))
assert _st == 422 and set(_b["errors"]) == {"cafe_id", "qty"}, "Две ошибки: 422, cafe_id и qty"
assert handle_raw(_req("GET", "/v1/orders"))[0] == 405, "GET /v1/orders: 405"
assert handle_raw(_req("GET", "/v2/buses"))[0] == 404, "Неизвестный path: 404"
` } },
        { prompt: 'Rate limiter с фиксированным окном: <code>FixedWindow(limit, window, clock)</code>. Время делится на окна по <code>window</code> секунд: номер окна — <code>int(clock() // window)</code>. Метод <code>allow(key)</code> не пропускает больше <code>limit</code> запросов для этого key в одном окне. <code>retry_after(key)</code>: если лимит исчерпан, возвращает число секунд до следующего окна, иначе <code>0</code>.', hints: [], check: { tests: `class _Clock:
    t = 0.0
    def __call__(self):
        return self.t
_c = _Clock()
_fw = FixedWindow(limit=2, window=60, clock=_c)
_c.t = 10
assert [_fw.allow("dana") for _ in range(3)] == [True, True, False], "В окне проходят 2 запроса, третий нет"
assert _fw.allow("erlan") is True, "Каждый key считается отдельно"
assert _fw.retry_after("dana") == 50, "t=10, окно 60: осталось 50 секунд"
assert _fw.retry_after("erlan") == 0, "Если лимит не исчерпан, retry_after = 0"
_c.t = 59.5
assert _fw.allow("dana") is False, "Текущее окно ещё не закончилось"
_c.t = 60
assert _fw.allow("dana") is True and _fw.allow("dana") is True and _fw.allow("dana") is False, "В новом окне счёт начинается заново"
` } },
        { prompt: 'Анализ access-лога. Каждая строка: <code>2026-03-21T09:15:02 GET /v1/cafes/12 200 0.031</code> (время, метод, path, статус, секунды). Функция <code>summarize(log)</code> разбирает строки регулярным выражением (строки, не подходящие под формат, пропускает) и возвращает словарь: <code>"groups"</code> — <code>{"2xx": n, "4xx": n, "5xx": n}</code> (только встретившиеся группы); <code>"slow"</code> — список <code>"METHOD path"</code> для запросов дольше 0.5 секунды (в порядке лога); <code>"top"</code> — самый часто запрашиваемый endpoint, где числа в path заменены на <code>&lt;id&gt;</code> (<code>"GET /v1/cafes/&lt;id&gt;"</code>).', hints: [], check: { tests: `_log = """2026-03-21T09:15:02 GET /v1/cafes/12 200 0.031
2026-03-21T09:15:03 GET /v1/cafes/7 200 0.044
2026-03-21T09:15:03 POST /v1/orders 201 0.820
бұзық жол
2026-03-21T09:15:04 GET /v1/cafes/99 404 0.012
2026-03-21T09:15:05 GET /v1/orders/5/items 500 1.700
2026-03-21T09:15:06 GET /v1/menu 200 0.090"""
_s = summarize(_log)
assert _s["groups"] == {"2xx": 4, "4xx": 1, "5xx": 1}, "Группы статусов: 2xx=4, 4xx=1, 5xx=1 (испорченная строка пропускается)"
assert _s["slow"] == ["POST /v1/orders", "GET /v1/orders/5/items"], "Запросы дольше 0.5 секунды, в порядке лога"
assert _s["top"] == "GET /v1/cafes/<id>", "id группируются как <id>: GET /v1/cafes/<id> встречается трижды"
assert summarize("") == {"groups": {}, "slow": [], "top": None}, "Пустой лог"
` } },
        { prompt: 'Session cookie. <code>make_cookie(user_id, secret)</code> возвращает <code>"&lt;user_id&gt;.&lt;sig&gt;"</code>, где <code>sig</code> = <code>hmac.new(secret.encode(), str(user_id).encode(), hashlib.sha256).hexdigest()[:16]</code>. <code>current_user(headers, secret, users)</code>: берёт header <code>"cookie"</code> из словаря <code>headers</code> (например, <code>"theme=dark; sid=7.ab12...; lang=kk"</code>), находит значение <code>sid</code> и проверяет подпись через <code>hmac.compare_digest</code>. Если всё верно и user есть в словаре <code>users</code>, верните словарь user, иначе <code>None</code>.', hints: [], check: { tests: `_users = {7: {"name": "Сая", "role": "barista"}, 8: {"name": "Ерлан", "role": "manager"}}
_ck = make_cookie(7, "k3y")
import hmac as _h, hashlib as _hl
assert _ck == "7." + _h.new(b"k3y", b"7", _hl.sha256).hexdigest()[:16], "Cookie: user_id.sig, sig — первые 16 символов HMAC"
assert current_user({"cookie": "theme=dark; sid=" + _ck + "; lang=kk"}, "k3y", _users) == _users[7], "Верный cookie: возвращается user"
assert current_user({"cookie": "sid=8." + _ck.split(".")[1]}, "k3y", _users) is None, "Подпись, перенесённая на другой user_id, недействительна"
assert current_user({"cookie": "sid=" + _ck}, "other", _users) is None, "Другой секрет: None"
assert current_user({}, "k3y", _users) is None, "Нет cookie: None"
assert current_user({"cookie": "sid=" + make_cookie(99, "k3y")}, "k3y", _users) is None, "id нет в users: None"
assert current_user({"cookie": "sid=garbage"}, "k3y", _users) is None, "Испорченный sid: None"
` } },
        { prompt: 'Страница показывает 100 заказов. В логе 1 запрос <code>SELECT * FROM orders</code> и 100 запросов <code>SELECT * FROM customers WHERE id = ?</code>. В чём проблема и как её решить?', options: ['Нет индекса; добавить индекс на <code>orders</code>', 'N+1; получить клиентов одним запросом (<code>JOIN</code> или <code>WHERE id IN (...)</code>, в ORM — select_related/joinedload)', 'Нет кэша; обернуть каждый запрос в lru_cache', 'Мало worker-ов Gunicorn; увеличить число worker-ов'], explain: 'Один основной запрос и по одному дополнительному на каждую строку: классический N+1. Получение связанных данных заранее одним запросом сокращает их до двух (или до одного через JOIN).' }
      ]
    }
  }
});
