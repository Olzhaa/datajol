// CP1 C++. Full stdin→stdout programs compiled in the browser (clang → WebAssembly, -O0, -fno-exceptions); every exercise carries level: 'easy' | 'medium' | 'hard'.
// Exceptions are taught in text and quizzes only: try/throw do not compile in the browser runtime.
(function () {
  const P = String.raw;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const pre = s => '<pre><code>' + esc(s.replace(/^\n/, '')) + '</code></pre>';

  DJ.modules['cpp-1'] = {
    intro: 'C++ негіздері: cout/cin, типтер, string, шарттар мен циклдер, функциялар мен reference, vector, pointer және динамикалық жад, класстар, operator overloading, template, мұрагерлік, STL және рекурсия. Әр тапсырма — stdin-нен оқып, stdout-қа жазатын толық бағдарлама; соңында Оңай / Орташа / Қиын есептер жинағы мен емтихан.',
    lessons: [
      {
        id: 'cp-1', title: 'Алғашқы бағдарлама: main, cout, cin', minutes: 12,
        body: `
<p><b>C++</b> — жылдамдыққа арналған компиляцияланатын тіл: ойын қозғалтқыштары (Unreal Engine), браузерлер, дерекқорлар, тіпті PyTorch пен NumPy-дың ішкі ядросы осы тілде жазылған. Python-нан айырмашылығы: код алдымен <b>compiler</b> арқылы машиналық кодқа аударылады, содан кейін ғана іске қосылады. Қате көбіне іске қосудан бұрын, компиляция кезінде табылады.</p>
<h3>Бағдарлама құрылымы</h3>
${pre(P`
#include <iostream>      // енгізу/шығару кітапханасы
using namespace std;     // std:: деп әр жолы жазбау үшін

int main() {             // бағдарлама осы жерден басталады
    cout << "Сәлем, Алматы!" << endl;
    return 0;            // 0 — «бәрі сәтті аяқталды»
}`)}
<ul>
<li><code>#include</code> — кітапхананы қосады. <code>cout</code> мен <code>cin</code> <code>&lt;iostream&gt;</code> ішінде.</li>
<li><code>int main()</code> — әр бағдарламада дәл біреу болатын кіру нүктесі.</li>
<li>Әр нұсқаулық <b>нүктелі үтірмен</b> <code>;</code> аяқталады. Блоктар фигуралық жақшамен <code>{ }</code> белгіленеді, шегініс (indentation) тек оқуға ыңғайлылық үшін.</li>
<li><code>cout &lt;&lt;</code> — экранға шығару; <code>&lt;&lt;</code> арқылы бірнеше мәнді тізбектей береміз. <code>endl</code> — жаңа жол.</li>
</ul>
<h3>Енгізу: cin</h3>
${pre(P`
int a, b;
cin >> a >> b;           // "3 4" немесе "3\n4" — екеуі де жұмыс істейді
cout << a + b << endl;   // 7`)}
<p><code>cin &gt;&gt;</code> бос орын мен жаңа жолды өткізіп жібереді де, келесі мәнді айнымалының типіне қарай оқиды. Айнымалыны қолданбас бұрын оның типін жариялау міндетті: <code>int a;</code>.</p>
<div class="tip">DataJol-да әр тапсырма — толық бағдарлама. Тексеру кезінде оған дайын кіріс (stdin) беріледі, ал сіздің шығысыңыз (stdout) күтілген жауаппен жол-жолымен салыстырылады. Сондықтан артық мәтін («Санды енгізіңіз:» сияқты) шығармаңыз.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: 'Бағдарлама бір сөзді — адамның атын оқып, <code>Сәлем, &lt;аты&gt;!</code> деп шығарсын. Мысалы, кіріс <code>Айгерім</code> → <code>Сәлем, Айгерім!</code>',
            starter: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    // атты оқып, сәлемдесіңіз
    cout << "Сәлем!" << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cin >> name;
    cout << "Сәлем, " << name << "!" << endl;
    return 0;
}
`,
            hints: ['<code>cin &gt;&gt; name;</code> атты оқиды.', '<code>cout &lt;&lt; "Сәлем, " &lt;&lt; name &lt;&lt; "!" &lt;&lt; endl;</code>'],
            check: { cases: [ { stdin: 'Айгерім\n', out: 'Сәлем, Айгерім!\n' }, { stdin: 'Ali\n', out: 'Сәлем, Ali!\n' }, { stdin: 'Ерлан\n', out: 'Сәлем, Ерлан!\n' } ] } },
          { type: 'cpp', level: 'easy', xp: 10, prompt: 'Екі бүтін сан <code>a</code> мен <code>b</code> берілген. Бірінші жолға олардың қосындысын, екінші жолға көбейтіндісін шығарыңыз.',
            starter: P`#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    cout << a * b << endl;
    return 0;
}
`,
            hints: ['Екінші <code>cout</code> жолын қосыңыз.', '<code>cout &lt;&lt; a * b &lt;&lt; endl;</code>'],
            check: { cases: [ { stdin: '3 4\n', out: '7\n12\n' }, { stdin: '-5 10\n', out: '5\n-50\n' }, { stdin: '0\n0\n', out: '0\n0\n' } ] } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'C++ бағдарламасы қай функциядан басталып орындалады?', options: ['Файлдағы бірінші функциядан', '<code>main()</code> функциясынан', '<code>#include</code> жолынан', '<code>start()</code> функциясынан'], answer: 1, explain: 'Әр C++ бағдарламасында <code>main</code> деген бір функция болады; операциялық жүйе бағдарламаны осы жерден бастайды.' }
        ]
      },
      {
        id: 'cp-2', title: 'Типтер, айнымалылар және арифметика', minutes: 14,
        body: `
<p>C++ — <b>статикалық типтелген</b> тіл: әр айнымалының типі компиляция кезінде белгілі және кейін өзгермейді. Тип айнымалыға қанша жад бөлінетінін және онымен қандай амал жасауға болатынын анықтайды.</p>
<table>
<tr><th>Тип</th><th>Не сақтайды</th><th>Мысал</th></tr>
<tr><td><code>int</code></td><td>бүтін сан, шамамен ±2.1 млрд</td><td><code>int age = 19;</code></td></tr>
<tr><td><code>long long</code></td><td>үлкен бүтін сан, шамамен ±9.2·10¹⁸</td><td><code>long long people = 8000000000LL;</code></td></tr>
<tr><td><code>double</code></td><td>бөлшек сан</td><td><code>double price = 1299.5;</code></td></tr>
<tr><td><code>char</code></td><td>бір символ (1 байт)</td><td><code>char grade = 'A';</code></td></tr>
<tr><td><code>bool</code></td><td><code>true</code> / <code>false</code></td><td><code>bool paid = true;</code></td></tr>
</table>
<p><code>auto</code> типті компиляторға шығартады: <code>auto x = 3.5;</code> — <code>double</code>. <code>const</code> өзгермейтін мән жасайды: <code>const int DAYS = 7;</code>.</p>
<h3>Бүтін санды бөлу — басты тұзақ</h3>
${pre(P`
cout << 7 / 2 << endl;        // 3   — екі int: бөлшек бөлігі тасталады
cout << 7 % 2 << endl;        // 1   — қалдық
cout << 7.0 / 2 << endl;      // 3.5 — бір операнд double болса, нәтиже double
int total = 10000, n = 3;
double share = static_cast<double>(total) / n;   // 3333.33...`)}
<p>Назар аударыңыз: <code>double d = 7 / 2;</code> жазсаңыз, алдымен <code>7 / 2</code> бүтін ретінде есептеліп 3 шығады, содан кейін ғана 3.0 болып <code>d</code>-ге жазылады.</p>
<h3>Overflow және бөлшекті шығару</h3>
<p><code>int</code> шегінен асып кетсе (overflow), C++ қате бермейді — мән «оралып» қате санға айналады. Қосынды, көбейтінді үлкен болуы мүмкін болса, <code>long long</code> алыңыз.</p>
${pre(P`
#include <iomanip>
double avg = 2250.0;
cout << fixed << setprecision(2) << avg << endl;   // 2250.00`)}
<div class="tip"><code>fixed &lt;&lt; setprecision(2)</code> — ондық бөліктен кейін дәл 2 цифр. Бұл баптау келесі барлық <code>double</code> шығысына әсер етеді.</div>`,
        exercises: [
          { type: 'cpp', level: 'medium', xp: 15, prompt: 'Достар мейрамханадағы есепті тең бөледі. Жалпы сома (теңге, бүтін) мен адам саны берілген. Әр адамның үлесін ондық бөлікте 2 цифрмен шығарыңыз. Мысалы, <code>10000 3</code> → <code>3333.33</code>.',
            starter: P`#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int total, people;
    cin >> total >> people;
    cout << total / people << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int total, people;
    cin >> total >> people;
    double share = static_cast<double>(total) / people;
    cout << fixed << setprecision(2) << share << endl;
    return 0;
}
`,
            hints: ['<code>total / people</code> — бүтін бөлу. Алдымен <code>static_cast&lt;double&gt;(total)</code> жасаңыз.', '<code>cout &lt;&lt; fixed &lt;&lt; setprecision(2) &lt;&lt; share;</code>'],
            check: { cases: [ { stdin: '10000 3\n', out: '3333.33\n' }, { stdin: '9000 4\n', out: '2250.00\n' }, { stdin: '7 2\n', out: '3.50\n' } ] } },
          { type: 'number', level: 'easy', xp: 10, prompt: '<code>int x = 17 / 5 * 2;</code> орындалғаннан кейін <code>x</code> неге тең?', answer: 6, tol: 0, explain: '<code>17 / 5</code> бүтін бөлу: 3. Сосын <code>3 * 2 = 6</code>.' },
          { type: 'number', level: 'medium', xp: 10, prompt: '<code>double d = 7 / 2;</code> орындалғаннан кейін <code>d</code> неге тең?', answer: 3, tol: 0, explain: 'Оң жақ екі <code>int</code>-тен тұрады, сондықтан <code>7 / 2 = 3</code> бүтін ретінде есептеледі, тек содан кейін 3.0 болып <code>double</code>-ға жазылады. Дұрысы: <code>7.0 / 2</code>.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Жер шарының халқын (шамамен 8 000 000 000 адам) сақтау үшін қай тип дұрыс?', options: ['<code>int</code>', '<code>char</code>', '<code>long long</code>', '<code>bool</code>'], answer: 2, explain: '<code>int</code> шамамен 2.1 млрд-қа дейін ғана сыяды. 8 млрд үшін <code>long long</code> керек.' }
        ]
      },
      {
        id: 'cp-3', title: 'Жолдар: std::string', minutes: 13,
        body: `
<p>C++-та мәтін <code>std::string</code> класында сақталады (<code>#include &lt;string&gt;</code>). Ол Python жолына ұқсайды, бірақ <b>өзгермелі</b>: жеке символды тікелей ауыстыруға болады.</p>
${pre(P`
string city = "Astana";
cout << city.size() << endl;        // 6
cout << city[0] << endl;            // A  (char)
city[0] = 'a';                      // "astana" — өзгертуге болады
string full = city + " city";       // біріктіру
cout << city.substr(1, 3) << endl;  // "sta": 1-позициядан бастап 3 символ
cout << city.find("na") << endl;    // 3; табылмаса string::npos
string s = to_string(2025);         // сан → жол
int n = stoi("42");                 // жол → сан`)}
<h3>cin және getline</h3>
<p><code>cin &gt;&gt; s</code> бір <b>сөзді</b> оқиды: бос орынға жеткенде тоқтайды. Бүкіл жолды оқу үшін <code>getline</code> керек:</p>
${pre(P`
string line;
getline(cin, line);       // "Нұр Сұлтан даңғылы 12" — толық жол`)}
<p>Егер алдымен <code>cin &gt;&gt; n</code>, сосын <code>getline</code> қолдансаңыз, бірінші жолдың соңындағы жаңа жол символы қалып қояды да, <code>getline</code> бос жол оқиды. Шешімі — арасында <code>cin.ignore();</code> шақыру.</p>
<h3>Символдармен жұмыс</h3>
${pre(P`
for (char c : line) {                // range-based for
    if (c == ' ') continue;
    char up = toupper(c);            // 'a' → 'A'
}`)}
<div class="tip"><b>Кирилл және UTF-8:</b> <code>size()</code> символдарды емес, <b>байттарды</b> санайды. Латын әрпі — 1 байт, ал «Ә», «Қ» сияқты қазақ әріптері — 2 байт. Сондықтан <code>string("Қала").size()</code> 8 болады. Символ деңгейіндегі тапсырмаларда біз латын мәтінін қолданамыз.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: 'Аты мен тегі (латынша, бос орын арқылы) берілген. <code>Тегі А.</code> форматында шығарыңыз: <code>Aigerim Nurlanova</code> → <code>Nurlanova A.</code>',
            starter: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string first, last;
    cin >> first >> last;
    cout << first << " " << last << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string first, last;
    cin >> first >> last;
    cout << last << " " << first[0] << "." << endl;
    return 0;
}
`,
            hints: ['Аттың бірінші әрпі — <code>first[0]</code>.', '<code>cout &lt;&lt; last &lt;&lt; " " &lt;&lt; first[0] &lt;&lt; ".";</code>'],
            check: { cases: [ { stdin: 'Aigerim Nurlanova\n', out: 'Nurlanova A.\n' }, { stdin: 'Erlan Sadykov\n', out: 'Sadykov E.\n' }, { stdin: 'Bo Li\n', out: 'Li B.\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: 'Бір жол мәтін (латынша, бос орындары бар) берілген. Ондағы дауысты әріптер санын шығарыңыз: <code>a e i o u</code>, бас әріптері де саналады.',
            starter: P`#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string line;
    cin >> line;
    int count = 0;
    cout << count << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    int count = 0;
    for (char c : line) {
        char l = tolower(c);
        if (l == 'a' || l == 'e' || l == 'i' || l == 'o' || l == 'u') count++;
    }
    cout << count << endl;
    return 0;
}
`,
            hints: ['Бүкіл жолды <code>getline(cin, line)</code> арқылы оқыңыз: <code>cin &gt;&gt;</code> тек бірінші сөзді алады.', 'Әр символды <code>tolower(c)</code> арқылы кіші әріпке айналдырып, бес дауыстымен салыстырыңыз.'],
            check: { cases: [ { stdin: 'Hello World\n', out: '3\n' }, { stdin: 'DataJol Academy\n', out: '6\n' }, { stdin: 'xyz\n', out: '0\n' }, { stdin: 'AEIOU aeiou\n', out: '10\n' } ] } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Кіріс: <code>Нұр Сұлтан</code>. <code>string s; cin &gt;&gt; s;</code> орындалғаннан кейін <code>s</code> не болады?', options: ['<code>"Нұр Сұлтан"</code>', '<code>"Нұр"</code>', '<code>"Сұлтан"</code>', 'Бос жол'], answer: 1, explain: '<code>cin &gt;&gt;</code> бос орынға дейін бір сөзді оқиды. Толық жол үшін <code>getline(cin, s)</code>.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>string s = "Astana";</code> болса, <code>s.substr(1, 3)</code> нені қайтарады?', options: ['<code>"Ast"</code>', '<code>"sta"</code>', '<code>"st"</code>', '<code>"stan"</code>'], answer: 1, explain: '<code>substr(pos, len)</code>: 1-индекстен (екінші символ <code>s</code>) бастап 3 символ — <code>"sta"</code>.' }
        ]
      },
      {
        id: 'cp-4', title: 'Шарттар: if/else және switch', minutes: 12,
        body: `
<p>Бағдарлама шартқа қарай әртүрлі жол таңдайды. Салыстыру операторлары: <code>== != &lt; &gt; &lt;= &gt;=</code>; логикалық: <code>&amp;&amp;</code> (және), <code>||</code> (немесе), <code>!</code> (емес). Шарт жақшаға алынады.</p>
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
string status = (temp > 30) ? "Ыстық" : "Қалыпты";   // тернарлы оператор`)}
<p>Тұзақ: <code>if (x = 5)</code> — бұл салыстыру емес, <b>меншіктеу</b>. Шарт әрқашан ақиқат болады. Салыстыру үшін <code>==</code> жазыңыз (компилятор көбіне ескерту береді).</p>
<h3>switch</h3>
<p>Бір бүтін (немесе <code>char</code>) мәнді бірнеше нақты мәнмен салыстырғанда <code>switch</code> ықшам:</p>
${pre(P`
char cmd;
cin >> cmd;
switch (cmd) {
    case 'D': cout << "Депозит" << endl; break;
    case 'W': cout << "Ақша алу" << endl; break;
    case 'q':
    case 'Q': cout << "Шығу" << endl; break;   // екі case бір блокта
    default:  cout << "Белгісіз команда" << endl;
}`)}
<p><b>break</b> маңызды: оны ұмытсаңыз, орындау келесі <code>case</code>-ке «құлап түседі» (fallthrough) және оның кодын да орындайды. <code>switch</code> <code>string</code> немесе <code>double</code> мәнмен жұмыс істемейді — ондай жағдайда <code>if/else if</code> тізбегін қолданыңыз.</p>
<div class="tip">C++-та <code>0</code> — жалған, кез келген басқа сан — ақиқат. Сондықтан <code>if (n % 2)</code> «n тақ болса» дегенді білдіреді.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: 'Ауа температурасы (бүтін сан) берілген. 0-ден төмен болса <code>Суық</code>, 0-ден 15-ке дейін (қоса) <code>Салқын</code>, 15-тен жоғары болса <code>Жылы</code> деп шығарыңыз.',
            starter: P`#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;
    cout << "Жылы" << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;
    if (t < 0) cout << "Суық" << endl;
    else if (t <= 15) cout << "Салқын" << endl;
    else cout << "Жылы" << endl;
    return 0;
}
`,
            hints: ['Үш тармақ: <code>if (t &lt; 0)</code>, <code>else if (t &lt;= 15)</code>, <code>else</code>.', 'Шекараларды тексеріңіз: 0 және 15 — <code>Салқын</code>.'],
            check: { cases: [ { stdin: '-5\n', out: 'Суық\n' }, { stdin: '0\n', out: 'Салқын\n' }, { stdin: '15\n', out: 'Салқын\n' }, { stdin: '30\n', out: 'Жылы\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: 'Апта күнінің нөмірі (1–7) берілген. <code>switch</code> арқылы күн атауын шығарыңыз: Дүйсенбі, Сейсенбі, Сәрсенбі, Бейсенбі, Жұма, Сенбі, Жексенбі. Басқа сан болса — <code>Қате</code>.',
            starter: P`#include <iostream>
using namespace std;

int main() {
    int d;
    cin >> d;
    switch (d) {
        case 1: cout << "Дүйсенбі" << endl;
        default: cout << "Қате" << endl;
    }
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int main() {
    int d;
    cin >> d;
    switch (d) {
        case 1: cout << "Дүйсенбі" << endl; break;
        case 2: cout << "Сейсенбі" << endl; break;
        case 3: cout << "Сәрсенбі" << endl; break;
        case 4: cout << "Бейсенбі" << endl; break;
        case 5: cout << "Жұма" << endl; break;
        case 6: cout << "Сенбі" << endl; break;
        case 7: cout << "Жексенбі" << endl; break;
        default: cout << "Қате" << endl;
    }
    return 0;
}
`,
            hints: ['Стартерде <code>break</code> жоқ: 1 енгізсеңіз, «Қате» де шығады.', 'Әр <code>case</code> соңына <code>break;</code> қойып, 2–7 күндерді қосыңыз.'],
            check: { cases: [ { stdin: '1\n', out: 'Дүйсенбі\n' }, { stdin: '6\n', out: 'Сенбі\n' }, { stdin: '9\n', out: 'Қате\n' } ], mustInclude: ['switch'] } },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>int x = 2; switch (x) { case 1: cout &lt;&lt; "A"; case 2: cout &lt;&lt; "B"; case 3: cout &lt;&lt; "C"; break; default: cout &lt;&lt; "D"; }</code> не шығарады?', options: ['<code>B</code>', '<code>BC</code>', '<code>BCD</code>', '<code>ABC</code>'], answer: 1, explain: '<code>case 2</code>-ден бастайды, <code>break</code> жоқ болғандықтан <code>case 3</code>-ке құлап түседі (fallthrough), сосын <code>break</code> тоқтатады: <code>BC</code>.' },
          { type: 'number', level: 'easy', xp: 10, prompt: '<code>int x = 5; if (x &gt; 3 &amp;&amp; x &lt; 5) x += 10; else x *= 2;</code> орындалғаннан кейін <code>x</code> неге тең?', answer: 10, tol: 0, explain: '<code>x &lt; 5</code> жалған (5 &lt; 5 емес), сондықтан бүкіл <code>&amp;&amp;</code> жалған, <code>else</code> орындалады: 5 · 2 = 10.' }
        ]
      },
      {
        id: 'cp-5', title: 'Циклдер: for, while, do-while', minutes: 13,
        body: `
<p>Цикл бір әрекетті көп рет қайталайды. C++-та үш негізгі түрі бар.</p>
${pre(P`
for (int i = 1; i <= 5; i++) {     // бастау; шарт; қадам
    cout << i << " ";              // 1 2 3 4 5
}

int balance = 1000;
int months = 0;
while (balance < 2000) {           // шарт ақиқат болғанша
    balance += balance / 10;       // ай сайын 10% өсім
    months++;
}

int pin;
do {
    cin >> pin;                    // кемінде бір рет орындалады
} while (pin != 1234);`)}
<p><code>break</code> циклден бірден шығады, <code>continue</code> осы айналымның қалғанын өткізіп, келесісіне өтеді. Цикл ішінде цикл (nested loop) кесте не үшбұрыш сияқты екі өлшемді құрылымдарға керек:</p>
${pre(P`
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) cout << "*";
    cout << endl;
}
// *
// **
// ***`)}
<h3>Кіріс біткенше оқу</h3>
<p>Сандар саны алдын ала белгісіз болса, <code>while (cin &gt;&gt; x)</code> қолданыңыз: оқу сәтсіз болғанда (кіріс біткенде, EOF) шарт жалған болады.</p>
${pre(P`
long long sum = 0;
int x;
while (cin >> x) sum += x;`)}
<div class="tip">Қосынды үлкен болуы мүмкін болса, <code>long long</code> алыңыз: 1-ден 100 000-ға дейінгі сандардың қосындысы 5 000 050 000 — бұл <code>int</code> шегінен асады.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: '<code>n</code> берілген. <code>n</code> жолдан тұратын жұлдызша үшбұрышын шығарыңыз: <code>i</code>-жолда <code>i</code> жұлдызша <code>*</code>.',
            starter: P`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cout << "*" << endl;
    }
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) cout << "*";
        cout << endl;
    }
    return 0;
}
`,
            hints: ['Ішкі цикл керек: <code>for (int j = 1; j &lt;= i; j++)</code>.', 'Ішкі циклден кейін ғана <code>endl</code> шығарыңыз.'],
            check: { cases: [ { stdin: '3\n', out: '*\n**\n***\n' }, { stdin: '1\n', out: '*\n' }, { stdin: '5\n', out: '*\n**\n***\n****\n*****\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<code>n</code> берілген (0 ≤ n ≤ 100 000). 1-ден <code>n</code>-ге дейінгі сандардың қосындысын цикл арқылы есептеңіз. Үлкен <code>n</code> үшін overflow болмауын қадағалаңыз.',
            starter: P`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int sum = 0;
    for (int i = 1; i <= n; i++) sum += i;
    cout << sum << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 1; i <= n; i++) sum += i;
    cout << sum << endl;
    return 0;
}
`,
            hints: ['n = 100 000 болғанда қосынды 5 000 050 000 — <code>int</code>-ке сыймайды.', '<code>sum</code> типін <code>long long</code> етіңіз.'],
            check: { cases: [ { stdin: '5\n', out: '15\n' }, { stdin: '0\n', out: '0\n' }, { stdin: '100000\n', out: '5000050000\n' } ] } },
          { type: 'number', level: 'easy', xp: 10, prompt: '<code>for (int i = 0; i &lt; 10; i += 3)</code> циклінің денесі неше рет орындалады?', answer: 4, tol: 0, explain: '<code>i</code> мәндері: 0, 3, 6, 9. Келесісі 12 — шарт жалған. Барлығы 4 рет.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: '<code>do { ... } while (cond);</code> циклінің <code>while</code>-тан басты айырмашылығы неде?', options: ['Ол тезірек жұмыс істейді', 'Денесі шарт тексерілмей тұрып кемінде бір рет орындалады', 'Оның ішінде <code>break</code> жазуға болмайды', 'Шарт жалған болғанша қайталанады'], answer: 1, explain: '<code>do-while</code> шартты дененің <b>соңында</b> тексереді, сондықтан дене әрқашан кемінде бір рет орындалады — мысалы, PIN-кодты кемінде бір рет сұрау үшін.' }
        ]
      },
      {
        id: 'cp-6', title: 'Функциялар, overloading және reference', minutes: 15,
        body: `
<p>Функция кодты атауы бар блокқа бөледі. C++-та функцияның қайтаратын типі, аты және параметр типтері жазылады. Ештеңе қайтармайтын функция — <code>void</code>.</p>
${pre(P`
int square(int x) {
    return x * x;
}
void greet(string name, string greeting = "Сәлем") {   // әдепкі аргумент
    cout << greeting << ", " << name << "!" << endl;
}`)}
<p>Функция қолданылмас бұрын жарияланған болуы керек. Оны <code>main</code>-нен кейін жазғыңыз келсе, алдында <b>прототипін</b> беріңіз: <code>int square(int x);</code>.</p>
<h3>Мән бойынша және reference бойынша беру</h3>
<p>Әдепкіде аргумент <b>көшіріледі</b> (pass by value): функция ішіндегі өзгеріс сыртқы айнымалыға әсер етпейді. <code>&amp;</code> белгісі бар параметр — <b>reference</b>, яғни сол айнымалының өзіне екінші ат:</p>
${pre(P`
void addBonusCopy(int salary) { salary += 50000; }      // сырттағы мән өзгермейді
void addBonus(int& salary)    { salary += 50000; }      // сырттағы мән өзгереді

int s = 300000;
addBonusCopy(s);   // s == 300000
addBonus(s);       // s == 350000`)}
<p>Үлкен нысанды (<code>string</code>, <code>vector</code>) көшірмей, бірақ өзгертпей беру үшін <b>const reference</b> қолданылады: <code>int countSpaces(const string&amp; text)</code>. Бұл — C++-тағы ең жиі кездесетін параметр түрі.</p>
<h3>Overloading</h3>
<p>Бір атпен бірнеше функция жазуға болады, егер параметрлерінің саны не типі әртүрлі болса. Компилятор шақырудағы аргументтерге қарап дұрысын таңдайды:</p>
${pre(P`
int    area(int side)              { return side * side; }
double area(double r, bool circle) { return 3.14159 * r * r; }
int    area(int w, int h)          { return w * h; }`)}
<div class="tip">Тек қайтаратын типі әртүрлі функцияларды overload жасауға болмайды: <code>int f(int)</code> мен <code>double f(int)</code> — қате, себебі шақыруда <code>f(3)</code> қайсысы екені белгісіз.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: '<code>int maxOf3(int a, int b, int c)</code> функциясын жазыңыз: ол үш санның ең үлкенін қайтарсын. <code>main</code> дайын: үш сан оқып, нәтижені шығарады.',
            starter: P`#include <iostream>
using namespace std;

int maxOf3(int a, int b, int c) {
    return a;
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << maxOf3(a, b, c) << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int maxOf3(int a, int b, int c) {
    int m = a;
    if (b > m) m = b;
    if (c > m) m = c;
    return m;
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << maxOf3(a, b, c) << endl;
    return 0;
}
`,
            hints: ['<code>m = a</code> деп бастап, <code>b</code> мен <code>c</code>-ны салыстырыңыз.', 'Немесе <code>max(a, max(b, c))</code> (<code>&lt;algorithm&gt;</code>).'],
            check: { cases: [ { stdin: '3 9 4\n', out: '9\n' }, { stdin: '-1 -7 -3\n', out: '-1\n' }, { stdin: '5 5 8\n', out: '8\n' } ], mustInclude: ['maxOf3'] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<code>swapVals(a, b)</code> функциясы екі айнымалының мәнін ауыстыруы керек, бірақ қазір параметрлер көшіріліп беріледі. Функцияны reference арқылы түзетіңіз. <code>main</code> өзгермейді.',
            starter: P`#include <iostream>
using namespace std;

void swapVals(int a, int b) {
    int t = a;
    a = b;
    b = t;
}

int main() {
    int x, y;
    cin >> x >> y;
    swapVals(x, y);
    cout << x << " " << y << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

void swapVals(int& a, int& b) {
    int t = a;
    a = b;
    b = t;
}

int main() {
    int x, y;
    cin >> x >> y;
    swapVals(x, y);
    cout << x << " " << y << endl;
    return 0;
}
`,
            hints: ['Қазір функция көшірмелерді ауыстырады, <code>x</code> пен <code>y</code> өзгермейді.', 'Параметрлерді <code>int&amp; a, int&amp; b</code> етіңіз.'],
            check: { cases: [ { stdin: '1 2\n', out: '2 1\n' }, { stdin: '-4 10\n', out: '10 -4\n' }, { stdin: '7 7\n', out: '7 7\n' } ], mustInclude: ['swapVals'] } },
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Қай функциялар жұбын бір бағдарламада overload ретінде жазуға <b>болмайды</b>?', options: ['<code>int f(int)</code> және <code>int f(double)</code>', '<code>int f(int)</code> және <code>int f(int, int)</code>', '<code>int f(int)</code> және <code>double f(int)</code>', '<code>void f(string)</code> және <code>void f(char)</code>'], answer: 2, explain: 'Overload параметрлер бойынша ажыратылады. Тек қайтаратын типі әртүрлі болса, <code>f(3)</code> шақыруы екіұшты — компиляция қатесі.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Неге параметр жиі <code>const string&amp; text</code> түрінде жазылады?', options: ['Жол тезірек басып шығарылады', 'Жол көшірілмейді, әрі функция оны кездейсоқ өзгерте алмайды', 'Бұл жолды автоматты түрде бос етеді', 'Онсыз <code>string</code> функцияға берілмейді'], answer: 1, explain: 'Reference көшіруді болдырмайды (үлкен мәтінде маңызды), ал <code>const</code> функцияның оны өзгертуіне тыйым салады.' }
        ]
      },
      {
        id: 'cp-7', title: 'Массив және std::vector', minutes: 15,
        body: `
<p><b>C-массив</b> — бір типті элементтердің бекітілген өлшемді тізбегі: <code>int a[5] = {4, 8, 15, 16, 23};</code>. Оның өлшемі компиляция кезінде белгілі болуы керек және өзгермейді. Ең қауіптісі — C++ индекстің шекарадан шығуын тексермейді: <code>a[10]</code> қате бермейді, тек бөтен жадты оқиды (<b>undefined behavior</b>).</p>
<h3>std::vector — динамикалық массив</h3>
<p>Күнделікті жұмыста <code>vector</code> (<code>#include &lt;vector&gt;</code>) қолданылады: ол өз өлшемін біледі және қажет болғанда өседі.</p>
${pre(P`
vector<int> prices;                 // бос
prices.push_back(1200);             // соңына қосу
prices.push_back(850);
cout << prices.size() << endl;      // 2
cout << prices[0] << endl;          // 1200 (тексерусіз)
cout << prices.at(1) << endl;       // 850  (шекараны тексереді)
prices.pop_back();                  // соңғысын өшіру

int n;
cin >> n;
vector<int> a(n);                   // n нөлден тұратын вектор
for (int i = 0; i < n; i++) cin >> a[i];

long long sum = 0;
for (int x : a) sum += x;           // range-based for`)}
<p><code>vector&lt;int&gt; v(3)</code> — үш нөл; <code>vector&lt;int&gt; v(3, 7)</code> — үш жеті. Екі өлшемді кесте — вектордың векторы:</p>
${pre(P`
vector<vector<int>> grid(3, vector<int>(4, 0));   // 3 жол, 4 баған
grid[1][2] = 5;`)}
<p>Векторды функцияға <b>reference</b> арқылы беріңіз: <code>void fill(vector&lt;int&gt;&amp; v)</code> — өзгерту үшін, <code>int total(const vector&lt;int&gt;&amp; v)</code> — тек оқу үшін. Әйтпесе бүкіл вектор көшіріледі.</p>
<div class="tip">Индекспен цикл жазғанда <code>i &lt; v.size()</code> шартында <code>size()</code> таңбасыз (<code>size_t</code>) тип қайтарады. Бос векторда <code>v.size() - 1</code> өте үлкен санға айналады — абай болыңыз.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: 'Алдымен <code>n</code>, сосын <code>n</code> бүтін сан берілген. Оларды <code>vector</code>-ге оқып, кері ретпен бір жолға бос орын арқылы шығарыңыз.',
            starter: P`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cout << a[i] << " ";
    cout << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = n - 1; i >= 0; i--) cout << a[i] << " ";
    cout << endl;
    return 0;
}
`,
            hints: ['Шығаратын циклді соңынан бастаңыз: <code>i = n - 1</code>.', '<code>for (int i = n - 1; i &gt;= 0; i--)</code>'],
            check: { cases: [ { stdin: '4\n1 2 3 4\n', out: '4 3 2 1\n' }, { stdin: '1\n42\n', out: '42\n' }, { stdin: '3\n-1 0 5\n', out: '5 0 -1\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: 'Дүкеннің <code>n</code> күндік табысы берілген. Табысы орташа мәннен <b>қатаң жоғары</b> болған күндер санын шығарыңыз.',
            starter: P`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int count = 0;
    cout << count << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        sum += a[i];
    }
    double avg = static_cast<double>(sum) / n;
    int count = 0;
    for (int x : a) if (x > avg) count++;
    cout << count << endl;
    return 0;
}
`,
            hints: ['Алдымен қосындыны, сосын <code>double avg = (double)sum / n</code> есептеңіз.', 'Екінші циклде <code>x &gt; avg</code> болғандарды санаңыз.'],
            check: { cases: [ { stdin: '5\n1 2 3 4 5\n', out: '2\n' }, { stdin: '4\n10 10 10 10\n', out: '0\n' }, { stdin: '3\n1 1 7\n', out: '1\n' }, { stdin: '2\n1 2\n', out: '1\n' } ] } },
          { type: 'number', level: 'easy', xp: 10, prompt: '<code>vector&lt;int&gt; v(3); v.push_back(5);</code> орындалғаннан кейін <code>v.size()</code> неге тең?', answer: 4, tol: 0, explain: '<code>v(3)</code> үш нөлмен құрылады, <code>push_back</code> төртінші элементті қосады: <code>{0, 0, 0, 5}</code>.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>int a[5];</code> массивінде <code>a[10] = 1;</code> жазылса не болады?', options: ['Компиляция қатесі', 'Массив автоматты түрде 11 элементке дейін өседі', 'Undefined behavior: бөтен жадқа жазылады, бағдарлама кез келген әрекет жасауы мүмкін', 'Мән елемей тасталады'], answer: 2, explain: 'C-массив пен <code>vector::operator[]</code> шекараны тексермейді. Қауіпсіз нұсқа — <code>v.at(i)</code>: ол шекарадан шыққанда қате (exception) лақтырады.' }
        ]
      },
      {
        id: 'cp-8', title: 'Pointer және динамикалық жад', minutes: 16,
        body: `
<p>Әр айнымалы жадта бір <b>адресте</b> орналасады. <b>Pointer</b> (көрсеткіш) — адресті сақтайтын айнымалы. Python мен Java мұны жасырады, ал C++ жадпен тікелей жұмыс істеуге мүмкіндік береді — сондықтан жылдам, бірақ қателесу оңай.</p>
${pre(P`
int balance = 5000;
int* p = &balance;      // &balance — balance-тің адресі
cout << *p << endl;     // 5000: * — адрестегі мәнді алу (dereference)
*p += 1000;             // balance енді 6000
int* q = nullptr;       // ешқайда көрсетпейтін pointer`)}
<p><code>int&amp; r = x</code> (reference) мен <code>int* p = &amp;x</code> (pointer) ұқсас, бірақ reference әрқашан бір нысанға байланған және null бола алмайды, ал pointer-ді басқа адреске ауыстыруға және <code>nullptr</code> етуге болады.</p>
<h3>Stack және heap</h3>
<p>Жергілікті айнымалылар <b>stack</b>-те тұрады және функциядан шыққанда өздігінен жойылады. Өмір сүру уақыты ұзақ немесе өлшемі тек іске қосылғанда белгілі болатын деректер <b>heap</b>-те <code>new</code> арқылы бөлінеді, және оларды <code>delete</code> арқылы өзіңіз босатуыңыз керек:</p>
${pre(P`
int* one = new int(42);
int* arr = new int[n];     // n элементті массив
// ... қолдану ...
delete one;
delete[] arr;              // массив үшін delete[]`)}
<p>Үш классикалық қате: <b>memory leak</b> (<code>delete</code> ұмытылды — жад біртіндеп таусылады), <b>dangling pointer</b> (жад босатылған, бірақ pointer әлі сол адреске қарайды) және <b>double delete</b> (бір жадты екі рет босату).</p>
<h3>Smart pointer: неге қолмен delete жазбаймыз</h3>
<p>Қазіргі C++ (<code>&lt;memory&gt;</code>) жадты <b>RAII</b> принципімен басқарады: иесі жойылғанда ресурс өздігінен босайды.</p>
${pre(P`
#include <memory>
unique_ptr<int> a = make_unique<int>(10);   // жалғыз иесі бар
shared_ptr<string> s = make_shared<string>("Kaspi");
auto s2 = s;                                 // екі иесі; соңғысы жойылғанда жад босайды
// delete жазудың қажеті жоқ`)}
<div class="tip">Ереже: жаңа кодта <code>new</code>/<code>delete</code> орнына <code>vector</code>, <code>string</code>, <code>unique_ptr</code> қолданыңыз. Шикі pointer-ді тек «иелік етпей, қарап тұру» үшін ұстаңыз. Ескерту: браузердегі компиляторда жад қорғанысы жоқ — қате pointer бағдарламаны құлатпай, қоқыс мән береді.</div>`,
        exercises: [
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<code>void addBonus(int* salary, int bonus)</code> функциясын pointer арқылы жазыңыз: ол жалақыға бонусты қоссын. Сонымен қатар <code>int* bigger(int* a, int* b)</code> функциясы екі мәннің үлкеніне көрсететін pointer қайтарсын. <code>main</code> дайын.',
            starter: P`#include <iostream>
using namespace std;

void addBonus(int* salary, int bonus) {
}

int* bigger(int* a, int* b) {
    return a;
}

int main() {
    int s1, s2, bonus;
    cin >> s1 >> s2 >> bonus;
    addBonus(&s1, bonus);
    int* top = bigger(&s1, &s2);
    *top += 1;
    cout << s1 << " " << s2 << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

void addBonus(int* salary, int bonus) {
    *salary += bonus;
}

int* bigger(int* a, int* b) {
    if (*b > *a) return b;
    return a;
}

int main() {
    int s1, s2, bonus;
    cin >> s1 >> s2 >> bonus;
    addBonus(&s1, bonus);
    int* top = bigger(&s1, &s2);
    *top += 1;
    cout << s1 << " " << s2 << endl;
    return 0;
}
`,
            hints: ['Адрестегі мәнді өзгерту: <code>*salary += bonus;</code>', 'Мәндерді салыстыру үшін <code>*a</code> мен <code>*b</code>-ны салыстырып, pointer-дің өзін (<code>a</code> не <code>b</code>) қайтарыңыз.'],
            check: { cases: [ { stdin: '300 500 100\n', out: '400 501\n' }, { stdin: '300 350 100\n', out: '401 350\n' }, { stdin: '10 20 0\n', out: '10 21\n' } ] } },
          { type: 'number', level: 'medium', xp: 10, prompt: '<code>int a = 5; int* p = &amp;a; *p += 3; int b = *p * 2;</code> орындалғаннан кейін <code>b</code> неге тең?', answer: 16, tol: 0, explain: '<code>*p += 3</code> арқылы <code>a</code> 8 болады. <code>b = 8 * 2 = 16</code>.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Функция әр шақырылғанда <code>new int[1000]</code> бөледі, бірақ <code>delete[]</code> ешқашан шақырылмайды. Бұл қалай аталады?', options: ['Dangling pointer', 'Memory leak', 'Stack overflow', 'Null pointer'], answer: 1, explain: 'Бөлінген, бірақ босатылмаған жад — memory leak. Ұзақ жұмыс істейтін сервер біртіндеп бүкіл жадты жеп қояды.' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>unique_ptr</code>-дің шикі <code>new</code>/<code>delete</code>-тен басты артықшылығы қандай?', options: ['Ол жадты stack-те бөледі', 'Иесі scope-тан шыққанда жадты өздігінен босатады, әрі иесі біреу ғана болады', 'Ол pointer арифметикасын жылдамдатады', 'Ол көшірілгенде жаңа нысан жасайды'], answer: 1, explain: '<code>unique_ptr</code> RAII-ге негізделген: деструкторы <code>delete</code>-ті өзі шақырады. Оны көшіруге болмайды, тек <code>move</code> арқылы иелікті беруге болады.' }
        ]
      },
      {
        id: 'cp-9', title: 'struct, class, constructor және destructor', minutes: 16,
        body: `
<p><b>struct</b> бірнеше өрісті бір типке біріктіреді. <b>class</b> — сол идея, бірақ әдепкіде өрістері жабық (<code>private</code>). Айырмашылық тек әдепкі қолжетімділікте: <code>struct</code>-та <code>public</code>, <code>class</code>-та <code>private</code>.</p>
${pre(P`
struct Student {
    string name;
    int score;
};
Student s{"Дана", 91};
cout << s.name << " " << s.score << endl;`)}
<h3>Инкапсуляция және constructor</h3>
<p>Класс деректерді жасырып, оларға тек дұрыс әдістер арқылы қол жеткізуге мүмкіндік береді. <b>Constructor</b> — нысан жасалғанда шақырылатын, класпен аттас, қайтару типі жоқ функция. Өрістерді <b>initializer list</b> арқылы толтырған дұрыс:</p>
${pre(P`
class Account {
private:
    string owner;
    long long balance;
public:
    Account(string o, long long b) : owner(o), balance(b) {}
    void deposit(long long x) { if (x > 0) balance += x; }
    bool withdraw(long long x) {
        if (x > balance) return false;   // жеткіліксіз — бас тарту
        balance -= x;
        return true;
    }
    long long getBalance() const { return balance; }   // const: нысанды өзгертпейді
};

Account acc("Ерлан", 10000);
acc.withdraw(3000);
// acc.balance = 1000000;   // қате: balance — private`)}
<h3>Destructor</h3>
<p><b>Destructor</b> <code>~ClassName()</code> нысан жойылғанда (мысалы, scope-тан шыққанда) өздігінен шақырылады. Онда ресурстар босатылады: жад, файл, желі байланысы. Бұл — <b>RAII</b> (Resource Acquisition Is Initialization): ресурсты constructor алады, destructor қайтарады.</p>
${pre(P`
struct Logger {
    string name;
    Logger(string n) : name(n) { cout << "open " << name << endl; }
    ~Logger() { cout << "close " << name << endl; }
};
int main() {
    Logger a("A");
    Logger b("B");
}   // шығыс: open A, open B, close B, close A`)}
<div class="tip">Жергілікті нысандар құрылған ретіне <b>кері</b> ретпен жойылады: соңғы жасалған — бірінші жойылады (stack сияқты).</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: '<code>n</code> студенттің аты мен баллы берілген (әр жолда <code>аты балл</code>). <code>Student</code> struct-ын қолданып, ең жоғары балл алған студенттің атын шығарыңыз. Тең болса — бірінші кездескені.',
            starter: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> st(n);
    for (int i = 0; i < n; i++) cin >> st[i].name >> st[i].score;
    cout << st[0].name << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<Student> st(n);
    for (int i = 0; i < n; i++) cin >> st[i].name >> st[i].score;
    int best = 0;
    for (int i = 1; i < n; i++)
        if (st[i].score > st[best].score) best = i;
    cout << st[best].name << endl;
    return 0;
}
`,
            hints: ['Ең жақсы студенттің индексін <code>best</code> айнымалысында сақтаңыз.', 'Тек <code>&gt;</code> (қатаң) салыстырыңыз — сонда тең жағдайда бірінші қалады.'],
            check: { cases: [ { stdin: '3\nDana 91\nAli 97\nSaya 88\n', out: 'Ali\n' }, { stdin: '3\nTimur 80\nMadina 95\nAset 95\n', out: 'Madina\n' }, { stdin: '1\nErlan 50\n', out: 'Erlan\n' } ] } },
          { type: 'cpp', level: 'hard', xp: 20, prompt: '<code>Account</code> класын аяқтаңыз: <code>deposit(x)</code> балансқа қосады, <code>withdraw(x)</code> қаражат жеткілікті болса шешіп <code>true</code> қайтарады, әйтпесе ештеңе өзгертпей <code>false</code> қайтарады. <code>main</code> дайын: бастапқы баланс, сосын <code>D сома</code> / <code>W сома</code> командалары; соңында баланс пен бас тартылған операциялар саны шығады.',
            starter: P`#include <iostream>
using namespace std;

class Account {
private:
    long long balance;
public:
    Account(long long b) : balance(b) {}
    void deposit(long long x) { balance += x; }
    bool withdraw(long long x) {
        balance -= x;
        return true;
    }
    long long getBalance() const { return balance; }
};

int main() {
    long long start;
    int q;
    cin >> start >> q;
    Account acc(start);
    int refused = 0;
    for (int i = 0; i < q; i++) {
        char c;
        long long x;
        cin >> c >> x;
        if (c == 'D') acc.deposit(x);
        else if (!acc.withdraw(x)) refused++;
    }
    cout << acc.getBalance() << " " << refused << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

class Account {
private:
    long long balance;
public:
    Account(long long b) : balance(b) {}
    void deposit(long long x) { balance += x; }
    bool withdraw(long long x) {
        if (x > balance) return false;
        balance -= x;
        return true;
    }
    long long getBalance() const { return balance; }
};

int main() {
    long long start;
    int q;
    cin >> start >> q;
    Account acc(start);
    int refused = 0;
    for (int i = 0; i < q; i++) {
        char c;
        long long x;
        cin >> c >> x;
        if (c == 'D') acc.deposit(x);
        else if (!acc.withdraw(x)) refused++;
    }
    cout << acc.getBalance() << " " << refused << endl;
    return 0;
}
`,
            hints: ['<code>withdraw</code> ішінде алдымен тексеріңіз: <code>if (x &gt; balance) return false;</code>', 'Тексеруден өткенде ғана <code>balance -= x</code> жасап, <code>true</code> қайтарыңыз.'],
            check: { cases: [ { stdin: '1000 3\nW 300\nW 900\nD 500\n', out: '1200 1\n' }, { stdin: '0 2\nW 1\nW 1\n', out: '0 2\n' }, { stdin: '500 2\nW 500\nD 100\n', out: '100 0\n' } ] } },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>main</code> ішінде алдымен <code>Logger a("A");</code>, сосын <code>Logger b("B");</code> жасалды. <code>main</code> аяқталғанда destructor-лар қандай ретпен шақырылады?', options: ['Алдымен A, сосын B', 'Алдымен B, сосын A', 'Ретсіз', 'Destructor шақырылмайды, оны қолмен шақыру керек'], answer: 1, explain: 'Жергілікті нысандар құрылған ретіне кері ретпен жойылады: B, сосын A.' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: '<code>struct</code> пен <code>class</code> арасындағы жалғыз айырмашылық не?', options: ['<code>struct</code>-та әдіс жазуға болмайды', 'Әдепкі қолжетімділік: <code>struct</code>-та public, <code>class</code>-та private', '<code>class</code> тек heap-те жасалады', '<code>struct</code>-та constructor болмайды'], answer: 1, explain: 'C++-та екеуі де әдіс, constructor, мұрагерлікке ие. Тек әдепкі access specifier әртүрлі.' }
        ]
      },
      {
        id: 'cp-10', title: 'Operator overloading және template', minutes: 16,
        body: `
<p>Өз типіңізді кірістірілген типтер сияқты қолдануға болады: <code>a + b</code>, <code>a == b</code>, <code>cout &lt;&lt; a</code>. Ол үшін операторды <b>overload</b> жасайсыз — бұл <code>operator+</code> деген атаулы кәдімгі функция.</p>
${pre(P`
struct Money {
    long long tiyn;       // 1 теңге = 100 тиын
};
Money operator+(const Money& a, const Money& b) {
    return Money{a.tiyn + b.tiyn};
}
bool operator<(const Money& a, const Money& b) {
    return a.tiyn < b.tiyn;            // енді sort() Money-ді сұрыптай алады
}
ostream& operator<<(ostream& os, const Money& m) {
    os << m.tiyn / 100 << "." << m.tiyn % 100 / 10 << m.tiyn % 10 << " ₸";
    return os;                         // тізбектеу үшін ағынды қайтарамыз
}
Money a{150050}, b{99950};
cout << a + b << endl;                 // 2500.00 ₸`)}
<p><code>operator&lt;&lt;</code> <code>ostream&amp;</code> қайтарады — сонда <code>cout &lt;&lt; a &lt;&lt; b</code> тізбегі жұмыс істейді. Операторды мағынасына сай overload жасаңыз: <code>+</code> қосу сияқты әрекет етуі керек.</p>
<h3>Template: бір код — көп тип</h3>
<p><code>int</code>, <code>double</code> және <code>string</code> үшін бірдей функцияны үш рет жазбау үшін <b>template</b> қолданылады. <code>T</code> — компилятор кейін нақты типпен алмастыратын орын:</p>
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
<p>Компилятор әр қолданылған тип үшін жеке нұсқаны <b>компиляция кезінде</b> жасайды (instantiation), сондықтан template жылдам: іске қосылғанда қосымша шығын жоқ. Сіз бұған дейін template-терді қолдандыңыз: <code>vector&lt;int&gt;</code>, <code>unique_ptr&lt;T&gt;</code>, <code>map&lt;K, V&gt;</code> — бәрі класс template-тері.</p>
<div class="tip">Template-тегі <code>T</code> типі ішінде қолданылған амалдарды қолдауы керек. <code>biggest</code> үшін <code>T</code>-да <code>&lt;</code> болуы шарт — сондықтан <code>Money</code>-ге <code>operator&lt;</code> жазсаңыз, <code>biggest(m1, m2)</code> да жұмыс істейді.</div>`,
        exercises: [
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<code>Vec2</code> құрылымы үшін <code>operator+</code> (координаталарды қосады) және <code>operator&lt;&lt;</code> (<code>(x, y)</code> форматында шығарады) жазыңыз. <code>main</code> дайын: екі вектор оқып, қосындысын шығарады.',
            starter: P`#include <iostream>
using namespace std;

struct Vec2 {
    int x, y;
};

Vec2 operator+(const Vec2& a, const Vec2& b) {
    return a;
}

ostream& operator<<(ostream& os, const Vec2& v) {
    os << v.x << " " << v.y;
    return os;
}

int main() {
    Vec2 a, b;
    cin >> a.x >> a.y >> b.x >> b.y;
    cout << a + b << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

struct Vec2 {
    int x, y;
};

Vec2 operator+(const Vec2& a, const Vec2& b) {
    return Vec2{a.x + b.x, a.y + b.y};
}

ostream& operator<<(ostream& os, const Vec2& v) {
    os << "(" << v.x << ", " << v.y << ")";
    return os;
}

int main() {
    Vec2 a, b;
    cin >> a.x >> a.y >> b.x >> b.y;
    cout << a + b << endl;
    return 0;
}
`,
            hints: ['<code>return Vec2{a.x + b.x, a.y + b.y};</code>', 'Шығыс форматы: <code>os &lt;&lt; "(" &lt;&lt; v.x &lt;&lt; ", " &lt;&lt; v.y &lt;&lt; ")";</code>'],
            check: { cases: [ { stdin: '1 2 3 4\n', out: '(4, 6)\n' }, { stdin: '-5 0 5 -1\n', out: '(0, -1)\n' }, { stdin: '0 0 0 0\n', out: '(0, 0)\n' } ], mustInclude: ['operator+', 'operator<<'] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<code>largest</code> function template-ін жазыңыз: ол кез келген типтегі бос емес векторның ең үлкен элементін қайтарсын (тек <code>&lt;</code> операторын қолданыңыз). <code>main</code> дайын: <code>n</code> бүтін сан, сосын <code>m</code> сөз оқып, екеуінің де ең үлкенін шығарады.',
            starter: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

template <typename T>
T largest(const vector<T>& v) {
    return v[0];
}

int main() {
    int n, m;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> m;
    vector<string> words(m);
    for (int i = 0; i < m; i++) cin >> words[i];
    cout << largest(nums) << endl;
    cout << largest(words) << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

template <typename T>
T largest(const vector<T>& v) {
    T best = v[0];
    for (const T& x : v)
        if (best < x) best = x;
    return best;
}

int main() {
    int n, m;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> m;
    vector<string> words(m);
    for (int i = 0; i < m; i++) cin >> words[i];
    cout << largest(nums) << endl;
    cout << largest(words) << endl;
    return 0;
}
`,
            hints: ['<code>T best = v[0];</code> деп бастап, барлық элементті аралаңыз.', 'Салыстыру: <code>if (best &lt; x) best = x;</code> — бұл <code>int</code> үшін де, <code>string</code> үшін де жұмыс істейді.'],
            check: { cases: [ { stdin: '4\n3 17 -2 9\n3\nalma anar banan\n', out: '17\nbanan\n' }, { stdin: '1\n-5\n2\nzebra apple\n', out: '-5\nzebra\n' }, { stdin: '3\n2 2 1\n3\nkz kaz k\n', out: '2\nkz\n' } ], mustInclude: ['template'] } },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>cout &lt;&lt; p1 &lt;&lt; p2;</code> жұмыс істеуі үшін <code>Point</code> типіне <code>operator&lt;&lt;</code> қалай жариялану керек?', options: ['<code>void operator&lt;&lt;(ostream os, Point p)</code>', '<code>ostream&amp; operator&lt;&lt;(ostream&amp; os, const Point&amp; p)</code>', '<code>string operator&lt;&lt;(const Point&amp; p)</code>', '<code>Point operator&lt;&lt;(ostream&amp; os, Point p)</code>'], answer: 1, explain: 'Ағын reference арқылы алынады (оны көшіруге болмайды) және reference ретінде қайтарылады — сонда келесі <code>&lt;&lt;</code> сол ағынға жазады.' },
          { type: 'quiz', level: 'hard', xp: 10, prompt: 'Template-тің нақты типке арналған коды қашан жасалады?', options: ['Бағдарлама іске қосылғанда, бірінші шақыру кезінде', 'Компиляция кезінде, қолданылған әр тип үшін жеке', 'Ешқашан: template барлық тип үшін бір ортақ код', 'Тек <code>new</code> шақырылғанда'], answer: 1, explain: 'Instantiation компиляция кезінде болады: <code>largest&lt;int&gt;</code> мен <code>largest&lt;string&gt;</code> — екі бөлек функция. Сондықтан қате де компиляцияда шығады.' }
        ]
      },
      {
        id: 'cp-11', title: 'Мұрагерлік және virtual функциялар', minutes: 16,
        body: `
<p><b>Мұрагерлік</b> (inheritance) жаңа класты бар класқа негіздеп жасауға мүмкіндік береді: туынды класс (derived) базалық класстың (base) өрістері мен әдістерін алады және өзінікін қосады.</p>
${pre(P`
class Shape {
public:
    virtual double area() const = 0;   // pure virtual: Shape абстрактілі
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
<h3>Полиморфизм: virtual не береді</h3>
<p>Base-ке pointer не reference арқылы туынды нысанмен жұмыс істеуге болады. <code>virtual</code> әдіс шақырылғанда, pointer-дің типіне емес, <b>нысанның нақты типіне</b> қарап таңдалады (dynamic dispatch):</p>
${pre(P`
vector<unique_ptr<Shape>> shapes;
shapes.push_back(make_unique<Circle>(1.0));
shapes.push_back(make_unique<Rect>(2, 3));
double total = 0;
for (const auto& s : shapes) total += s->area();   // Circle::area, Rect::area`)}
<p><code>virtual</code> жазылмаса, <code>s-&gt;area()</code> әрқашан <code>Shape::area</code>-ны шақырады (static binding) — бұл жиі кездесетін қате. <code>override</code> кілт сөзі компиляторға «мен base-тегі virtual әдісті алмастырамын» дейді: атауда қате болса, компилятор бірден ескертеді.</p>
<ul>
<li><code>= 0</code> — <b>pure virtual</b>: базада іске асыру жоқ, ондай класстың нысанын жасауға болмайды (абстрактілі класс, Java-дағы interface-ке ұқсас).</li>
<li><code>protected</code> — сырттан жабық, бірақ туынды класстарға ашық өрістер.</li>
<li>Base-ке pointer арқылы <code>delete</code> жасалатын болса, base destructor <b>virtual</b> болуы керек — әйтпесе туынды класстың destructor-ы шақырылмайды.</li>
</ul>
<div class="tip"><code>s-&gt;area()</code> — <code>(*s).area()</code> дегеннің қысқа жазылуы: pointer арқылы мүшеге қол жеткізу.</div>`,
        exercises: [
          { type: 'cpp', level: 'hard', xp: 20, prompt: 'Фигуралар тізімі берілген: <code>C r</code> — дөңгелек, <code>R w h</code> — тіктөртбұрыш. Стартердегі код барлық ауданды 0 деп есептейді, себебі <code>Shape::area</code> virtual емес. Класстарды түзетіп, барлық фигураның жалпы ауданын 2 ондық таңбамен шығарыңыз (π = <code>acos(-1)</code>).',
            starter: P`#include <iostream>
#include <iomanip>
#include <vector>
#include <memory>
#include <cmath>
using namespace std;

class Shape {
public:
    double area() const { return 0; }
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const { return acos(-1) * r * r; }
};

class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() const { return w * h; }
};

int main() {
    int n;
    cin >> n;
    vector<unique_ptr<Shape>> shapes;
    for (int i = 0; i < n; i++) {
        char t;
        cin >> t;
        if (t == 'C') {
            double r;
            cin >> r;
            shapes.push_back(make_unique<Circle>(r));
        } else {
            double w, h;
            cin >> w >> h;
            shapes.push_back(make_unique<Rect>(w, h));
        }
    }
    double total = 0;
    for (const auto& s : shapes) total += s->area();
    cout << fixed << setprecision(2) << total << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <iomanip>
#include <vector>
#include <memory>
#include <cmath>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return acos(-1) * r * r; }
};

class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
};

int main() {
    int n;
    cin >> n;
    vector<unique_ptr<Shape>> shapes;
    for (int i = 0; i < n; i++) {
        char t;
        cin >> t;
        if (t == 'C') {
            double r;
            cin >> r;
            shapes.push_back(make_unique<Circle>(r));
        } else {
            double w, h;
            cin >> w >> h;
            shapes.push_back(make_unique<Rect>(w, h));
        }
    }
    double total = 0;
    for (const auto& s : shapes) total += s->area();
    cout << fixed << setprecision(2) << total << endl;
    return 0;
}
`,
            hints: ['<code>Shape</code> ішінде <code>area</code>-ны <code>virtual</code> етіңіз (немесе <code>virtual double area() const = 0;</code>).', 'Туынды класстарда <code>override</code> қосыңыз — қате болса компилятор айтады.'],
            check: { cases: [ { stdin: '2\nC 1\nR 2 3\n', out: '9.14\n' }, { stdin: '1\nR 4 5\n', out: '20.00\n' }, { stdin: '3\nC 2\nC 0.5\nR 1 1\n', out: '14.35\n' } ], mustInclude: ['virtual'] } },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>struct A { void hi() { cout &lt;&lt; "A"; } }; struct B : A { void hi() { cout &lt;&lt; "B"; } };</code> Сосын <code>A* p = new B(); p-&gt;hi();</code> не шығарады?', options: ['<code>A</code>', '<code>B</code>', '<code>AB</code>', 'Компиляция қатесі'], answer: 0, explain: '<code>hi</code> virtual емес, сондықтан шақыру pointer-дің типі (<code>A*</code>) бойынша компиляция кезінде таңдалады: <code>A</code>. <code>virtual</code> болса, <code>B</code> шығар еді.' },
          { type: 'quiz', level: 'hard', xp: 10, prompt: 'Неге полиморфты базалық класстың destructor-ын <code>virtual</code> ету керек?', options: ['Әйтпесе класс компиляцияланбайды', '<code>Base* p = new Derived; delete p;</code> кезінде Derived destructor-ы да шақырылуы үшін', 'Virtual destructor жадты екі есе аз алады', 'Тек абстрактілі класстарда destructor болуы үшін'], answer: 1, explain: 'Virtual болмаса, base pointer арқылы <code>delete</code> тек <code>Base::~Base</code>-ты шақырады — Derived ресурстары босатылмайды (undefined behavior).' },
          { type: 'quiz', level: 'easy', xp: 10, prompt: '<code>virtual double area() const = 0;</code> әдісі бар <code>Shape</code> класы туралы қайсысы дұрыс?', options: ['<code>Shape s;</code> деп нысан жасауға болады', 'Ол абстрактілі: нысанын жасауға болмайды, тек туынды класстар арқылы', '<code>area</code> әрқашан 0 қайтарады', 'Туынды класстар <code>area</code>-ны жазбауы керек'], answer: 1, explain: '<code>= 0</code> — pure virtual. Ондай әдісі бар класс абстрактілі; оны <code>area</code>-ны іске асыратын туынды класс арқылы ғана қолданамыз.' }
        ]
      },
      {
        id: 'cp-12', title: 'STL: sort, map, set, unordered_map', minutes: 17,
        body: `
<p><b>STL</b> (Standard Template Library) — дайын контейнерлер мен алгоритмдер жинағы. Олар template, сондықтан кез келген типпен жұмыс істейді.</p>
<h3>algorithm</h3>
${pre(P`
#include <algorithm>
vector<int> v = {5, 2, 9, 1};
sort(v.begin(), v.end());                           // 1 2 5 9
sort(v.begin(), v.end(), greater<int>());           // 9 5 2 1
reverse(v.begin(), v.end());
int mx = *max_element(v.begin(), v.end());          // итератор → * арқылы мән
int cnt = count(v.begin(), v.end(), 5);

// lambda арқылы өз ретіңіз: балл кемуі, тең болса аты бойынша
sort(st.begin(), st.end(), [](const Student& a, const Student& b) {
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
});`)}
<p><code>v.begin()</code>, <code>v.end()</code> — <b>итераторлар</b>: контейнердің басы мен соңынан кейінгі орын. Алгоритмдер ауқымды осылай қабылдайды.</p>
<h3>map, unordered_map, set</h3>
${pre(P`
#include <map>
map<string, int> stock;               // кілттер сұрыпталған күйде (red-black tree)
stock["Алматы"] += 5;                 // жоқ кілт 0-мен автоматты құрылады
stock["Астана"] = 3;
for (const auto& [city, qty] : stock) // C++17 structured binding
    cout << city << " " << qty << endl;
if (stock.count("Шымкент") == 0) { /* жоқ */ }

#include <unordered_map>
unordered_map<string, int> freq;      // hash table: орта есеппен O(1), реті жоқ

#include <set>
set<int> seen = {5, 1, 5, 3};         // {1, 3, 5}: қайталанбайды, сұрыпталған
seen.insert(4);`)}
<table>
<tr><th>Контейнер</th><th>Іздеу/қосу</th><th>Реті</th></tr>
<tr><td><code>map</code>, <code>set</code></td><td>O(log n)</td><td>кілт бойынша сұрыпталған</td></tr>
<tr><td><code>unordered_map</code>, <code>unordered_set</code></td><td>орта есеппен O(1)</td><td>ретсіз</td></tr>
</table>
<div class="tip">Тұзақ: <code>m[key]</code> кілт жоқ болса, оны әдепкі мәнмен <b>қосып қояды</b>. Тек тексеру керек болса, <code>m.count(key)</code> не <code>m.find(key) != m.end()</code> қолданыңыз.</div>`,
        exercises: [
          { type: 'cpp', level: 'medium', xp: 15, prompt: 'Мәтіндегі сөздер (латынша, кіші әріппен) кіріс біткенше беріледі. Әр сөзді және оның неше рет кездескенін әліпби ретімен шығарыңыз: <code>сөз саны</code>.',
            starter: P`#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    string w;
    while (cin >> w) {
        cout << w << " 1" << endl;
    }
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    map<string, int> freq;
    string w;
    while (cin >> w) freq[w]++;
    for (const auto& [word, c] : freq) cout << word << " " << c << endl;
    return 0;
}
`,
            hints: ['<code>map&lt;string, int&gt; freq;</code> және <code>freq[w]++</code>.', '<code>map</code> кілттерді өздігінен сұрыптайды — циклмен шығару жеткілікті.'],
            check: { cases: [ { stdin: 'b a b c a b\n', out: 'a 2\nb 3\nc 1\n' }, { stdin: 'kaspi\n', out: 'kaspi 1\n' }, { stdin: 'data jol\ndata\n', out: 'data 2\njol 1\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: 'Олимпиада нәтижелері: <code>n</code>, сосын <code>аты балл</code> жолдары. Балл бойынша кемуі ретімен, тең балда аты бойынша әліпби ретімен сұрыптап шығарыңыз. <code>sort</code> пен lambda қолданыңыз.',
            starter: P`#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct P {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<P> v(n);
    for (auto& p : v) cin >> p.name >> p.score;
    for (const auto& p : v) cout << p.name << " " << p.score << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct P {
    string name;
    int score;
};

