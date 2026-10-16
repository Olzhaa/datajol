// JV1 Java. Full Java programs (public class Main) compiled in the browser (TeaVM -> WebAssembly); input via java.util.Scanner (nextInt/next/nextLine/hasNextInt), output compared per stdin case. Every exercise carries level: 'easy' | 'medium' | 'hard'.
(function () {
  const P = String.raw;

  DJ.modules['java-1'] = {
    intro: 'Java тілінің негіздері: main және println, типтер, String пен StringBuilder, шарттар мен циклдер, әдістер, массивтер, класс пен объект, мұрагерлік пен interface, коллекциялар, exception, generics, lambda мен stream, рекурсия. Әр сабақта толық Java бағдарламасын өзіңіз жазып, тестпен тексересіз, соңында екі есептер жинағы мен емтихан бар.',
    lessons: [
      {
        id: 'jv-1', title: 'Java-мен танысу: main, println және Scanner', minutes: 12,
        body: P`
<p><b>Java</b> — 1995 жылдан бері қолданылып келе жатқан, қатаң типтелген, объектіге бағытталған тіл. Онда Android қосымшалары, банктердің backend жүйелері, сондай-ақ дата-инженерияның «ауыр» құралдары (Apache Spark, Kafka, Hadoop) жазылған. Сондықтан деректермен жұмыс істейтін маман Java кодын оқи алса, үлкен артықшылық.</p>
<h3>Компиляция және JVM</h3>
<p>Python кодты жолма-жол орындайды. Java басқаша: алдымен <code>javac</code> компиляторы <code>Main.java</code> файлын <b>bytecode</b>-қа (<code>Main.class</code>) аударады, содан кейін <b>JVM</b> (Java Virtual Machine) сол bytecode-ты орындайды. JVM Windows-та да, Linux-та да, Mac-та да бар, сондықтан бір рет компиляцияланған код барлық жерде жүреді — «write once, run anywhere». Компилятор көп қатені іске қоспай тұрып-ақ табады: типтің сәйкес келмеуі, нүктелі үтірдің ұмытылуы, жоқ айнымалы.</p>
<h3>Ең кіші бағдарлама</h3>
<pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Salem, Almaty!");   // жаңа жолмен басып шығарады
        System.out.print("Bir ");                // жаңа жолсыз
        System.out.print("jol");
    }
}</code></pre>
<p>Әр бөлігі не істейді: <code>public class Main</code> — бағдарлама класс ішінде өмір сүреді, файл аты класс атымен бірдей болуы керек. <code>public static void main(String[] args)</code> — кіру нүктесі, JVM орындауды осы жерден бастайды. Әр нұсқаулық <code>;</code> белгісімен аяқталады, блоктар <code>{ }</code> ішінде жазылады, ал үлкен-кіші әріп маңызды: <code>Main</code> мен <code>main</code> — екі бөлек нәрсе. Түсініктеме <code>//</code> немесе <code>/* ... */</code> арқылы жазылады.</p>
<h3>Кірісті оқу: Scanner</h3>
<pre><code>import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();    // бір сөз (бос орынға дейін)
        int age = sc.nextInt();     // бүтін сан
        System.out.println(name + " " + (age + 1));
    }
}</code></pre>
<p>Кіріс <code>Aruzhan 19</code> болса, бағдарлама <code>Aruzhan 20</code> басады. Жолдар <code>+</code> арқылы біріктіріледі, ал <code>(age + 1)</code> жақшасы алдымен санды қосу үшін керек.</p>
<div class="tip">Бұл платформада әр тапсырма — толық бағдарлама. Тест бағдарламаға stdin арқылы кіріс береді де, stdout-қа шыққан мәтінді күтілген жауаппен салыстырады. Сондықтан артық мәтін («Санды енгізіңіз:») басып шығармаңыз.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: '<code>javac Main.java</code> командасы не жасайды?', options: ['Бағдарламаны бірден орындайды', '<code>Main.class</code> файлына bytecode жасайды', 'Python кодына аударады', 'Windows-қа арналған .exe файл жасайды'], answer: 1, explain: 'javac — компилятор. Ол bytecode шығарады, ал оны кейін JVM (<code>java Main</code>) орындайды.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Бағдарлама не басып шығарады?<pre><code>System.out.print("A");\nSystem.out.println("B");\nSystem.out.print("C");</code></pre>', options: ['A, B, C — әрқайсысы бөлек жолда', 'AB, сосын жаңа жолда C', 'ABC бір жолда', 'A, сосын жаңа жолда BC'], answer: 1, explain: '<code>print</code> жаңа жолға өтпейді, <code>println</code> мәтіннен кейін жаңа жолға өтеді. Сондықтан бірінші жолда AB, екіншісінде C.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте екі сөз бар: адамның аты және қаласы (мысалы, <code>Aruzhan Astana</code>). Бағдарлама екі жол басып шығарсын:<pre><code>Hello, Aruzhan!\nCity: Astana</code></pre>',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        // city айнымалысын оқып, екі жолды басып шығарыңыз
        System.out.println("Hello!");
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        String city = sc.next();
        System.out.println("Hello, " + name + "!");
        System.out.println("City: " + city);
    }
}
`,
            hints: ['Екінші сөзді де <code>sc.next()</code> арқылы оқыңыз.', 'Жолдарды біріктіру: <code>"Hello, " + name + "!"</code>.'],
            check: { cases: [ { stdin: 'Aruzhan Astana\n', out: 'Hello, Aruzhan!\nCity: Astana\n' }, { stdin: 'Daniyar Almaty\n', out: 'Hello, Daniyar!\nCity: Almaty\n' }, { stdin: 'A\nB\n', out: 'Hello, A!\nCity: B\n' } ] } }
        ]
      },
      {
        id: 'jv-2', title: 'Типтер, айнымалылар және арифметика', minutes: 13,
        body: P`
<p>Java — <b>статикалық типтелген</b> тіл: әр айнымалының типі компиляция кезінде белгілі және кейін өзгермейді. <code>int count = 5;</code> жазғаннан кейін <code>count = "бес";</code> деп жаза алмайсыз — компилятор қате береді. Бұл қателерді ерте ұстауға көмектеседі.</p>
<h3>Primitive типтер</h3>
<table>
<tr><th>Тип</th><th>Өлшемі</th><th>Мысал</th></tr>
<tr><td><code>int</code></td><td>32 бит, ±2.1 млрд</td><td><code>int qty = 3;</code></td></tr>
<tr><td><code>long</code></td><td>64 бит, ±9.2·10¹⁸</td><td><code>long revenue = 5_000_000_000L;</code></td></tr>
<tr><td><code>double</code></td><td>64 бит, бөлшек сан</td><td><code>double rate = 0.12;</code></td></tr>
<tr><td><code>char</code></td><td>бір символ</td><td><code>char grade = 'A';</code></td></tr>
<tr><td><code>boolean</code></td><td>true / false</td><td><code>boolean paid = true;</code></td></tr>
</table>
<p>Сондай-ақ <code>byte</code>, <code>short</code>, <code>float</code> бар, бірақ күнделікті кодта сирек қолданылады. <code>String</code> — primitive емес, ол класс (reference type), бірақ өте жиі кездеседі. <code>var x = 10;</code> деп жазсаңыз, компилятор типті өзі анықтайды (мұнда <code>int</code>), бірақ тип бәрібір тұрақты.</p>
<h3>Бүтін санды бөлу және қалдық</h3>
<pre><code>int total = 1000, people = 3;
System.out.println(total / people);            // 333  — бөлшек бөлігі тасталады
System.out.println(total % people);            // 1    — қалдық
System.out.println((double) total / people);   // 333.3333333333333
System.out.println(String.format("%.2f", (double) total / people)); // 333.33</code></pre>
<p>Екі <code>int</code>-ті бөлсеңіз, нәтиже де <code>int</code> болады. Бөлшек нәтиже керек болса, бір операндты <code>(double)</code> арқылы түрлендіресіз (<b>casting</b>). Ал <code>double avg = total / people;</code> жазсаңыз, алдымен бүтін бөлу орындалады (333), кейін ғана 333.0-ге айналады — жиі кездесетін қате.</p>
<h3>Overflow</h3>
<p><code>int</code>-тің шегі — 2 147 483 647. Одан асып кетсе, Java қате бермейді, сан «айналып» теріс болып шығады. Айлық айналым теңгемен миллиардтарға жетсе, <code>long</code> қолданыңыз. Өзгермейтін мәндер үшін <code>final</code>: <code>final double VAT = 0.12;</code>.</p>
<div class="tip">Ақша сомасын <code>double</code>-да сақтау тәуекелді: 0.1 + 0.2 дәл 0.3 емес. Нақты банк жүйелерінде тиынмен <code>long</code> немесе <code>BigDecimal</code> қолданылады.</div>`,
        exercises: [
          { type: 'number', level: 'easy', xp: 10, prompt: 'Не басып шығарылады?<pre><code>System.out.println(17 / 5 + 17 % 5);</code></pre>', answer: 5, tol: 0, explain: '17 / 5 = 3 (бүтін бөлу), 17 % 5 = 2 (қалдық), 3 + 2 = 5.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>double avg = 7 / 2;</code> жолынан кейін <code>avg</code> неге тең?', options: ['3.5', '3.0', '4.0', 'Компиляция қатесі'], answer: 1, explain: '7 / 2 — екі int, сондықтан нәтиже 3. Содан кейін ғана double-ға айналады: 3.0. Дұрысы: <code>7 / 2.0</code> немесе <code>(double) 7 / 2</code>.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>int x = 2_000_000_000; x = x + x;</code> орындалғаннан кейін не болады?', options: ['x = 4 000 000 000', 'x теріс сан болады (overflow)', 'ArithmeticException лақтырылады', 'Компиляция қатесі'], answer: 1, explain: 'int 2 147 483 647-ден аса алмайды. Java ескертусіз «айналып» кетеді: x = −294 967 296. Үлкен сомаларға <code>long</code> керек.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте екі бүтін сан: тауар саны <code>n</code> және жалпы сома <code>total</code> (теңге). Бір тауардың орташа бағасын үтірден кейін 2 таңбамен басып шығарыңыз. Мысалы, <code>3 1000</code> → <code>333.33</code>. Кеңес: <code>String.format("%.2f", ...)</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int total = sc.nextInt();
        System.out.println(total / n);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int total = sc.nextInt();
        double avg = (double) total / n;
        System.out.println(String.format("%.2f", avg));
    }
}
`,
            hints: ['<code>total / n</code> — бүтін бөлу. Біреуін <code>(double)</code> арқылы түрлендіріңіз.', '<code>String.format("%.2f", avg)</code> екі ондық таңбаға дөңгелектейді.'],
            check: { cases: [ { stdin: '3 1000\n', out: '333.33\n' }, { stdin: '4 10\n', out: '2.50\n' }, { stdin: '1 7\n', out: '7.00\n' } ] } }
        ]
      },
      {
        id: 'jv-3', title: 'String және StringBuilder', minutes: 13,
        body: P`
<p><code>String</code> — Java-дағы ең жиі қолданылатын класс. Оның басты қасиеті: <b>immutable</b>, яғни құрылған жолды өзгерту мүмкін емес. <code>s.toUpperCase()</code> жаңа жол қайтарады, ал <code>s</code> бұрынғыдай қалады.</p>
<h3>Негізгі әдістер</h3>
<pre><code>String city = "Shymkent";
city.length()            // 8
city.charAt(0)           // 'S'  (индекс 0-ден басталады)
city.substring(1, 4)     // "hym" (1-ден 4-ке дейін, 4 кірмейді)
city.indexOf("ken")      // 4, табылмаса -1
city.toLowerCase()       // "shymkent"
city.contains("kent")    // true
"  hi ".trim()           // "hi"
"a,b,c".split(",")       // ["a", "b", "c"] массиві</code></pre>
<h3>== емес, equals</h3>
<p><code>==</code> екі айнымалы <b>бір объектіге</b> сілтейтінін тексереді, ал мазмұнды салыстыру үшін <code>equals</code> керек. Scanner-ден оқылған <code>"yes"</code> мен кодтағы <code>"yes"</code> литералы әртүрлі объект болуы мүмкін, сондықтан <code>answer == "yes"</code> кейде <code>false</code> береді. Әрқашан <code>answer.equals("yes")</code> немесе <code>equalsIgnoreCase</code> жазыңыз. Әліпби бойынша салыстыру — <code>a.compareTo(b)</code>: теріс, нөл немесе оң сан қайтарады.</p>
<h3>StringBuilder</h3>
<p>String immutable болғандықтан, циклде <code>s = s + x</code> жазу әр қадамда жаңа жол жасап, барлық символдарды көшіреді — n қадамда O(n²). <code>StringBuilder</code> — өзгермелі буфер:</p>
<pre><code>StringBuilder sb = new StringBuilder();
for (int i = 1; i &lt;= 5; i++) {
    sb.append(i).append(' ');
}
System.out.println(sb.toString().trim());   // 1 2 3 4 5
System.out.println(new StringBuilder("kaspi").reverse()); // ipsak</code></pre>
<p><code>append</code> кез келген типті қабылдайды, <code>reverse()</code> жолды аударады, <code>insert</code>, <code>deleteCharAt</code>, <code>setCharAt</code> те бар. Соңында <code>toString()</code> арқылы кәдімгі String аласыз.</p>
<div class="tip"><code>char</code> мен <code>String</code> әртүрлі: <code>'a'</code> — символ (бір тырнақша), <code>"a"</code> — жол (қос тырнақша). <code>s.charAt(i) == 'x'</code> дұрыс, себебі char — primitive.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Scanner-ден оқылған <code>answer</code> жолы <code>"yes"</code> екенін тексерудің дұрыс жолы қайсы?', options: ['<code>answer == "yes"</code>', '<code>answer.equals("yes")</code>', '<code>answer = "yes"</code>', '<code>answer.compareTo("yes") == 1</code>'], answer: 1, explain: '<code>==</code> сілтемелерді салыстырады, ал мазмұнды <code>equals</code> салыстырады. compareTo тең болғанда 0 қайтарады, 1 емес.' },
          { type: 'number', level: 'easy', xp: 10, prompt: '<code>"Astana".substring(1, 4).length()</code> неге тең?', answer: 3, tol: 0, explain: 'substring(1, 4) — 1, 2, 3 индекстері: "sta". Ұзындығы 3.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте бір сөз. Оны <code>StringBuilder</code> арқылы кері ретпен басып шығарыңыз: <code>java</code> → <code>avaj</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word = sc.next();
        System.out.println(word);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word = sc.next();
        StringBuilder sb = new StringBuilder(word);
        System.out.println(sb.reverse().toString());
    }
}
`,
            hints: ['<code>new StringBuilder(word)</code> жасаңыз.', '<code>.reverse()</code> әдісі буферді аударады, <code>.toString()</code> String қайтарады.'],
            check: { cases: [ { stdin: 'java\n', out: 'avaj\n' }, { stdin: 'a\n', out: 'a\n' }, { stdin: 'Kaspi\n', out: 'ipsaK\n' } ], mustInclude: ['StringBuilder'] } },
          { type: 'java', level: 'medium', xp: 15, prompt: 'Жолды «сығыңыз» (run-length encoding): қатар тұрған бірдей әріптердің орнына әріп пен оның санын жазыңыз. <code>aaabcc</code> → <code>a3b1c2</code>, <code>abca</code> → <code>a1b1c1a1</code>. Нәтижені StringBuilder-де жинаңыз.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        StringBuilder sb = new StringBuilder();
        // мұнда жазыңыз
        System.out.println(sb.toString());
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            char c = s.charAt(i);
            int j = i;
            while (j < s.length() && s.charAt(j) == c) {
                j++;
            }
            sb.append(c).append(j - i);
            i = j;
        }
        System.out.println(sb.toString());
    }
}
`,
            hints: ['<code>i</code> — топтың басы. Ішкі циклмен <code>j</code>-ны дәл сол әріп біткенше жылжытыңыз.', 'Топ ұзындығы <code>j - i</code>. Оны әріптен кейін <code>append</code> етіп, <code>i = j</code> қойыңыз.'],
            check: { cases: [ { stdin: 'aaabcc\n', out: 'a3b1c2\n' }, { stdin: 'x\n', out: 'x1\n' }, { stdin: 'abca\n', out: 'a1b1c1a1\n' }, { stdin: 'zzzzzzzzzzzz\n', out: 'z12\n' } ] } }
        ]
      },
      {
        id: 'jv-4', title: 'Шарттар: if, else және switch', minutes: 12,
        body: P`
<p>Шарт <code>boolean</code> мәнге негізделеді. Салыстыру операторлары: <code>==  !=  &lt;  &gt;  &lt;=  &gt;=</code>. Логикалық операторлар: <code>&amp;&amp;</code> (және), <code>||</code> (немесе), <code>!</code> (емес). <code>&amp;&amp;</code> мен <code>||</code> «қысқа тұйықталады»: <code>x != 0 &amp;&amp; 10 / x &gt; 2</code> жазбасында x нөл болса, екінші бөлігі мүлдем есептелмейді.</p>
<h3>if / else if / else</h3>
<pre><code>int tenge = 25000;
if (tenge &gt;= 50000) {
    System.out.println("Free delivery");
} else if (tenge &gt;= 20000) {
    System.out.println("Delivery 500");
} else {
    System.out.println("Delivery 1500");
}
String status = tenge &gt; 0 ? "paid" : "empty";   // ternary оператор</code></pre>
<p>Шарттар жоғарыдан төмен тексеріледі, біріншісі орындалса, қалғандары өткізіп жіберіледі. Сондықтан үлкен шекті бірінші жазамыз. Блокта бір ғана жол болса да, фигуралық жақшаны қалдырмаған дұрыс — кейін жол қосқанда қате жібермейсіз.</p>
<h3>Классикалық switch</h3>
<pre><code>switch (day) {
    case 6:
    case 7:
        System.out.println("Weekend");
        break;
    default:
        System.out.println("Workday");
}</code></pre>
<p>Классикалық switch-те <code>break</code> болмаса, орындау келесі <code>case</code>-ке «құлап түседі» (<b>fall-through</b>). Кейде бұл әдейі қолданылады (6 мен 7 бірге), бірақ көбіне қате.</p>
<h3>Жаңа switch (Java 14+)</h3>
<pre><code>String name = switch (day) {
    case 1, 2, 3, 4, 5 -&gt; "Workday";
    case 6, 7 -&gt; "Weekend";
    default -&gt; "Unknown";
};</code></pre>
<p>Жебелі (<code>-&gt;</code>) түрінде fall-through жоқ, ал switch өзі мән қайтарады. switch <code>int</code>, <code>char</code>, <code>String</code> және <code>enum</code> мәндерімен жұмыс істейді.</p>
<div class="tip">Кібісе жыл ережесі шарттарды біріктіруге жақсы мысал: 4-ке бөлінеді, бірақ 100-ге бөлінбейді, НЕМЕСЕ 400-ге бөлінеді. Бір шарт: <code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>.</div>`,
        exercises: [
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>d = 2</code> болса, не басып шығарылады?<pre><code>switch (d) {\n    case 1: System.out.print("A");\n    case 2: System.out.print("B");\n    case 3: System.out.print("C"); break;\n    default: System.out.print("D");\n}</code></pre>', options: ['B', 'BC', 'BCD', 'D'], answer: 1, explain: 'case 2-де break жоқ, сондықтан орындау case 3-ке өтіп, C басады, сосын break тоқтатады: BC.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте 0–100 аралығындағы балл. Бағаны басып шығарыңыз: 90 және жоғары → <code>A</code>, 75–89 → <code>B</code>, 60–74 → <code>C</code>, 50–59 → <code>D</code>, 50-ден төмен → <code>F</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int score = sc.nextInt();
        System.out.println("?");
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int score = sc.nextInt();
        String grade;
        if (score >= 90) {
            grade = "A";
        } else if (score >= 75) {
            grade = "B";
        } else if (score >= 60) {
            grade = "C";
        } else if (score >= 50) {
            grade = "D";
        } else {
            grade = "F";
        }
        System.out.println(grade);
    }
}
`,
            hints: ['Ең үлкен шектен бастаңыз: <code>if (score &gt;= 90)</code>.', 'Келесі тармақтар <code>else if</code> арқылы, соңғысы <code>else</code>.'],
            check: { cases: [ { stdin: '95\n', out: 'A\n' }, { stdin: '75\n', out: 'B\n' }, { stdin: '59\n', out: 'D\n' }, { stdin: '0\n', out: 'F\n' } ] } },
          { type: 'java', level: 'medium', xp: 15, prompt: 'Жыл кібісе ме? Кібісе болса <code>YES</code>, әйтпесе <code>NO</code>. Ереже: 4-ке бөлінеді және 100-ге бөлінбейді, немесе 400-ге бөлінеді (2000 — кібісе, 1900 — жоқ).',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int y = sc.nextInt();
        if (y % 4 == 0) {
            System.out.println("YES");
        } else {
            System.out.println("NO");
        }
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int y = sc.nextInt();
        boolean leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
        System.out.println(leap ? "YES" : "NO");
    }
}
`,
            hints: ['Тек <code>y % 4</code> жеткіліксіз: 1900 4-ке бөлінеді, бірақ кібісе емес.', '<code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>'],
            check: { cases: [ { stdin: '2024\n', out: 'YES\n' }, { stdin: '1900\n', out: 'NO\n' }, { stdin: '2000\n', out: 'YES\n' }, { stdin: '2023\n', out: 'NO\n' } ] } }
        ]
      },
      {
        id: 'jv-5', title: 'Циклдер: for, while, break және continue', minutes: 13,
        body: P`
<p>Цикл бір әрекетті бірнеше рет қайталайды. Java-да үш негізгі түрі бар.</p>
<h3>for</h3>
<pre><code>for (int i = 1; i &lt;= 5; i++) {
    System.out.print(i + " ");      // 1 2 3 4 5
}</code></pre>
<p>Жақша ішінде үш бөлік: бастапқы мән, жалғастыру шарты, әр қадамнан кейінгі өзгеріс. <code>i</code> айнымалысы тек цикл ішінде көрінеді. Ең жиі қате — <b>off-by-one</b>: <code>&lt;</code> мен <code>&lt;=</code> шатастыру. n элементті массивті аралағанда <code>i = 0; i &lt; n</code> жазылады.</p>
<h3>while және do-while</h3>
<p>Қанша рет қайталанатыны алдын ала белгісіз болса, <code>while</code> ыңғайлы. Мысал: депозитке 500 000 теңге салдық, жылдық 12%. Неше жылда 1 000 000-нан асады?</p>
<pre><code>double money = 500000;
int years = 0;
while (money &lt; 1000000) {
    money = money * 1.12;
    years++;
}
System.out.println(years);   // 7</code></pre>
<p><code>do { ... } while (cond);</code> денесін кемінде бір рет орындайды, шартты соңынан тексереді. Мысалы, санның цифрларын санағанда 0 санының өзі бір цифр болуы керек — do-while дәл осыған лайық.</p>
<h3>break және continue</h3>
<p><code>break</code> циклді толық тоқтатады, <code>continue</code> ағымдағы қадамның қалғанын өткізіп, келесі қадамға өтеді. Кірістірілген циклдерде <code>break</code> тек ішкі циклден шығады.</p>
<pre><code>for (int i = 1; i &lt;= 10; i++) {
    if (i % 2 == 0) continue;   // жұп сандарды өткізіп жіберу
    if (i &gt; 7) break;           // 7-ден кейін тоқтау
    System.out.print(i + " ");  // 1 3 5 7
}</code></pre>
<h3>Цифрлармен жұмыс</h3>
<p><code>n % 10</code> — соңғы цифр, <code>n / 10</code> — соңғы цифрсыз сан. Осы екеуін <code>while (n &gt; 0)</code> циклінде қайталасаңыз, санның барлық цифрын оңнан солға қарай аласыз.</p>
<div class="tip">Цикл шарты ешқашан false болмаса, бағдарлама мәңгі айналады (infinite loop) және тест уақыт шегінен асады. while жазғанда шартқа әсер ететін айнымалы денеде өзгеретініне көз жеткізіңіз.</div>`,
        exercises: [
          { type: 'number', level: 'easy', xp: 10, prompt: 'Бұл цикл неше рет орындалады?<pre><code>for (int i = 0; i &lt; 20; i += 3) {\n    System.out.println(i);\n}</code></pre>', answer: 7, tol: 0, explain: 'i = 0, 3, 6, 9, 12, 15, 18 — жеті мән. 21 &lt; 20 емес, цикл тоқтайды.' },
          { type: 'number', level: 'medium', xp: 10, prompt: 'Не басып шығарылады?<pre><code>int s = 0;\nfor (int i = 1; i &lt;= 10; i++) {\n    if (i % 3 == 0) continue;\n    if (i == 8) break;\n    s += i;\n}\nSystem.out.println(s);</code></pre>', answer: 19, tol: 0, explain: '1 + 2 + 4 + 5 + 7 = 19. 3 пен 6 continue арқылы өткізіледі, i = 8 болғанда break.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте теріс емес бүтін <code>n</code> (≤ 10⁹). Оның цифрларының қосындысын басып шығарыңыз: <code>12345</code> → <code>15</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n % 10);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        System.out.println(sum);
    }
}
`,
            hints: ['<code>n % 10</code> соңғы цифрды береді, <code>n /= 10</code> оны алып тастайды.', '<code>while (n &gt; 0)</code> циклінде қосындыны жинаңыз.'],
            check: { cases: [ { stdin: '12345\n', out: '15\n' }, { stdin: '0\n', out: '0\n' }, { stdin: '1000000000\n', out: '1\n' }, { stdin: '999\n', out: '27\n' } ] } },
          { type: 'java', level: 'medium', xp: 15, prompt: '<b>Коллатц тізбегі.</b> n жұп болса n/2, тақ болса 3n+1. n = 1-ге жеткенше неше қадам керек? <code>6</code> → <code>8</code> (6, 3, 10, 5, 16, 8, 4, 2, 1). n = 1 болса, 0. Аралық мәндер int шегінен асуы мүмкін, сондықтан <code>long</code> қолданыңыз.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextInt();
        int steps = 0;
        System.out.println(steps);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextInt();
        int steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }
        System.out.println(steps);
    }
}
`,
            hints: ['<code>while (n != 1)</code> циклі қадамдарды санайды.', 'Ішінде <code>if (n % 2 == 0)</code> — екіге бөлу, әйтпесе <code>3 * n + 1</code>.'],
            check: { cases: [ { stdin: '6\n', out: '8\n' }, { stdin: '1\n', out: '0\n' }, { stdin: '27\n', out: '111\n' } ] } }
        ]
      },
      {
        id: 'jv-6', title: 'Әдістер (methods) және overloading', minutes: 13,
        body: P`
<p>Әдіс (method) — атауы бар, қайта қолданылатын код бөлігі. Python-дағы функцияның баламасы, бірақ Java-да әр әдіс класс ішінде тұрады. Әзірге объектсіз шақырылатын <code>static</code> әдістерді жазамыз.</p>
<pre><code>public class Main {
    static long withVat(long price) {        // қайтару типі, аты, параметрлері
        return price + price * 12 / 100;
    }

    static void printReceipt(String item, long price) {   // void — ештеңе қайтармайды
        System.out.println(item + ": " + withVat(price));
    }

    public static void main(String[] args) {
        printReceipt("Phone", 250000);   // Phone: 280000
    }
}</code></pre>
<p>Әдістің <b>сигнатурасы</b> — аты және параметр типтері. Қайтару типі жазылуы міндетті; <code>void</code> емес әдістің барлық жолы <code>return</code>-мен аяқталуы керек, әйтпесе компилятор қате береді.</p>
<h3>Overloading</h3>
<p>Бір атпен, бірақ параметрлері әртүрлі бірнеше әдіс жазуға болады:</p>
<pre><code>static int area(int side) { return side * side; }
static int area(int w, int h) { return w * h; }
static double area(double r) { return Math.PI * r * r; }</code></pre>
<p>Компилятор аргументтердің саны мен типіне қарап, қайсысын шақыру керегін өзі таңдайды. Тек қайтару типі әртүрлі екі әдіс (<code>int f(int)</code> және <code>double f(int)</code>) қатар тұра алмайды — шақыру кезінде оларды ажырату мүмкін емес.</p>
<h3>Pass-by-value</h3>
<p>Java аргументтерді әрқашан <b>мәні бойынша</b> береді. Primitive (int, double) берілсе, әдіс оның көшірмесін алады: ішінде өзгерткеніңіз сыртқа әсер етпейді. Массив не объект берілсе, <b>сілтеменің</b> көшірмесі беріледі — екі сілтеме бір объектіге қарайды, сондықтан <code>arr[0] = 5</code> сыртта да көрінеді. Ал <code>arr = new int[3]</code> деп сілтемені ауыстырсаңыз, сыртқы айнымалы өзгермейді.</p>
<div class="tip">Жақсы әдіс бір ғана нәрсе жасайды және атауы соны айтады: <code>isPrime</code>, <code>gcd</code>, <code>parsePrice</code>. boolean қайтаратын әдістер әдетте <code>is</code>/<code>has</code> сөзімен басталады.</div>`,
        exercises: [
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Не басып шығарылады?<pre><code>static void change(int x, int[] arr) {\n    x = 100;\n    arr[0] = 100;\n}\n// main ішінде:\nint a = 1;\nint[] b = {1};\nchange(a, b);\nSystem.out.println(a + " " + b[0]);</code></pre>', options: ['1 1', '100 100', '1 100', '100 1'], answer: 2, explain: 'int көшірмесі өзгерді, сыртқы a = 1 қалады. Массив сілтемесі көшірілді, бірақ ол сол массивке қарайды, сондықтан b[0] = 100.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Бір класта қай әдістер жұбы қатар тұра АЛМАЙДЫ?', options: ['<code>int f(int x)</code> және <code>int f(double x)</code>', '<code>int f(int x)</code> және <code>int f(int x, int y)</code>', '<code>int f(int x)</code> және <code>double f(int x)</code>', '<code>void f()</code> және <code>void f(String s)</code>'], answer: 2, explain: 'Overloading параметрлер бойынша ажыратылады. Тек қайтару типі әртүрлі болса, <code>f(5)</code> шақыруы екіұшты — компиляция қатесі.' },
          { type: 'java', level: 'easy', xp: 15, prompt: '<code>static int gcd(int a, int b)</code> әдісін жазыңыз (Евклид алгоритмі: b = 0 болса a, әйтпесе gcd(b, a % b)). Кірісте екі оң сан; бір жолға ЕҮОБ (gcd) және ЕКОЕ (lcm = a / gcd · b) басыңыз: <code>12 18</code> → <code>6 36</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    static int gcd(int a, int b) {
        return 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int g = gcd(a, b);
        System.out.println(g + " " + (a * b));
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    static int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int g = gcd(a, b);
        long lcm = (long) a / g * b;
        System.out.println(g + " " + lcm);
    }
}
`,
            hints: ['Цикл: <code>t = a % b; a = b; b = t;</code> — b нөл болғанша.', 'lcm = <code>a / g * b</code> (алдымен бөлсеңіз, overflow азаяды).'],
            check: { cases: [ { stdin: '12 18\n', out: '6 36\n' }, { stdin: '7 13\n', out: '1 91\n' }, { stdin: '5 5\n', out: '5 5\n' } ], mustInclude: ['gcd('] } },
          { type: 'java', level: 'medium', xp: 15, prompt: '<code>static boolean isPrime(int n)</code> әдісін жазыңыз (n &lt; 2 жай емес; бөлгіштерді <code>i * i &lt;= n</code> дейін тексеру жеткілікті). Кірісте <code>n</code>; 1-ден n-ге дейінгі жай сандардың санын басып шығарыңыз: <code>10</code> → <code>4</code> (2, 3, 5, 7).',
            starter: P`import java.util.Scanner;

public class Main {
    static boolean isPrime(int n) {
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int count = 0;
        for (int i = 1; i <= n; i++) {
            if (isPrime(i)) count++;
        }
        System.out.println(count);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int count = 0;
        for (int i = 1; i <= n; i++) {
            if (isPrime(i)) count++;
        }
        System.out.println(count);
    }
}
`,
            hints: ['Алдымен <code>if (n &lt; 2) return false;</code>', '<code>for (int d = 2; d * d &lt;= n; d++)</code> — бөлінсе false, цикл біткенде true.'],
            check: { cases: [ { stdin: '10\n', out: '4\n' }, { stdin: '1\n', out: '0\n' }, { stdin: '2\n', out: '1\n' }, { stdin: '100\n', out: '25\n' } ], mustInclude: ['static boolean isPrime'] } }
        ]
      },
      {
        id: 'jv-7', title: 'Массивтер және 2D массивтер', minutes: 14,
        body: P`
<p>Массив — бір типтегі, <b>өлшемі тұрақты</b> элементтер тізбегі. Құрылғаннан кейін ұзындығын өзгерту мүмкін емес (ол үшін келесі сабақтардағы ArrayList бар).</p>
<pre><code>int[] sales = new int[5];            // [0, 0, 0, 0, 0]
int[] prices = {1200, 800, 4500};    // мәндерімен бірге
System.out.println(prices.length);   // 3 (жақшасыз — бұл өріс)
prices[1] = 950;
for (int p : prices) {               // enhanced for: тек оқу үшін ыңғайлы
    System.out.print(p + " ");
}</code></pre>
<p><code>new</code> арқылы жасалған массив әдепкі мәндермен толады: сандар үшін <code>0</code> / <code>0.0</code>, <code>boolean</code> үшін <code>false</code>, объектілер (String) үшін <code>null</code>. Индекстер <code>0</code>-ден <code>length - 1</code>-ге дейін. Стандарт JVM-де шектен тыс индекс <code>ArrayIndexOutOfBoundsException</code> лақтырады, сондықтан цикл шекарасын әрқашан мұқият жазыңыз.</p>
<h3>Пайдалы құралдар</h3>
<pre><code>import java.util.Arrays;
Arrays.sort(prices);                         // орнында сұрыптау
System.out.println(Arrays.toString(prices)); // [800, 1200, 4500]
int[] copy = Arrays.copyOf(prices, prices.length);
int[] same = prices;   // көшірме ЕМЕС: бір массивке екі сілтеме</code></pre>
<h3>Ең үлкен және ең кіші мән</h3>
<p>Максимумды іздегенде бастапқы мәнді <code>0</code> деп алу — классикалық қате: барлық сан теріс болса, жауап 0 болып шығады. Бастапқы мән ретінде бірінші элементті (<code>a[0]</code>) немесе <code>Integer.MIN_VALUE</code> алыңыз.</p>
<h3>2D массивтер</h3>
<p>Кесте, карта торы, матрица — массивтер массиві:</p>
<pre><code>int[][] grid = new int[3][4];      // 3 жол, 4 баған
grid[1][2] = 7;
int rows = grid.length;            // 3
int cols = grid[0].length;         // 4
for (int r = 0; r &lt; rows; r++) {
    for (int c = 0; c &lt; cols; c++) {
        System.out.print(grid[r][c] + " ");
    }
    System.out.println();
}</code></pre>
<p>Әр жолдың ұзындығы әртүрлі болуы мүмкін (<b>jagged array</b>): <code>int[][] t = new int[3][];</code> да <code>t[0] = new int[5];</code>. Матрицаны <b>транспонирлеу</b> (жол ↔ баған) — <code>t[c][r] = m[r][c]</code>, нәтиженің өлшемі <code>cols × rows</code>.</p>
<div class="tip">Scanner-мен массив оқу үлгісі: алдымен <code>n = sc.nextInt()</code>, сосын <code>for</code> ішінде <code>a[i] = sc.nextInt()</code>. Сандардың жолдарға қалай бөлінгені маңызды емес — nextInt бос орын мен жаңа жолды бірдей өткізеді.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Не басып шығарылады?<pre><code>String[] names = new String[3];\nSystem.out.println(names[0]);</code></pre>', options: ['Бос жол', '<code>null</code>', '0', 'Компиляция қатесі'], answer: 1, explain: 'Объектілер массивінің әдепкі мәні — null. Сандар үшін 0, boolean үшін false болар еді.' },
          { type: 'number', level: 'easy', xp: 10, prompt: '<code>int[][] g = new int[4][6];</code> массивінде барлығы неше int элемент бар?', answer: 24, tol: 0, explain: '4 жол × 6 баған = 24 элемент.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте <code>n</code>, сосын n бүтін сан. Ең үлкен және ең кіші мәнді бір жолға басыңыз: <code>5</code> / <code>3 9 -2 7 0</code> → <code>9 -2</code>. Сандар бәрі теріс болуы мүмкін.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        int max = 0, min = 0;
        for (int x : a) {
            if (x > max) max = x;
            if (x < min) min = x;
        }
        System.out.println(max + " " + min);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        int max = a[0], min = a[0];
        for (int x : a) {
            if (x > max) max = x;
            if (x < min) min = x;
        }
        System.out.println(max + " " + min);
    }
}
`,
            hints: ['Бастапқы <code>max = 0</code> теріс сандарда қате береді.', '<code>max</code> мен <code>min</code>-ді <code>a[0]</code> мәнінен бастаңыз.'],
            check: { cases: [ { stdin: '5\n3 9 -2 7 0\n', out: '9 -2\n' }, { stdin: '1\n5\n', out: '5 5\n' }, { stdin: '3\n-1 -5 -3\n', out: '-1 -5\n' } ] } },
          { type: 'java', level: 'medium', xp: 15, prompt: 'Кірісте <code>r c</code>, сосын r × c матрица. Транспонирленген матрицаны басыңыз (c жол, әр жолда r сан бос орынмен):<pre><code>2 3        1 4\n1 2 3  →   2 5\n4 5 6      3 6</code></pre>',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt(), c = sc.nextInt();
        int[][] m = new int[r][c];
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++)
                m[i][j] = sc.nextInt();
        for (int i = 0; i < r; i++) {
            StringBuilder sb = new StringBuilder();
            for (int j = 0; j < c; j++) {
                if (j > 0) sb.append(' ');
                sb.append(m[i][j]);
            }
            System.out.println(sb);
        }
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt(), c = sc.nextInt();
        int[][] m = new int[r][c];
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++)
                m[i][j] = sc.nextInt();
        for (int j = 0; j < c; j++) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r; i++) {
                if (i > 0) sb.append(' ');
                sb.append(m[i][j]);
            }
            System.out.println(sb);
        }
    }
}
`,
            hints: ['Шығарғанда сыртқы цикл бағандар бойынша (<code>j</code>), ішкісі жолдар бойынша (<code>i</code>) жүрсін.', 'Әр шығыс жолында <code>m[i][j]</code> мәндерін i = 0..r−1 бойынша жинаңыз.'],
            check: { cases: [ { stdin: '2 3\n1 2 3\n4 5 6\n', out: '1 4\n2 5\n3 6\n' }, { stdin: '1 1\n7\n', out: '7\n' }, { stdin: '3 1\n1\n2\n3\n', out: '1 2 3\n' } ] } }
        ]
      },
      {
        id: 'jv-8', title: 'Класс пен объект: constructor және encapsulation', minutes: 15,
        body: P`
<p><b>Класс</b> — үлгі (сызба), <b>объект</b> — сол үлгі бойынша жасалған нақты дана. Мысалы, <code>Product</code> класында аты мен бағасы бар, ал «iPhone, 450 000 ₸» — оның бір объектісі. Класс деректерді (<b>өрістер</b>, fields) және оларға қатысты әрекеттерді (<b>әдістер</b>) бір жерге жинайды.</p>
<pre><code>class Product {
    private String name;          // өрістер
    private int price;

    Product(String name, int price) {   // constructor
        this.name = name;               // this.name — өріс, name — параметр
        this.price = price;
    }

    int getPrice() { return price; }    // getter

    void applyDiscount(int percent) {
        if (percent &lt; 0 || percent &gt; 90) return;   // ережені класс өзі қорғайды
        price = price - price * percent / 100;
    }

    public String toString() { return name + " (" + price + ")"; }
}

Product p = new Product("iPhone", 450000);
p.applyDiscount(10);
System.out.println(p);    // iPhone (405000)</code></pre>
<h3>Constructor</h3>
<p>Constructor — класс атымен аталатын, қайтару типі жоқ ерекше әдіс. <code>new</code> шақырылғанда объектіні бастапқы күйге келтіреді. Бірнеше constructor жазуға болады (overloading), ал біреуі екіншісін <code>this(...)</code> арқылы шақыра алады. Ешбір constructor жазбасаңыз, компилятор бос constructor-ды өзі қосады.</p>
<h3>Encapsulation</h3>
<p>Өрістерді <code>private</code> етіп, оларға тек әдістер арқылы қол жеткізу — <b>инкапсуляция</b>. Сонда баға теріс болып кетпейді, себебі оны өзгертудің жалғыз жолы — тексеру жасайтын әдіс. Қол жеткізу деңгейлері: <code>private</code> (тек осы класс), әдепкі (бір package), <code>protected</code> (package + ұрпақтар), <code>public</code> (барлығы).</p>
<h3>static өрістер</h3>
<p><code>static</code> өріс жеке объектіге емес, бүкіл класқа тиесілі: барлық объект бір мәнді бөліседі. Мысалы, <code>static int created</code> — неше объект жасалғанының санауышы. static әдіс <code>this</code>-ті көрмейді, сондықтан объект өрістеріне тікелей қол жеткізе алмайды.</p>
<div class="tip">Бұл платформада бірнеше класты бір файлға жазуға болады: <code>public class Main</code> біреу ғана, ал қосымша кластар <code>public</code>-сіз (<code>class Account { ... }</code>) Main-нен кейін не алдында тұрады.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: '<code>private int balance;</code> өрісі туралы қай тұжырым дұрыс?', options: ['Оны кез келген класс оқи алады, бірақ өзгерте алмайды', 'Оған тек сол класстың ішінен қол жеткізуге болады', 'Ол барлық объектілерге ортақ', 'Оны constructor-да орнатуға болмайды'], answer: 1, explain: 'private — тек өз класының ішінде көрінеді. Сырттан тек public әдістер (getter, deposit) арқылы жұмыс істейміз. Барлығына ортақ — static.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Не басып шығарылады?<pre><code>class Counter {\n    static int total = 0;\n    int mine = 0;\n    Counter() { total++; mine++; }\n}\n// main:\nnew Counter();\nnew Counter();\nCounter c = new Counter();\nSystem.out.println(Counter.total + " " + c.mine);</code></pre>', options: ['1 1', '3 3', '3 1', '1 3'], answer: 2, explain: 'total — static, үш объект бір санауышты бөліседі: 3. mine әр объектіде бөлек, c үшін 1.' },
          { type: 'java', level: 'medium', xp: 15, prompt: '<code>Account</code> класын аяқтаңыз: <code>balance</code> өрісі <code>private</code>, <code>withdraw(int amount)</code> қаражат жетпесе ештеңе өзгертпей <code>false</code> қайтарсын. Кіріс: бастапқы баланс пен команда саны q, сосын q команда: <code>D x</code> (салу) немесе <code>W x</code> (алу). Әр сәтсіз алуда <code>DENIED</code> басыңыз, соңында <code>BALANCE x</code>.',
            starter: P`import java.util.Scanner;

class Account {
    private int balance;

    Account(int balance) {
        this.balance = balance;
    }

    void deposit(int amount) {
        balance += amount;
    }

    boolean withdraw(int amount) {
        balance -= amount;
        return true;
    }

    int getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Account acc = new Account(sc.nextInt());
        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            String cmd = sc.next();
            int x = sc.nextInt();
            if (cmd.equals("D")) {
                acc.deposit(x);
            } else if (!acc.withdraw(x)) {
                System.out.println("DENIED");
            }
        }
        System.out.println("BALANCE " + acc.getBalance());
    }
}
`,
            solution: P`import java.util.Scanner;

