// java practice tasks: Russian text. Code, solutions and checks are in content/practice/java.js.
DJ.i18n.patch({ lessons: {
 "jv-1": {
  "pr": [
   {
    "title": "Маршрутный билет",
    "prompt": "<p>На входе два слова: город отправления и город назначения (например, <code>Almaty Astana</code>). Программа должна вывести одну строку:</p><pre><code>Almaty -&gt; Astana</code></pre>",
    "hints": [
     "Второе слово тоже прочитайте через <code>sc.next()</code>.",
     "Соедините строки через <code>+</code>: <code>from + \" -&gt; \" + to</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String from = sc.next();\n        // прочитайте второй город и выведите результат\n    }\n}\n"
   },
   {
    "title": "Три слова в обратном порядке",
    "prompt": "<p>На входе три слова. Выведите их в обратном порядке, через один пробел, в одну строку: <code>alma almurt orik</code> → <code>orik almurt alma</code>.</p>",
    "hints": [
     "Прочитайте три слова в три переменные.",
     "При выводе поменяйте порядок: <code>c + \" \" + b + \" \" + a</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        // прочитайте остальные два слова\n    }\n}\n"
   },
   {
    "title": "Сумма двух чисел",
    "prompt": "<p>На входе два целых числа <code>a</code> и <code>b</code>. Выведите сумму в таком виде: <code>3 + 5 = 8</code>.</p>",
    "hints": [
     "<code>a + \" + \" + b + \" = \" + a + b</code> не складывает числа, а склеивает их как строки.",
     "Возьмите сумму в скобки: <code>(a + b)</code>."
    ]
   },
   {
    "title": "Карточка ученика",
    "prompt": "<p>На входе имя ученика, город и возраст (целое число): <code>Aruzhan Karaganda 15</code>. Выведите четыре строки (год рождения = 2026 − возраст):</p><pre><code>Name: Aruzhan\nCity: Karaganda\nAge: 15\nBorn: 2011</code></pre>",
    "hints": [
     "Возраст прочитайте через <code>sc.nextInt()</code>.",
     "Разность возьмите в скобки: <code>\"Born: \" + (2026 - age)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // прочитайте city и age, выведите четыре строки\n        System.out.println(\"Name: \" + name);\n    }\n}\n"
   },
   {
    "title": "Сумма покупки",
    "prompt": "<p>На входе название товара, цена одной штуки (тенге) и количество: <code>Nan 250 4</code>. Выведите в таком виде:</p><pre><code>Nan x4 = 1000</code></pre>",
    "hints": [
     "Название прочитайте через <code>next()</code>, цену и количество — через <code>nextInt()</code>.",
     "Произведение возьмите в скобки: <code>(price * qty)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String item = sc.next();\n        // прочитайте цену и количество\n    }\n}\n"
   },
   {
    "title": "Результат игры",
    "prompt": "<p>На входе название и голы двух команд: <code>Kairat 2 Astana 1</code>. Выведите две строки: в первой — счет, во второй — общее число голов.</p><pre><code>Kairat 2:1 Astana\nGoals: 3</code></pre>",
    "hints": [
     "Порядок входа: слово, число, слово, число — читайте в этом же порядке.",
     "Во второй строке возьмите сумму в скобки."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String t1 = sc.next();\n        int g1 = sc.nextInt();\n        // прочитайте вторую команду\n    }\n}\n"
   },
   {
    "title": "Чек покупки",
    "prompt": "<p>На входе имя покупателя, затем цены трех товаров (тенге): <code>Daniyar 1200 800 3500</code>. Выведите четыре строки; доставка всегда 1500 тенге:</p><pre><code>Customer: Daniyar\nItems: 3\nTotal: 5500\nWith delivery: 7000</code></pre>",
    "hints": [
     "Сохраните сумму в отдельной переменной: <code>int total = a + b + c;</code>.",
     "В последней строке пусть <code>(total + 1500)</code> будет в скобках."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // прочитайте три цены и посчитайте сумму\n    }\n}\n"
   },
   {
    "title": "Отчет о погоде",
    "prompt": "<p>На входе название города, утренняя и вечерняя температура (целые числа, могут быть отрицательными): <code>Astana -12 -5</code>. Выведите четыре строки; <code>Change</code> = вечерняя − утренняя:</p><pre><code>City: Astana\nMorning: -12\nEvening: -5\nChange: 7</code></pre>",
    "hints": [
     "Отрицательные числа <code>nextInt()</code> тоже читает правильно.",
     "Разность возьмите в скобки: <code>(evening - morning)</code>, иначе минус прилипнет к предыдущей строке."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String city = sc.next();\n        // прочитайте две температуры\n    }\n}\n"
   }
  ]
 },
 "jv-2": {
  "pr": [
   {
    "title": "Перевод минут в часы",
    "prompt": "<p>На входе количество минут <code>n</code> (0 ≤ n ≤ 10⁶). Разделите его на часы и минуты и выведите в виде <code>2 h 15 min</code>. Пример: <code>135</code> → <code>2 h 15 min</code>.</p>",
    "hints": [
     "Целое деление <code>n / 60</code> даст полные часы.",
     "Остаток <code>n % 60</code> — оставшиеся минуты."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // часы: n / 60, минуты: n % 60\n    }\n}\n"
   },
   {
    "title": "Из Цельсия в Фаренгейт",
    "prompt": "<p>На входе целая температура <code>c</code> (в Цельсиях). Переведите в Фаренгейты: <code>F = c · 9 / 5 + 32</code>, результат выведите с 1 знаком после запятой. Пример: <code>-7</code> → <code>19.4</code>. Остерегайтесь целочисленного деления.</p>",
    "hints": [
     "<code>c * 9 / 5</code> делает целое деление: для -7 получится -12, а верно -12.6.",
     "Напишите <code>9.0</code> или приведите тип через <code>(double) c</code>."
    ]
   },
   {
    "title": "Количество автобусов",
    "prompt": "<p>На входе два целых числа: количество учеников <code>n</code> и количество мест в одном автобусе <code>k</code> (1 ≤ k). Какое наименьшее число автобусов нужно, чтобы всех перевезти? Пример: <code>95 40</code> → <code>3</code>. Подсказка: <code>(n + k - 1) / k</code> — округление вверх.</p>",
    "hints": [
     "<code>n / k</code> округляет вниз: 95 / 40 = 2, но 15 учеников останутся.",
     "<code>(n + k - 1) / k</code> с целым делением округляет вверх."
    ]
   },
   {
    "title": "Цена с НДС",
    "prompt": "<p>На входе цена товара без НДС (целое число тенге). НДС 12% (<code>final double VAT = 0.12;</code>). Выведите две строки, в каждой с 2 знаками после запятой:</p><pre><code>VAT: 1200.00\nTotal: 11200.00</code></pre><p>(для входа <code>10000</code>).</p>",
    "hints": [
     "НДС = <code>price * VAT</code>, это double.",
     "<code>String.format(\"%.2f\", x)</code> выводит 2 знака после запятой."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        final double VAT = 0.12;\n        int price = sc.nextInt();\n        // выведите НДС и общую сумму\n    }\n}\n"
   },
   {
    "title": "Большие числа",
    "prompt": "<p>На входе два целых числа <code>a</code> и <code>b</code> (каждое от 0 до 2 000 000 000). В первую строку выведите их сумму, во вторую — произведение. Такие значения не помещаются в <code>int</code>, используйте <code>long</code>. Пример: <code>2000000000 3</code> →</p><pre><code>2000000003\n6000000000</code></pre>",
    "hints": [
     "Предел <code>int</code> — 2 147 483 647, при переполнении число станет отрицательным.",
     "Объявите переменные как <code>long a = sc.nextInt();</code> — вычисления пойдут в long."
    ]
   },
   {
    "title": "Секунды в время",
    "prompt": "<p>На входе количество секунд <code>s</code> (0 ≤ s &lt; 86400). Выведите время в виде <code>HH:MM:SS</code>, каждая часть из двух цифр. Пример: <code>3725</code> → <code>01:02:05</code>. Подсказка: <code>String.format(\"%02d\", x)</code> добавляет 0 спереди.</p>",
    "hints": [
     "Часы: <code>s / 3600</code>, минуты: <code>s % 3600 / 60</code>, секунды: <code>s % 60</code>.",
     "Три значения в одной строке формата: <code>String.format(\"%02d:%02d:%02d\", h, m, sec)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        // посчитайте часы, минуты и секунды\n    }\n}\n"
   },
   {
    "title": "Ежемесячный платеж по кредиту",
    "prompt": "<p>На входе три целых числа: сумма кредита <code>P</code> (тенге), годовой процент <code>r</code> и количество месяцев <code>n</code>. Общий долг по простому проценту: <code>P + P · r / 100 · n / 12</code>. Выведите ежемесячный платеж (общий долг / n) и общий долг с 2 знаками после запятой. Пример: <code>1200000 10 12</code> →</p><pre><code>Monthly: 110000.00\nTotal: 1320000.00</code></pre><p>Целое деление не должно испортить результат: считайте в double.</p>",
    "hints": [
     "<code>(double) p * r / 100 * n / 12</code> — если первый операнд double, остальное тоже считается в double.",
     "Ежемесячный платеж: <code>total / n</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int p = sc.nextInt();\n        int r = sc.nextInt();\n        int n = sc.nextInt();\n        // считайте через double\n    }\n}\n"
   },
   {
    "title": "Выдача купюрами",
    "prompt": "<p>На входе сумма (целое число тенге, 0 ≤ сумма ≤ 10⁹). Банкомат выдает ее наименьшим количеством купюр: 10000, 5000, 1000, 500, 200. Выведите количество купюр каждого номинала, затем остаток, который не удалось выдать. Пример: <code>27850</code> →</p><pre><code>10000: 2\n5000: 1\n1000: 2\n500: 1\n200: 1\nRest: 150</code></pre>",
    "hints": [
     "После каждого номинала обновляйте сумму остатком: <code>s = s % 10000;</code>.",
     "Деление <code>/</code> — количество купюр, остаток <code>%</code> — сумма, которая достанется следующему номиналу."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        System.out.println(\"10000: \" + s / 10000);\n        // остальные номиналы\n    }\n}\n"
   }
  ]
 },
 "jv-3": {
  "pr": [
   {
    "title": "Название города с заглавной буквы",
    "prompt": "<p>На входе одно слово (латинские буквы, любой регистр). Выведите его так: первая буква заглавная, остальные строчные: <code>aLMATY</code> → <code>Almaty</code>.</p>",
    "hints": [
     "<code>w.substring(0, 1)</code> — первая буква, <code>w.substring(1)</code> — остальное.",
     "К первой применить <code>toUpperCase()</code>, к остальной части — <code>toLowerCase()</code>."
    ]
   },
   {
    "title": "Части email",
    "prompt": "<p>На входе один email (внутри ровно один знак <code>@</code>). Выведите две строки: имя пользователя до <code>@</code> и домен после <code>@</code>. Пример: <code>aruzhan@mail.kz</code> →</p><pre><code>User: aruzhan\nDomain: mail.kz</code></pre>",
    "hints": [
     "<code>email.indexOf(\"@\")</code> даст индекс знака.",
     "<code>substring(0, at)</code> и <code>substring(at + 1)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String email = sc.next();\n        // найдите позицию знака @\n    }\n}\n"
   },
   {
    "title": "Сравнение слов",
    "prompt": "<p>На входе два слова. Если они полностью совпадают, выведите <code>SAME</code>; если отличаются только регистром, <code>SAME_IGNORE_CASE</code>; иначе <code>DIFFERENT</code>. Пример: <code>Kaspi kaspi</code> → <code>SAME_IGNORE_CASE</code>. Используйте <code>equals</code>, а не <code>==</code>.</p>",
    "hints": [
     "Сначала проверьте <code>a.equals(b)</code>, затем <code>a.equalsIgnoreCase(b)</code>.",
     "Строки, прочитанные из Scanner, оператор <code>==</code> сравнивает неправильно."
    ]
   },
   {
    "title": "Количество гласных",
    "prompt": "<p>На входе одно слово (латинские буквы). Выведите количество гласных букв в нем (<code>a e i o u</code>, заглавные и строчные считаются одинаково). Пример: <code>Aqtobe</code> → <code>3</code>.</p>",
    "hints": [
     "Сначала переведите слово в строчные через <code>toLowerCase()</code>.",
     "Если <code>\"aeiou\".indexOf(c) &gt;= 0</code>, то <code>c</code> — гласная."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String w = sc.next();\n        int count = 0;\n        // проверьте каждый символ\n        System.out.println(count);\n    }\n}\n"
   },
   {
    "title": "Разбор списка",
    "prompt": "<p>На входе список городов, разделенных запятыми, одним словом: <code>Almaty,Astana,Shymkent</code>. Разбейте через <code>split(\",\")</code> и выведите каждый город в отдельной строке с номером:</p><pre><code>1. Almaty\n2. Astana\n3. Shymkent</code></pre>",
    "hints": [
     "<code>String[] parts = line.split(\",\");</code> — даст массив.",
     "Нумерация с 1: <code>(i + 1) + \". \" + parts[i]</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.next();\n        // разбейте через split\n    }\n}\n"
   },
   {
    "title": "Скрытие номера карты",
    "prompt": "<p>На входе номер карты (только цифры, длина не меньше 4). Замените все цифры, кроме последних 4, знаком <code>*</code> и выведите результат. Собирайте результат в <code>StringBuilder</code>. Пример: <code>4400123456781234</code> → <code>************1234</code>.</p>",
    "hints": [
     "Количество звездочек: <code>card.length() - 4</code>.",
     "Последние 4 цифры: <code>card.substring(card.length() - 4)</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String card = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // звездочки и последние 4 цифры\n        System.out.println(sb.toString());\n    }\n}\n"
   },
   {
    "title": "Распаковка строки",
    "prompt": "<p>На входе сжатая строка: после каждой буквы идет число повторений (от 1 до 9, одна цифра). Верните строку в полном виде: <code>a3b1c2</code> → <code>aaabcc</code>. Собирайте результат в <code>StringBuilder</code>.</p>",
    "hints": [
     "Увеличивайте индекс на 2: <code>i</code> — буква, <code>i + 1</code> — цифра.",
     "Превратите символ цифры в число: <code>s.charAt(i + 1) - '0'</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // читайте парами: буква, цифра\n        System.out.println(sb.toString());\n    }\n}\n"
   },
   {
    "title": "Из snake_case в camelCase",
    "prompt": "<p>На входе имя переменной в виде <code>snake_case</code> (строчные латинские буквы и <code>_</code>, без <code>_</code> в начале и в конце, без двух <code>_</code> подряд). Переведите его в <code>camelCase</code>: первое слово не меняется, у каждого следующего первая буква становится заглавной. Пример: <code>total_sales_amount</code> → <code>totalSalesAmount</code>.</p>",
    "hints": [
     "<code>s.split(\"_\")</code> даст слова.",
     "Начиная со второго слова: <code>p.substring(0, 1).toUpperCase() + p.substring(1)</code>."
    ]
   }
  ]
 },
 "jv-4": {
  "pr": [
   {
    "title": "Четное или нечетное",
    "prompt": "<p>На входе целое число (может быть отрицательным). Если оно четное, выведите <code>EVEN</code>, если нечетное, <code>ODD</code>. Пример: <code>-7</code> → <code>ODD</code>. Помните: в Java <code>-7 % 2</code> равно <code>-1</code>.</p>",
    "hints": [
     "<code>n % 2 == 1</code> не работает для отрицательных нечетных чисел.",
     "Проверьте <code>n % 2 == 0</code>: тернарный оператор <code>n % 2 == 0 ? \"EVEN\" : \"ODD\"</code>."
    ]
   },
   {
    "title": "Название дня недели",
    "prompt": "<p>На входе число от 1 до 7 (1 — понедельник). С помощью <code>switch</code> выведите его английское название: <code>Monday</code>, <code>Tuesday</code>, <code>Wednesday</code>, <code>Thursday</code>, <code>Friday</code>, <code>Saturday</code>, <code>Sunday</code>. Если число другое, выведите <code>Invalid</code>. Пример: <code>5</code> → <code>Friday</code>.</p>",
    "hints": [
     "Switch-стрелка возвращает значение: <code>String name = switch (d) { case 1 -&gt; \"Monday\"; ... };</code>",
     "<code>default -&gt; \"Invalid\"</code> ловит остальные числа."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int d = sc.nextInt();\n        // напишите switch\n    }\n}\n"
   },
   {
    "title": "Стоимость проезда в автобусе",
    "prompt": "<p>На входе возраст пассажира. Выведите стоимость проезда (тенге): до 7 лет — <code>0</code>, от 7 до 17 — <code>40</code>, от 18 до 62 — <code>120</code>, 63 и старше — <code>0</code>. Пример: <code>16</code> → <code>40</code>.</p>",
    "hints": [
     "Два бесплатных случая объедините через <code>||</code>.",
     "Остальное разделите через <code>else if (age &lt;= 17)</code> и <code>else</code>."
    ]
   },
   {
    "title": "Вид треугольника",
    "prompt": "<p>На входе три положительных целых числа — стороны. Если треугольник не строится (сумма любых двух сторон должна быть больше третьей), выведите <code>NOT A TRIANGLE</code>; если все три равны, <code>EQUILATERAL</code>; если две равны, <code>ISOSCELES</code>; иначе <code>SCALENE</code>. Пример: <code>5 5 8</code> → <code>ISOSCELES</code>.</p>",
    "hints": [
     "Сначала проверьте, существует ли треугольник: <code>a + b &lt;= c || ...</code> — три условия.",
     "Затем проверьте «все три равны», и только потом «два равны»."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        // проверьте условия по порядку\n    }\n}\n"
   },
   {
    "title": "Простой калькулятор",
    "prompt": "<p>На входе <code>a op b</code>: два целых числа и между ними знак операции (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>). С помощью <code>switch</code> выведите результат; <code>/</code> — целое деление. При делении на ноль выведите <code>ERROR</code>, если знак неизвестен, — <code>UNKNOWN</code>. Пример: <code>17 / 5</code> → <code>3</code>.</p>",
    "hints": [
     "Switch работает со строкой: <code>case \"+\" -&gt; ...</code>.",
     "При делении сначала проверьте <code>b == 0</code>; если в одном case несколько строк, используйте <code>{ }</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        String op = sc.next();\n        int b = sc.nextInt();\n        // напишите switch (op)\n    }\n}\n"
   },
   {
    "title": "Совет по погоде",
    "prompt": "<p>На входе температура (целое число) и слово о погоде: <code>rain</code>, <code>snow</code> или <code>clear</code>. Правила по порядку: если температура ниже −20, выведите <code>Stay home</code>; иначе, если идет дождь, <code>Umbrella</code>; иначе, если идет снег или температура ниже 5, <code>Coat</code>; в остальных случаях <code>T-shirt</code>. Пример: <code>3 clear</code> → <code>Coat</code>.</p>",
    "hints": [
     "Сравнивайте слова через <code>equals</code>.",
     "Третье условие: <code>w.equals(\"snow\") || t &lt; 5</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n        String w = sc.next();\n        // напишите условия по порядку\n    }\n}\n"
   },
   {
    "title": "Количество дней в месяце",
    "prompt": "<p>На входе номер месяца (1–12) и год. Выведите, сколько дней в этом месяце. В феврале 29 дней в високосный год, иначе 28 (високосный: делится на 4 и не делится на 100, или делится на 400). В месяцах 4, 6, 9, 11 — 30 дней, в остальных — 31. Если номер месяца неверен, выведите <code>Invalid</code>. Пример: <code>2 2024</code> → <code>29</code>.</p>",
    "hints": [
     "Сохраните проверку високосного года в boolean: <code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>.",
     "В switch-стрелках несколько значений в одном case: <code>case 4, 6, 9, 11 -&gt;</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int m = sc.nextInt();\n        int y = sc.nextInt();\n        // напишите switch (m)\n    }\n}\n"
   },
   {
    "title": "Прогрессивный налог",
    "prompt": "<p>На входе месячный доход (целое число тенге, 0 ≤ доход ≤ 10⁹). Налог прогрессивный: часть до 100 000 — 0%, часть от 100 000 до 500 000 — 10%, часть свыше 500 000 — 20%. Выведите налог целым числом тенге (целое деление в каждой части). Пример: <code>700000</code> → <code>80000</code> (40 000 + 40 000).</p>",
    "hints": [
     "Три диапазона — три ветки: <code>if / else if / else</code>.",
     "Свыше 500 000 полный налог второй части равен 40 000, к нему добавляется <code>(income - 500000) * 20 / 100</code>."
    ]
   }
  ]
 },
 "jv-5": {
  "pr": [
   {
    "title": "Таблица умножения",
    "prompt": "<p>На входе число <code>n</code>. Циклом <code>for</code> выведите его таблицу умножения от 1 до 10, каждая строка — <code>n x i = результат</code>. Пример (для <code>7</code>): первая строка <code>7 x 1 = 7</code>, последняя <code>7 x 10 = 70</code>.</p>",
    "hints": [
     "<code>for (int i = 1; i &lt;= 10; i++)</code>.",
     "Произведение в строку добавьте как <code>n * i</code> — умножение выполняется раньше сложения."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // цикл for\n    }\n}\n"
   },
   {
    "title": "Сумма четных чисел",
    "prompt": "<p>На входе <code>n</code> (1 ≤ n ≤ 10⁵). Выведите сумму всех четных чисел от 1 до n. Пример: <code>10</code> → <code>30</code> (2 + 4 + 6 + 8 + 10).</p>",
    "hints": [
     "Начните с 2 и прибавляйте 2: <code>i += 2</code>.",
     "Если n = 10⁵, сумма равна 2.5·10⁹ — это не помещается в int, возьмите <code>long</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long sum = 0;\n        // цикл\n        System.out.println(sum);\n    }\n}\n"
   },
   {
    "title": "Количество цифр",
    "prompt": "<p>На входе неотрицательное целое число <code>n</code> (≤ 10⁹). Выведите, сколько в нем цифр. Пример: <code>2024</code> → <code>4</code>, <code>0</code> → <code>1</code>. Подсказка: <code>do-while</code>.</p>",
    "hints": [
     "На каждом шаге <code>n /= 10</code> отбрасывает последнюю цифру.",
     "<code>do { ... } while (n &gt; 0);</code> выполнится хотя бы раз, поэтому для 0 получится 1."
    ]
   },
   {
    "title": "Перевернуть число",
    "prompt": "<p>На входе неотрицательное целое число <code>n</code> (≤ 10⁹). Выведите число, у которого цифры записаны в обратном порядке (ведущие нули пропадают). Пример: <code>1200</code> → <code>21</code>, <code>4512</code> → <code>2154</code>.</p>",
    "hints": [
     "Последняя цифра — <code>n % 10</code>; добавьте ее к результату: <code>rev = rev * 10 + n % 10</code>.",
     "Число вроде 1 000 000 009 при переворачивании выйдет за пределы int — используйте <code>long</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long rev = 0;\n        // цикл while\n        System.out.println(rev);\n    }\n}\n"
   },
   {
    "title": "Наименьший делитель",
    "prompt": "<p>На входе <code>n</code> (2 ≤ n ≤ 10⁹). Выведите наименьший делитель n, который больше 1. Как только нашли делитель, остановите цикл через <code>break</code>; если <code>i * i &gt; n</code>, ответ — само n. Пример: <code>91</code> → <code>7</code>, <code>13</code> → <code>13</code>.</p>",
    "hints": [
     "Проверяйте делители от 2, пока <code>i * i &lt;= n</code>, — так быстрее даже для простых чисел.",
     "Если ничего не нашли, ответ — само n."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int ans = n;\n        // цикл и break\n        System.out.println(ans);\n    }\n}\n"
   },
   {
    "title": "Последовательность Фибоначчи",
    "prompt": "<p>На входе <code>n</code> (1 ≤ n ≤ 90). Выведите первые <code>n</code> членов последовательности Фибоначчи в одной строке через пробел; последовательность начинается с <code>0 1</code>. Пример: <code>7</code> → <code>0 1 1 2 3 5 8</code>. Числа большие, используйте <code>long</code>.</p>",
    "hints": [
     "Держите две переменные: <code>a</code> — текущий член, <code>b</code> — следующий.",
     "На каждом шаге: <code>next = a + b; a = b; b = next;</code>. Пробел ставьте только между членами."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long a = 0, b = 1;\n        // цикл\n    }\n}\n"
   },
   {
    "title": "Совершенные числа",
    "prompt": "<p>Совершенное число — число, равное сумме своих делителей, кроме самого себя (6 = 1 + 2 + 3). На входе <code>n</code> (1 ≤ n ≤ 10000). Выведите все совершенные числа от 1 до n через пробел в одной строке; если их нет, выведите <code>NONE</code>. Пример: <code>500</code> → <code>6 28 496</code>.</p>",
    "hints": [
     "Внешний цикл идет по x, внутренний — по делителям x.",
     "Для скорости идите до <code>d * d &lt;= x</code> и добавляйте и <code>d</code>, и <code>x / d</code> (если они совпадают, только один). Единица не является совершенным числом."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // для каждого x посчитайте сумму делителей\n    }\n}\n"
   },
   {
    "title": "Самый длинный рост температуры",
    "prompt": "<p>На входе <code>n</code> (1 ≤ n ≤ 1000), затем температуры <code>n</code> дней. Выведите длину самой длинной серии подряд идущих дней, в которой температура каждый день <b>строго</b> выше, чем в предыдущий день (один день — серия длиной 1). Без массива, читайте прямо в цикле. Пример: <code>8</code> / <code>-3 -1 2 2 4 6 7 1</code> → <code>4</code> (2 4 6 7).</p>",
    "hints": [
     "Храните предыдущую температуру в переменной <code>prev</code>.",
     "Если выросла, увеличьте текущую длину <code>cur++</code>, иначе <code>cur = 1</code>; на каждом шаге обновляйте максимум."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int best = 0;\n        // сохраняйте предыдущее значение и сравнивайте в цикле\n        System.out.println(best);\n    }\n}\n"
   }
  ]
 },
 "jv-6": {
  "pr": [
   {
    "title": "Площадь: перегрузка",
    "prompt": "<p>Напишите два метода с одним именем: <code>static int area(int side)</code> (квадрат) и <code>static int area(int w, int h)</code> (прямоугольник). На входе <code>S a</code> или <code>R w h</code>. Вызовите нужный метод и выведите площадь. Пример: <code>R 3 5</code> → <code>15</code>, <code>S 4</code> → <code>16</code>.</p>",
    "hints": [
     "Компилятор выбирает, какой <code>area</code> вызвать, по количеству аргументов.",
     "Определите вид фигуры через <code>kind.equals(\"S\")</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int area(int side) {\n        return 0;\n    }\n\n    static int area(int w, int h) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String kind = sc.next();\n        // если S, то area(a), если R, то area(w, h)\n    }\n}\n"
   },
   {
    "title": "Наибольшее из трех",
    "prompt": "<p>Напишите метод <code>static int max3(int a, int b, int c)</code>, который возвращает наибольшее из трех чисел. На входе три целых числа (могут быть отрицательными); выведите результат <code>max3</code>. Пример: <code>-5 12 7</code> → <code>12</code>.</p>",
    "hints": [
     "Начальное значение <code>m = a</code>, затем сравните с <code>b</code> и <code>c</code>.",
     "Или используйте <code>Math.max(a, Math.max(b, c))</code>."
    ]
   },
   {
    "title": "Метод суммы цифр",
    "prompt": "<p>Напишите метод <code>static int digitSum(int n)</code> (n ≥ 0). На входе <code>k</code>, затем <code>k</code> чисел. Выведите сумму цифр каждого числа в отдельной строке. Пример: <code>2</code> / <code>123 9050</code> →</p><pre><code>6\n14</code></pre>",
    "hints": [
     "Внутри метода цикл из <code>n % 10</code> и <code>n /= 10</code>.",
     "Параметр передается как копия, поэтому менять его внутри метода безопасно."
    ]
   },
   {
    "title": "Количество високосных лет",
    "prompt": "<p>Напишите метод <code>static boolean isLeap(int y)</code>. На входе два года <code>a b</code> (a ≤ b). Выведите, сколько високосных лет есть на этом промежутке (оба конца включаются). Пример: <code>1896 1912</code> → <code>4</code> (1896, 1904, 1908, 1912; 1900 не високосный).</p>",
    "hints": [
     "Метод типа boolean может сам вернуть условие: <code>return (y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0;</code>",
     "В <code>main</code> — цикл от <code>a</code> до <code>b</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isLeap(int y) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        // вызовите isLeap в цикле\n        System.out.println(count);\n    }\n}\n"
   },
   {
    "title": "Возведение в степень",
    "prompt": "<p>Напишите метод <code>static long power(long base, int exp)</code> с помощью цикла (exp ≥ 0, <code>power(x, 0) = 1</code>). На входе <code>base exp</code>; результат помещается в long. Пример: <code>2 10</code> → <code>1024</code>, <code>-3 3</code> → <code>-27</code>.</p>",
    "hints": [
     "Начните результат с 1 и умножьте его на <code>base</code> ровно <code>exp</code> раз.",
     "Если <code>exp = 0</code>, цикл ни разу не выполнится, и вернется 1."
    ]
   },
   {
    "title": "Числа-палиндромы",
    "prompt": "<p>Напишите метод <code>static int reverse(int n)</code>, который возвращает число с цифрами в обратном порядке. С его помощью выведите количество палиндромных чисел на промежутке от <code>a</code> до <code>b</code> (1 ≤ a ≤ b ≤ 10⁶). Палиндром: <code>reverse(n) == n</code>, например 121. Пример: <code>100 200</code> → <code>10</code>.</p>",
    "hints": [
     "<code>reverse</code>: <code>r = r * 10 + n % 10; n /= 10;</code>.",
     "Однозначные числа тоже палиндромы: от 1 до 9 — это 9 чисел."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int reverse(int n) {\n        return n;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        // цикл\n        System.out.println(count);\n    }\n}\n"
   },
   {
    "title": "Близнецы-простые числа",
    "prompt": "<p>Простые близнецы — пара простых чисел, разность которых равна 2: (3, 5), (5, 7), (11, 13). Напишите метод <code>static boolean isPrime(int n)</code> и для входного <code>n</code> (1 ≤ n ≤ 10⁵) выведите каждую пару близнецов, оба числа которой не превышают n, в виде <code>p q</code> по одной в строке, а в последней строке <code>Total: k</code>. Пример: <code>15</code> →</p><pre><code>3 5\n5 7\n11 13\nTotal: 3</code></pre>",
    "hints": [
     "<code>isPrime</code>: при n &lt; 2 число не простое; делители проверяйте до <code>i * i &lt;= n</code>.",
     "Пар может быть много: соберите вывод в <code>StringBuilder</code> и выведите один раз."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isPrime(int n) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // p и p + 2 оба простые?\n    }\n}\n"
   },
   {
    "title": "Чтение числа словами",
    "prompt": "<p>Метод <code>static String digitName(int d)</code> с помощью <code>switch</code> возвращает английское название цифры (<code>zero</code>, <code>one</code>, …, <code>nine</code>). На входе неотрицательное целое число (≤ 10⁹). Выведите название каждой его цифры слева направо, через пробел. Пример: <code>1203</code> → <code>one two zero three</code>.</p>",
    "hints": [
     "Превратите число в строку (<code>\"\" + n</code>), и читайте цифры слева направо через <code>charAt(i)</code>.",
     "Символ в цифру: <code>s.charAt(i) - '0'</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static String digitName(int d) {\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // вызовите digitName для каждой цифры\n    }\n}\n"
   }
  ]
 },
 "jv-7": {
  "pr": [
   {
    "title": "Выше среднего",
    "prompt": "<p>На входе <code>n</code> (n ≥ 1), затем <code>n</code> целых чисел. Выведите количество элементов, которые <b>строго</b> больше среднего значения. Пример: <code>5</code> / <code>10 20 30 40 50</code> → <code>2</code> (среднее 30).</p>",
    "hints": [
     "Нужно два прохода: сначала сумма и среднее, потом сравнение.",
     "Считайте среднее в double: <code>(double) sum / n</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // посчитайте среднее и сравните\n    }\n}\n"
   },
   {
    "title": "Вывод в обратном порядке",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> целых чисел. Прочитайте их в массив и выведите в обратном порядке в одну строку через пробел. Пример: <code>4</code> / <code>3 9 -1 5</code> → <code>5 -1 9 3</code>.</p>",
    "hints": [
     "Цикл начинается с конца: <code>for (int i = n - 1; i &gt;= 0; i--)</code>.",
     "После последнего элемента пробел не ставьте."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // выведите в обратном порядке\n    }\n}\n"
   },
   {
    "title": "Отсортированные цены",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> цен (тенге). Отсортируйте их по возрастанию с помощью <code>Arrays.sort</code> и выведите в формате <code>Arrays.toString</code>. Пример: <code>3</code> / <code>1200 800 4500</code> → <code>[800, 1200, 4500]</code>.</p>",
    "hints": [
     "<code>Arrays.sort(a);</code> сортирует массив на месте.",
     "<code>Arrays.toString(a)</code> сам ставит скобки и запятые."
    ]
   },
   {
    "title": "Суммы по строкам и столбцам",
    "prompt": "<p>На входе <code>r c</code>, затем матрица <code>r × c</code> (например, недельные продажи магазинов). В первую строку выведите сумму каждой строки матрицы, во вторую — сумму каждого столбца, через пробел. Пример:</p><pre><code>2 3\n1 2 3\n4 5 6</code></pre><p>→</p><pre><code>6 15\n5 7 9</code></pre>",
    "hints": [
     "Сумма строки: внешний цикл по <code>i</code>, внутренний по <code>j</code>.",
     "Для сумм столбцов поменяйте циклы местами: внешний по <code>j</code>, внутренний по <code>i</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        // прочитайте матрицу и посчитайте суммы\n    }\n}\n"
   },
   {
    "title": "Второе по величине значение",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> целых чисел. Выведите второе по величине <b>различное</b> значение, то есть следующее за наибольшим; если такого нет (все числа равны), выведите <code>NONE</code>. Пример: <code>5</code> / <code>4 9 9 2 7</code> → <code>7</code>.</p>",
    "hints": [
     "Сначала найдите максимум, затем наибольший элемент, не равный максимуму.",
     "Все числа могут быть отрицательными: не берите начальное значение 0, держите флаг «нашли ли»."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // сначала найдите максимум\n    }\n}\n"
   },
   {
    "title": "Сдвиг массива",
    "prompt": "<p>На входе <code>n k</code> (k ≥ 0, может быть больше n), затем <code>n</code> чисел. Циклически сдвиньте массив вправо на <code>k</code> позиций и выведите в одну строку через пробел. Пример: <code>5 2</code> / <code>1 2 3 4 5</code> → <code>4 5 1 2 3</code>.</p>",
    "hints": [
     "В новом массиве элемент <code>a[i]</code> попадает на позицию <code>(i + k) % n</code>.",
     "Операция <code>%</code> работает правильно и при k &gt; n."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // создайте новый массив\n    }\n}\n"
   },
   {
    "title": "Самый теплый период",
    "prompt": "<p>На входе <code>n k</code> (1 ≤ k ≤ n ≤ 10⁵), затем температуры <code>n</code> дней. Найдите период из <code>k</code> подряд идущих дней, у которого сумма температур максимальна. Выведите день начала периода (нумерация с 1) и сумму; если таких несколько, возьмите самый ранний. Пример: <code>7 3</code> / <code>1 5 -2 8 6 -1 3</code> →  <code>4 13</code> (8 + 6 − 1). Напишите решение за O(n) — скользящее окно.</p>",
    "hints": [
     "Сначала посчитайте сумму первых <code>k</code> элементов, затем при сдвиге окна добавляйте <code>a[i]</code> и вычитайте <code>a[i - k]</code>.",
     "Так как нужен самый ранний, обновляйте ответ только при <code>cur &gt; best</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // начните с суммы первых k дней\n    }\n}\n"
   },
   {
    "title": "Обход матрицы по спирали",
    "prompt": "<p>На входе <code>r c</code>, затем матрица <code>r × c</code>. Обойдите ее элементы по спирали по часовой стрелке, начиная с верхнего левого угла, и выведите в одну строку через пробел. Пример:</p><pre><code>3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12</code></pre><p>→ <code>1 2 3 4 8 12 11 10 9 5 6 7</code>. Внимательно проверяйте границы.</p>",
    "hints": [
     "Держите четыре границы: <code>top, bottom, left, right</code>. После прохода по стороне сдвигайте соответствующую границу.",
     "Перед обходом нижней строки и левого столбца проверяйте <code>top &lt;= bottom</code> и <code>left &lt;= right</code>, иначе в матрице из одной строки элементы повторятся."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        // прочитайте матрицу и обойдите ее по спирали\n    }\n}\n"
   }
  ]
 },
 "jv-8": {
  "pr": [
   {
    "title": "Класс прямоугольника",
    "prompt": "<p>Напишите класс <code>Rectangle</code>: поля <code>private int w, h</code>, конструктор, методы <code>area()</code> и <code>perimeter()</code>. На входе <code>w h</code>. Выведите в таком виде (для <code>3 5</code>):</p><pre><code>Area: 15\nPerimeter: 16</code></pre>",
    "hints": [
     "В конструкторе <code>this.w = w;</code> — когда поле и параметр называются одинаково, нужен <code>this</code>.",
     "Периметр: <code>2 * (w + h)</code>."
    ],
    "starter": "import java.util.Scanner;\n\nclass Rectangle {\n    private int w, h;\n\n    Rectangle(int w, int h) {\n        // заполните поля\n    }\n\n    int area() { return 0; }\n\n    int perimeter() { return 0; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Rectangle r = new Rectangle(sc.nextInt(), sc.nextInt());\n        System.out.println(\"Area: \" + r.area());\n        System.out.println(\"Perimeter: \" + r.perimeter());\n    }\n}\n"
   },
   {
    "title": "Номера билетов",
    "prompt": "<p>В классе <code>Ticket</code> пусть будет поле <code>static int counter</code>: каждый новый билет в конструкторе получает следующий номер (1, 2, 3, …). Метод <code>toString()</code> возвращает <code>Ticket #1: Aruzhan</code>. На входе <code>n</code>, затем <code>n</code> имен пассажиров. Выведите каждый билет, в конце <code>Sold: n</code>. Пример: <code>2</code> / <code>Aruzhan Timur</code> →</p><pre><code>Ticket #1: Aruzhan\nTicket #2: Timur\nSold: 2</code></pre>",
    "hints": [
     "Статическое поле общее для всех объектов: в конструкторе <code>counter++</code>, потом <code>id = counter</code>.",
     "<code>System.out.println(t)</code> автоматически вызывает <code>t.toString()</code>."
    ]
   },
   {
    "title": "Средний балл студента",
    "prompt": "<p>Напишите класс <code>Student</code>: имя и три балла (private), метод <code>double average()</code>, метод <code>toString()</code>, который возвращает <code>Aruzhan: 86.7</code> (с 1 знаком после запятой). На входе <code>n</code>, затем <code>n</code> строк <code>имя b1 b2 b3</code>. Выведите каждого студента в отдельной строке. Пример: <code>Aruzhan 90 85 85</code> → <code>Aruzhan: 86.7</code>.</p>",
    "hints": [
     "Среднее: <code>(a + b + c) / 3.0</code> — 3.0, а не 3, иначе будет целое деление.",
     "<code>String.format(\"%.1f\", average())</code>."
    ]
   },
   {
    "title": "Лифт",
    "prompt": "<p>В классе <code>Elevator</code> есть поля <code>private int floor</code> (в начале 1) и <code>private int maxFloor</code>. Метод <code>boolean move(int delta)</code> сдвигает лифт, только если новый этаж между 1 и <code>maxFloor</code>, и возвращает <code>true</code>; иначе ничего не меняет и возвращает <code>false</code>. На входе <code>maxFloor q</code>, затем <code>q</code> целых чисел (сдвиги). В конце выведите две строки: <code>Floor f</code> и <code>Ignored k</code> (количество невыполненных сдвигов). Пример: <code>9 4</code> / <code>5 -10 3 1</code> → <code>Floor 9</code>, <code>Ignored 2</code>.</p>",
    "hints": [
     "Сначала вычислите новый этаж в отдельной переменной: <code>int next = floor + delta;</code>.",
     "Если выходит за границы, <code>return false;</code> — поле не меняется."
    ]
   },
   {
    "title": "Класс простой дроби",
    "prompt": "<p>Напишите класс <code>Fraction</code>: <code>private int num, den</code>; конструктор сокращает дробь на НОД; метод <code>Fraction add(Fraction o)</code> возвращает новую дробь; <code>toString()</code> выводит вид <code>5/6</code>. На входе четыре положительных целых числа <code>a b c d</code> (это a/b и c/d, знаменатели ≤ 10⁴). Выведите сумму. Пример: <code>1 2 1 3</code> → <code>5/6</code>, <code>1 4 3 4</code> → <code>1/1</code>.</p>",
    "hints": [
     "a/b + c/d = (a·d + c·b) / (b·d). Объект класса может видеть private поля (<code>o.den</code>) другого объекта того же класса.",
     "Для сокращения вызовите в конструкторе метод НОД (алгоритм Евклида)."
    ]
   },
   {
    "title": "Класс времени",
    "prompt": "<p>В классе <code>Clock</code> есть <code>private int minutes</code> (минуты с начала суток, 0–1439). Конструктор <code>Clock(int h, int m)</code>; метод <code>void add(int mins)</code> сдвигает время вперед (если прошли сутки, отсчет снова с 00:00); <code>toString()</code> выводит в виде <code>HH:MM</code>. На входе <code>h m k</code> (0 ≤ k ≤ 10⁶). Выведите время через <code>k</code> минут. Пример: <code>23 30 45</code> → <code>00:15</code>.</p>",
    "hints": [
     "В сутках 1440 минут: <code>minutes = (minutes + mins) % 1440;</code>.",
     "Формат из двух цифр: <code>String.format(\"%02d:%02d\", ...)</code>."
    ]
   },
   {
    "title": "Библиотека",
    "prompt": "<p>В классе <code>Book</code> есть <code>private String title</code> и <code>private boolean taken</code>; методы <code>boolean take()</code> и <code>boolean giveBack()</code> меняют состояние только при правильных условиях и возвращают результат. На входе <code>n</code>, затем <code>n</code> названий книг (одно слово), затем <code>q</code> и <code>q</code> команд: <code>TAKE название</code> или <code>RETURN название</code>. Храните книги в массиве. На каждую команду выведите: <code>OK</code>; если книга занята, <code>BUSY</code>; если вернули не взятую книгу, <code>NOT TAKEN</code>; если название не найдено, <code>NOT FOUND</code>. Пример:</p><pre><code>2\nAbai Kochevniki\n4\nTAKE Abai\nTAKE Abai\nRETURN Kochevniki\nTAKE Dune</code></pre><p>→ <code>OK</code>, <code>BUSY</code>, <code>NOT TAKEN</code>, <code>NOT FOUND</code> (каждый на своей строке).</p>",
    "hints": [
     "Поиск по названию: пройдите массив и сравните <code>x.getTitle().equals(title)</code>; если не найдено, останется <code>null</code>.",
     "<code>take()</code>: если уже взята, вернуть <code>false</code>; иначе <code>taken = true</code> и вернуть <code>true</code>."
    ],
    "starter": "import java.util.Scanner;\n\nclass Book {\n    private String title;\n    private boolean taken;\n\n    Book(String title) {\n        this.title = title;\n    }\n\n    String getTitle() { return title; }\n\n    boolean take() {\n        return true;\n    }\n\n    boolean giveBack() {\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Book[] books = new Book[n];\n        for (int i = 0; i < n; i++) books[i] = new Book(sc.next());\n        int q = sc.nextInt();\n        // обработайте команды\n    }\n}\n"
   },
   {
    "title": "Перевод между счетами",
    "prompt": "<p>В классе <code>Account</code> есть <code>private long balance</code> и <code>static int transfers</code> (количество успешных переводов). Метод <code>boolean transferTo(Account to, long amount)</code> переводит деньги и увеличивает <code>transfers</code>, только если сумма положительна и хватает на балансе. На входе <code>n</code>, затем <code>n</code> начальных балансов, затем <code>q</code> и <code>q</code> строк <code>from to amount</code> (номера счетов от 1 до n). Перевод на свой же счет (<code>from == to</code>) тоже неудачен. На каждый неудачный перевод выведите <code>FAIL i</code> (порядковый номер перевода, с 1). В конце выведите все балансы в одну строку и <code>Transfers: k</code>. Пример:</p><pre><code>3\n1000 500 0\n3\n1 3 400\n2 1 600\n3 2 400</code></pre><p>→</p><pre><code>FAIL 2\n600 900 0\nTransfers: 2</code></pre>",
    "hints": [
     "Номера счетов начинаются с 1 — при обращении к массиву вычтите 1.",
     "Метод класса может менять private поле другого объекта того же класса: <code>to.balance += amount;</code>. Свой счет проверьте через <code>to == this</code>."
    ],
    "starter": "import java.util.Scanner;\n\nclass Account {\n    static int transfers = 0;\n    private long balance;\n\n    Account(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    boolean transferTo(Account to, long amount) {\n        return false;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Account[] acc = new Account[n];\n        for (int i = 0; i < n; i++) acc[i] = new Account(sc.nextLong());\n        int q = sc.nextInt();\n        // обработайте переводы\n    }\n}\n"
   }
  ]
 },
 "jv-9": {
  "pr": [
   {
    "title": "Звуки животных",
    "prompt": "<p>Напишите <code>abstract class Animal</code> (с именем, <code>abstract String sound()</code>) и наследующие от него классы <code>Dog</code> (<code>Woof</code>), <code>Cat</code> (<code>Meow</code>), <code>Cow</code> (<code>Moo</code>). На входе <code>n</code>, затем <code>n</code> строк <code>тип имя</code>. Для каждого выведите <code>имя: звук</code>. Пример: <code>Dog Bars</code> → <code>Bars: Woof</code>.</p>",
    "hints": [
     "Конструктор каждого потомка вызывает <code>super(name)</code>.",
     "Даже если тип переменной — <code>Animal</code>, метод <code>sound()</code> вызывается у реального класса объекта."
    ],
    "starter": "import java.util.Scanner;\n\nabstract class Animal {\n    protected String name;\n\n    Animal(String name) { this.name = name; }\n\n    abstract String sound();\n}\n\n// напишите классы Dog, Cat, Cow\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // создайте объект для каждой строки\n    }\n}\n"
   },
   {
    "title": "Колеса транспорта",
    "prompt": "<p>Напишите <code>interface Vehicle { int wheels(); }</code> и классы <code>Car</code> (4), <code>Bike</code> (2), <code>Truck</code> (6), которые его реализуют. На входе <code>n</code>, затем <code>n</code> видов транспорта (<code>Car</code>, <code>Bike</code>, <code>Truck</code>). Выведите общее число колес. Пример: <code>3</code> / <code>Car Bike Truck</code> → <code>12</code>.</p>",
    "hints": [
     "Методы интерфейса <code>public</code>: <code>public int wheels() { return 4; }</code>.",
     "Объявите переменную с типом интерфейса: <code>Vehicle v = new Car();</code>."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Vehicle {\n    int wheels();\n}\n\n// напишите классы Car, Bike, Truck\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int total = 0;\n        // сложите wheels() каждой машины\n        System.out.println(total);\n    }\n}\n"
   },
   {
    "title": "Приветствие по умолчанию",
    "prompt": "<p><code>interface Greeter</code>: <code>String name();</code> и <code>default String greet()</code>, который возвращает <code>Hello, &lt;name&gt;!</code>. Класс <code>EnGreeter</code> не меняет метод по умолчанию, а <code>KzGreeter</code> переопределяет его и возвращает <code>Salem, &lt;name&gt;!</code>. На входе <code>n</code>, затем <code>n</code> строк <code>en имя</code> или <code>kz имя</code>. Для каждого выведите результат <code>greet()</code>. Пример: <code>kz Aruzhan</code> → <code>Salem, Aruzhan!</code>.</p>",
    "hints": [
     "Метод по умолчанию пишется внутри интерфейса с телом: <code>default String greet() { ... }</code>.",
     "В <code>KzGreeter</code> переопределите метод: <code>public String greet()</code>."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Greeter {\n    String name();\n}\n\n// напишите default greet(), EnGreeter и KzGreeter\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // для каждой строки создайте Greeter и выведите greet()\n    }\n}\n"
   },
   {
    "title": "Бонус менеджера",
    "prompt": "<p><code>abstract class Employee</code> (имя, <code>abstract long monthlyPay()</code>), <code>Salaried extends Employee</code> (постоянный оклад) и <code>Manager extends Salaried</code> (оклад + бонус; в <code>monthlyPay()</code> используйте <code>super.monthlyPay()</code>). На входе <code>n</code>, затем <code>n</code> строк: <code>S имя оклад</code> или <code>M имя оклад бонус</code>. Для каждого выведите <code>имя: выплата</code>, в конце <code>Total: сумма</code>. Пример: <code>M Aliya 600000 150000</code> → <code>Aliya: 750000</code>.</p>",
    "hints": [
     "Конструктор <code>Manager</code> вызывает <code>super(name, salary)</code>.",
     "<code>super.monthlyPay()</code> вызывает версию из родительского класса, к ней прибавьте бонус."
    ],
    "starter": "import java.util.Scanner;\n\nabstract class Employee {\n    protected String name;\n    Employee(String name) { this.name = name; }\n    abstract long monthlyPay();\n}\n\n// напишите классы Salaried и Manager\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long total = 0;\n        // прочитайте сотрудников\n        System.out.println(\"Total: \" + total);\n    }\n}\n"
   },
   {
    "title": "Виды скидок",
    "prompt": "<p><code>interface Discount { long apply(long price); }</code> и три класса: <code>NoDiscount</code> (не меняет цену), <code>Percent</code> (скидка p%, целочисленное деление: <code>price - price * p / 100</code>), <code>Fixed</code> (вычитается фиксированная сумма, но цена не опускается ниже 0). На входе цена и <code>n</code>, затем <code>n</code> строк: <code>NONE</code>, <code>PCT p</code> или <code>FIX сумма</code>. Для каждой скидки выведите цену после ее применения к исходной цене, каждое значение в отдельной строке. Пример: <code>20000 3</code> / <code>NONE</code> / <code>PCT 15</code> / <code>FIX 25000</code> → <code>20000</code>, <code>17000</code>, <code>0</code>.</p>",
    "hints": [
     "Все три класса делают <code>implements Discount</code> и пишут <code>public long apply(long price)</code>.",
     "<code>Fixed</code>: <code>price &gt; amount ? price - amount : 0</code>."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Discount {\n    long apply(long price);\n}\n\n// напишите классы NoDiscount, Percent, Fixed\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long price = sc.nextLong();\n        int n = sc.nextInt();\n        // создайте объект Discount для каждой строки\n    }\n}\n"
   },
   {
    "title": "Самый большой периметр",
    "prompt": "<p><code>interface Shape</code>: <code>double perimeter();</code> и <code>default String label()</code>, который возвращает <code>shape</code>. Каждый из классов <code>Square(a)</code>, <code>Rect(w, h)</code>, <code>Circle(r)</code> (периметр 2πr) переопределяет <code>label()</code> и возвращает <code>square</code>, <code>rect</code> или <code>circle</code> соответственно. На входе <code>n</code>, затем <code>n</code> строк: <code>S a</code>, <code>R w h</code> или <code>C r</code>. Выведите фигуру с самым большим периметром (если равны — первую) в виде <code>label периметр</code>, периметр с 2 знаками после запятой. Пример: <code>S 5</code>, <code>C 3</code>, <code>R 4 7</code> → <code>rect 22.00</code>.</p>",
    "hints": [
     "Лучшую фигуру храните в переменной <code>Shape best = null;</code>.",
     "Заменяйте только при строгом превышении (<code>&gt;</code>), тогда при равенстве останется первая."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Shape {\n    double perimeter();\n    default String label() { return \"shape\"; }\n}\n\n// напишите классы Square, Rect, Circle\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // прочитайте фигуры и найдите фигуру с самым большим периметром\n    }\n}\n"
   },
   {
    "title": "Комиссии за платежи",
    "prompt": "<p><code>abstract class Payment</code>: поле <code>amount</code>, <code>abstract long fee()</code>, <code>abstract String kind()</code>. Потомки: <code>Card</code> — 1% от суммы (целочисленное деление), <code>Qr</code> — 0, <code>Transfer</code> — постоянные 150. На входе <code>n</code>, затем <code>n</code> строк <code>CARD сумма</code>, <code>QR сумма</code> или <code>TRANSFER сумма</code>. Соберите платежи в массив <code>Payment[]</code> и отсортируйте по <b>убыванию</b> комиссии (при равенстве — в порядке ввода) сортировкой, которую напишете сами. Каждый выведите в виде <code>kind amount fee</code>, в конце <code>Total fee: сумма</code>. Пример:</p><pre><code>3\nQR 5000\nCARD 25000\nTRANSFER 100000</code></pre><p>→</p><pre><code>CARD 25000 250\nTRANSFER 100000 150\nQR 5000 0\nTotal fee: 400</code></pre>",
    "hints": [
     "Для сортировки подходит insertion sort: она устойчива, то есть порядок равных элементов не нарушается.",
     "Сравнивайте только через <code>fee()</code> — знать конкретный класс не нужно (полиморфизм)."
    ],
    "starter": "import java.util.Scanner;\n\nabstract class Payment {\n    protected long amount;\n    Payment(long amount) { this.amount = amount; }\n    abstract long fee();\n    abstract String kind();\n}\n\n// напишите классы Card, Qr, Transfer\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Payment[] ps = new Payment[n];\n        // прочитайте, отсортируйте и выведите\n    }\n}\n"
   },
   {
    "title": "Дерево выражения",
    "prompt": "<p><code>interface Expr { long eval(); String show(); }</code> и три класса: <code>Num</code> (число), <code>Add</code> и <code>Mul</code> (каждый хранит два <code>Expr</code>). <code>show()</code> выводит сложение и умножение в скобках: <code>(3 + 4)</code>. На входе <code>n</code>, затем <code>n</code> токенов в обратной польской записи (числа, <code>+</code>, <code>*</code>); выражение всегда корректно. Постройте дерево, используя массив <code>Expr[]</code> как стек, и выведите <code>show() = eval()</code>. Пример: <code>5</code> / <code>3 4 + 2 *</code> → <code>((3 + 4) * 2) = 14</code>.</p>",
    "hints": [
     "Если пришло число — положите в стек <code>new Num(...)</code>; если операция — возьмите два элемента (правый выходит первым) и положите новый <code>Add</code>/<code>Mul</code>.",
     "<code>eval()</code> и <code>show()</code> рекурсивно вызывают вложенные выражения."
    ],
    "starter": "import java.util.Scanner;\n\ninterface Expr {\n    long eval();\n    String show();\n}\n\n// напишите классы Num, Add, Mul\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Expr[] stack = new Expr[n];\n        int top = 0;\n        // обработайте токены\n    }\n}\n"
   }
  ]
 },
 "jv-10": {
  "pr": [
   {
    "title": "Число разных городов",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> названий городов (одно слово). С помощью <code>HashSet</code> выведите, сколько разных городов есть. Пример: <code>5</code> / <code>Almaty Astana Almaty Oral Astana</code> → <code>3</code>.</p>",
    "hints": [
     "<code>Set</code> не сохраняет повторяющееся значение второй раз.",
     "Ответ — <code>cities.size()</code>."
    ],
    "starter": "import java.util.HashSet;\nimport java.util.Set;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> cities = new HashSet<>();\n        // добавьте города\n        System.out.println(n);\n    }\n}\n"
   },
   {
    "title": "Справочник цен",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> строк <code>товар цена</code>, затем <code>q</code> и <code>q</code> названий товаров. Положите товары в <code>HashMap</code> и на каждый запрос выведите цену или <code>NOT FOUND</code>. Если товар повторяется, действует последняя цена. Пример: <code>2</code> / <code>nan 250</code> / <code>sut 480</code> / <code>2</code> / <code>sut</code> / <code>shai</code> → <code>480</code>, <code>NOT FOUND</code>.</p>",
    "hints": [
     "<code>put</code> заменяет значение у уже существующего ключа — останется последняя цена.",
     "Сначала проверьте через <code>containsKey</code>, затем <code>get</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> prices = new HashMap<>();\n        // put, затем ответы на запросы\n    }\n}\n"
   },
   {
    "title": "Список длинных слов",
    "prompt": "<p>На входе <code>n k</code>, затем <code>n</code> слов. Соберите в <code>ArrayList</code> слова, длина которых не меньше <code>k</code>, в порядке ввода. В первую строку выведите их количество, во вторую — сами слова через пробел (если их нет, вторая строка пустая). Пример: <code>4 5</code> / <code>Astana Oral Almaty Kokshetau</code> →</p><pre><code>3\nAstana Almaty Kokshetau</code></pre>",
    "hints": [
     "Если <code>w.length() &gt;= k</code>, то <code>words.add(w)</code>.",
     "Пройдите элементы через <code>words.get(i)</code>, количество — <code>words.size()</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        // отфильтруйте слова\n    }\n}\n"
   },
   {
    "title": "Самое частое слово",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> слов (например, любимые блюда из опроса). Выведите самое частое слово и количество его повторов; если частоты равны, выберите наименьшее по алфавиту. Используйте <code>HashMap</code>. Пример: <code>6</code> / <code>besbarmak plov plov manty besbarmak kuyrdak</code> → <code>besbarmak 2</code>.</p>",
    "hints": [
     "Подсчет: <code>cnt.merge(w, 1, Integer::sum)</code> или <code>getOrDefault</code>.",
     "У <code>HashMap</code> нет порядка, поэтому при равенстве решайте сами: <code>e.getKey().compareTo(best) &lt; 0</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> cnt = new HashMap<>();\n        // посчитайте\n    }\n}\n"
   },
   {
    "title": "Общие ученики",
    "prompt": "<p>Есть два кружка: шахматы и робототехника. На входе <code>n</code> и <code>n</code> имен (шахматы), затем <code>m</code> и <code>m</code> имен (робототехника). Каждого ученика, посещающего оба кружка, выведите в отдельной строке по алфавиту; если таких нет, выведите <code>NONE</code>. Используйте <code>HashSet</code> и <code>TreeSet</code>. Пример: <code>3</code> / <code>Dana Aibek Erlan</code> / <code>2</code> / <code>Erlan Aibek</code> → <code>Aibek</code>, <code>Erlan</code>.</p>",
    "hints": [
     "Первый список положите в <code>HashSet</code>, а при чтении второго проверяйте через <code>contains</code>.",
     "Если сложить общих в <code>TreeSet</code>, они сами отсортируются по алфавиту."
    ],
    "starter": "import java.util.HashSet;\nimport java.util.Set;\nimport java.util.TreeSet;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> chess = new HashSet<>();\n        // прочитайте второй список и найдите общие элементы\n    }\n}\n"
   },
   {
    "title": "Продажи по городам",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> строк <code>город сумма</code>. Выведите общие продажи каждого города в виде <code>город сумма</code>, в порядке <b>первого появления</b> города. <code>LinkedHashMap</code> сохраняет порядок добавления. Пример: <code>4</code> / <code>Oral 500</code> / <code>Almaty 200</code> / <code>Oral 300</code> / <code>Taraz 100</code> → <code>Oral 800</code>, <code>Almaty 200</code>, <code>Taraz 100</code>.</p>",
    "hints": [
     "<code>Map&lt;String, Long&gt; sales = new LinkedHashMap&lt;&gt;();</code>",
     "<code>sales.put(city, sales.getOrDefault(city, 0L) + amount)</code>; обновление существующего ключа не меняет его место."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Long> sales = new HashMap<>();\n        // соберите суммы\n    }\n}\n"
   },
   {
    "title": "Группы анаграмм",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> слов (строчные латинские буквы). Сгруппируйте слова, составленные из одних и тех же букв (анаграммы). Группы выводите в порядке первого появления слова, каждую группу в одну строку, слова внутри группы — в порядке ввода через пробел. Пример: <code>6</code> / <code>eat tea tan ate nat bat</code> →</p><pre><code>eat tea ate\ntan nat\nbat</code></pre><p>В качестве ключа возьмите отсортированные буквы слова.</p>",
    "hints": [
     "Ключ: <code>char[] cs = w.toCharArray(); Arrays.sort(cs); String key = new String(cs);</code>.",
     "Значение — список слов: <code>Map&lt;String, List&lt;String&gt;&gt;</code>; порядок групп сохраняет <code>LinkedHashMap</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.LinkedHashMap;\nimport java.util.List;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, List<String>> groups = new LinkedHashMap<>();\n        // ключ: отсортированные буквы\n    }\n}\n"
   },
   {
    "title": "Восстановление маршрута поезда",
    "prompt": "<p>Билеты пассажира перемешались: на каждом написано <code>откуда куда</code>. Билеты образуют один непрерывный маршрут, в каждом городе бываем не более одного раза. Выведите маршрут в виде <code>A -&gt; B -&gt; C</code>. Подсказка: <code>HashMap</code> хранит «следующий город», а <code>HashSet</code> помогает найти начальный город (его нет в графе «куда» ни одного билета). Пример:</p><pre><code>3\nAstana Karaganda\nAlmaty Taraz\nTaraz Astana</code></pre><p>→ <code>Almaty -&gt; Taraz -&gt; Astana -&gt; Karaganda</code></p>",
    "hints": [
     "Начальный город — единственный из ключей <code>next</code>, которого нет среди значений (<code>targets</code>).",
     "Затем проходите маршрут через <code>while (next.containsKey(cur))</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.HashSet;\nimport java.util.Map;\nimport java.util.Set;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> next = new HashMap<>();\n        Set<String> targets = new HashSet<>();\n        // прочитайте билеты и найдите начальный город\n    }\n}\n"
   }
  ]
 },
 "jv-11": {
  "pr": [
   {
    "title": "Проверка возраста",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> токенов. Преобразуйте каждый в возраст через <code>Integer.parseInt</code>. Если это не число (<code>NumberFormatException</code>), выведите <code>BAD x</code>; если число вне диапазона 0–120, выведите <code>OUT x</code>; иначе <code>OK x</code> (<code>x</code> — сам токен). Пример: <code>3</code> / <code>25 abc 150</code> → <code>OK 25</code>, <code>BAD abc</code>, <code>OUT 150</code>.</p>",
    "hints": [
     "Читайте токен как строку через <code>sc.next()</code>, затем <code>Integer.parseInt</code> внутри <code>try</code>.",
     "В блоке <code>catch (NumberFormatException e)</code> выведите <code>BAD</code>."
    ]
   },
   {
    "title": "Всегда finally",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> токенов. Для каждого: если это число, выведите его квадрат (<code>long</code>), иначе <code>ERROR x</code>. Счетчик проверенных увеличивайте в блоке <code>finally</code>, в конце выведите <code>Checked: n</code>. Пример: <code>3</code> / <code>4 x 100000</code> → <code>16</code>, <code>ERROR x</code>, <code>10000000000</code>, <code>Checked: 3</code>.</p>",
    "hints": [
     "<code>finally</code> выполняется и при ошибке, и без нее — увеличивайте счетчик там.",
     "100000² не помещается в int: <code>long v = Integer.parseInt(t);</code>."
    ]
   },
   {
    "title": "Безопасное деление",
    "prompt": "<p>Метод <code>static int divide(int a, int b)</code> должен бросать <code>throw new IllegalArgumentException(\"Division by zero\")</code>, если <code>b == 0</code>, иначе возвращать <code>a / b</code>. На входе <code>n</code>, затем <code>n</code> пар <code>a b</code>. Для каждой пары выведите результат или сообщение, перехваченное в <code>catch</code> (<code>e.getMessage()</code>). Пример: <code>2</code> / <code>10 3</code> / <code>5 0</code> → <code>3</code>, <code>Division by zero</code>.</p>",
    "hints": [
     "<code>throw new IllegalArgumentException(\"Division by zero\");</code> сразу прерывает метод.",
     "В <code>main</code> используйте <code>catch (IllegalArgumentException e)</code> и <code>e.getMessage()</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int divide(int a, int b) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            // вызовите divide внутри try\n        }\n    }\n}\n"
   },
   {
    "title": "Свое исключение",
    "prompt": "<p>Напишите <code>class InvalidScoreException extends Exception</code>. Метод <code>static int check(int s) throws InvalidScoreException</code> бросает исключение с сообщением <code>\"Invalid score: \" + s</code>, если балл вне диапазона 0–100. На входе <code>n</code>, затем <code>n</code> целых баллов. Выведите сообщения о неверных баллах, в конце сумму верных в виде <code>Sum: s</code>. Пример: <code>4</code> / <code>90 120 75 -5</code> → <code>Invalid score: 120</code>, <code>Invalid score: -5</code>, <code>Sum: 165</code>.</p>",
    "hints": [
     "Класс исключения: <code>InvalidScoreException(String message) { super(message); }</code>.",
     "Это checked-исключение: в методе напишите <code>throws InvalidScoreException</code>, а в <code>main</code> поймайте его."
    ],
    "starter": "import java.util.Scanner;\n\n// напишите класс InvalidScoreException\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum += sc.nextInt();\n        }\n        System.out.println(\"Sum: \" + sum);\n    }\n}\n"
   },
   {
    "title": "Чтение дробей",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> дробей в виде <code>a/b</code> (например, <code>3/4</code>). Разбейте каждую через <code>split(\"/\")</code> и выведите значение с 2 знаками после запятой. Если знаменатель 0, сами бросьте <code>IllegalArgumentException</code> и выведите <code>ZERO</code>; если число некорректно (<code>NumberFormatException</code>), выведите <code>BAD</code>; если знака <code>/</code> нет, тоже <code>BAD</code>. Напишите два catch: <code>NumberFormatException</code> — потомок <code>IllegalArgumentException</code>, поэтому он идет первым. Пример: <code>3</code> / <code>3/4 1/0 x/2</code> → <code>0.75</code>, <code>ZERO</code>, <code>BAD</code>.</p>",
    "hints": [
     "Если <code>t.split(\"/\")</code> не дает две части, это тоже <code>BAD</code> — его тоже можно бросить как исключение.",
     "Порядок catch: сначала <code>NumberFormatException</code>, потом <code>IllegalArgumentException</code>. Если поменять, компилятор выдаст ошибку."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            // разбейте, проверьте и выведите\n        }\n    }\n}\n"
   },
   {
    "title": "Правила пароля",
    "prompt": "<p>Напишите <code>class WeakPasswordException extends Exception</code>. Метод <code>static void validate(String p) throws WeakPasswordException</code> проверяет правила по порядку: короче 8 символов — <code>too short</code>; нет цифры — <code>no digit</code>; нет заглавной латинской буквы — <code>no uppercase</code>. На входе <code>n</code>, затем <code>n</code> паролей. Для каждого выведите <code>OK</code> или <code>WEAK: причина</code>. Пример: <code>Astana2026</code> → <code>OK</code>, <code>qwerty</code> → <code>WEAK: too short</code>.</p>",
    "hints": [
     "Цифра: <code>c &gt;= '0' &amp;&amp; c &lt;= '9'</code>, заглавная: <code>c &gt;= 'A' &amp;&amp; c &lt;= 'Z'</code>.",
     "<code>OK</code> выводится только если <code>validate</code> завершился без исключения."
    ],
    "starter": "import java.util.Scanner;\n\n// напишите класс WeakPasswordException\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String p = sc.next();\n            System.out.println(\"OK\");\n        }\n    }\n}\n"
   },
   {
    "title": "Банкомат",
    "prompt": "<p>Напишите <code>class AtmException extends Exception</code>. В классе <code>Atm</code> есть <code>private long balance</code> и сумма, снятая сегодня. Метод <code>void withdraw(long amount) throws AtmException</code> проверяет по порядку: сумма положительна и кратна 1000, иначе <code>Amount must be a positive multiple of 1000</code>; хватает баланса, иначе <code>Insufficient funds</code>; общая сумма за день не превышает 200000, иначе <code>Daily limit exceeded</code>. На входе начальный баланс и <code>n</code>, затем <code>n</code> токенов. Если токен не число, выведите <code>Bad input: x</code>. На каждое успешное снятие выводите <code>OK amount</code>, на ошибку — сообщение, в конце <code>BALANCE b</code>. Пример:</p><pre><code>300000 5\n50000 abc 1500 160000 100000</code></pre><p>→</p><pre><code>OK 50000\nBad input: abc\nAmount must be a positive multiple of 1000\nDaily limit exceeded\nOK 100000\nBALANCE 150000</code></pre>",
    "hints": [
     "Проверки идут по порядку: сначала правильность суммы, потом баланс, в конце дневной лимит. Поля меняйте, только если все проверки пройдены.",
     "Два разных вида ошибок: <code>NumberFormatException</code> из <code>Long.parseLong</code> и ваш <code>AtmException</code> — два catch."
    ],
    "starter": "import java.util.Scanner;\n\n// напишите класс AtmException\n\nclass Atm {\n    private long balance;\n    private long today = 0;\n\n    Atm(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    void withdraw(long amount) {\n        balance -= amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Atm atm = new Atm(sc.nextLong());\n        int n = sc.nextInt();\n        // обработайте токены\n        System.out.println(\"BALANCE \" + atm.getBalance());\n    }\n}\n"
   },
   {
    "title": "Проверка конфигурационного файла",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> строк <code>key=value</code> (без пробелов). Напишите <code>class ConfigException extends Exception</code> и метод, который проверяет каждую строку и бросает его при ошибке: нет <code>=</code> — <code>Line i: missing =</code>; ключ уже встречался — <code>Line i: duplicate key</code>; ключ <code>port</code>, а значение не целое число в диапазоне 1–65535 — <code>Line i: bad port</code> (<code>i</code> — номер строки, с 1). Выводите ошибки, а правильные строки сохраните в <code>TreeMap</code> и в конце выведите их по ключу в виде <code>key = value</code>. Пример:</p><pre><code>4\nport=80a\nhost=localhost\ndebug\nhost=0.0.0.0</code></pre><p>→</p><pre><code>Line 1: bad port\nLine 3: missing =\nLine 4: duplicate key\nhost = localhost</code></pre>",
    "hints": [
     "Разбейте через <code>indexOf(\"=\")</code>: ключ — <code>substring(0, eq)</code>, значение — <code>substring(eq + 1)</code>.",
     "Перехватите <code>NumberFormatException</code> от <code>parseInt</code> и бросьте вместо него свой <code>ConfigException</code>. Строка с ошибкой в map не попадает."
    ],
    "starter": "import java.util.Map;\nimport java.util.TreeMap;\nimport java.util.Scanner;\n\n// напишите класс ConfigException\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> cfg = new TreeMap<>();\n        // проверьте строки\n    }\n}\n"
   }
  ]
 },
 "jv-12": {
  "pr": [
   {
    "title": "Generic Pair",
    "prompt": "<p>Напишите <code>class Pair&lt;A, B&gt;</code>, как на занятии (<code>getFirst()</code>, <code>getSecond()</code>). На входе <code>n</code>, затем <code>n</code> строк <code>город население</code>. Соберите пары в <code>List&lt;Pair&lt;String, Integer&gt;&gt;</code> и выведите город с наибольшим населением (если равны — первый) в виде <code>город население</code>. Пример: <code>3</code> / <code>Shymkent 1200000</code> / <code>Almaty 2200000</code> / <code>Astana 1400000</code> → <code>Almaty 2200000</code>.</p>",
    "hints": [
     "Generic класс: <code>class Pair&lt;A, B&gt; { private final A first; ... }</code>.",
     "<code>Integer</code> можно сравнивать через <code>&gt;</code> (распаковка), но не через <code>==</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\n// напишите class Pair<A, B>\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // соберите список Pair\n    }\n}\n"
   },
   {
    "title": "Stream: выше порога",
    "prompt": "<p>На входе <code>n k</code>, затем <code>n</code> целых чисел (суммы заказов). С помощью <code>Arrays.stream(...).filter(...).count()</code> выведите количество сумм, строго больших <code>k</code>. Пример: <code>5 10000</code> / <code>1200 45000 800 150000 10000</code> → <code>2</code>.</p>",
    "hints": [
     "Лямбда может использовать внешнюю переменную (<code>k</code>), если та не меняется.",
     "<code>count()</code> возвращает <code>long</code>."
    ],
    "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        long cnt = 0;   // посчитайте через stream\n        System.out.println(cnt);\n    }\n}\n"
   },
   {
    "title": "Stream: квадраты нечетных",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> целых чисел (|x| ≤ 1000). С помощью stream возьмите <b>нечетные</b> числа, возведите каждое в квадрат (<code>map</code>) и выведите сумму (<code>sum</code>). Пример: <code>5</code> / <code>1 2 3 4 -5</code> → <code>35</code> (1 + 9 + 25).</p>",
    "hints": [
     "Для отрицательного нечетного числа <code>x % 2</code> дает −1, поэтому проверяйте <code>x % 2 != 0</code>.",
     "Конвейер: <code>filter(...)</code> → <code>map(x -&gt; x * x)</code> → <code>sum()</code>."
    ],
    "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int s = 0;   // посчитайте через stream\n        System.out.println(s);\n    }\n}\n"
   },
   {
    "title": "Generic maxOf",
    "prompt": "<p>Напишите обобщенный метод из урока: <code>static &lt;T extends Comparable&lt;T&gt;&gt; T maxOf(List&lt;T&gt; xs)</code>. На входе <code>n</code> и <code>n</code> целых чисел, затем <code>m</code> и <code>m</code> слов. Одним и тем же <code>maxOf</code> выведите две строки: наибольшее число и последнее по алфавиту слово. Пример: <code>3</code> / <code>5 -2 9</code> / <code>3</code> / <code>Oral Astana Taraz</code> → <code>9</code>, <code>Taraz</code>.</p>",
    "hints": [
     "И <code>Integer</code>, и <code>String</code> реализуют <code>Comparable</code>, поэтому один метод подходит обоим.",
     "Сравнение: <code>x.compareTo(best) &gt; 0</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        // напишите метод maxOf и вызовите его\n    }\n}\n"
   },
   {
    "title": "Сортировка по длине",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> слов. Соберите их в <code>ArrayList</code> и отсортируйте через <code>list.sort</code>, передав лямбда-компаратор: сначала по возрастанию длины, при равной длине — по алфавиту. Выведите в одну строку через пробел. Пример: <code>5</code> / <code>Shymkent Oral Aktau Taraz Ural</code> → <code>Oral Ural Aktau Taraz Shymkent</code>.</p>",
    "hints": [
     "Если компаратор возвращает отрицательное число, <code>a</code> идет раньше: <code>a.length() - b.length()</code>.",
     "При равной длине используйте <code>a.compareTo(b)</code>."
    ]
   },
   {
    "title": "Фильтр Predicate",
    "prompt": "<p>Напишите обобщенный метод <code>static &lt;T&gt; List&lt;T&gt; keep(List&lt;T&gt; xs, Predicate&lt;T&gt; p)</code>, который возвращает элементы, удовлетворяющие условию (<code>p.test(x)</code>). На входе <code>n</code> и <code>n</code> целых чисел, затем <code>m</code> и <code>m</code> слов. В первую строку выведите четные числа, во вторую — слова, начинающиеся с буквы <code>A</code> (в порядке ввода, через пробел); если пусто, выведите <code>NONE</code>. Пример: <code>4</code> / <code>3 8 -2 5</code> / <code>3</code> / <code>Almaty Oral Aktobe</code> → <code>8 -2</code>, <code>Almaty Aktobe</code>.</p>",
    "hints": [
     "<code>import java.util.function.Predicate;</code>, а вызов: <code>keep(nums, x -&gt; x % 2 == 0)</code>.",
     "Для слов: <code>w -&gt; w.startsWith(\"A\")</code> или <code>w.charAt(0) == 'A'</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.function.Predicate;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        // напишите метод keep и вызовите его дважды\n    }\n}\n"
   },
   {
    "title": "Stream: лучшие студенты",
    "prompt": "<p>Есть класс <code>Student</code> (имя, балл). На входе <code>n t</code>, затем <code>n</code> строк <code>имя балл</code>. Через <code>students.stream()</code> отфильтруйте студентов с баллом не ниже <code>t</code> (<code>filter</code>), возьмите их имена (<code>map</code>), отсортируйте по алфавиту (<code>sorted</code>) и соберите в список (<code>collect(Collectors.toList())</code>). В первую строку выведите их количество, во вторую — имена через <code>, </code>; если никого нет, во второй строке выведите <code>NONE</code>. Пример: <code>4 85</code> / <code>Timur 90</code> / <code>Aliya 85</code> / <code>Bolat 70</code> / <code>Dana 99</code> →</p><pre><code>3\nAliya, Dana, Timur</code></pre>",
    "hints": [
     "Нужен <code>import java.util.stream.Collectors;</code>.",
     "Конвейер: <code>.filter(s -&gt; s.score &gt;= t).map(s -&gt; s.name).sorted().collect(Collectors.toList())</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.stream.Collectors;\nimport java.util.Scanner;\n\nclass Student {\n    String name;\n    int score;\n    Student(String name, int score) { this.name = name; this.score = score; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int t = sc.nextInt();\n        List<Student> students = new ArrayList<>();\n        for (int i = 0; i < n; i++) students.add(new Student(sc.next(), sc.nextInt()));\n        // напишите конвейер stream\n    }\n}\n"
   },
   {
    "title": "Generic стек",
    "prompt": "<p>Напишите обобщенный класс <code>class Stack&lt;T&gt;</code> на основе <code>ArrayList&lt;T&gt;</code>: <code>push(T x)</code>, <code>T pop()</code>, <code>T peek()</code>, <code>int size()</code>, <code>boolean isEmpty()</code>. На входе <code>q</code>, затем <code>q</code> команд: <code>PUSH слово</code>, <code>POP</code>, <code>PEEK</code>, <code>SIZE</code>. <code>POP</code> выводит снятый элемент, <code>PEEK</code> — верхний элемент, <code>SIZE</code> — размер; если стек пуст, <code>POP</code> и <code>PEEK</code> выводят <code>EMPTY</code>. Пример:</p><pre><code>6\nPUSH Almaty\nPUSH Astana\nPEEK\nPOP\nPOP\nPOP</code></pre><p>→ <code>Astana</code>, <code>Astana</code>, <code>Almaty</code>, <code>EMPTY</code>.</p>",
    "hints": [
     "Верх стека — конец списка: <code>items.remove(items.size() - 1)</code>.",
     "Пустой стек сначала проверяйте через <code>isEmpty()</code>, и только потом вызывайте <code>pop()</code>."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\n// напишите class Stack<T>\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        // создайте Stack<String> и обработайте команды\n    }\n}\n"
   }
  ]
 },
 "jv-13": {
  "pr": [
   {
    "title": "Факториал рекурсией",
    "prompt": "<p>Напишите метод <code>static long factorial(int n)</code> через рекурсию (базовый случай: <code>n &lt;= 1</code> → 1). На входе <code>n</code> (0 ≤ n ≤ 20); выведите <code>n!</code>. Пример: <code>5</code> → <code>120</code>.</p>",
    "hints": [
     "Базовый случай: <code>if (n &lt;= 1) return 1;</code>.",
     "Рекурсивный шаг: <code>return n * factorial(n - 1);</code>. 20! едва помещается в long."
    ]
   },
   {
    "title": "Сумма цифр рекурсией",
    "prompt": "<p>Напишите метод <code>static int digitSum(long n)</code> через рекурсию, <b>без цикла</b>: если <code>n &lt; 10</code>, вернуть <code>n</code>, иначе последняя цифра + сумма цифр оставшегося числа. На входе неотрицательное целое (≤ 10¹⁸, читается через <code>nextLong</code>). Пример: <code>98765</code> → <code>35</code>.</p>",
    "hints": [
     "Базовый случай: число из одной цифры.",
     "Рекурсивный шаг: <code>(int) (n % 10) + digitSum(n / 10)</code>."
    ]
   },
   {
    "title": "Количество слов в строке",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> строк; в каждой несколько слов, разделенных одним пробелом (строка не пуста). Выведите количество слов в каждой строке в отдельной строке. Не забудьте про ловушку <code>nextLine()</code> после <code>nextInt()</code>. Пример:</p><pre><code>2\nAlmaty Astana Shymkent\nTaraz</code></pre><p>→ <code>3</code>, <code>1</code>.</p>",
    "hints": [
     "После <code>nextInt()</code> курсор стоит в конце первой строки — вызовите один «пустой» <code>sc.nextLine();</code>.",
     "Количество слов: <code>line.split(\" \").length</code>."
    ]
   },
   {
    "title": "Фибоначчи с мемоизацией",
    "prompt": "<p>Напишите рекурсивный метод <code>static long fib(int n)</code> с массивом <code>long[] memo</code> (<code>fib(0) = 0</code>, <code>fib(1) = 1</code>). На входе <code>n</code> (0 ≤ n ≤ 90). Выведите <code>fib(n)</code>. Без мемоизации программа для n = 90 никогда не закончится. Пример: <code>50</code> → <code>12586269025</code>.</p>",
    "hints": [
     "Сохраняйте вычисленное значение в <code>memo[n]</code>; 0 означает, что оно еще не вычислено (при n ≥ 2 значение fib(n) &gt; 0).",
     "В начале метода: <code>if (memo[n] != 0) return memo[n];</code>."
    ]
   },
   {
    "title": "Ханойские башни",
    "prompt": "<p>Переместите <code>n</code> дисков со стержня 1 на стержень 3 (большой диск нельзя класть на меньший). Рекурсивным методом <code>static void hanoi(int n, int from, int to, int via)</code> выводите каждый ход в виде <code>from -&gt; to</code>, в конце <code>Moves: k</code>. На входе <code>n</code> (1 ≤ n ≤ 10). Пример: <code>2</code> →</p><pre><code>1 -&gt; 2\n1 -&gt; 3\n2 -&gt; 3\nMoves: 3</code></pre>",
    "hints": [
     "Перенос n дисков: верхние n−1 диск на вспомогательный стержень, самый большой на целевой, затем n−1 диск поверх него.",
     "Ходов много (2ⁿ − 1), соберите вывод в <code>StringBuilder</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    static void hanoi(int n, int from, int to, int via) {\n        // рекурсия\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        hanoi(n, 1, 3, 2);\n    }\n}\n"
   },
   {
    "title": "Подмножества с заданной суммой",
    "prompt": "<p>На входе сначала целевая сумма <code>target</code>, затем целые числа неизвестного количества (не более 18, могут быть в нескольких строках), пока вход не закончится. Читайте числа через <code>hasNextInt()</code>. Рекурсией найдите количество непустых подмножеств с суммой <code>target</code> (каждый элемент выбирается один раз; наборы, отличающиеся позициями, считаются разными): для каждого элемента мы его «берем» или «не берем». Пример: <code>5</code> / <code>1 2 3 4 5</code> → <code>3</code> ({5}, {1, 4}, {2, 3}).</p>",
    "hints": [
     "Собирайте числа через <code>while (sc.hasNextInt()) a.add(sc.nextInt());</code>.",
     "Рекурсия <code>count(i, rest)</code>: взять <code>i</code>-й элемент — <code>count(i + 1, rest - a[i])</code>, не взять — <code>count(i + 1, rest)</code>. Пустое подмножество не считать."
    ],
    "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int target = sc.nextInt();\n        List<Integer> a = new ArrayList<>();\n        // читайте через hasNextInt, затем рекурсия\n    }\n}\n"
   },
   {
    "title": "Перестановки букв",
    "prompt": "<p>На входе одно слово без повторяющихся букв (длина 1–7). Выведите все перестановки его букв в лексикографическом порядке, каждую в отдельной строке. Backtracking: сначала отсортируйте буквы, затем с помощью массива <code>boolean[] used</code> ставьте на каждую позицию еще не использованную букву. Пример: <code>bca</code> → <code>abc acb bac bca cab cba</code> (каждая в отдельной строке).</p>",
    "hints": [
     "Сначала <code>Arrays.sort(cs)</code> — тогда перестановки сами выйдут в лексикографическом порядке.",
     "Выбор → <code>gen(...)</code> → откат: <code>deleteCharAt</code> и <code>used[i] = false</code>."
    ]
   },
   {
    "title": "N ферзей",
    "prompt": "<p>Сколькими способами можно расставить <code>n</code> ферзей на доске <code>n × n</code> так, чтобы никакие два не били друг друга (не стояли в одной строке, одном столбце или одной диагонали)? На входе <code>n</code> (1 ≤ n ≤ 10). Backtracking: ставьте по одному ферзю в каждую строку и отмечайте столбцы и две диагонали массивами <code>boolean</code>. Пример: <code>4</code> → <code>2</code>, <code>8</code> → <code>92</code>.</p>",
    "hints": [
     "На одной диагонали клеток <code>r + c</code> постоянно, на другой <code>r - c</code> постоянно (чтобы индекс не был отрицательным, добавьте <code>+ n - 1</code>).",
     "Поставили ферзя, вызвали <code>place(r + 1)</code>, затем сняли отметки."
    ]
   }
  ]
 },
 "jv-p1": {
  "pr": [
   {
    "title": "Самая частая буква",
    "prompt": "<p>На входе одно слово из строчных латинских букв. Выведите самую частую букву и количество ее повторов; если частоты равны, выведите ту, что раньше по алфавиту. Используйте массив частот <code>int[26]</code>. Пример: <code>karaganda</code> → <code>a 4</code>.</p>",
    "hints": [
     "<code>cnt[c - 'a']++</code> — счетчик для каждой буквы.",
     "Чтобы вернуть букву из индекса: <code>(char) ('a' + best)</code>. Если менять только при строгом превышении, при равенстве останется первая по алфавиту."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        // посчитайте и найдите наибольшее\n    }\n}\n"
   },
   {
    "title": "Нули в конец",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> целых чисел. Сохраните порядок ненулевых элементов, переместите все нули в конец массива и выведите в одну строку через пробел. Используйте два указателя: <code>write</code> показывает, куда записать следующий ненулевой элемент. Пример: <code>6</code> / <code>0 3 0 5 7 0</code> → <code>3 5 7 0 0 0</code>.</p>",
    "hints": [
     "Ненулевой элемент переносите вперед: <code>a[write++] = a[i]</code>.",
     "Оставшиеся места в конце заполните нулями."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // два указателя\n    }\n}\n"
   },
   {
    "title": "Пропавший номер",
    "prompt": "<p>В классе ученики пронумерованы от 1 до <code>n</code>, один ученик не пришел. На входе <code>n</code> (2 ≤ n ≤ 10⁶), затем номера <code>n − 1</code> пришедших учеников (в любом порядке). Выведите номер ученика, которого не было. Подсказка: сумма чисел от 1 до n равна <code>n(n + 1)/2</code> (используйте long). Пример: <code>5</code> / <code>3 1 5 2</code> → <code>4</code>.</p>",
    "hints": [
     "Из суммы всех номеров вычтите сумму номеров пришедших.",
     "Если n = 10⁶, то <code>n(n + 1)/2</code> не помещается в int — используйте <code>long</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // формула суммы\n    }\n}\n"
   },
   {
    "title": "Первая одиночная буква",
    "prompt": "<p>На входе одно слово из строчных латинских букв. Выведите первую букву, которая встречается в слове ровно один раз, и ее индекс (с 0); если такой буквы нет, выведите <code>NONE</code>. Пример: <code>almaty</code> → <code>l 1</code>.</p>",
    "hints": [
     "Первый проход — подсчет частот, второй — проход по слову слева направо с поиском буквы, встречающейся 1 раз.",
     "Как только нашли, выведите и выйдите через <code>return</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        // два прохода\n    }\n}\n"
   },
   {
    "title": "Слияние отсортированных списков",
    "prompt": "<p>Суммы заказов двух филиалов даны в порядке возрастания. На входе <code>n</code> и <code>n</code> чисел, затем <code>m</code> и <code>m</code> чисел. Объедините два списка в один отсортированный и выведите в одну строку через пробел. Не используйте <code>Arrays.sort</code>, напишите решение за O(n + m) с двумя указателями. Пример: <code>3</code> / <code>1 4 9</code> / <code>4</code> / <code>2 4 5 10</code> → <code>1 2 4 4 5 9 10</code>.</p>",
    "hints": [
     "На каждом шаге берите меньшее из <code>a[i]</code> и <code>b[j]</code> и сдвигайте соответствующий указатель.",
     "Когда один список закончился, проверяйте границу: <code>j &gt;= m || (i &lt; n &amp;&amp; a[i] &lt;= b[j])</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int m = sc.nextInt();\n        int[] b = new int[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextInt();\n        // два указателя\n    }\n}\n"
   },
   {
    "title": "Пары с разностью k",
    "prompt": "<p>На входе <code>n k</code> (k ≥ 1), затем <code>n</code> <b>разных</b> целых чисел. Выведите количество пар, у которых разность ровно <code>k</code> (<code>b − a = k</code>). Решите за O(n) с помощью <code>HashSet</code>. Пример: <code>5 2</code> / <code>1 5 3 4 2</code> → <code>3</code> ((1, 3), (3, 5), (2, 4)).</p>",
    "hints": [
     "Положите все числа в <code>HashSet</code>.",
     "Для каждого <code>x</code> проверьте, есть ли в множестве <code>x + k</code>. Так как k ≥ 1, каждая пара учитывается ровно один раз."
    ]
   },
   {
    "title": "Подмассивы с суммой k",
    "prompt": "<p>На входе <code>n k</code> (n ≤ 10⁵), затем <code>n</code> целых чисел (могут быть отрицательными). Выведите количество непрерывных подмассивов, сумма которых ровно <code>k</code>. Вариант O(n²) слишком медленный: используйте префиксные суммы и <code>HashMap&lt;Long, Integer&gt;</code> — на каждой позиции спрашивайте: «сколько раз уже встречалась сумма <code>prefix − k</code>?». Пример: <code>5 3</code> / <code>1 2 1 2 1</code> → <code>4</code>.</p>",
    "hints": [
     "Сумма a[i..j] = prefix[j] − prefix[i−1]. Если она равна k, то prefix[i−1] = prefix[j] − k.",
     "Сначала положите <code>seen.put(0L, 1)</code> — для подмассивов, начинающихся с начала массива. Ответ может быть большим, поэтому используйте <code>long</code>."
    ],
    "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long k = sc.nextLong();\n        // префиксные суммы\n    }\n}\n"
   },
   {
    "title": "Самый длинный палиндромный фрагмент",
    "prompt": "<p>На входе одно слово из строчных латинских букв (длина ≤ 2000). Выведите самый длинный непрерывный фрагмент, который является палиндромом; если таких несколько, выведите самый левый. Берите каждую позицию (и промежуток между двумя буквами) за центр и расширяйте два указателя в обе стороны — это O(n²). Пример: <code>abacdfgdcaba</code> → <code>aba</code>, <code>forgeeksskeegfor</code> → <code>geeksskeeg</code>.</p>",
    "hints": [
     "Для нечетной длины центр — <code>(c, c)</code>, для четной — <code>(c, c + 1)</code>. Пока буквы совпадают, уменьшайте <code>l</code> и увеличивайте <code>r</code>.",
     "Когда расширение закончилось, длина палиндрома равна <code>r - l - 1</code>. Заменяйте ответ только при строгом превышении — останется самый левый."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // расширяйте от каждого центра\n        System.out.println(s.substring(0, 1));\n    }\n}\n"
   }
  ]
 },
 "jv-p2": {
  "pr": [
   {
    "title": "Электронная очередь ЦОНа",
    "prompt": "<p>В ЦОНе работает электронная очередь. На входе <code>q</code>, затем <code>q</code> команд: <code>JOIN имя</code> — встать в очередь, <code>NEXT</code> — вызвать к окну. На каждый <code>NEXT</code> выведите имя вызванного человека; если очередь пуста, выведите <code>EMPTY</code>. В конце выведите <code>Waiting: k</code>. Используйте <code>ArrayDeque</code> как очередь. Пример:</p><pre><code>5\nJOIN Aruzhan\nJOIN Bolat\nNEXT\nJOIN Dana\nNEXT</code></pre><p>→ <code>Aruzhan</code>, <code>Bolat</code>, <code>Waiting: 1</code>.</p>",
    "hints": [
     "Очередь: <code>offer</code> добавляет в конец, <code>poll</code> берет из начала.",
     "В пустой очереди <code>poll()</code> возвращает <code>null</code> — сначала проверьте <code>isEmpty()</code>."
    ],
    "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        ArrayDeque<String> queue = new ArrayDeque<>();\n        // обработайте команды\n    }\n}\n"
   },
   {
    "title": "Подъем по лестнице",
    "prompt": "<p>На лестнице <code>n</code> ступеней (1 ≤ n ≤ 90). За один шаг можно подняться на 1 или на 2 ступени. Сколькими способами можно подняться на верх? DP: <code>dp[i] = dp[i − 1] + dp[i − 2]</code>, тип <code>long</code>. Пример: <code>4</code> → <code>5</code>.</p>",
    "hints": [
     "Последний шаг был либо на 1 ступень, либо на 2: <code>dp[i] = dp[i - 1] + dp[i - 2]</code>.",
     "Начальные значения: <code>dp[0] = 1</code>, <code>dp[1] = 1</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long[] dp = new long[n + 2];\n        // заполните таблицу dp\n        System.out.println(dp[n]);\n    }\n}\n"
   },
   {
    "title": "Клавиша удаления",
    "prompt": "<p>На входе одна строка: латинские буквы и знак <code>#</code>. <code>#</code> — это Backspace: он удаляет последнюю напечатанную букву (если удалять нечего, ничего не происходит). В конце выведите текст, оставшийся на экране; если он пуст, выведите <code>EMPTY</code>. В качестве стека используйте <code>StringBuilder</code> или <code>ArrayDeque</code>. Пример: <code>Alm#maty##y</code> → <code>Almay</code>.</p>",
    "hints": [
     "Буква — <code>append</code>, <code>#</code> — <code>deleteCharAt(sb.length() - 1)</code>.",
     "Перед удалением проверьте <code>sb.length() &gt; 0</code>."
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // при встрече # удалите последний символ\n        System.out.println(sb.toString());\n    }\n}\n"
   },
   {
    "title": "Самый выгодный период",
    "prompt": "<p>На входе <code>n</code>, затем прибыль магазина за <code>n</code> дней (может быть отрицательной). Выведите сумму самого выгодного непрерывного периода (не менее одного дня). Алгоритм Кадане, O(n): <code>cur = max(a[i], cur + a[i])</code>. Пример: <code>8</code> / <code>-2 1 -3 4 -1 2 1 -5</code> → <code>6</code>.</p>",
    "hints": [
     "<code>cur</code> — лучший период, заканчивающийся в этот день: либо начинаем заново, либо продолжаем предыдущий.",
     "Если все числа отрицательные, ответ — самый большой одиночный элемент; поэтому <code>best</code> берите не 0, а первый элемент."
    ]
   },
   {
    "title": "Ждать более теплого дня",
    "prompt": "<p>На входе <code>n</code>, затем температуры <code>n</code> дней. Для каждого дня выведите в одну строку через пробел, сколько дней нужно ждать до <b>более теплого</b> дня; если такого дня нет, выведите <code>0</code>. Решите за O(n) с помощью монотонного стека (<code>ArrayDeque&lt;Integer&gt;</code>, индексы). Пример: <code>8</code> / <code>73 74 75 71 69 72 76 73</code> → <code>1 1 4 2 1 1 0 0</code>.</p>",
    "hints": [
     "В стеке хранятся индексы дней, для которых ответ еще неизвестен (их температуры убывают).",
     "Если новый день теплее дня на вершине стека, снимите его со стека (<code>pop</code>) и запишите ответ как <code>i - j</code>."
    ],
    "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] t = new int[n];\n        for (int i = 0; i < n; i++) t[i] = sc.nextInt();\n        int[] ans = new int[n];\n        // монотонный стек\n    }\n}\n"
   },
   {
    "title": "Первая позиция ≥ x",
    "prompt": "<p>На входе <code>n</code>, затем <code>n</code> чисел, отсортированных по возрастанию (могут повторяться), затем <code>q</code>, и <code>q</code> запросов <code>x</code>. Для каждого запроса выведите наименьший индекс (с 0), на котором <code>a[i] ≥ x</code>; если такого элемента нет, выведите <code>n</code>. Напишите собственный бинарный поиск (lower bound). Пример: <code>5</code> / <code>1 3 3 3 8</code> / <code>3</code> / <code>3 4 9</code> → <code>1</code>, <code>4</code>, <code>5</code>.</p>",
    "hints": [
     "Отрезок <code>[lo, hi)</code>, в начале <code>hi = n</code>. Если <code>a[mid] &lt; x</code>, то <code>lo = mid + 1</code>, иначе <code>hi = mid</code>.",
     "Цикл останавливается, когда <code>lo == hi</code> — это и есть ответ."
    ]
   },
   {
    "title": "Количество островов",
    "prompt": "<p>На входе <code>r c</code>, затем <code>r</code> строк: <code>#</code> — суша, <code>.</code> — вода. Клетки суши, соединенные по четырем направлениям (вверх, вниз, влево, вправо), образуют один остров. Выведите в одну строку количество островов и площадь (количество клеток) самого большого острова. Для каждого нового острова запускайте BFS (<code>ArrayDeque&lt;int[]&gt;</code>). Пример:</p><pre><code>4 5\n##..#\n#...#\n..#..\n....#</code></pre><p>→ <code>4 3</code>. Если островов нет, выведите <code>0 0</code>.</p>",
    "hints": [
     "Обойдите все клетки; если нашли еще не посещенный <code>#</code> — это новый остров: запустите BFS и отметьте весь остров в <code>seen</code>.",
     "Перед переходом к соседу ВСЕГДА проверяйте границы: на этой платформе выход за пределы массива не проверяется автоматически."
    ],
    "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        // BFS из каждой новой клетки суши\n    }\n}\n"
   },
   {
    "title": "Наибольшая общая подпоследовательность",
    "prompt": "<p>На входе два слова <code>a</code> и <code>b</code> (длина ≤ 300). Выведите длину наибольшей общей подпоследовательности (LCS): последовательности, которая сохраняет порядок букв и получается удалением некоторых букв, но не обязательно непрерывной. DP: <code>dp[i][j]</code> — LCS первых <code>i</code> букв <code>a</code> и первых <code>j</code> букв <code>b</code>. Пример: <code>abcde ace</code> → <code>3</code>.</p>",
    "hints": [
     "Если буквы совпадают, <code>dp[i][j] = dp[i - 1][j - 1] + 1</code>.",
     "Если не совпадают, пропускаем одну из них: <code>Math.max(dp[i - 1][j], dp[i][j - 1])</code>. Размер таблицы — <code>(n + 1) × (m + 1)</code>.</p>"
    ],
    "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        // таблица dp\n    }\n}\n"
   }
  ]
 }
} });
