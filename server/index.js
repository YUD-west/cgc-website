import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, seedDatabase } from './db.js';
import { authenticateUser, requireAdmin, validateBody, JWT_SECRET } from './middleware/auth.js';
import { register, login, getMe, changePassword, registerSchema, loginSchema } from './controllers/authController.js';
import { 
  getMetrics, 
  getAllStudents, 
  getMemberApplications, 
  updateApplicationStatus, 
  getProposals, 
  updateProposalStatus,
  getRsvps,
  updateRsvpStatus
} from './controllers/adminController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5055;

// Enable database initialization & seed
seedDatabase();

// CORS setup
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5055,https://cgc-woliso.onrender.com').split(',').map(s => s.trim());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Cross-origin request blocked by CGC CORS policy.'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Defensive HTTP Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

app.use(express.json({ limit: '100kb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '2026.10.26-exclusive-yes123-only',
    timestamp: new Date().toISOString(),
    service: 'CGC Student Innovation Club API',
    campus: 'Ambo University, Woliso Campus'
  });
});

// ---------------- AUTH ROUTES ----------------
app.post('/api/auth/register', validateBody(registerSchema), register);
app.post('/api/auth/login', validateBody(loginSchema), login);
app.get('/api/auth/me', authenticateUser, getMe);
app.post('/api/auth/change-password', authenticateUser, changePassword);

