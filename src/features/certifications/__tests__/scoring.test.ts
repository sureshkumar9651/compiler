import { describe, it, expect } from 'vitest';
import { calculateScore, generateCertificateId } from '../services/scoringService';
import { Question } from '../types';

describe('Scoring Service', () => {
  const dummyQuestions: Question[] = [
    {
      id: 'q1',
      certificationId: 'javascript-fundamentals',
      topic: 'Scope',
      question: 'Question 1',
      options: ['A', 'B', 'C', 'D'],
      correctAnswerIndex: 0,
      explanation: 'Exp 1',
    },
    {
      id: 'q2',
      certificationId: 'javascript-fundamentals',
      topic: 'Closures',
      question: 'Question 2',
      options: ['A', 'B', 'C', 'D'],
      correctAnswerIndex: 1,
      explanation: 'Exp 2',
    },
    {
      id: 'q3',
      certificationId: 'javascript-fundamentals',
      topic: 'Event Loop',
      question: 'Question 3',
      options: ['A', 'B', 'C', 'D'],
      correctAnswerIndex: 2,
      explanation: 'Exp 3',
    },
    {
      id: 'q4',
      certificationId: 'javascript-fundamentals',
      topic: 'Promises',
      question: 'Question 4',
      options: ['A', 'B', 'C', 'D'],
      correctAnswerIndex: 3,
      explanation: 'Exp 4',
    },
    {
      id: 'q5',
      certificationId: 'javascript-fundamentals',
      topic: 'Prototypes',
      question: 'Question 5',
      options: ['A', 'B', 'C', 'D'],
      correctAnswerIndex: 0,
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

  it('generates properly formatted certificate IDs', () => {
    const jsId = generateCertificateId('javascript-fundamentals');
    expect(jsId.startsWith('JSCL-JS-')).toBe(true);

    const reactId = generateCertificateId('react-js');
    expect(reactId.startsWith('JSCL-REACT-')).toBe(true);
  });
});
