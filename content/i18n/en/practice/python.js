// python practice tasks: English text. Code, solutions and checks are in content/practice/python.js.
DJ.i18n.patch({
 "lessons": {
  "py-1": {
   "pr": [
    {
     "title": "Capital city",
     "prompt": "<p>Print exactly this text: <code>Астана — Қазақстанның елордасы</code></p>",
     "hints": [
      "<code>print(\"...\")</code>"
     ],
     "starter": "# Write your code here\n"
    },
    {
     "title": "Address in three lines",
     "prompt": "<p>Print the address on three lines:</p><pre>Қазақстан\nАлматы қаласы\nАбай даңғылы, 10</pre>",
     "hints": [
      "Write a separate <code>print</code> for each line."
     ]
    },
    {
     "title": "Text and a number",
     "prompt": "<p>Use one <code>print</code> with a text and a number separated by a comma to print this line: <code>Сыныптағы оқушылар: 28</code>. Write the number without quotes.</p>",
     "hints": [
      "<code>print(\"Сыныптағы оқушылар:\", 28)</code>: the comma adds a space."
     ]
    },
    {
     "title": "Train timetable",
     "prompt": "<p>Print the train timetable on three lines:</p><pre>Пойыз 001: Алматы - Астана\nПойыз 015: Астана - Павлодар\nПойыз 703: Шымкент - Түркістан</pre>",
     "hints": [
      "You need three separate <code>print</code> calls. Keep the spaces exactly as shown."
     ]
    },
    {
     "title": "Code with a comment",
     "prompt": "<p>First write a comment line that starts with the <code>#</code> symbol (any text), then print the line <code>Ауа райы: +5 °C</code>. The comment must not appear on the screen.</p>",
     "hints": [
      "A line starting with <code># ...</code> is not executed."
     ]
    },
    {
     "title": "Grades on one line",
     "prompt": "<p>Use one <code>print</code> with a text and four numbers separated by commas to print: <code>Бағалар: 5 4 5 3</code>. Write the numbers without quotes.</p>",
     "hints": [
      "Values separated by commas are printed with spaces between them."
     ]
    },
    {
     "title": "Fix the code",
     "prompt": "<p>The code below has two errors. Fix them so that two lines are printed:</p><pre>Сәлем\nӘлем</pre>",
     "hints": [
      "Python is case-sensitive: <code>print</code> is written in lowercase.",
      "Close the quote and add the brackets."
     ]
    },
    {
     "title": "Text with quotes",
     "prompt": "<p>Print this exact line (it contains double quotes inside): <code>Ұстаз: \"Сабақ басталды!\" деді</code></p>",
     "hints": [
      "Wrap the text in single quotes <code>'...'</code>, then the double quotes inside become part of the text."
     ]
    }
   ]
  },
  "py-2": {
   "pr": [
    {
     "title": "Information about a student",
     "prompt": "<p>Assign <code>\"Әлия\"</code> to the variable <code>name</code> and <code>15</code> to the variable <code>age</code>. Then run <code>print(name, age)</code>.</p>",
     "hints": [
      "<code>name = \"Әлия\"</code>"
     ],
     "check": {
      "tests": "assert name == \"Әлия\", \"the variable name must be \\\"Әлия\\\"\"\nassert age == 15 and isinstance(age, int), \"the variable age must be the integer 15\""
     }
    },
    {
     "title": "Variable type",
     "prompt": "<p>Given: <code>temp = -12.5</code>. Print its type using <code>type()</code>. The result is: <code>&lt;class 'float'&gt;</code>.</p>",
     "hints": [
      "<code>print(type(temp))</code>"
     ]
    },
    {
     "title": "Number to text",
     "prompt": "<p>Given: <code>year = 2026</code>. Convert it to text with <code>str()</code>, store it in the variable <code>text</code>. Then run <code>print(text + \" жыл\")</code>: <code>2026 жыл</code>.</p>",
     "hints": [
      "<code>text = str(year)</code>"
     ],
     "check": {
      "tests": "assert isinstance(text, str), \"text must be a string (str): use str(year)\"\nassert text == \"2026\", \"text must be \\\"2026\\\"\""
     }
    },
    {
     "title": "Updating a balance",
     "prompt": "<p>A card has <code>balance = 5000</code> tenge. Add 1500 tenge with <code>+=</code>, then withdraw 2000 tenge with <code>-=</code>. Print the final balance (<code>4500</code>).</p>",
     "hints": [
      "<code>balance += 1500</code>"
     ],
     "check": {
      "tests": "assert balance == 4500, \"balance must be 4500 at the end\""
     }
    },
    {
     "title": "Joining words",
     "prompt": "<p>Given <code>part1 = \"Көк\"</code> and <code>part2 = \"тал\"</code>. Join them with <code>+</code>, store the result in the variable <code>place</code>, and print it: <code>Көктал</code>.</p>",
     "hints": [
      "<code>place = part1 + part2</code>"
     ],
     "check": {
      "tests": "assert place == \"Көктал\", \"place must be \\\"Көктал\\\"\""
     }
    },
    {
     "title": "Decimal number from text",
     "prompt": "<p>A thermometer reading came as text: <code>raw = \"36.6\"</code>. Convert it to a number with <code>float()</code>, store it in the variable <code>temp</code>. Then print <code>temp + 0.5</code> (<code>37.1</code>).</p>",
     "hints": [
      "<code>float(raw)</code>"
     ],
     "check": {
      "tests": "assert isinstance(temp, float), \"temp must be of type float: use float(raw)\"\nassert temp == 36.6, \"temp must be 36.6\""
     }
    },
    {
     "title": "Add two texts as numbers",
     "prompt": "<p>The sales of two shops are given as text: <code>a = \"1200\"</code>, <code>b = \"850\"</code>. Convert them to whole numbers and add them, store the result in the variable <code>total</code>. Then use <code>+</code> to build a text and print <code>Барлығы: 2050</code>.</p>",
     "hints": [
      "<code>\"1200\" + \"850\"</code> just joins the texts. You need <code>int()</code> first.",
      "To add a number to a text, use <code>str(total)</code>."
     ],
     "check": {
      "tests": "assert total == 2050 and isinstance(total, int), \"total must be the integer 2050\""
     }
    },
    {
     "title": "Swapping values",
     "prompt": "<p><code>a = \"Алматы\"</code>, <code>b = \"Астана\"</code>. Swap their values using a third variable (<code>tmp</code>): at the end <code>a</code> = <code>\"Астана\"</code> and <code>b</code> = <code>\"Алматы\"</code>. Then run <code>print(a, b)</code>.</p>",
     "hints": [
      "<code>tmp = a</code>, then <code>a = b</code>, then <code>b = tmp</code>."
     ],
     "check": {
      "tests": "assert a == \"Астана\", \"at the end a must be \\\"Астана\\\"\"\nassert b == \"Алматы\", \"at the end b must be \\\"Алматы\\\"\""
     }
    }
   ]
  },
  "py-3": {
   "pr": [
    {
     "title": "Bus fare cost",
     "prompt": "<p>One fare costs <code>ticket = 200</code> tenge, and you ride <code>trips = 22</code> times a month. Store the monthly cost in the variable <code>cost</code> and print it.</p>",
     "hints": [
      "<code>ticket * trips</code>"
     ],
     "check": {
      "tests": "assert cost == 4400, \"cost must be 4400\""
     }
    },
    {
     "title": "Splitting into groups",
     "prompt": "<p>50 students came to a camp and they are split into groups of 4. Store the number of full groups in <code>groups</code> and the students left without a group in <code>left</code>, then run <code>print(groups, left)</code>.</p>",
     "hints": [
      "<code>//</code> is integer division, <code>%</code> is the remainder."
     ],
     "check": {
      "tests": "assert groups == 12, \"groups must be 12: use //\"\nassert left == 2, \"left must be 2: use %\""
     }
    },
    {
     "title": "Room area",
     "prompt": "<p>A square room has a side of <code>side = 12</code> metres. Calculate its area with the <code>**</code> operator, store it in the variable <code>area</code>, and print it.</p>",
     "hints": [
      "<code>side ** 2</code>"
     ],
     "check": {
      "tests": "assert area == 144, \"area must be 144\""
     }
    },
    {
     "title": "Average temperature",
     "prompt": "<p>Temperatures for three days: <code>-7</code>, <code>2</code>, <code>9</code>. Calculate the average, round it to 2 decimal places, store it in the variable <code>avg</code>, and print it.</p>",
     "hints": [
      "Put the sum in brackets: <code>(t1 + t2 + t3) / 3</code>."
     ],
     "check": {
      "tests": "assert avg == 1.33, \"avg must be 1.33: check the brackets and round(..., 2)\""
     }
    },
    {
     "title": "Discounted price",
     "prompt": "<p>A jacket costs <code>price = 18900</code> tenge, with a discount of <code>discount = 15</code> percent. Calculate the new price, round it to a whole number (<code>round()</code>), store it in the variable <code>new_price</code>, and print it.</p>",
     "hints": [
      "<code>price * (1 - discount / 100)</code>"
     ],
     "check": {
      "tests": "assert new_price == 16065, \"new_price must be 16065\""
     }
    },
    {
     "title": "Income growth",
     "prompt": "<p>In March the income was <code>old = 1_250_000</code>, in April <code>new = 1_475_000</code> tenge. Calculate the growth in percent, round it to 1 decimal place, store it in the variable <code>growth</code>, and print it.</p>",
     "hints": [
      "<code>(new - old) / old * 100</code>"
     ],
     "check": {
      "tests": "assert growth == 18.0, \"growth must be 18.0\""
     }
    },
    {
     "title": "Converting minutes to hours",
     "prompt": "<p>The trip from Almaty to Қапшағай takes <code>trip = 135</code> minutes. Use <code>//</code> and <code>%</code> to find the hours and minutes, and print them in one <code>print</code>: <code>2 сағ 15 мин</code>.</p>",
     "hints": [
      "1 hour = 60 minutes: <code>trip // 60</code> and <code>trip % 60</code>."
     ]
    },
    {
     "title": "Deposit income",
     "prompt": "<p>You put <code>start = 500000</code> tenge in a bank at an annual rate of 14%, with interest added every year. Calculate the amount after 3 years with the formula <code>final = start * 1.14 ** 3</code>. Print <code>round(final, 2)</code> and the net income <code>round(final - start, 2)</code> on one line.</p>",
     "hints": [
      "<code>**</code> is evaluated before multiplication.",
      "<code>print(round(final, 2), round(final - start, 2))</code>"
     ],
     "check": {
      "tests": "assert abs(final - 740772.0) < 0.01, \"final must be approximately 740772.0\""
     }
    }
   ]
  },
  "py-4": {
   "pr": [
    {
     "title": "Convert to lowercase",
     "prompt": "<p><code>raw = \"ПАВЛОДАР\"</code>. Print the text in lowercase: <code>павлодар</code>.</p>",
     "hints": [
      "<code>.lower()</code>"
     ]
    },
    {
     "title": "Length of a word",
     "prompt": "<p><code>word = \"Қызылорда\"</code>. Use <code>len()</code> to print how many letters are in the word.</p>",
     "hints": [
      "<code>len(word)</code>"
     ]
    },
    {
     "title": "First letter and the beginning",
     "prompt": "<p><code>name = \"Тараз\"</code>. Use one <code>print</code> to print the first letter of the name and its first 3 letters: <code>Т Тар</code>.</p>",
     "hints": [
      "Indexing starts at 0: <code>name[0]</code>, slice: <code>name[:3]</code>."
     ]
    },
    {
     "title": "Cleaning a phone number",
     "prompt": "<p><code>phone = \"8 701 555 12 34\"</code>. Remove the spaces, store the result in the variable <code>clean</code>, and print it: <code>87015551234</code>.</p>",
     "hints": [
      "<code>.replace(\" \", \"\")</code>"
     ],
     "check": {
      "tests": "assert clean == \"87015551234\", \"clean must be \\\"87015551234\\\"\""
     }
    },
    {
     "title": "Splitting cities",
     "prompt": "<p><code>s = \"Алматы;Астана;Шымкент;Ақтау\"</code>. Use <code>split</code> to split it into the list <code>parts</code>, and print the number of cities (<code>len(parts)</code>).</p>",
     "hints": [
      "The separator is a semicolon: <code>s.split(\";\")</code>."
     ],
     "check": {
      "tests": "assert parts == [\"Алматы\", \"Астана\", \"Шымкент\", \"Ақтау\"], \"the list parts is wrong:\" + str(parts)"
     }
    },
    {
     "title": "Formatting a price",
     "prompt": "<p><code>price = 1234567.891</code>. Use an f-string to print the number with a thousands separator and 2 decimal places: <code>1,234,567.89 ₸</code>.</p>",
     "hints": [
      "Format: <code>{price:,.2f}</code>"
     ]
    },
    {
     "title": "Short name",
     "prompt": "<p><code>raw = \"  жАНАР сЕРІКҚЫЗЫ \"</code>. Remove the spaces at the edges and write each word with a capital first letter (<code>Жанар Серікқызы</code>). Then split the text with <code>split</code> and use an f-string to print <b>the surname and the first letter of the first name</b>: <code>Серікқызы Ж.</code></p>",
     "hints": [
      "<code>raw.strip().title()</code>, then <code>.split(\" \")</code>.",
      "The first letter of the first name: <code>parts[0][0]</code>."
     ]
    },
    {
     "title": "Domain from an email",
     "prompt": "<p><code>email = \" Aigerim.K@Mail.KZ \"</code>. Remove the extra spaces, convert to lowercase, and store the result in <code>clean</code>. Then print the domain that comes after the <code>@</code> symbol: <code>mail.kz</code>.</p>",
     "hints": [
      "<code>.strip().lower()</code>",
      "<code>clean.split(\"@\")</code> gives two parts, the domain is the second one (index 1)."
     ],
     "check": {
      "tests": "assert clean == \"aigerim.k@mail.kz\", \"clean must be \\\"aigerim.k@mail.kz\\\"\""
     }
    }
   ]
  },
  "py-5": {
   "pr": [
    {
     "title": "Even or odd",
     "prompt": "<p><code>n = 17</code>. If the number is even, print <code>жұп</code>, otherwise print <code>тақ</code>.</p>",
     "hints": [
      "An even number: <code>n % 2 == 0</code>"
     ]
    },
    {
     "title": "Is there frost",
     "prompt": "<p><code>temp = -8</code>. If the temperature is below 0, print <code>Аяз</code>, otherwise print <code>Аяз жоқ</code>.</p>",
     "hints": [
      "<code>if temp &lt; 0:</code>"
     ]
    },
    {
     "title": "Coming of age",
     "prompt": "<p><code>age = 16</code>. If the age is less than 18, print <code>Кәмелетке толмаған</code>, otherwise print <code>Кәмелетке толған</code>.</p>",
     "hints": [
      "<code>if age &lt; 18:</code>"
     ]
    },
    {
     "title": "Type of fare",
     "prompt": "<p>Determine the fare based on <code>age</code>: under 7 — <code>Тегін</code>, 63 and over — <code>Жеңілдік</code>, the rest — <code>Толық баға</code>. For <code>age = 70</code> the output must be <code>Жеңілдік</code>.</p>",
     "hints": [
      "<code>if</code>, <code>elif</code>, <code>else</code> — three branches."
     ]
    },
    {
     "title": "Day off",
     "prompt": "<p><code>day = \"сенбі\"</code>. If the day is in the list <code>[\"сенбі\", \"жексенбі\"]</code>, print <code>Демалыс</code>, otherwise print <code>Жұмыс күні</code>.</p>",
     "hints": [
      "<code>if day in [...]:</code>"
     ]
    },
    {
     "title": "One-line condition",
     "prompt": "<p><code>amount = 4200</code>. Use a one-line condition to store <code>\"үлкен\"</code> in the variable <code>label</code> if the amount is greater than 3000, otherwise store <code>\"кіші\"</code>. Then print <code>label</code>.</p>",
     "hints": [
      "<code>label = \"үлкен\" if amount &gt; 3000 else \"кіші\"</code>"
     ],
     "check": {
      "tests": "assert label == \"үлкен\", \"label must be \\\"үлкен\\\"\""
     }
    },
    {
     "title": "Grant or quota",
     "prompt": "<p>The applicant's exam score is given as <code>score</code>, and <code>rural</code> shows whether the applicant is from a village. Rules: 120 and above — <code>Грант</code>; 100 and above <b>and</b> from a village — <code>Ауыл квотасы</code>; the rest — <code>Ақылы</code>. Print the result with an f-string in the form <code>108 балл: Ауыл квотасы</code>.</p>",
     "hints": [
      "Check the strictest condition first: <code>score &gt;= 120</code>.",
      "<code>elif score &gt;= 100 and rural:</code>"
     ]
    },
    {
     "title": "Leap year",
     "prompt": "<p>A year is a leap year if it is divisible by 4 and not divisible by 100, <b>or</b> if it is divisible by 400. For <code>year = 2024</code> print <code>2024 — кібісе жыл</code>, otherwise print <code>2024 — кібісе емес</code> (use an f-string).</p>",
     "hints": [
      "Divisible: <code>year % 4 == 0</code>.",
      "Group the conditions with brackets: <code>(... and ...) or ...</code>."
     ]
    }
   ]
  },
  "py-6": {
   "pr": [
    {
     "title": "First and last day",
     "prompt": "<p>A week of temperatures is given as a list. Print the first and the last value on one line: <code>-3 2</code>.</p>",
     "hints": [
      "The last element: <code>temps[-1]</code>."
     ]
    },
    {
     "title": "Number of students in the class",
     "prompt": "<p>Print how many students are in the list <code>students</code>.</p>",
     "hints": [
      "<code>len(students)</code>"
     ]
    },
    {
     "title": "Price difference",
     "prompt": "<p>The petrol prices are given for different gas stations. Print the difference between the most expensive and the cheapest price.</p>",
     "hints": [
      "<code>max(prices) - min(prices)</code>"
     ]
    },
    {
     "title": "Middle of the week",
     "prompt": "<p>The sales for 7 days are given. Use a slice to store the sales for days 3, 4 and 5 in the list <code>mid</code>, and print it: <code>[140, 80, 110]</code>.</p>",
     "hints": [
      "The index of day 3 is 2. The end of a slice is not included: <code>sales[2:5]</code>."
     ],
     "check": {
      "tests": "assert mid == [140, 80, 110], \"the list mid must be [140, 80, 110]\""
     }
    },
    {
     "title": "Top three results",
     "prompt": "<p>The points of the contest participants are given. Use <code>sorted(..., reverse=True)</code> to store the three highest points in the list <code>top3</code>, and print it.</p>",
     "hints": [
      "Sort in descending order and take <code>[:3]</code>."
     ],
     "check": {
      "tests": "assert top3 == [99, 92, 88], \"top3 must be [99, 92, 88]\"\nassert scores == [78, 92, 85, 64, 99, 71, 88], \"the list scores must not change: use sorted()\""
     }
    },
    {
     "title": "New value and average",
     "prompt": "<p>Add today's temperature of <code>5</code> degrees to the list <code>temps</code> with <code>append</code>. Then print the average of the list, rounded to 1 decimal place.</p>",
     "hints": [
      "<code>temps.append(5)</code>",
      "<code>round(sum(temps) / len(temps), 1)</code>"
     ],
     "check": {
      "tests": "assert temps == [-2, 0, 3, 6, 1, 5], \"temps must contain the value 5 at the end\""
     }
    },
    {
     "title": "Average of the top three",
     "prompt": "<p>The students' test results are given. Calculate the average of the three highest results, round it to 2 decimal places, and store it in the variable <code>avg_top</code>. Print it with an f-string: <code>Үздік үштік: 92.33</code>.</p>",
     "hints": [
      "First, <code>sorted(results, reverse=True)[:3]</code>.",
      "Then <code>sum(...) / 3</code> and <code>round(..., 2)</code>."
     ],
     "check": {
      "tests": "assert avg_top == 92.33, \"avg_top must be 92.33\""
     }
    },
    {
     "title": "Share of weekend sales",
     "prompt": "<p>The sales from Monday to Sunday are given. What percentage of the total sales is made by the last two days (Saturday and Sunday)? Store the result in the variable <code>share</code>, rounded to 1 decimal place, and print it as <code>Демалыс үлесі: 40.0%</code>.</p>",
     "hints": [
      "The last two elements: <code>sales[-2:]</code>.",
      "Share: <code>part / total * 100</code>."
     ],
     "check": {
      "tests": "assert share == 40.0, \"share is wrong:\" + str(share)"
     }
    }
   ]
  },
  "py-7": {
   "pr": [
    {
     "title": "Numbering cities",
     "prompt": "<p>Print each city from the list <code>cities</code> with its number. Numbering starts from 1:</p><pre>1. Алматы\n2. Астана\n3. Шымкент</pre>",
     "hints": [
      "<code>for i, c in enumerate(cities):</code>, number: <code>i + 1</code>."
     ]
    },
    {
     "title": "Sum from 1 to 100",
     "prompt": "<p>Use <code>range</code> and a loop to calculate the sum of all numbers from 1 to 100 inclusive and print it.</p>",
     "hints": [
      "<code>range(1, 101)</code> includes 100.",
      "Set <code>total = 0</code> before the loop."
     ]
    },
    {
     "title": "From Celsius to Fahrenheit",
     "prompt": "<p>Convert each temperature to Fahrenheit (<code>c * 9 / 5 + 32</code>), round it to 1 decimal place, and print each value on a separate line.</p>",
     "hints": [
      "<code>for c in temps:</code>"
     ]
    },
    {
     "title": "Number of expensive goods",
     "prompt": "<p>Use a loop to count how many goods cost more than 10 000. Store the count in the variable <code>count</code> and print it.</p>",
     "hints": [
      "Counter: <code>count += 1</code>."
     ],
     "check": {
      "tests": "assert count == 4, \"count must be 4\""
     }
    },
    {
     "title": "Counting long names",
     "prompt": "<p>How many city names are longer than 6 letters? Use a loop and <code>len()</code> to count them, store the result in <code>long_count</code>, and print it.</p>",
     "hints": [
      "<code>if len(c) &gt; 6:</code>"
     ],
     "check": {
      "tests": "assert long_count == 3, \"long_count must be 3\""
     }
    },
    {
     "title": "Find the largest with a loop",
     "prompt": "<p>Without <code>max()</code>, use a loop to find the highest daily income, store it in the variable <code>best</code>, and print it. Use the first element of the list as the starting value.</p>",
     "hints": [
      "<code>best = revenue[0]</code>, then compare each <code>r</code>."
     ],
     "check": {
      "tests": "assert best == 67000, \"best must be 67000\""
     }
    },
    {
     "title": "Running total",
     "prompt": "<p>Daily income is given. For each day print the total income <b>up to and including that day</b>:</p><pre>1-күн: 1200\n2-күн: 2000\n3-күн: 3500\n4-күн: 4400</pre>",
     "hints": [
      "Set the accumulator <code>total</code> to 0 before the loop.",
      "<code>print</code> must be inside the loop."
     ]
    },
    {
     "title": "Numbers divisible by 3 or 5",
     "prompt": "<p>A shop gives a gift to every 3rd and every 5th customer from 1 to 100 (inclusive). Calculate the sum of all numbers from 1 to 100 that are divisible by 3 <b>or</b> by 5 with no remainder, store it in the variable <code>total</code>, and print it.</p>",
     "hints": [
      "<code>n % 3 == 0 or n % 5 == 0</code>"
     ],
     "check": {
      "tests": "assert total == 2418, \"total must be 2418\""
     }
    }
   ]
  },
  "py-8": {
   "pr": [
    {
     "title": "Countdown",
     "prompt": "<p>Use <code>while</code> to count down from 5 to 1, printing each number on a separate line, and at the end print <code>Старт!</code>.</p>",
     "hints": [
      "<code>while n &gt; 0:</code>, inside it <code>n -= 1</code>."
     ]
    },
    {
     "title": "Saving for a laptop",
     "prompt": "<p>You save 15 000 tenge a month. How many months does it take to reach 100 000 (or exceed it)? Use <code>while</code> to count the months in the variable <code>months</code>, and print it.</p>",
     "hints": [
      "Condition: <code>while savings &lt; 100000:</code>"
     ],
     "check": {
      "tests": "assert months == 7, \"months must be 7\""
     }
    },
    {
     "title": "Skipping negative amounts",
     "prompt": "<p>Skip the negative amounts in the list with <code>continue</code> and print the rest, each on a separate line.</p>",
     "hints": [
      "<code>if a &lt; 0: continue</code>"
     ]
    },
    {
     "title": "First large order",
     "prompt": "<p>Print the index and the amount of the <b>first</b> order whose amount is greater than 10 000 on one line (<code>3 12500</code>), and stop the loop with <code>break</code>.</p>",
     "hints": [
      "<code>enumerate(orders)</code> gives the index.",
      "Use <code>break</code> when you find it."
     ]
    },
    {
     "title": "Sum of digits",
     "prompt": "<p>Calculate the sum of the digits of the number <code>n = 2026</code> with <code>while</code>: the last digit is <code>n % 10</code>, and removing it is <code>n //= 10</code>. The result must be stored in the variable <code>s</code>, then print it (<code>10</code>).</p>",
     "hints": [
      "<code>while n &gt; 0:</code>",
      "<code>s += n % 10</code>, then <code>n //= 10</code>."
     ],
     "check": {
      "tests": "assert s == 10, \"s must be 10\""
     }
    },
    {
     "title": "Until the end marker",
     "prompt": "<p>Counter readings come as text, and <code>\"end\"</code> marks the end of the data. Convert the values before <code>\"end\"</code> to <code>int</code> and add them up in <code>total</code>. When you meet <code>\"end\"</code>, use <code>break</code>. Print the sum.</p>",
     "hints": [
      "First <code>if r == \"end\": break</code>, then <code>int(r)</code>."
     ],
     "check": {
      "tests": "assert total == 355, \"total must be 355: values after end must not be added\""
     }
    },
    {
     "title": "Repaying a loan",
     "prompt": "<p>The remaining loan is <code>debt = 500000</code> tenge. At the start of each month 2% is added to the remaining debt (<code>debt = debt * 1.02</code>), then 60 000 tenge is paid. How many months will it take until the debt is 0 or less? Count the months in the variable <code>months</code> and print it.</p>",
     "hints": [
      "Condition: <code>while debt &gt; 0:</code>",
      "Inside the loop, first apply the interest, then the payment."
     ],
     "check": {
      "tests": "assert months == 10, \"months must be 10\""
     }
    },
    {
     "title": "Average of valid scores",
     "prompt": "<p>Test scores: <code>-1</code> — the student was absent (skip it, <code>continue</code>), <code>999</code> — the end of the list (stop, <code>break</code>). 0 is a valid score. Calculate the average of the valid scores, round it to 1 decimal place, store it in the variable <code>avg</code>, and print it.</p>",
     "hints": [
      "Collect the sum and the count separately.",
      "Check for <code>999</code> first."
     ],
     "check": {
      "tests": "assert avg == 63.8, \"avg must be 63.8:\" + str(avg)"
     }
    }
   ]
  },
  "py-9": {
   "pr": [
    {
     "title": "Apartment area",
     "prompt": "<p>Write the function <code>area(length, width)</code> that returns the area of a rectangular room. For example, <code>area(5, 4)</code> → <code>20</code>.</p>",
     "hints": [
      "<code>return length * width</code>"
     ],
     "check": {
      "tests": "assert area(5, 4) == 20, \"area(5, 4) must return 20\"\nassert area(3.5, 2) == 7.0, \"area(3.5, 2) must return 7.0\"\nassert area(0, 9) == 0, \"area(0, 9) must return 0\""
     }
    },
    {
     "title": "Check for even numbers",
     "prompt": "<p>The function <code>is_even(n)</code> must return <code>True</code> if the number is even and <code>False</code> if it is odd.</p>",
     "hints": [
      "<code>return n % 2 == 0</code>"
     ],
     "check": {
      "tests": "assert is_even(4) is True, \"is_even(4) must return True\"\nassert is_even(7) is False, \"is_even(7) must return False\"\nassert is_even(0) is True, \"is_even(0) must return True\""
     }
    },
    {
     "title": "Last name and first name",
     "prompt": "<p>The function <code>full_name(first, last)</code> returns the last name and the first name separated by a space: <code>full_name(\"Дана\", \"Серікова\")</code> → <code>\"Серікова Дана\"</code>.</p>",
     "hints": [
      "<code>return f\"{last} {first}\"</code>"
     ],
     "check": {
      "tests": "assert full_name(\"Дана\", \"Серікова\") == \"Серікова Дана\", \"full_name(\\\"Дана\\\", \\\"Серікова\\\") must return \\\"Серікова Дана\\\"\"\nassert full_name(\"Ерлан\", \"Ахметов\") == \"Ахметов Ерлан\", \"full_name(\\\"Ерлан\\\", \\\"Ахметов\\\") must return \\\"Ахметов Ерлан\\\"\""
     }
    },
    {
     "title": "Tenge to dollars",
     "prompt": "<p>The function <code>to_usd(kzt, rate=500)</code> converts tenge to dollars and returns the result rounded to 2 decimal places. If no rate is given, use 500. For example, <code>to_usd(10000)</code> → <code>20.0</code>, <code>to_usd(10000, 480)</code> → <code>20.83</code>.</p>",
     "hints": [
      "<code>return round(kzt / rate, 2)</code>"
     ],
     "check": {
      "tests": "assert to_usd(10000) == 20.0, \"to_usd(10000) must return 20.0\"\nassert to_usd(10000, 480) == 20.83, \"to_usd(10000, 480) must return 20.83\"\nassert to_usd(0) == 0, \"to_usd(0) must return 0\""
     }
    },
    {
     "title": "Weather description",
     "prompt": "<p>The function <code>weather(t)</code>: if <code>t</code> is below −20, it returns <code>\"қатты аяз\"</code>; below 0, <code>\"аяз\"</code>; below 15, <code>\"салқын\"</code>; otherwise <code>\"жылы\"</code>.</p>",
     "hints": [
      "Start with the coldest condition: <code>if t &lt; -20:</code>"
     ],
     "check": {
      "tests": "assert weather(-25) == \"қатты аяз\", \"weather(-25) must return \\\"қатты аяз\\\"\"\nassert weather(-20) == \"аяз\", \"weather(-20) must return \\\"аяз\\\" (boundary)\"\nassert weather(0) == \"салқын\", \"weather(0) must return \\\"салқын\\\"\"\nassert weather(15) == \"жылы\", \"weather(15) must return \\\"жылы\\\"\"\nassert weather(30) == \"жылы\", \"weather(30) must return \\\"жылы\\\"\""
     }
    },
    {
     "title": "Price with a discount",
     "prompt": "<p>The function <code>final_price(price, discount=0)</code> takes the discount percentage into account and returns the price rounded to a whole number. If the discount is less than 0 or more than 50, it is an invalid value: return the price unchanged.</p><p>For example, <code>final_price(20000, 15)</code> → <code>17000</code>, <code>final_price(20000, 80)</code> → <code>20000</code>.</p>",
     "hints": [
      "First check for an invalid discount and immediately <code>return price</code>."
     ],
     "check": {
      "tests": "assert final_price(20000, 15) == 17000, \"final_price(20000, 15) must return 17000\"\nassert final_price(20000) == 20000, \"If no discount is given, the price does not change\"\nassert final_price(20000, 80) == 20000, \"80% is an invalid discount, the price must not change\"\nassert final_price(20000, -5) == 20000, \"A negative discount is an error, the price must not change\"\nassert final_price(9990, 50) == 4995, \"final_price(9990, 50) must return 4995\""
     }
    },
    {
     "title": "Average of a list",
     "prompt": "<p>The function <code>average(xs)</code> returns the average of a list of numbers, rounded to 2 decimal places. If the list is empty, return <code>0</code> (do not divide by zero).</p>",
     "hints": [
      "Check for an empty list first: <code>if len(xs) == 0:</code>",
      "<code>round(sum(xs) / len(xs), 2)</code>"
     ],
     "check": {
      "tests": "assert average([4, 5, 3]) == 4.0, \"average([4, 5, 3]) must return 4.0\"\nassert average([10, 15, 12]) == 12.33, \"average([10, 15, 12]) must return 12.33\"\nassert average([]) == 0, \"For an empty list it must return 0\""
     }
    },
    {
     "title": "Total delivery cost",
     "prompt": "<p>Taxi delivery: the first 3 km cost 500 tenge, and each following km costs another 100 tenge. The function <code>fee(km)</code> returns the cost of one trip (for example, <code>fee(2)</code> → 500, <code>fee(7)</code> → 900). The function <code>total_fee(distances)</code> returns the total cost of all trips in the list and calls <code>fee</code> inside.</p>",
     "hints": [
      "<code>fee</code>: up to 3 km it is 500, after that <code>500 + (km - 3) * 100</code>.",
      "Inside <code>total_fee</code>, use a loop and an accumulator."
     ],
     "check": {
      "tests": "assert fee(2) == 500, \"fee(2) must return 500\"\nassert fee(3) == 500, \"fee(3) must return 500\"\nassert fee(7) == 900, \"fee(7) must return 900\"\nassert total_fee([2, 7, 4]) == 2000, \"total_fee([2, 7, 4]) must return 2000\"\nassert total_fee([]) == 0, \"For an empty list, 0\""
     }
    }
   ]
  },
  "py-10": {
   "pr": [
    {
     "title": "City population",
     "prompt": "<p>The function <code>population(pop, city)</code> returns the population of a city from the dictionary <code>pop</code>. If the city is not in the dictionary, return <code>0</code>.</p>",
     "hints": [
      "<code>pop.get(city, 0)</code>"
     ],
     "check": {
      "tests": "assert population(pop, \"Астана\") == 1500000, \"the population of Астана must be 1500000\"\nassert population(pop, \"Тараз\") == 0, \"for a missing city it must return 0\""
     }
    },
    {
     "title": "Adding goods to the warehouse",
     "prompt": "<p>The function <code>add_stock(stock, item, qty)</code> increases the number of goods <code>item</code> in the dictionary <code>stock</code> by <code>qty</code>. If the item does not exist, add a new key. The function returns the dictionary.</p>",
     "hints": [
      "<code>stock[item] = stock.get(item, 0) + qty</code>"
     ],
     "check": {
      "tests": "assert add_stock({\"нан\": 10}, \"нан\", 5) == {\"нан\": 15}, \"Adding to an existing item works incorrectly\"\nassert add_stock({\"нан\": 10}, \"сүт\", 3) == {\"нан\": 10, \"сүт\": 3}, \"The new item was not added\""
     }
    },
    {
     "title": "The most expensive item",
     "prompt": "<p>The function <code>most_expensive(prices)</code> loops through <code>.items()</code> and returns the name of the most expensive item. Assume the dictionary is not empty.</p>",
     "hints": [
      "Keep the highest price and its name in two variables."
     ],
     "check": {
      "tests": "assert most_expensive({\"Термос\": 9000, \"Ноутбук\": 350000, \"Рюкзак\": 15000}) == \"Ноутбук\", \"It must return Ноутбук\"\nassert most_expensive({\"шай\": 700}) == \"шай\", \"If there is only one item, it must be returned\""
     }
    },
    {
     "title": "Counting letters",
     "prompt": "<p>The function <code>letter_counts(word)</code> returns a dictionary with the number of each letter in the word. For example, <code>letter_counts(\"алма\")</code> → <code>{\"а\": 2, \"л\": 1, \"м\": 1}</code>.</p>",
     "hints": [
      "A string can be looped over like a list: <code>for ch in word:</code>",
      "<code>counts[ch] = counts.get(ch, 0) + 1</code>"
     ],
     "check": {
      "tests": "assert letter_counts(\"алма\") == {\"а\": 2, \"л\": 1, \"м\": 1}, \"letter_counts(\\\"алма\\\") works incorrectly\"\nassert letter_counts(\"\") == {}, \"For an empty word, an empty dictionary\""
     }
    },
    {
     "title": "Students by class",
     "prompt": "<p>The students are given as a list of dictionaries. The function <code>count_by_class(students)</code> returns a dictionary with the number of students in each class.</p>",
     "hints": [
      "The class of each student: <code>s[\"class\"]</code>."
     ],
     "check": {
      "tests": "assert count_by_class(students) == {\"9А\": 3, \"9Ә\": 1, \"10А\": 1}, \"Result:\" + str(count_by_class(students))\nassert count_by_class([]) == {}, \"For an empty list, an empty dictionary\""
     }
    },
    {
     "title": "Goods above a limit",
     "prompt": "<p>The function <code>above(prices, limit)</code> returns a list of the names of goods whose price is higher than <code>limit</code> (in the order of the dictionary).</p>",
     "hints": [
      "<code>for name, price in prices.items():</code>"
     ],
     "check": {
      "tests": "_p = {\"Қымыз\": 1800, \"Шұбат\": 2200, \"Айран\": 600, \"Құрт\": 2500}\nassert above(_p, 2000) == [\"Шұбат\", \"Құрт\"], \"above(..., 2000) must return [\\\"Шұбат\\\", \\\"Құрт\\\"]\"\nassert above(_p, 5000) == [], \"If nothing passes, an empty list\""
     }
    },
    {
     "title": "Average grade by subject",
     "prompt": "<p>The grades are given as a list of dictionaries. The function <code>avg_by_subject(grades)</code> returns a dictionary: for each subject, the average grade rounded to 1 decimal place.</p>",
     "hints": [
      "Collect two dictionaries: the sum and the count.",
      "At the end, for each subject: <code>round(totals[s] / counts[s], 1)</code>."
     ],
     "check": {
      "tests": "assert avg_by_subject(grades) == {\"математика\": 4.7, \"физика\": 3.5}, \"Result:\" + str(avg_by_subject(grades))\nassert avg_by_subject([]) == {}, \"For an empty list, an empty dictionary\""
     }
    },
    {
     "title": "The most frequent word",
     "prompt": "<p>The function <code>top_word(text)</code> returns the most frequent word in the text. Convert the text to lowercase and split it by spaces. If several words have the same frequency, return the one that appears first in the text.</p>",
     "hints": [
      "<code>text.lower().split()</code>",
      "After counting, use <code>.items()</code> to find the largest value (<code>&gt;</code>; do not replace on a tie)."
     ],
     "check": {
      "tests": "assert top_word(\"Алма алма өрік Алма өрік\") == \"алма\", \"top_word(...) must return \\\"алма\\\"\"\nassert top_word(\"шай сүт сүт шай нан\") == \"шай\", \"With equal frequencies, the word that appears first must be returned\"\nassert top_word(\"Тараз\") == \"тараз\", \"If there is only one word, return it (in lowercase)\""
     }
    }
   ]
  },
  "py-11": {
   "pr": [
    {
     "title": "List of squares",
     "prompt": "<p>The function <code>squares(n)</code> uses a comprehension to return the list of squares of the numbers from 1 to <code>n</code> inclusive: <code>squares(4)</code> → <code>[1, 4, 9, 16]</code>.</p>",
     "hints": [
      "<code>[i ** 2 for i in range(1, n + 1)]</code>"
     ],
     "check": {
      "tests": "assert squares(4) == [1, 4, 9, 16], \"squares(4) must return [1, 4, 9, 16]\"\nassert squares(0) == [], \"squares(0) must return an empty list\""
     }
    },
    {
     "title": "Only positive temperatures",
     "prompt": "<p>The function <code>positives(temps)</code> uses a comprehension to return only the values greater than 0 (keeping the order).</p>",
     "hints": [
      "<code>[t for t in temps if t &gt; 0]</code>"
     ],
     "check": {
      "tests": "assert positives([-5, 3, 0, 12, -1, 7]) == [3, 12, 7], \"positives([-5, 3, 0, 12, -1, 7]) must return [3, 12, 7]\"\nassert positives([-2, -8]) == [], \"If there are no positive numbers, an empty list\""
     }
    },
    {
     "title": "Lengths of names",
     "prompt": "<p>The function <code>lengths(words)</code> uses a comprehension to return the list of the length of each word: <code>lengths([\"Ақтау\", \"Орал\"])</code> → <code>[5, 4]</code>.</p>",
     "hints": [
      "<code>[len(w) for w in words]</code>"
     ],
     "check": {
      "tests": "assert lengths([\"Ақтау\", \"Орал\"]) == [5, 4], \"lengths([\\\"Ақтау\\\", \\\"Орал\\\"]) must return [5, 4]\"\nassert lengths([]) == [], \"An empty list\""
     }
    },
    {
     "title": "In thousands of tenge",
     "prompt": "<p>The function <code>to_thousands(amounts)</code> uses a comprehension to convert each amount to thousands of tenge, round it to 1 decimal place, and return the list: <code>to_thousands([12500, 980])</code> → <code>[12.5, 1.0]</code>.</p>",
     "hints": [
      "<code>[round(a / 1000, 1) for a in amounts]</code>"
     ],
     "check": {
      "tests": "assert to_thousands([12500, 980]) == [12.5, 1.0], \"to_thousands([12500, 980]) must return [12.5, 1.0]\"\nassert to_thousands([350000]) == [350.0], \"to_thousands([350000]) must return [350.0]\""
     }
    },
    {
     "title": "Dictionary of those who passed",
     "prompt": "<p>The function <code>passed(scores, limit=50)</code> uses a dictionary comprehension to keep only the students whose score is not lower than <code>limit</code>, and returns a new dictionary.</p>",
     "hints": [
      "<code>{k: v for k, v in scores.items() if v &gt;= limit}</code>"
     ],
     "check": {
      "tests": "_s = {\"Айжан\": 72, \"Бекзат\": 49, \"Дәурен\": 50, \"Сәуле\": 91}\nassert passed(_s) == {\"Айжан\": 72, \"Дәурен\": 50, \"Сәуле\": 91}, \"passed(scores) works incorrectly: 50 must pass\"\nassert passed(_s, 80) == {\"Сәуле\": 91}, \"passed(scores, 80) works incorrectly\""
     }
    },
    {
     "title": "Sum of even numbers",
     "prompt": "<p>The function <code>even_sum(xs)</code> returns the sum of the even numbers in the list in one line, without extra brackets, using a comprehension: <code>sum(... for ... if ...)</code>.</p>",
     "hints": [
      "<code>sum(x for x in xs if x % 2 == 0)</code>"
     ],
     "check": {
      "tests": "assert even_sum([3, 8, 12, 5, 6]) == 26, \"even_sum([3, 8, 12, 5, 6]) must return 26\"\nassert even_sum([1, 3]) == 0, \"If there are no even numbers, 0\""
     }
    },
    {
     "title": "Cleaning an email list",
     "prompt": "<p>The function <code>clean_emails(raw)</code> uses a comprehension to write each email in lowercase without spaces, and returns only the values that contain <code>@</code> (keeping the order).</p>",
     "hints": [
      "<code>e.strip().lower()</code>",
      "Condition: <code>if \"@\" in e</code>"
     ],
     "check": {
      "tests": "_r = [\" Asel@Mail.kz\", \"жоқ\", \"BOLAT@gmail.com \", \"\", \"info@shop.kz\"]\nassert clean_emails(_r) == [\"asel@mail.kz\", \"bolat@gmail.com\", \"info@shop.kz\"], \"Result:\" + str(clean_emails(_r))\nassert clean_emails([]) == [], \"An empty list\""
     }
    },
    {
     "title": "Names of expensive goods",
     "prompt": "<p>The goods are given as a list of dictionaries. The function <code>expensive_names(products, limit)</code> uses a comprehension to return the list of names of goods whose price is higher than <code>limit</code>, with a capital first letter (<code>.title()</code>).</p>",
     "hints": [
      "Each item is a dictionary: <code>p[\"name\"]</code>, <code>p[\"price\"]</code>."
     ],
     "check": {
      "tests": "assert expensive_names(products, 50000) == [\"Кілем\", \"Домбыра\"], \"expensive_names(products, 50000) works incorrectly:\" + str(expensive_names(products, 50000))\nassert expensive_names(products, 200000) == [], \"If nothing passes, an empty list\""
     }
    }
   ]
  },
  "py-12": {
   "pr": [
    {
     "title": "Safe division",
     "prompt": "<p>The function <code>safe_div(a, b)</code> returns <code>a / b</code>, but if <code>b</code> is zero, it uses <code>try/except ZeroDivisionError</code> to return <code>None</code>.</p>",
     "hints": [
      "<code>except ZeroDivisionError:</code>"
     ],
     "check": {
      "tests": "assert safe_div(10, 4) == 2.5, \"safe_div(10, 4) must return 2.5\"\nassert safe_div(5, 0) is None, \"safe_div(5, 0) must return None\""
     }
    },
    {
     "title": "Text to whole number",
     "prompt": "<p>The function <code>to_int(s)</code> converts the text to a whole number. If the conversion fails (<code>ValueError</code>), return <code>0</code>.</p>",
     "hints": [
      "<code>except ValueError: return 0</code>"
     ],
     "check": {
      "tests": "assert to_int(\"42\") == 42, \"to_int(\\\"42\\\") must return 42\"\nassert to_int(\"n/a\") == 0, \"to_int(\\\"n/a\\\") must return 0\"\nassert to_int(\"\") == 0, \"For an empty string, 0\""
     }
    },
    {
     "title": "Price of a missing item",
     "prompt": "<p>The function <code>get_price(prices, name)</code> returns <code>prices[name]</code>. If the item is missing, use <code>try/except KeyError</code> to return <code>-1</code>.</p>",
     "hints": [
      "<code>except KeyError:</code>"
     ],
     "check": {
      "tests": "_p = {\"нан\": 250, \"сүт\": 480}\nassert get_price(_p, \"сүт\") == 480, \"get_price(..., \\\"сүт\\\") must return 480\"\nassert get_price(_p, \"ет\") == -1, \"For a missing item, -1\""
     }
    },
    {
     "title": "Number of valid values",
     "prompt": "<p>The function <code>count_valid(raw)</code> counts how many values in the list can be converted to <code>float</code> and returns the count.</p>",
     "hints": [
      "Inside the loop use <code>try: float(r)</code>, and increase the counter when it succeeds."
     ],
     "check": {
      "tests": "assert count_valid([\"12.5\", \"abc\", \"7\", \"\", \"-3\"]) == 3, \"count_valid(...) must return 3\"\nassert count_valid([]) == 0, \"For an empty list, 0\""
     }
    },
    {
     "title": "Checking age",
     "prompt": "<p>The function <code>check_age(age)</code>: if the age is less than 0 or greater than 120, it raises <code>raise ValueError(\"жас дұрыс емес\")</code>, otherwise it returns the age.</p>",
     "hints": [
      "<code>raise ValueError(\"жас дұрыс емес\")</code>"
     ],
     "check": {
      "tests": "assert check_age(25) == 25, \"check_age(25) must return 25\"\nfor _bad in [-5, 150]:\n    try:\n        check_age(_bad)\n        _ok = False\n    except ValueError:\n        _ok = True\n    assert _ok, \"check_age(\" + str(_bad) + \") ValueError көтеруі керек\""
     }
    },
    {
     "title": "Safe average",
     "prompt": "<p>The function <code>avg_or_none(xs)</code> returns the average of a list. If the list is empty, catch <code>ZeroDivisionError</code> and return <code>None</code>.</p>",
     "hints": [
      "In an empty list <code>len(xs)</code> is 0, so the division raises an error."
     ],
     "check": {
      "tests": "assert avg_or_none([2, 4, 9]) == 5.0, \"avg_or_none([2, 4, 9]) must return 5.0\"\nassert avg_or_none([]) is None, \"For an empty list, None\""
     }
    },
    {
     "title": "Adding messy prices",
     "prompt": "<p>The prices are written in different ways: <code>\"12 500\"</code>, <code>\"3000₸\"</code>, <code>\"abc\"</code>. The function <code>parse_total(raw)</code> removes the spaces and the <code>₸</code> sign from each value, converts it to <code>float</code>, skips the values that cannot be converted, and returns the sum.</p>",
     "hints": [
      "<code>r.replace(\" \", \"\").replace(\"₸\", \"\")</code>",
      "Then <code>try: float(s)</code>."
     ],
     "check": {
      "tests": "assert parse_total([\"12 500\", \"3000₸\", \"abc\", \"\", \"750\"]) == 16250, \"parse_total(...) must return 16250\"\nassert parse_total([\"1 200 ₸\", \"n/a\"]) == 1200, \"parse_total([\\\"1 200 ₸\\\", \\\"n/a\\\"]) must return 1200\"\nassert parse_total([]) == 0, \"For an empty list, 0\""
     }
    },
    {
     "title": "Good and bad values",
     "prompt": "<p>The function <code>split_values(raw)</code> returns the dictionary <code>{\"ok\": [...], \"bad\": [...]}</code>: <code>\"ok\"</code> holds the numbers converted to <code>int</code>, and <code>\"bad\"</code> holds the original texts that could not be converted (both lists keep the order).</p>",
     "hints": [
      "Start the dictionary as <code>{\"ok\": [], \"bad\": []}</code>.",
      "Inside <code>except ValueError:</code> add <code>out[\"bad\"].append(r)</code>."
     ],
     "check": {
      "tests": "_r = split_values([\"15\", \"x\", \"8\", \"\", \"-2\", \"3.5\"])\nassert _r == {\"ok\": [15, 8, -2], \"bad\": [\"x\", \"\", \"3.5\"]}, \"Result:\" + str(_r)\nassert split_values([]) == {\"ok\": [], \"bad\": []}, \"For an empty list, two empty lists\""
     }
    }
   ]
  },
  "py-13": {
   "pr": [
    {
     "title": "Number of goods sold",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>total_qty(rows)</code> must return the sum of <code>qty</code> over all rows (int).</p>",
     "hints": [
      "<code>int(r[\"qty\"])</code>"
     ],
     "check": {
      "tests": "assert total_qty(rows) == 15, \"total_qty(rows) must return 15, yours:\" + str(total_qty(rows))\nassert total_qty([]) == 0, \"For an empty list, 0\""
     }
    },
    {
     "title": "List of cities",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>cities(rows)</code> must return the list of unique city names in alphabetical order.</p>",
     "hints": [
      "Add a city only if it is not there yet: <code>if r[\"city\"] not in out:</code>",
      "At the end, <code>sorted(out)</code>."
     ],
     "check": {
      "tests": "_c = cities(rows)\nassert _c == sorted([\"Алматы\", \"Астана\", \"Қарағанды\"]), \"Result:\" + str(_c)\nassert cities([]) == [], \"For an empty list, an empty list\""
     }
    },
    {
     "title": "Sales for one day",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>rows_on(rows, day)</code> must return the list of rows for that day (<code>date</code>).</p>",
     "hints": [
      "<code>[r for r in rows if r[\"date\"] == day]</code>"
     ],
     "check": {
      "tests": "assert len(rows_on(rows, \"2024-10-03\")) == 2, \"for 2024-10-03 there must be 2 rows\"\nassert [r[\"city\"] for r in rows_on(rows, \"2024-10-02\")] == [\"Алматы\", \"Астана\"], \"the rows for 2024-10-02 are wrong\"\nassert rows_on(rows, \"2024-11-01\") == [], \"For a day without sales, an empty list\""
     }
    },
    {
     "title": "Revenue by category",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>revenue_by_category(rows)</code> must return a dictionary: category (<code>category</code>) → revenue (<code>qty × price</code>).</p>",
     "hints": [
      "<code>out[key] = out.get(key, 0) + ...</code>"
     ],
     "check": {
      "tests": "_r = revenue_by_category(rows)\nassert _r == {\"Аяқ киім\": 94000, \"Киім\": 95000, \"Құрал\": 113000}, \"Result:\" + str(_r)"
     }
    },
    {
     "title": "Average check",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>avg_check(rows)</code> returns the average revenue of one row (the sum of <code>qty × price</code> divided by the number of rows), rounded to a whole number. If the list is empty, return 0.</p>",
     "hints": [
      "First check for an empty list.",
      "<code>round(total / len(rows))</code>"
     ],
     "check": {
      "tests": "assert avg_check(rows) == 37750, \"avg_check(rows) must return 37750, yours:\" + str(avg_check(rows))\nassert avg_check([]) == 0, \"For an empty list, 0\""
     }
    },
    {
     "title": "Daily revenue",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>revenue_by_day(rows)</code> returns a dictionary: day → revenue. Then the function <code>best_day(rows)</code> returns the day with the highest revenue (<code>max(d, key=d.get)</code>).</p>",
     "hints": [
      "Inside <code>best_day</code>, reuse the function <code>revenue_by_day(rows)</code>."
     ],
     "check": {
      "tests": "_d = revenue_by_day(rows)\nassert _d == {\"2024-10-01\": 100000, \"2024-10-02\": 75000, \"2024-10-03\": 60000, \"2024-10-04\": 15000, \"2024-10-05\": 52000}, \"revenue_by_day:\" + str(_d)\nassert best_day(rows) == \"2024-10-01\", \"best_day must return 2024-10-01\""
     }
    },
    {
     "title": "Best category in a city",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>best_category(rows, city)</code> returns the category that brought the highest revenue using only the rows of that city. If the city is not found, return <code>None</code>.</p>",
     "hints": [
      "First filter by city and collect a dictionary of revenue by category.",
      "If the dictionary is empty, <code>max</code> raises an error: check it in advance."
     ],
     "check": {
      "tests": "assert best_category(rows, \"Алматы\") == \"Аяқ киім\", \"In Алматы it must be Аяқ киім\"\nassert best_category(rows, \"Астана\") == \"Құрал\", \"In Астана it must be Құрал\"\nassert best_category(rows, \"Қарағанды\") == \"Киім\", \"In Қарағанды it must be Киім\"\nassert best_category(rows, \"Тараз\") is None, \"For a missing city, None\""
     }
    },
    {
     "title": "Cities' share of revenue",
     "prompt": "<p>The sales of a sports shop are given in CSV format (<code>rows</code> is ready, the values are text).</p><p>The function <code>city_share(rows)</code> returns a dictionary: city → its share of the total revenue (in percent, rounded to 1 decimal place).</p>",
     "hints": [
      "Collect the revenue by city and the total revenue in one loop.",
      "At the end, <code>{c: round(v / total * 100, 1) for c, v in rev.items()}</code>."
     ],
     "check": {
      "tests": "_s = city_share(rows)\nassert _s == {\"Алматы\": 41.1, \"Қарағанды\": 17.2, \"Астана\": 41.7}, \"Result:\" + str(_s)"
     }
    }
   ]
  }
 }
});