class Account {
    private int balance;

    Account(int balance) {
        this.balance = balance;
    }

    void deposit(int amount) {
        balance += amount;
    }

    boolean withdraw(int amount) {
        if (amount > balance) {
            return false;
        }
        balance -= amount;
        return true;
    }

    int getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Account acc = new Account(sc.nextInt());
        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            String cmd = sc.next();
            int x = sc.nextInt();
            if (cmd.equals("D")) {
                acc.deposit(x);
            } else if (!acc.withdraw(x)) {
                System.out.println("DENIED");
            }
        }
        System.out.println("BALANCE " + acc.getBalance());
    }
}
`,
            hints: ['Тек <code>withdraw</code> әдісін өзгерту жеткілікті.', '<code>if (amount &gt; balance) return false;</code> — баланс өзгермей қалады.'],
            check: { cases: [ { stdin: '1000 3\nD 500\nW 2000\nW 300\n', out: 'DENIED\nBALANCE 1200\n' }, { stdin: '0 1\nW 1\n', out: 'DENIED\nBALANCE 0\n' }, { stdin: '100 2\nW 100\nD 5\n', out: 'BALANCE 5\n' } ], mustInclude: ['private int balance'] } }
        ]
      },
      {
        id: 'jv-9', title: 'Мұрагерлік, полиморфизм және interface', minutes: 15,
        body: P`
