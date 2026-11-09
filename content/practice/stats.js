// Practice tasks after the lessons of m3-1. Each lesson's list opens one task at a time.
DJ.addPractice('m3-1', {
 "st-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Аралықтың басы",
   "prompt": "<p><code>bin_start(x, width)</code> функциясын жазыңыз: <code>x</code> мәні түсетін аралықтың басын қайтарсын. Мысалы, <code>bin_start(74, 10)</code> → <code>70</code>, <code>bin_start(37, 5)</code> → <code>35</code>.</p>",
   "starter": "def bin_start(x, width):\n    pass\n",
   "solution": "def bin_start(x, width):\n    return x // width * width\n",
   "hints": [
    "<code>x // width * width</code>"
   ],
   "check": {
    "tests": "assert bin_start(74, 10) == 70, \"bin_start(74, 10) 70 қайтаруы керек\"\nassert bin_start(37, 5) == 35, \"bin_start(37, 5) 35 қайтаруы керек\"\nassert bin_start(40, 10) == 40, \"Аралықтың басындағы мән өз аралығында қалады: bin_start(40, 10) = 40\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бес жылдық аралықтар",
   "prompt": "<p><code>bins5(ages)</code> функциясын жазыңыз: 5 жылдық аралықтар бойынша жиілік сөздігін қайтарсын (кілт — аралықтың басы). Мысалы, <code>bins5([21, 23, 26, 34])</code> → <code>{20: 2, 25: 1, 30: 1}</code>.</p>",
   "starter": "def bins5(ages):\n    bins = {}\n    return bins\n",
   "solution": "def bins5(ages):\n    bins = {}\n    for a in ages:\n        start = a // 5 * 5\n        bins[start] = bins.get(start, 0) + 1\n    return bins\n",
   "hints": [
    "<code>a // 5 * 5</code>",
    "<code>bins[start] = bins.get(start, 0) + 1</code>"
   ],
   "check": {
    "tests": "assert bins5([21, 23, 26, 34]) == {20: 2, 25: 1, 30: 1}, \"bins5([21, 23, 26, 34]) {20: 2, 25: 1, 30: 1} болуы керек\"\nassert bins5([18, 19, 20]) == {15: 2, 20: 1}, \"bins5([18, 19, 20]) {15: 2, 20: 1} болуы керек\"\nassert bins5([]) == {}, \"Бос тізім үшін бос сөздік\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең толы аралық",
   "prompt": "<p><code>top_bin(xs)</code> функциясын жазыңыз: 10 бірлікті аралықтардың ішінде мәндері ең көп аралықтың басын қайтарсын. Екі аралықта сан тең болса, кішісін алыңыз. Мысалы, <code>top_bin([12, 25, 27, 29, 31])</code> → <code>20</code>.</p>",
   "starter": "def top_bin(xs):\n    pass\n",
   "solution": "def top_bin(xs):\n    bins = {}\n    for x in xs:\n        start = x // 10 * 10\n        bins[start] = bins.get(start, 0) + 1\n    best = None\n    for start in sorted(bins):\n        if best is None or bins[start] > bins[best]:\n            best = start\n    return best\n",
   "hints": [
    "Алдымен жиілік сөздігін құрыңыз.",
    "Кілттерді <code>sorted(bins)</code> ретімен айналып, ең үлкен санды іздеңіз."
   ],
   "check": {
    "tests": "assert top_bin([12, 25, 27, 29, 31]) == 20, \"top_bin([12, 25, 27, 29, 31]) 20 қайтаруы керек\"\nassert top_bin([5, 15, 16, 45, 47]) == 10, \"Тең болса, кіші аралық: top_bin([5, 15, 16, 45, 47]) = 10\"\nassert top_bin([88]) == 80, \"top_bin([88]) 80 қайтаруы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Аралық белгілері",
   "prompt": "<p><code>bin_labels(xs, width)</code> функциясын жазыңыз: кілті <code>\"басы-соңы\"</code> мәтіні болатын жиілік сөздігін қайтарсын. Мысалы, <code>bin_labels([55, 62, 68], 10)</code> → <code>{\"50-59\": 1, \"60-69\": 2}</code>.</p>",
   "starter": "def bin_labels(xs, width):\n    pass\n",
   "solution": "def bin_labels(xs, width):\n    bins = {}\n    for x in xs:\n        start = x // width * width\n        label = f\"{start}-{start + width - 1}\"\n        bins[label] = bins.get(label, 0) + 1\n    return bins\n",
   "hints": [
    "Аралықтың соңы: <code>start + width - 1</code>.",
    "Белгі: <code>f\"{start}-{start + width - 1}\"</code>"
   ],
   "check": {
    "tests": "assert bin_labels([55, 62, 68], 10) == {\"50-59\": 1, \"60-69\": 2}, \"bin_labels([55, 62, 68], 10) {'50-59': 1, '60-69': 2} болуы керек\"\nassert bin_labels([3, 4, 7], 5) == {\"0-4\": 2, \"5-9\": 1}, \"bin_labels([3, 4, 7], 5) {'0-4': 2, '5-9': 1} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бос аралықтар да керек",
   "prompt": "<p>Гистограммада бос аралық та көрінуі керек. <code>full_bins(xs, width)</code> функциясы ең кіші мәннің аралығынан ең үлкен мәннің аралығына дейінгі <b>барлық</b> аралықтарды қайтарсын, бос аралыққа <code>0</code>. Мысалы, <code>full_bins([12, 15, 41], 10)</code> → <code>{10: 2, 20: 0, 30: 0, 40: 1}</code>.</p>",
   "starter": "def full_bins(xs, width):\n    pass\n",
   "solution": "def full_bins(xs, width):\n    lo = min(xs) // width * width\n    hi = max(xs) // width * width\n    bins = {s: 0 for s in range(lo, hi + 1, width)}\n    for x in xs:\n        bins[x // width * width] += 1\n    return bins\n",
   "hints": [
    "<code>range(lo, hi + 1, width)</code> барлық аралық басын береді.",
    "Алдымен барлық кілтке 0 қойып, сосын санаңыз."
   ],
   "check": {
    "tests": "assert full_bins([12, 15, 41], 10) == {10: 2, 20: 0, 30: 0, 40: 1}, \"full_bins([12, 15, 41], 10) {10: 2, 20: 0, 30: 0, 40: 1} болуы керек\"\nassert full_bins([5, 6], 5) == {5: 2}, \"full_bins([5, 6], 5) {5: 2} болуы керек\"\nassert full_bins([0, 14], 5) == {0: 1, 5: 0, 10: 1}, \"full_bins([0, 14], 5) {0: 1, 5: 0, 10: 1} болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қисаю бағыты",
   "prompt": "<p><code>skew_side(xs)</code> функциясын жазыңыз: орташа медианадан үлкен болса <code>\"оң\"</code>, кіші болса <code>\"сол\"</code>, тең болса <code>\"симметриялы\"</code> қайтарсын. Медиананы сұрыпталған тізімнің ортасынан табыңыз (жұп ұзындықта ортадағы екі мәннің орташасы). Мысалы, жалақылар <code>[300, 320, 350, 2500]</code> → <code>\"оң\"</code>.</p>",
   "starter": "def skew_side(xs):\n    pass\n",
   "solution": "def skew_side(xs):\n    s = sorted(xs)\n    n = len(s)\n    if n % 2 == 1:\n        med = s[n // 2]\n    else:\n        med = (s[n // 2 - 1] + s[n // 2]) / 2\n    m = sum(xs) / n\n    if m > med:\n        return \"оң\"\n    if m < med:\n        return \"сол\"\n    return \"симметриялы\"\n",
   "hints": [
    "Оңға қисайған таралуда орташа &gt; медиана.",
    "Медиана: <code>s = sorted(xs)</code>, ортадағы мән(дер)."
   ],
   "check": {
    "tests": "assert skew_side([300, 320, 350, 2500]) == \"оң\", \"Ұзын құйрық оң жақта: [300, 320, 350, 2500] → оң\"\nassert skew_side([10, 80, 85, 90]) == \"сол\", \"[10, 80, 85, 90] → сол\"\nassert skew_side([1, 2, 3, 4, 5]) == \"симметриялы\", \"[1, 2, 3, 4, 5] → симметриялы\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мәтіндік гистограмма",
   "prompt": "<p><code>hist_lines(xs, width)</code> функциясын жазыңыз: аралықтар бойынша өсу ретімен жолдар тізімін қайтарсын, бос аралықтар да болсын. Әр жол: <code>f\"{басы}: {'#' * саны}\"</code>. Мысалы, <code>hist_lines([1, 2, 21], 10)</code> → <code>[\"0: ##\", \"10: \", \"20: #\"]</code>.</p>",
   "starter": "def hist_lines(xs, width):\n    lines = []\n    return lines\n",
   "solution": "def hist_lines(xs, width):\n    lo = min(xs) // width * width\n    hi = max(xs) // width * width\n    bins = {s: 0 for s in range(lo, hi + 1, width)}\n    for x in xs:\n        bins[x // width * width] += 1\n    return [f\"{s}: {'#' * bins[s]}\" for s in sorted(bins)]\n",
   "hints": [
    "Алдымен бос аралықтары бар толық сөздік құрыңыз.",
    "<code>'#' * 3</code> → <code>'###'</code>"
   ],
   "check": {
    "tests": "assert hist_lines([1, 2, 21], 10) == [\"0: ##\", \"10: \", \"20: #\"], f\"hist_lines([1, 2, 21], 10) дұрыс емес: {hist_lines([1, 2, 21], 10)}\"\n_r = hist_lines([55, 62, 68, 71, 74, 75, 78, 81, 85, 93], 10)\nassert _r == [\"50: #\", \"60: ##\", \"70: ####\", \"80: ##\", \"90: #\"], f\"Сабақтағы бағалар үшін жолдар дұрыс емес: {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Таралудың шыңдары",
   "prompt": "<p>Екі «өркеш» бар ма? <code>peaks(xs, width)</code> функциясы толық гистограммадағы (бос аралықтар 0) <b>шыңдардың</b> басын өсу ретімен тізіммен қайтарсын. Шың — саны екі көршісінен де қатаң үлкен аралық (шетте көрші жоқ болса, оны 0 деп санаңыз). Мысалы, кафе чектері <code>[1400, 1500, 1600, 1550, 2100, 7100, 8000, 8100, 8200]</code>, <code>width=1000</code> → <code>[1000, 8000]</code>.</p>",
   "starter": "def peaks(xs, width):\n    pass\n",
   "solution": "def peaks(xs, width):\n    lo = min(xs) // width * width\n    hi = max(xs) // width * width\n    starts = list(range(lo, hi + 1, width))\n    bins = {s: 0 for s in starts}\n    for x in xs:\n        bins[x // width * width] += 1\n    out = []\n    for i, s in enumerate(starts):\n        left = bins[starts[i - 1]] if i > 0 else 0\n        right = bins[starts[i + 1]] if i < len(starts) - 1 else 0\n        if bins[s] > left and bins[s] > right:\n            out.append(s)\n    return out\n",
   "hints": [
    "Аралық бастарын <code>starts</code> тізіміне сақтаңыз, сонда көршілерді индекспен аласыз.",
    "Шеттегі аралықта жоқ көршіні 0 деп алыңыз."
   ],
   "check": {
    "tests": "_r = peaks([1400, 1500, 1600, 1550, 2100, 7100, 8000, 8100, 8200], 1000)\nassert _r == [1000, 8000], f\"Екі шың 1000 және 8000 болуы керек, сізде {_r}\"\nassert peaks([1, 11, 12, 13, 21], 10) == [10], \"Бір шыңды таралу: [10]\"\nassert peaks([5, 6, 15, 16], 10) == [], \"Тең көршілер шың емес: []\""
   }
  }
 ],
 "st-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орташа мән функциясы",
   "prompt": "<p><code>mean(xs)</code> функциясын <code>statistics</code>-сіз жазыңыз. Мысалы, <code>mean([2, 4, 9])</code> → <code>5.0</code>.</p>",
   "starter": "def mean(xs):\n    pass\n",
   "solution": "def mean(xs):\n    return sum(xs) / len(xs)\n",
   "hints": [
    "<code>sum(xs) / len(xs)</code>"
   ],
   "check": {
    "tests": "assert mean([2, 4, 9]) == 5, \"mean([2, 4, 9]) 5 болуы керек\"\nassert mean([7]) == 7, \"mean([7]) 7 болуы керек\"\nassert abs(mean([1, 2]) - 1.5) < 1e-9, \"mean([1, 2]) 1.5 болуы керек\"",
    "mustInclude": [
     "def mean"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ең жиі көйлек өлшемі",
   "prompt": "<p><code>top_size(sizes)</code> функциясы <code>statistics.mode</code> арқылы ең жиі сатылған өлшемді қайтарсын. Мысалы, <code>top_size([\"M\", \"L\", \"M\", \"S\"])</code> → <code>\"M\"</code>.</p>",
   "starter": "import statistics\n\ndef top_size(sizes):\n    pass\n",
   "solution": "import statistics\n\ndef top_size(sizes):\n    return statistics.mode(sizes)\n",
   "hints": [
    "<code>statistics.mode(sizes)</code>"
   ],
   "check": {
    "tests": "assert top_size([\"M\", \"L\", \"M\", \"S\"]) == \"M\", \"top_size(['M', 'L', 'M', 'S']) M болуы керек\"\nassert top_size([\"XL\", \"S\", \"S\", \"L\", \"XL\", \"S\"]) == \"S\", \"Бұл тізімде ең жиі өлшем S\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ақпан аязының медианасы",
   "prompt": "<p>Астанадағы ақпан айының бір аптасындағы түнгі температуралар берілген. <code>med_temp(temps)</code> функциясы <code>statistics.median</code> арқылы медиананы қайтарсын. Мысалы, <code>med_temp([-25, -18, -30, -21])</code> → <code>-23.0</code>.</p>",
   "starter": "import statistics\n\ndef med_temp(temps):\n    pass\n",
   "solution": "import statistics\n\ndef med_temp(temps):\n    return statistics.median(temps)\n",
   "hints": [
    "<code>statistics.median(temps)</code>"
   ],
   "check": {
    "tests": "assert med_temp([-25, -18, -30, -21]) == -23, \"med_temp([-25, -18, -30, -21]) -23 болуы керек\"\nassert med_temp([-12, -20, -15]) == -15, \"med_temp([-12, -20, -15]) -15 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа мен медиана айырмасы",
   "prompt": "<p><code>gap(xs)</code> функциясы орташа мен медиананың айырмасын (<code>орташа − медиана</code>) қайтарсын. Оң сан — оң құйрық бар деген белгі. <code>statistics</code> қолдануға болады. Мысалы, <code>gap([300, 320, 350, 400, 2500])</code> → <code>424</code>.</p>",
   "starter": "import statistics\n\ndef gap(xs):\n    pass\n",
   "solution": "import statistics\n\ndef gap(xs):\n    return statistics.mean(xs) - statistics.median(xs)\n",
   "hints": [
    "<code>statistics.mean(xs) - statistics.median(xs)</code>"
   ],
   "check": {
    "tests": "assert gap([300, 320, 350, 400, 2500]) == 424, \"gap([300, 320, 350, 400, 2500]) 424 болуы керек (774 − 350)\"\nassert gap([1, 2, 3]) == 0, \"Симметриялы тізімде айырма 0\"\nassert gap([1, 9, 10]) < 0, \"Сол құйрықта айырма теріс\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Моданы қолмен табу",
   "prompt": "<p><code>my_mode(xs)</code> функциясын <code>statistics</code>-сіз жазыңыз: ең жиі мәнді қайтарсын. Бірнеше мән тең жиі кездессе, тізімде <b>бірінші</b> кездескенін алыңыз. Мысалы, <code>my_mode([\"Алматы\", \"Астана\", \"Астана\", \"Алматы\", \"Шымкент\"])</code> → <code>\"Алматы\"</code>.</p>",
   "starter": "def my_mode(xs):\n    pass\n",
   "solution": "def my_mode(xs):\n    counts = {}\n    for x in xs:\n        counts[x] = counts.get(x, 0) + 1\n    best = xs[0]\n    for x in xs:\n        if counts[x] > counts[best]:\n            best = x\n    return best\n",
   "hints": [
    "Алдымен <code>counts</code> сөздігінде әр мәнді санаңыз.",
    "Сосын тізімді бастан айналып, саны үлкенін қатаң <code>&gt;</code> арқылы ауыстырыңыз."
   ],
   "check": {
    "tests": "assert my_mode([\"Алматы\", \"Астана\", \"Астана\", \"Алматы\", \"Шымкент\"]) == \"Алматы\", \"Тең болса, бірінші кездескені: Алматы\"\nassert my_mode([3, 1, 1, 2]) == 1, \"my_mode([3, 1, 1, 2]) 1 болуы керек\"\nassert my_mode([5]) == 5, \"Бір мәнді тізім\"",
    "mustInclude": [
     "def my_mode"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Лайық көрсеткішті таңдау",
   "prompt": "<p><code>pick_center(xs)</code> функциясы сабақтағы кесте бойынша жұп қайтарсын:</p><ul><li>мәндер мәтін болса (<code>isinstance(xs[0], str)</code>) → <code>(\"мода\", мода)</code>;</li><li>орташа медианадан 10%-дан көп ерекшеленсе (<code>abs(орташа − медиана) &gt; 0.1 * медиана</code>) → <code>(\"медиана\", медиана)</code>;</li><li>әйтпесе → <code>(\"орташа\", орташа)</code>.</li></ul><p>Мысалы, <code>[300, 320, 350, 400, 2500]</code> → <code>(\"медиана\", 350)</code>.</p>",
   "starter": "import statistics\n\ndef pick_center(xs):\n    pass\n",
   "solution": "import statistics\n\ndef pick_center(xs):\n    if isinstance(xs[0], str):\n        return (\"мода\", statistics.mode(xs))\n    m = statistics.mean(xs)\n    med = statistics.median(xs)\n    if abs(m - med) > 0.1 * med:\n        return (\"медиана\", med)\n    return (\"орташа\", m)\n",
   "hints": [
    "Алдымен мәтін екенін тексеріңіз, сосын ғана орташаны есептеңіз."
   ],
   "check": {
    "tests": "assert pick_center([300, 320, 350, 400, 2500]) == (\"медиана\", 350), \"Шеткі мән бар: ('медиана', 350)\"\nassert pick_center([\"S\", \"M\", \"M\"]) == (\"мода\", \"M\"), \"Категориялық дерек: ('мода', 'M')\"\nassert pick_center([160, 165, 170, 175]) == (\"орташа\", 167.5), \"Симметриялы дерек: ('орташа', 167.5)\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қала бойынша медиана",
   "prompt": "<p><code>median_by_city(rows)</code> функциясы <code>(қала, жалақы)</code> жұптарының тізімін алып, <code>{қала: жалақы медианасы}</code> сөздігін қайтарсын. Мысалы, <code>[(\"Алматы\", 400), (\"Алматы\", 600), (\"Астана\", 500)]</code> → <code>{\"Алматы\": 500.0, \"Астана\": 500}</code>.</p>",
   "starter": "import statistics\n\ndef median_by_city(rows):\n    pass\n",
   "solution": "import statistics\n\ndef median_by_city(rows):\n    groups = {}\n    for city, salary in rows:\n        groups.setdefault(city, []).append(salary)\n    return {c: statistics.median(v) for c, v in groups.items()}\n",
   "hints": [
    "Алдымен әр қаланың жалақыларын тізімге жинаңыз: <code>groups.setdefault(city, []).append(salary)</code>.",
    "Сосын әр тізімге <code>statistics.median</code>."
   ],
   "check": {
    "tests": "_rows = [(\"Алматы\", 400), (\"Астана\", 500), (\"Алматы\", 600), (\"Шымкент\", 300), (\"Алматы\", 5000), (\"Астана\", 450)]\n_r = median_by_city(_rows)\nassert isinstance(_r, dict), \"Сөздік қайтарыңыз\"\nassert _r == {\"Алматы\": 600, \"Астана\": 475, \"Шымкент\": 300}, f\"Алматы 600, Астана 475, Шымкент 300 болуы керек, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Шеттерді кесіп орташалау",
   "prompt": "<p><code>trimmed_mean(xs, k)</code> функциясы тізімді сұрыптап, ең кіші <code>k</code> және ең үлкен <code>k</code> мәнді алып тастап, қалғанының орташасын қайтарсын. Мысалы, <code>trimmed_mean([5, 100, 7, 6, 1], 1)</code> → <code>6.0</code>.</p>",
   "starter": "def trimmed_mean(xs, k):\n    pass\n",
   "solution": "def trimmed_mean(xs, k):\n    s = sorted(xs)\n    middle = s[k:len(s) - k]\n    return sum(middle) / len(middle)\n",
   "hints": [
    "<code>s = sorted(xs)</code>, сосын <code>s[k:len(s) - k]</code>."
   ],
   "check": {
    "tests": "assert trimmed_mean([5, 100, 7, 6, 1], 1) == 6, \"trimmed_mean([5, 100, 7, 6, 1], 1) 6 болуы керек\"\nassert trimmed_mean([1, 2, 3, 4], 0) == 2.5, \"k = 0 болса, кәдімгі орташа\"\n_src = [9, 1, 5, 3]\ntrimmed_mean(_src, 1)\nassert _src == [9, 1, 5, 3], \"Бастапқы тізімді өзгертпеңіз: sorted() қолданыңыз\""
   }
  }
 ],
 "st-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ауқымды есептеу",
   "prompt": "<p><code>value_range(xs)</code> функциясы ауқымды (<code>max − min</code>) қайтарсын. Мысалы, Шымкенттегі бір апталық күндізгі температура <code>[31, 35, 29, 38]</code> → <code>9</code>.</p>",
   "starter": "def value_range(xs):\n    pass\n",
   "solution": "def value_range(xs):\n    return max(xs) - min(xs)\n",
   "hints": [
    "<code>max(xs) - min(xs)</code>"
   ],
   "check": {
    "tests": "assert value_range([31, 35, 29, 38]) == 9, \"value_range([31, 35, 29, 38]) 9 болуы керек\"\nassert value_range([5, 5]) == 0, \"Бірдей мәндердің ауқымы 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Популяция дисперсиясы",
   "prompt": "<p><code>pop_var(xs)</code> функциясын <code>statistics</code>-сіз жазыңыз: популяция дисперсиясы, яғни ауытқулар квадраттарының қосындысы <code>n</code>-ге бөлінеді. Мысалы, <code>pop_var([2, 4, 6, 8])</code> → <code>5.0</code>.</p>",
   "starter": "def pop_var(xs):\n    pass\n",
   "solution": "def pop_var(xs):\n    m = sum(xs) / len(xs)\n    return sum((x - m) ** 2 for x in xs) / len(xs)\n",
   "hints": [
    "Алдымен орташа <code>m</code>.",
    "<code>sum((x - m) ** 2 for x in xs) / len(xs)</code>"
   ],
   "check": {
    "tests": "import statistics as _st\nassert abs(pop_var([2, 4, 6, 8]) - 5) < 1e-9, \"pop_var([2, 4, 6, 8]) 5 болуы керек: n-ге бөліңіз\"\nfor _xs in ([1, 2, 3, 10], [7, 7, 7]):\n    assert abs(pop_var(_xs) - _st.pvariance(_xs)) < 1e-9, f\"pop_var({_xs}) {_st.pvariance(_xs):.4f} болуы керек\"",
    "mustInclude": [
     "def pop_var"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Екі формуланың SD-і",
   "prompt": "<p><code>two_std(xs)</code> функциясы <code>(таңдама SD, популяция SD)</code> жұбын қайтарсын: <code>statistics.stdev</code> және <code>statistics.pstdev</code>. Мысалы, <code>two_std([2, 4, 6, 8])</code> → шамамен <code>(2.58, 2.24)</code>.</p>",
   "starter": "import statistics\n\ndef two_std(xs):\n    pass\n",
   "solution": "import statistics\n\ndef two_std(xs):\n    return (statistics.stdev(xs), statistics.pstdev(xs))\n",
   "hints": [
    "<code>(statistics.stdev(xs), statistics.pstdev(xs))</code>"
   ],
   "check": {
    "tests": "import statistics as _st\n_r = two_std([2, 4, 6, 8])\nassert isinstance(_r, tuple) and len(_r) == 2, \"Екі мәнді кортеж қайтарыңыз\"\nassert abs(_r[0] - _st.stdev([2, 4, 6, 8])) < 1e-9, \"Бірінші мән таңдама SD (stdev) болуы керек\"\nassert abs(_r[1] - _st.pstdev([2, 4, 6, 8])) < 1e-9, \"Екінші мән популяция SD (pstdev) болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тұрақты дүкенді табу",
   "prompt": "<p>Екі дүкеннің күндік сатылымы берілген. <code>steadier(a, b)</code> функциясы таңдама SD-і кіші дүкенді: <code>\"A\"</code> немесе <code>\"B\"</code> қайтарсын (тең болса <code>\"A\"</code>). Мысалы, <code>steadier([95, 100, 105], [20, 100, 180])</code> → <code>\"A\"</code>.</p>",
   "starter": "import statistics\n\ndef steadier(a, b):\n    pass\n",
   "solution": "import statistics\n\ndef steadier(a, b):\n    return \"A\" if statistics.stdev(a) <= statistics.stdev(b) else \"B\"\n",
   "hints": [
    "<code>statistics.stdev(a)</code> мен <code>statistics.stdev(b)</code>-ны салыстырыңыз."
   ],
   "check": {
    "tests": "assert steadier([95, 100, 105], [20, 100, 180]) == \"A\", \"Бірінші дүкен тұрақтырақ: A\"\nassert steadier([10, 50, 90], [48, 50, 52]) == \"B\", \"Екінші дүкен тұрақтырақ: B\"\nassert steadier([1, 2, 3], [11, 12, 13]) == \"A\", \"SD тең болса, A\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташадан ауытқулар",
   "prompt": "<p><code>deviations(xs)</code> функциясы әр мәннің орташадан ауытқуының (<code>x − орташа</code>) тізімін қайтарсын. Мысалы, <code>deviations([2, 4, 6, 8])</code> → <code>[-3.0, -1.0, 1.0, 3.0]</code>. Байқаңыз: қосындысы әрқашан 0.</p>",
   "starter": "def deviations(xs):\n    pass\n",
   "solution": "def deviations(xs):\n    m = sum(xs) / len(xs)\n    return [x - m for x in xs]\n",
   "hints": [
    "<code>[x - m for x in xs]</code>"
   ],
   "check": {
    "tests": "assert deviations([2, 4, 6, 8]) == [-3, -1, 1, 3], \"deviations([2, 4, 6, 8]) [-3.0, -1.0, 1.0, 3.0] болуы керек\"\n_r = deviations([10, 20, 60])\nassert isinstance(_r, list) and len(_r) == 3, \"Әр мәнге бір ауытқу\"\nassert abs(sum(_r)) < 1e-9, \"Ауытқулардың қосындысы 0 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір SD-ден алыс күндер",
   "prompt": "<p><code>far_days(sales)</code> функциясы орташадан бір таңдама SD-ден <b>артық</b> алыстаған мәндердің санын қайтарсын (<code>abs(x − орташа) &gt; SD</code>). <code>statistics</code> қолдануға болады. Мысалы, <code>far_days([10, 12, 11, 30, 9])</code> → <code>1</code>.</p>",
   "starter": "import statistics\n\ndef far_days(sales):\n    pass\n",
   "solution": "import statistics\n\ndef far_days(sales):\n    m = statistics.mean(sales)\n    sd = statistics.stdev(sales)\n    return sum(1 for x in sales if abs(x - m) > sd)\n",
   "hints": [
    "<code>abs(x - m) &gt; sd</code> шартына сай мәндерді санаңыз."
   ],
   "check": {
    "tests": "assert far_days([10, 12, 11, 30, 9]) == 1, \"far_days([10, 12, 11, 30, 9]) 1 болуы керек\"\nassert far_days([2, 4, 6, 8]) == 2, \"far_days([2, 4, 6, 8]) 2 болуы керек: 2 мен 8\"\nassert far_days([5, 5, 6, 6]) == 0, \"far_days([5, 5, 6, 6]) 0 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қала бойынша SD",
   "prompt": "<p><code>std_by_city(rows)</code> функциясы <code>(қала, сома)</code> жұптарын алып, <code>{қала: таңдама SD, 1 ондық белгіге дейін round}</code> сөздігін қайтарсын. Бір ғана мәні бар қаланы қоспаңыз (таңдама SD-ді есептеу мүмкін емес). Мысалы, <code>[(\"Алматы\", 2), (\"Алматы\", 4), (\"Ақтау\", 9)]</code> → <code>{\"Алматы\": 1.4}</code>.</p>",
   "starter": "import statistics\n\ndef std_by_city(rows):\n    pass\n",
   "solution": "import statistics\n\ndef std_by_city(rows):\n    groups = {}\n    for city, v in rows:\n        groups.setdefault(city, []).append(v)\n    return {c: round(statistics.stdev(v), 1) for c, v in groups.items() if len(v) >= 2}\n",
   "hints": [
    "Алдымен қала бойынша тізімдерге жинаңыз.",
    "<code>if len(v) &gt;= 2</code> шартын қосыңыз."
   ],
   "check": {
    "tests": "_rows = [(\"Алматы\", 2), (\"Ақтау\", 9), (\"Алматы\", 4), (\"Алматы\", 6), (\"Астана\", 10), (\"Астана\", 20)]\n_r = std_by_city(_rows)\nassert _r == {\"Алматы\": 2.0, \"Астана\": 7.1}, f\"{{'Алматы': 2.0, 'Астана': 7.1}} күтілді, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең тұрақты апта",
   "prompt": "<p><code>steadiest_week(daily)</code> функциясы күндік сатылым тізімін 7 күндік апталарға бөліп (ұзындығы 7-ге еселі), таңдама SD-і ең кіші аптаның нөмірін (0-ден бастап) қайтарсын. Тең болса, ертерек аптаны алыңыз.</p>",
   "starter": "import statistics\n\ndef steadiest_week(daily):\n    pass\n",
   "solution": "import statistics\n\ndef steadiest_week(daily):\n    best, best_sd = 0, None\n    for i in range(len(daily) // 7):\n        sd = statistics.stdev(daily[i * 7:(i + 1) * 7])\n        if best_sd is None or sd < best_sd:\n            best, best_sd = i, sd\n    return best\n",
   "hints": [
    "Апта <code>i</code>: <code>daily[i * 7:(i + 1) * 7]</code>.",
    "Ең кіші SD-ді және оның нөмірін бірге сақтаңыз."
   ],
   "check": {
    "tests": "_d = [10, 30, 15, 40, 12, 35, 20] + [20, 21, 19, 22, 20, 21, 20] + [5, 50, 5, 50, 5, 50, 5]\nassert steadiest_week(_d) == 1, \"Екінші апта (нөмірі 1) ең тұрақты\"\nassert steadiest_week([1, 2, 3, 4, 5, 6, 7] * 2) == 0, \"Тең болса, ертерек апта: 0\"\nassert steadiest_week([5, 5, 5, 5, 5, 5, 6] + [1, 9, 1, 9, 1, 9, 1]) == 0, \"Бұл жерде 0-апта тұрақты\""
   }
  }
 ],
 "st-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "IQR табу",
   "prompt": "<p><code>iqr(xs)</code> функциясы <code>statistics.quantiles(xs, n=4)</code> арқылы IQR-ды (<code>Q3 − Q1</code>) қайтарсын.</p>",
   "starter": "import statistics\n\ndef iqr(xs):\n    pass\n",
   "solution": "import statistics\n\ndef iqr(xs):\n    q1, _, q3 = statistics.quantiles(xs, n=4)\n    return q3 - q1\n",
   "hints": [
    "<code>q1, _, q3 = statistics.quantiles(xs, n=4)</code>"
   ],
   "check": {
    "tests": "import statistics as _st\nfor _xs in ([12, 14, 15, 15, 16, 17, 18, 19, 21, 48], [1, 2, 3, 4, 5, 6, 7, 8]):\n    _q = _st.quantiles(_xs, n=4)\n    assert abs(iqr(_xs) - (_q[2] - _q[0])) < 1e-9, f\"iqr({_xs}) {_q[2] - _q[0]} болуы керек\"",
    "mustInclude": [
     "quantiles"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Tukey шекаралары",
   "prompt": "<p><code>fences(xs)</code> функциясы <code>(low, high)</code> жұбын қайтарсын: <code>low = Q1 − 1.5 × IQR</code>, <code>high = Q3 + 1.5 × IQR</code>. Квартильдер: <code>statistics.quantiles(xs, n=4)</code>.</p>",
   "starter": "import statistics\n\ndef fences(xs):\n    pass\n",
   "solution": "import statistics\n\ndef fences(xs):\n    q1, _, q3 = statistics.quantiles(xs, n=4)\n    iqr = q3 - q1\n    return (q1 - 1.5 * iqr, q3 + 1.5 * iqr)\n",
   "hints": [
    "Алдымен <code>iqr = q3 - q1</code>."
   ],
   "check": {
    "tests": "_r = fences([12, 14, 15, 15, 16, 17, 18, 19, 21, 48])\nassert isinstance(_r, tuple) and len(_r) == 2, \"(low, high) кортежін қайтарыңыз\"\nassert abs(_r[0] - 7.625) < 1e-9 and abs(_r[1] - 26.625) < 1e-9, f\"Сабақтағы мысалда (7.625, 26.625) болуы керек, сізде {_r}\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Жоғарғы шекарадан асқандар",
   "prompt": "<p><code>high_outliers(xs)</code> функциясы тек жоғарғы шекарадан (<code>Q3 + 1.5 × IQR</code>) үлкен мәндерді бастапқы ретімен қайтарсын. Мысалы, апталық тапсырыстар <code>[12, 14, 15, 15, 16, 17, 18, 19, 21, 48]</code> → <code>[48]</code>.</p>",
   "starter": "import statistics\n\ndef high_outliers(xs):\n    pass\n",
   "solution": "import statistics\n\ndef high_outliers(xs):\n    q1, _, q3 = statistics.quantiles(xs, n=4)\n    high = q3 + 1.5 * (q3 - q1)\n    return [x for x in xs if x > high]\n",
   "hints": [
    "<code>high = q3 + 1.5 * (q3 - q1)</code>"
   ],
   "check": {
    "tests": "assert high_outliers([12, 14, 15, 15, 16, 17, 18, 19, 21, 48]) == [48], \"Бұл тізімде [48]\"\nassert high_outliers([-50, 10, 11, 12, 13, 14]) == [], \"Төменгі шеткі мән бұл тізімге кірмейді\"\nassert high_outliers([90, 10, 11, 12, 13, 14, 12, 11, 13, 95]) == [90, 95], \"Бастапқы ретімен: [90, 95]\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шеткі мәнсіз тізім",
   "prompt": "<p><code>drop_outliers(xs)</code> функциясы Tukey ережесі бойынша шеткі мәндерді алып тастап, қалғанын бастапқы ретімен қайтарсын. Мысалы, <code>[10, 12, 11, 13, 12, 95, 11, 10, 12]</code> → <code>[10, 12, 11, 13, 12, 11, 10, 12]</code>.</p>",
   "starter": "import statistics\n\ndef drop_outliers(xs):\n    pass\n",
   "solution": "import statistics\n\ndef drop_outliers(xs):\n    q1, _, q3 = statistics.quantiles(xs, n=4)\n    iqr = q3 - q1\n    low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\n    return [x for x in xs if low <= x <= high]\n",
   "hints": [
    "<code>low &lt;= x &lt;= high</code> шартына сай мәндерді қалдырыңыз."
   ],
   "check": {
    "tests": "assert drop_outliers([10, 12, 11, 13, 12, 95, 11, 10, 12]) == [10, 12, 11, 13, 12, 11, 10, 12], \"95 алынып, қалғаны ретімен қалуы керек\"\nassert drop_outliers([-40, 20, 21, 22, 23, 24, 25, 90]) == [20, 21, 22, 23, 24, 25], \"Екі жақтағы шеткі мән де алынады\"\nassert drop_outliers([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5], \"Шеткі мән жоқ болса, тізім өзгермейді\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "90-перцентильден жоғары",
   "prompt": "<p><code>above_p90(xs)</code> функциясы 90-перцентильден үлкен мәндерді бастапқы ретімен қайтарсын. 90-перцентиль — <code>statistics.quantiles(xs, n=10)</code> тізімінің соңғы элементі.</p>",
   "starter": "import statistics\n\ndef above_p90(xs):\n    pass\n",
   "solution": "import statistics\n\ndef above_p90(xs):\n    p90 = statistics.quantiles(xs, n=10)[-1]\n    return [x for x in xs if x > p90]\n",
   "hints": [
    "<code>statistics.quantiles(xs, n=10)[-1]</code> — 90-перцентиль."
   ],
   "check": {
    "tests": "import statistics as _st\n_xs = [5, 12, 8, 30, 7, 9, 11, 6, 10, 25, 13, 14, 4, 15, 16, 18, 17, 20, 19, 3]\n_p = _st.quantiles(_xs, n=10)[-1]\n_exp = [x for x in _xs if x > _p]\nassert above_p90(_xs) == _exp, f\"{_exp} күтілді, сізде {above_p90(_xs)}\"\nassert above_p90(list(range(1, 11))) == [10], \"1…10 тізімінде тек [10]\"",
    "mustInclude": [
     "quantiles"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шеткі мәндер үлесі",
   "prompt": "<p><code>outlier_share(xs)</code> функциясы Tukey ережесі бойынша шеткі мәндердің үлесін пайызбен қайтарсын (1 ондық белгіге дейін <code>round</code>). Мысалы, <code>[12, 14, 15, 15, 16, 17, 18, 19, 21, 48]</code> → <code>10.0</code>.</p>",
   "starter": "import statistics\n\ndef outlier_share(xs):\n    pass\n",
   "solution": "import statistics\n\ndef outlier_share(xs):\n    q1, _, q3 = statistics.quantiles(xs, n=4)\n    iqr = q3 - q1\n    low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\n    n = sum(1 for x in xs if x < low or x > high)\n    return round(n * 100 / len(xs), 1)\n",
   "hints": [
    "Шеткі мәндерді санап, <code>len(xs)</code>-ке бөліңіз, 100-ге көбейтіңіз."
   ],
   "check": {
    "tests": "assert outlier_share([12, 14, 15, 15, 16, 17, 18, 19, 21, 48]) == 10.0, \"10 мәннің 1-і шеткі: 10.0\"\nassert outlier_share([-40, 20, 21, 22, 23, 24, 25, 90]) == 25.0, \"8 мәннің 2-і шеткі: 25.0\"\nassert outlier_share([1, 2, 3, 4, 5, 6]) == 0.0, \"Шеткі мән жоқ: 0.0\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Бес сандық қорытынды",
   "prompt": "<p>Box plot-тың бес саны. <code>five_numbers(xs)</code> функциясы <code>min</code>, <code>q1</code>, <code>median</code>, <code>q3</code>, <code>max</code> кілттері бар сөздік қайтарсын. Квартильдер <code>statistics.quantiles(xs, n=4)</code>-тен, медиана — оның ортаңғы мәні.</p>",
   "starter": "import statistics\n\ndef five_numbers(xs):\n    pass\n",
   "solution": "import statistics\n\ndef five_numbers(xs):\n    q1, q2, q3 = statistics.quantiles(xs, n=4)\n    return {\"min\": min(xs), \"q1\": q1, \"median\": q2, \"q3\": q3, \"max\": max(xs)}\n",
   "hints": [
    "<code>q1, q2, q3 = statistics.quantiles(xs, n=4)</code>"
   ],
   "check": {
    "tests": "import statistics as _st\n_xs = [3200, 1500, 2100, 2800, 1900, 2500, 9000, 2300]\n_d = five_numbers(_xs)\nassert isinstance(_d, dict), \"Сөздік қайтарыңыз\"\n_q = _st.quantiles(_xs, n=4)\n_exp = {\"min\": 1500, \"q1\": _q[0], \"median\": _q[1], \"q3\": _q[2], \"max\": 9000}\nfor _k, _v in _exp.items():\n    assert _k in _d, f\"{_k} кілті жоқ\"\n    assert abs(_d[_k] - _v) < 1e-9, f\"{_k} дұрыс емес: {_v} күтілді\"",
    "mustInclude": [
     "quantiles"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Әр мәнге белгі қою",
   "prompt": "<p><code>flag_values(xs)</code> функциясы әр мән үшін белгі тізімін қайтарсын: төменгі шекарадан кіші → <code>\"төмен\"</code>, жоғарғы шекарадан үлкен → <code>\"жоғары\"</code>, әйтпесе <code>\"ok\"</code> (Tukey ережесі). Мысалы, <code>[-40, 20, 21, 22, 23, 24, 25, 90]</code> → <code>[\"төмен\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"жоғары\"]</code>.</p>",
   "starter": "import statistics\n\ndef flag_values(xs):\n    pass\n",
   "solution": "import statistics\n\ndef flag_values(xs):\n    q1, _, q3 = statistics.quantiles(xs, n=4)\n    iqr = q3 - q1\n    low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\n    out = []\n    for x in xs:\n        if x < low:\n            out.append(\"төмен\")\n        elif x > high:\n            out.append(\"жоғары\")\n        else:\n            out.append(\"ok\")\n    return out\n",
   "hints": [
    "Шекараларды бір рет есептеп, сосын әр мәнді <code>if / elif / else</code> арқылы тексеріңіз."
   ],
   "check": {
    "tests": "assert flag_values([-40, 20, 21, 22, 23, 24, 25, 90]) == [\"төмен\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"ok\", \"жоғары\"], f\"Белгілер дұрыс емес: {flag_values([-40, 20, 21, 22, 23, 24, 25, 90])}\"\nassert flag_values([5, 6, 7, 8]) == [\"ok\"] * 4, \"Шеткі мән жоқ: бәрі ok\""
   }
  }
 ],
 "st-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір мәннің z-score-ы",
   "prompt": "<p><code>z(x, mean, sd)</code> функциясы z-score-ды қайтарсын. Мысалы, математикадан 85 ұпай, орташа 70, SD 10 → <code>z(85, 70, 10)</code> = <code>1.5</code>.</p>",
   "starter": "def z(x, mean, sd):\n    pass\n",
   "solution": "def z(x, mean, sd):\n    return (x - mean) / sd\n",
   "hints": [
    "<code>(x - mean) / sd</code>"
   ],
   "check": {
    "tests": "assert z(85, 70, 10) == 1.5, \"z(85, 70, 10) 1.5 болуы керек\"\nassert abs(z(12.4, 13.0, 0.4) + 1.5) < 1e-9, \"z(12.4, 13.0, 0.4) -1.5 болуы керек\"\nassert z(70, 70, 10) == 0, \"Орташаға тең мәннің z-score-ы 0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "z-score-тан мәнге қайту",
   "prompt": "<p>Кері есеп: <code>from_z(zv, mean, sd)</code> функциясы z-score бойынша бастапқы мәнді қайтарсын (<code>mean + zv × sd</code>). Мысалы, бой орташасы 165 см, SD 6: <code>from_z(2, 165, 6)</code> → <code>177</code>.</p>",
   "starter": "def from_z(zv, mean, sd):\n    pass\n",
   "solution": "def from_z(zv, mean, sd):\n    return mean + zv * sd\n",
   "hints": [
    "<code>mean + zv * sd</code>"
   ],
   "check": {
    "tests": "assert from_z(2, 165, 6) == 177, \"from_z(2, 165, 6) 177 болуы керек\"\nassert from_z(-1, 100, 15) == 85, \"from_z(-1, 100, 15) 85 болуы керек\"\nassert from_z(0, 50, 7) == 50, \"z = 0 болса, орташа\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Популяция z-score-тары",
   "prompt": "<p><code>zscores_p(xs)</code> функциясы z-score тізімін қайтарсын, бірақ SD үшін <code>statistics.pstdev</code> (популяция) қолданылсын. Мысалы, <code>zscores_p([2, 4, 6, 8])</code> → шамамен <code>[-1.34, -0.45, 0.45, 1.34]</code>.</p>",
   "starter": "import statistics\n\ndef zscores_p(xs):\n    pass\n",
   "solution": "import statistics\n\ndef zscores_p(xs):\n    m = statistics.mean(xs)\n    sd = statistics.pstdev(xs)\n    return [(x - m) / sd for x in xs]\n",
   "hints": [
    "<code>sd = statistics.pstdev(xs)</code>"
   ],
   "check": {
    "tests": "import statistics as _st\n_r = zscores_p([2, 4, 6, 8])\nassert isinstance(_r, list) and len(_r) == 4, \"4 мәнді тізім қайтарыңыз\"\n_sd = _st.pstdev([2, 4, 6, 8])\nassert all(abs(a - (x - 5) / _sd) < 1e-9 for a, x in zip(_r, [2, 4, 6, 8])), \"pstdev қолданыңыз: stdev емес\"",
    "mustInclude": [
     "pstdev"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең ерекше мән",
   "prompt": "<p><code>most_unusual(xs)</code> функциясы z-score-ының абсолют мәні ең үлкен мәнді қайтарсын (SD: <code>statistics.stdev</code>). Мысалы, <code>most_unusual([100, 102, 98, 60, 101])</code> → <code>60</code>.</p>",
   "starter": "import statistics\n\ndef most_unusual(xs):\n    pass\n",
   "solution": "import statistics\n\ndef most_unusual(xs):\n    m = statistics.mean(xs)\n    sd = statistics.stdev(xs)\n    return max(xs, key=lambda x: abs((x - m) / sd))\n",
   "hints": [
    "<code>max(xs, key=lambda x: abs((x - m) / sd))</code>"
   ],
   "check": {
    "tests": "assert most_unusual([100, 102, 98, 60, 101]) == 60, \"most_unusual([100, 102, 98, 60, 101]) 60 болуы керек\"\nassert most_unusual([5, 6, 7, 30]) == 30, \"most_unusual([5, 6, 7, 30]) 30 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қай нәтиже күштірек",
   "prompt": "<p>Оқушы ҰБТ-да математикадан <code>x1</code>, тарихтан <code>x2</code> ұпай алды. <code>stronger(x1, xs1, x2, xs2)</code> функциясы әр мәннің өз сыныбындағы (<code>xs1</code>, <code>xs2</code>) z-score-ын салыстырып, <code>\"математика\"</code> немесе <code>\"тарих\"</code> қайтарсын (тең болса <code>\"математика\"</code>). SD: <code>statistics.stdev</code>.</p>",
   "starter": "import statistics\n\ndef stronger(x1, xs1, x2, xs2):\n    pass\n",
   "solution": "import statistics\n\ndef stronger(x1, xs1, x2, xs2):\n    z1 = (x1 - statistics.mean(xs1)) / statistics.stdev(xs1)\n    z2 = (x2 - statistics.mean(xs2)) / statistics.stdev(xs2)\n    return \"математика\" if z1 >= z2 else \"тарих\"\n",
   "hints": [
    "Әр пәннің z-score-ын өз тобының орташасы мен SD-імен есептеңіз."
   ],
   "check": {
    "tests": "assert stronger(30, [20, 25, 30], 18, [10, 14, 18]) == \"математика\", \"z тең болса, математика\"\nassert stronger(35, [30, 32, 34, 36], 19, [10, 12, 14, 16]) == \"тарих\", \"Тарихтағы нәтиже өз тобында күштірек\"\nassert stronger(38, [20, 25, 30], 17, [15, 16, 17]) == \"математика\", \"Математикадағы z үлкен\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташадан жоғары оқушылар",
   "prompt": "<p><code>top_students(names, scores, k)</code> функциясы z-score-ы <code>k</code>-дан үлкен оқушылардың аттарын бастапқы ретімен қайтарсын (SD: <code>statistics.stdev</code>). Мысалы, <code>top_students([\"Ата\", \"Бек\", \"Сая\"], [60, 70, 95], 0.5)</code> → <code>[\"Сая\"]</code>.</p>",
   "starter": "import statistics\n\ndef top_students(names, scores, k):\n    pass\n",
   "solution": "import statistics\n\ndef top_students(names, scores, k):\n    m = statistics.mean(scores)\n    sd = statistics.stdev(scores)\n    return [n for n, s in zip(names, scores) if (s - m) / sd > k]\n",
   "hints": [
    "<code>zip(names, scores)</code> арқылы атты ұпаймен бірге айналыңыз."
   ],
   "check": {
    "tests": "assert top_students([\"Ата\", \"Бек\", \"Сая\"], [60, 70, 95], 0.5) == [\"Сая\"], \"Тек Сая: z ≈ 1.1\"\n_n = [\"Әли\", \"Дана\", \"Ерік\", \"Жан\", \"Мира\"]\n_s = [50, 80, 85, 60, 90]\nassert top_students(_n, _s, 0) == [\"Дана\", \"Ерік\", \"Мира\"], \"k = 0: орташадан жоғарылар Дана, Ерік, Мира\"\nassert top_students(_n, _s, 2) == [], \"k = 2 болса, ешкім жоқ\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "z-score бойынша тазалау",
   "prompt": "<p><code>clean_by_z(xs, limit)</code> функциясы <code>|z| &gt; limit</code> болатын мәндерді алып тастап, қалғанын бастапқы ретімен қайтарсын, және алынған мәндердің санын қосып, <code>(таза_тізім, алынғандар_саны)</code> жұбын қайтарсын. SD: <code>statistics.stdev</code>.</p>",
   "starter": "import statistics\n\ndef clean_by_z(xs, limit):\n    pass\n",
   "solution": "import statistics\n\ndef clean_by_z(xs, limit):\n    m = statistics.mean(xs)\n    sd = statistics.stdev(xs)\n    kept = [x for x in xs if abs((x - m) / sd) <= limit]\n    return (kept, len(xs) - len(kept))\n",
   "hints": [
    "Алдымен сақталатын мәндер тізімі, сосын <code>len(xs) - len(kept)</code>."
   ],
   "check": {
    "tests": "_xs = [102, 98, 105, 97, 101, 99, 160, 103, 100, 96]\nassert clean_by_z(_xs, 2) == ([102, 98, 105, 97, 101, 99, 103, 100, 96], 1), f\"limit = 2: 160 алынады, сізде {clean_by_z(_xs, 2)}\"\nassert clean_by_z(_xs, 3) == (_xs, 0), \"limit = 3: ештеңе алынбайды\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Топ ішіндегі z-score",
   "prompt": "<p>Әр сыныптың өз орташасы бар. <code>z_in_group(rows)</code> функциясы <code>(сынып, ұпай)</code> жұптарын алып, әр жолдың <b>өз сыныбы</b> ішіндегі z-score-ын (SD: <code>statistics.stdev</code>, 2 ондық белгіге дейін <code>round</code>) бастапқы ретімен тізіммен қайтарсын.</p><p>Мысалы, <code>[(\"9А\", 60), (\"9Б\", 80), (\"9А\", 70), (\"9Б\", 90), (\"9А\", 80)]</code> → <code>[-1.0, -0.71, 0.0, 0.71, 1.0]</code>.</p>",
   "starter": "import statistics\n\ndef z_in_group(rows):\n    pass\n",
   "solution": "import statistics\n\ndef z_in_group(rows):\n    groups = {}\n    for g, v in rows:\n        groups.setdefault(g, []).append(v)\n    stats = {g: (statistics.mean(v), statistics.stdev(v)) for g, v in groups.items()}\n    return [round((v - stats[g][0]) / stats[g][1], 2) for g, v in rows]\n",
   "hints": [
    "Алдымен әр топтың мәндерін жинап, орташа мен SD-ді есептеңіз.",
    "Сосын <code>rows</code>-ты қайта айналып, әр жолға өз тобының көрсеткішін қолданыңыз."
   ],
   "check": {
    "tests": "_rows = [(\"9А\", 60), (\"9Б\", 80), (\"9А\", 70), (\"9Б\", 90), (\"9А\", 80)]\n_r = z_in_group(_rows)\nassert _r == [-1.0, -0.71, 0.0, 0.71, 1.0], f\"[-1.0, -0.71, 0.0, 0.71, 1.0] күтілді, сізде {_r}\""
   }
  }
 ],
 "st-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Ковариация қосындысы",
   "prompt": "<p><code>cov_sum(x, y)</code> функциясы ауытқулар көбейтінділерінің қосындысын қайтарсын: <code>Σ (a − mx)(b − my)</code>. Сабақтағы жарнама мысалында <code>cov_sum([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])</code> → <code>6.0</code>.</p>",
   "starter": "def cov_sum(x, y):\n    pass\n",
   "solution": "def cov_sum(x, y):\n    mx, my = sum(x) / len(x), sum(y) / len(y)\n    return sum((a - mx) * (b - my) for a, b in zip(x, y))\n",
   "hints": [
    "<code>zip(x, y)</code> арқылы жұптарды айналыңыз."
   ],
   "check": {
    "tests": "assert abs(cov_sum([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) - 6) < 1e-9, \"cov_sum([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) 6 болуы керек\"\nassert abs(cov_sum([1, 2, 3], [3, 2, 1]) + 2) < 1e-9, \"Теріс байланыста қосынды теріс: -2\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Дайын корреляция",
   "prompt": "<p><code>r2(x, y)</code> функциясы <code>statistics.correlation</code> нәтижесін 2 ондық белгіге дейін <code>round</code> жасап қайтарсын. Мысалы, <code>r2([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])</code> → <code>0.77</code>.</p>",
   "starter": "import statistics\n\ndef r2(x, y):\n    pass\n",
   "solution": "import statistics\n\ndef r2(x, y):\n    return round(statistics.correlation(x, y), 2)\n",
   "hints": [
    "<code>round(statistics.correlation(x, y), 2)</code>"
   ],
   "check": {
    "tests": "assert r2([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) == 0.77, \"r2([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) 0.77 болуы керек\"\nassert r2([1, 2, 3], [6, 4, 2]) == -1.0, \"Толық теріс байланыс: -1.0\""
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Байланыс бағыты",
   "prompt": "<p><code>direction(r)</code> функциясы корреляция коэффициенті бойынша мәтін қайтарсын: <code>r &gt;= 0.1</code> → <code>\"оң\"</code>, <code>r &lt;= -0.1</code> → <code>\"теріс\"</code>, әйтпесе <code>\"жоқ\"</code>.</p>",
   "starter": "def direction(r):\n    pass\n",
   "solution": "def direction(r):\n    if r >= 0.1:\n        return \"оң\"\n    if r <= -0.1:\n        return \"теріс\"\n    return \"жоқ\"\n",
   "hints": [
    "<code>if / if / return</code> үш тармақ жеткілікті."
   ],
   "check": {
    "tests": "assert direction(0.77) == \"оң\", \"direction(0.77) оң болуы керек\"\nassert direction(-0.5) == \"теріс\", \"direction(-0.5) теріс болуы керек\"\nassert direction(0.02) == \"жоқ\", \"direction(0.02) жоқ болуы керек\"\nassert direction(-0.1) == \"теріс\", \"Шекара: direction(-0.1) теріс\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "z-score арқылы корреляция",
   "prompt": "<p>Корреляцияны басқа жолмен де есептеуге болады: <code>r = Σ(zx × zy) / (n − 1)</code>, мұнда z-score-тар таңдама SD-мен (<code>statistics.stdev</code>) есептеледі. <code>r_from_z(x, y)</code> функциясын осы формуламен жазыңыз (<code>statistics.correlation</code>-сыз).</p>",
   "starter": "import statistics\n\ndef r_from_z(x, y):\n    pass\n",
   "solution": "import statistics\n\ndef r_from_z(x, y):\n    mx, sx = statistics.mean(x), statistics.stdev(x)\n    my, sy = statistics.mean(y), statistics.stdev(y)\n    return sum(((a - mx) / sx) * ((b - my) / sy) for a, b in zip(x, y)) / (len(x) - 1)\n",
   "hints": [
    "Алдымен екі тізімнің орташасы мен SD-і.",
    "Көбейтінділер қосындысын <code>len(x) - 1</code>-ге бөліңіз."
   ],
   "check": {
    "tests": "import statistics as _st\nfor _x, _y in (([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]), ([10, 20, 30, 40], [7, 3, 5, 1])):\n    assert abs(r_from_z(_x, _y) - _st.correlation(_x, _y)) < 1e-9, f\"r_from_z({_x}, {_y}) {_st.correlation(_x, _y):.4f} болуы керек: n − 1-ге бөлдіңіз бе?\"",
    "mustInclude": [
     "stdev"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Таңдама ковариациясы",
   "prompt": "<p><code>sample_cov(x, y)</code> функциясы таңдама ковариациясын қайтарсын: <code>Σ (a − mx)(b − my) / (n − 1)</code>. Мысалы, <code>sample_cov([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])</code> → <code>1.5</code>.</p>",
   "starter": "def sample_cov(x, y):\n    pass\n",
   "solution": "def sample_cov(x, y):\n    mx, my = sum(x) / len(x), sum(y) / len(y)\n    return sum((a - mx) * (b - my) for a, b in zip(x, y)) / (len(x) - 1)\n",
   "hints": [
    "Сабақтағы <code>cov</code>-ты <code>len(x) - 1</code>-ге бөліңіз."
   ],
   "check": {
    "tests": "assert abs(sample_cov([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) - 1.5) < 1e-9, \"sample_cov([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]) 1.5 болуы керек\"\nassert abs(sample_cov([2, 4], [10, 6]) + 4) < 1e-9, \"sample_cov([2, 4], [10, 6]) -4 болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Ең күшті байланыс",
   "prompt": "<p>Дүкеннің апталық сатылымы <code>sales</code> және бірнеше фактор <code>factors</code> (сөздік: атауы → мәндер тізімі) берілген. <code>strongest(factors, sales)</code> функциясы сатылыммен корреляциясының <b>абсолют мәні</b> ең үлкен фактордың атауын қайтарсын (<code>statistics.correlation</code> қолдануға болады).</p>",
   "starter": "import statistics\n\ndef strongest(factors, sales):\n    pass\n",
   "solution": "import statistics\n\ndef strongest(factors, sales):\n    return max(factors, key=lambda k: abs(statistics.correlation(factors[k], sales)))\n",
   "hints": [
    "<code>max(factors, key=lambda k: abs(...))</code>"
   ],
   "check": {
    "tests": "_sales = [100, 120, 90, 150, 130]\n_f = {\"жарнама\": [10, 12, 9, 15, 13], \"температура\": [20, 18, 25, 22, 19], \"аяз\": [30, 25, 35, 10, 20]}\nassert strongest(_f, _sales) == \"жарнама\", \"Бұл деректе жарнаманың байланысы ең күшті\"\n_f2 = {\"а\": [1, 2, 3, 4, 5], \"ә\": [9, 7, 8, 2, 1]}\nassert strongest(_f2, [5, 4, 4, 2, 1]) == \"ә\", \"Абсолют мәнді алыңыз: теріс байланыс та күшті болады\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Корреляция матрицасы",
   "prompt": "<p><code>corr_matrix(data)</code> функциясы сөздік-сөздік қайтарсын: <code>result[a][b]</code> — <code>data[a]</code> мен <code>data[b]</code> корреляциясы, 2 ондық белгіге дейін <code>round</code>. Диагональда <code>1.0</code>. <code>statistics.correlation</code> қолдануға болады.</p>",
   "starter": "import statistics\n\ndef corr_matrix(data):\n    pass\n",
   "solution": "import statistics\n\ndef corr_matrix(data):\n    return {a: {b: round(statistics.correlation(data[a], data[b]), 2) for b in data} for a in data}\n",
   "hints": [
    "Екі қабатты dict comprehension: <code>{a: {b: ... for b in data} for a in data}</code>."
   ],
   "check": {
    "tests": "_d = {\"x\": [1, 2, 3, 4], \"y\": [2, 4, 6, 8], \"w\": [4, 1, 3, 2]}\n_m = corr_matrix(_d)\nassert _m[\"x\"][\"x\"] == 1.0, \"Диагональда 1.0\"\nassert _m[\"x\"][\"y\"] == 1.0, \"x пен y толық байланысты: 1.0\"\nassert _m[\"x\"][\"w\"] == _m[\"w\"][\"x\"] == -0.4, f\"x мен w: -0.4 болуы керек, сізде {_m['x']['w']}\"\nassert set(_m) == {\"x\", \"y\", \"w\"} and all(set(_m[k]) == {\"x\", \"y\", \"w\"} for k in _m), \"Барлық жұп болуы керек\""
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Кешігіп әсер ету",
   "prompt": "<p>Жарнама бүгін жұмсалады, ал сатылым келесі аптада өседі. <code>lag_corr(x, y, k)</code> функциясы <code>x</code>-тің алғашқы мәндерін <code>y</code>-тің <code>k</code> қадам кейінгі мәндерімен салыстырып, корреляцияны 2 ондық белгіге дейін қайтарсын: <code>x[:len(x) - k]</code> мен <code>y[k:]</code>. <code>k = 0</code> болса, кәдімгі корреляция. Корреляцияны сабақтағы <code>pearson</code> формуласымен өзіңіз есептеңіз.</p>",
   "starter": "def lag_corr(x, y, k):\n    pass\n",
   "solution": "def lag_corr(x, y, k):\n    a, b = x[:len(x) - k], y[k:]\n    ma, mb = sum(a) / len(a), sum(b) / len(b)\n    cov = sum((p - ma) * (q - mb) for p, q in zip(a, b))\n    sa = sum((p - ma) ** 2 for p in a) ** 0.5\n    sb = sum((q - mb) ** 2 for q in b) ** 0.5\n    return round(cov / (sa * sb), 2)\n",
   "hints": [
    "Алдымен екі тізімді қиыңыз: <code>x[:len(x) - k]</code>, <code>y[k:]</code>.",
    "Сосын сабақтағы Пирсон формуласы."
   ],
   "check": {
    "tests": "import statistics as _st\n_ads = [5, 1, 4, 2, 6, 3]\n_sales = [50, 90, 30, 70, 40, 100]\nassert lag_corr(_ads, _sales, 1) == round(_st.correlation(_ads[:5], _sales[1:]), 2), \"k = 1 үшін x[:5] мен y[1:] корреляциясы\"\nassert lag_corr(_ads, _sales, 1) > 0.9, \"Бір апта кешігумен байланыс күшті болуы керек\"\nassert lag_corr([1, 2, 3], [3, 2, 1], 0) == -1.0, \"k = 0: кәдімгі корреляция\""
   }
  }
 ],
 "st-9": [
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Компания бойынша жиынтық",
   "prompt": "<p>Барлық қызметкерлер бойынша бір жолда шығарыңыз: <code>n</code> (саны), <code>avg_salary</code>, <code>min_salary</code>, <code>max_salary</code>.</p>",
   "starter": "",
   "solution": "SELECT COUNT(*) AS n, AVG(salary) AS avg_salary, MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees;",
   "hints": [
    "Бұл жолы <code>GROUP BY</code> керек емес: барлық жол бір топ."
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Бөлім бойынша ауқым",
   "prompt": "<p>Әр бөлім үшін <code>department</code> және жалақы ауқымын <code>salary_range</code> (<code>MAX − MIN</code>) шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT department, MAX(salary) - MIN(salary) AS salary_range FROM employees GROUP BY department;",
   "hints": [
    "<code>MAX(salary) - MIN(salary)</code>"
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "easy",
   "xp": 10,
   "title": "Бөлімдердің көлемі",
   "prompt": "<p>Әр бөлімдегі қызметкерлер санын шығарыңыз: <code>department</code>, <code>n</code>. Саны бойынша кему ретімен, тең болса бөлім атауы бойынша.</p>",
   "starter": "",
   "solution": "SELECT department, COUNT(*) AS n FROM employees GROUP BY department ORDER BY n DESC, department;",
   "hints": [
    "<code>ORDER BY n DESC, department</code>"
   ],
   "check": {
    "ordered": true
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Аналитика медианасы",
   "prompt": "<p><code>Аналитика</code> бөлімі жалақысының медианасын <code>median_salary</code> бір мәнмен шығарыңыз. Бөлімде 4 адам бар: сұрыпталған тізімдегі 2- және 3-мәндердің орташасы.</p>",
   "starter": "SELECT AVG(salary) AS median_salary FROM (\n  \n);",
   "solution": "SELECT AVG(salary) AS median_salary FROM (SELECT salary FROM employees WHERE department = 'Аналитика' ORDER BY salary LIMIT 2 OFFSET 1);",
   "hints": [
    "Ішкі сұрауда <code>WHERE department = 'Аналитика'</code> және <code>ORDER BY salary LIMIT 2 OFFSET 1</code>."
   ],
   "check": {
    "mustInclude": [
     "OFFSET"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Компанияның дисперсиясы",
   "prompt": "<p>Барлық қызметкерлер жалақысының популяция дисперсиясын <code>var</code> бір мәнмен шығарыңыз (<code>AVG(x*x) − AVG(x)*AVG(x)</code>).</p>",
   "starter": "",
   "solution": "SELECT AVG(salary * salary) - AVG(salary) * AVG(salary) AS var FROM employees;",
   "hints": [
    "Сабақтағы формула, бірақ <code>GROUP BY</code>-сыз."
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "medium",
   "xp": 15,
   "title": "Орташадан жоғары бөлімдер",
   "prompt": "<p>Орташа жалақысы бүкіл компанияның орташасынан жоғары бөлімдерді шығарыңыз: <code>department</code>, <code>avg_salary</code>.</p>",
   "starter": "",
   "solution": "SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) > (SELECT AVG(salary) FROM employees);",
   "hints": [
    "Топқа шарт: <code>HAVING AVG(salary) &gt; (SELECT AVG(salary) FROM employees)</code>"
   ],
   "check": {
    "mustInclude": [
     "HAVING"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "hard",
   "xp": 20,
   "title": "Бөлім орташасынан ауытқу",
   "prompt": "<p>Әр қызметкер үшін <code>name</code>, <code>department</code>, <code>salary</code> және <code>diff</code> шығарыңыз: жалақысы өз бөлімінің орташасынан қаншаға ерекшеленеді (<code>salary − бөлім орташасы</code>).</p>",
   "starter": "",
   "solution": "SELECT name, department, salary, salary - AVG(salary) OVER (PARTITION BY department) AS diff FROM employees;",
   "hints": [
    "Window function: <code>AVG(salary) OVER (PARTITION BY department)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "staff",
   "level": "hard",
   "xp": 20,
   "title": "Орташа мен медиана қатар",
   "prompt": "<p>Бір жолда екі мән шығарыңыз: <code>avg_salary</code> (компанияның орташа жалақысы) және <code>median_salary</code> (медианасы, 12 қызметкер). Қайсысы үлкен және неге?</p>",
   "starter": "",
   "solution": "SELECT (SELECT AVG(salary) FROM employees) AS avg_salary, (SELECT AVG(salary) FROM (SELECT salary FROM employees ORDER BY salary LIMIT 2 OFFSET 5)) AS median_salary;",
   "hints": [
    "Әр мәнді бөлек ішкі сұрау ретінде <code>SELECT</code>-ке жазыңыз.",
    "Медиана: <code>ORDER BY salary LIMIT 2 OFFSET 5</code>."
   ]
  }
 ]
});
