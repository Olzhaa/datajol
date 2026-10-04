// Placement diagnostic: 12 short questions across five areas. The result picks the starting module.
DJ.diagnostic = {
  areas: {
    lit: 'Дерек сауаттылығы',
    math: 'Математика',
    stats: 'Статистика',
    sql: 'SQL',
    py: 'Python'
  },
  questions: [
    { area: 'lit', type: 'quiz', prompt: 'Кестедегі бір жол әдетте нені білдіреді?', options: ['Бір объектіні (мысалы, бір тапсырысты)', 'Бір айнымалыны', 'Бүкіл кестенің қорытындысын', 'Дерекқордың атауын'], answer: 0 },
    { area: 'lit', type: 'quiz', prompt: '«Клиенттің қаласы» қандай дерек түріне жатады?', options: ['Сандық', 'Категориялық', 'Күн-уақыт', 'Бинарлық сурет'], answer: 1 },
    { area: 'math', type: 'number', prompt: '80 адамның 20-сы сатып алды. Конверсия неше пайыз?', answer: 25, tol: 0.01, unit: '%' },
    { area: 'math', type: 'number', prompt: 'Сатылым 200-ден 250-ге өсті. Өсім неше пайыз?', answer: 25, tol: 0.01, unit: '%' },
    { area: 'stats', type: 'number', prompt: 'Мәндер: 3, 9, 4, 100, 5. Медианасы қанша?', answer: 5, tol: 0.001 },
    { area: 'stats', type: 'quiz', prompt: 'Жалақы деректерінде бірнеше өте үлкен мән бар. «Әдеттегі» жалақыны қай көрсеткіш жақсырақ сипаттайды?', options: ['Орташа (mean)', 'Медиана', 'Максимум', 'Қосынды'], answer: 1 },
    { area: 'sql', type: 'quiz', prompt: '<code>orders</code> кестесінен тек 2024 жылғы жолдарды алу үшін сұрауға не қосылады?', options: ['<code>GROUP BY</code>', '<code>WHERE</code>', '<code>ORDER BY</code>', '<code>LIMIT</code>'], answer: 1 },
    { area: 'sql', type: 'quiz', prompt: 'Әр қаладағы клиенттер санын есептеу үшін не керек?', options: ['<code>COUNT(*)</code> және <code>GROUP BY city</code>', '<code>SUM(city)</code>', '<code>DISTINCT</code> ғана', '<code>JOIN</code> ғана'], answer: 0 },
    { area: 'sql', type: 'quiz', prompt: 'Тапсырысы жоқ клиенттерді де сақтап, клиенттер мен тапсырыстарды қосу үшін қай JOIN керек?', options: ['INNER JOIN', 'customers LEFT JOIN orders', 'CROSS JOIN', 'orders INNER JOIN customers'], answer: 1 },
    { area: 'py', type: 'quiz', prompt: '<code>x = [3, 1, 2]</code> болса, <code>len(x)</code> нені қайтарады?', options: ['2', '3', '6', '[3, 1, 2]'], answer: 1 },
    { area: 'py', type: 'quiz', prompt: 'Бұл код не шығарады?<pre><code>total = 0\nfor n in [2, 4, 6]:\n    total += n\nprint(total)</code></pre>', options: ['6', '12', '246', 'Қате'], answer: 1 },
    { area: 'py', type: 'quiz', prompt: '<code>{"Алматы": 3, "Астана": 5}["Астана"]</code> нені береді?', options: ['3', '5', '"Астана"', 'KeyError'], answer: 1 }
  ],
  // scores: {area: 0..1}. Returns where to start and why.
  place(s) {
    if ((s.lit + s.math) / 2 < 0.75) return { start: 'm0-1', text: 'Негізден бастаған дұрыс: дерек түрлері мен пайыздарды бекітіп алсаңыз, SQL әлдеқайда оңай болады.' };
    if (s.stats < 0.5) return { start: 'm0-2', text: 'Дерек ұғымдары жақсы. Орташа, медиана, пайыздық өзгерісті Math refresher модулінде қайталаңыз.' };
    if (s.sql < 0.67) return { start: 'm1-2', text: 'Негіз дайын. Енді басты құрал SQL Core модулінен бастаңыз.' };
    if (s.py < 0.67) return { start: 'm2-1', text: 'SQL білесіз. SQL Core емтиханын тапсырып көріңіз де, Python Fundamentals-қа өтіңіз.' };
    return { start: 'm3-3', text: 'SQL мен Python негізі бар. SQL Core және Python емтихандарын тапсырып, Advanced SQL-ге өтіңіз.' };
  }
};
