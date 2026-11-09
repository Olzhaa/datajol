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
 }
} });
