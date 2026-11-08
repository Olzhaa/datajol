// PY3 Python Backend: English text. Code, solutions and expected output are in content/backend.js.
DJ.i18n.patch({
  modules: {
    'py-3': { intro: 'The step after Python basics and Intermediate Python: you build the server side yourself and see how it works. You will take apart an HTTP request, design a REST API, write a router, validation, the ORM idea, authentication, tests, regex, async code and deployment. There is no real server in the browser, so everything is built from plain Python models, and at the end you put together a URL shortener service.' }
  },
  lessons: {
    'pyb-1': {
      title: 'How the web works: HTTP request and response',
      body: `
<p>You open a delivery app on your phone and see a list of coffee shops in Almaty. At that moment the phone (<b>client</b>) sends a request over the internet to a remote computer (<b>server</b>), and the server sends back a response. A backend developer writes the server side: accepts the request, gets data from the database and builds the response.</p>
<p>In the REST lesson of the Software Eng course you saw the methods and the status code table. Now let's go one level lower: an HTTP request is actually <b>plain text</b>, and we can parse it ourselves.</p>
<h3>The path of one request</h3>
<ul>
<li><b>DNS</b>: the name <code>api.kofe.kz</code> is turned into an IP address.</li>
<li><b>A TCP connection</b> is opened (for HTTPS, TLS encryption is added on top).</li>
<li>The client sends the text of the HTTP request, and the server sends back the text of the HTTP response.</li>
</ul>
<h3>Structure of a request</h3>
<pre><code>GET /cafes?city=Алматы&amp;page=2 HTTP/1.1      ← request line: method, path, version
Host: api.kofe.kz                          ← headers: "Name: value"
Accept: application/json
User-Agent: KofeApp/3.1
                                           ← empty line: headers are finished
(a GET usually has no body)</code></pre>
<p>Lines are separated by <code>\\r\\n</code> (CRLF). Between the headers and the body there is an <b>empty line</b>, that is <code>\\r\\n\\r\\n</code>. The part of the path after the <code>?</code> is called the <b>query string</b>: <code>city=Алматы&amp;page=2</code>.</p>
<h3>Common headers</h3>
<table>
<tr><th>Header</th><th>What it is for</th></tr>
<tr><td><code>Content-Type</code></td><td>format of the body: <code>application/json</code>, <code>text/html</code></td></tr>
<tr><td><code>Content-Length</code></td><td>length of the body in <b>bytes</b></td></tr>
<tr><td><code>Authorization</code></td><td>who is making the request: <code>Bearer &lt;token&gt;</code></td></tr>
<tr><td><code>Cookie</code> / <code>Set-Cookie</code></td><td>session identifier</td></tr>
<tr><td><code>Cache-Control</code></td><td>how long the response can be stored in a cache</td></tr>
</table>
<p>Header names are not case-sensitive: <code>content-type</code> and <code>Content-Type</code> mean the same thing. So when parsing, it is convenient to lowercase the name.</p>
<h3>Parsing a request in Python</h3>
<pre><code>raw = "POST /orders HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nContent-Type: application/json\\r\\n\\r\\n{\\"drink\\": \\"latte\\"}"
head, body = raw.split("\\r\\n\\r\\n", 1)
lines = head.split("\\r\\n")
method, path, version = lines[0].split(" ")
headers = {}
for line in lines[1:]:
    name, value = line.split(":", 1)
    headers[name.strip().lower()] = value.strip()
print(method, path, headers["content-type"], body)</code></pre>
<p>A response has the same shape: the first line is <code>HTTP/1.1 201 Created</code>, then the headers, an empty line and the body. The response group is set by the first digit of the status code: 1xx — information, 2xx — success, 3xx — redirect, 4xx — client error, 5xx — server error.</p>
<h3>Common mistakes</h3>
<ul>
<li>Calling <code>split(":")</code> without a limit: <code>Host: localhost:8000</code> contains another colon. Write <code>split(":", 1)</code>.</li>
<li>Counting <code>Content-Length</code> in characters: "Алматы" is 6 characters, but in UTF-8 it is 12 bytes.</li>
<li>Looking for the end of the body with <code>"\\n\\n"</code>: in HTTP the separator is <code>"\\r\\n\\r\\n"</code>.</li>
</ul>
<p>Handling one request on the server always has three steps: parse the text, run the business logic and build the response text. In this module we write each step as a separate function and at the end combine them into one service.</p>
<div class="tip">Frameworks such as Flask, FastAPI and Django do this parsing for you and give you a ready <code>request</code> object. But when an error happens (for example, 400 Bad Request), it helps a lot to understand what happens underneath.</div>`,
      ex: [
        { prompt: 'Write the function <code>parse_request(raw)</code>. It must return a dictionary: <code>method</code>, <code>path</code> (without the query), <code>query</code> (a dictionary of <code>k=v</code> pairs after <code>?</code>; <code>{}</code> if there are none), <code>headers</code> (names in lowercase, values stripped with <code>strip</code>) and <code>body</code> (a string, or <code>""</code> if there is no body).', hints: ['First split <code>raw</code> into head and body with <code>raw.partition("\\r\\n\\r\\n")</code>.', 'Split each header line with <code>line.split(":", 1)</code>, because the value can contain a colon too.'], check: { tests: `_raw = "POST /orders?city=Shymkent&size=L HTTP/1.1\\r\\nHost: localhost:8000\\r\\nContent-Type:  application/json \\r\\n\\r\\n{\\"drink\\": \\"latte\\"}"
_r = parse_request(_raw)
assert _r.get("method") == "POST", "method: the first word of the first line"
assert _r.get("path") == "/orders", "path must be without the query: /orders"
assert _r.get("query") == {"city": "Shymkent", "size": "L"}, "query: the k=v pairs after ?"
assert _r.get("headers") == {"host": "localhost:8000", "content-type": "application/json"}, "headers: names in lowercase, values stripped, the colon in the port is kept"
assert _r.get("body") == '{"drink": "latte"}', "body: the text after the empty line"
_g = parse_request("GET /cafes HTTP/1.1\\r\\nAccept: */*\\r\\n\\r\\n")
assert _g["query"] == {} and _g["body"] == "" and _g["path"] == "/cafes", "If there is no query and no body: {} and an empty string"
` } },
        { prompt: 'Write the function <code>status_group(code)</code>: 100-199 → <code>"info"</code>, 200-299 → <code>"success"</code>, 300-399 → <code>"redirect"</code>, 400-499 → <code>"client_error"</code>, 500-599 → <code>"server_error"</code>, any other number → <code>ValueError</code>. Then fill in the dictionary <code>REASONS</code>: for the codes 200, 201, 204, 301, 400, 401, 403, 404 and 500 write the standard names (<code>"OK"</code>, <code>"Created"</code>, <code>"No Content"</code>, <code>"Moved Permanently"</code>, <code>"Bad Request"</code>, <code>"Unauthorized"</code>, <code>"Forbidden"</code>, <code>"Not Found"</code>, <code>"Internal Server Error"</code>).', hints: ['The group number: <code>code // 100</code>.', 'Range check: <code>if not 100 &lt;= code &lt;= 599: raise ValueError(...)</code>'], check: { tests: `assert status_group(204) == "success", "204 belongs to the success group"
assert status_group(302) == "redirect", "3xx: redirect"
assert status_group(422) == "client_error", "4xx: client error"
assert status_group(503) == "server_error", "5xx: server error"
assert status_group(101) == "info", "1xx: info"
try:
    status_group(42)
    assert False, "For 42 a ValueError must be raised"
except ValueError:
    pass
assert REASONS.get(404) == "Not Found" and REASONS.get(201) == "Created" and REASONS.get(403) == "Forbidden", "REASONS: names for 404, 201 and 403"
assert len(REASONS) == 9 and REASONS.get(204) == "No Content" and REASONS.get(500) == "Internal Server Error", "REASONS must contain nine codes"
` } },
        { prompt: 'Write the function <code>build_response(status, data)</code>. It must return the text of an HTTP response: <code>"HTTP/1.1 &lt;status&gt; &lt;reason&gt;\\r\\nContent-Type: application/json\\r\\nContent-Length: &lt;N&gt;\\r\\n\\r\\n&lt;body&gt;"</code>. Body: <code>json.dumps(data, ensure_ascii=False)</code>. <code>N</code> is the number of <b>bytes</b> of the body in UTF-8. Take the reason phrase from the dictionary <code>REASONS</code>.', hints: ['Number of bytes: <code>len(body.encode("utf-8"))</code>, while <code>len(body)</code> gives the number of characters.'], check: { tests: `_r = build_response(201, {"city": "Алматы"})
_head, _body = _r.split("\\r\\n\\r\\n", 1)
assert _head.split("\\r\\n")[0] == "HTTP/1.1 201 Created", "First line: HTTP/1.1 201 Created"
assert "Content-Type: application/json" in _head.split("\\r\\n"), "The Content-Type header is required"
assert "Content-Length: 24" in _head.split("\\r\\n"), "Content-Length in bytes: Cyrillic letters take 2 bytes in UTF-8, so the body is 24 bytes"
assert _body == '{"city": "Алматы"}', "Body: json.dumps(data, ensure_ascii=False)"
assert build_response(404, {}).startswith("HTTP/1.1 404 Not Found\\r\\n"), "For 404 the reason is: Not Found"
` } },
        { prompt: 'At which point does the headers block end in an HTTP request?', options: ['At the first <code>\\r\\n</code>', 'At the empty line, that is at <code>\\r\\n\\r\\n</code>', 'After the <code>Content-Length</code> header', 'At the first <code>{</code> character of the body'], explain: 'Each header is on its own line, and there is an empty line between the headers and the body: <code>\\r\\n\\r\\n</code>. Content-Length tells where the body ends.' }
      ]
    },
    'pyb-2': {
      title: 'Debugging and code style: traceback, PEP 8, docstring',
      body: `
<p>Much of backend work goes into answering the question "why doesn't this work?". Finding a bug quickly is a skill that matters as much as knowing new syntax. And clean style helps to have fewer bugs in the first place.</p>
<h3>Read a traceback from the bottom up</h3>
<pre><code>Traceback (most recent call last):
  File "app.py", line 14, in &lt;module&gt;
    print(order_total(cart))
  File "app.py", line 9, in order_total
    total += item["price"] * item["qty"]
KeyError: 'qty'</code></pre>
<ul>
<li><b>The bottom line</b>: the type of the error and its cause. Here it is <code>KeyError: 'qty'</code>, which means that one of the items has no <code>qty</code> key.</li>
<li>Above it: the <b>line</b> where the error happened (<code>line 9, in order_total</code>).</li>
<li>Higher up: who called this function. This chain is called the call stack.</li>
</ul>
<p>Common types: <code>TypeError</code> (incompatible types, for example <code>"#" + 5</code>), <code>KeyError</code>, <code>IndexError</code>, <code>AttributeError</code> (an object such as <code>None</code> has no such method), <code>ZeroDivisionError</code>.</p>
<h3>print and breakpoint</h3>
<p>The simplest way: put <code>print(f"{item=}")</code> at the suspicious place. The <code>=</code> sign also prints the variable name: <code>item={'name': 'latte'}</code>. For harder cases write <code>breakpoint()</code>: the program stops there and the <code>pdb</code> debugger opens.</p>
<table>
<tr><th>pdb command</th><th>What it does</th></tr>
<tr><td><code>p x</code></td><td>show the value of a variable</td></tr>
<tr><td><code>n</code></td><td>next line (next)</td></tr>
<tr><td><code>s</code></td><td>step into a function (step)</td></tr>
<tr><td><code>c</code></td><td>continue until the next stop</td></tr>
<tr><td><code>l</code></td><td>show the code around the current line</td></tr>
</table>
<p>The Python in the browser has no interactive debugger, so here we use <code>print</code>. In VS Code and PyCharm you can set a breakpoint next to the line number and do the same thing with the mouse.</p>
<h3>PEP 8: common style</h3>
<pre><code>MAX_ITEMS = 50                      # constant: UPPER_CASE

class OrderService:                 # class: CamelCase
    def total_price(self, items):   # function, variable: snake_case
        """Returns the total price of the items in tenge."""
        return sum(i["price"] * i["qty"] for i in items)</code></pre>
<ul>
<li>Indentation: 4 spaces, not tabs. A line is about 79-99 characters long at most.</li>
<li>Spaces around operators: <code>x = a + b</code>, but there are no spaces inside <code>f(a=1)</code>.</li>
<li><code>import</code> goes at the top of the file. Names must be meaningful: not <code>d</code> but <code>delivery_fee</code>.</li>
</ul>
<h3>Docstring</h3>
<p>The triple-quoted text on the first line of a function is called a <b>docstring</b>. You can read it with <code>func.__doc__</code> or <code>help(func)</code>. A good docstring says what the function does, its parameters, what it returns and which errors it can raise.</p>
<h3>Common mistakes</h3>
<ul>
<li>Reading only the top line of a traceback and missing the real cause (the bottom line).</li>
<li>Using <code>[]</code> as a default value: the list is then shared by all calls.</li>
<li>Leaving debug <code>print</code>s in the code. In production use <code>logging</code> (we covered it in the Software Eng course).</li>
</ul>
<div class="tip">Before you fix a bug, find the smallest example that <b>reproduces</b> it. If the example shrinks to 3 lines, the cause usually becomes obvious.</div>`,
      ex: [
        { prompt: 'The cash register function <code>average_bill(bills)</code> has two bugs: the first receipt is not counted, and an empty list raises <code>ZeroDivisionError</code>. Fix it: the average must be returned with <code>round(..., 1)</code>, and for an empty list the function must return <code>0</code>.', hints: ['<code>range(1, ...)</code> skips index 0.', 'At the start: <code>if not bills: return 0</code>'], check: { tests: `assert average_bill([1200, 1800, 2400]) == 1800.0, "All receipts must be counted: (1200+1800+2400)/3 = 1800.0"
assert average_bill([1500]) == 1500.0, "With one receipt the average equals that receipt"
assert average_bill([]) == 0, "For an empty list return 0"
` } },
        { prompt: 'Two functions have bugs. <code>order_label(order_id)</code> must return a string like <code>"Тапсырыс #17"</code> ("Тапсырыс" is the Kazakh word for "order"), but it raises <code>TypeError</code>. <code>add_tag(tag, tags=[])</code> must return a new list on every call, but tags accumulate between calls. Fix both functions.', hints: ['Join the string and the number with an f-string.', 'Make the default value <code>None</code> and create a new list inside the function.'], check: { tests: `assert order_label(17) == "Тапсырыс #17", "order_label(17) must return 'Тапсырыс #17'"
assert add_tag("vegan") == ["vegan"], "First call: ['vegan']"
assert add_tag("hot") == ["hot"], "The second call must not see the previous tag: ['hot']"
assert add_tag("x", ["a"]) == ["a", "x"], "The tag must be added to the list that was passed in"
` } },
        { prompt: 'Write <code>delivery_fee(distance_km, express=False)</code> with a docstring following PEP 8. Rule: up to 3 km costs 500 ₸, and each additional full or partial kilometre costs 150 ₸ (<code>math.ceil</code>). If <code>express=True</code>, 700 ₸ is added to the price. The docstring must contain the word <code>km</code>. For a negative distance raise <code>ValueError</code>.', hints: ['Put <code>"""..."""</code> as the first line inside the function.', 'Additional kilometres: <code>max(0, math.ceil(distance_km - 3))</code>'], check: { tests: `assert "delivery_fee" in dir(), "The function name is in snake_case: delivery_fee"
assert delivery_fee.__doc__ and "km" in delivery_fee.__doc__, "A docstring is required, and it must contain the word km"
assert delivery_fee(2) == 500, "Up to 3 km: 500"
assert delivery_fee(4.2) == 800, "4.2 km: 500 + 2*150 = 800"
assert delivery_fee(3, express=True) == 1200, "express: +700"
try:
    delivery_fee(-1)
    assert False, "For a negative distance a ValueError is required"
except ValueError:
    pass
` } },
        { prompt: 'The last line of a traceback is <code>AttributeError: \'NoneType\' object has no attribute \'get\'</code>. What is the most likely cause?', options: ['The dictionary has no such key', 'The variable was supposed to be a dictionary but became <code>None</code>, for example because the function ended without a <code>return</code>', 'The Python version is outdated', 'The <code>get</code> method exists only for lists'], explain: '<code>None</code> has no <code>.get</code> method. This usually means that a function returned nothing (a forgotten <code>return</code>) or a search found nothing, so the variable became <code>None</code>. Use the traceback to find where the value of that variable came from.' }
      ]
    },
    'pyb-3': {
      title: 'REST API design: resources, CRUD, pagination',
      body: `
<p>Once a developer has seen a good API, they can predict the other endpoints. That is the point of REST design: everything is a <b>resource</b> (a noun), and the action is given by the HTTP method.</p>
<h3>Names</h3>
<ul>
<li>A resource is named in the plural, as a noun: <code>/products</code>, <code>/orders</code>. Not <code>/getProducts</code> or <code>/createOrder</code>.</li>
<li>One object: <code>/products/42</code>. A nested resource: <code>/shops/3/orders</code> (the orders of shop 3).</li>
<li>Lowercase letters, words separated by hyphens: <code>/gift-cards</code>. The version goes before the resource: <code>/v1/products</code>.</li>
<li>Filters and sorting go into the query string: <code>/products?city=Алматы&amp;sort=-price</code>.</li>
</ul>
<h3>CRUD and methods</h3>
<table>
<tr><th>Action</th><th>Request</th><th>Successful response</th></tr>
<tr><td>List</td><td><code>GET /products</code></td><td>200 + list</td></tr>
<tr><td>Create</td><td><code>POST /products</code></td><td>201 + new object (and a <code>Location</code> header)</td></tr>
<tr><td>Read one</td><td><code>GET /products/42</code></td><td>200 or 404</td></tr>
<tr><td>Full replace</td><td><code>PUT /products/42</code></td><td>200</td></tr>
<tr><td>Partial update</td><td><code>PATCH /products/42</code></td><td>200</td></tr>
<tr><td>Delete</td><td><code>DELETE /products/42</code></td><td>204, no body</td></tr>
</table>
<h3>JSON payload</h3>
<pre><code>POST /v1/orders
{"cafe_id": 7, "items": [{"drink": "latte", "qty": 2}], "pickup": "12:30"}

201 Created
Location: /v1/orders/1051
{"id": 1051, "status": "new", "total": 3200}</code></pre>
<p>Keep the keys in one style (usually <code>snake_case</code> or <code>camelCase</code>, do not mix them). Dates and times use ISO format: <code>"2026-03-21T12:30:00+05:00"</code>. Store money as an integer (in tiyn or in tenge), not as a float.</p>
<h3>Idempotency</h3>
<p>Imagine the mobile internet drops and the client sends the same request again. <code>PUT</code> and <code>DELETE</code> are idempotent: a repeat does not change the result. If a <code>POST</code> is repeated, two orders can be created and the customer can be charged twice. That is why payment APIs require an <code>Idempotency-Key</code> header: the server remembers the key and returns the earlier response for a repeated request.</p>
<h3>Pagination</h3>
<p>Sending 10 000 products in one response is slow. There are two approaches:</p>
<ul>
<li><b>Page/offset</b>: <code>?page=2&amp;per_page=20</code>. Simple, but if the list changes, items can repeat or disappear.</li>
<li><b>Cursor</b>: <code>?after=1050&amp;limit=20</code>, that is "20 items after id 1050". Stable for large lists that change often.</li>
</ul>
<pre><code>def page_of(items, page, per_page):
    start = (page - 1) * per_page
    return items[start:start + per_page]</code></pre>
<h3>Error response format</h3>
<p>Even an error response should have the same shape, so the client can handle it in one place. For example: <code>{"error": {"code": "not_found", "message": "Товар не найден"}}</code>. The status code names the general category, while the <code>code</code> field names the specific reason. In the next lessons, the router and validation will return exactly this format.</p>
<h3>Common mistakes</h3>
<ul>
<li>Putting verbs in URLs (<code>/deleteUser/5</code>) or doing everything with <code>POST</code>.</li>
<li>Returning 200 for an error and putting <code>{"error": ...}</code> in the body. Clients rely on the status code.</li>
<li>A list without pagination: 50 records today, 500 000 a year from now.</li>
</ul>
<div class="tip">Before you write an API, write the table of endpoints (method, path, request, response, codes) on one page. It is the cheapest way to agree with the frontend developer.</div>`,
      ex: [
        { prompt: 'Write the function <code>crud_routes(resource)</code>. It must return a dictionary <code>(method, path) → action</code>. For <code>crud_routes("products")</code>: <code>("GET", "/products")</code> → <code>"list"</code>, <code>("POST", "/products")</code> → <code>"create"</code>, <code>("GET", "/products/&lt;id&gt;")</code> → <code>"retrieve"</code>, <code>PUT</code> → <code>"replace"</code>, <code>PATCH</code> → <code>"update"</code>, <code>DELETE</code> → <code>"delete"</code> (the last three are for the path <code>/products/&lt;id&gt;</code>).', hints: ['There are two paths: the collection <code>"/" + resource</code> and the item <code>"/" + resource + "/&lt;id&gt;"</code>.'], check: { tests: `_r = crud_routes("products")
assert len(_r) == 6, "There must be six routes"
assert _r.get(("GET", "/products")) == "list" and _r.get(("POST", "/products")) == "create", "Collection: GET → list, POST → create"
assert _r.get(("GET", "/products/<id>")) == "retrieve", "GET /products/<id> → retrieve"
assert _r.get(("PUT", "/products/<id>")) == "replace" and _r.get(("PATCH", "/products/<id>")) == "update", "PUT → replace, PATCH → update"
assert _r.get(("DELETE", "/products/<id>")) == "delete", "DELETE /products/<id> → delete"
assert ("POST", "/cafes") in crud_routes("cafes"), "The function must work with any resource name"
` } },
        { prompt: 'Write the function <code>paginate(items, page=1, per_page=10)</code>. It must return a dictionary: <code>items</code> (the items on this page), <code>page</code>, <code>per_page</code>, <code>total</code> (the total number of items), <code>pages</code> (the number of pages; 0 for an empty list), <code>has_next</code> (whether there is a next page). If <code>page &lt; 1</code> or <code>per_page</code> is outside 1-100, raise <code>ValueError</code>.', hints: ['Number of pages: <code>math.ceil(total / per_page)</code>.', 'Slice: <code>items[(page - 1) * per_page : page * per_page]</code>'], check: { tests: `_cafes = [f"cafe-{i}" for i in range(1, 24)]
_p = paginate(_cafes, page=3, per_page=10)
assert _p["items"] == ["cafe-21", "cafe-22", "cafe-23"], "Page 3: the last three items"
assert _p["total"] == 23 and _p["pages"] == 3, "total=23, pages=3"
assert _p["has_next"] is False, "On the last page has_next is False"
_p1 = paginate(_cafes, page=1, per_page=10)
assert _p1["has_next"] is True and len(_p1["items"]) == 10 and _p1["page"] == 1 and _p1["per_page"] == 10, "Page 1: 10 items, has_next True"
assert paginate([], 1, 10)["pages"] == 0, "In an empty list pages = 0"
assert paginate(_cafes, page=5, per_page=10)["items"] == [], "Beyond the last page: an empty list"
for _bad in [(0, 10), (1, 0), (1, 101)]:
    try:
        paginate(_cafes, *_bad)
        assert False, "Wrong parameters must raise ValueError"
    except ValueError:
        pass
` } },
        { prompt: 'Cursor pagination. The list <code>items</code> consists of dictionaries sorted by <code>id</code> in ascending order. The function <code>after_cursor(items, after=None, limit=3)</code> must take the first <code>limit</code> items whose <code>id &gt; after</code> (if <code>after=None</code>, start from the beginning). The result: <code>{"items": [...], "next": &lt;id of the last item or None&gt;}</code>. <code>next</code> is an id only if there are more items after them.', hints: ['First filter the items with <code>id &gt; after</code>, then take <code>[:limit]</code>.', '<code>next</code> is filled only if the filtered list is longer than <code>limit</code>.'], check: { tests: `_orders = [{"id": i, "total": i * 100} for i in [3, 5, 8, 9, 12, 15, 20]]
_a = after_cursor(_orders, limit=3)
assert [o["id"] for o in _a["items"]] == [3, 5, 8], "The first three from the start"
assert _a["next"] == 8, "next = the id of the last returned item (8)"
_b = after_cursor(_orders, after=_a["next"], limit=3)
assert [o["id"] for o in _b["items"]] == [9, 12, 15] and _b["next"] == 15, "after=8: 9, 12, 15 and next=15"
_c = after_cursor(_orders, after=15, limit=3)
assert [o["id"] for o in _c["items"]] == [20] and _c["next"] is None, "The last page: next None"
assert after_cursor(_orders, after=12, limit=3)["next"] is None, "If exactly limit items are left and there are no more, next None"
` } },
        { prompt: 'A client sent <code>POST /v1/payments</code>, but the connection dropped before the response arrived. Which solution best protects against a double charge?', options: ['Use GET instead of POST', 'The client sends a unique <code>Idempotency-Key</code> header for each payment, and the server returns the earlier response for a repeated key', 'The server returns 500', 'The client never retries the request'], explain: 'POST is not idempotent. The Idempotency-Key lets the server know that this is the same request. GET must not change data, so it is not suitable for payments.' }
      ]
    },
    'pyb-4': {
      title: 'Routing: writing your own router with a decorator',
      body: `
<p>The server has parsed the request: <code>GET /users/42</code>. Which function should answer it? That question is answered by the <b>router</b>. In Flask it looks like this:</p>
<pre><code>@app.route("/users/&lt;id&gt;", methods=["GET"])
def get_user(id):
    ...</code></pre>
<p>In the Intermediate Python course you saw that a decorator takes a function and returns a function. <code>app.route(...)</code> is a decorator with parameters: first it is called itself and returns the real decorator, which registers the function in the route table and returns it <b>unchanged</b>.</p>
<h3>Matching a path against a pattern</h3>
<p>We split the pattern and the path into parts by <code>/</code>. The number of parts must be the same. A part like <code>&lt;id&gt;</code> accepts any value and stores it as a parameter, and the other parts must match exactly.</p>
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
<h3>A small App class</h3>
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
<p>Our handlers return a pair <code>(status, body)</code>. A real framework works the same way: a response object consists of a status, headers and a body.</p>
<h3>The difference between 404 and 405</h3>
<p><b>404</b>: this path does not exist at all. <b>405</b>: the path exists, but this method is not allowed, for example a <code>POST</code> to a menu that is read-only. A correct server adds the header <code>Allow: GET</code> to a 405 response.</p>
<h3>Converters</h3>
<p>In Flask you can write <code>&lt;int:id&gt;</code>: the part matches only if it consists of digits, and it is converted to an <code>int</code> right away. Then <code>/users/abc</code> returns 404 before the handler is called, and you do not need to call <code>int()</code> inside the handler.</p>
<h3>Common mistakes</h3>
<ul>
<li>Forgetting <code>return func</code> in the decorator: after decoration the function becomes <code>None</code>.</li>
<li>A trailing <code>/</code>: are <code>/users/42/</code> and <code>/users/42</code> the same? Agree on it in advance (we use <code>strip("/")</code>).</li>
<li>Route order: if there are <code>/users/me</code> and <code>/users/&lt;id&gt;</code>, register the more specific one first, otherwise <code>me</code> will be taken as an id.</li>
</ul>
<div class="tip">FastAPI uses the same idea: <code>@app.get("/users/{user_id}")</code>, and the type hint <code>user_id: int</code> plays the role of a converter.</div>`,
      ex: [
        { prompt: 'Write the function <code>match_path(pattern, path)</code>. A part <code>&lt;name&gt;</code> in the pattern accepts any non-empty value. On a match, return a dictionary of parameters (<code>{}</code> if there are none); on a mismatch, return <code>None</code>. The leading and trailing <code>/</code> do not matter.', hints: ['Split both with <code>.strip("/").split("/")</code>; the number of parts must match.', 'If a part starts with <code>&lt;</code> and ends with <code>&gt;</code>, it is a parameter: <code>params[p[1:-1]] = v</code>.'], check: { tests: `assert match_path("/users/<id>", "/users/42") == {"id": "42"}, "/users/<id> and /users/42 → {'id': '42'}"
assert match_path("/shops/<shop>/orders/<oid>", "/shops/almaty-1/orders/77/") == {"shop": "almaty-1", "oid": "77"}, "Two parameters, the trailing / does not matter"
assert match_path("/health", "/health") == {}, "A pattern without parameters: {}"
assert match_path("/users/<id>", "/users/42/orders") is None, "Different number of parts: None"
assert match_path("/users/<id>", "/cafes/42") is None, "A fixed part does not match: None"
` } },
        { prompt: 'Write the class <code>App</code>. The method <code>route(pattern, methods=("GET",))</code> is a decorator that registers a handler and returns the function unchanged. The method <code>handle(method, path)</code> calls the matching handler with the path parameters (<code>**params</code>) and returns its result <code>(status, body)</code>. If the path exists but the method does not, return <code>(405, {"error": "method not allowed"})</code>; if the path does not exist, return <code>(404, {"error": "not found"})</code>. Use the <code>match_path</code> function that is already given.', hints: ['In the decorator: <code>self.routes.append((pattern, set(methods), func))</code>, then <code>return func</code>.', 'Remember that the path matched with a flag (<code>path_found = True</code>): this is how you tell 404 from 405.'], check: { tests: `_app = App()
@_app.route("/cafes/<cafe_id>/menu")
def _menu(cafe_id):
    return 200, {"cafe": cafe_id}
@_app.route("/orders", methods=["POST"])
def _create():
    return 201, {"id": 1}
@_app.route("/orders", methods=["GET"])
def _list():
    return 200, []
assert _menu is not None and _menu("x") == (200, {"cafe": "x"}), "The decorator must return the function unchanged"
assert _app.handle("GET", "/cafes/7/menu") == (200, {"cafe": "7"}), "The path parameter value must be passed to the handler"
assert _app.handle("POST", "/orders") == (201, {"id": 1}), "POST /orders → create"
assert _app.handle("GET", "/orders") == (200, []), "One path can accept different methods"
assert _app.handle("DELETE", "/orders") == (405, {"error": "method not allowed"}), "The path exists, the method does not: 405"
assert _app.handle("GET", "/buses/12") == (404, {"error": "not found"}), "The path does not exist: 404"
` } },
        { prompt: 'Add a converter. The function <code>match_typed(pattern, path)</code> works like <code>match_path</code>, but a part <code>&lt;int:name&gt;</code> matches only when it consists of digits, and the value is converted to <code>int</code> (otherwise <code>None</code>). A plain part <code>&lt;name&gt;</code> stays a string, as before.', hints: ['<code>inner = p[1:-1]</code>; if <code>inner.startswith("int:")</code>, the parameter name is <code>inner[4:]</code>.', 'Digit check: <code>v.isdigit()</code>'], check: { tests: `assert match_typed("/users/<int:id>", "/users/42") == {"id": 42}, "The value of <int:id> must be an int: 42"
assert match_typed("/users/<int:id>", "/users/abc") is None, "A non-digit value does not match <int:...>"
assert match_typed("/cities/<name>/stops/<int:n>", "/cities/Taraz/stops/5") == {"name": "Taraz", "n": 5}, "A mixed pattern: a string and an int"
assert match_typed("/health", "/health") == {}, "Without parameters: {}"
assert match_typed("/users/<int:id>", "/users/1/2") is None, "Different number of parts: None"
` } },
        { prompt: 'The router has only <code>GET /menu</code> registered. The client sends <code>DELETE /menu</code>. Which code is correct?', options: ['200', '404 Not Found', '405 Method Not Allowed', '500 Internal Server Error'], explain: 'The path exists, but the method is not allowed: 405. The code 404 is returned when the path is not found at all.' }
      ]
    },
    'pyb-5': {
      title: 'Validation and errors: 400, 422, your own exceptions',
      body: `
<p>A server should never blindly trust the client. A mobile app may be an old version, and someone can send any text with <code>curl</code>. That is why every incoming piece of data goes through <b>validation</b>, and when it fails, the client knows exactly what is wrong.</p>
<h3>400 or 422?</h3>
<ul>
<li><b>400 Bad Request</b>: the request cannot be read at all. For example, the JSON is broken: <code>{"name": "Дана",</code>.</li>
<li><b>422 Unprocessable Entity</b>: the JSON was read correctly, but the values do not follow the rules: <code>{"age": -5}</code>.</li>
</ul>
<p>Some teams use 400 for both cases. What matters more: be consistent within one API and return the error with a clear body.</p>
<h3>Error body: by field</h3>
<pre><code>422 Unprocessable Entity
{"errors": {"email": "invalid email format", "age": "must be greater than 18"}}</code></pre>
<p>It is better to return all the errors at once: the user fixes the form in one go, not five times.</p>
<h3>dataclass: a request model</h3>
<p>A <code>dataclass</code> writes the <code>__init__</code>, <code>__repr__</code> and <code>__eq__</code> methods for you. It is a simple version of the Pydantic models from FastAPI.</p>
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
<p>Note: in Python, <code>isinstance(True, int)</code> returns <code>True</code>, because <code>bool</code> is a subclass of <code>int</code>. That is why we check <code>bool</code> separately.</p>
<h3>Your own exception classes</h3>
<p>Returning <code>(status, body)</code> from deep functions and passing it up is inconvenient. Instead, raise an exception and catch it in one place:</p>
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
<p>Now inside a handler you can simply write <code>raise NotFound("кофехана табылмады")</code>, and the <code>safe</code> decorator turns it into the right response. In Flask this is done with <code>@app.errorhandler</code>, in FastAPI with <code>HTTPException</code>.</p>
<h3>Common mistakes</h3>
<ul>
<li>Stopping at the first error and not reporting the others.</li>
<li>Catching everything with <code>except Exception</code> and returning 200: real bugs then go unnoticed.</li>
<li>Showing internal data in an error message (SQL queries, tracebacks, passwords).</li>
</ul>
<div class="tip">Validate the data once at the boundary, where the request comes in. Let the internal functions work with clean, already validated data.</div>`,
      ex: [
        { prompt: 'The function <code>validate_order(data)</code> must return a dictionary of errors (<code>{}</code> if there are no errors). Rules: <code>drink</code> must be in <code>MENU</code>, otherwise the error is <code>"drink": "мәзірде жоқ"</code> ("not on the menu"). <code>qty</code> must be an integer from 1 to 10, not a bool, otherwise <code>"qty": "1-10 бүтін сан"</code> ("integer from 1 to 10"). <code>size</code> is optional, but if it is given, it must be <code>"S"</code>, <code>"M"</code> or <code>"L"</code>, otherwise <code>"size": "S, M немесе L"</code> ("S, M or L").', hints: ['The key may be missing: use <code>data.get("drink")</code>.', 'Check the bool separately: <code>isinstance(qty, bool)</code>.'], check: { tests: `assert validate_order({"drink": "latte", "qty": 2}) == {}, "A correct order has no errors"
assert validate_order({"drink": "latte", "qty": 2, "size": "L"}) == {}, "size L is valid"
assert validate_order({"drink": "kumys", "qty": 0, "size": "XL"}) == {"drink": "мәзірде жоқ", "qty": "1-10 бүтін сан", "size": "S, M немесе L"}, "All errors must be collected together"
assert validate_order({}) == {"drink": "мәзірде жоқ", "qty": "1-10 бүтін сан"}, "An empty dictionary: errors for drink and qty (size is optional)"
assert validate_order({"drink": "raf", "qty": True}) == {"qty": "1-10 бүтін сан"}, "True is not a number"
assert validate_order({"drink": "raf", "qty": "2"}) == {"qty": "1-10 бүтін сан"}, "A number given as a string is not valid"
` } },
        { prompt: 'Write an exception hierarchy: <code>ApiError(Exception)</code> (<code>status = 500</code>, the constructor takes <code>message</code> and stores it in <code>self.message</code>), and the classes <code>NotFound</code> (404) and <code>Forbidden</code> (403) inherit from it. The decorator <code>safe(handler)</code> must catch <code>ApiError</code> and return <code>(e.status, {"error": e.message})</code>, and must not catch other exceptions.', hints: ['In a subclass it is enough to write <code>status = 404</code>.', '<code>except ApiError as e:</code> catches all subclasses.'], check: { tests: `CAFES = {1: "Kofe Bar, Астана"}
@safe
def _get_cafe(cid, role="guest"):
    if role == "banned":
        raise Forbidden("рұқсат жоқ")
    if cid not in CAFES:
        raise NotFound("кофехана табылмады")
    return 200, {"name": CAFES[cid]}
assert issubclass(NotFound, ApiError) and issubclass(Forbidden, ApiError), "NotFound and Forbidden inherit from ApiError"
assert _get_cafe(1) == (200, {"name": "Kofe Bar, Астана"}), "Without an error the handler result is unchanged"
assert _get_cafe(9) == (404, {"error": "кофехана табылмады"}), "NotFound → 404"
assert _get_cafe(1, role="banned") == (403, {"error": "рұқсат жоқ"}), "Forbidden → 403"
def _boom():
    raise ApiError("boom")
assert safe(_boom)() == (500, {"error": "boom"}), "ApiError → 500"
try:
    safe(lambda: 1 / 0)()
    assert False, "ZeroDivisionError must not be caught"
except ZeroDivisionError:
    pass
` } },
        { prompt: 'Write the handler <code>create_student(raw_body)</code>. If the JSON cannot be read or is not an object (dict), return <code>(400, {"error": "invalid json"})</code>. Validation: <code>name</code> is a non-empty string, <code>grade</code> is an integer from 1 to 11 (not a bool). On errors return <code>(422, {"errors": {...}})</code> with the keys <code>"name"</code> and <code>"grade"</code> (the message text is up to you). If everything is valid, create the dataclass <code>Student</code> (<code>name: str</code>, <code>grade: int</code>, <code>city: str = "Қарағанды"</code>, "Karaganda") and return <code>(201, asdict(student))</code>. Trim the name with <code>strip</code>.', hints: ['Put <code>json.loads</code> inside <code>try/except json.JSONDecodeError</code>.', 'The result: <code>Student(name.strip(), grade, data.get("city", "Қарағанды"))</code>'], check: { tests: `from dataclasses import is_dataclass
assert is_dataclass(Student), "A dataclass Student is required"
assert create_student('{"name": " Айгерім ", "grade": 9}') == (201, {"name": "Айгерім", "grade": 9, "city": "Қарағанды"}), "A correct request: 201, city defaults"
assert create_student('{"name": "Ерлан", "grade": 11, "city": "Павлодар"}')[1]["city"] == "Павлодар", "If city is given, it is used"
assert create_student('{"name": "Дана", ') == (400, {"error": "invalid json"}), "Broken JSON: 400"
assert create_student('[1, 2]') == (400, {"error": "invalid json"}), "JSON that is not an object: 400"
_s, _b = create_student('{"name": "", "grade": 12}')
assert _s == 422 and set(_b["errors"]) == {"name", "grade"}, "Both fields wrong: 422 and two keys"
_s, _b = create_student('{"name": "Тимур", "grade": true}')
assert _s == 422 and set(_b["errors"]) == {"grade"}, "true is not a grade number"
` } },
        { prompt: 'The client sent <code>{"email": "dana@mail", "age": "жиырма"}</code> ("жиырма" means "twenty"). The JSON was read correctly, but the values do not pass validation. Which code is the most accurate?', options: ['200 OK', '400 Bad Request', '422 Unprocessable Entity', '500 Internal Server Error'], explain: 'The JSON syntax is correct, but the values failed validation: that is 422. The code 400 is used when the request cannot be read at all, and 500 is the server\'s own error.' }
      ]
    },
    'pyb-6': {
      title: 'ORM: models, repository, N+1',
      body: `
<p>In the SQL course you wrote <code>SELECT</code> and <code>INSERT</code> queries directly against tables. In the backend, writing an SQL string for every handler quickly becomes tiring and error-prone. An <b>ORM</b> (Object-Relational Mapping) turns a table into a class and a row into an object: SQLAlchemy, Django ORM, Peewee.</p>
<h3>Model = table, object = row</h3>
<pre><code># Django style (for understanding)
class Cafe(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    rating = models.FloatField()

Cafe.objects.filter(city="Астана").order_by("-rating")[:5]
# SELECT * FROM cafe WHERE city = 'Астана' ORDER BY rating DESC LIMIT 5</code></pre>
<p>The last line turns into SQL. An important detail: <code>filter</code> and <code>order_by</code> do not run the query right away, they only build a <b>QuerySet</b>. The data is fetched from the database only when the result is really needed (a loop, <code>list()</code>, <code>len()</code>). This is called <b>lazy</b> evaluation.</p>
<h3>An in-memory repository</h3>
<p>To understand the idea inside an ORM, let's write one on top of a list. The <b>repository</b> hides how the data is stored: the handler calls <code>repo.get(5)</code>, and whether it is SQLite, PostgreSQL or a plain dictionary underneath does not matter to it. That is why an in-memory version is convenient for tests.</p>
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
<p><code>**kw</code> collects named arguments into a dictionary, and <code>getattr(o, "city")</code> means the same as <code>o.city</code>. In Django, syntax like <code>rating__gte=4.5</code> splits the key at <code>__</code> and gets the field and the operator.</p>
<h3>Migrations</h3>
<p>You added a new field (<code>phone</code>) to the model. The table in the database does not change by itself. A <b>migration</b> describes the schema change: the file <code>0003_add_phone.py</code> runs <code>ALTER TABLE cafe ADD COLUMN phone</code>. Migration files are stored in git, and all environments (a laptop, tests, production) apply them in the same order. Tools: Alembic, <code>python manage.py migrate</code>.</p>
<h3>The N+1 problem</h3>
<pre><code>orders = Order.objects.all()           # 1 query
for o in orders:
    print(o.customer.name)             # +1 query for every order!</code></pre>
<p>If there are 100 orders, 101 queries are made. Even if each query takes 2 ms over the network, the page still loads 200 ms slower. The solution: fetch the related data <b>in one query</b> in advance. In SQL this is a <code>JOIN</code> or <code>WHERE id IN (...)</code>; in Django, <code>select_related("customer")</code> or <code>prefetch_related</code>; in SQLAlchemy, <code>joinedload</code>.</p>
<h3>Common mistakes</h3>
<ul>
<li>Thinking you do not need to know SQL with an ORM: to find a slow query, you have to be able to read the SQL the ORM generates.</li>
<li>Accessing a related field inside a loop (N+1).</li>
<li>Changing a model without a migration: production gets a "column does not exist" error.</li>
</ul>
<div class="tip">In the dev environment, turn on the ORM's SQL log (Django: <code>connection.queries</code>, SQLAlchemy: <code>echo=True</code>). If one page makes 50 queries, there is an N+1 problem.</div>`,
      ex: [
        { prompt: 'Write the class <code>Repo</code>: the method <code>add(obj)</code> gives the object an <code>id</code> starting from 1, stores it and returns the object. The method <code>get(id)</code> returns the object or <code>None</code>. The method <code>all()</code> returns a list in the order of insertion. The method <code>delete(id)</code> removes the object and returns <code>True</code>, and returns <code>False</code> if it does not exist.', hints: ['Keep the next id in the counter <code>self.next_id</code>: a deleted id must not be issued again.'], check: { tests: `_r = Repo()
_a = _r.add(Bus("92", "Алматы")); _b = _r.add(Bus("10", "Астана"))
assert (_a.id, _b.id) == (1, 2), "ids grow from 1"
assert _r.get(2) is _b and _r.get(7) is None, "get: the object or None"
assert [x.route for x in _r.all()] == ["92", "10"], "all: insertion order"
assert _r.delete(1) is True and _r.delete(1) is False, "delete: True the first time, then False"
assert _r.add(Bus("37", "Шымкент")).id == 3, "A deleted id is not reused: the next id is 3"
` } },
        { prompt: 'Write a small class <code>QuerySet</code>. The constructor takes a list of objects. <code>filter(**kw)</code>: <code>city="Алматы"</code> is an exact match, <code>rating__gte=4.5</code> (≥), <code>rating__lt=4</code> (&lt;), <code>name__contains="Kofe"</code> (contains). <code>order_by(field)</code>: <code>"-rating"</code> sorts in descending order. Both methods return a <b>new</b> QuerySet (they can be chained, and the original is unchanged). <code>all()</code> returns a list, <code>count()</code> returns a number, <code>first()</code> returns the first object or <code>None</code>.', hints: ['Split the key: <code>field, _, op = key.partition("__")</code>; if <code>op</code> is empty, it is an exact match.', 'Sorting: <code>sorted(self.items, key=lambda o: getattr(o, name), reverse=desc)</code>'], check: { tests: `_qs = QuerySet([Cafe("Kofe Bar", "Астана", 4.6), Cafe("Daily Cup", "Алматы", 4.8), Cafe("Kofe Lab", "Алматы", 4.1), Cafe("Bean", "Алматы", 3.7), Cafe("Steppe", "Астана", 4.9)])
assert [c.name for c in _qs.filter(city="Алматы").all()] == ["Daily Cup", "Kofe Lab", "Bean"], "filter(city=...) is an exact match"
assert _qs.filter(city="Алматы", rating__gte=4.1).count() == 2, "Several conditions: city and rating__gte"
assert [c.name for c in _qs.filter(rating__lt=4).all()] == ["Bean"], "rating__lt=4"
assert [c.name for c in _qs.filter(name__contains="Kofe").order_by("-rating").all()] == ["Kofe Bar", "Kofe Lab"], "contains and sorting in descending order"
assert _qs.order_by("rating").first().name == "Bean", "order_by('rating') is ascending"
assert _qs.filter(city="Тараз").first() is None, "If the result is empty, first() returns None"
assert _qs.count() == 5, "filter must not change the original QuerySet"
assert isinstance(_qs.filter(city="Астана"), QuerySet), "filter returns a new QuerySet"
` } },
        { prompt: 'Solve the N+1 problem. <code>FakeDB</code> counts every method call in <code>db.queries</code>. The function <code>order_lines(db)</code> must return, for each order, a list of <code>(order_id, customer_name)</code> (the order of orders is kept), but there must be no more than <b>2 queries</b> in total: <code>get_orders()</code> and <code>get_customers(ids)</code>.', hints: ['First collect all the <code>customer_id</code> values and call <code>get_customers</code> once.'], check: { tests: `_cust = {1: {"name": "Әли"}, 2: {"name": "Сая"}, 3: {"name": "Мадина"}}
_ords = [{"id": 100 + i, "customer_id": (i % 3) + 1} for i in range(30)]
_db = FakeDB(_ords, _cust)
_res = order_lines(_db)
assert _res[:4] == [(100, "Әли"), (101, "Сая"), (102, "Мадина"), (103, "Әли")], "Result: (order_id, customer_name), the order of orders is kept"
assert len(_res) == 30, "All 30 orders are needed"
assert _db.queries <= 2, "N+1: 30 orders must not take more than 2 queries"
` } },
        { prompt: 'The field <code>phone</code> was added to the model, but no migration was created and the code was deployed to production. What will happen?', options: ['The ORM will change the table by itself', 'The column does not exist in the database, so accessing it raises an error (for example, "column does not exist")', 'Nothing will happen', 'All old data will be deleted'], explain: 'The model class is in the code, and the table is in the database. A migration connects them. Without it, the ORM queries a column that does not exist and gets an error.' }
      ]
    },
    'pyb-7': {
      title: 'Authentication and permissions: hash, token, roles',
      body: `
<p>Tell two questions apart. <b>Authentication</b>: who are you? (login and password). <b>Authorization</b>: what are you allowed to do? (a barista can see an order but cannot change menu prices). If the first check fails, the answer is <b>401</b>; if the second check fails, the answer is <b>403</b>.</p>
<h3>Never store passwords in plain text</h3>
<p>If the database leaks, plain passwords are immediately tried on other sites. So we store a <b>hash</b>. But a plain <code>sha256(password)</code> is not enough:</p>
<ul>
<li>The same password gives the same hash, so it is quickly found with precomputed tables (a rainbow table). The fix: a random <b>salt</b> for each user (<code>os.urandom(16)</code>).</li>
<li>SHA-256 is very fast: a graphics card checks billions of variants per second. The fix: repeat the hashing thousands of times (<b>key stretching</b>).</li>
</ul>
<pre><code>import hashlib, hmac, os

salt = os.urandom(16)
stored = hashlib.pbkdf2_hmac("sha256", b"qwerty123", salt, 600_000)

def check(password, salt, stored):
    candidate = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 600_000)
    return hmac.compare_digest(candidate, stored)</code></pre>
<p><b>PBKDF2</b> repeatedly computes HMAC and combines the results with XOR. <code>hmac.compare_digest</code> compares values in constant time, so an attacker cannot guess characters from the response time. In production, the bcrypt and Argon2 libraries are also widely used. The Python in the browser has no <code>pbkdf2_hmac</code>, so in the task you will write the algorithm yourself with <code>hmac</code>: the best way to understand how it works.</p>
<h3>Session or token</h3>
<table>
<tr><th></th><th>Session</th><th>Token (for example, JWT)</th></tr>
<tr><td>The server stores nothing</td><td>a table <code>session_id → user</code></td><td>nothing: the token is signed itself</td></tr>
<tr><td>What the client sends</td><td><code>Cookie: sid=...</code></td><td><code>Authorization: Bearer ...</code></td></tr>
<tr><td>Logout</td><td>deleting the record is enough</td><td>hard: you must wait for expiry or keep a block list</td></tr>
<tr><td>Where it is more convenient</td><td>a classic website</td><td>a mobile app, microservices</td></tr>
</table>
<h3>A signed token</h3>
<pre><code>import base64, json
payload = {"user": 7, "role": "barista", "exp": 1767225600}
body = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
sig = hmac.new(b"server-secret", body.encode(), hashlib.sha256).hexdigest()
token = body + "." + sig</code></pre>
<p>Anyone can read the token (base64 is not encryption!), but it <b>cannot be changed</b>: if you replace <code>role</code> with <code>admin</code>, the signature will no longer match. That is why no secret data is put into the token, and its lifetime is limited with the <code>exp</code> field. JWT is built exactly like this and consists of three parts: header, payload and signature.</p>
<h3>Roles and permissions</h3>
<pre><code>ROLES = {"barista": {"orders:read"}, "manager": {"orders:read", "menu:edit"}}
def can(user, perm):
    return perm in ROLES.get(user["role"], set())</code></pre>
<p>Instead of writing <code>if role == "manager"</code>, check the name of the permission: when you add a new role, you do not have to change the code.</p>
<h3>OAuth 2.0 (the idea only)</h3>
<p>The "Sign in with Google" button uses the OAuth 2.0 <b>authorization code</b> flow:</p>
<ul>
<li>The site sends the user to Google's sign-in page and shows which permissions (<b>scope</b>: email, profile) it asks for.</li>
<li>The user agrees, and Google gives the site a short-lived <b>code</b>.</li>
<li>The site's server exchanges the code for an <b>access token</b> (sometimes also a refresh token), using its secret key.</li>
<li>With the access token the server gets the user's email from the Google API.</li>
</ul>
<p>The main result: the site never sees the user's Google password.</p>
<h3>Common mistakes</h3>
<ul>
<li>Comparing hashes with <code>==</code>, storing them without a salt, or using a fast hash.</li>
<li>Writing the secret key into the code and committing it to git (store it in an environment variable, lesson 11).</li>
<li>Trusting the token payload without verifying the signature.</li>
</ul>
<div class="tip">Do not invent your own authentication: in production use proven libraries. The goal of this lesson is to understand what they do inside.</div>`,
      ex: [
        { prompt: 'Write the PBKDF2-HMAC-SHA256 algorithm (one 32-byte block): <code>pbkdf2_sha256(password, salt, iterations)</code> returns a hex string. Steps: <code>U = HMAC(password, salt + b"\\x00\\x00\\x00\\x01")</code>, the result <code>T = U</code>; then <code>iterations - 1</code> times: <code>U = HMAC(password, U)</code>, <code>T = T XOR U</code> (byte by byte). HMAC: <code>hmac.new(password.encode(), msg, hashlib.sha256).digest()</code>. Then <code>verify_password(password, salt, iterations, stored_hex)</code> must compare the values with <code>hmac.compare_digest</code>.', hints: ['For XOR use <code>t = bytearray(u)</code>, then in a loop <code>t[i] ^= u[i]</code>.', 'At the end return <code>bytes(t).hex()</code>.'], check: { tests: `assert pbkdf2_sha256("a", b"s", 1) == "4f5b39c97eaa4ecb0904d5f9ad05f7c02fc72ffc386f1bdd3c6f53d19944e258", "1 iteration: HMAC(password, salt + 00000001)"
assert pbkdf2_sha256("Сәлем2026", b"nmb", 5) == "19f4f0a49306f0eb5c1044c62eb6c48e2ea8ca5278348439d787d82551b4a0f8", "5 iterations: combine the results with XOR"
_h = pbkdf2_sha256("qwerty123", b"almaty-salt", 1000)
assert _h == "93bd40730f33dae177cb66c44b7325b2a9b43c807fc0000c21539497ed80f645", "The result for 1000 iterations must match hashlib.pbkdf2_hmac"
assert verify_password("qwerty123", b"almaty-salt", 1000, _h) is True, "Correct password: True"
assert verify_password("qwerty124", b"almaty-salt", 1000, _h) is False, "Wrong password: False"
assert pbkdf2_sha256("qwerty123", b"other-salt", 3) != pbkdf2_sha256("qwerty123", b"almaty-salt", 3), "A different salt gives a different hash"
` } },
        { prompt: 'Write a signed token. <code>make_token(payload, secret)</code>: <code>body</code> is the result of <code>base64.urlsafe_b64encode</code> applied to the string <code>json.dumps(payload, sort_keys=True)</code> with the trailing <code>=</code> characters removed; <code>sig</code> = <code>hmac.new(secret.encode(), body.encode(), hashlib.sha256).hexdigest()</code>; the result is <code>body + "." + sig</code>. The function <code>read_token(token, secret, now)</code> returns <code>None</code> if the signature is wrong, the format is broken, or <code>payload["exp"] &lt;= now</code>; otherwise it returns the payload dictionary.', hints: ['Before decoding, put back the <code>=</code> characters: <code>body + "=" * (-len(body) % 4)</code>.', 'Check the signature first, and only then read the JSON.'], check: { tests: `import base64 as _b64, hmac as _hm, hashlib as _hl, json as _js
_t = make_token({"user": 7, "role": "barista", "exp": 1000}, "s3cret")
_body, _sig = _t.split(".")
assert "=" not in _body, "The trailing = characters must be removed from body"
assert _sig == _hm.new(b"s3cret", _body.encode(), _hl.sha256).hexdigest(), "Signature: the hex value of HMAC-SHA256 of body"
assert read_token(_t, "s3cret", now=500) == {"user": 7, "role": "barista", "exp": 1000}, "A correct token: the payload is returned"
assert read_token(_t, "s3cret", now=1000) is None, "An expired token (exp <= now): None"
assert read_token(_t, "wrong", now=500) is None, "Another secret: None"
_evil = _b64.urlsafe_b64encode(_js.dumps({"user": 7, "role": "admin", "exp": 1000}, sort_keys=True).encode()).decode().rstrip("=")
assert read_token(_evil + "." + _sig, "s3cret", now=500) is None, "If the payload was changed, the signature does not match: None"
assert read_token("garbage", "s3cret", now=1) is None, "A broken format: None"
` } },
        { prompt: 'Write the function <code>can(user, perm)</code> and the decorator <code>require(perm)</code>. The dictionary <code>ROLES</code> maps a role to a set of permissions; <code>"*"</code> grants all permissions. The handler receives <code>user</code> as its first argument. If <code>user is None</code>, return <code>(401, {"error": "login required"})</code>; if the permission is missing, return <code>(403, {"error": "forbidden"})</code>; otherwise return the handler result.', hints: ['For an unknown role use <code>ROLES.get(role, set())</code>.', 'The wrapper signature: <code>def wrapper(user, *args, **kwargs)</code>'], check: { tests: `@require("menu:edit")
def _set_price(user, drink, price):
    return 200, {"drink": drink, "price": price}
_b = {"name": "Сая", "role": "barista"}
_m = {"name": "Ерлан", "role": "manager"}
_a = {"name": "Admin", "role": "admin"}
assert can(_m, "reports:read") and not can(_b, "menu:edit"), "can: check the role's set of permissions"
assert can(_a, "anything:else"), "* grants all permissions"
assert can({"role": "intern"}, "orders:read") is False, "An unknown role has no permissions"
assert _set_price(None, "latte", 1500) == (401, {"error": "login required"}), "An unauthenticated user: 401"
assert _set_price(_b, "latte", 1500) == (403, {"error": "forbidden"}), "A barista cannot change the menu: 403"
assert _set_price(_m, "latte", 1500) == (200, {"drink": "latte", "price": 1500}), "A manager is allowed: the handler result"
` } },
        { prompt: 'In the OAuth 2.0 authorization code flow, what does the site\'s server finally use to get the user\'s data?', options: ['The user\'s Google password', 'The short-lived code that came from the browser, directly', 'The access token obtained in exchange for the code', 'The user\'s cookie'], explain: 'The code is issued to the browser, and then on the server side it is exchanged for an access token. API requests are made with the access token. The site never sees the Google password.' }
      ]
    },
    'pyb-8': {
      title: 'Testing: unittest, test client, error paths',
      body: `
<p>In the Software Eng course you checked functions with <code>assert</code> and <code>pytest</code>. In the backend, tests matter even more: one change affects dozens of endpoints, and you cannot check them all by hand with <code>curl</code>. In this lesson we learn the standard library's <code>unittest</code> and the idea of a "test client" that works without HTTP.</p>
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
<p>Each test is a method whose name starts with <code>test_</code>. Common checks: <code>assertEqual</code>, <code>assertTrue</code>, <code>assertIn</code>, <code>assertIsNone</code>, <code>assertRaises</code>. In a terminal you run <code>python -m unittest</code> or <code>pytest</code> (it also runs unittest tests). In the browser we run the tests from code:</p>
<pre><code>import io
suite = unittest.defaultTestLoader.loadTestsFromTestCase(FareTests)
result = unittest.TextTestRunner(stream=io.StringIO()).run(suite)
print(result.testsRun, result.wasSuccessful())   # 3 True</code></pre>
<h3>setUp: a clean environment for each test</h3>
<p><code>setUp</code> is called <b>before</b> each test method, and <code>tearDown</code> after it. Tests must not depend on each other: if an order created by one test "leaks" into the next one, the tests start failing depending on the run order. In pytest this role is played by a <b>fixture</b>.</p>
<h3>Test client</h3>
<p>Flask and FastAPI have a <code>TestClient</code>: it passes a request straight to the application without starting a server. We will write our own: the client turns the body into JSON, calls <code>app.handle</code> and wraps the response in a convenient object.</p>
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
        self.client = TestClient(make_app())     # a new application for each test
    def test_unknown_cafe(self):
        r = self.client.request("GET", "/cafes/999")
        self.assertEqual(r.status, 404)</code></pre>
<h3>Testing error paths</h3>
<p>A beginner usually checks only the "everything is fine" case. But most bugs hide at the edges: an empty body, broken JSON, a missing id, a user without permissions, boundary values (0, 10, 11). For each endpoint write at least: one successful case, one validation error (400/422) and one "not found" (404).</p>
<h3>What makes a good test?</h3>
<ul>
<li>Fast and deterministic: no network, no real time, no randomness (pass time and random in from outside).</li>
<li>One test checks one thing, and its name says what that is: <code>test_order_with_zero_qty_returns_422</code>.</li>
<li>A test can catch bugs: if you break the code on purpose, the test must fail. If it does not fail, it checks nothing.</li>
</ul>
<div class="tip">When you find a bug, first write a test that reproduces it, and only then fix the code. The test fails, you fix the code, the test passes, and this bug will not come back unnoticed.</div>`,
      ex: [
        { prompt: 'The function <code>apply_promo(total, code)</code> is given. Write the class <code>PromoTests(unittest.TestCase)</code> with at least 3 tests that check (1) that <code>"KOFE10"</code> gives a 10% discount, (2) that <code>"STUDENT"</code> gives 15%, and (3) that an unknown code raises <code>ValueError</code> (<code>assertRaises</code>). The check runs your tests on the correct function and also on deliberately broken versions: on the broken ones your tests must fail.', hints: ['<code>self.assertEqual(apply_promo(2000, "KOFE10"), 1800)</code>', 'For the error case: <code>with self.assertRaises(ValueError): apply_promo(2000, "FREE")</code>'], check: { tests: `import io as _io, unittest as _ut
def _run():
    _s = _ut.defaultTestLoader.loadTestsFromTestCase(PromoTests)
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_s)
_ok = _run()
assert _ok.testsRun >= 3, "At least 3 tests are needed (names start with test_)"
assert _ok.wasSuccessful(), "The tests must pass on the correct function"
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
assert not _with(_m1), "The tests did not catch the broken version: an unknown code must raise ValueError"
assert not _with(_m2), "The tests did not catch the broken version: STUDENT must give 15%"
assert not _with(_m3), "The tests did not catch the broken version: KOFE10 must give 10%"
` } },
        { prompt: 'Write the class <code>TestClient</code>. The method <code>request(method, path, json_body=None)</code> turns the body into a string with <code>json.dumps</code> (<code>""</code> if it is <code>None</code>), calls <code>self.app.handle(method, path, raw)</code>, reads the response body with <code>json.loads</code> and returns <code>Response(status, json)</code> (with <code>json=None</code> if the body is empty). Also add the methods <code>get(path)</code> and <code>post(path, json_body)</code>.', hints: ['<code>status, body = self.app.handle(method, path, raw)</code>', '<code>get</code> and <code>post</code> simply call <code>self.request(...)</code>.'], check: { tests: `_c = TestClient(MiniApp())
_r = _c.post("/items", {"name": "Самса"})
assert isinstance(_r, Response) and _r.status == 201 and _r.json == {"id": 1, "name": "Самса"}, "POST /items: 201 and the JSON is read"
assert _c.get("/items/1").json["name"] == "Самса", "GET /items/1: the created object"
assert _c.get("/items/5").status == 404, "A missing id: 404"
assert _c.post("/items", {}).status == 422, "No name: 422"
_d = _c.request("DELETE", "/items/1")
assert _d.status == 204 and _d.json is None, "An empty body: json=None"
` } },
        { prompt: 'Write the class <code>ItemApiTests(unittest.TestCase)</code>. In <code>setUp</code> create <code>self.client = TestClient(MiniApp())</code>. At least 3 tests: a successful <code>POST /items</code> returns 201; a POST without a name returns 422; a <code>GET</code> for a missing id returns 404. The check also runs your tests on a broken application (which returns 201 instead of 422), and there your test must fail.', hints: ['<code>def setUp(self): self.client = TestClient(MiniApp())</code>', 'In a test: <code>r = self.client.request("POST", "/items", {})</code>, then <code>self.assertEqual(r.status, 422)</code>'], check: { tests: `import io as _io, unittest as _ut
def _run():
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(ItemApiTests))
assert "setUp" in ItemApiTests.__dict__, "A setUp method is required"
_ok = _run()
assert _ok.testsRun >= 3, "At least 3 tests are needed"
assert _ok.wasSuccessful(), "The tests must pass on the correct application"
_Good = MiniApp
class _Broken(_Good):
    def handle(self, method, path, body=""):
        if path == "/items" and method == "POST" and not json.loads(body or "{}").get("name"):
            return 201, json.dumps({"id": 0, "name": ""})
        return super().handle(method, path, body)
MiniApp = _Broken
_bad = _run()
MiniApp = _Good
assert not _bad.wasSuccessful(), "The tests must fail on the broken application (201 instead of 422)"
` } },
        { prompt: 'When is the <code>setUp</code> method called?', options: ['Once for the whole class, at the very beginning', 'Before each test method', 'Only after a failed test', 'Only when <code>tearDown</code> is called'], explain: '<code>setUp</code> is called again before each <code>test_</code> method, so every test starts from a clean environment. If something must run once for the whole class, there is <code>setUpClass</code>.' }
      ]
    },
    'pyb-9': {
      title: 'Regular expressions: validate, search, replace',
      body: `
<p>A user types a phone number as <code>+7 (701) 234-56-78</code>, <code>87012345678</code> or <code>+7 701 234 5678</code>. To check all these variants and bring them to one format, a <b>regular expression</b> (regex) is convenient: a small language that describes a pattern in text. In Python it lives in the <code>re</code> module.</p>
<h3>Basic symbols</h3>
<table>
<tr><th>Pattern</th><th>Meaning</th></tr>
<tr><td><code>\\d</code>, <code>\\w</code>, <code>\\s</code></td><td>a digit; a letter, digit or <code>_</code>; a whitespace character</td></tr>
<tr><td><code>.</code></td><td>any single character (except a newline)</td></tr>
<tr><td><code>[abc]</code>, <code>[^0-9]</code></td><td>one character from the set; any character except a digit</td></tr>
<tr><td><code>*</code>, <code>+</code>, <code>?</code>, <code>{3}</code>, <code>{2,4}</code></td><td>0 or more, 1 or more, 0 or 1, exactly 3, from 2 to 4</td></tr>
<tr><td><code>^</code>, <code>$</code></td><td>start of the string, end of the string</td></tr>
<tr><td><code>( )</code>, <code>(?P&lt;name&gt; )</code>, <code>(?: )</code></td><td>a group; a named group; a non-capturing group</td></tr>
<tr><td><code>a|b</code></td><td>a or b</td></tr>
</table>
<p>Always write a pattern as a <b>raw string</b>: <code>r"\\d+"</code>. Otherwise Python itself converts sequences such as <code>\\b</code>.</p>
<h3>Basic functions</h3>
<pre><code>import re
re.match(r"\\d+", "42 latte")        # searches only from the start of the string → match '42'
re.search(r"\\d+", "latte 42")       # the first match anywhere → '42'
re.fullmatch(r"\\d{6}", "050000")    # the whole string must match
re.findall(r"#(\\d+)", "#12 және #305")   # ['12', '305']: if there is a group, only the group is returned
re.sub(r"\\s+", " ", "Абай   даңғылы  10")   # 'Абай даңғылы 10'</code></pre>
<p>For validation use <code>fullmatch</code> or <code>^...$</code>. The call <code>match(r"\\d{6}", "0500001")</code> will succeed, because it only looks at the start of the string.</p>
<h3>Groups</h3>
<pre><code>m = re.search(r"(?P&lt;city&gt;[А-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІі]+), (?P&lt;zip&gt;\\d{6})", "Мекенжай: Атырау, 060011")
m.group("city"), m.group("zip")     # ('Атырау', '060011')
m.groupdict()                       # {'city': 'Атырау', 'zip': '060011'}</code></pre>
<h3>A Kazakhstani phone number</h3>
<pre><code>def normalize_phone(text):
    digits = re.sub(r"[\\s()\\-]", "", text)          # spaces, brackets and hyphens are removed
    m = re.fullmatch(r"(?:\\+7|8)(7\\d{9})", digits)
    return "+7" + m.group(1) if m else None

normalize_phone("+7 (701) 234-56-78")   # '+77012345678'
normalize_phone("8 777 111 22 33")      # '+77771112233'
normalize_phone("+7 495 123 45 67")     # None: not a mobile number</code></pre>
<h3>Parsing a URL path</h3>
<pre><code>PATH = re.compile(r"^/api/v(?P&lt;version&gt;\\d+)/(?P&lt;resource&gt;[a-z-]+)(?:/(?P&lt;id&gt;\\d+))?/?$")
PATH.match("/api/v2/orders/15").groupdict()
# {'version': '2', 'resource': 'orders', 'id': '15'}</code></pre>
<p><code>re.compile</code> prepares the pattern once. If it is used in thousands of requests, this is convenient and fast, and the code is easier to read.</p>
<h3>Common mistakes</h3>
<ul>
<li>Using <code>search</code> or <code>match</code> for validation and not checking the end of the string.</li>
<li>Not escaping the dot: the pattern <code>r"mail.kz"</code> also matches <code>mailXkz</code>; the correct one is <code>r"mail\\.kz"</code>.</li>
<li>Trying to validate an email with a "perfect" regex. A simple check is enough; the real check is to send a confirmation email.</li>
<li>Greedy <code>.*</code>: <code>&lt;.*&gt;</code> captures everything from the first <code>&lt;</code> to the last <code>&gt;</code>. The lazy variant is <code>.*?</code>.</li>
</ul>
<div class="tip">A complex pattern can be split over several lines with the <code>re.VERBOSE</code> flag and given comments. Test the pattern on several correct and several incorrect examples.</div>`,
      ex: [
        { prompt: 'Write the function <code>normalize_phone(text)</code>. First remove spaces, brackets and hyphens. Then, if the number starts with <code>+7</code> or <code>8</code>, followed by <code>7</code> and 9 more digits (a Kazakhstani mobile number), return it in the format <code>"+77XXXXXXXXX"</code>, otherwise return <code>None</code>.', hints: ['Cleanup: <code>re.sub(r"[\\s()\\-]", "", text)</code>', 'Check: <code>re.fullmatch(r"(?:\\+7|8)(7\\d{9})", digits)</code>'], check: { tests: `assert normalize_phone("+7 (701) 234-56-78") == "+77012345678", "+7 (701) 234-56-78 → +77012345678"
assert normalize_phone("87771112233") == "+77771112233", "A number starting with 8 is also correct"
assert normalize_phone("8 747 000 11 22") == "+77470001122", "Spaces are removed"
assert normalize_phone("+7 495 123 45 67") is None, "A code that does not start with 7: None"
assert normalize_phone("+7 701 234 56 789") is None, "An extra digit: None"
assert normalize_phone("+7 701 23a 56 78") is None, "There is a letter: None"
` } },
        { prompt: 'Write the function <code>is_valid_email(s)</code>: a simple check. The whole string must match: before the <code>@</code> there must be one or more letters, digits, <code>.</code>, <code>_</code>, <code>-</code> or <code>+</code>; then <code>@</code>; then the domain: parts separated by dots (each part has letters, digits or hyphens), and the last part has at least 2 Latin letters. Return <code>True</code> or <code>False</code>.', hints: ['Domain part: <code>(?:[A-Za-z0-9-]+\\.)+[A-Za-z]{2,}</code>', '<code>fullmatch</code> checks the whole string.'], check: { tests: `assert is_valid_email("dana.serik@mail.kz") is True, "dana.serik@mail.kz is correct"
assert is_valid_email("erlan+shop@edu.astana.kz") is True, "The + sign and several domain parts are correct"
assert is_valid_email("dana@mail") is False, "The domain needs a dot and a zone at the end"
assert is_valid_email("@mail.kz") is False, "Nothing is before the @"
assert is_valid_email("dana@mail.kz extra") is False, "Spaces and extra text are not allowed"
assert is_valid_email("dana@@mail.kz") is False, "Two @ are not allowed"
` } },
        { prompt: 'The chat log of orders contains order numbers like <code>#A-1234</code> (<code>#</code>, one uppercase Latin letter, a hyphen, 4 digits) and phone numbers. (1) The function <code>order_ids(text)</code> returns the numbers without <code>#</code> as a list: <code>["A-1234", ...]</code>. (2) The function <code>mask_phones(text)</code> hides the middle of the numbers that start with <code>+7</code> and have 11 digits (without spaces, for example <code>+77012345678</code>): it becomes <code>+7701***5678</code> (the first 5 characters and the last 4 digits are kept).', hints: ['<code>findall</code> returns only the group if the pattern has one: <code>r"#([A-Z]-\\d{4})"</code>.', 'In the replacement, refer to the group: <code>r"\\1***\\2"</code>.'], check: { tests: `_log = "Клиент +77012345678 #A-1234 тапсырысын сұрады. #B-0007 дайын, #c-1111 қате, #D-12345 де қате. Курьер: +77775550011"
assert order_ids(_log) == ["A-1234", "B-0007"], "Only numbers of the correct format: A-1234, B-0007"
assert mask_phones(_log) == "Клиент +7701***5678 #A-1234 тапсырысын сұрады. #B-0007 дайын, #c-1111 қате, #D-12345 де қате. Курьер: +7777***0011", "The middle of the phone is replaced with ***, the rest of the text is unchanged"
assert mask_phones("Нөмір жоқ") == "Нөмір жоқ", "If there is no phone, the text is unchanged"
` } },
        { prompt: 'The function <code>parse_api_path(path)</code> parses a path of the form <code>/api/v&lt;version&gt;/&lt;resource&gt;</code> or <code>/api/v&lt;version&gt;/&lt;resource&gt;/&lt;id&gt;</code> with one regex with named groups (the trailing <code>/</code> is optional). Resource: lowercase Latin letters and hyphens. The result: <code>{"version": int, "resource": str, "id": int or None}</code>. If the path does not match, return <code>None</code>.', hints: ['Optional part: <code>(?:/(?P&lt;id&gt;\\d+))?</code>', 'If a group did not match, <code>groupdict()</code> gives <code>None</code> for it.'], check: { tests: `assert parse_api_path("/api/v2/orders/15") == {"version": 2, "resource": "orders", "id": 15}, "/api/v2/orders/15 → version 2, id 15"
assert parse_api_path("/api/v1/gift-cards/") == {"version": 1, "resource": "gift-cards", "id": None}, "No id, a trailing / is allowed"
assert parse_api_path("/api/v1/Orders") is None, "Uppercase letters are not allowed"
assert parse_api_path("/api/v1/orders/abc") is None, "The id is digits only"
assert parse_api_path("/api/orders") is None, "The version is required"
assert parse_api_path("/api/v3/orders/7/items") is None, "An extra part: None"
` } }
      ]
    },
    'pyb-10': {
      title: 'Async code, background tasks, cache and rate limiting',
      body: `
<p>A coffee shop server handles one request like this: it fetches the menu from the database (20 ms), sends a request to the payment system (300 ms) and notifies an SMS service (150 ms). For most of this time the processor does nothing and <b>waits for responses</b>. Such work is called <b>I/O-bound</b>, and it can be sped up by handling another request while waiting.</p>
<h3>Concurrency and parallelism</h3>
<ul>
<li><b>Concurrency</b>: one barista makes three orders one after another. While the milk is heating, they grind the coffee. At any moment only one action is happening, but the waiting time is not wasted.</li>
<li><b>Parallelism</b>: three baristas make three orders at the same time (several CPU cores, several processes).</li>
</ul>
<p>For I/O-bound work, concurrency is enough (async, threads). For CPU-bound work (image processing, heavy calculations) you need parallelism (several processes).</p>
<h3>async / await</h3>
<pre><code>async def fetch_menu(cafe_id):
    await db.query("SELECT ...")      # while waiting, the event loop runs another task
    return ["latte", "raf"]

coro = fetch_menu(7)        # the function has not run yet! this is a coroutine object
print(type(coro).__name__)  # coroutine
coro.close()</code></pre>
<p>Calling an <code>async def</code> function does not run it; it only creates a <b>coroutine</b> object. The <b>event loop</b> runs it: at each <code>await</code> the coroutine says "I am waiting" and pauses, and the loop switches to the next coroutine that is ready. This is how FastAPI, aiohttp and the async part of Django work.</p>
<h3>Your own event loop with generators</h3>
<p>The coroutine idea grew out of generators: <code>yield</code> also pauses a function and hands control to a scheduler. This small scheduler receives, through <code>yield</code>, how many seconds a task wants to "sleep", and runs whichever task wakes up first, on a fake clock (with no real waiting):</p>
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
<p>Real <code>asyncio</code> works the same way: a queue of tasks, a heap ordered by time, and running the ready tasks one after another.</p>
<h3>Background tasks: Celery, RabbitMQ</h3>
<p>Some work must not run inside a request: converting a receipt to PDF, sending a message to 10 000 customers, a nightly report. The handler puts the task into a <b>queue</b> (a broker: RabbitMQ or Redis) and immediately returns <code>202 Accepted</code>. Separate <b>worker</b> processes (Celery, RQ) take tasks from the queue and run them. If a task fails, it is retried later, so it is better to write it as idempotent.</p>
<h3>Cache and rate limiting</h3>
<p>Data that is requested often and changes rarely (an exchange rate, the menu) is cached: inside a process with <code>functools.lru_cache</code>, across several servers with Redis. Every cache needs a lifetime (TTL). <b>Rate limiting</b> limits how many requests one client can make (for example, 60 per minute); above the limit it returns <code>429 Too Many Requests</code>. A well-known algorithm is the <b>token bucket</b>: the bucket holds at most <code>capacity</code> tokens, <code>rate</code> tokens are added every second, and each request spends one token.</p>
<h3>Common mistakes</h3>
<ul>
<li>Calling blocking code (<code>time.sleep</code>, a synchronous database driver) inside an async function: the whole loop stops.</li>
<li>Forgetting <code>await</code>: the coroutine is created but never runs.</li>
<li>Binding the rate limiter to the real <code>time.time()</code>: it is hard to test. Pass the clock in from outside.</li>
</ul>
<div class="tip">Pass the clock into time-dependent code as a parameter (<code>clock=time.monotonic</code>). In a test, use a fake clock that you control by hand, and "a minute has passed" takes one line.</div>`,
      ex: [
        { prompt: 'Given <code>async def get_rate(): return 470</code>. What is <code>x</code> after the line <code>x = get_rate()</code>?', options: ['<code>470</code>', 'A coroutine object: the function has not run yet', '<code>None</code>', 'SyntaxError, because there is no await'], explain: 'Calling an async function only creates a coroutine. To get the result, it must be run with <code>await</code> or by the event loop.' },
        { prompt: 'Write a round-robin scheduler. <code>run_all(tasks)</code> receives a list of generators. In turn, take one value from each generator (<code>next</code>), add it to the list <code>log</code>, and put the generator back at the end of the queue. When a generator finishes (<code>StopIteration</code>), remove it from the queue. Return the list <code>log</code>. <code>collections.deque</code> is convenient.', hints: ['<code>task = queue.popleft()</code>, then <code>next(task)</code>.', 'Call <code>queue.append(task)</code> only if there was no <code>StopIteration</code>.'], check: { tests: `_log = run_all([barista("Сая", ["латте", "раф", "какао"]), barista("Әли", ["американо"]), barista("Нұр", ["капучино", "шай"])])
assert _log == ["Сая: латте", "Әли: американо", "Нұр: капучино", "Сая: раф", "Нұр: шай", "Сая: какао"], "The tasks must alternate in turn"
assert run_all([]) == [], "If there are no tasks, the log is empty"
` } },
        { prompt: 'Write <code>RateLimiter(capacity, rate, clock)</code> based on a token bucket. <code>clock()</code> returns the time in seconds. Each <code>key</code> (for example, an IP) has its own bucket, which starts full (<code>capacity</code>). <code>allow(key)</code>: first add tokens for the elapsed time (<code>rate</code> tokens per second, but never more than <code>capacity</code>), then if there are at least 1 token, take one and return <code>True</code>, otherwise return <code>False</code>.', hints: ['For each key store <code>(tokens, last_time)</code>.', 'Refill: <code>min(capacity, tokens + (now - last) * rate)</code>'], check: { tests: `class _Clock:
    def __init__(self):
        self.t = 0.0
    def __call__(self):
        return self.t
_c = _Clock()
_rl = RateLimiter(capacity=3, rate=1, clock=_c)
assert [_rl.allow("1.1.1.1") for _ in range(4)] == [True, True, True, False], "At first 3 tokens: 3 requests pass, the fourth does not"
assert _rl.allow("2.2.2.2") is True, "Each key has its own bucket"
_c.t = 1.0
assert _rl.allow("1.1.1.1") is True and _rl.allow("1.1.1.1") is False, "After 1 second 1 token is added"
_c.t = 100.0
assert [_rl.allow("1.1.1.1") for _ in range(4)] == [True, True, True, False], "The bucket does not exceed capacity"
_c2 = _Clock(); _half = RateLimiter(capacity=1, rate=0.5, clock=_c2)
assert _half.allow("k") is True and _half.allow("k") is False, "capacity=1: one request"
_c2.t = 1.0
assert _half.allow("k") is False, "rate=0.5: in 1 second only half a token is gained"
_c2.t = 2.0
assert _half.allow("k") is True, "After 2 seconds one full token"
` } },
        { prompt: '<code>exchange_rate(currency)</code> calls a slow "external API" (the counter <code>CALLS["n"]</code> increases). Cache it with <code>functools.lru_cache(maxsize=128)</code>, so that the API is called only once for each currency.', hints: ['Put <code>@lru_cache(maxsize=128)</code> above the function.'], check: { tests: `_vals = [exchange_rate(c) for c in ["USD", "EUR", "USD", "USD", "RUB", "EUR"]]
assert _vals == [470, 510, 470, 470, 5, 510], "The values must not change"
assert CALLS["n"] == 3, "Three different currencies: the API must be called only 3 times"
assert exchange_rate.cache_info().hits == 3, "cache_info().hits = 3"
` } }
      ]
    },
    'pyb-11': {
      title: 'Deployment: Gunicorn, Nginx, Docker, CI/CD, env',
      body: `
<p>The code works on your laptop. Now it has to go onto a server that thousands of people will use day and night. That is <b>deployment</b>. You cannot run it in the browser, but let's look at the role of each part.</p>
<h3>Virtualenv: a reminder</h3>
<p>In the Software Eng course we covered <code>python -m venv .venv</code> and <code>requirements.txt</code>. On the server it is the same: dependencies with fixed versions (<code>flask==3.0.3</code>), so that production and the laptop use the same libraries.</p>
<h3>How a request reaches the server</h3>
<pre><code>Browser ──HTTPS──▶ Nginx ──HTTP──▶ Gunicorn ──▶ your Flask/Django app
                    │                (4 worker processes)
                    └── /static/ files are served by Nginx itself</code></pre>
<ul>
<li><b>The built-in <code>app.run()</code> in Flask</b> is meant for development only: it is slow and not secure.</li>
<li><b>Gunicorn</b> (a WSGI server) or <b>Uvicorn</b> (ASGI, for async): starts several worker processes of the application. The basic rule: <code>2 × number of cores + 1</code>. If a worker crashes, it is restarted.</li>
<li><b>Nginx</b> (a reverse proxy): the front door. It holds the HTTPS certificate, serves static files, protects against slow clients and spreads the load across several servers.</li>
</ul>
<pre><code>gunicorn --workers 4 --bind 0.0.0.0:8000 app:app</code></pre>
<h3>Docker</h3>
<p>Docker solves the problem "it works on my computer": the application, the Python version and the dependencies are built into one <b>image</b>, which runs the same way on any server as a <b>container</b>.</p>
<pre><code># Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:8000", "app:app"]</code></pre>
<p>It is important to copy <code>requirements.txt</code> before the code: when the code changes, Docker takes the dependencies layer from the cache, and the build is faster.</p>
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
<p><code>docker compose up</code> starts the application, PostgreSQL and Redis together with one command. A new developer can run the project in a few minutes.</p>
<h3>Environment variables</h3>
<p>Secret keys and settings are stored not in the code but in the <b>environment</b>: <code>os.environ["DATABASE_URL"]</code>. Locally they live in a <code>.env</code> file, and that file is added to <code>.gitignore</code>. One image differs between dev, staging and production only through environment variables.</p>
<h3>Health check</h3>
<p><code>GET /health</code> returns 200, saying that the service is "alive". Docker, Kubernetes or a load balancer check it every few seconds and restart a container that does not respond. An extended version also checks the connection to the database and Redis, and returns 503 if something is not working.</p>
<h3>CI/CD: GitHub Actions</h3>
<p>In the MLOps course you saw a CI workflow. In the backend the chain is: push → tests and linter (CI) → build the Docker image → push to the registry → automatic deployment to the server (CD). If the tests fail, there is no deployment.</p>
<h3>Common mistakes</h3>
<ul>
<li>Committing <code>.env</code> to git, or shipping to production with <code>DEBUG=True</code>.</li>
<li>Storing data inside a container: it is lost when the container is recreated. A database needs a volume.</li>
<li>Deploying without a health check: nobody notices the situation where the app started but does not respond.</li>
</ul>
<div class="tip">One image, many environments: do not change the code separately for each environment. All differences should be in environment variables.</div>`,
      ex: [
        { prompt: '<code>parse_env(text)</code> turns the text of a <code>.env</code> file into a dictionary. Rules: empty lines and lines starting with <code>#</code> are skipped; a prefix <code>export </code> may be present; split at the first <code>=</code>, and strip the key and the value; if the value is in matching quotes (<code>"..."</code> or <code>\'...\'</code>), the quotes are removed and the text inside is unchanged; for an unquoted value, a comment after <code> #</code> is dropped. A line without <code>=</code> raises <code>ValueError</code>.', hints: ['Split at the first <code>=</code>: <code>line.split("=", 1)</code>, because a URL can contain <code>=</code> too.', 'Quote check: <code>value[0] == value[-1] and value[0] in "\\"\'"</code>'], check: { tests: `_text = """
# Kofe API баптаулары
export DEBUG=false
DATABASE_URL=postgres://kofe:pw@db:5432/kofe?sslmode=require
SECRET_KEY="a#b c"
GREETING='Сәлем, Алматы'
WORKERS = 4  # 2 * ядро + 1

"""
_env = parse_env(_text)
assert _env.get("DEBUG") == "false", "The export prefix is removed"
assert _env.get("DATABASE_URL") == "postgres://kofe:pw@db:5432/kofe?sslmode=require", "Split at the first ="
assert _env.get("SECRET_KEY") == "a#b c", "A # inside quotes is not a comment"
assert _env.get("GREETING") == "Сәлем, Алматы", "Single quotes are removed too"
assert _env.get("WORKERS") == "4", "Spaces and the comment ' #' are removed"
assert len(_env) == 5, "Empty lines and comments are skipped"
try:
    parse_env("DEBUG")
    assert False, "A line without = needs ValueError"
except ValueError:
    pass
` } },
        { prompt: 'Write the handler <code>health(checks)</code>. <code>checks</code> is a dictionary: name → a function with no arguments. If the function returns <code>True</code>, the result is <code>"ok"</code>; if it returns <code>False</code> or raises an exception, the result is <code>"fail"</code>. If everything is ok, return <code>(200, {"status": "ok", "checks": {...}})</code>, otherwise <code>(503, {"status": "fail", "checks": {...}})</code>.', hints: ['Call each check inside <code>try/except Exception</code>: even if one check fails, the health endpoint must not fail.'], check: { tests: `def _db():
    return True
def _redis():
    raise ConnectionError("redis:6379 жауап бермейді")
def _disk():
    return False
assert health({"db": _db}) == (200, {"status": "ok", "checks": {"db": "ok"}}), "All ok: 200"
assert health({"db": _db, "redis": _redis}) == (503, {"status": "fail", "checks": {"db": "ok", "redis": "fail"}}), "Exception: fail and 503"
assert health({"disk": _disk})[0] == 503, "False also gives fail"
assert health({}) == (200, {"status": "ok", "checks": {}}), "No checks: 200"
` } },
        { prompt: 'In the Nginx + Gunicorn setup, what is the main role of Nginx?', options: ['It runs the Python code', 'A reverse proxy: HTTPS, static files, passing requests to the Gunicorn workers', 'It stores the database', 'It builds the Docker image'], explain: 'The Python code is run by the Gunicorn workers. Nginx is the front door: TLS, static files, buffering and load distribution.' },
        { prompt: 'Why do the lines <code>COPY requirements.txt .</code> and <code>RUN pip install</code> come <b>before</b> <code>COPY . .</code> in the Dockerfile?', options: ['Docker does not accept another order', 'When the code changes, the dependencies layer is taken from the cache, and the build is faster', 'The image size is halved', 'Otherwise requirements.txt cannot be read'], explain: 'Docker caches each step as a layer. If requirements.txt does not change, the pip install layer is not run again; only the layer that copies the code is rebuilt.' }
      ]
    },
    'pyb-12': {
      title: 'Mini project: a URL shortener service',
      body: `
<p>Let's put everything from this module together into one service. "Tolqyn Link" is a URL shortener: it turns a long link into a short code like <code>https://tq.kz/q0U</code>, redirects the person who opens the code to the original address, and counts the clicks. Marketers use such services every day for ads, QR codes and SMS campaigns.</p>
<h3>API table</h3>
<table>
<tr><th>Request</th><th>Body</th><th>Response</th></tr>
<tr><td><code>POST /links</code></td><td><code>{"url": "...", "alias": "nauryz"}</code> (alias is optional)</td><td>201 a new link; 200 if this URL was already shortened; 400 broken JSON; 422 invalid URL/alias; 409 alias taken</td></tr>
<tr><td><code>GET /&lt;code&gt;</code></td><td>none</td><td>302 + <code>location</code>; 404</td></tr>
<tr><td><code>GET /links/&lt;code&gt;/stats</code></td><td>none</td><td>200 <code>{"code", "url", "clicks"}</code>; 404</td></tr>
</table>
<h3>Base62: from a number to a short code</h3>
<p>Each link gets an increasing id, and the code is made from the id. In the decimal system there are 10 digits, while base62 has 62 symbols: <code>0-9</code>, <code>a-z</code>, <code>A-Z</code>. So a 6-symbol code can hold 62<sup>6</sup> ≈ 56 billion links.</p>
<pre><code>ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def encode(n):
    if n == 0:
        return "0"
    out = []
    while n:
        n, r = divmod(n, 62)     # the last "digit" and the remainder
        out.append(ALPHABET[r])
    return "".join(reversed(out))

encode(61)       # 'Z'
encode(62)       # '10'
encode(100000)   # 'q0U'</code></pre>
<p>The reverse conversion uses Horner's scheme: <code>n = n * 62 + ALPHABET.index(ch)</code>. If ids start from 1, the first codes are very short and predictable, so we start from 100000. Real services shuffle the ids (or generate random codes) to make it harder to guess codes in sequence.</p>
<h3>Service logic</h3>
<pre><code>class Shortener:
    def create(self, raw_body):
        # 1) read JSON → 400       (lesson 5)
        # 2) validate url and alias with regex → 422   (lessons 5, 9)
        # 3) if the URL already exists, return the same code → 200 (idempotency, lesson 3)
        # 4) alias taken → 409
        # 5) create the code, save → 201
    def resolve(self, code):
        # if it exists: clicks += 1 and 302, otherwise 404
    def stats(self, code):
        # 200 or 404</code></pre>
<p>We keep the data in a dictionary: <code>self.links[code] = {"url": ..., "clicks": 0}</code>. In a real project this would be a PostgreSQL table (the repository from lesson 6), and for fast click counting, services use the <code>INCR</code> command in Redis.</p>
<h3>Why 302 and not 301?</h3>
<p>Browsers cache a <code>301 Moved Permanently</code> response: next time, the browser goes straight to the original site without contacting the server, and the click is not counted. <code>302 Found</code> (or <code>307</code>) is a temporary redirect: the browser asks the server every time.</p>
<h3>Tests</h3>
<p>We protect each part of the service with a test: for base62, "encode, then decode returns the original number" (a round trip); for create, the successful and the error paths; for resolve, the click count. As in lesson 8, the test must fail on a deliberately broken version.</p>
<h3>Common mistakes</h3>
<ul>
<li>Accepting URLs such as <code>javascript:alert(1)</code>: allow only <code>http</code> and <code>https</code>.</li>
<li>A clash between an alias and an automatic code: if a user takes the alias <code>q0U</code>, the generator must not issue it again.</li>
<li>Increasing clicks when the stats endpoint is called.</li>
</ul>
<div class="tip">As a next step, add to your version the router from lesson 4 (<code>POST /links</code>, <code>GET /&lt;code&gt;</code>), the rate limiter from lesson 10 and <code>/health</code> from lesson 11. Then you get a complete small backend.</div>`,
      ex: [
        { prompt: 'Write the base62 functions <code>encode(n)</code> and <code>decode(s)</code> (<code>ALPHABET</code> is given). <code>encode(0) == "0"</code>, and for a negative number raise <code>ValueError</code>. <code>decode</code> raises <code>ValueError</code> for an empty string or for a character that is not in the alphabet.', hints: ['<code>n, r = divmod(n, 62)</code> gives the last "digit", so at the end the result must be reversed with <code>reversed</code>.', 'decode: <code>n = n * 62 + ALPHABET.find(ch)</code>; if <code>find</code> finds nothing, it returns <code>-1</code>.'], check: { tests: `assert encode(0) == "0" and encode(9) == "9" and encode(10) == "a", "0 → '0', 9 → '9', 10 → 'a'"
assert encode(61) == "Z" and encode(62) == "10" and encode(3844) == "100", "61 → 'Z', 62 → '10', 3844 → '100'"
assert encode(100000) == "q0U", "100000 → 'q0U'"
assert decode("q0U") == 100000 and decode("Z") == 61, "decode: the reverse conversion"
assert all(decode(encode(n)) == n for n in list(range(0, 5000, 7)) + [10 ** 12]), "Round trip: decode(encode(n)) == n"
for _bad in ["", "ab!", "тест"]:
    try:
        decode(_bad)
        assert False, "An invalid character needs ValueError"
    except ValueError:
        pass
try:
    encode(-1)
    assert False, "A negative number needs ValueError"
except ValueError:
    pass
` } },
        { prompt: 'Write the class <code>Shortener</code> (<code>encode</code>, <code>URL_RE</code>, <code>ALIAS_RE</code> are given). <code>create(raw_body)</code>: broken JSON or not an object → <code>(400, {"error": "invalid json"})</code>; if <code>url</code> does not pass <code>URL_RE.fullmatch</code>, or <code>alias</code>, if it is given, does not pass <code>ALIAS_RE</code> → <code>(422, {"errors": {...}})</code> (the keys <code>"url"</code> / <code>"alias"</code>); without an alias, if this URL is already shortened → <code>(200, view)</code>; alias taken → <code>(409, {"error": "alias taken"})</code>; otherwise a code (the alias, or <code>encode(self.next_id)</code>: the id starts at 100000 and grows, and a taken code is skipped) → <code>(201, view)</code>. View: <code>{"code", "short_url": base + code, "url"}</code>. <code>resolve(code)</code>: <code>(302, {"location": url})</code> and clicks +1, or <code>(404, {"error": "not found"})</code>. <code>stats(code)</code>: <code>(200, {"code", "url", "clicks"})</code> or 404.', hints: ['Collect all validation errors in one <code>errors</code> dictionary and, if it is not empty, return 422.', 'Automatic code: <code>while code in self.links: self.next_id += 1; code = encode(self.next_id)</code>'], check: { tests: `_s = Shortener()
_st, _v = _s.create('{"url": "https://kofe.kz/menu?city=almaty"}')
assert _st == 201 and _v == {"code": "q0U", "short_url": "https://tq.kz/q0U", "url": "https://kofe.kz/menu?city=almaty"}, "The first link: 201, code encode(100000) = q0U"
assert _s.create('{"url": "https://kofe.kz/menu?city=almaty"}') == (200, _v), "The same URL again: 200 and the same code"
assert _s.create('{"url": "https://tolqyn.kz", "alias": "nauryz"}')[1]["code"] == "nauryz", "The alias is used as the code"
assert _s.create('{"url": "https://other.kz", "alias": "nauryz"}') == (409, {"error": "alias taken"}), "A taken alias: 409"
assert _s.create('{"url": "https://x.kz", "alias": "q0V"}')[0] == 201, "Alias q0V accepted"
assert _s.create('{"url": "https://bus.kz/route/92"}')[1]["code"] == "q0W", "The generator must skip the taken code q0V"
_st, _b = _s.create('{"url": "javascript:alert(1)", "alias": "a!"}')
assert _st == 422 and set(_b["errors"]) == {"url", "alias"}, "Invalid url and alias: 422, two keys"
assert _s.create('{"url": ') == (400, {"error": "invalid json"}), "Broken JSON: 400"
assert _s.create('"https://kofe.kz"') == (400, {"error": "invalid json"}), "JSON that is not an object: 400"
assert _s.resolve("q0U") == (302, {"location": "https://kofe.kz/menu?city=almaty"}), "resolve: 302 and location"
_s.resolve("q0U")
assert _s.stats("q0U") == (200, {"code": "q0U", "url": "https://kofe.kz/menu?city=almaty", "clicks": 2}), "Two clicks must be counted"
assert _s.stats("q0U")[1]["clicks"] == 2, "stats does not increase the clicks"
assert _s.resolve("nope") == (404, {"error": "not found"}) and _s.stats("nope")[0] == 404, "A non-existent code: 404"
` } },
        { prompt: 'For the finished <code>Shortener</code>, write <code>ShortenerTests(unittest.TestCase)</code>: in <code>setUp</code>, <code>self.s = Shortener()</code>, at least 4 tests. The check runs your tests on three broken versions: (1) <code>resolve</code> does not count clicks, (2) <code>create</code> accepts a URL that is not http(s), for example <code>"ftp://files.kz"</code>, (3) the same URL gets a new code. On each of them your tests must fail.', hints: ['Click test: create, call resolve twice, then <code>stats(code)[1]["clicks"]</code> must equal 2.', 'Invalid URL test: <code>self.s.create(\'{"url": "ftp://files.kz"}\')</code> returns 422.'], check: { tests: `import io as _io, unittest as _ut, re as _re
def _ok():
    return _ut.TextTestRunner(stream=_io.StringIO()).run(_ut.defaultTestLoader.loadTestsFromTestCase(ShortenerTests))
assert "setUp" in ShortenerTests.__dict__, "A setUp method is required"
_r = _ok()
assert _r.testsRun >= 4, "At least 4 tests are needed"
assert _r.wasSuccessful(), "The tests must pass on the correct Shortener"
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
assert not _broken(_NoClicks), "The tests did not catch that clicks are not counted"
assert not _broken(_AnyUrl), "The tests did not catch an invalid URL like ftp:// being accepted"
assert not _broken(_NoDedup), "The tests did not catch a new code being issued for the same URL"
` } },
        { prompt: 'Why does a short link return <code>302</code>, and not <code>301</code>?', options: ['302 is faster', 'A browser caches 301, so the next visit does not reach the server and the click is not counted', '301 is used only for POST', 'There is no difference'], explain: '301 is a permanent redirect: the browser remembers it. 302 is temporary, and the browser asks the shortener each time, so the service can count clicks and change the target of the link later.' }
      ]
    },
    'pyb-gate': {
      title: 'Module exam: Python Backend',
      body: `
<p>The exam covers the whole module: parsing an HTTP request, routing, validation and status codes, signed tokens, regex, rate limiting and ORM thinking. To pass, you need to score at least <b>75%</b> of the points.</p>
<ul>
<li>Function and class names must match the given ones exactly. Handlers return a pair <code>(status, body)</code>.</li>
<li>First check yourself on a small example with <code>print</code>, then press the "Check" button.</li>
<li>Remember: 400 — the request cannot be read, 422 — a value does not follow the rules, 401 — it is unknown who you are, 403 — no permission, 404 — not found, 405 — no such method.</li>
</ul>`,
      ex: [
        { prompt: 'A client sent a valid token with <code>"role": "barista"</code>, and the endpoint requires the permission <code>menu:edit</code>. In addition, <code>price</code> in the body is negative. What should the server return?', options: ['401, because there is no permission', '403, because the user is known but has no permission for this action; validation is never reached', '422, because price is negative', '400, because the body is wrong'], explain: 'The token is valid, so authentication passed (not 401). The permission check runs before validation: there is no need to tell someone without permission which field is wrong. So it is 403.' },
        { prompt: 'Write <code>handle_raw(raw)</code>: it receives the full text of an HTTP request and returns <code>(status, body)</code>. Routes: <code>GET /v1/cafes/&lt;id&gt;</code> (the id must consist of digits) → if it is in <code>CAFES</code>, <code>(200, cafe)</code>, otherwise <code>(404, {"error": "not found"})</code>; <code>POST /v1/orders</code> → the body is JSON: if it is broken or not an object, <code>(400, {"error": "invalid json"})</code>; if <code>cafe_id</code> is not in <code>CAFES</code> or <code>qty</code> is not an integer from 1 to 10 (not a bool), <code>(422, {"errors": {...}})</code> (the keys <code>"cafe_id"</code>, <code>"qty"</code>); otherwise <code>(201, {"id": &lt;grows from 1&gt;, "cafe_id": ..., "qty": ...})</code>. If the path exists but the method is different, return <code>(405, {"error": "method not allowed"})</code>; for any other path return 404. Ignore the query string (everything after <code>?</code>).', hints: [], check: { tests: `def _req(method, path, body=""):
    return f"{method} {path} HTTP/1.1\\r\\nHost: api.kofe.kz\\r\\nContent-Type: application/json\\r\\n\\r\\n{body}"
assert handle_raw(_req("GET", "/v1/cafes/2?lang=kk")) == (200, CAFES[2]), "GET /v1/cafes/2: 200, the query is ignored"
assert handle_raw(_req("GET", "/v1/cafes/9")) == (404, {"error": "not found"}), "No such cafe: 404"
assert handle_raw(_req("GET", "/v1/cafes/abc"))[0] == 404, "The id is not digits: 404"
assert handle_raw(_req("DELETE", "/v1/cafes/1")) == (405, {"error": "method not allowed"}), "Another method: 405"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 1, "qty": 2}')) == (201, {"id": 1, "cafe_id": 1, "qty": 2}), "A successful order: 201, id 1"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 2, "qty": 10}'))[1]["id"] == 2, "The next order has id 2"
assert handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 1,')) == (400, {"error": "invalid json"}), "Broken JSON: 400"
_st, _b = handle_raw(_req("POST", "/v1/orders", '{"cafe_id": 5, "qty": true}'))
assert _st == 422 and set(_b["errors"]) == {"cafe_id", "qty"}, "Two errors: 422, cafe_id and qty"
assert handle_raw(_req("GET", "/v1/orders"))[0] == 405, "GET /v1/orders: 405"
assert handle_raw(_req("GET", "/v2/buses"))[0] == 404, "An unknown path: 404"
` } },
        { prompt: 'A rate limiter with a fixed window: <code>FixedWindow(limit, window, clock)</code>. Time is split into windows of <code>window</code> seconds: the window number is <code>int(clock() // window)</code>. The method <code>allow(key)</code> must not let more than <code>limit</code> requests for this key through in one window. <code>retry_after(key)</code>: if the limit is used up, return the number of seconds until the next window, otherwise <code>0</code>.', hints: [], check: { tests: `class _Clock:
    t = 0.0
    def __call__(self):
        return self.t
_c = _Clock()
_fw = FixedWindow(limit=2, window=60, clock=_c)
_c.t = 10
assert [_fw.allow("dana") for _ in range(3)] == [True, True, False], "Two requests pass in a window, the third does not"
assert _fw.allow("erlan") is True, "Each key is counted separately"
assert _fw.retry_after("dana") == 50, "t=10, window 60: 50 seconds are left"
assert _fw.retry_after("erlan") == 0, "If the limit is not used up, retry_after = 0"
_c.t = 59.5
assert _fw.allow("dana") is False, "The current window has not ended yet"
_c.t = 60
assert _fw.allow("dana") is True and _fw.allow("dana") is True and _fw.allow("dana") is False, "In a new window the count starts again"
` } },
        { prompt: 'Access log analysis. Each line: <code>2026-03-21T09:15:02 GET /v1/cafes/12 200 0.031</code> (time, method, path, status, seconds). The function <code>summarize(log)</code> parses the lines with a regular expression (lines that do not match the format are skipped) and returns a dictionary: <code>"groups"</code> — <code>{"2xx": n, "4xx": n, "5xx": n}</code> (only the groups that occur); <code>"slow"</code> — a list of <code>"METHOD path"</code> for requests longer than 0.5 seconds (in log order); <code>"top"</code> — the most requested endpoint, where numbers in the path are replaced with <code>&lt;id&gt;</code> (<code>"GET /v1/cafes/&lt;id&gt;"</code>).', hints: [], check: { tests: `_log = """2026-03-21T09:15:02 GET /v1/cafes/12 200 0.031
2026-03-21T09:15:03 GET /v1/cafes/7 200 0.044
2026-03-21T09:15:03 POST /v1/orders 201 0.820
бұзық жол
2026-03-21T09:15:04 GET /v1/cafes/99 404 0.012
2026-03-21T09:15:05 GET /v1/orders/5/items 500 1.700
2026-03-21T09:15:06 GET /v1/menu 200 0.090"""
_s = summarize(_log)
assert _s["groups"] == {"2xx": 4, "4xx": 1, "5xx": 1}, "Status groups: 2xx=4, 4xx=1, 5xx=1 (a broken line is skipped)"
assert _s["slow"] == ["POST /v1/orders", "GET /v1/orders/5/items"], "Requests longer than 0.5 seconds, in log order"
assert _s["top"] == "GET /v1/cafes/<id>", "ids are grouped as <id>: GET /v1/cafes/<id> appears three times"
assert summarize("") == {"groups": {}, "slow": [], "top": None}, "An empty log"
` } },
        { prompt: 'Session cookie. <code>make_cookie(user_id, secret)</code> returns <code>"&lt;user_id&gt;.&lt;sig&gt;"</code>, where <code>sig</code> = <code>hmac.new(secret.encode(), str(user_id).encode(), hashlib.sha256).hexdigest()[:16]</code>. <code>current_user(headers, secret, users)</code>: take the <code>"cookie"</code> header from the dictionary <code>headers</code> (for example <code>"theme=dark; sid=7.ab12...; lang=kk"</code>), find the value of <code>sid</code>, and check its signature with <code>hmac.compare_digest</code>. If everything is correct and the user is in the dictionary <code>users</code>, return the user dictionary, otherwise <code>None</code>.', hints: [], check: { tests: `_users = {7: {"name": "Сая", "role": "barista"}, 8: {"name": "Ерлан", "role": "manager"}}
_ck = make_cookie(7, "k3y")
import hmac as _h, hashlib as _hl
assert _ck == "7." + _h.new(b"k3y", b"7", _hl.sha256).hexdigest()[:16], "Cookie: user_id.sig, sig is the first 16 characters of the HMAC"
assert current_user({"cookie": "theme=dark; sid=" + _ck + "; lang=kk"}, "k3y", _users) == _users[7], "A correct cookie: the user is returned"
assert current_user({"cookie": "sid=8." + _ck.split(".")[1]}, "k3y", _users) is None, "A signature moved to another user_id is invalid"
assert current_user({"cookie": "sid=" + _ck}, "other", _users) is None, "Another secret: None"
assert current_user({}, "k3y", _users) is None, "No cookie: None"
assert current_user({"cookie": "sid=" + make_cookie(99, "k3y")}, "k3y", _users) is None, "An id that is not in users: None"
assert current_user({"cookie": "sid=garbage"}, "k3y", _users) is None, "A broken sid: None"
` } },
        { prompt: 'A page shows 100 orders. The log has 1 query <code>SELECT * FROM orders</code> and 100 queries <code>SELECT * FROM customers WHERE id = ?</code>. What is the problem and how do you fix it?', options: ['No index; add an index on <code>orders</code>', 'N+1; fetch the customers in one query (<code>JOIN</code> or <code>WHERE id IN (...)</code>, in the ORM select_related/joinedload)', 'No cache; wrap each query in lru_cache', 'Too few Gunicorn workers; increase the number of workers'], explain: 'One main query and one extra query for each row: the classic N+1. Fetching the related data in advance with one query reduces them to two (or to one with a JOIN).' }
      ]
    }
  }
});
