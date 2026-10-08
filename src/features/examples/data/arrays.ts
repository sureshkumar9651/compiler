import { CodeExample } from '../types/example';

export const arraysExamples: CodeExample[] = [
  {
    id: 'array-map',
    title: 'Array map()',
    description: 'Transform every item in an array using map().',
    category: 'arrays',
    difficulty: 'beginner',
    tags: ['array', 'map', 'functional'],
    code: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(number => number * 2);

console.log(doubled);`
  },
  {
    id: 'array-filter',
    title: 'Array filter()',
    description: 'Create a new array with elements that pass a test.',
    category: 'arrays',
    difficulty: 'beginner',
    tags: ['array', 'filter', 'functional'],
    code: `const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(number => number % 2 === 0);

console.log(evenNumbers);`
  },
  {
    id: 'array-reduce',
    title: 'Array reduce()',
    description: 'Reduce an array to a single value.',
    category: 'arrays',
    difficulty: 'intermediate',
    tags: ['array', 'reduce', 'functional'],
    code: `const numbers = [10, 20, 30];

const total = numbers.reduce((sum, number) => sum + number, 0);

console.log(total);`
  },
  {
    id: 'array-find',
    title: 'Array find()',
    description: 'Find the first element in an array that satisfies a testing function.',
    category: 'arrays',
    difficulty: 'beginner',
    tags: ['array', 'find', 'search'],
    code: `const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Suresh" },
  { id: 3, name: "Alex" }
];

const user = users.find(user => user.id === 2);

console.log(user);`
  }
];
