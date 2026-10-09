import { CodeExample } from "../types/example";

export const basicsExamples: CodeExample[] = [
  {
    id: "hello-world",
    title: "Hello World",
    description: "The classic first program. Print a message to the console.",
    category: "basics",
    difficulty: "beginner",
    tags: ["console", "printing", "basics"],
    explanation:
      "The `console.log()` method is the standard way to print output to the browser console. It can print strings, numbers, objects, and other data types, making it the most fundamental debugging tool in JavaScript.",
    expectedOutput: '"Hello, World!" printed to the console.',
    commonMistakes: [
      "Forgetting the closing parenthesis or quotation marks.",
      "Misspelling console as Console (case-sensitive).",
    ],
    faq: [
      {
        question: "What does console.log do?",
        answer: "It prints information to the debugging console.",
      },
    ],
    relatedSlugs: ["variables"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Hello World in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.568Z",
    code: `console.log("Hello World!");`,
  },
  {
    id: "variables",
    title: "Variables",
    description: "Learn how to declare variables using const and let.",
    category: "basics",
    difficulty: "beginner",
    tags: ["variables", "const", "let"],
    explanation:
      "Variables in JavaScript store data values. Modern JavaScript uses `let` for variables that can change and `const` for variables that remain constant. The older `var` keyword should generally be avoided.",
    expectedOutput: "The values of the declared variables printed out.",
    commonMistakes: [
      "Trying to reassign a const variable.",
      "Using var instead of let or const, causing scoping issues.",
    ],
    faq: [
      {
        question: "When should I use const vs let?",
        answer:
          "Use const by default, and let only when you know the value will change.",
      },
    ],
    relatedSlugs: ["hello-world"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Variables in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.568Z",
    code: `const name = "Suresh";
const age = 30;

console.log(name);
console.log(age);`,
  },
  {
    id: "template-literals",
    title: "Template Literals",
    description: "Embed expressions inside string literals.",
    category: "basics",
    difficulty: "beginner",
    tags: ["strings", "interpolation"],
    explanation:
      "Template literals use backticks (`) instead of quotes to define strings. They allow you to embed expressions directly inside the string using `${}` syntax, avoiding messy string concatenation with plus signs.",
    expectedOutput: "A formatted string combining variables into a sentence.",
    commonMistakes: [
      "Using normal single quotes instead of backticks.",
      "Forgetting the $ sign before the curly braces.",
    ],
    faq: [
      {
        question: "Can template literals span multiple lines?",
        answer:
          "Yes, template literals preserve line breaks without needing \\n.",
      },
    ],
    relatedSlugs: ["variables"],
    learnGuideSlug: "template-literals",
    seoDescription:
      "Learn and interact with Template Literals in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.568Z",
    code: `const name = "Suresh";
const message = \`Hello, \${name}!\`;

console.log(message);`,
  },
  {
    id: "conditional-statements",
    title: "Conditional Statements",
    description:
      "Execute different code paths based on conditions using if/else.",
    category: "basics",
    difficulty: "beginner",
    tags: ["if", "else", "logic"],
    explanation:
      "Conditional statements execute different blocks of code based on whether a condition is true or false. The `if...else` structure is the most common way to handle branching logic in JavaScript.",
    expectedOutput:
      "A specific message depending on which condition evaluates to true.",
    commonMistakes: [
      "Using a single equals sign (=) instead of double/triple equals (===) for comparison.",
      "Forgetting curly braces around multi-line blocks.",
    ],
    faq: [
      {
        question: "What is the difference between == and ===?",
        answer:
          "Triple equals (===) checks both value and type, while double equals (==) performs type coercion.",
      },
    ],
    relatedSlugs: ["variables"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Conditional Statements in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.568Z",
    code: `const age = 20;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}`,
  },
];
