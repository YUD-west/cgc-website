import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'cgc_database.sqlite');
const db = new DatabaseSync(dbPath);

const args = process.argv.slice(2);
const email = args[0] ? args[0].toLowerCase().trim() : 'yesufdergu464@gmail.com';
const password = args[1];

if (!password || password.length < 6) {
  console.error('Usage: node server/scripts/set-admin.js <email> <password>');
  console.error('Password must be at least 6 characters long.');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(12);
const passwordHash = bcrypt.hashSync(password, salt);

// 1. Demote any other users who currently have ADMIN role
db.prepare("UPDATE users SET role = 'USER' WHERE role = 'ADMIN' AND lower(email) != lower(?)").run(email);

// 2. Check if this email exists
const existing = db.prepare('SELECT id FROM users WHERE lower(email) = lower(?)').get(email);

if (existing) {
  db.prepare(`
    UPDATE users SET 
      password_hash = ?, 
      role = 'ADMIN', 
      membership_status = 'APPROVED'
    WHERE id = ?
  `).run(passwordHash, existing.id);
  console.log(`[SUCCESS] User ${email} has been updated as the SOLE Lead Admin.`);
} else {
  const userId = `usr_admin_${Date.now()}`;
  db.prepare(`
    INSERT INTO users (id, email, password_hash, full_name, role, department, phone, telegram, primary_track, membership_status)
    VALUES (?, ?, ?, 'Yesuf Dergu', 'ADMIN', 'Information Technology', '+251960724272', '@SatoshiFlash', 'cybersecurity', 'APPROVED')
  `).run(userId, email, passwordHash);
  console.log(`[SUCCESS] New Lead Admin account created for ${email}.`);
}

// Verify sole admin
const admins = db.prepare("SELECT email, role, membership_status FROM users WHERE role = 'ADMIN'").all();
console.log('Verified Admins in Database:', admins);