int main() {
    int n;
    cin >> n;
    vector<P> v(n);
    for (auto& p : v) cin >> p.name >> p.score;
    sort(v.begin(), v.end(), [](const P& a, const P& b) {
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });
    for (const auto& p : v) cout << p.name << " " << p.score << endl;
    return 0;
}
`,
            hints: ['<code>sort(v.begin(), v.end(), [](const P&amp; a, const P&amp; b) { ... });</code>', 'Lambda: балл әртүрлі болса <code>a.score &gt; b.score</code>, әйтпесе <code>a.name &lt; b.name</code>.'],
            check: { cases: [ { stdin: '4\nDana 90\nAli 95\nAset 90\nSaya 70\n', out: 'Ali 95\nAset 90\nDana 90\nSaya 70\n' }, { stdin: '1\nTimur 10\n', out: 'Timur 10\n' }, { stdin: '3\nc 5\nb 5\na 5\n', out: 'a 5\nb 5\nc 5\n' } ], mustInclude: ['sort'] } },
          { type: 'quiz', level: 'easy', xp: 10, prompt: 'Миллион тауар коды бойынша жиі іздеу керек, ал кодтардың реті маңызды емес. Қай контейнер ең қолайлы?', options: ['<code>vector</code> және сызықтық іздеу', '<code>unordered_map</code>', '<code>map</code>, себебі ол әрқашан жылдамырақ', 'C-массив'], answer: 1, explain: '<code>unordered_map</code> — hash table: іздеу орта есеппен O(1). <code>map</code> O(log n) береді, ол рет керек болғанда пайдалы.' },
          { type: 'number', level: 'easy', xp: 10, prompt: '<code>map&lt;string, int&gt; m; m["a"]++; m["b"]; if (m.count("c")) m["d"] = 1;</code> орындалғаннан кейін <code>m.size()</code> неге тең?', answer: 2, tol: 0, explain: '<code>m["a"]++</code> және <code>m["b"]</code> екі кілт қосады (<code>operator[]</code> жоқ кілтті жасайды). <code>count("c")</code> кілт қоспайды және 0 қайтарады, сондықтан <code>"d"</code> да қосылмайды.' }
        ]
      },
      {
        id: 'cp-13', title: 'Рекурсия және қателерді өңдеу (exceptions)', minutes: 16,
        body: `
