// JV1 Java: Russian text. Code, solutions and expected output are in content/java.js.
(function () {
  const P = String.raw;
  DJ.i18n.patch({
    modules: {
      'java-1': { intro: 'Основы языка Java: main и println, типы, String и StringBuilder, условия и циклы, методы, массивы, класс и объект, наследование и interface, коллекции, exception, generics, lambda и stream, рекурсия. На каждом уроке вы сами пишете полную программу на Java и проверяете её тестами, а в конце вас ждут два сборника задач и экзамен.' }
    },
    lessons: {
      'jv-1': {
        title: 'Знакомство с Java: main, println и Scanner',
        body: P`
<p><b>Java</b> — строго типизированный объектно-ориентированный язык, который используется с 1995 года. На нём написаны приложения для Android, backend-системы банков, а также «тяжёлые» инструменты дата-инженерии (Apache Spark, Kafka, Hadoop). Поэтому если специалист по данным умеет читать код на Java, это большое преимущество.</p>
<h3>Компиляция и JVM</h3>
<p>Python выполняет код строка за строкой. В Java всё иначе: сначала компилятор <code>javac</code> переводит файл <code>Main.java</code> в <b>bytecode</b> (<code>Main.class</code>), а затем <b>JVM</b> (Java Virtual Machine) выполняет этот bytecode. JVM есть и в Windows, и в Linux, и на Mac, поэтому один раз скомпилированный код работает везде — «write once, run anywhere». Компилятор находит многие ошибки ещё до запуска: несовпадение типов, забытую точку с запятой, несуществующую переменную.</p>
<h3>Самая маленькая программа</h3>
<pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Salem, Almaty!");   // печатает с переходом на новую строку
        System.out.print("Bir ");                // без новой строки
        System.out.print("jol");
    }
}</code></pre>
<p>Что делает каждая часть: <code>public class Main</code> — программа живёт внутри класса, и имя файла должно совпадать с именем класса. <code>public static void main(String[] args)</code> — точка входа, отсюда JVM начинает выполнение. Каждая инструкция заканчивается знаком <code>;</code>, блоки пишутся внутри <code>{ }</code>, а регистр букв важен: <code>Main</code> и <code>main</code> — две разные вещи. Комментарии пишутся через <code>//</code> или <code>/* ... */</code>.</p>
<h3>Чтение ввода: Scanner</h3>
<pre><code>import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();    // одно слово (до пробела)
        int age = sc.nextInt();     // целое число
        System.out.println(name + " " + (age + 1));
    }
}</code></pre>
<p>Если на входе <code>Aruzhan 19</code>, программа напечатает <code>Aruzhan 20</code>. Строки склеиваются через <code>+</code>, а скобки <code>(age + 1)</code> нужны, чтобы сначала сложить числа.</p>
<div class="tip">На этой платформе каждое задание — полная программа. Тест подаёт программе ввод через stdin и сравнивает текст, выведенный в stdout, с ожидаемым ответом. Поэтому не печатайте лишний текст («Введите число:»).</div>`,
        ex: [
          { prompt: 'Что делает команда <code>javac Main.java</code>?', options: ['Сразу выполняет программу', 'Создаёт bytecode в файле <code>Main.class</code>', 'Переводит в код на Python', 'Создаёт .exe-файл для Windows'], explain: 'javac — компилятор. Он выдаёт bytecode, который потом выполняет JVM (<code>java Main</code>).' },
          { prompt: 'Что напечатает программа?<pre><code>System.out.print("A");\nSystem.out.println("B");\nSystem.out.print("C");</code></pre>', options: ['A, B, C — каждая на отдельной строке', 'AB, затем на новой строке C', 'ABC в одну строку', 'A, затем на новой строке BC'], explain: '<code>print</code> не переходит на новую строку, <code>println</code> переходит на новую строку после текста. Поэтому в первой строке AB, во второй C.' },
          { prompt: 'На входе два слова: имя человека и его город (например, <code>Aruzhan Astana</code>). Программа должна напечатать две строки:<pre><code>Hello, Aruzhan!\nCity: Astana</code></pre>', hints: ['Второе слово тоже читайте через <code>sc.next()</code>.', 'Склейка строк: <code>"Hello, " + name + "!"</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // прочитайте переменную city и напечатайте две строки\n        System.out.println("Hello!");\n    }\n}\n' }
        ]
      },
      'jv-2': {
        title: 'Типы, переменные и арифметика',
        body: P`
<p>Java — <b>статически типизированный</b> язык: тип каждой переменной известен во время компиляции и потом не меняется. Написав <code>int count = 5;</code>, вы уже не сможете написать <code>count = "бес";</code> — компилятор выдаст ошибку. Это помогает ловить ошибки рано.</p>
<h3>Примитивные типы</h3>
<table>
<tr><th>Тип</th><th>Размер</th><th>Пример</th></tr>
<tr><td><code>int</code></td><td>32 бита, ±2,1 млрд</td><td><code>int qty = 3;</code></td></tr>
<tr><td><code>long</code></td><td>64 бита, ±9.2·10¹⁸</td><td><code>long revenue = 5_000_000_000L;</code></td></tr>
<tr><td><code>double</code></td><td>64 бита, дробное число</td><td><code>double rate = 0.12;</code></td></tr>
<tr><td><code>char</code></td><td>один символ</td><td><code>char grade = 'A';</code></td></tr>
<tr><td><code>boolean</code></td><td>true / false</td><td><code>boolean paid = true;</code></td></tr>
</table>
<p>Есть также <code>byte</code>, <code>short</code>, <code>float</code>, но в повседневном коде они встречаются редко. <code>String</code> — не примитив, это класс (reference type), но он встречается очень часто. Если написать <code>var x = 10;</code>, компилятор сам определит тип (здесь <code>int</code>), но тип всё равно останется постоянным.</p>
<h3>Целочисленное деление и остаток</h3>
<pre><code>int total = 1000, people = 3;
System.out.println(total / people);            // 333  — дробная часть отбрасывается
System.out.println(total % people);            // 1    — остаток
System.out.println((double) total / people);   // 333.3333333333333
System.out.println(String.format("%.2f", (double) total / people)); // 333.33</code></pre>
<p>Если разделить два <code>int</code>, результат тоже будет <code>int</code>. Если нужен дробный результат, приведите один из операндов через <code>(double)</code> (<b>casting</b>). А если написать <code>double avg = total / people;</code>, сначала выполнится целочисленное деление (333), и только потом результат превратится в 333.0 — частая ошибка.</p>
<h3>Overflow</h3>
<p>Предел <code>int</code> — 2 147 483 647. Если его превысить, Java не выдаёт ошибку: число «переворачивается» и становится отрицательным. Если месячный оборот в тенге доходит до миллиардов, используйте <code>long</code>. Для неизменяемых значений есть <code>final</code>: <code>final double VAT = 0.12;</code>.</p>
<div class="tip">Хранить денежные суммы в <code>double</code> рискованно: 0.1 + 0.2 не равно ровно 0.3. В настоящих банковских системах используют <code>long</code> в тиынах или <code>BigDecimal</code>.</div>`,
        ex: [
          { prompt: 'Что будет напечатано?<pre><code>System.out.println(17 / 5 + 17 % 5);</code></pre>', explain: '17 / 5 = 3 (целочисленное деление), 17 % 5 = 2 (остаток), 3 + 2 = 5.' },
          { prompt: 'Чему равно <code>avg</code> после строки <code>double avg = 7 / 2;</code>?', options: ['3.5', '3.0', '4.0', 'Ошибка компиляции'], explain: '7 / 2 — два int, поэтому результат 3. Только потом он превращается в double: 3.0. Правильно: <code>7 / 2.0</code> или <code>(double) 7 / 2</code>.' },
          { prompt: 'Что произойдёт после выполнения <code>int x = 2_000_000_000; x = x + x;</code>?', options: ['x = 4 000 000 000', 'x станет отрицательным числом (overflow)', 'Будет выброшено ArithmeticException', 'Ошибка компиляции'], explain: 'int не может превысить 2 147 483 647. Java без предупреждения «переворачивается»: x = −294 967 296. Для больших сумм нужен <code>long</code>.' },
          { prompt: 'На входе два целых числа: количество товаров <code>n</code> и общая сумма <code>total</code> (в тенге). Напечатайте среднюю цену одного товара с 2 знаками после запятой. Например, <code>3 1000</code> → <code>333.33</code>. Подсказка: <code>String.format("%.2f", ...)</code>.', hints: ['<code>total / n</code> — целочисленное деление. Приведите одно из чисел через <code>(double)</code>.', '<code>String.format("%.2f", avg)</code> округляет до двух десятичных знаков.'] }
        ]
      },
      'jv-3': {
        title: 'String и StringBuilder',
        body: P`
<p><code>String</code> — самый часто используемый класс в Java. Его главное свойство: он <b>immutable</b>, то есть созданную строку изменить нельзя. <code>s.toUpperCase()</code> возвращает новую строку, а <code>s</code> остаётся прежней.</p>
<h3>Основные методы</h3>
<pre><code>String city = "Shymkent";
city.length()            // 8
city.charAt(0)           // 'S'  (индексы начинаются с 0)
city.substring(1, 4)     // "hym" (с 1 до 4, 4 не входит)
city.indexOf("ken")      // 4, если не найдено, то -1
city.toLowerCase()       // "shymkent"
city.contains("kent")    // true
"  hi ".trim()           // "hi"
"a,b,c".split(",")       // массив ["a", "b", "c"]</code></pre>
<h3>Не ==, а equals</h3>
<p><code>==</code> проверяет, ссылаются ли две переменные на <b>один и тот же объект</b>, а для сравнения содержимого нужен <code>equals</code>. Строка <code>"yes"</code>, прочитанная из Scanner, и литерал <code>"yes"</code> в коде могут быть разными объектами, поэтому <code>answer == "yes"</code> иногда даёт <code>false</code>. Всегда пишите <code>answer.equals("yes")</code> или <code>equalsIgnoreCase</code>. Сравнение по алфавиту — <code>a.compareTo(b)</code>: возвращает отрицательное число, ноль или положительное число.</p>
<h3>StringBuilder</h3>
<p>Так как String immutable, запись <code>s = s + x</code> в цикле на каждом шаге создаёт новую строку и копирует все символы — за n шагов O(n²). <code>StringBuilder</code> — изменяемый буфер:</p>
<pre><code>StringBuilder sb = new StringBuilder();
for (int i = 1; i &lt;= 5; i++) {
    sb.append(i).append(' ');
}
System.out.println(sb.toString().trim());   // 1 2 3 4 5
System.out.println(new StringBuilder("kaspi").reverse()); // ipsak</code></pre>
<p><code>append</code> принимает любой тип, <code>reverse()</code> переворачивает строку, есть также <code>insert</code>, <code>deleteCharAt</code>, <code>setCharAt</code>. В конце через <code>toString()</code> вы получаете обычный String.</p>
<div class="tip"><code>char</code> и <code>String</code> — разные вещи: <code>'a'</code> — символ (одинарные кавычки), <code>"a"</code> — строка (двойные кавычки). <code>s.charAt(i) == 'x'</code> — правильно, потому что char — примитив.</div>`,
        ex: [
          { prompt: 'Как правильно проверить, что строка <code>answer</code>, прочитанная из Scanner, равна <code>"yes"</code>?', options: ['<code>answer == "yes"</code>', '<code>answer.equals("yes")</code>', '<code>answer = "yes"</code>', '<code>answer.compareTo("yes") == 1</code>'], explain: '<code>==</code> сравнивает ссылки, а содержимое сравнивает <code>equals</code>. compareTo при равенстве возвращает 0, а не 1.' },
          { prompt: 'Чему равно <code>"Astana".substring(1, 4).length()</code>?', explain: 'substring(1, 4) — индексы 1, 2, 3: "sta". Длина 3.' },
          { prompt: 'На входе одно слово. Напечатайте его в обратном порядке с помощью <code>StringBuilder</code>: <code>java</code> → <code>avaj</code>.', hints: ['Создайте <code>new StringBuilder(word)</code>.', 'Метод <code>.reverse()</code> переворачивает буфер, <code>.toString()</code> возвращает String.'] },
          { prompt: '«Сожмите» строку (run-length encoding): вместо подряд идущих одинаковых букв запишите букву и их количество. <code>aaabcc</code> → <code>a3b1c2</code>, <code>abca</code> → <code>a1b1c1a1</code>. Собирайте результат в StringBuilder.', hints: ['<code>i</code> — начало группы. Внутренним циклом двигайте <code>j</code>, пока идёт та же буква.', 'Длина группы — <code>j - i</code>. Сделайте <code>append</code> после буквы и присвойте <code>i = j</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // пишите здесь\n        System.out.println(sb.toString());\n    }\n}\n' }
        ]
      },
      'jv-4': {
        title: 'Условия: if, else и switch',
        body: P`
<p>Условие основано на значении типа <code>boolean</code>. Операторы сравнения: <code>==  !=  &lt;  &gt;  &lt;=  &gt;=</code>. Логические операторы: <code>&amp;&amp;</code> (и), <code>||</code> (или), <code>!</code> (не). <code>&amp;&amp;</code> и <code>||</code> работают «по короткой схеме»: в записи <code>x != 0 &amp;&amp; 10 / x &gt; 2</code> при x, равном нулю, вторая часть вообще не вычисляется.</p>
<h3>if / else if / else</h3>
<pre><code>int tenge = 25000;
if (tenge &gt;= 50000) {
    System.out.println("Free delivery");
} else if (tenge &gt;= 20000) {
    System.out.println("Delivery 500");
} else {
    System.out.println("Delivery 1500");
}
String status = tenge &gt; 0 ? "paid" : "empty";   // тернарный оператор</code></pre>
<p>Условия проверяются сверху вниз: если выполнилось первое, остальные пропускаются. Поэтому больший порог пишем первым. Даже если в блоке всего одна строка, фигурные скобки лучше не опускать — тогда вы не ошибётесь, когда позже добавите строку.</p>
<h3>Классический switch</h3>
<pre><code>switch (day) {
    case 6:
    case 7:
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Workday");
}</code></pre>
<p>Если в классическом switch нет <code>break</code>, выполнение «проваливается» в следующий <code>case</code> (<b>fall-through</b>). Иногда это делают намеренно (6 и 7 вместе), но чаще это ошибка.</p>
<h3>Новый switch (Java 14+)</h3>
<pre><code>String name = switch (day) {
    case 1, 2, 3, 4, 5 -&gt; "Workday";
    case 6, 7 -&gt; "Weekend";
    default -&gt; "Unknown";
};</code></pre>
<p>В форме со стрелкой (<code>-&gt;</code>) fall-through нет, а сам switch возвращает значение. switch работает со значениями <code>int</code>, <code>char</code>, <code>String</code> и <code>enum</code>.</p>
<div class="tip">Правило високосного года — хороший пример объединения условий: делится на 4, но не делится на 100, ИЛИ делится на 400. Одно условие: <code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>.</div>`,
        ex: [
          { prompt: 'Что будет напечатано, если <code>d = 2</code>?<pre><code>switch (d) {\n    case 1: System.out.print("A");\n    case 2: System.out.print("B");\n    case 3: System.out.print("C"); break;\n    default: System.out.print("D");\n}</code></pre>', options: ['B', 'BC', 'BCD', 'D'], explain: 'В case 2 нет break, поэтому выполнение переходит в case 3 и печатает C, затем break останавливает: BC.' },
          { prompt: 'На входе балл от 0 до 100. Напечатайте оценку: 90 и выше → <code>A</code>, 75–89 → <code>B</code>, 60–74 → <code>C</code>, 50–59 → <code>D</code>, ниже 50 → <code>F</code>.', hints: ['Начните с самого большого порога: <code>if (score &gt;= 90)</code>.', 'Следующие ветки — через <code>else if</code>, последняя — <code>else</code>.'] },
          { prompt: 'Високосный ли год? Если високосный — <code>YES</code>, иначе <code>NO</code>. Правило: делится на 4 и не делится на 100, или делится на 400 (2000 — високосный, 1900 — нет).', hints: ['Одного <code>y % 4</code> недостаточно: 1900 делится на 4, но не високосный.', '<code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>'] }
        ]
      },
      'jv-5': {
        title: 'Циклы: for, while, break и continue',
        body: P`
<p>Цикл повторяет одно действие несколько раз. В Java есть три основных вида циклов.</p>
<h3>for</h3>
<pre><code>for (int i = 1; i &lt;= 5; i++) {
    System.out.print(i + " ");      // 1 2 3 4 5
}</code></pre>
<p>В скобках три части: начальное значение, условие продолжения и изменение после каждого шага. Переменная <code>i</code> видна только внутри цикла. Самая частая ошибка — <b>off-by-one</b>: путаница между <code>&lt;</code> и <code>&lt;=</code>. При обходе массива из n элементов пишут <code>i = 0; i &lt; n</code>.</p>
<h3>while и do-while</h3>
<p>Если заранее неизвестно, сколько раз нужно повторить, удобен <code>while</code>. Пример: мы положили на депозит 500 000 тенге под 12% годовых. Через сколько лет сумма превысит 1 000 000?</p>
<pre><code>double money = 500000;
int years = 0;
while (money &lt; 1000000) {
    money = money * 1.12;
    years++;
}
System.out.println(years);   // 7</code></pre>
<p><code>do { ... } while (cond);</code> выполняет тело хотя бы один раз и проверяет условие в конце. Например, при подсчёте цифр числа само число 0 должно считаться одной цифрой — do-while подходит именно для этого.</p>
<h3>break и continue</h3>
<p><code>break</code> полностью останавливает цикл, <code>continue</code> пропускает остаток текущего шага и переходит к следующему. Во вложенных циклах <code>break</code> выходит только из внутреннего цикла.</p>
<pre><code>for (int i = 1; i &lt;= 10; i++) {
    if (i % 2 == 0) continue;   // пропустить чётные числа
    if (i &gt; 7) break;           // остановиться после 7
    System.out.print(i + " ");  // 1 3 5 7
}</code></pre>
<h3>Работа с цифрами</h3>
<p><code>n % 10</code> — последняя цифра, <code>n / 10</code> — число без последней цифры. Если повторять эти два действия в цикле <code>while (n &gt; 0)</code>, вы получите все цифры числа справа налево.</p>
<div class="tip">Если условие цикла никогда не станет false, программа будет крутиться вечно (infinite loop), и тест превысит лимит времени. Когда пишете while, убедитесь, что переменная из условия меняется в теле цикла.</div>`,
        ex: [
          { prompt: 'Сколько раз выполнится этот цикл?<pre><code>for (int i = 0; i &lt; 20; i += 3) {\n    System.out.println(i);\n}</code></pre>', explain: 'i = 0, 3, 6, 9, 12, 15, 18 — семь значений. 21 &lt; 20 неверно, цикл останавливается.' },
          { prompt: 'Что будет напечатано?<pre><code>int s = 0;\nfor (int i = 1; i &lt;= 10; i++) {\n    if (i % 3 == 0) continue;\n    if (i == 8) break;\n    s += i;\n}\nSystem.out.println(s);</code></pre>', explain: '1 + 2 + 4 + 5 + 7 = 19. 3 и 6 пропускаются через continue, при i = 8 срабатывает break.' },
          { prompt: 'На входе неотрицательное целое <code>n</code> (≤ 10⁹). Напечатайте сумму его цифр: <code>12345</code> → <code>15</code>.', hints: ['<code>n % 10</code> даёт последнюю цифру, <code>n /= 10</code> её убирает.', 'Накапливайте сумму в цикле <code>while (n &gt; 0)</code>.'] },
          { prompt: '<b>Последовательность Коллатца.</b> Если n чётное — n/2, если нечётное — 3n+1. Сколько шагов нужно, чтобы дойти до n = 1? <code>6</code> → <code>8</code> (6, 3, 10, 5, 16, 8, 4, 2, 1). Если n = 1, то 0. Промежуточные значения могут выйти за предел int, поэтому используйте <code>long</code>.', hints: ['Цикл <code>while (n != 1)</code> считает шаги.', 'Внутри: <code>if (n % 2 == 0)</code> — деление на два, иначе <code>3 * n + 1</code>.'] }
        ]
      },
      'jv-6': {
        title: 'Методы (methods) и overloading',
        body: P`
<p>Метод (method) — именованный фрагмент кода, который можно использовать повторно. Это аналог функции в Python, но в Java каждый метод находится внутри класса. Пока мы пишем методы <code>static</code>, которые вызываются без объекта.</p>
<pre><code>public class Main {
    static long withVat(long price) {        // тип возврата, имя, параметры
        return price + price * 12 / 100;
    }

    static void printReceipt(String item, long price) {   // void — ничего не возвращает
        System.out.println(item + ": " + withVat(price));
    }

    public static void main(String[] args) {
        printReceipt("Phone", 250000);   // Phone: 280000
    }
}</code></pre>
<p><b>Сигнатура</b> метода — его имя и типы параметров. Тип возврата писать обязательно; в методе, который не <code>void</code>, каждый путь выполнения должен заканчиваться <code>return</code>, иначе компилятор выдаст ошибку.</p>
<h3>Overloading</h3>
<p>Можно написать несколько методов с одним именем, но разными параметрами:</p>
<pre><code>static int area(int side) { return side * side; }
static int area(int w, int h) { return w * h; }
static double area(double r) { return Math.PI * r * r; }</code></pre>
<p>Компилятор сам выбирает, какой из них вызвать, по количеству и типам аргументов. Два метода, которые отличаются только типом возврата (<code>int f(int)</code> и <code>double f(int)</code>), существовать вместе не могут — при вызове их невозможно различить.</p>
<h3>Pass-by-value</h3>
<p>Java всегда передаёт аргументы <b>по значению</b>. Если передан примитив (int, double), метод получает его копию: изменения внутри не влияют на внешнюю переменную. Если передан массив или объект, передаётся копия <b>ссылки</b> — обе ссылки указывают на один объект, поэтому <code>arr[0] = 5</code> будет видно и снаружи. А если заменить саму ссылку, <code>arr = new int[3]</code>, внешняя переменная не изменится.</p>
<div class="tip">Хороший метод делает что-то одно, и его имя говорит об этом: <code>isPrime</code>, <code>gcd</code>, <code>parsePrice</code>. Методы, возвращающие boolean, обычно начинаются со слов <code>is</code>/<code>has</code>.</div>`,
        ex: [
          { prompt: 'Что будет напечатано?<pre><code>static void change(int x, int[] arr) {\n    x = 100;\n    arr[0] = 100;\n}\n// внутри main:\nint a = 1;\nint[] b = {1};\nchange(a, b);\nSystem.out.println(a + " " + b[0]);</code></pre>', options: ['1 1', '100 100', '1 100', '100 1'], explain: 'Изменилась копия int, внешняя a осталась равна 1. Ссылка на массив скопирована, но указывает на тот же массив, поэтому b[0] = 100.' },
          { prompt: 'Какая пара методов НЕ МОЖЕТ находиться в одном классе?', options: ['<code>int f(int x)</code> и <code>int f(double x)</code>', '<code>int f(int x)</code> и <code>int f(int x, int y)</code>', '<code>int f(int x)</code> и <code>double f(int x)</code>', '<code>void f()</code> и <code>void f(String s)</code>'], explain: 'Overloading различает методы по параметрам. Если различается только тип возврата, вызов <code>f(5)</code> неоднозначен — ошибка компиляции.' },
          { prompt: 'Напишите метод <code>static int gcd(int a, int b)</code> (алгоритм Евклида: если b = 0, то a, иначе gcd(b, a % b)). На входе два положительных числа; напечатайте в одну строку НОД (gcd) и НОК (lcm = a / gcd · b): <code>12 18</code> → <code>6 36</code>.', hints: ['Цикл: <code>t = a % b; a = b; b = t;</code> — пока b не станет нулём.', 'lcm = <code>a / g * b</code> (если сначала делить, риск overflow меньше).'] },
          { prompt: 'Напишите метод <code>static boolean isPrime(int n)</code> (n &lt; 2 — не простое; делители достаточно проверять до <code>i * i &lt;= n</code>). На входе <code>n</code>; напечатайте количество простых чисел от 1 до n: <code>10</code> → <code>4</code> (2, 3, 5, 7).', hints: ['Сначала <code>if (n &lt; 2) return false;</code>', '<code>for (int d = 2; d * d &lt;= n; d++)</code> — если делится, false, после цикла true.'] }
        ]
      },
      'jv-7': {
        title: 'Массивы и 2D-массивы',
        body: P`
<p>Массив — последовательность элементов одного типа <b>фиксированного размера</b>. После создания его длину изменить нельзя (для этого есть ArrayList из следующих уроков).</p>
<pre><code>int[] sales = new int[5];            // [0, 0, 0, 0, 0]
int[] prices = {1200, 800, 4500};    // сразу со значениями
System.out.println(prices.length);   // 3 (без скобок — это поле)
prices[1] = 950;
for (int p : prices) {               // enhanced for: удобно только для чтения
    System.out.print(p + " ");
}</code></pre>
<p>Массив, созданный через <code>new</code>, заполняется значениями по умолчанию: <code>0</code> / <code>0.0</code> для чисел, <code>false</code> для <code>boolean</code>, <code>null</code> для объектов (String). Индексы — от <code>0</code> до <code>length - 1</code>. В стандартной JVM индекс за пределами массива выбрасывает <code>ArrayIndexOutOfBoundsException</code>, поэтому всегда внимательно пишите границы цикла.</p>
<h3>Полезные инструменты</h3>
<pre><code>import java.util.Arrays;
Arrays.sort(prices);                         // сортировка на месте
System.out.println(Arrays.toString(prices)); // [800, 1200, 4500]
int[] copy = Arrays.copyOf(prices, prices.length);
int[] same = prices;   // это НЕ копия: две ссылки на один массив</code></pre>
<h3>Наибольшее и наименьшее значение</h3>
<p>Брать начальное значение <code>0</code> при поиске максимума — классическая ошибка: если все числа отрицательные, ответ окажется 0. В качестве начального значения берите первый элемент (<code>a[0]</code>) или <code>Integer.MIN_VALUE</code>.</p>
<h3>2D-массивы</h3>
<p>Таблица, клетчатая карта, матрица — это массив массивов:</p>
<pre><code>int[][] grid = new int[3][4];      // 3 строки, 4 столбца
grid[1][2] = 7;
int rows = grid.length;            // 3
int cols = grid[0].length;         // 4
for (int r = 0; r &lt; rows; r++) {
    for (int c = 0; c &lt; cols; c++) {
        System.out.print(grid[r][c] + " ");
    }
    System.out.println();
}</code></pre>
<p>Строки могут быть разной длины (<b>jagged array</b>): <code>int[][] t = new int[3][];</code> и <code>t[0] = new int[5];</code>. <b>Транспонирование</b> матрицы (строки ↔ столбцы) — <code>t[c][r] = m[r][c]</code>, размер результата — <code>cols × rows</code>.</p>
<div class="tip">Шаблон чтения массива через Scanner: сначала <code>n = sc.nextInt()</code>, затем в <code>for</code> — <code>a[i] = sc.nextInt()</code>. Неважно, как числа разбиты по строкам — nextInt одинаково пропускает пробелы и переводы строк.</div>`,
        ex: [
          { prompt: 'Что будет напечатано?<pre><code>String[] names = new String[3];\nSystem.out.println(names[0]);</code></pre>', options: ['Пустая строка', '<code>null</code>', '0', 'Ошибка компиляции'], explain: 'Значение по умолчанию в массиве объектов — null. Для чисел было бы 0, для boolean — false.' },
          { prompt: 'Сколько всего элементов int в массиве <code>int[][] g = new int[4][6];</code>?', explain: '4 строки × 6 столбцов = 24 элемента.' },
          { prompt: 'На входе <code>n</code>, затем n целых чисел. Напечатайте в одну строку наибольшее и наименьшее значение: <code>5</code> / <code>3 9 -2 7 0</code> → <code>9 -2</code>. Все числа могут быть отрицательными.', hints: ['Начальное <code>max = 0</code> даёт ошибку на отрицательных числах.', 'Начинайте <code>max</code> и <code>min</code> со значения <code>a[0]</code>.'] },
          { prompt: 'На входе <code>r c</code>, затем матрица r × c. Напечатайте транспонированную матрицу (c строк, в каждой r чисел через пробел):<pre><code>2 3        1 4\n1 2 3  →   2 5\n4 5 6      3 6</code></pre>', hints: ['При выводе внешний цикл пусть идёт по столбцам (<code>j</code>), внутренний — по строкам (<code>i</code>).', 'В каждой строке вывода собирайте значения <code>m[i][j]</code> для i = 0..r−1.'] }
        ]
      },
      'jv-8': {
        title: 'Класс и объект: constructor и encapsulation',
        body: P`
<p><b>Класс</b> — это шаблон (чертёж), а <b>объект</b> — конкретный экземпляр, созданный по этому шаблону. Например, у класса <code>Product</code> есть название и цена, а «iPhone, 450 000 ₸» — один из его объектов. Класс собирает в одном месте данные (<b>поля</b>, fields) и связанные с ними действия (<b>методы</b>).</p>
<pre><code>class Product {
    private String name;          // поля
    private int price;

    Product(String name, int price) {   // constructor
        this.name = name;               // this.name — поле, name — параметр
        this.price = price;
    }

    int getPrice() { return price; }    // getter

    void applyDiscount(int percent) {
        if (percent &lt; 0 || percent &gt; 90) return;   // класс сам защищает правило
        price = price - price * percent / 100;
    }

    public String toString() { return name + " (" + price + ")"; }
}

Product p = new Product("iPhone", 450000);
p.applyDiscount(10);
System.out.println(p);    // iPhone (405000)</code></pre>
<h3>Constructor</h3>
<p>Constructor — особый метод, который называется так же, как класс, и не имеет типа возврата. При вызове <code>new</code> он приводит объект в начальное состояние. Можно написать несколько конструкторов (overloading), причём один может вызывать другой через <code>this(...)</code>. Если не написать ни одного конструктора, компилятор сам добавит пустой.</p>
<h3>Encapsulation</h3>
<p>Делать поля <code>private</code> и давать доступ к ним только через методы — это <b>инкапсуляция</b>. Тогда цена не станет отрицательной, потому что единственный способ её изменить — метод, который выполняет проверку. Уровни доступа: <code>private</code> (только этот класс), по умолчанию (один package), <code>protected</code> (package + наследники), <code>public</code> (все).</p>
<h3>Поля static</h3>
<p>Поле <code>static</code> принадлежит не отдельному объекту, а всему классу: все объекты делят одно значение. Например, <code>static int created</code> — счётчик созданных объектов. Метод static не видит <code>this</code>, поэтому не может напрямую обращаться к полям объекта.</p>
<div class="tip">На этой платформе можно писать несколько классов в одном файле: <code>public class Main</code> только один, а дополнительные классы без <code>public</code> (<code>class Account { ... }</code>) стоят до или после Main.</div>`,
        ex: [
          { prompt: 'Какое утверждение о поле <code>private int balance;</code> верно?', options: ['Его может читать любой класс, но не может изменять', 'К нему можно обращаться только изнутри этого класса', 'Оно общее для всех объектов', 'Его нельзя задать в constructor'], explain: 'private виден только внутри своего класса. Снаружи мы работаем только через public-методы (getter, deposit). Общее для всех — это static.' },
          { prompt: 'Что будет напечатано?<pre><code>class Counter {\n    static int total = 0;\n    int mine = 0;\n    Counter() { total++; mine++; }\n}\n// main:\nnew Counter();\nnew Counter();\nCounter c = new Counter();\nSystem.out.println(Counter.total + " " + c.mine);</code></pre>', options: ['1 1', '3 3', '3 1', '1 3'], explain: 'total — static, три объекта делят один счётчик: 3. mine у каждого объекта свой, для c это 1.' },
          { prompt: 'Допишите класс <code>Account</code>: поле <code>balance</code> — <code>private</code>, метод <code>withdraw(int amount)</code> при нехватке средств ничего не меняет и возвращает <code>false</code>. Ввод: начальный баланс и количество команд q, затем q команд: <code>D x</code> (внести) или <code>W x</code> (снять). При каждом неудачном снятии печатайте <code>DENIED</code>, в конце — <code>BALANCE x</code>.', hints: ['Достаточно изменить только метод <code>withdraw</code>.', '<code>if (amount &gt; balance) return false;</code> — баланс остаётся прежним.'] }
        ]
      },
      'jv-9': {
        title: 'Наследование, полиморфизм и interface',
        body: P`
<p><b>Наследование</b> (inheritance) позволяет создать новый класс, расширив существующий: <code>class Dog extends Animal</code>. Dog получает поля и методы Animal и может добавить свои. В Java класс может расширять (extends) только <b>один</b> класс.</p>
<pre><code>abstract class Employee {
    protected String name;
    Employee(String name) { this.name = name; }
    abstract long monthlyPay();               // без тела: наследники обязаны его написать
    String describe() { return name + ": " + monthlyPay(); }
}

class Salaried extends Employee {
    private long salary;
    Salaried(String name, long salary) {
        super(name);                           // constructor родительского класса
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
<p>Из класса <code>abstract</code> нельзя напрямую создать объект. Аннотация <code>@Override</code> говорит компилятору: «я переопределяю метод родительского класса» — если в имени ошибка, он сразу предупредит.</p>
<h3>Полиморфизм</h3>
<pre><code>Employee[] staff = { new Salaried("Aliya", 600000), new Hourly("Timur", 3000, 120) };
for (Employee e : staff) {
    System.out.println(e.describe());   // каждый вызывает свой monthlyPay()
}</code></pre>
<p>Хотя тип переменной — <code>Employee</code>, какой метод будет вызван, определяет <b>реальный тип объекта</b> (dynamic dispatch). Благодаря этому при добавлении нового вида сотрудника цикл менять не нужно.</p>
<h3>Interface</h3>
<p>Interface — это «контракт»: он говорит, какие методы должны быть у класса, но не хранит состояние (поля). Класс может реализовывать (<code>implements</code>) несколько интерфейсов.</p>
<pre><code>interface Shape {
    double area();
    default String label() { return "shape"; }   // default-метод: у него есть готовое тело
}
class Square implements Shape {
    private double s;
    Square(double s) { this.s = s; }
    public double area() { return s * s; }        // методы интерфейса — public
}</code></pre>
<div class="tip">Что когда выбирать: родственные классы, которые делят общие поля и код, — abstract class; способность «умеет выполнять это действие» (Comparable, Runnable, Shape) — interface. Все классы наследуются от <code>Object</code>, поэтому <code>toString</code>, <code>equals</code>, <code>hashCode</code> есть у каждого.</div>`,
        ex: [
          { prompt: 'Что будет напечатано?<pre><code>class Animal { String sound() { return "..."; } }\nclass Dog extends Animal {\n    @Override String sound() { return "Woof"; }\n}\n// main:\nAnimal a = new Dog();\nSystem.out.println(a.sound());</code></pre>', options: ['...', 'Woof', 'Ошибка компиляции: тип a — Animal', 'Animal'], explain: 'Dynamic dispatch: тип переменной Animal, но объект — Dog. Вызывается переопределённый Dog.sound().' },
          { prompt: 'Какая запись в Java верна?', options: ['<code>class A extends B, C</code>', '<code>class A implements B extends C</code>', '<code>class A extends B implements C, D</code>', '<code>interface A extends class B</code>'], explain: 'Класс расширяет (extends) один класс и реализует (implements) несколько интерфейсов. extends пишется первым.' },
          { prompt: 'Интерфейс <code>Shape</code> и класс <code>Rect</code> уже готовы. Допишите метод <code>area()</code> класса <code>Circle</code> (π·r², <code>Math.PI</code>). Ввод: n, затем n строк: <code>C r</code> или <code>R w h</code>. Напечатайте общую площадь всех фигур с 2 десятичными знаками.', hints: ['Измените только тело Circle.area().', '<code>return Math.PI * r * r;</code>'] }
        ]
      },
      'jv-10': {
        title: 'Коллекции: ArrayList, HashMap, HashSet',
        body: P`
<p>Размер массива фиксирован, а реальные данные растут. <b>Java Collections Framework</b> даёт готовые структуры. Три самые используемые:</p>
<table>
<tr><th>Interface</th><th>Реализация</th><th>Для чего</th></tr>
<tr><td><code>List</code></td><td><code>ArrayList</code></td><td>есть порядок, доступ по индексу, возможны повторы</td></tr>
<tr><td><code>Map</code></td><td><code>HashMap</code>, <code>TreeMap</code></td><td>ключ → значение, поиск по ключу за O(1)</td></tr>
<tr><td><code>Set</code></td><td><code>HashSet</code>, <code>TreeSet</code></td><td>элементы без повторов</td></tr>
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
orders.merge("Shymkent", 1, Integer::sum);   // если нет — 1, если есть — +1
orders.get("Aktobe");                        // null — такого ключа нет
orders.containsKey("Almaty");                // true
for (Map.Entry&lt;String, Integer&gt; e : orders.entrySet()) {
    System.out.println(e.getKey() + " " + e.getValue());
}

Set&lt;Integer&gt; seen = new HashSet&lt;&gt;();
seen.add(5); seen.add(5);
seen.size();           // 1
seen.contains(5);      // true</code></pre>
<h3>Generics и классы-обёртки</h3>
<p>Тип в угловых скобках (<code>&lt;String&gt;</code>) говорит, что хранится в коллекции, — компилятор не даст добавить другой тип. Коллекции хранят только объекты, поэтому вместо примитива пишется класс-обёртка (wrapper): <code>int → Integer</code>, <code>double → Double</code>, <code>char → Character</code>. <code>List&lt;int&gt;</code> — ошибка компиляции. Java автоматически упаковывает и распаковывает значения (<b>autoboxing</b>). Но будьте осторожны: сравнение двух <code>Integer</code> через <code>==</code> для значений больше 127 может дать <code>false</code> — используйте <code>equals</code>.</p>
<h3>Порядок</h3>
<p><code>HashMap</code> и <code>HashSet</code> не гарантируют, что элементы хранятся в каком-то определённом порядке. Если ключи нужны по алфавиту — <code>TreeMap</code>/<code>TreeSet</code> (O(log n)), если нужен порядок добавления — <code>LinkedHashMap</code>.</p>
<div class="tip">Привычка объявлять переменную через тип интерфейса: <code>List&lt;String&gt; xs = new ArrayList&lt;&gt;();</code>. Потом сменить реализацию (например, на <code>LinkedList</code>) можно, изменив одно слово.</div>`,
        ex: [
          { prompt: 'Какая строка не скомпилируется?', options: ['<code>List&lt;Integer&gt; a = new ArrayList&lt;&gt;();</code>', '<code>List&lt;int&gt; a = new ArrayList&lt;&gt;();</code>', '<code>Map&lt;String, Integer&gt; m = new HashMap&lt;&gt;();</code>', '<code>Set&lt;String&gt; s = new TreeSet&lt;&gt;();</code>'], explain: 'Generics работают только со ссылочными типами. Вместо int пишется класс-обёртка Integer.' },
          { prompt: 'Если <code>Map&lt;String, Integer&gt; m = new HashMap&lt;&gt;();</code> пуст, что вернёт <code>m.get("Taraz")</code>?', options: ['0', '<code>null</code>', 'Выбросит NoSuchElementException', 'Пустую строку ""'], explain: 'Если ключа нет, get возвращает null. Если распаковать его в int (<code>int x = m.get(...)</code>), будет NullPointerException, поэтому удобен <code>getOrDefault(key, 0)</code>.' },
          { prompt: 'На входе n, затем n целых чисел. Напечатайте первое значение, которое в порядке чтения встретилось <b>второй раз</b> (используйте <code>HashSet</code>). Если такого нет — <code>NONE</code>. Пример: <code>3 1 4 1 5 3</code> → <code>1</code>.', hints: ['Перед добавлением каждого числа проверяйте <code>seen.contains(x)</code>.', 'Если нашли, напечатайте и выйдите из main через <code>return;</code>.'] },
          { prompt: 'На входе n, затем n слов (названия городов). Посчитайте, сколько раз встретилось каждое слово, и напечатайте слова <b>по алфавиту</b> в виде <code>слово количество</code>. <code>TreeMap</code> сам сортирует ключи.', hints: ['<code>freq.getOrDefault(w, 0)</code> — текущее количество (если нет, 0).', '<code>freq.put(w, ... + 1)</code> или <code>freq.merge(w, 1, Integer::sum)</code>.'], starter: 'import java.util.Map;\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> freq = new TreeMap<>();\n        for (int i = 0; i < n; i++) {\n            String w = sc.next();\n            // обновите freq\n        }\n        for (Map.Entry<String, Integer> e : freq.entrySet()) {\n            System.out.println(e.getKey() + " " + e.getValue());\n        }\n    }\n}\n' }
        ]
      },
      'jv-11': {
        title: 'Exceptions: try, catch, throw и собственный exception',
        body: P`
<p><b>Exception</b> — событие, которое нарушает нормальный ход программы: строка, которая не превращается в число, отсутствующий файл, ссылка null. Когда exception выброшен (throw), Java ищет вверх по стеку вызовов блок, который его перехватит (<code>catch</code>). Если никто не перехватит, программа напечатает stack trace и остановится.</p>
<pre><code>try {
    int qty = Integer.parseInt("12a");     // NumberFormatException
    System.out.println("never printed");
} catch (NumberFormatException e) {
    System.out.println("Bad number: " + e.getMessage());
} finally {
    System.out.println("always");          // выполняется и при ошибке, и без неё
}</code></pre>
<p>Можно написать несколько <code>catch</code> — сначала более конкретный тип, затем более общий. Несколько типов в одном блоке: <code>catch (IllegalArgumentException | IllegalStateException e)</code>. <code>finally</code> предназначен для закрытия ресурсов; в современном коде вместо него используют <b>try-with-resources</b>: <code>try (Scanner sc = new Scanner(file)) { ... }</code> — ресурс закрывается сам.</p>
<h3>Checked и unchecked</h3>
<p><b>Checked</b> exception (<code>IOException</code>, наследники <code>Exception</code>, не являющиеся RuntimeException) — ожидаемые сбои во внешнем мире. Компилятор требует либо перехватить их через <code>catch</code>, либо объявить в сигнатуре метода через <code>throws</code>. <b>Unchecked</b> (наследники <code>RuntimeException</code>: <code>NullPointerException</code>, <code>IllegalArgumentException</code>, <code>NumberFormatException</code>, <code>ArithmeticException</code>, <code>ArrayIndexOutOfBoundsException</code>) — обычно ошибки в коде, объявлять их не обязательно.</p>
<h3>throw и собственный класс exception</h3>
<pre><code>class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) { super(message); }
}

void withdraw(long amount) throws InsufficientFundsException {
    if (amount &lt;= 0) throw new IllegalArgumentException("Bad amount: " + amount);
    if (amount &gt; balance)
        throw new InsufficientFundsException("Not enough: need " + amount + ", have " + balance);
    balance -= amount;
}</code></pre>
<p>Собственный exception говорит на языке предметной области: вызывающий код пишет <code>catch (InsufficientFundsException e)</code> и обрабатывает конкретную ситуацию. <code>super(message)</code> сохраняет сообщение, его можно прочитать через <code>e.getMessage()</code>.</p>
<div class="tip">Не глотайте exception молча: пустой <code>catch (Exception e) {}</code> скрывает ошибку. Вместо слишком общего <code>catch (Exception e)</code> перехватывайте конкретный тип, которого вы ожидаете.</div>`,
        ex: [
          { prompt: 'Какой exception является <b>checked</b>, то есть компилятор требует перехватить его через catch или объявить через <code>throws</code>?', options: ['NullPointerException', 'IllegalArgumentException', 'IOException', 'NumberFormatException'], explain: 'IOException наследуется напрямую от Exception (не от RuntimeException) — он checked. Остальные три — наследники RuntimeException.' },
          { prompt: 'Что будет напечатано?<pre><code>try {\n    System.out.print("A");\n    throw new IllegalStateException();\n} catch (IllegalStateException e) {\n    System.out.print("B");\n} finally {\n    System.out.print("C");\n}\nSystem.out.print("D");</code></pre>', options: ['A', 'AB', 'ABC', 'ABCD'], explain: 'Печатается A, exception перехватывается в catch (B), finally выполняется всегда (C), а так как exception обработан, программа продолжается (D).' },
          { prompt: 'На входе n, затем n токенов (token). Превратите каждый в число через <code>Integer.parseInt</code>. Корректные числа сложите, ошибочные (<code>NumberFormatException</code>) посчитайте. Вывод: <code>SUM s</code> и <code>BAD k</code>.', hints: ['Поместите вызов parseInt внутрь <code>try { ... }</code>.', '<code>catch (NumberFormatException e) { bad++; }</code>'] },
          { prompt: 'Допишите метод <code>Wallet.withdraw</code>: если сумма ≤ 0, он выбрасывает <code>IllegalArgumentException("Bad amount: " + amount)</code>, если денег не хватает — <code>InsufficientFundsException("Not enough: need " + amount + ", have " + balance)</code>. main выполняет каждое снятие внутри try/catch и при ошибке печатает <code>e.getMessage()</code>. В конце — <code>BALANCE x</code>.', hints: ['В withdraw две проверки: сначала <code>amount &lt;= 0</code>, затем <code>amount &gt; balance</code>. Баланс уменьшается, только если пройдены обе.', 'IllegalArgumentException — unchecked, но main должен перехватывать и его: добавьте второй <code>catch (IllegalArgumentException e)</code>.'] }
        ]
      },
      'jv-12': {
        title: 'Generics, lambda и stream',
        body: P`
<p><b>Generics</b> позволяют безопасно использовать один и тот же код с разными типами. Когда вы пишете <code>ArrayList&lt;String&gt;</code>, вы используете generic-класс; теперь напишем свой:</p>
<pre><code>class Pair&lt;A, B&gt; {
    private final A first;
    private final B second;
    Pair(A first, B second) { this.first = first; this.second = second; }
    A getFirst() { return first; }
    B getSecond() { return second; }
}
Pair&lt;String, Integer&gt; p = new Pair&lt;&gt;("Almaty", 2_200_000);

static &lt;T extends Comparable&lt;T&gt;&gt; T maxOf(List&lt;T&gt; xs) {   // generic-метод
    T best = xs.get(0);
    for (T x : xs) if (x.compareTo(best) &gt; 0) best = x;
    return best;
}</code></pre>
<p><code>T extends Comparable&lt;T&gt;</code> — ограничение (bound): T должен быть типом, который можно сравнивать. Generics проверяются только при компиляции; во время выполнения информация о типе стирается (<b>type erasure</b>), поэтому писать <code>new T()</code> нельзя.</p>
<h3>Lambda</h3>
<p>Lambda — короткая запись интерфейса с одним методом (<b>functional interface</b>): <code>(параметры) -&gt; выражение</code>.</p>
<pre><code>Predicate&lt;Integer&gt; isBig = x -&gt; x &gt; 100000;        // boolean test(x)
Function&lt;String, Integer&gt; len = s -&gt; s.length();      // R apply(x)
Comparator&lt;Student&gt; byScore = (a, b) -&gt; b.score - a.score;   // по убыванию

students.sort((a, b) -&gt; {
    if (a.score != b.score) return b.score - a.score;  // сначала по убыванию балла
    return a.name.compareTo(b.name);                   // если равны — по имени
});</code></pre>
<p>Если Comparator возвращает отрицательное число, первым идёт <code>a</code>, если положительное — <code>b</code>. <b>Method reference</b> — ещё более короткая форма lambda: <code>String::length</code>, <code>Integer::sum</code>.</p>
<h3>Stream</h3>
<p>Stream — обработка коллекции через «конвейер»: filter → map → результат. Исходная коллекция не меняется.</p>
<pre><code>int[] prices = {1200, 45000, 800, 150000, 45000};
long expensive = Arrays.stream(prices).filter(p -&gt; p &gt; 10000).count();        // 3
int total = Arrays.stream(prices).sum();
int[] uniq = Arrays.stream(prices).distinct().sorted().toArray();           // [800, 1200, 45000, 150000]
List&lt;String&gt; names = students.stream()
    .filter(s -&gt; s.score &gt;= 90)
    .map(s -&gt; s.name)
    .collect(Collectors.toList());</code></pre>
<div class="tip">Stream удобно читать, но превращать в stream каждый цикл не нужно. Простой и быстрый цикл часто понятнее. А Java/Scala API Spark написан как раз в этом стиле filter/map.</div>`,
        ex: [
          { prompt: 'Если <code>Predicate&lt;Integer&gt; p = x -&gt; x % 2 == 0;</code>, что вернёт <code>p.test(7)</code>?', options: ['true', 'false', '1', 'Ошибка компиляции'], explain: 'Lambda вычисляет выражение 7 % 2 == 0: 1 == 0 — false.' },
          { prompt: 'Чему равен результат?<pre><code>int r = IntStream.rangeClosed(1, 6)\n    .filter(x -&gt; x % 2 == 0)\n    .map(x -&gt; x * x)\n    .sum();</code></pre>', explain: 'Чётные: 2, 4, 6. Их квадраты: 4, 16, 36. Сумма 56.' },
          { prompt: 'На входе n, затем n строк <code>имя балл</code>. Отсортируйте студентов по баллу в порядке <b>убывания</b>, а при равных баллах — по имени в алфавитном порядке, и напечатайте в виде <code>имя балл</code>. Напишите lambda-comparator внутри <code>list.sort</code>.', hints: ['По убыванию: <code>b.score - a.score</code>.', 'При равных баллах: <code>return a.name.compareTo(b.name);</code>'], starter: 'import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    static class Student {\n        String name;\n        int score;\n        Student(String name, int score) { this.name = name; this.score = score; }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Student> list = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            String name = sc.next();\n            int score = sc.nextInt();\n            list.add(new Student(name, score));\n        }\n        // напишите list.sort(...)\n        for (Student s : list) {\n            System.out.println(s.name + " " + s.score);\n        }\n    }\n}\n' },
          { prompt: 'На входе n, затем n целых чисел. С помощью <code>Arrays.stream</code> возьмите <b>чётные</b> числа, удалите повторы, отсортируйте по возрастанию и напечатайте в одну строку через пробел. Если чётных чисел нет — <code>NONE</code>. Пример: <code>4 3 8 4 -2 7 8</code> → <code>-2 4 8</code>.', hints: ['<code>Arrays.stream(a).filter(x -&gt; x % 2 == 0)</code> — отрицательные чётные числа тоже дают % 2 == 0.', 'Дальше <code>.distinct().sorted().toArray()</code>.'], starter: 'import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int[] evens = a;   // вычислите через stream\n        if (evens.length == 0) {\n            System.out.println("NONE");\n            return;\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int x : evens) {\n            if (sb.length() > 0) sb.append(\' \');\n            sb.append(x);\n        }\n        System.out.println(sb);\n    }\n}\n' }
        ]
      },
      'jv-13': {
        title: 'Scanner подробнее и рекурсия',
        body: P`
<h3>Scanner: next, nextInt, nextLine</h3>
<p><code>next()</code> и <code>nextInt()</code> пропускают пробельные символы (пробел, перевод строки) и читают следующий <b>токен</b> (token). <code>nextLine()</code> читает <b>остаток</b> текущей строки. Отсюда известная ловушка:</p>
<pre><code>// Ввод:
// 3
// Almaty Astana Shymkent
int n = sc.nextInt();        // прочитано 3, курсор стоит после "3", в конце строки
String line = sc.nextLine(); // "" — остаток первой строки (пустой)!
line = sc.nextLine();        // "Almaty Astana Shymkent"</code></pre>
<p>Решение: после nextInt вызвать один «пустой» <code>nextLine()</code> или читать всё по токенам. Если неизвестно, сколько будет чисел, используют <code>hasNextInt()</code> — он проверяет, является ли следующий токен целым числом, и возвращает <code>false</code>, когда ввод закончился или встретился токен, который не является числом:</p>
<pre><code>long sum = 0;
while (sc.hasNextInt()) {
    sum += sc.nextInt();
}</code></pre>
<h3>Рекурсия</h3>
<p>Рекурсия — это вызов методом самого себя. В каждом рекурсивном методе есть две части: <b>базовый случай</b> (условие остановки) и <b>рекурсивный шаг</b>, который уменьшает задачу.</p>
<pre><code>static long factorial(int n) {
    if (n &lt;= 1) return 1;            // базовый случай
    return n * factorial(n - 1);     // задача поменьше
}</code></pre>
<p>Каждый вызов добавляет новый фрейм в <b>call stack</b>. Если забыть базовый случай или глубина слишком велика, возникает <code>StackOverflowError</code>. Наивный Fibonacci <code>fib(n) = fib(n-1) + fib(n-2)</code> снова и снова вычисляет одни и те же значения, число вызовов растёт экспоненциально; хранение вычисленных значений в массиве (<b>memoization</b>) делает его O(n).</p>
<h3>Backtracking</h3>
<p>Рекурсия естественно подходит для задач «перебрать все варианты»: на каждом шаге делаем выбор, уходим в рекурсию, затем отменяем выбор. Например, построение двоичных строк длины n:</p>
<pre><code>static void gen(StringBuilder cur, int n) {
    if (cur.length() == n) { System.out.println(cur); return; }
    for (char c : new char[]{'0', '1'}) {
        cur.append(c);                      // выбор
        gen(cur, n);                        // углубление
        cur.deleteCharAt(cur.length() - 1); // отмена
    }
}</code></pre>
<div class="tip">Прежде чем писать рекурсию, ответьте на два вопроса: «какой вход самый маленький и какой у него ответ?» и «как получить ответ для n через ответ для n−1 (или n/2)?».</div>`,
        ex: [
          { prompt: 'Ввод: <code>5</code>, перевод строки, <code>Almaty Astana</code>. Чему равен <code>line</code> после этого кода?<pre><code>int n = sc.nextInt();\nString line = sc.nextLine();</code></pre>', options: ['"Almaty Astana"', '"" (пустая строка)', '"Almaty"', '"5"'], explain: 'nextInt читает только 5, курсор остаётся в конце первой строки. nextLine возвращает остаток этой строки — пустую строку.' },
          { prompt: 'Для наивного <code>fib(n)</code> (если <code>n &lt;= 1</code>, возвращает n, иначе <code>fib(n-1) + fib(n-2)</code>) при вызове <code>fib(5)</code> сколько всего раз будет вызван метод (включая первый вызов)?', explain: 'C(0) = C(1) = 1, C(n) = 1 + C(n−1) + C(n−2): C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 15.' },
          { prompt: 'На входе неизвестное количество целых чисел (возможно, на нескольких строках); если встретился токен, который не является числом, или ввод закончился, прекратите чтение. Читайте через <code>hasNextInt()</code> и напечатайте в одну строку <code>сумма количество</code>. Пример: <code>1 2 3</code> → <code>6 3</code>.', hints: ['<code>while (sc.hasNextInt())</code> — пока следующий токен является числом.', 'Внутри <code>sum += sc.nextInt(); count++;</code>'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long sum = 0;\n        int count = 0;\n        // напишите цикл с hasNextInt\n        System.out.println(sum + " " + count);\n    }\n}\n' },
          { prompt: 'На входе n (1 ≤ n ≤ 12). С помощью рекурсии напечатайте в лексикографическом порядке (каждую на отдельной строке) все двоичные строки длины n, в которых <b>нет двух единиц подряд</b>. n = 3: <code>000 001 010 100 101</code>.', hints: ['Базовый случай: <code>cur.length() == n</code> — напечатать и return.', 'Сначала добавьте 0 и углубитесь (ради лексикографического порядка), затем добавляйте 1, только если последний символ не 1. После каждой ветки — <code>deleteCharAt</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    static void gen(StringBuilder cur, int n) {\n        // напишите рекурсию\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        gen(new StringBuilder(), n);\n    }\n}\n' }
        ]
      },
      'jv-p1': {
        title: 'Сборник задач 1: от лёгких к средним',
        body: P`
<p>В этом уроке нет новой темы: вы применяете изученное в задачах в стиле DSA. Задачи расположены от лёгких к средним. Перед решением каждой сделайте три вещи:</p>
<ul>
<li>Определите <b>формат ввода</b>: что идёт сначала (n, затем массив?), каким типом читать.</li>
<li>Продумайте <b>граничные случаи</b>: один элемент, все одинаковые, ответа нет.</li>
<li>Оцените <b>сложность</b>: при n = 10⁵ O(n²) слишком медленно — HashMap/HashSet дают O(n).</li>
</ul>
<h3>Полезные шаблоны</h3>
<pre><code>// подсчёт частот (только строчные латинские буквы)
int[] cnt = new int[26];
for (char c : s.toCharArray()) cnt[c - 'a']++;

// "видел ли я это раньше?" + индекс
Map&lt;Integer, Integer&gt; pos = new HashMap&lt;&gt;();
if (pos.containsKey(need)) { ... }
pos.putIfAbsent(x, i);

// два указателя (two pointers)
int i = 0, j = s.length() - 1;
while (i &lt; j) { ...; i++; j--; }</code></pre>
<p>Трюк <code>c - 'a'</code>: в Java char работает и как число, <code>'c' - 'a' == 2</code>. Поэтому массив из 26 ячеек считает частоты строчных латинских букв быстрее, чем HashMap. <code>Character.toLowerCase(c)</code> приводит регистр к одному виду.</p>
<p>Главная идея задачи Two Sum: для каждого <code>a[j]</code> спрашиваем у HashMap: «мне нужно <code>target − a[j]</code>, встречалось ли оно раньше?». Это сводит поиск пары за O(n²) к O(n) — один из самых частых трюков на собеседованиях.</p>
<div class="tip">Будьте внимательны к формату вывода: тест сравнивает текст точно. <code>YES</code> и <code>Yes</code> — разные ответы.</div>`,
        ex: [
          { prompt: '<b>FizzBuzz.</b> На входе n. Для каждого числа от 1 до n на отдельной строке: если делится на 15 — <code>FizzBuzz</code>, на 3 — <code>Fizz</code>, на 5 — <code>Buzz</code>, иначе само число.', hints: ['Порядок условий важен: 15 нужно проверять первым.', 'Поставьте ветку <code>if (i % 15 == 0)</code> в самое начало.'] },
          { prompt: '<b>Палиндром.</b> На входе одно слово (латинские буквы). Если без учёта регистра оно читается одинаково слева направо и справа налево — <code>YES</code>, иначе <code>NO</code>. Используйте два указателя (two pointers): <code>Level</code> → <code>YES</code>.', hints: ['Сначала <code>toLowerCase()</code>.', '<code>i = 0, j = length − 1</code>; сравнивайте, пока <code>i &lt; j</code>, и двигайтесь к середине.'] },
          { prompt: '<b>Анаграмма.</b> На входе два слова из строчных латинских букв. Если они состоят из одних и тех же букв (в одинаковом количестве) — <code>YES</code>, иначе <code>NO</code>. Используйте массив частот <code>int[26]</code>.', hints: ['Для букв первого слова <code>cnt[c - \'a\']++</code>, для второго — <code>--</code>.', 'Если в конце все ячейки равны 0 — это анаграмма.'] },
          { prompt: '<b>Two Sum.</b> На входе <code>n target</code>, затем n чисел. Двигаясь слева направо, найдите <b>наименьшее j</b>, для которого <code>a[i] + a[j] = target</code> (i &lt; j), а i — индекс самого первого появления этого значения. Напечатайте <code>i j</code>, если пары нет — <code>-1 -1</code>. Для решения за O(n) используйте HashMap.', hints: ['Для каждого x проверьте, есть ли в map <code>need = target − x</code>, — и только потом добавляйте x.', '<code>putIfAbsent(x, j)</code> сохраняет первый индекс значения.'] },
          { prompt: 'Сколько примерно сравнений сделает binary search в худшем случае в отсортированном массиве из 1 000 000 элементов? (округлите до целого)', explain: 'На каждом шаге область поиска уменьшается вдвое: log₂(10⁶) ≈ 19.93, то есть 20 шагов.' }
        ]
      },
      'jv-p2': {
        title: 'Сборник задач 2: от средних к сложным',
        body: P`
<p>Задачи второго сборника требуют правильно выбрать структуру данных. В Java все они уже готовы:</p>
<table>
<tr><th>Структура</th><th>Класс Java</th><th>Основные методы</th></tr>
<tr><td>Stack</td><td><code>ArrayDeque&lt;Character&gt;</code></td><td><code>push</code>, <code>pop</code>, <code>peek</code>, <code>isEmpty</code></td></tr>
<tr><td>Queue</td><td><code>ArrayDeque&lt;int[]&gt;</code></td><td><code>offer</code>, <code>poll</code>, <code>isEmpty</code></td></tr>
<tr><td>Sliding window</td><td><code>HashMap</code> / <code>int[128]</code></td><td>индекс последнего появления</td></tr>
<tr><td>Таблица DP</td><td><code>int[]</code>, <code>int[][]</code></td><td><code>Arrays.fill</code></td></tr>
</table>
<p>Вместо старого класса <code>Stack</code> рекомендуется <code>ArrayDeque</code>: он быстрее и может быть и стеком, и очередью.</p>
<h3>Шаблон BFS</h3>
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
        if (nr &lt; 0 || nr &gt;= r || nc &lt; 0 || nc &gt;= c) continue;   // ВСЕГДА проверяйте границы
        if (grid[nr].charAt(nc) == '#' || dist[nr][nc] != -1) continue;
        dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
        q.offer(new int[]{nr, nc});
    }
}</code></pre>
<p>BFS даёт кратчайший путь в невзвешенной сетке, потому что открывает клетки в порядке расстояния. Сложность — O(R·C).</p>
<h3>Динамическое программирование</h3>
<p>В задаче coin change <code>dp[x]</code> — наименьшее число монет, которыми можно набрать сумму x. <code>dp[0] = 0</code>, остальные — «бесконечность», а для каждого x <code>dp[x] = min(dp[x − coin] + 1)</code>. Жадный подход (greedy: на каждом шаге брать самую крупную монету) не всегда верен: с монетами {1, 5, 10, 21} сумму 30 greedy наберёт 6 монетами: 21 + 5 + 1 + 1 + 1 + 1, а оптимум — 3 монеты: 10 + 10 + 10.</p>
<div class="tip">В binary search вычисляйте середину как <code>mid = lo + (hi - lo) / 2</code>: <code>(lo + hi) / 2</code> на больших индексах даёт int overflow.</div>`,
        ex: [
          { prompt: '<b>Баланс скобок.</b> На входе одна строка из символов <code>()[]{}</code>. Если каждая открытая скобка закрывается соответствующей в правильном порядке — <code>YES</code>, иначе <code>NO</code>. Используйте <code>ArrayDeque</code> как стек.', hints: ['Открывающую скобку — <code>push</code>, на закрывающей проверьте, что стек не пуст, сделайте <code>pop</code> и сравните пару.', 'В конце стек должен быть пуст: <code>(((</code> → NO.'] },
          { prompt: '<b>Binary search.</b> На входе n, затем n различных чисел, отсортированных по возрастанию, затем q и q запросов. Для каждого запроса напечатайте индекс числа (с 0) или <code>-1</code>. Напишите свой binary search.', hints: ['<code>lo = 0, hi = n − 1</code>, <code>while (lo &lt;= hi)</code>.', 'Если a[mid] &lt; x, то <code>lo = mid + 1</code>, иначе <code>hi = mid − 1</code>.'] },
          { prompt: '<b>Самая длинная подстрока без повторов.</b> На входе одна строка из латинских букв и цифр. Напечатайте длину самого длинного <b>непрерывного</b> фрагмента, в котором ни один символ не повторяется: <code>abcabcbb</code> → <code>3</code>. Напишите sliding window за O(n).', hints: ['<code>last[c]</code> — индекс последнего появления символа c (изначально −1).', 'Если <code>last[c] &gt;= left</code>, сдвиньте левый край окна на <code>last[c] + 1</code>; на каждом шаге сравнивайте длину <code>right − left + 1</code>.'] },
          { prompt: '<b>Coin change.</b> На входе <code>n amount</code>, затем n номиналов монет (каждой — без ограничения). Напечатайте наименьшее число монет, которыми можно набрать сумму <code>amount</code>, а если это невозможно — <code>-1</code>. Используйте DP, а не greedy.', hints: ['<code>dp[0] = 0</code>, остальные — большое число (INF). Чтобы не было overflow, <code>Integer.MAX_VALUE / 2</code>.', 'Для каждого x и каждой монеты c ≤ x: <code>dp[x] = min(dp[x], dp[x − c] + 1)</code>.'], starter: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int amount = sc.nextInt();\n        int[] coins = new int[n];\n        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();\n        // greedy: начинать с самой крупной монеты (неверно!)\n        java.util.Arrays.sort(coins);\n        int count = 0, rest = amount;\n        for (int i = n - 1; i >= 0; i--) {\n            count += rest / coins[i];\n            rest %= coins[i];\n        }\n        System.out.println(rest == 0 ? count : -1);\n    }\n}\n' },
          { prompt: '<b>Кратчайший путь в сетке.</b> На входе <code>r c</code>, затем r строк: <code>.</code> — свободно, <code>#</code> — стена. Напечатайте наименьшее число шагов (в четырёх направлениях) от левого верхнего угла до правого нижнего; если дойти невозможно или угол — стена, напечатайте <code>-1</code>. Используйте BFS.', hints: ['Заполните массив <code>dist</code> значением −1: −1 означает «ещё не посещено».', 'Прежде чем ставить соседа в очередь, проверьте границы, стену и что dist == −1. Ответ — <code>dist[r−1][c−1]</code>.'], starter: 'import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt(), c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        // манхэттенское расстояние не учитывает стены\n        System.out.println((r - 1) + (c - 1));\n    }\n}\n' }
        ]
      },
      'jv-gate': {
        title: 'Экзамен модуля: Java',
        body: P`
<p>Итоговый экзамен: три вопроса по основным правилам языка и три программы (коллекции, полиморфизм, сортировка с lambda). Проходной порог — 75%.</p>
<ul>
<li>Внимательно прочитайте формат ввода и печатайте только запрошенный текст.</li>
<li>Заранее решите, какая структура нужна: List, Map, Set, массив.</li>
<li>Проверьте граничные случаи: пустой результат, равные значения, нехватка запаса.</li>
</ul>`,
        ex: [
          { prompt: 'Что будет напечатано?<pre><code>String s = "data";\ns.toUpperCase();\nSystem.out.println(s);</code></pre>', options: ['DATA', 'data', 'Data', 'Ошибка компиляции'], explain: 'String immutable: toUpperCase() возвращает новую строку, но она нигде не сохранена. s по-прежнему "data". Правильно: <code>s = s.toUpperCase();</code>' },
          { prompt: 'В классе <code>Point</code> есть поля <code>x</code>, <code>y</code>, но <code>equals</code> и <code>hashCode</code> не переопределены. Что будет напечатано?<pre><code>Set&lt;Point&gt; s = new HashSet&lt;&gt;();\ns.add(new Point(1, 2));\ns.add(new Point(1, 2));\nSystem.out.println(s.size());</code></pre>', options: ['1', '2', '0', 'Ошибка компиляции'], explain: 'equals/hashCode по умолчанию основаны не на значении объекта, а на ссылке. Два отдельных объекта — два элемента. Чтобы сравнивать по значению, нужно переопределить оба метода.' },
          { prompt: 'Чему равно <code>f(5)</code>?<pre><code>static int f(int n) {\n    if (n &lt;= 1) return 1;\n    return f(n - 1) + 2 * f(n - 2);\n}</code></pre>', explain: 'f(0) = f(1) = 1, f(2) = 1 + 2 = 3, f(3) = 3 + 2 = 5, f(4) = 5 + 6 = 11, f(5) = 11 + 10 = 21.' },
          { prompt: '<b>Склад.</b> На входе q, затем q команд: <code>ADD товар количество</code> или <code>SELL товар количество</code>. Если при SELL запаса не хватает, ничего не меняйте и напечатайте <code>ERROR товар</code>. В конце напечатайте товары с остатком больше 0 по алфавиту в виде <code>товар количество</code>; если таких товаров нет — <code>EMPTY</code>.', hints: ['<code>have = stock.getOrDefault(item, 0)</code> — запас отсутствующего товара равен 0.', 'В конце печатайте только записи с <code>getValue() &gt; 0</code>; если не напечатано ни одной — EMPTY.'], starter: 'import java.util.Map;\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        Map<String, Integer> stock = new TreeMap<>();\n        for (int i = 0; i < q; i++) {\n            String cmd = sc.next();\n            String item = sc.next();\n            int qty = sc.nextInt();\n            // обработайте команды\n        }\n        System.out.println("EMPTY");\n    }\n}\n' },
          { prompt: '<b>Платёжная ведомость.</b> Абстрактный класс <code>Employee</code> уже готов. Напишите классы <code>Salaried</code> (месячный оклад <code>salary</code>) и <code>Hourly</code> (<code>rate</code>, <code>hours</code>; до 160 часов — rate·hours, каждый час сверх 160 — в 1.5 раза дороже: <code>rate·160 + rate·(hours−160)·3/2</code>, целочисленное деление). Ввод: n, затем n строк <code>S имя salary</code> или <code>H имя rate hours</code>. Напечатайте каждого сотрудника в порядке ввода в виде <code>имя pay</code>, в конце — <code>TOTAL x</code>.', hints: ['Оба класса пишут <code>extends Employee</code>, в constructor вызывают <code>super(name)</code> и переопределяют <code>pay()</code> с <code>@Override</code>.', 'Hourly: если <code>hours &lt;= 160</code>, то <code>rate * hours</code>, иначе <code>rate * 160 + rate * (hours − 160) * 3 / 2</code>. Не забудьте в main добавить объекты в <code>staff</code>.'] },
          { prompt: '<b>Слияние отрезков.</b> На входе n, затем n строк <code>start end</code> (start ≤ end, в любом порядке). Объедините пересекающиеся или соприкасающиеся отрезки (<code>[1,3]</code> и <code>[3,5]</code> → <code>[1,5]</code>) и напечатайте результат по возрастанию start в виде <code>start end</code>. Для сортировки используйте lambda-comparator.', hints: ['Сначала отсортируйте по start: <code>xs.sort((a, b) -&gt; Integer.compare(a[0], b[0]))</code>.', 'Если start следующего отрезка не больше end последнего объединённого, расширьте end через <code>Math.max</code>; иначе начните новый отрезок.'] }
        ]
      }
    }
  });
})();
