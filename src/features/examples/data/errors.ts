import { CodeExample } from '../types/example';

export const errorExamples: CodeExample[] = [
  {
    id: 'try-catch',
    title: 'Try/Catch',
    description: 'Catch and handle runtime errors gracefully.',
    category: 'error-handling',
    difficulty: 'beginner',
    tags: ['try', 'catch', 'error'],
    code: `try {
  JSON.parse("invalid json");
} catch (error) {
  console.error("Failed to parse JSON");
  console.error(error);
}`
  },
  {
    id: 'throw-error',
    title: 'Throw Error',
    description: 'Throw a custom error when a condition is met.',
    category: 'error-handling',
    difficulty: 'beginner',
    tags: ['throw', 'error', 'exception'],
    code: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

console.log(divide(10, 2));`
  }
];
