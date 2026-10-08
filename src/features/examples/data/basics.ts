import { CodeExample } from '../types/example';

export const basicsExamples: CodeExample[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'The classic first program. Print a message to the console.',
    category: 'basics',
    difficulty: 'beginner',
    tags: ['console', 'printing', 'basics'],
    code: `console.log("Hello World!");`
  },
  {
    id: 'variables',
    title: 'Variables',
    description: 'Learn how to declare variables using const and let.',
    category: 'basics',
    difficulty: 'beginner',
    tags: ['variables', 'const', 'let'],
    code: `const name = "Suresh";
const age = 30;

console.log(name);
console.log(age);`
  },
  {
    id: 'template-literals',
    title: 'Template Literals',
    description: 'Embed expressions inside string literals.',
    category: 'basics',
    difficulty: 'beginner',
    tags: ['strings', 'interpolation'],
    code: `const name = "Suresh";
const message = \`Hello, \${name}!\`;

console.log(message);`
  },
  {
    id: 'conditional-statements',
    title: 'Conditional Statements',
    description: 'Execute different code paths based on conditions using if/else.',
    category: 'basics',
    difficulty: 'beginner',
    tags: ['if', 'else', 'logic'],
    code: `const age = 20;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}`
  }
];
