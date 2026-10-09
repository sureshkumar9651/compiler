import { CodeExample } from "../types/example";

export const objectsExamples: CodeExample[] = [
  {
    id: "object-basics",
    title: "Object Basics",
    description: "Create and use a basic JavaScript object.",
    category: "objects",
    difficulty: "beginner",
    tags: ["object", "properties", "basics"],
    explanation:
      "Objects are collections of key-value pairs used to store related data and functions. They are the fundamental data structure in JavaScript, allowing you to model complex entities.",
    expectedOutput: "Properties of the object accessed and printed.",
    commonMistakes: [
      "Forgetting commas between properties.",
      "Trying to use a hyphen in an unquoted key name.",
    ],
    faq: [
      {
        question: "How do I access an object property?",
        answer:
          'You can use dot notation (object.key) or bracket notation (object["key"]).',
      },
    ],
    relatedSlugs: ["object-destructuring"],
    learnGuideSlug: "objects",
    seoDescription:
      "Learn and interact with Object Basics in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.570Z",
    code: `const user = {
  name: "Suresh",
  age: 30,
  role: "Frontend Engineer"
};

console.log(user);`,
  },
  {
    id: "object-destructuring",
    title: "Destructuring",
    description: "Extract properties from an object into variables.",
    category: "objects",
    difficulty: "beginner",
    tags: ["object", "destructuring", "es6"],
    explanation:
      "Object destructuring is a convenient syntax that allows you to unpack properties from objects into distinct variables. It makes your code cleaner, especially when working with large objects or API responses.",
    expectedOutput:
      "Variables extracted from the object printed to the console.",
    commonMistakes: [
      "Using square brackets instead of curly braces for object destructuring.",
      "Trying to destructure a property that does not exist (results in undefined).",
    ],
    faq: [
      {
        question: "Can I rename a variable while destructuring?",
        answer: "Yes, use a colon to rename it: { oldName: newName } = object.",
      },
    ],
    relatedSlugs: ["object-basics", "object-spread"],
    learnGuideSlug: "destructuring",
    seoDescription:
      "Learn and interact with Destructuring in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.570Z",
    code: `const user = {
  name: "Suresh",
  age: 30
};

const { name, age } = user;

console.log(name);
console.log(age);`,
  },
  {
    id: "object-spread",
    title: "Spread Operator",
    description: "Clone and merge objects using the spread syntax.",
    category: "objects",
    difficulty: "beginner",
    tags: ["object", "spread", "es6"],
    explanation:
      "The spread syntax (...) allows you to copy or merge objects. When used in object literals, it expands the properties of an existing object into a new object, which is essential for immutable state updates.",
    expectedOutput:
      "A newly merged object combining properties from multiple sources.",
    commonMistakes: [
      "Assuming spread does a deep clone (it only does a shallow clone).",
      "Overwriting intended properties by placing the spread operator last.",
    ],
    faq: [
      {
        question: "Does object spread copy nested objects?",
        answer:
          "No, it only creates a shallow copy. Nested objects are still referenced.",
      },
    ],
    relatedSlugs: ["object-basics"],
    learnGuideSlug: "spread-rest",
    seoDescription:
      "Learn and interact with Spread Operator in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.571Z",
    code: `const user = {
  name: "Suresh",
  age: 30
};

const updatedUser = {
  ...user,
  age: 31
};

console.log(updatedUser);`,
  },
];
