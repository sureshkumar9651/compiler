import { Question } from '../../types';

export const FRONTEND_QUESTIONS: Question[] = [
  {
    "id": "react-q1-intermediate",
    "certificationId": "react-js",
    "topic": "Hooks & State Updates",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "What will be rendered after a user clicks the button once?",
    "codeSnippet": "function Counter() {\n  const [count, setCount] = useState(0);\n\n  function handleClick() {\n    setCount(count + 1);\n    setCount(count + 1);\n    setCount(prev => prev + 1);\n  }\n\n  return <button onClick={handleClick}>{count}</button>;\n}",
    "options": [
      {
        "id": "opt-1",
        "text": "3"
      },
      {
        "id": "opt-2",
        "text": "2"
      },
      {
        "id": "opt-3",
        "text": "1"
      },
      {
        "id": "opt-4",
        "text": "0"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "State updates in event handlers are batched. The first two calls (count + 1) use the closure value (0 + 1 = 1). The third functional updater receives 1 and computes 1 + 1 = 2.",
    "referenceUrl": "https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state"
  },
  {
    "id": "react-q2-intermediate",
    "certificationId": "react-js",
    "topic": "useEffect Dependencies",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "What is a \"stale closure\" bug in a React functional component using useEffect or useCallback?",
    "options": [
      {
        "id": "opt-1",
        "text": "A memory leak caused by unclosed WebSocket connections"
      },
      {
        "id": "opt-2",
        "text": "A function capturing outdated state or props from an earlier render because an omitted dependency prevented the closure from refreshing"
      },
      {
        "id": "opt-3",
        "text": "A syntax error thrown when calling hooks inside conditions"
      },
      {
        "id": "opt-4",
        "text": "A component rendering before its child components mount"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "A stale closure occurs when an effect or callback closes over state or props from a past render cycle. If that variable is omitted from the dependency array, the callback continues executing with the old values.",
    "referenceUrl": "https://react.dev/learn/lifecycle-of-reactive-effects"
  },
  {
    "id": "react-q3-advanced",
    "certificationId": "react-js",
    "topic": "Concurrent Features & useTransition",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "How does updating state inside startTransition differ from a standard setState update in React 18/19?",
    "options": [
      {
        "id": "opt-1",
        "text": "startTransition runs the state update in a web worker thread"
      },
      {
        "id": "opt-2",
        "text": "startTransition marks the update as a non-urgent transition that yields to urgent user inputs (like typing or clicks) without blocking the UI thread"
      },
      {
        "id": "opt-3",
        "text": "startTransition prevents the component from re-rendering"
      },
      {
        "id": "opt-4",
        "text": "startTransition caches the state update in LocalStorage"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Transitions mark state updates as non-blocking. If urgent user interactions (such as keystrokes) occur while a transition render is in progress, React interrupts the transition render to keep the UI responsive.",
    "referenceUrl": "https://react.dev/reference/react/useTransition"
  },
  {
    "id": "react-q4-advanced",
    "certificationId": "react-js",
    "topic": "Fiber Architecture & Reconciliation",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "In React Fiber reconciliation, what is the role of the \"double buffering\" technique?",
    "options": [
      {
        "id": "opt-1",
        "text": "It maintains two fiber trees: the \"current\" tree representing what is on screen and the \"workInProgress\" tree constructed in memory during reconciliation"
      },
      {
        "id": "opt-2",
        "text": "It renders two copies of the virtual DOM for A/B testing"
      },
      {
        "id": "opt-3",
        "text": "It buffers network requests made by useEffect"
      },
      {
        "id": "opt-4",
        "text": "It prevents CSS transitions from stuttering"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "React creates a workInProgress tree corresponding to the current tree. Once rendering completes and passes to the commit phase, React simply swaps pointers so workInProgress becomes current, guaranteeing atomic visual updates.",
    "referenceUrl": "https://github.com/acdlite/react-fiber-architecture"
  },
  {
    "id": "react-q5-advanced",
    "certificationId": "react-js",
    "topic": "useId & Hydration Mismatches",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Why should useId() be preferred over Math.random() for generating accessible HTML element IDs in server-rendered React applications?",
    "options": [
      {
        "id": "opt-1",
        "text": "useId produces faster strings than Math.random"
      },
      {
        "id": "opt-2",
        "text": "useId generates stable IDs based on component tree position that match between server SSR and client hydration, preventing hydration mismatch errors"
      },
      {
        "id": "opt-3",
        "text": "useId automatically registers the element with screen readers"
      },
      {
        "id": "opt-4",
        "text": "useId prevents SQL injection in form fields"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Math.random() generates different IDs on the server versus the client, causing HTML attribute hydration mismatches. useId generates deterministic IDs based on the component tree hierarchy.",
    "referenceUrl": "https://react.dev/reference/react/useId"
  },
  {
    "id": "react-q6-advanced",
    "certificationId": "react-js",
    "topic": "Context Performance & Optimization",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Why does passing an inline object literal to a React Context Provider value (e.g. <Context.Provider value={{ user, setUser }}>) cause unnecessary re-renders?",
    "options": [
      {
        "id": "opt-1",
        "text": "A fresh object reference is created on every render of the provider, causing all consumer components to re-render even if user and setUser did not change"
      },
      {
        "id": "opt-2",
        "text": "React Context disallows objects as values"
      },
      {
        "id": "opt-3",
        "text": "Inline objects trigger infinite loops in useEffect"
      },
      {
        "id": "opt-4",
        "text": "It prevents the garbage collector from freeing memory"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Context consumers re-render whenever the value prop changes by Object.is reference equality. Creating a new object literal on every render changes its reference every time; wrapping it in useMemo prevents this issue.",
    "referenceUrl": "https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions"
  },
  {
    "id": "react-q7-advanced",
    "certificationId": "react-js",
    "topic": "Error Boundaries",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Which errors are NOT caught by React Error Boundaries?",
    "options": [
      {
        "id": "opt-1",
        "text": "Errors thrown inside render methods of child components"
      },
      {
        "id": "opt-2",
        "text": "Errors thrown in asynchronous code (e.g. setTimeout, fetch callbacks) and event handlers"
      },
      {
        "id": "opt-3",
        "text": "Errors thrown in getDerivedStateFromProps"
      },
      {
        "id": "opt-4",
        "text": "Errors thrown in child component constructors"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the component tree below them. They do not catch errors in event handlers or asynchronous callbacks (like setTimeout or fetch).",
    "referenceUrl": "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"
  },
  {
    "id": "react-q8-expert",
    "certificationId": "react-js",
    "topic": "useSyncExternalStore",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "Why was useSyncExternalStore introduced in React 18 for subscribing to external state management stores?",
    "options": [
      {
        "id": "opt-1",
        "text": "To eliminate visual \"tearing\", where concurrent rendering causes parts of the UI to read different versions of external store state during the same render pass"
      },
      {
        "id": "opt-2",
        "text": "To replace Redux with built-in React state"
      },
      {
        "id": "opt-3",
        "text": "To serialize external state into Web Workers"
      },
      {
        "id": "opt-4",
        "text": "To allow synchronous disk I/O inside components"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In concurrent React, rendering can pause and resume. If an external non-React store updates while rendering is paused, different components could render inconsistent data (\"tearing\"). useSyncExternalStore forces synchronous store reads to ensure visual consistency.",
    "referenceUrl": "https://react.dev/reference/react/useSyncExternalStore"
  },
  {
    "id": "react-q9-expert",
    "certificationId": "react-js",
    "topic": "useDeferredValue vs Debounce",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "How does React's useDeferredValue differ fundamentally from traditional utility debouncing (e.g. setTimeout debounce)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Debounce adds an arbitrary fixed time delay; useDeferredValue yields immediately on user input and re-renders as soon as the main thread is idle without any fixed timeout delay"
      },
      {
        "id": "opt-2",
        "text": "useDeferredValue runs in a separate browser tab"
      },
      {
        "id": "opt-3",
        "text": "Debounce works on the server, while useDeferredValue is client-only"
      },
      {
        "id": "opt-4",
        "text": "useDeferredValue cancels pending network requests"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Debouncing delays execution by a hardcoded duration (e.g. 300ms). useDeferredValue is integrated into React concurrency: on fast hardware it updates almost immediately, while on slow hardware it stays responsive to input without stutter or arbitrary delays.",
    "referenceUrl": "https://react.dev/reference/react/useDeferredValue"
  },
  {
    "id": "react-q10-expert",
    "certificationId": "react-js",
    "topic": "Ref Callback Cleanup (React 19)",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "In React 19, ref callbacks support returning a cleanup function. When does this ref cleanup function execute?",
    "options": [
      {
        "id": "opt-1",
        "text": "When the DOM element detaches or when the ref callback is called with a new element, mirroring useEffect cleanup behavior"
      },
      {
        "id": "opt-2",
        "text": "Only when the browser window closes"
      },
      {
        "id": "opt-3",
        "text": "Immediately before the next requestAnimationFrame"
      },
      {
        "id": "opt-4",
        "text": "When an error boundary catches an unhandled error"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "React 19 ref callbacks can return a cleanup function (e.g. ref={node => { const l = ...; return () => cleanup(); }}), eliminating the need to check for node === null and providing symmetric setup and teardown.",
    "referenceUrl": "https://react.dev/blog/2024/04/25/react-19#cleanup-functions-for-ref-callbacks"
  },
  {
    "id": "next-q1-intermediate",
    "certificationId": "next-js",
    "topic": "Server Components vs Client Components",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "What is the effect of adding the \"use client\" directive at the top of a file in the Next.js App Router?",
    "options": [
      {
        "id": "opt-1",
        "text": "It causes the component to execute exclusively in the browser and disables server-side rendering entirely"
      },
      {
        "id": "opt-2",
        "text": "It marks the boundary between the server-only component tree and the interactive client component module graph, enabling hooks and event listeners"
      },
      {
        "id": "opt-3",
        "text": "It compiles the code to WebAssembly"
      },
      {
        "id": "opt-4",
        "text": "It converts all API routes into Edge functions"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "\"use client\" establishes the boundary between Server Components and Client Components. Client components are still pre-rendered on the server into HTML during initial SSR, but their JavaScript bundle is sent to the browser for hydration and client interactivity.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/rendering/client-components"
  },
  {
    "id": "next-q2-intermediate",
    "certificationId": "next-js",
    "topic": "Route Handlers",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "In the Next.js App Router, how do you handle HTTP POST requests in an API route located at app/api/items/route.ts?",
    "options": [
      {
        "id": "opt-1",
        "text": "Export a default function accepting (req, res)"
      },
      {
        "id": "opt-2",
        "text": "Export a named asynchronous function: export async function POST(request: Request)"
      },
      {
        "id": "opt-3",
        "text": "Use the postRoute() configuration object"
      },
      {
        "id": "opt-4",
        "text": "Export a router.post() middleware instance"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Route handlers in the App Router define HTTP method handlers by exporting named async functions matching standard HTTP verbs: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
  },
  {
    "id": "next-q3-advanced",
    "certificationId": "next-js",
    "topic": "Server Component Serialization",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What happens if a Server Component attempts to pass a non-serializable value (like an un-annotated class instance or raw function) as a prop to a Client Component?",
    "options": [
      {
        "id": "opt-1",
        "text": "Next.js compiles successfully but logs a build warning"
      },
      {
        "id": "opt-2",
        "text": "Next.js throws an error because props across the server-client boundary must be serializable by the React Flight protocol"
      },
      {
        "id": "opt-3",
        "text": "The value is automatically converted into a string via toString()"
      },
      {
        "id": "opt-4",
        "text": "The prop is silently converted to undefined"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Data passed from Server Components to Client Components crosses the network boundary and is serialized using the React Flight protocol. Passing functions (unless they are Server Actions) or complex class instances throws a serialization error.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization"
  },
  {
    "id": "next-q4-advanced",
    "certificationId": "next-js",
    "topic": "Caching Architecture",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What is the role of revalidateTag() in Next.js caching architecture?",
    "options": [
      {
        "id": "opt-1",
        "text": "It purges the browser memory cache on the user device"
      },
      {
        "id": "opt-2",
        "text": "It purges all cached fetch responses on the server tagged with that specific tag in the Data Cache on demand"
      },
      {
        "id": "opt-3",
        "text": "It removes Git tags from the deployment pipeline"
      },
      {
        "id": "opt-4",
        "text": "It updates the HTML <meta> tags dynamically"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Next.js allows tagging fetch requests with tags (e.g. fetch(url, { next: { tags: [\"products\"] } })). Calling revalidateTag(\"products\") invalidates the matching cache entries on-demand in the Data Cache without rebuilding the application.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/caching#revalidatetag"
  },
  {
    "id": "next-q5-advanced",
    "certificationId": "next-js",
    "topic": "Server Actions Security",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Why are Server Actions secure against Cross-Site Request Forgery (CSRF) by default in Next.js?",
    "options": [
      {
        "id": "opt-1",
        "text": "They only accept encrypted JWT tokens"
      },
      {
        "id": "opt-2",
        "text": "Next.js verifies that the Origin header matches the Host header on POST requests, blocking cross-origin action submissions"
      },
      {
        "id": "opt-3",
        "text": "They run behind a built-in Cloudflare captcha"
      },
      {
        "id": "opt-4",
        "text": "They reject requests originating from HTTPS connections"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Server Actions in Next.js are implemented as POST requests with built-in origin verification. The server verifies that the Origin header matches the Host header, preventing external sites from submitting malicious cross-origin actions.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security"
  },
  {
    "id": "next-q6-advanced",
    "certificationId": "next-js",
    "topic": "Streaming SSR & Suspense",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "How does loading.tsx leverage React Suspense in the Next.js App Router?",
    "options": [
      {
        "id": "opt-1",
        "text": "It displays a CSS loader while downloading the Next.js framework script"
      },
      {
        "id": "opt-2",
        "text": "It automatically wraps page.tsx and its children inside a <Suspense fallback={<Loading />}> boundary, streaming the initial shell immediately"
      },
      {
        "id": "opt-3",
        "text": "It delays page rendering until all API queries finish"
      },
      {
        "id": "opt-4",
        "text": "It replaces the browser service worker"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Creating a loading.tsx file in a route segment automatically creates an implicit Suspense boundary around page.tsx. The server immediately streams the loading fallback and streams the resolved page HTML as data becomes available.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming"
  },
  {
    "id": "next-q7-advanced",
    "certificationId": "next-js",
    "topic": "Parallel & Intercepting Routes",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "In Next.js parallel routes, what is the purpose of the default.js (or default.tsx) file?",
    "options": [
      {
        "id": "opt-1",
        "text": "It defines the 404 page for parallel routes"
      },
      {
        "id": "opt-2",
        "text": "It provides fallback content to render when Next.js cannot recover the slot’s active state during a full-page hard navigation or page reload"
      },
      {
        "id": "opt-3",
        "text": "It sets default query parameters"
      },
      {
        "id": "opt-4",
        "text": "It configures the default database connection"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "When performing a full-page reload on a route with parallel slots, Next.js cannot reconstruct the previous state for unmatched slots. The default.js file acts as a fallback to render instead of producing a 404.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#defaultjs"
  },
  {
    "id": "next-q8-expert",
    "certificationId": "next-js",
    "topic": "Tainting Server Secrets",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "What is the purpose of experimental_taintUniqueValue and experimental_taintObjectReference in React & Next.js?",
    "options": [
      {
        "id": "opt-1",
        "text": "They encrypt database records before storing them on disk"
      },
      {
        "id": "opt-2",
        "text": "They register sensitive data (such as API keys or user passwords) so React throws an error if they are accidentally passed to a Client Component"
      },
      {
        "id": "opt-3",
        "text": "They sanitize user inputs against SQL injection"
      },
      {
        "id": "opt-4",
        "text": "They taint the browser cache to prevent replay attacks"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "The Taint API prevents sensitive values (like secrets, tokens, or private user records) from leaking to the client. If tainted data is passed to a Client Component, React throws an error during compilation or execution.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#preventing-sensitive-data-from-being-exposed-to-the-client"
  },
  {
    "id": "next-q9-expert",
    "certificationId": "next-js",
    "topic": "Dynamic Rendering Triggers",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "Which of the following functions or patterns automatically switches a Next.js route segment from static generation to dynamic rendering at request time?",
    "options": [
      {
        "id": "opt-1",
        "text": "Calling cookies(), headers(), or reading searchParams in page props"
      },
      {
        "id": "opt-2",
        "text": "Using CSS modules"
      },
      {
        "id": "opt-3",
        "text": "Exporting generateMetadata"
      },
      {
        "id": "opt-4",
        "text": "Importing an image with next/image"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Dynamic APIs such as cookies(), headers(), or accessing searchParams rely on incoming HTTP request information. Using them switches the route segment into dynamic rendering mode at request time.",
    "referenceUrl": "https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering"
  },
  {
    "id": "next-q10-expert",
    "certificationId": "next-js",
    "topic": "Edge Runtime Limitations",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "When configuring a route to use export const runtime = \"edge\", which feature is NOT supported?",
    "options": [
      {
        "id": "opt-1",
        "text": "Standard Web APIs like fetch, Request, and Response"
      },
      {
        "id": "opt-2",
        "text": "Node.js native C++ addons and APIs requiring process.chdir or arbitrary fs operations"
      },
      {
        "id": "opt-3",
        "text": "Crypto Subtle Web API"
      },
      {
        "id": "opt-4",
        "text": "Streaming HTTP responses"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "The Edge Runtime is a lightweight V8 runtime built on standard Web APIs. Native Node.js modules (such as native addons, child_process, or arbitrary fs operations) are not supported.",
    "referenceUrl": "https://nextjs.org/docs/app/api-reference/edge"
  },
  {
    "id": "html-q1-inter",
    "certificationId": "html5-semantics",
    "topic": "ARIA Landmarks & Document Outlining",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "Which HTML5 element correctly maps to the implicit ARIA role of \"main\" for assistive technologies when used as a direct child of <body>?",
    "options": [
      {
        "id": "opt-1",
        "text": "<main>"
      },
      {
        "id": "opt-2",
        "text": "<section id=\"content\">"
      },
      {
        "id": "opt-3",
        "text": "<div role=\"primary\">"
      },
      {
        "id": "opt-4",
        "text": "<article class=\"main\">"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The <main> element represents the dominant content of the <body>. Screen readers map it directly to role=\"main\". A page must not have more than one non-hidden <main> element.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main"
  },
  {
    "id": "html-q2-inter",
    "certificationId": "html5-semantics",
    "topic": "Form Validation Constraint API",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "How do you prevent the browser default validation error popup from showing while still retaining native HTML5 constraint checks on submit?",
    "options": [
      {
        "id": "opt-1",
        "text": "Listen to the \"invalid\" event on form inputs and call event.preventDefault()"
      },
      {
        "id": "opt-2",
        "text": "Set novalidate attribute on the form and call input.checkValidity() in JS"
      },
      {
        "id": "opt-3",
        "text": "Apply style \"display: none !important\" to the ::-webkit-validation-bubble pseudo-element"
      },
      {
        "id": "opt-4",
        "text": "Disable autocomplete on all inputs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When an input fails constraint validation, the browser fires an \"invalid\" event on that element before displaying the native error popup. Calling event.preventDefault() suppresses the default popup while preserving ValidityState flags.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity"
  },
  {
    "id": "html-q3-adv",
    "certificationId": "html5-semantics",
    "topic": "Shadow DOM Encapsulation",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "In Web Components, what is the architectural difference between an \"open\" and \"closed\" ShadowRoot mode created via element.attachShadow({ mode: ... })?",
    "options": [
      {
        "id": "opt-1",
        "text": "In open mode, element.shadowRoot returns the ShadowRoot from external JavaScript; in closed mode, element.shadowRoot returns null"
      },
      {
        "id": "opt-2",
        "text": "Closed shadow roots prevent CSS cascade from inheriting font-family and color"
      },
      {
        "id": "opt-3",
        "text": "Open mode allows global querySelector to match shadow DOM internal nodes directly"
      },
      {
        "id": "opt-4",
        "text": "Closed shadow roots do not support event retargeting"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "element.attachShadow({ mode: \"open\" }) stores the ShadowRoot reference in element.shadowRoot. \"closed\" hides this property (returns null), preventing external scripts from directly referencing the shadow root through the host element unless the reference was retained locally.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow"
  },
  {
    "id": "html-q4-adv",
    "certificationId": "html5-semantics",
    "topic": "Accessible Name Computation",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "According to the W3C Accessible Name and Description Computation spec, which attribute has the HIGHEST precedence when calculating an accessible name for a button?",
    "options": [
      {
        "id": "opt-1",
        "text": "aria-labelledby"
      },
      {
        "id": "opt-2",
        "text": "aria-label"
      },
      {
        "id": "opt-3",
        "text": "button textContent"
      },
      {
        "id": "opt-4",
        "text": "title attribute"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Accessible Name Computation order of precedence is: aria-labelledby > aria-label > native element text content / alt > title attribute. If aria-labelledby is present and resolves to valid elements, it overrides aria-label and text content.",
    "referenceUrl": "https://www.w3.org/TR/accname-1.2/"
  },
  {
    "id": "html-q5-adv",
    "certificationId": "html5-semantics",
    "topic": "HTML5 Template & Slot Composition",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Why does content inside a <template> element NOT execute scripts or load image resources when the DOM is parsed?",
    "options": [
      {
        "id": "opt-1",
        "text": "Because template contents reside in a DocumentFragment associated with an inactive document without a browsing context"
      },
      {
        "id": "opt-2",
        "text": "Because templates are stripped out by the HTML parser before tokenization"
      },
      {
        "id": "opt-3",
        "text": "Because templates only store plain text without HTML parsing"
      },
      {
        "id": "opt-4",
        "text": "Because browsers require a WebAssembly module to activate template nodes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The <template> element stores inert DOM nodes inside a DocumentFragment (template.content). Because this fragment is associated with an inert document, scripts do not execute, media does not fetch, and CSS does not evaluate until explicitly cloned into the active document.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template"
  },
  {
    "id": "html-q6-adv",
    "certificationId": "html5-semantics",
    "topic": "Custom Elements Lifecycle",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Which Custom Element lifecycle callback is triggered when an element is moved to a new document (e.g. via document.adoptNode())?",
    "options": [
      {
        "id": "opt-1",
        "text": "adoptedCallback()"
      },
      {
        "id": "opt-2",
        "text": "connectedCallback()"
      },
      {
        "id": "opt-3",
        "text": "attributeChangedCallback()"
      },
      {
        "id": "opt-4",
        "text": "disconnectedCallback()"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The standard Custom Elements v1 lifecycle includes: connectedCallback() (inserted into DOM), disconnectedCallback() (removed from DOM), adoptedCallback() (moved to new document via adoptNode), and attributeChangedCallback().",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements"
  },
  {
    "id": "html-q7-adv",
    "certificationId": "html5-semantics",
    "topic": "HTML5 Dialog Element & Focus Trapping",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What is the operational difference between calling dialogElement.show() vs dialogElement.showModal() on an HTML5 <dialog>?",
    "options": [
      {
        "id": "opt-1",
        "text": "showModal() renders a top-layer backdrop, traps focus inside the dialog, and disables interaction with rest of page; show() renders a non-modal inline box"
      },
      {
        "id": "opt-2",
        "text": "showModal() animates with CSS keyframes automatically"
      },
      {
        "id": "opt-3",
        "text": "show() throws an error if aria-modal is omitted"
      },
      {
        "id": "opt-4",
        "text": "showModal() requires an external polyfill in all modern evergreen browsers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "dialog.showModal() places the dialog in the browser Top Layer (above all z-index stacking contexts), renders the ::backdrop pseudo-element, prevents interaction with other page elements (inert background), and enables ESC key closing.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
  },
  {
    "id": "html-q8-exp",
    "certificationId": "html5-semantics",
    "topic": "Event Retargeting in Shadow DOM",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "When a click event originates inside a Shadow DOM component and bubbles up to the window, how does event retargeting behave for event.target vs event.composedPath()?",
    "options": [
      {
        "id": "opt-1",
        "text": "event.target is retargeted to the custom element host outside the shadow root, while event.composedPath() preserves the full list of traversed nodes"
      },
      {
        "id": "opt-2",
        "text": "event.target points to document.body, and composedPath() is empty"
      },
      {
        "id": "opt-3",
        "text": "The event immediately stops bubbling at the shadow boundary unless stopPropagation is called"
      },
      {
        "id": "opt-4",
        "text": "Both event.target and composedPath() retain the inner shadow node unconditionally"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Event retargeting ensures encapsulation: listeners outside the shadow boundary see the custom element host as event.target. To inspect the original target inside open shadow roots, callers inspect the array returned by event.composedPath().",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath"
  },
  {
    "id": "html-q9-exp",
    "certificationId": "html5-semantics",
    "topic": "Structured Data & Rich Snippets",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "Why is JSON-LD (<script type=\"application/ld+json\">) preferred over Microdata (itemscope/itemtype) in modern enterprise web architecture?",
    "options": [
      {
        "id": "opt-1",
        "text": "It completely decouples semantic entity data from presentation markup, avoiding DOM clutter and fragility during UI refactoring"
      },
      {
        "id": "opt-2",
        "text": "Search engines only parse JSON-LD and deprecate Microdata completely"
      },
      {
        "id": "opt-3",
        "text": "JSON-LD scripts execute asynchronously in Web Workers"
      },
      {
        "id": "opt-4",
        "text": "Microdata attributes cannot be styled with CSS attribute selectors"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "JSON-LD separates machine-readable metadata into a single centralized payload script tag. Microdata interleaves semantic schema attributes throughout HTML tags, making templates fragile and prone to breaking during visual CSS/HTML refactoring.",
    "referenceUrl": "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
  },
  {
    "id": "html-q10-exp",
    "certificationId": "html5-semantics",
    "topic": "Declarative Shadow DOM (DSD)",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "How does Declarative Shadow DOM (<template shadowrootmode=\"open\">) resolve the Flash of Unstyled Content (FOUC) in Server-Side Rendered (SSR) Web Components?",
    "options": [
      {
        "id": "opt-1",
        "text": "The browser parser creates the ShadowRoot immediately during HTML parsing before JavaScript executes, attaching encapsulated styles immediately"
      },
      {
        "id": "opt-2",
        "text": "It downloads external CSS files before parsing the <head> tags"
      },
      {
        "id": "opt-3",
        "text": "It converts shadow DOM into native iframe elements"
      },
      {
        "id": "opt-4",
        "text": "It serializes component JavaScript state into HTTP headers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Before DSD, SSR web components had to wait for client-side JavaScript to run element.attachShadow() and inject styles, causing FOUC. With <template shadowrootmode=\"open\">, the browser HTML parser synchronously constructs the shadow root and applies styles before first paint.",
    "referenceUrl": "https://web.dev/articles/declarative-shadow-dom"
  },
  {
    "id": "css-q1-inter",
    "certificationId": "css3-architecture",
    "topic": "CSS Cascade Layers (@layer)",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "In modern CSS Cascade Layers, what is the specificity precedence between unlayered styles and styles declared inside a @layer block?",
    "options": [
      {
        "id": "opt-1",
        "text": "Unlayered styles ALWAYS override layered styles, regardless of selector specificity inside the layer"
      },
      {
        "id": "opt-2",
        "text": "Styles inside the first declared layer take precedence over unlayered styles"
      },
      {
        "id": "opt-3",
        "text": "Layers and unlayered styles have equal weight and resolve purely by selector specificity"
      },
      {
        "id": "opt-4",
        "text": "Styles inside layers with !important always lose to unlayered non-important styles"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Under the CSS Cascade Layer specification, normal unlayered styles have higher priority than any normal layered styles. This enables developers to use layers for third-party libraries/frameworks while guaranteeing local application overrides work without specificity hacks.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer"
  },
  {
    "id": "css-q2-inter",
    "certificationId": "css3-architecture",
    "topic": "CSS Subgrid",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "What problem does `grid-template-columns: subgrid` solve in modern multi-column card layouts?",
    "options": [
      {
        "id": "opt-1",
        "text": "It allows child grid items to align their own nested rows or columns directly to the tracks of their parent grid"
      },
      {
        "id": "opt-2",
        "text": "It generates sub-pixel antialiasing for text inside flex items"
      },
      {
        "id": "opt-3",
        "text": "It converts grid containers into flexbox containers on mobile viewports"
      },
      {
        "id": "opt-4",
        "text": "It disables CSS grid layout and falls back to table-layout"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Before Subgrid, nested grids had independent column and row tracks. With `subgrid`, a child grid can delegate its track sizing to its parent grid, allowing header and content rows across different sibling cards to align with pixel-perfect consistency.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid"
  },
  {
    "id": "css-q3-adv",
    "certificationId": "css3-architecture",
    "topic": "Container Queries (@container)",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What is required on a parent element before child elements can respond to `@container (min-width: 400px)` queries?",
    "options": [
      {
        "id": "opt-1",
        "text": "The parent must declare `container-type: inline-size` (or `size`) to establish a containment context"
      },
      {
        "id": "opt-2",
        "text": "The parent must have `position: fixed` and `z-index: 99`"
      },
      {
        "id": "opt-3",
        "text": "The parent must use CSS Grid with at least two columns"
      },
      {
        "id": "opt-4",
        "text": "The parent must be rendered inside a ShadowRoot"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Container Queries evaluate styles against the dimension of a container rather than the viewport. To establish this query container, the ancestor element must declare `container-type: inline-size` (for width) or `size` (for both width and height).",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries"
  },
  {
    "id": "css-q4-adv",
    "certificationId": "css3-architecture",
    "topic": "CSS Rendering Pipeline & Compositing",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Which pair of CSS properties trigger ONLY the Composite stage of browser rendering, avoiding Reflow (Layout) and Repaint?",
    "options": [
      {
        "id": "opt-1",
        "text": "transform and opacity"
      },
      {
        "id": "opt-2",
        "text": "width and height"
      },
      {
        "id": "opt-3",
        "text": "margin-left and top"
      },
      {
        "id": "opt-4",
        "text": "background-color and border-color"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Transform and opacity properties are handled directly by the GPU compositor thread when promoted to a composited layer (e.g. via will-change: transform). They bypass Layout and Paint, delivering smooth 60/120 FPS animations without CPU main-thread jank.",
    "referenceUrl": "https://web.dev/articles/animations-guide"
  },
  {
    "id": "css-q5-adv",
    "certificationId": "css3-architecture",
    "topic": ":is() vs :where() Specificity",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "How do the CSS pseudo-classes `:is()` and `:where()` differ with respect to specificity calculation?",
    "options": [
      {
        "id": "opt-1",
        "text": ":is() takes the specificity of its most specific argument, whereas :where() ALWAYS has 0 specificity"
      },
      {
        "id": "opt-2",
        "text": ":where() adds an ID selector weight to all descendant elements"
      },
      {
        "id": "opt-3",
        "text": ":is() is restricted to tag names only, whereas :where() allows classes"
      },
      {
        "id": "opt-4",
        "text": "They are identical aliases with different naming conventions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`:where(:is(header, #main)) p` has a specificity of 0 (plus the `p` tag weight: (0,0,1)), because `:where()` always contributes (0,0,0) specificity. `:is()` adopts the highest specificity of any selector inside its argument list.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/:where"
  },
  {
    "id": "css-q6-adv",
    "certificationId": "css3-architecture",
    "topic": ":has() Relational Pseudo-Class",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What is the architectural capability unlocked by the `:has()` pseudo-class in modern CSS?",
    "options": [
      {
        "id": "opt-1",
        "text": "It acts as a parent and previous-sibling selector, allowing elements to be styled based on their descendants or subsequent siblings"
      },
      {
        "id": "opt-2",
        "text": "It allows conditional styling based on user hardware battery level"
      },
      {
        "id": "opt-3",
        "text": "It parses JSON payloads stored inside HTML attributes"
      },
      {
        "id": "opt-4",
        "text": "It loads external web fonts conditionally"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Known as the \"parent selector\", `:has()` matches an element if any selector passed as argument matches when anchored at that element. For example, `figure:has(figcaption)` or `form:has(input:invalid)` styles the container without requiring JavaScript.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/:has"
  },
  {
    "id": "css-q7-adv",
    "certificationId": "css3-architecture",
    "topic": "CSS Custom Properties & Performance",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Why can animating a CSS custom property (e.g. `--my-color`) directly in `@keyframes` cause main-thread rendering performance regressions unless registered with `@property`?",
    "options": [
      {
        "id": "opt-1",
        "text": "Unregistered custom properties are treated as arbitrary token streams, forcing the browser to invalidate and recalculate styles on all children during animation"
      },
      {
        "id": "opt-2",
        "text": "CSS custom properties are executed in a synchronous Node.js thread"
      },
      {
        "id": "opt-3",
        "text": "Custom properties cannot be declared in CSS stylesheets"
      },
      {
        "id": "opt-4",
        "text": "The browser recompiles all HTML markup when custom variables change"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Unregistered custom properties cannot be interpolated smoothly because the browser does not know their type syntax. With `@property --my-color { syntax: \"<color>\"; inherits: false; initial-value: #000; }`, the browser understands type semantics and can interpolate efficiently.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/@property"
  },
  {
    "id": "css-q8-exp",
    "certificationId": "css3-architecture",
    "topic": "Stacking Context & Isolation",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "What does the CSS property `isolation: isolate` achieve on a container component?",
    "options": [
      {
        "id": "opt-1",
        "text": "It creates a new stacking context on the element without requiring z-index or position properties, scoping internal z-indexes"
      },
      {
        "id": "opt-2",
        "text": "It blocks network access for all embedded images"
      },
      {
        "id": "opt-3",
        "text": "It disables text selection across all child components"
      },
      {
        "id": "opt-4",
        "text": "It runs the CSS layout in a dedicated Web Worker"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`isolation: isolate` explicitly creates a local stacking context. Any z-index values defined inside children are resolved within this local context, preventing internal z-index elements (e.g. tooltips or badges) from bleeding or colliding with global page layers.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/isolation"
  },
  {
    "id": "css-q9-exp",
    "certificationId": "css3-architecture",
    "topic": "CSS Containment (content-visibility)",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "How does `content-visibility: auto` drastically improve initial page load performance on long articles or data feeds?",
    "options": [
      {
        "id": "opt-1",
        "text": "It skips rendering (layout and painting) of off-screen elements until they approach the viewport, using contain-intrinsic-size as placeholder"
      },
      {
        "id": "opt-2",
        "text": "It compresses HTML DOM nodes into binary buffers in IndexedDB"
      },
      {
        "id": "opt-3",
        "text": "It lazy-loads JavaScript chunks using dynamic import"
      },
      {
        "id": "opt-4",
        "text": "It hides images when user is on a metered mobile connection"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`content-visibility: auto` instructs the browser to skip layout and painting for elements outside the viewport. By pairing with `contain-intrinsic-size` to prevent scrollbar jumps, initial rendering time is cut by up to 80% on long pages.",
    "referenceUrl": "https://web.dev/articles/content-visibility"
  },
  {
    "id": "css-q10-exp",
    "certificationId": "css3-architecture",
    "topic": "CSS View Transitions API",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "When document.startViewTransition(updateDOMCallback) is invoked, how does the browser orchestrate cross-state DOM animations?",
    "options": [
      {
        "id": "opt-1",
        "text": "It captures a snapshot pseudo-element tree (::view-transition-old and ::view-transition-new), allowing CSS animations between old and new state"
      },
      {
        "id": "opt-2",
        "text": "It executes WebGL vertex shaders across the HTML canvas"
      },
      {
        "id": "opt-3",
        "text": "It serializes the HTML DOM tree into a base64 video string"
      },
      {
        "id": "opt-4",
        "text": "It reloads the page in a background headless tab"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The View Transitions API takes a snapshot of the current DOM (::view-transition-old), executes the synchronous DOM update callback, takes a snapshot of the new state (::view-transition-new), and performs cross-fade/morph transitions using standard CSS animation properties.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API"
  },
  {
    "id": "perf-q1-inter",
    "certificationId": "web-performance",
    "topic": "Core Web Vitals - LCP",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "What metric does Largest Contentful Paint (LCP) measure in Google Core Web Vitals, and what is the target threshold for a \"Good\" rating?",
    "options": [
      {
        "id": "opt-1",
        "text": "The time when the largest visible image or text block renders in the viewport; Good is <= 2.5 seconds"
      },
      {
        "id": "opt-2",
        "text": "The time to first byte from the origin server; Good is <= 800 ms"
      },
      {
        "id": "opt-3",
        "text": "The total duration of all network requests combined; Good is <= 5.0 seconds"
      },
      {
        "id": "opt-4",
        "text": "The time until all JavaScript bundles finish compiling; Good is <= 1.2 seconds"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "LCP measures perceived load speed by reporting when the main content of a page has likely loaded. Qualifying elements include <img>, <image> inside SVG, video poster, and block-level text elements. <= 2.5s is rated Good.",
    "referenceUrl": "https://web.dev/articles/lcp"
  },
  {
    "id": "perf-q2-inter",
    "certificationId": "web-performance",
    "topic": "Core Web Vitals - INP vs FID",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "Why did Interaction to Next Paint (INP) replace First Input Delay (FID) as an official Core Web Vital in March 2024?",
    "options": [
      {
        "id": "opt-1",
        "text": "FID only measured the initial delay before event processing for the first interaction, while INP measures the full interaction latency across all clicks and keystrokes throughout the entire page lifecycle"
      },
      {
        "id": "opt-2",
        "text": "FID was incompatible with touch devices"
      },
      {
        "id": "opt-3",
        "text": "INP measures CSS animations rather than user input"
      },
      {
        "id": "opt-4",
        "text": "FID required third-party analytics cookies"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "FID only captured input delay on the very first user action. INP assesses overall page responsiveness by measuring input delay, event processing duration, AND presentation delay until the next frame paints for all user interactions throughout the entire session.",
    "referenceUrl": "https://web.dev/articles/inp"
  },
  {
    "id": "perf-q3-adv",
    "certificationId": "web-performance",
    "topic": "Cumulative Layout Shift (CLS) Mitigation",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Which of the following is the most effective technique to prevent Cumulative Layout Shift (CLS) caused by responsive banner images?",
    "options": [
      {
        "id": "opt-1",
        "text": "Specifying width and height HTML attributes (or CSS aspect-ratio) so the browser reserves space before the image downloads"
      },
      {
        "id": "opt-2",
        "text": "Using JavaScript to calculate image height after onload fires"
      },
      {
        "id": "opt-3",
        "text": "Applying float: left to all images"
      },
      {
        "id": "opt-4",
        "text": "Encoding all images as base64 data URIs inside HTML"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Modern browsers use HTML width and height attributes to calculate the image aspect ratio before downloading the asset, reserving layout space and preventing layout shifts when the image finishes loading. CSS aspect-ratio achieves identical benefits.",
    "referenceUrl": "https://web.dev/articles/optimize-cls"
  },
  {
    "id": "perf-q4-adv",
    "certificationId": "web-performance",
    "topic": "Back/Forward Cache (bfcache)",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Which condition prevents a webpage from being eligible for the browser Back/Forward Cache (bfcache)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Listening to the \"unload\" window event or having an open IndexedDB transaction/WebSocket connection"
      },
      {
        "id": "opt-2",
        "text": "Using localStorage in JavaScript"
      },
      {
        "id": "opt-3",
        "text": "Setting Cache-Control: max-age=3600"
      },
      {
        "id": "opt-4",
        "text": "Using CSS flexbox in the layout"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "bfcache freezes a complete snapshot of the page in memory. Registering an \"unload\" event handler or maintaining active WebSocket, WebRTC, or open locks/transactions causes browsers to discard the page from bfcache. Developers should use pagehide instead of unload.",
    "referenceUrl": "https://web.dev/articles/bfcache"
  },
  {
    "id": "perf-q5-adv",
    "certificationId": "web-performance",
    "topic": "Resource Hints (Preload vs Preconnect)",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What is the specific architectural benefit of `<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>` for external fonts?",
    "options": [
      {
        "id": "opt-1",
        "text": "It performs early DNS lookup, TCP handshake, and TLS negotiation in parallel before the CSS font-face is requested, saving round-trip times"
      },
      {
        "id": "opt-2",
        "text": "It downloads the font file into IndexedDB cache immediately"
      },
      {
        "id": "opt-3",
        "text": "It compresses the font payload with brotli algorithm"
      },
      {
        "id": "opt-4",
        "text": "It forces fonts to render with serif typography"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`preconnect` initiates the DNS resolution, TCP handshake, and TLS negotiation with the third-party origin in advance. When the browser subsequently encounters the font URL in CSS, socket setup latency is eliminated, accelerating font rendering.",
    "referenceUrl": "https://web.dev/articles/preconnect-and-dns-prefetch"
  },
  {
    "id": "perf-q6-adv",
    "certificationId": "web-performance",
    "topic": "Long Tasks & Main-Thread Yielding",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "In modern web applications, how should a long-running CPU task (e.g. processing 10,000 table rows) yield control back to the main thread to avoid blocking input handlers?",
    "options": [
      {
        "id": "opt-1",
        "text": "By awaiting `scheduler.yield()` (or wrapping iterations with setTimeout(..., 0)) to break work into discrete task chunks"
      },
      {
        "id": "opt-2",
        "text": "By executing a while loop with Date.now() pauses"
      },
      {
        "id": "opt-3",
        "text": "By increasing the CPU frequency using WebAssembly"
      },
      {
        "id": "opt-4",
        "text": "By calling requestAnimationFrame in a synchronous recursion"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tasks exceeding 50ms are Long Tasks that delay user input. `scheduler.yield()` yields back to the browser event loop, allowing pending input and rendering tasks to run with priority before resuming the background work.",
    "referenceUrl": "https://web.dev/articles/optimize-long-tasks"
  },
  {
    "id": "perf-q7-adv",
    "certificationId": "web-performance",
    "topic": "Font Loading & FOUT/FOIT",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "How does `font-display: swap` affect web font rendering behavior and user perception during slow network connections?",
    "options": [
      {
        "id": "opt-1",
        "text": "It displays a fallback system font immediately (FOUT) while the web font downloads, then swaps in the web font once loaded"
      },
      {
        "id": "opt-2",
        "text": "It hides text completely until the font downloads, eliminating visual changes"
      },
      {
        "id": "opt-3",
        "text": "It permanently disables web fonts on mobile devices"
      },
      {
        "id": "opt-4",
        "text": "It converts web fonts into SVG outlines"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`font-display: swap` gives the font face an extremely short block period (0s) and an infinite swap period. Text renders immediately using the fallback font, ensuring content is readable immediately instead of showing invisible text (FOIT).",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display"
  },
  {
    "id": "perf-q8-exp",
    "certificationId": "web-performance",
    "topic": "JavaScript Memory Leaks & Detached DOM Nodes",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "In a Chrome DevTools Heap Snapshot, what indicates that a Single Page Application is leaking DOM memory across page navigations?",
    "options": [
      {
        "id": "opt-1",
        "text": "Yellow/red entries under \"Detached HTMLDivElement\" retained by active closures, event listeners, or global data structures"
      },
      {
        "id": "opt-2",
        "text": "High CPU utilization in the Network panel"
      },
      {
        "id": "opt-3",
        "text": "A large number of compiled WebAssembly modules"
      },
      {
        "id": "opt-4",
        "text": "Presence of service worker cache files"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When a DOM element is removed from the active document tree but a JavaScript variable, global store, or unremoved event listener still holds a reference to it, it becomes a \"Detached DOM node\". The garbage collector cannot free it, causing memory bloat.",
    "referenceUrl": "https://developer.chrome.com/docs/devtools/memory-problems/memory-101"
  },
  {
    "id": "perf-q9-exp",
    "certificationId": "web-performance",
    "topic": "Critical Rendering Path & Speculative Rules",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "How does the Speculation Rules API improve page transition performance compared to traditional `<link rel=\"prefetch\">`?",
    "options": [
      {
        "id": "opt-1",
        "text": "It supports full document pre-rendering (speculative execution of HTML, CSS, and JS in a hidden background tab), enabling instant (0ms) navigations"
      },
      {
        "id": "opt-2",
        "text": "It compresses HTTP/3 headers using QPACK"
      },
      {
        "id": "opt-3",
        "text": "It disables cross-origin CORS checks for static assets"
      },
      {
        "id": "opt-4",
        "text": "It encrypts DOM nodes on the client filesystem"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Speculation Rules API (<script type=\"speculationrules\">) allows sites to define rules for prefetching resources OR fully pre-rendering next-page documents in a background renderer. When the user clicks the link, the rendered page activates instantly.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API"
  },
  {
    "id": "perf-q10-exp",
    "certificationId": "web-performance",
    "topic": "HTTP Caching & Immutable Hashing",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "Why should production JavaScript bundles with content hashes (e.g. app.a1b2c3d4.js) use `Cache-Control: public, max-age=31536000, immutable`?",
    "options": [
      {
        "id": "opt-1",
        "text": "`immutable` tells the browser that the response body will never change, completely bypassing conditional revalidation requests (304) even on page reloads"
      },
      {
        "id": "opt-2",
        "text": "It prevents third-party CDNs from caching the file"
      },
      {
        "id": "opt-3",
        "text": "It enforces HTTPS transport security across subdomains"
      },
      {
        "id": "opt-4",
        "text": "It allows browser extensions to modify the script code"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard max-age still causes browsers to send 304 revalidation requests when users click reload. Adding `immutable` guarantees that the file contents will never mutate during its freshness lifetime, saving round-trip revalidations on all subsequent visits.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#immutable"
  },
  {
    "id": "tw-q1-inter",
    "certificationId": "tailwind-css",
    "topic": "Tailwind CSS v4 Oxide Engine",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "How does Tailwind CSS v4 simplify project configuration compared to v3?",
    "options": [
      {
        "id": "opt-1",
        "text": "It replaces JavaScript configuration files (tailwind.config.js) with native CSS-first configuration using `@import \"tailwindcss\";` and `@theme` directives"
      },
      {
        "id": "opt-2",
        "text": "It requires all classes to be written in WebAssembly"
      },
      {
        "id": "opt-3",
        "text": "It forces developers to write inline HTML style attributes"
      },
      {
        "id": "opt-4",
        "text": "It removes all utility classes in favor of Sass mixins"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tailwind CSS v4 introduces a unified Rust-based Oxide compiler. Instead of JavaScript configuration files and PostCSS plugins, developers configure themes and custom utilities directly in CSS using `@theme` and `@utility`.",
    "referenceUrl": "https://tailwindcss.com/blog/tailwindcss-v4-alpha"
  },
  {
    "id": "tw-q2-inter",
    "certificationId": "tailwind-css",
    "topic": "Arbitrary Value & Variant Syntax",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "In Tailwind CSS, how do you apply a specific arbitrary grid column layout and arbitrary data-attribute variant without writing custom CSS classes?",
    "options": [
      {
        "id": "opt-1",
        "text": "`grid-cols-[200px_1fr_100px] data-[state=open]:opacity-100`"
      },
      {
        "id": "opt-2",
        "text": "`grid(200px, 1fr, 100px) state(open):opacity(100)`"
      },
      {
        "id": "opt-3",
        "text": "`custom-grid-cols: [200px, 1fr, 100px]`"
      },
      {
        "id": "opt-4",
        "text": "`style=\"grid-template-columns: 200px 1fr 100px\"`"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tailwind supports arbitrary values inside square brackets `[value]` and arbitrary variants such as `data-[state=open]:` or `[&:nth-child(3)]:` directly in class names without leaving HTML markup.",
    "referenceUrl": "https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values"
  },
  {
    "id": "tw-q3-adv",
    "certificationId": "tailwind-css",
    "topic": "JIT Class Scanning & Dynamic Concatenation",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Why does dynamic string interpolation like `const className = `text-${color}-500`;` fail to render styles in Tailwind CSS production builds?",
    "options": [
      {
        "id": "opt-1",
        "text": "The Tailwind compiler scans source files with static regular expressions looking for unbroken class names; it does not execute JavaScript and cannot infer runtime interpolated strings"
      },
      {
        "id": "opt-2",
        "text": "Tailwind only supports black and white text colors in production"
      },
      {
        "id": "opt-3",
        "text": "Dynamic strings are blocked by Content Security Policy"
      },
      {
        "id": "opt-4",
        "text": "JavaScript template literals are disallowed in JSX"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tailwind extracts classes using static AST token matching. It does not execute JavaScript. A partial string like `text-${color}-500` will never match `text-blue-500`. Classes must be written in full (or mapped via static lookup tables or safelist).",
    "referenceUrl": "https://tailwindcss.com/docs/content-configuration#dynamic-class-names"
  },
  {
    "id": "tw-q4-adv",
    "certificationId": "tailwind-css",
    "topic": "Container Queries in Tailwind",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "How do you structure an independent reusable card component with Tailwind Container Queries so it adapts to its column width rather than viewport width?",
    "options": [
      {
        "id": "opt-1",
        "text": "Mark the card container with `@container` and style children with `@sm:flex-row @lg:grid-cols-3`"
      },
      {
        "id": "opt-2",
        "text": "Use `media-container: sm:flex-row`"
      },
      {
        "id": "opt-3",
        "text": "Add `position: sticky` on the parent"
      },
      {
        "id": "opt-4",
        "text": "Use JavaScript ResizeObserver in a React useEffect"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "With Tailwind container query support, adding `@container` creates a query containment context on the parent. Children use `@sm:`, `@md:`, `@lg:` variants to adapt based on container dimensions.",
    "referenceUrl": "https://github.com/tailwindlabs/tailwindcss-container-queries"
  },
  {
    "id": "tw-q5-adv",
    "certificationId": "tailwind-css",
    "topic": "@apply Directive Architectural Trade-offs",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Why does the Tailwind team caution against extensive use of `@apply` in CSS stylesheets (e.g. `.btn { @apply px-4 py-2 bg-blue-600 rounded; }`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It creates larger CSS bundles, introduces CSS specificity wars between custom classes and utilities, and forces developers to invent arbitrary class names"
      },
      {
        "id": "opt-2",
        "text": "@apply is not supported in Chromium browsers"
      },
      {
        "id": "opt-3",
        "text": "@apply slows down JavaScript execution on the main thread"
      },
      {
        "id": "opt-4",
        "text": "@apply requires a paid commercial license"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Extensive `@apply` defeats the primary architectural benefits of utility-first CSS: zero selector naming overhead, dead-code elimination, and immune specificity order. In modern component frameworks, components (React/Vue/Svelte) should serve as the abstraction layer.",
    "referenceUrl": "https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction"
  },
  {
    "id": "tw-q6-adv",
    "certificationId": "tailwind-css",
    "topic": "Dark Mode Strategies: Selector vs Media",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "When configuring Tailwind Dark Mode with the `selector` strategy, how is dark theme activated on the page?",
    "options": [
      {
        "id": "opt-1",
        "text": "By adding a `dark` class (or custom attribute like `data-theme=\"dark\"`) to the `<html>` or `<body>` element, allowing user toggle buttons to control the theme"
      },
      {
        "id": "opt-2",
        "text": "By inspecting the user's GPS location for nighttime hours"
      },
      {
        "id": "opt-3",
        "text": "By modifying browser user agent headers"
      },
      {
        "id": "opt-4",
        "text": "By downloading a secondary CSS file via JavaScript"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The `selector` strategy generates CSS rules like `.dark .dark\\:text-white`. This allows client JavaScript to toggle the `dark` class on `document.documentElement` to switch themes manually, overriding OS-level `prefers-color-scheme`.",
    "referenceUrl": "https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually"
  },
  {
    "id": "tw-q7-adv",
    "certificationId": "tailwind-css",
    "topic": "Group and Peer States",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What is the operational difference between `group` and `peer` utility markers in Tailwind CSS?",
    "options": [
      {
        "id": "opt-1",
        "text": "`group` styles child elements based on parent state (`group-hover:text-blue-500`); `peer` styles sibling elements based on previous sibling state (`peer-checked:block`)"
      },
      {
        "id": "opt-2",
        "text": "`peer` only works with flex containers"
      },
      {
        "id": "opt-3",
        "text": "`group` is restricted to form inputs"
      },
      {
        "id": "opt-4",
        "text": "They are identical and interchangeable"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`group` leverages descendant selectors (`.group:hover .group-hover\\:...`) to style children when an ancestor changes state. `peer` leverages subsequent-sibling combinators (`.peer:checked ~ .peer-checked\\:...`) to style siblings based on an earlier sibling element.",
    "referenceUrl": "https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state"
  },
  {
    "id": "tw-q8-exp",
    "certificationId": "tailwind-css",
    "topic": "CSS Cascade Layers in Tailwind",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "How does Tailwind CSS arrange its output into Cascade Layers (`@layer base, components, utilities;`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Utilities layer styles always override components layer styles, which override base reset styles, guaranteeing that single-purpose utility classes take precedence regardless of declaration order"
      },
      {
        "id": "opt-2",
        "text": "Base styles override utilities in all circumstances"
      },
      {
        "id": "opt-3",
        "text": "Tailwind disables CSS cascade layers completely"
      },
      {
        "id": "opt-4",
        "text": "Layers are ordered alphabetically by class name"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tailwind structures its output across standard CSS cascade layers: `@layer base`, `@layer components`, `@layer utilities`. Because `utilities` is declared last, utility classes (e.g. `.hidden`, `.p-4`) reliably override component styles without requiring `!important`.",
    "referenceUrl": "https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer"
  },
  {
    "id": "tw-q9-exp",
    "certificationId": "tailwind-css",
    "topic": "Tailwind Typography Plugin & prose Inversion",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "In the `@tailwindcss/typography` plugin, how do you handle dark mode styling for rich Markdown or CMS content formatted with `.prose`?",
    "options": [
      {
        "id": "opt-1",
        "text": "Add the `dark:prose-invert` class to the prose container, which swaps dark text and border variables to light equivalents"
      },
      {
        "id": "opt-2",
        "text": "Rewrite all Markdown tags in uppercase letters"
      },
      {
        "id": "opt-3",
        "text": "Download a separate CSS stylesheet for dark mode prose"
      },
      {
        "id": "opt-4",
        "text": "Apply CSS filter: invert(100%) on the entire page"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The official Typography plugin provides `.prose-invert` specifically for dark backgrounds. Pairing `dark:prose-invert` on the container automatically inverts headings, links, blockquotes, code, and borders for high-contrast dark themes.",
    "referenceUrl": "https://tailwindcss.com/docs/typography-plugin#adapting-to-dark-mode"
  },
  {
    "id": "tw-q10-exp",
    "certificationId": "tailwind-css",
    "topic": "Design Token System & CSS Variable Binding",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "How do enterprise design systems configure Tailwind color palettes using CSS variables with alpha channel opacity support (e.g. `bg-primary/50`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "By defining color tokens using modern slash-alpha syntax `hsl(var(--color-primary) / <alpha-value>)` or OKLCH variables `oklch(from var(--color-primary) l c h / <alpha-value>)`"
      },
      {
        "id": "opt-2",
        "text": "By creating 100 hardcoded hex color classes for every opacity step"
      },
      {
        "id": "opt-3",
        "text": "By modifying canvas pixel buffers in JavaScript"
      },
      {
        "id": "opt-4",
        "text": "By setting opacity: 0.5 on all child elements"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tailwind dynamically injects `<alpha-value>` into color definitions when using opacity modifiers like `bg-primary/20`. Defining variables as `hsl(var(--primary) / <alpha-value>)` or with CSS Color 4 OKLCH syntax preserves dynamic opacity modifier capabilities.",
    "referenceUrl": "https://tailwindcss.com/docs/customizing-colors#using-css-variables"
  },
  {
    "id": "a11y-q1-inter",
    "certificationId": "accessibility-a11y",
    "topic": "WCAG 2.2 AA Contrast Ratios",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "According to WCAG 2.2 Level AA (Success Criterion 1.4.3), what is the minimum required color contrast ratio for regular body text vs large text?",
    "options": [
      {
        "id": "opt-1",
        "text": "4.5:1 for regular text, and 3:1 for large text (>= 18pt or >= 14pt bold)"
      },
      {
        "id": "opt-2",
        "text": "7:1 for regular text, and 4.5:1 for large text"
      },
      {
        "id": "opt-3",
        "text": "3:1 for regular text, and 2:1 for large text"
      },
      {
        "id": "opt-4",
        "text": "10:1 across all typography"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "WCAG 2.2 Level AA mandates a contrast ratio of at least 4.5:1 for standard body text, and at least 3:1 for large-scale text (18pt/24px or 14pt/18.66px bold). Level AAA increases requirements to 7:1 and 4.5:1.",
    "referenceUrl": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
  },
  {
    "id": "a11y-q2-inter",
    "certificationId": "accessibility-a11y",
    "topic": "Keyboard Focus & :focus-visible",
    "category": "frontend",
    "difficulty": "Intermediate",
    "question": "Why should CSS stylesheets use `:focus-visible` rather than stripping focus outlines with `outline: none`?",
    "options": [
      {
        "id": "opt-1",
        "text": "`:focus-visible` shows focus rings only when navigating via keyboard (avoiding outlines on mouse clicks), while preserving essential navigation cues for keyboard-only users"
      },
      {
        "id": "opt-2",
        "text": "`outline: none` is deprecated in HTML5"
      },
      {
        "id": "opt-3",
        "text": "`:focus-visible` runs in a background Web Worker"
      },
      {
        "id": "opt-4",
        "text": "`:focus-visible` makes all buttons 100px wide"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Removing outlines with `outline: none` renders websites completely unusable for keyboard navigators who cannot tell which element currently has focus. `:focus-visible` applies focus rings only when navigating with keyboard input.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible"
  },
  {
    "id": "a11y-q3-adv",
    "certificationId": "accessibility-a11y",
    "topic": "First Rule of ARIA",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "What is the First Rule of ARIA use according to W3C WAI-ARIA authoring practices?",
    "options": [
      {
        "id": "opt-1",
        "text": "If you can use a native HTML element or attribute with the semantics and behavior you require already built-in, use native HTML instead of re-purposing an element with ARIA"
      },
      {
        "id": "opt-2",
        "text": "Every HTML div must have an explicit ARIA role attribute"
      },
      {
        "id": "opt-3",
        "text": "ARIA attributes must be updated using WebSockets"
      },
      {
        "id": "opt-4",
        "text": "Never use ARIA on mobile devices"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Native HTML elements (like `<button>`, `<input>`, `<dialog>`) provide built-in keyboard interaction, focusability, accessibility tree mapping, and form submission natively. Re-creating these with `<div role=\"button\">` requires extensive manual JS and frequently breaks accessibility.",
    "referenceUrl": "https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/"
  },
  {
    "id": "a11y-q4-adv",
    "certificationId": "accessibility-a11y",
    "topic": "Accessible Modal Dialogs (WAI-ARIA Pattern)",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "When creating an accessible custom modal dialog, what mandatory keyboard and focus behaviors must be implemented?",
    "options": [
      {
        "id": "opt-1",
        "text": "Trap keyboard focus inside the modal (Tab loops through dialog elements), close on Escape key, and restore focus to the trigger element that opened the dialog when closed"
      },
      {
        "id": "opt-2",
        "text": "Disable the keyboard and force mouse interaction"
      },
      {
        "id": "opt-3",
        "text": "Clear all browser cookies upon opening"
      },
      {
        "id": "opt-4",
        "text": "Play an audio file when the modal appears"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The WAI-ARIA Dialog pattern requires: moving initial focus inside the dialog, trapping tab navigation so focus cannot escape into underlying inert page content, supporting ESC key to dismiss, and returning focus to the original triggering button on close.",
    "referenceUrl": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "a11y-q5-adv",
    "certificationId": "accessibility-a11y",
    "topic": "Screen Reader Live Regions: polite vs assertive",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "How does `aria-live=\"polite\"` differ from `aria-live=\"assertive\"` when announcing dynamic UI updates?",
    "options": [
      {
        "id": "opt-1",
        "text": "`polite` waits until the screen reader finishes announcing the current speech task before reading the update; `assertive` interrupts current speech immediately"
      },
      {
        "id": "opt-2",
        "text": "`assertive` displays a popup alert on the screen"
      },
      {
        "id": "opt-3",
        "text": "`polite` only works on desktop operating systems"
      },
      {
        "id": "opt-4",
        "text": "`assertive` translates announcements into multiple languages"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Live regions inform assistive technologies of dynamic DOM changes. `aria-live=\"polite\"` queues notifications until the user is idle. `aria-live=\"assertive\"` (or `role=\"alert\"`) interrupts current speech immediately, and should be reserved for urgent errors or time-sensitive warnings.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"
  },
  {
    "id": "a11y-q6-adv",
    "certificationId": "accessibility-a11y",
    "topic": "Form Field Association & Error Messaging",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "How should an invalid form input be programmatically associated with its error message for screen reader users?",
    "options": [
      {
        "id": "opt-1",
        "text": "Set `aria-invalid=\"true\"` on the input and reference the error message element's ID via `aria-describedby=\"error-id\"`"
      },
      {
        "id": "opt-2",
        "text": "Color the input border red with CSS"
      },
      {
        "id": "opt-3",
        "text": "Place the error text inside an HTML comment"
      },
      {
        "id": "opt-4",
        "text": "Display the error in an alert() box"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Screen reader users cannot see red border colors. `aria-invalid=\"true\"` informs the screen reader that the field has an error, and `aria-describedby=\"error-msg-id\"` causes the screen reader to announce the specific error message text when the user tabs into the field.",
    "referenceUrl": "https://www.w3.org/WAI/tutorials/forms/notifications/"
  },
  {
    "id": "a11y-q7-adv",
    "certificationId": "accessibility-a11y",
    "topic": "WCAG 2.2 SC 2.5.8 Target Size (Minimum)",
    "category": "frontend",
    "difficulty": "Advanced",
    "question": "Under WCAG 2.2 Success Criterion 2.5.8 (Target Size - Minimum), what is the minimum required dimensions for touch targets on mobile websites?",
    "options": [
      {
        "id": "opt-1",
        "text": "At least 24 by 24 CSS pixels, unless there is sufficient spacing between adjacent targets or an inline text exception applies"
      },
      {
        "id": "opt-2",
        "text": "At least 100 by 100 CSS pixels"
      },
      {
        "id": "opt-3",
        "text": "At least 8 by 8 CSS pixels"
      },
      {
        "id": "opt-4",
        "text": "There is no minimum size requirement in WCAG 2.2"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "WCAG 2.2 introduced SC 2.5.8 (Level AA), mandating that pointer targets have an area of at least 24x24 CSS pixels, or sufficient spacing such that a 24px diameter circle centered on the target does not intersect another target.",
    "referenceUrl": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"
  },
  {
    "id": "a11y-q8-exp",
    "certificationId": "accessibility-a11y",
    "topic": "Complex Widgets: Roving Tabindex vs aria-activedescendant",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "In composite interactive widgets (e.g. menus, data grids, comboboxes), what is the architectural difference between Roving Tabindex and `aria-activedescendant`?",
    "options": [
      {
        "id": "opt-1",
        "text": "Roving tabindex programmatically updates tabindex=\"-1\" and tabindex=\"0\" across items, physically moving DOM focus via element.focus(); aria-activedescendant keeps DOM focus on the container and updates an ID pointer to indicate virtual focus"
      },
      {
        "id": "opt-2",
        "text": "Roving tabindex only works with HTML5 video elements"
      },
      {
        "id": "opt-3",
        "text": "aria-activedescendant requires mouse hover to function"
      },
      {
        "id": "opt-4",
        "text": "Roving tabindex disables keyboard arrow navigation"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Composite widgets must support single Tab stop into the widget and Arrow keys inside. Roving tabindex dynamically shifts tabindex=\"0\" and calls .focus(). `aria-activedescendant` keeps DOM focus on the combobox/input while pointing to the ID of the selected dropdown child.",
    "referenceUrl": "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex"
  },
  {
    "id": "a11y-q9-exp",
    "certificationId": "accessibility-a11y",
    "topic": "Accessibility Tree vs DOM Tree",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "How do `aria-hidden=\"true\"`, `display: none`, and the `.sr-only` visually-hidden CSS pattern differ in their effect on the browser Accessibility Tree (AXTree)?",
    "options": [
      {
        "id": "opt-1",
        "text": "`display: none` and `aria-hidden=\"true\"` remove elements from the AXTree (invisible to screen readers); `.sr-only` clips elements visually while keeping them fully exposed in the AXTree for screen readers"
      },
      {
        "id": "opt-2",
        "text": "`aria-hidden=\"true\"` hides elements visually from sighted users"
      },
      {
        "id": "opt-3",
        "text": "`.sr-only` hides elements from search engine crawlers"
      },
      {
        "id": "opt-4",
        "text": "All three patterns produce identical accessibility tree representations"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`display: none` and `visibility: hidden` remove nodes from both screen and AXTree. `aria-hidden=\"true\"` leaves elements visible visually but strips them from AXTree. `.sr-only` (clip-path: inset(50%)) hides content visually while preserving it for assistive technology.",
    "referenceUrl": "https://webaim.org/techniques/css/invisiblecontent/"
  },
  {
    "id": "a11y-q10-exp",
    "certificationId": "accessibility-a11y",
    "topic": "Automated A11y Tools & WCAG Audit Limitations",
    "category": "frontend",
    "difficulty": "Expert",
    "question": "Why do automated accessibility testing engines (such as axe-core, Pa11y, or Google Lighthouse) typically detect only 30% to 40% of WCAG violations?",
    "options": [
      {
        "id": "opt-1",
        "text": "Automated tools can only verify deterministic rules (contrast ratios, missing alt attributes); they cannot evaluate contextual semantics, keyboard navigation logic, meaningful screen reader order, or alt text quality"
      },
      {
        "id": "opt-2",
        "text": "Automated tools cannot parse JavaScript in web applications"
      },
      {
        "id": "opt-3",
        "text": "Automated tools only run on Windows operating systems"
      },
      {
        "id": "opt-4",
        "text": "WCAG guidelines are written in binary format"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Automated linters detect missing attributes or mathematical contrast failures. They cannot evaluate human judgment: Is alt=\"dog\" meaningful for a diagram? Does keyboard focus travel logically? Does an ARIA live region interrupt comprehension? Manual screen reader testing is essential.",
    "referenceUrl": "https://alphagov.github.io/accessibility-tool-audit/"
  }
];
