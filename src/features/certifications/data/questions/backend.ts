import { Question } from '../../types';

export const BACKEND_QUESTIONS: Question[] = [
  {
    "id": "node-q1-intermediate",
    "certificationId": "node-js",
    "topic": "Event Loop Phases",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "In the Node.js event loop, what is the key difference between setImmediate() and setTimeout(fn, 0)?",
    "options": [
      {
        "id": "opt-1",
        "text": "setImmediate runs in the timers phase; setTimeout runs in the poll phase"
      },
      {
        "id": "opt-2",
        "text": "setImmediate is designed to execute in the check phase immediately after I/O events; setTimeout(fn, 0) runs in the timers phase subject to OS timer granularity"
      },
      {
        "id": "opt-3",
        "text": "setImmediate runs synchronously before any promise microtasks"
      },
      {
        "id": "opt-4",
        "text": "setTimeout(fn, 0) is deprecated in modern Node.js"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "setImmediate executes callbacks in the check phase of the event loop immediately following the poll (I/O) phase. setTimeout(fn, 0) runs in the timers phase once the minimum threshold (typically ~1ms) has elapsed.",
    "referenceUrl": "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick"
  },
  {
    "id": "node-q2-intermediate",
    "certificationId": "node-js",
    "topic": "Process Microtasks",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "Where does process.nextTick() execute relative to standard Promise microtasks in Node.js?",
    "options": [
      {
        "id": "opt-1",
        "text": "process.nextTick callbacks drain before Promise microtasks in their own higher-priority queue"
      },
      {
        "id": "opt-2",
        "text": "process.nextTick callbacks run after Promise microtasks"
      },
      {
        "id": "opt-3",
        "text": "process.nextTick runs in the next macrotask cycle"
      },
      {
        "id": "opt-4",
        "text": "process.nextTick is identical to setImmediate"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Node.js, the nextTickQueue takes precedence over the microtask queue (Promise callbacks). All nextTick callbacks are processed immediately after the current operation finishes and before any other microtasks.",
    "referenceUrl": "https://nodejs.org/en/learn/asynchronous-work/understanding-processnexttick"
  },
  {
    "id": "node-q3-advanced",
    "certificationId": "node-js",
    "topic": "Streams & Backpressure",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "When writing to a Writable stream, what does a return value of false from stream.write(chunk) indicate, and how should it be handled?",
    "options": [
      {
        "id": "opt-1",
        "text": "It indicates a fatal write error; the stream must be destroyed immediately"
      },
      {
        "id": "opt-2",
        "text": "It indicates the internal buffer exceeds highWaterMark; the producer should pause writing until the \"drain\" event is emitted"
      },
      {
        "id": "opt-3",
        "text": "It indicates the chunk was written asynchronously without buffering"
      },
      {
        "id": "opt-4",
        "text": "It indicates the stream was closed by the destination"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Returning false signals backpressure: the internal buffer has reached highWaterMark. The producer must pause writing to avoid unbounded memory growth until the stream emits \"drain\", indicating the buffer has cleared.",
    "referenceUrl": "https://nodejs.org/en/learn/manipulating-files/backpressuring-in-streams"
  },
  {
    "id": "node-q4-advanced",
    "certificationId": "node-js",
    "topic": "Worker Threads vs Child Processes",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What is the primary architectural advantage of Node.js worker_threads over child_process for CPU-intensive tasks?",
    "options": [
      {
        "id": "opt-1",
        "text": "Worker threads can share memory using SharedArrayBuffer without serialization overhead, whereas child processes communicate via serialized IPC"
      },
      {
        "id": "opt-2",
        "text": "Worker threads bypass the V8 garbage collector"
      },
      {
        "id": "opt-3",
        "text": "Child processes cannot execute JavaScript code"
      },
      {
        "id": "opt-4",
        "text": "Worker threads run on the client browser"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Worker threads run inside the same process and can share raw memory buffers using SharedArrayBuffer and Atomics. Child processes spawn entirely separate OS processes requiring inter-process serialization (IPC/pipes).",
    "referenceUrl": "https://nodejs.org/api/worker_threads.html"
  },
  {
    "id": "node-q5-advanced",
    "certificationId": "node-js",
    "topic": "Buffer Security",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Why was Buffer.allocUnsafe() introduced, and what security risk does it pose if not immediately overwritten?",
    "options": [
      {
        "id": "opt-1",
        "text": "It allocates uninitialized memory containing sensitive residual data previously held in RAM by other processes or operations"
      },
      {
        "id": "opt-2",
        "text": "It disables TLS encryption on network sockets"
      },
      {
        "id": "opt-3",
        "text": "It executes shell commands without escaping"
      },
      {
        "id": "opt-4",
        "text": "It causes stack overflow errors"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Buffer.allocUnsafe(size) is fast because it does not zero-fill the allocated memory segment. However, the memory might retain leftover sensitive data (passwords, tokens, keys); it must be overwritten before exposing it.",
    "referenceUrl": "https://nodejs.org/api/buffer.html#bufferallocunsafesize"
  },
  {
    "id": "node-q6-advanced",
    "certificationId": "node-js",
    "topic": "Clustering & Port Sharing",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "In the Node.js cluster module, how do multiple worker processes listen on the same TCP port without triggering an EADDRINUSE error?",
    "options": [
      {
        "id": "opt-1",
        "text": "The master process creates the listening socket and distributes incoming connections to workers using round-robin scheduling"
      },
      {
        "id": "opt-2",
        "text": "Each worker binds to a different port and an external reverse proxy is required"
      },
      {
        "id": "opt-3",
        "text": "The OS kernel balances requests using multicast DNS"
      },
      {
        "id": "opt-4",
        "text": "Node.js disables TCP port checking in clustered mode"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Node.js clustering, the primary (master) process binds to the port and accepts connections. It hands off socket handles to worker processes using a round-robin algorithm, avoiding port conflicts.",
    "referenceUrl": "https://nodejs.org/api/cluster.html#how-it-works"
  },
  {
    "id": "node-q7-advanced",
    "certificationId": "node-js",
    "topic": "Memory Leak Debugging",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Which of the following patterns in a long-running Node.js process is a common source of memory leaks?",
    "options": [
      {
        "id": "opt-1",
        "text": "Attaching event listeners to a singleton EventEmitter without removing them when requests complete"
      },
      {
        "id": "opt-2",
        "text": "Using const instead of let for local variables"
      },
      {
        "id": "opt-3",
        "text": "Using JSON.stringify() on large objects"
      },
      {
        "id": "opt-4",
        "text": "Returning early from functions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Adding listeners to a persistent or global object creates references to the listener functions and any variables in their closures. Over time, these references accumulate and prevent garbage collection.",
    "referenceUrl": "https://nodejs.org/en/learn/diagnostics/memory/understanding-and-avoiding-memory-leaks"
  },
  {
    "id": "node-q8-expert",
    "certificationId": "node-js",
    "topic": "Libuv Thread Pool & UV_THREADPOOL_SIZE",
    "category": "backend",
    "difficulty": "Expert",
    "question": "Which operations in Node.js are delegated to the internal Libuv thread pool (configured via UV_THREADPOOL_SIZE) rather than the non-blocking OS event demultiplexer (epoll/kqueue)?",
    "options": [
      {
        "id": "opt-1",
        "text": "TCP and UDP network socket I/O"
      },
      {
        "id": "opt-2",
        "text": "File system I/O (fs), crypto.pbkdf2/scrypt, zlib compression, and DNS lookups (dns.lookup)"
      },
      {
        "id": "opt-3",
        "text": "setTimeout and setInterval timers"
      },
      {
        "id": "opt-4",
        "text": "Promise microtasks and queueMicrotask"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Most network I/O uses non-blocking OS primitives (epoll/kqueue). However, synchronous file system calls, CPU-heavy crypto functions, zlib, and getaddrinfo (dns.lookup) are offloaded to Libuv’s worker thread pool (default size: 4).",
    "referenceUrl": "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop"
  },
  {
    "id": "node-q9-expert",
    "certificationId": "node-js",
    "topic": "AsyncLocalStorage Context Propagation",
    "category": "backend",
    "difficulty": "Expert",
    "question": "What makes AsyncLocalStorage valuable for tracing distributed request IDs across asynchronous call chains in Node.js?",
    "options": [
      {
        "id": "opt-1",
        "text": "It propagates contextual state through asynchronous boundaries (promises, timers, callbacks) without passing the context as an explicit parameter through every function"
      },
      {
        "id": "opt-2",
        "text": "It stores data in the browser LocalStorage API"
      },
      {
        "id": "opt-3",
        "text": "It synchronizes state across multiple physical server machines"
      },
      {
        "id": "opt-4",
        "text": "It replaces relational databases for session storage"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "AsyncLocalStorage uses async_hooks to track asynchronous execution lifecycles, enabling access to request-scoped metadata (such as correlation IDs or user sessions) anywhere in the async execution chain without manual prop drilling.",
    "referenceUrl": "https://nodejs.org/api/async_context.html#class-asynclocalstorage"
  },
  {
    "id": "node-q10-expert",
    "certificationId": "node-js",
    "topic": "Graceful Shutdown Sequencing",
    "category": "backend",
    "difficulty": "Expert",
    "question": "When receiving SIGTERM in a production Node.js microservice, what is the correct sequence for a graceful shutdown?",
    "options": [
      {
        "id": "opt-1",
        "text": "Call process.exit(0) immediately to free resources"
      },
      {
        "id": "opt-2",
        "text": "Stop accepting new incoming connections (server.close), wait for ongoing in-flight requests to finish, close database connections, and exit within a safety timeout"
      },
      {
        "id": "opt-3",
        "text": "Close database connections first, then let in-flight HTTP requests fail with 500 errors"
      },
      {
        "id": "opt-4",
        "text": "Emit an unhandledException event"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "A graceful shutdown stops accepting new requests (server.close), drains existing in-flight connections to completion, releases database connections, and enforces a fallback timeout (e.g. 10-30s) to call process.exit() if cleanup hangs.",
    "referenceUrl": "https://nodejs.org/api/http.html#serverclosecallback"
  },
  {
    "id": "exp-q1-inter",
    "certificationId": "express-js",
    "topic": "Middleware Pipeline Execution Order",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "In Express.js, what happens if a synchronous middleware function forgets to call `next()` and does not send a response?",
    "options": [
      {
        "id": "opt-1",
        "text": "The client HTTP request hangs indefinitely until the client socket timeout or server timeout elapses"
      },
      {
        "id": "opt-2",
        "text": "Express automatically calls next() after 5000 milliseconds"
      },
      {
        "id": "opt-3",
        "text": "Express throws an unhandled middleware exception"
      },
      {
        "id": "opt-4",
        "text": "The route handler following it executes immediately"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Express middleware is a sequential chain. If a middleware neither sends a response (res.send, res.json) nor invokes next(), the pipeline halts. The connection remains open until a socket or gateway timeout triggers.",
    "referenceUrl": "https://expressjs.com/en/guide/using-middleware.html"
  },
  {
    "id": "exp-q2-inter",
    "certificationId": "express-js",
    "topic": "Error Handling Middleware Signature",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "How does Express identify a middleware function as an error-handling middleware?",
    "options": [
      {
        "id": "opt-1",
        "text": "By inspecting Function.length to verify it accepts exactly 4 arguments: (err, req, res, next)"
      },
      {
        "id": "opt-2",
        "text": "By passing { isError: true } in the app.use() options"
      },
      {
        "id": "opt-3",
        "text": "By naming the function \"errorHandler\""
      },
      {
        "id": "opt-4",
        "text": "By attaching an @error decorator to the handler"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Express examines fn.length. Standard middleware has 2 or 3 arguments (req, res, next). An error-handling middleware MUST declare 4 arguments: (err, req, res, next). If you declare only 3 arguments, Express treats it as regular middleware.",
    "referenceUrl": "https://expressjs.com/en/guide/error-handling.html"
  },
  {
    "id": "exp-q3-adv",
    "certificationId": "express-js",
    "topic": "Async Error Handling in Express 4 vs 5",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Why did unhandled rejected promises inside async route handlers crash Express 4 servers, and how is this handled in Express 5?",
    "options": [
      {
        "id": "opt-1",
        "text": "Express 4 does not catch rejected promises returned by async handlers (requiring next(err) or express-async-errors); Express 5 natively catches rejected promises and routes them to error middleware"
      },
      {
        "id": "opt-2",
        "text": "Express 4 prohibited using async/await syntax in JavaScript"
      },
      {
        "id": "opt-3",
        "text": "Express 5 converts all async functions into synchronous worker threads"
      },
      {
        "id": "opt-4",
        "text": "Express 4 rejected promises were automatically retried 3 times"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Express 4 was designed before async/await. Unhandled promise rejections in route handlers resulted in unhandledRejection events and hung requests. Express 5 natively intercepts rejected promises from middleware returning promises and forwards them to next(err).",
    "referenceUrl": "https://expressjs.com/en/5x/api.html"
  },
  {
    "id": "exp-q4-adv",
    "certificationId": "express-js",
    "topic": "Routing - next(\"router\") and next(\"route\")",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What is the specific effect of invoking `next(\"route\")` inside a middleware attached to an Express route handler?",
    "options": [
      {
        "id": "opt-1",
        "text": "It skips the remaining middleware callbacks in the current route stack and passes control to the next route match"
      },
      {
        "id": "opt-2",
        "text": "It reboots the Express application instance"
      },
      {
        "id": "opt-3",
        "text": "It redirects the HTTP client to the home route \"/\""
      },
      {
        "id": "opt-4",
        "text": "It throws an unhandled routing error"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Calling next(\"route\") bypasses any remaining middleware in the current route definition and immediately checks subsequent route declarations matching the request path and method.",
    "referenceUrl": "https://expressjs.com/en/guide/routing.html"
  },
  {
    "id": "exp-q5-adv",
    "certificationId": "express-js",
    "topic": "Streaming & Backpressure",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Why should large file downloads in Express use `stream.pipeline()` rather than `stream.pipe(res)`?",
    "options": [
      {
        "id": "opt-1",
        "text": "pipeline() properly handles stream errors and cleans up underlying file descriptors if the client prematurely disconnects, preventing memory and socket leaks"
      },
      {
        "id": "opt-2",
        "text": "pipe() cannot transfer binary data over HTTP"
      },
      {
        "id": "opt-3",
        "text": "pipeline() automatically compresses the response using gzip"
      },
      {
        "id": "opt-4",
        "text": "pipe() limits transfer rate to 1 MB/s"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Using stream.pipe() directly does not close or destroy source streams when destination streams emit errors or client sockets close early. stream.pipeline() (from node:stream) guarantees all streams in the pipeline are safely destroyed upon error or premature client termination.",
    "referenceUrl": "https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-callback"
  },
  {
    "id": "exp-q6-adv",
    "certificationId": "express-js",
    "topic": "Security Middleware - Helmet",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What primary security headers does the Helmet middleware bundle configure on an Express server by default?",
    "options": [
      {
        "id": "opt-1",
        "text": "Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options: nosniff, and removes X-Powered-By"
      },
      {
        "id": "opt-2",
        "text": "Access-Control-Allow-Origin: * on all endpoints"
      },
      {
        "id": "opt-3",
        "text": "Authorization: Bearer headers on incoming requests"
      },
      {
        "id": "opt-4",
        "text": "TLS certificates on the TCP socket"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Helmet sets well-known HTTP response headers that protect Express applications against common web vulnerabilities, including MIME-type sniffing (nosniff), clickjacking (X-Frame-Options), downgrade attacks (HSTS), and hides server technology fingerprint (X-Powered-By: Express).",
    "referenceUrl": "https://helmetjs.github.io/"
  },
  {
    "id": "exp-q7-adv",
    "certificationId": "express-js",
    "topic": "CORS Configuration & Preflight",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "In Express CORS middleware, which HTTP request characteristics cause the browser to dispatch an OPTIONS preflight request before the actual request?",
    "options": [
      {
        "id": "opt-1",
        "text": "Non-simple HTTP methods (PUT, DELETE, PATCH) or custom request headers (such as Authorization or Content-Type: application/json)"
      },
      {
        "id": "opt-2",
        "text": "Any GET request with URL query parameters"
      },
      {
        "id": "opt-3",
        "text": "Requests sent over HTTPS connections"
      },
      {
        "id": "opt-4",
        "text": "Requests initiated from the same origin hostname"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "CORS preflight (OPTIONS) is required whenever a cross-origin request is not a \"simple request\". Simple requests are limited to GET/HEAD/POST with simple headers and Content-Type of application/x-www-form-urlencoded, multipart/form-data, or text/plain. Any custom header (like Authorization or JSON) triggers preflight.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
  },
  {
    "id": "exp-q8-exp",
    "certificationId": "express-js",
    "topic": "Event Loop Lag & Cluster Architecture",
    "category": "backend",
    "difficulty": "Expert",
    "question": "When deploying a multi-process Express cluster using Node.js `cluster` or PM2 in cluster mode, how are incoming TCP connections distributed among worker processes?",
    "options": [
      {
        "id": "opt-1",
        "text": "On Linux/macOS, the primary process opens the listening socket and uses round-robin (SO_REUSEPORT / IPC handle passing) to distribute client sockets across worker processes"
      },
      {
        "id": "opt-2",
        "text": "Each worker binds to a different port and an external DNS server balances requests"
      },
      {
        "id": "opt-3",
        "text": "The operating system kernel assigns all connections to worker 1 until memory reaches 100%"
      },
      {
        "id": "opt-4",
        "text": "Workers communicate via WebSocket channels to synchronize request execution"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Node.js cluster module defaults to round-robin on Unix systems: the master process creates the listening server and passes incoming connection handles via IPC to workers. Workers handle the socket reads, HTTP parsing, and response serialization in parallel across CPU cores.",
    "referenceUrl": "https://nodejs.org/api/cluster.html#how-it-works"
  },
  {
    "id": "exp-q9-exp",
    "certificationId": "express-js",
    "topic": "Prototype Pollution Defense in Request Parsers",
    "category": "backend",
    "difficulty": "Expert",
    "question": "How can an Express application protect itself from prototype pollution attacks through query string and request body parsing (e.g. `express.urlencoded({ extended: true })`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "By setting extended: false (using querystring instead of qs) or configuring qs to reject __proto__ and constructor properties"
      },
      {
        "id": "opt-2",
        "text": "By converting all incoming request bodies to uppercase strings"
      },
      {
        "id": "opt-3",
        "text": "By disabling Express router middleware"
      },
      {
        "id": "opt-4",
        "text": "By running the application behind an Nginx reverse proxy exclusively"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When extended: true is set, express.urlencoded uses the `qs` library, which allows nested object notation. If malicious payloads include `__proto__` or `constructor.prototype`, properties can pollute Object.prototype. Using `extended: false` or modern sanitization guards against prototype pollution.",
    "referenceUrl": "https://owasp.org/www-community/attacks/Prototype_Pollution"
  },
  {
    "id": "exp-q10-exp",
    "certificationId": "express-js",
    "topic": "Memory Profiling & Unhandled Rejections in Express",
    "category": "backend",
    "difficulty": "Expert",
    "question": "In production Node.js/Express, what is the recommended practice when process.on(\"uncaughtException\") or an unrecoverable error occurs in a worker?",
    "options": [
      {
        "id": "opt-1",
        "text": "Log the stack trace, stop accepting new connections, wait for pending requests to finish with a short timeout, and call process.exit(1) to let the process manager restart a clean process"
      },
      {
        "id": "opt-2",
        "text": "Swallow the error and continue serving requests to maximize service availability"
      },
      {
        "id": "opt-3",
        "text": "Clear the require.cache and reload route files dynamically"
      },
      {
        "id": "opt-4",
        "text": "Reset all global variables to undefined"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "After an uncaughtException, the application is in an indeterminate state; memory structures, locks, and file descriptors may be corrupt. Continuing to run risks data corruption. The process should gracefully drain connections and exit, allowing systemd or PM2 to restart a fresh process.",
    "referenceUrl": "https://nodejs.org/api/process.html#warning-using-uncaughtexception-correctly"
  },
  {
    "id": "rest-q1-inter",
    "certificationId": "rest-apis",
    "topic": "HTTP Method Idempotency",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "Which of the following HTTP methods is defined by RFC 9110 as Idempotent but NOT Safe?",
    "options": [
      {
        "id": "opt-1",
        "text": "PUT and DELETE"
      },
      {
        "id": "opt-2",
        "text": "GET and HEAD"
      },
      {
        "id": "opt-3",
        "text": "POST and PATCH"
      },
      {
        "id": "opt-4",
        "text": "OPTIONS and TRACE"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Safe methods (GET, HEAD) do not modify server state. Idempotent methods (PUT, DELETE) modify state, but making multiple identical requests has the same intended effect as a single request. POST and PATCH are neither safe nor inherently idempotent.",
    "referenceUrl": "https://www.rfc-editor.org/rfc/rfc9110#section-9.2"
  },
  {
    "id": "rest-q2-inter",
    "certificationId": "rest-apis",
    "topic": "HTTP Status Codes - 401 vs 403",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "What is the precise semantic distinction between HTTP status code 401 Unauthorized and 403 Forbidden in REST APIs?",
    "options": [
      {
        "id": "opt-1",
        "text": "401 means the client lacks valid authentication credentials (unauthenticated); 403 means the identity is known but lacks permission to access the resource (unauthorized/forbidden)"
      },
      {
        "id": "opt-2",
        "text": "401 is used for rate limiting; 403 is used for missing files"
      },
      {
        "id": "opt-3",
        "text": "401 indicates server failure; 403 indicates client network failure"
      },
      {
        "id": "opt-4",
        "text": "They are identical and interchangeable in modern OpenAPI specifications"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "401 Unauthorized indicates that authentication is required and has failed or has not yet been provided (often accompanied by WWW-Authenticate header). 403 Forbidden indicates the server understood the credentials, but the client does not have rights for the requested action.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401"
  },
  {
    "id": "rest-q3-adv",
    "certificationId": "rest-apis",
    "topic": "Concurrency Control with ETag and If-Match",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How do RESTful APIs implement optimistic concurrency control to prevent the \"Lost Update\" problem during resource updates?",
    "options": [
      {
        "id": "opt-1",
        "text": "The server provides an ETag header on GET; clients send that value in `If-Match: \"<etag>\"` on PUT/PATCH; the server rejects with 412 Precondition Failed if the resource was modified concurrently"
      },
      {
        "id": "opt-2",
        "text": "The client locks the database table using a POST /lock endpoint"
      },
      {
        "id": "opt-3",
        "text": "The server only allows one client to connect at any given time"
      },
      {
        "id": "opt-4",
        "text": "The client sends an MD5 hash of its IP address in the Authorization header"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Optimistic concurrency control uses conditional HTTP requests. When client A fetches a resource with ETag: \"v1\" and updates it, client B attempting to update with If-Match: \"v1\" after A has committed receives 412 Precondition Failed, preventing accidental overwrite of A's changes.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match"
  },
  {
    "id": "rest-q4-adv",
    "certificationId": "rest-apis",
    "topic": "Pagination Strategies: Cursor vs Offset",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Why is Cursor-based pagination (`?cursor=xyz&limit=20`) preferred over Offset-based pagination (`?offset=10000&limit=20`) on high-volume datasets?",
    "options": [
      {
        "id": "opt-1",
        "text": "Cursor pagination avoids O(N) database offset skipping (using indexed WHERE id > cursor) and prevents duplicate or skipped records when rows are inserted concurrently"
      },
      {
        "id": "opt-2",
        "text": "Offset pagination requires all data to be loaded into browser memory first"
      },
      {
        "id": "opt-3",
        "text": "Cursor pagination converts database rows into JSON-LD format automatically"
      },
      {
        "id": "opt-4",
        "text": "Cursor pagination allows users to jump to arbitrary page numbers instantly"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Offset pagination requires the database to scan and discard N rows (OFFSET 100000 scans 100020 rows), which degrades query latency linearly. It also causes shifting anomalies when rows are added during browsing. Cursors leverage B-Tree index seek (WHERE id > cursor LIMIT 20), achieving constant O(1) seek time.",
    "referenceUrl": "https://slack.engineering/evolving-api-pagination-at-slack/"
  },
  {
    "id": "rest-q5-adv",
    "certificationId": "rest-apis",
    "topic": "Idempotency Keys in POST Operations",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How do enterprise payment APIs (such as Stripe) ensure that retrying a network-failed POST /payments request does not double-charge the customer?",
    "options": [
      {
        "id": "opt-1",
        "text": "Clients send a unique `Idempotency-Key` header; the server records the key and caches the initial response; subsequent retries with the same key replay the cached response without re-executing payment"
      },
      {
        "id": "opt-2",
        "text": "The server only accepts one payment request per customer per calendar day"
      },
      {
        "id": "opt-3",
        "text": "The server changes all POST requests into GET requests"
      },
      {
        "id": "opt-4",
        "text": "Clients use UDP transport protocol instead of TCP"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "An Idempotency-Key header allows clients to safely retry POST requests when network timeouts occur. The server tracks the key in an atomic datastore (e.g. Redis). If a duplicate request arrives, the server returns the cached response rather than processing the transaction a second time.",
    "referenceUrl": "https://stripe.com/docs/api/idempotent_requests"
  },
  {
    "id": "rest-q6-adv",
    "certificationId": "rest-apis",
    "topic": "HATEOAS and Hypermedia Controls",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What is the core principle of HATEOAS (Hypermedia As The Engine Of Application State) in Fielding's REST architectural style (Richardson Maturity Model Level 3)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Responses contain hypermedia links (_links) defining valid next actions and transitions available to the client based on current resource state"
      },
      {
        "id": "opt-2",
        "text": "All API routes must end with .html extensions"
      },
      {
        "id": "opt-3",
        "text": "Clients must download OpenAPI YAML schemas on every HTTP request"
      },
      {
        "id": "opt-4",
        "text": "APIs must support GraphQL queries alongside REST endpoints"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "HATEOAS dictates that a REST client discovers all viable operations dynamically from links included in representation payloads (such as HAL or JSON:API links), decoupling client code from hardcoded endpoint URL structures.",
    "referenceUrl": "https://martinfowler.com/articles/richardsonMaturityModel.html"
  },
  {
    "id": "rest-q7-adv",
    "certificationId": "rest-apis",
    "topic": "Rate Limiting Headers (IETF Draft)",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "When an API rejects a request with HTTP 429 Too Many Requests, which standard HTTP header informs the client how many seconds to wait before retrying?",
    "options": [
      {
        "id": "opt-1",
        "text": "Retry-After"
      },
      {
        "id": "opt-2",
        "text": "X-RateLimit-Delay"
      },
      {
        "id": "opt-3",
        "text": "Wait-Time"
      },
      {
        "id": "opt-4",
        "text": "Backoff-Interval"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "RFC 9110 specifies `Retry-After: <seconds>` (or HTTP-date) to inform user agents when the next request may be made. Modern APIs also emit RateLimit-Limit, RateLimit-Remaining, and RateLimit-Reset headers.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After"
  },
  {
    "id": "rest-q8-exp",
    "certificationId": "rest-apis",
    "topic": "Partial Updates: PATCH vs JSON Patch (RFC 6902)",
    "category": "backend",
    "difficulty": "Expert",
    "question": "What advantage does JSON Patch (RFC 6902, application/json-patch+json) have over JSON Merge Patch (RFC 7396) when updating arrays and performing atomic operations?",
    "options": [
      {
        "id": "opt-1",
        "text": "JSON Patch defines explicit atomic operation verbs (add, remove, replace, move, copy, test), enabling specific array index insertions and conditional test assertions"
      },
      {
        "id": "opt-2",
        "text": "JSON Merge Patch is faster because it uses XML encoding"
      },
      {
        "id": "opt-3",
        "text": "JSON Patch cannot modify string values"
      },
      {
        "id": "opt-4",
        "text": "JSON Merge Patch requires WebSockets"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "JSON Merge Patch cannot easily remove array items or insert elements at specific indices without replacing the entire array, nor can it set properties explicitly to null if null indicates deletion. RFC 6902 provides an explicit list of operations with path pointers and atomic test validations.",
    "referenceUrl": "https://datatracker.ietf.org/doc/html/rfc6902"
  },
  {
    "id": "rest-q9-exp",
    "certificationId": "rest-apis",
    "topic": "Content Negotiation & Custom Media Types",
    "category": "backend",
    "difficulty": "Expert",
    "question": "In API versioning via Content Negotiation, how does the client specify which representation schema version it accepts?",
    "options": [
      {
        "id": "opt-1",
        "text": "By supplying an Accept header with a vendor media type parameter, e.g. `Accept: application/vnd.company.v2+json`"
      },
      {
        "id": "opt-2",
        "text": "By adding ?v=2 to the cookie domain"
      },
      {
        "id": "opt-3",
        "text": "By sending a POST request to /versions"
      },
      {
        "id": "opt-4",
        "text": "By appending #v2 to the URL fragment"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "REST purists favor content negotiation for versioning: URIs remain clean and represent resources conceptually, while the representation format/schema version is specified via `Accept: application/vnd.myapi.v2+json`. If unsupported, the server responds with 406 Not Acceptable.",
    "referenceUrl": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation"
  },
  {
    "id": "rest-q10-exp",
    "certificationId": "rest-apis",
    "topic": "Distributed Tracing & W3C Trace Context",
    "category": "backend",
    "difficulty": "Expert",
    "question": "How do microservices coordinate distributed request tracing across heterogeneous REST API boundaries according to W3C Trace Context specifications?",
    "options": [
      {
        "id": "opt-1",
        "text": "By propagating the `traceparent` HTTP header containing version, 16-byte trace-id, 8-byte parent-id (span-id), and trace-flags"
      },
      {
        "id": "opt-2",
        "text": "By sharing an in-memory Redis pointer across physical machines"
      },
      {
        "id": "opt-3",
        "text": "By appending timestamp integers to the User-Agent header"
      },
      {
        "id": "opt-4",
        "text": "By embedding span IDs in the HTTP reason phrase"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "W3C Trace Context defines the `traceparent` header (e.g. `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`). This standardized header is forwarded across service calls, enabling OpenTelemetry distributed tracing systems to stitch spans into a unified trace.",
    "referenceUrl": "https://www.w3.org/TR/trace-context/"
  },
  {
    "id": "auth-q1-inter",
    "certificationId": "auth-security",
    "topic": "OAuth 2.1 & PKCE for Single Page Apps",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "Why does OAuth 2.1 mandate Proof Key for Code Exchange (PKCE) for Single Page Applications (SPAs) and deprecate the Implicit Grant flow?",
    "options": [
      {
        "id": "opt-1",
        "text": "PKCE prevents authorization code interception attacks without requiring a client secret, whereas Implicit grant exposed access tokens in URL hash fragments and browser history"
      },
      {
        "id": "opt-2",
        "text": "Implicit grant required smartcard hardware tokens"
      },
      {
        "id": "opt-3",
        "text": "PKCE encrypts all database passwords on the server"
      },
      {
        "id": "opt-4",
        "text": "OAuth 2.1 only works with mobile native apps"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In public clients (SPAs, mobile apps), client secrets cannot be securely kept. PKCE generates a cryptographically random code_verifier and code_challenge per flow, ensuring only the client that initiated the authorization request can exchange the code for tokens.",
    "referenceUrl": "https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10"
  },
  {
    "id": "auth-q2-inter",
    "certificationId": "auth-security",
    "topic": "JWT Structure & Decoding",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "What are the three dot-separated components of a standard JSON Web Token (JWT)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Base64URL-encoded Header, Base64URL-encoded Payload, and Cryptographic Signature"
      },
      {
        "id": "opt-2",
        "text": "Username, Hashed Password, and Expiration Timestamp"
      },
      {
        "id": "opt-3",
        "text": "Public Key, Private Key, and Certificate Authority Chain"
      },
      {
        "id": "opt-4",
        "text": "IV Vector, Ciphertext, and HMAC Digest"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A JWT is structured as header.payload.signature. The header contains metadata (alg, typ), the payload contains claims (sub, exp, iss), and the signature verifies authenticity and integrity.",
    "referenceUrl": "https://datatracker.ietf.org/doc/html/rfc7519"
  },
  {
    "id": "auth-q3-adv",
    "certificationId": "auth-security",
    "topic": "JWT \"alg: none\" and Algorithm Confusion Attacks",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How does an HMAC-RSA key confusion vulnerability compromise JWT verification on poorly implemented backend services?",
    "options": [
      {
        "id": "opt-1",
        "text": "The attacker changes the token header alg from RS256 to HS256 and signs the token using the server's publicly accessible RSA public key as the HMAC symmetric shared secret"
      },
      {
        "id": "opt-2",
        "text": "The attacker brute-forces an RSA 4096-bit private key in under 5 minutes"
      },
      {
        "id": "opt-3",
        "text": "The server forgets to parse the token header"
      },
      {
        "id": "opt-4",
        "text": "The token payload is converted into XML format"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If a backend verifies JWTs using jwt.verify(token, key) without strictly restricting the allowed algorithms, an attacker can switch alg to HS256. The server treats its RSA public key string (which is known to the attacker) as an HMAC secret, allowing arbitrary forged tokens to pass verification.",
    "referenceUrl": "https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/"
  },
  {
    "id": "auth-q4-adv",
    "certificationId": "auth-security",
    "topic": "Refresh Token Rotation & Reuse Detection",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How does Refresh Token Rotation with automatic reuse detection protect against stolen refresh tokens in modern authentication systems?",
    "options": [
      {
        "id": "opt-1",
        "text": "Every token exchange issues a new refresh token and invalidates the previous one; if an already-used refresh token is presented, the auth server immediately revokes all tokens in that refresh family"
      },
      {
        "id": "opt-2",
        "text": "It forces the user to solve a CAPTCHA every 15 minutes"
      },
      {
        "id": "opt-3",
        "text": "It prevents tokens from expiring indefinitely"
      },
      {
        "id": "opt-4",
        "text": "It stores refresh tokens in unencrypted cookies"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Under Refresh Token Rotation, each refresh token is single-use. If a token is compromised and used by an attacker, the legitimate user's subsequent attempt to use the already-consumed token alerts the auth server of reuse, triggering immediate revocation of the entire token family.",
    "referenceUrl": "https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation"
  },
  {
    "id": "auth-q5-adv",
    "certificationId": "auth-security",
    "topic": "Session Fixation Attack & Defense",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What is a Session Fixation attack, and what is the primary defensive countermeasure when a user logs in?",
    "options": [
      {
        "id": "opt-1",
        "text": "The attacker tricks a victim into authenticating with a pre-established session ID; the defense is to regenerate a completely new session ID immediately upon successful login"
      },
      {
        "id": "opt-2",
        "text": "The attacker fixes the user IP address to a proxy; defense is blocking all proxies"
      },
      {
        "id": "opt-3",
        "text": "The attacker steals passwords from localStorage; defense is removing JavaScript"
      },
      {
        "id": "opt-4",
        "text": "The attacker floods the server with fake logins; defense is rate limiting"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In session fixation, the attacker gives the victim a known session ID (e.g. via URL parameter or cookie injection). When the victim logs in, if the application retains the same session identifier, the attacker gains access. Calling req.session.regenerate() upon login defeats this attack.",
    "referenceUrl": "https://owasp.org/www-community/attacks/Session_fixation"
  },
  {
    "id": "auth-q6-adv",
    "certificationId": "auth-security",
    "topic": "Token Storage: Cookies vs Web Storage",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Why are `HttpOnly; Secure; SameSite=Strict` cookies considered more resilient than localStorage for storing authentication tokens in browser clients?",
    "options": [
      {
        "id": "opt-1",
        "text": "HttpOnly prevents client-side JavaScript (and Cross-Site Scripting / XSS payloads) from reading or exfiltrating the token, while SameSite mitigates CSRF"
      },
      {
        "id": "opt-2",
        "text": "Cookies have infinite storage capacity compared to 5 MB in localStorage"
      },
      {
        "id": "opt-3",
        "text": "Cookies cannot be intercepted by network sniffers over HTTP"
      },
      {
        "id": "opt-4",
        "text": "localStorage is deprecated in modern browsers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tokens stored in localStorage or sessionStorage are fully accessible to any JavaScript running on the origin; an XSS vulnerability allows instant exfiltration of the token. HttpOnly cookies cannot be read by document.cookie, isolating tokens from script access.",
    "referenceUrl": "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage"
  },
  {
    "id": "auth-q7-adv",
    "certificationId": "auth-security",
    "topic": "Role-Based (RBAC) vs Attribute-Based Access Control (ABAC)",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "In enterprise access control, what capability does Attribute-Based Access Control (ABAC) provide that traditional Role-Based Access Control (RBAC) struggles to model cleanly?",
    "options": [
      {
        "id": "opt-1",
        "text": "Dynamic policies evaluating fine-grained context attributes (such as resource owner ID, time of day, department, client IP, and document classification)"
      },
      {
        "id": "opt-2",
        "text": "Static grouping of users into admin and user categories"
      },
      {
        "id": "opt-3",
        "text": "Elimination of all authorization checks on the server"
      },
      {
        "id": "opt-4",
        "text": "Compatibility only with LDAP directories"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "RBAC assigns permissions to static roles (e.g. \"Manager\"). When business rules require checks like \"user can edit document ONLY IF user is author AND document is in draft status AND accessed during business hours\", RBAC suffers from \"role explosion\". ABAC evaluates contextual attributes dynamically.",
    "referenceUrl": "https://csrc.nist.gov/publications/detail/sp/800-162/final"
  },
  {
    "id": "auth-q8-exp",
    "certificationId": "auth-security",
    "topic": "OpenID Connect (OIDC) ID Token Validation",
    "category": "backend",
    "difficulty": "Expert",
    "question": "According to OpenID Connect Core 1.0, what mandatory validation steps must a Relying Party (RP) execute when verifying an ID Token received from an OpenID Provider (OP)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Verify signature against OP public keys (JWKS), verify iss matches provider, verify aud matches client_id, verify exp is in the future, and verify nonce matches original auth request"
      },
      {
        "id": "opt-2",
        "text": "Re-hash the user password using bcrypt"
      },
      {
        "id": "opt-3",
        "text": "Store the ID token in an unencrypted Redis session"
      },
      {
        "id": "opt-4",
        "text": "Ensure the token length is greater than 10,000 bytes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "OIDC ID Token verification requires checking: issuer matches OP URL, audience matches client ID, signature verifies against OP JWKS, current time is before expiration and after issued-at (with clock skew), and the nonce claim matches the nonce generated in the authentication request.",
    "referenceUrl": "https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation"
  },
  {
    "id": "auth-q9-exp",
    "certificationId": "auth-security",
    "topic": "Constant-Time Comparison & Timing Attacks",
    "category": "backend",
    "difficulty": "Expert",
    "question": "Why must cryptographic signature and HMAC verification in Node.js use `crypto.timingSafeEqual()` instead of the standard `===` operator?",
    "options": [
      {
        "id": "opt-1",
        "text": "`===` short-circuits on the first mismatched byte, leaking character match information through microsecond timing differences that allow attackers to forge valid signatures byte-by-byte"
      },
      {
        "id": "opt-2",
        "text": "`===` cannot compare Buffer instances in JavaScript"
      },
      {
        "id": "opt-3",
        "text": "`timingSafeEqual()` runs on a dedicated Web Worker"
      },
      {
        "id": "opt-4",
        "text": "`===` causes V8 engine memory leaks"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard string or buffer comparison returns false as soon as it detects the first non-matching byte. In a remote network timing attack, an attacker measures response latency to guess bytes sequentially. `crypto.timingSafeEqual()` executes in constant time regardless of where differences occur.",
    "referenceUrl": "https://nodejs.org/api/crypto.html#cryptotimingsafeequaldigest-digest"
  },
  {
    "id": "auth-q10-exp",
    "certificationId": "auth-security",
    "topic": "Cross-Site Request Forgery (CSRF) & SameSite Nuances",
    "category": "backend",
    "difficulty": "Expert",
    "question": "Why does `SameSite=Lax` cookie policy NOT fully protect against CSRF attacks in applications that incorrectly use top-level GET requests for state-changing actions?",
    "options": [
      {
        "id": "opt-1",
        "text": "SameSite=Lax permits cookies to be sent on top-level cross-site navigations (e.g. `<a href=\"...\">` or `window.location`), so state-changing GET requests will still execute with user credentials"
      },
      {
        "id": "opt-2",
        "text": "SameSite=Lax is ignored on mobile devices"
      },
      {
        "id": "opt-3",
        "text": "SameSite cookies only apply to subdomains"
      },
      {
        "id": "opt-4",
        "text": "SameSite=Lax disables HTTPS transport"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Lax allows cookies on top-level navigations following a safe method (GET). If an application violates REST principles and performs mutations via GET (e.g. GET /transfer?amount=1000&to=attacker), an external site linking to that URL triggers the request with the user's authenticated session cookie.",
    "referenceUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
  },
  {
    "id": "gql-q1-inter",
    "certificationId": "graphql-architecture",
    "topic": "GraphQL Schema Definition Language (SDL)",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "In GraphQL SDL, which of the following represents the 5 core built-in scalar types?",
    "options": [
      {
        "id": "opt-1",
        "text": "Int, Float, String, Boolean, and ID"
      },
      {
        "id": "opt-2",
        "text": "Number, String, Boolean, Object, and Array"
      },
      {
        "id": "opt-3",
        "text": "Text, Integer, Decimal, DateTime, and Binary"
      },
      {
        "id": "opt-4",
        "text": "Char, Varchar, Int, Timestamp, and UUID"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The official GraphQL specification defines exactly five built-in scalar types: Int (signed 32-bit integer), Float (signed double-precision), String (UTF-8 character sequence), Boolean (true or false), and ID (unique identifier serialized as string).",
    "referenceUrl": "https://spec.graphql.org/draft/#sec-Scalars"
  },
  {
    "id": "gql-q2-inter",
    "certificationId": "graphql-architecture",
    "topic": "Resolver Function Signature & Context",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "In standard JavaScript/TypeScript GraphQL resolvers `(parent, args, context, info)`, what is the architectural purpose of the `context` argument?",
    "options": [
      {
        "id": "opt-1",
        "text": "It is a shared object initialized per request that carries request-scoped dependencies such as authenticated user identity, database connections, and DataLoader instances"
      },
      {
        "id": "opt-2",
        "text": "It holds the raw TCP socket file descriptor"
      },
      {
        "id": "opt-3",
        "text": "It stores global schema AST type definitions"
      },
      {
        "id": "opt-4",
        "text": "It records client IP addresses in Redis"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The `context` object is created once per HTTP request in the GraphQL server setup. It is passed to every resolver executed during that request, providing access to auth tokens, user models, and DataLoader caches.",
    "referenceUrl": "https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument"
  },
  {
    "id": "gql-q3-adv",
    "certificationId": "graphql-architecture",
    "topic": "N+1 Problem & DataLoader Batching",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How does Facebook's DataLoader library resolve the N+1 database query problem in GraphQL resolver trees?",
    "options": [
      {
        "id": "opt-1",
        "text": "It coalesces individual load requests made during a single event loop tick into a single batched query (e.g. `WHERE id IN (...)`) and caches results in-memory for the duration of that request"
      },
      {
        "id": "opt-2",
        "text": "It converts GraphQL queries into SQL stored procedures"
      },
      {
        "id": "opt-3",
        "text": "It executes queries in parallel thread workers"
      },
      {
        "id": "opt-4",
        "text": "It caches all query results indefinitely across all users"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "DataLoader uses JavaScript microtask queue batching (process.nextTick / Promise.resolve()). All `.load(id)` calls triggered across sibling resolvers within one tick are collected into a single array passed to a batch function, executing one SQL query instead of N queries.",
    "referenceUrl": "https://github.com/graphql/dataloader"
  },
  {
    "id": "gql-q4-adv",
    "certificationId": "graphql-architecture",
    "topic": "Query Complexity Analysis & Depth Limiting",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Why must public GraphQL APIs enforce Query Depth Limiting and Query Complexity validation before execution?",
    "options": [
      {
        "id": "opt-1",
        "text": "To prevent Denial of Service (DoS) attacks where malicious actors submit deeply nested or recursive queries (e.g. author -> books -> author -> books...) that exhaust server CPU and database resources"
      },
      {
        "id": "opt-2",
        "text": "Because GraphQL cannot parse queries deeper than 3 levels"
      },
      {
        "id": "opt-3",
        "text": "To prevent SQL injection attacks"
      },
      {
        "id": "opt-4",
        "text": "To comply with HTTP/2 frame size restrictions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Unlike REST where endpoints have fixed return schemas, GraphQL lets clients request arbitrary graph shapes. Cyclical relationships enable malicious users to construct deeply nested queries that cause exponential database requests. Complexity analyzers reject queries exceeding cost thresholds before execution.",
    "referenceUrl": "https://www.apollographql.com/blog/securing-your-graphql-api-from-malicious-queries"
  },
  {
    "id": "gql-q5-adv",
    "certificationId": "graphql-architecture",
    "topic": "Apollo Federation v2 Architecture",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "In Apollo Federation v2, what directive allows multiple subgraphs to contribute fields to an existing shared entity without creating conflicting schema definitions?",
    "options": [
      {
        "id": "opt-1",
        "text": "`@key(fields: \"id\")` to declare entity identification, paired with `@shareable` or `@override`"
      },
      {
        "id": "opt-2",
        "text": "`@foreignKey`"
      },
      {
        "id": "opt-3",
        "text": "`@microservice`"
      },
      {
        "id": "opt-4",
        "text": "`@inherit`"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Apollo Federation v2, an entity is defined with `@key(fields: \"id\")`. Subgraphs resolve their own slice of the entity. The `@shareable` directive allows multiple subgraphs to resolve the same field, while the Federation Router composes subgraphs into a unified supergraph.",
    "referenceUrl": "https://www.apollographql.com/docs/federation/entities/"
  },
  {
    "id": "gql-q6-adv",
    "certificationId": "graphql-architecture",
    "topic": "Automatic Persisted Queries (APQ) & CDN Caching",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How do Automatic Persisted Queries (APQ) enable HTTP GET caching of GraphQL queries at CDN edge layers?",
    "options": [
      {
        "id": "opt-1",
        "text": "Clients send a SHA-256 hash of the query via HTTP GET; if the server has registered the hash, it executes and returns the response with standard Cache-Control headers, allowing CDNs to cache responses"
      },
      {
        "id": "opt-2",
        "text": "The CDN executes the GraphQL schema in edge WebAssembly"
      },
      {
        "id": "opt-3",
        "text": "All GraphQL POST mutations are converted to GET requests"
      },
      {
        "id": "opt-4",
        "text": "APQ disables client variable validation"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "GraphQL POST bodies cannot be easily cached by CDNs. With APQ, clients send `?extensions={\"persistedQuery\":{\"sha256Hash\":\"...\"}}` over HTTP GET. If the CDN/server recognizes the hash, it serves the cached response with standard HTTP caching headers.",
    "referenceUrl": "https://www.apollographql.com/docs/apollo-server/performance/apq/"
  },
  {
    "id": "gql-q7-adv",
    "certificationId": "graphql-architecture",
    "topic": "Real-Time Subscriptions: WebSockets vs SSE",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What advantage does GraphQL over Server-Sent Events (SSE / graphql-sse) offer over traditional WebSockets (graphql-ws) for read-only subscription feeds?",
    "options": [
      {
        "id": "opt-1",
        "text": "SSE operates over standard HTTP/2 and HTTP/3 streams with native browser reconnection, standard corporate firewall/proxy traversal, and multiplexing without custom stateful socket upgrade handshakes"
      },
      {
        "id": "opt-2",
        "text": "SSE supports bidirectional binary data transfers"
      },
      {
        "id": "opt-3",
        "text": "SSE runs in GPU compute shaders"
      },
      {
        "id": "opt-4",
        "text": "SSE requires no client JavaScript"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "WebSockets require a protocol upgrade (101 Switching Protocols), custom keepalive/ping handling, and often struggle through enterprise proxy firewalls. SSE is pure HTTP, naturally multiplexed over HTTP/2, and natively handled by browser EventSource with automatic reconnection.",
    "referenceUrl": "https://github.com/enisdenjo/graphql-sse"
  },
  {
    "id": "gql-q8-exp",
    "certificationId": "graphql-architecture",
    "topic": "Incremental Delivery: @defer and @stream Directives",
    "category": "backend",
    "difficulty": "Expert",
    "question": "In the GraphQL Incremental Delivery specification, how does the `@defer` directive change how a slow field in a query is resolved and transported?",
    "options": [
      {
        "id": "opt-1",
        "text": "The server returns initial critical data immediately and streams the deferred slow field in subsequent multi-part chunks over a single `multipart/mixed` HTTP response"
      },
      {
        "id": "opt-2",
        "text": "The deferred field is calculated in the client browser"
      },
      {
        "id": "opt-3",
        "text": "The deferred field is saved to disk and emailed to the user"
      },
      {
        "id": "opt-4",
        "text": "The query fails with a partial execution error"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`@defer` allows clients to prioritize critical data. The server sends the initial response payload immediately, and keeps the HTTP connection open with `multipart/mixed` boundary chunks, streaming slow resolver results as soon as they complete.",
    "referenceUrl": "https://github.com/graphql/graphql-spec/blob/main/rfcs/DeferStream.md"
  },
  {
    "id": "gql-q9-exp",
    "certificationId": "graphql-architecture",
    "topic": "Error Handling & Non-Null Field Bubbling",
    "category": "backend",
    "difficulty": "Expert",
    "question": "In GraphQL schema design, what happens when a resolver for a non-nullable field (`title: String!`) throws an unhandled exception during query execution?",
    "options": [
      {
        "id": "opt-1",
        "text": "The null value bubbles up to the parent field; if the parent is also non-nullable, it continues bubbling upward until it reaches a nullable field (or turns the entire `data` property to null)"
      },
      {
        "id": "opt-2",
        "text": "The server immediately terminates the TCP socket"
      },
      {
        "id": "opt-3",
        "text": "The field returns an empty string \"\" instead of null"
      },
      {
        "id": "opt-4",
        "text": "Only the errors array is populated, while data retains the unthrown fields"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "According to the GraphQL spec, a non-nullable field cannot be null. If an error occurs, null bubbles up to the nearest nullable ancestor. Overusing `!` non-null fields is dangerous because a single failed field can destroy an entire valid response subtree.",
    "referenceUrl": "https://spec.graphql.org/draft/#sec-Handling-Field-Errors"
  },
  {
    "id": "gql-q10-exp",
    "certificationId": "graphql-architecture",
    "topic": "Schema Stitching vs Apollo Federation v2 Router",
    "category": "backend",
    "difficulty": "Expert",
    "question": "Why did the Apollo Federation v2 Rust Router replace NodeJS-based Federation gateways in high-throughput enterprise architectures?",
    "options": [
      {
        "id": "opt-1",
        "text": "The native Rust Router provides zero-garbage-collection query planning, high-concurrency async multi-threading, sub-millisecond query planning latency, and drastically lower memory footprints"
      },
      {
        "id": "opt-2",
        "text": "The Rust Router requires all subgraphs to be written in Rust"
      },
      {
        "id": "opt-3",
        "text": "The NodeJS gateway was incompatible with HTTP/1.1"
      },
      {
        "id": "opt-4",
        "text": "The Rust Router eliminates database indexes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Apollo Federation Router (written in Rust) processes query plans, query AST parsing, and subgraph parallel dispatch without V8 garbage collection pauses. It delivers 10x higher throughput and sub-millisecond overhead compared to JS-based gateways.",
    "referenceUrl": "https://www.apollographql.com/docs/router/"
  },
  {
    "id": "apisec-q1-inter",
    "certificationId": "api-security",
    "topic": "Broken Object Level Authorization (BOLA / IDOR)",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "What is the root cause of Broken Object Level Authorization (BOLA / API1:2023 in OWASP API Security Top 10)?",
    "options": [
      {
        "id": "opt-1",
        "text": "The API endpoint accepts an object identifier from the client request (e.g. `/api/invoices/12345`) but fails to validate that the currently authenticated user actually has ownership or permission to access that specific object"
      },
      {
        "id": "opt-2",
        "text": "The server uses weak SSL/TLS certificates"
      },
      {
        "id": "opt-3",
        "text": "The database allows SQL injection via username fields"
      },
      {
        "id": "opt-4",
        "text": "The API does not implement CORS headers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "BOLA (formerly IDOR) occurs when an endpoint relies on client-provided IDs without verifying that the requesting user owns or is authorized to view that specific record. Attackers simply iterate IDs to harvest sensitive data.",
    "referenceUrl": "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/"
  },
  {
    "id": "apisec-q2-inter",
    "certificationId": "api-security",
    "topic": "Rate Limiting Algorithms: Token Bucket vs Leaky Bucket",
    "category": "backend",
    "difficulty": "Intermediate",
    "question": "In API Gateway rate limiting, how does the Token Bucket algorithm handle sudden bursts of legitimate traffic compared to Leaky Bucket?",
    "options": [
      {
        "id": "opt-1",
        "text": "Token Bucket permits bursts of requests up to the maximum bucket capacity if tokens have accumulated; Leaky Bucket processes requests at a strictly constant smooth output rate regardless of burstiness"
      },
      {
        "id": "opt-2",
        "text": "Leaky Bucket allows unlimited traffic during peak hours"
      },
      {
        "id": "opt-3",
        "text": "Token Bucket requires user passwords to replenish tokens"
      },
      {
        "id": "opt-4",
        "text": "Both algorithms reject any traffic exceeding 1 request per second"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Token Bucket allows accumulated tokens to be spent immediately, accommodating short legitimate bursts while enforcing an average rate limit. Leaky Bucket smooths outgoing traffic to a fixed rate, dropping requests if the queue overflows.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Token_bucket"
  },
  {
    "id": "apisec-q3-adv",
    "certificationId": "api-security",
    "topic": "Broken Object Property Level Authorization (Mass Assignment)",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How do attackers exploit Mass Assignment (API3:2023 BOPLA) when updating account profiles via `PATCH /api/users/me`?",
    "options": [
      {
        "id": "opt-1",
        "text": "By injecting unexpected JSON properties (such as `isAdmin: true` or `verified: true`) which the backend blindly binds directly to database model attributes without schema allowlisting"
      },
      {
        "id": "opt-2",
        "text": "By executing SQL injection in the Authorization header"
      },
      {
        "id": "opt-3",
        "text": "By sending HTTP DELETE requests with huge payloads"
      },
      {
        "id": "opt-4",
        "text": "By forging the server's IP address"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When backends automatically bind incoming request bodies directly to internal database entity models (e.g. `user.update(req.body)`), attackers inject privileged attributes like `role: \"admin\"` or `accountBalance: 99999`. Strict DTO schemas (Zod/Pydantic) prevent this.",
    "referenceUrl": "https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/"
  },
  {
    "id": "apisec-q4-adv",
    "certificationId": "api-security",
    "topic": "Unrestricted Resource Consumption (API4:2023)",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "Which of the following configurations prevents Unrestricted Resource Consumption (API4:2023) on search and list endpoints?",
    "options": [
      {
        "id": "opt-1",
        "text": "Enforcing strict maximum pagination limits (e.g. max `limit=100`), capping request body payload sizes (e.g. `limit: \"1mb\"`), and implementing execution timeouts"
      },
      {
        "id": "opt-2",
        "text": "Disabling HTTPS compression"
      },
      {
        "id": "opt-3",
        "text": "Allowing users to set `limit=1000000` for batch operations"
      },
      {
        "id": "opt-4",
        "text": "Storing all API responses in browser localStorage"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Unrestricted resource consumption occurs when APIs allow clients to trigger unbounded server workloads: requesting a million records at once, uploading multi-gigabyte files to memory, or triggering expensive regex evaluations without timeouts.",
    "referenceUrl": "https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/"
  },
  {
    "id": "apisec-q5-adv",
    "certificationId": "api-security",
    "topic": "Server-Side Request Forgery in APIs (SSRF / API7:2023)",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "How do modern cloud-native APIs protect webhook endpoints from exploiting SSRF to access AWS/GCP instance metadata services (169.254.169.254)?",
    "options": [
      {
        "id": "opt-1",
        "text": "By enforcing IMDSv2 (requiring a PUT session token) in the cloud, while application code resolves DNS, rejects RFC 1918 and link-local IP addresses, and blocks redirects to internal IPs"
      },
      {
        "id": "opt-2",
        "text": "By adding an API key in the webhook payload"
      },
      {
        "id": "opt-3",
        "text": "By using basic auth on all endpoints"
      },
      {
        "id": "opt-4",
        "text": "By converting webhooks into GraphQL subscriptions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cloud metadata services (169.254.169.254) are prime targets for SSRF. IMDSv2 requires an HTTP PUT request with a header to acquire a session token, defeating SSRF that only executes GET/POST. Application validators must also disallow internal/link-local IP addresses.",
    "referenceUrl": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html"
  },
  {
    "id": "apisec-q6-adv",
    "certificationId": "api-security",
    "topic": "Security Misconfiguration (API8:2023) & Information Leaks",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What is a dangerous Security Misconfiguration (API8:2023) commonly discovered in production REST APIs?",
    "options": [
      {
        "id": "opt-1",
        "text": "Returning full server stack traces, database schema details, and framework versions in 500 error responses, aiding attacker reconnaissance"
      },
      {
        "id": "opt-2",
        "text": "Using JSON formatting for responses"
      },
      {
        "id": "opt-3",
        "text": "Enabling HTTP/2 on the reverse proxy"
      },
      {
        "id": "opt-4",
        "text": "Validating input parameters with regex"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Exposing detailed stack traces, environment variable names, database queries, or framework versions in API error responses provides attackers with precise architectural intelligence needed to execute targeted exploits.",
    "referenceUrl": "https://owasp.org/API-Security/editions/2023/en/0xa8-security-misconfiguration/"
  },
  {
    "id": "apisec-q7-adv",
    "certificationId": "api-security",
    "topic": "Improper Inventory Management (Shadow APIs)",
    "category": "backend",
    "difficulty": "Advanced",
    "question": "What is a \"Shadow API\" or \"Zombie API\" (API9:2023), and why does it represent a severe vulnerability?",
    "options": [
      {
        "id": "opt-1",
        "text": "Deprecated, unmonitored API versions (e.g. `/api/v1/user`) that remain active on production servers without current security patches, authentication controls, or logging"
      },
      {
        "id": "opt-2",
        "text": "An API running inside a dark mode theme"
      },
      {
        "id": "opt-3",
        "text": "An API implemented in assembly code"
      },
      {
        "id": "opt-4",
        "text": "An API that only accepts nighttime traffic"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Zombie APIs are older API versions that developers forgot to decommission. Even if `/api/v2` has strict MFA and rate limiting, if `/api/v1` connects to the same database with obsolete authentication, attackers bypass modern security entirely.",
    "referenceUrl": "https://owasp.org/API-Security/editions/2023/en/0xa9-improper-inventory-management/"
  },
  {
    "id": "apisec-q8-exp",
    "certificationId": "api-security",
    "topic": "Mutual TLS (mTLS) in Zero-Trust Microservices",
    "category": "backend",
    "difficulty": "Expert",
    "question": "How does Mutual TLS (mTLS) establish cryptographic identity in microservice service-to-service communication?",
    "options": [
      {
        "id": "opt-1",
        "text": "Both the client and the server present X.509 digital certificates during the TLS handshake, proving and authenticating both client and server identities cryptographically without relying on shared passwords"
      },
      {
        "id": "opt-2",
        "text": "The client sends its MAC address in the HTTP User-Agent header"
      },
      {
        "id": "opt-3",
        "text": "The server generates a CAPTCHA challenge for every TCP connection"
      },
      {
        "id": "opt-4",
        "text": "TLS certificates are verified by SMS two-factor authentication"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard TLS only verifies server identity to the client. mTLS requires the client to also provide a trusted X.509 certificate. Service meshes (Istio/Linkerd) leverage SPIFFE X.509 certificates to authenticate microservice identities transparently.",
    "referenceUrl": "https://www.cloudflare.com/learning/access-management/what-is-mtls/"
  },
  {
    "id": "apisec-q9-exp",
    "certificationId": "api-security",
    "topic": "Phantom Token Pattern (Opaque vs JWT)",
    "category": "backend",
    "difficulty": "Expert",
    "question": "What security problem does the \"Phantom Token Pattern\" solve when using JSON Web Tokens (JWTs) with public client applications?",
    "options": [
      {
        "id": "opt-1",
        "text": "It issues an opaque reference token to the external browser/client to avoid exposing internal claims and signing keys; the API Gateway exchanges the opaque token for a signed internal JWT for backend microservices"
      },
      {
        "id": "opt-2",
        "text": "It encrypts token payloads using symmetric RC4 cipher"
      },
      {
        "id": "opt-3",
        "text": "It hides the API gateway behind a Tor onion routing network"
      },
      {
        "id": "opt-4",
        "text": "It generates JWTs without expiration timestamps"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Exposing JWTs to public clients can leak sensitive claims (tenant IDs, roles, internal metadata) and prevents instant token revocation. The Phantom Token Pattern issues random opaque strings to clients; the API Gateway looks up and swaps it for a validated JWT on the internal network.",
    "referenceUrl": "https://curity.io/resources/learn/phantom-token-pattern/"
  },
  {
    "id": "apisec-q10-exp",
    "certificationId": "api-security",
    "topic": "HMAC Request Signing & Replay Attack Defense (AWS SigV4)",
    "category": "backend",
    "difficulty": "Expert",
    "question": "In HMAC request signing protocols (such as AWS Signature Version 4), how do timestamps and canonical request hashes prevent replay attacks and tampering?",
    "options": [
      {
        "id": "opt-1",
        "text": "The signature hashes canonical URI, headers, timestamp, and body hash with a secret key; the server rejects requests with timestamps outside a ~5-minute window and rejects re-used nonces"
      },
      {
        "id": "opt-2",
        "text": "The client sends its private SSH key in the query string"
      },
      {
        "id": "opt-3",
        "text": "The server records IP addresses in a blockchain ledger"
      },
      {
        "id": "opt-4",
        "text": "Requests are signed using the user's biometric fingerprint"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "AWS SigV4 creates a canonical representation of HTTP method, path, query, headers, and SHA256 of payload. This is signed with a derived secret key including date. An attacker cannot alter headers or body without invalidating the signature, and cannot replay requests after the time window expires.",
    "referenceUrl": "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html"
  }
];