<p><b>Мұрагерлік</b> (inheritance) бар класты кеңейтіп, жаңа класс жасауға мүмкіндік береді: <code>class Dog extends Animal</code>. Dog Animal-дың өрістері мен әдістерін алады және өзінікін қоса алады. Java-да класс тек <b>бір</b> класты extends ете алады.</p>
<pre><code>abstract class Employee {
    protected String name;
    Employee(String name) { this.name = name; }
    abstract long monthlyPay();               // денесі жоқ: ұрпақтар міндетті түрде жазады
    String describe() { return name + ": " + monthlyPay(); }
}

class Salaried extends Employee {
    private long salary;
    Salaried(String name, long salary) {
        super(name);                           // ата-класс constructor-ы
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
<p><code>abstract</code> класстан тікелей объект жасалмайды. <code>@Override</code> аннотациясы компиляторға «мен ата-кластың әдісін қайта жазып жатырмын» дейді: атауда қате болса, бірден ескертеді.</p>
<h3>Полиморфизм</h3>
<pre><code>Employee[] staff = { new Salaried("Aliya", 600000), new Hourly("Timur", 3000, 120) };
for (Employee e : staff) {
    System.out.println(e.describe());   // әрқайсысы өз monthlyPay()-ін шақырады
}</code></pre>
<p>Айнымалы типі <code>Employee</code> болса да, қай әдіс шақырылатынын <b>объектінің нақты типі</b> анықтайды (dynamic dispatch). Осының арқасында жаңа қызметкер түрін қосқанда циклді өзгертудің қажеті жоқ.</p>
<h3>Interface</h3>
<p>Interface — «келісім-шарт»: класс қандай әдістерге ие болуы керегін айтады, бірақ күй (өріс) сақтамайды. Класс бірнеше interface-ті <code>implements</code> ете алады.</p>
<pre><code>interface Shape {
    double area();
    default String label() { return "shape"; }   // default әдіс: дайын денесі бар
}
class Square implements Shape {
    private double s;
    Square(double s) { this.s = s; }
    public double area() { return s * s; }        // interface әдістері public
}</code></pre>
<div class="tip">Қашан не таңдау керек: ортақ өріс пен кодты бөлісетін туыс кластар — abstract class; «осы әрекетті істей алады» деген қабілет (Comparable, Runnable, Shape) — interface. Барлық класс <code>Object</code>-тен мұра алады, сондықтан <code>toString</code>, <code>equals</code>, <code>hashCode</code> әрқайсысында бар.</div>`,
        exercises: [
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Не басып шығарылады?<pre><code>class Animal { String sound() { return "..."; } }\nclass Dog extends Animal {\n    @Override String sound() { return "Woof"; }\n}\n// main:\nAnimal a = new Dog();\nSystem.out.println(a.sound());</code></pre>', options: ['...', 'Woof', 'Компиляция қатесі: a типі Animal', 'Animal'], answer: 1, explain: 'Dynamic dispatch: айнымалы типі Animal, бірақ объект Dog. Қайта жазылған Dog.sound() шақырылады.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Java-да қай жазба дұрыс?', options: ['<code>class A extends B, C</code>', '<code>class A implements B extends C</code>', '<code>class A extends B implements C, D</code>', '<code>interface A extends class B</code>'], answer: 2, explain: 'Класс бір класты extends етеді және бірнеше interface-ті implements етеді. extends бірінші жазылады.' },
          { type: 'java', level: 'medium', xp: 15, prompt: '<code>Shape</code> interface-і мен <code>Rect</code> класы дайын. <code>Circle</code> класының <code>area()</code> әдісін аяқтаңыз (π·r², <code>Math.PI</code>). Кіріс: n, сосын n жол: <code>C r</code> немесе <code>R w h</code>. Барлық фигуралардың жалпы ауданын 2 ондық таңбамен басыңыз.',
            starter: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

interface Shape {
    double area();
}

class Rect implements Shape {
    private double w, h;
    Rect(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}

class Circle implements Shape {
    private double r;
    Circle(double r) { this.r = r; }
    public double area() {
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Shape> shapes = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            if (kind.equals("C")) {
                shapes.add(new Circle(sc.nextInt()));
            } else {
                int w = sc.nextInt();
                int h = sc.nextInt();
                shapes.add(new Rect(w, h));
            }
        }
        double total = 0;
        for (Shape s : shapes) total += s.area();
        System.out.println(String.format("%.2f", total));
    }
}
`,
            solution: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

interface Shape {
    double area();
}

class Rect implements Shape {
    private double w, h;
    Rect(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}

class Circle implements Shape {
    private double r;
    Circle(double r) { this.r = r; }
    public double area() {
        return Math.PI * r * r;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Shape> shapes = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            if (kind.equals("C")) {
                shapes.add(new Circle(sc.nextInt()));
            } else {
                int w = sc.nextInt();
                int h = sc.nextInt();
                shapes.add(new Rect(w, h));
            }
        }
        double total = 0;
        for (Shape s : shapes) total += s.area();
        System.out.println(String.format("%.2f", total));
    }
}
`,
            hints: ['Тек Circle.area() денесін өзгертіңіз.', '<code>return Math.PI * r * r;</code>'],
            check: { cases: [ { stdin: '2\nC 1\nR 2 3\n', out: '9.14\n' }, { stdin: '1\nR 4 5\n', out: '20.00\n' }, { stdin: '3\nC 2\nC 2\nR 1 1\n', out: '26.13\n' } ], mustInclude: ['implements Shape'] } }
        ]
      },
      {
        id: 'jv-10', title: 'Коллекциялар: ArrayList, HashMap, HashSet', minutes: 15,
        body: P`
<p>Массивтің өлшемі тұрақты, ал нақты деректер өседі. <b>Java Collections Framework</b> дайын құрылымдар береді. Ең жиі қолданылатын үшеуі:</p>
<table>
<tr><th>Interface</th><th>Іске асыру</th><th>Не үшін</th></tr>
<tr><td><code>List</code></td><td><code>ArrayList</code></td><td>реті бар, индекспен қол жеткізу, қайталану болады</td></tr>
<tr><td><code>Map</code></td><td><code>HashMap</code>, <code>TreeMap</code></td><td>кілт → мән, кілт бойынша O(1) іздеу</td></tr>
<tr><td><code>Set</code></td><td><code>HashSet</code>, <code>TreeSet</code></td><td>қайталанбайтын элементтер</td></tr>
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
orders.merge("Shymkent", 1, Integer::sum);   // жоқ болса 1, бар болса +1
orders.get("Aktobe");                        // null — мұндай кілт жоқ
orders.containsKey("Almaty");                // true
for (Map.Entry&lt;String, Integer&gt; e : orders.entrySet()) {
    System.out.println(e.getKey() + " " + e.getValue());
}

Set&lt;Integer&gt; seen = new HashSet&lt;&gt;();
seen.add(5); seen.add(5);
seen.size();           // 1
seen.contains(5);      // true</code></pre>
<h3>Generics және wrapper кластар</h3>
<p>Бұрыштық жақшадағы тип (<code>&lt;String&gt;</code>) коллекцияда не сақталатынын айтады — компилятор басқа типті қосуға жол бермейді. Коллекциялар тек объект сақтайды, сондықтан primitive орнына wrapper класс жазылады: <code>int → Integer</code>, <code>double → Double</code>, <code>char → Character</code>. <code>List&lt;int&gt;</code> — компиляция қатесі. Java мәндерді автоматты түрде орап-ашады (<b>autoboxing</b>). Бірақ абай болыңыз: екі <code>Integer</code>-ді <code>==</code> арқылы салыстыру 127-ден үлкен мәндерде <code>false</code> беруі мүмкін — <code>equals</code> қолданыңыз.</p>
<h3>Реті</h3>
<p><code>HashMap</code> мен <code>HashSet</code> элементтерді белгілі бір ретпен сақтауға кепілдік бермейді. Кілттер әліпби бойынша керек болса — <code>TreeMap</code>/<code>TreeSet</code> (O(log n)), қосылу реті керек болса — <code>LinkedHashMap</code>.</p>
<div class="tip">Айнымалыны interface типімен жариялау дағдысы: <code>List&lt;String&gt; xs = new ArrayList&lt;&gt;();</code>. Кейін іске асыруды ауыстыру (мысалы, <code>LinkedList</code>-ке) бір сөзді өзгертумен шешіледі.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Қай жол компиляцияланбайды?', options: ['<code>List&lt;Integer&gt; a = new ArrayList&lt;&gt;();</code>', '<code>List&lt;int&gt; a = new ArrayList&lt;&gt;();</code>', '<code>Map&lt;String, Integer&gt; m = new HashMap&lt;&gt;();</code>', '<code>Set&lt;String&gt; s = new TreeSet&lt;&gt;();</code>'], answer: 1, explain: 'Generics тек reference типтермен жұмыс істейді. int орнына Integer wrapper класы жазылады.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>Map&lt;String, Integer&gt; m = new HashMap&lt;&gt;();</code> бос болса, <code>m.get("Taraz")</code> не қайтарады?', options: ['0', '<code>null</code>', 'NoSuchElementException лақтырады', 'Бос жол ""'], answer: 1, explain: 'Кілт жоқ болса, get null қайтарады. Оны int-ке ашсаңыз (<code>int x = m.get(...)</code>) NullPointerException болады, сондықтан <code>getOrDefault(key, 0)</code> ыңғайлы.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте n, сосын n бүтін сан. Оқу ретінде <b>екінші рет</b> кездескен бірінші мәнді басыңыз (<code>HashSet</code> қолданыңыз). Ондай мән жоқ болса, <code>NONE</code>. Мысал: <code>3 1 4 1 5 3</code> → <code>1</code>.',
            starter: P`import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
        }
        System.out.println("NONE");
    }
}
`,
            solution: P`import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (seen.contains(x)) {
                System.out.println(x);
                return;
            }
            seen.add(x);
        }
        System.out.println("NONE");
    }
}
`,
            hints: ['Әр санды қоспас бұрын <code>seen.contains(x)</code> тексеріңіз.', 'Табылса, басып шығарып, <code>return;</code> арқылы main-нен шығыңыз.'],
            check: { cases: [ { stdin: '6\n3 1 4 1 5 3\n', out: '1\n' }, { stdin: '3\n1 2 3\n', out: 'NONE\n' }, { stdin: '2\n7 7\n', out: '7\n' } ], mustInclude: ['contains'] } },
          { type: 'java', level: 'medium', xp: 15, prompt: 'Кірісте n, сосын n сөз (қала атаулары). Әр сөздің неше рет кездескенін санап, сөздерді <b>әліпби бойынша</b> <code>сөз саны</code> түрінде басыңыз. <code>TreeMap</code> кілттерді өзі сұрыптайды.',
            starter: P`import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<String, Integer> freq = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            String w = sc.next();
            // freq-ті жаңартыңыз
        }
        for (Map.Entry<String, Integer> e : freq.entrySet()) {
            System.out.println(e.getKey() + " " + e.getValue());
        }
    }
}
`,
            solution: P`import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<String, Integer> freq = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            String w = sc.next();
            freq.put(w, freq.getOrDefault(w, 0) + 1);
        }
        for (Map.Entry<String, Integer> e : freq.entrySet()) {
            System.out.println(e.getKey() + " " + e.getValue());
        }
    }
}
`,
            hints: ['<code>freq.getOrDefault(w, 0)</code> — әзірге саны (жоқ болса 0).', '<code>freq.put(w, ... + 1)</code> немесе <code>freq.merge(w, 1, Integer::sum)</code>.'],
            check: { cases: [ { stdin: '5\nastana almaty astana shymkent astana\n', out: 'almaty 1\nastana 3\nshymkent 1\n' }, { stdin: '1\nx\n', out: 'x 1\n' }, { stdin: '3\nb a b\n', out: 'a 1\nb 2\n' } ] } }
        ]
      },
      {
        id: 'jv-11', title: 'Exceptions: try, catch, throw және өз exception-ыңыз', minutes: 15,
        body: P`
<p><b>Exception</b> — бағдарламаның қалыпты ағынын бұзатын оқиға: санға айналмайтын жол, жоқ файл, null сілтеме. Exception лақтырылғанда (throw), Java шақыру стегі бойынша жоғары қарай оны ұстайтын (<code>catch</code>) блокты іздейді. Ешкім ұстамаса, бағдарлама stack trace басып тоқтайды.</p>
<pre><code>try {
    int qty = Integer.parseInt("12a");     // NumberFormatException
    System.out.println("never printed");
} catch (NumberFormatException e) {
    System.out.println("Bad number: " + e.getMessage());
} finally {
    System.out.println("always");          // қате болса да, болмаса да орындалады
}</code></pre>
<p>Бірнеше <code>catch</code> жазуға болады — алдымен нақтырақ тип, сосын жалпысы. Бір блокта бірнеше тип: <code>catch (IllegalArgumentException | IllegalStateException e)</code>. <code>finally</code> ресурстарды жабуға арналған; заманауи кодта оның орнына <b>try-with-resources</b> қолданылады: <code>try (Scanner sc = new Scanner(file)) { ... }</code> — ресурс өзі жабылады.</p>
<h3>Checked және unchecked</h3>
<p><b>Checked</b> exception-дар (<code>IOException</code>, <code>Exception</code>-нің RuntimeException емес ұрпақтары) — сыртқы әлемдегі күтуге болатын ақаулар. Компилятор оларды не <code>catch</code> етуді, не әдіс сигнатурасында <code>throws</code> арқылы жариялауды талап етеді. <b>Unchecked</b> (<code>RuntimeException</code> ұрпақтары: <code>NullPointerException</code>, <code>IllegalArgumentException</code>, <code>NumberFormatException</code>, <code>ArithmeticException</code>, <code>ArrayIndexOutOfBoundsException</code>) — әдетте код қатесі, оларды жариялау міндетті емес.</p>
<h3>throw және өз exception класыңыз</h3>
<pre><code>class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) { super(message); }
}

void withdraw(long amount) throws InsufficientFundsException {
    if (amount &lt;= 0) throw new IllegalArgumentException("Bad amount: " + amount);
    if (amount &gt; balance)
        throw new InsufficientFundsException("Not enough: need " + amount + ", have " + balance);
    balance -= amount;
}</code></pre>
<p>Өз exception-ыңыз доменнің тілінде сөйлейді: шақырушы <code>catch (InsufficientFundsException e)</code> деп нақты жағдайды өңдейді. <code>super(message)</code> хабарламаны сақтайды, ол <code>e.getMessage()</code> арқылы оқылады.</p>
<div class="tip">Exception-ды үнсіз жұтпаңыз: бос <code>catch (Exception e) {}</code> қатені жасырады. Тым жалпы <code>catch (Exception e)</code> орнына күтетін нақты типті ұстаңыз.</div>`,
        exercises: [
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Қай exception <b>checked</b>, яғни компилятор оны catch етуді немесе <code>throws</code> арқылы жариялауды талап етеді?', options: ['NullPointerException', 'IllegalArgumentException', 'IOException', 'NumberFormatException'], answer: 2, explain: 'IOException Exception-нан тікелей мұра алады (RuntimeException емес) — checked. Қалған үшеуі RuntimeException ұрпақтары.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Не басып шығарылады?<pre><code>try {\n    System.out.print("A");\n    throw new IllegalStateException();\n} catch (IllegalStateException e) {\n    System.out.print("B");\n} finally {\n    System.out.print("C");\n}\nSystem.out.print("D");</code></pre>', options: ['A', 'AB', 'ABC', 'ABCD'], answer: 3, explain: 'A басылады, exception catch-те ұсталады (B), finally әрқашан орындалады (C), exception өңделгендіктен бағдарлама жалғасады (D).' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте n, сосын n таңбалауыш (token). Әрқайсысын <code>Integer.parseInt</code> арқылы санға айналдырыңыз. Дұрыс сандарды қосып, қатесін (<code>NumberFormatException</code>) санаңыз. Шығыс: <code>SUM s</code> және <code>BAD k</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int sum = 0, bad = 0;
        for (int i = 0; i < n; i++) {
            String tok = sc.next();
            sum += Integer.parseInt(tok);
        }
        System.out.println("SUM " + sum);
        System.out.println("BAD " + bad);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int sum = 0, bad = 0;
        for (int i = 0; i < n; i++) {
            String tok = sc.next();
            try {
                sum += Integer.parseInt(tok);
            } catch (NumberFormatException e) {
                bad++;
            }
        }
        System.out.println("SUM " + sum);
        System.out.println("BAD " + bad);
    }
}
`,
            hints: ['parseInt шақыруын <code>try { ... }</code> ішіне салыңыз.', '<code>catch (NumberFormatException e) { bad++; }</code>'],
            check: { cases: [ { stdin: '5\n10 abc 20 -5 7x\n', out: 'SUM 25\nBAD 2\n' }, { stdin: '2\n1 2\n', out: 'SUM 3\nBAD 0\n' }, { stdin: '1\nhello\n', out: 'SUM 0\nBAD 1\n' } ], mustInclude: ['catch'] } },
          { type: 'java', level: 'hard', xp: 20, prompt: '<code>Wallet.withdraw</code> әдісін аяқтаңыз: сома ≤ 0 болса <code>IllegalArgumentException("Bad amount: " + amount)</code>, жетпесе <code>InsufficientFundsException("Not enough: need " + amount + ", have " + balance)</code> лақтырсын. main әр алу әрекетін try/catch ішінде орындап, қате болса <code>e.getMessage()</code> басады. Соңында <code>BALANCE x</code>.',
            starter: P`import java.util.Scanner;

