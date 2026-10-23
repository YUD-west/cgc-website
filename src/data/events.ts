import { ClubEvent } from '../types';

export const EVENTS: ClubEvent[] = [
  {
    id: 'evt-02',
    title: 'Building Real Projects: From Idea to Working MVP',
    category: 'Project Build',
    date: '2026-11-07',
    time: '9:00 AM – 1:00 PM EAT',
    venue: 'Old Classroom ICT Building IT lab 01 and 06, Woliso Campus',
    isVirtual: false,
    trackId: 'software-web',
    description:
      'A sprint session focused on moving beyond tutorials. In 4 hours, teams of 2–3 will scaffold a practical full-stack web or command-line utility, commit it to GitHub, and define a roadmap for completion in IT lab 01 and 06.',
    facilitator: 'CGC Software Engineering Core & Lead Mentors',
    targetAudience: 'Open to all departments (IT, Engineering, Business, Natural Sciences)',
    prerequisites: 'Basic familiarity with any programming language (Python, JavaScript, C++, or Java)',
    rsvpRequired: true,
    status: 'Upcoming',
    attendeesCount: 45
  }
];
