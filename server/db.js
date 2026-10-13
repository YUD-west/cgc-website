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
`);

// Seed Lead Admin (Yesuf Dergu)
export function seedDatabase() {
  const adminUser = db.prepare('SELECT * FROM users WHERE email = ?').get('yesufdergu464@gmail.com');
  if (!adminUser) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Admin@CGC2026!', salt);

    db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, role, department, phone, telegram, primary_track)
      VALUES (?, ?, ?, ?, 'ADMIN', ?, ?, ?, 'cybersecurity')
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
  }
}
