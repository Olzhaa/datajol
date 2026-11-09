// sql practice tasks: Russian text. Code, solutions and checks are in content/practice/sql.js.
DJ.i18n.patch({ lessons: {
 "sql-1": {
  "pr": [
   {
    "title": "Категории товаров",
    "prompt": "Из таблицы <code>products</code> выведите название (<code>name</code>) и категорию (<code>category</code>) каждого товара.",
    "hints": [
     "Перечислите два столбца через запятую: <code>SELECT name, category</code>."
    ]
   },
   {
    "title": "Все заказы",
    "prompt": "Выведите все столбцы и все строки таблицы <code>orders</code>.",
    "hints": [
     "Для выбора всех столбцов используется символ <code>*</code>."
    ]
   },
   {
    "title": "Состав заказа",
    "prompt": "Из таблицы <code>order_items</code> выведите номер заказа (<code>order_id</code>), номер товара (<code>product_id</code>) и количество (<code>quantity</code>).",
    "hints": [
     "Назовите три столбца в таком же порядке."
    ]
   },
   {
    "title": "Сначала цена",
    "prompt": "Выведите цену (<code>price</code>) и название (<code>name</code>) товаров. Столбцы должны идти именно в таком порядке: сначала цена, затем название.",
    "hints": [
     "Столбцы в результате будут в том порядке, в котором они записаны в <code>SELECT</code>."
    ]
   },
   {
    "title": "Даты регистрации",
    "prompt": "Выведите номер клиента (<code>id</code>), имя (<code>name</code>) и дату регистрации (<code>signup_date</code>) каждого клиента.",
    "hints": [
     "Таблица: <code>customers</code>."
    ]
   },
   {
    "title": "Владельцы заказов",
    "prompt": "Выведите номер каждого заказа (<code>id</code>), номер клиента (<code>customer_id</code>) и статус (<code>status</code>).",
    "hints": [
     "Таблица: <code>orders</code>. Перечисляйте столбцы через запятую."
    ]
   },
   {
    "title": "Первые пять клиентов",
    "prompt": "Чтобы познакомиться с таблицей, выведите только первые 5 строк таблицы <code>customers</code>: столбцы <code>id</code> и <code>name</code>.",
    "hints": [
     "В конец запроса добавьте <code>LIMIT 5</code>."
    ]
   },
   {
    "title": "Четыре столбца в строгом порядке",
    "prompt": "Выведите из таблицы <code>orders</code> четыре столбца в таком порядке: <code>status</code>, <code>order_date</code>, <code>customer_id</code>, <code>id</code>.",
    "hints": [
     "Порядок столбцов в результате может отличаться от порядка в таблице: перечислите их в нужном вам порядке."
    ]
   }
  ]
 },
 "sql-2": {
  "pr": [
   {
    "title": "Дешёвые товары",
    "prompt": "Выведите название и цену товаров, цена которых ниже 5 000 тенге.",
    "hints": [
     "<code>WHERE price &lt; 5000</code>"
    ]
   },
   {
    "title": "Клиенты из Шымкента",
    "prompt": "Выведите имена (<code>name</code>) клиентов, приехавших из города Шымкент.",
    "hints": [
     "Заключите текст в одинарные кавычки: <code>'Шымкент'</code>."
    ]
   },
   {
    "title": "Отменённые заказы",
    "prompt": "Выведите столбцы <code>id</code> и <code>customer_id</code> заказов, у которых статус <code>cancelled</code>.",
    "hints": [
     "<code>WHERE status = 'cancelled'</code>"
    ]
   },
   {
    "title": "Категория книг",
    "prompt": "Выведите название и цену товаров из категории «Кітаптар».",
    "hints": [
     "В столбце <code>category</code> значение: <code>category = 'Кітаптар'</code>."
    ]
   },
   {
    "title": "Зарегистрированные с лета",
    "prompt": "Выведите имя и дату регистрации (<code>signup_date</code>) клиентов, зарегистрированных с 1 мая 2024 года (включая этот день).",
    "hints": [
     "Даты сравниваются как текст: <code>signup_date &gt;= '2024-05-01'</code>."
    ]
   },
   {
    "title": "Купленные в большом количестве",
    "prompt": "Из таблицы <code>order_items</code> выведите строки, в которых количество (<code>quantity</code>) равно 3 или больше: <code>order_id</code>, <code>product_id</code>, <code>quantity</code>.",
    "hints": [
     "«3 или больше» — знак <code>&gt;=</code>."
    ]
   },
   {
    "title": "Товары не из электроники",
    "prompt": "Выведите название и категорию всех товаров, которые не относятся к категории «Электроника».",
    "hints": [
     "Знак «не равно»: <code>&lt;&gt;</code> или <code>!=</code>."
    ]
   },
   {
    "title": "Заказы до октября",
    "prompt": "Выведите столбцы <code>id</code>, <code>order_date</code> и <code>status</code> заказов, оформленных до 1 октября 2024 года (сам 1 октября не входит).",
    "hints": [
     "<code>order_date &lt; '2024-10-01'</code> — все даты до конца сентября."
    ]
   }
  ]
 },
 "sql-3": {
  "pr": [
   {
    "title": "Аксессуары и офис",
    "prompt": "Выведите название и категорию товаров из категории «Аксессуарлар» или «Кеңсе». Используйте <code>IN</code>.",
    "hints": [
     "<code>category IN ('Аксессуарлар', 'Кеңсе')</code>"
    ]
   },
   {
    "title": "Диапазон цен",
    "prompt": "Выведите название и цену товаров, цена которых находится в диапазоне от 7 000 до 30 000 тенге (включая обе границы). Используйте <code>BETWEEN</code>.",
    "hints": [
     "<code>BETWEEN 7000 AND 30000</code> учитывает и граничные значения."
    ]
   },
   {
    "title": "Осенние заказы в пути",
    "prompt": "Выведите столбцы <code>id</code> и <code>order_date</code> тех заказов, у которых статус <code>shipped</code> и которые оформлены с 1 октября 2024 года.",
    "hints": [
     "Соедините два условия с помощью <code>AND</code>."
    ]
   },
   {
    "title": "Кроме двух столиц",
    "prompt": "Выведите имя и город клиентов, у которых город не Алматы и не Астана. Клиент, у которого город не указан, не должен попасть в результат. Используйте <code>NOT IN</code>.",
    "hints": [
     "<code>city NOT IN ('Алматы', 'Астана')</code>. Строка со значением NULL отбрасывается этим условием само собой."
    ]
   },
   {
    "title": "Доставленные в октябре",
    "prompt": "Выведите столбцы <code>id</code> и <code>order_date</code> заказов, оформленных в октябре 2024 года (с 1 по 31 октября) и имеющих статус <code>delivered</code>.",
    "hints": [
     "Сначала <code>order_date BETWEEN '2024-10-01' AND '2024-10-31'</code>, затем <code>AND status = 'delivered'</code>."
    ]
   },
   {
    "title": "Книги или дорогие",
    "prompt": "Выведите название и цену товаров из категории «Кітаптар» или товаров дороже 100 000 тенге.",
    "hints": [
     "Слово «или» — <code>OR</code>."
    ]
   },
   {
    "title": "Условие в скобках",
    "prompt": "Из клиентов, живущих в Алматы или Шымкенте, выведите тех, кто зарегистрирован с 1 марта 2024 года: <code>name</code>, <code>city</code>, <code>signup_date</code>.",
    "hints": [
     "<code>AND</code> выполняется раньше <code>OR</code>, поэтому часть <code>OR</code> возьмите в скобки.",
     "Оператор «или» записывается как <code>city IN ('Алматы', 'Шымкент')</code>."
    ]
   },
   {
    "title": "Электроника вне среднего диапазона цен",
    "prompt": "Выведите название и цену товаров из категории «Электроника», цена которых <b>не входит</b> в диапазон от 50 000 до 200 000 тенге. Используйте <code>NOT</code> и <code>BETWEEN</code>.",
    "hints": [
     "<code>price NOT BETWEEN 50000 AND 200000</code>",
     "Добавьте условие по категории с помощью <code>AND</code>."
    ]
   }
  ]
 },
 "sql-4": {
  "pr": [
   {
    "title": "Имена на букву «А»",
    "prompt": "Выведите имена клиентов, которые начинаются с буквы «А».",
    "hints": [
     "<code>%</code> означает любую последовательность символов: <code>LIKE 'А%'</code>."
    ]
   },
   {
    "title": "Клиенты с указанным городом",
    "prompt": "Выведите имя и город клиентов, у которых указан город (не пустой).",
    "hints": [
     "Проверяем NULL не через <code>=</code>, а через <code>IS NOT NULL</code>."
    ]
   },
   {
    "title": "Имена, оканчивающиеся на «н»",
    "prompt": "Выведите имена клиентов, которые оканчиваются на букву «н» (например, Нұрлан).",
    "hints": [
     "Поиск по концу строки: <code>LIKE '%н'</code>."
    ]
   },
   {
    "title": "Заполнить пустой город",
    "prompt": "Выведите имя и город каждого клиента. Если город не указан, пусть вместо него выводится <code>жоқ</code>. Используйте <code>COALESCE</code>.",
    "hints": [
     "<code>COALESCE(city, 'жоқ')</code> возвращает первое непустое значение."
    ]
   },
   {
    "title": "Имена из пяти букв",
    "prompt": "Выведите имена клиентов, в которых ровно 5 букв. Используйте <code>_</code>.",
    "hints": [
     "<code>_</code> обозначает ровно один символ, поэтому запишите пять <code>_</code>."
    ]
   },
   {
    "title": "Города на «А»",
    "prompt": "Выведите имя и город клиентов, город которых начинается на букву «А» (Алматы, Астана, Ақтөбе...).",
    "hints": [
     "<code>city LIKE 'А%'</code>"
    ]
   },
   {
    "title": "Не забывайте про NULL",
    "prompt": "Выведите имена клиентов, город которых не начинается с буквы «А». Клиенты, у которых город не указан, тоже должны попасть в результат.",
    "hints": [
     "<code>NOT LIKE 'А%'</code> отбрасывает строки с NULL.",
     "Добавьте их с помощью <code>OR city IS NULL</code>."
    ]
   },
   {
    "title": "Дешёвые товары из нескольких слов",
    "prompt": "Выведите название и цену товаров, в названии которых есть пробел (то есть не меньше двух слов), а цена ниже 7 000 тенге.",
    "hints": [
     "Поиск пробела: <code>LIKE '% %'</code>.",
     "Условие по цене добавьте с помощью <code>AND</code>."
    ]
   }
  ]
 },
 "sql-5": {
  "pr": [
   {
    "title": "Самый дешёвый товар",
    "prompt": "Выведите название и цену самого дешёвого товара (одну строку).",
    "hints": [
     "Отсортируйте цены по возрастанию и возьмите <code>LIMIT 1</code>."
    ]
   },
   {
    "title": "Список статусов",
    "prompt": "Выведите список статусов, которые встречаются в заказах, без повторов.",
    "hints": [
     "<code>SELECT DISTINCT status</code>"
    ]
   },
   {
    "title": "Клиенты по алфавиту",
    "prompt": "Выведите имена клиентов в алфавитном порядке (по возрастанию).",
    "hints": [
     "<code>ORDER BY name</code> — порядок по умолчанию, по возрастанию (ASC).",
     "SQLite сравнивает буквы по их кодам, поэтому буквы Ә, Ғ, Қ оказываются в конце списка."
    ]
   },
   {
    "title": "Последние три заказа",
    "prompt": "Выведите столбцы <code>id</code> и <code>order_date</code> трёх последних оформленных заказов, начиная с самого нового.",
    "hints": [
     "Сначала <code>ORDER BY order_date DESC</code>, затем <code>LIMIT 3</code>."
    ]
   },
   {
    "title": "Город, затем имя",
    "prompt": "Выведите имена и города клиентов: сначала отсортируйте по городу, а внутри одного города — по имени в алфавитном порядке.",
    "hints": [
     "Сортировка по нескольким столбцам: <code>ORDER BY city, name</code>.",
     "В SQLite значение NULL при возрастании идёт первым."
    ]
   },
   {
    "title": "Клиенты, которые делали заказы",
    "prompt": "Из таблицы <code>orders</code> выведите список номеров клиентов (<code>customer_id</code>) без повторов, по возрастанию.",
    "hints": [
     "<code>DISTINCT</code> и <code>ORDER BY</code> используются вместе."
    ]
   },
   {
    "title": "Два самых дорогих товара «Кеңсе»",
    "prompt": "Выведите название и цену двух самых дорогих товаров категории «Кеңсе», от самого дорогого к более дешёвому.",
    "hints": [
     "Порядок: <code>WHERE</code> → <code>ORDER BY</code> → <code>LIMIT</code>."
    ]
   },
   {
    "title": "Три самые крупные строки",
    "prompt": "Из таблицы <code>order_items</code> выведите 3 строки с наибольшим количеством (<code>quantity</code>): <code>order_id</code>, <code>product_id</code>, <code>quantity</code>. Если количество совпадает, пусть первой идёт строка с меньшим <code>order_id</code>.",
    "hints": [
     "<code>ORDER BY quantity DESC, order_id</code>",
     "В конце запроса добавьте <code>LIMIT 3</code>."
    ]
   }
  ]
 },
 "sql-6": {
  "pr": [
   {
    "title": "Стоимость двух штук",
    "prompt": "Выведите название каждого товара и стоимость двух его штук под именем <code>two_items</code>.",
    "hints": [
     "<code>price * 2 AS two_items</code>"
    ]
   },
   {
    "title": "Цена с доставкой",
    "prompt": "Выведите название каждого товара и его цену с учётом стоимости доставки (1 500 тенге) под именем <code>total</code>.",
    "hints": [
     "<code>price + 1500 AS total</code>"
    ]
   },
   {
    "title": "Название и категория вместе",
    "prompt": "Для каждого товара выведите один текстовый столбец под именем <code>label</code>: сначала название, затем <code> / </code>, затем категория. Например: <code>Термос / Аксессуарлар</code>.",
    "hints": [
     "Текст соединяет оператор <code>||</code>: <code>name || ' / ' || category</code>."
    ]
   },
   {
    "title": "Цена в долларах",
    "prompt": "Считая 1 доллар = 500 тенге, выведите название каждого товара и его цену в долларах под именем <code>price_usd</code>, округлив до одного знака после запятой. Например, 6500 → 13.0, 1200 → 2.4.",
    "hints": [
     "Чтобы избежать целочисленного деления, запишите <code>500.0</code>.",
     "<code>ROUND(x, 1)</code>"
    ]
   },
   {
    "title": "Цена без НДС",
    "prompt": "В ценах уже включён НДС 12%. Выведите название каждого товара и его цену без НДС (<code>price / 1.12</code>, округлив до целого) под именем <code>no_vat</code>.",
    "hints": [
     "<code>ROUND(price / 1.12) AS no_vat</code>"
    ]
   },
   {
    "title": "Полные тысячи",
    "prompt": "Выведите название каждого товара и количество полных тысяч в его цене под именем <code>thousands</code>: дробная часть должна быть отброшена. Например, 6500 → 6, 25000 → 25.",
    "hints": [
     "В SQLite при делении целого числа на целое дробная часть отбрасывается: <code>price / 1000</code>."
    ]
   },
   {
    "title": "Топ-3 со скидкой",
    "prompt": "На все товары сделана скидка 20%. Выведите название и цену товара с учётом скидки (<code>ROUND(price * 0.8)</code>) под именем <code>sale</code>. Только 3 самых дорогих товара, отсортированных по убыванию <code>sale</code>.",
    "hints": [
     "Псевдоним можно использовать в <code>ORDER BY</code>: <code>ORDER BY sale DESC</code>."
    ]
   },
   {
    "title": "Дешевле 10 тысяч со скидкой 25%",
    "prompt": "Если дать на каждый товар скидку 25% (<code>price * 0.75</code>), выведите название товара и его цену со скидкой под именем <code>sale_price</code> только для товаров, цена которых после скидки ниже 10 000 тенге. Отсортируйте <code>sale_price</code> по возрастанию.",
    "hints": [
     "Псевдоним не работает в <code>WHERE</code>: повторите вычисление, <code>WHERE price * 0.75 &lt; 10000</code>.",
     "А <code>ORDER BY sale_price</code> работает."
    ]
   }
  ]
 },
 "sql-7": {
  "pr": [
   {
    "title": "Количество заказов",
    "prompt": "Сколько всего заказов? Выведите одно число.",
    "hints": [
     "<code>COUNT(*)</code> считает строки."
    ]
   },
   {
    "title": "Сумма цен",
    "prompt": "Если взять по одной штуке каждого товара, сколько тенге получится? Выведите сумму цен всех товаров.",
    "hints": [
     "<code>SUM(price)</code>"
    ]
   },
   {
    "title": "Количество товаров категории «Кеңсе»",
    "prompt": "Сколько товаров в категории «Кеңсе»? Выведите одно число.",
    "hints": [
     "Сначала отфильтруйте через <code>WHERE</code>, затем примените <code>COUNT(*)</code>."
    ]
   },
   {
    "title": "Количество городов",
    "prompt": "Из каких разных городов приехали клиенты? Выведите количество разных городов (значения NULL не учитываются).",
    "hints": [
     "<code>COUNT(DISTINCT city)</code> сам по себе не учитывает NULL."
    ]
   },
   {
    "title": "Среднее количество штук",
    "prompt": "Выведите среднее количество штук (<code>quantity</code>) в одной строке таблицы <code>order_items</code>, округлив до одного знака после запятой.",
    "hints": [
     "<code>ROUND(AVG(quantity), 1)</code>"
    ]
   },
   {
    "title": "Первая и последняя дата",
    "prompt": "Выведите дату самого первого заказа и дату самого последнего заказа в одной строке, в таком порядке.",
    "hints": [
     "<code>MIN</code> и <code>MAX</code> работают и с текстовыми датами."
    ]
   },
   {
    "title": "Статистика электроники",
    "prompt": "По категории «Электроника» выведите в одной строке четыре значения: количество товаров, самую низкую цену, самую высокую цену и среднюю цену, округлённую до целого.",
    "hints": [
     "Перечислите четыре агрегата через запятую.",
     "<code>WHERE category = ...</code> выполняется раньше агрегатных функций."
    ]
   },
   {
    "title": "Разброс цен",
    "prompt": "По всем товарам, кроме электроники, выведите в одной строке два значения: разницу между самой высокой и самой низкой ценой (<code>spread</code>) и среднюю цену, округлённую до целого (<code>avg_price</code>).",
    "hints": [
     "С самими агрегатами можно выполнять арифметику: <code>MAX(price) - MIN(price)</code>."
    ]
   }
  ]
 },
 "sql-8": {
  "pr": [
   {
    "title": "Количество по статусам",
    "prompt": "Выведите количество заказов по каждому статусу: <code>status</code> и количество.",
    "hints": [
     "<code>GROUP BY status</code>"
    ]
   },
   {
    "title": "Самый дорогой в категории",
    "prompt": "Выведите самую высокую цену в каждой категории: <code>category</code> и максимальную цену.",
    "hints": [
     "<code>MAX(price)</code> и <code>GROUP BY category</code>."
    ]
   },
   {
    "title": "Штуки в заказе",
    "prompt": "В каждом заказе сколько всего штук товаров? Выведите <code>order_id</code> и сумму <code>quantity</code>.",
    "hints": [
     "<code>SUM(quantity)</code> и <code>GROUP BY order_id</code>."
    ]
   },
   {
    "title": "Порядок активных клиентов",
    "prompt": "Выведите количество заказов каждого клиента (<code>customer_id</code>). Сначала идут клиенты с большим количеством заказов; если количество одинаковое, первым идёт тот, у кого <code>customer_id</code> меньше.",
    "hints": [
     "<code>ORDER BY COUNT(*) DESC, customer_id</code>"
    ]
   },
   {
    "title": "Хорошо продающиеся товары",
    "prompt": "Выведите <code>product_id</code> и количество проданных штук для товаров, которых продано всего не меньше 3 штук.",
    "hints": [
     "Фильтрация групп: <code>HAVING SUM(quantity) &gt;= 3</code>."
    ]
   },
   {
    "title": "Дорогие категории",
    "prompt": "Выведите категории, в которых сумма цен товаров больше 20 000 тенге: <code>category</code> и сумма цен.",
    "hints": [
     "<code>HAVING SUM(price) &gt; 20000</code>"
    ]
   },
   {
    "title": "Постоянные покупатели",
    "prompt": "Считайте только <code>delivered</code> заказы. Выведите <code>customer_id</code> и количество этих заказов для клиентов, у которых не меньше 2 доставленных заказов.",
    "hints": [
     "Строки фильтруются до группировки с помощью <code>WHERE</code>, а группы — после группировки с помощью <code>HAVING</code>."
    ]
   },
   {
    "title": "Рейтинг крупных городов",
    "prompt": "Среди клиентов с указанным городом выведите города, в которых не меньше 2 клиентов: <code>city</code> и количество клиентов. Сначала идёт город с большим количеством клиентов; если количество одинаковое, города сортируются по названию в алфавитном порядке.",
    "hints": [
     "Порядок: WHERE → GROUP BY → HAVING → ORDER BY."
    ]
   }
  ]
 },
 "sql-9": {
  "pr": [
   {
    "title": "Мегаполис или регион",
    "prompt": "Выведите имя каждого клиента и столбец <code>zone</code>: если город Алматы или Астана, то <code>мегаполис</code>, иначе (даже если город не указан) <code>өңір</code>.",
    "hints": [
     "<code>CASE WHEN city IN ('Алматы', 'Астана') THEN 'мегаполис' ELSE 'өңір' END</code>"
    ]
   },
   {
    "title": "Статус на казахском",
    "prompt": "Выведите <code>id</code> каждого заказа и статус на казахском языке под именем <code>status_kz</code>: <code>delivered</code> → <code>жеткізілді</code>, <code>shipped</code> → <code>жолда</code>, остальные → <code>бас тартылды</code>.",
    "hints": [
     "Напишите два <code>WHEN</code> и один <code>ELSE</code>."
    ]
   },
   {
    "title": "Оптом или в розницу",
    "prompt": "Из таблицы <code>order_items</code> выведите столбцы <code>order_id</code>, <code>product_id</code> и <code>sale_type</code>: если количество 3 и больше, то <code>көтерме</code>, иначе <code>бөлшек</code>.",
    "hints": [
     "<code>CASE WHEN quantity &gt;= 3 THEN 'көтерме' ELSE 'бөлшек' END</code>"
    ]
   },
   {
    "title": "Неизвестный город через CASE",
    "prompt": "Выведите имя каждого клиента и столбец <code>city_label</code>: если город пустой, то <code>белгісіз</code>, иначе название самого города. Используйте <code>CASE</code>.",
    "hints": [
     "<code>WHEN city IS NULL THEN ...</code>",
     "<code>ELSE city</code> возвращает само значение столбца."
    ]
   },
   {
    "title": "Количество премиум-товаров",
    "prompt": "Разделите товары на две группы и посчитайте их: если цена 50 000 и выше, то <code>премиум</code>, иначе <code>қарапайым</code>. Столбцы: название группы и количество товаров.",
    "hints": [
     "Дайте столбцу CASE псевдоним и выполните по нему <code>GROUP BY</code>."
    ]
   },
   {
    "title": "Определение квартала",
    "prompt": "Выведите столбцы <code>id</code>, <code>order_date</code> и <code>quarter</code> каждого заказа и ещё один столбец: если заказ сделан до 1 октября 2024 года, то <code>Q3</code>, иначе <code>Q4</code>.",
    "hints": [
     "<code>CASE WHEN order_date &lt; '2024-10-01' THEN 'Q3' ELSE 'Q4' END</code>"
    ]
   },
   {
    "title": "Заказы по кварталам",
    "prompt": "Не учитывая отменённые (<code>cancelled</code>) заказы, выведите количество заказов в каждом квартале: до 1 октября <code>Q3</code>, остальные <code>Q4</code>. Столбцы: <code>quarter</code> и количество.",
    "hints": [
     "Сначала <code>WHERE status &lt;&gt; ...</code>, затем <code>GROUP BY</code> по столбцу CASE."
    ]
   },
   {
    "title": "Скидка в зависимости от категории",
    "prompt": "Вычислите новую цену под именем <code>new_price</code>: для категории «Электроника» скидка 10% (<code>ROUND(price * 0.9)</code>), для категории «Кітаптар» скидка 20% (<code>ROUND(price * 0.8)</code>), у остальных цена не меняется. Выведите название и <code>new_price</code> только для 5 самых дорогих товаров, отсортированных по убыванию <code>new_price</code>.",
    "hints": [
     "В THEN можно записывать вычисления.",
     "<code>ORDER BY new_price DESC LIMIT 5</code>"
    ]
   }
  ]
 },
 "sql-10": {
  "pr": [
   {
    "title": "Заказ и город",
    "prompt": "Выведите <code>id</code> каждого заказа и город клиента (<code>city</code>).",
    "hints": [
     "<code>orders o JOIN customers c ON o.customer_id = c.id</code>"
    ]
   },
   {
    "title": "Название и количество товара",
    "prompt": "Для каждой строки таблицы <code>order_items</code> выведите <code>order_id</code>, название товара и количество (<code>quantity</code>).",
    "hints": [
     "<code>JOIN products p ON p.id = oi.product_id</code>"
    ]
   },
   {
    "title": "Заказы Айгерім",
    "prompt": "Выведите столбцы <code>id</code> и <code>order_date</code> заказов клиента по имени Айгерім.",
    "hints": [
     "После JOIN добавьте <code>WHERE c.name = 'Айгерім'</code>."
    ]
   },
   {
    "title": "Продажи электроники",
    "prompt": "Выведите строки о продажах товаров категории «Электроника»: <code>order_id</code>, название товара, <code>quantity</code>.",
    "hints": [
     "<code>WHERE p.category = 'Электроника'</code>"
    ]
   },
   {
    "title": "Количество штук по товарам",
    "prompt": "Выведите название каждого товара и общее количество проданных штук (непроданные товары не нужны).",
    "hints": [
     "После JOIN используйте <code>GROUP BY p.id, p.name</code>."
    ]
   },
   {
    "title": "Заказы по городам",
    "prompt": "Выведите количество заказов по каждому городу: город клиента и количество заказов.",
    "hints": [
     "Город указан в <code>customers</code>, заказ — в <code>orders</code>: объедините таблицы и <code>GROUP BY c.city</code>."
    ]
   },
   {
    "title": "Выручка по категориям",
    "prompt": "Выведите выручку каждой категории (сумма <code>quantity × price</code>) под именем <code>revenue</code>, отсортировав по убыванию выручки: <code>category</code>, <code>revenue</code>. Учитываются заказы со всеми статусами.",
    "hints": [
     "<code>SUM(oi.quantity * p.price)</code>",
     "<code>GROUP BY p.category ORDER BY revenue DESC</code>"
    ]
   },
   {
    "title": "Крупные заказы",
    "prompt": "Выведите <code>order_id</code> и выручку тех заказов, у которых сумма (<code>quantity × price</code>) больше 200 000 тенге, отсортировав по убыванию выручки.",
    "hints": [
     "Для фильтрации после группировки используйте <code>HAVING</code>.",
     "В конце запроса добавьте <code>ORDER BY revenue DESC</code>."
    ]
   }
  ]
 },
 "sql-11": {
  "pr": [
   {
    "title": "Непроданные товары",
    "prompt": "Найдите названия товаров, которые ни разу не продавались, с помощью <code>LEFT JOIN</code>.",
    "hints": [
     "<code>products p LEFT JOIN order_items oi ON oi.product_id = p.id</code>",
     "Строки без пары: <code>WHERE oi.order_id IS NULL</code>."
    ]
   },
   {
    "title": "Все клиенты и даты",
    "prompt": "Выведите имя каждого клиента и даты его заказов. Клиент без заказов тоже должен появиться хотя бы один раз (дата будет пустой).",
    "hints": [
     "Так как нужны все клиенты, <code>customers</code> должна стоять слева."
    ]
   },
   {
    "title": "Состав заказа 106",
    "prompt": "Для заказа 106 выведите имя клиента и названия товаров. Соедините четыре таблицы: <code>orders</code>, <code>customers</code>, <code>order_items</code>, <code>products</code>.",
    "hints": [
     "Пишите JOIN-ы цепочкой, и в каждом указывайте своё условие <code>ON</code>.",
     "В конце добавьте <code>WHERE o.id = 106</code>."
    ]
   },
   {
    "title": "Сколько раз продан каждый товар",
    "prompt": "Выведите название каждого товара и количество строк заказов, в которых он встречается. Непроданный товар должен показывать 0.",
    "hints": [
     "Не <code>COUNT(*)</code>, а <code>COUNT(oi.order_id)</code>: он не учитывает NULL."
    ]
   },
   {
    "title": "Общее количество штук клиента",
    "prompt": "Выведите имя каждого клиента и общее количество штук купленных им товаров. У клиента без заказов пусть будет 0 (<code>COALESCE</code>).",
    "hints": [
     "Два <code>LEFT JOIN</code>: customers → orders → order_items.",
     "<code>COALESCE(SUM(oi.quantity), 0)</code>"
    ]
   },
   {
    "title": "Что купили жители Алматы",
    "prompt": "Выведите уникальные названия товаров, которые купили клиенты из Алматы.",
    "hints": [
     "Объедините четыре таблицы и <code>WHERE c.city = ...</code>.",
     "Чтобы убрать повторы, используйте <code>DISTINCT</code>."
    ]
   },
   {
    "title": "Покупатели по категориям",
    "prompt": "Выведите, сколько разных клиентов купили товары каждой категории: <code>category</code> и количество уникальных клиентов.",
    "hints": [
     "<code>COUNT(DISTINCT o.customer_id)</code>",
     "orders → order_items → products."
    ]
   },
   {
    "title": "Выручка каждого клиента",
    "prompt": "Выведите имя каждого клиента и выручку по всем его заказам (<code>quantity × price</code> сумма) под именем <code>revenue</code>. Клиенту без заказов пусть будет 0. Отсортируйте по убыванию выручки, а при равенстве — по имени в алфавитном порядке.",
    "hints": [
     "Чтобы все клиенты сохранились в результате, все соединения должны быть <code>LEFT JOIN</code>.",
     "<code>COALESCE(SUM(...), 0)</code> и <code>ORDER BY revenue DESC, c.name</code>."
    ]
   }
  ]
 },
 "sql-12": {
  "pr": [
   {
    "title": "Самый дорогой товар",
    "prompt": "Найдите название и цену товара, цена которого равна наивысшей цене, с помощью subquery.",
    "hints": [
     "<code>WHERE price = (SELECT MAX(price) FROM products)</code>"
    ]
   },
   {
    "title": "Владельцы заказов в пути",
    "prompt": "Выведите имена клиентов, у которых есть заказ со статусом <code>shipped</code>. Используйте <code>IN</code> и subquery.",
    "hints": [
     "<code>id IN (SELECT customer_id FROM orders WHERE ...)</code>"
    ]
   },
   {
    "title": "Самый первый заказ",
    "prompt": "Выведите все столбцы заказа, оформленного самым ранним числом. Используйте subquery.",
    "hints": [
     "<code>(SELECT MIN(order_date) FROM orders)</code>"
    ]
   },
   {
    "title": "Покупатели через EXISTS",
    "prompt": "Выведите имена клиентов, у которых есть хотя бы один заказ, с помощью <code>EXISTS</code>.",
    "hints": [
     "<code>WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)</code>"
    ]
   },
   {
    "title": "Купившие книги",
    "prompt": "Выведите имена клиентов, которые купили хотя бы один товар категории «Кітаптар». Запишите без JOIN, через цепочку subquery с <code>IN</code>.",
    "hints": [
     "Начните изнутри: id книг → заказы с этими книгами → клиенты этих заказов."
    ]
   },
   {
    "title": "Дешёвые товары «Кеңсе»",
    "prompt": "Выведите название и цену товаров категории «Кеңсе», цена которых ниже средней цены этой категории.",
    "hints": [
     "Внутри subquery тоже нужно указать <code>WHERE category = 'Кеңсе'</code>."
    ]
   },
   {
    "title": "Дороже своей категории",
    "prompt": "Выведите название, категорию и цену товаров, цена которых выше средней цены <b>их собственной категории</b>. Используйте коррелированный subquery.",
    "hints": [
     "Внутренний запрос ссылается на категорию внешней строки: <code>WHERE p2.category = p.category</code>."
    ]
   },
   {
    "title": "Не покупавшие электронику",
    "prompt": "Выведите имена клиентов, у которых есть хотя бы один заказ, но которые ни разу не покупали товары категории «Электроника». Используйте <code>EXISTS</code> и <code>NOT EXISTS</code>.",
    "hints": [
     "Первое условие: есть <code>EXISTS</code>.",
     "Второе условие: внутри <code>NOT EXISTS</code> соедините orders → order_items → products через JOIN, <code>p.category = 'Электроника'</code>."
    ]
   }
  ]
 },
 "sql-13": {
  "pr": [
   {
    "title": "Таблица городов",
    "prompt": "В пустой базе данных создайте таблицу <code>cities</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>, <code>population INTEGER</code>. Добавьте три строки: (1, 'Алматы', 2200000), (2, 'Астана', 1400000), (3, 'Шымкент', 1200000).",
    "hints": [
     "Несколько строк одним <code>INSERT</code>: <code>VALUES (...), (...), (...)</code>."
    ]
   },
   {
    "title": "Новый клиент",
    "prompt": "В таблицу <code>customers</code> добавьте нового клиента: id 11, имя Ғалым, город Павлодар, дата регистрации 2024-12-05.",
    "hints": [
     "<code>INSERT INTO customers (id, name, city, signup_date) VALUES (...)</code>"
    ]
   },
   {
    "title": "Новая цена термоса",
    "prompt": "Измените цену термоса на 10 000 тенге.",
    "hints": [
     "<code>UPDATE products SET price = 10000 WHERE name = 'Термос'</code>",
     "Не забудьте WHERE, иначе изменится цена всех товаров."
    ]
   },
   {
    "title": "Удаление строк с большим количеством",
    "prompt": "Из таблицы <code>order_items</code> удалите строки, в которых количество 5 и больше.",
    "hints": [
     "<code>DELETE FROM order_items WHERE quantity &gt;= 5</code>"
    ]
   },
   {
    "title": "Значение DEFAULT",
    "prompt": "В пустой базе данных создайте таблицу <code>students</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>, <code>grade INTEGER</code> (значение по умолчанию 1). Затем добавьте двух учеников, указав только <code>id</code> и <code>name</code>: (1, 'Аружан') и (2, 'Мирас'). Их <code>grade</code> должно стать 1 автоматически.",
    "hints": [
     "<code>grade INTEGER DEFAULT 1</code>",
     "В INSERT назовите столбцы: <code>INSERT INTO students (id, name) VALUES ...</code>"
    ]
   },
   {
    "title": "Заполнить пустой город",
    "prompt": "Обновите город клиентов, у которых город не указан, на Павлодар.",
    "hints": [
     "Значение NULL ищем через <code>IS NULL</code>: <code>WHERE city IS NULL</code>."
    ]
   },
   {
    "title": "Школа и ученики",
    "prompt": "В пустой базе данных создайте две таблицы. <code>schools</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT NOT NULL</code>. <code>pupils</code>: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT</code>, <code>school_id INTEGER</code> — ссылка на <code>schools(id)</code> (<code>REFERENCES</code>). Школы: (1, '№12 мектеп'), (2, 'НЗМ'), (3, '№5 лицей'). Ученики: (1, 'Әлия', 1), (2, 'Санжар', 1), (3, 'Томирис', 2).",
    "hints": [
     "Сначала создаётся <code>schools</code>, а затем <code>pupils</code>, который на неё ссылается.",
     "<code>school_id INTEGER REFERENCES schools(id)</code>"
    ]
   },
   {
    "title": "Метка VIP",
    "prompt": "В таблицу <code>customers</code> добавьте столбец <code>vip INTEGER</code> со значением по умолчанию 0. Затем у клиентов, у которых не меньше 2 заказов, сделайте <code>vip</code> равным 1 (используйте subquery).",
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
    "title": "Дорогие товары VIEW",
    "prompt": "Создайте VIEW с именем <code>expensive_products</code>: столбцы <code>name</code> и <code>price</code> товаров, цена которых выше 50 000 тенге.",
    "hints": [
     "<code>CREATE VIEW expensive_products AS SELECT ...</code>"
    ]
   },
   {
    "title": "Подтверждение через COMMIT",
    "prompt": "Откройте транзакцию, измените статус заказа 109 на <code>delivered</code> и подтвердите изменение с помощью <code>COMMIT</code>.",
    "hints": [
     "<code>BEGIN;</code> → <code>UPDATE ...;</code> → <code>COMMIT;</code>"
    ]
   },
   {
    "title": "Подсчёт строк VIEW",
    "prompt": "Создайте VIEW с именем <code>almaty_customers</code> (для клиентов из Алматы: <code>id</code> и <code>name</code>), затем выведите количество строк в этом VIEW.",
    "hints": [
     "VIEW читается как таблица: <code>SELECT COUNT(*) FROM almaty_customers;</code>"
    ]
   },
   {
    "title": "Полное удаление заказа",
    "prompt": "Заказ 112 отменён. В одной транзакции сначала удалите его строки в <code>order_items</code>, затем строку в <code>orders</code> и выполните <code>COMMIT</code>.",
    "hints": [
     "Два <code>DELETE</code> внутри одного <code>BEGIN ... COMMIT</code>.",
     "Сначала очищается зависимая таблица (<code>order_items</code>)."
    ]
   },
   {
    "title": "Откат к SAVEPOINT",
    "prompt": "В транзакции: поднимите цену товаров категории «Кеңсе» на 1 000 тенге, затем создайте <code>SAVEPOINT s1</code>. Потом по ошибке поставьте этим товарам цену 0 и откатитесь через <code>ROLLBACK TO s1</code>. В конце выполните <code>COMMIT</code>. В результате должно остаться только повышение на 1 000 тенге.",
    "hints": [
     "<code>ROLLBACK TO s1</code> отменяет только изменения, сделанные после SAVEPOINT."
    ]
   },
   {
    "title": "VIEW статистики по категориям",
    "prompt": "Создайте VIEW с именем <code>category_stats</code>: для каждой категории <code>category</code>, количество товаров <code>n</code> и самая высокая цена <code>max_price</code>.",
    "hints": [
     "Внутри VIEW можно использовать <code>GROUP BY</code>."
    ]
   },
   {
    "title": "VIEW выручки по заказам",
    "prompt": "Создайте VIEW с именем <code>order_revenue</code>: для каждого заказа <code>order_id</code>, имя клиента <code>name</code> и выручка <code>revenue</code> (<code>quantity × price</code> сумма). Соедините таблицы orders, customers, order_items, products.",
    "hints": [
     "Запрос внутри VIEW — обычный SELECT: JOIN и GROUP BY.",
     "Дайте столбцам имена <code>AS order_id</code>, <code>AS revenue</code>."
    ]
   },
   {
    "title": "VIEW видит новые данные",
    "prompt": "Создайте VIEW с именем <code>delivered_count</code>: сгруппируйте заказы по <code>delivered</code> и выведите <code>customer_id</code> и количество <code>n</code>. Затем обновите все <code>shipped</code> заказы, сделав их <code>delivered</code>. В конце выведите VIEW, отсортировав по <code>customer_id</code>: он должен показать данные после обновления.",
    "hints": [
     "VIEW не хранит данные: при каждом чтении запрос выполняется заново.",
     "Три команды: <code>CREATE VIEW</code>, <code>UPDATE</code>, <code>SELECT</code>."
    ]
   }
  ]
 }
} });
