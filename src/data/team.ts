export interface TeamMember {
  name: string;
  role: string;
  department: string;
  photoUrl: string;
  bio: string;
  telegram: string;
  telegramUrl: string;
  linkedin: string;
  github: string;
  email: string;
  isLeadAdmin?: boolean;
}

export const LEAD_ADMIN: TeamMember = {
  name: "Yesuf Dergu",
  role: "Lead Administrator & CGC President",
  department: "Information Technology (3rd Year), Ambo University, Woliso Campus",
  photoUrl: "/admin/yesuf-dergu-lead.jpg",
  bio: "Lead organizer and community builder at Ambo University Woliso Campus. Championing hands-on software development, competitive hackathons, cybersecurity awareness, and cross-departmental student innovation.",
  telegram: "@SatoshiFlash",
  telegramUrl: "https://t.me/SatoshiFlash",
  linkedin: "https://www.linkedin.com/in/yusuf2537/",
  github: "https://github.com/YUD-west",
  email: "yesufdergu464@gmail.com",
  isLeadAdmin: true,
};

export const CO_ADMIN = {
  handle: "@ame_kt",
  url: "https://t.me/ame_kt",
  role: "Community Co-Administrator",
};

export const OFFICIAL_COMMUNITY = {
  telegramGroup: "https://t.me/IT_Jointcommunity",
  telegramGroupName: "IT Joint Community",
  githubOrg: "https://github.com/YUD-west",
  linkedinProfile: "https://www.linkedin.com/in/yusuf2537/",
  officialEmail: "yesufdergu464@gmail.com",
};

export interface CampusEventPhoto {
  id: string;
  title: string;
  event: string;
  location: string;
  date: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

export const CAMPUS_EVENT_PHOTOS: CampusEventPhoto[] = [
  {
    id: "photo-01",
    title: "Cursor Hackathon Ambo — Live Web Platform Demo",
    event: "Cursor Hackathon Ambo",
    location: "Auditorium & Innovation Screening Hall, Ambo / Woliso",
    date: "2026",
    imageUrl: "/events/cursor-hackathon-project-demo.png",
    description: "CGC student showcasing a live web application prototype before an evaluation panel of examiners during the competitive hackathon sprint.",
    tags: ["Hackathon", "Live Demo", "Web Engineering"]
  },
  {
    id: "photo-02",
    title: "Cursor Hackathon Ambo — Evaluation & Keynote",
    event: "Cursor Hackathon Ambo",
    location: "Main Evaluation Hall, Ambo University",
    date: "2026",
    imageUrl: "/events/cursor-hackathon-podium.png",
    description: "Distinguished faculty and tech examiners evaluating student prototype submissions, emphasizing practical problem-solving for regional employment and tech solutions.",
    tags: ["Hackathon", "Examiners", "Keynote"]
  },
  {
    id: "photo-03",
    title: "IT Department Orientation & Welcome Ceremony",
    event: "Welcome & Technical Onboarding Session",
    location: "ICT Lecture & Lab Hall, Woliso Campus",
    date: "2026",
    imageUrl: "/events/woliso-tech-orientation-hall.jpg",
    description: "Full hall of students gathered for the 3rd Year IT batch technical orientation, introducing newcomers to coding tracks, peer study cohorts, and hands-on club projects.",
    tags: ["Orientation", "Peer Mentorship", "Informatics"]
  },
  {
    id: "photo-04",
    title: "Interactive Classroom Technical Presentation",
    event: "Hands-on Technical Lecture & Code Walkthrough",
    location: "Old Classroom ICT Building IT lab 01 and 06, Woliso Campus",
    date: "2026",
    imageUrl: "/events/woliso-lab-presentation.jpg",
    description: "Students seated at terminal workstations following along with a live programming and architecture presentation in the Woliso campus lab.",
    tags: ["Lab Sprints", "Classroom", "Pair Learning"]
  },
  {
    id: "photo-05",
    title: "Lead Admin Yesuf Dergu Facilitating Technical Session",
    event: "Department Technical Batch Ceremony",
    location: "Woliso Campus Presentation Room",
    date: "2026",
    imageUrl: "/admin/yesuf-dergu-lead.jpg",
    description: "CGC Lead Administrator Yesuf Dergu presenting project architecture and mentorship roadmaps with his Cursor-stickered workstation.",
    tags: ["Leadership", "Yesuf Dergu", "Mentorship"]
  },
  {
    id: "photo-06",
    title: "CGC Collaborative Hands-on Lab Session",
    event: "Weekend Coding & Defense Sprint",
    location: "Old Classroom ICT Building IT lab 01 and 06, Woliso Campus",
    date: "2026",
    imageUrl: "/cgc-community-lab.jpg",
    description: "Students gathered in teams with laptops: inspecting packets, collaborating on open-source repositories, and turning ideas into tangible tools.",
    tags: ["Collaborative Lab", "Hackerspace", "Real Code"]
  }
];