<p><b>Рекурсия</b> — функцияның өзін-өзі шақыруы. Әр рекурсивті функцияда екі бөлік болады: <b>базалық жағдай</b> (тоқтау шарты) және есепті кішірейтетін <b>рекурсивті қадам</b>.</p>
${pre(P`
long long factorial(int n) {
    if (n <= 1) return 1;            // базалық жағдай
    return n * factorial(n - 1);     // рекурсивті қадам
}

// Backtracking: n ұзындықтағы барлық екілік жолдар
void gen(string cur, int n) {
    if ((int)cur.size() == n) { cout << cur << endl; return; }
    gen(cur + "0", n);
    gen(cur + "1", n);
}`)}
<p>Әр шақыру <b>call stack</b>-те жаңа фрейм ашады. Базалық жағдай болмаса не тым терең болса, стек толып кетеді (<b>stack overflow</b>). C++ стегі Python-ға қарағанда кеңірек, бірақ миллиондаған тереңдікке арналмаған — ондайда циклді қолданыңыз.</p>
<h3>Exceptions: try, throw, catch</h3>
<p>Кәдімгі C++-та күтпеген жағдай <b>exception</b> арқылы хабарланады. Функция <code>throw</code> арқылы қате нысанын лақтырады, ал шақырушы оны <code>try/catch</code> арқылы ұстайды:</p>
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
} catch (const exception& e) {        // кез келген стандартты қате
    cout << "Басқа қате" << endl;
}`)}
<ul>
<li><code>catch</code> блоктары жоғарыдан төмен тексеріледі; бірінші сәйкес келгені орындалады, сондықтан нақтырақ типтер жоғарыда тұрады.</li>
<li><code>stoi("abc")</code> — <code>invalid_argument</code>, <code>v.at(100)</code> — <code>out_of_range</code> лақтырады.</li>
<li>Exception ешкім ұстамаса, бағдарлама <code>std::terminate</code> арқылы апатты түрде тоқтайды. Стек «шешілген» (stack unwinding) кезде жергілікті нысандардың destructor-лары шақырылады — RAII сондықтан маңызды.</li>
</ul>
<div class="tip">DataJol-дағы браузер компиляторы <code>-fno-exceptions</code> режимінде жұмыс істейді: <code>try</code>/<code>throw</code> компиляцияланбайды. Ойын қозғалтқыштары мен embedded жүйелер де жиі осылай жасайды. Сондықтан тапсырмаларда қатені <code>bool</code> қайтару немесе арнайы мән (мысалы, <code>-1</code>) арқылы хабарлаймыз.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: 'Рекурсивті <code>int digitSum(int n)</code> функциясын жазыңыз: теріс емес санның цифрларының қосындысы. Цикл қолданбаңыз: <code>digitSum(n) = n % 10 + digitSum(n / 10)</code>.',
            starter: P`#include <iostream>
