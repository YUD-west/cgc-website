import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, seedDatabase } from './db.js';
import { authenticateUser, requireAdmin, validateBody } from './middleware/auth.js';
import { register, login, getMe, registerSchema, loginSchema } from './controllers/authController.js';
import { listPlans } from './controllers/planController.js';
import { initializePayment, verifyPayment, handleWebhook, initializePaymentSchema } from './controllers/paymentController.js';
import { getUserSubscription, cancelSubscription } from './controllers/subscriptionController.js';
import { getMetrics, getAllPayments, getAllSubscriptions, getMemberApplications, updateApplicationStatus, getWebhookEvents } from './controllers/adminController.js';
import { runSubscriptionLifecycleJob } from './services/schedulerService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5055;

// Enable database initialization & seed
seedDatabase();

// CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-chapa-signature']
}));

// Raw body parser for webhook signature verification + JSON parser for other routes
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString('utf8');
  }
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'CGC Backend & Payment API'
  });
});

// ---------------- AUTH ROUTES ----------------
app.post('/api/auth/register', validateBody(registerSchema), register);
app.post('/api/auth/login', validateBody(loginSchema), login);
app.get('/api/auth/me', authenticateUser, getMe);

// ---------------- PLAN ROUTES ----------------
app.get('/api/plans', listPlans);

// ---------------- PAYMENT ROUTES ----------------
app.post('/api/payments/initialize', authenticateUser, validateBody(initializePaymentSchema), initializePayment);
app.get('/api/payments/verify/:txRef', authenticateUser, verifyPayment);
app.post('/api/payments/webhook', handleWebhook);

// ---------------- SUBSCRIPTION ROUTES ----------------
app.get('/api/subscriptions/me', authenticateUser, getUserSubscription);
app.post('/api/subscriptions/cancel', authenticateUser, cancelSubscription);

// ---------------- PERSISTENT MEMBER APPLICATIONS ----------------
app.post('/api/applications', (req, res) => {
  try {
    const { fullName, email, phone, department, yearOfStudy, primaryTrack, skillLevel, learningGoals, projectIdea, whyJoin } = req.body;
    
    if (!fullName || !email || !whyJoin) {
      return res.status(400).json({ error: 'Full name, email, and statement are required.' });
    }

    const id = `MBR-WL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    db.prepare(`
      INSERT INTO member_applications (id, full_name, email, phone, department, year_of_study, primary_track, skill_level, learning_goals, project_idea, why_join, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `).run(id, fullName.trim(), email.toLowerCase().trim(), phone || null, department, yearOfStudy, primaryTrack, skillLevel, learningGoals || null, projectIdea || null, whyJoin.trim());

    res.status(201).json({
      success: true,
      id,
      message: 'Application registered in persistent database.'
    });
  } catch (err) {
    console.error('[Apps] Error saving application:', err);
    res.status(500).json({ error: 'Failed to record application' });
  }
});

// ---------------- PROTECTED ADMIN ROUTES ----------------
app.get('/api/admin/metrics', authenticateUser, requireAdmin, getMetrics);
app.get('/api/admin/payments', authenticateUser, requireAdmin, getAllPayments);
app.get('/api/admin/subscriptions', authenticateUser, requireAdmin, getAllSubscriptions);
app.get('/api/admin/applications', authenticateUser, requireAdmin, getMemberApplications);
app.patch('/api/admin/applications/:id', authenticateUser, requireAdmin, updateApplicationStatus);
app.get('/api/admin/webhooks', authenticateUser, requireAdmin, getWebhookEvents);
app.post('/api/admin/run-scheduler', authenticateUser, requireAdmin, (req, res) => {
  const result = runSubscriptionLifecycleJob();
  res.json({ success: true, result });
});

// Periodic background job (runs every 6 hours)
setInterval(() => {
  runSubscriptionLifecycleJob();
}, 6 * 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  CGC Backend & Payment API running on http://localhost:${PORT}`);
  console.log(`  Database: SQLite (WAL Mode, ACID Transactions)`);
  console.log(`  Supported Rails: Telebirr & CBE Birr via Chapa`);
  console.log(`=======================================================`);
});
