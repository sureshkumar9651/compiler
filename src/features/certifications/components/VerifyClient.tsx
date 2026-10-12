'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { CertificateVerification } from '@/features/certifications/components/CertificateVerification';

export function VerifyClient() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get('id') || '';

  return <CertificateVerification initialCertificateId={idFromQuery} />;
}
