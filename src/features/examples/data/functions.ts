import { CodeExample } from "../types/example";

export const functionsExamples: CodeExample[] = [
  {
    id: "basic-function",
    title: "Basic Function",
    description: "Declare and invoke a basic function with parameters.",
    category: "functions",
    difficulty: "beginner",
    tags: ["function", "parameters", "return"],
    explanation:
      "Functions are reusable blocks of code designed to perform a particular task. They are defined with the `function` keyword, followed by a name, parameters, and a code block.",
    expectedOutput:
      "The return value of the function executed with provided arguments.",
    commonMistakes: [
      "Forgetting the return keyword, causing the function to return undefined.",
      "Not passing the correct number of arguments when calling the function.",
    ],
    faq: [
      {
        question: "Can functions be assigned to variables?",
        answer: "Yes, these are called function expressions.",
      },
    ],
    relatedSlugs: ["arrow-function"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Basic Function in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.569Z",
    code: `function add(a, b) {
  return a + b;
}

console.log(add(10, 20));`,
  },
  {
    id: "arrow-function",
    title: "Arrow Function",
    description: "Use the concise arrow function syntax.",
    category: "functions",
    difficulty: "beginner",
    tags: ["arrow", "es6", "function"],
    explanation:
      "Arrow functions provide a more concise syntax for writing function expressions. They lack their own `this` binding, making them highly suitable for callbacks and functional programming patterns.",
    expectedOutput: "The result of the concise arrow function execution.",
    commonMistakes: [
      'Trying to use the "this" keyword inside an arrow function as an object method.',
      "Adding curly braces but forgetting the explicit return keyword.",
    ],
    faq: [
      {
        question: "When should I avoid arrow functions?",
        answer:
          'Avoid them when defining methods on objects where you need to access "this".',
      },
    ],
    relatedSlugs: ["basic-function"],
    learnGuideSlug: "this-keyword",
    seoDescription:
      "Learn and interact with Arrow Function in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.569Z",
    code: `const multiply = (a, b) => a * b;

console.log(multiply(5, 4));`,
  },
  {
    id: "default-parameters",
    title: "Default Parameters",
    description: "Provide default values for function parameters.",
    category: "functions",
    difficulty: "beginner",
    tags: ["default", "parameters", "es6"],
    explanation:
      "Default parameters allow named parameters to be initialized with default values if no value or undefined is passed to the function, helping prevent errors from missing arguments.",
    expectedOutput:
      "The function executing successfully using the fallback default value.",
    commonMistakes: [
      "Placing default parameters before required parameters (always put them last).",
      "Assuming null triggers a default parameter (only undefined triggers it).",
    ],
    faq: [
      {
        question: "Can default parameters be dynamic?",
        answer:
          "Yes, you can use expressions or even function calls as default values.",
      },
    ],
    relatedSlugs: ["basic-function"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Default Parameters in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.569Z",
    code: `function greet(name = "World") {
  return \`Hello, \${name}!\`;
}

console.log(greet());
console.log(greet("Suresh"));`,
  },
];