using namespace std;

int digitSum(int n) {
    return n % 10;
}

int main() {
    int n;
    cin >> n;
    cout << digitSum(n) << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int digitSum(int n) {
    if (n < 10) return n;
    return n % 10 + digitSum(n / 10);
}

int main() {
    int n;
    cin >> n;
    cout << digitSum(n) << endl;
    return 0;
}
`,
            hints: ['Базалық жағдай: <code>n &lt; 10</code> болса, <code>n</code>-ді қайтарыңыз.', 'Рекурсивті қадам: <code>n % 10 + digitSum(n / 10)</code>.'],
            check: { cases: [ { stdin: '12345\n', out: '15\n' }, { stdin: '0\n', out: '0\n' }, { stdin: '9\n', out: '9\n' }, { stdin: '1000000\n', out: '1\n' } ], mustInclude: ['digitSum'] } },
          { type: 'cpp', level: 'hard', xp: 20, prompt: 'Backtracking: ұзындығы <code>n</code> болатын, қатарынан екі <code>1</code> жоқ барлық екілік жолдарды лексикографиялық ретпен (әр жолға біреуден) шығарыңыз. Мысалы, <code>n = 3</code>: <code>000 001 010 100 101</code>.',
            starter: P`#include <iostream>
#include <string>
using namespace std;

void gen(string cur, int n) {
    if ((int)cur.size() == n) {
        cout << cur << endl;
        return;
    }
    gen(cur + "0", n);
    gen(cur + "1", n);
}

int main() {
    int n;
    cin >> n;
    gen("", n);
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
using namespace std;

void gen(string cur, int n) {
    if ((int)cur.size() == n) {
        cout << cur << endl;
        return;
    }
    gen(cur + "0", n);
    if (cur.empty() || cur.back() != '1') gen(cur + "1", n);
}

int main() {
    int n;
    cin >> n;
    gen("", n);
    return 0;
}
`,
            hints: ['Стартер барлық екілік жолды шығарады. <code>1</code> қоспас бұрын соңғы символды тексеріңіз.', '<code>if (cur.empty() || cur.back() != \'1\') gen(cur + "1", n);</code>'],
            check: { cases: [ { stdin: '3\n', out: '000\n001\n010\n100\n101\n' }, { stdin: '1\n', out: '0\n1\n' }, { stdin: '2\n', out: '00\n01\n10\n' } ] } },
          { type: 'quiz', level: 'medium', xp: 10, prompt: '<code>try { cout &lt;&lt; "1"; throw runtime_error("x"); cout &lt;&lt; "2"; } catch (const exception&amp; e) { cout &lt;&lt; "3"; } cout &lt;&lt; "4";</code> не шығарады? (Кәдімгі компиляторда, exceptions қосулы.)', options: ['<code>1234</code>', '<code>134</code>', '<code>13</code>', '<code>14</code>'], answer: 1, explain: '<code>throw</code>-дан кейін <code>try</code> блогының қалғаны (<code>"2"</code>) өткізіледі, <code>runtime_error</code> <code>exception</code>-нен туындағандықтан catch ұстайды (<code>"3"</code>), сосын бағдарлама жалғасады (<code>"4"</code>).' },
          { type: 'quiz', level: 'medium', xp: 10, prompt: 'Лақтырылған exception-ды ешбір <code>catch</code> ұстамаса не болады?', options: ['Ол үнсіз елемей тасталады', 'Функция 0 қайтарады', 'Бағдарлама <code>std::terminate</code> арқылы апатты түрде тоқтайды', 'Компилятор оны алдын ала тауып, компиляция қатесін береді'], answer: 2, explain: 'Ұсталмаған exception стекті <code>main</code>-нен шыққанша шешеді, содан кейін <code>std::terminate</code> бағдарламаны тоқтатады.' }
        ]
      },
      {
        id: 'cp-p1', title: 'Есептер: Оңай және Орташа', minutes: 45,
        body: `
<p>Бұл сабақ — C++-тағы алгоритмдік есептер жинағы, LeetCode пен олимпиада стиліндегі шағын тапсырмалар. Әр есепте кірісті stdin-нен оқып, жауапты stdout-қа шығарасыз.</p>
<h3>Олимпиада стиліндегі C++ шаблоны</h3>
${pre(P`
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);   // cin/cout-ты жылдамдатады
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    // ... шешім ...
    return 0;
}`)}
<ul>
<li><b>Шеткі жағдайлар:</b> бір элемент, барлық элемент тең, теріс сандар, бос жауап.</li>
<li><b>Типтер:</b> қосынды мен көбейтінді үшін <code>long long</code>.</li>
<li><b>Күрделілік:</b> n ≤ 1000 болса O(n²) жеткілікті; n ≤ 10⁵ болса O(n log n) не O(n) керек.</li>
<li><b>Жауап форматы:</b> артық мәтін, артық бос жол шығармаңыз.</li>
</ul>
<div class="tip">Алдымен қағазға кішкентай мысалды қолмен шешіп алыңыз — алгоритм анық болса, C++ коды өздігінен жазылады.</div>`,
        exercises: [
          { type: 'cpp', level: 'easy', xp: 10, prompt: '<b>Палиндром.</b> Латын кіші әріптерінен тұратын бір сөз берілген. Ол алдынан да, артынан да бірдей оқылса <code>YES</code>, әйтпесе <code>NO</code> шығарыңыз. Екі көрсеткіш (two pointers) қолданыңыз.',
            starter: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    cout << "YES" << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int i = 0, j = (int)s.size() - 1;
    bool ok = true;
    while (i < j) {
        if (s[i] != s[j]) { ok = false; break; }
        i++;
        j--;
    }
    cout << (ok ? "YES" : "NO") << endl;
    return 0;
}
`,
            hints: ['<code>i = 0</code>, <code>j = s.size() - 1</code> деп бастап, ортаға қарай жылжыңыз.', '<code>s[i] != s[j]</code> болса — палиндром емес.'],
            check: { cases: [ { stdin: 'level\n', out: 'YES\n' }, { stdin: 'abca\n', out: 'NO\n' }, { stdin: 'a\n', out: 'YES\n' }, { stdin: 'abba\n', out: 'YES\n' } ] } },
          { type: 'cpp', level: 'easy', xp: 10, prompt: '<b>FizzBuzz.</b> 1-ден <code>n</code>-ге дейінгі әр санды жеке жолға шығарыңыз, бірақ 3-ке бөлінсе <code>Fizz</code>, 5-ке бөлінсе <code>Buzz</code>, екеуіне де бөлінсе <code>FizzBuzz</code>.',
            starter: P`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i % 3 == 0) cout << "Fizz" << endl;
        else if (i % 5 == 0) cout << "Buzz" << endl;
        else cout << i << endl;
    }
    return 0;
}
`,
            solution: P`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) cout << "FizzBuzz" << endl;
        else if (i % 3 == 0) cout << "Fizz" << endl;
        else if (i % 5 == 0) cout << "Buzz" << endl;
        else cout << i << endl;
    }
    return 0;
}
`,
            hints: ['Шарттардың реті маңызды: 15-ке бөлінуді бірінші тексеріңіз.', '<code>if (i % 15 == 0)</code> → <code>FizzBuzz</code>.'],
            check: { cases: [ { stdin: '5\n', out: '1\n2\nFizz\n4\nBuzz\n' }, { stdin: '15\n', out: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n' }, { stdin: '1\n', out: '1\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<b>Екінші орын.</b> <code>n</code> сан берілген. Қайталанбайтын мәндер ішіндегі екінші ең үлкенін шығарыңыз. Ондай мән жоқ болса (барлығы тең), <code>NONE</code> шығарыңыз. Бір өтуде (O(n)) шешуге тырысыңыз.',
            starter: P`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    cout << a[n - 2] << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    long long first = a[0];
    bool hasSecond = false;
    long long second = 0;
    for (int i = 1; i < n; i++) {
        long long x = a[i];
        if (x > first) {
            second = first;
            hasSecond = true;
            first = x;
        } else if (x < first && (!hasSecond || x > second)) {
            second = x;
            hasSecond = true;
        }
    }
    if (hasSecond) cout << second << endl;
    else cout << "NONE" << endl;
    return 0;
}
`,
            hints: ['Екі айнымалы ұстаңыз: <code>first</code> және <code>second</code>, әрі <code>second</code> бар ма деген белгі.', 'Жаңа максимум келсе, ескі <code>first</code> <code>second</code>-қа түседі; <code>first</code>-ке тең мәнді елемеңіз.'],
            check: { cases: [ { stdin: '5\n3 9 7 9 1\n', out: '7\n' }, { stdin: '3\n4 4 4\n', out: 'NONE\n' }, { stdin: '1\n10\n', out: 'NONE\n' }, { stdin: '4\n-1 -5 -1 -3\n', out: '-3\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<b>Two Sum.</b> <code>n</code>, <code>target</code>, сосын <code>n</code> сан берілген. Қосындысы <code>target</code> болатын екі элементтің индекстерін <code>i j</code> (0-ден, <code>i &lt; j</code>) шығарыңыз. Жауап дәл біреу деп кепілдік беріледі. <code>unordered_map</code> арқылы O(n) шешіңіз.',
            starter: P`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    long long target;
    cin >> n >> target;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    cout << 0 << " " << 1 << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    long long target;
    cin >> n >> target;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    unordered_map<long long, int> pos;
    for (int j = 0; j < n; j++) {
        auto it = pos.find(target - a[j]);
        if (it != pos.end()) {
            cout << it->second << " " << j << endl;
            return 0;
        }
        pos[a[j]] = j;
    }
    return 0;
}
`,
            hints: ['Әр <code>a[j]</code> үшін <code>target - a[j]</code> бұрын кездесті ме — соны тексеріңіз.', '<code>pos</code> мәннен индекске апарады; тексерген соң ғана <code>pos[a[j]] = j</code> жазыңыз.'],
            check: { cases: [ { stdin: '4 9\n2 7 11 15\n', out: '0 1\n' }, { stdin: '3 6\n3 2 4\n', out: '1 2\n' }, { stdin: '2 6\n3 3\n', out: '0 1\n' }, { stdin: '5 0\n-3 8 1 3 9\n', out: '0 3\n' } ] } },
          { type: 'number', level: 'medium', xp: 10, prompt: 'Сұрыпталған 1 000 элементті <code>vector</code>-те binary search ең нашар жағдайда шамамен неше салыстыру жасайды? (Бүтін санмен, ⌈log₂ 1000⌉.)', answer: 10, tol: 0, explain: 'Әр қадамда ауқым екі есе кішірейеді: 2¹⁰ = 1024 ≥ 1000, сондықтан 10 қадам жеткілікті.' }
        ]
      },
      {
        id: 'cp-p2', title: 'Есептер: Орташа және Қиын', minutes: 60,
        body: `
<p>Бұл жинақтағы есептер интервью мен олимпиада деңгейінде: stack, sliding window, binary search, BFS және динамикалық бағдарламалау. Python-да DSA модулінде таныс болған идеяларды енді C++ STL-мен жүзеге асырасыз.</p>
<table>
<tr><th>Идея</th><th>C++ құралы</th></tr>
<tr><td>Stack</td><td><code>vector</code> (<code>push_back</code>, <code>back</code>, <code>pop_back</code>) немесе <code>string</code></td></tr>
<tr><td>Queue (BFS)</td><td><code>vector</code> + «бас» индексі (<code>head</code>)</td></tr>
<tr><td>Соңғы кездескен орын</td><td><code>vector&lt;int&gt; last(256, -1)</code> немесе <code>unordered_map</code></td></tr>
<tr><td>Binary search</td><td><code>lower_bound(v.begin(), v.end(), x)</code></td></tr>
<tr><td>DP кестесі</td><td><code>vector&lt;long long&gt; dp(n + 1, INF)</code></td></tr>
</table>
${pre(P`
// lower_bound: x-тен кіші емес бірінші элементке итератор
vector<int> v = {1, 3, 3, 5, 8};
int idx = lower_bound(v.begin(), v.end(), 3) - v.begin();   // 1
bool found = idx < (int)v.size() && v[idx] == 3;            // true

// Тордағы 4 көрші
int dr[4] = {1, -1, 0, 0};
int dc[4] = {0, 0, 1, -1};`)}
<div class="tip">BFS үшін <code>&lt;queue&gt;</code> ыңғайлы, бірақ қарапайым <code>vector</code> мен <code>head</code> индексі де толық жетеді: <code>while (head &lt; (int)q.size()) { auto cur = q[head++]; ... }</code>.</div>`,
        exercises: [
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<b>Жақшалар.</b> <code>()[]{}</code> символдарынан тұратын бос емес жол берілген. Жақшалар дұрыс жабылса <code>YES</code>, әйтпесе <code>NO</code> шығарыңыз. Stack ретінде <code>vector&lt;char&gt;</code> не <code>string</code> қолданыңыз.',
            starter: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int open = 0, close = 0;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') open++;
        else close++;
    }
    cout << (open == close ? "YES" : "NO") << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    string st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push_back(c);
        } else {
            char need = (c == ')') ? '(' : (c == ']') ? '[' : '{';
            if (st.empty() || st.back() != need) { ok = false; break; }
            st.pop_back();
        }
    }
    if (!st.empty()) ok = false;
    cout << (ok ? "YES" : "NO") << endl;
    return 0;
}
`,
            hints: ['Ашылатын жақшаны стекке салыңыз; жабылатын келгенде стектің үстіңгісі сәйкес болуы керек.', 'Соңында стек бос болуы шарт: <code>((</code> — <code>NO</code>.'],
            check: { cases: [ { stdin: '([]{})\n', out: 'YES\n' }, { stdin: '(]\n', out: 'NO\n' }, { stdin: '([)]\n', out: 'NO\n' }, { stdin: '((\n', out: 'NO\n' } ] } },
          { type: 'cpp', level: 'medium', xp: 15, prompt: '<b>Қайталанбайтын ең ұзын бөлік.</b> Латын әріптерінен тұратын жол берілген. Ішінде бірде-бір символ қайталанбайтын ең ұзын <b>қатар тұрған</b> бөліктің ұзындығын шығарыңыз. Sliding window арқылы O(n).',
            starter: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s;
    cin >> s;
    cout << s.size() << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s;
    cin >> s;
    vector<int> last(256, -1);
    int best = 0, left = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        unsigned char c = s[i];
        if (last[c] >= left) left = last[c] + 1;
        last[c] = i;
        if (i - left + 1 > best) best = i - left + 1;
    }
    cout << best << endl;
    return 0;
}
`,
            hints: ['<code>last[c]</code> — <code>c</code> символының соңғы кездескен индексі. Терезенің сол шеті — <code>left</code>.', 'Егер <code>last[c] &gt;= left</code> болса, <code>left = last[c] + 1</code>; ұзындық — <code>i - left + 1</code>.'],
            check: { cases: [ { stdin: 'abcabcbb\n', out: '3\n' }, { stdin: 'bbbbb\n', out: '1\n' }, { stdin: 'pwwkew\n', out: '3\n' }, { stdin: 'abba\n', out: '2\n' } ] } },
          { type: 'cpp', level: 'hard', xp: 20, prompt: '<b>Бірінші орын.</b> Кемімейтін ретпен сұрыпталған <code>n</code> сан және <code>q</code> сұрау берілген. Әр сұрау <code>x</code> үшін <code>x</code> бірінші кездесетін индексті (0-ден) жеке жолға шығарыңыз, жоқ болса <code>-1</code>. Әр сұрауға O(log n): өзіңіз binary search жазыңыз не <code>lower_bound</code> қолданыңыз.',
            starter: P`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int k = 0; k < q; k++) {
        int x;
        cin >> x;
        cout << -1 << endl;
    }
    return 0;
}
`,
            solution: P`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int k = 0; k < q; k++) {
        int x;
        cin >> x;
        int idx = lower_bound(a.begin(), a.end(), x) - a.begin();
        if (idx < n && a[idx] == x) cout << idx << endl;
        else cout << -1 << endl;
    }
    return 0;
}
`,
            hints: ['<code>lower_bound</code> <code>x</code>-тен кіші емес бірінші элементті береді; индекс — <code>it - a.begin()</code>.', 'Табылған орында шынымен <code>x</code> тұрғанын тексеріңіз, әйтпесе <code>-1</code>.'],
            check: { cases: [ { stdin: '6 4\n1 3 3 3 7 9\n3\n1\n8\n9\n', out: '1\n0\n-1\n5\n' }, { stdin: '1 2\n5\n5\n4\n', out: '0\n-1\n' }, { stdin: '5 2\n2 2 2 2 2\n2\n3\n', out: '0\n-1\n' } ] } },
          { type: 'cpp', level: 'hard', xp: 20, prompt: '<b>Лабиринт (BFS).</b> <code>n m</code> және <code>n</code> жолдан тұратын тор берілген: <code>.</code> — бос, <code>#</code> — қабырға. Сол жақ жоғарғы бұрыштан (0,0) оң жақ төменгі бұрышқа (n−1,m−1) дейінгі ең аз қадам санын шығарыңыз (жоғары/төмен/солға/оңға). Жол жоқ болса, <code>-1</code>. Бастапқы ұяшық бос деп кепілдік беріледі.',
            starter: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (auto& row : g) cin >> row;
    cout << (n - 1) + (m - 1) << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (auto& row : g) cin >> row;
    if (g[n - 1][m - 1] == '#') { cout << -1 << endl; return 0; }
    vector<vector<int>> dist(n, vector<int>(m, -1));
    vector<pair<int, int>> q;
    q.push_back({0, 0});
    dist[0][0] = 0;
    int dr[4] = {1, -1, 0, 0};
    int dc[4] = {0, 0, 1, -1};
    int head = 0;
    while (head < (int)q.size()) {
        auto [r, c] = q[head++];
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
            if (g[nr][nc] == '#' || dist[nr][nc] != -1) continue;
            dist[nr][nc] = dist[r][c] + 1;
            q.push_back({nr, nc});
        }
    }
    cout << dist[n - 1][m - 1] << endl;
    return 0;
}
`,
            hints: ['<code>dist</code> кестесін -1-мен толтырыңыз; бұл әрі «барылмаған» белгісі.', 'Кезек — <code>vector&lt;pair&lt;int,int&gt;&gt;</code> және <code>head</code> индексі. Көршіні торда, қабырға емес және барылмаған болса ғана қосыңыз.'],
            check: { cases: [ { stdin: '3 3\n...\n.#.\n...\n', out: '4\n' }, { stdin: '3 4\n.#..\n.#.#\n...#\n', out: '-1\n' }, { stdin: '1 1\n.\n', out: '0\n' }, { stdin: '4 4\n.#..\n.#.#\n...#\n##..\n', out: '6\n' }, { stdin: '3 5\n.....\n####.\n.....\n', out: '6\n' } ] } },
          { type: 'cpp', level: 'hard', xp: 20, prompt: '<b>Тиын ұсату (DP).</b> <code>k</code> түрлі тиын номиналы және <code>amount</code> сомасы берілген (әр номиналдан шексіз көп). <code>amount</code>-ты жинауға қажет ең аз тиын санын шығарыңыз; мүмкін болмаса <code>-1</code>. <code>dp[s]</code> — <code>s</code> сомасына керек ең аз тиын.',
            starter: P`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int k, amount;
    cin >> k >> amount;
    vector<int> coins(k);
    for (auto& c : coins) cin >> c;
    sort(coins.rbegin(), coins.rend());
    int cnt = 0;
    for (int c : coins) {
        cnt += amount / c;
        amount %= c;
    }
    cout << (amount == 0 ? cnt : -1) << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int k, amount;
    cin >> k >> amount;
    vector<int> coins(k);
    for (auto& c : coins) cin >> c;
    const int INF = 1000000000;
    vector<int> dp(amount + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= amount; s++)
        for (int c : coins)
            if (c <= s && dp[s - c] + 1 < dp[s]) dp[s] = dp[s - c] + 1;
    cout << (dp[amount] >= INF ? -1 : dp[amount]) << endl;
    return 0;
}
`,
            hints: ['Стартердегі greedy (ең үлкен тиыннан бастау) <code>1 3 4</code> және 6 үшін 3 береді, ал дұрысы 2 (3+3).', '<code>dp[0] = 0</code>; әр <code>s</code> үшін <code>dp[s] = min(dp[s], dp[s - c] + 1)</code>.'],
            check: { cases: [ { stdin: '3 6\n1 3 4\n', out: '2\n' }, { stdin: '1 3\n2\n', out: '-1\n' }, { stdin: '3 11\n1 2 5\n', out: '3\n' }, { stdin: '2 0\n5 7\n', out: '0\n' } ] } }
        ]
      },
      {
        id: 'cp-gate', gate: true, title: 'Модуль емтиханы: C++', minutes: 45,
        body: `
