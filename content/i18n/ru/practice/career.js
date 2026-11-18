// career practice tasks: Russian text. Code, solutions and checks are in content/practice/career.js.
DJ.i18n.patch({ lessons: {
 "cr-5": {
  "pr": [
   {
    "title": "Владелец самой высокой зарплаты",
    "prompt": "<p>Выведите сотрудника(ов) с самой высокой зарплатой в компании: <code>name</code>, <code>salary</code>. Используйте подзапрос.</p>",
    "hints": [
     "<code>WHERE salary = (SELECT MAX(salary) FROM employees)</code>"
    ]
   },
   {
    "title": "Вторая наименьшая зарплата",
    "prompt": "<p>Выведите вторую снизу (уникальную) зарплату: <code>second_lowest</code>.</p>",
    "hints": [
     "Подход (а) из урока, но <code>MIN</code> и <code>&gt;</code>."
    ]
   },
   {
    "title": "Одинаковые зарплаты в компании",
    "prompt": "<p>По всей компании (без учёта отдела) выведите зарплаты, которые получают несколько человек: <code>salary</code>, <code>cnt</code>.</p>",
    "hints": [
     "<code>GROUP BY salary HAVING COUNT(*) &gt; 1</code>"
    ]
   },
   {
    "title": "Третья по величине зарплата",
    "prompt": "<p>Выведите третью по величине <b>уникальную</b> зарплату с помощью <code>DISTINCT</code> и <code>LIMIT/OFFSET</code>: <code>third_salary</code>.</p>",
    "hints": [
     "<code>OFFSET 2</code> пропускает первые два значения.",
     "Без <code>DISTINCT</code> одинаковые зарплаты «съедают» места в рейтинге."
    ]
   },
   {
    "title": "Сотрудник на втором месте",
    "prompt": "<p>Выведите сотрудников, которые получают вторую по величине (уникальную) зарплату: <code>name</code>, <code>department</code>, <code>salary</code>.</p>",
    "hints": [
     "Запрос из урока «вторая зарплата» сделайте подзапросом: <code>WHERE salary = (...)</code>."
    ]
   },
   {
    "title": "Сами дубликаты строк",
    "prompt": "<p>Выведите сотрудников, которые получают одинаковую зарплату в одном отделе: <code>name</code>, <code>department</code>, <code>salary</code>. Запрос, который находит группы, сделайте подзапросом и используйте <code>JOIN</code>.</p>",
    "hints": [
     "Подзапрос: <code>GROUP BY department, salary HAVING COUNT(*) &gt; 1</code>.",
     "Условие JOIN по двум столбцам: <code>ON d.department = e.department AND d.salary = e.salary</code>."
    ]
   },
   {
    "title": "Вторая зарплата в отделе",
    "prompt": "<p>Покажите крайний случай: для <b>каждого</b> отдела <code>department</code> и <code>second_salary</code> (вторая уникальная зарплата в отделе). В отделе, где только один уровень зарплаты, пусть будет <code>NULL</code>. Используйте коррелированный подзапрос.</p>",
    "hints": [
     "Повторите подход из урока внутри отдела: добавьте в подзапросы <code>WHERE e2.department = e.department</code>.",
     "<code>MAX</code> на пустом множестве даёт <code>NULL</code>."
    ]
   },
   {
    "title": "Найти N-ю зарплату счётом",
    "prompt": "<p>Без window function выведите сотрудников, которые получают <b>третью</b> по величине уникальную зарплату: <code>name</code>, <code>salary</code>. Идея: у людей, у которых ровно 2 уникальные зарплаты выше их собственной.</p>",
    "hints": [
     "<code>(SELECT COUNT(DISTINCT e2.salary) FROM employees e2 WHERE e2.salary &gt; e.salary) = 2</code>"
    ]
   }
  ]
 },
 "cr-6": {
  "pr": [
   {
    "title": "Первое место в отделе",
    "prompt": "<p>В каждом отделе выведите сотрудников с самой высокой зарплатой (если равны — все): <code>department</code>, <code>name</code>, <code>salary</code>. Используйте <code>DENSE_RANK</code>.</p>",
    "hints": [
     "Запрос из урока, но <code>rnk = 1</code>."
    ]
   },
   {
    "title": "Нумерация по зарплате",
    "prompt": "<p>Пронумеруйте всех сотрудников по убыванию зарплаты (при равенстве первым идёт меньший <code>id</code>): <code>name</code>, <code>salary</code>, <code>rn</code>. По порядку <code>rn</code>.</p>",
    "hints": [
     "<code>ROW_NUMBER() OVER (ORDER BY salary DESC, id)</code>"
    ]
   },
   {
    "title": "RANK и DENSE_RANK",
    "prompt": "<p>Увидьте разницу своими глазами: для каждого сотрудника выведите <code>name</code>, <code>salary</code>, <code>rnk</code> (<code>RANK</code>) и <code>drnk</code> (<code>DENSE_RANK</code>) по убыванию зарплаты по всей компании.</p>",
    "hints": [
     "Два window function могут стоять в одном <code>SELECT</code> рядом."
    ]
   },
   {
    "title": "Самый новый сотрудник в отделе",
    "prompt": "<p>В каждом отделе выведите сотрудника, которого взяли на работу последним: <code>department</code>, <code>name</code>, <code>hire_date</code>.</p>",
    "hints": [
     "<code>ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date DESC)</code>"
    ]
   },
   {
    "title": "Retention через два месяца",
    "prompt": "<p>Retention каждой когорты через <b>два месяца</b> после регистрации: <code>signup_month</code>, <code>cohort_size</code>, <code>retained</code>, <code>retention_pct</code> (с одним знаком после запятой). Когорта, из которой никто не вернулся, должна выйти с 0.</p>",
    "hints": [
     "<code>strftime('%Y-%m', u.signup_month || '-01', '+2 month')</code>",
     "Запишите в условие <code>ON</code>."
    ]
   },
   {
    "title": "Retention по каналам",
    "prompt": "<p>Посчитайте retention на следующий месяц по каналам: <code>channel</code>, <code>cohort_size</code>, <code>retained</code>, <code>retention_pct</code> (с одним знаком после запятой).</p>",
    "hints": [
     "Запрос из урока, но <code>GROUP BY u.channel</code>."
    ]
   },
   {
    "title": "Top-2 и доля в отделе",
    "prompt": "<p>В каждом отделе выведите сотрудников, которые входят в первые 2 уровня по зарплате (<code>DENSE_RANK</code>), и долю их зарплаты в общем фонде зарплат отдела: <code>department</code>, <code>name</code>, <code>salary</code>, <code>share_pct</code> (с одним знаком после запятой).</p>",
    "hints": [
     "Во внутреннем запросе два window: <code>DENSE_RANK()</code> и <code>SUM(salary) OVER (PARTITION BY department)</code>.",
     "Снаружи <code>WHERE rnk &lt;= 2</code>."
    ]
   },
   {
    "title": "Вернувшиеся в любой месяц позже",
    "prompt": "<p>Для каждой когорты выведите тех, кто был активен в <b>любой</b> месяц после месяца регистрации: <code>signup_month</code>, <code>cohort_size</code>, <code>returned</code>, <code>returned_pct</code> (с одним знаком после запятой). По порядку месяца регистрации.</p>",
    "hints": [
     "<code>EXISTS (SELECT 1 FROM activity a WHERE a.user_id = u.id AND a.month &gt; u.signup_month)</code> даёт 1 или 0.",
     "Месяцы — текст вида YYYY-MM, поэтому <code>&gt;</code> сравнивает правильно."
    ]
   }
  ]
 },
 "cr-7": {
  "pr": [
   {
    "title": "Количество дублей id",
    "prompt": "<p>Как <code>df.duplicated('order_id').sum()</code>: функция <code>count_dupes(ids)</code> должна возвращать количество лишних (повторяющихся) id в списке. Например, <code>count_dupes([1, 2, 1, 3, 1])</code> → <code>2</code>.</p>",
    "hints": [
     "<code>len(ids) - len(set(ids))</code>"
    ],
    "check": {
     "tests": "assert count_dupes([1, 2, 1, 3, 1]) == 2, \"count_dupes([1, 2, 1, 3, 1]) должно быть 2\"\nassert count_dupes([1, 2, 3]) == 0, \"Дубликатов нет: 0\"\nassert count_dupes([]) == 0, \"Пустой список: 0\""
    }
   },
   {
    "title": "Подсчёт пустых сумм",
    "prompt": "<p>Как <code>df.isna().sum()</code>: функция <code>count_missing(rows)</code> должна вернуть количество строк, у которых <code>amount is None</code>, среди кортежей <code>(order_id, city, amount, status)</code>.</p>",
    "hints": [
     "Распакуйте кортеж: <code>for _, _, amount, _ in rows</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\nassert count_missing(_rows) == 1, \"В этих данных одна пустая сумма: 1\"\nassert count_missing([(1, \"X\", None, \"a\"), (2, \"Y\", None, \"b\")]) == 2, \"Две пустые суммы: 2\""
    }
   },
   {
    "title": "Отфильтровать отменённые заказы",
    "prompt": "<p>Функция <code>drop_cancelled(rows)</code> должна убрать строки, где <code>status == \"cancelled\"</code>, и вернуть оставшиеся новым списком в исходном порядке.</p>",
    "hints": [
     "Статус — 4-й элемент кортежа: <code>r[3]</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = drop_cancelled(_rows)\nassert len(_r) == 6, f\"Должно остаться 6 строк, у вас {len(_r)}\"\nassert all(r[3] != \"cancelled\" for r in _r), \"Строк cancelled не должно остаться\"\nassert _r[0] == _rows[0] and _r[-1] == _rows[-1], \"Порядок строк должен сохраниться\""
    }
   },
   {
    "title": "Оставить первые строки",
    "prompt": "<p>Как <code>drop_duplicates('order_id')</code>: функция <code>dedupe(rows)</code> должна оставить только первую строку каждого <code>order_id</code> и вернуть их в исходном порядке.</p>",
    "hints": [
     "Запоминайте уже встреченные id в <code>seen = set()</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = dedupe(_rows)\nassert [r[0] for r in _r] == [1, 2, 3, 4, 5, 6], f\"order_id должны быть [1, 2, 3, 4, 5, 6], у вас {[r[0] for r in _r]}\"\nassert dedupe([(7, \"X\", 100, \"a\"), (7, \"Y\", 999, \"b\")]) == [(7, \"X\", 100, \"a\")], \"Первая строка должна остаться\""
    }
   },
   {
    "title": "Журнал очистки",
    "prompt": "<p>На take-home нужно записывать, сколько строк осталось после каждого шага. Функция <code>clean_log(rows)</code> должна вернуть список пар <code>(қадам, қалған_жолдар)</code> в таком порядке: <code>(\"бастапқы\", n)</code>, <code>(\"дубликат\", n)</code> (первая строка каждого order_id), <code>(\"cancelled\", n)</code>, <code>(\"бос сома\", n)</code>.</p>",
    "hints": [
     "После каждого шага создавайте новый список и добавляйте его длину в журнал."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\n_r = clean_log(_rows)\nassert _r == [(\"бастапқы\", 7), (\"дубликат\", 6), (\"cancelled\", 5), (\"бос сома\", 4)], f\"Журнал неверен: {_r}\""
    }
   },
   {
    "title": "Доля дохода по городам",
    "prompt": "<p>Для предложения «45% выручки приходится на Алматы»: функция <code>city_shares(rows)</code> должна вернуть словарь <code>{қала: үлес_пайызы}</code> по чистым кортежам <code>(order_id, city, amount)</code> (с одним знаком после запятой).</p>",
    "hints": [
     "Сначала сумма по городу, затем деление на общую сумму."
    ],
    "check": {
     "tests": "_r = city_shares([(1, \"Алматы\", 4500), (2, \"Астана\", 3000), (3, \"Алматы\", 0), (4, \"Шымкент\", 2500)])\nassert _r == {\"Алматы\": 45.0, \"Астана\": 30.0, \"Шымкент\": 25.0}, f\"Результат неверен: {_r}\""
    }
   },
   {
    "title": "Основной ответ take-home",
    "prompt": "<p>Функция <code>top_city_answer(rows)</code> должна очистить сырые кортежи <code>(order_id, city, amount, status)</code> (первая строка каждого order_id; без cancelled и без пустой суммы), а затем вернуть пару <code>(қала, үлес_пайызы)</code> — город с наибольшей выручкой и его долю (с одним знаком после запятой).</p>",
    "hints": [
     "Проверку на дубликаты делайте <b>до</b> проверки статуса и суммы.",
     "Наибольший: <code>max(totals, key=lambda c: totals[c])</code>."
    ],
    "check": {
     "tests": "_rows = [(1, \"Алматы\", 5000, \"delivered\"), (2, \"Астана\", 3000, \"delivered\"), (1, \"Алматы\", 5000, \"delivered\"), (3, \"Алматы\", 2000, \"cancelled\"), (4, \"Шымкент\", None, \"delivered\"), (5, \"Астана\", 4000, \"shipped\"), (6, \"Алматы\", 6000, \"delivered\")]\nassert top_city_answer(_rows) == (\"Алматы\", 61.1), f\"Ожидалось ('Алматы', 61.1), у вас {top_city_answer(_rows)}\""
    }
   },
   {
    "title": "Средний чек по месяцам",
    "prompt": "<p>Функция <code>monthly_aov(rows)</code> должна принимать кортежи <code>(order_id, date, amount, status)</code> (<code>date</code> — <code>\"YYYY-MM-DD\"</code>). Очистка: берём первую строку каждого order_id, отбрасываем cancelled и пустую сумму. Результат: <code>{\"YYYY-MM\": орташа_чек}</code>, округлённый до целого через <code>round</code>.</p>",
    "hints": [
     "Месяц: <code>date[:7]</code>.",
     "Два словаря: сумма и количество."
    ],
    "check": {
     "tests": "_rows = [(1, \"2024-08-02\", 5000, \"delivered\"), (2, \"2024-08-15\", 3000, \"delivered\"), (1, \"2024-08-02\", 5000, \"delivered\"), (3, \"2024-09-01\", 9000, \"cancelled\"), (4, \"2024-09-03\", 2000, \"shipped\"), (5, \"2024-09-20\", None, \"delivered\"), (6, \"2024-09-28\", 2500, \"delivered\")]\n_r = monthly_aov(_rows)\nassert _r == {\"2024-08\": 4000, \"2024-09\": 2250}, f\"Ожидалось {'2024-08': 4000, '2024-09': 2250}, у вас {_r}\""
    }
   }
  ]
 },
 "cr-8": {
  "pr": [
   {
    "title": "Самый слабый день",
    "prompt": "<p>День с наименьшей суммарной дневной выручкой (два региона вместе): <code>day</code>, <code>revenue</code>, одна строка.</p>",
    "hints": [
     "<code>GROUP BY day ORDER BY revenue LIMIT 1</code>"
    ]
   },
   {
    "title": "Выручка по регионам за период",
    "prompt": "<p>Первый шаг декомпозиции: общая выручка каждого региона за период: <code>region</code>, <code>revenue</code>.</p>",
    "hints": [
     "<code>GROUP BY region</code>"
    ]
   },
   {
    "title": "Посмотрим на дни падения",
    "prompt": "<p>Выручка каждого региона в дни <code>2024-09-07</code> и <code>2024-09-08</code>: <code>region</code>, <code>day</code>, <code>revenue</code>. По порядку региона, затем дня.</p>",
    "hints": [
     "<code>WHERE day IN ('2024-09-07', '2024-09-08')</code>"
    ]
   },
   {
    "title": "Однодневное изменение региона",
    "prompt": "<p>Для каждого региона в одной строке: <code>region</code>, <code>rev_07</code> (7 сентября), <code>rev_08</code> (8 сентября), <code>change</code> (= rev_08 − rev_07). Используйте условную сумму.</p>",
    "hints": [
     "<code>SUM(CASE WHEN day = '2024-09-07' THEN revenue END)</code>"
    ]
   },
   {
    "title": "Тот же день прошлой недели",
    "prompt": "<p>Воскресенье сравниваем не с субботой, а с прошлым воскресеньем. Сравните общую дневную выручку со значением 7 дней назад: <code>day</code>, <code>revenue</code>, <code>week_ago</code>. <code>LAG(revenue, 7)</code> даёт значение строки на 7 строк раньше. Выведите только дни, у которых есть <code>week_ago</code>, по порядку дней.</p>",
    "hints": [
     "<code>LAG(revenue, 7) OVER (ORDER BY day)</code>",
     "Для фильтрации результата window нужен ещё один CTE."
    ]
   },
   {
    "title": "Дни ниже среднего",
    "prompt": "<p>Дни, когда общая дневная выручка ниже средней за период: <code>day</code>, <code>revenue</code>, <code>diff</code> (revenue − среднее, с одним знаком после запятой). По порядку дней.</p>",
    "hints": [
     "Среднее за период: <code>AVG(revenue) OVER ()</code>."
    ]
   },
   {
    "title": "Региональная доля падения",
    "prompt": "<p>В день <code>2024-09-08</code> общая выручка упала по сравнению с предыдущим днём. Изменение каждого региона и его доля в общем изменении: <code>region</code>, <code>change</code>, <code>share_pct</code> (с одним знаком после запятой). <code>LAG</code> используйте внутри региона.</p>",
    "hints": [
     "<code>LAG(revenue) OVER (PARTITION BY region ORDER BY day)</code>",
     "Снаружи <code>WHERE day = '2024-09-08'</code> и <code>SUM(change) OVER ()</code>."
    ]
   },
   {
    "title": "Самое большое падение и его источник",
    "prompt": "<p>В одной строке выведите день, когда общая выручка упала больше всего, и регион, который в этот день упал сильнее всего: <code>day</code>, <code>change</code> (общее изменение), <code>worst_region</code>. День найдите по данным, а не по уроку.</p>",
    "hints": [
     "Три CTE: общее изменение по дням, изменение по регионам по дням, худший день.",
     "Выберите регион подзапросом: <code>ORDER BY r.change LIMIT 1</code>."
    ]
   }
  ]
 },
 "cr-ds": {
  "pr": [
   {
    "title": "AUC и Gini",
    "prompt": "<p>В банках качество модели называют через Gini. Напишите две функции:</p><ul><li><code>gini_from_auc(auc)</code> — Gini = 2 × AUC − 1;</li><li><code>auc_from_gini(gini)</code> — обратное преобразование.</li></ul><p>Например, <code>gini_from_auc(0.75)</code> → <code>0.5</code>, <code>auc_from_gini(0.52)</code> → <code>0.76</code>.</p>",
    "hints": [
     "Выразите AUC из Gini = 2 × AUC − 1: AUC = (Gini + 1) / 2."
    ],
    "check": {
     "tests": "assert gini_from_auc(0.75) is not None and abs(gini_from_auc(0.75) - 0.5) < 1e-12, \"AUC 0.75 → Gini 0.50\"\nassert abs(gini_from_auc(0.5)) < 1e-12, \"случайная модель: AUC 0.5 → Gini 0\"\nassert abs(gini_from_auc(1.0) - 1) < 1e-12, \"идеальная модель: Gini 1\"\nassert auc_from_gini(0.52) is not None and abs(auc_from_gini(0.52) - 0.76) < 1e-12, \"Gini 0.52 → AUC 0.76\"\nassert abs(auc_from_gini(gini_from_auc(0.81)) - 0.81) < 1e-12, \"две функции обратны друг другу\""
    }
   },
   {
    "title": "Accuracy модели «всё чисто»",
    "prompt": "<p>На несбалансированных данных accuracy обманывает. Напишите функцию <code>majority_accuracy(y)</code>: она возвращает accuracy модели, которая всегда предсказывает большинство (<code>y</code> — список 0/1).</p><p>Например, если из 1 000 транзакций 5 — фрод, <code>majority_accuracy(y)</code> → <code>0.995</code>: модель, которая ничего не находит, «права» на 99.5%.</p>",
    "hints": [
     "Доля единиц <code>share = sum(y) / len(y)</code>; большинство — <code>max(share, 1 - share)</code>."
    ],
    "check": {
     "tests": "assert majority_accuracy([0] * 995 + [1] * 5) is not None, \"majority_accuracy должна возвращать значение\"\nassert abs(majority_accuracy([0] * 995 + [1] * 5) - 0.995) < 1e-12, \"995 / 1000 = 0.995: accuracy высокая, но не найдено ни одного фрода\"\nassert abs(majority_accuracy([1, 1, 0]) - 2 / 3) < 1e-12, \"должно работать и когда большинство — 1: 2/3\"\nassert abs(majority_accuracy([0, 1]) - 0.5) < 1e-12, \"классы поровну: 0.5\""
    }
   },
   {
    "title": "Precision и recall",
    "prompt": "<p>Напишите функцию <code>precision_recall(y_true, y_pred)</code>: по спискам 0/1 она возвращает <code>(precision, recall)</code>.</p><ul><li>precision = TP / (TP + FP) — доля настоящего фрода среди помеченных как «фрод»;</li><li>recall = TP / (TP + FN) — какая часть всего фрода найдена.</li></ul><p>Если знаменатель равен 0, эта метрика равна <code>0.0</code>.</p>",
    "hints": [
     "TP: <code>t == 1 and p == 1</code>; FP: <code>t == 0 and p == 1</code>; FN: <code>t == 1 and p == 0</code>.",
     "Чтобы не делить на ноль: <code>tp / (tp + fp) if tp + fp else 0.0</code>."
    ],
    "check": {
     "tests": "_r = precision_recall([1, 0, 1, 1, 0, 0], [1, 1, 0, 1, 0, 0])\nassert _r is not None and len(_r) == 2, \"верните пару (precision, recall)\"\nassert abs(_r[0] - 2 / 3) < 1e-12 and abs(_r[1] - 2 / 3) < 1e-12, f\"TP = 2, FP = 1, FN = 1: должно быть (2/3, 2/3), у вас {_r}\"\n_r2 = precision_recall([1, 1, 1, 0], [1, 0, 0, 0])\nassert abs(_r2[0] - 1) < 1e-12 and abs(_r2[1] - 1 / 3) < 1e-12, \"осторожная модель: precision 1, recall 1/3\"\nassert tuple(precision_recall([1, 0], [0, 0])) == (0.0, 0.0), \"если никого не пометили «фродом»: precision 0.0 (знаменатель 0), recall 0.0\""
    }
   },
   {
    "title": "Статистика KS",
    "prompt": "<p>KS — наибольший разрыв между накопленными долями «плохих» и «хороших» клиентов. Напишите функцию <code>ks_stat(y, scores)</code>: берите каждый уникальный score как порог t, считайте TPR = (доля положительных примеров со score ≥ t) и FPR = (доля отрицательных со score ≥ t) и верните max |TPR − FPR|.</p><p>Например, <code>ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1])</code> → <code>0.5</code>.</p>",
    "hints": [
     "Разделите score на два списка: <code>pos</code> (y = 1) и <code>neg</code> (y = 0).",
     "<code>for thr in set(scores)</code>: <code>tpr = sum(s &gt;= thr for s in pos) / len(pos)</code>, FPR так же."
    ],
    "check": {
     "tests": "import numpy as _np\nassert ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1]) is not None, \"ks_stat должна возвращать значение\"\nassert abs(ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1]) - 0.5) < 1e-12, f\"должно быть KS = 0.5 (на порогах t = 0.9 и t = 0.7), у вас {ks_stat([1, 0, 1, 0], [0.9, 0.8, 0.7, 0.1])}\"\nassert abs(ks_stat([1, 1, 0, 0], [0.9, 0.8, 0.3, 0.1]) - 1) < 1e-12, \"идеальное разделение: KS = 1\"\nassert abs(ks_stat([0, 0, 1, 1], [0.9, 0.8, 0.3, 0.1]) - 1) < 1e-12, \"при обратном порядке тоже |TPR − FPR| = 1: берите модуль\"\n_g = _np.random.default_rng(6)\n_y = (_g.random(300) < 0.3).astype(int)\n_s = _np.round(_g.normal(0, 1, 300) + 1.2 * _y, 2)\n_e = max(abs((_s[_y == 1] >= _t).mean() - (_s[_y == 0] >= _t).mean()) for _t in set(_s.tolist()))\nassert abs(ks_stat(_y.tolist(), _s.tolist()) - _e) < 1e-9, f\"на 300 клиентах должно быть KS ≈ {_e:.3f}, у вас {ks_stat(_y.tolist(), _s.tolist()):.3f}\""
    }
   },
   {
    "title": "PSI: устарела ли модель",
    "prompt": "<p>Доли score по интервалам: <code>expected</code> — в период обучения, <code>actual</code> — сейчас. Напишите две функции:</p><ul><li><code>psi(expected, actual)</code> — PSI = Σ (a − e) × ln(a / e);</li><li><code>needs_retrain(expected, actual)</code> — <code>True</code>, если PSI &gt; 0.25 (существенный сдвиг).</li></ul><p>Например, <code>psi([0.25] * 4, [0.1, 0.2, 0.3, 0.4])</code> ≈ <code>0.228</code>: зона наблюдения, но переобучать пока не нужно.</p>",
    "hints": [
     "<code>sum((a - e) * math.log(a / e) for e, a in zip(expected, actual))</code>",
     "Каждое слагаемое неотрицательно: если a &gt; e, то ln(a / e) &gt; 0; если a &lt; e, оба множителя отрицательны."
    ],
    "check": {
     "tests": "assert psi([0.25] * 4, [0.25] * 4) is not None and abs(psi([0.25] * 4, [0.25] * 4)) < 1e-12, \"если распределение не изменилось, PSI = 0\"\n_p = psi([0.25] * 4, [0.1, 0.2, 0.3, 0.4])\nassert abs(_p - 0.228217) < 1e-4, f\"должно быть PSI ≈ 0.228, у вас {_p:.4f}\"\nassert abs(psi([0.5, 0.3, 0.2], [0.2, 0.3, 0.5]) - 0.549774) < 1e-4, \"крайние интервалы поменялись местами: PSI ≈ 0.550\"\nassert needs_retrain([0.25] * 4, [0.1, 0.2, 0.3, 0.4]) is False, \"0.228 ≤ 0.25: переобучать пока не нужно (False)\"\nassert needs_retrain([0.5, 0.3, 0.2], [0.2, 0.3, 0.5]) is True, \"0.55 > 0.25: существенный сдвиг (True)\"\nassert abs(psi([0.1, 0.9], [0.2, 0.8]) - psi([0.2, 0.8], [0.1, 0.9])) < 1e-12, \"PSI симметричен: если поменять expected и actual, значение не изменится\""
    }
   },
   {
    "title": "Дефолты в 20% самых рискованных",
    "prompt": "<p>В write-up результат формулируют на языке бизнеса: «модель находит 60% дефолтов в 20% самых рискованных заявок». Напишите функцию <code>capture_rate(y, scores, top=0.2)</code>: отсортируйте по score по убыванию и верните долю всех дефолтов, попавших в первые <code>k = round(top × n)</code> заявок.</p><p>У случайной модели это примерно равно <code>top</code>.</p>",
    "hints": [
     "Отсортируйте индексы по score: <code>sorted(range(len(y)), key=lambda i: scores[i], reverse=True)</code>.",
     "Разделите сумму y по первым k индексам на <code>sum(y)</code>."
    ],
    "check": {
     "tests": "_y = [1, 0, 0, 1, 0, 0, 0, 1, 0, 0]\n_s = [0.9, 0.8, 0.1, 0.7, 0.2, 0.3, 0.4, 0.05, 0.6, 0.5]\nassert capture_rate(_y, _s) is not None, \"capture_rate должна возвращать значение\"\nassert abs(capture_rate(_y, _s) - 1 / 3) < 1e-12, f\"в 2 самых рискованных заявках (0.9, 0.8) 1 из 3 дефолтов: 1/3, у вас {capture_rate(_y, _s)}\"\nassert abs(capture_rate(_y, _s, top=0.3) - 2 / 3) < 1e-12, \"top = 0.3: первые 3 заявки (0.9, 0.8, 0.7), 2/3\"\nassert abs(capture_rate(_y, _s, top=1.0) - 1) < 1e-12, \"top = 1: пойманы все дефолты\"\nassert abs(capture_rate([1, 1, 0, 0, 0], [0.2, 0.1, 0.9, 0.8, 0.7], top=0.4)) < 1e-12, \"модель с обратным порядком не находит никого в первых 40%\""
    }
   },
   {
    "title": "Аудит утечки",
    "prompt": "<p>Take-home: в <code>df</code> — кредитные заявки и столбец <code>default</code>. Проверьте, насколько каждый признак сам по себе упорядочивает target. Напишите функцию <code>suspicious(df, target, thr=0.9)</code>: для каждого столбца, кроме target, посчитайте <code>roc_auc_score(df[target], df[col])</code> и верните <b>отсортированный</b> список столбцов, у которых max(AUC, 1 − AUC) ≥ thr.</p><p>1 − AUC тоже нужен: если признак связан с target обратно (например, доля своевременных платежей), AUC близок к 0. Если у одного признака AUC 0.95, это обычно информация, «неизвестная в момент прогноза».</p>",
    "hints": [
     "<code>for col in df.columns</code>, target пропустите через <code>continue</code>.",
     "<code>auc = roc_auc_score(df[target], df[col])</code>; условие: <code>max(auc, 1 - auc) &gt;= thr</code>.",
     "В конце <code>sorted(...)</code>."
    ],
    "check": {
     "tests": "from sklearn.metrics import roc_auc_score as _auc\n_r = suspicious(df, \"default\")\nassert _r is not None, \"suspicious должна возвращать значение\"\nassert list(_r) == [\"collection_calls\", \"on_time_share\"], f\"подозрительные признаки должны быть ['collection_calls', 'on_time_share'], у вас {_r}. У on_time_share AUC близок к 0: проверяйте и 1 − AUC\"\nassert \"default\" not in suspicious(df, \"default\", thr=0.5), \"не проверяйте сам столбец target\"\n_m = {c: max(_auc(df[\"default\"], df[c]), 1 - _auc(df[\"default\"], df[c])) for c in df.columns if c != \"default\"}\n_e = sorted(c for c, v in _m.items() if v >= 0.6)\nassert list(suspicious(df, \"default\", thr=0.6)) == _e, f\"при thr = 0.6 должно быть {_e}: используйте параметр thr\"\n_d2 = df.rename(columns={\"default\": \"bad\"})\nassert list(suspicious(_d2, \"bad\")) == [\"collection_calls\", \"on_time_share\"], \"имя target должно браться из параметра, не пишите default напрямую\""
    }
   },
   {
    "title": "Out-of-time Gini и Pipeline",
    "prompt": "<p>Заявки 2024 года: <code>month</code> (1–12), признаки и <code>default</code>. Напишите функцию <code>oot_gini(df, cutoff)</code>:</p><ol><li>train — <code>month &lt; cutoff</code>, test — <code>month &gt;= cutoff</code> (split по времени);</li><li>признаки — все столбцы, кроме <code>month</code> и <code>default</code>;</li><li><code>Pipeline([(\"scaler\", StandardScaler()), (\"model\", LogisticRegression(max_iter=1000))])</code> обучается (fit) только на train;</li><li>верните <code>(gini_train, gini_test)</code>: Gini = 2 × ROC-AUC − 1 по <code>predict_proba(...)[:, 1]</code>.</li></ol><p>В данных в последние месяцы закономерность ослабла (drift), поэтому out-of-time Gini ниже, чем на train.</p>",
    "hints": [
     "Split: <code>train, test = df[df[\"month\"] &lt; cutoff], df[df[\"month\"] &gt;= cutoff]</code>.",
     "Признаки: <code>[c for c in df.columns if c not in (\"month\", \"default\")]</code>.",
     "<code>pipe.fit(train[features], train[\"default\"])</code>, затем на каждой части <code>2 * roc_auc_score(...) - 1</code>."
    ],
    "check": {
     "tests": "from sklearn.pipeline import Pipeline as _P\nfrom sklearn.preprocessing import StandardScaler as _S\nfrom sklearn.linear_model import LogisticRegression as _L\nfrom sklearn.metrics import roc_auc_score as _auc\ndef _ref(d, cut):\n    tr, te = d[d[\"month\"] < cut], d[d[\"month\"] >= cut]\n    f = [c for c in d.columns if c not in (\"month\", \"default\")]\n    p = _P([(\"s\", _S()), (\"m\", _L(max_iter=1000))]).fit(tr[f], tr[\"default\"])\n    return 2 * _auc(tr[\"default\"], p.predict_proba(tr[f])[:, 1]) - 1, 2 * _auc(te[\"default\"], p.predict_proba(te[f])[:, 1]) - 1\n_r = oot_gini(df, 10)\nassert _r is not None and len(_r) == 2, \"верните пару (gini_train, gini_test)\"\n_e = _ref(df, 10)\nassert abs(float(_r[0]) - _e[0]) < 1e-6, f\"должно быть gini_train ≈ {_e[0]:.4f}, у вас {float(_r[0]):.4f}. month и default не входят в признаки, scaler обучается только на train\"\nassert abs(float(_r[1]) - _e[1]) < 1e-6, f\"должно быть gini_test ≈ {_e[1]:.4f}, у вас {float(_r[1]):.4f}. test — month >= cutoff\"\nassert float(_r[1]) < float(_r[0]) - 0.05, \"из-за drift out-of-time Gini ниже, чем на train\"\n_e7 = _ref(df, 7)\nassert abs(float(oot_gini(df, 7)[1]) - _e7[1]) < 1e-6, \"используйте параметр cutoff\""
    }
   }
  ]
 }
} });
