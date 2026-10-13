import { db } from '../db.js';

export function getMetrics(req, res) {
  try {
    // 1. Total Registered Students
    const studentCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'USER'").get();

    // 2. Member Applications
    const totalApps = db.prepare('SELECT COUNT(*) as count FROM member_applications').get();
    const pendingApps = db.prepare("SELECT COUNT(*) as count FROM member_applications WHERE status = 'Reviewing' OR status = 'Pending'").get();

    // 3. Student Project Proposals
    const proposalCount = db.prepare('SELECT COUNT(*) as count FROM project_proposals').get();

    // 4. Workshop & Event RSVPs
    const rsvpCount = db.prepare('SELECT COUNT(*) as count FROM event_rsvps').get();

    return res.json({
      totalStudents: studentCount.count,
      totalApplications: totalApps.count,
      pendingApplications: pendingApps.count,
      totalProposals: proposalCount.count,
      totalRsvps: rsvpCount.count
    });
  } catch (err) {
    console.error('[Admin] Metrics error:', err);
    return res.status(500).json({ error: 'Failed to compute club metrics' });
  }
}

export function getAllStudents(req, res) {
  try {
    const { query, limit = 50 } = req.query;

    let sql = 'SELECT id, email, full_name, role, department, year_of_study, telegram, phone, primary_track, created_at FROM users WHERE role = "USER"';
    const params = [];

    if (query) {
      sql += ' AND (full_name LIKE ? OR email LIKE ? OR department LIKE ?)';
      params.push(`%${query}%`, `%${query}%`, `%${query}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT ?';
    params.push(Number(limit));

    const students = db.prepare(sql).all(...params);
    return res.json({ students });
  } catch (err) {
    console.error('[Admin] Students list error:', err);
    return res.status(500).json({ error: 'Failed to retrieve students' });
  }
}

export function getMemberApplications(req, res) {
  try {
    const apps = db.prepare('SELECT * FROM member_applications ORDER BY submitted_at DESC LIMIT 100').all();
    return res.json({ applications: apps });
  } catch (err) {
    console.error('[Admin] Applications error:', err);
    return res.status(500).json({ error: 'Failed to retrieve applications' });
  }
}

export function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Reviewing', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid application status.' });
    }

    db.prepare('UPDATE member_applications SET status = ? WHERE id = ?').run(status, id);
    return res.json({ success: true, id, status });
  } catch (err) {
    console.error('[Admin] Update app status error:', err);
    return res.status(500).json({ error: 'Failed to update application status' });
  }
}

export function getProposals(req, res) {
  try {
    const proposals = db.prepare('SELECT * FROM project_proposals ORDER BY submitted_at DESC LIMIT 50').all();
    return res.json({ proposals });
  } catch (err) {
    console.error('[Admin] Proposals error:', err);
    return res.status(500).json({ error: 'Failed to retrieve proposals' });
  }
}

export function getRsvps(req, res) {
  try {
    const rsvps = db.prepare('SELECT * FROM event_rsvps ORDER BY submitted_at DESC LIMIT 50').all();
    return res.json({ rsvps });
  } catch (err) {
    console.error('[Admin] RSVPs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve RSVPs' });
  }
}
