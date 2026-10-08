export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const learnTopics: LearnTopic[] = [
  {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript, including variables, data types, and basic syntax.',
    content: `
JavaScript is the programming language of the web. It allows you to implement complex features on web pages.

### Variables

In modern JavaScript, you should use \`let\` and \`const\` to declare variables.

- **const**: Use for values that should never change.
- **let**: Use for values that will change over time.

\`\`\`javascript
const siteName = "JS CodeLab";
let userCount = 0;

userCount += 1;
console.log(siteName, "has", userCount, "users");
\`\`\`

### Data Types

JavaScript has several basic data types:
- **String**: Text, e.g., \`"Hello"\`
- **Number**: Integers and floats, e.g., \`42\`, \`3.14\`
- **Boolean**: Logical values, \`true\` or \`false\`
- **Object**: Collections of related data
- **Array**: Ordered lists of data
    `
  },
  {
    id: 'javascript-functions',
    title: 'JavaScript Functions',
    description: 'Discover how to write reusable blocks of code using JavaScript functions and arrow functions.',
    content: `
Functions are one of the fundamental building blocks in JavaScript. A function is a JavaScript procedure—a set of statements that performs a task or calculates a value.

### Function Declarations

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));
\`\`\`

### Arrow Functions

Modern JavaScript introduced Arrow Functions (ES6), which provide a shorter syntax.

\`\`\`javascript
const add = (a, b) => a + b;

console.log(add(5, 10)); // 15
\`\`\`

Arrow functions do not bind their own \`this\`, making them especially useful for callbacks.
    `
  },
  {
    id: 'javascript-arrays',
    title: 'JavaScript Arrays',
    description: 'Master JavaScript arrays and essential array methods like map, filter, and reduce.',
    content: `
Arrays are special variables that can hold more than one value at a time.

\`\`\`javascript
const fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
\`\`\`

### Powerful Array Methods

JavaScript provides built-in methods to iterate and transform arrays without using standard \`for\` loops.

- **map()**: Creates a new array by performing a function on each array element.
- **filter()**: Creates a new array with elements that pass a test.
- **reduce()**: Runs a function on each array element to produce a single value.

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Multiply all by 2
const doubled = numbers.map(n => n * 2);

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);

console.log(doubled, evens);
\`\`\`
    `
  },
  {
    id: 'javascript-async-await',
    title: 'JavaScript Async/Await',
    description: 'Understand asynchronous JavaScript using Promises and the modern async/await syntax.',
    content: `
Asynchronous programming allows your code to run in the background without blocking the execution of other code.

### Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

### Async/Await

Introduced in ES2017, \`async\` and \`await\` make working with Promises much easier to read and write.

\`\`\`javascript
async function fetchUser() {
  try {
    console.log("Fetching user...");
    // Simulating a network request
    const response = await new Promise(resolve => 
      setTimeout(() => resolve({ name: "Alice" }), 1000)
    );
    console.log("User data:", response);
  } catch (error) {
    console.error("Failed to fetch", error);
  }
}

fetchUser();
\`\`\`

This pattern is heavily used when interacting with APIs using \`fetch()\`.
    `
  }
];

export const getLearnTopicById = (id: string): LearnTopic | undefined => {
  return learnTopics.find(topic => topic.id === id);
};
