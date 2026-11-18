// Practice tasks after the lessons of m4-2. Each lesson's list opens one task at a time.
DJ.addPractice('m4-2', {
 "ab-1": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Таңдамалар орташасы",
   "prompt": "<p><code>sample_means(samples)</code> функциясын жазыңыз: <code>samples</code> — таңдамалар тізімі (әрқайсысы сандар тізімі). Әр таңдаманың орташасынан тұратын тізімді қайтарсын.</p><p>Мысалы, <code>sample_means([[1, 3], [10, 20, 30]])</code> → <code>[2, 20]</code>.</p>",
   "starter": "import statistics\n\ndef sample_means(samples):\n    pass\n",
   "solution": "import statistics\n\ndef sample_means(samples):\n    return [statistics.mean(s) for s in samples]\n",
   "hints": [
    "<code>[statistics.mean(s) for s in samples]</code>"
   ],
   "check": {
    "tests": "assert sample_means([[1, 3], [10, 20, 30]]) == [2, 20], \"sample_means([[1, 3], [10, 20, 30]]) = [2, 20]\"\nassert sample_means([[5]]) == [5], \"Бір мәнді таңдаманың орташасы — сол мән\"\nassert sample_means([]) == [], \"Таңдама жоқ болса, бос тізім\"",
    "mustInclude": [
     "def sample_means"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Кездейсоқ таңдама",
   "prompt": "<p><code>draw(pop, n)</code> функциясын жазыңыз: популяциядан <code>random.choice</code> арқылы (қайталаумен) <code>n</code> элемент алып, тізім қайтарсын. Функция ішінде seed қоймаңыз.</p><p>Мысалы, <code>draw([1200, 3500, 800], 5)</code> → <code>[800, 1200, 1200, 3500, 800]</code> сияқты тізім.</p>",
   "starter": "import random\n\ndef draw(pop, n):\n    pass\n",
   "solution": "import random\n\ndef draw(pop, n):\n    return [random.choice(pop) for _ in range(n)]\n",
   "hints": [
    "<code>[random.choice(pop) for _ in range(n)]</code>"
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(1)\n_pop = [1200, 3500, 800, 15000]\n_s = draw(_pop, 30)\nassert isinstance(_s, list) and len(_s) == 30, \"Ұзындығы n = 30 тізім қайтарыңыз\"\nassert all(_x in _pop for _x in _s), \"Барлық элемент популяциядан алынуы керек\"\nassert draw(_pop, 0) == [], \"n = 0 болса, бос тізім\"\n_r.seed(2)\n_big = draw([0, 1], 20000)\nassert abs(sum(_big) / 20000 - 0.5) < 0.02, \"Әр элемент бірдей ықтималдықпен таңдалуы керек\"",
    "mustInclude": [
     "def draw"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Күтілетін шашырау",
   "prompt": "<p>CLT бойынша таңдамалық орташалардың SD-і σ / √n. <code>expected_spread(sigma, n)</code> функциясын жазыңыз.</p><p>Мысалы, чектердің SD-і 50 мың ₸, таңдама 30 клиент: <code>expected_spread(50, 30)</code> ≈ <code>9.13</code>.</p>",
   "starter": "import math\n\ndef expected_spread(sigma, n):\n    pass\n",
   "solution": "import math\n\ndef expected_spread(sigma, n):\n    return sigma / math.sqrt(n)\n",
   "hints": [
    "<code>sigma / math.sqrt(n)</code>"
   ],
   "check": {
    "tests": "assert abs(expected_spread(50, 30) - 50 / 30 ** 0.5) < 1e-9, \"expected_spread(50, 30) ≈ 9.13\"\nassert abs(expected_spread(10, 100) - 1) < 1e-12, \"expected_spread(10, 100) = 1\"\nassert abs(expected_spread(10, 400) - 0.5) < 1e-12, \"n төрт есе өссе, шашырау екі есе кішірейеді: 0.5\"",
    "mustInclude": [
     "def expected_spread"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Біркелкі популяция",
   "prompt": "<p><code>sim_means(k, n)</code> функциясын жазыңыз: әрқайсысы <code>n</code> мәннен (<code>random.random()</code>, яғни 0..1 біркелкі) тұратын <code>k</code> таңдама алып, олардың орташаларының тізімін қайтарсын. Функция ішінде seed қоймаңыз.</p><p>Uniform(0, 1)-дің орташасы 0.5, SD-і ≈ 0.2887, сондықтан n = 30 болғанда орташалардың SD-і ≈ 0.2887 / √30 ≈ 0.0527.</p>",
   "starter": "import random, statistics\n\ndef sim_means(k, n):\n    pass\n",
   "solution": "import random, statistics\n\ndef sim_means(k, n):\n    return [statistics.mean([random.random() for _ in range(n)]) for _ in range(k)]\n",
   "hints": [
    "Сыртқы цикл <code>k</code> рет, ішкісі <code>n</code> рет.",
    "Әр таңдаманың <code>statistics.mean</code>-ін тізімге қосыңыз."
   ],
   "check": {
    "tests": "import random as _r, statistics as _st\n_r.seed(5)\n_m = sim_means(2000, 30)\nassert len(_m) == 2000, \"k = 2000 орташа болуы керек\"\nassert abs(_st.mean(_m) - 0.5) < 0.01, f\"Орташалардың орташасы ≈ 0.5 болуы керек, сізде {_st.mean(_m):.3f}\"\nassert abs(_st.stdev(_m) - 0.2887 / 30 ** 0.5) < 0.005, f\"Орташалардың SD-і ≈ 0.0527 болуы керек, сізде {_st.stdev(_m):.4f}. Әр таңдамада n мән бар ма?\"",
    "mustInclude": [
     "def sim_means"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Чектерден таңдама",
   "prompt": "<p>Қостанайдағы дүкеннің чектері (мың ₸) <code>checks</code> тізімінде, ол қатты оңға қисайған. <code>resample_means(pop, n, k)</code> функциясын жазыңыз: популяциядан <code>random.choice</code> арқылы <code>n</code> элементтен <code>k</code> таңдама алып, орташалар тізімін қайтарсын.</p><p>CLT бойынша орташалардың SD-і ≈ <code>statistics.pstdev(pop) / √n</code>.</p>",
   "starter": "import random, statistics\n\nchecks = [2, 3, 3, 4, 5, 5, 6, 8, 10, 12, 15, 20, 35, 60, 120]\n\ndef resample_means(pop, n, k):\n    pass\n",
   "solution": "import random, statistics\n\nchecks = [2, 3, 3, 4, 5, 5, 6, 8, 10, 12, 15, 20, 35, 60, 120]\n\ndef resample_means(pop, n, k):\n    means = []\n    for _ in range(k):\n        sample = [random.choice(pop) for _ in range(n)]\n        means.append(statistics.mean(sample))\n    return means\n",
   "hints": [
    "Бір таңдама: <code>[random.choice(pop) for _ in range(n)]</code>.",
    "Оның орташасын <code>means</code> тізіміне қосыңыз, мұны <code>k</code> рет қайталаңыз."
   ],
   "check": {
    "tests": "import random as _r, statistics as _st\n_r.seed(7)\n_m = resample_means(checks, 40, 2000)\nassert len(_m) == 2000, \"k = 2000 орташа болуы керек\"\nassert abs(_st.mean(_m) - _st.mean(checks)) < 1.0, f\"Орташалардың орташасы популяция орташасына (≈ 20.5) жақын болуы керек, сізде {_st.mean(_m):.2f}\"\n_e = _st.pstdev(checks) / 40 ** 0.5\nassert abs(_st.stdev(_m) - _e) < 0.4, f\"Орташалардың SD-і ≈ {_e:.2f} болуы керек, сізде {_st.stdev(_m):.2f}\"",
    "mustInclude": [
     "def resample_means"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шекарадағы үлес",
   "prompt": "<p><code>coverage(means, mu, se)</code> функциясын жазыңыз: <code>means</code> ішінде μ ± 1.96 × SE аралығына (шекараларды қоса) түскен орташалардың үлесін қайтарсын. CLT бойынша бұл ≈ 0.95 болуы керек.</p><p>Мысалы, <code>coverage([48, 50, 70], 50, 5)</code> → 2 / 3.</p>",
   "starter": "def coverage(means, mu, se):\n    pass\n",
   "solution": "def coverage(means, mu, se):\n    lo, hi = mu - 1.96 * se, mu + 1.96 * se\n    inside = [m for m in means if lo <= m <= hi]\n    return len(inside) / len(means)\n",
   "hints": [
    "Шекаралар: <code>mu - 1.96 * se</code> және <code>mu + 1.96 * se</code>.",
    "Ішіндегілерді санап, <code>len(means)</code>-ке бөліңіз."
   ],
   "check": {
    "tests": "import random as _r, statistics as _st\nassert abs(coverage([48, 50, 70], 50, 5) - 2 / 3) < 1e-12, \"coverage([48, 50, 70], 50, 5) = 2/3: 70 аралықтан тыс\"\nassert coverage([40.2, 59.8], 50, 5) == 1, \"Шекарадағы мәндер (50 ± 9.8) кіреді\"\n_r.seed(3)\n_ms = [_st.mean([_r.expovariate(1 / 50) for _ in range(40)]) for _ in range(1500)]\n_c = coverage(_ms, 50, 50 / 40 ** 0.5)\nassert 0.92 < _c < 0.97, f\"CLT бойынша үлес ≈ 0.95 болуы керек, сізде {_c:.3f}\"",
    "mustInclude": [
     "def coverage"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Конверсия үлестері",
   "prompt": "<p><code>sim_props(k, n, p)</code> функциясын жазыңыз: <code>k</code> рет «<code>n</code> келуші, әрқайсысы <code>p</code> ықтималдықпен сатып алады» тәжірибесін ойнатып, әр тәжірибедегі конверсия үлесінің тізімін қайтарсын. Функция ішінде seed қоймаңыз.</p><p>Үлестер де орташа (0 мен 1-дің орташасы), сондықтан CLT бойынша олардың SD-і ≈ √(p(1 − p) / n).</p>",
   "starter": "import random\n\ndef sim_props(k, n, p):\n    pass\n",
   "solution": "import random\n\ndef sim_props(k, n, p):\n    out = []\n    for _ in range(k):\n        buys = sum(1 for _ in range(n) if random.random() < p)\n        out.append(buys / n)\n    return out\n",
   "hints": [
    "Әр тәжірибеде <code>random.random() &lt; p</code> болғандарды санаңыз.",
    "Үлес: сатып алғандар / n."
   ],
   "check": {
    "tests": "import random as _r, statistics as _st\n_r.seed(10)\n_v = sim_props(2000, 100, 0.2)\nassert len(_v) == 2000, \"k = 2000 үлес болуы керек\"\nassert abs(_st.mean(_v) - 0.2) < 0.005, f\"Үлестердің орташасы ≈ 0.2 болуы керек, сізде {_st.mean(_v):.4f}\"\nassert abs(_st.stdev(_v) - 0.04) < 0.004, f\"Үлестердің SD-і ≈ √(0.2 × 0.8 / 100) = 0.04 болуы керек, сізде {_st.stdev(_v):.4f}\"",
    "mustInclude": [
     "def sim_props"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сүйектер орташасының таралуы",
   "prompt": "<p>Симуляциясыз, дәл таралу. <code>mean_dist(k)</code> функциясын жазыңыз: <code>k</code> сүйек лақтырғанда олардың <b>орташасының</b> таралуын <code>{орташа: Fraction}</code> сөздігі ретінде қайтарсын (<code>itertools.product</code>). Орташа — <code>sum(w) / k</code>.</p><p>Мысалы, <code>mean_dist(2)[3.5]</code> → <code>Fraction(1, 6)</code>. k өскенде таралу ортаға жиналады (CLT).</p>",
   "starter": "from itertools import product\nfrom fractions import Fraction\n\ndef mean_dist(k):\n    pass\n",
   "solution": "from itertools import product\nfrom fractions import Fraction\n\ndef mean_dist(k):\n    omega = list(product(range(1, 7), repeat=k))\n    counts = {}\n    for w in omega:\n        m = sum(w) / k\n        counts[m] = counts.get(m, 0) + 1\n    return {m: Fraction(c, len(omega)) for m, c in counts.items()}\n",
   "hints": [
    "Әр нәтиженің орташасын есептеп, сөздікте санаңыз.",
    "Соңында әр санды <code>Fraction(c, len(omega))</code>-ға айналдырыңыз."
   ],
   "check": {
    "tests": "from fractions import Fraction as _F\n_d2 = mean_dist(2)\nassert _d2[3.5] == _F(1, 6), \"Екі сүйекте орташа 3.5 (қосынды 7): 1/6\"\nassert _d2[1.0] == _F(1, 36), \"Орташа 1: тек (1, 1)\"\nassert sum(_d2.values()) == 1, \"Ықтималдықтар қосындысы 1\"\n_d3 = mean_dist(3)\n_mu = sum(_m * _p for _m, _p in _d3.items())\n_var = sum((_m - _mu) ** 2 * _p for _m, _p in _d3.items())\nassert abs(_mu - 3.5) < 1e-9, \"Орташаның орташасы 3.5\"\nassert abs(_var - 35 / 12 / 3) < 1e-9, \"Орташаның дисперсиясы σ² / n = (35/12) / 3\"",
    "mustInclude": [
     "def mean_dist"
    ]
   }
  }
 ],
 "ab-2": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Конверсияның SE-і",
   "prompt": "<p><code>se_counts(x, n)</code> функциясын жазыңыз: <code>x</code> — сатып алғандар, <code>n</code> — келушілер. Конверсияның standard error-ын қайтарсын.</p><p>Мысалы, <code>se_counts(48, 400)</code> ≈ <code>0.01625</code>.</p>",
   "starter": "import math\n\ndef se_counts(x, n):\n    pass\n",
   "solution": "import math\n\ndef se_counts(x, n):\n    p = x / n\n    return math.sqrt(p * (1 - p) / n)\n",
   "hints": [
    "Алдымен <code>p = x / n</code>.",
    "SE = √(p(1 − p) / n)."
   ],
   "check": {
    "tests": "assert abs(se_counts(48, 400) - 0.0162481) < 1e-6, \"se_counts(48, 400) ≈ 0.01625\"\nassert abs(se_counts(50, 100) - 0.05) < 1e-12, \"se_counts(50, 100) = 0.05\"\nassert se_counts(0, 100) == 0, \"Ешкім сатып алмаса, SE = 0\"",
    "mustInclude": [
     "def se_counts"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "σ белгілі болғанда",
   "prompt": "<p><code>se_known(sigma, n)</code> функциясын жазыңыз: популяцияның SD-і <code>sigma</code> белгілі болса, n бақылаудың орташасының SE-ін қайтарсын.</p><p>Мысалы, жеткізу уақытының SD-і 12 минут, 36 тапсырыс: <code>se_known(12, 36)</code> → <code>2.0</code>.</p>",
   "starter": "import math\n\ndef se_known(sigma, n):\n    pass\n",
   "solution": "import math\n\ndef se_known(sigma, n):\n    return sigma / math.sqrt(n)\n",
   "hints": [
    "SE = σ / √n."
   ],
   "check": {
    "tests": "assert abs(se_known(12, 36) - 2) < 1e-12, \"se_known(12, 36) = 2\"\nassert abs(se_known(5, 100) - 0.5) < 1e-12, \"se_known(5, 100) = 0.5\"",
    "mustInclude": [
     "def se_known"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "SE пайыздық пунктпен",
   "prompt": "<p><code>se_pp(p, n)</code> функциясын жазыңыз: конверсия үлесі <code>p</code>, таңдама <code>n</code>. SE-ді <b>пайыздық пунктпен</b> (100-ге көбейтіп) қайтарсын.</p><p>Мысалы, <code>se_pp(0.2, 1600)</code> → <code>1.0</code>.</p>",
   "starter": "import math\n\ndef se_pp(p, n):\n    pass\n",
   "solution": "import math\n\ndef se_pp(p, n):\n    return 100 * math.sqrt(p * (1 - p) / n)\n",
   "hints": [
    "Формулада үлес (0.2) қолданылады, соңында ғана 100-ге көбейтіңіз."
   ],
   "check": {
    "tests": "assert abs(se_pp(0.2, 1600) - 1) < 1e-9, \"se_pp(0.2, 1600) = 1.0 п.п.\"\nassert abs(se_pp(0.12, 400) - 1.62481) < 1e-4, \"se_pp(0.12, 400) ≈ 1.62 п.п.\"",
    "mustInclude": [
     "def se_pp"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қажетті таңдама",
   "prompt": "<p><code>n_for_se(p, target)</code> функциясын жазыңыз: конверсия шамамен <code>p</code> болса, SE <code>target</code>-тен аспауы үшін керек ең кіші n-ді (жоғары дөңгелектелген бүтін сан, <code>math.ceil</code>) қайтарсын.</p><p>Формуладан: n = p(1 − p) / target². Мысалы, <code>n_for_se(0.12, 0.015)</code> → <code>470</code>.</p>",
   "starter": "import math\n\ndef n_for_se(p, target):\n    pass\n",
   "solution": "import math\n\ndef n_for_se(p, target):\n    return math.ceil(p * (1 - p) / target ** 2)\n",
   "hints": [
    "SE = √(p(1 − p) / n) теңдеуінен n-ді өрнектеңіз.",
    "<code>math.ceil</code> жоғары дөңгелектейді."
   ],
   "check": {
    "tests": "assert n_for_se(0.12, 0.015) == 470, \"n_for_se(0.12, 0.015) = 470: 0.1056 / 0.000225 ≈ 469.3\"\nassert n_for_se(0.3, 0.02) == 525, \"n_for_se(0.3, 0.02) = 525\"\nassert isinstance(n_for_se(0.05, 0.01), int), \"Бүтін сан қайтарыңыз: math.ceil\"",
    "mustInclude": [
     "def n_for_se"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қалалар бойынша SE",
   "prompt": "<p><code>se_by_city(data)</code> функциясын жазыңыз: <code>data</code> — <code>{қала: чектер тізімі}</code>. Әр қаланың орташа чегінің SE-ін (таңдама SD / √n) <code>{қала: SE}</code> сөздігі ретінде қайтарсын.</p>",
   "starter": "import math, statistics\n\ndef se_by_city(data):\n    pass\n",
   "solution": "import math, statistics\n\ndef se_by_city(data):\n    return {city: statistics.stdev(xs) / math.sqrt(len(xs)) for city, xs in data.items()}\n",
   "hints": [
    "Сабақтағы <code>se_mean</code> формуласын әр қалаға қолданыңыз.",
    "Сөздік құру: <code>{city: ... for city, xs in data.items()}</code>."
   ],
   "check": {
    "tests": "import statistics as _st\n_d = {\"Алматы\": [2, 4, 6, 8], \"Орал\": [5, 5, 6, 6, 7, 7]}\n_r = se_by_city(_d)\nassert set(_r) == {\"Алматы\", \"Орал\"}, \"Әр қалаға бір мән\"\nassert abs(_r[\"Алматы\"] - 1.2909944) < 1e-6, \"Алматы: stdev 2.582 / √4 ≈ 1.291\"\nassert abs(_r[\"Орал\"] - _st.stdev(_d[\"Орал\"]) / 6 ** 0.5) < 1e-9, \"Орал: таңдама SD (n − 1) / √6\"",
    "mustInclude": [
     "def se_by_city"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "SD мен SE айырмасы",
   "prompt": "<p><code>sd_and_se(xs)</code> функциясын жазыңыз: <code>(sd, se)</code> жұбын қайтарсын, мұнда <code>sd</code> — таңдама SD (<code>statistics.stdev</code>), <code>se</code> = sd / √n.</p><p>Мысалы, <code>sd_and_se([2, 4, 6, 8])</code> ≈ <code>(2.582, 1.291)</code>. Деректі көбейткенде SD шамамен өзгермейді, ал SE кішірейеді.</p>",
   "starter": "import math, statistics\n\ndef sd_and_se(xs):\n    pass\n",
   "solution": "import math, statistics\n\ndef sd_and_se(xs):\n    sd = statistics.stdev(xs)\n    return sd, sd / math.sqrt(len(xs))\n",
   "hints": [
    "<code>sd = statistics.stdev(xs)</code>, сосын <code>sd / math.sqrt(len(xs))</code>."
   ],
   "check": {
    "tests": "_sd, _se = sd_and_se([2, 4, 6, 8])\nassert abs(_sd - 2.5819889) < 1e-6 and abs(_se - 1.2909944) < 1e-6, \"sd_and_se([2, 4, 6, 8]) ≈ (2.582, 1.291)\"\n_sd4, _se4 = sd_and_se([2, 4, 6, 8] * 4)\nassert abs(_sd4 - _sd) < 0.3, \"Деректі 4 есе көбейткенде SD шамамен өзгермейді\"\nassert _se4 < _se / 1.8, \"Деректі 4 есе көбейткенде SE шамамен екі есе кішірейеді\"",
    "mustInclude": [
     "def sd_and_se"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "SE-ні симуляциямен тексеру",
   "prompt": "<p><code>sim_se(p, n, k)</code> функциясын жазыңыз: <code>k</code> рет <code>n</code> келушілік таңдама ойнатып (әрқайсысы <code>p</code> ықтималдықпен сатып алады), конверсия үлестерінің <code>statistics.stdev</code>-ін қайтарсын. Ол формуладағы √(p(1 − p) / n)-ге жақын болуы керек.</p>",
   "starter": "import random, statistics\n\ndef sim_se(p, n, k):\n    pass\n",
   "solution": "import random, statistics\n\ndef sim_se(p, n, k):\n    props = []\n    for _ in range(k):\n        buys = sum(1 for _ in range(n) if random.random() < p)\n        props.append(buys / n)\n    return statistics.stdev(props)\n",
   "hints": [
    "Әр таңдамада сатып алғандар үлесін есептеңіз.",
    "Барлық үлестің <code>statistics.stdev</code>-і — эмпирикалық SE."
   ],
   "check": {
    "tests": "import random as _r, math as _m\n_r.seed(12)\n_v = sim_se(0.12, 400, 500)\n_e = _m.sqrt(0.12 * 0.88 / 400)\nassert abs(_v - _e) / _e < 0.1, f\"Симуляция SE ≈ {_e:.4f} болуы керек, сізде {_v:.4f}\"\n_r.seed(13)\n_v2 = sim_se(0.5, 100, 500)\nassert abs(_v2 - 0.05) < 0.006, f\"p = 0.5, n = 100: SE ≈ 0.05, сізде {_v2:.4f}\"",
    "mustInclude": [
     "def sim_se"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ең дәл баға",
   "prompt": "<p><code>most_precise(data)</code> функциясын жазыңыз: <code>data</code> — <code>{қала: (сатып алғандар, келушілер)}</code>. Конверсиясының SE-і ең кіші қаланың атын қайтарсын.</p><p>Мысалы, <code>{\"Алматы\": (300, 5000), \"Тараз\": (40, 400)}</code> → <code>\"Алматы\"</code>.</p>",
   "starter": "import math\n\ndef most_precise(data):\n    pass\n",
   "solution": "import math\n\ndef se_prop(p, n):\n    return math.sqrt(p * (1 - p) / n)\n\ndef most_precise(data):\n    return min(data, key=lambda c: se_prop(data[c][0] / data[c][1], data[c][1]))\n",
   "hints": [
    "Әр қаланың SE-ін <code>se_prop(x / n, n)</code> арқылы есептеңіз.",
    "<code>min(data, key=...)</code> кілттер ішінен ең кішісін береді."
   ],
   "check": {
    "tests": "assert most_precise({\"Алматы\": (300, 5000), \"Тараз\": (40, 400)}) == \"Алматы\", \"Алматыда n көп: SE ең кіші\"\nassert most_precise({\"Атырау\": (10, 1000), \"Ақтау\": (500, 1000)}) == \"Атырау\", \"n бірдей болса, p(1 − p) кіші қала дәлірек: Атырау (1%)\"\nassert most_precise({\"Семей\": (5, 50)}) == \"Семей\", \"Бір қала болса, сол\"",
    "mustInclude": [
     "def most_precise"
    ]
   }
  }
 ],
 "ab-3": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Деңгейден z табу",
   "prompt": "<p><code>z_for(level)</code> функциясын жазыңыз: сенімділік деңгейі <code>level</code> (мысалы, 0.95) үшін екі жақты z мәнін қайтарсын.</p><p>Мысалы, <code>z_for(0.95)</code> ≈ <code>1.96</code>, <code>z_for(0.99)</code> ≈ <code>2.576</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef z_for(level):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef z_for(level):\n    return NormalDist().inv_cdf(1 - (1 - level) / 2)\n",
   "hints": [
    "Құйрықтар екеу: <code>inv_cdf(1 - (1 - level) / 2)</code>."
   ],
   "check": {
    "tests": "assert abs(z_for(0.95) - 1.959964) < 1e-5, \"z_for(0.95) ≈ 1.96: inv_cdf(0.975)\"\nassert abs(z_for(0.90) - 1.644854) < 1e-5, \"z_for(0.90) ≈ 1.645\"\nassert abs(z_for(0.99) - 2.575829) < 1e-5, \"z_for(0.99) ≈ 2.576\"",
    "mustInclude": [
     "def z_for",
     "inv_cdf"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Қате шегі",
   "prompt": "<p><code>margin_prop(p, n, level=0.95)</code> функциясын жазыңыз: конверсия үлесі <code>p</code> мен таңдама <code>n</code> бойынша CI-дың қате шегін (z × SE) қайтарсын.</p><p>Мысалы, <code>margin_prop(0.12, 400)</code> ≈ <code>0.0318</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef margin_prop(p, n, level=0.95):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef margin_prop(p, n, level=0.95):\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return z * math.sqrt(p * (1 - p) / n)\n",
   "hints": [
    "z — деңгейден, SE = √(p(1 − p) / n)."
   ],
   "check": {
    "tests": "assert abs(margin_prop(0.12, 400) - 0.0318458) < 1e-5, \"margin_prop(0.12, 400) ≈ 0.0318\"\nassert margin_prop(0.12, 400, 0.99) > margin_prop(0.12, 400), \"99% қате шегі 95%-дан үлкен болуы керек: level параметрін қолданыңыз\"",
    "mustInclude": [
     "def margin_prop"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Интервалда ма",
   "prompt": "<p><code>contains(ci, value)</code> функциясын жазыңыз: <code>ci</code> — <code>(low, high)</code>; мән интервалда (шекараларды қоса) болса, <code>True</code> қайтарсын.</p><p>Мысалы, <code>contains((0.088, 0.152), 0.1)</code> → <code>True</code>.</p>",
   "starter": "def contains(ci, value):\n    pass\n",
   "solution": "def contains(ci, value):\n    low, high = ci\n    return low <= value <= high\n",
   "hints": [
    "<code>low &lt;= value &lt;= high</code>"
   ],
   "check": {
    "tests": "assert contains((0.088, 0.152), 0.1) is True, \"0.1 интервалда\"\nassert contains((0.088, 0.152), 0.2) is False, \"0.2 интервалдан тыс\"\nassert contains((4200, 4800), 4200) is True, \"Шекара кіреді\"",
    "mustInclude": [
     "def contains"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Интервал ені",
   "prompt": "<p><code>width_prop(x, n, level=0.95)</code> функциясын жазыңыз: пропорция CI-ының енін (high − low) қайтарсын.</p><p>Мысалы, <code>width_prop(48, 400)</code> ≈ <code>0.0637</code>. Таңдаманы төрт есе үлкейтсеңіз (192 / 1600), ені екі есе тарылады.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef width_prop(x, n, level=0.95):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef width_prop(x, n, level=0.95):\n    p = x / n\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return 2 * z * math.sqrt(p * (1 - p) / n)\n",
   "hints": [
    "Ені = 2 × z × SE."
   ],
   "check": {
    "tests": "assert abs(width_prop(48, 400) - 0.0636916) < 1e-5, \"width_prop(48, 400) ≈ 0.0637\"\nassert abs(width_prop(192, 1600) - width_prop(48, 400) / 2) < 1e-9, \"n төрт есе өссе, ені екі есе тарылады\"\nassert width_prop(48, 400, 0.9) < width_prop(48, 400), \"90% интервал тар: level параметрін қолданыңыз\"",
    "mustInclude": [
     "def width_prop"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сауалнама көлемі",
   "prompt": "<p>Сауалнама жоспарлау. <code>n_for_margin(p, m, level=0.95)</code> функциясын жазыңыз: қате шегі <code>m</code>-нен аспауы үшін керек ең кіші n (бүтін, <code>math.ceil</code>). Формула: n = z² × p(1 − p) / m².</p><p>Мысалы, p белгісіз болса, ең сақ болжам p = 0.5: <code>n_for_margin(0.5, 0.03)</code> → <code>1068</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef n_for_margin(p, m, level=0.95):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef n_for_margin(p, m, level=0.95):\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return math.ceil(z ** 2 * p * (1 - p) / m ** 2)\n",
   "hints": [
    "m = z × √(p(1 − p) / n) теңдеуінен n-ді өрнектеңіз."
   ],
   "check": {
    "tests": "assert n_for_margin(0.5, 0.03) == 1068, \"n_for_margin(0.5, 0.03) = 1068\"\nassert n_for_margin(0.12, 0.02) == 1015, \"n_for_margin(0.12, 0.02) = 1015\"\nassert n_for_margin(0.5, 0.03, 0.99) > 1068, \"99% деңгейге көбірек адам керек: level параметрін қолданыңыз\"",
    "mustInclude": [
     "def n_for_margin"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "σ белгілі интервал",
   "prompt": "<p><code>ci_known(mean, sigma, n, level=0.95)</code> функциясын жазыңыз: популяция SD-і <code>sigma</code> белгілі болғанда орташаның CI-ын <code>(low, high)</code> қайтарсын.</p><p>Мысалы, Алматыдағы такси сапарының орташа уақыты 24 минут, σ = 6, n = 36: <code>ci_known(24, 6, 36)</code> ≈ <code>(22.04, 25.96)</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef ci_known(mean, sigma, n, level=0.95):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef ci_known(mean, sigma, n, level=0.95):\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    se = sigma / math.sqrt(n)\n    return (mean - z * se, mean + z * se)\n",
   "hints": [
    "SE = σ / √n, сосын mean ± z × SE."
   ],
   "check": {
    "tests": "_r = ci_known(24, 6, 36)\nassert _r is not None and len(_r) == 2, \"(low, high) қайтарыңыз\"\nassert abs(_r[0] - 22.040036) < 1e-4 and abs(_r[1] - 25.959964) < 1e-4, f\"ci_known(24, 6, 36) ≈ (22.04, 25.96), сізде {_r}\"\n_r9 = ci_known(24, 6, 36, 0.90)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], \"90% интервал тар болуы керек\"",
    "mustInclude": [
     "def ci_known"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Интервалдар жабуы",
   "prompt": "<p>«95% CI» — әдіс туралы мәлімдеме. Оны тексеріңіз: <code>coverage_sim(p, n, k, level=0.95)</code> функциясы <code>k</code> рет <code>n</code> келушілік таңдама ойнатсын (шын конверсия <code>p</code>), әрқайсысына пропорция CI-ын құрсын және шын <code>p</code>-ны қамтыған интервалдар үлесін қайтарсын.</p><p>Нәтиже <code>level</code>-ге жақын болуы керек.</p>",
   "starter": "import math, random\nfrom statistics import NormalDist\n\ndef coverage_sim(p, n, k, level=0.95):\n    pass\n",
   "solution": "import math, random\nfrom statistics import NormalDist\n\ndef ci_prop(x, n, level=0.95):\n    p = x / n\n    se = math.sqrt(p * (1 - p) / n)\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return p - z * se, p + z * se\n\ndef coverage_sim(p, n, k, level=0.95):\n    hits = 0\n    for _ in range(k):\n        x = sum(1 for _ in range(n) if random.random() < p)\n        low, high = ci_prop(x, n, level)\n        if low <= p <= high:\n            hits += 1\n    return hits / k\n",
   "hints": [
    "Сабақтағы <code>ci_prop</code> функциясын пайдаланыңыз.",
    "Әр таңдамада x-ті санап, интервал p-ны қамти ма, тексеріңіз."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(14)\n_c = coverage_sim(0.3, 200, 800)\nassert 0.92 < _c < 0.975, f\"95% интервалдардың шамамен 95%-ы p-ны қамтуы керек, сізде {_c:.3f}\"\n_r.seed(15)\n_c9 = coverage_sim(0.3, 200, 800, 0.8)\nassert 0.75 < _c9 < 0.85, f\"80% деңгейде ≈ 0.8 болуы керек, сізде {_c9:.3f}\"",
    "mustInclude": [
     "def coverage_sim"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Мақсаттан жоғары қалалар",
   "prompt": "<p><code>above_target(data, target, level=0.95)</code> функциясын жазыңыз: <code>data</code> — <code>{қала: (сатып алғандар, келушілер)}</code>. Конверсиясының CI-ы <b>толығымен</b> <code>target</code>-тен жоғары (low &gt; target) қалалардың атын алфавит бойынша сұрыпталған тізім етіп қайтарсын.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef above_target(data, target, level=0.95):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef ci_prop(x, n, level=0.95):\n    p = x / n\n    se = math.sqrt(p * (1 - p) / n)\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return p - z * se, p + z * se\n\ndef above_target(data, target, level=0.95):\n    return sorted(c for c, (x, n) in data.items() if ci_prop(x, n, level)[0] > target)\n",
   "hints": [
    "Әр қалаға <code>ci_prop</code> құрып, төменгі шекарасын <code>target</code>-пен салыстырыңыз.",
    "Соңында <code>sorted(...)</code>."
   ],
   "check": {
    "tests": "_d = {\"Алматы\": (600, 5000), \"Астана\": (130, 1000), \"Шымкент\": (28, 200), \"Ақтөбе\": (90, 1000)}\nassert above_target(_d, 0.1) == [\"Алматы\", \"Астана\"], \"Алматы (12%, CI ≈ 11.1–12.9%) мен Астана (13%, CI ≈ 10.9–15.1%) — 10%-дан жоғары; Шымкенттің (14%) интервалы кең, 10%-ды қамтиды\"\nassert above_target(_d, 0.2) == [], \"Ешбір қала 20%-дан анық жоғары емес\"\nassert above_target(_d, 0.1, 0.5) == [\"Алматы\", \"Астана\", \"Шымкент\"], \"50% деңгейде интервал тар: Шымкент те кіреді\"",
    "mustInclude": [
     "def above_target"
    ]
   }
  }
 ],
 "ab-4": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір жақты p-value",
   "prompt": "<p><code>p_right(z)</code> функциясын жазыңыз: оң құйрықтың ықтималдығын P(Z &gt; z) қайтарсын.</p><p>Мысалы, <code>p_right(2.1)</code> ≈ <code>0.0179</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef p_right(z):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef p_right(z):\n    return 1 - NormalDist().cdf(z)\n",
   "hints": [
    "<code>1 - NormalDist().cdf(z)</code>"
   ],
   "check": {
    "tests": "assert abs(p_right(2.1) - 0.0178644) < 1e-6, \"p_right(2.1) ≈ 0.0179\"\nassert abs(p_right(0) - 0.5) < 1e-12, \"p_right(0) = 0.5\"\nassert p_right(-3) > 0.99, \"Теріс z үшін оң құйрық үлкен\"",
    "mustInclude": [
     "def p_right"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "H0 туралы шешім",
   "prompt": "<p><code>reject(p, alpha=0.05)</code> функциясын жазыңыз: p-value α-дан кіші болса, <code>True</code> (H0 жоққа шығарылады), әйтпесе <code>False</code>.</p><p>Мысалы, <code>reject(0.0357)</code> → <code>True</code>, <code>reject(0.134)</code> → <code>False</code>.</p>",
   "starter": "def reject(p, alpha=0.05):\n    pass\n",
   "solution": "def reject(p, alpha=0.05):\n    return p < alpha\n",
   "hints": [
    "<code>p &lt; alpha</code>"
   ],
   "check": {
    "tests": "assert reject(0.0357) is True, \"0.0357 < 0.05: H0 жоққа шығарылады\"\nassert reject(0.134) is False, \"0.134 ≥ 0.05: дәлел жеткіліксіз\"\nassert reject(0.03, alpha=0.01) is False, \"α = 0.01 болса, 0.03 жеткіліксіз\"\nassert reject(0.05) is False, \"p = α болса, жоққа шығармаймыз (қатаң теңсіздік)\"",
    "mustInclude": [
     "def reject"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тест статистикасы",
   "prompt": "<p><code>z_stat(est, h0, se)</code> функциясын жазыңыз: баға H0 мәнінен неше SE алыс екенін қайтарсын.</p><p>Мысалы, конверсия 12%, H0: 10%, SE = 0.008: <code>z_stat(0.12, 0.10, 0.008)</code> → <code>2.5</code>.</p>",
   "starter": "def z_stat(est, h0, se):\n    pass\n",
   "solution": "def z_stat(est, h0, se):\n    return (est - h0) / se\n",
   "hints": [
    "z = (баға − H0 мәні) / SE."
   ],
   "check": {
    "tests": "assert abs(z_stat(0.12, 0.10, 0.008) - 2.5) < 1e-9, \"z_stat(0.12, 0.10, 0.008) = 2.5\"\nassert abs(z_stat(48, 50, 4) + 0.5) < 1e-12, \"Баға кіші болса, z теріс: −0.5\"",
    "mustInclude": [
     "def z_stat"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Нормаға қарсы тест",
   "prompt": "<p>Компания «конверсия 10%» дейді. Жаңа айда <code>n</code> келушінің <code>x</code>-і сатып алды. <code>one_prop_test(x, n, p0)</code> функциясын жазыңыз: H0: p = p0 кезінде SE = √(p0(1 − p0) / n), z = (x / n − p0) / SE; <code>(z, p)</code> қайтарсын, p — екі жақты.</p><p>Мысалы, <code>one_prop_test(48, 400, 0.10)</code> ≈ <code>(1.333, 0.182)</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef one_prop_test(x, n, p0):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef one_prop_test(x, n, p0):\n    se = math.sqrt(p0 * (1 - p0) / n)\n    z = (x / n - p0) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))\n",
   "hints": [
    "H0 кезінде SE-ге p0 қойылады, бағаны емес.",
    "p-value — екі жақты: <code>2 * (1 - cdf(abs(z)))</code>."
   ],
   "check": {
    "tests": "_z, _p = one_prop_test(48, 400, 0.10)\nassert abs(_z - 1.3333333) < 1e-6, f\"z ≈ 1.333 болуы керек, сізде {_z:.4f}. SE-де p0 қолданыңыз\"\nassert abs(_p - 0.1824224) < 1e-5, f\"p ≈ 0.182 болуы керек, сізде {_p:.4f}\"\n_z2, _p2 = one_prop_test(52, 400, 0.18)\nassert _z2 < 0 and abs(_p2 - 0.009244) < 0.0005, \"Конверсия төмен болса, z теріс (≈ −2.60); p ≈ 0.009\"",
    "mustInclude": [
     "def one_prop_test"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа чек тесті",
   "prompt": "<p>Бұрын орташа чек 5 000 ₸ еді. <code>mean_test(xs, mu0)</code> функциясын жазыңыз: H0: μ = mu0; z = (орташа − mu0) / (stdev / √n), екі жақты p-value; <code>(z, p)</code> қайтарсын.</p>",
   "starter": "import math, statistics\nfrom statistics import NormalDist\n\ndef mean_test(xs, mu0):\n    pass\n",
   "solution": "import math, statistics\nfrom statistics import NormalDist\n\ndef mean_test(xs, mu0):\n    se = statistics.stdev(xs) / math.sqrt(len(xs))\n    z = (statistics.mean(xs) - mu0) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))\n",
   "hints": [
    "SE = <code>statistics.stdev(xs) / math.sqrt(len(xs))</code>."
   ],
   "check": {
    "tests": "import statistics as _st\n_xs = [5200, 4800, 5600, 5100, 5900, 5300, 4700, 5500, 5800, 5000] * 4\n_z, _p = mean_test(_xs, 5000)\n_se = _st.stdev(_xs) / 40 ** 0.5\nassert abs(_z - (_st.mean(_xs) - 5000) / _se) < 1e-9, f\"z ≈ {(_st.mean(_xs) - 5000) / _se:.3f} болуы керек, сізде {_z}\"\nassert _p < 0.01, \"Орташа 5 290 ₸, n = 40: айырма маңызды болуы керек (p < 0.01)\"\n_z0, _p0 = mean_test([4, 6, 5, 5], 5)\nassert abs(_z0) < 1e-12 and abs(_p0 - 1) < 1e-12, \"Орташа mu0-ге тең болса, z = 0, p = 1\"",
    "mustInclude": [
     "def mean_test"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Сыни мән",
   "prompt": "<p><code>critical_z(alpha, two_sided=True)</code> функциясын жазыңыз: |z| осы мәннен асса, H0 жоққа шығарылатын шекараны қайтарсын. Екі жақты тестте α екі құйрыққа бөлінеді.</p><p>Мысалы, <code>critical_z(0.05)</code> ≈ <code>1.96</code>, <code>critical_z(0.05, two_sided=False)</code> ≈ <code>1.645</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef critical_z(alpha, two_sided=True):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef critical_z(alpha, two_sided=True):\n    tail = alpha / 2 if two_sided else alpha\n    return NormalDist().inv_cdf(1 - tail)\n",
   "hints": [
    "Бір құйрықтағы ықтималдық: екі жақты болса α / 2, әйтпесе α.",
    "<code>NormalDist().inv_cdf(1 - tail)</code>"
   ],
   "check": {
    "tests": "assert abs(critical_z(0.05) - 1.959964) < 1e-5, \"critical_z(0.05) ≈ 1.96\"\nassert abs(critical_z(0.05, two_sided=False) - 1.644854) < 1e-5, \"Бір жақты: ≈ 1.645\"\nassert abs(critical_z(0.01) - 2.575829) < 1e-5, \"critical_z(0.01) ≈ 2.576\"",
    "mustInclude": [
     "def critical_z"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Type I қате жиілігі",
   "prompt": "<p>α = 0.05 шын мәнінде нені білдіреді? <code>type1_rate(p0, n, k, alpha=0.05)</code> функциясын жазыңыз: H0 <b>рас</b> әлемді <code>k</code> рет ойнатыңыз — әр жолы <code>n</code> келуші, әрқайсысы <code>p0</code> ықтималдықпен сатып алады. Әр таңдамаға жоғарыдағы бір пропорция тестін (H0: p = p0) жасап, H0 жоққа шығарылған (p &lt; α) тәжірибелер үлесін қайтарсын.</p><p>Нәтиже α-ға жақын болуы керек.</p>",
   "starter": "import math, random\nfrom statistics import NormalDist\n\ndef type1_rate(p0, n, k, alpha=0.05):\n    pass\n",
   "solution": "import math, random\nfrom statistics import NormalDist\n\ndef one_prop_p(x, n, p0):\n    se = math.sqrt(p0 * (1 - p0) / n)\n    z = (x / n - p0) / se\n    return 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef type1_rate(p0, n, k, alpha=0.05):\n    rejects = 0\n    for _ in range(k):\n        x = sum(1 for _ in range(n) if random.random() < p0)\n        if one_prop_p(x, n, p0) < alpha:\n            rejects += 1\n    return rejects / k\n",
   "hints": [
    "Әр тәжірибеде x-ті санап, p-value есептеңіз.",
    "p &lt; α болған тәжірибелерді санаңыз — бұлар false positive."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(16)\n_v = type1_rate(0.3, 200, 1000)\nassert 0.03 < _v < 0.075, f\"H0 рас болғанда шамамен 5% тест қате «маңызды» болуы керек, сізде {_v:.3f}\"\n_r.seed(17)\n_v1 = type1_rate(0.3, 200, 1000, alpha=0.01)\nassert _v1 < _v, \"α = 0.01 болса, false positive азаюы керек: alpha параметрін қолданыңыз\"",
    "mustInclude": [
     "def type1_rate"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тесттің қуаты",
   "prompt": "<p>Енді H0 <b>жалған</b>: шын конверсия <code>p_true</code>, бірақ біз H0: p = p0 тексереміз. <code>power_sim(p0, p_true, n, k, alpha=0.05)</code> функциясы <code>k</code> тәжірибеде H0 жоққа шығарылған үлесті (power = 1 − β) қайтарсын.</p><p>Мысалы, p0 = 0.1, p_true = 0.15, n = 400 болса, power ≈ 0.87.</p>",
   "starter": "import math, random\nfrom statistics import NormalDist\n\ndef power_sim(p0, p_true, n, k, alpha=0.05):\n    pass\n",
   "solution": "import math, random\nfrom statistics import NormalDist\n\ndef one_prop_p(x, n, p0):\n    se = math.sqrt(p0 * (1 - p0) / n)\n    z = (x / n - p0) / se\n    return 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef power_sim(p0, p_true, n, k, alpha=0.05):\n    rejects = 0\n    for _ in range(k):\n        x = sum(1 for _ in range(n) if random.random() < p_true)\n        if one_prop_p(x, n, p0) < alpha:\n            rejects += 1\n    return rejects / k\n",
   "hints": [
    "Алдыңғы тапсырмадағыдай, бірақ деректі <code>p_true</code>-мен ойнатыңыз.",
    "Тест бәрібір <code>p0</code>-ға қарсы жасалады."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(18)\n_v = power_sim(0.1, 0.15, 400, 600)\nassert 0.82 < _v < 0.93, f\"Power ≈ 0.87 болуы керек, сізде {_v:.3f}\"\n_r.seed(19)\n_v2 = power_sim(0.1, 0.15, 100, 600)\nassert _v2 < _v - 0.2, \"n кіші болса, power едәуір төмен болуы керек\"",
    "mustInclude": [
     "def power_sim"
    ]
   }
  }
 ],
 "ab-5": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Pooled конверсия",
   "prompt": "<p><code>pooled(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: H0 кезіндегі біріктірілген конверсияны қайтарсын.</p><p>Мысалы, <code>pooled(200, 2000, 250, 2000)</code> → <code>0.1125</code>.</p>",
   "starter": "def pooled(x_a, n_a, x_b, n_b):\n    pass\n",
   "solution": "def pooled(x_a, n_a, x_b, n_b):\n    return (x_a + x_b) / (n_a + n_b)\n",
   "hints": [
    "Барлық сатып алғандар / барлық пайдаланушылар."
   ],
   "check": {
    "tests": "assert abs(pooled(200, 2000, 250, 2000) - 0.1125) < 1e-12, \"pooled(200, 2000, 250, 2000) = 450 / 4000 = 0.1125\"\nassert abs(pooled(480, 10000, 540, 12000) - 1020 / 22000) < 1e-12, \"Топ көлемдері әртүрлі: (x_a + x_b) / (n_a + n_b), орташа p емес\"",
    "mustInclude": [
     "def pooled"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Айырма п.п.-мен",
   "prompt": "<p><code>diff_pp(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: p_B − p_A айырмасын <b>пайыздық пунктпен</b> қайтарсын.</p><p>Мысалы, <code>diff_pp(200, 2000, 250, 2000)</code> → <code>2.5</code>.</p>",
   "starter": "def diff_pp(x_a, n_a, x_b, n_b):\n    pass\n",
   "solution": "def diff_pp(x_a, n_a, x_b, n_b):\n    return 100 * (x_b / n_b - x_a / n_a)\n",
   "hints": [
    "<code>100 * (x_b / n_b - x_a / n_a)</code>"
   ],
   "check": {
    "tests": "assert abs(diff_pp(200, 2000, 250, 2000) - 2.5) < 1e-9, \"diff_pp(200, 2000, 250, 2000) = 2.5 п.п.\"\nassert abs(diff_pp(250, 2000, 200, 2000) + 2.5) < 1e-9, \"B нашар болса, айырма теріс: −2.5\"",
    "mustInclude": [
     "def diff_pp"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Pooled SE",
   "prompt": "<p><code>pooled_se(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: SE = √(p(1 − p) × (1/n_A + 1/n_B)), мұнда p — pooled конверсия.</p><p>Мысалы, <code>pooled_se(200, 2000, 250, 2000)</code> ≈ <code>0.00999</code>.</p>",
   "starter": "import math\n\ndef pooled_se(x_a, n_a, x_b, n_b):\n    pass\n",
   "solution": "import math\n\ndef pooled_se(x_a, n_a, x_b, n_b):\n    p = (x_a + x_b) / (n_a + n_b)\n    return math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n",
   "hints": [
    "Алдымен pooled p.",
    "<code>math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))</code>"
   ],
   "check": {
    "tests": "assert abs(pooled_se(200, 2000, 250, 2000) - 0.0099921) < 1e-6, \"pooled_se(200, 2000, 250, 2000) ≈ 0.00999\"\nassert abs(pooled_se(10, 100, 10, 100) - (0.09 * 0.02) ** 0.5) < 1e-12, \"p = 0.1, n = 100 + 100: √(0.09 × 0.02)\"",
    "mustInclude": [
     "def pooled_se"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жарамдылық шарты",
   "prompt": "<p>z-тест CLT-ке сүйенеді. <code>valid(x_a, n_a, x_b, n_b, min_count=10)</code> функциясын жазыңыз: әр топта сатып алғандар да, сатып алмағандар да кемінде <code>min_count</code> болса, <code>True</code> қайтарсын.</p><p>Мысалы, <code>valid(6, 32, 10, 32)</code> → <code>False</code> (A-да тек 6 сатып алушы).</p>",
   "starter": "def valid(x_a, n_a, x_b, n_b, min_count=10):\n    pass\n",
   "solution": "def valid(x_a, n_a, x_b, n_b, min_count=10):\n    counts = [x_a, n_a - x_a, x_b, n_b - x_b]\n    return all(c >= min_count for c in counts)\n",
   "hints": [
    "Төрт сан тексеріледі: x_a, n_a − x_a, x_b, n_b − x_b."
   ],
   "check": {
    "tests": "assert valid(6, 32, 10, 32) is False, \"A-да 6 сатып алушы: < 10\"\nassert valid(200, 2000, 250, 2000) is True, \"Барлық сан жеткілікті\"\nassert valid(15, 20, 12, 30) is False, \"A-да сатып алмағандар тек 5\"\nassert valid(6, 32, 10, 32, min_count=5) is True, \"min_count = 5 болса, жарамды\"",
    "mustInclude": [
     "def valid"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Жеңімпазды анықтау",
   "prompt": "<p><code>winner(x_a, n_a, x_b, n_b, alpha=0.05)</code> функциясын жазыңыз: екі пропорцияның z-тесті бойынша p &lt; α болса, конверсиясы жоғары нұсқаны (<code>\"A\"</code> не <code>\"B\"</code>), әйтпесе <code>\"жоқ\"</code> қайтарсын.</p><p>Мысалы, <code>winner(200, 2000, 250, 2000)</code> → <code>\"B\"</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef winner(x_a, n_a, x_b, n_b, alpha=0.05):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef two_prop_z(x_a, n_a, x_b, n_b):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    p = (x_a + x_b) / (n_a + n_b)\n    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = (p_b - p_a) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef winner(x_a, n_a, x_b, n_b, alpha=0.05):\n    z, p = two_prop_z(x_a, n_a, x_b, n_b)\n    if p >= alpha:\n        return \"жоқ\"\n    return \"B\" if z > 0 else \"A\"\n",
   "hints": [
    "Сабақтағы <code>two_prop_z</code> функциясын қолданыңыз.",
    "Маңызды болса, бағытты z-тің белгісі айтады."
   ],
   "check": {
    "tests": "assert winner(200, 2000, 250, 2000) == \"B\", \"p ≈ 0.012, z > 0: B\"\nassert winner(250, 2000, 200, 2000) == \"A\", \"z < 0: A\"\nassert winner(480, 10000, 540, 10000) == \"жоқ\", \"p ≈ 0.054 > 0.05: жеңімпаз жоқ\"\nassert winner(480, 10000, 540, 10000, alpha=0.1) == \"B\", \"α = 0.1 болса, B\"",
    "mustInclude": [
     "def winner"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір жақты тест",
   "prompt": "<p>Кейде сұрақ тек «B жақсы ма?» болады. <code>one_sided_p(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: pooled SE арқылы z есептеп, H1: p_B &gt; p_A үшін бір жақты p-value = 1 − cdf(z) қайтарсын.</p><p>Мысалы, <code>one_sided_p(480, 10000, 540, 10000)</code> ≈ <code>0.027</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef one_sided_p(x_a, n_a, x_b, n_b):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef one_sided_p(x_a, n_a, x_b, n_b):\n    p = (x_a + x_b) / (n_a + n_b)\n    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = (x_b / n_b - x_a / n_a) / se\n    return 1 - NormalDist().cdf(z)\n",
   "hints": [
    "z — бұрынғыдай.",
    "Бір жақты: абсолют мәнсіз, екіге көбейтпей <code>1 - cdf(z)</code>."
   ],
   "check": {
    "tests": "assert abs(one_sided_p(480, 10000, 540, 10000) - 0.0268) < 0.001, \"one_sided_p(480, 10000, 540, 10000) ≈ 0.027\"\nassert one_sided_p(540, 10000, 480, 10000) > 0.9, \"B нашар болса, бір жақты p үлкен\"",
    "mustInclude": [
     "def one_sided_p"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қалалар бойынша A/B",
   "prompt": "<p><code>b_wins(data, alpha=0.05)</code> функциясын жазыңыз: <code>data</code> — <code>{қала: (x_a, n_a, x_b, n_b)}</code>. B нұсқасы статистикалық маңызды түрде <b>жақсы</b> болған (z &gt; 0 және p &lt; α) қалалардың атын алфавит бойынша сұрыпталған тізім етіп қайтарсын.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef b_wins(data, alpha=0.05):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef two_prop_z(x_a, n_a, x_b, n_b):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    p = (x_a + x_b) / (n_a + n_b)\n    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = (p_b - p_a) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef b_wins(data, alpha=0.05):\n    out = []\n    for city, (x_a, n_a, x_b, n_b) in data.items():\n        z, p = two_prop_z(x_a, n_a, x_b, n_b)\n        if z > 0 and p < alpha:\n            out.append(city)\n    return sorted(out)\n",
   "hints": [
    "Әр қалаға <code>two_prop_z</code>.",
    "Екі шарт: <code>z &gt; 0</code> және <code>p &lt; alpha</code>."
   ],
   "check": {
    "tests": "_d = {\"Алматы\": (200, 2000, 250, 2000), \"Астана\": (250, 2000, 200, 2000), \"Шымкент\": (100, 1000, 110, 1000), \"Ақтау\": (50, 1000, 80, 1000)}\nassert b_wins(_d) == [\"Алматы\", \"Ақтау\"], \"Алматы (p ≈ 0.012) мен Ақтау (p ≈ 0.007): B жақсы. Астанада A жақсы, Шымкентте маңызды емес\"\nassert b_wins(_d, alpha=0.01) == [\"Ақтау\"], \"α = 0.01 болса, тек Ақтау\"",
    "mustInclude": [
     "def b_wins"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Сессиядан пайдаланушыға",
   "prompt": "<p>Логта әр жол — бір <b>сессия</b>: <code>(user_id, variant, bought)</code>, бір адамның бірнеше сессиясы болуы мүмкін. Сессияларды санау n-ді жасанды үлкейтеді. <code>user_level_test(rows)</code> функциясын жазыңыз: деректі пайдаланушы деңгейіне жинаңыз (пайдаланушы кемінде бір сессияда сатып алса — сатып алды), сосын екі пропорцияның z-тестінің <code>(z, p)</code> мәнін қайтарсын.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef user_level_test(rows):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef two_prop_z(x_a, n_a, x_b, n_b):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    p = (x_a + x_b) / (n_a + n_b)\n    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = (p_b - p_a) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef user_level_test(rows):\n    users = {}\n    for uid, variant, bought in rows:\n        prev = users.get(uid, (variant, False))\n        users[uid] = (variant, prev[1] or bool(bought))\n    n = {\"A\": 0, \"B\": 0}\n    x = {\"A\": 0, \"B\": 0}\n    for variant, bought in users.values():\n        n[variant] += 1\n        if bought:\n            x[variant] += 1\n    return two_prop_z(x[\"A\"], n[\"A\"], x[\"B\"], n[\"B\"])\n",
   "hints": [
    "Сөздік: <code>user_id → (variant, сатып алды ма)</code>; жаңа сессияда <code>or</code> арқылы жаңартыңыз.",
    "Сосын әр нұсқаның n мен x-ін санап, <code>two_prop_z</code> шақырыңыз."
   ],
   "check": {
    "tests": "_rows = []\nfor _u in range(400):\n    _v = \"A\" if _u % 2 == 0 else \"B\"\n    _buy = (_u % 20 == 0) if _v == \"A\" else (_u % 10 == 1)\n    _rows.append((_u, _v, False))\n    _rows.append((_u, _v, _buy))\n    _rows.append((_u, _v, False))\n_z, _p = user_level_test(_rows)\nassert abs(_z - 2.8006) < 0.01, f\"Пайдаланушы деңгейінде A: 20/200, B: 40/200, z ≈ 2.80 болуы керек, сізде {_z:.3f}. Сессияларды емес, пайдаланушыларды санаңыз\"\nassert abs(_p - 0.0051) < 0.0005, f\"p ≈ 0.005 болуы керек, сізде {_p:.4f}\"",
    "mustInclude": [
     "def user_level_test"
    ]
   }
  }
 ],
 "ab-6": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Таңдама дисперсиясы",
   "prompt": "<p><code>var_s(xs)</code> функциясын <code>statistics</code>-сіз жазыңыз: таңдама дисперсиясын (n − 1-ге бөлу) қайтарсын.</p><p>Мысалы, <code>var_s([5, 7, 6, 8, 4])</code> → <code>2.5</code>.</p>",
   "starter": "def var_s(xs):\n    pass\n",
   "solution": "def var_s(xs):\n    n = len(xs)\n    m = sum(xs) / n\n    return sum((x - m) ** 2 for x in xs) / (n - 1)\n",
   "hints": [
    "Алдымен орташа, сосын квадраттар қосындысы.",
    "n емес, <code>n - 1</code>-ге бөліңіз."
   ],
   "check": {
    "tests": "import statistics as _st\nassert abs(var_s([5, 7, 6, 8, 4]) - 2.5) < 1e-12, \"var_s([5, 7, 6, 8, 4]) = 2.5: n − 1-ге бөлдіңіз бе?\"\n_x = [12, 30, 8, 22, 15, 9]\nassert abs(var_s(_x) - _st.variance(_x)) < 1e-9, \"statistics.variance-пен бірдей болуы керек\"",
    "mustInclude": [
     "def var_s"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Айырманың SE-і",
   "prompt": "<p><code>se_diff(a, b)</code> функциясын жазыңыз: Welch формуласындағы айырма SE-ін √(s_A² / n_A + s_B² / n_B) қайтарсын.</p><p>Мысалы, <code>se_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>1.0</code>.</p>",
   "starter": "import math, statistics\n\ndef se_diff(a, b):\n    pass\n",
   "solution": "import math, statistics\n\ndef se_diff(a, b):\n    return math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))\n",
   "hints": [
    "SE-лерді квадратта қосыңыз: <code>variance(a) / len(a) + variance(b) / len(b)</code>."
   ],
   "check": {
    "tests": "assert abs(se_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6]) - 1) < 1e-12, \"se_diff = √(2.5/5 + 2.5/5) = 1\"\nassert abs(se_diff([1, 3], [2, 2, 8]) - (2 / 2 + 12 / 3) ** 0.5) < 1e-12, \"se_diff([1, 3], [2, 2, 8]) = √(1 + 4) ≈ 2.236\"",
    "mustInclude": [
     "def se_diff"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Орташалар айырмасы",
   "prompt": "<p><code>mean_diff(a, b)</code> функциясын жазыңыз: m_B − m_A қайтарсын.</p><p>Мысалы, сайттағы уақыт: <code>mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>2</code>.</p>",
   "starter": "import statistics\n\ndef mean_diff(a, b):\n    pass\n",
   "solution": "import statistics\n\ndef mean_diff(a, b):\n    return statistics.mean(b) - statistics.mean(a)\n",
   "hints": [
    "Рет маңызды: B минус A."
   ],
   "check": {
    "tests": "assert mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6]) == 2, \"mean_diff = 8 − 6 = 2\"\nassert mean_diff([10, 20], [12]) == -3, \"mean_diff([10, 20], [12]) = 12 − 15 = −3\"",
    "mustInclude": [
     "def mean_diff"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Еркіндік дәрежесі",
   "prompt": "<p>Welch–Satterthwaite формуласы: v_A = s_A² / n_A, v_B = s_B² / n_B болса,</p><p>df = (v_A + v_B)² / (v_A² / (n_A − 1) + v_B² / (n_B − 1)).</p><p><code>welch_df(a, b)</code> функциясын жазыңыз. Мысалы, <code>welch_df([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>8.0</code>.</p>",
   "starter": "import statistics\n\ndef welch_df(a, b):\n    pass\n",
   "solution": "import statistics\n\ndef welch_df(a, b):\n    va = statistics.variance(a) / len(a)\n    vb = statistics.variance(b) / len(b)\n    return (va + vb) ** 2 / (va ** 2 / (len(a) - 1) + vb ** 2 / (len(b) - 1))\n",
   "hints": [
    "Алдымен <code>va</code> мен <code>vb</code> есептеңіз.",
    "Бөлімде әрқайсысының квадратын <code>n − 1</code>-ге бөліңіз."
   ],
   "check": {
    "tests": "assert abs(welch_df([5, 7, 6, 8, 4], [9, 7, 8, 10, 6]) - 8) < 1e-9, \"Тең дисперсия, n = 5 + 5: df = 8\"\n_a = [10, 12, 9, 11, 13, 10, 12, 11]\n_b = [14, 30, 8, 22, 15, 9, 25, 12, 18, 20]\nassert abs(welch_df(_a, _b) - 9.7647) < 0.01, f\"Дисперсиялары әртүрлі топтарда df ≈ 9.76, сізде {welch_df(_a, _b):.3f}\"",
    "mustInclude": [
     "def welch_df"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа айырманың CI-ы",
   "prompt": "<p><code>ci_mean_diff(a, b, level=0.95)</code> функциясын жазыңыз: m_B − m_A айырмасының сенімділік интервалын (Welch SE және z) <code>(low, high)</code> қайтарсын.</p><p>Мысалы, <code>ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> ≈ <code>(0.04, 3.96)</code>.</p>",
   "starter": "import math, statistics\nfrom statistics import NormalDist\n\ndef ci_mean_diff(a, b, level=0.95):\n    pass\n",
   "solution": "import math, statistics\nfrom statistics import NormalDist\n\ndef ci_mean_diff(a, b, level=0.95):\n    d = statistics.mean(b) - statistics.mean(a)\n    se = math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))\n    z = NormalDist().inv_cdf(1 - (1 - level) / 2)\n    return (d - z * se, d + z * se)\n",
   "hints": [
    "Айырма ± z × SE.",
    "z — деңгейден: <code>inv_cdf(1 - (1 - level) / 2)</code>."
   ],
   "check": {
    "tests": "_r = ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])\nassert _r is not None and len(_r) == 2, \"(low, high) қайтарыңыз\"\nassert abs(_r[0] - 0.040036) < 1e-4 and abs(_r[1] - 3.959964) < 1e-4, f\"≈ (0.04, 3.96) болуы керек, сізде {_r}\"\n_r9 = ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6], 0.9)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], \"90% интервал тар болуы керек\"",
    "mustInclude": [
     "def ci_mean_diff"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "«Кит» клиент әсері",
   "prompt": "<p>Табыс дерегінде бір өте үлкен төлем нәтижені бұзуы мүмкін. <code>t_without_max(a, b)</code> функциясын жазыңыз: <code>(t_all, t_trim)</code> қайтарсын: <code>t_all</code> — барлық дерек бойынша Welch t (B минус A), <code>t_trim</code> — B тобынан ең үлкен бір мәнді алып тастағаннан кейінгі t.</p>",
   "starter": "import math, statistics\n\ndef t_without_max(a, b):\n    pass\n",
   "solution": "import math, statistics\n\ndef welch_stat(a, b):\n    se = math.sqrt(statistics.variance(a) / len(a) + statistics.variance(b) / len(b))\n    return (statistics.mean(b) - statistics.mean(a)) / se\n\ndef t_without_max(a, b):\n    trimmed = sorted(b)[:-1]\n    return welch_stat(a, b), welch_stat(a, trimmed)\n",
   "hints": [
    "Welch t-ны бөлек функция етіп жазыңыз.",
    "Ең үлкенін алып тастау: <code>sorted(b)[:-1]</code> (бастапқы тізімді өзгертпейді)."
   ],
   "check": {
    "tests": "_a = [0, 0, 5, 0, 3, 0, 4, 0, 0, 6, 2, 0]\n_b = [0, 4, 0, 0, 5, 0, 3, 0, 0, 2, 0, 120]\n_b0 = list(_b)\n_ta, _tt = t_without_max(_a, _b)\nassert abs(_ta - 0.9568) < 0.01, f\"t_all ≈ 0.96 болуы керек, сізде {_ta:.3f}\"\nassert abs(_tt - (-0.4524)) < 0.01, f\"Китсіз t_trim ≈ −0.45 болуы керек, сізде {_tt:.3f}: бір клиент барлық «әсерді» берген\"\nassert _b == _b0, \"Бастапқы b тізімі өзгермеуі керек\"",
    "mustInclude": [
     "def t_without_max"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "ARPU тесті",
   "prompt": "<p>Бір пайдаланушыға табыс (ARPU) метрикасы: көп пайдаланушы 0 ₸ төлейді. <code>arpu_test(rev_a, rev_b, alpha=0.05)</code> функциясын жазыңыз: Welch t (B минус A), қалыпты жуықтау бойынша екі жақты p және <code>significant</code> (p &lt; α) — <code>(t, p, significant)</code> қайтарсын.</p>",
   "starter": "import math, statistics\nfrom statistics import NormalDist\n\ndef arpu_test(rev_a, rev_b, alpha=0.05):\n    pass\n",
   "solution": "import math, statistics\nfrom statistics import NormalDist\n\ndef arpu_test(rev_a, rev_b, alpha=0.05):\n    se = math.sqrt(statistics.variance(rev_a) / len(rev_a) + statistics.variance(rev_b) / len(rev_b))\n    t = (statistics.mean(rev_b) - statistics.mean(rev_a)) / se\n    p = 2 * (1 - NormalDist().cdf(abs(t)))\n    return t, p, p < alpha\n",
   "hints": [
    "Сабақтағы <code>welch_t</code>-ке үшінші мән қосылады: <code>p &lt; alpha</code>."
   ],
   "check": {
    "tests": "_a = ([0] * 9 + [5000]) * 10\n_b = ([0] * 8 + [5000, 6000]) * 10\n_t, _p, _s = arpu_test(_a, _b)\nassert abs(_t - 2.2342) < 0.01, f\"t ≈ 2.23 болуы керек, сізде {_t:.3f}\"\nassert abs(_p - 0.0255) < 0.001 and _s is True, \"p ≈ 0.025 < 0.05: significant = True\"\n_t2, _p2, _s2 = arpu_test(_a, _b, alpha=0.01)\nassert _s2 is False, \"α = 0.01 болса, маңызды емес: alpha параметрін қолданыңыз\"",
    "mustInclude": [
     "def arpu_test"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "0/1 дерегінде t пен z",
   "prompt": "<p>Конверсия да орташа: әр пайдаланушы 1 не 0. <code>t_vs_z(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: 0/1 тізімдерін құрып, олардан Welch t есептеңіз, сондай-ақ unpooled z = (p_B − p_A) / √(p_A(1 − p_A)/n_A + p_B(1 − p_B)/n_B) есептеңіз; <code>(t, z)</code> қайтарсын. Үлкен n-де екеуі іс жүзінде тең.</p>",
   "starter": "import math, statistics\n\ndef t_vs_z(x_a, n_a, x_b, n_b):\n    pass\n",
   "solution": "import math, statistics\n\ndef t_vs_z(x_a, n_a, x_b, n_b):\n    a = [1] * x_a + [0] * (n_a - x_a)\n    b = [1] * x_b + [0] * (n_b - x_b)\n    se_t = math.sqrt(statistics.variance(a) / n_a + statistics.variance(b) / n_b)\n    t = (statistics.mean(b) - statistics.mean(a)) / se_t\n    p_a, p_b = x_a / n_a, x_b / n_b\n    se_z = math.sqrt(p_a * (1 - p_a) / n_a + p_b * (1 - p_b) / n_b)\n    z = (p_b - p_a) / se_z\n    return t, z\n",
   "hints": [
    "Тізім: <code>[1] * x_a + [0] * (n_a - x_a)</code>.",
    "Айырмашылық тек дисперсияда: <code>variance</code> n − 1-ге, p(1 − p) n-ге бөледі."
   ],
   "check": {
    "tests": "_t, _z = t_vs_z(200, 2000, 250, 2000)\nassert abs(_z - 2.5039) < 0.001, f\"Unpooled z ≈ 2.504 болуы керек, сізде {_z:.4f}\"\nassert abs(_t - _z) < 0.002, f\"Үлкен n-де t ≈ z: {_t:.4f} мен {_z:.4f}\"\n_t2, _z2 = t_vs_z(3, 10, 7, 10)\nassert abs(_t2 - 1.8516) < 0.001 and abs(_z2 - 1.9518) < 0.001, f\"Кіші n-де айырма байқалады: t ≈ 1.852, z ≈ 1.952, сізде {_t2:.4f}, {_z2:.4f}\"",
    "mustInclude": [
     "def t_vs_z"
    ]
   }
  }
 ],
 "ab-7": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Power үшін z",
   "prompt": "<p><code>z_power(power)</code> функциясын жазыңыз: формуладағы z_{power} мәнін қайтарсын.</p><p>Мысалы, <code>z_power(0.8)</code> ≈ <code>0.842</code>, <code>z_power(0.9)</code> ≈ <code>1.282</code>.</p>",
   "starter": "from statistics import NormalDist\n\ndef z_power(power):\n    pass\n",
   "solution": "from statistics import NormalDist\n\ndef z_power(power):\n    return NormalDist().inv_cdf(power)\n",
   "hints": [
    "<code>NormalDist().inv_cdf(power)</code> — бір жақты."
   ],
   "check": {
    "tests": "assert abs(z_power(0.8) - 0.841621) < 1e-5, \"z_power(0.8) ≈ 0.842\"\nassert abs(z_power(0.9) - 1.281552) < 1e-5, \"z_power(0.9) ≈ 1.282\"\nassert abs(z_power(0.5)) < 1e-12, \"z_power(0.5) = 0\"",
    "mustInclude": [
     "def z_power"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Салыстырмалы MDE",
   "prompt": "<p>Менеджер «конверсияны 20%-ға көтергіміз келеді» дейді. <code>abs_mde(p1, rel)</code> функциясын жазыңыз: салыстырмалы MDE-ні абсолют MDE-ге айналдырсын.</p><p>Мысалы, baseline 5%, +20%: <code>abs_mde(0.05, 0.2)</code> → <code>0.01</code> (1 п.п.).</p>",
   "starter": "def abs_mde(p1, rel):\n    pass\n",
   "solution": "def abs_mde(p1, rel):\n    return p1 * rel\n",
   "hints": [
    "Абсолют MDE = baseline × салыстырмалы өсім."
   ],
   "check": {
    "tests": "assert abs(abs_mde(0.05, 0.2) - 0.01) < 1e-12, \"abs_mde(0.05, 0.2) = 0.01\"\nassert abs(abs_mde(0.10, 0.2) - 0.02) < 1e-12, \"abs_mde(0.10, 0.2) = 0.02 (0.20 емес!)\"",
    "mustInclude": [
     "def abs_mde"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Тест ұзақтығы",
   "prompt": "<p><code>days_needed(n_per_group, daily_users, groups=2)</code> функциясын жазыңыз: күніне <code>daily_users</code> жаңа пайдаланушы келсе, барлық топқа жеткілікті адам жиналатын күн санын (жоғары дөңгелектеп) қайтарсын.</p><p>Мысалы, <code>days_needed(3839, 1000)</code> → <code>8</code>.</p>",
   "starter": "import math\n\ndef days_needed(n_per_group, daily_users, groups=2):\n    pass\n",
   "solution": "import math\n\ndef days_needed(n_per_group, daily_users, groups=2):\n    return math.ceil(n_per_group * groups / daily_users)\n",
   "hints": [
    "Барлық керек адам: <code>n_per_group * groups</code>.",
    "<code>math.ceil</code> жоғары дөңгелектейді."
   ],
   "check": {
    "tests": "assert days_needed(3839, 1000) == 8, \"3839 × 2 / 1000 = 7.68 → 8 күн\"\nassert days_needed(8155, 1000) == 17, \"8155 × 2 / 1000 = 16.31 → 17 күн\"\nassert days_needed(1000, 500, groups=3) == 6, \"3 нұсқа: 3000 / 500 = 6 күн\"",
    "mustInclude": [
     "def days_needed"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Орташа үшін таңдама",
   "prompt": "<p>Метрика — орташа чек. Бір топқа керек n: n = 2 × (z_{1−α/2} + z_{power})² × σ² / δ², мұнда σ — SD, δ — байқағымыз келетін айырма. <code>n_mean(sigma, delta, alpha=0.05, power=0.8)</code> функциясын жазыңыз (жоғары дөңгелектеп).</p><p>Мысалы, <code>n_mean(10, 2)</code> → <code>393</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef n_mean(sigma, delta, alpha=0.05, power=0.8):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef n_mean(sigma, delta, alpha=0.05, power=0.8):\n    z_a = NormalDist().inv_cdf(1 - alpha / 2)\n    z_b = NormalDist().inv_cdf(power)\n    return math.ceil(2 * (z_a + z_b) ** 2 * sigma ** 2 / delta ** 2)\n",
   "hints": [
    "z_a мен z_b — сабақтағыдай.",
    "<code>math.ceil(2 * (z_a + z_b) ** 2 * sigma ** 2 / delta ** 2)</code>"
   ],
   "check": {
    "tests": "assert n_mean(10, 2) == 393, \"n_mean(10, 2) = 393 болуы керек\"\nassert n_mean(3000, 500) == 566, \"Чек: σ = 3000 ₸, δ = 500 ₸ → 566\"\nassert n_mean(10, 2, power=0.9) > 393, \"power өссе, n өседі: power параметрін қолданыңыз\"",
    "mustInclude": [
     "def n_mean"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Қуатты есептеу",
   "prompt": "<p>Керісінше сұрақ: n белгілі, power қанша? Жуық формула: power ≈ cdf(|MDE| / √((p₁(1 − p₁) + p₂(1 − p₂)) / n) − z_{1−α/2}). <code>power_of(p1, mde, n, alpha=0.05)</code> функциясын жазыңыз.</p><p>Мысалы, <code>power_of(0.1, 0.02, 3839)</code> ≈ <code>0.80</code>, ал <code>power_of(0.05, 0.01, 2000)</code> ≈ <code>0.28</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef power_of(p1, mde, n, alpha=0.05):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef power_of(p1, mde, n, alpha=0.05):\n    p2 = p1 + mde\n    se = math.sqrt((p1 * (1 - p1) + p2 * (1 - p2)) / n)\n    z_a = NormalDist().inv_cdf(1 - alpha / 2)\n    return NormalDist().cdf(abs(mde) / se - z_a)\n",
   "hints": [
    "SE = √((p₁(1 − p₁) + p₂(1 − p₂)) / n), p₂ = p₁ + MDE.",
    "<code>NormalDist().cdf(abs(mde) / se - z_a)</code>"
   ],
   "check": {
    "tests": "assert abs(power_of(0.1, 0.02, 3839) - 0.8) < 0.001, \"3839 адамда power ≈ 0.80 (sample_size формуласымен сәйкес)\"\nassert abs(power_of(0.05, 0.01, 2000) - 0.2835) < 0.001, \"power_of(0.05, 0.01, 2000) ≈ 0.28: трафик жеткіліксіз\"\nassert power_of(0.1, 0.02, 8000) > power_of(0.1, 0.02, 3839), \"n өссе, power өседі\"",
    "mustInclude": [
     "def power_of"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Байқалатын ең кіші эффект",
   "prompt": "<p>Трафик шектеулі: бір топқа тек <code>n</code> адам. <code>mde_for(p1, n)</code> функциясын жазыңыз: 0.001 қадаммен MDE = 0.001, 0.002, ... тексеріп, сабақтағы <code>sample_size(p1, mde)</code> ≤ n болатын ең кіші MDE-ні қайтарсын.</p><p>Мысалы, <code>mde_for(0.1, 3839)</code> → <code>0.02</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef mde_for(p1, n):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef sample_size(p1, mde, alpha=0.05, power=0.8):\n    p2 = p1 + mde\n    z_a = NormalDist().inv_cdf(1 - alpha / 2)\n    z_b = NormalDist().inv_cdf(power)\n    var = p1 * (1 - p1) + p2 * (1 - p2)\n    return math.ceil((z_a + z_b) ** 2 * var / mde ** 2)\n\ndef mde_for(p1, n):\n    k = 1\n    while sample_size(p1, k / 1000) > n:\n        k += 1\n    return k / 1000\n",
   "hints": [
    "Алдымен сабақтағы <code>sample_size</code> функциясын жазыңыз.",
    "MDE-ні <code>k / 1000</code> түрінде алып, k-ны 1-ден арттырыңыз."
   ],
   "check": {
    "tests": "assert mde_for(0.1, 3839) == 0.02, \"mde_for(0.1, 3839) = 0.02\"\nassert mde_for(0.1, 1000) == 0.041, \"1000 адаммен тек ≈ 4.1 п.п. эффектті байқаймыз\"\nassert mde_for(0.05, 8155) == 0.01, \"mde_for(0.05, 8155) = 0.01\"",
    "mustInclude": [
     "def mde_for"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Тең емес бөлу",
   "prompt": "<p>Кейде трафиктің көбі B-ға беріледі: n_B = k × n_A. Онда n_A = (z_{1−α/2} + z_{power})² × (p₁(1 − p₁) + p₂(1 − p₂) / k) / MDE². <code>sample_size_ratio(p1, mde, k, alpha=0.05, power=0.8)</code> функциясын жазыңыз: <code>(n_a, n_b)</code> қайтарсын, n_a = ceil(...), n_b = ceil(k × n_a).</p><p>Мысалы, <code>sample_size_ratio(0.1, 0.02, 1)</code> → <code>(3839, 3839)</code>, <code>sample_size_ratio(0.1, 0.02, 2)</code> → <code>(2803, 5606)</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef sample_size_ratio(p1, mde, k, alpha=0.05, power=0.8):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef sample_size_ratio(p1, mde, k, alpha=0.05, power=0.8):\n    p2 = p1 + mde\n    z_a = NormalDist().inv_cdf(1 - alpha / 2)\n    z_b = NormalDist().inv_cdf(power)\n    n_a = math.ceil((z_a + z_b) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2) / k) / mde ** 2)\n    return n_a, math.ceil(k * n_a)\n",
   "hints": [
    "k = 1 болғанда формула сабақтағыға айналады.",
    "B дисперсиясы k-ға бөлінеді: <code>p2 * (1 - p2) / k</code>."
   ],
   "check": {
    "tests": "assert sample_size_ratio(0.1, 0.02, 1) == (3839, 3839), \"k = 1: (3839, 3839) — сабақтағы мысал\"\nassert sample_size_ratio(0.1, 0.02, 2) == (2803, 5606), \"k = 2: (2803, 5606)\"\n_a, _b = sample_size_ratio(0.1, 0.02, 3)\nassert _a + _b > 2 * 3839, \"Тең емес бөлу жалпы адам санын көбейтеді\"",
    "mustInclude": [
     "def sample_size_ratio"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қуатты симуляциямен тексеру",
   "prompt": "<p>Формуланы тексеріңіз: baseline 20%, MDE 10 п.п. үшін <code>sample_size</code> бір топқа 291 береді. <code>sim_power(p_a, p_b, n, k, alpha=0.05)</code> функциясын жазыңыз: <code>k</code> рет A/B тест ойнатыңыз (әр топта <code>n</code> адам, шын конверсиялар <code>p_a</code> мен <code>p_b</code>), әрқайсысына екі пропорцияның z-тестін жасап, p &lt; α болған тесттер үлесін қайтарсын.</p><p>Нәтиже ≈ 0.8 болуы керек.</p>",
   "starter": "import math, random\nfrom statistics import NormalDist\n\ndef sim_power(p_a, p_b, n, k, alpha=0.05):\n    pass\n",
   "solution": "import math, random\nfrom statistics import NormalDist\n\ndef two_prop_z(x_a, n_a, x_b, n_b):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    p = (x_a + x_b) / (n_a + n_b)\n    se = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = (p_b - p_a) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef sim_power(p_a, p_b, n, k, alpha=0.05):\n    hits = 0\n    for _ in range(k):\n        x_a = sum(1 for _ in range(n) if random.random() < p_a)\n        x_b = sum(1 for _ in range(n) if random.random() < p_b)\n        z, p = two_prop_z(x_a, n, x_b, n)\n        if p < alpha:\n            hits += 1\n    return hits / k\n",
   "hints": [
    "Әр тестте екі топтың x-ін бөлек санаңыз.",
    "5-сабақтағы <code>two_prop_z</code> функциясын қолданыңыз."
   ],
   "check": {
    "tests": "import random as _r\n_r.seed(20)\n_v = sim_power(0.2, 0.3, 291, 400)\nassert 0.73 < _v < 0.87, f\"n = 291 болғанда power ≈ 0.8 болуы керек, сізде {_v:.3f}\"\n_r.seed(21)\n_v0 = sim_power(0.2, 0.2, 291, 400)\nassert _v0 < 0.1, f\"Эффект жоқ болса, «маңызды» нәтиже тек ≈ 5% болуы керек, сізде {_v0:.3f}\"",
    "mustInclude": [
     "def sim_power"
    ]
   }
  }
 ],
 "ab-8": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Bonferroni түзетуі",
   "prompt": "<p><code>bonferroni(alpha, m)</code> функциясын жазыңыз: <code>m</code> тест жүргізілсе, әр тестке арналған түзетілген шекті қайтарсын.</p><p>Мысалы, <code>bonferroni(0.05, 5)</code> → <code>0.01</code>.</p>",
   "starter": "def bonferroni(alpha, m):\n    pass\n",
   "solution": "def bonferroni(alpha, m):\n    return alpha / m\n",
   "hints": [
    "α / m."
   ],
   "check": {
    "tests": "assert abs(bonferroni(0.05, 5) - 0.01) < 1e-12, \"bonferroni(0.05, 5) = 0.01\"\nassert bonferroni(0.05, 1) == 0.05, \"Бір тест: түзету жоқ\"",
    "mustInclude": [
     "def bonferroni"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Көп салыстыру тәуекелі",
   "prompt": "<p><code>fwer(alpha, m)</code> функциясын жазыңыз: <code>m</code> тәуелсіз тесттің әрқайсысы α деңгейінде болса, кемінде біреуінің кездейсоқ «маңызды» болу ықтималдығын қайтарсын.</p><p>Мысалы, <code>fwer(0.05, 5)</code> ≈ <code>0.226</code>.</p>",
   "starter": "def fwer(alpha, m):\n    pass\n",
   "solution": "def fwer(alpha, m):\n    return 1 - (1 - alpha) ** m\n",
   "hints": [
    "«Кемінде бір» — толықтауыш: 1 − (1 − α)<sup>m</sup>."
   ],
   "check": {
    "tests": "assert abs(fwer(0.05, 5) - (1 - 0.95 ** 5)) < 1e-12, \"fwer(0.05, 5) ≈ 0.226\"\nassert abs(fwer(0.05, 1) - 0.05) < 1e-12, \"Бір тест: α\"\nassert fwer(0.05, 20) > 0.6, \"20 сегмент: тәуекел 64%-дан асады\"",
    "mustInclude": [
     "def fwer"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "easy",
   "xp": 10,
   "title": "Құрылғы бойынша бөлу",
   "prompt": "<p>Рандомизацияны тексеру: <code>assignments</code> кестесінен әр құрылғы (<code>device</code>) үшін пайдаланушылар санын <code>n</code> шығарыңыз.</p>",
   "starter": "SELECT device\nFROM assignments;",
   "solution": "SELECT device, COUNT(*) AS n FROM assignments GROUP BY device;",
   "hints": [
    "<code>COUNT(*) AS n</code> және <code>GROUP BY device</code>."
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Маңызды метрикалар",
   "prompt": "<p><code>significant(pvals, alpha=0.05)</code> функциясын жазыңыз: <code>pvals</code> — <code>{метрика: p-value}</code>. Bonferroni түзетуімен (α / m, m — метрика саны) маңызды метрикалардың атын алфавит бойынша сұрыпталған тізім етіп қайтарсын.</p><p>Мысалы, <code>{\"конверсия\": 0.004, \"чек\": 0.03, \"қайту\": 0.2}</code> → <code>[\"конверсия\"]</code> (шек 0.0167).</p>",
   "starter": "def significant(pvals, alpha=0.05):\n    pass\n",
   "solution": "def significant(pvals, alpha=0.05):\n    limit = alpha / len(pvals)\n    return sorted(name for name, p in pvals.items() if p < limit)\n",
   "hints": [
    "Шек: <code>alpha / len(pvals)</code>.",
    "Соңында <code>sorted(...)</code>."
   ],
   "check": {
    "tests": "assert significant({\"конверсия\": 0.004, \"чек\": 0.03, \"қайту\": 0.2}) == [\"конверсия\"], \"Шек 0.05 / 3 ≈ 0.0167: тек конверсия\"\nassert significant({\"a\": 0.001, \"b\": 0.002}) == [\"a\", \"b\"], \"Шек 0.025: екеуі де\"\nassert significant({\"a\": 0.02, \"b\": 0.03, \"c\": 0.04, \"d\": 0.01, \"e\": 0.011}) == [], \"5 метрика, шек 0.01: ешқайсысы (0.01 < 0.01 емес)\"",
    "mustInclude": [
     "def significant"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Тең емес бөлудегі SRM",
   "prompt": "<p>Тест 30/70 бөлуге жоспарланған. <code>srm_p_ratio(n_a, n_b, q)</code> функциясын жазыңыз: <code>q</code> — A-ға жоспарланған үлес. N = n_a + n_b, z = (n_a − N × q) / √(N × q × (1 − q)), екі жақты p-value қайтарсын.</p><p>Мысалы, <code>srm_p_ratio(3100, 6900, 0.3)</code> ≈ <code>0.029</code>.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef srm_p_ratio(n_a, n_b, q):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef srm_p_ratio(n_a, n_b, q):\n    n = n_a + n_b\n    z = (n_a - n * q) / math.sqrt(n * q * (1 - q))\n    return 2 * (1 - NormalDist().cdf(abs(z)))\n",
   "hints": [
    "q = 0.5 болса, сабақтағы <code>srm_p</code> шығады.",
    "SD = <code>math.sqrt(n * q * (1 - q))</code>."
   ],
   "check": {
    "tests": "assert abs(srm_p_ratio(3100, 6900, 0.3) - 0.0290) < 0.0005, \"srm_p_ratio(3100, 6900, 0.3) ≈ 0.029\"\nassert abs(srm_p_ratio(5120, 4880, 0.5) - 0.016395) < 1e-4, \"q = 0.5: сабақтағы мысал ≈ 0.0164\"\nassert abs(srm_p_ratio(300, 700, 0.3) - 1) < 1e-9, \"Жоспарға дәл сәйкес: p = 1\"",
    "mustInclude": [
     "def srm_p_ratio"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "medium",
   "xp": 15,
   "title": "Нұсқалар үлесі",
   "prompt": "<p>Әр нұсқа үшін <code>variant</code>, пайдаланушылар саны <code>n</code> және барлық пайдаланушыдағы үлесі <code>share</code> (<code>ROUND(..., 3)</code>) шығарыңыз. Ішкі сұрау <code>(SELECT COUNT(*) FROM assignments)</code> жалпы санды береді.</p>",
   "starter": "",
   "solution": "SELECT variant, COUNT(*) AS n, ROUND(COUNT(*) * 1.0 / (SELECT COUNT(*) FROM assignments), 3) AS share FROM assignments GROUP BY variant;",
   "hints": [
    "<code>COUNT(*) * 1.0 / (SELECT COUNT(*) FROM assignments)</code>",
    "<code>* 1.0</code> бүтін санды бөлуден сақтайды."
   ],
   "check": {
    "mustInclude": [
     "GROUP BY"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Құрылғы бойынша SRM",
   "prompt": "<p><code>srm_by_device(rows)</code> функциясын жазыңыз: <code>rows</code> — <code>(variant, device)</code> жұптарының тізімі (50/50 бөлу жоспарланған). Әр құрылғы үшін A мен B топ көлемдерінің SRM p-value-ын (сабақтағы <code>srm_p</code> формуласы) <code>{құрылғы: p}</code> сөздігі ретінде қайтарсын.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef srm_by_device(rows):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef srm_p(n_a, n_b):\n    n = n_a + n_b\n    z = (n_a - n / 2) / math.sqrt(n * 0.25)\n    return 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef srm_by_device(rows):\n    counts = {}\n    for variant, device in rows:\n        c = counts.setdefault(device, {\"A\": 0, \"B\": 0})\n        c[variant] += 1\n    return {d: srm_p(c[\"A\"], c[\"B\"]) for d, c in counts.items()}\n",
   "hints": [
    "Әр құрылғыға <code>{\"A\": 0, \"B\": 0}</code> санауыш жасаңыз.",
    "Сосын әрқайсысына <code>srm_p(c[\"A\"], c[\"B\"])</code>."
   ],
   "check": {
    "tests": "_rows = [(\"A\", \"mobile\")] * 5120 + [(\"B\", \"mobile\")] * 4880 + [(\"A\", \"desktop\")] * 500 + [(\"B\", \"desktop\")] * 500\n_r = srm_by_device(_rows)\nassert set(_r) == {\"mobile\", \"desktop\"}, \"Әр құрылғыға бір p-value\"\nassert abs(_r[\"mobile\"] - 0.016395) < 1e-4, \"mobile: 5120 / 4880, p ≈ 0.0164\"\nassert abs(_r[\"desktop\"] - 1) < 1e-9, \"desktop: 500 / 500, p = 1\"",
    "mustInclude": [
     "def srm_by_device"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "hard",
   "xp": 20,
   "title": "Құрылғы мен нұсқа кестесі",
   "prompt": "<p>Әр құрылғы үшін бір жол: <code>device</code>, <code>n_a</code> (A-дағы пайдаланушылар), <code>n_b</code> (B-дағы) және <code>diff</code> = n_b − n_a. <code>device</code> бойынша сұрыптаңыз. Кеңес: <code>SUM(CASE WHEN variant = 'A' THEN 1 ELSE 0 END)</code>.</p>",
   "starter": "",
   "solution": "SELECT device, SUM(CASE WHEN variant = 'A' THEN 1 ELSE 0 END) AS n_a, SUM(CASE WHEN variant = 'B' THEN 1 ELSE 0 END) AS n_b, SUM(CASE WHEN variant = 'B' THEN 1 ELSE 0 END) - SUM(CASE WHEN variant = 'A' THEN 1 ELSE 0 END) AS diff FROM assignments GROUP BY device ORDER BY device;",
   "hints": [
    "Әр нұсқаны <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code> арқылы бөлек санаңыз.",
    "<code>GROUP BY device ORDER BY device</code>"
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "CASE"
    ]
   }
  }
 ],
 "ab-9": [
  {
   "type": "sql",
   "dataset": "ab",
   "level": "easy",
   "xp": 10,
   "title": "Сатып алушылар саны",
   "prompt": "<p>Әр нұсқа үшін <code>variant</code> және сатып алушылар санын <code>buyers</code> шығарыңыз. Мұнда тек сатып алғандар керек, сондықтан <code>JOIN</code> жеткілікті.</p>",
   "starter": "SELECT a.variant\nFROM assignments a\nJOIN conversions c ON c.user_id = a.user_id;",
   "solution": "SELECT a.variant, COUNT(*) AS buyers FROM assignments a JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant;",
   "hints": [
    "<code>COUNT(*) AS buyers</code>, <code>GROUP BY a.variant</code>."
   ],
   "check": {
    "mustInclude": [
     "JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "easy",
   "xp": 10,
   "title": "Жалпы табыс",
   "prompt": "<p><code>conversions</code> кестесінен тесттің жалпы табысын <code>total_revenue</code> және сатып алулар санын <code>orders</code> шығарыңыз.</p>",
   "starter": "SELECT \nFROM conversions;",
   "solution": "SELECT SUM(revenue) AS total_revenue, COUNT(*) AS orders FROM conversions;",
   "hints": [
    "<code>SUM(revenue)</code> және <code>COUNT(*)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "easy",
   "xp": 10,
   "title": "Ең үлкен чек",
   "prompt": "<p>Әр нұсқа үшін <code>variant</code>, ең үлкен чек <code>max_check</code> және ең кіші чек <code>min_check</code> шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT a.variant, MAX(c.revenue) AS max_check, MIN(c.revenue) AS min_check FROM assignments a JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant;",
   "hints": [
    "<code>MAX(c.revenue)</code>, <code>MIN(c.revenue)</code>."
   ]
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "medium",
   "xp": 15,
   "title": "Орташа чек",
   "prompt": "<p>Сатып алғандардың орташа чегі (AOV): әр нұсқа үшін <code>variant</code> және <code>aov</code> (<code>ROUND(..., 1)</code>). Бұл rpu емес: бөлім — тек сатып алғандар.</p>",
   "starter": "",
   "solution": "SELECT a.variant, ROUND(AVG(c.revenue), 1) AS aov FROM assignments a JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant;",
   "hints": [
    "<code>JOIN</code> тек сатып алғандарды қалдырады, сосын <code>AVG(c.revenue)</code>."
   ],
   "check": {
    "mustInclude": [
     "AVG"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "medium",
   "xp": 15,
   "title": "Құрылғы бойынша rpu",
   "prompt": "<p>Әр құрылғы үшін <code>device</code>, <code>users</code> және бір пайдаланушыға табыс <code>rpu</code> (барлық пайдаланушыға бөлінген, <code>ROUND(..., 1)</code>). <code>device</code> бойынша сұрыптаңыз.</p>",
   "starter": "",
   "solution": "SELECT a.device, COUNT(*) AS users, ROUND(SUM(COALESCE(c.revenue, 0)) * 1.0 / COUNT(*), 1) AS rpu FROM assignments a LEFT JOIN conversions c ON c.user_id = a.user_id GROUP BY a.device ORDER BY a.device;",
   "hints": [
    "<code>LEFT JOIN</code> және <code>COALESCE(c.revenue, 0)</code>.",
    "Соңында <code>ORDER BY a.device</code>."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "medium",
   "xp": 15,
   "title": "Сатып алмағандар",
   "prompt": "<p>Әр нұсқа үшін <code>variant</code> және сатып алмаған пайдаланушылар санын <code>non_buyers</code> шығарыңыз.</p>",
   "starter": "",
   "solution": "SELECT a.variant, COUNT(*) - COUNT(c.user_id) AS non_buyers FROM assignments a LEFT JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant;",
   "hints": [
    "<code>LEFT JOIN</code>-нен кейін <code>COUNT(*)</code> — барлығы, <code>COUNT(c.user_id)</code> — сатып алғандар.",
    "Айырмасы — сатып алмағандар."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "hard",
   "xp": 20,
   "title": "Конверсия айырмасы",
   "prompt": "<p>Бір жолда: <code>cr_a</code>, <code>cr_b</code> (әр нұсқаның конверсиясы, <code>ROUND(..., 3)</code>) және <code>diff_pp</code> — айырма пайыздық пунктпен (<code>ROUND(100 * (cr_b − cr_a), 1)</code>, дөңгелектелмеген үлестерден есептеңіз).</p><p>Кеңес: <code>AVG(CASE WHEN a.variant = 'B' THEN (c.user_id IS NOT NULL) END)</code> — B-ның конверсиясы.</p>",
   "starter": "",
   "solution": "SELECT ROUND(AVG(CASE WHEN a.variant = 'A' THEN (c.user_id IS NOT NULL) * 1.0 END), 3) AS cr_a, ROUND(AVG(CASE WHEN a.variant = 'B' THEN (c.user_id IS NOT NULL) * 1.0 END), 3) AS cr_b, ROUND(100 * (AVG(CASE WHEN a.variant = 'B' THEN (c.user_id IS NOT NULL) * 1.0 END) - AVG(CASE WHEN a.variant = 'A' THEN (c.user_id IS NOT NULL) * 1.0 END)), 1) AS diff_pp FROM assignments a LEFT JOIN conversions c ON c.user_id = a.user_id;",
   "hints": [
    "<code>CASE WHEN ... THEN ... END</code> басқа нұсқаға NULL береді, ал <code>AVG</code> NULL-ды елемейді.",
    "<code>(c.user_id IS NOT NULL)</code> сатып алғанға 1, әйтпесе 0 береді."
   ],
   "check": {
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  },
  {
   "type": "sql",
   "dataset": "ab",
   "level": "hard",
   "xp": 20,
   "title": "Ірі сатып алушылар үлесі",
   "prompt": "<p>Әр нұсқа үшін <code>variant</code> және 10 000 ₸ немесе одан көп төлеген пайдаланушылардың <b>барлық</b> пайдаланушыдағы үлесін <code>big_share</code> (<code>ROUND(..., 3)</code>) шығарыңыз. <code>variant</code> бойынша сұрыптаңыз.</p>",
   "starter": "",
   "solution": "SELECT a.variant, ROUND(AVG(CASE WHEN c.revenue >= 10000 THEN 1.0 ELSE 0 END), 3) AS big_share FROM assignments a LEFT JOIN conversions c ON c.user_id = a.user_id GROUP BY a.variant ORDER BY a.variant;",
   "hints": [
    "<code>LEFT JOIN</code>: сатып алмағандар да бөлімге кіреді.",
    "<code>AVG(CASE WHEN c.revenue &gt;= 10000 THEN 1.0 ELSE 0 END)</code> — NULL шартқа сәйкес келмейді, 0 береді."
   ],
   "check": {
    "ordered": true,
    "mustInclude": [
     "LEFT JOIN"
    ]
   }
  }
 ],
 "ab-10": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Табалдырықтан жоғары ма",
   "prompt": "<p><code>above_threshold(ci, thr)</code> функциясын жазыңыз: айырма интервалы <code>ci = (low, high)</code> толығымен бизнес табалдырығынан <code>thr</code> жоғары (low ≥ thr) болса, <code>True</code> қайтарсын.</p><p>Мысалы, <code>above_threshold((0.0054, 0.0446), 0.01)</code> → <code>False</code>.</p>",
   "starter": "def above_threshold(ci, thr):\n    pass\n",
   "solution": "def above_threshold(ci, thr):\n    return ci[0] >= thr\n",
   "hints": [
    "Төменгі шекараны ғана қарау жеткілікті."
   ],
   "check": {
    "tests": "assert above_threshold((0.0054, 0.0446), 0.01) is False, \"Төменгі шекара 0.5 п.п. < 1 п.п.\"\nassert above_threshold((0.012, 0.03), 0.01) is True, \"Толығымен 1 п.п.-тен жоғары\"",
    "mustInclude": [
     "def above_threshold"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Айлық қосымша табыс",
   "prompt": "<p><code>monthly_gain(diff, users, value)</code> функциясын жазыңыз: конверсия айырмасы <code>diff</code> (үлес), айына <code>users</code> пайдаланушы, бір сатып алудың құны <code>value</code> ₸. Айлық қосымша табысты қайтарсын.</p><p>Мысалы, <code>monthly_gain(0.025, 100000, 4000)</code> → <code>10000000</code> ₸.</p>",
   "starter": "def monthly_gain(diff, users, value):\n    pass\n",
   "solution": "def monthly_gain(diff, users, value):\n    return diff * users * value\n",
   "hints": [
    "Қосымша сатып алулар: diff × users. Әрқайсысы value ₸."
   ],
   "check": {
    "tests": "assert abs(monthly_gain(0.025, 100000, 4000) - 10000000) < 1e-3, \"0.025 × 100 000 × 4000 = 10 000 000 ₸\"\nassert abs(monthly_gain(0.0004, 2000000, 625) - 500000) < 1e-3, \"+0.04 п.п. 2 млн пайдаланушыда: ≈ 500 000 ₸\"",
    "mustInclude": [
     "def monthly_gain"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Нөлді қамти ма",
   "prompt": "<p><code>includes_zero(ci)</code> функциясын жазыңыз: интервал 0-ді қамтыса (low ≤ 0 ≤ high), <code>True</code> қайтарсын. Бұл нәтиже статистикалық маңызды емес дегенді білдіреді.</p>",
   "starter": "def includes_zero(ci):\n    pass\n",
   "solution": "def includes_zero(ci):\n    return ci[0] <= 0 <= ci[1]\n",
   "hints": [
    "<code>ci[0] &lt;= 0 &lt;= ci[1]</code>"
   ],
   "check": {
    "tests": "assert includes_zero((-0.01, 0.02)) is True, \"(−0.01, 0.02) 0-ді қамтиды\"\nassert includes_zero((0.0054, 0.0446)) is False, \"Толығымен оң: маңызды\"\nassert includes_zero((-0.03, -0.01)) is False, \"Толығымен теріс: B нашар, бірақ маңызды\"",
    "mustInclude": [
     "def includes_zero"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шешім ережесі",
   "prompt": "<p>Сабақтағы кестені функцияға айналдырыңыз. <code>verdict(ci, thr, max_width)</code> келесі ретпен тексерсін:</p><ol><li>low ≥ thr → <code>\"енгіземіз\"</code>;</li><li>low &gt; 0 → <code>\"тәуекелмен енгіземіз\"</code>;</li><li>high &lt; 0 немесе интервал ені (high − low) ≤ max_width → <code>\"енгізбейміз\"</code>;</li><li>әйтпесе → <code>\"дерек жеткіліксіз\"</code>.</li></ol>",
   "starter": "def verdict(ci, thr, max_width):\n    pass\n",
   "solution": "def verdict(ci, thr, max_width):\n    low, high = ci\n    if low >= thr:\n        return \"енгіземіз\"\n    if low > 0:\n        return \"тәуекелмен енгіземіз\"\n    if high < 0 or high - low <= max_width:\n        return \"енгізбейміз\"\n    return \"дерек жеткіліксіз\"\n",
   "hints": [
    "Шарттарды берілген ретпен <code>if</code> арқылы тексеріңіз."
   ],
   "check": {
    "tests": "assert verdict((0.012, 0.03), 0.01, 0.01) == \"енгіземіз\", \"Толығымен табалдырықтан жоғары\"\nassert verdict((0.0054, 0.0446), 0.01, 0.01) == \"тәуекелмен енгіземіз\", \"0-ден жоғары, табалдырықты қиып өтеді\"\nassert verdict((-0.002, 0.003), 0.01, 0.01) == \"енгізбейміз\", \"0-ді қамтиды, тар\"\nassert verdict((-0.03, 0.04), 0.01, 0.01) == \"дерек жеткіліксіз\", \"0-ді қамтиды, кең\"\nassert verdict((-0.05, -0.01), 0.01, 0.01) == \"енгізбейміз\", \"B нашар\"",
    "mustInclude": [
     "def verdict"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Салыстырмалы өсім",
   "prompt": "<p><code>lift(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: салыстырмалы өсімді p_B / p_A − 1 қайтарсын.</p><p>Мысалы, 10% → 12.5%: <code>lift(200, 2000, 250, 2000)</code> → <code>0.25</code> (+25%).</p>",
   "starter": "def lift(x_a, n_a, x_b, n_b):\n    pass\n",
   "solution": "def lift(x_a, n_a, x_b, n_b):\n    return (x_b / n_b) / (x_a / n_a) - 1\n",
   "hints": [
    "Абсолют айырма (2.5 п.п.) мен салыстырмалы өсімді (25%) шатастырмаңыз."
   ],
   "check": {
    "tests": "assert abs(lift(200, 2000, 250, 2000) - 0.25) < 1e-12, \"lift(200, 2000, 250, 2000) = 0.25\"\nassert abs(lift(500, 10000, 504, 10000) - 0.008) < 1e-12, \"5.00% → 5.04%: +0.8%\"\nassert lift(100, 1000, 80, 1000) < 0, \"B нашар болса, өсім теріс\"",
    "mustInclude": [
     "def lift"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Шығынды ақтай ма",
   "prompt": "<p><code>worth_it(ci, users, value, cost)</code> функциясын жазыңыз: сақ бағалау — айырма интервалының <b>төменгі</b> шекарасы бойынша айлық қосымша табыс (low × users × value) айлық шығыннан <code>cost</code> кем болмаса, <code>True</code> қайтарсын.</p><p>Мысалы, <code>worth_it((0.0054, 0.0446), 100000, 4000, 2000000)</code> → <code>True</code> (2.16 млн ≥ 2 млн).</p>",
   "starter": "def worth_it(ci, users, value, cost):\n    pass\n",
   "solution": "def worth_it(ci, users, value, cost):\n    return ci[0] * users * value >= cost\n",
   "hints": [
    "Табыс: <code>ci[0] * users * value</code>."
   ],
   "check": {
    "tests": "assert worth_it((0.0054, 0.0446), 100000, 4000, 2000000) is True, \"0.0054 × 100 000 × 4000 = 2.16 млн ≥ 2 млн\"\nassert worth_it((0.0054, 0.0446), 100000, 4000, 3000000) is False, \"2.16 млн < 3 млн\"\nassert worth_it((-0.001, 0.01), 100000, 4000, 0) is False, \"Төменгі шекара теріс: сақ бағада табыс жоқ\"",
    "mustInclude": [
     "def worth_it"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Толық есеп",
   "prompt": "<p><code>report(x_a, n_a, x_b, n_b, thr)</code> функциясын жазыңыз: сөздік қайтарсын:</p><ul><li><code>\"diff\"</code> — p_B − p_A;</li><li><code>\"low\"</code>, <code>\"high\"</code> — айырманың 95% CI-ы (unpooled SE);</li><li><code>\"p\"</code> — екі пропорцияның z-тесті бойынша екі жақты p-value (pooled SE);</li><li><code>\"launch\"</code> — <code>True</code>, егер p &lt; 0.05 және low ≥ thr.</li></ul>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef report(x_a, n_a, x_b, n_b, thr):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef report(x_a, n_a, x_b, n_b, thr):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    d = p_b - p_a\n    se_u = math.sqrt(p_a * (1 - p_a) / n_a + p_b * (1 - p_b) / n_b)\n    z95 = NormalDist().inv_cdf(0.975)\n    low, high = d - z95 * se_u, d + z95 * se_u\n    p = (x_a + x_b) / (n_a + n_b)\n    se_p = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    z = d / se_p\n    p_value = 2 * (1 - NormalDist().cdf(abs(z)))\n    return {\"diff\": d, \"low\": low, \"high\": high, \"p\": p_value, \"launch\": p_value < 0.05 and low >= thr}\n",
   "hints": [
    "CI үшін unpooled SE (10-сабақ), тест үшін pooled SE (5-сабақ).",
    "Сөздік кілттері: <code>\"diff\"</code>, <code>\"low\"</code>, <code>\"high\"</code>, <code>\"p\"</code>, <code>\"launch\"</code>."
   ],
   "check": {
    "tests": "_r = report(200, 2000, 250, 2000, 0.01)\nassert isinstance(_r, dict), \"Сөздік қайтарыңыз\"\nassert abs(_r[\"diff\"] - 0.025) < 1e-12, \"diff = 0.025\"\nassert abs(_r[\"low\"] - 0.005441) < 1e-4 and abs(_r[\"high\"] - 0.044559) < 1e-4, \"CI ≈ (0.0054, 0.0446): unpooled SE\"\nassert abs(_r[\"p\"] - 0.01235) < 1e-4, \"p ≈ 0.0124: pooled SE\"\nassert _r[\"launch\"] is False, \"Төменгі шекара 1 п.п.-тен кіші: launch = False\"\nassert report(1000, 10000, 1300, 10000, 0.01)[\"launch\"] is True, \"10% → 13%, n = 10 000: launch = True\"",
    "mustInclude": [
     "def report"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Қорытынды сөйлем",
   "prompt": "<p><code>summary(x_a, n_a, x_b, n_b)</code> функциясын жазыңыз: менеджерге арналған бір жолды қайтарсын:</p><p><code>\"B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012\"</code></p><p>Ережелер: айырма мен CI шекаралары пайыздық пунктпен, белгісімен, бір ондық таңбамен (<code>f\"{v:+.1f}\"</code>); p — үш ондық таңбамен (<code>f\"{p:.3f}\"</code>); CI unpooled SE-мен, p pooled z-тестпен; шекаралар арасында «…» таңбасы.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef summary(x_a, n_a, x_b, n_b):\n    pass\n",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef summary(x_a, n_a, x_b, n_b):\n    p_a, p_b = x_a / n_a, x_b / n_b\n    d = p_b - p_a\n    se_u = math.sqrt(p_a * (1 - p_a) / n_a + p_b * (1 - p_b) / n_b)\n    z95 = NormalDist().inv_cdf(0.975)\n    low, high = d - z95 * se_u, d + z95 * se_u\n    p = (x_a + x_b) / (n_a + n_b)\n    se_p = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\n    p_value = 2 * (1 - NormalDist().cdf(abs(d / se_p)))\n    return f\"B: {100 * d:+.1f} п.п. (95% CI {100 * low:+.1f}…{100 * high:+.1f}), p = {p_value:.3f}\"\n",
   "hints": [
    "Үлестерді 100-ге көбейтіп, <code>f\"{v:+.1f}\"</code> арқылы форматтаңыз.",
    "Алдыңғы тапсырмадағы есептеулерді қайта қолданыңыз."
   ],
   "check": {
    "tests": "_s = summary(200, 2000, 250, 2000)\nassert _s == \"B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012\", f\"Күтілген: 'B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012', сізде: {_s!r}\"\n_s2 = summary(250, 2000, 200, 2000)\nassert _s2 == \"B: -2.5 п.п. (95% CI -4.5…-0.5), p = 0.012\", f\"B нашар болса, белгі теріс: {_s2!r}\"",
    "mustInclude": [
     "def summary"
    ]
   }
  }
 ],
 "ab-chi": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Күтілетін кесте",
   "prompt": "<p><code>expected_table(table)</code> функциясын кітапханасыз жазыңыз: <code>table</code> — сандар кестесі (тізімдер тізімі). H0 бойынша күтілетін кестені қайтарсын: әр ұяшық E = жол қосындысы × баған қосындысы / жалпы саны.</p><p>Мысалы, <code>expected_table([[30, 70], [45, 55]])</code> → <code>[[37.5, 62.5], [37.5, 62.5]]</code>.</p>",
   "starter": "def expected_table(table):\n    pass\n",
   "solution": "def expected_table(table):\n    rows = [sum(r) for r in table]\n    cols = [sum(c) for c in zip(*table)]\n    total = sum(rows)\n    return [[r * c / total for c in cols] for r in rows]\n",
   "hints": [
    "Жол қосындылары: <code>[sum(r) for r in table]</code>; баған қосындылары: <code>[sum(c) for c in zip(*table)]</code>.",
    "Екі деңгейлі list comprehension: <code>[[r * c / total for c in cols] for r in rows]</code>."
   ],
   "check": {
    "tests": "_e = expected_table([[30, 70], [45, 55]])\nassert _e is not None, \"expected_table мән қайтаруы керек\"\nassert len(_e) == 2 and all(abs(_a - _b) < 1e-9 for _ra, _rb in zip(_e, [[37.5, 62.5], [37.5, 62.5]]) for _a, _b in zip(_ra, _rb)), f\"[[37.5, 62.5], [37.5, 62.5]] болуы керек, сізде {_e}\"\n_e2 = expected_table([[10, 20, 30], [20, 20, 20]])\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_e2[0], [15, 20, 25])), f\"2 × 3 кестеде бірінші жол [15, 20, 25] болуы керек, сізде {_e2[0]}\"\n_t = [[90, 1410], [95, 905], [30, 470]]\n_e3 = expected_table(_t)\nassert all(abs(sum(_r) - sum(_o)) < 1e-9 for _r, _o in zip(_e3, _t)), \"Күтілетін кестенің жол қосындылары нақты кестемен бірдей\"\nassert abs(_e3[1][0] - 1000 * 215 / 3000) < 1e-9, \"desktop сатып алушылары: 1000 × 215 / 3000 ≈ 71.67\"",
    "mustInclude": [
     "def expected_table"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Bonferroni түзетуі",
   "prompt": "<p>χ² тесті «бір жерде айырма бар» деді, сіз бірнеше жұпты салыстырдыңыз. <code>bonferroni(pvalues, alpha=0.05)</code> функциясын жазыңыз: әр p-value үшін <code>p &lt; alpha / m</code> болса <code>True</code>, әйтпесе <code>False</code> тізімін қайтарсын (m — салыстырулар саны).</p><p>Мысалы, <code>bonferroni([0.01, 0.02, 0.04])</code> → <code>[True, False, False]</code>: шек 0.05 / 3 ≈ 0.0167.</p>",
   "starter": "def bonferroni(pvalues, alpha=0.05):\n    pass\n",
   "solution": "def bonferroni(pvalues, alpha=0.05):\n    thr = alpha / len(pvalues)\n    return [p < thr for p in pvalues]\n",
   "hints": [
    "Шек: <code>alpha / len(pvalues)</code>."
   ],
   "check": {
    "tests": "assert bonferroni([0.01, 0.02, 0.04]) == [True, False, False], \"[0.01, 0.02, 0.04]: шек 0.0167, тек бірінші маңызды\"\nassert bonferroni([0.001] * 5) == [True] * 5, \"0.001 < 0.05 / 5 = 0.01: бәрі маңызды\"\nassert bonferroni([0.03, 0.2]) == [False, False], \"Екі салыстыру: шек 0.025, 0.03 өтпейді\"\nassert bonferroni([0.03, 0.2], alpha=0.1) == [True, False], \"alpha = 0.1 болса, шек 0.05\"",
    "mustInclude": [
     "def bonferroni"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Акцияға дейін және кейін",
   "prompt": "<p>Сол 8 клиенттің акцияға дейінгі және кейінгі айлық шығыны (₸) берілген. Есептеңіз:</p><ul><li><code>mean_diff</code> — айырмалардың (after − before) орташасы;</li><li><code>p_paired</code> — <code>stats.ttest_rel(after, before)</code> p-value-ы;</li><li><code>p_welch</code> — жұптастыруды елемейтін <code>stats.ttest_ind(after, before, equal_var=False)</code> p-value-ы.</li></ul><p>Екі p-value-ды салыстырыңыз: клиенттер арасындағы үлкен шашырау тәуелсіз тестте эффектіні жасырады.</p>",
   "starter": "from scipy import stats\nbefore = [5200, 8100, 3900, 12000, 6500, 7300, 4800, 9900]\nafter = [5500, 8550, 4020, 12600, 6700, 7680, 4950, 10410]\nmean_diff = None\np_paired = None\np_welch = None\n",
   "solution": "from scipy import stats\nbefore = [5200, 8100, 3900, 12000, 6500, 7300, 4800, 9900]\nafter = [5500, 8550, 4020, 12600, 6700, 7680, 4950, 10410]\nmean_diff = sum(a - b for a, b in zip(after, before)) / len(before)\np_paired = stats.ttest_rel(after, before).pvalue\np_welch = stats.ttest_ind(after, before, equal_var=False).pvalue\nprint(mean_diff, round(p_paired, 5), round(p_welch, 3))\n",
   "hints": [
    "Айырмалар: <code>[a - b for a, b in zip(after, before)]</code>.",
    "Әр тесттің нәтижесінен <code>.pvalue</code> алыңыз."
   ],
   "check": {
    "tests": "from scipy import stats as _st\n_b = [5200, 8100, 3900, 12000, 6500, 7300, 4800, 9900]\n_a = [5500, 8550, 4020, 12600, 6700, 7680, 4950, 10410]\nassert mean_diff is not None and abs(float(mean_diff) - 338.75) < 1e-9, \"mean_diff = 2710 / 8 = 338.75 ₸\"\nassert p_paired is not None and abs(float(p_paired) - _st.ttest_rel(_a, _b).pvalue) < 1e-12, \"p_paired: stats.ttest_rel(after, before).pvalue\"\nassert p_welch is not None and abs(float(p_welch) - _st.ttest_ind(_a, _b, equal_var=False).pvalue) < 1e-12, \"p_welch: stats.ttest_ind(after, before, equal_var=False).pvalue\"\nassert float(p_paired) < 0.01 < 0.5 < float(p_welch), \"Жұптасқан тест эффектіні көреді (p < 0.01), тәуелсіз тест көрмейді (p > 0.5)\"",
    "mustInclude": [
     "ttest_rel",
     "ttest_ind"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "χ² қолмен",
   "prompt": "<p><code>chi2_by_hand(table)</code> функциясын жазыңыз: кез келген өлшемді кесте үшін <code>(chi2, dof)</code> қайтарсын.</p><pre><code>χ² = Σ (O − E)² / E        df = (жолдар − 1) × (бағандар − 1)</code></pre><p>Тест нәтижесін <code>stats.chi2_contingency(table, correction=False)</code>-пен салыстырады (Yates түзетуінсіз).</p>",
   "starter": "def chi2_by_hand(table):\n    pass\n",
   "solution": "def chi2_by_hand(table):\n    rows = [sum(r) for r in table]\n    cols = [sum(c) for c in zip(*table)]\n    total = sum(rows)\n    chi2 = 0\n    for i, r in enumerate(table):\n        for j, o in enumerate(r):\n            e = rows[i] * cols[j] / total\n            chi2 += (o - e) ** 2 / e\n    dof = (len(rows) - 1) * (len(cols) - 1)\n    return chi2, dof\n",
   "hints": [
    "Алдымен күтілетін ұяшық: <code>e = rows[i] * cols[j] / total</code>.",
    "Екі цикл: <code>for i, r in enumerate(table)</code> және <code>for j, o in enumerate(r)</code>."
   ],
   "check": {
    "tests": "from scipy import stats as _st\nassert chi2_by_hand([[30, 70], [45, 55]]) is not None, \"chi2_by_hand мән қайтаруы керек\"\nfor _t in ([[30, 70], [45, 55]], [[90, 1410], [95, 905], [30, 470]], [[12, 30, 18], [20, 25, 35], [8, 15, 37]]):\n    _c, _p, _d, _e = _st.chi2_contingency(_t, correction=False)\n    _r = chi2_by_hand(_t)\n    assert abs(float(_r[0]) - _c) < 1e-6, f\"{_t} үшін χ² ≈ {_c:.3f} болуы керек, сізде {float(_r[0]):.3f}\"\n    assert int(_r[1]) == _d, f\"{_t} үшін df = {_d} болуы керек, сізде {_r[1]}\"",
    "mustInclude": [
     "def chi2_by_hand"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "2 × 2 кесте: χ² = z²",
   "prompt": "<p>A: 2 000 пайдаланушының 200-і сатып алды, B: 2 000-нің 250-і. Есептеңіз:</p><ul><li><code>z</code> — екі пропорцияның z-статистикасы (pooled SE, ab-5), B − A бағытында;</li><li><code>chi2_nc</code>, <code>p_nc</code> — <code>stats.chi2_contingency(table, correction=False)</code> нәтижесі;</li><li><code>p_yates</code> — әдепкі (Yates түзетуі бар) <code>chi2_contingency(table)</code> p-value-ы.</li></ul><p><code>table</code> — 2 × 2 кесте: жолдар A, B; бағандар «сатып алды», «алмады».</p>",
   "starter": "import math\nfrom scipy import stats\nx_a, n_a, x_b, n_b = 200, 2000, 250, 2000\ntable = None\nz = None\nchi2_nc = None\np_nc = None\np_yates = None\n",
   "solution": "import math\nfrom scipy import stats\nx_a, n_a, x_b, n_b = 200, 2000, 250, 2000\ntable = [[x_a, n_a - x_a], [x_b, n_b - x_b]]\np = (x_a + x_b) / (n_a + n_b)\nse = math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))\nz = (x_b / n_b - x_a / n_a) / se\nchi2_nc, p_nc, _, _ = stats.chi2_contingency(table, correction=False)\np_yates = stats.chi2_contingency(table)[1]\nprint(round(z, 3), round(z ** 2, 3), round(chi2_nc, 3), round(p_nc, 4), round(p_yates, 4))\n",
   "hints": [
    "Кесте: <code>[[x_a, n_a - x_a], [x_b, n_b - x_b]]</code> — «алмады» бағанын ұмытпаңыз.",
    "Pooled үлес: <code>p = (x_a + x_b) / (n_a + n_b)</code>, SE = √(p(1 − p)(1/n_a + 1/n_b))."
   ],
   "check": {
    "tests": "from statistics import NormalDist as _N\nassert table is not None and [list(_r) for _r in table] == [[200, 1800], [250, 1750]], \"table = [[200, 1800], [250, 1750]] болуы керек\"\nassert z is not None and abs(float(z) - 2.50196) < 1e-4, f\"z ≈ 2.50 болуы керек (pooled SE), сізде {z}\"\nassert chi2_nc is not None and abs(float(chi2_nc) - float(z) ** 2) < 1e-6, \"Yates-сіз 2 × 2 кестеде χ² = z²\"\nassert p_nc is not None and abs(float(p_nc) - 2 * (1 - _N().cdf(abs(float(z))))) < 1e-6, \"p_nc екі жақты z-тесттің p-value-ымен бірдей: 2 × (1 − Φ(|z|))\"\nassert p_yates is not None and float(p_yates) > float(p_nc), \"Yates түзетуі p-ны сәл үлкейтеді: p_yates > p_nc\"",
    "mustInclude": [
     "chi2_contingency"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бағыт: greater, less, two-sided",
   "prompt": "<p>Жаңа дизайнда (B) орташа чек төмендеген сияқты. Welch t-тестінің үш нұсқасын есептеңіз, әр шақыруда алдымен <code>b</code>, сосын <code>a</code>:</p><ul><li><code>p_two</code> — <code>alternative='two-sided'</code>;</li><li><code>p_greater</code> — «B орташасы үлкен»;</li><li><code>p_less</code> — «B орташасы кіші».</li></ul><p>Бақылаңыз: <code>p_greater + p_less = 1</code>, ал <code>p_two</code> — кішісінің екі еселенгені. Сондықтан бағытты деректі көрмей тұрып таңдайды.</p>",
   "starter": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(11)\na = rng.normal(5000, 800, 60)\nb = rng.normal(4700, 800, 60)\np_two = None\np_greater = None\np_less = None\n",
   "solution": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(11)\na = rng.normal(5000, 800, 60)\nb = rng.normal(4700, 800, 60)\np_two = stats.ttest_ind(b, a, equal_var=False).pvalue\np_greater = stats.ttest_ind(b, a, equal_var=False, alternative='greater').pvalue\np_less = stats.ttest_ind(b, a, equal_var=False, alternative='less').pvalue\nprint(round(p_two, 4), round(p_greater, 4), round(p_less, 4))\n",
   "hints": [
    "<code>stats.ttest_ind(b, a, equal_var=False, alternative='less').pvalue</code>",
    "<code>equal_var=False</code> әр шақыруда керек."
   ],
   "check": {
    "tests": "from scipy import stats as _st\n_t = _st.ttest_ind(b, a, equal_var=False, alternative='two-sided').pvalue\n_g = _st.ttest_ind(b, a, equal_var=False, alternative='greater').pvalue\n_l = _st.ttest_ind(b, a, equal_var=False, alternative='less').pvalue\nassert p_two is not None and abs(float(p_two) - _t) < 1e-9, f\"p_two ≈ {_t:.4f} болуы керек: Welch, алдымен b, сосын a\"\nassert p_greater is not None and abs(float(p_greater) - _g) < 1e-9, f\"p_greater ≈ {_g:.4f} болуы керек: alternative='greater'\"\nassert p_less is not None and abs(float(p_less) - _l) < 1e-9, f\"p_less ≈ {_l:.4f} болуы керек: alternative='less'\"\nassert abs(float(p_greater) + float(p_less) - 1) < 1e-9, \"Екі бір жақты p-value қосындысы 1\"\nassert abs(float(p_two) - 2 * min(float(p_greater), float(p_less))) < 1e-9, \"Екі жақты p = 2 × min(бір жақты p)\"",
    "mustInclude": [
     "ttest_ind"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Жұптық салыстыру",
   "prompt": "<p>χ² тесті нұсқалар арасында айырма бар деді. Енді қай жұптар өзгеше екенін табамыз. <code>pairwise(table, alpha=0.05)</code> функциясын жазыңыз: <code>table</code> — жолдары нұсқалар, бағандары [сатып алды, алмады]. Функция <code>(pvals, significant)</code> қайтарсын:</p><ul><li><code>pvals</code> — <code>{(i, j): p}</code> сөздігі барлық жұптар үшін (i &lt; j), p — <code>stats.chi2_contingency([table[i], table[j]], correction=False)</code> p-value-ы;</li><li><code>significant</code> — Bonferroni бойынша маңызды жұптардың сұрыпталған тізімі: p &lt; alpha / жұптар саны.</li></ul><p>Жұптарды <code>itertools.combinations(range(len(table)), 2)</code> береді.</p>",
   "starter": "from itertools import combinations\nfrom scipy import stats\n\ndef pairwise(table, alpha=0.05):\n    pass\n",
   "solution": "from itertools import combinations\nfrom scipy import stats\n\ndef pairwise(table, alpha=0.05):\n    pvals = {}\n    for i, j in combinations(range(len(table)), 2):\n        pvals[(i, j)] = stats.chi2_contingency([table[i], table[j]], correction=False)[1]\n    thr = alpha / len(pvals)\n    significant = sorted(k for k, p in pvals.items() if p < thr)\n    return pvals, significant\n",
   "hints": [
    "Бір жұп: <code>stats.chi2_contingency([table[i], table[j]], correction=False)[1]</code> — екінші мән p-value.",
    "Шек: <code>alpha / len(pvals)</code>; тізімді <code>sorted(...)</code> арқылы сұрыптаңыз."
   ],
   "check": {
    "tests": "from scipy import stats as _st\n_t = [[80, 920], [95, 905], [130, 870], [90, 910]]\n_r = pairwise(_t)\nassert _r is not None and len(_r) == 2, \"(pvals, significant) жұбын қайтарыңыз\"\n_pv, _sig = _r\nassert len(_pv) == 6, f\"4 нұсқада 6 жұп болуы керек, сізде {len(_pv)}\"\nassert abs(_pv[(1, 2)] - _st.chi2_contingency([_t[1], _t[2]], correction=False)[1]) < 1e-9, \"(1, 2) жұбының p-value-ы: chi2_contingency([table[1], table[2]], correction=False)\"\nassert _pv[(1, 2)] < 0.05 and (1, 2) not in _sig, \"(1, 2): p ≈ 0.013 < 0.05, бірақ Bonferroni шегі 0.05 / 6 ≈ 0.0083, сондықтан маңызды емес\"\nassert list(_sig) == [(0, 2), (2, 3)], f\"Маңызды жұптар [(0, 2), (2, 3)] болуы керек, сізде {_sig}\"\nassert list(pairwise(_t, alpha=0.2)[1]) == [(0, 2), (1, 2), (2, 3)], \"alpha = 0.2 болса, шек 0.033: (1, 2) де қосылады\"\nassert list(pairwise([[100, 900], [120, 880], [150, 850]])[1]) == [(0, 2)], \"Сабақтағы кестеде тек A мен C өзгеше: [(0, 2)]\"",
    "mustInclude": [
     "def pairwise",
     "chi2_contingency"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "U статистикасы қолмен",
   "prompt": "<p>Mann–Whitney тесті «B-дан кездейсоқ алынған мән A-дағыдан жоғары ма?» деп сұрайды. Оның статистикасы U — B мәні A мәнінен үлкен болған жұптар саны (тең болса, 0.5). Екі функция жазыңыз:</p><ul><li><code>u_stat(b, a)</code> — барлық (b, a) жұптары бойынша U;</li><li><code>superiority(b, a)</code> — U / (len(a) × len(b)): B-ның кездейсоқ мәні A-ның кездейсоқ мәнінен жоғары болу ықтималдығы.</li></ul><p>Нәтиже <code>stats.mannwhitneyu(b, a).statistic</code>-пен сәйкес келуі керек. Тест шеткі мәннің U-ге әсерін де тексереді.</p>",
   "starter": "from scipy import stats\n\ndef u_stat(b, a):\n    pass\n\ndef superiority(b, a):\n    pass\n",
   "solution": "from scipy import stats\n\ndef u_stat(b, a):\n    u = 0\n    for x in b:\n        for y in a:\n            if x > y:\n                u += 1\n            elif x == y:\n                u += 0.5\n    return u\n\ndef superiority(b, a):\n    return u_stat(b, a) / (len(a) * len(b))\n",
   "hints": [
    "Екі цикл: <code>for x in b</code>, <code>for y in a</code>; <code>x &gt; y</code> болса +1, тең болса +0.5.",
    "Бөлгіш — жұптар саны: <code>len(a) * len(b)</code>."
   ],
   "check": {
    "tests": "from scipy import stats as _st\n_a = [5, 7, 6, 8, 4]\n_b = [9, 7, 8, 10, 6]\nassert u_stat(_b, _a) is not None, \"u_stat мән қайтаруы керек\"\nassert abs(u_stat(_b, _a) - _st.mannwhitneyu(_b, _a).statistic) < 1e-9, f\"U ≈ {_st.mannwhitneyu(_b, _a).statistic} болуы керек, сізде {u_stat(_b, _a)}. Тең мәндер 0.5 береді\"\nassert abs(u_stat([3, 4], [1, 2]) - 4) < 1e-9 and abs(u_stat([1, 2], [3, 4])) < 1e-9, \"[3, 4] мен [1, 2]: барлық 4 жұпта B үлкен, кері ретте 0\"\nassert abs(superiority([5, 5], [5, 5]) - 0.5) < 1e-9, \"Барлық мән тең болса, ықтималдық 0.5\"\nassert abs(superiority(_b, _a) + superiority(_a, _b) - 1) < 1e-9, \"superiority(b, a) + superiority(a, b) = 1\"\n_w = [9, 7, 8, 1000000, 6]\nassert abs(u_stat(_w, _a) - u_stat(_b, _a)) < 1e-9, \"Ең үлкен мәнді 1 000 000-ға ауыстырсақ, U өзгермейді: тест реттерге қарайды\"\nimport numpy as _np\n_g = _np.random.default_rng(2)\n_x = _np.round(_g.lognormal(8, 1, 40), -2)\n_y = _np.round(_g.lognormal(8.3, 1, 30), -2)\nassert abs(u_stat(list(_y), list(_x)) - _st.mannwhitneyu(_y, _x).statistic) < 1e-6, \"Қайталанатын мәндері бар үлкен деректе де U scipy-мен сәйкес келуі керек\"",
    "mustInclude": [
     "def u_stat",
     "def superiority"
    ]
   }
  }
 ],
 "ab-boot": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Бір bootstrap таңдама",
   "prompt": "<p><code>resample(x, seed=0)</code> функциясын жазыңыз: <code>rng = np.random.default_rng(seed)</code> құрып, <code>x</code>-тен қайтарып салумен <code>len(x)</code> көлемді бір таңдама қайтарсын.</p><p>Мысалы, <code>resample([2, 4, 4, 10])</code> — төрт мәннен тұратын массив, кейбір мән қайталануы мүмкін.</p>",
   "starter": "import numpy as np\n\ndef resample(x, seed=0):\n    pass\n",
   "solution": "import numpy as np\n\ndef resample(x, seed=0):\n    rng = np.random.default_rng(seed)\n    x = np.asarray(x)\n    return rng.choice(x, size=len(x), replace=True)\n",
   "hints": [
    "<code>rng.choice(x, size=len(x), replace=True)</code>"
   ],
   "check": {
    "tests": "import numpy as _np\n_x = _np.arange(1, 51)\n_s = resample(_x)\nassert _s is not None and len(_s) == 50, \"Таңдама көлемі len(x) = 50 болуы керек\"\nassert all(_v in set(_x.tolist()) for _v in _np.asarray(_s).tolist()), \"Барлық мән x-тен алынуы керек\"\nassert len(set(_np.asarray(_s).tolist())) < 50, \"Қайтарып салумен кейбір мәндер қайталанады: replace=True\"\n_ref = _np.random.default_rng(0).choice(_x, size=50, replace=True)\nassert _np.array_equal(_np.asarray(_s), _ref), \"np.random.default_rng(seed) және rng.choice(x, size=len(x), replace=True) қолданыңыз\"\nassert not _np.array_equal(_np.asarray(resample(_x, seed=1)), _ref), \"Басқа seed басқа таңдама беруі керек\"",
    "mustInclude": [
     "def resample"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Percentile интервалы",
   "prompt": "<p>Bootstrap мәндері <code>vals</code> дайын. <code>percentile_ci(vals, level=0.95)</code> функциясын жазыңыз: percentile әдісімен <code>(low, high)</code> қайтарсын — <code>(1 − level) / 2</code> және <code>1 − (1 − level) / 2</code> квантильдері.</p><p>Мысалы, <code>percentile_ci(np.arange(1001))</code> → <code>(25.0, 975.0)</code>.</p>",
   "starter": "import numpy as np\n\ndef percentile_ci(vals, level=0.95):\n    pass\n",
   "solution": "import numpy as np\n\ndef percentile_ci(vals, level=0.95):\n    a = (1 - level) / 2\n    return float(np.quantile(vals, a)), float(np.quantile(vals, 1 - a))\n",
   "hints": [
    "<code>a = (1 - level) / 2</code>; <code>np.quantile(vals, a)</code> және <code>np.quantile(vals, 1 - a)</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_r = percentile_ci(_np.arange(1001))\nassert _r is not None and len(_r) == 2, \"(low, high) жұбын қайтарыңыз\"\nassert abs(_r[0] - 25) < 1e-9 and abs(_r[1] - 975) < 1e-9, f\"0..1000 үшін 95% интервал (25, 975) болуы керек, сізде {_r}\"\n_r9 = percentile_ci(_np.arange(1001), level=0.9)\nassert abs(_r9[0] - 50) < 1e-9 and abs(_r9[1] - 950) < 1e-9, \"level = 0.9: (50, 950), level параметрін қолданыңыз\"\n_r5 = percentile_ci([3, 1, 2], level=0.0)\nassert abs(_r5[0] - 2) < 1e-9 and abs(_r5[1] - 2) < 1e-9, \"level = 0 болса, екі шекара да медиана\"",
    "mustInclude": [
     "def percentile_ci"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Bootstrap орташалар",
   "prompt": "<p><code>boot_means(x, n_boot=2000, seed=0)</code> функциясын жазыңыз: <code>x</code>-тен қайтарып салумен <code>n_boot</code> таңдама алып, әрқайсысының орташасын NumPy массиві ретінде қайтарсын.</p><p>Тест тексереді: bootstrap орташалардың SD-ы формуладағы SE = SD / √n мәніне жуық.</p>",
   "starter": "import numpy as np\n\ndef boot_means(x, n_boot=2000, seed=0):\n    rng = np.random.default_rng(seed)\n    pass\n",
   "solution": "import numpy as np\n\ndef boot_means(x, n_boot=2000, seed=0):\n    rng = np.random.default_rng(seed)\n    x = np.asarray(x)\n    return np.array([rng.choice(x, size=len(x), replace=True).mean() for _ in range(n_boot)])\n",
   "hints": [
    "Бір қайталау: <code>rng.choice(x, size=len(x), replace=True).mean()</code>.",
    "Тізімді <code>np.array([...])</code> арқылы массивке айналдырыңыз."
   ],
   "check": {
    "tests": "import numpy as _np\n_x = _np.random.default_rng(4).exponential(5000, 400)\n_m = boot_means(_x)\nassert _m is not None and len(_m) == 2000, \"n_boot = 2000 орташа болуы керек\"\n_se = _x.std(ddof=1) / len(_x) ** 0.5\nassert abs(float(_np.mean(_m)) - _x.mean()) < 0.2 * _se, \"Bootstrap орташалардың орташасы таңдама орташасына жуық\"\nassert abs(float(_np.std(_m)) - _se) < 0.1 * _se, f\"SD(bootstrap орташалар) ≈ SE = {_se:.0f} болуы керек, сізде {float(_np.std(_m)):.0f}. Әр таңдама көлемі len(x)\"\nassert len(boot_means(_x, n_boot=300)) == 300, \"n_boot параметрін қолданыңыз\"",
    "mustInclude": [
     "def boot_means"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Медианалар айырмасының CI-ы",
   "prompt": "<p>A/B тест: чектер қатты қисық, сондықтан медианаларды салыстырамыз. <code>diff_ci(a, b, stat, n_boot=2000, level=0.95, seed=0)</code> функциясын жазыңыз: әр қайталауда <b>әр топтан бөлек</b> resample алып, <code>stat(b*) − stat(a*)</code> есептеп, percentile әдісімен <code>(low, high)</code> қайтарсын. Бір <code>rng</code> жеткілікті.</p><p>Интервал 0-ді қамтымаса, айырма α = 1 − level деңгейінде маңызды.</p>",
   "starter": "import numpy as np\n\ndef diff_ci(a, b, stat, n_boot=2000, level=0.95, seed=0):\n    rng = np.random.default_rng(seed)\n    pass\n",
   "solution": "import numpy as np\n\ndef diff_ci(a, b, stat, n_boot=2000, level=0.95, seed=0):\n    rng = np.random.default_rng(seed)\n    a, b = np.asarray(a), np.asarray(b)\n    vals = []\n    for _ in range(n_boot):\n        ra = rng.choice(a, size=len(a), replace=True)\n        rb = rng.choice(b, size=len(b), replace=True)\n        vals.append(stat(rb) - stat(ra))\n    q = (1 - level) / 2\n    return float(np.quantile(vals, q)), float(np.quantile(vals, 1 - q))\n",
   "hints": [
    "Әр топтың өз көлемі: <code>rng.choice(a, size=len(a), replace=True)</code>, b үшін де солай.",
    "Айырманы тізімге жинап, соңында <code>np.quantile</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_g = _np.random.default_rng(8)\n_a = _g.lognormal(8.0, 0.9, 250)\n_b = _g.lognormal(8.3, 0.9, 200)\n_r = diff_ci(_a, _b, _np.median)\nassert _r is not None and len(_r) == 2, \"(low, high) жұбын қайтарыңыз\"\n_lo, _hi = float(_r[0]), float(_r[1])\n_obs = _np.median(_b) - _np.median(_a)\nassert _lo < _obs < _hi, \"Интервал байқалған айырманы қамтуы керек\"\nassert _lo > 0, f\"B медианасы айқын жоғары: төменгі шекара 0-ден үлкен болуы керек, сізде {_lo:.0f}\"\n_rr = _np.random.default_rng(0); _v = []\nfor _ in range(2000):\n    _ra = _rr.choice(_a, size=len(_a), replace=True); _rb = _rr.choice(_b, size=len(_b), replace=True); _v.append(_np.median(_rb) - _np.median(_ra))\n_e = (_np.quantile(_v, 0.025), _np.quantile(_v, 0.975)); _w = _e[1] - _e[0]\nassert abs(_lo - _e[0]) < 0.25 * _w and abs(_hi - _e[1]) < 0.25 * _w, f\"Интервал шамамен ({_e[0]:.0f}, {_e[1]:.0f}) болуы керек, сізде ({_lo:.0f}, {_hi:.0f}). Әр топты өз көлемімен бөлек resample етіңіз\"\n_z = diff_ci(_a, _g.permutation(_a), _np.median)\nassert float(_z[0]) < 0 < float(_z[1]), \"Бірдей топтарда интервал 0-ді қамтуы керек\"\n_r8 = diff_ci(_a, _b, _np.median, level=0.8)\nassert float(_r8[1]) - float(_r8[0]) < 0.85 * (_hi - _lo), \"80% интервал 95%-дан тар: level параметрін қолданыңыз\"",
    "mustInclude": [
     "def diff_ci"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Дәл permutation тест",
   "prompt": "<p>Шағын деректе араластыру керек емес: барлық бөлуді тізіп шығуға болады. <code>exact_perm_p(a, b)</code> функциясын жазыңыз: біріктірілген деректен <code>len(a)</code> элементті «A» деп таңдаудың барлық тәсілін (<code>itertools.combinations</code> индекстер бойынша) қарап, |mean(B) − mean(A)| ≥ |obs| болған бөлулер үлесін қайтарсын (екі жақты).</p><p>Мысалы, A = [1, 2, 3], B = [4, 5, 9]: 20 бөлудің 2-еуі шеткі, p = 0.1. Сандарды салыстырғанда float қатесіне <code>1e-12</code> қор қалдырыңыз.</p>",
   "starter": "from itertools import combinations\n\ndef exact_perm_p(a, b):\n    pass\n",
   "solution": "from itertools import combinations\n\ndef exact_perm_p(a, b):\n    pooled = list(a) + list(b)\n    n, k = len(pooled), len(a)\n    obs = sum(b) / len(b) - sum(a) / len(a)\n    total = sum(pooled)\n    count = cnt = 0\n    for idx in combinations(range(n), k):\n        sa = sum(pooled[i] for i in idx)\n        d = (total - sa) / (n - k) - sa / k\n        if abs(d) >= abs(obs) - 1e-12:\n            count += 1\n        cnt += 1\n    return count / cnt\n",
   "hints": [
    "Индекстер бойынша: <code>for idx in combinations(range(len(pooled)), len(a))</code>.",
    "A қосындысы <code>sa</code> болса, B қосындысы <code>total - sa</code>.",
    "Шарт: <code>abs(d) &gt;= abs(obs) - 1e-12</code>; бөлгіш — бөлулер саны."
   ],
   "check": {
    "tests": "assert exact_perm_p([1, 2, 3], [4, 5, 9]) is not None, \"exact_perm_p мән қайтаруы керек\"\nassert abs(exact_perm_p([1, 2, 3], [4, 5, 9]) - 0.1) < 1e-9, f\"A = [1, 2, 3], B = [4, 5, 9]: p = 2 / 20 = 0.1 болуы керек, сізде {exact_perm_p([1, 2, 3], [4, 5, 9])}\"\nassert abs(exact_perm_p([1, 2], [3, 4]) - 1 / 3) < 1e-9, \"[1, 2] және [3, 4]: 6 бөлудің 2-еуі шеткі, p = 1/3\"\nassert abs(exact_perm_p([1, 2, 3, 4], [10, 11, 12, 13]) - 2 / 70) < 1e-9, \"8 санды 4 + 4 бөлудің 70 тәсілі, тек 2-еуі шеткі: p = 2/70\"\nassert abs(exact_perm_p([5, 5, 5], [5, 5, 5]) - 1) < 1e-9, \"Топтар бірдей: p = 1\"\nassert abs(exact_perm_p([0.1, 0.2], [0.3, 0.4]) - 1 / 3) < 1e-9, \"Бөлшек сандарда float қатесі: abs(d) >= abs(obs) - 1e-12\"",
    "mustInclude": [
     "def exact_perm_p",
     "combinations"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Бір жақты permutation тест",
   "prompt": "<p>Тест алдында «B орташасы <b>үлкен</b> бе?» деген бағыт таңдалды. <code>perm_greater(a, b, n_perm=3000, seed=0)</code> функциясын жазыңыз: біріктірілген деректі <code>n_perm</code> рет <code>rng.permutation</code> арқылы араластырып, жалған айырма (mean(B*) − mean(A*)) нақты айырмадан <b>кем емес</b> болған жағдайлар үлесін қайтарсын. Модуль алмаймыз.</p>",
   "starter": "import numpy as np\n\ndef perm_greater(a, b, n_perm=3000, seed=0):\n    rng = np.random.default_rng(seed)\n    a, b = np.asarray(a, float), np.asarray(b, float)\n    pass\n",
   "solution": "import numpy as np\n\ndef perm_greater(a, b, n_perm=3000, seed=0):\n    rng = np.random.default_rng(seed)\n    a, b = np.asarray(a, float), np.asarray(b, float)\n    obs = b.mean() - a.mean()\n    pooled = np.concatenate([a, b])\n    count = 0\n    for _ in range(n_perm):\n        s = rng.permutation(pooled)\n        if s[len(a):].mean() - s[:len(a)].mean() >= obs:\n            count += 1\n    return count / n_perm\n",
   "hints": [
    "Сабақтағы <code>perm_test</code> сияқты, бірақ шарт: <code>d &gt;= obs</code>, <code>abs</code> жоқ."
   ],
   "check": {
    "tests": "import numpy as _np\n_g = _np.random.default_rng(12)\n_a = _g.normal(100, 15, 50)\n_b = _g.normal(106, 15, 50)\n_p = perm_greater(_a, _b)\nassert _p is not None, \"perm_greater мән қайтаруы керек\"\ndef _ref(a, b, n, seed):\n    r = _np.random.default_rng(seed); obs = b.mean() - a.mean(); pool = _np.concatenate([a, b]); c = 0\n    for _ in range(n):\n        s = r.permutation(pool); c += (s[len(a):].mean() - s[:len(a)].mean()) >= obs\n    return c / n\n_e = _ref(_a, _b, 3000, 1)\nassert abs(float(_p) - _e) < 0.03, f\"p ≈ {_e:.3f} болуы керек, сізде {float(_p):.3f}. Шарт d >= obs, модульсіз\"\n_q = perm_greater(_b, _a)\nassert abs(float(_p) + float(_q) - 1) < 0.05, f\"Топтарды ауыстырсақ, бір жақты p-лардың қосындысы ≈ 1, сізде {float(_p):.3f} + {float(_q):.3f}\"\nassert float(perm_greater(_a, _a + 50, n_perm=500)) < 0.01, \"B айқын үлкен болса, p ≈ 0\"",
    "mustInclude": [
     "def perm_greater"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "Ratio метрика: пайдаланушы бойынша bootstrap",
   "prompt": "<p>Орташа чек = Σ табыс / Σ тапсырыс. Бір пайдаланушының бірнеше тапсырысы бар, рандомизация бірлігі — пайдаланушы. <code>ratio_ci(revenue, orders, n_boot=2000, level=0.95, seed=0)</code> функциясын жазыңыз: <code>revenue[i]</code> және <code>orders[i]</code> — i-пайдаланушының жалпы табысы мен тапсырыс саны. Функция <code>(ratio, low, high)</code> қайтарсын:</p><ul><li><code>ratio</code> — бүкіл дерек бойынша Σ revenue / Σ orders;</li><li><code>low</code>, <code>high</code> — percentile CI: әр қайталауда <b>пайдаланушы индекстерін</b> қайтарып салумен таңдап (<code>rng.integers(0, n, n)</code>), сол пайдаланушылардың Σ revenue / Σ orders есептеңіз.</li></ul>",
   "starter": "import numpy as np\n\ndef ratio_ci(revenue, orders, n_boot=2000, level=0.95, seed=0):\n    rng = np.random.default_rng(seed)\n    revenue, orders = np.asarray(revenue, float), np.asarray(orders, float)\n    pass\n",
   "solution": "import numpy as np\n\ndef ratio_ci(revenue, orders, n_boot=2000, level=0.95, seed=0):\n    rng = np.random.default_rng(seed)\n    revenue, orders = np.asarray(revenue, float), np.asarray(orders, float)\n    n = len(revenue)\n    vals = []\n    for _ in range(n_boot):\n        idx = rng.integers(0, n, n)\n        vals.append(revenue[idx].sum() / orders[idx].sum())\n    q = (1 - level) / 2\n    return revenue.sum() / orders.sum(), float(np.quantile(vals, q)), float(np.quantile(vals, 1 - q))\n",
   "hints": [
    "Бір индекс жиыны екі массивке де қолданылады: <code>revenue[idx].sum() / orders[idx].sum()</code>. Пайдаланушының табысы мен тапсырыстары бірге қалады.",
    "Бұл қатынастардың орташасы емес: алдымен қосындылар, сосын бөлу."
   ],
   "check": {
    "tests": "import numpy as _np\n_g = _np.random.default_rng(21)\n_o = 1 + _g.poisson(2, 600)\n_rev = _np.array([_g.lognormal(8, 0.8, _k).sum() for _k in _o])\n_r = ratio_ci(_rev, _o)\nassert _r is not None and len(_r) == 3, \"(ratio, low, high) үштігін қайтарыңыз\"\n_ratio, _lo, _hi = (float(_v) for _v in _r)\nassert abs(_ratio - _rev.sum() / _o.sum()) < 1e-6, \"ratio = Σ revenue / Σ orders (қатынастардың орташасы емес)\"\nassert _lo < _ratio < _hi, \"CI ratio-ны қамтуы керек\"\n_rr = _np.random.default_rng(0); _v = []\nfor _ in range(2000):\n    _i = _rr.integers(0, 600, 600); _v.append(_rev[_i].sum() / _o[_i].sum())\n_e = (_np.quantile(_v, 0.025), _np.quantile(_v, 0.975)); _w = _e[1] - _e[0]\nassert abs(_lo - _e[0]) < 0.25 * _w and abs(_hi - _e[1]) < 0.25 * _w, f\"CI шамамен ({_e[0]:.0f}, {_e[1]:.0f}) болуы керек, сізде ({_lo:.0f}, {_hi:.0f}). Пайдаланушы индекстерін resample етіңіз\"\nassert abs((_hi - _lo) - _w) < 0.2 * _w, f\"Интервал ені шамамен {_w:.0f} болуы керек, сізде {_hi - _lo:.0f}\"\n_r9 = ratio_ci(_rev, _o, level=0.8)\nassert float(_r9[2]) - float(_r9[1]) < 0.85 * (_hi - _lo), \"80% интервал 95%-дан тар: level параметрін қолданыңыз\"",
    "mustInclude": [
     "def ratio_ci"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "A/B шешімі: bootstrap және permutation",
   "prompt": "<p>Бір пайдаланушыға табыс (RPU) метрикасы бойынша толық есеп. <code>ab_resampling(a, b, n=2000, seed=0)</code> функциясын жазыңыз: сөздік қайтарсын:</p><ul><li><code>\"diff\"</code> — mean(b) − mean(a);</li><li><code>\"low\"</code>, <code>\"high\"</code> — айырманың 95% bootstrap CI-ы (әр топты бөлек resample, <code>n</code> қайталау);</li><li><code>\"p\"</code> — екі жақты permutation p-value (<code>n</code> араластыру);</li><li><code>\"significant\"</code> — <code>p &lt; 0.05</code>.</li></ul><p>Екі әдіске бір <code>rng = np.random.default_rng(seed)</code> жеткілікті.</p>",
   "starter": "import numpy as np\n\ndef ab_resampling(a, b, n=2000, seed=0):\n    rng = np.random.default_rng(seed)\n    a, b = np.asarray(a, float), np.asarray(b, float)\n    pass\n",
   "solution": "import numpy as np\n\ndef ab_resampling(a, b, n=2000, seed=0):\n    rng = np.random.default_rng(seed)\n    a, b = np.asarray(a, float), np.asarray(b, float)\n    diff = b.mean() - a.mean()\n    boots = [rng.choice(b, size=len(b), replace=True).mean() - rng.choice(a, size=len(a), replace=True).mean() for _ in range(n)]\n    low, high = np.quantile(boots, 0.025), np.quantile(boots, 0.975)\n    pooled = np.concatenate([a, b])\n    count = 0\n    for _ in range(n):\n        s = rng.permutation(pooled)\n        if abs(s[len(a):].mean() - s[:len(a)].mean()) >= abs(diff):\n            count += 1\n    p = count / n\n    return {\"diff\": diff, \"low\": float(low), \"high\": float(high), \"p\": p, \"significant\": p < 0.05}\n",
   "hints": [
    "Bootstrap бөлігі — алдыңғы тапсырмалардағы <code>diff_ci</code>, тек <code>stat = mean</code>.",
    "Permutation бөлігі — сабақтағы <code>perm_test</code>: <code>abs(d) &gt;= abs(diff)</code>.",
    "Сөздік кілттері: <code>\"diff\"</code>, <code>\"low\"</code>, <code>\"high\"</code>, <code>\"p\"</code>, <code>\"significant\"</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_g = _np.random.default_rng(31)\n_a = _np.where(_g.random(1000) < 0.1, _g.lognormal(8, 0.7, 1000), 0.0)\n_b = _np.where(_g.random(1000) < 0.16, _g.lognormal(8, 0.7, 1000), 0.0)\n_r = ab_resampling(_a, _b)\nassert isinstance(_r, dict), \"Сөздік қайтарыңыз\"\nassert abs(float(_r[\"diff\"]) - (_b.mean() - _a.mean())) < 1e-9, \"diff = mean(b) − mean(a)\"\nassert float(_r[\"low\"]) < float(_r[\"diff\"]) < float(_r[\"high\"]), \"CI diff-ті қамтуы керек\"\n_se = (_a.var(ddof=1) / 1000 + _b.var(ddof=1) / 1000) ** 0.5\n_w = float(_r[\"high\"]) - float(_r[\"low\"])\nassert abs(_w - 2 * 1.96 * _se) < 0.2 * 2 * 1.96 * _se, f\"CI ені ≈ 2 × 1.96 × SE ≈ {2 * 1.96 * _se:.0f} болуы керек, сізде {_w:.0f}. Әр топты өз көлемімен resample етіңіз\"\nassert float(_r[\"p\"]) < 0.05 and bool(_r[\"significant\"]) is True, f\"Бұл деректе p < 0.05 және significant = True болуы керек, сізде p = {_r['p']}\"\n_c = _g.permutation(_a)\n_r0 = ab_resampling(_a, _c, n=1000)\nassert float(_r0[\"p\"]) > 0.5 and not bool(_r0[\"significant\"]), f\"Бірдей топтарда p үлкен және significant = False болуы керек, сізде p = {_r0['p']}\"\nassert float(_r0[\"low\"]) < 0 < float(_r0[\"high\"]), \"Бірдей топтарда CI 0-ді қамтуы керек\"",
    "mustInclude": [
     "def ab_resampling"
    ]
   }
  }
 ],
 "ab-cuped": [
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "Difference-in-Differences",
   "prompt": "<p><code>did(treat_before, treat_after, ctrl_before, ctrl_after)</code> функциясын жазыңыз: DiD бағасын қайтарсын — treatment тобының өзгерісінен control тобының өзгерісін шегеріңіз.</p><p>Мысалы, Қостанайда жаңа тариф қосылды (200 → 230), Павлодарда өзгеріс жоқ (150 → 150): <code>did(200, 230, 150, 150)</code> → <code>30</code>.</p>",
   "starter": "def did(treat_before, treat_after, ctrl_before, ctrl_after):\n    pass\n",
   "solution": "def did(treat_before, treat_after, ctrl_before, ctrl_after):\n    return (treat_after - treat_before) - (ctrl_after - ctrl_before)\n",
   "hints": [
    "<code>(treat_after - treat_before) - (ctrl_after - ctrl_before)</code>"
   ],
   "check": {
    "tests": "assert did(200, 230, 150, 150) == 30, \"did(200, 230, 150, 150) = 30 − 0 = 30\"\nassert did(80, 70, 100, 85) == 5, \"Екеуі де түсті: (−10) − (−15) = 5, тариф түсуді жұмсартты\"\nassert did(50, 60, 40, 50) == 0, \"Өзгерістер бірдей: эффект 0\"\nassert did(10, 12, 20, 30) == -8, \"did(10, 12, 20, 30) = 2 − 10 = −8\"",
    "mustInclude": [
     "def did"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "CUPED қанша үнемдейді",
   "prompt": "<p>CUPED-тен кейін дисперсия Var(Y) × (1 − ρ²) болады, ал таңдама көлемі дисперсияға пропорционал. Екі функция жазыңыз:</p><ul><li><code>var_factor(rho)</code> — 1 − ρ²;</li><li><code>n_needed(n, rho)</code> — CUPED-сіз <code>n</code> пайдаланушы керек болса, CUPED-пен сол power-ға қанша керек: n × (1 − ρ²), <code>round</code> арқылы бүтінге дөңгелектеңіз.</li></ul><p>Мысалы, <code>n_needed(10000, 0.7)</code> → <code>5100</code>.</p>",
   "starter": "def var_factor(rho):\n    pass\n\ndef n_needed(n, rho):\n    pass\n",
   "solution": "def var_factor(rho):\n    return 1 - rho ** 2\n\ndef n_needed(n, rho):\n    return round(n * var_factor(rho))\n",
   "hints": [
    "<code>round(n * (1 - rho ** 2))</code>"
   ],
   "check": {
    "tests": "assert var_factor(0.7) is not None and abs(var_factor(0.7) - 0.51) < 1e-12, \"var_factor(0.7) = 1 − 0.49 = 0.51\"\nassert abs(var_factor(-0.5) - 0.75) < 1e-12, \"Теріс корреляция да көмектеседі: 1 − 0.25 = 0.75\"\nassert n_needed(10000, 0.7) == 5100, \"ρ = 0.7: 10 000 × 0.51 = 5 100\"\nassert n_needed(10000, 0.3) == 9100, \"ρ = 0.3: ұтыс небәрі 9%, 9 100\"\nassert n_needed(8000, 0) == 8000, \"ρ = 0: CUPED көмектеспейді\"",
    "mustInclude": [
     "def var_factor",
     "def n_needed"
    ]
   }
  },
  {
   "type": "python",
   "level": "easy",
   "xp": 10,
   "title": "A/A тесттегі жалған дабыл",
   "prompt": "<p>Бірнеше A/A тесттің p-value-лары тізімде. <code>false_positive_rate(pvalues, alpha=0.05)</code> функциясын жазыңыз: <code>p &lt; alpha</code> болған тесттер үлесін қайтарсын. Дұрыс жүйеде ол alpha-ға жуық.</p><p>Мысалы, <code>false_positive_rate([0.01, 0.2, 0.5, 0.03])</code> → <code>0.5</code>.</p>",
   "starter": "def false_positive_rate(pvalues, alpha=0.05):\n    pass\n",
   "solution": "def false_positive_rate(pvalues, alpha=0.05):\n    return sum(p < alpha for p in pvalues) / len(pvalues)\n",
   "hints": [
    "<code>sum(p &lt; alpha for p in pvalues) / len(pvalues)</code>"
   ],
   "check": {
    "tests": "assert false_positive_rate([0.01, 0.2, 0.5, 0.03]) == 0.5, \"4 тесттің 2-еуінде p < 0.05: 0.5\"\nassert abs(false_positive_rate([_i / 100 for _i in range(100)]) - 0.05) < 1e-12, \"Бірқалыпты p-value-ларда үлес ≈ alpha = 0.05\"\nassert false_positive_rate([0.01, 0.2, 0.5, 0.03], alpha=0.02) == 0.25, \"alpha = 0.02: тек 0.01 өтеді, 1/4\"\nassert false_positive_rate([0.05, 0.6]) == 0, \"p = 0.05 маңызды емес: шарт қатаң p < alpha\"",
    "mustInclude": [
     "def false_positive_rate"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "DiD кестеден",
   "prompt": "<p><code>df</code> кестесінде күндік тапсырыстар бар: <code>city</code>, <code>period</code> (<code>\"before\"</code> не <code>\"after\"</code>), <code>orders</code>. <code>did_from_df(df, treat, ctrl)</code> функциясын жазыңыз: әр қала мен кезең бойынша орташаны (<code>groupby</code>) есептеп, DiD бағасын қайтарсын.</p><p>Мысалы, Taraz-да орташа 100 → 130, Shymkent-те 90 → 105 болса, <code>did_from_df(df, \"Taraz\", \"Shymkent\")</code> → <code>15.0</code>.</p>",
   "starter": "import pandas as pd\n\ndef did_from_df(df, treat, ctrl):\n    pass\n",
   "solution": "import pandas as pd\n\ndef did_from_df(df, treat, ctrl):\n    m = df.groupby([\"city\", \"period\"])[\"orders\"].mean()\n    return (m[(treat, \"after\")] - m[(treat, \"before\")]) - (m[(ctrl, \"after\")] - m[(ctrl, \"before\")])\n",
   "hints": [
    "<code>m = df.groupby([\"city\", \"period\"])[\"orders\"].mean()</code>, сосын <code>m[(treat, \"after\")]</code>.",
    "Жолдар саны кезеңдерде әртүрлі болуы мүмкін: қосынды емес, орташа алыңыз."
   ],
   "check": {
    "tests": "import pandas as _pd\n_rows = [(\"Taraz\", \"before\", _v) for _v in (98, 102, 100)] + [(\"Taraz\", \"after\", _v) for _v in (128, 132)] + [(\"Shymkent\", \"before\", _v) for _v in (88, 92, 90, 90)] + [(\"Shymkent\", \"after\", _v) for _v in (100, 110, 105)]\n_df = _pd.DataFrame(_rows, columns=[\"city\", \"period\", \"orders\"])\n_r = did_from_df(_df, \"Taraz\", \"Shymkent\")\nassert _r is not None, \"did_from_df мән қайтаруы керек\"\nassert abs(float(_r) - 15) < 1e-9, f\"DiD = (130 − 100) − (105 − 90) = 15 болуы керек, сізде {_r}. Орташа алыңыз, қосынды емес\"\nassert abs(float(did_from_df(_df, \"Shymkent\", \"Taraz\")) + 15) < 1e-9, \"Қалаларды ауыстырсақ, белгі өзгереді\"\n_df2 = _pd.DataFrame([(\"A\", \"before\", 10), (\"A\", \"after\", 10), (\"B\", \"before\", 5), (\"B\", \"after\", 8), (\"C\", \"before\", 1), (\"C\", \"after\", 100)], columns=[\"city\", \"period\", \"orders\"])\nassert abs(float(did_from_df(_df2, \"A\", \"B\")) + 3) < 1e-9, \"Тек treat және ctrl қалалары қолданылады: A мен B үшін 0 − 3 = −3\"",
    "mustInclude": [
     "def did_from_df",
     "groupby"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "CUPED-тен кейінгі SE",
   "prompt": "<p><code>cuped_se(x_a, y_a, x_b, y_b)</code> функциясын жазыңыз: <code>(effect, se_raw, se_cuped)</code> қайтарсын.</p><ul><li>θ = Cov(x, y) / Var(x) — екі топ біріктіріліп есептеледі; түзету бір ортақ mean(x)-пен: c = y − θ × (x − mean(x));</li><li><code>effect</code> — mean(c_b) − mean(c_a);</li><li><code>se_raw</code> — √(Var(y_a)/n_a + Var(y_b)/n_b), <code>se_cuped</code> — c_a мен c_b үшін сол формула (<code>ddof=1</code>).</li></ul><p>Тест тексереді: se_cuped / se_raw ≈ √(1 − ρ²).</p>",
   "starter": "import numpy as np\n\ndef cuped_se(x_a, y_a, x_b, y_b):\n    pass\n",
   "solution": "import numpy as np\n\ndef se(u, v):\n    return np.sqrt(np.var(u, ddof=1) / len(u) + np.var(v, ddof=1) / len(v))\n\ndef cuped_se(x_a, y_a, x_b, y_b):\n    x = np.concatenate([x_a, x_b])\n    y = np.concatenate([y_a, y_b])\n    theta = np.cov(x, y)[0, 1] / x.var(ddof=1)\n    c_a = y_a - theta * (x_a - x.mean())\n    c_b = y_b - theta * (x_b - x.mean())\n    return c_b.mean() - c_a.mean(), se(y_a, y_b), se(c_a, c_b)\n",
   "hints": [
    "θ: <code>np.cov(x, y)[0, 1] / x.var(ddof=1)</code>, мұнда x, y — <code>np.concatenate</code> арқылы біріктірілген.",
    "SE үшін көмекші функция жазыңыз: <code>np.sqrt(np.var(u, ddof=1) / len(u) + np.var(v, ddof=1) / len(v))</code>."
   ],
   "check": {
    "tests": "import numpy as _np\n_g = _np.random.default_rng(5)\n_n = 2500\n_xa = _g.gamma(2.0, 3000, _n); _xb = _g.gamma(2.0, 3000, _n)\n_ya = 0.8 * _xa + _g.normal(0, 3000, _n); _yb = 0.8 * _xb + _g.normal(0, 3000, _n) + 250\n_r = cuped_se(_xa, _ya, _xb, _yb)\nassert _r is not None and len(_r) == 3, \"(effect, se_raw, se_cuped) үштігін қайтарыңыз\"\n_eff, _sr, _sc = (float(_v) for _v in _r)\n_x = _np.concatenate([_xa, _xb]); _y = _np.concatenate([_ya, _yb])\n_th = _np.cov(_x, _y)[0, 1] / _x.var(ddof=1)\n_ca = _ya - _th * (_xa - _x.mean()); _cb = _yb - _th * (_xb - _x.mean())\nassert abs(_eff - (_cb.mean() - _ca.mean())) < 1e-6, f\"effect ≈ {_cb.mean() - _ca.mean():.1f} болуы керек, сізде {_eff:.1f}. Бір θ және бір ортақ mean(x) қолданыңыз\"\n_e_sr = (_ya.var(ddof=1) / _n + _yb.var(ddof=1) / _n) ** 0.5\nassert abs(_sr - _e_sr) < 1e-6 * _e_sr, f\"se_raw ≈ {_e_sr:.1f} болуы керек, сізде {_sr:.1f}: ddof=1\"\n_rho = _np.corrcoef(_x, _y)[0, 1]\nassert _sc < _sr, \"CUPED-тен кейін SE кішірек болуы керек\"\nassert abs(_sc / _sr - (1 - _rho ** 2) ** 0.5) < 0.02, f\"se_cuped / se_raw ≈ √(1 − ρ²) = {(1 - _rho ** 2) ** 0.5:.3f} болуы керек, сізде {_sc / _sr:.3f}\"",
    "mustInclude": [
     "def cuped_se"
    ]
   }
  },
  {
   "type": "python",
   "level": "medium",
   "xp": 15,
   "title": "Екі түрлі CTR",
   "prompt": "<p>Әр пайдаланушының кликтері мен көрсетілімдері берілген. Екі функция жазыңыз:</p><ul><li><code>global_ctr(clicks, views)</code> — ratio метрика: Σ кликтер / Σ көрсетілімдер;</li><li><code>mean_user_ctr(clicks, views)</code> — әр пайдаланушының өз CTR-ының орташасы: mean(clicks / views).</li></ul><p>Екеуі әртүрлі сұраққа жауап береді: біріншісінде белсенді пайдаланушылардың салмағы көбірек. Тізім де, массив те берілуі мүмкін: <code>np.asarray</code> қолданыңыз.</p>",
   "starter": "import numpy as np\n\ndef global_ctr(clicks, views):\n    pass\n\ndef mean_user_ctr(clicks, views):\n    pass\n",
   "solution": "import numpy as np\n\ndef global_ctr(clicks, views):\n    clicks, views = np.asarray(clicks, float), np.asarray(views, float)\n    return clicks.sum() / views.sum()\n\ndef mean_user_ctr(clicks, views):\n    clicks, views = np.asarray(clicks, float), np.asarray(views, float)\n    return (clicks / views).mean()\n",
   "hints": [
    "Ratio: алдымен қосындылар, сосын бөлу.",
    "Пайдаланушы CTR-ы: <code>clicks / views</code> (массивтер), сосын <code>.mean()</code>."
   ],
   "check": {
    "tests": "import numpy as _np\nassert global_ctr([1, 50], [10, 1000]) is not None, \"global_ctr мән қайтаруы керек\"\nassert abs(float(global_ctr([1, 50], [10, 1000])) - 51 / 1010) < 1e-12, \"global_ctr = 51 / 1010 ≈ 0.0505\"\nassert abs(float(mean_user_ctr([1, 50], [10, 1000])) - 0.075) < 1e-12, \"mean_user_ctr = (0.1 + 0.05) / 2 = 0.075\"\n_c = _np.array([2, 2, 2]); _v = _np.array([20, 20, 20])\nassert abs(float(global_ctr(_c, _v)) - float(mean_user_ctr(_c, _v))) < 1e-12, \"Көрсетілімдер тең болса, екі CTR бірдей\"\nassert abs(float(mean_user_ctr([0, 3], [5, 3])) - 0.5) < 1e-12, \"mean_user_ctr([0, 3], [5, 3]) = (0 + 1) / 2 = 0.5\"",
    "mustInclude": [
     "def global_ctr",
     "def mean_user_ctr"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "A/A симуляциясы: ratio метрика тұзағы",
   "prompt": "<p><code>aa_test(n_sims=300, seed=0)</code> функциясын жазыңыз. Әр симуляцияда <code>make_group</code> арқылы <b>бірдей</b> екі топ жасап (A/A), екі тест жүргізіңіз:</p><ul><li><b>naive</b>: әр көрсетілімді тәуелсіз деп, Σ кликтер / Σ көрсетілімдер үшін екі пропорцияның z-тесті (pooled SE, екі жақты);</li><li><b>user</b>: әр пайдаланушының CTR-ы (clicks / views) бойынша Welch t-тесті (<code>stats.ttest_ind(..., equal_var=False)</code>).</li></ul><p>Функция <code>(fpr_naive, fpr_user)</code> қайтарсын — p &lt; 0.05 болған симуляциялар үлесі. Бір пайдаланушының көрсетілімдері тәуелді, сондықтан naive тест 5%-дан әлдеқайда жиі «маңызды» дейді.</p>",
   "starter": "import numpy as np\nfrom scipy import stats\nfrom statistics import NormalDist\n\ndef make_group(rng, n=500):\n    views = 1 + rng.poisson(20, n)\n    ctr = rng.beta(2, 18, n)\n    clicks = rng.binomial(views, ctr)\n    return clicks, views\n\ndef aa_test(n_sims=300, seed=0):\n    rng = np.random.default_rng(seed)\n    pass\n",
   "solution": "import numpy as np\nfrom scipy import stats\nfrom statistics import NormalDist\n\ndef make_group(rng, n=500):\n    views = 1 + rng.poisson(20, n)\n    ctr = rng.beta(2, 18, n)\n    clicks = rng.binomial(views, ctr)\n    return clicks, views\n\ndef aa_test(n_sims=300, seed=0):\n    rng = np.random.default_rng(seed)\n    naive = user = 0\n    for _ in range(n_sims):\n        c_a, v_a = make_group(rng)\n        c_b, v_b = make_group(rng)\n        p_a, p_b = c_a.sum() / v_a.sum(), c_b.sum() / v_b.sum()\n        p = (c_a.sum() + c_b.sum()) / (v_a.sum() + v_b.sum())\n        se = np.sqrt(p * (1 - p) * (1 / v_a.sum() + 1 / v_b.sum()))\n        z = (p_b - p_a) / se\n        if 2 * (1 - NormalDist().cdf(abs(z))) < 0.05:\n            naive += 1\n        if stats.ttest_ind(c_b / v_b, c_a / v_a, equal_var=False).pvalue < 0.05:\n            user += 1\n    return naive / n_sims, user / n_sims\n",
   "hints": [
    "Naive: n орнына көрсетілімдер саны: SE = √(p(1 − p)(1/ΣV_a + 1/ΣV_b)), p-value = 2 × (1 − Φ(|z|)).",
    "User: <code>stats.ttest_ind(c_b / v_b, c_a / v_a, equal_var=False).pvalue</code>.",
    "Екі санауыш жүргізіп, соңында <code>n_sims</code>-ке бөліңіз."
   ],
   "check": {
    "tests": "_r = aa_test(300, 1)\nassert _r is not None and len(_r) == 2, \"(fpr_naive, fpr_user) жұбын қайтарыңыз\"\n_fn, _fu = float(_r[0]), float(_r[1])\nassert 0.09 < _fn < 0.3, f\"Naive тест A/A-да шамамен 15% жағдайда «маңызды» дейді, сізде {_fn:.3f}. Бөлгіште көрсетілімдер саны болсын\"\nassert 0.015 < _fu < 0.095, f\"Пайдаланушы деңгейіндегі тест ≈ 5% беруі керек, сізде {_fu:.3f}\"\nassert _fn > _fu, \"Naive тесттің жалған дабылы көбірек\"\nassert aa_test(40, 2) == aa_test(40, 2), \"Нәтиже seed бойынша қайталануы керек: rng-ді функция ішінде seed-пен құрыңыз\"",
    "mustInclude": [
     "def aa_test"
    ]
   }
  },
  {
   "type": "python",
   "level": "hard",
   "xp": 20,
   "title": "CUPED: дұрыс және қате covariate",
   "prompt": "<p><code>cuped_effect(x_a, y_a, x_b, y_b)</code> функциясын жазыңыз: CUPED түзетілген эффектіні mean(c_b) − mean(c_a) қайтарсын (бір θ екі топ бойынша, бір ортақ mean(x)).</p><p>Тест оны екі covariate-пен шақырады:</p><ul><li><b>эксперимент алдындағы</b> шығын — эффект шын мәнге (+300 ₸) жақын қалады, ал шу азаяды;</li><li><b>эксперимент кезіндегі</b> сессия саны — нұсқа сессияларды да көбейткен, сондықтан CUPED эффектінің бір бөлігін «шегеріп» тастайды.</li></ul><p>Тест сонымен қатар әр топты өз орташасымен центрлеу қатесін тексереді: топтардың алдыңғы шығыны кездейсоқ әртүрлі болса, ортақ mean(x) керек.</p>",
   "starter": "import numpy as np\n\ndef cuped_effect(x_a, y_a, x_b, y_b):\n    pass\n",
   "solution": "import numpy as np\n\ndef cuped_effect(x_a, y_a, x_b, y_b):\n    x = np.concatenate([x_a, x_b])\n    y = np.concatenate([y_a, y_b])\n    theta = np.cov(x, y)[0, 1] / x.var(ddof=1)\n    c_a = y_a - theta * (x_a - x.mean())\n    c_b = y_b - theta * (x_b - x.mean())\n    return c_b.mean() - c_a.mean()\n",
   "hints": [
    "Сабақтағы CUPED кодын функцияға айналдырыңыз: <code>np.concatenate</code>, θ, сосын екі топқа бір <code>x.mean()</code>.",
    "Әр топтың өз орташасын алсаңыз, түзету мүшесінің орташасы әр топта 0 болып, эффект шикі айырмаға тең шығады."
   ],
   "check": {
    "tests": "import numpy as _np\n_g = _np.random.default_rng(17)\n_n = 3000\n_xa = _g.gamma(2.0, 3000, _n); _xb = _g.gamma(2.0, 3000, _n)\n_sa = _g.poisson(10, _n).astype(float); _sb = (_g.poisson(10, _n) + _g.poisson(2, _n)).astype(float)\n_ya = 0.8 * _xa + 150 * _sa + _g.normal(0, 2500, _n)\n_yb = 0.8 * _xb + 150 * _sb + _g.normal(0, 2500, _n)\n_e = cuped_effect(_xa, _ya, _xb, _yb)\nassert _e is not None, \"cuped_effect мән қайтаруы керек\"\n_x = _np.concatenate([_xa, _xb]); _y = _np.concatenate([_ya, _yb]); _th = _np.cov(_x, _y)[0, 1] / _x.var(ddof=1)\n_ref = (_yb - _th * (_xb - _x.mean())).mean() - (_ya - _th * (_xa - _x.mean())).mean()\nassert abs(float(_e) - _ref) < 1e-6, f\"Эффект ≈ {_ref:.1f} болуы керек, сізде {float(_e):.1f}: бір θ және бір ортақ mean(x)\"\n_t = cuped_effect(_np.array([1., 2, 3]), _np.array([2., 4, 6]), _np.array([3., 4, 5]), _np.array([7., 9, 11]))\nassert _t is not None and abs(float(_t) - 0.4) < 1e-9, f\"x_a = [1, 2, 3], x_b = [3, 4, 5] үшін эффект 0.4 болуы керек, сізде {float(_t)}. Әр топты өз орташасымен центрлесеңіз, шикі айырма 5 шығады: ортақ mean(x) алыңыз\"\nassert abs(float(_e) - 300) < 150, f\"Алдыңғы шығынмен эффект шын +300-ге жақын болуы керек, сізде {float(_e):.1f}\"\n_s = cuped_effect(_sa, _ya, _sb, _yb)\n_x2 = _np.concatenate([_sa, _sb]); _th2 = _np.cov(_x2, _y)[0, 1] / _x2.var(ddof=1)\n_ref2 = (_yb - _th2 * (_sb - _x2.mean())).mean() - (_ya - _th2 * (_sa - _x2.mean())).mean()\nassert abs(float(_s) - _ref2) < 1e-6, \"Сессия covariate-імен де сол формула: бір θ, ортақ mean(x)\"\nassert float(_s) < float(_e) - 150, f\"Эксперимент кезіндегі covariate эффектіні жеп қояды: {float(_s):.1f}. Covariate эксперимент алдында өлшенуі керек\"",
    "mustInclude": [
     "def cuped_effect"
    ]
   }
  }
 ]
});
