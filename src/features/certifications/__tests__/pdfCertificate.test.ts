import { describe, it, expect } from 'vitest';
import {
  generateCertificatePdf,
  getCertificatePdfFilename,
} from '../services/pdfCertificateService';
import { validateAndSanitizeLearnerName } from '../services/nameValidation';
import { Certificate } from '../types';
import { PDFDocument } from 'pdf-lib';

describe('PDF Certificate Generation & Integrity', () => {
  const sampleCertificate: Certificate = {
    id: 'JSCL-JS-A1B2C3D4',
    certificationId: 'javascript-fundamentals',
    certificationTitle: 'JavaScript Fundamentals',
    learnerName: 'Alex Morgan',
    score: 95,
    issuedAt: Date.now(),
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'valid',
  };

  describe('1. Name sanitization & placeholder rejection', () => {
    it('accepts legitimate full names and trims whitespace', () => {
      const validNames = [
        'Alex Morgan',
        '   Sarah Connor   ',
        'David K. Johnson, Jr.',
        'Marie Curie',
      ];


      validNames.forEach((n) => {
        const result = validateAndSanitizeLearnerName(n);
        expect(result.valid).toBe(true);
        expect(result.sanitized.length).toBeGreaterThanOrEqual(2);
      });
    });

    it('rejects empty, blank, or whitespace-only names', () => {
      ['', '   ', '\t\n'].forEach((n) => {
        const result = validateAndSanitizeLearnerName(n);
        expect(result.valid).toBe(false);
        expect(result.error).toBeDefined();
      });
    });

    it('rejects common placeholder or generic names', () => {
      const placeholderNames = [
        'Your Name Here',
        'your name',
        'Placeholder',
        'Anonymous',
        'Unknown',
        'test',
        'test user',
        'User',
        'Admin',
        'null',
        'undefined',
        'N/A',
      ];

      placeholderNames.forEach((p) => {
        const result = validateAndSanitizeLearnerName(p);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Placeholder');
      });
    });

    it('rejects names shorter than 2 chars or longer than 60 chars', () => {
      expect(validateAndSanitizeLearnerName('A').valid).toBe(false);
      expect(validateAndSanitizeLearnerName('A'.repeat(65)).valid).toBe(false);
    });

    it('rejects names without alphabetical characters', () => {
      expect(validateAndSanitizeLearnerName('123456').valid).toBe(false);
      expect(validateAndSanitizeLearnerName('!@#$%^').valid).toBe(false);
    });

    it('strips dangerous HTML tags from name inputs', () => {
      const result = validateAndSanitizeLearnerName('<script>alert(1)</script>Alex');
      expect(result.valid).toBe(true);
      expect(result.sanitized).not.toContain('<script>');
    });
  });

  describe('2. Meaningful filename generation', () => {
    it('generates clean, descriptive PDF filenames', () => {
      expect(getCertificatePdfFilename('JavaScript Fundamentals')).toBe(
        'JS-CodeLab-JavaScript-Fundamentals-Certificate.pdf'
      );
      expect(getCertificatePdfFilename('React JS')).toBe(
        'JS-CodeLab-React-JS-Certificate.pdf'
      );
    });
  });

  describe('3. Real PDF generation and formatting', () => {
    it('produces a valid PDF binary buffer starting with %PDF- header', async () => {
      const pdfBytes = await generateCertificatePdf(sampleCertificate);

      expect(pdfBytes).toBeInstanceOf(Uint8Array);
      expect(pdfBytes.length).toBeGreaterThan(1000);

      // Verify PDF magic bytes (%PDF-)
      const magicBytes = String.fromCharCode(...pdfBytes.slice(0, 5));
      expect(magicBytes).toBe('%PDF-');
    });

    it('creates an A4 Landscape format document with exactly one page', async () => {
      const pdfBytes = await generateCertificatePdf(sampleCertificate);
      const parsedDoc = await PDFDocument.load(pdfBytes);

      const pages = parsedDoc.getPages();
      expect(pages.length).toBe(1);

      const { width, height } = pages[0].getSize();
      // Landscape: width > height
      expect(width).toBeGreaterThan(height);
      // A4 Landscape exact dimensions (841.89 x 595.28 points)
      expect(Math.round(width)).toBe(842);
      expect(Math.round(height)).toBe(595);
    });

    it('handles very long recipient names without errors or clipping', async () => {
      const longNameCert: Certificate = {
        ...sampleCertificate,
        learnerName: 'Dr. Elizabeth Alexandra Montgomery-Wellington III, Ph.D.',
      };

      const pdfBytes = await generateCertificatePdf(longNameCert);
      expect(pdfBytes.length).toBeGreaterThan(1000);

      const parsedDoc = await PDFDocument.load(pdfBytes);
      expect(parsedDoc.getPages().length).toBe(1);
    });

    it('handles different certification titles cleanly', async () => {
      const reactCert: Certificate = {
        ...sampleCertificate,
        id: 'JSCL-REACT-998877',
        certificationId: 'react-js',
        certificationTitle: 'React JS',
      };

      const pdfBytes = await generateCertificatePdf(reactCert);
      const parsedDoc = await PDFDocument.load(pdfBytes);
      expect(parsedDoc.getPages().length).toBe(1);
    });
  });
});
