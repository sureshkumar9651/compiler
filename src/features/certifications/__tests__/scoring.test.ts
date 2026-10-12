import { describe, it, expect } from 'vitest';
import { calculateScore, generateCertificateId } from '../services/scoringService';
import { Question } from '../types';

describe('Scoring Service', () => {
  const dummyQuestions: Question[] = [
    {
      id: 'q1',
      certificationId: 'javascript-fundamentals',
      topic: 'Scope',
      category: 'languages',
      difficulty: 'Intermediate',
      question: 'Question 1',
      options: [
        { id: 'opt-0', text: 'A' },
        { id: 'opt-1', text: 'B' },
        { id: 'opt-2', text: 'C' },
        { id: 'opt-3', text: 'D' },
      ],
      correctOptionId: 'opt-0',
      explanation: 'Exp 1',
    },
    {
      id: 'q2',
      certificationId: 'javascript-fundamentals',
      topic: 'Closures',
      category: 'languages',
      difficulty: 'Advanced',
      question: 'Question 2',
      options: [
        { id: 'opt-0', text: 'A' },
        { id: 'opt-1', text: 'B' },
        { id: 'opt-2', text: 'C' },
        { id: 'opt-3', text: 'D' },
      ],
      correctOptionId: 'opt-1',
      explanation: 'Exp 2',
    },
    {
      id: 'q3',
      certificationId: 'javascript-fundamentals',
      topic: 'Event Loop',
      category: 'languages',
      difficulty: 'Advanced',
      question: 'Question 3',
      options: [
        { id: 'opt-0', text: 'A' },
        { id: 'opt-1', text: 'B' },
        { id: 'opt-2', text: 'C' },
        { id: 'opt-3', text: 'D' },
      ],
      correctOptionId: 'opt-2',
      explanation: 'Exp 3',
    },
    {
      id: 'q4',
      certificationId: 'javascript-fundamentals',
      topic: 'Promises',
      category: 'languages',
      difficulty: 'Expert',
      question: 'Question 4',
      options: [
        { id: 'opt-0', text: 'A' },
        { id: 'opt-1', text: 'B' },
        { id: 'opt-2', text: 'C' },
        { id: 'opt-3', text: 'D' },
      ],
      correctOptionId: 'opt-3',
      explanation: 'Exp 4',
    },
    {
      id: 'q5',
      certificationId: 'javascript-fundamentals',
      topic: 'Prototypes',
      category: 'languages',
      difficulty: 'Intermediate',
      question: 'Question 5',
      options: [
        { id: 'opt-0', text: 'A' },
        { id: 'opt-1', text: 'B' },
        { id: 'opt-2', text: 'C' },
        { id: 'opt-3', text: 'D' },
      ],
      correctOptionId: 'opt-0',
      explanation: 'Exp 5',
    },
  ];

  it('calculates 100% score and passes when all questions are answered correctly', () => {
    const answers = {
      q1: 0,
      q2: 1,
      q3: 2,
      q4: 3,
      q5: 0,
    };
    const result = calculateScore(dummyQuestions, answers, 80);

    expect(result.totalQuestions).toBe(5);
    expect(result.correctAnswers).toBe(5);
    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('calculates 80% score and passes at exact passing threshold', () => {
    const answers = {
      q1: 0,
      q2: 1,
      q3: 2,
      q4: 3,
      q5: 1, // incorrect (0 is correct)
    };
    const result = calculateScore(dummyQuestions, answers, 80);

    expect(result.totalQuestions).toBe(5);
    expect(result.correctAnswers).toBe(4);
    expect(result.score).toBe(80);
    expect(result.passed).toBe(true);
  });

  it('calculates 60% score and fails when below passing threshold', () => {
    const answers = {
      q1: 0,
      q2: 1,
      q3: 2,
      q4: 0, // incorrect
      q5: 1, // incorrect
    };
    const result = calculateScore(dummyQuestions, answers, 80);

    expect(result.totalQuestions).toBe(5);
    expect(result.correctAnswers).toBe(3);
    expect(result.score).toBe(60);
    expect(result.passed).toBe(false);
  });

  it('treats unanswered questions as incorrect', () => {
    const answers = {
      q1: 0,
    };
    const result = calculateScore(dummyQuestions, answers, 80);

    expect(result.totalQuestions).toBe(5);
    expect(result.correctAnswers).toBe(1);
    expect(result.score).toBe(20);
    expect(result.passed).toBe(false);
  });

  it('returns 0 score for empty questions list', () => {
    const result = calculateScore([], {}, 80);
    expect(result.totalQuestions).toBe(0);
    expect(result.score).toBe(0);
    expect(result.passed).toBe(false);
  });

  it('generates properly formatted certificate IDs across multiple technology tracks', () => {
    const jsId = generateCertificateId('javascript-fundamentals');
    expect(jsId.startsWith('JSCL-JS-')).toBe(true);

    const reactId = generateCertificateId('react-js');
    expect(reactId.startsWith('JSCL-REACT-')).toBe(true);

    const tsId = generateCertificateId('typescript-engineering');
    expect(tsId.startsWith('JSCL-TS-')).toBe(true);

    const pyId = generateCertificateId('python-programming');
    expect(pyId.startsWith('JSCL-PY-')).toBe(true);

    const dockerId = generateCertificateId('docker-containers');
    expect(dockerId.startsWith('JSCL-DCKR-')).toBe(true);

    const sysId = generateCertificateId('system-design');
    expect(sysId.startsWith('JSCL-SYS-')).toBe(true);

    const sqlId = generateCertificateId('sql-databases');
    expect(sqlId.startsWith('JSCL-SQL-')).toBe(true);
  });

  it('accurately scores questions using stable option IDs', () => {
    const stableQuestions: Question[] = [
      {
        id: 'sq1',
        certificationId: 'typescript-engineering',
        topic: 'Generics',
        category: 'languages',
        difficulty: 'Advanced',
        question: 'Sample Q1',
        options: [
          { id: 'opt-a', text: 'Option A' },
          { id: 'opt-b', text: 'Option B' },
          { id: 'opt-c', text: 'Option C' },
          { id: 'opt-d', text: 'Option D' },
        ],
        correctOptionId: 'opt-c',
        explanation: 'Exp',
      },
      {
        id: 'sq2',
        certificationId: 'typescript-engineering',
        topic: 'Conditional Types',
        category: 'languages',
        difficulty: 'Expert',
        question: 'Sample Q2',
        options: [
          { id: 'opt-1', text: 'Option 1' },
          { id: 'opt-2', text: 'Option 2' },
          { id: 'opt-3', text: 'Option 3' },
          { id: 'opt-4', text: 'Option 4' },
        ],
        correctOptionId: 'opt-1',
        explanation: 'Exp',
      },
    ];

    // Perfect answers
    const answers100 = {
      sq1: 'opt-c',
      sq2: 'opt-1',
    };
    const res100 = calculateScore(stableQuestions, answers100, 80);
    expect(res100.score).toBe(100);
    expect(res100.passed).toBe(true);

    // Half answers (50% < 80%)
    const answers50 = {
      sq1: 'opt-c',
      sq2: 'opt-2', // wrong
    };
    const res50 = calculateScore(stableQuestions, answers50, 80);
    expect(res50.score).toBe(50);
    expect(res50.passed).toBe(false);
  });
});
