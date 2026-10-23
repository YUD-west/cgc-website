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
    status TEXT NOT NULL DEFAULT 'Approved', -- 'Approved', 'Reviewing', 'Rejected'
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
    status TEXT NOT NULL DEFAULT 'Incubating',
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

// Seed Lead Admin & Sample Co-Creator Opportunities
export function seedDatabase() {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', salt);
  const adminUser = db.prepare('SELECT * FROM users WHERE email = ?').get('yesufdergu464@gmail.com');

  if (!adminUser) {
    db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, role, department, phone, telegram, primary_track, membership_status)
      VALUES (?, ?, ?, ?, 'ADMIN', ?, ?, ?, 'cybersecurity', 'APPROVED')
    `).run(
      'usr_admin_yesuf',
      'yesufdergu464@gmail.com',
      hash,
      'Yesuf Dergu',
      'Information Technology (Ambo University Woliso Campus)',
      '+251960724272',
      '@SatoshiFlash'
    );
    console.log('[DB] Seeded Lead Admin Yesuf Dergu (yesufdergu464@gmail.com).');
  } else {
    db.prepare("UPDATE users SET password_hash = ?, role = 'ADMIN', membership_status = 'APPROVED' WHERE email = 'yesufdergu464@gmail.com'").run(hash);
    console.log('[DB] Updated and verified Lead Admin credentials (yesufdergu464@gmail.com).');
  }

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

  // Seed authentic campus projects if empty
  const projectCount = db.prepare('SELECT count(*) as count FROM campus_projects').get()?.count || 0;
  if (projectCount === 0) {
    db.prepare(`
      INSERT INTO campus_projects (id, title, description, category, proposer_name, proposer_faculty, target_level, needed_roles, status, impact_goal)
      VALUES 
      ('PRJ-CGC-01', 'CGC Official Portal & Digital Member Pass', 'Official web platform, scannable QR verification pass, and cross-department collaboration engine for Ambo University Woliso Campus.', 'Software & Web', 'Yesuf Dergu', 'Information Technology', 'All Levels Welcome', 'Frontend UI Developer, Documentation & Community Liaison, Testing & QA Contributor', 'Active', 'Provide 500+ Ambo University Woliso Campus students with verified membership passes, project collaboration, and peer tech mentorship.'),
      ('PRJ-HACK-02', 'Ambo University Cursor Hackathon Platform', 'Competitive hackathon innovation prototype demonstrated before university faculty and technical examiners at Ambo University. Engineered to solve student workflow and academic coordination needs.', 'Software & Web', 'Yesuf Dergu & Ameyu Kaba', 'Information Technology', 'All Levels Welcome', 'Full-Stack Developer, UI/UX Designer, Technical Pitch Lead', 'Active', 'Showcase Ambo University Woliso student engineering excellence to faculty examiners and national technology competitions.'),
      ('PRJ-LAB-03', 'IT Lab 01 & 06 Network Defense & Ethical Telemetry', 'A student-led network security lab initiative in Old Classroom ICT Building IT lab 01 and 06. Students practice live packet inspection, isolate rogue ARP traffic, test ethical firewall configurations, and conduct capture-the-flag (CTF) defense drills on campus machines.', 'Cybersecurity & Systems', 'Yesuf Dergu', 'Information Technology (Cybersecurity SIG)', 'All Levels Welcome', 'Network Security Learner, Linux Terminal Administrator, CTF Challenge Author', 'Active', 'Turn Old Classroom ICT Building IT lab 01 and 06 into a secure, practical defensive computing and packet-analysis workshop for student cyber teams.'),
      ('PRJ-AI-04', 'Woliso Campus AI & Practical Computing Cohort', 'An open technical cohort co-led by IT students to train peers across Agriculture, Business, and Natural Sciences on Python automation, data analysis, and applied AI tools for local challenges in South West Shewa zone.', 'Artificial Intelligence & Data', 'Ameyu Kaba', 'Informatics & Computer Science', 'Beginners Welcome', 'Python Beginners, Agricultural Data Collector, Community Coordinator', 'Active', 'Empower non-technical and beginner students with actionable AI and data automation skills for academic research and local problem-solving.')
    `).run();
    console.log('[DB] Seeded authentic CGC campus projects.');
  }
}