class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}

class Wallet {
    private long balance;

    Wallet(long balance) {
        this.balance = balance;
    }

    void withdraw(long amount) throws InsufficientFundsException {
        balance -= amount;
    }

    long getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Wallet w = new Wallet(sc.nextInt());
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            long amount = sc.nextInt();
            try {
                w.withdraw(amount);
            } catch (InsufficientFundsException e) {
                System.out.println(e.getMessage());
            }
        }
        System.out.println("BALANCE " + w.getBalance());
    }
}
`,
            solution: P`import java.util.Scanner;

class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}

class Wallet {
    private long balance;

    Wallet(long balance) {
        this.balance = balance;
    }

    void withdraw(long amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Bad amount: " + amount);
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Not enough: need " + amount + ", have " + balance);
        }
        balance -= amount;
    }

    long getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Wallet w = new Wallet(sc.nextInt());
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            long amount = sc.nextInt();
            try {
                w.withdraw(amount);
            } catch (InsufficientFundsException e) {
                System.out.println(e.getMessage());
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            }
        }
        System.out.println("BALANCE " + w.getBalance());
    }
}
`,
            hints: ['withdraw ішінде екі тексеру: алдымен <code>amount &lt;= 0</code>, сосын <code>amount &gt; balance</code>. Баланс тек екеуінен де өткенде азаяды.', 'IllegalArgumentException unchecked, бірақ main оны да ұстауы керек: екінші <code>catch (IllegalArgumentException e)</code> қосыңыз.'],
            check: { cases: [ { stdin: '1000 3\n300 900 700\n', out: 'Not enough: need 900, have 700\nBALANCE 0\n' }, { stdin: '50 1\n100\n', out: 'Not enough: need 100, have 50\nBALANCE 50\n' }, { stdin: '100 2\n-5 40\n', out: 'Bad amount: -5\nBALANCE 60\n' }, { stdin: '10 2\n5 5\n', out: 'BALANCE 0\n' } ], mustInclude: ['throw new InsufficientFundsException'] } }
        ]
      },
      {
        id: 'jv-12', title: 'Generics, lambda және stream', minutes: 16,
        body: P`
