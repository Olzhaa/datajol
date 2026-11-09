// Practice tasks after the lessons of cpp-1. Each lesson's list opens one task at a time.
DJ.addPractice('cpp-1', {
 "cp-1": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Үш сан қосындысы",
   "prompt": "<p>Үш бүтін сан берілген. Олардың қосындысын шығарыңыз. Мысалы, <code>2 5 -1</code> → <code>6</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    // үш санды оқып, қосындысын шығарыңыз\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    cout << a + b + c << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>cin &gt;&gt; a &gt;&gt; b &gt;&gt; c;</code> үш санды бірден оқиды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2 5 -1\n",
      "out": "6\n"
     },
     {
      "stdin": "100 200 300\n",
      "out": "600\n"
     },
     {
      "stdin": "0 0 7\n",
      "out": "7\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Тұратын қала",
   "prompt": "<p>Бір сөз — қала атауы берілген. <code>Мен &lt;қала&gt; қаласында тұрамын.</code> деп шығарыңыз. Мысалы, <code>Astana</code> → <code>Мен Astana қаласында тұрамын.</code></p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string city;\n    cout << \"Мен қаласында тұрамын.\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string city;\n    cin >> city;\n    cout << \"Мен \" << city << \" қаласында тұрамын.\" << endl;\n    return 0;\n}\n",
   "hints": [
    "Алдымен <code>cin &gt;&gt; city;</code>, сосын мәтін мен айнымалыны <code>&lt;&lt;</code> арқылы тізбектеңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Astana\n",
      "out": "Мен Astana қаласында тұрамын.\n"
     },
     {
      "stdin": "Шымкент\n",
      "out": "Мен Шымкент қаласында тұрамын.\n"
     },
     {
      "stdin": "Taraz\n",
      "out": "Мен Taraz қаласында тұрамын.\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Тіктөртбұрыш периметрі",
   "prompt": "<p>Тіктөртбұрыштың ұзындығы <code>a</code> мен ені <code>b</code> (бүтін сандар) берілген. Периметрін шығарыңыз: <code>2 * (a + b)</code>. Мысалы, <code>3 4</code> → <code>14</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << 2 * (a + b) << endl;\n    return 0;\n}\n",
   "hints": [
    "Жақшаны ұмытпаңыз: <code>2 * a + b</code> басқа нәтиже береді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 4\n",
      "out": "14\n"
     },
     {
      "stdin": "10 10\n",
      "out": "40\n"
     },
     {
      "stdin": "1 25\n",
      "out": "52\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Сатып алу және қайтарым",
   "prompt": "<p>Дүкенде бір тауардың бағасы <code>price</code> теңге, сатып алынған саны <code>qty</code>, ал сатып алушы <code>paid</code> теңге берді (<code>paid</code> жеткілікті деп кепілдік беріледі). Бірінші жолға жалпы соманы, екінші жолға қайтарымды шығарыңыз. Мысалы, <code>450 3 2000</code> → <code>1350</code> және <code>650</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int price, qty, paid;\n    cin >> price >> qty >> paid;\n    cout << price * qty << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int price, qty, paid;\n    cin >> price >> qty >> paid;\n    int total = price * qty;\n    cout << total << endl;\n    cout << paid - total << endl;\n    return 0;\n}\n",
   "hints": [
    "Жалпы соманы <code>int total</code> айнымалысына сақтап, қайтарымды <code>paid - total</code> деп есептеңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "450 3 2000\n",
      "out": "1350\n650\n"
     },
     {
      "stdin": "1000 5 5000\n",
      "out": "5000\n0\n"
     },
     {
      "stdin": "250 4 1500\n",
      "out": "1000\n500\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Келесі жылғы жас",
   "prompt": "<p>Адамның аты (бір сөз) мен жасы берілген. <code>&lt;аты&gt; келесі жылы &lt;жас+1&gt; жаста болады.</code> деп шығарыңыз. Мысалы, <code>Dana 19</code> → <code>Dana келесі жылы 20 жаста болады.</code></p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    int age;\n    cin >> name >> age;\n    cout << name << \" келесі жылы \" << age << \" жаста болады.\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    int age;\n    cin >> name >> age;\n    cout << name << \" келесі жылы \" << age + 1 << \" жаста болады.\" << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>cout</code> ішінде тікелей <code>age + 1</code> жазуға болады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Dana 19\n",
      "out": "Dana келесі жылы 20 жаста болады.\n"
     },
     {
      "stdin": "Ерлан 7\n",
      "out": "Ерлан келесі жылы 8 жаста болады.\n"
     },
     {
      "stdin": "Saule 64\n",
      "out": "Saule келесі жылы 65 жаста болады.\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Квадрат пен куб",
   "prompt": "<p>Бүтін сан <code>n</code> берілген (|n| ≤ 1000). Бірінші жолға <code>n</code>-нің квадратын, екінші жолға кубын шығарыңыз. Мысалы, <code>3</code> → <code>9</code> және <code>27</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n * n << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n * n << endl;\n    cout << n * n * n << endl;\n    return 0;\n}\n",
   "hints": [
    "Куб — <code>n * n * n</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n",
      "out": "9\n27\n"
     },
     {
      "stdin": "-4\n",
      "out": "16\n-64\n"
     },
     {
      "stdin": "1000\n",
      "out": "1000000\n1000000000\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Автобус жол ақысы",
   "prompt": "<p>Бір жол ақысы <code>p</code> теңге, студент күніне <code>k</code> рет жүреді, <code>d</code> күн оқиды. Картасында <code>b</code> теңге бар. Бірінші жолға барлық жол ақысын (<code>p * k * d</code>), екінші жолға картада қалатын соманы шығарыңыз (теріс болуы мүмкін). Мысалы, <code>90 2 5 1000</code> → <code>900</code> және <code>100</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int p, k, d, b;\n    // кірісті оқып, екі жол шығарыңыз\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int p, k, d, b;\n    cin >> p >> k >> d >> b;\n    int total = p * k * d;\n    cout << total << endl;\n    cout << b - total << endl;\n    return 0;\n}\n",
   "hints": [
    "Төрт санды бір <code>cin</code> арқылы оқыңыз.",
    "Қалдық — <code>b - total</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "90 2 5 1000\n",
      "out": "900\n100\n"
     },
     {
      "stdin": "120 4 22 5000\n",
      "out": "10560\n-5560\n"
     },
     {
      "stdin": "80 1 1 80\n",
      "out": "80\n0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Тауар чегі",
   "prompt": "<p>Тауар атауы (бір сөз), бағасы және саны берілген. Чек жолын <code>&lt;атауы&gt; x &lt;саны&gt; = &lt;сомасы&gt; тг</code> форматында шығарыңыз. Мысалы, <code>Nan 180 3</code> → <code>Nan x 3 = 540 тг</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string item;\n    int price, qty;\n    cin >> item >> price >> qty;\n    cout << item << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string item;\n    int price, qty;\n    cin >> item >> price >> qty;\n    cout << item << \" x \" << qty << \" = \" << price * qty << \" тг\" << endl;\n    return 0;\n}\n",
   "hints": [
    "Бос орындарды мәтін ішінде жазыңыз: <code>\" x \"</code>, <code>\" = \"</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Nan 180 3\n",
      "out": "Nan x 3 = 540 тг\n"
     },
     {
      "stdin": "Sut 520 2\n",
      "out": "Sut x 2 = 1040 тг\n"
     },
     {
      "stdin": "Kitap 3500 1\n",
      "out": "Kitap x 1 = 3500 тг\n"
     }
    ]
   }
  }
 ],
 "cp-2": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Секундты минутқа",
   "prompt": "<p>Секунд саны <code>s</code> берілген (теріс емес). Оны <code>&lt;минут&gt; мин &lt;секунд&gt; сек</code> түрінде шығарыңыз. Мысалы, <code>135</code> → <code>2 мин 15 сек</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    cin >> s;\n    cout << s << \" мин 0 сек\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    cin >> s;\n    cout << s / 60 << \" мин \" << s % 60 << \" сек\" << endl;\n    return 0;\n}\n",
   "hints": [
    "Минут — <code>s / 60</code> (бүтін бөлу), қалған секунд — <code>s % 60</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "135\n",
      "out": "2 мин 15 сек\n"
     },
     {
      "stdin": "59\n",
      "out": "0 мин 59 сек\n"
     },
     {
      "stdin": "3600\n",
      "out": "60 мин 0 сек\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Цельсийден Фаренгейтке",
   "prompt": "<p>Температура Цельсий бойынша (бөлшек сан) берілген. Фаренгейтке айналдырып, ондық бөлікте 1 цифрмен шығарыңыз: <code>F = C * 9 / 5 + 32</code>. Мысалы, <code>-12.5</code> → <code>9.5</code>.</p>",
   "starter": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double c;\n    cin >> c;\n    cout << c << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double c;\n    cin >> c;\n    double f = c * 9 / 5 + 32;\n    cout << fixed << setprecision(1) << f << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>c</code> — double, сондықтан <code>c * 9 / 5</code> бөлшек болып есептеледі.",
    "<code>fixed &lt;&lt; setprecision(1)</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "-12.5\n",
      "out": "9.5\n"
     },
     {
      "stdin": "36.6\n",
      "out": "97.9\n"
     },
     {
      "stdin": "0\n",
      "out": "32.0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Соңғы цифр",
   "prompt": "<p>Теріс емес бүтін сан берілген. Оның соңғы цифрын шығарыңыз. Мысалы, <code>2025</code> → <code>5</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n % 10 << endl;\n    return 0;\n}\n",
   "hints": [
    "10-ға бөлгендегі қалдық — соңғы цифр."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2025\n",
      "out": "5\n"
     },
     {
      "stdin": "7\n",
      "out": "7\n"
     },
     {
      "stdin": "1990\n",
      "out": "0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Үлкен көбейтінді",
   "prompt": "<p>Қазақстанның бір облысында <code>a</code> отбасы бар, әр отбасы жылына <code>b</code> теңге коммуналдық төлем жасайды (1 ≤ a, b ≤ 1 000 000). Жалпы соманы шығарыңыз. Нәтиже <code>int</code> шегінен асуы мүмкін.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    int total = a * b;\n    cout << total << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long a, b;\n    cin >> a >> b;\n    long long total = a * b;\n    cout << total << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>int</code> шамамен 2.1 млрд-қа дейін ғана сақтайды.",
    "Айнымалыларды <code>long long</code> етіңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1000000 1000000\n",
      "out": "1000000000000\n"
     },
     {
      "stdin": "250000 180000\n",
      "out": "45000000000\n"
     },
     {
      "stdin": "3 4\n",
      "out": "12\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Үш бағаның орташасы",
   "prompt": "<p>Оқушының үш бағасы (бүтін сандар) берілген. Орташа бағаны ондық бөлікте 2 цифрмен шығарыңыз. Мысалы, <code>5 4 4</code> → <code>4.33</code>.</p>",
   "starter": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    cout << (a + b + c) / 3 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    double avg = (a + b + c) / 3.0;\n    cout << fixed << setprecision(2) << avg << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>/ 3</code> бүтін бөлу жасайды; <code>/ 3.0</code> не <code>static_cast&lt;double&gt;</code> қолданыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 4 4\n",
      "out": "4.33\n"
     },
     {
      "stdin": "3 3 3\n",
      "out": "3.00\n"
     },
     {
      "stdin": "5 5 4\n",
      "out": "4.67\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Теңге мен тиын",
   "prompt": "<p>Сома тиынмен берілген (1 теңге = 100 тиын, сан 10<sup>12</sup>-ға дейін болуы мүмкін). <code>&lt;теңге&gt; теңге &lt;тиын&gt; тиын</code> деп шығарыңыз. Мысалы, <code>150075</code> → <code>1500 теңге 75 тиын</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int t;\n    cin >> t;\n    cout << t << \" теңге 0 тиын\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long t;\n    cin >> t;\n    cout << t / 100 << \" теңге \" << t % 100 << \" тиын\" << endl;\n    return 0;\n}\n",
   "hints": [
    "Сан үлкен: <code>long long</code> алыңыз.",
    "Теңге — <code>t / 100</code>, тиын — <code>t % 100</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "150075\n",
      "out": "1500 теңге 75 тиын\n"
     },
     {
      "stdin": "99\n",
      "out": "0 теңге 99 тиын\n"
     },
     {
      "stdin": "500000000000\n",
      "out": "5000000000 теңге 0 тиын\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Сапар бензині",
   "prompt": "<p>Сапар ұзындығы <code>km</code> (бүтін), көліктің шығыны 100 км-ге <code>rate</code> литр (бөлшек), бір литр бензиннің бағасы <code>price</code> теңге (бүтін) берілген. Бірінші жолға қажет бензин көлемін, екінші жолға жалпы бағасын ондық бөлікте 2 цифрмен шығарыңыз. Мысалы, <code>1200 7.5 245</code> → <code>90.00</code> және <code>22050.00</code>.</p>",
   "starter": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int km, price;\n    double rate;\n    cin >> km >> rate >> price;\n    cout << km / 100 * rate << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int km, price;\n    double rate;\n    cin >> km >> rate >> price;\n    double liters = km * rate / 100;\n    cout << fixed << setprecision(2) << liters << endl;\n    cout << liters * price << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>km / 100</code> — бүтін бөлу, 150 км үшін 1 болады. Алдымен <code>km * rate</code> есептеңіз.",
    "<code>fixed &lt;&lt; setprecision(2)</code> бір рет қойылса, келесі шығыстарға да әсер етеді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1200 7.5 245\n",
      "out": "90.00\n22050.00\n"
     },
     {
      "stdin": "150 8 250\n",
      "out": "12.00\n3000.00\n"
     },
     {
      "stdin": "35 6.2 230\n",
      "out": "2.17\n499.10\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Уақыт форматы",
   "prompt": "<p>Секунд саны <code>s</code> берілген (0 ≤ s &lt; 360 000). Оны <code>H:MM:SS</code> түрінде шығарыңыз: минут пен секунд әрқашан екі цифрмен. Мысалы, <code>3725</code> → <code>1:02:05</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    cin >> s;\n    cout << s / 3600 << \":\" << s / 60 << \":\" << s % 60 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    cin >> s;\n    int h = s / 3600;\n    int m = s % 3600 / 60;\n    int sec = s % 60;\n    cout << h << \":\" << m / 10 << m % 10 << \":\" << sec / 10 << sec % 10 << endl;\n    return 0;\n}\n",
   "hints": [
    "Минут — <code>s % 3600 / 60</code>.",
    "Екі цифрды бөлек шығарыңыз: ондықтар <code>m / 10</code>, бірліктер <code>m % 10</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3725\n",
      "out": "1:02:05\n"
     },
     {
      "stdin": "59\n",
      "out": "0:00:59\n"
     },
     {
      "stdin": "86399\n",
      "out": "23:59:59\n"
     },
     {
      "stdin": "36000\n",
      "out": "10:00:00\n"
     }
    ]
   }
  }
 ],
 "cp-3": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Сөз ұзындығы",
   "prompt": "<p>Латын әріптерінен тұратын бір сөз берілген. Оның ұзындығын шығарыңыз. Мысалы, <code>Karaganda</code> → <code>9</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string w;\n    cin >> w;\n    cout << 0 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string w;\n    cin >> w;\n    cout << w.size() << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>w.size()</code> символдар санын береді (латын әріптері үшін)."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Karaganda\n",
      "out": "9\n"
     },
     {
      "stdin": "Oral\n",
      "out": "4\n"
     },
     {
      "stdin": "a\n",
      "out": "1\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Бірінші және соңғы әріп",
   "prompt": "<p>Латынша бір сөз берілген. Оның бірінші және соңғы әрпін бос орын арқылы шығарыңыз. Мысалы, <code>Almaty</code> → <code>A y</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string w;\n    cin >> w;\n    cout << w[0] << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string w;\n    cin >> w;\n    cout << w[0] << \" \" << w[w.size() - 1] << endl;\n    return 0;\n}\n",
   "hints": [
    "Соңғы символдың индексі — <code>w.size() - 1</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Almaty\n",
      "out": "A y\n"
     },
     {
      "stdin": "Oskemen\n",
      "out": "O n\n"
     },
     {
      "stdin": "x\n",
      "out": "x x\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Бас әріппен бастау",
   "prompt": "<p>Кіші латын әріптерімен жазылған бір сөз берілген. Бірінші әрпін бас әріпке айналдырып шығарыңыз. Мысалы, <code>turkistan</code> → <code>Turkistan</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string w;\n    cin >> w;\n    cout << w << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string w;\n    cin >> w;\n    w[0] = toupper(w[0]);\n    cout << w << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>string</code> өзгермелі: <code>w[0] = toupper(w[0]);</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "turkistan\n",
      "out": "Turkistan\n"
     },
     {
      "stdin": "aktobe\n",
      "out": "Aktobe\n"
     },
     {
      "stdin": "b\n",
      "out": "B\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Пошта домені",
   "prompt": "<p>Электрондық пошта адресі берілген (ішінде дәл бір <code>@</code> бар). <code>@</code> белгісінен кейінгі бөлікті (доменді) шығарыңыз. Мысалы, <code>aida@mail.kz</code> → <code>mail.kz</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string email;\n    cin >> email;\n    cout << email << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string email;\n    cin >> email;\n    int at = email.find(\"@\");\n    cout << email.substr(at + 1) << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>email.find(\"@\")</code> белгінің позициясын береді.",
    "<code>substr(pos)</code> — <code>pos</code>-тан жолдың соңына дейін."
   ],
   "check": {
    "cases": [
     {
      "stdin": "aida@mail.kz\n",
      "out": "mail.kz\n"
     },
     {
      "stdin": "erlan.s@gmail.com\n",
      "out": "gmail.com\n"
     },
     {
      "stdin": "a@b\n",
      "out": "b\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Цифрлар қосындысы (жол)",
   "prompt": "<p>Ұзын сан жол ретінде берілген (100 цифрға дейін, <code>long long</code>-қа сыймауы мүмкін). Оның цифрларының қосындысын шығарыңыз. Мысалы, <code>98765</code> → <code>35</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string num;\n    cin >> num;\n    int sum = 0;\n    cout << sum << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string num;\n    cin >> num;\n    int sum = 0;\n    for (char c : num) sum += c - '0';\n    cout << sum << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>for (char c : num)</code> әр цифрды береді.",
    "Символды санға айналдыру: <code>c - '0'</code>."
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
      "stdin": "11111111111111111111111111111111111111111111111111\n",
      "out": "50\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Мекенжай және пәтер",
   "prompt": "<p>Бірінші жолда пәтер нөмірі (бүтін), екінші жолда бос орындары бар толық мекенжай берілген. <code>&lt;мекенжай&gt;, &lt;нөмір&gt;-пәтер</code> деп шығарыңыз. Мысалы, <code>12</code> және <code>Abai dangyly 150</code> → <code>Abai dangyly 150, 12-пәтер</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int flat;\n    string address;\n    cin >> flat;\n    getline(cin, address);\n    cout << address << \", \" << flat << \"-пәтер\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int flat;\n    string address;\n    cin >> flat;\n    cin.ignore();\n    getline(cin, address);\n    cout << address << \", \" << flat << \"-пәтер\" << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>cin &gt;&gt; flat</code> жол соңындағы <code>\\n</code>-ді қалдырады.",
    "Арасына <code>cin.ignore();</code> қойыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "12\nAbai dangyly 150\n",
      "out": "Abai dangyly 150, 12-пәтер\n"
     },
     {
      "stdin": "7\nKunaev koshesi 5\n",
      "out": "Kunaev koshesi 5, 7-пәтер\n"
     },
     {
      "stdin": "101\nMangilik El 33\n",
      "out": "Mangilik El 33, 101-пәтер\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Аты-жөннің инициалдары",
   "prompt": "<p>Бір жолда бір бос орынмен бөлінген бірнеше сөз (латынша) берілген. Әр сөздің бірінші әрпін бас әріппен және нүктемен шығарыңыз. Мысалы, <code>nursultan abishuly nazarov</code> → <code>N.A.N.</code></p>",
   "starter": "#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    string res = \"\";\n    cout << res << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    string res = \"\";\n    bool start = true;\n    for (char c : line) {\n        if (c == ' ') { start = true; continue; }\n        if (start) {\n            res += char(toupper(c));\n            res += '.';\n            start = false;\n        }\n    }\n    cout << res << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>bool start</code> айнымалысы «келесі символ — жаңа сөздің басы» дегенді сақтасын.",
    "Бос орынды көргенде <code>start = true</code>; әйтпесе <code>start</code> ақиқат болса, әріпті қосыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "nursultan abishuly nazarov\n",
      "out": "N.A.N.\n"
     },
     {
      "stdin": "Aigerim Sadykova\n",
      "out": "A.S.\n"
     },
     {
      "stdin": "kazakhstan\n",
      "out": "K.\n"
     },
     {
      "stdin": "a b c d\n",
      "out": "A.B.C.D.\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Телефон нөмірін жасыру",
   "prompt": "<p>Телефон нөмірі берілген (бос орынсыз, ұзындығы кемінде 7). Алғашқы 4 және соңғы 2 символды қалдырып, қалғанын <code>*</code> белгісімен ауыстырыңыз. Мысалы, <code>+77011234567</code> → <code>+770******67</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string phone;\n    cin >> phone;\n    cout << phone << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string phone;\n    cin >> phone;\n    int n = phone.size();\n    string res = \"\";\n    int i = 0;\n    for (char c : phone) {\n        if (i >= 4 && i < n - 2) res += '*';\n        else res += c;\n        i++;\n    }\n    cout << res << endl;\n    return 0;\n}\n",
   "hints": [
    "Символдың индексін санап отыру үшін <code>int i</code> айнымалысын әр қадамда арттырыңыз.",
    "<code>substr</code> арқылы да шешуге болады: басы, жұлдызшалар, соңы."
   ],
   "check": {
    "cases": [
     {
      "stdin": "+77011234567\n",
      "out": "+770******67\n"
     },
     {
      "stdin": "87272505050\n",
      "out": "8727*****50\n"
     },
     {
      "stdin": "1234567\n",
      "out": "1234*67\n"
     }
    ]
   }
  }
 ],
 "cp-4": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Жұп па, тақ па",
   "prompt": "<p>Бүтін сан берілген (теріс болуы мүмкін). Жұп болса <code>Жұп</code>, тақ болса <code>Тақ</code> деп шығарыңыз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << \"Жұп\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    if (n % 2 == 0) cout << \"Жұп\" << endl;\n    else cout << \"Тақ\" << endl;\n    return 0;\n}\n",
   "hints": [
    "Теріс тақ санда <code>n % 2</code> мәні <code>-1</code> болады, сондықтан <code>== 0</code> арқылы тексерген сенімді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n",
      "out": "Жұп\n"
     },
     {
      "stdin": "7\n",
      "out": "Тақ\n"
     },
     {
      "stdin": "-3\n",
      "out": "Тақ\n"
     },
     {
      "stdin": "0\n",
      "out": "Жұп\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Емтихан нәтижесі",
   "prompt": "<p>Емтихан балы (0–100) берілген. 50 және одан жоғары болса <code>Өтті</code>, әйтпесе <code>Өтпеді</code> деп шығарыңыз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int score;\n    cin >> score;\n    cout << \"Өтті\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int score;\n    cin >> score;\n    if (score >= 50) cout << \"Өтті\" << endl;\n    else cout << \"Өтпеді\" << endl;\n    return 0;\n}\n",
   "hints": [
    "Шекараға назар аударыңыз: 50 — <code>Өтті</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "50\n",
      "out": "Өтті\n"
     },
     {
      "stdin": "49\n",
      "out": "Өтпеді\n"
     },
     {
      "stdin": "100\n",
      "out": "Өтті\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Арзанын таңдау",
   "prompt": "<p>Екі дүкендегі бір тауардың бағасы берілген. Арзанырағын шығарыңыз; тең болса — сол мәнді. Тернарлы оператор <code>? :</code> қолданып көріңіз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    int cheap = (a < b) ? a : b;\n    cout << cheap << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>(a &lt; b) ? a : b</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "1200 950\n",
      "out": "950\n"
     },
     {
      "stdin": "500 700\n",
      "out": "500\n"
     },
     {
      "stdin": "300 300\n",
      "out": "300\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Кібісе жыл",
   "prompt": "<p>Жыл берілген. Кібісе жыл болса <code>Иә</code>, әйтпесе <code>Жоқ</code> деп шығарыңыз. Ереже: 4-ке бөлінеді және 100-ге бөлінбейді, <b>немесе</b> 400-ге бөлінеді.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int y;\n    cin >> y;\n    if (y % 4 == 0) cout << \"Иә\" << endl;\n    else cout << \"Жоқ\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int y;\n    cin >> y;\n    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) cout << \"Иә\" << endl;\n    else cout << \"Жоқ\" << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>&amp;&amp;</code> мен <code>||</code> біріктіріңіз, жақшаны ұмытпаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2024\n",
      "out": "Иә\n"
     },
     {
      "stdin": "1900\n",
      "out": "Жоқ\n"
     },
     {
      "stdin": "2000\n",
      "out": "Иә\n"
     },
     {
      "stdin": "2023\n",
      "out": "Жоқ\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Қарапайым калькулятор",
   "prompt": "<p>Бір жолда <code>a op b</code> берілген: <code>a</code>, <code>b</code> — бүтін сандар, <code>op</code> — <code>+ - * /</code> символдарының бірі. Нәтижені шығарыңыз (<code>/</code> — бүтін бөлу). Нөлге бөлу не белгісіз амал болса, <code>Қате</code> деп шығарыңыз. <code>switch</code> қолданыңыз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    char op;\n    cin >> a >> op >> b;\n    cout << a + b << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    char op;\n    cin >> a >> op >> b;\n    switch (op) {\n        case '+': cout << a + b << endl; break;\n        case '-': cout << a - b << endl; break;\n        case '*': cout << a * b << endl; break;\n        case '/':\n            if (b == 0) cout << \"Қате\" << endl;\n            else cout << a / b << endl;\n            break;\n        default: cout << \"Қате\" << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>cin &gt;&gt; a &gt;&gt; op &gt;&gt; b;</code> — <code>op</code> char болғандықтан бір символ оқылады.",
    "Әр <code>case</code> соңында <code>break</code> қойыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "7 + 5\n",
      "out": "12\n"
     },
     {
      "stdin": "7 - 10\n",
      "out": "-3\n"
     },
     {
      "stdin": "6 * 7\n",
      "out": "42\n"
     },
     {
      "stdin": "17 / 5\n",
      "out": "3\n"
     },
     {
      "stdin": "3 / 0\n",
      "out": "Қате\n"
     },
     {
      "stdin": "2 % 3\n",
      "out": "Қате\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Бес балдық баға",
   "prompt": "<p>Тест балы берілген. 90–100 → <code>5</code>, 75–89 → <code>4</code>, 50–74 → <code>3</code>, 0–49 → <code>2</code>. Балл 0-ден кіші не 100-ден үлкен болса, <code>Қате</code> деп шығарыңыз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    cin >> s;\n    if (s >= 90) cout << 5 << endl;\n    else cout << 2 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    cin >> s;\n    if (s < 0 || s > 100) cout << \"Қате\" << endl;\n    else if (s >= 90) cout << 5 << endl;\n    else if (s >= 75) cout << 4 << endl;\n    else if (s >= 50) cout << 3 << endl;\n    else cout << 2 << endl;\n    return 0;\n}\n",
   "hints": [
    "Алдымен қате мәнді тексеріңіз, сосын <code>else if</code> тізбегімен жоғарыдан төмен жүріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "95\n",
      "out": "5\n"
     },
     {
      "stdin": "75\n",
      "out": "4\n"
     },
     {
      "stdin": "74\n",
      "out": "3\n"
     },
     {
      "stdin": "0\n",
      "out": "2\n"
     },
     {
      "stdin": "101\n",
      "out": "Қате\n"
     },
     {
      "stdin": "-5\n",
      "out": "Қате\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Үшбұрыш түрі",
   "prompt": "<p>Үшбұрыштың үш қабырғасы (оң бүтін сандар) берілген. Мұндай үшбұрыш болмаса (кез келген екі қабырғаның қосындысы үшіншісінен қатаң үлкен болуы керек) <code>Үшбұрыш емес</code>, үш қабырғасы тең болса <code>Тең қабырғалы</code>, тек екеуі тең болса <code>Тең бүйірлі</code>, әйтпесе <code>Әртүрлі қабырғалы</code> деп шығарыңыз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    if (a == b && b == c) cout << \"Тең қабырғалы\" << endl;\n    else cout << \"Әртүрлі қабырғалы\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    if (a + b <= c || a + c <= b || b + c <= a) cout << \"Үшбұрыш емес\" << endl;\n    else if (a == b && b == c) cout << \"Тең қабырғалы\" << endl;\n    else if (a == b || b == c || a == c) cout << \"Тең бүйірлі\" << endl;\n    else cout << \"Әртүрлі қабырғалы\" << endl;\n    return 0;\n}\n",
   "hints": [
    "Алдымен үшбұрыш бар-жоғын тексеріңіз: үш шарттың біреуі бұзылса жеткілікті (<code>||</code>).",
    "Тең бүйірлі: <code>a == b || b == c || a == c</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 3 3\n",
      "out": "Тең қабырғалы\n"
     },
     {
      "stdin": "5 5 8\n",
      "out": "Тең бүйірлі\n"
     },
     {
      "stdin": "3 4 5\n",
      "out": "Әртүрлі қабырғалы\n"
     },
     {
      "stdin": "1 2 3\n",
      "out": "Үшбұрыш емес\n"
     },
     {
      "stdin": "2 7 2\n",
      "out": "Үшбұрыш емес\n"
     },
     {
      "stdin": "10 6 6\n",
      "out": "Тең бүйірлі\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Такси тарифі",
   "prompt": "<p>Такси бағасы: қашықтық <code>km</code> (бүтін), тариф әрпі және түнгі белгі (<code>1</code> — түн, <code>0</code> — күндіз) берілген. Тарифтер: <code>E</code> — 500 + 120·km, <code>C</code> — 800 + 180·km, <code>B</code> — 1500 + 300·km. Түнде баға 20%-ға қымбаттайды (<code>баға * 12 / 10</code>, бүтін бөлу). Тариф белгісіз болса <code>Қате</code> деп шығарыңыз. Тарифті <code>switch</code> арқылы таңдаңыз. Мысалы, <code>10 E 1</code> → <code>2040</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int km, night;\n    char t;\n    cin >> km >> t >> night;\n    cout << 500 + 120 * km << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int km, night;\n    char t;\n    cin >> km >> t >> night;\n    int price = 0;\n    bool ok = true;\n    switch (t) {\n        case 'E': price = 500 + 120 * km; break;\n        case 'C': price = 800 + 180 * km; break;\n        case 'B': price = 1500 + 300 * km; break;\n        default: ok = false;\n    }\n    if (!ok) {\n        cout << \"Қате\" << endl;\n    } else {\n        if (night == 1) price = price * 12 / 10;\n        cout << price << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>switch</code> ішінде тек бағаны есептеңіз, түнгі үстемені одан кейін қосыңыз.",
    "Белгісіз тарифті <code>default</code> ұстайды: <code>bool ok</code> айнымалысын жалған етіңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "10 E 1\n",
      "out": "2040\n"
     },
     {
      "stdin": "10 E 0\n",
      "out": "1700\n"
     },
     {
      "stdin": "5 C 0\n",
      "out": "1700\n"
     },
     {
      "stdin": "7 B 1\n",
      "out": "4320\n"
     },
     {
      "stdin": "3 X 0\n",
      "out": "Қате\n"
     }
    ]
   }
  }
 ],
 "cp-5": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Көбейту кестесі",
   "prompt": "<p>Сан <code>n</code> берілген. Оның 1-ден 10-ға дейінгі көбейту кестесін шығарыңыз: әр жолда <code>n x i = n·i</code>. Мысалы, <code>3</code> үшін бірінші жол <code>3 x 1 = 3</code>, соңғысы <code>3 x 10 = 30</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n << \" x 1 = \" << n << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= 10; i++) {\n        cout << n << \" x \" << i << \" = \" << n * i << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>for (int i = 1; i &lt;= 10; i++)</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n",
      "out": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30\n"
     },
     {
      "stdin": "7\n",
      "out": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70\n"
     },
     {
      "stdin": "12\n",
      "out": "12 x 1 = 12\n12 x 2 = 24\n12 x 3 = 36\n12 x 4 = 48\n12 x 5 = 60\n12 x 6 = 72\n12 x 7 = 84\n12 x 8 = 96\n12 x 9 = 108\n12 x 10 = 120\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Жұп сандарды тізу",
   "prompt": "<p><code>n</code> берілген (n ≥ 2). 2-ден <code>n</code>-ге дейінгі барлық жұп сандарды бір жолға бос орын арқылы шығарыңыз. Мысалы, <code>9</code> → <code>2 4 6 8</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) cout << i << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 2; i <= n; i += 2) cout << i << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "Қадамды 2 етіңіз: <code>i += 2</code>.",
    "Жол соңындағы артық бос орын тексеруде есепке алынбайды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "9\n",
      "out": "2 4 6 8 \n"
     },
     {
      "stdin": "2\n",
      "out": "2 \n"
     },
     {
      "stdin": "12\n",
      "out": "2 4 6 8 10 12 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Оң сандар саны",
   "prompt": "<p>Күндік температуралар (бүтін сандар) кіріс біткенше беріледі. Олардың ішінде 0-ден қатаң үлкендерінің санын шығарыңыз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, cnt = 0;\n    cin >> x;\n    if (x > 0) cnt++;\n    cout << cnt << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, cnt = 0;\n    while (cin >> x) {\n        if (x > 0) cnt++;\n    }\n    cout << cnt << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>while (cin &gt;&gt; x)</code> кіріс біткенше оқиды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "-5 3 0 12 -1 7\n",
      "out": "3\n"
     },
     {
      "stdin": "-1 -2\n",
      "out": "0\n"
     },
     {
      "stdin": "1\n2\n3\n4\n",
      "out": "4\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Цифрлар саны",
   "prompt": "<p>Теріс емес бүтін сан <code>n</code> берілген (<code>long long</code>-қа сыяды). Оның неше цифрдан тұратынын цикл арқылы есептеңіз. <code>0</code> — бір цифр.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    int cnt = 0;\n    while (n > 0) {\n        n /= 10;\n        cnt++;\n    }\n    cout << cnt << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    int cnt = 0;\n    do {\n        n /= 10;\n        cnt++;\n    } while (n > 0);\n    cout << cnt << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>while</code> циклі <code>n = 0</code> үшін бірде-бір рет орындалмайды.",
    "<code>do { ... } while (n &gt; 0);</code> кемінде бір рет орындалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "12345\n",
      "out": "5\n"
     },
     {
      "stdin": "0\n",
      "out": "1\n"
     },
     {
      "stdin": "9000000000000000000\n",
      "out": "19\n"
     },
     {
      "stdin": "7\n",
      "out": "1\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Жинақ мақсаты",
   "prompt": "<p>Депозитте <code>s</code> теңге бар, жыл сайын оған <code>p</code>% өсім қосылады (өсім бүтін бөлумен есептеледі: <code>s += s * p / 100</code>). Сома кемінде <code>target</code> болу үшін неше жыл керек? Мысалы, <code>100000 10 150000</code> → <code>5</code>. (s ≥ 1, p ≥ 1, барлық мәндер <code>long long</code>-қа сыяды.)</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long s, p, target;\n    cin >> s >> p >> target;\n    cout << 0 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long s, p, target;\n    cin >> s >> p >> target;\n    int years = 0;\n    while (s < target) {\n        s += s * p / 100;\n        years++;\n    }\n    cout << years << endl;\n    return 0;\n}\n",
   "hints": [
    "Сома мақсаттан аз болғанша <code>while</code> циклін жүргізіңіз.",
    "Басында сома жеткілікті болса, жауап 0."
   ],
   "check": {
    "cases": [
     {
      "stdin": "100000 10 150000\n",
      "out": "5\n"
     },
     {
      "stdin": "500000 14 500000\n",
      "out": "0\n"
     },
     {
      "stdin": "1000 100 1000000\n",
      "out": "10\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Жай сан тексеру",
   "prompt": "<p>Бүтін сан <code>n</code> берілген (1 ≤ n ≤ 10<sup>9</sup>). Жай сан болса <code>YES</code>, әйтпесе <code>NO</code> шығарыңыз. 1 — жай сан емес. Бөлгіштерді <code>i * i &lt;= n</code> болғанша тексеріңіз, бөлгіш табылса <code>break</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    bool prime = true;\n    cout << (prime ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    bool prime = n >= 2;\n    for (long long i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            prime = false;\n            break;\n        }\n    }\n    cout << (prime ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>n</code>-нің бөлгіші болса, оның біреуі √n-нен аспайды.",
    "<code>i * i</code> үлкен болуы мүмкін — <code>long long</code> алыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "17\n",
      "out": "YES\n"
     },
     {
      "stdin": "1\n",
      "out": "NO\n"
     },
     {
      "stdin": "1000000007\n",
      "out": "YES\n"
     },
     {
      "stdin": "999999999\n",
      "out": "NO\n"
     },
     {
      "stdin": "2\n",
      "out": "YES\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Сандар пирамидасы",
   "prompt": "<p><code>n</code> берілген. <code>n</code> жолдан тұратын пирамида шығарыңыз: <code>i</code>-жолда 1-ден <code>i</code>-ге дейін өсіп, қайта 1-ге дейін кемитін сандар, бос орын арқылы. Мысалы, <code>n = 3</code>:</p><pre>1\n1 2 1\n1 2 3 2 1</pre>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) cout << j << \" \";\n        cout << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) cout << j << \" \";\n        for (int j = i - 1; j >= 1; j--) cout << j << \" \";\n        cout << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "Әр жолда екі ішкі цикл: біріншісі 1..i өседі, екіншісі i−1..1 кемиді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n",
      "out": "1 \n1 2 1 \n1 2 3 2 1 \n"
     },
     {
      "stdin": "1\n",
      "out": "1 \n"
     },
     {
      "stdin": "5\n",
      "out": "1 \n1 2 1 \n1 2 3 2 1 \n1 2 3 4 3 2 1 \n1 2 3 4 5 4 3 2 1 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын жылыну",
   "prompt": "<p>Күндік температуралар кіріс біткенше беріледі (кемінде бір сан). Әр келесі күн алдыңғысынан <b>қатаң жылы</b> болатын, қатар тұрған күндердің ең ұзын тізбегінің ұзындығын шығарыңыз. Мысалы, <code>1 3 5 2 4 6 8 1</code> → <code>4</code> (<code>2 4 6 8</code>).</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    int best = 0;\n    while (cin >> x) {\n        best++;\n    }\n    cout << best << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x, prev;\n    cin >> prev;\n    int cur = 1, best = 1;\n    while (cin >> x) {\n        if (x > prev) cur++;\n        else cur = 1;\n        if (cur > best) best = cur;\n        prev = x;\n    }\n    cout << best << endl;\n    return 0;\n}\n",
   "hints": [
    "Алдыңғы мәнді <code>prev</code> айнымалысында сақтаңыз.",
    "Ағымдағы тізбек ұзындығы <code>cur</code>: жылынса артады, әйтпесе 1-ге түседі; ең үлкенін <code>best</code>-ке жазыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 3 5 2 4 6 8 1\n",
      "out": "4\n"
     },
     {
      "stdin": "5 4 3 2\n",
      "out": "1\n"
     },
     {
      "stdin": "7\n",
      "out": "1\n"
     },
     {
      "stdin": "-3 -2 -1 0 0 1\n",
      "out": "4\n"
     }
    ]
   }
  }
 ],
 "cp-6": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Куб функциясы",
   "prompt": "<p><code>long long cube(int x)</code> функциясын жазыңыз: ол <code>x</code>-тің кубын қайтарсын (|x| ≤ 100 000, нәтиже <code>int</code>-ке сыймауы мүмкін). <code>main</code> дайын.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nlong long cube(int x) {\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << cube(n) << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nlong long cube(int x) {\n    long long v = x;\n    return v * v * v;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << cube(n) << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>x * x * x</code> int-те есептеліп overflow болады. Алдымен <code>long long v = x;</code> жасаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n",
      "out": "27\n"
     },
     {
      "stdin": "-5\n",
      "out": "-125\n"
     },
     {
      "stdin": "100000\n",
      "out": "1000000000000000\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Әдепкі аргумент",
   "prompt": "<p><code>void greet(string name, string greeting = \"Сәлем\")</code> функциясын жазыңыз: ол <code>&lt;greeting&gt;, &lt;name&gt;!</code> деп шығарсын. <code>main</code> дайын: атты және сәлемдесу сөзін оқып, функцияны алдымен бір аргументпен, сосын екі аргументпен шақырады. Мысалы, <code>Ali Salem</code> → <code>Сәлем, Ali!</code> және <code>Salem, Ali!</code></p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid greet(string name, string greeting = \"Сәлем\") {\n    // шығарыңыз\n}\n\nint main() {\n    string name, word;\n    cin >> name >> word;\n    greet(name);\n    greet(name, word);\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid greet(string name, string greeting = \"Сәлем\") {\n    cout << greeting << \", \" << name << \"!\" << endl;\n}\n\nint main() {\n    string name, word;\n    cin >> name >> word;\n    greet(name);\n    greet(name, word);\n    return 0;\n}\n",
   "hints": [
    "Функция ішінде тек <code>cout</code> жолы керек."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Ali Salem\n",
      "out": "Сәлем, Ali!\nSalem, Ali!\n"
     },
     {
      "stdin": "Dana Hello\n",
      "out": "Сәлем, Dana!\nHello, Dana!\n"
     },
     {
      "stdin": "Ерлан Қош\n",
      "out": "Сәлем, Ерлан!\nҚош, Ерлан!\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Жұптықты тексеретін функция",
   "prompt": "<p><code>bool isEven(int n)</code> функциясын жазыңыз: сан жұп болса <code>true</code> қайтарсын (теріс сандар да болады). <code>main</code> дайын: сандарды кіріс біткенше оқып, жұптарының санын шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nbool isEven(int n) {\n    return false;\n}\n\nint main() {\n    int x, cnt = 0;\n    while (cin >> x) {\n        if (isEven(x)) cnt++;\n    }\n    cout << cnt << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nbool isEven(int n) {\n    return n % 2 == 0;\n}\n\nint main() {\n    int x, cnt = 0;\n    while (cin >> x) {\n        if (isEven(x)) cnt++;\n    }\n    cout << cnt << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>return n % 2 == 0;</code> — салыстырудың өзі bool."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 2 3 4 5 6\n",
      "out": "3\n"
     },
     {
      "stdin": "-2 -3 0\n",
      "out": "2\n"
     },
     {
      "stdin": "7 9 11\n",
      "out": "0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Reference арқылы min мен max",
   "prompt": "<p><code>void minMax(int a, int b, int c, int&amp; mn, int&amp; mx)</code> функциясын жазыңыз: ол үш санның ең кішісін <code>mn</code>-ге, ең үлкенін <code>mx</code>-ке жазсын. <code>main</code> дайын. Мысалы, <code>5 -2 9</code> → <code>-2 9</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nvoid minMax(int a, int b, int c, int mn, int mx) {\n    mn = a;\n    mx = a;\n}\n\nint main() {\n    int a, b, c, mn, mx;\n    cin >> a >> b >> c;\n    minMax(a, b, c, mn, mx);\n    cout << mn << \" \" << mx << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nvoid minMax(int a, int b, int c, int& mn, int& mx) {\n    mn = a;\n    if (b < mn) mn = b;\n    if (c < mn) mn = c;\n    mx = a;\n    if (b > mx) mx = b;\n    if (c > mx) mx = c;\n}\n\nint main() {\n    int a, b, c, mn, mx;\n    cin >> a >> b >> c;\n    minMax(a, b, c, mn, mx);\n    cout << mn << \" \" << mx << endl;\n    return 0;\n}\n",
   "hints": [
    "Стартерде <code>mn</code>, <code>mx</code> көшіріліп беріледі — <code>&amp;</code> қосыңыз.",
    "Алдымен <code>mn = a</code>, сосын <code>b</code> мен <code>c</code>-ны салыстырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 -2 9\n",
      "out": "-2 9\n"
     },
     {
      "stdin": "4 4 4\n",
      "out": "4 4\n"
     },
     {
      "stdin": "10 20 1\n",
      "out": "1 20\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Аудан overloading",
   "prompt": "<p>Бір <code>area</code> атымен үш функция жазыңыз: <code>int area(int side)</code> — шаршы, <code>int area(int w, int h)</code> — тіктөртбұрыш, <code>double area(double r)</code> — дөңгелек (π = 3.14159). <code>main</code> дайын: <code>S a</code>, <code>R w h</code>, <code>C r</code> командаларын оқып, ауданды шығарады (дөңгелек — 2 ондық таңбамен).</p>",
   "starter": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint area(int side) {\n    return 0;\n}\n\n// тағы екі area функциясын жазыңыз\nint area(int w, int h) {\n    return 0;\n}\n\ndouble area(double r) {\n    return 0;\n}\n\nint main() {\n    char t;\n    while (cin >> t) {\n        if (t == 'S') { int a; cin >> a; cout << area(a) << endl; }\n        else if (t == 'R') { int w, h; cin >> w >> h; cout << area(w, h) << endl; }\n        else { double r; cin >> r; cout << fixed << setprecision(2) << area(r) << endl; }\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint area(int side) {\n    return side * side;\n}\n\nint area(int w, int h) {\n    return w * h;\n}\n\ndouble area(double r) {\n    return 3.14159 * r * r;\n}\n\nint main() {\n    char t;\n    while (cin >> t) {\n        if (t == 'S') { int a; cin >> a; cout << area(a) << endl; }\n        else if (t == 'R') { int w, h; cin >> w >> h; cout << area(w, h) << endl; }\n        else { double r; cin >> r; cout << fixed << setprecision(2) << area(r) << endl; }\n    }\n    return 0;\n}\n",
   "hints": [
    "Компилятор аргументтердің саны мен типіне қарап дұрыс функцияны таңдайды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "S 4\nR 2 3\nC 1\n",
      "out": "16\n6\n3.14\n"
     },
     {
      "stdin": "C 2.5\nS 10\n",
      "out": "19.63\n100\n"
     },
     {
      "stdin": "R 7 8\n",
      "out": "56\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Символды санау",
   "prompt": "<p><code>int countChar(const string&amp; text, char c)</code> функциясын жазыңыз: <code>text</code> ішінде <code>c</code> символы неше рет кездесетінін қайтарсын. <code>main</code> дайын: бірінші жолда символ, екінші жолда мәтін.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint countChar(const string& text, char c) {\n    return 0;\n}\n\nint main() {\n    char c;\n    string text;\n    cin >> c;\n    cin.ignore();\n    getline(cin, text);\n    cout << countChar(text, c) << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint countChar(const string& text, char c) {\n    int cnt = 0;\n    for (char x : text) {\n        if (x == c) cnt++;\n    }\n    return cnt;\n}\n\nint main() {\n    char c;\n    string text;\n    cin >> c;\n    cin.ignore();\n    getline(cin, text);\n    cout << countChar(text, c) << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>for (char x : text)</code> арқылы әр символды <code>c</code>-мен салыстырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "a\nalma ata baqshasy\n",
      "out": "6\n"
     },
     {
      "stdin": "z\nno match here\n",
      "out": "0\n"
     },
     {
      "stdin": "o\noqu oqu jane oqu\n",
      "out": "3\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Санды кері аудару",
   "prompt": "<p>Екі функция жазыңыз: <code>int reverseNum(int n)</code> — теріс емес санның цифрларын кері ретпен жазып қайтарады (<code>1200</code> → <code>21</code>), <code>bool isPalindrome(int n)</code> — <code>reverseNum</code> арқылы сан палиндром ба, соны тексереді. <code>main</code> дайын: әр сан үшін <code>n кері YES/NO</code> шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint reverseNum(int n) {\n    return n;\n}\n\nbool isPalindrome(int n) {\n    return false;\n}\n\nint main() {\n    int n;\n    while (cin >> n) {\n        cout << n << \" \" << reverseNum(n) << \" \" << (isPalindrome(n) ? \"YES\" : \"NO\") << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint reverseNum(int n) {\n    int r = 0;\n    while (n > 0) {\n        r = r * 10 + n % 10;\n        n /= 10;\n    }\n    return r;\n}\n\nbool isPalindrome(int n) {\n    return reverseNum(n) == n;\n}\n\nint main() {\n    int n;\n    while (cin >> n) {\n        cout << n << \" \" << reverseNum(n) << \" \" << (isPalindrome(n) ? \"YES\" : \"NO\") << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "Цикл: <code>r = r * 10 + n % 10; n /= 10;</code>",
    "Палиндром — кері саны өзіне тең сан."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1200\n12321\n",
      "out": "1200 21 NO\n12321 12321 YES\n"
     },
     {
      "stdin": "7 45 0\n",
      "out": "7 7 YES\n45 54 NO\n0 0 YES\n"
     },
     {
      "stdin": "1001 123\n",
      "out": "1001 1001 YES\n123 321 NO\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Бөлшекті қысқарту",
   "prompt": "<p>Екі функция жазыңыз: <code>int gcd(int a, int b)</code> — екі оң санның ең үлкен ортақ бөлгіші (Евклид алгоритмі: <code>b</code> нөл болғанша <code>(a, b) → (b, a % b)</code>), <code>void reduce(int&amp; num, int&amp; den)</code> — бөлшекті ортақ бөлгішке бөліп қысқартады. <code>main</code> дайын. Мысалы, <code>12 18</code> → <code>2/3</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint gcd(int a, int b) {\n    return 1;\n}\n\nvoid reduce(int num, int den) {\n}\n\nint main() {\n    int num, den;\n    cin >> num >> den;\n    reduce(num, den);\n    cout << num << \"/\" << den << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint gcd(int a, int b) {\n    while (b != 0) {\n        int t = a % b;\n        a = b;\n        b = t;\n    }\n    return a;\n}\n\nvoid reduce(int& num, int& den) {\n    int g = gcd(num, den);\n    num /= g;\n    den /= g;\n}\n\nint main() {\n    int num, den;\n    cin >> num >> den;\n    reduce(num, den);\n    cout << num << \"/\" << den << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>reduce</code> параметрлері reference болуы керек — әйтпесе <code>main</code> өзгерісті көрмейді.",
    "Евклид: <code>while (b != 0) { int t = a % b; a = b; b = t; }</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "12 18\n",
      "out": "2/3\n"
     },
     {
      "stdin": "7 13\n",
      "out": "7/13\n"
     },
     {
      "stdin": "100 25\n",
      "out": "4/1\n"
     },
     {
      "stdin": "45 60\n",
      "out": "3/4\n"
     }
    ]
   }
  }
 ],
 "cp-7": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Ең арзан және ең қымбат",
   "prompt": "<p><code>n</code>, сосын <code>n</code> тауардың бағасы берілген. Ең кіші және ең үлкен бағаны бос орын арқылы шығарыңыз. Мысалы, <code>4</code> / <code>500 120 990 300</code> → <code>120 990</code>.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    cout << a[0] << \" \" << a[0] << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int mn = a[0], mx = a[0];\n    for (int x : a) {\n        if (x < mn) mn = x;\n        if (x > mx) mx = x;\n    }\n    cout << mn << \" \" << mx << endl;\n    return 0;\n}\n",
   "hints": [
    "Бастапқы мән ретінде <code>a[0]</code> алыңыз, сосын барлық элементті салыстырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n500 120 990 300\n",
      "out": "120 990\n"
     },
     {
      "stdin": "1\n777\n",
      "out": "777 777\n"
     },
     {
      "stdin": "5\n-3 -8 0 -1 -8\n",
      "out": "-8 0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Жұп элементтер",
   "prompt": "<p><code>n</code>, сосын <code>n</code> бүтін сан берілген. Жұп элементтерді бастапқы ретімен бір жолға бос орын арқылы шығарыңыз. Жұп сан жоқ болса, <code>NONE</code> шығарыңыз.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    cout << \"NONE\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    vector<int> ev;\n    for (int x : a) {\n        if (x % 2 == 0) ev.push_back(x);\n    }\n    if (ev.size() == 0) {\n        cout << \"NONE\" << endl;\n    } else {\n        for (int x : ev) cout << x << \" \";\n        cout << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "Жұптарды жаңа векторға <code>push_back</code> арқылы жинаңыз.",
    "Вектор бос болса, <code>NONE</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\n1 2 3 4 5 6\n",
      "out": "2 4 6 \n"
     },
     {
      "stdin": "3\n1 3 5\n",
      "out": "NONE\n"
     },
     {
      "stdin": "4\n-2 7 0 9\n",
      "out": "-2 0 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Апталық жауын-шашын",
   "prompt": "<p>Аптаның 7 күніндегі жауын-шашын мөлшері (мм, бүтін) берілген. Бірінші жолға апталық жалпы мөлшерді, екінші жолға ең көп жауын болған күннің нөмірін (1–7; тең болса — ертерегі) шығарыңыз. C-массив <code>int a[7]</code> қолдануға болады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[7];\n    for (int i = 0; i < 7; i++) cin >> a[i];\n    int total = 0;\n    cout << total << endl;\n    cout << 1 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[7];\n    for (int i = 0; i < 7; i++) cin >> a[i];\n    int total = 0, best = 0;\n    for (int i = 0; i < 7; i++) {\n        total += a[i];\n        if (a[i] > a[best]) best = i;\n    }\n    cout << total << endl;\n    cout << best + 1 << endl;\n    return 0;\n}\n",
   "hints": [
    "Ең үлкеннің <b>индексін</b> сақтаңыз: <code>if (a[i] &gt; a[best]) best = i;</code>",
    "Күн нөмірі 1-ден басталады: <code>best + 1</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "0 5 12 3 12 0 1\n",
      "out": "33\n3\n"
     },
     {
      "stdin": "1 1 1 1 1 1 1\n",
      "out": "7\n1\n"
     },
     {
      "stdin": "0 0 0 0 0 0 9\n",
      "out": "9\n7\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Циклдік ығысу",
   "prompt": "<p><code>n</code> және <code>k</code>, сосын <code>n</code> сан берілген. Массивті оңға қарай <code>k</code> қадамға циклдік жылжытып шығарыңыз (<code>k</code> мәні <code>n</code>-нен үлкен болуы мүмкін). Мысалы, <code>5 2</code> / <code>1 2 3 4 5</code> → <code>4 5 1 2 3</code>.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int x : a) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    vector<int> b(n);\n    for (int i = 0; i < n; i++) b[(i + k) % n] = a[i];\n    for (int x : b) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>i</code>-элемент жаңа массивте <code>(i + k) % n</code> орнына түседі."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 2\n1 2 3 4 5\n",
      "out": "4 5 1 2 3 \n"
     },
     {
      "stdin": "3 7\n10 20 30\n",
      "out": "30 10 20 \n"
     },
     {
      "stdin": "4 0\n9 8 7 6\n",
      "out": "9 8 7 6 \n"
     },
     {
      "stdin": "1 100\n42\n",
      "out": "42 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Кесте қосындылары",
   "prompt": "<p><code>n m</code>, сосын <code>n × m</code> кесте берілген (сыныптар × апта күндері бойынша оқушылар келуі). Алдымен әр жолдың қосындысын жеке жолға, соңында бір жолға бос орын арқылы әр бағанның қосындысын шығарыңыз. <code>vector&lt;vector&lt;int&gt;&gt;</code> қолданыңыз.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g(n, vector<int>(m));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) cin >> g[i][j];\n    // жол және баған қосындылары\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g(n, vector<int>(m));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) cin >> g[i][j];\n    vector<int> col(m, 0);\n    for (int i = 0; i < n; i++) {\n        int row = 0;\n        for (int j = 0; j < m; j++) {\n            row += g[i][j];\n            col[j] += g[i][j];\n        }\n        cout << row << endl;\n    }\n    for (int j = 0; j < m; j++) cout << col[j] << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "Баған қосындыларын <code>vector&lt;int&gt; col(m, 0)</code> ішінде жинаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2 3\n1 2 3\n4 5 6\n",
      "out": "6\n15\n5 7 9 \n"
     },
     {
      "stdin": "1 1\n7\n",
      "out": "7\n7 \n"
     },
     {
      "stdin": "3 2\n25 24\n30 28\n0 1\n",
      "out": "49\n58\n1\n55 53 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Қайталанатын мәндер",
   "prompt": "<p><code>n</code>, сосын 0-ден 100-ге дейінгі <code>n</code> сан (оқушылардың балдары) берілген. Бірден көп рет кездесетін мәндерді өсу ретімен бір жолға шығарыңыз. Ондай жоқ болса — <code>NONE</code>. Кеңес: <code>vector&lt;int&gt; cnt(101, 0)</code> санауыш массиві.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> cnt(101, 0);\n    cout << \"NONE\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> cnt(101, 0);\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        cnt[x]++;\n    }\n    bool any = false;\n    for (int v = 0; v <= 100; v++) {\n        if (cnt[v] > 1) {\n            cout << v << \" \";\n            any = true;\n        }\n    }\n    if (!any) cout << \"NONE\";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "Әр мәнді оқып, <code>cnt[x]++</code> жасаңыз.",
    "Сосын 0..100 бойынша жүріп, <code>cnt[v] &gt; 1</code> мәндерді шығарыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "7\n90 75 90 100 75 75 60\n",
      "out": "75 90 \n"
     },
     {
      "stdin": "3\n1 2 3\n",
      "out": "NONE\n"
     },
     {
      "stdin": "4\n0 0 100 100\n",
      "out": "0 100 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Аралық қосындысы",
   "prompt": "<p><code>n</code> күндік табыс (теңге) және <code>q</code> сұрау берілген. Әр сұрау <code>l r</code> (1-ден, l ≤ r) үшін <code>l</code>-ден <code>r</code>-ге дейінгі күндердің жалпы табысын жеке жолға шығарыңыз. n, q ≤ 100 000, сондықтан префикс қосындыларын (<code>long long</code>) алдын ала есептеңіз: <code>pre[i]</code> — алғашқы <code>i</code> күннің қосындысы.</p><p>Кіріс: <code>n q</code>, сосын <code>n</code> сан, сосын <code>q</code> жол.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, q;\n    cin >> n >> q;\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int k = 0; k < q; k++) {\n        int l, r;\n        cin >> l >> r;\n        cout << 0 << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, q;\n    cin >> n >> q;\n    vector<long long> pre(n + 1, 0);\n    for (int i = 1; i <= n; i++) {\n        long long x;\n        cin >> x;\n        pre[i] = pre[i - 1] + x;\n    }\n    for (int k = 0; k < q; k++) {\n        int l, r;\n        cin >> l >> r;\n        cout << pre[r] - pre[l - 1] << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>pre[i] = pre[i - 1] + a[i]</code>, <code>pre[0] = 0</code>.",
    "Жауап — <code>pre[r] - pre[l - 1]</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 3\n100 200 300 400 500\n1 5\n2 3\n4 4\n",
      "out": "1500\n500\n400\n"
     },
     {
      "stdin": "3 2\n2000000000 2000000000 2000000000\n1 3\n2 3\n",
      "out": "6000000000\n4000000000\n"
     },
     {
      "stdin": "1 1\n-7\n1 1\n",
      "out": "-7\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Матрицаны бұру",
   "prompt": "<p><code>n</code>, сосын <code>n × n</code> матрица берілген. Оны сағат тілімен 90°-қа бұрып шығарыңыз (әр жол — бос орын арқылы). Мысалы:</p><pre>1 2      3 1\n3 4  →   4 2</pre>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<vector<int>> a(n, vector<int>(n));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n; j++) cin >> a[i][j];\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) cout << a[i][j] << \" \";\n        cout << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<vector<int>> a(n, vector<int>(n));\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n; j++) cin >> a[i][j];\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) cout << a[n - 1 - j][i] << \" \";\n        cout << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "Жаңа матрицаның <code>i</code>-жолы — ескісінің <code>i</code>-бағаны, төменнен жоғары қарай оқылған.",
    "Яғни <code>b[i][j] = a[n - 1 - j][i]</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\n1 2\n3 4\n",
      "out": "3 1 \n4 2 \n"
     },
     {
      "stdin": "3\n1 2 3\n4 5 6\n7 8 9\n",
      "out": "7 4 1 \n8 5 2 \n9 6 3 \n"
     },
     {
      "stdin": "1\n5\n",
      "out": "5 \n"
     }
    ]
   }
  }
 ],
 "cp-8": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Pointer арқылы екі есе",
   "prompt": "<p><code>void doubleIt(int* p)</code> функциясын жазыңыз: ол pointer көрсететін мәнді екі есе арттырсын. <code>main</code> дайын: санды оқып, <code>doubleIt(&amp;x)</code> шақырады да, <code>x</code>-ті шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nvoid doubleIt(int* p) {\n    // *p арқылы мәнді өзгертіңіз\n}\n\nint main() {\n    int x;\n    cin >> x;\n    doubleIt(&x);\n    cout << x << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nvoid doubleIt(int* p) {\n    *p *= 2;\n}\n\nint main() {\n    int x;\n    cin >> x;\n    doubleIt(&x);\n    cout << x << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>*p</code> — адрестегі мәннің өзі: <code>*p *= 2;</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "21\n",
      "out": "42\n"
     },
     {
      "stdin": "-4\n",
      "out": "-8\n"
     },
     {
      "stdin": "0\n",
      "out": "0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Pointer арқылы ауыстыру",
   "prompt": "<p><code>void swapPtr(int* a, int* b)</code> функциясын жазыңыз: ол екі pointer көрсететін мәндерді орнымен ауыстырсын. <code>main</code> дайын. Мысалы, <code>3 8</code> → <code>8 3</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nvoid swapPtr(int* a, int* b) {\n    int* t = a;\n    a = b;\n    b = t;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    swapPtr(&a, &b);\n    cout << a << \" \" << b << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nvoid swapPtr(int* a, int* b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    swapPtr(&a, &b);\n    cout << a << \" \" << b << endl;\n    return 0;\n}\n",
   "hints": [
    "Стартер pointer-лердің көшірмесін ғана ауыстырады; мәндерді <code>*a</code>, <code>*b</code> арқылы ауыстыру керек."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 8\n",
      "out": "8 3\n"
     },
     {
      "stdin": "-1 1\n",
      "out": "1 -1\n"
     },
     {
      "stdin": "5 5\n",
      "out": "5 5\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Динамикалық массив қосындысы",
   "prompt": "<p><code>n</code>, сосын <code>n</code> бүтін сан берілген. Массивті <code>new int[n]</code> арқылы heap-те жасап, сандарды оқыңыз, қосындысын шығарыңыз да, жадты <code>delete[]</code> арқылы босатыңыз.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // new int[n] арқылы массив жасаңыз\n    cout << 0 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int* arr = new int[n];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    long long sum = 0;\n    for (int i = 0; i < n; i++) sum += arr[i];\n    cout << sum << endl;\n    delete[] arr;\n    return 0;\n}\n",
   "hints": [
    "<code>int* arr = new int[n];</code> — сосын <code>arr[i]</code> кәдімгі массив сияқты.",
    "Соңында <code>delete[] arr;</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n10 20 30\n",
      "out": "60\n"
     },
     {
      "stdin": "1\n-5\n",
      "out": "-5\n"
     },
     {
      "stdin": "4\n1000000000 1000000000 1000000000 1\n",
      "out": "3000000001\n"
     }
    ],
    "mustInclude": [
     "new",
     "delete[]"
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Ең кіші элементтің адресі",
   "prompt": "<p><code>int* findMin(int* arr, int n)</code> функциясын жазыңыз: ол массивтің ең кіші элементіне көрсететін pointer қайтарсын (бірнеше болса — біріншісіне). <code>main</code> дайын: мәнді және оның индексін (<code>p - arr</code>) шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint* findMin(int* arr, int n) {\n    return arr;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    int* arr = new int[n];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    int* p = findMin(arr, n);\n    cout << *p << \" \" << p - arr << endl;\n    delete[] arr;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint* findMin(int* arr, int n) {\n    int* best = arr;\n    for (int i = 1; i < n; i++) {\n        if (arr[i] < *best) best = &arr[i];\n    }\n    return best;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    int* arr = new int[n];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    int* p = findMin(arr, n);\n    cout << *p << \" \" << p - arr << endl;\n    delete[] arr;\n    return 0;\n}\n",
   "hints": [
    "<code>int* best = arr;</code> — алғашқы элементтен бастаңыз.",
    "Кішірек элемент табылса: <code>best = &amp;arr[i];</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n7 3 9 3 8\n",
      "out": "3 1\n"
     },
     {
      "stdin": "3\n1 2 3\n",
      "out": "1 0\n"
     },
     {
      "stdin": "4\n5 4 3 -2\n",
      "out": "-2 3\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Массивті орнында аудару",
   "prompt": "<p><code>void reverseArr(int* a, int n)</code> функциясын жазыңыз: ол жаңа массив жасамай, элементтерді орнында кері ретке келтірсін (бірінші мен соңғысын, екінші мен соңғының алдындағысын ауыстыру, т.с.с.). <code>main</code> дайын.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nvoid reverseArr(int* a, int n) {\n}\n\nint main() {\n    int n;\n    cin >> n;\n    int* a = new int[n];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    reverseArr(a, n);\n    for (int i = 0; i < n; i++) cout << a[i] << \" \";\n    cout << endl;\n    delete[] a;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nvoid reverseArr(int* a, int n) {\n    for (int i = 0; i < n / 2; i++) {\n        int t = a[i];\n        a[i] = a[n - 1 - i];\n        a[n - 1 - i] = t;\n    }\n}\n\nint main() {\n    int n;\n    cin >> n;\n    int* a = new int[n];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    reverseArr(a, n);\n    for (int i = 0; i < n; i++) cout << a[i] << \" \";\n    cout << endl;\n    delete[] a;\n    return 0;\n}\n",
   "hints": [
    "Тек жартысына дейін жүріңіз: <code>i &lt; n / 2</code>.",
    "<code>a[i]</code> мен <code>a[n - 1 - i]</code> орындарын ауыстырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n1 2 3 4 5\n",
      "out": "5 4 3 2 1 \n"
     },
     {
      "stdin": "4\n10 20 30 40\n",
      "out": "40 30 20 10 \n"
     },
     {
      "stdin": "1\n7\n",
      "out": "7 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Ең ұзын сөзге pointer",
   "prompt": "<p><code>const string* longest(const vector&lt;string&gt;&amp; v)</code> функциясын жазыңыз: ол ең ұзын сөзге көрсететін pointer қайтарсын (тең болса — біріншісі), вектор бос болса <code>nullptr</code>. <code>main</code> дайын: сөз бен ұзындығын не <code>EMPTY</code> шығарады.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nconst string* longest(const vector<string>& v) {\n    return &v[0];\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> words(n);\n    for (int i = 0; i < n; i++) cin >> words[i];\n    const string* p = longest(words);\n    if (p == nullptr) cout << \"EMPTY\" << endl;\n    else cout << *p << \" \" << p->size() << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nconst string* longest(const vector<string>& v) {\n    const string* best = nullptr;\n    for (const string& w : v) {\n        if (best == nullptr || w.size() > best->size()) best = &w;\n    }\n    return best;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> words(n);\n    for (int i = 0; i < n; i++) cin >> words[i];\n    const string* p = longest(words);\n    if (p == nullptr) cout << \"EMPTY\" << endl;\n    else cout << *p << \" \" << p->size() << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>const string* best = nullptr;</code> деп бастаңыз.",
    "Цикл ішінде <code>&amp;w</code> — вектор ішіндегі сөздің адресі (<code>w</code> reference болуы керек)."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\nalma nan kitap qala\n",
      "out": "kitap 5\n"
     },
     {
      "stdin": "0\n",
      "out": "EMPTY\n"
     },
     {
      "stdin": "3\naaa bbb cc\n",
      "out": "aaa 3\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Өздігінен өсетін массив",
   "prompt": "<p>Сандар кіріс біткенше беріледі. Оларды <code>vector</code>-сіз, өзіңіз басқаратын heap массивінде сақтаңыз: басында сыйымдылық <code>cap = 2</code> (<code>new int[2]</code>); массив толса, екі есе үлкен жаңа массив бөліп, элементтерді көшіріп, ескісін <code>delete[]</code> етіңіз. Соңында бірінші жолға <code>саны сыйымдылығы</code>, екінші жолға сандарды кері ретпен шығарыңыз (сан жоқ болса, екінші жол бос).</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int cap = 2, size = 0;\n    int* data = new int[cap];\n    int x;\n    while (cin >> x) {\n        // толса — өсіріңіз\n        data[size] = x;\n        size++;\n    }\n    cout << size << \" \" << cap << endl;\n    delete[] data;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int cap = 2, size = 0;\n    int* data = new int[cap];\n    int x;\n    while (cin >> x) {\n        if (size == cap) {\n            int* bigger = new int[cap * 2];\n            for (int i = 0; i < size; i++) bigger[i] = data[i];\n            delete[] data;\n            data = bigger;\n            cap *= 2;\n        }\n        data[size] = x;\n        size++;\n    }\n    cout << size << \" \" << cap << endl;\n    for (int i = size - 1; i >= 0; i--) cout << data[i] << \" \";\n    cout << endl;\n    delete[] data;\n    return 0;\n}\n",
   "hints": [
    "<code>size == cap</code> болғанда: <code>new int[cap * 2]</code>, көшіру, <code>delete[] data</code>, <code>data = bigger</code>.",
    "Стартерде массивтің шегінен шығу бар — браузерде ол құламайды, бірақ жауап қате болады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 2 3 4 5\n",
      "out": "5 8\n5 4 3 2 1 \n"
     },
     {
      "stdin": "7\n",
      "out": "1 2\n7 \n"
     },
     {
      "stdin": "",
      "out": "0 2\n\n"
     },
     {
      "stdin": "1 2 3 4 5 6 7 8 9\n",
      "out": "9 16\n9 8 7 6 5 4 3 2 1 \n"
     }
    ],
    "mustInclude": [
     "delete[]"
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Әмияндар арасында аударым",
   "prompt": "<p><code>struct Wallet { string owner; long long balance; };</code> берілген. <code>bool transfer(Wallet* from, Wallet* to, long long amount)</code> функциясын жазыңыз: pointer-лердің біреуі <code>nullptr</code> болса, <code>amount ≤ 0</code> болса не <code>from</code>-да ақша жеткіліксіз болса — ештеңе өзгертпей <code>false</code>; әйтпесе соманы аударып, <code>true</code> қайтарсын. <code>main</code> дайын: әмияндар <code>unique_ptr</code> арқылы жасалады, ал <code>AB 500</code>, <code>BA 100</code>, <code>AX 50</code> (X — жоқ әмиян) командалары орындалады.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <memory>\nusing namespace std;\n\nstruct Wallet {\n    string owner;\n    long long balance;\n};\n\nbool transfer(Wallet* from, Wallet* to, long long amount) {\n    from->balance -= amount;\n    to->balance += amount;\n    return true;\n}\n\nint main() {\n    long long a, b;\n    int q;\n    cin >> a >> b >> q;\n    unique_ptr<Wallet> wa = make_unique<Wallet>(Wallet{\"A\", a});\n    unique_ptr<Wallet> wb = make_unique<Wallet>(Wallet{\"B\", b});\n    for (int i = 0; i < q; i++) {\n        string dir;\n        long long amount;\n        cin >> dir >> amount;\n        Wallet* from = (dir[0] == 'A') ? wa.get() : (dir[0] == 'B' ? wb.get() : nullptr);\n        Wallet* to = (dir[1] == 'A') ? wa.get() : (dir[1] == 'B' ? wb.get() : nullptr);\n        cout << (transfer(from, to, amount) ? \"OK\" : \"FAIL\") << endl;\n    }\n    cout << wa->owner << \" \" << wa->balance << endl;\n    cout << wb->owner << \" \" << wb->balance << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <memory>\nusing namespace std;\n\nstruct Wallet {\n    string owner;\n    long long balance;\n};\n\nbool transfer(Wallet* from, Wallet* to, long long amount) {\n    if (from == nullptr || to == nullptr) return false;\n    if (amount <= 0 || from->balance < amount) return false;\n    from->balance -= amount;\n    to->balance += amount;\n    return true;\n}\n\nint main() {\n    long long a, b;\n    int q;\n    cin >> a >> b >> q;\n    unique_ptr<Wallet> wa = make_unique<Wallet>(Wallet{\"A\", a});\n    unique_ptr<Wallet> wb = make_unique<Wallet>(Wallet{\"B\", b});\n    for (int i = 0; i < q; i++) {\n        string dir;\n        long long amount;\n        cin >> dir >> amount;\n        Wallet* from = (dir[0] == 'A') ? wa.get() : (dir[0] == 'B' ? wb.get() : nullptr);\n        Wallet* to = (dir[1] == 'A') ? wa.get() : (dir[1] == 'B' ? wb.get() : nullptr);\n        cout << (transfer(from, to, amount) ? \"OK\" : \"FAIL\") << endl;\n    }\n    cout << wa->owner << \" \" << wa->balance << endl;\n    cout << wb->owner << \" \" << wb->balance << endl;\n    return 0;\n}\n",
   "hints": [
    "Ең алдымен <code>nullptr</code>-ді тексеріңіз — әйтпесе <code>from-&gt;balance</code> бос адресті оқиды.",
    "<code>p-&gt;balance</code> — <code>(*p).balance</code> деген сөз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1000 500 3\nAB 300\nBA 900\nBA 800\n",
      "out": "OK\nFAIL\nOK\nA 1500\nB 0\n"
     },
     {
      "stdin": "100 100 3\nAX 50\nXB 10\nAB 0\n",
      "out": "FAIL\nFAIL\nFAIL\nA 100\nB 100\n"
     },
     {
      "stdin": "5000 0 2\nAB 5000\nAB 1\n",
      "out": "OK\nFAIL\nA 0\nB 5000\n"
     }
    ]
   }
  }
 ],
 "cp-9": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Тіктөртбұрыш класы",
   "prompt": "<p><code>Rect</code> класын аяқтаңыз: <code>private</code> өрістер <code>w</code>, <code>h</code>; initializer list бар constructor <code>Rect(int w, int h)</code>; <code>int area() const</code> және <code>int perimeter() const</code> әдістері. <code>main</code> дайын: ауданы мен периметрін шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nclass Rect {\nprivate:\n    int w, h;\npublic:\n    Rect(int w, int h) : w(0), h(0) {}\n    int area() const { return 0; }\n    int perimeter() const { return 0; }\n};\n\nint main() {\n    int w, h;\n    cin >> w >> h;\n    Rect r(w, h);\n    cout << r.area() << \" \" << r.perimeter() << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nclass Rect {\nprivate:\n    int w, h;\npublic:\n    Rect(int w, int h) : w(w), h(h) {}\n    int area() const { return w * h; }\n    int perimeter() const { return 2 * (w + h); }\n};\n\nint main() {\n    int w, h;\n    cin >> w >> h;\n    Rect r(w, h);\n    cout << r.area() << \" \" << r.perimeter() << endl;\n    return 0;\n}\n",
   "hints": [
    "Initializer list: <code>: w(w), h(h)</code> — өріс(параметр)."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 4\n",
      "out": "12 14\n"
     },
     {
      "stdin": "10 1\n",
      "out": "10 22\n"
     },
     {
      "stdin": "5 5\n",
      "out": "25 20\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Қойма құны",
   "prompt": "<p><code>n</code> тауар берілген: әр жолда <code>атауы бағасы саны</code>. <code>Product</code> struct-ын жасап, тауарларды <code>vector&lt;Product&gt;</code>-ке оқыңыз да, қоймадағы барлық тауардың жалпы құнын (баға × саны қосындысы, <code>long long</code>) шығарыңыз.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Product {\n    string name;\n    long long price;\n    int qty;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Product> items(n);\n    long long total = 0;\n    cout << total << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Product {\n    string name;\n    long long price;\n    int qty;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Product> items(n);\n    for (int i = 0; i < n; i++) cin >> items[i].name >> items[i].price >> items[i].qty;\n    long long total = 0;\n    for (const Product& p : items) total += p.price * p.qty;\n    cout << total << endl;\n    return 0;\n}\n",
   "hints": [
    "Өрістерге нүкте арқылы оқыңыз: <code>cin &gt;&gt; items[i].name &gt;&gt; items[i].price</code> ..."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nNan 180 50\nSut 520 20\nShai 1500 4\n",
      "out": "25400\n"
     },
     {
      "stdin": "1\nTelefon 250000 40000\n",
      "out": "10000000000\n"
     },
     {
      "stdin": "2\nA 1 1\nB 2 2\n",
      "out": "5\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Сабақ ұзақтығы",
   "prompt": "<p><code>struct Time { int h, m; }</code> құрылымына <code>int minutes() const</code> әдісін қосыңыз: ол күн басынан бергі минут санын қайтарсын (<code>h * 60 + m</code>). <code>main</code> дайын: сабақтың басталу және аяқталу уақытын <code>HH:MM</code> түрінде оқып, ұзақтығын минутпен шығарады. Мысалы, <code>08:30 10:05</code> → <code>95</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nstruct Time {\n    int h, m;\n    int minutes() const {\n        return h;\n    }\n};\n\nint main() {\n    Time a, b;\n    char c;\n    cin >> a.h >> c >> a.m >> b.h >> c >> b.m;\n    cout << b.minutes() - a.minutes() << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nstruct Time {\n    int h, m;\n    int minutes() const {\n        return h * 60 + m;\n    }\n};\n\nint main() {\n    Time a, b;\n    char c;\n    cin >> a.h >> c >> a.m >> b.h >> c >> b.m;\n    cout << b.minutes() - a.minutes() << endl;\n    return 0;\n}\n",
   "hints": [
    "Әдіс ішінде өрістерге тікелей қол жеткізуге болады: <code>return h * 60 + m;</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "08:30 10:05\n",
      "out": "95\n"
     },
     {
      "stdin": "00:00 23:59\n",
      "out": "1439\n"
     },
     {
      "stdin": "13:45 14:00\n",
      "out": "15\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Келушілер санауышы",
   "prompt": "<p>Мұражайға келушілерді санайтын <code>Counter</code> класын жазыңыз: <code>private</code> өріс <code>count</code> (constructor 0-ге теңейді), <code>inc()</code> — бірге арттырады, <code>dec()</code> — бірге азайтады, бірақ 0-ден төмен түспейді, <code>reset()</code> — нөлдейді, <code>int get() const</code>. <code>main</code> дайын: командаларды кіріс біткенше оқиды.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Counter {\nprivate:\n    int count;\npublic:\n    Counter() : count(0) {}\n    void inc() { count++; }\n    void dec() { count--; }\n    void reset() {}\n    int get() const { return count; }\n};\n\nint main() {\n    Counter c;\n    string cmd;\n    while (cin >> cmd) {\n        if (cmd == \"inc\") c.inc();\n        else if (cmd == \"dec\") c.dec();\n        else if (cmd == \"reset\") c.reset();\n        else if (cmd == \"get\") cout << c.get() << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Counter {\nprivate:\n    int count;\npublic:\n    Counter() : count(0) {}\n    void inc() { count++; }\n    void dec() { if (count > 0) count--; }\n    void reset() { count = 0; }\n    int get() const { return count; }\n};\n\nint main() {\n    Counter c;\n    string cmd;\n    while (cin >> cmd) {\n        if (cmd == \"inc\") c.inc();\n        else if (cmd == \"dec\") c.dec();\n        else if (cmd == \"reset\") c.reset();\n        else if (cmd == \"get\") cout << c.get() << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>dec</code> ішінде алдымен <code>count &gt; 0</code> екенін тексеріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "inc inc get dec get\n",
      "out": "2\n1\n"
     },
     {
      "stdin": "dec dec get inc get\n",
      "out": "0\n1\n"
     },
     {
      "stdin": "inc inc inc reset get inc get\n",
      "out": "0\n1\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Бөлмеге кіру-шығу",
   "prompt": "<p><code>Room</code> struct-ына constructor мен destructor жазыңыз: constructor <code>&lt;аты&gt; кірді</code>, destructor <code>&lt;аты&gt; шықты</code> деп шығарсын. <code>main</code> дайын: үш атты оқып, нысандарды әртүрлі scope-та жасайды. Шығыс ретін destructor ережелері анықтайды.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Room {\n    string name;\n    Room(string n) : name(n) {}\n};\n\nint main() {\n    string x, y, z;\n    cin >> x >> y >> z;\n    Room a(x);\n    {\n        Room b(y);\n    }\n    Room c(z);\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Room {\n    string name;\n    Room(string n) : name(n) {\n        cout << name << \" кірді\" << endl;\n    }\n    ~Room() {\n        cout << name << \" шықты\" << endl;\n    }\n};\n\nint main() {\n    string x, y, z;\n    cin >> x >> y >> z;\n    Room a(x);\n    {\n        Room b(y);\n    }\n    Room c(z);\n    return 0;\n}\n",
   "hints": [
    "Destructor — <code>~Room() { ... }</code>.",
    "Ішкі <code>{ }</code> блоктан шыққанда <code>b</code> бірден жойылады; <code>a</code> мен <code>c</code> <code>main</code> соңында, кері ретпен."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Ali Dana Saya\n",
      "out": "Ali кірді\nDana кірді\nDana шықты\nSaya кірді\nSaya шықты\nAli шықты\n"
     },
     {
      "stdin": "A B C\n",
      "out": "A кірді\nB кірді\nB шықты\nC кірді\nC шықты\nA шықты\n"
     },
     {
      "stdin": "Erlan Aruzhan Timur\n",
      "out": "Erlan кірді\nAruzhan кірді\nAruzhan шықты\nTimur кірді\nTimur шықты\nErlan шықты\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Термометр класы",
   "prompt": "<p>Ауа райы станциясы үшін <code>Thermo</code> класын жазыңыз: <code>add(int t)</code> өлшемді қосады, <code>int minT() const</code>, <code>int maxT() const</code>, <code>double avg() const</code>. Деректерді <code>private</code> <code>vector&lt;int&gt;</code>-та сақтаңыз. <code>main</code> дайын: <code>n ≥ 1</code> өлшем оқып, <code>min max орташа</code> (орташа — 1 ондық таңбамен) шығарады.</p>",
   "starter": "#include <iostream>\n#include <iomanip>\n#include <vector>\nusing namespace std;\n\nclass Thermo {\nprivate:\n    vector<int> data;\npublic:\n    void add(int t) {}\n    int minT() const { return 0; }\n    int maxT() const { return 0; }\n    double avg() const { return 0; }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Thermo t;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        t.add(x);\n    }\n    cout << t.minT() << \" \" << t.maxT() << \" \" << fixed << setprecision(1) << t.avg() << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <iomanip>\n#include <vector>\nusing namespace std;\n\nclass Thermo {\nprivate:\n    vector<int> data;\npublic:\n    void add(int t) { data.push_back(t); }\n    int minT() const {\n        int m = data[0];\n        for (int x : data) if (x < m) m = x;\n        return m;\n    }\n    int maxT() const {\n        int m = data[0];\n        for (int x : data) if (x > m) m = x;\n        return m;\n    }\n    double avg() const {\n        long long s = 0;\n        for (int x : data) s += x;\n        return (double)s / data.size();\n    }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Thermo t;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        t.add(x);\n    }\n    cout << t.minT() << \" \" << t.maxT() << \" \" << fixed << setprecision(1) << t.avg() << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>add</code> ішінде <code>data.push_back(t)</code>.",
    "Орташа үшін қосындыны <code>double</code>-ге айналдырып, <code>data.size()</code>-ға бөліңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n-12 -5 0 3 -1\n",
      "out": "-12 3 -3.0\n"
     },
     {
      "stdin": "1\n25\n",
      "out": "25 25 25.0\n"
     },
     {
      "stdin": "4\n30 32 35 31\n",
      "out": "30 35 32.0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Кітапхана класы",
   "prompt": "<p><code>struct Book { string title; bool taken; };</code> және <code>Library</code> класын жазыңыз (<code>private vector&lt;Book&gt;</code>): <code>add(title)</code> — жаңа кітап (бос); <code>bool take(title)</code> — осындай атаумен бос кітап бар болса, біріншісін алып <code>true</code>, әйтпесе <code>false</code>; <code>bool giveBack(title)</code> — осы атаумен алынған кітапты қайтарып <code>true</code>, ондай жоқ болса <code>false</code>; <code>int available() const</code> — бос кітаптар саны. <code>main</code> дайын: <code>add X</code>, <code>take X</code>, <code>return X</code>, <code>count</code> командалары.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Book {\n    string title;\n    bool taken;\n};\n\nclass Library {\nprivate:\n    vector<Book> books;\npublic:\n    void add(const string& t) { books.push_back(Book{t, false}); }\n    bool take(const string& t) { return false; }\n    bool giveBack(const string& t) { return false; }\n    int available() const { return books.size(); }\n};\n\nint main() {\n    Library lib;\n    string cmd, title;\n    while (cin >> cmd) {\n        if (cmd == \"count\") { cout << lib.available() << endl; continue; }\n        cin >> title;\n        if (cmd == \"add\") lib.add(title);\n        else if (cmd == \"take\") cout << (lib.take(title) ? \"OK\" : \"NO\") << endl;\n        else if (cmd == \"return\") cout << (lib.giveBack(title) ? \"OK\" : \"NO\") << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Book {\n    string title;\n    bool taken;\n};\n\nclass Library {\nprivate:\n    vector<Book> books;\npublic:\n    void add(const string& t) { books.push_back(Book{t, false}); }\n    bool take(const string& t) {\n        for (Book& b : books) {\n            if (b.title == t && !b.taken) { b.taken = true; return true; }\n        }\n        return false;\n    }\n    bool giveBack(const string& t) {\n        for (Book& b : books) {\n            if (b.title == t && b.taken) { b.taken = false; return true; }\n        }\n        return false;\n    }\n    int available() const {\n        int c = 0;\n        for (const Book& b : books) if (!b.taken) c++;\n        return c;\n    }\n};\n\nint main() {\n    Library lib;\n    string cmd, title;\n    while (cin >> cmd) {\n        if (cmd == \"count\") { cout << lib.available() << endl; continue; }\n        cin >> title;\n        if (cmd == \"add\") lib.add(title);\n        else if (cmd == \"take\") cout << (lib.take(title) ? \"OK\" : \"NO\") << endl;\n        else if (cmd == \"return\") cout << (lib.giveBack(title) ? \"OK\" : \"NO\") << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "Кітапты өзгерту үшін циклде reference алыңыз: <code>for (Book&amp; b : books)</code>.",
    "Табылған бойда <code>return true;</code> — келесі даналарға тиіспеңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "add Abai\nadd Abai\nadd Kokserek\ntake Abai\ntake Abai\ntake Abai\ncount\nreturn Abai\ncount\n",
      "out": "OK\nOK\nNO\n1\nOK\n2\n"
     },
     {
      "stdin": "take Kitap\nreturn Kitap\nadd Kitap\ncount\n",
      "out": "NO\nNO\n1\n"
     },
     {
      "stdin": "add A\ntake A\nreturn A\nreturn A\ncount\n",
      "out": "OK\nOK\nNO\n1\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Сақиналы кезек",
   "prompt": "<p>Емханадағы электронды кезек үшін бекітілген сыйымдылықты <code>Queue</code> класын жазыңыз. Constructor <code>Queue(int cap)</code> heap-те <code>new int[cap]</code> бөледі, destructor <code>delete[]</code> арқылы босатады. <code>bool push(int x)</code> — толы болса <code>false</code>; <code>bool pop(int&amp; x)</code> — бос болса <code>false</code>, әйтпесе ең алғашқы элементті <code>x</code>-ке жазып алып тастайды; <code>int size() const</code>. Орындар циклдік қайта қолданылады: <code>head</code> және <code>count</code> өрістерін сақтап, келесі орын <code>(head + count) % cap</code>. <code>main</code> дайын.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Queue {\nprivate:\n    int* data;\n    int cap, head, count;\npublic:\n    Queue(int c) : data(new int[c]), cap(c), head(0), count(0) {}\n    bool push(int x) { return false; }\n    bool pop(int& x) { return false; }\n    int size() const { return count; }\n};\n\nint main() {\n    int cap;\n    cin >> cap;\n    Queue q(cap);\n    string cmd;\n    while (cin >> cmd) {\n        if (cmd == \"push\") {\n            int x;\n            cin >> x;\n            cout << (q.push(x) ? \"OK\" : \"FULL\") << endl;\n        } else if (cmd == \"pop\") {\n            int x;\n            if (q.pop(x)) cout << x << endl;\n            else cout << \"EMPTY\" << endl;\n        } else if (cmd == \"size\") {\n            cout << q.size() << endl;\n        }\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Queue {\nprivate:\n    int* data;\n    int cap, head, count;\npublic:\n    Queue(int c) : data(new int[c]), cap(c), head(0), count(0) {}\n    ~Queue() { delete[] data; }\n    bool push(int x) {\n        if (count == cap) return false;\n        data[(head + count) % cap] = x;\n        count++;\n        return true;\n    }\n    bool pop(int& x) {\n        if (count == 0) return false;\n        x = data[head];\n        head = (head + 1) % cap;\n        count--;\n        return true;\n    }\n    int size() const { return count; }\n};\n\nint main() {\n    int cap;\n    cin >> cap;\n    Queue q(cap);\n    string cmd;\n    while (cin >> cmd) {\n        if (cmd == \"push\") {\n            int x;\n            cin >> x;\n            cout << (q.push(x) ? \"OK\" : \"FULL\") << endl;\n        } else if (cmd == \"pop\") {\n            int x;\n            if (q.pop(x)) cout << x << endl;\n            else cout << \"EMPTY\" << endl;\n        } else if (cmd == \"size\") {\n            cout << q.size() << endl;\n        }\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>push</code>: орын <code>(head + count) % cap</code>, сосын <code>count++</code>.",
    "<code>pop</code>: <code>x = data[head]</code>, <code>head = (head + 1) % cap</code>, <code>count--</code>. Destructor-ды ұмытпаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2\npush 1\npush 2\npush 3\npop\npush 4\npop\npop\npop\nsize\n",
      "out": "OK\nOK\nFULL\n1\nOK\n2\n4\nEMPTY\n0\n"
     },
     {
      "stdin": "3\npop\npush 10\nsize\n",
      "out": "EMPTY\nOK\n1\n"
     },
     {
      "stdin": "1\npush 5\npop\npush 6\npop\npush 7\nsize\n",
      "out": "OK\n5\nOK\n6\nOK\n1\n"
     }
    ],
    "mustInclude": [
     "delete[]"
    ]
   }
  }
 ],
 "cp-10": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Бөлшектер теңдігі",
   "prompt": "<p><code>struct Fraction { long long num, den; };</code> (бөлімі оң) үшін <code>operator==</code> жазыңыз: <code>1/2</code> мен <code>2/4</code> тең деп есептелсін. Кеңес: <code>a/b == c/d</code> ⇔ <code>a·d == c·b</code>. <code>main</code> дайын: <code>YES</code>/<code>NO</code> шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nstruct Fraction {\n    long long num, den;\n};\n\nbool operator==(const Fraction& a, const Fraction& b) {\n    return a.num == b.num && a.den == b.den;\n}\n\nint main() {\n    Fraction a, b;\n    cin >> a.num >> a.den >> b.num >> b.den;\n    cout << (a == b ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nstruct Fraction {\n    long long num, den;\n};\n\nbool operator==(const Fraction& a, const Fraction& b) {\n    return a.num * b.den == b.num * a.den;\n}\n\nint main() {\n    Fraction a, b;\n    cin >> a.num >> a.den >> b.num >> b.den;\n    cout << (a == b ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n",
   "hints": [
    "Айқас көбейтіңіз: <code>a.num * b.den == b.num * a.den</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 2 2 4\n",
      "out": "YES\n"
     },
     {
      "stdin": "1 3 2 5\n",
      "out": "NO\n"
     },
     {
      "stdin": "3 3 7 7\n",
      "out": "YES\n"
     },
     {
      "stdin": "-2 6 1 3\n",
      "out": "NO\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Swap template",
   "prompt": "<p>Кез келген типтегі екі айнымалының мәнін ауыстыратын <code>template &lt;typename T&gt; void mySwap(T&amp; a, T&amp; b)</code> функциясын жазыңыз. <code>main</code> дайын: екі сан мен екі сөзді ауыстырып шығарады.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nvoid mySwap(T& a, T& b) {\n}\n\nint main() {\n    int a, b;\n    string s, t;\n    cin >> a >> b >> s >> t;\n    mySwap(a, b);\n    mySwap(s, t);\n    cout << a << \" \" << b << endl;\n    cout << s << \" \" << t << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nvoid mySwap(T& a, T& b) {\n    T t = a;\n    a = b;\n    b = t;\n}\n\nint main() {\n    int a, b;\n    string s, t;\n    cin >> a >> b >> s >> t;\n    mySwap(a, b);\n    mySwap(s, t);\n    cout << a << \" \" << b << endl;\n    cout << s << \" \" << t << endl;\n    return 0;\n}\n",
   "hints": [
    "Уақытша айнымалы да <code>T</code> типті: <code>T t = a;</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 2 alma anar\n",
      "out": "2 1\nanar alma\n"
     },
     {
      "stdin": "-5 5 Astana Almaty\n",
      "out": "5 -5\nAlmaty Astana\n"
     },
     {
      "stdin": "0 0 x y\n",
      "out": "0 0\ny x\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Нүктені шығару",
   "prompt": "<p><code>struct Point { int x, y; };</code> үшін <code>ostream&amp; operator&lt;&lt;(ostream&amp; os, const Point&amp; p)</code> жазыңыз: нүктені <code>[x; y]</code> түрінде шығарсын. <code>main</code> дайын: нүктелерді кіріс біткенше оқып, әрқайсысын жеке жолға шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x, y;\n};\n\nostream& operator<<(ostream& os, const Point& p) {\n    os << p.x;\n    return os;\n}\n\nint main() {\n    Point p;\n    while (cin >> p.x >> p.y) {\n        cout << p << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nstruct Point {\n    int x, y;\n};\n\nostream& operator<<(ostream& os, const Point& p) {\n    os << \"[\" << p.x << \"; \" << p.y << \"]\";\n    return os;\n}\n\nint main() {\n    Point p;\n    while (cin >> p.x >> p.y) {\n        cout << p << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>cout</code> орнына <code>os</code>-қа жазыңыз және соңында <code>return os;</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 2\n-3 4\n",
      "out": "[1; 2]\n[-3; 4]\n"
     },
     {
      "stdin": "0 0\n",
      "out": "[0; 0]\n"
     },
     {
      "stdin": "100 -100\n7 7\n8 9\n",
      "out": "[100; -100]\n[7; 7]\n[8; 9]\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Бөлшектерді қосу",
   "prompt": "<p><code>Fraction</code> (оң бөлшектер) үшін <code>operator+</code> және <code>operator&lt;&lt;</code> жазыңыз. Қосынды қысқартылған болсын (дайын <code>gcd</code> функциясын қолданыңыз), шығыс түрі <code>num/den</code>. Мысалы, <code>1 6 1 3</code> → <code>1/2</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nstruct Fraction {\n    long long num, den;\n};\n\nlong long gcd(long long a, long long b) {\n    while (b != 0) {\n        long long t = a % b;\n        a = b;\n        b = t;\n    }\n    return a;\n}\n\nFraction operator+(const Fraction& a, const Fraction& b) {\n    return Fraction{a.num + b.num, a.den + b.den};\n}\n\nostream& operator<<(ostream& os, const Fraction& f) {\n    os << f.num;\n    return os;\n}\n\nint main() {\n    Fraction a, b;\n    cin >> a.num >> a.den >> b.num >> b.den;\n    cout << a + b << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nstruct Fraction {\n    long long num, den;\n};\n\nlong long gcd(long long a, long long b) {\n    while (b != 0) {\n        long long t = a % b;\n        a = b;\n        b = t;\n    }\n    return a;\n}\n\nFraction operator+(const Fraction& a, const Fraction& b) {\n    long long n = a.num * b.den + b.num * a.den;\n    long long d = a.den * b.den;\n    long long g = gcd(n, d);\n    return Fraction{n / g, d / g};\n}\n\nostream& operator<<(ostream& os, const Fraction& f) {\n    os << f.num << \"/\" << f.den;\n    return os;\n}\n\nint main() {\n    Fraction a, b;\n    cin >> a.num >> a.den >> b.num >> b.den;\n    cout << a + b << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>a/b + c/d = (a·d + c·b) / (b·d)</code>.",
    "Алымы мен бөлімін <code>gcd</code>-ке бөліңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 6 1 3\n",
      "out": "1/2\n"
     },
     {
      "stdin": "1 2 1 2\n",
      "out": "1/1\n"
     },
     {
      "stdin": "2 3 3 4\n",
      "out": "17/12\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "MinMax класс template-і",
   "prompt": "<p><code>template &lt;typename T&gt; class MinMax</code> жазыңыз: <code>add(T x)</code> мәнді қабылдайды, <code>getMin()</code> және <code>getMax()</code> осы уақытқа дейінгі ең кіші және ең үлкен мәнді қайтарады (тек <code>&lt;</code> операторын қолданыңыз). Мәндердің өзін сақтамай, тек ағымдағы min/max-ты сақтаңыз. <code>main</code> дайын: <code>n</code> сан мен <code>m</code> сөз үшін (n, m ≥ 1).</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nclass MinMax {\n    T mn, mx;\n    bool empty = true;\npublic:\n    void add(T x) {\n        mn = x;\n        mx = x;\n    }\n    T getMin() const { return mn; }\n    T getMax() const { return mx; }\n};\n\nint main() {\n    int n, m;\n    cin >> n;\n    MinMax<int> a;\n    for (int i = 0; i < n; i++) { int x; cin >> x; a.add(x); }\n    cin >> m;\n    MinMax<string> b;\n    for (int i = 0; i < m; i++) { string s; cin >> s; b.add(s); }\n    cout << a.getMin() << \" \" << a.getMax() << endl;\n    cout << b.getMin() << \" \" << b.getMax() << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nclass MinMax {\n    T mn, mx;\n    bool empty = true;\npublic:\n    void add(T x) {\n        if (empty) {\n            mn = x;\n            mx = x;\n            empty = false;\n            return;\n        }\n        if (x < mn) mn = x;\n        if (mx < x) mx = x;\n    }\n    T getMin() const { return mn; }\n    T getMax() const { return mx; }\n};\n\nint main() {\n    int n, m;\n    cin >> n;\n    MinMax<int> a;\n    for (int i = 0; i < n; i++) { int x; cin >> x; a.add(x); }\n    cin >> m;\n    MinMax<string> b;\n    for (int i = 0; i < m; i++) { string s; cin >> s; b.add(s); }\n    cout << a.getMin() << \" \" << a.getMax() << endl;\n    cout << b.getMin() << \" \" << b.getMax() << endl;\n    return 0;\n}\n",
   "hints": [
    "Бірінші мән келгенде <code>mn</code> мен <code>mx</code>-ке жазыңыз (<code>empty</code> белгісі).",
    "Үлкенін тексеру де <code>&lt;</code> арқылы: <code>if (mx &lt; x) mx = x;</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n3 -1 9 2\n3\nnan alma shai\n",
      "out": "-1 9\nalma shai\n"
     },
     {
      "stdin": "1\n5\n1\nqala\n",
      "out": "5 5\nqala qala\n"
     },
     {
      "stdin": "3\n7 7 7\n2\nb a\n",
      "out": "7 7\na b\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Тауарларды бағамен реттеу",
   "prompt": "<p><code>Product</code> (<code>name</code>, <code>price</code>) үшін екі оператор жазыңыз: <code>operator&lt;</code> — алдымен баға бойынша өсу, баға тең болса атауы бойынша әліпби реті; <code>operator&lt;&lt;</code> — <code>атауы: баға тг</code> түрінде шығару. <code>main</code> дайын: <code>sort</code> сіздің <code>operator&lt;</code>-ты қолданады.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Product {\n    string name;\n    int price;\n};\n\nbool operator<(const Product& a, const Product& b) {\n    return a.name < b.name;\n}\n\nostream& operator<<(ostream& os, const Product& p) {\n    os << p.name;\n    return os;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Product> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i].name >> v[i].price;\n    sort(v.begin(), v.end());\n    for (const Product& p : v) cout << p << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Product {\n    string name;\n    int price;\n};\n\nbool operator<(const Product& a, const Product& b) {\n    if (a.price != b.price) return a.price < b.price;\n    return a.name < b.name;\n}\n\nostream& operator<<(ostream& os, const Product& p) {\n    os << p.name << \": \" << p.price << \" тг\";\n    return os;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Product> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i].name >> v[i].price;\n    sort(v.begin(), v.end());\n    for (const Product& p : v) cout << p << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>if (a.price != b.price) return a.price &lt; b.price;</code> сосын атауды салыстырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\nsut 520\nnan 180\nirimshik 520\nshai 1500\n",
      "out": "nan: 180 тг\nirimshik: 520 тг\nsut: 520 тг\nshai: 1500 тг\n"
     },
     {
      "stdin": "1\nalma 900\n",
      "out": "alma: 900 тг\n"
     },
     {
      "stdin": "3\nc 1\nb 1\na 1\n",
      "out": "a: 1 тг\nb: 1 тг\nc: 1 тг\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "2×2 матрица амалдары",
   "prompt": "<p><code>struct Mat { long long a, b, c, d; };</code> 2×2 матрицаны білдіреді: <code>[[a, b], [c, d]]</code>. Үш оператор жазыңыз: <code>operator+</code> (элементтер бойынша), <code>operator*</code> (матрицалық көбейту: жол × баған) және <code>operator&lt;&lt;</code> — <code>[a b; c d]</code> түрінде. <code>main</code> дайын: екі матрица оқып, қосындысы мен көбейтіндісін шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nstruct Mat {\n    long long a, b, c, d;\n};\n\nMat operator+(const Mat& x, const Mat& y) {\n    return x;\n}\n\nMat operator*(const Mat& x, const Mat& y) {\n    return Mat{x.a * y.a, x.b * y.b, x.c * y.c, x.d * y.d};\n}\n\nostream& operator<<(ostream& os, const Mat& m) {\n    os << m.a << \" \" << m.b << \" \" << m.c << \" \" << m.d;\n    return os;\n}\n\nint main() {\n    Mat a, b;\n    cin >> a.a >> a.b >> a.c >> a.d;\n    cin >> b.a >> b.b >> b.c >> b.d;\n    cout << a + b << endl;\n    cout << a * b << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nstruct Mat {\n    long long a, b, c, d;\n};\n\nMat operator+(const Mat& x, const Mat& y) {\n    return Mat{x.a + y.a, x.b + y.b, x.c + y.c, x.d + y.d};\n}\n\nMat operator*(const Mat& x, const Mat& y) {\n    return Mat{x.a * y.a + x.b * y.c, x.a * y.b + x.b * y.d,\n               x.c * y.a + x.d * y.c, x.c * y.b + x.d * y.d};\n}\n\nostream& operator<<(ostream& os, const Mat& m) {\n    os << \"[\" << m.a << \" \" << m.b << \"; \" << m.c << \" \" << m.d << \"]\";\n    return os;\n}\n\nint main() {\n    Mat a, b;\n    cin >> a.a >> a.b >> a.c >> a.d;\n    cin >> b.a >> b.b >> b.c >> b.d;\n    cout << a + b << endl;\n    cout << a * b << endl;\n    return 0;\n}\n",
   "hints": [
    "Көбейтіндінің жоғарғы сол элементі: <code>x.a * y.a + x.b * y.c</code>.",
    "Жоғарғы оң: <code>x.a * y.b + x.b * y.d</code>; төменгілері дәл солай <code>c</code>, <code>d</code> жолымен."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1 2 3 4\n5 6 7 8\n",
      "out": "[6 8; 10 12]\n[19 22; 43 50]\n"
     },
     {
      "stdin": "1 1 1 0\n1 1 1 0\n",
      "out": "[2 2; 2 0]\n[2 1; 1 1]\n"
     },
     {
      "stdin": "2 0 0 2\n1 -1 3 4\n",
      "out": "[3 -1; 3 6]\n[2 -2; 6 8]\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Жалпыланған қосынды",
   "prompt": "<p>Екі function template жазыңыз: <code>template &lt;typename T&gt; T sumAll(const vector&lt;T&gt;&amp; v)</code> — барлық элементтің <code>+</code> арқылы қосындысы (бос емес вектор; жолдар үшін бұл біріктіру болады), <code>template &lt;typename T&gt; int countGreater(const vector&lt;T&gt;&amp; v, T x)</code> — <code>x</code>-тен қатаң үлкен элементтер саны. <code>main</code> дайын: <code>int</code>, <code>double</code> және <code>string</code> векторларымен шақырады.</p>",
   "starter": "#include <iostream>\n#include <iomanip>\n#include <string>\n#include <vector>\nusing namespace std;\n\ntemplate <typename T>\nT sumAll(const vector<T>& v) {\n    return v[0];\n}\n\ntemplate <typename T>\nint countGreater(const vector<T>& v, T x) {\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int k;\n    cin >> k;\n    vector<double> d(k);\n    for (int i = 0; i < k; i++) cin >> d[i];\n    int m;\n    cin >> m;\n    vector<string> w(m);\n    for (int i = 0; i < m; i++) cin >> w[i];\n    cout << sumAll(a) << \" \" << countGreater(a, 0) << endl;\n    cout << fixed << setprecision(1) << sumAll(d) << \" \" << countGreater(d, 1.5) << endl;\n    cout << sumAll(w) << \" \" << countGreater(w, string(\"m\")) << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <iomanip>\n#include <string>\n#include <vector>\nusing namespace std;\n\ntemplate <typename T>\nT sumAll(const vector<T>& v) {\n    T s = v[0];\n    for (size_t i = 1; i < v.size(); i++) s = s + v[i];\n    return s;\n}\n\ntemplate <typename T>\nint countGreater(const vector<T>& v, T x) {\n    int c = 0;\n    for (const T& e : v) if (x < e) c++;\n    return c;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int k;\n    cin >> k;\n    vector<double> d(k);\n    for (int i = 0; i < k; i++) cin >> d[i];\n    int m;\n    cin >> m;\n    vector<string> w(m);\n    for (int i = 0; i < m; i++) cin >> w[i];\n    cout << sumAll(a) << \" \" << countGreater(a, 0) << endl;\n    cout << fixed << setprecision(1) << sumAll(d) << \" \" << countGreater(d, 1.5) << endl;\n    cout << sumAll(w) << \" \" << countGreater(w, string(\"m\")) << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>T s = 0</code> жолдар үшін жұмыс істемейді — <code>T s = v[0];</code> деп бастап, 1-ден әрі қосыңыз.",
    "<code>x &lt; e</code> — «<code>e</code> үлкен» деген сөз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n1 -2 5\n2\n1.5 2.2\n3\nal ma ty\n",
      "out": "4 2\n3.7 1\nalmaty 2\n"
     },
     {
      "stdin": "1\n0\n1\n0.5\n1\nz\n",
      "out": "0 0\n0.5 0\nz 1\n"
     },
     {
      "stdin": "4\n10 20 30 -40\n3\n2 2 2\n2\nqazaq stan\n",
      "out": "20 3\n6.0 3\nqazaqstan 2\n"
     }
    ]
   }
  }
 ],
 "cp-11": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Жануарлар дыбысы",
   "prompt": "<p>Ферма бағдарламасында барлық жануар <code>...</code> деп «сөйлейді», себебі <code>Animal::sound</code> virtual емес. Класстарды түзетіңіз: base-те <code>virtual</code>, туынды класстарда <code>override</code>. <code>main</code> дайын: <code>dog</code>, <code>cat</code>, <code>cow</code> сөздерін оқып, әр жануардың дыбысын шығарады (<code>Hav</code>, <code>Miau</code>, <code>Mo</code>).</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Animal {\npublic:\n    string sound() const { return \"...\"; }\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal {\npublic:\n    string sound() const { return \"Hav\"; }\n};\n\nclass Cat : public Animal {\npublic:\n    string sound() const { return \"Miau\"; }\n};\n\nclass Cow : public Animal {\npublic:\n    string sound() const { return \"Mo\"; }\n};\n\nint main() {\n    vector<unique_ptr<Animal>> zoo;\n    string t;\n    while (cin >> t) {\n        if (t == \"dog\") zoo.push_back(make_unique<Dog>());\n        else if (t == \"cat\") zoo.push_back(make_unique<Cat>());\n        else zoo.push_back(make_unique<Cow>());\n    }\n    for (const auto& a : zoo) cout << a->sound() << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Animal {\npublic:\n    virtual string sound() const { return \"...\"; }\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal {\npublic:\n    string sound() const override { return \"Hav\"; }\n};\n\nclass Cat : public Animal {\npublic:\n    string sound() const override { return \"Miau\"; }\n};\n\nclass Cow : public Animal {\npublic:\n    string sound() const override { return \"Mo\"; }\n};\n\nint main() {\n    vector<unique_ptr<Animal>> zoo;\n    string t;\n    while (cin >> t) {\n        if (t == \"dog\") zoo.push_back(make_unique<Dog>());\n        else if (t == \"cat\") zoo.push_back(make_unique<Cat>());\n        else zoo.push_back(make_unique<Cow>());\n    }\n    for (const auto& a : zoo) cout << a->sound() << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>virtual string sound() const { ... }</code>",
    "Туынды класта: <code>string sound() const override { ... }</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "dog cat cow\n",
      "out": "Hav\nMiau\nMo\n"
     },
     {
      "stdin": "cow cow\n",
      "out": "Mo\nMo\n"
     },
     {
      "stdin": "cat\ndog\n",
      "out": "Miau\nHav\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Тұрақтағы дөңгелектер",
   "prompt": "<p>Абстрактілі <code>Vehicle</code> класында <code>virtual int wheels() const = 0</code> бар. Үш туынды класс жазыңыз: <code>Car</code> (4 дөңгелек), <code>Bike</code> (2), <code>Truck</code> (6). <code>main</code> дайын: <code>car</code>/<code>bike</code>/<code>truck</code> сөздерін кіріс біткенше оқып, барлық дөңгелек санын шығарады.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Vehicle {\npublic:\n    virtual int wheels() const = 0;\n    virtual ~Vehicle() {}\n};\n\nclass Car : public Vehicle {\npublic:\n    int wheels() const override { return 0; }\n};\n\nclass Bike : public Vehicle {\npublic:\n    int wheels() const override { return 0; }\n};\n\nclass Truck : public Vehicle {\npublic:\n    int wheels() const override { return 0; }\n};\n\nint main() {\n    vector<unique_ptr<Vehicle>> park;\n    string t;\n    while (cin >> t) {\n        if (t == \"car\") park.push_back(make_unique<Car>());\n        else if (t == \"bike\") park.push_back(make_unique<Bike>());\n        else park.push_back(make_unique<Truck>());\n    }\n    int total = 0;\n    for (const auto& v : park) total += v->wheels();\n    cout << total << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Vehicle {\npublic:\n    virtual int wheels() const = 0;\n    virtual ~Vehicle() {}\n};\n\nclass Car : public Vehicle {\npublic:\n    int wheels() const override { return 4; }\n};\n\nclass Bike : public Vehicle {\npublic:\n    int wheels() const override { return 2; }\n};\n\nclass Truck : public Vehicle {\npublic:\n    int wheels() const override { return 6; }\n};\n\nint main() {\n    vector<unique_ptr<Vehicle>> park;\n    string t;\n    while (cin >> t) {\n        if (t == \"car\") park.push_back(make_unique<Car>());\n        else if (t == \"bike\") park.push_back(make_unique<Bike>());\n        else park.push_back(make_unique<Truck>());\n    }\n    int total = 0;\n    for (const auto& v : park) total += v->wheels();\n    cout << total << endl;\n    return 0;\n}\n",
   "hints": [
    "Әр туынды класта <code>wheels()</code> өз санын қайтарсын."
   ],
   "check": {
    "cases": [
     {
      "stdin": "car bike truck\n",
      "out": "12\n"
     },
     {
      "stdin": "bike bike bike\n",
      "out": "6\n"
     },
     {
      "stdin": "truck car car\n",
      "out": "14\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Мектептегі рөлдер",
   "prompt": "<p><code>Person</code> класының <code>describe()</code> әдісі <code>аты - рөлі</code> деп шығарады, ал рөлді <code>role()</code> береді. Қазір <code>Student</code> мен <code>Teacher</code> үшін де <code>адам</code> шығады. <code>role()</code> әдісін virtual етіп түзетіңіз. <code>main</code> дайын: <code>S аты</code>, <code>T аты</code>, <code>P аты</code> жолдарын оқиды.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Person {\nprotected:\n    string name;\npublic:\n    Person(string n) : name(n) {}\n    string role() const { return \"адам\"; }\n    void describe() const { cout << name << \" - \" << role() << endl; }\n    virtual ~Person() {}\n};\n\nclass Student : public Person {\npublic:\n    Student(string n) : Person(n) {}\n    string role() const { return \"студент\"; }\n};\n\nclass Teacher : public Person {\npublic:\n    Teacher(string n) : Person(n) {}\n    string role() const { return \"мұғалім\"; }\n};\n\nint main() {\n    string t, name;\n    while (cin >> t >> name) {\n        if (t == \"S\") { Student s(name); s.describe(); }\n        else if (t == \"T\") { Teacher x(name); x.describe(); }\n        else { Person p(name); p.describe(); }\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Person {\nprotected:\n    string name;\npublic:\n    Person(string n) : name(n) {}\n    virtual string role() const { return \"адам\"; }\n    void describe() const { cout << name << \" - \" << role() << endl; }\n    virtual ~Person() {}\n};\n\nclass Student : public Person {\npublic:\n    Student(string n) : Person(n) {}\n    string role() const { return \"студент\"; }\n};\n\nclass Teacher : public Person {\npublic:\n    Teacher(string n) : Person(n) {}\n    string role() const { return \"мұғалім\"; }\n};\n\nint main() {\n    string t, name;\n    while (cin >> t >> name) {\n        if (t == \"S\") { Student s(name); s.describe(); }\n        else if (t == \"T\") { Teacher x(name); x.describe(); }\n        else { Person p(name); p.describe(); }\n    }\n    return 0;\n}\n",
   "hints": [
    "Base класс әдісі ішінен шақырылса да, <code>virtual</code> әдіс нысанның нақты типіне қарай таңдалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "S Dana\nT Aliya\nP Bolat\n",
      "out": "Dana - студент\nAliya - мұғалім\nBolat - адам\n"
     },
     {
      "stdin": "T Marat\n",
      "out": "Marat - мұғалім\n"
     },
     {
      "stdin": "S A\nS B\n",
      "out": "A - студент\nB - студент\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Айлық жалақы",
   "prompt": "<p>Абстрактілі <code>Employee</code> класы берілген (<code>pay()</code> — pure virtual). Үш туынды класс жазыңыз: <code>FullTime(name, salary)</code> — айлығы <code>salary</code>; <code>Hourly(name, rate, hours)</code> — <code>rate · hours</code>, ал 160 сағаттан асқан әр сағат 1.5 есе төленеді (<code>rate * 3 / 2</code>, бүтін); <code>Intern(name)</code> — тұрақты 85000. <code>main</code> дайын: әр қызметкердің жалақысын және барлығын шығарады.</p><p>Кіріс жолдары: <code>F аты айлық</code>, <code>H аты мөлшерлеме сағат</code>, <code>I аты</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Employee {\nprotected:\n    string name;\npublic:\n    Employee(string n) : name(n) {}\n    string getName() const { return name; }\n    virtual long long pay() const = 0;\n    virtual ~Employee() {}\n};\n\nclass FullTime : public Employee {\n    long long salary;\npublic:\n    FullTime(string n, long long s) : Employee(n), salary(s) {}\n    long long pay() const override { return 0; }\n};\n\nclass Hourly : public Employee {\n    long long rate, hours;\npublic:\n    Hourly(string n, long long r, long long h) : Employee(n), rate(r), hours(h) {}\n    long long pay() const override { return rate * hours; }\n};\n\nclass Intern : public Employee {\npublic:\n    Intern(string n) : Employee(n) {}\n    long long pay() const override { return 0; }\n};\n\nint main() {\n    vector<unique_ptr<Employee>> staff;\n    char t;\n    while (cin >> t) {\n        string name;\n        cin >> name;\n        if (t == 'F') { long long s; cin >> s; staff.push_back(make_unique<FullTime>(name, s)); }\n        else if (t == 'H') { long long r, h; cin >> r >> h; staff.push_back(make_unique<Hourly>(name, r, h)); }\n        else staff.push_back(make_unique<Intern>(name));\n    }\n    long long total = 0;\n    for (const auto& e : staff) {\n        cout << e->getName() << \" \" << e->pay() << endl;\n        total += e->pay();\n    }\n    cout << \"Барлығы \" << total << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Employee {\nprotected:\n    string name;\npublic:\n    Employee(string n) : name(n) {}\n    string getName() const { return name; }\n    virtual long long pay() const = 0;\n    virtual ~Employee() {}\n};\n\nclass FullTime : public Employee {\n    long long salary;\npublic:\n    FullTime(string n, long long s) : Employee(n), salary(s) {}\n    long long pay() const override { return salary; }\n};\n\nclass Hourly : public Employee {\n    long long rate, hours;\npublic:\n    Hourly(string n, long long r, long long h) : Employee(n), rate(r), hours(h) {}\n    long long pay() const override {\n        if (hours <= 160) return rate * hours;\n        return rate * 160 + (hours - 160) * (rate * 3 / 2);\n    }\n};\n\nclass Intern : public Employee {\npublic:\n    Intern(string n) : Employee(n) {}\n    long long pay() const override { return 85000; }\n};\n\nint main() {\n    vector<unique_ptr<Employee>> staff;\n    char t;\n    while (cin >> t) {\n        string name;\n        cin >> name;\n        if (t == 'F') { long long s; cin >> s; staff.push_back(make_unique<FullTime>(name, s)); }\n        else if (t == 'H') { long long r, h; cin >> r >> h; staff.push_back(make_unique<Hourly>(name, r, h)); }\n        else staff.push_back(make_unique<Intern>(name));\n    }\n    long long total = 0;\n    for (const auto& e : staff) {\n        cout << e->getName() << \" \" << e->pay() << endl;\n        total += e->pay();\n    }\n    cout << \"Барлығы \" << total << endl;\n    return 0;\n}\n",
   "hints": [
    "Үстеме сағат: <code>(hours - 160) * (rate * 3 / 2)</code>.",
    "<code>FullTime</code> мен <code>Intern</code> үшін <code>pay()</code> денесін толтырыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "F Aruzhan 450000\nH Bolat 2000 170\nI Dias\n",
      "out": "Aruzhan 450000\nBolat 350000\nDias 85000\nБарлығы 885000\n"
     },
     {
      "stdin": "H Ken 1500 100\n",
      "out": "Ken 150000\nБарлығы 150000\n"
     },
     {
      "stdin": "F A 1\nH B 3 161\n",
      "out": "A 1\nB 484\nБарлығы 485\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкен периметр",
   "prompt": "<p>Абстрактілі <code>Shape</code>-те екі pure virtual әдіс бар: <code>perimeter()</code> және <code>name()</code>. Үш класс жазыңыз: <code>Square(a)</code> (атауы <code>Шаршы</code>), <code>Rect(w, h)</code> (<code>Тіктөртбұрыш</code>), <code>Triangle(a, b, c)</code> (<code>Үшбұрыш</code>). <code>main</code> дайын: периметрі ең үлкен фигураның атауы мен периметрін шығарады (тең болса — біріншісі).</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual int perimeter() const = 0;\n    virtual string name() const = 0;\n    virtual ~Shape() {}\n};\n\nclass Square : public Shape {\n    int a;\npublic:\n    Square(int a) : a(a) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"Шаршы\"; }\n};\n\n// Rect және Triangle класстарын жазыңыз\nclass Rect : public Shape {\npublic:\n    Rect(int w, int h) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"\"; }\n};\n\nclass Triangle : public Shape {\npublic:\n    Triangle(int a, int b, int c) {}\n    int perimeter() const override { return 0; }\n    string name() const override { return \"\"; }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<unique_ptr<Shape>> v;\n    for (int i = 0; i < n; i++) {\n        char t;\n        cin >> t;\n        if (t == 'S') { int a; cin >> a; v.push_back(make_unique<Square>(a)); }\n        else if (t == 'R') { int w, h; cin >> w >> h; v.push_back(make_unique<Rect>(w, h)); }\n        else { int a, b, c; cin >> a >> b >> c; v.push_back(make_unique<Triangle>(a, b, c)); }\n    }\n    const Shape* best = v[0].get();\n    for (const auto& s : v)\n        if (s->perimeter() > best->perimeter()) best = s.get();\n    cout << best->name() << \" \" << best->perimeter() << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual int perimeter() const = 0;\n    virtual string name() const = 0;\n    virtual ~Shape() {}\n};\n\nclass Square : public Shape {\n    int a;\npublic:\n    Square(int a) : a(a) {}\n    int perimeter() const override { return 4 * a; }\n    string name() const override { return \"Шаршы\"; }\n};\n\nclass Rect : public Shape {\n    int w, h;\npublic:\n    Rect(int w, int h) : w(w), h(h) {}\n    int perimeter() const override { return 2 * (w + h); }\n    string name() const override { return \"Тіктөртбұрыш\"; }\n};\n\nclass Triangle : public Shape {\n    int a, b, c;\npublic:\n    Triangle(int a, int b, int c) : a(a), b(b), c(c) {}\n    int perimeter() const override { return a + b + c; }\n    string name() const override { return \"Үшбұрыш\"; }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<unique_ptr<Shape>> v;\n    for (int i = 0; i < n; i++) {\n        char t;\n        cin >> t;\n        if (t == 'S') { int a; cin >> a; v.push_back(make_unique<Square>(a)); }\n        else if (t == 'R') { int w, h; cin >> w >> h; v.push_back(make_unique<Rect>(w, h)); }\n        else { int a, b, c; cin >> a >> b >> c; v.push_back(make_unique<Triangle>(a, b, c)); }\n    }\n    const Shape* best = v[0].get();\n    for (const auto& s : v)\n        if (s->perimeter() > best->perimeter()) best = s.get();\n    cout << best->name() << \" \" << best->perimeter() << endl;\n    return 0;\n}\n",
   "hints": [
    "Әр класта өз өрістері мен initializer list-і бар constructor болсын."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nS 3\nR 2 5\nT 3 4 5\n",
      "out": "Тіктөртбұрыш 14\n"
     },
     {
      "stdin": "2\nT 10 10 10\nS 7\n",
      "out": "Үшбұрыш 30\n"
     },
     {
      "stdin": "1\nR 1 1\n",
      "out": "Тіктөртбұрыш 4\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Кредиттік шот",
   "prompt": "<p><code>Account</code> класы берілген: <code>withdraw</code> қаражат жеткіліксіз болса бас тартады. <code>Account</code>-тан мұраланатын <code>CreditAccount(balance, limit)</code> жазыңыз: ол <code>withdraw</code>-ды override етіп, балансты <code>-limit</code>-ке дейін түсіруге рұқсат етеді (одан төмен болса — бас тартады). <code>protected</code> өріс <code>balance</code>-ты қолданыңыз. <code>main</code> дайын: шот түрі (<code>A бастапқы</code> не <code>C бастапқы лимит</code>), сосын <code>q</code> шешім; соңғы балансты және бас тартылған шешімдер санын шығарады.</p>",
   "starter": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Account {\nprotected:\n    long long balance;\npublic:\n    Account(long long b) : balance(b) {}\n    virtual bool withdraw(long long x) {\n        if (x > balance) return false;\n        balance -= x;\n        return true;\n    }\n    long long getBalance() const { return balance; }\n    virtual ~Account() {}\n};\n\nclass CreditAccount : public Account {\n    long long limit;\npublic:\n    CreditAccount(long long b, long long l) : Account(b), limit(l) {}\n};\n\nint main() {\n    char t;\n    long long start;\n    cin >> t >> start;\n    unique_ptr<Account> acc;\n    if (t == 'C') {\n        long long limit;\n        cin >> limit;\n        acc = make_unique<CreditAccount>(start, limit);\n    } else {\n        acc = make_unique<Account>(start);\n    }\n    int q, failed = 0;\n    cin >> q;\n    for (int i = 0; i < q; i++) {\n        long long x;\n        cin >> x;\n        if (!acc->withdraw(x)) failed++;\n    }\n    cout << acc->getBalance() << \" \" << failed << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Account {\nprotected:\n    long long balance;\npublic:\n    Account(long long b) : balance(b) {}\n    virtual bool withdraw(long long x) {\n        if (x > balance) return false;\n        balance -= x;\n        return true;\n    }\n    long long getBalance() const { return balance; }\n    virtual ~Account() {}\n};\n\nclass CreditAccount : public Account {\n    long long limit;\npublic:\n    CreditAccount(long long b, long long l) : Account(b), limit(l) {}\n    bool withdraw(long long x) override {\n        if (balance - x < -limit) return false;\n        balance -= x;\n        return true;\n    }\n};\n\nint main() {\n    char t;\n    long long start;\n    cin >> t >> start;\n    unique_ptr<Account> acc;\n    if (t == 'C') {\n        long long limit;\n        cin >> limit;\n        acc = make_unique<CreditAccount>(start, limit);\n    } else {\n        acc = make_unique<Account>(start);\n    }\n    int q, failed = 0;\n    cin >> q;\n    for (int i = 0; i < q; i++) {\n        long long x;\n        cin >> x;\n        if (!acc->withdraw(x)) failed++;\n    }\n    cout << acc->getBalance() << \" \" << failed << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>bool withdraw(long long x) override</code> ішінде <code>balance - x &lt; -limit</code> болса <code>false</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "C 1000 5000\n3\n3000 2000 2000\n",
      "out": "-4000 1\n"
     },
     {
      "stdin": "A 1000\n3\n300 900 700\n",
      "out": "0 1\n"
     },
     {
      "stdin": "C 0 100\n2\n100 1\n",
      "out": "-100 1\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Хабарлама арналары",
   "prompt": "<p>Абстрактілі <code>Notifier</code> класын (<code>virtual void send(const string&amp; msg) const = 0</code>) және үш туынды класты жазыңыз:</p><ul><li><code>SmsNotifier</code>: <code>SMS: </code> + хабарламаның алғашқы 10 символы (қысқа болса — толық);</li><li><code>EmailNotifier</code>: <code>EMAIL: </code> + толық хабарлама;</li><li><code>PushNotifier</code>: <code>PUSH: </code> + бас әріптерге айналдырылған хабарлама.</li></ul><p><code>main</code> дайын: <code>n</code>, сосын әр жолда түрі (<code>sms</code>/<code>email</code>/<code>push</code>) мен хабарлама (латынша, бос орындары бар).</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\n#include <cctype>\nusing namespace std;\n\nclass Notifier {\npublic:\n    virtual void send(const string& msg) const = 0;\n    virtual ~Notifier() {}\n};\n\nclass SmsNotifier : public Notifier {\npublic:\n    void send(const string& msg) const override { cout << \"SMS: \" << msg << endl; }\n};\n\nclass EmailNotifier : public Notifier {\npublic:\n    void send(const string& msg) const override { cout << msg << endl; }\n};\n\nclass PushNotifier : public Notifier {\npublic:\n    void send(const string& msg) const override { cout << msg << endl; }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<unique_ptr<Notifier>> list;\n    for (int i = 0; i < n; i++) {\n        string t, msg;\n        cin >> t;\n        cin.ignore();\n        getline(cin, msg);\n        unique_ptr<Notifier> p;\n        if (t == \"sms\") p = make_unique<SmsNotifier>();\n        else if (t == \"email\") p = make_unique<EmailNotifier>();\n        else p = make_unique<PushNotifier>();\n        p->send(msg);\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\n#include <cctype>\nusing namespace std;\n\nclass Notifier {\npublic:\n    virtual void send(const string& msg) const = 0;\n    virtual ~Notifier() {}\n};\n\nclass SmsNotifier : public Notifier {\npublic:\n    void send(const string& msg) const override { cout << \"SMS: \" << msg.substr(0, 10) << endl; }\n};\n\nclass EmailNotifier : public Notifier {\npublic:\n    void send(const string& msg) const override { cout << \"EMAIL: \" << msg << endl; }\n};\n\nclass PushNotifier : public Notifier {\npublic:\n    void send(const string& msg) const override {\n        string up = msg;\n        for (char& c : up) c = toupper(c);\n        cout << \"PUSH: \" << up << endl;\n    }\n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<unique_ptr<Notifier>> list;\n    for (int i = 0; i < n; i++) {\n        string t, msg;\n        cin >> t;\n        cin.ignore();\n        getline(cin, msg);\n        unique_ptr<Notifier> p;\n        if (t == \"sms\") p = make_unique<SmsNotifier>();\n        else if (t == \"email\") p = make_unique<EmailNotifier>();\n        else p = make_unique<PushNotifier>();\n        p->send(msg);\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>msg.substr(0, 10)</code> жол қысқа болса да дұрыс жұмыс істейді.",
    "Бас әріпке: көшірмесін алып, <code>for (char&amp; c : up) c = toupper(c);</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\nsms Poyezd 18:40-ta ketedi\nemail Sabaq erteng 9-da\npush Aua raiy suyq\n",
      "out": "SMS: Poyezd 18:\nEMAIL: Sabaq erteng 9-da\nPUSH: AUA RAIY SUYQ\n"
     },
     {
      "stdin": "1\nsms Salem\n",
      "out": "SMS: Salem\n"
     },
     {
      "stdin": "2\npush ok\nemail a b c\n",
      "out": "PUSH: OK\nEMAIL: a b c\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Ең арзан көлік",
   "prompt": "<p>Қала ішіндегі жол бағасы: <code>Bus</code> — 15 км-ге дейін 200 тг, одан ұзақ болса 400 тг (ауысып міну); <code>Metro</code> — 10 км-ге дейін 150 тг, одан ұзақ жол метромен мүмкін емес (бағасын 1000000 деп алыңыз); <code>Taxi</code> — 120·km тг. Абстрактілі <code>Transport</code> (<code>cost</code>, <code>name</code>) бойынша үш класты және <code>const Transport* cheapest(const vector&lt;unique_ptr&lt;Transport&gt;&gt;&amp; v, int km)</code> функциясын жазыңыз (тең болса — тізімде бірінші тұрғаны). Атаулар: <code>Bus</code>, <code>Metro</code>, <code>Taxi</code>. <code>main</code> дайын: әр қашықтық үшін <code>km атауы бағасы</code> шығарады.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Transport {\npublic:\n    virtual int cost(int km) const = 0;\n    virtual string name() const = 0;\n    virtual ~Transport() {}\n};\n\nclass Bus : public Transport {\npublic:\n    int cost(int km) const override { return 200; }\n    string name() const override { return \"Bus\"; }\n};\n\nclass Metro : public Transport {\npublic:\n    int cost(int km) const override { return 150; }\n    string name() const override { return \"Metro\"; }\n};\n\nclass Taxi : public Transport {\npublic:\n    int cost(int km) const override { return 120 * km; }\n    string name() const override { return \"Taxi\"; }\n};\n\nconst Transport* cheapest(const vector<unique_ptr<Transport>>& v, int km) {\n    return v[0].get();\n}\n\nint main() {\n    vector<unique_ptr<Transport>> options;\n    options.push_back(make_unique<Bus>());\n    options.push_back(make_unique<Metro>());\n    options.push_back(make_unique<Taxi>());\n    int km;\n    while (cin >> km) {\n        const Transport* best = cheapest(options, km);\n        cout << km << \" \" << best->name() << \" \" << best->cost(km) << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Transport {\npublic:\n    virtual int cost(int km) const = 0;\n    virtual string name() const = 0;\n    virtual ~Transport() {}\n};\n\nclass Bus : public Transport {\npublic:\n    int cost(int km) const override { return km <= 15 ? 200 : 400; }\n    string name() const override { return \"Bus\"; }\n};\n\nclass Metro : public Transport {\npublic:\n    int cost(int km) const override { return km <= 10 ? 150 : 1000000; }\n    string name() const override { return \"Metro\"; }\n};\n\nclass Taxi : public Transport {\npublic:\n    int cost(int km) const override { return 120 * km; }\n    string name() const override { return \"Taxi\"; }\n};\n\nconst Transport* cheapest(const vector<unique_ptr<Transport>>& v, int km) {\n    const Transport* best = v[0].get();\n    for (const auto& t : v)\n        if (t->cost(km) < best->cost(km)) best = t.get();\n    return best;\n}\n\nint main() {\n    vector<unique_ptr<Transport>> options;\n    options.push_back(make_unique<Bus>());\n    options.push_back(make_unique<Metro>());\n    options.push_back(make_unique<Taxi>());\n    int km;\n    while (cin >> km) {\n        const Transport* best = cheapest(options, km);\n        cout << km << \" \" << best->name() << \" \" << best->cost(km) << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "<code>cost</code> ішінде тернарлы операторды қолдануға болады: <code>km &lt;= 15 ? 200 : 400</code>.",
    "<code>cheapest</code>: <code>v[0].get()</code>-тен бастап, қатаң арзанын іздеңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "1\n5\n12\n20\n",
      "out": "1 Taxi 120\n5 Metro 150\n12 Bus 200\n20 Bus 400\n"
     },
     {
      "stdin": "10\n11\n",
      "out": "10 Metro 150\n11 Bus 200\n"
     },
     {
      "stdin": "3\n16\n",
      "out": "3 Metro 150\n16 Bus 400\n"
     }
    ]
   }
  }
 ],
 "cp-12": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Қайталанбайтын сандар",
   "prompt": "<p>Сандар кіріс біткенше беріледі. Әр түрлі мәндерді өсу ретімен бір жолға бос орын арқылы шығарыңыз. <code>set</code> қолданыңыз.</p>",
   "starter": "#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n    set<int> s;\n    int x;\n    while (cin >> x) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n    set<int> s;\n    int x;\n    while (cin >> x) s.insert(x);\n    for (int v : s) cout << v << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>s.insert(x)</code> қайталануды өзі алып тастайды, ал <code>set</code> бойынша цикл өсу ретімен жүреді."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5 1 5 3 1\n",
      "out": "1 3 5 \n"
     },
     {
      "stdin": "-2 -2 -2\n",
      "out": "-2 \n"
     },
     {
      "stdin": "10 9 8 7\n",
      "out": "7 8 9 10 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Кему ретімен сұрыптау",
   "prompt": "<p><code>n</code>, сосын <code>n</code> сан (жарыс ұпайлары) берілген. Оларды кему ретімен шығарыңыз. <code>sort</code> пен <code>greater&lt;int&gt;()</code> қолданыңыз.</p>",
   "starter": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    sort(v.begin(), v.end());\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    sort(v.begin(), v.end(), greater<int>());\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>sort(v.begin(), v.end(), greater&lt;int&gt;());</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n3 9 1 7 3\n",
      "out": "9 7 3 3 1 \n"
     },
     {
      "stdin": "1\n4\n",
      "out": "4 \n"
     },
     {
      "stdin": "4\n-1 -5 0 2\n",
      "out": "2 0 -1 -5 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Мән неше рет кездеседі",
   "prompt": "<p><code>n</code>, сосын <code>n</code> сан, соңында іздейтін сан <code>x</code> берілген. <code>x</code> неше рет кездесетінін <code>count</code> алгоритмімен табыңыз.</p>",
   "starter": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, x;\n    cin >> n;\n    vector<int> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    cin >> x;\n    cout << 0 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, x;\n    cin >> n;\n    vector<int> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i];\n    cin >> x;\n    cout << count(v.begin(), v.end(), x) << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>count(v.begin(), v.end(), x)</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\n1 2 2 3 2 5\n2\n",
      "out": "3\n"
     },
     {
      "stdin": "3\n1 1 1\n7\n",
      "out": "0\n"
     },
     {
      "stdin": "1\n0\n0\n",
      "out": "1\n"
     }
    ],
    "mustInclude": [
     "count("
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Ең жиі сөз",
   "prompt": "<p>Мәтіндегі сөздер (кіші латын әріптері) кіріс біткенше беріледі. Ең жиі кездесетін сөзді және оның санын шығарыңыз. Бірнешеу болса — әліпби бойынша ең алдыңғысы. <code>map&lt;string, int&gt;</code> қолданыңыз.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <map>\nusing namespace std;\n\nint main() {\n    map<string, int> freq;\n    string w;\n    while (cin >> w) freq[w]++;\n    cout << freq.begin()->first << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <map>\nusing namespace std;\n\nint main() {\n    map<string, int> freq;\n    string w;\n    while (cin >> w) freq[w]++;\n    string best;\n    int cnt = 0;\n    for (const auto& [word, c] : freq) {\n        if (c > cnt) {\n            best = word;\n            cnt = c;\n        }\n    }\n    cout << best << \" \" << cnt << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>map</code> кілттері сұрыпталған: тек <b>қатаң</b> үлкенін ауыстырсаңыз, тең жағдайда әліпби бойынша біріншісі қалады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "alma anar alma shai anar alma\n",
      "out": "alma 3\n"
     },
     {
      "stdin": "b a\n",
      "out": "a 1\n"
     },
     {
      "stdin": "qala dala qala dala\n",
      "out": "dala 2\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Анаграмма тексеру",
   "prompt": "<p>Кіші латын әріптерінен тұратын екі сөз берілген. Бір сөздің әріптерін ауыстырып, екіншісін алуға болса (анаграмма), <code>YES</code>, әйтпесе <code>NO</code> шығарыңыз. Кеңес: екі жолды да <code>sort</code> арқылы сұрыптап салыстырыңыз.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    cout << (a == b ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    sort(a.begin(), a.end());\n    sort(b.begin(), b.end());\n    cout << (a == b ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>string</code> да контейнер: <code>sort(a.begin(), a.end())</code> әріптерді сұрыптайды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "listen silent\n",
      "out": "YES\n"
     },
     {
      "stdin": "alma amal\n",
      "out": "YES\n"
     },
     {
      "stdin": "aab abb\n",
      "out": "NO\n"
     },
     {
      "stdin": "abc abcd\n",
      "out": "NO\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Қалалар бойынша оқушылар",
   "prompt": "<p><code>n</code>, сосын әр жолда <code>қала аты</code> берілген (олимпиадаға қатысушылар). Қалаларды әліпби ретімен, әр қаланың қатысушыларын да әліпби ретімен шығарыңыз: <code>қала: аты1 аты2 ...</code>. <code>map&lt;string, vector&lt;string&gt;&gt;</code> қолданыңыз.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    map<string, vector<string>> byCity;\n    for (int i = 0; i < n; i++) {\n        string city, name;\n        cin >> city >> name;\n        byCity[city].push_back(name);\n    }\n    for (auto& [city, names] : byCity) {\n        cout << city << \":\";\n        for (const string& s : names) cout << \" \" << s;\n        cout << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    map<string, vector<string>> byCity;\n    for (int i = 0; i < n; i++) {\n        string city, name;\n        cin >> city >> name;\n        byCity[city].push_back(name);\n    }\n    for (auto& [city, names] : byCity) {\n        sort(names.begin(), names.end());\n        cout << city << \":\";\n        for (const string& s : names) cout << \" \" << s;\n        cout << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "Қалалар <code>map</code> арқылы өзі сұрыпталады, ал аттарды әр вектор ішінде <code>sort</code> етіңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\nAstana Dana\nAlmaty Ruslan\nAstana Ali\nAlmaty Aigerim\nAktau Saya\n",
      "out": "Aktau: Saya\nAlmaty: Aigerim Ruslan\nAstana: Ali Dana\n"
     },
     {
      "stdin": "1\nTaraz Bek\n",
      "out": "Taraz: Bek\n"
     },
     {
      "stdin": "3\nOral C\nOral B\nOral A\n",
      "out": "Oral: A B C\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Екі тізімнің ортақ мәндері",
   "prompt": "<p>Екі сыныптың оқушылар ID-лері берілген: <code>n</code> және <code>n</code> сан, сосын <code>m</code> және <code>m</code> сан. Екі тізімде де бар ID-лерді (қайталамай) өсу ретімен шығарыңыз; ондай жоқ болса — <code>NONE</code>. Кеңес: бірінші тізімді <code>set</code>-ке салып, екіншісін <code>count</code> арқылы тексеріңіз.</p>",
   "starter": "#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n;\n    set<int> a;\n    for (int i = 0; i < n; i++) { int x; cin >> x; a.insert(x); }\n    cin >> m;\n    set<int> common;\n    cout << \"NONE\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <set>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n;\n    set<int> a;\n    for (int i = 0; i < n; i++) { int x; cin >> x; a.insert(x); }\n    cin >> m;\n    set<int> common;\n    for (int i = 0; i < m; i++) {\n        int x;\n        cin >> x;\n        if (a.count(x)) common.insert(x);\n    }\n    if (common.empty()) cout << \"NONE\";\n    for (int v : common) cout << v << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>a.count(x)</code> — бар болса 1, жоқ болса 0.",
    "Нәтижені де <code>set</code>-ке жинасаңыз, қайталау мен рет өздігінен шешіледі."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n1 5 3 9 7\n4\n9 2 3 3\n",
      "out": "3 9 \n"
     },
     {
      "stdin": "2\n1 2\n2\n3 4\n",
      "out": "NONE\n"
     },
     {
      "stdin": "3\n5 5 5\n2\n5 5\n",
      "out": "5 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Үздік үш команда",
   "prompt": "<p>Спартакиада: <code>n</code>, сосын әр жолда <code>спортшы команда ұпай</code>. Әр команданың жалпы ұпайын есептеп, ең көп ұпай жинаған ең көбі 3 команданы <code>команда ұпай</code> түрінде шығарыңыз: ұпай кемуі бойынша, тең болса атауы бойынша әліпби ретімен. <code>map</code>, <code>vector&lt;pair&lt;string, int&gt;&gt;</code> және lambda-лы <code>sort</code> қолданыңыз.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    map<string, int> total;\n    for (int i = 0; i < n; i++) {\n        string who, team;\n        int pts;\n        cin >> who >> team >> pts;\n        total[team] += pts;\n    }\n    for (const auto& [team, pts] : total) cout << team << \" \" << pts << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    map<string, int> total;\n    for (int i = 0; i < n; i++) {\n        string who, team;\n        int pts;\n        cin >> who >> team >> pts;\n        total[team] += pts;\n    }\n    vector<pair<string, int>> v(total.begin(), total.end());\n    sort(v.begin(), v.end(), [](const pair<string, int>& a, const pair<string, int>& b) {\n        if (a.second != b.second) return a.second > b.second;\n        return a.first < b.first;\n    });\n    for (int i = 0; i < (int)v.size() && i < 3; i++) cout << v[i].first << \" \" << v[i].second << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>vector&lt;pair&lt;string, int&gt;&gt; v(total.begin(), total.end());</code> map-ты векторға көшіреді.",
    "Lambda: алдымен <code>second</code> кемуі, тең болса <code>first</code> өсуі."
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\nAli Barys 10\nDana Sunkar 15\nErlan Barys 7\nSaya Irbis 17\nTimur Kulan 5\nAset Kulan 12\n",
      "out": "Barys 17\nIrbis 17\nKulan 17\n"
     },
     {
      "stdin": "2\nA X 5\nB Y 5\n",
      "out": "X 5\nY 5\n"
     },
     {
      "stdin": "4\nA t1 1\nB t2 2\nC t3 3\nD t4 4\n",
      "out": "t4 4\nt3 3\nt2 2\n"
     }
    ]
   }
  }
 ],
 "cp-13": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Рекурсивті факториал",
   "prompt": "<p>Рекурсивті <code>long long factorial(int n)</code> функциясын жазыңыз (0 ≤ n ≤ 20, <code>0! = 1</code>). Цикл қолданбаңыз. <code>main</code> дайын.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    return 1;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << factorial(n) << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nlong long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << factorial(n) << endl;\n    return 0;\n}\n",
   "hints": [
    "Базалық жағдай: <code>n &lt;= 1</code> болса 1.",
    "Рекурсивті қадам: <code>n * factorial(n - 1)</code>."
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
      "stdin": "20\n",
      "out": "2432902008176640000\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Дәрежені рекурсиямен",
   "prompt": "<p>Рекурсивті <code>long long power(long long a, int n)</code> функциясын жазыңыз: <code>a<sup>n</sup></code> (n ≥ 0, нәтиже <code>long long</code>-қа сыяды). <code>power(a, 0) = 1</code>, <code>power(a, n) = a · power(a, n − 1)</code>. <code>main</code> дайын.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nlong long power(long long a, int n) {\n    return a;\n}\n\nint main() {\n    long long a;\n    int n;\n    cin >> a >> n;\n    cout << power(a, n) << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nlong long power(long long a, int n) {\n    if (n == 0) return 1;\n    return a * power(a, n - 1);\n}\n\nint main() {\n    long long a;\n    int n;\n    cin >> a >> n;\n    cout << power(a, n) << endl;\n    return 0;\n}\n",
   "hints": [
    "Базалық жағдай — <code>n == 0</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "2 10\n",
      "out": "1024\n"
     },
     {
      "stdin": "7 0\n",
      "out": "1\n"
     },
     {
      "stdin": "-3 3\n",
      "out": "-27\n"
     },
     {
      "stdin": "10 18\n",
      "out": "1000000000000000000\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Жолды рекурсиямен аудару",
   "prompt": "<p>Рекурсивті <code>string reverseStr(const string&amp; s)</code> функциясын жазыңыз: бос жол өзін қайтарады, әйтпесе <code>reverseStr(s.substr(1)) + s[0]</code>. Цикл қолданбаңыз. <code>main</code> дайын: латынша бір сөзді оқиды.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstring reverseStr(const string& s) {\n    return s;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << reverseStr(s) << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstring reverseStr(const string& s) {\n    if (s.empty()) return s;\n    return reverseStr(s.substr(1)) + s[0];\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << reverseStr(s) << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>s.empty()</code> — базалық жағдай."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Astana\n",
      "out": "anatsA\n"
     },
     {
      "stdin": "a\n",
      "out": "a\n"
     },
     {
      "stdin": "qazaqstan\n",
      "out": "natsqazaq\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Фибоначчи мемоизациямен",
   "prompt": "<p><code>n</code> берілген (0 ≤ n ≤ 90). <code>F(0) = 0</code>, <code>F(1) = 1</code>, <code>F(n) = F(n−1) + F(n−2)</code>. Рекурсияны есептелген мәндерді сақтайтын <code>vector&lt;long long&gt; memo</code> арқылы жылдамдатыңыз: әйтпесе <code>n = 90</code> үшін бағдарлама ешқашан аяқталмайды.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<long long> memo(91, -1);\n\nlong long fib(int n) {\n    if (n < 2) return n;\n    // memo-ны тексеріп, fib(n - 1) + fib(n - 2) нәтижесін сақтаңыз\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<long long> memo(91, -1);\n\nlong long fib(int n) {\n    if (n < 2) return n;\n    if (memo[n] != -1) return memo[n];\n    memo[n] = fib(n - 1) + fib(n - 2);\n    return memo[n];\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << fib(n) << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>vector&lt;long long&gt; memo(91, -1);</code> — <code>-1</code> «әлі есептелмеген» дегенді білдіреді.",
    "Есептемес бұрын <code>memo[n]</code> толы ма, соны тексеріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "10\n",
      "out": "55\n"
     },
     {
      "stdin": "1\n",
      "out": "1\n"
     },
     {
      "stdin": "90\n",
      "out": "2880067194370816120\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Exception-сіз бөлу",
   "prompt": "<p>Браузер компиляторы exception-ды қолдамайды, сондықтан қатені <code>bool</code> арқылы хабарлаймыз. <code>bool safeDivide(int a, int b, int&amp; result)</code> жазыңыз: <code>b == 0</code> болса <code>false</code>, әйтпесе <code>result = a / b</code> (бүтін бөлу) және <code>true</code>. <code>main</code> дайын: жұптарды кіріс біткенше оқып, нәтижені не <code>Қате: нөлге бөлу</code> шығарады.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nbool safeDivide(int a, int b, int& result) {\n    result = 0;\n    return true;\n}\n\nint main() {\n    int a, b, r;\n    while (cin >> a >> b) {\n        if (safeDivide(a, b, r)) cout << r << endl;\n        else cout << \"Қате: нөлге бөлу\" << endl;\n    }\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nbool safeDivide(int a, int b, int& result) {\n    if (b == 0) return false;\n    result = a / b;\n    return true;\n}\n\nint main() {\n    int a, b, r;\n    while (cin >> a >> b) {\n        if (safeDivide(a, b, r)) cout << r << endl;\n        else cout << \"Қате: нөлге бөлу\" << endl;\n    }\n    return 0;\n}\n",
   "hints": [
    "Нәтиже reference арқылы қайтарылады, ал сәттілік — <code>return</code> арқылы."
   ],
   "check": {
    "cases": [
     {
      "stdin": "10 3\n5 0\n",
      "out": "3\nҚате: нөлге бөлу\n"
     },
     {
      "stdin": "0 7\n",
      "out": "0\n"
     },
     {
      "stdin": "-9 2\n1 0\n100 10\n",
      "out": "-4\nҚате: нөлге бөлу\n10\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Ханой мұнаралары",
   "prompt": "<p><code>n</code> диск 1-діңгектен 3-діңгекке көшірілуі керек (үлкен диск кішісінің үстіне қойылмайды). Бірінші жолға жүрістер санын, сосын әр жүрісті <code>a -&gt; b</code> түрінде шығарыңыз. Рекурсия: <code>n−1</code> дискті көмекші діңгекке, ең үлкенін мақсатқа, сосын <code>n−1</code> дискті оның үстіне. 1 ≤ n ≤ 10.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nvoid hanoi(int n, int from, int to, int via) {\n    cout << from << \" -> \" << to << endl;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << (1 << n) - 1 << endl;\n    hanoi(n, 1, 3, 2);\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nvoid hanoi(int n, int from, int to, int via) {\n    if (n == 0) return;\n    hanoi(n - 1, from, via, to);\n    cout << from << \" -> \" << to << endl;\n    hanoi(n - 1, via, to, from);\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << (1 << n) - 1 << endl;\n    hanoi(n, 1, 3, 2);\n    return 0;\n}\n",
   "hints": [
    "Базалық жағдай: <code>n == 0</code> — ештеңе жасамау.",
    "<code>hanoi(n - 1, from, via, to); жүріс; hanoi(n - 1, via, to, from);</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "1\n",
      "out": "1\n1 -> 3\n"
     },
     {
      "stdin": "2\n",
      "out": "3\n1 -> 2\n1 -> 3\n2 -> 3\n"
     },
     {
      "stdin": "3\n",
      "out": "7\n1 -> 3\n1 -> 2\n3 -> 2\n1 -> 3\n2 -> 1\n2 -> 3\n1 -> 3\n"
     },
     {
      "stdin": "6\n",
      "out": "63\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n3 -> 2\n1 -> 2\n3 -> 1\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n1 -> 2\n3 -> 1\n3 -> 2\n1 -> 2\n1 -> 3\n2 -> 3\n2 -> 1\n3 -> 1\n2 -> 3\n1 -> 2\n1 -> 3\n2 -> 3\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Барлық ауыстырулар",
   "prompt": "<p>Әртүрлі кіші латын әріптерінен тұратын сөз берілген (ұзындығы 1–7). Оның әріптерінің барлық ауыстыруларын лексикографиялық ретпен, әр жолға біреуден шығарыңыз. Backtracking: әріптерді алдымен сұрыптап, әр қадамда әлі қолданылмаған әріпті (<code>vector&lt;bool&gt; used</code>) қосыңыз.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    cout << s << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid gen(const string& s, string& cur, vector<bool>& used) {\n    if (cur.size() == s.size()) {\n        cout << cur << endl;\n        return;\n    }\n    for (size_t i = 0; i < s.size(); i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        cur.push_back(s[i]);\n        gen(s, cur, used);\n        cur.pop_back();\n        used[i] = false;\n    }\n}\n\nint main() {\n    string s;\n    cin >> s;\n    sort(s.begin(), s.end());\n    string cur;\n    vector<bool> used(s.size(), false);\n    gen(s, cur, used);\n    return 0;\n}\n",
   "hints": [
    "Әріптер сұрыпталған болса, оларды солдан оңға қарай таңдау лексикографиялық ретті береді.",
    "Рекурсиядан қайтқанда таңдауды кері алыңыз: <code>cur.pop_back(); used[i] = false;</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "abc\n",
      "out": "abc\nacb\nbac\nbca\ncab\ncba\n"
     },
     {
      "stdin": "ba\n",
      "out": "ab\nba\n"
     },
     {
      "stdin": "z\n",
      "out": "z\n"
     },
     {
      "stdin": "dcab\n",
      "out": "abcd\nabdc\nacbd\nacdb\nadbc\nadcb\nbacd\nbadc\nbcad\nbcda\nbdac\nbdca\ncabd\ncadb\ncbad\ncbda\ncdab\ncdba\ndabc\ndacb\ndbac\ndbca\ndcab\ndcba\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Қосындысы берілген жиындар",
   "prompt": "<p><code>n</code> және <code>target</code>, сосын <code>n</code> оң бүтін сан (тиын номиналдары, n ≤ 20) берілген. Элементтерінің қосындысы дәл <code>target</code> болатын ішкі жиындар санын шығарыңыз (әр элемент не алынады, не алынбайды; бірдей мәндер әртүрлі элемент болып саналады). Рекурсия: <code>count(i, rest)</code> — <code>i</code>-элементтен бастап, қалған соманы жинау тәсілдері.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, target;\n    cin >> n >> target;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    cout << 0 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> a;\n\nlong long countWays(int i, int rest) {\n    if (rest == 0) return 1;\n    if (i == (int)a.size() || rest < 0) return 0;\n    return countWays(i + 1, rest - a[i]) + countWays(i + 1, rest);\n}\n\nint main() {\n    int n, target;\n    cin >> n >> target;\n    a.resize(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    cout << countWays(0, target) << endl;\n    return 0;\n}\n",
   "hints": [
    "Екі тармақ: <code>a[i]</code> алынады (<code>rest - a[i]</code>) не алынбайды.",
    "Барлық сан оң, сондықтан <code>rest == 0</code> болғанда бірден 1 қайтаруға болады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4 5\n1 2 3 4\n",
      "out": "2\n"
     },
     {
      "stdin": "3 10\n1 2 3\n",
      "out": "0\n"
     },
     {
      "stdin": "5 4\n2 2 2 2 2\n",
      "out": "10\n"
     },
     {
      "stdin": "20 10\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1\n",
      "out": "184756\n"
     }
    ]
   }
  }
 ],
 "cp-p1": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Ең жиі әріп",
   "prompt": "<p>Кіші латын әріптерінен тұратын сөз берілген. Ең жиі кездесетін әріпті және оның санын шығарыңыз; тең болса — әліпби бойынша ертерегі. Кеңес: <code>vector&lt;int&gt; cnt(26)</code>, индекс <code>c - 'a'</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    cout << s[0] << \" \" << 1 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    vector<int> cnt(26, 0);\n    for (char c : s) cnt[c - 'a']++;\n    int best = 0;\n    for (int i = 1; i < 26; i++)\n        if (cnt[i] > cnt[best]) best = i;\n    cout << char('a' + best) << \" \" << cnt[best] << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>cnt[c - 'a']++</code> — әр әріптің санауышы.",
    "Әріпке қайта айналдыру: <code>char('a' + i)</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "banana\n",
      "out": "a 3\n"
     },
     {
      "stdin": "abc\n",
      "out": "a 1\n"
     },
     {
      "stdin": "zzyy\n",
      "out": "y 2\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Жұп пен тақ айырмасы",
   "prompt": "<p><code>n</code>, сосын <code>n</code> бүтін сан берілген. Жұп сандардың қосындысынан тақ сандардың қосындысын азайтып шығарыңыз. Мысалы, <code>1 2 3 4</code> → <code>(2 + 4) − (1 + 3) = 2</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    long long diff = 0;\n    cout << diff << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    long long diff = 0;\n    for (int i = 0; i < n; i++) {\n        long long x;\n        cin >> x;\n        if (x % 2 == 0) diff += x;\n        else diff -= x;\n    }\n    cout << diff << endl;\n    return 0;\n}\n",
   "hints": [
    "Тақ санды <code>x % 2 != 0</code> арқылы тексеріңіз — теріс тақ сандар үшін қалдық <code>-1</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n1 2 3 4\n",
      "out": "2\n"
     },
     {
      "stdin": "3\n-3 -2 5\n",
      "out": "-4\n"
     },
     {
      "stdin": "1\n7\n",
      "out": "-7\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Сөйлемдегі сөздер саны",
   "prompt": "<p>Бір жол мәтін берілген: сөздер бір немесе бірнеше бос орынмен бөлінген, басында және соңында да бос орын болуы мүмкін. Сөздер санын шығарыңыз. Кеңес: символ бос орын емес және алдыңғысы бос орын (не жолдың басы) болса — жаңа сөз басталды.</p>",
   "starter": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    int words = 0;\n    for (char c : line)\n        if (c == ' ') words++;\n    cout << words + 1 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    int words = 0;\n    char prev = ' ';\n    for (char c : line) {\n        if (c != ' ' && prev == ' ') words++;\n        prev = c;\n    }\n    cout << words << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>char prev = ' ';</code> деп бастасаңыз, жолдың басы да «бос орынның артынан» саналады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "Bugin aua raiy jaqsy\n",
      "out": "4\n"
     },
     {
      "stdin": "   eki   bos  oryn  \n",
      "out": "3\n"
     },
     {
      "stdin": "soz\n",
      "out": "1\n"
     },
     {
      "stdin": "     \n",
      "out": "0\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Жұпсыз қалған сан",
   "prompt": "<p><code>n</code> (тақ), сосын <code>n</code> сан берілген: бір саннан басқасының бәрі дәл екі рет кездеседі. Жұпсыз санды шығарыңыз. O(n) уақыт пен O(1) қосымша жад: XOR амалы <code>^</code> — <code>x ^ x = 0</code>, <code>x ^ 0 = x</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int x, res = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> x;\n        res += x;\n    }\n    cout << res << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int x, res = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> x;\n        res ^= x;\n    }\n    cout << res << endl;\n    return 0;\n}\n",
   "hints": [
    "Барлық санды XOR етсеңіз, жұптар бірін-бірі жояды."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n4 1 2 1 2\n",
      "out": "4\n"
     },
     {
      "stdin": "1\n99\n",
      "out": "99\n"
     },
     {
      "stdin": "7\n7 3 5 3 7 9 5\n",
      "out": "9\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкен ішкі қосынды",
   "prompt": "<p><code>n</code>, сосын <code>n</code> бүтін сан (күндік пайда не шығын) берілген. Қатар тұрған бос емес бөліктің ең үлкен қосындысын шығарыңыз. Kadane алгоритмі: <code>cur = max(x, cur + x)</code>, <code>best = max(best, cur)</code>. Мысалы, <code>-2 1 -3 4 -1 2 1 -5 4</code> → <code>6</code>.</p>",
   "starter": "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    long long sum = 0, x;\n    for (int i = 0; i < n; i++) {\n        cin >> x;\n        sum += x;\n    }\n    cout << sum << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    long long x;\n    cin >> x;\n    long long cur = x, best = x;\n    for (int i = 1; i < n; i++) {\n        cin >> x;\n        cur = max(x, cur + x);\n        best = max(best, cur);\n    }\n    cout << best << endl;\n    return 0;\n}\n",
   "hints": [
    "Бірінші элементпен <code>cur</code> мен <code>best</code>-ті бастаңыз — барлығы теріс болса да жауап дұрыс шығады."
   ],
   "check": {
    "cases": [
     {
      "stdin": "9\n-2 1 -3 4 -1 2 1 -5 4\n",
      "out": "6\n"
     },
     {
      "stdin": "3\n-5 -1 -8\n",
      "out": "-1\n"
     },
     {
      "stdin": "4\n1 2 3 4\n",
      "out": "10\n"
     },
     {
      "stdin": "5\n5 -10 3 3 -1\n",
      "out": "6\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Палиндромға жинау",
   "prompt": "<p>Кіші латын әріптерінен тұратын сөз берілген. Әріптерінің орнын ауыстырып, палиндром жасауға бола ма? Бола болса <code>YES</code>, әйтпесе <code>NO</code>. Ереже: тақ рет кездесетін әріптер саны 1-ден аспауы керек.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    cout << \"YES\" << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    vector<int> cnt(26, 0);\n    for (char c : s) cnt[c - 'a']++;\n    int odd = 0;\n    for (int c : cnt)\n        if (c % 2 == 1) odd++;\n    cout << (odd <= 1 ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n",
   "hints": [
    "Әр әріпті санап, тақ санауыштарды есептеңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "aabbc\n",
      "out": "YES\n"
     },
     {
      "stdin": "abc\n",
      "out": "NO\n"
     },
     {
      "stdin": "qazaq\n",
      "out": "YES\n"
     },
     {
      "stdin": "aabb\n",
      "out": "YES\n"
     },
     {
      "stdin": "ab\n",
      "out": "NO\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Аралықтарды біріктіру",
   "prompt": "<p>Мәжіліс залының брондары: <code>n</code>, сосын <code>n</code> аралық <code>l r</code> (l ≤ r). Қиылысатын не жанасатын (<code>[1,3]</code> және <code>[3,5]</code>) аралықтарды біріктіріп, нәтижені басы бойынша өсу ретімен <code>l r</code> түрінде шығарыңыз. Алдымен <code>sort</code>, сосын бір өту.</p>",
   "starter": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<pair<int, int>> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;\n    for (auto& p : v) cout << p.first << \" \" << p.second << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<pair<int, int>> v(n);\n    for (int i = 0; i < n; i++) cin >> v[i].first >> v[i].second;\n    sort(v.begin(), v.end());\n    vector<pair<int, int>> res;\n    for (auto& p : v) {\n        if (!res.empty() && p.first <= res.back().second)\n            res.back().second = max(res.back().second, p.second);\n        else\n            res.push_back(p);\n    }\n    for (auto& p : res) cout << p.first << \" \" << p.second << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>pair</code> векторы <code>sort</code> кезінде алдымен <code>first</code> бойынша сұрыпталады.",
    "Келесі аралық соңғысымен қиылысса (<code>p.first &lt;= res.back().second</code>), соңын <code>max</code> арқылы ұзартыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4\n1 3\n8 10\n2 6\n15 18\n",
      "out": "1 6\n8 10\n15 18\n"
     },
     {
      "stdin": "2\n1 3\n3 5\n",
      "out": "1 5\n"
     },
     {
      "stdin": "3\n5 6\n1 10\n2 3\n",
      "out": "1 10\n"
     },
     {
      "stdin": "2\n4 4\n1 2\n",
      "out": "1 2\n4 4\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Ең жиі k мән",
   "prompt": "<p><code>n</code> және <code>k</code>, сосын <code>n</code> сан (сатылған тауар кодтары) берілген. Ең жиі кездесетін <code>k</code> кодты <code>код саны</code> түрінде шығарыңыз: саны кемуі бойынша, тең болса код өсуі бойынша. Әр түрлі кодтар саны <code>k</code>-дан аз болмайды деп кепілдік беріледі.</p>",
   "starter": "#include <iostream>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    map<int, int> cnt;\n    for (int i = 0; i < n; i++) { int x; cin >> x; cnt[x]++; }\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\n#include <map>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    map<int, int> cnt;\n    for (int i = 0; i < n; i++) { int x; cin >> x; cnt[x]++; }\n    vector<pair<int, int>> v(cnt.begin(), cnt.end());\n    sort(v.begin(), v.end(), [](const pair<int, int>& a, const pair<int, int>& b) {\n        if (a.second != b.second) return a.second > b.second;\n        return a.first < b.first;\n    });\n    for (int i = 0; i < k; i++) cout << v[i].first << \" \" << v[i].second << endl;\n    return 0;\n}\n",
   "hints": [
    "Санауыштарды <code>vector&lt;pair&lt;int, int&gt;&gt;</code>-ке көшіріп, lambda арқылы сұрыптаңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "8 2\n5 1 5 2 2 5 3 3\n",
      "out": "5 3\n2 2\n"
     },
     {
      "stdin": "3 3\n9 8 7\n",
      "out": "7 1\n8 1\n9 1\n"
     },
     {
      "stdin": "6 1\n4 4 6 6 1 1\n",
      "out": "1 2\n"
     }
    ]
   }
  }
 ],
 "cp-p2": [
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Акцияны сатудың тиімді күні",
   "prompt": "<p><code>n</code>, сосын <code>n</code> күндік акция бағасы берілген. Бір күні сатып алып, кейінірек бір күні сатқанда алынатын ең үлкен пайданы шығарыңыз; пайда жоқ болса <code>0</code>. Бір өтуде: осы уақытқа дейінгі ең арзан бағаны сақтаңыз.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> p(n);\n    for (int i = 0; i < n; i++) cin >> p[i];\n    cout << p[n - 1] - p[0] << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> p(n);\n    for (int i = 0; i < n; i++) cin >> p[i];\n    int low = p[0], best = 0;\n    for (int x : p) {\n        if (x < low) low = x;\n        if (x - low > best) best = x - low;\n    }\n    cout << best << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>low</code> — бүгінге дейінгі ең арзан баға; әр күні <code>x - low</code> пайдасын тексеріңіз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "6\n7 1 5 3 6 4\n",
      "out": "5\n"
     },
     {
      "stdin": "4\n9 7 4 1\n",
      "out": "0\n"
     },
     {
      "stdin": "2\n1 2\n",
      "out": "1\n"
     },
     {
      "stdin": "5\n3 8 1 2 4\n",
      "out": "5\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Нөлдерді соңына жылжыту",
   "prompt": "<p><code>n</code>, сосын <code>n</code> сан берілген. Барлық <code>0</code>-ді массивтің соңына жылжытыңыз, қалған элементтердің ретін сақтаңыз. Қосымша массивсіз жасаңыз: нөл емес элементтерді <code>pos</code> орнына жазып отырыңыз, соңын нөлдермен толтырыңыз.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int x : a) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int pos = 0;\n    for (int i = 0; i < n; i++)\n        if (a[i] != 0) a[pos++] = a[i];\n    while (pos < n) a[pos++] = 0;\n    for (int x : a) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>if (a[i] != 0) a[pos++] = a[i];</code>",
    "Соңында <code>pos</code>-тан <code>n</code>-ге дейін нөл жазыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "5\n0 1 0 3 12\n",
      "out": "1 3 12 0 0 \n"
     },
     {
      "stdin": "3\n0 0 0\n",
      "out": "0 0 0 \n"
     },
     {
      "stdin": "4\n1 2 3 4\n",
      "out": "1 2 3 4 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "easy",
   "xp": 10,
   "title": "Сұрыпталған тізімдерді біріктіру",
   "prompt": "<p>Өсу ретімен сұрыпталған екі тізім берілген: <code>n</code> және <code>n</code> сан, сосын <code>m</code> және <code>m</code> сан. Оларды бір сұрыпталған тізімге біріктіріп шығарыңыз. Екі көрсеткішпен O(n + m) шешіңіз.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    cin >> m;\n    vector<int> b(m);\n    for (int i = 0; i < m; i++) cin >> b[i];\n    for (int x : a) cout << x << \" \";\n    for (int x : b) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    cin >> m;\n    vector<int> b(m);\n    for (int i = 0; i < m; i++) cin >> b[i];\n    int i = 0, j = 0;\n    while (i < n || j < m) {\n        if (j == m || (i < n && a[i] <= b[j])) cout << a[i++] << \" \";\n        else cout << b[j++] << \" \";\n    }\n    cout << endl;\n    return 0;\n}\n",
   "hints": [
    "Әр қадамда <code>a[i]</code> мен <code>b[j]</code>-ның кішісін шығарып, сол көрсеткішті жылжытыңыз.",
    "Бір тізім біткенде екіншісінің қалғанын шығарыңыз."
   ],
   "check": {
    "cases": [
     {
      "stdin": "3\n1 4 7\n4\n2 3 8 9\n",
      "out": "1 2 3 4 7 8 9 \n"
     },
     {
      "stdin": "2\n5 6\n0\n\n",
      "out": "5 6 \n"
     },
     {
      "stdin": "3\n1 1 2\n2\n1 3\n",
      "out": "1 1 1 2 3 \n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Баспалдақ тәсілдері",
   "prompt": "<p>Баспалдақта <code>n</code> саты бар (1 ≤ n ≤ 85). Бір қадамда 1 не 2 сатыға көтерілуге болады. Жоғарыға шығудың неше тәсілі бар? <code>dp[i] = dp[i−1] + dp[i−2]</code>, <code>long long</code> қолданыңыз. Мысалы, <code>n = 4</code> → <code>5</code>.</p>",
   "starter": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> dp(n + 2, 0);\n    dp[0] = 1;\n    dp[1] = 1;\n    for (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];\n    cout << dp[n] << endl;\n    return 0;\n}\n",
   "hints": [
    "<code>dp[0] = 1</code> (ештеңе жасамау — бір тәсіл), <code>dp[1] = 1</code>."
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
      "stdin": "85\n",
      "out": "420196140727489673\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Аралдар саны",
   "prompt": "<p>Карта: <code>n m</code> және <code>n</code> жол, <code>#</code> — құрлық, <code>.</code> — су. Жоғары/төмен/солға/оңға жалғасқан құрлық торлары бір арал құрайды. Аралдар санын шығарыңыз. Әр жаңа құрлық торынан BFS (<code>vector&lt;pair&lt;int,int&gt;&gt;</code> кезек ретінде) не DFS жүргізіп, аралды белгілеп шығыңыз.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<string> g(n);\n    for (int i = 0; i < n; i++) cin >> g[i];\n    int land = 0;\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++)\n            if (g[i][j] == '#') land++;\n    cout << land << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<string> g(n);\n    for (int i = 0; i < n; i++) cin >> g[i];\n    int dr[4] = {1, -1, 0, 0}, dc[4] = {0, 0, 1, -1};\n    int islands = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < m; j++) {\n            if (g[i][j] != '#') continue;\n            islands++;\n            vector<pair<int, int>> q;\n            q.push_back({i, j});\n            g[i][j] = '.';\n            for (size_t h = 0; h < q.size(); h++) {\n                int r = q[h].first, c = q[h].second;\n                for (int d = 0; d < 4; d++) {\n                    int nr = r + dr[d], nc = c + dc[d];\n                    if (nr < 0 || nr >= n || nc < 0 || nc >= m || g[nr][nc] != '#') continue;\n                    g[nr][nc] = '.';\n                    q.push_back({nr, nc});\n                }\n            }\n        }\n    }\n    cout << islands << endl;\n    return 0;\n}\n",
   "hints": [
    "Барған құрлықты <code>.</code>-ке ауыстырсаңыз, оны қайта санамайсыз.",
    "Шекараны тексеруді ұмытпаңыз: <code>nr &gt;= 0 &amp;&amp; nr &lt; n</code> ..."
   ],
   "check": {
    "cases": [
     {
      "stdin": "4 5\n##..#\n#...#\n..#..\n.....\n",
      "out": "3\n"
     },
     {
      "stdin": "1 1\n.\n",
      "out": "0\n"
     },
     {
      "stdin": "3 3\n###\n#.#\n###\n",
      "out": "1\n"
     },
     {
      "stdin": "2 4\n#.#.\n.#.#\n",
      "out": "4\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "medium",
   "xp": 15,
   "title": "Бүтін квадрат түбір",
   "prompt": "<p>Теріс емес бүтін сан <code>n</code> берілген (n ≤ 10<sup>18</sup>). <code>x·x ≤ n</code> болатын ең үлкен бүтін <code>x</code>-ті бинарлық іздеу арқылы табыңыз (<code>sqrt</code> қолданбаңыз — үлкен сандарда дәлдік жетпейді). Іздеу аралығы <code>[0, 10<sup>9</sup>]</code>.</p>",
   "starter": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    long long lo = 0, hi = 1000000000;\n    // бинарлық іздеу\n    cout << lo << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    long long lo = 0, hi = 1000000000;\n    while (lo < hi) {\n        long long mid = (lo + hi + 1) / 2;\n        if (mid * mid <= n) lo = mid;\n        else hi = mid - 1;\n    }\n    cout << lo << endl;\n    return 0;\n}\n",
   "hints": [
    "Шарт «<code>mid * mid &lt;= n</code>» ақиқат болса — жауап <code>mid</code> не одан үлкен: <code>lo = mid</code>.",
    "Шексіз цикл болмас үшін ортаны жоғары қарай дөңгелектеңіз: <code>(lo + hi + 1) / 2</code>."
   ],
   "check": {
    "cases": [
     {
      "stdin": "17\n",
      "out": "4\n"
     },
     {
      "stdin": "0\n",
      "out": "0\n"
     },
     {
      "stdin": "1000000000000000000\n",
      "out": "1000000000\n"
     },
     {
      "stdin": "999999999999999999\n",
      "out": "999999999\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Ең ұзын ортақ тізбек",
   "prompt": "<p>Екі сөз (кіші латын әріптері, ұзындығы ≤ 1000) берілген. Ең ұзын ортақ ішкі тізбектің (subsequence: әріптер ретін сақтап, кейбірін өшіріп алуға болатын) ұзындығын шығарыңыз. DP: <code>dp[i][j]</code> — бірінші сөздің <code>i</code> әрпі мен екіншісінің <code>j</code> әрпі үшін жауап. Мысалы, <code>abcde ace</code> → <code>3</code>.</p>",
   "starter": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    cout << 0 << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    int n = a.size(), m = b.size();\n    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;\n            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n        }\n    }\n    cout << dp[n][m] << endl;\n    return 0;\n}\n",
   "hints": [
    "Әріптер тең болса: <code>dp[i][j] = dp[i-1][j-1] + 1</code>.",
    "Әйтпесе: <code>max(dp[i-1][j], dp[i][j-1])</code>."
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
      "stdin": "qazaqstan astana\n",
      "out": "5\n"
     },
     {
      "stdin": "aaaa aa\n",
      "out": "2\n"
     }
    ]
   }
  },
  {
   "type": "cpp",
   "level": "hard",
   "xp": 20,
   "title": "Рюкзак есебі",
   "prompt": "<p>Жорыққа <code>W</code> кг-ға дейін жүк алуға болады. <code>n</code> зат берілген, әрқайсысының салмағы <code>w</code> мен құндылығы <code>v</code>. Әр затты ең көбі бір рет алуға болады. Салмақ шегінен аспай жинауға болатын ең үлкен құндылықты шығарыңыз. Кіріс: <code>n W</code>, сосын <code>n</code> жол <code>w v</code> (n ≤ 100, W ≤ 10 000). DP: <code>dp[c]</code> — сыйымдылығы <code>c</code> болғандағы ең үлкен құндылық; әр зат үшін <code>c</code>-ны <b>кемуі</b> бойынша жаңартыңыз.</p>",
   "starter": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, W;\n    cin >> n >> W;\n    vector<long long> dp(W + 1, 0);\n    for (int i = 0; i < n; i++) {\n        int w;\n        long long v;\n        cin >> w >> v;\n        for (int c = w; c <= W; c++) dp[c] = max(dp[c], dp[c - w] + v);\n    }\n    cout << dp[W] << endl;\n    return 0;\n}\n",
   "solution": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, W;\n    cin >> n >> W;\n    vector<long long> dp(W + 1, 0);\n    for (int i = 0; i < n; i++) {\n        int w;\n        long long v;\n        cin >> w >> v;\n        for (int c = W; c >= w; c--) dp[c] = max(dp[c], dp[c - w] + v);\n    }\n    cout << dp[W] << endl;\n    return 0;\n}\n",
   "hints": [
    "Стартер <code>c</code>-ны өсу ретімен жаңартады — сонда бір зат бірнеше рет алынып кетеді.",
    "<code>for (int c = W; c &gt;= w; c--)</code>"
   ],
   "check": {
    "cases": [
     {
      "stdin": "3 4\n1 15\n3 20\n4 30\n",
      "out": "35\n"
     },
     {
      "stdin": "1 5\n6 100\n",
      "out": "0\n"
     },
     {
      "stdin": "4 10\n5 10\n4 40\n6 30\n3 50\n",
      "out": "90\n"
     },
     {
      "stdin": "2 10\n3 10\n4 1\n",
      "out": "11\n"
     }
    ]
   }
  }
 ]
});
