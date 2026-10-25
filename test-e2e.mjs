import dotenv from 'dotenv';
dotenv.config();

// Comprehensive End-to-End Test Suite for CGC Innovation Platform
const BASE = 'http://localhost:5055';

async function runTests() {
  console.log('🚀 STARTING COMPREHENSIVE END-TO-END TEST SUITE\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message, details = '') {
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message} ${details ? '-> ' + details : ''}`);
      failed++;
    }
  }

  // TEST 1: Health Check
  try {
    const res = await fetch(`${BASE}/api/health`);
    const data = await res.json();
    assert(res.status === 200 && data.status === 'ok', `Health Check: ${data.service} (${data.campus})`);
  } catch (e) {
    assert(false, `Health Check Error: ${e.message}`);
  }

  // TEST 2: Admin Authentication
  let adminToken = '';
  let adminUser = null;
  const testAdminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const testAdminPassword = process.env.ADMIN_PASSWORD || 'admin_test_password';
  try {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testAdminEmail, password: testAdminPassword })
    });
    const data = await res.json();
    assert(res.status === 200 && data.token, `Admin Login: ${data.user?.fullName} (Role: ${data.user?.role})`, JSON.stringify(data));
    adminToken = data.token;
    adminUser = data.user;
  } catch (e) {
    assert(false, `Admin Login Failed: ${e.message}`);
  }

  // TEST 3: Auth /me verification
  try {
    const res = await fetch(`${BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const data = await res.json();
    assert(res.status === 200 && data.user?.email === 'yesufdergu464@gmail.com', `Auth Me: User ${data.user?.email}, Pass ID ${data.membership?.id}`);
  } catch (e) {
    assert(false, `Auth Me Error: ${e.message}`);
  }

  // TEST 4: Admin Metrics & Protected Endpoints
  try {
    const res = await fetch(`${BASE}/api/admin/metrics`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const data = await res.json();
    assert(res.status === 200 && data.totalStudents !== undefined, `Admin Metrics: Students=${data.totalStudents}, Apps=${data.totalApplications}, Proposals=${data.totalProposals}`);
  } catch (e) {
    assert(false, `Admin Metrics Error: ${e.message}`);
  }

  // TEST 5: Admin Member Applications & Students
  try {
    const resApps = await fetch(`${BASE}/api/admin/applications`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const appsData = await resApps.json();
    assert(resApps.status === 200 && Array.isArray(appsData.applications), `Admin Applications: Retrieved ${appsData.applications?.length} applications`);

    const resStud = await fetch(`${BASE}/api/admin/students`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const studsData = await resStud.json();
    assert(resStud.status === 200 && Array.isArray(studsData.students), `Admin Students: Retrieved ${studsData.students?.length} students`, JSON.stringify(studsData));
  } catch (e) {
    assert(false, `Admin Tables Error: ${e.message}`);
  }

  // TEST 6: Verify Pass System
  try {
    // President Pass
    const presRes = await fetch(`${BASE}/api/verify-pass/CGC-WL-2026-PRES`);
    const presData = await presRes.json();
    assert(presRes.status === 200 && presData.verified === true, `President Pass Verified: ${presData.member?.fullName} (${presData.member?.role})`);

    // Event Ticket Pass
    const evtRes = await fetch(`${BASE}/api/verify-pass/EVT-HACK-2026-WL`);
    const evtData = await evtRes.json();
    assert(evtRes.status === 200 && evtData.verified === true, `Event Ticket Verified: ${evtData.ticket?.title} (${evtData.ticket?.venue})`);
  } catch (e) {
    assert(false, `Verify Pass Error: ${e.message}`);
  }

  // TEST 7: Campus Projects Endpoint
  try {
    const res = await fetch(`${BASE}/api/projects`);
    const data = await res.json();
    assert(res.status === 200 && Array.isArray(data.projects), `Campus Projects API: Retrieved ${data.projects?.length} projects`);
  } catch (e) {
    assert(false, `Projects API Error: ${e.message}`);
  }

  // TEST 8: New Student Registration & Verification
  const testEmail = `student_${Date.now()}@cgc-innovation.org`;
  const testPassword = 'Password123!';
  let newUserToken = '';
  try {
    const regRes = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Kidus Tadesse',
        email: testEmail,
        password: testPassword,
        department: 'Software Engineering',
        yearOfStudy: '3rd Year'
      })
    });
    const regData = await regRes.json();
    assert(regRes.status === 201 && regData.token, `Student Registration: ${regData.user?.fullName} (${regData.user?.email})`, JSON.stringify(regData));
    newUserToken = regData.token;

    // Login with new student
    const logRes = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });
    const logData = await logRes.json();
    assert(logRes.status === 200 && logData.token, `Student Login: verified token for ${logData.user?.email}`);

    // Verify /me endpoint for student
    const meRes = await fetch(`${BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${newUserToken}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.user?.email === testEmail, `Student /me Endpoint: ${meData.user?.fullName}`);
  } catch (e) {
    assert(false, `New User Flow Error: ${e.message}`);
  }

  // TEST 9: Project Proposal Submission
  try {
    const propRes = await fetch(`${BASE}/api/proposals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Woliso Smart Crop Shield',
        problemStatement: 'Farmers around Woliso experience pest outbreaks with delayed advisory warnings.',
        proposedSolution: 'Automated pest detection camera with SMS advisory to agricultural extension officers.',
        category: 'Agriculture & IoT',
        proposerName: 'Kidus Tadesse',
        proposerEmail: testEmail,
        proposerDepartment: 'Software Engineering',
        neededRoles: 'Embedded Systems Engineer, Mobile Dev'
      })
    });
    const propData = await propRes.json();
    assert(propRes.status === 201 && propData.success, `Project Proposal Created: ID=${propData.id}`);
  } catch (e) {
    assert(false, `Project Proposal Error: ${e.message}`);
  }

  // TEST 10: Event RSVP Submission
  try {
    const rsvpRes = await fetch(`${BASE}/api/rsvps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: 'EVT-WL-2026-HACK',
        name: 'Kidus Tadesse',
        email: testEmail,
        department: 'Software Engineering'
      })
    });
    const rsvpData = await rsvpRes.json();
    assert(rsvpRes.status === 201 && rsvpData.success, `Event RSVP Registered: Ticket=${rsvpData.ticketId}`);
  } catch (e) {
    assert(false, `Event RSVP Error: ${e.message}`);
  }

  // TEST 11: Member Application Submission
  try {
    const appEmail = `applicant_${Date.now()}@cgc-innovation.org`;
    const appRes = await fetch(`${BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Kidus Tadesse',
        email: appEmail,
        password: 'Password123!',
        phone: '+251 91 123 4567',
        department: 'Software Engineering',
        yearOfStudy: '3rd Year',
        primaryTrack: 'Cybersecurity & Defenses',
        skillLevel: 'Intermediate',
        whyJoin: 'I want to collaborate on real-world security defense tools for Ethiopia.'
      })
    });
    const appData = await appRes.json();
    assert(appRes.status === 201 && appData.success, `Member Application Submitted: ID=${appData.id}`, JSON.stringify(appData));

    // Lead Admin approves application
    await fetch(`${BASE}/api/admin/applications/${appData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'Approved' })
    });

    // Verify Pass Lookup for the new application pass ID
    const newPassRes = await fetch(`${BASE}/api/verify-pass/${appData.id}`);
    const newPassData = await newPassRes.json();
    assert(newPassRes.status === 200 && newPassData.verified === true, `Official Pass Verified: ${newPassData.member?.fullName} (${newPassData.member?.id})`);
  } catch (e) {
    assert(false, `Member Application Error: ${e.message}`);
  }

  // Summary
  console.log('\n=============================================');
  console.log(`🎯 TOTAL TESTS: ${passed + failed}`);
  console.log(`✅ PASSED: ${passed}`);
  console.log(`❌ FAILED: ${failed}`);
  console.log('=============================================\n');

  if (failed === 0) {
    console.log('🎉 ALL CGC SYSTEMS 100% OPERATIONAL & VERIFIED!');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
