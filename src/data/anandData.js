export const ANAND_PROFILE = {
  monogram: 'AA',
  fullName: 'Anand A',
  location: 'Kerala, India',
  email: 'anandanilkumarktra7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anandanilkumar7/',
  github: 'https://github.com/an4nd7',
  resumePath: '/Anand_A_Resume.pdf',
  currentRole: 'Server Administrator Intern @ Hashroot',
  degreeBadge: 'MCA Graduate · FISAT',
  bioShort:
    'I work across Linux server administration, enterprise networking, cloud DevOps, and full-stack development — combining infrastructure precision with modern engineering to build products that are both technically resilient and effortless to use.',
  aboutParagraph:
    'I work across Linux server infrastructure, enterprise networking, and full-stack software — bringing the same engineering discipline to MERN web apps, YOLOv8 vision pipelines, and production server hardening.',
  philosophyTop:
    'The infrastructure makes the software survive contact with reality.',
  philosophyBottom:
    'The software makes the infrastructure worth building.',
  stats: [
    { value: '5+', label: 'CLOUD & DEVOPS CERTS' },
    { value: '03', label: 'FULL-STACK & AI APPS' },
    { value: '02', label: 'TECH INTERNSHIPS' },
  ],
};

// Ordered to mirror the video's exact 01 (coral wireframe) -> 02 (cyan neural head) -> 03 (indigo cylinders + pipelines) progression!
export const CRAFT_PILLARS = [
  {
    id: 'fullstack',
    index: '01',
    shortLabel: '01 — FULL-STACK WEB',
    eyebrow: 'From brief to deployment.',
    title: 'FULL-STACK WEB',
    description:
      'Architecture, clean interfaces, and secure APIs first. Engineering responsive MERN and Python Django/Flask web applications with real-time chat, JWT authentication, and reliable database layers people enjoy using.',
    pipeline: ['BRIEF', 'STRUCTURE', 'API LAYER', 'INTERFACE', 'EXPERIENCE'],
    activeStep: 4,
    tags: ['REACT', 'NODE.JS', 'EXPRESS', 'MONGODB', 'DJANGO', 'FLASK'],
    accentHex: '#ff521b',
    accentSoft: 'rgba(255, 82, 27, 0.28)',
    bgGradient:
      'radial-gradient(ellipse 72% 72% at 22% 48%, rgba(168, 30, 14, 0.34), transparent 64%), radial-gradient(ellipse 62% 62% at 82% 52%, rgba(255, 76, 36, 0.14), transparent 66%), #060508',
    shapeType: 'blueprint',
  },
  {
    id: 'ai-cloud',
    index: '02',
    shortLabel: '02 — AI & VISION',
    eyebrow: 'From pixels to production.',
    title: 'AI & VISION',
    description:
      'Computer vision pipelines wired into practical full-stack applications — real-time YOLOv8 retail product recognition with automated billing carts, alongside real-time facial detection and database matching for law enforcement workflows.',
    pipeline: ['DETECT', 'CLASSIFY', 'SYNC', 'VERIFY'],
    activeStep: 3,
    tags: ['YOLOV8', 'PYTHON', 'FLASK', 'IMAGE PROCESSING', 'REST APIS'],
    accentHex: '#38bdf8',
    accentSoft: 'rgba(56, 189, 248, 0.28)',
    bgGradient:
      'radial-gradient(ellipse 75% 75% at 22% 45%, rgba(12, 74, 110, 0.44), transparent 64%), radial-gradient(ellipse 65% 65% at 80% 55%, rgba(56, 189, 248, 0.18), transparent 65%), #040814',
    shapeType: 'neural',
  },
  {
    id: 'infrastructure',
    index: '03',
    shortLabel: '03 — LINUX & INFRA',
    eyebrow: 'From bare metal to uptime.',
    title: 'LINUX & INFRA',
    description:
      'Production Linux server administration, web server stacks, and network reliability built to run quietly at 3 AM. Configuring Apache, Nginx, PHP, MySQL, and CSF Firewall alongside TCP/IP troubleshooting, AWS Cloud, and IBM DevOps monitoring.',
    pipeline: ['PROVISION', 'CONFIGURE', 'HARDEN', 'MONITOR'],
    activeStep: 3,
    tags: ['LINUX', 'NGINX', 'APACHE', 'CSF FIREWALL', 'AWS CLOUD', 'IBM DEVOPS'],
    accentHex: '#6366f1',
    accentSoft: 'rgba(99, 102, 241, 0.34)',
    bgGradient:
      'radial-gradient(ellipse 75% 75% at 20% 48%, rgba(44, 42, 138, 0.46), transparent 64%), radial-gradient(ellipse 68% 68% at 82% 52%, rgba(79, 110, 247, 0.2), transparent 65%), #050516',
    shapeType: 'pipeline',
  },
];

