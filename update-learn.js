const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/features/learn/data.ts');

const topics = [
  {
    id: 'variables',
    title: 'JavaScript Variables (let vs const)',
    description: 'Learn the fundamentals of JavaScript variables, data types, and basic syntax.',
    content: `
JavaScript uses variables to store data. Modern JavaScript provides two main keywords to declare them: \`let\` and \`const\`.

### Variables

- **const**: Use this by default. It signals that the variable's reference won't change.
- **let**: Use this when you know the value will be reassigned later (like in a loop or a counter).
- **var**: An older way of declaring variables with function scope. Avoid using it in modern code to prevent bugs related to hoisting and scoping.

### Data Types

JavaScript has several basic data types:
- **String**: Text, e.g., \`"Hello"\`
- **Number**: Integers and floats, e.g., \`42\`, \`3.14\`
- **Boolean**: Logical values, \`true\` or \`false\`
- **Object**: Collections of related data
- **Array**: Ordered lists of data
    `,
    codeSnippet: `// Example: JavaScript Basics
const welcomeMessage = "Welcome to JS CodeLab!";
let userCount = 0;

userCount += 1;
console.log(welcomeMessage);
console.log("Current users:", userCount);`,
    faq: [
      { question: "What is the difference between let and const?", answer: "Use 'const' for variables that shouldn't be reassigned. Use 'let' for variables whose values will change." },
      { question: "Can a string be changed after it is created?", answer: "No, primitive types like strings are immutable in JavaScript. When you 'modify' a string, you're actually creating a new one." }
    ],
    relatedExamples: ["hello-world", "variables"]
  },
  {
    id: 'functions',
    title: 'JavaScript Functions',
    description: 'Discover how to write reusable blocks of code using JavaScript functions and arrow functions.',
    content: `
Functions are reusable blocks of code that perform a specific task. They take inputs (arguments), process them, and return a result.

### Function Declarations

A standard function is declared with the \`function\` keyword and is "hoisted", meaning you can call it before it's defined in the code.

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

### Arrow Functions

Modern JavaScript introduced Arrow Functions (ES6), which provide a shorter syntax and don't bind their own \`this\` context.

\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`
    `,
    codeSnippet: `// Example: Functions & Arrow Functions
function calculateArea(width, height) {
  return width * height;
}

const getPerimeter = (width, height) => 2 * (width + height);

console.log("Area:", calculateArea(5, 10));
console.log("Perimeter:", getPerimeter(5, 10));`,
    faq: [
      { question: "Do arrow functions have their own 'this' context?", answer: "No, arrow functions inherit 'this' from their enclosing scope. This makes them great for callbacks but bad for object methods." },
      { question: "Can I return an object implicitly from an arrow function?", answer: "Yes, but you must wrap the object in parentheses: const makeObj = () => ({ id: 1 });" }
    ],
    relatedExamples: ["basic-function", "arrow-function"]
  },
  {
    id: 'arrays',
    title: 'JavaScript Arrays',
    description: 'Master JavaScript arrays and essential array methods like map, filter, and reduce.',
    content: `
Arrays are ordered collections of data that can hold multiple values, including strings, numbers, and even objects.

### Accessing Elements

You can access array elements using their index (starting at 0).

\`\`\`javascript
const fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
\`\`\`

### Powerful Array Methods

JavaScript provides built-in methods to transform arrays without manually looping:
- **map()**: Transforms each element.
- **filter()**: Keeps elements that pass a test.
- **reduce()**: Accumulates a single value.
    `,
    codeSnippet: `const numbers = [1, 2, 3, 4, 5];

// Multiply all by 2
const doubled = numbers.map(n => n * 2);

// Filter even numbers
const evens = numbers.filter(n => n % 2 === 0);

console.log("Doubled:", doubled);
console.log("Evens:", evens);`,
    faq: [
      { question: "Can arrays hold different data types at once?", answer: "Yes, JavaScript arrays can mix strings, numbers, objects, and other arrays." }
    ],
    relatedExamples: ["array-map", "array-filter"]
  },
  {
    id: 'promises',
    title: 'JavaScript Promises and Async/Await',
    description: 'Understand asynchronous JavaScript using Promises and the modern async/await syntax.',
    content: `
Asynchronous programming allows your code to wait for operations (like network requests) without freezing the entire browser.

### Promises

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.

### Async/Await

Introduced in ES2017, \`async\` and \`await\` make working with Promises look like synchronous code, making it much easier to read and maintain.

\`\`\`javascript
async function fetchUser() {
  try {
    const data = await fetch('/api/user');
    const user = await data.json();
    return user;
  } catch (error) {
    console.error(error);
  }
}
\`\`\`
    `,
    codeSnippet: `// Example: Async/Await
async function mockFetchData() {
  console.log("Fetching...");
  
  const response = await new Promise(resolve => 
    setTimeout(() => resolve({ status: "Success", data: [1,2,3] }), 1000)
  );
  
  console.log("Received:", response);
}

mockFetchData();`,
    faq: [
      { question: "What happens if I forget to use await?", answer: "You will get a Promise object back instead of the resolved value." },
      { question: "Can I use await in a normal function?", answer: "No, await can only be used inside functions marked with the async keyword." }
    ],
    relatedExamples: ["promise-basic", "async-await"]
  },
  {
    id: 'closures',
    title: 'Understanding Closures',
    description: 'Learn how closures work in JavaScript and why they are essential for data privacy and callbacks.',
    content: `
A closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

### Why use closures?

Closures are commonly used for:
1. **Data privacy**: Hiding variables from the global scope.
2. **State retention**: Remembering values between function calls.
3. **Currying and partial application**: Functional programming patterns.

When an inner function is returned, it remembers the variables declared in its outer scope, even after the outer function has finished executing.
    `,
    codeSnippet: `function createCounter() {
  let count = 0; // Private variable
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`,
    faq: [
      { question: "Are closures bad for memory?", answer: "They can be if misused, as the remembered variables cannot be garbage collected as long as the closure exists." }
    ],
    relatedExamples: ["basic-function"]
  },
  {
    id: 'map-vs-foreach',
    title: 'Map vs forEach',
    description: 'Understand the key differences between array.map() and array.forEach() and when to use each.',
    content: `
Both \`map()\` and \`forEach()\` iterate over an array, but they serve entirely different purposes.

### forEach()

Use \`forEach\` when you want to execute a side effect (like logging or modifying the DOM) for every item in an array. It returns \`undefined\`.

### map()

Use \`map\` when you want to transform an array and **return a completely new array** containing the transformed items. It does not mutate the original array.
    `,
    codeSnippet: `const numbers = [1, 2, 3];

// map returns a new array
const doubled = numbers.map(n => n * 2);

// forEach performs an action but returns undefined
numbers.forEach(n => {
  console.log("Processing:", n);
});

console.log("Original:", numbers);
console.log("Mapped:", doubled);`,
    faq: [
      { question: "Can I break out of a map or forEach loop?", answer: "No, you cannot use 'break' or 'continue' inside them. Use a standard 'for' loop or 'some() / every()' if you need to break early." }
    ],
    relatedExamples: ["array-map", "array-filter"]
  },
  {
    id: 'destructuring',
    title: 'Object and Array Destructuring',
    description: 'Learn how to easily extract properties from objects and elements from arrays using destructuring.',
    content: `
Destructuring is a clean, readable syntax that allows you to extract pieces of an array or object and assign them to distinct variables.

### Object Destructuring

You use curly braces \`{}\` matching the property names of the object.

\`\`\`javascript
const user = { id: 1, name: "Alex" };
const { name } = user;
\`\`\`

### Array Destructuring

You use square brackets \`[]\` matching the position of the elements.

\`\`\`javascript
const coords = [10, 20];
const [x, y] = coords;
\`\`\`
    `,
    codeSnippet: `const config = {
  theme: "dark",
  version: "1.2.0",
  features: ["login", "dashboard"]
};

// Extracting properties and renaming one
const { theme, version: ver } = config;

console.log("Theme is:", theme);
console.log("Version is:", ver);`,
    faq: [
      { question: "Can I provide default values?", answer: "Yes, you can use equals: const { theme = 'light' } = config;" }
    ],
    relatedExamples: ["object-destructuring"]
  },
  {
    id: 'spread-rest',
    title: 'Spread and Rest Operators',
    description: 'Master the three dots (...) in JavaScript: the spread syntax and the rest parameter.',
    content: `
The \`...\` operator behaves differently depending on where it is used.

### Spread Syntax

Spread expands an iterable (like an array or object) into individual elements. It's fantastic for merging arrays, copying objects, or passing arguments to a function.

### Rest Parameters

Rest does the exact opposite. It collects multiple individual arguments into a single array variable. It is always used in function parameter definitions.
    `,
    codeSnippet: `// 1. Spread (expanding)
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];
console.log("Spread array:", arr2);

const baseObj = { a: 1 };
const newObj = { ...baseObj, b: 2 };

// 2. Rest (collecting)
function sumAll(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log("Rest sum:", sumAll(5, 10, 15));`,
    faq: [
      { question: "Is object spread a deep clone?", answer: "No, it is a shallow clone. Nested objects still share the same reference." }
    ],
    relatedExamples: ["object-spread"]
  },
  {
    id: 'template-literals',
    title: 'Template Literals',
    description: 'Use backticks to create multi-line strings and embed expressions seamlessly.',
    content: `
Template literals use backticks (\` \`) instead of single or double quotes. They provide two major superpowers:

1. **String Interpolation**: You can easily inject variables and expressions inside strings using \`\${}\` without messy \`+\` concatenation.
2. **Multi-line Strings**: You can write strings that span multiple lines naturally, without needing \`\\n\`.
    `,
    codeSnippet: `const user = "Alex";
const unreadCount = 3;

// Traditional concatenation
const oldWay = "Hello " + user + ", you have " + unreadCount + " messages.";

// Template literal
const newWay = \`Hello \${user}, you have \${unreadCount} messages.\`;

console.log(newWay);

// Multi-line
const html = \`
  <div>
    <h1>\${user}</h1>
  </div>
\`;`,
    faq: [
      { question: "Can I call functions inside template literals?", answer: "Yes, you can put any valid JavaScript expression inside the \${} block." }
    ],
    relatedExamples: ["template-literals"]
  },
  {
    id: 'scope-and-hoisting',
    title: 'Scope and Hoisting',
    description: 'Understand how JavaScript finds variables and the differences between var, let, and const.',
    content: `
### Scope

Scope determines the accessibility of variables.
- **Global Scope**: Accessible everywhere.
- **Function Scope**: Created by \`var\` or functions.
- **Block Scope**: Created by \`let\` and \`const\` inside any curly braces \`{}\`.

### Hoisting

Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope before code execution. Functions and \`var\` are hoisted, but \`let\` and \`const\` are not initialized (they sit in the Temporal Dead Zone).
    `,
    codeSnippet: `// Hoisting with functions
sayHi(); // Works!
function sayHi() {
  console.log("Hi from hoisted function!");
}

// Block Scope
if (true) {
  var a = 1;
  let b = 2;
}

console.log(a); // 1
// console.log(b); // ReferenceError: b is not defined`,
    faq: [
      { question: "Why avoid var?", answer: "Because var ignores block scope (like if statements or for loops), leading to unpredictable bugs." }
    ],
    relatedExamples: ["variables"]
  },
  {
    id: 'error-handling',
    title: 'Error Handling (Try / Catch)',
    description: 'Learn how to catch exceptions gracefully and prevent your application from crashing.',
    content: `
When JavaScript encounters an error (an exception), the script will typically stop running. To handle these gracefully, we use the \`try...catch\` statement.

- **try**: Wraps the code that might throw an error.
- **catch**: Executes if an error is thrown, providing the error object.
- **finally** (optional): Executes regardless of whether an error occurred.
- **throw**: Allows you to generate your own custom errors.
    `,
    codeSnippet: `function parseJSON(data) {
  try {
    const result = JSON.parse(data);
    console.log("Success:", result);
  } catch (error) {
    console.error("Failed to parse JSON!");
    console.error("Error message:", error.message);
  } finally {
    console.log("Parsing attempt finished.");
  }
}

parseJSON('{"name": "Alex"}'); // Valid
parseJSON('Invalid JSON'); // Throws an error`,
    faq: [
      { question: "When should I throw custom errors?", answer: "Throw errors when an invalid input is passed to your function and it cannot proceed safely." }
    ],
    relatedExamples: ["try-catch", "throw-error"]
  },
  {
    id: 'array-reduce',
    title: 'The Array Reduce Method',
    description: 'Master reduce() to turn arrays into single values, objects, or transformed collections.',
    content: `
The \`reduce()\` method executes a reducer function on each element of the array, passing the return value to the next calculation.

It takes two main arguments:
1. **Callback**: \`(accumulator, currentValue) => { ... }\`
2. **Initial Value**: The starting value for the accumulator.

It is heavily used to sum numbers, tally frequencies, or group data by category.
    `,
    codeSnippet: `const cart = [
  { item: 'Apple', price: 1.5 },
  { item: 'Banana', price: 2.0 },
  { item: 'Milk', price: 3.5 }
];

// Summing prices
const total = cart.reduce((acc, currentItem) => {
  return acc + currentItem.price;
}, 0); // 0 is the initial value

console.log("Total price: $", total);`,
    faq: [
      { question: "What happens if I omit the initial value?", answer: "Reduce will use the first element of the array as the initial value and skip the first iteration. This can cause bugs if the array is empty or if you are returning an object." }
    ],
    relatedExamples: ["array-reduce"]
  },
  {
    id: 'this-keyword',
    title: 'The "this" Keyword',
    description: 'Demystify the this keyword in JavaScript and understand context binding.',
    content: `
The \`this\` keyword refers to the object that is currently executing the function. Its value depends entirely on **how** the function is called, not where it is defined.

- **Global context**: Refers to the window (or global in Node.js).
- **Object method**: Refers to the object the method is attached to.
- **Arrow functions**: They don't have their own \`this\`; they inherit it from the surrounding scope.
- **Classes**: Refers to the newly created instance.
    `,
    codeSnippet: `const user = {
  name: "Alex",
  
  // Normal method: 'this' works
  greet() {
    console.log("Hello, I am " + this.name);
  },
  
  // Arrow function: 'this' fails (inherits global scope)
  greetArrow: () => {
    console.log("Hello, I am " + this.name); // undefined
  }
};

user.greet();
user.greetArrow();`,
    faq: [
      { question: "How do I explicitly set the 'this' value?", answer: "You can use the .bind(), .call(), or .apply() methods on any function." }
    ],
    relatedExamples: ["arrow-function"]
  },
  {
    id: 'objects',
    title: 'JavaScript Objects',
    description: 'Learn how to create and manipulate objects, the fundamental data structure in JavaScript.',
    content: `
Objects are collections of key-value pairs. They are used to model real-world entities or complex data.

Keys (or properties) are strings, and values can be any data type, including arrays, other objects, or functions (methods).

You can access properties using dot notation (\`object.property\`) or bracket notation (\`object["property"]\`).
    `,
    codeSnippet: `const car = {
  brand: "Toyota",
  year: 2024,
  features: ["GPS", "Bluetooth"],
  start() {
    console.log("Vroom!");
  }
};

console.log(car.brand); // Toyota
console.log(car["year"]); // 2024

car.start(); // Vroom!`,
    faq: [
      { question: "When should I use bracket notation instead of dot notation?", answer: "Use brackets when the property name is dynamic (stored in a variable) or contains spaces/hyphens." }
    ],
    relatedExamples: ["object-basics"]
  }
];

const tsOutput = `export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  codeSnippet?: string;
  faq?: { question: string; answer: string }[];
  relatedExamples?: string[];
}

export const learnTopics: LearnTopic[] = ${JSON.stringify(topics, null, 2)};

export const getLearnTopicById = (id: string): LearnTopic | undefined => {
  return learnTopics.find(topic => topic.id === id);
};
`;

fs.writeFileSync(filePath, tsOutput);
console.log('Learn data updated successfully with 14 topics.');
