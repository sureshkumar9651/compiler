import { CodeExample } from "../types/example";

export const basicsExamples: CodeExample[] = [
  {
    id: "hello-world",
    title: "JavaScript Hello World Program",
    seoTitle: "JavaScript Hello World Program (with Live Code Runner)",
    seoDescription:
      "Learn the classic JavaScript Hello World program. Understand console.log syntax, run code in our live browser playground, and debug common beginner errors.",
    description:
      "The JavaScript Hello World program is the foundational entry point for learning JavaScript. It uses the standard console.log() API to print text to the debugging console without requiring any external libraries or browser DOM manipulation.",
    category: "basics",
    difficulty: "beginner",
    tags: ["console", "printing", "basics", "beginner"],
    explanation:
      "In JavaScript, the `console.log()` function is part of the Console API provided by every modern web browser, Node.js runtime, and worker thread. When invoked, it serializes its arguments and writes them to the standard output or developer console stream. The string \"Hello World!\" is enclosed in double quotes (or single quotes, or backticks) to denote an immutable primitive string literal. Statements optionally terminate with a semicolon, adhering to standard ECMAScript stylistic conventions.",
    expectedOutput: "Hello World!",
    commonMistakes: [
      "Misspelling console as 'Console' with an uppercase C, which throws a ReferenceError in case-sensitive JavaScript.",
      "Forgetting closing quotation marks or parentheses, resulting in an uncaught SyntaxError: Unexpected token.",
      "Expecting console.log to render HTML elements on the web page body instead of outputting to the developer console.",
      "Omitting quotes around text strings, causing the JavaScript engine to treat text as an undeclared variable."
    ],
    faq: [
      {
        question: "What does console.log() do in JavaScript?",
        answer:
          "The console.log() method writes text, numerical values, or objects to the browser developer tools console or standard output. It is the most common diagnostic and debugging tool used during JavaScript development."
      },
      {
        question: "Can you run console.log without a browser?",
        answer:
          "Yes. You can execute console.log in any JavaScript runtime environment, including Node.js, Deno, Bun, and browser-based Web Workers like the JS CodeLab playground."
      },
      {
        question: "What is the difference between single quotes, double quotes, and backticks in JavaScript?",
        answer:
          "Single quotes ('') and double quotes (\"\") create standard string literals identically. Backticks (``) create template literals, allowing variable interpolation via ${} and multi-line formatting without escape characters."
      },
      {
        question: "Does console.log affect web application performance?",
        answer:
          "Extensive console.log statements inside tight execution loops or high-frequency animation frames can degrade rendering performance. Production builds typically strip or disable console statements."
      }
    ],
    relatedSlugs: ["variables", "template-literals", "basic-function"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `console.log("Hello World!");`,
  },
  {
    id: "variables",
    title: "JavaScript Variables (let vs const vs var)",
    seoTitle: "JavaScript Variables (let, const, var) Code Example",
    seoDescription:
      "Explore JavaScript variable declarations using const and let. Run live code, compare block scoping, and inspect exact output in our free online playground.",
    description:
      "JavaScript variables are named memory containers used to hold and manipulate data values throughout runtime execution. Modern JavaScript uses const for fixed identifier bindings and let for mutable variables, enforcing block scope and eliminating var.",
    category: "basics",
    difficulty: "beginner",
    tags: ["variables", "const", "let", "scoping"],
    explanation:
      "Modern JavaScript distinguishes between constant references and reassignable bindings. The `const` keyword creates an immutable identifier binding within block scope; once assigned, you cannot rebind the identifier to another value. The `let` keyword declares a block-scoped variable that can be freely reassigned. Both `const` and `let` adhere to the Temporal Dead Zone (TDZ), meaning they cannot be accessed prior to their declaration line in the source code.",
    expectedOutput: "Suresh\n30",
    commonMistakes: [
      "Attempting to reassign a variable declared with const, resulting in a TypeError: Assignment to constant variable.",
      "Using the legacy var keyword, which ignores block scopes (like if blocks and loops) and hoists uninitialized variables to undefined.",
      "Accessing a let or const variable before its declaration line, which triggers a ReferenceError due to the Temporal Dead Zone.",
      "Assuming const deeply freezes objects or arrays; const only prevents variable rebinding, not internal property mutations."
    ],
    faq: [
      {
        question: "When should I use const vs let in JavaScript?",
        answer:
          "Use const by default for all variable declarations to prevent accidental reassignment and improve code predictability. Use let exclusively when you know a value must be reassigned, such as loop counters or state flags."
      },
      {
        question: "Can you modify the properties of an object declared with const?",
        answer:
          "Yes. Declaring an object with const prevents reassigning the variable to a different object or memory reference, but its internal properties can still be modified, added, or deleted unless frozen with Object.freeze()."
      },
      {
        question: "Why should developers avoid the var keyword in modern code?",
        answer:
          "The var keyword is function-scoped rather than block-scoped, leaking outside of if statements and loops. It also permits accidental variable re-declarations and hoists values as undefined, causing difficult-to-trace bugs."
      },
      {
        question: "What is the Temporal Dead Zone (TDZ)?",
        answer:
          "The Temporal Dead Zone is the period between entering a scope block and the point where a let or const variable is formally declared. Accessing the identifier during this window throws an immediate ReferenceError."
      }
    ],
    relatedSlugs: ["hello-world", "template-literals", "conditional-statements"],
    learnGuideSlug: "variables",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const name = "Suresh";
const age = 30;

console.log(name);
console.log(age);`,
  },
  {
    id: "template-literals",
    title: "JavaScript Template Literals (String Interpolation)",
    seoTitle: "JavaScript Template Literals & String Interpolation",
    seoDescription:
      "Learn how to use JavaScript template literals with backtick syntax and ${} expression interpolation. Run code examples live and inspect real terminal output.",
    description:
      "JavaScript template literals are string literals delimited by backticks (`) that enable embedded expressions, multi-line string authoring, and string interpolation using the ${expression} syntax without cumbersome plus-sign concatenation.",
    category: "basics",
    difficulty: "beginner",
    tags: ["strings", "interpolation", "template-literals", "es6"],
    explanation:
      "Template literals were introduced in ECMAScript 2015 (ES6) to solve clumsy string concatenation. By enclosing text within backticks (`), developers can embed any valid JavaScript expression inside the `${...}` placeholder syntax. The JavaScript runtime automatically evaluates the embedded expressions, converts the results to strings, and interpolates them into the final output. Template literals also preserve literal line breaks and whitespace formatting.",
    expectedOutput: "Hello, Suresh!",
    commonMistakes: [
      "Using standard single quotes (') or double quotes (\") instead of backticks (`), which renders ${...} literally instead of evaluating it.",
      "Forgetting the dollar sign ($) before curly brackets, producing string text like '{name}' instead of the variable value.",
      "Writing overly complex expressions inside interpolation placeholders instead of computing them in helper variables beforehand.",
      "Accidentally introducing unintentional whitespace or indentation in multi-line template literal strings."
    ],
    faq: [
      {
        question: "Can template literals span multiple lines in JavaScript?",
        answer:
          "Yes. Unlike standard single or double-quoted strings, template literals preserve line breaks naturally without requiring explicit newline escape characters like \\n."
      },
      {
        question: "Can you call functions inside template literals?",
        answer:
          "Yes. Any valid JavaScript expression can be placed inside ${}, including function calls, mathematical calculations, ternary conditionals, and nested template literals."
      },
      {
        question: "What are tagged template literals?",
        answer:
          "Tagged template literals allow you to parse template strings using a custom function. Libraries like styled-components use tagged templates to process CSS strings with dynamic interpolation."
      }
    ],
    relatedSlugs: ["variables", "hello-world", "default-parameters"],
    learnGuideSlug: "template-literals",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const name = "Suresh";
const message = \`Hello, \${name}!\`;

console.log(message);`,
  },
  {
    id: "conditional-statements",
    title: "JavaScript if-else Conditional Statements",
    seoTitle: "JavaScript if...else Conditional Statements Example",
    seoDescription:
      "Master JavaScript if-else conditional statements. Learn strict equality comparisons, branching control flow, and test your code live in our online compiler.",
    description:
      "JavaScript conditional statements execute distinct blocks of code based on whether a specified condition evaluates to truthy or falsy. The if...else syntax provides structured branching control flow across all ECMAScript environments.",
    category: "basics",
    difficulty: "beginner",
    tags: ["if", "else", "branching", "conditionals"],
    explanation:
      "The `if...else` statement evaluates an expression inside parentheses. If the expression evaluates to a truthy value (any value except `false`, `0`, `\"\"`, `null`, `undefined`, or `NaN`), the subsequent block executes. Otherwise, control flows to an optional `else` or `else if` clause. Always use strict equality (`===`) rather than loose equality (`==`) to avoid unintended type coercion bugs.",
    expectedOutput: "Adult",
    commonMistakes: [
      "Using a single equals sign (=) for assignment inside an if condition instead of strict comparison (===).",
      "Using loose equality (==), which performs implicit type coercion and leads to subtle falsy value bugs.",
      "Omitting curly braces for single-line if statements, which creates security and maintainability risks.",
      "Neglecting truthy and falsy edge cases, such as empty arrays [] or empty objects {} evaluating to truthy."
    ],
    faq: [
      {
        question: "What is the difference between == and === in JavaScript?",
        answer:
          "The strict equality operator (===) compares both value and datatype without coercion. The loose equality operator (==) attempts implicit type conversion before comparing, which frequently yields unexpected truthy results."
      },
      {
        question: "What values are considered falsy in JavaScript?",
        answer:
          "There are exactly eight falsy values in JavaScript: false, 0, -0, 0n (BigInt), '' (empty string), null, undefined, and NaN. All other values, including empty arrays [] and objects {}, are truthy."
      },
      {
        question: "When should I use a ternary operator instead of if-else?",
        answer:
          "Use the ternary operator (condition ? trueVal : falseVal) for concise inline value assignments. Use if-else blocks when executing multi-statement logic or side effects."
      }
    ],
    relatedSlugs: ["variables", "fizzbuzz", "basic-function"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const age = 20;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}`,
  },
];
