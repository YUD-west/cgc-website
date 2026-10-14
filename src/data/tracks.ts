import { Track } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Digital Defense',
    shortName: 'Cybersecurity',
    tagline: 'Defend systems, audit vulnerabilities, foster digital hygiene.',
    description:
      'From defensive network architecture to ethical penetration testing and threat intelligence. Students learn practical offensive/defensive methodologies and build real security tools for campus and community environments.',
    iconName: 'ShieldCheck',
    color: 'from-blue-600 to-indigo-600',
    topics: [
      'Network Security & Packet Inspection',
      'Web Application Security & OWASP Top 10',
      'Ethical Hacking & Capture The Flag (CTF)',
      'Cryptography Fundamentals & Public Key Infrastructure',
      'Digital Forensics & Incident Response',
      'Campus Digital Safety & Awareness Campaigns'
    ],
    keyTools: ['Wireshark', 'Burp Suite', 'Nmap', 'Linux/Kali', 'Ghidra', 'Metasploit', 'OpenSSL'],
    practicalFocus: 'Audit student lab networks, configure open-source firewalls, run Woliso CTF competitions, and educate campus users against phishing and scams.',
    coreInitiatives: [
      'Woliso Campus Security Awareness Clinic',
      'Bi-weekly Hands-on CTF Challenges',
      'Open-source Phishing Simulation & Defense Toolkit'
    ]
  },
  {
    id: 'programming',
    name: 'Programming & Algorithmic Problem-Solving',
    shortName: 'Programming',
    tagline: 'Master algorithms, write resilient code, tackle tough logic.',
    description:
      'The foundation of engineering excellence. We focus on computational thinking, data structures, competitive programming, and writing clean, maintainable code in Python, C++, Java, and modern systems languages.',
    iconName: 'Code2',
    color: 'from-cyan-600 to-blue-600',
    topics: [
      'Data Structures & Algorithm Optimization',
      'Competitive Programming & Contest Problem-Solving',
      'Memory Management & Systems Basics (C/C++, Rust)',
      'Clean Code Principles & Test-Driven Development',
      'Git Version Control & Collaborative Code Reviews'
    ],
    keyTools: ['Python', 'C++', 'Java', 'Git / GitHub', 'LeetCode / Codeforces', 'Linux CLI'],
    practicalFocus: 'Weekly algorithmic sprints, pair-programming workshops, and preparing students for national and international coding contests.',
    coreInitiatives: [
      'CGC Algorithm League (Weekly Coding Sprints)',
      'Beginner-to-Intermediate Data Structures Cohort',
      'Peer Code Review & Technical Interview Prep'
    ]
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Machine Learning',
    shortName: 'AI & Data',
    tagline: 'Transform local datasets into intelligent automated systems.',
    description:
      'Demystifying AI through real-world applications. We explore computer vision, natural language processing for local Ethiopian languages (Afan Oromo, Amharic), predictive modeling, and applied AI in agriculture, health, and education.',
    iconName: 'Cpu',
    color: 'from-emerald-600 to-teal-600',
    topics: [
      'Applied Data Science & Exploratory Analysis',
      'Machine Learning Models (Supervised & Unsupervised)',
      'Deep Learning & Neural Network Fundamentals',
      'Natural Language Processing for Local Ethiopian Languages',
      'Computer Vision for Agricultural Diagnostics',
      'AI Ethics, Fairness, and Practical Deployment'
    ],
    keyTools: ['Python', 'PyTorch', 'Scikit-Learn', 'Pandas & NumPy', 'Hugging Face', 'Jupyter'],
    practicalFocus: 'Build lightweight models solving regional problems like crop pest identification, campus schedule automation, and bilingual text classification.',
    coreInitiatives: [
      'Local Crop Health Vision Model',
      'Afan Oromo / Amharic Sentiment & FAQ Classifier',
      'AI Study Circles & Paper Reading Groups'
    ]
  },
  {
    id: 'software-web',
    name: 'Software Engineering & Web Development',
    shortName: 'Software & Web',
    tagline: 'Build end-to-end web apps, mobile tools, and robust APIs.',
    description:
      'Taking ideas from prototype to production. Students learn modern frontend, backend systems, database modeling, cloud deployments, and mobile applications to solve campus logistical needs and community challenges.',
    iconName: 'Layers',
    color: 'from-blue-700 to-sky-600',
    topics: [
      'Full-Stack Web Architectures (React, Next.js, Node.js)',
      'REST & GraphQL API Engineering',
      'Database Design (PostgreSQL, SQLite, Redis)',
      'Mobile App Development (React Native / Flutter)',
      'UI/UX Design Systems & Accessibility',
      'DevOps, CI/CD, and Containerization (Docker)'
    ],
    keyTools: ['React / TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Figma'],
    practicalFocus: 'Develop and maintain live digital platforms for Woliso Campus students, student unions, and community service projects.',
    coreInitiatives: [
      'Woliso Campus Student Hub & Resource Portal',
      'CGC Open Registry & Project Collab Platform',
      'Campus Lost & Found Verified System'
    ]
  },
  {
    id: 'entrepreneurship',
    name: 'Tech Entrepreneurship & Product Innovation',
    shortName: 'Entrepreneurship',
    tagline: 'Bridge technology with viable, sustainable business solutions.',
    description:
      'Technology alone does not create change until it reaches people. We guide students through product thinking, lean startup methodology, customer interviews, business model canvas, and pitch preparation for grant and venture funding.',
    iconName: 'Rocket',
    color: 'from-amber-600 to-emerald-600',
    topics: [
      'Problem Validation & Lean Customer Discovery',
      'Minimum Viable Product (MVP) Scoping',
      'Business Model Canvas & Unit Economics',
      'Pitch Deck Crafting & Public Presentation',
      'Intellectual Property & Local Tech Ecosystems',
      'Cross-Disciplinary Team Building (Tech + Business + Sciences)'
    ],
    keyTools: ['Notion', 'Figma', 'Pitch Deck Canvas', 'Analytics Tools', 'Stripe/Telebirr APIs'],
    practicalFocus: 'Connecting IT and informatics students with business, agriculture, and social science students to turn final-year projects and club prototypes into real startups.',
    coreInitiatives: [
      'Annual CGC Innovation Demo Day',
      'Inter-Departmental Startup Ideation Mixer',
      'Pitch Practice & Seed Grant Mentorship'
    ]
  }
];
