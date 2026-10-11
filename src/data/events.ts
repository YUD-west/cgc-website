import { ClubEvent } from '../types';

export const EVENTS: ClubEvent[] = [
  {
    id: 'evt-01',
    title: 'Hands-On Network Packet Inspection & Wireshark Lab',
    category: 'Workshop',
    date: '2026-10-24',
    time: '2:30 PM – 5:00 PM EAT',
    venue: 'Main ICT Building, Lab 02, Woliso Campus',
    isVirtual: false,
    trackId: 'cybersecurity',
    description:
      'Bring your laptop to analyze live network traffic. We will simulate unencrypted HTTP logins, inspect TLS handshakes, spot rogue ARP broadcasts, and learn how defensive analysts isolate anomalous packets.',
    facilitator: 'CGC Cybersecurity SIG & Lead Mentors',
    targetAudience: 'All students interested in networks & security (Beginners warmly welcome)',
    prerequisites: 'Laptop with Wireshark installed (Club mentors will assist with setup 30 mins before the session)',
    rsvpRequired: true,
    status: 'Upcoming',
    attendeesCount: 38
  },
  {
    id: 'evt-02',
    title: 'Building Real Projects: From Idea to Working MVP',
    category: 'Project Build',
    date: '2026-11-07',
    time: '9:00 AM – 1:00 PM EAT',
    venue: 'Woliso Campus Innovation Hall / Student Lounge',
    isVirtual: false,
    trackId: 'software-web',
    description:
      'A sprint session focused on moving beyond tutorials. In 4 hours, teams of 2–3 will scaffold a practical full-stack web or command-line utility, commit it to GitHub, and define a roadmap for completion.',
    facilitator: 'CGC Software Engineering Core',
    targetAudience: 'Open to all departments (IT, Engineering, Business, Natural Sciences)',
    prerequisites: 'Basic familiarity with any programming language (Python, JavaScript, C++, or Java)',
    rsvpRequired: true,
    status: 'Upcoming',
    attendeesCount: 45
  },
  {
    id: 'evt-03',
    title: 'AI for Local Impact: Fine-Tuning Models on Ethiopian Datasets',
    category: 'Tech Talk',
    date: '2026-11-21',
    time: '3:00 PM – 4:45 PM EAT',
    venue: 'Virtual (Google Meet & Woliso ICT Screening Room)',
    isVirtual: true,
    virtualPlatform: 'Google Meet + Telegram Live Stream',
    trackId: 'ai-ml',
    description:
      'A deep dive into natural language processing and computer vision challenges in the Horn of Africa. Guest presentation by Ethiopian AI alumni researchers followed by a live PyTorch demonstration on local text translation.',
    facilitator: 'AI & Data Science Track Mentors',
    targetAudience: 'Students interested in machine learning, data collection, and applied AI',
    prerequisites: 'None; conceptual session with code demonstration walkthrough',
    rsvpRequired: true,
    status: 'Upcoming',
    attendeesCount: 62
  },
  {
    id: 'evt-04',
    title: 'Woliso Campus Mini-CTF Defense Challenge',
    category: 'Competition',
    date: '2026-09-18',
    time: '1:00 PM – 6:00 PM EAT',
    venue: 'ICT Laboratory 01, Woliso Campus',
    isVirtual: false,
    trackId: 'cybersecurity',
    description:
      'A 5-hour internal Capture The Flag tournament featuring challenges in cryptography, reverse engineering, web exploitation, and steganography. Over 40 students competed in 12 teams.',
    facilitator: 'CGC Cybersecurity Track',
    targetAudience: 'Club Members & Campus Students',
    prerequisites: 'Basic Linux CLI & browser dev tools',
    rsvpRequired: false,
    status: 'Past',
    recapNotes:
      '12 student teams participated. First place went to "NullGuardians" (Team of 3 2nd-year IT students) who cracked the RSA weak-key challenge in under 45 minutes.',
    attendeesCount: 42
  },
  {
    id: 'evt-05',
    title: 'Git & Open Source Fundamentals Bootcamp',
    category: 'Workshop',
    date: '2026-08-30',
    time: '9:00 AM – 12:30 PM EAT',
    venue: 'Lecture Hall 4B, Woliso Campus',
    isVirtual: false,
    trackId: 'programming',
    description:
      'A complete hands-on introduction to distributed version control, branching workflows, pull requests, and contributing to open-source software without fear of merge conflicts.',
    facilitator: 'CGC Software Engineering Lead',
    targetAudience: '1st and 2nd Year Students across all faculties',
    prerequisites: 'Laptop or notebook',
    rsvpRequired: false,
    status: 'Past',
    recapNotes:
      '55 students created their first GitHub repositories and completed 3 simulated team pull requests. All slides and practice repositories archived on CGC GitHub.',
    attendeesCount: 55
  },
  {
    id: 'evt-06',
    title: 'Inter-Department Innovation Mixer: Tech Meets Business & Science',
    category: 'Tech Talk',
    date: '2026-07-12',
    time: '2:00 PM – 5:00 PM EAT',
    venue: 'Woliso Campus Conference Room',
    isVirtual: false,
    trackId: 'entrepreneurship',
    description:
      'Bringing together students from Information Technology, Economics, Agriculture, and Social Sciences to pitch real campus problems and assemble interdisciplinary project teams.',
    facilitator: 'CGC Executive Team & Faculty Mentor',
    targetAudience: 'Students from all faculties across Ambo University Woliso Campus',
    prerequisites: 'An open mind and a problem you care about solving',
    rsvpRequired: false,
    status: 'Past',
    recapNotes:
      'Spurred 4 cross-department student project proposals, including the AgriVision Oromia maize classifier and Woliso Ride Co-op.',
    attendeesCount: 68
  }
];
