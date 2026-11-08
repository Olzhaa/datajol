// PY3 Python Backend. HTTP, REST, routing, validation, ORM idea, auth, testing, regex, async, deploy and a URL shortener, all as pure-Python simulations (stdlib only) that run in Pyodide.
(function () {
  DJ.modules['py-3'] = {
    intro: 'Python негіздері мен Intermediate Python-нан кейінгі қадам: сервер жағы қалай жұмыс істейтінін өз қолыңызбен құрып үйренесіз. HTTP сұрауды талдау, REST дизайны, роутер, валидация, ORM идеясы, аутентификация, тесттер, regex, асинхрондылық және деплой. Браузерде нағыз сервер жоқ, сондықтан бәрін таза Python модельдерімен жасаймыз, соңында URL қысқартқыш сервисін құрасыз.',
    lessons: [
      {
        id: 'pyb-1', title: 'Веб қалай жұмыс істейді: HTTP сұрау мен жауап', minutes: 14,
        body: `
<p>Сіз телефоннан «Тамақ жеткізу» қосымшасын ашып, Алматыдағы кофеханалар тізімін көресіз. Сол сәтте телефон (<b>client</b>) интернет арқылы алыстағы компьютерге (<b>server</b>) сұрау жібереді, ал сервер жауап қайтарады. Backend әзірлеуші дәл осы сервер жағын жазады: сұрауды қабылдайды, дерекқордан мәлімет алады, жауап құрастырады.</p>
<p>Software Eng курсының REST сабағында методтар мен status code кестесін көрдіңіз. Енді бір деңгей төмен түсеміз: HTTP сұрау шын мәнінде <b>жай мәтін</b>, оны өзіміз талдай аламыз.</p>
<h3>Бір сұраудың жолы</h3>
<ul>
<li><b>DNS</b>: <code>api.kofe.kz</code> атауы IP-мекенжайға айналады.</li>
<li><b>TCP байланыс</b> (HTTPS болса, оның үстіне TLS шифрлау) ашылады.</li>
<li>Клиент HTTP сұрау мәтінін жібереді, сервер HTTP жауап мәтінін қайтарады.</li>
</ul>
<h3>Сұраудың құрылымы</h3>
<pre><code>GET /cafes?city=Алматы&amp;page=2 HTTP/1.1      ← request line: method, path, нұсқа
Host: api.kofe.kz                          ← headers: "Аты: мәні"
Accept: application/json
User-Agent: KofeApp/3.1
                                           ← бос жол: headers бітті
(GET-те body әдетте болмайды)</code></pre>
<p>Жолдар <code>\\r\\n</code> (CRLF) арқылы бөлінеді, ал headers пен body арасында <b>бос жол</b> тұрады, яғни <code>\\r\\n\\r\\n</code>. Path ішіндегі <code>?</code> белгісінен кейінгі бөлік <b>query string</b>: <code>city=Алматы&amp;page=2</code>.</p>
<h3>Жиі кездесетін headers</h3>
<table>
<tr><th>Header</th><th>Не үшін</th></tr>
<tr><td><code>Content-Type</code></td><td>body қандай форматта: <code>application/json</code>, <code>text/html</code></td></tr>
<tr><td><code>Content-Length</code></td><td>body ұзындығы <b>байтпен</b></td></tr>
<tr><td><code>Authorization</code></td><td>кім сұрап тұр: <code>Bearer &lt;token&gt;</code></td></tr>
<tr><td><code>Cookie</code> / <code>Set-Cookie</code></td><td>сессия идентификаторы</td></tr>
<tr><td><code>Cache-Control</code></td><td>жауапты қанша уақыт кэштеуге болады</td></tr>
</table>
<p>Header атаулары регистрге тәуелсіз: <code>content-type</code> мен <code>Content-Type</code> бірдей. Сондықтан талдағанда атауды кіші әріпке келтіру ыңғайлы.</p>
<h3>Python-да сұрауды талдау</h3>
<pre><code>raw = "POST /orders HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nContent-Type: application/json\\r\\n\\r\\n{\\"drink\\": \\"latte\\"}"
head, body = raw.split("\\r\\n\\r\\n", 1)
lines = head.split("\\r\\n")
method, path, version = lines[0].split(" ")
headers = {}
for line in lines[1:]:
    name, value = line.split(":", 1)
    headers[name.strip().lower()] = value.strip()
print(method, path, headers["content-type"], body)</code></pre>
<p>Жауап та осындай: бірінші жолда <code>HTTP/1.1 201 Created</code>, сосын headers, бос жол және body. Status code бірінші цифрына қарап топталады: 1xx ақпарат, 2xx сәтті, 3xx қайта бағыттау (redirect), 4xx клиент қатесі, 5xx сервер қатесі.</p>
<h3>Жиі қателер</h3>
<ul>
<li><code>split(":")</code> шектеусіз шақыру: <code>Host: localhost:8000</code> мәнінде қос нүкте тағы бар. <code>split(":", 1)</code> жазыңыз.</li>
<li><code>Content-Length</code> таңба санымен есептеу: «Алматы» 6 таңба, бірақ UTF-8-де 12 байт.</li>
<li>Body-ді <code>"\\n\\n"</code> бойынша іздеу: HTTP-де бөлгіш <code>"\\r\\n\\r\\n"</code>.</li>
</ul>
<p>Сервер жағынан бір сұрауды өңдеу әрқашан үш қадам: мәтінді талдау (parse), бизнес логиканы орындау және жауап мәтінін құрастыру. Осы модульде біз үшеуін де бөлек функция ретінде жазамыз, ал соңында оларды бір сервиске жинаймыз.</p>
<div class="tip">Flask, FastAPI, Django сияқты фреймворктар осы талдауды сіз үшін жасайды да, дайын <code>request</code> объектісін береді. Бірақ қате шыққанда (мысалы, 400 Bad Request) астында не болып жатқанын білу өте көмектеседі.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>parse_request(raw)</code> функциясын жазыңыз. Ол сөздік қайтарсын: <code>method</code>, <code>path</code> (query-сіз), <code>query</code> (сөздік, <code>?</code>-тен кейінгі <code>k=v</code> жұптары, жоқ болса <code>{}</code>), <code>headers</code> (атаулары кіші әріппен, мәндері <code>strip</code> етілген) және <code>body</code> (жол, болмаса <code>""</code>).', 
            starter: `def parse_request(raw):
    return {}
`, 
            solution: `def parse_request(raw):
    head, _, body = raw.partition("\\r\\n\\r\\n")
    lines = head.split("\\r\\n")
    method, target, _version = lines[0].split(" ")
    path, _, qs = target.partition("?")
    query = {}
    if qs:
        for pair in qs.split("&"):
            k, _, v = pair.partition("=")
            query[k] = v
    headers = {}
    for line in lines[1:]:
        name, value = line.split(":", 1)
        headers[name.strip().lower()] = value.strip()
    return {"method": method, "path": path, "query": query, "headers": headers, "body": body}
`, 
            hints: ['Алдымен <code>raw.partition("\\r\\n\\r\\n")</code> арқылы head пен body-ді бөліңіз.', 'Header жолын <code>line.split(":", 1)</code> арқылы бөліңіз, себебі мәнде де қос нүкте болуы мүмкін.'], 
            check: { tests: `_raw = "POST /orders?city=Shymkent&size=L HTTP/1.1\\r\\nHost: localhost:8000\\r\\nContent-Type:  application/json \\r\\n\\r\\n{\\"drink\\": \\"latte\\"}"
_r = parse_request(_raw)
assert _r.get("method") == "POST", "method: бірінші жолдың бірінші сөзі"
assert _r.get("path") == "/orders", "path query-сіз болуы керек: /orders"
assert _r.get("query") == {"city": "Shymkent", "size": "L"}, "query: ?-тен кейінгі k=v жұптары"
assert _r.get("headers") == {"host": "localhost:8000", "content-type": "application/json"}, "headers: атаулары кіші әріппен, мәндері strip, порттағы қос нүкте сақталсын"
assert _r.get("body") == '{"drink": "latte"}', "body: бос жолдан кейінгі мәтін"
_g = parse_request("GET /cafes HTTP/1.1\\r\\nAccept: */*\\r\\n\\r\\n")
assert _g["query"] == {} and _g["body"] == "" and _g["path"] == "/cafes", "Query мен body жоқ болса: {} және бос жол"
` } },
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>status_group(code)</code> функциясын жазыңыз: 100-199 → <code>"info"</code>, 200-299 → <code>"success"</code>, 300-399 → <code>"redirect"</code>, 400-499 → <code>"client_error"</code>, 500-599 → <code>"server_error"</code>, басқа сан → <code>ValueError</code>. Сосын <code>REASONS</code> сөздігін толтырыңыз: 200, 201, 204, 301, 400, 401, 403, 404, 500 кодтарына стандартты атауларын жазыңыз (<code>"OK"</code>, <code>"Created"</code>, <code>"No Content"</code>, <code>"Moved Permanently"</code>, <code>"Bad Request"</code>, <code>"Unauthorized"</code>, <code>"Forbidden"</code>, <code>"Not Found"</code>, <code>"Internal Server Error"</code>).', 
            starter: `REASONS = {200: "OK"}

def status_group(code):
    return "success"
`, 
            solution: `REASONS = {200: "OK", 201: "Created", 204: "No Content", 301: "Moved Permanently",
           400: "Bad Request", 401: "Unauthorized", 403: "Forbidden", 404: "Not Found",
           500: "Internal Server Error"}

def status_group(code):
    groups = {1: "info", 2: "success", 3: "redirect", 4: "client_error", 5: "server_error"}
    if not 100 <= code <= 599:
        raise ValueError("белгісіз status code")
    return groups[code // 100]
`, 
            hints: ['Топ нөмірі: <code>code // 100</code>.', 'Шекараны тексеріңіз: <code>if not 100 &lt;= code &lt;= 599: raise ValueError(...)</code>'], 
            check: { tests: `assert status_group(204) == "success", "204 сәтті жауап тобына жатады"
assert status_group(302) == "redirect", "3xx: redirect"
assert status_group(422) == "client_error", "4xx: клиенттің қатесі"
assert status_group(503) == "server_error", "5xx: сервердің қатесі"
assert status_group(101) == "info", "1xx: info"
try:
    status_group(42)
    assert False, "42 үшін ValueError шығуы керек"
except ValueError:
    pass
assert REASONS.get(404) == "Not Found" and REASONS.get(201) == "Created" and REASONS.get(403) == "Forbidden", "REASONS: 404, 201, 403 атаулары"
assert len(REASONS) == 9 and REASONS.get(204) == "No Content" and REASONS.get(500) == "Internal Server Error", "REASONS-та тоғыз код болуы керек"
` } },
          { type: 'python', xp: 25, level: 'hard', prompt: '<code>build_response(status, data)</code> функциясын жазыңыз. Ол HTTP жауап мәтінін қайтарсын: <code>"HTTP/1.1 &lt;status&gt; &lt;reason&gt;\\r\\nContent-Type: application/json\\r\\nContent-Length: &lt;N&gt;\\r\\n\\r\\n&lt;body&gt;"</code>. Body: <code>json.dumps(data, ensure_ascii=False)</code>. <code>N</code> body-дің UTF-8 <b>байт</b> саны. Reason атауын берілген <code>REASONS</code> сөздігінен алыңыз.', 
            starter: `import json
REASONS = {200: "OK", 201: "Created", 404: "Not Found"}

def build_response(status, data):
    body = json.dumps(data, ensure_ascii=False)
    return "HTTP/1.1 " + str(status) + "\\r\\n\\r\\n" + body
`, 
            solution: `import json
REASONS = {200: "OK", 201: "Created", 404: "Not Found"}

def build_response(status, data):
    body = json.dumps(data, ensure_ascii=False)
    length = len(body.encode("utf-8"))
    return (f"HTTP/1.1 {status} {REASONS[status]}\\r\\n"
            f"Content-Type: application/json\\r\\n"
            f"Content-Length: {length}\\r\\n\\r\\n{body}")
`, 
            hints: ['Байт саны: <code>len(body.encode("utf-8"))</code>, ал <code>len(body)</code> таңба санын береді.'], 
            check: { tests: `_r = build_response(201, {"city": "Алматы"})
_head, _body = _r.split("\\r\\n\\r\\n", 1)
assert _head.split("\\r\\n")[0] == "HTTP/1.1 201 Created", "Бірінші жол: HTTP/1.1 201 Created"
assert "Content-Type: application/json" in _head.split("\\r\\n"), "Content-Type header-і керек"
assert "Content-Length: 24" in _head.split("\\r\\n"), "Content-Length байтпен: кириллица әрпі UTF-8-де 2 байт, бұл body 24 байт"
assert _body == '{"city": "Алматы"}', "Body: json.dumps(data, ensure_ascii=False)"
assert build_response(404, {}).startswith("HTTP/1.1 404 Not Found\\r\\n"), "404 үшін reason: Not Found"
` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: 'HTTP сұрауда headers бөлігі қай жерде бітеді?', options: ['Бірінші <code>\\r\\n</code> кезінде', 'Бос жолда, яғни <code>\\r\\n\\r\\n</code> кезінде', '<code>Content-Length</code> header-інен кейін', 'Body-дің бірінші <code>{</code> таңбасында'], answer: 1, explain: 'Әр header бөлек жолда тұрады, ал headers пен body арасында бос жол болады: <code>\\r\\n\\r\\n</code>. Content-Length body-дің қай жерде бітетінін айтады.' }
        ]
      },
      {
        id: 'pyb-2', title: 'Debugging және код стилі: traceback, PEP 8, docstring', minutes: 14,
        body: `
<p>Backend кодының көп бөлігі «неге жұмыс істемейді?» деген сұраққа жауап іздеумен өтеді. Қатені тез табу дағдысы жаңа синтаксис білуден кем маңызды емес. Ал таза стиль қатенің аз болуына көмектеседі.</p>
<h3>Traceback-ті төменнен жоғары оқу</h3>
<pre><code>Traceback (most recent call last):
  File "app.py", line 14, in &lt;module&gt;
    print(order_total(cart))
  File "app.py", line 9, in order_total
    total += item["price"] * item["qty"]
KeyError: 'qty'</code></pre>
<ul>
<li><b>Ең төменгі жол</b>: қатенің түрі мен себебі. Мұнда <code>KeyError: 'qty'</code>, яғни бір тауарда <code>qty</code> кілті жоқ.</li>
<li>Оның үстінде: қате <b>қай жолда</b> болды (<code>line 9, in order_total</code>).</li>
<li>Одан жоғары: бұл функцияны кім шақырды. Тізбек «шақыру стегі» (call stack) деп аталады.</li>
</ul>
<p>Жиі кездесетін түрлер: <code>TypeError</code> (тип сәйкес емес, мысалы <code>"#" + 5</code>), <code>KeyError</code>, <code>IndexError</code>, <code>AttributeError</code> (<code>None</code> объектісінде әдіс жоқ), <code>ZeroDivisionError</code>.</p>
<h3>print және breakpoint</h3>
<p>Ең қарапайым тәсіл: күдікті жерге <code>print(f"{item=}")</code> қою. <code>=</code> белгісі айнымалының атын да шығарады: <code>item={'name': 'latte'}</code>. Күрделірек жағдайда <code>breakpoint()</code> жазасыз: бағдарлама сол жерде тоқтап, <code>pdb</code> debugger ашылады.</p>
<table>
<tr><th>pdb командасы</th><th>Не істейді</th></tr>
<tr><td><code>p x</code></td><td>айнымалы мәнін көрсету</td></tr>
<tr><td><code>n</code></td><td>келесі жол (next)</td></tr>
<tr><td><code>s</code></td><td>функция ішіне кіру (step)</td></tr>
<tr><td><code>c</code></td><td>келесі тоқтауға дейін жалғастыру</td></tr>
<tr><td><code>l</code></td><td>айналадағы кодты көрсету</td></tr>
</table>
<p>Браузердегі Python-да интерактивті debugger жоқ, сондықтан мұнда <code>print</code> қолданамыз. VS Code пен PyCharm-да нүктені жол нөмірінің жанына қойып, дәл осындай тоқтауды тышқанмен жасайсыз.</p>
<h3>PEP 8: ортақ стиль</h3>
<pre><code>MAX_ITEMS = 50                      # константа: UPPER_CASE

class OrderService:                 # класс: CamelCase
    def total_price(self, items):   # функция, айнымалы: snake_case
        """Тауарлардың жалпы бағасын теңгемен қайтарады."""
        return sum(i["price"] * i["qty"] for i in items)</code></pre>
<ul>
<li>Шегініс: 4 бос орын, tab емес. Жол ұзындығы шамамен 79-99 таңба.</li>
<li>Операторлар айналасында бос орын: <code>x = a + b</code>, бірақ <code>f(a=1)</code> ішінде бос орынсыз.</li>
<li><code>import</code> файлдың басында. Атаулар мағыналы: <code>d</code> емес, <code>delivery_fee</code>.</li>
</ul>
<h3>Docstring</h3>
<p>Функцияның бірінші жолындағы үш тырнақшалы мәтін <b>docstring</b> деп аталады. Ол <code>func.__doc__</code> және <code>help(func)</code> арқылы оқылады. Жақсы docstring функция не істейтінін, параметрлерін, қайтаратын мәнін және қандай қате шығаратынын айтады.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Traceback-тің тек жоғарғы жолын оқып, нақты себепті (ең төменгі жол) өткізіп алу.</li>
<li>Әдепкі мән ретінде <code>[]</code> беру: тізім барлық шақыруда ортақ болады.</li>
<li>Debug үшін қойған <code>print</code>-терді кодта қалдырып кету. Production-да <code>logging</code> қолданыңыз (Software Eng курсында өттік).</li>
</ul>
<div class="tip">Қатені түзетпес бұрын оны <b>қайталап шығаратын</b> ең кішкентай мысалды табыңыз. Мысал 3 жолға дейін қысқарса, себеп әдетте өзі көрініп тұрады.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: 'Кофехана кассасындағы <code>average_bill(bills)</code> функциясында екі қате бар: бірінші чек есепке кірмейді, ал бос тізімде <code>ZeroDivisionError</code> шығады. Түзетіңіз: орташа мәнді <code>round(..., 1)</code> арқылы қайтарсын, бос тізімде <code>0</code> қайтарсын.', 
            starter: `def average_bill(bills):
    total = 0
    for i in range(1, len(bills)):
        total += bills[i]
    return round(total / len(bills), 1)
`, 
            solution: `def average_bill(bills):
    if not bills:
        return 0
    total = 0
    for i in range(len(bills)):
        total += bills[i]
    return round(total / len(bills), 1)
`, 
            hints: ['<code>range(1, ...)</code> 0-индексті өткізіп жібереді.', 'Басында: <code>if not bills: return 0</code>'], 
            check: { tests: `assert average_bill([1200, 1800, 2400]) == 1800.0, "Барлық чек есепке кіруі керек: (1200+1800+2400)/3 = 1800.0"
assert average_bill([1500]) == 1500.0, "Бір чек болса, орташа сол чек"
assert average_bill([]) == 0, "Бос тізімде 0 қайтарыңыз"
` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Екі функцияда қате бар. <code>order_label(order_id)</code> <code>"Тапсырыс #17"</code> түріндегі жол қайтаруы керек, бірақ <code>TypeError</code> береді. <code>add_tag(tag, tags=[])</code> әр шақыруда жаңа тізім қайтаруы керек, бірақ тегтер шақырулар арасында жиналып қалады. Екеуін де түзетіңіз.', 
            starter: `def order_label(order_id):
    return "Тапсырыс #" + order_id

def add_tag(tag, tags=[]):
    tags.append(tag)
    return tags
`, 
            solution: `def order_label(order_id):
    return f"Тапсырыс #{order_id}"

def add_tag(tag, tags=None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags
`, 
            hints: ['Жол мен санды f-string арқылы біріктіріңіз.', 'Әдепкі мән <code>None</code> болсын, ішінде жаңа тізім жасаңыз.'], 
            check: { tests: `assert order_label(17) == "Тапсырыс #17", "order_label(17) = 'Тапсырыс #17' болуы керек"
assert add_tag("vegan") == ["vegan"], "Бірінші шақыру: ['vegan']"
assert add_tag("hot") == ["hot"], "Екінші шақыру алдыңғы тегті көрмеуі керек: ['hot']"
assert add_tag("x", ["a"]) == ["a", "x"], "Берілген тізімге қосылуы керек"
` } },
          { type: 'python', xp: 15, level: 'easy', prompt: 'PEP 8 бойынша <code>delivery_fee(distance_km, express=False)</code> функциясын docstring-пен жазыңыз. Ереже: 3 км-ге дейін 500 ₸, әр қосымша толық немесе бөлшек км үшін 150 ₸ (<code>math.ceil</code>). <code>express=True</code> болса, бағаға 700 ₸ қосылады. Docstring-те <code>km</code> сөзі болсын. Теріс қашықтықта <code>ValueError</code>.', 
            starter: `def DeliveryFee(d, e=False):
    return 500
`, 
            solution: `import math

def delivery_fee(distance_km, express=False):
    """Жеткізу бағасын теңгемен қайтарады.

    distance_km: қашықтық, km. express: жедел жеткізу (+700).
    Теріс қашықтықта ValueError шығарады.
    """
    if distance_km < 0:
        raise ValueError("қашықтық теріс болмайды")
    fee = 500 + 150 * max(0, math.ceil(distance_km - 3))
    if express:
        fee += 700
    return fee
`, 
            hints: ['Функцияның бірінші жолына <code>"""..."""</code> жазыңыз.', 'Қосымша км: <code>max(0, math.ceil(distance_km - 3))</code>'], 
            check: { tests: `assert "delivery_fee" in dir(), "Функция аты snake_case: delivery_fee"
assert delivery_fee.__doc__ and "km" in delivery_fee.__doc__, "Docstring керек және онда km сөзі болсын"
assert delivery_fee(2) == 500, "3 км-ге дейін 500"
assert delivery_fee(4.2) == 800, "4.2 км: 500 + 2*150 = 800"
assert delivery_fee(3, express=True) == 1200, "express: +700"
try:
    delivery_fee(-1)
    assert False, "Теріс қашықтықта ValueError керек"
except ValueError:
    pass
` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: 'Traceback-тің соңғы жолы <code>AttributeError: \'NoneType\' object has no attribute \'get\'</code>. Ең ықтимал себеп қандай?', options: ['Сөздікте кілт жоқ', 'Айнымалы күткен сөздіктің орнына <code>None</code> болып шықты, мысалы функция <code>return</code>-сіз аяқталды', 'Python нұсқасы ескі', '<code>get</code> әдісі тек тізімде болады'], answer: 1, explain: '<code>None</code>-да <code>.get</code> жоқ. Әдетте бір функция мәнді қайтармай қалғанда (return ұмытылған немесе іздеу нәтиже таппаған) айнымалы <code>None</code> болады. Traceback-тен сол айнымалының қайдан келгенін іздеңіз.' }
        ]
      },
      {
        id: 'pyb-3', title: 'REST API дизайны: ресурстар, CRUD, пагинация', minutes: 15,
        body: `
<p>Жақсы API-ды бір рет көрген әзірлеуші қалған endpoint-терді өзі болжай алады. REST дизайнының мәні осында: бәрі <b>ресурс</b> (зат есім), ал әрекетті HTTP метод айтады.</p>
<h3>Атаулар</h3>
<ul>
<li>Ресурс көпше түрде, зат есім: <code>/products</code>, <code>/orders</code>. <code>/getProducts</code> немесе <code>/createOrder</code> емес.</li>
<li>Бір объект: <code>/products/42</code>. Кіріктірілген ресурс: <code>/shops/3/orders</code> (3-дүкеннің тапсырыстары).</li>
<li>Кіші әріп, сөздер дефиспен: <code>/gift-cards</code>. Нұсқа алдында: <code>/v1/products</code>.</li>
<li>Сүзгі мен сұрыптау query string-те: <code>/products?city=Алматы&amp;sort=-price</code>.</li>
</ul>
<h3>CRUD және методтар</h3>
<table>
<tr><th>Әрекет</th><th>Сұрау</th><th>Сәтті жауап</th></tr>
<tr><td>Тізім</td><td><code>GET /products</code></td><td>200 + тізім</td></tr>
<tr><td>Жасау</td><td><code>POST /products</code></td><td>201 + жаңа объект (және <code>Location</code> header)</td></tr>
<tr><td>Біреуін оқу</td><td><code>GET /products/42</code></td><td>200 немесе 404</td></tr>
<tr><td>Толық ауыстыру</td><td><code>PUT /products/42</code></td><td>200</td></tr>
<tr><td>Ішінара өзгерту</td><td><code>PATCH /products/42</code></td><td>200</td></tr>
<tr><td>Жою</td><td><code>DELETE /products/42</code></td><td>204, body жоқ</td></tr>
</table>
<h3>JSON payload</h3>
<pre><code>POST /v1/orders
{"cafe_id": 7, "items": [{"drink": "latte", "qty": 2}], "pickup": "12:30"}

201 Created
Location: /v1/orders/1051
{"id": 1051, "status": "new", "total": 3200}</code></pre>
<p>Кілттер бір стильде болсын (әдетте <code>snake_case</code> немесе <code>camelCase</code>, араластырмаңыз). Күн мен уақыт ISO форматта: <code>"2026-03-21T12:30:00+05:00"</code>. Ақша бүтін санмен (тиынмен немесе теңгемен), float-пен емес.</p>
<h3>Идемпотенттілік</h3>
<p>Мобильді интернет үзіліп, клиент бір сұрауды қайта жіберді делік. <code>PUT</code> және <code>DELETE</code> идемпотентті: қайталау нәтижені өзгертпейді. <code>POST</code> қайталанса, екі тапсырыс жасалып, клиенттен екі рет ақша алынуы мүмкін. Сондықтан төлем API-лары <code>Idempotency-Key</code> header-ін сұрайды: сервер кілтті есте сақтап, қайталанған сұрауға бұрынғы жауапты қайтарады.</p>
<h3>Пагинация</h3>
<p>10 000 тауарды бір жауапта жіберу баяу. Екі тәсіл бар:</p>
<ul>
<li><b>Page/offset</b>: <code>?page=2&amp;per_page=20</code>. Қарапайым, бірақ тізім өзгеріп жатса, элементтер қайталанып не жоғалып кетуі мүмкін.</li>
<li><b>Cursor</b>: <code>?after=1050&amp;limit=20</code>, яғни «id 1050-ден кейінгі 20 элемент». Үлкен, жылдам өзгеретін тізімге тұрақты.</li>
</ul>
<pre><code>def page_of(items, page, per_page):
    start = (page - 1) * per_page
    return items[start:start + per_page]</code></pre>
<h3>Қате жауаптың форматы</h3>
<p>Қате болғанда да жауап бір үлгіде болсын, сонда клиент оны бір жерде өңдей алады. Мысалы: <code>{"error": {"code": "not_found", "message": "Тауар табылмады"}}</code>. Status code жалпы санатты айтады, ал <code>code</code> өрісі нақты себепті айтады. Келесі сабақтарда роутер мен валидация дәл осы үлгіні қайтарады.</p>
<h3>Жиі қателер</h3>
<ul>
<li>URL-ға етістік жазу (<code>/deleteUser/5</code>) немесе бәрін <code>POST</code> арқылы жасау.</li>
<li>Қате болса да 200 қайтарып, body-де <code>{"error": ...}</code> жазу. Клиент status code-қа сенеді.</li>
<li>Пагинациясыз тізім: бүгін 50 жазба, бір жылдан кейін 500 000.</li>
</ul>
<div class="tip">API-ды жазбас бұрын endpoint кестесін (метод, path, сұрау, жауап, кодтар) бір бетке жазып шығыңыз. Бұл фронтенд әзірлеушімен келісудің ең арзан жолы.</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>crud_routes(resource)</code> функциясын жазыңыз. Ол <code>(method, path) → action</code> сөздігін қайтарсын. <code>crud_routes("products")</code> үшін: <code>("GET", "/products")</code> → <code>"list"</code>, <code>("POST", "/products")</code> → <code>"create"</code>, <code>("GET", "/products/&lt;id&gt;")</code> → <code>"retrieve"</code>, <code>PUT</code> → <code>"replace"</code>, <code>PATCH</code> → <code>"update"</code>, <code>DELETE</code> → <code>"delete"</code> (соңғы үшеуі де <code>/products/&lt;id&gt;</code>).', 
            starter: `def crud_routes(resource):
    return {("GET", "/get_" + resource): "list"}
`, 
            solution: `def crud_routes(resource):
    coll = "/" + resource
    item = coll + "/<id>"
    return {
        ("GET", coll): "list",
        ("POST", coll): "create",
        ("GET", item): "retrieve",
        ("PUT", item): "replace",
        ("PATCH", item): "update",
        ("DELETE", item): "delete",
    }
`, 
            hints: ['Екі path бар: жинақ <code>"/" + resource</code> және объект <code>"/" + resource + "/&lt;id&gt;"</code>.'], 
            check: { tests: `_r = crud_routes("products")
assert len(_r) == 6, "Алты маршрут болуы керек"
assert _r.get(("GET", "/products")) == "list" and _r.get(("POST", "/products")) == "create", "Жинақ: GET → list, POST → create"
assert _r.get(("GET", "/products/<id>")) == "retrieve", "GET /products/<id> → retrieve"
assert _r.get(("PUT", "/products/<id>")) == "replace" and _r.get(("PATCH", "/products/<id>")) == "update", "PUT → replace, PATCH → update"
assert _r.get(("DELETE", "/products/<id>")) == "delete", "DELETE /products/<id> → delete"
assert ("POST", "/cafes") in crud_routes("cafes"), "Функция кез келген ресурс атымен жұмыс істеуі керек"
` } },
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>paginate(items, page=1, per_page=10)</code> функциясын жазыңыз. Ол сөздік қайтарсын: <code>items</code> (осы беттің элементтері), <code>page</code>, <code>per_page</code>, <code>total</code> (барлық элемент саны), <code>pages</code> (бет саны, бос тізімде 0), <code>has_next</code> (келесі бет бар ма). <code>page &lt; 1</code> немесе <code>per_page</code> 1-100 аралығынан тыс болса, <code>ValueError</code>.', 
            starter: `def paginate(items, page=1, per_page=10):
    return {"items": items}
`, 
            solution: `import math

def paginate(items, page=1, per_page=10):
    if page < 1 or not 1 <= per_page <= 100:
        raise ValueError("page >= 1 және 1 <= per_page <= 100 болуы керек")
    total = len(items)
    pages = math.ceil(total / per_page)
    start = (page - 1) * per_page
    return {
        "items": items[start:start + per_page],
        "page": page,
        "per_page": per_page,
        "total": total,
        "pages": pages,
        "has_next": page < pages,
    }
`, 
            hints: ['Бет саны: <code>math.ceil(total / per_page)</code>.', 'Кесінді: <code>items[(page - 1) * per_page : page * per_page]</code>'], 
            check: { tests: `_cafes = [f"cafe-{i}" for i in range(1, 24)]
_p = paginate(_cafes, page=3, per_page=10)
assert _p["items"] == ["cafe-21", "cafe-22", "cafe-23"], "3-бет: соңғы үш элемент"
assert _p["total"] == 23 and _p["pages"] == 3, "total=23, pages=3"
assert _p["has_next"] is False, "Соңғы бетте has_next False"
_p1 = paginate(_cafes, page=1, per_page=10)
assert _p1["has_next"] is True and len(_p1["items"]) == 10 and _p1["page"] == 1 and _p1["per_page"] == 10, "1-бет: 10 элемент, has_next True"
assert paginate([], 1, 10)["pages"] == 0, "Бос тізімде pages = 0"
assert paginate(_cafes, page=5, per_page=10)["items"] == [], "Беттен тыс сұрауда бос тізім"
for _bad in [(0, 10), (1, 0), (1, 101)]:
    try:
        paginate(_cafes, *_bad)
        assert False, "Қате параметрде ValueError керек"
    except ValueError:
        pass
` } },
          { type: 'python', xp: 25, level: 'hard', prompt: 'Cursor пагинациясы. <code>items</code> тізімі <code>id</code> бойынша өсу ретімен сұрыпталған сөздіктерден тұрады. <code>after_cursor(items, after=None, limit=3)</code> <code>id &gt; after</code> болатын алғашқы <code>limit</code> элементті алсын (<code>after=None</code> болса, басынан). Нәтиже: <code>{"items": [...], "next": &lt;соңғы элемент id-і немесе None&gt;}</code>. <code>next</code> тек одан кейін тағы элемент болса ғана id болады.', 
            starter: `def after_cursor(items, after=None, limit=3):
    return {"items": items[:limit], "next": None}
`, 
            solution: `def after_cursor(items, after=None, limit=3):
    rest = [it for it in items if after is None or it["id"] > after]
    chunk = rest[:limit]
    nxt = chunk[-1]["id"] if len(rest) > limit else None
    return {"items": chunk, "next": nxt}
`, 
            hints: ['Алдымен <code>id &gt; after</code> элементтерді сүзіп алыңыз, сосын <code>[:limit]</code>.', '<code>next</code>: сүзілген тізім <code>limit</code>-тен ұзын болса ғана.'], 
            check: { tests: `_orders = [{"id": i, "total": i * 100} for i in [3, 5, 8, 9, 12, 15, 20]]
_a = after_cursor(_orders, limit=3)
assert [o["id"] for o in _a["items"]] == [3, 5, 8], "Басынан алғашқы үш"
assert _a["next"] == 8, "next = соңғы берілген id (8)"
_b = after_cursor(_orders, after=_a["next"], limit=3)
assert [o["id"] for o in _b["items"]] == [9, 12, 15] and _b["next"] == 15, "after=8: 9, 12, 15 және next=15"
_c = after_cursor(_orders, after=15, limit=3)
assert [o["id"] for o in _c["items"]] == [20] and _c["next"] is None, "Соңғы бетте next None"
assert after_cursor(_orders, after=12, limit=3)["next"] is None, "Тура limit элемент қалса да next None"
` } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: 'Клиент <code>POST /v1/payments</code> сұрауын жіберді, бірақ жауап келмей тұрып байланыс үзілді. Екі рет төлем алмау үшін ең дұрыс шешім қайсы?', options: ['POST орнына GET қолдану', 'Клиент әр төлемге бірегей <code>Idempotency-Key</code> header жібереді, сервер қайталанған кілтке бұрынғы жауапты қайтарады', 'Сервер 500 қайтарады', 'Клиент ешқашан қайта жібермейді'], answer: 1, explain: 'POST идемпотентті емес. Idempotency-Key серверге «бұл сол сұрау» екенін білуге мүмкіндік береді. GET деректі өзгертпеуі керек, сондықтан төлемге жарамайды.' }
        ]
      },
      {
        id: 'pyb-4', title: 'Роутинг: декоратормен өз роутеріңізді жазу', minutes: 16,
        body: `
<p>Сервер сұрауды талдап болды: <code>GET /users/42</code>. Енді қай функция жауап беруі керек? Бұл сұраққа <b>router</b> жауап береді. Flask-та ол былай көрінеді:</p>
<pre><code>@app.route("/users/&lt;id&gt;", methods=["GET"])
def get_user(id):
    ...</code></pre>
<p>Intermediate Python курсында декоратор функцияны қабылдап, функция қайтаратынын көрдіңіз. <code>app.route(...)</code> параметрлі декоратор: ол алдымен шақырылып, нағыз декораторды қайтарады, ал ол функцияны кестеге тіркейді де, <b>өзгертпей</b> қайтарады.</p>
<h3>Path үлгісін сәйкестендіру</h3>
<p>Үлгі мен path-ты <code>/</code> бойынша бөліктерге бөлеміз. Бөлік саны тең болуы керек. <code>&lt;id&gt;</code> түріндегі бөлік кез келген мәнді қабылдап, оны параметр ретінде сақтайды, қалғандары дәл сәйкес келуі керек.</p>
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
<h3>Шағын App класы</h3>
<pre><code>class App:
    def __init__(self):
        self.routes = []            # (pattern, methods, handler)

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
<p>Біздің handler-лер <code>(status, body)</code> жұбын қайтарады. Нағыз фреймворкте де дәл осы: жауап объектісі status, headers және body-ден тұрады.</p>
<h3>404 және 405 айырмасы</h3>
<p><b>404</b>: мұндай path мүлде жоқ. <b>405</b>: path бар, бірақ бұл метод рұқсат етілмеген, мысалы тек оқуға арналған мәзірге <code>POST</code>. Дұрыс сервер 405 жауабына <code>Allow: GET</code> header-ін қосады.</p>
<h3>Түрлендіргіштер (converters)</h3>
<p>Flask-та <code>&lt;int:id&gt;</code> жазуға болады: бөлік тек цифр болса сәйкес келеді және <code>int</code>-ке айналады. Сонда <code>/users/abc</code> handler-ге жетпей тұрып 404 береді, ал handler ішінде <code>int()</code> түрлендіру қажет емес.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Декоратор ішінде <code>return func</code> ұмыту: функцияның аты <code>None</code> болып қалады.</li>
<li>Соңғы <code>/</code>: <code>/users/42/</code> мен <code>/users/42</code> бірдей ме? Келісіп алыңыз (біз <code>strip("/")</code> жасаймыз).</li>
<li>Маршрут реті: <code>/users/me</code> мен <code>/users/&lt;id&gt;</code> болса, нақтысын бірінші тіркеңіз, әйтпесе <code>me</code> id ретінде ұсталады.</li>
</ul>
<div class="tip">FastAPI-да да идея сол: <code>@app.get("/users/{user_id}")</code>, ал <code>user_id: int</code> type hint-і түрлендіргіштің рөлін атқарады.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>match_path(pattern, path)</code> функциясын жазыңыз. Үлгідегі <code>&lt;name&gt;</code> бөлігі кез келген бос емес мәнді ұстайды. Сәйкес келсе, параметрлер сөздігін қайтарсын (параметр жоқ болса <code>{}</code>), сәйкес келмесе <code>None</code>. Басы мен соңындағы <code>/</code> маңызды емес.', 
            starter: `def match_path(pattern, path):
    if pattern == path:
        return {}
`, 
            solution: `def match_path(pattern, path):
    p_parts = pattern.strip("/").split("/")
    parts = path.strip("/").split("/")
    if len(p_parts) != len(parts):
        return None
    params = {}
    for p, v in zip(p_parts, parts):
        if p.startswith("<") and p.endswith(">"):
            if v == "":
                return None
            params[p[1:-1]] = v
        elif p != v:
            return None
    return params
`, 
            hints: ['Екеуін де <code>.strip("/").split("/")</code> арқылы бөліңіз, бөлік саны тең болсын.', 'Бөлік <code>&lt;</code>-пен басталып, <code>&gt;</code>-пен бітсе, ол параметр: <code>params[p[1:-1]] = v</code>.'], 
            check: { tests: `assert match_path("/users/<id>", "/users/42") == {"id": "42"}, "/users/<id> және /users/42 → {'id': '42'}"
assert match_path("/shops/<shop>/orders/<oid>", "/shops/almaty-1/orders/77/") == {"shop": "almaty-1", "oid": "77"}, "Екі параметр, соңғы / маңызды емес"
assert match_path("/health", "/health") == {}, "Параметрсіз сәйкестік: {}"
assert match_path("/users/<id>", "/users/42/orders") is None, "Бөлік саны әртүрлі: None"
assert match_path("/users/<id>", "/cafes/42") is None, "Тұрақты бөлік сәйкес емес: None"
` } },
          { type: 'python', xp: 30, level: 'hard', prompt: '<code>App</code> класын жазыңыз. <code>route(pattern, methods=("GET",))</code> декораторы handler-ді тіркеп, функцияны өзгертпей қайтарсын. <code>handle(method, path)</code>: сәйкес handler-ді path параметрлерімен (<code>**params</code>) шақырып, оның <code>(status, body)</code> нәтижесін қайтарсын; path бар, бірақ метод жоқ болса <code>(405, {"error": "method not allowed"})</code>; path жоқ болса <code>(404, {"error": "not found"})</code>. Берілген <code>match_path</code> функциясын қолданыңыз.', 
            starter: `def match_path(pattern, path):
    p_parts = pattern.strip("/").split("/")
    parts = path.strip("/").split("/")
    if len(p_parts) != len(parts):
        return None
    params = {}
    for p, v in zip(p_parts, parts):
        if p.startswith("<") and p.endswith(">"):
            params[p[1:-1]] = v
        elif p != v:
            return None
    return params

class App:
    def __init__(self):
        self.routes = []

    def route(self, pattern, methods=("GET",)):
        def decorator(func):
            pass
        return decorator

    def handle(self, method, path):
        return 404, {"error": "not found"}
`, 
            solution: `def match_path(pattern, path):
    p_parts = pattern.strip("/").split("/")
    parts = path.strip("/").split("/")
    if len(p_parts) != len(parts):
        return None
    params = {}
    for p, v in zip(p_parts, parts):
        if p.startswith("<") and p.endswith(">"):
            params[p[1:-1]] = v
        elif p != v:
            return None
    return params

class App:
    def __init__(self):
        self.routes = []

    def route(self, pattern, methods=("GET",)):
        def decorator(func):
            self.routes.append((pattern, set(methods), func))
            return func
        return decorator

    def handle(self, method, path):
        path_found = False
        for pattern, methods, func in self.routes:
            params = match_path(pattern, path)
            if params is None:
                continue
            path_found = True
            if method in methods:
                return func(**params)
        if path_found:
            return 405, {"error": "method not allowed"}
        return 404, {"error": "not found"}
`, 
            hints: ['Декоратор ішінде: <code>self.routes.append((pattern, set(methods), func))</code>, сосын <code>return func</code>.', 'Path сәйкес келгенін жалауша (<code>path_found = True</code>) арқылы есте сақтаңыз, сонда 404 мен 405-ті ажырата аласыз.'], 
            check: { tests: `_app = App()
@_app.route("/cafes/<cafe_id>/menu")
def _menu(cafe_id):
    return 200, {"cafe": cafe_id}
@_app.route("/orders", methods=["POST"])
def _create():
    return 201, {"id": 1}
@_app.route("/orders", methods=["GET"])
def _list():
    return 200, []
assert _menu is not None and _menu("x") == (200, {"cafe": "x"}), "Декоратор функцияны өзгертпей қайтаруы керек"
assert _app.handle("GET", "/cafes/7/menu") == (200, {"cafe": "7"}), "Path параметрі handler-ге берілуі керек"
assert _app.handle("POST", "/orders") == (201, {"id": 1}), "POST /orders → create"
assert _app.handle("GET", "/orders") == (200, []), "Бір path-қа екі түрлі метод тіркеуге болады"
assert _app.handle("DELETE", "/orders") == (405, {"error": "method not allowed"}), "Path бар, метод жоқ: 405"
assert _app.handle("GET", "/buses/12") == (404, {"error": "not found"}), "Path жоқ: 404"
` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Түрлендіргіш қосыңыз. <code>match_typed(pattern, path)</code> <code>match_path</code> сияқты, бірақ <code>&lt;int:name&gt;</code> бөлігі тек цифрлардан тұрса сәйкес келіп, мәнді <code>int</code>-ке айналдырсын (әйтпесе <code>None</code>). Қарапайым <code>&lt;name&gt;</code> бұрынғыдай жол болып қалсын.', 
            starter: `def match_typed(pattern, path):
    return None
`, 
            solution: `def match_typed(pattern, path):
    p_parts = pattern.strip("/").split("/")
    parts = path.strip("/").split("/")
    if len(p_parts) != len(parts):
        return None
    params = {}
    for p, v in zip(p_parts, parts):
        if p.startswith("<") and p.endswith(">"):
            inner = p[1:-1]
            if inner.startswith("int:"):
                if not v.isdigit():
                    return None
                params[inner[4:]] = int(v)
            else:
                params[inner] = v
        elif p != v:
            return None
    return params
`, 
            hints: ['<code>inner = p[1:-1]</code>; егер <code>inner.startswith("int:")</code> болса, атауы <code>inner[4:]</code>.', 'Цифр тексерісі: <code>v.isdigit()</code>'], 
            check: { tests: `assert match_typed("/users/<int:id>", "/users/42") == {"id": 42}, "<int:id> мәні int болуы керек: 42"
assert match_typed("/users/<int:id>", "/users/abc") is None, "Цифр емес мән <int:...> үлгісіне сәйкес келмейді"
assert match_typed("/cities/<name>/stops/<int:n>", "/cities/Taraz/stops/5") == {"name": "Taraz", "n": 5}, "Аралас: жол және int"
assert match_typed("/health", "/health") == {}, "Параметрсіз: {}"
assert match_typed("/users/<int:id>", "/users/1/2") is None, "Бөлік саны әртүрлі: None"
` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: 'Роутерде тек <code>GET /menu</code> тіркелген. Клиент <code>DELETE /menu</code> жіберсе, қандай код дұрыс?', options: ['200', '404 Not Found', '405 Method Not Allowed', '500 Internal Server Error'], answer: 2, explain: 'Path бар, бірақ метод рұқсат етілмеген: 405. 404 path мүлде табылмағанда беріледі.' }
        ]
      },
      {
        id: 'pyb-5', title: 'Валидация және қателер: 400, 422, өз exception-дарыңыз', minutes: 15,
        body: `
<p>Сервер ешқашан клиентке сенбеуі керек. Мобильді қосымша ескі нұсқада болуы мүмкін, біреу <code>curl</code> арқылы кез келген мәтін жібере алады. Сондықтан әр кіріс дерек <b>валидациядан</b> өтеді, ал қате болса, клиент не дұрыс емес екенін нақты біледі.</p>
<h3>400 пе, әлде 422 ме?</h3>
<ul>
<li><b>400 Bad Request</b>: сұрауды мүлде оқу мүмкін емес. Мысалы, JSON бұзық: <code>{"name": "Дана",</code>.</li>
<li><b>422 Unprocessable Entity</b>: JSON дұрыс оқылды, бірақ мәндері ережеге сай емес: <code>{"age": -5}</code>.</li>
</ul>
<p>Кей командалар екеуіне де 400 қолданады. Маңыздысы: бір API ішінде бірізді болу және қатені түсінікті body-мен қайтару.</p>
<h3>Қате body: өріс бойынша</h3>
<pre><code>422 Unprocessable Entity
{"errors": {"email": "email форматы қате", "age": "18-ден үлкен болуы керек"}}</code></pre>
<p>Барлық қатені бір рет жинап қайтарған дұрыс: пайдаланушы форманы бір рет түзетеді, бес рет емес.</p>
<h3>dataclass: сұрау моделі</h3>
<p><code>dataclass</code> <code>__init__</code>, <code>__repr__</code>, <code>__eq__</code> әдістерін өзі жазады. Бұл FastAPI-дағы Pydantic модельдерінің қарапайым нұсқасы.</p>
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
<p>Назар аударыңыз: <code>isinstance(True, int)</code> Python-да <code>True</code>, себебі <code>bool</code> <code>int</code>-тің ұрпағы. Сондықтан bool-ды бөлек тексереміз.</p>
<h3>Өз exception класстарыңыз</h3>
<p>Терең функциялардан <code>(status, body)</code> қайтарып, оны жоғары қарай тасу ыңғайсыз. Оның орнына exception шығарып, бір жерде ұстаймыз:</p>
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
<p>Енді handler ішінде жай ғана <code>raise NotFound("кофехана табылмады")</code> жазасыз, ал <code>safe</code> декораторы оны дұрыс жауапқа айналдырады. Flask-та бұл <code>@app.errorhandler</code>, FastAPI-да <code>HTTPException</code>.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Бірінші қатеде тоқтап, қалғандарын айтпау.</li>
<li><code>except Exception</code> арқылы бәрін ұстап, 200 қайтару: нағыз bug-тар жасырынып қалады.</li>
<li>Қате хабарламасында ішкі мәліметті (SQL, traceback, құпия сөз) көрсету.</li>
</ul>
<div class="tip">Валидацияны шекарада (сұрау кірген жерде) бір рет жасаңыз. Ішкі функциялар таза, тексерілген деректермен жұмыс істесін.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>validate_order(data)</code> қателер сөздігін қайтарсын (қате жоқ болса <code>{}</code>). Ережелер: <code>drink</code> <code>MENU</code> ішінде болуы керек, әйтпесе <code>"drink": "мәзірде жоқ"</code>. <code>qty</code> 1-10 аралығындағы бүтін сан (bool емес), әйтпесе <code>"qty": "1-10 бүтін сан"</code>. <code>size</code> міндетті емес, бірақ берілсе <code>"S"</code>, <code>"M"</code>, <code>"L"</code> болуы керек, әйтпесе <code>"size": "S, M немесе L"</code>.', 
            starter: `MENU = {"latte", "americano", "cappuccino", "raf"}

def validate_order(data):
    errors = {}
    if data["drink"] not in MENU:
        return {"drink": "мәзірде жоқ"}
    return errors
`, 
            solution: `MENU = {"latte", "americano", "cappuccino", "raf"}

def validate_order(data):
    errors = {}
    if data.get("drink") not in MENU:
        errors["drink"] = "мәзірде жоқ"
    qty = data.get("qty")
    if not isinstance(qty, int) or isinstance(qty, bool) or not 1 <= qty <= 10:
        errors["qty"] = "1-10 бүтін сан"
    if "size" in data and data["size"] not in ("S", "M", "L"):
        errors["size"] = "S, M немесе L"
    return errors
`, 
            hints: ['Кілт жоқ болуы мүмкін: <code>data.get("drink")</code>.', 'Bool-ды бөлек тексеріңіз: <code>isinstance(qty, bool)</code>.'], 
            check: { tests: `assert validate_order({"drink": "latte", "qty": 2}) == {}, "Дұрыс тапсырыста қате жоқ"
assert validate_order({"drink": "latte", "qty": 2, "size": "L"}) == {}, "size L дұрыс"
assert validate_order({"drink": "kumys", "qty": 0, "size": "XL"}) == {"drink": "мәзірде жоқ", "qty": "1-10 бүтін сан", "size": "S, M немесе L"}, "Барлық қатені бірге жинау керек"
assert validate_order({}) == {"drink": "мәзірде жоқ", "qty": "1-10 бүтін сан"}, "Бос сөздік: drink және qty қатесі (size міндетті емес)"
assert validate_order({"drink": "raf", "qty": True}) == {"qty": "1-10 бүтін сан"}, "True саны емес"
assert validate_order({"drink": "raf", "qty": "2"}) == {"qty": "1-10 бүтін сан"}, "Жол түріндегі сан жарамайды"
` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Exception иерархиясын жазыңыз: <code>ApiError(Exception)</code> (<code>status = 500</code>, конструкторы <code>message</code> қабылдап, <code>self.message</code>-ке сақтайды), одан мұрагер <code>NotFound</code> (404) және <code>Forbidden</code> (403). <code>safe(handler)</code> декораторы <code>ApiError</code>-ды ұстап, <code>(e.status, {"error": e.message})</code> қайтарсын, ал басқа exception-дарды ұстамасын.', 
            starter: `class ApiError(Exception):
    pass

def safe(handler):
    return handler
`, 
            solution: `class ApiError(Exception):
    status = 500

    def __init__(self, message):
        super().__init__(message)
        self.message = message

class NotFound(ApiError):
    status = 404

class Forbidden(ApiError):
    status = 403

def safe(handler):
    def wrapper(*args, **kwargs):
        try:
            return handler(*args, **kwargs)
        except ApiError as e:
            return e.status, {"error": e.message}
    return wrapper
`, 
            hints: ['Мұрагер класта тек <code>status = 404</code> жазу жеткілікті.', '<code>except ApiError as e:</code> мұрагерлердің бәрін ұстайды.'], 
            check: { tests: `CAFES = {1: "Kofe Bar, Астана"}
@safe
def _get_cafe(cid, role="guest"):
    if role == "banned":
        raise Forbidden("рұқсат жоқ")
    if cid not in CAFES:
        raise NotFound("кофехана табылмады")
    return 200, {"name": CAFES[cid]}
assert issubclass(NotFound, ApiError) and issubclass(Forbidden, ApiError), "NotFound пен Forbidden ApiError-дан мұрагер"
assert _get_cafe(1) == (200, {"name": "Kofe Bar, Астана"}), "Қатесіз жағдайда handler нәтижесі өзгермейді"
assert _get_cafe(9) == (404, {"error": "кофехана табылмады"}), "NotFound → 404"
assert _get_cafe(1, role="banned") == (403, {"error": "рұқсат жоқ"}), "Forbidden → 403"
def _boom():
    raise ApiError("boom")
assert safe(_boom)() == (500, {"error": "boom"}), "ApiError → 500"
try:
    safe(lambda: 1 / 0)()
    assert False, "ZeroDivisionError ұсталмауы керек"
except ZeroDivisionError:
    pass
` } },
          { type: 'python', xp: 25, level: 'hard', prompt: '<code>create_student(raw_body)</code> handler-ін жазыңыз. JSON оқылмаса немесе объект (dict) болмаса: <code>(400, {"error": "invalid json"})</code>. Валидация: <code>name</code> бос емес жол, <code>grade</code> 1-11 бүтін сан (bool емес). Қате болса <code>(422, {"errors": {...}})</code>, өріс кілттері <code>"name"</code>, <code>"grade"</code> (хабарлама мәтіні еркін). Дұрыс болса <code>Student</code> dataclass-ын (<code>name: str</code>, <code>grade: int</code>, <code>city: str = "Қарағанды"</code>) құрып, <code>(201, asdict(student))</code> қайтарсын; name-ді <code>strip</code> етіңіз.', 
            starter: `import json
from dataclasses import dataclass, asdict

def create_student(raw_body):
    data = json.loads(raw_body)
    return 201, data
`, 
            solution: `import json
from dataclasses import dataclass, asdict

@dataclass
class Student:
    name: str
    grade: int
    city: str = "Қарағанды"

def create_student(raw_body):
    try:
        data = json.loads(raw_body)
    except json.JSONDecodeError:
        return 400, {"error": "invalid json"}
    if not isinstance(data, dict):
        return 400, {"error": "invalid json"}
    errors = {}
    name = data.get("name")
    if not isinstance(name, str) or not name.strip():
        errors["name"] = "аты міндетті"
    grade = data.get("grade")
    if not isinstance(grade, int) or isinstance(grade, bool) or not 1 <= grade <= 11:
        errors["grade"] = "1-11 бүтін сан"
    if errors:
        return 422, {"errors": errors}
    student = Student(name.strip(), grade, data.get("city", "Қарағанды"))
    return 201, asdict(student)
`, 
            hints: ['<code>json.loads</code>-ты <code>try/except json.JSONDecodeError</code> ішіне алыңыз.', 'Нәтиже: <code>Student(name.strip(), grade, data.get("city", "Қарағанды"))</code>'], 
            check: { tests: `from dataclasses import is_dataclass
assert is_dataclass(Student), "Student dataclass болуы керек"
assert create_student('{"name": " Айгерім ", "grade": 9}') == (201, {"name": "Айгерім", "grade": 9, "city": "Қарағанды"}), "Дұрыс сұрау: 201, city әдепкі мәні"
assert create_student('{"name": "Ерлан", "grade": 11, "city": "Павлодар"}')[1]["city"] == "Павлодар", "city берілсе, сол қолданылады"
assert create_student('{"name": "Дана", ') == (400, {"error": "invalid json"}), "Бұзық JSON: 400"
assert create_student('[1, 2]') == (400, {"error": "invalid json"}), "Объект емес JSON: 400"
_s, _b = create_student('{"name": "", "grade": 12}')
assert _s == 422 and set(_b["errors"]) == {"name", "grade"}, "Екі өріс те қате: 422 және екі кілт"
_s, _b = create_student('{"name": "Тимур", "grade": true}')
assert _s == 422 and set(_b["errors"]) == {"grade"}, "true сынып нөмірі емес"
` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: 'Клиент <code>{"email": "dana@mail", "age": "жиырма"}</code> жіберді. JSON дұрыс оқылды, бірақ мәндер ережеге сай емес. Қай код ең дәл?', options: ['200 OK', '400 Bad Request', '422 Unprocessable Entity', '500 Internal Server Error'], answer: 2, explain: 'JSON синтаксисі дұрыс, бірақ мағынасы тексеруден өтпеді, бұл 422. 400 сұрауды мүлде оқу мүмкін болмағанда беріледі, 500 сервердің өз қатесі.' }
        ]
      },
      {
        id: 'pyb-6', title: 'ORM идеясы: модельдер, repository, N+1', minutes: 16,
        body: `
<p>SQL курсында кестелерге <code>SELECT</code>, <code>INSERT</code> сұрауларын тікелей жаздыңыз. Backend-те әр handler-ге SQL жолын жазу тез шаршатады және қате көп. <b>ORM</b> (Object-Relational Mapping) кестені класқа, жолды объектіге айналдырады: SQLAlchemy, Django ORM, Peewee.</p>
<h3>Модель = кесте, объект = жол</h3>
<pre><code># Django стилі (түсіну үшін)
class Cafe(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    rating = models.FloatField()

Cafe.objects.filter(city="Астана").order_by("-rating")[:5]
# SELECT * FROM cafe WHERE city = 'Астана' ORDER BY rating DESC LIMIT 5</code></pre>
<p>Соңғы жол SQL-ге айналады. Маңызды ерекшелік: <code>filter</code> мен <code>order_by</code> сұрауды бірден орындамайды, тек <b>QuerySet</b> құрастырады. Дерекқорға нәтиже шынымен керек болғанда (цикл, <code>list()</code>, <code>len()</code>) ғана барады. Бұл <b>lazy</b> есептеу.</p>
<h3>Жадтағы repository</h3>
<p>ORM-ның ішкі идеясын түсіну үшін оны тізімнің үстіне жазайық. <b>Repository</b> үлгісі деректі сақтау тәсілін жасырады: handler <code>repo.get(5)</code> шақырады, ал астында SQLite ма, PostgreSQL ма, жай тізім бе, оған бәрібір. Тесттерде жадтағы нұсқасын қолдану сондықтан ыңғайлы.</p>
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
<p><code>**kw</code> атаулы аргументтерді сөздікке жинайды, ал <code>getattr(o, "city")</code> <code>o.city</code> дегенмен бірдей. Django-дағы <code>rating__gte=4.5</code> сияқты синтаксис кілтті <code>__</code> бойынша бөліп, өріс пен операторды алады.</p>
<h3>Migrations</h3>
<p>Модельге жаңа өріс қостыңыз (<code>phone</code>). Дерекқордағы кесте өздігінен өзгермейді. <b>Migration</b> деп схеманың нұсқаланған өзгерісін айтады: <code>0003_add_phone.py</code> файлы <code>ALTER TABLE cafe ADD COLUMN phone</code> орындайды. Migration файлдары git-те сақталады, барлық орта (ноутбук, тест, production) оларды бір ретпен қолданады. Құралдар: Alembic, <code>python manage.py migrate</code>.</p>
<h3>N+1 мәселесі</h3>
<pre><code>orders = Order.objects.all()           # 1 сұрау
for o in orders:
    print(o.customer.name)             # әр тапсырысқа +1 сұрау!</code></pre>
<p>100 тапсырыс болса, 101 сұрау кетеді. Әр сұрау желі арқылы 2 мс болса да, бет 200 мс кешігеді. Шешім: байланысты деректі <b>бір сұраумен</b> алдын ала алу. SQL-де <code>JOIN</code> немесе <code>WHERE id IN (...)</code>, Django-да <code>select_related("customer")</code> / <code>prefetch_related</code>, SQLAlchemy-де <code>joinedload</code>.</p>
<h3>Жиі қателер</h3>
<ul>
<li>ORM-ды «SQL білу қажет емес» деп ойлау: баяу сұрауды табу үшін ол генерациялайтын SQL-ді оқи білу керек.</li>
<li>Цикл ішінде байланыс өрісіне жүгіну (N+1).</li>
<li>Migration-сыз модельді өзгерту: production-да «column does not exist» қатесі.</li>
</ul>
<div class="tip">Dev ортада ORM-ның SQL логын қосыңыз (Django: <code>connection.queries</code>, SQLAlchemy: <code>echo=True</code>). Бір бет 50 сұрау жасап жатса, N+1 бар деген сөз.</div>`,
        exercises: [
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>Repo</code> класын жазыңыз: <code>add(obj)</code> объектіге 1-ден бастап өсетін <code>id</code> беріп, сақтап, объектіні қайтарсын. <code>get(id)</code> объектіні немесе <code>None</code> қайтарсын. <code>all()</code> қосылу ретімен тізім қайтарсын. <code>delete(id)</code> өшіріп, <code>True</code> қайтарсын, ал жоқ болса <code>False</code>.', 
            starter: `from dataclasses import dataclass

@dataclass
class Bus:
    route: str
    city: str
    id: int = None

class Repo:
    def __init__(self):
        self.rows = {}
`, 
            solution: `from dataclasses import dataclass

@dataclass
class Bus:
    route: str
    city: str
    id: int = None

class Repo:
    def __init__(self):
        self.rows = {}
        self.next_id = 1

    def add(self, obj):
        obj.id = self.next_id
        self.rows[obj.id] = obj
        self.next_id += 1
        return obj

    def get(self, id):
        return self.rows.get(id)

    def all(self):
        return list(self.rows.values())

    def delete(self, id):
        if id in self.rows:
            del self.rows[id]
            return True
        return False
`, 
            hints: ['Келесі id-ді <code>self.next_id</code> санауышында сақтаңыз: өшірілген id қайта берілмеуі керек.'], 
            check: { tests: `_r = Repo()
_a = _r.add(Bus("92", "Алматы")); _b = _r.add(Bus("10", "Астана"))
assert (_a.id, _b.id) == (1, 2), "id 1-ден бастап өседі"
assert _r.get(2) is _b and _r.get(7) is None, "get: объект немесе None"
assert [x.route for x in _r.all()] == ["92", "10"], "all: қосылу реті"
assert _r.delete(1) is True and _r.delete(1) is False, "delete: бірінші рет True, қайта False"
assert _r.add(Bus("37", "Шымкент")).id == 3, "Өшірілген id қайта берілмейді: келесі id 3"
` } },
          { type: 'python', xp: 30, level: 'hard', prompt: 'Шағын <code>QuerySet</code> жазыңыз. Конструктор объектілер тізімін алады. <code>filter(**kw)</code>: <code>city="Алматы"</code> дәл сәйкестік, <code>rating__gte=4.5</code> (≥), <code>rating__lt=4</code> (&lt;), <code>name__contains="Kofe"</code>. <code>order_by(field)</code>: <code>"-rating"</code> кему ретімен. Екеуі де <b>жаңа</b> QuerySet қайтарады (тізбектеуге болады, бастапқысы өзгермейді). <code>all()</code> тізім, <code>count()</code> сан, <code>first()</code> бірінші объект немесе <code>None</code>.', 
            starter: `from dataclasses import dataclass

@dataclass
class Cafe:
    name: str
    city: str
    rating: float

class QuerySet:
    def __init__(self, items):
        self.items = list(items)

    def all(self):
        return self.items
`, 
            solution: `from dataclasses import dataclass

@dataclass
class Cafe:
    name: str
    city: str
    rating: float

class QuerySet:
    OPS = {
        "exact": lambda a, b: a == b,
        "gte": lambda a, b: a >= b,
        "lt": lambda a, b: a < b,
        "contains": lambda a, b: b in a,
    }

    def __init__(self, items):
        self.items = list(items)

    def filter(self, **kw):
        result = self.items
        for key, value in kw.items():
            field, _, op = key.partition("__")
            test = self.OPS[op or "exact"]
            result = [o for o in result if test(getattr(o, field), value)]
        return QuerySet(result)

    def order_by(self, field):
        desc = field.startswith("-")
        name = field.lstrip("-")
        return QuerySet(sorted(self.items, key=lambda o: getattr(o, name), reverse=desc))

    def all(self):
        return list(self.items)

    def count(self):
        return len(self.items)

    def first(self):
        return self.items[0] if self.items else None
`, 
            hints: ['Кілтті бөліңіз: <code>field, _, op = key.partition("__")</code>; <code>op</code> бос болса, бұл дәл сәйкестік.', 'Сұрыптау: <code>sorted(self.items, key=lambda o: getattr(o, name), reverse=desc)</code>'], 
            check: { tests: `_qs = QuerySet([Cafe("Kofe Bar", "Астана", 4.6), Cafe("Daily Cup", "Алматы", 4.8), Cafe("Kofe Lab", "Алматы", 4.1), Cafe("Bean", "Алматы", 3.7), Cafe("Steppe", "Астана", 4.9)])
assert [c.name for c in _qs.filter(city="Алматы").all()] == ["Daily Cup", "Kofe Lab", "Bean"], "filter(city=...) дәл сәйкестік"
assert _qs.filter(city="Алматы", rating__gte=4.1).count() == 2, "Бірнеше шарт: city және rating__gte"
assert [c.name for c in _qs.filter(rating__lt=4).all()] == ["Bean"], "rating__lt=4"
assert [c.name for c in _qs.filter(name__contains="Kofe").order_by("-rating").all()] == ["Kofe Bar", "Kofe Lab"], "contains және кему ретімен сұрыптау"
assert _qs.order_by("rating").first().name == "Bean", "order_by('rating') өсу реті"
assert _qs.filter(city="Тараз").first() is None, "Нәтиже бос болса first() None"
assert _qs.count() == 5, "filter бастапқы QuerySet-ті өзгертпеуі керек"
assert isinstance(_qs.filter(city="Астана"), QuerySet), "filter жаңа QuerySet қайтарады"
` } },
          { type: 'python', xp: 25, level: 'medium', prompt: 'N+1 мәселесін шешіңіз. <code>FakeDB</code> әр әдіс шақыруын <code>db.queries</code>-те санайды. <code>order_lines(db)</code> әр тапсырыс үшін <code>(order_id, customer_name)</code> тізімін қайтарсын (тапсырыстар реті сақталсын), бірақ барлығы <b>2 сұраудан</b> аспасын: <code>get_orders()</code> және <code>get_customers(ids)</code>.', 
            starter: `class FakeDB:
    def __init__(self, orders, customers):
        self._orders, self._customers, self.queries = orders, customers, 0
    def get_orders(self):
        self.queries += 1
        return list(self._orders)
    def get_customer(self, cid):
        self.queries += 1
        return self._customers[cid]
    def get_customers(self, ids):
        self.queries += 1
        return {i: self._customers[i] for i in set(ids)}

def order_lines(db):
    result = []
    for o in db.get_orders():
        result.append((o["id"], db.get_customer(o["customer_id"])["name"]))
    return result
`, 
            solution: `class FakeDB:
    def __init__(self, orders, customers):
        self._orders, self._customers, self.queries = orders, customers, 0
    def get_orders(self):
        self.queries += 1
        return list(self._orders)
    def get_customer(self, cid):
        self.queries += 1
        return self._customers[cid]
    def get_customers(self, ids):
        self.queries += 1
        return {i: self._customers[i] for i in set(ids)}

def order_lines(db):
    orders = db.get_orders()
    customers = db.get_customers([o["customer_id"] for o in orders])
    return [(o["id"], customers[o["customer_id"]]["name"]) for o in orders]
`, 
            hints: ['Алдымен барлық <code>customer_id</code>-ді жинап, <code>get_customers</code>-ті бір рет шақырыңыз.'], 
            check: { tests: `_cust = {1: {"name": "Әли"}, 2: {"name": "Сая"}, 3: {"name": "Мадина"}}
_ords = [{"id": 100 + i, "customer_id": (i % 3) + 1} for i in range(30)]
_db = FakeDB(_ords, _cust)
_res = order_lines(_db)
assert _res[:4] == [(100, "Әли"), (101, "Сая"), (102, "Мадина"), (103, "Әли")], "Нәтиже: (order_id, customer_name), тапсырыс реті сақталады"
assert len(_res) == 30, "Барлық 30 тапсырыс керек"
assert _db.queries <= 2, "N+1: 30 тапсырысқа 2-ден көп сұрау кетпеуі керек"
` } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: 'Модельге <code>phone</code> өрісін қостыңыз, бірақ migration жасамай deploy еттіңіз. Не болады?', options: ['ORM кестені өзі автоматты өзгертеді', 'Дерекқорда бұл баған жоқ, сондықтан оған жүгінгенде қате шығады (мысалы, «column does not exist»)', 'Ештеңе болмайды', 'Барлық ескі деректер өшеді'], answer: 1, explain: 'Модель класы кодта, ал кесте дерекқорда. Migration оларды үйлестіреді. Онсыз ORM жоқ бағанды сұрап, қате алады.' }
        ]
      },
      {
        id: 'pyb-7', title: 'Аутентификация және рұқсаттар: hash, token, рөлдер', minutes: 18,
        body: `
<p>Екі сұрақты ажыратыңыз. <b>Authentication</b>: сен кімсің? (логин мен құпия сөз). <b>Authorization</b>: саған не істеуге болады? (бариста тапсырысты көреді, бірақ мәзір бағасын өзгерте алмайды). Біріншісі сәтсіз болса <b>401</b>, екіншісі сәтсіз болса <b>403</b>.</p>
<h3>Құпия сөзді ешқашан ашық сақтамаңыз</h3>
<p>Дерекқор ұрланса, ашық құпия сөздер бірден басқа сайттарда қолданылады. Сондықтан сақтайтынымыз <b>hash</b>. Бірақ жай <code>sha256(password)</code> жеткіліксіз:</p>
<ul>
<li>Бірдей құпия сөздің hash-ы бірдей, сондықтан дайын кестелермен (rainbow table) тез табылады. Шешімі: әр пайдаланушыға кездейсоқ <b>salt</b> (<code>os.urandom(16)</code>).</li>
<li>SHA-256 өте жылдам: видеокарта секундына миллиардтаған нұсқаны тексереді. Шешімі: hash-ты мыңдаған рет қайталау (<b>key stretching</b>).</li>
</ul>
<pre><code>import hashlib, hmac, os

salt = os.urandom(16)
stored = hashlib.pbkdf2_hmac("sha256", b"qwerty123", salt, 600_000)

def check(password, salt, stored):
    candidate = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 600_000)
    return hmac.compare_digest(candidate, stored)</code></pre>
<p><b>PBKDF2</b> ішінде HMAC-ты қайта-қайта есептеп, нәтижелерді XOR арқылы біріктіреді. <code>hmac.compare_digest</code> салыстыруды тұрақты уақытта жасайды, сондықтан шабуылдаушы жауап уақытына қарап символдарды болжай алмайды. Production-да bcrypt немесе Argon2 кітапханалары да кең қолданылады. Браузердегі Python-да <code>pbkdf2_hmac</code> жоқ, сондықтан тапсырмада оны <code>hmac</code> арқылы өзіңіз жазасыз: бұл алгоритмді түсінудің ең жақсы жолы.</p>
<h3>Session немесе token</h3>
<table>
<tr><th></th><th>Session</th><th>Token (мысалы, JWT)</th></tr>
<tr><td>Сервер не сақтайды</td><td><code>session_id → user</code> кестесі</td><td>ештеңе: token өзі қол қойылған</td></tr>
<tr><td>Клиент не жібереді</td><td><code>Cookie: sid=...</code></td><td><code>Authorization: Bearer ...</code></td></tr>
<tr><td>Шығару (logout)</td><td>жазбаны өшіру жеткілікті</td><td>қиын: мерзімі бітуін күту не қара тізім</td></tr>
<tr><td>Қайда ыңғайлы</td><td>классикалық сайт</td><td>мобильді қосымша, микросервистер</td></tr>
</table>
<h3>Қол қойылған token</h3>
<pre><code>import base64, json
payload = {"user": 7, "role": "barista", "exp": 1767225600}
body = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
sig = hmac.new(b"server-secret", body.encode(), hashlib.sha256).hexdigest()
token = body + "." + sig</code></pre>
<p>Token-ді кез келген адам оқи алады (base64 шифр емес!), бірақ <b>өзгерте алмайды</b>: <code>role</code>-ды <code>admin</code>-ге ауыстырса, қолтаңба сәйкес келмейді. Сондықтан token-ге құпия дерек салмаймыз, ал <code>exp</code> өрісімен мерзімін шектейміз. JWT дәл осылай құрылған, тек үш бөліктен тұрады: header, payload, signature.</p>
<h3>Рөлдер мен рұқсаттар</h3>
<pre><code>ROLES = {"barista": {"orders:read"}, "manager": {"orders:read", "menu:edit"}}
def can(user, perm):
    return perm in ROLES.get(user["role"], set())</code></pre>
<p>Кодта <code>if role == "manager"</code> деп жазудың орнына рұқсат атауын тексеріңіз: жаңа рөл қосқанда кодты өзгертпейсіз.</p>
<h3>OAuth 2.0 (тек идея)</h3>
<p>«Google арқылы кіру» батырмасы OAuth 2.0 <b>authorization code</b> ағымын қолданады:</p>
<ul>
<li>Сайт пайдаланушыны Google-дың кіру бетіне жібереді, сұрайтын рұқсаттарын (<b>scope</b>: email, profile) көрсетеді.</li>
<li>Пайдаланушы келісім береді, Google оны сайтқа қысқа мерзімді <b>code</b>-пен қайтарады.</li>
<li>Сайттың сервері code-ты өз құпия кілтімен <b>access token</b>-ге (кейде refresh token-ге де) айырбастайды.</li>
<li>Сервер access token арқылы Google API-дан пайдаланушының email-ін алады.</li>
</ul>
<p>Маңызды нәтиже: сайт пайдаланушының Google құпия сөзін ешқашан көрмейді.</p>
<h3>Жиі қателер</h3>
<ul>
<li><code>==</code> арқылы hash салыстыру, salt-сыз немесе жылдам hash.</li>
<li>Секрет кілтті кодқа жазып, git-ке салу (оны env айнымалыда сақтаңыз, 11-сабақ).</li>
<li>Тексерілмеген token payload-ына сену.</li>
</ul>
<div class="tip">Аутентификацияны өзіңіз ойлап таппаңыз: production-да тексерілген кітапханаларды қолданыңыз. Бұл сабақтың мақсаты: олардың іште не істейтінін түсіну.</div>`,
        exercises: [
          { type: 'python', xp: 30, level: 'hard', prompt: 'PBKDF2-HMAC-SHA256 алгоритмін (32 байтқа бір блок) жазыңыз: <code>pbkdf2_sha256(password, salt, iterations)</code> hex жол қайтарсын. Қадамдар: <code>U = HMAC(password, salt + b"\\x00\\x00\\x00\\x01")</code>, нәтиже <code>T = U</code>; сосын <code>iterations - 1</code> рет: <code>U = HMAC(password, U)</code>, <code>T = T XOR U</code> (байт бойынша). HMAC: <code>hmac.new(password.encode(), msg, hashlib.sha256).digest()</code>. Сосын <code>verify_password(password, salt, iterations, stored_hex)</code>: <code>hmac.compare_digest</code> арқылы салыстырсын.', 
            starter: `import hashlib, hmac

def pbkdf2_sha256(password, salt, iterations):
    return hashlib.sha256(password.encode() + salt).hexdigest()

def verify_password(password, salt, iterations, stored_hex):
    return pbkdf2_sha256(password, salt, iterations) == stored_hex
`, 
            solution: `import hashlib, hmac

def pbkdf2_sha256(password, salt, iterations):
    key = password.encode()
    u = hmac.new(key, salt + b"\\x00\\x00\\x00\\x01", hashlib.sha256).digest()
    t = bytearray(u)
    for _ in range(iterations - 1):
        u = hmac.new(key, u, hashlib.sha256).digest()
        for i in range(len(t)):
            t[i] ^= u[i]
    return bytes(t).hex()

def verify_password(password, salt, iterations, stored_hex):
    return hmac.compare_digest(pbkdf2_sha256(password, salt, iterations), stored_hex)
`, 
            hints: ['XOR үшін <code>t = bytearray(u)</code>, сосын циклде <code>t[i] ^= u[i]</code>.', 'Соңында <code>bytes(t).hex()</code>.'], mustInclude: ['compare_digest'], 
            check: { tests: `assert pbkdf2_sha256("a", b"s", 1) == "4f5b39c97eaa4ecb0904d5f9ad05f7c02fc72ffc386f1bdd3c6f53d19944e258", "1 итерация: HMAC(password, salt + 00000001)"
assert pbkdf2_sha256("Сәлем2026", b"nmb", 5) == "19f4f0a49306f0eb5c1044c62eb6c48e2ea8ca5278348439d787d82551b4a0f8", "5 итерация: нәтижелерді XOR арқылы біріктіріңіз"
_h = pbkdf2_sha256("qwerty123", b"almaty-salt", 1000)
assert _h == "93bd40730f33dae177cb66c44b7325b2a9b43c807fc0000c21539497ed80f645", "1000 итерация нәтижесі hashlib.pbkdf2_hmac-пен бірдей болуы керек"
assert verify_password("qwerty123", b"almaty-salt", 1000, _h) is True, "Дұрыс құпия сөз: True"
assert verify_password("qwerty124", b"almaty-salt", 1000, _h) is False, "Қате құпия сөз: False"
assert pbkdf2_sha256("qwerty123", b"other-salt", 3) != pbkdf2_sha256("qwerty123", b"almaty-salt", 3), "Басқа salt басқа hash береді"
` } },
          { type: 'python', xp: 25, level: 'hard', prompt: 'Қол қойылған token жазыңыз. <code>make_token(payload, secret)</code>: <code>body</code> = <code>json.dumps(payload, sort_keys=True)</code> жолының <code>base64.urlsafe_b64encode</code> нәтижесі, соңындағы <code>=</code> белгілері алынған; <code>sig</code> = <code>hmac.new(secret.encode(), body.encode(), hashlib.sha256).hexdigest()</code>; нәтиже <code>body + "." + sig</code>. <code>read_token(token, secret, now)</code>: қолтаңба дұрыс болмаса, формат бұзық болса немесе <code>payload["exp"] &lt;= now</code> болса <code>None</code>, әйтпесе payload сөздігін қайтарсын.', 
            starter: `import base64, hashlib, hmac, json

def make_token(payload, secret):
    return json.dumps(payload)

def read_token(token, secret, now):
    return json.loads(token)
`, 
            solution: `import base64, hashlib, hmac, json

def _sign(body, secret):
    return hmac.new(secret.encode(), body.encode(), hashlib.sha256).hexdigest()

def make_token(payload, secret):
    raw = json.dumps(payload, sort_keys=True).encode()
    body = base64.urlsafe_b64encode(raw).decode().rstrip("=")
    return body + "." + _sign(body, secret)

def read_token(token, secret, now):
    parts = token.split(".")
    if len(parts) != 2:
        return None
    body, sig = parts
    if not hmac.compare_digest(sig, _sign(body, secret)):
        return None
    padded = body + "=" * (-len(body) % 4)
    payload = json.loads(base64.urlsafe_b64decode(padded))
    if payload.get("exp", now + 1) <= now:
        return None
    return payload
`, 
            hints: ['Decode алдында <code>=</code> толықтыруын қайтарыңыз: <code>body + "=" * (-len(body) % 4)</code>.', 'Қолтаңбаны алдымен тексеріңіз, тек сосын JSON-ды оқыңыз.'], 
            check: { tests: `import base64 as _b64, hmac as _hm, hashlib as _hl, json as _js
_t = make_token({"user": 7, "role": "barista", "exp": 1000}, "s3cret")
_body, _sig = _t.split(".")
assert "=" not in _body, "body соңындағы = белгілері алынуы керек"
assert _sig == _hm.new(b"s3cret", _body.encode(), _hl.sha256).hexdigest(), "Қолтаңба: body-дің HMAC-SHA256 hex мәні"
assert read_token(_t, "s3cret", now=500) == {"user": 7, "role": "barista", "exp": 1000}, "Дұрыс token: payload қайтарылады"
assert read_token(_t, "s3cret", now=1000) is None, "Мерзімі біткен token (exp <= now): None"
assert read_token(_t, "wrong", now=500) is None, "Басқа секрет: None"
_evil = _b64.urlsafe_b64encode(_js.dumps({"user": 7, "role": "admin", "exp": 1000}, sort_keys=True).encode()).decode().rstrip("=")
assert read_token(_evil + "." + _sig, "s3cret", now=500) is None, "Payload өзгертілсе, қолтаңба сәйкес келмейді: None"
assert read_token("garbage", "s3cret", now=1) is None, "Бұзық формат: None"
` } },
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>can(user, perm)</code> және <code>require(perm)</code> декораторын жазыңыз. <code>ROLES</code> сөздігі рөл → рұқсаттар жиыны; <code>"*"</code> барлық рұқсатты береді. Handler бірінші аргумент ретінде <code>user</code> алады. <code>user is None</code> болса <code>(401, {"error": "login required"})</code>, рұқсат жоқ болса <code>(403, {"error": "forbidden"})</code>, әйтпесе handler нәтижесі.', 
            starter: `ROLES = {
    "barista": {"orders:read", "orders:update"},
    "manager": {"orders:read", "orders:update", "menu:edit", "reports:read"},
    "admin": {"*"},
}

def can(user, perm):
    return True

def require(perm):
    def decorator(handler):
        return handler
    return decorator
`, 
            solution: `ROLES = {
    "barista": {"orders:read", "orders:update"},
    "manager": {"orders:read", "orders:update", "menu:edit", "reports:read"},
    "admin": {"*"},
}

def can(user, perm):
    perms = ROLES.get(user.get("role"), set())
    return "*" in perms or perm in perms

def require(perm):
    def decorator(handler):
        def wrapper(user, *args, **kwargs):
            if user is None:
                return 401, {"error": "login required"}
            if not can(user, perm):
                return 403, {"error": "forbidden"}
            return handler(user, *args, **kwargs)
        return wrapper
    return decorator
`, 
            hints: ['Белгісіз рөл үшін: <code>ROLES.get(role, set())</code>.', 'wrapper сигнатурасы: <code>def wrapper(user, *args, **kwargs)</code>'], 
            check: { tests: `@require("menu:edit")
def _set_price(user, drink, price):
    return 200, {"drink": drink, "price": price}
_b = {"name": "Сая", "role": "barista"}
_m = {"name": "Ерлан", "role": "manager"}
_a = {"name": "Admin", "role": "admin"}
assert can(_m, "reports:read") and not can(_b, "menu:edit"), "can: рөлдің рұқсаттар жиынын тексеріңіз"
assert can(_a, "anything:else"), "* барлық рұқсатты береді"
assert can({"role": "intern"}, "orders:read") is False, "Белгісіз рөлде рұқсат жоқ"
assert _set_price(None, "latte", 1500) == (401, {"error": "login required"}), "Кірмеген пайдаланушы: 401"
assert _set_price(_b, "latte", 1500) == (403, {"error": "forbidden"}), "Баристаға мәзір өзгертуге болмайды: 403"
assert _set_price(_m, "latte", 1500) == (200, {"drink": "latte", "price": 1500}), "Менеджерге болады: handler нәтижесі"
` } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: 'OAuth 2.0 authorization code ағымында сайттың сервері пайдаланушы туралы деректі алу үшін соңында не қолданады?', options: ['Пайдаланушының Google құпия сөзін', 'Браузерден келген қысқа мерзімді code-ты тікелей', 'Code-ты айырбастап алған access token-ді', 'Пайдаланушының cookie-ін'], answer: 2, explain: 'Code тек бір рет, сервер жағында access token-ге айырбасталады. API-ға сұрау access token арқылы жасалады. Құпия сөзді сайт ешқашан көрмейді.' }
        ]
      },
      {
        id: 'pyb-8', title: 'Тестілеу: unittest, test client, қате жолдары', minutes: 16,
        body: `
<p>Software Eng курсында <code>assert</code> және <code>pytest</code> арқылы функцияларды тексердіңіз. Backend-те тест тағы да маңызды: бір өзгеріс ондаған endpoint-ке әсер етеді, ал оларды қолмен <code>curl</code> арқылы тексеріп шығу мүмкін емес. Бұл сабақта стандартты кітапханадағы <code>unittest</code>-ті және HTTP-сіз «test client» идеясын үйренеміз.</p>
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
<p>Әр тест <code>test_</code> деп басталатын әдіс. Жиі қолданылатын тексерістер: <code>assertEqual</code>, <code>assertTrue</code>, <code>assertIn</code>, <code>assertIsNone</code>, <code>assertRaises</code>. Терминалда <code>python -m unittest</code> немесе <code>pytest</code> (ол unittest тесттерін де іске қосады) жазасыз. Браузерде тесттерді кодпен іске қосамыз:</p>
<pre><code>import io
suite = unittest.defaultTestLoader.loadTestsFromTestCase(FareTests)
result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)
print(result.testsRun, result.wasSuccessful())   # 3 True</code></pre>
<h3>setUp: әр тестке таза орта</h3>
<p><code>setUp</code> әр тест әдісінің <b>алдында</b> шақырылады, <code>tearDown</code> одан кейін. Тесттер бір-біріне тәуелді болмауы керек: бір тест жасаған тапсырыс келесі тестке «мұра» болып қалса, тесттер ретіне қарай кездейсоқ құлайды. pytest-те бұл рөлді <b>fixture</b> атқарады.</p>
<h3>Test client</h3>
<p>Flask пен FastAPI-да <code>TestClient</code> бар: ол серверді іске қоспай, сұрауды тікелей қосымшаға береді. Біз оны өзіміз жазамыз: клиент body-ді JSON-ға айналдырып, <code>app.handle</code> шақырады да, жауапты ыңғайлы объектіге орайды.</p>
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
        self.client = TestClient(make_app())     # әр тестке жаңа қосымша
    def test_unknown_cafe(self):
        r = self.client.request("GET", "/cafes/999")
        self.assertEqual(r.status, 404)</code></pre>
<h3>Қате жолдарын тестілеу</h3>
<p>Жаңа әзірлеуші әдетте тек «бәрі жақсы» жағдайын тексереді. Бірақ bug-тардың көбі шетінде: бос body, бұзық JSON, жоқ id, рұқсатсыз пайдаланушы, шекаралық мән (0, 10, 11). Әр endpoint үшін кемінде: бір сәтті жағдай, бір валидация қатесі (400/422), бір «табылмады» (404).</p>
<h3>Жақсы тест қандай?</h3>
<ul>
<li>Жылдам және детерминистік: желісіз, нақты уақытсыз, кездейсоқтықсыз (уақыт пен random-ды сырттан беріңіз).</li>
<li>Бір тест бір нәрсені тексереді, ал атауы соны айтады: <code>test_order_with_zero_qty_returns_422</code>.</li>
<li>Bug-ты ұстай алады: кодты әдейі бұзсаңыз, тест құлауы керек. Құламаса, тест ештеңені тексермейді.</li>
</ul>
<div class="tip">Bug табылғанда, түзетпес бұрын оны қайталайтын тест жазыңыз. Тест құлайды, сіз түзетесіз, тест өтеді, ал бұл bug енді ешқашан білінбей қайтып келмейді.</div>`,
        exercises: [
          { type: 'python', xp: 25, level: 'medium', prompt: '<code>apply_promo(total, code)</code> функциясы берілген. <code>PromoTests(unittest.TestCase)</code> класын жазыңыз: кемінде 3 тест, олар (1) <code>"KOFE10"</code> 10% жеңілдік беретінін, (2) <code>"STUDENT"</code> 15% беретінін, (3) белгісіз код <code>ValueError</code> шығаратынын тексерсін (<code>assertRaises</code>). Тексеру сіздің тесттеріңізді дұрыс функцияда да, әдейі бұзылған нұсқаларда да іске қосады: бұзылғандарында тест құлауы керек.', 
            starter: `import unittest

PROMOS = {"KOFE10": 10, "STUDENT": 15}

def apply_promo(total, code):
    if code not in PROMOS:
        raise ValueError("белгісіз промокод")
    return total * (100 - PROMOS[code]) // 100

class PromoTests(unittest.TestCase):
    pass
`, 
            solution: `import unittest

PROMOS = {"KOFE10": 10, "STUDENT": 15}

def apply_promo(total, code):
    if code not in PROMOS:
        raise ValueError("белгісіз промокод")
    return total * (100 - PROMOS[code]) // 100

class PromoTests(unittest.TestCase):
    def test_kofe10(self):
        self.assertEqual(apply_promo(2000, "KOFE10"), 1800)

    def test_student(self):
        self.assertEqual(apply_promo(2000, "STUDENT"), 1700)

    def test_unknown_code(self):
        with self.assertRaises(ValueError):
            apply_promo(2000, "FREE")
`, 
            hints: ['<code>self.assertEqual(apply_promo(2000, "KOFE10"), 1800)</code>', 'Қате: <code>with self.assertRaises(ValueError): apply_promo(2000, "FREE")</code>'], 
            check: { tests: `import io as _io, unittest as _ut
def _run():
    _s = _ut.defaultTestLoader.loadTestsFromTestCase(PromoTests)
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_s)
_ok = _run()
assert _ok.testsRun >= 3, "Кемінде 3 тест әдісі керек (атауы test_ деп басталсын)"
assert _ok.wasSuccessful(), "Тесттер дұрыс функцияда өтуі керек"
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
assert not _with(_m1), "Тесттер бұзылған нұсқаны ұстамады: белгісіз код ValueError шығаратынын тексеріңіз"
assert not _with(_m2), "Тесттер бұзылған нұсқаны ұстамады: STUDENT 15% беретінін тексеріңіз"
assert not _with(_m3), "Тесттер бұзылған нұсқаны ұстамады: KOFE10 10% беретінін тексеріңіз"
` } },
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>TestClient</code> класын жазыңыз. <code>request(method, path, json_body=None)</code>: body-ді <code>json.dumps</code> арқылы жолға айналдырсын (<code>None</code> болса <code>""</code>), <code>self.app.handle(method, path, raw)</code> шақырсын, жауап body-сін <code>json.loads</code> арқылы оқып, <code>Response(status, json)</code> қайтарсын (body бос болса <code>json=None</code>). Сонымен қатар <code>get(path)</code> және <code>post(path, json_body)</code> әдістері.', 
            starter: `import json
from dataclasses import dataclass

@dataclass
class Response:
    status: int
    json: object

class MiniApp:
    def __init__(self):
        self.items, self.next_id = {}, 1
    def handle(self, method, path, body=""):
        if path == "/items" and method == "POST":
            data = json.loads(body or "{}")
            if not data.get("name"):
                return 422, json.dumps({"errors": {"name": "міндетті"}})
            item = {"id": self.next_id, "name": data["name"]}
            self.items[item["id"]] = item
            self.next_id += 1
            return 201, json.dumps(item, ensure_ascii=False)
        if path.startswith("/items/") and method == "GET":
            item = self.items.get(int(path.split("/")[2]))
            if item is None:
                return 404, json.dumps({"error": "not found"})
            return 200, json.dumps(item, ensure_ascii=False)
        if path.startswith("/items/") and method == "DELETE":
            self.items.pop(int(path.split("/")[2]), None)
            return 204, ""
        return 404, json.dumps({"error": "not found"})

class TestClient:
    def __init__(self, app):
        self.app = app
`, 
            solution: `import json
from dataclasses import dataclass

@dataclass
class Response:
    status: int
    json: object

class MiniApp:
    def __init__(self):
        self.items, self.next_id = {}, 1
    def handle(self, method, path, body=""):
        if path == "/items" and method == "POST":
            data = json.loads(body or "{}")
            if not data.get("name"):
                return 422, json.dumps({"errors": {"name": "міндетті"}})
            item = {"id": self.next_id, "name": data["name"]}
            self.items[item["id"]] = item
            self.next_id += 1
            return 201, json.dumps(item, ensure_ascii=False)
        if path.startswith("/items/") and method == "GET":
            item = self.items.get(int(path.split("/")[2]))
            if item is None:
                return 404, json.dumps({"error": "not found"})
            return 200, json.dumps(item, ensure_ascii=False)
        if path.startswith("/items/") and method == "DELETE":
            self.items.pop(int(path.split("/")[2]), None)
            return 204, ""
        return 404, json.dumps({"error": "not found"})

class TestClient:
    def __init__(self, app):
        self.app = app

    def request(self, method, path, json_body=None):
        raw = "" if json_body is None else json.dumps(json_body)
        status, body = self.app.handle(method, path, raw)
        return Response(status, json.loads(body) if body else None)

    def get(self, path):
        return self.request("GET", path)

    def post(self, path, json_body):
        return self.request("POST", path, json_body)
`, 
            hints: ['<code>status, body = self.app.handle(method, path, raw)</code>', '<code>get</code> мен <code>post</code> жай ғана <code>self.request(...)</code> шақырады.'], 
            check: { tests: `_c = TestClient(MiniApp())
_r = _c.post("/items", {"name": "Самса"})
assert isinstance(_r, Response) and _r.status == 201 and _r.json == {"id": 1, "name": "Самса"}, "POST /items: 201 және JSON оқылған"
assert _c.get("/items/1").json["name"] == "Самса", "GET /items/1: жасалған объект"
assert _c.get("/items/5").status == 404, "Жоқ id: 404"
assert _c.post("/items", {}).status == 422, "Аты жоқ: 422"
_d = _c.request("DELETE", "/items/1")
assert _d.status == 204 and _d.json is None, "Бос body: json=None"
` } },
          { type: 'python', xp: 30, level: 'hard', prompt: '<code>ItemApiTests(unittest.TestCase)</code> жазыңыз. <code>setUp</code> ішінде <code>self.client = TestClient(MiniApp())</code> жасаңыз. Кемінде 3 тест: сәтті <code>POST /items</code> 201 береді; аты жоқ POST 422 береді; жоқ id-ге <code>GET</code> 404 береді. Тексеру тесттеріңізді бұзылған қосымшада (422-нің орнына 201 қайтаратын) да іске қосады: сонда тест құлауы керек.', 
            starter: `import json, unittest
from dataclasses import dataclass

@dataclass
class Response:
    status: int
    json: object

class MiniApp:
    def __init__(self):
        self.items, self.next_id = {}, 1
    def handle(self, method, path, body=""):
        if path == "/items" and method == "POST":
            data = json.loads(body or "{}")
            if not data.get("name"):
                return 422, json.dumps({"errors": {"name": "міндетті"}})
            item = {"id": self.next_id, "name": data["name"]}
            self.items[item["id"]] = item
            self.next_id += 1
            return 201, json.dumps(item, ensure_ascii=False)
        if path.startswith("/items/") and method == "GET":
            item = self.items.get(int(path.split("/")[2]))
            if item is None:
                return 404, json.dumps({"error": "not found"})
            return 200, json.dumps(item, ensure_ascii=False)
        return 404, json.dumps({"error": "not found"})

class TestClient:
    def __init__(self, app):
        self.app = app
    def request(self, method, path, json_body=None):
        raw = "" if json_body is None else json.dumps(json_body)
        status, body = self.app.handle(method, path, raw)
        return Response(status, json.loads(body) if body else None)

class ItemApiTests(unittest.TestCase):
    pass
`, 
            solution: `import json, unittest
from dataclasses import dataclass

@dataclass
class Response:
    status: int
    json: object

class MiniApp:
    def __init__(self):
        self.items, self.next_id = {}, 1
    def handle(self, method, path, body=""):
        if path == "/items" and method == "POST":
            data = json.loads(body or "{}")
            if not data.get("name"):
                return 422, json.dumps({"errors": {"name": "міндетті"}})
            item = {"id": self.next_id, "name": data["name"]}
            self.items[item["id"]] = item
            self.next_id += 1
            return 201, json.dumps(item, ensure_ascii=False)
        if path.startswith("/items/") and method == "GET":
            item = self.items.get(int(path.split("/")[2]))
            if item is None:
                return 404, json.dumps({"error": "not found"})
            return 200, json.dumps(item, ensure_ascii=False)
        return 404, json.dumps({"error": "not found"})

class TestClient:
    def __init__(self, app):
        self.app = app
    def request(self, method, path, json_body=None):
        raw = "" if json_body is None else json.dumps(json_body)
        status, body = self.app.handle(method, path, raw)
        return Response(status, json.loads(body) if body else None)

class ItemApiTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(MiniApp())

    def test_create_returns_201(self):
        r = self.client.request("POST", "/items", {"name": "Бауырсақ"})
        self.assertEqual(r.status, 201)
        self.assertEqual(r.json["name"], "Бауырсақ")

    def test_create_without_name_returns_422(self):
        r = self.client.request("POST", "/items", {})
        self.assertEqual(r.status, 422)

    def test_missing_item_returns_404(self):
        r = self.client.request("GET", "/items/999")
        self.assertEqual(r.status, 404)
`, 
            hints: ['<code>def setUp(self): self.client = TestClient(MiniApp())</code>', 'Тест ішінде: <code>r = self.client.request("POST", "/items", {})</code>, сосын <code>self.assertEqual(r.status, 422)</code>'], 
            check: { tests: `import io as _io, unittest as _ut
def _run():
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(ItemApiTests))
assert "setUp" in ItemApiTests.__dict__, "setUp әдісі керек"
_ok = _run()
assert _ok.testsRun >= 3, "Кемінде 3 тест керек"
assert _ok.wasSuccessful(), "Тесттер дұрыс қосымшада өтуі керек"
_Good = MiniApp
class _Broken(_Good):
    def handle(self, method, path, body=""):
        if path == "/items" and method == "POST" and not json.loads(body or "{}").get("name"):
            return 201, json.dumps({"id": 0, "name": ""})
        return super().handle(method, path, body)
MiniApp = _Broken
_bad = _run()
MiniApp = _Good
assert not _bad.wasSuccessful(), "Бұзылған қосымшада (422 орнына 201) тесттер құлауы керек"
` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: '<code>setUp</code> әдісі қашан шақырылады?', options: ['Бүкіл класс үшін бір рет, ең басында', 'Әр тест әдісінің алдында', 'Тек құлаған тесттен кейін', 'Тек <code>tearDown</code> шақырылғанда'], answer: 1, explain: 'setUp әр <code>test_</code> әдісінің алдында қайта шақырылады, сондықтан әр тест таза ортадан басталады. Класқа бір рет керек болса, <code>setUpClass</code> бар.' }
        ]
      },
      {
        id: 'pyb-9', title: 'Regular expressions: тексеру, іздеу, ауыстыру', minutes: 15,
        body: `
<p>Пайдаланушы телефонын <code>+7 (701) 234-56-78</code>, <code>87012345678</code> немесе <code>+7 701 234 5678</code> деп жазады. Оның бәрін тексеріп, бір форматқа келтіру үшін <b>regular expression</b> (regex) ыңғайлы: мәтіндегі үлгіні сипаттайтын шағын тіл. Python-да ол <code>re</code> модулінде.</p>
<h3>Негізгі белгілер</h3>
<table>
<tr><th>Үлгі</th><th>Мағынасы</th></tr>
<tr><td><code>\\d</code>, <code>\\w</code>, <code>\\s</code></td><td>цифр; әріп, цифр немесе <code>_</code>; бос орын</td></tr>
<tr><td><code>.</code></td><td>кез келген бір таңба (жаңа жолдан басқа)</td></tr>
<tr><td><code>[abc]</code>, <code>[^0-9]</code></td><td>тізімдегі бір таңба; цифр емес таңба</td></tr>
<tr><td><code>*</code>, <code>+</code>, <code>?</code>, <code>{3}</code>, <code>{2,4}</code></td><td>0+, 1+, 0 немесе 1, дәл 3, 2-ден 4-ке дейін</td></tr>
<tr><td><code>^</code>, <code>$</code></td><td>жолдың басы, соңы</td></tr>
<tr><td><code>( )</code>, <code>(?P&lt;name&gt; )</code>, <code>(?: )</code></td><td>топ; атаулы топ; ұстамайтын топ</td></tr>
<tr><td><code>a|b</code></td><td>a немесе b</td></tr>
</table>
<p>Үлгіні әрқашан <b>raw string</b> етіп жазыңыз: <code>r"\\d+"</code>. Әйтпесе <code>\\b</code> сияқты тізбектерді Python өзі түрлендіріп жібереді.</p>
<h3>Негізгі функциялар</h3>
<pre><code>import re
re.match(r"\\d+", "42 latte")        # басынан ғана іздейді → match '42'
re.search(r"\\d+", "latte 42")       # кез келген жерден бірінші → '42'
re.fullmatch(r"\\d{6}", "050000")    # бүкіл жол сәйкес келуі керек
re.findall(r"#(\\d+)", "#12 және #305")   # ['12', '305']: топ болса, тек топ
re.sub(r"\\s+", " ", "Абай   даңғылы  10")   # 'Абай даңғылы 10'</code></pre>
<p>Тексеру (валидация) үшін <code>fullmatch</code> немесе <code>^...$</code> қолданыңыз. <code>match(r"\\d{6}", "0500001")</code> сәтті өтеді, себебі ол тек басын қарайды.</p>
<h3>Топтар</h3>
<pre><code>m = re.search(r"(?P&lt;city&gt;[А-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІі]+), (?P&lt;zip&gt;\\d{6})", "Мекенжай: Атырау, 060011")
m.group("city"), m.group("zip")     # ('Атырау', '060011')
m.groupdict()                       # {'city': 'Атырау', 'zip': '060011'}</code></pre>
<h3>Қазақстандық телефон</h3>
<pre><code>def normalize_phone(text):
    digits = re.sub(r"[\\s()\\-]", "", text)          # бос орын, жақша, дефис алынады
    m = re.fullmatch(r"(?:\\+7|8)(7\\d{9})", digits)
    return "+7" + m.group(1) if m else None

normalize_phone("+7 (701) 234-56-78")   # '+77012345678'
normalize_phone("8 777 111 22 33")      # '+77771112233'
normalize_phone("+7 495 123 45 67")     # None: мобильді емес</code></pre>
<h3>URL path талдау</h3>
<pre><code>PATH = re.compile(r"^/api/v(?P&lt;version&gt;\\d+)/(?P&lt;resource&gt;[a-z-]+)(?:/(?P&lt;id&gt;\\d+))?/?$")
PATH.match("/api/v2/orders/15").groupdict()
# {'version': '2', 'resource': 'orders', 'id': '15'}</code></pre>
<p><code>re.compile</code> үлгіні бір рет дайындайды: бір үлгі мыңдаған сұрауда қолданылса, бұл ыңғайлы әрі оқуға жеңіл.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Валидацияда <code>search</code> немесе <code>match</code> қолданып, жолдың соңын тексермеу.</li>
<li><code>.</code> белгісін экрандамау: <code>r"mail.kz"</code> үлгісі <code>mailXkz</code>-ке де сәйкес келеді, дұрысы <code>r"mail\\.kz"</code>.</li>
<li>Email-ді «мінсіз» regex-пен тексеруге тырысу. Қарапайым тексеріс жеткілікті, ал нағыз тексеріс растау хатын жіберу.</li>
<li>Greedy («ашкөз») <code>.*</code>: <code>&lt;.*&gt;</code> бірінші <code>&lt;</code>-ден соңғы <code>&gt;</code>-ге дейін бәрін алады. Жалқау нұсқасы: <code>.*?</code>.</li>
</ul>
<div class="tip">Күрделі үлгіні <code>re.VERBOSE</code> жалауымен бірнеше жолға бөліп, түсініктеме жазуға болады. Үлгіні әрқашан бірнеше дұрыс және бірнеше қате мысалмен тексеріңіз.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>normalize_phone(text)</code> функциясын жазыңыз. Алдымен бос орын, жақша және дефисті алып тастаңыз. Сосын нөмір <code>+7</code> немесе <code>8</code>-ден басталып, одан кейін <code>7</code> және тағы 9 цифр болса (Қазақстан мобильді нөмірі), <code>"+77XXXXXXXXX"</code> форматында қайтарсын, әйтпесе <code>None</code>.', 
            starter: `import re

def normalize_phone(text):
    return text
`, 
            solution: `import re

def normalize_phone(text):
    digits = re.sub(r"[\\s()\\-]", "", text)
    m = re.fullmatch(r"(?:\\+7|8)(7\\d{9})", digits)
    return "+7" + m.group(1) if m else None
`, 
            hints: ['Тазалау: <code>re.sub(r"[\\s()\\-]", "", text)</code>', 'Тексеру: <code>re.fullmatch(r"(?:\\+7|8)(7\\d{9})", digits)</code>'], 
            check: { tests: `assert normalize_phone("+7 (701) 234-56-78") == "+77012345678", "+7 (701) 234-56-78 → +77012345678"
assert normalize_phone("87771112233") == "+77771112233", "8-ден басталатын нөмір де дұрыс"
assert normalize_phone("8 747 000 11 22") == "+77470001122", "Бос орындар алынады"
assert normalize_phone("+7 495 123 45 67") is None, "7-ден басталмайтын код мобильді емес: None"
assert normalize_phone("+7 701 234 56 789") is None, "Цифр артық: None"
assert normalize_phone("+7 701 23a 56 78") is None, "Әріп бар: None"
` } },
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>is_valid_email(s)</code>: қарапайым тексеріс. Бүкіл жол сәйкес келуі керек: <code>@</code>-ке дейін бір немесе одан көп әріп, цифр, <code>.</code>, <code>_</code>, <code>-</code> немесе <code>+</code>; сосын <code>@</code>; сосын домен: нүктемен бөлінген бөліктер (әр бөлікте әріп, цифр, дефис), соңғы бөлігі кемінде 2 латын әрпі. <code>True</code> / <code>False</code> қайтарсын.', 
            starter: `import re

def is_valid_email(s):
    return "@" in s
`, 
            solution: `import re

EMAIL = re.compile(r"[\\w.+-]+@(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,}")

def is_valid_email(s):
    return EMAIL.fullmatch(s) is not None
`, 
            hints: ['Домен бөлігі: <code>(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,}</code>', '<code>fullmatch</code> бүкіл жолды тексереді.'], 
            check: { tests: `assert is_valid_email("dana.serik@mail.kz") is True, "dana.serik@mail.kz дұрыс"
assert is_valid_email("erlan+shop@edu.astana.kz") is True, "+ белгісі және бірнеше домен бөлігі дұрыс"
assert is_valid_email("dana@mail") is False, "Домен соңында нүкте мен аймақ керек"
assert is_valid_email("@mail.kz") is False, "@-ке дейін ештеңе жоқ"
assert is_valid_email("dana@mail.kz extra") is False, "Бос орын және артық мәтін болмайды"
assert is_valid_email("dana@@mail.kz") is False, "Екі @ болмайды"
` } },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Тапсырыс чатының логында <code>#A-1234</code> түріндегі тапсырыс нөмірлері (<code>#</code>, бір бас латын әрпі, дефис, 4 цифр) және телефондар бар. (1) <code>order_ids(text)</code> нөмірлерді <code>#</code>-сіз тізім етіп қайтарсын: <code>["A-1234", ...]</code>. (2) <code>mask_phones(text)</code> <code>+7</code>-ден басталатын 11 цифрлы нөмірлердің (бос орынсыз, <code>+77012345678</code>) ортасын жасырсын: <code>+7701***5678</code> (алғашқы 5 таңба мен соңғы 4 цифр қалады).', 
            starter: `import re

def order_ids(text):
    return []

def mask_phones(text):
    return text
`, 
            solution: `import re

def order_ids(text):
    return re.findall(r"#([A-Z]-\\d{4})\\b", text)

def mask_phones(text):
    return re.sub(r"(\\+7\\d{3})\\d{3}(\\d{4})\\b", r"\\1***\\2", text)
`, 
            hints: ['<code>findall</code> үлгіде топ болса, тек топты қайтарады: <code>r"#([A-Z]-\\d{4})"</code>.', 'Ауыстыруда топқа сілтеме: <code>r"\\1***\\2"</code>.'], 
            check: { tests: `_log = "Клиент +77012345678 #A-1234 тапсырысын сұрады. #B-0007 дайын, #c-1111 қате, #D-12345 де қате. Курьер: +77775550011"
assert order_ids(_log) == ["A-1234", "B-0007"], "Тек дұрыс форматтағы нөмірлер: A-1234, B-0007"
assert mask_phones(_log) == "Клиент +7701***5678 #A-1234 тапсырысын сұрады. #B-0007 дайын, #c-1111 қате, #D-12345 де қате. Курьер: +7777***0011", "Телефон ортасы *** болуы керек, қалған мәтін өзгермейді"
assert mask_phones("Нөмір жоқ") == "Нөмір жоқ", "Телефон жоқ болса, мәтін өзгермейді"
` } },
          { type: 'python', xp: 25, level: 'hard', prompt: '<code>parse_api_path(path)</code> атаулы топтары бар бір regex арқылы <code>/api/v&lt;version&gt;/&lt;resource&gt;</code> немесе <code>/api/v&lt;version&gt;/&lt;resource&gt;/&lt;id&gt;</code> path-ын талдасын (соңғы <code>/</code> міндетті емес). Resource: кіші латын әріптері мен дефис. Нәтиже: <code>{"version": int, "resource": str, "id": int немесе None}</code>. Сәйкес келмесе <code>None</code>.', 
            starter: `import re

def parse_api_path(path):
    parts = path.split("/")
    return {"version": parts[2], "resource": parts[3], "id": None}
`, 
            solution: `import re

PATH = re.compile(r"^/api/v(?P<version>\\d+)/(?P<resource>[a-z-]+)(?:/(?P<id>\\d+))?/?$")

def parse_api_path(path):
    m = PATH.match(path)
    if not m:
        return None
    d = m.groupdict()
    return {"version": int(d["version"]), "resource": d["resource"],
            "id": int(d["id"]) if d["id"] else None}
`, 
            hints: ['Міндетті емес бөлік: <code>(?:/(?P&lt;id&gt;\\d+))?</code>', 'Топ сәйкес келмесе, <code>groupdict()</code> онда <code>None</code> береді.'], 
            check: { tests: `assert parse_api_path("/api/v2/orders/15") == {"version": 2, "resource": "orders", "id": 15}, "/api/v2/orders/15 → version 2, id 15"
assert parse_api_path("/api/v1/gift-cards/") == {"version": 1, "resource": "gift-cards", "id": None}, "id жоқ, соңғы / рұқсат"
assert parse_api_path("/api/v1/Orders") is None, "Бас әріп рұқсат етілмейді"
assert parse_api_path("/api/v1/orders/abc") is None, "id тек цифр"
assert parse_api_path("/api/orders") is None, "Нұсқа міндетті"
assert parse_api_path("/api/v3/orders/7/items") is None, "Артық бөлік: None"
` } }
        ]
      },
      {
        id: 'pyb-10', title: 'Асинхрондылық, фондық тапсырмалар, кэш және rate limiting', minutes: 18,
        body: `
<p>Кофехана сервері бір сұрауда: дерекқордан мәзірді алады (20 мс), төлем жүйесіне сұрау жібереді (300 мс), SMS сервисіне хабар береді (150 мс). Процессор бұл уақыттың көбінде ештеңе істемей, <b>жауап күтіп</b> тұрады. Мұндай жұмыс <b>I/O-bound</b> деп аталады, ал оны тездетудің жолы күту кезінде басқа сұраумен айналысу.</p>
<h3>Concurrency және parallelism</h3>
<ul>
<li><b>Concurrency</b>: бір бариста үш тапсырысты алмастырып жасайды. Сүт қызып жатқанда кофе тартады. Бір уақытта бір ғана әрекет, бірақ күту босқа кетпейді.</li>
<li><b>Parallelism</b>: үш бариста үш тапсырысты шынымен бір мезгілде жасайды (бірнеше процессор ядросы, бірнеше процесс).</li>
</ul>
<p>I/O-bound жұмысқа concurrency жеткілікті (async, thread). CPU-bound жұмысқа (сурет өңдеу, үлкен есептеу) parallelism керек (бірнеше процесс).</p>
<h3>async / await</h3>
<pre><code>async def fetch_menu(cafe_id):
    await db.query("SELECT ...")      # күту кезінде event loop басқа тапсырманы жүргізеді
    return ["latte", "raf"]

coro = fetch_menu(7)        # функция әлі орындалған жоқ! бұл coroutine объектісі
print(type(coro).__name__)  # coroutine
coro.close()</code></pre>
<p><code>async def</code> функциясын шақыру оны орындамайды, тек <b>coroutine</b> объектісін жасайды. Оны <b>event loop</b> жүргізеді: әр <code>await</code>-та coroutine «мен күтіп тұрмын» деп тоқтайды да, loop дайын тұрған келесі coroutine-ға ауысады. FastAPI, aiohttp, Django-ның async бөлігі осылай жұмыс істейді.</p>
<h3>Генераторлармен өз event loop-ыңыз</h3>
<p>Coroutine идеясы генераторлардан шыққан: <code>yield</code> де функцияны тоқтатып, басқарушыға береді. Мына шағын scheduler әр тапсырманың «қанша уақыт ұйықтағысы келетінін» <code>yield</code> арқылы алып, жалған сағатпен (нақты күтусіз) ең ерте оянатын тапсырманы жүргізеді:</p>
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
<p>Нағыз <code>asyncio</code>-да да солай: тапсырмалар кезегі, уақыт бойынша heap және «дайын» тапсырмаларды кезекпен жүргізу.</p>
<h3>Фондық тапсырмалар: Celery, RabbitMQ</h3>
<p>Кейбір жұмыс сұрау ішінде орындалмауы керек: чекті PDF-ке айналдыру, 10 000 клиентке хабар жіберу, түнгі есеп. Handler тапсырманы <b>кезекке</b> (broker: RabbitMQ немесе Redis) салып, бірден <code>202 Accepted</code> қайтарады. Бөлек <b>worker</b> процестері (Celery, RQ) кезектен тапсырма алып, орындайды. Тапсырма сәтсіз болса, кейінірек қайталанады (retry), сондықтан оны идемпотентті етіп жазған жөн.</p>
<h3>Кэш және rate limiting</h3>
<p>Жиі сұралатын, сирек өзгеретін дерек (валюта бағамы, мәзір) кэштеледі: процесс ішінде <code>functools.lru_cache</code>, бірнеше сервер арасында Redis. Әр кэшке мерзім (TTL) керек. <b>Rate limiting</b> бір клиенттің сұрау санын шектейді (мысалы, минутына 60), артығына <code>429 Too Many Requests</code>. Танымал алгоритм <b>token bucket</b>: себетте ең көбі <code>capacity</code> token бар, секунд сайын <code>rate</code> token қосылады, әр сұрау бір token жұмсайды.</p>
<h3>Жиі қателер</h3>
<ul>
<li>Async функция ішінде блоктайтын кодты (<code>time.sleep</code>, синхронды дерекқор драйвері) шақыру: бүкіл loop тоқтайды.</li>
<li><code>await</code>-ты ұмыту: coroutine жасалады, бірақ ешқашан орындалмайды.</li>
<li>Rate limiter-ді нақты <code>time.time()</code>-ға байлау: оны тестілеу қиын. Сағатты сырттан беріңіз.</li>
</ul>
<div class="tip">Уақытқа тәуелді кодқа сағатты параметр ретінде беріңіз (<code>clock=time.monotonic</code>). Тестте оның орнына қолмен басқарылатын жалған сағат қоясыз да, «бір минут өтті» дегенді бір жолмен жасайсыз.</div>`,
        exercises: [
          { type: 'quiz', xp: 10, level: 'medium', prompt: '<code>async def get_rate(): return 470</code> берілген. <code>x = get_rate()</code> жолынан кейін <code>x</code> не болады?', options: ['<code>470</code>', 'Coroutine объектісі: функция әлі орындалған жоқ', '<code>None</code>', 'SyntaxError, себебі await жоқ'], answer: 1, explain: 'async функцияны шақыру coroutine жасайды ғана. Нәтижені алу үшін оны <code>await</code> немесе event loop арқылы жүргізу керек.' },
          { type: 'python', xp: 20, level: 'medium', prompt: 'Round-robin scheduler жазыңыз. <code>run_all(tasks)</code> генераторлар тізімін алады. Кезекпен әр генератордан бір мән алып (<code>next</code>), оны <code>log</code> тізіміне қосады да, генераторды кезектің соңына қайта қояды; генератор біткенде (<code>StopIteration</code>) оны кезектен алып тастайды. <code>log</code> тізімін қайтарсын. <code>collections.deque</code> ыңғайлы.', 
            starter: `from collections import deque

def barista(name, drinks):
    for d in drinks:
        yield f"{name}: {d}"

def run_all(tasks):
    log = []
    for t in tasks:
        log.extend(t)
    return log
`, 
            solution: `from collections import deque

def barista(name, drinks):
    for d in drinks:
        yield f"{name}: {d}"

def run_all(tasks):
    log = []
    queue = deque(tasks)
    while queue:
        task = queue.popleft()
        try:
            log.append(next(task))
        except StopIteration:
            continue
        queue.append(task)
    return log
`, 
            hints: ['<code>task = queue.popleft()</code>, сосын <code>next(task)</code>.', 'StopIteration болмаса ғана <code>queue.append(task)</code>.'], 
            check: { tests: `_log = run_all([barista("Сая", ["латте", "раф", "какао"]), barista("Әли", ["американо"]), barista("Нұр", ["капучино", "шай"])])
assert _log == ["Сая: латте", "Әли: американо", "Нұр: капучино", "Сая: раф", "Нұр: шай", "Сая: какао"], "Тапсырмалар кезекпен алмасуы керек"
assert run_all([]) == [], "Тапсырма жоқ болса, бос лог"
` } },
          { type: 'python', xp: 30, level: 'hard', prompt: 'Token bucket негізіндегі <code>RateLimiter(capacity, rate, clock)</code> жазыңыз. <code>clock()</code> секундпен уақыт қайтарады. Әр <code>key</code> (мысалы, IP) үшін бөлек себет: басында толы (<code>capacity</code>). <code>allow(key)</code>: алдымен өткен уақытқа қарай token қосады (<code>rate</code> token/сек, <code>capacity</code>-тен аспайды), сосын token саны ≥ 1 болса, біреуін алып <code>True</code>, әйтпесе <code>False</code> қайтарады.', 
            starter: `class RateLimiter:
    def __init__(self, capacity, rate, clock):
        self.capacity, self.rate, self.clock = capacity, rate, clock

    def allow(self, key):
        return True
`, 
            solution: `class RateLimiter:
    def __init__(self, capacity, rate, clock):
        self.capacity, self.rate, self.clock = capacity, rate, clock
        self.buckets = {}

    def allow(self, key):
        now = self.clock()
        tokens, last = self.buckets.get(key, (self.capacity, now))
        tokens = min(self.capacity, tokens + (now - last) * self.rate)
        if tokens >= 1:
            self.buckets[key] = (tokens - 1, now)
            return True
        self.buckets[key] = (tokens, now)
        return False
`, 
            hints: ['Әр key үшін <code>(tokens, last_time)</code> сақтаңыз.', 'Толықтыру: <code>min(capacity, tokens + (now - last) * rate)</code>'], 
            check: { tests: `class _Clock:
    def __init__(self):
        self.t = 0.0
    def __call__(self):
        return self.t
_c = _Clock()
_rl = RateLimiter(capacity=3, rate=1, clock=_c)
assert [_rl.allow("1.1.1.1") for _ in range(4)] == [True, True, True, False], "Басында 3 token: 3 сұрау өтеді, 4-сі жоқ"
assert _rl.allow("2.2.2.2") is True, "Әр key-дің өз себеті бар"
_c.t = 1.0
assert _rl.allow("1.1.1.1") is True and _rl.allow("1.1.1.1") is False, "1 секундтан кейін 1 token қосылады"
_c.t = 100.0
assert [_rl.allow("1.1.1.1") for _ in range(4)] == [True, True, True, False], "Себет capacity-ден аспайды"
_c2 = _Clock(); _half = RateLimiter(capacity=1, rate=0.5, clock=_c2)
assert _half.allow("k") is True and _half.allow("k") is False, "capacity=1: бір сұрау"
_c2.t = 1.0
assert _half.allow("k") is False, "rate=0.5: 1 секундта жарты token ғана"
_c2.t = 2.0
assert _half.allow("k") is True, "2 секундта бір толық token"
` } },
          { type: 'python', xp: 15, level: 'easy', prompt: '<code>exchange_rate(currency)</code> баяу «сыртқы API»-ды шақырады (<code>CALLS["n"]</code> санауышы артады). Оны <code>functools.lru_cache(maxsize=128)</code> арқылы кэштеңіз, сонда бір валютаға API тек бір рет шақырылады.', 
            starter: `from functools import lru_cache

RATES = {"USD": 470, "EUR": 510, "RUB": 5}
CALLS = {"n": 0}

def exchange_rate(currency):
    CALLS["n"] += 1
    return RATES[currency]
`, 
            solution: `from functools import lru_cache

RATES = {"USD": 470, "EUR": 510, "RUB": 5}
CALLS = {"n": 0}

@lru_cache(maxsize=128)
def exchange_rate(currency):
    CALLS["n"] += 1
    return RATES[currency]
`, 
            hints: ['Функцияның үстіне <code>@lru_cache(maxsize=128)</code> жазыңыз.'], 
            check: { tests: `_vals = [exchange_rate(c) for c in ["USD", "EUR", "USD", "USD", "RUB", "EUR"]]
assert _vals == [470, 510, 470, 470, 5, 510], "Мәндер өзгермеуі керек"
assert CALLS["n"] == 3, "Үш түрлі валюта: API тек 3 рет шақырылуы керек"
assert exchange_rate.cache_info().hits == 3, "cache_info().hits = 3"
` } }
        ]
      },
      {
        id: 'pyb-11', title: 'Деплой: Gunicorn, Nginx, Docker, CI/CD, env', minutes: 15,
        body: `
<p>Код ноутбукта жұмыс істейді. Енді оны мыңдаған пайдаланушы күні-түні қолдана алатын серверге шығару керек. Бұл <b>деплой</b>. Браузерде оны іске қоса алмаймыз, бірақ әр бөліктің рөлін түсініп алайық.</p>
<h3>Virtualenv: еске салу</h3>
<p>Software Eng курсында <code>python -m venv .venv</code> және <code>requirements.txt</code>-ті өттік. Серверде де дәл сол: нұсқалары бекітілген тәуелділіктер (<code>flask==3.0.3</code>), сонда production мен ноутбук бірдей кітапханаларды қолданады.</p>
<h3>Сұрау серверге дейін қалай жетеді</h3>
<pre><code>Браузер ──HTTPS──▶ Nginx ──HTTP──▶ Gunicorn ──▶ сіздің Flask/Django қосымшаңыз
                    │                (4 worker процесі)
                    └── /static/ файлдарын өзі береді</code></pre>
<ul>
<li><b>Flask-тың <code>app.run()</code></b> тек әзірлеуге арналған: баяу және қауіпсіз емес.</li>
<li><b>Gunicorn</b> (WSGI сервер) немесе <b>Uvicorn</b> (ASGI, async үшін): қосымшаның бірнеше worker процесін іске қосады. Бастапқы ереже: <code>2 × ядро саны + 1</code>. Worker құласа, оны қайта көтереді.</li>
<li><b>Nginx</b> (reverse proxy): алдыңғы есік. HTTPS сертификатын ұстайды, статикалық файлдарды береді, баяу клиенттерден қорғайды, жүктемені бірнеше серверге бөледі.</li>
</ul>
<pre><code>gunicorn --workers 4 --bind 0.0.0.0:8000 app:app</code></pre>
<h3>Docker</h3>
<p>«Менің компьютерімде жұмыс істейді» мәселесін Docker шешеді: қосымша, Python нұсқасы және тәуелділіктер бір <b>image</b>-ке жиналады, ол кез келген серверде бірдей <b>container</b> болып іске қосылады.</p>
<pre><code># Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8000", "app:app"]</code></pre>
<p><code>requirements.txt</code>-ті кодтан бұрын көшіру маңызды: код өзгергенде Docker тәуелділіктер қабатын кэштен алады, build тез өтеді.</p>
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
<p><code>docker compose up</code> бір командамен қосымшаны, PostgreSQL мен Redis-ті бірге көтереді. Жаңа әзірлеуші жобаны бірнеше минутта іске қосады.</p>
<h3>Env айнымалылар</h3>
<p>Құпия кілттер мен баптаулар кодта емес, <b>ортада</b> сақталады: <code>os.environ["DATABASE_URL"]</code>. Жергілікті ортада олар <code>.env</code> файлында тұрады, ал ол файл <code>.gitignore</code>-ға қосылады. Бір image dev, staging және production-да тек env арқылы ерекшеленеді.</p>
<h3>Health check</h3>
<p><code>GET /health</code> endpoint-і «тірімін» деп 200 қайтарады. Docker, Kubernetes немесе load balancer оны бірнеше секунд сайын тексеріп, жауап бермеген container-ді қайта іске қосады. Кеңейтілген нұсқасы дерекқор мен Redis байланысын да тексеріп, бірі істемесе 503 қайтарады.</p>
<h3>CI/CD: GitHub Actions</h3>
<p>MLOps курсында CI workflow-ын көрдіңіз. Backend-те тізбек: push → тесттер мен linter (CI) → Docker image build → registry-ге push → серверге автоматты деплой (CD). Тест құласа, деплой болмайды.</p>
<h3>Жиі қателер</h3>
<ul>
<li><code>.env</code>-ті git-ке салу немесе <code>DEBUG=True</code> күйінде production-ға шығару.</li>
<li>Container ішінде деректі сақтау: container қайта жасалғанда жоғалады. Дерекқорға volume керек.</li>
<li>Health check-сіз деплой: «қосымша іске қосылды, бірақ жауап бермейді» деген жағдайды ешкім байқамайды.</li>
</ul>
<div class="tip">Бір image, көп орта: кодты әр ортаға бөлек өзгертпеңіз. Айырмашылықтың бәрі env айнымалыларда болсын.</div>`,
        exercises: [
          { type: 'python', xp: 25, level: 'medium', prompt: '<code>parse_env(text)</code> <code>.env</code> мәтінін сөздікке айналдырсын. Ережелер: бос жолдар мен <code>#</code>-тен басталатын жолдар өткізіледі; <code>export </code> префиксі болуы мүмкін; бірінші <code>=</code> бойынша бөлінеді, кілт пен мән <code>strip</code>; мән бірдей тырнақшаға (<code>"..."</code> немесе <code>\'...\'</code>) алынса, тырнақшалар алынады, ал ішіндегі мәтін өзгермейді; тырнақшасыз мәнде <code> #</code>-тен кейінгі түсініктеме алынады. <code>=</code> жоқ жолда <code>ValueError</code>.', 
            starter: `def parse_env(text):
    env = {}
    for line in text.split("\\n"):
        k, v = line.split("=")
        env[k] = v
    return env
`, 
            solution: `def parse_env(text):
    env = {}
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("export "):
            line = line[len("export "):]
        if "=" not in line:
            raise ValueError("қате жол: " + raw)
        key, value = line.split("=", 1)
        key, value = key.strip(), value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\\"'":
            value = value[1:-1]
        elif " #" in value:
            value = value.split(" #", 1)[0].rstrip()
        env[key] = value
    return env
`, 
            hints: ['Бірінші <code>=</code> бойынша бөлу: <code>line.split("=", 1)</code>, себебі URL ішінде де <code>=</code> болады.', 'Тырнақша тексерісі: <code>value[0] == value[-1] and value[0] in "\\"\'"</code>'], 
            check: { tests: `_text = """
# Kofe API баптаулары
export DEBUG=false
DATABASE_URL=postgres://kofe:pw@db:5432/kofe?sslmode=require
SECRET_KEY="a#b c"
GREETING='Сәлем, Алматы'
WORKERS = 4  # 2 * ядро + 1

"""
_env = parse_env(_text)
assert _env.get("DEBUG") == "false", "export префиксі алынады"
assert _env.get("DATABASE_URL") == "postgres://kofe:pw@db:5432/kofe?sslmode=require", "Бірінші = бойынша бөлу керек"
assert _env.get("SECRET_KEY") == "a#b c", "Тырнақша ішіндегі # түсініктеме емес"
assert _env.get("GREETING") == "Сәлем, Алматы", "Жалқы тырнақша да алынады"
assert _env.get("WORKERS") == "4", "Бос орындар және ' #' түсініктемесі алынады"
assert len(_env) == 5, "Бос жолдар мен түсініктемелер өткізілуі керек"
try:
    parse_env("DEBUG")
    assert False, "= жоқ жолда ValueError керек"
except ValueError:
    pass
` } },
          { type: 'python', xp: 20, level: 'easy', prompt: '<code>health(checks)</code> handler-ін жазыңыз. <code>checks</code>: атау → аргументсіз функция. Функция <code>True</code> қайтарса <code>"ok"</code>, <code>False</code> қайтарса немесе exception шығарса <code>"fail"</code>. Бәрі ok болса <code>(200, {"status": "ok", "checks": {...}})</code>, әйтпесе <code>(503, {"status": "fail", "checks": {...}})</code>.', 
            starter: `def health(checks):
    return 200, {"status": "ok", "checks": {}}
`, 
            solution: `def health(checks):
    results = {}
    for name, fn in checks.items():
        try:
            results[name] = "ok" if fn() else "fail"
        except Exception:
            results[name] = "fail"
    ok = all(v == "ok" for v in results.values())
    return (200 if ok else 503), {"status": "ok" if ok else "fail", "checks": results}
`, 
            hints: ['Әр тексерісті <code>try/except Exception</code> ішінде шақырыңыз: бір тексеріс құласа да, health endpoint құламауы керек.'], 
            check: { tests: `def _db():
    return True
def _redis():
    raise ConnectionError("redis:6379 жауап бермейді")
def _disk():
    return False
assert health({"db": _db}) == (200, {"status": "ok", "checks": {"db": "ok"}}), "Бәрі ok: 200"
assert health({"db": _db, "redis": _redis}) == (503, {"status": "fail", "checks": {"db": "ok", "redis": "fail"}}), "Exception: fail және 503"
assert health({"disk": _disk})[0] == 503, "False қайтарса да fail"
assert health({}) == (200, {"status": "ok", "checks": {}}), "Тексеріс жоқ болса: 200"
` } },
          { type: 'quiz', xp: 10, level: 'easy', prompt: 'Nginx + Gunicorn сұлбасында Nginx-тің негізгі рөлі қандай?', options: ['Python кодын орындайды', 'Reverse proxy: HTTPS, статикалық файлдар, сұрауларды Gunicorn worker-леріне жеткізу', 'Дерекқорды сақтайды', 'Docker image жасайды'], answer: 1, explain: 'Python кодын Gunicorn worker-лері орындайды. Nginx алдыңғы есік: TLS, статика, буферлеу және жүктемені бөлу.' },
          { type: 'quiz', xp: 10, level: 'medium', prompt: 'Dockerfile-да <code>COPY requirements.txt .</code> және <code>RUN pip install</code> жолдары неге <code>COPY . .</code>-тен <b>бұрын</b> тұрады?', options: ['Docker басқа ретті қабылдамайды', 'Код өзгергенде тәуелділіктер қабаты кэштен алынады, build тез өтеді', 'Image көлемі екі есе кішірейеді', 'Әйтпесе requirements.txt оқылмайды'], answer: 1, explain: 'Docker әр қадамды қабат ретінде кэштейді. requirements.txt өзгермесе, pip install қабаты қайта орындалмайды, тек кодты көшіру қабаты жаңарады.' }
        ]
      },
      {
        id: 'pyb-12', title: 'Мини жоба: URL қысқартқыш сервисі', minutes: 30,
        body: `
<p>Модульдің бәрін бір сервиске жинаймыз. «Tolqyn Link» деп аталатын URL қысқартқыш ұзын сілтемені <code>https://tq.kz/q0U</code> сияқты қысқа кодқа айналдырады, кодқа кірген адамды бастапқы мекенжайға бағыттайды және кліктерді санайды. Мұндай сервистерді жарнама, QR код және SMS тарату үшін маркетологтар күнде қолданады.</p>
<h3>API кестесі</h3>
<table>
<tr><th>Сұрау</th><th>Body</th><th>Жауап</th></tr>
<tr><td><code>POST /links</code></td><td><code>{"url": "...", "alias": "nauryz"}</code> (alias міндетті емес)</td><td>201 жаңа сілтеме; 200 бұл URL бұрын қысқартылған болса; 400 бұзық JSON; 422 қате URL/alias; 409 alias бос емес</td></tr>
<tr><td><code>GET /&lt;code&gt;</code></td><td>жоқ</td><td>302 + <code>location</code>; 404</td></tr>
<tr><td><code>GET /links/&lt;code&gt;/stats</code></td><td>жоқ</td><td>200 <code>{"code", "url", "clicks"}</code>; 404</td></tr>
</table>
<h3>Base62: санды қысқа кодқа</h3>
<p>Әр сілтемеге өсетін id береміз, ал кодты id-ден жасаймыз. Ондық жүйеде 10 цифр бар, base62-де 62 таңба: <code>0-9</code>, <code>a-z</code>, <code>A-Z</code>. Сонда 6 таңбалы код 62<sup>6</sup> ≈ 56 миллиард сілтемені сыйдырады.</p>
<pre><code>ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n == 0:
        return "0"
    out = []
    while n:
        n, r = divmod(n, 62)     # соңғы «цифр» және қалғаны
        out.append(ALPHABET[r])
    return "".join(reversed(out))

encode(61)       # 'Z'
encode(62)       # '10'
encode(100000)   # 'q0U'</code></pre>
<p>Кері түрлендіру Горнер схемасымен: <code>n = n * 62 + ALPHABET.index(ch)</code>. id 1-ден басталса, алғашқы кодтар өте қысқа және болжамды болады, сондықтан біз 100000-нан бастаймыз. Нағыз сервистерде id-ді араластырып (немесе кездейсоқ код жасап) кодтарды тізбектеп болжауды қиындатады.</p>
<h3>Сервис логикасы</h3>
<pre><code>class Shortener:
    def create(self, raw_body):
        # 1) JSON оқу → 400       (5-сабақ)
        # 2) url және alias валидациясы regex-пен → 422   (5, 9-сабақ)
        # 3) URL бұрын болса, сол кодты қайтару → 200 (идемпотенттілік, 3-сабақ)
        # 4) alias бос емес → 409
        # 5) код жасау, сақтау → 201
    def resolve(self, code):
        # бар болса clicks += 1 және 302, әйтпесе 404
    def stats(self, code):
        # 200 немесе 404</code></pre>
<p>Деректерді сөздікте сақтаймыз: <code>self.links[code] = {"url": ..., "clicks": 0}</code>. Нағыз жобада бұл PostgreSQL кестесі болар еді (6-сабақтағы repository), ал кліктерді жылдамырақ санау үшін Redis-тегі <code>INCR</code> командасы қолданылады.</p>
<h3>Неге 302, 301 емес?</h3>
<p><code>301 Moved Permanently</code> жауабын браузер кэштейді: келесі жолы ол серверге сұрамай-ақ тікелей бастапқы сайтқа барады, сонда клік саналмайды. <code>302 Found</code> (немесе <code>307</code>) уақытша бағыттау, браузер әр жолы серверден сұрайды.</p>
<h3>Тесттер</h3>
<p>Сервисті әр бөлігі үшін тестпен қорғаймыз: base62 үшін «encode, сосын decode бастапқы санды береді» (round-trip), create үшін сәтті және қате жолдар, resolve үшін клік санағы. 8-сабақтағыдай, тест әдейі бұзылған нұсқада құлауы керек.</p>
<h3>Жиі қателер</h3>
<ul>
<li><code>javascript:alert(1)</code> сияқты URL-ды қабылдау: тек <code>http</code> және <code>https</code> рұқсат етіңіз.</li>
<li>Alias пен автоматты кодтың соқтығысуы: пайдаланушы <code>q0U</code> alias-ын алса, генератор оны қайта бермеуі керек.</li>
<li>Stats endpoint-ін шақырғанда да кліктерді арттыру.</li>
</ul>
<div class="tip">Келесі қадам ретінде өз нұсқаңызға 4-сабақтағы роутерді (<code>POST /links</code>, <code>GET /&lt;code&gt;</code>), 10-сабақтағы rate limiter-ді және 11-сабақтағы <code>/health</code>-ты қосыңыз. Сонда толық шағын backend шығады.</div>`,
        exercises: [
          { type: 'python', xp: 20, level: 'medium', prompt: '<code>encode(n)</code> және <code>decode(s)</code> base62 функцияларын жазыңыз (берілген <code>ALPHABET</code>). <code>encode(0) == "0"</code>, теріс санда <code>ValueError</code>. <code>decode</code> бос жолда немесе алфавитте жоқ таңбада <code>ValueError</code> шығарсын.', 
            starter: `ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    return str(n)

def decode(s):
    return int(s)
`, 
            solution: `ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n < 0:
        raise ValueError("теріс сан")
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, r = divmod(n, 62)
        out.append(ALPHABET[r])
    return "".join(reversed(out))

def decode(s):
    if not s:
        raise ValueError("бос код")
    n = 0
    for ch in s:
        idx = ALPHABET.find(ch)
        if idx < 0:
            raise ValueError("белгісіз таңба: " + ch)
        n = n * 62 + idx
    return n
`, 
            hints: ['<code>n, r = divmod(n, 62)</code> соңғы цифрды береді, сондықтан нәтижені соңында <code>reversed</code> етіңіз.', 'decode: <code>n = n * 62 + ALPHABET.find(ch)</code>; <code>find</code> таппаса <code>-1</code> қайтарады.'], 
            check: { tests: `assert encode(0) == "0" and encode(9) == "9" and encode(10) == "a", "0 → '0', 9 → '9', 10 → 'a'"
assert encode(61) == "Z" and encode(62) == "10" and encode(3844) == "100", "61 → 'Z', 62 → '10', 3844 → '100'"
assert encode(100000) == "q0U", "100000 → 'q0U'"
assert decode("q0U") == 100000 and decode("Z") == 61, "decode: кері түрлендіру"
assert all(decode(encode(n)) == n for n in list(range(0, 5000, 7)) + [10 ** 12]), "Round-trip: decode(encode(n)) == n"
for _bad in ["", "ab!", "тест"]:
    try:
        decode(_bad)
        assert False, "Қате кодта ValueError керек"
    except ValueError:
        pass
try:
    encode(-1)
    assert False, "Теріс санда ValueError керек"
except ValueError:
    pass
` } },
          { type: 'python', xp: 30, level: 'hard', prompt: '<code>Shortener</code> класын жазыңыз (<code>encode</code>, <code>URL_RE</code>, <code>ALIAS_RE</code> берілген). <code>create(raw_body)</code>: бұзық JSON немесе объект емес → <code>(400, {"error": "invalid json"})</code>; <code>url</code> <code>URL_RE.fullmatch</code>-тан өтпесе немесе <code>alias</code> берілсе де <code>ALIAS_RE</code>-ден өтпесе → <code>(422, {"errors": {...}})</code> (кілттері <code>"url"</code>/<code>"alias"</code>); alias-сыз бұрын қысқартылған URL → <code>(200, view)</code>; alias бос емес → <code>(409, {"error": "alias taken"})</code>; әйтпесе код (alias немесе <code>encode(self.next_id)</code>, id 100000-нан басталып өседі, бос емес кодты өткізіп жібереді) → <code>(201, view)</code>. View: <code>{"code", "short_url": base + code, "url"}</code>. <code>resolve(code)</code>: <code>(302, {"location": url})</code> және клік +1, немесе <code>(404, {"error": "not found"})</code>. <code>stats(code)</code>: <code>(200, {"code", "url", "clicks"})</code> немесе 404.', 
            starter: `import json, re

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n < 0:
        raise ValueError("теріс сан")
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, r = divmod(n, 62)
        out.append(ALPHABET[r])
    return "".join(reversed(out))

URL_RE = re.compile(r"https?://[A-Za-z0-9.-]+\\.[A-Za-z]{2,}(?::\\d+)?(?:/\\S*)?")
ALIAS_RE = re.compile(r"[A-Za-z0-9_-]{3,20}")

class Shortener:
    def __init__(self, base="https://tq.kz/"):
        self.base = base
        self.links = {}
        self.next_id = 100000

    def create(self, raw_body):
        return 201, {}

    def resolve(self, code):
        return 404, {"error": "not found"}

    def stats(self, code):
        return 404, {"error": "not found"}
`, 
            solution: `import json, re

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n < 0:
        raise ValueError("теріс сан")
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, r = divmod(n, 62)
        out.append(ALPHABET[r])
    return "".join(reversed(out))

URL_RE = re.compile(r"https?://[A-Za-z0-9.-]+\\.[A-Za-z]{2,}(?::\\d+)?(?:/\\S*)?")
ALIAS_RE = re.compile(r"[A-Za-z0-9_-]{3,20}")

class Shortener:
    def __init__(self, base="https://tq.kz/"):
        self.base = base
        self.links = {}
        self.by_url = {}
        self.next_id = 100000

    def create(self, raw_body):
        try:
            data = json.loads(raw_body)
        except json.JSONDecodeError:
            return 400, {"error": "invalid json"}
        if not isinstance(data, dict):
            return 400, {"error": "invalid json"}
        url = data.get("url")
        alias = data.get("alias")
        errors = {}
        if not isinstance(url, str) or not URL_RE.fullmatch(url):
            errors["url"] = "http(s) мекенжайы керек"
        if alias is not None and (not isinstance(alias, str) or not ALIAS_RE.fullmatch(alias)):
            errors["alias"] = "3-20 таңба: әріп, цифр, _ немесе -"
        if errors:
            return 422, {"errors": errors}
        if alias is None and url in self.by_url:
            code = self.by_url[url]
            return 200, self._view(code)
        if alias is not None:
            if alias in self.links:
                return 409, {"error": "alias taken"}
            code = alias
        else:
            code = encode(self.next_id)
            while code in self.links:
                self.next_id += 1
                code = encode(self.next_id)
            self.next_id += 1
            self.by_url[url] = code
        self.links[code] = {"url": url, "clicks": 0}
        return 201, self._view(code)

    def _view(self, code):
        return {"code": code, "short_url": self.base + code, "url": self.links[code]["url"]}

    def resolve(self, code):
        link = self.links.get(code)
        if link is None:
            return 404, {"error": "not found"}
        link["clicks"] += 1
        return 302, {"location": link["url"]}

    def stats(self, code):
        link = self.links.get(code)
        if link is None:
            return 404, {"error": "not found"}
        return 200, {"code": code, "url": link["url"], "clicks": link["clicks"]}
`, 
            hints: ['Валидацияның барлық қатесін бір <code>errors</code> сөздігіне жинап, бос болмаса 422 қайтарыңыз.', 'Автоматты код: <code>while code in self.links: self.next_id += 1; code = encode(self.next_id)</code>'], 
            check: { tests: `_s = Shortener()
_st, _v = _s.create('{"url": "https://kofe.kz/menu?city=almaty"}')
assert _st == 201 and _v == {"code": "q0U", "short_url": "https://tq.kz/q0U", "url": "https://kofe.kz/menu?city=almaty"}, "Бірінші сілтеме: 201, код encode(100000) = q0U"
assert _s.create('{"url": "https://kofe.kz/menu?city=almaty"}') == (200, _v), "Сол URL қайта: 200 және сол код"
assert _s.create('{"url": "https://tolqyn.kz", "alias": "nauryz"}')[1]["code"] == "nauryz", "Alias код ретінде қолданылады"
assert _s.create('{"url": "https://other.kz", "alias": "nauryz"}') == (409, {"error": "alias taken"}), "Бос емес alias: 409"
assert _s.create('{"url": "https://x.kz", "alias": "q0V"}')[0] == 201, "Alias q0V алынды"
assert _s.create('{"url": "https://bus.kz/route/92"}')[1]["code"] == "q0W", "Генератор алынған q0V кодын өткізіп жіберуі керек"
_st, _b = _s.create('{"url": "javascript:alert(1)", "alias": "a!"}')
assert _st == 422 and set(_b["errors"]) == {"url", "alias"}, "Қате url мен alias: 422, екі кілт"
assert _s.create('{"url": ') == (400, {"error": "invalid json"}), "Бұзық JSON: 400"
assert _s.create('"https://kofe.kz"') == (400, {"error": "invalid json"}), "Объект емес JSON: 400"
assert _s.resolve("q0U") == (302, {"location": "https://kofe.kz/menu?city=almaty"}), "resolve: 302 және location"
_s.resolve("q0U")
assert _s.stats("q0U") == (200, {"code": "q0U", "url": "https://kofe.kz/menu?city=almaty", "clicks": 2}), "Екі клік саналуы керек"
assert _s.stats("q0U")[1]["clicks"] == 2, "stats кліктерді арттырмайды"
assert _s.resolve("nope") == (404, {"error": "not found"}) and _s.stats("nope")[0] == 404, "Жоқ код: 404"
` } },
          { type: 'python', xp: 30, level: 'hard', prompt: 'Дайын <code>Shortener</code> үшін <code>ShortenerTests(unittest.TestCase)</code> жазыңыз: <code>setUp</code>-та <code>self.s = Shortener()</code>, кемінде 4 тест. Тексеру сіздің тесттеріңізді үш бұзылған нұсқада іске қосады: (1) <code>resolve</code> кліктерді санамайды, (2) <code>create</code> <code>"ftp://files.kz"</code> сияқты http(s) емес URL-ды қабылдайды, (3) сол URL екінші рет жаңа код алады. Әрқайсысында тесттеріңіз құлауы керек.', 
            starter: `import unittest
import json, re

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n < 0:
        raise ValueError("теріс сан")
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, r = divmod(n, 62)
        out.append(ALPHABET[r])
    return "".join(reversed(out))

URL_RE = re.compile(r"https?://[A-Za-z0-9.-]+\\.[A-Za-z]{2,}(?::\\d+)?(?:/\\S*)?")
ALIAS_RE = re.compile(r"[A-Za-z0-9_-]{3,20}")

class Shortener:
    def __init__(self, base="https://tq.kz/"):
        self.base = base
        self.links = {}
        self.by_url = {}
        self.next_id = 100000

    def create(self, raw_body):
        try:
            data = json.loads(raw_body)
        except json.JSONDecodeError:
            return 400, {"error": "invalid json"}
        if not isinstance(data, dict):
            return 400, {"error": "invalid json"}
        url = data.get("url")
        alias = data.get("alias")
        errors = {}
        if not isinstance(url, str) or not URL_RE.fullmatch(url):
            errors["url"] = "http(s) мекенжайы керек"
        if alias is not None and (not isinstance(alias, str) or not ALIAS_RE.fullmatch(alias)):
            errors["alias"] = "3-20 таңба: әріп, цифр, _ немесе -"
        if errors:
            return 422, {"errors": errors}
        if alias is None and url in self.by_url:
            code = self.by_url[url]
            return 200, self._view(code)
        if alias is not None:
            if alias in self.links:
                return 409, {"error": "alias taken"}
            code = alias
        else:
            code = encode(self.next_id)
            while code in self.links:
                self.next_id += 1
                code = encode(self.next_id)
            self.next_id += 1
            self.by_url[url] = code
        self.links[code] = {"url": url, "clicks": 0}
        return 201, self._view(code)

    def _view(self, code):
        return {"code": code, "short_url": self.base + code, "url": self.links[code]["url"]}

    def resolve(self, code):
        link = self.links.get(code)
        if link is None:
            return 404, {"error": "not found"}
        link["clicks"] += 1
        return 302, {"location": link["url"]}

    def stats(self, code):
        link = self.links.get(code)
        if link is None:
            return 404, {"error": "not found"}
        return 200, {"code": code, "url": link["url"], "clicks": link["clicks"]}

class ShortenerTests(unittest.TestCase):
    pass
`, 
            solution: `import unittest
import json, re

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n < 0:
        raise ValueError("теріс сан")
    if n == 0:
        return ALPHABET[0]
    out = []
    while n:
        n, r = divmod(n, 62)
        out.append(ALPHABET[r])
    return "".join(reversed(out))

URL_RE = re.compile(r"https?://[A-Za-z0-9.-]+\\.[A-Za-z]{2,}(?::\\d+)?(?:/\\S*)?")
ALIAS_RE = re.compile(r"[A-Za-z0-9_-]{3,20}")

class Shortener:
    def __init__(self, base="https://tq.kz/"):
        self.base = base
        self.links = {}
        self.by_url = {}
        self.next_id = 100000

    def create(self, raw_body):
        try:
            data = json.loads(raw_body)
        except json.JSONDecodeError:
            return 400, {"error": "invalid json"}
        if not isinstance(data, dict):
            return 400, {"error": "invalid json"}
        url = data.get("url")
        alias = data.get("alias")
        errors = {}
        if not isinstance(url, str) or not URL_RE.fullmatch(url):
            errors["url"] = "http(s) мекенжайы керек"
        if alias is not None and (not isinstance(alias, str) or not ALIAS_RE.fullmatch(alias)):
            errors["alias"] = "3-20 таңба: әріп, цифр, _ немесе -"
        if errors:
            return 422, {"errors": errors}
        if alias is None and url in self.by_url:
            code = self.by_url[url]
            return 200, self._view(code)
        if alias is not None:
            if alias in self.links:
                return 409, {"error": "alias taken"}
            code = alias
        else:
            code = encode(self.next_id)
            while code in self.links:
                self.next_id += 1
                code = encode(self.next_id)
            self.next_id += 1
            self.by_url[url] = code
        self.links[code] = {"url": url, "clicks": 0}
        return 201, self._view(code)

    def _view(self, code):
        return {"code": code, "short_url": self.base + code, "url": self.links[code]["url"]}

    def resolve(self, code):
        link = self.links.get(code)
        if link is None:
            return 404, {"error": "not found"}
        link["clicks"] += 1
        return 302, {"location": link["url"]}

    def stats(self, code):
        link = self.links.get(code)
        if link is None:
            return 404, {"error": "not found"}
        return 200, {"code": code, "url": link["url"], "clicks": link["clicks"]}

class ShortenerTests(unittest.TestCase):
    def setUp(self):
        self.s = Shortener()

    def test_create_returns_201(self):
        status, body = self.s.create('{"url": "https://kofe.kz"}')
        self.assertEqual(status, 201)
        self.assertTrue(body["short_url"].endswith(body["code"]))

    def test_rejects_non_http_url(self):
        status, body = self.s.create('{"url": "ftp://files.kz"}')
        self.assertEqual(status, 422)
        self.assertIn("url", body["errors"])

    def test_same_url_same_code(self):
        _, first = self.s.create('{"url": "https://kofe.kz"}')
        status, second = self.s.create('{"url": "https://kofe.kz"}')
        self.assertEqual(status, 200)
        self.assertEqual(first["code"], second["code"])

    def test_resolve_counts_clicks(self):
        _, body = self.s.create('{"url": "https://kofe.kz"}')
        self.s.resolve(body["code"])
        self.s.resolve(body["code"])
        self.assertEqual(self.s.stats(body["code"])[1]["clicks"], 2)

    def test_unknown_code(self):
        self.assertEqual(self.s.resolve("zzz")[0], 404)
`, 
            hints: ['Клік тесті: create, екі рет resolve, сосын <code>stats(code)[1]["clicks"]</code> 2-ге тең болуы керек.', 'Қате URL тесті: <code>self.s.create(\'{"url": "ftp://files.kz"}\')</code> 422 береді.'], 
            check: { tests: `import io as _io, unittest as _ut, re as _re
def _ok():
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(ShortenerTests))
assert "setUp" in ShortenerTests.__dict__, "setUp әдісі керек"
_r = _ok()
assert _r.testsRun >= 4, "Кемінде 4 тест керек"
assert _r.wasSuccessful(), "Тесттер дұрыс Shortener-де өтуі керек"
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
assert not _broken(_NoClicks), "Тесттер кліктер саналмайтынын ұстамады"
assert not _broken(_AnyUrl), "Тесттер ftp:// сияқты қате URL қабылданатынын ұстамады"
assert not _broken(_NoDedup), "Тесттер сол URL-ға жаңа код берілетінін ұстамады"
` } },
          { type: 'quiz', xp: 10, level: 'medium', prompt: 'Қысқа сілтеме неге <code>301</code> емес, <code>302</code> қайтарады?', options: ['302 жылдамырақ', '301-ді браузер кэштейді де, келесі жолы серверге келмейді, сонда клік саналмайды', '301 тек POST үшін', 'Айырмасы жоқ'], answer: 1, explain: '301 тұрақты бағыттау: браузер оны есте сақтайды. 302 уақытша, браузер әр жолы қысқартқышқа сұрайды, сондықтан сервис кліктерді санай алады және сілтеменің мақсатын кейін өзгерте алады.' }
        ]
      },
      {
        id: 'pyb-gate', gate: true, title: 'Модуль емтиханы: Python Backend', minutes: 35,
        body: `
<p>Емтихан бүкіл модульді қамтиды: HTTP сұрауды талдау, роутинг, валидация мен status code-тар, қол қойылған token, regex, rate limiting және ORM ойлауы. Өту үшін ұпайдың кемінде <b>75%</b>-ын жинау керек.</p>
<ul>
<li>Функция мен класс атаулары дәл берілгендей болуы керек. Handler-лер <code>(status, body)</code> жұбын қайтарады.</li>
<li>Алдымен шағын мысалмен <code>print</code> арқылы тексеріп алыңыз, сосын «Тексеру» батырмасын басыңыз.</li>
<li>Есіңізде болсын: 400 оқылмайтын сұрау, 422 ережеге сай емес мән, 401 кім екені белгісіз, 403 рұқсат жоқ, 404 жоқ, 405 метод жоқ.</li>
</ul>`,
        exercises: [
          { type: 'quiz', xp: 30, level: 'hard', prompt: 'Клиент жарамды token жіберді, token-де <code>"role": "barista"</code>, ал endpoint <code>menu:edit</code> рұқсатын талап етеді. Сонымен қатар body-дегі <code>price</code> теріс. Сервер не қайтаруы керек?', options: ['401, себебі рұқсат жоқ', '403, себебі пайдаланушы белгілі, бірақ бұл әрекетке рұқсаты жоқ; валидацияға дейін жетпейміз', '422, себебі price теріс', '400, себебі body қате'], answer: 1, explain: 'Token жарамды, демек authentication өтті (401 емес). Рұқсат тексерісі валидациядан бұрын жүреді: рұқсаты жоқ адамға деректің қай жері қате екенін айтудың қажеті жоқ. Сондықтан 403.' },
          { type: 'python', xp: 40, level: 'hard', prompt: '<code>handle_raw(raw)</code> жазыңыз: толық HTTP сұрау мәтінін алып, <code>(status, body)</code> қайтарсын. Маршруттар: <code>GET /v1/cafes/&lt;id&gt;</code> (id цифр болуы керек) → <code>CAFES</code>-те болса <code>(200, cafe)</code>, болмаса <code>(404, {"error": "not found"})</code>; <code>POST /v1/orders</code> → body JSON: бұзық немесе объект емес болса <code>(400, {"error": "invalid json"})</code>; <code>cafe_id</code> <code>CAFES</code>-те жоқ немесе <code>qty</code> 1-10 бүтін сан емес (bool емес) болса <code>(422, {"errors": {...}})</code> (кілттері <code>"cafe_id"</code>, <code>"qty"</code>); әйтпесе <code>(201, {"id": &lt;1-ден өседі&gt;, "cafe_id": ..., "qty": ...})</code>. Path бар, метод басқа болса <code>(405, {"error": "method not allowed"})</code>; басқа path → 404. Query string (<code>?</code>-тен кейін) елемеңіз.', 
            starter: `import json

CAFES = {1: {"id": 1, "name": "Kofe Bar", "city": "Астана"}, 2: {"id": 2, "name": "Daily Cup", "city": "Алматы"}}
ORDERS = []

def handle_raw(raw):
    return 404, {"error": "not found"}
`, 
            solution: `import json, re

CAFES = {1: {"id": 1, "name": "Kofe Bar", "city": "Астана"}, 2: {"id": 2, "name": "Daily Cup", "city": "Алматы"}}
ORDERS = []

def handle_raw(raw):
    head, _, body = raw.partition("\\r\\n\\r\\n")
    method, target, _v = head.split("\\r\\n")[0].split(" ")
    path = target.split("?", 1)[0].rstrip("/") or "/"
    m = re.fullmatch(r"/v1/cafes/(\\d+)", path)
    if m:
        if method != "GET":
            return 405, {"error": "method not allowed"}
        cafe = CAFES.get(int(m.group(1)))
        return (200, cafe) if cafe else (404, {"error": "not found"})
    if path == "/v1/orders":
        if method != "POST":
            return 405, {"error": "method not allowed"}
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            return 400, {"error": "invalid json"}
        if not isinstance(data, dict):
            return 400, {"error": "invalid json"}
        errors = {}
        cid = data.get("cafe_id")
        if isinstance(cid, bool) or cid not in CAFES:
            errors["cafe_id"] = "кофехана жоқ"
        qty = data.get("qty")
        if not isinstance(qty, int) or isinstance(qty, bool) or not 1 <= qty <= 10:
            errors["qty"] = "1-10 бүтін сан"
        if errors:
            return 422, {"errors": errors}
        order = {"id": len(ORDERS) + 1, "cafe_id": cid, "qty": qty}
        ORDERS.append(order)
        return 201, order
    return 404, {"error": "not found"}
`, 
            hints: [], 
            check: { tests: `def _req(method, path, body=""):
    return f"{method} {path} HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nContent-Type: application/json\\r\\n\\r\\n{body}"
assert handle_raw(_req("GET", "/v1/cafes/2?lang=kk")) == (200, CAFES[2]), "GET /v1/cafes/2: 200, query елемеу"
assert handle_raw(_req("GET", "/v1/cafes/9")) == (404, {"error": "not found"}), "Жоқ кофехана: 404"
assert handle_raw(_req("GET", "/v1/cafes/abc"))[0] == 404, "id цифр емес: 404"
assert handle_raw(_req("DELETE", "/v1/cafes/1")) == (405, {"error": "method not allowed"}), "Метод басқа: 405"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 1, "qty": 2}')) == (201, {"id": 1, "cafe_id": 1, "qty": 2}), "Сәтті тапсырыс: 201, id 1"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 2, "qty": 10}'))[1]["id"] == 2, "Келесі тапсырыс id 2"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 1,')) == (400, {"error": "invalid json"}), "Бұзық JSON: 400"
_st, _b = handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 5, "qty": true}'))
assert _st == 422 and set(_b["errors"]) == {"cafe_id", "qty"}, "Екі қате: 422, cafe_id және qty"
assert handle_raw(_req("GET", "/v1/orders"))[0] == 405, "GET /v1/orders: 405"
assert handle_raw(_req("GET", "/v2/buses"))[0] == 404, "Белгісіз path: 404"
` } },
          { type: 'python', xp: 35, level: 'hard', prompt: 'Fixed window rate limiter: <code>FixedWindow(limit, window, clock)</code>. Уақыт <code>window</code> секундтық терезелерге бөлінеді: терезе нөмірі <code>int(clock() // window)</code>. <code>allow(key)</code> осы терезеде осы key үшін <code>limit</code>-тен көп сұрау өткізбесін. <code>retry_after(key)</code>: лимит бітсе, келесі терезеге дейін қалған секунд, әйтпесе <code>0</code>.', 
            starter: `class FixedWindow:
    def __init__(self, limit, window, clock):
        self.limit, self.window, self.clock = limit, window, clock

    def allow(self, key):
        return True

    def retry_after(self, key):
        return 0
`, 
            solution: `class FixedWindow:
    def __init__(self, limit, window, clock):
        self.limit, self.window, self.clock = limit, window, clock
        self.counts = {}

    def _slot(self):
        return int(self.clock() // self.window)

    def allow(self, key):
        slot = self._slot()
        k = (key, slot)
        if self.counts.get(k, 0) >= self.limit:
            return False
        self.counts[k] = self.counts.get(k, 0) + 1
        return True

    def retry_after(self, key):
        slot = self._slot()
        if self.counts.get((key, slot), 0) < self.limit:
            return 0
        return (slot + 1) * self.window - self.clock()
`, 
            hints: [], 
            check: { tests: `class _Clock:
    t = 0.0
    def __call__(self):
        return self.t
_c = _Clock()
_fw = FixedWindow(limit=2, window=60, clock=_c)
_c.t = 10
assert [_fw.allow("dana") for _ in range(3)] == [True, True, False], "Терезеде 2 сұрау өтеді, 3-сі жоқ"
assert _fw.allow("erlan") is True, "Әр key бөлек есептеледі"
assert _fw.retry_after("dana") == 50, "t=10, терезе 60: 50 секунд қалды"
assert _fw.retry_after("erlan") == 0, "Лимит бітпесе retry_after = 0"
_c.t = 59.5
assert _fw.allow("dana") is False, "Сол терезе әлі бітпеді"
_c.t = 60
assert _fw.allow("dana") is True and _fw.allow("dana") is True and _fw.allow("dana") is False, "Жаңа терезеде есеп қайта басталады"
` } },
          { type: 'python', xp: 35, level: 'hard', prompt: 'Access log талдау. Әр жол: <code>2026-03-21T09:15:02 GET /v1/cafes/12 200 0.031</code> (уақыт, метод, path, status, секунд). <code>summarize(log)</code> regex-пен жолдарды талдасын (форматқа сай емес жолдарды өткізсін) және сөздік қайтарсын: <code>"groups"</code>: <code>{"2xx": n, "4xx": n, "5xx": n}</code> (тек кездескен топтар); <code>"slow"</code>: 0.5 секундтан ұзақ сұраулардың <code>"METHOD path"</code> тізімі (лог ретімен); <code>"top"</code>: ең көп сұралған endpoint, мұнда path-тағы сан id-лер <code>&lt;id&gt;</code>-мен ауыстырылады (<code>"GET /v1/cafes/&lt;id&gt;"</code>).', 
            starter: `import re
from collections import Counter

def summarize(log):
    return {"groups": {}, "slow": [], "top": None}
`, 
            solution: `import re
from collections import Counter

LINE = re.compile(r"^\\S+ (?P<method>[A-Z]+) (?P<path>/\\S*) (?P<status>\\d{3}) (?P<secs>\\d+(?:\\.\\d+)?)$")

def summarize(log):
    groups, endpoints, slow = Counter(), Counter(), []
    for line in log.splitlines():
        m = LINE.match(line.strip())
        if not m:
            continue
        method, path = m.group("method"), m.group("path")
        groups[m.group("status")[0] + "xx"] += 1
        endpoints[method + " " + re.sub(r"/\\d+(?=/|$)", "/<id>", path)] += 1
        if float(m.group("secs")) > 0.5:
            slow.append(method + " " + path)
    top = endpoints.most_common(1)[0][0] if endpoints else None
    return {"groups": dict(groups), "slow": slow, "top": top}
`, 
            hints: [], 
            check: { tests: `_log = """2026-03-21T09:15:02 GET /v1/cafes/12 200 0.031
2026-03-21T09:15:03 GET /v1/cafes/7 200 0.044
2026-03-21T09:15:03 POST /v1/orders 201 0.820
бұзық жол
2026-03-21T09:15:04 GET /v1/cafes/99 404 0.012
2026-03-21T09:15:05 GET /v1/orders/5/items 500 1.700
2026-03-21T09:15:06 GET /v1/menu 200 0.090"""
_s = summarize(_log)
assert _s["groups"] == {"2xx": 4, "4xx": 1, "5xx": 1}, "Status топтары: 2xx=4, 4xx=1, 5xx=1 (бұзық жол өткізіледі)"
assert _s["slow"] == ["POST /v1/orders", "GET /v1/orders/5/items"], "0.5 секундтан ұзақ сұраулар, лог ретімен"
assert _s["top"] == "GET /v1/cafes/<id>", "id-лер <id> болып топтасады: GET /v1/cafes/<id> үш рет"
assert summarize("") == {"groups": {}, "slow": [], "top": None}, "Бос лог"
` } },
          { type: 'python', xp: 35, level: 'hard', prompt: 'Session cookie. <code>make_cookie(user_id, secret)</code>: <code>"&lt;user_id&gt;.&lt;sig&gt;"</code>, мұнда <code>sig</code> = <code>hmac.new(secret.encode(), str(user_id).encode(), hashlib.sha256).hexdigest()[:16]</code>. <code>current_user(headers, secret, users)</code>: <code>headers</code> сөздігінен <code>"cookie"</code> header-ін алып (мысалы <code>"theme=dark; sid=7.ab12...; lang=kk"</code>), <code>sid</code> мәнін тауып, қолтаңбасын <code>hmac.compare_digest</code> арқылы тексерсін. Бәрі дұрыс және user <code>users</code> сөздігінде болса, user сөздігін қайтарсын, әйтпесе <code>None</code>.', 
            starter: `import hashlib, hmac

def make_cookie(user_id, secret):
    return str(user_id)

def current_user(headers, secret, users):
    return None
`, 
            solution: `import hashlib, hmac

def _sig(user_id, secret):
    return hmac.new(secret.encode(), str(user_id).encode(), hashlib.sha256).hexdigest()[:16]

def make_cookie(user_id, secret):
    return f"{user_id}.{_sig(user_id, secret)}"

def current_user(headers, secret, users):
    cookies = {}
    for part in headers.get("cookie", "").split(";"):
        name, sep, value = part.strip().partition("=")
        if sep:
            cookies[name] = value
    sid = cookies.get("sid")
    if not sid or "." not in sid:
        return None
    uid, sig = sid.split(".", 1)
    if not uid.isdigit() or not hmac.compare_digest(sig, _sig(uid, secret)):
        return None
    return users.get(int(uid))
`, 
            hints: [], mustInclude: ['compare_digest'], 
            check: { tests: `_users = {7: {"name": "Сая", "role": "barista"}, 8: {"name": "Ерлан", "role": "manager"}}
_ck = make_cookie(7, "k3y")
import hmac as _h, hashlib as _hl
assert _ck == "7." + _h.new(b"k3y", b"7", _hl.sha256).hexdigest()[:16], "Cookie: user_id.sig, sig HMAC-тің алғашқы 16 таңбасы"
assert current_user({"cookie": "theme=dark; sid=" + _ck + "; lang=kk"}, "k3y", _users) == _users[7], "Дұрыс cookie: user қайтарылады"
assert current_user({"cookie": "sid=8." + _ck.split(".")[1]}, "k3y", _users) is None, "Басқа user_id-ге көшірілген қолтаңба жарамайды"
assert current_user({"cookie": "sid=" + _ck}, "other", _users) is None, "Басқа секрет: None"
assert current_user({}, "k3y", _users) is None, "Cookie жоқ: None"
assert current_user({"cookie": "sid=" + make_cookie(99, "k3y")}, "k3y", _users) is None, "users-те жоқ id: None"
assert current_user({"cookie": "sid=garbage"}, "k3y", _users) is None, "Бұзық sid: None"
` } },
          { type: 'quiz', xp: 30, level: 'medium', prompt: 'Бет 100 тапсырысты көрсетеді. Логта 1 сұрау <code>SELECT * FROM orders</code> және 100 сұрау <code>SELECT * FROM customers WHERE id = ?</code>. Мәселе мен шешім қандай?', options: ['Индекс жоқ; <code>orders</code>-ке индекс қосу', 'N+1; клиенттерді бір сұраумен алу (<code>JOIN</code> немесе <code>WHERE id IN (...)</code>, ORM-да select_related/joinedload)', 'Кэш жоқ; әр сұрауды lru_cache-пен орау', 'Gunicorn worker аз; worker санын көбейту'], answer: 1, explain: 'Бір негізгі сұрау және әр жолға бір қосымша сұрау: классикалық N+1. Байланысты деректі бір сұраумен алдын ала алу оны 2 сұрауға (немесе JOIN арқылы 1-ге) қысқартады.' }
        ]
      }
    ]
  };
})();
