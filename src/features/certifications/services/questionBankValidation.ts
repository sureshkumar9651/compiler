import { z } from 'zod';
import { Question, Certification } from '../types';

export const QuestionOptionSchema = z.object({
  id: z.string().min(1, 'Option ID cannot be empty'),
  text: z.string().min(1, 'Option text cannot be empty'),
});

export const QuestionSchema = z
  .object({
    id: z.string().min(1, 'Question ID cannot be empty'),
    certificationId: z.string().min(1, 'Certification ID cannot be empty'),
    topic: z.string().min(1, 'Topic cannot be empty'),
    category: z.enum([
      'languages',
      'frontend',
      'backend',
      'databases',
      'devops',
      'testing',
      'other',
    ]),
    difficulty: z.enum(['Intermediate', 'Advanced', 'Expert']),
    question: z.string().min(10, 'Question text must be at least 10 characters'),
    codeSnippet: z.string().optional(),
    options: z.array(QuestionOptionSchema).length(4, 'Question must have exactly 4 options'),
    correctOptionId: z.string().min(1, 'Correct option ID must be specified'),
    explanation: z.string().min(10, 'Explanation must be at least 10 characters'),
    referenceUrl: z.string().url().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    // 1. Verify correctOptionId strictly exists in options
    const optionIds = new Set(data.options.map((o) => o.id));
    if (!optionIds.has(data.correctOptionId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `correctOptionId "${data.correctOptionId}" does not match any option ID in question "${data.id}"`,
        path: ['correctOptionId'],
      });
    }

    // 2. Verify all option IDs are distinct
    if (optionIds.size !== 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate option IDs found in question "${data.id}"`,
        path: ['options'],
      });
    }

    // 3. Verify all option texts are distinct
    const optionTexts = new Set(data.options.map((o) => o.text.trim().toLowerCase()));
    if (optionTexts.size !== 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Duplicate option text values found in question "${data.id}"`,
        path: ['options'],
      });
    }
  });

export const CertificationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  category: z.enum([
    'languages',
    'frontend',
    'backend',
    'databases',
    'devops',
    'testing',
    'other',
  ]),
  categoryLabel: z.string().min(1),
  description: z.string().min(10),
  iconName: z.string().min(1),
  difficulty: z.enum(['Intermediate', 'Advanced', 'Expert']),
  durationMinutes: z.number().int().min(5).max(120),
  passingScore: z.number().int().min(50).max(100),
  totalQuestions: z.number().int().min(5).max(50),
  skillsAssessed: z.array(z.string()).min(1),
  syllabus: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    })
  ).min(1),
  status: z.enum(['available', 'coming_soon']),
});

export interface QuestionBankValidationResult {
  valid: boolean;
  totalQuestions: number;
  errors: string[];
}

/**
 * Validates an entire array of questions for integrity, uniqueness, and correctness.
 */
export function validateQuestionBank(questions: Question[]): QuestionBankValidationResult {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  questions.forEach((q, index) => {
    // Check ID uniqueness
    if (seenIds.has(q.id)) {
      errors.push(`Duplicate question ID detected: "${q.id}" at index ${index}`);
    } else {
      seenIds.add(q.id);
    }

    // Zod schema parsing
    const result = QuestionSchema.safeParse(q);
    if (!result.success) {
      result.error.issues.forEach((err) => {
        errors.push(`[Question ${q.id || index}]: ${err.message} (path: ${err.path.join('.')})`);
      });
    }
  });

  return {
    valid: errors.length === 0,
    totalQuestions: questions.length,
    errors,
  };
}
