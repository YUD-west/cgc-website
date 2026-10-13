import { db } from '../db.js';

export function getMetrics(req, res) {
  try {
    // 1. Active Subscribers
    const activeSubs = db.prepare("SELECT COUNT(*) as count FROM subscriptions WHERE status = 'ACTIVE'").get();

    // 2. Revenue calculations
    const revenueETB = db.prepare("SELECT SUM(amount) as total FROM payments WHERE status = 'SUCCESS' AND currency = 'ETB'").get();
    const revenueUSD = db.prepare("SELECT SUM(amount) as total FROM payments WHERE status = 'SUCCESS' AND currency = 'USD'").get();

    // 3. Total registered members
    const userCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'USER'").get();

    // 4. Pending Applications
    const pendingApps = db.prepare("SELECT COUNT(*) as count FROM member_applications WHERE status = 'Pending'").get();

    // 5. Recent Payments Count
    const totalPayments = db.prepare('SELECT COUNT(*) as count FROM payments').get();

    return res.json({
      activeSubscribers: activeSubs.count,
      totalUsers: userCount.count,
      totalPayments: totalPayments.count,
      pendingApplications: pendingApps.count,
      totalRevenueETB: revenueETB.total || 0,
      totalRevenueUSD: revenueUSD.total || 0
    });
  } catch (err) {
    console.error('[Admin] Metrics error:', err);
    return res.status(500).json({ error: 'Failed to compute admin metrics' });
  }
}

export function getAllPayments(req, res) {
  try {
    const { status, query, limit = 50 } = req.query;

    let sql = `
      SELECT p.*, u.email as user_email, u.full_name as user_name, pl.name as plan_name
      FROM payments p
      JOIN users u ON p.user_id = u.id
      JOIN subscription_plans pl ON p.plan_id = pl.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'ALL') {
      sql += ' AND p.status = ?';
      params.push(status);
    }

    if (query) {
      sql += ' AND (p.internal_ref LIKE ? OR u.email LIKE ? OR u.full_name LIKE ?)';
      params.push(`%${query}%`, `%${query}%`, `%${query}%`);
    }

    sql += ' ORDER BY p.created_at DESC LIMIT ?';
    params.push(Number(limit));

    const payments = db.prepare(sql).all(...params);
    return res.json({ payments });
  } catch (err) {
    console.error('[Admin] Payments list error:', err);
    return res.status(500).json({ error: 'Failed to retrieve payments' });
  }
}

export function getAllSubscriptions(req, res) {
  try {
    const subs = db.prepare(`
      SELECT s.*, u.email as user_email, u.full_name as user_name, u.department, pl.name as plan_name, pl.interval as plan_interval
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      JOIN subscription_plans pl ON s.plan_id = pl.id
      ORDER BY s.created_at DESC LIMIT 50
    `).all();

    return res.json({ subscriptions: subs });
  } catch (err) {
    console.error('[Admin] Subscriptions list error:', err);
    return res.status(500).json({ error: 'Failed to retrieve subscriptions' });
  }
}

export function getMemberApplications(req, res) {
  try {
    const apps = db.prepare('SELECT * FROM member_applications ORDER BY submitted_at DESC LIMIT 100').all();
    return res.json({ applications: apps });
  } catch (err) {
    console.error('[Admin] Member applications error:', err);
    return res.status(500).json({ error: 'Failed to retrieve member applications' });
  }
}

export function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid application status.' });
    }

    db.prepare('UPDATE member_applications SET status = ? WHERE id = ?').run(status, id);
    return res.json({ success: true, id, status });
  } catch (err) {
    console.error('[Admin] Update app status error:', err);
    return res.status(500).json({ error: 'Failed to update application status' });
  }
}

export function getWebhookEvents(req, res) {
  try {
    const events = db.prepare('SELECT * FROM payment_events ORDER BY created_at DESC LIMIT 30').all();
    return res.json({ events });
  } catch (err) {
    console.error('[Admin] Webhook events error:', err);
    return res.status(500).json({ error: 'Failed to retrieve webhook audit events' });
  }
}
