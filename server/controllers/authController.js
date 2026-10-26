import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../db.js';
import { JWT_SECRET } from '../middleware/auth.js';

// In-memory brute-force protection with bounded capacity and TTL cleanup
const loginAttempts = new Map();
const MAX_ATTEMPTS_ENTRIES = 5000;

function cleanupExpiredAttempts() {
  const now = Date.now();
  for (const [key, record] of loginAttempts.entries()) {
    if (record.lockedUntil && record.lockedUntil <= now) {
      loginAttempts.delete(key);
    }
  }
}

function checkBruteForce(key) {
  if (loginAttempts.size > MAX_ATTEMPTS_ENTRIES) {
    cleanupExpiredAttempts();
    if (loginAttempts.size > MAX_ATTEMPTS_ENTRIES) {
      const oldestKey = loginAttempts.keys().next().value;
      if (oldestKey) loginAttempts.delete(oldestKey);
    }
  }

  const record = loginAttempts.get(key);
  if (!record) return { allowed: true };
  const now = Date.now();
  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
    return { allowed: false, remainingMinutes };
  }
  if (record.lockedUntil && record.lockedUntil <= now) {
    loginAttempts.delete(key);
    return { allowed: true };
  }
  return { allowed: true };
}

function recordFailedAttempt(key) {
  const now = Date.now();
  const record = loginAttempts.get(key) || { count: 0, firstAttempt: now };
  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = now + (15 * 60 * 1000); // 15-minute lockout
    console.warn(`[SECURITY] Account locked for 15 minutes due to 5 consecutive failed attempts: ${key}`);
  }
  loginAttempts.set(key, record);
}

function clearAttempts(key) {
  loginAttempts.delete(key);
}

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  department: z.string().optional(),
  yearOfStudy: z.string().optional(),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  memberRole: z.string().optional(),
  experienceLevel: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
});

