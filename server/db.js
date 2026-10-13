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

  -- 1. Users table
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
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 2. Subscription Plans table
  CREATE TABLE IF NOT EXISTS subscription_plans (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    interval TEXT NOT NULL, -- 'MONTHLY' or 'YEARLY'
    price_etb REAL NOT NULL,
    price_usd REAL NOT NULL,
    features TEXT NOT NULL, -- JSON array of features
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- 3. Subscriptions table
  CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    provider TEXT NOT NULL, -- 'CHAPA' or 'TELEBIRR'
    status TEXT NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED'
    current_period_start TEXT,
    current_period_end TEXT,
    next_billing_date TEXT,
    cancel_at_period_end INTEGER NOT NULL DEFAULT 0,
    mandate_ref TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
  );
  CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
  CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

  -- 4. Payments table
  CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    internal_ref TEXT UNIQUE NOT NULL, -- CGC-TX-...
    provider_tx_ref TEXT,
    user_id TEXT NOT NULL,
    subscription_id TEXT,
    plan_id TEXT NOT NULL,
    provider TEXT NOT NULL, -- 'CHAPA' or 'TELEBIRR'
    payment_method TEXT NOT NULL DEFAULT 'TELEBIRR', -- 'TELEBIRR', 'CBE_BIRR', 'CARD'
    amount REAL NOT NULL,
    currency TEXT NOT NULL, -- 'ETB' or 'USD'
    status TEXT NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'
    checkout_url TEXT,
    verification_data TEXT, -- Raw JSON from provider
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
  );
  CREATE INDEX IF NOT EXISTS idx_payments_internal_ref ON payments(internal_ref);
  CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
  CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

  -- 5. Payment Events (Webhook Idempotency & Audit)
  CREATE TABLE IF NOT EXISTS payment_events (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    event_type TEXT NOT NULL,
    idempotency_key TEXT UNIQUE NOT NULL,
    provider_ref TEXT,
    payload TEXT NOT NULL,
    processed_status TEXT NOT NULL, -- 'PROCESSED', 'IGNORED', 'FAILED'
    error_details TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_payment_events_key ON payment_events(idempotency_key);

  -- 6. Billing Attempts (Scheduled Renewal Audit)
  CREATE TABLE IF NOT EXISTS billing_attempts (
    id TEXT PRIMARY KEY,
    subscription_id TEXT NOT NULL,
    scheduled_date TEXT NOT NULL,
    attempt_count INTEGER NOT NULL DEFAULT 1,
    result TEXT NOT NULL, -- 'SUCCESS', 'FAILED', 'RETRY_SCHEDULED'
    failure_reason TEXT,
    next_retry_date TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
  );

  -- 7. Persistent Member Applications
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
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed default plans and Lead Admin if not existing
export function seedDatabase() {
  // Check and seed default plans
  const planCount = db.prepare('SELECT COUNT(*) as count FROM subscription_plans').get();
  if (planCount.count === 0) {
    const insertPlan = db.prepare(`
      INSERT INTO subscription_plans (id, slug, name, description, interval, price_etb, price_usd, features, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `);

    insertPlan.run(
      'plan_student_monthly',
      'student-monthly',
      'Student Monthly Pass',
      'Full access to CGC innovation tracks, lab sessions, and peer project cohorts.',
      'MONTHLY',
      150,
      5,
      JSON.stringify([
        'Full access to Computer Lab 02 coding sprints',
        'Enrollment in Cybersecurity & AI learning tracks',
        'Direct mentorship from 3rd & 4th year student leads',
        'Official CGC digital member verification pass'
      ])
    );

    insertPlan.run(
      'plan_student_yearly',
      'student-yearly',
      'Student Annual Pass (Best Value)',
      '12 full months of access with 2 months free, hackathon entry priority.',
      'YEARLY',
      1500,
      48,
      JSON.stringify([
        'Everything in Monthly Pass (12 months access)',
        'Priority participation in Cursor Hackathons & Tech Week',
        'CGC verified skill certificates upon project defense',
        'Dedicated team workstation allocation in lab sprints',
        'Direct referral to national internships & tech companies'
      ])
    );

    insertPlan.run(
      'plan_patron_monthly',
      'patron-monthly',
      'Community Patron (Monthly)',
      'Sponsor student project hardware, internet connectivity, and snacks.',
      'MONTHLY',
      600,
      20,
      JSON.stringify([
        'Support student open-source hardware & lab components',
        'Official Patron badge on the CGC website & social channels',
        'Quarterly project showcase & tech demonstration invites'
      ])
    );

    insertPlan.run(
      'plan_patron_yearly',
      'patron-yearly',
      'Annual Innovation Sponsor',
      'Underwrite student hackathon prizes and hardware development at Woliso Campus.',
      'YEARLY',
      6000,
      200,
      JSON.stringify([
        'Named innovation sponsor for Woliso Campus Hackathons',
        'Featured logo and bio in event halls and public repository',
        'Direct engagement with top graduating engineering students',
        'VIP access to all Ambo University tech symposiums'
      ])
    );

    console.log('[DB] Seeded default subscription plans (ETB & USD).');
  }

  // Check and seed Lead Admin (Yesuf Dergu)
  const adminUser = db.prepare('SELECT * FROM users WHERE email = ?').get('yesufdergu464@gmail.com');
  if (!adminUser) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Admin@CGC2026!', salt); // Default secure initialization password

    db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, role, department, phone, telegram)
      VALUES (?, ?, ?, ?, 'ADMIN', ?, ?, ?)
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
