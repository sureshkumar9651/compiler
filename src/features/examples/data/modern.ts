import { CodeExample } from "../types/example";

export const modernExamples: CodeExample[] = [
  {
    id: "optional-chaining",
    title: "JavaScript Optional Chaining & Nullish Coalescing",
    seoTitle: "JavaScript Optional Chaining & Nullish Coalescing",
    seoDescription:
      "Safely traverse deep object trees with optional chaining (?.) and provide fallbacks with nullish coalescing (??). Test modern ES2020 JavaScript live.",
    description:
      "JavaScript optional chaining (?.) permits reading nested properties without manually checking each reference in the chain for null or undefined. Nullish coalescing (??) provides a fallback value only when a value is strictly null or undefined.",
    category: "modern-javascript",
    difficulty: "beginner",
    tags: ["optional-chaining", "nullish-coalescing", "es2020", "modern-javascript"],
    explanation:
      "Introduced in ECMAScript 2020, optional chaining (`?.`) short-circuits evaluation and evaluates to `undefined` if the preceding reference is nullish (`null` or `undefined`), avoiding runtime TypeError exceptions. Paired with the nullish coalescing operator (`??`), developers can supply clean default fallbacks only when a value is strictly nullish, preserving legitimate falsy values like `0`, `false`, and empty strings `\"\"`.",
    expectedOutput: "Suresh\ndefault",
    commonMistakes: [
      "Using the logical OR operator (||) instead of nullish coalescing (??), which erroneously overwrites valid falsy values like 0 or false.",
      "Overusing optional chaining on references that should be strictly guaranteed by application invariants, hiding upstream data bugs.",
      "Using ?. on root variables that are completely undeclared, which still throws a ReferenceError; optional chaining only guards properties.",
      "Attempting to use optional chaining on the left side of an assignment expression (e.g. obj?.prop = val is a SyntaxError)."
    ],
    faq: [
      {
        question: "What is the difference between ?? (nullish coalescing) and || (logical OR)?",
        answer:
          "The ?? operator only falls back when the left operand is null or undefined. The || operator falls back on any falsy value, including 0, false, NaN, and empty strings ('')."
      },
      {
        question: "Can optional chaining be used with function calls and array indices?",
        answer:
          "Yes. You can call optional functions with callback?.() and access optional array elements with array?.[index] safely."
      },
      {
        question: "Does optional chaining prevent ReferenceError on undeclared variables?",
        answer:
          "No. Optional chaining only protects property access on defined variables. Accessing an undeclared root variable still throws a ReferenceError."
      }
    ],
    relatedSlugs: ["object-basics", "object-destructuring"],
    learnGuideSlug: "objects",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const user = {
  profile: {
    name: "Suresh"
  }
};

console.log(user.profile?.name);
// @ts-ignore
console.log(user.settings?.theme ?? "default");`,
  },
];
