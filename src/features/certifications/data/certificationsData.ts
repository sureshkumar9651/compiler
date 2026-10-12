import { Certification, Question } from '../types';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals Certification',
    shortTitle: 'JavaScript Fundamentals',
    description: 'Demonstrate your mastery of core JavaScript concepts, modern ES6+ features, asynchronous programming, closures, and the event loop.',
    iconName: 'javascript',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    passingScore: 80,
    totalQuestions: 10,
    syllabus: [
      {
        title: 'Variables, Scope & Hoisting',
        description: 'var vs let/const, block scope, Temporal Dead Zone, and variable hoisting behavior.',
      },
      {
        title: 'Functions & Closures',
        description: 'Lexical scoping, function closures, first-class functions, and practical closure state patterns.',
      },
      {
        title: 'Object Orientation & Prototypes',
        description: 'Prototype inheritance, __proto__ vs prototype, Object.create, and ES6 class syntax.',
      },
      {
        title: 'The Event Loop & Asynchronous JS',
        description: 'Call stack, microtask queue (Promises) vs macrotask queue (setTimeout), async/await.',
      },
      {
        title: 'Type Coercion & Equality',
        description: 'Implicit vs explicit coercion, falsy values, Object.is, and strict equality comparison.',
      },
      {
        title: 'Array & Object Methods',
        description: 'Immutability, map/filter/reduce patterns, destructuring, and spread/rest operators.',
      },
    ],
  },
  {
    id: 'react-js',
    title: 'React JS Certification',
    shortTitle: 'React JS',
    description: 'Validate your knowledge of React 18 component design, hooks, lifecycle, state management, reconciliation, and performance optimization.',
    iconName: 'react',
    difficulty: 'Intermediate',
    durationMinutes: 20,
    passingScore: 80,
    totalQuestions: 10,
    syllabus: [
      {
        title: 'Component Architecture & JSX',
        description: 'Functional components, JSX compilation, props contract, and unidirectional data flow.',
      },
      {
        title: 'State & React Lifecycle',
        description: 'useState hook, batched state updates, functional state updaters, and immutability.',
      },
      {
        title: 'Side Effects & Cleanups',
        description: 'useEffect lifecycle synchronization, dependency array rules, and cleanup subscriptions.',
      },
      {
        title: 'Reconciliation & Keys',
        description: 'Virtual DOM diffing algorithm, importance of stable keys, and component re-mounting.',
      },
      {
        title: 'Performance & Memoization',
        description: 'useMemo, useCallback, React.memo, and preventing unnecessary component re-renders.',
      },
      {
        title: 'Custom Hooks & Context API',
        description: 'Logic reusability through custom hooks, React Context for state sharing, and context caveats.',
      },
    ],
  },
];

