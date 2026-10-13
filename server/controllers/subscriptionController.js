import { db } from '../db.js';

export function getUserSubscription(req, res) {
  try {
    const userId = req.user.id;

    // Get active or latest subscription
    const subscription = db.prepare(`
      SELECT s.*, p.name as plan_name, p.slug as plan_slug, p.interval as plan_interval, p.price_etb, p.price_usd, p.features
      FROM subscriptions s
      JOIN subscription_plans p ON s.plan_id = p.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC LIMIT 1
    `).get(userId);

    if (subscription) {
      subscription.features = JSON.parse(subscription.features || '[]');
    }

    // Get user's payment history
    const payments = db.prepare(`
      SELECT p.*, pl.name as plan_name
      FROM payments p
      JOIN subscription_plans pl ON p.plan_id = pl.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC LIMIT 20
    `).all(userId);

    // Get billing attempts
    const attempts = subscription ? db.prepare(`
      SELECT * FROM billing_attempts
      WHERE subscription_id = ?
      ORDER BY created_at DESC LIMIT 10
    `).all(subscription.id) : [];

    return res.json({
      subscription: subscription || null,
      payments,
      attempts
    });
  } catch (err) {
    console.error('[Subscription] Fetch error:', err);
    return res.status(500).json({ error: 'Failed to retrieve subscription details' });
  }
}

export function cancelSubscription(req, res) {
  try {
    const userId = req.user.id;
    const sub = db.prepare('SELECT * FROM subscriptions WHERE user_id = ? AND status = "ACTIVE"').get(userId);

    if (!sub) {
      return res.status(404).json({ error: 'No active subscription found to cancel.' });
    }

    // Stop future scheduled renewals (remains active until period_end)
    db.prepare(`
      UPDATE subscriptions 
      SET cancel_at_period_end = 1, updated_at = datetime('now')
      WHERE id = ?
    `).run(sub.id);

    return res.json({
      success: true,
      message: 'Automatic renewal has been cancelled. Your membership remains active until the end of your paid billing period.',
      currentPeriodEnd: sub.current_period_end
    });
  } catch (err) {
    console.error('[Subscription] Cancel error:', err);
    return res.status(500).json({ error: 'Failed to cancel subscription renewal' });
  }
}
