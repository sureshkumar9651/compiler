import { CodeExample } from "../types/example";

export const errorExamples: CodeExample[] = [
  {
    id: "try-catch",
    title: "JavaScript try...catch Error Handling",
    seoTitle: "JavaScript try...catch Error Handling Syntax Guide",
    seoDescription:
      "Master JavaScript try...catch blocks to prevent runtime crashes. Learn graceful error handling, error logging, and test defensive code live in our playground.",
    description:
      "The JavaScript try...catch statement marks a block of statements to test for exceptions, with a designated handler block to execute if an error occurs. It prevents uncaught runtime exceptions from crashing applications and enables resilient recovery.",
    category: "error-handling",
    difficulty: "beginner",
    tags: ["try-catch", "error-handling", "exceptions", "debugging"],
    explanation:
      "Defensive JavaScript uses `try...catch` to isolate risky operations—such as parsing dynamic JSON strings, accessing network resources, or executing third-party code. If an exception is thrown inside the `try` block, normal execution halts immediately and control transfers to the `catch` block, which receives the thrown error object. An optional `finally` block can be added to execute cleanup logic regardless of success or failure.",
    expectedOutput: "Failed to parse JSON\nSyntaxError: Unexpected token 'i', \"invalid json\" is not valid JSON",
    commonMistakes: [
      "Leaving catch blocks empty, silently swallowing errors and making system debugging impossible.",
      "Attempting to catch asynchronous errors from callbacks (e.g. setTimeout) with a synchronous try...catch; the exception is thrown outside the block.",
      "Wrapping entire applications in a single monolithic try...catch instead of handling failures close to their source.",
      "Catching errors without checking error types or re-throwing unexpected exceptions."
    ],
    faq: [
      {
        question: "Can try...catch catch asynchronous errors in JavaScript?",
        answer:
          "Synchronous try...catch cannot catch errors from asynchronous callbacks like setTimeout. However, it CAN catch errors from async/await when the promise rejects."
      },
      {
        question: "What is the purpose of the finally block?",
        answer:
          "The finally block always executes after try and catch have completed, regardless of whether an error was thrown or handled, making it ideal for resource cleanup."
      },
      {
        question: "Can you omit the error parameter in catch?",
        answer:
          "Yes. Since ES2019 (optional catch binding), you can write 'catch { ... }' without binding an unused error variable."
      }
    ],
    relatedSlugs: ["throw-error"],
    learnGuideSlug: "error-handling",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `try {
  JSON.parse("invalid json");
} catch (error) {
  console.error("Failed to parse JSON");
  console.error(error);
}`,
  },
  {
    id: "throw-error",
    title: "JavaScript Throw Error: Custom Exceptions",
    seoTitle: "JavaScript Throw Error: Custom Exceptions Guide",
    seoDescription:
      "Learn how to throw custom JavaScript Error instances when runtime assertions fail. Test input validation and error propagation in our live compiler.",
    description:
      "The JavaScript throw statement generates a user-defined exception, pausing the current execution thread and passing control to the nearest enclosing catch block. Instantiating Error objects provides critical stack trace context for debugging.",
    category: "error-handling",
    difficulty: "beginner",
    tags: ["throw", "error", "exceptions", "validation"],
    explanation:
      "The `throw` statement allows developers to signal exceptional runtime conditions, invalid arguments, or state violations. While JavaScript permits throwing any value (strings, numbers, objects), you should always throw instances of the built-in `Error` class (e.g. `throw new Error('message')`) or specialized subclasses like `TypeError` and `RangeError`. Instantiating `Error` captures a complete execution call stack for rapid diagnosis.",
    expectedOutput: "5",
    commonMistakes: [
      "Throwing raw primitive strings like throw 'error' instead of Error objects, which strips debugging stack traces.",
      "Throwing errors for expected, common control flow conditions instead of true exceptions.",
      "Throwing exceptions without informative, actionable error messages.",
      "Not documenting the exceptions that a public function or API might throw."
    ],
    faq: [
      {
        question: "Why should you throw new Error() instead of a string?",
        answer:
          "The Error constructor captures the current call stack trace at the exact moment of instantiation, which is critical for identifying the origin line of the error."
      },
      {
        question: "What built-in Error subclasses exist in JavaScript?",
        answer:
          "Standard subclasses include TypeError (invalid types), RangeError (out-of-range numeric values), SyntaxError, ReferenceError, and URIError."
      },
      {
        question: "Can you create custom Error classes in JavaScript?",
        answer:
          "Yes. You can extend the base Error class using class ValidationError extends Error { ... } with custom properties and status codes."
      }
    ],
    relatedSlugs: ["try-catch"],
    learnGuideSlug: "error-handling",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

console.log(divide(10, 2));`,
  },
];
