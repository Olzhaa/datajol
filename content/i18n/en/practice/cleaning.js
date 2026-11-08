// cleaning practice tasks: English text. Code, solutions and checks are in content/practice/cleaning.js.
DJ.i18n.patch({ lessons: {
 "cl-1": {
  "pr": [
   {
    "title": "Order profile",
    "prompt": "<p>For the table <code>raw_orders</code>, output in one row: <code>n</code> (number of rows), <code>null_amount</code> (rows with an empty amount), <code>uniq_customers</code> (number of unique <code>customer_id</code>).</p>",
    "hints": [
     "<code>SUM(amount IS NULL)</code>, <code>COUNT(DISTINCT customer_id)</code>"
    ]
   },
   {
    "title": "Range of sign-up dates",
    "prompt": "<p>From the table <code>raw_customers</code>, output the <code>first_signup</code> (<code>MIN(signup)</code>) and the <code>last_signup</code> (<code>MAX(signup)</code>). Does the result make sense? Why?</p>",
    "hints": [
     "<code>MIN(signup)</code>, <code>MAX(signup)</code>. The dates are compared as text, so dates in different formats end up in the wrong order."
    ]
   },
   {
    "title": "Repeated names",
    "prompt": "<p>From the table <code>raw_customers</code>, output the names that appear more than once: <code>name</code>, <code>n</code>. Group the names without changing them, exactly as they are written.</p>",
    "hints": [
     "<code>GROUP BY name HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "Percentage of empty values",
    "prompt": "<p>For the table <code>raw_customers</code>, output in one row the share of empty values in each column as a percentage (one decimal place): <code>pct_email</code>, <code>pct_city</code>, <code>pct_phone</code>.</p>",
    "hints": [
     "<code>ROUND(100.0 * SUM(email IS NULL) / COUNT(*), 1)</code>"
    ]
   },
   {
    "title": "Orders by month",
    "prompt": "<p>In the table <code>raw_orders</code>, output how many orders there are in each month: <code>month</code> (the first 7 characters of <code>order_date</code>), <code>n</code>. In month order.</p>",
    "hints": [
     "<code>substr(order_date, 1, 7)</code>"
    ]
   },
   {
    "title": "Incomplete records",
    "prompt": "<p>Output the customers for whom at least one of the email, city or phone fields is empty: <code>id</code>, <code>name</code>.</p>",
    "hints": [
     "Combine the three conditions with <code>OR</code>."
    ]
   },
   {
    "title": "Customers without orders",
    "prompt": "<p>Find the customers who have no orders at all: <code>id</code>, <code>name</code>, <code>email</code>. Use <code>LEFT JOIN</code>. Look at the rows of the result: who could they be?</p>",
    "hints": [
     "<code>LEFT JOIN raw_orders o ON o.customer_id = c.id</code>",
     "In the rows with no matching order, <code>o.id IS NULL</code>."
    ]
   },
   {
    "title": "Column profile in one table",
    "prompt": "<p>Output the column profile of the table <code>raw_customers</code> in one table: <code>col</code> (column name: <code>email</code>, <code>city</code>, <code>phone</code>), <code>nulls</code> (empty values), <code>uniq</code> (unique values). Combine the three queries with <code>UNION ALL</code>.</p>",
    "hints": [
     "Each part: <code>SELECT 'email' AS col, SUM(email IS NULL) AS nulls, COUNT(DISTINCT email) AS uniq FROM raw_customers</code>.",
     "Put <code>UNION ALL</code> between the parts."
    ]
   }
  ]
 },
 "cl-2": {
  "pr": [
   {
    "title": "A label instead of email",
    "prompt": "<p>For each customer, output the columns <code>id</code>, <code>name</code> and <code>email</code>. If the email is empty, it should say <code>email жоқ</code>.</p>",
    "hints": [
     "<code>COALESCE(email, 'email жоқ')</code>"
    ]
   },
   {
    "title": "Counting missing values",
    "prompt": "<p>The function <code>count_missing(xs)</code> should count the missing values in a list. <code>None</code> and an empty or space-only text (<code>\"\"</code>, <code>\"  \"</code>) count as missing. For example, <code>count_missing([\"Алматы\", None, \"\", \" \", \"Астана\"])</code> → <code>3</code>.</p>",
    "hints": [
     "<code>x is None</code> or <code>x.strip() == \"\"</code>.",
     "Numbers have no <code>strip</code>: first check <code>isinstance(x, str)</code>."
    ],
    "check": {
     "tests": "assert count_missing([\"Алматы\", None, \"\", \" \", \"Астана\"]) == 3, \"count_missing(['Алматы', None, '', ' ', 'Астана']) should be 3\"\nassert count_missing([1, 2, None]) == 1, \"In a list of numbers only None is missing: 1\"\nassert count_missing([]) == 0, \"Empty list: 0\""
    }
   },
   {
    "title": "Orders without an amount",
    "prompt": "<p>From the table <code>raw_orders</code>, output the orders with an empty amount: <code>id</code>, <code>customer_id</code>, <code>order_date</code>.</p>",
    "hints": [
     "<code>WHERE amount IS NULL</code> (<code>= NULL</code> does not work)."
    ]
   },
   {
    "title": "Fill with \"unknown\"",
    "prompt": "<p>The function <code>fill_unknown(cities)</code> should return a <b>new</b> list: <code>None</code> and empty text (including text made only of spaces) become <code>\"Белгісіз\"</code>; the rest does not change. For example, <code>fill_unknown([\"Алматы\", None, \" \"])</code> → <code>[\"Алматы\", \"Белгісіз\", \"Белгісіз\"]</code>.</p>",
    "hints": [
     "Use the condition <code>c is None or c.strip() == \"\"</code> (the order matters: check for None first)."
    ],
    "check": {
     "tests": "_src = [\"Алматы\", None, \" \", \"Ақтөбе\", \"\"]\n_r = fill_unknown(_src)\nassert _r == [\"Алматы\", \"Белгісіз\", \"Белгісіз\", \"Ақтөбе\", \"Белгісіз\"], f\"The result is wrong: {_r}\"\nassert _src == [\"Алматы\", None, \" \", \"Ақтөбе\", \"\"], \"Do not change the original list\""
    }
   },
   {
    "title": "Flag for an empty city",
    "prompt": "<p>For each customer, output <code>id</code>, <code>city</code> and <code>city_missing</code>: 1 if the city is <code>NULL</code> or empty text, otherwise 0.</p>",
    "hints": [
     "The expression <code>(city IS NULL OR TRIM(city) = '')</code> gives 1 or 0."
    ]
   },
   {
    "title": "Filling with the mode",
    "prompt": "<p>A categorical column can be filled with the mode. The function <code>fill_mode(xs)</code> should return a new list in which the <code>None</code> values are replaced with the mode of the other values (<code>statistics.mode</code>). For example, <code>fill_mode([\"iOS\", None, \"Android\", \"iOS\"])</code> → <code>[\"iOS\", \"iOS\", \"Android\", \"iOS\"]</code>.</p>",
    "hints": [
     "Do not let <code>None</code> into the mode: filter it out first."
    ],
    "check": {
     "tests": "assert fill_mode([\"iOS\", None, \"Android\", \"iOS\"]) == [\"iOS\", \"iOS\", \"Android\", \"iOS\"], \"fill_mode(['iOS', None, 'Android', 'iOS']) is wrong\"\nassert fill_mode([None, \"Астана\", \"Алматы\", \"Астана\", None]) == [\"Астана\", \"Астана\", \"Алматы\", \"Астана\", \"Астана\"], \"The mode should be Астана\"\nassert fill_mode([\"a\", \"b\"]) == [\"a\", \"b\"], \"If there are no missing values, the list does not change\""
    }
   },
   {
    "title": "Filling and a flag",
    "prompt": "<p>The function <code>fill_with_flag(rows, key)</code> takes a list of dictionaries and returns a <b>new</b> list of dictionaries: the <code>None</code> values in the column <code>key</code> are filled with the median of the others, and each row gets a key <code>key + \"_missing\"</code> (<code>True</code> if it was empty at the start). The original dictionaries must not change.</p><p>For example, <code>[{\"id\": 1, \"age\": 30}, {\"id\": 2, \"age\": None}, {\"id\": 3, \"age\": 40}]</code> → the second row becomes <code>{\"id\": 2, \"age\": 35.0, \"age_missing\": True}</code>.</p>",
    "hints": [
     "Copy: <code>new = dict(r)</code>.",
     "Set the flag <b>before</b> filling."
    ],
    "check": {
     "tests": "_rows = [{\"id\": 1, \"age\": 30}, {\"id\": 2, \"age\": None}, {\"id\": 3, \"age\": 40}]\n_r = fill_with_flag(_rows, \"age\")\nassert _r == [{\"id\": 1, \"age\": 30, \"age_missing\": False}, {\"id\": 2, \"age\": 35, \"age_missing\": True}, {\"id\": 3, \"age\": 40, \"age_missing\": False}], f\"The result is wrong: {_r}\"\nassert _rows[1] == {\"id\": 2, \"age\": None}, \"Do not change the original dictionaries: make a copy with dict(r)\""
    }
   },
   {
    "title": "Empty contacts by city",
    "prompt": "<p>Check how complete the contact data is by city: <code>city</code> (if empty, then <code>Белгісіз</code>), <code>n</code> (number of customers), <code>no_contact</code> (number of customers without an email or a phone). Group without changing the city (no TRIM).</p>",
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
    "title": "Spaces in the phone",
    "prompt": "<p>Output the <code>id</code> and the <code>phone</code> column for customers with a phone, with the spaces removed.</p>",
    "hints": [
     "<code>REPLACE(phone, ' ', '')</code>"
    ]
   },
   {
    "title": "Cleaning a name",
    "prompt": "<p>The function <code>clean_name(s)</code> should clean a name: remove the spaces at the start and at the end, make the first letter uppercase and the rest lowercase (<code>str.capitalize()</code>). For example, <code>clean_name(\"  айГЕРІМ \")</code> → <code>\"Айгерім\"</code>.</p>",
    "hints": [
     "<code>s.strip().capitalize()</code>"
    ],
    "check": {
     "tests": "assert clean_name(\"  айГЕРІМ \") == \"Айгерім\", \"clean_name('  айГЕРІМ ') should be Айгерім\"\nassert clean_name(\"НҰРЛАН\") == \"Нұрлан\", \"clean_name('НҰРЛАН') should be Нұрлан\"\nassert clean_name(\"Дана\") == \"Дана\", \"A clean name does not change\""
    }
   },
   {
    "title": "All variants of a city name",
    "prompt": "<p>Output the list of unique city names without extra spaces: <code>city</code> (<code>TRIM</code>, <code>DISTINCT</code>). Do not include the empty cities.</p>",
    "hints": [
     "<code>SELECT DISTINCT TRIM(city) ...</code>"
    ]
   },
   {
    "title": "Cleaning with a city dictionary",
    "prompt": "<p>The function <code>clean_city(s)</code> should standardise the city with <code>CITY_MAP</code>: the key is the text without spaces, in lowercase. If it is not in the dictionary, return the text with the spaces removed; <code>None</code> → <code>None</code>.</p>",
    "hints": [
     "<code>CITY_MAP.get(s.strip().lower(), s.strip())</code>"
    ],
    "check": {
     "tests": "assert clean_city(\" АЛМАТЫ \") == \"Алматы\", \"clean_city(' АЛМАТЫ ') should be Алматы\"\nassert clean_city(\"Shymkent\") == \"Шымкент\", \"clean_city('Shymkent') should be Шымкент\"\nassert clean_city(\"Ақтөбе \") == \"Ақтөбе\", \"A city that is not in the dictionary: Ақтөбе (without spaces)\"\nassert clean_city(None) is None, \"None → None\""
    }
   },
   {
    "title": "Number of cleaned cities",
    "prompt": "<p>Merge the cities and output how many customers each one has: <code>city_clean</code>, <code>n</code>. Rules: <code>Алматы</code>, <code>алматы</code>, <code>Almaty</code> → <code>Алматы</code>; <code>Астана</code>, <code>Astana</code> → <code>Астана</code>; everything else after <code>TRIM</code> (an empty city also forms one group).</p>",
    "hints": [
     "Give the CASE expression the name <code>AS city_clean</code>, then <code>GROUP BY city_clean</code>."
    ]
   },
   {
    "title": "Is the phone valid",
    "prompt": "<p>The function <code>valid_phone(p)</code> should keep only the digits in the phone (<code>re.sub(r\"\\D\", \"\", p)</code>), replace the first <code>8</code> with <code>7</code>, and return <code>True</code> if the number starts with <code>7</code> and has 11 digits in total, otherwise <code>False</code>. <code>None</code> → <code>False</code>.</p>",
    "hints": [
     "<code>len(d) == 11</code> and <code>d.startswith(\"7\")</code>."
    ],
    "check": {
     "tests": "assert valid_phone(\"8 (701) 333-44-55\") is True, \"8 (701) 333-44-55 is a valid number\"\nassert valid_phone(\"+7 701 111 2233\") is True, \"+7 701 111 2233 is a valid number\"\nassert valid_phone(\"8701222\") is False, \"Too few digits: False\"\nassert valid_phone(\"+1 202 555 0147\") is False, \"A number that starts with +1: False\"\nassert valid_phone(None) is False, \"None → False\""
    }
   },
   {
    "title": "Phone in one format",
    "prompt": "<p>For customers with a phone, output <code>id</code> and <code>phone_clean</code>: remove the spaces, brackets, dashes and <code>+</code>, replace the first <code>8</code> with <code>7</code>, and put <code>+</code> in front of the number at the end. For example, <code>8 (701) 333-44-55</code> → <code>+77013334455</code>.</p>",
    "hints": [
     "Nest several <code>REPLACE</code> inside each other.",
     "The first digit: <code>substr(digits, 1, 1)</code>, the rest: <code>substr(digits, 2)</code>. The text is joined with <code>||</code>."
    ]
   },
   {
    "title": "City report",
    "prompt": "<p>The function <code>city_counts(cities)</code> should clean a list of cities and return a dictionary <code>{таза_қала: саны}</code>. Cleaning: <code>strip</code>, then a lowercase search in <code>CITY_MAP</code> (if not found, the text after strip). Do not count the values <code>None</code> and empty text.</p>",
    "hints": [
     "First skip the empty values with <code>continue</code>.",
     "Counting: <code>out[c] = out.get(c, 0) + 1</code>."
    ],
    "check": {
     "tests": "_c = [\"Алматы\", \"алматы\", \"Almaty \", \"АСТАНА\", None, \"Ақтөбе\", \"\", \"astana\", \"Қарағанды \"]\n_r = city_counts(_c)\nassert _r == {\"Алматы\": 3, \"Астана\": 2, \"Ақтөбе\": 1, \"Қарағанды\": 1}, f\"The result is wrong: {_r}\""
    }
   }
  ]
 },
 "cl-4": {
  "pr": [
   {
    "title": "Repeated names",
    "prompt": "<p>After removing the spaces, output the names that appear more than once: <code>name</code> (<code>TRIM</code>), <code>n</code>.</p>",
    "hints": [
     "<code>GROUP BY TRIM(name) HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "Email report",
    "prompt": "<p>Output in one row: <code>n</code> (all rows), <code>with_email</code> (rows with an email, <code>COUNT(email)</code>), <code>uniq_email</code> (unique emails, ignoring case).</p>",
    "hints": [
     "<code>COUNT(DISTINCT LOWER(email))</code>"
    ]
   },
   {
    "title": "Repeated phone numbers",
    "prompt": "<p>Find the phone numbers that are written exactly the same: <code>phone</code>, <code>n</code> (only more than 1). Do not count empty phones.</p>",
    "hints": [
     "<code>WHERE phone IS NOT NULL GROUP BY phone HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "The duplicates themselves",
    "prompt": "<p>Output all customers whose email (ignoring case) repeats in another record: <code>id</code>, <code>name</code>, <code>email</code>. Sort by the email in lowercase, then by <code>id</code>.</p>",
    "hints": [
     "A subquery gives the repeated emails (step 1 from the lesson).",
     "<code>WHERE LOWER(email) IN (...)</code>"
    ]
   },
   {
    "title": "Number of extra records",
    "prompt": "<p>How many extra records (duplicates) are there among the rows with an email? Output one value: <code>extra</code> = number of rows minus the number of unique emails (ignoring case).</p>",
    "hints": [
     "<code>COUNT(*) - COUNT(DISTINCT LOWER(email))</code>"
    ]
   },
   {
    "title": "Keep the last record",
    "prompt": "<p>This time, for each email, keep the record with the <b>largest</b> <code>id</code> (the latest registration). Output the <code>id</code>, <code>name</code> and the <code>email</code> in lowercase for the customers who have an email.</p>",
    "hints": [
     "<code>ORDER BY id DESC</code> and <code>ROW_NUMBER()</code>."
    ]
   },
   {
    "title": "Duplicates by phone",
    "prompt": "<p>Find the duplicates after bringing the phone to one form. Cleaning: remove the spaces, brackets, dashes and <code>+</code>, and replace the <code>8</code> at the start with <code>7</code>. Output <code>phone_clean</code> (digits only) and <code>n</code> (only more than 1).</p>",
    "hints": [
     "First clean in a CTE (several <code>REPLACE</code> and <code>CASE</code>), then <code>GROUP BY ... HAVING</code>."
    ]
   },
   {
    "title": "Moving orders to the main record",
    "prompt": "<p>The company decided to keep the last registered record for each customer. Before deleting the duplicate, we move the orders to that record. For each order, output <code>id</code>, <code>customer_id</code> and <code>keep_id</code>: the largest <code>id</code> among the records with the same email (ignoring case). If the email is empty, <code>keep_id = customer_id</code>.</p>",
    "hints": [
     "JOIN <code>raw_orders</code> and <code>raw_customers</code>.",
     "Subquery: <code>SELECT MAX(c2.id) FROM raw_customers c2 WHERE LOWER(c2.email) = LOWER(c.email)</code>, for an empty email — <code>COALESCE</code>."
    ]
   }
  ]
 },
 "cl-5": {
  "pr": [
   {
    "title": "Large orders",
    "prompt": "<p>Convert the amount to a number and output the orders over 10 000: <code>id</code>, <code>amount_num</code>.</p>",
    "hints": [
     "Use the expression <code>CAST(REPLACE(amount, ' ', '') AS INTEGER)</code> also in <code>WHERE</code>."
    ]
   },
   {
    "title": "Convert text to a number",
    "prompt": "<p>The function <code>to_int(s)</code> should turn text with spaces into an integer: <code>\"12 500\"</code> → <code>12500</code>. If it cannot be converted (<code>\"abc\"</code>) or <code>None</code> is passed, return <code>None</code>.</p>",
    "hints": [
     "<code>try: int(...) except ValueError: return None</code>"
    ],
    "check": {
     "tests": "assert to_int(\"12 500\") == 12500, \"to_int('12 500') should be 12500\"\nassert to_int(\"-500\") == -500, \"to_int('-500') should be -500\"\nassert to_int(\"abc\") is None, \"to_int('abc') should be None\"\nassert to_int(None) is None, \"to_int(None) should be None\""
    }
   },
   {
    "title": "Dotted date to ISO",
    "prompt": "<p>The function <code>dmy_to_iso(s)</code> should turn a date in the form <code>DD.MM.YYYY</code> into the text <code>YYYY-MM-DD</code>. For example, <code>dmy_to_iso(\"15.02.2024\")</code> → <code>\"2024-02-15\"</code>.</p>",
    "hints": [
     "<code>datetime.strptime(s, \"%d.%m.%Y\").strftime(\"%Y-%m-%d\")</code>"
    ],
    "check": {
     "tests": "assert dmy_to_iso(\"15.02.2024\") == \"2024-02-15\", \"dmy_to_iso('15.02.2024') should be 2024-02-15\"\nassert dmy_to_iso(\"01.12.2023\") == \"2023-12-01\", \"dmy_to_iso('01.12.2023') should be 2023-12-01\""
    }
   },
   {
    "title": "Counting date formats",
    "prompt": "<p>Which formats are in the column <code>signup</code>? Output <code>fmt</code> and <code>n</code>. <code>fmt</code>: if <code>signup GLOB '[0-9][0-9][0-9][0-9]-*'</code>, then <code>ISO</code>; if the text contains a dot (<code>LIKE '%.%'</code>), then <code>нүкте</code>; otherwise <code>басқа</code>.</p>",
    "hints": [
     "Name the CASE expression <code>AS fmt</code>, then <code>GROUP BY fmt</code>."
    ]
   },
   {
    "title": "Sum of valid amounts",
    "prompt": "<p>The function <code>total_amount(values)</code> should add up the amounts from a list of texts that turn into numbers (after the spaces are removed) and return the sum. <code>None</code> and the values that cannot be turned into numbers are skipped. For example, <code>total_amount([\"12 500\", None, \"abc\", \"8000\"])</code> → <code>20500</code>.</p>",
    "hints": [
     "In a loop, <code>try / except ValueError</code>."
    ],
    "check": {
     "tests": "assert total_amount([\"12 500\", None, \"abc\", \"8000\"]) == 20500, \"total_amount(['12 500', None, 'abc', '8000']) should be 20500\"\nassert total_amount([]) == 0, \"Empty list: 0\"\nassert total_amount([\"7 200\", \"-200\"]) == 7000, \"A negative number is a number too: 7000\""
    }
   },
   {
    "title": "Days between two dates",
    "prompt": "<p>The function <code>days_between(a, b)</code> should return the number of days between two dates in the format <code>DD.MM.YYYY</code> (<code>b − a</code>). If you subtract one <code>datetime</code> from the other, the <code>.days</code> property gives the number of days. For example, <code>days_between(\"25.12.2024\", \"01.01.2025\")</code> → <code>7</code>.</p>",
    "hints": [
     "<code>(d2 - d1).days</code>"
    ],
    "check": {
     "tests": "assert days_between(\"25.12.2024\", \"01.01.2025\") == 7, \"days_between('25.12.2024', '01.01.2025') should be 7\"\nassert days_between(\"01.02.2024\", \"01.03.2024\") == 29, \"In 2024 February had 29 days: 29\"\nassert days_between(\"10.05.2024\", \"10.05.2024\") == 0, \"One day: 0\""
    }
   },
   {
    "title": "Converting dates to ISO",
    "prompt": "<p>Output the <code>id</code> and <code>signup_iso</code> column for each customer: the dates in the form <code>DD.MM.YYYY</code> are turned into <code>YYYY-MM-DD</code> with <code>substr</code>; in the dates <code>YYYY/MM/DD</code> replace <code>/</code> with <code>-</code>; dates already in ISO do not change.</p>",
    "hints": [
     "<code>15.02.2024</code>: the year is <code>substr(signup, 7, 4)</code>, the month is <code>substr(signup, 4, 2)</code>, the day is <code>substr(signup, 1, 2)</code>.",
     "Join the parts with <code>||</code>."
    ]
   },
   {
    "title": "Clean monthly total",
    "prompt": "<p>Count only the correct amounts: those whose amount without spaces consists only of digits (<code>NOT GLOB '*[^0-9]*'</code>) and is greater than 0. For each month, output the <code>month</code> (YYYY-MM) and the <code>total</code>, in month order.</p>",
    "hints": [
     "In the CTE, take <code>REPLACE(amount, ' ', '') AS a</code> and extract the month.",
     "Outside, <code>WHERE a NOT GLOB '*[^0-9]*'</code>, then <code>GROUP BY month</code>."
    ]
   }
  ]
 },
 "cl-6": {
  "pr": [
   {
    "title": "Negative amounts",
    "prompt": "<p>Output the orders whose amount (after conversion to a number) is less than zero: <code>id</code>, <code>amount</code> (the original text).</p>",
    "hints": [
     "<code>WHERE CAST(REPLACE(amount, ' ', '') AS INTEGER) &lt; 0</code>"
    ]
   },
   {
    "title": "Orders that are too large",
    "prompt": "<p>The business limit: one order is no more than 200 000 ₸. Output the orders that exceed the limit: <code>id</code>, <code>customer_id</code>, <code>amount_num</code>.</p>",
    "hints": [
     "First convert to a number, then <code>&gt; 200000</code>."
    ]
   },
   {
    "title": "Is there an amount",
    "prompt": "<p>For each order, output <code>id</code> and <code>has_amount</code>: if the amount is empty, <code>жоқ</code>, otherwise <code>бар</code>.</p>",
    "hints": [
     "<code>CASE WHEN amount IS NULL THEN 'жоқ' ELSE 'бар' END</code>"
    ]
   },
   {
    "title": "Counting by flags",
    "prompt": "<p>Using the rules from the lesson (NULL → <code>жоқ</code>; ≤ 0 → <code>қате</code>; &gt; 200 000 → <code>күдікті</code>; otherwise <code>ok</code>), output how many orders each flag has: <code>flag</code>, <code>n</code>.</p>",
    "hints": [
     "In the CTE take <code>amount_num</code>, outside use CASE and <code>GROUP BY flag</code>."
    ]
   },
   {
    "title": "Clean average order",
    "prompt": "<p>Output, as one value <code>avg_ok</code>, the average amount of only the orders with the flag <code>ok</code> (the amount exists, is greater than 0, and is not more than 200 000).</p>",
    "hints": [
     "Combine the three conditions with <code>AND</code>."
    ]
   },
   {
    "title": "Customers with problem orders",
    "prompt": "<p>Output the customers who have at least one order that is not <code>ok</code> (no amount, ≤ 0, or more than 200 000): <code>id</code>, <code>name</code> (<code>TRIM</code>). Each customer once.</p>",
    "hints": [
     "Join the CTE with <code>raw_customers</code>.",
     "<code>DISTINCT</code> keeps one customer only once."
    ]
   },
   {
    "title": "Share of problem rows",
    "prompt": "<p>Output, as one value, the share of orders that are not <code>ok</code>, as a percentage <code>bad_pct</code> (one decimal place). Use two CTEs: in the first one <code>amount_num</code>, in the second one <code>flag</code>.</p>",
    "hints": [
     "Second CTE: <code>f AS (SELECT CASE ... END AS flag FROM o)</code>.",
     "<code>ROUND(100.0 * SUM(flag &lt;&gt; 'ok') / COUNT(*), 1)</code>"
    ]
   },
   {
    "title": "Quality by customer",
    "prompt": "<p>For each customer (<code>customer_id</code>) output: <code>orders</code> (number of orders), <code>bad</code> (orders that are not <code>ok</code>), <code>ok_total</code> (the sum of only the <code>ok</code> orders; 0 if there are none). Sort by <code>customer_id</code>.</p>",
    "hints": [
     "Conditional sum: <code>SUM(CASE WHEN flag = 'ok' THEN amount_num END)</code>.",
     "An empty result <code>COALESCE(..., 0)</code> turns it into 0."
    ]
   }
  ]
 },
 "cl-7": {
  "pr": [
   {
    "title": "Counting CSV rows",
    "prompt": "<p>The function <code>count_rows(text)</code> should return the number of data rows in the CSV text (do not count the header row). Use <code>csv.DictReader</code>.</p>",
    "hints": [
     "<code>for row in csv.DictReader(io.StringIO(text))</code>"
    ],
    "check": {
     "tests": "assert count_rows(\"city,amount\\nАлматы,1\\nАстана,2\") == 2, \"There are 2 data rows\"\nassert count_rows(\"a,b\\n1,2\\n3,4\\n5,6\") == 3, \"There are 3 data rows\"\nassert count_rows(\"a,b\") == 0, \"Header only: 0\""
    }
   },
   {
    "title": "Get a column as a list",
    "prompt": "<p>The function <code>column(text, name)</code> should return the values of the column <code>name</code> from the CSV (as text) as a list, in row order. For example, <code>column(\"city,amount\\nАлматы,12000\\nАстана,8000\", \"city\")</code> → <code>[\"Алматы\", \"Астана\"]</code>.</p>",
    "hints": [
     "<code>[row[name] for row in ...]</code>"
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\"\nassert column(_t, \"city\") == [\"Алматы\", \"Астана\"], \"The city column: ['Алматы', 'Астана']\"\nassert column(_t, \"amount\") == [\"12000\", \"8000\"], \"The amount values as text: ['12000', '8000']\""
    }
   },
   {
    "title": "Unique cities",
    "prompt": "<p>The function <code>unique_cities(text)</code> should return a list of the unique values of the column <code>city</code> from the CSV, sorted alphabetically (<code>sorted</code>).</p>",
    "hints": [
     "For the unique values use <code>set</code>, then <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\nassert unique_cities(_t) == sorted([\"Алматы\", \"Астана\", \"Шымкент\"]), f\"The result is wrong: {unique_cities(_t)}\"\nassert unique_cities(\"city\\nА\\nА\") == [\"А\"], \"A repeated value is counted once\""
    }
   },
   {
    "title": "Median by city",
    "prompt": "<p>When there are extreme values, the median is more reliable. The function <code>median_by_city(text)</code> should return a dictionary <code>{қала: amount медианасы}</code> (<code>statistics.median</code>). The amounts are text, so convert them to <code>int</code>.</p>",
    "hints": [
     "Collect the amounts of each city into a list: <code>groups.setdefault(city, []).append(...)</code>."
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\n_r = median_by_city(_t)\nassert _r == {\"Алматы\": 9000, \"Астана\": 8000, \"Шымкент\": 6000}, f\"Almaty 9000, Astana 8000, Shymkent 6000 should be the result, you have {_r}\""
    }
   },
   {
    "title": "Weekend check",
    "prompt": "<p>The CSV has the columns <code>day</code> (day of the week) and <code>amount</code>. The function <code>weekend_check(text)</code> should return a dictionary <code>{\"демалыс\": медиана, \"жұмыс\": медиана}</code>: <code>сенбі</code> and <code>жексенбі</code> are the weekend, the other days are working days.</p>",
    "hints": [
     "<code>row[\"day\"] in (\"сенбі\", \"жексенбі\")</code>"
    ],
    "check": {
     "tests": "_t = \"day,amount\\nдүйсенбі,2000\\nсенбі,3000\\nсәрсенбі,2200\\nжексенбі,2800\\nжұма,40000\\nсенбі,2900\"\n_r = weekend_check(_t)\nassert _r == {\"демалыс\": 2900, \"жұмыс\": 2200}, f\"Weekend 2900, working days 2200 should be the result, you have {_r}\""
    }
   },
   {
    "title": "City with the most revenue",
    "prompt": "<p>The function <code>top_city(text)</code> should return the pair <code>(қала, қосынды)</code>: the city with the largest sum of <code>amount</code> and that sum itself.</p>",
    "hints": [
     "First a dictionary of the sums by city.",
     "<code>max(totals, key=lambda c: totals[c])</code>"
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\"\nassert top_city(_t) == (\"Астана\", 25000), f\"Expected ('Астана', 25000), you have {top_city(_t)}\"\nassert top_city(\"city,amount\\nАқтау,5\") == (\"Ақтау\", 5), \"One row: ('Ақтау', 5)\""
    }
   },
   {
    "title": "Growing months",
    "prompt": "<p>The CSV has <code>date</code> (YYYY-MM-DD) and <code>amount</code>. The function <code>growth_months(text)</code> calculates the monthly sum and returns, in month order, the list of months (YYYY-MM) whose revenue is <b>greater</b> than in the previous month. The first month has no previous month to compare with, so it is not included in the list.</p>",
    "hints": [
     "Month: <code>row[\"date\"][:7]</code>.",
     "Sort the months with <code>sorted</code> and compare neighbouring months by index."
    ],
    "check": {
     "tests": "_t = \"date,amount\\n2024-03-02,500\\n2024-01-05,100\\n2024-02-10,300\\n2024-02-20,100\\n2024-03-15,100\\n2024-04-01,200\"\nassert growth_months(_t) == [\"2024-02\", \"2024-03\"], f\"Expected ['2024-02', '2024-03'], you have {growth_months(_t)}\""
    }
   },
   {
    "title": "Short EDA report",
    "prompt": "<p>The function <code>eda_summary(text)</code> should return a dictionary for the CSV <code>city,amount</code>:</p><ul><li><code>n</code> — the number of rows;</li><li><code>mean</code> — the average amount (rounded to an integer, <code>round</code>);</li><li><code>median</code> — the median;</li><li><code>top_city</code> — the city with the largest <b>median</b> amount.</li></ul>",
    "hints": [
     "Store the rows once as <code>list(...)</code>, because you will use them several times.",
     "Choosing the city: <code>max(groups, key=lambda c: statistics.median(groups[c]))</code>."
    ],
    "check": {
     "tests": "_t = \"city,amount\\nАлматы,12000\\nАстана,8000\\nАлматы,2000\\nШымкент,6000\\nАстана,10000\\nАлматы,9000\\nАстана,7000\\nШымкент,40000\"\n_r = eda_summary(_t)\nassert isinstance(_r, dict), \"It should return a dictionary\"\nassert _r.get(\"n\") == 8, \"n should be 8\"\nassert _r.get(\"mean\") == 11750, \"mean should be 11750\"\nassert _r.get(\"median\") == 8500, \"median should be 8500\"\nassert _r.get(\"top_city\") == \"Шымкент\", \"The city with the largest median: Шымкент\""
    }
   }
  ]
 },
 "cl-8": {
  "pr": [
   {
    "title": "Amount with a tenge sign",
    "prompt": "<p>The function <code>clean_amount(s)</code> should turn text such as <code>\"12 500 ₸\"</code> into a number: remove the spaces and the <code>₸</code> sign, and if only digits remain, return <code>int</code>, otherwise <code>None</code>. If <code>None</code> is passed, also return <code>None</code>.</p>",
    "hints": [
     "<code>(s or \"\")</code> turns None into an empty string.",
     "<code>s.isdigit()</code>"
    ],
    "check": {
     "tests": "assert clean_amount(\"12 500 ₸\") == 12500, \"clean_amount('12 500 ₸') should be 12500\"\nassert clean_amount(\"8000\") == 8000, \"clean_amount('8000') should be 8000\"\nassert clean_amount(\"abc\") is None, \"clean_amount('abc') should be None\"\nassert clean_amount(\"\") is None and clean_amount(None) is None, \"An empty value → None\""
    }
   },
   {
    "title": "Extra spaces in a name",
    "prompt": "<p>The function <code>clean_name(s)</code> should remove the extra spaces at the start, at the end and inside the name: one space stays between the words. For example, <code>clean_name(\"  Айгерім   Сапарова \")</code> → <code>\"Айгерім Сапарова\"</code>.</p>",
    "hints": [
     "<code>s.split()</code> splits on spaces, <code>\" \".join(...)</code> joins them back."
    ],
    "check": {
     "tests": "assert clean_name(\"  Айгерім   Сапарова \") == \"Айгерім Сапарова\", \"clean_name('  Айгерім   Сапарова ') should be Айгерім Сапарова\"\nassert clean_name(\"Дана\") == \"Дана\", \"A clean name does not change\""
    }
   },
   {
    "title": "Variants of Shymkent",
    "prompt": "<p>Variants of the spelling Shymkent were added to <code>CITY_MAP</code>. The function <code>clean_city(s)</code> should strip the spaces of the city and look it up in the dictionary in lowercase; if it is not found, return the text with the extra spaces removed.</p>",
    "hints": [
     "<code>CITY_MAP.get(key, s.strip())</code>"
    ],
    "check": {
     "tests": "assert clean_city(\" SHYMKENT\") == \"Шымкент\", \"clean_city(' SHYMKENT') should be Шымкент\"\nassert clean_city(\"ШЫМКЕНТ \") == \"Шымкент\", \"clean_city('ШЫМКЕНТ ') should be Шымкент\"\nassert clean_city(\" Тараз \") == \"Тараз\", \"Not in the dictionary: Тараз\""
    }
   },
   {
    "title": "Number of dropped rows",
    "prompt": "<p>The function <code>count_dropped(text)</code> should return the number of rows in the CSV <code>name,city,amount</code> whose amount is invalid (empty, text, zero or negative). A positive amount that becomes a number after the spaces are removed is valid.</p>",
    "hints": [
     "<code>try: int(raw) except ValueError</code>",
     "Zero and negative numbers are invalid too."
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nДана,Almaty,\\nЕржан,Шымкент,-300\\nТимур,Ақтөбе,abc\\nӘсем,astana,7 200\\nБек,Тараз,0\"\nassert count_dropped(_t) == 4, f\"4 rows should be dropped, you have {count_dropped(_t)}\"\nassert count_dropped(\"name,city,amount\\nА,Б,100\") == 0, \"Valid rows are not dropped\""
    }
   },
   {
    "title": "Cleaning report",
    "prompt": "<p>The function <code>clean_report(text)</code> should return the dictionary <code>{\"in\": кірген_жолдар, \"out\": таза_жолдар, \"dropped_pct\": тасталған_үлес}</code>. A clean row is a row whose amount is a positive whole number (after the spaces are removed). <code>dropped_pct</code> is a percentage, rounded to one decimal place with <code>round</code>.</p>",
    "hints": [
     "Two counters: the incoming and the clean rows.",
     "<code>round((n_in - n_out) * 100 / n_in, 1)</code>"
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nДана,Almaty,\\nЕржан,Шымкент,-300\\nӘсем,astana,7 200\\nНұрлан,Астана,9000\\nБек,Тараз,1 000\"\n_r = clean_report(_t)\nassert _r == {\"in\": 6, \"out\": 4, \"dropped_pct\": 33.3}, f\"Expected {'in': 6, 'out': 4, 'dropped_pct': 33.3}, you have {_r}\""
    }
   },
   {
    "title": "Clean sum by city",
    "prompt": "<p>The function <code>totals_by_city(text)</code> should clean the CSV <code>name,city,amount</code> and return the dictionary <code>{таза_қала: сома_қосындысы}</code>. The city is standardised with <code>CITY_MAP</code> (strip, lowercase; if not found, the text after strip). Rows with an invalid amount (empty, text, ≤ 0) are dropped.</p>",
    "hints": [
     "The <code>clean_rows</code> logic from the lesson, but you add to a dictionary instead of a list."
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\nАйгерім,алматы,12 500\\nНұрлан,АСТАНА,8000\\nДана,Almaty,\\nЕржан, Almaty ,3 000\\nТимур, Ақтөбе ,abc\\nӘсем,astana,7 200\\nБек,Ақтөбе,4000\"\n_r = totals_by_city(_t)\nassert _r == {\"Алматы\": 15500, \"Астана\": 15200, \"Ақтөбе\": 4000}, f\"The result is wrong: {_r}\""
    }
   },
   {
    "title": "Clean rows without duplicates",
    "prompt": "<p>The function <code>clean_unique(text)</code> should clean the CSV <code>name,city,amount</code> and return a list of dictionaries <code>{\"name\", \"city\", \"amount\"}</code> (the name is <code>strip</code>, the city goes through <code>CITY_MAP</code>, the amount is <code>int</code>; an invalid amount is dropped). If a name (compared in lowercase) appears several times, keep only the <b>first</b> clean row.</p>",
    "hints": [
     "Remember the names already seen in <code>seen = set()</code> in lowercase.",
     "Check for a duplicate <b>after</b> checking the amount: an invalid row does not count as the \"first\"."
    ],
    "check": {
     "tests": "_t = \"name,city,amount\\n Айгерім ,алматы,12 500\\nНұрлан,АСТАНА,abc\\nАЙГЕРІМ,Almaty,12 500\\nНұрлан,astana,8000\\nДана,Ақтөбе,5000\"\n_r = clean_unique(_t)\nassert isinstance(_r, list), \"Return a list\"\nassert _r == [{\"name\": \"Айгерім\", \"city\": \"Алматы\", \"amount\": 12500}, {\"name\": \"Нұрлан\", \"city\": \"Астана\", \"amount\": 8000}, {\"name\": \"Дана\", \"city\": \"Ақтөбе\", \"amount\": 5000}], f\"The result is wrong: {_r}\""
    }
   },
   {
    "title": "Cities that are not in the dictionary",
    "prompt": "<p>A check after cleaning: the function <code>unknown_cities(text, city_map)</code> should return an alphabetically sorted list of the unique cities from the CSV that are not in the dictionary either <b>as a key</b> (in lowercase) or <b>as a standard value</b> (after strip). These are the new variants to add to the dictionary.</p>",
    "hints": [
     "Standard values: <code>set(city_map.values())</code>.",
     "Collect the unique values into <code>set</code>, and at the end apply <code>sorted</code>."
    ],
    "check": {
     "tests": "_m = {\"алматы\": \"Алматы\", \"almaty\": \"Алматы\", \"астана\": \"Астана\", \"astana\": \"Астана\"}\n_t = \"name,city,amount\\nА,алматы,1\\nБ,Алматы,2\\nВ, Nur-Sultan ,3\\nГ,Алмата,4\\nД,ASTANA,5\\nЕ,Nur-Sultan,6\"\n_r = unknown_cities(_t, _m)\nassert _r == sorted([\"Nur-Sultan\", \"Алмата\"]), f\"New variants: Nur-Sultan, Алмата; you have {_r}\""
    }
   }
  ]
 }
} });
