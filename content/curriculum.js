// Full curriculum map, mirrors the "DataJol: Curriculum және Product Blueprint" doc.
// Modules with `lessons` filled by content/*.js are playable; the rest show as "жақында".
window.DJ = window.DJ || {};
DJ.modules = DJ.modules || {};

DJ.phases = [
  { id: 'p0', n: 0, title: 'Foundation', kz: 'Негіз', goal: 'Дерек әлемін түсіну, сандармен сенімді жұмыс', level: 'L1 Data Literate',
    modules: [
      { id: 'm0-1', code: 'M0.1', title: 'Дерек әлемі', desc: 'Дерек деген не, мамандықтар, аналитикалық сұрақ қою', hours: '4–6' },
      { id: 'm0-2', code: 'M0.2', title: 'Math refresher', desc: 'Пайыз, орташа мен медиана, өзгеріс, диаграмма оқу', hours: '8–12' }
    ] },
  { id: 'p1', n: 1, title: 'Data Tools', kz: 'Дерек құралдары', goal: 'Кестелермен жұмыс және SQL сұраулары', level: 'L2 SQL Practitioner',
    modules: [
      { id: 'm1-1', code: 'M1.1', title: 'Spreadsheets', desc: 'Формулалар, XLOOKUP, pivot table, диаграммалар', hours: '15–25' },
      { id: 'm1-2', code: 'M1.2', title: 'SQL Core', desc: 'SELECT, WHERE, GROUP BY, JOIN, subquery, DDL/DML, транзакциялар', hours: '30–45' }
    ] },
  { id: 'p2', n: 2, title: 'Programming', kz: 'Бағдарламалау', goal: 'Python-да дерекпен жұмыс', level: 'L3 Python for Data',
    modules: [
      { id: 'm2-1', code: 'M2.1', title: 'Python Fundamentals', desc: 'Айнымалылар, шарттар, циклдар, функциялар, dict, қателер', hours: '35–50' },
      { id: 'm2-2', code: 'M2.2', title: 'pandas & NumPy', desc: 'DataFrame, фильтр, groupby, merge, missing values', hours: '30–40' },
      { id: 'm2-3', code: 'M2.3', title: 'Git & GitHub', desc: 'commit, branch, pull request, README', hours: '6–10' }
    ] },
  { id: 'p3', n: 3, title: 'Data Analyst', kz: 'Дерек аналитигі', goal: 'Деректен дашборд пен ұсынысқа дейін', level: 'L4 Junior Data Analyst',
    modules: [
      { id: 'm3-1', code: 'M3.1', title: 'Descriptive Statistics', desc: 'Таралу, шашыраңқылық, корреляция', hours: '20–30' },
      { id: 'm3-2', code: 'M3.2', title: 'Cleaning & EDA', desc: 'Profiling, missing, outliers, EDA чек-листі', hours: '20–30' },
      { id: 'm3-3', code: 'M3.3', title: 'Advanced SQL & Modeling', desc: 'CTE, window functions, star schema, оптимизация', hours: '25–35' },
      { id: 'm3-4', code: 'M3.4', title: 'Visualization & Storytelling', desc: 'Диаграмма таңдау, matplotlib, memo жазу', hours: '15–20' },
      { id: 'm3-5', code: 'M3.5', title: 'Power BI', desc: 'Power Query, модель, DAX, интерактивті есеп', hours: '30–40' },
      { id: 'm3-6', code: 'M3.6', title: 'Business Analytics', desc: 'KPI, воронка, когорт, unit economics', hours: '20–30' },
      { id: 'm3-7', code: 'M3.7', title: 'DA Capstone & Interview', desc: 'Портфолио жобасы, сұхбатқа дайындық', hours: '40–60' }
    ] },
  { id: 'p4', n: 4, title: 'Data Science Foundation', kz: 'DS негізі', goal: 'Ықтималдық, эксперимент, ML математикасы', level: 'L5 DS Foundation',
    modules: [
      { id: 'm4-1', code: 'M4.1', title: 'Probability', desc: 'Шартты ықтималдық, Bayes, таралулар', hours: '20–30' },
      { id: 'm4-2', code: 'M4.2', title: 'Inference & A/B Testing', desc: 'CI, гипотеза, p-value, sample size', hours: '30–40' },
      { id: 'm4-3', code: 'M4.3', title: 'Math for ML', desc: 'Вектор, матрица, туынды, gradient descent', hours: '25–35' }
    ] },
  { id: 'p5', n: 5, title: 'Machine Learning', kz: 'Машиналық оқыту', goal: 'Бизнес мәселесіне модель құру', level: 'L6 Junior Data Scientist',
    modules: [
      { id: 'm5-1', code: 'M5.1', title: 'ML Foundations', desc: 'Regression, classification, CV, метрикалар', hours: '40–55' },
      { id: 'm5-2', code: 'M5.2', title: 'ML in Practice', desc: 'Pipeline, leakage, tuning, boosting, clustering, SHAP', hours: '45–60' },
      { id: 'm5-3', code: 'M5.3', title: 'DS Capstone', desc: 'Толық DS циклі, презентация', hours: '50–70' }
    ] },
  { id: 'p6', n: 6, title: 'ML Engineering', kz: 'ML инженерия', goal: 'Модельді өндіріске шығару', level: 'L7 ML Engineer',
    modules: [
      { id: 'm6-1', code: 'M6.1', title: 'Software Eng for Data', desc: 'OOP, тесттер, venv, REST API', hours: '25–35' },
      { id: 'm6-2', code: 'M6.2', title: 'Deployment', desc: 'FastAPI, Docker, бұлтқа деплой', hours: '25–35' },
      { id: 'm6-3', code: 'M6.3', title: 'MLOps Basics', desc: 'MLflow, CI, мониторинг, drift', hours: '25–35' },
      { id: 'm6-4', code: 'M6.4', title: 'Deep Learning Intro', desc: 'PyTorch, training loop, CNN', hours: '50–70' },
      { id: 'm6-5', code: 'M6.5', title: 'Cloud & Data Eng Basics', desc: 'Warehouse, ETL, Spark/dbt шолуы', hours: '20–30' },
      { id: 'm6-6', code: 'M6.6', title: 'ML Capstone', desc: 'End-to-end ML сервисі', hours: '40–60' },
      { id: 'm6-g', code: 'GenAI', title: 'GenAI Specialization', desc: 'LLM негізі, prompt, LLM API, chat, embeddings, RAG, function calling, агенттер, қауіпсіздік, LLMOps', hours: '40–60' }
    ] },
  { id: 'p7', n: 7, title: 'Career & Portfolio', kz: 'Мансап', goal: 'Жұмысқа өтініш беруге дайын', level: 'Job-ready',
    modules: [
      { id: 'm7-1', code: 'M7.1', title: 'Career & Portfolio', desc: 'Резюме, LinkedIn, mock interview, take-home', hours: '15–25' }
    ] }
];

