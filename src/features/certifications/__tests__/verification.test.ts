import { describe, it, expect } from 'vitest';
import { generateVerificationHash } from '../services/scoringService';
import { verifyCertificateIntegrity, evaluateCertificate } from '../services/verificationService';
import { Certificate } from '../types';

describe('Verification Service', () => {
  it('generates consistent cryptographic verification hashes', async () => {
    const payload = {
      id: 'JSCL-JS-TEST-1234',
      certificationId: 'javascript-fundamentals',
      learnerName: 'Alex Morgan',
      score: 90,
      issuedAt: 1700000000000,
    };

    const hash1 = await generateVerificationHash(payload);
    const hash2 = await generateVerificationHash(payload);

    expect(hash1).toBeDefined();
    expect(hash1.length).toBeGreaterThan(10);
    expect(hash1).toBe(hash2);
  });

  it('validates a legitimate, untampered certificate as valid', async () => {
    const issuedAt = Date.now();
    const hash = await generateVerificationHash({
      id: 'JSCL-JS-ABCD-1234',
      certificationId: 'javascript-fundamentals',
      learnerName: 'Taylor Swift',
      score: 95,
      issuedAt,
    });

    const cert: Certificate = {
      id: 'JSCL-JS-ABCD-1234',
      certificationId: 'javascript-fundamentals',
      certificationTitle: 'JavaScript Fundamentals Certification',
      learnerName: 'Taylor Swift',
      score: 95,
      issuedAt,
      verificationHash: hash,
      status: 'valid',
    };

    const isAuthentic = await verifyCertificateIntegrity(cert);
    expect(isAuthentic).toBe(true);

    const evalResult = await evaluateCertificate(cert);
    expect(evalResult.status).toBe('valid');
    expect(evalResult.certificate?.id).toBe(cert.id);
  });

  it('detects tampering when learner name is modified', async () => {
    const issuedAt = Date.now();
    const hash = await generateVerificationHash({
      id: 'JSCL-JS-ABCD-1234',
      certificationId: 'javascript-fundamentals',
      learnerName: 'Original Name',
      score: 90,
      issuedAt,
    });

    const tamperedCert: Certificate = {
      id: 'JSCL-JS-ABCD-1234',
      certificationId: 'javascript-fundamentals',
      certificationTitle: 'JavaScript Fundamentals Certification',
      learnerName: 'Altered Imposter', // altered!
      score: 90,
      issuedAt,
      verificationHash: hash,
      status: 'valid',
    };

    const isAuthentic = await verifyCertificateIntegrity(tamperedCert);
    expect(isAuthentic).toBe(false);

    const evalResult = await evaluateCertificate(tamperedCert);
    expect(evalResult.status).toBe('tampered');
  });

  it('detects tampering when score is modified', async () => {
    const issuedAt = Date.now();
    const hash = await generateVerificationHash({
      id: 'JSCL-REACT-EFGH-5678',
      certificationId: 'react-js',
      learnerName: 'Sam Developer',
      score: 80,
      issuedAt,
    });

    const tamperedCert: Certificate = {
      id: 'JSCL-REACT-EFGH-5678',
      certificationId: 'react-js',
      certificationTitle: 'React JS Certification',
      learnerName: 'Sam Developer',
      score: 100, // altered from 80 to 100!
      issuedAt,
      verificationHash: hash,
      status: 'valid',
    };

    const isAuthentic = await verifyCertificateIntegrity(tamperedCert);
    expect(isAuthentic).toBe(false);
  });

  it('returns not_found when certificate object is null or undefined', async () => {
    const evalResult = await evaluateCertificate(null);
    expect(evalResult.status).toBe('not_found');
    expect(evalResult.certificate).toBeUndefined();
  });
});
