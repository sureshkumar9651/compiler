import { describe, it, expect } from 'vitest';
import { CERTIFICATIONS, ASSESSMENT_QUESTIONS } from '../data/certificationsData';
import { validateQuestionBank, validateCertifications } from '../services/questionBankValidation';

describe('Question Bank Architecture & Validation', () => {
  it('validates all active assessment questions against the Zod schema without errors', () => {
    const validation = validateQuestionBank(ASSESSMENT_QUESTIONS);
    expect(validation.errors).toEqual([]);
    expect(validation.valid).toBe(true);
    expect(validation.totalQuestions).toBeGreaterThanOrEqual(70);
  });

  it('validates all certification catalog entries against the Zod schema', () => {
    const validation = validateCertifications(CERTIFICATIONS);
    expect(validation.errors).toEqual([]);
    expect(validation.valid).toBe(true);
    expect(validation.totalCertifications).toBe(CERTIFICATIONS.length);
  });

  it('ensures every question has exactly 4 distinct options and a valid correctOptionId', () => {
    ASSESSMENT_QUESTIONS.forEach((q) => {
      expect(q.options).toHaveLength(4);

      const optionIds = q.options.map((o) => o.id);
      const uniqueOptionIds = new Set(optionIds);
      expect(uniqueOptionIds.size).toBe(4);

      const optionTexts = q.options.map((o) => o.text.trim());
      const uniqueOptionTexts = new Set(optionTexts);
      expect(uniqueOptionTexts.size).toBe(4);

      // correctOptionId must exist in the 4 options
      expect(optionIds).toContain(q.correctOptionId);
    });
  });

  it('ensures no duplicate question IDs exist across the question bank', () => {
    const allIds = ASSESSMENT_QUESTIONS.map((q) => q.id);
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });

  it('enforces difficulty enum constraints (Intermediate, Advanced, Expert)', () => {
    const validDifficulties = new Set(['Intermediate', 'Advanced', 'Expert']);
    ASSESSMENT_QUESTIONS.forEach((q) => {
      expect(validDifficulties.has(q.difficulty)).toBe(true);
    });
  });

  it('ensures all available certification tracks have at least 10 verified questions', () => {
    const availableTracks = CERTIFICATIONS.filter((c) => c.status === 'available');
    expect(availableTracks.length).toBeGreaterThanOrEqual(10);

    availableTracks.forEach((cert) => {
      const trackQuestions = ASSESSMENT_QUESTIONS.filter((q) => q.certificationId === cert.id);
      expect(trackQuestions.length).toBeGreaterThanOrEqual(10);

      // Verify that difficulty levels are present
      const intermediateCount = trackQuestions.filter((q) => q.difficulty === 'Intermediate').length;
      const advancedCount = trackQuestions.filter((q) => q.difficulty === 'Advanced').length;
      const expertCount = trackQuestions.filter((q) => q.difficulty === 'Expert').length;

      expect(intermediateCount).toBeGreaterThanOrEqual(2);
      expect(advancedCount).toBeGreaterThanOrEqual(5);
      expect(expertCount).toBeGreaterThanOrEqual(3);
    });
  });

  it('verifies explanation is present and substantive for every question', () => {
    ASSESSMENT_QUESTIONS.forEach((q) => {
      expect(q.explanation).toBeTruthy();
      expect(q.explanation.trim().length).toBeGreaterThanOrEqual(20);
    });
  });
});
