import { describe, it, expect } from 'vitest';
import {
  prepareAssessmentQuestions,
  calculateAssessmentScore,
  shuffleArray,
  createSeededRandom,
} from '../services/assessmentEngine';
import { Question, QuestionOption } from '../types';

describe('Assessment Engine & Randomization', () => {
  // Generate a mock pool with mixed difficulties
  const mockPool: Question[] = [];
  
  // 5 Intermediate
  for (let i = 1; i <= 5; i++) {
    mockPool.push({
      id: `q-int-${i}`,
      certificationId: 'test-track',
      topic: 'Topic I',
      category: 'languages',
      difficulty: 'Intermediate',
      question: `Intermediate Question ${i}`,
      options: [
        { id: `opt-${i}-1`, text: 'Answer 1' },
        { id: `opt-${i}-2`, text: 'Answer 2' },
        { id: `opt-${i}-3`, text: 'Answer 3' },
        { id: `opt-${i}-4`, text: 'Answer 4' },
      ],
      correctOptionId: `opt-${i}-2`,
      explanation: 'Explanation',
    });
  }

  // 10 Advanced
  for (let i = 1; i <= 10; i++) {
    mockPool.push({
      id: `q-adv-${i}`,
      certificationId: 'test-track',
      topic: 'Topic A',
      category: 'languages',
      difficulty: 'Advanced',
      question: `Advanced Question ${i}`,
      options: [
        { id: `opt-adv-${i}-1`, text: 'Answer 1' },
        { id: `opt-adv-${i}-2`, text: 'Answer 2' },
        { id: `opt-adv-${i}-3`, text: 'Answer 3' },
        { id: `opt-adv-${i}-4`, text: 'Answer 4' },
      ],
      correctOptionId: `opt-adv-${i}-3`,
      explanation: 'Explanation',
    });
  }

  // 6 Expert
  for (let i = 1; i <= 6; i++) {
    mockPool.push({
      id: `q-exp-${i}`,
      certificationId: 'test-track',
      topic: 'Topic E',
      category: 'languages',
      difficulty: 'Expert',
      question: `Expert Question ${i}`,
      options: [
        { id: `opt-exp-${i}-1`, text: 'Answer 1' },
        { id: `opt-exp-${i}-2`, text: 'Answer 2' },
        { id: `opt-exp-${i}-3`, text: 'Answer 3' },
        { id: `opt-exp-${i}-4`, text: 'Answer 4' },
      ],
      correctOptionId: `opt-exp-${i}-1`,
      explanation: 'Explanation',
    });
  }

  it('selects exactly 10 questions without any duplicates', () => {
    const prepared = prepareAssessmentQuestions(mockPool, { totalQuestions: 10 });
    expect(prepared).toHaveLength(10);

    const ids = prepared.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(10);
  });

  it('samples questions according to the difficulty distribution (20% Intermediate, 50% Advanced, 30% Expert)', () => {
    const prepared = prepareAssessmentQuestions(mockPool, { totalQuestions: 10, seed: 42 });
    expect(prepared).toHaveLength(10);

    const intermediateCount = prepared.filter((q) => q.difficulty === 'Intermediate').length;
    const advancedCount = prepared.filter((q) => q.difficulty === 'Advanced').length;
    const expertCount = prepared.filter((q) => q.difficulty === 'Expert').length;

    expect(intermediateCount).toBe(2); // 20%
    expect(advancedCount).toBe(5);     // 50%
    expect(expertCount).toBe(3);       // 30%
  });

  it('independently shuffles answer options for each question while preserving stable IDs', () => {
    const prepared = prepareAssessmentQuestions(mockPool, { totalQuestions: 10 });

    prepared.forEach((q) => {
      expect(q.shuffledOptions).toHaveLength(4);
      expect(q.options).toHaveLength(4);

      // Verify all 4 original option IDs are present in the shuffled options
      const originalIds = new Set(
        mockPool.find((orig) => orig.id === q.id)!.options.map((o) => o.id)
      );
      q.shuffledOptions.forEach((opt) => {
        expect(originalIds.has(opt.id)).toBe(true);
      });

      // Verify correctOptionId remains unchanged and points to a valid option
      const hasCorrectOpt = q.shuffledOptions.some((opt) => opt.id === q.correctOptionId);
      expect(hasCorrectOpt).toBe(true);
    });
  });

  it('distributes the correct answer across different slots rather than always option A', () => {
    const correctIndices: number[] = [];

    // Run 50 random preparations
    for (let run = 0; run < 50; run++) {
      const prepared = prepareAssessmentQuestions(mockPool, { totalQuestions: 10 });
      prepared.forEach((q) => {
        const idx = q.shuffledOptions.findIndex((o) => o.id === q.correctOptionId);
        correctIndices.push(idx);
      });
    }

    // Over 500 questions, correct answer should appear across all 4 positions (0, 1, 2, 3)
    const pos0 = correctIndices.filter((i) => i === 0).length;
    const pos1 = correctIndices.filter((i) => i === 1).length;
    const pos2 = correctIndices.filter((i) => i === 2).length;
    const pos3 = correctIndices.filter((i) => i === 3).length;

    expect(pos0).toBeGreaterThan(50);
    expect(pos1).toBeGreaterThan(50);
    expect(pos2).toBeGreaterThan(50);
    expect(pos3).toBeGreaterThan(50);
  });

  it('provides reproducible question and option selection with a deterministic seed', () => {
    const run1 = prepareAssessmentQuestions(mockPool, { totalQuestions: 10, seed: 12345 });
    const run2 = prepareAssessmentQuestions(mockPool, { totalQuestions: 10, seed: 12345 });

    expect(run1.map((q) => q.id)).toEqual(run2.map((q) => q.id));
    for (let i = 0; i < 10; i++) {
      expect(run1[i].shuffledOptions.map((o) => o.id)).toEqual(
        run2[i].shuffledOptions.map((o) => o.id)
      );
    }
  });

  it('grades accurately using stable option IDs regardless of shuffling position', () => {
    const prepared = prepareAssessmentQuestions(mockPool, { totalQuestions: 10 });

    // Submit correct option IDs for all questions
    const perfectAnswers: Record<string, string> = {};
    prepared.forEach((q) => {
      perfectAnswers[q.id] = q.correctOptionId;
    });

    const perfectResult = calculateAssessmentScore(prepared, perfectAnswers, 80);
    expect(perfectResult.score).toBe(100);
    expect(perfectResult.correctAnswers).toBe(10);
    expect(perfectResult.passed).toBe(true);

    // Submit 8 correct and 2 incorrect answers
    const answers80: Record<string, string> = { ...perfectAnswers };
    const firstTwo = prepared.slice(0, 2);
    firstTwo.forEach((q) => {
      // Pick any incorrect option
      const wrongOpt = q.options.find((o) => o.id !== q.correctOptionId)!;
      answers80[q.id] = wrongOpt.id;
    });

    const result80 = calculateAssessmentScore(prepared, answers80, 80);
    expect(result80.score).toBe(80);
    expect(result80.correctAnswers).toBe(8);
    expect(result80.passed).toBe(true);

    // Fail case: 7 correct, 3 incorrect (70% score < 80% passing)
    const third = prepared[2];
    const wrongOpt3 = third.options.find((o) => o.id !== third.correctOptionId)!;
    const answers70 = { ...answers80, [third.id]: wrongOpt3.id };

    const result70 = calculateAssessmentScore(prepared, answers70, 80);
    expect(result70.score).toBe(70);
    expect(result70.correctAnswers).toBe(7);
    expect(result70.passed).toBe(false);
  });
});
