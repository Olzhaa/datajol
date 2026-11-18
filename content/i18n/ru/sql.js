// M1.2 SQL Core: Russian text. Queries, solutions and the dataset are in content/sql.js.
// Values stored in the database (cities, categories, product names) stay in Kazakh, as they are in the data.
DJ.i18n.patch({
  modules: {
    'm1-2': { intro: 'В этом модуле вы работаете с базой данных интернет-магазина: клиенты, товары, заказы. Пишите запрос в редакторе справа, смотрите результат кнопкой «Запустить», а затем нажимайте «Проверить».' }
  },
  lessons: {
    'sql-1': {
      title: 'База данных и первый SELECT',
      body: `
<p><b>SQL</b> (Structured Query Language) — язык, на котором задают вопросы таблицам в базе данных. Банк, магазин, приложение такси — внутри у всех есть SQL-база.</p>
<p>В базе нашего магазина четыре таблицы:</p>
<table>
<tr><th>Таблица</th><th>Столбцы</th></tr>
<tr><td><code>customers</code></td><td>id, name, city, signup_date</td></tr>
<tr><td><code>products</code></td><td>id, name, category, price</td></tr>
<tr><td><code>orders</code></td><td>id, customer_id, order_date, status</td></tr>
<tr><td><code>order_items</code></td><td>order_id, product_id, quantity</td></tr>
</table>
<h3>SELECT ... FROM</h3>
<p>Самый простой запрос берёт из таблицы всё. Знак <code>*</code> означает «все столбцы»:</p>
<pre><code>SELECT * FROM customers;</code></pre>
<p>Можно перечислить через запятую только нужные столбцы:</p>
<pre><code>SELECT name, city FROM customers;</code></pre>
<div class="tip">Писать ключевые слова SQL (SELECT, FROM) заглавными — просто традиция. <code>select</code> тоже работает. <code>;</code> в конце нужна, чтобы разделять несколько запросов.</div>
<h3>Как выполняется запрос?</h3>
<p>Вы пишете запрос, база данных читает его, берёт строки из таблицы и возвращает результат в виде новой таблицы. Исходная таблица не меняется: SELECT только читает, поэтому экспериментируйте смело.</p>
<h3>Почему <code>*</code> используют осторожно?</h3>
<ul>
<li>В реальной работе в таблице десятки и даже сотни столбцов. <code>SELECT *</code> тянет лишние данные и замедляет запрос.</li>
<li>Если позже в таблицу добавят новый столбец, результат <code>*</code> изменится, и отчёт может сломаться.</li>
<li>Если перечислить столбцы, человек, читающий запрос, сразу поймёт, что именно выбирается.</li>
</ul>
<p>Поэтому используйте <code>*</code> при первом знакомстве с таблицей, а в постоянных запросах называйте столбцы.</p>
<div class="tip">Когда впервые смотрите на большую таблицу, добавьте в конец <code>LIMIT 10</code>: база вернёт не всю таблицу, а только 10 строк. Подробнее об этом — в уроке про ORDER BY.</div>`,
      ex: [
        { prompt: 'Выведите все столбцы и строки таблицы <code>products</code>.', starter: '-- Пишите запрос здесь\n', hints: ['Для всех столбцов используется <code>*</code>.', 'Шаблон: <code>SELECT * FROM имя_таблицы;</code>'] },
        { prompt: 'Выведите только название (<code>name</code>) и цену (<code>price</code>) товаров.', hints: ['Перечислите столбцы через запятую.', '<code>SELECT name, price FROM products;</code>'] }
      ]
    },
    'sql-2': {
      title: 'WHERE: фильтрация строк',
      body: `
<p>Условие <code>WHERE</code> оставляет только нужные строки. Оно пишется после <code>FROM</code>:</p>
<pre><code>SELECT name, price
FROM products
WHERE price > 50000;</code></pre>
<h3>Операторы сравнения</h3>
<table>
<tr><th>Оператор</th><th>Значение</th></tr>
<tr><td><code>=</code></td><td>равно</td></tr>
<tr><td><code>&lt;&gt;</code> или <code>!=</code></td><td>не равно</td></tr>
<tr><td><code>&gt;</code>, <code>&lt;</code></td><td>больше, меньше</td></tr>
<tr><td><code>&gt;=</code>, <code>&lt;=</code></td><td>больше или равно, меньше или равно</td></tr>
</table>
<p>Текст и даты пишутся в <b>одинарных кавычках</b>: <code>WHERE city = 'Алматы'</code>. Числа — без кавычек: <code>WHERE price = 9000</code>.</p>
<div class="tip">Даты хранятся в формате <code>'2024-09-01'</code>. В таком формате их правильно сравнивать даже как текст: <code>order_date &gt;= '2024-10-01'</code>.</div>
<h3>Как работает WHERE?</h3>
<p>База данных проверяет условие для каждой строки таблицы. Если условие <code>TRUE</code>, строка попадает в результат, если <code>FALSE</code> или неизвестно — не попадает. Поэтому WHERE никогда не создаёт новых строк, а только фильтрует существующие.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Двойные кавычки</b>: <code>city = "Алматы"</code>. В стандартном SQL двойные кавычки обозначают имя столбца; для текста пишите одинарные.</li>
<li><b>Регистр</b>: <code>'алматы'</code> и <code>'Алматы'</code> — разный текст. Сначала посмотрите, как значение записано в данных, через <code>SELECT DISTINCT city</code>.</li>
<li><b>Лишний пробел</b>: <code>'Алматы '</code> с пробелом в конце не совпадёт. Такие данные мы исправим в модуле об очистке.</li>
<li><b>Сравнение числа как текста</b>: <code>price &gt; '50000'</code> в некоторых базах сравнивается как текст и даёт неожиданный результат. Пишите числа без кавычек.</li>
</ul>
<div class="tip">Простой способ проверить условие: сначала выполните запрос без WHERE и просмотрите несколько строк глазами, затем добавьте условие и проверьте, что число строк уменьшилось разумно.</div>`,
      ex: [
        { prompt: 'Выведите название и цену товаров дороже 50 000 тенге.', hints: ['Условие: <code>price > 50000</code>'] },
        { prompt: 'Выведите все столбцы клиентов из Астаны.', hints: ['Возьмите текст в кавычки: <code>\'Астана\'</code>.'] },
        { prompt: 'Выведите заказы (все столбцы), у которых статус не <code>delivered</code>.', hints: ['Оператор «не равно»: <code>&lt;&gt;</code> или <code>!=</code>.'] }
      ]
    },
    'sql-3': {
      title: 'AND, OR, NOT, BETWEEN, IN',
      body: `
<p>Чтобы объединить несколько условий, есть логические операторы:</p>
<ul>
<li><code>AND</code> — должны выполняться оба условия.</li>
<li><code>OR</code> — достаточно, чтобы выполнилось хотя бы одно.</li>
<li><code>NOT</code> — переворачивает условие.</li>
</ul>
<pre><code>SELECT name, price FROM products
WHERE category = 'Электроника' AND price &lt; 100000;</code></pre>
<h3>BETWEEN и IN</h3>
<p><code>BETWEEN a AND b</code> — диапазон, включая границы. <code>IN (...)</code> — равно одному из значений списка.</p>
<pre><code>WHERE price BETWEEN 5000 AND 20000
WHERE city IN ('Алматы', 'Шымкент')
WHERE city NOT IN ('Алматы')</code></pre>
<div class="tip">Если смешиваете AND и OR, ставьте скобки: <code>WHERE (city = 'Алматы' OR city = 'Астана') AND status = 'delivered'</code>. Без скобок AND выполняется первым.</div>
<h3>Приоритет условий</h3>
<p>SQL выполняет сначала <code>NOT</code>, затем <code>AND</code>, в конце <code>OR</code>. Условие</p>
<pre><code>WHERE city = 'Алматы' OR city = 'Астана' AND status = 'delivered'</code></pre>
<p>на самом деле читается как <code>city = 'Алматы' OR (city = 'Астана' AND status = 'delivered')</code>: из Алматы придут строки с любым статусом. Скобки предотвращают ошибку и облегчают чтение запроса.</p>
<h3>BETWEEN и даты</h3>
<p><code>BETWEEN</code> включает обе границы. Если дата хранится вместе со временем (<code>'2024-09-30 14:00'</code>), то <code>BETWEEN '2024-09-01' AND '2024-09-30'</code> пропустит записи за 30 сентября после полуночи, потому что как текст они больше <code>'2024-09-30'</code>. В таком случае надёжнее ограничиться началом следующего месяца:</p>
<pre><code>WHERE order_date &gt;= '2024-09-01' AND order_date &lt; '2024-10-01'</code></pre>
<div class="tip">Если в списке <code>NOT IN</code> есть NULL, условие не выполнится ни для одной строки. Не добавляйте NULL, когда пишете список вручную, а если берёте его из подзапроса, добавьте <code>WHERE ... IS NOT NULL</code>.</div>`,
      ex: [
        { prompt: 'Выведите название и цену товаров категории «Электроника» дешевле 100 000.', hints: ['Объедините два условия через <code>AND</code>.'] },
        { prompt: 'Выведите имя и город клиентов из Алматы или Шымкента. Используйте <code>IN</code>.', hints: ["<code>WHERE city IN ('Алматы', 'Шымкент')</code>"] },
        { prompt: 'Выведите все заказы, сделанные в сентябре 2024 года (1–30 сентября). Используйте <code>BETWEEN</code>.', hints: ["Пишите даты в кавычках: <code>'2024-09-01'</code>."] }
      ]
    },
    'sql-4': {
      title: 'LIKE и NULL',
      body: `
<h3>LIKE: поиск по шаблону</h3>
<p><code>%</code> — любая последовательность символов, <code>_</code> — ровно один символ.</p>
<pre><code>WHERE name LIKE 'Кітап%'   -- начинается со слова «Кітап»
WHERE name LIKE '%фон'     -- заканчивается на «фон»
WHERE name LIKE '%ал%'     -- содержит «ал»</code></pre>
<h3>NULL: значения нет</h3>
<p><code>NULL</code> — это «неизвестно» или «пусто». Это не ноль и не пустой текст. Поэтому <code>= NULL</code> не работает, нужен специальный оператор:</p>
<pre><code>WHERE city IS NULL
WHERE city IS NOT NULL</code></pre>
<div class="tip">В реальных данных NULL встречается очень часто. Перед анализом всегда проверяйте, в каких столбцах есть пустые значения.</div>
<h3>Дополнительно о LIKE</h3>
<ul>
<li>В SQLite <code>LIKE</code> не чувствителен к регистру для латинских букв: <code>'a%'</code> найдёт и «Apple». Но для кириллицы это правило не работает: «кітап» и «Кітап» — разные строки.</li>
<li>Для поиска без учёта регистра приведите обе стороны к одному виду: <code>WHERE LOWER(name) LIKE '%phone%'</code>.</li>
<li>Шаблон с <code>%</code> в начале (<code>'%фон'</code>) не может использовать индекс и на большой таблице работает медленно.</li>
</ul>
<h3>NULL в арифметике и сравнениях</h3>
<p>Любая операция с NULL даёт NULL: <code>5 + NULL</code> = NULL, и даже <code>NULL = NULL</code> — не TRUE, а NULL. Поэтому <code>WHERE city &lt;&gt; 'Алматы'</code> не покажет и клиентов с пустым городом: для них условие неизвестно.</p>
<p>Чтобы заменить пустое значение другим, есть <code>COALESCE</code>:</p>
<pre><code>SELECT name, COALESCE(city, 'белгісіз') AS city FROM customers;  -- 'белгісіз' = «неизвестно»</code></pre>
<div class="tip">Быстрый способ посчитать пустые значения в столбце: <code>SELECT COUNT(*) - COUNT(city) FROM customers</code>. <code>COUNT(city)</code> не считает NULL, и разность равна числу пустых строк.</div>`,
      ex: [
        { prompt: 'Выведите все столбцы товаров, название которых начинается со слова «Кітап».', hints: ["<code>LIKE 'Кітап%'</code>"] },
        { prompt: 'Выведите столбцы <code>id</code> и <code>name</code> клиентов, у которых не указан город.', hints: ['Пишите <code>IS NULL</code>, а не <code>= NULL</code>.'] }
      ]
    },
    'sql-5': {
      title: 'ORDER BY, LIMIT, DISTINCT',
      body: `
<p><code>ORDER BY</code> сортирует результат. <code>ASC</code> — по возрастанию (по умолчанию), <code>DESC</code> — по убыванию.</p>
<pre><code>SELECT name, price FROM products
ORDER BY price DESC;</code></pre>
<p><code>LIMIT n</code> оставляет только первые n строк. Вместе с ORDER BY так получают «топ-N».</p>
<p><code>DISTINCT</code> убирает повторяющиеся строки:</p>
<pre><code>SELECT DISTINCT category FROM products;</code></pre>
<h3>Порядок частей запроса</h3>
<pre><code>SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...</code></pre>
<h3>Сортировка по нескольким столбцам</h3>
<p>В ORDER BY можно передать несколько столбцов через запятую. Второй столбец учитывается, когда значения первого равны:</p>
<pre><code>SELECT name, category, price FROM products
ORDER BY category ASC, price DESC;</code></pre>
<p>В результате категории идут по алфавиту, а внутри каждой категории товары — от дорогих к дешёвым.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>LIMIT без ORDER BY</b>: база может вернуть строки в любом порядке, поэтому «первые 5» каждый раз могут быть разными. Для топ-N всегда пишите ORDER BY.</li>
<li><b>Равные значения</b>: если у 3-го и 4-го товара одинаковая цена, LIMIT 3 оставит один из них случайно. Для стабильного результата добавьте второй столбец сортировки (например, <code>id</code>).</li>
<li><b>Порядок NULL</b>: в SQLite NULL при сортировке по возрастанию стоят первыми, при сортировке по убыванию — последними. В других базах может быть наоборот.</li>
</ul>
<div class="tip"><code>DISTINCT</code> применяется ко всей строке: <code>SELECT DISTINCT city, signup_date</code> даёт уникальные пары города и даты, а не только города.</div>`,
      ex: [
        { prompt: 'Выведите название и цену 3 самых дорогих товаров, от дорогого к дешёвому.', hints: ['<code>ORDER BY price DESC</code>, затем <code>LIMIT 3</code>.'] },
        { prompt: 'Выведите список городов клиентов без повторов. Не включайте NULL.', hints: ['<code>SELECT DISTINCT city</code> + <code>WHERE city IS NOT NULL</code>.'] },
        { prompt: 'Выведите имена клиентов и дату регистрации, начиная с самых новых.', hints: ['От нового к старому: <code>DESC</code>.'] }
      ]
    },
    'sql-6': {
      title: 'Alias и вычисляемые столбцы',
      body: `
<p>Внутри SELECT можно считать: <code>+ - * /</code>. Новому столбцу даём имя (alias) через <code>AS</code>:</p>
<pre><code>SELECT name,
       price,
       price * 1.12 AS price_with_vat
FROM products;</code></pre>
<p>Короткое имя можно дать и таблице. Это очень пригодится в уроке про JOIN:</p>
<pre><code>SELECT p.name FROM products AS p;
SELECT p.name FROM products p;   -- AS не обязателен</code></pre>
<div class="tip">В SQLite при делении целого на целое результат тоже целый: <code>7 / 2 = 3</code>. Для точного результата сделайте одно из чисел дробным: <code>7 / 2.0 = 3.5</code>.</div>
<h3>Примеры вычисляемых столбцов</h3>
<pre><code>SELECT name,
       price,
       ROUND(price * 0.85) AS after_discount,
       price - 5000       AS minus_coupon
FROM products;</code></pre>
<p><code>ROUND(x)</code> округляет до целого, <code>ROUND(x, 1)</code> — до одного знака после запятой. Текст можно склеивать через <code>||</code>: <code>name || ' (' || category || ')'</code>.</p>
<h3>Где можно использовать alias?</h3>
<p>Части запроса выполняются не в том порядке, в каком написаны: база сначала выполняет <code>FROM</code> и <code>WHERE</code>, затем <code>SELECT</code>, а в конце <code>ORDER BY</code>. Поэтому alias можно использовать в ORDER BY, но нельзя в WHERE:</p>
<pre><code>SELECT name, price * 1.12 AS price_with_vat
FROM products
ORDER BY price_with_vat DESC;   -- правильно</code></pre>
<p>В WHERE вычисление нужно написать заново: <code>WHERE price * 1.12 &gt; 50000</code>.</p>
<div class="tip">Давайте alias имена без пробелов, латинскими буквами: <code>price_with_vat</code>. Если в имени есть пробел, его придётся брать в двойные кавычки, а в последующих запросах это неудобно.</div>`,
      ex: [
        { prompt: 'Для товаров категории «Кеңсе» (канцелярия) выведите название под именем <code>product</code> и цену со скидкой 10% под именем <code>sale_price</code>.', hints: ['Скидка 10% = <code>price * 0.9</code>.', 'Имя столбца: <code>name AS product</code>.'] },
        { prompt: 'Выведите название каждого товара и цену в тысячах тенге (<code>price_k</code>, дробное число). Например, 6500 → 6.5.', hints: ['Избегайте целочисленного деления: <code>1000.0</code>.'] }
      ]
    },
    'sql-7': {
      title: 'Агрегатные функции',
      body: `
<p>Представьте кассу магазина. Кассир не перечисляет каждый товар из чека, в конце он называет одно число: «Итого 41 700 ₸». <b>Агрегатные функции</b> делают то же самое: берут много строк и сводят их к одному числу. Так решаются все вопросы менеджера вроде «сколько у нас клиентов?» и «какая средняя цена?». Это то же, что формулы <code>COUNT</code>, <code>SUM</code>, <code>AVERAGE</code> в Excel.</p>
<table>
<tr><th>Функция</th><th>Что возвращает</th></tr>
<tr><td><code>COUNT(*)</code></td><td>число строк</td></tr>
<tr><td><code>COUNT(col)</code></td><td>число значений, не равных NULL</td></tr>
<tr><td><code>SUM(col)</code></td><td>сумму</td></tr>
<tr><td><code>AVG(col)</code></td><td>среднее</td></tr>
<tr><td><code>MIN(col)</code>, <code>MAX(col)</code></td><td>наименьшее, наибольшее</td></tr>
</table>
<h3>Пример: несколько функций в одном запросе</h3>
<p>Представим, что в таблице <code>products</code> всего 4 товара:</p>
<table>
<tr><th>id</th><th>name</th><th>category</th><th>price</th></tr>
<tr><td>2</td><td>Құлаққап</td><td>Электроника</td><td>25000</td></tr>
<tr><td>4</td><td>Кітап: SQL негіздері</td><td>Кітаптар</td><td>6500</td></tr>
<tr><td>7</td><td>Термос</td><td>Аксессуарлар</td><td>9000</td></tr>
<tr><td>9</td><td>Блокнот</td><td>Кеңсе</td><td>1200</td></tr>
</table>
<pre><code>SELECT COUNT(*)   AS n,
       SUM(price) AS total,
       AVG(price) AS avg_price,
       MAX(price) AS max_price
FROM products;</code></pre>
<p>Результат — не 4 строки, а <b>одна строка</b>. Столбцы идут в том порядке, в каком написаны в SELECT:</p>
<table>
<tr><th>n</th><th>total</th><th>avg_price</th><th>max_price</th></tr>
<tr><td>4</td><td>41700</td><td>10425</td><td>25000</td></tr>
</table>
<p>Расчёт: 25000 + 6500 + 9000 + 1200 = 41700, а 41700 / 4 = 10425. Агрегаты можно использовать вместе с <code>WHERE</code>: сначала строки фильтруются, потом оставшиеся сводятся:</p>
<pre><code>SELECT COUNT(*) AS n, AVG(price) AS avg_price
FROM products
WHERE category = 'Электроника';</code></pre>
<h3>Три вида COUNT</h3>
<p>Четыре клиента: Айгерім (Алматы), Ержан (Алматы), Бауыржан (город <code>NULL</code>), Жанар (Ақтөбе).</p>
<table>
<tr><th>Выражение</th><th>Результат</th><th>Почему</th></tr>
<tr><td><code>COUNT(*)</code></td><td>4</td><td>все строки</td></tr>
<tr><td><code>COUNT(city)</code></td><td>3</td><td>NULL не считается</td></tr>
<tr><td><code>COUNT(DISTINCT city)</code></td><td>2</td><td>Алматы, Ақтөбе</td></tr>
</table>
<h3>Частые ошибки</h3>
<ul>
<li><b>Путать COUNT и SUM.</b> <code>COUNT(quantity)</code> — сколько строк, а <code>SUM(quantity)</code> — сумма всех штук. Если в одной строке 5 блокнотов, COUNT посчитает 1, а SUM — 5.</li>
<li><b>Смешивать агрегат и обычный столбец:</b> <code>SELECT name, MAX(price)</code>. В таком запросе непонятно, из какой строки взять <code>name</code>. Чтобы узнать название самого дорогого товара, пишите <code>ORDER BY price DESC LIMIT 1</code>, а расчёт «для каждой группы» — это GROUP BY из следующего урока.</li>
<li><b>Забывать про NULL.</b> <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code> игнорируют NULL. Поэтому <code>AVG</code> не считает пустые значения нулями.</li>
</ul>`,
      ex: [
        { prompt: 'Сколько клиентов в базе? Выведите одно число.', hints: ['<code>COUNT(*)</code>'] },
        { prompt: 'Выведите в одной строке, в этом порядке, самую низкую, самую высокую и среднюю цену товаров.', hints: ['Три функции в одном SELECT: <code>MIN, MAX, AVG</code>.'] },
        { prompt: 'Сколько всего штук товаров продано во всех заказах? (сумма <code>order_items.quantity</code>)', hints: ['<code>SUM(quantity)</code>'] }
      ]
    },
    'sql-8': {
      title: 'GROUP BY и HAVING',
      body: `
<p>В прошлом уроке агрегат дал одно число на всю таблицу. Но на вопрос «сколько клиентов в <b>каждом</b> городе?» одного числа не хватит. Представьте, что вы раскладываете чеки на столе в стопки по городам и считаете каждую стопку отдельно. <code>GROUP BY</code> делает именно это: делит строки на группы и считает агрегат для каждой группы. Это то же, что сводная таблица (pivot table) в Excel.</p>
<h3>Пример: клиенты в каждом городе</h3>
<table>
<tr><th>id</th><th>name</th><th>city</th></tr>
<tr><td>1</td><td>Айгерім</td><td>Алматы</td></tr>
<tr><td>2</td><td>Нұрлан</td><td>Астана</td></tr>
<tr><td>4</td><td>Ержан</td><td>Алматы</td></tr>
<tr><td>6</td><td>Тимур</td><td>Астана</td></tr>
<tr><td>7</td><td>Әсем</td><td>Алматы</td></tr>
</table>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city;</code></pre>
<p>Сначала SQL собирает две группы: «Алматы» (Айгерім, Ержан, Әсем) и «Астана» (Нұрлан, Тимур). Затем считает строки в каждой группе. В результате на каждую группу <b>одна строка</b>:</p>
<table>
<tr><th>city</th><th>customers</th></tr>
<tr><td>Алматы</td><td>3</td></tr>
<tr><td>Астана</td><td>2</td></tr>
</table>
<p>В SELECT можно написать несколько агрегатов подряд, например <code>COUNT(*)</code> и <code>AVG(price)</code> вместе — для каждой группы посчитаются оба.</p>
<p>Правило: каждый столбец в SELECT, который не агрегат, должен быть и в GROUP BY.</p>
<h3>HAVING: фильтр по группам</h3>
<p><code>WHERE</code> фильтрует <b>строки</b> до группировки. <code>HAVING</code> фильтрует <b>группы</b> после неё. Поэтому условие на агрегат (<code>COUNT(*)</code>, <code>AVG(price)</code>) пишется только в HAVING. Оставим из таблицы выше только города, где не меньше 3 клиентов:</p>
<pre><code>SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
HAVING COUNT(*) &gt;= 3;</code></pre>
<table>
<tr><th>city</th><th>customers</th></tr>
<tr><td>Алматы</td><td>3</td></tr>
</table>
<p>В группе «Астана» 2 строки, условие не выполнилось, и группа отброшена. Ещё пример — категории со средней ценой выше 10 000:</p>
<pre><code>SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) &gt; 10000;</code></pre>
<p><b>Порядок записи</b> (в таком порядке вы пишете запрос): <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code>.</p>
<p><b>Порядок выполнения</b> (в таком порядке база данных считает на самом деле, его называют логическим порядком): <code>FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT</code>. То есть база данных сначала берёт таблицу (JOIN, который вы изучите позже, тоже выполняется на этом шаге), фильтрует строки, группирует, фильтрует группы и только потом вычисляет столбцы из SELECT. Отсюда и запрет на агрегаты в WHERE: когда он выполняется, группы ещё не построены.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Агрегат в WHERE:</b> <code>WHERE COUNT(*) &gt; 1</code> даёт ошибку. На этапе WHERE групп ещё нет — используйте HAVING.</li>
<li><b>Забыть GROUP BY.</b> <code>SELECT city, COUNT(*) FROM customers</code> в нашем SQLite в браузере не выдаёт ошибку: он возвращает одну строку на всю таблицу и подставляет в <code>city</code> один случайный город. Это особенность SQLite. Строгие базы данных вроде PostgreSQL на такой запрос сразу выдают ошибку («столбец city должен быть в GROUP BY»).</li>
<li><b>Не заметить группу NULL.</b> Строки с пустым <code>city</code> собираются в отдельную группу <code>NULL</code>. Если она не нужна, добавьте <code>WHERE city IS NOT NULL</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите число клиентов по каждому городу: <code>city</code> и число.', hints: ['<code>GROUP BY city</code>'] },
        { prompt: 'Для каждой категории (<code>category</code>) выведите число товаров и среднюю цену.', hints: ['Три столбца: category, COUNT(*), AVG(price).'] },
        { prompt: 'Выведите <code>customer_id</code> и число заказов для клиентов, сделавших больше одного заказа.', hints: ['Сначала сгруппируйте <code>orders</code> по <code>customer_id</code>.', 'Фильтр по группам: <code>HAVING COUNT(*) > 1</code>.'] }
      ]
    },
    'sql-9': {
      title: 'CASE WHEN: условные столбцы',
      body: `
<p>Учитель, проверяя работы, ставит оценку по баллам: больше 85 — «5», больше 70 — «4», иначе — «3». <code>CASE</code> — это такое же «если ... то ...» в SQL. Он проверяет условие для каждой строки и создаёт новый столбец. Похоже на формулу <code>IF</code> в Excel, но несколько условий подряд писать проще.</p>
<pre><code>CASE
  WHEN условие1 THEN значение1
  WHEN условие2 THEN значение2
  ELSE значение_для_остальных
END AS новый_столбец</code></pre>
<p>Условия проверяются <b>сверху вниз</b>: берётся первое выполненное, остальные уже не смотрятся.</p>
<h3>Пример: делим цены на уровни</h3>
<table>
<tr><th>name</th><th>price</th></tr>
<tr><td>Ноутбук</td><td>350000</td></tr>
<tr><td>Құлаққап</td><td>25000</td></tr>
<tr><td>Термос</td><td>9000</td></tr>
<tr><td>Үстел шамы</td><td>8000</td></tr>
<tr><td>Блокнот</td><td>1200</td></tr>
</table>
<pre><code>SELECT name, price,
  CASE
    WHEN price &gt;= 20000 THEN 'высокий'
    WHEN price &gt;= 5000 THEN 'средний'
    ELSE 'низкий'
  END AS level
FROM products;</code></pre>
<table>
<tr><th>name</th><th>price</th><th>level</th></tr>
<tr><td>Ноутбук</td><td>350000</td><td>высокий</td></tr>
<tr><td>Құлаққап</td><td>25000</td><td>высокий</td></tr>
<tr><td>Термос</td><td>9000</td><td>средний</td></tr>
<tr><td>Үстел шамы</td><td>8000</td><td>средний</td></tr>
<tr><td>Блокнот</td><td>1200</td><td>низкий</td></tr>
</table>
<p>Посмотрим на термос: 9000 ≥ 20000 — нет, первое условие не прошло. 9000 ≥ 5000 — второе условие прошло, поэтому «средний». Блокноту не подошло ни одно условие, он попал в <code>ELSE</code>.</p>
<p>Условие можно писать и с текстом: <code>WHEN city = 'Алматы' THEN 'Алматы' ELSE 'регионы'</code>. Текст всегда в одинарных кавычках.</p>
<h3>CASE + GROUP BY</h3>
<p>Если дать CASE имя и сгруппировать по нему, можно считать по своим собственным сегментам:</p>
<pre><code>SELECT
  CASE
    WHEN price &gt;= 20000 THEN 'высокий'
    WHEN price &gt;= 5000 THEN 'средний'
    ELSE 'низкий'
  END AS level,
  COUNT(*) AS n
FROM products
GROUP BY level;</code></pre>
<table>
<tr><th>level</th><th>n</th></tr>
<tr><td>высокий</td><td>2</td></tr>
<tr><td>средний</td><td>2</td></tr>
<tr><td>низкий</td><td>1</td></tr>
</table>
<p>SQL сначала присваивает каждой строке уровень (таблица выше), потом собирает строки с одинаковым уровнем в группу и считает их. Можно проверить в условии одно значение, а всё остальное собрать в одну группу через <code>ELSE</code> — тогда в результате будет только две группы. GROUP BY по alias работает в SQLite и PostgreSQL; в некоторых базах выражение CASE нужно полностью повторить в GROUP BY.</p>
<div class="tip"><b>Частые ошибки:</b>
<ul>
<li><b>Порядок условий.</b> Если первым стоит <code>WHEN price &gt;= 5000</code>, то и ноутбук станет «средним». Начинайте с большей границы.</li>
<li><b>Забыть ELSE.</b> Без ELSE строки, не подошедшие ни под одно условие, получают <code>NULL</code>.</li>
<li><b>Забыть END</b> или неверно поставить запятую. CASE ... END — это один столбец, запятая ставится после него.</li>
</ul></div>`,
      ex: [
        { prompt: 'Выведите название, цену и столбец <code>segment</code> для каждого товара: 100 000 и выше — <code>қымбат</code> (дорогой), 10 000 и выше — <code>орташа</code> (средний), остальные — <code>арзан</code> (дешёвый). Значения пишите на казахском, как здесь.', hints: ["Второе условие: <code>WHEN price >= 10000 THEN 'орташа'</code>", "В конце: <code>ELSE 'арзан'</code>"] },
        { prompt: "Разделите заказы на две группы и посчитайте их: если <code>delivered</code> — <code>'жеткізілді'</code> (доставлен), иначе <code>'басқа'</code> (другие). Столбцы: название группы и число.", hints: ['Дайте выражению CASE имя (alias) и сгруппируйте по нему.'] }
      ]
    },
    'sql-10': {
      title: 'JOIN: объединение таблиц',
      body: `
<p>Данные разложены по нескольким таблицам: в заказе есть только <code>customer_id</code>, а имя клиента лежит в таблице <code>customers</code>. Представьте курьера: у него бумажка «доставить клиенту №3», и чтобы узнать имя, он ищет номер 3 в журнале клиентов. <code>JOIN</code> делает этот поиск автоматически для каждой строки. Похоже на XLOOKUP в Excel, только сразу для всей таблицы.</p>
<h3>Пример: добавляем к заказу имя клиента</h3>
<p><code>orders</code>:</p>
<table>
<tr><th>id</th><th>customer_id</th><th>order_date</th></tr>
<tr><td>101</td><td>1</td><td>2024-08-02</td></tr>
<tr><td>102</td><td>2</td><td>2024-08-05</td></tr>
<tr><td>103</td><td>1</td><td>2024-08-19</td></tr>
</table>
<p><code>customers</code>:</p>
<table>
<tr><th>id</th><th>name</th></tr>
<tr><td>1</td><td>Айгерім</td></tr>
<tr><td>2</td><td>Нұрлан</td></tr>
<tr><td>3</td><td>Дана</td></tr>
</table>
<pre><code>SELECT o.id, c.name, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id;</code></pre>
<table>
<tr><th>id</th><th>name</th><th>order_date</th></tr>
<tr><td>101</td><td>Айгерім</td><td>2024-08-02</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>2024-08-05</td></tr>
<tr><td>103</td><td>Айгерім</td><td>2024-08-19</td></tr>
</table>
<p>Для каждого заказа SQL нашёл в <code>customers</code> строку, у которой <code>id</code> равен <code>customer_id</code>. У Айгерім два заказа, поэтому её имя вышло дважды.</p>
<p><code>ON</code> показывает, по каким столбцам связаны таблицы. Обычно это <b>foreign key</b> (<code>orders.customer_id</code>) и <b>primary key</b> (<code>customers.id</code>).</p>
<h3>INNER JOIN</h3>
<p><code>JOIN</code> = <code>INNER JOIN</code>: остаются только строки, у которых есть пара в обеих таблицах. Клиент без заказов в результат не попадает — в примере нет Даны.</p>
<p>После JOIN, как обычно, можно писать <code>WHERE</code>, <code>ORDER BY</code>, <code>GROUP BY</code>. Например, только заказы Айгерім: <code>... JOIN ... ON ... WHERE c.name = 'Айгерім'</code>.</p>
<div class="tip">Если в двух таблицах есть столбцы с одинаковым именем (например <code>id</code>, <code>name</code>), обязательно пишите имя таблицы или alias: <code>c.name</code>, <code>p.name</code>.</div>
<h3>Считаем выручку</h3>
<p>Выручка заказа = количество × цена. Количество лежит в <code>order_items</code>, цена — в <code>products</code>, поэтому объединяем их:</p>
<pre><code>SELECT oi.order_id, SUM(oi.quantity * p.price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY oi.order_id;</code></pre>
<p>После JOIN, до группировки, промежуточная таблица выглядит так:</p>
<table>
<tr><th>order_id</th><th>product</th><th>quantity</th><th>price</th><th>quantity × price</th></tr>
<tr><td>101</td><td>Ноутбук</td><td>1</td><td>350000</td><td>350000</td></tr>
<tr><td>101</td><td>Құлаққап</td><td>1</td><td>25000</td><td>25000</td></tr>
<tr><td>102</td><td>Кітап: SQL негіздері</td><td>2</td><td>6500</td><td>13000</td></tr>
<tr><td>102</td><td>Блокнот</td><td>5</td><td>1200</td><td>6000</td></tr>
</table>
<p>GROUP BY складывает строки каждого заказа:</p>
<table>
<tr><th>order_id</th><th>revenue</th></tr>
<tr><td>101</td><td>375000</td></tr>
<tr><td>102</td><td>19000</td></tr>
</table>
<h3>Частые ошибки</h3>
<ul>
<li><b>ON не по тому столбцу:</b> <code>ON o.id = c.id</code>. Номер заказа — не номер клиента! Связь всегда foreign key → primary key: <code>o.customer_id = c.id</code>.</li>
<li><b>Забыть ON.</b> JOIN без условия соединяет каждую строку с каждой строкой второй таблицы: получится 15 × 10 = 150 строк.</li>
<li><b>Перепутать порядок.</b> <code>WHERE</code> пишется после JOIN, а не до: <code>FROM → JOIN ... ON → WHERE → GROUP BY</code>.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите <code>id</code> каждого заказа, имя клиента и дату заказа.', hints: ['<code>JOIN customers c ON o.customer_id = c.id</code>'] },
        { prompt: 'Выведите названия и количество (<code>quantity</code>) товаров в заказе 105.', hints: ['Объедините <code>order_items</code> и <code>products</code>.', 'Фильтр: <code>WHERE oi.order_id = 105</code>'] },
        { prompt: 'Посчитайте выручку каждого заказа: <code>order_id</code> и сумму <code>quantity × price</code>.', hints: ['Посмотрите последний пример урока.'] }
      ]
    },
    'sql-11': {
      title: 'LEFT JOIN и несколько JOIN',
      body: `
<p>Представьте классный журнал: список учеников всегда полный, а у того, кто не пришёл на урок, оценка остаётся пустой. Из списка его никто не вычёркивает. <code>LEFT JOIN</code> работает именно так: сохраняет <b>все</b> строки левой таблицы. Если справа пары нет, её столбцы будут <code>NULL</code>. А INNER JOIN такого «не пришедшего ученика» из списка бы убрал.</p>
<h3>Пример: клиенты и их заказы</h3>
<p><code>customers</code>: 1 Айгерім, 2 Нұрлан, 8 Бауыржан. <code>orders</code>: 101 (клиент 1), 102 (клиент 2), 103 (клиент 1).</p>
<pre><code>SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;</code></pre>
<table>
<tr><th>name</th><th>order_id</th></tr>
<tr><td>Айгерім</td><td>101</td></tr>
<tr><td>Айгерім</td><td>103</td></tr>
<tr><td>Нұрлан</td><td>102</td></tr>
<tr><td>Бауыржан</td><td>NULL</td></tr>
</table>
<p>У Бауыржана нет заказов, но он остался в результате, а <code>order_id</code> пустой. С INNER JOIN этой строки не было бы вовсе.</p>
<p>Так отвечают на вопросы вроде «клиенты, которые ни разу не заказывали»: отбираем строки, где остался <code>NULL</code>, через <code>WHERE o.id IS NULL</code>. В примере выше останется только Бауыржан.</p>
<h3>Подсчёт после LEFT JOIN</h3>
<p>Если посчитать число заказов каждого клиента через GROUP BY, видна разница между двумя способами:</p>
<table>
<tr><th>name</th><th>COUNT(*)</th><th>COUNT(o.id)</th></tr>
<tr><td>Айгерім</td><td>2</td><td>2</td></tr>
<tr><td>Нұрлан</td><td>1</td><td>1</td></tr>
<tr><td>Бауыржан</td><td>1 (неверно)</td><td>0 (верно)</td></tr>
</table>
<p><code>COUNT(*)</code> считает и NULL-строку Бауыржана. <code>COUNT(o.id)</code> NULL не считает, поэтому даёт правильный 0. При группировке добавляйте и <code>c.id</code>: тогда два клиента с одинаковыми именами не сольются в одну группу.</p>
<h3>Виды JOIN</h3>
<table>
<tr><th>Вид</th><th>Что остаётся</th></tr>
<tr><td>INNER JOIN</td><td>только строки с парой в обеих таблицах</td></tr>
<tr><td>LEFT JOIN</td><td>всё из левой + совпадения из правой</td></tr>
<tr><td>RIGHT JOIN</td><td>всё из правой + совпадения из левой</td></tr>
<tr><td>FULL JOIN</td><td>всё из обеих</td></tr>
</table>
<h3>Несколько JOIN</h3>
<p>JOIN можно писать цепочкой: заказ → клиент, заказ → позиции → товар. Каждый новый JOIN своим условием <code>ON</code> цепляется к уже подключённой таблице:</p>
<pre><code>SELECT o.id, c.name, p.name AS product, oi.quantity
FROM orders o
JOIN customers c    ON c.id = o.customer_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id;</code></pre>
<table>
<tr><th>id</th><th>name</th><th>product</th><th>quantity</th></tr>
<tr><td>101</td><td>Айгерім</td><td>Ноутбук</td><td>1</td></tr>
<tr><td>101</td><td>Айгерім</td><td>Құлаққап</td><td>1</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>Кітап: SQL негіздері</td><td>2</td></tr>
<tr><td>102</td><td>Нұрлан</td><td>Блокнот</td><td>5</td></tr>
</table>
<p>Теперь в одной строке есть и город клиента, и цена товара, и статус заказа. Дальше, как обычно, пишите <code>WHERE</code>, <code>GROUP BY</code>, <code>ORDER BY</code> и фильтруйте, группируйте, сортируйте по любому столбцу.</p>
<div class="tip"><b>Частые ошибки:</b>
<ul>
<li>При подсчёте после LEFT JOIN пишите <code>COUNT(o.id)</code>, а не <code>COUNT(*)</code>. Иначе клиент без заказов посчитается как 1, а не 0.</li>
<li>Если после LEFT JOIN написать WHERE по правой таблице (например <code>WHERE o.status = 'delivered'</code>), NULL-строки исчезнут, и LEFT JOIN превратится в обычный INNER JOIN. Такое условие пишите внутри <code>ON ... AND o.status = 'delivered'</code>.</li>
<li>Если в цепочке JOIN условие <code>ON</code> ссылается на ещё не подключённую таблицу, будет ошибка. Подключайте таблицы в порядке связей.</li>
</ul></div>`,
      ex: [
        { prompt: 'Выведите имена клиентов, которые не сделали ни одного заказа.', hints: ['LEFT JOIN, затем <code>WHERE o.id IS NULL</code>.'] },
        { prompt: 'Выведите имя каждого клиента и число его заказов. У клиентов без заказов должен быть 0.', hints: ['Используйте <code>COUNT(o.id)</code>.', 'GROUP BY: <code>c.id, c.name</code>'] },
        { prompt: 'Только по заказам <code>delivered</code> выведите выручку каждого города (<code>city</code>, выручка) по убыванию выручки.', hints: ['Нужно три JOIN: customers, order_items, products.', "<code>WHERE o.status = 'delivered'</code>, <code>GROUP BY c.city</code>, <code>ORDER BY revenue DESC</code>"] }
      ]
    },
    'sql-12': {
      title: 'Subquery, EXISTS, ANY и ALL',
      body: `
<p>Вопрос «какие товары дороже среднего?» вы решаете в два шага: сначала считаете среднее и записываете на бумажке, потом сравниваете с этим числом. <b>Subquery</b> (подзапрос) — запрос внутри запроса. Он поручает посчитать это «число на бумажке» самому SQL. Подзапрос всегда в скобках, и SQL сначала выполняет внутренний запрос.</p>
<h3>Подзапрос, который возвращает одно значение</h3>
<p>Четыре товара: Құлаққап 25000, Рюкзак 15000, Термос 9000, Блокнот 1200.</p>
<pre><code>SELECT name, price FROM products
WHERE price &gt; (SELECT AVG(price) FROM products);</code></pre>
<p>Шаг 1: внутренний запрос даёт (25000 + 15000 + 9000 + 1200) / 4 = 12550. Шаг 2: запрос выполняется как <code>WHERE price &gt; 12550</code>:</p>
<table>
<tr><th>name</th><th>price</th></tr>
<tr><td>Құлаққап</td><td>25000</td></tr>
<tr><td>Рюкзак</td><td>15000</td></tr>
</table>
<p>Почему не вписать 12550 руками? Когда данные меняются, меняется и среднее, а подзапрос каждый раз считает заново.</p>
<h3>Подзапрос со списком + IN</h3>
<pre><code>SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'cancelled');</code></pre>
<p>Внутренний запрос возвращает клиентов с отменёнными заказами: <code>(3, 10)</code>. Внешний превращается в <code>WHERE id IN (3, 10)</code> и выводит Дану и Армана. WHERE во внутреннем запросе может быть любым: <code>=</code>, <code>BETWEEN</code>, <code>LIKE</code> по дате и т.д.</p>
<h3>EXISTS</h3>
<p><code>EXISTS</code> истинно, если внутренний запрос нашёл хотя бы одну строку. <code>NOT EXISTS</code> — наоборот:</p>
<pre><code>SELECT p.name FROM products p
WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id);</code></pre>
<p>Здесь внутренний запрос выполняется заново <b>для каждого товара</b>, потому что ссылается на внешний <code>p.id</code>. Для ноутбука (id 1) в <code>order_items</code> строка находится → EXISTS истинно → NOT EXISTS ложно, ноутбук не выводится. Настольной лампы (Үстел шамы, id 11) нет ни в одном заказе → она попадает в результат. <code>SELECT 1</code> значит «неважно, что вернуть, важно лишь, есть ли строка».</p>
<h3>ANY и ALL</h3>
<p>В базах вроде PostgreSQL <code>price &gt; ALL (SELECT ...)</code> значит «больше всех», а <code>price &gt; ANY (...)</code> — «больше хотя бы одного». Наш SQLite в браузере их не поддерживает, но есть запись с тем же смыслом: <code>&gt; ALL</code> = <code>&gt; (SELECT MAX(...))</code>, <code>&gt; ANY</code> = <code>&gt; (SELECT MIN(...))</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Сравнивать список через <code>&gt;</code> или <code>=</code>.</b> Если внутренний запрос возвращает список, нужен <code>IN</code>. SQLite в этом случае не выдаёт ошибку, а молча берёт первое значение — результат тихо получается неверным.</li>
<li><b>NOT IN и NULL.</b> Если во внутреннем списке есть хоть один <code>NULL</code>, <code>NOT IN</code> даёт пустой результат. В таких случаях надёжнее <code>NOT EXISTS</code>.</li>
<li><b>Несколько столбцов внутри IN.</b> <code>id IN (SELECT customer_id, order_date ...)</code> — ошибка: для IN подзапрос должен возвращать один столбец.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите название и цену товаров, которые дороже средней цены.', hints: ['Посчитайте среднее подзапросом: <code>(SELECT AVG(price) FROM products)</code>.'] },
        { prompt: 'Выведите имена клиентов, которые делали заказ в ноябре 2024 года. Используйте <code>IN</code> и подзапрос.', hints: ["Ноябрь: <code>order_date LIKE '2024-11%'</code>"] },
        { prompt: 'Найдите названия товаров, которые ни разу не продавались, с помощью <code>NOT EXISTS</code>.', hints: ['Посмотрите пример с EXISTS в уроке.'] }
      ]
    },
    'sql-13': {
      title: 'DDL и DML: создание и изменение таблиц',
      body: `
<p>До сих пор мы данные только читали. Команды SQL делятся на несколько групп:</p>
<table>
<tr><th>Группа</th><th>Команды</th><th>Для чего</th></tr>
<tr><td><b>DQL</b></td><td>SELECT</td><td>чтение данных</td></tr>
<tr><td><b>DDL</b></td><td>CREATE, ALTER, DROP, TRUNCATE</td><td>описание структуры таблиц</td></tr>
<tr><td><b>DML</b></td><td>INSERT, UPDATE, DELETE</td><td>изменение данных</td></tr>
<tr><td><b>TCL</b></td><td>BEGIN, COMMIT, ROLLBACK, SAVEPOINT</td><td>транзакции</td></tr>
<tr><td><b>DCL</b></td><td>GRANT, REVOKE</td><td>права доступа</td></tr>
</table>
<h3>CREATE TABLE и ограничения (constraints)</h3>
<pre><code>CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  hours INTEGER CHECK (hours &gt; 0),
  level TEXT DEFAULT 'beginner'
);</code></pre>
<p><code>PRIMARY KEY</code> — уникальный идентификатор строки. <code>FOREIGN KEY</code> (<code>REFERENCES</code>) — ссылка на другую таблицу. <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code> защищают качество данных.</p>
<h3>INSERT, UPDATE, DELETE</h3>
<pre><code>INSERT INTO courses (id, title, hours) VALUES (1, 'SQL', 40);
UPDATE products SET price = price * 1.1 WHERE category = 'Кітаптар';
DELETE FROM orders WHERE status = 'cancelled';
ALTER TABLE customers ADD COLUMN phone TEXT;</code></pre>
<div class="tip">Если написать UPDATE или DELETE <b>без WHERE</b>, изменится вся таблица. На работе сначала сделайте SELECT с тем же WHERE и проверьте, какие строки изменятся.</div>
<h3>Безопасность при изменении данных</h3>
<ol>
<li>Перед изменением выполните <code>SELECT COUNT(*)</code> с тем же <code>WHERE</code>: узнайте, сколько строк изменится.</li>
<li>Оборачивайте команды в транзакцию и делайте <code>COMMIT</code> только после проверки результата (следующий урок).</li>
<li>Не меняйте данные напрямую в рабочей базе (production): аналитику обычно дают права только на чтение.</li>
</ol>
<h3>Разница между DROP, DELETE и TRUNCATE</h3>
<table>
<tr><th>Команда</th><th>Что делает</th></tr>
<tr><td><code>DELETE FROM t WHERE ...</code></td><td>Удаляет строки, подходящие под условие; таблица остаётся</td></tr>
<tr><td><code>DELETE FROM t</code> / <code>TRUNCATE t</code></td><td>Удаляет все строки, структура остаётся (в SQLite нет TRUNCATE)</td></tr>
<tr><td><code>DROP TABLE t</code></td><td>Полностью удаляет таблицу вместе со структурой</td></tr>
</table>
<div class="tip">Несколько строк можно добавить одним INSERT: <code>INSERT INTO t (a, b) VALUES (1, 'x'), (2, 'y');</code>. Это быстрее, чем писать отдельную команду для каждой строки.</div>`,
      ex: [
        { prompt: 'Создайте таблицу <code>courses</code>: <code>id</code> INTEGER PRIMARY KEY, <code>title</code> TEXT NOT NULL, <code>hours</code> INTEGER. Затем добавьте две строки: (1, \'SQL\', 40) и (2, \'Python\', 50).', hints: ['Несколько строк можно добавить одним INSERT: <code>VALUES (...), (...)</code>.'] },
        { prompt: 'Повысьте на 10% цены товаров категории «Кітаптар» (книги).', hints: ["<code>UPDATE products SET price = price * 1.1 WHERE ...</code>"] },
        { prompt: 'Удалите заказы со статусом <code>cancelled</code>.', hints: ["<code>DELETE FROM orders WHERE status = 'cancelled';</code>"] },
        { prompt: 'Добавьте в таблицу <code>customers</code> столбец <code>phone</code> типа TEXT.', hints: ['<code>ALTER TABLE ... ADD COLUMN ...</code>'] }
      ]
    },
    'sql-14': {
      title: 'Транзакции, VIEW и права доступа',
      body: `
<h3>Транзакция (TCL)</h3>
<p>Транзакция — группа команд, которые должны выполниться вместе. Например, при переводе деньги должны списаться с одного счёта и зачислиться на другой: если выполнится только одно, деньги пропадут.</p>
<pre><code>BEGIN;
UPDATE accounts SET balance = balance - 5000 WHERE id = 1;
UPDATE accounts SET balance = balance + 5000 WHERE id = 2;
COMMIT;      -- зафиксировать изменения</code></pre>
<p><code>ROLLBACK</code> отменяет изменения с начала транзакции. <code>SAVEPOINT name</code> — промежуточная отметка, к ней можно вернуться через <code>ROLLBACK TO name</code>.</p>
<h3>VIEW</h3>
<p><code>VIEW</code> (представление) — сохранённый запрос. Его читают как таблицу, но данных он не хранит:</p>
<pre><code>CREATE VIEW big_orders AS
SELECT * FROM order_items WHERE quantity &gt;= 3;

SELECT * FROM big_orders;</code></pre>
<h3>Права доступа (DCL)</h3>
<p>В серверных базах (PostgreSQL, MySQL) кто что может делать, управляют <code>GRANT</code> и <code>REVOKE</code>:</p>
<pre><code>GRANT SELECT ON orders TO analyst;
REVOKE DELETE ON orders FROM analyst;</code></pre>
<p>SQLite — файловая база, поэтому этих команд в ней нет. Аналитику обычно дают только право <code>SELECT</code>.</p>
<h3>ACID: четыре гарантии транзакции</h3>
<ul>
<li><b>Atomicity</b> (атомарность): команды транзакции выполняются либо все, либо ни одна.</li>
<li><b>Consistency</b> (согласованность): после транзакции данные соответствуют всем ограничениям (constraints).</li>
<li><b>Isolation</b> (изолированность): параллельные транзакции не мешают друг другу.</li>
<li><b>Durability</b> (долговечность): изменение после COMMIT сохраняется, даже если сервер выключится.</li>
</ul>
<h3>Когда полезен VIEW?</h3>
<p>Если коллеги часто используют один сложный запрос (несколько JOIN, фильтры), сохраните его как VIEW. Тогда все пользуются одной логикой, а если правило нужно изменить, вы пересоздаёте только VIEW. Например, если записать определение «активного клиента» в один VIEW, оно будет одинаковым в каждом отчёте.</p>
<p>Удаление VIEW: <code>DROP VIEW big_orders;</code>. Это не затрагивает таблицу, на которой он построен.</p>
<div class="tip">VIEW заново выполняет запрос при каждом чтении. Для тяжёлых вычислений в некоторых базах есть <b>materialized view</b> (материализованное представление): оно хранит результат и читается быстро, как таблица, но его нужно периодически обновлять.</div>`,
      ex: [
        { prompt: 'Создайте VIEW с именем <code>delivered_orders</code>: только строки таблицы <code>orders</code> со статусом <code>delivered</code> (все столбцы).', hints: ['<code>CREATE VIEW delivered_orders AS SELECT ...</code>'] },
        { prompt: 'Начните транзакцию, обнулите цены всех товаров, затем сделайте <b>ROLLBACK</b> и выведите сумму цен. Сумма должна остаться прежней.', hints: ['После UPDATE напишите <code>ROLLBACK;</code>.'] },
        { prompt: 'Аналитику нужно дать право только на чтение таблицы <code>sales</code>. Какая команда?', options: ['REVOKE SELECT ON sales FROM analyst;', 'GRANT SELECT ON sales TO analyst;', 'GRANT ALL ON sales TO analyst;', 'COMMIT sales;'], explain: 'GRANT SELECT даёт только право на чтение. GRANT ALL — слишком много прав.' }
      ]
    },
    'sql-15': {
      title: 'UNION, UNION ALL и множества',
      body: `
<p><code>JOIN</code> соединяет таблицы <b>по горизонтали</b>: к строке добавляются новые столбцы. Но иногда два результата нужно соединить <b>по вертикали</b>: поставить один список под другим. Например, собрать клиентов августа и ноября в один список или добавить в конец таблицы строку «Итого». Для этого есть операторы над множествами.</p>
<table>
<tr><th>Оператор</th><th>Что возвращает</th><th>Дубликаты</th></tr>
<tr><td><code>UNION</code></td><td>объединение двух результатов</td><td>удаляются</td></tr>
<tr><td><code>UNION ALL</code></td><td>объединение двух результатов</td><td>остаются</td></tr>
<tr><td><code>INTERSECT</code></td><td>строки, которые есть в обоих</td><td>удаляются</td></tr>
<tr><td><code>EXCEPT</code></td><td>строки, которые есть в первом, но не во втором</td><td>удаляются</td></tr>
</table>
<h3>Пример: UNION и UNION ALL</h3>
<p>Клиенты, сделавшие заказ в августе: 1, 2, 1 (Айгерім дважды). В октябре: 2, 9, 5, 1.</p>
<pre><code>SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%'
UNION
SELECT customer_id FROM orders WHERE order_date LIKE '2024-10%';</code></pre>
<p>Результат — 4 строки: <code>1, 2, 5, 9</code>. <code>UNION</code> убрал дубликаты: и между двумя списками, и внутри одного списка. Если написать тот же запрос с <code>UNION ALL</code>, получится 7 строк: <code>1, 2, 1, 2, 9, 5, 1</code>. Ничего не удаляется, строки просто ставятся друг под другом.</p>
<div class="tip">Если вы знаете, что дубликатов не будет, или они нужны, пишите <code>UNION ALL</code>. Чтобы найти дубликаты, <code>UNION</code> сравнивает весь результат, поэтому на большой таблице он медленный. В отчёте, где складывается выручка, <code>UNION</code> опасен: два разных заказа с одинаковой суммой превратятся в одну строку, и выручка уменьшится.</div>
<h3>Правило: столбцы должны соответствовать</h3>
<ul>
<li>В обоих SELECT должно быть <b>одинаковое число</b> столбцов.</li>
<li>Типы соответствующих столбцов должны быть <b>совместимы</b>: число под числом, текст под текстом. SQLite это не проверяет, а PostgreSQL выдаёт ошибку.</li>
<li>Названия столбцов берутся из <b>первого</b> SELECT.</li>
<li><code>ORDER BY</code> пишется один раз в самом конце и применяется ко всему объединённому результату.</li>
</ul>
<h3>Пример: строка «Итого»</h3>
<pre><code>SELECT status, COUNT(*) AS orders FROM orders GROUP BY status
UNION ALL
SELECT 'Барлығы', COUNT(*) FROM orders;   -- 'Барлығы' = «всего»</code></pre>
<table>
<tr><th>status</th><th>orders</th></tr>
<tr><td>cancelled</td><td>2</td></tr>
<tr><td>delivered</td><td>10</td></tr>
<tr><td>shipped</td><td>3</td></tr>
<tr><td>Барлығы</td><td>15</td></tr>
</table>
<p>Во втором SELECT <code>'Барлығы'</code> — обычный текст (константа). Он попадает под столбец <code>status</code>.</p>
<h3>INTERSECT и EXCEPT</h3>
<pre><code>-- заказывали и в августе, и в октябре
SELECT customer_id FROM orders WHERE order_date LIKE '2024-08%'
INTERSECT
SELECT customer_id FROM orders WHERE order_date LIKE '2024-10%';   -- 1, 2

-- клиенты, которые ни разу не заказывали
SELECT id FROM customers
EXCEPT
SELECT customer_id FROM orders;                                     -- 8</code></pre>
<p>В <code>EXCEPT</code> порядок важен: «есть в A, нет в B». Если поменять их местами, получится совсем другой вопрос. <code>EXCEPT</code> и <code>NOT EXISTS</code> могут отвечать на один и тот же вопрос; разница в том, что <code>EXCEPT</code> сравнивает строки целиком и удаляет дубликаты.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Разное число столбцов:</b> <code>SELECT id, name ... UNION SELECT id ...</code> выдаст ошибку.</li>
<li><b>Перепутан порядок столбцов:</b> <code>SELECT name, city ... UNION SELECT city, name ...</code> ошибку не выдаст, но города и имена перемешаются в одном столбце. SQL сопоставляет столбцы не по названию, а <b>по позиции</b>.</li>
<li><b>UNION вместо UNION ALL:</b> нужные дубликаты молча удаляются, числа уменьшаются.</li>
<li><b>Отдельный ORDER BY у каждого SELECT:</b> сортировка пишется только в конце.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите без повторов список <code>customer_id</code> клиентов, которые делали заказ в августе (<code>2024-08</code>) <b>или</b> в ноябре (<code>2024-11</code>). Объедините два SELECT через <code>UNION</code>.', hints: ['Второй SELECT точно такой же, только месяц другой.', "<code>... LIKE '2024-08%' UNION SELECT customer_id FROM orders WHERE order_date LIKE '2024-11%'</code>"] },
        { prompt: 'Выведите число товаров в каждой категории (<code>category</code>), а в конец через <code>UNION ALL</code> добавьте строку <code>Барлығы</code> («всего»): в ней должно быть число всех товаров. Два столбца: категория и число.', hints: ["Во втором SELECT вместо категории напишите текст: <code>SELECT 'Барлығы', COUNT(*) FROM products</code>.", 'В обоих SELECT должно быть по два столбца.'] },
        { prompt: 'С помощью <code>EXCEPT</code> найдите <code>id</code> клиентов, у которых <b>нет</b> ни одного заказа со статусом <code>delivered</code>.', hints: ['Первое множество — <code>id</code> всех клиентов.', "Второе множество — <code>customer_id</code> заказов <code>delivered</code>. Поставьте между ними <code>EXCEPT</code>."] },
        { prompt: 'С помощью <code>INTERSECT</code> найдите <code>customer_id</code> клиентов, которые делали заказ и в августе (<code>2024-08</code>), и в октябре (<code>2024-10</code>).', hints: ['Посмотрите пример с INTERSECT в уроке.'] },
        { prompt: 'Вы собираетесь объединить таблицы продаж двух филиалов и посчитать общую выручку. Какой оператор вы выберете и почему?', options: ['UNION: он удаляет дубликаты, поэтому результат чистый', 'UNION ALL: сохраняются все строки; UNION превратил бы две разные продажи с одинаковыми суммой и датой в одну строку и занизил бы выручку', 'INTERSECT: он даёт строки, которые есть в обеих таблицах', 'EXCEPT: он убирает лишние строки'], explain: 'Когда строки складывают, а потом считают агрегат, всегда нужен UNION ALL. UNION используют только тогда, когда нужен «список без повторов».' }
      ]
    },
    'sql-16': {
      title: 'Функции для дат и текста',
      body: `
<p>Большинство реальных отчётов привязано ко времени: месячная выручка, число дней от регистрации до первого заказа. А реальные данные часто грязные: лишние пробелы, разный регистр, числа, сохранённые как текст. В этом уроке вы изучите функции, которые нужны в обоих случаях.</p>
<div class="tip">Функции для дат и текста в разных базах данных называются по-разному. Здесь вы пишете вариант для <b>SQLite</b> в браузере, а в конце урока есть таблица аналогов в <b>PostgreSQL</b>: на работе чаще встречаются именно они.</div>
<h3>Части даты: strftime</h3>
<p>В наших таблицах дата — это текст вида <code>'2024-08-19'</code> (формат ISO: год-месяц-день). <code>strftime(формат, дата)</code> берёт из неё нужную часть:</p>
<table>
<tr><th>Выражение</th><th>Результат</th><th>Значение</th></tr>
<tr><td><code>strftime('%Y', '2024-08-19')</code></td><td>2024</td><td>год</td></tr>
<tr><td><code>strftime('%m', '2024-08-19')</code></td><td>08</td><td>месяц</td></tr>
<tr><td><code>strftime('%d', '2024-08-19')</code></td><td>19</td><td>день</td></tr>
<tr><td><code>strftime('%Y-%m', '2024-08-19')</code></td><td>2024-08</td><td>ключ месяца</td></tr>
<tr><td><code>strftime('%w', '2024-08-19')</code></td><td>1</td><td>день недели (0 — воскресенье)</td></tr>
</table>
<p>Результат — текст. Если нужно число, преобразуйте: <code>CAST(strftime('%m', order_date) AS INTEGER)</code> → 8.</p>
<h3>«Обрезка» до месяца</h3>
<p>Для месячного отчёта каждую дату приводим к её месяцу. Есть два способа:</p>
<pre><code>SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;</code></pre>
<table>
<tr><th>month</th><th>orders</th></tr>
<tr><td>2024-08</td><td>3</td></tr>
<tr><td>2024-09</td><td>4</td></tr>
<tr><td>2024-10</td><td>4</td></tr>
<tr><td>…</td><td>…</td></tr>
</table>
<p>Второй способ — первый день месяца: <code>date(order_date, 'start of month')</code> → <code>2024-08-01</code>. Это называют «month truncation». Не забывайте про год: если группировать только по <code>'%m'</code>, август разных лет попадёт в одну группу.</p>
<h3>Сдвиг дат и разница</h3>
<pre><code>date('2024-08-19', '+7 days')         -- 2024-08-26
date('2024-08-19', '-1 month')        -- 2024-07-19
date('now')                           -- сегодняшняя дата

julianday('2024-08-19') - julianday('2024-08-02')   -- 17.0</code></pre>
<p><code>julianday</code> превращает дату в одно число, поэтому одну дату можно вычесть из другой. Разница — это число дней. Если вычитать даты прямо в виде текста (<code>'2024-08-19' - '2024-08-02'</code>), SQLite вычтет только годы и вернёт 0.</p>
<pre><code>SELECT o.id,
       CAST(julianday(o.order_date) - julianday(c.signup_date) AS INTEGER) AS days
FROM orders o
JOIN customers c ON c.id = o.customer_id;</code></pre>
<p>Заказ 101: Айгерім зарегистрировалась 2024-01-15 и сделала заказ 2024-08-02 → 200 дней.</p>
<h3>Текстовые функции</h3>
<table>
<tr><th>Функция</th><th>Пример</th><th>Результат</th></tr>
<tr><td><code>LENGTH</code></td><td><code>LENGTH('Алматы')</code></td><td>6</td></tr>
<tr><td><code>SUBSTR(текст, начало, длина)</code></td><td><code>SUBSTR('2024-08-19', 1, 7)</code></td><td>2024-08</td></tr>
<tr><td><code>REPLACE</code></td><td><code>REPLACE('12 500', ' ', '')</code></td><td>12500</td></tr>
<tr><td><code>TRIM</code></td><td><code>TRIM('  Айгерім ')</code></td><td>Айгерім</td></tr>
<tr><td><code>UPPER</code>, <code>LOWER</code></td><td><code>LOWER('NURLAN@mail.kz')</code></td><td>nurlan@mail.kz</td></tr>
<tr><td><code>||</code></td><td><code>name || ' (' || city || ')'</code></td><td>Айгерім (Алматы)</td></tr>
</table>
<p>В <code>SUBSTR</code> счёт начинается <b>с 1</b> (а не с 0, как в Python). Если дата записана в формате ISO, <code>SUBSTR(order_date, 1, 7)</code> тоже даёт ключ месяца.</p>
<div class="tip">В SQLite <code>UPPER</code> и <code>LOWER</code> меняют только латинские буквы: <code>LOWER('АЛМАТЫ')</code> останется без изменений. Для email этого достаточно. PostgreSQL правильно меняет и кириллицу.</div>
<h3>Преобразование типа: CAST</h3>
<p>В базе «Грязные данные» сумма сохранена как текст: <code>'12 500'</code>, <code>'8000'</code>. Текст нельзя складывать и сравнивать. Сначала убираем пробел, потом превращаем в число:</p>
<pre><code>SELECT id, CAST(REPLACE(amount, ' ', '') AS INTEGER) AS amount_num
FROM raw_orders;</code></pre>
<p><code>CAST(значение AS тип)</code>: <code>INTEGER</code> — целое число, <code>REAL</code> — дробное число, <code>TEXT</code> — текст. Осторожно: текст, который не превращается в число (<code>'abc'</code>), SQLite без ошибки превращает в <b>0</b>. PostgreSQL в таком случае выдаёт ошибку.</p>
<p>CAST нужен и при делении целых чисел: <code>7 / 2</code> = 3, а <code>CAST(7 AS REAL) / 2</code> или <code>7 * 1.0 / 2</code> = 3.5.</p>
<h3>Работа с NULL: COALESCE и NULLIF</h3>
<ul>
<li><code>COALESCE(a, b, c)</code> возвращает первое значение, не равное NULL: <code>COALESCE(city, 'белгісіз')</code>.</li>
<li><code>NULLIF(a, b)</code> — NULL, если <code>a = b</code>, иначе <code>a</code>. Чаще всего так защищаются от деления на ноль: <code>revenue / NULLIF(orders, 0)</code>. Если заказов 0, делитель становится NULL, и результат — не ошибка, а NULL.</li>
<li>Превратить пустой текст в NULL: <code>NULLIF(TRIM(phone), '')</code>.</li>
</ul>
<h3>Аналоги в PostgreSQL</h3>
<table>
<tr><th>Что нужно</th><th>SQLite</th><th>PostgreSQL</th></tr>
<tr><td>Обрезать до начала месяца</td><td><code>date(d, 'start of month')</code></td><td><code>DATE_TRUNC('month', d)</code></td></tr>
<tr><td>Ключ месяца как текст</td><td><code>strftime('%Y-%m', d)</code></td><td><code>TO_CHAR(d, 'YYYY-MM')</code></td></tr>
<tr><td>Номер месяца</td><td><code>CAST(strftime('%m', d) AS INTEGER)</code></td><td><code>EXTRACT(MONTH FROM d)</code></td></tr>
<tr><td>Прибавить 7 дней</td><td><code>date(d, '+7 days')</code></td><td><code>d + INTERVAL '7 days'</code></td></tr>
<tr><td>Разница двух дат</td><td><code>julianday(d2) - julianday(d1)</code></td><td><code>d2 - d1</code> (если обе имеют тип <code>date</code>)</td></tr>
<tr><td>Сегодня</td><td><code>date('now')</code></td><td><code>CURRENT_DATE</code></td></tr>
<tr><td>Преобразовать тип</td><td><code>CAST(x AS INTEGER)</code></td><td><code>CAST(x AS INTEGER)</code> или <code>x::int</code></td></tr>
</table>
<p><code>SUBSTR</code>, <code>LENGTH</code>, <code>REPLACE</code>, <code>TRIM</code>, <code>UPPER</code>, <code>LOWER</code>, <code>COALESCE</code>, <code>NULLIF</code> в обеих базах пишутся одинаково.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Группировка по месяцу без года.</b> <code>GROUP BY strftime('%m', order_date)</code> смешивает разные годы. Пишите <code>'%Y-%m'</code>.</li>
<li><b>Вычитание дат в виде текста.</b> Для разницы нужен <code>julianday</code>.</li>
<li><b>Формат не ISO.</b> Дату вида <code>'15.02.2024'</code> функция <code>strftime</code> не понимает (возвращает NULL), а при сортировке она попадает не на своё место. Сначала её нужно привести к виду <code>ГГГГ-ММ-ДД</code> с помощью <code>SUBSTR</code>.</li>
<li><b>Не проверять CAST.</b> <code>'abc'</code> молча превращается в 0. После преобразования просмотрите значения 0 и NULL.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите число заказов за каждый месяц: ключ месяца (<code>YYYY-MM</code>, через <code>strftime</code>) и число. Месяцы по возрастанию.', hints: ["Формат: <code>'%Y-%m'</code>.", 'Добавьте <code>GROUP BY month ORDER BY month</code>.'] },
        { prompt: 'Для каждого заказа посчитайте, сколько дней прошло от регистрации клиента (<code>signup_date</code>) до заказа (<code>order_date</code>). Два столбца: <code>id</code> заказа и число дней.', hints: ['Разница: <code>julianday(o.order_date) - julianday(c.signup_date)</code>.', 'Чтобы получить целое число, оберните её в <code>CAST(... AS INTEGER)</code>.'] },
        { prompt: 'Очистите таблицу <code>raw_customers</code>. Выведите три столбца: <code>id</code>, <code>name</code> без пробелов по краям и <code>email</code>, приведённый к нижнему регистру.', hints: ['<code>TRIM(name)</code> и <code>LOWER(email)</code>.'] },
        { prompt: 'В таблице <code>raw_orders</code> столбец <code>amount</code> — текст (<code>\'12 500\'</code>). Выведите два столбца: <code>id</code> и сумму без пробелов, преобразованную в целое число.', hints: ["Сначала уберите пробел: <code>REPLACE(amount, ' ', '')</code>.", 'Потом: <code>CAST(... AS INTEGER)</code>.'] },
        { prompt: 'На работе используется PostgreSQL. Дату каждого заказа нужно привести к первому дню месяца (в SQLite это <code>date(order_date, \'start of month\')</code>). Как вы это запишете?', options: ["DATE_TRUNC('month', order_date)", "strftime('%Y-%m', order_date)", 'EXTRACT(MONTH FROM order_date)', "order_date + INTERVAL '1 month'"], explain: "DATE_TRUNC('month', ...) обрезает дату до начала месяца. EXTRACT даёт только номер месяца (без года), INTERVAL сдвигает дату, а strftime в PostgreSQL нет." }
      ]
    },
    'sql-17': {
      title: 'Self join, ловушка fan-out и порядок выполнения',
      body: `
<p>JOIN вы уже знаете. В этом уроке разберём три важные его стороны: соединение таблицы с самой собой, молчаливое размножение чисел после JOIN и то, в каком порядке запрос выполняется на самом деле. Но сначала разберёмся, почему таблицы хранятся отдельно.</p>
<h3>Ключи и нормализация</h3>
<ul>
<li><b>Primary key (PK)</b> — столбец, который однозначно определяет строку: <code>customers.id</code>. Он не повторяется и не бывает пустым.</li>
<li><b>Foreign key (FK)</b> — столбец, который ссылается на PK другой таблицы: <code>orders.customer_id</code> → <code>customers.id</code>.</li>
</ul>
<table>
<tr><th>Связь</th><th>Смысл</th><th>Пример</th></tr>
<tr><td><b>1:N</b> (один ко многим)</td><td>у одного клиента много заказов, у каждого заказа один клиент</td><td><code>customers</code> → <code>orders</code></td></tr>
<tr><td><b>M:N</b> (многие ко многим)</td><td>в одном заказе много товаров, один товар во многих заказах</td><td><code>orders</code> ↔ <code>products</code>, между ними <code>order_items</code></td></tr>
</table>
<p>Связь M:N напрямую не хранится: между таблицами ставят <b>связующую таблицу</b>. <code>order_items</code> именно такая: в ней два FK (<code>order_id</code>, <code>product_id</code>).</p>
<p>Почему не записать всё в одну большую таблицу? Тогда город клиента повторялся бы в каждом его заказе. Если клиент переедет, придётся менять все строки, а забудете одну — данные начнут противоречить друг другу. Хранить каждый факт <b>в одном месте</b> и связывать таблицы ключами — это и есть <b>нормализация</b>. Её цена — JOIN, который приходится писать при анализе.</p>
<h3>Self join: соединение таблицы с самой собой</h3>
<p>В таблице <code>employees</code> столбец <code>manager_id</code> ссылается на <code>id</code> в этой же таблице: руководитель — тоже сотрудник.</p>
<table>
<tr><th>id</th><th>name</th><th>manager_id</th></tr>
<tr><td>1</td><td>Серік</td><td>NULL</td></tr>
<tr><td>2</td><td>Гүлнар</td><td>1</td></tr>
<tr><td>3</td><td>Ақжол</td><td>2</td></tr>
</table>
<p>Чтобы вывести рядом с сотрудником имя его руководителя, соединяем таблицу с самой собой. Одной таблице даём два разных alias: <code>e</code> — сотрудник, <code>m</code> — руководитель.</p>
<pre><code>SELECT e.name, m.name AS manager
FROM employees e
JOIN employees m ON m.id = e.manager_id;</code></pre>
<table>
<tr><th>name</th><th>manager</th></tr>
<tr><td>Гүлнар</td><td>Серік</td></tr>
<tr><td>Ақжол</td><td>Гүлнар</td></tr>
</table>
<p>Серік в результат не попал: его <code>manager_id</code> равен NULL, подходящая строка не нашлась. Чтобы оставить и его, напишите <code>LEFT JOIN</code>: тогда его столбец <code>manager</code> будет NULL.</p>
<h3>CROSS JOIN</h3>
<p><code>CROSS JOIN</code> соединяет без условия: каждая строка первой таблицы образует пару с каждой строкой второй. 3 города × 4 месяца = 12 строк. Он нужен, чтобы построить «каркас» отчёта: вы составляете список всех городов и месяцев, а потом присоединяете к нему фактические продажи через LEFT JOIN. Тогда видны и месяцы без продаж (с нулём).</p>
<pre><code>SELECT c.city, m.month
FROM (SELECT DISTINCT city FROM customers) c
CROSS JOIN (SELECT DISTINCT strftime('%Y-%m', order_date) AS month FROM orders) m;</code></pre>
<p>Здесь внутри <code>FROM</code> стоит запрос в скобках. Его называют <b>производной таблицей</b> (derived table): база данных сначала выполняет внутренний запрос и использует его результат как временную таблицу. Alias для неё обязателен.</p>
<h3>Fan-out: JOIN размножает строки</h3>
<p>При JOIN по связи 1:N строка со стороны «один» повторяется для каждого совпадения на стороне «много». Это называют <b>fan-out</b>. У Айгерім (id 1) три заказа: 101, 103, 111. В заказе 101 два товара.</p>
<pre><code>SELECT c.name, COUNT(*) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
WHERE c.id = 1;          -- получится 4, а заказов 3</code></pre>
<p>После присоединения <code>order_items</code> одна строка — уже не заказ, а товар в заказе. <code>COUNT(*)</code> посчитал строки товаров. Сообщения об ошибке нет, число просто больше. Это самая дорогая ошибка аналитика.</p>
<h3>Соединение сразу двух таблиц «много»</h3>
<p>В базе «Продуктовые метрики» от <code>users</code> идут две связи 1:N: <code>activity</code> (активные месяцы) и <code>payments</code> (платежи). У пользователя 1 есть 3 активных месяца и 3 платежа по 5 000.</p>
<pre><code>SELECT u.id, COUNT(a.month) AS months, SUM(p.amount) AS total
FROM users u
JOIN activity a ON a.user_id = u.id
JOIN payments p ON p.user_id = u.id
GROUP BY u.id;           -- пользователь 1: months = 9, total = 45000</code></pre>
<p>Каждая строка активности образовала пару с каждой строкой платежа: 3 × 3 = 9 строк. Правильный ответ — 3 месяца и 15 000.</p>
<h3>Решение: сначала агрегат, потом JOIN</h3>
<p>Каждую таблицу «много» отдельно сворачиваем в производной таблице так, чтобы получилась <b>одна строка на пользователя</b>, и только потом соединяем:</p>
<pre><code>SELECT u.id, a.months, p.total
FROM users u
JOIN (SELECT user_id, COUNT(*) AS months
      FROM activity GROUP BY user_id) a ON a.user_id = u.id
JOIN (SELECT user_id, SUM(amount) AS total
      FROM payments GROUP BY user_id) p ON p.user_id = u.id;</code></pre>
<p>Теперь JOIN стал 1:1, ничего не размножается. Если нужно только посчитать количество, поможет и <code>COUNT(DISTINCT o.id)</code>, но для <code>SUM</code> <code>DISTINCT</code> не годится: два платежа с одинаковой суммой будут сложены только один раз.</p>
<div class="tip">После каждого JOIN спрашивайте себя: «одна строка сейчас — это что?». Если сомневаетесь, сравните <code>COUNT(*)</code> до и после JOIN. Если число строк выросло, есть fan-out.</div>
<h3>Порядок выполнения</h3>
<p>Запрос вы пишете начиная с <code>SELECT</code>, но база данных выполняет его в другом порядке:</p>
<pre><code>FROM / JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT</code></pre>
<table>
<tr><th>Следствие</th><th>Причина</th></tr>
<tr><td>В <code>WHERE</code> нельзя писать агрегат</td><td>Когда выполняется WHERE, групп ещё нет</td></tr>
<tr><td>alias из <code>SELECT</code> нельзя использовать в <code>WHERE</code></td><td>WHERE выполняется раньше SELECT, alias ещё не создан</td></tr>
<tr><td>alias можно использовать в <code>ORDER BY</code></td><td>ORDER BY выполняется после SELECT</td></tr>
<tr><td>fan-out портит агрегат</td><td>JOIN выполняется самым первым: GROUP BY видит уже размноженные строки</td></tr>
</table>
<p>Примечание: SQLite принимает alias и в <code>WHERE</code>, и в <code>GROUP BY</code> (как <code>GROUP BY month</code> в этом курсе). PostgreSQL на alias в <code>WHERE</code> и <code>HAVING</code> выдаёт ошибку: там выражение нужно написать заново.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Забыть alias в self join.</b> Одна таблица стоит дважды, поэтому перед каждым столбцом обязательно писать <code>e.</code> или <code>m.</code>.</li>
<li><b>Перепутать направление в ON.</b> <code>m.id = e.manager_id</code> значит «m — руководитель e». Если написать наоборот, вместо руководителя получатся подчинённые.</li>
<li><b>Доверять <code>COUNT(*)</code> после JOIN.</b> Сначала определите, что такое одна строка.</li>
<li><b>Соединить две таблицы 1:N в одном запросе и взять агрегаты из обеих.</b> Сначала сверните каждую отдельно.</li>
</ul>`,
      ex: [
        { prompt: 'Выведите имя каждого сотрудника и имя его руководителя. Серік, у которого нет руководителя, тоже должен остаться в списке (его руководитель — <code>NULL</code>). Всего 12 строк.', hints: ['Соедините таблицу с самой собой: <code>LEFT JOIN employees m ON m.id = e.manager_id</code>.', 'Если написать просто <code>JOIN</code>, Серік выпадет: получится 11 строк.'] },
        { prompt: 'Сколько сотрудников в подчинении у каждого руководителя? Два столбца: имя руководителя и число сотрудников. Те, у кого нет подчинённых, не нужны.', hints: ['Напишите self join из предыдущего задания через <code>JOIN</code>.', 'Сгруппируйте по руководителю: <code>GROUP BY m.id, m.name</code>.'] },
        { prompt: 'Этот запрос из-за fan-out выдаёт неверные числа (у пользователя 1 получается 9 месяцев и 45 000). Исправьте его: сначала сверните <code>activity</code> и <code>payments</code> в отдельных производных таблицах, а потом соедините. Три столбца: <code>id</code>, число активных месяцев, сумма платежей.', hints: ['<code>JOIN (SELECT user_id, COUNT(*) AS months FROM activity GROUP BY user_id) a ON a.user_id = u.id</code>', 'Для <code>payments</code> напишите точно такую же производную таблицу: <code>SUM(amount) AS total</code>. Во внешнем запросе GROUP BY не нужен.'] },
        { prompt: 'Почему в PostgreSQL запрос <code>SELECT price * 1.12 AS with_vat FROM products WHERE with_vat &gt; 10000</code> выдаёт ошибку?', options: ['AS написан неправильно', 'WHERE выполняется раньше SELECT, поэтому alias with_vat ещё не существует', 'В WHERE нельзя умножать', '1.12 — не целое число'], explain: 'Порядок выполнения: FROM → WHERE → ... → SELECT. В условии выражение нужно написать заново: WHERE price * 1.12 > 10000.' },
        { prompt: 'Один студент записывается на много курсов, на одном курсе учится много студентов. Как правильно хранить это в базе данных?', options: ['Добавить в таблицу students столбцы course1, course2, course3', 'Три таблицы: students, courses и связующая таблица (enrollments), которая хранит id обоих', 'Записывать в таблицу courses имена студентов через запятую', 'Записать всё в одну таблицу и повторять данные студента для каждого курса'], explain: 'Это связь M:N. Её всегда хранят через связующую таблицу с двумя foreign key, как наша order_items.' }
      ]
    },
    'sql-gate': {
      title: 'Экзамен модуля: SQL Core',
      body: `
<p>Это итоговая проверка модуля. Задания вперемешку из всех уроков, пошаговых подсказок (hint) нет. Выполните все — модуль будет пройден, и вы приблизитесь к уровню <b>L2 SQL Practitioner</b>.</p>
<p>База та же: <code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>.</p>
<div class="tip">Не торопитесь: сначала посмотрите промежуточный результат через «Запустить», потом проверяйте.</div>`,
      ex: [
        { prompt: 'Только по заказам <code>delivered</code> выведите имена 3 клиентов, потративших больше всех, и их общую сумму, по убыванию.' },
        { prompt: 'Для каждого месяца (в формате <code>YYYY-MM</code>) выведите число уникальных клиентов, сделавших заказ, по возрастанию месяцев.' },
        { prompt: 'Выведите названия товаров, которых всего продано не меньше 3 штук, и общее проданное количество.' },
        { prompt: 'Попадут ли клиенты без заказов в результат запроса <code>customers c LEFT JOIN orders o ... WHERE o.status = \'delivered\'</code>?', options: ['Да, со значением NULL', 'Нет: условие WHERE убирает NULL-строки, поэтому запрос работает как INNER JOIN', 'Только один раз', 'Будет ошибка'], explain: 'NULL = \'delivered\' не истинно. Только если перенести условие в ON, LEFT JOIN сохранит всех клиентов.' }
      ]
    }
  }
});
