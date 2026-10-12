import { CodeExample } from "../types/example";

export const functionsExamples: CodeExample[] = [
  {
    id: "basic-function",
    title: "JavaScript Function Declaration & Invocation",
    seoTitle: "JavaScript Function Declaration & Invocation Example",
    seoDescription:
      "Learn how to declare, parameterize, and invoke JavaScript functions. Test arguments and return values live in our interactive browser JavaScript compiler.",
    description:
      "A JavaScript function declaration defines a reusable, parameterized subroutine using the function keyword. In JavaScript, functions are first-class values that can be assigned to variables, passed as arguments, and returned from other functions.",
    category: "functions",
    difficulty: "beginner",
    tags: ["function", "parameters", "return", "basics"],
    explanation:
      "Functions are the primary building blocks of modular JavaScript applications. Declaring a function with the `function` keyword creates an invocable object bound to the surrounding lexical scope. Function declarations are hoisted completely to the top of their enclosing scope, allowing them to be called before their syntactic declaration line. When invoked with arguments, parameter variables are initialized within the local execution frame, and the `return` statement terminates execution while passing a value back to the caller.",
    expectedOutput: "30",
    commonMistakes: [
      "Omitting the return statement, causing the function invocation to silently evaluate to undefined.",
      "Passing fewer arguments than formal parameters without default values, setting unsupplied parameters to undefined.",
      "Confusing function reference passing (add) with immediate function invocation (add(10, 20)).",
      "Declaring duplicate functions with the same identifier in the same scope, silently overwriting earlier implementations."
    ],
    faq: [
      {
        question: "What is function hoisting in JavaScript?",
        answer:
          "Function declarations are hoisted in their entirety to the top of their scope during compilation. This means you can invoke a declared function earlier in the source file than its definition line."
      },
      {
        question: "What happens if a JavaScript function has no return statement?",
        answer:
          "If a function finishes executing without hitting an explicit return statement, it implicitly returns undefined to the calling expression."
      },
      {
        question: "What is the difference between a parameter and an argument?",
        answer:
          "Parameters are the named identifier placeholders defined in the function signature. Arguments are the actual concrete values passed into the function when it is invoked."
      },
      {
        question: "Can a JavaScript function return multiple values?",
        answer:
          "A JavaScript function can only return a single value, but that value can be an array or an object containing multiple properties, which can then be unpacked using destructuring."
      }
    ],
    relatedSlugs: ["arrow-function", "default-parameters"],
    learnGuideSlug: "functions",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `function add(a, b) {
  return a + b;
}

console.log(add(10, 20));`,
  },
  {
    id: "arrow-function",
    title: "JavaScript Arrow Functions (ES6 Syntax)",
    seoTitle: "JavaScript Arrow Functions Syntax & Examples",
    seoDescription:
      "Master ES6 JavaScript arrow functions. Learn concise expression syntax, implicit returns, lexical this scoping, and run live interactive code examples.",
    description:
      "JavaScript arrow functions provide a concise syntax for writing function expressions using the => token. Unlike traditional functions, arrow functions do not bind their own this, arguments, or super, lexically capturing them from their enclosing scope.",
    category: "functions",
    difficulty: "beginner",
    tags: ["arrow-functions", "es6", "lexical-this", "functions"],
    explanation:
      "Introduced in ECMAScript 2015 (ES6), arrow functions (`() => {}`) provide an alternative to traditional function expressions. When an arrow function body consists of a single expression, the curly braces and `return` keyword can be omitted for an implicit return. Crucially, arrow functions establish lexical `this` binding: they do not create their own `this` context at runtime, making them the standard choice for array callbacks and timer methods.",
    expectedOutput: "20",
    commonMistakes: [
      "Attempting to return an object literal directly with () => { a: 1 }, which parses braces as a code block; wrap in parens () => ({ a: 1 }).",
      "Using arrow functions as object methods when access to the parent object via this is required.",
      "Attempting to instantiate an arrow function using the new keyword, throwing a TypeError: is not a constructor.",
      "Assuming arrow functions have access to the arguments object; use modern rest parameters (...args) instead."
    ],
    faq: [
      {
        question: "How does 'this' behave inside a JavaScript arrow function?",
        answer:
          "Arrow functions do not have their own this binding. Instead, they lexically capture the this value of the enclosing execution context at the time they are defined."
      },
      {
        question: "When should you NOT use arrow functions in JavaScript?",
        answer:
          "Avoid arrow functions when defining object methods that need to access other object properties via this, as prototype methods, or as constructor functions with the new keyword."
      },
      {
        question: "What is an implicit return in an arrow function?",
        answer:
          "When an arrow function has a one-line expression body without curly braces, that expression is automatically evaluated and returned without needing the return keyword."
      },
      {
        question: "Do arrow functions have a prototype property?",
        answer:
          "No. Arrow functions lack a prototype property and cannot be used as constructor functions with new."
      }
    ],
    relatedSlugs: ["basic-function", "default-parameters"],
    learnGuideSlug: "functions",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const multiply = (a, b) => a * b;

console.log(multiply(5, 4));`,
  },
  {
    id: "default-parameters",
    title: "JavaScript Default Parameters (ES6 Function Defaults)",
    seoTitle: "JavaScript Default Parameters: ES6 Syntax Guide",
    seoDescription:
      "Discover how JavaScript ES6 default parameters supply fallback argument values. Test parameterized functions live and inspect real terminal console output.",
    description:
      "JavaScript default parameters allow formal function parameters to be initialized with default values if no value or undefined is passed during invocation, preventing unexpected errors from missing arguments without defensive boilerplate.",
    category: "functions",
    difficulty: "beginner",
    tags: ["default-parameters", "es6", "functions", "arguments"],
    explanation:
      "Prior to ES6, developers had to write manual defensive checks like `name = name || 'World'` inside function bodies, which erroneously overwrote legitimate falsy values such as `0` or `\"\"`. ECMAScript 2015 default parameters (`function greet(name = 'World')`) evaluate fallback values strictly when the passed argument is either omitted or explicitly `undefined`. Default parameter expressions are evaluated at run time, meaning subsequent parameters can even reference preceding ones.",
    expectedOutput: "Hello, World!\nHello, Suresh!",
    commonMistakes: [
      "Placing default parameters before required parameters, forcing callers to pass undefined explicitly to access subsequent positional arguments.",
      "Assuming passing null triggers a default parameter; null is a deliberate value and will NOT trigger the default fallback (only undefined does).",
      "Referencing subsequent parameters within an earlier default parameter expression, causing a ReferenceError due to the Temporal Dead Zone.",
      "Mutating default object or array arguments in a way that creates unexpected state leakage across invocations."
    ],
    faq: [
      {
        question: "Does passing null trigger a default parameter in JavaScript?",
        answer:
          "No. Only undefined (or omitting the argument completely) triggers default parameter initialization. Passing null explicitly passes the null value."
      },
      {
        question: "Can default parameters be dynamic expressions or function calls?",
        answer:
          "Yes. Default parameter values are evaluated at call time, allowing you to use math expressions, variables from the outer scope, or helper function calls as defaults."
      },
      {
        question: "Can an earlier parameter be used in a later default parameter definition?",
        answer:
          "Yes. Later parameters have access to earlier parameters (e.g., function rect(width, height = width * 2)), but earlier parameters cannot access later ones."
      },
      {
        question: "How do default parameters affect the function.length property?",
        answer:
          "The function.length property only counts parameters declared before the first parameter with a default value, ignoring parameters that have default initializers."
      }
    ],
    relatedSlugs: ["basic-function", "arrow-function"],
    learnGuideSlug: "functions",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `function greet(name = "World") {
  return \`Hello, \${name}!\`;
}

console.log(greet());
console.log(greet("Suresh"));`,
  },
];
