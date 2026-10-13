import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, seedDatabase } from './db.js';
import { authenticateUser, requireAdmin, validateBody } from './middleware/auth.js';
import { register, login, getMe, registerSchema, loginSchema } from './controllers/authController.js';
import { 
  getMetrics, 
  getAllStudents, 
  getMemberApplications, 
  updateApplicationStatus, 
  getProposals, 
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

// ---------------- STUDENT PROJECT PROPOSALS ----------------
app.post('/api/proposals', (req, res) => {
  try {
    const { title, problemStatement, proposedSolution, trackId, proposerName, proposerEmail, proposerDepartment, neededRoles } = req.body;
    
    if (!title || !problemStatement || !proposerName) {
      return res.status(400).json({ error: 'Title, problem statement, and proposer name are required.' });
    }

    const id = `PRJ-PROP-${Date.now().toString().slice(-4)}`;

    db.prepare(`
      INSERT INTO project_proposals (id, title, problem_statement, proposed_solution, track_id, proposer_name, proposer_email, proposer_department, needed_roles)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title.trim(), problemStatement.trim(), proposedSolution?.trim() || null, trackId || 'software-development', proposerName.trim(), proposerEmail?.trim() || null, proposerDepartment || 'Information Technology', neededRoles || 'Developers, Designers');

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

// ---------------- PROTECTED ADMIN ROUTES (Yesuf Dergu) ----------------
app.get('/api/admin/metrics', authenticateUser, requireAdmin, getMetrics);
app.get('/api/admin/students', authenticateUser, requireAdmin, getAllStudents);
app.get('/api/admin/applications', authenticateUser, requireAdmin, getMemberApplications);
app.patch('/api/admin/applications/:id', authenticateUser, requireAdmin, updateApplicationStatus);
app.get('/api/admin/proposals', authenticateUser, requireAdmin, getProposals);
app.get('/api/admin/rsvps', authenticateUser, requireAdmin, getRsvps);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  CGC Student Innovation Club API running on http://localhost:${PORT}`);
  console.log(`  Free Community Access • Ambo University Woliso Campus`);
  console.log(`  Database: SQLite (WAL Mode)`);
  console.log(`=======================================================`);
});
