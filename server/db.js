import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'cgc_database.sqlite');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode and foreign keys for high reliability and concurrency
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  -- 1. Users table (100% Free Student Accounts & Admin)
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'USER', -- 'USER' or 'ADMIN'
    department TEXT,
    year_of_study TEXT,
    phone TEXT,
    telegram TEXT,
    primary_track TEXT DEFAULT 'cybersecurity',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 2. Official Member Applications (Persistent Registry)
  CREATE TABLE IF NOT EXISTS member_applications (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    department TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    primary_track TEXT NOT NULL,
    skill_level TEXT NOT NULL,
    learning_goals TEXT,
    project_idea TEXT,
    why_join TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Reviewing', -- 'Approved', 'Reviewing', 'Rejected'
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 3. Student Project Proposals
  CREATE TABLE IF NOT EXISTS project_proposals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    proposed_solution TEXT,
    track_id TEXT NOT NULL,
    proposer_name TEXT NOT NULL,
    proposer_email TEXT,
    proposer_department TEXT NOT NULL,
    needed_roles TEXT, -- comma-separated
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Incubating', 'Rejected'
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 4. Event & Workshop RSVPs
  CREATE TABLE IF NOT EXISTS event_rsvps (
    id TEXT PRIMARY KEY,
    event_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    department TEXT NOT NULL,
    ticket_id TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 5. Cross-Disciplinary Co-Creator Board (Agriculture, CS, Business, Sciences)
  CREATE TABLE IF NOT EXISTS co_creators (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    faculty TEXT NOT NULL,
    needed_skills TEXT NOT NULL,
    contact_telegram TEXT,
    contact_email TEXT,
    proposer_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Open',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 6. Flexible Event, Hackathon & Lecture QR Tickets (Admin Authorized Only)
  CREATE TABLE IF NOT EXISTS event_tickets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    event_type TEXT NOT NULL,
    venue TEXT NOT NULL,
    event_date TEXT NOT NULL,
    access_level TEXT NOT NULL,
    created_by TEXT NOT NULL DEFAULT 'Yesuf Dergu (Lead Admin)',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 7. Campus Innovation Projects (Dynamic Database-driven Project Board)
  CREATE TABLE IF NOT EXISTS campus_projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    proposer_name TEXT NOT NULL,
    proposer_faculty TEXT NOT NULL,
    target_level TEXT DEFAULT 'All Levels Welcome',
    needed_roles TEXT NOT NULL,
    status TEXT DEFAULT 'Active',
    impact_goal TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Safely ensure supplementary columns exist on users table
try { db.exec("ALTER TABLE users ADD COLUMN department TEXT;"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN year_of_study TEXT;"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN phone TEXT;"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN telegram TEXT;"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN primary_track TEXT DEFAULT 'cybersecurity';"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN membership_status TEXT DEFAULT 'PENDING';"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN member_role TEXT DEFAULT 'Technical Builder';"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN experience_level TEXT DEFAULT 'Beginner';"); } catch (e) {}

// Safely ensure supplementary columns exist on project_proposals table
try { db.exec("ALTER TABLE project_proposals ADD COLUMN target_level TEXT DEFAULT 'All Levels Welcome';"); } catch (e) {}
try { db.exec("ALTER TABLE project_proposals ADD COLUMN proposer_role TEXT DEFAULT 'Concept Lead';"); } catch (e) {}
try { db.exec("ALTER TABLE project_proposals ADD COLUMN category TEXT DEFAULT 'Campus Innovation';"); } catch (e) {}

// Safely ensure status and indexing on event_rsvps table
try { db.exec("ALTER TABLE event_rsvps ADD COLUMN status TEXT NOT NULL DEFAULT 'Pending';"); } catch (e) {}
try { db.exec("CREATE INDEX IF NOT EXISTS idx_rsvps_email_event ON event_rsvps(lower(email), event_id);"); } catch (e) {}
try { db.exec("CREATE INDEX IF NOT EXISTS idx_proposals_email ON project_proposals(lower(proposer_email));"); } catch (e) {}

// Safely ensure single-application enforcement on member_applications table
try { db.exec("ALTER TABLE member_applications ADD COLUMN user_id TEXT;"); } catch (e) {}
try { db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_member_apps_email ON member_applications(lower(email));"); } catch (e) {}

// Seed Lead Admin & Sample Co-Creator Opportunities (Strict Security Enforcement)
export function seedDatabase() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'yesufdergu464@gmail.com').toLowerCase().trim();
  const adminPass = process.env.ADMIN_PASSWORD || 'yes123@gmail.com';

  const existingAdmin = db.prepare('SELECT id FROM users WHERE lower(email) = lower(?)').get(adminEmail);
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(adminPass, salt);

  if (!existingAdmin) {
    db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, role, department, phone, telegram, primary_track, membership_status)
      VALUES (?, ?, ?, ?, 'ADMIN', ?, ?, ?, 'cybersecurity', 'APPROVED')
    `).run(
      'usr_admin_master',
      adminEmail,
      hash,
      'Yesuf Dergu',
      'Information Technology (Ambo University Woliso Campus)',
      '+251960724272',
      '@SatoshiFlash'
    );
    console.log(`[DB] Seeded initial Master Lead Admin for ${adminEmail}.`);
  } else {
    // Synchronize Lead Admin credentials so the legitimate admin password in env/default always works
    db.prepare("UPDATE users SET password_hash = ?, role = 'ADMIN', membership_status = 'APPROVED' WHERE lower(email) = lower(?)").run(hash, adminEmail);
    console.log(`[DB] Synchronized Lead Admin credentials for ${adminEmail}.`);
  }

  // Strictly enforce that NO OTHER user can have ADMIN privileges
  db.prepare("UPDATE users SET role = 'USER' WHERE role = 'ADMIN' AND lower(email) != lower(?)").run(adminEmail);

  // Seed sample event tickets if empty
  const ticketCount = db.prepare('SELECT count(*) as count FROM event_tickets').get()?.count || 0;
  if (ticketCount === 0) {
    db.prepare(`
      INSERT INTO event_tickets (id, title, event_type, venue, event_date, access_level, created_by)
      VALUES 
      ('EVT-HACK-2026-WL', 'Woliso Inter-Department Innovation Hackathon 2026', 'Hackathon', 'Old Classroom ICT Building IT lab 01 and 06', 'March 28, 2026', 'Full Hacker Clearance & Workstation Access', 'Yesuf Dergu (Lead Admin)'),
      ('EVT-LECT-2026-01', 'Git, Linux & Modern Web Architecture Masterclass', 'Lecture', 'Old Classroom ICT Building IT lab 01 and 06', 'March 14, 2026', 'General Attendee Entry', 'Yesuf Dergu (Lead Admin)'),
      ('EVT-CHAL-2026-01', 'CGC Weekend Cryptography & Ethical Defense Sprint', 'Coding Challenge', 'Old Classroom ICT Building IT lab 01 and 06', 'April 05, 2026', 'Participant Terminal Clearance', 'Yesuf Dergu (Lead Admin)')
    `).run();
    console.log('[DB] Seeded initial event tickets.');
  }

  // Seed authentic CGC co-creator posts if empty
  const count = db.prepare('SELECT count(*) as count FROM co_creators').get()?.count || 0;
  if (count === 0) {
    const seedPosts = [
      {
        id: 'collab_01',
        title: 'CGC Official Portal & Cross-Faculty Feature Squad',
        description: 'Expanding the official CGC platform with toolkits for agriculture, business, and health student innovators. Seeking frontend contributors, UI designers, and student department coordinators.',
        faculty: 'Computer Science & IT',
        needed_skills: 'React, TypeScript, Tailwind CSS, UI/UX Design, Student Outreach',
        contact_telegram: '@SatoshiFlash',
        contact_email: 'yesufdergu464@gmail.com',
        proposer_name: 'Yesuf Dergu (Lead Admin)',
        status: 'Open'
      },
      {
        id: 'collab_02',
        title: 'Woliso Campus AI & Cross-Disciplinary Machine Learning Cohort',
        description: 'Forming a collaborative cohort of computing, agriculture, and business students to practice practical Python automation, local data curation, and regional challenge resolution.',
        faculty: 'Agriculture',
        needed_skills: 'Python, Machine Learning, Data Collection, Field Problem Solving',
        contact_telegram: '@ame_kt',
        contact_email: 'yesufdergu464@gmail.com',
        proposer_name: 'Ameyu Kaba (Co-Admin)',
        status: 'Open'
      },
      {
        id: 'collab_03',
        title: 'IT Lab 01 & 06 Cybersecurity Defense & Packet Inspection Group',
        description: 'Hands-on peer group setting up Wireshark packet analysis, Linux terminal hardening, and capture-the-flag (CTF) defense drills in Old Classroom ICT Building IT lab 01 and 06. Beginners welcome!',
        faculty: 'Computer Science & IT',
        needed_skills: 'Linux CLI, Wireshark, Basic Networking, Curiosity',
        contact_telegram: '@SatoshiFlash',
        contact_email: 'yesufdergu464@gmail.com',
        proposer_name: 'Yesuf Dergu (Lead Admin)',
        status: 'Open'
      }
    ];

    const stmt = db.prepare(`
      INSERT INTO co_creators (id, title, description, faculty, needed_skills, contact_telegram, contact_email, proposer_name, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const post of seedPosts) {
      stmt.run(post.id, post.title, post.description, post.faculty, post.needed_skills, post.contact_telegram, post.contact_email, post.proposer_name, post.status);
    }
    console.log('[DB] Seeded real CGC co-creator collaboration posts.');
  }

  // Purge legacy venues from database
  try {
    db.prepare("UPDATE event_tickets SET venue = 'Old Classroom ICT Building IT lab 01 and 06' WHERE venue LIKE '%Computer Lab%' OR venue LIKE '%Lab 02%'").run();
    db.prepare("UPDATE co_creators SET title = REPLACE(title, 'Computer Lab 02', 'IT Lab 01 & 06'), description = REPLACE(description, 'Computer Lab 02', 'Old Classroom ICT Building IT lab 01 and 06')").run();
    db.prepare("UPDATE project_proposals SET problem_statement = REPLACE(problem_statement, 'Computer Lab 02', 'IT lab 01 and 06'), proposed_solution = REPLACE(proposed_solution, 'Lab 02', 'IT lab 01 and 06')").run();
  } catch (e) {
    console.warn('[DB] Venue cleanup notice:', e);
  }

  // Enforce single project: CGC Official Portal & Digital Member Pass only
  try {
    db.prepare("DELETE FROM campus_projects WHERE id != 'PRJ-CGC-01'").run();
  } catch (e) {}

  const projectCount = db.prepare('SELECT count(*) as count FROM campus_projects').get()?.count || 0;
  if (projectCount === 0) {
    db.prepare(`
      INSERT INTO campus_projects (id, title, description, category, proposer_name, proposer_faculty, target_level, needed_roles, status, impact_goal)
      VALUES 
      ('PRJ-CGC-01', 'CGC Official Portal & Digital Member Pass', 'The official digital portal of Cyber Guardians Club at Ambo University, Woliso Campus (Old Classroom ICT Building IT lab 01 and 06). Features student membership passes, dynamic campus project proposals, inter-departmental co-creator board, and workshop coordination.', 'Software & Web', 'Yesuf Dergu', 'Information Technology (3rd Year), Ambo University', 'All Levels Welcome', 'Frontend UI Developer, Documentation & Community Liaison, Testing & QA Contributor', 'Active', 'Provide Ambo University Woliso Campus students with verified membership passes, hands-on project collaboration, and peer tech mentorship in IT lab 01 and 06.')
    `).run();
    console.log('[DB] Seeded CGC Official Portal & Digital Member Pass.');
  } else {
    db.prepare(`
      UPDATE campus_projects SET 
        title = 'CGC Official Portal & Digital Member Pass',
        description = 'The official digital portal of Cyber Guardians Club at Ambo University, Woliso Campus (Old Classroom ICT Building IT lab 01 and 06). Features student membership passes, dynamic campus project proposals, inter-departmental co-creator board, and workshop coordination.',
        impact_goal = 'Provide Ambo University Woliso Campus students with verified membership passes, hands-on project collaboration, and peer tech mentorship in IT lab 01 and 06.'
      WHERE id = 'PRJ-CGC-01'
    `).run();
  }

  // Ensure all proposals and RSVPs that were never approved by Lead Admin are in 'Pending' queue
  try {
    db.prepare("UPDATE project_proposals SET status = 'Pending' WHERE status = 'Incubating'").run();
    db.prepare("UPDATE event_rsvps SET status = 'Pending' WHERE status IS NULL OR status = ''").run();
    console.log('[DB] Synchronized pending pipeline for Lead Admin Yesuf Dergu.');
  } catch (e) {
    console.warn('[DB] Pipeline reset notice:', e);
  }
}