export const WORK_PROJECTS = [
  {
    number: '01',
    accent: '#38bdf8',
    category: 'AI COMPUTER VISION · MCA MAIN PROJECT · 2026',
    title: 'SMART CART BILLING',
    subtitle: 'Automated Retail Checkout with YOLOv8',
    description:
      'Point the camera at retail products. Real-time YOLOv8 object detection recognizes items instantly, updates a dynamic shopping cart, and generates automated invoices via Express.js & Flask REST APIs secured with JWT authentication.',
    role: 'Full-Stack & Computer Vision Developer',
    stack: ['REACT', 'NODE.JS', 'EXPRESS.JS', 'MONGODB', 'PYTHON (FLASK)', 'YOLOV8'],
    linkLabel: 'GITHUB.COM/AN4ND7',
    linkUrl: 'https://github.com/an4nd7',
    mockupType: 'smartcart',
  },
  {
    number: '02',
    accent: '#818cf8',
    category: 'PRODUCTION INFRASTRUCTURE · HASHROOT · NOV 2026 – PRESENT',
    title: 'LINUX SERVER OPERATIONS',
    subtitle: 'Web Hosting, Hardening & Network Reliability',
    description:
      'Hands-on server administration managing Linux infrastructure end to end — configuring Apache, Nginx, PHP, MySQL, and CSF Firewall alongside TCP/IP, DNS, DHCP diagnostics, website hosting, and security hardening.',
    role: 'Server Administrator Intern · Hashroot',
    stack: ['LINUX SERVERS', 'NGINX', 'APACHE', 'PHP & MYSQL', 'CSF FIREWALL', 'TCP/IP'],
    linkLabel: 'LINKEDIN / ANANDANILKUMAR7',
    linkUrl: 'https://www.linkedin.com/in/anandanilkumar7/',
    mockupType: 'infra',
  },
  {
    number: '03',
    accent: '#22d3ee',
    category: 'COMMUNITY MERN PLATFORM · MCA MINI PROJECT · 2025',
    title: 'NEEDNSHARE',
    subtitle: 'Community Borrow & Share Platform',
    description:
      'A neighborhood web application for borrowing, lending, and sharing everyday items safely — featuring secure user authentication, real-time member chat, advanced search, urgent requests, and PIN-based Nearby Share discovery.',
    role: 'Full-Stack MERN Developer',
    stack: ['REACT', 'NODE.JS', 'EXPRESS.JS', 'MONGODB', 'BOOTSTRAP'],
    linkLabel: 'GITHUB.COM/AN4ND7',
    linkUrl: 'https://github.com/an4nd7',
    mockupType: 'neednshare',
  },
  {
    number: '04',
    accent: '#ff521b',
    category: 'BIOMETRICS & PYTHON ENGINEERING · 2023 — 2024',
    title: 'CRIMINAL FACE ID & CYBERIA',
    subtitle: 'Real-Time Facial Matching & Full-Stack Python Delivery',
    description:
      'Built a real-time facial detection and crime management platform using Python Django, image processing, and SQLite (BCA Project, 2024), grounded in a 3-month Python Developer Internship at Cyberia Softwares Pvt. Ltd (Jul – Sep 2023).',
    role: 'Python Developer Intern · Backend Engineer',
    stack: ['PYTHON', 'DJANGO', 'IMAGE PROCESSING', 'HTML5 / CSS3', 'JAVASCRIPT', 'SQLITE', 'GIT'],
    linkLabel: 'GITHUB.COM/AN4ND7',
    linkUrl: 'https://github.com/an4nd7',
    mockupType: 'triptych',
  },
];

export const STACK_TOOLBOXES = [
  {
    id: 'fullstack',
    label: 'FULL-STACK & LANGUAGES',
    dotColor: '#ff521b',
    items: [
      'PYTHON',
      'JAVA',
      'REACT',
      'NODE.JS',
      'EXPRESS.JS',
      'DJANGO',
      'FLASK',
      'HTML5',
      'CSS3',
      'BOOTSTRAP',
      'MYSQL',
      'MONGODB',
      'SQL',
    ],
  },
  {
    id: 'ai-cloud',
    label: 'AI, CLOUD & DEVOPS',
    dotColor: '#38bdf8',
    items: [
      'YOLOV8',
      'COMPUTER VISION',
      'AWS CLOUD',
      'IBM DEVOPS',
      'RESTFUL APIS',
      'JWT AUTH',
      'GIT',
      'VS CODE',
      'ANDROID STUDIO',
    ],
  },
  {
    id: 'infra',
    label: 'LINUX & NETWORKING',
    dotColor: '#818cf8',
    items: [
      'LINUX SERVERS',
      'APACHE',
      'NGINX',
      'PHP',
      'CSF FIREWALL',
      'TCP/IP',
      'DNS',
      'DHCP',
      'LAN/WAN',
      'IP ADDRESSING',
      'WINDOWS',
      'OS INSTALLATION',
      'SYSTEM MAINTENANCE',
    ],
  },
];

