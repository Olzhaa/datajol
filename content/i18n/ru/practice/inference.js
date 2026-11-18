// inference practice tasks: Russian text. Code, solutions and checks are in content/practice/inference.js.
DJ.i18n.patch({
 "lessons": {
  "ab-1": {
   "pr": [
    {
     "title": "Средние выборок",
     "prompt": "<p>Напишите функцию <code>sample_means(samples)</code>: <code>samples</code> — список выборок (каждая выборка — список чисел). Верните список средних каждой выборки.</p><p>Например, <code>sample_means([[1, 3], [10, 20, 30]])</code> → <code>[2, 20]</code>.</p>",
     "hints": [
      "<code>[statistics.mean(s) for s in samples]</code>"
     ],
     "check": {
      "tests": "assert sample_means([[1, 3], [10, 20, 30]]) == [2, 20], \"sample_means([[1, 3], [10, 20, 30]]) = [2, 20]\"\nassert sample_means([[5]]) == [5], \"среднее выборки из одного значения — само это значение\"\nassert sample_means([]) == [], \"если выборок нет, пустой список\""
     }
    },
    {
     "title": "Случайная выборка",
     "prompt": "<p>Напишите функцию <code>draw(pop, n)</code>: с помощью <code>random.choice</code> возьмите из популяции <code>n</code> элементов (с возвратом) и верните список. Не ставьте seed внутри функции.</p><p>Например, <code>draw([1200, 3500, 800], 5)</code> → список вида <code>[800, 1200, 1200, 3500, 800]</code>.</p>",
     "hints": [
      "<code>[random.choice(pop) for _ in range(n)]</code>"
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(1)\n_pop = [1200, 3500, 800, 15000]\n_s = draw(_pop, 30)\nassert isinstance(_s, list) and len(_s) == 30, \"верните список длиной n = 30\"\nassert all(_x in _pop for _x in _s), \"все элементы должны быть взяты из популяции\"\nassert draw(_pop, 0) == [], \"если n = 0, пустой список\"\n_r.seed(2)\n_big = draw([0, 1], 20000)\nassert abs(sum(_big) / 20000 - 0.5) < 0.02, \"каждый элемент должен выбираться с одинаковой вероятностью\""
     }
    },
    {
     "title": "Ожидаемый разброс",
     "prompt": "<p>По ЦПТ стандартное отклонение выборочных средних равно σ / √n. Напишите функцию <code>expected_spread(sigma, n)</code>.</p><p>Например, SD чеков 50 тыс. ₸, выборка 30 клиентов: <code>expected_spread(50, 30)</code> ≈ <code>9.13</code>.</p>",
     "hints": [
      "<code>sigma / math.sqrt(n)</code>"
     ],
     "check": {
      "tests": "assert abs(expected_spread(50, 30) - 50 / 30 ** 0.5) < 1e-9, \"expected_spread(50, 30) ≈ 9.13\"\nassert abs(expected_spread(10, 100) - 1) < 1e-12, \"expected_spread(10, 100) = 1\"\nassert abs(expected_spread(10, 400) - 0.5) < 1e-12, \"если n увеличить в четыре раза, разброс уменьшится в два раза: 0.5\""
     }
    },
    {
     "title": "Равномерная популяция",
     "prompt": "<p>Напишите функцию <code>sim_means(k, n)</code>: возьмите <code>k</code> выборок, каждая из <code>n</code> значений (<code>random.random()</code>, то есть равномерно от 0 до 1), и верните список их средних. Не ставьте seed внутри функции.</p><p>Среднее Uniform(0, 1) равно 0.5, SD ≈ 0.2887, поэтому при n = 30 SD средних ≈ 0.2887 / √30 ≈ 0.0527.</p>",
     "hints": [
      "Внешний цикл — <code>k</code> раз, внутренний — <code>n</code> раз.",
      "Добавляйте в список <code>statistics.mean</code> каждой выборки."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\n_r.seed(5)\n_m = sim_means(2000, 30)\nassert len(_m) == 2000, \"k = 2000 орташа болуы керек\"\nassert abs(_st.mean(_m) - 0.5) < 0.01, f\"среднее средних должно быть ≈ 0.5, у вас {_st.mean(_m):.3f}\"\nassert abs(_st.stdev(_m) - 0.2887 / 30 ** 0.5) < 0.005, f\"SD средних должно быть ≈ 0.0527, у вас {_st.stdev(_m):.4f}. Есть ли n значений в каждой выборке?\""
     }
    },
    {
     "title": "Выборка из чеков",
     "prompt": "<p>Чеки магазина в Костанае (тыс. ₸) лежат в списке <code>checks</code>, распределение сильно скошено вправо. Напишите функцию <code>resample_means(pop, n, k)</code>: с помощью <code>random.choice</code> возьмите из популяции <code>k</code> выборок по <code>n</code> элементов и верните список средних.</p><p>По ЦПТ SD средних ≈ <code>statistics.pstdev(pop) / √n</code>.</p>",
     "hints": [
      "Одна выборка: <code>[random.choice(pop) for _ in range(n)]</code>.",
      "Добавьте её среднее в список <code>means</code>, повторите это <code>k</code> раз."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\n_r.seed(7)\n_m = resample_means(checks, 40, 2000)\nassert len(_m) == 2000, \"k = 2000 орташа болуы керек\"\nassert abs(_st.mean(_m) - _st.mean(checks)) < 1.0, f\"среднее средних должно быть близко к среднему популяции (≈ 20.5), у вас {_st.mean(_m):.2f}\"\n_e = _st.pstdev(checks) / 40 ** 0.5\nassert abs(_st.stdev(_m) - _e) < 0.4, f\"SD средних должно быть ≈ {_e:.2f}, у вас {_st.stdev(_m):.2f}\""
     }
    },
    {
     "title": "Доля внутри границ",
     "prompt": "<p>Напишите функцию <code>coverage(means, mu, se)</code>: верните долю средних из <code>means</code>, которые попали в интервал μ ± 1.96 × SE (включая границы). По ЦПТ это должно быть ≈ 0.95.</p><p>Например, <code>coverage([48, 50, 70], 50, 5)</code> → 2 / 3.</p>",
     "hints": [
      "Границы: <code>mu - 1.96 * se</code> и <code>mu + 1.96 * se</code>.",
      "Посчитайте попавшие и разделите на <code>len(means)</code>."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\nassert abs(coverage([48, 50, 70], 50, 5) - 2 / 3) < 1e-12, \"coverage([48, 50, 70], 50, 5) = 2/3: 70 вне интервала\"\nassert coverage([40.2, 59.8], 50, 5) == 1, \"значения на границе (50 ± 9.8) входят\"\n_r.seed(3)\n_ms = [_st.mean([_r.expovariate(1 / 50) for _ in range(40)]) for _ in range(1500)]\n_c = coverage(_ms, 50, 50 / 40 ** 0.5)\nassert 0.92 < _c < 0.97, f\"по ЦПТ доля должна быть ≈ 0.95, у вас {_c:.3f}\""
     }
    },
    {
     "title": "Доли конверсии",
     "prompt": "<p>Напишите функцию <code>sim_props(k, n, p)</code>: проведите <code>k</code> опытов, в каждом из которых <code>n</code> посетителей и каждый покупает с вероятностью <code>p</code>, и верните список долей конверсии в каждом опыте. Не ставьте seed внутри функции.</p><p>Доли — тоже средние (среднее 0 и 1), поэтому по ЦПТ их SD ≈ √(p(1 − p) / n).</p>",
     "hints": [
      "В каждом опыте считайте тех, для кого <code>random.random() &lt; p</code>.",
      "Доля: купивших / n."
     ],
     "check": {
      "tests": "import random as _r, statistics as _st\n_r.seed(10)\n_v = sim_props(2000, 100, 0.2)\nassert len(_v) == 2000, \"при k = 2000 должно быть 2000 долей\"\nassert abs(_st.mean(_v) - 0.2) < 0.005, f\"среднее долей должно быть ≈ 0.2, у вас {_st.mean(_v):.4f}\"\nassert abs(_st.stdev(_v) - 0.04) < 0.004, f\"SD долей должно быть ≈ √(0.2 × 0.8 / 100) = 0.04, у вас {_st.stdev(_v):.4f}\""
     }
    },
    {
     "title": "Распределение среднего бросков",
     "prompt": "<p>Без симуляции, точное распределение. Напишите функцию <code>mean_dist(k)</code>: при броске <code>k</code> кубиков верните распределение их <b>среднего</b> в виде словаря <code>{среднее: Fraction}</code> (<code>itertools.product</code>). Среднее — <code>sum(w) / k</code>.</p><p>Например, <code>mean_dist(2)[3.5]</code> → <code>Fraction(1, 6)</code>. С ростом k распределение собирается вокруг середины (ЦПТ).</p>",
     "hints": [
      "Посчитайте среднее каждого исхода и подсчитайте их в словаре.",
      "В конце переведите каждое число в <code>Fraction(c, len(omega))</code>."
     ],
     "check": {
      "tests": "from fractions import Fraction as _F\n_d2 = mean_dist(2)\nassert _d2[3.5] == _F(1, 6), \"для двух кубиков среднее 3.5 (сумма 7): 1/6\"\nassert _d2[1.0] == _F(1, 36), \"Орташа 1: тек (1, 1)\"\nassert sum(_d2.values()) == 1, \"сумма вероятностей равна 1\"\n_d3 = mean_dist(3)\n_mu = sum(_m * _p for _m, _p in _d3.items())\n_var = sum((_m - _mu) ** 2 * _p for _m, _p in _d3.items())\nassert abs(_mu - 3.5) < 1e-9, \"среднее среднего равно 3.5\"\nassert abs(_var - 35 / 12 / 3) < 1e-9, \"дисперсия среднего: σ² / n = (35/12) / 3\""
     }
    }
   ]
  },
  "ab-2": {
   "pr": [
    {
     "title": "SE конверсии",
     "prompt": "<p>Напишите функцию <code>se_counts(x, n)</code>: <code>x</code> — купившие, <code>n</code> — посетители. Верните стандартную ошибку (standard error) конверсии.</p><p>Например, <code>se_counts(48, 400)</code> ≈ <code>0.01625</code>.</p>",
     "hints": [
      "Сначала <code>p = x / n</code>.",
      "SE = √(p(1 − p) / n)."
     ],
     "check": {
      "tests": "assert abs(se_counts(48, 400) - 0.0162481) < 1e-6, \"se_counts(48, 400) ≈ 0.01625\"\nassert abs(se_counts(50, 100) - 0.05) < 1e-12, \"se_counts(50, 100) = 0.05\"\nassert se_counts(0, 100) == 0, \"если никто не купил, SE = 0\""
     }
    },
    {
     "title": "Когда σ известна",
     "prompt": "<p>Напишите функцию <code>se_known(sigma, n)</code>: если SD популяции <code>sigma</code> известно, верните SE среднего из <code>n</code> наблюдений.</p><p>Например, SD времени доставки 12 минут, 36 заказов: <code>se_known(12, 36)</code> → <code>2.0</code>.</p>",
     "hints": [
      "SE = σ / √n."
     ]
    },
    {
     "title": "SE в процентных пунктах",
     "prompt": "<p>Напишите функцию <code>se_pp(p, n)</code>: конверсия <code>p</code>, выборка <code>n</code>. Верните SE в <b>процентных пунктах</b> (умножьте на 100).</p><p>Например, <code>se_pp(0.2, 1600)</code> → <code>1.0</code>.</p>",
     "hints": [
      "В формуле используйте долю (0.2), умножьте на 100 только в конце."
     ]
    },
    {
     "title": "Нужный размер выборки",
     "prompt": "<p>Напишите функцию <code>n_for_se(p, target)</code>: если конверсия примерно <code>p</code>, верните наименьшее n (целое число, округлённое вверх через <code>math.ceil</code>), при котором SE не превышает <code>target</code>.</p><p>Из формулы: n = p(1 − p) / target². Например, <code>n_for_se(0.12, 0.015)</code> → <code>470</code>.</p>",
     "hints": [
      "Выразите n из уравнения SE = √(p(1 − p) / n).",
      "<code>math.ceil</code> округляет вверх."
     ],
     "check": {
      "tests": "assert n_for_se(0.12, 0.015) == 470, \"n_for_se(0.12, 0.015) = 470: 0.1056 / 0.000225 ≈ 469.3\"\nassert n_for_se(0.3, 0.02) == 525, \"n_for_se(0.3, 0.02) = 525\"\nassert isinstance(n_for_se(0.05, 0.01), int), \"верните целое число: math.ceil\""
     }
    },
    {
     "title": "SE по городам",
     "prompt": "<p>Напишите функцию <code>se_by_city(data)</code>: <code>data</code> — <code>{город: список чеков}</code>. Верните SE среднего чека каждого города (SD выборки / √n) в виде словаря <code>{город: SE}</code>.</p>",
     "hints": [
      "Примените формулу <code>se_mean</code> из урока к каждому городу.",
      "Создайте словарь: <code>{city: ... for city, xs in data.items()}</code>."
     ],
     "check": {
      "tests": "import statistics as _st\n_d = {\"Алматы\": [2, 4, 6, 8], \"Орал\": [5, 5, 6, 6, 7, 7]}\n_r = se_by_city(_d)\nassert set(_r) == {\"Алматы\", \"Орал\"}, \"для каждого города одно значение\"\nassert abs(_r[\"Алматы\"] - 1.2909944) < 1e-6, \"Алматы: stdev 2.582 / √4 ≈ 1.291\"\nassert abs(_r[\"Орал\"] - _st.stdev(_d[\"Орал\"]) / 6 ** 0.5) < 1e-9, \"Орал: SD выборки (n − 1) / √6\""
     }
    },
    {
     "title": "Разница между SD и SE",
     "prompt": "<p>Напишите функцию <code>sd_and_se(xs)</code>: верните пару <code>(sd, se)</code>, где <code>sd</code> — SD выборки (<code>statistics.stdev</code>), а <code>se</code> = sd / √n.</p><p>Например, <code>sd_and_se([2, 4, 6, 8])</code> ≈ <code>(2.582, 1.291)</code>. Если данные умножить на 4, SD примерно не меняется, а SE уменьшается.</p>",
     "hints": [
      "<code>sd = statistics.stdev(xs)</code>, затем <code>sd / math.sqrt(len(xs))</code>."
     ],
     "check": {
      "tests": "_sd, _se = sd_and_se([2, 4, 6, 8])\nassert abs(_sd - 2.5819889) < 1e-6 and abs(_se - 1.2909944) < 1e-6, \"sd_and_se([2, 4, 6, 8]) ≈ (2.582, 1.291)\"\n_sd4, _se4 = sd_and_se([2, 4, 6, 8] * 4)\nassert abs(_sd4 - _sd) < 0.3, \"если данные увеличить в 4 раза, SD примерно не меняется\"\nassert _se4 < _se / 1.8, \"если данные увеличить в 4 раза, SE примерно уменьшается вдвое\""
     }
    },
    {
     "title": "Проверка SE симуляцией",
     "prompt": "<p>Напишите функцию <code>sim_se(p, n, k)</code>: проведите <code>k</code> выборок посетителей по <code>n</code> человек (каждый покупает с вероятностью <code>p</code>) и верните <code>statistics.stdev</code> долей конверсии. Оно должно быть близко к √(p(1 − p) / n) из формулы.</p>",
     "hints": [
      "В каждой выборке посчитайте долю купивших.",
      "Эмпирический SE — это <code>statistics.stdev</code> всех долей."
     ],
     "check": {
      "tests": "import random as _r, math as _m\n_r.seed(12)\n_v = sim_se(0.12, 400, 500)\n_e = _m.sqrt(0.12 * 0.88 / 400)\nassert abs(_v - _e) / _e < 0.1, f\"симуляция SE ≈ {_e:.4f} должна быть близка, у вас {_v:.4f}\"\n_r.seed(13)\n_v2 = sim_se(0.5, 100, 500)\nassert abs(_v2 - 0.05) < 0.006, f\"p = 0.5, n = 100: SE ≈ 0.05, у вас {_v2:.4f}\""
     }
    },
    {
     "title": "Самая точная оценка",
     "prompt": "<p>Напишите функцию <code>most_precise(data)</code>: <code>data</code> — <code>{город: (купившие, посетители)}</code>. Верните название города, у которого SE конверсии самый маленький.</p><p>Например, <code>{\"Алматы\": (300, 5000), \"Тараз\": (40, 400)}</code> → <code>\"Алматы\"</code>.</p>",
     "hints": [
      "Для каждого города посчитайте SE через <code>se_prop(x / n, n)</code>.",
      "<code>min(data, key=...)</code> даёт наименьший ключ."
     ],
     "check": {
      "tests": "assert most_precise({\"Алматы\": (300, 5000), \"Тараз\": (40, 400)}) == \"Алматы\", \"в Алматы больше n, поэтому SE меньше\"\nassert most_precise({\"Атырау\": (10, 1000), \"Ақтау\": (500, 1000)}) == \"Атырау\", \"если n одинаковы, точнее тот город, где p(1 − p) меньше: Атырау (1%)\"\nassert most_precise({\"Семей\": (5, 50)}) == \"Семей\", \"если город один, он и ответ\""
     }
    }
   ]
  },
  "ab-3": {
   "pr": [
    {
     "title": "Z-значение по уровню",
     "prompt": "<p>Напишите функцию <code>z_for(level)</code>: для уровня доверия <code>level</code> (например, 0.95) верните двустороннее z-значение.</p><p>Например, <code>z_for(0.95)</code> ≈ <code>1.96</code>, <code>z_for(0.99)</code> ≈ <code>2.576</code>.</p>",
     "hints": [
      "Хвостов два: <code>inv_cdf(1 - (1 - level) / 2)</code>."
     ]
    },
    {
     "title": "Предел погрешности",
     "prompt": "<p>Напишите функцию <code>margin_prop(p, n, level=0.95)</code>: по доле конверсии <code>p</code> и выборке <code>n</code> верните предел погрешности доверительного интервала (z × SE).</p><p>Например, <code>margin_prop(0.12, 400)</code> ≈ <code>0.0318</code>.</p>",
     "hints": [
      "z берётся из уровня, SE = √(p(1 − p) / n)."
     ],
     "check": {
      "tests": "assert abs(margin_prop(0.12, 400) - 0.0318458) < 1e-5, \"margin_prop(0.12, 400) ≈ 0.0318\"\nassert margin_prop(0.12, 400, 0.99) > margin_prop(0.12, 400), \"предел погрешности для 99% должен быть больше, чем для 95%: используйте параметр level\""
     }
    },
    {
     "title": "Попадает ли в интервал",
     "prompt": "<p>Напишите функцию <code>contains(ci, value)</code>: <code>ci</code> — <code>(low, high)</code>. Верните <code>True</code>, если значение попадает в интервал (включая границы).</p><p>Например, <code>contains((0.088, 0.152), 0.1)</code> → <code>True</code>.</p>",
     "hints": [
      "<code>low &lt;= value &lt;= high</code>"
     ],
     "check": {
      "tests": "assert contains((0.088, 0.152), 0.1) is True, \"0.1 интервалда\"\nassert contains((0.088, 0.152), 0.2) is False, \"0.2 интервалдан тыс\"\nassert contains((4200, 4800), 4200) is True, \"граница входит\""
     }
    },
    {
     "title": "Ширина интервала",
     "prompt": "<p>Напишите функцию <code>width_prop(x, n, level=0.95)</code>: верните ширину (high − low) доверительного интервала пропорции.</p><p>Например, <code>width_prop(48, 400)</code> ≈ <code>0.0637</code>. Если увеличить выборку в четыре раза (192 / 1600), ширина уменьшится в два раза.</p>",
     "hints": [
      "Ширина = 2 × z × SE."
     ],
     "check": {
      "tests": "assert abs(width_prop(48, 400) - 0.0636916) < 1e-5, \"width_prop(48, 400) ≈ 0.0637\"\nassert abs(width_prop(192, 1600) - width_prop(48, 400) / 2) < 1e-9, \"если n увеличить в четыре раза, ширина уменьшится в два раза\"\nassert width_prop(48, 400, 0.9) < width_prop(48, 400), \"90% интервал уже: используйте параметр level\""
     }
    },
    {
     "title": "Размер опроса",
     "prompt": "<p>Планирование опроса. Напишите функцию <code>n_for_margin(p, m, level=0.95)</code>: верните наименьшее n (целое число, <code>math.ceil</code>), при котором предел погрешности не превышает <code>m</code>. Формула: n = z² × p(1 − p) / m².</p><p>Например, если p неизвестно, берём самое осторожное предположение p = 0.5: <code>n_for_margin(0.5, 0.03)</code> → <code>1068</code>.</p>",
     "hints": [
      "Выразите n из уравнения m = z × √(p(1 − p) / n)."
     ],
     "check": {
      "tests": "assert n_for_margin(0.5, 0.03) == 1068, \"n_for_margin(0.5, 0.03) = 1068\"\nassert n_for_margin(0.12, 0.02) == 1015, \"n_for_margin(0.12, 0.02) = 1015\"\nassert n_for_margin(0.5, 0.03, 0.99) > 1068, \"для уровня 99% нужно больше людей: используйте параметр level\""
     }
    },
    {
     "title": "Интервал при известной σ",
     "prompt": "<p>Напишите функцию <code>ci_known(mean, sigma, n, level=0.95)</code>: если SD популяции <code>sigma</code> известно, верните CI для среднего в виде <code>(low, high)</code>.</p><p>Например, среднее время поездки на такси в Алматы 24 минуты, σ = 6, n = 36: <code>ci_known(24, 6, 36)</code> ≈ <code>(22.04, 25.96)</code>.</p>",
     "hints": [
      "SE = σ / √n, затем mean ± z × SE."
     ],
     "check": {
      "tests": "_r = ci_known(24, 6, 36)\nassert _r is not None and len(_r) == 2, \"верните (low, high)\"\nassert abs(_r[0] - 22.040036) < 1e-4 and abs(_r[1] - 25.959964) < 1e-4, f\"ci_known(24, 6, 36) ≈ (22.04, 25.96), у вас {_r}\"\n_r9 = ci_known(24, 6, 36, 0.90)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], \"90% интервал тар болуы керек\""
     }
    },
    {
     "title": "Покрытие интервалов",
     "prompt": "<p>«95% CI» — утверждение о методе. Проверим его: функция <code>coverage_sim(p, n, k, level=0.95)</code> проводит <code>k</code> выборок по <code>n</code> посетителей (истинная конверсия <code>p</code>), для каждой строит доверительный интервал пропорции и возвращает долю интервалов, которые содержат истинное <code>p</code>.</p><p>Результат должен быть близок к <code>level</code>.</p>",
     "hints": [
      "Используйте функцию <code>ci_prop</code> из урока.",
      "В каждой выборке считайте x и проверяйте, содержит ли интервал p."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(14)\n_c = coverage_sim(0.3, 200, 800)\nassert 0.92 < _c < 0.975, f\"примерно 95% интервалов должны содержать p, у вас {_c:.3f}\"\n_r.seed(15)\n_c9 = coverage_sim(0.3, 200, 800, 0.8)\nassert 0.75 < _c9 < 0.85, f\"при уровне 80% должно быть ≈ 0.8, у вас {_c9:.3f}\""
     }
    },
    {
     "title": "Города выше цели",
     "prompt": "<p>Напишите функцию <code>above_target(data, target, level=0.95)</code>: <code>data</code> — <code>{город: (купившие, посетители)}</code>. Верните список названий городов, у которых CI конверсии <b>полностью</b> выше <code>target</code> (low &gt; target), отсортированный по алфавиту.</p>",
     "hints": [
      "Для каждого города постройте <code>ci_prop</code> и сравните нижнюю границу с <code>target</code>.",
      "В конце <code>sorted(...)</code>."
     ],
     "check": {
      "tests": "_d = {\"Алматы\": (600, 5000), \"Астана\": (130, 1000), \"Шымкент\": (28, 200), \"Ақтөбе\": (90, 1000)}\nassert above_target(_d, 0.1) == [\"Алматы\", \"Астана\"], \"Алматы (12%, CI ≈ 11.1–12.9%) и Астана (13%, CI ≈ 10.9–15.1%) выше 10%; интервал Шымкента (14%) широкий и содержит 10%\"\nassert above_target(_d, 0.2) == [], \"ни один город явно не выше 20%\"\nassert above_target(_d, 0.1, 0.5) == [\"Алматы\", \"Астана\", \"Шымкент\"], \"на уровне 50% интервал узкий: Шымкент тоже входит\""
     }
    }
   ]
  },
  "ab-4": {
   "pr": [
    {
     "title": "Одностороннее p-value",
     "prompt": "<p>Напишите функцию <code>p_right(z)</code>: верните вероятность правого хвоста P(Z &gt; z).</p><p>Например, <code>p_right(2.1)</code> ≈ <code>0.0179</code>.</p>",
     "hints": [
      "<code>1 - NormalDist().cdf(z)</code>"
     ],
     "check": {
      "tests": "assert abs(p_right(2.1) - 0.0178644) < 1e-6, \"p_right(2.1) ≈ 0.0179\"\nassert abs(p_right(0) - 0.5) < 1e-12, \"p_right(0) = 0.5\"\nassert p_right(-3) > 0.99, \"для отрицательного z правый хвост больше\""
     }
    },
    {
     "title": "Решение по H0",
     "prompt": "<p>Напишите функцию <code>reject(p, alpha=0.05)</code>: если p-value меньше α, верните <code>True</code> (H0 отвергается), иначе <code>False</code>.</p><p>Например, <code>reject(0.0357)</code> → <code>True</code>, <code>reject(0.134)</code> → <code>False</code>.</p>",
     "hints": [
      "<code>p &lt; alpha</code>"
     ],
     "check": {
      "tests": "assert reject(0.0357) is True, \"0.0357 < 0.05: H0 отвергается\"\nassert reject(0.134) is False, \"0.134 ≥ 0.05: доказательств недостаточно\"\nassert reject(0.03, alpha=0.01) is False, \"при α = 0.01 значение 0.03 недостаточно\"\nassert reject(0.05) is False, \"если p = α, мы не отвергаем H0 (строгое неравенство)\""
     }
    },
    {
     "title": "Тестовая статистика",
     "prompt": "<p>Напишите функцию <code>z_stat(est, h0, se)</code>: верните, на сколько SE оценка отстоит от значения H0.</p><p>Например, конверсия 12%, H0: 10%, SE = 0.008: <code>z_stat(0.12, 0.10, 0.008)</code> → <code>2.5</code>.</p>",
     "hints": [
      "z = (оценка − значение H0) / SE."
     ],
     "check": {
      "tests": "assert abs(z_stat(0.12, 0.10, 0.008) - 2.5) < 1e-9, \"z_stat(0.12, 0.10, 0.008) = 2.5\"\nassert abs(z_stat(48, 50, 4) + 0.5) < 1e-12, \"если оценка меньше, z отрицательный: −0.5\""
     }
    },
    {
     "title": "Тест против нормы",
     "prompt": "<p>Компания утверждает, что конверсия 10%. В новом месяце из <code>n</code> посетителей купили <code>x</code>. Напишите функцию <code>one_prop_test(x, n, p0)</code>: при H0: p = p0 SE = √(p0(1 − p0) / n), z = (x / n − p0) / SE; верните <code>(z, p)</code>, где p — двустороннее.</p><p>Например, <code>one_prop_test(48, 400, 0.10)</code> ≈ <code>(1.333, 0.182)</code>.</p>",
     "hints": [
      "При H0 в SE подставляется p0, а не оценка.",
      "Двустороннее p-value: <code>2 * (1 - cdf(abs(z)))</code>."
     ],
     "check": {
      "tests": "_z, _p = one_prop_test(48, 400, 0.10)\nassert abs(_z - 1.3333333) < 1e-6, f\"z ≈ 1.333 должно быть, у вас {_z:.4f}. Используйте p0 в SE\"\nassert abs(_p - 0.1824224) < 1e-5, f\"p ≈ 0.182 должно быть, у вас {_p:.4f}\"\n_z2, _p2 = one_prop_test(52, 400, 0.18)\nassert _z2 < 0 and abs(_p2 - 0.009244) < 0.0005, \"если конверсия низкая, z отрицательный (≈ −2.60); p ≈ 0.009\""
     }
    },
    {
     "title": "Тест среднего чека",
     "prompt": "<p>Раньше средний чек был 5 000 ₸. Напишите функцию <code>mean_test(xs, mu0)</code>: H0: μ = mu0; z = (среднее − mu0) / (stdev / √n), двустороннее p-value; верните <code>(z, p)</code>.</p>",
     "hints": [
      "SE = <code>statistics.stdev(xs) / math.sqrt(len(xs))</code>."
     ],
     "check": {
      "tests": "import statistics as _st\n_xs = [5200, 4800, 5600, 5100, 5900, 5300, 4700, 5500, 5800, 5000] * 4\n_z, _p = mean_test(_xs, 5000)\n_se = _st.stdev(_xs) / 40 ** 0.5\nassert abs(_z - (_st.mean(_xs) - 5000) / _se) < 1e-9, f\"z ≈ {(_st.mean(_xs) - 5000) / _se:.3f} должно быть, у вас {_z}\"\nassert _p < 0.01, \"среднее 5 290 ₸, n = 40: разница должна быть значимой (p < 0.01)\"\n_z0, _p0 = mean_test([4, 6, 5, 5], 5)\nassert abs(_z0) < 1e-12 and abs(_p0 - 1) < 1e-12, \"если среднее равно mu0, z = 0, p = 1\""
     }
    },
    {
     "title": "Критическое значение",
     "prompt": "<p>Напишите функцию <code>critical_z(alpha, two_sided=True)</code>: верните границу, при превышении которой |z| H0 отвергается. В двустороннем тесте α делится между двумя хвостами.</p><p>Например, <code>critical_z(0.05)</code> ≈ <code>1.96</code>, <code>critical_z(0.05, two_sided=False)</code> ≈ <code>1.645</code>.</p>",
     "hints": [
      "Вероятность в одном хвосте: α / 2 для двустороннего, иначе α.",
      "<code>NormalDist().inv_cdf(1 - tail)</code>"
     ],
     "check": {
      "tests": "assert abs(critical_z(0.05) - 1.959964) < 1e-5, \"critical_z(0.05) ≈ 1.96\"\nassert abs(critical_z(0.05, two_sided=False) - 1.644854) < 1e-5, \"одностороннее: ≈ 1.645\"\nassert abs(critical_z(0.01) - 2.575829) < 1e-5, \"critical_z(0.01) ≈ 2.576\""
     }
    },
    {
     "title": "Частота ошибки I рода",
     "prompt": "<p>Что на самом деле означает α = 0.05? Напишите функцию <code>type1_rate(p0, n, k, alpha=0.05)</code>: проиграйте <code>k</code> раз мир, где H0 <b>верна</b>: каждый раз <code>n</code> посетителей, каждый покупает с вероятностью <code>p0</code>. К каждой выборке примените тест пропорции из предыдущего задания (H0: p = p0) и верните долю опытов, в которых H0 отвергается (p &lt; α).</p><p>Результат должен быть близок к α.</p>",
     "hints": [
      "В каждом опыте считайте x и вычисляйте p-value.",
      "Считайте опыты, где <code>p &lt; α</code>, — это ложноположительные."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(16)\n_v = type1_rate(0.3, 200, 1000)\nassert 0.03 < _v < 0.075, f\"если H0 верна, примерно 5% тестов должны ошибочно показать «значимо», у вас {_v:.3f}\"\n_r.seed(17)\n_v1 = type1_rate(0.3, 200, 1000, alpha=0.01)\nassert _v1 < _v, \"при α = 0.01 ложноположительных должно стать меньше: используйте параметр alpha\""
     }
    },
    {
     "title": "Мощность теста",
     "prompt": "<p>Теперь H0 <b>ложна</b>: истинная конверсия <code>p_true</code>, но мы проверяем H0: p = p0. Функция <code>power_sim(p0, p_true, n, k, alpha=0.05)</code> должна вернуть долю из <code>k</code> опытов, в которых H0 отвергнута (мощность power = 1 − β).</p><p>Например, если p0 = 0.1, p_true = 0.15, n = 400, мощность ≈ 0.87.</p>",
     "hints": [
      "Как в предыдущем задании, но данные генерируйте с <code>p_true</code>.",
      "Тест всё равно проводится против <code>p0</code>."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(18)\n_v = power_sim(0.1, 0.15, 400, 600)\nassert 0.82 < _v < 0.93, f\"мощность должна быть ≈ 0.87, у вас {_v:.3f}\"\n_r.seed(19)\n_v2 = power_sim(0.1, 0.15, 100, 600)\nassert _v2 < _v - 0.2, \"если n мало, мощность должна быть заметно ниже\""
     }
    }
   ]
  },
  "ab-5": {
   "pr": [
    {
     "title": "Объединённая конверсия",
     "prompt": "<p>Напишите функцию <code>pooled(x_a, n_a, x_b, n_b)</code>: верните объединённую конверсию в предположении H0 (что конверсии равны).</p><p>Например, <code>pooled(200, 2000, 250, 2000)</code> → <code>0.1125</code>.</p>",
     "hints": [
      "Все купившие / все пользователи."
     ],
     "check": {
      "tests": "assert abs(pooled(200, 2000, 250, 2000) - 0.1125) < 1e-12, \"pooled(200, 2000, 250, 2000) = 450 / 4000 = 0.1125\"\nassert abs(pooled(480, 10000, 540, 12000) - 1020 / 22000) < 1e-12, \"размеры групп разные: (x_a + x_b) / (n_a + n_b), а не средняя p\""
     }
    },
    {
     "title": "Разница в процентных пунктах",
     "prompt": "<p>Напишите функцию <code>diff_pp(x_a, n_a, x_b, n_b)</code>: верните разницу p_B − p_A в <b>процентных пунктах</b>.</p><p>Например, <code>diff_pp(200, 2000, 250, 2000)</code> → <code>2.5</code>.</p>",
     "hints": [
      "<code>100 * (x_b / n_b - x_a / n_a)</code>"
     ],
     "check": {
      "tests": "assert abs(diff_pp(200, 2000, 250, 2000) - 2.5) < 1e-9, \"diff_pp(200, 2000, 250, 2000) = 2.5 п.п.\"\nassert abs(diff_pp(250, 2000, 200, 2000) + 2.5) < 1e-9, \"если B хуже, разница отрицательная: −2.5\""
     }
    },
    {
     "title": "SE объединённой оценки",
     "prompt": "<p>Напишите функцию <code>pooled_se(x_a, n_a, x_b, n_b)</code>: SE = √(p(1 − p) × (1/n_A + 1/n_B)), где p — объединённая конверсия.</p><p>Например, <code>pooled_se(200, 2000, 250, 2000)</code> ≈ <code>0.00999</code>.</p>",
     "hints": [
      "Сначала объединённое p.",
      "<code>math.sqrt(p * (1 - p) * (1 / n_a + 1 / n_b))</code>"
     ]
    },
    {
     "title": "Условие применимости",
     "prompt": "<p>z-тест опирается на ЦПТ. Напишите функцию <code>valid(x_a, n_a, x_b, n_b, min_count=10)</code>: верните <code>True</code>, если в каждой группе не меньше <code>min_count</code> как купивших, так и не купивших.</p><p>Например, <code>valid(6, 32, 10, 32)</code> → <code>False</code> (в A всего 6 купивших).</p>",
     "hints": [
      "Проверяются четыре числа: x_a, n_a − x_a, x_b, n_b − x_b."
     ],
     "check": {
      "tests": "assert valid(6, 32, 10, 32) is False, \"A-да 6 сатып алушы: < 10\"\nassert valid(200, 2000, 250, 2000) is True, \"все числа достаточны\"\nassert valid(15, 20, 12, 30) is False, \"в A не купивших всего 5\"\nassert valid(6, 32, 10, 32, min_count=5) is True, \"min_count = 5 болса, жарамды\""
     }
    },
    {
     "title": "Определение победителя",
     "prompt": "<p>Напишите функцию <code>winner(x_a, n_a, x_b, n_b, alpha=0.05)</code>: если по z-тесту для двух пропорций p &lt; α, верните вариант с более высокой конверсией (<code>\"A\"</code> или <code>\"B\"</code>), иначе верните <code>\"жоқ\"</code>.</p><p>Например, <code>winner(200, 2000, 250, 2000)</code> → <code>\"B\"</code>.</p>",
     "hints": [
      "Используйте функцию <code>two_prop_z</code> из урока.",
      "Если результат значим, направление покажет знак z."
     ],
     "check": {
      "tests": "assert winner(200, 2000, 250, 2000) == \"B\", \"p ≈ 0.012, z > 0: B\"\nassert winner(250, 2000, 200, 2000) == \"A\", \"z < 0: A\"\nassert winner(480, 10000, 540, 10000) == \"жоқ\", \"p ≈ 0.054 > 0.05: победителя нет\"\nassert winner(480, 10000, 540, 10000, alpha=0.1) == \"B\", \"α = 0.1 болса, B\""
     }
    },
    {
     "title": "Односторонний тест",
     "prompt": "<p>Иногда вопрос звучит так: «B лучше?» Напишите функцию <code>one_sided_p(x_a, n_a, x_b, n_b)</code>: вычислите z через объединённый SE и верните одностороннее p-value для H1: p_B &gt; p_A, то есть 1 − cdf(z).</p><p>Например, <code>one_sided_p(480, 10000, 540, 10000)</code> ≈ <code>0.027</code>.</p>",
     "hints": [
      "z — как и раньше.",
      "Односторонний: без модуля и без умножения на 2, просто <code>1 - cdf(z)</code>."
     ],
     "check": {
      "tests": "assert abs(one_sided_p(480, 10000, 540, 10000) - 0.0268) < 0.001, \"one_sided_p(480, 10000, 540, 10000) ≈ 0.027\"\nassert one_sided_p(540, 10000, 480, 10000) > 0.9, \"если B хуже, одностороннее p велико\""
     }
    },
    {
     "title": "A/B по городам",
     "prompt": "<p>Напишите функцию <code>b_wins(data, alpha=0.05)</code>: <code>data</code> — <code>{город: (x_a, n_a, x_b, n_b)}</code>. Верните список названий городов, в которых вариант B статистически значимо <b>лучше</b> (z &gt; 0 и p &lt; α), отсортированный по алфавиту.</p>",
     "hints": [
      "Для каждого города используйте <code>two_prop_z</code>.",
      "Два условия: <code>z &gt; 0</code> и <code>p &lt; alpha</code>."
     ],
     "check": {
      "tests": "_d = {\"Алматы\": (200, 2000, 250, 2000), \"Астана\": (250, 2000, 200, 2000), \"Шымкент\": (100, 1000, 110, 1000), \"Ақтау\": (50, 1000, 80, 1000)}\nassert b_wins(_d) == [\"Алматы\", \"Ақтау\"], \"Алматы (p ≈ 0.012) и Ақтау (p ≈ 0.007): B лучше. В Астане лучше A, в Шымкенте разница незначима\"\nassert b_wins(_d, alpha=0.01) == [\"Ақтау\"], \"если α = 0.01, только Ақтау\""
     }
    },
    {
     "title": "От сессий к пользователям",
     "prompt": "<p>В логе каждая строка — одна <b>сессия</b>: <code>(user_id, variant, bought)</code>, у одного человека может быть несколько сессий. Подсчёт сессий искусственно увеличивает n. Напишите функцию <code>user_level_test(rows)</code>: сведите данные к уровню пользователя (если пользователь купил хотя бы в одной сессии, он купил), затем верните <code>(z, p)</code> z-теста для двух пропорций.</p>",
     "hints": [
      "Словарь: <code>user_id → (variant, купил ли)</code>; в новой сессии обновляйте через <code>or</code>.",
      "Затем посчитайте n и x для каждого варианта и вызовите <code>two_prop_z</code>."
     ],
     "check": {
      "tests": "_rows = []\nfor _u in range(400):\n    _v = \"A\" if _u % 2 == 0 else \"B\"\n    _buy = (_u % 20 == 0) if _v == \"A\" else (_u % 10 == 1)\n    _rows.append((_u, _v, False))\n    _rows.append((_u, _v, _buy))\n    _rows.append((_u, _v, False))\n_z, _p = user_level_test(_rows)\nassert abs(_z - 2.8006) < 0.01, f\"на уровне пользователей у A: 20/200, у B: 40/200, z ≈ 2.80, у вас {_z:.3f}. Считайте пользователей, а не сессии\"\nassert abs(_p - 0.0051) < 0.0005, f\"должно быть p ≈ 0.005, у вас {_p:.4f}\""
     }
    }
   ]
  },
  "ab-6": {
   "pr": [
    {
     "title": "Выборочная дисперсия",
     "prompt": "<p>Напишите функцию <code>var_s(xs)</code> <b>без</b> <code>statistics</code>: верните выборочную дисперсию (деление на n − 1).</p><p>Например, <code>var_s([5, 7, 6, 8, 4])</code> → <code>2.5</code>.</p>",
     "hints": [
      "Сначала среднее, затем сумма квадратов отклонений.",
      "Делите на <code>n - 1</code>, а не на n."
     ],
     "check": {
      "tests": "import statistics as _st\nassert abs(var_s([5, 7, 6, 8, 4]) - 2.5) < 1e-12, \"var_s([5, 7, 6, 8, 4]) = 2.5: вы делили на n − 1?\"\n_x = [12, 30, 8, 22, 15, 9]\nassert abs(var_s(_x) - _st.variance(_x)) < 1e-9, \"должно совпасть с statistics.variance\""
     }
    },
    {
     "title": "SE разности",
     "prompt": "<p>Напишите функцию <code>se_diff(a, b)</code>: верните SE разности по формуле Уэлча √(s_A² / n_A + s_B² / n_B).</p><p>Например, <code>se_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>1.0</code>.</p>",
     "hints": [
      "Складывайте квадраты SE: <code>variance(a) / len(a) + variance(b) / len(b)</code>."
     ]
    },
    {
     "title": "Разность средних",
     "prompt": "<p>Напишите функцию <code>mean_diff(a, b)</code>: верните m_B − m_A.</p><p>Например, время на сайте: <code>mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>2</code>.</p>",
     "hints": [
      "Порядок важен: B минус A."
     ]
    },
    {
     "title": "Число степеней свободы",
     "prompt": "<p>Формула Уэлча–Саттертуэйта: если v_A = s_A² / n_A, v_B = s_B² / n_B, то</p><p>df = (v_A + v_B)² / (v_A² / (n_A − 1) + v_B² / (n_B − 1)).</p><p>Напишите функцию <code>welch_df(a, b)</code>. Например, <code>welch_df([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> → <code>8.0</code>.</p>",
     "hints": [
      "Сначала вычислите <code>va</code> и <code>vb</code>.",
      "В знаменателе каждое слагаемое делите на <code>n - 1</code>."
     ],
     "check": {
      "tests": "assert abs(welch_df([5, 7, 6, 8, 4], [9, 7, 8, 10, 6]) - 8) < 1e-9, \"равные дисперсии, n = 5 + 5: df = 8\"\n_a = [10, 12, 9, 11, 13, 10, 12, 11]\n_b = [14, 30, 8, 22, 15, 9, 25, 12, 18, 20]\nassert abs(welch_df(_a, _b) - 9.7647) < 0.01, f\"в группах с разными дисперсиями df ≈ 9.76, у вас {welch_df(_a, _b):.3f}\""
     }
    },
    {
     "title": "ДИ для разности средних",
     "prompt": "<p>Напишите функцию <code>ci_mean_diff(a, b, level=0.95)</code>: верните доверительный интервал разности m_B − m_A (Welch SE и z) в виде <code>(low, high)</code>.</p><p>Например, <code>ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])</code> ≈ <code>(0.04, 3.96)</code>.</p>",
     "hints": [
      "Разность ± z × SE.",
      "z — из уровня: <code>inv_cdf(1 - (1 - level) / 2)</code>."
     ],
     "check": {
      "tests": "_r = ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6])\nassert _r is not None and len(_r) == 2, \"верните (low, high)\"\nassert abs(_r[0] - 0.040036) < 1e-4 and abs(_r[1] - 3.959964) < 1e-4, f\"должно быть ≈ (0.04, 3.96), у вас {_r}\"\n_r9 = ci_mean_diff([5, 7, 6, 8, 4], [9, 7, 8, 10, 6], 0.9)\nassert _r9[1] - _r9[0] < _r[1] - _r[0], \"90% интервал тар болуы керек\""
     }
    },
    {
     "title": "Влияние «кита» на результат",
     "prompt": "<p>В данных о доходе одна очень большая оплата может исказить результат. Напишите функцию <code>t_without_max(a, b)</code>: верните <code>(t_all, t_trim)</code>: <code>t_all</code> — Welch t (B минус A) по всем данным, <code>t_trim</code> — t после удаления одного самого большого значения из группы B.</p>",
     "hints": [
      "Оформите Welch t отдельной функцией.",
      "Чтобы удалить наибольшее: <code>sorted(b)[:-1]</code> (исходный список не меняется)."
     ],
     "check": {
      "tests": "_a = [0, 0, 5, 0, 3, 0, 4, 0, 0, 6, 2, 0]\n_b = [0, 4, 0, 0, 5, 0, 3, 0, 0, 2, 0, 120]\n_b0 = list(_b)\n_ta, _tt = t_without_max(_a, _b)\nassert abs(_ta - 0.9568) < 0.01, f\"t_all ≈ 0.96, у вас {_ta:.3f}\"\nassert abs(_tt - (-0.4524)) < 0.01, f\"без «кита» t_trim ≈ −0.45, у вас {_tt:.3f}: один клиент давал весь «эффект»\"\nassert _b == _b0, \"исходный список b не должен меняться\""
     }
    },
    {
     "title": "Тест ARPU",
     "prompt": "<p>Метрика дохода на одного пользователя (ARPU): многие пользователи платят 0 ₸. Напишите функцию <code>arpu_test(rev_a, rev_b, alpha=0.05)</code>: верните <code>(t, p, significant)</code>, где t — Welch t (B минус A), p — двустороннее p-value по нормальному приближению, а <code>significant</code> — это p &lt; α.</p>",
     "hints": [
      "К <code>welch_t</code> из урока добавьте третье значение: <code>p &lt; alpha</code>."
     ],
     "check": {
      "tests": "_a = ([0] * 9 + [5000]) * 10\n_b = ([0] * 8 + [5000, 6000]) * 10\n_t, _p, _s = arpu_test(_a, _b)\nassert abs(_t - 2.2342) < 0.01, f\"t ≈ 2.23 должно быть, у вас {_t:.3f}\"\nassert abs(_p - 0.0255) < 0.001 and _s is True, \"p ≈ 0.025 < 0.05: significant = True\"\n_t2, _p2, _s2 = arpu_test(_a, _b, alpha=0.01)\nassert _s2 is False, \"при α = 0.01 результат не значим: используйте параметр alpha\""
     }
    },
    {
     "title": "t и z для данных 0/1",
     "prompt": "<p>Конверсия тоже является средним: каждый пользователь даёт 1 или 0. Напишите функцию <code>t_vs_z(x_a, n_a, x_b, n_b)</code>: создайте списки из 0 и 1, вычислите по ним Welch t, а также unpooled z = (p_B − p_A) / √(p_A(1 − p_A)/n_A + p_B(1 − p_B)/n_B). Верните <code>(t, z)</code>. При большом n они практически совпадают.</p>",
     "hints": [
      "Список: <code>[1] * x_a + [0] * (n_a - x_a)</code>.",
      "Различие только в дисперсии: <code>variance</code> делит на n − 1, а p(1 − p) делит на n."
     ],
     "check": {
      "tests": "_t, _z = t_vs_z(200, 2000, 250, 2000)\nassert abs(_z - 2.5039) < 0.001, f\"unpooled z ≈ 2.504 должно быть, у вас {_z:.4f}\"\nassert abs(_t - _z) < 0.002, f\"при большом n t ≈ z: {_t:.4f} и {_z:.4f}\"\n_t2, _z2 = t_vs_z(3, 10, 7, 10)\nassert abs(_t2 - 1.8516) < 0.001 and abs(_z2 - 1.9518) < 0.001, f\"при малом n разница заметна: t ≈ 1.852, z ≈ 1.952, у вас {_t2:.4f}, {_z2:.4f}\""
     }
    }
   ]
  },
  "ab-7": {
   "pr": [
    {
     "title": "Z для мощности",
     "prompt": "<p>Напишите функцию <code>z_power(power)</code>: верните значение z_{power} из формулы.</p><p>Например, <code>z_power(0.8)</code> ≈ <code>0.842</code>, <code>z_power(0.9)</code> ≈ <code>1.282</code>.</p>",
     "hints": [
      "<code>NormalDist().inv_cdf(power)</code> — односторонний."
     ]
    },
    {
     "title": "Относительный MDE",
     "prompt": "<p>Менеджер говорит: «Хотим поднять конверсию на 20%». Напишите функцию <code>abs_mde(p1, rel)</code>: переведите относительный MDE в абсолютный.</p><p>Например, базовая конверсия 5%, +20%: <code>abs_mde(0.05, 0.2)</code> → <code>0.01</code> (1 п.п.).</p>",
     "hints": [
      "Абсолютный MDE = базовая конверсия × относительный рост."
     ]
    },
    {
     "title": "Длительность теста",
     "prompt": "<p>Напишите функцию <code>days_needed(n_per_group, daily_users, groups=2)</code>: если в день приходит <code>daily_users</code> новых пользователей, верните количество дней (с округлением вверх), за которое наберётся нужное число людей во всех группах.</p><p>Например, <code>days_needed(3839, 1000)</code> → <code>8</code>.</p>",
     "hints": [
      "Всего нужно людей: <code>n_per_group * groups</code>.",
      "<code>math.ceil</code> округляет вверх."
     ],
     "check": {
      "tests": "assert days_needed(3839, 1000) == 8, \"3839 × 2 / 1000 = 7.68 → 8 дней\"\nassert days_needed(8155, 1000) == 17, \"8155 × 2 / 1000 = 16.31 → 17 дней\"\nassert days_needed(1000, 500, groups=3) == 6, \"3 варианта: 3000 / 500 = 6 дней\""
     }
    },
    {
     "title": "Выборка для среднего",
     "prompt": "<p>Метрика — средний чек. Нужное n для одной группы: n = 2 × (z_{1−α/2} + z_{power})² × σ² / δ², где σ — SD, δ — разница, которую хотим заметить. Напишите функцию <code>n_mean(sigma, delta, alpha=0.05, power=0.8)</code> (с округлением вверх).</p><p>Например, <code>n_mean(10, 2)</code> → <code>393</code>.</p>",
     "hints": [
      "z_a и z_b — как в уроке.",
      "<code>math.ceil(2 * (z_a + z_b) ** 2 * sigma ** 2 / delta ** 2)</code>"
     ],
     "check": {
      "tests": "assert n_mean(10, 2) == 393, \"n_mean(10, 2) = 393 болуы керек\"\nassert n_mean(3000, 500) == 566, \"Чек: σ = 3000 ₸, δ = 500 ₸ → 566\"\nassert n_mean(10, 2, power=0.9) > 393, \"при росте power растёт n: используйте параметр power\""
     }
    },
    {
     "title": "Вычисление мощности",
     "prompt": "<p>Обратный вопрос: n известно, какова мощность? Приближённая формула: power ≈ cdf(|MDE| / √((p₁(1 − p₁) + p₂(1 − p₂)) / n) − z_{1−α/2}). Напишите функцию <code>power_of(p1, mde, n, alpha=0.05)</code>.</p><p>Например, <code>power_of(0.1, 0.02, 3839)</code> ≈ <code>0.80</code>, а <code>power_of(0.05, 0.01, 2000)</code> ≈ <code>0.28</code>.</p>",
     "hints": [
      "SE = √((p₁(1 − p₁) + p₂(1 − p₂)) / n), p₂ = p₁ + MDE.",
      "<code>NormalDist().cdf(abs(mde) / se - z_a)</code>"
     ],
     "check": {
      "tests": "assert abs(power_of(0.1, 0.02, 3839) - 0.8) < 0.001, \"при 3839 людях power ≈ 0.80 (совпадает с формулой sample_size)\"\nassert abs(power_of(0.05, 0.01, 2000) - 0.2835) < 0.001, \"power_of(0.05, 0.01, 2000) ≈ 0.28: трафика недостаточно\"\nassert power_of(0.1, 0.02, 8000) > power_of(0.1, 0.02, 3839), \"при росте n power растёт\""
     }
    },
    {
     "title": "Наименьший заметный эффект",
     "prompt": "<p>Трафик ограничен: в одной группе только <code>n</code> человек. Напишите функцию <code>mde_for(p1, n)</code>: перебирайте MDE = 0.001, 0.002, ... с шагом 0.001 и верните наименьший MDE, при котором <code>sample_size(p1, mde)</code> из урока не больше n.</p><p>Например, <code>mde_for(0.1, 3839)</code> → <code>0.02</code>.</p>",
     "hints": [
      "Сначала напишите функцию <code>sample_size</code> из урока.",
      "Берите MDE как <code>k / 1000</code> и увеличивайте k с 1."
     ],
     "check": {
      "tests": "assert mde_for(0.1, 3839) == 0.02, \"mde_for(0.1, 3839) = 0.02\"\nassert mde_for(0.1, 1000) == 0.041, \"с 1000 людьми мы заметим только эффект ≈ 4.1 п.п.\"\nassert mde_for(0.05, 8155) == 0.01, \"mde_for(0.05, 8155) = 0.01\""
     }
    },
    {
     "title": "Неравное разделение",
     "prompt": "<p>Иногда большую часть трафика отдают B: n_B = k × n_A. Тогда n_A = (z_{1−α/2} + z_{power})² × (p₁(1 − p₁) + p₂(1 − p₂) / k) / MDE². Напишите функцию <code>sample_size_ratio(p1, mde, k, alpha=0.05, power=0.8)</code>: верните <code>(n_a, n_b)</code>, где n_a = ceil(...), n_b = ceil(k × n_a).</p><p>Например, <code>sample_size_ratio(0.1, 0.02, 1)</code> → <code>(3839, 3839)</code>, <code>sample_size_ratio(0.1, 0.02, 2)</code> → <code>(2803, 5606)</code>.</p>",
     "hints": [
      "При k = 1 формула совпадает с формулой из урока.",
      "Дисперсия B делится на k: <code>p2 * (1 - p2) / k</code>."
     ],
     "check": {
      "tests": "assert sample_size_ratio(0.1, 0.02, 1) == (3839, 3839), \"k = 1: (3839, 3839) — пример из урока\"\nassert sample_size_ratio(0.1, 0.02, 2) == (2803, 5606), \"k = 2: (2803, 5606)\"\n_a, _b = sample_size_ratio(0.1, 0.02, 3)\nassert _a + _b > 2 * 3839, \"неравное разделение увеличивает общее число людей\""
     }
    },
    {
     "title": "Проверка мощности симуляцией",
     "prompt": "<p>Проверьте формулу: при базовой конверсии 20% и MDE 10 п.п. <code>sample_size</code> даёт 291 человека на группу. Напишите функцию <code>sim_power(p_a, p_b, n, k, alpha=0.05)</code>: проведите <code>k</code> A/B-тестов (в каждой группе <code>n</code> человек, истинные конверсии <code>p_a</code> и <code>p_b</code>), к каждому примените z-тест для двух пропорций и верните долю тестов с p &lt; α.</p><p>Результат должен быть ≈ 0.8.</p>",
     "hints": [
      "В каждом тесте считайте x для двух групп отдельно.",
      "Используйте функцию <code>two_prop_z</code> из урока 5."
     ],
     "check": {
      "tests": "import random as _r\n_r.seed(20)\n_v = sim_power(0.2, 0.3, 291, 400)\nassert 0.73 < _v < 0.87, f\"при n = 291 мощность должна быть ≈ 0.8, у вас {_v:.3f}\"\n_r.seed(21)\n_v0 = sim_power(0.2, 0.2, 291, 400)\nassert _v0 < 0.1, f\"если эффекта нет, «значимый» результат должен быть ≈ 5%, у вас {_v0:.3f}\""
     }
    }
   ]
  },
  "ab-8": {
   "pr": [
    {
     "title": "Поправка Бонферрони",
     "prompt": "<p>Напишите функцию <code>bonferroni(alpha, m)</code>: если проводится <code>m</code> тестов, верните скорректированный порог для каждого теста.</p><p>Например, <code>bonferroni(0.05, 5)</code> → <code>0.01</code>.</p>",
     "hints": [
      "α / m."
     ],
     "check": {
      "tests": "assert abs(bonferroni(0.05, 5) - 0.01) < 1e-12, \"bonferroni(0.05, 5) = 0.01\"\nassert bonferroni(0.05, 1) == 0.05, \"один тест: поправки нет\""
     }
    },
    {
     "title": "Риск множественных сравнений",
     "prompt": "<p>Напишите функцию <code>fwer(alpha, m)</code>: если каждый из <code>m</code> независимых тестов проводится на уровне α, верните вероятность того, что хотя бы один из них случайно окажется «значимым».</p><p>Например, <code>fwer(0.05, 5)</code> ≈ <code>0.226</code>.</p>",
     "hints": [
      "«Хотя бы один» — дополнение: 1 − (1 − α)<sup>m</sup>."
     ],
     "check": {
      "tests": "assert abs(fwer(0.05, 5) - (1 - 0.95 ** 5)) < 1e-12, \"fwer(0.05, 5) ≈ 0.226\"\nassert abs(fwer(0.05, 1) - 0.05) < 1e-12, \"один тест: α\"\nassert fwer(0.05, 20) > 0.6, \"20 сегментов: риск выше 64%\""
     }
    },
    {
     "title": "Распределение по устройствам",
     "prompt": "<p>Проверка рандомизации: из таблицы <code>assignments</code> выведите для каждого устройства (<code>device</code>) количество пользователей <code>n</code>.</p>",
     "hints": [
      "<code>COUNT(*) AS n</code> и <code>GROUP BY device</code>."
     ]
    },
    {
     "title": "Значимые метрики",
     "prompt": "<p>Напишите функцию <code>significant(pvals, alpha=0.05)</code>: <code>pvals</code> — <code>{метрика: p-value}</code>. С поправкой Бонферрони (α / m, где m — число метрик) верните список названий значимых метрик, отсортированный по алфавиту.</p><p>Например, <code>{\"конверсия\": 0.004, \"чек\": 0.03, \"қайту\": 0.2}</code> → <code>[\"конверсия\"]</code> (порог 0.0167).</p>",
     "hints": [
      "Порог: <code>alpha / len(pvals)</code>.",
      "В конце <code>sorted(...)</code>."
     ],
     "check": {
      "tests": "assert significant({\"конверсия\": 0.004, \"чек\": 0.03, \"қайту\": 0.2}) == [\"конверсия\"], \"Шек 0.05 / 3 ≈ 0.0167: тек конверсия\"\nassert significant({\"a\": 0.001, \"b\": 0.002}) == [\"a\", \"b\"], \"порог 0.025: обе значимы\"\nassert significant({\"a\": 0.02, \"b\": 0.03, \"c\": 0.04, \"d\": 0.01, \"e\": 0.011}) == [], \"5 метрик, порог 0.01: ни одна (0.01 < 0.01 неверно)\""
     }
    },
    {
     "title": "SRM при неравном разделении",
     "prompt": "<p>Тест планировался как разделение 30/70. Напишите функцию <code>srm_p_ratio(n_a, n_b, q)</code>: <code>q</code> — запланированная доля A. Пусть N = n_a + n_b, z = (n_a − N × q) / √(N × q × (1 − q)); верните двустороннее p-value.</p><p>Например, <code>srm_p_ratio(3100, 6900, 0.3)</code> ≈ <code>0.029</code>.</p>",
     "hints": [
      "При q = 0.5 получается <code>srm_p</code> из урока.",
      "SD = <code>math.sqrt(n * q * (1 - q))</code>."
     ],
     "check": {
      "tests": "assert abs(srm_p_ratio(3100, 6900, 0.3) - 0.0290) < 0.0005, \"srm_p_ratio(3100, 6900, 0.3) ≈ 0.029\"\nassert abs(srm_p_ratio(5120, 4880, 0.5) - 0.016395) < 1e-4, \"q = 0.5: пример из урока ≈ 0.0164\"\nassert abs(srm_p_ratio(300, 700, 0.3) - 1) < 1e-9, \"точно по плану: p = 1\""
     }
    },
    {
     "title": "Доли вариантов",
     "prompt": "<p>Для каждого варианта выведите <code>variant</code>, количество пользователей <code>n</code> и долю во всех пользователях <code>share</code> (<code>ROUND(..., 3)</code>). Подзапрос <code>(SELECT COUNT(*) FROM assignments)</code> даёт общее количество.</p>",
     "hints": [
      "<code>COUNT(*) * 1.0 / (SELECT COUNT(*) FROM assignments)</code>",
      "<code>* 1.0</code> защищает от деления целых чисел."
     ]
    },
    {
     "title": "SRM по устройствам",
     "prompt": "<p>Напишите функцию <code>srm_by_device(rows)</code>: <code>rows</code> — список пар <code>(variant, device)</code> (планировалось разделение 50/50). Для каждого устройства верните p-value SRM для объёмов групп A и B (формула <code>srm_p</code> из урока) в виде словаря <code>{устройство: p}</code>.</p>",
     "hints": [
      "Для каждого устройства создайте счётчик <code>{\"A\": 0, \"B\": 0}</code>.",
      "Затем для каждого вызовите <code>srm_p(c[\"A\"], c[\"B\"])</code>."
     ],
     "check": {
      "tests": "_rows = [(\"A\", \"mobile\")] * 5120 + [(\"B\", \"mobile\")] * 4880 + [(\"A\", \"desktop\")] * 500 + [(\"B\", \"desktop\")] * 500\n_r = srm_by_device(_rows)\nassert set(_r) == {\"mobile\", \"desktop\"}, \"для каждого устройства одно p-value\"\nassert abs(_r[\"mobile\"] - 0.016395) < 1e-4, \"mobile: 5120 / 4880, p ≈ 0.0164\"\nassert abs(_r[\"desktop\"] - 1) < 1e-9, \"desktop: 500 / 500, p = 1\""
     }
    },
    {
     "title": "Таблица по устройствам и вариантам",
     "prompt": "<p>Для каждого устройства одна строка: <code>device</code>, <code>n_a</code> (пользователи в A), <code>n_b</code> (в B) и <code>diff</code> = n_b − n_a. Отсортируйте по <code>device</code>. Подсказка: <code>SUM(CASE WHEN variant = 'A' THEN 1 ELSE 0 END)</code>.</p>",
     "hints": [
      "Посчитайте каждый вариант отдельно через <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code>.",
      "<code>GROUP BY device ORDER BY device</code>"
     ]
    }
   ]
  },
  "ab-9": {
   "pr": [
    {
     "title": "Количество покупателей",
     "prompt": "<p>Для каждого варианта выведите <code>variant</code> и количество покупателей <code>buyers</code>. Здесь нужны только купившие, поэтому <code>JOIN</code> достаточно.</p>",
     "hints": [
      "<code>COUNT(*) AS buyers</code>, <code>GROUP BY a.variant</code>."
     ]
    },
    {
     "title": "Общая выручка",
     "prompt": "<p>Из таблицы <code>conversions</code> выведите общую выручку теста <code>total_revenue</code> и количество покупок <code>orders</code>.</p>",
     "hints": [
      "<code>SUM(revenue)</code> и <code>COUNT(*)</code>."
     ]
    },
    {
     "title": "Самый большой чек",
     "prompt": "<p>Для каждого варианта выведите <code>variant</code>, самый большой чек <code>max_check</code> и самый маленький чек <code>min_check</code>.</p>",
     "hints": [
      "<code>MAX(c.revenue)</code>, <code>MIN(c.revenue)</code>."
     ]
    },
    {
     "title": "Средний чек",
     "prompt": "<p>Средний чек покупателей (AOV): для каждого варианта выведите <code>variant</code> и <code>aov</code> (<code>ROUND(..., 1)</code>). Это не rpu: знаменатель — только купившие.</p>",
     "hints": [
      "<code>JOIN</code> оставит только купивших, затем <code>AVG(c.revenue)</code>."
     ]
    },
    {
     "title": "RPU по устройствам",
     "prompt": "<p>Для каждого устройства выведите <code>device</code>, <code>users</code> и выручку на одного пользователя <code>rpu</code> (делится на всех пользователей, <code>ROUND(..., 1)</code>). Отсортируйте по <code>device</code>.</p>",
     "hints": [
      "<code>LEFT JOIN</code> и <code>COALESCE(c.revenue, 0)</code>.",
      "В конце <code>ORDER BY a.device</code>."
     ]
    },
    {
     "title": "Не покупавшие",
     "prompt": "<p>Для каждого варианта выведите <code>variant</code> и количество пользователей, которые не купили, <code>non_buyers</code>.</p>",
     "hints": [
      "После <code>LEFT JOIN</code>: <code>COUNT(*)</code> — все, <code>COUNT(c.user_id)</code> — купившие.",
      "Разность — это не купившие."
     ]
    },
    {
     "title": "Разница конверсий",
     "prompt": "<p>В одной строке: <code>cr_a</code>, <code>cr_b</code> (конверсия каждого варианта, <code>ROUND(..., 3)</code>) и <code>diff_pp</code> — разница в процентных пунктах (<code>ROUND(100 * (cr_b − cr_a), 1)</code>, считается по неокруглённым долям).</p><p>Подсказка: <code>AVG(CASE WHEN a.variant = 'B' THEN (c.user_id IS NOT NULL) END)</code> — конверсия B.</p>",
     "hints": [
      "<code>CASE WHEN ... THEN ... END</code> даёт NULL для другого варианта, а <code>AVG</code> пропускает NULL.",
      "<code>(c.user_id IS NOT NULL)</code> даёт 1 для купившего и 0 для остальных."
     ]
    },
    {
     "title": "Доля крупных покупателей",
     "prompt": "<p>Для каждого варианта выведите <code>variant</code> и долю <code>big_share</code> (<code>ROUND(..., 3)</code>) пользователей, которые заплатили 10 000 ₸ или больше, в <b>всех</b> пользователях. Отсортируйте по <code>variant</code>.</p>",
     "hints": [
      "<code>LEFT JOIN</code>: в знаменатель попадают и те, кто не купил.",
      "<code>AVG(CASE WHEN c.revenue &gt;= 10000 THEN 1.0 ELSE 0 END)</code>: NULL не проходит условие и даёт 0."
     ]
    }
   ]
  },
  "ab-10": {
   "pr": [
    {
     "title": "Выше порога?",
     "prompt": "<p>Напишите функцию <code>above_threshold(ci, thr)</code>: верните <code>True</code>, если интервал разницы <code>ci = (low, high)</code> целиком выше бизнес-порога <code>thr</code> (low ≥ thr).</p><p>Например, <code>above_threshold((0.0054, 0.0446), 0.01)</code> → <code>False</code>.</p>",
     "hints": [
      "Достаточно смотреть только на нижнюю границу."
     ],
     "check": {
      "tests": "assert above_threshold((0.0054, 0.0446), 0.01) is False, \"нижняя граница 0.5 п.п. < 1 п.п.\"\nassert above_threshold((0.012, 0.03), 0.01) is True, \"целиком выше 1 п.п.\""
     }
    },
    {
     "title": "Ежемесячная дополнительная выручка",
     "prompt": "<p>Напишите функцию <code>monthly_gain(diff, users, value)</code>: конверсия отличается на <code>diff</code> (доля), в месяц <code>users</code> пользователей, стоимость одной покупки <code>value</code> ₸. Верните дополнительную выручку в месяц.</p><p>Например, <code>monthly_gain(0.025, 100000, 4000)</code> → <code>10000000</code> ₸.</p>",
     "hints": [
      "Дополнительные покупки: diff × users. Каждая стоит value ₸."
     ]
    },
    {
     "title": "Содержит ли ноль",
     "prompt": "<p>Напишите функцию <code>includes_zero(ci)</code>: если интервал содержит 0 (low ≤ 0 ≤ high), верните <code>True</code>. Это значит, что результат статистически незначим.</p>",
     "hints": [
      "<code>ci[0] &lt;= 0 &lt;= ci[1]</code>"
     ],
     "check": {
      "tests": "assert includes_zero((-0.01, 0.02)) is True, \"(−0.01, 0.02) содержит 0\"\nassert includes_zero((0.0054, 0.0446)) is False, \"полностью положительный: значимо\"\nassert includes_zero((-0.03, -0.01)) is False, \"полностью отрицательный: B хуже, но значимо\""
     }
    },
    {
     "title": "Правило решения",
     "prompt": "<p>Превратите таблицу из урока в функцию. <code>verdict(ci, thr, max_width)</code> должна проверять условия в таком порядке:</p><ol><li>low ≥ thr → <code>\"енгіземіз\"</code>;</li><li>low &gt; 0 → <code>\"тәуекелмен енгіземіз\"</code>;</li><li>high &lt; 0 или ширина интервала (high − low) ≤ max_width → <code>\"енгізбейміз\"</code>;</li><li>иначе → <code>\"дерек жеткіліксіз\"</code>.</li></ol>",
     "hints": [
      "Проверяйте условия в заданном порядке через <code>if</code>."
     ],
     "check": {
      "tests": "assert verdict((0.012, 0.03), 0.01, 0.01) == \"енгіземіз\", \"целиком выше порога\"\nassert verdict((0.0054, 0.0446), 0.01, 0.01) == \"тәуекелмен енгіземіз\", \"выше 0, порог пересекается\"\nassert verdict((-0.002, 0.003), 0.01, 0.01) == \"енгізбейміз\", \"содержит 0, узкий\"\nassert verdict((-0.03, 0.04), 0.01, 0.01) == \"дерек жеткіліксіз\", \"содержит 0, широкий\"\nassert verdict((-0.05, -0.01), 0.01, 0.01) == \"енгізбейміз\", \"B нашар\""
     }
    },
    {
     "title": "Относительный рост",
     "prompt": "<p>Напишите функцию <code>lift(x_a, n_a, x_b, n_b)</code>: верните относительный рост p_B / p_A − 1.</p><p>Например, 10% → 12.5%: <code>lift(200, 2000, 250, 2000)</code> → <code>0.25</code> (+25%).</p>",
     "hints": [
      "Не путайте абсолютную разницу (2.5 п.п.) и относительный рост (25%)."
     ],
     "check": {
      "tests": "assert abs(lift(200, 2000, 250, 2000) - 0.25) < 1e-12, \"lift(200, 2000, 250, 2000) = 0.25\"\nassert abs(lift(500, 10000, 504, 10000) - 0.008) < 1e-12, \"5.00% → 5.04%: +0.8%\"\nassert lift(100, 1000, 80, 1000) < 0, \"если B хуже, рост отрицательный\""
     }
    },
    {
     "title": "Окупается ли затрата",
     "prompt": "<p>Напишите функцию <code>worth_it(ci, users, value, cost)</code>: осторожная оценка — месячная дополнительная выручка по <b>нижней</b> границе интервала разницы (low × users × value). Если она не меньше месячных затрат <code>cost</code>, верните <code>True</code>.</p><p>Например, <code>worth_it((0.0054, 0.0446), 100000, 4000, 2000000)</code> → <code>True</code> (2.16 млн ≥ 2 млн).</p>",
     "hints": [
      "Выручка: <code>ci[0] * users * value</code>."
     ],
     "check": {
      "tests": "assert worth_it((0.0054, 0.0446), 100000, 4000, 2000000) is True, \"0.0054 × 100 000 × 4000 = 2.16 млн ≥ 2 млн\"\nassert worth_it((0.0054, 0.0446), 100000, 4000, 3000000) is False, \"2.16 млн < 3 млн\"\nassert worth_it((-0.001, 0.01), 100000, 4000, 0) is False, \"нижняя граница отрицательна: при осторожной оценке выручки нет\""
     }
    },
    {
     "title": "Полный отчёт",
     "prompt": "<p>Напишите функцию <code>report(x_a, n_a, x_b, n_b, thr)</code>: она возвращает словарь:</p><ul><li><code>\"diff\"</code> — p_B − p_A;</li><li><code>\"low\"</code>, <code>\"high\"</code> — 95% CI разницы (unpooled SE);</li><li><code>\"p\"</code> — двустороннее p-value z-теста для двух пропорций (pooled SE);</li><li><code>\"launch\"</code> — <code>True</code>, если p &lt; 0.05 и low ≥ thr.</li></ul>",
     "hints": [
      "Для CI — unpooled SE (урок 10), для теста — pooled SE (урок 5).",
      "Ключи словаря: <code>\"diff\"</code>, <code>\"low\"</code>, <code>\"high\"</code>, <code>\"p\"</code>, <code>\"launch\"</code>."
     ],
     "check": {
      "tests": "_r = report(200, 2000, 250, 2000, 0.01)\nassert isinstance(_r, dict), \"верните словарь\"\nassert abs(_r[\"diff\"] - 0.025) < 1e-12, \"diff = 0.025\"\nassert abs(_r[\"low\"] - 0.005441) < 1e-4 and abs(_r[\"high\"] - 0.044559) < 1e-4, \"CI ≈ (0.0054, 0.0446): unpooled SE\"\nassert abs(_r[\"p\"] - 0.01235) < 1e-4, \"p ≈ 0.0124: pooled SE\"\nassert _r[\"launch\"] is False, \"нижняя граница меньше 1 п.п.: launch = False\"\nassert report(1000, 10000, 1300, 10000, 0.01)[\"launch\"] is True, \"10% → 13%, n = 10 000: launch = True\""
     }
    },
    {
     "title": "Итоговая фраза",
     "prompt": "<p>Напишите функцию <code>summary(x_a, n_a, x_b, n_b)</code>: она возвращает одну строку для менеджера:</p><p><code>\"B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012\"</code></p><p>Правила: разница и границы CI — в процентных пунктах, со знаком и одним знаком после запятой (<code>f\"{v:+.1f}\"</code>); p — с тремя знаками (<code>f\"{p:.3f}\"</code>); CI строится по unpooled SE, p — по pooled z-тесту; между границами стоит символ «…».</p>",
     "hints": [
      "Умножьте доли на 100 и форматируйте через <code>f\"{v:+.1f}\"</code>.",
      "Переиспользуйте расчёты из предыдущего задания."
     ],
     "check": {
      "tests": "_s = summary(200, 2000, 250, 2000)\nassert _s == \"B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012\", f\"ожидалось: 'B: +2.5 п.п. (95% CI +0.5…+4.5), p = 0.012', у вас: {_s!r}\"\n_s2 = summary(250, 2000, 200, 2000)\nassert _s2 == \"B: -2.5 п.п. (95% CI -4.5…-0.5), p = 0.012\", f\"если B хуже, знак минус: {_s2!r}\""
     }
    }
   ]
  },
  "ab-chi": {
   "pr": [
    {
     "title": "Ожидаемая таблица",
     "prompt": "<p>Напишите функцию <code>expected_table(table)</code> без библиотек: <code>table</code> — таблица счётчиков (список списков). Верните ожидаемую по H0 таблицу: каждая ячейка E = сумма строки × сумма столбца / общее число.</p><p>Например, <code>expected_table([[30, 70], [45, 55]])</code> → <code>[[37.5, 62.5], [37.5, 62.5]]</code>.</p>",
     "hints": [
      "Суммы строк: <code>[sum(r) for r in table]</code>; суммы столбцов: <code>[sum(c) for c in zip(*table)]</code>.",
      "Двухуровневый list comprehension: <code>[[r * c / total for c in cols] for r in rows]</code>."
     ],
     "check": {
      "tests": "_e = expected_table([[30, 70], [45, 55]])\nassert _e is not None, \"expected_table должна возвращать значение\"\nassert len(_e) == 2 and all(abs(_a - _b) < 1e-9 for _ra, _rb in zip(_e, [[37.5, 62.5], [37.5, 62.5]]) for _a, _b in zip(_ra, _rb)), f\"должно быть [[37.5, 62.5], [37.5, 62.5]], у вас {_e}\"\n_e2 = expected_table([[10, 20, 30], [20, 20, 20]])\nassert all(abs(_a - _b) < 1e-9 for _a, _b in zip(_e2[0], [15, 20, 25])), f\"в таблице 2 × 3 первая строка должна быть [15, 20, 25], у вас {_e2[0]}\"\n_t = [[90, 1410], [95, 905], [30, 470]]\n_e3 = expected_table(_t)\nassert all(abs(sum(_r) - sum(_o)) < 1e-9 for _r, _o in zip(_e3, _t)), \"суммы строк ожидаемой таблицы совпадают с фактической\"\nassert abs(_e3[1][0] - 1000 * 215 / 3000) < 1e-9, \"покупатели desktop: 1000 × 215 / 3000 ≈ 71.67\""
     }
    },
    {
     "title": "Поправка Бонферрони",
     "prompt": "<p>Тест χ² показал, что «где-то есть разница», и вы сравнили несколько пар. Напишите функцию <code>bonferroni(pvalues, alpha=0.05)</code>: для каждого p-value верните <code>True</code>, если <code>p &lt; alpha / m</code>, иначе <code>False</code> (m — число сравнений).</p><p>Например, <code>bonferroni([0.01, 0.02, 0.04])</code> → <code>[True, False, False]</code>: порог 0.05 / 3 ≈ 0.0167.</p>",
     "hints": [
      "Порог: <code>alpha / len(pvalues)</code>."
     ],
     "check": {
      "tests": "assert bonferroni([0.01, 0.02, 0.04]) == [True, False, False], \"[0.01, 0.02, 0.04]: порог 0.0167, значимо только первое\"\nassert bonferroni([0.001] * 5) == [True] * 5, \"0.001 < 0.05 / 5 = 0.01: значимы все\"\nassert bonferroni([0.03, 0.2]) == [False, False], \"два сравнения: порог 0.025, 0.03 не проходит\"\nassert bonferroni([0.03, 0.2], alpha=0.1) == [True, False], \"при alpha = 0.1 порог 0.05\""
     }
    },
    {
     "title": "До и после акции",
     "prompt": "<p>Даны месячные траты (₸) одних и тех же 8 клиентов до и после акции. Вычислите:</p><ul><li><code>mean_diff</code> — среднее разностей (after − before);</li><li><code>p_paired</code> — p-value <code>stats.ttest_rel(after, before)</code>;</li><li><code>p_welch</code> — p-value <code>stats.ttest_ind(after, before, equal_var=False)</code>, который игнорирует парность.</li></ul><p>Сравните два p-value: большой разброс между клиентами скрывает эффект в тесте для независимых групп.</p>",
     "hints": [
      "Разности: <code>[a - b for a, b in zip(after, before)]</code>.",
      "Из результата каждого теста возьмите <code>.pvalue</code>."
     ],
     "check": {
      "tests": "from scipy import stats as _st\n_b = [5200, 8100, 3900, 12000, 6500, 7300, 4800, 9900]\n_a = [5500, 8550, 4020, 12600, 6700, 7680, 4950, 10410]\nassert mean_diff is not None and abs(float(mean_diff) - 338.75) < 1e-9, \"mean_diff = 2710 / 8 = 338.75 ₸\"\nassert p_paired is not None and abs(float(p_paired) - _st.ttest_rel(_a, _b).pvalue) < 1e-12, \"p_paired: stats.ttest_rel(after, before).pvalue\"\nassert p_welch is not None and abs(float(p_welch) - _st.ttest_ind(_a, _b, equal_var=False).pvalue) < 1e-12, \"p_welch: stats.ttest_ind(after, before, equal_var=False).pvalue\"\nassert float(p_paired) < 0.01 < 0.5 < float(p_welch), \"парный тест видит эффект (p < 0.01), тест для независимых групп не видит (p > 0.5)\""
     }
    },
    {
     "title": "χ² вручную",
     "prompt": "<p>Напишите функцию <code>chi2_by_hand(table)</code>: для таблицы любого размера она возвращает <code>(chi2, dof)</code>.</p><pre><code>χ² = Σ (O − E)² / E        df = (строки − 1) × (столбцы − 1)</code></pre><p>Тест сравнивает результат со <code>stats.chi2_contingency(table, correction=False)</code> (без поправки Йейтса).</p>",
     "hints": [
      "Сначала ожидаемая ячейка: <code>e = rows[i] * cols[j] / total</code>.",
      "Два цикла: <code>for i, r in enumerate(table)</code> и <code>for j, o in enumerate(r)</code>."
     ],
     "check": {
      "tests": "from scipy import stats as _st\nassert chi2_by_hand([[30, 70], [45, 55]]) is not None, \"chi2_by_hand должна возвращать значение\"\nfor _t in ([[30, 70], [45, 55]], [[90, 1410], [95, 905], [30, 470]], [[12, 30, 18], [20, 25, 35], [8, 15, 37]]):\n    _c, _p, _d, _e = _st.chi2_contingency(_t, correction=False)\n    _r = chi2_by_hand(_t)\n    assert abs(float(_r[0]) - _c) < 1e-6, f\"для {_t} должно быть χ² ≈ {_c:.3f}, у вас {float(_r[0]):.3f}\"\n    assert int(_r[1]) == _d, f\"для {_t} должно быть df = {_d}, у вас {_r[1]}\""
     }
    },
    {
     "title": "Таблица 2 × 2: χ² = z²",
     "prompt": "<p>A: из 2 000 пользователей купили 200, B: из 2 000 — 250. Вычислите:</p><ul><li><code>z</code> — z-статистику для двух пропорций (pooled SE, ab-5) в направлении B − A;</li><li><code>chi2_nc</code>, <code>p_nc</code> — результат <code>stats.chi2_contingency(table, correction=False)</code>;</li><li><code>p_yates</code> — p-value <code>chi2_contingency(table)</code> по умолчанию (с поправкой Йейтса).</li></ul><p><code>table</code> — таблица 2 × 2: строки A, B; столбцы «купил», «не купил».</p>",
     "hints": [
      "Таблица: <code>[[x_a, n_a - x_a], [x_b, n_b - x_b]]</code> — не забудьте столбец «не купил».",
      "Объединённая доля: <code>p = (x_a + x_b) / (n_a + n_b)</code>, SE = √(p(1 − p)(1/n_a + 1/n_b))."
     ],
     "check": {
      "tests": "from statistics import NormalDist as _N\nassert table is not None and [list(_r) for _r in table] == [[200, 1800], [250, 1750]], \"должно быть table = [[200, 1800], [250, 1750]]\"\nassert z is not None and abs(float(z) - 2.50196) < 1e-4, f\"должно быть z ≈ 2.50 (pooled SE), у вас {z}\"\nassert chi2_nc is not None and abs(float(chi2_nc) - float(z) ** 2) < 1e-6, \"в таблице 2 × 2 без Йейтса χ² = z²\"\nassert p_nc is not None and abs(float(p_nc) - 2 * (1 - _N().cdf(abs(float(z))))) < 1e-6, \"p_nc совпадает с двусторонним p-value z-теста: 2 × (1 − Φ(|z|))\"\nassert p_yates is not None and float(p_yates) > float(p_nc), \"поправка Йейтса немного увеличивает p: p_yates > p_nc\""
     }
    },
    {
     "title": "Направление: greater, less, two-sided",
     "prompt": "<p>Похоже, что в новом дизайне (B) средний чек снизился. Вычислите три варианта t-теста Уэлча, в каждом вызове сначала <code>b</code>, потом <code>a</code>:</p><ul><li><code>p_two</code> — <code>alternative='two-sided'</code>;</li><li><code>p_greater</code> — «среднее B больше»;</li><li><code>p_less</code> — «среднее B меньше».</li></ul><p>Заметьте: <code>p_greater + p_less = 1</code>, а <code>p_two</code> — удвоенное меньшее из них. Поэтому направление выбирают до того, как посмотрели на данные.</p>",
     "hints": [
      "<code>stats.ttest_ind(b, a, equal_var=False, alternative='less').pvalue</code>",
      "<code>equal_var=False</code> нужен в каждом вызове."
     ],
     "check": {
      "tests": "from scipy import stats as _st\n_t = _st.ttest_ind(b, a, equal_var=False, alternative='two-sided').pvalue\n_g = _st.ttest_ind(b, a, equal_var=False, alternative='greater').pvalue\n_l = _st.ttest_ind(b, a, equal_var=False, alternative='less').pvalue\nassert p_two is not None and abs(float(p_two) - _t) < 1e-9, f\"должно быть p_two ≈ {_t:.4f}: Уэлч, сначала b, потом a\"\nassert p_greater is not None and abs(float(p_greater) - _g) < 1e-9, f\"должно быть p_greater ≈ {_g:.4f}: alternative='greater'\"\nassert p_less is not None and abs(float(p_less) - _l) < 1e-9, f\"должно быть p_less ≈ {_l:.4f}: alternative='less'\"\nassert abs(float(p_greater) + float(p_less) - 1) < 1e-9, \"сумма двух односторонних p-value равна 1\"\nassert abs(float(p_two) - 2 * min(float(p_greater), float(p_less))) < 1e-9, \"двустороннее p = 2 × min(одностороннее p)\""
     }
    },
    {
     "title": "Попарные сравнения",
     "prompt": "<p>Тест χ² показал, что между вариантами есть разница. Теперь найдём, какие пары отличаются. Напишите функцию <code>pairwise(table, alpha=0.05)</code>: <code>table</code> — строки это варианты, столбцы [купил, не купил]. Функция возвращает <code>(pvals, significant)</code>:</p><ul><li><code>pvals</code> — словарь <code>{(i, j): p}</code> для всех пар (i &lt; j), p — p-value <code>stats.chi2_contingency([table[i], table[j]], correction=False)</code>;</li><li><code>significant</code> — отсортированный список пар, значимых по Бонферрони: p &lt; alpha / число пар.</li></ul><p>Пары даёт <code>itertools.combinations(range(len(table)), 2)</code>.</p>",
     "hints": [
      "Одна пара: <code>stats.chi2_contingency([table[i], table[j]], correction=False)[1]</code> — второе значение это p-value.",
      "Порог: <code>alpha / len(pvals)</code>; отсортируйте список через <code>sorted(...)</code>."
     ],
     "check": {
      "tests": "from scipy import stats as _st\n_t = [[80, 920], [95, 905], [130, 870], [90, 910]]\n_r = pairwise(_t)\nassert _r is not None and len(_r) == 2, \"верните пару (pvals, significant)\"\n_pv, _sig = _r\nassert len(_pv) == 6, f\"у 4 вариантов должно быть 6 пар, у вас {len(_pv)}\"\nassert abs(_pv[(1, 2)] - _st.chi2_contingency([_t[1], _t[2]], correction=False)[1]) < 1e-9, \"p-value пары (1, 2): chi2_contingency([table[1], table[2]], correction=False)\"\nassert _pv[(1, 2)] < 0.05 and (1, 2) not in _sig, \"(1, 2): p ≈ 0.013 < 0.05, но порог Бонферрони 0.05 / 6 ≈ 0.0083, поэтому не значимо\"\nassert list(_sig) == [(0, 2), (2, 3)], f\"значимые пары должны быть [(0, 2), (2, 3)], у вас {_sig}\"\nassert list(pairwise(_t, alpha=0.2)[1]) == [(0, 2), (1, 2), (2, 3)], \"при alpha = 0.2 порог 0.033: добавляется и (1, 2)\"\nassert list(pairwise([[100, 900], [120, 880], [150, 850]])[1]) == [(0, 2)], \"в таблице из урока отличаются только A и C: [(0, 2)]\""
     }
    },
    {
     "title": "Статистика U вручную",
     "prompt": "<p>Тест Манна–Уитни спрашивает: «значение, случайно взятое из B, больше, чем из A?» Его статистика U — число пар, в которых значение B больше значения A (при равенстве 0.5). Напишите две функции:</p><ul><li><code>u_stat(b, a)</code> — U по всем парам (b, a);</li><li><code>superiority(b, a)</code> — U / (len(a) × len(b)): вероятность того, что случайное значение B больше случайного значения A.</li></ul><p>Результат должен совпадать со <code>stats.mannwhitneyu(b, a).statistic</code>. Тест также проверяет, как выброс влияет на U.</p>",
     "hints": [
      "Два цикла: <code>for x in b</code>, <code>for y in a</code>; если <code>x &gt; y</code>, то +1, при равенстве +0.5.",
      "Знаменатель — число пар: <code>len(a) * len(b)</code>."
     ],
     "check": {
      "tests": "from scipy import stats as _st\n_a = [5, 7, 6, 8, 4]\n_b = [9, 7, 8, 10, 6]\nassert u_stat(_b, _a) is not None, \"u_stat должна возвращать значение\"\nassert abs(u_stat(_b, _a) - _st.mannwhitneyu(_b, _a).statistic) < 1e-9, f\"должно быть U ≈ {_st.mannwhitneyu(_b, _a).statistic}, у вас {u_stat(_b, _a)}. Равные значения дают 0.5\"\nassert abs(u_stat([3, 4], [1, 2]) - 4) < 1e-9 and abs(u_stat([1, 2], [3, 4])) < 1e-9, \"[3, 4] и [1, 2]: B больше во всех 4 парах, в обратном порядке 0\"\nassert abs(superiority([5, 5], [5, 5]) - 0.5) < 1e-9, \"если все значения равны, вероятность 0.5\"\nassert abs(superiority(_b, _a) + superiority(_a, _b) - 1) < 1e-9, \"superiority(b, a) + superiority(a, b) = 1\"\n_w = [9, 7, 8, 1000000, 6]\nassert abs(u_stat(_w, _a) - u_stat(_b, _a)) < 1e-9, \"если заменить наибольшее значение на 1 000 000, U не изменится: тест смотрит на ранги\"\nimport numpy as _np\n_g = _np.random.default_rng(2)\n_x = _np.round(_g.lognormal(8, 1, 40), -2)\n_y = _np.round(_g.lognormal(8.3, 1, 30), -2)\nassert abs(u_stat(list(_y), list(_x)) - _st.mannwhitneyu(_y, _x).statistic) < 1e-6, \"и на больших данных с повторами U должна совпадать со scipy\""
     }
    }
   ]
  },
  "ab-boot": {
   "pr": [
    {
     "title": "Одна bootstrap-выборка",
     "prompt": "<p>Напишите функцию <code>resample(x, seed=0)</code>: создайте <code>rng = np.random.default_rng(seed)</code> и верните одну выборку размера <code>len(x)</code> из <code>x</code> с возвращением.</p><p>Например, <code>resample([2, 4, 4, 10])</code> — массив из четырёх значений, некоторые могут повторяться.</p>",
     "hints": [
      "<code>rng.choice(x, size=len(x), replace=True)</code>"
     ],
     "check": {
      "tests": "import numpy as _np\n_x = _np.arange(1, 51)\n_s = resample(_x)\nassert _s is not None and len(_s) == 50, \"размер выборки должен быть len(x) = 50\"\nassert all(_v in set(_x.tolist()) for _v in _np.asarray(_s).tolist()), \"все значения должны быть взяты из x\"\nassert len(set(_np.asarray(_s).tolist())) < 50, \"при выборе с возвращением некоторые значения повторяются: replace=True\"\n_ref = _np.random.default_rng(0).choice(_x, size=50, replace=True)\nassert _np.array_equal(_np.asarray(_s), _ref), \"используйте np.random.default_rng(seed) и rng.choice(x, size=len(x), replace=True)\"\nassert not _np.array_equal(_np.asarray(resample(_x, seed=1)), _ref), \"другой seed должен давать другую выборку\""
     }
    },
    {
     "title": "Перцентильный интервал",
     "prompt": "<p>Bootstrap-значения <code>vals</code> уже готовы. Напишите функцию <code>percentile_ci(vals, level=0.95)</code>: она возвращает <code>(low, high)</code> по перцентильному методу — квантили <code>(1 − level) / 2</code> и <code>1 − (1 − level) / 2</code>.</p><p>Например, <code>percentile_ci(np.arange(1001))</code> → <code>(25.0, 975.0)</code>.</p>",
     "hints": [
      "<code>a = (1 - level) / 2</code>; <code>np.quantile(vals, a)</code> и <code>np.quantile(vals, 1 - a)</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_r = percentile_ci(_np.arange(1001))\nassert _r is not None and len(_r) == 2, \"верните пару (low, high)\"\nassert abs(_r[0] - 25) < 1e-9 and abs(_r[1] - 975) < 1e-9, f\"для 0..1000 95% интервал должен быть (25, 975), у вас {_r}\"\n_r9 = percentile_ci(_np.arange(1001), level=0.9)\nassert abs(_r9[0] - 50) < 1e-9 and abs(_r9[1] - 950) < 1e-9, \"level = 0.9: (50, 950), используйте параметр level\"\n_r5 = percentile_ci([3, 1, 2], level=0.0)\nassert abs(_r5[0] - 2) < 1e-9 and abs(_r5[1] - 2) < 1e-9, \"при level = 0 обе границы равны медиане\""
     }
    },
    {
     "title": "Bootstrap-средние",
     "prompt": "<p>Напишите функцию <code>boot_means(x, n_boot=2000, seed=0)</code>: возьмите из <code>x</code> с возвращением <code>n_boot</code> выборок и верните средние каждой из них в виде массива NumPy.</p><p>Тест проверяет, что SD bootstrap-средних близко к формуле SE = SD / √n.</p>",
     "hints": [
      "Одно повторение: <code>rng.choice(x, size=len(x), replace=True).mean()</code>.",
      "Превратите список в массив через <code>np.array([...])</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_x = _np.random.default_rng(4).exponential(5000, 400)\n_m = boot_means(_x)\nassert _m is not None and len(_m) == 2000, \"должно быть n_boot = 2000 средних\"\n_se = _x.std(ddof=1) / len(_x) ** 0.5\nassert abs(float(_np.mean(_m)) - _x.mean()) < 0.2 * _se, \"среднее bootstrap-средних близко к среднему выборки\"\nassert abs(float(_np.std(_m)) - _se) < 0.1 * _se, f\"должно быть SD(bootstrap-средних) ≈ SE = {_se:.0f}, у вас {float(_np.std(_m)):.0f}. Размер каждой выборки len(x)\"\nassert len(boot_means(_x, n_boot=300)) == 300, \"используйте параметр n_boot\""
     }
    },
    {
     "title": "CI разницы медиан",
     "prompt": "<p>A/B-тест: чеки сильно скошены, поэтому сравниваем медианы. Напишите функцию <code>diff_ci(a, b, stat, n_boot=2000, level=0.95, seed=0)</code>: на каждом повторении берите resample <b>отдельно из каждой группы</b>, считайте <code>stat(b*) − stat(a*)</code> и верните <code>(low, high)</code> по перцентильному методу. Достаточно одного <code>rng</code>.</p><p>Если интервал не содержит 0, разница значима на уровне α = 1 − level.</p>",
     "hints": [
      "У каждой группы свой размер: <code>rng.choice(a, size=len(a), replace=True)</code>, для b так же.",
      "Собирайте разности в список, в конце <code>np.quantile</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_g = _np.random.default_rng(8)\n_a = _g.lognormal(8.0, 0.9, 250)\n_b = _g.lognormal(8.3, 0.9, 200)\n_r = diff_ci(_a, _b, _np.median)\nassert _r is not None and len(_r) == 2, \"верните пару (low, high)\"\n_lo, _hi = float(_r[0]), float(_r[1])\n_obs = _np.median(_b) - _np.median(_a)\nassert _lo < _obs < _hi, \"интервал должен содержать наблюдаемую разницу\"\nassert _lo > 0, f\"медиана B заметно выше: нижняя граница должна быть больше 0, у вас {_lo:.0f}\"\n_rr = _np.random.default_rng(0); _v = []\nfor _ in range(2000):\n    _ra = _rr.choice(_a, size=len(_a), replace=True); _rb = _rr.choice(_b, size=len(_b), replace=True); _v.append(_np.median(_rb) - _np.median(_ra))\n_e = (_np.quantile(_v, 0.025), _np.quantile(_v, 0.975)); _w = _e[1] - _e[0]\nassert abs(_lo - _e[0]) < 0.25 * _w and abs(_hi - _e[1]) < 0.25 * _w, f\"интервал должен быть примерно ({_e[0]:.0f}, {_e[1]:.0f}), у вас ({_lo:.0f}, {_hi:.0f}). Делайте resample каждой группы отдельно, с её размером\"\n_z = diff_ci(_a, _g.permutation(_a), _np.median)\nassert float(_z[0]) < 0 < float(_z[1]), \"для одинаковых групп интервал должен содержать 0\"\n_r8 = diff_ci(_a, _b, _np.median, level=0.8)\nassert float(_r8[1]) - float(_r8[0]) < 0.85 * (_hi - _lo), \"80% интервал уже 95%: используйте параметр level\""
     }
    },
    {
     "title": "Точный перестановочный тест",
     "prompt": "<p>На маленьких данных перемешивать не нужно: можно перебрать все разбиения. Напишите функцию <code>exact_perm_p(a, b)</code>: переберите все способы выбрать <code>len(a)</code> элементов объединённых данных как «A» (<code>itertools.combinations</code> по индексам) и верните долю разбиений, в которых |mean(B) − mean(A)| ≥ |obs| (двусторонний тест).</p><p>Например, A = [1, 2, 3], B = [4, 5, 9]: из 20 разбиений 2 крайних, p = 0.1. При сравнении чисел оставьте запас <code>1e-12</code> на ошибку float.</p>",
     "hints": [
      "По индексам: <code>for idx in combinations(range(len(pooled)), len(a))</code>.",
      "Если сумма A равна <code>sa</code>, сумма B — <code>total - sa</code>.",
      "Условие: <code>abs(d) &gt;= abs(obs) - 1e-12</code>; знаменатель — число разбиений."
     ],
     "check": {
      "tests": "assert exact_perm_p([1, 2, 3], [4, 5, 9]) is not None, \"exact_perm_p должна возвращать значение\"\nassert abs(exact_perm_p([1, 2, 3], [4, 5, 9]) - 0.1) < 1e-9, f\"A = [1, 2, 3], B = [4, 5, 9]: должно быть p = 2 / 20 = 0.1, у вас {exact_perm_p([1, 2, 3], [4, 5, 9])}\"\nassert abs(exact_perm_p([1, 2], [3, 4]) - 1 / 3) < 1e-9, \"[1, 2] и [3, 4]: 2 из 6 разбиений крайние, p = 1/3\"\nassert abs(exact_perm_p([1, 2, 3, 4], [10, 11, 12, 13]) - 2 / 70) < 1e-9, \"70 способов разбить 8 чисел на 4 + 4, крайних только 2: p = 2/70\"\nassert abs(exact_perm_p([5, 5, 5], [5, 5, 5]) - 1) < 1e-9, \"группы одинаковы: p = 1\"\nassert abs(exact_perm_p([0.1, 0.2], [0.3, 0.4]) - 1 / 3) < 1e-9, \"с дробными числами ошибка float: abs(d) >= abs(obs) - 1e-12\""
     }
    },
    {
     "title": "Односторонний перестановочный тест",
     "prompt": "<p>Перед тестом выбрано направление «среднее B <b>больше</b>?». Напишите функцию <code>perm_greater(a, b, n_perm=3000, seed=0)</code>: перемешайте объединённые данные <code>n_perm</code> раз через <code>rng.permutation</code> и верните долю случаев, когда ложная разница (mean(B*) − mean(A*)) <b>не меньше</b> фактической. Модуль не берём.</p>",
     "hints": [
      "Как <code>perm_test</code> из урока, но условие: <code>d &gt;= obs</code>, без <code>abs</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_g = _np.random.default_rng(12)\n_a = _g.normal(100, 15, 50)\n_b = _g.normal(106, 15, 50)\n_p = perm_greater(_a, _b)\nassert _p is not None, \"perm_greater должна возвращать значение\"\ndef _ref(a, b, n, seed):\n    r = _np.random.default_rng(seed); obs = b.mean() - a.mean(); pool = _np.concatenate([a, b]); c = 0\n    for _ in range(n):\n        s = r.permutation(pool); c += (s[len(a):].mean() - s[:len(a)].mean()) >= obs\n    return c / n\n_e = _ref(_a, _b, 3000, 1)\nassert abs(float(_p) - _e) < 0.03, f\"должно быть p ≈ {_e:.3f}, у вас {float(_p):.3f}. Условие d >= obs, без модуля\"\n_q = perm_greater(_b, _a)\nassert abs(float(_p) + float(_q) - 1) < 0.05, f\"если поменять группы местами, сумма односторонних p ≈ 1, у вас {float(_p):.3f} + {float(_q):.3f}\"\nassert float(perm_greater(_a, _a + 50, n_perm=500)) < 0.01, \"если B явно больше, p ≈ 0\""
     }
    },
    {
     "title": "Ratio-метрика: bootstrap по пользователям",
     "prompt": "<p>Средний чек = Σ выручки / Σ заказов. У одного пользователя несколько заказов, единица рандомизации — пользователь. Напишите функцию <code>ratio_ci(revenue, orders, n_boot=2000, level=0.95, seed=0)</code>: <code>revenue[i]</code> и <code>orders[i]</code> — общая выручка и число заказов i-го пользователя. Функция возвращает <code>(ratio, low, high)</code>:</p><ul><li><code>ratio</code> — Σ revenue / Σ orders по всем данным;</li><li><code>low</code>, <code>high</code> — перцентильный CI: на каждом повторении выбирайте с возвращением <b>индексы пользователей</b> (<code>rng.integers(0, n, n)</code>) и считайте Σ revenue / Σ orders этих пользователей.</li></ul>",
     "hints": [
      "Один набор индексов применяется к обоим массивам: <code>revenue[idx].sum() / orders[idx].sum()</code>. Выручка и заказы пользователя остаются вместе.",
      "Это не среднее отношений: сначала суммы, потом деление."
     ],
     "check": {
      "tests": "import numpy as _np\n_g = _np.random.default_rng(21)\n_o = 1 + _g.poisson(2, 600)\n_rev = _np.array([_g.lognormal(8, 0.8, _k).sum() for _k in _o])\n_r = ratio_ci(_rev, _o)\nassert _r is not None and len(_r) == 3, \"верните тройку (ratio, low, high)\"\n_ratio, _lo, _hi = (float(_v) for _v in _r)\nassert abs(_ratio - _rev.sum() / _o.sum()) < 1e-6, \"ratio = Σ revenue / Σ orders (не среднее отношений)\"\nassert _lo < _ratio < _hi, \"CI должен содержать ratio\"\n_rr = _np.random.default_rng(0); _v = []\nfor _ in range(2000):\n    _i = _rr.integers(0, 600, 600); _v.append(_rev[_i].sum() / _o[_i].sum())\n_e = (_np.quantile(_v, 0.025), _np.quantile(_v, 0.975)); _w = _e[1] - _e[0]\nassert abs(_lo - _e[0]) < 0.25 * _w and abs(_hi - _e[1]) < 0.25 * _w, f\"CI должен быть примерно ({_e[0]:.0f}, {_e[1]:.0f}), у вас ({_lo:.0f}, {_hi:.0f}). Делайте resample индексов пользователей\"\nassert abs((_hi - _lo) - _w) < 0.2 * _w, f\"ширина интервала должна быть около {_w:.0f}, у вас {_hi - _lo:.0f}\"\n_r9 = ratio_ci(_rev, _o, level=0.8)\nassert float(_r9[2]) - float(_r9[1]) < 0.85 * (_hi - _lo), \"80% интервал уже 95%: используйте параметр level\""
     }
    },
    {
     "title": "Решение по A/B: bootstrap и permutation",
     "prompt": "<p>Полный отчёт по метрике «выручка на пользователя» (RPU). Напишите функцию <code>ab_resampling(a, b, n=2000, seed=0)</code>: она возвращает словарь:</p><ul><li><code>\"diff\"</code> — mean(b) − mean(a);</li><li><code>\"low\"</code>, <code>\"high\"</code> — 95% bootstrap CI разницы (resample каждой группы отдельно, <code>n</code> повторений);</li><li><code>\"p\"</code> — двустороннее перестановочное p-value (<code>n</code> перемешиваний);</li><li><code>\"significant\"</code> — <code>p &lt; 0.05</code>.</li></ul><p>Для обоих методов достаточно одного <code>rng = np.random.default_rng(seed)</code>.</p>",
     "hints": [
      "Часть bootstrap — это <code>diff_ci</code> из прошлых заданий, только <code>stat = mean</code>.",
      "Часть permutation — это <code>perm_test</code> из урока: <code>abs(d) &gt;= abs(diff)</code>.",
      "Ключи словаря: <code>\"diff\"</code>, <code>\"low\"</code>, <code>\"high\"</code>, <code>\"p\"</code>, <code>\"significant\"</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_g = _np.random.default_rng(31)\n_a = _np.where(_g.random(1000) < 0.1, _g.lognormal(8, 0.7, 1000), 0.0)\n_b = _np.where(_g.random(1000) < 0.16, _g.lognormal(8, 0.7, 1000), 0.0)\n_r = ab_resampling(_a, _b)\nassert isinstance(_r, dict), \"верните словарь\"\nassert abs(float(_r[\"diff\"]) - (_b.mean() - _a.mean())) < 1e-9, \"diff = mean(b) − mean(a)\"\nassert float(_r[\"low\"]) < float(_r[\"diff\"]) < float(_r[\"high\"]), \"CI должен содержать diff\"\n_se = (_a.var(ddof=1) / 1000 + _b.var(ddof=1) / 1000) ** 0.5\n_w = float(_r[\"high\"]) - float(_r[\"low\"])\nassert abs(_w - 2 * 1.96 * _se) < 0.2 * 2 * 1.96 * _se, f\"ширина CI должна быть ≈ 2 × 1.96 × SE ≈ {2 * 1.96 * _se:.0f}, у вас {_w:.0f}. Делайте resample каждой группы с её размером\"\nassert float(_r[\"p\"]) < 0.05 and bool(_r[\"significant\"]) is True, f\"на этих данных должно быть p < 0.05 и significant = True, у вас p = {_r['p']}\"\n_c = _g.permutation(_a)\n_r0 = ab_resampling(_a, _c, n=1000)\nassert float(_r0[\"p\"]) > 0.5 and not bool(_r0[\"significant\"]), f\"для одинаковых групп p должно быть большим и significant = False, у вас p = {_r0['p']}\"\nassert float(_r0[\"low\"]) < 0 < float(_r0[\"high\"]), \"для одинаковых групп CI должен содержать 0\""
     }
    }
   ]
  },
  "ab-cuped": {
   "pr": [
    {
     "title": "Difference-in-Differences",
     "prompt": "<p>Напишите функцию <code>did(treat_before, treat_after, ctrl_before, ctrl_after)</code>: она возвращает оценку DiD — из изменения в группе treatment вычтите изменение в группе control.</p><p>Например, в Костанае ввели новый тариф (200 → 230), в Павлодаре изменений нет (150 → 150): <code>did(200, 230, 150, 150)</code> → <code>30</code>.</p>",
     "hints": [
      "<code>(treat_after - treat_before) - (ctrl_after - ctrl_before)</code>"
     ],
     "check": {
      "tests": "assert did(200, 230, 150, 150) == 30, \"did(200, 230, 150, 150) = 30 − 0 = 30\"\nassert did(80, 70, 100, 85) == 5, \"обе упали: (−10) − (−15) = 5, тариф смягчил падение\"\nassert did(50, 60, 40, 50) == 0, \"изменения одинаковы: эффект 0\"\nassert did(10, 12, 20, 30) == -8, \"did(10, 12, 20, 30) = 2 − 10 = −8\""
     }
    },
    {
     "title": "Сколько экономит CUPED",
     "prompt": "<p>После CUPED дисперсия становится Var(Y) × (1 − ρ²), а размер выборки пропорционален дисперсии. Напишите две функции:</p><ul><li><code>var_factor(rho)</code> — 1 − ρ²;</li><li><code>n_needed(n, rho)</code> — если без CUPED нужно <code>n</code> пользователей, сколько нужно с CUPED для той же power: n × (1 − ρ²), округлите до целого через <code>round</code>.</li></ul><p>Например, <code>n_needed(10000, 0.7)</code> → <code>5100</code>.</p>",
     "hints": [
      "<code>round(n * (1 - rho ** 2))</code>"
     ],
     "check": {
      "tests": "assert var_factor(0.7) is not None and abs(var_factor(0.7) - 0.51) < 1e-12, \"var_factor(0.7) = 1 − 0.49 = 0.51\"\nassert abs(var_factor(-0.5) - 0.75) < 1e-12, \"отрицательная корреляция тоже помогает: 1 − 0.25 = 0.75\"\nassert n_needed(10000, 0.7) == 5100, \"ρ = 0.7: 10 000 × 0.51 = 5 100\"\nassert n_needed(10000, 0.3) == 9100, \"ρ = 0.3: выигрыш всего 9%, 9 100\"\nassert n_needed(8000, 0) == 8000, \"ρ = 0: CUPED не помогает\""
     }
    },
    {
     "title": "Ложные срабатывания в A/A-тесте",
     "prompt": "<p>В списке p-value нескольких A/A-тестов. Напишите функцию <code>false_positive_rate(pvalues, alpha=0.05)</code>: она возвращает долю тестов с <code>p &lt; alpha</code>. В исправной системе она близка к alpha.</p><p>Например, <code>false_positive_rate([0.01, 0.2, 0.5, 0.03])</code> → <code>0.5</code>.</p>",
     "hints": [
      "<code>sum(p &lt; alpha for p in pvalues) / len(pvalues)</code>"
     ],
     "check": {
      "tests": "assert false_positive_rate([0.01, 0.2, 0.5, 0.03]) == 0.5, \"в 2 из 4 тестов p < 0.05: 0.5\"\nassert abs(false_positive_rate([_i / 100 for _i in range(100)]) - 0.05) < 1e-12, \"при равномерных p-value доля ≈ alpha = 0.05\"\nassert false_positive_rate([0.01, 0.2, 0.5, 0.03], alpha=0.02) == 0.25, \"alpha = 0.02: проходит только 0.01, 1/4\"\nassert false_positive_rate([0.05, 0.6]) == 0, \"p = 0.05 не значимо: условие строгое p < alpha\""
     }
    },
    {
     "title": "DiD из таблицы",
     "prompt": "<p>В таблице <code>df</code> — заказы по дням: <code>city</code>, <code>period</code> (<code>\"before\"</code> или <code>\"after\"</code>), <code>orders</code>. Напишите функцию <code>did_from_df(df, treat, ctrl)</code>: посчитайте среднее по каждому городу и периоду (<code>groupby</code>) и верните оценку DiD.</p><p>Например, если в Taraz среднее 100 → 130, а в Shymkent 90 → 105, то <code>did_from_df(df, \"Taraz\", \"Shymkent\")</code> → <code>15.0</code>.</p>",
     "hints": [
      "<code>m = df.groupby([\"city\", \"period\"])[\"orders\"].mean()</code>, затем <code>m[(treat, \"after\")]</code>.",
      "Число строк в периодах может различаться: берите среднее, а не сумму."
     ],
     "check": {
      "tests": "import pandas as _pd\n_rows = [(\"Taraz\", \"before\", _v) for _v in (98, 102, 100)] + [(\"Taraz\", \"after\", _v) for _v in (128, 132)] + [(\"Shymkent\", \"before\", _v) for _v in (88, 92, 90, 90)] + [(\"Shymkent\", \"after\", _v) for _v in (100, 110, 105)]\n_df = _pd.DataFrame(_rows, columns=[\"city\", \"period\", \"orders\"])\n_r = did_from_df(_df, \"Taraz\", \"Shymkent\")\nassert _r is not None, \"did_from_df должна возвращать значение\"\nassert abs(float(_r) - 15) < 1e-9, f\"должно быть DiD = (130 − 100) − (105 − 90) = 15, у вас {_r}. Берите среднее, а не сумму\"\nassert abs(float(did_from_df(_df, \"Shymkent\", \"Taraz\")) + 15) < 1e-9, \"если поменять города местами, знак меняется\"\n_df2 = _pd.DataFrame([(\"A\", \"before\", 10), (\"A\", \"after\", 10), (\"B\", \"before\", 5), (\"B\", \"after\", 8), (\"C\", \"before\", 1), (\"C\", \"after\", 100)], columns=[\"city\", \"period\", \"orders\"])\nassert abs(float(did_from_df(_df2, \"A\", \"B\")) + 3) < 1e-9, \"используются только города treat и ctrl: для A и B 0 − 3 = −3\""
     }
    },
    {
     "title": "SE после CUPED",
     "prompt": "<p>Напишите функцию <code>cuped_se(x_a, y_a, x_b, y_b)</code>: она возвращает <code>(effect, se_raw, se_cuped)</code>.</p><ul><li>θ = Cov(x, y) / Var(x) — считается по объединённым группам; поправка с одним общим mean(x): c = y − θ × (x − mean(x));</li><li><code>effect</code> — mean(c_b) − mean(c_a);</li><li><code>se_raw</code> — √(Var(y_a)/n_a + Var(y_b)/n_b), <code>se_cuped</code> — та же формула для c_a и c_b (<code>ddof=1</code>).</li></ul><p>Тест проверяет, что se_cuped / se_raw ≈ √(1 − ρ²).</p>",
     "hints": [
      "θ: <code>np.cov(x, y)[0, 1] / x.var(ddof=1)</code>, где x, y объединены через <code>np.concatenate</code>.",
      "Напишите вспомогательную функцию для SE: <code>np.sqrt(np.var(u, ddof=1) / len(u) + np.var(v, ddof=1) / len(v))</code>."
     ],
     "check": {
      "tests": "import numpy as _np\n_g = _np.random.default_rng(5)\n_n = 2500\n_xa = _g.gamma(2.0, 3000, _n); _xb = _g.gamma(2.0, 3000, _n)\n_ya = 0.8 * _xa + _g.normal(0, 3000, _n); _yb = 0.8 * _xb + _g.normal(0, 3000, _n) + 250\n_r = cuped_se(_xa, _ya, _xb, _yb)\nassert _r is not None and len(_r) == 3, \"верните тройку (effect, se_raw, se_cuped)\"\n_eff, _sr, _sc = (float(_v) for _v in _r)\n_x = _np.concatenate([_xa, _xb]); _y = _np.concatenate([_ya, _yb])\n_th = _np.cov(_x, _y)[0, 1] / _x.var(ddof=1)\n_ca = _ya - _th * (_xa - _x.mean()); _cb = _yb - _th * (_xb - _x.mean())\nassert abs(_eff - (_cb.mean() - _ca.mean())) < 1e-6, f\"должно быть effect ≈ {_cb.mean() - _ca.mean():.1f}, у вас {_eff:.1f}. Используйте один θ и одно общее mean(x)\"\n_e_sr = (_ya.var(ddof=1) / _n + _yb.var(ddof=1) / _n) ** 0.5\nassert abs(_sr - _e_sr) < 1e-6 * _e_sr, f\"должно быть se_raw ≈ {_e_sr:.1f}, у вас {_sr:.1f}: ddof=1\"\n_rho = _np.corrcoef(_x, _y)[0, 1]\nassert _sc < _sr, \"после CUPED SE должна быть меньше\"\nassert abs(_sc / _sr - (1 - _rho ** 2) ** 0.5) < 0.02, f\"должно быть se_cuped / se_raw ≈ √(1 − ρ²) = {(1 - _rho ** 2) ** 0.5:.3f}, у вас {_sc / _sr:.3f}\""
     }
    },
    {
     "title": "Два разных CTR",
     "prompt": "<p>Даны клики и показы каждого пользователя. Напишите две функции:</p><ul><li><code>global_ctr(clicks, views)</code> — ratio-метрика: Σ кликов / Σ показов;</li><li><code>mean_user_ctr(clicks, views)</code> — среднее собственных CTR пользователей: mean(clicks / views).</li></ul><p>Они отвечают на разные вопросы: в первой у активных пользователей больший вес. Может прийти и список, и массив: используйте <code>np.asarray</code>.</p>",
     "hints": [
      "Ratio: сначала суммы, потом деление.",
      "CTR пользователя: <code>clicks / views</code> (массивы), затем <code>.mean()</code>."
     ],
     "check": {
      "tests": "import numpy as _np\nassert global_ctr([1, 50], [10, 1000]) is not None, \"global_ctr должна возвращать значение\"\nassert abs(float(global_ctr([1, 50], [10, 1000])) - 51 / 1010) < 1e-12, \"global_ctr = 51 / 1010 ≈ 0.0505\"\nassert abs(float(mean_user_ctr([1, 50], [10, 1000])) - 0.075) < 1e-12, \"mean_user_ctr = (0.1 + 0.05) / 2 = 0.075\"\n_c = _np.array([2, 2, 2]); _v = _np.array([20, 20, 20])\nassert abs(float(global_ctr(_c, _v)) - float(mean_user_ctr(_c, _v))) < 1e-12, \"если показы равны, оба CTR совпадают\"\nassert abs(float(mean_user_ctr([0, 3], [5, 3])) - 0.5) < 1e-12, \"mean_user_ctr([0, 3], [5, 3]) = (0 + 1) / 2 = 0.5\""
     }
    },
    {
     "title": "Симуляция A/A: ловушка ratio-метрики",
     "prompt": "<p>Напишите функцию <code>aa_test(n_sims=300, seed=0)</code>. В каждой симуляции создайте через <code>make_group</code> две <b>одинаковые</b> группы (A/A) и проведите два теста:</p><ul><li><b>naive</b>: считая каждый показ независимым, z-тест для двух пропорций Σ кликов / Σ показов (pooled SE, двусторонний);</li><li><b>user</b>: t-тест Уэлча по CTR каждого пользователя (clicks / views) (<code>stats.ttest_ind(..., equal_var=False)</code>).</li></ul><p>Функция возвращает <code>(fpr_naive, fpr_user)</code> — доли симуляций с p &lt; 0.05. Показы одного пользователя зависимы, поэтому naive-тест говорит «значимо» гораздо чаще 5%.</p>",
     "hints": [
      "Naive: вместо n — число показов: SE = √(p(1 − p)(1/ΣV_a + 1/ΣV_b)), p-value = 2 × (1 − Φ(|z|)).",
      "User: <code>stats.ttest_ind(c_b / v_b, c_a / v_a, equal_var=False).pvalue</code>.",
      "Ведите два счётчика и в конце разделите на <code>n_sims</code>."
     ],
     "check": {
      "tests": "_r = aa_test(300, 1)\nassert _r is not None and len(_r) == 2, \"верните пару (fpr_naive, fpr_user)\"\n_fn, _fu = float(_r[0]), float(_r[1])\nassert 0.09 < _fn < 0.3, f\"naive-тест в A/A говорит «значимо» примерно в 15% случаев, у вас {_fn:.3f}. В знаменателе должно быть число показов\"\nassert 0.015 < _fu < 0.095, f\"тест на уровне пользователей должен давать ≈ 5%, у вас {_fu:.3f}\"\nassert _fn > _fu, \"у naive-теста больше ложных срабатываний\"\nassert aa_test(40, 2) == aa_test(40, 2), \"результат должен повторяться при том же seed: создавайте rng внутри функции с seed\""
     }
    },
    {
     "title": "CUPED: правильный и неправильный covariate",
     "prompt": "<p>Напишите функцию <code>cuped_effect(x_a, y_a, x_b, y_b)</code>: она возвращает эффект после CUPED mean(c_b) − mean(c_a) (один θ по обеим группам, одно общее mean(x)).</p><p>Тест вызывает её с двумя covariate:</p><ul><li>траты <b>до эксперимента</b> — эффект остаётся близким к истинному (+300 ₸), а шум уменьшается;</li><li>число сессий <b>во время эксперимента</b> — вариант увеличил и сессии, поэтому CUPED «вычитает» часть эффекта.</li></ul><p>Тест также ловит ошибку центрирования каждой группы по её собственному среднему: если прошлые траты групп случайно различаются, нужно общее mean(x).</p>",
     "hints": [
      "Превратите код CUPED из урока в функцию: <code>np.concatenate</code>, θ, затем один <code>x.mean()</code> для обеих групп.",
      "Если взять среднее каждой группы, средняя поправка в каждой группе станет 0, и эффект совпадёт с сырой разницей."
     ],
     "check": {
      "tests": "import numpy as _np\n_g = _np.random.default_rng(17)\n_n = 3000\n_xa = _g.gamma(2.0, 3000, _n); _xb = _g.gamma(2.0, 3000, _n)\n_sa = _g.poisson(10, _n).astype(float); _sb = (_g.poisson(10, _n) + _g.poisson(2, _n)).astype(float)\n_ya = 0.8 * _xa + 150 * _sa + _g.normal(0, 2500, _n)\n_yb = 0.8 * _xb + 150 * _sb + _g.normal(0, 2500, _n)\n_e = cuped_effect(_xa, _ya, _xb, _yb)\nassert _e is not None, \"cuped_effect должна возвращать значение\"\n_x = _np.concatenate([_xa, _xb]); _y = _np.concatenate([_ya, _yb]); _th = _np.cov(_x, _y)[0, 1] / _x.var(ddof=1)\n_ref = (_yb - _th * (_xb - _x.mean())).mean() - (_ya - _th * (_xa - _x.mean())).mean()\nassert abs(float(_e) - _ref) < 1e-6, f\"должно быть effect ≈ {_ref:.1f}, у вас {float(_e):.1f}: один θ и одно общее mean(x)\"\n_t = cuped_effect(_np.array([1., 2, 3]), _np.array([2., 4, 6]), _np.array([3., 4, 5]), _np.array([7., 9, 11]))\nassert _t is not None and abs(float(_t) - 0.4) < 1e-9, f\"для x_a = [1, 2, 3], x_b = [3, 4, 5] эффект должен быть 0.4, у вас {float(_t)}. Если центрировать группы по собственным средним, получится сырая разница 5: берите общее mean(x)\"\nassert abs(float(_e) - 300) < 150, f\"с прошлыми тратами эффект должен быть близок к истинным +300, у вас {float(_e):.1f}\"\n_s = cuped_effect(_sa, _ya, _sb, _yb)\n_x2 = _np.concatenate([_sa, _sb]); _th2 = _np.cov(_x2, _y)[0, 1] / _x2.var(ddof=1)\n_ref2 = (_yb - _th2 * (_sb - _x2.mean())).mean() - (_ya - _th2 * (_sa - _x2.mean())).mean()\nassert abs(float(_s) - _ref2) < 1e-6, \"с covariate сессий та же формула: один θ, общее mean(x)\"\nassert float(_s) < float(_e) - 150, f\"covariate из периода эксперимента «съедает» эффект: {float(_s):.1f}. Covariate должен быть измерен до эксперимента\""
     }
    }
   ]
  }
 }
});
