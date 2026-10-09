import { CodeExample } from "../types/example";

export const asyncExamples: CodeExample[] = [
  {
    id: "promise-basic",
    title: "Promise Basics",
    description: "Create and resolve a simple Promise.",
    category: "async",
    difficulty: "beginner",
    tags: ["promise", "async", "then"],
    explanation:
      "A Promise represents the eventual completion or failure of an asynchronous operation. It allows you to attach `.then()` and `.catch()` handlers to run code once the async task finishes, avoiding callback hell.",
    expectedOutput:
      "A successful resolution message or a caught error message.",
    commonMistakes: [
      "Forgetting to return a value inside a .then() block.",
      "Not attaching a .catch() handler, resulting in unhandled promise rejections.",
    ],
    faq: [
      {
        question: "What are the three states of a Promise?",
        answer: "Pending, fulfilled, and rejected.",
      },
    ],
    relatedSlugs: ["async-await"],
    learnGuideSlug: "promises",
    seoDescription:
      "Learn and interact with Promise Basics in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.567Z",
    code: `const promise = Promise.resolve("Success");

promise.then(result => {
  console.log(result);
});`,
  },
  {
    id: "async-await",
    title: "Async / Await",
    description: "Use modern async/await syntax to handle Promises.",
    category: "async",
    difficulty: "intermediate",
    tags: ["async", "await", "promise"],
    explanation:
      "The `async` and `await` keywords provide a cleaner, more readable way to write asynchronous code. They allow you to write promise-based code as if it were synchronous, pausing execution until the promise resolves.",
    expectedOutput:
      "Data fetched or processed asynchronously, logged in sequence.",
    commonMistakes: [
      "Forgetting to make the parent function async when using await.",
      "Not wrapping await calls in a try...catch block for error handling.",
    ],
    faq: [
      {
        question: "Can I use await outside of an async function?",
        answer: "Yes, top-level await is supported in modern ES modules.",
      },
    ],
    relatedSlugs: ["promise-basic"],
    learnGuideSlug: "promises",
    seoDescription:
      "Learn and interact with Async / Await in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.567Z",
    code: `async function main() {
  const result = await Promise.resolve("Hello async!");

  console.log(result);
}

main();`,
  },
  {
    id: "set-timeout",
    title: "setTimeout",
    description: "Delay execution using setTimeout.",
    category: "async",
    difficulty: "beginner",
    tags: ["timeout", "timer", "delay"],
    explanation:
      "The `setTimeout` function schedules code to execute after a specified delay in milliseconds. It is a fundamental part of the JavaScript event loop, used for delaying actions or polling.",
    expectedOutput:
      "A message logged immediately, followed by another after a delay.",
    commonMistakes: [
      "Passing a function call instead of a function reference (e.g., setTimeout(myFunc(), 1000)).",
      "Assuming the delay is exact (it is a minimum delay, not a guaranteed exact time).",
    ],
    faq: [
      {
        question: "How do I cancel a timeout?",
        answer: "Save the timeout ID and pass it to clearTimeout(id).",
      },
    ],
    relatedSlugs: ["promise-basic"],
    learnGuideSlug: "promises",
    seoDescription:
      "Learn and interact with setTimeout in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.567Z",
    code: `console.log("Start");

setTimeout(() => {
  console.log("Delayed output");
}, 1000);

console.log("End");`,
  },
];