export const ASSESSMENT_QUESTIONS: Question[] = [
  // ==========================================
  // JAVASCRIPT FUNDAMENTALS QUESTIONS (10)
  // ==========================================
  {
    id: 'js-q1',
    certificationId: 'javascript-fundamentals',
    topic: 'Functions & Closures',
    question: 'What will be printed to the console when the following code is executed?',
    codeSnippet: `function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

counterA();
counterA();
console.log(counterA(), counterB());`,
    options: [
      '3 1',
      '3 3',
      '2 1',
      'undefined undefined',
    ],
    correctAnswerIndex: 0,
    explanation: 'Each call to createCounter() establishes a fresh lexical scope and closure. counterA is incremented three times (1, 2, 3), while counterB is invoked once (1).',
  },
  {
    id: 'js-q2',
    certificationId: 'javascript-fundamentals',
    topic: 'The Event Loop & Asynchronous JS',
    question: 'In what exact order will the numbers be logged to the console?',
    codeSnippet: `console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);`,
    options: [
      '1, 4, 3, 2',
      '1, 2, 3, 4',
      '1, 4, 2, 3',
      '1, 3, 4, 2',
    ],
    correctAnswerIndex: 0,
    explanation: 'Synchronous statements run first (1, 4). Resolved Promise microtasks run before timer macrotasks, so 3 prints before 2.',
  },
  {
    id: 'js-q3',
    certificationId: 'javascript-fundamentals',
    topic: 'Variables, Scope & Hoisting',
    question: 'What is the output of the following code snippet?',
    codeSnippet: `console.log(typeof a);
console.log(typeof b);

var a = 10;
let b = 20;`,
    options: [
      '"undefined" followed by a ReferenceError',
      '"undefined" followed by "undefined"',
      '"number" followed by "number"',
      'ReferenceError followed by ReferenceError',
    ],
    correctAnswerIndex: 0,
    explanation: 'var a is hoisted and initialized with undefined (typeof undefined is "undefined"). let b is hoisted but remains uninitialized in the Temporal Dead Zone (TDZ), causing a ReferenceError upon access.',
  },
  {
    id: 'js-q4',
    certificationId: 'javascript-fundamentals',
    topic: 'Functions & `this` Binding',
    question: 'What does the method call user.greet() log to the console?',
    codeSnippet: `const user = {
  name: 'Alex',
  greet: () => {
    return \`Hello, \${this.name}\`;
  }
};

console.log(user.greet());`,
    options: [
      '"Hello, undefined"',
      '"Hello, Alex"',
      'TypeError: this is undefined',
      '"Hello, null"',
    ],
    correctAnswerIndex: 0,
    explanation: 'Arrow functions do not bind their own "this"; they retain the "this" of the enclosing lexical scope (in this case, global or module scope), where this.name is undefined.',
  },
  {
    id: 'js-q5',
    certificationId: 'javascript-fundamentals',
    topic: 'Object Orientation & Prototypes',
    question: 'Which statement accurately describes how JavaScript prototypes resolve properties on an object instance?',
    options: [
      'JavaScript traverses the prototype chain upwards via the internal [[Prototype]] link until the property is found or null is reached.',
      'Properties from parent classes are copied into the child object upon instantiation.',
      'Only methods explicitly defined with the function keyword are accessible on the prototype chain.',
      'Prototypes are searched in reverse order, starting from Object.prototype down to the child instance.',
    ],
    correctAnswerIndex: 0,
    explanation: 'JavaScript uses prototype delegation: when a property is accessed, the engine inspects the object itself, then follows [[Prototype]] upwards until it finds a match or reaches Object.prototype (and finally null).',
  },
  {
    id: 'js-q6',
    certificationId: 'javascript-fundamentals',
    topic: 'Type Coercion & Equality',
    question: 'What will be the result of the following boolean evaluation?',
    codeSnippet: `console.log(Boolean([]), [] == false, [] === false);`,
    options: [
      'true, true, false',
      'false, true, false',
      'true, false, false',
      'false, false, false',
    ],
    correctAnswerIndex: 0,
    explanation: 'All objects (including empty arrays) are truthy, so Boolean([]) is true. With loose equality (==), [] converts to empty string "" and then to 0, which equals false (0). Strict equality (===) fails because an array object is not a boolean.',
  },
  {
    id: 'js-q7',
    certificationId: 'javascript-fundamentals',
    topic: 'Array & Object Methods',
    question: 'What will be stored in the result variable after executing this reduce function?',
    codeSnippet: `const items = [1, 2, 3, 4];
const result = items.reduce((acc, curr) => {
  if (curr % 2 === 0) {
    acc.push(curr * 10);
  }
  return acc;
}, []);

console.log(result);`,
    options: [
      '[20, 40]',
      '[10, 20, 30, 40]',
      '20',
      'TypeError: acc.push is not a function',
    ],
    correctAnswerIndex: 0,
    explanation: 'The accumulator starts as an empty array []. For each even element (2 and 4), it pushes (20 and 40) and returns the updated accumulator.',
  },
  {
    id: 'js-q8',
    certificationId: 'javascript-fundamentals',
    topic: 'The Event Loop & Asynchronous JS',
    question: 'What does the async function return if an uncaught error is thrown inside it?',
    codeSnippet: `async function fetchData() {
  throw new Error('Network failed');
}`,
    options: [
      'A rejected Promise containing the error object',
      'An unhandled exception that halts script execution immediately',
      'undefined',
      'null',
    ],
    correctAnswerIndex: 0,
    explanation: 'An async function always returns a Promise. If an uncaught exception is thrown inside an async function, the returned Promise is rejected with that exception.',
  },
  {
    id: 'js-q9',
    certificationId: 'javascript-fundamentals',
    topic: 'Array & Object Methods',
    question: 'What will be logged to the console after mutating person2 in the following code?',
    codeSnippet: `const person1 = { name: 'Sara', address: { city: 'Berlin' } };
const person2 = { ...person1 };

person2.name = 'Emma';
person2.address.city = 'Munich';

console.log(person1.name, person1.address.city);`,
    options: [
      '"Sara" "Munich"',
      '"Emma" "Munich"',
      '"Sara" "Berlin"',
      '"Emma" "Berlin"',
    ],
    correctAnswerIndex: 0,
    explanation: 'The spread operator performs a shallow copy. person2.name is a primitive string and independent, but person1.address and person2.address reference the same nested object.',
  },
  {
    id: 'js-q10',
    certificationId: 'javascript-fundamentals',
    topic: 'Variables, Scope & Hoisting',
    question: 'What does the following function return when invoked with no arguments?',
    codeSnippet: `function calculateTotal(subtotal = 100, tax = subtotal * 0.1) {
  return subtotal + tax;
}

console.log(calculateTotal(undefined, 5));`,
    options: [
      '105',
      'NaN',
      '110',
      'TypeError',
    ],
    correctAnswerIndex: 0,
    explanation: 'Passing undefined triggers the default parameter value for subtotal (100). Tax is explicitly passed as 5, resulting in 100 + 5 = 105.',
  },

  // ==========================================
  // REACT JS QUESTIONS (10)
  // ==========================================
  {
    id: 'react-q1',
    certificationId: 'react-js',
    topic: 'State & React Lifecycle',
    question: 'What will be logged to the console after clicking the button once?',
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(prev => prev + 1);
    console.log(count);
  };

  return <button onClick={handleClick}>Click</button>;
}`,
    options: [
      '0 (and the next rendered count will be 2)',
      '1 (and the next rendered count will be 3)',
      '0 (and the next rendered count will be 3)',
      '3 (and the next rendered count will be 3)',
    ],
    correctAnswerIndex: 0,
    explanation: 'State setters are batched and do not mutate state synchronously within the current render cycle, so console.log(count) logs 0. The first two setters pass (0 + 1), while the functional updater receives 1 and returns 2.',
  },
  {
    id: 'react-q2',
    certificationId: 'react-js',
    topic: 'Side Effects & Cleanups',
    question: 'When does the cleanup function returned by useEffect execute?',
    codeSnippet: `useEffect(() => {
  const subscription = api.subscribe(userId);
  return () => {
    subscription.unsubscribe();
  };
}, [userId]);`,
    options: [
      'Before the effect runs again when userId changes, and when the component unmounts.',
      'Only when the component is unmounted from the DOM.',
      'Synchronously right before the next render starts.',
      'Only when an uncaught error occurs in the component.',
    ],
    correctAnswerIndex: 0,
    explanation: 'React executes the effect cleanup function before re-running the effect on dependency change, as well as during component unmount.',
  },
  {
    id: 'react-q3',
    certificationId: 'react-js',
    topic: 'Reconciliation & Keys',
    question: 'Why is using array index as a key prop discouraged when rendering dynamic lists with reordering or deletion?',
    options: [
      'React uses keys to correlate DOM elements across renders; index keys can cause components to retain incorrect internal state or re-render inefficiently.',
      'Index keys throw a runtime compilation error in React 18 strict mode.',
      'React does not allow numbers to be passed as keys.',
      'Index keys bypass the virtual DOM and force direct DOM mutations.',
    ],
    correctAnswerIndex: 0,
    explanation: 'When list items change position, are inserted, or removed, an item with index 0 remains index 0, causing React to associate old component instance state with the new item.',
  },
  {
    id: 'react-q4',
    certificationId: 'react-js',
    topic: 'Performance & Memoization',
    question: 'What is the primary difference between useMemo and useCallback in React?',
    options: [
      'useMemo memoizes the computed return value of a function, whereas useCallback memoizes the function definition itself.',
      'useMemo runs asynchronously on a background thread while useCallback runs synchronously.',
      'useCallback can only be used with DOM event handlers, while useMemo is used for network requests.',
      'useMemo persists across sessions in localStorage, whereas useCallback is stored in component state.',
    ],
    correctAnswerIndex: 0,
    explanation: 'useMemo returns a memoized value generated by a calculation function. useCallback returns a memoized callback function instance so references remain stable across re-renders.',
  },
  {
    id: 'react-q5',
    certificationId: 'react-js',
    topic: 'Custom Hooks & Context API',
    question: 'Which of the following violates the fundamental Rules of Hooks in React?',
    options: [
      'Calling a hook conditionally inside an if statement or loop.',
      'Calling a hook from a custom hook function prefixed with "use".',
      'Calling multiple useState hooks in the same component.',
      'Passing dependencies to useEffect as an array of primitives.',
    ],
    correctAnswerIndex: 0,
    explanation: 'Hooks must always be called at the top level of React functions, never inside loops, conditions, or nested functions, to ensure the order of hook calls is identical across renders.',
  },
  {
    id: 'react-q6',
    certificationId: 'react-js',
    topic: 'Component Architecture & JSX',
    question: 'What happens under the hood when JSX tags like <Profile username="sam" /> are compiled by Babel/React?',
    options: [
      'They are compiled into React.createElement(Profile, { username: "sam" }) or jsx runtime calls.',
      'They are converted into native DOM innerHTML strings and injected into the document.',
      'They generate Web Component templates registered in the browser shadow DOM.',
      'They are evaluated directly as JavaScript object literals without transformation.',
    ],
    correctAnswerIndex: 0,
    explanation: 'JSX is syntactic sugar. Transpilers convert JSX elements into function calls to React.createElement or the JSX runtime function.',
  },
  {
    id: 'react-q7',
    certificationId: 'react-js',
    topic: 'Custom Hooks & Context API',
    question: 'What is a known performance caveat when using React Context without memoization?',
    options: [
      'Whenever the context value changes, every component calling useContext for that context will re-render, even if it only uses an unchanged slice of the value.',
      'React Context disables React.StrictMode across the entire application.',
      'Context values can only be read inside class components.',
      'Context updates always trigger a full page reload in production mode.',
    ],
    correctAnswerIndex: 0,
    explanation: 'Any update to a Context Provider value triggers re-renders in all consuming components. Splitting contexts or memoizing values helps mitigate this issue.',
  },
  {
    id: 'react-q8',
    certificationId: 'react-js',
    topic: 'Performance & Memoization',
    question: 'When wrapping a functional component with React.memo, what type of comparison is performed on incoming props by default?',
    options: [
      'A shallow equality comparison of each prop.',
      'A deep recursive equality check of all nested objects and arrays.',
      'A strict equality check on the root props object reference itself.',
      'No comparison; React.memo only checks if state has changed.',
    ],
    correctAnswerIndex: 0,
    explanation: 'By default, React.memo performs a shallow comparison of current and next props. A custom comparison function can optionally be provided as the second argument.',
  },
  {
    id: 'react-q9',
    certificationId: 'react-js',
    topic: 'State & React Lifecycle',
    question: 'What is the correct way to update an array stored in React state immutably?',
    codeSnippet: `const [todos, setTodos] = useState(['Learn JS', 'Learn React']);`,
    options: [
      "setTodos(prev => [...prev, 'Build Project']);",
      "todos.push('Build Project'); setTodos(todos);",
      "setTodos(todos.splice(0, 0, 'Build Project'));",
      "todos[todos.length] = 'Build Project'; setTodos(todos);",
    ],
    correctAnswerIndex: 0,
    explanation: 'State in React must be treated as immutable. Mutating the existing array in place (e.g. push or splice) preserves the same array reference, preventing React from recognizing that state changed.',
  },
  {
    id: 'react-q10',
    certificationId: 'react-js',
    topic: 'Component Architecture & JSX',
    question: 'Which component type can catch JavaScript errors anywhere in their child component tree and display a fallback UI?',
    options: [
      'Error Boundary components implementing componentDidCatch or static getDerivedStateFromError.',
      'Any component using a try/catch block inside its return JSX statement.',
      'Custom hooks that return an error object.',
      'Components wrapped in React.Suspense.',
    ],
    correctAnswerIndex: 0,
    explanation: 'In React, Error Boundaries must currently be class components that implement getDerivedStateFromError and/or componentDidCatch to catch lifecycle and rendering errors.',
  },
];
