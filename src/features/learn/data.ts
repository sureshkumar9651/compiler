export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  codeSnippet?: string;
  faq?: { question: string; answer: string }[];
  relatedExamples?: string[];
  seoTitle?: string;
  seoDescription?: string;
  datePublished?: string;
  dateModified?: string;
}

export const learnTopics: LearnTopic[] = [
  {
    "id": "variables",
    "title": "JavaScript Variables Explained: let vs const vs var",
    "seoTitle": "JavaScript Variables (let vs const vs var) Explained",
    "seoDescription": "Master JavaScript variables with our in-depth tutorial. Learn the crucial differences between let, const, and var, block scoping, and reassignment rules.",
    "description": "A JavaScript variable is a named storage container for holding data values in memory. Modern JavaScript uses const by default for immutable bindings and let for variables that must be reassigned, completely replacing the obsolete function-scoped var keyword.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is a variable in JavaScript?\n\nA JavaScript variable is a symbolic container used to store, retrieve, and manipulate data values in computer memory throughout an application's lifecycle. Since the ECMAScript 2015 (ES6) specification, JavaScript provides three declaration keywords—`const`, `let`, and the legacy `var`—each governed by distinct scoping rules, temporal dead zones, and mutability guarantees.\n\nUnderstanding how JavaScript variables work is essential because incorrect scoping or accidental global assignments are among the most common sources of bugs in web development.\n\n---\n\n## How do let, const, and var differ?\n\nThe table below contrasts the fundamental behavior of JavaScript's variable declaration keywords across scope boundaries, hoisting lifecycle, and reassignment constraints:\n\n| Keyword | Scope Level | Reassignable? | Re-declarable? | Hoisting Behavior | Temporal Dead Zone (TDZ)? |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **`const`** | Block (`{}`) | No (constant reference) | No | Hoisted (uninitialized) | Yes |\n| **`let`** | Block (`{}`) | Yes | No | Hoisted (uninitialized) | Yes |\n| **`var`** | Function / Global | Yes | Yes | Hoisted (initialized to `undefined`) | No |\n\n### When should you use const?\nUse `const` by default for every variable declaration in your codebase. Declaring with `const` prevents accidental reassignment and immediately signals to teammates and compilers that the identifier binding will not change. Crucially, while a `const` reference cannot be reassigned, the internal properties of objects or elements of arrays declared with `const` can still be mutated unless protected with `Object.freeze()`.\n\n### When should you use let?\nUse `let` exclusively when you know a variable must be reassigned later in its lexical lifecycle. Typical use cases include loop counters (`for (let i = 0; ...)`), mathematical accumulators, and toggles within conditional branching.\n\n### Why should you avoid var in modern JavaScript?\nThe legacy `var` keyword is function-scoped rather than block-scoped and leaks outside of `if` statements and `for` loops. Furthermore, `var` allows dangerous re-declarations within the same scope and silently initializes hoisted variables to `undefined`, which can mask syntax errors and introduce elusive race conditions.\n\n---\n\n## What is Block Scope vs Function Scope?\n\nIn JavaScript, **block scope** means a variable declared inside a pair of curly braces `{ ... }` (such as inside an `if` statement, `while` loop, or switch block) exists only inside that specific block and cannot be accessed from outside.\n\n```javascript\nif (true) {\n  let blockScoped = \"I live only inside this if block\";\n  var functionScoped = \"I leak outside this if block!\";\n}\n\nconsole.log(functionScoped); // Prints: \"I leak outside this if block!\"\n// console.log(blockScoped); // ReferenceError: blockScoped is not defined\n```\n\nBoth `let` and `const` strictly enforce block scoping, guaranteeing that temporary loop counters and condition variables do not leak into surrounding application logic.\n\n---\n\n## What is the Temporal Dead Zone (TDZ)?\n\nThe **Temporal Dead Zone (TDZ)** is the period between entering a lexical scope and the actual line of code where a `let` or `const` variable is declared. Accessing the variable during this window throws an immediate `ReferenceError`.\n\n```javascript\n// Attempting to access before declaration\n// console.log(userScore); // ReferenceError: Cannot access 'userScore' before initialization\n\nlet userScore = 95; // Scope initialized here\nconsole.log(userScore); // 95\n```\n\nUnlike `var`, which initializes to `undefined` during hoisting, the TDZ actively prevents developers from reading uninitialized state before its intended declaration point.\n\n---\n\n## Common Mistakes with JavaScript Variables\n\n1. **Reassigning a const identifier**: Attempting `const port = 3000; port = 8080;` causes an unrecoverable `TypeError: Assignment to constant variable`.\n2. **Confusing const reference with deep immutability**: Declaring `const config = { theme: 'dark' };` allows `config.theme = 'light'`. Use `Object.freeze()` if true property immutability is required.\n3. **Accidental global variable creation**: Forgetting a declaration keyword in non-strict mode assigns the variable to the global window or globalThis object, polluting global state.\n4. **Variable shadowing**: Declaring a variable with the same identifier in an inner scope obscures the outer variable, creating confusion during maintenance.\n",
    "codeSnippet": "// Modern Variable Declaration Best Practices\nconst API_BASE_URL = \"https://api.example.com\";\nlet currentRetryCount = 0;\n\nfunction incrementRetry() {\n  currentRetryCount += 1;\n  const isMaxReached = currentRetryCount >= 3;\n  return { currentRetryCount, isMaxReached };\n}\n\nconsole.log(incrementRetry()); // { currentRetryCount: 1, isMaxReached: false }\nconsole.log(incrementRetry()); // { currentRetryCount: 2, isMaxReached: false }",
    "faq": [
      {
        "question": "What is the core difference between let and const in JavaScript?",
        "answer": "The keyword const creates an immutable binding that cannot be reassigned after declaration, whereas let creates a mutable binding that permits value reassignment within its enclosing block scope."
      },
      {
        "question": "Can you modify an object or array declared with const?",
        "answer": "Yes. Declaring an object or array with const protects the variable reference from being reassigned to a new memory address, but the properties or elements inside the object can still be modified or added."
      },
      {
        "question": "Why does accessing a let variable before declaration throw ReferenceError?",
        "answer": "Variables declared with let and const are placed in the Temporal Dead Zone (TDZ) from the start of the block until the execution reaches the declaration line. Accessing them during the TDZ causes a ReferenceError."
      },
      {
        "question": "Is var ever still needed in modern JavaScript development?",
        "answer": "No. Modern JavaScript standards and style guides universally recommend avoiding var in favor of const and let because var lacks block scoping and causes unintended variable hoisting side effects."
      }
    ],
    "relatedExamples": [
      "variables",
      "hello-world",
      "template-literals"
    ]
  },
  {
    "id": "functions",
    "title": "JavaScript Functions Guide: Declarations, Expressions & Arrow Functions",
    "seoTitle": "JavaScript Functions Guide: Declarations & Arrow Functions",
    "seoDescription": "Learn JavaScript functions with clear examples. Discover function declarations, function expressions, ES6 arrow functions, and lexical this binding.",
    "description": "A JavaScript function is a reusable block of code designed to perform a specific task, accept arguments, and return computed results. JavaScript functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is a function in JavaScript?\n\nA JavaScript function is a fundamental building block of web applications that groups statements together into an invocable, reusable procedure. In JavaScript, functions are **first-class citizens** (first-class objects). This means functions can be stored in variables, passed into callbacks, returned from higher-order functions, and augmented with dynamic properties just like standard objects.\n\n---\n\n## What are the types of functions in JavaScript?\n\nModern JavaScript provides multiple ways to declare and invoke functions, each serving distinct architectural patterns:\n\n| Function Type | Syntax Example | Hoisted? | Own `this` Context? | Has `arguments` object? | Constructor (`new`)? |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Function Declaration** | `function add(a, b) { return a + b; }` | Yes (full body) | Yes (dynamic) | Yes | Yes |\n| **Function Expression** | `const add = function(a, b) { return a + b; };` | No (variable hoisted) | Yes (dynamic) | Yes | Yes |\n| **Arrow Function (ES6)** | `const add = (a, b) => a + b;` | No | No (lexical `this`) | No (use rest `...args`) | No |\n\n---\n\n## When should you use Arrow Functions vs Traditional Functions?\n\nIntroduced in ECMAScript 2015 (ES6), arrow functions provide both a compact, concise syntax and fundamentally altered binding semantics:\n\n### 1. Lexical `this` Binding\nTraditional functions establish their `this` context dynamically based on *how* they are called at runtime. Arrow functions, by contrast, do not bind their own `this`; they lexically inherit `this` from the surrounding execution context. This makes arrow functions ideal for callbacks, timer functions (`setTimeout`), and array pipeline iterations (`map`, `filter`).\n\n```javascript\nconst timer = {\n  seconds: 0,\n  start() {\n    // Arrow function captures lexical 'this' from timer object\n    setInterval(() => {\n      this.seconds++;\n    }, 1000);\n  }\n};\n```\n\n### 2. Implicit Return Syntax\nWhen an arrow function contains only a single expression, the curly braces and `return` statement can be omitted:\n```javascript\nconst square = x => x * x;\nconst makeUser = (id, name) => ({ id, name }); // Note parens around object literal\n```\n\n### When NOT to use arrow functions:\n- **Object methods**: If you need `this` to point to the host object, use standard shorthand method syntax (`greet() { return this.name; }`).\n- **Constructors**: Arrow functions cannot be called with the `new` keyword and do not possess a `.prototype` property.\n- **Event handlers requiring `this` element**: DOM event callbacks that inspect `this` as the clicked DOM element should use regular function declarations.\n\n---\n\n## What are Default Parameters and Rest Parameters?\n\nModern JavaScript simplifies function signatures by eliminating defensive parameter boilerplate:\n\n### Default Parameters\nDefault parameters allow initializing formal parameters with default values if no value or `undefined` is passed:\n```javascript\nfunction paginate(page = 1, pageSize = 20) {\n  return { offset: (page - 1) * pageSize, limit: pageSize };\n}\n```\n\n### Rest Parameters (`...rest`)\nRest parameters condense an indefinite number of arguments into a real array, replacing the outdated array-like `arguments` object:\n```javascript\nfunction calculateTotal(discount, ...prices) {\n  const sum = prices.reduce((acc, price) => acc + price, 0);\n  return sum * (1 - discount);\n}\n```\n\n---\n\n## Common Mistakes with JavaScript Functions\n\n1. **Returning object literals without parentheses in arrow functions**: Writing `() => { a: 1 }` interprets the braces as a function body block rather than an object literal. Wrap in parentheses: `() => ({ a: 1 })`.\n2. **Calling arrow functions with new**: Calling `new MyArrowFunc()` throws a runtime `TypeError: MyArrowFunc is not a constructor`.\n3. **Assuming function arguments can be sliced directly**: The legacy `arguments` object is an array-like structure without array prototype methods. Use modern rest parameters `...args` instead.\n",
    "codeSnippet": "// Comparing Function Declarations and Arrow Functions\nfunction calculateTax(subtotal, rate = 0.08) {\n  return subtotal * rate;\n}\n\nconst formatCurrency = amount => \"$\" + amount.toFixed(2);\n\nconst total = 100;\nconst tax = calculateTax(total);\nconsole.log(\"Tax:\", formatCurrency(tax)); // Tax: $8.00\nconsole.log(\"Final Total:\", formatCurrency(total + tax)); // Final Total: $108.00",
    "faq": [
      {
        "question": "Do arrow functions have their own this context in JavaScript?",
        "answer": "No. Arrow functions do not define their own this binding; instead, they capture the this value of the enclosing lexical execution context at the time they are created."
      },
      {
        "question": "What is function hoisting in JavaScript?",
        "answer": "Function declarations are completely hoisted to the top of their scope during compilation, allowing them to be safely invoked before their appearance in the source code. Function expressions are not hoisted."
      },
      {
        "question": "How do you implicitly return an object from an arrow function?",
        "answer": "To return an object literal implicitly, wrap the object in parentheses: const getUser = id => ({ id, active: true }); Otherwise, the JavaScript engine treats the curly braces as an empty block statement."
      },
      {
        "question": "What is the difference between arguments and rest parameters?",
        "answer": "The arguments object is an array-like object available only in non-arrow functions that lacks array methods like map or filter. Rest parameters (...args) produce true JavaScript Array instances compatible with all array methods."
      }
    ],
    "relatedExamples": [
      "basic-function",
      "arrow-function",
      "default-parameters"
    ]
  },
  {
    "id": "arrays",
    "title": "JavaScript Arrays Guide: Methods, Iteration & Manipulation",
    "seoTitle": "JavaScript Arrays Guide: Core Methods & Transformations",
    "seoDescription": "Master JavaScript arrays with real-world examples. Learn essential array methods including map, filter, reduce, find, slice, splice, and destructuring.",
    "description": "A JavaScript array is an ordered list of values that can store multiple data types under a single variable name. Arrays feature zero-based indexing and provide a rich set of built-in functional transformation methods.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is an array in JavaScript?\n\nA JavaScript array is an ordered, zero-indexed collection of elements capable of storing any data type—including numbers, strings, nested objects, functions, and other arrays. Unlike arrays in strictly typed systems with static memory allocation, JavaScript arrays are dynamic in size, resize automatically, and offer powerful functional iteration pipelines.\n\n---\n\n## Essential JavaScript Array Methods Comparison\n\nThe table below organizes standard array methods by whether they mutate the original array in place or return a clean, new array:\n\n| Method | Purpose | Mutates Original Array? | Returns |\n| :--- | :--- | :--- | :--- |\n| **`map()`** | Transform every item | No | New array of same length |\n| **`filter()`** | Keep items matching condition | No | New filtered array |\n| **`reduce()`** | Accumulate items into single value | No | Aggregated value (any type) |\n| **`find()`** | Find first matching element | No | First element or `undefined` |\n| **`findIndex()`** | Find index of first match | No | Index integer or `-1` |\n| **`includes()`** | Check if value exists | No | Boolean (`true` / `false`) |\n| **`slice()`** | Extract sub-array by indices | No | New shallow copy array |\n| **`splice()`** | Add or remove items in place | **Yes** | Array of deleted elements |\n| **`sort()`** | Order elements in place | **Yes** | Reference to mutated array |\n| **`push() / pop()`**| Append / remove from end | **Yes** | New length / popped element |\n\n---\n\n## When to use Functional Transformations (map, filter, reduce)\n\nModern JavaScript embraces immutable programming patterns where arrays are transformed rather than mutated:\n\n### 1. Filtering and Mapping in Pipelines\nYou can chain array methods cleanly to process complex data sets without imperative `for` loops:\n```javascript\nconst products = [\n  { id: 1, name: \"Keyboard\", price: 79, inStock: true },\n  { id: 2, name: \"Monitor\", price: 299, inStock: false },\n  { id: 3, name: \"Mouse\", price: 49, inStock: true }\n];\n\nconst inStockTitles = products\n  .filter(p => p.inStock)\n  .map(p => p.name.toUpperCase());\n\nconsole.log(inStockTitles); // [\"KEYBOARD\", \"MOUSE\"]\n```\n\n### 2. Safe Array Copying with Spread\nTo avoid unintended mutations when sorting or reversing arrays, create a shallow copy using the spread operator (`[...arr]`) or the newer ECMAScript `toSorted()` and `toReversed()` methods:\n```javascript\nconst numbers = [5, 1, 9, 3];\nconst sorted = [...numbers].sort((a, b) => a - b);\nconsole.log(\"Original:\", numbers); // [5, 1, 9, 3] (Untouched)\nconsole.log(\"Sorted:\", sorted);     // [1, 3, 5, 9]\n```\n\n---\n\n## Common Mistakes with JavaScript Arrays\n\n1. **Default sort() behavior on numbers**: `[10, 5, 20].sort()` sorts lexicographically (converting numbers to strings), resulting in `[10, 20, 5]`. Always pass an explicit comparison comparator: `.sort((a, b) => a - b)`.\n2. **Mutating state unintentionally with splice()**: Using `splice()` directly modifies the input array in place, which causes subtle bugs in React components and state stores. Use `slice()` or `filter()` for immutable updates.\n3. **Using delete on array items**: Calling `delete arr[1]` removes the element but leaves an empty hole (`empty / undefined`) without adjusting the array length. Use `filter` or `toSpliced` instead.\n",
    "codeSnippet": "// Array Transformation Pipeline\nconst cartItems = [\n  { item: \"Laptop\", price: 1200, qty: 1 },\n  { item: \"USB Hub\", price: 25, qty: 2 },\n  { item: \"Mousepad\", price: 15, qty: 3 }\n];\n\n// Calculate total cart value with reduce()\nconst subtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);\n\nconsole.log(\"Subtotal:\", \"$\" + subtotal); // Subtotal: $1295\nconsole.log(\"Item count:\", cartItems.length); // Item count: 3",
    "faq": [
      {
        "question": "Does array.map() modify the original array?",
        "answer": "No. The map() method creates and returns a completely new array populated with the results of calling the provided callback on every element without altering the original array."
      },
      {
        "question": "Why does [10, 5, 20].sort() sort incorrectly in JavaScript?",
        "answer": "By default, the Array.prototype.sort() method converts elements into strings and orders them according to UTF-16 code units. To sort numbers numerically, you must supply a comparator: (a, b) => a - b."
      },
      {
        "question": "What is the difference between slice() and splice()?",
        "answer": "The slice() method returns a shallow copy of a portion of an array without modifying the original. In contrast, splice() mutates the original array in place by removing, replacing, or inserting elements."
      },
      {
        "question": "How do you check if a value is an Array in JavaScript?",
        "answer": "Use Array.isArray(value). Checking typeof value returns 'object' because arrays in JavaScript are specialized objects, making Array.isArray the only dependable test."
      }
    ],
    "relatedExamples": [
      "array-map",
      "array-filter",
      "array-reduce",
      "array-find"
    ]
  },
  {
    "id": "promises",
    "title": "JavaScript Promises & Async/Await Guide (with Examples)",
    "seoTitle": "JavaScript Promises and Async/Await Complete Guide",
    "seoDescription": "Master asynchronous JavaScript with Promises and async/await. Learn Promise lifecycle states, error handling with try/catch, and the microtask queue.",
    "description": "A JavaScript Promise represents the eventual completion or failure of an asynchronous operation and its resulting value. Async/await provides synchronous-like syntax for handling Promises without callback hell.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is asynchronous programming in JavaScript?\n\nJavaScript operates on a **single-threaded event loop**, meaning it processes one instruction at a time on its main thread. Asynchronous programming allows operations that take unpredictable time—such as fetching API data, querying databases, reading files, or setting timers—to run in the background without freezing the browser interface or blocking subsequent code execution.\n\n---\n\n## What are the Three States of a Promise?\n\nA Promise acts as a proxy for a value that is not necessarily known when the promise is created. Every Promise exists in one of three mutually exclusive states:\n\n1. **Pending**: Initial state; the asynchronous operation is still executing.\n2. **Fulfilled**: The operation completed successfully, yielding a resolved result value.\n3. **Rejected**: The operation failed or encountered an unhandled exception, producing an error reason.\n\nOnce a Promise transitions from `pending` to either `fulfilled` or `rejected`, it is considered **settled** and its state becomes permanently immutable.\n\n---\n\n## How does async/await improve on Promises?\n\nIntroduced in ECMAScript 2017 (ES8), the `async` and `await` keywords are syntactic sugar built directly on top of native JavaScript Promises. They allow asynchronous code to be structured, read, and maintained with the linear clarity of synchronous code.\n\n| Feature | Standard Promise (`.then / .catch`) | Modern `async / await` |\n| :--- | :--- | :--- |\n| **Syntax Style** | Method chaining with callback closures | Linear, synchronous appearance |\n| **Error Handling** | `.catch(err => ...)` chain | Standard `try / catch` blocks |\n| **Conditional Flow** | Requires nested then branches | Standard `if / else` statements |\n| **Return Type** | Always returns a Promise | Async function always returns a Promise |\n\n### Writing Clean Async/Await Pipelines\n```javascript\nasync function fetchUserProfile(userId) {\n  try {\n    const response = await fetch(`https://api.example.com/users/${userId}`);\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const user = await response.json();\n    return user;\n  } catch (error) {\n    console.error(\"Failed to load user profile:\", error.message);\n    throw error;\n  }\n}\n```\n\n---\n\n## Promise Combinators: all vs allSettled vs race vs any\n\nWhen managing multiple concurrent asynchronous requests, ECMAScript provides four distinct static combinators:\n\n- **`Promise.all([p1, p2])`**: Fulfills when *all* promises fulfill; rejects immediately if *any single* promise rejects (fail-fast).\n- **`Promise.allSettled([p1, p2])`**: Waits until *all* promises settle, returning an array of objects detailing whether each succeeded or failed.\n- **`Promise.race([p1, p2])`**: Settles as soon as the *first* promise settles (either fulfills or rejects).\n- **`Promise.any([p1, p2])`**: Fulfills as soon as the *first* promise fulfills; rejects only if *all* promises reject.\n\n---\n\n## Common Mistakes with Asynchronous JavaScript\n\n1. **Forgetting to await a Promise**: Forgetting `await` assigns the Promise object itself rather than its resolved value, causing code like `if (fetchData())` to evaluate as truthy regardless of the result.\n2. **Sequential execution of independent operations**: Running `await fetchA(); await fetchB();` runs network requests in series. If they are independent, run them concurrently with `await Promise.all([fetchA(), fetchB()])`.\n3. **Unhandled promise rejections**: Forgetting to attach a `.catch()` or omit `try/catch` can crash server processes in Node.js and trigger unhandled rejection warnings in modern browsers.\n",
    "codeSnippet": "// Practical Async/Await with Error Handling\nfunction simulateApiCall(success) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (success) resolve({ status: 200, data: \"Payload retrieved\" });\n      else reject(new Error(\"Network timeout\"));\n    }, 100);\n  });\n}\n\nasync function runDemo() {\n  try {\n    const result = await simulateApiCall(true);\n    console.log(\"Success:\", result.data);\n  } catch (err) {\n    console.error(\"Error caught:\", err.message);\n  }\n}\n\nrunDemo(); // Success: Payload retrieved",
    "faq": [
      {
        "question": "What does an async function always return in JavaScript?",
        "answer": "An async function always implicitly returns a Promise. If the function returns a non-promise value, JavaScript automatically wraps that value in a resolved Promise (Promise.resolve(value))."
      },
      {
        "question": "What is the difference between Promise.all and Promise.allSettled?",
        "answer": "Promise.all rejects immediately if any input promise rejects (fail-fast), whereas Promise.allSettled waits for every promise to either resolve or reject, returning an array of status objects."
      },
      {
        "question": "How do you handle errors in async/await functions?",
        "answer": "Wrap the awaited asynchronous operations in a standard try/catch block. Any rejection or thrown error within the try block is routed directly into the catch block."
      },
      {
        "question": "Can you use await outside of an async function?",
        "answer": "In modern JavaScript (ES2022+), Top-Level Await is supported at the root level of JavaScript modules (.mjs or type='module'), but inside standard function bodies, await requires the enclosing function to be declared async."
      }
    ],
    "relatedExamples": [
      "promise-basic",
      "async-await",
      "set-timeout"
    ]
  },
  {
    "id": "closures",
    "title": "JavaScript Closures Explained (with Real Examples)",
    "seoTitle": "JavaScript Closures Explained (with Real-World Examples)",
    "seoDescription": "Understand JavaScript closures with clear explanations. Learn how lexical scope, state retention, function factories, and data encapsulation work.",
    "description": "A closure is the combination of a function bundled together with references to its surrounding lexical environment. Closures give an inner function access to an outer function's scope even after the outer function has finished executing.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is a closure in JavaScript?\n\nA **closure** is a core JavaScript mechanism wherein an inner function retains access to variables and parameters declared in its outer (enclosing) function's lexical scope, even after the outer function has completed execution and returned.\n\nIn technical terms, in JavaScript, closures are created every time a function is created, at function creation time. Whenever an inner function references identifiers from an enclosing scope, JavaScript preserves that lexical environment on the heap rather than popping it from memory with the call stack.\n\n---\n\n## Why are closures useful in web development?\n\nClosures solve fundamental software engineering challenges in JavaScript by enabling state retention and encapsulation:\n\n### 1. Data Privacy and Encapsulation\nJavaScript lacked native private class fields for decades. Closures provided the standard pattern to hide implementation details and prevent unauthorized external mutation:\n\n```javascript\nfunction createBankAccount(initialBalance) {\n  let balance = initialBalance; // Private variable hidden by closure\n\n  return {\n    deposit(amount) {\n      if (amount > 0) balance += amount;\n      return balance;\n    },\n    getBalance() {\n      return balance;\n    }\n  };\n}\n\nconst myAccount = createBankAccount(100);\nmyAccount.deposit(50);\nconsole.log(myAccount.getBalance()); // 150\nconsole.log(myAccount.balance);     // undefined (Private!)\n```\n\n### 2. Function Factories and Currying\nClosures allow you to author factory functions that generate customized functions tailored with preset configuration parameters:\n\n```javascript\nfunction createMultiplier(multiplier) {\n  return function(number) {\n    return number * multiplier;\n  };\n}\n\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\n\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15\n```\n\n---\n\n## How do closures interact with the Event Loop?\n\nA classic JavaScript interview puzzle demonstrates how closures interact with asynchronous execution and variable scoping:\n\n```javascript\n// Problematic code with var:\nfor (var i = 1; i <= 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Prints: 4, 4, 4 (because var is function-scoped and shared)\n\n// Solved with block-scoped let:\nfor (let j = 1; j <= 3; j++) {\n  setTimeout(() => console.log(j), 100);\n}\n// Prints: 1, 2, 3 (each iteration creates a new lexical closure binding)\n```\n\nWhen using `let`, JavaScript creates a new lexical scope binding for each loop iteration, ensuring each timer callback closes over its own distinct value of `j`.\n\n---\n\n## Common Mistakes with JavaScript Closures\n\n1. **Unintentional memory retention (Memory Leaks)**: Retaining closures inside global caches, event listeners, or long-lived intervals prevents the garbage collector from freeing memory for referenced variables.\n2. **Confusing closures with object copies**: Closures capture references to live variables, not static snapshots of values. Mutating an enclosed variable alters the value for all functions sharing that closure.\n3. **Overusing closures where pure functions suffice**: Creating unnecessary closures in high-frequency loops creates extra function allocations and memory pressure.\n",
    "codeSnippet": "// Classic Counter Closure Example\nfunction createCounter(start = 0) {\n  let count = start;\n  \n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    get: () => count\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.increment()); // 12\nconsole.log(counter.decrement()); // 11\nconsole.log(\"Current:\", counter.get()); // Current: 11",
    "faq": [
      {
        "question": "What is a closure in JavaScript in simple terms?",
        "answer": "A closure is when an inner function remembers and continues to access variables from its parent function, even after the parent function has finished executing."
      },
      {
        "question": "Are closures bad for memory and garbage collection?",
        "answer": "Closures prevent garbage collection of enclosed variables as long as the closure function itself remains reachable in memory. While not inherently bad, holding closures in global variables unnecessarily can cause memory leaks."
      },
      {
        "question": "How do closures enable private variables in JavaScript?",
        "answer": "By declaring variables with let or const inside an outer function and exposing only inner methods (getters/setters), external code cannot access or modify the internal variables directly."
      },
      {
        "question": "Why does using let in a for loop fix the closure setTimeout issue?",
        "answer": "Because let is block-scoped, JavaScript creates a fresh binding for the loop variable on every single iteration, allowing each timer callback to close over its own unique iteration value."
      }
    ],
    "relatedExamples": [
      "basic-function",
      "variables",
      "arrow-function"
    ]
  },
  {
    "id": "map-vs-foreach",
    "title": "Array map() vs forEach() in JavaScript: Key Differences",
    "seoTitle": "Array map() vs forEach() in JavaScript: Key Differences",
    "seoDescription": "Learn the core differences between JavaScript array map() and forEach(). Understand return values, mutation, performance, and when to use each.",
    "description": "The primary difference between map() and forEach() is that map() allocates and returns a new array containing transformed items, whereas forEach() executes a side effect for each element and returns undefined.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is the difference between map() and forEach()?\n\nBoth `Array.prototype.map()` and `Array.prototype.forEach()` iterate through array elements from start to finish, calling a supplied callback function on each item. However, they serve fundamentally different architectural roles:\n\n- Use **`map()`** when your goal is to **transform data** and produce a new array without mutating the source data.\n- Use **`forEach()`** when your goal is to **execute side effects** (such as logging, updating external variables, or triggering network requests) without needing a return value.\n\n---\n\n## Detailed Comparison Table: map vs forEach\n\n| Feature | `Array.prototype.map()` | `Array.prototype.forEach()` |\n| :--- | :--- | :--- |\n| **Return Value** | A new array of identical length | Always `undefined` |\n| **Primary Use Case** | Pure data transformation | Performing external side effects |\n| **Chainability** | Yes (`.map().filter().reduce()`) | No (returns `undefined`) |\n| **Mutates Original?** | No (unless callback mutates elements) | No (unless callback mutates elements) |\n| **Can Break Early?** | No | No (use `for...of` or `some()` instead) |\n\n---\n\n## Code Comparison: Practical Examples\n\n### Using `map()` for Pure Transformation\n```javascript\nconst rawPrices = [19.99, 4.50, 100.00];\n\n// map returns a new array; rawPrices remains unchanged\nconst formattedPrices = rawPrices.map(price => `$${price.toFixed(2)}`);\n\nconsole.log(formattedPrices); // [\"$19.99\", \"$4.50\", \"$100.00\"]\n```\n\n### Using `forEach()` for Side Effects\n```javascript\nconst usersToNotify = [\"Alice\", \"Bob\", \"Charlie\"];\n\n// forEach performs an action; it returns undefined\nusersToNotify.forEach(user => {\n  console.log(`Sending notification email to ${user}...`);\n});\n```\n\n---\n\n## How to Break Early from Array Loops\n\nNeither `map()` nor `forEach()` supports the `break` or `continue` statements. If your algorithm requires terminating early once a condition is satisfied:\n\n1. **Use `for...of` loop**: Supports `break` and `continue` natively.\n2. **Use `Array.prototype.some()`**: Terminates iteration as soon as a callback returns a truthy value.\n3. **Use `Array.prototype.find()`**: Stops searching immediately after locating the first match.\n\n---\n\n## Common Mistakes with map and forEach\n\n1. **Using map() without using its return value**: Calling `arr.map(x => console.log(x))` needlessly allocates a new array of `undefined` values in memory. Use `forEach()` instead.\n2. **Expecting forEach() to return data**: Writing `const doubled = arr.forEach(x => x * 2)` assigns `undefined` to `doubled`.\n3. **Attempting to use break inside forEach**: Calling `break` inside `forEach()` triggers a syntax error (`SyntaxError: Illegal break statement`).\n",
    "codeSnippet": "// Comparing map and forEach\nconst numbers = [1, 2, 3, 4];\n\n// Transformation: map\nconst squares = numbers.map(n => n * n);\nconsole.log(\"Squares:\", squares); // [1, 4, 9, 16]\n\n// Side Effect: forEach\nlet sum = 0;\nnumbers.forEach(n => { sum += n; });\nconsole.log(\"Sum:\", sum); // 10",
    "faq": [
      {
        "question": "When should I use map() instead of forEach() in JavaScript?",
        "answer": "Use map() whenever you want to transform an array into a new array of values. Use forEach() when you want to execute side effects like logging, DOM updates, or database writes without creating a new array."
      },
      {
        "question": "Can you break out of a forEach loop in JavaScript?",
        "answer": "No. The forEach() method executes the callback on every element and cannot be stopped using break or continue. If you need early termination, use a standard for...of loop or Array.prototype.some()."
      },
      {
        "question": "Is map() faster than forEach()?",
        "answer": "In modern JavaScript engines (V8, JavaScriptCore), performance differences between map and forEach are negligible for normal use cases. Choose based on semantic intent: use map for transformations and forEach for side effects."
      },
      {
        "question": "Does forEach modify the original array?",
        "answer": "The forEach() method itself does not mutate the original array, but the callback function you provide is capable of mutating the elements or properties of the array if written to do so."
      }
    ],
    "relatedExamples": [
      "array-map",
      "array-filter",
      "array-reduce"
    ]
  },
  {
    "id": "destructuring",
    "title": "JavaScript Destructuring Guide: Objects and Arrays",
    "seoTitle": "JavaScript Destructuring (Objects & Arrays) Explained",
    "seoDescription": "Learn JavaScript destructuring syntax for objects and arrays. Discover default values, renaming variables, nested extraction, and rest properties.",
    "description": "Destructuring assignment in JavaScript is a concise syntax that allows you to unpack values from arrays or properties from objects directly into distinct, readable variables.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is destructuring in JavaScript?\n\nIntroduced in ECMAScript 2015 (ES6), **destructuring assignment** is a syntax expression that enables unpacking values from arrays or properties from objects into distinct variables in a single declarative line. Destructuring eliminates repetitive property accessors (`user.name`, `user.email`), making function parameters and state handling far more readable.\n\n---\n\n## Object Destructuring Syntax & Patterns\n\nObject destructuring matches properties by key name rather than positional index:\n\n### 1. Basic Extraction and Renaming\n```javascript\nconst user = { id: 101, username: \"alex99\", role: \"admin\" };\n\n// Basic extraction\nconst { username, role } = user;\n\n// Extracting with variable renaming (username becomes handle)\nconst { username: handle } = user;\nconsole.log(handle); // \"alex99\"\n```\n\n### 2. Default Fallback Values\nIf a requested property is `undefined`, destructuring can assign a default fallback value:\n```javascript\nconst { theme = \"dark\", active = true } = { active: false };\nconsole.log(theme);  // \"dark\" (Default applied)\nconsole.log(active); // false (Provided value preserved)\n```\n\n---\n\n## Array Destructuring Syntax & Patterns\n\nArray destructuring unpacks values based on their sequential position:\n\n```javascript\nconst coordinates = [37.7749, -122.4194, 15];\n\n// Positional assignment\nconst [latitude, longitude, zoom = 10] = coordinates;\n\n// Skipping unwanted positions\nconst [lat, , currentZoom] = coordinates;\n```\n\n---\n\n## Parameter Destructuring in Functions\n\nDestructuring is widely adopted in function parameters to accept configuration objects cleanly:\n```javascript\nfunction connectDatabase({ host = \"localhost\", port = 5432, timeout = 3000 } = {}) {\n  return `Connecting to ${host}:${port} (Timeout: ${timeout}ms)`;\n}\n\nconsole.log(connectDatabase({ port: 5433 }));\n// \"Connecting to localhost:5433 (Timeout: 3000ms)\"\n```\n\n---\n\n## Common Mistakes with Destructuring\n\n1. **Destructuring null or undefined without defaults**: Attempting `const { name } = null` throws `TypeError: Cannot destructure property 'name' of null`. Always guard parent objects or supply default empty objects: `({ prop } = {})`.\n2. **Confusing renaming syntax with key-value assignment**: In `const { name: fullName } = user`, `fullName` is the newly created variable name, not the value.\n",
    "codeSnippet": "// Practical Destructuring Example\nconst serverResponse = {\n  status: 200,\n  data: {\n    user: { id: 42, name: \"Sam\" },\n    meta: { page: 1, totalPages: 5 }\n  }\n};\n\n// Nested destructuring with aliases\nconst {\n  status,\n  data: { user: { name: userName } }\n} = serverResponse;\n\nconsole.log(\"Status:\", status); // Status: 200\nconsole.log(\"User:\", userName); // User: Sam",
    "faq": [
      {
        "question": "How do you rename a variable during object destructuring?",
        "answer": "Use the colon syntax: const { originalKey: newVariableName } = object; This extracts the property originalKey and stores its value in a new variable named newVariableName."
      },
      {
        "question": "What happens if a destructuring property does not exist?",
        "answer": "If the property does not exist on the target object, the variable receives undefined unless an explicit default fallback value was specified (const { prop = defaultValue } = obj)."
      },
      {
        "question": "How do you swap two variables using destructuring in JavaScript?",
        "answer": "You can swap variables without a temporary third variable using array destructuring: [a, b] = [b, a];"
      }
    ],
    "relatedExamples": [
      "object-destructuring",
      "object-basics",
      "object-spread"
    ]
  },
  {
    "id": "spread-rest",
    "title": "JavaScript Spread and Rest Operators (...): Complete Guide",
    "seoTitle": "JavaScript Spread vs Rest Operators (...) Explained",
    "seoDescription": "Understand the three dots (...) in JavaScript. Master the spread operator for cloning arrays/objects and rest parameters for function arguments.",
    "description": "The three dots (...) in JavaScript represent either the spread operator or rest parameters depending on context. Spread unpacks elements into an iterable, while rest condenses multiple elements into a single array.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What are the Spread and Rest operators in JavaScript?\n\nThe three consecutive dots (`...`) syntax in JavaScript serves two complementary purposes governed by where it appears in your code:\n\n1. **Spread Operator**: **Unpacks** an array or object into individual elements. Used in array literals, object literals, and function invocation arguments.\n2. **Rest Parameters**: **Collects** multiple individual elements into a single array. Used in function parameter declarations and destructuring patterns.\n\n---\n\n## When to use the Spread Operator\n\n### 1. Shallow Cloning Objects and Arrays\nSpread creates a clean shallow copy without mutating the original reference:\n```javascript\nconst original = [1, 2, 3];\nconst clone = [...original];\nclone.push(4);\n\nconsole.log(\"Original:\", original); // [1, 2, 3] (Untouched)\nconsole.log(\"Clone:\", clone);       // [1, 2, 3, 4]\n```\n\n### 2. Merging Arrays and Objects\n```javascript\nconst baseConfig = { timeout: 5000, debug: false };\nconst envConfig = { debug: true, env: \"production\" };\n\n// Latter properties override earlier ones\nconst finalConfig = { ...baseConfig, ...envConfig, port: 8080 };\nconsole.log(finalConfig);\n// { timeout: 5000, debug: true, env: \"production\", port: 8080 }\n```\n\n---\n\n## When to use Rest Parameters\n\nRest parameters allow functions to accept variable numbers of arguments cleanly as a real Array instance:\n\n```javascript\nfunction calculateScore(bonus, ...points) {\n  const sum = points.reduce((acc, curr) => acc + curr, 0);\n  return sum + bonus;\n}\n\nconsole.log(calculateScore(10, 5, 15, 20)); // 50\n```\n\n---\n\n## Common Mistakes with Spread and Rest\n\n1. **Assuming spread creates a deep clone**: Spread copies only top-level properties (shallow copy). Nested objects and arrays still share memory references. Use `structuredClone()` for true deep cloning.\n2. **Placing rest parameters before other parameters**: Rest parameters must always be the final parameter in a function signature: `function test(...rest, last)` throws a `SyntaxError: Rest parameter must be last formal parameter`.\n",
    "codeSnippet": "// Spread and Rest in Action\nconst teamA = [\"Alice\", \"Bob\"];\nconst teamB = [\"Charlie\", \"Diana\"];\n\n// Spread: Merge arrays\nconst allMembers = [...teamA, ...teamB];\nconsole.log(\"All members:\", allMembers); // [\"Alice\", \"Bob\", \"Charlie\", \"Diana\"]\n\n// Rest: Gather function arguments\nconst logLeaderAndMembers = (leader, ...members) => {\n  console.log(\"Leader:\", leader);\n  console.log(\"Team:\", members);\n};\n\nlogLeaderAndMembers(...allMembers);\n// Leader: Alice\n// Team: [\"Bob\", \"Charlie\", \"Diana\"]",
    "faq": [
      {
        "question": "Does the spread operator create a deep copy or shallow copy?",
        "answer": "The spread operator creates a shallow copy. It duplicates top-level primitive values, but any nested objects or arrays retain their original memory references."
      },
      {
        "question": "Can you place a rest parameter at the beginning of a function signature?",
        "answer": "No. A rest parameter must always be the last parameter in the function declaration. Placing anything after a rest parameter causes a SyntaxError."
      },
      {
        "question": "How do you deep clone an object in modern JavaScript without spread limitations?",
        "answer": "Use the browser-native structuredClone() API (e.g., const deepCopy = structuredClone(originalObject);), which safely copies complex nested objects, arrays, and dates."
      }
    ],
    "relatedExamples": [
      "object-spread",
      "object-destructuring",
      "default-parameters"
    ]
  },
  {
    "id": "template-literals",
    "title": "JavaScript Template Literals Explained (Backticks & Strings)",
    "seoTitle": "JavaScript Template Literals (Backtick Strings) Guide",
    "seoDescription": "Learn JavaScript template literals. Discover backtick strings, variable interpolation with ${}, multiline text formatting, and tagged templates.",
    "description": "Template literals are string literals delimited by backticks (`) that allow embedded expressions, string interpolation with ${}, multiline strings, and tagged template functions.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What are template literals in JavaScript?\n\nIntroduced in ECMAScript 2015 (ES6), **template literals** are string literals delimited by backtick (`` ` ``) characters rather than single (`'`) or double (`\"`) quotation marks. They provide native support for:\n1. **String interpolation**: Embedding dynamic expressions directly inside strings using `${expression}` syntax.\n2. **Multiline strings**: Retaining whitespace and line breaks without concatenation or `\\n` escape characters.\n3. **Tagged template literals**: Passing strings through custom parser functions for advanced formatting and sanitization.\n\n---\n\n## Expression Interpolation vs Traditional Concatenation\n\nPrior to template literals, assembling strings with variables required cumbersome plus-sign concatenation:\n\n```javascript\nconst user = \"Alex\";\nconst unread = 5;\n\n// Old syntax (concatenation)\nconst oldStr = \"Hello \" + user + \", you have \" + unread + \" unread messages.\";\n\n// Modern template literal\nconst newStr = `Hello ${user}, you have ${unread} unread messages.`;\n```\n\nAny valid JavaScript expression can be evaluated inside the `${}` delimiters, including ternary operators, mathematical calculations, and function calls:\n```javascript\nconst item = { name: \"Book\", price: 20 };\nconst receipt = `Total: $${item.price > 15 ? item.price * 0.9 : item.price} (with discount)`;\nconsole.log(receipt); // Total: $18 (with discount)\n```\n\n---\n\n## Multiline Strings\n\nTemplate literals respect natural carriage returns directly within the source code:\n```javascript\nconst htmlMarkup = `\n  <div class=\"card\">\n    <h2>${item.name}</h2>\n    <p>Price: $${item.price}</p>\n  </div>\n`;\n```\n\n---\n\n## What are Tagged Template Literals?\n\nTagged templates allow you to parse template literals with a custom function. The tag function receives raw string segments as an array along with evaluated interpolation values:\n\n```javascript\nfunction highlight(strings, ...values) {\n  return strings.reduce((acc, str, i) => {\n    return `${acc}${str}${values[i] ? `<strong>${values[i]}</strong>` : \"\"}`;\n  }, \"\");\n}\n\nconst product = \"Compiler\";\nconsole.log(highlight`Welcome to JS CodeLab ${product}!`);\n// \"Welcome to JS CodeLab <strong>Compiler</strong>!\"\n```\n\nLibraries like `styled-components` and SQL query builders utilize tagged templates to sanitize inputs and construct domain-specific languages.\n",
    "codeSnippet": "// Template Literals with Expressions\nconst candidate = {\n  name: \"Alex Mercer\",\n  score: 95,\n  passingScore: 80\n};\n\nconst message = `Assessment Results for ${candidate.name}:\n- Score: ${candidate.score}%\n- Result: ${candidate.score >= candidate.passingScore ? \"PASSED\" : \"FAILED\"}`;\n\nconsole.log(message);",
    "faq": [
      {
        "question": "Can template literals span multiple lines in JavaScript?",
        "answer": "Yes. Template literals natively preserve line breaks and indents without requiring escape characters like \\n or string concatenation operators."
      },
      {
        "question": "Can you run functions inside template literals?",
        "answer": "Yes. Any valid JavaScript expression, including function calls, ternary operators, and arithmetic, can be evaluated inside the ${} interpolation syntax."
      },
      {
        "question": "What is a tagged template in JavaScript?",
        "answer": "A tagged template is an advanced form of template literal where a function precedes the string (e.g. tag`hello ${name}`). The tag function intercepts the strings and interpolated values for custom processing, formatting, or sanitization."
      }
    ],
    "relatedExamples": [
      "template-literals",
      "variables",
      "conditional-statements"
    ]
  },
  {
    "id": "scope-and-hoisting",
    "title": "JavaScript Scope & Hoisting Explained: Complete Guide",
    "seoTitle": "JavaScript Scope and Hoisting Guide (with Examples)",
    "seoDescription": "Master JavaScript scope (global, function, block) and hoisting behavior. Understand how the execution context and Temporal Dead Zone work.",
    "description": "Scope determines the visibility and accessibility of variables in JavaScript. Hoisting is JavaScript's default compilation behavior of allocating memory for variable and function declarations before executing code.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is Scope in JavaScript?\n\n**Scope** determines where variables, functions, and objects are accessible during runtime execution. JavaScript enforces three primary layers of scope:\n\n1. **Global Scope**: Identifiers declared outside of all functions and blocks. Accessible everywhere in the application.\n2. **Function Scope**: Identifiers declared with `var`, `let`, or `const` inside a function body. Accessible only within that function.\n3. **Block Scope**: Identifiers declared with `let` or `const` inside curly braces `{ ... }` (e.g., `if`, `for`, `while`). Inaccessible outside that block.\n\n---\n\n## What is Hoisting in JavaScript?\n\n**Hoisting** refers to the JavaScript engine's behavior during the compilation phase, where declarations are registered in memory before code execution begins:\n\n### 1. Function Declarations\nFunction declarations are hoisted completely with their function body. You can safely invoke them before their definition in the file:\n```javascript\ngreet(\"Alex\"); // Works! \"Hello, Alex\"\n\nfunction greet(name) {\n  console.log(\"Hello, \" + name);\n}\n```\n\n### 2. Variable Hoisting: var vs let and const\n- **`var`**: Hoisted and initialized to `undefined`. Accessing before assignment yields `undefined`.\n- **`let` and `const`**: Hoisted but **uninitialized**. They remain in the **Temporal Dead Zone (TDZ)** from the start of the block until the declaration statement is executed. Accessing them throws an immediate `ReferenceError`.\n\n```javascript\nconsole.log(legacyVar); // undefined\nvar legacyVar = \"I was hoisted\";\n\n// console.log(modernLet); // ReferenceError: Cannot access 'modernLet' before initialization\nlet modernLet = \"I am in the TDZ\";\n```\n\n---\n\n## Scope Chain and Lexical Scoping\n\nWhen the JavaScript engine resolves a variable identifier, it searches the current local execution context. If the identifier is not found, it traverses outward through parent enclosing scopes along the **scope chain** until it reaches the global scope. If the identifier is never found, a `ReferenceError` is thrown.\n",
    "codeSnippet": "// Demonstrating Block Scope and Hoisting\nconst globalScore = 100;\n\nfunction evaluateUser() {\n  const localBonus = 25;\n  \n  if (globalScore >= 100) {\n    const blockOnlyMessage = \"Perfect Score!\";\n    console.log(blockOnlyMessage, \"Total:\", globalScore + localBonus);\n  }\n  \n  // console.log(blockOnlyMessage); // ReferenceError! Block-scoped\n}\n\nevaluateUser(); // \"Perfect Score! Total: 125\"",
    "faq": [
      {
        "question": "What is the difference between block scope and function scope?",
        "answer": "Function scope limits variable accessibility to the function where it is declared (created by var, let, or const). Block scope limits accessibility to the specific enclosing curly braces { } (created only by let and const)."
      },
      {
        "question": "Why does var return undefined when hoisted instead of throwing an error?",
        "answer": "During compilation, the JavaScript engine allocates memory for var variables and initializes them to undefined. let and const are also allocated in memory, but remain uninitialized in the Temporal Dead Zone until their declaration line is executed."
      },
      {
        "question": "Are function expressions hoisted in JavaScript?",
        "answer": "No. While the variable identifier (e.g. const myFunc) is hoisted according to variable rules, the function assignment itself occurs at runtime. Invoking a function expression before its assignment results in an error."
      }
    ],
    "relatedExamples": [
      "variables",
      "basic-function",
      "conditional-statements"
    ]
  },
  {
    "id": "error-handling",
    "title": "JavaScript Error Handling Guide: try, catch, finally & throw",
    "seoTitle": "JavaScript Error Handling Guide: try, catch & throw",
    "seoDescription": "Master JavaScript error handling with try, catch, finally, and custom throw Error statements. Learn defensive coding and async error handling.",
    "description": "Error handling in JavaScript allows developers to anticipate runtime exceptions, intercept errors gracefully using try...catch...finally blocks, and throw custom Error instances without crashing the application.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is Error Handling in JavaScript?\n\nRuntime errors occur when valid code encounters unexpected conditions—such as invalid JSON payloads, network connection drops, or operations on null properties. Without defensive error handling, an uncaught exception halts script execution and destabilizes the web application.\n\nJavaScript provides structured exception handling via the **`try...catch...finally`** statement and the **`throw`** keyword.\n\n---\n\n## The try, catch, and finally Anatomy\n\n```javascript\ntry {\n  // Code that might throw an exception\n  const data = JSON.parse(rawUserInput);\n  processData(data);\n} catch (error) {\n  // Executed only if an exception was thrown in the try block\n  console.error(\"Parsing failed:\", error.message);\n} finally {\n  // Always executed regardless of whether an error occurred\n  cleanupResources();\n}\n```\n\n### 1. The `try` Block\nEncloses code that carries a risk of runtime failure. If no exceptions occur, the `catch` block is completely bypassed.\n\n### 2. The `catch` Block\nCatches thrown errors. In modern JavaScript (ES2019+), optional catch binding allows omitting the error parameter if it is not needed: `catch { ... }`.\n\n### 3. The `finally` Block\nGuaranteed to execute regardless of whether the try block completed cleanly or threw an error, making it ideal for closing database connections, stopping loading spinners, or clearing file handles.\n\n---\n\n## Throwing Custom Errors\n\nYou can create and throw custom exceptions using the built-in `Error` constructor:\n```javascript\nfunction calculateDiscount(price, percentage) {\n  if (typeof price !== \"number\" || price < 0) {\n    throw new TypeError(\"Price must be a positive number\");\n  }\n  if (percentage < 0 || percentage > 100) {\n    throw new RangeError(\"Percentage must be between 0 and 100\");\n  }\n  return price * (1 - percentage / 100);\n}\n```\n\nStandard JavaScript built-in error types include `TypeError`, `RangeError`, `SyntaxError`, and `ReferenceError`.\n",
    "codeSnippet": "// Robust Error Handling Example\nfunction safeJsonParse(jsonString, fallback = {}) {\n  try {\n    return JSON.parse(jsonString);\n  } catch (error) {\n    console.warn(\"JSON Parse Warning:\", error.message);\n    return fallback;\n  } finally {\n    console.log(\"Parse attempt completed\");\n  }\n}\n\nconst valid = safeJsonParse('{\"user\": \"Alex\"}');\nconsole.log(\"Valid:\", valid); // { user: \"Alex\" }\n\nconst invalid = safeJsonParse('Invalid { JSON }', { default: true });\nconsole.log(\"Fallback:\", invalid); // { default: true }",
    "faq": [
      {
        "question": "What is the purpose of the finally block in JavaScript?",
        "answer": "The finally block always executes after try and catch blocks finish, regardless of whether an error was thrown or caught. It is used for cleanup tasks like stopping spinners or closing connections."
      },
      {
        "question": "Can you rethrow an error inside a catch block?",
        "answer": "Yes. If a catch block cannot adequately resolve an exception, it can rethrow the error using throw error so that higher-level caller functions can handle it."
      },
      {
        "question": "How do you handle errors in asynchronous Promise chains?",
        "answer": "In Promise chains, attach a .catch() handler at the end of the chain. In async/await functions, wrap the awaited calls inside a standard try/catch block."
      }
    ],
    "relatedExamples": [
      "try-catch",
      "throw-error",
      "async-await"
    ]
  },
  {
    "id": "array-reduce",
    "title": "The JavaScript Array reduce() Method: Complete Guide",
    "seoTitle": "JavaScript Array reduce() Method Explained (with Examples)",
    "seoDescription": "Master Array.prototype.reduce() in JavaScript. Learn accumulator mechanics, summing numbers, grouping objects, and flattening arrays with practical examples.",
    "description": "The Array.prototype.reduce() method executes a user-supplied reducer callback function on each element of the array in order, passing in the return value from the calculation on the preceding element, culminating in a single output value.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is Array.prototype.reduce()?\n\nThe `reduce()` method is one of JavaScript's most powerful functional array utilities. It iterates across an array and executes an accumulator callback on each element, compressing the entire array into a single accumulated value—such as a number, string, array, or dictionary object.\n\n---\n\n## Syntax and Anatomy of reduce()\n\n```javascript\narray.reduce((accumulator, currentValue, currentIndex, array) => {\n  return updatedAccumulator;\n}, initialValue);\n```\n\n1. **`accumulator`**: The accumulated value returned from the previous iteration callback (or `initialValue` on the first pass).\n2. **`currentValue`**: The current array element being processed.\n3. **`initialValue`**: **Crucial parameter**. The starting value of the accumulator. If omitted, `reduce()` defaults to using the first element of the array, which can cause runtime crashes on empty arrays.\n\n---\n\n## 3 Practical Real-World reduce() Patterns\n\n### 1. Summing Array Totals\n```javascript\nconst expenses = [45, 12, 89, 24];\nconst totalCost = expenses.reduce((acc, curr) => acc + curr, 0);\nconsole.log(totalCost); // 170\n```\n\n### 2. Grouping Objects by Property (Categorization)\n```javascript\nconst inventory = [\n  { name: \"Apple\", category: \"Fruit\" },\n  { name: \"Carrot\", category: \"Vegetable\" },\n  { name: \"Banana\", category: \"Fruit\" }\n];\n\nconst grouped = inventory.reduce((acc, item) => {\n  acc[item.category] = acc[item.category] || [];\n  acc[item.category].push(item.name);\n  return acc;\n}, {});\n\nconsole.log(grouped);\n// { Fruit: [\"Apple\", \"Banana\"], Vegetable: [\"Carrot\"] }\n```\n\n### 3. Counting Frequency of Items\n```javascript\nconst votes = [\"yes\", \"no\", \"yes\", \"yes\", \"no\"];\nconst tally = votes.reduce((acc, vote) => {\n  acc[vote] = (acc[vote] || 0) + 1;\n  return acc;\n}, {});\n\nconsole.log(tally); // { yes: 3, no: 2 }\n```\n\n---\n\n## Common Mistakes with reduce()\n\n1. **Omitting the initialValue on empty arrays**: Calling `[].reduce((a, b) => a + b)` throws a fatal `TypeError: Reduce of empty array with no initial value`. Always provide an initial value.\n2. **Forgetting to return the accumulator**: If you omit `return acc` inside your callback, the accumulator becomes `undefined` on the next iteration pass.\n",
    "codeSnippet": "// Grouping and Summing with reduce()\nconst transactions = [\n  { type: \"deposit\", amount: 100 },\n  { type: \"withdrawal\", amount: 40 },\n  { type: \"deposit\", amount: 250 }\n];\n\nconst balanceSummary = transactions.reduce(\n  (acc, txn) => {\n    if (txn.type === \"deposit\") acc.totalDeposits += txn.amount;\n    else acc.totalWithdrawals += txn.amount;\n    acc.netBalance = acc.totalDeposits - acc.totalWithdrawals;\n    return acc;\n  },\n  { totalDeposits: 0, totalWithdrawals: 0, netBalance: 0 }\n);\n\nconsole.log(balanceSummary);\n// { totalDeposits: 350, totalWithdrawals: 40, netBalance: 310 }",
    "faq": [
      {
        "question": "Why should you always supply an initialValue to reduce()?",
        "answer": "Supplying an initial value prevents fatal TypeError crashes when reducing empty arrays, and ensures that the accumulator starts with the expected data type (such as an empty object {} or number 0)."
      },
      {
        "question": "What happens if you forget to return the accumulator in reduce()?",
        "answer": "If your reducer callback does not return a value, the accumulator becomes undefined on the subsequent iteration, typically resulting in a runtime TypeError."
      },
      {
        "question": "Can reduce() replace map() and filter()?",
        "answer": "Yes. Any transformation achievable with map() and filter() can technically be performed in a single pass using reduce(). However, using map and filter directly is often more readable unless optimizing high-volume array operations."
      }
    ],
    "relatedExamples": [
      "array-reduce",
      "array-map",
      "array-filter"
    ]
  },
  {
    "id": "this-keyword",
    "title": "The JavaScript 'this' Keyword Explained: Complete Guide",
    "seoTitle": "The JavaScript 'this' Keyword Explained (with Examples)",
    "seoDescription": "Demystify JavaScript's this keyword. Learn how execution contexts, object methods, call(), apply(), bind(), and arrow functions determine this binding.",
    "description": "In JavaScript, the this keyword refers to the execution context of the currently executing function. Its value is determined dynamically by how a function is invoked, except in arrow functions which bind this lexically.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is the 'this' keyword in JavaScript?\n\nThe **`this`** keyword is a special identifier automatically defined in the scope of every JavaScript execution context. Unlike lexical variables that resolve where they were authored on disk, a regular function's `this` binding is determined dynamically based on **how and where the function is called** at runtime.\n\n---\n\n## 4 Rules of 'this' Binding in JavaScript\n\nJavaScript determines `this` using four established precedence rules:\n\n| Rule | Invocation Example | What `this` refers to |\n| :--- | :--- | :--- |\n| **1. Default Binding** | Standalone call: `showName()` | `window` (browser) or `undefined` (in strict mode `\"use strict\"`) |\n| **2. Implicit Binding** | Method call: `user.showName()` | The host object preceding the dot (`user`) |\n| **3. Explicit Binding** | `func.call(obj)`, `.apply()`, `.bind()` | The specific object passed into the call method |\n| **4. `new` Binding** | Constructor: `new User()` | The newly created instance object |\n\n---\n\n## Explicit Binding: call vs apply vs bind\n\nJavaScript provides three prototype methods to manually define what `this` points to:\n\n```javascript\nfunction introduce(greeting, punctuation) {\n  return `${greeting}, my name is ${this.name}${punctuation}`;\n}\n\nconst person = { name: \"Alex\" };\n\n// 1. call: invokes immediately with comma-separated arguments\nconsole.log(introduce.call(person, \"Hello\", \"!\")); // \"Hello, my name is Alex!\"\n\n// 2. apply: invokes immediately with array of arguments\nconsole.log(introduce.apply(person, [\"Hi\", \".\"])); // \"Hi, my name is Alex.\"\n\n// 3. bind: returns a new permanently bound function for later invocation\nconst boundIntroduce = introduce.bind(person, \"Hey\");\nconsole.log(boundIntroduce(\"!\")); // \"Hey, my name is Alex!\"\n```\n\n---\n\n## How Arrow Functions Handle 'this'\n\nArrow functions fundamentally bypass the four rules above. An arrow function **does not possess its own `this` context**. Instead, it looks up `this` lexically from its enclosing parent scope, exactly like a normal variable:\n\n```javascript\nconst timer = {\n  seconds: 0,\n  start() {\n    // Arrow function captures 'this' from start() method (timer object)\n    setInterval(() => {\n      this.seconds++;\n      console.log(this.seconds);\n    }, 1000);\n  }\n};\n```\n",
    "codeSnippet": "// Demonstrating 'this' Binding\nconst account = {\n  holder: \"Alex\",\n  balance: 500,\n  getBalance() {\n    return `${this.holder} has $${this.balance}`;\n  }\n};\n\nconsole.log(account.getBalance()); // \"Alex has $500\"\n\n// Losing context when assigning method to variable\nconst unboundGetBalance = account.getBalance;\n// console.log(unboundGetBalance()); // TypeError in strict mode\n\n// Restoring context with bind()\nconst boundGetBalance = account.getBalance.bind(account);\nconsole.log(boundGetBalance()); // \"Alex has $500\"",
    "faq": [
      {
        "question": "Why does this become undefined in strict mode?",
        "answer": "In standard (non-strict) mode, a standalone function call sets this to the global object (window or globalThis). In strict mode ('use strict'), default binding sets this to undefined to prevent accidental global pollution."
      },
      {
        "question": "What is the difference between call(), apply(), and bind()?",
        "answer": "call() and apply() invoke the function immediately (call accepts comma-separated arguments while apply accepts an array of arguments). bind() does not invoke the function immediately; it returns a new bound function with this permanently set."
      },
      {
        "question": "Why shouldn't you use arrow functions as object methods?",
        "answer": "Because arrow functions inherit this from the surrounding lexical scope (typically the global window or module scope) rather than binding to the object instance, leading to unexpected undefined property access."
      }
    ],
    "relatedExamples": [
      "basic-function",
      "arrow-function",
      "object-basics"
    ]
  },
  {
    "id": "objects",
    "title": "JavaScript Objects Guide: Keys, Values & Manipulation",
    "seoTitle": "JavaScript Objects Guide: Properties, Methods & Prototypes",
    "seoDescription": "Master JavaScript objects. Learn key-value data structures, dot and bracket notation, Object.keys/values/entries, and shallow vs deep cloning.",
    "description": "A JavaScript object is a standalone entity consisting of key-value properties. Keys are strings or symbols, and values can be any data type, including primitive types, arrays, functions, and nested objects.",
    "datePublished": "2026-10-09T00:00:00Z",
    "dateModified": "2026-10-12T00:00:00Z",
    "content": "\n## What is an object in JavaScript?\n\nIn JavaScript, an **object** is a non-primitive data structure that stores collections of keyed data values and complex entities. Objects are declared primarily using object literal syntax `{ ... }`, where properties consist of key-value pairs separated by commas.\n\n---\n\n## Property Access: Dot Notation vs Bracket Notation\n\nJavaScript supports two ways to access and assign object properties:\n\n1. **Dot Notation (`obj.key`)**: Standard, concise syntax used when the property key is a known, valid identifier without spaces or special characters.\n2. **Bracket Notation (`obj[\"key\"]`)**: Required when property keys contain spaces, hyphens, start with numbers, or when the key is evaluated dynamically from a variable.\n\n```javascript\nconst user = {\n  name: \"Alex\",\n  \"account-type\": \"premium\"\n};\n\nconsole.log(user.name); // Dot notation\nconsole.log(user[\"account-type\"]); // Bracket notation required for hyphens\n\nconst dynamicKey = \"name\";\nconsole.log(user[dynamicKey]); // \"Alex\"\n```\n\n---\n\n## Built-in Static Object Methods\n\nModern JavaScript provides powerful utilities on the global `Object` constructor for iterating and inspecting keys and values:\n\n- **`Object.keys(obj)`**: Returns an array of the object's own enumerable string-keyed property names.\n- **`Object.values(obj)`**: Returns an array of the object's own enumerable property values.\n- **`Object.entries(obj)`**: Returns an array of key-value pairs: `[['name', 'Alex'], ['role', 'Admin']]`.\n- **`Object.assign(target, ...sources)`**: Copies all enumerable own properties from source objects to a target object.\n- **`Object.freeze(obj)`**: Freezes an object, preventing new properties from being added, removed, or modified.\n\n---\n\n## Shallow Copying vs Deep Copying Objects\n\n- **Shallow Copy (`{ ...obj }`)**: Copies top-level properties. If a property references another object, both copies reference the same nested memory.\n- **Deep Copy (`structuredClone(obj)`)**: Recursively duplicates the entire object tree, ensuring full isolation between objects.\n",
    "codeSnippet": "// Object Methods in Practice\nconst userProfile = {\n  id: 101,\n  name: \"Alex Mercer\",\n  role: \"Engineer\"\n};\n\n// Iterating entries\nObject.entries(userProfile).forEach(([key, value]) => {\n  console.log(`${key.toUpperCase()}: ${value}`);\n});\n\n// Safe cloning with structuredClone\nconst userCopy = structuredClone(userProfile);\nuserCopy.name = \"Jordan\";\nconsole.log(\"Original:\", userProfile.name); // \"Alex Mercer\"\nconsole.log(\"Copy:\", userCopy.name);         // \"Jordan\"",
    "faq": [
      {
        "question": "When should you use bracket notation instead of dot notation?",
        "answer": "Use bracket notation when property names contain spaces or special characters (obj['user-id']), start with numbers, or when accessing properties dynamically via variables (obj[dynamicKey])."
      },
      {
        "question": "What does Object.freeze() do in JavaScript?",
        "answer": "Object.freeze() makes an object shallowly immutable. It prevents adding new properties, deleting existing properties, or modifying values of existing properties."
      },
      {
        "question": "How do you check if a property exists on an object?",
        "answer": "Use Object.hasOwn(object, 'propertyName') or the in operator ('propertyName' in object). Object.hasOwn is the modern ES2022 standard, replacing the older hasOwnProperty."
      }
    ],
    "relatedExamples": [
      "object-basics",
      "object-destructuring",
      "object-spread"
    ]
  }
];

export function getLearnTopicById(id: string): LearnTopic | undefined {
  return learnTopics.find(topic => topic.id === id);
}
