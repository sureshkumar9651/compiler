import { Certificate, VerificationResult } from '../types';
import { generateVerificationHash } from './scoringService';

/**
 * Validates a certificate's cryptographic hash against its contents.
 */
export async function verifyCertificateIntegrity(
  certificate: Certificate
): Promise<boolean> {
  if (!certificate || !certificate.verificationHash) return false;

  const expectedHash = await generateVerificationHash({
    id: certificate.id,
    certificationId: certificate.certificationId,
    learnerName: certificate.learnerName,
    score: certificate.score,
    issuedAt: certificate.issuedAt,
  });

  return expectedHash === certificate.verificationHash;
}

/**
 * Validates a certificate and returns structured verification result.
 */
export async function evaluateCertificate(
  certificate: Certificate | null | undefined
): Promise<VerificationResult> {
  if (!certificate) {
    return {
      status: 'not_found',
      message: 'No certificate matching this ID was found in your browser records.',
    };
  }

  const isTamperFree = await verifyCertificateIntegrity(certificate);
  if (!isTamperFree) {
    return {
      status: 'tampered',
      certificate,
      message: 'Warning: This certificate failed the cryptographic integrity check. The certificate data may have been altered.',
    };
  }

  return {
    status: 'valid',
    certificate,
    message: 'Certificate successfully verified! Record matches local browser storage and cryptographic signature.',
  };
}
