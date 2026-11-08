// cleaning practice tasks: Russian text. Code, solutions and checks are in content/practice/cleaning.js.
DJ.i18n.patch({ lessons: {
 "cl-1": {
  "pr": [
   {
    "title": "Профиль заказов",
    "prompt": "<p>Для таблицы <code>raw_orders</code> выведите в одной строке: <code>n</code> (количество строк), <code>null_amount</code> (строки с пустой суммой), <code>uniq_customers</code> (количество уникальных <code>customer_id</code>).</p>",
    "hints": [
     "<code>SUM(amount IS NULL)</code>, <code>COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "Диапазон дат регистрации",
    "prompt": "<p>Из таблицы <code>raw_customers</code> выведите <code>first_signup</code> (<code>MIN(signup)</code>) и <code>last_signup</code> (<code>MAX(signup)</code>). Результат логичен? Почему?</p>",
    "hints": [
     "<code>MIN(signup)</code>, <code>MAX(signup)</code>. Даты сравниваются как текст, поэтому даты в разном формате встают не в том порядке."
    ]
   },
   {
    "title": "Повторяющиеся имена",
    "prompt": "<p>Из таблицы <code>raw_customers</code> выведите имена, которые встречаются несколько раз: <code>name</code>, <code>n</code>. Группируйте имена без изменений, как они записаны.</p>",
    "hints": [
     "<code>GROUP BY name HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "Процент пустых значений",
    "prompt": "<p>Для таблицы <code>raw_customers</code> выведите в одной строке долю пустых значений в каждом столбце в процентах (с одним знаком после запятой): <code>pct_email</code>, <code>pct_city</code>, <code>pct_phone</code>.</p>",
    "hints": [
     "<code>ROUND(100.0 * SUM(email IS NULL) / COUNT(*), 1)</code>"
    ]
   },
   {
    "title": "Заказы по месяцам",
    "prompt": "<p>В таблице <code>raw_orders</code> выведите, сколько заказов в каждом месяце: <code>month</code> (первые 7 символов <code>order_date</code>), <code>n</code>. По порядку месяцев.</p>",
    "hints": [
     "<code>substr(order_date, 1, 7)</code>"
    ]
   },
   {
    "title": "Неполные записи",
    "prompt": "<p>Выведите клиентов, у которых пусто хотя бы одно из полей: email, город или телефон: <code>id</code>, <code>name</code>.</p>",
    "hints": [
     "Объедините три условия через <code>OR</code>."
    ]
   },
   {
    "title": "Клиенты без заказов",
    "prompt": "<p>Найдите клиентов, у которых нет ни одного заказа: <code>id</code>, <code>name</code>, <code>email</code>. Используйте <code>LEFT JOIN</code>. Посмотрите на строки результата: кем они могут быть?</p>",
    "hints": [
     "<code>LEFT JOIN raw_orders o ON o.customer_id = c.id</code>",
     "В строках без подходящего заказа <code>o.id IS NULL</code>."
    ]
   },
   {
    "title": "Профиль столбцов в одной таблице",
    "prompt": "<p>Выведите профиль столбцов таблицы <code>raw_customers</code> в одной таблице: <code>col</code> (название столбца: <code>email</code>, <code>city</code>, <code>phone</code>), <code>nulls</code> (пустые значения), <code>uniq</code> (уникальные значения). Объедините три запроса через <code>UNION ALL</code>.</p>",
    "hints": [
     "Каждая часть: <code>SELECT 'email' AS col, SUM(email IS NULL) AS nulls, COUNT(DISTINCT email) AS uniq FROM raw_customers</code>.",
     "Между частями поставьте <code>UNION ALL</code>."
    ]
   }
  ]
 },
 "cl-2": {
  "pr": [
   {
    "title": "Метка вместо email",
    "prompt": "<p>Для каждого клиента выведите столбцы <code>id</code>, <code>name</code> и <code>email</code>. Если email пуст, пусть будет написано <code>email жоқ</code>.</p>",
    "hints": [
     "<code>COALESCE(email, 'email жоқ')</code>"
    ]
   },
   {
    "title": "Подсчёт пропусков",
    "prompt": "<p>Функция <code>count_missing(xs)</code> должна считать пропуски в списке: <code>None</code> и пустой или состоящий только из пробелов текст (<code>\"\"</code>, <code>\"  \"</code>) считаются пропусками. Например, <code>count_missing([\"Алматы\", None, \"\", \" \", \"Астана\"])</code> → <code>3</code>.</p>",
    "hints": [
     "<code>x is None</code> или <code>x.strip() == \"\"</code>.",
     "Для чисел нет <code>strip</code>: сначала проверьте <code>isinstance(x, str)</code>."
    ],
    "check": {
     "tests": "assert count_missing([\"Алматы\", None, \"\", \" \", \"Астана\"]) == 3, \"count_missing(['Алматы', None, '', ' ', 'Астана']) должно быть 3\"\nassert count_missing([1, 2, None]) == 1, \"В списке чисел пропуском является только None: 1\"\nassert count_missing([]) == 0, \"Пустой список: 0\""
    }
   },
   {
    "title": "Заказы без суммы",
    "prompt": "<p>Из таблицы <code>raw_orders</code> выведите заказы с пустой суммой: <code>id</code>, <code>customer_id</code>, <code>order_date</code>.</p>",
    "hints": [
     "<code>WHERE amount IS NULL</code> (<code>= NULL</code> не работает)."
    ]
   },
   {
    "title": "Заполнить неизвестным",
    "prompt": "<p>Функция <code>fill_unknown(cities)</code> должна возвращать <b>новый</b> список: <code>None</code> и пустой текст (в том числе из пробелов) заменяются на <code>\"Белгісіз\"</code>, остальное не меняется. Например, <code>fill_unknown([\"Алматы\", None, \" \"])</code> → <code>[\"Алматы\", \"Белгісіз\", \"Белгісіз\"]</code>.</p>",
    "hints": [
     "Используйте условие <code>c is None or c.strip() == \"\"</code> (порядок важен: сначала проверка на None)."
    ],
    "check": {
     "tests": "_src = [\"Алматы\", None, \" \", \"Ақтөбе\", \"\"]\n_r = fill_unknown(_src)\nassert _r == [\"Алматы\", \"Белгісіз\", \"Белгісіз\", \"Ақтөбе\", \"Белгісіз\"], f\"Результат неверен: {_r}\"\nassert _src == [\"Алматы\", None, \" \", \"Ақтөбе\", \"\"], \"Не меняйте исходный список\""
    }
   },
   {
    "title": "Метка пустого города",
    "prompt": "<p>Для каждого клиента выведите <code>id</code>, <code>city</code> и <code>city_missing</code>: 1, если город <code>NULL</code> или пустой текст, иначе 0.</p>",
    "hints": [
     "Выражение <code>(city IS NULL OR TRIM(city) = '')</code> даёт 1 или 0."
    ]
   },
   {
    "title": "Заполнение модой",
    "prompt": "<p>Категориальный столбец заполним модой. Функция <code>fill_mode(xs)</code> должна возвращать новый список, в котором значения <code>None</code> заменены на моду остальных значений (<code>statistics.mode</code>). Например, <code>fill_mode([\"iOS\", None, \"Android\", \"iOS\"])</code> → <code>[\"iOS\", \"iOS\", \"Android\", \"iOS\"]</code>.</p>",
    "hints": [
     "Не вставляйте <code>None</code> в моду: сначала отфильтруйте."
    ],
    "check": {
     "tests": "assert fill_mode([\"iOS\", None, \"Android\", \"iOS\"]) == [\"iOS\", \"iOS\", \"Android\", \"iOS\"], \"fill_mode(['iOS', None, 'Android', 'iOS']) неверно\"\nassert fill_mode([None, \"Астана\", \"Алматы\", \"Астана\", None]) == [\"Астана\", \"Астана\", \"Алматы\", \"Астана\", \"Астана\"], \"Мода должна быть Астана\"\nassert fill_mode([\"a\", \"b\"]) == [\"a\", \"b\"], \"Если пустых значений нет, список не меняется\""
    }
   },
   {
    "title": "Заполнение и метка",
    "prompt": "<p>Функция <code>fill_with_flag(rows, key)</code> получает список словарей и возвращает <b>новый</b> список словарей: значения <code>None</code> в столбце <code>key</code> заполняются медианой остальных, и в каждую строку добавляется ключ <code>key + \"_missing\"</code> (<code>True</code>, если изначально было пусто). Исходные словари не должны меняться.</p><p>Например, <code>[{\"id\": 1, \"age\": 30}, {\"id\": 2, \"age\": None}, {\"id\": 3, \"age\": 40}]</code> → вторая строка <code>{\"id\": 2, \"age\": 35.0, \"age_missing\": True}</code>.</p>",
    "hints": [
     "Копия: <code>new = dict(r)</code>.",
     "Ставьте метку <b>до</b> заполнения."
    ],
    "check": {
     "tests": "_rows = [{\"id\": 1, \"age\": 30}, {\"id\": 2, \"age\": None}, {\"id\": 3, \"age\": 40}]\n_r = fill_with_flag(_rows, \"age\")\nassert _r == [{\"id\": 1, \"age\": 30, \"age_missing\": False}, {\"id\": 2, \"age\": 35, \"age_missing\": True}, {\"id\": 3, \"age\": 40, \"age_missing\": False}], f\"Результат неверен: {_r}\"\nassert _rows[1] == {\"id\": 2, \"age\": None}, \"Не меняйте исходные словари: сделайте копию через dict(r)\""
    }
   },
   {
    "title": "Пустые контакты по городам",
    "prompt": "<p>Проверьте полноту данных о контактах по городам: <code>city</code> (если пусто, то <code>Белгісіз</code>), <code>n</code> (количество клиентов), <code>no_contact</code> (количество клиентов без email или телефона). Группируйте без изменения города (без TRIM).</p>",
    "hints": [
     "<code>GROUP BY COALESCE(city, 'Белгісіз')</code>",
     "<code>SUM(email IS NULL OR phone IS NULL)</code>"
    ]
   }
  ]
 },
 "cl-3": {
  "pr": [
   {
    "title": "Пробелы в телефоне",
    "prompt": "<p>Выведите <code>id</code> и столбец <code>phone</code> у клиентов с телефоном, где убраны пробелы.</p>",
    "hints": [
     "<code>REPLACE(phone, ' ', '')</code>"
    ]
   },
   {
    "title": "Очистка имени",
    "prompt": "<p>Функция <code>clean_name(s)</code> должна очистить имя: убрать пробелы в начале и в конце, первую букву сделать заглавной, остальные строчными (<code>str.capitalize()</code>). Например, <code>clean_name(\"  айГЕРІМ \")</code> → <code>\"Айгерім\"</code>.</p>",
    "hints": [
     "<code>s.strip().capitalize()</code>"
    ],
    "check": {
     "tests": "assert clean_name(\"  айГЕРІМ \") == \"Айгерім\", \"clean_name('  айГЕРІМ ') должно быть Айгерім\"\nassert clean_name(\"НҰРЛАН\") == \"Нұрлан\", \"clean_name('НҰРЛАН') должно быть Нұрлан\"\nassert clean_name(\"Дана\") == \"Дана\", \"Чистое имя не меняется\""
    }
   },
   {
    "title": "Все варианты названия города",
    "prompt": "<p>Выведите список уникальных названий городов без лишних пробелов: <code>city</code> (<code>TRIM</code>, <code>DISTINCT</code>). Пустые города не включайте.</p>",
    "hints": [
     "<code>SELECT DISTINCT TRIM(city) ...</code>"
    ]
   },
   {
    "title": "Очистка по словарю городов",
    "prompt": "<p>Функция <code>clean_city(s)</code> должна стандартизировать город через <code>CITY_MAP</code>: ключ — текст без пробелов в нижнем регистре. Если его нет в словаре, вернуть текст без лишних пробелов; <code>None</code> → <code>None</code>.</p>",
    "hints": [
     "<code>CITY_MAP.get(s.strip().lower(), s.strip())</code>"
    ],
    "check": {
     "tests": "assert clean_city(\" АЛМАТЫ \") == \"Алматы\", \"clean_city(' АЛМАТЫ ') должно быть Алматы\"\nassert clean_city(\"Shymkent\") == \"Шымкент\", \"clean_city('Shymkent') должно быть Шымкент\"\nassert clean_city(\"Ақтөбе \") == \"Ақтөбе\", \"Города нет в словаре: Ақтөбе (без пробелов)\"\nassert clean_city(None) is None, \"None → None\""
    }
   },
   {
    "title": "Количество очищенных городов",
    "prompt": "<p>Объедините города и выведите, сколько клиентов в каждом: <code>city_clean</code>, <code>n</code>. Правила: <code>Алматы</code>, <code>алматы</code>, <code>Almaty</code> → <code>Алматы</code>; <code>Астана</code>, <code>Astana</code> → <code>Астана</code>; остальное — после <code>TRIM</code> (пустой город тоже образует одну группу).</p>",
    "hints": [
     "Дайте выражению CASE имя <code>AS city_clean</code>, затем <code>GROUP BY city_clean</code>."
    ]
   },
   {
    "title": "Правильный ли телефон",
    "prompt": "<p>Функция <code>valid_phone(p)</code> должна оставить в телефоне только цифры (<code>re.sub(r\"\\D\", \"\", p)</code>), заменить первую <code>8</code> на <code>7</code> и вернуть <code>True</code>, если номер начинается с <code>7</code> и всего 11 цифр, иначе <code>False</code>. <code>None</code> → <code>False</code>.</p>",
    "hints": [
     "<code>len(d) == 11</code> и <code>d.startswith(\"7\")</code>."
    ],
    "check": {
     "tests": "assert valid_phone(\"8 (701) 333-44-55\") is True, \"8 (701) 333-44-55 — правильный номер\"\nassert valid_phone(\"+7 701 111 2233\") is True, \"+7 701 111 2233 — правильный номер\"\nassert valid_phone(\"8701222\") is False, \"Цифр мало: False\"\nassert valid_phone(\"+1 202 555 0147\") is False, \"Номер начинается с +1: False\"\nassert valid_phone(None) is False, \"None → False\""
    }
   },
   {
    "title": "Телефон в одном формате",
    "prompt": "<p>Для клиентов с телефоном выведите <code>id</code> и <code>phone_clean</code>: убрать пробелы, скобки, дефисы и <code>+</code>, первую <code>8</code> заменить на <code>7</code>, и в конце поставить <code>+</code> перед номером. Например, <code>8 (701) 333-44-55</code> → <code>+77013334455</code>.</p>",
    "hints": [
     "Вложите несколько <code>REPLACE</code> друг в друга.",
     "Первая цифра: <code>substr(digits, 1, 1)</code>, остальное: <code>substr(digits, 2)</code>. Текст соединяет <code>||</code>."
    ]
   },
   {
    "title": "Отчёт по городам",
    "prompt": "<p>Функция <code>city_counts(cities)</code> должна очистить список городов и вернуть словарь <code>{таза_қала: саны}</code>. Очистка: <code>strip</code>, затем поиск в нижнем регистре в <code>CITY_MAP</code> (если не найдено, текст после strip). Значения <code>None</code> и пустой текст не учитывайте.</p>",
    "hints": [
     "Сначала пропустите пустые значения через <code>continue</code>.",
     "Подсчёт: <code>out[c] = out.get(c, 0) + 1</code>."
    ],
    "check": {
     "tests": "_c = [\"Алматы\", \"алматы\", \"Almaty \", \"АСТАНА\", None, \"Ақтөбе\", \"\", \"astana\", \"Қарағанды \"]\n_r = city_counts(_c)\nassert _r == {\"Алматы\": 3, \"Астана\": 2, \"Ақтөбе\": 1, \"Қарағанды\": 1}, f\"Результат неверен: {_r}\""
    }
   }
  ]
 },
 "cl-4": {
  "pr": [
   {
    "title": "Повторяющиеся имена",
    "prompt": "<p>После удаления пробелов выведите имена, которые встречаются несколько раз: <code>name</code> (<code>TRIM</code>), <code>n</code>.</p>",
    "hints": [
     "<code>GROUP BY TRIM(name) HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "Отчёт по email",
    "prompt": "<p>Выведите в одной строке: <code>n</code> (все строки), <code>with_email</code> (строки с email, <code>COUNT(email)</code>), <code>uniq_email</code> (уникальные email без учёта регистра).</p>",
    "hints": [
     "<code>COUNT(DISTINCT LOWER(email))</code>"
    ]
   },
   {
    "title": "Повторяющиеся телефоны",
    "prompt": "<p>Найдите телефоны, записанные абсолютно одинаково: <code>phone</code>, <code>n</code> (только больше 1). Пустые телефоны не учитывайте.</p>",
    "hints": [
     "<code>WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "Сами дубликаты",
    "prompt": "<p>Выведите всех клиентов, email которых (без учёта регистра) повторяется в другой записи: <code>id</code>, <code>name</code>, <code>email</code>. Отсортируйте по email в нижнем регистре, затем по <code>id</code>.</p>",
    "hints": [
     "Подзапрос даёт повторяющиеся email (шаг 1 из урока).",
     "<code>WHERE LOWER(email) IN (...)</code>"
    ]
   },
   {
    "title": "Число лишних записей",
    "prompt": "<p>Сколько лишних записей (дубликатов) среди строк с email? Выведите одно значение: <code>extra</code> = количество строк − количество уникальных email (без учёта регистра).</p>",
    "hints": [
     "<code>COUNT(*) - COUNT(DISTINCT LOWER(email))</code>"
    ]
   },
   {
    "title": "Оставить последнюю запись",
    "prompt": "<p>На этот раз для каждого email оставьте запись с самым <b>большим</b> <code>id</code> (самую позднюю регистрацию). Выведите <code>id</code>, <code>name</code> и <code>email</code> в нижнем регистре для клиентов с email.</p>",
    "hints": [
     "<code>ORDER BY id DESC</code> и <code>ROW_NUMBER()</code>."
    ]
   },
   {
    "title": "Дубликаты по телефону",
    "prompt": "<p>Найдите дубликаты после приведения телефона к одному виду. Очистка: убрать пробелы, скобки, дефисы, <code>+</code>, а <code>8</code> в начале заменить на <code>7</code>. Выведите <code>phone_clean</code> (только цифры) и <code>n</code> (только больше 1).</p>",
    "hints": [
     "Сначала очистите в CTE (несколько <code>REPLACE</code> и <code>CASE</code>), затем <code>GROUP BY ... HAVING</code>."
    ]
   },
   {
    "title": "Перенос заказов на основную запись",
    "prompt": "<p>Компания решила оставить для каждого клиента последнюю зарегистрированную запись. Перед удалением дубликата перенесём заказы на эту запись. Для каждого заказа выведите <code>id</code>, <code>customer_id</code> и <code>keep_id</code>: наибольший <code>id</code> среди записей с таким же email (без учёта регистра). Если email пуст, <code>keep_id = customer_id</code>.</p>",
    "hints": [
     "Соедините <code>raw_orders</code> и <code>raw_customers</code> через JOIN.",
     "Подзапрос: <code>SELECT MAX(c2.id) FROM raw_customers c2 WHERE LOWER(c2.email) = LOWER(c.email)</code>, для пустого email — <code>COALESCE</code>."
    ]
   }
  ]
 },
 "cl-5": {
  "pr": [
   {
    "title": "Крупные заказы",
    "prompt": "<p>Переведите сумму в число и выведите заказы больше 10 000: <code>id</code>, <code>amount_num</code>.</p>",
    "hints": [
     "Выражение <code>CAST(REPLACE(amount, ' ', '') AS INTEGER)</code> используйте и в <code>WHERE</code>."
    ]
   },
   {
    "title": "Превратить текст в число",
    "prompt": "<p>Функция <code>to_int(s)</code> должна превращать текст с пробелами в целое число: <code>\"12 500\"</code> → <code>12500</code>. Если превратить нельзя (<code>\"abc\"</code>) или передано <code>None</code>, вернуть <code>None</code>.</p>",
    "hints": [
     "<code>try: int(...) except ValueError: return None</code>"
    ],
    "check": {
     "tests": "assert to_int(\"12 500\") == 12500, \"to_int('12 500') должно быть 12500\"\nassert to_int(\"-500\") == -500, \"to_int('-500') должно быть -500\"\nassert to_int(\"abc\") is None, \"to_int('abc') должно быть None\"\nassert to_int(None) is None, \"to_int(None) должно быть None\""
    }
   },
   {
    "title": "Дату с точками в ISO",
    "prompt": "<p>Функция <code>dmy_to_iso(s)</code> должна превратить дату <code>DD.MM.YYYY</code> в текст <code>YYYY-MM-DD</code>. Например, <code>dmy_to_iso(\"15.02.2024\")</code> → <code>\"2024-02-15\"</code>.</p>",
    "hints": [
     "<code>datetime.strptime(s, \"%d.%m.%Y\").strftime(\"%Y-%m-%d\")</code>"
    ],
    "check": {
     "tests": "assert dmy_to_iso(\"15.02.2024\") == \"2024-02-15\", \"dmy_to_iso('15.02.2024') должно быть 2024-02-15\"\nassert dmy_to_iso(\"01.12.2023\") == \"2023-12-01\", \"dmy_to_iso('01.12.2023') должно быть 2023-12-01\""
    }
   },
   {
    "title": "Подсчёт форматов дат",
    "prompt": "<p>Какие форматы есть в столбце <code>signup</code>? Выведите <code>fmt</code> и <code>n</code>. <code>fmt</code>: если <code>signup GLOB '[0-9][0-9][0-9][0-9]-*'</code>, то <code>ISO</code>; если в тексте есть точка (<code>LIKE '%.%'</code>), то <code>нүкте</code>; иначе <code>басқа</code>.</p>",
    "hints": [
     "В выражении CASE дайте имя <code>AS fmt</code>, затем <code>GROUP BY fmt</code>."
    ]
   },
   {
    "title": "Сумма корректных сумм",
    "prompt": "<p>Функция <code>total_amount(values)</code> должна сложить суммы из списка текстов, которые превращаются в числа (после удаления пробелов), и вернуть сумму. <code>None</code> и значения, которые не превращаются в числа, пропускаются. Например, <code>total_amount([\"12 500\", None, \"abc\", \"8000\"])</code> → <code>20500</code>.</p>",
    "hints": [
     "В цикле <code>try / except ValueError</code>."
    ],
    "check": {
     "tests": "assert total_amount([\"12 500\", None, \"abc\", \"8000\"]) == 20500, \"total_amount(['12 500', None, 'abc', '8000']) должно быть 20500\"\nassert total_amount([]) == 0, \"Пустой список: 0\"\nassert total_amount([\"7 200\", \"-200\"]) == 7000, \"Отрицательное число тоже число: 7000\""
    }
   },
   {
    "title": "Сколько дней между датами",
    "prompt": "<p>Функция <code>days_between(a, b)</code> должна возвращать количество дней между двумя датами в формате <code>DD.MM.YYYY</code> (<code>b − a</code>). Если вычесть один <code>datetime</code> из другого, свойство <code>.days</code> даёт число дней. Например, <code>days_between(\"25.12.2024\", \"01.01.2025\")</code> → <code>7</code>.</p>",
    "hints": [
     "<code>(d2 - d1).days</code>"
    ],
    "check": {
     "tests": "assert days_between(\"25.12.2024\", \"01.01.2025\") == 7, \"days_between('25.12.2024', '01.01.2025') должно быть 7\"\nassert days_between(\"01.02.2024\", \"01.03.2024\") == 29, \"В 2024 году в феврале 29 дней: 29\"\nassert days_between(\"10.05.2024\", \"10.05.2024\") == 0, \"Один день: 0\""
    }
   },
   {
    "title": "Приведение дат к ISO",
    "prompt": "<p>Выведите для каждого клиента <code>id</code> и <code>signup_iso</code>: даты <code>DD.MM.YYYY</code> превращаются в <code>YYYY-MM-DD</code> с помощью <code>substr</code>; в датах <code>YYYY/MM/DD</code> заменяем <code>/</code> → <code>-</code>; даты в ISO не меняются.</p>",
    "hints": [
     "<code>15.02.2024</code>: год <code>substr(signup, 7, 4)</code>, месяц <code>substr(signup, 4, 2)</code>, день <code>substr(signup, 1, 2)</code>.",
     "Соедините части через <code>||</code>."
    ]
   },
   {
    "title": "Чистая сумма по месяцам",
    "prompt": "<p>Считайте только корректные суммы: если сумма без пробелов состоит только из цифр (<code>NOT GLOB '*[^0-9]*'</code>) и больше 0. Для каждого месяца выведите <code>month</code> (YYYY-MM) и <code>total</code>, по порядку месяцев.</p>",
    "hints": [
     "В CTE возьмите <code>REPLACE(amount, ' ', '') AS a</code> и выделите месяц.",
     "Снаружи <code>WHERE a NOT GLOB '*[^0-9]*'</code>, затем <code>GROUP BY month</code>."
    ]
   }
  ]
 },
 "cl-6": {
  "pr": [
   {
    "title": "Отрицательные суммы",
    "prompt": "<p>Выведите заказы, у которых сумма (после преобразования в число) меньше нуля: <code>id</code>, <code>amount</code> (исходный текст).</p>",
    "hints": [
     "<code>WHERE CAST(REPLACE(amount, ' ', '') AS INTEGER) &lt; 0</code>"
    ]
   },
   {
    "title": "Слишком крупные заказы",
    "prompt": "<p>Лимит бизнеса: один заказ не больше 200 000 ₸. Выведите заказы, которые превышают лимит: <code>id</code>, <code>customer_id</code>, <code>amount_num</code>.</p>",
    "hints": [
     "Сначала превратите в число, затем <code>&gt; 200000</code>."
    ]
   },
   {
    "title": "Есть ли сумма",
    "prompt": "<p>Для каждого заказа выведите <code>id</code> и <code>has_amount</code>: если сумма пустая, <code>жоқ</code>, иначе <code>бар</code>.</p>",
    "hints": [
     "<code>CASE WHEN amount IS NULL THEN 'жоқ' ELSE 'бар' END</code>"
    ]
   },
   {
    "title": "Подсчёт по меткам",
    "prompt": "<p>По правилам из урока (NULL → <code>жоқ</code>; ≤ 0 → <code>қате</code>; &gt; 200 000 → <code>күдікті</code>; иначе <code>ok</code>) выведите, сколько заказов у каждой метки: <code>flag</code>, <code>n</code>.</p>",
    "hints": [
     "В CTE возьмите <code>amount_num</code>, снаружи CASE и <code>GROUP BY flag</code>."
    ]
   },
   {
    "title": "Чистый средний чек",
    "prompt": "<p>Выведите одним значением <code>avg_ok</code> — среднюю сумму только заказов с меткой <code>ok</code> (сумма есть, больше 0, не больше 200 000).</p>",
    "hints": [
     "Соедините три условия через <code>AND</code>."
    ]
   },
   {
    "title": "Клиенты с проблемными заказами",
    "prompt": "<p>Выведите клиентов, у которых хотя бы один заказ не <code>ok</code> (нет суммы, ≤ 0 или больше 200 000): <code>id</code>, <code>name</code> (<code>TRIM</code>). Каждый клиент — один раз.</p>",
    "hints": [
     "Соедините CTE с <code>raw_customers</code> через JOIN.",
     "<code>DISTINCT</code> оставляет одного клиента один раз."
    ]
   },
   {
    "title": "Доля проблемных строк",
    "prompt": "<p>Выведите одним значением долю заказов, которые не <code>ok</code>, в процентах <code>bad_pct</code> (с одним знаком после запятой). Используйте два CTE: в первом <code>amount_num</code>, во втором <code>flag</code>.</p>",
    "hints": [
     "Второй CTE: <code>f AS (SELECT CASE ... END AS flag FROM o)</code>.",
     "<code>ROUND(100.0 * SUM(flag &lt;&gt; 'ok') / COUNT(*), 1)</code>"
    ]
   },
   {
    "title": "Качество по клиенту",
    "prompt": "<p>Для каждого клиента (<code>customer_id</code>) выведите: <code>orders</code> (число заказов), <code>bad</code> (заказы, которые не <code>ok</code>), <code>ok_total</code> (сумма только <code>ok</code> заказов, если их нет — 0). Сортировка по <code>customer_id</code>.</p>",
    "hints": [
     "Условная сумма: <code>SUM(CASE WHEN flag = 'ok' THEN amount_num END)</code>.",
     "Пустой результат <code>COALESCE(..., 0)</code> превращает в 0."
    ]
   }
  ]
 },
 "cl-7": {
  "pr": [
   {
    "title": "Подсчёт строк CSV",
    "prompt": "<p>Функция <code>count_rows(text)</code> должна возвращать количество строк с данными в тексте CSV (строку заголовка не считать). Используйте <code>csv.DictReader</code>.</p>",
    "hints": [
     "<code>for row in csv.DictReader(io.StringIO(text))</code>"
    ],
    "check": {
     "tests": "assert count_rows(\"city,amount\\nАлматы,1\\nАстана,2\") == 2, \"Есть 2 строки данных\"\nassert count_rows(\"a,b\\n1,2\\n3,4\\n5,6\") == 3, \"Есть 3 строки данных\"\nassert count_rows(\"a,b\") == 0, \"Только заголовок: 0\""
    }
   },
   {
    "title": "Получить столбец списком",
    "prompt": "<p>Функция <code>column(text, name)</code> должна вернуть значения столбца <code>name</code> из CSV (в виде текста) списком в порядке строк. Например, <code>column(\"city,amount\\nАлматы,12000\\nАстана,8000\", \"city\")</code> → <code>[\"Алматы\", \"Астана\"]</code>.</p>",
    "hints": [
     "<code>[row[name] for row in ...]</code>"
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\"\nassert column(_t, \"city\") == [\"Алматы\", \"Астана\"], \"Столбец city: ['Алматы', 'Астана']\"\nassert column(_t, \"amount\") == [\"12000\", \"8000\"], \"Значения amount в виде текста: ['12000', '8000']\""
    }
   },
   {
    "title": "Уникальные города",
    "prompt": "<p>Функция <code>unique_cities(text)</code> должна вернуть список уникальных значений столбца <code>city</code> из CSV, отсортированный по алфавиту (<code>sorted</code>).</p>",
    "hints": [
     "Для уникальных значений используйте <code>set</code>, затем <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\nassert unique_cities(_t) == sorted([\"Алматы\", \"Астана\", \"Шымкент\"]), f\"Результат неверен: {unique_cities(_t)}\"\nassert unique_cities(\"city\\nА\\nА\") == [\"А\"], \"Повторяющееся значение учитывается один раз\""
    }
   },
   {
    "title": "Медиана по городам",
    "prompt": "<p>Если есть крайние значения, медиана надёжнее. Функция <code>median_by_city(text)</code> должна возвращать словарь <code>{қала: amount медианасы}</code> (<code>statistics.median</code>). Суммы — это текст, превратите их в <code>int</code>.</p>",
    "hints": [
     "Соберите суммы каждого города в список: <code>groups.setdefault(city, []).append(...)</code>."
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\n_r = median_by_city(_t)\nassert _r == {\"Алматы\": 9000, \"Астана\": 8000, \"Шымкент\": 6000}, f\"Алматы 9000, Астана 8000, Шымкент 6000 должно быть, у вас {_r}\""
    }
   },
   {
    "title": "Чек в выходные",
    "prompt": "<p>В CSV есть столбцы <code>day</code> (день недели) и <code>amount</code>. Функция <code>weekend_check(text)</code> должна возвращать словарь <code>{\"демалыс\": медиана, \"жұмыс\": медиана}</code>: <code>сенбі</code> и <code>жексенбі</code> — выходные, остальные дни — рабочие.</p>",
    "hints": [
     "<code>row[\"day\"] in (\"сенбі\", \"жексенбі\")</code>"
    ],
    "check": {
     "tests": "_t = \"day,amount\\nдүйсенбі,2000\\nсенбі,3000\\nсәрсенбі,2200\\nжексенбі,2800\\nжұма,40000\\nсенбі,2900\"\n_r = weekend_check(_t)\nassert _r == {\"демалыс\": 2900, \"жұмыс\": 2200}, f\"Выходные 2900, рабочие 2200 должно быть, у вас {_r}\""
    }
   },
   {
    "title": "Город с наибольшей выручкой",
    "prompt": "<p>Функция <code>top_city(text)</code> должна возвращать пару <code>(қала, қосынды)</code>: город с наибольшей суммой <code>amount</code> и саму эту сумму.</p>",
    "hints": [
     "Сначала словарь сумм по городам.",
     "<code>max(totals, key=lambda c: totals[c])</code>"
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\nassert top_city(_t) == (\"Астана\", 25000), f\"Ожидалось ('Астана', 25000), у вас {top_city(_t)}\"\nassert top_city(\"city,amount\\nАқтау,5\") == (\"Ақтау\", 5), \"Одна строка: ('Ақтау', 5)\""
    }
   },
   {
    "title": "Растущие месяцы",
    "prompt": "<p>В CSV есть <code>date</code> (YYYY-MM-DD) и <code>amount</code>. Функция <code>growth_months(text)</code> считает сумму по месяцам и возвращает список месяцев (YYYY-MM) в порядке месяцев, у которых выручка <b>больше</b>, чем в предыдущем месяце. Первый месяц сравнивать не с чем, поэтому он в список не попадает.</p>",
    "hints": [
     "Месяц: <code>row[\"date\"][:7]</code>.",
     "Отсортируйте месяцы через <code>sorted</code> и сравнивайте соседние месяцы по индексу."
    ],
    "check": {
     "tests": "_t = \"date,amount\\n2024-03-02,500\\n2024-01-05,100\\n2024-02-10,300\\n2024-02-20,100\\n2024-03-15,100\\n2024-04-01,200\"\nassert growth_months(_t) == [\"2024-02\", \"2024-03\"], f\"Ожидалось ['2024-02', '2024-03'], у вас {growth_months(_t)}\""
    }
   },
   {
    "title": "Короткий EDA-отчёт",
    "prompt": "<p>Функция <code>eda_summary(text)</code> должна возвращать словарь по CSV <code>city,amount</code>:</p><ul><li><code>n</code> — количество строк;</li><li><code>mean</code> — средняя сумма (округлить до целого, <code>round</code>);</li><li><code>median</code> — медиана;</li><li><code>top_city</code> — город с наибольшей <b>медианой</b> суммы.</li></ul>",
    "hints": [
     "Сохраните строки один раз как <code>list(...)</code>, потом используйте несколько раз.",
     "Выбор города: <code>max(groups, key=lambda c: statistics.median(groups[c]))</code>."
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\\nШымкент,40000\"\n_r = eda_summary(_t)\nassert isinstance(_r, dict), \"Должен вернуться словарь\"\nassert _r.get(\"n\") == 8, \"n должно быть 8\"\nassert _r.get(\"mean\") == 11750, \"mean должно быть 11750\"\nassert _r.get(\"median\") == 8500, \"median должно быть 8500\"\nassert _r.get(\"top_city\") == \"Шымкент\", \"Город с наибольшей медианой: Шымкент\""
    }
   }
  ]
 },
 "cl-8": {
  "pr": [
   {
    "title": "Сумма со знаком тенге",
    "prompt": "<p>Функция <code>clean_amount(s)</code> должна превращать текст вида <code>\"12 500 ₸\"</code> в число: убрать пробелы и знак <code>₸</code>, и если остались только цифры, вернуть <code>int</code>, иначе <code>None</code>. Если передано <code>None</code>, тоже вернуть <code>None</code>.</p>",
    "hints": [
     "<code>(s or \"\")</code> превращает None в пустую строку.",
     "<code>s.isdigit()</code>"
    ],
    "check": {
     "tests": "assert clean_amount(\"12 500 ₸\") == 12500, \"clean_amount('12 500 ₸') должно быть 12500\"\nassert clean_amount(\"8000\") == 8000, \"clean_amount('8000') должно быть 8000\"\nassert clean_amount(\"abc\") is None, \"clean_amount('abc') должно быть None\"\nassert clean_amount(\"\") is None and clean_amount(None) is None, \"Пустое значение → None\""
    }
   },
   {
    "title": "Лишние пробелы в имени",
    "prompt": "<p>Функция <code>clean_name(s)</code> должна убрать лишние пробелы в начале, в конце и внутри имени: между словами остаётся один пробел. Например, <code>clean_name(\"  Айгерім   Сапарова \")</code> → <code>\"Айгерім Сапарова\"</code>.</p>",
    "hints": [
     "<code>s.split()</code> делит по пробелам, <code>\" \".join(...)</code> собирает обратно."
    ],
    "check": {
     "tests": "assert clean_name(\"  Айгерім   Сапарова \") == \"Айгерім Сапарова\", \"clean_name('  Айгерім   Сапарова ') должно быть Айгерім Сапарова\"\nassert clean_name(\"Дана\") == \"Дана\", \"Чистое имя не меняется\""
    }
   },
   {
    "title": "Варианты написания Шымкента",
    "prompt": "<p>В <code>CITY_MAP</code> добавлены варианты написания Шымкента. Функция <code>clean_city(s)</code> должна обрезать пробелы у города и искать его в словаре в нижнем регистре; если не найдено, вернуть текст без лишних пробелов.</p>",
    "hints": [
     "<code>CITY_MAP.get(key, s.strip())</code>"
    ],
    "check": {
     "tests": "assert clean_city(\" SHYMKENT\") == \"Шымкент\", \"clean_city(' SHYMKENT') должно быть Шымкент\"\nassert clean_city(\"ШЫМКЕНТ \") == \"Шымкент\", \"clean_city('ШЫМКЕНТ ') должно быть Шымкент\"\nassert clean_city(\" Тараз \") == \"Тараз\", \"Нет в словаре: Тараз\""
    }
   },
   {
    "title": "Число отброшенных строк",
    "prompt": "<p>Функция <code>count_dropped(text)</code> должна возвращать количество строк в CSV <code>name,city,amount</code>, у которых сумма некорректна (пустая, текст, ноль или отрицательная). Положительная сумма, которая становится числом после удаления пробелов, — корректна.</p>",
    "hints": [
     "<code>try: int(raw) except ValueError</code>",
     "Ноль и отрицательное число тоже некорректны."
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nДана,Almaty,\\nЕржан,Шымкент,-300\\nТимур,Ақтөбе,abc\\nӘсем,astana,7 200\\nБек,Тараз,0\"\nassert count_dropped(_t) == 4, f\"Должно быть отброшено 4 строки, у вас {count_dropped(_t)}\"\nassert count_dropped(\"name,city,amount\\nА,Б,100\") == 0, \"Корректные строки не отбрасываются\""
    }
   },
   {
    "title": "Отчёт об очистке",
    "prompt": "<p>Функция <code>clean_report(text)</code> должна возвращать словарь <code>{\"in\": кірген_жолдар, \"out\": таза_жолдар, \"dropped_pct\": тасталған_үлес}</code>. Чистая строка — строка, где сумма — целое положительное число (после удаления пробелов). <code>dropped_pct</code> — процент, округлённый до 1 знака после запятой: <code>round</code>.</p>",
    "hints": [
     "Два счётчика: входящие и чистые строки.",
     "<code>round((n_in - n_out) * 100 / n_in, 1)</code>"
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nДана,Almaty,\\nЕржан,Шымкент,-300\\nӘсем,astana,7 200\\nНұрлан,Астана,9000\\nБек,Тараз,1 000\"\n_r = clean_report(_t)\nassert _r == {\"in\": 6, \"out\": 4, \"dropped_pct\": 33.3}, f\"Ожидалось {'in': 6, 'out': 4, 'dropped_pct': 33.3}, у вас {_r}\""
    }
   },
   {
    "title": "Чистая сумма по городам",
    "prompt": "<p>Функция <code>totals_by_city(text)</code> должна очистить CSV <code>name,city,amount</code> и вернуть словарь <code>{таза_қала: сома_қосындысы}</code>. Город приводится через <code>CITY_MAP</code> (strip, нижний регистр; если не найдено, текст после strip). Строки с некорректной суммой (пустая, текст, ≤ 0) отбрасываются.</p>",
    "hints": [
     "Логика <code>clean_rows</code> из урока, но вы добавляете в словарь вместо списка."
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nНұрлан,АСТАНА,8000\\nДана,Almaty,\\nЕржан, Almaty ,3 000\\nТимур, Ақтөбе ,abc\\nӘсем,astana,7 200\\nБек,Ақтөбе,4000\"\n_r = totals_by_city(_t)\nassert _r == {\"Алматы\": 15500, \"Астана\": 15200, \"Ақтөбе\": 4000}, f\"Результат неверен: {_r}\""
    }
   },
   {
    "title": "Чистые строки без дубликатов",
    "prompt": "<p>Функция <code>clean_unique(text)</code> должна очистить CSV <code>name,city,amount</code> и вернуть список словарей <code>{\"name\", \"city\", \"amount\"}</code> (имя — <code>strip</code>, город — через <code>CITY_MAP</code>, сумма — <code>int</code>; некорректная сумма отбрасывается). Если имя (при сравнении в нижнем регистре) встречается несколько раз, оставьте только <b>первую</b> чистую строку.</p>",
    "hints": [
     "Запоминайте уже встреченные имена в <code>seen = set()</code> в нижнем регистре.",
     "Проверяйте дубликат <b>после</b> проверки суммы: некорректная строка не считается «первой»."
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\n Айгерім ,алматы,12 500\\nНұрлан,АСТАНА,abc\\nАЙГЕРІМ,Almaty,12 500\\nНұрлан,astana,8000\\nДана,Ақтөбе,5000\"\n_r = clean_unique(_t)\nassert isinstance(_r, list), \"Верните список\"\nassert _r == [{\"name\": \"Айгерім\", \"city\": \"Алматы\", \"amount\": 12500}, {\"name\": \"Нұрлан\", \"city\": \"Астана\", \"amount\": 8000}, {\"name\": \"Дана\", \"city\": \"Ақтөбе\", \"amount\": 5000}], f\"Результат неверен: {_r}\""
    }
   },
   {
    "title": "Города, которых нет в словаре",
    "prompt": "<p>Проверка после очистки: функция <code>unknown_cities(text, city_map)</code> должна возвращать отсортированный по алфавиту список уникальных городов из CSV, которых нет в словаре ни <b>как ключа</b> (в нижнем регистре), ни <b>как стандартного значения</b> (после strip). Это новые варианты, которые нужно добавить в словарь.</p>",
    "hints": [
     "Стандартные значения: <code>set(city_map.values())</code>.",
     "Соберите уникальные значения в <code>set</code>, в конце примените <code>sorted</code>."
    ],
    "check": {
     "tests": "_m = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n_t = \"name,city,amount\\nА,алматы,1\\nБ,Алматы,2\\nВ, Nur-Sultan ,3\\nГ,Алмата,4\\nД,ASTANA,5\\nЕ,Nur-Sultan,6\"\n_r = unknown_cities(_t, _m)\nassert _r == sorted([\"Nur-Sultan\", \"Алмата\"]), f\"Новые варианты: Nur-Sultan, Алмата; у вас {_r}\""
    }
   }
  ]
 }
} });
