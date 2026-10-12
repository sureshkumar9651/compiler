import { Question, ShuffledQuestion } from '../types';

export interface QuestionScoreResult {
  questionId: string;
  selectedOptionId: string | undefined;
  correctOptionId: string;
  isCorrect: boolean;
}

export interface ScoreCalculationResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  passed: boolean;
  questionResults: QuestionScoreResult[];
}

/**
 * Calculates assessment score from stable question IDs and stable option IDs.
 * Supports string option IDs ('opt-1') and legacy index numbers for full backward compatibility.
 */
export function calculateScore(
  questions: (Question | ShuffledQuestion)[],
  answers: Record<string, string | number>,
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
  const questionResults: QuestionScoreResult[] = questions.map((q) => {
    const selected = answers[q.id];
    let isCorrect = false;

    const legacyCorrectIdx = (q as unknown as { correctAnswerIndex?: number }).correctAnswerIndex;
    if (typeof selected === 'string') {
      isCorrect = selected === q.correctOptionId;
    } else if (typeof selected === 'number') {
      if (typeof legacyCorrectIdx === 'number') {
        isCorrect = selected === legacyCorrectIdx;
      } else if (Array.isArray(q.options)) {
        const correctIdx = q.options.findIndex(
          (o) => typeof o === 'object' && o !== null && (o as { id?: string }).id === q.correctOptionId
        );
        isCorrect = selected === correctIdx;
      }
    }

    if (isCorrect) {
      correctCount += 1;
    }

    return {
      questionId: q.id,
      selectedOptionId: typeof selected === 'string' ? selected : undefined,
      correctOptionId: q.correctOptionId,
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

const TRACK_PREFIXES: Record<string, string> = {
  'javascript': 'JSCL-JS',
  'javascript-fundamentals': 'JSCL-JS',
  'typescript': 'JSCL-TS',
  'typescript-engineering': 'JSCL-TS',
  'python': 'JSCL-PY',
  'python-programming': 'JSCL-PY',
  'java': 'JSCL-JAVA',
  'java-programming': 'JSCL-JAVA',
  'csharp': 'JSCL-CS',
  'csharp-programming': 'JSCL-CS',
  'cpp': 'JSCL-CPP',
  'cpp-programming': 'JSCL-CPP',
  'go': 'JSCL-GO',
  'go-programming': 'JSCL-GO',
  'php': 'JSCL-PHP',
  'php-programming': 'JSCL-PHP',
  'sql': 'JSCL-SQL',
  'sql-databases': 'JSCL-SQL',
  'react': 'JSCL-REACT',
  'react-js': 'JSCL-REACT',
  'next-js': 'JSCL-NEXT',
  'html5': 'JSCL-HTML',
  'css3': 'JSCL-CSS',
  'tailwind-css': 'JSCL-TW',
  'accessibility': 'JSCL-A11Y',
  'web-performance': 'JSCL-PERF',
  'node-js': 'JSCL-NODE',
  'express-js': 'JSCL-EXPR',
  'rest-apis': 'JSCL-REST',
  'graphql': 'JSCL-GQL',
  'auth': 'JSCL-AUTH',
  'api-security': 'JSCL-SEC',
  'mongodb': 'JSCL-MDB',
  'postgresql': 'JSCL-PG',
  'mysql': 'JSCL-MYSQL',
  'redis': 'JSCL-REDIS',
  'database-design': 'JSCL-DBD',
  'git-github': 'JSCL-GIT',
  'docker': 'JSCL-DCKR',
  'docker-containers': 'JSCL-DCKR',
  'kubernetes': 'JSCL-K8S',
  'cicd': 'JSCL-CICD',
  'linux': 'JSCL-LNX',
  'aws': 'JSCL-AWS',
  'azure': 'JSCL-AZR',
  'gcp': 'JSCL-GCP',
  'jest': 'JSCL-JEST',
  'vitest': 'JSCL-VIT',
  'testing-library': 'JSCL-RTL',
  'playwright': 'JSCL-PW',
  'cypress': 'JSCL-CYP',
  'unit-testing': 'JSCL-UNIT',
  'e2e-testing': 'JSCL-E2E',
  'dsa': 'JSCL-DSA',
  'oop': 'JSCL-OOP',
  'system-design': 'JSCL-SYS',
  'cybersecurity': 'JSCL-CYBER',
  'machine-learning': 'JSCL-ML',
  'generative-ai': 'JSCL-GENAI',
};

/**
 * Generates a clean, unique certificate ID with technology track prefix.
 * e.g. JSCL-JS-A1B2-C3D4, JSCL-TS-X7Y8-Z9W0, JSCL-REACT-K1R8-ZFCD
 */
export function generateCertificateId(certificationId: string): string {
  const prefix = TRACK_PREFIXES[certificationId] || `JSCL-${certificationId.replace(/[^a-zA-Z0-9]/g, '').substring(0, 5).toUpperCase()}`;
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

  // Fallback hash for non-crypto environments
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}
