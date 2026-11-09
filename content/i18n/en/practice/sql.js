// sql practice tasks: English text. Code, solutions and checks are in content/practice/sql.js.
DJ.i18n.patch({ lessons: {
 "sql-1": {
  "pr": [
   {
    "title": "Product categories",
    "prompt": "From the <code>products</code> table, show the name (<code>name</code>) and the category (<code>category</code>) of each product.",
    "hints": [
     "List the two columns separated by a comma: <code>SELECT name, category</code>."
    ]
   },
   {
    "title": "All orders",
    "prompt": "Show all columns and all rows of the <code>orders</code> table.",
    "hints": [
     "The symbol <code>*</code> selects all columns."
    ]
   },
   {
    "title": "Order items",
    "prompt": "From the <code>order_items</code> table, show the order number (<code>order_id</code>), the product number (<code>product_id</code>) and the quantity (<code>quantity</code>).",
    "hints": [
     "Name the three columns in this same order."
    ]
   },
   {
    "title": "Price first",
    "prompt": "Show the price (<code>price</code>) and the name (<code>name</code>) of the products. The columns must appear in exactly this order: price first, then name.",
    "hints": [
     "The columns in the result appear in the same order as they are written in <code>SELECT</code>."
    ]
   },
   {
    "title": "Registration dates",
    "prompt": "Show the client number (<code>id</code>), the name (<code>name</code>) and the registration date (<code>signup_date</code>) of each client.",
    "hints": [
     "Table: <code>customers</code>."
    ]
   },
   {
    "title": "Order owners",
    "prompt": "Show the number of each order (<code>id</code>), the client number (<code>customer_id</code>) and the status (<code>status</code>).",
    "hints": [
     "Table: <code>orders</code>. Separate the columns with commas."
    ]
   },
   {
    "title": "First five clients",
    "prompt": "To get to know the table, show only the first 5 rows of the <code>customers</code> table: the <code>id</code> and <code>name</code> columns.",
    "hints": [
     "Add <code>LIMIT 5</code> to the end of the query."
    ]
   },
   {
    "title": "Four columns in a strict order",
    "prompt": "From the <code>orders</code> table, show four columns in this exact order: <code>status</code>, <code>order_date</code>, <code>customer_id</code>, <code>id</code>.",
    "hints": [
     "The column order in the result may differ from the table order: name them in the order you want."
    ]
   }
  ]
 },
 "sql-2": {
  "pr": [
   {
    "title": "Cheap products",
    "prompt": "Show the name and price of the products whose price is below 5,000 tenge.",
    "hints": [
     "<code>WHERE price &lt; 5000</code>"
    ]
   },
   {
    "title": "Clients from Shymkent",
    "prompt": "Show the names (<code>name</code>) of the clients who come from the city of Шымкент.",
    "hints": [
     "Put the text in single quotes: <code>'Шымкент'</code>."
    ]
   },
   {
    "title": "Cancelled orders",
    "prompt": "Show the <code>id</code> and <code>customer_id</code> columns of the orders whose status is <code>cancelled</code>.",
    "hints": [
     "<code>WHERE status = 'cancelled'</code>"
    ]
   },
   {
    "title": "Book category",
    "prompt": "Show the name and price of the products in the category «Кітаптар».",
    "hints": [
     "The value in the <code>category</code> column is: <code>category = 'Кітаптар'</code>."
    ]
   },
   {
    "title": "Registered since summer",
    "prompt": "Show the name and registration date (<code>signup_date</code>) of the clients registered from 1 May 2024 onward (including that day).",
    "hints": [
     "Dates are compared as text: <code>signup_date &gt;= '2024-05-01'</code>."
    ]
   },
   {
    "title": "Bought in large quantities",
    "prompt": "From the <code>order_items</code> table, show the rows where the quantity (<code>quantity</code>) is 3 or more: <code>order_id</code>, <code>product_id</code>, <code>quantity</code>.",
    "hints": [
     "\"3 or more\" is written with the sign <code>&gt;=</code>."
    ]
   },
   {
    "title": "Products that are not electronics",
    "prompt": "Show the name and category of all products that do not belong to the «Электроника» category.",
    "hints": [
     "The \"not equal\" sign: <code>&lt;&gt;</code> or <code>!=</code>."
    ]
   },
   {
    "title": "Orders before October",
    "prompt": "Show the <code>id</code>, <code>order_date</code> and <code>status</code> columns of the orders placed before 1 October 2024 (1 October itself is not included).",
    "hints": [
     "<code>order_date &lt; '2024-10-01'</code> — all dates up to the end of September."
    ]
   }
  ]
 },
 "sql-3": {
  "pr": [
   {
    "title": "Accessories and office",
    "prompt": "Show the name and category of the products in the category «Аксессуарлар» or «Кеңсе». Use <code>IN</code>.",
    "hints": [
     "<code>category IN ('Аксессуарлар', 'Кеңсе')</code>"
    ]
   },
   {
    "title": "Price range",
    "prompt": "Show the name and price of the products priced from 7,000 to 30,000 tenge (both ends included). Use <code>BETWEEN</code>.",
    "hints": [
     "<code>BETWEEN 7000 AND 30000</code> includes the boundary values as well."
    ]
   },
   {
    "title": "Autumn orders in transit",
    "prompt": "Show the <code>id</code> and <code>order_date</code> columns of the orders whose status is <code>shipped</code> and which were placed from 1 October 2024 onward.",
    "hints": [
     "Combine the two conditions with <code>AND</code>."
    ]
   },
   {
    "title": "Excluding the two capitals",
    "prompt": "Show the name and city of the clients whose city is neither Алматы nor Астана. A client with no city given must not appear in the result. Use <code>NOT IN</code>.",
    "hints": [
     "<code>city NOT IN ('Алматы', 'Астана')</code>. A row with a NULL value is dropped by this condition on its own."
    ]
   },
   {
    "title": "Delivered in October",
    "prompt": "Show the <code>id</code> and <code>order_date</code> columns of the orders placed in October 2024 (1–31 October) whose status is <code>delivered</code>.",
    "hints": [
     "First <code>order_date BETWEEN '2024-10-01' AND '2024-10-31'</code>, then <code>AND status = 'delivered'</code>."
    ]
   },
   {
    "title": "Books or expensive",
    "prompt": "Show the name and price of the products in the category «Кітаптар» or of the products priced above 100,000 tenge.",
    "hints": [
     "The word \"or\" is written as <code>OR</code>."
    ]
   },
   {
    "title": "Condition with brackets",
    "prompt": "Among the clients from Алматы or Шымкент, show those registered from 1 March 2024 onward: <code>name</code>, <code>city</code>, <code>signup_date</code>.",
    "hints": [
     "<code>AND</code> runs before <code>OR</code>, so put the <code>OR</code> part in brackets.",
     "The \"or\" operator is written as <code>city IN ('Алматы', 'Шымкент')</code>."
    ]
   },
   {
    "title": "Electronics outside the mid price range",
    "prompt": "Show the name and price of the products in the category «Электроника» whose price is <b>not</b> between 50,000 and 200,000 tenge. Use <code>NOT</code> and <code>BETWEEN</code>.",
    "hints": [
     "<code>price NOT BETWEEN 50000 AND 200000</code>",
     "Add the category condition with <code>AND</code>."
    ]
   }
  ]
 },
 "sql-4": {
  "pr": [
   {
    "title": "Names starting with «А»",
    "prompt": "Show the names of the clients whose name starts with the letter «А».",
    "hints": [
     "<code>%</code> means any sequence of characters: <code>LIKE 'А%'</code>."
    ]
   },
   {
    "title": "Clients with a city",
    "prompt": "Show the name and city of the clients whose city is filled in (not empty).",
    "hints": [
     "We check for NULL not with <code>=</code> but with <code>IS NOT NULL</code>."
    ]
   },
   {
    "title": "Names ending in «н»",
    "prompt": "Show the names of the clients whose name ends with the letter «н» (for example, Нұрлан).",
    "hints": [
     "Search by the end of the text: <code>LIKE '%н'</code>."
    ]
   },
   {
    "title": "Fill in an empty city",
    "prompt": "Show the name and city of each client. If the city is not filled in, show the word <code>жоқ</code> instead. Use <code>COALESCE</code>.",
    "hints": [
     "<code>COALESCE(city, 'жоқ')</code> returns the first non-empty value."
    ]
   },
   {
    "title": "Five-letter names",
    "prompt": "Show the names of the clients that have exactly 5 letters. Use <code>_</code>.",
    "hints": [
     "<code>_</code> stands for exactly one character, so write five <code>_</code>."
    ]
   },
   {
    "title": "Cities starting with «А»",
    "prompt": "Show the name and city of the clients whose city starts with the letter «А» (Алматы, Астана, Ақтөбе...).",
    "hints": [
     "<code>city LIKE 'А%'</code>"
    ]
   },
   {
    "title": "Don't forget NULL",
    "prompt": "Show the names of the clients whose city does not start with the letter «А». Clients with no city given must also appear in the result.",
    "hints": [
     "<code>NOT LIKE 'А%'</code> removes rows with NULL.",
     "Add them back with <code>OR city IS NULL</code>."
    ]
   },
   {
    "title": "Cheap multi-word products",
    "prompt": "Show the name and price of the products whose name contains a space (that is, at least two words) and whose price is below 7,000 tenge.",
    "hints": [
     "To find a space: <code>LIKE '% %'</code>.",
     "Add the price condition with <code>AND</code>."
    ]
   }
  ]
 },
 "sql-5": {
  "pr": [
   {
    "title": "Cheapest product",
    "prompt": "Show the name and price of the cheapest product (one row).",
    "hints": [
     "Sort the prices in ascending order and take <code>LIMIT 1</code>."
    ]
   },
   {
    "title": "List of statuses",
    "prompt": "Show the list of statuses that appear in the orders, without repeats.",
    "hints": [
     "<code>SELECT DISTINCT status</code>"
    ]
   },
   {
    "title": "Clients in alphabetical order",
    "prompt": "Show the names of the clients in alphabetical order (ascending).",
    "hints": [
     "<code>ORDER BY name</code> — the default order, ascending (ASC).",
     "SQLite compares letters by their codes, so letters such as Ә, Ғ, Қ end up at the end of the list."
    ]
   },
   {
    "title": "The last three orders",
    "prompt": "Show the <code>id</code> and <code>order_date</code> columns of the three most recently placed orders, starting from the newest.",
    "hints": [
     "First <code>ORDER BY order_date DESC</code>, then <code>LIMIT 3</code>."
    ]
   },
   {
    "title": "City, then name",
    "prompt": "Show the names and cities of the clients: sort first by city, and within one city sort by name in alphabetical order.",
    "hints": [
     "Sorting by several columns: <code>ORDER BY city, name</code>.",
     "In SQLite, NULL values come first in ascending order."
    ]
   },
   {
    "title": "Clients who placed orders",
    "prompt": "From the <code>orders</code> table, show the list of client numbers (<code>customer_id</code>) without repeats, in ascending order.",
    "hints": [
     "<code>DISTINCT</code> and <code>ORDER BY</code> are used together."
    ]
   },
   {
    "title": "The two most expensive «Кеңсе» products",
    "prompt": "Show the name and price of the two most expensive products in the category «Кеңсе», from the most expensive to the cheaper one.",
    "hints": [
     "Order: <code>WHERE</code> → <code>ORDER BY</code> → <code>LIMIT</code>."
    ]
   },
   {
    "title": "The three largest rows",
    "prompt": "From the <code>order_items</code> table, show the 3 rows with the largest quantity (<code>quantity</code>): <code>order_id</code>, <code>product_id</code>, <code>quantity</code>. If the quantity is the same, the row with the smaller <code>order_id</code> comes first.",
    "hints": [
     "<code>ORDER BY quantity DESC, order_id</code>",
     "Add <code>LIMIT 3</code> at the end of the query."
    ]
   }
  ]
 },
 "sql-6": {
  "pr": [
   {
    "title": "Cost of two units",
    "prompt": "Show the name of each product and the cost of two of its units, under the name <code>two_items</code>.",
    "hints": [
     "<code>price * 2 AS two_items</code>"
    ]
   },
   {
    "title": "Price with delivery",
    "prompt": "Show the name of each product and its price including the delivery cost (1,500 tenge), under the name <code>total</code>.",
    "hints": [
     "<code>price + 1500 AS total</code>"
    ]
   },
   {
    "title": "Name and category together",
    "prompt": "For each product, show one text column under the name <code>label</code>: first the name, then <code> / </code>, then the category. For example: <code>Термос / Аксессуарлар</code>.",
    "hints": [
     "The text is joined with the operator <code>||</code>: <code>name || ' / ' || category</code>."
    ]
   },
   {
    "title": "Price in dollars",
    "prompt": "Taking 1 dollar = 500 tenge, show the name of each product and its price in dollars under the name <code>price_usd</code>, rounded to one decimal place. For example, 6500 → 13.0, 1200 → 2.4.",
    "hints": [
     "To avoid integer division, write <code>500.0</code>.",
     "<code>ROUND(x, 1)</code>"
    ]
   },
   {
    "title": "Price without VAT",
    "prompt": "The prices already include 12% VAT. Show the name of each product and its price without VAT (<code>price / 1.12</code>, rounded to a whole number) under the name <code>no_vat</code>.",
    "hints": [
     "<code>ROUND(price / 1.12) AS no_vat</code>"
    ]
   },
   {
    "title": "Whole thousands",
    "prompt": "Show the name of each product and the number of full thousands in its price, under the name <code>thousands</code>: the fractional part must be dropped. For example, 6500 → 6, 25000 → 25.",
    "hints": [
     "In SQLite, when you divide an integer by an integer, the fractional part is dropped: <code>price / 1000</code>."
    ]
   },
   {
    "title": "Top 3 with a discount",
    "prompt": "All products get a 20% discount. Show the name and the price after the discount (<code>ROUND(price * 0.8)</code>) under the name <code>sale</code>. Only the 3 most expensive products, sorted by <code>sale</code> in descending order.",
    "hints": [
     "The alias can be used in <code>ORDER BY</code>: <code>ORDER BY sale DESC</code>."
    ]
   },
   {
    "title": "Under 10 thousand after a 25% discount",
    "prompt": "If every product gets a 25% discount (<code>price * 0.75</code>), show the name of each product and its discounted price under the name <code>sale_price</code> — only for the products whose discounted price is below 10,000 tenge. Sort <code>sale_price</code> in ascending order.",
    "hints": [
     "The alias does not work in <code>WHERE</code>: repeat the calculation, <code>WHERE price * 0.75 &lt; 10000</code>.",
     "But <code>ORDER BY sale_price</code> works."
    ]
   }
  ]
 },
 "sql-7": {
  "pr": [
   {
    "title": "Number of orders",
    "prompt": "How many orders are there in total? Show one number.",
    "hints": [
     "<code>COUNT(*)</code> counts the rows."
    ]
   },
   {
    "title": "Sum of prices",
    "prompt": "If we take one unit of each product, how many tenge will that be? Show the sum of the prices of all products.",
    "hints": [
     "<code>SUM(price)</code>"
    ]
   },
   {
    "title": "Number of «Кеңсе» products",
    "prompt": "How many products are in the category «Кеңсе»? Show one number.",
    "hints": [
     "First filter with <code>WHERE</code>, then apply <code>COUNT(*)</code>."
    ]
   },
   {
    "title": "Number of cities",
    "prompt": "Clients come from how many different cities? Show the number of different cities (NULL values are not counted).",
    "hints": [
     "<code>COUNT(DISTINCT city)</code> does not count NULL on its own."
    ]
   },
   {
    "title": "Average quantity",
    "prompt": "Show the average quantity of units (<code>quantity</code>) per row of the <code>order_items</code> table on one line, rounded to one decimal place.",
    "hints": [
     "<code>ROUND(AVG(quantity), 1)</code>"
    ]
   },
   {
    "title": "First and last date",
    "prompt": "Show the date of the very first order and the date of the very last order on one row, in this order.",
    "hints": [
     "<code>MIN</code> and <code>MAX</code> also work with text dates."
    ]
   },
   {
    "title": "Electronics statistics",
    "prompt": "For the category «Электроника», show four values on one row: the number of products, the lowest price, the highest price and the average price, rounded to a whole number.",
    "hints": [
     "List the four aggregates separated by commas.",
     "<code>WHERE category = ...</code> runs before the aggregate functions."
    ]
   },
   {
    "title": "Price spread",
    "prompt": "For all products except electronics, show two values on one row: the difference between the highest and the lowest price (<code>spread</code>) and the average price, rounded to a whole number (<code>avg_price</code>).",
    "hints": [
     "You can do arithmetic with the aggregates themselves: <code>MAX(price) - MIN(price)</code>."
    ]
   }
  ]
 },
 "sql-8": {
  "pr": [
   {
    "title": "Count by status",
    "prompt": "Show the number of orders for each status: <code>status</code> and the count.",
    "hints": [
     "<code>GROUP BY status</code>"
    ]
   },
   {
    "title": "Most expensive in each category",
    "prompt": "Show the highest price in each category: <code>category</code> and the maximum price.",
    "hints": [
     "<code>MAX(price)</code> and <code>GROUP BY category</code>."
    ]
   },
   {
    "title": "Units in an order",
    "prompt": "How many product units are there in total in each order? Show <code>order_id</code> and the sum of <code>quantity</code>.",
    "hints": [
     "<code>SUM(quantity)</code> and <code>GROUP BY order_id</code>."
    ]
   },
   {
    "title": "Active clients ranking",
    "prompt": "Show the number of orders of each client (<code>customer_id</code>). The clients with more orders come first; if the number is the same, the one with the smaller <code>customer_id</code> comes first.",
    "hints": [
     "<code>ORDER BY COUNT(*) DESC, customer_id</code>"
    ]
   },
   {
    "title": "Well-selling products",
    "prompt": "Show <code>product_id</code> and the number of units sold for the products that sold at least 3 units in total.",
    "hints": [
     "Filtering groups: <code>HAVING SUM(quantity) &gt;= 3</code>."
    ]
   },
   {
    "title": "Expensive categories",
    "prompt": "Show the categories whose sum of product prices is more than 20,000 tenge: <code>category</code> and the sum of prices.",
    "hints": [
     "<code>HAVING SUM(price) &gt; 20000</code>"
    ]
   },
   {
    "title": "Regular customers",
    "prompt": "Count only the <code>delivered</code> orders. Show the <code>customer_id</code> of the clients who have at least 2 delivered orders, and the number of those orders.",
    "hints": [
     "Rows are filtered before grouping with <code>WHERE</code>, and groups are filtered after grouping with <code>HAVING</code>."
    ]
   },
   {
    "title": "Big cities ranking",
    "prompt": "Among the clients with a city given, show the cities that have at least 2 clients: <code>city</code> and the number of clients. The city with more clients comes first; if the number is the same, sort the cities by name in alphabetical order.",
    "hints": [
     "Order: WHERE → GROUP BY → HAVING → ORDER BY."
    ]
   }
  ]
 },
 "sql-9": {
  "pr": [
   {
    "title": "Metropolis or region",
    "prompt": "Show the name of each client and the column <code>zone</code>: if the city is Алматы or Астана, show <code>мегаполис</code>; otherwise (even if no city is given) show <code>өңір</code>.",
    "hints": [
     "<code>CASE WHEN city IN ('Алматы', 'Астана') THEN 'мегаполис' ELSE 'өңір' END</code>"
    ]
   },
   {
    "title": "Status in Kazakh",
    "prompt": "Show the <code>id</code> of each order and its status in Kazakh under the name <code>status_kz</code>: <code>delivered</code> → <code>жеткізілді</code>, <code>shipped</code> → <code>жолда</code>, the rest → <code>бас тартылды</code>.",
    "hints": [
     "Write two <code>WHEN</code> and one <code>ELSE</code>."
    ]
   },
   {
    "title": "Wholesale or retail",
    "prompt": "From the <code>order_items</code> table, show the columns <code>order_id</code>, <code>product_id</code> and <code>sale_type</code>: if the quantity is 3 or more, then <code>көтерме</code>; otherwise <code>бөлшек</code>.",
    "hints": [
     "<code>CASE WHEN quantity &gt;= 3 THEN 'көтерме' ELSE 'бөлшек' END</code>"
    ]
   },
   {
    "title": "Unknown city with CASE",
    "prompt": "Show the name of each client and the column <code>city_label</code>: if the city is empty, show <code>белгісіз</code>; otherwise show the city's own name. Use <code>CASE</code>.",
    "hints": [
     "<code>WHEN city IS NULL THEN ...</code>",
     "<code>ELSE city</code> returns the column's own value."
    ]
   },
   {
    "title": "Number of premium products",
    "prompt": "Split the products into two groups and count them: if the price is 50,000 or more, then <code>премиум</code>; otherwise <code>қарапайым</code>. Columns: the group name and the number of products.",
    "hints": [
     "Give the CASE column an alias and use it to <code>GROUP BY</code>."
    ]
   },
   {
    "title": "Determining the quarter",
    "prompt": "Show the <code>id</code>, <code>order_date</code> and <code>quarter</code> columns of each order, plus one more column: if the order was placed before 1 October 2024, then <code>Q3</code>; otherwise <code>Q4</code>.",
    "hints": [
     "<code>CASE WHEN order_date &lt; '2024-10-01' THEN 'Q3' ELSE 'Q4' END</code>"
    ]
   },
   {
    "title": "Orders by quarter",
    "prompt": "Without counting the cancelled (<code>cancelled</code>) orders, show the number of orders in each quarter: before 1 October <code>Q3</code>, the rest <code>Q4</code>. Columns: <code>quarter</code> and the count.",
    "hints": [
     "First <code>WHERE status &lt;&gt; ...</code>, then <code>GROUP BY</code> by the CASE column."
    ]
   },
   {
    "title": "Category-based discount",
    "prompt": "Calculate the new price under the name <code>new_price</code>: a 10% discount for the category «Электроника» (<code>ROUND(price * 0.9)</code>), a 20% discount for the category «Кітаптар» (<code>ROUND(price * 0.8)</code>); the price of the others does not change. Show the name and <code>new_price</code> only for the 5 most expensive products, sorted by <code>new_price</code> in descending order.",
    "hints": [
     "You can write calculations inside THEN.",
     "<code>ORDER BY new_price DESC LIMIT 5</code>"
    ]
   }
  ]
 },
 "sql-10": {
  "pr": [
   {
    "title": "Order and city",
    "prompt": "Show the <code>id</code> of each order and the city of the client (<code>city</code>).",
    "hints": [
     "<code>orders o JOIN customers c ON o.customer_id = c.id</code>"
    ]
   },
   {
    "title": "Product name and quantity",
    "prompt": "For each row of the <code>order_items</code> table, show <code>order_id</code>, the product name and the quantity (<code>quantity</code>).",
    "hints": [
     "<code>JOIN products p ON p.id = oi.product_id</code>"
    ]
   },
   {
    "title": "Orders of Айгерім",
    "prompt": "Show the <code>id</code> and <code>order_date</code> columns of the orders of the client named Айгерім.",
    "hints": [
     "After the JOIN, add <code>WHERE c.name = 'Айгерім'</code>."
    ]
   },
   {
    "title": "Electronics sales",
    "prompt": "Show the rows about sales of products in the category «Электроника»: <code>order_id</code>, the product name, <code>quantity</code>.",
    "hints": [
     "<code>WHERE p.category = 'Электроника'</code>"
    ]
   },
   {
    "title": "Units per product",
    "prompt": "Show the name of each product and the total number of units sold (products that were not sold are not needed).",
    "hints": [
     "After the JOIN, use <code>GROUP BY p.id, p.name</code>."
    ]
   },
   {
    "title": "Orders by city",
    "prompt": "Show the number of orders for each city: the client's city and the number of orders.",
    "hints": [
     "The city is in <code>customers</code>, the order is in <code>orders</code>: join them and <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Revenue by category",
    "prompt": "Show the revenue of each category (the sum of <code>quantity × price</code>) under the name <code>revenue</code>, sorted by revenue in descending order: <code>category</code>, <code>revenue</code>. Orders with all statuses are counted.",
    "hints": [
     "<code>SUM(oi.quantity * p.price)</code>",
     "<code>GROUP BY p.category ORDER BY revenue DESC</code>"
    ]
   },
   {
    "title": "Large orders",
    "prompt": "Show <code>order_id</code> and the revenue of the orders whose revenue (the sum of <code>quantity × price</code>) is more than 200,000 tenge, sorted by revenue in descending order.",
    "hints": [
     "To filter after grouping, use <code>HAVING</code>.",
     "At the end of the query, add <code>ORDER BY revenue DESC</code>."
    ]
   }
  ]
 },
 "sql-11": {
  "pr": [
   {
    "title": "Unsold products",
    "prompt": "Find the names of the products that were never sold, using <code>LEFT JOIN</code>.",
    "hints": [
     "<code>products p LEFT JOIN order_items oi ON oi.product_id = p.id</code>",
     "Rows without a match: <code>WHERE oi.order_id IS NULL</code>."
    ]
   },
   {
    "title": "All clients and dates",
    "prompt": "Show the name of each client and the dates of their orders. A client with no orders must also appear at least once (the date will be empty).",
    "hints": [
     "Since all clients are needed, <code>customers</code> must stand on the left."
    ]
   },
   {
    "title": "Contents of order 106",
    "prompt": "For order 106, show the client's name and the product names. Join four tables: <code>orders</code>, <code>customers</code>, <code>order_items</code>, <code>products</code>.",
    "hints": [
     "Write the JOINs one after another, and in each one give its own <code>ON</code> condition.",
     "At the end, add <code>WHERE o.id = 106</code>."
    ]
   },
   {
    "title": "How many times each product sold",
    "prompt": "Show the name of each product and the number of order rows in which it appears. An unsold product must show 0.",
    "hints": [
     "Not <code>COUNT(*)</code>, but <code>COUNT(oi.order_id)</code>: it does not count NULL."
    ]
   },
   {
    "title": "Total units per client",
    "prompt": "Show the name of each client and the total number of units of the products they bought. A client with no orders must show 0 (<code>COALESCE</code>).",
    "hints": [
     "Two <code>LEFT JOIN</code>: customers → orders → order_items.",
     "<code>COALESCE(SUM(oi.quantity), 0)</code>"
    ]
   },
   {
    "title": "What Almaty clients bought",
    "prompt": "Show the unique names of the products bought by the clients from Алматы.",
    "hints": [
     "Join the four tables and <code>WHERE c.city = ...</code>.",
     "To remove repeats, use <code>DISTINCT</code>."
    ]
   },
   {
    "title": "Buyers by category",
    "prompt": "Show how many different clients bought products of each category: <code>category</code> and the number of unique clients.",
    "hints": [
     "<code>COUNT(DISTINCT o.customer_id)</code>",
     "orders → order_items → products."
    ]
   },
   {
    "title": "Revenue of each client",
    "prompt": "Show the name of each client and their revenue from all their orders (the sum of <code>quantity × price</code>) under the name <code>revenue</code>. A client with no orders must show 0. Sort by revenue in descending order; if equal, sort by name in alphabetical order.",
    "hints": [
     "So that all clients stay in the result, every join must be <code>LEFT JOIN</code>.",
     "<code>COALESCE(SUM(...), 0)</code> and <code>ORDER BY revenue DESC, c.name</code>."
    ]
   }
  ]
 },
 "sql-12": {
  "pr": [
   {
    "title": "Most expensive product",
    "prompt": "Using a subquery, find the name and price of the product whose price equals the highest price.",
    "hints": [
     "<code>WHERE price = (SELECT MAX(price) FROM products)</code>"
    ]
   },
   {
    "title": "Owners of orders in transit",
    "prompt": "Show the names of the clients who have an order with status <code>shipped</code>. Use <code>IN</code> and a subquery.",
    "hints": [
     "<code>id IN (SELECT customer_id FROM orders WHERE ...)</code>"
    ]
   },
   {
    "title": "The very first order",
    "prompt": "Show all columns of the order that was placed on the earliest date. Use a subquery.",
    "hints": [
     "<code>(SELECT MIN(order_date) FROM orders)</code>"
    ]
   },
   {
    "title": "Buyers with EXISTS",
    "prompt": "Show the names of the clients who have at least one order, using <code>EXISTS</code>.",
    "hints": [
     "<code>WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)</code>"
    ]
   },
   {
    "title": "Book buyers",
    "prompt": "Show the names of the clients who bought at least one product of the category «Кітаптар». Write it without a JOIN, as a chain of subqueries with <code>IN</code>.",
    "hints": [
     "Start from the inside: book ids → orders with these books → clients of those orders."
    ]
   },
   {
    "title": "Cheap «Кеңсе» products",
    "prompt": "Show the name and price of the products of the category «Кеңсе» whose price is lower than the average price of this category.",
    "hints": [
     "The subquery must also include <code>WHERE category = 'Кеңсе'</code>."
    ]
   },
   {
    "title": "More expensive than their category",
    "prompt": "Show the name, category and price of the products whose price is higher than the average price of <b>their own category</b>. Use a correlated subquery.",
    "hints": [
     "The inner query refers to the category of the outer row: <code>WHERE p2.category = p.category</code>."
    ]
   },
   {
    "title": "Clients who never bought electronics",
    "prompt": "Show the names of the clients who have at least one order, but who have never bought a product of the category «Электроника». Use <code>EXISTS</code> and <code>NOT EXISTS</code>.",
    "hints": [
     "First condition: has <code>EXISTS</code>.",
     "Second condition: inside <code>NOT EXISTS</code>, join orders → order_items → products, <code>p.category = 'Электроника'</code>."
    ]
   }
  ]
 },
 "sql-13": {
  "pr": [
   {
    "title": "Cities table",
    "prompt": "In an empty database, create the table <code>cities</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>, <code>population INTEGER</code>. Add three rows: (1, 'Алматы', 2200000), (2, 'Астана', 1400000), (3, 'Шымкент', 1200000).",
    "hints": [
     "Several rows with one <code>INSERT</code>: <code>VALUES (...), (...), (...)</code>."
    ]
   },
   {
    "title": "New client",
    "prompt": "Add a new client to the <code>customers</code> table: id 11, name Ғалым, city Павлодар, registration date 2024-12-05.",
    "hints": [
     "<code>INSERT INTO customers (id, name, city, signup_date) VALUES (...)</code>"
    ]
   },
   {
    "title": "New price of the thermos",
    "prompt": "Change the price of the thermos to 10,000 tenge.",
    "hints": [
     "<code>UPDATE products SET price = 10000 WHERE name = 'Термос'</code>",
     "Don't forget the WHERE, otherwise the price of all products will change."
    ]
   },
   {
    "title": "Delete bulk rows",
    "prompt": "Delete the rows from the <code>order_items</code> table where the quantity is 5 or more.",
    "hints": [
     "<code>DELETE FROM order_items WHERE quantity &gt;= 5</code>"
    ]
   },
   {
    "title": "DEFAULT value",
    "prompt": "In an empty database, create the table <code>students</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>, <code>grade INTEGER</code> (the default value is 1). Then add two students, giving only <code>id</code> and <code>name</code>: (1, 'Аружан') and (2, 'Мирас'). Their <code>grade</code> must become 1 automatically.",
    "hints": [
     "<code>grade INTEGER DEFAULT 1</code>",
     "In the INSERT, name the columns: <code>INSERT INTO students (id, name) VALUES ...</code>"
    ]
   },
   {
    "title": "Fill in an empty city",
    "prompt": "Update the city of the clients whose city is not given, setting it to Павлодар.",
    "hints": [
     "Find NULL with <code>IS NULL</code>: <code>WHERE city IS NULL</code>."
    ]
   },
   {
    "title": "School and students",
    "prompt": "In an empty database, create two tables. <code>schools</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>. <code>pupils</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT</code>, <code>school_id INTEGER</code> — a reference to <code>schools(id)</code> (<code>REFERENCES</code>). Schools: (1, '№12 мектеп'), (2, 'НЗМ'), (3, '№5 лицей'). Students: (1, 'Әлия', 1), (2, 'Санжар', 1), (3, 'Томирис', 2).",
    "hints": [
     "First <code>schools</code> is created, then <code>pupils</code>, which refers to it.",
     "<code>school_id INTEGER REFERENCES schools(id)</code>"
    ]
   },
   {
    "title": "VIP flag",
    "prompt": "Add the column <code>vip INTEGER</code> with the default value 0 to the <code>customers</code> table. Then set <code>vip</code> to 1 for the clients who have at least 2 orders (use a subquery).",
    "hints": [
     "<code>ALTER TABLE customers ADD COLUMN vip INTEGER DEFAULT 0;</code>",
     "<code>WHERE id IN (SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(*) &gt;= 2)</code>"
    ]
   }
  ]
 },
 "sql-14": {
  "pr": [
   {
    "title": "Expensive products VIEW",
    "prompt": "Create a VIEW named <code>expensive_products</code> with the columns <code>name</code> and <code>price</code> of the products whose price is above 50,000 tenge.",
    "hints": [
     "<code>CREATE VIEW expensive_products AS SELECT ...</code>"
    ]
   },
   {
    "title": "Confirm with COMMIT",
    "prompt": "Open a transaction, change the status of order 109 to <code>delivered</code>, and confirm the change with <code>COMMIT</code>.",
    "hints": [
     "<code>BEGIN;</code> → <code>UPDATE ...;</code> → <code>COMMIT;</code>"
    ]
   },
   {
    "title": "Counting from a VIEW",
    "prompt": "Create a VIEW named <code>almaty_customers</code> (for the clients from Алматы: <code>id</code> and <code>name</code>), then show the number of rows in this VIEW.",
    "hints": [
     "A VIEW is read like a table: <code>SELECT COUNT(*) FROM almaty_customers;</code>"
    ]
   },
   {
    "title": "Delete an order completely",
    "prompt": "Order 112 has been cancelled. In one transaction, first delete its rows in <code>order_items</code>, then the row in <code>orders</code>, and run <code>COMMIT</code>.",
    "hints": [
     "Two <code>DELETE</code> inside one <code>BEGIN ... COMMIT</code>.",
     "First the dependent table (<code>order_items</code>) is cleaned."
    ]
   },
   {
    "title": "Rolling back to a SAVEPOINT",
    "prompt": "In a transaction: raise the price of the «Кеңсе» products by 1,000 tenge, then create <code>SAVEPOINT s1</code>. Then, by mistake, set the price of these products to 0 and roll back to it with <code>ROLLBACK TO s1</code>. Finally, run <code>COMMIT</code>. The result must keep only the 1,000 tenge increase.",
    "hints": [
     "<code>ROLLBACK TO s1</code> undoes only the changes made after the SAVEPOINT."
    ]
   },
   {
    "title": "Category statistics VIEW",
    "prompt": "Create a VIEW named <code>category_stats</code>: for each category, <code>category</code>, the number of products <code>n</code> and the highest price <code>max_price</code>.",
    "hints": [
     "Inside a VIEW you can use <code>GROUP BY</code>."
    ]
   },
   {
    "title": "Order revenue VIEW",
    "prompt": "Create a VIEW named <code>order_revenue</code>: for each order, <code>order_id</code>, the client's name <code>name</code> and the revenue <code>revenue</code> (the sum of <code>quantity × price</code>). Join the tables orders, customers, order_items and products.",
    "hints": [
     "The query inside a VIEW is an ordinary SELECT: JOIN and GROUP BY.",
     "Give the columns the names <code>AS order_id</code>, <code>AS revenue</code>."
    ]
   },
   {
    "title": "VIEW sees new data",
    "prompt": "Create a VIEW named <code>delivered_count</code>: group the orders by <code>delivered</code> and show each <code>customer_id</code> and the count <code>n</code>. Then update all <code>shipped</code> orders so that they become <code>delivered</code>. Finally, show the VIEW sorted by <code>customer_id</code>: it must show the data after the update.",
    "hints": [
     "A VIEW does not store data: the query runs again every time it is read.",
     "Three commands: <code>CREATE VIEW</code>, <code>UPDATE</code>, <code>SELECT</code>."
    ]
   }
  ]
 }
} });