<p><b>Generics</b> бір кодты әртүрлі типтермен қауіпсіз қолдануға мүмкіндік береді. <code>ArrayList&lt;String&gt;</code> қолданғанда сіз generic класты пайдаланып отырсыз; енді өзіңіз жазайық:</p>
<pre><code>class Pair&lt;A, B&gt; {
    private final A first;
    private final B second;
    Pair(A first, B second) { this.first = first; this.second = second; }
    A getFirst() { return first; }
    B getSecond() { return second; }
}
Pair&lt;String, Integer&gt; p = new Pair&lt;&gt;("Almaty", 2_200_000);

static &lt;T extends Comparable&lt;T&gt;&gt; T maxOf(List&lt;T&gt; xs) {   // generic әдіс
    T best = xs.get(0);
    for (T x : xs) if (x.compareTo(best) &gt; 0) best = x;
    return best;
}</code></pre>
<p><code>T extends Comparable&lt;T&gt;</code> — шектеу (bound): T салыстыруға келетін тип болуы керек. Generics тек компиляция кезінде тексеріледі; іске қосылғанда тип туралы ақпарат өшіріледі (<b>type erasure</b>), сондықтан <code>new T()</code> жазуға болмайды.</p>
<h3>Lambda</h3>
<p>Lambda — бір әдісі бар interface-тің (<b>functional interface</b>) қысқа жазбасы: <code>(параметрлер) -&gt; өрнек</code>.</p>
<pre><code>Predicate&lt;Integer&gt; isBig = x -&gt; x &gt; 100000;        // boolean test(x)
Function&lt;String, Integer&gt; len = s -&gt; s.length();      // R apply(x)
Comparator&lt;Student&gt; byScore = (a, b) -&gt; b.score - a.score;   // кему бойынша

students.sort((a, b) -&gt; {
    if (a.score != b.score) return b.score - a.score;  // алдымен балл кемуі
    return a.name.compareTo(b.name);                   // тең болса, аты бойынша
});</code></pre>
<p>Comparator теріс сан қайтарса, <code>a</code> алдында тұрады, оң болса — <code>b</code>. <b>Method reference</b> — lambda-ның тағы да қысқа түрі: <code>String::length</code>, <code>Integer::sum</code>.</p>
<h3>Stream</h3>
<p>Stream — коллекцияны «конвейер» арқылы өңдеу: filter → map → нәтиже. Бастапқы коллекция өзгермейді.</p>
<pre><code>int[] prices = {1200, 45000, 800, 150000, 45000};
long expensive = Arrays.stream(prices).filter(p -&gt; p &gt; 10000).count();        // 3
int total = Arrays.stream(prices).sum();
int[] uniq = Arrays.stream(prices).distinct().sorted().toArray();           // [800, 1200, 45000, 150000]
List&lt;String&gt; names = students.stream()
    .filter(s -&gt; s.score &gt;= 90)
    .map(s -&gt; s.name)
    .collect(Collectors.toList());</code></pre>
