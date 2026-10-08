import { CodeExample } from '../types/example';

export const starterTemplates: CodeExample[] = [
  {
    id: 'blank-javascript',
    title: 'Blank JavaScript',
    description: 'An empty slate to start coding from scratch.',
    category: 'basics', // Reusing category as this is stored separately
    difficulty: 'beginner',
    tags: ['template', 'blank'],
    code: `// Start writing JavaScript here.
`
  },
  {
    id: 'console-playground',
    title: 'Console Playground',
    description: 'A basic template with a simple console.log.',
    category: 'basics',
    difficulty: 'beginner',
    tags: ['template', 'console'],
    code: `console.log("Hello World!");`
  },
  {
    id: 'array-playground',
    title: 'Array Playground',
    description: 'Start experimenting with an array of numbers.',
    category: 'arrays',
    difficulty: 'beginner',
    tags: ['template', 'array'],
    code: `const numbers = [1, 2, 3, 4, 5];

console.log(numbers);`
  },
  {
    id: 'async-playground',
    title: 'Async Playground',
    description: 'A ready-to-use async/await template.',
    category: 'async',
    difficulty: 'intermediate',
    tags: ['template', 'async'],
    code: `async function main() {
  // Write async JavaScript here.
}

main();`
  },
  {
    id: 'algorithm-playground',
    title: 'Algorithm Playground',
    description: 'A template for solving algorithm problems.',
    category: 'algorithms',
    difficulty: 'intermediate',
    tags: ['template', 'algorithm'],
    code: `function solve() {
  // Write your solution here.
}

console.log(solve());`
  }
];
