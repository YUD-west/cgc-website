import crypto from 'node:crypto';

const CHAPA_API_URL = process.env.CHAPA_API_URL || 'https://api.chapa.co/v1';
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || 'CHASECK_TEST-mock-key-for-dev';
const CHAPA_WEBHOOK_SECRET = process.env.CHAPA_WEBHOOK_SECRET || 'cgc-webhook-secret-salt-2026';

/**
 * Initialize a Chapa checkout transaction (focusing on Telebirr & CBE Birr for ETB)
 */
export async function initializeChapaTransaction({
  amount,
  currency,
  email,
  firstName,
  lastName,
  txRef,
  callbackUrl,
  returnUrl,
  paymentMethod = 'TELEBIRR', // 'TELEBIRR' or 'CBE_BIRR'
  customization = {
    title: 'CGC Membership Subscription',
    description: 'Cyber Guardians Club Woliso Campus'
  }
}) {
  const isMock = CHAPA_SECRET_KEY.includes('mock') || process.env.NODE_ENV === 'test';

  if (isMock) {
    console.log(`[Chapa Service: MOCK MODE] Initializing transaction for ${txRef} (${amount} ${currency}) via ${paymentMethod}`);
    // Simulate real Chapa hosted checkout URL
    const mockCheckoutUrl = `/checkout/simulate?tx_ref=${encodeURIComponent(txRef)}&amount=${amount}&currency=${currency}&method=${paymentMethod}`;
    return {
      status: 'success',
      message: 'Hosted payment page created successfully (Sandbox Mock)',
      data: {
        checkout_url: mockCheckoutUrl,
        tx_ref: txRef
      }
    };
  }

  // Real Chapa API Call
  try {
    const payload = {
      amount: String(amount),
      currency: currency.toUpperCase(),
      email: email,
      first_name: firstName,
      last_name: lastName,
      tx_ref: txRef,
      callback_url: callbackUrl,
      return_url: returnUrl,
      customization: {
        title: customization.title,
        description: customization.description
      },
      // Chapa meta for Ethiopian payment rails routing
      meta: {
        preferred_payment_method: paymentMethod, // 'TELEBIRR' or 'CBE_BIRR'
        club: 'Cyber Guardians Club',
        campus: 'Ambo University Woliso Campus'
      }
    };

    const res = await fetch(`${CHAPA_API_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Chapa Service] Initialization Error:', error);
    throw new Error(`Failed to initialize payment with Chapa: ${error.message}`);
  }
}

/**
 * Verify a transaction out-of-band with Chapa
 */
export async function verifyChapaTransaction(txRef) {
  const isMock = CHAPA_SECRET_KEY.includes('mock') || process.env.NODE_ENV === 'test';

  if (isMock) {
    console.log(`[Chapa Service: MOCK MODE] Verifying transaction ${txRef}`);
    return {
      status: 'success',
      message: 'Payment verified successfully (Sandbox Mock)',
      data: {
        tx_ref: txRef,
        status: 'success',
        reference: `CHAPA-${Date.now()}`,
        charge: 0,
        currency: 'ETB'
      }
    };
  }

  try {
    const res = await fetch(`${CHAPA_API_URL}/transaction/verify/${encodeURIComponent(txRef)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Chapa Service] Verification Error:', error);
    throw new Error(`Failed to verify payment with Chapa: ${error.message}`);
  }
}

/**
 * Validate incoming Webhook HMAC-SHA256 signature
 */
export function verifyChapaWebhookSignature(rawBody, signatureHeader) {
  if (!signatureHeader) return false;
  
  try {
    const hash = crypto
      .createHmac('sha256', CHAPA_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signatureHeader));
  } catch (err) {
    console.error('[Chapa Service] Webhook signature verification error:', err);
    return false;
  }
}
