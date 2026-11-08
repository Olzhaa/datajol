// JV1 Java: English text. Code, solutions and expected output are in content/java.js.
(function () {
  const P = String.raw;
  DJ.i18n.patch({
    modules: {
      'java-1': { intro: 'Java fundamentals: main and println, types, String and StringBuilder, conditions and loops, methods, arrays, classes and objects, inheritance and interfaces, collections, exceptions, generics, lambdas and streams, recursion. In every lesson you write a complete Java program yourself and check it with tests, and at the end there are two problem sets and an exam.' }
    },
    lessons: {
      'jv-1': {
        title: 'Getting started with Java: main, println and Scanner',
        body: P`
<p><b>Java</b> is a strongly typed, object-oriented language that has been in use since 1995. Android apps, bank backend systems and the "heavy" data-engineering tools (Apache Spark, Kafka, Hadoop) are written in it. So if you work with data and can read Java code, that is a big advantage.</p>
<h3>Compilation and the JVM</h3>
<p>Python runs code line by line. Java works differently: first the <code>javac</code> compiler turns the <code>Main.java</code> file into <b>bytecode</b> (<code>Main.class</code>), and then the <b>JVM</b> (Java Virtual Machine) runs that bytecode. There is a JVM for Windows, Linux and Mac, so code compiled once runs everywhere — "write once, run anywhere". The compiler finds many errors before the program even runs: mismatched types, a forgotten semicolon, a variable that does not exist.</p>
<h3>The smallest program</h3>
<pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Salem, Almaty!");   // prints and moves to a new line
        System.out.print("Bir ");                // no new line
        System.out.print("jol");
    }
}</code></pre>
<p>What each part does: <code>public class Main</code> — the program lives inside a class, and the file name must match the class name. <code>public static void main(String[] args)</code> — the entry point; the JVM starts running from here. Every statement ends with <code>;</code>, blocks go inside <code>{ }</code>, and case matters: <code>Main</code> and <code>main</code> are two different things. Comments are written with <code>//</code> or <code>/* ... */</code>.</p>
<h3>Reading input: Scanner</h3>
<pre><code>import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();    // one word (up to a space)
        int age = sc.nextInt();     // a whole number
        System.out.println(name + " " + (age + 1));
    }
}</code></pre>
<p>If the input is <code>Aruzhan 19</code>, the program prints <code>Aruzhan 20</code>. Strings are joined with <code>+</code>, and the parentheses in <code>(age + 1)</code> make the numbers add first.</p>
<div class="tip">On this platform every exercise is a complete program. The test feeds input to the program through stdin and compares the text printed to stdout with the expected answer. So do not print extra text ("Enter a number:").</div>`,
        ex: [
          { prompt: 'What does the command <code>javac Main.java</code> do?', options: ['Runs the program right away', 'Creates bytecode in the file <code>Main.class</code>', 'Translates it into Python code', 'Creates an .exe file for Windows'], explain: 'javac is the compiler. It produces bytecode, which the JVM (<code>java Main</code>) then runs.' },
          { prompt: 'What does the program print?<pre><code>System.out.print("A");\nSystem.out.println("B");\nSystem.out.print("C");</code></pre>', options: ['A, B, C — each on its own line', 'AB, then C on a new line', 'ABC on one line', 'A, then BC on a new line'], explain: '<code>print</code> does not move to a new line; <code>println</code> moves to a new line after the text. So the first line is AB and the second is C.' },
          { prompt: 'The input has two words: a person\'s name and their city (for example, <code>Aruzhan Astana</code>). The program should print two lines:<pre><code>Hello, Aruzhan!\nCity: Astana</code></pre>', hints: ['Read the second word with <code>sc.next()</code> too.', 'Joining strings: <code>"Hello, " + name + "!"</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // read the city variable and print the two lines\n        System.out.println("Hello!");\n    }\n}\n' }
        ]
      },
      'jv-2': {
        title: 'Types, variables and arithmetic',
        body: P`
<p>Java is a <b>statically typed</b> language: the type of every variable is known at compile time and does not change later. After writing <code>int count = 5;</code> you cannot write <code>count = "бес";</code> — the compiler gives an error. This helps catch mistakes early.</p>
<h3>Primitive types</h3>
<table>
<tr><th>Type</th><th>Size</th><th>Example</th></tr>
<tr><td><code>int</code></td><td>32 bits, ±2.1 billion</td><td><code>int qty = 3;</code></td></tr>
<tr><td><code>long</code></td><td>64 bits, ±9.2·10¹⁸</td><td><code>long revenue = 5_000_000_000L;</code></td></tr>
<tr><td><code>double</code></td><td>64 bits, decimal number</td><td><code>double rate = 0.12;</code></td></tr>
<tr><td><code>char</code></td><td>one character</td><td><code>char grade = 'A';</code></td></tr>
<tr><td><code>boolean</code></td><td>true / false</td><td><code>boolean paid = true;</code></td></tr>
</table>
<p>There are also <code>byte</code>, <code>short</code> and <code>float</code>, but they are rare in everyday code. <code>String</code> is not a primitive — it is a class (a reference type) — but you will see it all the time. If you write <code>var x = 10;</code>, the compiler works out the type itself (here <code>int</code>), but the type is still fixed.</p>
<h3>Integer division and remainder</h3>
<pre><code>int total = 1000, people = 3;
System.out.println(total / people);            // 333  — the fractional part is dropped
System.out.println(total % people);            // 1    — the remainder
System.out.println((double) total / people);   // 333.3333333333333
System.out.println(String.format("%.2f", (double) total / people)); // 333.33</code></pre>
<p>If you divide two <code>int</code> values, the result is also an <code>int</code>. If you need a decimal result, convert one operand with <code>(double)</code> (<b>casting</b>). And if you write <code>double avg = total / people;</code>, integer division happens first (333), and only then does it become 333.0 — a common mistake.</p>
<h3>Overflow</h3>
<p>The limit of <code>int</code> is 2 147 483 647. If you go past it, Java gives no error: the number "wraps around" and becomes negative. If a monthly turnover in tenge reaches billions, use <code>long</code>. For values that never change, use <code>final</code>: <code>final double VAT = 0.12;</code>.</p>
<div class="tip">Storing money in a <code>double</code> is risky: 0.1 + 0.2 is not exactly 0.3. Real banking systems use <code>long</code> in tiyn (the smallest currency unit) or <code>BigDecimal</code>.</div>`,
        ex: [
          { prompt: 'What is printed?<pre><code>System.out.println(17 / 5 + 17 % 5);</code></pre>', explain: '17 / 5 = 3 (integer division), 17 % 5 = 2 (remainder), 3 + 2 = 5.' },
          { prompt: 'What does <code>avg</code> equal after the line <code>double avg = 7 / 2;</code>?', options: ['3.5', '3.0', '4.0', 'Compile error'], explain: '7 / 2 is two ints, so the result is 3. Only then is it turned into a double: 3.0. The right way: <code>7 / 2.0</code> or <code>(double) 7 / 2</code>.' },
          { prompt: 'What happens after <code>int x = 2_000_000_000; x = x + x;</code> runs?', options: ['x = 4 000 000 000', 'x becomes a negative number (overflow)', 'An ArithmeticException is thrown', 'Compile error'], explain: 'An int cannot go above 2 147 483 647. Java silently "wraps around": x = −294 967 296. Large sums need <code>long</code>.' },
          { prompt: 'The input has two whole numbers: the number of items <code>n</code> and the total amount <code>total</code> (in tenge). Print the average price of one item with 2 digits after the decimal point. For example, <code>3 1000</code> → <code>333.33</code>. Tip: <code>String.format("%.2f", ...)</code>.', hints: ['<code>total / n</code> is integer division. Convert one of them with <code>(double)</code>.', '<code>String.format("%.2f", avg)</code> rounds to two decimal places.'] }
        ]
      },
      'jv-3': {
        title: 'String and StringBuilder',
        body: P`
<p><code>String</code> is the most used class in Java. Its key property: it is <b>immutable</b>, meaning a string cannot be changed once created. <code>s.toUpperCase()</code> returns a new string, and <code>s</code> stays as it was.</p>
<h3>Main methods</h3>
<pre><code>String city = "Shymkent";
city.length()            // 8
city.charAt(0)           // 'S'  (indexes start at 0)
city.substring(1, 4)     // "hym" (from 1 up to 4, 4 not included)
city.indexOf("ken")      // 4, or -1 if not found
city.toLowerCase()       // "shymkent"
city.contains("kent")    // true
"  hi ".trim()           // "hi"
"a,b,c".split(",")       // the array ["a", "b", "c"]</code></pre>
<h3>Not ==, but equals</h3>
<p><code>==</code> checks whether two variables refer to <b>the same object</b>; to compare contents you need <code>equals</code>. A <code>"yes"</code> read from Scanner and the <code>"yes"</code> literal in your code may be different objects, so <code>answer == "yes"</code> sometimes gives <code>false</code>. Always write <code>answer.equals("yes")</code> or <code>equalsIgnoreCase</code>. Alphabetical comparison is <code>a.compareTo(b)</code>: it returns a negative number, zero or a positive number.</p>
<h3>StringBuilder</h3>
<p>Because String is immutable, writing <code>s = s + x</code> in a loop creates a new string at every step and copies all the characters — O(n²) over n steps. <code>StringBuilder</code> is a mutable buffer:</p>
<pre><code>StringBuilder sb = new StringBuilder();
for (int i = 1; i &lt;= 5; i++) {
    sb.append(i).append(' ');
}
System.out.println(sb.toString().trim());   // 1 2 3 4 5
System.out.println(new StringBuilder("kaspi").reverse()); // ipsak</code></pre>
<p><code>append</code> accepts any type, <code>reverse()</code> reverses the string, and there are also <code>insert</code>, <code>deleteCharAt</code> and <code>setCharAt</code>. At the end, <code>toString()</code> gives you a regular String.</p>
<div class="tip"><code>char</code> and <code>String</code> are different: <code>'a'</code> is a character (single quotes), <code>"a"</code> is a string (double quotes). <code>s.charAt(i) == 'x'</code> is correct, because char is a primitive.</div>`,
        ex: [
          { prompt: 'What is the correct way to check that the string <code>answer</code> read from Scanner is <code>"yes"</code>?', options: ['<code>answer == "yes"</code>', '<code>answer.equals("yes")</code>', '<code>answer = "yes"</code>', '<code>answer.compareTo("yes") == 1</code>'], explain: '<code>==</code> compares references, while <code>equals</code> compares contents. compareTo returns 0 when they are equal, not 1.' },
          { prompt: 'What does <code>"Astana".substring(1, 4).length()</code> equal?', explain: 'substring(1, 4) is indexes 1, 2, 3: "sta". Its length is 3.' },
          { prompt: 'The input is one word. Print it reversed using <code>StringBuilder</code>: <code>java</code> → <code>avaj</code>.', hints: ['Create <code>new StringBuilder(word)</code>.', 'The <code>.reverse()</code> method reverses the buffer, <code>.toString()</code> returns a String.'] },
          { prompt: '"Compress" a string (run-length encoding): replace each run of identical letters with the letter and its count. <code>aaabcc</code> → <code>a3b1c2</code>, <code>abca</code> → <code>a1b1c1a1</code>. Build the result in a StringBuilder.', hints: ['<code>i</code> is the start of a group. Use an inner loop to move <code>j</code> while the letter stays the same.', 'The group length is <code>j - i</code>. <code>append</code> it after the letter and set <code>i = j</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // write your code here\n        System.out.println(sb.toString());\n    }\n}\n' }
        ]
      },
      'jv-4': {
        title: 'Conditions: if, else and switch',
        body: P`
<p>A condition is based on a <code>boolean</code> value. Comparison operators: <code>==  !=  &lt;  &gt;  &lt;=  &gt;=</code>. Logical operators: <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not). <code>&amp;&amp;</code> and <code>||</code> "short-circuit": in <code>x != 0 &amp;&amp; 10 / x &gt; 2</code>, if x is zero the second part is not evaluated at all.</p>
<h3>if / else if / else</h3>
<pre><code>int tenge = 25000;
if (tenge &gt;= 50000) {
    System.out.println("Free delivery");
} else if (tenge &gt;= 20000) {
    System.out.println("Delivery 500");
} else {
    System.out.println("Delivery 1500");
}
String status = tenge &gt; 0 ? "paid" : "empty";   // ternary operator</code></pre>
<p>Conditions are checked from top to bottom: once one is true, the rest are skipped. That is why we write the biggest threshold first. Even if a block has only one line, it is better to keep the curly braces — then you will not make a mistake when you add a line later.</p>
<h3>Classic switch</h3>
<pre><code>switch (day) {
    case 6:
    case 7:
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Workday");
}</code></pre>
<p>In a classic switch, without <code>break</code> execution "falls through" into the next <code>case</code> (<b>fall-through</b>). Sometimes this is done on purpose (6 and 7 together), but usually it is a bug.</p>
<h3>New switch (Java 14+)</h3>
<pre><code>String name = switch (day) {
    case 1, 2, 3, 4, 5 -&gt; "Workday";
    case 6, 7 -&gt; "Weekend";
    default -&gt; "Unknown";
};</code></pre>
<p>The arrow form (<code>-&gt;</code>) has no fall-through, and the switch itself returns a value. switch works with <code>int</code>, <code>char</code>, <code>String</code> and <code>enum</code> values.</p>
<div class="tip">The leap-year rule is a good example of combining conditions: divisible by 4 but not by 100, OR divisible by 400. As one condition: <code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>.</div>`,
        ex: [
          { prompt: 'What is printed if <code>d = 2</code>?<pre><code>switch (d) {\n    case 1: System.out.print("A");\n    case 2: System.out.print("B");\n    case 3: System.out.print("C"); break;\n    default: System.out.print("D");\n}</code></pre>', options: ['B', 'BC', 'BCD', 'D'], explain: 'case 2 has no break, so execution falls into case 3 and prints C, then break stops it: BC.' },
          { prompt: 'The input is a score from 0 to 100. Print the grade: 90 and above → <code>A</code>, 75–89 → <code>B</code>, 60–74 → <code>C</code>, 50–59 → <code>D</code>, below 50 → <code>F</code>.', hints: ['Start with the highest threshold: <code>if (score &gt;= 90)</code>.', 'The next branches use <code>else if</code>, the last one is <code>else</code>.'] },
          { prompt: 'Is the year a leap year? If it is, print <code>YES</code>, otherwise <code>NO</code>. Rule: divisible by 4 and not by 100, or divisible by 400 (2000 is a leap year, 1900 is not).', hints: ['<code>y % 4</code> alone is not enough: 1900 is divisible by 4 but is not a leap year.', '<code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>'] }
        ]
      },
      'jv-5': {
        title: 'Loops: for, while, break and continue',
        body: P`
<p>A loop repeats an action several times. Java has three main kinds.</p>
<h3>for</h3>
<pre><code>for (int i = 1; i &lt;= 5; i++) {
    System.out.print(i + " ");      // 1 2 3 4 5
}</code></pre>
<p>The parentheses hold three parts: the starting value, the condition to keep going, and the change after each step. The variable <code>i</code> is visible only inside the loop. The most common mistake is <b>off-by-one</b>: mixing up <code>&lt;</code> and <code>&lt;=</code>. To go over an array of n elements, write <code>i = 0; i &lt; n</code>.</p>
<h3>while and do-while</h3>
<p>When you do not know in advance how many times to repeat, <code>while</code> is handy. Example: we put 500 000 tenge in a deposit at 12% a year. After how many years will it exceed 1 000 000?</p>
<pre><code>double money = 500000;
int years = 0;
while (money &lt; 1000000) {
    money = money * 1.12;
    years++;
}
System.out.println(years);   // 7</code></pre>
<p><code>do { ... } while (cond);</code> runs the body at least once and checks the condition at the end. For example, when counting the digits of a number, the number 0 itself should count as one digit — do-while fits exactly this.</p>
<h3>break and continue</h3>
<p><code>break</code> stops the loop completely; <code>continue</code> skips the rest of the current step and moves to the next one. In nested loops, <code>break</code> exits only the inner loop.</p>
<pre><code>for (int i = 1; i &lt;= 10; i++) {
    if (i % 2 == 0) continue;   // skip even numbers
    if (i &gt; 7) break;           // stop after 7
    System.out.print(i + " ");  // 1 3 5 7
}</code></pre>
<h3>Working with digits</h3>
<p><code>n % 10</code> is the last digit, <code>n / 10</code> is the number without its last digit. Repeat these two in a <code>while (n &gt; 0)</code> loop and you get all the digits of the number from right to left.</p>
<div class="tip">If a loop condition never becomes false, the program spins forever (an infinite loop) and the test runs past its time limit. When you write a while loop, make sure the variable in the condition changes inside the body.</div>`,
        ex: [
          { prompt: 'How many times does this loop run?<pre><code>for (int i = 0; i &lt; 20; i += 3) {\n    System.out.println(i);\n}</code></pre>', explain: 'i = 0, 3, 6, 9, 12, 15, 18 — seven values. 21 &lt; 20 is false, so the loop stops.' },
          { prompt: 'What is printed?<pre><code>int s = 0;\nfor (int i = 1; i &lt;= 10; i++) {\n    if (i % 3 == 0) continue;\n    if (i == 8) break;\n    s += i;\n}\nSystem.out.println(s);</code></pre>', explain: '1 + 2 + 4 + 5 + 7 = 19. 3 and 6 are skipped by continue, and break fires at i = 8.' },
          { prompt: 'The input is a non-negative whole number <code>n</code> (≤ 10⁹). Print the sum of its digits: <code>12345</code> → <code>15</code>.', hints: ['<code>n % 10</code> gives the last digit, <code>n /= 10</code> removes it.', 'Build up the sum in a <code>while (n &gt; 0)</code> loop.'] },
          { prompt: '<b>The Collatz sequence.</b> If n is even, take n/2; if odd, 3n+1. How many steps does it take to reach n = 1? <code>6</code> → <code>8</code> (6, 3, 10, 5, 16, 8, 4, 2, 1). If n = 1, the answer is 0. Intermediate values may go past the int limit, so use <code>long</code>.', hints: ['A <code>while (n != 1)</code> loop counts the steps.', 'Inside: <code>if (n % 2 == 0)</code> — divide by two, otherwise <code>3 * n + 1</code>.'] }
        ]
      },
      'jv-6': {
        title: 'Methods and overloading',
        body: P`
<p>A method is a named, reusable piece of code. It is the equivalent of a function in Python, but in Java every method lives inside a class. For now we write <code>static</code> methods, which are called without an object.</p>
<pre><code>public class Main {
    static long withVat(long price) {        // return type, name, parameters
        return price + price * 12 / 100;
    }

    static void printReceipt(String item, long price) {   // void — returns nothing
        System.out.println(item + ": " + withVat(price));
    }

    public static void main(String[] args) {
        printReceipt("Phone", 250000);   // Phone: 280000
    }
}</code></pre>
<p>A method's <b>signature</b> is its name and parameter types. The return type is required; in a method that is not <code>void</code>, every path must end with <code>return</code>, otherwise the compiler gives an error.</p>
<h3>Overloading</h3>
<p>You can write several methods with the same name but different parameters:</p>
<pre><code>static int area(int side) { return side * side; }
static int area(int w, int h) { return w * h; }
static double area(double r) { return Math.PI * r * r; }</code></pre>
<p>The compiler picks which one to call by the number and types of the arguments. Two methods that differ only in return type (<code>int f(int)</code> and <code>double f(int)</code>) cannot exist together — there is no way to tell them apart at the call.</p>
<h3>Pass-by-value</h3>
<p>Java always passes arguments <b>by value</b>. If you pass a primitive (int, double), the method gets a copy of it: changing it inside has no effect outside. If you pass an array or object, a copy of the <b>reference</b> is passed — both references point to the same object, so <code>arr[0] = 5</code> is visible outside too. But if you replace the reference itself with <code>arr = new int[3]</code>, the outer variable does not change.</p>
<div class="tip">A good method does one thing and its name says so: <code>isPrime</code>, <code>gcd</code>, <code>parsePrice</code>. Methods that return a boolean usually start with <code>is</code>/<code>has</code>.</div>`,
        ex: [
          { prompt: 'What is printed?<pre><code>static void change(int x, int[] arr) {\n    x = 100;\n    arr[0] = 100;\n}\n// inside main:\nint a = 1;\nint[] b = {1};\nchange(a, b);\nSystem.out.println(a + " " + b[0]);</code></pre>', options: ['1 1', '100 100', '1 100', '100 1'], explain: 'The copy of the int changed; the outer a stays 1. The array reference was copied, but it points to the same array, so b[0] = 100.' },
          { prompt: 'Which pair of methods CANNOT exist in the same class?', options: ['<code>int f(int x)</code> and <code>int f(double x)</code>', '<code>int f(int x)</code> and <code>int f(int x, int y)</code>', '<code>int f(int x)</code> and <code>double f(int x)</code>', '<code>void f()</code> and <code>void f(String s)</code>'], explain: 'Overloading tells methods apart by their parameters. If only the return type differs, the call <code>f(5)</code> is ambiguous — a compile error.' },
          { prompt: 'Write the method <code>static int gcd(int a, int b)</code> (Euclid\'s algorithm: if b = 0 then a, otherwise gcd(b, a % b)). The input has two positive numbers; print the GCD (gcd) and the LCM (lcm = a / gcd · b) on one line: <code>12 18</code> → <code>6 36</code>.', hints: ['Loop: <code>t = a % b; a = b; b = t;</code> — until b becomes zero.', 'lcm = <code>a / g * b</code> (dividing first lowers the risk of overflow).'] },
          { prompt: 'Write the method <code>static boolean isPrime(int n)</code> (n &lt; 2 is not prime; checking divisors up to <code>i * i &lt;= n</code> is enough). The input is <code>n</code>; print how many primes there are from 1 to n: <code>10</code> → <code>4</code> (2, 3, 5, 7).', hints: ['First <code>if (n &lt; 2) return false;</code>', '<code>for (int d = 2; d * d &lt;= n; d++)</code> — if it divides, false; after the loop, true.'] }
        ]
      },
      'jv-7': {
        title: 'Arrays and 2D arrays',
        body: P`
<p>An array is a sequence of elements of one type with a <b>fixed size</b>. Once created, its length cannot change (for that there is ArrayList, in later lessons).</p>
<pre><code>int[] sales = new int[5];            // [0, 0, 0, 0, 0]
int[] prices = {1200, 800, 4500};    // with values
System.out.println(prices.length);   // 3 (no parentheses — it is a field)
prices[1] = 950;
for (int p : prices) {               // enhanced for: handy for reading only
    System.out.print(p + " ");
}</code></pre>
<p>An array created with <code>new</code> is filled with default values: <code>0</code> / <code>0.0</code> for numbers, <code>false</code> for <code>boolean</code>, <code>null</code> for objects (String). Indexes go from <code>0</code> to <code>length - 1</code>. In a standard JVM an out-of-range index throws <code>ArrayIndexOutOfBoundsException</code>, so always write loop bounds carefully.</p>
<h3>Useful tools</h3>
<pre><code>import java.util.Arrays;
Arrays.sort(prices);                         // sort in place
System.out.println(Arrays.toString(prices)); // [800, 1200, 4500]
int[] copy = Arrays.copyOf(prices, prices.length);
int[] same = prices;   // NOT a copy: two references to one array</code></pre>
<h3>Largest and smallest value</h3>
<p>Starting with <code>0</code> when looking for the maximum is a classic mistake: if all numbers are negative, the answer comes out as 0. Use the first element (<code>a[0]</code>) or <code>Integer.MIN_VALUE</code> as the starting value.</p>
<h3>2D arrays</h3>
<p>A table, a map grid, a matrix — all are arrays of arrays:</p>
<pre><code>int[][] grid = new int[3][4];      // 3 rows, 4 columns
grid[1][2] = 7;
int rows = grid.length;            // 3
int cols = grid[0].length;         // 4
for (int r = 0; r &lt; rows; r++) {
    for (int c = 0; c &lt; cols; c++) {
        System.out.print(grid[r][c] + " ");
    }
    System.out.println();
}</code></pre>
<p>Rows can have different lengths (a <b>jagged array</b>): <code>int[][] t = new int[3][];</code> and <code>t[0] = new int[5];</code>. <b>Transposing</b> a matrix (rows ↔ columns) is <code>t[c][r] = m[r][c]</code>, and the result has size <code>cols × rows</code>.</p>
<div class="tip">The pattern for reading an array with Scanner: first <code>n = sc.nextInt()</code>, then <code>a[i] = sc.nextInt()</code> inside a <code>for</code>. It does not matter how the numbers are split across lines — nextInt skips spaces and newlines alike.</div>`,
        ex: [
          { prompt: 'What is printed?<pre><code>String[] names = new String[3];\nSystem.out.println(names[0]);</code></pre>', options: ['An empty string', '<code>null</code>', '0', 'Compile error'], explain: 'The default value in an array of objects is null. For numbers it would be 0, for boolean false.' },
          { prompt: 'How many int elements are there in total in <code>int[][] g = new int[4][6];</code>?', explain: '4 rows × 6 columns = 24 elements.' },
          { prompt: 'The input is <code>n</code>, then n whole numbers. Print the largest and smallest value on one line: <code>5</code> / <code>3 9 -2 7 0</code> → <code>9 -2</code>. All the numbers may be negative.', hints: ['Starting with <code>max = 0</code> fails on negative numbers.', 'Start <code>max</code> and <code>min</code> from <code>a[0]</code>.'] },
          { prompt: 'The input is <code>r c</code>, then an r × c matrix. Print the transposed matrix (c rows, each with r numbers separated by spaces):<pre><code>2 3        1 4\n1 2 3  →   2 5\n4 5 6      3 6</code></pre>', hints: ['When printing, let the outer loop go over columns (<code>j</code>) and the inner one over rows (<code>i</code>).', 'For each output line, collect <code>m[i][j]</code> for i = 0..r−1.'] }
        ]
      },
      'jv-8': {
        title: 'Classes and objects: constructors and encapsulation',
        body: P`
<p>A <b>class</b> is a template (a blueprint), and an <b>object</b> is a concrete instance made from that template. For example, the <code>Product</code> class has a name and a price, and "iPhone, 450 000 ₸" is one of its objects. A class keeps data (<b>fields</b>) and the actions on that data (<b>methods</b>) in one place.</p>
<pre><code>class Product {
    private String name;          // fields
    private int price;

    Product(String name, int price) {   // constructor
        this.name = name;               // this.name is the field, name is the parameter
        this.price = price;
    }

    int getPrice() { return price; }    // getter

    void applyDiscount(int percent) {
        if (percent &lt; 0 || percent &gt; 90) return;   // the class protects its own rule
        price = price - price * percent / 100;
    }

    public String toString() { return name + " (" + price + ")"; }
}

Product p = new Product("iPhone", 450000);
p.applyDiscount(10);
System.out.println(p);    // iPhone (405000)</code></pre>
<h3>Constructor</h3>
<p>A constructor is a special method named after the class, with no return type. When <code>new</code> is called, it sets up the object's initial state. You can write several constructors (overloading), and one can call another with <code>this(...)</code>. If you write no constructor at all, the compiler adds an empty one.</p>
<h3>Encapsulation</h3>
<p>Making fields <code>private</code> and allowing access only through methods is <b>encapsulation</b>. Then the price cannot become negative, because the only way to change it is a method that checks the value. Access levels: <code>private</code> (this class only), default (same package), <code>protected</code> (package + subclasses), <code>public</code> (everyone).</p>
<h3>static fields</h3>
<p>A <code>static</code> field belongs to the whole class rather than to one object: all objects share one value. For example, <code>static int created</code> is a counter of how many objects were made. A static method does not see <code>this</code>, so it cannot access object fields directly.</p>
<div class="tip">On this platform you can write several classes in one file: there is only one <code>public class Main</code>, and extra classes without <code>public</code> (<code>class Account { ... }</code>) go before or after Main.</div>`,
        ex: [
          { prompt: 'Which statement about the field <code>private int balance;</code> is true?', options: ['Any class can read it but not change it', 'It can be accessed only from inside that class', 'It is shared by all objects', 'It cannot be set in the constructor'], explain: 'private is visible only inside its own class. From outside we work only through public methods (getter, deposit). Shared by all is static.' },
          { prompt: 'What is printed?<pre><code>class Counter {\n    static int total = 0;\n    int mine = 0;\n    Counter() { total++; mine++; }\n}\n// main:\nnew Counter();\nnew Counter();\nCounter c = new Counter();\nSystem.out.println(Counter.total + " " + c.mine);</code></pre>', options: ['1 1', '3 3', '3 1', '1 3'], explain: 'total is static, so three objects share one counter: 3. mine is separate in each object; for c it is 1.' },
          { prompt: 'Finish the <code>Account</code> class: the <code>balance</code> field is <code>private</code>, and <code>withdraw(int amount)</code> changes nothing and returns <code>false</code> if there are not enough funds. Input: the starting balance and the number of commands q, then q commands: <code>D x</code> (deposit) or <code>W x</code> (withdraw). Print <code>DENIED</code> for each failed withdrawal, and <code>BALANCE x</code> at the end.', hints: ['Changing only the <code>withdraw</code> method is enough.', '<code>if (amount &gt; balance) return false;</code> — the balance stays the same.'] }
        ]
      },
      'jv-9': {
        title: 'Inheritance, polymorphism and interfaces',
        body: P`
<p><b>Inheritance</b> lets you create a new class by extending an existing one: <code>class Dog extends Animal</code>. Dog gets Animal's fields and methods and can add its own. In Java a class can extend only <b>one</b> class.</p>
<pre><code>abstract class Employee {
    protected String name;
    Employee(String name) { this.name = name; }
    abstract long monthlyPay();               // no body: subclasses must write it
    String describe() { return name + ": " + monthlyPay(); }
}

class Salaried extends Employee {
    private long salary;
    Salaried(String name, long salary) {
        super(name);                           // the parent class constructor
        this.salary = salary;
    }
    @Override
    long monthlyPay() { return salary; }
}

class Hourly extends Employee {
    private long rate, hours;
    Hourly(String name, long rate, long hours) { super(name); this.rate = rate; this.hours = hours; }
    @Override
    long monthlyPay() { return rate * hours; }
}</code></pre>
<p>You cannot create an object directly from an <code>abstract</code> class. The <code>@Override</code> annotation tells the compiler "I am overriding a parent method": if the name has a typo, it warns you right away.</p>
<h3>Polymorphism</h3>
<pre><code>Employee[] staff = { new Salaried("Aliya", 600000), new Hourly("Timur", 3000, 120) };
for (Employee e : staff) {
    System.out.println(e.describe());   // each one calls its own monthlyPay()
}</code></pre>
<p>Even though the variable's type is <code>Employee</code>, <b>the object's actual type</b> decides which method is called (dynamic dispatch). Thanks to this, adding a new kind of employee does not require changing the loop.</p>
<h3>Interface</h3>
<p>An interface is a "contract": it says which methods a class must have, but it does not store state (fields). A class can <code>implements</code> several interfaces.</p>
<pre><code>interface Shape {
    double area();
    default String label() { return "shape"; }   // default method: has a ready-made body
}
class Square implements Shape {
    private double s;
    Square(double s) { this.s = s; }
    public double area() { return s * s; }        // interface methods are public
}</code></pre>
<div class="tip">When to choose which: related classes that share fields and code — an abstract class; an ability like "can do this action" (Comparable, Runnable, Shape) — an interface. Every class inherits from <code>Object</code>, so <code>toString</code>, <code>equals</code> and <code>hashCode</code> exist in each of them.</div>`,
        ex: [
          { prompt: 'What is printed?<pre><code>class Animal { String sound() { return "..."; } }\nclass Dog extends Animal {\n    @Override String sound() { return "Woof"; }\n}\n// main:\nAnimal a = new Dog();\nSystem.out.println(a.sound());</code></pre>', options: ['...', 'Woof', 'Compile error: a has type Animal', 'Animal'], explain: 'Dynamic dispatch: the variable type is Animal, but the object is a Dog. The overridden Dog.sound() is called.' },
          { prompt: 'Which declaration is valid in Java?', options: ['<code>class A extends B, C</code>', '<code>class A implements B extends C</code>', '<code>class A extends B implements C, D</code>', '<code>interface A extends class B</code>'], explain: 'A class extends one class and implements several interfaces. extends comes first.' },
          { prompt: 'The <code>Shape</code> interface and the <code>Rect</code> class are ready. Finish the <code>area()</code> method of the <code>Circle</code> class (π·r², <code>Math.PI</code>). Input: n, then n lines: <code>C r</code> or <code>R w h</code>. Print the total area of all shapes with 2 decimal places.', hints: ['Change only the body of Circle.area().', '<code>return Math.PI * r * r;</code>'] }
        ]
      },
      'jv-10': {
        title: 'Collections: ArrayList, HashMap, HashSet',
        body: P`
<p>An array has a fixed size, but real data grows. The <b>Java Collections Framework</b> provides ready-made structures. The three most used:</p>
<table>
<tr><th>Interface</th><th>Implementation</th><th>Used for</th></tr>
<tr><td><code>List</code></td><td><code>ArrayList</code></td><td>ordered, access by index, duplicates allowed</td></tr>
<tr><td><code>Map</code></td><td><code>HashMap</code>, <code>TreeMap</code></td><td>key → value, O(1) lookup by key</td></tr>
<tr><td><code>Set</code></td><td><code>HashSet</code>, <code>TreeSet</code></td><td>elements without duplicates</td></tr>
</table>
<pre><code>import java.util.*;

List&lt;String&gt; cities = new ArrayList&lt;&gt;();
cities.add("Almaty"); cities.add("Astana");
cities.get(0);          // "Almaty"
cities.size();          // 2
cities.remove("Astana");

Map&lt;String, Integer&gt; orders = new HashMap&lt;&gt;();
orders.put("Almaty", 120);
orders.put("Almaty", orders.getOrDefault("Almaty", 0) + 1);   // 121
orders.merge("Shymkent", 1, Integer::sum);   // 1 if missing, +1 if present
orders.get("Aktobe");                        // null — no such key
orders.containsKey("Almaty");                // true
for (Map.Entry&lt;String, Integer&gt; e : orders.entrySet()) {
    System.out.println(e.getKey() + " " + e.getValue());
}

Set&lt;Integer&gt; seen = new HashSet&lt;&gt;();
seen.add(5); seen.add(5);
seen.size();           // 1
seen.contains(5);      // true</code></pre>
<h3>Generics and wrapper classes</h3>
<p>The type in angle brackets (<code>&lt;String&gt;</code>) says what the collection holds — the compiler will not let you add another type. Collections hold only objects, so instead of a primitive you write a wrapper class: <code>int → Integer</code>, <code>double → Double</code>, <code>char → Character</code>. <code>List&lt;int&gt;</code> is a compile error. Java wraps and unwraps values automatically (<b>autoboxing</b>). But be careful: comparing two <code>Integer</code> values with <code>==</code> can give <code>false</code> for values above 127 — use <code>equals</code>.</p>
<h3>Order</h3>
<p><code>HashMap</code> and <code>HashSet</code> do not guarantee any particular order of elements. If you need keys in alphabetical order, use <code>TreeMap</code>/<code>TreeSet</code> (O(log n)); if you need insertion order, use <code>LinkedHashMap</code>.</p>
<div class="tip">Get used to declaring variables with the interface type: <code>List&lt;String&gt; xs = new ArrayList&lt;&gt;();</code>. Later, switching the implementation (to <code>LinkedList</code>, say) means changing one word.</div>`,
        ex: [
          { prompt: 'Which line does not compile?', options: ['<code>List&lt;Integer&gt; a = new ArrayList&lt;&gt;();</code>', '<code>List&lt;int&gt; a = new ArrayList&lt;&gt;();</code>', '<code>Map&lt;String, Integer&gt; m = new HashMap&lt;&gt;();</code>', '<code>Set&lt;String&gt; s = new TreeSet&lt;&gt;();</code>'], explain: 'Generics work only with reference types. Instead of int you write the wrapper class Integer.' },
          { prompt: 'If <code>Map&lt;String, Integer&gt; m = new HashMap&lt;&gt;();</code> is empty, what does <code>m.get("Taraz")</code> return?', options: ['0', '<code>null</code>', 'It throws NoSuchElementException', 'An empty string ""'], explain: 'If the key is missing, get returns null. Unboxing it to an int (<code>int x = m.get(...)</code>) causes a NullPointerException, which is why <code>getOrDefault(key, 0)</code> is handy.' },
          { prompt: 'The input is n, then n whole numbers. Print the first value that appears <b>for the second time</b> in reading order (use a <code>HashSet</code>). If there is none, print <code>NONE</code>. Example: <code>3 1 4 1 5 3</code> → <code>1</code>.', hints: ['Before adding each number, check <code>seen.contains(x)</code>.', 'If found, print it and leave main with <code>return;</code>.'] },
          { prompt: 'The input is n, then n words (city names). Count how many times each word appears and print the words <b>in alphabetical order</b> as <code>word count</code>. A <code>TreeMap</code> sorts its keys for you.', hints: ['<code>freq.getOrDefault(w, 0)</code> — the count so far (0 if missing).', '<code>freq.put(w, ... + 1)</code> or <code>freq.merge(w, 1, Integer::sum)</code>.'], starter: 'import java.util.Map;\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> freq = new TreeMap<>();\n        for (int i = 0; i < n; i++) {\n            String w = sc.next();\n            // update freq\n        }\n        for (Map.Entry<String, Integer> e : freq.entrySet()) {\n            System.out.println(e.getKey() + " " + e.getValue());\n        }\n    }\n}\n' }
        ]
      },
      'jv-11': {
        title: 'Exceptions: try, catch, throw and your own exception',
        body: P`
<p>An <b>exception</b> is an event that breaks the normal flow of a program: a string that cannot become a number, a missing file, a null reference. When an exception is thrown, Java searches up the call stack for a block that catches it (<code>catch</code>). If nobody catches it, the program prints a stack trace and stops.</p>
<pre><code>try {
    int qty = Integer.parseInt("12a");     // NumberFormatException
    System.out.println("never printed");
} catch (NumberFormatException e) {
    System.out.println("Bad number: " + e.getMessage());
} finally {
    System.out.println("always");          // runs whether there was an error or not
}</code></pre>
<p>You can write several <code>catch</code> blocks — the more specific type first, then the more general one. Several types in one block: <code>catch (IllegalArgumentException | IllegalStateException e)</code>. <code>finally</code> is for closing resources; modern code uses <b>try-with-resources</b> instead: <code>try (Scanner sc = new Scanner(file)) { ... }</code> — the resource closes itself.</p>
<h3>Checked and unchecked</h3>
<p><b>Checked</b> exceptions (<code>IOException</code> and subclasses of <code>Exception</code> that are not RuntimeException) are expected failures in the outside world. The compiler requires you either to <code>catch</code> them or to declare them in the method signature with <code>throws</code>. <b>Unchecked</b> ones (subclasses of <code>RuntimeException</code>: <code>NullPointerException</code>, <code>IllegalArgumentException</code>, <code>NumberFormatException</code>, <code>ArithmeticException</code>, <code>ArrayIndexOutOfBoundsException</code>) are usually bugs in the code, and declaring them is optional.</p>
<h3>throw and your own exception class</h3>
<pre><code>class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) { super(message); }
}

void withdraw(long amount) throws InsufficientFundsException {
    if (amount &lt;= 0) throw new IllegalArgumentException("Bad amount: " + amount);
    if (amount &gt; balance)
        throw new InsufficientFundsException("Not enough: need " + amount + ", have " + balance);
    balance -= amount;
}</code></pre>
<p>Your own exception speaks the language of the domain: the caller writes <code>catch (InsufficientFundsException e)</code> and handles that specific case. <code>super(message)</code> stores the message, which you read with <code>e.getMessage()</code>.</p>
<div class="tip">Do not swallow exceptions silently: an empty <code>catch (Exception e) {}</code> hides the error. Instead of an overly broad <code>catch (Exception e)</code>, catch the specific type you expect.</div>`,
        ex: [
          { prompt: 'Which exception is <b>checked</b>, meaning the compiler requires you to catch it or declare it with <code>throws</code>?', options: ['NullPointerException', 'IllegalArgumentException', 'IOException', 'NumberFormatException'], explain: 'IOException inherits directly from Exception (not RuntimeException), so it is checked. The other three are subclasses of RuntimeException.' },
          { prompt: 'What is printed?<pre><code>try {\n    System.out.print("A");\n    throw new IllegalStateException();\n} catch (IllegalStateException e) {\n    System.out.print("B");\n} finally {\n    System.out.print("C");\n}\nSystem.out.print("D");</code></pre>', options: ['A', 'AB', 'ABC', 'ABCD'], explain: 'A is printed, the exception is caught in catch (B), finally always runs (C), and since the exception was handled, the program continues (D).' },
          { prompt: 'The input is n, then n tokens. Turn each into a number with <code>Integer.parseInt</code>. Add up the valid numbers and count the bad ones (<code>NumberFormatException</code>). Output: <code>SUM s</code> and <code>BAD k</code>.', hints: ['Put the parseInt call inside <code>try { ... }</code>.', '<code>catch (NumberFormatException e) { bad++; }</code>'] },
          { prompt: 'Finish the <code>Wallet.withdraw</code> method: if the amount is ≤ 0, it throws <code>IllegalArgumentException("Bad amount: " + amount)</code>; if there is not enough money, it throws <code>InsufficientFundsException("Not enough: need " + amount + ", have " + balance)</code>. main runs each withdrawal inside try/catch and prints <code>e.getMessage()</code> on an error. At the end, <code>BALANCE x</code>.', hints: ['withdraw has two checks: first <code>amount &lt;= 0</code>, then <code>amount &gt; balance</code>. The balance goes down only if both pass.', 'IllegalArgumentException is unchecked, but main must catch it too: add a second <code>catch (IllegalArgumentException e)</code>.'] }
        ]
      },
      'jv-12': {
        title: 'Generics, lambdas and streams',
        body: P`
<p><b>Generics</b> let you safely use the same code with different types. When you use <code>ArrayList&lt;String&gt;</code>, you are using a generic class; now let us write our own:</p>
<pre><code>class Pair&lt;A, B&gt; {
    private final A first;
    private final B second;
    Pair(A first, B second) { this.first = first; this.second = second; }
    A getFirst() { return first; }
    B getSecond() { return second; }
}
Pair&lt;String, Integer&gt; p = new Pair&lt;&gt;("Almaty", 2_200_000);

static &lt;T extends Comparable&lt;T&gt;&gt; T maxOf(List&lt;T&gt; xs) {   // generic method
    T best = xs.get(0);
    for (T x : xs) if (x.compareTo(best) &gt; 0) best = x;
    return best;
}</code></pre>
<p><code>T extends Comparable&lt;T&gt;</code> is a bound: T must be a type that can be compared. Generics are checked only at compile time; at run time the type information is erased (<b>type erasure</b>), so you cannot write <code>new T()</code>.</p>
<h3>Lambda</h3>
<p>A lambda is a short way to write an interface with one method (a <b>functional interface</b>): <code>(parameters) -&gt; expression</code>.</p>
<pre><code>Predicate&lt;Integer&gt; isBig = x -&gt; x &gt; 100000;        // boolean test(x)
Function&lt;String, Integer&gt; len = s -&gt; s.length();      // R apply(x)
Comparator&lt;Student&gt; byScore = (a, b) -&gt; b.score - a.score;   // descending

students.sort((a, b) -&gt; {
    if (a.score != b.score) return b.score - a.score;  // first by score, descending
    return a.name.compareTo(b.name);                   // if equal, by name
});</code></pre>
<p>If the Comparator returns a negative number, <code>a</code> goes first; if positive, <code>b</code>. A <b>method reference</b> is an even shorter form of a lambda: <code>String::length</code>, <code>Integer::sum</code>.</p>
<h3>Stream</h3>
<p>A stream processes a collection through a "pipeline": filter → map → result. The original collection does not change.</p>
<pre><code>int[] prices = {1200, 45000, 800, 150000, 45000};
long expensive = Arrays.stream(prices).filter(p -&gt; p &gt; 10000).count();        // 3
int total = Arrays.stream(prices).sum();
int[] uniq = Arrays.stream(prices).distinct().sorted().toArray();           // [800, 1200, 45000, 150000]
List&lt;String&gt; names = students.stream()
    .filter(s -&gt; s.score &gt;= 90)
    .map(s -&gt; s.name)
    .collect(Collectors.toList());</code></pre>
<div class="tip">Streams are easy to read, but there is no need to turn every loop into a stream. A simple, fast loop is often clearer. That said, Spark's Java/Scala API is written in exactly this filter/map style.</div>`,
        ex: [
          { prompt: 'If <code>Predicate&lt;Integer&gt; p = x -&gt; x % 2 == 0;</code>, what does <code>p.test(7)</code> return?', options: ['true', 'false', '1', 'Compile error'], explain: 'The lambda evaluates 7 % 2 == 0: 1 == 0 is false.' },
          { prompt: 'What is the result?<pre><code>int r = IntStream.rangeClosed(1, 6)\n    .filter(x -&gt; x % 2 == 0)\n    .map(x -&gt; x * x)\n    .sum();</code></pre>', explain: 'Even numbers: 2, 4, 6. Their squares: 4, 16, 36. The sum is 56.' },
          { prompt: 'The input is n, then n lines <code>name score</code>. Sort the students by score in <b>descending</b> order, and by name alphabetically when scores are equal, then print them as <code>name score</code>. Write a lambda comparator inside <code>list.sort</code>.', hints: ['Descending: <code>b.score - a.score</code>.', 'When scores are equal: <code>return a.name.compareTo(b.name);</code>'], starter: 'import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    static class Student {\n        String name;\n        int score;\n        Student(String name, int score) { this.name = name; this.score = score; }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Student> list = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            String name = sc.next();\n            int score = sc.nextInt();\n            list.add(new Student(name, score));\n        }\n        // write list.sort(...)\n        for (Student s : list) {\n            System.out.println(s.name + " " + s.score);\n        }\n    }\n}\n' },
          { prompt: 'The input is n, then n whole numbers. Using <code>Arrays.stream</code>, take the <b>even</b> numbers, remove duplicates, sort them in ascending order and print them on one line separated by spaces. If there are no even numbers, print <code>NONE</code>. Example: <code>4 3 8 4 -2 7 8</code> → <code>-2 4 8</code>.', hints: ['<code>Arrays.stream(a).filter(x -&gt; x % 2 == 0)</code> — negative even numbers also give % 2 == 0.', 'Then <code>.distinct().sorted().toArray()</code>.'], starter: 'import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int[] evens = a;   // compute this with a stream\n        if (evens.length == 0) {\n            System.out.println("NONE");\n            return;\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int x : evens) {\n            if (sb.length() > 0) sb.append(\' \');\n            sb.append(x);\n        }\n        System.out.println(sb);\n    }\n}\n' }
        ]
      },
      'jv-13': {
        title: 'Scanner in depth and recursion',
        body: P`
<h3>Scanner: next, nextInt, nextLine</h3>
<p><code>next()</code> and <code>nextInt()</code> skip whitespace (spaces, newlines) and read the next <b>token</b>. <code>nextLine()</code> reads the <b>rest</b> of the current line. This leads to a well-known trap:</p>
<pre><code>// Input:
// 3
// Almaty Astana Shymkent
int n = sc.nextInt();        // read 3; the cursor is after "3", at the end of the line
String line = sc.nextLine(); // "" — the rest of the first line (empty)!
line = sc.nextLine();        // "Almaty Astana Shymkent"</code></pre>
<p>The fix: call one "empty" <code>nextLine()</code> after nextInt, or read everything token by token. When you do not know how many numbers there are, use <code>hasNextInt()</code> — it checks whether the next token is a whole number and returns <code>false</code> when the input ends or a non-number token appears:</p>
<pre><code>long sum = 0;
while (sc.hasNextInt()) {
    sum += sc.nextInt();
}</code></pre>
<h3>Recursion</h3>
<p>Recursion is a method calling itself. Every recursive method has two parts: the <b>base case</b> (the stopping condition) and the <b>recursive step</b>, which makes the problem smaller.</p>
<pre><code>static long factorial(int n) {
    if (n &lt;= 1) return 1;            // base case
    return n * factorial(n - 1);     // a smaller problem
}</code></pre>
<p>Each call adds a new frame to the <b>call stack</b>. If you forget the base case or the depth gets too large, you get a <code>StackOverflowError</code>. Naive Fibonacci <code>fib(n) = fib(n-1) + fib(n-2)</code> computes the same values over and over, and the number of calls grows exponentially; storing computed values in an array (<b>memoization</b>) makes it O(n).</p>
<h3>Backtracking</h3>
<p>Recursion fits "try every option" problems naturally: at each step we make a choice, go deeper into the recursion, then undo the choice. For example, building binary strings of length n:</p>
<pre><code>static void gen(StringBuilder cur, int n) {
    if (cur.length() == n) { System.out.println(cur); return; }
    for (char c : new char[]{'0', '1'}) {
        cur.append(c);                      // choose
        gen(cur, n);                        // go deeper
        cur.deleteCharAt(cur.length() - 1); // undo
    }
}</code></pre>
<div class="tip">Before writing recursion, answer two questions: "what is the smallest input and what is its answer?" and "how do I get the answer for n from the answer for n−1 (or n/2)?".</div>`,
        ex: [
          { prompt: 'The input is <code>5</code>, a newline, then <code>Almaty Astana</code>. What does <code>line</code> equal after this code?<pre><code>int n = sc.nextInt();\nString line = sc.nextLine();</code></pre>', options: ['"Almaty Astana"', '"" (an empty string)', '"Almaty"', '"5"'], explain: 'nextInt reads only 5, and the cursor stays at the end of the first line. nextLine returns the rest of that line — an empty string.' },
          { prompt: 'For the naive <code>fib(n)</code> (returns n if <code>n &lt;= 1</code>, otherwise <code>fib(n-1) + fib(n-2)</code>), how many times in total is the method called when you call <code>fib(5)</code> (including the first call)?', explain: 'C(0) = C(1) = 1, C(n) = 1 + C(n−1) + C(n−2): C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 15.' },
          { prompt: 'The input has an unknown number of whole numbers (possibly on several lines); stop reading when a non-number token appears or the input ends. Read with <code>hasNextInt()</code> and print <code>sum count</code> on one line. Example: <code>1 2 3</code> → <code>6 3</code>.', hints: ['<code>while (sc.hasNextInt())</code> — as long as the next token is a number.', 'Inside: <code>sum += sc.nextInt(); count++;</code>'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long sum = 0;\n        int count = 0;\n        // write the hasNextInt loop\n        System.out.println(sum + " " + count);\n    }\n}\n' },
          { prompt: 'The input is n (1 ≤ n ≤ 12). Using recursion, print in lexicographic order (each on its own line) all binary strings of length n that have <b>no two 1s in a row</b>. n = 3: <code>000 001 010 100 101</code>.', hints: ['Base case: <code>cur.length() == n</code> — print and return.', 'First append 0 and go deeper (for lexicographic order), then append 1 only if the last character is not 1. After each branch, <code>deleteCharAt</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    static void gen(StringBuilder cur, int n) {\n        // write the recursion\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        gen(new StringBuilder(), n);\n    }\n}\n' }
        ]
      },
      'jv-p1': {
        title: 'Problem set 1: easy to medium',
        body: P`
<p>There is no new topic in this lesson: you apply what you have learned to DSA-style problems. The problems go from easy to medium. Before solving each one, do three things:</p>
<ul>
<li>Work out the <b>input format</b>: what comes first (n, then an array?), and which type to read it with.</li>
<li>Think about <b>edge cases</b>: one element, all the same, no answer.</li>
<li>Estimate the <b>complexity</b>: with n = 10⁵, O(n²) is too slow — HashMap/HashSet give O(n).</li>
</ul>
<h3>Useful patterns</h3>
<pre><code>// counting frequencies (lowercase Latin letters only)
int[] cnt = new int[26];
for (char c : s.toCharArray()) cnt[c - 'a']++;

// "have I seen this before?" + index
Map&lt;Integer, Integer&gt; pos = new HashMap&lt;&gt;();
if (pos.containsKey(need)) { ... }
pos.putIfAbsent(x, i);

// two pointers
int i = 0, j = s.length() - 1;
while (i &lt; j) { ...; i++; j--; }</code></pre>
<p>The <code>c - 'a'</code> trick: in Java a char also works as a number, <code>'c' - 'a' == 2</code>. So a 26-cell array counts lowercase Latin letter frequencies faster than a HashMap. <code>Character.toLowerCase(c)</code> makes the case uniform.</p>
<p>The key idea in Two Sum: for each <code>a[j]</code> we ask the HashMap, "I need <code>target − a[j]</code> — have I seen it before?". This turns an O(n²) pair search into O(n) — one of the most frequently asked tricks in interviews.</p>
<div class="tip">Pay close attention to the output format: the test compares text exactly. <code>YES</code> and <code>Yes</code> are different answers.</div>`,
        ex: [
          { prompt: '<b>FizzBuzz.</b> The input is n. For each number from 1 to n, on its own line: if divisible by 15, <code>FizzBuzz</code>; by 3, <code>Fizz</code>; by 5, <code>Buzz</code>; otherwise the number itself.', hints: ['The order of conditions matters: 15 must be checked first.', 'Put the <code>if (i % 15 == 0)</code> branch at the very start.'] },
          { prompt: '<b>Palindrome.</b> The input is one word (Latin letters). If, ignoring case, it reads the same forwards and backwards, print <code>YES</code>, otherwise <code>NO</code>. Use two pointers: <code>Level</code> → <code>YES</code>.', hints: ['First <code>toLowerCase()</code>.', '<code>i = 0, j = length − 1</code>; compare while <code>i &lt; j</code> and move toward the middle.'] },
          { prompt: '<b>Anagram.</b> The input is two words of lowercase Latin letters. If they are made of the same letters (in the same counts), print <code>YES</code>, otherwise <code>NO</code>. Use an <code>int[26]</code> frequency array.', hints: ['For the first word\'s letters do <code>cnt[c - \'a\']++</code>, for the second word\'s <code>--</code>.', 'If all cells are 0 at the end, it is an anagram.'] },
          { prompt: '<b>Two Sum.</b> The input is <code>n target</code>, then n numbers. Going from left to right, find the <b>smallest j</b> such that <code>a[i] + a[j] = target</code> (i &lt; j), where i is the index of that value\'s very first occurrence. Print <code>i j</code>, or <code>-1 -1</code> if there is no pair. Use a HashMap for an O(n) solution.', hints: ['For each x, check whether <code>need = target − x</code> is in the map — and only then add x.', '<code>putIfAbsent(x, j)</code> keeps the first index of a value.'] },
          { prompt: 'In a sorted array of 1 000 000 elements, about how many comparisons does binary search make in the worst case? (round to a whole number)', explain: 'Each step halves the search range: log₂(10⁶) ≈ 19.93, so 20 steps.' }
        ]
      },
      'jv-p2': {
        title: 'Problem set 2: medium to hard',
        body: P`
<p>The problems in the second set require choosing the right data structure. In Java they are all ready-made:</p>
<table>
<tr><th>Structure</th><th>Java class</th><th>Main methods</th></tr>
<tr><td>Stack</td><td><code>ArrayDeque&lt;Character&gt;</code></td><td><code>push</code>, <code>pop</code>, <code>peek</code>, <code>isEmpty</code></td></tr>
<tr><td>Queue</td><td><code>ArrayDeque&lt;int[]&gt;</code></td><td><code>offer</code>, <code>poll</code>, <code>isEmpty</code></td></tr>
<tr><td>Sliding window</td><td><code>HashMap</code> / <code>int[128]</code></td><td>index where each character was last seen</td></tr>
<tr><td>DP table</td><td><code>int[]</code>, <code>int[][]</code></td><td><code>Arrays.fill</code></td></tr>
</table>
<p>Instead of the old <code>Stack</code> class, <code>ArrayDeque</code> is recommended: it is faster and can act as both a stack and a queue.</p>
<h3>BFS pattern</h3>
<pre><code>int[][] dist = new int[r][c];
for (int[] row : dist) Arrays.fill(row, -1);
ArrayDeque&lt;int[]&gt; q = new ArrayDeque&lt;&gt;();
q.offer(new int[]{0, 0});
dist[0][0] = 0;
int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};
while (!q.isEmpty()) {
    int[] cur = q.poll();
    for (int k = 0; k &lt; 4; k++) {
        int nr = cur[0] + dr[k], nc = cur[1] + dc[k];
        if (nr &lt; 0 || nr &gt;= r || nc &lt; 0 || nc &gt;= c) continue;   // ALWAYS check the bounds
        if (grid[nr].charAt(nc) == '#' || dist[nr][nc] != -1) continue;
        dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
        q.offer(new int[]{nr, nc});
    }
}</code></pre>
<p>BFS gives the shortest path in an unweighted grid because it opens cells in order of distance. The complexity is O(R·C).</p>
<h3>Dynamic programming</h3>
<p>In the coin change problem, <code>dp[x]</code> is the smallest number of coins that make up the amount x. <code>dp[0] = 0</code>, the rest are "infinity", and for each x, <code>dp[x] = min(dp[x − coin] + 1)</code>. The greedy approach (taking the largest coin at each step) is not always right: with coins {1, 5, 10, 21}, greedy makes 30 with 6 coins: 21 + 5 + 1 + 1 + 1 + 1, while the optimum is 3 coins: 10 + 10 + 10.</p>
<div class="tip">In binary search, compute the middle as <code>mid = lo + (hi - lo) / 2</code>: <code>(lo + hi) / 2</code> overflows int for large indexes.</div>`,
        ex: [
          { prompt: '<b>Balanced brackets.</b> The input is one line of the characters <code>()[]{}</code>. If every opening bracket is closed by its matching bracket in the right order, print <code>YES</code>, otherwise <code>NO</code>. Use an <code>ArrayDeque</code> as a stack.', hints: ['<code>push</code> an opening bracket; on a closing one, check that the stack is not empty, <code>pop</code> and compare the pair.', 'At the end the stack must be empty: <code>(((</code> → NO.'] },
          { prompt: '<b>Binary search.</b> The input is n, then n distinct numbers sorted in ascending order, then q and q queries. For each query, print the number\'s index (from 0) or <code>-1</code>. Write your own binary search.', hints: ['<code>lo = 0, hi = n − 1</code>, <code>while (lo &lt;= hi)</code>.', 'If a[mid] &lt; x, then <code>lo = mid + 1</code>, otherwise <code>hi = mid − 1</code>.'] },
          { prompt: '<b>Longest substring without repeats.</b> The input is one line of Latin letters and digits. Print the length of the longest <b>contiguous</b> part in which no character repeats: <code>abcabcbb</code> → <code>3</code>. Write an O(n) sliding window.', hints: ['<code>last[c]</code> is the index where character c was last seen (−1 at the start).', 'If <code>last[c] &gt;= left</code>, move the window\'s left edge to <code>last[c] + 1</code>; at each step compare the length <code>right − left + 1</code>.'] },
          { prompt: '<b>Coin change.</b> The input is <code>n amount</code>, then n coin values (unlimited supply of each). Print the smallest number of coins that make up <code>amount</code>, or <code>-1</code> if it is impossible. Use DP, not greedy.', hints: ['<code>dp[0] = 0</code>, the rest a large number (INF). To avoid overflow, use <code>Integer.MAX_VALUE / 2</code>.', 'For each x and each coin c ≤ x: <code>dp[x] = min(dp[x], dp[x − c] + 1)</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int amount = sc.nextInt();\n        int[] coins = new int[n];\n        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();\n        // greedy: start from the largest coin (wrong!)\n        java.util.Arrays.sort(coins);\n        int count = 0, rest = amount;\n        for (int i = n - 1; i >= 0; i--) {\n            count += rest / coins[i];\n            rest %= coins[i];\n        }\n        System.out.println(rest == 0 ? count : -1);\n    }\n}\n' },
          { prompt: '<b>Shortest path in a grid.</b> The input is <code>r c</code>, then r lines: <code>.</code> is empty, <code>#</code> is a wall. Print the smallest number of steps (in four directions) from the top-left corner to the bottom-right corner; if it cannot be reached or a corner is a wall, print <code>-1</code>. Use BFS.', hints: ['Fill the <code>dist</code> array with −1: −1 means "not visited yet".', 'Before adding a neighbor to the queue, check the bounds, the wall and that dist == −1. The answer is <code>dist[r−1][c−1]</code>.'], starter: 'import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt(), c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        // Manhattan distance ignores the walls\n        System.out.println((r - 1) + (c - 1));\n    }\n}\n' }
        ]
      },
      'jv-gate': {
        title: 'Module exam: Java',
        body: P`
<p>The final exam: three questions on the core rules of the language and three programs (collections, polymorphism, sorting with a lambda). The pass mark is 75%.</p>
<ul>
<li>Read the input format carefully and print only the text that is asked for.</li>
<li>Decide in advance which structure you need: List, Map, Set, array.</li>
<li>Check the edge cases: an empty result, equal values, not enough stock.</li>
</ul>`,
        ex: [
          { prompt: 'What is printed?<pre><code>String s = "data";\ns.toUpperCase();\nSystem.out.println(s);</code></pre>', options: ['DATA', 'data', 'Data', 'Compile error'], explain: 'String is immutable: toUpperCase() returns a new string, but it was not stored anywhere. s is still "data". The right way: <code>s = s.toUpperCase();</code>' },
          { prompt: 'The <code>Point</code> class has fields <code>x</code> and <code>y</code>, but <code>equals</code> and <code>hashCode</code> are not overridden. What is printed?<pre><code>Set&lt;Point&gt; s = new HashSet&lt;&gt;();\ns.add(new Point(1, 2));\ns.add(new Point(1, 2));\nSystem.out.println(s.size());</code></pre>', options: ['1', '2', '0', 'Compile error'], explain: 'The default equals/hashCode are based on the object\'s reference, not its value. Two separate objects are two elements. To compare by value, you must override both.' },
          { prompt: 'What does <code>f(5)</code> equal?<pre><code>static int f(int n) {\n    if (n &lt;= 1) return 1;\n    return f(n - 1) + 2 * f(n - 2);\n}</code></pre>', explain: 'f(0) = f(1) = 1, f(2) = 1 + 2 = 3, f(3) = 3 + 2 = 5, f(4) = 5 + 6 = 11, f(5) = 11 + 10 = 21.' },
          { prompt: '<b>Warehouse.</b> The input is q, then q commands: <code>ADD item qty</code> or <code>SELL item qty</code>. If there is not enough stock for a SELL, change nothing and print <code>ERROR item</code>. At the end, print the items with stock above 0 in alphabetical order as <code>item qty</code>; if there are no such items, print <code>EMPTY</code>.', hints: ['<code>have = stock.getOrDefault(item, 0)</code> — a missing item has stock 0.', 'At the end print only entries with <code>getValue() &gt; 0</code>; if none were printed, EMPTY.'], starter: 'import java.util.Map;\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        Map<String, Integer> stock = new TreeMap<>();\n        for (int i = 0; i < q; i++) {\n            String cmd = sc.next();\n            String item = sc.next();\n            int qty = sc.nextInt();\n            // handle the commands\n        }\n        System.out.println("EMPTY");\n    }\n}\n' },
          { prompt: '<b>Payroll.</b> The abstract class <code>Employee</code> is ready. Write the classes <code>Salaried</code> (monthly <code>salary</code>) and <code>Hourly</code> (<code>rate</code>, <code>hours</code>; up to 160 hours it is rate·hours, and each hour over 160 pays 1.5 times as much: <code>rate·160 + rate·(hours−160)·3/2</code>, integer division). Input: n, then n lines <code>S name salary</code> or <code>H name rate hours</code>. Print each employee in input order as <code>name pay</code>, and <code>TOTAL x</code> at the end.', hints: ['Both classes use <code>extends Employee</code>, call <code>super(name)</code> in the constructor, and override <code>pay()</code> with <code>@Override</code>.', 'Hourly: if <code>hours &lt;= 160</code>, then <code>rate * hours</code>, otherwise <code>rate * 160 + rate * (hours − 160) * 3 / 2</code>. Do not forget to add the objects to <code>staff</code> in main.'] },
          { prompt: '<b>Merging intervals.</b> The input is n, then n lines <code>start end</code> (start ≤ end, in any order). Merge intervals that overlap or touch (<code>[1,3]</code> and <code>[3,5]</code> → <code>[1,5]</code>) and print the result in ascending order of start as <code>start end</code>. Use a lambda comparator for sorting.', hints: ['First sort by start: <code>xs.sort((a, b) -&gt; Integer.compare(a[0], b[0]))</code>.', 'If the next interval\'s start is not greater than the end of the last merged one, extend the end with <code>Math.max</code>; otherwise start a new interval.'] }
        ]
      }
    }
  });
})();
