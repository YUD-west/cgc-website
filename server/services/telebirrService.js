import crypto from 'node:crypto';

const TELEBIRR_API_URL = process.env.TELEBIRR_API_URL || 'https://developerportal.ethiotelecom.et:38443/apiaccess/payment/gateway';
const TELEBIRR_APP_ID = process.env.TELEBIRR_APP_ID || 'mock_fabric_app_id';
const TELEBIRR_SHORT_CODE = process.env.TELEBIRR_SHORT_CODE || '10001';
const TELEBIRR_PRIVATE_KEY = process.env.TELEBIRR_PRIVATE_KEY || '';
const TELEBIRR_PUBLIC_KEY = process.env.TELEBIRR_PUBLIC_KEY || '';

/**
 * Telebirr SHA256WithRSA signature generator
 * Telebirr requires sorting keys alphabetically, concatenating as key=value&, and signing with private key.
 */
export function signTelebirrPayload(params, privateKeyPem) {
  if (!privateKeyPem) return 'MOCK_RSA_SIGNATURE';

  try {
    const sortedKeys = Object.keys(params).filter(k => k !== 'sign').sort();
    const stringToSign = sortedKeys.map(k => `${k}=${params[k]}`).join('&');

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(stringToSign);
    return signer.sign(privateKeyPem, 'base64');
  } catch (err) {
    console.error('[Telebirr Service] Signing error:', err);
    return 'SIGNING_FAILED';
  }
}

/**
 * Verify Telebirr callback RSA signature
 */
export function verifyTelebirrSignature(params, signature, publicKeyPem) {
  if (!publicKeyPem) return true; // In mock/test mode

  try {
    const sortedKeys = Object.keys(params).filter(k => k !== 'sign').sort();
    const stringToVerify = sortedKeys.map(k => `${k}=${params[k]}`).join('&');

    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(stringToVerify);
    return verifier.verify(publicKeyPem, signature, 'base64');
  } catch (err) {
    console.error('[Telebirr Service] Verification error:', err);
    return false;
  }
}

/**
 * Create a Telebirr Preorder Web Checkout session
 */
export async function createTelebirrPreorder({
  orderId,
  amount,
  title,
  notifyUrl,
  redirectUrl
}) {
  const isMock = !TELEBIRR_PRIVATE_KEY || process.env.NODE_ENV === 'test';

  if (isMock) {
    console.log(`[Telebirr Service: MOCK MODE] Creating order ${orderId} for ${amount} ETB`);
    return {
      code: 0,
      msg: 'success',
      data: {
        toPayUrl: `/checkout/telebirr-simulate?order_id=${encodeURIComponent(orderId)}&amount=${amount}`
      }
    };
  }

  // Real Telebirr gateway request
  const bizContent = {
    appid: TELEBIRR_APP_ID,
    merch_code: TELEBIRR_SHORT_CODE,
    merch_order_id: orderId,
    title: title,
    total_amount: String(amount),
    trans_currency: 'ETB',
    notify_url: notifyUrl,
    redirect_url: redirectUrl,
    timestamp: String(Math.floor(Date.now() / 1000))
  };

  const sign = signTelebirrPayload(bizContent, TELEBIRR_PRIVATE_KEY);

  const payload = {
    ...bizContent,
    sign: sign
  };

  const res = await fetch(`${TELEBIRR_API_URL}/payment/preorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return await res.json();
}
