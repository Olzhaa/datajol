// java practice tasks: English text. Code, solutions and checks are in content/practice/java.js.
DJ.i18n.patch({ lessons: {
 "jv-1": {
  "pr": [
   {
    "title": "Route ticket",
    "prompt": "<p>The input has two words: the departure city and the destination city (for example, <code>Almaty Astana</code>). Print one line:</p><pre><code>Almaty -&gt; Astana</code></pre>",
    "hints": [
     "Read the second word too with <code>sc.next()</code>.",
     "Join the strings with <code>+</code>: <code>from + \" -&gt; \" + to</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String from = sc.next();\n        // read the second city and print the result\n    }\n}\n"
   },
   {
    "title": "Three words in reverse",
    "prompt": "<p>The input has three words. Print them in reverse order, separated by one space, on one line: <code>alma almurt orik</code> → <code>orik almurt alma</code>.</p>",
    "hints": [
     "Read the three words into three variables.",
     "When printing, change the order: <code>c + \" \" + b + \" \" + a</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        // read the other two words\n    }\n}\n"
   },
   {
    "title": "Sum of two numbers",
    "prompt": "<p>The input has two integers <code>a</code> and <code>b</code>. Print their sum in this form: <code>3 + 5 = 8</code>.</p>",
    "hints": [
     "<code>a + \" + \" + b + \" = \" + a + b</code> does not add the numbers; it joins them as text.",
     "Put the sum in brackets: <code>(a + b)</code>."
    ]
   },
   {
    "title": "Student card",
    "prompt": "<p>The input has a student's name, city and age (an integer): <code>Aruzhan Karaganda 15</code>. Print four lines (birth year = 2026 − age):</p><pre><code>Name: Aruzhan\nCity: Karaganda\nAge: 15\nBorn: 2011</code></pre>",
    "hints": [
     "Read the age with <code>sc.nextInt()</code>.",
     "Put the difference in brackets: <code>\"Born: \" + (2026 - age)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // read city and age, print four lines\n        System.out.println(\"Name: \" + name);\n    }\n}\n"
   },
   {
    "title": "Purchase total",
    "prompt": "<p>The input has an item name, the price of one piece (tenge) and the quantity: <code>Nan 250 4</code>. Print in this form:</p><pre><code>Nan x4 = 1000</code></pre>",
    "hints": [
     "Read the name with <code>next()</code>, the price and quantity with <code>nextInt()</code>.",
     "Put the product in brackets: <code>(price * qty)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String item = sc.next();\n        // read the price and the quantity\n    }\n}\n"
   },
   {
    "title": "Game result",
    "prompt": "<p>The input has the names and goals of two teams: <code>Kairat 2 Astana 1</code>. Print two lines: the score on the first, the total number of goals on the second.</p><pre><code>Kairat 2:1 Astana\nGoals: 3</code></pre>",
    "hints": [
     "The input order is word, number, word, number. Read it in the same order.",
     "On the second line, put the sum in brackets."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String t1 = sc.next();\n        int g1 = sc.nextInt();\n        // read the second team\n    }\n}\n"
   },
   {
    "title": "Purchase receipt",
    "prompt": "<p>The input has a buyer's name, then the prices of three items (tenge): <code>Daniyar 1200 800 3500</code>. Print four lines; delivery is always 1500 tenge:</p><pre><code>Customer: Daniyar\nItems: 3\nTotal: 5500\nWith delivery: 7000</code></pre>",
    "hints": [
     "Store the sum in a separate variable: <code>int total = a + b + c;</code>.",
     "On the last line, keep <code>(total + 1500)</code> in brackets."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // read three prices and calculate the sum\n    }\n}\n"
   },
   {
    "title": "Weather report",
    "prompt": "<p>The input has a city name, then the morning and evening temperatures (integers, may be negative): <code>Astana -12 -5</code>. Print four lines; <code>Change</code> = evening − morning:</p><pre><code>City: Astana\nMorning: -12\nEvening: -5\nChange: 7</code></pre>",
    "hints": [
     "<code>nextInt()</code> reads negative numbers correctly too.",
     "Put the difference in brackets: <code>(evening - morning)</code>, otherwise the minus sign sticks to the previous line."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String city = sc.next();\n        // read two temperatures\n    }\n}\n"
   }
  ]
 },
 "jv-2": {
  "pr": [
   {
    "title": "Converting minutes to hours",
    "prompt": "<p>The input is a number of minutes <code>n</code> (0 ≤ n ≤ 10⁶). Split it into hours and minutes and print it as <code>2 h 15 min</code>. Example: <code>135</code> → <code>2 h 15 min</code>.</p>",
    "hints": [
     "Integer division <code>n / 60</code> gives the full hours.",
     "The remainder <code>n % 60</code> is the leftover minutes."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // hours: n / 60, minutes: n % 60\n    }\n}\n"
   },
   {
    "title": "From Celsius to Fahrenheit",
    "prompt": "<p>The input is an integer temperature <code>c</code> (in Celsius). Convert it to Fahrenheit: <code>F = c · 9 / 5 + 32</code>, and print the result with 1 digit after the decimal point. Example: <code>-7</code> → <code>19.4</code>. Watch out for integer division.</p>",
    "hints": [
     "<code>c * 9 / 5</code> does integer division: for -7 it gives -12, but the correct value is -12.6.",
     "Write <code>9.0</code>, or convert the type with <code>(double) c</code>."
    ]
   },
   {
    "title": "Number of buses",
    "prompt": "<p>The input has two integers: the number of students <code>n</code> and the number of seats in one bus <code>k</code> (1 ≤ k). What is the smallest number of buses needed to carry everyone? Example: <code>95 40</code> → <code>3</code>. Hint: <code>(n + k - 1) / k</code> rounds up.</p>",
    "hints": [
     "<code>n / k</code> rounds down: 95 / 40 = 2, but 15 students would be left behind.",
     "<code>(n + k - 1) / k</code> with integer division rounds up."
    ]
   },
   {
    "title": "Price with VAT",
    "prompt": "<p>The input is the price of an item without VAT (an integer in tenge). VAT is 12% (<code>final double VAT = 0.12;</code>). Print two lines, each with 2 digits after the decimal point:</p><pre><code>VAT: 1200.00\nTotal: 11200.00</code></pre><p>(for input <code>10000</code>).</p>",
    "hints": [
     "VAT = <code>price * VAT</code>, which is a double.",
     "<code>String.format(\"%.2f\", x)</code> gives 2 digits after the decimal point."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        final double VAT = 0.12;\n        int price = sc.nextInt();\n        // print the VAT and the total\n    }\n}\n"
   },
   {
    "title": "Large numbers",
    "prompt": "<p>The input has two integers <code>a</code> and <code>b</code> (each from 0 to 2,000,000,000). Print their sum on the first line and their product on the second. Such values do not fit into <code>int</code>, so use <code>long</code>. Example: <code>2000000000 3</code> →</p><pre><code>2000000003\n6000000000</code></pre>",
    "hints": [
     "The <code>int</code> limit is 2,147,483,647; above it the number becomes negative.",
     "Declare the variables as <code>long a = sc.nextInt();</code>, so the calculations are done in long."
    ]
   },
   {
    "title": "Seconds to time",
    "prompt": "<p>The input is a number of seconds <code>s</code> (0 ≤ s &lt; 86400). Print the time as <code>HH:MM:SS</code>, with each part two digits. Example: <code>3725</code> → <code>01:02:05</code>. Hint: <code>String.format(\"%02d\", x)</code> adds a leading 0.</p>",
    "hints": [
     "Hours: <code>s / 3600</code>, minutes: <code>s % 3600 / 60</code>, seconds: <code>s % 60</code>.",
     "Three values in one format string: <code>String.format(\"%02d:%02d:%02d\", h, m, sec)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        // calculate hours, minutes and seconds\n    }\n}\n"
   },
   {
    "title": "Monthly loan payment",
    "prompt": "<p>The input has three integers: the loan amount <code>P</code> (tenge), the yearly interest rate <code>r</code> and the number of months <code>n</code>. The total debt with simple interest is <code>P + P · r / 100 · n / 12</code>. Print the monthly payment (total debt / n) and the total debt, each with 2 digits after the decimal point. Example: <code>1200000 10 12</code> →</p><pre><code>Monthly: 110000.00\nTotal: 1320000.00</code></pre><p>Do not let integer division spoil the result: calculate with double.</p>",
    "hints": [
     "<code>(double) p * r / 100 * n / 12</code>: if the first operand is a double, the rest is also calculated in double.",
     "Monthly payment: <code>total / n</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int p = sc.nextInt();\n        int r = sc.nextInt();\n        int n = sc.nextInt();\n        // calculate with double\n    }\n}\n"
   },
   {
    "title": "Cash withdrawal in banknotes",
    "prompt": "<p>The input is an amount (an integer in tenge, 0 ≤ amount ≤ 10⁹). An ATM pays it out using the fewest banknotes: 10000, 5000, 1000, 500, 200. Print the number of banknotes of each denomination, then the remainder that cannot be paid out. Example: <code>27850</code> →</p><pre><code>10000: 2\n5000: 1\n1000: 2\n500: 1\n200: 1\nRest: 150</code></pre>",
    "hints": [
     "After each denomination, update the amount with the remainder: <code>s = s % 10000;</code>.",
     "Division <code>/</code> gives the number of banknotes, remainder <code>%</code> is the amount left for the next denomination."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        System.out.println(\"10000: \" + s / 10000);\n        // the remaining denominations\n    }\n}\n"
   }
  ]
 },
 "jv-3": {
  "pr": [
   {
    "title": "Capitalize a city name",
    "prompt": "<p>The input is one word (Latin letters, any case). Print it with the first letter capitalized and the rest in lowercase: <code>aLMATY</code> → <code>Almaty</code>.</p>",
    "hints": [
     "<code>w.substring(0, 1)</code> is the first letter, <code>w.substring(1)</code> is the rest.",
     "Apply <code>toUpperCase()</code> to the first part and <code>toLowerCase()</code> to the rest."
    ]
   },
   {
    "title": "Email parts",
    "prompt": "<p>The input is one email address (containing exactly one <code>@</code> sign). Print two lines: the user name before <code>@</code> and the domain after <code>@</code>. Example: <code>aruzhan@mail.kz</code> →</p><pre><code>User: aruzhan\nDomain: mail.kz</code></pre>",
    "hints": [
     "<code>email.indexOf(\"@\")</code> gives the index of the sign.",
     "<code>substring(0, at)</code> and <code>substring(at + 1)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String email = sc.next();\n        // find the position of the @ sign\n    }\n}\n"
   },
   {
    "title": "Compare two words",
    "prompt": "<p>The input has two words. If they are exactly the same, print <code>SAME</code>; if they differ only in case, print <code>SAME_IGNORE_CASE</code>; otherwise print <code>DIFFERENT</code>. Example: <code>Kaspi kaspi</code> → <code>SAME_IGNORE_CASE</code>. Use <code>equals</code>, not <code>==</code>.</p>",
    "hints": [
     "Check <code>a.equals(b)</code> first, then <code>a.equalsIgnoreCase(b)</code>.",
     "The <code>==</code> operator does not compare strings read by Scanner correctly."
    ]
   },
   {
    "title": "Count the vowels",
    "prompt": "<p>The input is one word (Latin letters). Print the number of vowels in it (<code>a e i o u</code>; upper and lower case count the same). Example: <code>Aqtobe</code> → <code>3</code>.</p>",
    "hints": [
     "First convert the word to lowercase with <code>toLowerCase()</code>.",
     "If <code>\"aeiou\".indexOf(c) &gt;= 0</code>, then <code>c</code> is a vowel."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String w = sc.next();\n        int count = 0;\n        // check each character\n        System.out.println(count);\n    }\n}\n"
   },
   {
    "title": "Splitting a list",
    "prompt": "<p>The input is a list of cities separated by commas, given as one word: <code>Almaty,Astana,Shymkent</code>. Split it with <code>split(\",\")</code> and print each city on its own line with its number:</p><pre><code>1. Almaty\n2. Astana\n3. Shymkent</code></pre>",
    "hints": [
     "<code>String[] parts = line.split(\",\");</code> gives an array.",
     "Numbering starts at 1: <code>(i + 1) + \". \" + parts[i]</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.next();\n        // split it with split\n    }\n}\n"
   },
   {
    "title": "Masking a card number",
    "prompt": "<p>The input is a card number (digits only, at least 4 long). Replace every digit except the last 4 with <code>*</code> and print the result. Collect the result in a <code>StringBuilder</code>. Example: <code>4400123456781234</code> → <code>************1234</code>.</p>",
    "hints": [
     "Number of asterisks: <code>card.length() - 4</code>.",
     "The last 4 digits: <code>card.substring(card.length() - 4)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String card = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // asterisks and the last 4 digits\n        System.out.println(sb.toString());\n    }\n}\n"
   },
   {
    "title": "Expanding a compressed string",
    "prompt": "<p>The input is a compressed string: each letter is followed by the number of times it repeats (from 1 to 9, a single digit). Restore the full string: <code>a3b1c2</code> → <code>aaabcc</code>. Collect the result in a <code>StringBuilder</code>.</p>",
    "hints": [
     "Move the index forward by 2: <code>i</code> is the letter, <code>i + 1</code> is the digit.",
     "Turn a digit character into a number: <code>s.charAt(i + 1) - '0'</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // read in pairs: a letter, then a digit\n        System.out.println(sb.toString());\n    }\n}\n"
   },
   {
    "title": "From snake_case to camelCase",
    "prompt": "<p>The input is a variable name in <code>snake_case</code> (lowercase Latin letters and <code>_</code>, no <code>_</code> at the start or end, no two <code>_</code> in a row). Convert it to <code>camelCase</code>: the first word stays as it is, and the first letter of each following word becomes uppercase. Example: <code>total_sales_amount</code> → <code>totalSalesAmount</code>.</p>",
    "hints": [
     "<code>s.split(\"_\")</code> gives the words.",
     "Starting from the second word: <code>p.substring(0, 1).toUpperCase() + p.substring(1)</code>."
    ]
   }
  ]
 },
 "jv-4": {
  "pr": [
   {
    "title": "Even or odd",
    "prompt": "<p>The input is an integer (it may be negative). If it is even, print <code>EVEN</code>; if odd, print <code>ODD</code>. Example: <code>-7</code> → <code>ODD</code>. Remember: in Java, <code>-7 % 2</code> gives <code>-1</code>.</p>",
    "hints": [
     "<code>n % 2 == 1</code> does not work for negative odd numbers.",
     "Check <code>n % 2 == 0</code> with a ternary: <code>n % 2 == 0 ? \"EVEN\" : \"ODD\"</code>."
    ]
   },
   {
    "title": "Name of the weekday",
    "prompt": "<p>The input is a number from 1 to 7 (1 is Monday). Using <code>switch</code>, print its English name: <code>Monday</code>, <code>Tuesday</code>, <code>Wednesday</code>, <code>Thursday</code>, <code>Friday</code>, <code>Saturday</code>, <code>Sunday</code>. For any other number, print <code>Invalid</code>. Example: <code>5</code> → <code>Friday</code>.</p>",
    "hints": [
     "An arrow-style switch returns a value: <code>String name = switch (d) { case 1 -&gt; \"Monday\"; ... };</code>",
     "<code>default -&gt; \"Invalid\"</code> catches the remaining numbers."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int d = sc.nextInt();\n        // write a switch\n    }\n}\n"
   },
   {
    "title": "Bus fare",
    "prompt": "<p>The input is the passenger's age. Print the fare (tenge): under 7 — <code>0</code>, from 7 to 17 — <code>40</code>, from 18 to 62 — <code>120</code>, 63 and over — <code>0</code>. Example: <code>16</code> → <code>40</code>.</p>",
    "hints": [
     "Combine the two free cases with <code>||</code>.",
     "Split the rest with <code>else if (age &lt;= 17)</code> and <code>else</code>."
    ]
   },
   {
    "title": "Type of triangle",
    "prompt": "<p>The input is three positive integers, the sides. If a triangle cannot be built (the sum of any two sides must be greater than the third), print <code>NOT A TRIANGLE</code>; if all three are equal, print <code>EQUILATERAL</code>; if exactly two are equal, print <code>ISOSCELES</code>; otherwise print <code>SCALENE</code>. Example: <code>5 5 8</code> → <code>ISOSCELES</code>.</p>",
    "hints": [
     "First check whether the triangle exists: <code>a + b &lt;= c || ...</code>, three conditions.",
     "Then check \"all three equal\", and only after that \"two equal\"."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        // check the conditions in order\n    }\n}\n"
   },
   {
    "title": "Simple calculator",
    "prompt": "<p>The input is <code>a op b</code>: two integers and an operator between them (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>). Using <code>switch</code>, print the result; <code>/</code> is integer division. If dividing by zero, print <code>ERROR</code>; if the operator is unknown, print <code>UNKNOWN</code>. Example: <code>17 / 5</code> → <code>3</code>.</p>",
    "hints": [
     "A switch works with strings: <code>case \"+\" -&gt; ...</code>.",
     "For division, check <code>b == 0</code> first; if one case has several lines, use <code>{ }</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        String op = sc.next();\n        int b = sc.nextInt();\n        // write switch (op)\n    }\n}\n"
   },
   {
    "title": "Weather advice",
    "prompt": "<p>The input is a temperature (an integer) and a weather word: <code>rain</code>, <code>snow</code> or <code>clear</code>. Rules in order: if the temperature is below −20, print <code>Stay home</code>; otherwise, if it is raining, print <code>Umbrella</code>; otherwise, if it is snowing or the temperature is below 5, print <code>Coat</code>; in all other cases print <code>T-shirt</code>. Example: <code>3 clear</code> → <code>Coat</code>.</p>",
    "hints": [
     "Compare the words with <code>equals</code>.",
     "The third condition: <code>w.equals(\"snow\") || t &lt; 5</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n        String w = sc.next();\n        // write the conditions in order\n    }\n}\n"
   },
   {
    "title": "Days in a month",
    "prompt": "<p>The input is a month number (1–12) and a year. Print how many days that month has. February has 29 days in a leap year, otherwise 28 (a leap year is divisible by 4 and not by 100, or divisible by 400). Months 4, 6, 9 and 11 have 30 days; the rest have 31. If the month number is wrong, print <code>Invalid</code>. Example: <code>2 2024</code> → <code>29</code>.</p>",
    "hints": [
     "Store the leap-year check in a boolean: <code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>.",
     "In an arrow switch, several values can share one case: <code>case 4, 6, 9, 11 -&gt;</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int m = sc.nextInt();\n        int y = sc.nextInt();\n        // write switch (m)\n    }\n}\n"
   },
   {
    "title": "Progressive tax",
    "prompt": "<p>The input is a monthly income (an integer in tenge, 0 ≤ income ≤ 10⁹). The tax is progressive: the part up to 100,000 is taxed at 0%, the part from 100,000 to 500,000 at 10%, and the part above 500,000 at 20%. Print the tax as a whole number of tenge (integer division in each part). Example: <code>700000</code> → <code>80000</code> (40,000 + 40,000).</p>",
    "hints": [
     "Three ranges, three branches: <code>if / else if / else</code>.",
     "Above 500,000, the full tax on the second part is 40,000, and <code>(income - 500000) * 20 / 100</code> is added to it."
    ]
   }
  ]
 },
 "jv-5": {
  "pr": [
   {
    "title": "Multiplication table",
    "prompt": "<p>The input is a number <code>n</code>. Using a <code>for</code> loop, print its multiplication table from 1 to 10, each line as <code>n x i = result</code>. Example (for <code>7</code>): the first line is <code>7 x 1 = 7</code>, the last is <code>7 x 10 = 70</code>.</p>",
    "hints": [
     "<code>for (int i = 1; i &lt;= 10; i++)</code>.",
     "Put the product into the line as <code>n * i</code>. Multiplication is done before addition."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // for loop\n    }\n}\n"
   },
   {
    "title": "Sum of even numbers",
    "prompt": "<p>The input is <code>n</code> (1 ≤ n ≤ 10⁵). Print the sum of all even numbers from 1 to n. Example: <code>10</code> → <code>30</code> (2 + 4 + 6 + 8 + 10).</p>",
    "hints": [
     "Start at 2 and add 2 each time: <code>i += 2</code>.",
     "If n = 10⁵, the sum is 2.5·10⁹, which does not fit into an int. Use <code>long</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long sum = 0;\n        // loop\n        System.out.println(sum);\n    }\n}\n"
   },
   {
    "title": "Number of digits",
    "prompt": "<p>The input is a non-negative integer <code>n</code> (≤ 10⁹). Print how many digits it has. Example: <code>2024</code> → <code>4</code>, <code>0</code> → <code>1</code>. Hint: <code>do-while</code>.</p>",
    "hints": [
     "On each step, <code>n /= 10</code> removes the last digit.",
     "<code>do { ... } while (n &gt; 0);</code> runs at least once, so 0 gives 1."
    ]
   },
   {
    "title": "Reverse a number",
    "prompt": "<p>The input is a non-negative integer <code>n</code> (≤ 10⁹). Print the number with its digits in reverse order (leading zeros disappear). Example: <code>1200</code> → <code>21</code>, <code>4512</code> → <code>2154</code>.</p>",
    "hints": [
     "The last digit is <code>n % 10</code>; add it to the result: <code>rev = rev * 10 + n % 10</code>.",
     "A number like 1 000 000 009 goes beyond the limit of int when reversed. Use <code>long</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long rev = 0;\n        // while loop\n        System.out.println(rev);\n    }\n}\n"
   },
   {
    "title": "Smallest divisor",
    "prompt": "<p>The input is <code>n</code> (2 ≤ n ≤ 10⁹). Print the smallest divisor of n that is greater than 1. As soon as you find a divisor, stop the loop with <code>break</code>; if <code>i * i &gt; n</code>, the answer is n itself. Example: <code>91</code> → <code>7</code>, <code>13</code> → <code>13</code>.</p>",
    "hints": [
     "Check divisors starting from 2 while <code>i * i &lt;= n</code>. This is fast even for prime numbers.",
     "If nothing is found, the answer is n itself."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int ans = n;\n        // loop and break\n        System.out.println(ans);\n    }\n}\n"
   },
   {
    "title": "Fibonacci sequence",
    "prompt": "<p>The input is <code>n</code> (1 ≤ n ≤ 90). Print the first <code>n</code> terms of the Fibonacci sequence on one line, separated by spaces. The sequence starts with <code>0 1</code>. Example: <code>7</code> → <code>0 1 1 2 3 5 8</code>. The numbers get large, so use <code>long</code>.</p>",
    "hints": [
     "Keep two variables: <code>a</code> is the current term and <code>b</code> is the next one.",
     "On each step: <code>next = a + b; a = b; b = next;</code>. Print the space only between terms."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long a = 0, b = 1;\n        // loop\n    }\n}\n"
   },
   {
    "title": "Perfect numbers",
    "prompt": "<p>A perfect number is a number equal to the sum of its divisors, excluding itself (6 = 1 + 2 + 3). The input is <code>n</code> (1 ≤ n ≤ 10000). Print all perfect numbers from 1 to n on one line, separated by spaces. If there are none, print <code>NONE</code>. Example: <code>500</code> → <code>6 28 496</code>.</p>",
    "hints": [
     "The outer loop goes over x, the inner loop over the divisors of x.",
     "For speed, go up to <code>d * d &lt;= x</code> and add both <code>d</code> and <code>x / d</code> (if they are equal, add only one). The number 1 is not perfect."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // for each x, calculate the sum of its divisors\n    }\n}\n"
   },
   {
    "title": "Longest warming streak",
    "prompt": "<p>The input is <code>n</code> (1 ≤ n ≤ 1000), then the temperatures for <code>n</code> days. Print the length of the longest run of consecutive days in which the temperature is <b>strictly</b> higher than on the day before (a single day is a run of length 1). Do not use an array; read inside the loop. Example: <code>8</code> / <code>-3 -1 2 2 4 6 7 1</code> → <code>4</code> (2 4 6 7).</p>",
    "hints": [
     "Keep the previous temperature in a variable <code>prev</code>.",
     "If it went up, increase the current run <code>cur++</code>; otherwise set <code>cur = 1</code>. Update the maximum on each step."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int best = 0;\n        // keep the previous value and compare it inside the loop\n        System.out.println(best);\n    }\n}\n"
   }
  ]
 },
 "jv-6": {
  "pr": [
   {
    "title": "Area: overloading",
    "prompt": "<p>Write two methods with the same name: <code>static int area(int side)</code> (square) and <code>static int area(int w, int h)</code> (rectangle). The input is <code>S a</code> or <code>R w h</code>. Call the matching method and print the area. Example: <code>R 3 5</code> → <code>15</code>, <code>S 4</code> → <code>16</code>.</p>",
    "hints": [
     "The compiler picks which <code>area</code> to call by the number of arguments.",
     "Determine the shape with <code>kind.equals(\"S\")</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int area(int side) {\n        return 0;\n    }\n\n    static int area(int w, int h) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String kind = sc.next();\n        // if S, area(a); if R, area(w, h)\n    }\n}\n"
   },
   {
    "title": "Largest of three",
    "prompt": "<p>Write a method <code>static int max3(int a, int b, int c)</code> that returns the largest of three numbers. The input is three integers (they may be negative); print the result of <code>max3</code>. Example: <code>-5 12 7</code> → <code>12</code>.</p>",
    "hints": [
     "Start with <code>m = a</code>, then compare with <code>b</code> and <code>c</code>.",
     "Or use <code>Math.max(a, Math.max(b, c))</code>."
    ]
   },
   {
    "title": "Digit sum method",
    "prompt": "<p>Write a method <code>static int digitSum(int n)</code> (n ≥ 0). The input is <code>k</code>, then <code>k</code> numbers. Print the sum of the digits of each number on its own line. Example: <code>2</code> / <code>123 9050</code> →</p><pre><code>6\n14</code></pre>",
    "hints": [
     "Inside the method, use a loop with <code>n % 10</code> and <code>n /= 10</code>.",
     "The parameter is passed as a copy, so changing it inside the method is safe."
    ]
   },
   {
    "title": "Number of leap years",
    "prompt": "<p>Write a method <code>static boolean isLeap(int y)</code>. The input is two years <code>a b</code> (a ≤ b). Print how many leap years are in this range (both ends included). Example: <code>1896 1912</code> → <code>4</code> (1896, 1904, 1908, 1912; 1900 is not a leap year).</p>",
    "hints": [
     "A boolean method can return the condition itself: <code>return (y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0;</code>",
     "In <code>main</code>, loop from <code>a</code> to <code>b</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isLeap(int y) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        // call isLeap in the loop\n        System.out.println(count);\n    }\n}\n"
   },
   {
    "title": "Raising to a power",
    "prompt": "<p>Write a method <code>static long power(long base, int exp)</code> using a loop (exp ≥ 0, <code>power(x, 0) = 1</code>). The input is <code>base exp</code>; the result fits into a long. Example: <code>2 10</code> → <code>1024</code>, <code>-3 3</code> → <code>-27</code>.</p>",
    "hints": [
     "Start the result at 1 and multiply it by <code>base</code> exactly <code>exp</code> times.",
     "If <code>exp = 0</code>, the loop never runs, and 1 is returned."
    ]
   },
   {
    "title": "Palindrome numbers",
    "prompt": "<p>Write a method <code>static int reverse(int n)</code> that returns the number with its digits in reverse order. Using it, print how many palindrome numbers are in the range from <code>a</code> to <code>b</code> (1 ≤ a ≤ b ≤ 10⁶). A palindrome: <code>reverse(n) == n</code>, for example 121. Example: <code>100 200</code> → <code>10</code>.</p>",
    "hints": [
     "<code>reverse</code>: <code>r = r * 10 + n % 10; n /= 10;</code>.",
     "Single-digit numbers are palindromes too: from 1 to 9 there are 9 of them."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int reverse(int n) {\n        return n;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        // loop\n        System.out.println(count);\n    }\n}\n"
   },
   {
    "title": "Twin primes",
    "prompt": "<p>Twin primes are a pair of primes whose difference is 2: (3, 5), (5, 7), (11, 13). Write a method <code>static boolean isPrime(int n)</code>. For the input <code>n</code> (1 ≤ n ≤ 10⁵), print each twin pair whose both numbers do not exceed n, as <code>p q</code>, one per line. On the last line print <code>Total: k</code>. Example: <code>15</code> →</p><pre><code>3 5\n5 7\n11 13\nTotal: 3</code></pre>",
    "hints": [
     "<code>isPrime</code>: for n &lt; 2 the number is not prime; check divisors up to <code>i * i &lt;= n</code>.",
     "There may be many pairs: collect the output in a <code>StringBuilder</code> and print it once."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isPrime(int n) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // are both p and p + 2 prime?\n    }\n}\n"
   },
   {
    "title": "Reading a number in words",
    "prompt": "<p>The method <code>static String digitName(int d)</code> uses <code>switch</code> to return the English name of a digit (<code>zero</code>, <code>one</code>, …, <code>nine</code>). The input is a non-negative integer (≤ 10⁹). Print the name of each of its digits from left to right, separated by spaces. Example: <code>1203</code> → <code>one two zero three</code>.</p>",
    "hints": [
     "Turn the number into a string (<code>\"\" + n</code>) and read the digits from left to right with <code>charAt(i)</code>.",
     "From a character to a digit: <code>s.charAt(i) - '0'</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static String digitName(int d) {\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // call digitName for each digit\n    }\n}\n"
   }
  ]
 },
 "jv-7": {
  "pr": [
   {
    "title": "Above average",
    "prompt": "<p>The input is <code>n</code> (n ≥ 1), then <code>n</code> integers. Print the number of elements that are <b>strictly</b> greater than the average value. Example: <code>5</code> / <code>10 20 30 40 50</code> → <code>2</code> (the average is 30).</p>",
    "hints": [
     "You need two passes: first the sum and the average, then the comparison.",
     "Calculate the average as a double: <code>(double) sum / n</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // calculate the average and count\n    }\n}\n"
   },
   {
    "title": "Print in reverse",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> integers. Read them into an array and print them in reverse order on one line, separated by spaces. Example: <code>4</code> / <code>3 9 -1 5</code> → <code>5 -1 9 3</code>.</p>",
    "hints": [
     "The loop starts from the end: <code>for (int i = n - 1; i &gt;= 0; i--)</code>.",
     "Do not put a space after the last element."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // print in reverse order\n    }\n}\n"
   },
   {
    "title": "Sorted prices",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> prices (tenge). Sort them in ascending order with <code>Arrays.sort</code> and print them in the <code>Arrays.toString</code> format. Example: <code>3</code> / <code>1200 800 4500</code> → <code>[800, 1200, 4500]</code>.</p>",
    "hints": [
     "<code>Arrays.sort(a);</code> sorts the array in place.",
     "<code>Arrays.toString(a)</code> adds the brackets and commas itself."
    ]
   },
   {
    "title": "Row and column sums",
    "prompt": "<p>The input is <code>r c</code>, then an <code>r × c</code> matrix (for example, the weekly sales of stores). On the first line print the sum of each row of the matrix, and on the second line the sum of each column, separated by spaces. Example:</p><pre><code>2 3\n1 2 3\n4 5 6</code></pre><p>→</p><pre><code>6 15\n5 7 9</code></pre>",
    "hints": [
     "Row sum: the outer loop goes over <code>i</code>, the inner over <code>j</code>.",
     "For column sums, swap the loops: the outer over <code>j</code>, the inner over <code>i</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        // read the matrix and calculate the sums\n    }\n}\n"
   },
   {
    "title": "Second largest value",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> integers. Print the second largest <b>distinct</b> value, that is, the one that comes right after the largest. If there is none (all numbers are equal), print <code>NONE</code>. Example: <code>5</code> / <code>4 9 9 2 7</code> → <code>7</code>.</p>",
    "hints": [
     "First find the maximum, then the largest element that is not equal to the maximum.",
     "Numbers may be negative: do not start with 0, keep a flag that says whether you found one."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // first find the maximum\n    }\n}\n"
   },
   {
    "title": "Rotate an array",
    "prompt": "<p>The input is <code>n k</code> (k ≥ 0, it may be greater than n), then <code>n</code> numbers. Cyclically shift the array to the right by <code>k</code> positions and print it on one line, separated by spaces. Example: <code>5 2</code> / <code>1 2 3 4 5</code> → <code>4 5 1 2 3</code>.</p>",
    "hints": [
     "In the new array, element <code>a[i]</code> goes to position <code>(i + k) % n</code>.",
     "The <code>%</code> operation works correctly even when k &gt; n."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // create a new array\n    }\n}\n"
   },
   {
    "title": "Warmest period",
    "prompt": "<p>The input is <code>n k</code> (1 ≤ k ≤ n ≤ 10⁵), then the temperatures for <code>n</code> days. Find the period of <code>k</code> consecutive days whose sum of temperatures is the largest. Print the start day of the period (counting from 1) and the sum. If there are several, take the earliest. Example: <code>7 3</code> / <code>1 5 -2 8 6 -1 3</code> →  <code>4 13</code> (8 + 6 − 1). Write an O(n) solution using a sliding window.</p>",
    "hints": [
     "First calculate the sum of the first <code>k</code> elements. Then, when the window slides, add <code>a[i]</code> and subtract <code>a[i - k]</code>.",
     "Because the earliest one is needed, update the answer only when <code>cur &gt; best</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // start from the sum of the first k days\n    }\n}\n"
   },
   {
    "title": "Spiral matrix traversal",
    "prompt": "<p>The input is <code>r c</code>, then an <code>r × c</code> matrix. Walk through its elements in a clockwise spiral, starting from the top-left corner, and print them on one line, separated by spaces. Example:</p><pre><code>3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12</code></pre><p>→ <code>1 2 3 4 8 12 11 10 9 5 6 7</code>. Check the boundaries carefully.</p>",
    "hints": [
     "Keep four boundaries: <code>top, bottom, left, right</code>. After walking along a side, move the matching boundary.",
     "Before walking the bottom row and the left column, check <code>top &lt;= bottom</code> and <code>left &lt;= right</code>. Otherwise, a matrix with one row will repeat its elements."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        // read the matrix and walk it in a spiral\n    }\n}\n"
   }
  ]
 },
 "jv-8": {
  "pr": [
   {
    "title": "Rectangle class",
    "prompt": "<p>Write a <code>Rectangle</code> class: fields <code>private int w, h</code>, a constructor, and the methods <code>area()</code> and <code>perimeter()</code>. The input is <code>w h</code>. Print it in this form (for <code>3 5</code>):</p><pre><code>Area: 15\nPerimeter: 16</code></pre>",
    "hints": [
     "In the constructor, <code>this.w = w;</code>. When the field and the parameter have the same name, you need <code>this</code>.",
     "Perimeter: <code>2 * (w + h)</code>."
    ],
    "starter": "import java.util.Scanner;\n\nclass Rectangle {\n    private int w, h;\n\n    Rectangle(int w, int h) {\n        // fill in the fields\n    }\n\n    int area() { return 0; }\n\n    int perimeter() { return 0; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Rectangle r = new Rectangle(sc.nextInt(), sc.nextInt());\n        System.out.println(\"Area: \" + r.area());\n        System.out.println(\"Perimeter: \" + r.perimeter());\n    }\n}\n"
   },
   {
    "title": "Ticket numbers",
    "prompt": "<p>Give the <code>Ticket</code> class a field <code>static int counter</code>: each new ticket takes the next number in the constructor (1, 2, 3, …). The <code>toString()</code> method returns <code>Ticket #1: Aruzhan</code>. The input is <code>n</code>, then <code>n</code> passenger names. Print each ticket, and at the end print <code>Sold: n</code>. Example: <code>2</code> / <code>Aruzhan Timur</code> →</p><pre><code>Ticket #1: Aruzhan\nTicket #2: Timur\nSold: 2</code></pre>",
    "hints": [
     "A static field is shared by all objects: in the constructor, <code>counter++</code>, then <code>id = counter</code>.",
     "<code>System.out.println(t)</code> calls <code>t.toString()</code> automatically."
    ]
   },
   {
    "title": "Student's average score",
    "prompt": "<p>Write a <code>Student</code> class: a name and three scores (private), a method <code>double average()</code>, and a <code>toString()</code> method that returns <code>Aruzhan: 86.7</code> (with 1 digit after the decimal point). The input is <code>n</code>, then <code>n</code> lines <code>name b1 b2 b3</code>. Print each student on its own line. Example: <code>Aruzhan 90 85 85</code> → <code>Aruzhan: 86.7</code>.</p>",
    "hints": [
     "Average: <code>(a + b + c) / 3.0</code>. Use 3.0, not 3, otherwise integer division happens.",
     "<code>String.format(\"%.1f\", average())</code>."
    ]
   },
   {
    "title": "Elevator",
    "prompt": "<p>The <code>Elevator</code> class has the fields <code>private int floor</code> (starting at 1) and <code>private int maxFloor</code>. The method <code>boolean move(int delta)</code> moves the elevator only if the new floor is between 1 and <code>maxFloor</code>, and returns <code>true</code>. Otherwise it changes nothing and returns <code>false</code>. The input is <code>maxFloor q</code>, then <code>q</code> integers (moves). At the end print two lines: <code>Floor f</code> and <code>Ignored k</code> (the number of moves that were not carried out). Example: <code>9 4</code> / <code>5 -10 3 1</code> → <code>Floor 9</code>, <code>Ignored 2</code>.</p>",
    "hints": [
     "First compute the new floor in a separate variable: <code>int next = floor + delta;</code>.",
     "If it goes out of range, <code>return false;</code>. The field does not change."
    ]
   },
   {
    "title": "Simple fraction class",
    "prompt": "<p>Write a <code>Fraction</code> class: <code>private int num, den</code>. The constructor reduces the fraction by dividing by the GCD. The method <code>Fraction add(Fraction o)</code> returns a new fraction. <code>toString()</code> returns the form <code>5/6</code>. The input is four positive integers <code>a b c d</code> (these are a/b and c/d, with denominators ≤ 10⁴). Print the sum. Example: <code>1 2 1 3</code> → <code>5/6</code>, <code>1 4 3 4</code> → <code>1/1</code>.</p>",
    "hints": [
     "a/b + c/d = (a·d + c·b) / (b·d). An object of the class can see the private fields (<code>o.den</code>) of another object of the same class.",
     "To reduce the fraction, call the GCD method (Euclid's algorithm) in the constructor."
    ]
   },
   {
    "title": "Clock class",
    "prompt": "<p>The <code>Clock</code> class has <code>private int minutes</code> (minutes since the start of the day, 0–1439). The constructor is <code>Clock(int h, int m)</code>. The method <code>void add(int mins)</code> moves the time forward (if it passes midnight, counting starts again from 00:00). <code>toString()</code> returns the time as <code>HH:MM</code>. The input is <code>h m k</code> (0 ≤ k ≤ 10⁶). Print the time k minutes later. Example: <code>23 30 45</code> → <code>00:15</code>.</p>",
    "hints": [
     "A day has 1440 minutes: <code>minutes = (minutes + mins) % 1440;</code>.",
     "Two-digit format: <code>String.format(\"%02d:%02d\", ...)</code>."
    ]
   },
   {
    "title": "Library",
    "prompt": "<p>The <code>Book</code> class has <code>private String title</code> and <code>private boolean taken</code>. The methods <code>boolean take()</code> and <code>boolean giveBack()</code> change the state only when the conditions are right, and return the result. The input is <code>n</code>, then <code>n</code> book titles (one word each), then <code>q</code> and <code>q</code> commands: <code>TAKE title</code> or <code>RETURN title</code>. Store the books in an array. For each command print: <code>OK</code>; if the book is taken, <code>BUSY</code>; if a book that was not taken is returned, <code>NOT TAKEN</code>; if the title is not found, <code>NOT FOUND</code>. Example:</p><pre><code>2\nAbai Kochevniki\n4\nTAKE Abai\nTAKE Abai\nRETURN Kochevniki\nTAKE Dune</code></pre><p>→ <code>OK</code>, <code>BUSY</code>, <code>NOT TAKEN</code>, <code>NOT FOUND</code> (each on its own line).</p>",
    "hints": [
     "To search by title, go through the array and compare <code>x.getTitle().equals(title)</code>. If nothing is found, the result stays <code>null</code>.",
     "<code>take()</code>: if the book is already taken, return <code>false</code>; otherwise set <code>taken = true</code> and return <code>true</code>."
    ],
    "starter": "import java.util.Scanner;\n\nclass Book {\n    private String title;\n    private boolean taken;\n\n    Book(String title) {\n        this.title = title;\n    }\n\n    String getTitle() { return title; }\n\n    boolean take() {\n        return true;\n    }\n\n    boolean giveBack() {\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Book[] books = new Book[n];\n        for (int i = 0; i < n; i++) books[i] = new Book(sc.next());\n        int q = sc.nextInt();\n        // process the commands\n    }\n}\n"
   },
   {
    "title": "Transfer between accounts",
    "prompt": "<p>The <code>Account</code> class has <code>private long balance</code> and <code>static int transfers</code> (the number of successful transfers). The method <code>boolean transferTo(Account to, long amount)</code> moves money and increases <code>transfers</code> only if the amount is positive and the balance is enough. The input is <code>n</code>, then <code>n</code> starting balances, then <code>q</code>, and <code>q</code> lines <code>from to amount</code> (account numbers from 1 to n). A transfer to the same account (<code>from == to</code>) also fails. For each failed transfer print <code>FAIL i</code> (the transfer's sequence number, starting from 1). At the end print all balances on one line and <code>Transfers: k</code>. Example:</p><pre><code>3\n1000 500 0\n3\n1 3 400\n2 1 600\n3 2 400</code></pre><p>→</p><pre><code>FAIL 2\n600 900 0\nTransfers: 2</code></pre>",
    "hints": [
     "Account numbers start at 1, so subtract 1 when you index the array.",
     "A method of a class can change a private field of another object of the same class: <code>to.balance += amount;</code>. Check for the same account with <code>to == this</code>."
    ],
    "starter": "import java.util.Scanner;\n\nclass Account {\n    static int transfers = 0;\n    private long balance;\n\n    Account(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    boolean transferTo(Account to, long amount) {\n        return false;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Account[] acc = new Account[n];\n        for (int i = 0; i < n; i++) acc[i] = new Account(sc.nextLong());\n        int q = sc.nextInt();\n        // process the transfers\n    }\n}\n"
   }
  ]
 },
 "jv-9": {
  "pr": [
   {
    "title": "Animal sounds",
    "prompt": "<p>Write an <code>abstract class Animal</code> (with a name and <code>abstract String sound()</code>) and the classes <code>Dog</code> (<code>Woof</code>), <code>Cat</code> (<code>Meow</code>) and <code>Cow</code> (<code>Moo</code>) that inherit from it. The input is <code>n</code>, then <code>n</code> lines <code>type name</code>. For each one print <code>name: sound</code>. Example: <code>Dog Bars</code> → <code>Bars: Woof</code>.</p>",
    "hints": [
     "The constructor of each subclass calls <code>super(name)</code>.",
     "Even if the variable type is <code>Animal</code>, <code>sound()</code> is called on the object's real class."
    ],
    "starter": "import java.util.Scanner;\n\nabstract class Animal {\n    protected String name;\n\n    Animal(String name) { this.name = name; }\n\n    abstract String sound();\n}\n\n// write the Dog, Cat, Cow classes\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // create an object for each line\n    }\n}\n"
   },
   {
    "title": "Vehicle wheels",
    "prompt": "<p>Write <code>interface Vehicle { int wheels(); }</code> and the classes <code>Car</code> (4), <code>Bike</code> (2) and <code>Truck</code> (6) that implement it. The input is <code>n</code>, then <code>n</code> vehicle types (<code>Car</code>, <code>Bike</code>, <code>Truck</code>). Print the total number of wheels. Example: <code>3</code> / <code>Car Bike Truck</code> → <code>12</code>.</p>",
    "hints": [
     "Interface methods are <code>public</code>: <code>public int wheels() { return 4; }</code>.",
     "Declare the variable with the interface type: <code>Vehicle v = new Car();</code>."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Vehicle {\n    int wheels();\n}\n\n// write the Car, Bike, Truck classes\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int total = 0;\n        // add up the wheels() value of each car\n        System.out.println(total);\n    }\n}\n"
   },
   {
    "title": "Default greeting",
    "prompt": "<p><code>interface Greeter</code>: <code>String name();</code> and <code>default String greet()</code>, which returns <code>Hello, &lt;name&gt;!</code>. The class <code>EnGreeter</code> does not change the default method, while <code>KzGreeter</code> overrides it and returns <code>Salem, &lt;name&gt;!</code>. The input is <code>n</code>, then <code>n</code> lines <code>en name</code> or <code>kz name</code>. For each one print the result of <code>greet()</code>. Example: <code>kz Aruzhan</code> → <code>Salem, Aruzhan!</code>.</p>",
    "hints": [
     "A default method is written inside the interface with a body: <code>default String greet() { ... }</code>.",
     "In <code>KzGreeter</code>, override the method: <code>public String greet()</code>."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Greeter {\n    String name();\n}\n\n// write default greet(), EnGreeter and KzGreeter\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // for each line, create a Greeter and print greet()\n    }\n}\n"
   },
   {
    "title": "Manager bonus",
    "prompt": "<p><code>abstract class Employee</code> (a name, <code>abstract long monthlyPay()</code>), <code>Salaried extends Employee</code> (a fixed salary) and <code>Manager extends Salaried</code> (salary + bonus; use <code>super.monthlyPay()</code> inside <code>monthlyPay()</code>). The input is <code>n</code>, then <code>n</code> lines: <code>S name salary</code> or <code>M name salary bonus</code>. For each one print <code>name: payment</code>, and at the end <code>Total: sum</code>. Example: <code>M Aliya 600000 150000</code> → <code>Aliya: 750000</code>.</p>",
    "hints": [
     "The <code>Manager</code> constructor calls <code>super(name, salary)</code>.",
     "<code>super.monthlyPay()</code> calls the parent class version; add the bonus to it."
    ],
    "starter": "import java.util.Scanner;\n\nabstract class Employee {\n    protected String name;\n    Employee(String name) { this.name = name; }\n    abstract long monthlyPay();\n}\n\n// write the Salaried and Manager classes\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long total = 0;\n        // read the employees\n        System.out.println(\"Total: \" + total);\n    }\n}\n"
   },
   {
    "title": "Discount types",
    "prompt": "<p><code>interface Discount { long apply(long price); }</code> and three classes: <code>NoDiscount</code> (does not change the price), <code>Percent</code> (a p% discount, integer division: <code>price - price * p / 100</code>), <code>Fixed</code> (a fixed amount is subtracted, but the price does not go below 0). The input is a price and <code>n</code>, then <code>n</code> lines: <code>NONE</code>, <code>PCT p</code> or <code>FIX amount</code>. For each discount, apply it to the original price and print the resulting price, each on its own line. Example: <code>20000 3</code> / <code>NONE</code> / <code>PCT 15</code> / <code>FIX 25000</code> → <code>20000</code>, <code>17000</code>, <code>0</code>.</p>",
    "hints": [
     "All three classes use <code>implements Discount</code> and <code>public long apply(long price)</code>.",
     "<code>Fixed</code>: <code>price &gt; amount ? price - amount : 0</code>."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Discount {\n    long apply(long price);\n}\n\n// write the NoDiscount, Percent, Fixed classes\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long price = sc.nextLong();\n        int n = sc.nextInt();\n        // create a Discount object for each line\n    }\n}\n"
   },
   {
    "title": "Largest perimeter",
    "prompt": "<p><code>interface Shape</code>: <code>double perimeter();</code> and <code>default String label()</code>, which returns <code>shape</code>. Each of the classes <code>Square(a)</code>, <code>Rect(w, h)</code> and <code>Circle(r)</code> (perimeter 2πr) overrides <code>label()</code> and returns <code>square</code>, <code>rect</code> or <code>circle</code>. The input is <code>n</code>, then <code>n</code> lines: <code>S a</code>, <code>R w h</code> or <code>C r</code>. Print the shape with the largest perimeter (if there is a tie, the first one) as <code>label perimeter</code>, with the perimeter shown to 2 decimal places. Example: <code>S 5</code>, <code>C 3</code>, <code>R 4 7</code> → <code>rect 22.00</code>.</p>",
    "hints": [
     "Keep the best shape in a variable <code>Shape best = null;</code>.",
     "Replace it only when strictly greater (<code>&gt;</code>), so on a tie the first one stays."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Shape {\n    double perimeter();\n    default String label() { return \"shape\"; }\n}\n\n// write the Square, Rect, Circle classes\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // read the shapes and find the one with the largest perimeter\n    }\n}\n"
   },
   {
    "title": "Payment fees",
    "prompt": "<p><code>abstract class Payment</code>: a field <code>amount</code>, <code>abstract long fee()</code>, <code>abstract String kind()</code>. Subclasses: <code>Card</code> — 1% of the amount (integer division), <code>Qr</code> — 0, <code>Transfer</code> — a fixed 150. The input is <code>n</code>, then <code>n</code> lines <code>CARD amount</code>, <code>QR amount</code> or <code>TRANSFER amount</code>. Collect the payments into a <code>Payment[]</code> array and sort them by <b>descending</b> fee (on a tie, keep the input order) using a sort you write yourself. Print each one as <code>kind amount fee</code>, and at the end <code>Total fee: sum</code>. Example:</p><pre><code>3\nQR 5000\nCARD 25000\nTRANSFER 100000</code></pre><p>→</p><pre><code>CARD 25000 250\nTRANSFER 100000 150\nQR 5000 0\nTotal fee: 400</code></pre>",
    "hints": [
     "Insertion sort is a good fit: it is stable, so the order of equal elements is not broken.",
     "Compare only through <code>fee()</code>. There is no need to know the concrete class (polymorphism)."
    ],
    "starter": "import java.util.Scanner;\n\nabstract class Payment {\n    protected long amount;\n    Payment(long amount) { this.amount = amount; }\n    abstract long fee();\n    abstract String kind();\n}\n\n// write the Card, Qr, Transfer classes\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Payment[] ps = new Payment[n];\n        // read, sort and print\n    }\n}\n"
   },
   {
    "title": "Expression tree",
    "prompt": "<p><code>interface Expr { long eval(); String show(); }</code> and three classes: <code>Num</code> (a number), <code>Add</code> and <code>Mul</code> (each holds two <code>Expr</code> values). <code>show()</code> shows addition and multiplication in brackets: <code>(3 + 4)</code>. The input is <code>n</code>, then <code>n</code> tokens in reverse Polish notation (numbers, <code>+</code>, <code>*</code>); the expression is always valid. Build the tree using an <code>Expr[]</code> array as a stack, then print <code>show() = eval()</code>. Example: <code>5</code> / <code>3 4 + 2 *</code> → <code>((3 + 4) * 2) = 14</code>.</p>",
    "hints": [
     "When a number comes, push <code>new Num(...)</code> onto the stack. When an operator comes, take two elements (the right one comes out first) and push a new <code>Add</code>/<code>Mul</code>.",
     "<code>eval()</code> and <code>show()</code> call the nested expressions recursively."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Expr {\n    long eval();\n    String show();\n}\n\n// write the Num, Add, Mul classes\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Expr[] stack = new Expr[n];\n        int top = 0;\n        // process the tokens\n    }\n}\n"
   }
  ]
 },
 "jv-10": {
  "pr": [
   {
    "title": "Number of distinct cities",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> city names (one word each). Using <code>HashSet</code>, print how many different cities there are. Example: <code>5</code> / <code>Almaty Astana Almaty Oral Astana</code> → <code>3</code>.</p>",
    "hints": [
     "A <code>Set</code> does not store a repeated value a second time.",
     "The answer is <code>cities.size()</code>."
    ],
    "starter": "import java.util.HashSet;\nimport java.util.Set;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> cities = new HashSet<>();\n        // add the cities\n        System.out.println(n);\n    }\n}\n"
   },
   {
    "title": "Price list",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> lines <code>item price</code>, then <code>q</code> and <code>q</code> item names. Put the items into a <code>HashMap</code> and, for each query, print the price or <code>NOT FOUND</code>. If an item repeats, the last price applies. Example: <code>2</code> / <code>nan 250</code> / <code>sut 480</code> / <code>2</code> / <code>sut</code> / <code>shai</code> → <code>480</code>, <code>NOT FOUND</code>.</p>",
    "hints": [
     "<code>put</code> replaces the value of an existing key, so the last price stays.",
     "Check with <code>containsKey</code> first, then <code>get</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> prices = new HashMap<>();\n        // put, then answer the queries\n    }\n}\n"
   },
   {
    "title": "List of long words",
    "prompt": "<p>The input is <code>n k</code>, then <code>n</code> words. Collect the words whose length is at least <code>k</code> into an <code>ArrayList</code>, in input order. On the first line print how many there are, and on the second line print the words themselves separated by spaces (if there are none, the second line is empty). Example: <code>4 5</code> / <code>Astana Oral Almaty Kokshetau</code> →</p><pre><code>3\nAstana Almaty Kokshetau</code></pre>",
    "hints": [
     "If <code>w.length() &gt;= k</code>, then <code>words.add(w)</code>.",
     "Go through the elements with <code>words.get(i)</code>; the count is <code>words.size()</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        // filter the words\n    }\n}\n"
   },
   {
    "title": "Most frequent word",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> words (for example, favourite dishes from a survey). Print the most frequent word and how many times it occurs. If two words have the same count, take the one that is smallest alphabetically. Use a <code>HashMap</code>. Example: <code>6</code> / <code>besbarmak plov plov manty besbarmak kuyrdak</code> → <code>besbarmak 2</code>.</p>",
    "hints": [
     "Counting: <code>cnt.merge(w, 1, Integer::sum)</code> or <code>getOrDefault</code>.",
     "A <code>HashMap</code> has no order, so decide ties yourself: <code>e.getKey().compareTo(best) &lt; 0</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> cnt = new HashMap<>();\n        // count\n    }\n}\n"
   },
   {
    "title": "Students in both clubs",
    "prompt": "<p>There are two clubs: chess and robotics. The input is <code>n</code> and <code>n</code> names (chess), then <code>m</code> and <code>m</code> names (robotics). Print each student who attends both clubs on a separate line, in alphabetical order; if there are none, print <code>NONE</code>. Use <code>HashSet</code> and <code>TreeSet</code>. Example: <code>3</code> / <code>Dana Aibek Erlan</code> / <code>2</code> / <code>Erlan Aibek</code> → <code>Aibek</code>, <code>Erlan</code>.</p>",
    "hints": [
     "Put the first list into a <code>HashSet</code>, and when reading the second list check each name with <code>contains</code>.",
     "If you put the common names into a <code>TreeSet</code>, they are sorted alphabetically by themselves."
    ],
    "starter": "import java.util.HashSet;\nimport java.util.Set;\nimport java.util.TreeSet;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> chess = new HashSet<>();\n        // read the second list and find the common elements\n    }\n}\n"
   },
   {
    "title": "Sales by city",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> lines <code>city amount</code>. Print the total sales of each city in the form <code>city amount</code>, in the order in which the city <b>first appeared</b>. A <code>LinkedHashMap</code> keeps the insertion order. Example: <code>4</code> / <code>Oral 500</code> / <code>Almaty 200</code> / <code>Oral 300</code> / <code>Taraz 100</code> → <code>Oral 800</code>, <code>Almaty 200</code>, <code>Taraz 100</code>.</p>",
    "hints": [
     "<code>Map&lt;String, Long&gt; sales = new LinkedHashMap&lt;&gt;();</code>",
     "<code>sales.put(city, sales.getOrDefault(city, 0L) + amount)</code>. Updating an existing key does not change its position."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Long> sales = new HashMap<>();\n        // collect the sums\n    }\n}\n"
   },
   {
    "title": "Anagram groups",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> words (lowercase Latin letters). Group the words made of the same letters (anagrams). Print the groups in the order their first word appeared, each group on one line, with the words inside a group in input order, separated by spaces. Example: <code>6</code> / <code>eat tea tan ate nat bat</code> →</p><pre><code>eat tea ate\ntan nat\nbat</code></pre><p>Use the sorted letters of the word as the key.</p>",
    "hints": [
     "Key: <code>char[] cs = w.toCharArray(); Arrays.sort(cs); String key = new String(cs);</code>.",
     "The value is a list of words: <code>Map&lt;String, List&lt;String&gt;&gt;</code>; a <code>LinkedHashMap</code> keeps the order of the groups."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.LinkedHashMap;\nimport java.util.List;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, List<String>> groups = new LinkedHashMap<>();\n        // key: the sorted letters\n    }\n}\n"
   },
   {
    "title": "Restoring a train route",
    "prompt": "<p>A passenger's <code>n</code> tickets got mixed up; each ticket says <code>from where to where</code>. The tickets form one continuous route, and each city is visited at most once. Print the route as <code>A -&gt; B -&gt; C</code>. Hint: a <code>HashMap</code> stores the \"next city\", and a <code>HashSet</code> helps you find the starting city (it does not appear in the \"to\" part of any ticket). Example:</p><pre><code>3\nAstana Karaganda\nAlmaty Taraz\nTaraz Astana</code></pre><p>→ <code>Almaty -&gt; Taraz -&gt; Astana -&gt; Karaganda</code></p>",
    "hints": [
     "The starting city is the only key of <code>next</code> that is not among the values (<code>targets</code>).",
     "Then walk along the route with <code>while (next.containsKey(cur))</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.HashSet;\nimport java.util.Map;\nimport java.util.Set;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> next = new HashMap<>();\n        Set<String> targets = new HashSet<>();\n        // read the tickets and find the starting city\n    }\n}\n"
   }
  ]
 },
 "jv-11": {
  "pr": [
   {
    "title": "Checking an age",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> tokens. Convert each one to an age with <code>Integer.parseInt</code>. If it is not a number (<code>NumberFormatException</code>), print <code>BAD x</code>; if the number is outside 0–120, print <code>OUT x</code>; otherwise print <code>OK x</code> (<code>x</code> is the token itself). Example: <code>3</code> / <code>25 abc 150</code> → <code>OK 25</code>, <code>BAD abc</code>, <code>OUT 150</code>.</p>",
    "hints": [
     "Read the token as a string with <code>sc.next()</code>, then <code>Integer.parseInt</code> inside a <code>try</code>.",
     "In the <code>catch (NumberFormatException e)</code> block, print <code>BAD</code>."
    ]
   },
   {
    "title": "Always finally",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> tokens. For each one: if it is a number, print its square (<code>long</code>); otherwise print <code>ERROR x</code>. Increase the counter in the <code>finally</code> block, and at the end print <code>Checked: n</code>. Example: <code>3</code> / <code>4 x 100000</code> → <code>16</code>, <code>ERROR x</code>, <code>10000000000</code>, <code>Checked: 3</code>.</p>",
    "hints": [
     "<code>finally</code> runs whether or not there was an error, so increase the counter there.",
     "100000² does not fit into an int: <code>long v = Integer.parseInt(t);</code>."
    ]
   },
   {
    "title": "Safe division",
    "prompt": "<p>The method <code>static int divide(int a, int b)</code> should throw <code>throw new IllegalArgumentException(\"Division by zero\")</code> if <code>b == 0</code>, and otherwise return <code>a / b</code>. The input is <code>n</code>, then <code>n</code> pairs <code>a b</code>. For each pair print the result, or the message caught in the <code>catch</code> (<code>e.getMessage()</code>). Example: <code>2</code> / <code>10 3</code> / <code>5 0</code> → <code>3</code>, <code>Division by zero</code>.</p>",
    "hints": [
     "<code>throw new IllegalArgumentException(\"Division by zero\");</code> stops the method immediately.",
     "In <code>main</code>, use <code>catch (IllegalArgumentException e)</code> and <code>e.getMessage()</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int divide(int a, int b) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            // call divide inside try\n        }\n    }\n}\n"
   },
   {
    "title": "Your own exception",
    "prompt": "<p>Write <code>class InvalidScoreException extends Exception</code>. The method <code>static int check(int s) throws InvalidScoreException</code> throws it with the message <code>\"Invalid score: \" + s</code> if the score is outside 0–100. The input is <code>n</code>, then <code>n</code> integer scores. Print the messages for the invalid scores, and at the end the sum of the valid ones as <code>Sum: s</code>. Example: <code>4</code> / <code>90 120 75 -5</code> → <code>Invalid score: 120</code>, <code>Invalid score: -5</code>, <code>Sum: 165</code>.</p>",
    "hints": [
     "Exception class: <code>InvalidScoreException(String message) { super(message); }</code>.",
     "This is a checked exception: write <code>throws InvalidScoreException</code> on the method and catch it in <code>main</code>."
    ],
    "starter": "import java.util.Scanner;\n\n// write the InvalidScoreException class\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum += sc.nextInt();\n        }\n        System.out.println(\"Sum: \" + sum);\n    }\n}\n"
   },
   {
    "title": "Reading fractions",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> fractions in the form <code>a/b</code> (for example, <code>3/4</code>). Split each one with <code>split(\"/\")</code> and print its value with 2 decimal places. If the denominator is 0, throw an <code>IllegalArgumentException</code> yourself and print <code>ZERO</code>; if the number is malformed (<code>NumberFormatException</code>), print <code>BAD</code>; if there is no <code>/</code> sign, print <code>BAD</code> too. Write two catch blocks: <code>NumberFormatException</code> is a subclass of <code>IllegalArgumentException</code>, so it comes first. Example: <code>3</code> / <code>3/4 1/0 x/2</code> → <code>0.75</code>, <code>ZERO</code>, <code>BAD</code>.</p>",
    "hints": [
     "If <code>t.split(\"/\")</code> does not give two parts, that is also <code>BAD</code>. You can throw it as an exception too.",
     "Order of the catch blocks: <code>NumberFormatException</code> first, then <code>IllegalArgumentException</code>. If you reverse them, the compiler reports an error."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            // split, check and print\n        }\n    }\n}\n"
   },
   {
    "title": "Password rules",
    "prompt": "<p>Write <code>class WeakPasswordException extends Exception</code>. The method <code>static void validate(String p) throws WeakPasswordException</code> checks the rules in order: shorter than 8 characters — <code>too short</code>; no digit — <code>no digit</code>; no uppercase Latin letter — <code>no uppercase</code>. The input is <code>n</code>, then <code>n</code> passwords. For each one print <code>OK</code> or <code>WEAK: reason</code>. Example: <code>Astana2026</code> → <code>OK</code>, <code>qwerty</code> → <code>WEAK: too short</code>.</p>",
    "hints": [
     "Digit: <code>c &gt;= '0' &amp;&amp; c &lt;= '9'</code>, uppercase: <code>c &gt;= 'A' &amp;&amp; c &lt;= 'Z'</code>.",
     "<code>OK</code> is printed only when <code>validate</code> finishes without an exception."
    ],
    "starter": "import java.util.Scanner;\n\n// write the WeakPasswordException class\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String p = sc.next();\n            System.out.println(\"OK\");\n        }\n    }\n}\n"
   },
   {
    "title": "ATM",
    "prompt": "<p>Write <code>class AtmException extends Exception</code>. The <code>Atm</code> class has <code>private long balance</code> and the amount withdrawn today. The method <code>void withdraw(long amount) throws AtmException</code> checks in order: the amount is positive and a multiple of 1000, otherwise <code>Amount must be a positive multiple of 1000</code>; the balance covers it, otherwise <code>Insufficient funds</code>; the total for today does not exceed 200000, otherwise <code>Daily limit exceeded</code>. The input is the starting balance and <code>n</code>, then <code>n</code> tokens. If a token is not a number, print <code>Bad input: x</code>. For each successful withdrawal print <code>OK amount</code>, for an error print the message, and at the end print <code>BALANCE b</code>. Example:</p><pre><code>300000 5\n50000 abc 1500 160000 100000</code></pre><p>→</p><pre><code>OK 50000\nBad input: abc\nAmount must be a positive multiple of 1000\nDaily limit exceeded\nOK 100000\nBALANCE 150000</code></pre>",
    "hints": [
     "The checks run in order: first whether the amount is valid, then the balance, and last the daily limit. Change the fields only if all the checks pass.",
     "There are two different kinds of errors: <code>NumberFormatException</code> from <code>Long.parseLong</code>, and your own <code>AtmException</code>. Use two catch blocks."
    ],
    "starter": "import java.util.Scanner;\n\n// write the AtmException class\n\nclass Atm {\n    private long balance;\n    private long today = 0;\n\n    Atm(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    void withdraw(long amount) {\n        balance -= amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Atm atm = new Atm(sc.nextLong());\n        int n = sc.nextInt();\n        // process the tokens\n        System.out.println(\"BALANCE \" + atm.getBalance());\n    }\n}\n"
   },
   {
    "title": "Checking a config file",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> lines <code>key=value</code> (no spaces). Write <code>class ConfigException extends Exception</code> and a method that checks each line and throws it on an error: no <code>=</code> — <code>Line i: missing =</code>; the key has already appeared — <code>Line i: duplicate key</code>; the key is <code>port</code> and the value is not an integer from 1 to 65535 — <code>Line i: bad port</code> (<code>i</code> is the line number, starting from 1). Print the errors, store the correct lines in a <code>TreeMap</code>, and at the end print them sorted by key as <code>key = value</code>. Example:</p><pre><code>4\nport=80a\nhost=localhost\ndebug\nhost=0.0.0.0</code></pre><p>→</p><pre><code>Line 1: bad port\nLine 3: missing =\nLine 4: duplicate key\nhost = localhost</code></pre>",
    "hints": [
     "Split with <code>indexOf(\"=\")</code>: the key is <code>substring(0, eq)</code> and the value is <code>substring(eq + 1)</code>.",
     "Catch the <code>NumberFormatException</code> from <code>parseInt</code> and throw your own <code>ConfigException</code> instead. A line with an error does not go into the map."
    ],
    "starter": "import java.util.Map;\nimport java.util.TreeMap;\nimport java.util.Scanner;\n\n// write the ConfigException class\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> cfg = new TreeMap<>();\n        // check the lines\n    }\n}\n"
   }
  ]
 },
 "jv-12": {
  "pr": [
   {
    "title": "Generic Pair",
    "prompt": "<p>Write <code>class Pair&lt;A, B&gt;</code>, as in the lesson (<code>getFirst()</code>, <code>getSecond()</code>). The input is <code>n</code>, then <code>n</code> lines <code>city population</code>. Collect the pairs into a <code>List&lt;Pair&lt;String, Integer&gt;&gt;</code> and print the city with the largest population (on a tie, the first one) as <code>city population</code>. Example: <code>3</code> / <code>Shymkent 1200000</code> / <code>Almaty 2200000</code> / <code>Astana 1400000</code> → <code>Almaty 2200000</code>.</p>",
    "hints": [
     "Generic class: <code>class Pair&lt;A, B&gt; { private final A first; ... }</code>.",
     "You can compare <code>Integer</code> values with <code>&gt;</code> (unboxing), but not with <code>==</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\n// write class Pair<A, B>\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // build the list of Pairs\n    }\n}\n"
   },
   {
    "title": "Stream: above a threshold",
    "prompt": "<p>The input is <code>n k</code>, then <code>n</code> integers (order totals). Using <code>Arrays.stream(...).filter(...).count()</code>, print how many totals are strictly greater than <code>k</code>. Example: <code>5 10000</code> / <code>1200 45000 800 150000 10000</code> → <code>2</code>.</p>",
    "hints": [
     "A lambda can use an outer variable (<code>k</code>) if it is not changed later.",
     "<code>count()</code> returns a <code>long</code>."
    ],
    "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        long cnt = 0;   // calculate it with a stream\n        System.out.println(cnt);\n    }\n}\n"
   },
   {
    "title": "Stream: squares of odd numbers",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> integers (|x| ≤ 1000). Using a stream, take the <b>odd</b> numbers, square each one (<code>map</code>), and print their sum (<code>sum</code>). Example: <code>5</code> / <code>1 2 3 4 -5</code> → <code>35</code> (1 + 9 + 25).</p>",
    "hints": [
     "For a negative odd number, <code>x % 2</code> gives −1, so check <code>x % 2 != 0</code>.",
     "The pipeline: <code>filter(...)</code> → <code>map(x -&gt; x * x)</code> → <code>sum()</code>."
    ],
    "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int s = 0;   // calculate it with a stream\n        System.out.println(s);\n    }\n}\n"
   },
   {
    "title": "Generic maxOf",
    "prompt": "<p>Write the generic method from the lesson: <code>static &lt;T extends Comparable&lt;T&gt;&gt; T maxOf(List&lt;T&gt; xs)</code>. The input is <code>n</code> and <code>n</code> integers, then <code>m</code> and <code>m</code> words. Using the same <code>maxOf</code>, print two lines: the largest number and the alphabetically last word. Example: <code>3</code> / <code>5 -2 9</code> / <code>3</code> / <code>Oral Astana Taraz</code> → <code>9</code>, <code>Taraz</code>.</p>",
    "hints": [
     "Both <code>Integer</code> and <code>String</code> are <code>Comparable</code>, so one method works for both.",
     "Comparison: <code>x.compareTo(best) &gt; 0</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        // write the maxOf method and call it\n    }\n}\n"
   },
   {
    "title": "Sorting by length",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> words. Collect them into an <code>ArrayList</code> and sort them with <code>list.sort</code>, passing a lambda comparator: first by increasing length, and words of equal length in alphabetical order. Print them on one line separated by spaces. Example: <code>5</code> / <code>Shymkent Oral Aktau Taraz Ural</code> → <code>Oral Ural Aktau Taraz Shymkent</code>.</p>",
    "hints": [
     "If the comparator returns a negative number, <code>a</code> comes first: <code>a.length() - b.length()</code>.",
     "For equal lengths, use <code>a.compareTo(b)</code>."
    ]
   },
   {
    "title": "Predicate filter",
    "prompt": "<p>Write a generic method <code>static &lt;T&gt; List&lt;T&gt; keep(List&lt;T&gt; xs, Predicate&lt;T&gt; p)</code> that returns the elements satisfying the condition (<code>p.test(x)</code>). The input is <code>n</code> and <code>n</code> integers, then <code>m</code> and <code>m</code> words. On the first line print the even numbers, and on the second line the words that start with the letter <code>A</code> (in input order, separated by spaces); if there are none, print <code>NONE</code>. Example: <code>4</code> / <code>3 8 -2 5</code> / <code>3</code> / <code>Almaty Oral Aktobe</code> → <code>8 -2</code>, <code>Almaty Aktobe</code>.</p>",
    "hints": [
     "<code>import java.util.function.Predicate;</code>, and the call: <code>keep(nums, x -&gt; x % 2 == 0)</code>.",
     "For words: <code>w -&gt; w.startsWith(\"A\")</code> or <code>w.charAt(0) == 'A'</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.function.Predicate;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        // write the keep method and call it twice\n    }\n}\n"
   },
   {
    "title": "Stream: top students",
    "prompt": "<p>There is a <code>Student</code> class (name, score). The input is <code>n t</code>, then <code>n</code> lines <code>name score</code>. Using <code>students.stream()</code>, filter the students whose score is at least <code>t</code> (<code>filter</code>), take their names (<code>map</code>), sort them alphabetically (<code>sorted</code>), and collect them into a list (<code>collect(Collectors.toList())</code>). On the first line print how many there are, and on the second line print the names separated by <code>, </code>; if nobody qualifies, print <code>NONE</code> on the second line. Example: <code>4 85</code> / <code>Timur 90</code> / <code>Aliya 85</code> / <code>Bolat 70</code> / <code>Dana 99</code> →</p><pre><code>3\nAliya, Dana, Timur</code></pre>",
    "hints": [
     "You need <code>import java.util.stream.Collectors;</code>.",
     "The pipeline: <code>.filter(s -&gt; s.score &gt;= t).map(s -&gt; s.name).sorted().collect(Collectors.toList())</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.stream.Collectors;\nimport java.util.Scanner;\n\nclass Student {\n    String name;\n    int score;\n    Student(String name, int score) { this.name = name; this.score = score; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int t = sc.nextInt();\n        List<Student> students = new ArrayList<>();\n        for (int i = 0; i < n; i++) students.add(new Student(sc.next(), sc.nextInt()));\n        // write the stream pipeline\n    }\n}\n"
   },
   {
    "title": "Generic stack",
    "prompt": "<p>Write a generic class <code>class Stack&lt;T&gt;</code> based on <code>ArrayList&lt;T&gt;</code>: <code>push(T x)</code>, <code>T pop()</code>, <code>T peek()</code>, <code>int size()</code>, <code>boolean isEmpty()</code>. The input is <code>q</code>, then <code>q</code> commands: <code>PUSH word</code>, <code>POP</code>, <code>PEEK</code>, <code>SIZE</code>. <code>POP</code> prints the removed element, <code>PEEK</code> prints the top element, and <code>SIZE</code> prints the size; if the stack is empty, <code>POP</code> and <code>PEEK</code> print <code>EMPTY</code>. Example:</p><pre><code>6\nPUSH Almaty\nPUSH Astana\nPEEK\nPOP\nPOP\nPOP</code></pre><p>→ <code>Astana</code>, <code>Astana</code>, <code>Almaty</code>, <code>EMPTY</code>.</p>",
    "hints": [
     "The top of the stack is the end of the list: <code>items.remove(items.size() - 1)</code>.",
     "Check for an empty stack with <code>isEmpty()</code> first, and only then call <code>pop()</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\n// write class Stack<T>\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        // create a Stack<String> and process the commands\n    }\n}\n"
   }
  ]
 },
 "jv-13": {
  "pr": [
   {
    "title": "Factorial with recursion",
    "prompt": "<p>Write the method <code>static long factorial(int n)</code> using recursion (base case: <code>n &lt;= 1</code> → 1). The input is <code>n</code> (0 ≤ n ≤ 20); print <code>n!</code>. Example: <code>5</code> → <code>120</code>.</p>",
    "hints": [
     "Base case: <code>if (n &lt;= 1) return 1;</code>.",
     "Recursive step: <code>return n * factorial(n - 1);</code>. 20! barely fits into a long."
    ]
   },
   {
    "title": "Digit sum with recursion",
    "prompt": "<p>Write the method <code>static int digitSum(long n)</code> using recursion, <b>without a loop</b>: if <code>n &lt; 10</code>, return <code>n</code>; otherwise, the last digit plus the digit sum of the remaining number. The input is a non-negative integer (≤ 10¹⁸, read with <code>nextLong</code>). Example: <code>98765</code> → <code>35</code>.</p>",
    "hints": [
     "Base case: a number with one digit.",
     "Recursive step: <code>(int) (n % 10) + digitSum(n / 10)</code>."
    ]
   },
   {
    "title": "Number of words in a line",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> lines; each line has several words separated by single spaces (the line is not empty). Print the number of words in each line on a separate line. Do not forget the <code>nextLine()</code> trap after <code>nextInt()</code>. Example:</p><pre><code>2\nAlmaty Astana Shymkent\nTaraz</code></pre><p>→ <code>3</code>, <code>1</code>.</p>",
    "hints": [
     "After <code>nextInt()</code>, the cursor is at the end of the first line. Call one \"empty\" <code>sc.nextLine();</code>.",
     "The number of words: <code>line.split(\" \").length</code>."
    ]
   },
   {
    "title": "Fibonacci with memoization",
    "prompt": "<p>Write the recursive method <code>static long fib(int n)</code> with an array <code>long[] memo</code> (<code>fib(0) = 0</code>, <code>fib(1) = 1</code>). The input is <code>n</code> (0 ≤ n ≤ 90). Print <code>fib(n)</code>. Without memoization, the program would never finish for n = 90. Example: <code>50</code> → <code>12586269025</code>.</p>",
    "hints": [
     "Store the computed value in <code>memo[n]</code>; 0 means it has not been computed yet (for n ≥ 2, fib(n) &gt; 0).",
     "At the start of the method: <code>if (memo[n] != 0) return memo[n];</code>."
    ]
   },
   {
    "title": "Tower of Hanoi",
    "prompt": "<p>Move <code>n</code> disks from peg 1 to peg 3 (a larger disk cannot be placed on a smaller one). With the recursive method <code>static void hanoi(int n, int from, int to, int via)</code>, print each move as <code>from -&gt; to</code>, and at the end <code>Moves: k</code>. The input is <code>n</code> (1 ≤ n ≤ 10). Example: <code>2</code> →</p><pre><code>1 -&gt; 2\n1 -&gt; 3\n2 -&gt; 3\nMoves: 3</code></pre>",
    "hints": [
     "To move n disks: move the top n−1 disks to the helper peg, the largest disk to the target peg, then move the n−1 disks on top of it.",
     "There are many moves (2ⁿ − 1), so collect the output in a <code>StringBuilder</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static void hanoi(int n, int from, int to, int via) {\n        // recursion\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        hanoi(n, 1, 3, 2);\n    }\n}\n"
   },
   {
    "title": "Subsets with a given sum",
    "prompt": "<p>The input first gives a target sum <code>target</code>, then integers of unknown count (at most 18, possibly on several lines), until the input ends. Read the numbers with <code>hasNextInt()</code>. Using recursion, count the non-empty subsets whose sum equals <code>target</code> (each element is used at most once; subsets with different positions count as different): for each element we either \"take\" it or \"skip\" it. Example: <code>5</code> / <code>1 2 3 4 5</code> → <code>3</code> ({5}, {1, 4}, {2, 3}).</p>",
    "hints": [
     "Collect the numbers with <code>while (sc.hasNextInt()) a.add(sc.nextInt());</code>.",
     "Recursion <code>count(i, rest)</code>: take element <code>i</code> — <code>count(i + 1, rest - a[i])</code>; skip it — <code>count(i + 1, rest)</code>. Do not count the empty subset."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int target = sc.nextInt();\n        List<Integer> a = new ArrayList<>();\n        // read with hasNextInt, then recursion\n    }\n}\n"
   },
   {
    "title": "Letter permutations",
    "prompt": "<p>The input is one word with no repeated letters (length 1–7). Print all permutations of its letters in lexicographic order, each on a separate line. Backtracking: first sort the letters, then use a <code>boolean[] used</code> array to place a letter that has not been used yet at each position. Example: <code>bca</code> → <code>abc acb bac bca cab cba</code> (each on its own line).</p>",
    "hints": [
     "Sort first with <code>Arrays.sort(cs)</code>. Then the permutations come out in lexicographic order by themselves.",
     "Choose → <code>gen(...)</code> → undo: <code>deleteCharAt</code> and <code>used[i] = false</code>."
    ]
   },
   {
    "title": "N queens",
    "prompt": "<p>In how many ways can you place <code>n</code> queens on an <code>n × n</code> chessboard so that no two attack each other (no two share a row, a column or a diagonal)? The input is <code>n</code> (1 ≤ n ≤ 10). Backtracking: place one queen in each row, and mark the columns and the two diagonals with <code>boolean</code> arrays. Example: <code>4</code> → <code>2</code>, <code>8</code> → <code>92</code>.</p>",
    "hints": [
     "On one diagonal, <code>r + c</code> is constant; on the other, <code>r - c</code> is constant (add <code>+ n - 1</code> so the index is not negative).",
     "After placing a queen, call <code>place(r + 1)</code>, then remove the marks."
    ]
   }
  ]
 },
 "jv-p1": {
  "pr": [
   {
    "title": "Most frequent letter",
    "prompt": "<p>The input is one word made of lowercase Latin letters. Print the most frequent letter and how many times it occurs. If several letters have the same count, print the one that comes first alphabetically. Use a frequency array <code>int[26]</code>. Example: <code>karaganda</code> → <code>a 4</code>.</p>",
    "hints": [
     "<code>cnt[c - 'a']++</code> is the counter for each letter.",
     "To turn an index back into a letter: <code>(char) ('a' + best)</code>. If you replace only when strictly greater, on a tie the alphabetically first letter stays."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        // count and find the largest\n    }\n}\n"
   },
   {
    "title": "Zeros to the end",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> integers. Keep the order of the non-zero elements, move all the zeros to the end of the array, and print it on one line separated by spaces. Use two pointers: <code>write</code> shows where the next non-zero element goes. Example: <code>6</code> / <code>0 3 0 5 7 0</code> → <code>3 5 7 0 0 0</code>.</p>",
    "hints": [
     "Move a non-zero element forward: <code>a[write++] = a[i]</code>.",
     "Fill the remaining places at the end with zeros."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // two pointers\n    }\n}\n"
   },
   {
    "title": "Missing number",
    "prompt": "<p>In a class, students are numbered from 1 to <code>n</code>, and one student did not come. The input is <code>n</code> (2 ≤ n ≤ 10⁶), then the numbers of the <code>n − 1</code> students who came (in any order). Print the number of the student who did not come. Hint: the sum of the numbers from 1 to n is <code>n(n + 1)/2</code> (use long). Example: <code>5</code> / <code>3 1 5 2</code> → <code>4</code>.</p>",
    "hints": [
     "Subtract the sum of the numbers that came from the sum of all the numbers.",
     "If n = 10⁶, then <code>n(n + 1)/2</code> does not fit into an int. Use <code>long</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // the sum formula\n    }\n}\n"
   },
   {
    "title": "First unique letter",
    "prompt": "<p>The input is one word made of lowercase Latin letters. Print the first letter that occurs exactly once in the word, and its index (from 0). If there is no such letter, print <code>NONE</code>. Example: <code>almaty</code> → <code>l 1</code>.</p>",
    "hints": [
     "The first pass counts frequencies; the second pass goes through the word from left to right and looks for a letter that occurs once.",
     "As soon as you find it, print it and leave with <code>return</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        // two passes\n    }\n}\n"
   },
   {
    "title": "Merging sorted lists",
    "prompt": "<p>The order totals of two branches are given in ascending order. The input is <code>n</code> and <code>n</code> numbers, then <code>m</code> and <code>m</code> numbers. Merge the two lists into one sorted list and print it on one line separated by spaces. Do not use <code>Arrays.sort</code>; write an O(n + m) solution with two pointers. Example: <code>3</code> / <code>1 4 9</code> / <code>4</code> / <code>2 4 5 10</code> → <code>1 2 4 4 5 9 10</code>.</p>",
    "hints": [
     "At each step take the smaller of <code>a[i]</code> and <code>b[j]</code>, and move that pointer.",
     "When one list is finished, check the boundary: <code>j &gt;= m || (i &lt; n &amp;&amp; a[i] &lt;= b[j])</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int m = sc.nextInt();\n        int[] b = new int[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextInt();\n        // two pointers\n    }\n}\n"
   },
   {
    "title": "Pairs with difference k",
    "prompt": "<p>The input is <code>n k</code> (k ≥ 1), then <code>n</code> <b>distinct</b> integers. Print the number of pairs whose difference is exactly <code>k</code> (<code>b − a = k</code>). Solve it in O(n) with a <code>HashSet</code>. Example: <code>5 2</code> / <code>1 5 3 4 2</code> → <code>3</code> ((1, 3), (3, 5), (2, 4)).</p>",
    "hints": [
     "Put all the numbers into a <code>HashSet</code>.",
     "For each <code>x</code>, check whether <code>x + k</code> is in the set. Since k ≥ 1, each pair is counted exactly once."
    ]
   },
   {
    "title": "Subarrays with sum k",
    "prompt": "<p>The input is <code>n k</code> (n ≤ 10⁵), then <code>n</code> integers (they may be negative). Print the number of contiguous subarrays whose sum is exactly <code>k</code>. The O(n²) approach is too slow: use prefix sums and a <code>HashMap&lt;Long, Integer&gt;</code>. At each position ask: \"how many times has the sum <code>prefix − k</code> appeared so far?\". Example: <code>5 3</code> / <code>1 2 1 2 1</code> → <code>4</code>.</p>",
    "hints": [
     "The sum of a[i..j] = prefix[j] − prefix[i−1]. If it equals k, then prefix[i−1] = prefix[j] − k.",
     "First put <code>seen.put(0L, 1)</code> for subarrays that start at the beginning of the array. The answer can be large, so use <code>long</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long k = sc.nextLong();\n        // prefix sums\n    }\n}\n"
   },
   {
    "title": "Longest palindromic substring",
    "prompt": "<p>The input is one word made of lowercase Latin letters (length ≤ 2000). Print the longest contiguous part that is a palindrome; if there are several, print the leftmost one. Take each position (and the gap between two letters) as the center, and expand two pointers outward from it. This is O(n²). Example: <code>abacdfgdcaba</code> → <code>aba</code>, <code>forgeeksskeegfor</code> → <code>geeksskeeg</code>.</p>",
    "hints": [
     "For an odd length, the center is <code>(c, c)</code>; for an even length, <code>(c, c + 1)</code>. While the letters match, decrease <code>l</code> and increase <code>r</code>.",
     "When the expansion ends, the palindrome length is <code>r - l - 1</code>. Replace the answer only when it is strictly longer, so the leftmost one stays."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // expand from each center\n        System.out.println(s.substring(0, 1));\n    }\n}\n"
   }
  ]
 },
 "jv-p2": {
  "pr": [
   {
    "title": "Electronic queue at a service centre",
    "prompt": "<p>A service centre runs an electronic queue. The input is <code>q</code>, then <code>q</code> commands: <code>JOIN name</code> — join the queue, <code>NEXT</code> — call the next person to a window. For each <code>NEXT</code>, print the name of the person called; if the queue is empty, print <code>EMPTY</code>. At the end print <code>Waiting: k</code>. Use an <code>ArrayDeque</code> as the queue. Example:</p><pre><code>5\nJOIN Aruzhan\nJOIN Bolat\nNEXT\nJOIN Dana\nNEXT</code></pre><p>→ <code>Aruzhan</code>, <code>Bolat</code>, <code>Waiting: 1</code>.</p>",
    "hints": [
     "Queue: <code>offer</code> adds to the end, <code>poll</code> takes from the front.",
     "On an empty queue, <code>poll()</code> returns <code>null</code>. Check <code>isEmpty()</code> first."
    ],
    "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        ArrayDeque<String> queue = new ArrayDeque<>();\n        // process the commands\n    }\n}\n"
   },
   {
    "title": "Climbing stairs",
    "prompt": "<p>There is a staircase with <code>n</code> steps (1 ≤ n ≤ 90). In one move you can climb 1 or 2 steps. In how many ways can you reach the top? DP: <code>dp[i] = dp[i − 1] + dp[i − 2]</code>, type <code>long</code>. Example: <code>4</code> → <code>5</code>.</p>",
    "hints": [
     "The last move was either 1 step or 2 steps: <code>dp[i] = dp[i - 1] + dp[i - 2]</code>.",
     "Starting values: <code>dp[0] = 1</code>, <code>dp[1] = 1</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long[] dp = new long[n + 2];\n        // fill in the dp table\n        System.out.println(dp[n]);\n    }\n}\n"
   },
   {
    "title": "Backspace key",
    "prompt": "<p>The input is one line: Latin letters and the <code>#</code> sign. <code>#</code> is Backspace: it deletes the last typed letter (if there is nothing to delete, nothing happens). At the end print the text left on the screen; if it is empty, print <code>EMPTY</code>. Use a <code>StringBuilder</code> or an <code>ArrayDeque</code> as a stack. Example: <code>Alm#maty##y</code> → <code>Almay</code>.</p>",
    "hints": [
     "A letter is <code>append</code>; <code>#</code> is <code>deleteCharAt(sb.length() - 1)</code>.",
     "Check <code>sb.length() &gt; 0</code> before deleting."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // when # appears, delete the last character\n        System.out.println(sb.toString());\n    }\n}\n"
   },
   {
    "title": "Most profitable period",
    "prompt": "<p>The input is <code>n</code>, then a shop's profit for <code>n</code> days (it may be negative). Print the sum of the most profitable contiguous period (at least one day). Kadane's algorithm, O(n): <code>cur = max(a[i], cur + a[i])</code>. Example: <code>8</code> / <code>-2 1 -3 4 -1 2 1 -5</code> → <code>6</code>.</p>",
    "hints": [
     "<code>cur</code> is the best period ending on this day: either we start over, or we continue the previous one.",
     "If all numbers are negative, the answer is the largest single element. So start <code>best</code> with the first element, not with 0."
    ]
   },
   {
    "title": "Waiting for a warmer day",
    "prompt": "<p>The input is <code>n</code>, then the temperatures for <code>n</code> days. For each day, print on one line, separated by spaces, how many days you have to wait until a <b>warmer</b> day; if there is no such day, print <code>0</code>. Solve it in O(n) with a monotonic stack (<code>ArrayDeque&lt;Integer&gt;</code>, indexes). Example: <code>8</code> / <code>73 74 75 71 69 72 76 73</code> → <code>1 1 4 2 1 1 0 0</code>.</p>",
    "hints": [
     "The stack keeps the indexes of days whose answer is not known yet (their temperatures decrease).",
     "If a new day is warmer than the day on top of the stack, pop that day and write the answer as <code>i - j</code>."
    ],
    "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] t = new int[n];\n        for (int i = 0; i < n; i++) t[i] = sc.nextInt();\n        int[] ans = new int[n];\n        // monotonic stack\n    }\n}\n"
   },
   {
    "title": "First position ≥ x",
    "prompt": "<p>The input is <code>n</code>, then <code>n</code> integers sorted in ascending order (they may repeat), then <code>q</code>, and <code>q</code> queries <code>x</code>. For each query, print the smallest index (from 0) where <code>a[i] ≥ x</code>; if there is no such element, print <code>n</code>. Write your own binary search (lower bound). Example: <code>5</code> / <code>1 3 3 3 8</code> / <code>3</code> / <code>3 4 9</code> → <code>1</code>, <code>4</code>, <code>5</code>.</p>",
    "hints": [
     "The interval is <code>[lo, hi)</code>, with <code>hi = n</code> at the start. If <code>a[mid] &lt; x</code>, then <code>lo = mid + 1</code>; otherwise <code>hi = mid</code>.",
     "The loop stops when <code>lo == hi</code>. That is the answer."
    ]
   },
   {
    "title": "Number of islands",
    "prompt": "<p>The input is <code>r c</code>, then <code>r</code> lines: <code>#</code> is land, <code>.</code> is water. Land cells connected in four directions (up, down, left, right) form one island. Print on one line the number of islands and the area (number of cells) of the largest island. Start a BFS (<code>ArrayDeque&lt;int[]&gt;</code>) from each new island. Example:</p><pre><code>4 5\n##..#\n#...#\n..#..\n....#</code></pre><p>→ <code>4 3</code>. If there are no islands, print <code>0 0</code>.</p>",
    "hints": [
     "Go through all the cells. If you find a <code>#</code> that has not been visited, it is a new island: start a BFS and mark the whole island in <code>seen</code>.",
     "ALWAYS check the boundaries before moving to a neighbour: on this platform, going outside an array is not checked automatically."
    ],
    "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        // BFS from each new land cell\n    }\n}\n"
   },
   {
    "title": "Longest common subsequence",
    "prompt": "<p>The input is two words <code>a</code> and <code>b</code> (length ≤ 300). Print the length of their longest common subsequence (LCS): a sequence that keeps the order of the letters and is obtained by deleting some letters, but not necessarily contiguous. DP: <code>dp[i][j]</code> is the LCS of the first <code>i</code> letters of <code>a</code> and the first <code>j</code> letters of <code>b</code>. Example: <code>abcde ace</code> → <code>3</code>.</p>",
    "hints": [
     "If the letters match, <code>dp[i][j] = dp[i - 1][j - 1] + 1</code>.",
     "If they do not match, drop one of them: <code>Math.max(dp[i - 1][j], dp[i][j - 1])</code>. The table size is <code>(n + 1) × (m + 1)</code>.</p>"
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        // dp table\n    }\n}\n"
   }
  ]
 }
} });
