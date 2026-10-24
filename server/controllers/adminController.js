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
    const pendingProposals = db.prepare("SELECT COUNT(*) as count FROM project_proposals WHERE status = 'Pending' OR status = 'Reviewing'").get();

    // 4. Workshop & Event RSVPs
    const rsvpCount = db.prepare('SELECT COUNT(*) as count FROM event_rsvps').get();
    const pendingRsvps = db.prepare("SELECT COUNT(*) as count FROM event_rsvps WHERE status = 'Pending'").get();
    const approvedRsvps = db.prepare("SELECT COUNT(*) as count FROM event_rsvps WHERE status = 'Approved'").get();

    return res.json({
      totalStudents: studentCount.count,
      totalApplications: totalApps.count,
      pendingApplications: pendingApps.count,
      totalProposals: proposalCount.count,
      pendingProposals: pendingProposals.count,
      totalRsvps: rsvpCount.count,
      pendingRsvps: pendingRsvps.count,
      approvedRsvps: approvedRsvps.count
    });
  } catch (err) {
    console.error('[Admin] Metrics error:', err);
    return res.status(500).json({ error: 'Failed to compute club metrics' });
  }
}

export function getAllStudents(req, res) {
  try {
    const { query, limit = 50 } = req.query;
    const safeLimit = Math.max(1, Math.min(Number(limit) || 50, 100));

    let sql = "SELECT id, email, full_name, role, department, year_of_study, telegram, phone, primary_track, created_at FROM users WHERE role = 'USER'";
    const params = [];

    if (query) {
      sql += ' AND (full_name LIKE ? OR email LIKE ? OR department LIKE ?)';
      params.push(`%${query}%`, `%${query}%`, `%${query}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT ?';
    params.push(safeLimit);

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

    const validStatuses = ['Approved', 'Innovation Lead', 'Reviewing', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid application status.' });
    }

    const app = db.prepare('SELECT * FROM member_applications WHERE id = ?').get(id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }

    db.prepare('UPDATE member_applications SET status = ? WHERE id = ?').run(status, id);

    // If approved or innovation lead, activate member account and issue official pass
    if (status === 'Approved' || status === 'Innovation Lead') {
      db.prepare("UPDATE users SET membership_status = 'APPROVED' WHERE lower(email) = lower(?)").run(app.email);

      // If applicant submitted a change-making project idea, incubate it and give others a chance to join
      if (app.project_idea && app.project_idea.trim().length > 10) {
        const propId = `PRJ-PROP-${app.id.slice(-4)}`;
        const existingProp = db.prepare('SELECT id FROM project_proposals WHERE id = ?').get(propId);
        if (!existingProp) {
          db.prepare(`
            INSERT INTO project_proposals (id, title, problem_statement, proposed_solution, track_id, proposer_name, proposer_email, proposer_department, needed_roles, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Incubating')
          `).run(
            propId,
            `${app.full_name}'s Innovation Initiative`,
            app.project_idea,
            app.learning_goals || 'Incubating in Old Classroom ICT Building IT lab 01 and 06',
            app.primary_track || 'software-development',
            app.full_name,
            app.email,
            app.department,
            'Co-Founders, Technical Implementers, Researchers'
          );

          // Publish to campus co-creators board so other students can team up with them
          const collabId = `collab_${app.id}`;
          const existingCollab = db.prepare('SELECT id FROM co_creators WHERE id = ?').get(collabId);
          if (!existingCollab) {
            db.prepare(`
              INSERT INTO co_creators (id, title, description, faculty, needed_skills, contact_email, proposer_name, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, 'Open')
            `).run(
              collabId,
              `${app.full_name}'s Initiative: ${app.project_idea.slice(0, 45)}...`,
              app.project_idea,
              app.department,
              'Open to cross-faculty collaborators (IT, Agriculture, Business, Health)',
              app.email,
              app.full_name
            );
          }
        }
      }
    } else if (status === 'Rejected') {
      db.prepare("UPDATE users SET membership_status = 'REJECTED' WHERE lower(email) = lower(?)").run(app.email);
    }

    return res.json({ success: true, id, status, message: `Application updated to ${status}` });
  } catch (err) {
    console.error('[Admin] Update app status error:', err);
    return res.status(500).json({ error: 'Failed to update application status' });
  }
}