export const CAROUSEL_TECH = [
  { id: 'linux', name: 'LINUX', category: 'infra', color: '#f59e0b' },
  { id: 'nginx', name: 'NGINX', category: 'infra', color: '#22c55e' },
  { id: 'apache', name: 'APACHE', category: 'infra', color: '#ef4444' },
  { id: 'react', name: 'REACT', category: 'fullstack', color: '#38bdf8' },
  { id: 'node', name: 'NODE.JS', category: 'fullstack', color: '#4ade80' },
  { id: 'python', name: 'PYTHON', category: 'fullstack', color: '#60a5fa' },
  { id: 'django', name: 'DJANGO', category: 'fullstack', color: '#10b981' },
  { id: 'mongodb', name: 'MONGODB', category: 'fullstack', color: '#34d399' },
  { id: 'mysql', name: 'MYSQL', category: 'fullstack', color: '#0ea5e9' },
  { id: 'yolov8', name: 'YOLOV8 AI', category: 'ai-cloud', color: '#a855f7' },
  { id: 'aws', name: 'AWS CLOUD', category: 'ai-cloud', color: '#fb923c' },
  { id: 'devops', name: 'IBM DEVOPS', category: 'ai-cloud', color: '#6366f1' },
  { id: 'firewall', name: 'CSF & NET', category: 'infra', color: '#f43f5e' },
  { id: 'git', name: 'GIT', category: 'ai-cloud', color: '#f97316' },
];

export const EDUCATION_TIMELINE = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Federal Institute of Science and Technology (FISAT)',
    location: 'Angamaly, Kerala',
    period: 'Aug 2024 – Mar 2026',
    score: '75.55%',
    highlight: true,
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'University Institute of Technology, Kottarakkara',
    location: 'Kollam, Kerala',
    period: 'Nov 2021 – Mar 2024',
    score: '74.64%',
    highlight: false,
  },
  {
    degree: 'Plus Two (Higher Secondary)',
    institution: "St. Mary's Higher Secondary School, Kottarakkara",
    location: 'Kollam, Kerala',
    period: 'Jun 2019 – Mar 2021',
    score: '86.00%',
    highlight: false,
  },
  {
    degree: 'SSLC',
    institution: "St. Mary's Higher Secondary School, Kottarakkara",
    location: 'Kollam, Kerala',
    period: 'Jun 2018 – Mar 2019',
    score: '95.00%',
    highlight: false,
  },
];

export const CERTIFICATIONS = [
  {
    title: 'IBM DevOps Fundamentals',
    issuer: 'IBM',
    focus: 'System Monitoring, Server Management, OS, Storage & Networking',
    url: 'https://drive.google.com/file/d/15bU2Hw34I-Cv0RJHj8-Bw4Fot43nqXSS/view?usp=sharing',
  },
  {
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    focus: 'Cloud Architecture, Core AWS Services, IAM Security & Scaling',
    url: 'https://drive.google.com/file/d/14QXo2dkldSVh6WGKpn0ijcJYoj1NI1oP/view?usp=drive_link',
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    focus: 'Virtualization, Cloud Deployment Models & Distributed Infrastructure',
    url: 'https://drive.google.com/file/d/1YMfv7ymJqsIAn7lCssYbu_6z8O6lIQ1W/view?usp=sharing',
  },
  {
    title: 'Database Management System',
    issuer: 'NPTEL',
    focus: 'Relational Modeling, SQL Optimization, Indexing & Transactions',
    url: 'https://drive.google.com/file/d/19RkvHvxUFxp4_hTCsTotfnE0AFksDD2C/view?usp=sharing',
  },
  {
    title: 'MPower — Soft Skill Certification',
    issuer: 'VerticalEye',
    focus: 'Professional Communication, Teamwork & Workplace Readiness',
    url: 'https://drive.google.com/file/d/1Yu3PO36PQ8iIST56yITzDDx_Atle1rw1/view?usp=sharing',
  },
];

export const PERSONAL_DETAILS = {
  softSkills: [
    'Problem-Solving',
    'Risk Management',
    'Adaptability',
    'Teamwork',
    'Punctuality',
    'Analytical Thinking',
  ],
  hobbies: ['Web Development', 'Photography', 'Fitness & Gym'],
  languages: ['English', 'Malayalam', 'Hindi'],
};
