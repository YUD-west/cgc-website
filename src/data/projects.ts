import { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'cgc-proj-01',
    title: 'CGC Official Portal & Digital Member Pass',
    tagline: 'The official web platform and cross-department collaboration engine for Ambo University Woliso Campus.',
    description:
      'The official digital portal of Cyber Guardians Club at Ambo University, Woliso Campus (Old Classroom ICT Building IT lab 01 and 06). Features student membership passes, dynamic campus project proposals, inter-departmental co-creator board, and workshop coordination for student builders across all academic streams.',
    trackId: 'software-web',
    origin: 'CGC Initiated',
    status: 'Active',
    lead: 'Yesuf Dergu',
    leadDepartment: 'Information Technology (3rd Year), Ambo University',
    teamSize: 4,
    openRoles: ['Frontend UI Developer', 'Documentation & Community Liaison', 'Testing & QA Contributor'],
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'SQLite'],
    githubUrl: 'https://github.com/YUD-west/cgc-website',
    demoUrl: 'https://cgc-woliso.onrender.com',
    featured: true,
    impactGoal:
      'Provide Ambo University Woliso Campus students with verified membership passes, hands-on project collaboration, and peer tech mentorship in IT lab 01 and 06.',
    createdDate: '2026-02-10'
  }
];

export const PROJECTS = INITIAL_PROJECTS;