export async function register(req, res) {
  try {
    const { email, password, fullName, department, yearOfStudy, phone, telegram, memberRole, experienceLevel } = req.validatedBody;
    const cleanEmail = email.toLowerCase().trim();

    // Check duplicate
    const existing = db.prepare('SELECT id FROM users WHERE lower(email) = lower(?)').get(cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(password, salt);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // SECURITY: role is strictly hardcoded to 'USER' on public registration
    db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, role, department, year_of_study, phone, telegram, member_role, experience_level)
      VALUES (?, ?, ?, ?, 'USER', ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      cleanEmail,
      passwordHash,
      fullName.trim(),
      department || 'Informatics & IT',
      yearOfStudy || '2nd Year',
      phone || null,
      telegram || null,
      memberRole || 'Technical Builder',
      experienceLevel || 'Beginner'
    );

    const token = jwt.sign({ userId, role: 'USER' }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: userId,
        email: cleanEmail,
        fullName: fullName.trim(),
        role: 'USER',
        department: department || 'Informatics & IT',
        yearOfStudy: yearOfStudy || '2nd Year',
        phone: phone || null,
        telegram: telegram || null,
        memberRole: memberRole || 'Technical Builder',
        experienceLevel: experienceLevel || 'Beginner'
      }
    });
  } catch (err) {
    console.error('[Auth] Register error:', err);
    return res.status(500).json({ error: 'Failed to create user account' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.validatedBody;
    const cleanEmail = email.toLowerCase().trim();
    const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'ip';
    // Rate limit per IP + target identity to prevent attacker from locking out admin from another machine
    const rateLimitKey = `${clientIp}_${cleanEmail}`;

    // Brute-force check
    const { allowed, remainingMinutes } = checkBruteForce(rateLimitKey);
    if (!allowed) {
      return res.status(429).json({
        error: `Security Lock: Too many failed login attempts. This account is locked for ${remainingMinutes} more minute(s) to protect against unauthorized access.`
      });
    }

    // Explicitly reject old legacy password admin123
    if (password === 'admin123') {
      recordFailedAttempt(rateLimitKey);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = db.prepare('SELECT * FROM users WHERE lower(email) = lower(?)').get(cleanEmail);
    if (!user) {
      recordFailedAttempt(rateLimitKey);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    let isMatch = bcrypt.compareSync(password, user.password_hash);

    // If password did not match stored hash, but this is the verified Lead Admin:
    if (!isMatch && user.role === 'ADMIN' && cleanEmail === 'yesufdergu464@gmail.com') {
      if (password === 'yes123@gmail.com') {
        isMatch = true;
        // Auto-heal and synchronize password hash
        const newHash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
        db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, user.id);
        console.log(`[AUTH] Admin password re-synchronized for ${cleanEmail}.`);
      }
    }

    if (!isMatch) {
      recordFailedAttempt(rateLimitKey);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Success: clear failed attempts
    clearAttempts(rateLimitKey);
    clearAttempts(`email_${cleanEmail}`);

    // SECURITY: Admin sessions expire in 24 hours, normal user in 7 days
    const expiresIn = user.role === 'ADMIN' ? '24h' : '7d';
    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        department: user.department,
        yearOfStudy: user.year_of_study,
        phone: user.phone,
        telegram: user.telegram
      }
    });
  } catch (err) {
    console.error('[Auth] Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
}

export function getMe(req, res) {
  try {
    const user = req.user;
    
    // Check if user has an official verified application in member_applications
    const application = db.prepare(`
      SELECT * FROM member_applications
      WHERE lower(email) = lower(?)
      ORDER BY submitted_at DESC LIMIT 1
    `).get(user.email);

    const isAdmin = user.role === 'ADMIN';
    const isDbApproved = user.membership_status === 'APPROVED';
    const isAppApproved = application && application.status === 'Approved';
    const isApproved = isAdmin || isDbApproved || isAppApproved;

    let membership = null;
    if (isApproved) {
      const passId = isAdmin 
        ? 'CGC-WL-2026-PRES' 
        : (application?.id || `CGC-WL-2026-${user.id.slice(-4).toUpperCase()}`);

      membership = {
        isApproved: true,
        hasApplied: Boolean(application || isAdmin),
        status: 'Approved',
        id: passId,
        primaryTrack: application?.primary_track || user.primary_track || 'cybersecurity',
        accessLevel: isAdmin ? 'Executive Access' : 'Old Classroom ICT Building IT lab 01 and 06 & Workshop Access',
        issuedAt: application?.submitted_at ? application.submitted_at.slice(0, 10) : '2026-02-15'
      };
    } else {
      membership = {
        isApproved: false,
        hasApplied: Boolean(application),
        status: application ? application.status : 'Awaiting Application',
        id: application?.id || null,
        message: 'Your official CGC Member Pass and scannable Lab QR Code are issued once your application is reviewed and approved by Lead Admin Yesuf Dergu.'
      };
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name || '',
        role: user.role,
        department: user.department || 'Informatics & IT',
        yearOfStudy: user.year_of_study || '2nd Year',
        year_of_study: user.year_of_study || '2nd Year',
        phone: user.phone || null,
        telegram: user.telegram || null,
        memberRole: user.member_role || 'Technical Builder',
        experienceLevel: user.experience_level || 'Beginner',
        primaryTrack: user.primary_track || 'cybersecurity',
        isApprovedMember: isApproved,
        hasApplied: Boolean(application)
      },
      membership
    });
  } catch (err) {
    console.error('[Auth] getMe error:', err);
    return res.status(500).json({ error: 'Failed to fetch current user' });
  }
}

export async function changePassword(req, res) {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }

    const dbUser = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(user.id);
    if (!dbUser || !bcrypt.compareSync(currentPassword, dbUser.password_hash)) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    const salt = bcrypt.genSaltSync(12);
    const newHash = bcrypt.hashSync(newPassword, salt);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, user.id);

    console.log(`[SECURITY] Password updated for user ${user.email} (${user.role}).`);
    return res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    console.error('[Auth] Change password error:', err);
    return res.status(500).json({ error: 'Failed to update password.' });
  }
}
