import { CodeExample } from "../types/example";

export const starterTemplates: CodeExample[] = [
  {
    id: "blank-javascript",
    title: "Blank JavaScript Playground",
    seoTitle: "Blank JavaScript Scratchpad & Code Playground",
    seoDescription:
      "Start coding in a clean, zero-configuration JavaScript scratchpad. Write code, execute in isolated Web Workers, and inspect real-time console output.",
    description:
      "A clean, minimal JavaScript scratchpad with zero boilerplate. Write custom scripts, experiment with algorithms, and run code instantly in a client-side Web Worker.",
    category: "basics",
    difficulty: "beginner",
    tags: ["scratchpad", "blank", "playground", "javascript"],
    explanation:
      "The Blank JavaScript playground template provides an empty canvas for writing custom JavaScript code. Every execution runs inside an isolated, client-side Web Worker sandbox with simulated console logging, IndexedDB local persistence, and zero latency.",
    expectedOutput: "(No output generated - enter JavaScript statements to execute)",
    commonMistakes: [
      "Leaving the editor blank without any console.log statements to inspect runtime results.",
      "Assuming the editor requires Node.js installation; code runs directly in your browser."
    ],
    faq: [
      {
        question: "Where does code execute in the JS CodeLab playground?",
        answer:
          "All code executes entirely inside your browser using a sandboxed Web Worker. No code is transmitted to external servers, protecting your privacy and security."
      },
      {
        question: "Does JS CodeLab support modern ECMAScript features?",
        answer:
          "Yes. JS CodeLab supports modern ECMAScript standards including ES2024 features, async/await, optional chaining, and destructuring."
      }
    ],
    relatedSlugs: ["console-playground", "array-playground"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `// Start writing JavaScript here.
console.log("Welcome to JS CodeLab!");`,
  },
  {
    id: "console-playground",
    title: "Console Logging Playground",
    seoTitle: "JavaScript Console Output Playground & Code Runner",
    seoDescription:
      "Experiment with console.log, warning messages, and error logging in a sandboxed JavaScript runtime with instant live execution in your browser.",
    description:
      "Experiment with the standard JavaScript Console API. Test console.log, console.warn, console.error, and multi-argument message formatting in a live runner.",
    category: "basics",
    difficulty: "beginner",
    tags: ["console", "logging", "debugging", "playground"],
    explanation:
      "This template demonstrates how the JavaScript Console API routes logs, warnings, and error streams into JS CodeLab's interactive terminal output viewer.",
    expectedOutput: "Hello World!",
    commonMistakes: [
      "Overusing console.log in high-frequency animation loops.",
      "Misinterpreting console.error as an application halting mechanism."
    ],
    faq: [
      {
        question: "Can I inspect complex objects in the playground console?",
        answer:
          "Yes. Objects logged via console.log are serialized and formatted cleanly in the output pane."
      },
      {
        question: "What keyboard shortcut runs code in JS CodeLab?",
        answer:
          "Press Ctrl+Enter (or Cmd+Enter on macOS) to run your code instantly."
      }
    ],
    relatedSlugs: ["blank-javascript", "array-playground"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `console.log("Hello World!");`,
  },
  {
    id: "array-playground",
    title: "JavaScript Array Playground",
    seoTitle: "JavaScript Array Playground: Test Array Methods Online",
    seoDescription:
      "Experiment with JavaScript array manipulation, higher-order methods (map, filter, reduce), and iteration inside an isolated in-browser code editor.",
    description:
      "A starter template preloaded with numeric and object arrays. Test modern array transformations, higher-order methods, sorting, and destructuring in real time.",
    category: "arrays",
    difficulty: "beginner",
    tags: ["arrays", "higher-order", "functional", "playground"],
    explanation:
      "Preloaded array environment for rapid prototyping of array pipelines with map, filter, find, and reduce methods.",
    expectedOutput: "[1, 2, 3, 4, 5]",
    commonMistakes: [
      "Mutating arrays in place with sort() or splice() unintentionally.",
      "Ignoring the return values of non-mutating methods like slice() or concat()."
    ],
    faq: [
      {
        question: "Can I test custom array algorithms in this playground?",
        answer:
          "Yes. You can write custom sorting routines, search algorithms, and functional pipelines directly."
      }
    ],
    relatedSlugs: ["array-map", "array-filter", "array-reduce"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const numbers = [1, 2, 3, 4, 5];

console.log(numbers);`,
  },
  {
    id: "async-playground",
    title: "JavaScript Async & Promises Playground",
    seoTitle: "JavaScript Async & Promises Playground Online",
    seoDescription:
      "Experiment with async/await, Promise resolution, and microtask timing in an isolated Web Worker playground with zero setup or configuration required.",
    description:
      "Test asynchronous JavaScript flows, Promise resolution, timeouts, and async/await chains in an isolated client-side execution environment.",
    category: "async",
    difficulty: "intermediate",
    tags: ["async", "promises", "await", "playground"],
    explanation:
      "Sandbox for exploring JavaScript asynchronous execution mechanics, microtasks, and Promise resolution chains.",
    expectedOutput: "Async task complete: Done!",
    commonMistakes: [
      "Uncaught promise rejections due to missing try/catch or .catch() handlers.",
      "Blocking the main thread with heavy synchronous computations instead of async workers."
    ],
    faq: [
      {
        question: "Does the playground support async/await?",
        answer:
          "Yes. Full ES2017+ async/await syntax is supported out of the box."
      }
    ],
    relatedSlugs: ["promise-basic", "async-await"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `async function main() {
  const result = await Promise.resolve("Done!");
  console.log("Async task complete:", result);
}

main();`,
  },
  {
    id: "algorithm-playground",
    title: "JavaScript Algorithm Playground",
    seoTitle: "JavaScript Algorithm Playground & Problem Solving",
    seoDescription:
      "Test JavaScript data structures, sorting algorithms, and coding interview problems in an instant in-browser compiler with persistent IndexedDB storage.",
    description:
      "A focused environment for developing and benchmarking JavaScript algorithms, data structures, recursion, and interview practice challenges.",
    category: "algorithms",
    difficulty: "intermediate",
    tags: ["algorithms", "interview-prep", "data-structures", "problem-solving"],
    explanation:
      "Dedicated workspace for implementing data structures, string manipulation algorithms, and mathematical computations.",
    expectedOutput: "Result: 42",
    commonMistakes: [
      "Infinite loops without proper termination conditions.",
      "Exceeding maximum call stack limits in recursive procedures."
    ],
    faq: [
      {
        question: "Can I save my algorithm solutions?",
        answer:
          "Yes. When you open solutions in the playground, projects are automatically saved to your browser's IndexedDB storage."
      }
    ],
    relatedSlugs: ["fizzbuzz", "factorial", "reverse-string"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `function solve() {
  return 42;
}

console.log("Result:", solve());`,
  },
];
