import { CodeExample } from "../types/example";

export const starterTemplates: CodeExample[] = [
  {
    id: "blank-javascript",
    title: "Blank JavaScript",
    description: "An empty slate to start coding from scratch.",
    category: "basics", // Reusing category as this is stored separately
    difficulty: "beginner",
    tags: ["template", "blank"],
    explanation:
      "Learn how to use Blank JavaScript in JavaScript with this interactive example.",
    expectedOutput: "The expected output of the code.",
    commonMistakes: ["Syntax errors", "Logical errors"],
    faq: [
      {
        question: "How does it work?",
        answer: "Run the code to see it in action.",
      },
    ],
    relatedSlugs: [],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Blank JavaScript in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.572Z",
    code: `// Start writing JavaScript here.
`,
  },
  {
    id: "console-playground",
    title: "Console Playground",
    description: "A basic template with a simple console.log.",
    category: "basics",
    difficulty: "beginner",
    tags: ["template", "console"],
    explanation:
      "Learn how to use Console Playground in JavaScript with this interactive example.",
    expectedOutput: "The expected output of the code.",
    commonMistakes: ["Syntax errors", "Logical errors"],
    faq: [
      {
        question: "How does it work?",
        answer: "Run the code to see it in action.",
      },
    ],
    relatedSlugs: [],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Console Playground in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.572Z",
    code: `console.log("Hello World!");`,
  },
  {
    id: "array-playground",
    title: "Array Playground",
    description: "Start experimenting with an array of numbers.",
    category: "arrays",
    difficulty: "beginner",
    tags: ["template", "array"],
    explanation:
      "Learn how to use Array Playground in JavaScript with this interactive example.",
    expectedOutput: "The expected output of the code.",
    commonMistakes: ["Syntax errors", "Logical errors"],
    faq: [
      {
        question: "How does it work?",
        answer: "Run the code to see it in action.",
      },
    ],
    relatedSlugs: [],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Array Playground in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.572Z",
    code: `const numbers = [1, 2, 3, 4, 5];

console.log(numbers);`,
  },
  {
    id: "async-playground",
    title: "Async Playground",
    description: "A ready-to-use async/await template.",
    category: "async",
    difficulty: "intermediate",
    tags: ["template", "async"],
    explanation:
      "Learn how to use Async Playground in JavaScript with this interactive example.",
    expectedOutput: "The expected output of the code.",
    commonMistakes: ["Syntax errors", "Logical errors"],
    faq: [
      {
        question: "How does it work?",
        answer: "Run the code to see it in action.",
      },
    ],
    relatedSlugs: [],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Async Playground in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.572Z",
    code: `async function main() {
  // Write async JavaScript here.
}

main();`,
  },
  {
    id: "algorithm-playground",
    title: "Algorithm Playground",
    description: "A template for solving algorithm problems.",
    category: "algorithms",
    difficulty: "intermediate",
    tags: ["template", "algorithm"],
    explanation:
      "Learn how to use Algorithm Playground in JavaScript with this interactive example.",
    expectedOutput: "The expected output of the code.",
    commonMistakes: ["Syntax errors", "Logical errors"],
    faq: [
      {
        question: "How does it work?",
        answer: "Run the code to see it in action.",
      },
    ],
    relatedSlugs: [],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Algorithm Playground in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.572Z",
    code: `function solve() {
  // Write your solution here.
}

console.log(solve());`,
  },
];