<div class="tip">Stream оқуға ыңғайлы, бірақ кез келген циклді stream-ге айналдырудың қажеті жоқ. Қарапайым әрі жылдам цикл көбіне түсініктірек. Ал Spark-тың Java/Scala API-і дәл осы filter/map стилінде жазылады.</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: '<code>Predicate&lt;Integer&gt; p = x -&gt; x % 2 == 0;</code> болса, <code>p.test(7)</code> не қайтарады?', options: ['true', 'false', '1', 'Компиляция қатесі'], answer: 1, explain: 'Lambda 7 % 2 == 0 өрнегін есептейді: 1 == 0 — false.' },
          { type: 'number', level: 'medium', xp: 10, prompt: 'Нәтиже неге тең?<pre><code>int r = IntStream.rangeClosed(1, 6)\n    .filter(x -&gt; x % 2 == 0)\n    .map(x -&gt; x * x)\n    .sum();</code></pre>', answer: 56, tol: 0, explain: 'Жұптар: 2, 4, 6. Квадраттары: 4, 16, 36. Қосындысы 56.' },
          { type: 'java', level: 'medium', xp: 20, prompt: 'Кірісте n, сосын n жол <code>аты балл</code>. Студенттерді балл бойынша <b>кему</b> ретімен, балл тең болса аты бойынша әліпби ретімен сұрыптап, <code>аты балл</code> түрінде басыңыз. <code>list.sort</code> ішіне lambda comparator жазыңыз.',
            starter: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    static class Student {
        String name;
        int score;
        Student(String name, int score) { this.name = name; this.score = score; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Student> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String name = sc.next();
            int score = sc.nextInt();
            list.add(new Student(name, score));
        }
        // list.sort(...) жазыңыз
        for (Student s : list) {
            System.out.println(s.name + " " + s.score);
        }
    }
}
`,
            solution: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    static class Student {
        String name;
        int score;
        Student(String name, int score) { this.name = name; this.score = score; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Student> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String name = sc.next();
            int score = sc.nextInt();
            list.add(new Student(name, score));
        }
        list.sort((a, b) -> {
            if (a.score != b.score) return b.score - a.score;
            return a.name.compareTo(b.name);
        });
        for (Student s : list) {
            System.out.println(s.name + " " + s.score);
        }
    }
}
`,
            hints: ['Кему ретімен: <code>b.score - a.score</code>.', 'Балл тең болғанда: <code>return a.name.compareTo(b.name);</code>'],
            check: { cases: [ { stdin: '4\nAruzhan 90\nDaniyar 85\nAibek 90\nZhanna 70\n', out: 'Aibek 90\nAruzhan 90\nDaniyar 85\nZhanna 70\n' }, { stdin: '1\nA 1\n', out: 'A 1\n' }, { stdin: '3\nc 5\nb 5\na 5\n', out: 'a 5\nb 5\nc 5\n' } ], mustInclude: ['->'] } },
          { type: 'java', level: 'hard', xp: 20, prompt: 'Кірісте n, сосын n бүтін сан. <code>Arrays.stream</code> арқылы <b>жұп</b> сандарды алып, қайталануын жойып, өсу ретімен сұрыптаңыз да, бір жолға бос орынмен басыңыз. Жұп сан болмаса — <code>NONE</code>. Мысал: <code>4 3 8 4 -2 7 8</code> → <code>-2 4 8</code>.',
            starter: P`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int[] evens = a;   // stream арқылы есептеңіз
        if (evens.length == 0) {
            System.out.println("NONE");
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int x : evens) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(x);
        }
        System.out.println(sb);
    }
}
`,
            solution: P`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int[] evens = Arrays.stream(a)
                .filter(x -> x % 2 == 0)
                .distinct()
                .sorted()
                .toArray();
        if (evens.length == 0) {
            System.out.println("NONE");
            return;
        }
        StringBuilder sb = new StringBuilder();
        for (int x : evens) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(x);
        }
        System.out.println(sb);
    }
}
`,
            hints: ['<code>Arrays.stream(a).filter(x -&gt; x % 2 == 0)</code> — теріс жұп сандар да % 2 == 0 береді.', 'Әрі қарай <code>.distinct().sorted().toArray()</code>.'],
            check: { cases: [ { stdin: '7\n4 3 8 4 -2 7 8\n', out: '-2 4 8\n' }, { stdin: '2\n1 3\n', out: 'NONE\n' }, { stdin: '1\n0\n', out: '0\n' } ], mustInclude: ['stream', 'filter'] } }
        ]
      },
      {
        id: 'jv-13', title: 'Scanner тереңірек және рекурсия', minutes: 15,
        body: P`
<h3>Scanner: next, nextInt, nextLine</h3>
<p><code>next()</code> мен <code>nextInt()</code> бос орындарды (пробел, жаңа жол) өткізіп, келесі <b>таңбалауышты</b> (token) оқиды. <code>nextLine()</code> ағымдағы жолдың <b>қалғанын</b> оқиды. Осыдан белгілі қақпан шығады:</p>
<pre><code>// Кіріс:
// 3
// Almaty Astana Shymkent
int n = sc.nextInt();        // 3 оқылды, курсор "3"-тен кейін, жол соңында тұр
String line = sc.nextLine(); // "" — бірінші жолдың қалғаны (бос)!
line = sc.nextLine();        // "Almaty Astana Shymkent"</code></pre>
<p>Шешімі: nextInt-тен кейін бір «бос» <code>nextLine()</code> шақыру, не барлығын token бойынша оқу. Санның қанша екені белгісіз болса, <code>hasNextInt()</code> қолданылады — ол келесі token бүтін сан ба, соны тексереді, кіріс біткенде немесе сан емес token кездескенде <code>false</code> қайтарады:</p>
<pre><code>long sum = 0;
while (sc.hasNextInt()) {
    sum += sc.nextInt();
}</code></pre>
<h3>Рекурсия</h3>
<p>Рекурсия — әдістің өзін-өзі шақыруы. Әр рекурсивті әдісте екі бөлік бар: <b>базалық жағдай</b> (тоқтау шарты) және есепті кішірейтетін <b>рекурсивті қадам</b>.</p>
<pre><code>static long factorial(int n) {
    if (n &lt;= 1) return 1;            // базалық жағдай
    return n * factorial(n - 1);     // кішірек есеп
}</code></pre>
<p>Әр шақыру <b>call stack</b>-ке жаңа фрейм қосады. Базалық жағдай ұмытылса немесе тереңдік тым үлкен болса, <code>StackOverflowError</code> пайда болады. Наивті Fibonacci <code>fib(n) = fib(n-1) + fib(n-2)</code> бір мәнді қайта-қайта есептейді, шақырулар саны экспоненциалды өседі; есептелген мәндерді массивте сақтау (<b>memoization</b>) оны O(n) етеді.</p>
<h3>Backtracking</h3>
<p>Рекурсия «барлық нұсқаны тексеру» есептеріне табиғи сәйкес келеді: әр қадамда таңдау жасаймыз, рекурсияға түсеміз, сосын таңдауды кері қайтарамыз. Мысалы, ұзындығы n екілік жолдарды құрастыру:</p>
<pre><code>static void gen(StringBuilder cur, int n) {
    if (cur.length() == n) { System.out.println(cur); return; }
    for (char c : new char[]{'0', '1'}) {
        cur.append(c);                      // таңдау
        gen(cur, n);                        // тереңдеу
        cur.deleteCharAt(cur.length() - 1); // кері қайтару
    }
}</code></pre>
<div class="tip">Рекурсия жазбас бұрын екі сұраққа жауап беріңіз: «ең кіші кіріс қандай және оның жауабы не?» және «n үшін жауапты n−1 (немесе n/2) жауабы арқылы қалай аламын?».</div>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Кіріс <code>5</code> жаңа жол <code>Almaty Astana</code>. Мына кодтан кейін <code>line</code> неге тең?<pre><code>int n = sc.nextInt();\nString line = sc.nextLine();</code></pre>', options: ['"Almaty Astana"', '"" (бос жол)', '"Almaty"', '"5"'], answer: 1, explain: 'nextInt тек 5-ті оқиды, курсор бірінші жолдың соңында қалады. nextLine сол жолдың қалғанын — бос жолды қайтарады.' },
          { type: 'number', level: 'hard', xp: 10, prompt: 'Наивті <code>fib(n)</code> (<code>n &lt;= 1</code> болса n қайтарады, әйтпесе <code>fib(n-1) + fib(n-2)</code>) үшін <code>fib(5)</code> шақырылса, әдіс барлығы неше рет шақырылады (бірінші шақыруды қоса)?', answer: 15, tol: 0, explain: 'C(0) = C(1) = 1, C(n) = 1 + C(n−1) + C(n−2): C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 15.' },
          { type: 'java', level: 'easy', xp: 15, prompt: 'Кірісте белгісіз мөлшерде бүтін сан бар (бірнеше жолда болуы мүмкін); сан емес token кездессе немесе кіріс бітсе, оқуды тоқтатыңыз. <code>hasNextInt()</code> арқылы оқып, бір жолға <code>қосынды саны</code> басыңыз. Мысал: <code>1 2 3</code> → <code>6 3</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long sum = 0;
        int count = 0;
        // hasNextInt циклін жазыңыз
        System.out.println(sum + " " + count);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long sum = 0;
        int count = 0;
        while (sc.hasNextInt()) {
            sum += sc.nextInt();
            count++;
        }
        System.out.println(sum + " " + count);
    }
}
`,
            hints: ['<code>while (sc.hasNextInt())</code> — келесі token сан болғанша.', 'Ішінде <code>sum += sc.nextInt(); count++;</code>'],
            check: { cases: [ { stdin: '1 2 3\n', out: '6 3\n' }, { stdin: '\n', out: '0 0\n' }, { stdin: '10\n-4\n5 abc 7\n', out: '11 3\n' } ], mustInclude: ['hasNextInt'] } },
          { type: 'java', level: 'hard', xp: 20, prompt: 'Кірісте n (1 ≤ n ≤ 12). Ұзындығы n, <b>қатар тұрған екі 1 жоқ</b> барлық екілік жолдарды лексикографиялық ретпен (әр жол бөлек) рекурсия арқылы басыңыз. n = 3: <code>000 001 010 100 101</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    static void gen(StringBuilder cur, int n) {
        // рекурсияны жазыңыз
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        gen(new StringBuilder(), n);
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    static void gen(StringBuilder cur, int n) {
        if (cur.length() == n) {
            System.out.println(cur);
            return;
        }
        cur.append('0');
        gen(cur, n);
        cur.deleteCharAt(cur.length() - 1);
        if (cur.length() == 0 || cur.charAt(cur.length() - 1) != '1') {
            cur.append('1');
            gen(cur, n);
            cur.deleteCharAt(cur.length() - 1);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        gen(new StringBuilder(), n);
    }
}
`,
            hints: ['Базалық жағдай: <code>cur.length() == n</code> — басып шығарып, return.', 'Алдымен 0 қосып тереңдеңіз (лексикографиялық рет үшін), сосын соңғы символ 1 болмаса ғана 1 қосыңыз. Әр тармақтан кейін <code>deleteCharAt</code>.'],
            check: { cases: [ { stdin: '3\n', out: '000\n001\n010\n100\n101\n' }, { stdin: '1\n', out: '0\n1\n' }, { stdin: '2\n', out: '00\n01\n10\n' } ] } }
        ]
      },
      {
        id: 'jv-p1', title: 'Есептер жинағы 1: Оңай → Орташа', minutes: 35,
        body: P`
<p>Бұл сабақта жаңа тақырып жоқ: бұрын үйренгеніңізді DSA-стильді есептерде қолданасыз. Есептер оңайдан орташаға қарай орналасқан. Әрқайсысын шешпес бұрын үш нәрсе жасаңыз:</p>
<ul>
<li><b>Кіріс пішімін</b> анықтаңыз: алдымен не келеді (n, сосын массив?), қандай типпен оқу керек.</li>
<li><b>Шеткі жағдайларды</b> ойлаңыз: бір элемент, бәрі бірдей, жауап жоқ.</li>
<li><b>Күрделілікті</b> бағалаңыз: n = 10⁵ болса, O(n²) тым баяу — HashMap/HashSet O(n) береді.</li>
</ul>
<h3>Пайдалы үлгілер</h3>
<pre><code>// жиілік санау (тек кіші латын әріптері)
int[] cnt = new int[26];
for (char c : s.toCharArray()) cnt[c - 'a']++;

// "бұрын көрдім бе?" + индекс
Map&lt;Integer, Integer&gt; pos = new HashMap&lt;&gt;();
if (pos.containsKey(need)) { ... }
pos.putIfAbsent(x, i);

// екі көрсеткіш (two pointers)
int i = 0, j = s.length() - 1;
while (i &lt; j) { ...; i++; j--; }</code></pre>
<p><code>c - 'a'</code> трюгі: char Java-да сан ретінде де жұмыс істейді, <code>'c' - 'a' == 2</code>. Сондықтан 26 ұяшықты массив кіші латын әріптерінің жиілігін HashMap-тен жылдамырақ санайды. <code>Character.toLowerCase(c)</code> регистрді біріздендіреді.</p>
<p>Two Sum есебіндегі негізгі идея: әр <code>a[j]</code> үшін «маған <code>target − a[j]</code> керек, ол бұрын кездесті ме?» деп HashMap-тен сұраймыз. Бұл O(n²) жұп іздеуді O(n)-ге түсіреді — сұхбаттарда ең жиі сұралатын трюктердің бірі.</p>
<div class="tip">Шығыс пішіміне мұқият болыңыз: тест мәтінді дәл салыстырады. <code>YES</code> мен <code>Yes</code> — әртүрлі жауап.</div>`,
        exercises: [
          { type: 'java', level: 'easy', xp: 15, prompt: '<b>FizzBuzz.</b> Кірісте n. 1-ден n-ге дейінгі әр сан үшін бөлек жолға: 15-ке бөлінсе <code>FizzBuzz</code>, 3-ке — <code>Fizz</code>, 5-ке — <code>Buzz</code>, әйтпесе санның өзі.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 1; i <= n; i++) {
            if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
`,
            hints: ['Шарттардың реті маңызды: 15 бірінші тексерілуі керек.', '<code>if (i % 15 == 0)</code> тармағын ең басына қосыңыз.'],
            check: { cases: [ { stdin: '5\n', out: '1\n2\nFizz\n4\nBuzz\n' }, { stdin: '15\n', out: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n' }, { stdin: '1\n', out: '1\n' } ] } },
          { type: 'java', level: 'easy', xp: 15, prompt: '<b>Палиндром.</b> Кірісте бір сөз (латын әріптері). Үлкен-кіші әріпті ескермегенде ол алдынан да, артынан да бірдей оқылса <code>YES</code>, әйтпесе <code>NO</code>. Екі көрсеткіш (two pointers) қолданыңыз: <code>Level</code> → <code>YES</code>.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        boolean ok = false;
        System.out.println(ok ? "YES" : "NO");
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next().toLowerCase();
        boolean ok = true;
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                ok = false;
                break;
            }
            i++;
            j--;
        }
        System.out.println(ok ? "YES" : "NO");
    }
}
`,
            hints: ['Алдымен <code>toLowerCase()</code>.', '<code>i = 0, j = length − 1</code>; <code>i &lt; j</code> болғанша салыстырып, ортаға қарай жылжыңыз.'],
            check: { cases: [ { stdin: 'Level\n', out: 'YES\n' }, { stdin: 'java\n', out: 'NO\n' }, { stdin: 'a\n', out: 'YES\n' }, { stdin: 'abca\n', out: 'NO\n' } ] } },
          { type: 'java', level: 'medium', xp: 15, prompt: '<b>Анаграмма.</b> Кірісте кіші латын әріптерінен тұратын екі сөз. Олар бір әріптерден (бірдей санмен) құралса <code>YES</code>, әйтпесе <code>NO</code>. <code>int[26]</code> жиілік массивін қолданыңыз.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.next();
        String b = sc.next();
        System.out.println(a.length() == b.length() ? "YES" : "NO");
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.next();
        String b = sc.next();
        int[] cnt = new int[26];
        for (char c : a.toCharArray()) cnt[c - 'a']++;
        for (char c : b.toCharArray()) cnt[c - 'a']--;
        boolean ok = true;
        for (int x : cnt) {
            if (x != 0) ok = false;
        }
        System.out.println(ok ? "YES" : "NO");
    }
}
`,
            hints: ['Бірінші сөздің әріптерін <code>cnt[c - \'a\']++</code>, екіншісінікін <code>--</code>.', 'Соңында барлық ұяшық 0 болса — анаграмма.'],
            check: { cases: [ { stdin: 'listen silent\n', out: 'YES\n' }, { stdin: 'abc abd\n', out: 'NO\n' }, { stdin: 'aab abb\n', out: 'NO\n' }, { stdin: 'aab ab\n', out: 'NO\n' } ] } },
          { type: 'java', level: 'hard', xp: 20, prompt: '<b>Two Sum.</b> Кірісте <code>n target</code>, сосын n сан. Солдан оңға жүріп, <code>a[i] + a[j] = target</code> (i &lt; j) болатын <b>ең кіші j</b>-ны табыңыз, ал i — сол мәннің ең бірінші кездескен индексі. <code>i j</code> басыңыз, жұп жоқ болса <code>-1 -1</code>. O(n) шешім үшін HashMap қолданыңыз.',
            starter: P`import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        Map<Integer, Integer> pos = new HashMap<>();
        for (int j = 0; j < n; j++) {
            int x = sc.nextInt();
        }
        System.out.println("-1 -1");
    }
}
`,
            solution: P`import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        Map<Integer, Integer> pos = new HashMap<>();
        for (int j = 0; j < n; j++) {
            int x = sc.nextInt();
            int need = target - x;
            if (pos.containsKey(need)) {
                System.out.println(pos.get(need) + " " + j);
                return;
            }
            pos.putIfAbsent(x, j);
        }
        System.out.println("-1 -1");
    }
}
`,
            hints: ['Әр x үшін <code>need = target − x</code> map-та бар ма, тексеріңіз — сосын ғана x-ті қосыңыз.', '<code>putIfAbsent(x, j)</code> мәннің бірінші индексін сақтайды.'],
            check: { cases: [ { stdin: '4 9\n2 7 11 15\n', out: '0 1\n' }, { stdin: '3 6\n3 2 4\n', out: '1 2\n' }, { stdin: '2 10\n5 4\n', out: '-1 -1\n' }, { stdin: '3 6\n3 3 3\n', out: '0 1\n' } ] } },
          { type: 'number', level: 'medium', xp: 10, prompt: 'Сұрыпталған 1 000 000 элементті массивте binary search ең нашар жағдайда шамамен неше салыстыру жасайды? (бүтін санға дөңгелектеңіз)', answer: 20, tol: 0, explain: 'Әр қадамда іздеу аймағы екі есе кішірейеді: log₂(10⁶) ≈ 19.93, яғни 20 қадам.' }
        ]
      },
      {
        id: 'jv-p2', title: 'Есептер жинағы 2: Орташа → Қиын', minutes: 50,
        body: P`
<p>Екінші жинақтағы есептер деректер құрылымын дұрыс таңдауды талап етеді. Java-да олардың бәрі дайын тұр:</p>
<table>
<tr><th>Құрылым</th><th>Java класы</th><th>Негізгі әдістер</th></tr>
<tr><td>Stack</td><td><code>ArrayDeque&lt;Character&gt;</code></td><td><code>push</code>, <code>pop</code>, <code>peek</code>, <code>isEmpty</code></td></tr>
<tr><td>Queue</td><td><code>ArrayDeque&lt;int[]&gt;</code></td><td><code>offer</code>, <code>poll</code>, <code>isEmpty</code></td></tr>
<tr><td>Sliding window</td><td><code>HashMap</code> / <code>int[128]</code></td><td>соңғы көрінген индекс</td></tr>
<tr><td>DP кестесі</td><td><code>int[]</code>, <code>int[][]</code></td><td><code>Arrays.fill</code></td></tr>
</table>
<p>Ескі <code>Stack</code> класының орнына <code>ArrayDeque</code> ұсынылады: ол жылдамырақ және stack те, queue де бола алады.</p>
<h3>BFS үлгісі</h3>
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
        if (nr &lt; 0 || nr &gt;= r || nc &lt; 0 || nc &gt;= c) continue;   // шекараны ӘРҚАШАН тексеріңіз
        if (grid[nr].charAt(nc) == '#' || dist[nr][nc] != -1) continue;
        dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
        q.offer(new int[]{nr, nc});
    }
}</code></pre>
<p>BFS салмақсыз торда ең қысқа жолды береді, себебі ол ұяшықтарды қашықтық ретімен ашады. Күрделілігі O(R·C).</p>
<h3>Динамикалық бағдарламалау</h3>
<p>Coin change есебінде <code>dp[x]</code> — x соманы жинайтын ең аз монета саны. <code>dp[0] = 0</code>, қалғаны «шексіздік», ал әр x үшін <code>dp[x] = min(dp[x − coin] + 1)</code>. Greedy тәсіл (әр қадамда ең үлкен монетаны алу) әрқашан дұрыс емес: {1, 5, 10, 21} монеталарымен 30 соманы greedy 21 + 5 + 1 + 1 + 1 + 1 = 6 монетамен жинайды, ал оптимум 10 + 10 + 10 = 3 монета.</p>
<div class="tip">Binary search-те ортасын <code>mid = lo + (hi - lo) / 2</code> деп есептеңіз: <code>(lo + hi) / 2</code> үлкен индекстерде int overflow береді.</div>`,
        exercises: [
          { type: 'java', level: 'medium', xp: 15, prompt: '<b>Жақшалар балансы.</b> Кірісте <code>()[]{}</code> символдарынан тұратын бір жол. Әр ашылған жақша дұрыс ретпен сәйкес жабылса <code>YES</code>, әйтпесе <code>NO</code>. <code>ArrayDeque</code> stack ретінде қолданыңыз.',
            starter: P`import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        Deque<Character> st = new ArrayDeque<>();
        boolean ok = s.length() % 2 == 0;
        System.out.println(ok ? "YES" : "NO");
    }
}
`,
            solution: P`import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        Deque<Character> st = new ArrayDeque<>();
        boolean ok = true;
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.isEmpty()) { ok = false; break; }
                char open = st.pop();
                if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) {
                    ok = false;
                    break;
                }
            }
        }
        if (!st.isEmpty()) ok = false;
        System.out.println(ok ? "YES" : "NO");
    }
}
`,
            hints: ['Ашылатын жақшаны <code>push</code>, жабылатынында stack бос емес екенін тексеріп, <code>pop</code> жасап, жұбын салыстырыңыз.', 'Соңында stack бос болуы керек: <code>(((</code> → NO.'],
            check: { cases: [ { stdin: '([]{})\n', out: 'YES\n' }, { stdin: '([)]\n', out: 'NO\n' }, { stdin: '((((\n', out: 'NO\n' }, { stdin: '}{\n', out: 'NO\n' } ] } },
          { type: 'java', level: 'medium', xp: 15, prompt: '<b>Binary search.</b> Кірісте n, сосын өсу ретімен сұрыпталған n әртүрлі сан, сосын q және q сұрау. Әр сұрау үшін санның индексін (0-ден) немесе <code>-1</code> басыңыз. Өз binary search-іңізді жазыңыз.',
            starter: P`import java.util.Scanner;

public class Main {
    static int find(int[] a, int x) {
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            System.out.println(find(a, sc.nextInt()));
        }
    }
}
`,
            solution: P`import java.util.Scanner;

public class Main {
    static int find(int[] a, int x) {
        int lo = 0, hi = a.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] == x) return mid;
            if (a[mid] < x) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            System.out.println(find(a, sc.nextInt()));
        }
    }
}
`,
            hints: ['<code>lo = 0, hi = n − 1</code>, <code>while (lo &lt;= hi)</code>.', 'a[mid] &lt; x болса <code>lo = mid + 1</code>, әйтпесе <code>hi = mid − 1</code>.'],
            check: { cases: [ { stdin: '6\n1 3 5 7 9 11\n4\n7 1 11 4\n', out: '3\n0\n5\n-1\n' }, { stdin: '1\n5\n2\n5 6\n', out: '0\n-1\n' }, { stdin: '3\n-10 0 10\n1\n-10\n', out: '0\n' } ] } },
          { type: 'java', level: 'hard', xp: 20, prompt: '<b>Қайталанбайтын ең ұзын ішкі жол.</b> Кірісте латын әріптері мен цифрлардан тұратын бір жол. Ішінде бірде-бір символ қайталанбайтын ең ұзын <b>үздіксіз</b> бөліктің ұзындығын басыңыз: <code>abcabcbb</code> → <code>3</code>. O(n) sliding window жазыңыз.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int best = 1;
        System.out.println(best);
    }
}
`,
            solution: P`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int[] last = new int[128];
        Arrays.fill(last, -1);
        int best = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (last[c] >= left) {
                left = last[c] + 1;
            }
            last[c] = right;
            best = Math.max(best, right - left + 1);
        }
        System.out.println(best);
    }
}
`,
            hints: ['<code>last[c]</code> — c символының соңғы көрінген индексі (бастапқыда −1).', 'Егер <code>last[c] &gt;= left</code> болса, терезенің сол шетін <code>last[c] + 1</code>-ге жылжытыңыз; әр қадамда <code>right − left + 1</code> ұзындықты салыстырыңыз.'],
            check: { cases: [ { stdin: 'abcabcbb\n', out: '3\n' }, { stdin: 'bbbb\n', out: '1\n' }, { stdin: 'pwwkew\n', out: '3\n' }, { stdin: 'abba\n', out: '2\n' }, { stdin: 'Kaspi2024\n', out: '7\n' } ] } },
          { type: 'java', level: 'hard', xp: 20, prompt: '<b>Coin change.</b> Кірісте <code>n amount</code>, сосын n монета номиналы (әрқайсысынан шексіз). <code>amount</code> соманы жинайтын ең аз монета санын басыңыз, мүмкін болмаса <code>-1</code>. Greedy емес, DP қолданыңыз.',
            starter: P`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int amount = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();
        // greedy: ең үлкен монетадан бастау (дұрыс емес!)
        java.util.Arrays.sort(coins);
        int count = 0, rest = amount;
        for (int i = n - 1; i >= 0; i--) {
            count += rest / coins[i];
            rest %= coins[i];
        }
        System.out.println(rest == 0 ? count : -1);
    }
}
`,
            solution: P`import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int amount = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();
        final int INF = Integer.MAX_VALUE / 2;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int x = 1; x <= amount; x++) {
            for (int c : coins) {
                if (c <= x && dp[x - c] + 1 < dp[x]) {
                    dp[x] = dp[x - c] + 1;
                }
            }
        }
        System.out.println(dp[amount] >= INF ? -1 : dp[amount]);
    }
}
`,
            hints: ['<code>dp[0] = 0</code>, қалғаны үлкен сан (INF). Overflow болмас үшін <code>Integer.MAX_VALUE / 2</code>.', 'Әр x және әр монета c ≤ x үшін: <code>dp[x] = min(dp[x], dp[x − c] + 1)</code>.'],
            check: { cases: [ { stdin: '3 11\n1 2 5\n', out: '3\n' }, { stdin: '1 3\n2\n', out: '-1\n' }, { stdin: '4 30\n1 5 10 21\n', out: '3\n' }, { stdin: '2 0\n1 2\n', out: '0\n' } ] } },
          { type: 'java', level: 'hard', xp: 20, prompt: '<b>Тордағы ең қысқа жол.</b> Кірісте <code>r c</code>, сосын r жол: <code>.</code> — бос, <code>#</code> — қабырға. Сол жақ жоғарғы бұрыштан оң жақ төменгі бұрышқа дейін (төрт бағытпен) ең аз қадам санын басыңыз; жету мүмкін болмаса немесе бұрыш қабырға болса <code>-1</code>. BFS қолданыңыз.',
            starter: P`import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt(), c = sc.nextInt();
        String[] grid = new String[r];
        for (int i = 0; i < r; i++) grid[i] = sc.next();
        // Манхэттен қашықтығы қабырғаларды ескермейді
        System.out.println((r - 1) + (c - 1));
    }
}
`,
            solution: P`import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt(), c = sc.nextInt();
        String[] grid = new String[r];
        for (int i = 0; i < r; i++) grid[i] = sc.next();
        if (grid[0].charAt(0) == '#' || grid[r - 1].charAt(c - 1) == '#') {
            System.out.println(-1);
            return;
        }
        int[][] dist = new int[r][c];
        for (int[] row : dist) Arrays.fill(row, -1);
        ArrayDeque<int[]> q = new ArrayDeque<>();
        q.offer(new int[]{0, 0});
        dist[0][0] = 0;
        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int k = 0; k < 4; k++) {
                int nr = cur[0] + dr[k], nc = cur[1] + dc[k];
                if (nr < 0 || nr >= r || nc < 0 || nc >= c) continue;
                if (grid[nr].charAt(nc) == '#' || dist[nr][nc] != -1) continue;
                dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
                q.offer(new int[]{nr, nc});
            }
        }
        System.out.println(dist[r - 1][c - 1]);
    }
}
`,
            hints: ['<code>dist</code> массивін −1-мен толтырыңыз: −1 «әлі барылмаған» дегенді білдіреді.', 'Көршіні кезекке қоспас бұрын шекараны, қабырғаны және dist == −1 екенін тексеріңіз. Жауап — <code>dist[r−1][c−1]</code>.'],
            check: { cases: [ { stdin: '3 3\n...\n.#.\n...\n', out: '4\n' }, { stdin: '3 4\n..#.\n#.#.\n#...\n', out: '5\n' }, { stdin: '2 2\n.#\n#.\n', out: '-1\n' }, { stdin: '1 1\n.\n', out: '0\n' } ] } }
        ]
      },
      {
        id: 'jv-gate', gate: true, title: 'Модуль емтиханы: Java', minutes: 40,
        body: P`
