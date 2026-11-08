// cpp practice tasks: English text. Code, solutions and checks are in content/practice/cpp.js.
DJ.i18n.patch({ lessons: {
 "cp-1": {
  "pr": [
   {
    "title": "Sum of three numbers",
    "prompt": "<p>Three integers are given. Print their sum. For example, <code>2 5 -1</code> → <code>6</code>.</p>",
    "hints": [
     "<code>cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;</code> reads all three numbers at once."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    // read three numbers and print their sum\n    return 0;\n}\n"
   },
   {
    "title": "Home city",
    "prompt": "<p>One word is given: the name of a city. Print the line <code>Мен &lt;қала&gt; қаласында тұрамын.</code>, where the city name replaces the part in angle brackets. For example, <code>Astana</code> → <code>Мен Astana қаласында тұрамын.</code></p>",
    "hints": [
     "First <code>cin &gt;&gt; city;</code>, then join the text and the variable with <code>&lt;&lt;</code>."
    ]
   },
   {
    "title": "Rectangle perimeter",
    "prompt": "<p>The length <code>a</code> and the width <code>b</code> of a rectangle (integers) are given. Print its perimeter: <code>2 * (a + b)</code>. For example, <code>3 4</code> → <code>14</code>.</p>",
    "hints": [
     "Do not forget the parentheses: <code>2 * a + b</code> gives a different result."
    ]
   },
   {
    "title": "Purchase and change",
    "prompt": "<p>In a shop, one item costs <code>price</code> tenge, the buyer takes <code>qty</code> items and gives <code>paid</code> tenge (it is guaranteed that <code>paid</code> is enough). Print the total sum on the first line and the change on the second. For example, <code>450 3 2000</code> → <code>1350</code> and <code>650</code>.</p>",
    "hints": [
     "Store the total in the variable <code>int total</code>, and compute the change as <code>paid - total</code>."
    ]
   },
   {
    "title": "Age next year",
    "prompt": "<p>A person's name (one word) and age are given. Print the phrase <code>&lt;аты&gt; келесі жылы &lt;жас+1&gt; жаста болады.</code> For example, <code>Dana 19</code> → <code>Dana келесі жылы 20 жаста болады.</code></p>",
    "hints": [
     "You can write <code>age + 1</code> directly inside <code>cout</code>."
    ]
   },
   {
    "title": "Square and cube",
    "prompt": "<p>An integer <code>n</code> is given (|n| ≤ 1000). Print the square of <code>n</code> on the first line and its cube on the second. For example, <code>3</code> → <code>9</code> and <code>27</code>.</p>",
    "hints": [
     "The cube is <code>n * n * n</code>."
    ]
   },
   {
    "title": "Bus fare",
    "prompt": "<p>One ride costs <code>p</code> tenge, a student rides <code>k</code> times a day and studies for <code>d</code> days. The card has <code>b</code> tenge. Print the total fare on the first line (<code>p * k * d</code>) and the amount left on the card on the second line (it can be negative). For example, <code>90 2 5 1000</code> → <code>900</code> and <code>100</code>.</p>",
    "hints": [
     "Read all four numbers with one <code>cin</code>.",
     "The remainder is <code>b - total</code>."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int p, k, d, b;\n    // read the input and print two lines\n    return 0;\n}\n"
   },
   {
    "title": "Receipt line",
    "prompt": "<p>An item name (one word), its price and its quantity are given. Print a receipt line in the format <code>&lt;атауы&gt; x &lt;саны&gt; = &lt;сомасы&gt; тг</code>. For example, <code>Nan 180 3</code> → <code>Nan x 3 = 540 тг</code>.</p>",
    "hints": [
     "Write the spaces inside the text: <code>\" x \"</code>, <code>\" = \"</code>."
    ]
   }
  ]
 },
 "cp-2": {
  "pr": [
   {
    "title": "Seconds to minutes",
    "prompt": "<p>A number of seconds <code>s</code> is given (non-negative). Print it in the form <code>&lt;минут&gt; мин &lt;секунд&gt; сек</code>. For example, <code>135</code> → <code>2 мин 15 сек</code>.</p>",
    "hints": [
     "Minutes are <code>s / 60</code> (integer division), the remaining seconds are <code>s % 60</code>."
    ]
   },
   {
    "title": "Celsius to Fahrenheit",
    "prompt": "<p>A temperature in degrees Celsius (a fractional number) is given. Convert it to Fahrenheit and print it with one digit after the decimal point: <code>F = C * 9 / 5 + 32</code>. For example, <code>-12.5</code> → <code>9.5</code>.</p>",
    "hints": [
     "<code>c</code> is a double, so <code>c * 9 / 5</code> is computed as a fraction.",
     "<code>fixed &lt;&lt; setprecision(1)</code>"
    ]
   },
   {
    "title": "Last digit",
    "prompt": "<p>A non-negative integer is given. Print its last digit. For example, <code>2025</code> → <code>5</code>.</p>",
    "hints": [
     "The remainder of division by 10 is the last digit."
    ]
   },
   {
    "title": "Large product",
    "prompt": "<p>In one region of Kazakhstan there are <code>a</code> families, and each family pays <code>b</code> tenge a year for utilities (1 ≤ a, b ≤ 1 000 000). Print the total sum. The result may not fit into the <code>int</code> type.</p>",
    "hints": [
     "The <code>int</code> type stores values up to about 2.1 billion.",
     "Make the variables <code>long long</code>."
    ]
   },
   {
    "title": "Average of three marks",
    "prompt": "<p>A student's three marks (integers) are given. Print the average mark with two digits after the decimal point. For example, <code>5 4 4</code> → <code>4.33</code>.</p>",
    "hints": [
     "<code>/ 3</code> does integer division; use <code>/ 3.0</code> or <code>static_cast&lt;double&gt;</code>."
    ]
   },
   {
    "title": "Tenge and tiyn",
    "prompt": "<p>An amount is given in tiyn (1 tenge = 100 tiyn, the number can be up to 10<sup>12</sup>). Print it in the form <code>&lt;теңге&gt; теңге &lt;тиын&gt; тиын</code>. For example, <code>150075</code> → <code>1500 теңге 75 тиын</code>.</p>",
    "hints": [
     "The number is large: use <code>long long</code>.",
     "Tenge is <code>t / 100</code>, tiyn is <code>t % 100</code>."
    ]
   },
   {
    "title": "Fuel for a trip",
    "prompt": "<p>The trip length <code>km</code> (integer), the car's consumption per 100 km <code>rate</code> litres (fractional), and the price of one litre of petrol <code>price</code> tenge (integer) are given. Print the amount of petrol needed on the first line and the total cost on the second; both numbers with two digits after the decimal point. For example, <code>1200 7.5 245</code> → <code>90.00</code> and <code>22050.00</code>.</p>",
    "hints": [
     "<code>km / 100</code> is integer division, for 150 km it gives 1. First compute <code>km * rate</code>.",
     "If you set <code>fixed &lt;&lt; setprecision(2)</code> once, it also affects the outputs that follow."
    ]
   },
   {
    "title": "Time format",
    "prompt": "<p>A number of seconds <code>s</code> is given (0 ≤ s &lt; 360 000). Print it in the format <code>H:MM:SS</code>: minutes and seconds are always two digits. For example, <code>3725</code> → <code>1:02:05</code>.</p>",
    "hints": [
     "Minutes are <code>s % 3600 / 60</code>.",
     "Print the two digits separately: tens <code>m / 10</code>, units <code>m % 10</code>."
    ]
   }
  ]
 },
 "cp-3": {
  "pr": [
   {
    "title": "Word length",
    "prompt": "<p>A single word made of Latin letters is given. Print its length. For example, <code>Karaganda</code> → <code>9</code>.</p>",
    "hints": [
     "<code>w.size()</code> returns the number of characters (for Latin letters)."
    ]
   },
   {
    "title": "First and last letter",
    "prompt": "<p>A word in Latin letters is given. Print its first and last letters separated by a space. For example, <code>Almaty</code> → <code>A y</code>.</p>",
    "hints": [
     "The index of the last character is <code>w.size() - 1</code>."
    ]
   },
   {
    "title": "Capital first letter",
    "prompt": "<p>A word written in lowercase Latin letters is given. Print it with the first letter capitalised. For example, <code>turkistan</code> → <code>Turkistan</code>.</p>",
    "hints": [
     "A <code>string</code> can be changed: <code>w[0] = toupper(w[0]);</code>"
    ]
   },
   {
    "title": "Mail domain",
    "prompt": "<p>An email address is given (it contains exactly one <code>@</code>). Print the part after the <code>@</code> sign, that is the domain. For example, <code>aida@mail.kz</code> → <code>mail.kz</code>.</p>",
    "hints": [
     "<code>email.find(\"@\")</code> returns the position of the symbol.",
     "<code>substr(pos)</code> — from <code>pos</code> to the end of the string."
    ]
   },
   {
    "title": "Sum of digits (string)",
    "prompt": "<p>A long number is given as a string (up to 100 digits, it may not fit into <code>long long</code>). Print the sum of its digits. For example, <code>98765</code> → <code>35</code>.</p>",
    "hints": [
     "<code>for (char c : num)</code> goes through each digit.",
     "Turn a character into a number: <code>c - '0'</code>."
    ]
   },
   {
    "title": "Address and flat",
    "prompt": "<p>The first line gives a flat number (an integer), the second line gives the full address with spaces. Print the line <code>&lt;мекенжай&gt;, &lt;нөмір&gt;-пәтер</code>. For example, <code>12</code> and <code>Abai dangyly 150</code> → <code>Abai dangyly 150, 12-пәтер</code>.</p>",
    "hints": [
     "<code>cin &gt;&gt; flat</code> leaves the <code>\\n</code> character at the end of the line.",
     "Put <code>cin.ignore();</code> between them."
    ]
   },
   {
    "title": "Initials of a name",
    "prompt": "<p>One line gives several words in Latin letters separated by a single space. Print the first letter of each word in capitals, with a dot after it. For example, <code>nursultan abishuly nazarov</code> → <code>N.A.N.</code></p>",
    "hints": [
     "The variable <code>bool start</code> should store \"the next character starts a new word\".",
     "When you see a space, set <code>start = true</code>; otherwise, if <code>start</code> is true, add the letter."
    ]
   },
   {
    "title": "Hide a phone number",
    "prompt": "<p>A phone number is given (no spaces, length at least 7). Keep the first 4 and the last 2 characters, and replace the rest with <code>*</code>. For example, <code>+77011234567</code> → <code>+770******67</code>.</p>",
    "hints": [
     "To count character positions, increase the variable <code>int i</code> at each step.",
     "You can also solve it with <code>substr</code>: the beginning, the asterisks, the end."
    ]
   }
  ]
 },
 "cp-4": {
  "pr": [
   {
    "title": "Even or odd",
    "prompt": "<p>An integer is given (it can be negative). If it is even, print <code>Жұп</code>; if it is odd, print <code>Тақ</code>.</p>",
    "hints": [
     "For a negative odd number <code>n % 2</code> is <code>-1</code>, so checking with <code>== 0</code> is reliable."
    ]
   },
   {
    "title": "Exam result",
    "prompt": "<p>An exam score (0–100) is given. If the score is 50 or higher, print <code>Өтті</code>, otherwise print <code>Өтпеді</code>.</p>",
    "hints": [
     "Pay attention to the boundary: 50 gives <code>Өтті</code>."
    ]
   },
   {
    "title": "Choose the cheaper one",
    "prompt": "<p>The prices of the same item in two shops are given. Print the lower price; if the prices are equal, print that price. Try the ternary operator <code>? :</code>.</p>",
    "hints": [
     "<code>(a &lt; b) ? a : b</code>"
    ]
   },
   {
    "title": "Leap year",
    "prompt": "<p>A year is given. If it is a leap year, print <code>Иә</code>, otherwise print <code>Жоқ</code>. The rule: the year is divisible by 4 and not divisible by 100, <b>or</b> it is divisible by 400.</p>",
    "hints": [
     "Combine <code>&amp;&amp;</code> and <code>||</code>, and do not forget the parentheses."
    ]
   },
   {
    "title": "Simple calculator",
    "prompt": "<p>One line gives <code>a op b</code>: <code>a</code> and <code>b</code> are integers, <code>op</code> is one of the symbols <code>+ - * /</code>. Print the result (<code>/</code> is integer division). If the divisor is zero or the operation is unknown, print <code>Қате</code>. Use <code>switch</code>.</p>",
    "hints": [
     "<code>cin &gt;&gt; a &gt;&gt; op &gt;&gt; b;</code> — because <code>op</code> is a char, one symbol is read.",
     "Put <code>break</code> at the end of every <code>case</code>."
    ]
   },
   {
    "title": "Five-point grade",
    "prompt": "<p>A test score is given. 90–100 → <code>5</code>, 75–89 → <code>4</code>, 50–74 → <code>3</code>, 0–49 → <code>2</code>. If the score is less than 0 or greater than 100, print <code>Қате</code>.</p>",
    "hints": [
     "First check that the score is valid, then go from top to bottom through the <code>else if</code> chain."
    ]
   },
   {
    "title": "Triangle type",
    "prompt": "<p>Three sides of a triangle (positive integers) are given. If such a triangle does not exist (the sum of any two sides must be strictly greater than the third), print <code>Үшбұрыш емес</code>; if all three sides are equal, print <code>Тең қабырғалы</code>; if only two are equal, print <code>Тең бүйірлі</code>; otherwise print <code>Әртүрлі қабырғалы</code>.</p>",
    "hints": [
     "First check whether a triangle exists: it is enough that one of the three conditions fails (<code>||</code>).",
     "Isosceles: <code>a == b || b == c || a == c</code>."
    ]
   },
   {
    "title": "Taxi fare",
    "prompt": "<p>Taxi fare: the distance <code>km</code> (integer), the tariff letter and the night flag (<code>1</code> — night, <code>0</code> — day) are given. Tariffs: <code>E</code> — 500 + 120·km, <code>C</code> — 800 + 180·km, <code>B</code> — 1500 + 300·km. At night the price is 20% higher (<code>баға * 12 / 10</code>, integer division). If the tariff is unknown, print <code>Қате</code>. Choose the tariff with <code>switch</code>. For example, <code>10 E 1</code> → <code>2040</code>.</p>",
    "hints": [
     "Inside the <code>switch</code> compute only the base price, and add the night surcharge after it.",
     "The <code>default</code> case catches an unknown tariff: make the variable <code>bool ok</code> false."
    ]
   }
  ]
 },
 "cp-5": {
  "pr": [
   {
    "title": "Multiplication table",
    "prompt": "<p>A number <code>n</code> is given. Print its multiplication table from 1 to 10: each line has the form <code>n x i = n·i</code>. For example, for <code>3</code> the first line is <code>3 x 1 = 3</code>, and the last is <code>3 x 10 = 30</code>.</p>",
    "hints": [
     "<code>for (int i = 1; i &lt;= 10; i++)</code>"
    ]
   },
   {
    "title": "Print even numbers",
    "prompt": "<p><code>n</code> is given (n ≥ 2). Print all even numbers from 2 to <code>n</code> on one line, separated by spaces. For example, <code>9</code> → <code>2 4 6 8</code>.</p>",
    "hints": [
     "Use step 2: <code>i += 2</code>.",
     "An extra space at the end of the line is not counted in the check."
    ]
   },
   {
    "title": "Count of positive values",
    "prompt": "<p>Daily temperatures (integers) are entered until the input ends. Print how many of them are strictly greater than 0.</p>",
    "hints": [
     "<code>while (cin &gt;&gt; x)</code> reads until the end of input."
    ]
   },
   {
    "title": "Number of digits",
    "prompt": "<p>A non-negative integer <code>n</code> is given (it fits into <code>long long</code>). Use a loop to count how many digits it has. <code>0</code> is one digit.</p>",
    "hints": [
     "A <code>while</code> loop will not run even once for <code>n = 0</code>.",
     "<code>do { ... } while (n &gt; 0);</code> runs at least once."
    ]
   },
   {
    "title": "Savings goal",
    "prompt": "<p>A deposit holds <code>s</code> tenge, and every year <code>p</code>% is added to it (interest is computed with integer division: <code>s += s * p / 100</code>). How many years are needed for the sum to reach at least <code>target</code>? For example, <code>100000 10 150000</code> → <code>5</code>. (s ≥ 1, p ≥ 1, all values fit into <code>long long</code>.)</p>",
    "hints": [
     "Run the <code>while</code> loop while the sum is less than the goal.",
     "If the sum is already enough at the start, the answer is 0."
    ]
   },
   {
    "title": "Prime check",
    "prompt": "<p>An integer <code>n</code> is given (1 ≤ n ≤ 10<sup>9</sup>). If the number is prime, print <code>YES</code>, otherwise print <code>NO</code>. 1 is not prime. Check the divisors while <code>i * i &lt;= n</code>, and use <code>break</code> when a divisor is found.</p>",
    "hints": [
     "If <code>n</code> has a divisor, then one of them does not exceed √n.",
     "<code>i * i</code> can be large — use <code>long long</code>."
    ]
   },
   {
    "title": "Number pyramid",
    "prompt": "<p><code>n</code> is given. Print a pyramid of <code>n</code> lines: in line <code>i</code> the numbers first grow from 1 to <code>i</code>, then decrease back to 1, separated by spaces. For example, <code>n = 3</code>:</p><pre>1\n1 2 1\n1 2 3 2 1</pre>",
    "hints": [
     "Each line uses two nested loops: the first goes from 1 to i, the second from i−1 down to 1."
    ]
   },
   {
    "title": "Longest warming streak",
    "prompt": "<p>Daily temperatures are entered until the input ends (at least one number is given). Print the length of the longest run of consecutive days in which each day is <b>strictly warmer</b> than the one before. For example, <code>1 3 5 2 4 6 8 1</code> → <code>4</code> (<code>2 4 6 8</code>).</p>",
    "hints": [
     "Keep the previous value in the variable <code>prev</code>.",
     "The current run length <code>cur</code> grows if the day is warmer, otherwise it drops to 1; write the largest value into <code>best</code>."
    ]
   }
  ]
 },
 "cp-6": {
  "pr": [
   {
    "title": "Cube function",
    "prompt": "<p>Write the function <code>long long cube(int x)</code>: it returns the cube of <code>x</code> (|x| ≤ 100 000, the result may not fit into <code>int</code>). <code>main</code> is already written.</p>",
    "hints": [
     "<code>x * x * x</code> is computed in int and overflows. First create <code>long long v = x;</code>."
    ]
   },
   {
    "title": "Default argument",
    "prompt": "<p>Write the function <code>void greet(string name, string greeting = \"Сәлем\")</code>: it prints <code>&lt;greeting&gt;, &lt;name&gt;!</code>. <code>main</code> is ready: it reads the name and the greeting word, and calls the function first with one argument and then with two. For example, <code>Ali Salem</code> → <code>Сәлем, Ali!</code> and <code>Salem, Ali!</code></p>",
    "hints": [
     "Inside the function you only need the line with <code>cout</code>."
    ],
    "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid greet(string name, string greeting = \"Сәлем\") {\n    // print\n}\n\nint main() {\n    string name, word;\n    cin >> name >> word;\n    greet(name);\n    greet(name, word);\n    return 0;\n}\n"
   },
   {
    "title": "Even check function",
    "prompt": "<p>Write the function <code>bool isEven(int n)</code>: if the number is even, it returns <code>true</code> (negative numbers are also possible). <code>main</code> is ready: it reads numbers until the input ends and prints how many of them are even.</p>",
    "hints": [
     "<code>return n % 2 == 0;</code> — the comparison itself already has type bool."
    ]
   },
   {
    "title": "Min and max by reference",
    "prompt": "<p>Write the function <code>void minMax(int a, int b, int c, int&amp; mn, int&amp; mx)</code>: it writes the smallest of three numbers into <code>mn</code> and the largest into <code>mx</code>. <code>main</code> is ready. For example, <code>5 -2 9</code> → <code>-2 9</code>.</p>",
    "hints": [
     "In the starter, <code>mn</code> and <code>mx</code> are passed as copies — add <code>&amp;</code>.",
     "First set <code>mn = a</code>, then compare with <code>b</code> and <code>c</code>."
    ]
   },
   {
    "title": "Overloaded area",
    "prompt": "<p>Write three functions with the same name <code>area</code>: <code>int area(int side)</code> — square, <code>int area(int w, int h)</code> — rectangle, <code>double area(double r)</code> — circle (π = 3.14159). <code>main</code> is ready: it reads the commands <code>S a</code>, <code>R w h</code>, <code>C r</code> and prints the area (for the circle, with 2 digits after the decimal point).</p>",
    "hints": [
     "The compiler chooses the right function by the number and types of arguments."
    ],
    "starter": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint area(int side) {\n    return 0;\n}\n\n// write two more area functions\nint area(int w, int h) {\n    return 0;\n}\n\ndouble area(double r) {\n    return 0;\n}\n\nint main() {\n    char t;\n    while (cin >> t) {\n        if (t == 'S') { int a; cin >> a; cout << area(a) << endl; }\n        else if (t == 'R') { int w, h; cin >> w >> h; cout << area(w, h) << endl; }\n        else { double r; cin >> r; cout << fixed << setprecision(2) << area(r) << endl; }\n    }\n    return 0;\n}\n"
   },
   {
    "title": "Count a character",
    "prompt": "<p>Write the function <code>int countChar(const string&amp; text, char c)</code>: it returns how many times the character <code>c</code> occurs in <code>text</code>. <code>main</code> is ready: the first line holds the character, the second line holds the text.</p>",
    "hints": [
     "Go through each character with <code>for (char x : text)</code> and compare it with <code>c</code>."
    ]
   },
   {
    "title": "Reversed number",
    "prompt": "<p>Write two functions: <code>int reverseNum(int n)</code> — returns the number formed by the digits of a non-negative number in reverse order (<code>1200</code> → <code>21</code>); <code>bool isPalindrome(int n)</code> — uses <code>reverseNum</code> to check whether the number is a palindrome. <code>main</code> is ready: for each number it prints the line <code>n кері YES/NO</code>.</p>",
    "hints": [
     "Loop: <code>r = r * 10 + n % 10; n /= 10;</code>",
     "A palindrome is a number equal to its reverse."
    ]
   },
   {
    "title": "Reduce a fraction",
    "prompt": "<p>Write two functions: <code>int gcd(int a, int b)</code> — the greatest common divisor of two positive numbers (Euclid's algorithm: while <code>b</code> is not zero, <code>(a, b) → (b, a % b)</code>); <code>void reduce(int&amp; num, int&amp; den)</code> — divides the numerator and the denominator of a fraction by their GCD. <code>main</code> is ready. For example, <code>12 18</code> → <code>2/3</code>.</p>",
    "hints": [
     "The parameters of <code>reduce</code> must be references, otherwise <code>main</code> will not see the changes.",
     "Euclid: <code>while (b != 0) { int t = a % b; a = b; b = t; }</code>"
    ]
   }
  ]
 },
 "cp-7": {
  "pr": [
   {
    "title": "Cheapest and most expensive",
    "prompt": "<p><code>n</code> is given, then the prices of <code>n</code> items. Print the smallest and the largest price separated by a space. For example, <code>4</code> / <code>500 120 990 300</code> → <code>120 990</code>.</p>",
    "hints": [
     "Take <code>a[0]</code> as the starting value, then compare all elements with it."
    ]
   },
   {
    "title": "Even elements",
    "prompt": "<p><code>n</code> is given, then <code>n</code> integers. Print the even elements in their original order on one line, separated by spaces. If there are no even numbers, print <code>NONE</code>.</p>",
    "hints": [
     "Collect the even numbers into a new vector with <code>push_back</code>.",
     "If the vector is empty, print <code>NONE</code>."
    ]
   },
   {
    "title": "Weekly rainfall",
    "prompt": "<p>The rainfall amounts (mm, integers) for the 7 days of the week are given. Print the weekly total on the first line, and the number of the day with the most rain on the second (1–7; if several days tie, the earliest one). You may use the C array <code>int a[7]</code>.</p>",
    "hints": [
     "Store the <b>index</b> of the largest value: <code>if (a[i] &gt; a[best]) best = i;</code>",
     "Day numbers start from 1: <code>best + 1</code>."
    ]
   },
   {
    "title": "Cyclic shift",
    "prompt": "<p><code>n</code> and <code>k</code> are given, then <code>n</code> numbers. Shift the array to the right cyclically by <code>k</code> steps and print the result (<code>k</code> can be greater than <code>n</code>). For example, <code>5 2</code> / <code>1 2 3 4 5</code> → <code>4 5 1 2 3</code>.</p>",
    "hints": [
     "The element with index <code>i</code> goes to position <code>(i + k) % n</code> in the new array."
    ]
   },
   {
    "title": "Table sums",
    "prompt": "<p><code>n m</code> are given, then an <code>n × m</code> table (students attending, by class × weekday). First print the sum of each row on a separate line, and at the end print the sum of each column on one line separated by spaces. Use <code>vector&lt;vector&lt;int&gt;&gt;</code>.</p>",
    "hints": [
     "Collect the column sums in <code>vector&lt;int&gt; col(m, 0)</code>."
    ],
    "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g(n, vector<int>(m));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) cin >> g[i][j];\n    // row and column sums\n    return 0;\n}\n"
   },
   {
    "title": "Repeated values",
    "prompt": "<p><code>n</code> is given, then <code>n</code> numbers from 0 to 100 (students' scores). Print, in ascending order on one line separated by spaces, the values that occur more than once. If there are none, print <code>NONE</code>. Hint: <code>vector&lt;int&gt; cnt(101, 0)</code> is a counter array.</p>",
    "hints": [
     "Read each value and do <code>cnt[x]++</code>.",
     "Then go through 0..100 and print the values where <code>cnt[v] &gt; 1</code>."
    ]
   },
   {
    "title": "Range sum",
    "prompt": "<p>Daily incomes for <code>n</code> days (in tenge) and <code>q</code> queries are given. For each query <code>l r</code> (numbering from 1, l ≤ r) print, on a separate line, the total income from day <code>l</code> to day <code>r</code>. n, q ≤ 100 000, so compute the prefix sums in advance (<code>long long</code>): <code>pre[i]</code> is the sum of the first <code>i</code> days.</p><p>Input: <code>n q</code>, then <code>n</code> numbers, then <code>q</code> lines.</p>",
    "hints": [
     "<code>pre[i] = pre[i - 1] + a[i]</code>, <code>pre[0] = 0</code>.",
     "The answer is <code>pre[r] - pre[l - 1]</code>."
    ]
   },
   {
    "title": "Rotate a matrix",
    "prompt": "<p><code>n</code> is given, then an <code>n × n</code> matrix. Rotate it 90° clockwise and print it (each row as numbers separated by spaces). For example:</p><pre>1 2      3 1\n3 4  →   4 2</pre>",
    "hints": [
     "Row <code>i</code> of the new matrix is column <code>i</code> of the old one, read from bottom to top.",
     "That is, <code>b[i][j] = a[n - 1 - j][i]</code>."
    ]
   }
  ]
 },
 "cp-8": {
  "pr": [
   {
    "title": "Doubling with a pointer",
    "prompt": "<p>Write the function <code>void doubleIt(int* p)</code>: it doubles the value that the pointer points to. <code>main</code> is ready: it reads a number, calls <code>doubleIt(&amp;x)</code> and prints <code>x</code>.</p>",
    "hints": [
     "<code>*p</code> is the value at the address itself: <code>*p *= 2;</code>"
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nvoid doubleIt(int* p) {\n    // change the value through *p\n}\n\nint main() {\n    int x;\n    cin >> x;\n    doubleIt(&x);\n    cout << x << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Swap with pointers",
    "prompt": "<p>Write the function <code>void swapPtr(int* a, int* b)</code>: it swaps the values that two pointers point to. <code>main</code> is ready. For example, <code>3 8</code> → <code>8 3</code>.</p>",
    "hints": [
     "The starter swaps only copies of the pointers; the values must be swapped through <code>*a</code> and <code>*b</code>."
    ]
   },
   {
    "title": "Sum of a dynamic array",
    "prompt": "<p><code>n</code> is given, then <code>n</code> integers. Create the array on the heap with <code>new int[n]</code>, read the numbers, print their sum, and free the memory with <code>delete[]</code>.</p>",
    "hints": [
     "<code>int* arr = new int[n];</code> — after that <code>arr[i]</code> works like an ordinary array.",
     "At the end, <code>delete[] arr;</code>"
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // create the array with new int[n]\n    cout << 0 << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Address of the smallest element",
    "prompt": "<p>Write the function <code>int* findMin(int* arr, int n)</code>: it returns a pointer to the smallest element of the array (if there are several, to the first one). <code>main</code> is ready: it prints the value and its index (<code>p - arr</code>).</p>",
    "hints": [
     "<code>int* best = arr;</code> — start from the first element.",
     "If a smaller element is found: <code>best = &amp;arr[i];</code>"
    ]
   },
   {
    "title": "Reverse an array in place",
    "prompt": "<p>Write the function <code>void reverseArr(int* a, int n)</code>: it reverses the elements in the same array without creating a new one (swap the first and the last, the second and the one before the last, and so on). <code>main</code> is ready.</p>",
    "hints": [
     "Go only up to the middle: <code>i &lt; n / 2</code>.",
     "Swap the elements <code>a[i]</code> and <code>a[n - 1 - i]</code>."
    ]
   },
   {
    "title": "Pointer to the longest word",
    "prompt": "<p>Write the function <code>const string* longest(const vector&lt;string&gt;&amp; v)</code>: it returns a pointer to the longest word (if there is a tie, to the first one), and <code>nullptr</code> if the vector is empty. <code>main</code> is ready: it prints the word and its length, or <code>EMPTY</code>.</p>",
    "hints": [
     "Start with <code>const string* best = nullptr;</code>.",
     "In the loop, <code>&amp;w</code> is the address of the word inside the vector (<code>w</code> must be a reference)."
    ]
   },
   {
    "title": "Self-growing array",
    "prompt": "<p>Numbers are entered until the input ends. Store them not in a <code>vector</code> but in your own array on the heap: at first the capacity is <code>cap = 2</code> (<code>new int[2]</code>); when the array is full, allocate a new one twice as large, copy the elements and free the old one with <code>delete[]</code>. At the end print <code>саны сыйымдылығы</code> on the first line, and the numbers in reverse order on the second line (if there are no numbers, the second line is empty).</p>",
    "hints": [
     "When <code>size == cap</code>: <code>new int[cap * 2]</code>, copy, <code>delete[] data</code>, <code>data = bigger</code>.",
     "The starter has an out-of-bounds access: in the browser it will not crash the program, but the answer will be wrong."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int cap = 2, size = 0;\n    int* data = new int[cap];\n    int x;\n    while (cin >> x) {\n        // if it is full — grow it\n        data[size] = x;\n        size++;\n    }\n    cout << size << \" \" << cap << endl;\n    delete[] data;\n    return 0;\n}\n"
   },
   {
    "title": "Transfer between wallets",
    "prompt": "<p>Given: <code>struct Wallet { string owner; long long balance; };</code>. Write the function <code>bool transfer(Wallet* from, Wallet* to, long long amount)</code>: if one of the pointers is <code>nullptr</code>, the amount is <code>amount ≤ 0</code>, or <code>from</code> does not have enough money, change nothing and return <code>false</code>; otherwise move the amount and return <code>true</code>. <code>main</code> is ready: the wallets are created with <code>unique_ptr</code>, then the commands <code>AB 500</code>, <code>BA 100</code>, <code>AX 50</code> are executed (X is a wallet that does not exist).</p>",
    "hints": [
     "Check <code>nullptr</code> first, otherwise <code>from-&gt;balance</code> would read an empty address.",
     "<code>p-&gt;balance</code> means the same as <code>(*p).balance</code>."
    ]
   }
  ]
 },
 "cp-9": {
  "pr": [
   {
    "title": "Rectangle class",
    "prompt": "<p>Complete the class <code>Rect</code>: the fields <code>w</code> and <code>h</code> are <code>private</code>; a constructor <code>Rect(int w, int h)</code> with an initializer list; methods <code>int area() const</code> and <code>int perimeter() const</code>. <code>main</code> is ready: it prints the area and the perimeter.</p>",
    "hints": [
     "Initializer list: <code>: w(w), h(h)</code> — field(parameter)."
    ]
   },
   {
    "title": "Warehouse value",
    "prompt": "<p><code>n</code> items are given: each line has <code>атауы бағасы саны</code>. Create the <code>Product</code> struct, read the items into a <code>vector&lt;Product&gt;</code>, and print the total value of all items in the warehouse (the sum of price × quantity, <code>long long</code>).</p>",
    "hints": [
     "Read the fields with a dot: <code>cin &gt;&gt; items[i].name &gt;&gt; items[i].price</code> ..."
    ]
   },
   {
    "title": "Lesson length",
    "prompt": "<p>Add the method <code>int minutes() const</code> to the struct <code>struct Time { int h, m; }</code>: it returns the number of minutes since the start of the day (<code>h * 60 + m</code>). <code>main</code> is ready: it reads the start and end times of a lesson in the format <code>HH:MM</code> and prints the duration in minutes. For example, <code>08:30 10:05</code> → <code>95</code>.</p>",
    "hints": [
     "Inside the method you can access the fields directly: <code>return h * 60 + m;</code>"
    ]
   },
   {
    "title": "Visitor counter",
    "prompt": "<p>Write the class <code>Counter</code>, which counts visitors to a museum: the field <code>count</code> is <code>private</code> (the constructor sets it to 0), <code>inc()</code> — increases it by 1, <code>dec()</code> — decreases it by 1 but not below 0, <code>reset()</code> — sets it to zero, <code>int get() const</code>. <code>main</code> is ready: it reads the commands until the input ends.</p>",
    "hints": [
     "In <code>dec</code>, first check that <code>count &gt; 0</code>."
    ]
   },
   {
    "title": "Entering and leaving a room",
    "prompt": "<p>In the struct <code>Room</code> write a constructor and a destructor: the constructor prints <code>&lt;аты&gt; кірді</code>, the destructor prints <code>&lt;аты&gt; шықты</code>. <code>main</code> is ready: it reads three names and creates the objects in different scopes. The order of the output is decided by the rules for destructors.</p>",
    "hints": [
     "The destructor is <code>~Room() { ... }</code>.",
     "When leaving the inner block <code>{ }</code>, the object <code>b</code> is destroyed at once; <code>a</code> and <code>c</code> are destroyed at the end of <code>main</code>, in reverse order."
    ]
   },
   {
    "title": "Thermometer class",
    "prompt": "<p>Write the class <code>Thermo</code> for a weather station: <code>add(int t)</code> adds a measurement, <code>int minT() const</code>, <code>int maxT() const</code>, <code>double avg() const</code>. Keep the data in a <code>private</code> <code>vector&lt;int&gt;</code>. <code>main</code> is ready: it reads <code>n ≥ 1</code> measurements and prints <code>min max орташа</code> (the average with one digit after the decimal point).</p>",
    "hints": [
     "In <code>add</code> use <code>data.push_back(t)</code>.",
     "For the average, convert the sum to <code>double</code> and divide by <code>data.size()</code>."
    ]
   },
   {
    "title": "Library class",
    "prompt": "<p>Write <code>struct Book { string title; bool taken; };</code> and the class <code>Library</code> (stored in <code>private vector&lt;Book&gt;</code>): <code>add(title)</code> — adds a new free book; <code>bool take(title)</code> — if there is a free book with this title, takes the first one and returns <code>true</code>, otherwise returns <code>false</code>; <code>bool giveBack(title)</code> — returns one taken book with this title and <code>true</code>; if there is none, returns <code>false</code>; <code>int available() const</code> — the number of free books. <code>main</code> is ready: it handles the commands <code>add X</code>, <code>take X</code>, <code>return X</code>, <code>count</code>.</p>",
    "hints": [
     "To change a book, take a reference in the loop: <code>for (Book&amp; b : books)</code>.",
     "As soon as you find it, return <code>return true;</code> at once, do not touch the next copies."
    ]
   },
   {
    "title": "Circular queue",
    "prompt": "<p>Write the class <code>Queue</code> — an electronic queue for a clinic with a fixed capacity. The constructor <code>Queue(int cap)</code> allocates <code>new int[cap]</code> on the heap, the destructor frees the memory with <code>delete[]</code>. <code>bool push(int x)</code> — if the queue is full, returns <code>false</code>; <code>bool pop(int&amp; x)</code> — if the queue is empty, returns <code>false</code>, otherwise writes the first element into <code>x</code> and removes it; <code>int size() const</code>. The places are reused in a circle: keep the fields <code>head</code> and <code>count</code>; the next free place is <code>(head + count) % cap</code>. <code>main</code> is ready.</p>",
    "hints": [
     "<code>push</code>: place <code>(head + count) % cap</code>, then <code>count++</code>.",
     "<code>pop</code>: <code>x = data[head]</code>, <code>head = (head + 1) % cap</code>, <code>count--</code>. Do not forget the destructor."
    ]
   }
  ]
 },
 "cp-10": {
  "pr": [
   {
    "title": "Equal fractions",
    "prompt": "<p>Write <code>operator==</code> for <code>struct Fraction { long long num, den; };</code> (the denominator is positive): the fractions <code>1/2</code> and <code>2/4</code> are considered equal. Hint: <code>a/b == c/d</code> ⇔ <code>a·d == c·b</code>. <code>main</code> is ready: it prints <code>YES</code> or <code>NO</code>.</p>",
    "hints": [
     "Cross-multiply: <code>a.num * b.den == b.num * a.den</code>."
    ]
   },
   {
    "title": "Swap template",
    "prompt": "<p>Write the function template <code>template &lt;typename T&gt; void mySwap(T&amp; a, T&amp; b)</code>, which swaps the values of two variables of any type. <code>main</code> is ready: it swaps two numbers and two words and prints them.</p>",
    "hints": [
     "The temporary variable is also of type <code>T</code>: <code>T t = a;</code>"
    ]
   },
   {
    "title": "Printing a point",
    "prompt": "<p>Write <code>ostream&amp; operator&lt;&lt;(ostream&amp; os, const Point&amp; p)</code> for <code>struct Point { int x, y; };</code>: the point is printed as <code>[x; y]</code>. <code>main</code> is ready: it reads points until the input ends and prints each one on a separate line.</p>",
    "hints": [
     "Write to <code>os</code> instead of <code>cout</code>, and at the end <code>return os;</code>"
    ]
   },
   {
    "title": "Adding fractions",
    "prompt": "<p>Write <code>operator+</code> and <code>operator&lt;&lt;</code> for <code>Fraction</code> (positive fractions). The sum must be reduced (use the ready <code>gcd</code> function), and the output has the form <code>num/den</code>. For example, <code>1 6 1 3</code> → <code>1/2</code>.</p>",
    "hints": [
     "<code>a/b + c/d = (a·d + c·b) / (b·d)</code>.",
     "Divide the numerator and the denominator by <code>gcd</code>."
    ]
   },
   {
    "title": "MinMax class template",
    "prompt": "<p>Write the class template <code>template &lt;typename T&gt; class MinMax</code>: <code>add(T x)</code> accepts a value, <code>getMin()</code> and <code>getMax()</code> return the smallest and the largest value so far (use only the <code>&lt;</code> operator). Do not store all the values, only the current min and max. <code>main</code> is ready: it reads <code>n</code> numbers and <code>m</code> words (n, m ≥ 1).</p>",
    "hints": [
     "For the first value, assign <code>mn</code> and <code>mx</code> (use the flag <code>empty</code>).",
     "The check for a larger value also uses <code>&lt;</code>: <code>if (mx &lt; x) mx = x;</code>"
    ]
   },
   {
    "title": "Sort products by price",
    "prompt": "<p>For <code>Product</code> (<code>name</code>, <code>price</code>) write two operators: <code>operator&lt;</code> — first by increasing price, and for equal prices by the alphabetical order of the name; <code>operator&lt;&lt;</code> — printing in the form <code>атауы: баға тг</code>. <code>main</code> is ready: <code>sort</code> uses your <code>operator&lt;</code>.</p>",
    "hints": [
     "<code>if (a.price != b.price) return a.price &lt; b.price;</code>, then compare the names."
    ]
   },
   {
    "title": "2×2 matrix operations",
    "prompt": "<p><code>struct Mat { long long a, b, c, d; };</code> describes a 2×2 matrix: <code>[[a, b], [c, d]]</code>. Write three operators: <code>operator+</code> (element by element), <code>operator*</code> (matrix multiplication: row × column) and <code>operator&lt;&lt;</code> — printing in the form <code>[a b; c d]</code>. <code>main</code> is ready: it reads two matrices and prints their sum and product.</p>",
    "hints": [
     "The top-left element of the product: <code>x.a * y.a + x.b * y.c</code>.",
     "The top-right: <code>x.a * y.b + x.b * y.d</code>; the bottom ones are similar, using the rows <code>c</code> and <code>d</code>."
    ]
   },
   {
    "title": "Generic sum",
    "prompt": "<p>Write two function templates: <code>template &lt;typename T&gt; T sumAll(const vector&lt;T&gt;&amp; v)</code> — the sum of all elements with <code>+</code> (the vector is not empty; for strings this will be concatenation), and <code>template &lt;typename T&gt; int countGreater(const vector&lt;T&gt;&amp; v, T x)</code> — the number of elements strictly greater than <code>x</code>. <code>main</code> is ready: it calls them for vectors of <code>int</code>, <code>double</code> and <code>string</code>.</p>",
    "hints": [
     "<code>T s = 0</code> does not work for strings — start with <code>T s = v[0];</code> and add from the second element.",
     "<code>x &lt; e</code> means \"<code>e</code> is greater\"."
    ]
   }
  ]
 },
 "cp-11": {
  "pr": [
   {
    "title": "Animal sounds",
    "prompt": "<p>In the farm program all animals \"speak\" <code>...</code>, because <code>Animal::sound</code> is not virtual. Fix the classes: <code>virtual</code> in the base class, <code>override</code> in the derived classes. <code>main</code> is ready: it reads the words <code>dog</code>, <code>cat</code>, <code>cow</code> and prints the sound of each animal (<code>Hav</code>, <code>Miau</code>, <code>Mo</code>).</p>",
    "hints": [
     "<code>virtual string sound() const { ... }</code>",
     "In a derived class: <code>string sound() const override { ... }</code>"
    ]
   },
   {
    "title": "Wheels by type",
    "prompt": "<p>The abstract class <code>Vehicle</code> has <code>virtual int wheels() const = 0</code>. Write three derived classes: <code>Car</code> (4 wheels), <code>Bike</code> (2), <code>Truck</code> (6). <code>main</code> is ready: it reads the words <code>car</code>/<code>bike</code>/<code>truck</code> until the input ends and prints the total number of wheels.</p>",
    "hints": [
     "In each derived class, the method <code>wheels()</code> returns its own number."
    ]
   },
   {
    "title": "Roles at school",
    "prompt": "<p>The method <code>describe()</code> of the class <code>Person</code> prints <code>аты - рөлі</code>, and the role is returned by <code>role()</code>. Right now <code>адам</code> is printed for <code>Student</code> and <code>Teacher</code> as well. Make the method <code>role()</code> virtual. <code>main</code> is ready: it reads the lines <code>S аты</code>, <code>T аты</code>, <code>P аты</code>.</p>",
    "hints": [
     "Even if the call comes from a method of the base class, a <code>virtual</code> method uses the version for the real type of the object."
    ]
   },
   {
    "title": "Monthly salary",
    "prompt": "<p>The abstract class <code>Employee</code> is given (<code>pay()</code> is pure virtual). Write three derived classes: <code>FullTime(name, salary)</code> — the salary is <code>salary</code>; <code>Hourly(name, rate, hours)</code> — <code>rate · hours</code>, and each hour above 160 is paid 1.5 times more (<code>rate * 3 / 2</code>, integer); <code>Intern(name)</code> — a fixed 85000. <code>main</code> is ready: it prints the salary of each employee and the total.</p><p>Input lines: <code>F аты айлық</code>, <code>H аты мөлшерлеме сағат</code>, <code>I аты</code>.</p>",
    "hints": [
     "The overtime bonus: <code>(hours - 160) * (rate * 3 / 2)</code>.",
     "Fill in the body of <code>pay()</code> for <code>FullTime</code> and <code>Intern</code>."
    ]
   },
   {
    "title": "Largest perimeter",
    "prompt": "<p>The abstract class <code>Shape</code> has two pure virtual methods: <code>perimeter()</code> and <code>name()</code>. Write three classes: <code>Square(a)</code> (name <code>Шаршы</code>), <code>Rect(w, h)</code> (<code>Тіктөртбұрыш</code>), <code>Triangle(a, b, c)</code> (<code>Үшбұрыш</code>). <code>main</code> is ready: it prints the name and the perimeter of the shape with the largest perimeter (if there is a tie, the first one).</p>",
    "hints": [
     "In each class, a constructor with its own fields and an initializer list."
    ],
    "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual int perimeter() const = 0;\n    virtual string name() const = 0;\n    virtual ~Shape() {}\n};\n\nclass Square : public Shape {\n    int a;\npublic:\n    Square(int a) : a(a) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"Шаршы\"; }\n};\n\n// write the Rect and Triangle classes\nclass Rect : public Shape {\npublic:\n    Rect(int w, int h) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"\"; }\n};\n\nclass Triangle : public Shape {\npublic:\n    Triangle(int a, int b, int c) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"\"; }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<unique_ptr<Shape>> v;\n    for (int i = 0; i < n; i++) {\n        char t;\n        cin >> t;\n        if (t == 'S') { int a; cin >> a; v.push_back(make_unique<Square>(a)); }\n        else if (t == 'R') { int w, h; cin >> w >> h; v.push_back(make_unique<Rect>(w, h)); }\n        else { int a, b, c; cin >> a >> b >> c; v.push_back(make_unique<Triangle>(a, b, c)); }\n    }\n    const Shape* best = v[0].get();\n    for (const auto& s : v)\n        if (s->perimeter() > best->perimeter()) best = s.get();\n    cout << best->name() << \" \" << best->perimeter() << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Credit account",
    "prompt": "<p>The class <code>Account</code> is given: <code>withdraw</code> refuses if there is not enough money. Write the class <code>CreditAccount(balance, limit)</code>, inheriting from <code>Account</code>: it overrides <code>withdraw</code> and allows the balance to drop down to <code>-limit</code> (below that it refuses). Use the field <code>balance</code> with the <code>protected</code> access level. <code>main</code> is ready: the account type (<code>A бастапқы</code> or <code>C бастапқы лимит</code>), then <code>q</code> withdrawal requests; it prints the final balance and the number of refused requests.</p>",
    "hints": [
     "In <code>bool withdraw(long long x) override</code>: if <code>balance - x &lt; -limit</code>, return <code>false</code>."
    ]
   },
   {
    "title": "Notification channels",
    "prompt": "<p>Write the abstract class <code>Notifier</code> (<code>virtual void send(const string&amp; msg) const = 0</code>) and three derived classes:</p><ul><li><code>SmsNotifier</code>: <code>SMS: </code> + the first 10 characters of the message (if the message is shorter, the whole message);</li><li><code>EmailNotifier</code>: <code>EMAIL: </code> + the whole message;</li><li><code>PushNotifier</code>: <code>PUSH: </code> + the message converted to capital letters.</li></ul><p><code>main</code> is ready: it reads <code>n</code>, then on each line the type (<code>sms</code>/<code>email</code>/<code>push</code>) and the message (in Latin letters, with spaces).</p>",
    "hints": [
     "<code>msg.substr(0, 10)</code> works correctly even if the string is shorter.",
     "For capital letters: make a copy and use <code>for (char&amp; c : up) c = toupper(c);</code>"
    ]
   },
   {
    "title": "Cheapest transport",
    "prompt": "<p>Fares in the city: <code>Bus</code> — up to 15 km 200 tg, longer 400 tg (a transfer); <code>Metro</code> — up to 10 km 150 tg, a longer trip by metro is not possible (take the price as 1000000); <code>Taxi</code> — 120·km tg. Write the abstract class <code>Transport</code> (<code>cost</code>, <code>name</code>), three classes based on it, and the function <code>const Transport* cheapest(const vector&lt;unique_ptr&lt;Transport&gt;&gt;&amp; v, int km)</code> (if there is a tie, the one that comes first in the list). The names: <code>Bus</code>, <code>Metro</code>, <code>Taxi</code>. <code>main</code> is ready: for each distance it prints the line <code>km атауы бағасы</code>.</p>",
    "hints": [
     "In <code>cost</code> you can use the ternary operator: <code>km &lt;= 15 ? 200 : 400</code>.",
     "<code>cheapest</code>: start with <code>v[0].get()</code> and look for one that is strictly cheaper."
    ]
   }
  ]
 },
 "cp-12": {
  "pr": [
   {
    "title": "Unique numbers",
    "prompt": "<p>Numbers are entered until the input ends. Print each distinct value once, in ascending order, on one line separated by spaces. Use <code>set</code>.</p>",
    "hints": [
     "<code>s.insert(x)</code> removes duplicates by itself, and iterating over a <code>set</code> goes in ascending order."
    ]
   },
   {
    "title": "Sort in descending order",
    "prompt": "<p><code>n</code> is given, then <code>n</code> numbers (competition scores). Print them in descending order. Use <code>sort</code> and <code>greater&lt;int&gt;()</code>.</p>",
    "hints": [
     "<code>sort(v.begin(), v.end(), greater&lt;int&gt;());</code>"
    ]
   },
   {
    "title": "How many times a number occurs",
    "prompt": "<p><code>n</code> is given, then <code>n</code> numbers, and at the end the number to search for, <code>x</code>. Find how many times <code>x</code> occurs, using the <code>count</code> algorithm.</p>",
    "hints": [
     "<code>count(v.begin(), v.end(), x)</code>"
    ]
   },
   {
    "title": "Most frequent word",
    "prompt": "<p>Words of a text (lowercase Latin letters) are entered until the input ends. Print the most frequent word and the number of its occurrences. If there are several, print the one that comes first alphabetically. Use <code>map&lt;string, int&gt;</code>.</p>",
    "hints": [
     "The keys of a <code>map</code> are sorted: if you replace the value only when it is <b>strictly</b> larger, a tie keeps the first word in alphabetical order."
    ]
   },
   {
    "title": "Anagram check",
    "prompt": "<p>Two words of lowercase Latin letters are given. If the letters of one can be rearranged into the other (an anagram), print <code>YES</code>, otherwise <code>NO</code>. Hint: sort both strings with <code>sort</code> and compare them.</p>",
    "hints": [
     "A <code>string</code> is a container too: <code>sort(a.begin(), a.end())</code> sorts its letters."
    ]
   },
   {
    "title": "Participants by city",
    "prompt": "<p><code>n</code> is given, then each line holds <code>қала аты</code> (the Olympiad participants). Print the cities in alphabetical order, and the participants of each city also in alphabetical order: <code>қала: аты1 аты2 ...</code>. Use <code>map&lt;string, vector&lt;string&gt;&gt;</code>.</p>",
    "hints": [
     "The <code>map</code> sorts the cities by itself, and inside each vector sort the names with <code>sort</code>."
    ]
   },
   {
    "title": "Common values of two lists",
    "prompt": "<p>The student IDs of two classes are given: <code>n</code> and <code>n</code> numbers, then <code>m</code> and <code>m</code> numbers. Print the IDs that are in both lists (without repeats) in ascending order; if there are none, print <code>NONE</code>. Hint: put the first list into a <code>set</code> and check the second one with <code>count</code>.</p>",
    "hints": [
     "<code>a.count(x)</code> is 1 if the element is there and 0 if not.",
     "If you also collect the result in a <code>set</code>, repeats and order are handled automatically."
    ]
   },
   {
    "title": "Top three teams",
    "prompt": "<p>Sports day: <code>n</code> is given, then each line holds <code>спортшы команда ұпай</code>. Compute the total points of each team and print up to 3 teams with the most points in the form <code>команда ұпай</code>: in descending order of points, and for equal points by the alphabetical order of the name. Use <code>map</code>, <code>vector&lt;pair&lt;string, int&gt;&gt;</code> and <code>sort</code> with a lambda.</p>",
    "hints": [
     "<code>vector&lt;pair&lt;string, int&gt;&gt; v(total.begin(), total.end());</code> copies the map into a vector.",
     "Lambda: first by descending <code>second</code>, and for equal values by ascending <code>first</code>."
    ]
   }
  ]
 },
 "cp-13": {
  "pr": [
   {
    "title": "Recursive factorial",
    "prompt": "<p>Write the recursive function <code>long long factorial(int n)</code> (0 ≤ n ≤ 20, <code>0! = 1</code>). Do not use a loop. <code>main</code> is ready.</p>",
    "hints": [
     "Base case: when <code>n &lt;= 1</code>, return 1.",
     "Recursive step: <code>n * factorial(n - 1)</code>."
    ]
   },
   {
    "title": "Power by recursion",
    "prompt": "<p>Write the recursive function <code>long long power(long long a, int n)</code>: <code>a<sup>n</sup></code> (n ≥ 0, the result fits into <code>long long</code>). <code>power(a, 0) = 1</code>, <code>power(a, n) = a · power(a, n − 1)</code>. <code>main</code> is ready.</p>",
    "hints": [
     "The base case is <code>n == 0</code>."
    ]
   },
   {
    "title": "Reverse a string by recursion",
    "prompt": "<p>Write the recursive function <code>string reverseStr(const string&amp; s)</code>: an empty string returns itself, otherwise <code>reverseStr(s.substr(1)) + s[0]</code>. Do not use a loop. <code>main</code> is ready: it reads one word in Latin letters.</p>",
    "hints": [
     "<code>s.empty()</code> is the base case."
    ]
   },
   {
    "title": "Fibonacci with memoization",
    "prompt": "<p><code>n</code> is given (0 ≤ n ≤ 90). <code>F(0) = 0</code>, <code>F(1) = 1</code>, <code>F(n) = F(n−1) + F(n−2)</code>. Speed up the recursion with a <code>vector&lt;long long&gt; memo</code> that stores the values already computed: otherwise the program will never finish for <code>n = 90</code>.</p>",
    "hints": [
     "<code>vector&lt;long long&gt; memo(91, -1);</code> — <code>-1</code> means \"not computed yet\".",
     "Before computing, check whether <code>memo[n]</code> is filled."
    ],
    "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<long long> memo(91, -1);\n\nlong long fib(int n) {\n    if (n < 2) return n;\n    // check memo and store the result of fib(n - 1) + fib(n - 2)\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Division without exceptions",
    "prompt": "<p>The browser compiler does not support exceptions, so we report errors with a <code>bool</code>. Write <code>bool safeDivide(int a, int b, int&amp; result)</code>: if <code>b == 0</code>, return <code>false</code>; otherwise write <code>result = a / b</code> (integer division) and return <code>true</code>. <code>main</code> is ready: it reads pairs of numbers until the input ends and prints the result, or <code>Қате: нөлге бөлу</code>.</p>",
    "hints": [
     "The result is returned through a reference, and success through <code>return</code>."
    ]
   },
   {
    "title": "Tower of Hanoi",
    "prompt": "<p><code>n</code> discs must be moved from peg 1 to peg 3 (a large disc is never placed on a smaller one). On the first line print the number of moves, then each move in the form <code>a -&gt; b</code>. Recursion: move <code>n−1</code> discs to the auxiliary peg, the largest one to the target, then <code>n−1</code> discs on top of it. 1 ≤ n ≤ 10.</p>",
    "hints": [
     "Base case: <code>n == 0</code> — do nothing.",
     "<code>hanoi(n - 1, from, via, to); жүріс; hanoi(n - 1, via, to, from);</code>"
    ]
   },
   {
    "title": "All permutations",
    "prompt": "<p>A word of distinct lowercase Latin letters is given (length 1–7). Print all its permutations in lexicographic order, one per line. Backtracking: first sort the letters, then at each step add a letter that has not been used yet (<code>vector&lt;bool&gt; used</code>).</p>",
    "hints": [
     "If the letters are sorted, choosing from left to right gives lexicographic order.",
     "When returning from the recursion, undo the choice: <code>cur.pop_back(); used[i] = false;</code>"
    ]
   },
   {
    "title": "Subsets with a given sum",
    "prompt": "<p><code>n</code> and <code>target</code> are given, then <code>n</code> positive integers (coin denominations, n ≤ 20). Print the number of subsets whose elements sum exactly to <code>target</code> (each element is either taken or not; equal values count as different elements). Recursion: <code>count(i, rest)</code> — the number of ways to collect the remaining sum, starting from element <code>i</code>.</p>",
    "hints": [
     "Two branches: <code>a[i]</code> is taken (<code>rest - a[i]</code>) or not taken.",
     "All numbers are positive, so when <code>rest == 0</code> you can return 1 at once."
    ]
   }
  ]
 },
 "cp-p1": {
  "pr": [
   {
    "title": "Most frequent letter",
    "prompt": "<p>A word of lowercase Latin letters is given. Print the most frequent letter and the number of its occurrences; if there is a tie, the letter that comes first alphabetically. Hint: <code>vector&lt;int&gt; cnt(26)</code>, index <code>c - 'a'</code>.</p>",
    "hints": [
     "<code>cnt[c - 'a']++</code> — a counter for each letter.",
     "To turn an index back into a letter: <code>char('a' + i)</code>."
    ]
   },
   {
    "title": "Difference of even and odd",
    "prompt": "<p><code>n</code> is given, then <code>n</code> integers. Print the sum of the even numbers minus the sum of the odd numbers. For example, <code>1 2 3 4</code> → <code>(2 + 4) − (1 + 3) = 2</code>.</p>",
    "hints": [
     "Check oddness with <code>x % 2 != 0</code>: for negative odd numbers the remainder is <code>-1</code>."
    ]
   },
   {
    "title": "Number of words in a sentence",
    "prompt": "<p>A line of text is given: words are separated by one or several spaces, and there may be spaces at the start and at the end too. Print the number of words. Hint: if the character is not a space and the previous character is a space (or the start of the line), a new word has begun.</p>",
    "hints": [
     "If you start with <code>char prev = ' ';</code>, the start of the line also counts as \"after a space\"."
    ]
   },
   {
    "title": "The unpaired number",
    "prompt": "<p><code>n</code> (odd) is given, then <code>n</code> numbers: every number except one occurs exactly twice. Print the number that occurs once. You need O(n) time and O(1) extra memory: use XOR <code>^</code> — <code>x ^ x = 0</code>, <code>x ^ 0 = x</code>.</p>",
    "hints": [
     "If you XOR all the numbers, the pairs cancel each other out."
    ]
   },
   {
    "title": "Maximum subarray sum",
    "prompt": "<p><code>n</code> is given, then <code>n</code> integers (daily profit or loss). Print the largest sum of a non-empty contiguous part of the sequence. Kadane's algorithm: <code>cur = max(x, cur + x)</code>, <code>best = max(best, cur)</code>. For example, <code>-2 1 -3 4 -1 2 1 -5 4</code> → <code>6</code>.</p>",
    "hints": [
     "Start <code>cur</code> and <code>best</code> with the first element — then the answer is correct even if all numbers are negative."
    ]
   },
   {
    "title": "Rearrange into a palindrome",
    "prompt": "<p>A word of lowercase Latin letters is given. Can its letters be rearranged to form a palindrome? If yes, print <code>YES</code>, otherwise <code>NO</code>. Rule: at most one letter may occur an odd number of times.</p>",
    "hints": [
     "Count each letter and count the odd counters."
    ]
   },
   {
    "title": "Merge intervals",
    "prompt": "<p>Bookings of a meeting hall: <code>n</code> is given, then <code>n</code> intervals <code>l r</code> (l ≤ r). Merge the intervals that overlap or touch (<code>[1,3]</code> and <code>[3,5]</code>) and print the result in ascending order of the start, in the form <code>l r</code>. First <code>sort</code>, then one pass.</p>",
    "hints": [
     "A <code>pair</code> vector sorted by <code>sort</code> is ordered by <code>first</code> first.",
     "If the next interval overlaps the last one (<code>p.first &lt;= res.back().second</code>), extend the end with <code>max</code>."
    ]
   },
   {
    "title": "Top-k frequent values",
    "prompt": "<p><code>n</code> and <code>k</code> are given, then <code>n</code> numbers (codes of sold goods). Print the <code>k</code> most frequent codes in the form <code>код саны</code>: in descending order of the count, and for equal counts in ascending order of the code. It is guaranteed that there will be at least <code>k</code> different codes.</p>",
    "hints": [
     "Copy the counters into a <code>vector&lt;pair&lt;int, int&gt;&gt;</code> and sort it with a lambda."
    ]
   }
  ]
 },
 "cp-p2": {
  "pr": [
   {
    "title": "Best day to sell a stock",
    "prompt": "<p><code>n</code> is given, then the stock prices for <code>n</code> days. Print the largest profit that can be made by buying on one day and selling on one of the later days; if there is no profit, print <code>0</code>. In one pass: keep the lowest price so far.</p>",
    "hints": [
     "<code>low</code> is the lowest price up to today; each day check the profit <code>x - low</code>."
    ]
   },
   {
    "title": "Move zeros to the end",
    "prompt": "<p><code>n</code> is given, then <code>n</code> numbers. Move all <code>0</code> to the end of the array, keeping the order of the other elements. Do it without an extra array: write the non-zero elements at the position <code>pos</code>, and at the end fill the tail with zeros.</p>",
    "hints": [
     "<code>if (a[i] != 0) a[pos++] = a[i];</code>",
     "At the end, write zeros from <code>pos</code> to <code>n</code>."
    ]
   },
   {
    "title": "Merge sorted lists",
    "prompt": "<p>Two lists sorted in ascending order are given: <code>n</code> and <code>n</code> numbers, then <code>m</code> and <code>m</code> numbers. Print them merged into one sorted list. Solve it in O(n + m) with two pointers.</p>",
    "hints": [
     "At each step print the smaller of <code>a[i]</code> and <code>b[j]</code>, and move the corresponding pointer.",
     "When one list is finished, print the rest of the other."
    ]
   },
   {
    "title": "Ways to climb stairs",
    "prompt": "<p>A staircase has <code>n</code> steps (1 ≤ n ≤ 85). In one move you can go up 1 or 2 steps. In how many ways can you reach the top? <code>dp[i] = dp[i−1] + dp[i−2]</code>, use <code>long long</code>. For example, <code>n = 4</code> → <code>5</code>.</p>",
    "hints": [
     "<code>dp[0] = 1</code> (doing nothing is one way), <code>dp[1] = 1</code>."
    ]
   },
   {
    "title": "Number of islands",
    "prompt": "<p>A map: <code>n m</code> and <code>n</code> lines, <code>#</code> is land, <code>.</code> is water. Land cells connected vertically or horizontally form one island. Print the number of islands. From each new land cell start a BFS (<code>vector&lt;pair&lt;int,int&gt;&gt;</code> as a queue) or a DFS and mark the whole island.</p>",
    "hints": [
     "If you replace the visited land with <code>.</code>, you will not count it again.",
     "Do not forget the boundary check: <code>nr &gt;= 0 &amp;&amp; nr &lt; n</code> ..."
    ]
   },
   {
    "title": "Integer square root",
    "prompt": "<p>A non-negative integer <code>n</code> is given (n ≤ 10<sup>18</sup>). Find the largest integer <code>x</code> for which <code>x·x ≤ n</code>, using binary search (do not use <code>sqrt</code>: on large numbers its precision is not enough). The search range is <code>[0, 10<sup>9</sup>]</code>.</p>",
    "hints": [
     "If the condition \"<code>mid * mid &lt;= n</code>\" is true, the answer is <code>mid</code> or larger: <code>lo = mid</code>.",
     "To avoid an infinite loop, round the middle up: <code>(lo + hi + 1) / 2</code>."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    long long lo = 0, hi = 1000000000;\n    // binary search\n    cout << lo << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Longest common subsequence",
    "prompt": "<p>Two words of lowercase Latin letters are given (length ≤ 1000). Print the length of the longest common subsequence (the letters keep their order, but some of them may be skipped). DP: <code>dp[i][j]</code> is the answer for the <code>i</code>-th letter of the first word and the <code>j</code>-th letter of the second. For example, <code>abcde ace</code> → <code>3</code>.</p>",
    "hints": [
     "If the letters are equal: <code>dp[i][j] = dp[i-1][j-1] + 1</code>.",
     "Otherwise: <code>max(dp[i-1][j], dp[i][j-1])</code>."
    ]
   },
   {
    "title": "Knapsack problem",
    "prompt": "<p>You can take a load of up to <code>W</code> kg on a trip. <code>n</code> items are given, each with a weight <code>w</code> and a value <code>v</code>. Each item can be taken at most once. Print the largest total value that can be carried without exceeding the weight limit. Input: <code>n W</code>, then <code>n</code> lines <code>w v</code> (n ≤ 100, W ≤ 10 000). DP: <code>dp[c]</code> is the largest value with capacity <code>c</code>; for each item update <code>c</code> in <b>decreasing</b> order.</p>",
    "hints": [
     "The starter updates <code>c</code> in increasing order, so one item could be taken several times.",
     "<code>for (int c = W; c &gt;= w; c--)</code>"
    ]
   }
  ]
 }
} });
