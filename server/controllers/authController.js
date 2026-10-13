import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../db.js';
import { JWT_SECRET } from '../middleware/auth.js';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  department: z.string().optional(),
  yearOfStudy: z.string().optional(),
  phone: z.string().optional(),
  telegram: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
});

export async function register(req, res) {
  try {
    const { email, password, fullName, department, yearOfStudy, phone, telegram } = req.validatedBody;
    const cleanEmail = email.toLowerCase().trim();

    // Check duplicate
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    db.prepare(`
      INSERT INTO users (id, email, password_hash, full_name, role, department, year_of_study, phone, telegram)
      VALUES (?, ?, ?, ?, 'USER', ?, ?, ?, ?)
    `).run(userId, cleanEmail, passwordHash, fullName.trim(), department || 'Informatics', yearOfStudy || '2nd Year', phone || null, telegram || null);

    const token = jwt.sign({ userId, role: 'USER' }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: userId,
        email: cleanEmail,
        fullName: fullName.trim(),
        role: 'USER',
        department: department || 'Informatics',
        yearOfStudy: yearOfStudy || '2nd Year',
        phone: phone || null,
        telegram: telegram || null
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

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

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
    
    // Check if user has an official verified application
    const application = db.prepare(`
      SELECT * FROM member_applications
      WHERE email = ?
      ORDER BY submitted_at DESC LIMIT 1
    `).get(user.email);

    return res.json({
      user,
      membership: application || {
        status: 'Active Member',
        id: `CGC-WL-2026-${user.id.slice(-4).toUpperCase()}`,
        primaryTrack: user.primary_track || 'cybersecurity'
      }
    });
  } catch (err) {
    console.error('[Auth] getMe error:', err);
    return res.status(500).json({ error: 'Failed to fetch current user' });
  }
}
