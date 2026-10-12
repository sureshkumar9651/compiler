import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { IndexedDBCertificateRepository } from '../persistence/IndexedDBCertificateRepository';
import { Certificate, AssessmentAttempt } from '../types';

describe('IndexedDBCertificateRepository', () => {
  let repository: IndexedDBCertificateRepository;

  beforeEach(() => {
    repository = new IndexedDBCertificateRepository();
  });

  it('saves and retrieves a certificate by ID', async () => {
    const cert: Certificate = {
      id: 'JSCL-JS-TEST-1',
      certificationId: 'javascript-fundamentals',
      certificationTitle: 'JavaScript Fundamentals Certification',
      learnerName: 'Alice Johnson',
      score: 90,
      issuedAt: 1700000000000,
      verificationHash: 'dummyhash1',
      status: 'valid',
    };

    await repository.saveCertificate(cert);
    const retrieved = await repository.getCertificate(cert.id);

    expect(retrieved).not.toBeNull();
    expect(retrieved?.id).toBe(cert.id);
    expect(retrieved?.learnerName).toBe('Alice Johnson');
    expect(retrieved?.score).toBe(90);
  });

  it('lists certificates and filters by certificationId', async () => {
    const cert1: Certificate = {
      id: 'JSCL-JS-TEST-2',
      certificationId: 'javascript-fundamentals',
      certificationTitle: 'JavaScript Fundamentals Certification',
      learnerName: 'Bob',
      score: 85,
      issuedAt: 1700000001000,
      verificationHash: 'dummyhash2',
      status: 'valid',
    };

    const cert2: Certificate = {
      id: 'JSCL-REACT-TEST-1',
      certificationId: 'react-js',
      certificationTitle: 'React JS Certification',
      learnerName: 'Bob',
      score: 95,
      issuedAt: 1700000002000,
      verificationHash: 'dummyhash3',
      status: 'valid',
    };

    await repository.saveCertificate(cert1);
    await repository.saveCertificate(cert2);

    const allCerts = await repository.getCertificates();
    expect(allCerts.length).toBeGreaterThanOrEqual(2);

    const reactCerts = await repository.getCertificatesByCertificationId('react-js');
    expect(reactCerts.some((c) => c.id === cert2.id)).toBe(true);
    expect(reactCerts.every((c) => c.certificationId === 'react-js')).toBe(true);
  });

  it('deletes a certificate', async () => {
    const cert: Certificate = {
      id: 'JSCL-TO-DELETE',
      certificationId: 'javascript-fundamentals',
      certificationTitle: 'JS',
      learnerName: 'Charlie',
      score: 80,
      issuedAt: 1700000003000,
      verificationHash: 'dummyhash4',
      status: 'valid',
    };

    await repository.saveCertificate(cert);
    let found = await repository.getCertificate(cert.id);
    expect(found).not.toBeNull();

    await repository.deleteCertificate(cert.id);
    found = await repository.getCertificate(cert.id);
    expect(found).toBeNull();
  });

  it('saves and lists assessment attempts', async () => {
    const attempt: AssessmentAttempt = {
      id: 'attempt-1',
      certificationId: 'javascript-fundamentals',
      learnerName: 'Dave',
      score: 70,
      passed: false,
      totalQuestions: 10,
      correctAnswers: 7,
      answers: { q1: 'opt-1' },
      timestamp: Date.now(),
    };

    await repository.saveAttempt(attempt);
    const attempts = await repository.getAttempts('javascript-fundamentals');

    expect(attempts.some((a) => a.id === attempt.id)).toBe(true);
  });
});
