import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CertificationCard } from '../components/CertificationCard';
import { AssessmentResult } from '../components/AssessmentResult';
import { CERTIFICATIONS } from '../data/certificationsData';
import { Certificate, AssessmentAttempt, Question } from '../types';

describe('Catalog & Result UI Components', () => {
  const dummyCert = CERTIFICATIONS.find((c) => c.id === 'javascript-fundamentals')!;

  const dummyQuestions: Question[] = [
    {
      id: 'js-q1',
      certificationId: 'javascript-fundamentals',
      topic: 'Event Loop',
      category: 'languages',
      difficulty: 'Advanced',
      question: 'Which queue has higher priority than macrotasks in the browser event loop?',
      options: [
        { id: 'opt-1', text: 'Microtask queue' },
        { id: 'opt-2', text: 'Animation frame queue' },
        { id: 'opt-3', text: 'Timer queue' },
        { id: 'opt-4', text: 'I/O queue' },
      ],
      correctOptionId: 'opt-1',
      explanation: 'Microtasks are processed immediately following the current task execution.',
    },
  ];

  const dummyCertificate: Certificate = {
    id: 'JSCL-JS-A1B2-C3D4',
    certificationId: dummyCert.id,
    certificationTitle: dummyCert.title,
    learnerName: 'Alex Mercer',
    score: 90,
    issuedAt: 1770000000000,
    verificationHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    status: 'valid',
  };

  const dummyPassedAttempt: AssessmentAttempt = {
    id: 'attempt-101',
    certificationId: dummyCert.id,
    learnerName: 'Alex Mercer',
    score: 90,
    passed: true,
    totalQuestions: 10,
    correctAnswers: 9,
    answers: { 'js-q1': 'opt-1' },
    timestamp: 1770000000000,
    certificateId: dummyCertificate.id,
  };

  it('renders certification card with category, difficulty, duration, question count, and skills tags', () => {
    const html = renderToStaticMarkup(
      <CertificationCard
        certification={dummyCert}
        onStartAssessment={() => {}}
      />
    );

    expect(html).toContain('Programming Languages');
    expect(html).toContain('Advanced');
    expect(html).toContain('JavaScript Engineering');
    expect(html).toContain('30 mins');
    expect(html).toContain('80%');
    expect(html).toContain('10 MCQs');
    expect(html).toContain('Start Assessment');
    expect(html).toContain('Event Loop &amp; Microtasks');
  });

  it('renders coming soon status on tracks in development and disables start button', () => {
    const comingSoonCert = CERTIFICATIONS.find((c) => c.status === 'coming_soon')!;
    const html = renderToStaticMarkup(
      <CertificationCard
        certification={comingSoonCert}
        onStartAssessment={() => {}}
      />
    );

    expect(html).toContain('Coming Soon');
    expect(html).toContain('Question Bank in Verification');
    expect(html).toContain('disabled');
  });

  it('renders AssessmentResult with primary PDF download action and NO HTML certificate preview', () => {
    const html = renderToStaticMarkup(
      <AssessmentResult
        attempt={dummyPassedAttempt}
        certificate={dummyCertificate}
        certification={dummyCert}
        questions={dummyQuestions}
        onRetake={() => {}}
        onBackToOverview={() => {}}
      />
    );

    // Verify pass status and score display
    expect(html).toContain('Assessment Passed');
    expect(html).toContain('Congratulations, Alex Mercer!');
    expect(html).toContain('90%');
    expect(html).toContain('Certificate ID');
    expect(html).toContain('JSCL-JS-A1B2-C3D4');

    // Verify PDF download primary button is rendered
    expect(html).toContain('Download Certificate (PDF)');

    // Verify verification actions
    expect(html).toContain('Verify Credential');
    expect(html).toContain('Copy Verify Link');

    // Verify absence of HTML preview components or wrappers
    expect(html).not.toContain('preview-container');
    expect(html).not.toContain('View Certificate');
    expect(html).not.toContain('&lt;CertificateDocument');
  });
});