// ---------------- PERSISTENT MEMBER APPLICATIONS ----------------
app.get('/api/applications/check', (req, res) => {
  try {
    const email = (req.query.email || '').toString().toLowerCase().trim();
    if (!email) {
      return res.status(400).json({ error: 'Email parameter required.' });
    }

    const app = db.prepare('SELECT id, status, submitted_at FROM member_applications WHERE lower(email) = ?').get(email);
    const user = db.prepare('SELECT id, membership_status, role FROM users WHERE lower(email) = ?').get(email);

    const isAccepted = (user && (user.membership_status === 'APPROVED' || user.role === 'ADMIN')) || (app && (app.status === 'Approved' || app.status === 'Innovation Lead'));

    return res.json({
      hasApplied: Boolean(app),
      isAccepted: Boolean(isAccepted),
      status: app ? app.status : (isAccepted ? 'Approved' : 'None'),
      applicationId: app?.id || null
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify application status' });
  }
});

app.post('/api/applications', (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password, 
      phone, 
      department, 
      yearOfStudy, 
      primaryTrack, 
      skillLevel, 
      learningGoals, 
      projectIdea, 
      whyJoin 
    } = req.body;
    
    if (!fullName || !email || !whyJoin) {
      return res.status(400).json({ error: 'Full name, email, and statement are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check if user already exists in the users table
    let userAccount = db.prepare('SELECT id, role, membership_status, password_hash, full_name, department, year_of_study, phone, primary_track FROM users WHERE lower(email) = ?').get(normalizedEmail);
    let token = null;

    if (!userAccount) {
      // User does not exist yet -> A secure password is required to create their student portal account
      if (!password || password.length < 8) {
        return res.status(400).json({ error: 'Please create a secure password (at least 8 characters) for your Student Member Portal account.' });
      }

      const salt = bcrypt.genSaltSync(12);
      const passwordHash = bcrypt.hashSync(password, salt);
      const newUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // SECURITY: Public registration strictly hardcodes role='USER'
      db.prepare(`
        INSERT INTO users (id, email, password_hash, full_name, role, department, year_of_study, phone, telegram, member_role, experience_level, primary_track, membership_status)
        VALUES (?, ?, ?, ?, 'USER', ?, ?, ?, ?, ?, ?, ?, 'PENDING')
      `).run(
        newUserId,
        normalizedEmail,
        passwordHash,
        fullName.trim(),
        department || 'Information Technology',
        yearOfStudy || '2nd Year',
        phone || null,
        null,
        'Technical Builder',
        skillLevel || 'Beginner',
        primaryTrack || 'cybersecurity'
      );

      userAccount = {
        id: newUserId,
        email: normalizedEmail,
        full_name: fullName.trim(),
        role: 'USER',
        department: department || 'Information Technology',
        year_of_study: yearOfStudy || '2nd Year',
        phone: phone || null,
        primary_track: primaryTrack || 'cybersecurity',
        membership_status: 'PENDING'
      };

      token = jwt.sign({ userId: newUserId, role: 'USER', email: normalizedEmail }, JWT_SECRET, { expiresIn: '7d' });
    } else {
      // User account exists already
      // If client supplied auth header or password, verify to authenticate
      const authHeader = req.headers.authorization;
      let authenticated = false;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
          const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
          if (decoded.userId === userAccount.id) authenticated = true;
        } catch (e) {}
      }

      if (!authenticated && password) {
        if (bcrypt.compareSync(password, userAccount.password_hash)) {
          authenticated = true;
          token = jwt.sign({ userId: userAccount.id, role: userAccount.role, email: normalizedEmail }, JWT_SECRET, { expiresIn: userAccount.role === 'ADMIN' ? '24h' : '7d' });
        }
      }

      if (userAccount.membership_status === 'APPROVED' || userAccount.role === 'ADMIN') {
        return res.status(400).json({ 
          error: 'This account has already applied and been accepted as an official CGC Member! Each user account can submit only one application, and you cannot apply again once accepted.' 
        });
      }
    }

    // 2. Check if an application has already been submitted for this account
    const existing = db.prepare('SELECT id, status FROM member_applications WHERE lower(email) = ?').get(normalizedEmail);
    if (existing) {
      if (existing.status === 'Approved' || existing.status === 'Innovation Lead') {
        return res.status(400).json({ 
          error: `This account has already applied and been accepted (Application ID: ${existing.id}). Once accepted, you cannot apply again using the same account.` 
        });
      } else if (existing.status === 'Reviewing' || existing.status === 'Pending') {
        return res.status(400).json({ 
          error: `An application from this account has already been submitted and is currently under review by Lead Admin Yesuf Dergu (Application ID: ${existing.id}). Each user account can submit only one application.` 
        });
      } else {
        return res.status(400).json({ 
          error: `An application has already been submitted for this account (Status: ${existing.status}). Each account can submit only one application.` 
        });
      }
    }

    const id = `CGC-MBR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const userId = userAccount.id;

    db.prepare(`
      INSERT INTO member_applications (id, full_name, email, phone, department, year_of_study, primary_track, skill_level, learning_goals, project_idea, why_join, status, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Reviewing', ?)
    `).run(
      id, 
      fullName.trim(), 
      normalizedEmail, 
      phone || null, 
      department, 
      yearOfStudy, 
      primaryTrack, 
      skillLevel, 
      learningGoals || null, 
      projectIdea || null, 
      whyJoin.trim(), 
      userId
    );

    res.status(201).json({
      success: true,
      id,
      status: 'Reviewing',
      token,
      user: {
        id: userAccount.id,
        email: userAccount.email,
        fullName: userAccount.full_name || fullName.trim(),
        role: userAccount.role || 'USER',
        department: userAccount.department,
        yearOfStudy: userAccount.year_of_study,
        phone: userAccount.phone,
        primaryTrack: userAccount.primary_track,
        isApprovedMember: false,
        hasApplied: true
      },
      message: 'Membership application submitted successfully! Your student account has been created.'
    });
  } catch (err) {
    console.error('[Apps] Error saving application:', err);
    res.status(500).json({ error: 'Failed to record application' });
  }
});

// ---------------- DYNAMIC CAMPUS PROJECTS BOARD ----------------
app.get('/api/projects', (req, res) => {
  try {
    const list = db.prepare("SELECT * FROM campus_projects WHERE status = 'Active' ORDER BY created_at DESC").all();
    res.json({ success: true, projects: list });
  } catch (err) {
    console.error('[Projects] Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch campus projects' });
  }
});

// ---------------- STUDENT PROJECT PROPOSALS ----------------
app.post('/api/proposals', (req, res) => {
  try {
    const { 
      title, 
      problemStatement: rawProblem, 
      description,
      proposedSolution, 
      trackId, 
      category, 
      proposerName, 
      proposerEmail, 
      proposerDepartment, 
      proposerRole, 
      neededRoles, 
      targetLevel 
    } = req.body;
    
    const problemStatement = rawProblem || description;
    
    if (!title || !problemStatement || !proposerName || !proposerEmail) {
      return res.status(400).json({ error: 'Title, problem statement, proposer name, and email are required.' });
    }

    const normalizedEmail = proposerEmail.toLowerCase().trim();
    const cleanTitle = title.trim();

    // Anti-spam and duplicate check: User cannot submit the same proposal twice or spam multiple pending proposals
    const existing = db.prepare(`
      SELECT id, title, status FROM project_proposals 
      WHERE lower(proposer_email) = ? AND (status = 'Pending' OR lower(title) = lower(?))
    `).get(normalizedEmail, cleanTitle);

    if (existing) {
      return res.status(400).json({ 
        error: `You already have a proposal under this account (Title: "${existing.title}", Status: ${existing.status}). To prevent spam, duplicate submissions are restricted until reviewed by Lead Admin Yesuf Dergu.` 
      });
    }

    const id = `PRJ-PROP-${Date.now().toString().slice(-4)}`;

    db.prepare(`
      INSERT INTO project_proposals (id, title, problem_statement, proposed_solution, track_id, category, proposer_name, proposer_email, proposer_department, proposer_role, needed_roles, target_level, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `).run(
      id,
      cleanTitle,
      problemStatement.trim(),
      proposedSolution?.trim() || 'Incubating in Old Classroom ICT Building IT lab 01 and 06',
      trackId || 'software-web',
      category || 'Campus Innovation',
      proposerName.trim(),
      normalizedEmail,
      proposerDepartment || 'Informatics & IT',
      proposerRole || 'Concept Lead',
      neededRoles || 'Developers, Designers, Researchers',
      targetLevel || 'All Levels Welcome'
    );

    res.status(201).json({
      success: true,
      id,
      status: 'Pending',
      message: 'Project proposal submitted for review. It is currently Pending and will only be published once approved by Lead Admin Yesuf Dergu.'
    });
  } catch (err) {
    console.error('[Proposals] Error saving proposal:', err);
    res.status(500).json({ error: 'Failed to record project proposal' });
  }
});

app.get('/api/proposals', (req, res) => {
  try {
    const list = db.prepare("SELECT * FROM project_proposals WHERE status = 'Approved' ORDER BY submitted_at DESC LIMIT 50").all();
    res.json({ proposals: list });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch proposals' });
  }
});

// ---------------- WORKSHOP & EVENT RSVPS ----------------
app.post('/api/rsvps', (req, res) => {
  try {
    const { eventId, name, email, department } = req.body;
    if (!eventId || !name || !email) {
      return res.status(400).json({ error: 'Event, name, and email are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Anti-spam and duplicate check: User cannot register twice for the same workshop
    const existing = db.prepare(`
      SELECT id, ticket_id, status FROM event_rsvps 
      WHERE event_id = ? AND lower(email) = ?
    `).get(eventId, normalizedEmail);

    if (existing) {
      return res.status(400).json({ 
        error: `You have already applied for this workshop seat with email "${normalizedEmail}" (Status: ${existing.status}, Request ID: ${existing.ticket_id}). You cannot apply twice for the same workshop.` 
      });
    }

    const ticketId = `TCK-WL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `rsvp_${Date.now()}`;

    db.prepare(`
      INSERT INTO event_rsvps (id, event_id, name, email, department, ticket_id, status)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending')
    `).run(id, eventId, name.trim(), normalizedEmail, department || 'Informatics', ticketId);

    res.status(201).json({
      success: true,
      ticketId,
      status: 'Pending',
      message: 'Workshop seat registration submitted! Your request is Pending and will be confirmed once approved by Lead Admin Yesuf Dergu.'
    });
  } catch (err) {
    console.error('[RSVP] Error:', err);
    res.status(500).json({ error: 'Failed to record RSVP' });
  }
});

// ---------------- PUBLIC DIGITAL PASS & EVENT TICKET VERIFICATION ----------------
const verifyPassHandler = (req, res) => {
  try {
    const rawPassId = (req.params.passId || '').trim();
    if (!rawPassId) {
      return res.status(400).json({ verified: false, error: 'Pass or Ticket ID is required.' });
    }

    // 1. Check Flexible Event, Hackathon & Lecture Tickets Table
    const matchedTicket = db.prepare('SELECT * FROM event_tickets WHERE upper(id) = upper(?)').get(rawPassId);
    if (matchedTicket) {
      return res.json({
        verified: true,
        isEventTicket: true,
        ticket: {
          id: matchedTicket.id,
          title: matchedTicket.title,
          eventType: matchedTicket.event_type,
          venue: matchedTicket.venue,
          eventDate: matchedTicket.event_date,
          accessLevel: matchedTicket.access_level,
          createdBy: matchedTicket.created_by,
          status: 'Authorized Event Clearance',
          campus: 'Ambo University, Woliso Campus'
        }
      });
    }

    // 2. Check Lead Admin President Pass (Strict exact ID matching)
    if (rawPassId.toUpperCase() === 'CGC-WL-2026-PRES') {
      const admin = db.prepare('SELECT id, full_name, role, department FROM users WHERE email = ?').get('yesufdergu464@gmail.com');
      return res.json({
        verified: true,
        member: {
          id: 'CGC-WL-2026-PRES',
          fullName: admin ? admin.full_name : 'Yesuf Dergu',
          role: 'Lead Administrator & Club President',
          department: 'Information Technology (Ambo University Woliso Campus)',
          yearOfStudy: 'Executive Lead',
          primaryTrack: 'Cybersecurity & Software Architecture',
          status: 'Executive Verified',
          accessLevel: 'Full Executive IT lab 01 & 06 Clearance',
          issuedAt: '2026-01-15',
          campus: 'Ambo University, Woliso Campus'
        }
      });
    }

    // 3. Check official member applications table
    const matchedApp = db.prepare(`
      SELECT id, full_name, department, year_of_study, primary_track, status, submitted_at
      FROM member_applications
      WHERE upper(id) = upper(?)
    `).get(rawPassId);

    if (matchedApp) {
      const isApproved = matchedApp.status === 'Approved' || matchedApp.status === 'Innovation Lead';
      if (!isApproved) {
        return res.status(403).json({
          verified: false,
          isPending: true,
          error: 'Membership Application Under Review — Official QR Pass is issued only after Lead Admin Yesuf Dergu approves the application.'
        });
      }

      return res.json({
        verified: true,
        member: {
          id: matchedApp.id,
          fullName: matchedApp.full_name,
          role: 'Official Approved Member',
          department: matchedApp.department,
          yearOfStudy: matchedApp.year_of_study,
          primaryTrack: matchedApp.primary_track,
          status: 'Active & Verified Member',
          accessLevel: 'Official Old Classroom ICT Building IT lab 01 and 06 Access',
          issuedAt: matchedApp.submitted_at ? matchedApp.submitted_at.slice(0, 10) : '2026',
          campus: 'Ambo University, Woliso Campus'
        }
      });
    }

    // 4. Check registered users table (Strict exact ID matching without wildcard LIKE)
    const matchedUser = db.prepare(`
      SELECT id, full_name, role, department, year_of_study, primary_track, membership_status
      FROM users
      WHERE upper(id) = upper(?)
    `).get(rawPassId);

    if (matchedUser) {
      const isApproved = matchedUser.role === 'ADMIN' || matchedUser.membership_status === 'APPROVED';
      if (!isApproved) {
        return res.status(403).json({
          verified: false,
          isPending: true,
          error: 'Provisional Student Account — Not yet approved by Lead Admin. Official CGC Member QR Code is only issued to executive-approved members.'
        });
      }

      return res.json({
        verified: true,
        member: {
          id: matchedUser.id.toUpperCase(),
          fullName: matchedUser.full_name,
          role: matchedUser.role === 'ADMIN' ? 'Administrator' : 'Official Approved Member',
          department: matchedUser.department || 'Informatics & Technology',
          yearOfStudy: matchedUser.year_of_study || '2nd Year Student',
          primaryTrack: matchedUser.primary_track || 'Cybersecurity & Systems',
          status: 'Active & Verified Member',
          accessLevel: 'Standard Member Access (Lab Sprints, Workshops & Hackathons)',
          issuedAt: '2026-02-01',
          campus: 'Ambo University, Woliso Campus'
        }
      });
    }

    return res.status(404).json({
      verified: false,
      error: 'Pass or Ticket ID not recognized in Woliso Campus CGC Registry.'
    });
  } catch (err) {
    console.error('[Verify] Error verifying pass:', err);
    res.status(500).json({ verified: false, error: 'Internal verification service error.' });
  }
};

app.get('/api/verify-pass/:passId', verifyPassHandler);
app.get('/api/verify/:passId', verifyPassHandler);

// ---------------- CROSS-DISCIPLINARY CO-CREATOR BOARD ----------------
app.get('/api/co-creators', (req, res) => {
  try {
    const { faculty } = req.query;
    let query = "SELECT * FROM co_creators WHERE status != 'Closed'";
    const params = [];

    if (faculty && faculty !== 'All') {
      query += ' AND faculty = ?';
      params.push(faculty);
    }
    query += ' ORDER BY created_at DESC';

    const posts = db.prepare(query).all(...params);
    res.json({ success: true, posts });
  } catch (err) {
    console.error('[CoCreators] Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to load collaboration posts' });
  }
});

app.post('/api/co-creators', (req, res) => {
  try {
    const { title, description, faculty, neededSkills, contactTelegram, contactEmail, proposerName } = req.body;

    if (!title || !description || !faculty || !proposerName) {
      return res.status(400).json({ error: 'Title, description, faculty, and proposer name are required.' });
    }

    const id = `collab_${Date.now()}`;
    db.prepare(`
      INSERT INTO co_creators (id, title, description, faculty, needed_skills, contact_telegram, contact_email, proposer_name, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Open')
    `).run(
      id,
      title.trim(),
      description.trim(),
      faculty.trim(),
      neededSkills?.trim() || 'General Collaboration',
      contactTelegram?.trim() || null,
      contactEmail?.trim() || null,
      proposerName.trim()
    );

    res.status(201).json({
      success: true,
      id,
      message: 'Collaboration call published to campus board.'
    });
  } catch (err) {
    console.error('[CoCreators] Error creating post:', err);
    res.status(500).json({ error: 'Failed to publish collaboration post' });
  }
});

app.patch('/api/co-creators/:id/status', authenticateUser, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['Open', 'Teamed Up', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be Open, Teamed Up, or Closed.' });
    }

    const post = db.prepare('SELECT contact_email FROM co_creators WHERE id = ?').get(id);
    if (!post) {
      return res.status(404).json({ error: 'Collaboration post not found.' });
    }

    const isOwner = post.contact_email && post.contact_email.toLowerCase() === req.user.email.toLowerCase();
    const isAdmin = req.user.role === 'ADMIN';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Forbidden. You can only update the status of your own collaboration posts.' });
    }

    db.prepare('UPDATE co_creators SET status = ? WHERE id = ?').run(status, id);
    res.json({ success: true, message: `Status updated to ${status}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// ---------------- PROTECTED ADMIN ROUTES (Yesuf Dergu) ----------------
app.get('/api/admin/metrics', authenticateUser, requireAdmin, getMetrics);
app.get('/api/admin/students', authenticateUser, requireAdmin, getAllStudents);
app.get('/api/admin/applications', authenticateUser, requireAdmin, getMemberApplications);
app.patch('/api/admin/applications/:id', authenticateUser, requireAdmin, updateApplicationStatus);
app.get('/api/admin/proposals', authenticateUser, requireAdmin, getProposals);
app.patch('/api/admin/proposals/:id', authenticateUser, requireAdmin, updateProposalStatus);
app.get('/api/admin/rsvps', authenticateUser, requireAdmin, getRsvps);
app.patch('/api/admin/rsvps/:id', authenticateUser, requireAdmin, updateRsvpStatus);

// Admin Flexible Event Tickets
app.get('/api/admin/event-tickets', authenticateUser, requireAdmin, (req, res) => {
  try {
    const tickets = db.prepare('SELECT * FROM event_tickets ORDER BY created_at DESC').all();
    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

app.post('/api/admin/event-tickets', authenticateUser, requireAdmin, (req, res) => {
  try {
    const { title, eventType, venue, eventDate, accessLevel, customId } = req.body;
    if (!title || !eventType || !venue) {
      return res.status(400).json({ error: 'Title, event type, and venue are required.' });
    }
    const id = customId?.trim() || `EVT-${eventType.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    db.prepare(`
      INSERT INTO event_tickets (id, title, event_type, venue, event_date, access_level, created_by)
      VALUES (?, ?, ?, ?, ?, ?, 'Yesuf Dergu (Lead Admin)')
    `).run(id, title.trim(), eventType, venue.trim(), eventDate || '2026 Academic Year', accessLevel || 'General Admission');

    res.status(201).json({ success: true, ticket: { id, title, eventType, venue, eventDate, accessLevel } });
  } catch (err) {
    console.error('[Admin] Error creating event ticket:', err);
    res.status(500).json({ error: 'Failed to generate event ticket' });
  }
});

app.delete('/api/admin/event-tickets/:id', authenticateUser, requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM event_tickets WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Ticket deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

// Admin User Membership Approval Toggle
app.patch('/api/admin/users/:id/membership', authenticateUser, requireAdmin, (req, res) => {
  try {
    const { status } = req.body; // 'APPROVED' or 'PENDING'
    db.prepare('UPDATE users SET membership_status = ? WHERE id = ?').run(status || 'APPROVED', req.params.id);
    res.json({ success: true, message: `Membership set to ${status}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user membership' });
  }
});

// ---------------- PRODUCTION CLIENT SERVING (SPA FALLBACK) ----------------
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  CGC Student Innovation Club API running on http://localhost:${PORT}`);
  console.log(`  Free Community Access • Ambo University Woliso Campus`);
  console.log(`  Database: SQLite (WAL Mode)`);
  console.log(`=======================================================`);
});
