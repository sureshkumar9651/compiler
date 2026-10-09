const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src/features/examples/data');

const enrichExample = (id, title) => {
  const d = new Date().toISOString();
  let explanation = '';
  let expectedOutput = '';
  let commonMistakes = [];
  let faq = [];
  let relatedSlugs = [];
  let learnGuideSlug = '';

  switch(id) {
    case 'hello-world':
      explanation = 'The `console.log()` method is the standard way to print output to the browser console. It can print strings, numbers, objects, and other data types, making it the most fundamental debugging tool in JavaScript.';
      expectedOutput = '"Hello, World!" printed to the console.';
      commonMistakes = [
        'Forgetting the closing parenthesis or quotation marks.',
        'Misspelling console as Console (case-sensitive).'
      ];
      faq = [
        { question: 'What does console.log do?', answer: 'It prints information to the debugging console.' }
      ];
      relatedSlugs = ['variables'];
      learnGuideSlug = 'variables';
      break;
    case 'variables':
      explanation = 'Variables in JavaScript store data values. Modern JavaScript uses `let` for variables that can change and `const` for variables that remain constant. The older `var` keyword should generally be avoided.';
      expectedOutput = 'The values of the declared variables printed out.';
      commonMistakes = [
        'Trying to reassign a const variable.',
        'Using var instead of let or const, causing scoping issues.'
      ];
      faq = [
        { question: 'When should I use const vs let?', answer: 'Use const by default, and let only when you know the value will change.' }
      ];
      relatedSlugs = ['hello-world'];
      learnGuideSlug = 'variables';
      break;
    case 'template-literals':
      explanation = 'Template literals use backticks (`) instead of quotes to define strings. They allow you to embed expressions directly inside the string using `${}` syntax, avoiding messy string concatenation with plus signs.';
      expectedOutput = 'A formatted string combining variables into a sentence.';
      commonMistakes = [
        'Using normal single quotes instead of backticks.',
        'Forgetting the $ sign before the curly braces.'
      ];
      faq = [
        { question: 'Can template literals span multiple lines?', answer: 'Yes, template literals preserve line breaks without needing \\n.' }
      ];
      relatedSlugs = ['variables'];
      learnGuideSlug = 'template-literals';
      break;
    case 'conditional-statements':
      explanation = 'Conditional statements execute different blocks of code based on whether a condition is true or false. The `if...else` structure is the most common way to handle branching logic in JavaScript.';
      expectedOutput = 'A specific message depending on which condition evaluates to true.';
      commonMistakes = [
        'Using a single equals sign (=) instead of double/triple equals (===) for comparison.',
        'Forgetting curly braces around multi-line blocks.'
      ];
      faq = [
        { question: 'What is the difference between == and ===?', answer: 'Triple equals (===) checks both value and type, while double equals (==) performs type coercion.' }
      ];
      relatedSlugs = ['variables'];
      learnGuideSlug = 'variables';
      break;
    case 'object-basics':
      explanation = 'Objects are collections of key-value pairs used to store related data and functions. They are the fundamental data structure in JavaScript, allowing you to model complex entities.';
      expectedOutput = 'Properties of the object accessed and printed.';
      commonMistakes = [
        'Forgetting commas between properties.',
        'Trying to use a hyphen in an unquoted key name.'
      ];
      faq = [
        { question: 'How do I access an object property?', answer: 'You can use dot notation (object.key) or bracket notation (object["key"]).' }
      ];
      relatedSlugs = ['object-destructuring'];
      learnGuideSlug = 'objects';
      break;
    case 'object-destructuring':
      explanation = 'Object destructuring is a convenient syntax that allows you to unpack properties from objects into distinct variables. It makes your code cleaner, especially when working with large objects or API responses.';
      expectedOutput = 'Variables extracted from the object printed to the console.';
      commonMistakes = [
        'Using square brackets instead of curly braces for object destructuring.',
        'Trying to destructure a property that does not exist (results in undefined).'
      ];
      faq = [
        { question: 'Can I rename a variable while destructuring?', answer: 'Yes, use a colon to rename it: { oldName: newName } = object.' }
      ];
      relatedSlugs = ['object-basics', 'object-spread'];
      learnGuideSlug = 'destructuring';
      break;
    case 'object-spread':
      explanation = 'The spread syntax (...) allows you to copy or merge objects. When used in object literals, it expands the properties of an existing object into a new object, which is essential for immutable state updates.';
      expectedOutput = 'A newly merged object combining properties from multiple sources.';
      commonMistakes = [
        'Assuming spread does a deep clone (it only does a shallow clone).',
        'Overwriting intended properties by placing the spread operator last.'
      ];
      faq = [
        { question: 'Does object spread copy nested objects?', answer: 'No, it only creates a shallow copy. Nested objects are still referenced.' }
      ];
      relatedSlugs = ['object-basics'];
      learnGuideSlug = 'spread-rest';
      break;
    case 'try-catch':
      explanation = 'The `try...catch` statement handles execution errors gracefully. Code that might throw an error goes in the try block, and the catch block executes if an error occurs, preventing the script from crashing.';
      expectedOutput = 'An error message caught and logged instead of halting execution.';
      commonMistakes = [
        'Leaving the catch block completely empty (swallowing errors).',
        'Wrapping too much code in a single try block, making it hard to identify the failure.'
      ];
      faq = [
        { question: 'What is the finally block used for?', answer: 'It executes code after try and catch, regardless of whether an error occurred.' }
      ];
      relatedSlugs = ['throw-error'];
      learnGuideSlug = 'error-handling';
      break;
    case 'throw-error':
      explanation = 'The `throw` statement allows you to create custom errors. You can throw exceptions when invalid input is provided or when a specific condition fails, which can then be caught by a try...catch block higher up.';
      expectedOutput = 'A custom error thrown and handled by the catch block.';
      commonMistakes = [
        'Throwing strings instead of Error objects (throw new Error("msg")).',
        'Forgetting to document what errors a function might throw.'
      ];
      faq = [
        { question: 'Why throw an Error object instead of a string?', answer: 'An Error object contains a stack trace, which is crucial for debugging.' }
      ];
      relatedSlugs = ['try-catch'];
      learnGuideSlug = 'error-handling';
      break;
    case 'promise-basic':
      explanation = 'A Promise represents the eventual completion or failure of an asynchronous operation. It allows you to attach `.then()` and `.catch()` handlers to run code once the async task finishes, avoiding callback hell.';
      expectedOutput = 'A successful resolution message or a caught error message.';
      commonMistakes = [
        'Forgetting to return a value inside a .then() block.',
        'Not attaching a .catch() handler, resulting in unhandled promise rejections.'
      ];
      faq = [
        { question: 'What are the three states of a Promise?', answer: 'Pending, fulfilled, and rejected.' }
      ];
      relatedSlugs = ['async-await'];
      learnGuideSlug = 'promises';
      break;
    case 'async-await':
      explanation = 'The `async` and `await` keywords provide a cleaner, more readable way to write asynchronous code. They allow you to write promise-based code as if it were synchronous, pausing execution until the promise resolves.';
      expectedOutput = 'Data fetched or processed asynchronously, logged in sequence.';
      commonMistakes = [
        'Forgetting to make the parent function async when using await.',
        'Not wrapping await calls in a try...catch block for error handling.'
      ];
      faq = [
        { question: 'Can I use await outside of an async function?', answer: 'Yes, top-level await is supported in modern ES modules.' }
      ];
      relatedSlugs = ['promise-basic'];
      learnGuideSlug = 'promises';
      break;
    case 'set-timeout':
      explanation = 'The `setTimeout` function schedules code to execute after a specified delay in milliseconds. It is a fundamental part of the JavaScript event loop, used for delaying actions or polling.';
      expectedOutput = 'A message logged immediately, followed by another after a delay.';
      commonMistakes = [
        'Passing a function call instead of a function reference (e.g., setTimeout(myFunc(), 1000)).',
        'Assuming the delay is exact (it is a minimum delay, not a guaranteed exact time).'
      ];
      faq = [
        { question: 'How do I cancel a timeout?', answer: 'Save the timeout ID and pass it to clearTimeout(id).' }
      ];
      relatedSlugs = ['promise-basic'];
      learnGuideSlug = 'promises';
      break;
    case 'array-map':
      explanation = 'The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array. It is perfect for transforming data without mutating the original array.';
      expectedOutput = 'A new array with transformed values based on the original array.';
      commonMistakes = [
        'Forgetting to return a value inside the map callback.',
        'Using map when you don\'t need a new array (use forEach instead).'
      ];
      faq = [
        { question: 'Does map change the original array?', answer: 'No, map returns a completely new array.' }
      ];
      relatedSlugs = ['array-filter'];
      learnGuideSlug = 'map-vs-foreach';
      break;
    case 'array-filter':
      explanation = 'The `filter()` method creates a new array with all elements that pass the test implemented by the provided function. It is commonly used to remove unwanted items or search for specific data.';
      expectedOutput = 'A new array containing only the elements that met the condition.';
      commonMistakes = [
        'Returning the item itself instead of a boolean value in the callback.',
        'Modifying the original array during filtering (which can cause unpredictable results).'
      ];
      faq = [
        { question: 'What happens if no elements pass the filter?', answer: 'It returns an empty array, not undefined or null.' }
      ];
      relatedSlugs = ['array-map'];
      learnGuideSlug = 'map-vs-foreach';
      break;
    case 'array-reduce':
      explanation = 'The `reduce()` method executes a "reducer" callback function on each element of the array, passing in the return value from the calculation on the preceding element. It is powerful for aggregating data into a single value.';
      expectedOutput = 'A single aggregated value, such as a sum or a completely new object structure.';
      commonMistakes = [
        'Forgetting to provide an initial value, which can cause type errors on empty arrays.',
        'Not returning the accumulator in the callback function.'
      ];
      faq = [
        { question: 'When should I use reduce instead of map?', answer: 'Use reduce when you need to combine an array into a single value or object.' }
      ];
      relatedSlugs = ['array-map'];
      learnGuideSlug = 'array-reduce';
      break;
    case 'array-find':
      explanation = 'The `find()` method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.';
      expectedOutput = 'The first matching object or element from the array.';
      commonMistakes = [
        'Expecting find to return multiple items (use filter for that).',
        'Not handling the case where find returns undefined.'
      ];
      faq = [
        { question: 'How is find different from filter?', answer: 'find returns the first matching element, filter returns an array of all matches.' }
      ];
      relatedSlugs = ['array-filter'];
      learnGuideSlug = 'map-vs-foreach';
      break;
    case 'basic-function':
      explanation = 'Functions are reusable blocks of code designed to perform a particular task. They are defined with the `function` keyword, followed by a name, parameters, and a code block.';
      expectedOutput = 'The return value of the function executed with provided arguments.';
      commonMistakes = [
        'Forgetting the return keyword, causing the function to return undefined.',
        'Not passing the correct number of arguments when calling the function.'
      ];
      faq = [
        { question: 'Can functions be assigned to variables?', answer: 'Yes, these are called function expressions.' }
      ];
      relatedSlugs = ['arrow-function'];
      learnGuideSlug = 'variables'; // or closures
      break;
    case 'arrow-function':
      explanation = 'Arrow functions provide a more concise syntax for writing function expressions. They lack their own `this` binding, making them highly suitable for callbacks and functional programming patterns.';
      expectedOutput = 'The result of the concise arrow function execution.';
      commonMistakes = [
        'Trying to use the "this" keyword inside an arrow function as an object method.',
        'Adding curly braces but forgetting the explicit return keyword.'
      ];
      faq = [
        { question: 'When should I avoid arrow functions?', answer: 'Avoid them when defining methods on objects where you need to access "this".' }
      ];
      relatedSlugs = ['basic-function'];
      learnGuideSlug = 'this-keyword';
      break;
    case 'default-parameters':
      explanation = 'Default parameters allow named parameters to be initialized with default values if no value or undefined is passed to the function, helping prevent errors from missing arguments.';
      expectedOutput = 'The function executing successfully using the fallback default value.';
      commonMistakes = [
        'Placing default parameters before required parameters (always put them last).',
        'Assuming null triggers a default parameter (only undefined triggers it).'
      ];
      faq = [
        { question: 'Can default parameters be dynamic?', answer: 'Yes, you can use expressions or even function calls as default values.' }
      ];
      relatedSlugs = ['basic-function'];
      learnGuideSlug = 'variables';
      break;
    case 'optional-chaining':
      explanation = 'The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.';
      expectedOutput = 'The nested value, or undefined if a parent property is missing.';
      commonMistakes = [
        'Overusing optional chaining when a property is strictly required by the application.',
        'Using ?. instead of a regular dot for top-level variables that might be undeclared.'
      ];
      faq = [
        { question: 'Does optional chaining work with arrays and functions?', answer: 'Yes, you can use arr?.[0] and func?.() safely.' }
      ];
      relatedSlugs = ['object-basics'];
      learnGuideSlug = 'objects';
      break;
    case 'reverse-string':
      explanation = 'Reversing a string is a classic algorithmic challenge. In JavaScript, the most common approach is to split the string into an array, reverse the array, and join it back into a string.';
      expectedOutput = 'The reversed version of the input string.';
      commonMistakes = [
        'Trying to reverse a string directly without converting it to an array first.',
        'Not accounting for multi-byte Unicode characters (emojis).'
      ];
      faq = [
        { question: 'Is split, reverse, join the fastest way?', answer: 'It is the most readable. A manual loop can sometimes be marginally faster.' }
      ];
      relatedSlugs = ['palindrome'];
      learnGuideSlug = 'variables';
      break;
    case 'palindrome':
      explanation = 'A palindrome is a word or phrase that reads the same backward as forward. Checking for palindromes involves cleaning the string (removing spaces/punctuation) and comparing it to its reversed self.';
      expectedOutput = 'A boolean indicating whether the string is a palindrome.';
      commonMistakes = [
        'Forgetting to convert all letters to lowercase before comparing.',
        'Not stripping out whitespace or punctuation marks.'
      ];
      faq = [
        { question: 'How do I remove all non-alphanumeric characters?', answer: 'Use a regular expression like str.replace(/[^a-z0-9]/gi, "").' }
      ];
      relatedSlugs = ['reverse-string'];
      learnGuideSlug = 'variables';
      break;
    case 'fizzbuzz':
      explanation = 'FizzBuzz is a common programming interview question. It prints numbers from 1 to 100, replacing multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".';
      expectedOutput = 'A sequence of numbers and Fizz/Buzz words printed to the console.';
      commonMistakes = [
        'Checking for 3 or 5 before checking for 15 (FizzBuzz must be checked first).',
        'Using multiple independent if statements instead of if/else if.'
      ];
      faq = [
        { question: 'Why check for 15 first?', answer: 'Because 15 is divisible by both 3 and 5. If you check 3 first, it will never reach the 15 check.' }
      ];
      relatedSlugs = ['conditional-statements'];
      learnGuideSlug = 'variables';
      break;
    case 'factorial':
      explanation = 'The factorial of a non-negative integer is the product of all positive integers less than or equal to n. It can be calculated using a recursive function or a simple loop.';
      expectedOutput = 'The calculated factorial integer.';
      commonMistakes = [
        'Forgetting the base case in a recursive solution, leading to a stack overflow.',
        'Not handling 0! which mathematically equals 1.'
      ];
      faq = [
        { question: 'Which is better, recursion or a loop?', answer: 'A loop avoids call stack limits, but recursion is mathematically cleaner.' }
      ];
      relatedSlugs = ['fizzbuzz'];
      learnGuideSlug = 'variables';
      break;
    default:
      explanation = `Learn how to use ${title} in JavaScript with this interactive example.`;
      expectedOutput = 'The expected output of the code.';
      commonMistakes = ['Syntax errors', 'Logical errors'];
      faq = [{ question: 'How does it work?', answer: 'Run the code to see it in action.' }];
      relatedSlugs = [];
      learnGuideSlug = 'variables';
  }

  return {
    explanation,
    expectedOutput,
    commonMistakes,
    faq,
    relatedSlugs,
    learnGuideSlug,
    seoDescription: `Learn and interact with ${title} in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.`,
    datePublished: '2026-10-09T00:00:00Z',
    dateModified: d
  };
};

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));
files.forEach(file => {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // A naive regex to replace/add properties on the objects inside the array.
  // It's safer to use string replacement since we just want to add fields before the closing brace of each object.
  // However, some objects are complex. Let's just find `tags: [...]` and inject the new fields after it.
  
  // We'll replace `tags: [.*?],` with `tags: [...], \n explanation: "...", ...`
  // Because tags can be multi-line or single-line, we match `tags: [^\]]*],?`
  
  // Let's use a replacer function
  content = content.replace(/id:\s*'([^']+)',\s*title:\s*'([^']+)'([\s\S]*?)tags:\s*\[([^\]]*)\]/g, (match, id, title, mid, tags) => {
    const ext = enrichExample(id, title);
    
    return `id: '${id}',\n    title: '${title}'${mid}tags: [${tags}],
    explanation: \`${ext.explanation}\`,
    expectedOutput: \`${ext.expectedOutput}\`,
    commonMistakes: ${JSON.stringify(ext.commonMistakes)},
    faq: ${JSON.stringify(ext.faq)},
    relatedSlugs: ${JSON.stringify(ext.relatedSlugs)},
    learnGuideSlug: '${ext.learnGuideSlug}',
    seoDescription: \`${ext.seoDescription}\`,
    datePublished: '${ext.datePublished}',
    dateModified: '${ext.dateModified}'`;
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