<p>Қорытынды емтихан: тілдің негізгі ережелері бойынша үш сұрақ және үш бағдарлама (коллекциялар, полиморфизм, lambda-мен сұрыптау). Өту шегі — 75%.</p>
<ul>
<li>Кіріс пішімін мұқият оқыңыз және тек сұралған мәтінді басып шығарыңыз.</li>
<li>Қай құрылым керек екенін алдын ала шешіңіз: List, Map, Set, массив.</li>
<li>Шеткі жағдайларды тексеріңіз: бос нәтиже, тең мәндер, жетпейтін қор.</li>
</ul>`,
        exercises: [
          { type: 'quiz', level: 'easy', xp: 15, prompt: 'Не басып шығарылады?<pre><code>String s = "data";\ns.toUpperCase();\nSystem.out.println(s);</code></pre>', options: ['DATA', 'data', 'Data', 'Компиляция қатесі'], answer: 1, explain: 'String immutable: toUpperCase() жаңа жол қайтарады, бірақ ол ешқайда сақталмады. s бұрынғыдай "data". Дұрысы: <code>s = s.toUpperCase();</code>' },
          { type: 'quiz', level: 'hard', xp: 15, prompt: '<code>Point</code> класында <code>x</code>, <code>y</code> өрістері бар, бірақ <code>equals</code> мен <code>hashCode</code> қайта жазылмаған. Не басып шығарылады?<pre><code>Set&lt;Point&gt; s = new HashSet&lt;&gt;();\ns.add(new Point(1, 2));\ns.add(new Point(1, 2));\nSystem.out.println(s.size());</code></pre>', options: ['1', '2', '0', 'Компиляция қатесі'], answer: 1, explain: 'Әдепкі equals/hashCode объектінің мәніне емес, сілтемесіне негізделген. Екі бөлек объект — екі элемент. Мән бойынша салыстыру үшін екеуін де қайта жазу керек.' },
          { type: 'number', level: 'hard', xp: 15, prompt: '<code>f(5)</code> неге тең?<pre><code>static int f(int n) {\n    if (n &lt;= 1) return 1;\n    return f(n - 1) + 2 * f(n - 2);\n}</code></pre>', answer: 21, tol: 0, explain: 'f(0) = f(1) = 1, f(2) = 1 + 2 = 3, f(3) = 3 + 2 = 5, f(4) = 5 + 6 = 11, f(5) = 11 + 10 = 21.' },
          { type: 'java', level: 'medium', xp: 25, prompt: '<b>Қойма.</b> Кірісте q, сосын q команда: <code>ADD тауар саны</code> немесе <code>SELL тауар саны</code>. SELL кезінде қорда жеткіліксіз болса, ештеңе өзгертпей <code>ERROR тауар</code> басыңыз. Соңында қалдығы 0-ден көп тауарларды әліпби бойынша <code>тауар саны</code> түрінде басыңыз; ондай тауар жоқ болса — <code>EMPTY</code>.',
            starter: P`import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt();
        Map<String, Integer> stock = new TreeMap<>();
        for (int i = 0; i < q; i++) {
            String cmd = sc.next();
            String item = sc.next();
            int qty = sc.nextInt();
            // командаларды өңдеңіз
        }
        System.out.println("EMPTY");
    }
}
`,
            solution: P`import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt();
        Map<String, Integer> stock = new TreeMap<>();
        for (int i = 0; i < q; i++) {
            String cmd = sc.next();
            String item = sc.next();
            int qty = sc.nextInt();
            int have = stock.getOrDefault(item, 0);
            if (cmd.equals("ADD")) {
                stock.put(item, have + qty);
            } else if (have < qty) {
                System.out.println("ERROR " + item);
            } else {
                stock.put(item, have - qty);
            }
        }
        boolean any = false;
        for (Map.Entry<String, Integer> e : stock.entrySet()) {
            if (e.getValue() > 0) {
                System.out.println(e.getKey() + " " + e.getValue());
                any = true;
            }
        }
        if (!any) System.out.println("EMPTY");
    }
}
`,
            hints: ['<code>have = stock.getOrDefault(item, 0)</code> — жоқ тауардың қоры 0.', 'Соңында тек <code>getValue() &gt; 0</code> жазбаларды басыңыз; бірде-біреуі басылмаса EMPTY.'],
            check: { cases: [ { stdin: '5\nADD milk 10\nADD bread 3\nSELL milk 4\nSELL bread 5\nSELL bread 3\n', out: 'ERROR bread\nmilk 6\n' }, { stdin: '1\nSELL tea 1\n', out: 'ERROR tea\nEMPTY\n' }, { stdin: '3\nADD b 1\nADD a 2\nADD b 1\n', out: 'a 2\nb 2\n' } ] } },
          { type: 'java', level: 'hard', xp: 25, prompt: '<b>Жалақы ведомосы.</b> <code>Employee</code> abstract класы дайын. <code>Salaried</code> (айлық <code>salary</code>) және <code>Hourly</code> (<code>rate</code>, <code>hours</code>; 160 сағатқа дейін rate·hours, 160-тан асқан әр сағат 1.5 есе: <code>rate·160 + rate·(hours−160)·3/2</code>, бүтін бөлу) кластарын жазыңыз. Кіріс: n, сосын n жол <code>S аты salary</code> немесе <code>H аты rate hours</code>. Әр қызметкерді кіріс ретімен <code>аты pay</code> басыңыз, соңында <code>TOTAL x</code>.',
            starter: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

abstract class Employee {
    protected String name;
    Employee(String name) { this.name = name; }
    abstract long pay();
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Employee> staff = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            String name = sc.next();
            if (kind.equals("S")) {
                long salary = sc.nextInt();
            } else {
                long rate = sc.nextInt();
                long hours = sc.nextInt();
            }
        }
        long total = 0;
        for (Employee e : staff) {
            System.out.println(e.name + " " + e.pay());
            total += e.pay();
        }
        System.out.println("TOTAL " + total);
    }
}
`,
            solution: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

