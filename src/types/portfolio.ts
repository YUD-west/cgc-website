export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full-Stack' | 'AI & ML' | 'Civic Tech' | 'E-Commerce' | 'Systems & DSA' | 'Networking';
  status: 'Live' | 'In Development' | 'Active Project' | 'Prototype';
  technologies: string[];
  keyHighlights: string[];
  problemSolved?: string;
  architectureNotes?: string;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skillsUsed: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: 'Advanced' | 'Proficient' | 'Working Knowledge' | 'Exploring';
    tag?: string;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  award: string;
  event: string;
  date: string;
  description: string;
  takeaways: string[];
  verificationNote?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  telegram: string;
  email: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    subRoles: string[];
    location: string;
    availability: string;
    bioShort: string;
    bioLong: string[];
    coreValues: { title: string; desc: string }[];
  };
  socials: SocialLinks;
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  skills: SkillCategory[];
  achievements: AchievementItem[];
}
