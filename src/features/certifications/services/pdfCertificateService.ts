import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Certificate } from '../types';
import { validateAndSanitizeLearnerName } from './nameValidation';

export interface GeneratePdfOptions {
  certificate: Certificate;
}

/**
 * Produces a meaningful, URL-safe filename for the downloaded certificate.
 * Example: JS-CodeLab-JavaScript-Fundamentals-Certificate.pdf
 */
export function getCertificatePdfFilename(certificationTitle: string): string {
  const sanitizedTitle = certificationTitle
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `JS-CodeLab-${sanitizedTitle}-Certificate.pdf`;
}

/**
 * Generates an A4 Landscape vector PDF containing the official certificate document.
 * Returns the raw Uint8Array PDF buffer.
 */
export async function generateCertificatePdf(certificate: Certificate): Promise<Uint8Array> {
  const nameValidation = validateAndSanitizeLearnerName(certificate.learnerName);
  const displayName = nameValidation.valid ? nameValidation.sanitized : certificate.learnerName;

  // Create A4 Landscape PDF Document (841.89 x 595.28 points)
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 841.89;
  const pageHeight = 595.28;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Embed standard vector fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const courier = await pdfDoc.embedFont(StandardFonts.Courier);

  // Palette definitions
  const bgNavy = rgb(6 / 255, 9 / 255, 19 / 255);
  const innerCardBg = rgb(9 / 255, 14 / 255, 28 / 255);
  const blueAccent = rgb(37 / 255, 99 / 255, 235 / 255);

  const cyanAccent = rgb(56 / 255, 189 / 255, 248 / 255);
  const goldAccent = rgb(245 / 255, 158 / 255, 11 / 255);
  const goldBright = rgb(251 / 255, 191 / 255, 36 / 255);
  const white = rgb(1, 1, 1);
  const slateLight = rgb(226 / 255, 232 / 255, 240 / 255);
  const slateMuted = rgb(148 / 255, 163 / 255, 184 / 255);
  const slateDark = rgb(71 / 255, 85 / 255, 105 / 255);
  const emeraldGreen = rgb(16 / 255, 185 / 255, 129 / 255);

  // 1. Base dark obsidian navy background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: bgNavy,
  });

  // 2. Outer Royal Blue Frame
  const outerMargin = 22;
  const frameWidth = pageWidth - outerMargin * 2;
  const frameHeight = pageHeight - outerMargin * 2;

  page.drawRectangle({
    x: outerMargin,
    y: outerMargin,
    width: frameWidth,
    height: frameHeight,
    color: innerCardBg,
    borderColor: blueAccent,
    borderWidth: 3.5,
  });

  // 3. Gold / Champagne Accent Pinstripe
  const goldMargin = 30;
  page.drawRectangle({
    x: goldMargin,
    y: goldMargin,
    width: pageWidth - goldMargin * 2,
    height: pageHeight - goldMargin * 2,
    borderColor: goldAccent,
    borderWidth: 1,
    borderOpacity: 0.65,
  });

  // 4. Fine Inner Blue/Cyan Border
  const innerMargin = 37;
  page.drawRectangle({
    x: innerMargin,
    y: innerMargin,
    width: pageWidth - innerMargin * 2,
    height: pageHeight - innerMargin * 2,
    borderColor: rgb(30 / 255, 58 / 255, 138 / 255),
    borderWidth: 0.75,
  });

  // 5. Luxury Architectural Corner Ornaments (4 Corners)
  const cornerSize = 18;
  const cornerOffset = 42;
  const drawCornerBracket = (cx: number, cy: number, dx: number, dy: number) => {
    // Primary bracket
    page.drawLine({
      start: { x: cx, y: cy },
      end: { x: cx + dx * cornerSize, y: cy },
      thickness: 1.5,
      color: cyanAccent,
    });
    page.drawLine({
      start: { x: cx, y: cy },
      end: { x: cx, y: cy + dy * cornerSize },
      thickness: 1.5,
      color: cyanAccent,
    });
    // Mini gold diamond stud
    page.drawRectangle({
      x: cx + dx * 4 - 2,
      y: cy + dy * 4 - 2,
      width: 4,
      height: 4,
      color: goldBright,
    });
  };

  drawCornerBracket(cornerOffset, pageHeight - cornerOffset, 1, -1);
  drawCornerBracket(pageWidth - cornerOffset, pageHeight - cornerOffset, -1, -1);
  drawCornerBracket(cornerOffset, cornerOffset, 1, 1);
  drawCornerBracket(pageWidth - cornerOffset, cornerOffset, -1, 1);

  // Helper for centered text
  const drawCenteredText = (
    text: string,
    font: typeof helvetica,
    size: number,
    y: number,
    color = white,
    opacity = 1
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    const x = (pageWidth - textWidth) / 2;
    page.drawText(text, { x, y, size, font, color, opacity });
  };

  // ================= 6. ELEGANT SECURITY WATERMARK LAYER =================
  // Rendered behind all foreground text
  const wmCenterX = pageWidth / 2;
  const wmCenterY = pageHeight / 2 + 10;

  // Concentric watermark security rings
  page.drawCircle({
    x: wmCenterX,
    y: wmCenterY,
    size: 165,
    borderColor: cyanAccent,
    borderWidth: 1.25,
    borderOpacity: 0.045,
  });

  page.drawCircle({
    x: wmCenterX,
    y: wmCenterY,
    size: 140,
    borderColor: blueAccent,
    borderWidth: 0.75,
    borderOpacity: 0.04,
  });

  page.drawCircle({
    x: wmCenterX,
    y: wmCenterY,
    size: 110,
    borderColor: cyanAccent,
    borderWidth: 1,
    borderOpacity: 0.05,
  });

  page.drawCircle({
    x: wmCenterX,
    y: wmCenterY,
    size: 80,
    borderColor: blueAccent,
    borderWidth: 1.5,
    borderOpacity: 0.055,
  });

  // 8 Watermark Radial Spokes
  const spokeInner = 80;
  const spokeOuter = 140;
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  angles.forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    page.drawLine({
      start: { x: wmCenterX + cos * spokeInner, y: wmCenterY + sin * spokeInner },
      end: { x: wmCenterX + cos * spokeOuter, y: wmCenterY + sin * spokeOuter },
      thickness: 0.75,
      color: cyanAccent,
      opacity: 0.035,
    });
  });

  // Central Watermark Monogram < / >
  const wmCodeText = '< / >';
  const wmCodeSize = 72;
  const wmCodeWidth = helveticaBold.widthOfTextAtSize(wmCodeText, wmCodeSize);
  page.drawText(wmCodeText, {
    x: wmCenterX - wmCodeWidth / 2,
    y: wmCenterY - 24,
    size: wmCodeSize,
    font: helveticaBold,
    color: cyanAccent,
    opacity: 0.045,
  });

  // Watermark Security Seals text
  const wmTopText = 'JS CODELAB ACADEMY';
  const wmTopWidth = helveticaBold.widthOfTextAtSize(wmTopText, 9);
  page.drawText(wmTopText, {
    x: wmCenterX - wmTopWidth / 2,
    y: wmCenterY + 52,
    size: 9,
    font: helveticaBold,
    color: cyanAccent,
    opacity: 0.045,
  });

  const wmBottomText = 'OFFICIAL CREDENTIAL · VERIFIED';
  const wmBottomWidth = helveticaBold.widthOfTextAtSize(wmBottomText, 8);
  page.drawText(wmBottomText, {
    x: wmCenterX - wmBottomWidth / 2,
    y: wmCenterY - 60,
    size: 8,
    font: helveticaBold,
    color: cyanAccent,
    opacity: 0.045,
  });

  // ================= 7. FOREGROUND CONTENT LAYER =================

  // Header: Official JS CodeLab Website Logo Lockup
  const logoBoxSize = 28;
  const brandName = 'JS CodeLab';
  const brandFontSize = 18;
  const brandTextWidth = helveticaBold.widthOfTextAtSize(brandName, brandFontSize);

  const academyBadgeText = 'ACADEMY';
  const academyFontSize = 7;
  const academyTextWidth = helveticaBold.widthOfTextAtSize(academyBadgeText, academyFontSize);
  const academyBadgeWidth = academyTextWidth + 12;
  const academyBadgeHeight = 14;

  const subText = 'OFFICIAL CREDENTIAL OF ACHIEVEMENT';
  const subFontSize = 7.5;
  const subTextWidth = helvetica.widthOfTextAtSize(subText, subFontSize);

  const brandRowGap = 10;
  const badgeGap = 8;
  const brandRowWidth = logoBoxSize + brandRowGap + brandTextWidth + badgeGap + academyBadgeWidth;
  const headerTotalWidth = Math.max(brandRowWidth, logoBoxSize + brandRowGap + subTextWidth);

  const headerStartX = (pageWidth - headerTotalWidth) / 2;
  const iconBoxX = headerStartX;
  const iconBoxY = pageHeight - 78;

  // 1. TerminalSquare Icon Box (Website Brand Icon)
  page.drawRectangle({
    x: iconBoxX,
    y: iconBoxY,
    width: logoBoxSize,
    height: logoBoxSize,
    color: rgb(10 / 255, 18 / 255, 38 / 255),
    borderColor: blueAccent,
    borderWidth: 1.5,
  });

  // Terminal Prompt Chevron: >
  page.drawLine({
    start: { x: iconBoxX + 7, y: iconBoxY + 19 },
    end: { x: iconBoxX + 13, y: iconBoxY + 14 },
    thickness: 2,
    color: cyanAccent,
  });
  page.drawLine({
    start: { x: iconBoxX + 13, y: iconBoxY + 14 },
    end: { x: iconBoxX + 7, y: iconBoxY + 9 },
    thickness: 2,
    color: cyanAccent,
  });

  // Terminal Cursor Line: _
  page.drawLine({
    start: { x: iconBoxX + 15, y: iconBoxY + 9 },
    end: { x: iconBoxX + 21, y: iconBoxY + 9 },
    thickness: 2,
    color: cyanAccent,
  });

  // 2. Brand Name Typography: JS CodeLab
  const brandTextX = iconBoxX + logoBoxSize + brandRowGap;
  const brandTextY = iconBoxY + 13;
  page.drawText(brandName, {
    x: brandTextX,
    y: brandTextY,
    size: brandFontSize,
    font: helveticaBold,
    color: white,
  });

  // 3. "ACADEMY" Pill Badge
  const academyBadgeX = brandTextX + brandTextWidth + badgeGap;
  const academyBadgeY = iconBoxY + 13;
  page.drawRectangle({
    x: academyBadgeX,
    y: academyBadgeY,
    width: academyBadgeWidth,
    height: academyBadgeHeight,
    color: rgb(23 / 255, 37 / 255, 84 / 255),
    borderColor: cyanAccent,
    borderWidth: 0.75,
  });
  page.drawText(academyBadgeText, {
    x: academyBadgeX + 6,
    y: academyBadgeY + 4,
    size: academyFontSize,
    font: helveticaBold,
    color: cyanAccent,
  });

  // 4. Subtitle: Official Credential of Achievement
  const subTextY = iconBoxY + 1;
  page.drawText(subText, {
    x: brandTextX,
    y: subTextY,
    size: subFontSize,
    font: helvetica,
    color: slateMuted,
  });

  // Certificate Title
  drawCenteredText('Certificate of Achievement', timesBold, 34, pageHeight - 156, white);
  drawCenteredText('THIS CERTIFICATE IS PROUDLY PRESENTED TO', helveticaBold, 9.5, pageHeight - 182, goldBright);

  // Recipient Name (auto-scaled for long names to avoid clipping)
  let nameFontSize = 38;
  let nameWidth = timesBold.widthOfTextAtSize(displayName, nameFontSize);
  const maxNameWidth = frameWidth - 140;
  if (nameWidth > maxNameWidth) {
    nameFontSize = Math.max(22, (nameFontSize * maxNameWidth) / nameWidth);
    nameWidth = timesBold.widthOfTextAtSize(displayName, nameFontSize);
  }

  const nameY = pageHeight - 232;
  drawCenteredText(displayName, timesBold, nameFontSize, nameY, white);

  // Ornate Nameplate Underline with center diamond stud
  // Increased vertical separation (24pt below baseline) so descenders ('g', 'j', 'y', 'p', 'q') have clean breathing room
  const underlineHalfSpan = Math.min(230, Math.max(130, nameWidth / 2 + 35));
  const underlineY = nameY - 24;
  const diamondHalf = 3.5;

  // Left segment
  page.drawLine({
    start: { x: pageWidth / 2 - underlineHalfSpan, y: underlineY },
    end: { x: pageWidth / 2 - 12, y: underlineY },
    thickness: 1.5,
    color: blueAccent,
  });
  // Center diamond
  page.drawRectangle({
    x: pageWidth / 2 - diamondHalf,
    y: underlineY - diamondHalf,
    width: diamondHalf * 2,
    height: diamondHalf * 2,
    color: goldBright,
  });
  // Right segment
  page.drawLine({
    start: { x: pageWidth / 2 + 12, y: underlineY },
    end: { x: pageWidth / 2 + underlineHalfSpan, y: underlineY },
    thickness: 1.5,
    color: blueAccent,
  });

  // Fulfillment Statement & Certification Title
  drawCenteredText(
    'has successfully demonstrated comprehensive technical proficiency and passed the examination for',
    helvetica,
    11,
    pageHeight - 296,
    slateLight
  );

  drawCenteredText(certificate.certificationTitle, helveticaBold, 22, pageHeight - 330, white);

  // Passing Score Badge
  const scoreText = `Passing Score Achieved: ${certificate.score}%`;
  const badgeWidth = helveticaBold.widthOfTextAtSize(scoreText, 10.5) + 26;
  const badgeHeight = 22;
  const badgeX = (pageWidth - badgeWidth) / 2;
  const badgeY = pageHeight - 370;

  page.drawRectangle({
    x: badgeX,
    y: badgeY,
    width: badgeWidth,
    height: badgeHeight,
    color: rgb(6 / 255, 78 / 255, 59 / 255),
    borderColor: emeraldGreen,
    borderWidth: 1,
  });

  page.drawText(scoreText, {
    x: badgeX + 13,
    y: badgeY + 6,
    size: 10.5,
    font: helveticaBold,
    color: emeraldGreen,
  });

  // ================= 8. FOOTER SECTION =================
  const footerDividerY = 114;
  page.drawLine({
    start: { x: innerMargin + 15, y: footerDividerY },
    end: { x: pageWidth - innerMargin - 15, y: footerDividerY },
    thickness: 0.75,
    color: rgb(30 / 255, 41 / 255, 59 / 255),
  });

  const issueDateFormatted = new Date(certificate.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Left Column: Issue Date, Certificate ID, Checksum
  const leftColX = innerMargin + 20;
  page.drawText(`Issue Date: ${issueDateFormatted}`, {
    x: leftColX,
    y: 88,
    size: 9,
    font: helvetica,
    color: slateLight,
  });

  page.drawText(`Certificate ID: ${certificate.id}`, {
    x: leftColX,
    y: 73,
    size: 9,
    font: helveticaBold,
    color: white,
  });

  page.drawText(`Integrity Checksum: ${certificate.verificationHash.substring(0, 22)}...`, {
    x: leftColX,
    y: 58,
    size: 7.5,
    font: courier,
    color: slateDark,
  });

  // Center Bottom: Prestigious Golden Seal Medallion with Ribbon Tails
  const sealX = pageWidth / 2;
  const sealY = 66;
  const sealRadius = 24;

  // Ribbon tails hanging below the seal
  page.drawLine({
    start: { x: sealX - 8, y: sealY - 14 },
    end: { x: sealX - 16, y: sealY - 34 },
    thickness: 4.5,
    color: rgb(180 / 255, 83 / 255, 9 / 255),
  });
  page.drawLine({
    start: { x: sealX + 8, y: sealY - 14 },
    end: { x: sealX + 16, y: sealY - 34 },
    thickness: 4.5,
    color: rgb(180 / 255, 83 / 255, 9 / 255),
  });

  // Outer gold dashed ring
  page.drawCircle({
    x: sealX,
    y: sealY,
    size: sealRadius + 4,
    borderColor: goldAccent,
    borderWidth: 0.75,
    borderOpacity: 0.8,
  });

  // Middle gold metallic ring
  page.drawCircle({
    x: sealX,
    y: sealY,
    size: sealRadius,
    color: rgb(217 / 255, 119 / 255, 6 / 255),
    borderColor: goldBright,
    borderWidth: 1.5,
  });

  // Inner deep navy disc
  page.drawCircle({
    x: sealX,
    y: sealY,
    size: sealRadius - 3.5,
    color: rgb(7 / 255, 14 / 255, 34 / 255),

    borderColor: goldAccent,
    borderWidth: 1,
  });

  // Innermost accent ring
  page.drawCircle({
    x: sealX,
    y: sealY,
    size: sealRadius - 7,
    borderColor: cyanAccent,
    borderWidth: 0.5,
  });

  // Text inside seal
  const sealTopText = 'OFFICIAL';
  const sealTopWidth = helveticaBold.widthOfTextAtSize(sealTopText, 5);
  page.drawText(sealTopText, {
    x: sealX - sealTopWidth / 2,
    y: sealY + 8,
    size: 5,
    font: helveticaBold,
    color: goldBright,
  });

  const sealCenterText = 'JS';
  const sealCenterWidth = helveticaBold.widthOfTextAtSize(sealCenterText, 12);
  page.drawText(sealCenterText, {
    x: sealX - sealCenterWidth / 2,
    y: sealY - 4,
    size: 12,
    font: helveticaBold,
    color: white,
  });

  const sealBottomText = 'VERIFIED';
  const sealBottomWidth = helveticaBold.widthOfTextAtSize(sealBottomText, 4.5);
  page.drawText(sealBottomText, {
    x: sealX - sealBottomWidth / 2,
    y: sealY - 11,
    size: 4.5,
    font: helveticaBold,
    color: goldBright,
  });

  // Right Column: Authority and Verification Link (Guaranteed Zero Overflow)
  const rightBoundaryX = pageWidth - innerMargin - 20;

  const drawAnchorRightText = (
    text: string,
    font: typeof helvetica,
    size: number,
    y: number,
    color = white
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    const x = rightBoundaryX - textWidth;
    page.drawText(text, { x, y, size, font, color });
  };

  drawAnchorRightText('JS CodeLab Academy', helveticaBold, 11.5, 76, cyanAccent);
  drawAnchorRightText('Credential Verification Authority', helvetica, 9, 61, slateMuted);

  return await pdfDoc.save();

}

/**
 * Triggers client-side download of the certificate as a real PDF document.
 */
export async function downloadCertificatePdf(certificate: Certificate): Promise<void> {
  const pdfBytes = await generateCertificatePdf(certificate);
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const filename = getCertificatePdfFilename(certificate.certificationTitle);

  const downloadUrl = URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.href = downloadUrl;
  tempLink.download = filename;
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);

  // Clean up object URL
  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);
}