abstract class Employee {
    protected String name;
    Employee(String name) { this.name = name; }
    abstract long pay();
}

class Salaried extends Employee {
    private long salary;
    Salaried(String name, long salary) {
        super(name);
        this.salary = salary;
    }
    @Override
    long pay() { return salary; }
}

class Hourly extends Employee {
    private long rate, hours;
    Hourly(String name, long rate, long hours) {
        super(name);
        this.rate = rate;
        this.hours = hours;
    }
    @Override
    long pay() {
        if (hours <= 160) return rate * hours;
        return rate * 160 + rate * (hours - 160) * 3 / 2;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Employee> staff = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            String name = sc.next();
            if (kind.equals("S")) {
                long salary = sc.nextInt();
                staff.add(new Salaried(name, salary));
            } else {
                long rate = sc.nextInt();
                long hours = sc.nextInt();
                staff.add(new Hourly(name, rate, hours));
            }
        }
        long total = 0;
        for (Employee e : staff) {
            System.out.println(e.name + " " + e.pay());
            total += e.pay();
        }
        System.out.println("TOTAL " + total);
    }
}
`,
            hints: ['Екі класс та <code>extends Employee</code>, constructor-да <code>super(name)</code>, ал <code>pay()</code>-ді <code>@Override</code> етеді.', 'Hourly: <code>hours &lt;= 160</code> болса <code>rate * hours</code>, әйтпесе <code>rate * 160 + rate * (hours − 160) * 3 / 2</code>. main-де объектілерді <code>staff</code>-қа қосуды ұмытпаңыз.'],
            check: { cases: [ { stdin: '3\nS Aliya 600000\nH Timur 3000 120\nH Ermek 2500 171\n', out: 'Aliya 600000\nTimur 360000\nErmek 441250\nTOTAL 1401250\n' }, { stdin: '1\nH Dana 1001 161\n', out: 'Dana 161661\nTOTAL 161661\n' }, { stdin: '1\nS Bolat 0\n', out: 'Bolat 0\nTOTAL 0\n' } ], mustInclude: ['extends Employee'] } },
          { type: 'java', level: 'hard', xp: 25, prompt: '<b>Аралықтарды біріктіру.</b> Кірісте n, сосын n жол <code>start end</code> (start ≤ end, кез келген ретпен). Қиылысатын немесе жанасатын аралықтарды (<code>[1,3]</code> мен <code>[3,5]</code> → <code>[1,5]</code>) біріктіріп, нәтижені start бойынша өсу ретімен <code>start end</code> түрінде басыңыз. Сұрыптау үшін lambda comparator қолданыңыз.',
            starter: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<int[]> xs = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            xs.add(new int[]{sc.nextInt(), sc.nextInt()});
        }
        for (int[] p : xs) {
            System.out.println(p[0] + " " + p[1]);
        }
    }
}
`,
            solution: P`import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<int[]> xs = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            xs.add(new int[]{sc.nextInt(), sc.nextInt()});
        }
        xs.sort((a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] p : xs) {
            if (!merged.isEmpty() && p[0] <= merged.get(merged.size() - 1)[1]) {
                int[] last = merged.get(merged.size() - 1);
                last[1] = Math.max(last[1], p[1]);
            } else {
                merged.add(new int[]{p[0], p[1]});
            }
        }
        for (int[] p : merged) {
            System.out.println(p[0] + " " + p[1]);
        }
    }
}
`,
            hints: ['Алдымен start бойынша сұрыптаңыз: <code>xs.sort((a, b) -&gt; Integer.compare(a[0], b[0]))</code>.', 'Келесі аралықтың start-ы соңғы біріктірілгеннің end-інен аспаса, end-ті <code>Math.max</code> арқылы кеңейтіңіз; әйтпесе жаңа аралық бастаңыз.'],
            check: { cases: [ { stdin: '4\n8 10\n1 3\n2 6\n15 18\n', out: '1 6\n8 10\n15 18\n' }, { stdin: '2\n3 5\n1 3\n', out: '1 5\n' }, { stdin: '1\n4 4\n', out: '4 4\n' }, { stdin: '3\n1 10\n2 3\n4 5\n', out: '1 10\n' } ], mustInclude: ['->'] } }
        ]
      }
    ]
  };
})();
