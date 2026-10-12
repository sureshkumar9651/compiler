import { Question } from '../types';

export interface ScoreCalculationResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  passed: boolean;
  questionResults: {
    questionId: string;
    selectedOptionIndex: number | undefined;
    correctOptionIndex: number;
    isCorrect: boolean;
  }[];
}

/**
 * Calculates assessment score accurately.
 * Rounds percentage to nearest integer.
 */
export function calculateScore(
  questions: Question[],
  answers: Record<string, number>,
  passingScore = 80
): ScoreCalculationResult {
  if (questions.length === 0) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      score: 0,
      passed: false,
      questionResults: [],
    };
  }

  let correctCount = 0;
  const questionResults = questions.map((q) => {
    const selected = answers[q.id];
    const isCorrect = selected !== undefined && selected === q.correctAnswerIndex;
    if (isCorrect) {
      correctCount += 1;
    }
    return {
      questionId: q.id,
      selectedOptionIndex: selected,
      correctOptionIndex: q.correctAnswerIndex,
      isCorrect,
    };
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= passingScore;

  return {
    totalQuestions: questions.length,
    correctAnswers: correctCount,
    score: percentage,
    passed,
    questionResults,
  };
}

/**
 * Generates a clean, unique certificate ID with prefix.
 * e.g. JSCL-JS-A1B2C3D4 or JSCL-REACT-E5F6G7H8
 */
export function generateCertificateId(
  certificationId: 'javascript-fundamentals' | 'react-js'
): string {
  const prefix = certificationId === 'javascript-fundamentals' ? 'JSCL-JS' : 'JSCL-REACT';
  const randomSegment = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timeSegment = Date.now().toString(36).substring(3, 7).toUpperCase();
  return `${prefix}-${randomSegment}-${timeSegment}`;
}

/**
 * Generates an SHA-256 cryptographic verification digest from certificate fields.
 */
export async function generateVerificationHash(payload: {
  id: string;
  certificationId: string;
  learnerName: string;
  score: number;
  issuedAt: number;
}): Promise<string> {
  const dataString = `${payload.id}|${payload.certificationId}|${payload.learnerName.trim().toLowerCase()}|${payload.score}|${payload.issuedAt}|JSCL_SALT_2026`;
  
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
  }

  // Simple fallback hash for non-crypto environments
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}
