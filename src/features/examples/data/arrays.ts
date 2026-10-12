import { CodeExample } from "../types/example";

export const arraysExamples: CodeExample[] = [
  {
    id: "array-map",
    title: "JavaScript Array map() Method",
    seoTitle: "JavaScript Array map() Method with Live Examples",
    seoDescription:
      "Learn how JavaScript Array map() transforms items into a new array immutably. Run live code examples, examine callback parameters, and inspect exact output.",
    description:
      "The JavaScript Array map() method creates a new array populated with the results of calling a provided callback function on every element in the calling array. It performs immutable data transformation without modifying the original array.",
    category: "arrays",
    difficulty: "beginner",
    tags: ["array", "map", "functional-programming", "transformation"],
    explanation:
      "Array.prototype.map() is a foundational higher-order method in functional JavaScript programming. It iterates through the calling array in ascending index order, invoking the provided transformation function on each element. The return value of each callback invocation is collected into a brand-new array of identical length. Crucially, map() never mutates the original input array, making it ideal for predictable state management in UI libraries like React.",
    expectedOutput: "[2,4,6,8,10]",
    commonMistakes: [
      "Using map() when you don't use the returned array; use forEach() or for...of instead to avoid allocating unnecessary memory.",
      "Forgetting to return a value from the callback function, resulting in an array populated with undefined items.",
      "Directly mutating item properties inside the callback instead of returning clean shallow copies, causing unintended side effects.",
      "Attempting to use break or continue statements inside map(); use standard for loops if early termination is needed."
    ],
    faq: [
      {
        question: "Does Array.prototype.map() mutate the original array?",
        answer:
          "No. The map() method creates and returns a brand-new array. However, if the array contains objects and you mutate their properties inside the callback, those mutations will affect the original references."
      },
      {
        question: "What is the difference between Array map() and forEach()?",
        answer:
          "The map() method constructs and returns a new transformed array of identical length, whereas forEach() executes side effects for each element and always returns undefined."
      },
      {
        question: "What parameters are passed to the map() callback function?",
        answer:
          "The callback function receives three arguments on every iteration: the current element value, the current index number (0-indexed), and the complete original array being traversed."
      },
      {
        question: "How can you run asynchronous operations with Array map()?",
        answer:
          "When an async callback is passed to map(), it returns an array of pending Promises. You must resolve them collectively using Promise.all(array.map(async ...))."
      }
    ],
    relatedSlugs: ["array-filter", "array-reduce", "array-find"],
    learnGuideSlug: "map-vs-foreach",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(number => number * 2);

console.log(doubled);`,
  },
  {
    id: "array-filter",
    title: "JavaScript Array filter() Method",
    seoTitle: "JavaScript Array filter() Method: Syntax & Examples",
    seoDescription:
      "Master JavaScript Array filter() to extract matching elements based on boolean predicate conditions. Test array filtering live in our interactive playground.",
    description:
      "The JavaScript Array filter() method creates a shallow copy of an array containing only the elements that pass the test implemented by the provided predicate callback function. Elements that evaluate to truthy are retained, while others are omitted.",
    category: "arrays",
    difficulty: "beginner",
    tags: ["array", "filter", "search", "predicates"],
    explanation:
      "Array.prototype.filter() iterates over every item in an array, invoking a predicate function that must evaluate to either truthy or falsy. If the callback returns truthy, the current item is copied into the output array; otherwise, it is skipped. The original array is never modified. If no items satisfy the predicate condition, filter() returns an empty array rather than null or undefined.",
    expectedOutput: "[2,4,6]",
    commonMistakes: [
      "Returning the item itself instead of a boolean comparison expression, causing falsy values like 0 or '' to be accidentally excluded.",
      "Expecting filter() to return a single element; use Array.prototype.find() if you only want the first matching item.",
      "Mutating array items inside the predicate callback function.",
      "Expecting filter to alter the original array in place; filter returns a new array that must be stored in a variable."
    ],
    faq: [
      {
        question: "What does Array filter() return if no items match?",
        answer:
          "If no elements pass the test condition, filter() returns a new, empty array ([]), never null or undefined."
      },
      {
        question: "How does Array filter() differ from Array find()?",
        answer:
          "The filter() method iterates the entire array and returns a new array with all matching elements. The find() method stops at the first match and returns the element itself (or undefined)."
      },
      {
        question: "Does filter() skip empty slots in sparse arrays?",
        answer:
          "Yes. Array.prototype.filter() does not invoke the predicate callback for index positions that have never been assigned or were deleted."
      }
    ],
    relatedSlugs: ["array-map", "array-find", "array-reduce"],
    learnGuideSlug: "map-vs-foreach",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(number => number % 2 === 0);

console.log(evenNumbers);`,
  },
  {
    id: "array-reduce",
    title: "JavaScript Array reduce() Method",
    seoTitle: "JavaScript Array reduce() Method Explained Clearly",
    seoDescription:
      "Learn how JavaScript Array reduce() aggregates elements into a single value. Explore accumulators, initial values, and test live code in our playground.",
    description:
      "The JavaScript Array reduce() method executes a reducer callback function on each array element, passing the accumulated result from preceding calculations forward. It aggregates arrays into numbers, objects, lookups, or transformed collections.",
    category: "arrays",
    difficulty: "intermediate",
    tags: ["array", "reduce", "aggregation", "accumulator"],
    explanation:
      "Array.prototype.reduce() processes an array from left to right, maintaining a persistent accumulator value across iterations. The reducer callback receives the accumulator and the current element, performs a calculation, and returns the updated accumulator for the next cycle. Always provide an explicit initial value as the second argument to reduce() to prevent runtime errors when executing on empty arrays.",
    expectedOutput: "60",
    commonMistakes: [
      "Omitting the initial value parameter, which causes reduce() to throw a TypeError on empty arrays and use index 0 as the initial accumulator.",
      "Forgetting to return the updated accumulator from the callback, causing it to become undefined on subsequent iterations.",
      "Using reduce() for simple transformations that could be written much more readably with map() or filter().",
      "Accidentally mutating an object accumulator rather than returning it cleanly."
    ],
    faq: [
      {
        question: "Why should you always supply an initial value to Array reduce()?",
        answer:
          "Supplying an initial value guarantees the accumulator starts with a predictable data type and prevents a runtime TypeError if the method is called on an empty array."
      },
      {
        question: "Can Array reduce() return an object instead of a number?",
        answer:
          "Yes. The accumulator can be any data type, including an object, an array, or a Map. This makes reduce() ideal for grouping, frequency counting, and flattening data."
      },
      {
        question: "When should you use reduce() instead of map() and filter()?",
        answer:
          "Use reduce() when you need to transform an array into a single aggregated value (like a sum, average, or dictionary). If transforming items 1:1, prefer map()."
      }
    ],
    relatedSlugs: ["array-map", "array-filter"],
    learnGuideSlug: "array-reduce",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const numbers = [10, 20, 30];

const total = numbers.reduce((sum, number) => sum + number, 0);

console.log(total);`,
  },
  {
    id: "array-find",
    title: "JavaScript Array find() Method",
    seoTitle: "JavaScript Array find() Method: Search Array Items",
    seoDescription:
      "Search array elements with the JavaScript Array find() method. Learn how to locate the first matching object and test your code live in our compiler.",
    description:
      "The JavaScript Array find() method returns the first element in an array that satisfies a provided testing callback function. If no element satisfies the testing condition, it returns undefined, enabling fast linear searches across collections.",
    category: "arrays",
    difficulty: "beginner",
    tags: ["array", "find", "search", "predicates"],
    explanation:
      "Array.prototype.find() traverses an array in ascending order and executes a predicate callback on each item until it finds one that returns a truthy value. Upon finding a match, find() halts further iteration immediately and returns that specific element. If it reaches the end of the array without finding a match, it returns undefined. This makes find() significantly more efficient than filter() when only a single match is required.",
    expectedOutput: '{"id":2,"name":"Suresh"}',
    commonMistakes: [
      "Expecting find() to return an array of all matches; use filter() if you need all matching items.",
      "Forgetting that find() returns undefined on no match, leading to TypeError when trying to access properties on the result.",
      "Using findIndex() when you need the item itself, or vice versa.",
      "Writing predicate callbacks that do not return a boolean value."
    ],
    faq: [
      {
        question: "What does Array find() return if no element matches?",
        answer:
          "If no element satisfies the testing predicate, find() returns undefined."
      },
      {
        question: "Does Array find() stop iterating after finding a match?",
        answer:
          "Yes. The find() method short-circuits: it stops evaluating subsequent array elements as soon as the callback returns truthy."
      },
      {
        question: "How do you find the index of an element instead of the element itself?",
        answer:
          "Use Array.prototype.findIndex(), which returns the numerical index of the first matching element, or -1 if no element matches."
      }
    ],
    relatedSlugs: ["array-filter", "array-map"],
    learnGuideSlug: "map-vs-foreach",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Suresh" },
  { id: 3, name: "Alex" }
];

const user = users.find(user => user.id === 2);

console.log(user);`,
  },
];
