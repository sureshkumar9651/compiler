import { CodeExample } from "../types/example";

export const arraysExamples: CodeExample[] = [
  {
    id: "array-map",
    title: "Array map()",
    description: "Transform every item in an array using map().",
    category: "arrays",
    difficulty: "beginner",
    tags: ["array", "map", "functional"],
    explanation:
      "The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array. It is perfect for transforming data without mutating the original array.",
    expectedOutput:
      "A new array with transformed values based on the original array.",
    commonMistakes: [
      "Forgetting to return a value inside the map callback.",
      "Using map when you don't need a new array (use forEach instead).",
    ],
    faq: [
      {
        question: "Does map change the original array?",
        answer: "No, map returns a completely new array.",
      },
    ],
    relatedSlugs: ["array-filter"],
    learnGuideSlug: "map-vs-foreach",
    seoDescription:
      "Learn and interact with Array map() in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.566Z",
    code: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(number => number * 2);

console.log(doubled);`,
  },
  {
    id: "array-filter",
    title: "Array filter()",
    description: "Create a new array with elements that pass a test.",
    category: "arrays",
    difficulty: "beginner",
    tags: ["array", "filter", "functional"],
    explanation:
      "The `filter()` method creates a new array with all elements that pass the test implemented by the provided function. It is commonly used to remove unwanted items or search for specific data.",
    expectedOutput:
      "A new array containing only the elements that met the condition.",
    commonMistakes: [
      "Returning the item itself instead of a boolean value in the callback.",
      "Modifying the original array during filtering (which can cause unpredictable results).",
    ],
    faq: [
      {
        question: "What happens if no elements pass the filter?",
        answer: "It returns an empty array, not undefined or null.",
      },
    ],
    relatedSlugs: ["array-map"],
    learnGuideSlug: "map-vs-foreach",
    seoDescription:
      "Learn and interact with Array filter() in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.566Z",
    code: `const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(number => number % 2 === 0);

console.log(evenNumbers);`,
  },
  {
    id: "array-reduce",
    title: "Array reduce()",
    description: "Reduce an array to a single value.",
    category: "arrays",
    difficulty: "intermediate",
    tags: ["array", "reduce", "functional"],
    explanation:
      'The `reduce()` method executes a "reducer" callback function on each element of the array, passing in the return value from the calculation on the preceding element. It is powerful for aggregating data into a single value.',
    expectedOutput:
      "A single aggregated value, such as a sum or a completely new object structure.",
    commonMistakes: [
      "Forgetting to provide an initial value, which can cause type errors on empty arrays.",
      "Not returning the accumulator in the callback function.",
    ],
    faq: [
      {
        question: "When should I use reduce instead of map?",
        answer:
          "Use reduce when you need to combine an array into a single value or object.",
      },
    ],
    relatedSlugs: ["array-map"],
    learnGuideSlug: "array-reduce",
    seoDescription:
      "Learn and interact with Array reduce() in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.566Z",
    code: `const numbers = [10, 20, 30];

const total = numbers.reduce((sum, number) => sum + number, 0);

console.log(total);`,
  },
  {
    id: "array-find",
    title: "Array find()",
    description:
      "Find the first element in an array that satisfies a testing function.",
    category: "arrays",
    difficulty: "beginner",
    tags: ["array", "find", "search"],
    explanation:
      "The `find()` method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.",
    expectedOutput: "The first matching object or element from the array.",
    commonMistakes: [
      "Expecting find to return multiple items (use filter for that).",
      "Not handling the case where find returns undefined.",
    ],
    faq: [
      {
        question: "How is find different from filter?",
        answer:
          "find returns the first matching element, filter returns an array of all matches.",
      },
    ],
    relatedSlugs: ["array-filter"],
    learnGuideSlug: "map-vs-foreach",
    seoDescription:
      "Learn and interact with Array find() in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.566Z",
    code: `const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Suresh" },
  { id: 3, name: "Alex" }
];

const user = users.find(user => user.id === 2);

console.log(user);`,
  },
];
