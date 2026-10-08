import { CodeExample } from '../types/example';

export const functionsExamples: CodeExample[] = [
  {
    id: 'basic-function',
    title: 'Basic Function',
    description: 'Declare and invoke a basic function with parameters.',
    category: 'functions',
    difficulty: 'beginner',
    tags: ['function', 'parameters', 'return'],
    code: `function add(a, b) {
  return a + b;
}

console.log(add(10, 20));`
  },
  {
    id: 'arrow-function',
    title: 'Arrow Function',
    description: 'Use the concise arrow function syntax.',
    category: 'functions',
    difficulty: 'beginner',
    tags: ['arrow', 'es6', 'function'],
    code: `const multiply = (a, b) => a * b;

console.log(multiply(5, 4));`
  },
  {
    id: 'default-parameters',
    title: 'Default Parameters',
    description: 'Provide default values for function parameters.',
    category: 'functions',
    difficulty: 'beginner',
    tags: ['default', 'parameters', 'es6'],
    code: `function greet(name = "World") {
  return \`Hello, \${name}!\`;
}

console.log(greet());
console.log(greet("Suresh"));`
  }
];
