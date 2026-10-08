import { CodeExample } from '../types/example';

export const objectsExamples: CodeExample[] = [
  {
    id: 'object-basics',
    title: 'Object Basics',
    description: 'Create and use a basic JavaScript object.',
    category: 'objects',
    difficulty: 'beginner',
    tags: ['object', 'properties', 'basics'],
    code: `const user = {
  name: "Suresh",
  age: 30,
  role: "Frontend Engineer"
};

console.log(user);`
  },
  {
    id: 'object-destructuring',
    title: 'Destructuring',
    description: 'Extract properties from an object into variables.',
    category: 'objects',
    difficulty: 'beginner',
    tags: ['object', 'destructuring', 'es6'],
    code: `const user = {
  name: "Suresh",
  age: 30
};

const { name, age } = user;

console.log(name);
console.log(age);`
  },
  {
    id: 'object-spread',
    title: 'Spread Operator',
    description: 'Clone and merge objects using the spread syntax.',
    category: 'objects',
    difficulty: 'beginner',
    tags: ['object', 'spread', 'es6'],
    code: `const user = {
  name: "Suresh",
  age: 30
};

const updatedUser = {
  ...user,
  age: 31
};

console.log(updatedUser);`
  }
];