export function updateProposalStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, publishToCoCreator = true } = req.body; // 'Approved', 'Incubating', 'Reviewing', 'Rejected', 'Pending'

    const validStatuses = ['Approved', 'Incubating', 'Reviewing', 'Rejected', 'Pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid proposal status. Must be Approved, Incubating, Reviewing, Rejected, or Pending.' });
    }

    const proposal = db.prepare('SELECT * FROM project_proposals WHERE id = ?').get(id);
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    db.prepare('UPDATE project_proposals SET status = ? WHERE id = ?').run(status, id);

    // If approved or incubating, automatically publish to co-creator board and campus_projects
    const collabId = `collab_${proposal.id}`;
    if ((status === 'Approved' || status === 'Incubating') && publishToCoCreator) {
      const existing = db.prepare('SELECT id FROM co_creators WHERE id = ?').get(collabId);
      if (!existing) {
        db.prepare(`
          INSERT INTO co_creators (id, title, description, faculty, needed_skills, contact_email, proposer_name, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'Open')
        `).run(
          collabId,
          proposal.title,
          `${proposal.problem_statement} Solution: ${proposal.proposed_solution || 'Prototyping in Old Classroom ICT Building IT lab 01 and 06'}`,
          proposal.proposer_department || 'Information Technology',
          proposal.needed_roles || 'Developers, Designers, Domain Researchers',
          proposal.proposer_email || 'cgc.woliso@ambo.edu.et',
          proposal.proposer_name
        );
      } else {
        db.prepare("UPDATE co_creators SET status = 'Open' WHERE id = ?").run(collabId);
      }

      // Also register or update in campus_projects table
      const existingProject = db.prepare('SELECT id FROM campus_projects WHERE id = ?').get(proposal.id);
      if (!existingProject) {
        db.prepare(`
          INSERT INTO campus_projects (id, title, description, category, proposer_name, proposer_faculty, target_level, needed_roles, status, impact_goal)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Active', ?)
        `).run(
          proposal.id,
          proposal.title,
          proposal.problem_statement,
          proposal.category || 'Campus Innovation',
          proposal.proposer_name,
          proposal.proposer_department || 'Ambo University',
          proposal.target_level || 'All Levels Welcome',
          proposal.needed_roles || 'Cross-Faculty Collaborators',
          proposal.proposed_solution || 'Student-led innovation initiative in Old Classroom ICT Building IT lab 01 and 06'
        );
      } else {
        db.prepare("UPDATE campus_projects SET status = 'Active' WHERE id = ?").run(proposal.id);
      }
    } else if (status === 'Rejected' || status === 'Pending') {
      db.prepare("UPDATE co_creators SET status = 'Closed' WHERE id = ?").run(collabId);
      db.prepare("DELETE FROM campus_projects WHERE id = ?").run(proposal.id);
    }

    return res.json({ success: true, id, status, message: `Proposal marked as ${status}` });
  } catch (err) {
    console.error('[Admin] Update proposal error:', err);
    return res.status(500).json({ error: 'Failed to update proposal status' });
  }
}

export function getProposals(req, res) {
  try {
    const proposals = db.prepare('SELECT * FROM project_proposals ORDER BY submitted_at DESC LIMIT 100').all();
    return res.json({ proposals });
  } catch (err) {
    console.error('[Admin] Proposals error:', err);
    return res.status(500).json({ error: 'Failed to retrieve proposals' });
  }
}

export function getRsvps(req, res) {
  try {
    const rsvps = db.prepare('SELECT * FROM event_rsvps ORDER BY submitted_at DESC LIMIT 100').all();
    return res.json({ rsvps });
  } catch (err) {
    console.error('[Admin] RSVPs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve RSVPs' });
  }
}

export function updateRsvpStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Pending', 'Approved', 'Rejected'

    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid RSVP status. Must be Pending, Approved, or Rejected.' });
    }

    const rsvp = db.prepare('SELECT * FROM event_rsvps WHERE id = ? OR ticket_id = ?').get(id, id);
    if (!rsvp) {
      return res.status(404).json({ error: 'RSVP record not found.' });
    }

    db.prepare('UPDATE event_rsvps SET status = ? WHERE id = ?').run(status, rsvp.id);
    return res.json({ success: true, id: rsvp.id, status, message: `RSVP reservation updated to ${status}` });
  } catch (err) {
    console.error('[Admin] Update RSVP status error:', err);
    return res.status(500).json({ error: 'Failed to update RSVP status' });
  }
}
