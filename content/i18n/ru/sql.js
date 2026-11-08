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
<p>Полный порядок: <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li><b>Агрегат в WHERE:</b> <code>WHERE COUNT(*) &gt; 1</code> даёт ошибку. На этапе WHERE групп ещё нет — используйте HAVING.</li>
<li><b>Забыть GROUP BY.</b> <code>SELECT city, COUNT(*) FROM customers</code> вернёт одну строку на всю таблицу, а не по строке на город.</li>
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
    'sql-gate': {
      title: 'Экзамен модуля: SQL Core',
      body: `
<p>Это итоговая проверка модуля. Задания вперемешку из всех уроков, подсказок нет. Выполните все — модуль будет пройден, и вы приблизитесь к уровню <b>L2 SQL Practitioner</b>.</p>
<p>База та же: <code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>.</p>
<div class="tip">Не торопитесь: сначала посмотрите промежуточный результат через «Запустить», потом проверяйте.</div>`,
      ex: [
        { prompt: 'Только по заказам <code>delivered</code> выведите имена 3 клиентов, потративших больше всех, и их общую сумму, по убыванию.' },
        { prompt: 'Для каждого месяца (в формате <code>YYYY-MM</code>) выведите число уникальных клиентов, сделавших заказ, по возрастанию месяцев. Подсказка: <code>substr(order_date, 1, 7)</code>.' },
        { prompt: 'Выведите названия товаров, которых всего продано не меньше 3 штук, и общее проданное количество.' },
        { prompt: 'Попадут ли клиенты без заказов в результат запроса <code>customers c LEFT JOIN orders o ... WHERE o.status = \'delivered\'</code>?', options: ['Да, со значением NULL', 'Нет: условие WHERE убирает NULL-строки, поэтому запрос работает как INNER JOIN', 'Только один раз', 'Будет ошибка'], explain: 'NULL = \'delivered\' не истинно. Только если перенести условие в ON, LEFT JOIN сохранит всех клиентов.' }
      ]
    }
  }
});
