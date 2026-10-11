import { MemberApplication, StudentProjectProposal, ClubEvent } from '../types';

const APPLICATIONS_KEY = 'cgc_member_applications_v1';
const PROPOSALS_KEY = 'cgc_project_proposals_v1';
const RSVPS_KEY = 'cgc_event_rsvps_v1';

export const getStoredApplications = (): MemberApplication[] => {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse applications from storage', e);
    return [];
  }
};

export const saveApplication = (app: MemberApplication): void => {
  try {
    const current = getStoredApplications();
    const updated = [app, ...current.filter((item) => item.id !== app.id)];
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save application to storage', e);
  }
};

export const getStoredProposals = (): StudentProjectProposal[] => {
  try {
    const raw = localStorage.getItem(PROPOSALS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse proposals from storage', e);
    return [];
  }
};

export const saveProposal = (proposal: StudentProjectProposal): void => {
  try {
    const current = getStoredProposals();
    const updated = [proposal, ...current.filter((p) => p.id !== proposal.id)];
    localStorage.setItem(PROPOSALS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save proposal to storage', e);
  }
};

export interface StoredRsvp {
  eventId: string;
  name: string;
  email: string;
  department: string;
  timestamp: string;
  ticketId: string;
}

export const getStoredRsvps = (): StoredRsvp[] => {
  try {
    const raw = localStorage.getItem(RSVPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse RSVPs from storage', e);
    return [];
  }
};

export const saveRsvp = (rsvp: StoredRsvp): void => {
  try {
    const current = getStoredRsvps();
    const updated = [rsvp, ...current.filter((r) => r.ticketId !== rsvp.ticketId)];
    localStorage.setItem(RSVPS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save RSVP to storage', e);
  }
};

export const generateId = (prefix: string = 'CGC'): string => {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-WL-${year}-${rand}`;
};
