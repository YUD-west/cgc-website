import { db } from '../db.js';

export function listPlans(req, res) {
  try {
    const plans = db.prepare('SELECT * FROM subscription_plans WHERE is_active = 1 ORDER BY price_etb ASC').all();
    const formatted = plans.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      interval: p.interval,
      priceETB: p.price_etb,
      priceUSD: p.price_usd,
      features: JSON.parse(p.features || '[]')
    }));

    return res.json({ plans: formatted });
  } catch (err) {
    console.error('[Plans] Error fetching plans:', err);
    return res.status(500).json({ error: 'Failed to retrieve subscription plans' });
  }
}
