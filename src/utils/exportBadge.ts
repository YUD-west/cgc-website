import { createQRCodeMatrix } from './qrCode';

export interface BadgeData {
  memberId: string;
  fullName: string;
  email: string;
  department: string;
  yearOfStudy?: string;
  track: string;
  role?: string;
  accessLevel?: string;
  issuedAt?: string;
  isEventTicket?: boolean;
  eventTitle?: string;
  eventVenue?: string;
  eventDate?: string;
}

/**
 * Renders an official Ambo University CGC Member or Event Badge onto an offscreen HTML5 Canvas
 * and triggers a high-resolution PNG download.
 */
export async function downloadBadgeAsPNG(data: BadgeData): Promise<void> {
  const width = 800;
  const height = 1200;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // 1. Background gradient (Deep Navy University Theme)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#0B1120');
  bgGrad.addColorStop(0.5, '#0F172A');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer border with subtle glow
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // Inner subtle accent frame
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // 2. Lanyard Slot Cutout simulation (Top pill)
  ctx.fillStyle = '#1E293B';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 60, 40, 120, 16, 8);
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 3. Top University Letterhead
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 18px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('AMBO UNIVERSITY • WOLISO CAMPUS', width / 2, 95);

  ctx.fillStyle = '#64748B';
  ctx.font = '500 13px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('DIRECTORATE OF RESEARCH & INNOVATION', width / 2, 116);

  // Decorative Accent Ribbon
  const ribbonGrad = ctx.createLinearGradient(120, 0, width - 120, 0);
  ribbonGrad.addColorStop(0, '#2563EB');
  ribbonGrad.addColorStop(0.5, '#38BDF8');
  ribbonGrad.addColorStop(1, '#10B981');
  ctx.fillStyle = ribbonGrad;
  ctx.fillRect(100, 132, width - 200, 4);

  // 4. CGC Club Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 36px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('CYBER GUARDIANS CLUB', width / 2, 180);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 15px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('CGC • STUDENT INNOVATION & TECHNOLOGY PASS', width / 2, 206);

  // 5. Card Body Container Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(50, 230, width - 100, 480, 24);
  ctx.fill();
  ctx.stroke();

  if (data.isEventTicket) {
    // Event Ticket Layout
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('★ OFFICIAL EVENT ENTRY CLEARANCE ★', width / 2, 270);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 30px "Inter", sans-serif';
    wrapText(ctx, data.eventTitle || 'Campus Tech Event', width / 2, 320, width - 160, 36);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 16px "Inter", sans-serif';
    ctx.fillText(`Venue: ${data.eventVenue || 'Ambo University Woliso Campus'}`, width / 2, 420);
    ctx.fillText(`Date: ${data.eventDate || 'Scheduled 2026'}`, width / 2, 450);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`TICKET ID: ${data.memberId}`, width / 2, 500);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(data.accessLevel || 'Full Authorized Event Access', width / 2, 535);

    ctx.fillStyle = '#64748B';
    ctx.font = '14px "Inter", sans-serif';
    ctx.fillText(`Attendee: ${data.fullName} (${data.email})`, width / 2, 570);
  } else {
    // Official Member Layout
    // Member Name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px "Inter", "Segoe UI", sans-serif';
    ctx.fillText(data.fullName, width / 2, 285);

    // Role / Status Badge
    const roleText = data.role?.toUpperCase() || 'OFFICIAL VERIFIED MEMBER';
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`✓ ${roleText}`, width / 2, 320);

    // Department & Year
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '600 20px "Inter", sans-serif';
    ctx.fillText(`${data.department}${data.yearOfStudy ? ` • ${data.yearOfStudy}` : ''}`, width / 2, 365);

    // Innovation Track
    ctx.fillStyle = '#60A5FA';
    ctx.font = 'bold 18px "Inter", sans-serif';
    ctx.fillText(`Track: ${data.track || 'Cybersecurity & Software Architecture'}`, width / 2, 400);

    // Horizontal divider
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(90, 430);
    ctx.lineTo(width - 90, 430);
    ctx.stroke();

    // Member ID Badge
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 14px "Inter", sans-serif';
    ctx.fillText('VERIFIED MEMBER ID', width / 2, 460);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(data.memberId, width / 2, 495);

    // Clearance Level
    ctx.fillStyle = '#E2E8F0';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(data.accessLevel || 'Full Lab 02 Workstation & Innovation Hall Clearance', width / 2, 545);

    ctx.fillStyle = '#64748B';
    ctx.font = '14px "Inter", sans-serif';
    ctx.fillText(`Contact: ${data.email}`, width / 2, 580);
  }

  // 6. QR Code Section (Bottom Container)
  const qrBoxY = 740;
  const qrBoxSize = 270;
  const qrBoxX = (width - qrBoxSize) / 2;

  // White Card for maximum contrast & camera readability
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 20);
  ctx.fill();

  // Generate Matrix
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const verifyUrl = `${origin}/#verify/${data.memberId}`;
  const matrix = createQRCodeMatrix(verifyUrl);

  if (matrix && matrix.length > 0) {
    const pad = 3;
    const count = matrix.length;
    const totalCells = count + pad * 2;
    const innerSize = qrBoxSize - 24;
    const cellSize = innerSize / totalCells;
    const startX = qrBoxX + 12 + pad * cellSize;
    const startY = qrBoxY + 12 + pad * cellSize;

    ctx.fillStyle = '#0F172A';
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c]) {
          ctx.fillRect(
            Math.round(startX + c * cellSize),
            Math.round(startY + r * cellSize),
            Math.ceil(cellSize),
            Math.ceil(cellSize)
          );
        }
      }
    }
  }

  // Caption under QR Code
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText('OFFICIAL DIGITAL SCAN TARGET', width / 2, 1045);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px "Inter", sans-serif';
  ctx.fillText('Scan with any smartphone camera to verify Ambo University clearance', width / 2, 1070);

  // 7. Footer Watermark & Security Code
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 1105);
  ctx.lineTo(width - 60, 1105);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '500 12px monospace';
  ctx.fillText(`AUTHENTICATED BY EXECUTIVE LEAD • YESUF DERGU • ISSUED ${data.issuedAt || '2026'}`, width / 2, 1135);

  ctx.fillStyle = '#334155';
  ctx.font = '11px monospace';
  ctx.fillText('CYBER GUARDIANS CLUB • AMBO UNIVERSITY WOLISO CAMPUS • NON-TRANSFERABLE', width / 2, 1155);

  // Trigger browser download
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve();
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `CGC-Pass-${data.memberId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    }, 'image/png');
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}
