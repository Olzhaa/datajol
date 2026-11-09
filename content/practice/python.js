// Practice tasks after the lessons of m2-1. Each lesson's list opens one task at a time.
DJ.addPractice('m2-1', {
 "py-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Елорда атауы",
   "prompt": "<p>Экранға дәл осы мәтінді шығарыңыз: <code>Астана — Қазақстанның елордасы</code></p>",
   "starter": "# Кодыңызды осында жазыңыз\n",
   "solution": "print(\"Астана — Қазақстанның елордасы\")",
   "hints": [
    "<code>print(\"...\")</code>"
   ]
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Үш жолдық мекенжай",
   "prompt": "<p>Мекенжайды үш жолға шығарыңыз:</p><pre>Қазақстан\nАлматы қаласы\nАбай даңғылы, 10</pre>",
   "starter": "",
   "solution": "print(\"Қазақстан\")\nprint(\"Алматы қаласы\")\nprint(\"Абай даңғылы, 10\")",
   "hints": [
    "Әр жолға бөлек <code>print</code> жазыңыз."
   ]
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мәтін мен сан",
   "prompt": "<p>Бір <code>print</code> ішінде мәтін мен санды үтірмен беріп, мына жолды шығарыңыз: <code>Сыныптағы оқушылар: 28</code>. Санды тырнақшасыз жазыңыз.</p>",
   "starter": "",
   "solution": "print(\"Сыныптағы оқушылар:\", 28)",
   "hints": [
    "<code>print(\"Сыныптағы оқушылар:\", 28)</code>: үтір бос орын қосады."
   ],
   "check": {
    "mustInclude": [
     ", 28)"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Пойыз кестесі",
   "prompt": "<p>Пойыздар кестесін үш жолға шығарыңыз:</p><pre>Пойыз 001: Алматы - Астана\nПойыз 015: Астана - Павлодар\nПойыз 703: Шымкент - Түркістан</pre>",
   "starter": "",
   "solution": "print(\"Пойыз 001: Алматы - Астана\")\nprint(\"Пойыз 015: Астана - Павлодар\")\nprint(\"Пойыз 703: Шымкент - Түркістан\")",
   "hints": [
    "Үш бөлек <code>print</code> керек. Бос орындарды дәл сақтаңыз."
   ]
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Түсініктемесі бар код",
   "prompt": "<p>Алдымен <code>#</code> белгісімен бір түсініктеме жолын жазыңыз (кез келген мәтін), сосын <code>Ауа райы: +5 °C</code> жолын шығарыңыз. Түсініктеме экранға шықпауы керек.</p>",
   "starter": "",
   "solution": "# Бүгінгі ауа райы\nprint(\"Ауа райы: +5 °C\")",
   "hints": [
    "<code># ...</code> жолы орындалмайды."
   ],
   "check": {
    "mustInclude": [
     "#"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бағаларды бір жолға",
   "prompt": "<p>Бір <code>print</code> ішінде мәтін мен төрт санды үтірмен беріп шығарыңыз: <code>Бағалар: 5 4 5 3</code>. Сандарды тырнақшасыз жазыңыз.</p>",
   "starter": "",
   "solution": "print(\"Бағалар:\", 5, 4, 5, 3)",
   "hints": [
    "Үтірмен бөлінген мәндер бос орынмен шығады."
   ],
   "check": {
    "mustInclude": [
     "5, 4, 5, 3"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қатесі бар кодты түзету",
   "prompt": "<p>Төмендегі кодта екі қате бар. Түзетіп, екі жол шығатындай етіңіз:</p><pre>Сәлем\nӘлем</pre>",
   "starter": "Print(\"Сәлем)\nprint \"Әлем\"\n",
   "solution": "print(\"Сәлем\")\nprint(\"Әлем\")",
   "hints": [
    "Python бас әріпті ажыратады: <code>print</code> кіші әріппен.",
    "Тырнақшаны жабыңыз және жақша қойыңыз."
   ]
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тырнақшасы бар мәтін",
   "prompt": "<p>Мына жолды дәл шығарыңыз (ішінде қос тырнақша бар): <code>Ұстаз: \"Сабақ басталды!\" деді</code></p>",
   "starter": "",
   "solution": "print('Ұстаз: \"Сабақ басталды!\" деді')",
   "hints": [
    "Мәтінді сыртынан жалқы тырнақшаға <code>'...'</code> алыңыз, сонда ішіндегі <code>\"</code> мәтіннің бөлігі болады."
   ]
  }
 ],
 "py-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Оқушы туралы дерек",
   "prompt": "<p><code>name</code> айнымалысына <code>\"Әлия\"</code>, <code>age</code> айнымалысына <code>15</code> мәнін беріңіз. Сосын <code>print(name, age)</code> орындаңыз.</p>",
   "starter": "",
   "solution": "name = \"Әлия\"\nage = 15\nprint(name, age)",
   "hints": [
    "<code>name = \"Әлия\"</code>"
   ],
   "check": {
    "tests": "assert name == \"Әлия\", \"name айнымалысы \\\"Әлия\\\" болуы керек\"\nassert age == 15 and isinstance(age, int), \"age бүтін сан 15 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Айнымалының типі",
   "prompt": "<p><code>temp = -12.5</code> берілген. <code>type()</code> арқылы оның типін шығарыңыз. Нәтиже: <code>&lt;class 'float'&gt;</code>.</p>",
   "starter": "temp = -12.5\n",
   "solution": "temp = -12.5\nprint(type(temp))",
   "hints": [
    "<code>print(type(temp))</code>"
   ],
   "check": {
    "mustInclude": [
     "type("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Санды мәтінге",
   "prompt": "<p><code>year = 2026</code> берілген. Оны <code>str()</code> арқылы мәтінге айналдырып, <code>text</code> айнымалысына жазыңыз. Сосын <code>print(text + \" жыл\")</code> орындаңыз: <code>2026 жыл</code>.</p>",
   "starter": "year = 2026\n",
   "solution": "year = 2026\ntext = str(year)\nprint(text + \" жыл\")",
   "hints": [
    "<code>text = str(year)</code>"
   ],
   "check": {
    "tests": "assert isinstance(text, str), \"text мәтін (str) болуы керек: str(year) қолданыңыз\"\nassert text == \"2026\", \"text \\\"2026\\\" болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Балансты жаңарту",
   "prompt": "<p>Картада <code>balance = 5000</code> теңге бар. <code>+=</code> арқылы 1500 теңге қосыңыз, сосын <code>-=</code> арқылы 2000 теңге алыңыз. Соңғы балансты шығарыңыз (<code>4500</code>).</p>",
   "starter": "balance = 5000\n",
   "solution": "balance = 5000\nbalance += 1500\nbalance -= 2000\nprint(balance)",
   "hints": [
    "<code>balance += 1500</code>"
   ],
   "check": {
    "tests": "assert balance == 4500, \"balance соңында 4500 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "+=",
     "-="
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сөздерді біріктіру",
   "prompt": "<p><code>part1 = \"Көк\"</code> және <code>part2 = \"тал\"</code> берілген. Оларды <code>+</code> арқылы біріктіріп, <code>place</code> айнымалысына жазыңыз және шығарыңыз: <code>Көктал</code>.</p>",
   "starter": "part1 = \"Көк\"\npart2 = \"тал\"\n",
   "solution": "part1 = \"Көк\"\npart2 = \"тал\"\nplace = part1 + part2\nprint(place)",
   "hints": [
    "<code>place = part1 + part2</code>"
   ],
   "check": {
    "tests": "assert place == \"Көктал\", \"place \\\"Көктал\\\" болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мәтіннен бөлшек сан",
   "prompt": "<p>Термометр көрсеткіші мәтін түрінде келді: <code>raw = \"36.6\"</code>. Оны <code>float()</code> арқылы санға айналдырып, <code>temp</code> айнымалысына жазыңыз. Сосын <code>temp + 0.5</code> мәнін шығарыңыз (<code>37.1</code>).</p>",
   "starter": "raw = \"36.6\"\n",
   "solution": "raw = \"36.6\"\ntemp = float(raw)\nprint(temp + 0.5)",
   "hints": [
    "<code>float(raw)</code>"
   ],
   "check": {
    "tests": "assert isinstance(temp, float), \"temp float типі болуы керек: float(raw) қолданыңыз\"\nassert temp == 36.6, \"temp 36.6 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Екі мәтінді сан ретінде қосу",
   "prompt": "<p>Екі дүкеннің сатылымы мәтін түрінде берілген: <code>a = \"1200\"</code>, <code>b = \"850\"</code>. Оларды бүтін санға айналдырып қосыңыз, нәтижені <code>total</code> айнымалысына жазыңыз. Сосын <code>+</code> арқылы мәтін құрап, <code>Барлығы: 2050</code> шығарыңыз.</p>",
   "starter": "a = \"1200\"\nb = \"850\"\n",
   "solution": "a = \"1200\"\nb = \"850\"\ntotal = int(a) + int(b)\nprint(\"Барлығы: \" + str(total))",
   "hints": [
    "<code>\"1200\" + \"850\"</code> мәтіндерді жай жалғайды. Алдымен <code>int()</code> керек.",
    "Санды мәтінге қосу үшін <code>str(total)</code>."
   ],
   "check": {
    "tests": "assert total == 2050 and isinstance(total, int), \"total бүтін сан 2050 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мәндерді алмастыру",
   "prompt": "<p><code>a = \"Алматы\"</code>, <code>b = \"Астана\"</code>. Үшінші айнымалы (<code>tmp</code>) арқылы мәндерін алмастырыңыз: соңында <code>a</code> = <code>\"Астана\"</code>, <code>b</code> = <code>\"Алматы\"</code> болсын. Сосын <code>print(a, b)</code>.</p>",
   "starter": "a = \"Алматы\"\nb = \"Астана\"\n",
   "solution": "a = \"Алматы\"\nb = \"Астана\"\ntmp = a\na = b\nb = tmp\nprint(a, b)",
   "hints": [
    "<code>tmp = a</code>, сосын <code>a = b</code>, сосын <code>b = tmp</code>."
   ],
   "check": {
    "tests": "assert a == \"Астана\", \"a соңында \\\"Астана\\\" болуы керек\"\nassert b == \"Алматы\", \"b соңында \\\"Алматы\\\" болуы керек\"",
    "stdout": true
   }
  }
 ],
 "py-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Автобус жол ақысы",
   "prompt": "<p>Бір жол ақысы <code>ticket = 200</code> теңге, айына <code>trips = 22</code> рет жүресіз. Айлық шығынды <code>cost</code> айнымалысына жазып, шығарыңыз.</p>",
   "starter": "ticket = 200\ntrips = 22\n",
   "solution": "ticket = 200\ntrips = 22\ncost = ticket * trips\nprint(cost)",
   "hints": [
    "<code>ticket * trips</code>"
   ],
   "check": {
    "tests": "assert cost == 4400, \"cost = 4400 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Топқа бөлу",
   "prompt": "<p>Лагерьге 50 оқушы келді, оларды 4 адамнан топқа бөледі. Толық топтар санын <code>groups</code>, топқа кірмей қалғандарды <code>left</code> айнымалысына жазып, <code>print(groups, left)</code> орындаңыз.</p>",
   "starter": "students = 50\n",
   "solution": "students = 50\ngroups = students // 4\nleft = students % 4\nprint(groups, left)",
   "hints": [
    "<code>//</code> — бүтін бөлу, <code>%</code> — қалдық."
   ],
   "check": {
    "tests": "assert groups == 12, \"groups = 12 болуы керек: // қолданыңыз\"\nassert left == 2, \"left = 2 болуы керек: % қолданыңыз\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бөлменің ауданы",
   "prompt": "<p>Шаршы бөлменің қабырғасы <code>side = 12</code> метр. Ауданын <code>**</code> операторымен есептеп, <code>area</code> айнымалысына жазыңыз және шығарыңыз.</p>",
   "starter": "side = 12\n",
   "solution": "side = 12\narea = side ** 2\nprint(area)",
   "hints": [
    "<code>side ** 2</code>"
   ],
   "check": {
    "tests": "assert area == 144, \"area = 144 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "**"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа температура",
   "prompt": "<p>Үш күннің температурасы: <code>-7</code>, <code>2</code>, <code>9</code>. Орташасын есептеп, 2 ондық таңбаға дейін дөңгелектеп, <code>avg</code> айнымалысына жазыңыз және шығарыңыз.</p>",
   "starter": "t1 = -7\nt2 = 2\nt3 = 9\n",
   "solution": "t1 = -7\nt2 = 2\nt3 = 9\navg = round((t1 + t2 + t3) / 3, 2)\nprint(avg)",
   "hints": [
    "Қосындыны жақшаға алыңыз: <code>(t1 + t2 + t3) / 3</code>."
   ],
   "check": {
    "tests": "assert avg == 1.33, \"avg = 1.33 болуы керек: жақша мен round(..., 2) тексеріңіз\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жеңілдік бағасы",
   "prompt": "<p>Куртка бағасы <code>price = 18900</code> теңге, жеңілдік <code>discount = 15</code> пайыз. Жаңа бағаны есептеп, бүтінге дөңгелектеп (<code>round()</code>), <code>new_price</code> айнымалысына жазыңыз және шығарыңыз.</p>",
   "starter": "price = 18900\ndiscount = 15\n",
   "solution": "price = 18900\ndiscount = 15\nnew_price = round(price * (1 - discount / 100))\nprint(new_price)",
   "hints": [
    "<code>price * (1 - discount / 100)</code>"
   ],
   "check": {
    "tests": "assert new_price == 16065, \"new_price = 16065 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Табыстың өсуі",
   "prompt": "<p>Наурызда табыс <code>old = 1_250_000</code>, сәуірде <code>new = 1_475_000</code> теңге. Өсуді пайызбен есептеп, 1 ондық таңбаға дейін дөңгелектеп, <code>growth</code> айнымалысына жазыңыз және шығарыңыз.</p>",
   "starter": "old = 1_250_000\nnew = 1_475_000\n",
   "solution": "old = 1_250_000\nnew = 1_475_000\ngrowth = round((new - old) / old * 100, 1)\nprint(growth)",
   "hints": [
    "<code>(new - old) / old * 100</code>"
   ],
   "check": {
    "tests": "assert growth == 18.0, \"growth = 18.0 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Минутты сағатқа айналдыру",
   "prompt": "<p>Алматыдан Қапшағайға жол <code>trip = 135</code> минут алады. <code>//</code> және <code>%</code> арқылы сағат пен минутты тауып, бір <code>print</code> ішінде шығарыңыз: <code>2 сағ 15 мин</code>.</p>",
   "starter": "trip = 135\n",
   "solution": "trip = 135\nhours = trip // 60\nmins = trip % 60\nprint(hours, \"сағ\", mins, \"мин\")",
   "hints": [
    "1 сағат = 60 минут: <code>trip // 60</code> және <code>trip % 60</code>."
   ],
   "check": {
    "mustInclude": [
     "//",
     "%"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Депозит табысы",
   "prompt": "<p>Банкке <code>start = 500000</code> теңге салдыңыз, жылдық мөлшерлеме 14%, пайыз жыл сайын қосылады. 3 жылдан кейінгі соманы <code>final = start * 1.14 ** 3</code> формуласымен есептеңіз. Бір жолға <code>round(final, 2)</code> және таза табысты <code>round(final - start, 2)</code> шығарыңыз.</p>",
   "starter": "start = 500000\n",
   "solution": "start = 500000\nfinal = start * 1.14 ** 3\nprint(round(final, 2), round(final - start, 2))",
   "hints": [
    "<code>**</code> көбейтуден бұрын орындалады.",
    "<code>print(round(final, 2), round(final - start, 2))</code>"
   ],
   "check": {
    "tests": "assert abs(final - 740772.0) < 0.01, \"final шамамен 740772.0 болуы керек\"",
    "stdout": true
   }
  }
 ],
 "py-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кіші әріпке айналдыру",
   "prompt": "<p><code>raw = \"ПАВЛОДАР\"</code>. Мәтінді кіші әріптермен шығарыңыз: <code>павлодар</code>.</p>",
   "starter": "raw = \"ПАВЛОДАР\"\n",
   "solution": "raw = \"ПАВЛОДАР\"\nprint(raw.lower())",
   "hints": [
    "<code>.lower()</code>"
   ],
   "check": {
    "mustInclude": [
     ".lower()"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сөздің ұзындығы",
   "prompt": "<p><code>word = \"Қызылорда\"</code>. Сөзде неше әріп бар екенін <code>len()</code> арқылы шығарыңыз.</p>",
   "starter": "word = \"Қызылорда\"\n",
   "solution": "word = \"Қызылорда\"\nprint(len(word))",
   "hints": [
    "<code>len(word)</code>"
   ],
   "check": {
    "mustInclude": [
     "len("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бірінші әріп және басы",
   "prompt": "<p><code>name = \"Тараз\"</code>. Бір <code>print</code> ішінде атаудың бірінші әрпін және алғашқы 3 әрпін шығарыңыз: <code>Т Тар</code>.</p>",
   "starter": "name = \"Тараз\"\n",
   "solution": "name = \"Тараз\"\nprint(name[0], name[:3])",
   "hints": [
    "Индекс 0-ден басталады: <code>name[0]</code>, кесінді: <code>name[:3]</code>."
   ]
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Телефон нөмірін тазалау",
   "prompt": "<p><code>phone = \"8 701 555 12 34\"</code>. Бос орындарды алып тастап, <code>clean</code> айнымалысына жазыңыз және шығарыңыз: <code>87015551234</code>.</p>",
   "starter": "phone = \"8 701 555 12 34\"\n",
   "solution": "phone = \"8 701 555 12 34\"\nclean = phone.replace(\" \", \"\")\nprint(clean)",
   "hints": [
    "<code>.replace(\" \", \"\")</code>"
   ],
   "check": {
    "tests": "assert clean == \"87015551234\", \"clean \\\"87015551234\\\" болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қалаларды бөлу",
   "prompt": "<p><code>s = \"Алматы;Астана;Шымкент;Ақтау\"</code>. <code>split</code> арқылы оны <code>parts</code> тізіміне бөліп, қалалар санын (<code>len(parts)</code>) шығарыңыз.</p>",
   "starter": "s = \"Алматы;Астана;Шымкент;Ақтау\"\n",
   "solution": "s = \"Алматы;Астана;Шымкент;Ақтау\"\nparts = s.split(\";\")\nprint(len(parts))",
   "hints": [
    "Бөлгіш — нүктелі үтір: <code>s.split(\";\")</code>."
   ],
   "check": {
    "tests": "assert parts == [\"Алматы\", \"Астана\", \"Шымкент\", \"Ақтау\"], \"parts тізімі дұрыс емес: \" + str(parts)",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бағаны форматтау",
   "prompt": "<p><code>price = 1234567.891</code>. f-string арқылы мыңдық бөлгішпен және 2 ондық таңбамен шығарыңыз: <code>1,234,567.89 ₸</code>.</p>",
   "starter": "price = 1234567.891\n",
   "solution": "price = 1234567.891\nprint(f\"{price:,.2f} ₸\")",
   "hints": [
    "Формат: <code>{price:,.2f}</code>"
   ],
   "check": {
    "mustInclude": [
     "f\""
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тегі және аты қысқаша",
   "prompt": "<p><code>raw = \"  жАНАР сЕРІКҚЫЗЫ \"</code>. Бос орындарды алып, әр сөзді бас әріппен жазыңыз (<code>Жанар Серікқызы</code>). Сосын <code>split</code> арқылы бөліп, f-string-пен <b>тегін және аттың бірінші әрпін</b> шығарыңыз: <code>Серікқызы Ж.</code></p>",
   "starter": "raw = \"  жАНАР сЕРІКҚЫЗЫ \"\n",
   "solution": "raw = \"  жАНАР сЕРІКҚЫЗЫ \"\nname = raw.strip().title()\nparts = name.split(\" \")\nprint(f\"{parts[1]} {parts[0][0]}.\")",
   "hints": [
    "<code>raw.strip().title()</code>, сосын <code>.split(\" \")</code>.",
    "Аттың бірінші әрпі: <code>parts[0][0]</code>."
   ],
   "check": {
    "mustInclude": [
     "split",
     "f\""
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Email доменін алу",
   "prompt": "<p><code>email = \" Aigerim.K@Mail.KZ \"</code>. Бос орынсыз және кіші әріппен <code>clean</code> айнымалысына жазыңыз. Сосын <code>@</code> белгісінен кейінгі доменді шығарыңыз: <code>mail.kz</code>.</p>",
   "starter": "email = \" Aigerim.K@Mail.KZ \"\n",
   "solution": "email = \" Aigerim.K@Mail.KZ \"\nclean = email.strip().lower()\nprint(clean.split(\"@\")[1])",
   "hints": [
    "<code>.strip().lower()</code>",
    "<code>clean.split(\"@\")</code> екі бөлік береді, домен — екіншісі (индекс 1)."
   ],
   "check": {
    "tests": "assert clean == \"aigerim.k@mail.kz\", \"clean \\\"aigerim.k@mail.kz\\\" болуы керек\"",
    "stdout": true
   }
  }
 ],
 "py-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жұп па, тақ па",
   "prompt": "<p><code>n = 17</code>. Сан жұп болса <code>жұп</code>, әйтпесе <code>тақ</code> шығарыңыз.</p>",
   "starter": "n = 17\n",
   "solution": "n = 17\nif n % 2 == 0:\n    print(\"жұп\")\nelse:\n    print(\"тақ\")",
   "hints": [
    "Жұп сан: <code>n % 2 == 0</code>"
   ],
   "check": {
    "mustInclude": [
     "if",
     "else"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аяз бар ма",
   "prompt": "<p><code>temp = -8</code>. Температура 0-ден төмен болса <code>Аяз</code>, әйтпесе <code>Аяз жоқ</code> шығарыңыз.</p>",
   "starter": "temp = -8\n",
   "solution": "temp = -8\nif temp < 0:\n    print(\"Аяз\")\nelse:\n    print(\"Аяз жоқ\")",
   "hints": [
    "<code>if temp &lt; 0:</code>"
   ],
   "check": {
    "mustInclude": [
     "if"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кәмелет жасы",
   "prompt": "<p><code>age = 16</code>. Жас 18-ден кіші болса <code>Кәмелетке толмаған</code>, әйтпесе <code>Кәмелетке толған</code> шығарыңыз.</p>",
   "starter": "age = 16\n",
   "solution": "age = 16\nif age < 18:\n    print(\"Кәмелетке толмаған\")\nelse:\n    print(\"Кәмелетке толған\")",
   "hints": [
    "<code>if age &lt; 18:</code>"
   ],
   "check": {
    "mustInclude": [
     "if"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жол ақысының түрі",
   "prompt": "<p><code>age</code> бойынша жол ақысын анықтаңыз: 7-ден кіші — <code>Тегін</code>, 63 және одан үлкен — <code>Жеңілдік</code>, қалғаны — <code>Толық баға</code>. <code>age = 70</code> үшін <code>Жеңілдік</code> шығуы керек.</p>",
   "starter": "age = 70\n",
   "solution": "age = 70\nif age < 7:\n    print(\"Тегін\")\nelif age >= 63:\n    print(\"Жеңілдік\")\nelse:\n    print(\"Толық баға\")",
   "hints": [
    "<code>if</code>, <code>elif</code>, <code>else</code> — үш тармақ."
   ],
   "check": {
    "mustInclude": [
     "elif"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Демалыс күні",
   "prompt": "<p><code>day = \"сенбі\"</code>. Күн <code>[\"сенбі\", \"жексенбі\"]</code> тізімінде болса <code>Демалыс</code>, әйтпесе <code>Жұмыс күні</code> шығарыңыз.</p>",
   "starter": "day = \"сенбі\"\n",
   "solution": "day = \"сенбі\"\nif day in [\"сенбі\", \"жексенбі\"]:\n    print(\"Демалыс\")\nelse:\n    print(\"Жұмыс күні\")",
   "hints": [
    "<code>if day in [...]:</code>"
   ],
   "check": {
    "mustInclude": [
     " in "
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір жолдық шарт",
   "prompt": "<p><code>amount = 4200</code>. Бір жолдық шарт арқылы <code>label</code> айнымалысына сома 3000-нан үлкен болса <code>\"үлкен\"</code>, әйтпесе <code>\"кіші\"</code> жазыңыз. Сосын <code>label</code>-ді шығарыңыз.</p>",
   "starter": "amount = 4200\n",
   "solution": "amount = 4200\nlabel = \"үлкен\" if amount > 3000 else \"кіші\"\nprint(label)",
   "hints": [
    "<code>label = \"үлкен\" if amount &gt; 3000 else \"кіші\"</code>"
   ],
   "check": {
    "tests": "assert label == \"үлкен\", \"label \\\"үлкен\\\" болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "label = "
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Грант әлде квота",
   "prompt": "<p>Талапкердің ҰБТ балы <code>score</code> және ауылдан екені <code>rural</code> берілген. Ереже: 120 және жоғары — <code>Грант</code>; 100 және жоғары <b>әрі</b> ауылдан болса — <code>Ауыл квотасы</code>; қалғаны — <code>Ақылы</code>. Нәтижені f-string-пен <code>108 балл: Ауыл квотасы</code> түрінде шығарыңыз.</p>",
   "starter": "score = 108\nrural = True\n",
   "solution": "score = 108\nrural = True\nif score >= 120:\n    result = \"Грант\"\nelif score >= 100 and rural:\n    result = \"Ауыл квотасы\"\nelse:\n    result = \"Ақылы\"\nprint(f\"{score} балл: {result}\")",
   "hints": [
    "Алдымен ең қатаң шарт: <code>score &gt;= 120</code>.",
    "<code>elif score &gt;= 100 and rural:</code>"
   ],
   "check": {
    "mustInclude": [
     "elif",
     "and",
     "f\""
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кібісе жыл",
   "prompt": "<p>Жыл кібісе болады, егер ол 4-ке бөлініп, 100-ге бөлінбесе, <b>немесе</b> 400-ге бөлінсе. <code>year = 2024</code> үшін <code>2024 — кібісе жыл</code>, әйтпесе <code>2024 — кібісе емес</code> түрінде шығарыңыз (f-string).</p>",
   "starter": "year = 2024\n",
   "solution": "year = 2024\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print(f\"{year} — кібісе жыл\")\nelse:\n    print(f\"{year} — кібісе емес\")",
   "hints": [
    "Бөлінеді: <code>year % 4 == 0</code>.",
    "Шарттарды жақшамен топтаңыз: <code>(... and ...) or ...</code>."
   ],
   "check": {
    "mustInclude": [
     "%",
     "or"
    ]
   }
  }
 ],
 "py-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бірінші және соңғы күн",
   "prompt": "<p>Апта температурасы тізімде берілген. Бірінші және соңғы мәнді бір жолда шығарыңыз: <code>-3 2</code>.</p>",
   "starter": "temps = [-3, 0, 4, 7, 5, 1, 2]\n",
   "solution": "temps = [-3, 0, 4, 7, 5, 1, 2]\nprint(temps[0], temps[-1])",
   "hints": [
    "Соңғы элемент: <code>temps[-1]</code>."
   ]
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сыныптағы оқушылар саны",
   "prompt": "<p><code>students</code> тізімінде неше оқушы бар екенін шығарыңыз.</p>",
   "starter": "students = [\"Айгерім\", \"Нұрлан\", \"Дана\", \"Ерлан\", \"Мадина\", \"Арман\"]\n",
   "solution": "students = [\"Айгерім\", \"Нұрлан\", \"Дана\", \"Ерлан\", \"Мадина\", \"Арман\"]\nprint(len(students))",
   "hints": [
    "<code>len(students)</code>"
   ],
   "check": {
    "mustInclude": [
     "len("
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Баға айырмасы",
   "prompt": "<p>Бензин бағасы әртүрлі АЖҚ-да берілген. Ең қымбат пен ең арзанның айырмасын шығарыңыз.</p>",
   "starter": "prices = [255, 262, 249, 270, 258]\n",
   "solution": "prices = [255, 262, 249, 270, 258]\nprint(max(prices) - min(prices))",
   "hints": [
    "<code>max(prices) - min(prices)</code>"
   ],
   "check": {
    "mustInclude": [
     "max(",
     "min("
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Апта ортасы",
   "prompt": "<p>Аптаның 7 күнінің сатылымы берілген. Кесінді арқылы 3-, 4- және 5-күндердің сатылымын <code>mid</code> тізіміне жазып, шығарыңыз: <code>[140, 80, 110]</code>.</p>",
   "starter": "sales = [120, 95, 140, 80, 110, 160, 72]\n",
   "solution": "sales = [120, 95, 140, 80, 110, 160, 72]\nmid = sales[2:5]\nprint(mid)",
   "hints": [
    "3-күн индексі 2. Кесіндінің соңы кірмейді: <code>sales[2:5]</code>."
   ],
   "check": {
    "tests": "assert mid == [140, 80, 110], \"mid тізімі [140, 80, 110] болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Үздік үш нәтиже",
   "prompt": "<p>Жарыстағы ұпайлар берілген. <code>sorted(..., reverse=True)</code> арқылы ең жоғары үш ұпайды <code>top3</code> тізіміне жазып, шығарыңыз.</p>",
   "starter": "scores = [78, 92, 85, 64, 99, 71, 88]\n",
   "solution": "scores = [78, 92, 85, 64, 99, 71, 88]\ntop3 = sorted(scores, reverse=True)[:3]\nprint(top3)",
   "hints": [
    "Кему ретімен сұрыптап, <code>[:3]</code> алыңыз."
   ],
   "check": {
    "tests": "assert top3 == [99, 92, 88], \"top3 [99, 92, 88] болуы керек\"\nassert scores == [78, 92, 85, 64, 99, 71, 88], \"scores тізімі өзгермеуі керек: sorted() қолданыңыз\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жаңа өлшем және орташа",
   "prompt": "<p><code>temps</code> тізіміне бүгінгі <code>5</code> градусты <code>append</code> арқылы қосыңыз. Сосын тізімнің орташасын 1 ондық таңбаға дейін дөңгелектеп шығарыңыз.</p>",
   "starter": "temps = [-2, 0, 3, 6, 1]\n",
   "solution": "temps = [-2, 0, 3, 6, 1]\ntemps.append(5)\nprint(round(sum(temps) / len(temps), 1))",
   "hints": [
    "<code>temps.append(5)</code>",
    "<code>round(sum(temps) / len(temps), 1)</code>"
   ],
   "check": {
    "tests": "assert temps == [-2, 0, 3, 6, 1, 5], \"temps соңында 5 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Үздік үштіктің орташасы",
   "prompt": "<p>Оқушылардың тест нәтижелері берілген. Ең жоғары үш нәтиженің орташасын 2 ондық таңбаға дейін дөңгелектеп, <code>avg_top</code> айнымалысына жазыңыз. f-string-пен шығарыңыз: <code>Үздік үштік: 92.33</code>.</p>",
   "starter": "results = [81, 95, 67, 90, 74, 92, 58]\n",
   "solution": "results = [81, 95, 67, 90, 74, 92, 58]\ntop = sorted(results, reverse=True)[:3]\navg_top = round(sum(top) / len(top), 2)\nprint(f\"Үздік үштік: {avg_top}\")",
   "hints": [
    "Алдымен <code>sorted(results, reverse=True)[:3]</code>.",
    "Сосын <code>sum(...) / 3</code> және <code>round(..., 2)</code>."
   ],
   "check": {
    "tests": "assert avg_top == 92.33, \"avg_top 92.33 болуы керек\"",
    "stdout": true
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Демалыс күндерінің үлесі",
   "prompt": "<p>Дүйсенбіден жексенбіге дейінгі сатылым берілген. Соңғы екі күннің (сенбі, жексенбі) сатылымы аптаның жалпы сатылымының неше пайызы? <code>share</code> айнымалысына 1 ондық таңбаға дейін дөңгелектеп жазыңыз және <code>Демалыс үлесі: 40.0%</code> түрінде шығарыңыз.</p>",
   "starter": "sales = [80, 90, 85, 95, 100, 160, 140]\n",
   "solution": "sales = [80, 90, 85, 95, 100, 160, 140]\nshare = round(sum(sales[-2:]) / sum(sales) * 100, 1)\nprint(f\"Демалыс үлесі: {share}%\")",
   "hints": [
    "Соңғы екі элемент: <code>sales[-2:]</code>.",
    "Үлес: <code>бөлік / барлығы * 100</code>."
   ],
   "check": {
    "tests": "assert share == 40.0, \"share дұрыс емес: \" + str(share)",
    "stdout": true
   }
  }
 ],
 "py-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалаларды нөмірлеу",
   "prompt": "<p><code>cities</code> тізіміндегі әр қаланы нөмірімен шығарыңыз. Нөмір 1-ден басталсын:</p><pre>1. Алматы\n2. Астана\n3. Шымкент</pre>",
   "starter": "cities = [\"Алматы\", \"Астана\", \"Шымкент\"]\n",
   "solution": "cities = [\"Алматы\", \"Астана\", \"Шымкент\"]\nfor i, c in enumerate(cities):\n    print(f\"{i + 1}. {c}\")",
   "hints": [
    "<code>for i, c in enumerate(cities):</code>, нөмір: <code>i + 1</code>."
   ],
   "check": {
    "mustInclude": [
     "for"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "1-ден 100-ге дейін қосу",
   "prompt": "<p><code>range</code> және цикл арқылы 1-ден 100-ге дейінгі (қоса) сандардың қосындысын есептеп шығарыңыз.</p>",
   "starter": "",
   "solution": "total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)",
   "hints": [
    "<code>range(1, 101)</code> 100-ді де қамтиды.",
    "Цикл алдында <code>total = 0</code>."
   ],
   "check": {
    "mustInclude": [
     "range",
     "for"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Цельсийден Фаренгейтке",
   "prompt": "<p>Әр температураны Фаренгейтке айналдырып (<code>c * 9 / 5 + 32</code>), 1 ондық таңбаға дейін дөңгелектеп, әрқайсысын жеке жолға шығарыңыз.</p>",
   "starter": "temps = [-10, 0, 21.5, 36.6]\n",
   "solution": "temps = [-10, 0, 21.5, 36.6]\nfor c in temps:\n    print(round(c * 9 / 5 + 32, 1))",
   "hints": [
    "<code>for c in temps:</code>"
   ],
   "check": {
    "mustInclude": [
     "for"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қымбат тауарлар саны",
   "prompt": "<p>Цикл арқылы бағасы 10 000-нан жоғары тауарлар санын <code>count</code> айнымалысына санап, шығарыңыз.</p>",
   "starter": "prices = [4500, 12000, 800, 35000, 9999, 10001, 15000]\n",
   "solution": "prices = [4500, 12000, 800, 35000, 9999, 10001, 15000]\ncount = 0\nfor p in prices:\n    if p > 10000:\n        count += 1\nprint(count)",
   "hints": [
    "Санауыш: <code>count += 1</code>."
   ],
   "check": {
    "tests": "assert count == 4, \"count 4 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "for"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ұзын атауларды санау",
   "prompt": "<p>Қала атауларының ішінде 6 әріптен ұзын атаулар нешеу? Цикл мен <code>len()</code> арқылы <code>long_count</code> айнымалысына санап, шығарыңыз.</p>",
   "starter": "cities = [\"Алматы\", \"Астана\", \"Қарағанды\", \"Тараз\", \"Петропавл\", \"Ақтау\", \"Өскемен\"]\n",
   "solution": "cities = [\"Алматы\", \"Астана\", \"Қарағанды\", \"Тараз\", \"Петропавл\", \"Ақтау\", \"Өскемен\"]\nlong_count = 0\nfor c in cities:\n    if len(c) > 6:\n        long_count += 1\nprint(long_count)",
   "hints": [
    "<code>if len(c) &gt; 6:</code>"
   ],
   "check": {
    "tests": "assert long_count == 3, \"long_count 3 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "for"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең үлкенін циклмен табу",
   "prompt": "<p><code>max()</code> қолданбай, цикл арқылы ең жоғары күндік табысты <code>best</code> айнымалысына табыңыз және шығарыңыз. Бастапқы мән ретінде тізімнің бірінші элементін алыңыз.</p>",
   "starter": "revenue = [42000, 51000, 38000, 67000, 59000]\n",
   "solution": "revenue = [42000, 51000, 38000, 67000, 59000]\nbest = revenue[0]\nfor r in revenue:\n    if r > best:\n        best = r\nprint(best)",
   "hints": [
    "<code>best = revenue[0]</code>, сосын әр <code>r</code>-ді салыстырыңыз."
   ],
   "check": {
    "tests": "assert best == 67000, \"best 67000 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "for"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жинақталған табыс",
   "prompt": "<p>Күндік табыс берілген. Әр күн үшін <b>осы күнге дейінгі</b> жалпы табысты шығарыңыз:</p><pre>1-күн: 1200\n2-күн: 2000\n3-күн: 3500\n4-күн: 4400</pre>",
   "starter": "daily = [1200, 800, 1500, 900]\n",
   "solution": "daily = [1200, 800, 1500, 900]\ntotal = 0\nfor i, d in enumerate(daily):\n    total += d\n    print(f\"{i + 1}-күн: {total}\")",
   "hints": [
    "Жинаушы <code>total</code> цикл алдында 0.",
    "<code>print</code> цикл ішінде тұруы керек."
   ],
   "check": {
    "mustInclude": [
     "for"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "3-ке немесе 5-ке бөлінетіндер",
   "prompt": "<p>Дүкен 1-ден 100-ге дейінгі (қоса) әр 3-ші немесе әр 5-ші сатып алушыға сыйлық береді. Нөмірі 3-ке <b>немесе</b> 5-ке қалдықсыз бөлінетін сандардың қосындысын <code>total</code> айнымалысына есептеп, шығарыңыз.</p>",
   "starter": "",
   "solution": "total = 0\nfor n in range(1, 101):\n    if n % 3 == 0 or n % 5 == 0:\n        total += n\nprint(total)",
   "hints": [
    "<code>n % 3 == 0 or n % 5 == 0</code>"
   ],
   "check": {
    "tests": "assert total == 2418, \"total 2418 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "range"
    ]
   }
  }
 ],
 "py-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кері санақ",
   "prompt": "<p><code>while</code> арқылы 5-тен 1-ге дейін кері санап, әр санды жеке жолға шығарыңыз, соңында <code>Старт!</code> деп жазыңыз.</p>",
   "starter": "n = 5\n",
   "solution": "n = 5\nwhile n > 0:\n    print(n)\n    n -= 1\nprint(\"Старт!\")",
   "hints": [
    "<code>while n &gt; 0:</code>, ішінде <code>n -= 1</code>."
   ],
   "check": {
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ноутбукке ақша жинау",
   "prompt": "<p>Айына 15 000 теңге жинайсыз. Жинақ 100 000-ға жетуі (немесе асуы) үшін неше ай керек? <code>while</code> арқылы <code>months</code> айнымалысына санап, шығарыңыз.</p>",
   "starter": "savings = 0\nmonths = 0\n",
   "solution": "savings = 0\nmonths = 0\nwhile savings < 100000:\n    savings += 15000\n    months += 1\nprint(months)",
   "hints": [
    "Шарт: <code>while savings &lt; 100000:</code>"
   ],
   "check": {
    "tests": "assert months == 7, \"months 7 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Теріс сомаларды өткізу",
   "prompt": "<p>Тізімдегі теріс сомаларды <code>continue</code> арқылы өткізіп жіберіп, қалғандарын жеке жолға шығарыңыз.</p>",
   "starter": "amounts = [2500, -300, 1800, -50, 4200]\n",
   "solution": "amounts = [2500, -300, 1800, -50, 4200]\nfor a in amounts:\n    if a < 0:\n        continue\n    print(a)",
   "hints": [
    "<code>if a &lt; 0: continue</code>"
   ],
   "check": {
    "mustInclude": [
     "continue"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бірінші ірі тапсырыс",
   "prompt": "<p>Сомасы 10 000-нан асатын <b>бірінші</b> тапсырыстың индексі мен сомасын бір жолда шығарыңыз (<code>3 12500</code>) және циклді <code>break</code> арқылы тоқтатыңыз.</p>",
   "starter": "orders = [3200, 8700, 9900, 12500, 4100, 30000]\n",
   "solution": "orders = [3200, 8700, 9900, 12500, 4100, 30000]\nfor i, o in enumerate(orders):\n    if o > 10000:\n        print(i, o)\n        break",
   "hints": [
    "<code>enumerate(orders)</code> индексті береді.",
    "Табылғанда <code>break</code>."
   ],
   "check": {
    "mustInclude": [
     "break"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Цифрлар қосындысы",
   "prompt": "<p><code>n = 2026</code> санының цифрларының қосындысын <code>while</code> арқылы есептеңіз: соңғы цифр <code>n % 10</code>, оны алып тастау <code>n //= 10</code>. Нәтиже <code>s</code> айнымалысында болсын және шығарыңыз (<code>10</code>).</p>",
   "starter": "n = 2026\ns = 0\n",
   "solution": "n = 2026\ns = 0\nwhile n > 0:\n    s += n % 10\n    n //= 10\nprint(s)",
   "hints": [
    "<code>while n &gt; 0:</code>",
    "<code>s += n % 10</code>, сосын <code>n //= 10</code>."
   ],
   "check": {
    "tests": "assert s == 10, \"s 10 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Соңғы белгіге дейін",
   "prompt": "<p>Есептегіш көрсеткіштері мәтін түрінде келеді, ал <code>\"end\"</code> деректің соңын білдіреді. <code>\"end\"</code>-ке дейінгі мәндерді <code>int</code>-ке айналдырып, қосындысын <code>total</code>-ға жинаңыз. <code>\"end\"</code> кездескенде <code>break</code> жасаңыз. Қосындыны шығарыңыз.</p>",
   "starter": "readings = [\"120\", \"95\", \"140\", \"end\", \"300\", \"250\"]\ntotal = 0\n",
   "solution": "readings = [\"120\", \"95\", \"140\", \"end\", \"300\", \"250\"]\ntotal = 0\nfor r in readings:\n    if r == \"end\":\n        break\n    total += int(r)\nprint(total)",
   "hints": [
    "Алдымен <code>if r == \"end\": break</code>, сосын <code>int(r)</code>."
   ],
   "check": {
    "tests": "assert total == 355, \"total 355 болуы керек: end-тен кейінгі мәндер қосылмауы керек\"",
    "stdout": true,
    "mustInclude": [
     "break"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Несиені өтеу",
   "prompt": "<p>Несие қалдығы <code>debt = 500000</code> теңге. Әр айдың басында қалдыққа 2% пайыз қосылады (<code>debt = debt * 1.02</code>), сосын 60 000 теңге төленеді. Қарыз 0-ге тең немесе одан аз болғанша неше ай өтеді? <code>months</code> айнымалысына санап, шығарыңыз.</p>",
   "starter": "debt = 500000\nmonths = 0\n",
   "solution": "debt = 500000\nmonths = 0\nwhile debt > 0:\n    debt = debt * 1.02 - 60000\n    months += 1\nprint(months)",
   "hints": [
    "Шарт: <code>while debt &gt; 0:</code>",
    "Цикл ішінде алдымен пайыз, сосын төлем."
   ],
   "check": {
    "tests": "assert months == 10, \"months 10 болуы керек\"",
    "stdout": true,
    "mustInclude": [
     "while"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жарамды бағалардың орташасы",
   "prompt": "<p>Сынақ ұпайлары: <code>-1</code> — оқушы келмеген (өткізіп жіберіңіз, <code>continue</code>), <code>999</code> — тізімнің соңы (тоқтаңыз, <code>break</code>). 0 — жарамды ұпай. Жарамды ұпайлардың орташасын 1 ондық таңбаға дейін дөңгелектеп, <code>avg</code> айнымалысына жазыңыз және шығарыңыз.</p>",
   "starter": "scores = [78, -1, 85, 0, 92, 64, 999, 70, 55]\n",
   "solution": "scores = [78, -1, 85, 0, 92, 64, 999, 70, 55]\ntotal = 0\ncount = 0\nfor s in scores:\n    if s == 999:\n        break\n    if s == -1:\n        continue\n    total += s\n    count += 1\navg = round(total / count, 1)\nprint(avg)",
   "hints": [
    "Қосынды мен санды бөлек жинаңыз.",
    "999 тексерісін бірінші жазыңыз."
   ],
   "check": {
    "tests": "assert avg == 63.8, \"avg 63.8 болуы керек: \" + str(avg)",
    "stdout": true,
    "mustInclude": [
     "break",
     "continue"
    ]
   }
  }
 ],
 "py-9": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Пәтер ауданы",
   "prompt": "<p><code>area(length, width)</code> функциясын жазыңыз: тіктөртбұрыш бөлменің ауданын қайтарсын. Мысалы, <code>area(5, 4)</code> → <code>20</code>.</p>",
   "starter": "def area(length, width):\n    pass\n",
   "solution": "def area(length, width):\n    return length * width",
   "hints": [
    "<code>return length * width</code>"
   ],
   "check": {
    "tests": "assert area(5, 4) == 20, \"area(5, 4) 20 қайтаруы керек\"\nassert area(3.5, 2) == 7.0, \"area(3.5, 2) 7.0 қайтаруы керек\"\nassert area(0, 9) == 0, \"area(0, 9) 0 қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жұп санды тексеру",
   "prompt": "<p><code>is_even(n)</code> функциясы сан жұп болса <code>True</code>, тақ болса <code>False</code> қайтарсын.</p>",
   "starter": "def is_even(n):\n    pass\n",
   "solution": "def is_even(n):\n    return n % 2 == 0",
   "hints": [
    "<code>return n % 2 == 0</code>"
   ],
   "check": {
    "tests": "assert is_even(4) is True, \"is_even(4) True қайтаруы керек\"\nassert is_even(7) is False, \"is_even(7) False қайтаруы керек\"\nassert is_even(0) is True, \"is_even(0) True қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тегі мен аты",
   "prompt": "<p><code>full_name(first, last)</code> функциясы тегі мен атын бос орынмен қайтарсын: <code>full_name(\"Дана\", \"Серікова\")</code> → <code>\"Серікова Дана\"</code>.</p>",
   "starter": "def full_name(first, last):\n    pass\n",
   "solution": "def full_name(first, last):\n    return f\"{last} {first}\"",
   "hints": [
    "<code>return f\"{last} {first}\"</code>"
   ],
   "check": {
    "tests": "assert full_name(\"Дана\", \"Серікова\") == \"Серікова Дана\", \"full_name(\\\"Дана\\\", \\\"Серікова\\\") \\\"Серікова Дана\\\" қайтаруы керек\"\nassert full_name(\"Ерлан\", \"Ахметов\") == \"Ахметов Ерлан\", \"full_name(\\\"Ерлан\\\", \\\"Ахметов\\\") \\\"Ахметов Ерлан\\\" қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Теңгені долларға",
   "prompt": "<p><code>to_usd(kzt, rate=500)</code> функциясы теңгені долларға айналдырып, 2 ондық таңбаға дейін дөңгелектеп қайтарсын. Бағам берілмесе, 500 алынсын. Мысалы, <code>to_usd(10000)</code> → <code>20.0</code>, <code>to_usd(10000, 480)</code> → <code>20.83</code>.</p>",
   "starter": "def to_usd(kzt, rate=500):\n    pass\n",
   "solution": "def to_usd(kzt, rate=500):\n    return round(kzt / rate, 2)",
   "hints": [
    "<code>return round(kzt / rate, 2)</code>"
   ],
   "check": {
    "tests": "assert to_usd(10000) == 20.0, \"to_usd(10000) 20.0 қайтаруы керек\"\nassert to_usd(10000, 480) == 20.83, \"to_usd(10000, 480) 20.83 қайтаруы керек\"\nassert to_usd(0) == 0, \"to_usd(0) 0 қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ауа райының сипаты",
   "prompt": "<p><code>weather(t)</code> функциясы: <code>t</code> −20-дан төмен — <code>\"қатты аяз\"</code>, 0-ден төмен — <code>\"аяз\"</code>, 15-тен төмен — <code>\"салқын\"</code>, әйтпесе <code>\"жылы\"</code> қайтарсын.</p>",
   "starter": "def weather(t):\n    pass\n",
   "solution": "def weather(t):\n    if t < -20:\n        return \"қатты аяз\"\n    elif t < 0:\n        return \"аяз\"\n    elif t < 15:\n        return \"салқын\"\n    return \"жылы\"",
   "hints": [
    "Ең суық шарттан бастаңыз: <code>if t &lt; -20:</code>"
   ],
   "check": {
    "tests": "assert weather(-25) == \"қатты аяз\", \"weather(-25) \\\"қатты аяз\\\" болуы керек\"\nassert weather(-20) == \"аяз\", \"weather(-20) \\\"аяз\\\" болуы керек (шекара)\"\nassert weather(0) == \"салқын\", \"weather(0) \\\"салқын\\\" болуы керек\"\nassert weather(15) == \"жылы\", \"weather(15) \\\"жылы\\\" болуы керек\"\nassert weather(30) == \"жылы\", \"weather(30) \\\"жылы\\\" болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жеңілдікпен баға",
   "prompt": "<p><code>final_price(price, discount=0)</code> функциясы жеңілдік пайызын ескеріп, бүтінге дөңгелектенген бағаны қайтарсын. Жеңілдік 0-ден кіші немесе 50-ден үлкен болса, бұл қате мән: бағаны өзгертпей қайтарыңыз.</p><p>Мысалы, <code>final_price(20000, 15)</code> → <code>17000</code>, <code>final_price(20000, 80)</code> → <code>20000</code>.</p>",
   "starter": "def final_price(price, discount=0):\n    pass\n",
   "solution": "def final_price(price, discount=0):\n    if discount < 0 or discount > 50:\n        return price\n    return round(price * (1 - discount / 100))",
   "hints": [
    "Алдымен қате жеңілдікті тексеріп, бірден <code>return price</code>."
   ],
   "check": {
    "tests": "assert final_price(20000, 15) == 17000, \"final_price(20000, 15) 17000 қайтаруы керек\"\nassert final_price(20000) == 20000, \"Жеңілдік берілмесе, баға өзгермейді\"\nassert final_price(20000, 80) == 20000, \"80% — қате жеңілдік, баға өзгермеуі керек\"\nassert final_price(20000, -5) == 20000, \"Теріс жеңілдік — қате, баға өзгермеуі керек\"\nassert final_price(9990, 50) == 4995, \"final_price(9990, 50) 4995 қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тізімнің орташасы",
   "prompt": "<p><code>average(xs)</code> функциясы сандар тізімінің орташасын 2 ондық таңбаға дейін дөңгелектеп қайтарсын. Тізім бос болса, <code>0</code> қайтарсын (нөлге бөлмеңіз).</p>",
   "starter": "def average(xs):\n    pass\n",
   "solution": "def average(xs):\n    if len(xs) == 0:\n        return 0\n    return round(sum(xs) / len(xs), 2)",
   "hints": [
    "Бос тізімді бірінші тексеріңіз: <code>if len(xs) == 0:</code>",
    "<code>round(sum(xs) / len(xs), 2)</code>"
   ],
   "check": {
    "tests": "assert average([4, 5, 3]) == 4.0, \"average([4, 5, 3]) 4.0 қайтаруы керек\"\nassert average([10, 15, 12]) == 12.33, \"average([10, 15, 12]) 12.33 қайтаруы керек\"\nassert average([]) == 0, \"Бос тізім үшін 0 қайтару керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жеткізу құнының қосындысы",
   "prompt": "<p>Такси жеткізуі: алғашқы 3 км үшін 500 теңге, әр келесі км үшін тағы 100 теңге. <code>fee(km)</code> бір сапардың құнын қайтарсын (мысалы <code>fee(2)</code> → 500, <code>fee(7)</code> → 900). <code>total_fee(distances)</code> тізімдегі барлық сапардың жалпы құнын қайтарсын және ішінде <code>fee</code>-ді шақырсын.</p>",
   "starter": "def fee(km):\n    pass\n\ndef total_fee(distances):\n    pass\n",
   "solution": "def fee(km):\n    if km <= 3:\n        return 500\n    return 500 + (km - 3) * 100\n\ndef total_fee(distances):\n    total = 0\n    for d in distances:\n        total += fee(d)\n    return total",
   "hints": [
    "<code>fee</code>: 3 км-ге дейін 500, одан кейін <code>500 + (km - 3) * 100</code>.",
    "<code>total_fee</code> ішінде цикл және жинаушы."
   ],
   "check": {
    "tests": "assert fee(2) == 500, \"fee(2) 500 қайтаруы керек\"\nassert fee(3) == 500, \"fee(3) 500 қайтаруы керек\"\nassert fee(7) == 900, \"fee(7) 900 қайтаруы керек\"\nassert total_fee([2, 7, 4]) == 2000, \"total_fee([2, 7, 4]) 2000 қайтаруы керек\"\nassert total_fee([]) == 0, \"Бос тізім үшін 0\""
   }
  }
 ],
 "py-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қала халқы",
   "prompt": "<p><code>population(pop, city)</code> функциясы <code>pop</code> сөздігінен қаланың халқын қайтарсын. Қала сөздікте жоқ болса, <code>0</code> қайтарсын.</p>",
   "starter": "pop = {\"Алматы\": 2300000, \"Астана\": 1500000, \"Шымкент\": 1200000}\n\ndef population(pop, city):\n    pass\n",
   "solution": "pop = {\"Алматы\": 2300000, \"Астана\": 1500000, \"Шымкент\": 1200000}\n\ndef population(pop, city):\n    return pop.get(city, 0)",
   "hints": [
    "<code>pop.get(city, 0)</code>"
   ],
   "check": {
    "tests": "assert population(pop, \"Астана\") == 1500000, \"Астана халқы 1500000 болуы керек\"\nassert population(pop, \"Тараз\") == 0, \"Жоқ қала үшін 0 қайтару керек\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қоймаға тауар қосу",
   "prompt": "<p><code>add_stock(stock, item, qty)</code> функциясы <code>stock</code> сөздігіндегі тауар санын <code>qty</code>-ға көбейтсін. Тауар жоқ болса, жаңа кілт қосылсын. Функция сөздікті қайтарсын.</p>",
   "starter": "def add_stock(stock, item, qty):\n    pass\n",
   "solution": "def add_stock(stock, item, qty):\n    stock[item] = stock.get(item, 0) + qty\n    return stock",
   "hints": [
    "<code>stock[item] = stock.get(item, 0) + qty</code>"
   ],
   "check": {
    "tests": "assert add_stock({\"нан\": 10}, \"нан\", 5) == {\"нан\": 15}, \"Бар тауарға қосу дұрыс емес\"\nassert add_stock({\"нан\": 10}, \"сүт\", 3) == {\"нан\": 10, \"сүт\": 3}, \"Жаңа тауар қосылмады\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең қымбат тауар",
   "prompt": "<p><code>most_expensive(prices)</code> функциясы <code>.items()</code> арқылы аралап, ең қымбат тауардың атауын қайтарсын. Сөздік бос емес деп есептеңіз.</p>",
   "starter": "def most_expensive(prices):\n    pass\n",
   "solution": "def most_expensive(prices):\n    best_name = None\n    best_price = None\n    for name, price in prices.items():\n        if best_price is None or price > best_price:\n            best_name = name\n            best_price = price\n    return best_name",
   "hints": [
    "Ең жоғары бағаны және оның атауын екі айнымалыда сақтаңыз."
   ],
   "check": {
    "tests": "assert most_expensive({\"Термос\": 9000, \"Ноутбук\": 350000, \"Рюкзак\": 15000}) == \"Ноутбук\", \"Ноутбук қайтаруы керек\"\nassert most_expensive({\"шай\": 700}) == \"шай\", \"Бір тауар болса, сол қайтады\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Әріптерді санау",
   "prompt": "<p><code>letter_counts(word)</code> функциясы сөздегі әр әріптің санын сөздік түрінде қайтарсын. Мысалы, <code>letter_counts(\"алма\")</code> → <code>{\"а\": 2, \"л\": 1, \"м\": 1}</code>.</p>",
   "starter": "def letter_counts(word):\n    pass\n",
   "solution": "def letter_counts(word):\n    counts = {}\n    for ch in word:\n        counts[ch] = counts.get(ch, 0) + 1\n    return counts",
   "hints": [
    "Жол да тізім сияқты аралана алады: <code>for ch in word:</code>",
    "<code>counts[ch] = counts.get(ch, 0) + 1</code>"
   ],
   "check": {
    "tests": "assert letter_counts(\"алма\") == {\"а\": 2, \"л\": 1, \"м\": 1}, \"letter_counts(\\\"алма\\\") дұрыс емес\"\nassert letter_counts(\"\") == {}, \"Бос сөз үшін бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сынып бойынша оқушылар",
   "prompt": "<p>Оқушылар сөздіктер тізімі түрінде берілген. <code>count_by_class(students)</code> функциясы әр сыныптағы оқушылар санын сөздік түрінде қайтарсын.</p>",
   "starter": "students = [\n    {\"name\": \"Айгерім\", \"class\": \"9А\"},\n    {\"name\": \"Нұрлан\", \"class\": \"9Ә\"},\n    {\"name\": \"Дана\", \"class\": \"9А\"},\n    {\"name\": \"Ерлан\", \"class\": \"10А\"},\n    {\"name\": \"Мадина\", \"class\": \"9А\"},\n]\n\ndef count_by_class(students):\n    pass\n",
   "solution": "students = [\n    {\"name\": \"Айгерім\", \"class\": \"9А\"},\n    {\"name\": \"Нұрлан\", \"class\": \"9Ә\"},\n    {\"name\": \"Дана\", \"class\": \"9А\"},\n    {\"name\": \"Ерлан\", \"class\": \"10А\"},\n    {\"name\": \"Мадина\", \"class\": \"9А\"},\n]\n\ndef count_by_class(students):\n    counts = {}\n    for s in students:\n        counts[s[\"class\"]] = counts.get(s[\"class\"], 0) + 1\n    return counts",
   "hints": [
    "Әр оқушының сыныбы: <code>s[\"class\"]</code>."
   ],
   "check": {
    "tests": "assert count_by_class(students) == {\"9А\": 3, \"9Ә\": 1, \"10А\": 1}, \"Нәтиже: \" + str(count_by_class(students))\nassert count_by_class([]) == {}, \"Бос тізім үшін бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шектен қымбат тауарлар",
   "prompt": "<p><code>above(prices, limit)</code> функциясы бағасы <code>limit</code>-тен жоғары тауарлардың атауларын тізім ретінде қайтарсын (сөздіктегі ретпен).</p>",
   "starter": "def above(prices, limit):\n    pass\n",
   "solution": "def above(prices, limit):\n    out = []\n    for name, price in prices.items():\n        if price > limit:\n            out.append(name)\n    return out",
   "hints": [
    "<code>for name, price in prices.items():</code>"
   ],
   "check": {
    "tests": "_p = {\"Қымыз\": 1800, \"Шұбат\": 2200, \"Айран\": 600, \"Құрт\": 2500}\nassert above(_p, 2000) == [\"Шұбат\", \"Құрт\"], \"above(..., 2000) [\\\"Шұбат\\\", \\\"Құрт\\\"] қайтаруы керек\"\nassert above(_p, 5000) == [], \"Ешқайсысы өтпесе, бос тізім\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Пән бойынша орташа баға",
   "prompt": "<p>Бағалар сөздіктер тізімі түрінде берілген. <code>avg_by_subject(grades)</code> әр пәннің орташа бағасын 1 ондық таңбаға дейін дөңгелектеп, сөздік түрінде қайтарсын.</p>",
   "starter": "grades = [\n    {\"subject\": \"математика\", \"score\": 5},\n    {\"subject\": \"физика\", \"score\": 4},\n    {\"subject\": \"математика\", \"score\": 4},\n    {\"subject\": \"физика\", \"score\": 3},\n    {\"subject\": \"математика\", \"score\": 5},\n]\n\ndef avg_by_subject(grades):\n    pass\n",
   "solution": "grades = [\n    {\"subject\": \"математика\", \"score\": 5},\n    {\"subject\": \"физика\", \"score\": 4},\n    {\"subject\": \"математика\", \"score\": 4},\n    {\"subject\": \"физика\", \"score\": 3},\n    {\"subject\": \"математика\", \"score\": 5},\n]\n\ndef avg_by_subject(grades):\n    totals = {}\n    counts = {}\n    for g in grades:\n        s = g[\"subject\"]\n        totals[s] = totals.get(s, 0) + g[\"score\"]\n        counts[s] = counts.get(s, 0) + 1\n    out = {}\n    for s, t in totals.items():\n        out[s] = round(t / counts[s], 1)\n    return out",
   "hints": [
    "Екі сөздік жинаңыз: қосынды және саны.",
    "Соңында әр пән үшін <code>round(totals[s] / counts[s], 1)</code>."
   ],
   "check": {
    "tests": "assert avg_by_subject(grades) == {\"математика\": 4.7, \"физика\": 3.5}, \"Нәтиже: \" + str(avg_by_subject(grades))\nassert avg_by_subject([]) == {}, \"Бос тізім үшін бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең жиі сөз",
   "prompt": "<p><code>top_word(text)</code> функциясы мәтіндегі ең жиі кездесетін сөзді қайтарсын. Мәтінді кіші әріпке айналдырып, бос орын бойынша бөліңіз. Бірдей жиілік болса, мәтінде бірінші кездескен сөз қайтсын.</p>",
   "starter": "def top_word(text):\n    pass\n",
   "solution": "def top_word(text):\n    counts = {}\n    for w in text.lower().split():\n        counts[w] = counts.get(w, 0) + 1\n    best = None\n    for w, c in counts.items():\n        if best is None or c > counts[best]:\n            best = w\n    return best",
   "hints": [
    "<code>text.lower().split()</code>",
    "Санағаннан кейін <code>.items()</code> арқылы ең үлкенін табыңыз (<code>&gt;</code>, тең болса ауыстырмаңыз)."
   ],
   "check": {
    "tests": "assert top_word(\"Алма алма өрік Алма өрік\") == \"алма\", \"top_word(...) \\\"алма\\\" қайтаруы керек\"\nassert top_word(\"шай сүт сүт шай нан\") == \"шай\", \"Тең жиілікте бірінші кездескен сөз қайтуы керек\"\nassert top_word(\"Тараз\") == \"тараз\", \"Бір сөз болса, сол сөз (кіші әріппен)\""
   }
  }
 ],
 "py-11": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Квадраттар тізімі",
   "prompt": "<p><code>squares(n)</code> функциясы comprehension арқылы 1-ден <code>n</code>-ге дейінгі (қоса) сандардың квадраттарын тізім ретінде қайтарсын: <code>squares(4)</code> → <code>[1, 4, 9, 16]</code>.</p>",
   "starter": "def squares(n):\n    pass\n",
   "solution": "def squares(n):\n    return [i ** 2 for i in range(1, n + 1)]",
   "hints": [
    "<code>[i ** 2 for i in range(1, n + 1)]</code>"
   ],
   "check": {
    "tests": "assert squares(4) == [1, 4, 9, 16], \"squares(4) [1, 4, 9, 16] қайтаруы керек\"\nassert squares(0) == [], \"squares(0) бос тізім қайтаруы керек\"",
    "mustInclude": [
     " for "
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тек оң температуралар",
   "prompt": "<p><code>positives(temps)</code> функциясы comprehension арқылы тек 0-ден жоғары мәндерді қайтарсын (ретін сақтап).</p>",
   "starter": "def positives(temps):\n    pass\n",
   "solution": "def positives(temps):\n    return [t for t in temps if t > 0]",
   "hints": [
    "<code>[t for t in temps if t &gt; 0]</code>"
   ],
   "check": {
    "tests": "assert positives([-5, 3, 0, 12, -1, 7]) == [3, 12, 7], \"positives([-5, 3, 0, 12, -1, 7]) [3, 12, 7] қайтаруы керек\"\nassert positives([-2, -8]) == [], \"Оң сан жоқ болса, бос тізім\"",
    "mustInclude": [
     " for "
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Атаулар ұзындығы",
   "prompt": "<p><code>lengths(words)</code> функциясы comprehension арқылы әр сөздің ұзындығын тізім ретінде қайтарсын: <code>lengths([\"Ақтау\", \"Орал\"])</code> → <code>[5, 4]</code>.</p>",
   "starter": "def lengths(words):\n    pass\n",
   "solution": "def lengths(words):\n    return [len(w) for w in words]",
   "hints": [
    "<code>[len(w) for w in words]</code>"
   ],
   "check": {
    "tests": "assert lengths([\"Ақтау\", \"Орал\"]) == [5, 4], \"lengths([\\\"Ақтау\\\", \\\"Орал\\\"]) [5, 4] қайтаруы керек\"\nassert lengths([]) == [], \"Бос тізім\"",
    "mustInclude": [
     " for "
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Мың теңгемен",
   "prompt": "<p><code>to_thousands(amounts)</code> функциясы comprehension арқылы әр соманы мың теңгеге айналдырып, 1 ондық таңбаға дейін дөңгелектеп қайтарсын: <code>to_thousands([12500, 980])</code> → <code>[12.5, 1.0]</code>.</p>",
   "starter": "def to_thousands(amounts):\n    pass\n",
   "solution": "def to_thousands(amounts):\n    return [round(a / 1000, 1) for a in amounts]",
   "hints": [
    "<code>[round(a / 1000, 1) for a in amounts]</code>"
   ],
   "check": {
    "tests": "assert to_thousands([12500, 980]) == [12.5, 1.0], \"to_thousands([12500, 980]) [12.5, 1.0] қайтаруы керек\"\nassert to_thousands([350000]) == [350.0], \"to_thousands([350000]) [350.0] қайтаруы керек\"",
    "mustInclude": [
     " for "
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Өткен оқушылар сөздігі",
   "prompt": "<p><code>passed(scores, limit=50)</code> функциясы сөздік comprehension арқылы ұпайы <code>limit</code>-тен кем емес оқушыларды ғана қалдырып, жаңа сөздік қайтарсын.</p>",
   "starter": "def passed(scores, limit=50):\n    pass\n",
   "solution": "def passed(scores, limit=50):\n    return {k: v for k, v in scores.items() if v >= limit}",
   "hints": [
    "<code>{k: v for k, v in scores.items() if v &gt;= limit}</code>"
   ],
   "check": {
    "tests": "_s = {\"Айжан\": 72, \"Бекзат\": 49, \"Дәурен\": 50, \"Сәуле\": 91}\nassert passed(_s) == {\"Айжан\": 72, \"Дәурен\": 50, \"Сәуле\": 91}, \"passed(scores) дұрыс емес: 50 те өтеді\"\nassert passed(_s, 80) == {\"Сәуле\": 91}, \"passed(scores, 80) дұрыс емес\"",
    "mustInclude": [
     " for "
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жұп сандар қосындысы",
   "prompt": "<p><code>even_sum(xs)</code> функциясы тізімдегі жұп сандардың қосындысын бір жолда, жақшасыз comprehension арқылы қайтарсын: <code>sum(... for ... if ...)</code>.</p>",
   "starter": "def even_sum(xs):\n    pass\n",
   "solution": "def even_sum(xs):\n    return sum(x for x in xs if x % 2 == 0)",
   "hints": [
    "<code>sum(x for x in xs if x % 2 == 0)</code>"
   ],
   "check": {
    "tests": "assert even_sum([3, 8, 12, 5, 6]) == 26, \"even_sum([3, 8, 12, 5, 6]) 26 қайтаруы керек\"\nassert even_sum([1, 3]) == 0, \"Жұп сан жоқ болса, 0\"",
    "mustInclude": [
     "sum(",
     " for "
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Email тізімін тазалау",
   "prompt": "<p><code>clean_emails(raw)</code> функциясы comprehension арқылы әр email-ді бос орынсыз және кіші әріппен жазып, тек ішінде <code>@</code> бар мәндерді қайтарсын (ретін сақтап).</p>",
   "starter": "def clean_emails(raw):\n    pass\n",
   "solution": "def clean_emails(raw):\n    return [e.strip().lower() for e in raw if \"@\" in e]",
   "hints": [
    "<code>e.strip().lower()</code>",
    "Шарт: <code>if \"@\" in e</code>"
   ],
   "check": {
    "tests": "_r = [\" Asel@Mail.kz\", \"жоқ\", \"BOLAT@gmail.com \", \"\", \"info@shop.kz\"]\nassert clean_emails(_r) == [\"asel@mail.kz\", \"bolat@gmail.com\", \"info@shop.kz\"], \"Нәтиже: \" + str(clean_emails(_r))\nassert clean_emails([]) == [], \"Бос тізім\"",
    "mustInclude": [
     " for "
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қымбат тауар атаулары",
   "prompt": "<p>Тауарлар сөздіктер тізімі түрінде берілген. <code>expensive_names(products, limit)</code> функциясы comprehension арқылы бағасы <code>limit</code>-тен жоғары тауарлардың атауларын бас әріппен (<code>.title()</code>) тізім ретінде қайтарсын.</p>",
   "starter": "products = [\n    {\"name\": \"кілем\", \"price\": 85000},\n    {\"name\": \"кесе\", \"price\": 1500},\n    {\"name\": \"домбыра\", \"price\": 120000},\n    {\"name\": \"шапан\", \"price\": 45000},\n]\n\ndef expensive_names(products, limit):\n    pass\n",
   "solution": "products = [\n    {\"name\": \"кілем\", \"price\": 85000},\n    {\"name\": \"кесе\", \"price\": 1500},\n    {\"name\": \"домбыра\", \"price\": 120000},\n    {\"name\": \"шапан\", \"price\": 45000},\n]\n\ndef expensive_names(products, limit):\n    return [p[\"name\"].title() for p in products if p[\"price\"] > limit]",
   "hints": [
    "Әр тауар — сөздік: <code>p[\"name\"]</code>, <code>p[\"price\"]</code>."
   ],
   "check": {
    "tests": "assert expensive_names(products, 50000) == [\"Кілем\", \"Домбыра\"], \"expensive_names(products, 50000) дұрыс емес: \" + str(expensive_names(products, 50000))\nassert expensive_names(products, 200000) == [], \"Ешқайсысы өтпесе, бос тізім\"",
    "mustInclude": [
     " for "
    ]
   }
  }
 ],
 "py-12": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қауіпсіз бөлу",
   "prompt": "<p><code>safe_div(a, b)</code> функциясы <code>a / b</code> қайтарсын, ал <code>b</code> нөл болса, <code>try/except ZeroDivisionError</code> арқылы <code>None</code> қайтарсын.</p>",
   "starter": "def safe_div(a, b):\n    pass\n",
   "solution": "def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None",
   "hints": [
    "<code>except ZeroDivisionError:</code>"
   ],
   "check": {
    "tests": "assert safe_div(10, 4) == 2.5, \"safe_div(10, 4) 2.5 қайтаруы керек\"\nassert safe_div(5, 0) is None, \"safe_div(5, 0) None қайтаруы керек\"",
    "mustInclude": [
     "except ZeroDivisionError"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Мәтінді бүтін санға",
   "prompt": "<p><code>to_int(s)</code> функциясы мәтінді бүтін санға айналдырсын. Айналмаса (<code>ValueError</code>), <code>0</code> қайтарсын.</p>",
   "starter": "def to_int(s):\n    pass\n",
   "solution": "def to_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return 0",
   "hints": [
    "<code>except ValueError: return 0</code>"
   ],
   "check": {
    "tests": "assert to_int(\"42\") == 42, \"to_int(\\\"42\\\") 42 қайтаруы керек\"\nassert to_int(\"n/a\") == 0, \"to_int(\\\"n/a\\\") 0 қайтаруы керек\"\nassert to_int(\"\") == 0, \"Бос жол үшін 0\"",
    "mustInclude": [
     "except ValueError"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жоқ тауардың бағасы",
   "prompt": "<p><code>get_price(prices, name)</code> функциясы <code>prices[name]</code> қайтарсын. Тауар жоқ болса, <code>try/except KeyError</code> арқылы <code>-1</code> қайтарсын.</p>",
   "starter": "def get_price(prices, name):\n    pass\n",
   "solution": "def get_price(prices, name):\n    try:\n        return prices[name]\n    except KeyError:\n        return -1",
   "hints": [
    "<code>except KeyError:</code>"
   ],
   "check": {
    "tests": "_p = {\"нан\": 250, \"сүт\": 480}\nassert get_price(_p, \"сүт\") == 480, \"get_price(..., \\\"сүт\\\") 480 қайтаруы керек\"\nassert get_price(_p, \"ет\") == -1, \"Жоқ тауар үшін -1\"",
    "mustInclude": [
     "except KeyError"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жарамды сандар саны",
   "prompt": "<p><code>count_valid(raw)</code> функциясы тізімдегі неше мәнді <code>float</code>-қа айналдыруға болатынын санап қайтарсын.</p>",
   "starter": "def count_valid(raw):\n    pass\n",
   "solution": "def count_valid(raw):\n    count = 0\n    for r in raw:\n        try:\n            float(r)\n            count += 1\n        except ValueError:\n            pass\n    return count",
   "hints": [
    "Цикл ішінде <code>try: float(r)</code>, сәтті болса санауышты көбейтіңіз."
   ],
   "check": {
    "tests": "assert count_valid([\"12.5\", \"abc\", \"7\", \"\", \"-3\"]) == 3, \"count_valid(...) 3 қайтаруы керек\"\nassert count_valid([]) == 0, \"Бос тізім үшін 0\"",
    "mustInclude": [
     "except"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жасты тексеру",
   "prompt": "<p><code>check_age(age)</code> функциясы жас 0-ден кіші немесе 120-дан үлкен болса <code>raise ValueError(\"жас дұрыс емес\")</code> жасасын, әйтпесе жасты қайтарсын.</p>",
   "starter": "def check_age(age):\n    pass\n",
   "solution": "def check_age(age):\n    if age < 0 or age > 120:\n        raise ValueError(\"жас дұрыс емес\")\n    return age",
   "hints": [
    "<code>raise ValueError(\"жас дұрыс емес\")</code>"
   ],
   "check": {
    "tests": "assert check_age(25) == 25, \"check_age(25) 25 қайтаруы керек\"\nfor _bad in [-5, 150]:\n    try:\n        check_age(_bad)\n        _ok = False\n    except ValueError:\n        _ok = True\n    assert _ok, \"check_age(\" + str(_bad) + \") ValueError көтеруі керек\"",
    "mustInclude": [
     "raise"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташаны қауіпсіз есептеу",
   "prompt": "<p><code>avg_or_none(xs)</code> функциясы тізімнің орташасын қайтарсын. Тізім бос болса, <code>ZeroDivisionError</code>-ды ұстап, <code>None</code> қайтарсын.</p>",
   "starter": "def avg_or_none(xs):\n    pass\n",
   "solution": "def avg_or_none(xs):\n    try:\n        return sum(xs) / len(xs)\n    except ZeroDivisionError:\n        return None",
   "hints": [
    "Бос тізімде <code>len(xs)</code> 0, сондықтан бөлу қате береді."
   ],
   "check": {
    "tests": "assert avg_or_none([2, 4, 9]) == 5.0, \"avg_or_none([2, 4, 9]) 5.0 қайтаруы керек\"\nassert avg_or_none([]) is None, \"Бос тізім үшін None\"",
    "mustInclude": [
     "except ZeroDivisionError"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Лас бағаларды қосу",
   "prompt": "<p>Бағалар әртүрлі жазылған: <code>\"12 500\"</code>, <code>\"3000₸\"</code>, <code>\"abc\"</code>. <code>parse_total(raw)</code> функциясы әр мәннен бос орындар мен <code>₸</code> белгісін алып тастап, <code>float</code>-қа айналдырсын, айналмағандарын өткізіп жіберсін және қосындыны қайтарсын.</p>",
   "starter": "def parse_total(raw):\n    pass\n",
   "solution": "def parse_total(raw):\n    total = 0\n    for r in raw:\n        s = r.replace(\" \", \"\").replace(\"₸\", \"\")\n        try:\n            total += float(s)\n        except ValueError:\n            pass\n    return total",
   "hints": [
    "<code>r.replace(\" \", \"\").replace(\"₸\", \"\")</code>",
    "Сосын <code>try: float(s)</code>."
   ],
   "check": {
    "tests": "assert parse_total([\"12 500\", \"3000₸\", \"abc\", \"\", \"750\"]) == 16250, \"parse_total(...) 16250 қайтаруы керек\"\nassert parse_total([\"1 200 ₸\", \"n/a\"]) == 1200, \"parse_total([\\\"1 200 ₸\\\", \\\"n/a\\\"]) 1200 қайтаруы керек\"\nassert parse_total([]) == 0, \"Бос тізім үшін 0\"",
    "mustInclude": [
     "except"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жақсы және жаман мәндер",
   "prompt": "<p><code>split_values(raw)</code> функциясы <code>{\"ok\": [...], \"bad\": [...]}</code> сөздігін қайтарсын: <code>\"ok\"</code> — <code>int</code>-ке айналған сандар, <code>\"bad\"</code> — айналмаған бастапқы мәтіндер (екеуі де ретін сақтайды).</p>",
   "starter": "def split_values(raw):\n    pass\n",
   "solution": "def split_values(raw):\n    out = {\"ok\": [], \"bad\": []}\n    for r in raw:\n        try:\n            out[\"ok\"].append(int(r))\n        except ValueError:\n            out[\"bad\"].append(r)\n    return out",
   "hints": [
    "Сөздікті <code>{\"ok\": [], \"bad\": []}</code> деп бастаңыз.",
    "<code>except ValueError:</code> ішінде <code>out[\"bad\"].append(r)</code>."
   ],
   "check": {
    "tests": "_r = split_values([\"15\", \"x\", \"8\", \"\", \"-2\", \"3.5\"])\nassert _r == {\"ok\": [15, 8, -2], \"bad\": [\"x\", \"\", \"3.5\"]}, \"Нәтиже: \" + str(_r)\nassert split_values([]) == {\"ok\": [], \"bad\": []}, \"Бос тізім үшін екі бос тізім\"",
    "mustInclude": [
     "except"
    ]
   }
  }
 ],
 "py-13": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Сатылған тауар саны",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>total_qty(rows)</code> барлық жолдардағы <code>qty</code> қосындысын (int) қайтарсын.</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef total_qty(rows):\n    pass\n\nprint(total_qty(rows))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef total_qty(rows):\n    total = 0\n    for r in rows:\n        total += int(r[\"qty\"])\n    return total\n\nprint(total_qty(rows))",
   "hints": [
    "<code>int(r[\"qty\"])</code>"
   ],
   "check": {
    "tests": "assert total_qty(rows) == 15, \"total_qty(rows) 15 қайтаруы керек, сізде: \" + str(total_qty(rows))\nassert total_qty([]) == 0, \"Бос тізім үшін 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қалалар тізімі",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>cities(rows)</code> қайталанбайтын қала атауларын әліпби ретімен сұрыпталған тізім ретінде қайтарсын.</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef cities(rows):\n    pass\n\nprint(cities(rows))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef cities(rows):\n    out = []\n    for r in rows:\n        if r[\"city\"] not in out:\n            out.append(r[\"city\"])\n    return sorted(out)\n\nprint(cities(rows))",
   "hints": [
    "Қала тізімде жоқ болса ғана қосыңыз: <code>if r[\"city\"] not in out:</code>",
    "Соңында <code>sorted(out)</code>."
   ],
   "check": {
    "tests": "_c = cities(rows)\nassert _c == sorted([\"Алматы\", \"Астана\", \"Қарағанды\"]), \"Нәтиже: \" + str(_c)\nassert cities([]) == [], \"Бос тізім үшін бос тізім\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір күннің сатылымы",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>rows_on(rows, day)</code> сол күннің (<code>date</code>) жолдарын тізім ретінде қайтарсын.</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef rows_on(rows, day):\n    pass\n\nprint(len(rows_on(rows, \"2024-10-03\")))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef rows_on(rows, day):\n    return [r for r in rows if r[\"date\"] == day]\n\nprint(len(rows_on(rows, \"2024-10-03\")))",
   "hints": [
    "<code>[r for r in rows if r[\"date\"] == day]</code>"
   ],
   "check": {
    "tests": "assert len(rows_on(rows, \"2024-10-03\")) == 2, \"2024-10-03 күні 2 жол болуы керек\"\nassert [r[\"city\"] for r in rows_on(rows, \"2024-10-02\")] == [\"Алматы\", \"Астана\"], \"2024-10-02 күнгі жолдар дұрыс емес\"\nassert rows_on(rows, \"2024-11-01\") == [], \"Сатылым жоқ күн үшін бос тізім\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Санат бойынша табыс",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>revenue_by_category(rows)</code> санат (<code>category</code>) → табыс (<code>qty × price</code>) сөздігін қайтарсын.</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef revenue_by_category(rows):\n    pass\n\nprint(revenue_by_category(rows))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef revenue_by_category(rows):\n    out = {}\n    for r in rows:\n        out[r[\"category\"]] = out.get(r[\"category\"], 0) + int(r[\"qty\"]) * int(r[\"price\"])\n    return out\n\nprint(revenue_by_category(rows))",
   "hints": [
    "<code>out[key] = out.get(key, 0) + ...</code>"
   ],
   "check": {
    "tests": "_r = revenue_by_category(rows)\nassert _r == {\"Аяқ киім\": 94000, \"Киім\": 95000, \"Құрал\": 113000}, \"Нәтиже: \" + str(_r)"
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа чек",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>avg_check(rows)</code> бір жолдың орташа табысын (<code>qty × price</code> қосындысы / жолдар саны) бүтінге дөңгелектеп қайтарсын. Тізім бос болса, 0 қайтарсын.</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef avg_check(rows):\n    pass\n\nprint(avg_check(rows))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef avg_check(rows):\n    if len(rows) == 0:\n        return 0\n    total = 0\n    for r in rows:\n        total += int(r[\"qty\"]) * int(r[\"price\"])\n    return round(total / len(rows))\n\nprint(avg_check(rows))",
   "hints": [
    "Алдымен бос тізімді тексеріңіз.",
    "<code>round(total / len(rows))</code>"
   ],
   "check": {
    "tests": "assert avg_check(rows) == 37750, \"avg_check(rows) 37750 қайтаруы керек, сізде: \" + str(avg_check(rows))\nassert avg_check([]) == 0, \"Бос тізім үшін 0\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Күндік табыс",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>revenue_by_day(rows)</code> күн → табыс сөздігін қайтарсын. Сосын <code>best_day(rows)</code> ең көп табысты күнді қайтарсын (<code>max(d, key=d.get)</code>).</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef revenue_by_day(rows):\n    pass\n\ndef best_day(rows):\n    pass\n\nprint(revenue_by_day(rows))\nprint(best_day(rows))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef revenue_by_day(rows):\n    out = {}\n    for r in rows:\n        out[r[\"date\"]] = out.get(r[\"date\"], 0) + int(r[\"qty\"]) * int(r[\"price\"])\n    return out\n\ndef best_day(rows):\n    d = revenue_by_day(rows)\n    return max(d, key=d.get)\n\nprint(revenue_by_day(rows))\nprint(best_day(rows))",
   "hints": [
    "<code>best_day</code> ішінде <code>revenue_by_day(rows)</code>-ты қайта қолданыңыз."
   ],
   "check": {
    "tests": "_d = revenue_by_day(rows)\nassert _d == {\"2024-10-01\": 100000, \"2024-10-02\": 75000, \"2024-10-03\": 60000, \"2024-10-04\": 15000, \"2024-10-05\": 52000}, \"revenue_by_day: \" + str(_d)\nassert best_day(rows) == \"2024-10-01\", \"best_day 2024-10-01 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қаладағы үздік санат",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>best_category(rows, city)</code> тек сол қаланың жолдары бойынша ең көп табыс әкелген санатты қайтарсын. Қала жоқ болса, <code>None</code> қайтарсын.</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef best_category(rows, city):\n    pass\n\nprint(best_category(rows, \"Алматы\"))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef best_category(rows, city):\n    rev = {}\n    for r in rows:\n        if r[\"city\"] == city:\n            rev[r[\"category\"]] = rev.get(r[\"category\"], 0) + int(r[\"qty\"]) * int(r[\"price\"])\n    if len(rev) == 0:\n        return None\n    return max(rev, key=rev.get)\n\nprint(best_category(rows, \"Алматы\"))",
   "hints": [
    "Алдымен қала бойынша сүзіп, санат бойынша сөздік жинаңыз.",
    "Сөздік бос болса, <code>max</code> қате береді: алдын ала тексеріңіз."
   ],
   "check": {
    "tests": "assert best_category(rows, \"Алматы\") == \"Аяқ киім\", \"Алматыда Аяқ киім болуы керек\"\nassert best_category(rows, \"Астана\") == \"Құрал\", \"Астанада Құрал болуы керек\"\nassert best_category(rows, \"Қарағанды\") == \"Киім\", \"Қарағандыда Киім болуы керек\"\nassert best_category(rows, \"Тараз\") is None, \"Жоқ қала үшін None\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қалалардың табыс үлесі",
   "prompt": "<p>Спорт дүкенінің сатылымы CSV түрінде берілген (<code>rows</code> дайын, мәндері мәтін).</p><p><code>city_share(rows)</code> қала → жалпы табыстағы үлесі (пайызбен, 1 ондық таңбаға дейін дөңгелектенген) сөздігін қайтарсын.</p>",
   "starter": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef city_share(rows):\n    pass\n\nprint(city_share(rows))\n",
   "solution": "import csv, io\ndata = \"\"\"date,city,category,qty,price\n2024-10-01,Алматы,Аяқ киім,2,32000\n2024-10-01,Қарағанды,Киім,3,12000\n2024-10-02,Алматы,Құрал,1,45000\n2024-10-02,Астана,Аяқ киім,1,30000\n2024-10-03,Қарағанды,Құрал,2,8000\n2024-10-03,Астана,Киім,4,11000\n2024-10-04,Алматы,Киім,1,15000\n2024-10-05,Астана,Құрал,1,52000\n\"\"\"\nrows = list(csv.DictReader(io.StringIO(data)))\n\ndef city_share(rows):\n    rev = {}\n    total = 0\n    for r in rows:\n        amount = int(r[\"qty\"]) * int(r[\"price\"])\n        rev[r[\"city\"]] = rev.get(r[\"city\"], 0) + amount\n        total += amount\n    return {c: round(v / total * 100, 1) for c, v in rev.items()}\n\nprint(city_share(rows))",
   "hints": [
    "Қала бойынша табыс пен жалпы табысты бір циклде жинаңыз.",
    "Соңында <code>{c: round(v / total * 100, 1) for c, v in rev.items()}</code>."
   ],
   "check": {
    "tests": "_s = city_share(rows)\nassert _s == {\"Алматы\": 41.1, \"Қарағанды\": 17.2, \"Астана\": 41.7}, \"Нәтиже: \" + str(_s)"
   }
  }
 ]
});
