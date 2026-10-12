import { Question } from '../../types';

export const TESTING_QUESTIONS: Question[] = [
  {
    "id": "jest-q1-inter",
    "certificationId": "jest-testing",
    "topic": "Jest Mocking Hoisting",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "Why does `jest.mock(\"./api\")` execute before `import api from \"./api\"` in a Jest test file even if declared after the import statement?",
    "options": [
      {
        "id": "opt-1",
        "text": "Babel/ts-jest plugins hoist `jest.mock()` calls to the top of the file before module imports are resolved"
      },
      {
        "id": "opt-2",
        "text": "ES modules evaluate functions before importing modules"
      },
      {
        "id": "opt-3",
        "text": "Node.js runtime caches all mock objects in global memory"
      },
      {
        "id": "opt-4",
        "text": "Imports are executed asynchronously in Web Workers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Jest transformers (babel-jest, ts-jest) parse the AST and hoist calls to `jest.mock()` to the top of the module scope. This guarantees that when the imported module is resolved by the module loader, it receives the mocked implementation.",
    "referenceUrl": "https://jestjs.io/docs/es6-class-mocks#manual-mock"
  },
  {
    "id": "jest-q2-inter",
    "certificationId": "jest-testing",
    "topic": "SpyOn vs MockImplementation",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "What is the primary operational difference between `jest.spyOn(object, \"method\")` and `object.method = jest.fn()`?",
    "options": [
      {
        "id": "opt-1",
        "text": "`spyOn` tracks calls while preserving the original method implementation (or allowing restoration via mockRestore()), whereas direct assignment destroys the original function reference"
      },
      {
        "id": "opt-2",
        "text": "`spyOn` can only be used on global window objects"
      },
      {
        "id": "opt-3",
        "text": "`jest.fn()` runs in a separate thread"
      },
      {
        "id": "opt-4",
        "text": "`spyOn` does not track call arguments"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`jest.spyOn()` wraps the existing property on the target object. It retains a reference to the original implementation, enabling `spy.mockRestore()` to cleanly restore original behavior at the end of the test.",
    "referenceUrl": "https://jestjs.io/docs/jest-object#jestspyonobject-methodname"
  },
  {
    "id": "jest-q3-adv",
    "certificationId": "jest-testing",
    "topic": "Fake Timers: Modern vs Legacy",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "Why did Jest adopt `@sinonjs/fake-timers` (modern fake timers) to replace legacy fake timers?",
    "options": [
      {
        "id": "opt-1",
        "text": "Modern fake timers mock the microtask queue, process.hrtime, Date.now(), and performance.now(), avoiding infinite loops and timing inconsistencies with async/await"
      },
      {
        "id": "opt-2",
        "text": "Legacy timers were incompatible with TypeScript"
      },
      {
        "id": "opt-3",
        "text": "Modern timers run tests 10x faster by skipping assertions"
      },
      {
        "id": "opt-4",
        "text": "Legacy fake timers only worked in browser environments"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Jest's legacy timer implementation only mocked setTimeout/setInterval. Modern fake timers mock comprehensive time APIs including Date, hrtime, performance.now, and accurately integrate with promise microtask queues without deadlocks.",
    "referenceUrl": "https://jestjs.io/docs/timer-mocks"
  },
  {
    "id": "jest-q4-adv",
    "certificationId": "jest-testing",
    "topic": "Module Isolation & Reset Mechanics",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What is the functional difference between `jest.clearAllMocks()`, `jest.resetAllMocks()`, and `jest.restoreAllMocks()`?",
    "options": [
      {
        "id": "opt-1",
        "text": "clearAllMocks resets recorded calls/instances; resetAllMocks resets recorded calls AND removes mock implementations; restoreAllMocks restores original non-mocked implementations on spies"
      },
      {
        "id": "opt-2",
        "text": "They are identical aliases for backward compatibility"
      },
      {
        "id": "opt-3",
        "text": "restoreAllMocks deletes all files in the test directory"
      },
      {
        "id": "opt-4",
        "text": "clearAllMocks clears Node.js global process memory"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`clearAllMocks()` resets `mock.calls` and `mock.instances`. `resetAllMocks()` additionally empties mock implementations (mockReset()). `restoreAllMocks()` restores spies created with `jest.spyOn` back to their original behavior.",
    "referenceUrl": "https://jestjs.io/docs/jest-object#jestclearallmocks"
  },
  {
    "id": "jest-q5-adv",
    "certificationId": "jest-testing",
    "topic": "Asynchronous Error Propagation in Tests",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "Why is testing asynchronous rejections with `await expect(promise).rejects.toThrow()` safer than wrapping in a try/catch block with `fail()`?",
    "options": [
      {
        "id": "opt-1",
        "text": "If the promise resolves unexpectedly, a try/catch without explicit `expect.assertions()` passes silently, whereas `.rejects.toThrow()` immediately fails the test"
      },
      {
        "id": "opt-2",
        "text": "try/catch blocks are not supported in Jest test files"
      },
      {
        "id": "opt-3",
        "text": "rejects.toThrow() runs in a separate V8 isolate"
      },
      {
        "id": "opt-4",
        "text": "try/catch blocks cause memory leaks in test workers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A common bug in async testing is writing `try { await fn(); } catch (e) { expect(e).toBeDefined(); }`. If `fn()` unexpectedly resolves instead of rejecting, the catch block is skipped and the test falsely passes. `.rejects.toThrow()` enforces the rejection.",
    "referenceUrl": "https://jestjs.io/docs/asynchronous"
  },
  {
    "id": "jest-q6-adv",
    "certificationId": "jest-testing",
    "topic": "Custom Matchers with expect.extend",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "When implementing a custom matcher via `expect.extend()`, what structure must the matcher function return?",
    "options": [
      {
        "id": "opt-1",
        "text": "An object with a boolean `pass` property and a `message` function returning a formatted error string"
      },
      {
        "id": "opt-2",
        "text": "A boolean value true or false"
      },
      {
        "id": "opt-3",
        "text": "A Promise resolving to void"
      },
      {
        "id": "opt-4",
        "text": "An instance of JestAssertionError"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A custom matcher returns `{ pass: boolean, message: () => string }`. Jest uses `pass` to determine assertion success/failure (accounting for `.not` modifiers) and invokes `message()` lazily only when reporting a failed assertion.",
    "referenceUrl": "https://jestjs.io/docs/expect#expectextendmatchers"
  },
  {
    "id": "jest-q7-adv",
    "certificationId": "jest-testing",
    "topic": "Snapshot Testing: Serializers & Pitfalls",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What is the primary risk of relying excessively on large snapshot tests (`toMatchSnapshot()`) in software development teams?",
    "options": [
      {
        "id": "opt-1",
        "text": "Developers treat failing snapshots as noise and blindly press `-u` to update without inspecting subtle regression bugs"
      },
      {
        "id": "opt-2",
        "text": "Snapshots cannot be committed to Git version control"
      },
      {
        "id": "opt-3",
        "text": "Snapshots only work with React components"
      },
      {
        "id": "opt-4",
        "text": "Snapshot testing slows down compilation by 500%"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Massive snapshot diffs (hundreds of lines of generated markup) induce review fatigue. Engineers routinely run `jest -u` to make tests pass without carefully validating whether changed attributes were intentional or represent regression bugs.",
    "referenceUrl": "https://jestjs.io/docs/snapshot-testing"
  },
  {
    "id": "jest-q8-exp",
    "certificationId": "jest-testing",
    "topic": "Worker Pool & Memory Leaks in Large Test Suites",
    "category": "testing",
    "difficulty": "Expert",
    "question": "Why do large Jest test suites on Node.js often experience out-of-memory (OOM) crashes in CI, and what is the underlying engine cause?",
    "options": [
      {
        "id": "opt-1",
        "text": "Jest executes tests in child processes (jest-worker) where `vm.runInContext` sandbox retains module references, preventing V8 garbage collection from freeing compiled module closures"
      },
      {
        "id": "opt-2",
        "text": "Node.js leaks memory when printing console.log output"
      },
      {
        "id": "opt-3",
        "text": "Jest stores all source files in /tmp filesystem"
      },
      {
        "id": "opt-4",
        "text": "npm cache fills up disk space during test runs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Jest creates sandboxed VM contexts for module isolation. Because Node's `vm` module shares some underlying V8 heap objects and retains hidden classes across context runs, large suites accumulate memory in worker processes unless `--runInBand` or `--workerIdleMemoryLimit` is configured.",
    "referenceUrl": "https://github.com/jestjs/jest/issues/7874"
  },
  {
    "id": "jest-q9-exp",
    "certificationId": "jest-testing",
    "topic": "Jest Architecture: Source Map Inversion & Transformers",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How does Jest map runtime stack traces in transpiled code (TypeScript/JSX) back to the exact original source file line numbers?",
    "options": [
      {
        "id": "opt-1",
        "text": "Jest caches inline source maps produced by transformers (e.g. babel/ts-jest) and intercepts Error.prepareStackTrace to resolve call sites against original source coordinates"
      },
      {
        "id": "opt-2",
        "text": "By executing TypeScript directly in the V8 engine natively"
      },
      {
        "id": "opt-3",
        "text": "By reading comments in the compiled JavaScript files"
      },
      {
        "id": "opt-4",
        "text": "By running all tests through Chromium DevTools"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When Jest transforms files, it retains source maps in memory. It hooks into V8's `Error.prepareStackTrace` API, converting each CallSite's line and column numbers back to the original source coordinates before formatting the terminal report.",
    "referenceUrl": "https://jestjs.io/docs/architecture"
  },
  {
    "id": "jest-q10-exp",
    "certificationId": "jest-testing",
    "topic": "Dynamic Mocks with jest.doMock() in Asynchronous Scenarios",
    "category": "testing",
    "difficulty": "Expert",
    "question": "When should `jest.doMock()` be used instead of standard `jest.mock()` in a test suite?",
    "options": [
      {
        "id": "opt-1",
        "text": "When a test needs to mock a module differently within specific test cases without the mock being hoisted to the top of the file"
      },
      {
        "id": "opt-2",
        "text": "When testing React components exclusively"
      },
      {
        "id": "opt-3",
        "text": "When mocking core Node.js built-ins like fs and path"
      },
      {
        "id": "opt-4",
        "text": "When mocking WebSocket connections"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Unlike `jest.mock()`, `jest.doMock()` is NOT hoisted by Babel/ts-jest. Combined with `jest.resetModules()`, it allows dynamically altering mock behavior for different test scenarios within the same file.",
    "referenceUrl": "https://jestjs.io/docs/jest-object#jestdomockmodulename-factory-options"
  },
  {
    "id": "pw-q1-inter",
    "certificationId": "playwright-e2e",
    "topic": "Auto-Waiting & Actionability Checks",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "What actionability checks does Playwright automatically perform before executing a `locator.click()` operation?",
    "options": [
      {
        "id": "opt-1",
        "text": "It verifies the element is Attached, Visible, Stable (not animating), Receives Events (not obscured), and Enabled"
      },
      {
        "id": "opt-2",
        "text": "It checks if the element is rendered in WebGL"
      },
      {
        "id": "opt-3",
        "text": "It waits for 5000 milliseconds unconditionally"
      },
      {
        "id": "opt-4",
        "text": "It checks if the browser cookies are non-empty"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Playwright's auto-waiting eliminates arbitrary sleeps by checking actionability before clicking: element is attached to DOM, visible, stable (bounds unchanged over frames), enabled, and can receive pointer events without being covered by modals/overlays.",
    "referenceUrl": "https://playwright.dev/docs/actionability"
  },
  {
    "id": "pw-q2-inter",
    "certificationId": "playwright-e2e",
    "topic": "Web-First Assertions: expect(locator).toBeVisible()",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "Why are web-first assertions like `await expect(locator).toBeVisible()` superior to `expect(await locator.isVisible()).toBe(true)`?",
    "options": [
      {
        "id": "opt-1",
        "text": "Web-first assertions automatically retry polling until the assertion passes or the timeout expires, whereas isVisible() checks once immediately without retrying"
      },
      {
        "id": "opt-2",
        "text": "isVisible() throws an error if called in async functions"
      },
      {
        "id": "opt-3",
        "text": "Web-first assertions only work with Firefox"
      },
      {
        "id": "opt-4",
        "text": "There is no difference; they are syntactic aliases"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`await locator.isVisible()` returns a boolean snapshot at that single millisecond. If the element is still animating or rendering asynchronously, it returns false and fails. `expect(locator).toBeVisible()` polls repeatedly until condition is met or timeout is reached.",
    "referenceUrl": "https://playwright.dev/docs/test-assertions"
  },
  {
    "id": "pw-q3-adv",
    "certificationId": "playwright-e2e",
    "topic": "Locator Best Practices: Role & Text over XPath",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "According to Playwright testing best practices, why is `page.getByRole(\"button\", { name: \"Submit\" })` preferred over CSS or XPath selectors like `page.locator(\".btn-primary > span\")`?",
    "options": [
      {
        "id": "opt-1",
        "text": "It tests the UI the way users and assistive technologies perceive it, making tests resilient to internal DOM refactoring and CSS class changes"
      },
      {
        "id": "opt-2",
        "text": "XPath selectors are deprecated in modern HTML specifications"
      },
      {
        "id": "opt-3",
        "text": "getByRole executes 100x faster than CSS selectors"
      },
      {
        "id": "opt-4",
        "text": "CSS selectors cannot match clickable elements"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Role-based locators reflect the accessibility tree and user experience. Refactoring a CSS class from `.btn-primary` to Tailwind `.bg-blue-600` breaks CSS locators, but `getByRole(\"button\", { name: \"Submit\" })` continues to work cleanly.",
    "referenceUrl": "https://playwright.dev/docs/locators#locate-by-role"
  },
  {
    "id": "pw-q4-adv",
    "certificationId": "playwright-e2e",
    "topic": "Network Route Mocking: page.route()",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How do you intercept and mock an API endpoint in Playwright so tests run deterministically without hitting the real backend?",
    "options": [
      {
        "id": "opt-1",
        "text": "`await page.route(\"**/api/users\", route => route.fulfill({ status: 200, contentType: \"application/json\", body: JSON.stringify([]) }))`"
      },
      {
        "id": "opt-2",
        "text": "`page.setMockBackend(\"**/api/users\", [])`"
      },
      {
        "id": "opt-3",
        "text": "By modifying the /etc/hosts file in the CI runner"
      },
      {
        "id": "opt-4",
        "text": "By disabling the browser network card"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Playwright's `page.route(urlPattern, handler)` intercepts matching network requests at the browser protocol level. Calling `route.fulfill()` delivers mock data directly without network traffic.",
    "referenceUrl": "https://playwright.dev/docs/network#modify-requests"
  },
  {
    "id": "pw-q5-adv",
    "certificationId": "playwright-e2e",
    "topic": "BrowserContext Isolation vs Shared State",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How does Playwright achieve fast, completely isolated tests without launching a brand new browser process for every test case?",
    "options": [
      {
        "id": "opt-1",
        "text": "Each test runs in a fresh BrowserContext (equivalent to an incognito profile with separate cookies, localStorage, and cache) within a shared running browser instance"
      },
      {
        "id": "opt-2",
        "text": "By rebooting the operating system between tests"
      },
      {
        "id": "opt-3",
        "text": "By clearing browser history via JavaScript window.history.clear()"
      },
      {
        "id": "opt-4",
        "text": "By executing tests in parallel Docker containers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Launching a browser process takes several seconds. Playwright launches the browser once and creates lightweight BrowserContexts in milliseconds for each test. Each context is completely isolated (no leaked cookies or storage).",
    "referenceUrl": "https://playwright.dev/docs/browser-contexts"
  },
  {
    "id": "pw-q6-adv",
    "certificationId": "playwright-e2e",
    "topic": "Authentication State Reuse (storageState)",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "In Playwright test suites with hundreds of authenticated tests, how do you avoid logging in through the UI in every single test?",
    "options": [
      {
        "id": "opt-1",
        "text": "Log in once in a setup project, save cookies and local storage via `context.storageState({ path: \"auth.json\" })`, and load it in test projects"
      },
      {
        "id": "opt-2",
        "text": "Hardcode the user password in the URL query string"
      },
      {
        "id": "opt-3",
        "text": "Disable authentication on the backend server for tests"
      },
      {
        "id": "opt-4",
        "text": "Share a single browser window across all parallel tests"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Playwright's `storageState` captures cookies and storage state after a one-time authentication setup. Tests configure `use: { storageState: \"auth.json\" }`, starting each test already authenticated without UI login overhead.",
    "referenceUrl": "https://playwright.dev/docs/auth#reuse-signed-in-state"
  },
  {
    "id": "pw-q7-adv",
    "certificationId": "playwright-e2e",
    "topic": "Debugging: Playwright Trace Viewer",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What forensic data is recorded by Playwright Trace Viewer (`use: { trace: \"on-first-retry\" }`) to debug flakiness in CI runs?",
    "options": [
      {
        "id": "opt-1",
        "text": "DOM snapshots, action log timeline, console messages, network requests/responses, and filmstrip video frames for each step"
      },
      {
        "id": "opt-2",
        "text": "CPU microcode instructions"
      },
      {
        "id": "opt-3",
        "text": "Server database transaction logs"
      },
      {
        "id": "opt-4",
        "text": "Operating system kernel core dumps"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Trace Viewer provides complete post-mortem debugging. When a test fails in CI, downloading the trace zip allows engineers to scrub through full DOM state, screenshots, console logs, and network activity at every point in time.",
    "referenceUrl": "https://playwright.dev/docs/trace-viewer"
  },
  {
    "id": "pw-q8-exp",
    "certificationId": "playwright-e2e",
    "topic": "Flakiness Elimination: Avoiding Race Conditions",
    "category": "testing",
    "difficulty": "Expert",
    "question": "Why is `await page.waitForTimeout(3000)` considered an anti-pattern in production Playwright test suites?",
    "options": [
      {
        "id": "opt-1",
        "text": "It creates flaky tests on slower CI runners where 3s is insufficient, and slows down local test execution where the condition was satisfied in 50ms"
      },
      {
        "id": "opt-2",
        "text": "It is unsupported in headless browser mode"
      },
      {
        "id": "opt-3",
        "text": "It throws an unhandled rejection in Chromium"
      },
      {
        "id": "opt-4",
        "text": "It disables JavaScript execution during the timeout"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Hardcoded sleeps lead to brittle tests. Best practice is to wait on explicit state changes using auto-waiting locators, `expect(locator).toBeVisible()`, `page.waitForResponse()`, or `page.waitForURL()`.",
    "referenceUrl": "https://playwright.dev/docs/best-practices#avoid-hardcoded-waits"
  },
  {
    "id": "pw-q9-exp",
    "certificationId": "playwright-e2e",
    "topic": "Worker Parallelism & Sharding in CI",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How does Playwright sharding (`--shard=1/4`) distribute test execution across multiple CI machines?",
    "options": [
      {
        "id": "opt-1",
        "text": "It partitions the test files deterministically into equal chunks based on shard index, allowing N parallel CI jobs to run concurrently and combine reports via merge-reports"
      },
      {
        "id": "opt-2",
        "text": "It splits each browser window into 4 quadrants on screen"
      },
      {
        "id": "opt-3",
        "text": "It runs tests on 4 different operating systems sequentially"
      },
      {
        "id": "opt-4",
        "text": "It shards database records across testing clusters"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Playwright sharding allows splitting test runs across multiple GitHub Actions / CI runners. Each runner runs its subset of tests and uploads blob reports, which are merged with `npx playwright merge-reports`.",
    "referenceUrl": "https://playwright.dev/docs/test-sharding"
  },
  {
    "id": "pw-q10-exp",
    "certificationId": "playwright-e2e",
    "topic": "CDP Protocol & Browser Extensions",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How can Playwright interact directly with low-level Chrome DevTools Protocol (CDP) sessions when testing Chromium-specific features?",
    "options": [
      {
        "id": "opt-1",
        "text": "By creating a CDPSession via `context.newCDPSession(page)` and sending raw CDP domains and methods like `client.send(\"Network.emulateNetworkConditions\", ...)`"
      },
      {
        "id": "opt-2",
        "text": "By inspecting window.chrome.devtools in page JavaScript"
      },
      {
        "id": "opt-3",
        "text": "By installing the Chrome browser extension via npm"
      },
      {
        "id": "opt-4",
        "text": "By opening DevTools window with F12 keyboard shortcut"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Playwright exposes `context.newCDPSession(page)` for Chromium browsers, providing direct access to the Chrome DevTools Protocol for specialized tasks like low-level performance profiling or custom network emulation.",
    "referenceUrl": "https://playwright.dev/docs/api/class-cdpsession"
  },
  {
    "id": "vitest-q1-inter",
    "certificationId": "vitest-testing",
    "topic": "Vitest vs Jest Vite Integration",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "Why does Vitest execute significantly faster than Jest in modern Vite-powered frontend applications?",
    "options": [
      {
        "id": "opt-1",
        "text": "It reuses the exact same Vite configuration, transform pipeline, and module graph plugins (Vite/Rollup) without redundant Babel or Webpack transpilation layers"
      },
      {
        "id": "opt-2",
        "text": "It bypasses all test assertions in production mode"
      },
      {
        "id": "opt-3",
        "text": "It only supports JavaScript, not TypeScript"
      },
      {
        "id": "opt-4",
        "text": "It executes tests in browser Web Workers exclusively"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Jest requires separate transpilation pipelines (ts-jest, babel-jest). Vitest reads your vite.config.ts directly, transforming files using esbuild/Rollup plugins in the same pipeline as your dev server, delivering near-instant test startup and hot module reloading.",
    "referenceUrl": "https://vitest.dev/guide/why.html"
  },
  {
    "id": "vitest-q2-inter",
    "certificationId": "vitest-testing",
    "topic": "In-Source Testing in Vitest",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "How does Vitest's In-Source Testing feature (`import.meta.vitest`) operate, and how are test blocks removed from production bundles?",
    "options": [
      {
        "id": "opt-1",
        "text": "Tests are written directly inside implementation files within `if (import.meta.vitest) { ... }`; during production builds, Vite tree-shakes and removes the test code completely"
      },
      {
        "id": "opt-2",
        "text": "Tests are executed when users visit the website"
      },
      {
        "id": "opt-3",
        "text": "It converts test cases into HTML comments"
      },
      {
        "id": "opt-4",
        "text": "In-source tests are only supported in Node.js scripts"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Similar to Rust, in-source testing allows co-locating unit tests directly beside function implementations. In production builds, `import.meta.vitest` evaluates to `false` and is dead-code eliminated by the bundler without increasing bundle size.",
    "referenceUrl": "https://vitest.dev/guide/in-source.html"
  },
  {
    "id": "vitest-q3-adv",
    "certificationId": "vitest-testing",
    "topic": "Worker Pool & Isolation Modes",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "When should a test suite configure `pool: \"forks\"` instead of `pool: \"threads\"` in `vitest.config.ts`?",
    "options": [
      {
        "id": "opt-1",
        "text": "When tests depend on native C++ Node addons, modify `process.chdir()`, or when worker threads cause memory isolation issues across modules"
      },
      {
        "id": "opt-2",
        "text": "When testing React components in JSDOM"
      },
      {
        "id": "opt-3",
        "text": "When running tests on Windows exclusively"
      },
      {
        "id": "opt-4",
        "text": "`forks` is deprecated in Vitest v1+"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`threads` uses worker_threads (fast, shared memory). However, worker threads cannot modify process-level state like process.chdir() and may crash with native C++ bindings that lack multi-threading safety. `forks` uses child_process with complete OS process isolation.",
    "referenceUrl": "https://vitest.dev/config/#pool"
  },
  {
    "id": "vitest-q4-adv",
    "certificationId": "vitest-testing",
    "topic": "vi.hoisted() for Pre-Execution Variables",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "Why did Vitest introduce `vi.hoisted()` for module mocking compared to standard variable declarations?",
    "options": [
      {
        "id": "opt-1",
        "text": "Because `vi.mock()` calls are hoisted to the top of the file before imports; `vi.hoisted()` evaluates variables before the hoisted mocks run, allowing mocks to access dynamic variables"
      },
      {
        "id": "opt-2",
        "text": "To hoist React components to the DOM head"
      },
      {
        "id": "opt-3",
        "text": "To prevent TypeScript type errors"
      },
      {
        "id": "opt-4",
        "text": "To cache API responses in IndexedDB"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Since `vi.mock()` is hoisted before module imports, referencing outer variables inside mock factories throws reference errors. `vi.hoisted(() => ...)` executes before hoisted mocks, providing safe access to shared values.",
    "referenceUrl": "https://vitest.dev/api/vi.html#vi-hoisted"
  },
  {
    "id": "vitest-q5-adv",
    "certificationId": "vitest-testing",
    "topic": "Vitest Browser Mode",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What is the operational difference between running component tests in Vitest with JSDOM vs Vitest Browser Mode?",
    "options": [
      {
        "id": "opt-1",
        "text": "JSDOM simulates a DOM in Node.js (missing layout engines, real CSS, computed styles); Browser Mode runs tests directly inside real browser engines (Chromium, Firefox, WebKit) via Playwright or WebdriverIO"
      },
      {
        "id": "opt-2",
        "text": "Browser mode runs tests on a cloud server"
      },
      {
        "id": "opt-3",
        "text": "JSDOM only supports Vue components"
      },
      {
        "id": "opt-4",
        "text": "Browser mode is limited to visual regression testing"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "JSDOM is an approximate Node-based DOM emulator that cannot compute real CSS layouts, focus rings, or canvas renderings. Vitest Browser Mode executes tests in real browser instances with authentic rendering, events, and DevTools debugging.",
    "referenceUrl": "https://vitest.dev/guide/browser/"
  },
  {
    "id": "vitest-q6-adv",
    "certificationId": "vitest-testing",
    "topic": "Micro-Benchmarking with bench()",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How does Vitest's built-in benchmarking suite (`bench()`) calculate reliable throughput measurements for algorithmic code?",
    "options": [
      {
        "id": "opt-1",
        "text": "It integrates Tinybench to execute warmup iterations, measures ops/sec, and calculates margin of error (MoE) and relative standard deviation (RSD) across repeated iterations"
      },
      {
        "id": "opt-2",
        "text": "By measuring the file size of the compiled JavaScript bundle"
      },
      {
        "id": "opt-3",
        "text": "By counting lines of code in the implementation"
      },
      {
        "id": "opt-4",
        "text": "By running the algorithm on an external cloud server"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Vitest includes first-class benchmarking powered by Tinybench. Calling `bench(\"my-fn\", () => { ... })` runs warmup cycles, tracks execution times, and reports operations per second with statistical confidence intervals.",
    "referenceUrl": "https://vitest.dev/guide/features.html#benchmarking"
  },
  {
    "id": "vitest-q7-adv",
    "certificationId": "vitest-testing",
    "topic": "File Snapshots with toMatchFileSnapshot",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "When is `expect(output).toMatchFileSnapshot(\"./output.html\")` preferred over traditional inline or multi-line snapshots in Vitest?",
    "options": [
      {
        "id": "opt-1",
        "text": "When testing large generated files (HTML, SVG, CSV, ASTs), storing the snapshot in a dedicated file with native editor syntax highlighting and clean Git diffing"
      },
      {
        "id": "opt-2",
        "text": "When testing binary image files"
      },
      {
        "id": "opt-3",
        "text": "When running tests in browser mode"
      },
      {
        "id": "opt-4",
        "text": "To prevent snapshots from being committed to Git"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Large snapshots inside `__snapshots__/*.snap` files become unreadable blobs. `toMatchFileSnapshot` writes directly to a designated file with its proper extension, enabling syntax highlighting, linting, and readable GitHub PR diffs.",
    "referenceUrl": "https://vitest.dev/api/expect.html#tomatchfilesnapshot"
  },
  {
    "id": "vitest-q8-exp",
    "certificationId": "vitest-testing",
    "topic": "Monorepo Workspace Architecture (vitest.workspace.ts)",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How does a `vitest.workspace.ts` configuration file organize test runs in a multi-package monorepo?",
    "options": [
      {
        "id": "opt-1",
        "text": "It defines project configurations with different testing environments (e.g. backend packages with `node`, frontend with `happy-dom`, E2E with `browser`) executed in a single unified run"
      },
      {
        "id": "opt-2",
        "text": "It merges all package.json files into one"
      },
      {
        "id": "opt-3",
        "text": "It publishes npm packages automatically on test pass"
      },
      {
        "id": "opt-4",
        "text": "It forces all packages to use the same dependencies"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`vitest.workspace.ts` allows monorepos to define different test configurations per sub-project (custom environments, setupFiles, aliases). Running `vitest` runs all workspace projects concurrently in a single dashboard.",
    "referenceUrl": "https://vitest.dev/guide/workspace.html"
  },
  {
    "id": "vitest-q9-exp",
    "certificationId": "vitest-testing",
    "topic": "Custom Test Environments Inheritance",
    "category": "testing",
    "difficulty": "Expert",
    "question": "What is required when creating a custom Vitest environment to simulate specialized browser/runtime globals?",
    "options": [
      {
        "id": "opt-1",
        "text": "Implementing an object with `name`, `setup(global, options)` returning a teardown function, and initializing global objects like `window`, `document`, and custom mock APIs"
      },
      {
        "id": "opt-2",
        "text": "Recompiling Node.js source code"
      },
      {
        "id": "opt-3",
        "text": "Installing an external browser extension"
      },
      {
        "id": "opt-4",
        "text": "Setting `process.env.TEST = \"custom\"`"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A custom Vitest environment defines `{ name: \"my-env\", setup(global) { ... return { teardown(global) { ... } } } }`. It injects custom globals into the VM context before test execution and cleans them up after completion.",
    "referenceUrl": "https://vitest.dev/guide/environment.html"
  },
  {
    "id": "vitest-q10-exp",
    "certificationId": "vitest-testing",
    "topic": "Coverage Providers: V8 vs Istanbul",
    "category": "testing",
    "difficulty": "Expert",
    "question": "What is the architectural trade-off between `coverage.provider: \"v8\"` and `coverage.provider: \"istanbul\"` in Vitest?",
    "options": [
      {
        "id": "opt-1",
        "text": "V8 uses Node's native bytecode execution profiler (extremely fast, zero AST code instrumentation overhead, but can have subtle branch edge cases); Istanbul instruments code with counter variables (slower, but highly deterministic)"
      },
      {
        "id": "opt-2",
        "text": "Istanbul only works with JavaScript; V8 only works with TypeScript"
      },
      {
        "id": "opt-3",
        "text": "V8 requires an external paid subscription"
      },
      {
        "id": "opt-4",
        "text": "Istanbul generates binary coverage files only"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "V8 coverage leverages V8 engine's built-in block-level execution profiling without rewriting source files, making it 5-10x faster. Istanbul rewrites ASTs to inject execution counters, which incurs significant transpilation and runtime overhead.",
    "referenceUrl": "https://vitest.dev/guide/coverage.html"
  },
  {
    "id": "rtl-q1-inter",
    "certificationId": "react-testing-library",
    "topic": "Testing Library Core Guiding Principle",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "What is the core philosophical principle of React Testing Library (RTL)?",
    "options": [
      {
        "id": "opt-1",
        "text": "The more your tests resemble the way your software is used, the more confidence they can give you (test behavior and DOM outputs rather than component state or internal instance methods)"
      },
      {
        "id": "opt-2",
        "text": "Test 100% of internal component state and props directly"
      },
      {
        "id": "opt-3",
        "text": "Every component must be shallow-rendered with Enzyme"
      },
      {
        "id": "opt-4",
        "text": "Tests should verify React Fiber node structure"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "RTL avoids testing implementation details (component state, internal methods). By interacting with the rendered DOM the way real users and screen readers do, tests remain resilient across internal refactorings.",
    "referenceUrl": "https://testing-library.com/docs/guiding-principles"
  },
  {
    "id": "rtl-q2-inter",
    "certificationId": "react-testing-library",
    "topic": "RTL Query Priority Order",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "According to the official Testing Library query priority guidelines, which query should be your primary choice for finding interactive elements?",
    "options": [
      {
        "id": "opt-1",
        "text": "`getByRole` (e.g. `screen.getByRole(\"button\", { name: \"Submit\" })`)"
      },
      {
        "id": "opt-2",
        "text": "`getByTestId`"
      },
      {
        "id": "opt-3",
        "text": "`container.querySelector` with CSS class names"
      },
      {
        "id": "opt-4",
        "text": "`getByTitle`"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`getByRole` queries elements in the accessibility tree according to their ARIA roles and accessible names, verifying both visual functionality and accessibility. `getByTestId` is the lowest-priority fallback.",
    "referenceUrl": "https://testing-library.com/docs/queries/about#priority"
  },
  {
    "id": "rtl-q3-adv",
    "certificationId": "react-testing-library",
    "topic": "userEvent vs fireEvent",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "Why does `@testing-library/user-event` provide more reliable tests than `fireEvent`?",
    "options": [
      {
        "id": "opt-1",
        "text": "`userEvent` simulates realistic user interaction sequences (hover, pointerdown, mousedown, focus, click) and checks disabled states, while `fireEvent` dispatches isolated synthetic DOM events"
      },
      {
        "id": "opt-2",
        "text": "`fireEvent` is deprecated in React 18"
      },
      {
        "id": "opt-3",
        "text": "`userEvent` executes on the GPU"
      },
      {
        "id": "opt-4",
        "text": "`fireEvent` only works with keyboard events"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`fireEvent.click(button)` dispatches a single click event without triggering mouseenter, focus, or respecting disabled element constraints. `userEvent.click()` runs the complete browser event chain and correctly avoids clicking disabled elements.",
    "referenceUrl": "https://testing-library.com/docs/user-event/intro"
  },
  {
    "id": "rtl-q4-adv",
    "certificationId": "react-testing-library",
    "topic": "Query Types: getBy vs queryBy vs findBy",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "When should you use `queryBy*` instead of `getBy*` or `findBy*` in React Testing Library?",
    "options": [
      {
        "id": "opt-1",
        "text": "When asserting that an element is NOT present in the DOM (`expect(screen.queryByText(\"Error\")).not.toBeInTheDocument()`), because `getBy*` throws an immediate error if no element is found"
      },
      {
        "id": "opt-2",
        "text": "When fetching data from an external REST API"
      },
      {
        "id": "opt-3",
        "text": "When querying elements inside an iframe"
      },
      {
        "id": "opt-4",
        "text": "When waiting for async animations to finish"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`getBy*` throws an error if 0 elements match. `queryBy*` returns `null` instead of throwing, making it the only valid choice for asserting element absence. `findBy*` returns a Promise that retries until found.",
    "referenceUrl": "https://testing-library.com/docs/queries/about#types-of-queries"
  },
  {
    "id": "rtl-q5-adv",
    "certificationId": "react-testing-library",
    "topic": "The act(...) Warning & Asynchronous State Updates",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What causes the \"Warning: An update to Component inside a test was not wrapped in act(...)\" in React testing, and how should it be resolved?",
    "options": [
      {
        "id": "opt-1",
        "text": "A state update occurred in the component after the test finished or outside an awaited async block; resolve by properly awaiting `findBy*`, `userEvent`, or `waitFor()` until the state change completes"
      },
      {
        "id": "opt-2",
        "text": "By wrapping all test assertions in `act(() => { ... })` manually"
      },
      {
        "id": "opt-3",
        "text": "By disabling React warnings in jest.config.js"
      },
      {
        "id": "opt-4",
        "text": "By switching from React to Preact"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The `act()` warning signifies that an asynchronous operation (resolved promise, timer) triggered a `setState` when the test runner was not awaiting it. Manually wrapping everything in `act()` is an anti-pattern; the correct fix is awaiting the asynchronous DOM outcome with `await screen.findBy...` or `await waitFor(...)`.",
    "referenceUrl": "https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning"
  },
  {
    "id": "rtl-q6-adv",
    "certificationId": "react-testing-library",
    "topic": "renderHook for Custom Hooks",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How do you test state transitions of a custom hook (e.g. `useCounter`) using `renderHook` and `act`?",
    "options": [
      {
        "id": "opt-1",
        "text": "`const { result } = renderHook(() => useCounter()); act(() => { result.current.increment(); }); expect(result.current.count).toBe(1);`"
      },
      {
        "id": "opt-2",
        "text": "`const counter = useCounter(); counter.increment();`"
      },
      {
        "id": "opt-3",
        "text": "`render(<useCounter />);`"
      },
      {
        "id": "opt-4",
        "text": "`result.current.count = 1;`"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`renderHook` renders the hook inside a test harness component. Calling synchronous hook mutation callbacks inside `act(() => { ... })` ensures state updates and re-renders flush before evaluating `result.current`.",
    "referenceUrl": "https://testing-library.com/docs/react-testing-library/api/#renderhook"
  },
  {
    "id": "rtl-q7-adv",
    "certificationId": "react-testing-library",
    "topic": "Custom Render Wrapper Pattern",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How do production React codebases configure global test providers (Redux, React Query, ThemeProvider, Router) to avoid repetitive boilerplate in every test file?",
    "options": [
      {
        "id": "opt-1",
        "text": "By creating a custom `render` function that wraps the UI in an `AllTheProviders` component and re-exporting it alongside all `@testing-library/react` utilities"
      },
      {
        "id": "opt-2",
        "text": "By adding global variables to the window object"
      },
      {
        "id": "opt-3",
        "text": "By disabling providers in the test environment"
      },
      {
        "id": "opt-4",
        "text": "By compiling providers into WebAssembly"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The custom render pattern wraps `render(ui, { wrapper: AllTheProviders, ...options })`. Exporting this custom render function from a `test-utils.tsx` file provides consistent, realistic context (theme, router, store) across all component tests.",
    "referenceUrl": "https://testing-library.com/docs/react-testing-library/setup#custom-render"
  },
  {
    "id": "rtl-q8-exp",
    "certificationId": "react-testing-library",
    "topic": "Mock Service Worker (MSW) Network Mocking",
    "category": "testing",
    "difficulty": "Expert",
    "question": "Why is Mock Service Worker (MSW) preferred over mocking `fetch` or `axios` module methods in React component integration tests?",
    "options": [
      {
        "id": "opt-1",
        "text": "MSW intercepts network requests at the network layer (Node http module / Service Worker), testing real client fetch code, serialization, headers, and interceptors identically across tests, dev server, and Storybook"
      },
      {
        "id": "opt-2",
        "text": "MSW generates backend database schemas automatically"
      },
      {
        "id": "opt-3",
        "text": "MSW eliminates the need for unit tests"
      },
      {
        "id": "opt-4",
        "text": "MSW runs only in Google Chrome"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Mocking `axios.get` or `global.fetch` tests against implementation details and bypasses request serialization, headers, and client interceptors. MSW intercepts requests at the network boundary, ensuring identical behavior across Node test runners and real browsers.",
    "referenceUrl": "https://mswjs.io/docs/philosophy"
  },
  {
    "id": "rtl-q9-exp",
    "certificationId": "react-testing-library",
    "topic": "Testing Suspense & Concurrent React Transitions",
    "category": "testing",
    "difficulty": "Expert",
    "question": "When testing a component that uses React Suspense for data fetching, how do you verify both the fallback loading state and the resolved content?",
    "options": [
      {
        "id": "opt-1",
        "text": "Assert that the fallback skeleton is in the document with `getByTestId(\"loading\")`, then await the resolved content using `await screen.findByRole(...)` to allow Suspense resolution to flush"
      },
      {
        "id": "opt-2",
        "text": "Disable Suspense in the test environment"
      },
      {
        "id": "opt-3",
        "text": "Call Component.suspense() directly"
      },
      {
        "id": "opt-4",
        "text": "Wrap the assertion in setTimeout"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Suspense renders its fallback while promises are pending. Verifying the fallback with synchronous `getBy*` confirms the loading state, and awaiting the resolved UI with `findBy*` lets the asynchronous promise settle and verifies the loaded state.",
    "referenceUrl": "https://testing-library.com/docs/react-testing-library/example-intro#async-tests"
  },
  {
    "id": "rtl-q10-exp",
    "certificationId": "react-testing-library",
    "topic": "Debugging Accessible Roles & Testing Playground",
    "category": "testing",
    "difficulty": "Expert",
    "question": "When `screen.getByRole(\"button\", { name: \"Close\" })` fails to find an element with an SVG icon, what debugging utility helps inspect how the DOM is exposed to the accessibility tree?",
    "options": [
      {
        "id": "opt-1",
        "text": "`screen.logTestingPlaygroundURL()` or `screen.debug()`, which outputs accessible roles and recommends the exact accessible query selector"
      },
      {
        "id": "opt-2",
        "text": "`console.dir(window.document)`"
      },
      {
        "id": "opt-3",
        "text": "Taking a screenshot with Puppeteer"
      },
      {
        "id": "opt-4",
        "text": "Opening the React DevTools browser extension"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`screen.logTestingPlaygroundURL()` generates a link to testing-playground.com with your component's DOM tree, showing how accessibility APIs interpret roles and names and recommending the ideal query.",
    "referenceUrl": "https://testing-library.com/docs/dom-testing-library/api-debugging#screenlogtestingplaygroundurl"
  },
  {
    "id": "cy-q1-inter",
    "certificationId": "cypress-automation",
    "topic": "Cypress Execution Architecture",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "How does Cypress's architecture differ fundamentally from Selenium WebDriver when running browser tests?",
    "options": [
      {
        "id": "opt-1",
        "text": "Cypress executes inside the browser in the exact same event run-loop as the application code, whereas Selenium controls the browser externally via network wire protocol commands"
      },
      {
        "id": "opt-2",
        "text": "Cypress runs tests on a headless server without launching a browser"
      },
      {
        "id": "opt-3",
        "text": "Cypress cannot test single-page applications"
      },
      {
        "id": "opt-4",
        "text": "Cypress requires mobile hardware emulators"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Selenium sends commands over HTTP to browser drivers outside the browser. Cypress executes directly inside the browser process, giving it native access to window objects, DOM elements, network requests, and timer loops.",
    "referenceUrl": "https://docs.cypress.io/guides/overview/key-differences"
  },
  {
    "id": "cy-q2-inter",
    "certificationId": "cypress-automation",
    "topic": "Cypress Command Chaining & Async Execution",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "Why should you NOT use `async/await` syntax with Cypress commands like `const text = await cy.get(\".title\").text()`?",
    "options": [
      {
        "id": "opt-1",
        "text": "Cypress commands are NOT native JavaScript Promises; they are declarative tasks pushed into an internal execution queue that manages automatic retries and timing"
      },
      {
        "id": "opt-2",
        "text": "Cypress only works with ES5 JavaScript"
      },
      {
        "id": "opt-3",
        "text": "`await` causes Cypress to crash with memory leaks"
      },
      {
        "id": "opt-4",
        "text": "Cypress commands execute synchronously on the server"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cypress commands are chainable objects, not standard promises. Mixing async/await with Cypress command chaining breaks Cypress's retry-ability and internal task serialization. Values should be accessed via `.then($el => ...)` or assertions.",
    "referenceUrl": "https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous"
  },
  {
    "id": "cy-q3-adv",
    "certificationId": "cypress-automation",
    "topic": "Network Interception: cy.intercept()",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How do you intercept an API call, stub its response with fixture data, and wait for it in Cypress?",
    "options": [
      {
        "id": "opt-1",
        "text": "`cy.intercept(\"GET\", \"/api/items\", { fixture: \"items.json\" }).as(\"getItems\"); cy.visit(\"/items\"); cy.wait(\"@getItems\");`"
      },
      {
        "id": "opt-2",
        "text": "`cy.mockRoute(\"/api/items\", \"items.json\");`"
      },
      {
        "id": "opt-3",
        "text": "`cy.stubFetch(\"/api/items\");`"
      },
      {
        "id": "opt-4",
        "text": "`cy.server({ route: \"/api/items\" });`"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`cy.intercept()` spies on and stubs HTTP requests. Aliasing the route with `.as(\"alias\")` allows `cy.wait(\"@alias\")` to explicitly synchronize tests with network completion, eliminating timing race conditions.",
    "referenceUrl": "https://docs.cypress.io/api/commands/intercept"
  },
  {
    "id": "cy-q4-adv",
    "certificationId": "cypress-automation",
    "topic": "Cross-Origin Testing with cy.origin()",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What capability does `cy.origin()` provide when testing OAuth authentication flows in Cypress?",
    "options": [
      {
        "id": "opt-1",
        "text": "It allows executing commands on a secondary cross-origin domain (e.g. `auth0.com` or `google.com`) during SSO login redirects within the same test spec"
      },
      {
        "id": "opt-2",
        "text": "It bypasses CORS policies on backend databases"
      },
      {
        "id": "opt-3",
        "text": "It runs tests in multiple browser windows concurrently"
      },
      {
        "id": "opt-4",
        "text": "It encrypts test payloads over TLS"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Previously, Cypress was restricted to a single origin per test. `cy.origin(\"auth0.com\", () => { ... })` opens a secure cross-origin execution context, allowing interaction with third-party identity providers during login flows.",
    "referenceUrl": "https://docs.cypress.io/api/commands/origin"
  },
  {
    "id": "cy-q5-adv",
    "certificationId": "cypress-automation",
    "topic": "Session Caching with cy.session()",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How does `cy.session()` optimize test suite execution across hundreds of authenticated specs?",
    "options": [
      {
        "id": "opt-1",
        "text": "It caches browser cookies, localStorage, and sessionStorage after a login flow; subsequent tests restore session state instantly without re-executing UI or API login steps"
      },
      {
        "id": "opt-2",
        "text": "It stores video recordings in an S3 bucket"
      },
      {
        "id": "opt-3",
        "text": "It keeps the browser window open between CI runs"
      },
      {
        "id": "opt-4",
        "text": "It shares browser memory across multiple physical machines"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Re-authenticating through the UI in every `beforeEach` adds minutes to test suites. `cy.session(sessionId, loginFn)` runs the login once, saves credentials to storage, and restores them in milliseconds on subsequent tests.",
    "referenceUrl": "https://docs.cypress.io/api/commands/session"
  },
  {
    "id": "cy-q6-adv",
    "certificationId": "cypress-automation",
    "topic": "Retry-ability & Query Chaining",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "In Cypress, why does `cy.get(\".todo-list\").find(\"li\").should(\"have.length\", 3)` eliminate flakiness compared to manual assertions?",
    "options": [
      {
        "id": "opt-1",
        "text": "Cypress automatically retries the query chain until the assertion passes or the timeout expires, automatically accommodating asynchronous DOM rendering"
      },
      {
        "id": "opt-2",
        "text": "It pauses execution for 5 seconds between each element"
      },
      {
        "id": "opt-3",
        "text": "It disables animations in CSS"
      },
      {
        "id": "opt-4",
        "text": "It executes in a Node.js worker"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cypress features built-in retry-ability. If the assertion fails (e.g. list has 2 items while loading), Cypress re-queries the DOM and re-runs the assertion continuously until it passes or hits `defaultCommandTimeout` (default 4s).",
    "referenceUrl": "https://docs.cypress.io/guides/core-concepts/retry-ability"
  },
  {
    "id": "cy-q7-adv",
    "certificationId": "cypress-automation",
    "topic": "Cypress Component Testing vs E2E",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What is the architectural difference between Cypress Component Testing and Cypress E2E Testing?",
    "options": [
      {
        "id": "opt-1",
        "text": "Component testing mounts individual React/Vue components in isolation using dev-server bundlers (Vite/Webpack) without visiting a remote URL; E2E tests the full deployed application in a browser"
      },
      {
        "id": "opt-2",
        "text": "Component testing runs in Node.js without a browser"
      },
      {
        "id": "opt-3",
        "text": "E2E testing does not support assertions"
      },
      {
        "id": "opt-4",
        "text": "Component testing cannot click buttons"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cypress Component Testing replaces jsdom with a real browser runner for components. `mount(<MyComponent />)` mounts the component using the project's Vite/Webpack bundler, testing real CSS and DOM events in browser space.",
    "referenceUrl": "https://docs.cypress.io/guides/component-testing/overview"
  },
  {
    "id": "cy-q8-exp",
    "certificationId": "cypress-automation",
    "topic": "Custom Commands & Cypress.Commands.add",
    "category": "testing",
    "difficulty": "Expert",
    "question": "When creating a custom command with `Cypress.Commands.add()`, how do you maintain full TypeScript type safety across your test files?",
    "options": [
      {
        "id": "opt-1",
        "text": "Declare module augmentation for `global { namespace Cypress { interface Chainable { myCommand(): Chainable<...>; } } }` in a `.d.ts` file"
      },
      {
        "id": "opt-2",
        "text": "Cast all calls with `as any`"
      },
      {
        "id": "opt-3",
        "text": "TypeScript does not support Cypress custom commands"
      },
      {
        "id": "opt-4",
        "text": "Define the command as a global window property"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "TypeScript recognizes custom commands via namespace merging on `Cypress.Chainable`. Declaring the method signature inside `namespace Cypress { interface Chainable { ... } }` provides IntelliSense and type checking.",
    "referenceUrl": "https://docs.cypress.io/guides/tooling/typescript-support#Types-for-custom-commands"
  },
  {
    "id": "cy-q9-exp",
    "certificationId": "cypress-automation",
    "topic": "Node Event Delegation with cy.task()",
    "category": "testing",
    "difficulty": "Expert",
    "question": "Why does Cypress provide `cy.task()` alongside standard browser commands?",
    "options": [
      {
        "id": "opt-1",
        "text": "To escape the browser sandbox and execute Node.js code on the host machine, such as seeding a database, clearing Redis caches, or reading filesystem files"
      },
      {
        "id": "opt-2",
        "text": "To run CSS animations"
      },
      {
        "id": "opt-3",
        "text": "To download Chrome extensions"
      },
      {
        "id": "opt-4",
        "text": "To execute JavaScript on client mobile devices"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Because Cypress tests run inside the browser, they cannot directly access databases, file systems, or native OS APIs. `cy.task(taskName, arg)` sends an event to the background Cypress Node.js process to execute server-side operations.",
    "referenceUrl": "https://docs.cypress.io/api/commands/task"
  },
  {
    "id": "cy-q10-exp",
    "certificationId": "cypress-automation",
    "topic": "CI Parallelization & Flaky Test Management",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How does Cypress CI parallelization (`cypress run --record --parallel`) distribute spec files across multiple CI containers?",
    "options": [
      {
        "id": "opt-1",
        "text": "Containers request specs dynamically from the orchestration server; specs are distributed based on historical run time data to balance execution time evenly across all machines"
      },
      {
        "id": "opt-2",
        "text": "Each container runs every test in round-robin fashion"
      },
      {
        "id": "opt-3",
        "text": "Specs are sorted alphabetically and divided equally"
      },
      {
        "id": "opt-4",
        "text": "By splitting individual test files into separate functions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Static test distribution causes slower machines to delay the pipeline. Cypress cloud orchestration distributes specs dynamically: as soon as a machine finishes a spec, it claims the next available spec, achieving optimal load balancing.",
    "referenceUrl": "https://docs.cypress.io/guides/guides/parallelization"
  },
  {
    "id": "unit-q1-inter",
    "certificationId": "unit-testing-architecture",
    "topic": "FIRST Principles of Unit Testing",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "What do the letters in the FIRST principles of effective unit testing stand for?",
    "options": [
      {
        "id": "opt-1",
        "text": "Fast, Independent, Repeatable, Self-validating, and Timely"
      },
      {
        "id": "opt-2",
        "text": "Functional, Integrated, Reliable, Secure, and Thorough"
      },
      {
        "id": "opt-3",
        "text": "Flexible, Isolated, Robust, Scalable, and Tested"
      },
      {
        "id": "opt-4",
        "text": "Format, Input, Result, Status, and Type"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "FIRST principles define clean unit testing: Fast (execute in milliseconds), Independent (no order dependencies), Repeatable (deterministic in any environment), Self-validating (boolean pass/fail without manual log inspection), Timely (written alongside or before code).",
    "referenceUrl": "https://medium.com/@cleancode/first-principles-of-unit-testing-clean-code-8bf79b4a4cb1"
  },
  {
    "id": "unit-q2-inter",
    "certificationId": "unit-testing-architecture",
    "topic": "TDD Red-Green-Refactor Cycle",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "What is the required order and discipline in the Test-Driven Development (TDD) cycle?",
    "options": [
      {
        "id": "opt-1",
        "text": "Red (write a failing test for a new capability), Green (write the minimal code necessary to pass the test), Refactor (clean up code structure while keeping tests passing)"
      },
      {
        "id": "opt-2",
        "text": "Write all application code, write unit tests, fix failing tests"
      },
      {
        "id": "opt-3",
        "text": "Refactor code, deploy to staging, run E2E tests"
      },
      {
        "id": "opt-4",
        "text": "Green, Red, Refactor"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "TDD enforces: 1. Red: write a test that fails for the right reason, 2. Green: write the simplest implementation that makes the test pass, 3. Refactor: eliminate duplication and improve design with confidence that the test suite catches regressions.",
    "referenceUrl": "https://martinfowler.com/bliki/TestDrivenDevelopment.html"
  },
  {
    "id": "unit-q3-adv",
    "certificationId": "unit-testing-architecture",
    "topic": "Test Doubles: Mocks vs Stubs vs Fakes",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "According to Gerard Meszaros's Test Double patterns, what is the precise definition of a \"Fake\"?",
    "options": [
      {
        "id": "opt-1",
        "text": "A working implementation with business shortcuts that make it unsuitable for production (e.g. an in-memory database or hash map repository)"
      },
      {
        "id": "opt-2",
        "text": "An object that records method calls and arguments for later assertion"
      },
      {
        "id": "opt-3",
        "text": "An object passed solely to fill parameter lists without being used"
      },
      {
        "id": "opt-4",
        "text": "An object that returns hardcoded canned answers to method calls"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Taxonomy of Test Doubles: Dummy (fills parameter slots), Stub (provides canned answers), Spy (records interactions), Mock (pre-programmed with expectations), Fake (has a real working implementation but takes shortcuts, e.g. InMemoryUserRepository).",
    "referenceUrl": "https://martinfowler.com/articles/mocksArentStubs.html"
  },
  {
    "id": "unit-q4-adv",
    "certificationId": "unit-testing-architecture",
    "topic": "Classical (Detroit) vs Mockist (London) TDD",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What is the architectural divide between Classical (Detroit/Chicago) and Mockist (London) schools of TDD?",
    "options": [
      {
        "id": "opt-1",
        "text": "Classical TDD uses real domain collaborators and verifies state; London TDD uses mocks for all collaborators and verifies interactions between objects"
      },
      {
        "id": "opt-2",
        "text": "Classical TDD only works with Java; London TDD only works with Python"
      },
      {
        "id": "opt-3",
        "text": "London TDD does not use unit tests"
      },
      {
        "id": "opt-4",
        "text": "Classical TDD tests only database queries"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Classical TDD favors state verification using real objects whenever feasible, making tests resilient to internal refactorings. London TDD designs systems outside-in, isolating the unit under test by mocking all neighboring collaborators and asserting message passing.",
    "referenceUrl": "https://martinfowler.com/articles/mocksArentStubs.html#ClassicalAndMockistTesting"
  },
  {
    "id": "unit-q5-adv",
    "certificationId": "unit-testing-architecture",
    "topic": "Boundary Value Analysis & Equivalence Partitioning",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "For a function that accepts an integer age between 18 and 65 (inclusive), what test inputs represent optimal Boundary Value Analysis (BVA)?",
    "options": [
      {
        "id": "opt-1",
        "text": "17, 18, 19, 64, 65, and 66"
      },
      {
        "id": "opt-2",
        "text": "0, 50, 100"
      },
      {
        "id": "opt-3",
        "text": "20, 30, 40, 50, 60"
      },
      {
        "id": "opt-4",
        "text": "-1 and 1000"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Boundary Value Analysis tests values on, immediately below, and immediately above input boundaries. For [18, 65], boundary values are: 17 (just below min), 18 (min), 19 (just above min), 64 (just below max), 65 (max), and 66 (just above max).",
    "referenceUrl": "https://en.wikipedia.org/wiki/Boundary-value_analysis"
  },
  {
    "id": "unit-q6-adv",
    "certificationId": "unit-testing-architecture",
    "topic": "Mutation Testing & Stryker Score",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What does a Mutation Testing tool (such as Stryker) evaluate that standard code coverage metrics (lines/branches covered) cannot?",
    "options": [
      {
        "id": "opt-1",
        "text": "Test assertion effectiveness: it injects artificial bugs (mutants like changing `>` to `<` or deleting statements) into production code and checks whether the test suite fails (\"kills the mutant\")"
      },
      {
        "id": "opt-2",
        "text": "CSS layout regressions"
      },
      {
        "id": "opt-3",
        "text": "Network bandwidth speed"
      },
      {
        "id": "opt-4",
        "text": "SQL query execution plans"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A test suite can achieve 100% line coverage with zero assertions. Mutation testing measures test quality: if a mutant survives (code altered, but all tests still pass), it reveals missing or inadequate assertions in the test suite.",
    "referenceUrl": "https://stryker-mutator.io/docs/"
  },
  {
    "id": "unit-q7-adv",
    "certificationId": "unit-testing-architecture",
    "topic": "Property-Based Testing (fast-check)",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How does Property-Based Testing (e.g. `fast-check` in TypeScript) differ from traditional example-based unit testing?",
    "options": [
      {
        "id": "opt-1",
        "text": "Instead of testing specific hardcoded inputs (e.g. add(2, 3)), it defines universal mathematical invariants (e.g. add(a, b) === add(b, a)) and automatically generates hundreds of randomized edge-case inputs to find counterexamples and shrink them"
      },
      {
        "id": "opt-2",
        "text": "It tests CSS property values on DOM elements"
      },
      {
        "id": "opt-3",
        "text": "It converts unit tests into load tests"
      },
      {
        "id": "opt-4",
        "text": "It verifies database property attributes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Property-based testing tests properties that should hold true for all valid inputs. If a failure occurs, the engine performs \"shrinking\" (systematically reducing the failing input to the minimal reproducible case, e.g. empty string or zero).",
    "referenceUrl": "https://fast-check.dev/"
  },
  {
    "id": "unit-q8-exp",
    "certificationId": "unit-testing-architecture",
    "topic": "Hexagonal Architecture & Port-Adapter Testability",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How does Hexagonal Architecture (Ports and Adapters) simplify unit testing of complex business logic?",
    "options": [
      {
        "id": "opt-1",
        "text": "Core domain logic depends solely on domain interfaces (driving and driven ports); unit tests execute against pure domain models with in-memory fake adapters, running with zero mocking frameworks and zero infrastructure I/O"
      },
      {
        "id": "opt-2",
        "text": "It requires testing components inside Docker containers"
      },
      {
        "id": "opt-3",
        "text": "It eliminates the need for unit tests"
      },
      {
        "id": "opt-4",
        "text": "It restricts application code to six classes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Hexagonal architecture, domain business logic has no dependencies on databases, HTTP servers, or external services. Tests instantiate the domain model and plug in in-memory test doubles for ports, achieving lightning-fast, deterministic unit tests.",
    "referenceUrl": "https://alistair.cockburn.us/hexagonal-architecture/"
  },
  {
    "id": "unit-q9-exp",
    "certificationId": "unit-testing-architecture",
    "topic": "Anti-Pattern: Testing Implementation Details",
    "category": "testing",
    "difficulty": "Expert",
    "question": "Why is testing private methods directly (e.g. via reflection or export hacks) considered an architectural anti-pattern in unit testing?",
    "options": [
      {
        "id": "opt-1",
        "text": "Private methods are internal implementation details; testing them creates rigid coupling, breaking tests whenever internal code is refactored even though public behavior remains correct"
      },
      {
        "id": "opt-2",
        "text": "Private methods cannot be compiled by TypeScript"
      },
      {
        "id": "opt-3",
        "text": "Private methods consume more memory during testing"
      },
      {
        "id": "opt-4",
        "text": "Private methods are only executed in production"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Unit tests should test the public API and observable contracts of a module. If private methods are tested directly, developers cannot refactor internal helpers without breaking tests, leading to brittle test suites that hinder code maintenance.",
    "referenceUrl": "https://martinfowler.com/bliki/UnitTest.html"
  },
  {
    "id": "unit-q10-exp",
    "certificationId": "unit-testing-architecture",
    "topic": "Deterministic Clocks & Time Decoupling",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How should production codebases be designed so that time-dependent logic (e.g. expiration tokens, retry intervals) can be unit-tested without flaky real-world sleeps?",
    "options": [
      {
        "id": "opt-1",
        "text": "Inject a clock abstraction (e.g. `interface IClock { now(): Date }`) into domain services, allowing unit tests to inject a controllable fake clock that advances time deterministically"
      },
      {
        "id": "opt-2",
        "text": "Use `Thread.sleep(1000)` in test assertions"
      },
      {
        "id": "opt-3",
        "text": "Query the current time from an external NTP server"
      },
      {
        "id": "opt-4",
        "text": "Hardcode all timestamps to the year 2000"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Calling `new Date()` or `Date.now()` directly in business logic introduces non-determinism. Injecting a Clock interface allows tests to control and advance virtual time instantly, testing 30-day expiration logic in 1 millisecond.",
    "referenceUrl": "https://martinfowler.com/bliki/ClockWrapper.html"
  },
  {
    "id": "integ-q1-inter",
    "certificationId": "integration-e2e-testing",
    "topic": "The Practical Test Pyramid",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "In Mike Cohn's classic Test Pyramid, what is the rationale for having many unit tests at the base and fewer E2E tests at the apex?",
    "options": [
      {
        "id": "opt-1",
        "text": "Unit tests are fast, cheap, and pinpoint exact failure locations; E2E tests are slow, expensive to maintain, and prone to environmental flakiness, but verify critical end-to-end integration journeys"
      },
      {
        "id": "opt-2",
        "text": "E2E tests cannot test databases"
      },
      {
        "id": "opt-3",
        "text": "Unit tests are required by cloud providers"
      },
      {
        "id": "opt-4",
        "text": "E2E tests only work with mobile apps"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Test Pyramid emphasizes testing pyramid proportions: thousands of rapid unit tests for algorithmic logic, hundreds of integration tests for service/database boundaries, and dozens of high-value E2E tests for core user journeys.",
    "referenceUrl": "https://martinfowler.com/articles/practical-test-pyramid.html"
  },
  {
    "id": "integ-q2-inter",
    "certificationId": "integration-e2e-testing",
    "topic": "Consumer-Driven Contract Testing (Pact)",
    "category": "testing",
    "difficulty": "Intermediate",
    "question": "How does Consumer-Driven Contract Testing (using Pact) verify microservice compatibility without deploying and coordinating all microservices in a shared test environment?",
    "options": [
      {
        "id": "opt-1",
        "text": "The API consumer generates a contract file (pact) detailing expected requests and responses; the API provider verifies this contract independently against its live endpoints in CI"
      },
      {
        "id": "opt-2",
        "text": "It runs all microservices on a single developer laptop"
      },
      {
        "id": "opt-3",
        "text": "It converts REST APIs into SOAP XML"
      },
      {
        "id": "opt-4",
        "text": "It scans Docker containers for CVE vulnerabilities"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Contract testing decouples microservice verification. Consumers capture their actual integration expectations into contract JSONs. Providers replay contracts against their own code in CI, guaranteeing API compatibility without fragile end-to-end integration environments.",
    "referenceUrl": "https://docs.pact.io/"
  },
  {
    "id": "integ-q3-adv",
    "certificationId": "integration-e2e-testing",
    "topic": "Testcontainers for Integration Testing",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "Why has Testcontainers become an industry standard for integration testing with databases and message queues?",
    "options": [
      {
        "id": "opt-1",
        "text": "It spins up real, ephemeral Docker containers (real PostgreSQL, Redis, Kafka) directly from test code, eliminating mocked database discrepancies and providing clean disposable instances per test run"
      },
      {
        "id": "opt-2",
        "text": "It compiles Java code into Docker containers"
      },
      {
        "id": "opt-3",
        "text": "It replaces Kubernetes in production"
      },
      {
        "id": "opt-4",
        "text": "It stores test results in S3 buckets"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In-memory emulators (H2 for Postgres, sqlite for MySQL) exhibit subtle dialect, indexing, and transaction differences that mask real bugs. Testcontainers launches real Docker container instances on-demand, running tests against genuine production database engines.",
    "referenceUrl": "https://testcontainers.com/"
  },
  {
    "id": "integ-q4-adv",
    "certificationId": "integration-e2e-testing",
    "topic": "Database State Management in Integration Tests",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "What is the fastest and most reliable strategy for managing database state across hundreds of concurrent integration tests?",
    "options": [
      {
        "id": "opt-1",
        "text": "Wrap each test in a database transaction that rolls back at the end of the test, preventing state modifications from leaking to subsequent tests"
      },
      {
        "id": "opt-2",
        "text": "Drop and re-create the database before every single test"
      },
      {
        "id": "opt-3",
        "text": "Run all tests sequentially on a single shared row"
      },
      {
        "id": "opt-4",
        "text": "Disable database transactions during testing"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Re-running migrations between tests takes seconds per test. Transaction rollback executes in milliseconds: each test begins a transaction, inserts test data, runs assertions, and rolls back, leaving the database pristine for the next test.",
    "referenceUrl": "https://martinfowler.com/articles/practical-test-pyramid.html#DatabaseIntegrationTests"
  },
  {
    "id": "integ-q5-adv",
    "certificationId": "integration-e2e-testing",
    "topic": "Visual Regression Testing & Perceptual Diffing",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How do visual regression testing tools (such as Percy or pixelmatch) prevent false positives caused by sub-pixel font rendering differences across operating systems?",
    "options": [
      {
        "id": "opt-1",
        "text": "By executing tests in consistent containerized browser environments (Docker), using perceptual anti-aliasing color difference algorithms, and configuring pixel diff tolerance thresholds"
      },
      {
        "id": "opt-2",
        "text": "By converting all fonts to Arial"
      },
      {
        "id": "opt-3",
        "text": "By testing only in black and white"
      },
      {
        "id": "opt-4",
        "text": "By taking screenshots of text content only"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Different OS font smoothing engines (DirectWrite on Windows vs FreeType on Linux) cause micro-pixel shifts. Visual testing tools run inside standardized Docker containers and use perceptual color distance thresholds (YIQ color space) to ignore anti-aliasing noise.",
    "referenceUrl": "https://github.com/mapbox/pixelmatch"
  },
  {
    "id": "integ-q6-adv",
    "certificationId": "integration-e2e-testing",
    "topic": "Test Data Management: Synthetic vs Production Dumps",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "Why should enterprise test environments use Synthetic Data Factories rather than sanitized production database backups for testing?",
    "options": [
      {
        "id": "opt-1",
        "text": "Synthetic factories generate precise, deterministic boundary test states on demand without privacy/GDPR PII compliance risks and without maintaining multi-terabyte database dumps"
      },
      {
        "id": "opt-2",
        "text": "Production databases cannot be copied"
      },
      {
        "id": "opt-3",
        "text": "Synthetic data takes up more storage space"
      },
      {
        "id": "opt-4",
        "text": "Synthetic data eliminates database indexes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Scrubbing production data frequently leaks overlooked PII (audit logs, freeform text fields). Furthermore, production dumps are massive and change constantly. Synthetic factories create clean, isolated, deterministic records tailored for specific test scenarios.",
    "referenceUrl": "https://martinfowler.com/bliki/SyntheticData.html"
  },
  {
    "id": "integ-q7-adv",
    "certificationId": "integration-e2e-testing",
    "topic": "Asynchronous Event-Driven Integration Testing",
    "category": "testing",
    "difficulty": "Advanced",
    "question": "How should integration tests assert outcomes in asynchronous event-driven architectures (Kafka / RabbitMQ) where eventual consistency applies?",
    "options": [
      {
        "id": "opt-1",
        "text": "Use polling assertions with timeouts (e.g. Awaitility) that repeatedly query the target read model or consumer output until the expected event commits or a timeout occurs"
      },
      {
        "id": "opt-2",
        "text": "Add a hardcoded `sleep(10000)` before making assertions"
      },
      {
        "id": "opt-3",
        "text": "Execute the message broker in synchronous mode"
      },
      {
        "id": "opt-4",
        "text": "Assert that the message was placed on the queue without verifying consumption"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Hardcoded sleeps make test suites slow and flaky. Polling libraries (like Awaitility) check conditions repeatedly every 50ms up to a maximum timeout, passing as soon as the event is consumed and failing quickly if an error occurs.",
    "referenceUrl": "https://github.com/awaitility/awaitility"
  },
  {
    "id": "integ-q8-exp",
    "certificationId": "integration-e2e-testing",
    "topic": "Chaos Engineering in Integration Testing",
    "category": "testing",
    "difficulty": "Expert",
    "question": "In microservice integration testing, what is the objective of Chaos Engineering experiments (using Chaos Mesh or Toxiproxy)?",
    "options": [
      {
        "id": "opt-1",
        "text": "To inject real network latency, packet loss, DNS outages, and process terminations into test environments to verify that circuit breakers, retries, and fallback mechanisms work under real failures"
      },
      {
        "id": "opt-2",
        "text": "To delete production databases randomly"
      },
      {
        "id": "opt-3",
        "text": "To test whether developers can fix bugs under pressure"
      },
      {
        "id": "opt-4",
        "text": "To stress-test CPU fans"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Systems often fail gracefully in theory, but crash in production during cascading timeouts. Tools like Toxiproxy inject simulated network failures and high latency into integration tests to verify resilience before production releases.",
    "referenceUrl": "https://principlesofchaos.org/"
  },
  {
    "id": "integ-q9-exp",
    "certificationId": "integration-e2e-testing",
    "topic": "Zero-Downtime Migration E2E Verification",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How do advanced integration test suites verify that a zero-downtime rolling deployment can occur without breaking active user sessions?",
    "options": [
      {
        "id": "opt-1",
        "text": "By running continuous automated user journey traffic against a staging cluster while simultaneously executing rolling updates and database schema migrations"
      },
      {
        "id": "opt-2",
        "text": "By testing only in off-peak hours"
      },
      {
        "id": "opt-3",
        "text": "By taking down the cluster for maintenance"
      },
      {
        "id": "opt-4",
        "text": "By deploying the update to a local machine"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Testing a migration in isolation does not prove zero-downtime safety. Synthetic load runners simulate continuous user traffic while rolling deployments and database migrations run concurrently, asserting that zero 5xx errors or dropped connections occur.",
    "referenceUrl": "https://martinfowler.com/bliki/ZeroDowntimeDeployment.html"
  },
  {
    "id": "integ-q10-exp",
    "certificationId": "integration-e2e-testing",
    "topic": "Distributed Tracing in Integration Test Assertions",
    "category": "testing",
    "difficulty": "Expert",
    "question": "How does Trace-Based Testing (TraceTest / OpenTelemetry assertions) enhance end-to-end test verification across distributed microservices?",
    "options": [
      {
        "id": "opt-1",
        "text": "It analyzes the distributed OpenTelemetry trace spans generated by an E2E request, asserting on internal service interactions, database query counts, and cache hits without mocking"
      },
      {
        "id": "opt-2",
        "text": "It records video files of network routers"
      },
      {
        "id": "opt-3",
        "text": "It captures client browser keystrokes"
      },
      {
        "id": "opt-4",
        "text": "It converts HTTP requests into SQL statements"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Trace-based testing uses distributed tracing telemetry as assertions. A test executes an API call, and verifies not only the 200 HTTP response, but asserts that service A called service B, exactly 2 database queries executed, and cache hit occurred.",
    "referenceUrl": "https://tracetest.io/"
  }
];
