import { db } from '../db.js';

/**
 * Runs subscription lifecycle maintenance:
 * - Marks overdue subscriptions as PAST_DUE or EXPIRED
 * - Logs billing attempts
 */
export function runSubscriptionLifecycleJob() {
  const now = new Date().toISOString();
  console.log(`[Scheduler] Running subscription lifecycle maintenance at ${now}...`);

  try {
    // 1. Find expired active subscriptions
    const expiredSubs = db.prepare(`
      SELECT s.*, u.email, u.full_name, p.name as plan_name
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      JOIN subscription_plans p ON s.plan_id = p.id
      WHERE s.status = 'ACTIVE' 
      AND s.current_period_end < ?
    `).all(now);

    for (const sub of expiredSubs) {
      console.log(`[Scheduler] Subscription ${sub.id} for ${sub.email} has expired.`);
      
      const newStatus = sub.cancel_at_period_end === 1 ? 'CANCELLED' : 'EXPIRED';

      db.prepare(`
        UPDATE subscriptions 
        SET status = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(newStatus, sub.id);

      // Record billing attempt / expiry event
      db.prepare(`
        INSERT INTO billing_attempts (id, subscription_id, scheduled_date, attempt_count, result, failure_reason)
        VALUES (?, ?, datetime('now'), 1, 'EXPIRED', 'Current billing cycle ended without automatic deduction')
      `).run(`att_${Date.now()}_${Math.random().toString(36).substring(7)}`, sub.id);
    }

    // 2. Identify subscriptions expiring soon (within next 3 days) for renewal notification
    const threeDaysLater = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const upcomingRenewals = db.prepare(`
      SELECT s.*, u.email, u.full_name
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.status = 'ACTIVE'
      AND s.current_period_end > ?
      AND s.current_period_end <= ?
    `).all(now, threeDaysLater);

    if (upcomingRenewals.length > 0) {
      console.log(`[Scheduler] Found ${upcomingRenewals.length} subscription(s) due for renewal within 3 days.`);
    }

    return {
      processed: expiredSubs.length,
      upcoming: upcomingRenewals.length
    };
  } catch (err) {
    console.error('[Scheduler] Error running lifecycle job:', err);
    return { error: err.message };
  }
}
