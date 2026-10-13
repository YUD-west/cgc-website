import { z } from 'zod';
import { db } from '../db.js';
import { initializeChapaTransaction, verifyChapaTransaction, verifyChapaWebhookSignature } from '../services/chapaService.js';

export const initializePaymentSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  currency: z.enum(['ETB', 'USD']).default('ETB'),
  paymentMethod: z.enum(['TELEBIRR', 'CBE_BIRR', 'CARD']).default('TELEBIRR')
});

export async function initializePayment(req, res) {
  try {
    const user = req.user;
    const { planId, currency, paymentMethod } = req.validatedBody;

    // 1. Fetch Plan from Server Database (NEVER trust client price!)
    const plan = db.prepare('SELECT * FROM subscription_plans WHERE id = ? AND is_active = 1').get(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Subscription plan not found or is currently inactive.' });
    }

    const amount = currency === 'ETB' ? plan.price_etb : plan.price_usd;
    const internalRef = `CGC-TX-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // 2. Insert PENDING payment record
    db.prepare(`
      INSERT INTO payments (id, internal_ref, user_id, plan_id, provider, payment_method, amount, currency, status)
      VALUES (?, ?, ?, ?, 'CHAPA', ?, ?, ?, 'PENDING')
    `).run(paymentId, internalRef, user.id, plan.id, paymentMethod, amount, currency);

    // 3. URLs
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const callbackUrl = `${process.env.API_URL || 'http://localhost:5000'}/api/payments/webhook`;
    const returnUrl = `${baseUrl}/checkout/return?tx_ref=${encodeURIComponent(internalRef)}`;

    // Name splitting for Chapa
    const nameParts = (user.full_name || 'Member').split(' ');
    const firstName = nameParts[0] || 'Member';
    const lastName = nameParts.slice(1).join(' ') || 'Guardian';

    // 4. Initialize via Chapa
    const chapaResponse = await initializeChapaTransaction({
      amount,
      currency,
      email: user.email,
      firstName,
      lastName,
      txRef: internalRef,
      callbackUrl,
      returnUrl,
      paymentMethod,
      customization: {
        title: `CGC: ${plan.name}`,
        description: `Cyber Guardians Club membership via ${paymentMethod}`
      }
    });

    if (chapaResponse.status === 'success' && chapaResponse.data?.checkout_url) {
      // Update payment with checkout URL
      db.prepare('UPDATE payments SET checkout_url = ? WHERE id = ?')
        .run(chapaResponse.data.checkout_url, paymentId);

      return res.status(200).json({
        success: true,
        paymentId,
        internalRef,
        amount,
        currency,
        paymentMethod,
        checkoutUrl: chapaResponse.data.checkout_url
      });
    } else {
      db.prepare('UPDATE payments SET status = "FAILED" WHERE id = ?').run(paymentId);
      return res.status(502).json({
        error: chapaResponse.message || 'Payment provider was unable to create checkout session.'
      });
    }

  } catch (err) {
    console.error('[Payment] Initialize error:', err);
    return res.status(500).json({ error: 'Failed to initiate payment transaction' });
  }
}

/**
 * Server-side payment verification & subscription activation
 */
export async function verifyPayment(req, res) {
  try {
    const { txRef } = req.params;
    if (!txRef) {
      return res.status(400).json({ error: 'Transaction reference is required.' });
    }

    const payment = db.prepare(`
      SELECT p.*, u.email as user_email, u.full_name, pl.interval as plan_interval, pl.name as plan_name
      FROM payments p
      JOIN users u ON p.user_id = u.id
      JOIN subscription_plans pl ON p.plan_id = pl.id
      WHERE p.internal_ref = ?
    `).get(txRef);

    if (!payment) {
      return res.status(404).json({ error: 'Payment transaction record not found.' });
    }

    // Check authorization: User can only verify their own transaction (unless Admin)
    if (req.user.role !== 'ADMIN' && req.user.id !== payment.user_id) {
      return res.status(403).json({ error: 'Unauthorized to verify this transaction.' });
    }

    // If already verified and marked SUCCESS, return existing state idempotently
    if (payment.status === 'SUCCESS') {
      const subscription = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(payment.subscription_id);
      return res.json({
        verified: true,
        alreadyProcessed: true,
        payment,
        subscription
      });
    }

    // Out-of-band verification with Chapa
    const verification = await verifyChapaTransaction(txRef);

    if (verification.status === 'success' && verification.data?.status === 'success') {
      // 1. Calculate subscription dates
      const now = new Date();
      const startDate = now.toISOString();
      const endDate = new Date(now);
      
      if (payment.plan_interval === 'YEARLY') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }
      const periodEnd = endDate.toISOString();

      // 2. Create or extend Subscription record
      let subId = payment.subscription_id;
      if (!subId) {
        subId = `sub_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        db.prepare(`
          INSERT INTO subscriptions (id, user_id, plan_id, provider, status, current_period_start, current_period_end, next_billing_date)
          VALUES (?, ?, ?, 'CHAPA', 'ACTIVE', ?, ?, ?)
        `).run(subId, payment.user_id, payment.plan_id, startDate, periodEnd, periodEnd);
      } else {
        db.prepare(`
          UPDATE subscriptions 
          SET status = 'ACTIVE', current_period_start = ?, current_period_end = ?, next_billing_date = ?, updated_at = datetime('now')
          WHERE id = ?
        `).run(startDate, periodEnd, periodEnd, subId);
      }

      // 3. Mark payment as SUCCESS
      db.prepare(`
        UPDATE payments 
        SET status = 'SUCCESS', subscription_id = ?, provider_tx_ref = ?, verification_data = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(subId, verification.data?.reference || null, JSON.stringify(verification), payment.id);

      const updatedSub = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(subId);
      const updatedPayment = db.prepare('SELECT * FROM payments WHERE id = ?').get(payment.id);

      return res.json({
        verified: true,
        status: 'SUCCESS',
        payment: updatedPayment,
        subscription: updatedSub
      });

    } else {
      // Verification failed
      db.prepare('UPDATE payments SET status = "FAILED", updated_at = datetime(\'now\') WHERE id = ?').run(payment.id);
      return res.status(400).json({
        verified: false,
        status: 'FAILED',
        message: 'Payment verification failed or payment was rejected by provider.'
      });
    }

  } catch (err) {
    console.error('[Payment] Verify error:', err);
    return res.status(500).json({ error: 'Internal error during payment verification' });
  }
}

/**
 * Webhook Receiver (Idempotent, HMAC-verified)
 */
export async function handleWebhook(req, res) {
  try {
    const rawBody = req.rawBody || JSON.stringify(req.body);
    const signature = req.headers['x-chapa-signature'];

    // Verify HMAC
    const isValid = verifyChapaWebhookSignature(rawBody, signature);
    const isMock = process.env.NODE_ENV === 'test' || !process.env.CHAPA_WEBHOOK_SECRET;

    if (!isValid && !isMock) {
      console.warn('[Webhook] Rejected webhook with invalid HMAC signature.');
      return res.status(401).json({ error: 'Invalid webhook signature.' });
    }

    const event = req.body;
    const txRef = event.tx_ref || event.merchant_reference;
    if (!txRef) {
      return res.status(400).json({ error: 'Missing transaction reference in webhook payload.' });
    }

    const idempotencyKey = `evt_${txRef}_${event.status || 'unknown'}`;

    // Check if event already processed (IDEMPOTENCY CONTROL)
    const existingEvent = db.prepare('SELECT * FROM payment_events WHERE idempotency_key = ?').get(idempotencyKey);
    if (existingEvent) {
      console.log(`[Webhook] Duplicate event ${idempotencyKey} already processed. Returning 200 OK.`);
      return res.status(200).json({ status: 'already_processed' });
    }

    // Log the event
    const eventId = `pe_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    db.prepare(`
      INSERT INTO payment_events (id, provider, event_type, idempotency_key, provider_ref, payload, processed_status)
      VALUES (?, 'CHAPA', ?, ?, ?, ?, 'PROCESSING')
    `).run(eventId, event.event || 'payment_callback', idempotencyKey, event.reference || txRef, JSON.stringify(event));

    // If payment was successful, trigger verification & fulfillment
    if (event.status === 'success') {
      const payment = db.prepare('SELECT * FROM payments WHERE internal_ref = ?').get(txRef);
      if (payment && payment.status !== 'SUCCESS') {
        const verifyRes = await verifyChapaTransaction(txRef);
        if (verifyRes.status === 'success') {
          const now = new Date();
          const startDate = now.toISOString();
          const endDate = new Date(now);
          endDate.setMonth(endDate.getMonth() + 1);

          let subId = payment.subscription_id || `sub_${Date.now()}`;
          db.prepare(`
            INSERT OR REPLACE INTO subscriptions (id, user_id, plan_id, provider, status, current_period_start, current_period_end, next_billing_date)
            VALUES (?, ?, ?, 'CHAPA', 'ACTIVE', ?, ?, ?)
          `).run(subId, payment.user_id, payment.plan_id, startDate, endDate.toISOString(), endDate.toISOString());

          db.prepare(`
            UPDATE payments 
            SET status = 'SUCCESS', subscription_id = ?, updated_at = datetime('now')
            WHERE id = ?
          `).run(subId, payment.id);
        }
      }
    }

    db.prepare('UPDATE payment_events SET processed_status = "PROCESSED" WHERE id = ?').run(eventId);
    return res.status(200).json({ status: 'success' });

  } catch (err) {
    console.error('[Webhook] Processing error:', err);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
