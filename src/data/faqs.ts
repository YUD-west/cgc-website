export interface FAQ {
  question: string;
  answer: string;
  category: 'General' | 'Membership' | 'Projects' | 'Departments';
}

export const FAQS: FAQ[] = [
  {
    category: 'Departments',
    question: 'Is CGC only for Information Technology and Computer Science students?',
    answer:
      'No! While CGC originated with IT students at Woliso Campus, our mission is to welcome students from every department—including Natural Sciences, Agricultural Sciences, Business & Economics, and Social Sciences. Modern technology solutions require domain experts, product thinkers, writers, and organizers, not just programmers.'
  },
  {
    category: 'Membership',
    question: 'Do I need prior coding or cybersecurity experience to join?',
    answer:
      'Absolutely not. We embrace an open-community model where curious beginners are guided through structured peer mentorship. If you have the curiosity to learn and the commitment to build, you will find your place in CGC.'
  },
  {
    category: 'General',
    question: 'What is the core principle of CGC?',
    answer:
      'Our central motto is: "Don\'t just attend events. Build things that matter." We believe the best learning happens when you collaborate on a tangible repository, tool, or product that solves a real problem.'
  },
  {
    category: 'Membership',
    question: 'What is the difference between Open Community and Official Membership?',
    answer:
      'Open Community access allows any student to attend public workshops, tech talks, open hackathons, and join our Telegram discussions. Official Members commit to regular team meetings, get paired with project cohorts, receive structured mentor feedback, and can propose or lead club-supported projects.'
  },
  {
    category: 'Projects',
    question: 'Can I propose my own project idea to CGC?',
    answer:
      'Yes! Through our "Propose a Project" initiative, any student or group can pitch a real-world problem. If selected, CGC helps recruit teammates across departments, pairs you with a technical mentor, and provides code review and presentation support.'
  },
  {
    category: 'General',
    question: 'Where is CGC located on the Woliso Campus?',
    answer:
      'We meet primarily in the Old Classroom ICT Building IT lab 01 and 06, Woliso Campus, alongside hybrid online sessions over Google Meet.'
  }
];
