import { CodeExample } from "../types/example";

export const asyncExamples: CodeExample[] = [
  {
    id: "promise-basic",
    title: "JavaScript Promises (Creation & .then())",
    seoTitle: "JavaScript Promises Explained: Creation and .then()",
    seoDescription:
      "Learn how JavaScript Promises handle asynchronous operations cleanly. Understand pending, resolved, and rejected states and run live Promise code.",
    description:
      "A JavaScript Promise is a proxy object representing the eventual completion or failure of an asynchronous operation and its resulting value. Promises eliminate nested callback hell with chainable .then(), .catch(), and .finally() methods.",
    category: "async",
    difficulty: "beginner",
    tags: ["promises", "async", "then", "callbacks"],
    explanation:
      "JavaScript Promises provide an abstraction over asynchronous operations. A Promise exists in one of three mutually exclusive states: pending, fulfilled (resolved with a value), or rejected (with an error reason). You attach fulfillment handlers using `.then()` and rejection handlers with `.catch()`. Handlers execute asynchronously on the JavaScript microtask queue, guaranteeing deterministic scheduling after the current synchronous execution turn completes.",
    expectedOutput: "Success",
    commonMistakes: [
      "Forgetting to return a value or inner promise inside a .then() callback, breaking the promise chain.",
      "Omitting a .catch() error handler, causing unhandled promise rejections that crash Node.js processes.",
      "Falling into callback hell inside .then() blocks instead of returning promises for flat chaining.",
      "Confusing asynchronous execution order with synchronous sequential execution."
    ],
    faq: [
      {
        question: "What are the three states of a JavaScript Promise?",
        answer:
          "A Promise is always in one of three states: pending (initial state), fulfilled (operation completed successfully), or rejected (operation failed with an error)."
      },
      {
        question: "Can a settled Promise change its state?",
        answer:
          "No. Once a Promise is either fulfilled or rejected, its state and resulting value or error reason become permanently immutable."
      },
      {
        question: "What is the difference between microtasks and macrotasks?",
        answer:
          "Promise callbacks execute as microtasks, which run immediately after the current script executes and before the event loop processes macrotasks like setTimeout or I/O events."
      }
    ],
    relatedSlugs: ["async-await", "set-timeout"],
    learnGuideSlug: "promises",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const promise = Promise.resolve("Success");

promise.then(result => {
  console.log(result);
});`,
  },
  {
    id: "async-await",
    title: "JavaScript Async/Await Syntax & Promises",
    seoTitle: "JavaScript Async Await Syntax & Live Code Examples",
    seoDescription:
      "Master JavaScript async/await for elegant, readable asynchronous code. Learn error handling with try/catch and run code live in our browser playground.",
    description:
      "The async and await keywords allow developers to write promise-based asynchronous code in a sequential, synchronous-looking style. An async function always returns a Promise, and await pauses execution until the awaited Promise settles.",
    category: "async",
    difficulty: "intermediate",
    tags: ["async", "await", "promises", "es2017"],
    explanation:
      "Added in ECMAScript 2017, `async/await` is syntactic sugar built on top of native Promises and generators. Marking a function with `async` ensures it always returns a Promise. Inside an async function, the `await` keyword pauses execution of that specific function until the target Promise settles, unwrapping its resolved value directly. Errors from rejected promises are handled naturally using standard `try...catch` blocks.",
    expectedOutput: "Hello async!",
    commonMistakes: [
      "Using the await keyword inside regular, non-async functions, throwing a SyntaxError.",
      "Forgetting to wrap await expressions in a try...catch block to handle possible Promise rejections.",
      "Running independent asynchronous operations sequentially with sequential awaits instead of concurrently using Promise.all().",
      "Assuming async functions execute in parallel threads; JavaScript remains single-threaded on the event loop."
    ],
    faq: [
      {
        question: "Can you use await at the top level of a JavaScript file?",
        answer:
          "Yes. Top-level await is fully supported in ES Modules (ECMAScript 2022+) without needing an enclosing async function wrapper."
      },
      {
        question: "What does an async function return if you return a primitive value?",
        answer:
          "An async function always wraps its return value in a resolved Promise. For example, returning 'hello' returns Promise.resolve('hello')."
      },
      {
        question: "How do you handle errors with async/await?",
        answer:
          "Use standard try...catch blocks around your await expressions. If the awaited promise rejects, the error is caught by the catch block."
      }
    ],
    relatedSlugs: ["promise-basic", "set-timeout"],
    learnGuideSlug: "promises",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `async function main() {
  const result = await Promise.resolve("Hello async!");

  console.log(result);
}

main();`,
  },
  {
    id: "set-timeout",
    title: "JavaScript setTimeout & Asynchronous Timers",
    seoTitle: "JavaScript setTimeout: Timers & Event Loop Guide",
    seoDescription:
      "Understand JavaScript setTimeout and asynchronous task queuing. Learn event loop execution timing and run interactive timer code in our online runner.",
    description:
      "The JavaScript setTimeout() function schedules a callback function to execute after a minimum delay in milliseconds. Because JavaScript runs on a single-threaded event loop, setTimeout places callbacks in the task queue after the main thread clears.",
    category: "async",
    difficulty: "beginner",
    tags: ["settimeout", "timers", "event-loop", "async"],
    explanation:
      "The `setTimeout()` method is part of the Web APIs and Node.js timers module. It accepts a callback function and a delay in milliseconds. Crucially, the delay represents the *minimum* time before the task is placed onto the macrotask queue. The callback will not execute until the call stack is completely clear of all synchronous code, demonstrating the non-blocking asynchronous event loop mechanism of JavaScript.",
    expectedOutput: "Start\nEnd\nDelayed output",
    commonMistakes: [
      "Passing an immediate function invocation like setTimeout(fn(), 1000) instead of a function reference setTimeout(fn, 1000).",
      "Assuming setTimeout guarantees exact execution timing; heavy synchronous computation can delay timer execution indefinitely.",
      "Passing string code to setTimeout, which invokes dangerous eval-like compilation.",
      "Forgetting to clear active intervals or timeouts with clearTimeout(timerId) on component unmount, causing memory leaks."
    ],
    faq: [
      {
        question: "Does setTimeout(fn, 0) execute immediately?",
        answer:
          "No. A delay of 0ms defers execution until the current synchronous execution stack has finished and microtasks have drained."
      },
      {
        question: "How do you cancel a scheduled setTimeout timer?",
        answer:
          "Store the integer timer ID returned by setTimeout, and pass it to clearTimeout(timerId) before the timer fires."
      },
      {
        question: "Why does console.log('End') print before setTimeout in this example?",
        answer:
          "Synchronous code runs immediately on the call stack, while timer callbacks are dispatched to the browser task queue and run only after the stack is clear."
      }
    ],
    relatedSlugs: ["promise-basic", "async-await"],
    learnGuideSlug: "promises",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `console.log("Start");

setTimeout(() => {
  console.log("Delayed output");
}, 1000);

console.log("End");`,
  },
];
