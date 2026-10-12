export type CertificationCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'devops'
  | 'testing'
  | 'other';

export type CertificationDifficulty = 'Intermediate' | 'Advanced' | 'Expert';

export interface CertificationTopic {
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  shortTitle: string;
  category: CertificationCategory;
  categoryLabel: string;
  description: string;
  iconName: string;
  difficulty: CertificationDifficulty;
  durationMinutes: number;
  passingScore: number; // percentage (e.g. 80)
  totalQuestions: number; // questions presented in one assessment
  skillsAssessed: string[];
  syllabus: CertificationTopic[];
  status: 'available' | 'coming_soon';
}

export interface QuestionOption {
  id: string; // Stable ID e.g. "opt-1", "opt-2"
  text: string;
}

export interface Question {
  id: string;
  certificationId: string;
  topic: string;
  category: CertificationCategory;
  difficulty: CertificationDifficulty;
  question: string;
  codeSnippet?: string;
  options: QuestionOption[];
  correctOptionId: string; // Points to stable QuestionOption.id
  explanation: string;
  referenceUrl?: string;
}

/**
 * Question structure presented during an assessment with options shuffled.
 * Options are independently shuffled per attempt.
 */
export interface ShuffledQuestion extends Question {
  shuffledOptions: QuestionOption[];
}

export type AssessmentViolationType = 'tab_switch' | 'focus_loss' | 'prohibited_action';

export interface AssessmentAttempt {
  id: string;
  certificationId: string;
  learnerName: string;
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  answers: Record<string, string>; // questionId -> selectedOptionId (stable ID)
  questionIds?: string[]; // IDs of questions selected for this attempt
  timestamp: number;
  certificateId?: string;
  terminated?: boolean;
  terminationReason?: string;
}

export interface Certificate {
  id: string; // e.g. "JSCL-JS-A1B2C3D4"
  certificationId: string;
  certificationTitle: string;
  learnerName: string;
  score: number;
  issuedAt: number;
  verificationHash: string;
  status: 'valid' | 'revoked';
}

export interface VerificationResult {
  status: 'valid' | 'not_found' | 'tampered';
  certificate?: Certificate;
  message: string;
}
