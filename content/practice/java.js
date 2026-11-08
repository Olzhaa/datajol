// Practice tasks after the lessons of java-1. Each lesson's list opens one task at a time.
DJ.addPractice('java-1', {
 "jv-1": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Бағыт билеті",
   "prompt": "<p>Кірісте екі сөз бар: шығатын қала және баратын қала (мысалы, <code>Almaty Astana</code>). Бағдарлама бір жол басып шығарсын:</p><pre><code>Almaty -&gt; Astana</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String from = sc.next();\n        // екінші қаланы оқып, нәтижені басып шығарыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String from = sc.next();\n        String to = sc.next();\n        System.out.println(from + \" -> \" + to);\n    }\n}\n",
   "hints": [
    "Екінші сөзді де <code>sc.next()</code> арқылы оқыңыз.",
    "Жолдарды <code>+</code> арқылы біріктіріңіз: <code>from + \" -&gt; \" + to</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Almaty Astana\n",
      "out": "Almaty -> Astana\n"
     },
     {
      "stdin": "Shymkent Taraz\n",
      "out": "Shymkent -> Taraz\n"
     },
     {
      "stdin": "Aktau\nAtyrau\n",
      "out": "Aktau -> Atyrau\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Үш сөз кері ретпен",
   "prompt": "<p>Кірісте үш сөз бар. Оларды кері ретпен, бір бос орынмен бөліп, бір жолға басып шығарыңыз: <code>alma almurt orik</code> → <code>orik almurt alma</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        // қалған екі сөзді оқыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        String c = sc.next();\n        System.out.println(c + \" \" + b + \" \" + a);\n    }\n}\n",
   "hints": [
    "Үш сөзді үш айнымалыға оқыңыз.",
    "Басып шығарғанда ретін ауыстырыңыз: <code>c + \" \" + b + \" \" + a</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "alma almurt orik\n",
      "out": "orik almurt alma\n"
     },
     {
      "stdin": "one two three\n",
      "out": "three two one\n"
     },
     {
      "stdin": "A\nB\nC\n",
      "out": "C B A\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Екі сан қосындысы",
   "prompt": "<p>Кірісте екі бүтін сан <code>a</code> және <code>b</code>. Қосындыны мына түрде басып шығарыңыз: <code>3 + 5 = 8</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + \" + \" + b + \" = \" + a + b);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + \" + \" + b + \" = \" + (a + b));\n    }\n}\n",
   "hints": [
    "<code>a + \" + \" + b + \" = \" + a + b</code> сандарды қоспай, жол ретінде жалғап жібереді.",
    "Қосындыны жақшаға алыңыз: <code>(a + b)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 5\n",
      "out": "3 + 5 = 8\n"
     },
     {
      "stdin": "10 -4\n",
      "out": "10 + -4 = 6\n"
     },
     {
      "stdin": "0 0\n",
      "out": "0 + 0 = 0\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Оқушы карточкасы",
   "prompt": "<p>Кірісте оқушының аты, қаласы және жасы (бүтін сан) бар: <code>Aruzhan Karaganda 15</code>. Төрт жол басып шығарыңыз (туған жылы = 2026 − жасы):</p><pre><code>Name: Aruzhan\nCity: Karaganda\nAge: 15\nBorn: 2011</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // city мен age-ті оқып, төрт жолды басыңыз\n        System.out.println(\"Name: \" + name);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        String city = sc.next();\n        int age = sc.nextInt();\n        System.out.println(\"Name: \" + name);\n        System.out.println(\"City: \" + city);\n        System.out.println(\"Age: \" + age);\n        System.out.println(\"Born: \" + (2026 - age));\n    }\n}\n",
   "hints": [
    "Жасты <code>sc.nextInt()</code> арқылы оқыңыз.",
    "Айырманы жақшаға алыңыз: <code>\"Born: \" + (2026 - age)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Aruzhan Karaganda 15\n",
      "out": "Name: Aruzhan\nCity: Karaganda\nAge: 15\nBorn: 2011\n"
     },
     {
      "stdin": "Timur Oral 30\n",
      "out": "Name: Timur\nCity: Oral\nAge: 30\nBorn: 1996\n"
     },
     {
      "stdin": "Dana\nKostanay\n7\n",
      "out": "Name: Dana\nCity: Kostanay\nAge: 7\nBorn: 2019\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Тауар сомасы",
   "prompt": "<p>Кірісте тауар атауы, бір данасының бағасы (теңге) және саны бар: <code>Nan 250 4</code>. Мына түрде басып шығарыңыз:</p><pre><code>Nan x4 = 1000</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String item = sc.next();\n        // бағасы мен санын оқыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String item = sc.next();\n        int price = sc.nextInt();\n        int qty = sc.nextInt();\n        System.out.println(item + \" x\" + qty + \" = \" + (price * qty));\n    }\n}\n",
   "hints": [
    "Атауды <code>next()</code>, бағасы мен санын <code>nextInt()</code> арқылы оқыңыз.",
    "Көбейтіндіні жақшаға алыңыз: <code>(price * qty)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Nan 250 4\n",
      "out": "Nan x4 = 1000\n"
     },
     {
      "stdin": "Sut 480 1\n",
      "out": "Sut x1 = 480\n"
     },
     {
      "stdin": "Kumys 1200 3\n",
      "out": "Kumys x3 = 3600\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ойын нәтижесі",
   "prompt": "<p>Кірісте екі команданың аты мен голдары: <code>Kairat 2 Astana 1</code>. Екі жол басып шығарыңыз: бірінші жолда есеп, екіншісінде голдардың жалпы саны.</p><pre><code>Kairat 2:1 Astana\nGoals: 3</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String t1 = sc.next();\n        int g1 = sc.nextInt();\n        // екінші команданы оқыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String t1 = sc.next();\n        int g1 = sc.nextInt();\n        String t2 = sc.next();\n        int g2 = sc.nextInt();\n        System.out.println(t1 + \" \" + g1 + \":\" + g2 + \" \" + t2);\n        System.out.println(\"Goals: \" + (g1 + g2));\n    }\n}\n",
   "hints": [
    "Кіріс реті: сөз, сан, сөз, сан — сол ретпен оқыңыз.",
    "Екінші жолда қосындыны жақшаға алыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Kairat 2 Astana 1\n",
      "out": "Kairat 2:1 Astana\nGoals: 3\n"
     },
     {
      "stdin": "Tobol 0 Aktobe 0\n",
      "out": "Tobol 0:0 Aktobe\nGoals: 0\n"
     },
     {
      "stdin": "Ordabasy 3\nZhetysu 4\n",
      "out": "Ordabasy 3:4 Zhetysu\nGoals: 7\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Сатып алу чегі",
   "prompt": "<p>Кірісте сатып алушының аты, сосын үш тауардың бағасы (теңге): <code>Daniyar 1200 800 3500</code>. Төрт жол басып шығарыңыз; жеткізу әрқашан 1500 теңге:</p><pre><code>Customer: Daniyar\nItems: 3\nTotal: 5500\nWith delivery: 7000</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        // үш бағаны оқып, қосындыны есептеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String name = sc.next();\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        int total = a + b + c;\n        System.out.println(\"Customer: \" + name);\n        System.out.println(\"Items: 3\");\n        System.out.println(\"Total: \" + total);\n        System.out.println(\"With delivery: \" + (total + 1500));\n    }\n}\n",
   "hints": [
    "Қосындыны бөлек айнымалыда сақтаңыз: <code>int total = a + b + c;</code>.",
    "Соңғы жолда <code>(total + 1500)</code> жақшада болсын."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Daniyar 1200 800 3500\n",
      "out": "Customer: Daniyar\nItems: 3\nTotal: 5500\nWith delivery: 7000\n"
     },
     {
      "stdin": "Aigerim 100 200 300\n",
      "out": "Customer: Aigerim\nItems: 3\nTotal: 600\nWith delivery: 2100\n"
     },
     {
      "stdin": "Erlan\n0\n0\n0\n",
      "out": "Customer: Erlan\nItems: 3\nTotal: 0\nWith delivery: 1500\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Ауа райы есебі",
   "prompt": "<p>Кірісте қала атауы, таңертеңгі және кешкі температура (бүтін сандар, теріс болуы мүмкін): <code>Astana -12 -5</code>. Төрт жол басып шығарыңыз; <code>Change</code> = кешкі − таңертеңгі:</p><pre><code>City: Astana\nMorning: -12\nEvening: -5\nChange: 7</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String city = sc.next();\n        // екі температураны оқыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String city = sc.next();\n        int morning = sc.nextInt();\n        int evening = sc.nextInt();\n        System.out.println(\"City: \" + city);\n        System.out.println(\"Morning: \" + morning);\n        System.out.println(\"Evening: \" + evening);\n        System.out.println(\"Change: \" + (evening - morning));\n    }\n}\n",
   "hints": [
    "Теріс сандарды да <code>nextInt()</code> дұрыс оқиды.",
    "Айырманы жақшаға алыңыз: <code>(evening - morning)</code>, әйтпесе минус жолға жабысып қалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Astana -12 -5\n",
      "out": "City: Astana\nMorning: -12\nEvening: -5\nChange: 7\n"
     },
     {
      "stdin": "Turkistan 30 22\n",
      "out": "City: Turkistan\nMorning: 30\nEvening: 22\nChange: -8\n"
     },
     {
      "stdin": "Oskemen 0 0\n",
      "out": "City: Oskemen\nMorning: 0\nEvening: 0\nChange: 0\n"
     }
    ]
   }
  }
 ],
 "jv-2": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Минутты сағатқа айналдыру",
   "prompt": "<p>Кірісте минут саны <code>n</code> (0 ≤ n ≤ 10⁶). Оны сағат пен минутқа бөліп, <code>2 h 15 min</code> түрінде басыңыз. Мысал: <code>135</code> → <code>2 h 15 min</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // сағат: n / 60, минут: n % 60\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(n / 60 + \" h \" + n % 60 + \" min\");\n    }\n}\n",
   "hints": [
    "Бүтін бөлу <code>n / 60</code> толық сағаттарды береді.",
    "Қалдық <code>n % 60</code> — қалған минуттар."
   ],
   "check": {
    "cases": [
     {
      "stdin": "135\n",
      "out": "2 h 15 min\n"
     },
     {
      "stdin": "59\n",
      "out": "0 h 59 min\n"
     },
     {
      "stdin": "600\n",
      "out": "10 h 0 min\n"
     },
     {
      "stdin": "0\n",
      "out": "0 h 0 min\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Цельсийден Фаренгейтке",
   "prompt": "<p>Кірісте бүтін температура <code>c</code> (Цельсий). Фаренгейтке айналдырыңыз: <code>F = c · 9 / 5 + 32</code>, нәтижені үтірден кейін 1 таңбамен басыңыз. Мысал: <code>-7</code> → <code>19.4</code>. Бүтін бөлуден сақ болыңыз.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int c = sc.nextInt();\n        double f = c * 9 / 5 + 32;\n        System.out.println(String.format(\"%.1f\", f));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int c = sc.nextInt();\n        double f = c * 9.0 / 5 + 32;\n        System.out.println(String.format(\"%.1f\", f));\n    }\n}\n",
   "hints": [
    "<code>c * 9 / 5</code> бүтін бөлу жасайды: -7 үшін -12, ал дұрысы -12.6.",
    "<code>9.0</code> жазыңыз немесе <code>(double) c</code> арқылы түрлендіріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "-7\n",
      "out": "19.4\n"
     },
     {
      "stdin": "100\n",
      "out": "212.0\n"
     },
     {
      "stdin": "37\n",
      "out": "98.6\n"
     },
     {
      "stdin": "1\n",
      "out": "33.8\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Автобус саны",
   "prompt": "<p>Кірісте екі бүтін сан: оқушылар саны <code>n</code> және бір автобустың орын саны <code>k</code> (1 ≤ k). Барлығын тасу үшін ең аз неше автобус керек? Мысал: <code>95 40</code> → <code>3</code>. Кеңес: <code>(n + k - 1) / k</code> — жоғары қарай дөңгелектеу.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        System.out.println(n / k);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        System.out.println((n + k - 1) / k);\n    }\n}\n",
   "hints": [
    "<code>n / k</code> төмен қарай дөңгелектейді: 95 / 40 = 2, бірақ 15 оқушы қалып қояды.",
    "<code>(n + k - 1) / k</code> бүтін бөлумен жоғары қарай дөңгелектейді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "95 40\n",
      "out": "3\n"
     },
     {
      "stdin": "80 40\n",
      "out": "2\n"
     },
     {
      "stdin": "0 50\n",
      "out": "0\n"
     },
     {
      "stdin": "1 50\n",
      "out": "1\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "ҚҚС-пен баға",
   "prompt": "<p>Кірісте тауардың ҚҚС-сыз бағасы (бүтін теңге). ҚҚС 12% (<code>final double VAT = 0.12;</code>). Екі жол басыңыз, әрқайсысы үтірден кейін 2 таңбамен:</p><pre><code>VAT: 1200.00\nTotal: 11200.00</code></pre><p>(кіріс <code>10000</code> үшін).</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        final double VAT = 0.12;\n        int price = sc.nextInt();\n        // ҚҚС пен жалпы соманы басыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        final double VAT = 0.12;\n        int price = sc.nextInt();\n        double vat = price * VAT;\n        System.out.println(\"VAT: \" + String.format(\"%.2f\", vat));\n        System.out.println(\"Total: \" + String.format(\"%.2f\", price + vat));\n    }\n}\n",
   "hints": [
    "ҚҚС = <code>price * VAT</code>, бұл double болады.",
    "<code>String.format(\"%.2f\", x)</code> 2 ондық таңба береді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "10000\n",
      "out": "VAT: 1200.00\nTotal: 11200.00\n"
     },
     {
      "stdin": "2550\n",
      "out": "VAT: 306.00\nTotal: 2856.00\n"
     },
     {
      "stdin": "1\n",
      "out": "VAT: 0.12\nTotal: 1.12\n"
     },
     {
      "stdin": "0\n",
      "out": "VAT: 0.00\nTotal: 0.00\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Үлкен сандар",
   "prompt": "<p>Кірісте екі бүтін сан <code>a</code> және <code>b</code> (әрқайсысы 0-ден 2 000 000 000-ға дейін). Бірінші жолға қосындысын, екіншісіне көбейтіндісін басыңыз. Мұндай мәндер <code>int</code>-ке сыймайды, <code>long</code> қолданыңыз. Мысал: <code>2000000000 3</code> →</p><pre><code>2000000003\n6000000000</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n        System.out.println(a * b);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long a = sc.nextInt();\n        long b = sc.nextInt();\n        System.out.println(a + b);\n        System.out.println(a * b);\n    }\n}\n",
   "hints": [
    "<code>int</code>-тің шегі 2 147 483 647, одан асса сан теріс болып кетеді.",
    "Айнымалыларды <code>long a = sc.nextInt();</code> деп жариялаңыз — есептеу long-та жүреді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2000000000 3\n",
      "out": "2000000003\n6000000000\n"
     },
     {
      "stdin": "2000000000 2000000000\n",
      "out": "4000000000\n4000000000000000000\n"
     },
     {
      "stdin": "5 7\n",
      "out": "12\n35\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Секундтарды уақытқа",
   "prompt": "<p>Кірісте секунд саны <code>s</code> (0 ≤ s &lt; 86400). Уақытты <code>HH:MM:SS</code> түрінде, әр бөлікті екі цифрмен басыңыз. Мысал: <code>3725</code> → <code>01:02:05</code>. Кеңес: <code>String.format(\"%02d\", x)</code> алдына 0 қосады.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        // сағат, минут, секундты есептеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        int h = s / 3600;\n        int m = s % 3600 / 60;\n        int sec = s % 60;\n        System.out.println(String.format(\"%02d:%02d:%02d\", h, m, sec));\n    }\n}\n",
   "hints": [
    "Сағат: <code>s / 3600</code>, минут: <code>s % 3600 / 60</code>, секунд: <code>s % 60</code>.",
    "Бір формат жолына үш мән: <code>String.format(\"%02d:%02d:%02d\", h, m, sec)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3725\n",
      "out": "01:02:05\n"
     },
     {
      "stdin": "0\n",
      "out": "00:00:00\n"
     },
     {
      "stdin": "86399\n",
      "out": "23:59:59\n"
     },
     {
      "stdin": "600\n",
      "out": "00:10:00\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Несие ай сайынғы төлемі",
   "prompt": "<p>Кірісте үш бүтін сан: несие сомасы <code>P</code> (теңге), жылдық пайыз <code>r</code> және ай саны <code>n</code>. Жай пайыз бойынша жалпы қарыз <code>P + P · r / 100 · n / 12</code>. Ай сайынғы төлемді (жалпы қарыз / n) және жалпы қарызды 2 ондық таңбамен басыңыз. Мысал: <code>1200000 10 12</code> →</p><pre><code>Monthly: 110000.00\nTotal: 1320000.00</code></pre><p>Бүтін бөлу нәтижені бұзбасын: double-мен есептеңіз.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int p = sc.nextInt();\n        int r = sc.nextInt();\n        int n = sc.nextInt();\n        // double-мен есептеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int p = sc.nextInt();\n        int r = sc.nextInt();\n        int n = sc.nextInt();\n        double total = p + (double) p * r / 100 * n / 12;\n        double monthly = total / n;\n        System.out.println(\"Monthly: \" + String.format(\"%.2f\", monthly));\n        System.out.println(\"Total: \" + String.format(\"%.2f\", total));\n    }\n}\n",
   "hints": [
    "<code>(double) p * r / 100 * n / 12</code> — бірінші операнд double болса, қалғаны да double-мен есептеледі.",
    "Ай сайынғы төлем: <code>total / n</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1200000 10 12\n",
      "out": "Monthly: 110000.00\nTotal: 1320000.00\n"
     },
     {
      "stdin": "500000 18 6\n",
      "out": "Monthly: 90833.33\nTotal: 545000.00\n"
     },
     {
      "stdin": "100000 0 4\n",
      "out": "Monthly: 25000.00\nTotal: 100000.00\n"
     },
     {
      "stdin": "1000 7 5\n",
      "out": "Monthly: 205.83\nTotal: 1029.17\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Купюралармен беру",
   "prompt": "<p>Кірісте сома (бүтін теңге, 0 ≤ сома ≤ 10⁹). Банкомат оны ең аз купюрамен береді: 10000, 5000, 1000, 500, 200. Әр номиналдың санын, сосын берілмей қалған қалдықты басыңыз. Мысал: <code>27850</code> →</p><pre><code>10000: 2\n5000: 1\n1000: 2\n500: 1\n200: 1\nRest: 150</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        System.out.println(\"10000: \" + s / 10000);\n        // қалған номиналдар\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int s = sc.nextInt();\n        System.out.println(\"10000: \" + s / 10000);\n        s = s % 10000;\n        System.out.println(\"5000: \" + s / 5000);\n        s = s % 5000;\n        System.out.println(\"1000: \" + s / 1000);\n        s = s % 1000;\n        System.out.println(\"500: \" + s / 500);\n        s = s % 500;\n        System.out.println(\"200: \" + s / 200);\n        s = s % 200;\n        System.out.println(\"Rest: \" + s);\n    }\n}\n",
   "hints": [
    "Әр номиналдан кейін соманы қалдықпен жаңартыңыз: <code>s = s % 10000;</code>.",
    "Бөлу <code>/</code> — купюра саны, қалдық <code>%</code> — келесі номиналға қалатын сома."
   ],
   "check": {
    "cases": [
     {
      "stdin": "27850\n",
      "out": "10000: 2\n5000: 1\n1000: 2\n500: 1\n200: 1\nRest: 150\n"
     },
     {
      "stdin": "0\n",
      "out": "10000: 0\n5000: 0\n1000: 0\n500: 0\n200: 0\nRest: 0\n"
     },
     {
      "stdin": "199\n",
      "out": "10000: 0\n5000: 0\n1000: 0\n500: 0\n200: 0\nRest: 199\n"
     },
     {
      "stdin": "1000000000\n",
      "out": "10000: 100000\n5000: 0\n1000: 0\n500: 0\n200: 0\nRest: 0\n"
     },
     {
      "stdin": "6900\n",
      "out": "10000: 0\n5000: 1\n1000: 1\n500: 1\n200: 2\nRest: 0\n"
     }
    ]
   }
  }
 ],
 "jv-3": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Қала аты бас әріппен",
   "prompt": "<p>Кірісте бір сөз (латын әріптері, кез келген регистрде). Бірінші әрпін үлкен, қалғанын кіші етіп басыңыз: <code>aLMATY</code> → <code>Almaty</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String w = sc.next();\n        System.out.println(w);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String w = sc.next();\n        String res = w.substring(0, 1).toUpperCase() + w.substring(1).toLowerCase();\n        System.out.println(res);\n    }\n}\n",
   "hints": [
    "<code>w.substring(0, 1)</code> — бірінші әріп, <code>w.substring(1)</code> — қалғаны.",
    "Біріншісіне <code>toUpperCase()</code>, қалғанына <code>toLowerCase()</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "aLMATY\n",
      "out": "Almaty\n"
     },
     {
      "stdin": "astana\n",
      "out": "Astana\n"
     },
     {
      "stdin": "S\n",
      "out": "S\n"
     },
     {
      "stdin": "TARAZ\n",
      "out": "Taraz\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Email бөліктері",
   "prompt": "<p>Кірісте бір email (ішінде дәл бір <code>@</code> бар). Екі жол басыңыз: <code>@</code>-ке дейінгі пайдаланушы аты және <code>@</code>-тен кейінгі домен. Мысал: <code>aruzhan@mail.kz</code> →</p><pre><code>User: aruzhan\nDomain: mail.kz</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String email = sc.next();\n        // @ белгісінің орнын табыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String email = sc.next();\n        int at = email.indexOf(\"@\");\n        System.out.println(\"User: \" + email.substring(0, at));\n        System.out.println(\"Domain: \" + email.substring(at + 1));\n    }\n}\n",
   "hints": [
    "<code>email.indexOf(\"@\")</code> белгінің индексін береді.",
    "<code>substring(0, at)</code> және <code>substring(at + 1)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "aruzhan@mail.kz\n",
      "out": "User: aruzhan\nDomain: mail.kz\n"
     },
     {
      "stdin": "a@b\n",
      "out": "User: a\nDomain: b\n"
     },
     {
      "stdin": "timur.s@kaspi.kz\n",
      "out": "User: timur.s\nDomain: kaspi.kz\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Сөздерді салыстыру",
   "prompt": "<p>Кірісте екі сөз. Олар толық бірдей болса <code>SAME</code>, тек регистрі ғана өзгеше болса <code>SAME_IGNORE_CASE</code>, әйтпесе <code>DIFFERENT</code> басыңыз. Мысал: <code>Kaspi kaspi</code> → <code>SAME_IGNORE_CASE</code>. <code>==</code> емес, <code>equals</code> қолданыңыз.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        if (a == b) System.out.println(\"SAME\");\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        if (a.equals(b)) {\n            System.out.println(\"SAME\");\n        } else if (a.equalsIgnoreCase(b)) {\n            System.out.println(\"SAME_IGNORE_CASE\");\n        } else {\n            System.out.println(\"DIFFERENT\");\n        }\n    }\n}\n",
   "hints": [
    "Алдымен <code>a.equals(b)</code>, сосын <code>a.equalsIgnoreCase(b)</code> тексеріңіз.",
    "Scanner оқыған жолдарды <code>==</code> әрқашан дұрыс салыстырмайды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Kaspi kaspi\n",
      "out": "SAME_IGNORE_CASE\n"
     },
     {
      "stdin": "halyk halyk\n",
      "out": "SAME\n"
     },
     {
      "stdin": "jusan halyk\n",
      "out": "DIFFERENT\n"
     },
     {
      "stdin": "A a\n",
      "out": "SAME_IGNORE_CASE\n"
     }
    ],
    "mustInclude": [
     "equals"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Дауысты әріптер саны",
   "prompt": "<p>Кірісте бір сөз (латын әріптері). Ондағы дауысты әріптердің (<code>a e i o u</code>, үлкен-кішісі бәрібір) санын басыңыз. Мысал: <code>Aqtobe</code> → <code>3</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String w = sc.next();\n        int count = 0;\n        // әр символды тексеріңіз\n        System.out.println(count);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String w = sc.next().toLowerCase();\n        String vowels = \"aeiou\";\n        int count = 0;\n        for (int i = 0; i < w.length(); i++) {\n            if (vowels.indexOf(w.charAt(i)) >= 0) count++;\n        }\n        System.out.println(count);\n    }\n}\n",
   "hints": [
    "Алдымен сөзді <code>toLowerCase()</code> арқылы кіші әріпке айналдырыңыз.",
    "<code>\"aeiou\".indexOf(c) &gt;= 0</code> болса, <code>c</code> — дауысты."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Aqtobe\n",
      "out": "3\n"
     },
     {
      "stdin": "Shymkent\n",
      "out": "1\n"
     },
     {
      "stdin": "xyz\n",
      "out": "0\n"
     },
     {
      "stdin": "AEIOU\n",
      "out": "5\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Тізімді бөлу",
   "prompt": "<p>Кірісте үтірмен бөлінген қалалар тізімі бір сөз ретінде беріледі: <code>Almaty,Astana,Shymkent</code>. <code>split(\",\")</code> арқылы бөліп, әрқайсысын нөмірімен бөлек жолға басыңыз:</p><pre><code>1. Almaty\n2. Astana\n3. Shymkent</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.next();\n        // split арқылы бөліңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.next();\n        String[] parts = line.split(\",\");\n        for (int i = 0; i < parts.length; i++) {\n            System.out.println((i + 1) + \". \" + parts[i]);\n        }\n    }\n}\n",
   "hints": [
    "<code>String[] parts = line.split(\",\");</code> — массив береді.",
    "Нөмір 1-ден басталады: <code>(i + 1) + \". \" + parts[i]</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Almaty,Astana,Shymkent\n",
      "out": "1. Almaty\n2. Astana\n3. Shymkent\n"
     },
     {
      "stdin": "Taraz\n",
      "out": "1. Taraz\n"
     },
     {
      "stdin": "a,b\n",
      "out": "1. a\n2. b\n"
     }
    ],
    "mustInclude": [
     "split"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Карта нөмірін жасыру",
   "prompt": "<p>Кірісте карта нөмірі (тек цифрлар, ұзындығы кемінде 4). Соңғы 4 цифрдан басқасының бәрін <code>*</code> белгісімен ауыстырып басыңыз. Нәтижені <code>StringBuilder</code>-де жинаңыз. Мысал: <code>4400123456781234</code> → <code>************1234</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String card = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // жұлдызшалар мен соңғы 4 цифр\n        System.out.println(sb.toString());\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String card = sc.next();\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < card.length() - 4; i++) {\n            sb.append('*');\n        }\n        sb.append(card.substring(card.length() - 4));\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Жұлдызша саны: <code>card.length() - 4</code>.",
    "Соңғы 4 цифр: <code>card.substring(card.length() - 4)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4400123456781234\n",
      "out": "************1234\n"
     },
     {
      "stdin": "1234\n",
      "out": "1234\n"
     },
     {
      "stdin": "987654\n",
      "out": "**7654\n"
     }
    ],
    "mustInclude": [
     "StringBuilder"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Сығылған жолды ашу",
   "prompt": "<p>Кірісте сығылған жол: әр әріптен кейін оның қайталану саны (1-ден 9-ға дейін, бір цифр) тұрады. Жолды толық түрге қайтарыңыз: <code>a3b1c2</code> → <code>aaabcc</code>. Нәтижені <code>StringBuilder</code>-де жинаңыз.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // жұп-жұбымен оқыңыз: әріп, цифр\n        System.out.println(sb.toString());\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < s.length(); i += 2) {\n            char c = s.charAt(i);\n            int k = s.charAt(i + 1) - '0';\n            for (int j = 0; j < k; j++) sb.append(c);\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Индексті 2-ден арттырыңыз: <code>i</code> — әріп, <code>i + 1</code> — цифр.",
    "Цифр символын санға айналдыру: <code>s.charAt(i + 1) - '0'</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "a3b1c2\n",
      "out": "aaabcc\n"
     },
     {
      "stdin": "z9\n",
      "out": "zzzzzzzzz\n"
     },
     {
      "stdin": "a1b1a1\n",
      "out": "aba\n"
     },
     {
      "stdin": "k2z3k1\n",
      "out": "kkzzzk\n"
     }
    ],
    "mustInclude": [
     "StringBuilder"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "snake_case-тен camelCase-ке",
   "prompt": "<p>Кірісте <code>snake_case</code> түріндегі айнымалы аты (кіші латын әріптері мен <code>_</code>, басы мен соңында <code>_</code> жоқ, қатар екі <code>_</code> жоқ). Оны <code>camelCase</code>-ке айналдырыңыз: бірінші сөз өзгермейді, кейінгі әр сөздің бірінші әрпі үлкен. Мысал: <code>total_sales_amount</code> → <code>totalSalesAmount</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(s);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String[] parts = s.split(\"_\");\n        StringBuilder sb = new StringBuilder(parts[0]);\n        for (int i = 1; i < parts.length; i++) {\n            String p = parts[i];\n            sb.append(p.substring(0, 1).toUpperCase()).append(p.substring(1));\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "<code>s.split(\"_\")</code> сөздерді береді.",
    "Екінші сөзден бастап: <code>p.substring(0, 1).toUpperCase() + p.substring(1)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "total_sales_amount\n",
      "out": "totalSalesAmount\n"
     },
     {
      "stdin": "city\n",
      "out": "city\n"
     },
     {
      "stdin": "user_id\n",
      "out": "userId\n"
     },
     {
      "stdin": "a_b_c\n",
      "out": "aBC\n"
     }
    ]
   }
  }
 ],
 "jv-4": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Жұп па, тақ па",
   "prompt": "<p>Кірісте бүтін сан (теріс болуы мүмкін). Жұп болса <code>EVEN</code>, тақ болса <code>ODD</code> басыңыз. Мысал: <code>-7</code> → <code>ODD</code>. Есте сақтаңыз: Java-да <code>-7 % 2</code> нәтижесі <code>-1</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n % 2 == 1) System.out.println(\"ODD\");\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(n % 2 == 0 ? \"EVEN\" : \"ODD\");\n    }\n}\n",
   "hints": [
    "<code>n % 2 == 1</code> теріс тақ сандарда жұмыс істемейді.",
    "<code>n % 2 == 0</code> тексеріңіз: ternary <code>n % 2 == 0 ? \"EVEN\" : \"ODD\"</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "-7\n",
      "out": "ODD\n"
     },
     {
      "stdin": "10\n",
      "out": "EVEN\n"
     },
     {
      "stdin": "0\n",
      "out": "EVEN\n"
     },
     {
      "stdin": "3\n",
      "out": "ODD\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Апта күнінің аты",
   "prompt": "<p>Кірісте сан 1–7 (1 — дүйсенбі). <code>switch</code> арқылы ағылшынша атын басыңыз: <code>Monday</code>, <code>Tuesday</code>, <code>Wednesday</code>, <code>Thursday</code>, <code>Friday</code>, <code>Saturday</code>, <code>Sunday</code>. Басқа сан болса — <code>Invalid</code>. Мысал: <code>5</code> → <code>Friday</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int d = sc.nextInt();\n        // switch жазыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int d = sc.nextInt();\n        String name = switch (d) {\n            case 1 -> \"Monday\";\n            case 2 -> \"Tuesday\";\n            case 3 -> \"Wednesday\";\n            case 4 -> \"Thursday\";\n            case 5 -> \"Friday\";\n            case 6 -> \"Saturday\";\n            case 7 -> \"Sunday\";\n            default -> \"Invalid\";\n        };\n        System.out.println(name);\n    }\n}\n",
   "hints": [
    "Жебелі switch мән қайтарады: <code>String name = switch (d) { case 1 -&gt; \"Monday\"; ... };</code>",
    "<code>default -&gt; \"Invalid\"</code> қалған сандарды ұстайды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n",
      "out": "Friday\n"
     },
     {
      "stdin": "1\n",
      "out": "Monday\n"
     },
     {
      "stdin": "7\n",
      "out": "Sunday\n"
     },
     {
      "stdin": "0\n",
      "out": "Invalid\n"
     },
     {
      "stdin": "8\n",
      "out": "Invalid\n"
     }
    ],
    "mustInclude": [
     "switch"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Автобус жол ақысы",
   "prompt": "<p>Кірісте жолаушының жасы. Жол ақысын (теңге) басыңыз: 7-ден кіші — <code>0</code>, 7–17 — <code>40</code>, 18–62 — <code>120</code>, 63 және одан жоғары — <code>0</code>. Мысал: <code>16</code> → <code>40</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int age = sc.nextInt();\n        System.out.println(120);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int age = sc.nextInt();\n        int fare;\n        if (age < 7 || age >= 63) {\n            fare = 0;\n        } else if (age <= 17) {\n            fare = 40;\n        } else {\n            fare = 120;\n        }\n        System.out.println(fare);\n    }\n}\n",
   "hints": [
    "Тегін екі жағдайды <code>||</code> арқылы біріктіріңіз.",
    "Қалғанын <code>else if (age &lt;= 17)</code> және <code>else</code> бөледі."
   ],
   "check": {
    "cases": [
     {
      "stdin": "16\n",
      "out": "40\n"
     },
     {
      "stdin": "5\n",
      "out": "0\n"
     },
     {
      "stdin": "7\n",
      "out": "40\n"
     },
     {
      "stdin": "18\n",
      "out": "120\n"
     },
     {
      "stdin": "62\n",
      "out": "120\n"
     },
     {
      "stdin": "63\n",
      "out": "0\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Үшбұрыш түрі",
   "prompt": "<p>Кірісте үш оң бүтін сан — қабырғалар. Үшбұрыш құрылмаса (кез келген екі қабырғаның қосындысы үшіншісінен үлкен болуы керек) <code>NOT A TRIANGLE</code>, үшеуі тең болса <code>EQUILATERAL</code>, екеуі тең болса <code>ISOSCELES</code>, әйтпесе <code>SCALENE</code> басыңыз. Мысал: <code>5 5 8</code> → <code>ISOSCELES</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        // шарттарды ретімен тексеріңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        if (a + b <= c || a + c <= b || b + c <= a) {\n            System.out.println(\"NOT A TRIANGLE\");\n        } else if (a == b && b == c) {\n            System.out.println(\"EQUILATERAL\");\n        } else if (a == b || b == c || a == c) {\n            System.out.println(\"ISOSCELES\");\n        } else {\n            System.out.println(\"SCALENE\");\n        }\n    }\n}\n",
   "hints": [
    "Алдымен үшбұрыштың бар-жоғын тексеріңіз: <code>a + b &lt;= c || ...</code> — үш жағдай.",
    "Сосын «үшеуі тең», содан кейін ғана «екеуі тең»."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 5 8\n",
      "out": "ISOSCELES\n"
     },
     {
      "stdin": "3 3 3\n",
      "out": "EQUILATERAL\n"
     },
     {
      "stdin": "3 4 5\n",
      "out": "SCALENE\n"
     },
     {
      "stdin": "1 2 3\n",
      "out": "NOT A TRIANGLE\n"
     },
     {
      "stdin": "10 1 1\n",
      "out": "NOT A TRIANGLE\n"
     },
     {
      "stdin": "4 7 7\n",
      "out": "ISOSCELES\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Қарапайым калькулятор",
   "prompt": "<p>Кірісте <code>a op b</code>: екі бүтін сан және олардың арасында амал (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>). <code>switch</code> арқылы нәтижені басыңыз; <code>/</code> — бүтін бөлу. Нөлге бөлсе <code>ERROR</code>, белгісіз амал болса <code>UNKNOWN</code>. Мысал: <code>17 / 5</code> → <code>3</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        String op = sc.next();\n        int b = sc.nextInt();\n        // switch (op) жазыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        String op = sc.next();\n        int b = sc.nextInt();\n        switch (op) {\n            case \"+\" -> System.out.println(a + b);\n            case \"-\" -> System.out.println(a - b);\n            case \"*\" -> System.out.println(a * b);\n            case \"/\" -> {\n                if (b == 0) System.out.println(\"ERROR\");\n                else System.out.println(a / b);\n            }\n            default -> System.out.println(\"UNKNOWN\");\n        }\n    }\n}\n",
   "hints": [
    "switch String-пен жұмыс істейді: <code>case \"+\" -&gt; ...</code>.",
    "Бөлуде алдымен <code>b == 0</code> тексеріңіз; бір case-те бірнеше жол болса, <code>{ }</code> қолданыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "17 / 5\n",
      "out": "3\n"
     },
     {
      "stdin": "2 + 3\n",
      "out": "5\n"
     },
     {
      "stdin": "2 - 9\n",
      "out": "-7\n"
     },
     {
      "stdin": "6 * 7\n",
      "out": "42\n"
     },
     {
      "stdin": "5 / 0\n",
      "out": "ERROR\n"
     },
     {
      "stdin": "5 % 2\n",
      "out": "UNKNOWN\n"
     }
    ],
    "mustInclude": [
     "switch"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ауа райы кеңесі",
   "prompt": "<p>Кірісте температура (бүтін сан) және ауа райы сөзі: <code>rain</code>, <code>snow</code> немесе <code>clear</code>. Ережелер ретімен: температура −20-дан төмен болса <code>Stay home</code>; әйтпесе жаңбыр болса <code>Umbrella</code>; әйтпесе қар жауса немесе температура 5-тен төмен болса <code>Coat</code>; қалған жағдайда <code>T-shirt</code>. Мысал: <code>3 clear</code> → <code>Coat</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n        String w = sc.next();\n        // шарттарды ретімен жазыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n        String w = sc.next();\n        if (t < -20) {\n            System.out.println(\"Stay home\");\n        } else if (w.equals(\"rain\")) {\n            System.out.println(\"Umbrella\");\n        } else if (w.equals(\"snow\") || t < 5) {\n            System.out.println(\"Coat\");\n        } else {\n            System.out.println(\"T-shirt\");\n        }\n    }\n}\n",
   "hints": [
    "Сөздерді <code>equals</code> арқылы салыстырыңыз.",
    "Үшінші шарт: <code>w.equals(\"snow\") || t &lt; 5</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 clear\n",
      "out": "Coat\n"
     },
     {
      "stdin": "-25 clear\n",
      "out": "Stay home\n"
     },
     {
      "stdin": "-25 rain\n",
      "out": "Stay home\n"
     },
     {
      "stdin": "10 rain\n",
      "out": "Umbrella\n"
     },
     {
      "stdin": "15 snow\n",
      "out": "Coat\n"
     },
     {
      "stdin": "20 clear\n",
      "out": "T-shirt\n"
     },
     {
      "stdin": "5 clear\n",
      "out": "T-shirt\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Айдағы күн саны",
   "prompt": "<p>Кірісте ай нөмірі (1–12) және жыл. Сол айда неше күн бар екенін басыңыз. Ақпанда кібісе жылы 29, әйтпесе 28 күн (кібісе: 4-ке бөлінеді және 100-ге бөлінбейді, немесе 400-ге бөлінеді). 4, 6, 9, 11-айларда 30, қалғанында 31 күн. Ай нөмірі дұрыс болмаса <code>Invalid</code>. Мысал: <code>2 2024</code> → <code>29</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int m = sc.nextInt();\n        int y = sc.nextInt();\n        // switch (m) жазыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int m = sc.nextInt();\n        int y = sc.nextInt();\n        boolean leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;\n        switch (m) {\n            case 2 -> System.out.println(leap ? 29 : 28);\n            case 4, 6, 9, 11 -> System.out.println(30);\n            case 1, 3, 5, 7, 8, 10, 12 -> System.out.println(31);\n            default -> System.out.println(\"Invalid\");\n        }\n    }\n}\n",
   "hints": [
    "Кібісе жылды бір boolean-ға сақтаңыз: <code>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</code>.",
    "Жебелі switch-те бір case-ке бірнеше мән: <code>case 4, 6, 9, 11 -&gt;</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2 2024\n",
      "out": "29\n"
     },
     {
      "stdin": "2 1900\n",
      "out": "28\n"
     },
     {
      "stdin": "2 2000\n",
      "out": "29\n"
     },
     {
      "stdin": "4 2023\n",
      "out": "30\n"
     },
     {
      "stdin": "12 2023\n",
      "out": "31\n"
     },
     {
      "stdin": "13 2023\n",
      "out": "Invalid\n"
     }
    ],
    "mustInclude": [
     "switch"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Прогрессивті салық",
   "prompt": "<p>Кірісте айлық табыс (бүтін теңге, 0 ≤ табыс ≤ 10⁹). Салық прогрессивті: 100 000-ға дейінгі бөлігі — 0%, 100 000-нан 500 000-ға дейінгі бөлігі — 10%, 500 000-нан асқан бөлігі — 20%. Салықты бүтін теңгемен басыңыз (әр бөлікте бүтін бөлу). Мысал: <code>700000</code> → <code>80000</code> (40 000 + 40 000).</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long income = sc.nextInt();\n        long tax = income * 10 / 100;\n        System.out.println(tax);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long income = sc.nextInt();\n        long tax;\n        if (income <= 100000) {\n            tax = 0;\n        } else if (income <= 500000) {\n            tax = (income - 100000) * 10 / 100;\n        } else {\n            tax = 40000 + (income - 500000) * 20 / 100;\n        }\n        System.out.println(tax);\n    }\n}\n",
   "hints": [
    "Үш аралық — үш тармақ: <code>if / else if / else</code>.",
    "500 000-нан асса, екінші бөліктің толық салығы 40 000, оған <code>(income - 500000) * 20 / 100</code> қосылады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "700000\n",
      "out": "80000\n"
     },
     {
      "stdin": "100000\n",
      "out": "0\n"
     },
     {
      "stdin": "100009\n",
      "out": "0\n"
     },
     {
      "stdin": "350000\n",
      "out": "25000\n"
     },
     {
      "stdin": "500000\n",
      "out": "40000\n"
     },
     {
      "stdin": "1000000000\n",
      "out": "199940000\n"
     }
    ]
   }
  }
 ],
 "jv-5": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Көбейту кестесі",
   "prompt": "<p>Кірісте сан <code>n</code>. <code>for</code> циклімен оның 1-ден 10-ға дейінгі көбейту кестесін басыңыз, әр жол <code>n x i = нәтиже</code>. Мысал (<code>7</code>): бірінші жол <code>7 x 1 = 7</code>, соңғысы <code>7 x 10 = 70</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // for циклі\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 1; i <= 10; i++) {\n            System.out.println(n + \" x \" + i + \" = \" + n * i);\n        }\n    }\n}\n",
   "hints": [
    "<code>for (int i = 1; i &lt;= 10; i++)</code>.",
    "Көбейтіндіні жолға <code>n * i</code> түрінде қосыңыз — көбейту <code>+</code>-тен бұрын орындалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "7\n",
      "out": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70\n"
     },
     {
      "stdin": "1\n",
      "out": "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10\n"
     },
     {
      "stdin": "12\n",
      "out": "12 x 1 = 12\n12 x 2 = 24\n12 x 3 = 36\n12 x 4 = 48\n12 x 5 = 60\n12 x 6 = 72\n12 x 7 = 84\n12 x 8 = 96\n12 x 9 = 108\n12 x 10 = 120\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Жұп сандар қосындысы",
   "prompt": "<p>Кірісте <code>n</code> (1 ≤ n ≤ 10⁵). 1-ден n-ге дейінгі барлық жұп сандардың қосындысын басыңыз. Мысал: <code>10</code> → <code>30</code> (2 + 4 + 6 + 8 + 10).</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long sum = 0;\n        // цикл\n        System.out.println(sum);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long sum = 0;\n        for (int i = 2; i <= n; i += 2) {\n            sum += i;\n        }\n        System.out.println(sum);\n    }\n}\n",
   "hints": [
    "2-ден бастап 2-ге арттырыңыз: <code>i += 2</code>.",
    "n = 10⁵ болса қосынды 2.5·10⁹ — int-ке сыймайды, <code>long</code> алыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "10\n",
      "out": "30\n"
     },
     {
      "stdin": "1\n",
      "out": "0\n"
     },
     {
      "stdin": "7\n",
      "out": "12\n"
     },
     {
      "stdin": "100000\n",
      "out": "2500050000\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Цифрлар саны",
   "prompt": "<p>Кірісте теріс емес бүтін <code>n</code> (≤ 10⁹). Оның неше цифрдан тұратынын басыңыз. Мысал: <code>2024</code> → <code>4</code>, <code>0</code> → <code>1</code>. Кеңес: <code>do-while</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int count = 0;\n        while (n > 0) {\n            // ...\n            n /= 10;\n        }\n        System.out.println(count);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int count = 0;\n        do {\n            count++;\n            n /= 10;\n        } while (n > 0);\n        System.out.println(count);\n    }\n}\n",
   "hints": [
    "Әр қадамда <code>n /= 10</code> соңғы цифрды алып тастайды.",
    "<code>do { ... } while (n &gt; 0);</code> 0 үшін де бір рет орындалып, 1 береді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2024\n",
      "out": "4\n"
     },
     {
      "stdin": "0\n",
      "out": "1\n"
     },
     {
      "stdin": "7\n",
      "out": "1\n"
     },
     {
      "stdin": "1000000000\n",
      "out": "10\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Санды аудару",
   "prompt": "<p>Кірісте теріс емес бүтін <code>n</code> (≤ 10⁹). Цифрларын кері ретпен жазып, шыққан санды басыңыз (алдындағы нөлдер түсіп қалады). Мысал: <code>1200</code> → <code>21</code>, <code>4512</code> → <code>2154</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long rev = 0;\n        // while циклі\n        System.out.println(rev);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long rev = 0;\n        while (n > 0) {\n            rev = rev * 10 + n % 10;\n            n /= 10;\n        }\n        System.out.println(rev);\n    }\n}\n",
   "hints": [
    "Соңғы цифр — <code>n % 10</code>; оны нәтижеге жалғау: <code>rev = rev * 10 + n % 10</code>.",
    "1 000 000 009 сияқты сан аударылғанда int-тен асады — <code>long</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1200\n",
      "out": "21\n"
     },
     {
      "stdin": "4512\n",
      "out": "2154\n"
     },
     {
      "stdin": "0\n",
      "out": "0\n"
     },
     {
      "stdin": "1000000009\n",
      "out": "9000000001\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ең кіші бөлгіш",
   "prompt": "<p>Кірісте <code>n</code> (2 ≤ n ≤ 10⁹). Оның 1-ден үлкен ең кіші бөлгішін басыңыз. Бөлгішті тапқан бойда циклді <code>break</code> арқылы тоқтатыңыз; <code>i * i &gt; n</code> болса, n-нің өзі жауап. Мысал: <code>91</code> → <code>7</code>, <code>13</code> → <code>13</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int ans = n;\n        // цикл және break\n        System.out.println(ans);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int ans = n;\n        for (long i = 2; i * i <= n; i++) {\n            if (n % i == 0) {\n                ans = (int) i;\n                break;\n            }\n        }\n        System.out.println(ans);\n    }\n}\n",
   "hints": [
    "Бөлгіштерді 2-ден бастап <code>i * i &lt;= n</code> болғанша тексеріңіз — жай сан үшін де жылдам.",
    "Ешнәрсе табылмаса, жауап — n-нің өзі."
   ],
   "check": {
    "cases": [
     {
      "stdin": "91\n",
      "out": "7\n"
     },
     {
      "stdin": "13\n",
      "out": "13\n"
     },
     {
      "stdin": "2\n",
      "out": "2\n"
     },
     {
      "stdin": "1000000000\n",
      "out": "2\n"
     },
     {
      "stdin": "999999937\n",
      "out": "999999937\n"
     }
    ],
    "mustInclude": [
     "break"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Фибоначчи тізбегі",
   "prompt": "<p>Кірісте <code>n</code> (1 ≤ n ≤ 90). Фибоначчи тізбегінің алғашқы <code>n</code> мүшесін бір жолға бос орынмен басыңыз; тізбек <code>0 1</code>-ден басталады. Мысал: <code>7</code> → <code>0 1 1 2 3 5 8</code>. Мүшелер үлкен, <code>long</code> қолданыңыз.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long a = 0, b = 1;\n        // цикл\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long a = 0, b = 1;\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(a);\n            long next = a + b;\n            a = b;\n            b = next;\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Екі айнымалы ұстаңыз: <code>a</code> — ағымдағы, <code>b</code> — келесі мүше.",
    "Әр қадамда: <code>next = a + b; a = b; b = next;</code>. Бос орынды тек мүшелердің арасына қойыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "7\n",
      "out": "0 1 1 2 3 5 8\n"
     },
     {
      "stdin": "1\n",
      "out": "0\n"
     },
     {
      "stdin": "2\n",
      "out": "0 1\n"
     },
     {
      "stdin": "90\n",
      "out": "0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368 75025 121393 196418 317811 514229 832040 1346269 2178309 3524578 5702887 9227465 14930352 24157817 39088169 63245986 102334155 165580141 267914296 433494437 701408733 1134903170 1836311903 2971215073 4807526976 7778742049 12586269025 20365011074 32951280099 53316291173 86267571272 139583862445 225851433717 365435296162 591286729879 956722026041 1548008755920 2504730781961 4052739537881 6557470319842 10610209857723 17167680177565 27777890035288 44945570212853 72723460248141 117669030460994 190392490709135 308061521170129 498454011879264 806515533049393 1304969544928657 2111485077978050 3416454622906707 5527939700884757 8944394323791464 14472334024676221 23416728348467685 37889062373143906 61305790721611591 99194853094755497 160500643816367088 259695496911122585 420196140727489673 679891637638612258 1100087778366101931 1779979416004714189\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Мінсіз сандар",
   "prompt": "<p>Мінсіз сан — өзінен басқа бөлгіштерінің қосындысына тең сан (6 = 1 + 2 + 3). Кірісте <code>n</code> (1 ≤ n ≤ 10000). 1-ден n-ге дейінгі мінсіз сандарды бір жолға бос орынмен басыңыз; жоқ болса <code>NONE</code>. Мысал: <code>500</code> → <code>6 28 496</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // әр x үшін бөлгіштер қосындысын есептеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        for (int x = 2; x <= n; x++) {\n            int sum = 1;\n            for (int d = 2; d * d <= x; d++) {\n                if (x % d != 0) continue;\n                sum += d;\n                if (d != x / d) sum += x / d;\n            }\n            if (sum == x) {\n                if (sb.length() > 0) sb.append(' ');\n                sb.append(x);\n            }\n        }\n        System.out.println(sb.length() == 0 ? \"NONE\" : sb.toString());\n    }\n}\n",
   "hints": [
    "Сыртқы цикл x бойынша, ішкі цикл — x-тің бөлгіштері бойынша.",
    "Жылдам болу үшін <code>d * d &lt;= x</code> дейін жүріп, <code>d</code> мен <code>x / d</code> екеуін қосыңыз (тең болса, біреуін). 1 мінсіз сан емес."
   ],
   "check": {
    "cases": [
     {
      "stdin": "500\n",
      "out": "6 28 496\n"
     },
     {
      "stdin": "5\n",
      "out": "NONE\n"
     },
     {
      "stdin": "1\n",
      "out": "NONE\n"
     },
     {
      "stdin": "10000\n",
      "out": "6 28 496 8128\n"
     },
     {
      "stdin": "28\n",
      "out": "6 28\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын жылыну",
   "prompt": "<p>Кірісте <code>n</code> (1 ≤ n ≤ 1000), сосын <code>n</code> күннің температурасы. Температура алдыңғы күннен <b>қатаң</b> жоғары болып келген ең ұзын қатарлас күндер тізбегінің ұзындығын басыңыз (бір күн — ұзындығы 1). Массивсіз, цикл ішінде оқыңыз. Мысал: <code>8</code> / <code>-3 -1 2 2 4 6 7 1</code> → <code>4</code> (2 4 6 7).</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int best = 0;\n        // алдыңғы мәнді сақтап, цикл ішінде салыстырыңыз\n        System.out.println(best);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int prev = sc.nextInt();\n        int cur = 1, best = 1;\n        for (int i = 1; i < n; i++) {\n            int t = sc.nextInt();\n            if (t > prev) {\n                cur++;\n            } else {\n                cur = 1;\n            }\n            if (cur > best) best = cur;\n            prev = t;\n        }\n        System.out.println(best);\n    }\n}\n",
   "hints": [
    "Алдыңғы температураны <code>prev</code> айнымалысында сақтаңыз.",
    "Өссе ағымдағы ұзындық <code>cur++</code>, өспесе <code>cur = 1</code>; әр қадамда ең үлкенін жаңартыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "8\n-3 -1 2 2 4 6 7 1\n",
      "out": "4\n"
     },
     {
      "stdin": "1\n5\n",
      "out": "1\n"
     },
     {
      "stdin": "4\n5 4 3 2\n",
      "out": "1\n"
     },
     {
      "stdin": "5\n1 2 3 4 5\n",
      "out": "5\n"
     },
     {
      "stdin": "6\n1 1 2 3 1 2\n",
      "out": "3\n"
     }
    ]
   }
  }
 ],
 "jv-6": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Аудан: overloading",
   "prompt": "<p>Бір атпен екі әдіс жазыңыз: <code>static int area(int side)</code> (шаршы) және <code>static int area(int w, int h)</code> (тіктөртбұрыш). Кірісте <code>S a</code> немесе <code>R w h</code>. Сәйкес әдісті шақырып, ауданды басыңыз. Мысал: <code>R 3 5</code> → <code>15</code>, <code>S 4</code> → <code>16</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int area(int side) {\n        return 0;\n    }\n\n    static int area(int w, int h) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String kind = sc.next();\n        // S болса area(a), R болса area(w, h)\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int area(int side) {\n        return side * side;\n    }\n\n    static int area(int w, int h) {\n        return w * h;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String kind = sc.next();\n        if (kind.equals(\"S\")) {\n            System.out.println(area(sc.nextInt()));\n        } else {\n            int w = sc.nextInt();\n            int h = sc.nextInt();\n            System.out.println(area(w, h));\n        }\n    }\n}\n",
   "hints": [
    "Компилятор аргумент санына қарап, қай <code>area</code> шақырылатынын таңдайды.",
    "<code>kind.equals(\"S\")</code> арқылы түрін анықтаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "R 3 5\n",
      "out": "15\n"
     },
     {
      "stdin": "S 4\n",
      "out": "16\n"
     },
     {
      "stdin": "S 1\n",
      "out": "1\n"
     },
     {
      "stdin": "R 10 0\n",
      "out": "0\n"
     }
    ],
    "mustInclude": [
     "static int area(int w, int h)"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Үш санның үлкені",
   "prompt": "<p><code>static int max3(int a, int b, int c)</code> әдісін жазыңыз — үш санның ең үлкенін қайтарсын. Кірісте үш бүтін сан (теріс болуы мүмкін); <code>max3</code> нәтижесін басыңыз. Мысал: <code>-5 12 7</code> → <code>12</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int max3(int a, int b, int c) {\n        return a;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        System.out.println(max3(a, b, c));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int max3(int a, int b, int c) {\n        int m = a;\n        if (b > m) m = b;\n        if (c > m) m = c;\n        return m;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        System.out.println(max3(a, b, c));\n    }\n}\n",
   "hints": [
    "Бастапқы мән <code>m = a</code>, сосын <code>b</code> мен <code>c</code>-ны салыстырыңыз.",
    "Немесе <code>Math.max(a, Math.max(b, c))</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "-5 12 7\n",
      "out": "12\n"
     },
     {
      "stdin": "1 2 3\n",
      "out": "3\n"
     },
     {
      "stdin": "9 2 3\n",
      "out": "9\n"
     },
     {
      "stdin": "-1 -8 -3\n",
      "out": "-1\n"
     }
    ],
    "mustInclude": [
     "max3("
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Цифрлар қосындысы әдісі",
   "prompt": "<p><code>static int digitSum(int n)</code> әдісін жазыңыз (n ≥ 0). Кірісте <code>k</code>, сосын <code>k</code> сан. Әр санның цифрлар қосындысын бөлек жолға басыңыз. Мысал: <code>2</code> / <code>123 9050</code> →</p><pre><code>6\n14</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int digitSum(int n) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        for (int i = 0; i < k; i++) {\n            System.out.println(digitSum(sc.nextInt()));\n        }\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int digitSum(int n) {\n        int s = 0;\n        while (n > 0) {\n            s += n % 10;\n            n /= 10;\n        }\n        return s;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        for (int i = 0; i < k; i++) {\n            System.out.println(digitSum(sc.nextInt()));\n        }\n    }\n}\n",
   "hints": [
    "Әдіс ішінде <code>n % 10</code> мен <code>n /= 10</code> циклі.",
    "Параметр көшірме ретінде беріледі, оны әдіс ішінде өзгерту қауіпсіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\n123 9050\n",
      "out": "6\n14\n"
     },
     {
      "stdin": "1\n0\n",
      "out": "0\n"
     },
     {
      "stdin": "3\n9 99 999999999\n",
      "out": "9\n18\n81\n"
     }
    ],
    "mustInclude": [
     "digitSum("
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Кібісе жылдар саны",
   "prompt": "<p><code>static boolean isLeap(int y)</code> әдісін жазыңыз. Кірісте екі жыл <code>a b</code> (a ≤ b). Осы аралықта (екі шеті де кіреді) неше кібісе жыл барын басыңыз. Мысал: <code>1896 1912</code> → <code>4</code> (1896, 1904, 1908, 1912; 1900 — кібісе емес).</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isLeap(int y) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        // isLeap-ті циклде шақырыңыз\n        System.out.println(count);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isLeap(int y) {\n        return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        for (int y = a; y <= b; y++) {\n            if (isLeap(y)) count++;\n        }\n        System.out.println(count);\n    }\n}\n",
   "hints": [
    "boolean әдіс шарттың өзін қайтара алады: <code>return (y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0;</code>",
    "main-де <code>a</code>-дан <code>b</code>-ға дейін цикл."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1896 1912\n",
      "out": "4\n"
     },
     {
      "stdin": "2001 2003\n",
      "out": "0\n"
     },
     {
      "stdin": "2000 2000\n",
      "out": "1\n"
     },
     {
      "stdin": "1 2026\n",
      "out": "491\n"
     }
    ],
    "mustInclude": [
     "static boolean isLeap"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Дәрежеге шығару",
   "prompt": "<p><code>static long power(long base, int exp)</code> әдісін цикл арқылы жазыңыз (exp ≥ 0, <code>power(x, 0) = 1</code>). Кірісте <code>base exp</code>; нәтиже long-қа сыяды. Мысал: <code>2 10</code> → <code>1024</code>, <code>-3 3</code> → <code>-27</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static long power(long base, int exp) {\n        return base;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long b = sc.nextInt();\n        int e = sc.nextInt();\n        System.out.println(power(b, e));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static long power(long base, int exp) {\n        long r = 1;\n        for (int i = 0; i < exp; i++) {\n            r *= base;\n        }\n        return r;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long b = sc.nextInt();\n        int e = sc.nextInt();\n        System.out.println(power(b, e));\n    }\n}\n",
   "hints": [
    "Нәтижені 1-ден бастап, <code>exp</code> рет <code>base</code>-ке көбейтіңіз.",
    "<code>exp = 0</code> болса, цикл бірде-бір рет орындалмайды да, 1 қайтарылады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2 10\n",
      "out": "1024\n"
     },
     {
      "stdin": "-3 3\n",
      "out": "-27\n"
     },
     {
      "stdin": "7 0\n",
      "out": "1\n"
     },
     {
      "stdin": "10 18\n",
      "out": "1000000000000000000\n"
     }
    ],
    "mustInclude": [
     "static long power"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Палиндром сандар",
   "prompt": "<p><code>static int reverse(int n)</code> әдісін жазыңыз — цифрларды кері ретпен береді. Оның көмегімен <code>a</code>-дан <code>b</code>-ға дейінгі (1 ≤ a ≤ b ≤ 10⁶) палиндром сандардың санын басыңыз (палиндром: <code>reverse(n) == n</code>, мысалы 121). Мысал: <code>100 200</code> → <code>10</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int reverse(int n) {\n        return n;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        // цикл\n        System.out.println(count);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int reverse(int n) {\n        int r = 0;\n        while (n > 0) {\n            r = r * 10 + n % 10;\n            n /= 10;\n        }\n        return r;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int count = 0;\n        for (int x = a; x <= b; x++) {\n            if (reverse(x) == x) count++;\n        }\n        System.out.println(count);\n    }\n}\n",
   "hints": [
    "<code>reverse</code>: <code>r = r * 10 + n % 10; n /= 10;</code>.",
    "Бір таңбалы сандар да палиндром: 1-ден 9-ға дейін — 9 сан."
   ],
   "check": {
    "cases": [
     {
      "stdin": "100 200\n",
      "out": "10\n"
     },
     {
      "stdin": "1 9\n",
      "out": "9\n"
     },
     {
      "stdin": "10 20\n",
      "out": "1\n"
     },
     {
      "stdin": "1 1000000\n",
      "out": "1998\n"
     }
    ],
    "mustInclude": [
     "reverse("
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Егіз жай сандар",
   "prompt": "<p>Егіз жай сандар — айырмасы 2-ге тең жай сандар жұбы: (3, 5), (5, 7), (11, 13). <code>static boolean isPrime(int n)</code> әдісін жазып, кірістегі <code>n</code> (1 ≤ n ≤ 10⁵) үшін екеуі де n-нен аспайтын егіз жұптарды әр жолға <code>p q</code> түрінде басыңыз, соңғы жолға <code>Total: k</code>. Мысал: <code>15</code> →</p><pre><code>3 5\n5 7\n11 13\nTotal: 3</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isPrime(int n) {\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // p және p + 2 екеуі де жай ма?\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static boolean isPrime(int n) {\n        if (n < 2) return false;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        int total = 0;\n        for (int p = 2; p + 2 <= n; p++) {\n            if (isPrime(p) && isPrime(p + 2)) {\n                sb.append(p).append(' ').append(p + 2).append('\\n');\n                total++;\n            }\n        }\n        sb.append(\"Total: \").append(total);\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "<code>isPrime</code>: n &lt; 2 — жай емес; бөлгіштерді <code>i * i &lt;= n</code> дейін тексеріңіз.",
    "Жұптар көп болуы мүмкін — шығысты <code>StringBuilder</code>-де жинап, бір рет басыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "15\n",
      "out": "3 5\n5 7\n11 13\nTotal: 3\n"
     },
     {
      "stdin": "4\n",
      "out": "Total: 0\n"
     },
     {
      "stdin": "5\n",
      "out": "3 5\nTotal: 1\n"
     },
     {
      "stdin": "100000\n",
      "out": "3 5\n5 7\n11 13\n17 19\n29 31\n41 43\n59 61\n71 73\n101 103\n107 109\n137 139\n149 151\n179 181\n191 193\n197 199\n227 229\n239 241\n269 271\n281 283\n311 313\n347 349\n419 421\n431 433\n461 463\n521 523\n569 571\n599 601\n617 619\n641 643\n659 661\n809 811\n821 823\n827 829\n857 859\n881 883\n1019 1021\n1031 1033\n1049 1051\n1061 1063\n1091 1093\n1151 1153\n1229 1231\n1277 1279\n1289 1291\n1301 1303\n1319 1321\n1427 1429\n1451 1453\n1481 1483\n1487 1489\n1607 1609\n1619 1621\n1667 1669\n1697 1699\n1721 1723\n1787 1789\n1871 1873\n1877 1879\n1931 1933\n1949 1951\n1997 1999\n2027 2029\n2081 2083\n2087 2089\n2111 2113\n2129 2131\n2141 2143\n2237 2239\n2267 2269\n2309 2311\n2339 2341\n2381 2383\n2549 2551\n2591 2593\n2657 2659\n2687 2689\n2711 2713\n2729 2731\n2789 2791\n2801 2803\n2969 2971\n2999 3001\n3119 3121\n3167 3169\n3251 3253\n3257 3259\n3299 3301\n3329 3331\n3359 3361\n3371 3373\n3389 3391\n3461 3463\n3467 3469\n3527 3529\n3539 3541\n3557 3559\n3581 3583\n3671 3673\n3767 3769\n3821 3823\n3851 3853\n3917 3919\n3929 3931\n4001 4003\n4019 4021\n4049 4051\n4091 4093\n4127 4129\n4157 4159\n4217 4219\n4229 4231\n4241 4243\n4259 4261\n4271 4273\n4337 4339\n4421 4423\n4481 4483\n4517 4519\n4547 4549\n4637 4639\n4649 4651\n4721 4723\n4787 4789\n4799 4801\n4931 4933\n4967 4969\n5009 5011\n5021 5023\n5099 5101\n5231 5233\n5279 5281\n5417 5419\n5441 5443\n5477 5479\n5501 5503\n5519 5521\n5639 5641\n5651 5653\n5657 5659\n5741 5743\n5849 5851\n5867 5869\n5879 5881\n6089 6091\n6131 6133\n6197 6199\n6269 6271\n6299 6301\n6359 6361\n6449 6451\n6551 6553\n6569 6571\n6659 6661\n6689 6691\n6701 6703\n6761 6763\n6779 6781\n6791 6793\n6827 6829\n6869 6871\n6947 6949\n6959 6961\n7127 7129\n7211 7213\n7307 7309\n7331 7333\n7349 7351\n7457 7459\n7487 7489\n7547 7549\n7559 7561\n7589 7591\n7757 7759\n7877 7879\n7949 7951\n8009 8011\n8087 8089\n8219 8221\n8231 8233\n8291 8293\n8387 8389\n8429 8431\n8537 8539\n8597 8599\n8627 8629\n8819 8821\n8837 8839\n8861 8863\n8969 8971\n8999 9001\n9011 9013\n9041 9043\n9239 9241\n9281 9283\n9341 9343\n9419 9421\n9431 9433\n9437 9439\n9461 9463\n9629 9631\n9677 9679\n9719 9721\n9767 9769\n9857 9859\n9929 9931\n10007 10009\n10037 10039\n10067 10069\n10091 10093\n10139 10141\n10271 10273\n10301 10303\n10331 10333\n10427 10429\n10457 10459\n10499 10501\n10529 10531\n10709 10711\n10859 10861\n10889 10891\n10937 10939\n11057 11059\n11069 11071\n11117 11119\n11159 11161\n11171 11173\n11351 11353\n11489 11491\n11549 11551\n11699 11701\n11717 11719\n11777 11779\n11831 11833\n11939 11941\n11969 11971\n12041 12043\n12071 12073\n12107 12109\n12161 12163\n12239 12241\n12251 12253\n12377 12379\n12539 12541\n12611 12613\n12821 12823\n12917 12919\n13001 13003\n13007 13009\n13217 13219\n13337 13339\n13397 13399\n13679 13681\n13691 13693\n13709 13711\n13721 13723\n13757 13759\n13829 13831\n13877 13879\n13901 13903\n13931 13933\n13997 13999\n14009 14011\n14081 14083\n14249 14251\n14321 14323\n14387 14389\n14447 14449\n14549 14551\n14561 14563\n14591 14593\n14627 14629\n14867 14869\n15137 15139\n15269 15271\n15287 15289\n15329 15331\n15359 15361\n15581 15583\n15641 15643\n15647 15649\n15731 15733\n15737 15739\n15887 15889\n15971 15973\n16061 16063\n16067 16069\n16139 16141\n16187 16189\n16229 16231\n16361 16363\n16451 16453\n16631 16633\n16649 16651\n16691 16693\n16829 16831\n16901 16903\n16979 16981\n17027 17029\n17189 17191\n17207 17209\n17291 17293\n17387 17389\n17417 17419\n17489 17491\n17579 17581\n17597 17599\n17657 17659\n17681 17683\n17747 17749\n17789 17791\n17837 17839\n17909 17911\n17921 17923\n17957 17959\n17987 17989\n18041 18043\n18047 18049\n18059 18061\n18119 18121\n18131 18133\n18251 18253\n18287 18289\n18311 18313\n18521 18523\n18539 18541\n18911 18913\n18917 18919\n19079 19081\n19139 19141\n19181 19183\n19211 19213\n19379 19381\n19421 19423\n19427 19429\n19469 19471\n19541 19543\n19697 19699\n19751 19753\n19841 19843\n19889 19891\n19961 19963\n19991 19993\n20021 20023\n20147 20149\n20231 20233\n20357 20359\n20441 20443\n20477 20479\n20507 20509\n20549 20551\n20639 20641\n20717 20719\n20747 20749\n20771 20773\n20807 20809\n20897 20899\n20981 20983\n21011 21013\n21017 21019\n21059 21061\n21191 21193\n21317 21319\n21377 21379\n21491 21493\n21521 21523\n21557 21559\n21587 21589\n21599 21601\n21611 21613\n21647 21649\n21737 21739\n21839 21841\n22037 22039\n22091 22093\n22109 22111\n22157 22159\n22271 22273\n22277 22279\n22367 22369\n22481 22483\n22541 22543\n22571 22573\n22619 22621\n22637 22639\n22697 22699\n22739 22741\n22859 22861\n22961 22963\n23027 23029\n23039 23041\n23057 23059\n23201 23203\n23291 23293\n23369 23371\n23537 23539\n23561 23563\n23627 23629\n23669 23671\n23687 23689\n23741 23743\n23831 23833\n23909 23911\n24107 24109\n24179 24181\n24371 24373\n24419 24421\n24917 24919\n24977 24979\n25031 25033\n25169 25171\n25301 25303\n25307 25309\n25409 25411\n25469 25471\n25577 25579\n25601 25603\n25799 25801\n25847 25849\n25931 25933\n25997 25999\n26111 26113\n26249 26251\n26261 26263\n26681 26683\n26699 26701\n26711 26713\n26729 26731\n26861 26863\n26879 26881\n26891 26893\n26951 26953\n27059 27061\n27107 27109\n27239 27241\n27281 27283\n27407 27409\n27479 27481\n27527 27529\n27539 27541\n27581 27583\n27689 27691\n27737 27739\n27749 27751\n27791 27793\n27917 27919\n27941 27943\n28097 28099\n28109 28111\n28181 28183\n28277 28279\n28307 28309\n28349 28351\n28409 28411\n28547 28549\n28571 28573\n28619 28621\n28661 28663\n28751 28753\n29021 29023\n29129 29131\n29207 29209\n29387 29389\n29399 29401\n29567 29569\n29669 29671\n29759 29761\n29879 29881\n30011 30013\n30089 30091\n30137 30139\n30269 30271\n30389 30391\n30467 30469\n30491 30493\n30557 30559\n30839 30841\n30851 30853\n30869 30871\n31079 31081\n31121 31123\n31151 31153\n31181 31183\n31247 31249\n31319 31321\n31391 31393\n31511 31513\n31541 31543\n31721 31723\n31727 31729\n31769 31771\n31847 31849\n32027 32029\n32057 32059\n32117 32119\n32141 32143\n32189 32191\n32297 32299\n32321 32323\n32369 32371\n32411 32413\n32441 32443\n32531 32533\n32561 32563\n32609 32611\n32717 32719\n32801 32803\n32831 32833\n32909 32911\n32939 32941\n32969 32971\n33071 33073\n33149 33151\n33179 33181\n33287 33289\n33329 33331\n33347 33349\n33587 33589\n33599 33601\n33617 33619\n33749 33751\n33767 33769\n33809 33811\n33827 33829\n34031 34033\n34127 34129\n34157 34159\n34211 34213\n34259 34261\n34301 34303\n34367 34369\n34469 34471\n34499 34501\n34511 34513\n34589 34591\n34649 34651\n34757 34759\n34841 34843\n34847 34849\n34961 34963\n35051 35053\n35081 35083\n35279 35281\n35447 35449\n35507 35509\n35531 35533\n35591 35593\n35729 35731\n35801 35803\n35837 35839\n35897 35899\n36011 36013\n36107 36109\n36341 36343\n36467 36469\n36527 36529\n36779 36781\n36791 36793\n36899 36901\n36929 36931\n37019 37021\n37199 37201\n37307 37309\n37337 37339\n37361 37363\n37547 37549\n37571 37573\n37589 37591\n37691 37693\n37781 37783\n37811 37813\n37991 37993\n38237 38239\n38327 38329\n38447 38449\n38459 38461\n38567 38569\n38609 38611\n38651 38653\n38669 38671\n38711 38713\n38747 38749\n38921 38923\n39041 39043\n39161 39163\n39227 39229\n39239 39241\n39341 39343\n39371 39373\n39509 39511\n39827 39829\n39839 39841\n40037 40039\n40127 40129\n40151 40153\n40427 40429\n40529 40531\n40637 40639\n40697 40699\n40847 40849\n41141 41143\n41177 41179\n41201 41203\n41231 41233\n41387 41389\n41411 41413\n41519 41521\n41609 41611\n41759 41761\n41849 41851\n41957 41959\n41981 41983\n42017 42019\n42071 42073\n42179 42181\n42221 42223\n42281 42283\n42407 42409\n42461 42463\n42569 42571\n42641 42643\n42701 42703\n42839 42841\n42899 42901\n43049 43051\n43319 43321\n43397 43399\n43541 43543\n43577 43579\n43607 43609\n43649 43651\n43781 43783\n43787 43789\n43889 43891\n43961 43963\n44027 44029\n44087 44089\n44129 44131\n44201 44203\n44267 44269\n44279 44281\n44381 44383\n44531 44533\n44621 44623\n44699 44701\n44771 44773\n45119 45121\n45137 45139\n45179 45181\n45317 45319\n45341 45343\n45587 45589\n45821 45823\n46049 46051\n46091 46093\n46181 46183\n46271 46273\n46307 46309\n46349 46351\n46439 46441\n46589 46591\n46679 46681\n46769 46771\n46817 46819\n46829 46831\n47057 47059\n47147 47149\n47351 47353\n47387 47389\n47417 47419\n47657 47659\n47699 47701\n47711 47713\n47741 47743\n47777 47779\n47807 47809\n48119 48121\n48311 48313\n48407 48409\n48479 48481\n48539 48541\n48647 48649\n48677 48679\n48731 48733\n48779 48781\n48821 48823\n48857 48859\n48869 48871\n48989 48991\n49031 49033\n49121 49123\n49169 49171\n49199 49201\n49277 49279\n49331 49333\n49367 49369\n49391 49393\n49409 49411\n49529 49531\n49547 49549\n49667 49669\n49739 49741\n49787 49789\n49919 49921\n49937 49939\n49991 49993\n50021 50023\n50051 50053\n50129 50131\n50261 50263\n50459 50461\n50549 50551\n50591 50593\n50891 50893\n50969 50971\n51059 51061\n51131 51133\n51197 51199\n51239 51241\n51341 51343\n51347 51349\n51419 51421\n51437 51439\n51479 51481\n51719 51721\n51767 51769\n51827 51829\n51869 51871\n51971 51973\n52067 52069\n52181 52183\n52289 52291\n52361 52363\n52541 52543\n52709 52711\n52859 52861\n52901 52903\n53087 53089\n53147 53149\n53171 53173\n53231 53233\n53267 53269\n53279 53281\n53549 53551\n53591 53593\n53609 53611\n53717 53719\n53897 53899\n54011 54013\n54401 54403\n54419 54421\n54497 54499\n54539 54541\n54581 54583\n54629 54631\n54917 54919\n55049 55051\n55217 55219\n55331 55333\n55337 55339\n55439 55441\n55619 55621\n55631 55633\n55661 55663\n55817 55819\n55901 55903\n55931 55933\n56039 56041\n56099 56101\n56207 56209\n56237 56239\n56267 56269\n56477 56479\n56501 56503\n56531 56533\n56597 56599\n56711 56713\n56807 56809\n56891 56893\n56909 56911\n56921 56923\n57191 57193\n57221 57223\n57269 57271\n57329 57331\n57347 57349\n57527 57529\n57557 57559\n57791 57793\n57899 57901\n58109 58111\n58151 58153\n58169 58171\n58229 58231\n58367 58369\n58391 58393\n58439 58441\n58451 58453\n58601 58603\n58787 58789\n58907 58909\n59009 59011\n59021 59023\n59051 59053\n59207 59209\n59219 59221\n59357 59359\n59417 59419\n59441 59443\n59471 59473\n59627 59629\n59669 59671\n60089 60091\n60101 60103\n60167 60169\n60257 60259\n60647 60649\n60659 60661\n60761 60763\n60887 60889\n60899 60901\n60917 60919\n61151 61153\n61331 61333\n61379 61381\n61469 61471\n61559 61561\n61979 61981\n62129 62131\n62141 62143\n62189 62191\n62297 62299\n62927 62929\n62969 62971\n62981 62983\n62987 62989\n63029 63031\n63197 63199\n63311 63313\n63389 63391\n63419 63421\n63587 63589\n63599 63601\n63647 63649\n63689 63691\n63839 63841\n64151 64153\n64187 64189\n64301 64303\n64451 64453\n64577 64579\n64661 64663\n64781 64783\n64877 64879\n64919 64921\n65027 65029\n65099 65101\n65171 65173\n65267 65269\n65447 65449\n65519 65521\n65537 65539\n65579 65581\n65699 65701\n65717 65719\n65729 65731\n65837 65839\n65927 65929\n65981 65983\n66107 66109\n66359 66361\n66569 66571\n66749 66751\n66851 66853\n66947 66949\n67139 67141\n67187 67189\n67211 67213\n67217 67219\n67271 67273\n67409 67411\n67427 67429\n67577 67579\n67757 67759\n67931 67933\n68111 68113\n68207 68209\n68279 68281\n68447 68449\n68489 68491\n68711 68713\n68819 68821\n68879 68881\n68897 68899\n69029 69031\n69149 69151\n69191 69193\n69257 69259\n69401 69403\n69491 69493\n69497 69499\n69737 69739\n69761 69763\n69827 69829\n69857 69859\n69929 69931\n70001 70003\n70121 70123\n70139 70141\n70181 70183\n70199 70201\n70379 70381\n70457 70459\n70487 70489\n70571 70573\n70619 70621\n70841 70843\n70877 70879\n70919 70921\n70949 70951\n70979 70981\n70997 70999\n71261 71263\n71327 71329\n71339 71341\n71387 71389\n71411 71413\n71471 71473\n71549 71551\n71711 71713\n71807 71809\n71879 71881\n72089 72091\n72101 72103\n72167 72169\n72221 72223\n72227 72229\n72251 72253\n72269 72271\n72467 72469\n72647 72649\n72671 72673\n72869 72871\n73037 73039\n73061 73063\n73361 73363\n73607 73609\n73679 73681\n73847 73849\n74099 74101\n74159 74161\n74201 74203\n74381 74383\n74411 74413\n74507 74509\n74609 74611\n74717 74719\n74729 74731\n74759 74761\n75011 75013\n75167 75169\n75209 75211\n75389 75391\n75401 75403\n75539 75541\n75617 75619\n75707 75709\n75989 75991\n76001 76003\n76079 76081\n76157 76159\n76259 76261\n76367 76369\n76421 76423\n76541 76543\n76649 76651\n76829 76831\n76871 76873\n76961 76963\n77237 77239\n77261 77263\n77267 77269\n77417 77419\n77477 77479\n77489 77491\n77549 77551\n77687 77689\n77711 77713\n78137 78139\n78191 78193\n78437 78439\n78509 78511\n78539 78541\n78569 78571\n78779 78781\n78887 78889\n78977 78979\n79151 79153\n79229 79231\n79397 79399\n79559 79561\n79631 79633\n79691 79693\n79697 79699\n79811 79813\n79841 79843\n79901 79903\n79997 79999\n80147 80149\n80207 80209\n80231 80233\n80447 80449\n80471 80473\n80489 80491\n80627 80629\n80669 80671\n80681 80683\n80747 80749\n80777 80779\n80831 80833\n80909 80911\n81017 81019\n81041 81043\n81047 81049\n81197 81199\n81281 81283\n81371 81373\n81551 81553\n81647 81649\n81701 81703\n81899 81901\n81929 81931\n81971 81973\n82007 82009\n82037 82039\n82139 82141\n82217 82219\n82349 82351\n82469 82471\n82529 82531\n82559 82561\n82721 82723\n82727 82729\n82757 82759\n82811 82813\n82889 82891\n83219 83221\n83231 83233\n83267 83269\n83339 83341\n83399 83401\n83561 83563\n83639 83641\n83717 83719\n84059 84061\n84179 84181\n84221 84223\n84317 84319\n84347 84349\n84389 84391\n84521 84523\n84629 84631\n84809 84811\n84857 84859\n84869 84871\n84977 84979\n85091 85093\n85199 85201\n85331 85333\n85361 85363\n85427 85429\n85451 85453\n85619 85621\n85667 85669\n85817 85819\n85829 85831\n85931 85933\n86027 86029\n86111 86113\n86291 86293\n86351 86353\n86369 86371\n86531 86533\n86627 86629\n86927 86929\n87011 87013\n87119 87121\n87149 87151\n87179 87181\n87221 87223\n87251 87253\n87509 87511\n87539 87541\n87557 87559\n87587 87589\n87629 87631\n87641 87643\n87719 87721\n87959 87961\n88001 88003\n88259 88261\n88337 88339\n88469 88471\n88589 88591\n88607 88609\n88661 88663\n88799 88801\n88811 88813\n88817 88819\n89069 89071\n89519 89521\n89561 89563\n89597 89599\n89657 89659\n89669 89671\n89819 89821\n89897 89899\n90017 90019\n90071 90073\n90197 90199\n90371 90373\n90401 90403\n90437 90439\n90527 90529\n90617 90619\n90677 90679\n90821 90823\n91079 91081\n91097 91099\n91127 91129\n91139 91141\n91151 91153\n91367 91369\n91457 91459\n91571 91573\n91811 91813\n91967 91969\n92177 92179\n92219 92221\n92381 92383\n92399 92401\n92459 92461\n92567 92569\n92639 92641\n92669 92671\n92681 92683\n92789 92791\n92861 92863\n92957 92959\n93131 93133\n93239 93241\n93251 93253\n93281 93283\n93479 93481\n93491 93493\n93557 93559\n93701 93703\n93761 93763\n93809 93811\n93887 93889\n93911 93913\n94007 94009\n94109 94111\n94151 94153\n94307 94309\n94349 94351\n94397 94399\n94439 94441\n94529 94531\n94541 94543\n94559 94561\n94649 94651\n94847 94849\n94949 94951\n95087 95089\n95189 95191\n95231 95233\n95441 95443\n95789 95791\n95801 95803\n95957 95959\n95987 95989\n96179 96181\n96221 96223\n96329 96331\n96587 96589\n96737 96739\n96797 96799\n96821 96823\n97001 97003\n97157 97159\n97169 97171\n97301 97303\n97367 97369\n97379 97381\n97499 97501\n97547 97549\n97577 97579\n97607 97609\n97649 97651\n97787 97789\n97841 97843\n97847 97849\n97859 97861\n98009 98011\n98297 98299\n98321 98323\n98387 98389\n98561 98563\n98639 98641\n98711 98713\n98729 98731\n98807 98809\n98867 98869\n98897 98899\n98909 98911\n98927 98929\n99131 99133\n99137 99139\n99257 99259\n99347 99349\n99527 99529\n99707 99709\n99719 99721\n99989 99991\nTotal: 1224\n"
     }
    ],
    "mustInclude": [
     "static boolean isPrime"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Санды сөзбен оқу",
   "prompt": "<p><code>static String digitName(int d)</code> әдісі <code>switch</code> арқылы цифрдың ағылшынша атын қайтарсын (<code>zero</code>, <code>one</code>, …, <code>nine</code>). Кірісте теріс емес бүтін сан (≤ 10⁹). Оның цифрларын солдан оңға қарай сөзбен, бос орынмен бөліп басыңыз. Мысал: <code>1203</code> → <code>one two zero three</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static String digitName(int d) {\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // әр цифр үшін digitName шақырыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static String digitName(int d) {\n        return switch (d) {\n            case 0 -> \"zero\";\n            case 1 -> \"one\";\n            case 2 -> \"two\";\n            case 3 -> \"three\";\n            case 4 -> \"four\";\n            case 5 -> \"five\";\n            case 6 -> \"six\";\n            case 7 -> \"seven\";\n            case 8 -> \"eight\";\n            default -> \"nine\";\n        };\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = \"\" + sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < s.length(); i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(digitName(s.charAt(i) - '0'));\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Санды жолға айналдырсаңыз (<code>\"\" + n</code>), цифрлар солдан оңға қарай <code>charAt(i)</code> арқылы оқылады.",
    "Символды цифрға: <code>s.charAt(i) - '0'</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1203\n",
      "out": "one two zero three\n"
     },
     {
      "stdin": "0\n",
      "out": "zero\n"
     },
     {
      "stdin": "987654321\n",
      "out": "nine eight seven six five four three two one\n"
     },
     {
      "stdin": "50\n",
      "out": "five zero\n"
     }
    ],
    "mustInclude": [
     "digitName(",
     "switch"
    ]
   }
  }
 ],
 "jv-7": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Орташадан жоғары",
   "prompt": "<p>Кірісте <code>n</code> (n ≥ 1), сосын <code>n</code> бүтін сан. Орташа мәннен <b>қатаң</b> үлкен элементтердің санын басыңыз. Мысал: <code>5</code> / <code>10 20 30 40 50</code> → <code>2</code> (орташа 30).</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // орташаны есептеп, санаңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        long sum = 0;\n        for (int i = 0; i < n; i++) {\n            a[i] = sc.nextInt();\n            sum += a[i];\n        }\n        double avg = (double) sum / n;\n        int count = 0;\n        for (int x : a) {\n            if (x > avg) count++;\n        }\n        System.out.println(count);\n    }\n}\n",
   "hints": [
    "Екі өту керек: алдымен қосынды мен орташа, сосын салыстыру.",
    "Орташаны double-мен есептеңіз: <code>(double) sum / n</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n10 20 30 40 50\n",
      "out": "2\n"
     },
     {
      "stdin": "3\n1 2 2\n",
      "out": "2\n"
     },
     {
      "stdin": "4\n7 7 7 7\n",
      "out": "0\n"
     },
     {
      "stdin": "1\n-5\n",
      "out": "0\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Кері ретпен басу",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> бүтін сан. Оларды массивке оқып, кері ретпен бір жолға бос орынмен басыңыз. Мысал: <code>4</code> / <code>3 9 -1 5</code> → <code>5 -1 9 3</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // кері ретпен басыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        for (int i = n - 1; i >= 0; i--) {\n            sb.append(a[i]);\n            if (i > 0) sb.append(' ');\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Цикл соңынан басталады: <code>for (int i = n - 1; i &gt;= 0; i--)</code>.",
    "Соңғы элементтен кейін бос орын қоймаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n3 9 -1 5\n",
      "out": "5 -1 9 3\n"
     },
     {
      "stdin": "1\n42\n",
      "out": "42\n"
     },
     {
      "stdin": "3\n1 2 3\n",
      "out": "3 2 1\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Сұрыпталған бағалар",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> бағасы (теңге). <code>Arrays.sort</code> арқылы өсу ретімен сұрыптап, <code>Arrays.toString</code> пішімінде басыңыз. Мысал: <code>3</code> / <code>1200 800 4500</code> → <code>[800, 1200, 4500]</code>.</p>",
   "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        System.out.println(Arrays.toString(a));\n    }\n}\n",
   "solution": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        Arrays.sort(a);\n        System.out.println(Arrays.toString(a));\n    }\n}\n",
   "hints": [
    "<code>Arrays.sort(a);</code> массивті орнында сұрыптайды.",
    "<code>Arrays.toString(a)</code> жақша мен үтірлерді өзі қояды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n1200 800 4500\n",
      "out": "[800, 1200, 4500]\n"
     },
     {
      "stdin": "1\n5\n",
      "out": "[5]\n"
     },
     {
      "stdin": "5\n5 4 3 2 1\n",
      "out": "[1, 2, 3, 4, 5]\n"
     },
     {
      "stdin": "4\n0 -10 10 0\n",
      "out": "[-10, 0, 0, 10]\n"
     }
    ],
    "mustInclude": [
     "Arrays.sort"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Жол және баған қосындысы",
   "prompt": "<p>Кірісте <code>r c</code>, сосын <code>r × c</code> матрица (мысалы, дүкендердің апталық сатылымы). Бірінші жолға әр жолдың қосындысын, екінші жолға әр бағанның қосындысын бос орынмен басыңыз. Мысал:</p><pre><code>2 3\n1 2 3\n4 5 6</code></pre><p>→</p><pre><code>6 15\n5 7 9</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        // матрицаны оқып, қосындыларды есептеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        for (int i = 0; i < r; i++)\n            for (int j = 0; j < c; j++)\n                m[i][j] = sc.nextInt();\n        StringBuilder rows = new StringBuilder();\n        for (int i = 0; i < r; i++) {\n            int s = 0;\n            for (int j = 0; j < c; j++) s += m[i][j];\n            if (i > 0) rows.append(' ');\n            rows.append(s);\n        }\n        StringBuilder cols = new StringBuilder();\n        for (int j = 0; j < c; j++) {\n            int s = 0;\n            for (int i = 0; i < r; i++) s += m[i][j];\n            if (j > 0) cols.append(' ');\n            cols.append(s);\n        }\n        System.out.println(rows.toString());\n        System.out.println(cols.toString());\n    }\n}\n",
   "hints": [
    "Жол қосындысы: сыртқы цикл <code>i</code> бойынша, ішкі <code>j</code> бойынша.",
    "Баған қосындысы үшін циклдердің орнын ауыстырыңыз: сыртқысы <code>j</code>, ішкісі <code>i</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2 3\n1 2 3\n4 5 6\n",
      "out": "6 15\n5 7 9\n"
     },
     {
      "stdin": "1 1\n7\n",
      "out": "7\n7\n"
     },
     {
      "stdin": "3 2\n1 -1\n2 -2\n0 5\n",
      "out": "0 0 5\n3 2\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Екінші үлкен мән",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> бүтін сан. Ең үлкен мәннен кейінгі <b>екінші үлкен әртүрлі</b> мәнді басыңыз; ондай мән жоқ болса (бәрі бірдей) <code>NONE</code>. Мысал: <code>5</code> / <code>4 9 9 2 7</code> → <code>7</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // алдымен максимумды табыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int max = a[0];\n        for (int x : a) if (x > max) max = x;\n        boolean found = false;\n        int second = Integer.MIN_VALUE;\n        for (int x : a) {\n            if (x != max && (!found || x > second)) {\n                second = x;\n                found = true;\n            }\n        }\n        System.out.println(found ? \"\" + second : \"NONE\");\n    }\n}\n",
   "hints": [
    "Алдымен максимумды табыңыз, сосын максимумға тең емес элементтердің ең үлкенін.",
    "Бәрі теріс болуы мүмкін: бастапқы мәнді 0 деп алмаңыз, «табылды ма» деген boolean ұстаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n4 9 9 2 7\n",
      "out": "7\n"
     },
     {
      "stdin": "3\n5 5 5\n",
      "out": "NONE\n"
     },
     {
      "stdin": "1\n10\n",
      "out": "NONE\n"
     },
     {
      "stdin": "4\n-1 -5 -3 -1\n",
      "out": "-3\n"
     },
     {
      "stdin": "2\n1 2\n",
      "out": "1\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Массивті айналдыру",
   "prompt": "<p>Кірісте <code>n k</code> (k ≥ 0, n-нен үлкен болуы мүмкін), сосын <code>n</code> сан. Массивті оңға қарай <code>k</code> позицияға циклдық жылжытып, бір жолға бос орынмен басыңыз. Мысал: <code>5 2</code> / <code>1 2 3 4 5</code> → <code>4 5 1 2 3</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // жаңа массив жасаңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int[] b = new int[n];\n        for (int i = 0; i < n; i++) {\n            b[(i + k) % n] = a[i];\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(b[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Жаңа массивте <code>a[i]</code> элементі <code>(i + k) % n</code> орнына түседі.",
    "<code>%</code> k &gt; n болғанда да дұрыс жұмыс істейді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 2\n1 2 3 4 5\n",
      "out": "4 5 1 2 3\n"
     },
     {
      "stdin": "3 0\n7 8 9\n",
      "out": "7 8 9\n"
     },
     {
      "stdin": "3 7\n7 8 9\n",
      "out": "9 7 8\n"
     },
     {
      "stdin": "1 100\n5\n",
      "out": "5\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Ең жылы кезең",
   "prompt": "<p>Кірісте <code>n k</code> (1 ≤ k ≤ n ≤ 10⁵), сосын <code>n</code> күннің температурасы. Қатарлас <code>k</code> күннің температура қосындысы ең үлкен болатын кезеңді табыңыз. Оның басталу күнін (1-ден санағанда) және қосындысын басыңыз; бірнеше болса — ең ертесін. Мысал: <code>7 3</code> / <code>1 5 -2 8 6 -1 3</code> →  <code>4 13</code> (8 + 6 − 1). O(n) терезе (sliding window) жазыңыз.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // алғашқы k күннің қосындысынан бастаңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        long cur = 0;\n        for (int i = 0; i < k; i++) cur += a[i];\n        long best = cur;\n        int start = 0;\n        for (int i = k; i < n; i++) {\n            cur += a[i] - a[i - k];\n            if (cur > best) {\n                best = cur;\n                start = i - k + 1;\n            }\n        }\n        System.out.println((start + 1) + \" \" + best);\n    }\n}\n",
   "hints": [
    "Алғашқы <code>k</code> элемент қосындысын есептеңіз, сосын терезені жылжытқанда <code>a[i]</code> қосылып, <code>a[i - k]</code> шығады.",
    "Ең ертесі керек болғандықтан, тек <code>cur &gt; best</code> болғанда жаңартыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "7 3\n1 5 -2 8 6 -1 3\n",
      "out": "4 13\n"
     },
     {
      "stdin": "3 3\n1 2 3\n",
      "out": "1 6\n"
     },
     {
      "stdin": "4 1\n-5 -2 -2 -9\n",
      "out": "2 -2\n"
     },
     {
      "stdin": "5 2\n2 2 1 3 0\n",
      "out": "1 4\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Спираль бойынша оқу",
   "prompt": "<p>Кірісте <code>r c</code>, сосын <code>r × c</code> матрица. Элементтерін сол жақ жоғарғы бұрыштан бастап, сағат тілі бойынша спиральмен оқып, бір жолға бос орынмен басыңыз. Мысал:</p><pre><code>3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12</code></pre><p>→ <code>1 2 3 4 8 12 11 10 9 5 6 7</code>. Шекараларды мұқият тексеріңіз.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        // матрицаны оқып, спиральмен жүріңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] m = new int[r][c];\n        for (int i = 0; i < r; i++)\n            for (int j = 0; j < c; j++)\n                m[i][j] = sc.nextInt();\n        int top = 0, bottom = r - 1, left = 0, right = c - 1;\n        StringBuilder sb = new StringBuilder();\n        while (top <= bottom && left <= right) {\n            for (int j = left; j <= right; j++) sb.append(m[top][j]).append(' ');\n            top++;\n            for (int i = top; i <= bottom; i++) sb.append(m[i][right]).append(' ');\n            right--;\n            if (top <= bottom) {\n                for (int j = right; j >= left; j--) sb.append(m[bottom][j]).append(' ');\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) sb.append(m[i][left]).append(' ');\n                left++;\n            }\n        }\n        System.out.println(sb.toString().trim());\n    }\n}\n",
   "hints": [
    "Төрт шекара ұстаңыз: <code>top, bottom, left, right</code>. Әр жақты өткен соң сәйкес шекараны жылжытыңыз.",
    "Төменгі жол мен сол бағанды өтпес бұрын <code>top &lt;= bottom</code> және <code>left &lt;= right</code> тексеріңіз — әйтпесе бір жолды матрицада элементтер қайталанады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n",
      "out": "1 2 3 4 8 12 11 10 9 5 6 7\n"
     },
     {
      "stdin": "1 3\n1 2 3\n",
      "out": "1 2 3\n"
     },
     {
      "stdin": "3 1\n1\n2\n3\n",
      "out": "1 2 3\n"
     },
     {
      "stdin": "2 2\n1 2\n3 4\n",
      "out": "1 2 4 3\n"
     },
     {
      "stdin": "3 3\n1 2 3\n4 5 6\n7 8 9\n",
      "out": "1 2 3 6 9 8 7 4 5\n"
     }
    ]
   }
  }
 ],
 "jv-8": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Тіктөртбұрыш класы",
   "prompt": "<p><code>Rectangle</code> класын жазыңыз: <code>private int w, h</code> өрістері, constructor, <code>area()</code> және <code>perimeter()</code> әдістері. Кірісте <code>w h</code>. Мына түрде басыңыз (<code>3 5</code> үшін):</p><pre><code>Area: 15\nPerimeter: 16</code></pre>",
   "starter": "import java.util.Scanner;\n\nclass Rectangle {\n    private int w, h;\n\n    Rectangle(int w, int h) {\n        // өрістерді толтырыңыз\n    }\n\n    int area() { return 0; }\n\n    int perimeter() { return 0; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Rectangle r = new Rectangle(sc.nextInt(), sc.nextInt());\n        System.out.println(\"Area: \" + r.area());\n        System.out.println(\"Perimeter: \" + r.perimeter());\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Rectangle {\n    private int w, h;\n\n    Rectangle(int w, int h) {\n        this.w = w;\n        this.h = h;\n    }\n\n    int area() { return w * h; }\n\n    int perimeter() { return 2 * (w + h); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Rectangle r = new Rectangle(sc.nextInt(), sc.nextInt());\n        System.out.println(\"Area: \" + r.area());\n        System.out.println(\"Perimeter: \" + r.perimeter());\n    }\n}\n",
   "hints": [
    "Constructor-да <code>this.w = w;</code> — өріс пен параметрдің аты бірдей болғанда <code>this</code> керек.",
    "Периметр: <code>2 * (w + h)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 5\n",
      "out": "Area: 15\nPerimeter: 16\n"
     },
     {
      "stdin": "1 1\n",
      "out": "Area: 1\nPerimeter: 4\n"
     },
     {
      "stdin": "10 0\n",
      "out": "Area: 0\nPerimeter: 20\n"
     }
    ],
    "mustInclude": [
     "class Rectangle",
     "private int"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Билет нөмірлері",
   "prompt": "<p><code>Ticket</code> класында <code>static int counter</code> өрісі болсын: әр жаңа билет constructor-да келесі нөмірді алады (1, 2, 3, …). <code>toString()</code> <code>Ticket #1: Aruzhan</code> қайтарсын. Кірісте <code>n</code>, сосын <code>n</code> жолаушы аты. Әр билетті басып, соңында <code>Sold: n</code>. Мысал: <code>2</code> / <code>Aruzhan Timur</code> →</p><pre><code>Ticket #1: Aruzhan\nTicket #2: Timur\nSold: 2</code></pre>",
   "starter": "import java.util.Scanner;\n\nclass Ticket {\n    static int counter = 0;\n    private int id;\n    private String name;\n\n    Ticket(String name) {\n        this.name = name;\n    }\n\n    public String toString() {\n        return name;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            Ticket t = new Ticket(sc.next());\n            System.out.println(t);\n        }\n        System.out.println(\"Sold: \" + Ticket.counter);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Ticket {\n    static int counter = 0;\n    private int id;\n    private String name;\n\n    Ticket(String name) {\n        counter++;\n        this.id = counter;\n        this.name = name;\n    }\n\n    public String toString() {\n        return \"Ticket #\" + id + \": \" + name;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            Ticket t = new Ticket(sc.next());\n            System.out.println(t);\n        }\n        System.out.println(\"Sold: \" + Ticket.counter);\n    }\n}\n",
   "hints": [
    "static өріс барлық объектіге ортақ: constructor-да <code>counter++</code>, сосын <code>id = counter</code>.",
    "<code>System.out.println(t)</code> автоматты түрде <code>t.toString()</code> шақырады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\nAruzhan Timur\n",
      "out": "Ticket #1: Aruzhan\nTicket #2: Timur\nSold: 2\n"
     },
     {
      "stdin": "1\nDana\n",
      "out": "Ticket #1: Dana\nSold: 1\n"
     },
     {
      "stdin": "0\n",
      "out": "Sold: 0\n"
     },
     {
      "stdin": "3\nA B C\n",
      "out": "Ticket #1: A\nTicket #2: B\nTicket #3: C\nSold: 3\n"
     }
    ],
    "mustInclude": [
     "static int counter"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Студенттің орташа балы",
   "prompt": "<p><code>Student</code> класын жазыңыз: аты және үш балы (private), <code>double average()</code> әдісі, <code>toString()</code> <code>Aruzhan: 86.7</code> (1 ондық таңба) қайтарсын. Кірісте <code>n</code>, сосын <code>n</code> жол <code>аты b1 b2 b3</code>. Әр студентті бөлек жолға басыңыз. Мысал: <code>Aruzhan 90 85 85</code> → <code>Aruzhan: 86.7</code>.</p>",
   "starter": "import java.util.Scanner;\n\nclass Student {\n    private String name;\n    private int a, b, c;\n\n    Student(String name, int a, int b, int c) {\n        this.name = name;\n    }\n\n    double average() {\n        return 0;\n    }\n\n    public String toString() {\n        return name;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            Student s = new Student(sc.next(), sc.nextInt(), sc.nextInt(), sc.nextInt());\n            System.out.println(s);\n        }\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Student {\n    private String name;\n    private int a, b, c;\n\n    Student(String name, int a, int b, int c) {\n        this.name = name;\n        this.a = a;\n        this.b = b;\n        this.c = c;\n    }\n\n    double average() {\n        return (a + b + c) / 3.0;\n    }\n\n    public String toString() {\n        return name + \": \" + String.format(\"%.1f\", average());\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            Student s = new Student(sc.next(), sc.nextInt(), sc.nextInt(), sc.nextInt());\n            System.out.println(s);\n        }\n    }\n}\n",
   "hints": [
    "Орташа: <code>(a + b + c) / 3.0</code> — 3 емес, 3.0, әйтпесе бүтін бөлу.",
    "<code>String.format(\"%.1f\", average())</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1\nAruzhan 90 85 85\n",
      "out": "Aruzhan: 86.7\n"
     },
     {
      "stdin": "2\nTimur 100 100 100\nDana 0 0 1\n",
      "out": "Timur: 100.0\nDana: 0.3\n"
     },
     {
      "stdin": "1\nErlan 70 80 91\n",
      "out": "Erlan: 80.3\n"
     }
    ],
    "mustInclude": [
     "class Student"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Лифт",
   "prompt": "<p><code>Elevator</code> класында <code>private int floor</code> (басында 1) және <code>private int maxFloor</code> өрістері бар. <code>boolean move(int delta)</code> жаңа қабат 1 мен <code>maxFloor</code> аралығында болса ғана жылжып, <code>true</code> қайтарсын, әйтпесе ештеңе өзгертпей <code>false</code>. Кірісте <code>maxFloor q</code>, сосын <code>q</code> бүтін сан (жылжу). Соңында екі жол басыңыз: <code>Floor f</code> және <code>Ignored k</code> (орындалмаған жылжулар саны). Мысал: <code>9 4</code> / <code>5 -10 3 1</code> → <code>Floor 9</code>, <code>Ignored 2</code>.</p>",
   "starter": "import java.util.Scanner;\n\nclass Elevator {\n    private int floor = 1;\n    private int maxFloor;\n\n    Elevator(int maxFloor) {\n        this.maxFloor = maxFloor;\n    }\n\n    boolean move(int delta) {\n        floor += delta;\n        return true;\n    }\n\n    int getFloor() { return floor; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Elevator e = new Elevator(sc.nextInt());\n        int q = sc.nextInt();\n        int ignored = 0;\n        for (int i = 0; i < q; i++) {\n            if (!e.move(sc.nextInt())) ignored++;\n        }\n        System.out.println(\"Floor \" + e.getFloor());\n        System.out.println(\"Ignored \" + ignored);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Elevator {\n    private int floor = 1;\n    private int maxFloor;\n\n    Elevator(int maxFloor) {\n        this.maxFloor = maxFloor;\n    }\n\n    boolean move(int delta) {\n        int next = floor + delta;\n        if (next < 1 || next > maxFloor) return false;\n        floor = next;\n        return true;\n    }\n\n    int getFloor() { return floor; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Elevator e = new Elevator(sc.nextInt());\n        int q = sc.nextInt();\n        int ignored = 0;\n        for (int i = 0; i < q; i++) {\n            if (!e.move(sc.nextInt())) ignored++;\n        }\n        System.out.println(\"Floor \" + e.getFloor());\n        System.out.println(\"Ignored \" + ignored);\n    }\n}\n",
   "hints": [
    "Алдымен жаңа қабатты бөлек айнымалыда есептеңіз: <code>int next = floor + delta;</code>.",
    "Шектен шықса <code>return false;</code> — өріс өзгермейді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "9 4\n5 -10 3 1\n",
      "out": "Floor 9\nIgnored 2\n"
     },
     {
      "stdin": "5 0\n",
      "out": "Floor 1\nIgnored 0\n"
     },
     {
      "stdin": "3 3\n-1 2 1\n",
      "out": "Floor 3\nIgnored 2\n"
     },
     {
      "stdin": "16 3\n15 -15 0\n",
      "out": "Floor 1\nIgnored 0\n"
     }
    ],
    "mustInclude": [
     "private int floor"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Жай бөлшек класы",
   "prompt": "<p><code>Fraction</code> класын жазыңыз: <code>private int num, den</code>; constructor бөлшекті ЕҮОБ-қа бөліп қысқартсын; <code>Fraction add(Fraction o)</code> жаңа бөлшек қайтарсын; <code>toString()</code> <code>5/6</code> түрінде. Кірісте төрт оң бүтін сан <code>a b c d</code> (a/b және c/d, бөлгіштер ≤ 10⁴). Қосындыны басыңыз. Мысал: <code>1 2 1 3</code> → <code>5/6</code>, <code>1 4 3 4</code> → <code>1/1</code>.</p>",
   "starter": "import java.util.Scanner;\n\nclass Fraction {\n    private int num, den;\n\n    Fraction(int num, int den) {\n        this.num = num;\n        this.den = den;\n    }\n\n    Fraction add(Fraction o) {\n        return this;\n    }\n\n    public String toString() {\n        return num + \"/\" + den;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Fraction x = new Fraction(sc.nextInt(), sc.nextInt());\n        Fraction y = new Fraction(sc.nextInt(), sc.nextInt());\n        System.out.println(x.add(y));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Fraction {\n    private int num, den;\n\n    Fraction(int num, int den) {\n        int g = gcd(num, den);\n        this.num = num / g;\n        this.den = den / g;\n    }\n\n    private static int gcd(int a, int b) {\n        return b == 0 ? a : gcd(b, a % b);\n    }\n\n    Fraction add(Fraction o) {\n        return new Fraction(num * o.den + o.num * den, den * o.den);\n    }\n\n    public String toString() {\n        return num + \"/\" + den;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Fraction x = new Fraction(sc.nextInt(), sc.nextInt());\n        Fraction y = new Fraction(sc.nextInt(), sc.nextInt());\n        System.out.println(x.add(y));\n    }\n}\n",
   "hints": [
    "a/b + c/d = (a·d + c·b) / (b·d). Бір кластың объектісі екіншісінің private өрістерін (<code>o.den</code>) көре алады.",
    "Қысқарту үшін constructor-да ЕҮОБ (Евклид алгоритмі) әдісін шақырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 2 1 3\n",
      "out": "5/6\n"
     },
     {
      "stdin": "1 4 3 4\n",
      "out": "1/1\n"
     },
     {
      "stdin": "2 4 2 8\n",
      "out": "3/4\n"
     },
     {
      "stdin": "3 10 7 15\n",
      "out": "23/30\n"
     }
    ],
    "mustInclude": [
     "class Fraction"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Уақыт класы",
   "prompt": "<p><code>Clock</code> класында <code>private int minutes</code> (тәулік басынан бері, 0–1439). Constructor <code>Clock(int h, int m)</code>; <code>void add(int mins)</code> уақытты алға жылжытады (тәуліктен асса, 00:00-ден қайта басталады); <code>toString()</code> <code>HH:MM</code> түрінде. Кірісте <code>h m k</code> (0 ≤ k ≤ 10⁶). <code>k</code> минуттан кейінгі уақытты басыңыз. Мысал: <code>23 30 45</code> → <code>00:15</code>.</p>",
   "starter": "import java.util.Scanner;\n\nclass Clock {\n    private int minutes;\n\n    Clock(int h, int m) {\n        minutes = h * 60 + m;\n    }\n\n    void add(int mins) {\n        minutes += mins;\n    }\n\n    public String toString() {\n        return minutes / 60 + \":\" + minutes % 60;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Clock c = new Clock(sc.nextInt(), sc.nextInt());\n        c.add(sc.nextInt());\n        System.out.println(c);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Clock {\n    private int minutes;\n\n    Clock(int h, int m) {\n        minutes = h * 60 + m;\n    }\n\n    void add(int mins) {\n        minutes = (minutes + mins) % 1440;\n    }\n\n    public String toString() {\n        return String.format(\"%02d:%02d\", minutes / 60, minutes % 60);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Clock c = new Clock(sc.nextInt(), sc.nextInt());\n        c.add(sc.nextInt());\n        System.out.println(c);\n    }\n}\n",
   "hints": [
    "Тәулікте 1440 минут: <code>minutes = (minutes + mins) % 1440;</code>.",
    "Екі цифрлы пішім: <code>String.format(\"%02d:%02d\", ...)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "23 30 45\n",
      "out": "00:15\n"
     },
     {
      "stdin": "8 5 0\n",
      "out": "08:05\n"
     },
     {
      "stdin": "0 0 1439\n",
      "out": "23:59\n"
     },
     {
      "stdin": "12 0 1000000\n",
      "out": "22:40\n"
     }
    ],
    "mustInclude": [
     "class Clock"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Кітапхана",
   "prompt": "<p><code>Book</code> класында <code>private String title</code> және <code>private boolean taken</code>; <code>boolean take()</code> және <code>boolean giveBack()</code> күйді тек дұрыс жағдайда өзгертіп, нәтижесін қайтарсын. Кірісте <code>n</code>, сосын <code>n</code> кітап атауы (бір сөз), сосын <code>q</code> және <code>q</code> команда: <code>TAKE атауы</code> немесе <code>RETURN атауы</code>. Кітаптарды массивте сақтаңыз. Әр командаға басыңыз: <code>OK</code>; кітап бос емес болса <code>BUSY</code>; алынбаған кітапты қайтарса <code>NOT TAKEN</code>; атауы жоқ болса <code>NOT FOUND</code>. Мысал:</p><pre><code>2\nAbai Kochevniki\n4\nTAKE Abai\nTAKE Abai\nRETURN Kochevniki\nTAKE Dune</code></pre><p>→ <code>OK</code>, <code>BUSY</code>, <code>NOT TAKEN</code>, <code>NOT FOUND</code> (әрқайсысы бөлек жолда).</p>",
   "starter": "import java.util.Scanner;\n\nclass Book {\n    private String title;\n    private boolean taken;\n\n    Book(String title) {\n        this.title = title;\n    }\n\n    String getTitle() { return title; }\n\n    boolean take() {\n        return true;\n    }\n\n    boolean giveBack() {\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Book[] books = new Book[n];\n        for (int i = 0; i < n; i++) books[i] = new Book(sc.next());\n        int q = sc.nextInt();\n        // командаларды өңдеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Book {\n    private String title;\n    private boolean taken;\n\n    Book(String title) {\n        this.title = title;\n    }\n\n    String getTitle() { return title; }\n\n    boolean take() {\n        if (taken) return false;\n        taken = true;\n        return true;\n    }\n\n    boolean giveBack() {\n        if (!taken) return false;\n        taken = false;\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Book[] books = new Book[n];\n        for (int i = 0; i < n; i++) books[i] = new Book(sc.next());\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String cmd = sc.next();\n            String title = sc.next();\n            Book b = null;\n            for (Book x : books) {\n                if (x.getTitle().equals(title)) {\n                    b = x;\n                    break;\n                }\n            }\n            if (b == null) {\n                System.out.println(\"NOT FOUND\");\n            } else if (cmd.equals(\"TAKE\")) {\n                System.out.println(b.take() ? \"OK\" : \"BUSY\");\n            } else {\n                System.out.println(b.giveBack() ? \"OK\" : \"NOT TAKEN\");\n            }\n        }\n    }\n}\n",
   "hints": [
    "Атау бойынша іздеу: массивті аралап, <code>x.getTitle().equals(title)</code>; табылмаса <code>null</code> қалады.",
    "<code>take()</code>: алынған болса <code>false</code>, әйтпесе <code>taken = true</code> да <code>true</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\nAbai Kochevniki\n4\nTAKE Abai\nTAKE Abai\nRETURN Kochevniki\nTAKE Dune\n",
      "out": "OK\nBUSY\nNOT TAKEN\nNOT FOUND\n"
     },
     {
      "stdin": "1\nX\n4\nTAKE X\nRETURN X\nTAKE X\nRETURN X\n",
      "out": "OK\nOK\nOK\nOK\n"
     },
     {
      "stdin": "1\nX\n2\nRETURN X\nRETURN Y\n",
      "out": "NOT TAKEN\nNOT FOUND\n"
     }
    ],
    "mustInclude": [
     "private boolean taken"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Шоттар арасындағы аударым",
   "prompt": "<p><code>Account</code> класында <code>private long balance</code> және <code>static int transfers</code> (сәтті аударымдар саны). <code>boolean transferTo(Account to, long amount)</code> сома оң және балансқа жетсе ғана ақшаны аударып, <code>transfers</code>-ті арттырсын. Кірісте <code>n</code>, сосын <code>n</code> бастапқы баланс, сосын <code>q</code> және <code>q</code> жол <code>from to amount</code> (шот нөмірлері 1-ден n-ге дейін). Өз шотына аударым (<code>from == to</code>) да сәтсіз. Әр сәтсіз аударымға <code>FAIL i</code> (аударымның реттік нөмірі, 1-ден) басыңыз, соңында барлық баланстарды бір жолға және <code>Transfers: k</code>. Мысал:</p><pre><code>3\n1000 500 0\n3\n1 3 400\n2 1 600\n3 2 400</code></pre><p>→</p><pre><code>FAIL 2\n600 900 0\nTransfers: 2</code></pre>",
   "starter": "import java.util.Scanner;\n\nclass Account {\n    static int transfers = 0;\n    private long balance;\n\n    Account(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    boolean transferTo(Account to, long amount) {\n        return false;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Account[] acc = new Account[n];\n        for (int i = 0; i < n; i++) acc[i] = new Account(sc.nextLong());\n        int q = sc.nextInt();\n        // аударымдарды өңдеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass Account {\n    static int transfers = 0;\n    private long balance;\n\n    Account(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    boolean transferTo(Account to, long amount) {\n        if (to == this || amount <= 0 || amount > balance) return false;\n        balance -= amount;\n        to.balance += amount;\n        transfers++;\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Account[] acc = new Account[n];\n        for (int i = 0; i < n; i++) acc[i] = new Account(sc.nextLong());\n        int q = sc.nextInt();\n        for (int i = 1; i <= q; i++) {\n            int from = sc.nextInt() - 1;\n            int to = sc.nextInt() - 1;\n            long amount = sc.nextLong();\n            if (!acc[from].transferTo(acc[to], amount)) System.out.println(\"FAIL \" + i);\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(acc[i].getBalance());\n        }\n        System.out.println(sb.toString());\n        System.out.println(\"Transfers: \" + Account.transfers);\n    }\n}\n",
   "hints": [
    "Шот нөмірлері 1-ден басталады — массив индексі үшін 1-ді алып тастаңыз.",
    "Бір кластың әдісі сол кластың басқа объектісінің private өрісін өзгерте алады: <code>to.balance += amount;</code>. Өз шотын <code>to == this</code> арқылы тексеріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n1000 500 0\n3\n1 3 400\n2 1 600\n3 2 400\n",
      "out": "FAIL 2\n600 900 0\nTransfers: 2\n"
     },
     {
      "stdin": "2\n100 100\n3\n1 1 50\n1 2 0\n2 1 100\n",
      "out": "FAIL 1\nFAIL 2\n200 0\nTransfers: 1\n"
     },
     {
      "stdin": "1\n5\n0\n",
      "out": "5\nTransfers: 0\n"
     }
    ],
    "mustInclude": [
     "private long balance",
     "static int transfers"
    ]
   }
  }
 ],
 "jv-9": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Жануарлар дыбысы",
   "prompt": "<p><code>abstract class Animal</code> (аты бар, <code>abstract String sound()</code>) және одан мұра алатын <code>Dog</code> (<code>Woof</code>), <code>Cat</code> (<code>Meow</code>), <code>Cow</code> (<code>Moo</code>) кластарын жазыңыз. Кірісте <code>n</code>, сосын <code>n</code> жол <code>түрі аты</code>. Әрқайсысына <code>аты: дыбысы</code> басыңыз. Мысал: <code>Dog Bars</code> → <code>Bars: Woof</code>.</p>",
   "starter": "import java.util.Scanner;\n\nabstract class Animal {\n    protected String name;\n\n    Animal(String name) { this.name = name; }\n\n    abstract String sound();\n}\n\n// Dog, Cat, Cow кластарын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // әр жолға сәйкес объект жасаңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nabstract class Animal {\n    protected String name;\n\n    Animal(String name) { this.name = name; }\n\n    abstract String sound();\n\n    String describe() { return name + \": \" + sound(); }\n}\n\nclass Dog extends Animal {\n    Dog(String name) { super(name); }\n    String sound() { return \"Woof\"; }\n}\n\nclass Cat extends Animal {\n    Cat(String name) { super(name); }\n    String sound() { return \"Meow\"; }\n}\n\nclass Cow extends Animal {\n    Cow(String name) { super(name); }\n    String sound() { return \"Moo\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String kind = sc.next();\n            String name = sc.next();\n            Animal a;\n            if (kind.equals(\"Dog\")) a = new Dog(name);\n            else if (kind.equals(\"Cat\")) a = new Cat(name);\n            else a = new Cow(name);\n            System.out.println(a.describe());\n        }\n    }\n}\n",
   "hints": [
    "Әр ұрпақтың constructor-ы <code>super(name)</code> шақырады.",
    "Айнымалы типі <code>Animal</code> болса да, <code>sound()</code> объектінің нақты класынан шақырылады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nDog Bars\nCat Mysyq\nCow Qyzyl\n",
      "out": "Bars: Woof\nMysyq: Meow\nQyzyl: Moo\n"
     },
     {
      "stdin": "1\nCat Tom\n",
      "out": "Tom: Meow\n"
     },
     {
      "stdin": "2\nCow A\nCow B\n",
      "out": "A: Moo\nB: Moo\n"
     }
    ],
    "mustInclude": [
     "extends Animal"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Көлік дөңгелектері",
   "prompt": "<p><code>interface Vehicle { int wheels(); }</code> және оны іске асыратын <code>Car</code> (4), <code>Bike</code> (2), <code>Truck</code> (6) кластарын жазыңыз. Кірісте <code>n</code>, сосын <code>n</code> көлік түрі (<code>Car</code>, <code>Bike</code>, <code>Truck</code>). Барлық дөңгелектің жалпы санын басыңыз. Мысал: <code>3</code> / <code>Car Bike Truck</code> → <code>12</code>.</p>",
   "starter": "import java.util.Scanner;\n\ninterface Vehicle {\n    int wheels();\n}\n\n// Car, Bike, Truck кластарын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int total = 0;\n        // әр көліктің wheels() мәнін қосыңыз\n        System.out.println(total);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\ninterface Vehicle {\n    int wheels();\n}\n\nclass Car implements Vehicle {\n    public int wheels() { return 4; }\n}\n\nclass Bike implements Vehicle {\n    public int wheels() { return 2; }\n}\n\nclass Truck implements Vehicle {\n    public int wheels() { return 6; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int total = 0;\n        for (int i = 0; i < n; i++) {\n            String kind = sc.next();\n            Vehicle v;\n            if (kind.equals(\"Car\")) v = new Car();\n            else if (kind.equals(\"Bike\")) v = new Bike();\n            else v = new Truck();\n            total += v.wheels();\n        }\n        System.out.println(total);\n    }\n}\n",
   "hints": [
    "Interface әдістері <code>public</code>: <code>public int wheels() { return 4; }</code>.",
    "Айнымалыны interface типімен жариялаңыз: <code>Vehicle v = new Car();</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nCar Bike Truck\n",
      "out": "12\n"
     },
     {
      "stdin": "1\nBike\n",
      "out": "2\n"
     },
     {
      "stdin": "4\nTruck Truck Car Car\n",
      "out": "20\n"
     },
     {
      "stdin": "0\n",
      "out": "0\n"
     }
    ],
    "mustInclude": [
     "implements Vehicle"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Default сәлемдесу",
   "prompt": "<p><code>interface Greeter</code>: <code>String name();</code> және <code>default String greet()</code> — <code>Hello, &lt;name&gt;!</code> қайтарады. <code>EnGreeter</code> класы default әдісті өзгертпейді, ал <code>KzGreeter</code> оны қайта жазып, <code>Salem, &lt;name&gt;!</code> қайтарады. Кірісте <code>n</code>, сосын <code>n</code> жол <code>en аты</code> немесе <code>kz аты</code>. Әрқайсысына <code>greet()</code> нәтижесін басыңыз. Мысал: <code>kz Aruzhan</code> → <code>Salem, Aruzhan!</code>.</p>",
   "starter": "import java.util.Scanner;\n\ninterface Greeter {\n    String name();\n}\n\n// default greet(), EnGreeter және KzGreeter жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // әр жол үшін Greeter жасап, greet() басыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\ninterface Greeter {\n    String name();\n\n    default String greet() {\n        return \"Hello, \" + name() + \"!\";\n    }\n}\n\nclass EnGreeter implements Greeter {\n    private String n;\n    EnGreeter(String n) { this.n = n; }\n    public String name() { return n; }\n}\n\nclass KzGreeter implements Greeter {\n    private String n;\n    KzGreeter(String n) { this.n = n; }\n    public String name() { return n; }\n    public String greet() { return \"Salem, \" + name() + \"!\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String lang = sc.next();\n            String name = sc.next();\n            Greeter g = lang.equals(\"kz\") ? new KzGreeter(name) : new EnGreeter(name);\n            System.out.println(g.greet());\n        }\n    }\n}\n",
   "hints": [
    "Default әдіс interface ішінде денесімен жазылады: <code>default String greet() { ... }</code>.",
    "<code>KzGreeter</code>-де <code>public String greet()</code> әдісін қайта жазыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\nkz Aruzhan\nen Tom\n",
      "out": "Salem, Aruzhan!\nHello, Tom!\n"
     },
     {
      "stdin": "1\nen Ali\n",
      "out": "Hello, Ali!\n"
     },
     {
      "stdin": "3\nkz A\nkz B\nen C\n",
      "out": "Salem, A!\nSalem, B!\nHello, C!\n"
     }
    ],
    "mustInclude": [
     "default String greet"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Менеджер бонусы",
   "prompt": "<p><code>abstract class Employee</code> (аты, <code>abstract long monthlyPay()</code>), <code>Salaried extends Employee</code> (тұрақты айлық) және <code>Manager extends Salaried</code> (айлық + бонус; <code>monthlyPay()</code> ішінде <code>super.monthlyPay()</code> қолданыңыз). Кірісте <code>n</code>, сосын <code>n</code> жол: <code>S аты айлық</code> немесе <code>M аты айлық бонус</code>. Әрқайсысына <code>аты: төлем</code>, соңында <code>Total: сома</code>. Мысал: <code>M Aliya 600000 150000</code> → <code>Aliya: 750000</code>.</p>",
   "starter": "import java.util.Scanner;\n\nabstract class Employee {\n    protected String name;\n    Employee(String name) { this.name = name; }\n    abstract long monthlyPay();\n}\n\n// Salaried және Manager кластарын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long total = 0;\n        // қызметкерлерді оқыңыз\n        System.out.println(\"Total: \" + total);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nabstract class Employee {\n    protected String name;\n    Employee(String name) { this.name = name; }\n    abstract long monthlyPay();\n}\n\nclass Salaried extends Employee {\n    private long salary;\n    Salaried(String name, long salary) {\n        super(name);\n        this.salary = salary;\n    }\n    long monthlyPay() { return salary; }\n}\n\nclass Manager extends Salaried {\n    private long bonus;\n    Manager(String name, long salary, long bonus) {\n        super(name, salary);\n        this.bonus = bonus;\n    }\n    long monthlyPay() { return super.monthlyPay() + bonus; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long total = 0;\n        for (int i = 0; i < n; i++) {\n            String kind = sc.next();\n            String name = sc.next();\n            long salary = sc.nextLong();\n            Employee e = kind.equals(\"M\") ? new Manager(name, salary, sc.nextLong()) : new Salaried(name, salary);\n            System.out.println(e.name + \": \" + e.monthlyPay());\n            total += e.monthlyPay();\n        }\n        System.out.println(\"Total: \" + total);\n    }\n}\n",
   "hints": [
    "<code>Manager</code> constructor-ы <code>super(name, salary)</code> шақырады.",
    "<code>super.monthlyPay()</code> ата-кластың нұсқасын шақырады, оған бонусты қосыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\nS Timur 400000\nM Aliya 600000 150000\n",
      "out": "Timur: 400000\nAliya: 750000\nTotal: 1150000\n"
     },
     {
      "stdin": "1\nM Boss 1000000000 2000000000\n",
      "out": "Boss: 3000000000\nTotal: 3000000000\n"
     },
     {
      "stdin": "1\nS A 0\n",
      "out": "A: 0\nTotal: 0\n"
     }
    ],
    "mustInclude": [
     "super.monthlyPay()"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Жеңілдік түрлері",
   "prompt": "<p><code>interface Discount { long apply(long price); }</code> және үш класс: <code>NoDiscount</code> (бағаны өзгертпейді), <code>Percent</code> (p% жеңілдік, бүтін бөлу: <code>price - price * p / 100</code>), <code>Fixed</code> (тұрақты сома алынады, бірақ баға 0-ден төмен түспейді). Кірісте баға және <code>n</code>, сосын <code>n</code> жол: <code>NONE</code>, <code>PCT p</code> немесе <code>FIX сома</code>. Әр жеңілдіктен кейінгі бағаны (бастапқы бағаға қолданып) бөлек жолға басыңыз. Мысал: <code>20000 3</code> / <code>NONE</code> / <code>PCT 15</code> / <code>FIX 25000</code> → <code>20000</code>, <code>17000</code>, <code>0</code>.</p>",
   "starter": "import java.util.Scanner;\n\ninterface Discount {\n    long apply(long price);\n}\n\n// NoDiscount, Percent, Fixed кластарын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long price = sc.nextLong();\n        int n = sc.nextInt();\n        // әр жолға Discount объектісін жасаңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\ninterface Discount {\n    long apply(long price);\n}\n\nclass NoDiscount implements Discount {\n    public long apply(long price) { return price; }\n}\n\nclass Percent implements Discount {\n    private long p;\n    Percent(long p) { this.p = p; }\n    public long apply(long price) { return price - price * p / 100; }\n}\n\nclass Fixed implements Discount {\n    private long amount;\n    Fixed(long amount) { this.amount = amount; }\n    public long apply(long price) { return price > amount ? price - amount : 0; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long price = sc.nextLong();\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String kind = sc.next();\n            Discount d;\n            if (kind.equals(\"PCT\")) d = new Percent(sc.nextLong());\n            else if (kind.equals(\"FIX\")) d = new Fixed(sc.nextLong());\n            else d = new NoDiscount();\n            System.out.println(d.apply(price));\n        }\n    }\n}\n",
   "hints": [
    "Үш класс та <code>implements Discount</code> және <code>public long apply(long price)</code>.",
    "<code>Fixed</code>: <code>price &gt; amount ? price - amount : 0</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "20000 3\nNONE\nPCT 15\nFIX 25000\n",
      "out": "20000\n17000\n0\n"
     },
     {
      "stdin": "999 2\nPCT 50\nFIX 1\n",
      "out": "500\n998\n"
     },
     {
      "stdin": "100 1\nPCT 0\n",
      "out": "100\n"
     }
    ],
    "mustInclude": [
     "implements Discount"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкен периметр",
   "prompt": "<p><code>interface Shape</code>: <code>double perimeter();</code> және <code>default String label()</code> — <code>shape</code> қайтарады. <code>Square(a)</code>, <code>Rect(w, h)</code>, <code>Circle(r)</code> (периметр 2πr) кластарының әрқайсысы <code>label()</code>-ді қайта жазып, <code>square</code>, <code>rect</code>, <code>circle</code> қайтарсын. Кірісте <code>n</code>, сосын <code>n</code> жол: <code>S a</code>, <code>R w h</code> немесе <code>C r</code>. Периметрі ең үлкен фигураны (тең болса — біріншісін) <code>label периметр</code> түрінде, периметрді 2 ондық таңбамен басыңыз. Мысал: <code>S 5</code>, <code>C 3</code>, <code>R 4 7</code> → <code>rect 22.00</code>.</p>",
   "starter": "import java.util.Scanner;\n\ninterface Shape {\n    double perimeter();\n    default String label() { return \"shape\"; }\n}\n\n// Square, Rect, Circle кластарын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // фигураларды оқып, ең үлкен периметрлісін табыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\ninterface Shape {\n    double perimeter();\n    default String label() { return \"shape\"; }\n}\n\nclass Square implements Shape {\n    private double a;\n    Square(double a) { this.a = a; }\n    public double perimeter() { return 4 * a; }\n    public String label() { return \"square\"; }\n}\n\nclass Rect implements Shape {\n    private double w, h;\n    Rect(double w, double h) { this.w = w; this.h = h; }\n    public double perimeter() { return 2 * (w + h); }\n    public String label() { return \"rect\"; }\n}\n\nclass Circle implements Shape {\n    private double r;\n    Circle(double r) { this.r = r; }\n    public double perimeter() { return 2 * Math.PI * r; }\n    public String label() { return \"circle\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Shape best = null;\n        for (int i = 0; i < n; i++) {\n            String k = sc.next();\n            Shape s;\n            if (k.equals(\"S\")) s = new Square(sc.nextInt());\n            else if (k.equals(\"C\")) s = new Circle(sc.nextInt());\n            else {\n                int w = sc.nextInt();\n                int h = sc.nextInt();\n                s = new Rect(w, h);\n            }\n            if (best == null || s.perimeter() > best.perimeter()) best = s;\n        }\n        System.out.println(best.label() + \" \" + String.format(\"%.2f\", best.perimeter()));\n    }\n}\n",
   "hints": [
    "Ең жақсы фигураны <code>Shape best = null;</code> айнымалысында ұстаңыз.",
    "Тек қатаң үлкен болғанда ауыстырыңыз (<code>&gt;</code>) — сонда тең жағдайда біріншісі қалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nS 5\nC 3\nR 4 7\n",
      "out": "rect 22.00\n"
     },
     {
      "stdin": "2\nS 5\nR 4 6\n",
      "out": "square 20.00\n"
     },
     {
      "stdin": "1\nC 1\n",
      "out": "circle 6.28\n"
     },
     {
      "stdin": "2\nS 2\nR 1 3\n",
      "out": "square 8.00\n"
     },
     {
      "stdin": "2\nR 1 1\nC 10\n",
      "out": "circle 62.83\n"
     }
    ],
    "mustInclude": [
     "implements Shape",
     "default String label"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Төлем комиссиялары",
   "prompt": "<p><code>abstract class Payment</code>: <code>amount</code> өрісі, <code>abstract long fee()</code>, <code>abstract String kind()</code>. Ұрпақтары: <code>Card</code> — сомасының 1% (бүтін бөлу), <code>Qr</code> — 0, <code>Transfer</code> — тұрақты 150. Кірісте <code>n</code>, сосын <code>n</code> жол <code>CARD сома</code>, <code>QR сома</code> немесе <code>TRANSFER сома</code>. Төлемдерді <code>Payment[]</code> массивіне жинап, комиссиясы бойынша <b>кему</b> ретімен (тең болса, кіріс ретімен) өзіңіз жазған сұрыптаумен реттеңіз. Әрқайсысын <code>kind amount fee</code> түрінде басыңыз, соңында <code>Total fee: сома</code>. Мысал:</p><pre><code>3\nQR 5000\nCARD 25000\nTRANSFER 100000</code></pre><p>→</p><pre><code>CARD 25000 250\nTRANSFER 100000 150\nQR 5000 0\nTotal fee: 400</code></pre>",
   "starter": "import java.util.Scanner;\n\nabstract class Payment {\n    protected long amount;\n    Payment(long amount) { this.amount = amount; }\n    abstract long fee();\n    abstract String kind();\n}\n\n// Card, Qr, Transfer кластарын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Payment[] ps = new Payment[n];\n        // оқып, сұрыптап, басыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nabstract class Payment {\n    protected long amount;\n    Payment(long amount) { this.amount = amount; }\n    abstract long fee();\n    abstract String kind();\n    public String toString() { return kind() + \" \" + amount + \" \" + fee(); }\n}\n\nclass Card extends Payment {\n    Card(long amount) { super(amount); }\n    long fee() { return amount / 100; }\n    String kind() { return \"CARD\"; }\n}\n\nclass Qr extends Payment {\n    Qr(long amount) { super(amount); }\n    long fee() { return 0; }\n    String kind() { return \"QR\"; }\n}\n\nclass Transfer extends Payment {\n    Transfer(long amount) { super(amount); }\n    long fee() { return 150; }\n    String kind() { return \"TRANSFER\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Payment[] ps = new Payment[n];\n        for (int i = 0; i < n; i++) {\n            String k = sc.next();\n            long a = sc.nextLong();\n            if (k.equals(\"CARD\")) ps[i] = new Card(a);\n            else if (k.equals(\"QR\")) ps[i] = new Qr(a);\n            else ps[i] = new Transfer(a);\n        }\n        // insertion sort: тұрақты, тең комиссияда кіріс реті сақталады\n        for (int i = 1; i < n; i++) {\n            Payment cur = ps[i];\n            int j = i - 1;\n            while (j >= 0 && ps[j].fee() < cur.fee()) {\n                ps[j + 1] = ps[j];\n                j--;\n            }\n            ps[j + 1] = cur;\n        }\n        long total = 0;\n        for (Payment p : ps) {\n            System.out.println(p);\n            total += p.fee();\n        }\n        System.out.println(\"Total fee: \" + total);\n    }\n}\n",
   "hints": [
    "Сұрыптау үшін insertion sort ыңғайлы: ол тұрақты, яғни тең элементтердің реті бұзылмайды.",
    "Салыстыру тек <code>fee()</code> арқылы — қай класс екенін білудің қажеті жоқ (полиморфизм)."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nQR 5000\nCARD 25000\nTRANSFER 100000\n",
      "out": "CARD 25000 250\nTRANSFER 100000 150\nQR 5000 0\nTotal fee: 400\n"
     },
     {
      "stdin": "3\nCARD 15000\nTRANSFER 1\nCARD 99\n",
      "out": "CARD 15000 150\nTRANSFER 1 150\nCARD 99 0\nTotal fee: 300\n"
     },
     {
      "stdin": "1\nQR 1\n",
      "out": "QR 1 0\nTotal fee: 0\n"
     },
     {
      "stdin": "2\nQR 10\nQR 20\n",
      "out": "QR 10 0\nQR 20 0\nTotal fee: 0\n"
     }
    ],
    "mustInclude": [
     "extends Payment"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Өрнек ағашы",
   "prompt": "<p><code>interface Expr { long eval(); String show(); }</code> және үш класс: <code>Num</code> (сан), <code>Add</code> және <code>Mul</code> (екі <code>Expr</code> ұстайды). <code>show()</code> қосу мен көбейтуді жақшамен көрсетеді: <code>(3 + 4)</code>. Кірісте <code>n</code>, сосын кері поляк жазбасындағы <code>n</code> таңбалауыш (сандар, <code>+</code>, <code>*</code>); өрнек әрқашан дұрыс. <code>Expr[]</code> массивін стек ретінде пайдаланып ағаш құрыңыз да, <code>show() = eval()</code> басыңыз. Мысал: <code>5</code> / <code>3 4 + 2 *</code> → <code>((3 + 4) * 2) = 14</code>.</p>",
   "starter": "import java.util.Scanner;\n\ninterface Expr {\n    long eval();\n    String show();\n}\n\n// Num, Add, Mul кластарын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Expr[] stack = new Expr[n];\n        int top = 0;\n        // таңбалауыштарды өңдеңіз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\ninterface Expr {\n    long eval();\n    String show();\n}\n\nclass Num implements Expr {\n    private long v;\n    Num(long v) { this.v = v; }\n    public long eval() { return v; }\n    public String show() { return \"\" + v; }\n}\n\nclass Add implements Expr {\n    private Expr a, b;\n    Add(Expr a, Expr b) { this.a = a; this.b = b; }\n    public long eval() { return a.eval() + b.eval(); }\n    public String show() { return \"(\" + a.show() + \" + \" + b.show() + \")\"; }\n}\n\nclass Mul implements Expr {\n    private Expr a, b;\n    Mul(Expr a, Expr b) { this.a = a; this.b = b; }\n    public long eval() { return a.eval() * b.eval(); }\n    public String show() { return \"(\" + a.show() + \" * \" + b.show() + \")\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Expr[] stack = new Expr[n];\n        int top = 0;\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            if (t.equals(\"+\") || t.equals(\"*\")) {\n                Expr b = stack[--top];\n                Expr a = stack[--top];\n                stack[top++] = t.equals(\"+\") ? new Add(a, b) : new Mul(a, b);\n            } else {\n                stack[top++] = new Num(Long.parseLong(t));\n            }\n        }\n        Expr e = stack[0];\n        System.out.println(e.show() + \" = \" + e.eval());\n    }\n}\n",
   "hints": [
    "Сан келсе — стекке <code>new Num(...)</code> салыңыз; амал келсе — екі элемент алып (алдымен оң жақтағысы шығады), жаңа <code>Add</code>/<code>Mul</code> салыңыз.",
    "<code>eval()</code> мен <code>show()</code> рекурсивті түрде ішкі өрнектерді шақырады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n3 4 + 2 *\n",
      "out": "((3 + 4) * 2) = 14\n"
     },
     {
      "stdin": "1\n42\n",
      "out": "42 = 42\n"
     },
     {
      "stdin": "7\n1 2 3 * + 4 +\n",
      "out": "((1 + (2 * 3)) + 4) = 11\n"
     },
     {
      "stdin": "3\n100000 100000 *\n",
      "out": "(100000 * 100000) = 10000000000\n"
     }
    ],
    "mustInclude": [
     "implements Expr"
    ]
   }
  }
 ],
 "jv-10": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Әртүрлі қалалар саны",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> қала атауы (бір сөз). <code>HashSet</code> арқылы неше әртүрлі қала барын басыңыз. Мысал: <code>5</code> / <code>Almaty Astana Almaty Oral Astana</code> → <code>3</code>.</p>",
   "starter": "import java.util.HashSet;\nimport java.util.Set;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> cities = new HashSet<>();\n        // қалаларды қосыңыз\n        System.out.println(n);\n    }\n}\n",
   "solution": "import java.util.HashSet;\nimport java.util.Scanner;\nimport java.util.Set;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> cities = new HashSet<>();\n        for (int i = 0; i < n; i++) cities.add(sc.next());\n        System.out.println(cities.size());\n    }\n}\n",
   "hints": [
    "<code>Set</code> қайталанатын мәнді екінші рет сақтамайды.",
    "Жауап — <code>cities.size()</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\nAlmaty Astana Almaty Oral Astana\n",
      "out": "3\n"
     },
     {
      "stdin": "1\nTaraz\n",
      "out": "1\n"
     },
     {
      "stdin": "4\na A a A\n",
      "out": "2\n"
     },
     {
      "stdin": "0\n",
      "out": "0\n"
     }
    ],
    "mustInclude": [
     "HashSet"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Баға анықтамалығы",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> жол <code>тауар баға</code>, сосын <code>q</code> және <code>q</code> тауар атауы. Тауарларды <code>HashMap</code>-қа салып, әр сұрауға бағасын немесе <code>NOT FOUND</code> басыңыз. Тауар қайталанса, соңғы баға күшінде. Мысал: <code>2</code> / <code>nan 250</code> / <code>sut 480</code> / <code>2</code> / <code>sut</code> / <code>shai</code> → <code>480</code>, <code>NOT FOUND</code>.</p>",
   "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> prices = new HashMap<>();\n        // put, сосын сұрауларға жауап\n    }\n}\n",
   "solution": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> prices = new HashMap<>();\n        for (int i = 0; i < n; i++) {\n            String item = sc.next();\n            prices.put(item, sc.nextInt());\n        }\n        int q = sc.nextInt();\n        for (int i = 0; i < q; i++) {\n            String item = sc.next();\n            if (prices.containsKey(item)) System.out.println(prices.get(item));\n            else System.out.println(\"NOT FOUND\");\n        }\n    }\n}\n",
   "hints": [
    "<code>put</code> бар кілттің мәнін ауыстырады — соңғы баға өзі қалады.",
    "<code>containsKey</code> арқылы тексеріңіз, сосын <code>get</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\nnan 250\nsut 480\n2\nsut\nshai\n",
      "out": "480\nNOT FOUND\n"
     },
     {
      "stdin": "2\nalma 500\nalma 700\n1\nalma\n",
      "out": "700\n"
     },
     {
      "stdin": "1\nx 1\n3\ny\nx\nX\n",
      "out": "NOT FOUND\n1\nNOT FOUND\n"
     }
    ],
    "mustInclude": [
     "HashMap"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Ұзын сөздер тізімі",
   "prompt": "<p>Кірісте <code>n k</code>, сосын <code>n</code> сөз. Ұзындығы <code>k</code>-дан кем емес сөздерді кіріс ретімен <code>ArrayList</code>-ке жинаңыз. Бірінші жолға олардың санын, екінші жолға сөздердің өзін бос орынмен басыңыз (бос болса, екінші жол бос). Мысал: <code>4 5</code> / <code>Astana Oral Almaty Kokshetau</code> →</p><pre><code>3\nAstana Almaty Kokshetau</code></pre>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        // сөздерді сүзіңіз\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            String w = sc.next();\n            if (w.length() >= k) words.add(w);\n        }\n        System.out.println(words.size());\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < words.size(); i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(words.get(i));\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "<code>w.length() &gt;= k</code> болса <code>words.add(w)</code>.",
    "Элементтерді <code>words.get(i)</code> арқылы аралаңыз, саны — <code>words.size()</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4 5\nAstana Oral Almaty Kokshetau\n",
      "out": "3\nAstana Almaty Kokshetau\n"
     },
     {
      "stdin": "2 10\nab cd\n",
      "out": "0\n\n"
     },
     {
      "stdin": "3 1\na bb a\n",
      "out": "3\na bb a\n"
     }
    ],
    "mustInclude": [
     "ArrayList"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ең жиі сөз",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> сөз (мысалы, сауалнамадағы сүйікті тағамдар). Ең жиі кездескен сөзді және оның санын басыңыз; саны тең болса — әліпби бойынша ең кішісін. <code>HashMap</code> қолданыңыз. Мысал: <code>6</code> / <code>besbarmak plov plov manty besbarmak kuyrdak</code> → <code>besbarmak 2</code>.</p>",
   "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> cnt = new HashMap<>();\n        // санаңыз\n    }\n}\n",
   "solution": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Integer> cnt = new HashMap<>();\n        for (int i = 0; i < n; i++) cnt.merge(sc.next(), 1, Integer::sum);\n        String best = null;\n        int bestCount = 0;\n        for (Map.Entry<String, Integer> e : cnt.entrySet()) {\n            int c = e.getValue();\n            if (c > bestCount || (c == bestCount && e.getKey().compareTo(best) < 0)) {\n                best = e.getKey();\n                bestCount = c;\n            }\n        }\n        System.out.println(best + \" \" + bestCount);\n    }\n}\n",
   "hints": [
    "Санау: <code>cnt.merge(w, 1, Integer::sum)</code> немесе <code>getOrDefault</code>.",
    "HashMap ретсіз, сондықтан тең жағдайды өзіңіз шешіңіз: <code>e.getKey().compareTo(best) &lt; 0</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\nbesbarmak plov plov manty besbarmak kuyrdak\n",
      "out": "besbarmak 2\n"
     },
     {
      "stdin": "1\nshai\n",
      "out": "shai 1\n"
     },
     {
      "stdin": "3\nc b a\n",
      "out": "a 1\n"
     },
     {
      "stdin": "5\nx y y x y\n",
      "out": "y 3\n"
     }
    ],
    "mustInclude": [
     "HashMap"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ортақ оқушылар",
   "prompt": "<p>Екі үйірме бар: шахмат және робототехника. Кірісте <code>n</code> және <code>n</code> аты (шахмат), сосын <code>m</code> және <code>m</code> аты (робототехника). Екі үйірмеге де қатысатын оқушыларды әліпби бойынша бөлек жолдарға басыңыз; ондай оқушы болмаса <code>NONE</code>. <code>HashSet</code> және <code>TreeSet</code> қолданыңыз. Мысал: <code>3</code> / <code>Dana Aibek Erlan</code> / <code>2</code> / <code>Erlan Aibek</code> → <code>Aibek</code>, <code>Erlan</code>.</p>",
   "starter": "import java.util.HashSet;\nimport java.util.Set;\nimport java.util.TreeSet;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> chess = new HashSet<>();\n        // екінші тізімді оқып, ортақтарын табыңыз\n    }\n}\n",
   "solution": "import java.util.HashSet;\nimport java.util.Scanner;\nimport java.util.Set;\nimport java.util.TreeSet;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Set<String> chess = new HashSet<>();\n        for (int i = 0; i < n; i++) chess.add(sc.next());\n        int m = sc.nextInt();\n        Set<String> both = new TreeSet<>();\n        for (int i = 0; i < m; i++) {\n            String name = sc.next();\n            if (chess.contains(name)) both.add(name);\n        }\n        if (both.isEmpty()) {\n            System.out.println(\"NONE\");\n        } else {\n            for (String s : both) System.out.println(s);\n        }\n    }\n}\n",
   "hints": [
    "Бірінші тізімді <code>HashSet</code>-ке салыңыз, екіншісін оқығанда <code>contains</code> арқылы тексеріңіз.",
    "Ортақтарын <code>TreeSet</code>-ке салсаңыз, олар әліпби бойынша өзі реттеледі."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nDana Aibek Erlan\n2\nErlan Aibek\n",
      "out": "Aibek\nErlan\n"
     },
     {
      "stdin": "1\nA\n1\nB\n",
      "out": "NONE\n"
     },
     {
      "stdin": "2\nX Y\n3\nY Y X\n",
      "out": "X\nY\n"
     }
    ],
    "mustInclude": [
     "TreeSet"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Қала бойынша сатылым",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> жол <code>қала сома</code>. Әр қаланың жалпы сатылымын қала <b>алғаш кездескен ретпен</b> <code>қала сома</code> түрінде басыңыз. <code>LinkedHashMap</code> қосылу ретін сақтайды. Мысал: <code>4</code> / <code>Oral 500</code> / <code>Almaty 200</code> / <code>Oral 300</code> / <code>Taraz 100</code> → <code>Oral 800</code>, <code>Almaty 200</code>, <code>Taraz 100</code>.</p>",
   "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Long> sales = new HashMap<>();\n        // қосындыларды жинаңыз\n    }\n}\n",
   "solution": "import java.util.LinkedHashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, Long> sales = new LinkedHashMap<>();\n        for (int i = 0; i < n; i++) {\n            String city = sc.next();\n            long amount = sc.nextLong();\n            sales.put(city, sales.getOrDefault(city, 0L) + amount);\n        }\n        for (Map.Entry<String, Long> e : sales.entrySet()) {\n            System.out.println(e.getKey() + \" \" + e.getValue());\n        }\n    }\n}\n",
   "hints": [
    "<code>Map&lt;String, Long&gt; sales = new LinkedHashMap&lt;&gt;();</code>",
    "<code>sales.put(city, sales.getOrDefault(city, 0L) + amount)</code>; бар кілтті жаңарту оның орнын өзгертпейді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\nOral 500\nAlmaty 200\nOral 300\nTaraz 100\n",
      "out": "Oral 800\nAlmaty 200\nTaraz 100\n"
     },
     {
      "stdin": "1\nAktau 5\n",
      "out": "Aktau 5\n"
     },
     {
      "stdin": "3\nb 2000000000\na 1\nb 2000000000\n",
      "out": "b 4000000000\na 1\n"
     }
    ],
    "mustInclude": [
     "LinkedHashMap"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Анаграмма топтары",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> сөз (кіші латын әріптері). Бір әріптерден құралған сөздерді (анаграммаларды) топтаңыз. Топтарды бірінші сөзі кездескен ретпен, әр топты бір жолға, ішіндегі сөздерді кіріс ретімен бос орынмен басыңыз. Мысал: <code>6</code> / <code>eat tea tan ate nat bat</code> →</p><pre><code>eat tea ate\ntan nat\nbat</code></pre><p>Кілт ретінде сөздің сұрыпталған әріптерін алыңыз.</p>",
   "starter": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.LinkedHashMap;\nimport java.util.List;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, List<String>> groups = new LinkedHashMap<>();\n        // кілт: сұрыпталған әріптер\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.LinkedHashMap;\nimport java.util.List;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, List<String>> groups = new LinkedHashMap<>();\n        for (int i = 0; i < n; i++) {\n            String w = sc.next();\n            char[] cs = w.toCharArray();\n            Arrays.sort(cs);\n            String key = new String(cs);\n            if (!groups.containsKey(key)) groups.put(key, new ArrayList<>());\n            groups.get(key).add(w);\n        }\n        for (List<String> g : groups.values()) {\n            StringBuilder sb = new StringBuilder();\n            for (int i = 0; i < g.size(); i++) {\n                if (i > 0) sb.append(' ');\n                sb.append(g.get(i));\n            }\n            System.out.println(sb.toString());\n        }\n    }\n}\n",
   "hints": [
    "Кілт: <code>char[] cs = w.toCharArray(); Arrays.sort(cs); String key = new String(cs);</code>.",
    "Мәні — сөздер тізімі: <code>Map&lt;String, List&lt;String&gt;&gt;</code>; топтардың ретін <code>LinkedHashMap</code> сақтайды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\neat tea tan ate nat bat\n",
      "out": "eat tea ate\ntan nat\nbat\n"
     },
     {
      "stdin": "1\na\n",
      "out": "a\n"
     },
     {
      "stdin": "4\nab ba ab c\n",
      "out": "ab ba ab\nc\n"
     },
     {
      "stdin": "3\nlisten silent enlist\n",
      "out": "listen silent enlist\n"
     }
    ],
    "mustInclude": [
     "Map"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Пойыз маршрутын қалпына келтіру",
   "prompt": "<p>Жолаушының <code>n</code> билеті араласып кеткен; әр билет <code>қайдан қайда</code>. Билеттер бір үзіліссіз маршрут құрайды, әр қала ең көбі бір рет кездеседі. Маршрутты <code>A -&gt; B -&gt; C</code> түрінде басыңыз. Кеңес: <code>HashMap</code> «келесі қала» үшін, <code>HashSet</code> — бастапқы қаланы табу үшін (ол ешбір билеттің «қайда» бөлігінде жоқ). Мысал:</p><pre><code>3\nAstana Karaganda\nAlmaty Taraz\nTaraz Astana</code></pre><p>→ <code>Almaty -&gt; Taraz -&gt; Astana -&gt; Karaganda</code></p>",
   "starter": "import java.util.HashMap;\nimport java.util.HashSet;\nimport java.util.Map;\nimport java.util.Set;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> next = new HashMap<>();\n        Set<String> targets = new HashSet<>();\n        // билеттерді оқып, бастапқы қаланы табыңыз\n    }\n}\n",
   "solution": "import java.util.HashMap;\nimport java.util.HashSet;\nimport java.util.Map;\nimport java.util.Scanner;\nimport java.util.Set;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> next = new HashMap<>();\n        Set<String> targets = new HashSet<>();\n        for (int i = 0; i < n; i++) {\n            String from = sc.next();\n            String to = sc.next();\n            next.put(from, to);\n            targets.add(to);\n        }\n        String start = null;\n        for (String city : next.keySet()) {\n            if (!targets.contains(city)) start = city;\n        }\n        StringBuilder sb = new StringBuilder(start);\n        String cur = start;\n        while (next.containsKey(cur)) {\n            cur = next.get(cur);\n            sb.append(\" -> \").append(cur);\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Бастапқы қала — <code>next</code>-тің кілттерінің ішінде <code>targets</code>-та жоқ жалғыз қала.",
    "Сосын <code>while (next.containsKey(cur))</code> арқылы маршрут бойымен жүріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nAstana Karaganda\nAlmaty Taraz\nTaraz Astana\n",
      "out": "Almaty -> Taraz -> Astana -> Karaganda\n"
     },
     {
      "stdin": "1\nAktobe Oral\n",
      "out": "Aktobe -> Oral\n"
     },
     {
      "stdin": "4\nD E\nC D\nB C\nA B\n",
      "out": "A -> B -> C -> D -> E\n"
     }
    ],
    "mustInclude": [
     "HashMap"
    ]
   }
  }
 ],
 "jv-11": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Жасты тексеру",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> таңбалауыш. Әрқайсысын <code>Integer.parseInt</code> арқылы жасқа айналдырыңыз. Сан болмаса (<code>NumberFormatException</code>) <code>BAD x</code>, сан 0–120 аралығынан тыс болса <code>OUT x</code>, әйтпесе <code>OK x</code> басыңыз (<code>x</code> — таңбалауыштың өзі). Мысал: <code>3</code> / <code>25 abc 150</code> → <code>OK 25</code>, <code>BAD abc</code>, <code>OUT 150</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            int age = Integer.parseInt(t);\n            System.out.println(\"OK \" + t);\n        }\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            try {\n                int age = Integer.parseInt(t);\n                if (age < 0 || age > 120) System.out.println(\"OUT \" + t);\n                else System.out.println(\"OK \" + t);\n            } catch (NumberFormatException e) {\n                System.out.println(\"BAD \" + t);\n            }\n        }\n    }\n}\n",
   "hints": [
    "Таңбалауышты <code>sc.next()</code> арқылы жол ретінде оқыңыз, сосын <code>try</code> ішінде <code>Integer.parseInt</code>.",
    "<code>catch (NumberFormatException e)</code> блогында <code>BAD</code> басыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n25 abc 150\n",
      "out": "OK 25\nBAD abc\nOUT 150\n"
     },
     {
      "stdin": "2\n0 -1\n",
      "out": "OK 0\nOUT -1\n"
     },
     {
      "stdin": "2\n12.5 120\n",
      "out": "BAD 12.5\nOK 120\n"
     }
    ],
    "mustInclude": [
     "catch"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Әрқашан finally",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> таңбалауыш. Әрқайсысы үшін: сан болса оның квадратын (<code>long</code>), болмаса <code>ERROR x</code> басыңыз. Санау айнымалысын <code>finally</code> блогында арттырыңыз, соңында <code>Checked: n</code> басыңыз. Мысал: <code>3</code> / <code>4 x 100000</code> → <code>16</code>, <code>ERROR x</code>, <code>10000000000</code>, <code>Checked: 3</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int checked = 0;\n        // try / catch / finally\n        System.out.println(\"Checked: \" + checked);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int checked = 0;\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            try {\n                long v = Integer.parseInt(t);\n                System.out.println(v * v);\n            } catch (NumberFormatException e) {\n                System.out.println(\"ERROR \" + t);\n            } finally {\n                checked++;\n            }\n        }\n        System.out.println(\"Checked: \" + checked);\n    }\n}\n",
   "hints": [
    "<code>finally</code> қате болса да, болмаса да орындалады — санауышты сонда арттырыңыз.",
    "100000² int-ке сыймайды: <code>long v = Integer.parseInt(t);</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n4 x 100000\n",
      "out": "16\nERROR x\n10000000000\nChecked: 3\n"
     },
     {
      "stdin": "1\n-3\n",
      "out": "9\nChecked: 1\n"
     },
     {
      "stdin": "2\n1a b2\n",
      "out": "ERROR 1a\nERROR b2\nChecked: 2\n"
     }
    ],
    "mustInclude": [
     "finally"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Қауіпсіз бөлу",
   "prompt": "<p><code>static int divide(int a, int b)</code> әдісі <code>b == 0</code> болса <code>throw new IllegalArgumentException(\"Division by zero\")</code> лақтырсын, әйтпесе <code>a / b</code> қайтарсын. Кірісте <code>n</code>, сосын <code>n</code> жұп <code>a b</code>. Әр жұпқа нәтижені немесе <code>catch</code>-те ұсталған хабарламаны (<code>e.getMessage()</code>) басыңыз. Мысал: <code>2</code> / <code>10 3</code> / <code>5 0</code> → <code>3</code>, <code>Division by zero</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int divide(int a, int b) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            // divide-ты try ішінде шақырыңыз\n        }\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int divide(int a, int b) {\n        if (b == 0) throw new IllegalArgumentException(\"Division by zero\");\n        return a / b;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            try {\n                System.out.println(divide(a, b));\n            } catch (IllegalArgumentException e) {\n                System.out.println(e.getMessage());\n            }\n        }\n    }\n}\n",
   "hints": [
    "<code>throw new IllegalArgumentException(\"Division by zero\");</code> әдісті бірден тоқтатады.",
    "main-де <code>catch (IllegalArgumentException e)</code> және <code>e.getMessage()</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\n10 3\n5 0\n",
      "out": "3\nDivision by zero\n"
     },
     {
      "stdin": "1\n-7 2\n",
      "out": "-3\n"
     },
     {
      "stdin": "3\n0 0\n0 5\n9 9\n",
      "out": "Division by zero\n0\n1\n"
     }
    ],
    "mustInclude": [
     "throw new IllegalArgumentException"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Өз exception класым",
   "prompt": "<p><code>class InvalidScoreException extends Exception</code> жазыңыз. <code>static int check(int s) throws InvalidScoreException</code> балл 0–100 аралығынан тыс болса <code>\"Invalid score: \" + s</code> хабарламасымен лақтырсын. Кірісте <code>n</code>, сосын <code>n</code> бүтін балл. Қате баллдардың хабарламасын басыңыз, соңында дұрыс баллдардың қосындысын <code>Sum: s</code> түрінде. Мысал: <code>4</code> / <code>90 120 75 -5</code> → <code>Invalid score: 120</code>, <code>Invalid score: -5</code>, <code>Sum: 165</code>.</p>",
   "starter": "import java.util.Scanner;\n\n// InvalidScoreException класын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum += sc.nextInt();\n        }\n        System.out.println(\"Sum: \" + sum);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass InvalidScoreException extends Exception {\n    InvalidScoreException(String message) {\n        super(message);\n    }\n}\n\npublic class Main {\n    static int check(int s) throws InvalidScoreException {\n        if (s < 0 || s > 100) throw new InvalidScoreException(\"Invalid score: \" + s);\n        return s;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            try {\n                sum += check(sc.nextInt());\n            } catch (InvalidScoreException e) {\n                System.out.println(e.getMessage());\n            }\n        }\n        System.out.println(\"Sum: \" + sum);\n    }\n}\n",
   "hints": [
    "Exception класы: <code>InvalidScoreException(String message) { super(message); }</code>.",
    "Бұл checked exception: әдіске <code>throws InvalidScoreException</code> жазыңыз, main-де ұстаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n90 120 75 -5\n",
      "out": "Invalid score: 120\nInvalid score: -5\nSum: 165\n"
     },
     {
      "stdin": "2\n0 100\n",
      "out": "Sum: 100\n"
     },
     {
      "stdin": "1\n101\n",
      "out": "Invalid score: 101\nSum: 0\n"
     }
    ],
    "mustInclude": [
     "extends Exception",
     "throws InvalidScoreException"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Бөлшектерді оқу",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> бөлшек <code>a/b</code> түрінде (мысалы, <code>3/4</code>). Әрқайсысын <code>split(\"/\")</code> арқылы бөліп, мәнін 2 ондық таңбамен басыңыз. Бөлім 0 болса, өзіңіз <code>IllegalArgumentException</code> лақтырып, <code>ZERO</code> басыңыз; сан бұзық болса (<code>NumberFormatException</code>) <code>BAD</code>; <code>/</code> белгісі жоқ болса да <code>BAD</code>. Екі catch жазыңыз: <code>NumberFormatException</code> — <code>IllegalArgumentException</code>-нің ұрпағы, сондықтан ол бірінші тұрады. Мысал: <code>3</code> / <code>3/4 1/0 x/2</code> → <code>0.75</code>, <code>ZERO</code>, <code>BAD</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            // бөліп, тексеріп, басыңыз\n        }\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            try {\n                String[] p = t.split(\"/\");\n                if (p.length != 2) throw new NumberFormatException(\"no slash\");\n                int a = Integer.parseInt(p[0]);\n                int b = Integer.parseInt(p[1]);\n                if (b == 0) throw new IllegalArgumentException(\"zero\");\n                System.out.println(String.format(\"%.2f\", (double) a / b));\n            } catch (NumberFormatException e) {\n                System.out.println(\"BAD\");\n            } catch (IllegalArgumentException e) {\n                System.out.println(\"ZERO\");\n            }\n        }\n    }\n}\n",
   "hints": [
    "<code>t.split(\"/\")</code> екі бөлік бермесе, бұл да <code>BAD</code> — оны да exception ретінде лақтыруға болады.",
    "catch реті: алдымен <code>NumberFormatException</code>, сосын <code>IllegalArgumentException</code>. Керісінше жазсаңыз, компилятор қате береді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n3/4 1/0 x/2\n",
      "out": "0.75\nZERO\nBAD\n"
     },
     {
      "stdin": "2\n-1/3 7\n",
      "out": "-0.33\nBAD\n"
     },
     {
      "stdin": "2\n10/4 0/5\n",
      "out": "2.50\n0.00\n"
     }
    ],
    "mustInclude": [
     "catch (NumberFormatException",
     "catch (IllegalArgumentException"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Құпиясөз ережелері",
   "prompt": "<p><code>class WeakPasswordException extends Exception</code> жазыңыз. <code>static void validate(String p) throws WeakPasswordException</code> ережелерді ретімен тексерсін: ұзындығы 8-ден аз — <code>too short</code>; цифр жоқ — <code>no digit</code>; үлкен латын әрпі жоқ — <code>no uppercase</code>. Кірісте <code>n</code>, сосын <code>n</code> құпиясөз. Әрқайсысына <code>OK</code> немесе <code>WEAK: себеп</code> басыңыз. Мысал: <code>Astana2026</code> → <code>OK</code>, <code>qwerty</code> → <code>WEAK: too short</code>.</p>",
   "starter": "import java.util.Scanner;\n\n// WeakPasswordException класын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String p = sc.next();\n            System.out.println(\"OK\");\n        }\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass WeakPasswordException extends Exception {\n    WeakPasswordException(String message) {\n        super(message);\n    }\n}\n\npublic class Main {\n    static void validate(String p) throws WeakPasswordException {\n        if (p.length() < 8) throw new WeakPasswordException(\"too short\");\n        boolean digit = false, upper = false;\n        for (char c : p.toCharArray()) {\n            if (c >= '0' && c <= '9') digit = true;\n            if (c >= 'A' && c <= 'Z') upper = true;\n        }\n        if (!digit) throw new WeakPasswordException(\"no digit\");\n        if (!upper) throw new WeakPasswordException(\"no uppercase\");\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            try {\n                validate(sc.next());\n                System.out.println(\"OK\");\n            } catch (WeakPasswordException e) {\n                System.out.println(\"WEAK: \" + e.getMessage());\n            }\n        }\n    }\n}\n",
   "hints": [
    "Цифр: <code>c &gt;= '0' &amp;&amp; c &lt;= '9'</code>, үлкен әріп: <code>c &gt;= 'A' &amp;&amp; c &lt;= 'Z'</code>.",
    "<code>validate</code> сәтті аяқталса ғана келесі жолдағы <code>OK</code> басылады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\nAstana2026\nqwerty\nalmaty2026\nShymkentKZ\n",
      "out": "OK\nWEAK: too short\nWEAK: no uppercase\nWEAK: no digit\n"
     },
     {
      "stdin": "1\nA1\n",
      "out": "WEAK: too short\n"
     },
     {
      "stdin": "1\n12345678A\n",
      "out": "OK\n"
     }
    ],
    "mustInclude": [
     "extends Exception"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Банкомат",
   "prompt": "<p><code>class AtmException extends Exception</code> жазыңыз. <code>Atm</code> класында <code>private long balance</code> және бүгін алынған сома; <code>void withdraw(long amount) throws AtmException</code> ретімен тексерсін: сома оң және 1000-ға еселі болмаса — <code>Amount must be a positive multiple of 1000</code>; балансқа жетпесе — <code>Insufficient funds</code>; бүгінгі жалпы сома 200000-нан асып кетсе — <code>Daily limit exceeded</code>. Кірісте бастапқы баланс және <code>n</code>, сосын <code>n</code> таңбалауыш. Сан болмаса <code>Bad input: x</code>. Әр сәтті алуға <code>OK amount</code>, қатеге хабарламаны басыңыз, соңында <code>BALANCE b</code>. Мысал:</p><pre><code>300000 5\n50000 abc 1500 160000 100000</code></pre><p>→</p><pre><code>OK 50000\nBad input: abc\nAmount must be a positive multiple of 1000\nDaily limit exceeded\nOK 100000\nBALANCE 150000</code></pre>",
   "starter": "import java.util.Scanner;\n\n// AtmException класын жазыңыз\n\nclass Atm {\n    private long balance;\n    private long today = 0;\n\n    Atm(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    void withdraw(long amount) {\n        balance -= amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Atm atm = new Atm(sc.nextLong());\n        int n = sc.nextInt();\n        // таңбалауыштарды өңдеңіз\n        System.out.println(\"BALANCE \" + atm.getBalance());\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\nclass AtmException extends Exception {\n    AtmException(String message) {\n        super(message);\n    }\n}\n\nclass Atm {\n    private long balance;\n    private long today = 0;\n\n    Atm(long balance) {\n        this.balance = balance;\n    }\n\n    long getBalance() { return balance; }\n\n    void withdraw(long amount) throws AtmException {\n        if (amount <= 0 || amount % 1000 != 0)\n            throw new AtmException(\"Amount must be a positive multiple of 1000\");\n        if (amount > balance) throw new AtmException(\"Insufficient funds\");\n        if (today + amount > 200000) throw new AtmException(\"Daily limit exceeded\");\n        balance -= amount;\n        today += amount;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Atm atm = new Atm(sc.nextLong());\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String t = sc.next();\n            try {\n                long amount = Long.parseLong(t);\n                atm.withdraw(amount);\n                System.out.println(\"OK \" + amount);\n            } catch (NumberFormatException e) {\n                System.out.println(\"Bad input: \" + t);\n            } catch (AtmException e) {\n                System.out.println(e.getMessage());\n            }\n        }\n        System.out.println(\"BALANCE \" + atm.getBalance());\n    }\n}\n",
   "hints": [
    "Тексерулер ретімен: алдымен сома дұрыс па, сосын баланс, ең соңында күндік лимит. Барлығы өтсе ғана өрістерді өзгертіңіз.",
    "Екі түрлі қате: <code>Long.parseLong</code>-тан <code>NumberFormatException</code> және өз <code>AtmException</code>-ыңыз — екі catch."
   ],
   "check": {
    "cases": [
     {
      "stdin": "300000 5\n50000 abc 1500 160000 100000\n",
      "out": "OK 50000\nBad input: abc\nAmount must be a positive multiple of 1000\nDaily limit exceeded\nOK 100000\nBALANCE 150000\n"
     },
     {
      "stdin": "5000 2\n10000 -1000\n",
      "out": "Insufficient funds\nAmount must be a positive multiple of 1000\nBALANCE 5000\n"
     },
     {
      "stdin": "1000000 3\n200000 1000 0\n",
      "out": "OK 200000\nDaily limit exceeded\nAmount must be a positive multiple of 1000\nBALANCE 800000\n"
     }
    ],
    "mustInclude": [
     "extends Exception",
     "throws AtmException"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Баптау файлын тексеру",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> жол <code>key=value</code> (бос орынсыз). <code>class ConfigException extends Exception</code> жазып, әр жолды тексеретін әдіс қатеде оны лақтырсын: <code>=</code> жоқ — <code>Line i: missing =</code>; кілт бұрын кездескен — <code>Line i: duplicate key</code>; кілт <code>port</code> болса, мәні 1–65535 аралығындағы бүтін сан болмаса — <code>Line i: bad port</code> (<code>i</code> — жол нөмірі, 1-ден). Қателерді басып, дұрыс жолдарды <code>TreeMap</code>-ке сақтаңыз да, соңында кілт бойынша <code>key = value</code> түрінде басыңыз. Мысал:</p><pre><code>4\nport=80a\nhost=localhost\ndebug\nhost=0.0.0.0</code></pre><p>→</p><pre><code>Line 1: bad port\nLine 3: missing =\nLine 4: duplicate key\nhost = localhost</code></pre>",
   "starter": "import java.util.Map;\nimport java.util.TreeMap;\nimport java.util.Scanner;\n\n// ConfigException класын жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> cfg = new TreeMap<>();\n        // жолдарды тексеріңіз\n    }\n}\n",
   "solution": "import java.util.Map;\nimport java.util.Scanner;\nimport java.util.TreeMap;\n\nclass ConfigException extends Exception {\n    ConfigException(String message) {\n        super(message);\n    }\n}\n\npublic class Main {\n    static void parse(String line, int i, Map<String, String> cfg) throws ConfigException {\n        int eq = line.indexOf(\"=\");\n        if (eq < 0) throw new ConfigException(\"Line \" + i + \": missing =\");\n        String key = line.substring(0, eq);\n        String value = line.substring(eq + 1);\n        if (cfg.containsKey(key)) throw new ConfigException(\"Line \" + i + \": duplicate key\");\n        if (key.equals(\"port\")) {\n            int p;\n            try {\n                p = Integer.parseInt(value);\n            } catch (NumberFormatException e) {\n                throw new ConfigException(\"Line \" + i + \": bad port\");\n            }\n            if (p < 1 || p > 65535) throw new ConfigException(\"Line \" + i + \": bad port\");\n        }\n        cfg.put(key, value);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Map<String, String> cfg = new TreeMap<>();\n        for (int i = 1; i <= n; i++) {\n            try {\n                parse(sc.next(), i, cfg);\n            } catch (ConfigException e) {\n                System.out.println(e.getMessage());\n            }\n        }\n        for (Map.Entry<String, String> e : cfg.entrySet()) {\n            System.out.println(e.getKey() + \" = \" + e.getValue());\n        }\n    }\n}\n",
   "hints": [
    "<code>indexOf(\"=\")</code> арқылы бөліңіз: кілт — <code>substring(0, eq)</code>, мән — <code>substring(eq + 1)</code>.",
    "<code>parseInt</code>-тің <code>NumberFormatException</code>-ын ұстап, оның орнына өз <code>ConfigException</code>-ыңызды лақтырыңыз. Қате болған жол map-қа түспейді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\nport=80a\nhost=localhost\ndebug\nhost=0.0.0.0\n",
      "out": "Line 1: bad port\nLine 3: missing =\nLine 4: duplicate key\nhost = localhost\n"
     },
     {
      "stdin": "3\nport=8080\nmode=prod\nport=99999\n",
      "out": "Line 3: duplicate key\nmode = prod\nport = 8080\n"
     },
     {
      "stdin": "2\nport=0\nport=65535\n",
      "out": "Line 1: bad port\nport = 65535\n"
     },
     {
      "stdin": "2\nmode=a=b\nport=443\n",
      "out": "mode = a=b\nport = 443\n"
     }
    ],
    "mustInclude": [
     "extends Exception",
     "TreeMap"
    ]
   }
  }
 ],
 "jv-12": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Generic Pair",
   "prompt": "<p>Сабақтағыдай <code>class Pair&lt;A, B&gt;</code> жазыңыз (<code>getFirst()</code>, <code>getSecond()</code>). Кірісте <code>n</code>, сосын <code>n</code> жол <code>қала халқы</code>. Жұптарды <code>List&lt;Pair&lt;String, Integer&gt;&gt;</code>-ке жинап, халқы ең көп қаланы (тең болса — біріншісін) <code>қала халқы</code> түрінде басыңыз. Мысал: <code>3</code> / <code>Shymkent 1200000</code> / <code>Almaty 2200000</code> / <code>Astana 1400000</code> → <code>Almaty 2200000</code>.</p>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\n// class Pair<A, B> жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // Pair тізімін жинаңыз\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\nclass Pair<A, B> {\n    private final A first;\n    private final B second;\n    Pair(A first, B second) { this.first = first; this.second = second; }\n    A getFirst() { return first; }\n    B getSecond() { return second; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Pair<String, Integer>> list = new ArrayList<>();\n        for (int i = 0; i < n; i++) {\n            String city = sc.next();\n            int pop = sc.nextInt();\n            list.add(new Pair<>(city, pop));\n        }\n        Pair<String, Integer> best = list.get(0);\n        for (Pair<String, Integer> p : list) {\n            if (p.getSecond() > best.getSecond()) best = p;\n        }\n        System.out.println(best.getFirst() + \" \" + best.getSecond());\n    }\n}\n",
   "hints": [
    "Generic класс: <code>class Pair&lt;A, B&gt; { private final A first; ... }</code>.",
    "<code>Integer</code>-ді <code>&gt;</code> арқылы салыстыруға болады (unboxing), бірақ <code>==</code> арқылы емес."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nShymkent 1200000\nAlmaty 2200000\nAstana 1400000\n",
      "out": "Almaty 2200000\n"
     },
     {
      "stdin": "1\nTaraz 360000\n",
      "out": "Taraz 360000\n"
     },
     {
      "stdin": "2\nA 5\nB 5\n",
      "out": "A 5\n"
     }
    ],
    "mustInclude": [
     "class Pair<"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Stream: шектен жоғары",
   "prompt": "<p>Кірісте <code>n k</code>, сосын <code>n</code> бүтін сан (тапсырыс сомалары). <code>Arrays.stream(...).filter(...).count()</code> арқылы <code>k</code>-дан қатаң үлкен сомалардың санын басыңыз. Мысал: <code>5 10000</code> / <code>1200 45000 800 150000 10000</code> → <code>2</code>.</p>",
   "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        long cnt = 0;   // stream арқылы есептеңіз\n        System.out.println(cnt);\n    }\n}\n",
   "solution": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        long cnt = Arrays.stream(a).filter(x -> x > k).count();\n        System.out.println(cnt);\n    }\n}\n",
   "hints": [
    "Lambda сыртқы айнымалыны (<code>k</code>) пайдалана алады, егер ол кейін өзгермесе.",
    "<code>count()</code> <code>long</code> қайтарады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 10000\n1200 45000 800 150000 10000\n",
      "out": "2\n"
     },
     {
      "stdin": "3 0\n-1 0 1\n",
      "out": "1\n"
     },
     {
      "stdin": "1 5\n5\n",
      "out": "0\n"
     }
    ],
    "mustInclude": [
     "stream",
     "filter"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Stream: тақ квадраттар",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> бүтін сан (|x| ≤ 1000). Stream арқылы <b>тақ</b> сандарды алып, әрқайсысын квадраттап (<code>map</code>), қосындысын (<code>sum</code>) басыңыз. Мысал: <code>5</code> / <code>1 2 3 4 -5</code> → <code>35</code> (1 + 9 + 25).</p>",
   "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int s = 0;   // stream арқылы есептеңіз\n        System.out.println(s);\n    }\n}\n",
   "solution": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int s = Arrays.stream(a).filter(x -> x % 2 != 0).map(x -> x * x).sum();\n        System.out.println(s);\n    }\n}\n",
   "hints": [
    "Теріс тақ сан үшін <code>x % 2</code> −1 береді, сондықтан <code>x % 2 != 0</code> тексеріңіз.",
    "Конвейер: <code>filter(...)</code> → <code>map(x -&gt; x * x)</code> → <code>sum()</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n1 2 3 4 -5\n",
      "out": "35\n"
     },
     {
      "stdin": "2\n2 4\n",
      "out": "0\n"
     },
     {
      "stdin": "3\n-1 -1 7\n",
      "out": "51\n"
     }
    ],
    "mustInclude": [
     "stream",
     "map("
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Generic maxOf",
   "prompt": "<p>Сабақтағы generic әдісті жазыңыз: <code>static &lt;T extends Comparable&lt;T&gt;&gt; T maxOf(List&lt;T&gt; xs)</code>. Кірісте <code>n</code> және <code>n</code> бүтін сан, сосын <code>m</code> және <code>m</code> сөз. Бір ғана <code>maxOf</code>-пен екі жол басыңыз: ең үлкен сан және әліпби бойынша ең соңғы сөз. Мысал: <code>3</code> / <code>5 -2 9</code> / <code>3</code> / <code>Oral Astana Taraz</code> → <code>9</code>, <code>Taraz</code>.</p>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        // maxOf әдісін жазып, шақырыңыз\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    static <T extends Comparable<T>> T maxOf(List<T> xs) {\n        T best = xs.get(0);\n        for (T x : xs) if (x.compareTo(best) > 0) best = x;\n        return best;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        System.out.println(maxOf(nums));\n        System.out.println(maxOf(words));\n    }\n}\n",
   "hints": [
    "<code>Integer</code> да, <code>String</code> да <code>Comparable</code> — бір әдіс екеуіне де жарайды.",
    "Салыстыру: <code>x.compareTo(best) &gt; 0</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n5 -2 9\n3\nOral Astana Taraz\n",
      "out": "9\nTaraz\n"
     },
     {
      "stdin": "1\n-7\n1\nx\n",
      "out": "-7\nx\n"
     },
     {
      "stdin": "2\n1000 999\n3\nb a B\n",
      "out": "1000\nb\n"
     }
    ],
    "mustInclude": [
     "<T extends Comparable<T>>"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ұзындығы бойынша сұрыптау",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> сөз. Оларды <code>ArrayList</code>-ке жинап, <code>list.sort</code> ішіне lambda comparator беріп сұрыптаңыз: алдымен ұзындығы бойынша өсу ретімен, ұзындығы тең болса әліпби бойынша. Бір жолға бос орынмен басыңыз. Мысал: <code>5</code> / <code>Shymkent Oral Aktau Taraz Ural</code> → <code>Oral Ural Aktau Taraz Shymkent</code>.</p>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < n; i++) words.add(sc.next());\n        // words.sort((a, b) -> ...);\n        System.out.println(words);\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < n; i++) words.add(sc.next());\n        words.sort((a, b) -> {\n            if (a.length() != b.length()) return a.length() - b.length();\n            return a.compareTo(b);\n        });\n        StringBuilder sb = new StringBuilder();\n        for (String w : words) {\n            if (sb.length() > 0) sb.append(' ');\n            sb.append(w);\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Comparator теріс сан қайтарса, <code>a</code> алдында тұрады: <code>a.length() - b.length()</code>.",
    "Ұзындық тең болса, <code>a.compareTo(b)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\nShymkent Oral Aktau Taraz Ural\n",
      "out": "Oral Ural Aktau Taraz Shymkent\n"
     },
     {
      "stdin": "1\nx\n",
      "out": "x\n"
     },
     {
      "stdin": "4\nbb a ab c\n",
      "out": "a c ab bb\n"
     }
    ],
    "mustInclude": [
     "->"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Predicate сүзгісі",
   "prompt": "<p>Generic әдіс жазыңыз: <code>static &lt;T&gt; List&lt;T&gt; keep(List&lt;T&gt; xs, Predicate&lt;T&gt; p)</code> — шартты қанағаттандыратын элементтерді қайтарады (<code>p.test(x)</code>). Кірісте <code>n</code> және <code>n</code> бүтін сан, сосын <code>m</code> және <code>m</code> сөз. Бірінші жолға жұп сандарды, екінші жолға <code>A</code> әрпінен басталатын сөздерді (кіріс ретімен, бос орынмен) басыңыз; бос болса <code>NONE</code>. Мысал: <code>4</code> / <code>3 8 -2 5</code> / <code>3</code> / <code>Almaty Oral Aktobe</code> → <code>8 -2</code>, <code>Almaty Aktobe</code>.</p>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.function.Predicate;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        // keep әдісін жазып, екі рет шақырыңыз\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\nimport java.util.function.Predicate;\n\npublic class Main {\n    static <T> List<T> keep(List<T> xs, Predicate<T> p) {\n        List<T> out = new ArrayList<>();\n        for (T x : xs) if (p.test(x)) out.add(x);\n        return out;\n    }\n\n    static <T> String join(List<T> xs) {\n        if (xs.isEmpty()) return \"NONE\";\n        StringBuilder sb = new StringBuilder();\n        for (T x : xs) {\n            if (sb.length() > 0) sb.append(' ');\n            sb.append(x);\n        }\n        return sb.toString();\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<Integer> nums = new ArrayList<>();\n        for (int i = 0; i < n; i++) nums.add(sc.nextInt());\n        int m = sc.nextInt();\n        List<String> words = new ArrayList<>();\n        for (int i = 0; i < m; i++) words.add(sc.next());\n        System.out.println(join(keep(nums, x -> x % 2 == 0)));\n        System.out.println(join(keep(words, w -> w.startsWith(\"A\"))));\n    }\n}\n",
   "hints": [
    "<code>import java.util.function.Predicate;</code>, ал шақыру: <code>keep(nums, x -&gt; x % 2 == 0)</code>.",
    "Сөз үшін: <code>w -&gt; w.startsWith(\"A\")</code> немесе <code>w.charAt(0) == 'A'</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n3 8 -2 5\n3\nAlmaty Oral Aktobe\n",
      "out": "8 -2\nAlmaty Aktobe\n"
     },
     {
      "stdin": "1\n1\n1\nastana\n",
      "out": "NONE\nNONE\n"
     },
     {
      "stdin": "2\n0 2\n2\nA B\n",
      "out": "0 2\nA\n"
     }
    ],
    "mustInclude": [
     "Predicate<T>"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Stream: үздік студенттер",
   "prompt": "<p><code>Student</code> класы (аты, балл). Кірісте <code>n t</code>, сосын <code>n</code> жол <code>аты балл</code>. <code>students.stream()</code> арқылы баллы <code>t</code>-дан кем емес студенттерді сүзіп (<code>filter</code>), аттарын алып (<code>map</code>), әліпби бойынша сұрыптап (<code>sorted</code>), тізімге жинаңыз (<code>collect(Collectors.toList())</code>). Бірінші жолға олардың санын, екінші жолға аттарын <code>, </code> арқылы басыңыз; ешкім болмаса екінші жолда <code>NONE</code>. Мысал: <code>4 85</code> / <code>Timur 90</code> / <code>Aliya 85</code> / <code>Bolat 70</code> / <code>Dana 99</code> →</p><pre><code>3\nAliya, Dana, Timur</code></pre>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.stream.Collectors;\nimport java.util.Scanner;\n\nclass Student {\n    String name;\n    int score;\n    Student(String name, int score) { this.name = name; this.score = score; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int t = sc.nextInt();\n        List<Student> students = new ArrayList<>();\n        for (int i = 0; i < n; i++) students.add(new Student(sc.next(), sc.nextInt()));\n        // stream конвейерін жазыңыз\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\nimport java.util.stream.Collectors;\n\nclass Student {\n    String name;\n    int score;\n    Student(String name, int score) { this.name = name; this.score = score; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int t = sc.nextInt();\n        List<Student> students = new ArrayList<>();\n        for (int i = 0; i < n; i++) students.add(new Student(sc.next(), sc.nextInt()));\n        List<String> names = students.stream()\n                .filter(s -> s.score >= t)\n                .map(s -> s.name)\n                .sorted()\n                .collect(Collectors.toList());\n        System.out.println(names.size());\n        if (names.isEmpty()) {\n            System.out.println(\"NONE\");\n        } else {\n            StringBuilder sb = new StringBuilder();\n            for (String s : names) {\n                if (sb.length() > 0) sb.append(\", \");\n                sb.append(s);\n            }\n            System.out.println(sb.toString());\n        }\n    }\n}\n",
   "hints": [
    "<code>import java.util.stream.Collectors;</code> қажет.",
    "Конвейер: <code>.filter(s -&gt; s.score &gt;= t).map(s -&gt; s.name).sorted().collect(Collectors.toList())</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4 85\nTimur 90\nAliya 85\nBolat 70\nDana 99\n",
      "out": "3\nAliya, Dana, Timur\n"
     },
     {
      "stdin": "2 100\nA 99\nB 50\n",
      "out": "0\nNONE\n"
     },
     {
      "stdin": "3 0\nc 0\nb 1\na 2\n",
      "out": "3\na, b, c\n"
     }
    ],
    "mustInclude": [
     "stream()",
     "filter",
     "collect"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Generic стек",
   "prompt": "<p><code>class Stack&lt;T&gt;</code> generic класын <code>ArrayList&lt;T&gt;</code> негізінде жазыңыз: <code>push(T x)</code>, <code>T pop()</code>, <code>T peek()</code>, <code>int size()</code>, <code>boolean isEmpty()</code>. Кірісте <code>q</code>, сосын <code>q</code> команда: <code>PUSH сөз</code>, <code>POP</code>, <code>PEEK</code>, <code>SIZE</code>. <code>POP</code> алынған элементті, <code>PEEK</code> үстіңгі элементті, <code>SIZE</code> өлшемін басады; стек бос болса <code>POP</code> мен <code>PEEK</code> <code>EMPTY</code> басады. Мысал:</p><pre><code>6\nPUSH Almaty\nPUSH Astana\nPEEK\nPOP\nPOP\nPOP</code></pre><p>→ <code>Astana</code>, <code>Astana</code>, <code>Almaty</code>, <code>EMPTY</code>.</p>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\n// class Stack<T> жазыңыз\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        // Stack<String> жасап, командаларды өңдеңіз\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\nclass Stack<T> {\n    private final List<T> items = new ArrayList<>();\n\n    void push(T x) { items.add(x); }\n\n    T pop() { return items.remove(items.size() - 1); }\n\n    T peek() { return items.get(items.size() - 1); }\n\n    int size() { return items.size(); }\n\n    boolean isEmpty() { return items.isEmpty(); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        Stack<String> st = new Stack<>();\n        for (int i = 0; i < q; i++) {\n            String cmd = sc.next();\n            switch (cmd) {\n                case \"PUSH\" -> st.push(sc.next());\n                case \"POP\" -> System.out.println(st.isEmpty() ? \"EMPTY\" : st.pop());\n                case \"PEEK\" -> System.out.println(st.isEmpty() ? \"EMPTY\" : st.peek());\n                default -> System.out.println(st.size());\n            }\n        }\n    }\n}\n",
   "hints": [
    "Стектің үсті — тізімнің соңы: <code>items.remove(items.size() - 1)</code>.",
    "Бос стекті алдымен <code>isEmpty()</code> арқылы тексеріңіз, тек сосын <code>pop()</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\nPUSH Almaty\nPUSH Astana\nPEEK\nPOP\nPOP\nPOP\n",
      "out": "Astana\nAstana\nAlmaty\nEMPTY\n"
     },
     {
      "stdin": "3\nSIZE\nPEEK\nPUSH x\n",
      "out": "0\nEMPTY\n"
     },
     {
      "stdin": "5\nPUSH a\nPUSH b\nPUSH c\nSIZE\nPOP\n",
      "out": "3\nc\n"
     }
    ],
    "mustInclude": [
     "class Stack<T>"
    ]
   }
  }
 ],
 "jv-13": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Факториал рекурсиямен",
   "prompt": "<p><code>static long factorial(int n)</code> әдісін рекурсия арқылы жазыңыз (базалық жағдай: <code>n &lt;= 1</code> → 1). Кірісте <code>n</code> (0 ≤ n ≤ 20); <code>n!</code> мәнін басыңыз. Мысал: <code>5</code> → <code>120</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static long factorial(int n) {\n        return n;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(factorial(sc.nextInt()));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(factorial(sc.nextInt()));\n    }\n}\n",
   "hints": [
    "Базалық жағдай: <code>if (n &lt;= 1) return 1;</code>.",
    "Рекурсивті қадам: <code>return n * factorial(n - 1);</code>. 20! long-қа әрең сыяды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n",
      "out": "120\n"
     },
     {
      "stdin": "0\n",
      "out": "1\n"
     },
     {
      "stdin": "1\n",
      "out": "1\n"
     },
     {
      "stdin": "20\n",
      "out": "2432902008176640000\n"
     }
    ],
    "mustInclude": [
     "factorial(n - 1)"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Цифрлар қосындысы рекурсиямен",
   "prompt": "<p><code>static int digitSum(long n)</code> әдісін <b>циклсіз</b>, рекурсиямен жазыңыз: <code>n &lt; 10</code> болса <code>n</code>, әйтпесе соңғы цифр + қалған санның цифрлар қосындысы. Кірісте теріс емес бүтін сан (≤ 10¹⁸, <code>nextLong</code>). Мысал: <code>98765</code> → <code>35</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static int digitSum(long n) {\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(digitSum(sc.nextLong()));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int digitSum(long n) {\n        if (n < 10) return (int) n;\n        return (int) (n % 10) + digitSum(n / 10);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(digitSum(sc.nextLong()));\n    }\n}\n",
   "hints": [
    "Базалық жағдай: бір цифрлы сан.",
    "Рекурсивті қадам: <code>(int) (n % 10) + digitSum(n / 10)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "98765\n",
      "out": "35\n"
     },
     {
      "stdin": "0\n",
      "out": "0\n"
     },
     {
      "stdin": "7\n",
      "out": "7\n"
     },
     {
      "stdin": "1000000000000000000\n",
      "out": "1\n"
     },
     {
      "stdin": "999999999999999999\n",
      "out": "162\n"
     }
    ],
    "mustInclude": [
     "digitSum(n / 10)"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Жолдағы сөз саны",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> жол; әр жолда бір-бір бос орынмен бөлінген бірнеше сөз бар (жол бос емес). Әр жолдағы сөз санын бөлек жолға басыңыз. <code>nextInt()</code>-тен кейінгі <code>nextLine()</code> қақпанын ұмытпаңыз. Мысал:</p><pre><code>2\nAlmaty Astana Shymkent\nTaraz</code></pre><p>→ <code>3</code>, <code>1</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 0; i < n; i++) {\n            String line = sc.nextLine();\n            System.out.println(line.split(\" \").length);\n        }\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        sc.nextLine();\n        for (int i = 0; i < n; i++) {\n            String line = sc.nextLine();\n            System.out.println(line.split(\" \").length);\n        }\n    }\n}\n",
   "hints": [
    "<code>nextInt()</code>-тен кейін курсор бірінші жолдың соңында тұр — бір «бос» <code>sc.nextLine();</code> шақырыңыз.",
    "Сөз саны: <code>line.split(\" \").length</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\nAlmaty Astana Shymkent\nTaraz\n",
      "out": "3\n1\n"
     },
     {
      "stdin": "1\na b c d e\n",
      "out": "5\n"
     },
     {
      "stdin": "3\nx\ny z\nq w e\n",
      "out": "1\n2\n3\n"
     }
    ],
    "mustInclude": [
     "nextLine"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Фибоначчи мемоизациямен",
   "prompt": "<p><code>static long fib(int n)</code> рекурсивті әдісін <code>long[] memo</code> массивімен жазыңыз (<code>fib(0) = 0</code>, <code>fib(1) = 1</code>). Кірісте <code>n</code> (0 ≤ n ≤ 90). <code>fib(n)</code> басыңыз. Мемоизациясыз n = 90 үшін бағдарлама ешқашан аяқталмайды. Мысал: <code>50</code> → <code>12586269025</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static long[] memo = new long[91];\n\n    static long fib(int n) {\n        if (n < 2) return n;\n        return fib(n - 1) + fib(n - 2);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(fib(sc.nextInt()));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static long[] memo = new long[91];\n\n    static long fib(int n) {\n        if (n < 2) return n;\n        if (memo[n] != 0) return memo[n];\n        memo[n] = fib(n - 1) + fib(n - 2);\n        return memo[n];\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(fib(sc.nextInt()));\n    }\n}\n",
   "hints": [
    "Есептелген мәнді <code>memo[n]</code>-ге сақтаңыз; 0 әлі есептелмегенін білдіреді (n ≥ 2 үшін fib(n) &gt; 0).",
    "Әдістің басында: <code>if (memo[n] != 0) return memo[n];</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "50\n",
      "out": "12586269025\n"
     },
     {
      "stdin": "0\n",
      "out": "0\n"
     },
     {
      "stdin": "1\n",
      "out": "1\n"
     },
     {
      "stdin": "90\n",
      "out": "2880067194370816120\n"
     }
    ],
    "mustInclude": [
     "memo"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ханой мұнарасы",
   "prompt": "<p><code>n</code> дискіні 1-қазықтан 3-қазыққа көшіріңіз (үлкен диск кішісінің үстіне қойылмайды). <code>static void hanoi(int n, int from, int to, int via)</code> рекурсиясымен әр жүрісті <code>from -&gt; to</code> түрінде, соңында <code>Moves: k</code> басыңыз. Кірісте <code>n</code> (1 ≤ n ≤ 10). Мысал: <code>2</code> →</p><pre><code>1 -&gt; 2\n1 -&gt; 3\n2 -&gt; 3\nMoves: 3</code></pre>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    static void hanoi(int n, int from, int to, int via) {\n        // рекурсия\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        hanoi(n, 1, 3, 2);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static StringBuilder out = new StringBuilder();\n    static int moves = 0;\n\n    static void hanoi(int n, int from, int to, int via) {\n        if (n == 0) return;\n        hanoi(n - 1, from, via, to);\n        out.append(from).append(\" -> \").append(to).append('\\n');\n        moves++;\n        hanoi(n - 1, via, to, from);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        hanoi(sc.nextInt(), 1, 3, 2);\n        out.append(\"Moves: \").append(moves);\n        System.out.println(out.toString());\n    }\n}\n",
   "hints": [
    "n дискіні көшіру: жоғарғы n−1 дискіні көмекші қазыққа, ең үлкенін мақсатқа, сосын n−1 дискіні оның үстіне.",
    "Жүрістер көп (2ⁿ − 1), шығысты <code>StringBuilder</code>-де жинаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\n",
      "out": "1 -> 2\n1 -> 3\n2 -> 3\nMoves: 3\n"
     },
     {
      "stdin": "1\n",
      "out": "1 -> 3\nMoves: 1\n"
     },
     {
      "stdin": "3\n",
      "out": "1 -> 3\n1 -> 2\n3 -> 2\n1 -> 3\n2 -> 1\n2 -> 3\n1 -> 3\nMoves: 7\n"
     },
     {
      "stdin": "8\n",
      "out": "1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\nMoves: 255\n"
     }
    ],
    "mustInclude": [
     "hanoi(n - 1"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Қосындысы берілген ішкі жиындар",
   "prompt": "<p>Кірісте алдымен мақсатты сома <code>target</code>, сосын белгісіз мөлшерде бүтін сан (ең көбі 18, бірнеше жолда болуы мүмкін) кіріс біткенше. Сандарды <code>hasNextInt()</code> арқылы оқыңыз. Қосындысы <code>target</code>-ке тең ішкі жиындардың (бос емес, әр элемент бір рет таңдалады; позициялары әртүрлі болса, бөлек саналады) санын рекурсиямен табыңыз: әр элементті «аламыз» не «алмаймыз». Мысал: <code>5</code> / <code>1 2 3 4 5</code> → <code>3</code> ({5}, {1, 4}, {2, 3}).</p>",
   "starter": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int target = sc.nextInt();\n        List<Integer> a = new ArrayList<>();\n        // hasNextInt арқылы оқыңыз, сосын рекурсия\n    }\n}\n",
   "solution": "import java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\n\npublic class Main {\n    static List<Integer> a = new ArrayList<>();\n\n    static int count(int i, int rest, boolean taken) {\n        if (i == a.size()) return (rest == 0 && taken) ? 1 : 0;\n        return count(i + 1, rest - a.get(i), true) + count(i + 1, rest, taken);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int target = sc.nextInt();\n        while (sc.hasNextInt()) a.add(sc.nextInt());\n        System.out.println(count(0, target, false));\n    }\n}\n",
   "hints": [
    "Сандарды <code>while (sc.hasNextInt()) a.add(sc.nextInt());</code> арқылы жинаңыз.",
    "Рекурсия <code>count(i, rest)</code>: <code>i</code>-элементті алу — <code>count(i + 1, rest - a[i])</code>, алмау — <code>count(i + 1, rest)</code>. Бос жиын саналмасын."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n1 2 3 4 5\n",
      "out": "3\n"
     },
     {
      "stdin": "0\n1 -1 2\n",
      "out": "1\n"
     },
     {
      "stdin": "100\n1 2\n",
      "out": "0\n"
     },
     {
      "stdin": "3\n1 1 1\n1\n",
      "out": "4\n"
     },
     {
      "stdin": "0\n0\n",
      "out": "1\n"
     }
    ],
    "mustInclude": [
     "hasNextInt"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Әріптерді алмастыру",
   "prompt": "<p>Кірісте әріптері қайталанбайтын бір сөз (ұзындығы 1–7). Оның әріптерінің барлық алмастыруларын (permutation) лексикографиялық ретпен, әрқайсысын бөлек жолға басыңыз. Backtracking: әріптерді алдымен сұрыптап, <code>boolean[] used</code> массивімен әр позицияға әлі қолданылмаған әріпті қойыңыз. Мысал: <code>bca</code> → <code>abc acb bac bca cab cba</code> (әрқайсысы бөлек жолда).</p>",
   "starter": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        char[] cs = sc.next().toCharArray();\n        Arrays.sort(cs);\n        // backtracking\n    }\n}\n",
   "solution": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    static char[] cs;\n    static boolean[] used;\n    static StringBuilder out = new StringBuilder();\n\n    static void gen(StringBuilder cur) {\n        if (cur.length() == cs.length) {\n            out.append(cur).append('\\n');\n            return;\n        }\n        for (int i = 0; i < cs.length; i++) {\n            if (used[i]) continue;\n            used[i] = true;\n            cur.append(cs[i]);\n            gen(cur);\n            cur.deleteCharAt(cur.length() - 1);\n            used[i] = false;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        cs = sc.next().toCharArray();\n        Arrays.sort(cs);\n        used = new boolean[cs.length];\n        gen(new StringBuilder());\n        System.out.print(out);\n    }\n}\n",
   "hints": [
    "Алдымен <code>Arrays.sort(cs)</code> — сонда алмастырулар өзі лексикографиялық ретпен шығады.",
    "Таңдау → <code>gen(...)</code> → кері қайтару: <code>deleteCharAt</code> және <code>used[i] = false</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "bca\n",
      "out": "abc\nacb\nbac\nbca\ncab\ncba\n"
     },
     {
      "stdin": "z\n",
      "out": "z\n"
     },
     {
      "stdin": "ba\n",
      "out": "ab\nba\n"
     },
     {
      "stdin": "dcfeab\n",
      "out": "abcdef\nabcdfe\nabcedf\nabcefd\nabcfde\nabcfed\nabdcef\nabdcfe\nabdecf\nabdefc\nabdfce\nabdfec\nabecdf\nabecfd\nabedcf\nabedfc\nabefcd\nabefdc\nabfcde\nabfced\nabfdce\nabfdec\nabfecd\nabfedc\nacbdef\nacbdfe\nacbedf\nacbefd\nacbfde\nacbfed\nacdbef\nacdbfe\nacdebf\nacdefb\nacdfbe\nacdfeb\nacebdf\nacebfd\nacedbf\nacedfb\nacefbd\nacefdb\nacfbde\nacfbed\nacfdbe\nacfdeb\nacfebd\nacfedb\nadbcef\nadbcfe\nadbecf\nadbefc\nadbfce\nadbfec\nadcbef\nadcbfe\nadcebf\nadcefb\nadcfbe\nadcfeb\nadebcf\nadebfc\nadecbf\nadecfb\nadefbc\nadefcb\nadfbce\nadfbec\nadfcbe\nadfceb\nadfebc\nadfecb\naebcdf\naebcfd\naebdcf\naebdfc\naebfcd\naebfdc\naecbdf\naecbfd\naecdbf\naecdfb\naecfbd\naecfdb\naedbcf\naedbfc\naedcbf\naedcfb\naedfbc\naedfcb\naefbcd\naefbdc\naefcbd\naefcdb\naefdbc\naefdcb\nafbcde\nafbced\nafbdce\nafbdec\nafbecd\nafbedc\nafcbde\nafcbed\nafcdbe\nafcdeb\nafcebd\nafcedb\nafdbce\nafdbec\nafdcbe\nafdceb\nafdebc\nafdecb\nafebcd\nafebdc\nafecbd\nafecdb\nafedbc\nafedcb\nbacdef\nbacdfe\nbacedf\nbacefd\nbacfde\nbacfed\nbadcef\nbadcfe\nbadecf\nbadefc\nbadfce\nbadfec\nbaecdf\nbaecfd\nbaedcf\nbaedfc\nbaefcd\nbaefdc\nbafcde\nbafced\nbafdce\nbafdec\nbafecd\nbafedc\nbcadef\nbcadfe\nbcaedf\nbcaefd\nbcafde\nbcafed\nbcdaef\nbcdafe\nbcdeaf\nbcdefa\nbcdfae\nbcdfea\nbceadf\nbceafd\nbcedaf\nbcedfa\nbcefad\nbcefda\nbcfade\nbcfaed\nbcfdae\nbcfdea\nbcfead\nbcfeda\nbdacef\nbdacfe\nbdaecf\nbdaefc\nbdafce\nbdafec\nbdcaef\nbdcafe\nbdceaf\nbdcefa\nbdcfae\nbdcfea\nbdeacf\nbdeafc\nbdecaf\nbdecfa\nbdefac\nbdefca\nbdface\nbdfaec\nbdfcae\nbdfcea\nbdfeac\nbdfeca\nbeacdf\nbeacfd\nbeadcf\nbeadfc\nbeafcd\nbeafdc\nbecadf\nbecafd\nbecdaf\nbecdfa\nbecfad\nbecfda\nbedacf\nbedafc\nbedcaf\nbedcfa\nbedfac\nbedfca\nbefacd\nbefadc\nbefcad\nbefcda\nbefdac\nbefdca\nbfacde\nbfaced\nbfadce\nbfadec\nbfaecd\nbfaedc\nbfcade\nbfcaed\nbfcdae\nbfcdea\nbfcead\nbfceda\nbfdace\nbfdaec\nbfdcae\nbfdcea\nbfdeac\nbfdeca\nbfeacd\nbfeadc\nbfecad\nbfecda\nbfedac\nbfedca\ncabdef\ncabdfe\ncabedf\ncabefd\ncabfde\ncabfed\ncadbef\ncadbfe\ncadebf\ncadefb\ncadfbe\ncadfeb\ncaebdf\ncaebfd\ncaedbf\ncaedfb\ncaefbd\ncaefdb\ncafbde\ncafbed\ncafdbe\ncafdeb\ncafebd\ncafedb\ncbadef\ncbadfe\ncbaedf\ncbaefd\ncbafde\ncbafed\ncbdaef\ncbdafe\ncbdeaf\ncbdefa\ncbdfae\ncbdfea\ncbeadf\ncbeafd\ncbedaf\ncbedfa\ncbefad\ncbefda\ncbfade\ncbfaed\ncbfdae\ncbfdea\ncbfead\ncbfeda\ncdabef\ncdabfe\ncdaebf\ncdaefb\ncdafbe\ncdafeb\ncdbaef\ncdbafe\ncdbeaf\ncdbefa\ncdbfae\ncdbfea\ncdeabf\ncdeafb\ncdebaf\ncdebfa\ncdefab\ncdefba\ncdfabe\ncdfaeb\ncdfbae\ncdfbea\ncdfeab\ncdfeba\nceabdf\nceabfd\nceadbf\nceadfb\nceafbd\nceafdb\ncebadf\ncebafd\ncebdaf\ncebdfa\ncebfad\ncebfda\ncedabf\ncedafb\ncedbaf\ncedbfa\ncedfab\ncedfba\ncefabd\ncefadb\ncefbad\ncefbda\ncefdab\ncefdba\ncfabde\ncfabed\ncfadbe\ncfadeb\ncfaebd\ncfaedb\ncfbade\ncfbaed\ncfbdae\ncfbdea\ncfbead\ncfbeda\ncfdabe\ncfdaeb\ncfdbae\ncfdbea\ncfdeab\ncfdeba\ncfeabd\ncfeadb\ncfebad\ncfebda\ncfedab\ncfedba\ndabcef\ndabcfe\ndabecf\ndabefc\ndabfce\ndabfec\ndacbef\ndacbfe\ndacebf\ndacefb\ndacfbe\ndacfeb\ndaebcf\ndaebfc\ndaecbf\ndaecfb\ndaefbc\ndaefcb\ndafbce\ndafbec\ndafcbe\ndafceb\ndafebc\ndafecb\ndbacef\ndbacfe\ndbaecf\ndbaefc\ndbafce\ndbafec\ndbcaef\ndbcafe\ndbceaf\ndbcefa\ndbcfae\ndbcfea\ndbeacf\ndbeafc\ndbecaf\ndbecfa\ndbefac\ndbefca\ndbface\ndbfaec\ndbfcae\ndbfcea\ndbfeac\ndbfeca\ndcabef\ndcabfe\ndcaebf\ndcaefb\ndcafbe\ndcafeb\ndcbaef\ndcbafe\ndcbeaf\ndcbefa\ndcbfae\ndcbfea\ndceabf\ndceafb\ndcebaf\ndcebfa\ndcefab\ndcefba\ndcfabe\ndcfaeb\ndcfbae\ndcfbea\ndcfeab\ndcfeba\ndeabcf\ndeabfc\ndeacbf\ndeacfb\ndeafbc\ndeafcb\ndebacf\ndebafc\ndebcaf\ndebcfa\ndebfac\ndebfca\ndecabf\ndecafb\ndecbaf\ndecbfa\ndecfab\ndecfba\ndefabc\ndefacb\ndefbac\ndefbca\ndefcab\ndefcba\ndfabce\ndfabec\ndfacbe\ndfaceb\ndfaebc\ndfaecb\ndfbace\ndfbaec\ndfbcae\ndfbcea\ndfbeac\ndfbeca\ndfcabe\ndfcaeb\ndfcbae\ndfcbea\ndfceab\ndfceba\ndfeabc\ndfeacb\ndfebac\ndfebca\ndfecab\ndfecba\neabcdf\neabcfd\neabdcf\neabdfc\neabfcd\neabfdc\neacbdf\neacbfd\neacdbf\neacdfb\neacfbd\neacfdb\neadbcf\neadbfc\neadcbf\neadcfb\neadfbc\neadfcb\neafbcd\neafbdc\neafcbd\neafcdb\neafdbc\neafdcb\nebacdf\nebacfd\nebadcf\nebadfc\nebafcd\nebafdc\nebcadf\nebcafd\nebcdaf\nebcdfa\nebcfad\nebcfda\nebdacf\nebdafc\nebdcaf\nebdcfa\nebdfac\nebdfca\nebfacd\nebfadc\nebfcad\nebfcda\nebfdac\nebfdca\necabdf\necabfd\necadbf\necadfb\necafbd\necafdb\necbadf\necbafd\necbdaf\necbdfa\necbfad\necbfda\necdabf\necdafb\necdbaf\necdbfa\necdfab\necdfba\necfabd\necfadb\necfbad\necfbda\necfdab\necfdba\nedabcf\nedabfc\nedacbf\nedacfb\nedafbc\nedafcb\nedbacf\nedbafc\nedbcaf\nedbcfa\nedbfac\nedbfca\nedcabf\nedcafb\nedcbaf\nedcbfa\nedcfab\nedcfba\nedfabc\nedfacb\nedfbac\nedfbca\nedfcab\nedfcba\nefabcd\nefabdc\nefacbd\nefacdb\nefadbc\nefadcb\nefbacd\nefbadc\nefbcad\nefbcda\nefbdac\nefbdca\nefcabd\nefcadb\nefcbad\nefcbda\nefcdab\nefcdba\nefdabc\nefdacb\nefdbac\nefdbca\nefdcab\nefdcba\nfabcde\nfabced\nfabdce\nfabdec\nfabecd\nfabedc\nfacbde\nfacbed\nfacdbe\nfacdeb\nfacebd\nfacedb\nfadbce\nfadbec\nfadcbe\nfadceb\nfadebc\nfadecb\nfaebcd\nfaebdc\nfaecbd\nfaecdb\nfaedbc\nfaedcb\nfbacde\nfbaced\nfbadce\nfbadec\nfbaecd\nfbaedc\nfbcade\nfbcaed\nfbcdae\nfbcdea\nfbcead\nfbceda\nfbdace\nfbdaec\nfbdcae\nfbdcea\nfbdeac\nfbdeca\nfbeacd\nfbeadc\nfbecad\nfbecda\nfbedac\nfbedca\nfcabde\nfcabed\nfcadbe\nfcadeb\nfcaebd\nfcaedb\nfcbade\nfcbaed\nfcbdae\nfcbdea\nfcbead\nfcbeda\nfcdabe\nfcdaeb\nfcdbae\nfcdbea\nfcdeab\nfcdeba\nfceabd\nfceadb\nfcebad\nfcebda\nfcedab\nfcedba\nfdabce\nfdabec\nfdacbe\nfdaceb\nfdaebc\nfdaecb\nfdbace\nfdbaec\nfdbcae\nfdbcea\nfdbeac\nfdbeca\nfdcabe\nfdcaeb\nfdcbae\nfdcbea\nfdceab\nfdceba\nfdeabc\nfdeacb\nfdebac\nfdebca\nfdecab\nfdecba\nfeabcd\nfeabdc\nfeacbd\nfeacdb\nfeadbc\nfeadcb\nfebacd\nfebadc\nfebcad\nfebcda\nfebdac\nfebdca\nfecabd\nfecadb\nfecbad\nfecbda\nfecdab\nfecdba\nfedabc\nfedacb\nfedbac\nfedbca\nfedcab\nfedcba\n"
     }
    ],
    "mustInclude": [
     "used"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "N ферзь",
   "prompt": "<p><code>n × n</code> шахмат тақтасына бірін-бірі соқпайтын <code>n</code> ферзьді (бір жолда, бір бағанда, бір диагональда екеуі тұрмайды) неше тәсілмен қоюға болады? Кірісте <code>n</code> (1 ≤ n ≤ 10). Backtracking: әр жолға бір ферзь қойып, бағандарды және екі диагональды <code>boolean</code> массивтерімен белгілеңіз. Мысал: <code>4</code> → <code>2</code>, <code>8</code> → <code>92</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // backtracking\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int n;\n    static boolean[] col, d1, d2;\n\n    static int place(int r) {\n        if (r == n) return 1;\n        int total = 0;\n        for (int c = 0; c < n; c++) {\n            if (col[c] || d1[r + c] || d2[r - c + n - 1]) continue;\n            col[c] = d1[r + c] = d2[r - c + n - 1] = true;\n            total += place(r + 1);\n            col[c] = d1[r + c] = d2[r - c + n - 1] = false;\n        }\n        return total;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        n = sc.nextInt();\n        col = new boolean[n];\n        d1 = new boolean[2 * n - 1];\n        d2 = new boolean[2 * n - 1];\n        System.out.println(place(0));\n    }\n}\n",
   "hints": [
    "Бір диагональдағы ұяшықтарда <code>r + c</code> тұрақты, екіншісінде <code>r - c</code> тұрақты (индекс теріс болмауы үшін <code>+ n - 1</code>).",
    "Ферзьді қойып, <code>place(r + 1)</code> шақырып, сосын белгілерді алып тастаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n",
      "out": "2\n"
     },
     {
      "stdin": "8\n",
      "out": "92\n"
     },
     {
      "stdin": "1\n",
      "out": "1\n"
     },
     {
      "stdin": "3\n",
      "out": "0\n"
     },
     {
      "stdin": "10\n",
      "out": "724\n"
     }
    ]
   }
  }
 ],
 "jv-p1": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Ең жиі әріп",
   "prompt": "<p>Кірісте кіші латын әріптерінен тұратын бір сөз. Ең жиі кездесетін әріпті және санын басыңыз; саны тең болса — әліпби бойынша біріншісін. <code>int[26]</code> жиілік массивін қолданыңыз. Мысал: <code>karaganda</code> → <code>a 4</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        // санап, ең үлкенін табыңыз\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        for (char c : s.toCharArray()) cnt[c - 'a']++;\n        int best = 0;\n        for (int i = 1; i < 26; i++) {\n            if (cnt[i] > cnt[best]) best = i;\n        }\n        System.out.println((char) ('a' + best) + \" \" + cnt[best]);\n    }\n}\n",
   "hints": [
    "<code>cnt[c - 'a']++</code> — әр әріптің санауышы.",
    "Индексті әріпке қайтару: <code>(char) ('a' + best)</code>. Тек қатаң үлкен болғанда ауыстырсаңыз, тең жағдайда әліпбидегі біріншісі қалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "karaganda\n",
      "out": "a 4\n"
     },
     {
      "stdin": "z\n",
      "out": "z 1\n"
     },
     {
      "stdin": "abcabc\n",
      "out": "a 2\n"
     },
     {
      "stdin": "zzyy\n",
      "out": "y 2\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Нөлдерді соңына",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> бүтін сан. Нөл емес элементтердің ретін сақтап, барлық нөлдерді массивтің соңына жылжытыңыз да, бір жолға бос орынмен басыңыз. Екі көрсеткіш қолданыңыз: <code>write</code> келесі нөл емес элемент жазылатын орынды көрсетеді. Мысал: <code>6</code> / <code>0 3 0 5 7 0</code> → <code>3 5 7 0 0 0</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        // екі көрсеткіш\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int write = 0;\n        for (int i = 0; i < n; i++) {\n            if (a[i] != 0) a[write++] = a[i];\n        }\n        while (write < n) a[write++] = 0;\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(a[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Нөл емес элементті <code>a[write++] = a[i]</code> деп алға көшіріңіз.",
    "Соңынан қалған орындарды нөлмен толтырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\n0 3 0 5 7 0\n",
      "out": "3 5 7 0 0 0\n"
     },
     {
      "stdin": "3\n1 2 3\n",
      "out": "1 2 3\n"
     },
     {
      "stdin": "2\n0 0\n",
      "out": "0 0\n"
     },
     {
      "stdin": "4\n-1 0 0 -2\n",
      "out": "-1 -2 0 0\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Жетіспейтін нөмір",
   "prompt": "<p>Сыныпта 1-ден <code>n</code>-ге дейін нөмірленген оқушылар бар, бір оқушы келмеді. Кірісте <code>n</code> (2 ≤ n ≤ 10⁶), сосын келген <code>n − 1</code> оқушының нөмірі (кез келген ретпен). Келмеген оқушының нөмірін басыңыз. Кеңес: 1..n қосындысы <code>n(n + 1)/2</code> (long). Мысал: <code>5</code> / <code>3 1 5 2</code> → <code>4</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // қосынды формуласы\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = sc.nextInt();\n        long sum = n * (n + 1) / 2;\n        for (int i = 0; i < n - 1; i++) sum -= sc.nextInt();\n        System.out.println(sum);\n    }\n}\n",
   "hints": [
    "Барлық нөмірдің қосындысынан келгендердің қосындысын алып тастаңыз.",
    "n = 10⁶ болса, n(n + 1)/2 int-ке сыймайды — <code>long</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n3 1 5 2\n",
      "out": "4\n"
     },
     {
      "stdin": "2\n2\n",
      "out": "1\n"
     },
     {
      "stdin": "3\n1 2\n",
      "out": "3\n"
     },
     {
      "stdin": "2000\n2000 1998 1997 1996 1995 1994 1993 1992 1991 1990 1989 1988 1987 1986 1985 1984 1983 1982 1981 1980 1979 1978 1977 1976 1975 1974 1973 1972 1971 1970 1969 1968 1967 1966 1965 1964 1963 1962 1961 1960 1959 1958 1957 1956 1955 1954 1953 1952 1951 1950 1949 1948 1947 1946 1945 1944 1943 1942 1941 1940 1939 1938 1937 1936 1935 1934 1933 1932 1931 1930 1929 1928 1927 1926 1925 1924 1923 1922 1921 1920 1919 1918 1917 1916 1915 1914 1913 1912 1911 1910 1909 1908 1907 1906 1905 1904 1903 1902 1901 1900 1899 1898 1897 1896 1895 1894 1893 1892 1891 1890 1889 1888 1887 1886 1885 1884 1883 1882 1881 1880 1879 1878 1877 1876 1875 1874 1873 1872 1871 1870 1869 1868 1867 1866 1865 1864 1863 1862 1861 1860 1859 1858 1857 1856 1855 1854 1853 1852 1851 1850 1849 1848 1847 1846 1845 1844 1843 1842 1841 1840 1839 1838 1837 1836 1835 1834 1833 1832 1831 1830 1829 1828 1827 1826 1825 1824 1823 1822 1821 1820 1819 1818 1817 1816 1815 1814 1813 1812 1811 1810 1809 1808 1807 1806 1805 1804 1803 1802 1801 1800 1799 1798 1797 1796 1795 1794 1793 1792 1791 1790 1789 1788 1787 1786 1785 1784 1783 1782 1781 1780 1779 1778 1777 1776 1775 1774 1773 1772 1771 1770 1769 1768 1767 1766 1765 1764 1763 1762 1761 1760 1759 1758 1757 1756 1755 1754 1753 1752 1751 1750 1749 1748 1747 1746 1745 1744 1743 1742 1741 1740 1739 1738 1737 1736 1735 1734 1733 1732 1731 1730 1729 1728 1727 1726 1725 1724 1723 1722 1721 1720 1719 1718 1717 1716 1715 1714 1713 1712 1711 1710 1709 1708 1707 1706 1705 1704 1703 1702 1701 1700 1699 1698 1697 1696 1695 1694 1693 1692 1691 1690 1689 1688 1687 1686 1685 1684 1683 1682 1681 1680 1679 1678 1677 1676 1675 1674 1673 1672 1671 1670 1669 1668 1667 1666 1665 1664 1663 1662 1661 1660 1659 1658 1657 1656 1655 1654 1653 1652 1651 1650 1649 1648 1647 1646 1645 1644 1643 1642 1641 1640 1639 1638 1637 1636 1635 1634 1633 1632 1631 1630 1629 1628 1627 1626 1625 1624 1623 1622 1621 1620 1619 1618 1617 1616 1615 1614 1613 1612 1611 1610 1609 1608 1607 1606 1605 1604 1603 1602 1601 1600 1599 1598 1597 1596 1595 1594 1593 1592 1591 1590 1589 1588 1587 1586 1585 1584 1583 1582 1581 1580 1579 1578 1577 1576 1575 1574 1573 1572 1571 1570 1569 1568 1567 1566 1565 1564 1563 1562 1561 1560 1559 1558 1557 1556 1555 1554 1553 1552 1551 1550 1549 1548 1547 1546 1545 1544 1543 1542 1541 1540 1539 1538 1537 1536 1535 1534 1533 1532 1531 1530 1529 1528 1527 1526 1525 1524 1523 1522 1521 1520 1519 1518 1517 1516 1515 1514 1513 1512 1511 1510 1509 1508 1507 1506 1505 1504 1503 1502 1501 1500 1499 1498 1497 1496 1495 1494 1493 1492 1491 1490 1489 1488 1487 1486 1485 1484 1483 1482 1481 1480 1479 1478 1477 1476 1475 1474 1473 1472 1471 1470 1469 1468 1467 1466 1465 1464 1463 1462 1461 1460 1459 1458 1457 1456 1455 1454 1453 1452 1451 1450 1449 1448 1447 1446 1445 1444 1443 1442 1441 1440 1439 1438 1437 1436 1435 1434 1433 1432 1431 1430 1429 1428 1427 1426 1425 1424 1423 1422 1421 1420 1419 1418 1417 1416 1415 1414 1413 1412 1411 1410 1409 1408 1407 1406 1405 1404 1403 1402 1401 1400 1399 1398 1397 1396 1395 1394 1393 1392 1391 1390 1389 1388 1387 1386 1385 1384 1383 1382 1381 1380 1379 1378 1377 1376 1375 1374 1373 1372 1371 1370 1369 1368 1367 1366 1365 1364 1363 1362 1361 1360 1359 1358 1357 1356 1355 1354 1353 1352 1351 1350 1349 1348 1347 1346 1345 1344 1343 1342 1341 1340 1339 1338 1337 1336 1335 1334 1333 1332 1331 1330 1329 1328 1327 1326 1325 1324 1323 1322 1321 1320 1319 1318 1317 1316 1315 1314 1313 1312 1311 1310 1309 1308 1307 1306 1305 1304 1303 1302 1301 1300 1299 1298 1297 1296 1295 1294 1293 1292 1291 1290 1289 1288 1287 1286 1285 1284 1283 1282 1281 1280 1279 1278 1277 1276 1275 1274 1273 1272 1271 1270 1269 1268 1267 1266 1265 1264 1263 1262 1261 1260 1259 1258 1257 1256 1255 1254 1253 1252 1251 1250 1249 1248 1247 1246 1245 1244 1243 1242 1241 1240 1239 1238 1237 1236 1235 1234 1233 1232 1231 1230 1229 1228 1227 1226 1225 1224 1223 1222 1221 1220 1219 1218 1217 1216 1215 1214 1213 1212 1211 1210 1209 1208 1207 1206 1205 1204 1203 1202 1201 1200 1199 1198 1197 1196 1195 1194 1193 1192 1191 1190 1189 1188 1187 1186 1185 1184 1183 1182 1181 1180 1179 1178 1177 1176 1175 1174 1173 1172 1171 1170 1169 1168 1167 1166 1165 1164 1163 1162 1161 1160 1159 1158 1157 1156 1155 1154 1153 1152 1151 1150 1149 1148 1147 1146 1145 1144 1143 1142 1141 1140 1139 1138 1137 1136 1135 1134 1133 1132 1131 1130 1129 1128 1127 1126 1125 1124 1123 1122 1121 1120 1119 1118 1117 1116 1115 1114 1113 1112 1111 1110 1109 1108 1107 1106 1105 1104 1103 1102 1101 1100 1099 1098 1097 1096 1095 1094 1093 1092 1091 1090 1089 1088 1087 1086 1085 1084 1083 1082 1081 1080 1079 1078 1077 1076 1075 1074 1073 1072 1071 1070 1069 1068 1067 1066 1065 1064 1063 1062 1061 1060 1059 1058 1057 1056 1055 1054 1053 1052 1051 1050 1049 1048 1047 1046 1045 1044 1043 1042 1041 1040 1039 1038 1037 1036 1035 1034 1033 1032 1031 1030 1029 1028 1027 1026 1025 1024 1023 1022 1021 1020 1019 1018 1017 1016 1015 1014 1013 1012 1011 1010 1009 1008 1007 1006 1005 1004 1003 1002 1001 1000 999 998 997 996 995 994 993 992 991 990 989 988 987 986 985 984 983 982 981 980 979 978 977 976 975 974 973 972 971 970 969 968 967 966 965 964 963 962 961 960 959 958 957 956 955 954 953 952 951 950 949 948 947 946 945 944 943 942 941 940 939 938 937 936 935 934 933 932 931 930 929 928 927 926 925 924 923 922 921 920 919 918 917 916 915 914 913 912 911 910 909 908 907 906 905 904 903 902 901 900 899 898 897 896 895 894 893 892 891 890 889 888 887 886 885 884 883 882 881 880 879 878 877 876 875 874 873 872 871 870 869 868 867 866 865 864 863 862 861 860 859 858 857 856 855 854 853 852 851 850 849 848 847 846 845 844 843 842 841 840 839 838 837 836 835 834 833 832 831 830 829 828 827 826 825 824 823 822 821 820 819 818 817 816 815 814 813 812 811 810 809 808 807 806 805 804 803 802 801 800 799 798 797 796 795 794 793 792 791 790 789 788 787 786 785 784 783 782 781 780 779 778 777 776 775 774 773 772 771 770 769 768 767 766 765 764 763 762 761 760 759 758 757 756 755 754 753 752 751 750 749 748 747 746 745 744 743 742 741 740 739 738 737 736 735 734 733 732 731 730 729 728 727 726 725 724 723 722 721 720 719 718 717 716 715 714 713 712 711 710 709 708 707 706 705 704 703 702 701 700 699 698 697 696 695 694 693 692 691 690 689 688 687 686 685 684 683 682 681 680 679 678 677 676 675 674 673 672 671 670 669 668 667 666 665 664 663 662 661 660 659 658 657 656 655 654 653 652 651 650 649 648 647 646 645 644 643 642 641 640 639 638 637 636 635 634 633 632 631 630 629 628 627 626 625 624 623 622 621 620 619 618 617 616 615 614 613 612 611 610 609 608 607 606 605 604 603 602 601 600 599 598 597 596 595 594 593 592 591 590 589 588 587 586 585 584 583 582 581 580 579 578 577 576 575 574 573 572 571 570 569 568 567 566 565 564 563 562 561 560 559 558 557 556 555 554 553 552 551 550 549 548 547 546 545 544 543 542 541 540 539 538 537 536 535 534 533 532 531 530 529 528 527 526 525 524 523 522 521 520 519 518 517 516 515 514 513 512 511 510 509 508 507 506 505 504 503 502 501 500 499 498 497 496 495 494 493 492 491 490 489 488 487 486 485 484 483 482 481 480 479 478 477 476 475 474 473 472 471 470 469 468 467 466 465 464 463 462 461 460 459 458 457 456 455 454 453 452 451 450 449 448 447 446 445 444 443 442 441 440 439 438 437 436 435 434 433 432 431 430 429 428 427 426 425 424 423 422 421 420 419 418 417 416 415 414 413 412 411 410 409 408 407 406 405 404 403 402 401 400 399 398 397 396 395 394 393 392 391 390 389 388 387 386 385 384 383 382 381 380 379 378 377 376 375 374 373 372 371 370 369 368 367 366 365 364 363 362 361 360 359 358 357 356 355 354 353 352 351 350 349 348 347 346 345 344 343 342 341 340 339 338 337 336 335 334 333 332 331 330 329 328 327 326 325 324 323 322 321 320 319 318 317 316 315 314 313 312 311 310 309 308 307 306 305 304 303 302 301 300 299 298 297 296 295 294 293 292 291 290 289 288 287 286 285 284 283 282 281 280 279 278 277 276 275 274 273 272 271 270 269 268 267 266 265 264 263 262 261 260 259 258 257 256 255 254 253 252 251 250 249 248 247 246 245 244 243 242 241 240 239 238 237 236 235 234 233 232 231 230 229 228 227 226 225 224 223 222 221 220 219 218 217 216 215 214 213 212 211 210 209 208 207 206 205 204 203 202 201 200 199 198 197 196 195 194 193 192 191 190 189 188 187 186 185 184 183 182 181 180 179 178 177 176 175 174 173 172 171 170 169 168 167 166 165 164 163 162 161 160 159 158 157 156 155 154 153 152 151 150 149 148 147 146 145 144 143 142 141 140 139 138 137 136 135 134 133 132 131 130 129 128 127 126 125 124 123 122 121 120 119 118 117 116 115 114 113 112 111 110 109 108 107 106 105 104 103 102 101 100 99 98 97 96 95 94 93 92 91 90 89 88 87 86 85 84 83 82 81 80 79 78 77 76 75 74 73 72 71 70 69 68 67 66 65 64 63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1\n",
      "out": "1999\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Алғашқы жалғыз әріп",
   "prompt": "<p>Кірісте кіші латын әріптерінен тұратын бір сөз. Сөзде бір-ақ рет кездесетін бірінші әріпті және оның индексін (0-ден) басыңыз; ондай әріп болмаса <code>NONE</code>. Мысал: <code>almaty</code> → <code>l 1</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        // екі өту\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int[] cnt = new int[26];\n        for (char c : s.toCharArray()) cnt[c - 'a']++;\n        for (int i = 0; i < s.length(); i++) {\n            if (cnt[s.charAt(i) - 'a'] == 1) {\n                System.out.println(s.charAt(i) + \" \" + i);\n                return;\n            }\n        }\n        System.out.println(\"NONE\");\n    }\n}\n",
   "hints": [
    "Бірінші өту — жиілікті санау, екінші өту — сөзді солдан оңға аралап, саны 1 әріпті іздеу.",
    "Тапқан бойда басып, <code>return</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "almaty\n",
      "out": "l 1\n"
     },
     {
      "stdin": "aabb\n",
      "out": "NONE\n"
     },
     {
      "stdin": "x\n",
      "out": "x 0\n"
     },
     {
      "stdin": "aabbc\n",
      "out": "c 4\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Сұрыпталған тізімдерді біріктіру",
   "prompt": "<p>Екі филиалдың тапсырыс сомалары өсу ретімен берілген. Кірісте <code>n</code> және <code>n</code> сан, сосын <code>m</code> және <code>m</code> сан. Екі тізімді бір сұрыпталған тізімге біріктіріп, бір жолға бос орынмен басыңыз. <code>Arrays.sort</code> емес, екі көрсеткішпен O(n + m) жазыңыз. Мысал: <code>3</code> / <code>1 4 9</code> / <code>4</code> / <code>2 4 5 10</code> → <code>1 2 4 4 5 9 10</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int m = sc.nextInt();\n        int[] b = new int[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextInt();\n        // екі көрсеткіш\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int m = sc.nextInt();\n        int[] b = new int[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        int i = 0, j = 0;\n        while (i < n || j < m) {\n            int x;\n            if (j >= m || (i < n && a[i] <= b[j])) x = a[i++];\n            else x = b[j++];\n            if (sb.length() > 0) sb.append(' ');\n            sb.append(x);\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Әр қадамда <code>a[i]</code> мен <code>b[j]</code>-ның кішісін алып, сол көрсеткішті жылжытыңыз.",
    "Бір тізім біткенде шекараны тексеріңіз: <code>j &gt;= m || (i &lt; n &amp;&amp; a[i] &lt;= b[j])</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n1 4 9\n4\n2 4 5 10\n",
      "out": "1 2 4 4 5 9 10\n"
     },
     {
      "stdin": "1\n5\n1\n-5\n",
      "out": "-5 5\n"
     },
     {
      "stdin": "2\n1 2\n3\n3 4 5\n",
      "out": "1 2 3 4 5\n"
     },
     {
      "stdin": "3\n7 8 9\n1\n0\n",
      "out": "0 7 8 9\n"
     }
    ],
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Айырмасы k жұптар",
   "prompt": "<p>Кірісте <code>n k</code> (k ≥ 1), сосын <code>n</code> <b>әртүрлі</b> бүтін сан. Айырмасы дәл <code>k</code>-ға тең болатын жұптардың (<code>b − a = k</code>) санын басыңыз. <code>HashSet</code>-пен O(n) шешіңіз. Мысал: <code>5 2</code> / <code>1 5 3 4 2</code> → <code>3</code> ((1, 3), (3, 5), (2, 4)).</p>",
   "starter": "import java.util.HashSet;\nimport java.util.Set;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        // HashSet\n    }\n}\n",
   "solution": "import java.util.HashSet;\nimport java.util.Scanner;\nimport java.util.Set;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int[] a = new int[n];\n        Set<Integer> set = new HashSet<>();\n        for (int i = 0; i < n; i++) {\n            a[i] = sc.nextInt();\n            set.add(a[i]);\n        }\n        int count = 0;\n        for (int x : a) {\n            if (set.contains(x + k)) count++;\n        }\n        System.out.println(count);\n    }\n}\n",
   "hints": [
    "Барлық санды <code>HashSet</code>-ке салыңыз.",
    "Әр <code>x</code> үшін <code>x + k</code> жиында бар ма? k ≥ 1 болғандықтан, әр жұп бір-ақ рет саналады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 2\n1 5 3 4 2\n",
      "out": "3\n"
     },
     {
      "stdin": "3 10\n1 2 3\n",
      "out": "0\n"
     },
     {
      "stdin": "4 1\n-1 0 1 2\n",
      "out": "3\n"
     },
     {
      "stdin": "1 1\n5\n",
      "out": "0\n"
     }
    ],
    "mustInclude": [
     "HashSet"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Қосындысы k ішкі массивтер",
   "prompt": "<p>Кірісте <code>n k</code> (n ≤ 10⁵), сосын <code>n</code> бүтін сан (теріс болуы мүмкін). Қосындысы дәл <code>k</code>-ға тең болатын үздіксіз ішкі массивтердің санын басыңыз. O(n²) тым баяу: префикс қосындылар мен <code>HashMap&lt;Long, Integer&gt;</code> қолданыңыз — әр позицияда «<code>prefix − k</code> қосындысы бұрын неше рет болды?». Мысал: <code>5 3</code> / <code>1 2 1 2 1</code> → <code>4</code>.</p>",
   "starter": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long k = sc.nextLong();\n        // префикс қосындылар\n    }\n}\n",
   "solution": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long k = sc.nextLong();\n        Map<Long, Integer> seen = new HashMap<>();\n        seen.put(0L, 1);\n        long prefix = 0, count = 0;\n        for (int i = 0; i < n; i++) {\n            prefix += sc.nextInt();\n            count += seen.getOrDefault(prefix - k, 0);\n            seen.merge(prefix, 1, Integer::sum);\n        }\n        System.out.println(count);\n    }\n}\n",
   "hints": [
    "a[i..j] қосындысы = prefix[j] − prefix[i−1]. Ол k-ға тең болса, prefix[i−1] = prefix[j] − k.",
    "Басында <code>seen.put(0L, 1)</code> — массив басынан басталатын ішкі массивтер үшін. Жауап үлкен болуы мүмкін — <code>long</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 3\n1 2 1 2 1\n",
      "out": "4\n"
     },
     {
      "stdin": "3 0\n0 0 0\n",
      "out": "6\n"
     },
     {
      "stdin": "4 -1\n1 -2 1 -1\n",
      "out": "4\n"
     },
     {
      "stdin": "2 100\n1 2\n",
      "out": "0\n"
     },
     {
      "stdin": "3000 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n",
      "out": "4501500\n"
     }
    ],
    "mustInclude": [
     "HashMap"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын палиндром бөлік",
   "prompt": "<p>Кірісте кіші латын әріптерінен тұратын бір сөз (ұзындығы ≤ 2000). Оның палиндром болатын ең ұзын үздіксіз бөлігін басыңыз; бірнеше болса — ең сол жақтағысын. Әр позицияны (және екі әріптің арасын) центр ретінде алып, екі көрсеткішті екі жаққа кеңейтіңіз — O(n²). Мысал: <code>abacdfgdcaba</code> → <code>aba</code>, <code>forgeeksskeegfor</code> → <code>geeksskeeg</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        // әр центрден кеңейтіңіз\n        System.out.println(s.substring(0, 1));\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int expand(String s, int l, int r) {\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n            l--;\n            r++;\n        }\n        return r - l - 1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int bestStart = 0, bestLen = 1;\n        for (int c = 0; c < s.length(); c++) {\n            int odd = expand(s, c, c);\n            if (odd > bestLen) {\n                bestLen = odd;\n                bestStart = c - odd / 2;\n            }\n            int even = expand(s, c, c + 1);\n            if (even > bestLen) {\n                bestLen = even;\n                bestStart = c - even / 2 + 1;\n            }\n        }\n        System.out.println(s.substring(bestStart, bestStart + bestLen));\n    }\n}\n",
   "hints": [
    "Тақ ұзындық үшін центр <code>(c, c)</code>, жұп ұзындық үшін <code>(c, c + 1)</code>. Әріптер тең болғанша <code>l--</code>, <code>r++</code>.",
    "Кеңейту аяқталғанда палиндром ұзындығы <code>r - l - 1</code>. Тек қатаң ұзынырақ болса ауыстырыңыз — сонда ең сол жақтағысы қалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "abacdfgdcaba\n",
      "out": "aba\n"
     },
     {
      "stdin": "forgeeksskeegfor\n",
      "out": "geeksskeeg\n"
     },
     {
      "stdin": "a\n",
      "out": "a\n"
     },
     {
      "stdin": "abcd\n",
      "out": "a\n"
     },
     {
      "stdin": "abba\n",
      "out": "abba\n"
     },
     {
      "stdin": "cbbd\n",
      "out": "bb\n"
     }
    ],
    "mustInclude": [
     "while"
    ]
   }
  }
 ],
 "jv-p2": [
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "ХҚКО кезегі",
   "prompt": "<p>ХҚКО-да электрондық кезек. Кірісте <code>q</code>, сосын <code>q</code> команда: <code>JOIN аты</code> — кезекке тұру, <code>NEXT</code> — терезеге шақыру. Әр <code>NEXT</code>-ке шақырылған адамның атын басыңыз, кезек бос болса <code>EMPTY</code>. Соңында <code>Waiting: k</code>. <code>ArrayDeque</code> кезек (queue) ретінде. Мысал:</p><pre><code>5\nJOIN Aruzhan\nJOIN Bolat\nNEXT\nJOIN Dana\nNEXT</code></pre><p>→ <code>Aruzhan</code>, <code>Bolat</code>, <code>Waiting: 1</code>.</p>",
   "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        ArrayDeque<String> queue = new ArrayDeque<>();\n        // командаларды өңдеңіз\n    }\n}\n",
   "solution": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int q = sc.nextInt();\n        ArrayDeque<String> queue = new ArrayDeque<>();\n        for (int i = 0; i < q; i++) {\n            String cmd = sc.next();\n            if (cmd.equals(\"JOIN\")) {\n                queue.offer(sc.next());\n            } else {\n                System.out.println(queue.isEmpty() ? \"EMPTY\" : queue.poll());\n            }\n        }\n        System.out.println(\"Waiting: \" + queue.size());\n    }\n}\n",
   "hints": [
    "Кезек: <code>offer</code> соңына қосады, <code>poll</code> басынан алады.",
    "Бос кезекте <code>poll()</code> <code>null</code> қайтарады — алдымен <code>isEmpty()</code> тексеріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\nJOIN Aruzhan\nJOIN Bolat\nNEXT\nJOIN Dana\nNEXT\n",
      "out": "Aruzhan\nBolat\nWaiting: 1\n"
     },
     {
      "stdin": "2\nNEXT\nJOIN A\n",
      "out": "EMPTY\nWaiting: 1\n"
     },
     {
      "stdin": "0\n",
      "out": "Waiting: 0\n"
     }
    ],
    "mustInclude": [
     "ArrayDeque"
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Баспалдақпен көтерілу",
   "prompt": "<p>Баспалдақта <code>n</code> саты бар (1 ≤ n ≤ 90). Бір қадаммен 1 немесе 2 саты көтерілуге болады. Жоғарыға неше тәсілмен шығуға болады? DP: <code>dp[i] = dp[i − 1] + dp[i − 2]</code>, <code>long</code>. Мысал: <code>4</code> → <code>5</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long[] dp = new long[n + 2];\n        // dp кестесін толтырыңыз\n        System.out.println(dp[n]);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long[] dp = new long[n + 2];\n        dp[0] = 1;\n        dp[1] = 1;\n        for (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];\n        System.out.println(dp[n]);\n    }\n}\n",
   "hints": [
    "Соңғы қадам не 1 саты, не 2 саты болды: <code>dp[i] = dp[i - 1] + dp[i - 2]</code>.",
    "Бастапқы мәндер: <code>dp[0] = 1</code>, <code>dp[1] = 1</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n",
      "out": "5\n"
     },
     {
      "stdin": "1\n",
      "out": "1\n"
     },
     {
      "stdin": "2\n",
      "out": "2\n"
     },
     {
      "stdin": "90\n",
      "out": "4660046610375530309\n"
     }
    ],
    "mustInclude": [
     "dp["
    ]
   }
  },
  {
   "type": "java",
   "level": "easy",
   "xp": 10,
   "title": "Өшіру пернесі",
   "prompt": "<p>Кірісте бір жол: латын әріптері және <code>#</code> белгісі. <code>#</code> — Backspace: алдыңғы басылған әріпті өшіреді (өшіретін әріп болмаса, ештеңе болмайды). Соңында экранда қалған мәтінді басыңыз; бос болса <code>EMPTY</code>. Стек ретінде <code>StringBuilder</code> немесе <code>ArrayDeque</code> қолданыңыз. Мысал: <code>Alm#maty##y</code> → <code>Almay</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        // # кездессе соңғы символды өшіріңіз\n        System.out.println(sb.toString());\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        StringBuilder sb = new StringBuilder();\n        for (char c : s.toCharArray()) {\n            if (c == '#') {\n                if (sb.length() > 0) sb.deleteCharAt(sb.length() - 1);\n            } else {\n                sb.append(c);\n            }\n        }\n        System.out.println(sb.length() == 0 ? \"EMPTY\" : sb.toString());\n    }\n}\n",
   "hints": [
    "Әріп — <code>append</code>, <code>#</code> — <code>deleteCharAt(sb.length() - 1)</code>.",
    "Өшірмес бұрын <code>sb.length() &gt; 0</code> тексеріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Alm#maty##y\n",
      "out": "Almay\n"
     },
     {
      "stdin": "##a\n",
      "out": "a\n"
     },
     {
      "stdin": "ab##\n",
      "out": "EMPTY\n"
     },
     {
      "stdin": "abc\n",
      "out": "abc\n"
     }
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Ең пайдалы кезең",
   "prompt": "<p>Кірісте <code>n</code>, сосын дүкеннің <code>n</code> күндік пайдасы (теріс болуы мүмкін). Қосындысы ең үлкен үздіксіз кезеңнің (кемінде бір күн) қосындысын басыңыз. Kadane алгоритмі, O(n): <code>cur = max(a[i], cur + a[i])</code>. Мысал: <code>8</code> / <code>-2 1 -3 4 -1 2 1 -5</code> → <code>6</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long best = 0;\n        // Kadane\n        System.out.println(best);\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long cur = sc.nextInt();\n        long best = cur;\n        for (int i = 1; i < n; i++) {\n            long x = sc.nextInt();\n            cur = Math.max(x, cur + x);\n            best = Math.max(best, cur);\n        }\n        System.out.println(best);\n    }\n}\n",
   "hints": [
    "<code>cur</code> — осы күнде аяқталатын ең жақсы кезең: не жаңадан бастаймыз, не алдыңғысын жалғастырамыз.",
    "Бәрі теріс болса, жауап — ең үлкен жалғыз элемент; сондықтан <code>best</code>-ті 0 емес, бірінші элементтен бастаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "8\n-2 1 -3 4 -1 2 1 -5\n",
      "out": "6\n"
     },
     {
      "stdin": "3\n-5 -2 -9\n",
      "out": "-2\n"
     },
     {
      "stdin": "1\n7\n",
      "out": "7\n"
     },
     {
      "stdin": "4\n2000000000 2000000000 -1 5\n",
      "out": "4000000004\n"
     }
    ],
    "mustInclude": [
     "Math.max"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Жылырақ күнді күту",
   "prompt": "<p>Кірісте <code>n</code>, сосын <code>n</code> күннің температурасы. Әр күн үшін одан <b>жылырақ</b> күнге дейін неше күн күту керек екенін бір жолға бос орынмен басыңыз; ондай күн болмаса <code>0</code>. Монотонды стек (<code>ArrayDeque&lt;Integer&gt;</code>, индекстер) арқылы O(n). Мысал: <code>8</code> / <code>73 74 75 71 69 72 76 73</code> → <code>1 1 4 2 1 1 0 0</code>.</p>",
   "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] t = new int[n];\n        for (int i = 0; i < n; i++) t[i] = sc.nextInt();\n        int[] ans = new int[n];\n        // монотонды стек\n    }\n}\n",
   "solution": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] t = new int[n];\n        for (int i = 0; i < n; i++) t[i] = sc.nextInt();\n        int[] ans = new int[n];\n        ArrayDeque<Integer> st = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) {\n            while (!st.isEmpty() && t[st.peek()] < t[i]) {\n                int j = st.pop();\n                ans[j] = i - j;\n            }\n            st.push(i);\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            if (i > 0) sb.append(' ');\n            sb.append(ans[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}\n",
   "hints": [
    "Стекте жауабы әлі белгісіз күндердің индекстері сақталады (температуралары кемімелі ретпен).",
    "Жаңа күн стек үстіндегі күннен жылы болса, оны <code>pop</code> етіп, жауабын <code>i - j</code> деп жазыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "8\n73 74 75 71 69 72 76 73\n",
      "out": "1 1 4 2 1 1 0 0\n"
     },
     {
      "stdin": "3\n30 20 10\n",
      "out": "0 0 0\n"
     },
     {
      "stdin": "4\n10 10 10 11\n",
      "out": "3 2 1 0\n"
     },
     {
      "stdin": "1\n-5\n",
      "out": "0\n"
     }
    ],
    "mustInclude": [
     "ArrayDeque"
    ]
   }
  },
  {
   "type": "java",
   "level": "medium",
   "xp": 15,
   "title": "Бірінші ≥ x орны",
   "prompt": "<p>Кірісте <code>n</code>, сосын өсу ретімен сұрыпталған <code>n</code> сан (қайталанулар болуы мүмкін), сосын <code>q</code> және <code>q</code> сұрау <code>x</code>. Әр сұрау үшін <code>a[i] ≥ x</code> болатын ең кіші индексті (0-ден) басыңыз; ондай элемент жоқ болса <code>n</code>. Өз binary search-іңізді (lower bound) жазыңыз. Мысал: <code>5</code> / <code>1 3 3 3 8</code> / <code>3</code> / <code>3 4 9</code> → <code>1</code>, <code>4</code>, <code>5</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int q = sc.nextInt();\n        // binary search\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    static int lowerBound(int[] a, int x) {\n        int lo = 0, hi = a.length;\n        while (lo < hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (a[mid] < x) lo = mid + 1;\n            else hi = mid;\n        }\n        return lo;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int q = sc.nextInt();\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < q; i++) sb.append(lowerBound(a, sc.nextInt())).append('\\n');\n        System.out.print(sb);\n    }\n}\n",
   "hints": [
    "Аралық <code>[lo, hi)</code>, басында <code>hi = n</code>. <code>a[mid] &lt; x</code> болса <code>lo = mid + 1</code>, әйтпесе <code>hi = mid</code>.",
    "Цикл <code>lo == hi</code> болғанда тоқтайды — сол жауап."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n1 3 3 3 8\n3\n3 4 9\n",
      "out": "1\n4\n5\n"
     },
     {
      "stdin": "1\n5\n3\n5 1 6\n",
      "out": "0\n0\n1\n"
     },
     {
      "stdin": "4\n-2 -2 0 7\n2\n-2 -100\n",
      "out": "0\n0\n"
     }
    ],
    "mustInclude": [
     "mid"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Аралдар саны",
   "prompt": "<p>Кірісте <code>r c</code>, сосын <code>r</code> жол: <code>#</code> — құрлық, <code>.</code> — су. Төрт бағытпен (жоғары, төмен, солға, оңға) жалғасқан құрлық ұяшықтары бір арал құрайды. Аралдар санын және ең үлкен аралдың ауданын (ұяшық саны) бір жолға басыңыз. Әр жаңа аралдан BFS (<code>ArrayDeque&lt;int[]&gt;</code>) бастаңыз. Мысал:</p><pre><code>4 5\n##..#\n#...#\n..#..\n....#</code></pre><p>→ <code>4 3</code>. Арал жоқ болса <code>0 0</code>.</p>",
   "starter": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        // әр жаңа құрлық ұяшығынан BFS\n    }\n}\n",
   "solution": "import java.util.ArrayDeque;\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        boolean[][] seen = new boolean[r][c];\n        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};\n        int islands = 0, biggest = 0;\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                if (grid[i].charAt(j) != '#' || seen[i][j]) continue;\n                islands++;\n                int size = 0;\n                ArrayDeque<int[]> q = new ArrayDeque<>();\n                q.offer(new int[]{i, j});\n                seen[i][j] = true;\n                while (!q.isEmpty()) {\n                    int[] cur = q.poll();\n                    size++;\n                    for (int k = 0; k < 4; k++) {\n                        int nr = cur[0] + dr[k], nc = cur[1] + dc[k];\n                        if (nr < 0 || nr >= r || nc < 0 || nc >= c) continue;\n                        if (grid[nr].charAt(nc) != '#' || seen[nr][nc]) continue;\n                        seen[nr][nc] = true;\n                        q.offer(new int[]{nr, nc});\n                    }\n                }\n                if (size > biggest) biggest = size;\n            }\n        }\n        System.out.println(islands + \" \" + biggest);\n    }\n}\n",
   "hints": [
    "Барлық ұяшықты аралаңыз; әлі көрілмеген <code>#</code> табылса — жаңа арал, одан BFS бастап, бүкіл аралды <code>seen</code> деп белгілеңіз.",
    "Көршілерге өтпес бұрын шекараны ӘРҚАШАН тексеріңіз: бұл платформада массив шекарасы автоматты тексерілмейді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4 5\n##..#\n#...#\n..#..\n....#\n",
      "out": "4 3\n"
     },
     {
      "stdin": "2 2\n..\n..\n",
      "out": "0 0\n"
     },
     {
      "stdin": "3 3\n###\n#.#\n###\n",
      "out": "1 8\n"
     },
     {
      "stdin": "1 5\n#.#.#\n",
      "out": "3 1\n"
     }
    ],
    "mustInclude": [
     "ArrayDeque"
    ]
   }
  },
  {
   "type": "java",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын ортақ тізбек",
   "prompt": "<p>Кірісте екі сөз <code>a</code> және <code>b</code> (ұзындығы ≤ 300). Олардың ең ұзын ортақ ішкі тізбегінің (LCS: ретін сақтап, кейбір әріптерді өшіру арқылы алынатын, міндетті түрде үздіксіз емес) ұзындығын басыңыз. DP: <code>dp[i][j]</code> — <code>a</code>-ның алғашқы <code>i</code> әрпі мен <code>b</code>-ның алғашқы <code>j</code> әрпінің LCS-і. Мысал: <code>abcde ace</code> → <code>3</code>.</p>",
   "starter": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        // dp кестесі\n    }\n}\n",
   "solution": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String a = sc.next();\n        String b = sc.next();\n        int n = a.length(), m = b.length();\n        int[][] dp = new int[n + 1][m + 1];\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= m; j++) {\n                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;\n                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n        System.out.println(dp[n][m]);\n    }\n}\n",
   "hints": [
    "Әріптер тең болса <code>dp[i][j] = dp[i - 1][j - 1] + 1</code>.",
    "Тең болмаса, біреуін тастаймыз: <code>Math.max(dp[i - 1][j], dp[i][j - 1])</code>. Кесте өлшемі <code>(n + 1) × (m + 1)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "abcde ace\n",
      "out": "3\n"
     },
     {
      "stdin": "abc def\n",
      "out": "0\n"
     },
     {
      "stdin": "almaty almaty\n",
      "out": "6\n"
     },
     {
      "stdin": "karaganda kostanay\n",
      "out": "4\n"
     },
     {
      "stdin": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab\n",
      "out": "299\n"
     }
    ],
    "mustInclude": [
     "dp["
    ]
   }
  }
 ]
});
