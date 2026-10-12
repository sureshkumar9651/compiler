import { CodeExample } from "../types/example";

export const objectsExamples: CodeExample[] = [
  {
    id: "object-basics",
    title: "JavaScript Object Basics: Key-Value Pairs",
    seoTitle: "JavaScript Object Basics: Key-Value Pairs Guide",
    seoDescription:
      "Learn how to create, inspect, and access JavaScript object properties using dot and bracket notation. Test live object code in our in-browser playground.",
    description:
      "A JavaScript object is a standalone entity consisting of key-value properties. Property keys are strings or Symbols, and values can be any JavaScript data type, including primitive numbers, strings, nested objects, and executable method functions.",
    category: "objects",
    difficulty: "beginner",
    tags: ["objects", "properties", "key-value", "basics"],
    explanation:
      "Objects are the foundational composite data structure in JavaScript. Created using object literal syntax (`{}`), objects store unordered collections of named properties. Property values can be accessed using either dot notation (`user.name`) when the key is a valid identifier, or bracket notation (`user['name']`) when keys contain special characters, spaces, or dynamic variable expressions.",
    expectedOutput: '{"name":"Suresh","age":30,"role":"Frontend Engineer"}',
    commonMistakes: [
      "Forgetting commas between key-value pairs inside object literals, triggering SyntaxError.",
      "Attempting to use dot notation for property names containing spaces or hyphens; bracket notation must be used instead.",
      "Comparing two distinct objects with === expecting property equality; JavaScript compares objects by memory reference, not structure.",
      "Accidentally mutating shared object references across different modules."
    ],
    faq: [
      {
        question: "What is the difference between dot notation and bracket notation?",
        answer:
          "Dot notation (obj.prop) requires keys to be valid JavaScript identifiers known at authoring time. Bracket notation (obj['prop']) allows dynamic keys, variables, and property names containing hyphens or spaces."
      },
      {
        question: "How do you check if a property exists on a JavaScript object?",
        answer:
          "Use the 'in' operator ('name' in user) or Object.hasOwn(user, 'name') to safely verify property existence without checking against undefined."
      },
      {
        question: "How do you get all the keys or values of an object?",
        answer:
          "Use Object.keys(obj) to retrieve an array of property names, Object.values(obj) for property values, or Object.entries(obj) for [key, value] pairs."
      }
    ],
    relatedSlugs: ["object-destructuring", "object-spread", "optional-chaining"],
    learnGuideSlug: "objects",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const user = {
  name: "Suresh",
  age: 30,
  role: "Frontend Engineer"
};

console.log(user);`,
  },
  {
    id: "object-destructuring",
    title: "JavaScript Object Destructuring (ES6 Syntax)",
    seoTitle: "JavaScript Object Destructuring: ES6 Syntax Guide",
    seoDescription:
      "Learn JavaScript object destructuring to extract properties into variables with clean ES6 syntax. Run code live and verify exact terminal console output.",
    description:
      "JavaScript object destructuring is an ECMAScript 2015 expression syntax that unpacks properties from objects directly into distinct standalone variables. It supports property renaming, nested extraction, and default fallback assignments.",
    category: "objects",
    difficulty: "beginner",
    tags: ["destructuring", "objects", "es6", "syntax"],
    explanation:
      "Object destructuring (`const { name, age } = user;`) extracts properties from an object and binds them to local variables with matching names. It streamlines parameter handling in functions and avoids redundant property access chains. Developers can also rename variables during destructuring using a colon (`const { name: userName } = user;`) or provide fallback defaults (`const { role = 'Guest' } = user;`).",
    expectedOutput: "Suresh\n30",
    commonMistakes: [
      "Using square brackets [] instead of curly braces {} for object destructuring (square brackets destructure arrays).",
      "Destructuring properties from null or undefined, throwing an uncatchable TypeError: Cannot destructure property of null.",
      "Confusing the renaming syntax { original: newName } with property default assignment.",
      "Over-destructuring deeply nested objects, making code brittle when intermediate parent keys might be missing."
    ],
    faq: [
      {
        question: "Can you rename a variable during object destructuring?",
        answer:
          "Yes. Use the colon syntax: const { name: fullName } = user extracts the property 'name' and assigns it to a new local variable named 'fullName'."
      },
      {
        question: "Can you provide default values during destructuring?",
        answer:
          "Yes. Use equals syntax: const { role = 'Developer' } = user assigns 'Developer' if user.role is undefined."
      },
      {
        question: "What happens if you destructure a property that does not exist?",
        answer:
          "The newly created variable is assigned undefined, unless you provided an explicit default value in the destructuring pattern."
      }
    ],
    relatedSlugs: ["object-basics", "object-spread"],
    learnGuideSlug: "destructuring",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
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
    title: "JavaScript Object Spread Operator (...)",
    seoTitle: "JavaScript Object Spread Operator (...) Syntax Guide",
    seoDescription:
      "Master the JavaScript object spread operator (...) for shallow cloning and immutable property merges. Test code live in our free online compiler.",
    description:
      "The JavaScript object spread operator (...) copies enumerable own properties from one or more source objects into a new target object literal. It is standard across modern state management libraries for immutable updates and shallow cloning.",
    category: "objects",
    difficulty: "beginner",
    tags: ["spread-operator", "objects", "immutability", "es6"],
    explanation:
      "Introduced in ES2018, the object spread operator (`{ ...user, age: 31 }`) allows shallow copying of properties into a new object literal. Properties declared after the spread operator override matching properties copied from the source object. This provides a clean, declarative syntax for immutable updates, avoiding mutations to original state objects.",
    expectedOutput: '{"name":"Suresh","age":31}',
    commonMistakes: [
      "Assuming the spread operator creates a deep clone; nested objects and arrays are copied by memory reference, not cloned.",
      "Placing the spread operator after override properties, causing copied properties to accidentally overwrite the intended updates.",
      "Using the spread operator on deeply nested objects without spreading each intermediate level, inadvertently causing mutations.",
      "Confusing the spread operator with the rest operator; spread expands elements, while rest condenses remaining items into an object."
    ],
    faq: [
      {
        question: "Does the object spread operator perform a deep copy?",
        answer:
          "No. Object spread performs a shallow copy. If an object contains nested objects or arrays, the references to those nested structures are shared."
      },
      {
        question: "How do you deeply clone an object in modern JavaScript?",
        answer:
          "Use the built-in structuredClone() function (supported across all modern browsers and Node.js) for true deep cloning without prototype loss."
      },
      {
        question: "What happens if two spread objects share the same property key?",
        answer:
          "The object spread last takes precedence and overwrites any previously spread value with the same key."
      }
    ],
    relatedSlugs: ["object-basics", "object-destructuring"],
    learnGuideSlug: "spread-rest",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
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