DJ.paths = [
  { id: 'da', title: 'Data Analyst', phases: [0, 1, 2, 3, 7], hours: '300–435 сағ', months: '6–9 ай', desc: 'SQL, spreadsheets, Python, статистика, Power BI, бизнес-метрикалар' },
  { id: 'ds', title: 'Data Scientist', phases: [0, 1, 2, 3, 4, 5, 7], hours: '510–725 сағ', months: '11–15 ай', desc: 'DA негізі + ықтималдық, A/B тест, ML, feature engineering' },
  { id: 'mle', title: 'ML Engineer', phases: [0, 1, 2, 3, 4, 5, 6, 7], hours: '695–990 сағ', months: '15–21 ай', desc: 'DS негізі + software engineering, deployment, MLOps, DL' }
];

DJ.careerLevels = [
  { id: 'L0', name: 'Absolute Beginner' },
  { id: 'L1', name: 'Data Literate', needs: ['m0-1', 'm0-2'] },
  { id: 'L2', name: 'SQL Practitioner', needs: ['m1-2'] },
  { id: 'L3', name: 'Python for Data', needs: ['m2-1'] },
  { id: 'L4', name: 'Junior Data Analyst', needs: ['m3-1', 'm3-2', 'm3-3', 'm3-4', 'm3-5', 'm3-6', 'm3-7'] },
  { id: 'L5', name: 'DS Foundation', needs: ['m4-1', 'm4-2', 'm4-3'] },
  { id: 'L6', name: 'Junior Data Scientist', needs: ['m5-1', 'm5-2', 'm5-3'] },
  { id: 'L7', name: 'ML Engineer', needs: ['m6-1', 'm6-2', 'm6-3', 'm6-6'] }
];

DJ.findModule = function (id) {
  for (const p of DJ.phases) for (const m of p.modules) if (m.id === id) return Object.assign({ phase: p }, m, DJ.modules[id] || {});
  return null;
};
