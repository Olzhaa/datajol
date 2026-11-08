// cpp practice tasks: Russian text. Code, solutions and checks are in content/practice/cpp.js.
DJ.i18n.patch({ lessons: {
 "cp-1": {
  "pr": [
   {
    "title": "Сумма трёх чисел",
    "prompt": "<p>Даны три целых числа. Выведите их сумму. Например, <code>2 5 -1</code> → <code>6</code>.</p>",
    "hints": [
     "<code>cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;</code> считывает сразу три числа."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    // прочитайте три числа и выведите их сумму\n    return 0;\n}\n"
   },
   {
    "title": "Город проживания",
    "prompt": "<p>Дано одно слово — название города. Выведите строку <code>Мен &lt;қала&gt; қаласында тұрамын.</code>, в которой вместо части в угловых скобках стоит название города. Например, <code>Astana</code> → <code>Мен Astana қаласында тұрамын.</code></p>",
    "hints": [
     "Сначала <code>cin &gt;&gt; city;</code>, затем соедините текст и переменную через <code>&lt;&lt;</code>."
    ]
   },
   {
    "title": "Периметр прямоугольника",
    "prompt": "<p>Даны длина <code>a</code> и ширина <code>b</code> прямоугольника (целые числа). Выведите его периметр: <code>2 * (a + b)</code>. Например, <code>3 4</code> → <code>14</code>.</p>",
    "hints": [
     "Не забудьте скобки: <code>2 * a + b</code> даёт другой результат."
    ]
   },
   {
    "title": "Покупка и сдача",
    "prompt": "<p>В магазине один товар стоит <code>price</code> тенге, купили <code>qty</code> штук, а покупатель дал <code>paid</code> тенге (гарантируется, что <code>paid</code> достаточно). В первую строку выведите общую сумму, во вторую — сдачу. Например, <code>450 3 2000</code> → <code>1350</code> и <code>650</code>.</p>",
    "hints": [
     "Общую сумму сохраните в переменную <code>int total</code>, а сдачу вычислите как <code>paid - total</code>."
    ]
   },
   {
    "title": "Возраст в следующем году",
    "prompt": "<p>Даны имя человека (одно слово) и его возраст. Выведите фразу <code>&lt;аты&gt; келесі жылы &lt;жас+1&gt; жаста болады.</code> Например, <code>Dana 19</code> → <code>Dana келесі жылы 20 жаста болады.</code></p>",
    "hints": [
     "Прямо внутри <code>cout</code> можно написать <code>age + 1</code>."
    ]
   },
   {
    "title": "Квадрат и куб",
    "prompt": "<p>Дано целое число <code>n</code> (|n| ≤ 1000). В первую строку выведите квадрат <code>n</code>, во вторую — куб. Например, <code>3</code> → <code>9</code> и <code>27</code>.</p>",
    "hints": [
     "Куб — это <code>n * n * n</code>."
    ]
   },
   {
    "title": "Проезд на автобусе",
    "prompt": "<p>Одна поездка стоит <code>p</code> тенге, студент ездит <code>k</code> раз в день и учится <code>d</code> дней. На карте <code>b</code> тенге. В первую строку выведите всю сумму за проезд (<code>p * k * d</code>), во вторую — сумму, которая останется на карте (может быть отрицательной). Например, <code>90 2 5 1000</code> → <code>900</code> и <code>100</code>.</p>",
    "hints": [
     "Считайте все четыре числа одним <code>cin</code>.",
     "Остаток — <code>b - total</code>."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int p, k, d, b;\n    // прочитайте входные данные и выведите две строки\n    return 0;\n}\n"
   },
   {
    "title": "Чек покупки",
    "prompt": "<p>Даны название товара (одно слово), цена и количество. Выведите строку чека в формате <code>&lt;атауы&gt; x &lt;саны&gt; = &lt;сомасы&gt; тг</code>. Например, <code>Nan 180 3</code> → <code>Nan x 3 = 540 тг</code>.</p>",
    "hints": [
     "Пробелы выведите внутри текста: <code>\" x \"</code>, <code>\" = \"</code>."
    ]
   }
  ]
 },
 "cp-2": {
  "pr": [
   {
    "title": "Секунды в минуты",
    "prompt": "<p>Дано количество секунд <code>s</code> (неотрицательное). Выведите его в виде <code>&lt;минут&gt; мин &lt;секунд&gt; сек</code>. Например, <code>135</code> → <code>2 мин 15 сек</code>.</p>",
    "hints": [
     "Минуты — <code>s / 60</code> (целочисленное деление), оставшиеся секунды — <code>s % 60</code>."
    ]
   },
   {
    "title": "Цельсий в Фаренгейт",
    "prompt": "<p>Дана температура в градусах Цельсия (дробное число). Переведите её в градусы Фаренгейта и выведите с одним знаком после десятичной точки: <code>F = C * 9 / 5 + 32</code>. Например, <code>-12.5</code> → <code>9.5</code>.</p>",
    "hints": [
     "<code>c</code> — double, поэтому <code>c * 9 / 5</code> считается как дробное число.",
     "<code>fixed &lt;&lt; setprecision(1)</code>"
    ]
   },
   {
    "title": "Последняя цифра",
    "prompt": "<p>Дано неотрицательное целое число. Выведите его последнюю цифру. Например, <code>2025</code> → <code>5</code>.</p>",
    "hints": [
     "Остаток от деления на 10 — это последняя цифра."
    ]
   },
   {
    "title": "Большое произведение",
    "prompt": "<p>В одной области Казахстана живут <code>a</code> семей, каждая семья платит за коммунальные услуги <code>b</code> тенге в год (1 ≤ a, b ≤ 1 000 000). Выведите общую сумму. Результат может не поместиться в тип <code>int</code>.</p>",
    "hints": [
     "Тип <code>int</code> хранит значения примерно до 2.1 млрд.",
     "Сделайте переменные типа <code>long long</code>."
    ]
   },
   {
    "title": "Средняя оценка из трёх",
    "prompt": "<p>Даны три оценки ученика (целые числа). Выведите среднюю оценку с двумя знаками после десятичной точки. Например, <code>5 4 4</code> → <code>4.33</code>.</p>",
    "hints": [
     "<code>/ 3</code> выполняет целочисленное деление; используйте <code>/ 3.0</code> или <code>static_cast&lt;double&gt;</code>."
    ]
   },
   {
    "title": "Тенге и тиын",
    "prompt": "<p>Сумма задана в тиынах (1 тенге = 100 тиын, число может достигать 10<sup>12</sup>). Выведите её в виде <code>&lt;теңге&gt; теңге &lt;тиын&gt; тиын</code>. Например, <code>150075</code> → <code>1500 теңге 75 тиын</code>.</p>",
    "hints": [
     "Число большое: используйте <code>long long</code>.",
     "Тенге — <code>t / 100</code>, тиын — <code>t % 100</code>."
    ]
   },
   {
    "title": "Бензин для поездки",
    "prompt": "<p>Дана длина поездки <code>km</code> (целое число), расход машины на 100 км — <code>rate</code> литров (дробное число), цена литра бензина — <code>price</code> тенге (целое число). В первую строку выведите нужное количество бензина, во вторую — общую стоимость; оба числа с двумя знаками после десятичной точки. Например, <code>1200 7.5 245</code> → <code>90.00</code> и <code>22050.00</code>.</p>",
    "hints": [
     "<code>km / 100</code> — целочисленное деление, для 150 км даст 1. Сначала вычислите <code>km * rate</code>.",
     "Если один раз задать <code>fixed &lt;&lt; setprecision(2)</code>, он действует и на последующие выводы."
    ]
   },
   {
    "title": "Формат времени",
    "prompt": "<p>Дано количество секунд <code>s</code> (0 ≤ s &lt; 360 000). Выведите его в формате <code>H:MM:SS</code>: минуты и секунды всегда двумя цифрами. Например, <code>3725</code> → <code>1:02:05</code>.</p>",
    "hints": [
     "Минуты — <code>s % 3600 / 60</code>.",
     "Выведите две цифры отдельно: десятки — <code>m / 10</code>, единицы — <code>m % 10</code>."
    ]
   }
  ]
 },
 "cp-3": {
  "pr": [
   {
    "title": "Длина слова",
    "prompt": "<p>Дано одно слово из латинских букв. Выведите его длину. Например, <code>Karaganda</code> → <code>9</code>.</p>",
    "hints": [
     "<code>w.size()</code> возвращает количество символов (для латинских букв)."
    ]
   },
   {
    "title": "Первая и последняя буква",
    "prompt": "<p>Дано слово на латинице. Выведите его первую и последнюю букву через пробел. Например, <code>Almaty</code> → <code>A y</code>.</p>",
    "hints": [
     "Индекс последнего символа — <code>w.size() - 1</code>."
    ]
   },
   {
    "title": "Заглавная первая буква",
    "prompt": "<p>Дано слово, написанное строчными латинскими буквами. Выведите его, сделав первую букву заглавной. Например, <code>turkistan</code> → <code>Turkistan</code>.</p>",
    "hints": [
     "Строку <code>string</code> можно изменять: <code>w[0] = toupper(w[0]);</code>"
    ]
   },
   {
    "title": "Домен почты",
    "prompt": "<p>Дан адрес электронной почты (ровно один символ <code>@</code>). Выведите часть после символа <code>@</code>, то есть домен. Например, <code>aida@mail.kz</code> → <code>mail.kz</code>.</p>",
    "hints": [
     "<code>email.find(\"@\")</code> вернёт позицию символа.",
     "<code>substr(pos)</code> — от <code>pos</code> до конца строки."
    ]
   },
   {
    "title": "Сумма цифр (строка)",
    "prompt": "<p>Длинное число дано строкой (до 100 цифр, оно может не поместиться в <code>long long</code>). Выведите сумму его цифр. Например, <code>98765</code> → <code>35</code>.</p>",
    "hints": [
     "<code>for (char c : num)</code> перебирает каждую цифру.",
     "Превратите символ в число: <code>c - '0'</code>."
    ]
   },
   {
    "title": "Адрес и квартира",
    "prompt": "<p>В первой строке дан номер квартиры (целое число), во второй — полный адрес с пробелами. Выведите строку <code>&lt;мекенжай&gt;, &lt;нөмір&gt;-пәтер</code>. Например, <code>12</code> и <code>Abai dangyly 150</code> → <code>Abai dangyly 150, 12-пәтер</code>.</p>",
    "hints": [
     "<code>cin &gt;&gt; flat</code> оставляет в конце строки символ <code>\\n</code>.",
     "Поставьте <code>cin.ignore();</code> между ними."
    ]
   },
   {
    "title": "Инициалы имени",
    "prompt": "<p>В одной строке даны несколько слов на латинице, разделённых одним пробелом. Выведите первую букву каждого слова заглавной и поставьте после неё точку. Например, <code>nursultan abishuly nazarov</code> → <code>N.A.N.</code></p>",
    "hints": [
     "Переменная <code>bool start</code> должна хранить «следующий символ — начало нового слова».",
     "Увидев пробел, присвойте <code>start = true</code>; иначе, если <code>start</code> истинно, добавьте букву."
    ]
   },
   {
    "title": "Скрыть номер телефона",
    "prompt": "<p>Дан номер телефона (без пробелов, длиной не меньше 7). Оставьте первые 4 и последние 2 символа, а остальные замените знаком <code>*</code>. Например, <code>+77011234567</code> → <code>+770******67</code>.</p>",
    "hints": [
     "Чтобы считать позицию символа, увеличивайте переменную <code>int i</code> на каждом шаге.",
     "Можно решить и через <code>substr</code>: начало, звёздочки, конец."
    ]
   }
  ]
 },
 "cp-4": {
  "pr": [
   {
    "title": "Чётное или нечётное",
    "prompt": "<p>Дано целое число (оно может быть отрицательным). Если оно чётное, выведите <code>Жұп</code>, если нечётное — <code>Тақ</code>.</p>",
    "hints": [
     "У отрицательного нечётного числа <code>n % 2</code> равно <code>-1</code>, поэтому проверка <code>== 0</code> надёжна."
    ]
   },
   {
    "title": "Результат экзамена",
    "prompt": "<p>Дан балл за экзамен (0–100). Если балл 50 или выше, выведите <code>Өтті</code>, иначе — <code>Өтпеді</code>.</p>",
    "hints": [
     "Обратите внимание на границу: 50 — это <code>Өтті</code>."
    ]
   },
   {
    "title": "Выбор дешевле",
    "prompt": "<p>Даны цены одного и того же товара в двух магазинах. Выведите меньшую цену; если цены равны, выведите эту цену. Попробуйте тернарный оператор <code>? :</code>.</p>",
    "hints": [
     "<code>(a &lt; b) ? a : b</code>"
    ]
   },
   {
    "title": "Высокосный год",
    "prompt": "<p>Дан год. Если он високосный, выведите <code>Иә</code>, иначе — <code>Жоқ</code>. Правило: год делится на 4 и не делится на 100, <b>или</b> делится на 400.</p>",
    "hints": [
     "Объедините <code>&amp;&amp;</code> и <code>||</code>, не забывайте про скобки."
    ]
   },
   {
    "title": "Простой калькулятор",
    "prompt": "<p>В одной строке дано <code>a op b</code>: <code>a</code> и <code>b</code> — целые числа, <code>op</code> — один из символов <code>+ - * /</code>. Выведите результат (<code>/</code> — целочисленное деление). Если делить на ноль или операция неизвестна, выведите <code>Қате</code>. Используйте <code>switch</code>.</p>",
    "hints": [
     "<code>cin &gt;&gt; a &gt;&gt; op &gt;&gt; b;</code> — так как <code>op</code> имеет тип char, читается один символ.",
     "В конце каждого <code>case</code> ставьте <code>break</code>."
    ]
   },
   {
    "title": "Оценка по пятибалльной шкале",
    "prompt": "<p>Дан балл за тест. 90–100 → <code>5</code>, 75–89 → <code>4</code>, 50–74 → <code>3</code>, 0–49 → <code>2</code>. Если балл меньше 0 или больше 100, выведите <code>Қате</code>.</p>",
    "hints": [
     "Сначала проверьте, что балл корректен, затем пройдите цепочку <code>else if</code> сверху вниз."
    ]
   },
   {
    "title": "Вид треугольника",
    "prompt": "<p>Даны три стороны треугольника (целые положительные числа). Если такого треугольника не существует (сумма любых двух сторон должна быть строго больше третьей), выведите <code>Үшбұрыш емес</code>; если все три стороны равны — <code>Тең қабырғалы</code>; если равны только две — <code>Тең бүйірлі</code>; иначе — <code>Әртүрлі қабырғалы</code>.</p>",
    "hints": [
     "Сначала проверьте, существует ли треугольник: достаточно, чтобы одно из трёх условий нарушалось (<code>||</code>).",
     "Равнобедренный: <code>a == b || b == c || a == c</code>."
    ]
   },
   {
    "title": "Тариф такси",
    "prompt": "<p>Стоимость такси: даны расстояние <code>km</code> (целое число), буква тарифа и признак ночи (<code>1</code> — ночь, <code>0</code> — день). Тарифы: <code>E</code> — 500 + 120·km, <code>C</code> — 800 + 180·km, <code>B</code> — 1500 + 300·km. Ночью цена выше на 20% (<code>баға * 12 / 10</code>, целочисленное деление). Если тариф неизвестен, выведите <code>Қате</code>. Выберите тариф через <code>switch</code>. Например, <code>10 E 1</code> → <code>2040</code>.</p>",
    "hints": [
     "Внутри <code>switch</code> считайте только базовую цену, а ночную надбавку добавьте после него.",
     "Неизвестный тариф ловит <code>default</code>: сделайте переменную <code>bool ok</code> ложной."
    ]
   }
  ]
 },
 "cp-5": {
  "pr": [
   {
    "title": "Таблица умножения",
    "prompt": "<p>Дано число <code>n</code>. Выведите его таблицу умножения от 1 до 10: в каждой строке <code>n x i = n·i</code>. Например, для <code>3</code> первая строка — <code>3 x 1 = 3</code>, последняя — <code>3 x 10 = 30</code>.</p>",
    "hints": [
     "<code>for (int i = 1; i &lt;= 10; i++)</code>"
    ]
   },
   {
    "title": "Чётные числа по порядку",
    "prompt": "<p>Дано <code>n</code> (n ≥ 2). Выведите все чётные числа от 2 до <code>n</code> в одну строку через пробел. Например, <code>9</code> → <code>2 4 6 8</code>.</p>",
    "hints": [
     "Шаг сделайте равным 2: <code>i += 2</code>.",
     "Лишний пробел в конце строки при проверке не учитывается."
    ]
   },
   {
    "title": "Количество положительных",
    "prompt": "<p>Дневные температуры (целые числа) вводятся, пока не закончится ввод. Выведите количество значений, строго больших 0.</p>",
    "hints": [
     "<code>while (cin &gt;&gt; x)</code> читает до конца ввода."
    ]
   },
   {
    "title": "Количество цифр",
    "prompt": "<p>Дано неотрицательное целое число <code>n</code> (оно помещается в <code>long long</code>). Посчитайте циклом, сколько в нём цифр. <code>0</code> — это одна цифра.</p>",
    "hints": [
     "Цикл <code>while</code> для <code>n = 0</code> ни разу не выполнится.",
     "<code>do { ... } while (n &gt; 0);</code> выполнится хотя бы один раз."
    ]
   },
   {
    "title": "Цель накоплений",
    "prompt": "<p>На депозите <code>s</code> тенге, каждый год к нему добавляется <code>p</code>% (проценты считаются целочисленным делением: <code>s += s * p / 100</code>). Сколько лет нужно, чтобы сумма стала не меньше <code>target</code>? Например, <code>100000 10 150000</code> → <code>5</code>. (s ≥ 1, p ≥ 1, все значения помещаются в <code>long long</code>.)</p>",
    "hints": [
     "Пока сумма меньше цели, выполняйте цикл <code>while</code>.",
     "Если сумма уже достаточна в начале, ответ 0."
    ]
   },
   {
    "title": "Проверка простого числа",
    "prompt": "<p>Дано целое число <code>n</code> (1 ≤ n ≤ 10<sup>9</sup>). Если число простое, выведите <code>YES</code>, иначе — <code>NO</code>. 1 — не простое число. Проверяйте делители, пока <code>i * i &lt;= n</code>, а если делитель найден, используйте <code>break</code>.</p>",
    "hints": [
     "Если у <code>n</code> есть делитель, то один из них не превосходит √n.",
     "<code>i * i</code> может быть большим — используйте <code>long long</code>."
    ]
   },
   {
    "title": "Пирамида из чисел",
    "prompt": "<p>Дано <code>n</code>. Выведите пирамиду из <code>n</code> строк: в строке с номером <code>i</code> числа сначала растут от 1 до <code>i</code>, затем убывают обратно до 1, разделённые пробелами. Например, <code>n = 3</code>:</p><pre>1\n1 2 1\n1 2 3 2 1</pre>",
    "hints": [
     "В каждой строке два вложенных цикла: первый идёт от 1 до i, второй — от i−1 до 1."
    ]
   },
   {
    "title": "Самое долгое потепление",
    "prompt": "<p>Дневные температуры вводятся, пока не закончится ввод (дано хотя бы одно число). Выведите длину самой длинной цепочки подряд идущих дней, в которой каждый следующий день <b>строго теплее</b> предыдущего. Например, <code>1 3 5 2 4 6 8 1</code> → <code>4</code> (<code>2 4 6 8</code>).</p>",
    "hints": [
     "Предыдущее значение храните в переменной <code>prev</code>.",
     "Текущая длина цепочки <code>cur</code>: если становится теплее, она растёт, иначе сбрасывается до 1; наибольшее значение записывайте в <code>best</code>."
    ]
   }
  ]
 },
 "cp-6": {
  "pr": [
   {
    "title": "Функция куба",
    "prompt": "<p>Напишите функцию <code>long long cube(int x)</code>: она возвращает куб <code>x</code> (|x| ≤ 100 000, результат может не поместиться в <code>int</code>). <code>main</code> уже готов.</p>",
    "hints": [
     "<code>x * x * x</code> вычисляется в int и переполняется. Сначала создайте <code>long long v = x;</code>."
    ]
   },
   {
    "title": "Аргумент по умолчанию",
    "prompt": "<p>Напишите функцию <code>void greet(string name, string greeting = \"Сәлем\")</code>: она выводит <code>&lt;greeting&gt;, &lt;name&gt;!</code>. <code>main</code> готов: он читает имя и слово приветствия и вызывает функцию сначала с одним аргументом, затем с двумя. Например, <code>Ali Salem</code> → <code>Сәлем, Ali!</code> и <code>Salem, Ali!</code></p>",
    "hints": [
     "Внутри функции нужна только строка с <code>cout</code>."
    ],
    "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid greet(string name, string greeting = \"Сәлем\") {\n    // выведите\n}\n\nint main() {\n    string name, word;\n    cin >> name >> word;\n    greet(name);\n    greet(name, word);\n    return 0;\n}\n"
   },
   {
    "title": "Проверка чётности",
    "prompt": "<p>Напишите функцию <code>bool isEven(int n)</code>: если число чётное, она возвращает <code>true</code> (отрицательные числа тоже бывают). <code>main</code> готов: он читает числа до конца ввода и выводит количество чётных.</p>",
    "hints": [
     "<code>return n % 2 == 0;</code> — само сравнение уже имеет тип bool."
    ]
   },
   {
    "title": "min и max через ссылки",
    "prompt": "<p>Напишите функцию <code>void minMax(int a, int b, int c, int&amp; mn, int&amp; mx)</code>: она записывает наименьшее из трёх чисел в <code>mn</code>, а наибольшее — в <code>mx</code>. <code>main</code> готов. Например, <code>5 -2 9</code> → <code>-2 9</code>.</p>",
    "hints": [
     "В стартере <code>mn</code> и <code>mx</code> передаются как копии — добавьте <code>&amp;</code>.",
     "Сначала присвойте <code>mn = a</code>, затем сравните с <code>b</code> и <code>c</code>."
    ]
   },
   {
    "title": "Перегрузка функции area",
    "prompt": "<p>Напишите три функции с одним именем <code>area</code>: <code>int area(int side)</code> — квадрат, <code>int area(int w, int h)</code> — прямоугольник, <code>double area(double r)</code> — круг (π = 3.14159). <code>main</code> готов: он читает команды <code>S a</code>, <code>R w h</code>, <code>C r</code> и выводит площадь (для круга — с 2 знаками после десятичной точки).</p>",
    "hints": [
     "Компилятор выбирает нужную функцию по количеству и типам аргументов."
    ],
    "starter": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint area(int side) {\n    return 0;\n}\n\n// напишите ещё две функции area\nint area(int w, int h) {\n    return 0;\n}\n\ndouble area(double r) {\n    return 0;\n}\n\nint main() {\n    char t;\n    while (cin >> t) {\n        if (t == 'S') { int a; cin >> a; cout << area(a) << endl; }\n        else if (t == 'R') { int w, h; cin >> w >> h; cout << area(w, h) << endl; }\n        else { double r; cin >> r; cout << fixed << setprecision(2) << area(r) << endl; }\n    }\n    return 0;\n}\n"
   },
   {
    "title": "Подсчёт символа",
    "prompt": "<p>Напишите функцию <code>int countChar(const string&amp; text, char c)</code>: она возвращает, сколько раз символ <code>c</code> встречается в строке <code>text</code>. <code>main</code> готов: в первой строке символ, во второй — текст.</p>",
    "hints": [
     "Перебирайте символы через <code>for (char x : text)</code> и сравнивайте каждый с <code>c</code>."
    ]
   },
   {
    "title": "Число наоборот",
    "prompt": "<p>Напишите две функции: <code>int reverseNum(int n)</code> — возвращает число с цифрами в обратном порядке для неотрицательного числа (<code>1200</code> → <code>21</code>); <code>bool isPalindrome(int n)</code> — с помощью <code>reverseNum</code> проверяет, является ли число палиндромом. <code>main</code> готов: для каждого числа он выводит строку <code>n кері YES/NO</code>.</p>",
    "hints": [
     "Цикл: <code>r = r * 10 + n % 10; n /= 10;</code>",
     "Палиндром — это число, равное своему обратному."
    ]
   },
   {
    "title": "Сокращение дроби",
    "prompt": "<p>Напишите две функции: <code>int gcd(int a, int b)</code> — наибольший общий делитель двух положительных чисел (алгоритм Евклида: пока <code>b</code> не равно нулю, <code>(a, b) → (b, a % b)</code>); <code>void reduce(int&amp; num, int&amp; den)</code> — делит числитель и знаменатель дроби на их НОД. <code>main</code> готов. Например, <code>12 18</code> → <code>2/3</code>.</p>",
    "hints": [
     "Параметры <code>reduce</code> должны быть ссылками, иначе <code>main</code> не увидит изменений.",
     "Евклид: <code>while (b != 0) { int t = a % b; a = b; b = t; }</code>"
    ]
   }
  ]
 },
 "cp-7": {
  "pr": [
   {
    "title": "Самая дешёвая и самая дорогая",
    "prompt": "<p>Дано <code>n</code>, затем цены <code>n</code> товаров. Выведите наименьшую и наибольшую цену через пробел. Например, <code>4</code> / <code>500 120 990 300</code> → <code>120 990</code>.</p>",
    "hints": [
     "В качестве начального значения возьмите <code>a[0]</code>, затем сравните с ним все элементы."
    ]
   },
   {
    "title": "Чётные элементы",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> целых чисел. Выведите чётные элементы в исходном порядке в одну строку через пробел. Если чётных чисел нет, выведите <code>NONE</code>.</p>",
    "hints": [
     "Собирайте чётные числа в новый вектор через <code>push_back</code>.",
     "Если вектор пуст, выведите <code>NONE</code>."
    ]
   },
   {
    "title": "Недельные осадки",
    "prompt": "<p>Даны количества осадков (мм, целые числа) за 7 дней недели. В первую строку выведите общее количество за неделю, во вторую — номер дня с наибольшими осадками (1–7; если таких дней несколько, то самый ранний). Можно использовать массив <code>int a[7]</code>.</p>",
    "hints": [
     "Сохраняйте <b>индекс</b> наибольшего значения: <code>if (a[i] &gt; a[best]) best = i;</code>",
     "Нумерация дней начинается с 1: <code>best + 1</code>."
    ]
   },
   {
    "title": "Циклический сдвиг",
    "prompt": "<p>Даны <code>n</code> и <code>k</code>, затем <code>n</code> чисел. Сдвиньте массив вправо циклически на <code>k</code> шагов и выведите результат (<code>k</code> может быть больше <code>n</code>). Например, <code>5 2</code> / <code>1 2 3 4 5</code> → <code>4 5 1 2 3</code>.</p>",
    "hints": [
     "Элемент с индексом <code>i</code> в новом массиве занимает позицию <code>(i + k) % n</code>."
    ]
   },
   {
    "title": "Суммы таблицы",
    "prompt": "<p>Даны <code>n m</code>, затем таблица <code>n × m</code> (посещаемость учеников: классы × дни недели). Сначала выведите сумму каждой строки на отдельной строке, а в конце — в одной строке через пробел сумму каждого столбца. Используйте <code>vector&lt;vector&lt;int&gt;&gt;</code>.</p>",
    "hints": [
     "Суммы столбцов собирайте в <code>vector&lt;int&gt; col(m, 0)</code>."
    ],
    "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g(n, vector<int>(m));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) cin >> g[i][j];\n    // суммы строк и столбцов\n    return 0;\n}\n"
   },
   {
    "title": "Повторяющиеся значения",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> чисел от 0 до 100 (баллы учеников). Выведите в порядке возрастания в одну строку через пробел значения, которые встречаются больше одного раза. Если таких нет, выведите <code>NONE</code>. Подсказка: <code>vector&lt;int&gt; cnt(101, 0)</code> — массив-счётчик.</p>",
    "hints": [
     "Прочитайте каждое значение и выполните <code>cnt[x]++</code>.",
     "Затем пройдите по 0..100 и выведите значения, для которых <code>cnt[v] &gt; 1</code>."
    ]
   },
   {
    "title": "Сумма на отрезке",
    "prompt": "<p>Даны доходы за <code>n</code> дней (в тенге) и <code>q</code> запросов. Для каждого запроса <code>l r</code> (нумерация с 1, l ≤ r) выведите в отдельной строке сумму доходов с дня <code>l</code> по день <code>r</code>. n, q ≤ 100 000, поэтому заранее вычислите префиксные суммы (<code>long long</code>): <code>pre[i]</code> — сумма доходов первых <code>i</code> дней.</p><p>Ввод: <code>n q</code>, затем <code>n</code> чисел, затем <code>q</code> строк.</p>",
    "hints": [
     "<code>pre[i] = pre[i - 1] + a[i]</code>, <code>pre[0] = 0</code>.",
     "Ответ — <code>pre[r] - pre[l - 1]</code>."
    ]
   },
   {
    "title": "Поворот матрицы",
    "prompt": "<p>Дано <code>n</code>, затем матрица <code>n × n</code>. Поверните её на 90° по часовой стрелке и выведите (каждая строка — числа через пробел). Например:</p><pre>1 2      3 1\n3 4  →   4 2</pre>",
    "hints": [
     "Строка <code>i</code> новой матрицы — это <code>i</code>-й столбец старой, прочитанный снизу вверх.",
     "То есть <code>b[i][j] = a[n - 1 - j][i]</code>."
    ]
   }
  ]
 },
 "cp-8": {
  "pr": [
   {
    "title": "Удвоение через указатель",
    "prompt": "<p>Напишите функцию <code>void doubleIt(int* p)</code>: она удваивает значение, на которое указывает указатель. <code>main</code> готов: он читает число, вызывает <code>doubleIt(&amp;x)</code> и выводит <code>x</code>.</p>",
    "hints": [
     "<code>*p</code> — это само значение по адресу: <code>*p *= 2;</code>"
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nvoid doubleIt(int* p) {\n    // измените значение через *p\n}\n\nint main() {\n    int x;\n    cin >> x;\n    doubleIt(&x);\n    cout << x << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Обмен через указатели",
    "prompt": "<p>Напишите функцию <code>void swapPtr(int* a, int* b)</code>: она меняет местами значения, на которые указывают два указателя. <code>main</code> готов. Например, <code>3 8</code> → <code>8 3</code>.</p>",
    "hints": [
     "В стартере меняются только копии указателей; значения нужно менять через <code>*a</code> и <code>*b</code>."
    ]
   },
   {
    "title": "Сумма динамического массива",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> целых чисел. Создайте массив в куче через <code>new int[n]</code>, считайте числа, выведите их сумму и освободите память через <code>delete[]</code>.</p>",
    "hints": [
     "<code>int* arr = new int[n];</code> — дальше <code>arr[i]</code> работает как обычный массив.",
     "В конце <code>delete[] arr;</code>"
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // создайте массив через new int[n]\n    cout << 0 << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Адрес наименьшего элемента",
    "prompt": "<p>Напишите функцию <code>int* findMin(int* arr, int n)</code>: она возвращает указатель на наименьший элемент массива (если таких несколько, то на первый). <code>main</code> готов: он выводит значение и его индекс (<code>p - arr</code>).</p>",
    "hints": [
     "<code>int* best = arr;</code> — начните с первого элемента.",
     "Если найден меньший элемент: <code>best = &amp;arr[i];</code>"
    ]
   },
   {
    "title": "Переворот массива на месте",
    "prompt": "<p>Напишите функцию <code>void reverseArr(int* a, int n)</code>: она переворачивает элементы в том же массиве, не создавая нового (меняйте местами первый и последний, второй и предпоследний и т.д.). <code>main</code> готов.</p>",
    "hints": [
     "Проходите только до середины: <code>i &lt; n / 2</code>.",
     "Меняйте местами элементы <code>a[i]</code> и <code>a[n - 1 - i]</code>."
    ]
   },
   {
    "title": "Указатель на самое длинное слово",
    "prompt": "<p>Напишите функцию <code>const string* longest(const vector&lt;string&gt;&amp; v)</code>: она возвращает указатель на самое длинное слово (при равенстве — на первое), а если вектор пуст, то <code>nullptr</code>. <code>main</code> готов: он выводит слово и его длину или <code>EMPTY</code>.</p>",
    "hints": [
     "Начните с <code>const string* best = nullptr;</code>.",
     "В цикле <code>&amp;w</code> — это адрес слова в векторе (<code>w</code> должна быть ссылкой)."
    ]
   },
   {
    "title": "Массив, растущий сам",
    "prompt": "<p>Числа вводятся, пока не закончится ввод. Храните их не в <code>vector</code>, а в собственном массиве в куче: сначала ёмкость <code>cap = 2</code> (<code>new int[2]</code>); когда массив заполнен, выделите новый в два раза больше, скопируйте элементы и освободите старый через <code>delete[]</code>. В конце в первой строке выведите <code>саны сыйымдылығы</code>, во второй — числа в обратном порядке (если чисел нет, вторая строка пустая).</p>",
    "hints": [
     "Когда <code>size == cap</code>: <code>new int[cap * 2]</code>, копирование, <code>delete[] data</code>, <code>data = bigger</code>.",
     "В стартере есть выход за границы массива — в браузере программа не упадёт, но ответ будет неверным."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int cap = 2, size = 0;\n    int* data = new int[cap];\n    int x;\n    while (cin >> x) {\n        // если заполнен — увеличьте\n        data[size] = x;\n        size++;\n    }\n    cout << size << \" \" << cap << endl;\n    delete[] data;\n    return 0;\n}\n"
   },
   {
    "title": "Перевод между кошельками",
    "prompt": "<p>Дано: <code>struct Wallet { string owner; long long balance; };</code>. Напишите функцию <code>bool transfer(Wallet* from, Wallet* to, long long amount)</code>: если один из указателей равен <code>nullptr</code>, сумма <code>amount ≤ 0</code> или на <code>from</code> недостаточно денег, ничего не меняйте и верните <code>false</code>; иначе переведите сумму и верните <code>true</code>. <code>main</code> готов: кошельки создаются через <code>unique_ptr</code>, затем выполняются команды <code>AB 500</code>, <code>BA 100</code>, <code>AX 50</code> (X — несуществующий кошелёк).</p>",
    "hints": [
     "Сначала проверьте <code>nullptr</code>, иначе <code>from-&gt;balance</code> прочитает пустой адрес.",
     "<code>p-&gt;balance</code> — то же самое, что <code>(*p).balance</code>."
    ]
   }
  ]
 },
 "cp-9": {
  "pr": [
   {
    "title": "Класс прямоугольника",
    "prompt": "<p>Допишите класс <code>Rect</code>: поля <code>w</code>, <code>h</code> делаются <code>private</code>; конструктор <code>Rect(int w, int h)</code> со списком инициализации; методы <code>int area() const</code> и <code>int perimeter() const</code>. <code>main</code> готов: выводит площадь и периметр.</p>",
    "hints": [
     "Список инициализации: <code>: w(w), h(h)</code> — поле(параметр)."
    ]
   },
   {
    "title": "Стоимость склада",
    "prompt": "<p>Дано <code>n</code> товаров: в каждой строке <code>атауы бағасы саны</code>. Создайте структуру <code>Product</code>, считайте товары в <code>vector&lt;Product&gt;</code> и выведите общую стоимость всех товаров на складе (сумма цена × количество, <code>long long</code>).</p>",
    "hints": [
     "Читайте поля через точку: <code>cin &gt;&gt; items[i].name &gt;&gt; items[i].price</code> ..."
    ]
   },
   {
    "title": "Длительность урока",
    "prompt": "<p>Добавьте в структуру <code>struct Time { int h, m; }</code> метод <code>int minutes() const</code>: он возвращает количество минут с начала суток (<code>h * 60 + m</code>). <code>main</code> готов: читает время начала и конца урока в формате <code>HH:MM</code> и выводит длительность в минутах. Например, <code>08:30 10:05</code> → <code>95</code>.</p>",
    "hints": [
     "Внутри метода можно напрямую обращаться к полям: <code>return h * 60 + m;</code>"
    ]
   },
   {
    "title": "Счётчик посетителей",
    "prompt": "<p>Напишите класс <code>Counter</code>, который считает посетителей музея: поле <code>count</code> объявите как <code>private</code> (конструктор ставит 0), <code>inc()</code> — увеличивает на 1, <code>dec()</code> — уменьшает на 1, но не ниже 0, <code>reset()</code> — обнуляет, <code>int get() const</code>. <code>main</code> готов: читает команды до конца ввода.</p>",
    "hints": [
     "В <code>dec</code> сначала проверьте, что <code>count &gt; 0</code>."
    ]
   },
   {
    "title": "Вход и выход из комнаты",
    "prompt": "<p>Напишите в структуре <code>Room</code> конструктор и деструктор: конструктор выводит <code>&lt;аты&gt; кірді</code>, деструктор — <code>&lt;аты&gt; шықты</code>. <code>main</code> готов: читает три имени и создаёт объекты в разных областях видимости. Порядок вывода определяют правила деструкторов.</p>",
    "hints": [
     "Деструктор — <code>~Room() { ... }</code>.",
     "При выходе из внутреннего блока <code>{ }</code> объект <code>b</code> уничтожается сразу; <code>a</code> и <code>c</code> — в конце <code>main</code>, в обратном порядке."
    ]
   },
   {
    "title": "Класс термометра",
    "prompt": "<p>Напишите класс <code>Thermo</code> для метеостанции: <code>add(int t)</code> добавляет измерение, <code>int minT() const</code>, <code>int maxT() const</code>, <code>double avg() const</code>. Храните данные в <code>private</code> <code>vector&lt;int&gt;</code>. <code>main</code> готов: читает <code>n ≥ 1</code> измерений и выводит <code>min max орташа</code> (среднее — с одним знаком после десятичной точки).</p>",
    "hints": [
     "В <code>add</code> используйте <code>data.push_back(t)</code>.",
     "Для среднего приведите сумму к <code>double</code> и разделите на <code>data.size()</code>."
    ]
   },
   {
    "title": "Класс библиотеки",
    "prompt": "<p>Напишите <code>struct Book { string title; bool taken; };</code> и класс <code>Library</code> (хранит книги в <code>private vector&lt;Book&gt;</code>): <code>add(title)</code> — добавляет новую свободную книгу; <code>bool take(title)</code> — если есть свободная книга с таким названием, берёт первую из них и возвращает <code>true</code>, иначе возвращает <code>false</code>; <code>bool giveBack(title)</code> — возвращает одну взятую книгу с таким названием и <code>true</code>, если такой нет — <code>false</code>; <code>int available() const</code> — количество свободных книг. <code>main</code> готов: обрабатывает команды <code>add X</code>, <code>take X</code>, <code>return X</code>, <code>count</code>.</p>",
    "hints": [
     "Чтобы изменить книгу, в цикле берите ссылку: <code>for (Book&amp; b : books)</code>.",
     "Как только нашли, сразу <code>return true;</code>, не трогайте следующие экземпляры."
    ]
   },
   {
    "title": "Кольцевая очередь",
    "prompt": "<p>Напишите класс <code>Queue</code> — электронную очередь поликлиники фиксированной ёмкости. Конструктор <code>Queue(int cap)</code> выделяет в куче <code>new int[cap]</code>, деструктор освобождает память через <code>delete[]</code>. <code>bool push(int x)</code> — если очередь полна, возвращает <code>false</code>; <code>bool pop(int&amp; x)</code> — если очередь пуста, возвращает <code>false</code>, иначе записывает первый элемент в <code>x</code> и удаляет его; <code>int size() const</code>. Места используются по кругу: храните поля <code>head</code> и <code>count</code>, следующее свободное место — <code>(head + count) % cap</code>. <code>main</code> готов.</p>",
    "hints": [
     "<code>push</code>: место <code>(head + count) % cap</code>, затем <code>count++</code>.",
     "<code>pop</code>: <code>x = data[head]</code>, <code>head = (head + 1) % cap</code>, <code>count--</code>. Не забудьте деструктор."
    ]
   }
  ]
 },
 "cp-10": {
  "pr": [
   {
    "title": "Равенство дробей",
    "prompt": "<p>Напишите <code>operator==</code> для <code>struct Fraction { long long num, den; };</code> (знаменатель положительный): дроби <code>1/2</code> и <code>2/4</code> считаются равными. Подсказка: <code>a/b == c/d</code> ⇔ <code>a·d == c·b</code>. <code>main</code> готов: выводит <code>YES</code> или <code>NO</code>.</p>",
    "hints": [
     "Перекрёстно перемножьте: <code>a.num * b.den == b.num * a.den</code>."
    ]
   },
   {
    "title": "Шаблон обмена",
    "prompt": "<p>Напишите шаблон функции <code>template &lt;typename T&gt; void mySwap(T&amp; a, T&amp; b)</code>, который меняет местами значения двух переменных любого типа. <code>main</code> готов: меняет местами два числа и два слова и выводит их.</p>",
    "hints": [
     "Временная переменная тоже имеет тип <code>T</code>: <code>T t = a;</code>"
    ]
   },
   {
    "title": "Вывод точки",
    "prompt": "<p>Напишите <code>ostream&amp; operator&lt;&lt;(ostream&amp; os, const Point&amp; p)</code> для <code>struct Point { int x, y; };</code>: точка выводится в виде <code>[x; y]</code>. <code>main</code> готов: читает точки до конца ввода и выводит каждую на отдельной строке.</p>",
    "hints": [
     "Пишите в <code>os</code> вместо <code>cout</code> и в конце <code>return os;</code>"
    ]
   },
   {
    "title": "Сложение дробей",
    "prompt": "<p>Напишите <code>operator+</code> и <code>operator&lt;&lt;</code> для <code>Fraction</code> (положительные дроби). Сумма должна быть сокращена (используйте готовую функцию <code>gcd</code>), вывод в виде <code>num/den</code>. Например, <code>1 6 1 3</code> → <code>1/2</code>.</p>",
    "hints": [
     "<code>a/b + c/d = (a·d + c·b) / (b·d)</code>.",
     "Разделите числитель и знаменатель на <code>gcd</code>."
    ]
   },
   {
    "title": "Шаблон класса MinMax",
    "prompt": "<p>Напишите шаблон класса <code>template &lt;typename T&gt; class MinMax</code>: <code>add(T x)</code> принимает значение, <code>getMin()</code> и <code>getMax()</code> возвращают наименьшее и наибольшее значение на данный момент (используйте только оператор <code>&lt;</code>). Не храните все значения, храните только текущие min и max. <code>main</code> готов: читает <code>n</code> чисел и <code>m</code> слов (n, m ≥ 1).</p>",
    "hints": [
     "Для первого значения присвойте <code>mn</code> и <code>mx</code> (используйте флаг <code>empty</code>).",
     "Проверка на большее тоже через <code>&lt;</code>: <code>if (mx &lt; x) mx = x;</code>"
    ]
   },
   {
    "title": "Сортировка товаров по цене",
    "prompt": "<p>Для <code>Product</code> (<code>name</code>, <code>price</code>) напишите два оператора: <code>operator&lt;</code> — сначала по возрастанию цены, при равной цене по алфавиту названия; <code>operator&lt;&lt;</code> — вывод в виде <code>атауы: баға тг</code>. <code>main</code> готов: <code>sort</code> использует ваш <code>operator&lt;</code>.</p>",
    "hints": [
     "<code>if (a.price != b.price) return a.price &lt; b.price;</code>, затем сравните названия."
    ]
   },
   {
    "title": "Операции с матрицей 2×2",
    "prompt": "<p><code>struct Mat { long long a, b, c, d; };</code> задаёт матрицу 2×2: <code>[[a, b], [c, d]]</code>. Напишите три оператора: <code>operator+</code> (поэлементно), <code>operator*</code> (матричное умножение: строка × столбец) и <code>operator&lt;&lt;</code> — вывод в виде <code>[a b; c d]</code>. <code>main</code> готов: читает две матрицы и выводит их сумму и произведение.</p>",
    "hints": [
     "Верхний левый элемент произведения: <code>x.a * y.a + x.b * y.c</code>.",
     "Верхний правый: <code>x.a * y.b + x.b * y.d</code>; нижние — аналогично, по строкам <code>c</code> и <code>d</code>."
    ]
   },
   {
    "title": "Обобщённая сумма",
    "prompt": "<p>Напишите два шаблона функций: <code>template &lt;typename T&gt; T sumAll(const vector&lt;T&gt;&amp; v)</code> — сумма всех элементов через <code>+</code> (вектор не пуст; для строк это будет склейка) и <code>template &lt;typename T&gt; int countGreater(const vector&lt;T&gt;&amp; v, T x)</code> — количество элементов, строго больших <code>x</code>. <code>main</code> готов: вызывает их для векторов <code>int</code>, <code>double</code> и <code>string</code>.</p>",
    "hints": [
     "<code>T s = 0</code> для строк не работает — начните с <code>T s = v[0];</code> и добавляйте со второго элемента.",
     "<code>x &lt; e</code> означает «<code>e</code> больше»."
    ]
   }
  ]
 },
 "cp-11": {
  "pr": [
   {
    "title": "Звуки животных",
    "prompt": "<p>В программе фермы все животные «говорят» <code>...</code>, потому что <code>Animal::sound</code> не virtual. Исправьте классы: в базовом классе — <code>virtual</code>, в производных — <code>override</code>. <code>main</code> готов: читает слова <code>dog</code>, <code>cat</code>, <code>cow</code> и выводит звук каждого животного (<code>Hav</code>, <code>Miau</code>, <code>Mo</code>).</p>",
    "hints": [
     "<code>virtual string sound() const { ... }</code>",
     "В производном классе: <code>string sound() const override { ... }</code>"
    ]
   },
   {
    "title": "Колёса по типу",
    "prompt": "<p>В абстрактном классе <code>Vehicle</code> есть <code>virtual int wheels() const = 0</code>. Напишите три производных класса: <code>Car</code> (4 колеса), <code>Bike</code> (2), <code>Truck</code> (6). <code>main</code> готов: читает слова <code>car</code>/<code>bike</code>/<code>truck</code> до конца ввода и выводит общее количество колёс.</p>",
    "hints": [
     "В каждом производном классе метод <code>wheels()</code> возвращает своё число."
    ]
   },
   {
    "title": "Роли в школе",
    "prompt": "<p>Метод <code>describe()</code> класса <code>Person</code> выводит <code>аты - рөлі</code>, а роль возвращает <code>role()</code>. Сейчас для <code>Student</code> и <code>Teacher</code> тоже выводится <code>адам</code>. Сделайте метод <code>role()</code> virtual. <code>main</code> готов: читает строки <code>S аты</code>, <code>T аты</code>, <code>P аты</code>.</p>",
    "hints": [
     "Даже если вызов идёт из метода базового класса, для <code>virtual</code>-метода выбирается версия по реальному типу объекта."
    ]
   },
   {
    "title": "Месячная зарплата",
    "prompt": "<p>Дан абстрактный класс <code>Employee</code> (<code>pay()</code> — чисто виртуальный). Напишите три производных класса: <code>FullTime(name, salary)</code> — зарплата <code>salary</code>; <code>Hourly(name, rate, hours)</code> — <code>rate · hours</code>, а каждый час сверх 160 оплачивается в 1.5 раза дороже (<code>rate * 3 / 2</code>, целочисленно); <code>Intern(name)</code> — постоянно 85000. <code>main</code> готов: выводит зарплату каждого сотрудника и общую сумму.</p><p>Строки ввода: <code>F аты айлық</code>, <code>H аты мөлшерлеме сағат</code>, <code>I аты</code>.</p>",
    "hints": [
     "Надбавка за сверхурочные: <code>(hours - 160) * (rate * 3 / 2)</code>.",
     "Заполните тело <code>pay()</code> для <code>FullTime</code> и <code>Intern</code>."
    ]
   },
   {
    "title": "Самый большой периметр",
    "prompt": "<p>В абстрактном классе <code>Shape</code> есть два чисто виртуальных метода: <code>perimeter()</code> и <code>name()</code>. Напишите три класса: <code>Square(a)</code> (название <code>Шаршы</code>), <code>Rect(w, h)</code> (<code>Тіктөртбұрыш</code>), <code>Triangle(a, b, c)</code> (<code>Үшбұрыш</code>). <code>main</code> готов: выводит название и периметр фигуры с наибольшим периметром (при равенстве — первой).</p>",
    "hints": [
     "В каждом классе конструктор со своими полями и списком инициализации."
    ],
    "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual int perimeter() const = 0;\n    virtual string name() const = 0;\n    virtual ~Shape() {}\n};\n\nclass Square : public Shape {\n    int a;\npublic:\n    Square(int a) : a(a) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"Шаршы\"; }\n};\n\n// напишите классы Rect и Triangle\nclass Rect : public Shape {\npublic:\n    Rect(int w, int h) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"\"; }\n};\n\nclass Triangle : public Shape {\npublic:\n    Triangle(int a, int b, int c) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"\"; }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<unique_ptr<Shape>> v;\n    for (int i = 0; i < n; i++) {\n        char t;\n        cin >> t;\n        if (t == 'S') { int a; cin >> a; v.push_back(make_unique<Square>(a)); }\n        else if (t == 'R') { int w, h; cin >> w >> h; v.push_back(make_unique<Rect>(w, h)); }\n        else { int a, b, c; cin >> a >> b >> c; v.push_back(make_unique<Triangle>(a, b, c)); }\n    }\n    const Shape* best = v[0].get();\n    for (const auto& s : v)\n        if (s->perimeter() > best->perimeter()) best = s.get();\n    cout << best->name() << \" \" << best->perimeter() << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Кредитный счёт",
    "prompt": "<p>Дан класс <code>Account</code>: <code>withdraw</code> отказывает, если денег недостаточно. Напишите класс <code>CreditAccount(balance, limit)</code>, наследующий <code>Account</code>: он переопределяет <code>withdraw</code> и разрешает снижать баланс до <code>-limit</code> (ниже — отказывает). Используйте поле <code>balance</code> с модификатором <code>protected</code>. <code>main</code> готов: тип счёта (<code>A бастапқы</code> или <code>C бастапқы лимит</code>), затем <code>q</code> запросов на снятие; выводит конечный баланс и количество отказов.</p>",
    "hints": [
     "В <code>bool withdraw(long long x) override</code>: если <code>balance - x &lt; -limit</code>, верните <code>false</code>."
    ]
   },
   {
    "title": "Каналы уведомлений",
    "prompt": "<p>Напишите абстрактный класс <code>Notifier</code> (<code>virtual void send(const string&amp; msg) const = 0</code>) и три производных класса:</p><ul><li><code>SmsNotifier</code>: <code>SMS: </code> + первые 10 символов сообщения (если сообщение короче, то полностью);</li><li><code>EmailNotifier</code>: <code>EMAIL: </code> + всё сообщение;</li><li><code>PushNotifier</code>: <code>PUSH: </code> + сообщение, переведённое в заглавные буквы.</li></ul><p><code>main</code> готов: читает <code>n</code>, затем в каждой строке тип (<code>sms</code>/<code>email</code>/<code>push</code>) и сообщение (на латинице, с пробелами).</p>",
    "hints": [
     "<code>msg.substr(0, 10)</code> работает правильно, даже если строка короче.",
     "Для заглавных букв: сделайте копию и <code>for (char&amp; c : up) c = toupper(c);</code>"
    ]
   },
   {
    "title": "Самый дешёвый транспорт",
    "prompt": "<p>Стоимость проезда в городе: <code>Bus</code> — до 15 км 200 тг, дальше 400 тг (пересадка); <code>Metro</code> — до 10 км 150 тг, дальше на метро не добраться (считайте цену 1000000); <code>Taxi</code> — 120·km тг. Напишите абстрактный класс <code>Transport</code> (<code>cost</code>, <code>name</code>), три класса на его основе и функцию <code>const Transport* cheapest(const vector&lt;unique_ptr&lt;Transport&gt;&gt;&amp; v, int km)</code> (при равенстве — тот, что раньше в списке). Названия: <code>Bus</code>, <code>Metro</code>, <code>Taxi</code>. <code>main</code> готов: для каждого расстояния выводит строку <code>km атауы бағасы</code>.</p>",
    "hints": [
     "В <code>cost</code> можно использовать тернарный оператор: <code>km &lt;= 15 ? 200 : 400</code>.",
     "<code>cheapest</code>: начните с <code>v[0].get()</code> и ищите строго более дешёвый."
    ]
   }
  ]
 },
 "cp-12": {
  "pr": [
   {
    "title": "Уникальные числа",
    "prompt": "<p>Числа вводятся, пока не закончится ввод. Выведите каждое различное значение один раз в порядке возрастания в одну строку через пробел. Используйте <code>set</code>.</p>",
    "hints": [
     "<code>s.insert(x)</code> сам убирает повторы, а обход <code>set</code> идёт по возрастанию."
    ]
   },
   {
    "title": "Сортировка по убыванию",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> чисел (очки участников соревнования). Выведите их по убыванию. Используйте <code>sort</code> и <code>greater&lt;int&gt;()</code>.</p>",
    "hints": [
     "<code>sort(v.begin(), v.end(), greater&lt;int&gt;());</code>"
    ]
   },
   {
    "title": "Сколько раз встречается число",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> чисел и в конце искомое число <code>x</code>. Найдите, сколько раз <code>x</code> встречается, с помощью алгоритма <code>count</code>.</p>",
    "hints": [
     "<code>count(v.begin(), v.end(), x)</code>"
    ]
   },
   {
    "title": "Самое частое слово",
    "prompt": "<p>Слова текста (строчные латинские буквы) вводятся, пока не закончится ввод. Выведите самое частое слово и количество его вхождений. Если таких несколько, выведите то, что раньше по алфавиту. Используйте <code>map&lt;string, int&gt;</code>.</p>",
    "hints": [
     "Ключи <code>map</code> отсортированы: если заменять только на <b>строго</b> большее значение, то при равенстве останется первое по алфавиту слово."
    ]
   },
   {
    "title": "Проверка анаграммы",
    "prompt": "<p>Даны два слова из строчных латинских букв. Если из букв одного можно составить другое (анаграмма), выведите <code>YES</code>, иначе — <code>NO</code>. Подсказка: отсортируйте обе строки через <code>sort</code> и сравните их.</p>",
    "hints": [
     "<code>string</code> тоже контейнер: <code>sort(a.begin(), a.end())</code> сортирует буквы."
    ]
   },
   {
    "title": "Участники по городам",
    "prompt": "<p>Дано <code>n</code>, затем в каждой строке <code>қала аты</code> (участники олимпиады). Выведите города в алфавитном порядке, а участников каждого города тоже по алфавиту: <code>қала: аты1 аты2 ...</code>. Используйте <code>map&lt;string, vector&lt;string&gt;&gt;</code>.</p>",
    "hints": [
     "Города сами сортируются в <code>map</code>, а имена внутри каждого вектора отсортируйте через <code>sort</code>."
    ]
   },
   {
    "title": "Общие значения двух списков",
    "prompt": "<p>Даны ID учеников двух классов: <code>n</code> и <code>n</code> чисел, затем <code>m</code> и <code>m</code> чисел. Выведите ID, которые есть в обоих списках (без повторов), по возрастанию; если таких нет, выведите <code>NONE</code>. Подсказка: первый список положите в <code>set</code> и проверяйте второй через <code>count</code>.</p>",
    "hints": [
     "<code>a.count(x)</code> — 1, если элемент есть, и 0, если нет.",
     "Если собрать результат тоже в <code>set</code>, повторы и порядок уберутся сами."
    ]
   },
   {
    "title": "Три лучшие команды",
    "prompt": "<p>Спартакиада: дано <code>n</code>, затем в каждой строке <code>спортшы команда ұпай</code>. Посчитайте общие очки каждой команды и выведите до 3 команд с наибольшим количеством очков в виде <code>команда ұпай</code>: по убыванию очков, при равенстве — по алфавиту названия. Используйте <code>map</code>, <code>vector&lt;pair&lt;string, int&gt;&gt;</code> и <code>sort</code> с lambda.</p>",
    "hints": [
     "<code>vector&lt;pair&lt;string, int&gt;&gt; v(total.begin(), total.end());</code> копирует map в вектор.",
     "Lambda: сначала по убыванию <code>second</code>, при равенстве по возрастанию <code>first</code>."
    ]
   }
  ]
 },
 "cp-13": {
  "pr": [
   {
    "title": "Рекурсивный факториал",
    "prompt": "<p>Напишите рекурсивную функцию <code>long long factorial(int n)</code> (0 ≤ n ≤ 20, <code>0! = 1</code>). Не используйте цикл. <code>main</code> готов.</p>",
    "hints": [
     "Базовый случай: при <code>n &lt;= 1</code> возвращаем 1.",
     "Рекурсивный шаг: <code>n * factorial(n - 1)</code>."
    ]
   },
   {
    "title": "Степень рекурсией",
    "prompt": "<p>Напишите рекурсивную функцию <code>long long power(long long a, int n)</code>: <code>a<sup>n</sup></code> (n ≥ 0, результат помещается в <code>long long</code>). <code>power(a, 0) = 1</code>, <code>power(a, n) = a · power(a, n − 1)</code>. <code>main</code> готов.</p>",
    "hints": [
     "Базовый случай — <code>n == 0</code>."
    ]
   },
   {
    "title": "Переворот строки рекурсией",
    "prompt": "<p>Напишите рекурсивную функцию <code>string reverseStr(const string&amp; s)</code>: пустая строка возвращает саму себя, иначе <code>reverseStr(s.substr(1)) + s[0]</code>. Не используйте цикл. <code>main</code> готов: читает одно слово на латинице.</p>",
    "hints": [
     "<code>s.empty()</code> — базовый случай."
    ]
   },
   {
    "title": "Фибоначчи с мемоизацией",
    "prompt": "<p>Дано <code>n</code> (0 ≤ n ≤ 90). <code>F(0) = 0</code>, <code>F(1) = 1</code>, <code>F(n) = F(n−1) + F(n−2)</code>. Ускорьте рекурсию с помощью <code>vector&lt;long long&gt; memo</code>, в котором хранятся уже вычисленные значения: иначе для <code>n = 90</code> программа не завершится никогда.</p>",
    "hints": [
     "<code>vector&lt;long long&gt; memo(91, -1);</code> — <code>-1</code> означает «ещё не вычислено».",
     "Перед вычислением проверьте, заполнен ли <code>memo[n]</code>."
    ],
    "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<long long> memo(91, -1);\n\nlong long fib(int n) {\n    if (n < 2) return n;\n    // проверьте memo и сохраните результат fib(n - 1) + fib(n - 2)\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Деление без исключений",
    "prompt": "<p>Компилятор браузера не поддерживает исключения, поэтому ошибку сообщаем через <code>bool</code>. Напишите <code>bool safeDivide(int a, int b, int&amp; result)</code>: если <code>b == 0</code>, возвращает <code>false</code>, иначе записывает <code>result = a / b</code> (целочисленное деление) и возвращает <code>true</code>. <code>main</code> готов: читает пары чисел до конца ввода и выводит результат или <code>Қате: нөлге бөлу</code>.</p>",
    "hints": [
     "Результат возвращается через ссылку, а успех — через <code>return</code>."
    ]
   },
   {
    "title": "Ханойские башни",
    "prompt": "<p><code>n</code> дисков нужно перенести со стержня 1 на стержень 3 (большой диск не кладётся на меньший). В первой строке выведите количество ходов, затем каждый ход в виде <code>a -&gt; b</code>. Рекурсия: <code>n−1</code> дисков на вспомогательный стержень, самый большой на цель, затем <code>n−1</code> дисков поверх него. 1 ≤ n ≤ 10.</p>",
    "hints": [
     "Базовый случай: <code>n == 0</code> — ничего не делать.",
     "<code>hanoi(n - 1, from, via, to); жүріс; hanoi(n - 1, via, to, from);</code>"
    ]
   },
   {
    "title": "Все перестановки",
    "prompt": "<p>Дано слово из разных строчных латинских букв (длина 1–7). Выведите все его перестановки в лексикографическом порядке, по одной в строке. Backtracking: сначала отсортируйте буквы, затем на каждом шаге добавляйте ещё не использованную букву (<code>vector&lt;bool&gt; used</code>).</p>",
    "hints": [
     "Если буквы отсортированы, выбор слева направо даёт лексикографический порядок.",
     "При возврате из рекурсии отменяйте выбор: <code>cur.pop_back(); used[i] = false;</code>"
    ]
   },
   {
    "title": "Подмножества с заданной суммой",
    "prompt": "<p>Даны <code>n</code> и <code>target</code>, затем <code>n</code> положительных целых чисел (номиналы монет, n ≤ 20). Выведите количество подмножеств, сумма элементов которых ровно равна <code>target</code> (каждый элемент либо берётся, либо нет; одинаковые значения считаются разными элементами). Рекурсия: <code>count(i, rest)</code> — сколькими способами можно набрать остаток, начиная с элемента <code>i</code>.</p>",
    "hints": [
     "Два варианта: <code>a[i]</code> берётся (<code>rest - a[i]</code>) или не берётся.",
     "Все числа положительные, поэтому при <code>rest == 0</code> можно сразу вернуть 1."
    ]
   }
  ]
 },
 "cp-p1": {
  "pr": [
   {
    "title": "Самая частая буква",
    "prompt": "<p>Дано слово из строчных латинских букв. Выведите самую частую букву и количество её вхождений; при равенстве — букву, которая раньше по алфавиту. Подсказка: <code>vector&lt;int&gt; cnt(26)</code>, индекс <code>c - 'a'</code>.</p>",
    "hints": [
     "<code>cnt[c - 'a']++</code> — счётчик для каждой буквы.",
     "Чтобы вернуть букву: <code>char('a' + i)</code>."
    ]
   },
   {
    "title": "Разность чётных и нечётных",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> целых чисел. Выведите сумму чётных чисел минус сумму нечётных. Например, <code>1 2 3 4</code> → <code>(2 + 4) − (1 + 3) = 2</code>.</p>",
    "hints": [
     "Нечётность проверяйте через <code>x % 2 != 0</code>: для отрицательных нечётных чисел остаток равен <code>-1</code>."
    ]
   },
   {
    "title": "Количество слов в предложении",
    "prompt": "<p>Дана строка текста: слова разделены одним или несколькими пробелами, в начале и в конце тоже могут быть пробелы. Выведите количество слов. Подсказка: если символ не пробел, а предыдущий символ — пробел (или начало строки), значит, началось новое слово.</p>",
    "hints": [
     "Если начинать с <code>char prev = ' ';</code>, то начало строки тоже считается «после пробела»."
    ]
   },
   {
    "title": "Число без пары",
    "prompt": "<p>Дано <code>n</code> (нечётное), затем <code>n</code> чисел: каждое число, кроме одного, встречается ровно дважды. Выведите число, которое встречается один раз. Нужно O(n) времени и O(1) дополнительной памяти: используйте XOR <code>^</code> — <code>x ^ x = 0</code>, <code>x ^ 0 = x</code>.</p>",
    "hints": [
     "Если применить XOR ко всем числам, пары взаимно уничтожатся."
    ]
   },
   {
    "title": "Наибольшая сумма отрезка",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> целых чисел (дневная прибыль или убыток). Выведите наибольшую сумму непустой непрерывной части последовательности. Алгоритм Кадане: <code>cur = max(x, cur + x)</code>, <code>best = max(best, cur)</code>. Например, <code>-2 1 -3 4 -1 2 1 -5 4</code> → <code>6</code>.</p>",
    "hints": [
     "Начните <code>cur</code> и <code>best</code> с первого элемента — тогда ответ верен, даже если все числа отрицательные."
    ]
   },
   {
    "title": "Перестановка в палиндром",
    "prompt": "<p>Дано слово из строчных латинских букв. Можно ли переставить его буквы так, чтобы получился палиндром? Если можно, выведите <code>YES</code>, иначе — <code>NO</code>. Правило: букв, которые встречаются нечётное число раз, должно быть не больше одной.</p>",
    "hints": [
     "Посчитайте каждую букву и подсчитайте нечётные счётчики."
    ]
   },
   {
    "title": "Объединение отрезков",
    "prompt": "<p>Брони зала заседаний: дано <code>n</code>, затем <code>n</code> отрезков <code>l r</code> (l ≤ r). Объедините пересекающиеся и соприкасающиеся (<code>[1,3]</code> и <code>[3,5]</code>) отрезки и выведите результат по возрастанию начала в виде <code>l r</code>. Сначала <code>sort</code>, затем один проход.</p>",
    "hints": [
     "Вектор <code>pair</code> при <code>sort</code> сортируется сначала по <code>first</code>.",
     "Если следующий отрезок пересекается с последним (<code>p.first &lt;= res.back().second</code>), продлите конец через <code>max</code>."
    ]
   },
   {
    "title": "Топ-k частых значений",
    "prompt": "<p>Дано <code>n</code> и <code>k</code>, затем <code>n</code> чисел (коды проданных товаров). Выведите <code>k</code> самых частых кодов в виде <code>код саны</code>: по убыванию количества, при равенстве — по возрастанию кода. Гарантируется, что различных кодов будет не меньше <code>k</code>.</p>",
    "hints": [
     "Скопируйте счётчики в <code>vector&lt;pair&lt;int, int&gt;&gt;</code> и отсортируйте через lambda."
    ]
   }
  ]
 },
 "cp-p2": {
  "pr": [
   {
    "title": "Лучший день для продажи акции",
    "prompt": "<p>Дано <code>n</code>, затем цены акции на <code>n</code> дней. Выведите наибольшую прибыль, которую можно получить, купив в один день и продав в один из последующих дней; если прибыли нет, выведите <code>0</code>. За один проход: храните самую низкую цену до текущего момента.</p>",
    "hints": [
     "<code>low</code> — самая низкая цена до сегодняшнего дня; каждый день проверяйте прибыль <code>x - low</code>."
    ]
   },
   {
    "title": "Перенос нулей в конец",
    "prompt": "<p>Дано <code>n</code>, затем <code>n</code> чисел. Переместите все <code>0</code> в конец массива, сохранив порядок остальных элементов. Сделайте без дополнительного массива: записывайте ненулевые элементы на позицию <code>pos</code>, а в конце заполните хвост нулями.</p>",
    "hints": [
     "<code>if (a[i] != 0) a[pos++] = a[i];</code>",
     "В конце запишите нули от <code>pos</code> до <code>n</code>."
    ]
   },
   {
    "title": "Слияние отсортированных списков",
    "prompt": "<p>Даны два списка, отсортированных по возрастанию: <code>n</code> и <code>n</code> чисел, затем <code>m</code> и <code>m</code> чисел. Выведите их объединение в один отсортированный список. Решите за O(n + m) с помощью двух указателей.</p>",
    "hints": [
     "На каждом шаге выводите меньшее из <code>a[i]</code> и <code>b[j]</code> и двигайте соответствующий указатель.",
     "Когда один список закончился, выведите остаток второго."
    ]
   },
   {
    "title": "Способы подняться по лестнице",
    "prompt": "<p>На лестнице <code>n</code> ступенек (1 ≤ n ≤ 85). За один шаг можно подняться на 1 или на 2 ступеньки. Сколькими способами можно подняться наверх? <code>dp[i] = dp[i−1] + dp[i−2]</code>, используйте <code>long long</code>. Например, <code>n = 4</code> → <code>5</code>.</p>",
    "hints": [
     "<code>dp[0] = 1</code> (ничего не делать — один способ), <code>dp[1] = 1</code>."
    ]
   },
   {
    "title": "Количество островов",
    "prompt": "<p>Карта: <code>n m</code> и <code>n</code> строк, <code>#</code> — суша, <code>.</code> — вода. Клетки суши, соединённые по вертикали или горизонтали, образуют один остров. Выведите количество островов. Из каждой новой клетки суши запустите BFS (<code>vector&lt;pair&lt;int,int&gt;&gt;</code> как очередь) или DFS и отметьте весь остров.</p>",
    "hints": [
     "Если заменить посещённую сушу на <code>.</code>, её не получится посчитать повторно.",
     "Не забудьте проверку границ: <code>nr &gt;= 0 &amp;&amp; nr &lt; n</code> ..."
    ]
   },
   {
    "title": "Целый квадратный корень",
    "prompt": "<p>Дано неотрицательное целое <code>n</code> (n ≤ 10<sup>18</sup>). Найдите наибольшее целое <code>x</code>, для которого <code>x·x ≤ n</code>, с помощью бинарного поиска (<code>sqrt</code> не используйте: на больших числах его точности не хватит). Диапазон поиска — <code>[0, 10<sup>9</sup>]</code>.</p>",
    "hints": [
     "Если условие «<code>mid * mid &lt;= n</code>» истинно, ответ — <code>mid</code> или больше: <code>lo = mid</code>.",
     "Чтобы не получить бесконечный цикл, округляйте середину вверх: <code>(lo + hi + 1) / 2</code>."
    ],
    "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    long long lo = 0, hi = 1000000000;\n    // бинарный поиск\n    cout << lo << endl;\n    return 0;\n}\n"
   },
   {
    "title": "Наибольшая общая подпоследовательность",
    "prompt": "<p>Даны два слова из строчных латинских букв (длина ≤ 1000). Выведите длину наибольшей общей подпоследовательности (subsequence: порядок букв сохраняется, но некоторые из них можно пропустить). DP: <code>dp[i][j]</code> — ответ для <code>i</code>-й буквы первого слова и <code>j</code>-й буквы второго. Например, <code>abcde ace</code> → <code>3</code>.</p>",
    "hints": [
     "Если буквы равны: <code>dp[i][j] = dp[i-1][j-1] + 1</code>.",
     "Иначе: <code>max(dp[i-1][j], dp[i][j-1])</code>."
    ]
   },
   {
    "title": "Задача о рюкзаке",
    "prompt": "<p>В поход можно взять груз весом до <code>W</code> кг. Дано <code>n</code> предметов, у каждого вес <code>w</code> и ценность <code>v</code>. Каждый предмет можно взять не более одного раза. Выведите наибольшую суммарную ценность, которую можно унести, не превысив вес. Ввод: <code>n W</code>, затем <code>n</code> строк <code>w v</code> (n ≤ 100, W ≤ 10 000). DP: <code>dp[c]</code> — наибольшая ценность при вместимости <code>c</code>; для каждого предмета обновляйте <code>c</code> в порядке <b>убывания</b>.</p>",
    "hints": [
     "Стартер обновляет <code>c</code> по возрастанию, поэтому один предмет может взяться несколько раз.",
     "<code>for (int c = W; c &gt;= w; c--)</code>"
    ]
   }
  ]
 }
} });
