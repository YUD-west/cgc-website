import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'cgc-super-secret-jwt-key-woliso-2026';

export function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.prepare('SELECT id, email, full_name, role, department, year_of_study, phone, telegram, member_role, experience_level, primary_track, membership_status FROM users WHERE id = ?').get(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User account not found or has been revoked.' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session has expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid authentication token.' });
  }
}

export const LEAD_ADMIN_EMAIL = 'yesufdergu464@gmail.com';

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden. Administrator privileges required.' });
  }
  if (!req.user.email || req.user.email.toLowerCase() !== LEAD_ADMIN_EMAIL.toLowerCase()) {
    return res.status(403).json({ error: 'Access restricted. Only Lead Admin Yesuf Dergu is authorized to perform this executive action.' });
  }
  next();
}

export function validateBody(zodSchema) {
  return (req, res, next) => {
    try {
      req.validatedBody = zodSchema.parse(req.body);
      next();
    } catch (err) {
      const issue = err.issues ? err.issues[0]?.message : err.message;
      return res.status(400).json({ error: `Validation error: ${issue}` });
    }
  };
}
