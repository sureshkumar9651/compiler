export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  codeSnippet?: string;
  faq?: { question: string; answer: string }[];
  relatedExamples?: string[];
}

export const learnTopics: LearnTopic[] = [
  {
    id: "variables",
    title: "JavaScript Variables (let vs const)",
    description:
      "Learn the fundamentals of JavaScript variables, data types, and basic syntax.",
    content:
      "\nJavaScript uses variables to store data. Modern JavaScript provides two main keywords to declare them: `let` and `const`.\n\n### Variables\n\n- **const**: Use this by default. It signals that the variable's reference won't change.\n- **let**: Use this when you know the value will be reassigned later (like in a loop or a counter).\n- **var**: An older way of declaring variables with function scope. Avoid using it in modern code to prevent bugs related to hoisting and scoping.\n\n### Data Types\n\nJavaScript has several basic data types:\n- **String**: Text, e.g., `\"Hello\"`\n- **Number**: Integers and floats, e.g., `42`, `3.14`\n- **Boolean**: Logical values, `true` or `false`\n- **Object**: Collections of related data\n- **Array**: Ordered lists of data\n    ",
    codeSnippet:
      '// Example: JavaScript Basics\nconst welcomeMessage = "Welcome to JS CodeLab!";\nlet userCount = 0;\n\nuserCount += 1;\nconsole.log(welcomeMessage);\nconsole.log("Current users:", userCount);',
    faq: [
      {
        question: "What is the difference between let and const?",
        answer:
          "Use 'const' for variables that shouldn't be reassigned. Use 'let' for variables whose values will change.",
      },
      {
        question: "Can a string be changed after it is created?",
        answer:
          "No, primitive types like strings are immutable in JavaScript. When you 'modify' a string, you're actually creating a new one.",
      },
    ],
    relatedExamples: ["hello-world", "variables"],
  },
  {
    id: "functions",
    title: "JavaScript Functions",
    description:
      "Discover how to write reusable blocks of code using JavaScript functions and arrow functions.",
    content:
      '\nFunctions are reusable blocks of code that perform a specific task. They take inputs (arguments), process them, and return a result.\n\n### Function Declarations\n\nA standard function is declared with the `function` keyword and is "hoisted", meaning you can call it before it\'s defined in the code.\n\n```javascript\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n```\n\n### Arrow Functions\n\nModern JavaScript introduced Arrow Functions (ES6), which provide a shorter syntax and don\'t bind their own `this` context.\n\n```javascript\nconst add = (a, b) => a + b;\n```\n    ',
    codeSnippet:
      '// Example: Functions & Arrow Functions\nfunction calculateArea(width, height) {\n  return width * height;\n}\n\nconst getPerimeter = (width, height) => 2 * (width + height);\n\nconsole.log("Area:", calculateArea(5, 10));\nconsole.log("Perimeter:", getPerimeter(5, 10));',
    faq: [
      {
        question: "Do arrow functions have their own 'this' context?",
        answer:
          "No, arrow functions inherit 'this' from their enclosing scope. This makes them great for callbacks but bad for object methods.",
      },
      {
        question: "Can I return an object implicitly from an arrow function?",
        answer:
          "Yes, but you must wrap the object in parentheses: const makeObj = () => ({ id: 1 });",
      },
    ],
    relatedExamples: ["basic-function", "arrow-function"],
  },
  {
    id: "arrays",
    title: "JavaScript Arrays",
    description:
      "Master JavaScript arrays and essential array methods like map, filter, and reduce.",
    content:
      '\nArrays are ordered collections of data that can hold multiple values, including strings, numbers, and even objects.\n\n### Accessing Elements\n\nYou can access array elements using their index (starting at 0).\n\n```javascript\nconst fruits = ["Apple", "Banana", "Cherry"];\nconsole.log(fruits[0]); // Apple\n```\n\n### Powerful Array Methods\n\nJavaScript provides built-in methods to transform arrays without manually looping:\n- **map()**: Transforms each element.\n- **filter()**: Keeps elements that pass a test.\n- **reduce()**: Accumulates a single value.\n    ',
    codeSnippet:
      'const numbers = [1, 2, 3, 4, 5];\n\n// Multiply all by 2\nconst doubled = numbers.map(n => n * 2);\n\n// Filter even numbers\nconst evens = numbers.filter(n => n % 2 === 0);\n\nconsole.log("Doubled:", doubled);\nconsole.log("Evens:", evens);',
    faq: [
      {
        question: "Can arrays hold different data types at once?",
        answer:
          "Yes, JavaScript arrays can mix strings, numbers, objects, and other arrays.",
      },
    ],
    relatedExamples: ["array-map", "array-filter"],
  },
  {
    id: "promises",
    title: "JavaScript Promises and Async/Await",
    description:
      "Understand asynchronous JavaScript using Promises and the modern async/await syntax.",
    content:
      "\nAsynchronous programming allows your code to wait for operations (like network requests) without freezing the entire browser.\n\n### Promises\n\nA Promise is an object representing the eventual completion (or failure) of an asynchronous operation.\n\n### Async/Await\n\nIntroduced in ES2017, `async` and `await` make working with Promises look like synchronous code, making it much easier to read and maintain.\n\n```javascript\nasync function fetchUser() {\n  try {\n    const data = await fetch('/api/user');\n    const user = await data.json();\n    return user;\n  } catch (error) {\n    console.error(error);\n  }\n}\n```\n    ",
    codeSnippet:
      '// Example: Async/Await\nasync function mockFetchData() {\n  console.log("Fetching...");\n  \n  const response = await new Promise(resolve => \n    setTimeout(() => resolve({ status: "Success", data: [1,2,3] }), 1000)\n  );\n  \n  console.log("Received:", response);\n}\n\nmockFetchData();',
    faq: [
      {
        question: "What happens if I forget to use await?",
        answer:
          "You will get a Promise object back instead of the resolved value.",
      },
      {
        question: "Can I use await in a normal function?",
        answer:
          "No, await can only be used inside functions marked with the async keyword.",
      },
    ],
    relatedExamples: ["promise-basic", "async-await"],
  },
  {
    id: "closures",
    title: "Understanding Closures",
    description:
      "Learn how closures work in JavaScript and why they are essential for data privacy and callbacks.",
    content:
      "\nA closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.\n\n### Why use closures?\n\nClosures are commonly used for:\n1. **Data privacy**: Hiding variables from the global scope.\n2. **State retention**: Remembering values between function calls.\n3. **Currying and partial application**: Functional programming patterns.\n\nWhen an inner function is returned, it remembers the variables declared in its outer scope, even after the outer function has finished executing.\n    ",
    codeSnippet:
      "function createCounter() {\n  let count = 0; // Private variable\n  \n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3",
    faq: [
      {
        question: "Are closures bad for memory?",
        answer:
          "They can be if misused, as the remembered variables cannot be garbage collected as long as the closure exists.",
      },
    ],
    relatedExamples: ["basic-function"],
  },
  {
    id: "map-vs-foreach",
    title: "Map vs forEach",
    description:
      "Understand the key differences between array.map() and array.forEach() and when to use each.",
    content:
      "\nBoth `map()` and `forEach()` iterate over an array, but they serve entirely different purposes.\n\n### forEach()\n\nUse `forEach` when you want to execute a side effect (like logging or modifying the DOM) for every item in an array. It returns `undefined`.\n\n### map()\n\nUse `map` when you want to transform an array and **return a completely new array** containing the transformed items. It does not mutate the original array.\n    ",
    codeSnippet:
      'const numbers = [1, 2, 3];\n\n// map returns a new array\nconst doubled = numbers.map(n => n * 2);\n\n// forEach performs an action but returns undefined\nnumbers.forEach(n => {\n  console.log("Processing:", n);\n});\n\nconsole.log("Original:", numbers);\nconsole.log("Mapped:", doubled);',
    faq: [
      {
        question: "Can I break out of a map or forEach loop?",
        answer:
          "No, you cannot use 'break' or 'continue' inside them. Use a standard 'for' loop or 'some() / every()' if you need to break early.",
      },
    ],
    relatedExamples: ["array-map", "array-filter"],
  },
  {
    id: "destructuring",
    title: "Object and Array Destructuring",
    description:
      "Learn how to easily extract properties from objects and elements from arrays using destructuring.",
    content:
      '\nDestructuring is a clean, readable syntax that allows you to extract pieces of an array or object and assign them to distinct variables.\n\n### Object Destructuring\n\nYou use curly braces `{}` matching the property names of the object.\n\n```javascript\nconst user = { id: 1, name: "Alex" };\nconst { name } = user;\n```\n\n### Array Destructuring\n\nYou use square brackets `[]` matching the position of the elements.\n\n```javascript\nconst coords = [10, 20];\nconst [x, y] = coords;\n```\n    ',
    codeSnippet:
      'const config = {\n  theme: "dark",\n  version: "1.2.0",\n  features: ["login", "dashboard"]\n};\n\n// Extracting properties and renaming one\nconst { theme, version: ver } = config;\n\nconsole.log("Theme is:", theme);\nconsole.log("Version is:", ver);',
    faq: [
      {
        question: "Can I provide default values?",
        answer: "Yes, you can use equals: const { theme = 'light' } = config;",
      },
    ],
    relatedExamples: ["object-destructuring"],
  },
  {
    id: "spread-rest",
    title: "Spread and Rest Operators",
    description:
      "Master the three dots (...) in JavaScript: the spread syntax and the rest parameter.",
    content:
      "\nThe `...` operator behaves differently depending on where it is used.\n\n### Spread Syntax\n\nSpread expands an iterable (like an array or object) into individual elements. It's fantastic for merging arrays, copying objects, or passing arguments to a function.\n\n### Rest Parameters\n\nRest does the exact opposite. It collects multiple individual arguments into a single array variable. It is always used in function parameter definitions.\n    ",
    codeSnippet:
      '// 1. Spread (expanding)\nconst arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];\nconsole.log("Spread array:", arr2);\n\nconst baseObj = { a: 1 };\nconst newObj = { ...baseObj, b: 2 };\n\n// 2. Rest (collecting)\nfunction sumAll(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n\nconsole.log("Rest sum:", sumAll(5, 10, 15));',
    faq: [
      {
        question: "Is object spread a deep clone?",
        answer:
          "No, it is a shallow clone. Nested objects still share the same reference.",
      },
    ],
    relatedExamples: ["object-spread"],
  },
  {
    id: "template-literals",
    title: "Template Literals",
    description:
      "Use backticks to create multi-line strings and embed expressions seamlessly.",
    content:
      "\nTemplate literals use backticks (` `) instead of single or double quotes. They provide two major superpowers:\n\n1. **String Interpolation**: You can easily inject variables and expressions inside strings using `${}` without messy `+` concatenation.\n2. **Multi-line Strings**: You can write strings that span multiple lines naturally, without needing `\\n`.\n    ",
    codeSnippet:
      'const user = "Alex";\nconst unreadCount = 3;\n\n// Traditional concatenation\nconst oldWay = "Hello " + user + ", you have " + unreadCount + " messages.";\n\n// Template literal\nconst newWay = `Hello ${user}, you have ${unreadCount} messages.`;\n\nconsole.log(newWay);\n\n// Multi-line\nconst html = `\n  <div>\n    <h1>${user}</h1>\n  </div>\n`;',
    faq: [
      {
        question: "Can I call functions inside template literals?",
        answer:
          "Yes, you can put any valid JavaScript expression inside the ${} block.",
      },
    ],
    relatedExamples: ["template-literals"],
  },
  {
    id: "scope-and-hoisting",
    title: "Scope and Hoisting",
    description:
      "Understand how JavaScript finds variables and the differences between var, let, and const.",
    content:
      "\n### Scope\n\nScope determines the accessibility of variables.\n- **Global Scope**: Accessible everywhere.\n- **Function Scope**: Created by `var` or functions.\n- **Block Scope**: Created by `let` and `const` inside any curly braces `{}`.\n\n### Hoisting\n\nHoisting is JavaScript's default behavior of moving declarations to the top of the current scope before code execution. Functions and `var` are hoisted, but `let` and `const` are not initialized (they sit in the Temporal Dead Zone).\n    ",
    codeSnippet:
      '// Hoisting with functions\nsayHi(); // Works!\nfunction sayHi() {\n  console.log("Hi from hoisted function!");\n}\n\n// Block Scope\nif (true) {\n  var a = 1;\n  let b = 2;\n}\n\nconsole.log(a); // 1\n// console.log(b); // ReferenceError: b is not defined',
    faq: [
      {
        question: "Why avoid var?",
        answer:
          "Because var ignores block scope (like if statements or for loops), leading to unpredictable bugs.",
      },
    ],
    relatedExamples: ["variables"],
  },
  {
    id: "error-handling",
    title: "Error Handling (Try / Catch)",
    description:
      "Learn how to catch exceptions gracefully and prevent your application from crashing.",
    content:
      "\nWhen JavaScript encounters an error (an exception), the script will typically stop running. To handle these gracefully, we use the `try...catch` statement.\n\n- **try**: Wraps the code that might throw an error.\n- **catch**: Executes if an error is thrown, providing the error object.\n- **finally** (optional): Executes regardless of whether an error occurred.\n- **throw**: Allows you to generate your own custom errors.\n    ",
    codeSnippet:
      'function parseJSON(data) {\n  try {\n    const result = JSON.parse(data);\n    console.log("Success:", result);\n  } catch (error) {\n    console.error("Failed to parse JSON!");\n    console.error("Error message:", error.message);\n  } finally {\n    console.log("Parsing attempt finished.");\n  }\n}\n\nparseJSON(\'{"name": "Alex"}\'); // Valid\nparseJSON(\'Invalid JSON\'); // Throws an error',
    faq: [
      {
        question: "When should I throw custom errors?",
        answer:
          "Throw errors when an invalid input is passed to your function and it cannot proceed safely.",
      },
    ],
    relatedExamples: ["try-catch", "throw-error"],
  },
  {
    id: "array-reduce",
    title: "The Array Reduce Method",
    description:
      "Master reduce() to turn arrays into single values, objects, or transformed collections.",
    content:
      "\nThe `reduce()` method executes a reducer function on each element of the array, passing the return value to the next calculation.\n\nIt takes two main arguments:\n1. **Callback**: `(accumulator, currentValue) => { ... }`\n2. **Initial Value**: The starting value for the accumulator.\n\nIt is heavily used to sum numbers, tally frequencies, or group data by category.\n    ",
    codeSnippet:
      "const cart = [\n  { item: 'Apple', price: 1.5 },\n  { item: 'Banana', price: 2.0 },\n  { item: 'Milk', price: 3.5 }\n];\n\n// Summing prices\nconst total = cart.reduce((acc, currentItem) => {\n  return acc + currentItem.price;\n}, 0); // 0 is the initial value\n\nconsole.log(\"Total price: $\", total);",
    faq: [
      {
        question: "What happens if I omit the initial value?",
        answer:
          "Reduce will use the first element of the array as the initial value and skip the first iteration. This can cause bugs if the array is empty or if you are returning an object.",
      },
    ],
    relatedExamples: ["array-reduce"],
  },
  {
    id: "this-keyword",
    title: 'The "this" Keyword',
    description:
      "Demystify the this keyword in JavaScript and understand context binding.",
    content:
      "\nThe `this` keyword refers to the object that is currently executing the function. Its value depends entirely on **how** the function is called, not where it is defined.\n\n- **Global context**: Refers to the window (or global in Node.js).\n- **Object method**: Refers to the object the method is attached to.\n- **Arrow functions**: They don't have their own `this`; they inherit it from the surrounding scope.\n- **Classes**: Refers to the newly created instance.\n    ",
    codeSnippet:
      'const user = {\n  name: "Alex",\n  \n  // Normal method: \'this\' works\n  greet() {\n    console.log("Hello, I am " + this.name);\n  },\n  \n  // Arrow function: \'this\' fails (inherits global scope)\n  greetArrow: () => {\n    console.log("Hello, I am " + this.name); // undefined\n  }\n};\n\nuser.greet();\nuser.greetArrow();',
    faq: [
      {
        question: "How do I explicitly set the 'this' value?",
        answer:
          "You can use the .bind(), .call(), or .apply() methods on any function.",
      },
    ],
    relatedExamples: ["arrow-function"],
  },
  {
    id: "objects",
    title: "JavaScript Objects",
    description:
      "Learn how to create and manipulate objects, the fundamental data structure in JavaScript.",
    content:
      '\nObjects are collections of key-value pairs. They are used to model real-world entities or complex data.\n\nKeys (or properties) are strings, and values can be any data type, including arrays, other objects, or functions (methods).\n\nYou can access properties using dot notation (`object.property`) or bracket notation (`object["property"]`).\n    ',
    codeSnippet:
      'const car = {\n  brand: "Toyota",\n  year: 2024,\n  features: ["GPS", "Bluetooth"],\n  start() {\n    console.log("Vroom!");\n  }\n};\n\nconsole.log(car.brand); // Toyota\nconsole.log(car["year"]); // 2024\n\ncar.start(); // Vroom!',
    faq: [
      {
        question: "When should I use bracket notation instead of dot notation?",
        answer:
          "Use brackets when the property name is dynamic (stored in a variable) or contains spaces/hyphens.",
      },
    ],
    relatedExamples: ["object-basics"],
  },
];

export const getLearnTopicById = (id: string): LearnTopic | undefined => {
  return learnTopics.find((topic) => topic.id === id);
};
