export type CertificationDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CertificationTopic {
  title: string;
  description: string;
}

export interface Certification {
  id: 'javascript-fundamentals' | 'react-js';
  title: string;
  shortTitle: string;
  description: string;
  iconName: 'javascript' | 'react';
  difficulty: CertificationDifficulty;
  durationMinutes: number;
  passingScore: number; // percentage (e.g. 80)
  totalQuestions: number;
  syllabus: CertificationTopic[];
}

export interface Question {
  id: string;
  certificationId: 'javascript-fundamentals' | 'react-js';
  topic: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export type AssessmentViolationType = 'tab_switch' | 'focus_loss' | 'prohibited_action';

export interface AssessmentAttempt {
  id: string;
  certificationId: 'javascript-fundamentals' | 'react-js';
  learnerName: string;
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  timestamp: number;
  certificateId?: string;
  terminated?: boolean;
  terminationReason?: string;
}


export interface Certificate {
  id: string; // e.g. "JSCL-JS-A1B2C3D4"
  certificationId: 'javascript-fundamentals' | 'react-js';
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
