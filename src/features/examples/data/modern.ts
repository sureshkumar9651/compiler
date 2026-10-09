import { CodeExample } from "../types/example";

export const modernExamples: CodeExample[] = [
  {
    id: "optional-chaining",
    title: "Optional Chaining & Nullish Coalescing",
    description: "Safely access nested properties and provide fallback values.",
    category: "modern-javascript",
    difficulty: "beginner",
    tags: ["optional-chaining", "nullish", "es2020"],
    explanation:
      "The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.",
    expectedOutput:
      "The nested value, or undefined if a parent property is missing.",
    commonMistakes: [
      "Overusing optional chaining when a property is strictly required by the application.",
      "Using ?. instead of a regular dot for top-level variables that might be undeclared.",
    ],
    faq: [
      {
        question: "Does optional chaining work with arrays and functions?",
        answer: "Yes, you can use arr?.[0] and func?.() safely.",
      },
    ],
    relatedSlugs: ["object-basics"],
    learnGuideSlug: "objects",
    seoDescription:
      "Learn and interact with Optional Chaining & Nullish Coalescing in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.570Z",
    code: `const user = {
  profile: {
    name: "Suresh"
  }
};

console.log(user.profile?.name);
// @ts-ignore (ignoring for JS example)
console.log(user.settings?.theme ?? "default");`,
  },
];
