// CP1 C++: English text. Code, solutions and expected output are in content/cpp.js.
// Expected program output (strings like "Сәлем", "Суық", day names) stays in Kazakh, as the checker compares it.
(function () {
  const P = String.raw;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const pre = s => '<pre><code>' + esc(s.replace(/^\n/, '')) + '</code></pre>';

  DJ.i18n.patch({
    modules: {
      'cpp-1': { intro: 'C++ fundamentals: cout/cin, types, string, conditions and loops, functions and references, vector, pointers and dynamic memory, classes, operator overloading, templates, inheritance, STL and recursion. Every exercise is a complete program that reads from stdin and writes to stdout; at the end there is a set of Easy / Medium / Hard problems and an exam.' }
    },
    lessons: {
      'cp-1': {
        title: 'Your first program: main, cout, cin',
        body: `
<p><b>C++</b> is a compiled language built for speed: game engines (Unreal Engine), browsers, databases, and even the inner core of PyTorch and NumPy are written in it. The difference from Python: the code is first translated into machine code by a <b>compiler</b>, and only then is it run. Most errors are found before the program runs, at compile time.</p>
<h3>Program structure</h3>
${pre(P`
#include <iostream>      // input/output library
using namespace std;     // so you don't have to write std:: every time

int main() {             // the program starts here
    cout << "Сәлем, Алматы!" << endl;
    return 0;            // 0 means "everything finished successfully"
}`)}
<ul>
<li><code>#include</code> adds a library. <code>cout</code> and <code>cin</code> live in <code>&lt;iostream&gt;</code>.</li>
<li><code>int main()</code> is the entry point; every program has exactly one.</li>
<li>Every statement ends with a <b>semicolon</b> <code>;</code>. Blocks are marked with curly braces <code>{ }</code>; indentation is only there to make the code easier to read.</li>
<li><code>cout &lt;&lt;</code> prints to the screen; you can chain several values with <code>&lt;&lt;</code>. <code>endl</code> is a new line.</li>
</ul>
<h3>Input: cin</h3>
${pre(P`
int a, b;
cin >> a >> b;           // "3 4" or "3\n4" — both work
cout << a + b << endl;   // 7`)}
<p><code>cin &gt;&gt;</code> skips spaces and newlines and reads the next value according to the variable's type. You must declare a variable's type before you use it: <code>int a;</code>.</p>
<div class="tip">On Tolqyn every exercise is a complete program. When it is checked, it is given a prepared input (stdin), and your output (stdout) is compared line by line with the expected answer. So do not print extra text (like "Enter a number:").</div>`,
        ex: [
          { prompt: 'The program reads one word, a person\'s name, and prints <code>Сәлем, &lt;name&gt;!</code> (Kazakh for "Hello, &lt;name&gt;!"). For example, input <code>Айгерім</code> → <code>Сәлем, Айгерім!</code>',
            starter: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    // read the name and say hello
    cout << "Сәлем!" << endl;
    return 0;
}
`,
            hints: ['<code>cin &gt;&gt; name;</code> reads the name.', '<code>cout &lt;&lt; "Сәлем, " &lt;&lt; name &lt;&lt; "!" &lt;&lt; endl;</code>'] },
          { prompt: 'Two integers <code>a</code> and <code>b</code> are given. Print their sum on the first line and their product on the second.',
            hints: ['Add a second <code>cout</code> line.', '<code>cout &lt;&lt; a * b &lt;&lt; endl;</code>'] },
          { prompt: 'Which function does a C++ program start running from?', options: ['The first function in the file', 'The <code>main()</code> function', 'The <code>#include</code> line', 'The <code>start()</code> function'], explain: 'Every C++ program has one function called <code>main</code>; the operating system starts the program there.' }
        ]
      },
      'cp-2': {
        title: 'Types, variables and arithmetic',
        body: `
<p>C++ is a <b>statically typed</b> language: the type of every variable is known at compile time and does not change later. The type decides how much memory the variable gets and which operations you can do with it.</p>
<table>
<tr><th>Type</th><th>What it stores</th><th>Example</th></tr>
<tr><td><code>int</code></td><td>whole number, about ±2.1 billion</td><td><code>int age = 19;</code></td></tr>
<tr><td><code>long long</code></td><td>large whole number, about ±9.2·10¹⁸</td><td><code>long long people = 8000000000LL;</code></td></tr>
<tr><td><code>double</code></td><td>decimal number</td><td><code>double price = 1299.5;</code></td></tr>
<tr><td><code>char</code></td><td>one character (1 byte)</td><td><code>char grade = 'A';</code></td></tr>
<tr><td><code>bool</code></td><td><code>true</code> / <code>false</code></td><td><code>bool paid = true;</code></td></tr>
</table>
<p><code>auto</code> lets the compiler work out the type: <code>auto x = 3.5;</code> is a <code>double</code>. <code>const</code> makes a value that cannot change: <code>const int DAYS = 7;</code>.</p>
<h3>Integer division: the main trap</h3>
${pre(P`
cout << 7 / 2 << endl;        // 3   — two ints: the fractional part is dropped
cout << 7 % 2 << endl;        // 1   — remainder
cout << 7.0 / 2 << endl;      // 3.5 — if one operand is double, the result is double
int total = 10000, n = 3;
double share = static_cast<double>(total) / n;   // 3333.33...`)}
<p>Note: if you write <code>double d = 7 / 2;</code>, then <code>7 / 2</code> is first computed as an integer, giving 3, and only then is it stored in <code>d</code> as 3.0.</p>
<h3>Overflow and printing decimals</h3>
<p>If a value goes past the limit of <code>int</code> (overflow), C++ gives no error: the value "wraps around" and becomes a wrong number. If a sum or a product can be large, use <code>long long</code>.</p>
${pre(P`
#include <iomanip>
double avg = 2250.0;
cout << fixed << setprecision(2) << avg << endl;   // 2250.00`)}
<div class="tip"><code>fixed &lt;&lt; setprecision(2)</code> means exactly 2 digits after the decimal point. This setting applies to all later <code>double</code> output.</div>`,
        ex: [
          { prompt: 'Friends split a restaurant bill evenly. You are given the total (in tenge, a whole number) and the number of people. Print each person\'s share with 2 digits after the decimal point. For example, <code>10000 3</code> → <code>3333.33</code>.',
            hints: ['<code>total / people</code> is integer division. First do <code>static_cast&lt;double&gt;(total)</code>.', '<code>cout &lt;&lt; fixed &lt;&lt; setprecision(2) &lt;&lt; share;</code>'] },
          { prompt: 'What is <code>x</code> after <code>int x = 17 / 5 * 2;</code> runs?', explain: '<code>17 / 5</code> is integer division: 3. Then <code>3 * 2 = 6</code>.' },
          { prompt: 'What is <code>d</code> after <code>double d = 7 / 2;</code> runs?', explain: 'The right side is made of two <code>int</code>s, so <code>7 / 2 = 3</code> is computed as an integer and only then stored in the <code>double</code> as 3.0. The correct way: <code>7.0 / 2</code>.' },
          { prompt: 'Which type is right for storing the population of the Earth (about 8,000,000,000 people)?', options: ['<code>int</code>', '<code>char</code>', '<code>long long</code>', '<code>bool</code>'], explain: '<code>int</code> only holds values up to about 2.1 billion. For 8 billion you need <code>long long</code>.' }
        ]
      },
      'cp-3': {
        title: 'Strings: std::string',
        body: `
<p>In C++ text is stored in the <code>std::string</code> class (<code>#include &lt;string&gt;</code>). It is similar to a Python string, but it is <b>mutable</b>: you can replace a single character directly.</p>
${pre(P`
string city = "Astana";
cout << city.size() << endl;        // 6
cout << city[0] << endl;            // A  (char)
city[0] = 'a';                      // "astana" — it can be changed
string full = city + " city";       // concatenation
cout << city.substr(1, 3) << endl;  // "sta": 3 characters starting at position 1
cout << city.find("na") << endl;    // 3; if not found, string::npos
string s = to_string(2025);         // number → string
int n = stoi("42");                 // string → number`)}
<h3>cin and getline</h3>
<p><code>cin &gt;&gt; s</code> reads one <b>word</b>: it stops at a space. To read a whole line, you need <code>getline</code>:</p>
${pre(P`
string line;
getline(cin, line);       // "Нұр Сұлтан даңғылы 12" — the whole line`)}
<p>If you first use <code>cin &gt;&gt; n</code> and then <code>getline</code>, the newline character at the end of the first line stays in the input, and <code>getline</code> reads an empty line. The fix is to call <code>cin.ignore();</code> in between.</p>
<h3>Working with characters</h3>
${pre(P`
for (char c : line) {                // range-based for
    if (c == ' ') continue;
    char up = toupper(c);            // 'a' → 'A'
}`)}
<div class="tip"><b>Cyrillic and UTF-8:</b> <code>size()</code> counts <b>bytes</b>, not characters. A Latin letter is 1 byte, while Cyrillic letters, including Kazakh letters like Ә and Қ, are 2 bytes. So <code>string("Қала").size()</code> is 8. In character-level exercises we use Latin text.</div>`,
        ex: [
          { prompt: 'A first name and a last name are given (in Latin letters, separated by a space). Print them in the format <code>LastName F.</code>: <code>Aigerim Nurlanova</code> → <code>Nurlanova A.</code>',
            hints: ['The first letter of the first name is <code>first[0]</code>.', '<code>cout &lt;&lt; last &lt;&lt; " " &lt;&lt; first[0] &lt;&lt; ".";</code>'] },
          { prompt: 'One line of text is given (in Latin letters, with spaces). Print the number of vowels in it: <code>a e i o u</code>; capital letters count too.',
            hints: ['Read the whole line with <code>getline(cin, line)</code>: <code>cin &gt;&gt;</code> takes only the first word.', 'Turn each character into lowercase with <code>tolower(c)</code> and compare it with the five vowels.'] },
          { prompt: 'Input: <code>Нұр Сұлтан</code>. What is <code>s</code> after <code>string s; cin &gt;&gt; s;</code>?', options: ['<code>"Нұр Сұлтан"</code>', '<code>"Нұр"</code>', '<code>"Сұлтан"</code>', 'An empty string'], explain: '<code>cin &gt;&gt;</code> reads one word, up to a space. For the whole line use <code>getline(cin, s)</code>.' },
          { prompt: 'If <code>string s = "Astana";</code>, what does <code>s.substr(1, 3)</code> return?', options: ['<code>"Ast"</code>', '<code>"sta"</code>', '<code>"st"</code>', '<code>"stan"</code>'], explain: '<code>substr(pos, len)</code>: 3 characters starting at index 1 (the second character, <code>s</code>) — <code>"sta"</code>.' }
        ]
      },
      'cp-4': {
        title: 'Conditions: if/else and switch',
        body: `
<p>A program picks different paths depending on a condition. Comparison operators: <code>== != &lt; &gt; &lt;= &gt;=</code>; logical ones: <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not). The condition goes in parentheses.</p>
${pre(P`
int temp;
cin >> temp;
if (temp < 0) {
    cout << "Суық" << endl;
} else if (temp <= 15) {
    cout << "Салқын" << endl;
} else {
    cout << "Жылы" << endl;
}
string status = (temp > 30) ? "Ыстық" : "Қалыпты";   // ternary operator`)}
<p>A trap: <code>if (x = 5)</code> is not a comparison but an <b>assignment</b>. The condition is always true. To compare, write <code>==</code> (the compiler usually gives a warning).</p>
<h3>switch</h3>
<p>When you compare one integer (or <code>char</code>) value against several specific values, <code>switch</code> is more compact:</p>
${pre(P`
char cmd;
cin >> cmd;
switch (cmd) {
    case 'D': cout << "Депозит" << endl; break;
    case 'W': cout << "Ақша алу" << endl; break;
    case 'q':
    case 'Q': cout << "Шығу" << endl; break;   // two cases in one block
    default:  cout << "Белгісіз команда" << endl;
}`)}
<p><b>break</b> matters: if you forget it, execution "falls through" into the next <code>case</code> and runs its code too. <code>switch</code> does not work with <code>string</code> or <code>double</code> values; in that case use a chain of <code>if/else if</code>.</p>
<div class="tip">In C++ <code>0</code> is false and any other number is true. So <code>if (n % 2)</code> means "if n is odd".</div>`,
        ex: [
          { prompt: 'The air temperature (a whole number) is given. If it is below 0, print <code>Суық</code> (cold); from 0 to 15 inclusive, <code>Салқын</code> (cool); above 15, <code>Жылы</code> (warm).',
            hints: ['Three branches: <code>if (t &lt; 0)</code>, <code>else if (t &lt;= 15)</code>, <code>else</code>.', 'Check the boundaries: 0 and 15 are <code>Салқын</code>.'] },
          { prompt: 'A day-of-week number (1–7) is given. Use <code>switch</code> to print the Kazakh day name: Дүйсенбі, Сейсенбі, Сәрсенбі, Бейсенбі, Жұма, Сенбі, Жексенбі (Monday to Sunday). For any other number, print <code>Қате</code> (error).',
            hints: ['The starter has no <code>break</code>: if you enter 1, "Қате" is printed as well.', 'Put <code>break;</code> at the end of every <code>case</code> and add days 2–7.'] },
          { prompt: 'What does <code>int x = 2; switch (x) { case 1: cout &lt;&lt; "A"; case 2: cout &lt;&lt; "B"; case 3: cout &lt;&lt; "C"; break; default: cout &lt;&lt; "D"; }</code> print?', options: ['<code>B</code>', '<code>BC</code>', '<code>BCD</code>', '<code>ABC</code>'], explain: 'It starts at <code>case 2</code>; since there is no <code>break</code>, it falls through into <code>case 3</code>, then <code>break</code> stops it: <code>BC</code>.' },
          { prompt: 'What is <code>x</code> after <code>int x = 5; if (x &gt; 3 &amp;&amp; x &lt; 5) x += 10; else x *= 2;</code> runs?', explain: '<code>x &lt; 5</code> is false (5 is not less than 5), so the whole <code>&amp;&amp;</code> is false and <code>else</code> runs: 5 · 2 = 10.' }
        ]
      },
      'cp-5': {
        title: 'Loops: for, while, do-while',
        body: `
<p>A loop repeats an action many times. C++ has three main kinds.</p>
${pre(P`
for (int i = 1; i <= 5; i++) {     // start; condition; step
    cout << i << " ";              // 1 2 3 4 5
}

int balance = 1000;
int months = 0;
while (balance < 2000) {           // while the condition is true
    balance += balance / 10;       // 10% growth every month
    months++;
}

int pin;
do {
    cin >> pin;                    // runs at least once
} while (pin != 1234);`)}
<p><code>break</code> leaves the loop at once; <code>continue</code> skips the rest of the current iteration and moves to the next one. A loop inside a loop (nested loop) is needed for two-dimensional shapes such as a table or a triangle:</p>
${pre(P`
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) cout << "*";
    cout << endl;
}
// *
// **
// ***`)}
<h3>Reading until the input ends</h3>
<p>If you don't know in advance how many numbers there are, use <code>while (cin &gt;&gt; x)</code>: when reading fails (the input has ended, EOF), the condition becomes false.</p>
${pre(P`
long long sum = 0;
int x;
while (cin >> x) sum += x;`)}
<div class="tip">If the sum can be large, use <code>long long</code>: the sum of the numbers from 1 to 100,000 is 5,000,050,000, which is beyond the limit of <code>int</code>.</div>`,
        ex: [
          { prompt: 'Given <code>n</code>, print a triangle of stars with <code>n</code> rows: row <code>i</code> has <code>i</code> stars <code>*</code>.',
            hints: ['You need an inner loop: <code>for (int j = 1; j &lt;= i; j++)</code>.', 'Print <code>endl</code> only after the inner loop.'] },
          { prompt: 'Given <code>n</code> (0 ≤ n ≤ 100,000), compute the sum of the numbers from 1 to <code>n</code> with a loop. Make sure there is no overflow for large <code>n</code>.',
            hints: ['For n = 100,000 the sum is 5,000,050,000, which does not fit in an <code>int</code>.', 'Make the type of <code>sum</code> <code>long long</code>.'] },
          { prompt: 'How many times does the body of the loop <code>for (int i = 0; i &lt; 10; i += 3)</code> run?', explain: 'The values of <code>i</code>: 0, 3, 6, 9. The next one is 12, and the condition is false. 4 times in total.' },
          { prompt: 'What is the main difference between a <code>do { ... } while (cond);</code> loop and <code>while</code>?', options: ['It runs faster', 'Its body runs at least once, before the condition is checked', 'You cannot write <code>break</code> inside it', 'It repeats while the condition is false'], explain: '<code>do-while</code> checks the condition at the <b>end</b> of the body, so the body always runs at least once — for example, to ask for a PIN at least once.' }
        ]
      },
      'cp-6': {
        title: 'Functions, overloading and references',
        body: `
<p>A function puts code into a named block. In C++ you write a function's return type, its name and its parameter types. A function that returns nothing is <code>void</code>.</p>
${pre(P`
int square(int x) {
    return x * x;
}
void greet(string name, string greeting = "Сәлем") {   // default argument
    cout << greeting << ", " << name << "!" << endl;
}`)}
<p>A function must be declared before it is used. If you want to write it after <code>main</code>, give its <b>prototype</b> first: <code>int square(int x);</code>.</p>
<h3>Passing by value and by reference</h3>
<p>By default an argument is <b>copied</b> (pass by value): changes inside the function do not affect the variable outside. A parameter marked with <code>&amp;</code> is a <b>reference</b>, that is, a second name for the very same variable:</p>
${pre(P`
void addBonusCopy(int salary) { salary += 50000; }      // the outside value does not change
void addBonus(int& salary)    { salary += 50000; }      // the outside value changes

int s = 300000;
addBonusCopy(s);   // s == 300000
addBonus(s);       // s == 350000`)}
<p>To pass a large object (<code>string</code>, <code>vector</code>) without copying it, but also without changing it, use a <b>const reference</b>: <code>int countSpaces(const string&amp; text)</code>. This is the most common kind of parameter in C++.</p>
<h3>Overloading</h3>
<p>You can write several functions with the same name if their parameters differ in number or type. The compiler picks the right one by looking at the arguments in the call:</p>
${pre(P`
int    area(int side)              { return side * side; }
double area(double r, bool circle) { return 3.14159 * r * r; }
int    area(int w, int h)          { return w * h; }`)}
<div class="tip">You cannot overload functions that differ only in their return type: <code>int f(int)</code> and <code>double f(int)</code> is an error, because in the call <code>f(3)</code> it is unclear which one is meant.</div>`,
        ex: [
          { prompt: 'Write the function <code>int maxOf3(int a, int b, int c)</code>: it returns the largest of three numbers. <code>main</code> is ready: it reads three numbers and prints the result.',
            hints: ['Start with <code>m = a</code> and compare it with <code>b</code> and <code>c</code>.', 'Or <code>max(a, max(b, c))</code> (<code>&lt;algorithm&gt;</code>).'] },
          { prompt: 'The function <code>swapVals(a, b)</code> should swap the values of two variables, but right now the parameters are passed as copies. Fix the function using references. <code>main</code> stays the same.',
            hints: ['Right now the function swaps copies, and <code>x</code> and <code>y</code> do not change.', 'Make the parameters <code>int&amp; a, int&amp; b</code>.'] },
          { prompt: 'Which pair of functions can you <b>not</b> write as overloads in one program?', options: ['<code>int f(int)</code> and <code>int f(double)</code>', '<code>int f(int)</code> and <code>int f(int, int)</code>', '<code>int f(int)</code> and <code>double f(int)</code>', '<code>void f(string)</code> and <code>void f(char)</code>'], explain: 'Overloads are told apart by their parameters. If only the return type differs, the call <code>f(3)</code> is ambiguous: a compile error.' },
          { prompt: 'Why is a parameter often written as <code>const string&amp; text</code>?', options: ['The string is printed faster', 'The string is not copied, and the function cannot change it by accident', 'It makes the string empty automatically', 'Without it a <code>string</code> cannot be passed to a function'], explain: 'A reference avoids copying (important for large text), and <code>const</code> forbids the function from changing it.' }
        ]
      },
      'cp-7': {
        title: 'Arrays and std::vector',
        body: `
<p>A <b>C array</b> is a fixed-size sequence of elements of one type: <code>int a[5] = {4, 8, 15, 16, 23};</code>. Its size must be known at compile time and never changes. The most dangerous part: C++ does not check whether an index goes out of bounds. <code>a[10]</code> gives no error, it just reads someone else's memory (<b>undefined behavior</b>).</p>
<h3>std::vector: a dynamic array</h3>
<p>In everyday work you use <code>vector</code> (<code>#include &lt;vector&gt;</code>): it knows its own size and grows when needed.</p>
${pre(P`
vector<int> prices;                 // empty
prices.push_back(1200);             // add to the end
prices.push_back(850);
cout << prices.size() << endl;      // 2
cout << prices[0] << endl;          // 1200 (no check)
cout << prices.at(1) << endl;       // 850  (checks bounds)
prices.pop_back();                  // remove the last one

int n;
cin >> n;
vector<int> a(n);                   // a vector of n zeros
for (int i = 0; i < n; i++) cin >> a[i];

long long sum = 0;
for (int x : a) sum += x;           // range-based for`)}
<p><code>vector&lt;int&gt; v(3)</code> is three zeros; <code>vector&lt;int&gt; v(3, 7)</code> is three sevens. A two-dimensional table is a vector of vectors:</p>
${pre(P`
vector<vector<int>> grid(3, vector<int>(4, 0));   // 3 rows, 4 columns
grid[1][2] = 5;`)}
<p>Pass a vector to a function <b>by reference</b>: <code>void fill(vector&lt;int&gt;&amp; v)</code> to change it, <code>int total(const vector&lt;int&gt;&amp; v)</code> to only read it. Otherwise the whole vector is copied.</p>
<div class="tip">When you write an index loop with the condition <code>i &lt; v.size()</code>, remember that <code>size()</code> returns an unsigned type (<code>size_t</code>). For an empty vector, <code>v.size() - 1</code> turns into a huge number, so be careful.</div>`,
        ex: [
          { prompt: 'First <code>n</code> is given, then <code>n</code> integers. Read them into a <code>vector</code> and print them in reverse order on one line, separated by spaces.',
            hints: ['Start the output loop from the end: <code>i = n - 1</code>.', '<code>for (int i = n - 1; i &gt;= 0; i--)</code>'] },
          { prompt: 'A shop\'s revenue for <code>n</code> days is given. Print the number of days when revenue was <b>strictly greater</b> than the average.',
            hints: ['First compute the sum, then <code>double avg = (double)sum / n</code>.', 'In a second loop, count the values where <code>x &gt; avg</code>.'] },
          { prompt: 'What is <code>v.size()</code> after <code>vector&lt;int&gt; v(3); v.push_back(5);</code> runs?', explain: '<code>v(3)</code> is created with three zeros, and <code>push_back</code> adds a fourth element: <code>{0, 0, 0, 5}</code>.' },
          { prompt: 'What happens if you write <code>a[10] = 1;</code> for the array <code>int a[5];</code>?', options: ['A compile error', 'The array automatically grows to 11 elements', 'Undefined behavior: it writes to someone else\'s memory, and the program may do anything', 'The value is ignored'], explain: 'A C array and <code>vector::operator[]</code> do not check bounds. The safe option is <code>v.at(i)</code>: it throws an exception when the index is out of bounds.' }
        ]
      },
      'cp-8': {
        title: 'Pointers and dynamic memory',
        body: `
<p>Every variable sits in memory at some <b>address</b>. A <b>pointer</b> is a variable that stores an address. Python and Java hide this, while C++ lets you work with memory directly: that is why it is fast, but it is also easy to make mistakes.</p>
${pre(P`
int balance = 5000;
int* p = &balance;      // &balance is the address of balance
cout << *p << endl;     // 5000: * gets the value at the address (dereference)
*p += 1000;             // balance is now 6000
int* q = nullptr;       // a pointer that points nowhere`)}
<p><code>int&amp; r = x</code> (a reference) and <code>int* p = &amp;x</code> (a pointer) are similar, but a reference is always bound to one object and cannot be null, while a pointer can be moved to another address or set to <code>nullptr</code>.</p>
<h3>Stack and heap</h3>
<p>Local variables live on the <b>stack</b> and are destroyed automatically when the function returns. Data that must live longer, or whose size is only known at run time, is allocated on the <b>heap</b> with <code>new</code>, and you must free it yourself with <code>delete</code>:</p>
${pre(P`
int* one = new int(42);
int* arr = new int[n];     // an array of n elements
// ... use them ...
delete one;
delete[] arr;              // delete[] for arrays`)}
<p>Three classic mistakes: a <b>memory leak</b> (you forgot <code>delete</code>, and memory slowly runs out), a <b>dangling pointer</b> (the memory has been freed, but the pointer still looks at that address) and a <b>double delete</b> (freeing the same memory twice).</p>
<h3>Smart pointers: why we don't write delete by hand</h3>
<p>Modern C++ (<code>&lt;memory&gt;</code>) manages memory with the <b>RAII</b> principle: when the owner is destroyed, the resource is freed automatically.</p>
${pre(P`
#include <memory>
unique_ptr<int> a = make_unique<int>(10);   // has a single owner
shared_ptr<string> s = make_shared<string>("Kaspi");
auto s2 = s;                                 // two owners; memory is freed when the last one is destroyed
// no need to write delete`)}
<div class="tip">Rule: in new code, use <code>vector</code>, <code>string</code> and <code>unique_ptr</code> instead of <code>new</code>/<code>delete</code>. Keep raw pointers only for "looking without owning". A warning: the in-browser compiler has no memory protection, so a bad pointer does not crash the program, it gives you a garbage value.</div>`,
        ex: [
          { prompt: 'Write the function <code>void addBonus(int* salary, int bonus)</code> using a pointer: it adds the bonus to the salary. Also, the function <code>int* bigger(int* a, int* b)</code> should return a pointer to the larger of the two values. <code>main</code> is ready.',
            hints: ['Change the value at the address: <code>*salary += bonus;</code>', 'To compare the values, compare <code>*a</code> and <code>*b</code>, and return the pointer itself (<code>a</code> or <code>b</code>).'] },
          { prompt: 'What is <code>b</code> after <code>int a = 5; int* p = &amp;a; *p += 3; int b = *p * 2;</code> runs?', explain: '<code>*p += 3</code> makes <code>a</code> equal to 8. <code>b = 8 * 2 = 16</code>.' },
          { prompt: 'Every time it is called, a function allocates <code>new int[1000]</code>, but <code>delete[]</code> is never called. What is this called?', options: ['Dangling pointer', 'Memory leak', 'Stack overflow', 'Null pointer'], explain: 'Memory that is allocated but never freed is a memory leak. A long-running server will slowly eat up all the memory.' },
          { prompt: 'What is the main advantage of <code>unique_ptr</code> over raw <code>new</code>/<code>delete</code>?', options: ['It allocates memory on the stack', 'It frees the memory automatically when its owner goes out of scope, and it has only one owner', 'It speeds up pointer arithmetic', 'It creates a new object when copied'], explain: '<code>unique_ptr</code> is based on RAII: its destructor calls <code>delete</code> itself. It cannot be copied; ownership can only be handed over with <code>move</code>.' }
        ]
      },
      'cp-9': {
        title: 'struct, class, constructor and destructor',
        body: `
<p>A <b>struct</b> groups several fields into one type. A <b>class</b> is the same idea, but its fields are closed (<code>private</code>) by default. The only difference is the default access: <code>public</code> in a <code>struct</code>, <code>private</code> in a <code>class</code>.</p>
${pre(P`
struct Student {
    string name;
    int score;
};
Student s{"Дана", 91};
cout << s.name << " " << s.score << endl;`)}
<h3>Encapsulation and the constructor</h3>
<p>A class lets you hide data and allow access to it only through the right methods. A <b>constructor</b> is a function with the same name as the class and no return type; it is called when an object is created. It is best to fill the fields with an <b>initializer list</b>:</p>
${pre(P`
class Account {
private:
    string owner;
    long long balance;
public:
    Account(string o, long long b) : owner(o), balance(b) {}
    void deposit(long long x) { if (x > 0) balance += x; }
    bool withdraw(long long x) {
        if (x > balance) return false;   // not enough — refuse
        balance -= x;
        return true;
    }
    long long getBalance() const { return balance; }   // const: does not change the object
};

Account acc("Ерлан", 10000);
acc.withdraw(3000);
// acc.balance = 1000000;   // error: balance is private`)}
<h3>Destructor</h3>
<p>A <b>destructor</b> <code>~ClassName()</code> is called automatically when an object is destroyed (for example, when it goes out of scope). It releases resources: memory, a file, a network connection. This is <b>RAII</b> (Resource Acquisition Is Initialization): the constructor acquires the resource and the destructor gives it back.</p>
${pre(P`
struct Logger {
    string name;
    Logger(string n) : name(n) { cout << "open " << name << endl; }
    ~Logger() { cout << "close " << name << endl; }
};
int main() {
    Logger a("A");
    Logger b("B");
}   // output: open A, open B, close B, close A`)}
<div class="tip">Local objects are destroyed in the <b>reverse</b> order of creation: the last one created is the first one destroyed (like a stack).</div>`,
        ex: [
          { prompt: 'The names and scores of <code>n</code> students are given (each line is <code>name score</code>). Using the <code>Student</code> struct, print the name of the student with the highest score. On a tie, the one who came first.',
            hints: ['Keep the index of the best student in a <code>best</code> variable.', 'Compare only with <code>&gt;</code> (strictly), so on a tie the first one stays.'] },
          { prompt: 'Finish the <code>Account</code> class: <code>deposit(x)</code> adds to the balance; <code>withdraw(x)</code> takes the money and returns <code>true</code> if there is enough, otherwise it changes nothing and returns <code>false</code>. <code>main</code> is ready: the starting balance, then commands <code>D amount</code> / <code>W amount</code>; at the end it prints the balance and the number of refused operations.',
            hints: ['Inside <code>withdraw</code>, check first: <code>if (x &gt; balance) return false;</code>', 'Only after the check, do <code>balance -= x</code> and return <code>true</code>.'] },
          { prompt: 'In <code>main</code>, first <code>Logger a("A");</code> is created, then <code>Logger b("B");</code>. In what order are the destructors called when <code>main</code> ends?', options: ['First A, then B', 'First B, then A', 'In random order', 'Destructors are not called; you must call them by hand'], explain: 'Local objects are destroyed in reverse order of creation: B, then A.' },
          { prompt: 'What is the only difference between <code>struct</code> and <code>class</code>?', options: ['A <code>struct</code> cannot have methods', 'Default access: public in a <code>struct</code>, private in a <code>class</code>', 'A <code>class</code> can only be created on the heap', 'A <code>struct</code> cannot have a constructor'], explain: 'In C++ both can have methods, constructors and inheritance. Only the default access specifier differs.' }
        ]
      },
      'cp-10': {
        title: 'Operator overloading and templates',
        body: `
<p>You can use your own type just like the built-in ones: <code>a + b</code>, <code>a == b</code>, <code>cout &lt;&lt; a</code>. To do that, you <b>overload</b> the operator: it is an ordinary function named <code>operator+</code>.</p>
${pre(P`
struct Money {
    long long tiyn;       // 1 tenge = 100 tiyn
};
Money operator+(const Money& a, const Money& b) {
    return Money{a.tiyn + b.tiyn};
}
bool operator<(const Money& a, const Money& b) {
    return a.tiyn < b.tiyn;            // now sort() can sort Money
}
ostream& operator<<(ostream& os, const Money& m) {
    os << m.tiyn / 100 << "." << m.tiyn % 100 / 10 << m.tiyn % 10 << " ₸";
    return os;                         // return the stream so calls can be chained
}
Money a{150050}, b{99950};
cout << a + b << endl;                 // 2500.00 ₸`)}
<p><code>operator&lt;&lt;</code> returns <code>ostream&amp;</code>, so the chain <code>cout &lt;&lt; a &lt;&lt; b</code> works. Overload operators in line with their meaning: <code>+</code> should behave like addition.</p>
<h3>Templates: one piece of code, many types</h3>
<p>To avoid writing the same function three times for <code>int</code>, <code>double</code> and <code>string</code>, you use a <b>template</b>. <code>T</code> is a placeholder that the compiler later replaces with a real type:</p>
${pre(P`
template <typename T>
T biggest(T a, T b) {
    return (a < b) ? b : a;
}
biggest(3, 9);                         // T = int
biggest(string("alma"), string("anar"));   // T = string

template <typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};
Box<double> price(1299.5);`)}
<p>For each type used, the compiler creates a separate version <b>at compile time</b> (instantiation), so templates are fast: there is no extra cost at run time. You have already used templates: <code>vector&lt;int&gt;</code>, <code>unique_ptr&lt;T&gt;</code>, <code>map&lt;K, V&gt;</code> are all class templates.</p>
<div class="tip">The type <code>T</code> in a template must support the operations used inside it. For <code>biggest</code>, <code>T</code> must have <code>&lt;</code>, so if you write <code>operator&lt;</code> for <code>Money</code>, <code>biggest(m1, m2)</code> works too.</div>`,
        ex: [
          { prompt: 'For the <code>Vec2</code> struct, write <code>operator+</code> (adds the coordinates) and <code>operator&lt;&lt;</code> (prints in the format <code>(x, y)</code>). <code>main</code> is ready: it reads two vectors and prints their sum.',
            hints: ['<code>return Vec2{a.x + b.x, a.y + b.y};</code>', 'Output format: <code>os &lt;&lt; "(" &lt;&lt; v.x &lt;&lt; ", " &lt;&lt; v.y &lt;&lt; ")";</code>'] },
          { prompt: 'Write the function template <code>largest</code>: it returns the largest element of a non-empty vector of any type (use only the <code>&lt;</code> operator). <code>main</code> is ready: it reads <code>n</code> integers, then <code>m</code> words, and prints the largest of each.',
            hints: ['Start with <code>T best = v[0];</code> and go through all the elements.', 'The comparison <code>if (best &lt; x) best = x;</code> works for both <code>int</code> and <code>string</code>.'] },
          { prompt: 'How should <code>operator&lt;&lt;</code> be declared for a <code>Point</code> type so that <code>cout &lt;&lt; p1 &lt;&lt; p2;</code> works?', options: ['<code>void operator&lt;&lt;(ostream os, Point p)</code>', '<code>ostream&amp; operator&lt;&lt;(ostream&amp; os, const Point&amp; p)</code>', '<code>string operator&lt;&lt;(const Point&amp; p)</code>', '<code>Point operator&lt;&lt;(ostream&amp; os, Point p)</code>'], explain: 'The stream is taken by reference (it cannot be copied) and returned as a reference, so the next <code>&lt;&lt;</code> writes to the same stream.' },
          { prompt: 'When is a template\'s code for a specific type created?', options: ['When the program runs, at the first call', 'At compile time, separately for each type used', 'Never: a template has one shared piece of code for all types', 'Only when <code>new</code> is called'], explain: 'Instantiation happens at compile time: <code>largest&lt;int&gt;</code> and <code>largest&lt;string&gt;</code> are two separate functions. That is also why errors show up at compile time.' }
        ]
      },
      'cp-11': {
        title: 'Inheritance and virtual functions',
        body: `
<p><b>Inheritance</b> lets you build a new class on top of an existing one: the derived class gets the fields and methods of the base class and adds its own.</p>
${pre(P`
class Shape {
public:
    virtual double area() const = 0;   // pure virtual: Shape is abstract
    virtual ~Shape() {}                 // virtual destructor
};
class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return 3.14159265358979 * r * r; }
};
class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
};`)}
<h3>Polymorphism: what virtual gives you</h3>
<p>You can work with a derived object through a pointer or reference to the base class. When a <code>virtual</code> method is called, the version is picked by the <b>actual type of the object</b>, not by the type of the pointer (dynamic dispatch):</p>
${pre(P`
vector<unique_ptr<Shape>> shapes;
shapes.push_back(make_unique<Circle>(1.0));
shapes.push_back(make_unique<Rect>(2, 3));
double total = 0;
for (const auto& s : shapes) total += s->area();   // Circle::area, Rect::area`)}
<p>Without <code>virtual</code>, <code>s-&gt;area()</code> always calls <code>Shape::area</code> (static binding), which is a common mistake. The <code>override</code> keyword tells the compiler "I am replacing a virtual method of the base class": if the name is wrong, the compiler warns you right away.</p>
<ul>
<li><code>= 0</code> means <b>pure virtual</b>: the base has no implementation, and you cannot create an object of such a class (an abstract class, similar to an interface in Java).</li>
<li><code>protected</code> fields are closed to the outside but open to derived classes.</li>
<li>If objects are deleted through a base pointer with <code>delete</code>, the base destructor must be <b>virtual</b>; otherwise the derived class's destructor is not called.</li>
</ul>
<div class="tip"><code>s-&gt;area()</code> is short for <code>(*s).area()</code>: accessing a member through a pointer.</div>`,
        ex: [
          { prompt: 'A list of shapes is given: <code>C r</code> is a circle, <code>R w h</code> is a rectangle. The starter code counts every area as 0 because <code>Shape::area</code> is not virtual. Fix the classes and print the total area of all shapes with 2 decimal places (π = <code>acos(-1)</code>).',
            hints: ['Make <code>area</code> in <code>Shape</code> <code>virtual</code> (or <code>virtual double area() const = 0;</code>).', 'Add <code>override</code> in the derived classes: the compiler will tell you if something is wrong.'] },
          { prompt: '<code>struct A { void hi() { cout &lt;&lt; "A"; } }; struct B : A { void hi() { cout &lt;&lt; "B"; } };</code> Then <code>A* p = new B(); p-&gt;hi();</code> What is printed?', options: ['<code>A</code>', '<code>B</code>', '<code>AB</code>', 'A compile error'], explain: '<code>hi</code> is not virtual, so the call is chosen at compile time by the pointer type (<code>A*</code>): <code>A</code>. If it were <code>virtual</code>, it would print <code>B</code>.' },
          { prompt: 'Why should the destructor of a polymorphic base class be <code>virtual</code>?', options: ['Otherwise the class does not compile', 'So that <code>Base* p = new Derived; delete p;</code> also calls the Derived destructor', 'A virtual destructor uses half as much memory', 'So that only abstract classes have a destructor'], explain: 'Without virtual, <code>delete</code> through a base pointer calls only <code>Base::~Base</code>, and the Derived resources are not freed (undefined behavior).' },
          { prompt: 'Which is true about a <code>Shape</code> class with the method <code>virtual double area() const = 0;</code>?', options: ['You can create an object with <code>Shape s;</code>', 'It is abstract: you cannot create its objects, only use it through derived classes', '<code>area</code> always returns 0', 'Derived classes must not write <code>area</code>'], explain: '<code>= 0</code> means pure virtual. A class with such a method is abstract; we use it only through a derived class that implements <code>area</code>.' }
        ]
      },
      'cp-12': {
        title: 'STL: sort, map, set, unordered_map',
        body: `
<p>The <b>STL</b> (Standard Template Library) is a set of ready-made containers and algorithms. They are templates, so they work with any type.</p>
<h3>algorithm</h3>
${pre(P`
#include <algorithm>
vector<int> v = {5, 2, 9, 1};
sort(v.begin(), v.end());                           // 1 2 5 9
sort(v.begin(), v.end(), greater<int>());           // 9 5 2 1
reverse(v.begin(), v.end());
int mx = *max_element(v.begin(), v.end());          // iterator → value via *
int cnt = count(v.begin(), v.end(), 5);

// your own order with a lambda: score descending, then by name on a tie
sort(st.begin(), st.end(), [](const Student& a, const Student& b) {
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});`)}
<p><code>v.begin()</code> and <code>v.end()</code> are <b>iterators</b>: the start of the container and the position just past its end. This is how algorithms take a range.</p>
<h3>map, unordered_map, set</h3>
${pre(P`
#include <map>
map<string, int> stock;               // keys are kept sorted (red-black tree)
stock["Алматы"] += 5;                 // a missing key is created automatically with 0
stock["Астана"] = 3;
for (const auto& [city, qty] : stock) // C++17 structured binding
    cout << city << " " << qty << endl;
if (stock.count("Шымкент") == 0) { /* not there */ }

#include <unordered_map>
unordered_map<string, int> freq;      // hash table: O(1) on average, no order

#include <set>
set<int> seen = {5, 1, 5, 3};         // {1, 3, 5}: no duplicates, sorted
seen.insert(4);`)}
<table>
<tr><th>Container</th><th>Search/insert</th><th>Order</th></tr>
<tr><td><code>map</code>, <code>set</code></td><td>O(log n)</td><td>sorted by key</td></tr>
<tr><td><code>unordered_map</code>, <code>unordered_set</code></td><td>O(1) on average</td><td>no order</td></tr>
</table>
<div class="tip">A trap: if the key is missing, <code>m[key]</code> <b>adds</b> it with a default value. If you only need to check, use <code>m.count(key)</code> or <code>m.find(key) != m.end()</code>.</div>`,
        ex: [
          { prompt: 'The words of a text (Latin letters, lowercase) are given until the input ends. Print each word and how many times it occurs, in alphabetical order: <code>word count</code>.',
            hints: ['<code>map&lt;string, int&gt; freq;</code> and <code>freq[w]++</code>.', '<code>map</code> sorts the keys by itself, so printing them in a loop is enough.'] },
          { prompt: 'Olympiad results: <code>n</code>, then lines <code>name score</code>. Sort and print them by score in descending order, and by name in alphabetical order on equal scores. Use <code>sort</code> and a lambda.',
            hints: ['<code>sort(v.begin(), v.end(), [](const P&amp; a, const P&amp; b) { ... });</code>', 'Lambda: if the scores differ, <code>a.score &gt; b.score</code>, otherwise <code>a.name &lt; b.name</code>.'] },
          { prompt: 'You often need to look up products by code among a million products, and the order of the codes does not matter. Which container fits best?', options: ['<code>vector</code> and a linear search', '<code>unordered_map</code>', '<code>map</code>, because it is always faster', 'A C array'], explain: '<code>unordered_map</code> is a hash table: lookup is O(1) on average. <code>map</code> gives O(log n); it is useful when you need order.' },
          { prompt: 'What is <code>m.size()</code> after <code>map&lt;string, int&gt; m; m["a"]++; m["b"]; if (m.count("c")) m["d"] = 1;</code> runs?', explain: '<code>m["a"]++</code> and <code>m["b"]</code> add two keys (<code>operator[]</code> creates a missing key). <code>count("c")</code> adds no key and returns 0, so <code>"d"</code> is not added either.' }
        ]
      },
      'cp-13': {
        title: 'Recursion and error handling (exceptions)',
        body: `
<p><b>Recursion</b> is when a function calls itself. Every recursive function has two parts: a <b>base case</b> (the stopping condition) and a <b>recursive step</b> that makes the problem smaller.</p>
${pre(P`
long long factorial(int n) {
    if (n <= 1) return 1;            // base case
    return n * factorial(n - 1);     // recursive step
}

// Backtracking: all binary strings of length n
void gen(string cur, int n) {
    if ((int)cur.size() == n) { cout << cur << endl; return; }
    gen(cur + "0", n);
    gen(cur + "1", n);
}`)}
<p>Each call opens a new frame on the <b>call stack</b>. If there is no base case, or the recursion is too deep, the stack overflows (<b>stack overflow</b>). The C++ stack is roomier than Python's, but it is not meant for a depth of millions; in that case use a loop.</p>
<h3>Exceptions: try, throw, catch</h3>
<p>In regular C++ an unexpected situation is reported with an <b>exception</b>. A function throws an error object with <code>throw</code>, and the caller catches it with <code>try/catch</code>:</p>
${pre(P`
#include <stdexcept>
double safeDivide(double a, double b) {
    if (b == 0) throw invalid_argument("нөлге бөлуге болмайды");
    return a / b;
}
try {
    cout << safeDivide(10, 0) << endl;
} catch (const invalid_argument& e) {
    cout << "Қате: " << e.what() << endl;
} catch (const exception& e) {        // any standard error
    cout << "Басқа қате" << endl;
}`)}
<ul>
<li><code>catch</code> blocks are checked from top to bottom; the first matching one runs, so more specific types go higher.</li>
<li><code>stoi("abc")</code> throws <code>invalid_argument</code>, and <code>v.at(100)</code> throws <code>out_of_range</code>.</li>
<li>If nobody catches an exception, the program crashes via <code>std::terminate</code>. While the stack is "unwound" (stack unwinding), the destructors of local objects are called: that is why RAII matters.</li>
</ul>
<div class="tip">The in-browser compiler on Tolqyn runs in <code>-fno-exceptions</code> mode: <code>try</code>/<code>throw</code> do not compile. Game engines and embedded systems often work this way too. So in the exercises we report an error by returning a <code>bool</code> or a special value (for example, <code>-1</code>).</div>`,
        ex: [
          { prompt: 'Write the recursive function <code>int digitSum(int n)</code>: the sum of the digits of a non-negative number. Do not use loops: <code>digitSum(n) = n % 10 + digitSum(n / 10)</code>.',
            hints: ['Base case: if <code>n &lt; 10</code>, return <code>n</code>.', 'Recursive step: <code>n % 10 + digitSum(n / 10)</code>.'] },
          { prompt: 'Backtracking: print, in lexicographic order (one per line), all binary strings of length <code>n</code> that have no two <code>1</code>s in a row. For example, <code>n = 3</code>: <code>000 001 010 100 101</code>.',
            hints: ['The starter prints every binary string. Check the last character before adding a <code>1</code>.', '<code>if (cur.empty() || cur.back() != \'1\') gen(cur + "1", n);</code>'] },
          { prompt: 'What does <code>try { cout &lt;&lt; "1"; throw runtime_error("x"); cout &lt;&lt; "2"; } catch (const exception&amp; e) { cout &lt;&lt; "3"; } cout &lt;&lt; "4";</code> print? (With a regular compiler, exceptions enabled.)', options: ['<code>1234</code>', '<code>134</code>', '<code>13</code>', '<code>14</code>'], explain: 'After <code>throw</code> the rest of the <code>try</code> block (<code>"2"</code>) is skipped; <code>runtime_error</code> derives from <code>exception</code>, so the catch handles it (<code>"3"</code>), and then the program continues (<code>"4"</code>).' },
          { prompt: 'What happens if no <code>catch</code> handles a thrown exception?', options: ['It is silently ignored', 'The function returns 0', 'The program crashes via <code>std::terminate</code>', 'The compiler finds it in advance and gives a compile error'], explain: 'An uncaught exception unwinds the stack all the way out of <code>main</code>, and then <code>std::terminate</code> stops the program.' }
        ]
      },
      'cp-p1': {
        title: 'Problems: Easy and Medium',
        body: `
<p>This lesson is a set of algorithmic problems in C++: small LeetCode- and olympiad-style tasks. In each problem you read the input from stdin and print the answer to stdout.</p>
<h3>An olympiad-style C++ template</h3>
${pre(P`
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);   // speeds up cin/cout
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    // ... solution ...
    return 0;
}`)}
<ul>
<li><b>Edge cases:</b> one element, all elements equal, negative numbers, an empty answer.</li>
<li><b>Types:</b> <code>long long</code> for sums and products.</li>
<li><b>Complexity:</b> if n ≤ 1000, O(n²) is enough; if n ≤ 10⁵, you need O(n log n) or O(n).</li>
<li><b>Answer format:</b> do not print extra text or extra blank lines.</li>
</ul>
<div class="tip">First solve a small example by hand on paper: once the algorithm is clear, the C++ code almost writes itself.</div>`,
        ex: [
          { prompt: '<b>Palindrome.</b> One word of lowercase Latin letters is given. If it reads the same forwards and backwards, print <code>YES</code>, otherwise <code>NO</code>. Use two pointers.',
            hints: ['Start with <code>i = 0</code>, <code>j = s.size() - 1</code> and move towards the middle.', 'If <code>s[i] != s[j]</code>, it is not a palindrome.'] },
          { prompt: '<b>FizzBuzz.</b> Print each number from 1 to <code>n</code> on its own line, but if it is divisible by 3 print <code>Fizz</code>, by 5 print <code>Buzz</code>, and by both print <code>FizzBuzz</code>.',
            hints: ['The order of the conditions matters: check divisibility by 15 first.', '<code>if (i % 15 == 0)</code> → <code>FizzBuzz</code>.'] },
          { prompt: '<b>Second place.</b> <code>n</code> numbers are given. Print the second largest among the distinct values. If there is no such value (all are equal), print <code>NONE</code>. Try to solve it in a single pass (O(n)).',
            hints: ['Keep two variables, <code>first</code> and <code>second</code>, plus a flag saying whether <code>second</code> exists.', 'When a new maximum comes, the old <code>first</code> moves to <code>second</code>; ignore values equal to <code>first</code>.'] },
          { prompt: '<b>Two Sum.</b> <code>n</code>, <code>target</code>, then <code>n</code> numbers are given. Print the indices <code>i j</code> (from 0, <code>i &lt; j</code>) of the two elements whose sum is <code>target</code>. There is guaranteed to be exactly one answer. Solve it in O(n) with <code>unordered_map</code>.',
            hints: ['For each <code>a[j]</code>, check whether <code>target - a[j]</code> has appeared before.', '<code>pos</code> maps a value to its index; write <code>pos[a[j]] = j</code> only after the check.'] },
          { prompt: 'About how many comparisons does binary search make in a sorted <code>vector</code> of 1,000 elements in the worst case? (A whole number, ⌈log₂ 1000⌉.)', explain: 'Each step halves the range: 2¹⁰ = 1024 ≥ 1000, so 10 steps are enough.' }
        ]
      },
      'cp-p2': {
        title: 'Problems: Medium and Hard',
        body: `
<p>The problems in this set are at interview and olympiad level: stack, sliding window, binary search, BFS and dynamic programming. You now implement with the C++ STL the ideas you met in the DSA module in Python.</p>
<table>
<tr><th>Idea</th><th>C++ tool</th></tr>
<tr><td>Stack</td><td><code>vector</code> (<code>push_back</code>, <code>back</code>, <code>pop_back</code>) or <code>string</code></td></tr>
<tr><td>Queue (BFS)</td><td><code>vector</code> + a "head" index (<code>head</code>)</td></tr>
<tr><td>Last position seen</td><td><code>vector&lt;int&gt; last(256, -1)</code> or <code>unordered_map</code></td></tr>
<tr><td>Binary search</td><td><code>lower_bound(v.begin(), v.end(), x)</code></td></tr>
<tr><td>DP table</td><td><code>vector&lt;long long&gt; dp(n + 1, INF)</code></td></tr>
</table>
${pre(P`
// lower_bound: iterator to the first element not less than x
vector<int> v = {1, 3, 3, 5, 8};
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();   // 1
bool found = idx < (int)v.size() && v[idx] == 3;            // true

// 4 neighbours in a grid
int dr[4] = {1, -1, 0, 0};
int dc[4] = {0, 0, 1, -1};`)}
<div class="tip"><code>&lt;queue&gt;</code> is handy for BFS, but a plain <code>vector</code> with a <code>head</code> index is entirely enough: <code>while (head &lt; (int)q.size()) { auto cur = q[head++]; ... }</code>.</div>`,
        ex: [
          { prompt: '<b>Brackets.</b> A non-empty string of the characters <code>()[]{}</code> is given. If the brackets are closed correctly, print <code>YES</code>, otherwise <code>NO</code>. Use a <code>vector&lt;char&gt;</code> or a <code>string</code> as the stack.',
            hints: ['Push each opening bracket onto the stack; when a closing one comes, the top of the stack must match it.', 'At the end the stack must be empty: <code>((</code> is <code>NO</code>.'] },
          { prompt: '<b>Longest substring without repeats.</b> A string of Latin letters is given. Print the length of the longest <b>contiguous</b> part in which no character repeats. Use a sliding window, O(n).',
            hints: ['<code>last[c]</code> is the index where character <code>c</code> was last seen. The left edge of the window is <code>left</code>.', 'If <code>last[c] &gt;= left</code>, then <code>left = last[c] + 1</code>; the length is <code>i - left + 1</code>.'] },
          { prompt: '<b>First position.</b> <code>n</code> numbers sorted in non-decreasing order and <code>q</code> queries are given. For each query <code>x</code>, print on its own line the index (from 0) where <code>x</code> first appears, or <code>-1</code> if it is not there. O(log n) per query: write binary search yourself or use <code>lower_bound</code>.',
            hints: ['<code>lower_bound</code> gives the first element not less than <code>x</code>; the index is <code>it - a.begin()</code>.', 'Check that the found position really holds <code>x</code>; otherwise print <code>-1</code>.'] },
          { prompt: '<b>Maze (BFS).</b> <code>n m</code> and a grid of <code>n</code> lines are given: <code>.</code> is free, <code>#</code> is a wall. Print the smallest number of steps (up/down/left/right) from the top-left corner (0,0) to the bottom-right corner (n−1,m−1). If there is no path, print <code>-1</code>. The starting cell is guaranteed to be free.',
            hints: ['Fill a <code>dist</code> table with -1; this also marks "not visited".', 'The queue is a <code>vector&lt;pair&lt;int,int&gt;&gt;</code> with a <code>head</code> index. Add a neighbour only if it is inside the grid, not a wall, and not visited yet.'] },
          { prompt: '<b>Coin change (DP).</b> <code>k</code> coin denominations and an amount <code>amount</code> are given (unlimited coins of each). Print the smallest number of coins needed to make <code>amount</code>; if it is impossible, print <code>-1</code>. <code>dp[s]</code> is the smallest number of coins for the sum <code>s</code>.',
            hints: ['The greedy starter (start from the largest coin) gives 3 for <code>1 3 4</code> and 6, but the right answer is 2 (3+3).', '<code>dp[0] = 0</code>; for each <code>s</code>, <code>dp[s] = min(dp[s], dp[s - c] + 1)</code>.'] }
        ]
      },
      'cp-gate': {
        title: 'Module exam: C++',
        body: `
<p>The final exam covers the whole module: references and pointers, virtual dispatch, STL containers, a class template and recursion. To pass, you need at least <b>75%</b> of the points.</p>
<ul>
<li>Keep the output format exact: an extra space or extra text counts as wrong.</li>
<li>Use <code>long long</code> for large sums.</li>
<li>First test your code on a small example with "Run", then press "Check".</li>
</ul>`,
        ex: [
          { prompt: '<code>void f(int a, int&amp; b, int* c) { a++; b++; (*c)++; }</code>. What are <code>x y z</code> after <code>int x = 1, y = 1, z = 1; f(x, y, &amp;z);</code> runs?', options: ['<code>1 1 1</code>', '<code>2 2 2</code>', '<code>1 2 2</code>', '<code>1 2 1</code>'], explain: '<code>a</code> is a copy, so <code>x</code> does not change. <code>b</code> is a reference, so <code>y</code> becomes 2. <code>c</code> is the address of <code>z</code>, and <code>(*c)++</code> makes it 2.' },
          { prompt: '<code>struct A { virtual string who() { return "A"; } }; struct B : A { string who() override { return "B"; } };</code>. If <code>B b; A a = b; A&amp; r = b;</code>, what does <code>a.who() + r.who()</code> give?', options: ['<code>AA</code>', '<code>AB</code>', '<code>BB</code>', '<code>BA</code>'], explain: '<code>A a = b</code> copies by value: the B part is "sliced off" (object slicing), and <code>a</code> really is an A. But <code>r</code> is a reference to a B object, so the virtual call goes to <code>B::who</code>.' },
          { prompt: 'What is <code>m[1]</code> after <code>set&lt;int&gt; s = {4, 1, 4, 2}; s.insert(1); s.insert(3); unordered_map&lt;int, int&gt; m; for (int x : s) m[x % 2]++;</code> runs?', explain: 'The set removes duplicates: <code>{1, 2, 3, 4}</code>. The odd numbers are 1 and 3, so <code>m[1] = 2</code>.' },
          { prompt: '<b>Sales by city.</b> <code>n</code> orders are given, each as <code>city amount</code> (the city name is one Latin word, the amount is in tenge). Print the total sales of each city in alphabetical order of city names, as <code>city amount</code>. On the last line, print the name of the city with the highest sales (on a tie, the first alphabetically). The amounts can be large.',
            hints: ['<code>map&lt;string, long long&gt;</code>: city → total amount, with keys sorted alphabetically.', 'Find the maximum in the output loop with <code>&gt;</code>: on a tie, the first alphabetically stays.'] },
          { prompt: '<b>Stack template.</b> Finish the class template <code>Stack&lt;T&gt;</code> based on <code>vector&lt;T&gt;</code>: <code>push</code>, <code>pop</code>, <code>top</code>, <code>empty</code>, <code>size</code>. <code>main</code> is ready: the commands are <code>push X</code>, <code>pop</code>, <code>top</code>, <code>size</code>. If <code>pop</code> or <code>top</code> comes on an empty stack, <code>EMPTY</code> is printed.',
            hints: ['The top of the stack is the <b>end</b> of the vector: <code>data.back()</code>.', '<code>pop</code> is <code>data.pop_back()</code>.'] },
          { prompt: '<b>N queens.</b> In how many ways can you place <code>n</code> queens on an <code>n × n</code> chessboard so that none attack each other (no two share a row, a column or a diagonal)? 1 ≤ n ≤ 8. Backtracking: place them row by row and mark columns and both diagonals as taken.',
            hints: ['On one diagonal <code>r + c</code> is constant, on the other <code>r - c</code> is constant (add <code>+ n - 1</code> for the index).', 'Place a queen, call <code>place(r + 1)</code>, then remove the marks again (backtrack).'] }
        ]
      }
    }
  });
})();
