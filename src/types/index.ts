export type TrackId = 
  | 'cybersecurity'
  | 'programming'
  | 'ai-ml'
  | 'software-web'
  | 'entrepreneurship';

export interface Track {
  id: TrackId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  topics: string[];
  keyTools: string[];
  practicalFocus: string;
  coreInitiatives: string[];
}

export type ProjectStatus = 'Active' | 'Open for Contributors' | 'Incubating' | 'Completed';
export type ProjectOrigin = 'CGC Initiated' | 'Student Proposed';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  trackId: TrackId;
  origin: ProjectOrigin;
  status: ProjectStatus;
  lead: string;
  leadDepartment: string;
  teamSize: number;
  openRoles?: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  impactGoal: string;
  createdDate: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  category: 'Workshop' | 'Hackathon' | 'Project Build' | 'Tech Talk' | 'Competition';
  date: string;
  time: string;
  venue: string;
  isVirtual?: boolean;
  virtualPlatform?: string;
  trackId: TrackId;
  description: string;
  facilitator: string;
  targetAudience: string;
  prerequisites: string;
  rsvpRequired: boolean;
  status: 'Upcoming' | 'Past';
  recapNotes?: string;
  attendeesCount?: number;
}

export interface MemberApplication {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  department: string;
  yearOfStudy: string;
  primaryTrack: TrackId;
  secondaryTrack?: TrackId;
  skillLevel: 'Beginner' | 'Intermediate' | 'Experienced';
  learningGoals: string;
  projectIdea?: string;
  whyJoin: string;
  status: 'Received' | 'Approved' | 'Reviewing';
  submittedAt: string;
}

export interface StudentProjectProposal {
  id: string;
  title: string;
  proposerName: string;
  proposerEmail: string;
  proposerDepartment: string;
  trackId: TrackId;
  problemStatement: string;
  proposedSolution: string;
  neededRoles: string[];
  submittedAt: string;
}

export interface NavItem {
  name: string;
  href: string;
  id: string;
}
