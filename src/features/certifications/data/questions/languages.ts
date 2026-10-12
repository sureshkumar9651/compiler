import { Question } from '../../types';

export const LANGUAGE_QUESTIONS: Question[] = [
  {
    "id": "js-q1-intermediate",
    "certificationId": "javascript-fundamentals",
    "topic": "Functions & Closures",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What will be output to the console when the following code is executed?",
    "codeSnippet": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst c1 = makeCounter();\nconst c2 = makeCounter();\n\nc1();\nc1();\nconsole.log(c1(), c2());",
    "options": [
      {
        "id": "opt-1",
        "text": "3 1"
      },
      {
        "id": "opt-2",
        "text": "3 3"
      },
      {
        "id": "opt-3",
        "text": "2 1"
      },
      {
        "id": "opt-4",
        "text": "undefined undefined"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Each invocation of makeCounter() instantiates an independent lexical scope and closure. c1 is incremented three times (yielding 1, 2, 3), while c2 is invoked once, returning 1.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
  },
  {
    "id": "js-q2-intermediate",
    "certificationId": "javascript-fundamentals",
    "topic": "Variables & Scope",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What is logged to the console when invoking testScope()?",
    "codeSnippet": "function testScope() {\n  console.log(typeof a);\n  console.log(typeof b);\n  var a = 10;\n  let b = 20;\n}\ntestScope();",
    "options": [
      {
        "id": "opt-1",
        "text": "\"undefined\" and then \"undefined\""
      },
      {
        "id": "opt-2",
        "text": "\"undefined\" and then throws ReferenceError"
      },
      {
        "id": "opt-3",
        "text": "Throws ReferenceError immediately on line 2"
      },
      {
        "id": "opt-4",
        "text": "\"number\" and then \"number\""
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "var declarations are hoisted with an initial value of undefined, so typeof a evaluates to \"undefined\". let declarations are hoisted into the Temporal Dead Zone (TDZ) and accessing them—even via typeof—throws a ReferenceError.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz"
  },
  {
    "id": "js-q3-advanced",
    "certificationId": "javascript-fundamentals",
    "topic": "Event Loop & Task Scheduling",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "In what exact sequence will the numbers be logged to the console in a standard ECMAScript environment?",
    "codeSnippet": "console.log(1);\n\nsetTimeout(() => console.log(2), 0);\n\nPromise.resolve().then(() => {\n  console.log(3);\n  queueMicrotask(() => console.log(4));\n}).then(() => console.log(5));\n\nconsole.log(6);",
    "options": [
      {
        "id": "opt-1",
        "text": "1, 6, 2, 3, 4, 5"
      },
      {
        "id": "opt-2",
        "text": "1, 6, 3, 4, 5, 2"
      },
      {
        "id": "opt-3",
        "text": "1, 6, 3, 5, 4, 2"
      },
      {
        "id": "opt-4",
        "text": "1, 2, 3, 4, 5, 6"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Synchronous statements run first: 1, 6. The microtask queue executes before the macrotask (setTimeout). The first Promise callback logs 3 and schedules microtask 4. Microtask 4 was queued before the chained Promise.then (5), so microtasks drain in order: 3, 4, 5. Finally, the timer macrotask executes: 2.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide"
  },
  {
    "id": "js-q4-advanced",
    "certificationId": "javascript-fundamentals",
    "topic": "Prototypes & Object Model",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What is the output of the following prototypical property assignment?",
    "codeSnippet": "const parent = {\n  get score() {\n    return this._val || 0;\n  },\n  set score(v) {\n    this._val = v * 2;\n  }\n};\n\nconst child = Object.create(parent);\nchild.score = 5;\n\nconsole.log(child.score, parent.score, child.hasOwnProperty('_val'));",
    "options": [
      {
        "id": "opt-1",
        "text": "10 0 true"
      },
      {
        "id": "opt-2",
        "text": "5 5 false"
      },
      {
        "id": "opt-3",
        "text": "10 10 false"
      },
      {
        "id": "opt-4",
        "text": "5 0 true"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When assigning to child.score, the prototype chain looks up the setter in parent. Within the setter, \"this\" is bound to the receiver (child), so child._val is assigned 10. parent remains unaffected (0), and child has its own property \"_val\" (true).",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"
  },
  {
    "id": "js-q5-advanced",
    "certificationId": "javascript-fundamentals",
    "topic": "Asynchronous Concurrency",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What will happen when runConcurrent() completes?",
    "codeSnippet": "async function runConcurrent() {\n  const p1 = Promise.reject(new Error('fail'));\n  const p2 = Promise.resolve('ok');\n  \n  try {\n    const res = await Promise.allSettled([p1, p2]);\n    console.log(res.map(r => r.status));\n  } catch (err) {\n    console.log('caught');\n  }\n}\nrunConcurrent();",
    "options": [
      {
        "id": "opt-1",
        "text": "Logs \"caught\""
      },
      {
        "id": "opt-2",
        "text": "Logs [\"rejected\", \"fulfilled\"]"
      },
      {
        "id": "opt-3",
        "text": "Throws an unhandled rejection error"
      },
      {
        "id": "opt-4",
        "text": "Logs [\"fulfilled\"]"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Promise.allSettled never rejects. It waits for all promises to settle and returns an array of outcome objects with status \"fulfilled\" or \"rejected\", allowing graceful error inspection without entering the catch block.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled"
  },
  {
    "id": "js-q6-advanced",
    "certificationId": "javascript-fundamentals",
    "topic": "Memory & Garbage Collection",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Which of the following data structures allows its keys to be garbage-collected when no other strong references exist, avoiding memory leaks?",
    "options": [
      {
        "id": "opt-1",
        "text": "Set"
      },
      {
        "id": "opt-2",
        "text": "Map with object keys"
      },
      {
        "id": "opt-3",
        "text": "WeakMap"
      },
      {
        "id": "opt-4",
        "text": "Object.freeze({})"
      }
    ],
    "correctOptionId": "opt-3",
    "explanation": "WeakMap maintains weak references to its object keys. If there are no other reachable strong references to a key object, the key and its associated value are eligible for garbage collection.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap"
  },
  {
    "id": "js-q7-advanced",
    "certificationId": "javascript-fundamentals",
    "topic": "Async Generators & Iteration",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What will be output by the following async generator iteration?",
    "codeSnippet": "async function* generator() {\n  yield await Promise.resolve(1);\n  yield 2;\n  return 3;\n}\n\n(async () => {\n  const values = [];\n  for await (const val of generator()) {\n    values.push(val);\n  }\n  console.log(values);\n})();",
    "options": [
      {
        "id": "opt-1",
        "text": "[1, 2, 3]"
      },
      {
        "id": "opt-2",
        "text": "[1, 2]"
      },
      {
        "id": "opt-3",
        "text": "[Promise, 2]"
      },
      {
        "id": "opt-4",
        "text": "Throws TypeError: generator is not async iterable"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "The for-await-of loop iterates over yielded values until done is true. The return value (3) sets done: true, so it is not pushed into the iteration sequence, resulting in [1, 2].",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of"
  },
  {
    "id": "js-q8-expert",
    "certificationId": "javascript-fundamentals",
    "topic": "Proxy & Metaprogramming",
    "category": "languages",
    "difficulty": "Expert",
    "question": "What will the following Proxy trap interaction output?",
    "codeSnippet": "const target = Object.preventExtensions({ x: 1 });\nconst proxy = new Proxy(target, {\n  has(t, prop) {\n    if (prop === 'y') return true;\n    return Reflect.has(t, prop);\n  }\n});\n\nconsole.log('x' in proxy, 'y' in proxy);",
    "options": [
      {
        "id": "opt-1",
        "text": "true true"
      },
      {
        "id": "opt-2",
        "text": "true false"
      },
      {
        "id": "opt-3",
        "text": "Throws TypeError due to proxy invariant violation"
      },
      {
        "id": "opt-4",
        "text": "false false"
      }
    ],
    "correctOptionId": "opt-3",
    "explanation": "The JavaScript Proxy invariant specifies: if a target object is non-extensible, the \"has\" trap cannot report a non-existent property as existing. Attempting to return true for \"y\" on non-extensible target violates this invariant and throws a TypeError.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has#invariants"
  },
  {
    "id": "js-q9-expert",
    "certificationId": "javascript-fundamentals",
    "topic": "Tagged Templates & AST",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How does the strings.raw property in a tagged template literal differ from the standard strings array parameter?",
    "options": [
      {
        "id": "opt-1",
        "text": "strings.raw contains unprocessed string fragments with escape sequences preserved verbatim (e.g. \\n as two characters)"
      },
      {
        "id": "opt-2",
        "text": "strings.raw contains the evaluated expressions before type coercion"
      },
      {
        "id": "opt-3",
        "text": "strings.raw is a mutable copy of the strings array"
      },
      {
        "id": "opt-4",
        "text": "strings.raw is only available when running in strict mode"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In tagged templates, strings.raw contains the template string fragments exactly as written in the source code without interpreting escape characters (e.g., \\t remains backslash + t, rather than a tab character).",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#raw_strings"
  },
  {
    "id": "js-q10-expert",
    "certificationId": "javascript-fundamentals",
    "topic": "SharedArrayBuffer & Atomics",
    "category": "languages",
    "difficulty": "Expert",
    "question": "In a Web Worker multi-threading context, what does Atomics.wait() do when invoked on the main browser thread?",
    "options": [
      {
        "id": "opt-1",
        "text": "Blocks the main thread until notified by another worker"
      },
      {
        "id": "opt-2",
        "text": "Throws a TypeError because Atomics.wait cannot be called on the main thread"
      },
      {
        "id": "opt-3",
        "text": "Converts the synchronous wait into an asynchronous Promise"
      },
      {
        "id": "opt-4",
        "text": "Automatically relinquishes control to the event loop"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "To prevent locking the UI and freezing the browser, the specification forbids calling Atomics.wait() on the main thread; doing so throws a TypeError. It is only permitted inside dedicated Web Workers.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait"
  },
  {
    "id": "ts-q1-intermediate",
    "certificationId": "typescript-engineering",
    "topic": "Type Narrowing",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What is the purpose of the custom type guard predicate syntax \"x is Admin\" in the return type of a function?",
    "options": [
      {
        "id": "opt-1",
        "text": "It casts the input value to Admin at runtime"
      },
      {
        "id": "opt-2",
        "text": "It instructs the compiler to narrow the type of x to Admin within any conditional branch where the function evaluates to true"
      },
      {
        "id": "opt-3",
        "text": "It ensures the function returns a boolean representation of the Admin prototype"
      },
      {
        "id": "opt-4",
        "text": "It creates a nominal branded type for Admin"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "A user-defined type guard with \"x is Admin\" informs TypeScript that if the function returns true, the variable passed as argument x can safely be narrowed to type Admin in subsequent code.",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates"
  },
  {
    "id": "ts-q2-intermediate",
    "certificationId": "typescript-engineering",
    "topic": "Generics & Constraints",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What type does keyof any produce in TypeScript?",
    "options": [
      {
        "id": "opt-1",
        "text": "string"
      },
      {
        "id": "opt-2",
        "text": "string | number | symbol"
      },
      {
        "id": "opt-3",
        "text": "never"
      },
      {
        "id": "opt-4",
        "text": "unknown"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "In TypeScript, valid JavaScript object property keys are strings, numbers, or symbols. Therefore, keyof any resolves to the union string | number | symbol.",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/keyof-types.html"
  },
  {
    "id": "ts-q3-advanced",
    "certificationId": "typescript-engineering",
    "topic": "Distributive Conditional Types",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Given the conditional type definition below, what does type Result resolve to?",
    "codeSnippet": "type ToArray<T> = T extends any ? T[] : never;\ntype Result = ToArray<string | number>;",
    "options": [
      {
        "id": "opt-1",
        "text": "(string | number)[]"
      },
      {
        "id": "opt-2",
        "text": "string[] | number[]"
      },
      {
        "id": "opt-3",
        "text": "[string, number]"
      },
      {
        "id": "opt-4",
        "text": "never"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "When a naked type parameter T is checked in a conditional type, it distributes over union members. ToArray<string | number> distributes into ToArray<string> | ToArray<number>, resolving to string[] | number[].",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types"
  },
  {
    "id": "ts-q4-advanced",
    "certificationId": "typescript-engineering",
    "topic": "Preventing Union Distribution",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "How do you prevent a conditional type from automatically distributing over a union type T?",
    "options": [
      {
        "id": "opt-1",
        "text": "Wrap both sides of the extends keyword in square brackets: [T] extends [any]"
      },
      {
        "id": "opt-2",
        "text": "Use the non-distributive keyword: T non_distributive extends any"
      },
      {
        "id": "opt-3",
        "text": "Declare T as T & {}"
      },
      {
        "id": "opt-4",
        "text": "Use the readonly modifier on T"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Surrounding the type parameter and constraint in square brackets (e.g. [T] extends [any]) disables the distributive behavior of conditional types, treating the union as a single consolidated entity.",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types"
  },
  {
    "id": "ts-q5-advanced",
    "certificationId": "typescript-engineering",
    "topic": "Template Literal Types",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What is the evaluated type of EventHandlers in the following declaration?",
    "codeSnippet": "type Event = 'click' | 'hover';\ntype EventHandlers = `on${Capitalize<Event>}`;",
    "options": [
      {
        "id": "opt-1",
        "text": "\"onClick\" | \"onHover\""
      },
      {
        "id": "opt-2",
        "text": "\"onclick\" | \"onhover\""
      },
      {
        "id": "opt-3",
        "text": "string"
      },
      {
        "id": "opt-4",
        "text": "(\"onClick\") & (\"onHover\")"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Template literal types distribute over unions, and the intrinsic Capitalize helper capitalizes the first character of each union member, yielding the union \"onClick\" | \"onHover\".",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html"
  },
  {
    "id": "ts-q6-advanced",
    "certificationId": "typescript-engineering",
    "topic": "Mapped Types & Key Remapping",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What does the \"as\" clause accomplish in modern TypeScript mapped types?",
    "codeSnippet": "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};",
    "options": [
      {
        "id": "opt-1",
        "text": "It re-maps and re-names the output keys of the mapped type"
      },
      {
        "id": "opt-2",
        "text": "It type-casts the property values to string"
      },
      {
        "id": "opt-3",
        "text": "It forces strict null checks on the object"
      },
      {
        "id": "opt-4",
        "text": "It marks all properties as optional"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Key remapping via \"as\" allows developers to transform existing object keys into new key names (or filter keys out by remapping them to \"never\") within a mapped type.",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as"
  },
  {
    "id": "ts-q7-advanced",
    "certificationId": "typescript-engineering",
    "topic": "Type Variance (Covariance & Contravariance)",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Under the --strictFunctionTypes compiler flag, how do function parameter types behave with respect to subtyping?",
    "options": [
      {
        "id": "opt-1",
        "text": "They are contravariant"
      },
      {
        "id": "opt-2",
        "text": "They are covariant"
      },
      {
        "id": "opt-3",
        "text": "They are bivariant"
      },
      {
        "id": "opt-4",
        "text": "They are invariant"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Under --strictFunctionTypes, function parameter types are contravariant. A function accepting a broader supertype can be assigned where a function accepting a narrower subtype is expected, but not vice versa.",
    "referenceUrl": "https://www.typescriptlang.org/tsconfig/#strictFunctionTypes"
  },
  {
    "id": "ts-q8-expert",
    "certificationId": "typescript-engineering",
    "topic": "infer in Conditional Types",
    "category": "languages",
    "difficulty": "Expert",
    "question": "When multiple infer declarations for the same type variable appear in contravariant positions (such as function parameters), what does TypeScript infer?",
    "codeSnippet": "type Intersect<T> = T extends {\n  a: (x: infer U) => void;\n  b: (x: infer U) => void;\n} ? U : never;",
    "options": [
      {
        "id": "opt-1",
        "text": "An intersection of the candidate types"
      },
      {
        "id": "opt-2",
        "text": "A union of the candidate types"
      },
      {
        "id": "opt-3",
        "text": "unknown"
      },
      {
        "id": "opt-4",
        "text": "never"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Multiple candidates for the same type variable in contravariant positions (like function arguments) infer an intersection type. In covariant positions (like return values), they infer a union.",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types"
  },
  {
    "id": "ts-q9-expert",
    "certificationId": "typescript-engineering",
    "topic": "Excess Property Checks",
    "category": "languages",
    "difficulty": "Expert",
    "question": "Why does assigning an object literal directly to a typed variable trigger an excess property error, while assigning the same object via an intermediate variable succeeds?",
    "options": [
      {
        "id": "opt-1",
        "text": "Fresh object literals undergo excess property checking to catch misspelled properties, whereas non-fresh references rely purely on structural subtyping"
      },
      {
        "id": "opt-2",
        "text": "Intermediate variables strip all excess properties at runtime"
      },
      {
        "id": "opt-3",
        "text": "Intermediate variables bypass type checking entirely"
      },
      {
        "id": "opt-4",
        "text": "The compiler disables strict mode for variables declared with const"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "TypeScript implements excess property checks exclusively on \"fresh\" object literals during direct assignments or function arguments to catch common bugs. Once bound to a reference, structural subtyping rules take over.",
    "referenceUrl": "https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks"
  },
  {
    "id": "ts-q10-expert",
    "certificationId": "typescript-engineering",
    "topic": "Nominal Typing & Branding",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How is nominal (branded) typing typically implemented in TypeScript without runtime overhead?",
    "codeSnippet": "type UserId = string & { readonly __brand: unique symbol };",
    "options": [
      {
        "id": "opt-1",
        "text": "By intersecting a primitive with an object type containing an uninstantiated unique symbol tag"
      },
      {
        "id": "opt-2",
        "text": "By instantiating a Symbol class in JavaScript memory"
      },
      {
        "id": "opt-3",
        "text": "By using the \"nominal\" keyword in tsconfig.json"
      },
      {
        "id": "opt-4",
        "text": "By registering the type in the global symbol registry"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Type branding intersects a base primitive (like string) with an uninstantiated phantom property (like { readonly __brand: unique symbol }). At compile time, standard strings cannot be assigned to UserId without an explicit assertion, while incurring zero runtime cost."
  },
  {
    "id": "py-q1-intermediate",
    "certificationId": "python-programming",
    "topic": "Default Arguments & Object Mutability",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What is the output of executing the following Python code snippet?",
    "codeSnippet": "def append_item(val, items=[]):\n    items.append(val)\n    return items\n\nprint(append_item(1))\nprint(append_item(2))",
    "options": [
      {
        "id": "opt-1",
        "text": "[1] then [1, 2]"
      },
      {
        "id": "opt-2",
        "text": "[1] then [2]"
      },
      {
        "id": "opt-3",
        "text": "[1] then TypeError"
      },
      {
        "id": "opt-4",
        "text": "[[1]] then [[2]]"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Python, default arguments are evaluated only once when the function definition statement is executed, not at each call. The empty list is shared across subsequent calls if mutated.",
    "referenceUrl": "https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
  },
  {
    "id": "py-q2-intermediate",
    "certificationId": "python-programming",
    "topic": "Generators & Memory Evaluation",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What is the key performance difference between [x * 2 for x in range(10_000_000)] and (x * 2 for x in range(10_000_000))?",
    "options": [
      {
        "id": "opt-1",
        "text": "The list comprehension allocates all elements eagerly in memory (~80MB+), while the generator expression produces elements lazily on demand with negligible constant memory footprint"
      },
      {
        "id": "opt-2",
        "text": "The generator expression is parallelized across multiple CPU cores automatically"
      },
      {
        "id": "opt-3",
        "text": "The list comprehension returns an immutable tuple"
      },
      {
        "id": "opt-4",
        "text": "Generator expressions cannot be iterated over in a for loop"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Parentheses create a generator object that computes values on demand via the iterator protocol, retaining O(1) memory, unlike eager list comprehensions that materialize the full collection immediately.",
    "referenceUrl": "https://docs.python.org/3/tutorial/classes.html#generator-expressions"
  },
  {
    "id": "py-q3-advanced",
    "certificationId": "python-programming",
    "topic": "Data Model & Descriptor Protocol",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What distinguishes a \"data descriptor\" from a \"non-data descriptor\" in Python's attribute lookup order?",
    "options": [
      {
        "id": "opt-1",
        "text": "Data descriptors implement __set__ or __delete__, taking precedence over an instance's __dict__; non-data descriptors implement only __get__ and are shadowed by instance __dict__ entries"
      },
      {
        "id": "opt-2",
        "text": "Data descriptors only store primitive types (int, float, str)"
      },
      {
        "id": "opt-3",
        "text": "Non-data descriptors can only be attached to built-in types"
      },
      {
        "id": "opt-4",
        "text": "Data descriptors are evaluated in CPython bytecode, whereas non-data descriptors use AST interpretation"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Python attribute lookup checks class data descriptors first (defining __set__/__delete__). If found, the descriptor handles the access before the instance __dict__. If it only defines __get__ (a non-data descriptor like a regular method), an instance dictionary key shadows it.",
    "referenceUrl": "https://docs.python.org/3/howto/descriptor.html#descriptor-protocol"
  },
  {
    "id": "py-q4-advanced",
    "certificationId": "python-programming",
    "topic": "CPython GIL & Concurrency Models",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why does running a CPU-bound calculation across 8 Python threading.Thread instances on an 8-core CPU typically NOT decrease execution time in standard CPython?",
    "options": [
      {
        "id": "opt-1",
        "text": "The Global Interpreter Lock (GIL) ensures only one OS thread executes Python bytecode at any given moment, adding thread context-switching overhead without true multicore parallelism"
      },
      {
        "id": "opt-2",
        "text": "CPython threads are green threads that cannot bind to OS kernel threads"
      },
      {
        "id": "opt-3",
        "text": "Linux limits Python processes to 1 core unless granted root access"
      },
      {
        "id": "opt-4",
        "text": "CPU cache coherency shuts down threads that share global variables"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "CPython’s GIL serializes thread execution for thread-safe memory management. For CPU-bound tasks, multiple threads compete for the single lock, causing lock thrashing. True multicore execution requires multiprocessing, C extensions releasing the GIL, or nogil (PEP 703).",
    "referenceUrl": "https://docs.python.org/3/glossary.html#term-global-interpreter-lock"
  },
  {
    "id": "py-q5-advanced",
    "certificationId": "python-programming",
    "topic": "asyncio & Task Error Handling",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "In asyncio.gather(coro1(), coro2(), return_exceptions=False), what occurs when coro1 raises an unhandled Exception?",
    "options": [
      {
        "id": "opt-1",
        "text": "The exception is immediately propagated to the caller of gather; coro2 continues running in the background unless explicitly cancelled"
      },
      {
        "id": "opt-2",
        "text": "coro2 is cancelled immediately by default"
      },
      {
        "id": "opt-3",
        "text": "The entire event loop terminates abruptly"
      },
      {
        "id": "opt-4",
        "text": "The exception is suppressed and converted to None"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When return_exceptions is False, the first raised exception is immediately raised from gather. However, other tasks submitted to gather are not automatically cancelled and continue executing as orphaned tasks.",
    "referenceUrl": "https://docs.python.org/3/library/asyncio-task.html#asyncio.gather"
  },
  {
    "id": "py-q6-advanced",
    "certificationId": "python-programming",
    "topic": "Generators & yield from Semantics",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What capability does \"yield from subgen()\" provide beyond simply looping with \"for x in subgen(): yield x\"?",
    "options": [
      {
        "id": "opt-1",
        "text": "It creates a transparent bidirectional channel transmitting .send() values and .throw() exceptions directly between the caller and the subgenerator, and receives the subgenerator's return value"
      },
      {
        "id": "opt-2",
        "text": "It executes the subgenerator asynchronously in a background thread"
      },
      {
        "id": "opt-3",
        "text": "It prevents StopIteration exceptions from ever occurring"
      },
      {
        "id": "opt-4",
        "text": "It serializes generator states to disk"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PEP 380 established yield from as a full delegating channel: values passed to send(), exceptions passed to throw(), and close() calls are routed straight into the subgenerator, and the return value of the subgenerator becomes the expression value of yield from.",
    "referenceUrl": "https://peps.python.org/pep-0380/"
  },
  {
    "id": "py-q7-advanced",
    "certificationId": "python-programming",
    "topic": "Metaprogramming & __init_subclass__",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why is __init_subclass__ (PEP 487) preferred over creating a custom metaclass for subclass validation and registration?",
    "options": [
      {
        "id": "opt-1",
        "text": "It is simpler, avoids metaclass conflicts during multiple inheritance, and is called automatically whenever a subclass is derived"
      },
      {
        "id": "opt-2",
        "text": "Metaclasses are deprecated in Python 3.12+"
      },
      {
        "id": "opt-3",
        "text": "__init_subclass__ runs at C speed while metaclasses run in pure Python"
      },
      {
        "id": "opt-4",
        "text": "Metaclasses cannot access class attributes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PEP 487 introduced __init_subclass__ as a classmethod on base classes called whenever a derived class is initialized. It eliminates the notorious \"metaclass conflict\" in multiple inheritance while providing cleaner hook points for validation.",
    "referenceUrl": "https://docs.python.org/3/reference/datamodel.html#customizing-class-creation"
  },
  {
    "id": "py-q8-expert",
    "certificationId": "python-programming",
    "topic": "Memory Management & Cyclic Garbage Collector",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How does CPython detect and reclaim memory when two objects reference each other in a cyclic reference (e.g. a.b = b; b.a = a) when their reference counts never reach zero?",
    "options": [
      {
        "id": "opt-1",
        "text": "The generational cyclic GC isolates container objects, temporarily decrements trial reference counts corresponding to internal references via tp_traverse, and reclaims objects with zero external references"
      },
      {
        "id": "opt-2",
        "text": "CPython stops the entire process and scans the C call stack from root pointers"
      },
      {
        "id": "opt-3",
        "text": "Circular references cannot be collected in Python and always leak memory"
      },
      {
        "id": "opt-4",
        "text": "The OS kernel detects cyclic memory pointers via mprotect and frees them"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "CPython combines reference counting with a generational cyclic garbage collector. The GC identifies container objects (lists, dicts, instances), tracks internal pointers with tp_traverse, and identifies cycles that have no surviving references from outside the isolated set.",
    "referenceUrl": "https://devguide.python.org/internals/garbage-collector/"
  },
  {
    "id": "py-q9-expert",
    "certificationId": "python-programming",
    "topic": "Context Managers & Exception Propagation",
    "category": "languages",
    "difficulty": "Expert",
    "question": "In the Python context management protocol, how does a custom __exit__(self, exc_type, exc_val, exc_tb) suppress an exception raised inside the \"with\" block so that it does NOT propagate outward?",
    "options": [
      {
        "id": "opt-1",
        "text": "By returning a truthy value (such as True) from the __exit__ method"
      },
      {
        "id": "opt-2",
        "text": "By raising a StopIteration exception inside __exit__"
      },
      {
        "id": "opt-3",
        "text": "By calling sys.exc_clear()"
      },
      {
        "id": "opt-4",
        "text": "By setting exc_type = None"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If an exception occurs within a \"with\" block, Python calls __exit__(exc_type, exc_val, exc_tb). If __exit__ returns True (or any truthy value), the exception is swallowed and execution resumes normally after the with statement.",
    "referenceUrl": "https://docs.python.org/3/reference/datamodel.html#with-statement-context-managers"
  },
  {
    "id": "py-q10-expert",
    "certificationId": "python-programming",
    "topic": "CPython 3.11+ Specializing Adaptive Interpreter",
    "category": "languages",
    "difficulty": "Expert",
    "question": "What is the architectural mechanism of PEP 659 (Specializing Adaptive Interpreter) introduced in Python 3.11+?",
    "options": [
      {
        "id": "opt-1",
        "text": "It monitors opcode execution inline; when bytecode instructions (like LOAD_ATTR or BINARY_OP) become stable for monomorphic types, it dynamically specializes them into fast inline opcodes (like LOAD_ATTR_INSTANCE_VALUE)"
      },
      {
        "id": "opt-2",
        "text": "It compiles all Python functions into WebAssembly at import time"
      },
      {
        "id": "opt-3",
        "text": "It removes the Python GIL during function calls"
      },
      {
        "id": "opt-4",
        "text": "It replaces CPython with PyPy at runtime"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PEP 659 implemented inline bytecode quickening and specialization. Bytecodes identify hot spots and specialize generic opcodes into super-fast specialized instructions based on observed runtime types, falling back to adaptive opcodes if types change.",
    "referenceUrl": "https://peps.python.org/pep-0659/"
  },
  {
    "id": "java-q1-inter",
    "certificationId": "java-programming",
    "topic": "Records & Immutability",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "In modern Java (Java 16+), how does a record class enforce immutability and state encapsulation?",
    "options": [
      {
        "id": "opt-1",
        "text": "Component fields are automatically declared private final, and canonical constructor and accessor methods are implicitly synthesized"
      },
      {
        "id": "opt-2",
        "text": "Records cannot contain methods other than auto-generated getters"
      },
      {
        "id": "opt-3",
        "text": "Records store data entirely in off-heap memory"
      },
      {
        "id": "opt-4",
        "text": "Records prevent mutation of referenced mutable objects such as ArrayList components"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A Java record synthesizes private final fields, canonical constructor, equals(), hashCode(), and accessors. However, shallow immutability applies: if a record holds a reference to a mutable List, callers can still mutate the list contents unless defensively copied in a compact constructor.",
    "referenceUrl": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Record.html"
  },
  {
    "id": "java-q2-inter",
    "certificationId": "java-programming",
    "topic": "Pattern Matching & Sealed Classes",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "When switching over an instance of a sealed interface hierarchy in Java 21, what occurs if all permitted subclasses are covered by case labels?",
    "options": [
      {
        "id": "opt-1",
        "text": "The switch expression is exhaustive, so no default case is required at compile time"
      },
      {
        "id": "opt-2",
        "text": "A runtime NullPointerException is thrown if any permitted subclass is omitted"
      },
      {
        "id": "opt-3",
        "text": "The compiler forces an explicit default case to handle potential foreign bytecode"
      },
      {
        "id": "opt-4",
        "text": "Sealed interfaces cannot be used as switch selector expressions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Sealed hierarchies permit a closed set of subtypes. The Java compiler verifies exhaustiveness for switch expressions across all permitted subtypes; if all subclasses are handled, omitting default is fully valid and preferred.",
    "referenceUrl": "https://openjdk.org/jeps/441"
  },
  {
    "id": "java-q3-adv",
    "certificationId": "java-programming",
    "topic": "Virtual Threads & Project Loom",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "In Java 21 Virtual Threads (Project Loom), what causes a virtual thread to become \"pinned\" to its underlying carrier OS thread during blocking operations?",
    "options": [
      {
        "id": "opt-1",
        "text": "Executing blocking I/O inside a synchronized block/method or invoking native code via JNI"
      },
      {
        "id": "opt-2",
        "text": "Using java.util.concurrent.locks.ReentrantLock instead of intrinsic locks"
      },
      {
        "id": "opt-3",
        "text": "Calling Thread.sleep() or CompletableFuture.join()"
      },
      {
        "id": "opt-4",
        "text": "Accessing thread-local variables exceeding 1 KB in size"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Virtual threads unmount from carrier threads during blocking I/O unless pinned. Pinning occurs when blocking happens inside a synchronized block/method (holding a monitor on the carrier stack) or inside native JNI calls. ReentrantLock does not pin virtual threads.",
    "referenceUrl": "https://openjdk.org/jeps/444"
  },
  {
    "id": "java-q4-adv",
    "certificationId": "java-programming",
    "topic": "JVM Garbage Collection",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "How does the Generational Z Garbage Collector (Generational ZGC) in Java 21 achieve sub-millisecond stop-the-world pause times even on multi-terabyte heaps?",
    "options": [
      {
        "id": "opt-1",
        "text": "By performing colored pointers and load barriers concurrently with application threads, separating young and old generations concurrently"
      },
      {
        "id": "opt-2",
        "text": "By disabling garbage collection entirely during high-throughput requests"
      },
      {
        "id": "opt-3",
        "text": "By offloading dead object reclamation to GPU compute shaders"
      },
      {
        "id": "opt-4",
        "text": "By freezing mutator threads until the entire young gen is compacted"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Generational ZGC uses reference metadata bits (colored pointers) and JIT-compiled load barriers to intercept object reads and resolve object references concurrently while application threads execute, maintaining pause times under 1 millisecond regardless of heap volume.",
    "referenceUrl": "https://openjdk.org/jeps/439"
  },
  {
    "id": "java-q5-adv",
    "certificationId": "java-programming",
    "topic": "Java Memory Model (JMM)",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "According to the Java Memory Model (JSR-133), what memory ordering guarantee is established by writing to a volatile field?",
    "options": [
      {
        "id": "opt-1",
        "text": "A write to a volatile variable establishes a happens-before relationship with all subsequent reads of that same variable by any thread"
      },
      {
        "id": "opt-2",
        "text": "It acquires an exclusive reentrant mutex on the enclosing object instance"
      },
      {
        "id": "opt-3",
        "text": "It forces atomic increments (e.g. i++) without requiring VarHandle or AtomicInteger"
      },
      {
        "id": "opt-4",
        "text": "It prevents the variable from being evicted from the CPU L1 cache indefinitely"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Under the JMM, a volatile write happens-before subsequent volatile reads of that same field. Memory actions prior to the write in the writing thread are guaranteed to be visible to the reading thread after the read. Volatile does NOT provide compound atomicity like i++.",
    "referenceUrl": "https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4"
  },
  {
    "id": "java-q6-adv",
    "certificationId": "java-programming",
    "topic": "Asynchronous Concurrency",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Consider CompletableFuture.allOf(cf1, cf2).join(). If cf1 fails exceptionally and cf2 completes normally, what exception behavior occurs on .join()?",
    "options": [
      {
        "id": "opt-1",
        "text": "join() throws CompletionException wrapping the underlying cause of cf1"
      },
      {
        "id": "opt-2",
        "text": "join() silently swallows the exception and returns null"
      },
      {
        "id": "opt-3",
        "text": "cf2 is immediately cancelled and interrupted"
      },
      {
        "id": "opt-4",
        "text": "join() blocks indefinitely waiting for all tasks to succeed"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "CompletableFuture.allOf() completes exceptionally if any of the underlying stages complete exceptionally. Calling .join() throws an unchecked CompletionException wrapping the first encountered throwable.",
    "referenceUrl": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/CompletableFuture.html"
  },
  {
    "id": "java-q7-adv",
    "certificationId": "java-programming",
    "topic": "JVM Classloading",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What is the structural difference between ClassNotFoundException and NoClassDefFoundError in Java?",
    "options": [
      {
        "id": "opt-1",
        "text": "ClassNotFoundException is a checked exception when dynamically loading a class by name, whereas NoClassDefFoundError is a linkage error when a class was available at compile-time but missing or failed static initialization at runtime"
      },
      {
        "id": "opt-2",
        "text": "NoClassDefFoundError occurs only when the bytecode contains invalid opcodes"
      },
      {
        "id": "opt-3",
        "text": "ClassNotFoundException is thrown by the JVM bootstrap classloader exclusively"
      },
      {
        "id": "opt-4",
        "text": "They are identical and interchangeable exceptions under Java 17+"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "ClassNotFoundException occurs when an application explicitly calls Class.forName() or loadClass() with an invalid binary name. NoClassDefFoundError occurs when the JVM attempts to resolve a class dependency that was present at compile-time but cannot be found or failed <clinit> initialization during runtime execution.",
    "referenceUrl": "https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-5.html"
  },
  {
    "id": "java-q8-exp",
    "certificationId": "java-programming",
    "topic": "JIT Optimization & Escape Analysis",
    "category": "languages",
    "difficulty": "Expert",
    "question": "In the HotSpot C2 JIT compiler, what optimization occurs when Escape Analysis determines that an allocated object does not escape the current method scope?",
    "options": [
      {
        "id": "opt-1",
        "text": "Scalar replacement: the object is decomposed into its primitive components in CPU registers or stack frames, avoiding heap allocation entirely"
      },
      {
        "id": "opt-2",
        "text": "The object is placed into the Metaspace region to survive major garbage collections"
      },
      {
        "id": "opt-3",
        "text": "The object is converted into a native shared library"
      },
      {
        "id": "opt-4",
        "text": "The method is converted into interpreted mode to save memory"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When escape analysis proves an object is non-escaping, C2 applies Scalar Replacement. Instead of allocating memory on the heap, fields are disassembled into separate scalar variables stored directly in CPU registers or on the call stack, eliminating GC pressure and synchronization overhead (lock elision).",
    "referenceUrl": "https://wiki.openjdk.org/display/HotSpot/EscapeAnalysis"
  },
  {
    "id": "java-q9-exp",
    "certificationId": "java-programming",
    "topic": "Hardware Concurrency & False Sharing",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How does the LMAX Disruptor pattern prevent \"false sharing\" when multiple worker threads read and write independent sequence numbers in a high-throughput Java ring buffer?",
    "options": [
      {
        "id": "opt-1",
        "text": "By applying cache line padding (or @jdk.internal.vm.annotation.Contended) to space variables across distinct 64-byte L1/L2 cache lines"
      },
      {
        "id": "opt-2",
        "text": "By synchronizing all thread operations on a global Java monitor"
      },
      {
        "id": "opt-3",
        "text": "By pinning all threads to CPU core 0"
      },
      {
        "id": "opt-4",
        "text": "By storing ring buffer sequences in Redis in-memory storage"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "False sharing occurs when two independent variables reside on the same 64-byte CPU cache line. Modifying one variable in core A invalidates the entire cache line in core B (MESI cache coherence protocol). Padding adds dummy long variables or @Contended padding to guarantee separate cache line residences.",
    "referenceUrl": "https://lmax-exchange.github.io/disruptor/"
  },
  {
    "id": "java-q10-exp",
    "certificationId": "java-programming",
    "topic": "Foreign Function & Memory API",
    "category": "languages",
    "difficulty": "Expert",
    "question": "In Java 22 / Project Panama (java.lang.foreign), what advantage does a confined Arena offer over traditional off-heap Unsafe memory management?",
    "options": [
      {
        "id": "opt-1",
        "text": "Deterministic, thread-confined lifecycle bounds with guaranteed bounds-checking and automatic reclamation without manual free() memory leaks"
      },
      {
        "id": "opt-2",
        "text": "Zero performance cost when accessing GPU texture buffers"
      },
      {
        "id": "opt-3",
        "text": "Compilation to WebAssembly bytecode automatically"
      },
      {
        "id": "opt-4",
        "text": "Ability to bypass all JVM operating system permission checks"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Foreign Function & Memory API (Arena) provides safe off-heap allocation. An Arena.ofConfined() is bound to a single thread and guarantees spatial safety (bounds-checking) and temporal safety (segment cannot be accessed after arena.close()), preventing dangling pointer segfaults typical of sun.misc.Unsafe.",
    "referenceUrl": "https://openjdk.org/jeps/454"
  },
  {
    "id": "go-q1-inter",
    "certificationId": "go-programming",
    "topic": "Channel Semantics & States",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "In Go, what happens when a goroutine attempts to receive from a closed, non-empty channel?",
    "options": [
      {
        "id": "opt-1",
        "text": "It receives remaining buffered values until empty, then subsequent receives immediately yield the zero value with ok == false"
      },
      {
        "id": "opt-2",
        "text": "The runtime immediately panics with \"receive on closed channel\""
      },
      {
        "id": "opt-3",
        "text": "The receiving goroutine blocks indefinitely"
      },
      {
        "id": "opt-4",
        "text": "The channel resets to its initial unbuffered state"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Go, closing a channel does not discard buffered values. Receivers drain remaining values with ok == true. Once drained, receives yield the zero value for the channel element type with ok == false without blocking.",
    "referenceUrl": "https://go.dev/ref/spec#Receive_operator"
  },
  {
    "id": "go-q2-inter",
    "certificationId": "go-programming",
    "topic": "Slice Headers & Memory Backing",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "Given s := make([]int, 3, 5), what happens when a function calls append(s, 42) and assigns it to a new variable s2?",
    "options": [
      {
        "id": "opt-1",
        "text": "s2 shares the same backing array as s at index 3, but s.Len remains 3 while s2.Len becomes 4"
      },
      {
        "id": "opt-2",
        "text": "A completely new backing array of size 10 is allocated for s2"
      },
      {
        "id": "opt-3",
        "text": "s and s2 panic due to slice aliasing violations"
      },
      {
        "id": "opt-4",
        "text": "s.Len is automatically updated to 4 in the parent scope"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Slices in Go are 24-byte headers containing pointer, length, and capacity. Because capacity is 5 and length is 3, append fits within existing capacity without reallocation. It mutates index 3 of the shared backing array and returns a slice header with len 4.",
    "referenceUrl": "https://go.dev/blog/slices-intro"
  },
  {
    "id": "go-q3-adv",
    "certificationId": "go-programming",
    "topic": "Go Runtime GMP Scheduler",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "How does the Go runtime scheduler (GMP model) handle a goroutine that performs a blocking system call (e.g. read from disk)?",
    "options": [
      {
        "id": "opt-1",
        "text": "The thread M running G disassociates from logical processor P, allowing another idle thread M to take P and execute remaining runnable goroutines"
      },
      {
        "id": "opt-2",
        "text": "All goroutines on that processor P are blocked until the system call returns"
      },
      {
        "id": "opt-3",
        "text": "The scheduler kills the goroutine and spawns an asynchronous worker"
      },
      {
        "id": "opt-4",
        "text": "The system call is converted into an interrupt handler on thread 0"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Go scheduler architecture, G is goroutine, M is OS thread, P is logical processor. When M enters a blocking syscall, it relinquishes P (enters syscall mode). Sysmon or an idle M claims P to continue running other goroutines in the run queue without stalls.",
    "referenceUrl": "https://go.dev/src/runtime/proc.go"
  },
  {
    "id": "go-q4-adv",
    "certificationId": "go-programming",
    "topic": "Race Detector & Memory Ordering",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why does passing \"-race\" flag in `go test` detect data races, and what is its operational mechanism?",
    "options": [
      {
        "id": "opt-1",
        "text": "It instruments memory reads and writes using ThreadSanitizer (TSan) shadow memory and vector clocks to detect unsynchronized concurrent access"
      },
      {
        "id": "opt-2",
        "text": "It acquires a global lock on every variable mutation, degrading performance to single-thread execution"
      },
      {
        "id": "opt-3",
        "text": "It statically proves formal concurrency safety at compile time without runtime instrumentation"
      },
      {
        "id": "opt-4",
        "text": "It intercepts network packets and drops duplicate requests"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Go race detector uses ThreadSanitizer. Code is compiled with instrumentation on all memory accesses. A shadow memory records which goroutines recently read and wrote memory locations along with synchronization events to identify conflicting accesses where at least one is a write.",
    "referenceUrl": "https://go.dev/doc/articles/race_detector"
  },
  {
    "id": "go-q5-adv",
    "certificationId": "go-programming",
    "topic": "sync.Pool & GC Lifecycle",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why should sync.Pool NOT be used as a connection pool (e.g. database client pool) in Go production services?",
    "options": [
      {
        "id": "opt-1",
        "text": "Objects in sync.Pool may be cleared and deallocated unpredictably on any garbage collection cycle"
      },
      {
        "id": "opt-2",
        "text": "sync.Pool is not safe for concurrent use across multiple goroutines"
      },
      {
        "id": "opt-3",
        "text": "sync.Pool causes severe memory leaks because pooled objects are never freed"
      },
      {
        "id": "opt-4",
        "text": "sync.Pool only stores primitive types like int and string"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "sync.Pool is designed for short-lived, transient object reuse (such as byte buffers) to reduce GC allocation pressure. The Go GC drops or drains pool items during GC sweeps. It provides zero guarantees on retention, making it unsuitable for persistent network connections.",
    "referenceUrl": "https://pkg.go.dev/sync#Pool"
  },
  {
    "id": "go-q6-adv",
    "certificationId": "go-programming",
    "topic": "Escape Analysis & Allocation",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Under Go compiler escape analysis (`go build -gcflags=\"-m\"`), which of the following scenarios will cause a variable to escape from the stack to the heap?",
    "options": [
      {
        "id": "opt-1",
        "text": "Passing a variable to fmt.Println() which accepts arguments as interface{} (any)"
      },
      {
        "id": "opt-2",
        "text": "Passing a struct by value to a non-inlined private function"
      },
      {
        "id": "opt-3",
        "text": "Creating a local fixed-size array of 64 bytes inside a function"
      },
      {
        "id": "opt-4",
        "text": "Using defer to close an open file descriptor"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "fmt.Println takes ...any. Converting a concrete value to an empty interface box requires storing the value where the interface can reference it. Because reflection and interface methods can outlive the call, the variable escapes to the heap.",
    "referenceUrl": "https://go.dev/doc/faq#stack_or_heap"
  },
  {
    "id": "go-q7-adv",
    "certificationId": "go-programming",
    "topic": "Context Cancellation & Goroutine Leaks",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What is the primary cause of goroutine leaks when working with context.WithCancel or context.WithTimeout?",
    "options": [
      {
        "id": "opt-1",
        "text": "Launching a worker goroutine that blocks indefinitely on an unbuffered channel without selecting on ctx.Done()"
      },
      {
        "id": "opt-2",
        "text": "Passing context as the first argument in a function signature"
      },
      {
        "id": "opt-3",
        "text": "Calling cancel() multiple times concurrently"
      },
      {
        "id": "opt-4",
        "text": "Storing request ID values in context.WithValue()"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If a worker goroutine sends or receives on a channel without listening to ctx.Done(), and the receiver exits early, the worker remains blocked on channel I/O forever in memory. Goroutines are not garbage collected while blocked on channels.",
    "referenceUrl": "https://go.dev/blog/context"
  },
  {
    "id": "go-q8-exp",
    "certificationId": "go-programming",
    "topic": "Go Tri-Color Concurrent GC",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How does Go runtime's hybrid write barrier maintain the tri-color invariant during concurrent garbage collection marking?",
    "options": [
      {
        "id": "opt-1",
        "text": "When a pointer is overwritten, any newly created or shaded object is shaded grey immediately, preventing black objects from pointing directly to white objects without intermediate grey nodes"
      },
      {
        "id": "opt-2",
        "text": "By stopping all mutator threads during the entire marking phase"
      },
      {
        "id": "opt-3",
        "text": "By requiring that all heap allocations pass through a central mutex"
      },
      {
        "id": "opt-4",
        "text": "By copying all active objects to a secondary semispace buffer"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Go uses a concurrent tri-color mark-sweep collector. The hybrid write barrier shades overwritten pointers grey and shades newly created pointers grey if allocated during marking. This guarantees the strong tri-color invariant without requiring a stop-the-world stack re-scan.",
    "referenceUrl": "https://go.dev/src/runtime/mgc.go"
  },
  {
    "id": "go-q9-exp",
    "certificationId": "go-programming",
    "topic": "Interface Internal Representation",
    "category": "languages",
    "difficulty": "Expert",
    "question": "Given: var err error = (*MyCustomError)(nil). Why does the boolean check `if err != nil` evaluate to TRUE in Go?",
    "options": [
      {
        "id": "opt-1",
        "text": "Because an interface is a two-word pair (type, data); here the type is *MyCustomError, so the interface wrapper itself is non-nil"
      },
      {
        "id": "opt-2",
        "text": "Because Go interfaces automatically cast nil pointers to boolean true"
      },
      {
        "id": "opt-3",
        "text": "Because MyCustomError must implement an IsNil() method to be checked"
      },
      {
        "id": "opt-4",
        "text": "Because the Go compiler treats pointer errors as unhandled runtime warnings"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "An interface in Go is represented as either iface (itab + data) or eface (_type + data). An interface value equals nil ONLY if both its type descriptor and its data pointer are nil. A typed nil pointer (*MyCustomError)(nil) has a valid type descriptor, so err != nil is true.",
    "referenceUrl": "https://go.dev/doc/faq#nil_error"
  },
  {
    "id": "go-q10-exp",
    "certificationId": "go-programming",
    "topic": "Go Network Poller & Epoll Integration",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How does the Go runtime network poller handle thousands of concurrent net.Conn socket reads without exhausting OS threads?",
    "options": [
      {
        "id": "opt-1",
        "text": "Sockets are set to non-blocking mode; when EAGAIN occurs, the runtime parks the goroutine into epoll/kqueue and reassigns thread M to other goroutines until I/O is ready"
      },
      {
        "id": "opt-2",
        "text": "Each net.Conn creates a dedicated kernel thread using pthread_create"
      },
      {
        "id": "opt-3",
        "text": "Network data is buffered entirely on the GPU bus"
      },
      {
        "id": "opt-4",
        "text": "The Go runtime bypasses the Linux kernel using DPDK drivers exclusively"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Go integrates epoll (Linux) or kqueue (macOS) directly into the runtime. When a network read would block, runtime.netpoll parks the goroutine (Gwaiting) and frees OS thread M to execute other ready goroutines. When the OS signals data availability, sysmon or worker M wakes G and places it in the run queue.",
    "referenceUrl": "https://go.dev/src/runtime/netpoll.go"
  },
  {
    "id": "cs-q1-inter",
    "certificationId": "csharp-programming",
    "topic": "C# 12 Primary Constructors",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "In C# 12, when a class declares a primary constructor `public class Service(ILogger logger)`, what is the scope and mutability of the `logger` parameter?",
    "options": [
      {
        "id": "opt-1",
        "text": "It is in scope throughout the class declaration and can be captured by methods; if not assigned to a property, the compiler synthesizes a private field which can be mutable unless manually made readonly"
      },
      {
        "id": "opt-2",
        "text": "It automatically creates an immutable public readonly property named Logger"
      },
      {
        "id": "opt-3",
        "text": "It can only be accessed within field initializers, not in instance methods"
      },
      {
        "id": "opt-4",
        "text": "Primary constructors are restricted to records and cannot be used in normal classes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In C# 12, primary constructor parameters in classes are in scope across the entire class body. If captured by a method, the compiler generates a private backing field. Unlike records, parameters in non-record classes do NOT automatically generate properties.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#primary-constructors"
  },
  {
    "id": "cs-q2-inter",
    "certificationId": "csharp-programming",
    "topic": "Pattern Matching & Switch Expressions",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What does the C# pattern `temperature switch { > 0 and <= 30 => \"Mild\", > 30 => \"Hot\", _ => \"Cold\" }` utilize?",
    "options": [
      {
        "id": "opt-1",
        "text": "Relational patterns (> and <=) combined with the logical `and` pattern in a switch expression"
      },
      {
        "id": "opt-2",
        "text": "Regular expression matching syntax"
      },
      {
        "id": "opt-3",
        "text": "Reflection-based method dispatch"
      },
      {
        "id": "opt-4",
        "text": "Dynamic typing with runtime binder"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "C# pattern matching supports relational patterns (operators <, <=, >, >=) and logical combinators (and, or, not) to cleanly express range evaluations in declarative switch expressions.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns#relational-patterns"
  },
  {
    "id": "cs-q3-adv",
    "certificationId": "csharp-programming",
    "topic": ".NET 8 Native AOT Compilation",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "When publishing a .NET 8 application with Native AOT (`PublishAot=true`), which programming practice is strictly unsupported and causes runtime crashes or build warnings?",
    "options": [
      {
        "id": "opt-1",
        "text": "Unbounded runtime reflection, dynamic assembly loading (Assembly.Load), and runtime code generation via Reflection.Emit"
      },
      {
        "id": "opt-2",
        "text": "Using async/await Task concurrency"
      },
      {
        "id": "opt-3",
        "text": "Using Span<T> and Memory<T>"
      },
      {
        "id": "opt-4",
        "text": "Implementing generic interfaces"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Native AOT generates machine code directly at build time without a JIT compiler. Unused code is stripped by the trimmer. Dynamic code generation (Reflection.Emit) and un-annotated late-bound reflection cannot be resolved statically, requiring compile-time source generators.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/"
  },
  {
    "id": "cs-q4-adv",
    "certificationId": "csharp-programming",
    "topic": "Memory Efficiency: Span<T> & ref struct",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why can `Span<T>` NOT be used as a field in a standard non-ref class, boxed to an object, or used across `await` points in an async method?",
    "options": [
      {
        "id": "opt-1",
        "text": "Because Span<T> is a `ref struct` that is strictly stack-allocated to guarantee interior pointers never outlive the referenced stack memory"
      },
      {
        "id": "opt-2",
        "text": "Because Span<T> uses 64-bit hardware floating-point registers"
      },
      {
        "id": "opt-3",
        "text": "Because Span<T> is deprecated in favor of ImmutableArray<T>"
      },
      {
        "id": "opt-4",
        "text": "Because the .NET runtime limits spans to unmanaged C++ interop"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`Span<T>` is declared as a `ref struct`. To prevent dangling pointers, the CLR enforces that ref structs can only reside on the stack. They cannot escape to the managed heap (cannot be class fields, boxed to object, or preserved across async state machine yield points). Memory<T> is used when heap retention is required.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/ref-struct"
  },
  {
    "id": "cs-q5-adv",
    "certificationId": "csharp-programming",
    "topic": "ValueTask<T> vs Task<T>",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "In high-throughput .NET backend microservices, when should an asynchronous method return `ValueTask<T>` instead of `Task<T>`?",
    "options": [
      {
        "id": "opt-1",
        "text": "When the method frequently completes synchronously (e.g. from an in-memory cache), avoiding the heap allocation of a Task object"
      },
      {
        "id": "opt-2",
        "text": "When the method must be awaited multiple times by concurrent callers"
      },
      {
        "id": "opt-3",
        "text": "When executing background jobs that run for more than 1 hour"
      },
      {
        "id": "opt-4",
        "text": "Whenever connecting to SQL Server databases"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`Task<T>` is a class, requiring a heap allocation for each operation. `ValueTask<T>` is a discriminated struct. If a method completes synchronously in 90% of invocations (e.g. cache hit), returning ValueTask<T> incurs zero GC allocation overhead.",
    "referenceUrl": "https://devblogs.microsoft.com/dotnet/understanding-the-whys-whats-and-whens-of-valuetask/"
  },
  {
    "id": "cs-q6-adv",
    "certificationId": "csharp-programming",
    "topic": "Large Object Heap (LOH) & GC Compaction",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "In .NET Garbage Collection, what is the size threshold for an object to be allocated directly onto the Large Object Heap (LOH), and why does it matter?",
    "options": [
      {
        "id": "opt-1",
        "text": "Objects >= 85,000 bytes; the LOH is not compacted by default during Gen 2 collections, leading to address space fragmentation if large buffers are frequently allocated"
      },
      {
        "id": "opt-2",
        "text": "Objects >= 1 megabyte; the LOH runs in GPU memory"
      },
      {
        "id": "opt-3",
        "text": "Objects >= 1,024 bytes; LOH objects cannot be garbage collected"
      },
      {
        "id": "opt-4",
        "text": "Objects >= 16 kilobytes; LOH objects bypass thread safety"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Objects 85,000 bytes and larger are allocated on the LOH as Gen 2. Because moving large memory blocks is expensive, the GC sweeps without compacting by default. Allocating frequent large arrays (e.g. byte[]) causes fragmentation; using `ArrayPool<T>` mitigates this.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/large-object-heap"
  },
  {
    "id": "cs-q7-adv",
    "certificationId": "csharp-programming",
    "topic": "Async Synchronization: SemaphoreSlim vs lock",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why does the C# compiler disallow the `await` keyword inside a traditional `lock (syncRoot)` block, and what is the proper replacement?",
    "options": [
      {
        "id": "opt-1",
        "text": "`lock` requires the acquiring thread to be identical to the releasing thread; an awaited task may resume on a different threadpool thread. `SemaphoreSlim.WaitAsync()` should be used instead"
      },
      {
        "id": "opt-2",
        "text": "`lock` only works with integer variables"
      },
      {
        "id": "opt-3",
        "text": "`await` disables thread synchronization entirely"
      },
      {
        "id": "opt-4",
        "text": "`SemaphoreSlim` is restricted to Windows operating systems"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`lock` relies on Monitor, which enforces thread affinity (the same OS thread that enters must exit). Async methods yield execution and may resume on a different thread, causing a SynchronizationLockException. `SemaphoreSlim.WaitAsync()` supports asynchronous non-thread-affine locking.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim"
  },
  {
    "id": "cs-q8-exp",
    "certificationId": "csharp-programming",
    "topic": "Hardware Memory Barriers & ARM64 Weak Ordering",
    "category": "languages",
    "difficulty": "Expert",
    "question": "Why can lock-free concurrent algorithms that pass tests on x86/x64 CPUs produce subtle data corruption bugs when executed on ARM64 processors in .NET?",
    "options": [
      {
        "id": "opt-1",
        "text": "x86/x64 has a strongly-ordered memory model (reads are not reordered with reads), while ARM64 has a weakly-ordered memory model requiring explicit memory barriers or volatile/atomic semantics to prevent instruction reordering"
      },
      {
        "id": "opt-2",
        "text": "ARM64 cannot execute 64-bit floating point instructions"
      },
      {
        "id": "opt-3",
        "text": ".NET disables the JIT compiler on ARM64"
      },
      {
        "id": "opt-4",
        "text": "ARM64 processors do not have an L1 cache"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "On x86 hardware, most memory reorderings (except store-load) are forbidden by the CPU. ARM64 is weakly ordered and aggressively reorders independent reads and writes. Lock-free code relying on accidental x86 memory guarantees fails on ARM64 without Volatile or Interlocked operations.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/standard/threading/overview-of-synchronization-primitives"
  },
  {
    "id": "cs-q9-exp",
    "certificationId": "csharp-programming",
    "topic": "C# 12 Interceptors & Compile-Time Metaprogramming",
    "category": "languages",
    "difficulty": "Expert",
    "question": "What do C# 12 Interceptors enable compiler tools and source generators to accomplish at compile time?",
    "options": [
      {
        "id": "opt-1",
        "text": "They allow a source generator to reroute a specific call site in source code to a completely different generated method implementation based on file path, line, and column"
      },
      {
        "id": "opt-2",
        "text": "They intercept TCP network packets at the socket layer"
      },
      {
        "id": "opt-3",
        "text": "They allow catching unhandled exceptions in third-party DLLs without try/catch"
      },
      {
        "id": "opt-4",
        "text": "They convert IL bytecode into WebAssembly in real time"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Interceptors (experimental in C# 12) allow source generators to intercept explicit method calls (like Dapper queries or ASP.NET MapGet) and substitute an optimized generated method at compile time, eliminating reflection and dynamic dispatch.",
    "referenceUrl": "https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#interceptors"
  },
  {
    "id": "cs-q10-exp",
    "certificationId": "csharp-programming",
    "topic": "System.Threading.Channels Architecture",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How do `System.Threading.Channels` achieve superior throughput over `BlockingCollection<T>` in high-load asynchronous message processing?",
    "options": [
      {
        "id": "opt-1",
        "text": "Channels are built with lock-free data structures and ValueTask async primitives, supporting asynchronous non-blocking backpressure (BoundedChannelFullMode.Wait) without holding OS threads"
      },
      {
        "id": "opt-2",
        "text": "Channels store data directly in Redis"
      },
      {
        "id": "opt-3",
        "text": "Channels run as external Windows Services"
      },
      {
        "id": "opt-4",
        "text": "Channels bypass .NET Garbage Collection completely"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`BlockingCollection<T>` uses blocking OS thread synchronization primitives (WaitHandle, Monitor). `System.Threading.Channels` provides lightweight, lock-free async queues where readers and writers await notifications asynchronously without blocking worker threads.",
    "referenceUrl": "https://devblogs.microsoft.com/dotnet/an-introduction-to-system-threading-channels/"
  },
  {
    "id": "cpp-q1-inter",
    "certificationId": "cpp-programming",
    "topic": "C++20 Concepts & Constraints",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What is the primary architectural improvement of C++20 Concepts (`template<typename T> requires std::integral<T>`) over legacy SFINAE (`std::enable_if_t`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Readable compiler error diagnostics, clean constraint syntax, faster compile times, and natural function overload ranking based on constraint subsumption"
      },
      {
        "id": "opt-2",
        "text": "Concepts convert C++ templates into dynamic Java-like interfaces"
      },
      {
        "id": "opt-3",
        "text": "Concepts allow templates to run on GPU without recompilation"
      },
      {
        "id": "opt-4",
        "text": "Concepts eliminate the need for header files"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "SFINAE via std::enable_if generated notoriously cryptic multi-page compiler errors and bloated compilation times. C++20 Concepts make requirements first-class language constructs with clear errors and automatic subsumption rules for overloading.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/language/constraints"
  },
  {
    "id": "cpp-q2-inter",
    "certificationId": "cpp-programming",
    "topic": "Move Semantics & std::move",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What does `std::move(x)` actually perform at runtime in modern C++?",
    "options": [
      {
        "id": "opt-1",
        "text": "It performs an unconditional static_cast to an rvalue reference (T&&); it does not move any memory or execute copy/move code by itself"
      },
      {
        "id": "opt-2",
        "text": "It copies memory from stack to heap"
      },
      {
        "id": "opt-3",
        "text": "It zeroes out the source object memory bytes"
      },
      {
        "id": "opt-4",
        "text": "It deallocates the object destructively"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`std::move` is purely a compile-time cast: `static_cast<std::remove_reference_t<T>&&>(t)`. It signals to the compiler that the object may be treated as an rvalue, allowing move constructors or move assignment operators to steal its resources.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/utility/move"
  },
  {
    "id": "cpp-q3-adv",
    "certificationId": "cpp-programming",
    "topic": "C++20 Coroutines Architecture",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "In C++20 stackless coroutines, what core components must be defined to customize how a coroutine suspends and yields values?",
    "options": [
      {
        "id": "opt-1",
        "text": "A `promise_type` (defining initial_suspend, final_suspend, return_value/void, and get_return_object) and awaitable objects satisfying the Awaiter interface (await_ready, await_suspend, await_resume)"
      },
      {
        "id": "opt-2",
        "text": "A threadpool worker and POSIX pthread attributes"
      },
      {
        "id": "opt-3",
        "text": "A virtual base class inheriting from std::coroutine"
      },
      {
        "id": "opt-4",
        "text": "An external WebAssembly runtime binding"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "C++20 coroutines are stackless and library-extensible. The return type contains a `promise_type` that manages state, while `co_await` operates on awaitables with `await_ready`, `await_suspend`, and `await_resume`. Compilers allocate coroutine frames on the heap unless HALO (Heap Allocation eLision) applies.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/language/coroutines"
  },
  {
    "id": "cpp-q4-adv",
    "certificationId": "cpp-programming",
    "topic": "C++20 Ranges & Lazy Views",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why do C++20 Range Views (`std::views::filter`, `std::views::transform`) exhibit O(1) copy time and minimal memory consumption?",
    "options": [
      {
        "id": "opt-1",
        "text": "Views are non-owning, lightweight wrappers that compute elements lazily on demand via iterators without allocating intermediate containers"
      },
      {
        "id": "opt-2",
        "text": "Views compress vector data using gzip algorithm"
      },
      {
        "id": "opt-3",
        "text": "Views execute in a background GPU compute queue"
      },
      {
        "id": "opt-4",
        "text": "Views convert C++ data into JSON objects"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In C++20 Ranges, a view is a range that is O(1) to copy and destruct because it does not own the elements. Chaining operations with the pipe operator `|` evaluates elements on-the-fly as iterators advance, avoiding intermediate temporary vector allocations.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/ranges"
  },
  {
    "id": "cpp-q5-adv",
    "certificationId": "cpp-programming",
    "topic": "C++20 Modules vs Header Files",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "How do C++20 Modules (`export module my_module; import my_module;`) eliminate the preprocessor vulnerabilities of legacy `#include` headers?",
    "options": [
      {
        "id": "opt-1",
        "text": "Modules are compiled into binary Interface Units (BMI) once; macros and internal definitions inside a module do NOT leak to consuming translation units, and order of imports does not affect semantics"
      },
      {
        "id": "opt-2",
        "text": "Modules eliminate the need for a linker"
      },
      {
        "id": "opt-3",
        "text": "Modules execute code in a WebAssembly sandbox"
      },
      {
        "id": "opt-4",
        "text": "Modules only allow inline functions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Header files are textual copy-pastes that re-parse millions of lines across every translation unit and leak preprocessor macros. Modules parse once, output binary interface files, and maintain strict boundary isolation without macro contamination.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/language/modules"
  },
  {
    "id": "cpp-q6-adv",
    "certificationId": "cpp-programming",
    "topic": "Smart Pointers: std::make_shared vs std::shared_ptr",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What is the memory layout advantage of `std::make_shared<T>()` over `std::shared_ptr<T>(new T())`?",
    "options": [
      {
        "id": "opt-1",
        "text": "make_shared performs a single dynamic memory allocation for both the control block (reference counts) and the managed object T contiguous in memory, improving cache locality and reducing heap allocations"
      },
      {
        "id": "opt-2",
        "text": "make_shared allocates memory on the stack instead of heap"
      },
      {
        "id": "opt-3",
        "text": "make_shared allows shared pointers to be used without thread synchronization"
      },
      {
        "id": "opt-4",
        "text": "make_shared allows cyclic references without memory leaks"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Calling `new T` followed by `shared_ptr` constructor requires two separate heap allocations (one for T, one for the control block). `std::make_shared` allocates a single contiguous block containing both, cutting memory overhead in half and boosting cache locality.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared"
  },
  {
    "id": "cpp-q7-adv",
    "certificationId": "cpp-programming",
    "topic": "Memory Ordering: Acquire-Release Semantics",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "In lock-free C++ atomic programming, what synchronization guarantee does `std::memory_order_release` paired with `std::memory_order_acquire` provide across threads?",
    "options": [
      {
        "id": "opt-1",
        "text": "A store with memory_order_release in thread A synchronizes-with a load with memory_order_acquire in thread B; all prior memory writes in A become visible to B after the acquire"
      },
      {
        "id": "opt-2",
        "text": "It forces a total global memory order across all CPUs equivalent to sequential consistency"
      },
      {
        "id": "opt-3",
        "text": "It pauses all worker threads until an interrupt occurs"
      },
      {
        "id": "opt-4",
        "text": "It disables CPU cache invalidation"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Acquire-Release semantics establish synchronization without the full hardware bus lock cost of `memory_order_seq_cst`. Prior memory operations in the releasing thread cannot be reordered after the release write, and subsequent operations in the acquiring thread cannot be reordered before the acquire read.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/atomic/memory_order"
  },
  {
    "id": "cpp-q8-exp",
    "certificationId": "cpp-programming",
    "topic": "C++23 std::expected & Monadic Error Handling",
    "category": "languages",
    "difficulty": "Expert",
    "question": "Why is C++23 `std::expected<T, E>` preferred over C++ exceptions in low-latency trading, game engines, and embedded real-time systems?",
    "options": [
      {
        "id": "opt-1",
        "text": "It avoids the non-deterministic stack unwinding, metadata table lookups, and heap overhead of exception handling while allowing functional monadic chaining via .and_then() and .or_else()"
      },
      {
        "id": "opt-2",
        "text": "Exceptions are deprecated in C++23"
      },
      {
        "id": "opt-3",
        "text": "std::expected executes on GPU compute shaders"
      },
      {
        "id": "opt-4",
        "text": "std::expected eliminates the need for type checking"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "C++ zero-cost exceptions have zero cost on happy paths, but throwing an exception triggers expensive stack unwinding and table lookups that introduce unpredictable latency spikes. `std::expected` provides deterministic, value-based error propagation with monadic combinators.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/utility/expected"
  },
  {
    "id": "cpp-q9-exp",
    "certificationId": "cpp-programming",
    "topic": "Small String Optimization (SSO) & Strict Aliasing",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How does modern `std::string` implement Small String Optimization (SSO), and what happens when string size exceeds the internal buffer capacity?",
    "options": [
      {
        "id": "opt-1",
        "text": "Strings up to ~15-23 characters are stored directly within the std::string object layout on stack without heap allocation; exceeding capacity transitions to heap allocation (ptr, size, cap)"
      },
      {
        "id": "opt-2",
        "text": "Strings are stored in compressed LZ4 blocks"
      },
      {
        "id": "opt-3",
        "text": "Strings use copy-on-write reference counting across threads"
      },
      {
        "id": "opt-4",
        "text": "Small strings are interned in a global hash table"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A std::string object occupies 24 or 32 bytes. SSO uses a union overlapping the heap pointer/capacity members with an internal char array. Short strings fit entirely inside the object layout, eliminating heap allocation overhead.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/string/basic_string"
  },
  {
    "id": "cpp-q10-exp",
    "certificationId": "cpp-programming",
    "topic": "C++20 Three-Way Comparison Operator (<=>)",
    "category": "languages",
    "difficulty": "Expert",
    "question": "When implementing `<=>` (spaceship operator) for a class containing floating-point numbers (`double`), which comparison category must be returned and why?",
    "options": [
      {
        "id": "opt-1",
        "text": "`std::partial_ordering`, because floating-point numbers support NaN (Not-a-Number), which is unordered with respect to any value including itself"
      },
      {
        "id": "opt-2",
        "text": "`std::strong_ordering`, because all numbers are strictly less or greater"
      },
      {
        "id": "opt-3",
        "text": "`std::weak_ordering`, because floating-point values can have rounding errors"
      },
      {
        "id": "opt-4",
        "text": "`bool`, because spaceship operators only return true/false"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`std::strong_ordering` requires substitutability (if a == b, f(a) == f(b)). Floats violate this because +0.0 == -0.0 but 1/0.0 != 1/-0.0. Furthermore, NaN compares neither less, greater, nor equal to anything. Hence, floating point comparison yields `std::partial_ordering`.",
    "referenceUrl": "https://en.cppreference.com/w/cpp/language/operator_comparison#Three-way_comparison"
  },
  {
    "id": "php-q1-inter",
    "certificationId": "php-programming",
    "topic": "PHP 8.1+ Backed Enums",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "In modern PHP (8.1+), how do Backed Enums guarantee type safety and value mapping for database and API serialization?",
    "options": [
      {
        "id": "opt-1",
        "text": "They define scalar backed values (int or string) accessible via `$case->value`, and provide static methods `from()` and `tryFrom()` for validation"
      },
      {
        "id": "opt-2",
        "text": "They are compiled into global PHP constants at runtime"
      },
      {
        "id": "opt-3",
        "text": "They can only be used with MySQL databases"
      },
      {
        "id": "opt-4",
        "text": "They allow arbitrary runtime modification of enum cases"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PHP Backed Enums (e.g. `enum Status: string { case Active = \"active\"; }`) enforce strict string or int backing. `Status::from(\"active\")` returns the case or throws ValueError; `tryFrom()` returns null on invalid input.",
    "referenceUrl": "https://www.php.net/manual/en/language.enumerations.backed.php"
  },
  {
    "id": "php-q2-inter",
    "certificationId": "php-programming",
    "topic": "Constructor Property Promotion & Readonly Classes",
    "category": "languages",
    "difficulty": "Intermediate",
    "question": "What is the effect of declaring a class as `readonly class User` in PHP 8.2+?",
    "options": [
      {
        "id": "opt-1",
        "text": "All properties are implicitly marked readonly (immutable after initialization), untyped properties are forbidden, and dynamic properties are strictly disallowed"
      },
      {
        "id": "opt-2",
        "text": "The class cannot be instantiated using the new keyword"
      },
      {
        "id": "opt-3",
        "text": "The class bytecode is encrypted in OPcache"
      },
      {
        "id": "opt-4",
        "text": "The class can only have static methods"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PHP 8.2 introduced `readonly class`. Every instance property becomes readonly automatically (cannot be modified after construction). Untyped properties throw compile errors, and dynamic properties are rejected.",
    "referenceUrl": "https://www.php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.readonly"
  },
  {
    "id": "php-q3-adv",
    "certificationId": "php-programming",
    "topic": "PHP 8 JIT Compiler Architecture",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "How does the PHP 8 JIT (Just-In-Time) compiler differ from traditional OPcache execution?",
    "options": [
      {
        "id": "opt-1",
        "text": "OPcache caches Zend VM bytecode instructions in shared memory; JIT (using DynASM) compiles hot bytecode sequences directly into native x86/ARM CPU machine instructions"
      },
      {
        "id": "opt-2",
        "text": "JIT replaces php-fpm with a NodeJS worker"
      },
      {
        "id": "opt-3",
        "text": "JIT executes PHP code on the client browser"
      },
      {
        "id": "opt-4",
        "text": "OPcache runs only on Windows systems"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard OPcache stores compiled opcode bytecode in shared memory, which the Zend virtual machine interprets loop-by-loop. PHP 8's JIT analyzes hot execution traces (Tracing JIT) and compiles opcodes into machine code, delivering huge speedups for CPU-bound computation.",
    "referenceUrl": "https://www.php.net/manual/en/opcache.configuration.php#ini.opcache.jit"
  },
  {
    "id": "php-q4-adv",
    "certificationId": "php-programming",
    "topic": "PHP 8.1 Fibers & Cooperative Concurrency",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What core capability do Fibers (`Fiber::suspend()` and `Fiber::resume()`) introduce to PHP 8.1?",
    "options": [
      {
        "id": "opt-1",
        "text": "Full-stack coroutines that can pause and resume execution from anywhere in the call stack, enabling async event loops without Promise chaining or callback hell"
      },
      {
        "id": "opt-2",
        "text": "Multi-threaded CPU parallel processing with shared memory"
      },
      {
        "id": "opt-3",
        "text": "Automatic database connection pooling"
      },
      {
        "id": "opt-4",
        "text": "Hardware encryption acceleration"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Fibers are stackful coroutines. Unlike Generators (which only suspend at the generator yield point), a Fiber can suspend anywhere deep in nested function calls. Async frameworks (like Revolt / Amp) use Fibers to write synchronous-looking non-blocking code.",
    "referenceUrl": "https://www.php.net/manual/en/language.fibers.php"
  },
  {
    "id": "php-q5-adv",
    "certificationId": "php-programming",
    "topic": "OPcache Preloading Architecture",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "How does OPcache Preloading (`opcache.preload`) optimize high-traffic enterprise PHP framework performance (e.g. Laravel, Symfony)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It compiles and loads designated PHP files into server shared memory at server startup before requests arrive, making classes and functions globally available without requiring include/require per request"
      },
      {
        "id": "opt-2",
        "text": "It downloads composer packages into browser cache"
      },
      {
        "id": "opt-3",
        "text": "It minifies PHP code files on disk"
      },
      {
        "id": "opt-4",
        "text": "It converts PHP files into C++ shared libraries"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Preloading executes a preload script when php-fpm starts. Framework classes and traits are permanently bound into Zend memory and made available to all worker processes, eliminating file stat lookups and autoloading overhead on request paths.",
    "referenceUrl": "https://www.php.net/manual/en/opcache.preloading.php"
  },
  {
    "id": "php-q6-adv",
    "certificationId": "php-programming",
    "topic": "WeakMap & Memory Management in ORMs",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "Why did PHP 8.0 introduce `WeakMap`, and what problem does it solve in Object-Relational Mappers (like Doctrine)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It allows storing metadata keyed by object references without preventing the garbage collector from destroying those objects when all other references are removed"
      },
      {
        "id": "opt-2",
        "text": "It stores encrypted passwords in APCu cache"
      },
      {
        "id": "opt-3",
        "text": "It provides thread-safe access to Redis queues"
      },
      {
        "id": "opt-4",
        "text": "It restricts array keys to integer values"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In ORMs, an Identity Map tracks loaded entity objects. Using a standard array or SplObjectStorage holds a strong reference, preventing PHP's refcounting garbage collector from freeing destroyed entities and creating memory leaks. WeakMap avoids pinning objects in memory.",
    "referenceUrl": "https://www.php.net/manual/en/class.weakmap.php"
  },
  {
    "id": "php-q7-adv",
    "certificationId": "php-programming",
    "topic": "Strict Types & Caller-Site Semantics",
    "category": "languages",
    "difficulty": "Advanced",
    "question": "What is the precise behavioral scope of `declare(strict_types=1);` in a PHP file?",
    "options": [
      {
        "id": "opt-1",
        "text": "It applies strictly to function and method CALLS made within that specific file; it does NOT affect function declarations when called from non-strict files"
      },
      {
        "id": "opt-2",
        "text": "It applies globally to the entire PHP request and all included vendor packages"
      },
      {
        "id": "opt-3",
        "text": "It only affects return types, not function parameters"
      },
      {
        "id": "opt-4",
        "text": "It causes syntax errors on array operations"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`strict_types=1` is per-file directive. It governs calls made *from* that file. If strict file A calls a function in file B with a string where an int is expected, TypeError is thrown. But if non-strict file C calls the same function in file B with a string, PHP coerces it.",
    "referenceUrl": "https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.strict"
  },
  {
    "id": "php-q8-exp",
    "certificationId": "php-programming",
    "topic": "Zend Memory Manager (Zend MM) & Garbage Collection Cycles",
    "category": "languages",
    "difficulty": "Expert",
    "question": "How does PHP's reference-counting Garbage Collector detect and free circular references (e.g. object A referencing object B and vice versa)?",
    "options": [
      {
        "id": "opt-1",
        "text": "When an object refcount is decremented without reaching zero, it is marked purple and placed in the GC Roots buffer; the cyclic GC traverses roots, simulates decrements to identify self-referencing cliques, and frees unreferenced cycles"
      },
      {
        "id": "opt-2",
        "text": "It stops the world and scans physical RAM from address 0"
      },
      {
        "id": "opt-3",
        "text": "PHP cannot free circular references and leaks memory until process exit"
      },
      {
        "id": "opt-4",
        "text": "It deletes circular objects during MySQL transaction commits"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PHP uses synchronous refcounting. Standard refcounting cannot collect cycles where count never hits 0. The cycle collector (Bacon and Rajan algorithm) buffers candidate zvals, performs trial deletion in memory, and reclaims all garbage cycles when the buffer fills (10,000 roots).",
    "referenceUrl": "https://www.php.net/manual/en/features.gc.collecting-cycles.php"
  },
  {
    "id": "php-q9-exp",
    "certificationId": "php-programming",
    "topic": "php-fpm Process Architecture & Memory Recycling",
    "category": "languages",
    "difficulty": "Expert",
    "question": "Why is `pm.max_requests` configured (e.g. 1000) on php-fpm worker pools in production Linux environments?",
    "options": [
      {
        "id": "opt-1",
        "text": "To periodically terminate and respawn worker processes, mitigating progressive memory leaks in native C extensions or long-running worker state"
      },
      {
        "id": "opt-2",
        "text": "To limit total website traffic to 1000 visitors per day"
      },
      {
        "id": "opt-3",
        "text": "To prevent PHP scripts from executing SQL queries"
      },
      {
        "id": "opt-4",
        "text": "To force SSL certificates to revalidate"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PHP applications in php-fpm run across persistent worker processes. While Zend MM cleans request memory after each request, third-party C extensions, static libraries, or unmanaged resources can leak small amounts of heap memory over time. Cycling workers after N requests guarantees bounded memory usage.",
    "referenceUrl": "https://www.php.net/manual/en/install.fpm.configuration.php"
  },
  {
    "id": "php-q10-exp",
    "certificationId": "php-programming",
    "topic": "Asynchronous Application Servers (FrankenPHP / RoadRunner)",
    "category": "languages",
    "difficulty": "Expert",
    "question": "What architectural challenge arises when migrating a legacy PHP application from traditional stateless php-fpm to a worker-mode runtime like FrankenPHP or RoadRunner?",
    "options": [
      {
        "id": "opt-1",
        "text": "PHP memory state persists across requests: global variables, static class properties, singletons, and unclosed database locks bleed between different user requests unless explicitly reset"
      },
      {
        "id": "opt-2",
        "text": "FrankenPHP cannot parse JSON payloads"
      },
      {
        "id": "opt-3",
        "text": "RoadRunner only supports PHP 5.6"
      },
      {
        "id": "opt-4",
        "text": "Asynchronous runtimes cannot execute database queries"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Traditional php-fpm follows a shared-nothing model where every request starts with clean memory. Long-running application workers (FrankenPHP worker mode) keep the application booted in memory between requests. Static state, DI container singletons, and un-reset auth context will leak across users without careful state resetters.",
    "referenceUrl": "https://frankenphp.dev/docs/worker/"
  }
];
