import { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'cgc-proj-01',
    title: 'GuardianNet — Campus Lab Threat Monitor',
    tagline: 'Lightweight internal network telemetry and DNS anomaly monitor for campus computer laboratories.',
    description:
      'GuardianNet is an open-source defensive monitoring utility designed for educational computer labs with intermittent connectivity. It analyzes local subnet ARP and DNS traffic to identify rogue devices, misconfigured gateways, and unauthorized packet sniffing.',
    trackId: 'cybersecurity',
    origin: 'CGC Initiated',
    status: 'Active',
    lead: 'Kalkidan T. (Sample Lead)',
    leadDepartment: 'Information Technology (3rd Year)',
    teamSize: 4,
    openRoles: ['Python Systems Programmer', 'Snort/Suricata Rule Specialist', 'Docs Writer'],
    tags: ['Python', 'Scapy', 'Packet Analysis', 'Linux CLI', 'Network Security'],
    githubUrl: 'https://github.com/cgc-woliso/guardian-net-concept',
    demoUrl: 'https://cgc-woliso.github.io/guardian-net-concept',
    featured: true,
    impactGoal:
      'Provide Ambo University Woliso Campus computer labs with an easy, low-overhead security monitoring dashboard built entirely by students.',
    createdDate: '2026-02-15'
  },
  {
    id: 'cgc-proj-02',
    title: 'Qajeelfama — Multilingual Academic Resource Indexer',
    tagline: 'Offline-first search and lecture notes sync tool for Woliso Campus student study groups.',
    description:
      'A progressive web application designed to index, search, and synchronize academic reference texts, past exams, and syllabi across Afan Oromo, English, and Amharic with zero external data consumption over campus LAN.',
    trackId: 'software-web',
    origin: 'Student Proposed',
    status: 'Open for Contributors',
    lead: 'Bonsa D. (Sample Lead)',
    leadDepartment: 'Computer Science (2nd Year)',
    teamSize: 3,
    openRoles: ['Frontend UI Developer (React)', 'PWA Service Worker Specialist', 'Content Curator'],
    tags: ['TypeScript', 'React', 'IndexedDB', 'PWA', 'Tailwind CSS'],
    githubUrl: 'https://github.com/cgc-woliso/qajeelfama-notes',
    demoUrl: 'https://cgc-woliso.github.io/qajeelfama-notes',
    featured: true,
    impactGoal:
      'Enable students without steady internet access in student dormitories to study collaboratively and search reference notes instantly.',
    createdDate: '2026-03-01'
  },
  {
    id: 'cgc-proj-03',
    title: 'AgriVision Oromia — Maize Disease Classifier',
    tagline: 'Computer vision model targeting early maize blight and armyworm detection using low-spec mobile devices.',
    description:
      'A cross-disciplinary initiative co-founded with students from the Agricultural Sciences department. The project trains a compact MobileNet model on photographic samples of local crops around the South West Shewa zone to diagnose crop distress without expensive cloud inference.',
    trackId: 'ai-ml',
    origin: 'Student Proposed',
    status: 'Incubating',
    lead: 'Tolera M. & Eyerusalem B. (Sample Leads)',
    leadDepartment: 'Informatics & Plant Science Collaboration',
    teamSize: 5,
    openRoles: ['Computer Vision Researcher (PyTorch)', 'Mobile Developer (Flutter)', 'Field Data Collector'],
    tags: ['PyTorch', 'MobileNetV3', 'FastAPI', 'Edge AI', 'Agriculture'],
    githubUrl: 'https://github.com/cgc-woliso/agrivision-concept',
    demoUrl: '',
    featured: true,
    impactGoal:
      'Bridge technology with Woliso agricultural community needs and demonstrate inter-departmental innovation between IT and Natural Sciences.',
    createdDate: '2026-03-20'
  },
  {
    id: 'cgc-proj-04',
    title: 'Ethiocode Contest Arena (ECA)',
    tagline: 'Automated code execution and challenge platform for club algorithmic practice sprints.',
    description:
      'A lightweight Docker-isolated online judge system allowing members to solve weekly algorithmic problems in Python, C++, and Java with immediate time/space complexity evaluation and leaderboard ranking.',
    trackId: 'programming',
    origin: 'CGC Initiated',
    status: 'Active',
    lead: 'Abdi W. (Sample Lead)',
    leadDepartment: 'Information Technology (4th Year)',
    teamSize: 3,
    openRoles: ['Docker Sandboxing Engineer', 'React Frontend Contributor'],
    tags: ['Go', 'Docker Sandboxing', 'PostgreSQL', 'Redis', 'Algorithms'],
    githubUrl: 'https://github.com/cgc-woliso/ethiocode-arena',
    demoUrl: '',
    featured: false,
    impactGoal:
      'Build a self-hosted contest runner for campus programming challenges to prepare students for national hackathons.',
    createdDate: '2026-01-10'
  },
  {
    id: 'cgc-proj-05',
    title: 'Woliso Campus Ride & Errands Co-op',
    tagline: 'Peer-to-peer campus delivery and transit board prototype for student micro-entrepreneurs.',
    description:
      'A business validation project initiated by Business & Economics and IT students to organize organized peer logistics between Woliso town and campus dormitories, testing low-friction SMS and web coordination.',
    trackId: 'entrepreneurship',
    origin: 'Student Proposed',
    status: 'Incubating',
    lead: 'Selamawit G. (Sample Lead)',
    leadDepartment: 'Business Administration (3rd Year)',
    teamSize: 2,
    openRoles: ['Product Manager', 'Telebirr/Payment API Integrator', 'UX Researcher'],
    tags: ['Product Design', 'Lean Startup', 'Next.js', 'FinTech Validation'],
    githubUrl: '',
    demoUrl: '',
    featured: false,
    impactGoal:
      'Give business and social science students practical exposure to software product scoping, market validation, and startup launch.',
    createdDate: '2026-04-02'
  },
  {
    id: 'cgc-proj-06',
    title: 'SecuredAuth — Zero-Trust SSO Prototype',
    tagline: 'Hardware security key (WebAuthn/FIDO2) authentication lab for student projects.',
    description:
      'A hands-on implementation of passwordless authentication, biometrics, and multi-factor hardware security tokens for student-built web services.',
    trackId: 'cybersecurity',
    origin: 'CGC Initiated',
    status: 'Completed',
    lead: 'Natnael K. (Sample Lead)',
    leadDepartment: 'Information Technology (Graduated Alumni)',
    teamSize: 2,
    openRoles: [],
    tags: ['WebAuthn', 'FIDO2', 'Node.js', 'Cryptography', 'Identity'],
    githubUrl: 'https://github.com/cgc-woliso/secured-auth-lab',
    demoUrl: 'https://cgc-woliso.github.io/secured-auth-lab',
    featured: false,
    impactGoal:
      'Educate developers in Woliso on deprecating insecure plaintext passwords in university web systems.',
    createdDate: '2025-11-12'
  }
];
