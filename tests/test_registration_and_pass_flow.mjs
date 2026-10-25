import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const BASE = 'http://localhost:5055';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin_test_password';

let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${testName} ${details ? '--> ' + details : ''}`);
    failed++;
  }
}

async function runFlowTest() {
  console.log('======================================================================');
  console.log(' CGC REGISTRATION, PASSWORD CREATION & MEMBER PASS ACCESS AUDIT TEST');
  console.log('======================================================================\n');

  const testEmail = `new_student_${Date.now()}@ambo.edu.et`;
  const testPassword = 'StudentSecurePassword2026!';
  let applicationId = '';
  let studentToken = '';

  // --- Step 1: Reject registration without password ---
  console.log('--- Step 1: Password Enforcement on Registration ---');
  try {
    const res = await fetch(`${BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Tolasa Gemechu',
        email: testEmail,
        department: 'Information Technology',
        yearOfStudy: '2nd Year',
        primaryTrack: 'cybersecurity',
        skillLevel: 'Beginner',
        whyJoin: 'I want to build ethical hacking and software security tools for Ambo community.'
        // password omitted
      })
    });
    const data = await res.json();
    assert(res.status === 400 && data.error?.includes('password'), 'Reject Join Us submission without password', JSON.stringify(data));
  } catch (e) {
    assert(false, 'Reject Join Us submission without password', e.message);
  }

  // --- Step 2: Reject registration with password shorter than 8 characters ---
  try {
    const res = await fetch(`${BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Tolasa Gemechu',
        email: testEmail,
        password: 'short',
        department: 'Information Technology',
        yearOfStudy: '2nd Year',
        primaryTrack: 'cybersecurity',
        skillLevel: 'Beginner',
        whyJoin: 'I want to build ethical hacking and software security tools for Ambo community.'
      })
    });
    const data = await res.json();
    assert(res.status === 400 && data.error?.includes('8 characters'), 'Reject short password (< 8 chars)', JSON.stringify(data));
  } catch (e) {
    assert(false, 'Reject short password (< 8 chars)', e.message);
  }

  // --- Step 3: Successful registration with secure password ---
  console.log('\n--- Step 3: Registration with Account Creation & Auto-Login ---');
  try {
    const res = await fetch(`${BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Tolasa Gemechu',
        email: testEmail,
        password: testPassword,
        phone: '+251911223344',
        department: 'Information Technology',
        yearOfStudy: '2nd Year',
        primaryTrack: 'cybersecurity',
        skillLevel: 'Beginner',
        whyJoin: 'I want to build ethical hacking and software security tools for Ambo community.'
      })
    });
    const data = await res.json();
    applicationId = data.id;
    studentToken = data.token;
    assert(
      res.status === 201 &&
      Boolean(data.id) &&
      Boolean(data.token) &&
      data.user?.role === 'USER',
      'Successful registration creates account, issues JWT token and role=USER',
      JSON.stringify(data)
    );
  } catch (e) {
    assert(false, 'Registration with password failed', e.message);
  }

  // --- Step 4: Verify student can access their Member Pass immediately ---
  console.log('\n--- Step 4: Immediate Member Pass & Portal Access ---');
  try {
    const res = await fetch(`${BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const data = await res.json();
    assert(
      res.status === 200 &&
      data.user?.email === testEmail &&
      data.user?.role === 'USER' &&
      data.membership?.hasApplied === true,
      'Student can access member portal (/api/auth/me) with issued session',
      JSON.stringify(data)
    );
  } catch (e) {
    assert(false, 'Member Pass access failed', e.message);
  }

  // --- Step 5: Verify student can sign in again using their credentials ---
  console.log('\n--- Step 5: Manual Sign In with Email & Password ---');
  let freshToken = '';
  try {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });
    const data = await res.json();
    freshToken = data.token;
    assert(
      res.status === 200 &&
      Boolean(data.token) &&
      data.user?.email === testEmail,
      'Student signs in successfully with newly created email & password',
      JSON.stringify(data)
    );
  } catch (e) {
    assert(false, 'Student sign in failed', e.message);
  }

  // --- Step 6: Verify student is blocked from admin dashboard endpoints ---
  console.log('\n--- Step 6: Strict Admin Authorization Verification ---');
  const adminEndpoints = [
    '/api/admin/metrics',
    '/api/admin/students',
    '/api/admin/applications',
    '/api/admin/proposals',
    '/api/admin/rsvps',
    '/api/admin/event-tickets'
  ];

  let allAdminForbidden = true;
  for (const ep of adminEndpoints) {
    const res = await fetch(`${BASE}${ep}`, {
      headers: { Authorization: `Bearer ${freshToken}` }
    });
    if (res.status !== 403) {
      allAdminForbidden = false;
      console.error(`Student token accessed ${ep} with status ${res.status}`);
    }
  }
  assert(allAdminForbidden, 'Student token is blocked with 403 Forbidden on all admin endpoints');

  // --- Step 7: Lead Admin approves application ---
  console.log('\n--- Step 7: Lead Admin Review & Member Approval ---');
  try {
    const adminLogin = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    const adminData = await adminLogin.json();
    const adminToken = adminData.token;

    const patchRes = await fetch(`${BASE}/api/admin/applications/${applicationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'Approved' })
    });
    const patchData = await patchRes.json();
    assert(patchRes.status === 200 && patchData.status === 'Approved', 'Lead Admin approves student application in dashboard', JSON.stringify(patchData));
  } catch (e) {
    assert(false, 'Lead Admin approval failed', e.message);
  }

  // --- Step 8: Student Member Pass is officially Active & Verified ---
  console.log('\n--- Step 8: Verified Member Pass Clearance ---');
  try {
    const meRes = await fetch(`${BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${freshToken}` }
    });
    const meData = await meRes.json();
    assert(
      meRes.status === 200 &&
      meData.membership?.isApproved === true &&
      meData.membership?.status === 'Approved' &&
      meData.membership?.id === applicationId,
      'Student pass is now officially approved with verified lab clearance',
      JSON.stringify(meData)
    );

    // Verify public lab door QR scan
    const verifyRes = await fetch(`${BASE}/api/verify/${applicationId}`);
    const verifyData = await verifyRes.json();
    assert(
      verifyRes.status === 200 &&
      verifyData.verified === true &&
      verifyData.member?.fullName === 'Tolasa Gemechu',
      'Public QR pass verification confirms active membership',
      JSON.stringify(verifyData)
    );
  } catch (e) {
    assert(false, 'Approved member pass check failed', e.message);
  }

  console.log('\n======================================================================');
  console.log(` FINAL RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================================');

  process.exit(failed > 0 ? 1 : 0);
}

runFlowTest().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
