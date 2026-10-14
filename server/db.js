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
  const adminUser = db.prepare('SELECT * FROM users WHERE email = ?').get('yesufdergu464@gmail.com');
  if (!adminUser) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin123', salt);

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
    db.prepare("UPDATE users SET membership_status = 'APPROVED' WHERE email = 'yesufdergu464@gmail.com'").run();
  }

  // Seed sample event tickets if empty
  const ticketCount = db.prepare('SELECT count(*) as count FROM event_tickets').get()?.count || 0;
  if (ticketCount === 0) {
    db.prepare(`
      INSERT INTO event_tickets (id, title, event_type, venue, event_date, access_level, created_by)
      VALUES 
      ('EVT-HACK-2026-WL', 'Woliso Inter-Department Innovation Hackathon 2026', 'Hackathon', 'Computer Lab 02 & Main Hall', 'March 28, 2026', 'Full Hacker Clearance & Workstation Access', 'Yesuf Dergu (Lead Admin)'),
      ('EVT-LECT-2026-01', 'Git, Linux & Modern Web Architecture Masterclass', 'Lecture', 'Orientation Hall B', 'March 14, 2026', 'General Attendee Entry', 'Yesuf Dergu (Lead Admin)'),
      ('EVT-CHAL-2026-01', 'CGC Weekend Cryptography & Ethical Defense Sprint', 'Coding Challenge', 'Computer Lab 02', 'April 05, 2026', 'Participant Terminal Clearance', 'Yesuf Dergu (Lead Admin)')
    `).run();
    console.log('[DB] Seeded initial event tickets.');
  }

  // Seed sample co-creator posts if empty
  const count = db.prepare('SELECT count(*) as count FROM co_creators').get()?.count || 0;
  if (count === 0) {
    const seedPosts = [
      {
        id: 'team_01',
        title: 'Teff Rust & Crop Disease Detection Mobile Scanner',
        description: 'We have collected 800+ field photographs of teff blight from Woliso agricultural test fields. We need 1 IT/CS student to build a mobile interface with TensorFlow Lite.',
        faculty: 'Agriculture',
        needed_skills: 'Mobile Dev (Flutter or React Native), Machine Learning',
        contact_telegram: '@TeffAI_Lead',
        contact_email: 'chala.kebede@ambou.edu.et',
        proposer_name: 'Chala Kebede (3rd Year Agri-Economics)',
        status: 'Open'
      },
      {
        id: 'team_02',
        title: 'Woliso Campus Peer Bookstore & Shared Equipment Marketplace',
        description: 'Students struggle to find textbooks, lab coats, and calculator rentals. I have mapped the supply chain and pricing structure; seeking a frontend web developer to launch the MVP.',
        faculty: 'Business & Economics',
        needed_skills: 'React / Next.js, UI/UX Design, Telegram Bot',
        contact_telegram: '@Hana_BizDev',
        contact_email: 'hana.alemu@ambou.edu.et',
        proposer_name: 'Hana Alemu (2nd Year Management)',
        status: 'Open'
      },
      {
        id: 'team_03',
        title: 'Campus Micro-Weather & Soil Moisture IoT Node',
        description: 'Building low-cost solar-powered ESP32 sensor nodes to measure soil moisture and humidity across university demonstration plots. Need 1 backend engineer to build an ingestion API.',
        faculty: 'Natural Sciences',
        needed_skills: 'Node.js / Express, SQLite / PostgreSQL, Data Visualization',
        contact_telegram: '@Tolasa_IoT',
        contact_email: 'tolasa.d@ambou.edu.et',
        proposer_name: 'Tolasa Desta (Applied Physics)',
        status: 'Open'
      },
      {
        id: 'team_04',
        title: 'University Anonymous Campus Mental Health & Peer Support Bot',
        description: 'Designing a private, encrypted Telegram bot for students to connect anonymously with peer counselors and study support volunteers during exam season.',
        faculty: 'Computer Science & IT',
        needed_skills: 'Python Telegram Bot, Confidential Data Handling, Psychology Advisor',
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
    console.log('[DB] Seeded 4 cross-faculty co-creator collaboration posts.');
  }

  // Seed sample campus projects if empty
  const projectCount = db.prepare('SELECT count(*) as count FROM campus_projects').get()?.count || 0;
  if (projectCount === 0) {
    db.prepare(`
      INSERT INTO campus_projects (id, title, description, category, proposer_name, proposer_faculty, target_level, needed_roles, status, impact_goal)
      VALUES 
      ('PRJ-AGRI-01', 'Woliso Local Harvest & Market Price Link', 'A mobile and SMS bulletin connecting local farmers around Woliso with direct buyers, reducing middleman price inflation.', 'Agriculture & Sciences', 'Bonsa Tadesse', 'Faculty of Agriculture', 'Beginners Welcome', 'Field Researchers, Business Strategist, Mobile Developer, Beginners', 'Active', 'Empowering 500+ Woliso farmers with daily commodity prices'),
      ('PRJ-BIZ-02', 'Ambo Campus Textbook & Equipment Exchange', 'Peer-to-peer student marketplace to rent, borrow, and exchange university textbooks and lab tools safely on campus.', 'Business & Entrepreneurship', 'Hawi Bekele', 'Business & Economics', 'Beginners Welcome', 'Marketing Lead, Logistics Coordinator, Web Developer', 'Active', 'Saving students 40% on semester course materials'),
      ('PRJ-HLTH-03', 'Woliso Blood Emergency Donor Matching System', 'Quick SMS & Web dispatch tool notifying verified student donors during critical blood shortages at Woliso General Hospital.', 'Health & Community', 'Dr. Rahel Assefa', 'Health & Social Sciences', 'All Levels Welcome', 'Healthcare Coordinator, Backend Developer, UI Designer', 'Open for Contributors', 'Zero delay emergency blood matching for local clinics'),
      ('PRJ-TECH-04', 'CGC Lab 02 Physical Clearance & Network Fortress', 'IoT automated door clearance and ethical firewall system securing student workstations in Computer Lab 02.', 'Cybersecurity & Systems', 'Yesuf Dergu', 'Information Technology', 'Intermediate / Advanced', 'Network Engineer, Hardware IoT Tinkerer, Linux Sysadmin', 'Active', 'Automated entry and 24/7 security monitoring for student teams')
    `).run();
    console.log('[DB] Seeded 4 initial dynamic campus projects.');
  }
}
