// Course catalog shown after sign-in (Codedex-style): each course is one or more modules from DJ.phases.
// level: who it is for (Бастауыш / Орта / Жоғары). Modules without lessons show as "жақында".
DJ.catalog = [
  { id: 'ds', title: 'Data Science', courses: [
    { id: 'python', title: 'Python', level: 'Бастауыш', mods: ['m2-1'] },
    { id: 'python-2', title: 'Intermediate Python', level: 'Орта', mods: ['py-2'] },
    { id: 'sql', title: 'SQL', level: 'Бастауыш', mods: ['m1-2', 'm3-3'] },
    { id: 'pandas', title: 'pandas & NumPy', level: 'Бастауыш', mods: ['m2-2', 'm3-2'] },
    { id: 'stats', title: 'Статистика және ықтималдық', level: 'Орта', mods: ['m3-1', 'm4-1', 'm4-2'] },
    { id: 'viz', title: 'Визуализация және Power BI', level: 'Бастауыш', mods: ['m3-4', 'm3-5'] },
    { id: 'ml', title: 'Machine Learning', level: 'Орта', mods: ['m4-3', 'm5-1', 'm5-2', 'm5-3'] },
    { id: 'dl', title: 'Deep Learning', level: 'Жоғары', mods: ['m6-4'] },
    { id: 'genai', title: 'GenAI', level: 'Орта', mods: ['m6-g'] }
  ] },
  { id: 'cs', title: 'Computer Science', courses: [
    { id: 'dsa', title: 'Data Structures & Algorithms', level: 'Орта', mods: ['dsa-1'] },
    { id: 'java', title: 'Java', level: 'Бастауыш', mods: ['java-1'] },
    { id: 'cpp', title: 'C++', level: 'Бастауыш', mods: ['cpp-1'] },
    { id: 'swe', title: 'Software Engineering', level: 'Орта', mods: ['m6-1'] }
  ] },
  { id: 'tools', title: 'Құралдар', courses: [
    { id: 'git', title: 'Git & GitHub', level: 'Бастауыш', mods: ['m2-3'] },
    { id: 'excel', title: 'Excel және Google Sheets', level: 'Бастауыш', mods: ['m1-1'] },
    { id: 'deploy', title: 'Deployment және Docker', level: 'Орта', mods: ['m6-2'] },
    { id: 'mlops', title: 'MLOps', level: 'Жоғары', mods: ['m6-3'] },
    { id: 'dataeng', title: 'Data Engineering', level: 'Орта', mods: ['m6-5'] }
  ] },
  { id: 'career', title: 'Мансап', courses: [
    { id: 'basics', title: 'Дерек әлеміне кіріспе', level: 'Бастауыш', mods: ['m0-1', 'm0-2'] },
    { id: 'business', title: 'Business Analytics', level: 'Орта', mods: ['m3-6'] },
    { id: 'capstones', title: 'Портфолио жобалары', level: 'Орта', mods: ['m3-7', 'm6-6'] },
    { id: 'jobs', title: 'Резюме және сұхбат', level: 'Бастауыш', mods: ['m7-1'] }
  ] }
];
DJ.findCourse = id => { for (const g of DJ.catalog) for (const c of g.courses) if (c.id === id) return Object.assign({ group: g }, c); return null; };
