import { Question, ShuffledQuestion, QuestionOption } from '../types';

/**
 * Simple, fast Mulberry32 PRNG for reproducible randomization (e.g. for deterministic debugging & testing).
 */
export function createSeededRandom(seed: number): () => number {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates array in-place shuffle using a provided random function.
 */
export function shuffleArray<T>(array: T[], randomFn: () => number = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface PrepareAssessmentOptions {
  totalQuestions?: number;
  seed?: number;
}

/**
 * Stratified difficulty sampling & option shuffling:
 * Target distribution:
 * - 20% Intermediate
 * - 50% Advanced
 * - 30% Expert
 *
 * Each question's answer options are independently shuffled.
 * Correctness is preserved by stable QuestionOption.id, ensuring the correct answer
 * never predictably appears at option A or any fixed slot.
 */
export function prepareAssessmentQuestions(
  pool: Question[],
  options: PrepareAssessmentOptions = {}
): ShuffledQuestion[] {
  const totalCount = options.totalQuestions ?? 10;
  const randomFn = options.seed !== undefined ? createSeededRandom(options.seed) : Math.random;

  if (pool.length <= totalCount) {
    // If pool is equal or smaller, shuffle entire pool
    return shuffleArray(pool, randomFn).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options, randomFn),
    }));
  }

  // 1. Group pool by difficulty
  const intermediatePool = shuffleArray(
    pool.filter((q) => q.difficulty === 'Intermediate'),
    randomFn
  );
  const advancedPool = shuffleArray(
    pool.filter((q) => q.difficulty === 'Advanced'),
    randomFn
  );
  const expertPool = shuffleArray(
    pool.filter((q) => q.difficulty === 'Expert'),
    randomFn
  );

  // Target quotas: 20% intermediate, 50% advanced, 30% expert
  const targetIntermediate = Math.round(totalCount * 0.2);
  const targetExpert = Math.round(totalCount * 0.3);
  const targetAdvanced = totalCount - targetIntermediate - targetExpert;

  const selected: Question[] = [];

  // Pick intermediate
  const pickedIntermediate = intermediatePool.slice(0, targetIntermediate);
  selected.push(...pickedIntermediate);

  // Pick advanced
  const pickedAdvanced = advancedPool.slice(0, targetAdvanced);
  selected.push(...pickedAdvanced);

  // Pick expert
  const pickedExpert = expertPool.slice(0, targetExpert);
  selected.push(...pickedExpert);

  // If any difficulty bucket lacked sufficient questions, backfill from remaining unused
  if (selected.length < totalCount) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const remainingUnused = shuffleArray(
      pool.filter((q) => !selectedIds.has(q.id)),
      randomFn
    );
    const deficit = totalCount - selected.length;
    selected.push(...remainingUnused.slice(0, deficit));
  }

  // 2. Final shuffle of selected questions so difficulties appear interleaved
  const shuffledQuestions = shuffleArray(selected, randomFn);

  // 3. Independently shuffle the 4 options for each question
  return shuffledQuestions.map((q) => ({
    ...q,
    shuffledOptions: shuffleArray(q.options, randomFn),
  }));
}

export interface QuestionResult {
  questionId: string;
  selectedOptionId: string | undefined;
  correctOptionId: string;
  isCorrect: boolean;
}

export interface AssessmentScoreResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage (0 - 100)
  passed: boolean;
  questionResults: QuestionResult[];
}

/**
 * Calculates assessment score from stable question IDs and stable option IDs.
 * Immune to option shuffling order or array index tampering.
 */
export function calculateAssessmentScore(
  questions: (Question | ShuffledQuestion)[],
  answers: Record<string, string>, // questionId -> selectedOptionId
  passingScore = 80
): AssessmentScoreResult {
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
  const questionResults: QuestionResult[] = questions.map((q) => {
    const selectedId = answers[q.id];
    const isCorrect = selectedId !== undefined && selectedId === q.correctOptionId;
    if (isCorrect) {
      correctCount += 1;
    }
    return {
      questionId: q.id,
      selectedOptionId: selectedId,
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
