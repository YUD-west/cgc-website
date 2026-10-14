import { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'cgc-proj-01',
    title: 'CGC Official Portal & Digital Member Pass',
    tagline: 'The verified web platform, scannable QR verification pass, and cross-department collaboration engine for Ambo University Woliso Campus.',
    description:
      'The official digital portal of Campus Global Community at Ambo University, Woliso Campus. Features scannable QR member verification passes, dynamic campus project proposals, inter-departmental co-creator board, and event ticket management for student builders across all academic streams.',
    trackId: 'software-web',
    origin: 'CGC Initiated',
    status: 'Active',
    lead: 'Yesuf Dergu',
    leadDepartment: 'Information Technology (3rd Year), Ambo University',
    teamSize: 4,
    openRoles: ['Frontend UI Developer', 'Documentation & Community Liaison', 'Testing & QA Contributor'],
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'SQLite', 'PWA'],
    githubUrl: 'https://github.com/YUD-west',
    demoUrl: 'https://github.com/YUD-west',
    featured: true,
    impactGoal:
      'Provide 500+ Ambo University Woliso Campus students with verified membership passes, project collaboration, and peer tech mentorship.',
    createdDate: '2026-02-10'
  },
  {
    id: 'cgc-proj-02',
    title: 'Ambo University Cursor Hackathon Platform',
    tagline: 'Live demonstration and prototype software built during the competitive Cursor Hackathon Ambo 2026.',
    description:
      'Competitive hackathon innovation prototype demonstrated before university faculty and technical examiners at Ambo University. Engineered to solve student workflow, academic coordination, and regional computing needs.',
    trackId: 'software-web',
    origin: 'CGC Initiated',
    status: 'Active',
    lead: 'Yesuf Dergu & Ameyu Kaba',
    leadDepartment: 'Information Technology, Ambo University Woliso Campus',
    teamSize: 5,
    openRoles: ['Full-Stack Developer', 'UI/UX Designer', 'Technical Pitch Lead'],
    tags: ['Hackathon', 'Web Prototyping', 'FastAPI', 'React', 'Live Demo'],
    githubUrl: 'https://github.com/YUD-west',
    demoUrl: '',
    featured: true,
    impactGoal:
      'Showcase Ambo University Woliso student engineering excellence to faculty examiners and national technology competitions.',
    createdDate: '2026-03-15'
  },
  {
    id: 'cgc-proj-03',
    title: 'Computer Lab 02 Network Defense & Ethical Telemetry',
    tagline: 'Defensive packet telemetry, Wireshark packet inspection, and terminal security hardening in Woliso Campus Lab 02.',
    description:
      'A student-led network security lab initiative in Computer Lab 02. Students practice live packet inspection, isolate rogue ARP traffic, test ethical firewall configurations, and conduct capture-the-flag (CTF) defense drills on campus machines.',
    trackId: 'cybersecurity',
    origin: 'CGC Initiated',
    status: 'Active',
    lead: 'Yesuf Dergu',
    leadDepartment: 'Information Technology (Cybersecurity SIG)',
    teamSize: 3,
    openRoles: ['Network Security Learner', 'Linux Terminal Administrator', 'CTF Challenge Author'],
    tags: ['Cybersecurity', 'Wireshark', 'Packet Inspection', 'Linux', 'Lab 02'],
    githubUrl: 'https://github.com/YUD-west',
    demoUrl: '',
    featured: true,
    impactGoal:
      'Turn Computer Lab 02 into a secure, practical defensive computing and packet-analysis workshop for student cyber teams.',
    createdDate: '2026-01-20'
  },
  {
    id: 'cgc-proj-04',
    title: 'Woliso Campus AI & Practical Computing Cohort',
    tagline: 'Hands-on Python, applied machine learning, and cross-department data problem-solving.',
    description:
      'An open technical cohort co-led by IT students to train peers across Agriculture, Business, and Natural Sciences on Python automation, data analysis, and applied AI tools for local challenges in South West Shewa zone.',
    trackId: 'ai-ml',
    origin: 'Student Proposed',
    status: 'Incubating',
    lead: 'Ameyu Kaba',
    leadDepartment: 'Informatics & Computer Science, Woliso Campus',
    teamSize: 4,
    openRoles: ['Python Beginners', 'Agricultural Data Collector', 'Community Coordinator'],
    tags: ['Python', 'Machine Learning', 'Data Analysis', 'Cross-Disciplinary'],
    githubUrl: 'https://github.com/YUD-west',
    demoUrl: '',
    featured: true,
    impactGoal:
      'Empower non-technical and beginner students with actionable AI and data automation skills for academic research and local problem-solving.',
    createdDate: '2026-03-25'
  }
];
