import { CodeExample } from "../types/example";

export const errorExamples: CodeExample[] = [
  {
    id: "try-catch",
    title: "Try/Catch",
    description: "Catch and handle runtime errors gracefully.",
    category: "error-handling",
    difficulty: "beginner",
    tags: ["try", "catch", "error"],
    explanation:
      "The `try...catch` statement handles execution errors gracefully. Code that might throw an error goes in the try block, and the catch block executes if an error occurs, preventing the script from crashing.",
    expectedOutput:
      "An error message caught and logged instead of halting execution.",
    commonMistakes: [
      "Leaving the catch block completely empty (swallowing errors).",
      "Wrapping too much code in a single try block, making it hard to identify the failure.",
    ],
    faq: [
      {
        question: "What is the finally block used for?",
        answer:
          "It executes code after try and catch, regardless of whether an error occurred.",
      },
    ],
    relatedSlugs: ["throw-error"],
    learnGuideSlug: "error-handling",
    seoDescription:
      "Learn and interact with Try/Catch in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.568Z",
    code: `try {
  JSON.parse("invalid json");
} catch (error) {
  console.error("Failed to parse JSON");
  console.error(error);
}`,
  },
  {
    id: "throw-error",
    title: "Throw Error",
    description: "Throw a custom error when a condition is met.",
    category: "error-handling",
    difficulty: "beginner",
    tags: ["throw", "error", "exception"],
    explanation:
      "The `throw` statement allows you to create custom errors. You can throw exceptions when invalid input is provided or when a specific condition fails, which can then be caught by a try...catch block higher up.",
    expectedOutput: "A custom error thrown and handled by the catch block.",
    commonMistakes: [
      'Throwing strings instead of Error objects (throw new Error("msg")).',
      "Forgetting to document what errors a function might throw.",
    ],
    faq: [
      {
        question: "Why throw an Error object instead of a string?",
        answer:
          "An Error object contains a stack trace, which is crucial for debugging.",
      },
    ],
    relatedSlugs: ["try-catch"],
    learnGuideSlug: "error-handling",
    seoDescription:
      "Learn and interact with Throw Error in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.569Z",
    code: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

console.log(divide(10, 2));`,
  },
];
