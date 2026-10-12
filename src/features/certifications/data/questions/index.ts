import { Question } from '../../types';
import { LANGUAGE_QUESTIONS } from './languages';
import { FRONTEND_QUESTIONS } from './frontend';
import { BACKEND_QUESTIONS } from './backend';
import { DATABASE_QUESTIONS } from './databases';
import { DEVOPS_QUESTIONS } from './devops';
import { TESTING_QUESTIONS } from './testing';
import { ARCHITECTURE_QUESTIONS } from './architecture';

export {
  LANGUAGE_QUESTIONS,
  FRONTEND_QUESTIONS,
  BACKEND_QUESTIONS,
  DATABASE_QUESTIONS,
  DEVOPS_QUESTIONS,
  TESTING_QUESTIONS,
  ARCHITECTURE_QUESTIONS,
};

/**
 * Master collection of all active certification assessment questions.
 * Aggregated cleanly across domain-specific question banks.
 */
export const ASSESSMENT_QUESTIONS: Question[] = [
  ...LANGUAGE_QUESTIONS,
  ...FRONTEND_QUESTIONS,
  ...BACKEND_QUESTIONS,
  ...DATABASE_QUESTIONS,
  ...DEVOPS_QUESTIONS,
  ...TESTING_QUESTIONS,
  ...ARCHITECTURE_QUESTIONS,
];
