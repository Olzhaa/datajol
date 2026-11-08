// M3.5 Power BI: Russian text. Code, solutions and expected output are in content/powerbi.js.
DJ.i18n.patch({
  modules: {
    'm3-5': { intro: 'Power BI — BI-инструмент, который чаще всего требуют в вакансиях аналитиков в Казахстане. В этом модуле вы изучите рабочий процесс, Power Query, модель данных (star schema), меры DAX, time intelligence, дизайн визуалов и публикацию. Power BI не запускается в браузере, поэтому уроки состоят из текста и тестов, а логику мер DAX мы проверяем на SQL. Установите бесплатный Power BI Desktop (Windows) и повторяйте каждый урок параллельно.' }
  },
  lessons: {
    'pbi-1': {
      title: 'Что такое Power BI: рабочий процесс',
      body: `
<p><b>Power BI</b> — инструмент Microsoft, который загружает, очищает и моделирует данные и строит интерактивные отчёты (report). Основные части:</p>
<table>
<tr><th>Часть</th><th>Для чего</th></tr>
<tr><td><b>Power BI Desktop</b></td><td>Создание отчёта на компьютере (бесплатно, Windows)</td></tr>
<tr><td><b>Power BI Service</b></td><td>Публикация, совместный доступ и обновление отчёта в браузере</td></tr>
<tr><td><b>Power BI Mobile</b></td><td>Просмотр отчёта с телефона</td></tr>
</table>
<h3>Рабочий процесс</h3>
<pre><code>Get Data → Power Query (очистка) → Model (связи)
        → DAX (меры) → Visuals (отчёт) → Publish (публикация)</code></pre>
<p>Этот процесс такой же, как в SQL и Python: очистка, объединение, агрегация, отображение. Только здесь многое делается мышкой, а логика хранится в формулах <b>Power Query (язык M)</b> и <b>DAX</b>.</p>
<div class="tip">Если вы знаете Excel, Power Query и Power Pivot покажутся знакомыми: Power BI построен на них.</div>
<h3>Когда нужен Power BI?</h3>
<p>Для разового вопроса хватит SQL-запроса и таблицы Excel. Но если руководство смотрит один и тот же отчёт каждый день или каждую неделю, пересобирать его вручную долго, и легко ошибиться. В Power BI вы строите отчёт один раз, он сам обновляется из источника, а пользователи с помощью фильтров сами находят ответы на свои вопросы.</p>
<h3>Что вы изучите в этом модуле</h3>
<ul>
<li>Шаги очистки данных в Power Query.</li>
<li>Модель star schema и связи между таблицами.</li>
<li>DAX: меры (measures), <code>CALCULATE</code>, функции времени.</li>
<li>Дизайн отчёта и его публикацию.</li>
</ul>
<p>Самого Power BI на сайте нет, поэтому задания проверяют понятия, а логику DAX мы отрабатываем через эквивалент на SQL. Установите Power BI Desktop на свой компьютер (Windows) бесплатно и повторяйте примеры параллельно.</p>
<div class="tip">Если у вас Mac, Power BI Desktop напрямую не работает. Помогут Power BI Service в браузере или виртуальная машина с Windows.</div>`,
      ex: [
        { prompt: 'Что нужно, чтобы поделиться отчётом с коллегами через браузер?', options: ['Power BI Desktop', 'Power BI Service', 'Power Query', 'DAX Studio'], explain: 'Создаём в Desktop, публикуем в Service (app.powerbi.com) и делимся.' },
        { prompt: 'Какой порядок рабочего процесса правильный?', options: ['Visuals → DAX → Power Query → Model', 'Get Data → Power Query → Model → DAX → Visuals', 'DAX → Get Data → Visuals → Model', 'Model → Visuals → Power Query → Publish'], explain: 'Сначала загружаем и очищаем данные, затем модель и меры, в конце визуалы.' }
      ]
    },
    'pbi-2': {
      title: 'Power Query: очистка данных',
      body: `
<p><b>Power Query</b> — редактор, который загружает и преобразует данные. Каждое действие записывается шагом в список <b>Applied Steps</b>, а при обновлении данных все шаги автоматически выполняются заново. Под капотом работает <b>язык M</b>.</p>
<h3>Часто используемые шаги</h3>
<table>
<tr><th>Power Query</th><th>Эквивалент в SQL</th></tr>
<tr><td>Change Type (смена типа)</td><td><code>CAST(amount AS INTEGER)</code></td></tr>
<tr><td>Filter Rows</td><td><code>WHERE status = 'paid'</code></td></tr>
<tr><td>Remove Duplicates</td><td><code>SELECT DISTINCT</code></td></tr>
<tr><td>Replace Values / Fill Down</td><td><code>COALESCE</code>, <code>CASE</code></td></tr>
<tr><td>Merge Queries</td><td><code>JOIN</code></td></tr>
<tr><td>Append Queries</td><td><code>UNION ALL</code></td></tr>
<tr><td>Group By</td><td><code>GROUP BY</code></td></tr>
<tr><td>Unpivot Columns</td><td>превращение широкой таблицы в длинную</td></tr>
</table>
<p>Пример кода M (Power Query пишет его сам):</p>
<pre><code>= Table.SelectRows(Orders, each [status] = "paid" and [amount] &lt;&gt; null)</code></pre>
<div class="tip">Правило: по возможности очищайте данные в Power Query (или в SQL на стороне источника), а не в DAX. В модель должны попадать только чистые данные.</div>
<h3>Как организовать шаги?</h3>
<p>Чем длиннее список Applied Steps, тем труднее его читать. Три совета:</p>
<ul>
<li><b>Давайте шагам имена</b>: не «Changed Type1», а «Сумма преобразована в число».</li>
<li><b>Ставьте фильтр пораньше</b>: если убрать ненужные строки в начале, следующие шаги выполняются быстрее.</li>
<li><b>Храните справочники отдельно</b>: таблицы вроде справочника городов делайте отдельным запросом (query) и подключайте через Merge.</li>
</ul>
<h3>Пример Unpivot</h3>
<p>Из Excel часто приходит «широкая» таблица:</p>
<table>
<tr><th>Филиал</th><th>Январь</th><th>Февраль</th></tr>
<tr><td>Алматы</td><td>120</td><td>135</td></tr>
</table>
<p>Если выбрать столбец «Филиал» и нажать <b>Unpivot Other Columns</b>, таблица станет «длинной»: <code>Филиал | Месяц | Сумма</code>. Теперь при добавлении нового месяца отчёт менять не нужно: месяц придёт новой строкой.</p>`,
      ex: [
        { prompt: 'Какое действие Power Query нужно, чтобы объединить в одну таблицу таблицы продаж двух филиалов с одинаковой структурой?', options: ['Merge Queries', 'Append Queries', 'Group By', 'Unpivot'], explain: 'Append добавляет строки снизу (UNION ALL). Merge объединяет столбцы по ключу (JOIN).' },
        { prompt: 'В таблице месяцы стоят в столбцах: Январь, Февраль, Март... Как привести её к удобному для графика виду «месяц | сумма»?', options: ['Pivot Column', 'Unpivot Columns', 'Transpose', 'Fill Down'], explain: 'Unpivot превращает широкую таблицу в длинную (long): каждый месяц становится отдельной строкой.' },
        { prompt: 'Повторите шаги Power Query на SQL. Оставьте в таблице <code>orders</code> только чистые заказы: <code>status = \'paid\'</code>, <code>amount</code> не пустой и меньше 20 000. Выведите столбцы <code>id</code>, <code>customer_id</code>, <code>order_date</code>, <code>amount</code>.', hints: ['Объедините три условия через <code>AND</code>.', '<code>amount IS NOT NULL</code> — проверка на пустое значение.'] }
      ]
    },
    'pbi-3': {
      title: 'Модель данных: star schema',
      body: `
<p>В Power BI лучше иметь не одну большую таблицу, а несколько связанных между собой. Лучшая структура — <b>star schema</b> (схема «звезда»).</p>
<pre><code>        dim_date
            │
dim_customer ── fact_orders ── dim_product
            │
        dim_city</code></pre>
<table>
<tr><th>Тип таблицы</th><th>Что хранит</th><th>Пример</th></tr>
<tr><td><b>Fact</b> (факты)</td><td>События и числа, строк много</td><td>заказы: дата, клиент, сумма</td></tr>
<tr><td><b>Dimension</b> (измерение)</td><td>Описания: «кто, что, когда, где»</td><td>клиент: город, канал</td></tr>
</table>
<h3>Связи (relationships)</h3>
<ul>
<li>Обычно <b>один-ко-многим (1:*)</b>: у одного клиента много заказов.</li>
<li><b>Направление фильтра</b> (filter direction) идёт от dimension к fact. Если выбрать «Алматы» в slicer, фильтр течёт по пути customers → orders.</li>
<li>Двусторонний (both) фильтр включайте, только когда он действительно нужен: он замедляет модель и даёт неожиданные результаты.</li>
</ul>
<h3>Таблица дат (Date table)</h3>
<p>Чтобы работали функции time intelligence, нужна отдельная таблица дат с непрерывными днями. Её помечают как <b>Mark as date table</b>.</p>
<pre><code>Date = CALENDAR(DATE(2024,1,1), DATE(2024,12,31))</code></pre>
<h3>Чем плоха одна большая таблица?</h3>
<p>Если собрать все столбцы в одну таблицу, город клиента повторяется в каждом заказе. При 1 миллионе заказов слово «Алматы» хранится миллион раз. Модель становится тяжёлой, а если город клиента изменится, его придётся исправлять в тысячах строк. В star schema город хранится один раз, в таблице клиентов.</p>
<h3>Проверка модели</h3>
<ul>
<li>Уникален ли ключевой столбец в каждой таблице dimension? Если нет, связь становится «многие-ко-многим» (*:*).</li>
<li>Есть ли в таблице fact ключи, которых нет в dimension? В отчёте они появятся как «(Blank)».</li>
<li>Все ли связи активны и правильно ли их направление?</li>
</ul>
<div class="tip">Сделайте скриншот схемы модели (Model view) и добавьте его в портфолио. По модели работодатель видит, как вы думаете о данных.</div>`,
      ex: [
        { prompt: 'Какая таблица в данных «Первого кофе» является таблицей fact?', options: ['customers', 'orders', 'Таблица дат', 'Список городов'], explain: 'orders — это события (заказы) и числа (сумма). customers — описывающая их таблица dimension.' },
        { prompt: 'В какую сторону обычно идёт фильтр по связи между customers (1) и orders (*)?', options: ['orders → customers', 'customers → orders', 'Обязательно в обе стороны', 'Фильтр не передаётся'], explain: 'От dimension к fact: если выбрать город, останутся заказы этого города.' },
        { prompt: 'Зачем нужна отдельная таблица дат?', options: ['Чтобы отчёт выглядел красиво', 'Функции time intelligence, такие как TOTALYTD и SAMEPERIODLASTYEAR, требуют непрерывных дат', 'Power BI не умеет читать столбец с датой', 'Чтобы уменьшить размер файла'], explain: 'В таблице должны быть и дни без заказов, иначе расчёты по времени получатся неверными.' }
      ]
    },
    'pbi-4': {
      title: 'Основы DAX: мера и вычисляемый столбец',
      body: `
<p><b>DAX</b> (Data Analysis Expressions) — язык формул Power BI. Он похож на формулы Excel, но работает не с ячейками, а со <b>столбцами и таблицами</b>.</p>
<h3>Measure и calculated column</h3>
<table>
<tr><th></th><th>Calculated column</th><th>Measure (мера)</th></tr>
<tr><td>Когда вычисляется</td><td>При загрузке, для каждой строки</td><td>В визуале, в зависимости от фильтра</td></tr>
<tr><td>Где хранится</td><td>В таблице (занимает память)</td><td>Не хранится, только формула</td></tr>
<tr><td>Пример</td><td><code>Size = IF(orders[amount] &gt; 3000, "Большой", "Малый")</code></td><td><code>Revenue = SUM(orders[amount])</code></td></tr>
</table>
<p>Сравнение: calculated column — новый столбец в таблице, в каждой строке записано своё значение. Measure — калькулятор над таблицей: он считает те строки, которые сейчас видны на экране.</p>
<p>Правило: агрегат (сумма, среднее, доля) — всегда <b>measure</b>. Calculated column — для описания строки, например категория для slicer.</p>
<h3>Пример: одна таблица, два способа</h3>
<table>
<tr><th>id</th><th>customer_id</th><th>amount</th><th>Size (column)</th></tr>
<tr><td>1</td><td>1</td><td>2500</td><td>Малый</td></tr>
<tr><td>2</td><td>2</td><td>4200</td><td>Большой</td></tr>
<tr><td>3</td><td>1</td><td>1800</td><td>Малый</td></tr>
<tr><td>4</td><td>1</td><td>3600</td><td>Большой</td></tr>
</table>
<p>Столбец <code>Size</code> вычислен один раз для каждой строки при загрузке. Теперь, если поставить в матрицу <code>Size</code> в строки, а меры ниже в значения, каждая ячейка вычисляется по своим строкам:</p>
<table>
<tr><th>Size</th><th>Revenue</th><th>Orders</th><th>Customers</th><th>AOV</th></tr>
<tr><td>Малый</td><td>4300</td><td>2</td><td>1</td><td>2150</td></tr>
<tr><td>Большой</td><td>7800</td><td>2</td><td>2</td><td>3900</td></tr>
<tr><td><b>Total</b></td><td>12100</td><td>4</td><td>2</td><td>3025</td></tr>
</table>
<p>В строке Total Customers равно 2, а не 1 + 2 = 3: в итоговой строке мера не складывает строки, а <b>пересчитывает</b> по всем данным. Клиент 1 есть в обеих группах, но считается один раз.</p>
<h3>Основные меры</h3>
<pre><code>Revenue   = SUM(orders[amount])
Orders    = COUNTROWS(orders)
Customers = DISTINCTCOUNT(orders[customer_id])
AOV       = DIVIDE([Revenue], [Orders])</code></pre>
<div class="tip"><code>DIVIDE(a, b)</code> при делении на ноль не выдаёт ошибку, а возвращает пустое значение. Всегда используйте его вместо <code>a / b</code>.</div>
<p>Меры могут ссылаться друг на друга: внутри <code>AOV</code> используются <code>[Revenue]</code> и <code>[Orders]</code>. Это помогает не повторять код.</p>
<h3>Эквивалент в SQL</h3>
<table>
<tr><th>DAX</th><th>SQL</th></tr>
<tr><td><code>SUM(orders[amount])</code></td><td><code>SUM(amount)</code></td></tr>
<tr><td><code>COUNTROWS(orders)</code></td><td><code>COUNT(*)</code></td></tr>
<tr><td><code>DISTINCTCOUNT(orders[customer_id])</code></td><td><code>COUNT(DISTINCT customer_id)</code></td></tr>
<tr><td><code>DIVIDE(a, b)</code></td><td><code>a * 1.0 / b</code> (1.0 — чтобы избежать целочисленного деления), округление — <code>ROUND()</code></td></tr>
</table>
<h3>Частые ошибки</h3>
<ul>
<li>Делать сумму через calculated column: она не меняется от slicer и занимает память.</li>
<li>Считать уникальных клиентов как <code>COUNT(orders[customer_id])</code>: это даёт число заказов, а <code>COUNTROWS(customers)</code> добавляет и тех, кто ещё ничего не купил.</li>
<li>Делить через <code>/</code>: при пустом фильтре возникает ошибка деления на ноль.</li>
</ul>`,
      ex: [
        { prompt: 'Как сделать «Средний чек», который меняется при выборе города в slicer?', options: ['Calculated column', 'Measure', 'Шаг Power Query', 'Новая таблица'], explain: 'Measure вычисляется в контексте визуала и фильтров, поэтому меняется в зависимости от выбора.' },
        { prompt: 'Какая функция DAX даёт число уникальных покупателей?', options: ['COUNT(orders[customer_id])', 'COUNTROWS(customers)', 'DISTINCTCOUNT(orders[customer_id])', 'SUM(orders[customer_id])'], explain: 'DISTINCTCOUNT — это COUNT(DISTINCT ...) в SQL. COUNTROWS(customers) считает и тех, кто не делал заказов.' },
        { prompt: 'Выведите SQL-эквивалент мер DAX по чистым заказам: <code>revenue</code>, <code>orders</code>, <code>customers</code> (уникальные) и <code>aov</code> (округлённый до целого).', hints: ['<code>COUNT(DISTINCT customer_id)</code> = DISTINCTCOUNT.', '<code>ROUND(SUM(amount) * 1.0 / COUNT(*))</code>'] }
      ]
    },
    'pbi-5': {
      title: 'CALCULATE и контекст фильтра',
      body: `
<p>Самое важное понятие DAX — <b>контекст фильтра</b> (filter context). Каждая ячейка визуала вычисляется со своими фильтрами: <code>[Revenue]</code> в строке «Алматы» суммирует только заказы Алматы.</p>
<h3>CALCULATE</h3>
<p><code>CALCULATE</code> вычисляет меру с <b>изменённым</b> фильтром:</p>
<pre><code>Instagram Revenue = CALCULATE([Revenue], customers[channel] = "instagram")</code></pre>
<h3>ALL: снятие фильтра и доля</h3>
<pre><code>Total Revenue = CALCULATE([Revenue], ALL(customers[channel]))
Share %       = DIVIDE([Revenue], [Total Revenue])</code></pre>
<p>В таблице в строке каждого канала <code>[Revenue]</code> — выручка этого канала, а <code>[Total Revenue]</code> — выручка всех каналов. Если разделить одно на другое, получится доля канала.</p>
<h3>Пример: контекст фильтра каждой ячейки</h3>
<p>Чистые заказы: instagram 5000, 2gis 3000, referral 2000, всего 10000. В строках матрицы — <code>customers[channel]</code>:</p>
<table>
<tr><th>channel</th><th>Контекст фильтра</th><th>Revenue</th><th>Instagram Revenue</th><th>Total Revenue</th><th>Share %</th></tr>
<tr><td>instagram</td><td>channel = instagram</td><td>5000</td><td>5000</td><td>10000</td><td>50%</td></tr>
<tr><td>2gis</td><td>channel = 2gis</td><td>3000</td><td>5000</td><td>10000</td><td>30%</td></tr>
<tr><td>referral</td><td>channel = referral</td><td>2000</td><td>5000</td><td>10000</td><td>20%</td></tr>
<tr><td><b>Total</b></td><td>фильтра нет</td><td>10000</td><td>5000</td><td>10000</td><td>100%</td></tr>
</table>
<ul>
<li><b>Revenue</b> использует фильтр строки как есть.</li>
<li><b>Instagram Revenue</b>: <code>channel = "instagram"</code> внутри CALCULATE <b>заменяет</b> фильтр строки по этому столбцу (например, 2gis), поэтому в каждой строке 5000.</li>
<li><b>Total Revenue</b>: <code>ALL(customers[channel])</code> снимает фильтр по каналу, в каждой строке 10000.</li>
</ul>
<p>Если в строках город, то для общей суммы внутри <code>ALL</code> пишите этот столбец, то есть город.</p>
<p>В SQL это похоже на оконную функцию (window function): <code>SUM(revenue) OVER ()</code> — общая сумма по всем строкам. В запросе с <code>GROUP BY channel</code>, чтобы сложить суммы групп, агрегат нужно обернуть в окно: <code>SUM(SUM(amount)) OVER ()</code>. Для процента — <code>* 100.0</code>, для округления — <code>ROUND(..., 1)</code>.</p>
<h3>Частые ошибки</h3>
<ul>
<li>Писать в <code>ALL</code> другой столбец: строки по каналу, а <code>ALL(customers[city])</code> — фильтр по каналу остаётся, и доля в каждой строке равна 100%.</li>
<li>Делить долю через <code>/</code>: ошибка в пустых строках. Используйте <code>DIVIDE</code>.</li>
<li>Думать, что CALCULATE «добавляется» к внешнему фильтру: по тому же столбцу он <b>заменяет</b> внешний фильтр.</li>
</ul>
<div class="tip">На собеседовании часто спрашивают: «Чем row context отличается от filter context?» Row context — «текущая строка» в calculated column. Filter context — фильтры, заданные визуалом и slicer. CALCULATE превращает row context в filter context (context transition).</div>`,
      ex: [
        { prompt: 'В матрице строки по городам. Какая формула нужна, чтобы в каждой строке показать общую выручку всех городов?', options: ['SUM(orders[amount])', 'CALCULATE([Revenue], ALL(customers[city]))', 'FILTER(orders, orders[amount] > 0)', 'DISTINCTCOUNT(customers[city])'], explain: 'ALL снимает фильтр по городу, поэтому в каждой строке выходит общая сумма.' },
        { prompt: 'Что покажет <code>CALCULATE([Revenue], customers[city] = "Астана")</code> в строке «Алматы»?', options: ['Выручку Алматы', 'Выручку Астаны', 'Пустое значение', 'Общую выручку'], explain: 'Фильтр внутри CALCULATE заменяет внешний фильтр по этому столбцу (Алматы), поэтому в каждой строке выходит выручка Астаны.' },
        { prompt: 'Повторите меру Share % на SQL. По чистым заказам для каждого канала (<code>customers.channel</code>) выведите <code>channel</code>, <code>revenue</code> и <code>share_pct</code> (доля в общей выручке, %, 1 знак после запятой). Отсортируйте по убыванию выручки.', hints: ['Сначала сделайте JOIN <code>orders</code> и <code>customers</code> и GROUP BY по каналу.', 'Общая сумма: <code>SUM(SUM(o.amount)) OVER ()</code>.'] }
      ]
    },
    'pbi-6': {
      title: 'Time intelligence: YTD, MoM, YoY',
      body: `
<p>Бизнес всегда спрашивает: «А как по сравнению с прошлым периодом?» В DAX для этого есть готовые функции (нужна таблица дат):</p>
<table>
<tr><th>Мера</th><th>DAX</th></tr>
<tr><td>С начала года (YTD)</td><td><code>TOTALYTD([Revenue], 'Date'[Date])</code></td></tr>
<tr><td>Прошлый месяц</td><td><code>CALCULATE([Revenue], DATEADD('Date'[Date], -1, MONTH))</code></td></tr>
<tr><td>Тот же период прошлого года</td><td><code>CALCULATE([Revenue], SAMEPERIODLASTYEAR('Date'[Date]))</code></td></tr>
<tr><td>Рост MoM %</td><td><code>DIVIDE([Revenue] - [Revenue PM], [Revenue PM])</code></td></tr>
</table>
<p>Это как тетрадь кассира: рядом с выручкой каждого месяца вы переписываете число прошлого месяца, а затем считаете разницу. В DAX прошлый месяц «находит» <code>DATEADD</code>: он сдвигает фильтр в таблице дат на месяц назад.</p>
<pre><code>Revenue PM = CALCULATE([Revenue], DATEADD('Date'[Date], -1, MONTH))
MoM %      = DIVIDE([Revenue] - [Revenue PM], [Revenue PM])
Revenue YTD = TOTALYTD([Revenue], 'Date'[Date])</code></pre>
<h3>Пример: таблица по месяцам</h3>
<table>
<tr><th>Месяц</th><th>Revenue</th><th>Revenue PM</th><th>MoM %</th><th>YTD</th></tr>
<tr><td>2024-01</td><td>50 000</td><td>(пусто)</td><td>(пусто)</td><td>50 000</td></tr>
<tr><td>2024-02</td><td>60 000</td><td>50 000</td><td>20%</td><td>110 000</td></tr>
<tr><td>2024-03</td><td>45 000</td><td>60 000</td><td>−25%</td><td>155 000</td></tr>
<tr><td>2024-04</td><td>54 000</td><td>45 000</td><td>20%</td><td>209 000</td></tr>
</table>
<p>Февраль: (60 000 − 50 000) / 50 000 = 0.2 = 20%. Март: (45 000 − 60 000) / 60 000 = −25%. В январе прошлого месяца нет, поэтому Revenue PM пусто, а <code>DIVIDE</code> даёт не ошибку, а пустое значение. YTD — накопительная сумма с начала года: 50 000 + 60 000 + 45 000 = 155 000. <code>SAMEPERIODLASTYEAR</code> работает точно так же, только сдвигает на год назад (YoY). Наши данные только за 2024 год, поэтому она будет пустой.</p>
<h3>Эквивалент в SQL</h3>
<p>В SQL прошлый месяц даёт <code>LAG()</code>, накопительный итог с начала года — <code>SUM() OVER (ORDER BY month)</code>. Сначала считаем выручку по месяцам в CTE, затем добавляем оконные функции.</p>
<pre><code>SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev
FROM monthly;</code></pre>
<p>Если лет несколько, добавляют <code>PARTITION BY</code> по году, чтобы YTD в новом году начинался с нуля.</p>
<div class="tip"><b>Частые ошибки:</b>
<ul>
<li>Делить MoM на текущий месяц: делитель всегда <b>прошлый</b> месяц.</li>
<li>Не пометить таблицу дат как <b>Mark as date table</b> или использовать столбец <code>orders[order_date]</code>: дни без заказов выпадают, и результат получается неверным.</li>
<li>Ставить месяц в матрицу не из таблицы дат, а из orders: фильтр не доходит до таблицы Date.</li>
</ul></div>`,
      ex: [
        { prompt: 'Выручка в марте 90 000 ₸, в феврале 60 000 ₸. Каков рост MoM?', options: ['30%', '50%', '33%', '150%'], explain: '(90 000 − 60 000) / 60 000 = 0.5 = 50%.' },
        { prompt: 'Какая функция нужна для сравнения с тем же периодом прошлого года?', options: ['TOTALYTD', 'SAMEPERIODLASTYEAR', 'DATEADD(..., -1, MONTH)', 'ALL'], explain: 'SAMEPERIODLASTYEAR сдвигает даты на год назад.' },
        { prompt: 'По чистым заказам для каждого месяца (<code>substr(order_date,1,7)</code>) выведите <code>month</code>, <code>revenue</code>, <code>prev_revenue</code> (прошлый месяц, LAG) и <code>ytd</code> (накопительная выручка с начала года). Отсортируйте по месяцу.', hints: ['<code>LAG(revenue) OVER (ORDER BY month)</code>', '<code>SUM(revenue) OVER (ORDER BY month)</code> — накопительная сумма.'] }
      ]
    },
    'pbi-7': {
      title: 'Визуалы и дизайн отчёта',
      body: `
<p>Хороший отчёт за 5 секунд отвечает на главный вопрос. Структура:</p>
<ol>
<li><b>Сверху карточки KPI</b> (Card): выручка, заказы, AOV, изменение %.</li>
<li><b>В центре тренд</b>: Line chart по месяцам.</li>
<li><b>Внизу детализация</b>: Bar chart (канал, город), Matrix (таблица).</li>
<li><b>Слева или сверху slicer-ы</b>: дата, город, канал.</li>
</ol>
<h3>Какой визуал?</h3>
<table>
<tr><th>Вопрос</th><th>Визуал</th></tr>
<tr><td>Как менялось во времени?</td><td>Line chart</td></tr>
<tr><td>Сравнить категории</td><td>Bar chart (отсортированный)</td></tr>
<tr><td>Одно главное число</td><td>Card / KPI</td></tr>
<tr><td>Точные числа, много измерений</td><td>Matrix</td></tr>
<tr><td>Доля части (2–4 части)</td><td>Stacked bar, изредка pie</td></tr>
</table>
<h3>Интерактивность</h3>
<ul>
<li><b>Slicer</b> — фильтр пользователя.</li>
<li><b>Cross-filtering</b> — при клике на один визуал фильтруются остальные.</li>
<li><b>Drill-down</b> — углубление по иерархии год → месяц → день.</li>
<li><b>Drill-through</b> — переход из строки на отдельную подробную страницу (например, карточку клиента).</li>
<li><b>Tooltip</b> — дополнительная информация при наведении курсора.</li>
</ul>
<div class="tip">Не ставьте на одну страницу больше 6–8 визуалов. Используйте цвет только для смысла (хорошо/плохо, выбранное).</div>
<h3>Роль страниц</h3>
<p>В одном отчёте может быть несколько страниц, но у каждой должны быть своя аудитория и свой вопрос:</p>
<ul>
<li><b>Обзор</b>: для руководителя, 5 KPI и один тренд.</li>
<li><b>Детали</b>: для менеджера, таблица по городам и каналам.</li>
<li><b>Карточка клиента</b>: страница drill-through, история одного клиента.</li>
</ul>
<h3>Чек-лист отчёта</h3>
<ul>
<li>Говорит ли заголовок каждого визуала о выводе?</li>
<li>Отформатированы ли числа: разделитель тысяч, знак ₸, проценты?</li>
<li>Работают ли slicer-ы одинаково на всех страницах (Sync slicers)?</li>
<li>Читается ли отчёт на телефоне (Mobile layout)?</li>
</ul>`,
      ex: [
        { prompt: 'Руководитель спрашивает: «Как менялась выручка за 6 месяцев?» Какой визуал?', options: ['Pie chart', 'Line chart', 'Matrix', 'Card'], explain: 'Изменение во времени яснее всего показывает line chart.' },
        { prompt: 'Как называется переход по клику на клиента в списке клиентов на отдельную страницу со всеми его заказами?', options: ['Drill-down', 'Drill-through', 'Cross-filtering', 'Bookmark'], explain: 'Drill-through переходит на другую страницу с контекстом выбранного элемента. Drill-down углубляется по иерархии внутри одного визуала.' }
      ]
    },
    'pbi-8': {
      title: 'Публикация, обновление и безопасность',
      body: `
<p>Когда отчёт готов, мы публикуем его в <b>Power BI Service</b> (Publish).</p>
<table>
<tr><th>Понятие</th><th>Значение</th></tr>
<tr><td><b>Workspace</b></td><td>Место, где хранятся отчёты и наборы данных команды</td></tr>
<tr><td><b>Semantic model</b> (раньше dataset)</td><td>Модель и меры, которые могут использовать несколько отчётов</td></tr>
<tr><td><b>Dashboard</b></td><td>Одна страница с закреплёнными (pin) визуалами из разных отчётов</td></tr>
<tr><td><b>App</b></td><td>Способ распространить workspace на широкую аудиторию</td></tr>
<tr><td><b>Scheduled refresh</b></td><td>Автоматическое обновление данных по расписанию</td></tr>
<tr><td><b>Gateway</b></td><td>Подключение из облака к базе данных внутри компании (on-premises)</td></tr>
<tr><td><b>RLS</b> (Row-Level Security)</td><td>Каждый пользователь видит только свои строки</td></tr>
</table>
<p>Пример RLS: чтобы менеджер Алматы видел только данные Алматы, создаём роль:</p>
<pre><code>[city] = "Алматы"</code></pre>
<div class="tip">Для портфолио: сделайте отчёт в Power BI Desktop, выложите файл .pbix на GitHub и напишите README со скриншотами. В бесплатной учётной записи создание публичной веб-ссылки может быть ограничено.</div>
<h3>Как работает обновление?</h3>
<p>При публикации Power BI забирает с собой копию данных (режим Import). Если источник обновился, копию нужно обновить: в Power BI Service можно настроить автоматическое обновление несколько раз в день. А в режиме DirectQuery данные не копируются: каждый клик отправляет запрос к источнику. Данные всегда свежие, но работает медленнее.</p>
<h3>Правила безопасности</h3>
<ul>
<li>Публикация через «Publish to web» открывает отчёт любому человеку в интернете. Не используйте её для данных компании.</li>
<li>Доступ к workspace выдавайте через роли: Viewer только просматривает отчёт, Member может его менять.</li>
<li>Проверяйте роли RLS кнопкой <b>View as</b> в Power BI Desktop: войдите как менеджер и убедитесь, что видите только свой город.</li>
</ul>`,
      ex: [
        { prompt: 'Региональные менеджеры открывают один отчёт, и каждый должен видеть только свой город. Что используем?', options: ['Отдельный отчёт для каждого города', 'Row-Level Security (RLS)', 'Slicer', 'Bookmark'], explain: 'RLS фильтрует данные по роли пользователя. Slicer пользователь может изменить сам, поэтому это не защита.' },
        { prompt: 'Что нужно, чтобы Power BI Service каждый день обновлял данные из базы SQL Server на сервере компании?', options: ['Gateway', 'DAX', 'Drill-through', 'Только Power Query Online'], explain: 'Для подключения из облака к источнику on-premises устанавливают gateway.' }
      ]
    },
    'pbi-gate': {
      title: 'Экзамен модуля: Power BI',
      body: `<p>Итоговый тест по модулю. Чтобы сдать, выполните все задания.</p>`,
      ex: [
        { prompt: 'Где правильнее заполнять пустые значения и исправлять типы данных?', options: ['В мере DAX', 'В Power Query', 'В формате визуала', 'В slicer'], explain: 'Очистка делается до модели, в Power Query.' },
        { prompt: 'Таблица в star schema, которая хранит сумму и количество продаж:', options: ['Dimension', 'Fact', 'Date table', 'Bridge'], explain: 'Таблица fact хранит события и числовые значения.' },
        { prompt: 'Почему вместо <code>[Revenue] / [Orders]</code> пишут <code>DIVIDE([Revenue], [Orders])</code>?', options: ['Быстрее пишется', 'При делении на ноль не выдаёт ошибку, а возвращает пустое значение', 'Округляет результат', 'Разницы нет'], explain: 'DIVIDE безопасно обрабатывает деление на ноль.' },
        { prompt: 'Каким должен быть делитель, чтобы в таблице по каналам показать долю каждого канала в общей выручке?', options: ['SUM(orders[amount])', 'CALCULATE([Revenue], ALL(customers[channel]))', 'COUNTROWS(customers)', '[Revenue]'], explain: 'ALL снимает фильтр по каналу и даёт общую выручку всех каналов.' },
        { prompt: '«Средний чек», который фильтруется по городу, сделали как calculated column. Что произойдёт?', options: ['Всё будет работать правильно', 'Значение вычислится один раз на уровне строки и не будет правильно реагировать на фильтр', 'Power BI выдаст ошибку', 'Отчёт станет быстрее'], explain: 'Агрегаты должны быть мерами. Calculated column вычисляется по строкам при загрузке.' },
        { prompt: 'В апреле выручка 66 000 ₸, в марте 88 000 ₸. Каково изменение MoM в процентах? (если число отрицательное, пишите с минусом)', unit: '%', explain: '(66 000 − 88 000) / 88 000 = −0.25 = −25%.' },
        { prompt: 'Сделайте матрицу Power BI на SQL. По чистым заказам для каждого города (<code>customers.city</code>) выведите <code>city</code>, <code>revenue</code>, <code>orders</code>, <code>aov</code> (до целого) и <code>share_pct</code> (доля в общей выручке, %, 1 знак). Отсортируйте по убыванию выручки.' }
      ]
    }
  }
});
