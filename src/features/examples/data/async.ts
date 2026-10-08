import { CodeExample } from '../types/example';

export const asyncExamples: CodeExample[] = [
  {
    id: 'promise-basic',
    title: 'Promise Basics',
    description: 'Create and resolve a simple Promise.',
    category: 'async',
    difficulty: 'beginner',
    tags: ['promise', 'async', 'then'],
    code: `const promise = Promise.resolve("Success");

promise.then(result => {
  console.log(result);
});`
  },
  {
    id: 'async-await',
    title: 'Async / Await',
    description: 'Use modern async/await syntax to handle Promises.',
    category: 'async',
    difficulty: 'intermediate',
    tags: ['async', 'await', 'promise'],
    code: `async function main() {
  const result = await Promise.resolve("Hello async!");

  console.log(result);
}

main();`
  },
  {
    id: 'set-timeout',
    title: 'setTimeout',
    description: 'Delay execution using setTimeout.',
    category: 'async',
    difficulty: 'beginner',
    tags: ['timeout', 'timer', 'delay'],
    code: `console.log("Start");

setTimeout(() => {
  console.log("Delayed output");
}, 1000);

console.log("End");`
  }
];
