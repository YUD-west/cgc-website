import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { db, seedDatabase } from './db.js';
import { authenticateUser, requireAdmin, validateBody } from './middleware/auth.js';
import { register, login, getMe, registerSchema, loginSchema } from './controllers/authController.js';
import { 
  getMetrics, 
  getAllStudents, 
  getMemberApplications, 
  updateApplicationStatus, 
  getProposals, 
  updateProposalStatus,
  getRsvps 
} from './controllers/adminController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5055;

// Enable database initialization & seed
seedDatabase();

// CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'CGC Student Innovation Club API',
    campus: 'Ambo University, Woliso Campus'
  });
});

// ---------------- AUTH ROUTES ----------------
app.post('/api/auth/register', validateBody(registerSchema), register);
app.post('/api/auth/login', validateBody(loginSchema), login);
app.get('/api/auth/me', authenticateUser, getMe);

// ---------------- PERSISTENT MEMBER APPLICATIONS ----------------
app.post('/api/applications', (req, res) => {
  try {
    const { fullName, email, phone, department, yearOfStudy, primaryTrack, skillLevel, learningGoals, projectIdea, whyJoin } = req.body;
    
    if (!fullName || !email || !whyJoin) {
      return res.status(400).json({ error: 'Full name, email, and statement are required.' });
    }

    const id = `CGC-MBR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    db.prepare(`
      INSERT INTO member_applications (id, full_name, email, phone, department, year_of_study, primary_track, skill_level, learning_goals, project_idea, why_join, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Approved')
    `).run(id, fullName.trim(), email.toLowerCase().trim(), phone || null, department, yearOfStudy, primaryTrack, skillLevel, learningGoals || null, projectIdea || null, whyJoin.trim());

    res.status(201).json({
      success: true,
      id,
      message: 'Membership registered in Woliso Campus registry.'
    });
  } catch (err) {
    console.error('[Apps] Error saving application:', err);
    res.status(500).json({ error: 'Failed to record application' });
  }
});

// ---------------- DYNAMIC CAMPUS PROJECTS BOARD ----------------
app.get('/api/projects', (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM campus_projects ORDER BY created_at DESC').all();
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
    
    if (!title || !problemStatement || !proposerName) {
      return res.status(400).json({ error: 'Title, problem statement, and proposer name are required.' });
    }

    const id = `PRJ-PROP-${Date.now().toString().slice(-4)}`;

    db.prepare(`
      INSERT INTO project_proposals (id, title, problem_statement, proposed_solution, track_id, category, proposer_name, proposer_email, proposer_department, proposer_role, needed_roles, target_level, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Incubating')
    `).run(
      id,
      title.trim(),
      problemStatement.trim(),
      proposedSolution?.trim() || 'Incubating in Computer Lab 02',
      trackId || 'software-web',
      category || 'Campus Innovation',
      proposerName.trim(),
      proposerEmail?.trim() || null,
      proposerDepartment || 'Informatics & IT',
      proposerRole || 'Concept Lead',
      neededRoles || 'Developers, Designers, Researchers',
      targetLevel || 'All Levels Welcome'
    );

    res.status(201).json({
      success: true,
      id,
      message: 'Project proposal recorded in campus innovation pipeline.'
    });
  } catch (err) {
    console.error('[Proposals] Error saving proposal:', err);
    res.status(500).json({ error: 'Failed to record project proposal' });
  }
});

app.get('/api/proposals', (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM project_proposals ORDER BY submitted_at DESC LIMIT 50').all();
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

    const ticketId = `TCK-WL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `rsvp_${Date.now()}`;

    db.prepare(`
      INSERT INTO event_rsvps (id, event_id, name, email, department, ticket_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, eventId, name.trim(), email.toLowerCase().trim(), department || 'Informatics', ticketId);

    res.status(201).json({
      success: true,
      ticketId,
      message: 'Event seat confirmed.'
    });
  } catch (err) {
    console.error('[RSVP] Error:', err);
    res.status(500).json({ error: 'Failed to record RSVP' });
  }
});

// ---------------- PUBLIC DIGITAL PASS & EVENT TICKET VERIFICATION ----------------
app.get('/api/verify-pass/:passId', (req, res) => {
  try {
    const rawPassId = (req.params.passId || '').trim();
    if (!rawPassId) {
      return res.status(400).json({ verified: false, error: 'Pass or Ticket ID is required.' });
    }

    // 1. Check Flexible Event, Hackathon & Lecture Tickets Table
    const matchedTicket = db.prepare('SELECT * FROM event_tickets WHERE id = ? OR upper(id) = upper(?)').get(rawPassId, rawPassId);
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

    // 2. Check Lead Admin President Pass
    if (rawPassId.toUpperCase() === 'CGC-WL-2026-PRES' || rawPassId.toUpperCase().includes('PRES')) {
      const admin = db.prepare('SELECT id, full_name, email, role, department, telegram FROM users WHERE email = ?').get('yesufdergu464@gmail.com');
      return res.json({
        verified: true,
        member: {
          id: 'CGC-WL-2026-PRES',
          fullName: admin ? admin.full_name : 'Yesuf Dergu',
          email: 'yesufdergu464@gmail.com',
          role: 'Lead Administrator & Club President',
          department: 'Information Technology (Ambo University Woliso Campus)',
          yearOfStudy: 'Executive Lead',
          primaryTrack: 'Cybersecurity & Software Architecture',
          status: 'Executive Verified',
          accessLevel: 'Full Executive Lab 02 & Systems Clearance',
          issuedAt: '2026-01-15',
          campus: 'Ambo University, Woliso Campus'
        }
      });
    }

    // 3. Check official member applications table
    const matchedApp = db.prepare(`
      SELECT id, full_name, email, department, year_of_study, primary_track, status, submitted_at
      FROM member_applications
      WHERE id = ? OR upper(id) = upper(?)
    `).get(rawPassId, rawPassId);

    if (matchedApp) {
      const isApproved = matchedApp.status === 'Approved';
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
          email: matchedApp.email,
          role: 'Official Approved Member',
          department: matchedApp.department,
          yearOfStudy: matchedApp.year_of_study,
          primaryTrack: matchedApp.primary_track,
          status: 'Active & Verified Member',
          accessLevel: 'Official Lab 02 & Innovation Hall Access',
          issuedAt: matchedApp.submitted_at ? matchedApp.submitted_at.slice(0, 10) : '2026',
          campus: 'Ambo University, Woliso Campus'
        }
      });
    }

    // 4. Check registered users table
    const matchedUser = db.prepare(`
      SELECT id, full_name, email, role, department, year_of_study, primary_track, membership_status
      FROM users
      WHERE id = ? OR upper(id) = upper(?) OR id LIKE ?
    `).get(rawPassId, rawPassId, `%${rawPassId.slice(-4)}`);

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
          id: rawPassId.toUpperCase(),
          fullName: matchedUser.full_name,
          email: matchedUser.email,
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
});

// ---------------- CROSS-DISCIPLINARY CO-CREATOR BOARD ----------------
app.get('/api/co-creators', (req, res) => {
  try {
    const { faculty } = req.query;
    let query = 'SELECT * FROM co_creators';
    const params = [];

    if (faculty && faculty !== 'All') {
      query += ' WHERE faculty = ?';
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

app.patch('/api/co-creators/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Open' or 'Teamed Up'
    db.prepare('UPDATE co_creators SET status = ? WHERE id = ?').run(status || 'Teamed Up', id);
    res.json({ success: true, message: 'Status updated.' });
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
