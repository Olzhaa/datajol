// CP1 C++: Russian text. Code, solutions and expected output are in content/cpp.js.
// Expected program output (strings like «Сәлем», «Суық», day names) stays in Kazakh, as the checker compares it.
(function () {
  const P = String.raw;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const pre = s => '<pre><code>' + esc(s.replace(/^\n/, '')) + '</code></pre>';

  DJ.i18n.patch({
    modules: {
      'cpp-1': { intro: 'Основы C++: cout/cin, типы, string, условия и циклы, функции и ссылки, vector, указатели и динамическая память, классы, перегрузка операторов, шаблоны, наследование, STL и рекурсия. Каждое задание — полноценная программа, которая читает из stdin и пишет в stdout; в конце — сборник задач уровней «Лёгкий / Средний / Сложный» и экзамен.' }
    },
    lessons: {
      'cp-1': {
        title: 'Первая программа: main, cout, cin',
        body: `
<p><b>C++</b> — компилируемый язык, созданный ради скорости: на нём написаны игровые движки (Unreal Engine), браузеры, базы данных и даже внутреннее ядро PyTorch и NumPy. Отличие от Python: код сначала переводится <b>компилятором</b> (compiler) в машинный код и только потом запускается. Ошибки чаще всего находятся ещё до запуска, во время компиляции.</p>
<h3>Структура программы</h3>
${pre(P`
#include <iostream>      // библиотека ввода/вывода
using namespace std;     // чтобы не писать std:: каждый раз

int main() {             // программа начинается здесь
    cout << "Сәлем, Алматы!" << endl;
    return 0;            // 0 — «всё завершилось успешно»
}`)}
<ul>
<li><code>#include</code> подключает библиотеку. <code>cout</code> и <code>cin</code> находятся в <code>&lt;iostream&gt;</code>.</li>
<li><code>int main()</code> — точка входа, которая есть в каждой программе ровно одна.</li>
<li>Каждая инструкция заканчивается <b>точкой с запятой</b> <code>;</code>. Блоки обозначаются фигурными скобками <code>{ }</code>, а отступы (indentation) нужны только для удобства чтения.</li>
<li><code>cout &lt;&lt;</code> — вывод на экран; через <code>&lt;&lt;</code> можно передавать несколько значений подряд. <code>endl</code> — новая строка.</li>
</ul>
<h3>Ввод: cin</h3>
${pre(P`
int a, b;
cin >> a >> b;           // "3 4" или "3\n4" — работают оба варианта
cout << a + b << endl;   // 7`)}
<p><code>cin &gt;&gt;</code> пропускает пробелы и переводы строк и читает следующее значение в соответствии с типом переменной. Перед использованием переменной обязательно объявите её тип: <code>int a;</code>.</p>
<div class="tip">В Tolqyn каждое задание — полноценная программа. При проверке ей подаётся готовый ввод (stdin), а ваш вывод (stdout) построчно сравнивается с ожидаемым ответом. Поэтому не выводите лишний текст (вроде «Введите число:»).</div>`,
        ex: [
          { prompt: 'Программа читает одно слово — имя человека — и выводит <code>Сәлем, &lt;имя&gt;!</code> («Привет, &lt;имя&gt;!» по-казахски). Например, ввод <code>Айгерім</code> → <code>Сәлем, Айгерім!</code>',
            starter: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    // прочитайте имя и поздоровайтесь
    cout << "Сәлем!" << endl;
    return 0;
}
`,
            hints: ['<code>cin &gt;&gt; name;</code> читает имя.', '<code>cout &lt;&lt; "Сәлем, " &lt;&lt; name &lt;&lt; "!" &lt;&lt; endl;</code>'] },
          { prompt: 'Даны два целых числа <code>a</code> и <code>b</code>. Выведите в первой строке их сумму, во второй — произведение.',
            hints: ['Добавьте вторую строку с <code>cout</code>.', '<code>cout &lt;&lt; a * b &lt;&lt; endl;</code>'] },
          { prompt: 'С какой функции начинается выполнение программы на C++?', options: ['С первой функции в файле', 'С функции <code>main()</code>', 'Со строки <code>#include</code>', 'С функции <code>start()</code>'], explain: 'В каждой программе на C++ есть одна функция <code>main</code>; операционная система запускает программу именно с неё.' }
        ]
      },
      'cp-2': {
        title: 'Типы, переменные и арифметика',
        body: `
<p>C++ — язык со <b>статической типизацией</b>: тип каждой переменной известен на этапе компиляции и потом не меняется. Тип определяет, сколько памяти выделяется под переменную и какие операции с ней можно выполнять.</p>
<table>
<tr><th>Тип</th><th>Что хранит</th><th>Пример</th></tr>
<tr><td><code>int</code></td><td>целое число, примерно ±2,1 млрд</td><td><code>int age = 19;</code></td></tr>
<tr><td><code>long long</code></td><td>большое целое число, примерно ±9,2·10¹⁸</td><td><code>long long people = 8000000000LL;</code></td></tr>
<tr><td><code>double</code></td><td>дробное число</td><td><code>double price = 1299.5;</code></td></tr>
<tr><td><code>char</code></td><td>один символ (1 байт)</td><td><code>char grade = 'A';</code></td></tr>
<tr><td><code>bool</code></td><td><code>true</code> / <code>false</code></td><td><code>bool paid = true;</code></td></tr>
</table>
<p><code>auto</code> поручает вывод типа компилятору: <code>auto x = 3.5;</code> — это <code>double</code>. <code>const</code> создаёт неизменяемое значение: <code>const int DAYS = 7;</code>.</p>
<h3>Целочисленное деление — главная ловушка</h3>
${pre(P`
cout << 7 / 2 << endl;        // 3   — два int: дробная часть отбрасывается
cout << 7 % 2 << endl;        // 1   — остаток
cout << 7.0 / 2 << endl;      // 3.5 — если один операнд double, результат double
int total = 10000, n = 3;
double share = static_cast<double>(total) / n;   // 3333.33...`)}
<p>Обратите внимание: если написать <code>double d = 7 / 2;</code>, то сначала <code>7 / 2</code> вычисляется как целое и получается 3, и только потом это значение записывается в <code>d</code> как 3.0.</p>
<h3>Переполнение и вывод дробей</h3>
<p>Если значение выходит за пределы <code>int</code> (overflow), C++ не сообщает об ошибке — значение «заворачивается» и превращается в неверное число. Если сумма или произведение могут быть большими, используйте <code>long long</code>.</p>
${pre(P`
#include <iomanip>
double avg = 2250.0;
cout << fixed << setprecision(2) << avg << endl;   // 2250.00`)}
<div class="tip"><code>fixed &lt;&lt; setprecision(2)</code> — ровно 2 цифры после запятой. Эта настройка действует на весь последующий вывод <code>double</code>.</div>`,
        ex: [
          { prompt: 'Друзья делят счёт в ресторане поровну. Даны общая сумма (в тенге, целое число) и количество человек. Выведите долю каждого с 2 цифрами после запятой. Например, <code>10000 3</code> → <code>3333.33</code>.',
            hints: ['<code>total / people</code> — целочисленное деление. Сначала сделайте <code>static_cast&lt;double&gt;(total)</code>.', '<code>cout &lt;&lt; fixed &lt;&lt; setprecision(2) &lt;&lt; share;</code>'] },
          { prompt: 'Чему равно <code>x</code> после выполнения <code>int x = 17 / 5 * 2;</code>?', explain: '<code>17 / 5</code> — целочисленное деление: 3. Затем <code>3 * 2 = 6</code>.' },
          { prompt: 'Чему равно <code>d</code> после выполнения <code>double d = 7 / 2;</code>?', explain: 'Правая часть состоит из двух <code>int</code>, поэтому <code>7 / 2 = 3</code> вычисляется как целое, и только потом записывается в <code>double</code> как 3.0. Правильно: <code>7.0 / 2</code>.' },
          { prompt: 'Какой тип подходит для хранения населения Земли (примерно 8 000 000 000 человек)?', options: ['<code>int</code>', '<code>char</code>', '<code>long long</code>', '<code>bool</code>'], explain: '<code>int</code> вмещает значения только примерно до 2,1 млрд. Для 8 млрд нужен <code>long long</code>.' }
        ]
      },
      'cp-3': {
        title: 'Строки: std::string',
        body: `
<p>В C++ текст хранится в классе <code>std::string</code> (<code>#include &lt;string&gt;</code>). Он похож на строку Python, но <b>изменяемый</b>: отдельный символ можно заменить напрямую.</p>
${pre(P`
string city = "Astana";
cout << city.size() << endl;        // 6
cout << city[0] << endl;            // A  (char)
city[0] = 'a';                      // "astana" — изменять можно
string full = city + " city";       // конкатенация
cout << city.substr(1, 3) << endl;  // "sta": 3 символа начиная с позиции 1
cout << city.find("na") << endl;    // 3; если не найдено — string::npos
string s = to_string(2025);         // число → строка
int n = stoi("42");                 // строка → число`)}
<h3>cin и getline</h3>
<p><code>cin &gt;&gt; s</code> читает одно <b>слово</b>: чтение останавливается на пробеле. Чтобы прочитать всю строку, нужен <code>getline</code>:</p>
${pre(P`
string line;
getline(cin, line);       // "Нұр Сұлтан даңғылы 12" — вся строка целиком`)}
<p>Если сначала вызвать <code>cin &gt;&gt; n</code>, а затем <code>getline</code>, символ перевода строки в конце первой строки остаётся во вводе, и <code>getline</code> прочитает пустую строку. Решение — вызвать между ними <code>cin.ignore();</code>.</p>
<h3>Работа с символами</h3>
${pre(P`
for (char c : line) {                // range-based for
    if (c == ' ') continue;
    char up = toupper(c);            // 'a' → 'A'
}`)}
<div class="tip"><b>Кириллица и UTF-8:</b> <code>size()</code> считает не символы, а <b>байты</b>. Латинская буква — 1 байт, а кириллические буквы, в том числе казахские «Ә», «Қ», — 2 байта. Поэтому <code>string("Қала").size()</code> равно 8. В заданиях на уровне символов мы используем латинский текст.</div>`,
        ex: [
          { prompt: 'Даны имя и фамилия (латиницей, через пробел). Выведите их в формате <code>Фамилия И.</code>: <code>Aigerim Nurlanova</code> → <code>Nurlanova A.</code>',
            hints: ['Первая буква имени — <code>first[0]</code>.', '<code>cout &lt;&lt; last &lt;&lt; " " &lt;&lt; first[0] &lt;&lt; ".";</code>'] },
          { prompt: 'Дана одна строка текста (латиницей, с пробелами). Выведите количество гласных в ней: <code>a e i o u</code>, заглавные буквы тоже считаются.',
            hints: ['Прочитайте всю строку через <code>getline(cin, line)</code>: <code>cin &gt;&gt;</code> берёт только первое слово.', 'Переведите каждый символ в нижний регистр через <code>tolower(c)</code> и сравните с пятью гласными.'] },
          { prompt: 'Ввод: <code>Нұр Сұлтан</code>. Чему будет равно <code>s</code> после <code>string s; cin &gt;&gt; s;</code>?', options: ['<code>"Нұр Сұлтан"</code>', '<code>"Нұр"</code>', '<code>"Сұлтан"</code>', 'Пустая строка'], explain: '<code>cin &gt;&gt;</code> читает одно слово до пробела. Для всей строки — <code>getline(cin, s)</code>.' },
          { prompt: 'Если <code>string s = "Astana";</code>, что вернёт <code>s.substr(1, 3)</code>?', options: ['<code>"Ast"</code>', '<code>"sta"</code>', '<code>"st"</code>', '<code>"stan"</code>'], explain: '<code>substr(pos, len)</code>: 3 символа начиная с индекса 1 (второй символ, <code>s</code>) — <code>"sta"</code>.' }
        ]
      },
      'cp-4': {
        title: 'Условия: if/else и switch',
        body: `
<p>В зависимости от условия программа выбирает разные пути. Операторы сравнения: <code>== != &lt; &gt; &lt;= &gt;=</code>; логические: <code>&amp;&amp;</code> (и), <code>||</code> (или), <code>!</code> (не). Условие берётся в скобки.</p>
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
string status = (temp > 30) ? "Ыстық" : "Қалыпты";   // тернарный оператор`)}
<p>Ловушка: <code>if (x = 5)</code> — это не сравнение, а <b>присваивание</b>. Такое условие всегда истинно. Для сравнения пишите <code>==</code> (компилятор обычно выдаёт предупреждение).</p>
<h3>switch</h3>
<p>Когда одно целое значение (или <code>char</code>) сравнивается с несколькими конкретными значениями, <code>switch</code> получается компактнее:</p>
${pre(P`
char cmd;
cin >> cmd;
switch (cmd) {
    case 'D': cout << "Депозит" << endl; break;
    case 'W': cout << "Ақша алу" << endl; break;
    case 'q':
    case 'Q': cout << "Шығу" << endl; break;   // два case в одном блоке
    default:  cout << "Белгісіз команда" << endl;
}`)}
<p><b>break</b> важен: если его забыть, выполнение «проваливается» в следующий <code>case</code> (fallthrough) и выполняет и его код. <code>switch</code> не работает со значениями <code>string</code> или <code>double</code> — в таких случаях используйте цепочку <code>if/else if</code>.</p>
<div class="tip">В C++ <code>0</code> — ложь, любое другое число — истина. Поэтому <code>if (n % 2)</code> означает «если n нечётное».</div>`,
        ex: [
          { prompt: 'Дана температура воздуха (целое число). Если она ниже 0, выведите <code>Суық</code> (холодно), от 0 до 15 включительно — <code>Салқын</code> (прохладно), выше 15 — <code>Жылы</code> (тепло).',
            hints: ['Три ветки: <code>if (t &lt; 0)</code>, <code>else if (t &lt;= 15)</code>, <code>else</code>.', 'Проверьте границы: 0 и 15 — это <code>Салқын</code>.'] },
          { prompt: 'Дан номер дня недели (1–7). С помощью <code>switch</code> выведите название дня по-казахски: Дүйсенбі, Сейсенбі, Сәрсенбі, Бейсенбі, Жұма, Сенбі, Жексенбі (с понедельника по воскресенье). Для любого другого числа — <code>Қате</code> (ошибка).',
            hints: ['В стартовом коде нет <code>break</code>: если ввести 1, выведется ещё и «Қате».', 'Поставьте <code>break;</code> в конце каждого <code>case</code> и добавьте дни 2–7.'] },
          { prompt: 'Что выведет <code>int x = 2; switch (x) { case 1: cout &lt;&lt; "A"; case 2: cout &lt;&lt; "B"; case 3: cout &lt;&lt; "C"; break; default: cout &lt;&lt; "D"; }</code>?', options: ['<code>B</code>', '<code>BC</code>', '<code>BCD</code>', '<code>ABC</code>'], explain: 'Выполнение начинается с <code>case 2</code>, а поскольку <code>break</code> нет, оно проваливается в <code>case 3</code> (fallthrough), затем <code>break</code> его останавливает: <code>BC</code>.' },
          { prompt: 'Чему равно <code>x</code> после выполнения <code>int x = 5; if (x &gt; 3 &amp;&amp; x &lt; 5) x += 10; else x *= 2;</code>?', explain: '<code>x &lt; 5</code> ложно (5 не меньше 5), поэтому всё выражение с <code>&amp;&amp;</code> ложно и выполняется <code>else</code>: 5 · 2 = 10.' }
        ]
      },
      'cp-5': {
        title: 'Циклы: for, while, do-while',
        body: `
<p>Цикл повторяет одно действие много раз. В C++ есть три основных вида циклов.</p>
${pre(P`
for (int i = 1; i <= 5; i++) {     // начало; условие; шаг
    cout << i << " ";              // 1 2 3 4 5
}

int balance = 1000;
int months = 0;
while (balance < 2000) {           // пока условие истинно
    balance += balance / 10;       // рост 10% в месяц
    months++;
}

int pin;
do {
    cin >> pin;                    // выполняется хотя бы один раз
} while (pin != 1234);`)}
<p><code>break</code> сразу выходит из цикла, <code>continue</code> пропускает остаток текущей итерации и переходит к следующей. Цикл внутри цикла (nested loop) нужен для двумерных структур вроде таблицы или треугольника:</p>
${pre(P`
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) cout << "*";
    cout << endl;
}
// *
// **
// ***`)}
<h3>Чтение до конца ввода</h3>
<p>Если количество чисел заранее неизвестно, используйте <code>while (cin &gt;&gt; x)</code>: когда чтение не удаётся (ввод закончился, EOF), условие становится ложным.</p>
${pre(P`
long long sum = 0;
int x;
while (cin >> x) sum += x;`)}
<div class="tip">Если сумма может быть большой, берите <code>long long</code>: сумма чисел от 1 до 100 000 равна 5 000 050 000 — это больше предела <code>int</code>.</div>`,
        ex: [
          { prompt: 'Дано <code>n</code>. Выведите треугольник из звёздочек высотой <code>n</code> строк: в <code>i</code>-й строке <code>i</code> звёздочек <code>*</code>.',
            hints: ['Нужен вложенный цикл: <code>for (int j = 1; j &lt;= i; j++)</code>.', 'Выводите <code>endl</code> только после внутреннего цикла.'] },
          { prompt: 'Дано <code>n</code> (0 ≤ n ≤ 100 000). Вычислите в цикле сумму чисел от 1 до <code>n</code>. Следите, чтобы при большом <code>n</code> не было переполнения.',
            hints: ['При n = 100 000 сумма равна 5 000 050 000 — она не помещается в <code>int</code>.', 'Сделайте тип <code>sum</code> равным <code>long long</code>.'] },
          { prompt: 'Сколько раз выполнится тело цикла <code>for (int i = 0; i &lt; 10; i += 3)</code>?', explain: 'Значения <code>i</code>: 0, 3, 6, 9. Следующее — 12, условие ложно. Всего 4 раза.' },
          { prompt: 'В чём главное отличие цикла <code>do { ... } while (cond);</code> от <code>while</code>?', options: ['Он работает быстрее', 'Его тело выполняется хотя бы один раз ещё до проверки условия', 'Внутри него нельзя писать <code>break</code>', 'Он повторяется, пока условие ложно'], explain: '<code>do-while</code> проверяет условие <b>в конце</b> тела, поэтому тело всегда выполняется хотя бы один раз — например, чтобы хотя бы раз запросить PIN-код.' }
        ]
      },
      'cp-6': {
        title: 'Функции, перегрузка и ссылки',
        body: `
<p>Функция выделяет код в именованный блок. В C++ у функции указываются тип возвращаемого значения, имя и типы параметров. Функция, которая ничего не возвращает, — <code>void</code>.</p>
${pre(P`
int square(int x) {
    return x * x;
}
void greet(string name, string greeting = "Сәлем") {   // аргумент по умолчанию
    cout << greeting << ", " << name << "!" << endl;
}`)}
<p>Функция должна быть объявлена до использования. Если хотите написать её после <code>main</code>, заранее укажите её <b>прототип</b>: <code>int square(int x);</code>.</p>
<h3>Передача по значению и по ссылке</h3>
<p>По умолчанию аргумент <b>копируется</b> (pass by value): изменения внутри функции не влияют на внешнюю переменную. Параметр со знаком <code>&amp;</code> — это <b>ссылка</b> (reference), то есть второе имя той же самой переменной:</p>
${pre(P`
void addBonusCopy(int salary) { salary += 50000; }      // внешнее значение не меняется
void addBonus(int& salary)    { salary += 50000; }      // внешнее значение меняется

int s = 300000;
addBonusCopy(s);   // s == 300000
addBonus(s);       // s == 350000`)}
<p>Чтобы передать большой объект (<code>string</code>, <code>vector</code>) без копирования, но и без права его изменять, используют <b>константную ссылку</b> (const reference): <code>int countSpaces(const string&amp; text)</code>. Это самый распространённый вид параметра в C++.</p>
<h3>Перегрузка (overloading)</h3>
<p>Можно написать несколько функций с одним именем, если у них разное количество или разные типы параметров. Компилятор выбирает нужную по аргументам вызова:</p>
${pre(P`
int    area(int side)              { return side * side; }
double area(double r, bool circle) { return 3.14159 * r * r; }
int    area(int w, int h)          { return w * h; }`)}
<div class="tip">Нельзя перегрузить функции, которые отличаются только типом возвращаемого значения: <code>int f(int)</code> и <code>double f(int)</code> — ошибка, потому что при вызове <code>f(3)</code> непонятно, какая из них имеется в виду.</div>`,
        ex: [
          { prompt: 'Напишите функцию <code>int maxOf3(int a, int b, int c)</code>: она должна возвращать наибольшее из трёх чисел. <code>main</code> готов: он читает три числа и выводит результат.',
            hints: ['Начните с <code>m = a</code> и сравните с <code>b</code> и <code>c</code>.', 'Или <code>max(a, max(b, c))</code> (<code>&lt;algorithm&gt;</code>).'] },
          { prompt: 'Функция <code>swapVals(a, b)</code> должна менять местами значения двух переменных, но сейчас параметры передаются копиями. Исправьте функцию с помощью ссылок. <code>main</code> не меняется.',
            hints: ['Сейчас функция меняет местами копии, а <code>x</code> и <code>y</code> не меняются.', 'Сделайте параметры <code>int&amp; a, int&amp; b</code>.'] },
          { prompt: 'Какую пару функций <b>нельзя</b> написать в одной программе как перегрузку?', options: ['<code>int f(int)</code> и <code>int f(double)</code>', '<code>int f(int)</code> и <code>int f(int, int)</code>', '<code>int f(int)</code> и <code>double f(int)</code>', '<code>void f(string)</code> и <code>void f(char)</code>'], explain: 'Перегрузки различаются по параметрам. Если отличается только тип возвращаемого значения, вызов <code>f(3)</code> неоднозначен — ошибка компиляции.' },
          { prompt: 'Почему параметр часто записывают как <code>const string&amp; text</code>?', options: ['Строка быстрее выводится на экран', 'Строка не копируется, и функция не может случайно её изменить', 'Это автоматически делает строку пустой', 'Без этого <code>string</code> нельзя передать в функцию'], explain: 'Ссылка избавляет от копирования (это важно для большого текста), а <code>const</code> запрещает функции её изменять.' }
        ]
      },
      'cp-7': {
        title: 'Массив и std::vector',
        body: `
<p><b>C-массив</b> — последовательность элементов одного типа фиксированного размера: <code>int a[5] = {4, 8, 15, 16, 23};</code>. Его размер должен быть известен при компиляции и не меняется. Самое опасное — C++ не проверяет выход индекса за границы: <code>a[10]</code> не вызывает ошибку, а просто читает чужую память (<b>undefined behavior</b>, неопределённое поведение).</p>
<h3>std::vector — динамический массив</h3>
<p>В повседневной работе используют <code>vector</code> (<code>#include &lt;vector&gt;</code>): он знает свой размер и растёт по мере необходимости.</p>
${pre(P`
vector<int> prices;                 // пустой
prices.push_back(1200);             // добавить в конец
prices.push_back(850);
cout << prices.size() << endl;      // 2
cout << prices[0] << endl;          // 1200 (без проверки)
cout << prices.at(1) << endl;       // 850  (проверяет границы)
prices.pop_back();                  // удалить последний

int n;
cin >> n;
vector<int> a(n);                   // вектор из n нулей
for (int i = 0; i < n; i++) cin >> a[i];

long long sum = 0;
for (int x : a) sum += x;           // range-based for`)}
<p><code>vector&lt;int&gt; v(3)</code> — три нуля; <code>vector&lt;int&gt; v(3, 7)</code> — три семёрки. Двумерная таблица — это вектор векторов:</p>
${pre(P`
vector<vector<int>> grid(3, vector<int>(4, 0));   // 3 строки, 4 столбца
grid[1][2] = 5;`)}
<p>Передавайте вектор в функцию <b>по ссылке</b>: <code>void fill(vector&lt;int&gt;&amp; v)</code> — чтобы изменять, <code>int total(const vector&lt;int&gt;&amp; v)</code> — только для чтения. Иначе будет скопирован весь вектор.</p>
<div class="tip">Когда вы пишете цикл по индексу с условием <code>i &lt; v.size()</code>, помните, что <code>size()</code> возвращает беззнаковый тип (<code>size_t</code>). Для пустого вектора <code>v.size() - 1</code> превращается в огромное число — будьте осторожны.</div>`,
        ex: [
          { prompt: 'Сначала дано <code>n</code>, затем <code>n</code> целых чисел. Прочитайте их в <code>vector</code> и выведите в обратном порядке в одну строку через пробел.',
            hints: ['Начните цикл вывода с конца: <code>i = n - 1</code>.', '<code>for (int i = n - 1; i &gt;= 0; i--)</code>'] },
          { prompt: 'Дана выручка магазина за <code>n</code> дней. Выведите количество дней, в которые выручка была <b>строго больше</b> среднего значения.',
            hints: ['Сначала вычислите сумму, затем <code>double avg = (double)sum / n</code>.', 'Во втором цикле посчитайте значения, для которых <code>x &gt; avg</code>.'] },
          { prompt: 'Чему равно <code>v.size()</code> после выполнения <code>vector&lt;int&gt; v(3); v.push_back(5);</code>?', explain: '<code>v(3)</code> создаётся с тремя нулями, <code>push_back</code> добавляет четвёртый элемент: <code>{0, 0, 0, 5}</code>.' },
          { prompt: 'Что произойдёт, если для массива <code>int a[5];</code> написать <code>a[10] = 1;</code>?', options: ['Ошибка компиляции', 'Массив автоматически вырастет до 11 элементов', 'Undefined behavior: запись в чужую память, программа может повести себя как угодно', 'Значение будет проигнорировано'], explain: 'C-массив и <code>vector::operator[]</code> не проверяют границы. Безопасный вариант — <code>v.at(i)</code>: при выходе за границы он выбрасывает исключение (exception).' }
        ]
      },
      'cp-8': {
        title: 'Указатели и динамическая память',
        body: `
<p>Каждая переменная располагается в памяти по некоторому <b>адресу</b>. <b>Указатель</b> (pointer) — это переменная, которая хранит адрес. Python и Java это скрывают, а C++ позволяет работать с памятью напрямую — поэтому он быстрый, но ошибиться легко.</p>
${pre(P`
int balance = 5000;
int* p = &balance;      // &balance — адрес balance
cout << *p << endl;     // 5000: * — получить значение по адресу (dereference)
*p += 1000;             // теперь balance равен 6000
int* q = nullptr;       // указатель, который никуда не указывает`)}
<p><code>int&amp; r = x</code> (ссылка) и <code>int* p = &amp;x</code> (указатель) похожи, но ссылка всегда привязана к одному объекту и не может быть нулевой, а указатель можно перенаправить на другой адрес или сделать <code>nullptr</code>.</p>
<h3>Stack и heap</h3>
<p>Локальные переменные живут в <b>стеке</b> (stack) и уничтожаются автоматически при выходе из функции. Данные с долгим временем жизни или с размером, известным только во время выполнения, выделяются в <b>куче</b> (heap) через <code>new</code>, и освобождать их через <code>delete</code> нужно самостоятельно:</p>
${pre(P`
int* one = new int(42);
int* arr = new int[n];     // массив из n элементов
// ... использование ...
delete one;
delete[] arr;              // для массива — delete[]`)}
<p>Три классические ошибки: <b>memory leak</b> (утечка памяти: забыли <code>delete</code> — память постепенно заканчивается), <b>dangling pointer</b> (висячий указатель: память освобождена, а указатель всё ещё смотрит на этот адрес) и <b>double delete</b> (двойное освобождение одной и той же памяти).</p>
<h3>Умные указатели: почему мы не пишем delete вручную</h3>
<p>Современный C++ (<code>&lt;memory&gt;</code>) управляет памятью по принципу <b>RAII</b>: когда владелец уничтожается, ресурс освобождается автоматически.</p>
${pre(P`
#include <memory>
unique_ptr<int> a = make_unique<int>(10);   // единственный владелец
shared_ptr<string> s = make_shared<string>("Kaspi");
auto s2 = s;                                 // два владельца; память освобождается, когда уничтожается последний
// писать delete не нужно`)}
<div class="tip">Правило: в новом коде вместо <code>new</code>/<code>delete</code> используйте <code>vector</code>, <code>string</code>, <code>unique_ptr</code>. Сырой указатель держите только для того, чтобы «смотреть, не владея». Предупреждение: в браузерном компиляторе нет защиты памяти — ошибочный указатель не роняет программу, а даёт мусорное значение.</div>`,
        ex: [
          { prompt: 'Напишите функцию <code>void addBonus(int* salary, int bonus)</code> с указателем: она должна прибавлять бонус к зарплате. Кроме того, функция <code>int* bigger(int* a, int* b)</code> должна возвращать указатель на большее из двух значений. <code>main</code> готов.',
            hints: ['Изменить значение по адресу: <code>*salary += bonus;</code>', 'Для сравнения значений сравните <code>*a</code> и <code>*b</code> и верните сам указатель (<code>a</code> или <code>b</code>).'] },
          { prompt: 'Чему равно <code>b</code> после выполнения <code>int a = 5; int* p = &amp;a; *p += 3; int b = *p * 2;</code>?', explain: 'Через <code>*p += 3</code> переменная <code>a</code> становится равной 8. <code>b = 8 * 2 = 16</code>.' },
          { prompt: 'При каждом вызове функция выделяет <code>new int[1000]</code>, но <code>delete[]</code> не вызывается никогда. Как это называется?', options: ['Dangling pointer', 'Memory leak', 'Stack overflow', 'Null pointer'], explain: 'Выделенная, но не освобождённая память — это утечка памяти (memory leak). Долго работающий сервер постепенно съест всю память.' },
          { prompt: 'В чём главное преимущество <code>unique_ptr</code> перед сырыми <code>new</code>/<code>delete</code>?', options: ['Он выделяет память в стеке', 'Он сам освобождает память, когда владелец выходит из области видимости (scope), и владелец у него только один', 'Он ускоряет арифметику указателей', 'При копировании он создаёт новый объект'], explain: '<code>unique_ptr</code> основан на RAII: его деструктор сам вызывает <code>delete</code>. Копировать его нельзя, владение можно только передать через <code>move</code>.' }
        ]
      },
      'cp-9': {
        title: 'struct, class, конструктор и деструктор',
        body: `
<p><b>struct</b> объединяет несколько полей в один тип. <b>class</b> — та же идея, но по умолчанию его поля закрыты (<code>private</code>). Разница только в доступе по умолчанию: у <code>struct</code> — <code>public</code>, у <code>class</code> — <code>private</code>.</p>
${pre(P`
struct Student {
    string name;
    int score;
};
Student s{"Дана", 91};
cout << s.name << " " << s.score << endl;`)}
<h3>Инкапсуляция и конструктор</h3>
<p>Класс позволяет скрыть данные и давать к ним доступ только через правильные методы. <b>Конструктор</b> (constructor) — функция с тем же именем, что и класс, без типа возвращаемого значения; она вызывается при создании объекта. Поля лучше заполнять через <b>список инициализации</b> (initializer list):</p>
${pre(P`
class Account {
private:
    string owner;
    long long balance;
public:
    Account(string o, long long b) : owner(o), balance(b) {}
    void deposit(long long x) { if (x > 0) balance += x; }
    bool withdraw(long long x) {
        if (x > balance) return false;   // недостаточно — отказ
        balance -= x;
        return true;
    }
    long long getBalance() const { return balance; }   // const: не меняет объект
};

Account acc("Ерлан", 10000);
acc.withdraw(3000);
// acc.balance = 1000000;   // ошибка: balance — private`)}
<h3>Деструктор</h3>
<p><b>Деструктор</b> (destructor) <code>~ClassName()</code> вызывается автоматически, когда объект уничтожается (например, при выходе из области видимости). В нём освобождаются ресурсы: память, файл, сетевое соединение. Это <b>RAII</b> (Resource Acquisition Is Initialization): конструктор захватывает ресурс, деструктор его возвращает.</p>
${pre(P`
struct Logger {
    string name;
    Logger(string n) : name(n) { cout << "open " << name << endl; }
    ~Logger() { cout << "close " << name << endl; }
};
int main() {
    Logger a("A");
    Logger b("B");
}   // вывод: open A, open B, close B, close A`)}
<div class="tip">Локальные объекты уничтожаются в порядке, <b>обратном</b> порядку создания: созданный последним уничтожается первым (как в стеке).</div>`,
        ex: [
          { prompt: 'Даны имена и баллы <code>n</code> студентов (в каждой строке <code>имя балл</code>). С помощью struct <code>Student</code> выведите имя студента с наибольшим баллом. При равенстве — того, кто встретился первым.',
            hints: ['Храните индекс лучшего студента в переменной <code>best</code>.', 'Сравнивайте только через <code>&gt;</code> (строго) — тогда при равенстве останется первый.'] },
          { prompt: 'Допишите класс <code>Account</code>: <code>deposit(x)</code> добавляет сумму к балансу, <code>withdraw(x)</code> списывает её и возвращает <code>true</code>, если средств достаточно, а иначе ничего не меняет и возвращает <code>false</code>. <code>main</code> готов: начальный баланс, затем команды <code>D сумма</code> / <code>W сумма</code>; в конце выводятся баланс и количество отклонённых операций.',
            hints: ['Внутри <code>withdraw</code> сначала проверьте: <code>if (x &gt; balance) return false;</code>', 'Только после проверки выполните <code>balance -= x</code> и верните <code>true</code>.'] },
          { prompt: 'В <code>main</code> сначала создан <code>Logger a("A");</code>, затем <code>Logger b("B");</code>. В каком порядке вызовутся деструкторы, когда <code>main</code> завершится?', options: ['Сначала A, потом B', 'Сначала B, потом A', 'В произвольном порядке', 'Деструктор не вызывается, его нужно вызывать вручную'], explain: 'Локальные объекты уничтожаются в порядке, обратном созданию: B, затем A.' },
          { prompt: 'В чём единственное различие между <code>struct</code> и <code>class</code>?', options: ['В <code>struct</code> нельзя писать методы', 'Доступ по умолчанию: в <code>struct</code> — public, в <code>class</code> — private', '<code>class</code> создаётся только в куче', 'У <code>struct</code> не бывает конструктора'], explain: 'В C++ у обоих могут быть методы, конструкторы и наследование. Отличается только спецификатор доступа по умолчанию.' }
        ]
      },
      'cp-10': {
        title: 'Перегрузка операторов и шаблоны',
        body: `
<p>Свой тип можно использовать так же, как встроенные: <code>a + b</code>, <code>a == b</code>, <code>cout &lt;&lt; a</code>. Для этого оператор <b>перегружают</b> (overload) — это обычная функция с именем <code>operator+</code>.</p>
${pre(P`
struct Money {
    long long tiyn;       // 1 тенге = 100 тиынов
};
Money operator+(const Money& a, const Money& b) {
    return Money{a.tiyn + b.tiyn};
}
bool operator<(const Money& a, const Money& b) {
    return a.tiyn < b.tiyn;            // теперь sort() умеет сортировать Money
}
ostream& operator<<(ostream& os, const Money& m) {
    os << m.tiyn / 100 << "." << m.tiyn % 100 / 10 << m.tiyn % 10 << " ₸";
    return os;                         // возвращаем поток, чтобы можно было продолжить цепочку
}
Money a{150050}, b{99950};
cout << a + b << endl;                 // 2500.00 ₸`)}
<p><code>operator&lt;&lt;</code> возвращает <code>ostream&amp;</code> — тогда работает цепочка <code>cout &lt;&lt; a &lt;&lt; b</code>. Перегружайте операторы в соответствии с их смыслом: <code>+</code> должен вести себя как сложение.</p>
<h3>Шаблоны: один код — много типов</h3>
<p>Чтобы не писать одну и ту же функцию трижды для <code>int</code>, <code>double</code> и <code>string</code>, используют <b>шаблоны</b> (template). <code>T</code> — место, которое компилятор потом заменит конкретным типом:</p>
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
<p>Для каждого использованного типа компилятор создаёт отдельную версию <b>во время компиляции</b> (instantiation, инстанцирование), поэтому шаблоны быстрые: при выполнении нет дополнительных затрат. Вы уже пользовались шаблонами: <code>vector&lt;int&gt;</code>, <code>unique_ptr&lt;T&gt;</code>, <code>map&lt;K, V&gt;</code> — всё это шаблоны классов.</p>
<div class="tip">Тип <code>T</code> в шаблоне должен поддерживать операции, которые используются внутри. Для <code>biggest</code> у <code>T</code> обязательно должен быть <code>&lt;</code> — поэтому, если вы напишете <code>operator&lt;</code> для <code>Money</code>, заработает и <code>biggest(m1, m2)</code>.</div>`,
        ex: [
          { prompt: 'Напишите для структуры <code>Vec2</code> <code>operator+</code> (складывает координаты) и <code>operator&lt;&lt;</code> (выводит в формате <code>(x, y)</code>). <code>main</code> готов: он читает два вектора и выводит их сумму.',
            hints: ['<code>return Vec2{a.x + b.x, a.y + b.y};</code>', 'Формат вывода: <code>os &lt;&lt; "(" &lt;&lt; v.x &lt;&lt; ", " &lt;&lt; v.y &lt;&lt; ")";</code>'] },
          { prompt: 'Напишите шаблон функции <code>largest</code>: он должен возвращать наибольший элемент непустого вектора любого типа (используйте только оператор <code>&lt;</code>). <code>main</code> готов: он читает <code>n</code> целых чисел, затем <code>m</code> слов и выводит наибольшее в каждом наборе.',
            hints: ['Начните с <code>T best = v[0];</code> и пройдите по всем элементам.', 'Сравнение: <code>if (best &lt; x) best = x;</code> — это работает и для <code>int</code>, и для <code>string</code>.'] },
          { prompt: 'Как нужно объявить <code>operator&lt;&lt;</code> для типа <code>Point</code>, чтобы работало <code>cout &lt;&lt; p1 &lt;&lt; p2;</code>?', options: ['<code>void operator&lt;&lt;(ostream os, Point p)</code>', '<code>ostream&amp; operator&lt;&lt;(ostream&amp; os, const Point&amp; p)</code>', '<code>string operator&lt;&lt;(const Point&amp; p)</code>', '<code>Point operator&lt;&lt;(ostream&amp; os, Point p)</code>'], explain: 'Поток принимается по ссылке (копировать его нельзя) и возвращается как ссылка — тогда следующий <code>&lt;&lt;</code> пишет в тот же поток.' },
          { prompt: 'Когда создаётся код шаблона для конкретного типа?', options: ['При запуске программы, во время первого вызова', 'Во время компиляции, отдельно для каждого использованного типа', 'Никогда: у шаблона один общий код для всех типов', 'Только при вызове <code>new</code>'], explain: 'Инстанцирование происходит при компиляции: <code>largest&lt;int&gt;</code> и <code>largest&lt;string&gt;</code> — две отдельные функции. Поэтому и ошибки появляются при компиляции.' }
        ]
      },
      'cp-11': {
        title: 'Наследование и виртуальные функции',
        body: `
<p><b>Наследование</b> (inheritance) позволяет создать новый класс на основе существующего: производный класс (derived) получает поля и методы базового класса (base) и добавляет свои.</p>
${pre(P`
class Shape {
public:
    virtual double area() const = 0;   // pure virtual: Shape — абстрактный
    virtual ~Shape() {}                 // виртуальный деструктор
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
<h3>Полиморфизм: что даёт virtual</h3>
<p>С производным объектом можно работать через указатель или ссылку на базовый класс. При вызове <code>virtual</code>-метода реализация выбирается не по типу указателя, а по <b>фактическому типу объекта</b> (dynamic dispatch, динамическая диспетчеризация):</p>
${pre(P`
vector<unique_ptr<Shape>> shapes;
shapes.push_back(make_unique<Circle>(1.0));
shapes.push_back(make_unique<Rect>(2, 3));
double total = 0;
for (const auto& s : shapes) total += s->area();   // Circle::area, Rect::area`)}
<p>Если не написать <code>virtual</code>, <code>s-&gt;area()</code> всегда будет вызывать <code>Shape::area</code> (static binding, статическое связывание) — это частая ошибка. Ключевое слово <code>override</code> говорит компилятору: «я переопределяю виртуальный метод базового класса»; если в имени ошибка, компилятор сразу предупредит.</p>
<ul>
<li><code>= 0</code> — <b>чисто виртуальный</b> метод (pure virtual): в базовом классе нет реализации, и создать объект такого класса нельзя (абстрактный класс, похож на interface в Java).</li>
<li><code>protected</code> — поля, закрытые снаружи, но открытые для производных классов.</li>
<li>Если объект удаляется через <code>delete</code> по указателю на базовый класс, деструктор базового класса должен быть <b>virtual</b> — иначе деструктор производного класса не вызовется.</li>
</ul>
<div class="tip"><code>s-&gt;area()</code> — сокращённая запись <code>(*s).area()</code>: доступ к члену через указатель.</div>`,
        ex: [
          { prompt: 'Дан список фигур: <code>C r</code> — круг, <code>R w h</code> — прямоугольник. Стартовый код считает площадь каждой фигуры равной 0, потому что <code>Shape::area</code> не виртуальный. Исправьте классы и выведите общую площадь всех фигур с 2 знаками после запятой (π = <code>acos(-1)</code>).',
            hints: ['Сделайте <code>area</code> в <code>Shape</code> виртуальным (или <code>virtual double area() const = 0;</code>).', 'Добавьте <code>override</code> в производных классах — при ошибке компилятор подскажет.'] },
          { prompt: '<code>struct A { void hi() { cout &lt;&lt; "A"; } }; struct B : A { void hi() { cout &lt;&lt; "B"; } };</code> Затем <code>A* p = new B(); p-&gt;hi();</code> Что будет выведено?', options: ['<code>A</code>', '<code>B</code>', '<code>AB</code>', 'Ошибка компиляции'], explain: '<code>hi</code> не виртуальный, поэтому вызов выбирается при компиляции по типу указателя (<code>A*</code>): <code>A</code>. Если бы он был <code>virtual</code>, вывелось бы <code>B</code>.' },
          { prompt: 'Почему деструктор полиморфного базового класса нужно делать <code>virtual</code>?', options: ['Иначе класс не скомпилируется', 'Чтобы при <code>Base* p = new Derived; delete p;</code> вызвался и деструктор Derived', 'Виртуальный деструктор занимает вдвое меньше памяти', 'Чтобы деструктор был только у абстрактных классов'], explain: 'Без virtual <code>delete</code> через указатель на базовый класс вызывает только <code>Base::~Base</code> — ресурсы Derived не освобождаются (undefined behavior).' },
          { prompt: 'Что верно о классе <code>Shape</code> с методом <code>virtual double area() const = 0;</code>?', options: ['Можно создать объект: <code>Shape s;</code>', 'Он абстрактный: его объект создать нельзя, только через производные классы', '<code>area</code> всегда возвращает 0', 'Производные классы не должны писать <code>area</code>'], explain: '<code>= 0</code> — чисто виртуальный метод. Класс с таким методом абстрактный; его используют только через производный класс, реализующий <code>area</code>.' }
        ]
      },
      'cp-12': {
        title: 'STL: sort, map, set, unordered_map',
        body: `
<p><b>STL</b> (Standard Template Library) — набор готовых контейнеров и алгоритмов. Это шаблоны, поэтому они работают с любым типом.</p>
<h3>algorithm</h3>
${pre(P`
#include <algorithm>
vector<int> v = {5, 2, 9, 1};
sort(v.begin(), v.end());                           // 1 2 5 9
sort(v.begin(), v.end(), greater<int>());           // 9 5 2 1
reverse(v.begin(), v.end());
int mx = *max_element(v.begin(), v.end());          // итератор → значение через *
int cnt = count(v.begin(), v.end(), 5);

// свой порядок через lambda: по убыванию балла, при равенстве — по имени
sort(st.begin(), st.end(), [](const Student& a, const Student& b) {
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});`)}
<p><code>v.begin()</code>, <code>v.end()</code> — <b>итераторы</b>: начало контейнера и позиция сразу после его конца. Именно так алгоритмы принимают диапазон.</p>
<h3>map, unordered_map, set</h3>
${pre(P`
#include <map>
map<string, int> stock;               // ключи хранятся отсортированными (red-black tree)
stock["Алматы"] += 5;                 // отсутствующий ключ автоматически создаётся с 0
stock["Астана"] = 3;
for (const auto& [city, qty] : stock) // C++17 structured binding
    cout << city << " " << qty << endl;
if (stock.count("Шымкент") == 0) { /* нет */ }

#include <unordered_map>
unordered_map<string, int> freq;      // hash table: в среднем O(1), без порядка

#include <set>
set<int> seen = {5, 1, 5, 3};         // {1, 3, 5}: без повторов, отсортировано
seen.insert(4);`)}
<table>
<tr><th>Контейнер</th><th>Поиск/вставка</th><th>Порядок</th></tr>
<tr><td><code>map</code>, <code>set</code></td><td>O(log n)</td><td>отсортирован по ключу</td></tr>
<tr><td><code>unordered_map</code>, <code>unordered_set</code></td><td>в среднем O(1)</td><td>без порядка</td></tr>
</table>
<div class="tip">Ловушка: если ключа нет, <code>m[key]</code> его <b>добавляет</b> со значением по умолчанию. Если нужна только проверка, используйте <code>m.count(key)</code> или <code>m.find(key) != m.end()</code>.</div>`,
        ex: [
          { prompt: 'Слова текста (латиницей, строчными буквами) подаются до конца ввода. Выведите каждое слово и количество его вхождений в алфавитном порядке: <code>слово число</code>.',
            hints: ['<code>map&lt;string, int&gt; freq;</code> и <code>freq[w]++</code>.', '<code>map</code> сам сортирует ключи — достаточно вывести их в цикле.'] },
          { prompt: 'Результаты олимпиады: <code>n</code>, затем строки <code>имя балл</code>. Отсортируйте и выведите их по убыванию балла, а при равном балле — по имени в алфавитном порядке. Используйте <code>sort</code> и lambda.',
            hints: ['<code>sort(v.begin(), v.end(), [](const P&amp; a, const P&amp; b) { ... });</code>', 'Lambda: если баллы разные — <code>a.score &gt; b.score</code>, иначе <code>a.name &lt; b.name</code>.'] },
          { prompt: 'Нужно часто искать по коду среди миллиона товаров, а порядок кодов не важен. Какой контейнер подходит лучше всего?', options: ['<code>vector</code> и линейный поиск', '<code>unordered_map</code>', '<code>map</code>, потому что он всегда быстрее', 'C-массив'], explain: '<code>unordered_map</code> — хеш-таблица (hash table): поиск в среднем за O(1). <code>map</code> даёт O(log n), он полезен, когда нужен порядок.' },
          { prompt: 'Чему равно <code>m.size()</code> после выполнения <code>map&lt;string, int&gt; m; m["a"]++; m["b"]; if (m.count("c")) m["d"] = 1;</code>?', explain: '<code>m["a"]++</code> и <code>m["b"]</code> добавляют два ключа (<code>operator[]</code> создаёт отсутствующий ключ). <code>count("c")</code> ключ не добавляет и возвращает 0, поэтому <code>"d"</code> тоже не добавляется.' }
        ]
      },
      'cp-13': {
        title: 'Рекурсия и обработка ошибок (exceptions)',
        body: `
<p><b>Рекурсия</b> — вызов функцией самой себя. В каждой рекурсивной функции есть две части: <b>базовый случай</b> (условие остановки) и <b>рекурсивный шаг</b>, уменьшающий задачу.</p>
${pre(P`
long long factorial(int n) {
    if (n <= 1) return 1;            // базовый случай
    return n * factorial(n - 1);     // рекурсивный шаг
}

// Backtracking: все двоичные строки длины n
void gen(string cur, int n) {
    if ((int)cur.size() == n) { cout << cur << endl; return; }
    gen(cur + "0", n);
    gen(cur + "1", n);
}`)}
<p>Каждый вызов открывает новый фрейм в <b>стеке вызовов</b> (call stack). Если базового случая нет или рекурсия слишком глубокая, стек переполняется (<b>stack overflow</b>). Стек C++ просторнее, чем в Python, но не рассчитан на глубину в миллионы — в таких случаях используйте цикл.</p>
<h3>Исключения: try, throw, catch</h3>
<p>В обычном C++ о непредвиденной ситуации сообщают через <b>исключение</b> (exception). Функция выбрасывает объект ошибки через <code>throw</code>, а вызывающий код перехватывает его через <code>try/catch</code>:</p>
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
} catch (const exception& e) {        // любая стандартная ошибка
    cout << "Басқа қате" << endl;
}`)}
<ul>
<li>Блоки <code>catch</code> проверяются сверху вниз; выполняется первый подходящий, поэтому более конкретные типы ставят выше.</li>
<li><code>stoi("abc")</code> выбрасывает <code>invalid_argument</code>, <code>v.at(100)</code> — <code>out_of_range</code>.</li>
<li>Если исключение никто не перехватил, программа аварийно завершается через <code>std::terminate</code>. При «раскрутке» стека (stack unwinding) вызываются деструкторы локальных объектов — поэтому RAII так важен.</li>
</ul>
<div class="tip">Браузерный компилятор Tolqyn работает в режиме <code>-fno-exceptions</code>: <code>try</code>/<code>throw</code> не компилируются. Игровые движки и встраиваемые (embedded) системы тоже часто так делают. Поэтому в заданиях мы сообщаем об ошибке, возвращая <code>bool</code> или специальное значение (например, <code>-1</code>).</div>`,
        ex: [
          { prompt: 'Напишите рекурсивную функцию <code>int digitSum(int n)</code>: сумма цифр неотрицательного числа. Не используйте циклы: <code>digitSum(n) = n % 10 + digitSum(n / 10)</code>.',
            hints: ['Базовый случай: если <code>n &lt; 10</code>, верните <code>n</code>.', 'Рекурсивный шаг: <code>n % 10 + digitSum(n / 10)</code>.'] },
          { prompt: 'Backtracking: выведите в лексикографическом порядке (по одной в строке) все двоичные строки длины <code>n</code>, в которых нет двух <code>1</code> подряд. Например, <code>n = 3</code>: <code>000 001 010 100 101</code>.',
            hints: ['Стартовый код выводит все двоичные строки. Перед добавлением <code>1</code> проверьте последний символ.', '<code>if (cur.empty() || cur.back() != \'1\') gen(cur + "1", n);</code>'] },
          { prompt: 'Что выведет <code>try { cout &lt;&lt; "1"; throw runtime_error("x"); cout &lt;&lt; "2"; } catch (const exception&amp; e) { cout &lt;&lt; "3"; } cout &lt;&lt; "4";</code>? (В обычном компиляторе с включёнными исключениями.)', options: ['<code>1234</code>', '<code>134</code>', '<code>13</code>', '<code>14</code>'], explain: 'После <code>throw</code> остаток блока <code>try</code> (<code>"2"</code>) пропускается; <code>runtime_error</code> унаследован от <code>exception</code>, поэтому catch его перехватывает (<code>"3"</code>), затем программа продолжается (<code>"4"</code>).' },
          { prompt: 'Что произойдёт, если выброшенное исключение не перехватит ни один <code>catch</code>?', options: ['Оно будет молча проигнорировано', 'Функция вернёт 0', 'Программа аварийно завершится через <code>std::terminate</code>', 'Компилятор заранее найдёт его и выдаст ошибку компиляции'], explain: 'Неперехваченное исключение раскручивает стек до выхода из <code>main</code>, после чего <code>std::terminate</code> завершает программу.' }
        ]
      },
      'cp-p1': {
        title: 'Задачи: лёгкие и средние',
        body: `
<p>Этот урок — сборник алгоритмических задач на C++, небольших заданий в стиле LeetCode и олимпиад. В каждой задаче вы читаете ввод из stdin и выводите ответ в stdout.</p>
<h3>Шаблон C++ в олимпиадном стиле</h3>
${pre(P`
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);   // ускоряет cin/cout
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    // ... решение ...
    return 0;
}`)}
<ul>
<li><b>Крайние случаи:</b> один элемент, все элементы равны, отрицательные числа, пустой ответ.</li>
<li><b>Типы:</b> для сумм и произведений — <code>long long</code>.</li>
<li><b>Сложность:</b> при n ≤ 1000 достаточно O(n²); при n ≤ 10⁵ нужно O(n log n) или O(n).</li>
<li><b>Формат ответа:</b> не выводите лишний текст и лишние пустые строки.</li>
</ul>
<div class="tip">Сначала решите небольшой пример вручную на бумаге — когда алгоритм понятен, код на C++ пишется сам.</div>`,
        ex: [
          { prompt: '<b>Палиндром.</b> Дано одно слово из строчных латинских букв. Если оно одинаково читается слева направо и справа налево, выведите <code>YES</code>, иначе <code>NO</code>. Используйте два указателя (two pointers).',
            hints: ['Начните с <code>i = 0</code>, <code>j = s.size() - 1</code> и двигайтесь к середине.', 'Если <code>s[i] != s[j]</code> — это не палиндром.'] },
          { prompt: '<b>FizzBuzz.</b> Выведите каждое число от 1 до <code>n</code> на отдельной строке, но если число делится на 3 — <code>Fizz</code>, на 5 — <code>Buzz</code>, на оба — <code>FizzBuzz</code>.',
            hints: ['Порядок условий важен: делимость на 15 проверяйте первой.', '<code>if (i % 15 == 0)</code> → <code>FizzBuzz</code>.'] },
          { prompt: '<b>Второе место.</b> Даны <code>n</code> чисел. Выведите второе по величине среди различных значений. Если такого значения нет (все равны), выведите <code>NONE</code>. Постарайтесь решить за один проход (O(n)).',
            hints: ['Храните две переменные: <code>first</code> и <code>second</code>, а также флаг, есть ли <code>second</code>.', 'Когда приходит новый максимум, старый <code>first</code> переходит в <code>second</code>; значения, равные <code>first</code>, игнорируйте.'] },
          { prompt: '<b>Two Sum.</b> Даны <code>n</code>, <code>target</code>, затем <code>n</code> чисел. Выведите индексы <code>i j</code> (с 0, <code>i &lt; j</code>) двух элементов, сумма которых равна <code>target</code>. Гарантируется, что ответ ровно один. Решите за O(n) с помощью <code>unordered_map</code>.',
            hints: ['Для каждого <code>a[j]</code> проверяйте, встречалось ли раньше <code>target - a[j]</code>.', '<code>pos</code> отображает значение в индекс; записывайте <code>pos[a[j]] = j</code> только после проверки.'] },
          { prompt: 'Сколько примерно сравнений сделает бинарный поиск (binary search) в отсортированном <code>vector</code> из 1 000 элементов в худшем случае? (Целым числом, ⌈log₂ 1000⌉.)', explain: 'На каждом шаге диапазон уменьшается вдвое: 2¹⁰ = 1024 ≥ 1000, поэтому достаточно 10 шагов.' }
        ]
      },
      'cp-p2': {
        title: 'Задачи: средние и сложные',
        body: `
<p>Задачи этого сборника — уровня собеседований и олимпиад: стек, скользящее окно (sliding window), бинарный поиск, BFS и динамическое программирование. Идеи, знакомые вам по модулю DSA на Python, теперь вы реализуете с помощью C++ STL.</p>
<table>
<tr><th>Идея</th><th>Инструмент C++</th></tr>
<tr><td>Стек</td><td><code>vector</code> (<code>push_back</code>, <code>back</code>, <code>pop_back</code>) или <code>string</code></td></tr>
<tr><td>Очередь (BFS)</td><td><code>vector</code> + индекс «головы» (<code>head</code>)</td></tr>
<tr><td>Последняя позиция появления</td><td><code>vector&lt;int&gt; last(256, -1)</code> или <code>unordered_map</code></td></tr>
<tr><td>Бинарный поиск</td><td><code>lower_bound(v.begin(), v.end(), x)</code></td></tr>
<tr><td>Таблица DP</td><td><code>vector&lt;long long&gt; dp(n + 1, INF)</code></td></tr>
</table>
${pre(P`
// lower_bound: итератор на первый элемент, не меньший x
vector<int> v = {1, 3, 3, 5, 8};
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();   // 1
bool found = idx < (int)v.size() && v[idx] == 3;            // true

// 4 соседа в сетке
int dr[4] = {1, -1, 0, 0};
int dc[4] = {0, 0, 1, -1};`)}
<div class="tip">Для BFS удобен <code>&lt;queue&gt;</code>, но вполне достаточно и обычного <code>vector</code> с индексом <code>head</code>: <code>while (head &lt; (int)q.size()) { auto cur = q[head++]; ... }</code>.</div>`,
        ex: [
          { prompt: '<b>Скобки.</b> Дана непустая строка из символов <code>()[]{}</code>. Если скобки закрыты правильно, выведите <code>YES</code>, иначе <code>NO</code>. В качестве стека используйте <code>vector&lt;char&gt;</code> или <code>string</code>.',
            hints: ['Кладите открывающую скобку в стек; когда приходит закрывающая, верхний элемент стека должен ей соответствовать.', 'В конце стек обязательно должен быть пуст: <code>((</code> — это <code>NO</code>.'] },
          { prompt: '<b>Самая длинная подстрока без повторов.</b> Дана строка из латинских букв. Выведите длину самого длинного <b>непрерывного</b> фрагмента, в котором ни один символ не повторяется. Скользящим окном за O(n).',
            hints: ['<code>last[c]</code> — индекс последнего появления символа <code>c</code>. Левая граница окна — <code>left</code>.', 'Если <code>last[c] &gt;= left</code>, то <code>left = last[c] + 1</code>; длина — <code>i - left + 1</code>.'] },
          { prompt: '<b>Первое вхождение.</b> Даны <code>n</code> чисел, отсортированных по неубыванию, и <code>q</code> запросов. Для каждого запроса <code>x</code> выведите на отдельной строке индекс (с 0) первого вхождения <code>x</code>, а если его нет — <code>-1</code>. На каждый запрос O(log n): напишите бинарный поиск сами или используйте <code>lower_bound</code>.',
            hints: ['<code>lower_bound</code> даёт первый элемент, не меньший <code>x</code>; индекс — <code>it - a.begin()</code>.', 'Проверьте, что в найденной позиции действительно стоит <code>x</code>, иначе <code>-1</code>.'] },
          { prompt: '<b>Лабиринт (BFS).</b> Даны <code>n m</code> и сетка из <code>n</code> строк: <code>.</code> — свободно, <code>#</code> — стена. Выведите минимальное число шагов (вверх/вниз/влево/вправо) от левого верхнего угла (0,0) до правого нижнего (n−1,m−1). Если пути нет — <code>-1</code>. Гарантируется, что начальная клетка свободна.',
            hints: ['Заполните таблицу <code>dist</code> значением -1; это одновременно метка «не посещено».', 'Очередь — <code>vector&lt;pair&lt;int,int&gt;&gt;</code> и индекс <code>head</code>. Добавляйте соседа, только если он внутри сетки, не стена и ещё не посещён.'] },
          { prompt: '<b>Размен монет (DP).</b> Даны <code>k</code> номиналов монет и сумма <code>amount</code> (монет каждого номинала бесконечно много). Выведите минимальное количество монет, чтобы набрать <code>amount</code>; если это невозможно — <code>-1</code>. <code>dp[s]</code> — минимальное число монет для суммы <code>s</code>.',
            hints: ['Жадный алгоритм из стартового кода (начинать с самой крупной монеты) для <code>1 3 4</code> и 6 даёт 3, а правильно 2 (3+3).', '<code>dp[0] = 0</code>; для каждого <code>s</code> <code>dp[s] = min(dp[s], dp[s - c] + 1)</code>.'] }
        ]
      },
      'cp-gate': {
        title: 'Экзамен модуля: C++',
        body: `
<p>Итоговый экзамен охватывает весь модуль: ссылки и указатели, виртуальную диспетчеризацию, контейнеры STL, шаблон класса и рекурсию. Чтобы сдать, нужно набрать не менее <b>75%</b> баллов.</p>
<ul>
<li>Точно соблюдайте формат вывода: лишний пробел или текст считается ошибкой.</li>
<li>Для больших сумм берите <code>long long</code>.</li>
<li>Сначала проверьте код на небольшом примере кнопкой «Запустить», затем нажмите «Проверить».</li>
</ul>`,
        ex: [
          { prompt: '<code>void f(int a, int&amp; b, int* c) { a++; b++; (*c)++; }</code>. Чему равны <code>x y z</code> после выполнения <code>int x = 1, y = 1, z = 1; f(x, y, &amp;z);</code>?', options: ['<code>1 1 1</code>', '<code>2 2 2</code>', '<code>1 2 2</code>', '<code>1 2 1</code>'], explain: '<code>a</code> — копия, <code>x</code> не меняется. <code>b</code> — ссылка, <code>y</code> становится 2. <code>c</code> — адрес <code>z</code>, <code>(*c)++</code> делает его 2.' },
          { prompt: '<code>struct A { virtual string who() { return "A"; } }; struct B : A { string who() override { return "B"; } };</code>. Если <code>B b; A a = b; A&amp; r = b;</code>, что даст <code>a.who() + r.who()</code>?', options: ['<code>AA</code>', '<code>AB</code>', '<code>BB</code>', '<code>BA</code>'], explain: '<code>A a = b</code> — копирование по значению: часть B «срезается» (object slicing), и <code>a</code> на самом деле A. А <code>r</code> — ссылка на объект B, виртуальный вызов идёт в <code>B::who</code>.' },
          { prompt: 'Чему равно <code>m[1]</code> после выполнения <code>set&lt;int&gt; s = {4, 1, 4, 2}; s.insert(1); s.insert(3); unordered_map&lt;int, int&gt; m; for (int x : s) m[x % 2]++;</code>?', explain: 'Множество убирает повторы: <code>{1, 2, 3, 4}</code>. Нечётные числа — 1 и 3, поэтому <code>m[1] = 2</code>.' },
          { prompt: '<b>Продажи по городам.</b> Даны <code>n</code> заказов, каждый в виде <code>город сумма</code> (название города — одно слово латиницей, сумма — в тенге). Выведите общие продажи каждого города в алфавитном порядке названий в виде <code>город сумма</code>. В последней строке выведите название города с наибольшими продажами (при равенстве — первый по алфавиту). Суммы могут быть большими.',
            hints: ['<code>map&lt;string, long long&gt;</code> — город → общая сумма, ключи сортируются по алфавиту.', 'Ищите максимум в цикле вывода через <code>&gt;</code>: при равенстве останется первый по алфавиту.'] },
          { prompt: '<b>Шаблон Stack.</b> Допишите шаблон класса <code>Stack&lt;T&gt;</code> на основе <code>vector&lt;T&gt;</code>: <code>push</code>, <code>pop</code>, <code>top</code>, <code>empty</code>, <code>size</code>. <code>main</code> готов: команды <code>push X</code>, <code>pop</code>, <code>top</code>, <code>size</code>. Если <code>pop</code> или <code>top</code> приходит для пустого стека, выводится <code>EMPTY</code>.',
            hints: ['Вершина стека — <b>конец</b> вектора: <code>data.back()</code>.', '<code>pop</code> — <code>data.pop_back()</code>.'] },
          { prompt: '<b>N ферзей.</b> Сколькими способами можно расставить на шахматной доске <code>n × n</code> <code>n</code> ферзей, не бьющих друг друга (никакие два не стоят на одной строке, одном столбце или одной диагонали)? 1 ≤ n ≤ 8. Backtracking: ставьте по строкам и помечайте столбцы и обе диагонали как занятые.',
            hints: ['На одной диагонали постоянно <code>r + c</code>, на другой — <code>r - c</code> (для индекса прибавьте <code>+ n - 1</code>).', 'Поставьте ферзя, вызовите <code>place(r + 1)</code>, затем снимите пометки (backtrack).'] }
        ]
      }
    }
  });
})();