<p>Қорытынды емтихан бүкіл модульді қамтиды: reference мен pointer, virtual dispatch, STL контейнерлері, template класс және рекурсия. Өту үшін ұпайдың кемінде <b>75%</b>-ын жинау керек.</p>
<ul>
<li>Шығыс форматын дәл сақтаңыз: артық бос орын не мәтін қате деп саналады.</li>
<li>Үлкен қосындыларға <code>long long</code> алыңыз.</li>
<li>Кодты алдымен кішкентай мысалмен «Іске қосу» арқылы тексеріңіз, сосын «Тексеру» батырмасын басыңыз.</li>
</ul>`,
        exercises: [
          { type: 'quiz', level: 'medium', xp: 15, prompt: '<code>void f(int a, int&amp; b, int* c) { a++; b++; (*c)++; }</code>. <code>int x = 1, y = 1, z = 1; f(x, y, &amp;z);</code> орындалғаннан кейін <code>x y z</code> қандай?', options: ['<code>1 1 1</code>', '<code>2 2 2</code>', '<code>1 2 2</code>', '<code>1 2 1</code>'], answer: 2, explain: '<code>a</code> — көшірме, <code>x</code> өзгермейді. <code>b</code> — reference, <code>y</code> 2 болады. <code>c</code> — <code>z</code>-тің адресі, <code>(*c)++</code> оны 2 етеді.' },
          { type: 'quiz', level: 'hard', xp: 15, prompt: '<code>struct A { virtual string who() { return "A"; } }; struct B : A { string who() override { return "B"; } };</code>. <code>B b; A a = b; A&amp; r = b;</code> болса, <code>a.who() + r.who()</code> нені береді?', options: ['<code>AA</code>', '<code>AB</code>', '<code>BB</code>', '<code>BA</code>'], answer: 1, explain: '<code>A a = b</code> — мәні бойынша көшіру: B бөлігі «кесіліп» (object slicing), <code>a</code> шын мәнінде A. Ал <code>r</code> — B нысанына reference, virtual шақыру <code>B::who</code>-ға барады.' },
          { type: 'number', level: 'medium', xp: 15, prompt: '<code>set&lt;int&gt; s = {4, 1, 4, 2}; s.insert(1); s.insert(3); unordered_map&lt;int, int&gt; m; for (int x : s) m[x % 2]++;</code> орындалғаннан кейін <code>m[1]</code> неге тең?', answer: 2, tol: 0, explain: 'Жиын қайталануды жояды: <code>{1, 2, 3, 4}</code>. Тақ сандар — 1 мен 3, сондықтан <code>m[1] = 2</code>.' },
          { type: 'cpp', level: 'medium', xp: 25, prompt: '<b>Қалалар бойынша сатылым.</b> <code>n</code> тапсырыс берілген, әрқайсысы <code>қала сома</code> (қала аты — латынша бір сөз, сома — теңге). Әр қаланың жалпы сатылымын қала атауының әліпби ретімен <code>қала сома</code> түрінде шығарыңыз. Соңғы жолда ең көп сатылымы бар қаланың атауын шығарыңыз (тең болса — әліпби бойынша бірінші). Сомалар үлкен болуы мүмкін.',
            starter: P`#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string city;
        int amount;
        cin >> city >> amount;
        cout << city << " " << amount << endl;
    }
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, long long> total;
    for (int i = 0; i < n; i++) {
        string city;
        long long amount;
        cin >> city >> amount;
        total[city] += amount;
    }
    string best;
    long long bestSum = -1;
    for (const auto& [city, sum] : total) {
        cout << city << " " << sum << endl;
        if (sum > bestSum) { bestSum = sum; best = city; }
    }
    cout << best << endl;
    return 0;
}
`,
            hints: ['<code>map&lt;string, long long&gt;</code> — қала → жалпы сома, кілттер әліпби бойынша сұрыпталады.', 'Шығару циклінде <code>&gt;</code> арқылы максимумды іздеңіз: тең болса, әліпби бойынша бірінші қалады.'],
            check: { cases: [ { stdin: '5\nAstana 2000\nAlmaty 1500\nAstana 500\nShymkent 3000\nAlmaty 1000\n', out: 'Almaty 2500\nAstana 2500\nShymkent 3000\nShymkent\n' }, { stdin: '1\nAtyrau 700\n', out: 'Atyrau 700\nAtyrau\n' }, { stdin: '3\nAktau 2000000000\nAktau 2000000000\nTaraz 5\n', out: 'Aktau 4000000000\nTaraz 5\nAktau\n' } ] } },
          { type: 'cpp', level: 'hard', xp: 25, prompt: '<b>Stack template.</b> <code>Stack&lt;T&gt;</code> класс template-ін <code>vector&lt;T&gt;</code> негізінде аяқтаңыз: <code>push</code>, <code>pop</code>, <code>top</code>, <code>empty</code>, <code>size</code>. <code>main</code> дайын: командалар <code>push X</code>, <code>pop</code>, <code>top</code>, <code>size</code>. Бос стекте <code>pop</code> не <code>top</code> келсе, <code>EMPTY</code> шығады.',
            starter: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

template <typename T>
class Stack {
    vector<T> data;
public:
    void push(const T& x) { data.push_back(x); }
    void pop() {}
    T top() const { return data[0]; }
    bool empty() const { return data.empty(); }
    int size() const { return (int)data.size(); }
};

int main() {
    Stack<string> st;
    string cmd;
    while (cin >> cmd) {
        if (cmd == "push") {
            string x;
            cin >> x;
            st.push(x);
        } else if (cmd == "size") {
            cout << st.size() << endl;
        } else if (st.empty()) {
            cout << "EMPTY" << endl;
        } else if (cmd == "top") {
            cout << st.top() << endl;
        } else {
            cout << st.top() << endl;
            st.pop();
        }
    }
    return 0;
}
`,
            solution: P`#include <iostream>
#include <string>
#include <vector>
using namespace std;

template <typename T>
class Stack {
    vector<T> data;
public:
    void push(const T& x) { data.push_back(x); }
    void pop() { data.pop_back(); }
    T top() const { return data.back(); }
    bool empty() const { return data.empty(); }
    int size() const { return (int)data.size(); }
};

int main() {
    Stack<string> st;
    string cmd;
    while (cin >> cmd) {
        if (cmd == "push") {
            string x;
            cin >> x;
            st.push(x);
        } else if (cmd == "size") {
            cout << st.size() << endl;
        } else if (st.empty()) {
            cout << "EMPTY" << endl;
        } else if (cmd == "top") {
            cout << st.top() << endl;
        } else {
            cout << st.top() << endl;
            st.pop();
        }
    }
    return 0;
}
`,
            hints: ['Стектің үсті — вектордың <b>соңы</b>: <code>data.back()</code>.', '<code>pop</code> — <code>data.pop_back()</code>.'],
            check: { cases: [ { stdin: 'push a\npush b\ntop\npop\nsize\npop\npop\n', out: 'b\nb\n1\na\nEMPTY\n' }, { stdin: 'top\nsize\n', out: 'EMPTY\n0\n' }, { stdin: 'push x\npush y\npush z\npop\npop\ntop\n', out: 'z\ny\nx\n' } ], mustInclude: ['template'] } },
          { type: 'cpp', level: 'hard', xp: 25, prompt: '<b>N ферзь.</b> <code>n × n</code> шахмат тақтасына бір-бірін соқпайтын <code>n</code> ферзьді (бір жолда, бір бағанда, бір диагональда екеуі болмайды) неше тәсілмен қоюға болады? 1 ≤ n ≤ 8. Backtracking: жол бойынша қойып, бағандар мен екі диагональды бос емес деп белгілеңіз.',
            starter: P`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << n << endl;
    return 0;
}
`,
            solution: P`#include <iostream>
#include <vector>
using namespace std;

int n, total = 0;
vector<bool> col, d1, d2;

void place(int r) {
    if (r == n) { total++; return; }
    for (int c = 0; c < n; c++) {
        if (col[c] || d1[r + c] || d2[r - c + n - 1]) continue;
        col[c] = d1[r + c] = d2[r - c + n - 1] = true;
        place(r + 1);
        col[c] = d1[r + c] = d2[r - c + n - 1] = false;
    }
}

int main() {
    cin >> n;
    col.assign(n, false);
    d1.assign(2 * n - 1, false);
    d2.assign(2 * n - 1, false);
    place(0);
    cout << total << endl;
    return 0;
}
`,
            hints: ['Бір диагональда <code>r + c</code> тұрақты, екіншісінде <code>r - c</code> тұрақты (индекс үшін <code>+ n - 1</code> қосыңыз).', 'Ферзьді қойып, <code>place(r + 1)</code> шақырып, сосын белгілерді қайта алыңыз (backtrack).'],
            check: { cases: [ { stdin: '4\n', out: '2\n' }, { stdin: '1\n', out: '1\n' }, { stdin: '6\n', out: '4\n' }, { stdin: '8\n', out: '92\n' } ] } }
        ]
      }
    ]
  };
})();
