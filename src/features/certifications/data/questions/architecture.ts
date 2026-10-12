import { Question } from '../../types';

export const ARCHITECTURE_QUESTIONS: Question[] = [
  {
    "id": "sys-q1-intermediate",
    "certificationId": "system-design",
    "topic": "Caching Strategies",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "What is the key trade-off of a \"Write-Through\" cache strategy compared to a \"Write-Back\" (Write-Behind) cache strategy?",
    "options": [
      {
        "id": "opt-1",
        "text": "Write-Through writes synchronously to both the cache and database before acknowledging success, ensuring consistency at the expense of higher write latency"
      },
      {
        "id": "opt-2",
        "text": "Write-Through never updates the database"
      },
      {
        "id": "opt-3",
        "text": "Write-Through loses data if the cache crashes"
      },
      {
        "id": "opt-4",
        "text": "Write-Through is only suitable for read-only systems"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Write-Through, writes are committed to the cache and the storage layer simultaneously, avoiding data loss if the cache node crashes, but with the penalty of higher write latency compared to asynchronous Write-Back.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Cache_(computing)#Writing_policies"
  },
  {
    "id": "sys-q2-intermediate",
    "certificationId": "system-design",
    "topic": "Rate Limiting Algorithms",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "How does the \"Token Bucket\" algorithm differ from the \"Fixed Window Counter\" algorithm in API rate limiting?",
    "options": [
      {
        "id": "opt-1",
        "text": "Token Bucket allows controlled burst traffic while maintaining an average rate, whereas Fixed Window Counter suffers from boundary burst doubling at window edges"
      },
      {
        "id": "opt-2",
        "text": "Token Bucket requires an external database"
      },
      {
        "id": "opt-3",
        "text": "Fixed Window Counter cannot count requests per IP"
      },
      {
        "id": "opt-4",
        "text": "Token Bucket is only implemented on hardware routers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Fixed window counters permit 2x the rate limit if bursts occur across window boundaries (e.g. at 00:59 and 01:00). The Token Bucket algorithm refills tokens at a continuous rate, smoothing traffic while gracefully allowing bursts up to bucket capacity.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Token_bucket"
  },
  {
    "id": "sys-q3-advanced",
    "certificationId": "system-design",
    "topic": "CAP & PACELC Theorems",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What does the PACELC theorem state about distributed systems when there is NO network partition (the \"E\" case)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Else (when no partition), the system must choose between Latency (L) and Consistency (C)"
      },
      {
        "id": "opt-2",
        "text": "Else, the system achieves 100% linearizability without trade-offs"
      },
      {
        "id": "opt-3",
        "text": "Else, all database replicas must be shut down"
      },
      {
        "id": "opt-4",
        "text": "Else, encryption is disabled to reduce latency"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PACELC extends CAP: if Partition (P), trade Availability (A) vs Consistency (C); Else (E), trade Latency (L) vs Consistency (C). Even without network partitions, replicating data to ensure consistency increases latency.",
    "referenceUrl": "https://en.wikipedia.org/wiki/PACELC_theorem"
  },
  {
    "id": "sys-q4-advanced",
    "certificationId": "system-design",
    "topic": "Consistent Hashing",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How do \"virtual nodes\" (vnodes) in consistent hashing solve the problem of non-uniform key distribution (hotspots)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Each physical server is mapped to multiple pseudo-random points across the hash ring, balancing load evenly and spreading rehashed keys across multiple nodes upon failures"
      },
      {
        "id": "opt-2",
        "text": "They replicate all data to every server in the cluster"
      },
      {
        "id": "opt-3",
        "text": "They store keys in alphabetical order"
      },
      {
        "id": "opt-4",
        "text": "They replace hash functions with round-robin load balancers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "With few physical nodes, consistent hash tokens can cluster unevenly. Virtual nodes map each physical node to many positions (e.g. 100-256 tokens) on the ring, ensuring statistical uniformity and distributing the burden when a node fails.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Consistent_hashing"
  },
  {
    "id": "sys-q5-advanced",
    "certificationId": "system-design",
    "topic": "Message Queues & Processing Semantics",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Why is achieving true \"Exactly-Once\" message delivery across independent distributed services practically impossible without idempotent consumers or two-phase commit?",
    "options": [
      {
        "id": "opt-1",
        "text": "Due to the Two Generals problem: network acknowledgments can be lost or delayed, forcing producers to re-send messages and consumers to handle duplicates idempotently"
      },
      {
        "id": "opt-2",
        "text": "Because message queues only support UDP"
      },
      {
        "id": "opt-3",
        "text": "Because message bodies are limited to 64KB"
      },
      {
        "id": "opt-4",
        "text": "Because disk controllers do not guarantee atomic writes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Network failures cannot distinguish between a dropped message and a dropped ACK. Producers must retry on timeout (at-least-once). True exactly-once semantics requires downstream consumers to deduplicate using unique idempotency keys.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Two_Generals%27_Problem"
  },
  {
    "id": "sys-q6-advanced",
    "certificationId": "system-design",
    "topic": "Circuit Breaker Pattern",
    "category": "other",
    "difficulty": "Advanced",
    "question": "In a microservice circuit breaker (e.g. Netflix Hystrix or Resilience4j), what occurs when the circuit transitions to the \"HALF-OPEN\" state?",
    "options": [
      {
        "id": "opt-1",
        "text": "A limited number of trial requests are permitted through to probe whether the downstream service has recovered"
      },
      {
        "id": "opt-2",
        "text": "All incoming traffic is permanently rejected with 503 errors"
      },
      {
        "id": "opt-3",
        "text": "The microservice automatically restarts"
      },
      {
        "id": "opt-4",
        "text": "All requests are routed to a mock database"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "After an open circuit cools down for a timeout duration, it enters Half-Open. It permits a small subset of test requests. If they succeed, the circuit resets to Closed; if failures persist, it trips back to Open.",
    "referenceUrl": "https://martinfowler.com/bliki/CircuitBreaker.html"
  },
  {
    "id": "sys-q7-advanced",
    "certificationId": "system-design",
    "topic": "Database Sharding & Cross-Shard Joins",
    "category": "other",
    "difficulty": "Advanced",
    "question": "When horizontal sharding is introduced to scale a database, what is the primary operational penalty for queries that do not include the shard key?",
    "options": [
      {
        "id": "opt-1",
        "text": "Scatter-gather query execution: the query must be broadcast to every shard in the cluster and aggregated in memory, resulting in high latency and bottlenecking"
      },
      {
        "id": "opt-2",
        "text": "The database rejects the query with a syntax error"
      },
      {
        "id": "opt-3",
        "text": "The primary keys are automatically re-generated"
      },
      {
        "id": "opt-4",
        "text": "Data on other shards is deleted"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Without the shard key, the routing coordinator cannot pinpoint which shard contains the data. It must execute a scatter-gather query against all shards, wait for all responses, and merge results in memory, destroying scalability.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Shard_(database_architecture)"
  },
  {
    "id": "sys-q8-expert",
    "certificationId": "system-design",
    "topic": "Raft & Paxos Consensus",
    "category": "other",
    "difficulty": "Expert",
    "question": "In the Raft consensus algorithm, how does a leader node ensure that an entry in its log is safely committed before applying it to the state machine?",
    "options": [
      {
        "id": "opt-1",
        "text": "The entry must be replicated onto a majority (quorum) of cluster nodes from the leader's current term"
      },
      {
        "id": "opt-2",
        "text": "Every node in the cluster must acknowledge receipt"
      },
      {
        "id": "opt-3",
        "text": "The leader writes the entry to local disk three times"
      },
      {
        "id": "opt-4",
        "text": "The entry must be signed by an external certificate authority"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Raft safety rules stipulate that a log entry from the current term is committed once it has been replicated to a strict majority (quorum, e.g. 3 of 5 nodes). Once committed, it is guaranteed never to be overwritten by any future leader.",
    "referenceUrl": "https://raft.github.io/"
  },
  {
    "id": "sys-q9-expert",
    "certificationId": "system-design",
    "topic": "Event Sourcing & CQRS",
    "category": "other",
    "difficulty": "Expert",
    "question": "What is the main architectural challenge of Command Query Responsibility Segregation (CQRS) when paired with Event Sourcing?",
    "options": [
      {
        "id": "opt-1",
        "text": "Eventual consistency between write-side command projections and read-side query stores, leading to read-your-own-writes latency anomalies"
      },
      {
        "id": "opt-2",
        "text": "Inability to store events on disk"
      },
      {
        "id": "opt-3",
        "text": "Incompatibility with microservices"
      },
      {
        "id": "opt-4",
        "text": "Requirement that all queries use GraphQL"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In CQRS/Event Sourcing, events append to an append-only event store. Asynchronous projection workers update read-optimized materialized views. Because updates are asynchronous, reads immediately following a write may not yet reflect the update.",
    "referenceUrl": "https://martinfowler.com/bliki/CQRS.html"
  },
  {
    "id": "sys-q10-expert",
    "certificationId": "system-design",
    "topic": "Distributed Transactions & Sagas",
    "category": "other",
    "difficulty": "Expert",
    "question": "In an asynchronous Saga pattern across distributed services, how are failures in a multi-step transaction handled without two-phase commit (2PC)?",
    "options": [
      {
        "id": "opt-1",
        "text": "By executing compensating transactions (backward recovery) in reverse order for every completed step to semantically undo partial state changes"
      },
      {
        "id": "opt-2",
        "text": "By rebooting all microservices simultaneously"
      },
      {
        "id": "opt-3",
        "text": "By rolling back the shared database transaction log"
      },
      {
        "id": "opt-4",
        "text": "By blocking all network traffic until an engineer manually intervenes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Sagas avoid blocking two-phase locks across services. If a intermediate step fails (e.g. payment failure), the coordinator triggers compensating transactions for preceding steps (e.g. un-reserve inventory, cancel order) to restore business consistency.",
    "referenceUrl": "https://microservices.io/patterns/data/saga.html"
  },
  {
    "id": "dsa-q1-inter",
    "certificationId": "data-structures-algorithms",
    "topic": "Master Theorem for Divide & Conquer Recurrences",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "According to the Master Theorem, what is the asymptotic time complexity of the recurrence relation T(n) = 2T(n/2) + O(n)?",
    "options": [
      {
        "id": "opt-1",
        "text": "O(n log n) (Case 2: log_b(a) = log_2(2) = 1, matching f(n) = n)"
      },
      {
        "id": "opt-2",
        "text": "O(n^2)"
      },
      {
        "id": "opt-3",
        "text": "O(log n)"
      },
      {
        "id": "opt-4",
        "text": "O(n)"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "For T(n) = aT(n/b) + f(n): a=2, b=2, f(n)=O(n). Since log_2(2) = 1, and f(n) = Theta(n^1), Case 2 of the Master Theorem applies, yielding T(n) = Theta(n log n) (as seen in Merge Sort).",
    "referenceUrl": "https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)"
  },
  {
    "id": "dsa-q2-inter",
    "certificationId": "data-structures-algorithms",
    "topic": "LRU Cache Design & Big O",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "Which combination of data structures achieves both O(1) get(key) and O(1) put(key, value) in a Least Recently Used (LRU) Cache?",
    "options": [
      {
        "id": "opt-1",
        "text": "A Hash Map paired with a Doubly Linked List"
      },
      {
        "id": "opt-2",
        "text": "A Binary Search Tree paired with a Dynamic Array"
      },
      {
        "id": "opt-3",
        "text": "A Singly Linked List paired with a Priority Queue"
      },
      {
        "id": "opt-4",
        "text": "A Red-Black Tree paired with a Ring Buffer"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Hash Map provides O(1) lookup to find node references. The Doubly Linked List allows O(1) removal and insertion to the front/tail when nodes are accessed or evicted, avoiding O(N) array shifts.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU"
  },
  {
    "id": "dsa-q3-adv",
    "certificationId": "data-structures-algorithms",
    "topic": "Graph Algorithms: Topological Sort & Cycles",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How does Kahn's Algorithm perform Topological Sorting on a Directed Graph, and how does it detect cycles?",
    "options": [
      {
        "id": "opt-1",
        "text": "It enqueues vertices with in-degree 0 and decrements neighbors' in-degrees as vertices are processed; if the processed count is less than total vertices, a directed cycle exists"
      },
      {
        "id": "opt-2",
        "text": "It uses Dijkstra's algorithm with priority queues"
      },
      {
        "id": "opt-3",
        "text": "It runs binary search on adjacency matrices"
      },
      {
        "id": "opt-4",
        "text": "It reverses all graph edges and computes strongly connected components"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Kahn's algorithm maintains in-degrees of all nodes. Nodes with in-degree 0 are queued. When popped, their outgoing edges are removed (reducing neighbors' in-degrees). If nodes remain with in-degree > 0 when the queue empties, the graph contains at least one cycle.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm"
  },
  {
    "id": "dsa-q4-adv",
    "certificationId": "data-structures-algorithms",
    "topic": "Shortest Paths: Dijkstra vs Bellman-Ford",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Why does Dijkstra's algorithm fail on graphs with negative edge weights, while Bellman-Ford succeeds?",
    "options": [
      {
        "id": "opt-1",
        "text": "Dijkstra greedily assumes once a vertex is marked visited with shortest distance, no shorter path can be found; negative edges violate this optimal substructure assumption"
      },
      {
        "id": "opt-2",
        "text": "Dijkstra requires undirected graphs only"
      },
      {
        "id": "opt-3",
        "text": "Bellman-Ford only works on tree topologies"
      },
      {
        "id": "opt-4",
        "text": "Dijkstra cannot handle graphs with more than 100 vertices"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Dijkstra is greedy: once a node is finalized, its distance is never updated. If a subsequent path includes a negative edge that lowers the distance to an already-finalized node, Dijkstra fails to discover it. Bellman-Ford relaxes all edges |V|-1 times, correctly handling negative weights.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
  },
  {
    "id": "dsa-q5-adv",
    "certificationId": "data-structures-algorithms",
    "topic": "Disjoint Set Union (DSU) / Union-Find Complexity",
    "category": "other",
    "difficulty": "Advanced",
    "question": "With both Path Compression and Union by Rank optimizations applied, what is the amortized time complexity of Union and Find operations across M operations on N elements?",
    "options": [
      {
        "id": "opt-1",
        "text": "O(M * alpha(N)), where alpha is the extremely slow-growing inverse Ackermann function (effectively O(1) in practical computing)"
      },
      {
        "id": "opt-2",
        "text": "O(M log N)"
      },
      {
        "id": "opt-3",
        "text": "O(M * N)"
      },
      {
        "id": "opt-4",
        "text": "O(N^2)"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Tarjan proved that combining union by rank with path compression yields an amortized time per operation of O(alpha(N)), where alpha is the inverse Ackermann function. For any conceivable universe size N <= 10^80, alpha(N) <= 4, making it nearly constant time.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Disjoint-set_data_structure"
  },
  {
    "id": "dsa-q6-adv",
    "certificationId": "data-structures-algorithms",
    "topic": "Segment Tree vs Binary Indexed Tree (Fenwick Tree)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "When should a Segment Tree be preferred over a Fenwick Tree (Binary Indexed Tree) for range queries?",
    "options": [
      {
        "id": "opt-1",
        "text": "When the query operation is non-invertible (e.g. Range Minimum/Maximum Query RMQ), whereas standard Fenwick Trees require invertible operations like prefix addition/subtraction"
      },
      {
        "id": "opt-2",
        "text": "When array updates occur in O(1) time"
      },
      {
        "id": "opt-3",
        "text": "When memory is limited to 1 byte per element"
      },
      {
        "id": "opt-4",
        "text": "Fenwick Trees are deprecated in computer science"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard Fenwick Trees compute prefix sums F(R) - F(L-1). For non-invertible associative operations like min(L, R) or arbitrary range updates with lazy propagation, Segment Trees provide flexible O(log N) operations across arbitrary ranges.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Segment_tree"
  },
  {
    "id": "dsa-q7-adv",
    "certificationId": "data-structures-algorithms",
    "topic": "Trie (Prefix Tree) Complexity",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What is the time complexity to search for a word of length L in a Trie containing N words and an alphabet of size Sigma?",
    "options": [
      {
        "id": "opt-1",
        "text": "O(L), independent of the total number of words N in the dataset"
      },
      {
        "id": "opt-2",
        "text": "O(N * L)"
      },
      {
        "id": "opt-3",
        "text": "O(log N)"
      },
      {
        "id": "opt-4",
        "text": "O(L^2)"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In a Trie, each step traverses a character node. Looking up a string of length L takes exactly L node transitions, giving an O(L) search time completely independent of how many millions of other words exist in the structure.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Trie"
  },
  {
    "id": "dsa-q8-exp",
    "certificationId": "data-structures-algorithms",
    "topic": "Dynamic Programming: Monotonic Queue Optimization",
    "category": "other",
    "difficulty": "Expert",
    "question": "In sliding window maximum problems and 1D dynamic programming transitions, how does a Monotonic Deque reduce the time complexity from O(N * K) to O(N)?",
    "options": [
      {
        "id": "opt-1",
        "text": "By maintaining indices of elements in descending value order and removing elements out of window or smaller than current element; each index is pushed and popped at most once"
      },
      {
        "id": "opt-2",
        "text": "By running QuickSort on every window shift"
      },
      {
        "id": "opt-3",
        "text": "By using Fourier transforms"
      },
      {
        "id": "opt-4",
        "text": "By storing values in a Redis database"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A monotonic decreasing deque stores elements that are candidates for maximum. As the window slides, elements leaving the window are popped from the front, and elements smaller than the incoming value are popped from the back. Since every element enters and leaves once, total time is amortized O(N).",
    "referenceUrl": "https://cp-algorithms.com/data_structures/stack_queue_modification.html"
  },
  {
    "id": "dsa-q9-exp",
    "certificationId": "data-structures-algorithms",
    "topic": "String Matching: KMP Algorithm Failure Function",
    "category": "other",
    "difficulty": "Expert",
    "question": "In the Knuth-Morris-Pratt (KMP) string matching algorithm, what information does the pi (prefix) failure function table precompute for the pattern?",
    "options": [
      {
        "id": "opt-1",
        "text": "The length of the longest proper prefix of pattern[0..i] that is also a suffix of pattern[0..i], allowing the search pointer in text to never backtrack upon mismatch"
      },
      {
        "id": "opt-2",
        "text": "The frequency of vowels in the text"
      },
      {
        "id": "opt-3",
        "text": "The MD5 hash of all substrings"
      },
      {
        "id": "opt-4",
        "text": "The ASCII distance between characters"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "KMP avoids quadratic backtracking in naive string matching. The pi table computes the longest proper prefix that matches a suffix for each prefix. On mismatch, KMP uses this table to shift the pattern to the next valid match position without resetting the text cursor, achieving O(N + M) time.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm"
  },
  {
    "id": "dsa-q10-exp",
    "certificationId": "data-structures-algorithms",
    "topic": "Network Flow: Ford-Fulkerson vs Edmonds-Karp",
    "category": "other",
    "difficulty": "Expert",
    "question": "How does the Edmonds-Karp algorithm guarantee polynomial time complexity O(V * E^2) for finding maximum flow in a flow network, compared to Ford-Fulkerson?",
    "options": [
      {
        "id": "opt-1",
        "text": "By strictly using Breadth-First Search (BFS) to find the shortest augmenting path in terms of number of edges in the residual graph"
      },
      {
        "id": "opt-2",
        "text": "By using simulated annealing to guess edge flows"
      },
      {
        "id": "opt-3",
        "text": "By converting directed edges into undirected edges"
      },
      {
        "id": "opt-4",
        "text": "By running Dijkstra with inverted edge capacities"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Ford-Fulkerson with arbitrary DFS augmenting paths can take exponential time or fail to terminate with irrational capacities. Edmonds-Karp uses BFS to find augmenting paths with fewest edges. The length of shortest augmenting path increases monotonically, bounding augmentation steps to O(V * E) and total time to O(V * E^2).",
    "referenceUrl": "https://en.wikipedia.org/wiki/Edmonds%E2%80%93Karp_algorithm"
  },
  {
    "id": "sec-q1-inter",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "STRIDE Threat Modeling",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "In the Microsoft STRIDE threat modeling framework, which security threat category corresponds directly to the violation of data Integrity?",
    "options": [
      {
        "id": "opt-1",
        "text": "Tampering"
      },
      {
        "id": "opt-2",
        "text": "Spoofing"
      },
      {
        "id": "opt-3",
        "text": "Repudiation"
      },
      {
        "id": "opt-4",
        "text": "Elevation of Privilege"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "STRIDE maps: Spoofing -> Authenticity; Tampering -> Integrity; Repudiation -> Non-repudiation; Information Disclosure -> Confidentiality; Denial of Service -> Availability; Elevation of Privilege -> Authorization.",
    "referenceUrl": "https://learn.microsoft.com/en-us/previous-versions/commerce-server/ee823872(v=cs.20)"
  },
  {
    "id": "sec-q2-inter",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Password Hashing: Argon2 vs bcrypt",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "Why is Argon2id recommended over legacy MD5 or SHA-256 for storing user passwords in modern web applications?",
    "options": [
      {
        "id": "opt-1",
        "text": "Argon2id is a memory-hard key derivation function that resists both GPU brute-force attacks and side-channel cache timing attacks"
      },
      {
        "id": "opt-2",
        "text": "Argon2id can be reversed by the server admin to send password reset reminders"
      },
      {
        "id": "opt-3",
        "text": "SHA-256 cannot be hashed on Linux servers"
      },
      {
        "id": "opt-4",
        "text": "Argon2id compresses passwords to 8 bytes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard cryptographic hashes (SHA-256, MD5) are designed to be fast on hardware; attackers can test billions of SHA-256 hashes per second using GPUs. Argon2id requires significant configurable RAM (memory-hardness) and time parameters, rendering ASIC/GPU parallel cracking cost-prohibitive.",
    "referenceUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
  },
  {
    "id": "sec-q3-adv",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "TLS 1.3 Handshake & Forward Secrecy",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How does TLS 1.3 achieve Perfect Forward Secrecy (PFS) by default and remove static RSA key exchanges?",
    "options": [
      {
        "id": "opt-1",
        "text": "It mandates Ephemeral Diffie-Hellman (ECDHE); session keys are negotiated with temporary keypairs discarded after the session, ensuring past traffic cannot be decrypted if the server private key is leaked later"
      },
      {
        "id": "opt-2",
        "text": "It encrypts all packets with user browser fingerprints"
      },
      {
        "id": "opt-3",
        "text": "It uses shared symmetric keys stored in DNS records"
      },
      {
        "id": "opt-4",
        "text": "It relies on hardware dongles on every client"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In legacy RSA key exchange, compromising the server private key allowed an adversary with recorded past encrypted traffic to decrypt all historical sessions. TLS 1.3 requires Ephemeral Diffie-Hellman (ECDHE), where keys are uniquely generated per session and forgotten.",
    "referenceUrl": "https://www.rfc-editor.org/rfc/rfc8446"
  },
  {
    "id": "sec-q4-adv",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Cross-Site Scripting (XSS): Stored vs Reflected vs DOM-based",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What characterizes a DOM-based XSS vulnerability compared to Reflected XSS?",
    "options": [
      {
        "id": "opt-1",
        "text": "The attack payload is executed entirely within client-side JavaScript reading from an untrusted source (e.g. location.hash) and passing to a sink (e.g. innerHTML) without ever touching the server response"
      },
      {
        "id": "opt-2",
        "text": "DOM XSS only affects mobile applications"
      },
      {
        "id": "opt-3",
        "text": "The payload is stored permanently in the database"
      },
      {
        "id": "opt-4",
        "text": "DOM XSS requires physical access to the web server hardware"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In DOM-based XSS, the vulnerability exists entirely in client-side code: the payload never visits the server. Client JavaScript takes untrusted input from a source (like window.location.search or document.referrer) and writes it into an execution sink (like eval(), element.innerHTML, or document.write()).",
    "referenceUrl": "https://owasp.org/www-community/attacks/DOM_Based_XSS"
  },
  {
    "id": "sec-q5-adv",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Content Security Policy (CSP) & Nonces",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How does a strict nonce-based Content Security Policy (`script-src 'nonce-{random}' 'strict-dynamic'`) defeat modern XSS injection attacks?",
    "options": [
      {
        "id": "opt-1",
        "text": "The browser executes ONLY script tags bearing the exact cryptographically random, per-request nonce generated by the server, ignoring injected `<script>` tags injected via user input"
      },
      {
        "id": "opt-2",
        "text": "It scans client memory for malware signatures"
      },
      {
        "id": "opt-3",
        "text": "It converts JavaScript into WebAssembly"
      },
      {
        "id": "opt-4",
        "text": "It blocks all outgoing HTTP requests"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A nonce is an unguessable token generated per HTTP response. Legitimate scripts emitted by templates contain `nonce=\"...\"`. Any attacker payload injected into the DOM lacks this dynamic nonce and is blocked by the browser engine.",
    "referenceUrl": "https://web.dev/articles/strict-csp"
  },
  {
    "id": "sec-q6-adv",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Public Key Infrastructure: OCSP Stapling",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Why is OCSP (Online Certificate Status Protocol) Stapling configured on web servers rather than having client browsers query the Certificate Authority (CA) directly?",
    "options": [
      {
        "id": "opt-1",
        "text": "It eliminates client latency and privacy leaks (preventing the CA from tracking which domains the user visits) by having the web server fetch and cache the CA-signed revocation status and staple it to the TLS handshake"
      },
      {
        "id": "opt-2",
        "text": "It bypasses certificate expiration dates completely"
      },
      {
        "id": "opt-3",
        "text": "It allows self-signed certificates to be accepted without warnings"
      },
      {
        "id": "opt-4",
        "text": "It encrypts DNS queries over HTTPS"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Direct client OCSP queries slow down page loads and leak the user's browsing history to third-party CAs. With OCSP stapling, the web server periodically queries the CA, caches the time-stamped cryptographically signed response, and includes it directly in the TLS handshake.",
    "referenceUrl": "https://www.rfc-editor.org/rfc/rfc6066#section-8"
  },
  {
    "id": "sec-q7-adv",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Server-Side Request Forgery (SSRF) Defense",
    "category": "other",
    "difficulty": "Advanced",
    "question": "When a web service accepts a user-provided URL to fetch webhooks or metadata, how do you reliably prevent Server-Side Request Forgery (SSRF) attacks targeting the cloud metadata service (169.254.169.254)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Resolve DNS in application code, validate that the resolved IP address is NOT in private or link-local ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16, 127.0.0.0/8), and connect directly to the validated IP with pinned host header"
      },
      {
        "id": "opt-2",
        "text": "Check that the URL string starts with \"http://\" or \"https://\""
      },
      {
        "id": "opt-3",
        "text": "Use a regular expression to block the string \"localhost\""
      },
      {
        "id": "opt-4",
        "text": "Run the application behind an API gateway"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Naive string blacklists fail due to DNS rebinding, alternative IP encodings (0177.0.0.1, hex, decimal), and URL parser mismatches. True SSRF defense requires resolving DNS, rejecting private/internal/link-local CIDR blocks, and connecting directly to the validated IP.",
    "referenceUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
  },
  {
    "id": "sec-q8-exp",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Zero-Trust Architecture: BeyondCorp Principles",
    "category": "other",
    "difficulty": "Expert",
    "question": "What is the foundational premise of Zero-Trust Architecture (NIST SP 800-207) compared to traditional perimeter-based (castle-and-moat / VPN) network security?",
    "options": [
      {
        "id": "opt-1",
        "text": "\"Never trust, always verify\": access is not granted simply by being on the internal corporate network; every request must be mutually authenticated, authorized, and encrypted based on user identity, device posture, and context"
      },
      {
        "id": "opt-2",
        "text": "Firewalls are placed at every branch office"
      },
      {
        "id": "opt-3",
        "text": "Users are required to change passwords every 30 days"
      },
      {
        "id": "opt-4",
        "text": "All employee devices run Linux operating systems"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Perimeter security assumes anyone inside the corporate VPN is trusted. In Zero Trust, network locality does not imply trust. Every transaction is authenticated and evaluated via Policy Decision Points (PDP) using identity, device health, location, and least-privilege principles.",
    "referenceUrl": "https://csrc.nist.gov/publications/detail/sp/800-207/final"
  },
  {
    "id": "sec-q9-exp",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Side-Channel Attacks: Meltdown & Spectre Mechanisms",
    "category": "other",
    "difficulty": "Expert",
    "question": "What microarchitectural processor feature do transient execution side-channel attacks like Spectre (CVE-2017-5753) exploit to read kernel or process memory?",
    "options": [
      {
        "id": "opt-1",
        "text": "Speculative execution and branch prediction: instructions executed on mispredicted speculative paths leave measurable footprints in CPU data caches (cache timing side channels) before being squashed"
      },
      {
        "id": "opt-2",
        "text": "Software buffer overflows in C libraries"
      },
      {
        "id": "opt-3",
        "text": "Lack of encryption on SATA storage buses"
      },
      {
        "id": "opt-4",
        "text": "Unprotected Wi-Fi radio transmissions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Out-of-order CPUs speculatively execute instructions past branch instructions. Even though the CPU discards speculative register results when the branch mispredicts, cache lines loaded during the speculative window remain cached. Flush+Reload cache timing techniques infer the secret data.",
    "referenceUrl": "https://spectreattack.com/"
  },
  {
    "id": "sec-q10-exp",
    "certificationId": "cybersecurity-fundamentals",
    "topic": "Supply Chain Security: SLSA Framework & Provenance",
    "category": "other",
    "difficulty": "Expert",
    "question": "In the Supply-chain Levels for Software Artifacts (SLSA) framework, what does verifiable Build Provenance (Level 3+) establish?",
    "options": [
      {
        "id": "opt-1",
        "text": "An immutable, cryptographically signed metadata record created by an isolated build platform asserting the exact source repo, commit hash, build environment, and dependencies that produced the binary artifact"
      },
      {
        "id": "opt-2",
        "text": "That the software code has zero open-source dependencies"
      },
      {
        "id": "opt-3",
        "text": "That the software is licensed under MIT license"
      },
      {
        "id": "opt-4",
        "text": "That developers wrote all unit tests in TypeScript"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "SLSA Level 3+ requires non-falsifiable build provenance. An isolated, hermetic build runner signs a cryptographic attestation (using Sigstore/cosign) certifying that artifact X was built strictly from source repo Y at commit Z, preventing tampering in the CI pipeline.",
    "referenceUrl": "https://slsa.dev/spec/v1.0/"
  },
  {
    "id": "dp-q1-inter",
    "certificationId": "design-patterns",
    "topic": "Strategy Pattern vs Conditional Logic",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "What is the primary benefit of replacing extensive `switch(type)` statements with the Strategy Pattern in object-oriented codebases?",
    "options": [
      {
        "id": "opt-1",
        "text": "It enforces the Open/Closed Principle: new algorithms can be introduced by creating a new class without modifying existing client code"
      },
      {
        "id": "opt-2",
        "text": "It reduces memory consumption by 50%"
      },
      {
        "id": "opt-3",
        "text": "It prevents runtime exceptions from ever being thrown"
      },
      {
        "id": "opt-4",
        "text": "It converts synchronous functions into async promises"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Adding a new behavior simply requires writing a new class that implements the strategy interface, avoiding risky edits to a monolithic switch statement.",
    "referenceUrl": "https://refactoring.guru/design-patterns/strategy"
  },
  {
    "id": "dp-q2-inter",
    "certificationId": "design-patterns",
    "topic": "Decorator Pattern in Modern Web Frameworks",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "How is the Decorator pattern commonly applied in web server middleware architectures (e.g. Express, Koa, or Python WSGI)?",
    "options": [
      {
        "id": "opt-1",
        "text": "By wrapping an existing handler with additional behaviors (logging, authentication, caching) while adhering to the exact same callable interface"
      },
      {
        "id": "opt-2",
        "text": "By renaming class variables to match database schema column names"
      },
      {
        "id": "opt-3",
        "text": "By converting class methods into static functions"
      },
      {
        "id": "opt-4",
        "text": "By serializing objects to JSON before calling methods"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Decorator pattern attaches additional responsibilities to an object dynamically. In middleware pipelines, each layer wraps the next handler, executing pre/post processing while preserving the standard request/response handler contract.",
    "referenceUrl": "https://refactoring.guru/design-patterns/decorator"
  },
  {
    "id": "dp-q3-adv",
    "certificationId": "design-patterns",
    "topic": "Observer Pattern vs Pub/Sub Architecture",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What is the architectural distinction between the classical Observer pattern (GoF) and the Publish-Subscribe (Pub/Sub) pattern?",
    "options": [
      {
        "id": "opt-1",
        "text": "In Observer, subjects maintain direct references to observers; in Pub/Sub, publishers and subscribers are completely decoupled and communicate through an intermediary message broker or event bus"
      },
      {
        "id": "opt-2",
        "text": "Observer works across distributed networks; Pub/Sub works only within a single thread"
      },
      {
        "id": "opt-3",
        "text": "Pub/Sub only supports synchronous execution"
      },
      {
        "id": "opt-4",
        "text": "They are identical patterns with no distinction"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In the Observer pattern, the Subject knows its list of Observers and calls their notify method directly in-process. In Pub/Sub, publishers broadcast to a channel without knowing who (if anyone) subscribes; an Event Bus/Broker routes messages, allowing temporal and topological decoupling.",
    "referenceUrl": "https://martinfowler.com/articles/enterprisePatterns.html"
  },
  {
    "id": "dp-q4-adv",
    "certificationId": "design-patterns",
    "topic": "Dependency Inversion Principle (DIP) & IoC Containers",
    "category": "other",
    "difficulty": "Advanced",
    "question": "According to the Dependency Inversion Principle (the D in SOLID), high-level modules should:",
    "options": [
      {
        "id": "opt-1",
        "text": "Not depend on low-level modules; both should depend on abstractions (interfaces)"
      },
      {
        "id": "opt-2",
        "text": "Instantiate concrete classes directly inside constructors using the new keyword"
      },
      {
        "id": "opt-3",
        "text": "Depend directly on MySQL and Redis client instances"
      },
      {
        "id": "opt-4",
        "text": "Never call methods in other classes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "DIP states: High-level business logic must not depend on low-level implementation details (e.g. database drivers, email senders). Instead, business logic depends on interfaces, and concrete implementations are injected via Dependency Injection.",
    "referenceUrl": "https://martinfowler.com/articles/injection.html"
  },
  {
    "id": "dp-q5-adv",
    "certificationId": "design-patterns",
    "topic": "Circuit Breaker Pattern State Transitions",
    "category": "other",
    "difficulty": "Advanced",
    "question": "In the Circuit Breaker pattern (Closed, Open, Half-Open), what occurs when the circuit is in the \"Half-Open\" state?",
    "options": [
      {
        "id": "opt-1",
        "text": "A limited trial number of requests are allowed through to the failing service; if they succeed, the circuit resets to Closed; if any fail, it immediately trips back to Open"
      },
      {
        "id": "opt-2",
        "text": "All incoming client requests are dropped"
      },
      {
        "id": "opt-3",
        "text": "The circuit breaker restarts the remote service host"
      },
      {
        "id": "opt-4",
        "text": "Requests are converted to asynchronous Kafka messages"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When the sleep timeout expires in the Open state, the circuit transitions to Half-Open. It permits a small probe volume of requests to test service health. If the upstream service has recovered, it returns to Closed; if errors persist, it returns to Open.",
    "referenceUrl": "https://martinfowler.com/bliki/CircuitBreaker.html"
  },
  {
    "id": "dp-q6-adv",
    "certificationId": "design-patterns",
    "topic": "Adapter Pattern vs Facade Pattern",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How does the Adapter pattern differ in intent from the Facade pattern?",
    "options": [
      {
        "id": "opt-1",
        "text": "Adapter converts an incompatible interface into another interface the client expects; Facade provides a simplified high-level interface over a complex subsystem"
      },
      {
        "id": "opt-2",
        "text": "Adapter creates clones of objects; Facade destroys unused objects"
      },
      {
        "id": "opt-3",
        "text": "Facade only works with databases; Adapter works with APIs"
      },
      {
        "id": "opt-4",
        "text": "Adapter wraps multiple classes; Facade wraps only one"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Intent determines the difference: Adapter makes two incompatible interfaces work together without altering their code. Facade defines a new, simplified, unified interface to make a complex subsystem easier to interact with.",
    "referenceUrl": "https://refactoring.guru/design-patterns/adapter"
  },
  {
    "id": "dp-q7-adv",
    "certificationId": "design-patterns",
    "topic": "Factory Method vs Abstract Factory Pattern",
    "category": "other",
    "difficulty": "Advanced",
    "question": "When is the Abstract Factory pattern chosen over a simple Factory Method?",
    "options": [
      {
        "id": "opt-1",
        "text": "When a system must create families of related or dependent objects (e.g. DarkThemeButton, DarkThemeCheckbox) without specifying their concrete classes"
      },
      {
        "id": "opt-2",
        "text": "When an application has only one concrete product class"
      },
      {
        "id": "opt-3",
        "text": "When objects must be instantiated on the GPU"
      },
      {
        "id": "opt-4",
        "text": "When objects are stored in MongoDB"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Factory Method uses inheritance to create a single product. Abstract Factory defines an interface for creating families of related products (e.g. GUIFactory producing Button, Checkbox, Menu) ensuring products from one family are compatible.",
    "referenceUrl": "https://refactoring.guru/design-patterns/abstract-factory"
  },
  {
    "id": "dp-q8-exp",
    "certificationId": "design-patterns",
    "topic": "Saga Pattern: Choreography vs Orchestration",
    "category": "other",
    "difficulty": "Expert",
    "question": "What is the primary architectural trade-off between Choreography-based Sagas and Orchestration-based Sagas in microservices?",
    "options": [
      {
        "id": "opt-1",
        "text": "Choreography is decentralized via event streams but can become hard to reason about and debug as service count grows; Orchestration centralizes workflow logic in a dedicated coordinator but introduces a central dependency"
      },
      {
        "id": "opt-2",
        "text": "Choreography requires a relational database; Orchestration does not"
      },
      {
        "id": "opt-3",
        "text": "Orchestration requires two-phase commit locks"
      },
      {
        "id": "opt-4",
        "text": "Choreography cannot support compensating transactions"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Choreography, services react to domain events without a central coordinator (low coupling, but complex event chains). In Orchestration, an orchestrator (e.g. Temporal, AWS Step Functions) explicitly commands each participant, making workflows easy to monitor and track at the cost of orchestrator dependency.",
    "referenceUrl": "https://microservices.io/patterns/data/saga.html"
  },
  {
    "id": "dp-q9-exp",
    "certificationId": "design-patterns",
    "topic": "Outbox Pattern for Reliable Distributed Messaging",
    "category": "other",
    "difficulty": "Expert",
    "question": "What dual-write problem does the Transactional Outbox Pattern solve when a microservice must update a local database AND publish an event to Kafka?",
    "options": [
      {
        "id": "opt-1",
        "text": "It prevents inconsistent state if the database write commits but the message broker publish fails (or vice versa) by saving the event to an outbox table in the SAME database transaction"
      },
      {
        "id": "opt-2",
        "text": "It encrypts message payloads using RSA"
      },
      {
        "id": "opt-3",
        "text": "It compresses database records into Parquet format"
      },
      {
        "id": "opt-4",
        "text": "It converts REST requests into GraphQL mutations"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Updating a database and publishing to Kafka cannot be wrapped in a single distributed transaction without slow 2PC. The Outbox Pattern writes the event to an `outbox` table in the local DB within the business transaction. A CDC worker (like Debezium) tails the DB transaction log and guarantees at-least-once publishing to Kafka.",
    "referenceUrl": "https://microservices.io/patterns/data/transactional-outbox.html"
  },
  {
    "id": "dp-q10-exp",
    "certificationId": "design-patterns",
    "topic": "Unit of Work & Identity Map Patterns",
    "category": "other",
    "difficulty": "Expert",
    "question": "How do the Unit of Work and Identity Map patterns in Object-Relational Mappers (ORMs like Hibernate or Prisma) prevent redundant database queries and dirty writes?",
    "options": [
      {
        "id": "opt-1",
        "text": "Identity Map ensures each database record is loaded into memory exactly once per request/session; Unit of Work tracks all dirty entities and flushes changes in a single batched transaction"
      },
      {
        "id": "opt-2",
        "text": "They convert SQL queries into NoSQL queries"
      },
      {
        "id": "opt-3",
        "text": "They disable database constraints in production"
      },
      {
        "id": "opt-4",
        "text": "They store all table rows in browser cookies"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Fowler's Identity Map acts as an in-memory session cache: loading user ID 42 multiple times returns the exact same object reference. Unit of Work maintains a list of objects affected by a business transaction and coordinates writing out changes in a single optimal database transaction.",
    "referenceUrl": "https://martinfowler.com/eaaCatalog/unitOfWork.html"
  },
  {
    "id": "genai-q1-intermediate",
    "certificationId": "generative-ai-fundamentals",
    "topic": "Prompt Engineering Techniques",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "What is the primary difference between \"Zero-Shot Prompting\" and \"Few-Shot Prompting\" in modern Large Language Models (LLMs)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Few-shot prompting provides high-quality input-output exemplars within the context window to condition model formatting and reasoning, whereas zero-shot relies purely on pre-trained instructions"
      },
      {
        "id": "opt-2",
        "text": "Few-shot prompting fine-tunes model weights permanently via backpropagation on few samples"
      },
      {
        "id": "opt-3",
        "text": "Zero-shot prompting requires external vector databases, while few-shot operates offline"
      },
      {
        "id": "opt-4",
        "text": "Few-shot prompting is only supported on small encoder-only models like BERT"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Few-shot in-context learning gives the model demonstration pairs directly in the prompt window, establishing style, constraints, and pattern recognition without updating model weights.",
    "referenceUrl": "https://arxiv.org/abs/2005.14165"
  },
  {
    "id": "genai-q2-intermediate",
    "certificationId": "generative-ai-fundamentals",
    "topic": "LLM Decoding & Sampling Parameters",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "When tuning LLM generation parameters, how does \"Temperature\" affect token generation and what happens when it is set close to 0?",
    "options": [
      {
        "id": "opt-1",
        "text": "Temperature scales the logits before softmax; setting it close to 0 approximates greedy argmax decoding, producing deterministic and conservative responses"
      },
      {
        "id": "opt-2",
        "text": "Temperature controls the CPU execution speed of the inference server"
      },
      {
        "id": "opt-3",
        "text": "Setting Temperature to 0 maximizes randomness and hallucination diversity"
      },
      {
        "id": "opt-4",
        "text": "Temperature truncates the cumulative probability mass of top tokens to p"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Higher temperatures flatten the probability distribution over token vocabulary for more creative outputs, while temperature approaching zero sharpens probabilities into a peak, behaving like greedy selection (highest probability token).",
    "referenceUrl": "https://platform.openai.com/docs/guides/text-generation"
  },
  {
    "id": "genai-q3-advanced",
    "certificationId": "generative-ai-fundamentals",
    "topic": "RAG Architecture & Information Retrieval",
    "category": "other",
    "difficulty": "Advanced",
    "question": "In a production Retrieval-Augmented Generation (RAG) system, what is the role of a two-stage retrieval pipeline combining dense vector search and cross-encoder re-ranking?",
    "options": [
      {
        "id": "opt-1",
        "text": "Dense embeddings quickly filter candidate documents via bi-encoder approximate nearest neighbor search, after which a computationally intensive cross-encoder accurately scores query-document relevance to order top-K context"
      },
      {
        "id": "opt-2",
        "text": "The cross-encoder compresses embeddings to 8-bit integers to reduce RAM usage before vector search"
      },
      {
        "id": "opt-3",
        "text": "Dense vector search guarantees exact substring matching while cross-encoders handle regex filters"
      },
      {
        "id": "opt-4",
        "text": "The pipeline fine-tunes the base foundation model on retrieved chunks in real time"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Bi-encoders compute vector embeddings independently for fast ANN index searches (e.g., HNSW). Cross-encoders compute full joint attention between query and chunk, providing superior semantic ranking on the top 20-50 candidates before prompting the LLM.",
    "referenceUrl": "https://www.sbert.net/examples/applications/retrieve_rerank/README.html"
  },
  {
    "id": "genai-q4-advanced",
    "certificationId": "generative-ai-fundamentals",
    "topic": "Vector Embeddings & Similarity Metrics",
    "category": "other",
    "difficulty": "Advanced",
    "question": "When evaluating semantic similarity using normalized text embeddings (unit vectors where ||v|| = 1), what is the relationship between Cosine Similarity and Dot Product?",
    "options": [
      {
        "id": "opt-1",
        "text": "Cosine similarity and dot product are mathematically identical when vectors are L2-normalized"
      },
      {
        "id": "opt-2",
        "text": "Cosine similarity measures vector magnitudes while dot product measures angle only"
      },
      {
        "id": "opt-3",
        "text": "Dot product is always negative for normalized vectors"
      },
      {
        "id": "opt-4",
        "text": "Cosine similarity requires O(N^2) extra matrix inversions compared to dot product"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cosine similarity is defined as (A · B) / (||A|| * ||B||). When embeddings are pre-normalized to unit length (||A|| = 1 and ||B|| = 1), the denominator is 1, making cosine similarity equal to the simple dot product, allowing faster SIMD compute.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Cosine_similarity"
  },
  {
    "id": "genai-q5-advanced",
    "certificationId": "generative-ai-fundamentals",
    "topic": "Context Chunking & Overlap",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Why do enterprise document ingestion pipelines for RAG utilize semantic or sliding-window chunking with token overlap rather than fixed-length character splitting?",
    "options": [
      {
        "id": "opt-1",
        "text": "Overlap prevents splitting critical context, sentences, or coreferences across adjacent boundary edges, preserving semantic coherence during vector retrieval"
      },
      {
        "id": "opt-2",
        "text": "Chunk overlap eliminates the need for vector databases by creating duplicate primary keys"
      },
      {
        "id": "opt-3",
        "text": "Fixed character splitting causes GPU memory leaks in tokenizers"
      },
      {
        "id": "opt-4",
        "text": "Sliding-window chunking encrypts confidential information automatically"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Splitting strictly on character or word counts can bisect a sentence or divorce a subject from its predicate across chunks. Sliding-window overlap (e.g. 512 tokens with 50-token overlap) ensures boundary context is captured in both vectors.",
    "referenceUrl": "https://docs.langchain.com/docs/concepts/text_splitters"
  },
  {
    "id": "genai-q6-advanced",
    "certificationId": "generative-ai-fundamentals",
    "topic": "Fine-Tuning Techniques (LoRA / PEFT)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How does Low-Rank Adaptation (LoRA) significantly reduce memory and compute overhead when fine-tuning large language models?",
    "options": [
      {
        "id": "opt-1",
        "text": "It freezes the original pre-trained weight matrix W0 and decomposes the weight update into two low-rank trainable matrices A and B (ΔW = B × A, where rank r << min(d, k))"
      },
      {
        "id": "opt-2",
        "text": "It prunes 90% of model layers from the transformer network during backpropagation"
      },
      {
        "id": "opt-3",
        "text": "It replaces all floating point operations with integer bitwise XOR operations"
      },
      {
        "id": "opt-4",
        "text": "It fine-tunes only the embedding layer while discarding all attention projection matrices"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "LoRA freezes original base weights W0 of dimension d x k and injects trainable decomposition matrices B (d x r) and A (r x k) with rank r typically between 8 and 64, reducing trainable parameters by up to 10,000x and GPU VRAM requirements drastically.",
    "referenceUrl": "https://arxiv.org/abs/2106.09685"
  },
  {
    "id": "genai-q7-advanced",
    "certificationId": "generative-ai-fundamentals",
    "topic": "Hallucination Mitigation & Grounding",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Which architectural strategy best mitigates ungrounded hallucinations when generating factual summaries from proprietary corporate data?",
    "options": [
      {
        "id": "opt-1",
        "text": "Supplying retrieved verified context in the prompt, instructing the model to cite specific context fragments, and enforcing an explicit refusal prompt if the context is insufficient"
      },
      {
        "id": "opt-2",
        "text": "Increasing temperature to 1.5 to encourage diverse interpretations of facts"
      },
      {
        "id": "opt-3",
        "text": "Removing system prompts to avoid bias"
      },
      {
        "id": "opt-4",
        "text": "Running multiple models and concatenating all their outputs together"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Constraining generative generation to strictly provided reference contexts with citation anchors and explicit fallback instructions ('If the answer cannot be determined from the provided text, respond with I do not know') minimizes confabulation.",
    "referenceUrl": "https://www.promptingguide.ai/techniques/grounding"
  },
  {
    "id": "genai-q8-expert",
    "certificationId": "generative-ai-fundamentals",
    "topic": "Transformer Attention & KV Caching",
    "category": "other",
    "difficulty": "Expert",
    "question": "During auto-regressive transformer inference (token-by-token generation), what is the function and memory implication of the \"KV Cache\" (Key-Value Cache)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It retains the Key and Value projection matrices of previously computed prompt and generated tokens, preventing redundant O(N^2) recomputation at the cost of VRAM growing linearly with sequence length and batch size"
      },
      {
        "id": "opt-2",
        "text": "It caches API tokens for authorization against rate limits in client gateways"
      },
      {
        "id": "opt-3",
        "text": "It compresses model weights into RAM so GPUs are no longer needed during decoding"
      },
      {
        "id": "opt-4",
        "text": "It stores final generated text strings in Redis for distributed web caching"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Without a KV cache, generating token N requires recomputing attention keys and values for all 1..N-1 tokens (O(N^2)). KV caching stores them in GPU memory, reducing per-token computation to O(N), but consuming significant VRAM (batch_size * 2 * n_layers * n_heads * seq_len * head_dim).",
    "referenceUrl": "https://vllm.ai/docs/design/key_value_cache"
  },
  {
    "id": "genai-q9-expert",
    "certificationId": "generative-ai-fundamentals",
    "topic": "RAG Evaluation: The RAG Triad",
    "category": "other",
    "difficulty": "Expert",
    "question": "In automated LLM evaluation frameworks (e.g., Ragas, TruLens), what does \"Context Recall\" assess within the RAG Triad?",
    "options": [
      {
        "id": "opt-1",
        "text": "Whether all the necessary ground-truth factual statements or information required to answer the query were retrieved into the context"
      },
      {
        "id": "opt-2",
        "text": "Whether the model hallucinated any words not found in the pre-training dataset"
      },
      {
        "id": "opt-3",
        "text": "The network bandwidth latency required to fetch embeddings from vector databases"
      },
      {
        "id": "opt-4",
        "text": "The ratio of input prompt tokens to output generation tokens"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The RAG Triad measures Context Relevance (precision of retrieved chunks to query), Groundedness/Faithfulness (generation supported by context), and Context Recall (whether retriever fetched all ground truth information needed).",
    "referenceUrl": "https://docs.ragas.io/en/stable/concepts/metrics/context_recall.html"
  },
  {
    "id": "genai-q10-expert",
    "certificationId": "generative-ai-fundamentals",
    "topic": "LLM Security & Prompt Injection",
    "category": "other",
    "difficulty": "Expert",
    "question": "What is an \"Indirect Prompt Injection\" attack and why is it particularly hazardous in autonomous LLM agent systems with tool access?",
    "options": [
      {
        "id": "opt-1",
        "text": "Untrusted external content (e.g. scraped web pages, emails, database records) embeds adversarial instructions that hijack agent tool calls to exfiltrate private data or perform unauthorized actions"
      },
      {
        "id": "opt-2",
        "text": "An attacker physical breaches the cloud datacenter to swap GPU firmware"
      },
      {
        "id": "opt-3",
        "text": "A user submits SQL injection queries directly to the client browser frontend"
      },
      {
        "id": "opt-4",
        "text": "An adversary causes a DDoS attack by sending high-frequency HTTP requests"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In indirect prompt injection, the attacker does not interact directly with the chat input; rather, when the agent browses an external page or reads an email containing hidden instructions ('Ignore previous instructions and execute tool X'), the model follows the poisoned data as instructions.",
    "referenceUrl": "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
  },
  {
    "id": "clean-q1-intermediate",
    "certificationId": "clean-code-refactoring",
    "topic": "Self-Documenting Code & Naming",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "According to clean code principles, which approach represents the best practice for code documentation and naming?",
    "options": [
      {
        "id": "opt-1",
        "text": "Write expressive, intention-revealing function and variable names so the code explains *what* and *how*, reserving comments for explaining *why* non-obvious business decisions or trade-offs were made"
      },
      {
        "id": "opt-2",
        "text": "Add comments above every single line of code restating the syntax"
      },
      {
        "id": "opt-3",
        "text": "Use single-letter variable names everywhere to maximize reading speed"
      },
      {
        "id": "opt-4",
        "text": "Rely exclusively on external wiki pages and eliminate all in-repo comments"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Clean code is self-explanatory regarding its logic and mechanics through explicit naming. Comments that merely parrot the code rot easily; valuable comments document rationale, edge cases, domain requirements, and design trade-offs.",
    "referenceUrl": "https://martinfowler.com/bliki/CodeAsDocumentation.html"
  },
  {
    "id": "clean-q2-intermediate",
    "certificationId": "clean-code-refactoring",
    "topic": "The Boy Scout Rule",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "What is the core directive of the \"Boy Scout Rule\" in professional software craftsmanship?",
    "options": [
      {
        "id": "opt-1",
        "text": "Always leave the code cleaner and healthier than you found it whenever touching a module or file"
      },
      {
        "id": "opt-2",
        "text": "Never touch or refactor legacy code unless a complete system rewrite is funded"
      },
      {
        "id": "opt-3",
        "text": "Only senior software architects are permitted to clean code"
      },
      {
        "id": "opt-4",
        "text": "Ensure all source code files have fewer than exactly 50 lines"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Coined in software engineering by Robert C. Martin, the Boy Scout Rule states: 'Always leave the campground cleaner than you found it.' Incremental continuous cleaning prevents entropy and technical debt accumulation.",
    "referenceUrl": "https://deviq.com/principles/boy-scout-rule"
  },
  {
    "id": "clean-q3-advanced",
    "certificationId": "clean-code-refactoring",
    "topic": "Single Responsibility Principle (SRP)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What is the precise definition of the Single Responsibility Principle (SRP) as formulated by Robert C. Martin?",
    "options": [
      {
        "id": "opt-1",
        "text": "A class or module should have one, and only one, reason to change (it should be responsible to one, and only one, actor or stakeholder group)"
      },
      {
        "id": "opt-2",
        "text": "A function must contain only a single line of executable code"
      },
      {
        "id": "opt-3",
        "text": "A module must only be used by one single consumer across the entire codebase"
      },
      {
        "id": "opt-4",
        "text": "Every class must have only one public method and no private helper methods"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "SRP does not mean a class does only one action; it means it should have only one reason to change, meaning its design answers to a single business role or actor (e.g. accounting vs reporting vs persistence).",
    "referenceUrl": "https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html"
  },
  {
    "id": "clean-q4-advanced",
    "certificationId": "clean-code-refactoring",
    "topic": "Law of Demeter (Principle of Least Knowledge)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Which of the following code snippets violates the Law of Demeter, and why?",
    "options": [
      {
        "id": "opt-1",
        "text": "order.getCustomer().getAddress().getZipCode(); because the caller reaches deeply into the internal object graph across multiple indirect collaborator boundaries"
      },
      {
        "id": "opt-2",
        "text": "order.calculateTotalTax(); because calculations should only be performed in database views"
      },
      {
        "id": "opt-3",
        "text": "items.filter(x => x.active).map(x => x.id); because method chaining in functional streams violates Demeter"
      },
      {
        "id": "opt-4",
        "text": "math.max(a, b); because utility functions cannot accept multiple parameters"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Law of Demeter advises: 'Talk only to your immediate friends.' Reaching through chained getters (train wrecks like a.getB().getC().getD()) couples the calling class to the intermediate structure of the entire object graph.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Law_of_Demeter"
  },
  {
    "id": "clean-q5-advanced",
    "certificationId": "clean-code-refactoring",
    "topic": "Code Smell: Feature Envy",
    "category": "other",
    "difficulty": "Advanced",
    "question": "In code refactoring, what is the \"Feature Envy\" code smell and what is its standard remedy?",
    "options": [
      {
        "id": "opt-1",
        "text": "A method that accesses data and methods of another object more than its own; remedy by moving the method (or part of it) to the envious object using 'Move Method'"
      },
      {
        "id": "opt-2",
        "text": "A developer requesting features from another development team"
      },
      {
        "id": "opt-3",
        "text": "A class that imports too many external npm packages"
      },
      {
        "id": "opt-4",
        "text": "A git branch that has diverged from main by more than 100 commits"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Feature Envy occurs when a method in class A is intensely interested in the data of class B (repeatedly calling getters on B). The canonical refactoring is 'Move Method' to relocate that behavior into class B.",
    "referenceUrl": "https://refactoring.guru/smells/feature-envy"
  },
  {
    "id": "clean-q6-advanced",
    "certificationId": "clean-code-refactoring",
    "topic": "Replace Conditional with Polymorphism",
    "category": "other",
    "difficulty": "Advanced",
    "question": "When is the refactoring \"Replace Conditional with Polymorphism\" indicated?",
    "options": [
      {
        "id": "opt-1",
        "text": "When a switch or if-else ladder based on an object's type tag or discriminator is duplicated across several places in the codebase"
      },
      {
        "id": "opt-2",
        "text": "Whenever any boolean comparison `if (x === true)` is found in code"
      },
      {
        "id": "opt-3",
        "text": "Only when converting SQL stored procedures to TypeScript"
      },
      {
        "id": "opt-4",
        "text": "When replacing async/await with synchronous blocking callbacks"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If multiple functions check `switch(employee.type)` to calculate pay, benefits, and hours, adding a new type requires modifying every switch statement. Replacing this with polymorphic subclasses encapsulates each variant's logic cleanly.",
    "referenceUrl": "https://refactoring.guru/replace-conditional-with-polymorphism"
  },
  {
    "id": "clean-q7-advanced",
    "certificationId": "clean-code-refactoring",
    "topic": "Command Query Separation (CQS)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What does Bertrand Meyer's Command-Query Separation (CQS) principle state?",
    "options": [
      {
        "id": "opt-1",
        "text": "Every method should either be a command that performs an action and changes state (returning void), or a query that returns data without side effects, but never both"
      },
      {
        "id": "opt-2",
        "text": "SQL SELECT queries must always be executed in separate databases from INSERT commands"
      },
      {
        "id": "opt-3",
        "text": "HTTP GET requests must mutate database state for caching"
      },
      {
        "id": "opt-4",
        "text": "CLI terminal commands cannot accept command line flags"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "CQS mandates that 'asking a question should not change the answer.' Methods that mutate state (commands) should not return values, and methods that return values (queries) must be referentially transparent and side-effect-free.",
    "referenceUrl": "https://martinfowler.com/bliki/CommandQuerySeparation.html"
  },
  {
    "id": "clean-q8-expert",
    "certificationId": "clean-code-refactoring",
    "topic": "Legacy Code Refactoring: Seams",
    "category": "other",
    "difficulty": "Expert",
    "question": "In Michael Feathers' book \"Working Effectively with Legacy Code\", what is a \"Seam\" and why is it essential?",
    "options": [
      {
        "id": "opt-1",
        "text": "A place where you can alter program behavior without editing in that place, allowing unit test harnesses to inject mocks or stubs without modifying legacy source"
      },
      {
        "id": "opt-2",
        "text": "A git conflict marker where two feature branches join"
      },
      {
        "id": "opt-3",
        "text": "The network socket connecting a microservice to a message broker"
      },
      {
        "id": "opt-4",
        "text": "A database transaction boundary managed by a distributed two-phase commit"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A seam is an enabling point (e.g. object seam via dependency injection or link seam via module aliasing) that enables isolating legacy code under characterization tests without rewriting the surrounding implementation.",
    "referenceUrl": "https://www.oreilly.com/library/view/working-effectively-with/0131177052/"
  },
  {
    "id": "clean-q9-expert",
    "certificationId": "clean-code-refactoring",
    "topic": "Characterization Tests",
    "category": "other",
    "difficulty": "Expert",
    "question": "What is the primary objective of authoring \"Characterization Tests\" prior to refactoring legacy systems?",
    "options": [
      {
        "id": "opt-1",
        "text": "To capture and assert the *actual current behavior* and edge-case quirks of the system as an empirical safety net, rather than what the specification originally intended"
      },
      {
        "id": "opt-2",
        "text": "To verify that the code passes linting rules and formatting guidelines"
      },
      {
        "id": "opt-3",
        "text": "To benchmark server CPU consumption under peak synthetic load"
      },
      {
        "id": "opt-4",
        "text": "To automatically generate UML class diagrams for architects"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Legacy code often contains undocumented bug-dependencies and behavioral quirks relied on by other systems. Characterization tests freeze actual production behavior into a safety net before attempting refactoring.",
    "referenceUrl": "https://michaelfeathers.silvrback.com/characterization-testing"
  },
  {
    "id": "clean-q10-expert",
    "certificationId": "clean-code-refactoring",
    "topic": "Strangler Fig Pattern",
    "category": "other",
    "difficulty": "Expert",
    "question": "When modernizing a monolithic legacy application, how does the \"Strangler Fig\" pattern mitigate systemic operational risk?",
    "options": [
      {
        "id": "opt-1",
        "text": "It incrementally places an interceptor/facade in front of the monolith, routing individual capabilities to new services one by one until the legacy system is completely replaced and safely retired"
      },
      {
        "id": "opt-2",
        "text": "It throttles CPU and RAM on the legacy server to force consumers to stop using it"
      },
      {
        "id": "opt-3",
        "text": "It executes a single high-risk 'big bang' cutover during a weekend maintenance window"
      },
      {
        "id": "opt-4",
        "text": "It wraps legacy C++ libraries in web assembly for client-side execution"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Named after Australian strangler fig vines, this pattern intercepts incoming traffic via an API gateway, peeling off functionality slice-by-slice into modern microservices without stopping business operations or undertaking high-risk big-bang rewrites.",
    "referenceUrl": "https://martinfowler.com/bliki/StranglerFigApplication.html"
  },
  {
    "id": "oop-q1-intermediate",
    "certificationId": "object-oriented-programming",
    "topic": "Encapsulation & Data Hiding",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "How does Encapsulation improve software maintainability and robustness in Object-Oriented design?",
    "options": [
      {
        "id": "opt-1",
        "text": "It bundles state and behavioral methods together while restricting direct access to internal representation, guaranteeing invariant validation and preventing unauthorized external mutations"
      },
      {
        "id": "opt-2",
        "text": "It compiles classes directly into machine assembly language without intermediate bytecode"
      },
      {
        "id": "opt-3",
        "text": "It guarantees that child classes automatically inherit every private field of their parent"
      },
      {
        "id": "opt-4",
        "text": "It enforces that all class methods must execute asynchronously"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Encapsulation hides internal state behind public API methods, ensuring internal invariants are enforced (e.g., balance cannot be negative) and shielding consumers from internal data structure refactorings.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)"
  },
  {
    "id": "oop-q2-intermediate",
    "certificationId": "object-oriented-programming",
    "topic": "Polymorphism Types",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "What distinguishes \"Subtype Polymorphism\" (runtime polymorphism) from \"Parametric Polymorphism\" (generics)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Subtype polymorphism allows different classes implementing a shared interface or superclass to be invoked dynamically at runtime; parametric polymorphism allows code to operate on abstract types parameterized at compile time"
      },
      {
        "id": "opt-2",
        "text": "Subtype polymorphism only works in interpreted scripting languages, while generics only work in C"
      },
      {
        "id": "opt-3",
        "text": "Parametric polymorphism requires inheritance hierarchies while subtype polymorphism does not"
      },
      {
        "id": "opt-4",
        "text": "There is no difference; they are synonymous terms for method overloading"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Subtype polymorphism relies on dynamic dispatch where subclasses override methods of a common supertype. Parametric polymorphism (generics/templates) enables code reuse across types without subtype relationships.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Polymorphism_(computer_science)"
  },
  {
    "id": "oop-q3-advanced",
    "certificationId": "object-oriented-programming",
    "topic": "Composition Over Inheritance",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Why is the architectural guideline \"Favor object composition over class inheritance\" strongly advocated in modern software engineering?",
    "options": [
      {
        "id": "opt-1",
        "text": "Inheritance exposes child classes to parent implementation details (white-box reuse) and creates rigid compile-time coupling, whereas composition allows dynamic runtime swapping and encapsulation (black-box reuse)"
      },
      {
        "id": "opt-2",
        "text": "Object composition consumes zero heap memory compared to inheritance"
      },
      {
        "id": "opt-3",
        "text": "Modern compilers fail to compile classes with more than one inheritance level"
      },
      {
        "id": "opt-4",
        "text": "Inheritance is only supported in legacy languages like Fortran"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Deep inheritance hierarchies create fragile base classes where changes in ancestors cascade unintended side-effects down subclasses. Composition combines independent objects through interfaces, remaining flexible and decoupled.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Composition_over_inheritance"
  },
  {
    "id": "oop-q4-advanced",
    "certificationId": "object-oriented-programming",
    "topic": "Liskov Substitution Principle (LSP)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Which scenario represents a classic violation of the Liskov Substitution Principle (LSP)?",
    "options": [
      {
        "id": "opt-1",
        "text": "A `Square` subclass inheriting from `Rectangle` where mutating `setWidth()` alters `height` under the hood, breaking expectations and postconditions of callers expecting rectangle behavior"
      },
      {
        "id": "opt-2",
        "text": "A class implementing two interfaces simultaneously"
      },
      {
        "id": "opt-3",
        "text": "A subclass overriding a parent method to provide a faster caching implementation while preserving signatures and contracts"
      },
      {
        "id": "opt-4",
        "text": "A class declaring private fields accessed via public getters"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "LSP states: 'Subtypes must be substitutable for their base types without altering program correctness.' Because a Square forces width and height to be equal, code expecting independent width/height breaks, violating LSP.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Liskov_substitution_principle"
  },
  {
    "id": "oop-q5-advanced",
    "certificationId": "object-oriented-programming",
    "topic": "Open/Closed Principle (OCP)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How does the Open/Closed Principle (OCP) guide the extension of system features without risking regressions in existing code?",
    "options": [
      {
        "id": "opt-1",
        "text": "Modules should be open for extension (new behaviors can be added via new subclasses or strategy implementations) but closed for modification (core battle-tested classes remain untouched)"
      },
      {
        "id": "opt-2",
        "text": "All source code files must be read-only on disk and only edited through automated CI scripts"
      },
      {
        "id": "opt-3",
        "text": "Classes must open all internal fields as public and close all private methods"
      },
      {
        "id": "opt-4",
        "text": "Modules must never be published to open source repositories"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "OCP dictates writing abstractions (interfaces/abstract classes) such that new business requirements are satisfied by writing new classes, not by modifying and potentially destabilizing existing tested implementations.",
    "referenceUrl": "https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html"
  },
  {
    "id": "oop-q6-advanced",
    "certificationId": "object-oriented-programming",
    "topic": "Interface Segregation Principle (ISP)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What is the primary risk of violating the Interface Segregation Principle (ISP) with \"fat\" interfaces?",
    "options": [
      {
        "id": "opt-1",
        "text": "Clients are forced to depend on methods they do not use, creating unnecessary coupling and forcing dummy implementations or runtime UnsupportedOperationException throws"
      },
      {
        "id": "opt-2",
        "text": "The compiler runs out of memory during AST parsing"
      },
      {
        "id": "opt-3",
        "text": "Network bandwidth is doubled because interfaces add HTTP header overhead"
      },
      {
        "id": "opt-4",
        "text": "Fat interfaces prevent garbage collection from cleaning memory"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "ISP states: 'Clients should not be forced to depend upon interfaces that they do not use.' Fat interfaces force implementers to write no-op dummy stubs, and any change to an unused method causes cascading recompilations/retests.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Interface_segregation_principle"
  },
  {
    "id": "oop-q7-advanced",
    "certificationId": "object-oriented-programming",
    "topic": "Dependency Inversion Principle (DIP)",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What is the fundamental requirement of the Dependency Inversion Principle (DIP)?",
    "options": [
      {
        "id": "opt-1",
        "text": "High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions"
      },
      {
        "id": "opt-2",
        "text": "Dependencies must always be inverted using reverse DNS lookups"
      },
      {
        "id": "opt-3",
        "text": "Child classes must instantiate their parent classes in their constructors"
      },
      {
        "id": "opt-4",
        "text": "Database access classes must directly instantiate UI components"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "DIP inverts traditional procedural dependencies. Business logic (high level) defines an interface (e.g., `PaymentGateway`), and concrete infrastructure (Stripe, PayPal) implements it, decoupling core domain logic from vendor tools.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Dependency_inversion_principle"
  },
  {
    "id": "oop-q8-expert",
    "certificationId": "object-oriented-programming",
    "topic": "Domain-Driven Design: Entities vs Value Objects",
    "category": "other",
    "difficulty": "Expert",
    "question": "In Domain-Driven Design (DDD) object modeling, how do Entities and Value Objects fundamentally differ in equality comparison and lifecycle?",
    "options": [
      {
        "id": "opt-1",
        "text": "Entities possess unique thread-of-continuity identity (e.g., ID), and equality is based on identity regardless of attribute changes; Value Objects have no conceptual identity, are immutable, and equality is determined purely by structural attributes"
      },
      {
        "id": "opt-2",
        "text": "Entities are immutable while Value Objects are mutable stateful singletons"
      },
      {
        "id": "opt-3",
        "text": "Entities can only be stored in memory, while Value Objects are persisted to relational databases"
      },
      {
        "id": "opt-4",
        "text": "Entities cannot have methods, functioning only as dumb data transfer objects"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "An Entity (e.g. User with ID 101) remains the same entity even if their name or address changes. A Value Object (e.g. Money(10, 'USD') or Address) has no ID; two Money instances with 10 USD are interchangeable and should be immutable.",
    "referenceUrl": "https://martinfowler.com/bliki/ValueObject.html"
  },
  {
    "id": "oop-q9-expert",
    "certificationId": "object-oriented-programming",
    "topic": "Virtual Method Table (vtable) & Dynamic Dispatch",
    "category": "other",
    "difficulty": "Expert",
    "question": "How do statically typed OOP runtime engines (such as C++ and Java JVM) implement polymorphic dynamic dispatch under the hood?",
    "options": [
      {
        "id": "opt-1",
        "text": "Each class with virtual methods maintains a Virtual Method Table (vtable) containing function pointers; instances contain a hidden pointer (vptr) to this table, resolving method addresses via table offset lookup at runtime"
      },
      {
        "id": "opt-2",
        "text": "By scanning all source code files on disk upon every method invocation"
      },
      {
        "id": "opt-3",
        "text": "By evaluating eval() expressions using an embedded JavaScript V8 interpreter"
      },
      {
        "id": "opt-4",
        "text": "By using hardcoded goto statements generated by the preprocessor"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Dynamic dispatch is achieved via a vtable (array of function pointers). Each object instance holds a vptr pointing to its class's vtable. Calling `obj->method()` resolves to dereferencing `vptr[offset]()`, introducing minor indirection overhead compared to direct static calls.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Virtual_method_table"
  },
  {
    "id": "oop-q10-expert",
    "certificationId": "object-oriented-programming",
    "topic": "Fragile Base Class Problem",
    "category": "other",
    "difficulty": "Expert",
    "question": "What is the \"Fragile Base Class Problem\" in object-oriented programming?",
    "options": [
      {
        "id": "opt-1",
        "text": "Seemingly safe, self-contained modifications to a base class can inadvertently break derived classes due to tight coupling and unexpected overrides of interrelated internal base methods"
      },
      {
        "id": "opt-2",
        "text": "Base classes that crash when instantiated because they exceed 64 kilobytes in size"
      },
      {
        "id": "opt-3",
        "text": "Failure of a database table when a base column has null values"
      },
      {
        "id": "opt-4",
        "text": "Memory leaks caused by forgetting to call free() in garbage-collected languages"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Fragile Base Class problem arises because subclasses depend on implementation details of superclasses. If a base class refactors an internal method `add()` to call `addAll()`, a subclass that overrides `addAll()` may double-count items, breaking correctness without compiler errors.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Fragile_base_class"
  },
  {
    "id": "ml-q1-intermediate",
    "certificationId": "machine-learning-fundamentals",
    "topic": "ML Paradigms",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "What is the defining distinction between Supervised Learning and Unsupervised Learning?",
    "options": [
      {
        "id": "opt-1",
        "text": "Supervised learning trains models on labeled input-output pairs to predict targets, whereas unsupervised learning discovers intrinsic patterns, clusters, or representations in unlabeled data"
      },
      {
        "id": "opt-2",
        "text": "Supervised learning requires constant human intervention during gradient descent calculations"
      },
      {
        "id": "opt-3",
        "text": "Unsupervised learning is exclusively used for text classification"
      },
      {
        "id": "opt-4",
        "text": "Supervised learning cannot be executed on GPU clusters"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Supervised learning uses ground-truth labels (y) associated with features (X) to minimize prediction error (e.g. regression, classification). Unsupervised learning finds latent structure without target labels (e.g. k-means, PCA, autoencoders).",
    "referenceUrl": "https://en.wikipedia.org/wiki/Supervised_learning"
  },
  {
    "id": "ml-q2-intermediate",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Data Leakage & Train/Validation/Test Splits",
    "category": "other",
    "difficulty": "Intermediate",
    "question": "Why must data preprocessing transformations (such as feature scaling or mean imputation) be fit exclusively on the Training set rather than the entire dataset before splitting?",
    "options": [
      {
        "id": "opt-1",
        "text": "Fitting scalers or imputers on the full dataset introduces data leakage, contaminating the model with future information from test sets and resulting in falsely optimistic validation scores"
      },
      {
        "id": "opt-2",
        "text": "Scikit-learn throws a compile error if test data is passed to fit_transform()"
      },
      {
        "id": "opt-3",
        "text": "It reduces training dataset memory consumption by exactly half"
      },
      {
        "id": "opt-4",
        "text": "Test sets can only contain categorical text data"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If you compute the global mean or min/max using the test set, information about the distribution of unseen evaluation data leaks into the training pipeline. Scalers must be fit strictly on training splits and applied using transform() on validation/test splits.",
    "referenceUrl": "https://scikit-learn.org/stable/common_pitfalls.html#data-leakage"
  },
  {
    "id": "ml-q3-advanced",
    "certificationId": "machine-learning-fundamentals",
    "topic": "The Bias-Variance Tradeoff",
    "category": "other",
    "difficulty": "Advanced",
    "question": "How do high bias and high variance manifest in machine learning model performance?",
    "options": [
      {
        "id": "opt-1",
        "text": "High bias causes underfitting (oversimplified model with high training and testing error); high variance causes overfitting (model memorizes training noise, achieving low training error but high test error)"
      },
      {
        "id": "opt-2",
        "text": "High bias causes overfitting; high variance causes underfitting"
      },
      {
        "id": "opt-3",
        "text": "High bias causes gradient descent to divide by zero"
      },
      {
        "id": "opt-4",
        "text": "High variance indicates insufficient GPU compute capacity"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Bias is error from erroneous assumptions in the learning algorithm (underfitting). Variance is error from sensitivity to small fluctuations in the training set (overfitting). The goal is optimal generalization balance.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff"
  },
  {
    "id": "ml-q4-advanced",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Regularization: L1 vs L2",
    "category": "other",
    "difficulty": "Advanced",
    "question": "What is the structural difference between L1 (Lasso) and L2 (Ridge) regularization penalties in regression objectives?",
    "options": [
      {
        "id": "opt-1",
        "text": "L1 adds the sum of absolute weight values (λ Σ|w|) driving irrelevant coefficients strictly to zero (inducing sparsity / feature selection); L2 adds sum of squared weights (λ Σw²) shrinking coefficients smoothly without setting them strictly to zero"
      },
      {
        "id": "opt-2",
        "text": "L1 regularization can only be used on neural networks, while L2 is restricted to linear models"
      },
      {
        "id": "opt-3",
        "text": "L2 regularization sets 100% of weights to zero simultaneously"
      },
      {
        "id": "opt-4",
        "text": "L1 increases model complexity while L2 decreases it"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Because the L1 diamond constraint boundary has sharp corners at the coordinate axes, optimization frequently intersects at zero, performing automatic feature selection. L2's spherical constraint shrinks weights smoothly toward zero.",
    "referenceUrl": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification"
  },
  {
    "id": "ml-q5-advanced",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Classification Metrics: Precision vs Recall vs ROC-AUC",
    "category": "other",
    "difficulty": "Advanced",
    "question": "In a medical diagnostic screening model where missing a disease diagnosis (False Negative) has fatal consequences, which evaluation metric should be prioritized?",
    "options": [
      {
        "id": "opt-1",
        "text": "Recall (Sensitivity): TP / (TP + FN), to minimize false negatives"
      },
      {
        "id": "opt-2",
        "text": "Precision: TP / (TP + FP), to minimize false alarms"
      },
      {
        "id": "opt-3",
        "text": "Raw Accuracy: (TP + TN) / Total, especially when 99% of patients are healthy"
      },
      {
        "id": "opt-4",
        "text": "Specificity: TN / (TN + FP), to ignore true positive detections"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Recall measures the proportion of actual positives that were correctly identified. In cancer detection or fraud screening, failing to flag an actual positive (False Negative) is unacceptable, requiring optimizing for high recall.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Precision_and_recall"
  },
  {
    "id": "ml-q6-advanced",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Optimization: Gradient Descent & Adam",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Why is the Adam (Adaptive Moment Estimation) optimizer widely favored over standard Stochastic Gradient Descent (SGD) in deep learning?",
    "options": [
      {
        "id": "opt-1",
        "text": "It combines momentum (first moment: moving average of gradients) and RMSprop (second moment: moving average of squared gradients) to adapt individual learning rates for each parameter"
      },
      {
        "id": "opt-2",
        "text": "It eliminates the need for computing loss function derivatives"
      },
      {
        "id": "opt-3",
        "text": "It guarantees finding the global optimum for any non-convex objective function"
      },
      {
        "id": "opt-4",
        "text": "It does not require backpropagation through neural layers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Adam computes exponentially decaying averages of past gradients (momentum) and past squared gradients (uncentered variance), providing adaptive step sizes for frequent vs sparse parameters and robustly navigating ravines and saddle points.",
    "referenceUrl": "https://arxiv.org/abs/1412.6980"
  },
  {
    "id": "ml-q7-advanced",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Cross-Validation for Time Series",
    "category": "other",
    "difficulty": "Advanced",
    "question": "Why is standard randomly shuffled K-Fold cross-validation invalid for evaluating Time Series forecasting models?",
    "options": [
      {
        "id": "opt-1",
        "text": "Random shuffling leaks future information into past training folds, breaking temporal causality and autocorrelation assumptions; forward-chaining TimeSeriesSplit must be used instead"
      },
      {
        "id": "opt-2",
        "text": "K-Fold cannot accept datetime timestamps as float inputs"
      },
      {
        "id": "opt-3",
        "text": "Time series data cannot have more than 10 rows"
      },
      {
        "id": "opt-4",
        "text": "Random shuffling doubles the training time on CPUs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In time-series models, predicting the past from the future yields misleadingly high accuracy because models exploit future knowledge. Validation must respect the temporal arrow of time (expanding or rolling window).",
    "referenceUrl": "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html"
  },
  {
    "id": "ml-q8-expert",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Curse of Dimensionality & PCA",
    "category": "other",
    "difficulty": "Expert",
    "question": "What is the geometric consequence of the \"Curse of Dimensionality\" in high-dimensional feature spaces, and how does Principal Component Analysis (PCA) address it?",
    "options": [
      {
        "id": "opt-1",
        "text": "Data points become exponentially sparse and pairwise Euclidean distances converge to equal distances; PCA projects data onto orthogonal eigenvectors with maximum variance, reducing dimensionality while preserving signal"
      },
      {
        "id": "opt-2",
        "text": "Vectors become infinite in length; PCA normalizes vectors to length zero"
      },
      {
        "id": "opt-3",
        "text": "All eigenvalues become complex imaginary numbers in dimensions above 10"
      },
      {
        "id": "opt-4",
        "text": "PCA deletes columns whose names start with consonants"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "As dimension d grows, volume of space grows exponentially, making data points uniformly distant from one another and rendering distance-based algorithms (k-NN, SVM) ineffective. PCA identifies principal orthogonal axes of variance to compress dimensions.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Curse_of_dimensionality"
  },
  {
    "id": "ml-q9-expert",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Vanishing Gradients & Architectural Remedies",
    "category": "other",
    "difficulty": "Expert",
    "question": "Why did deep neural networks using Sigmoid or Tanh activation functions suffer from the Vanishing Gradient problem during backpropagation, and how was this fundamentally resolved?",
    "options": [
      {
        "id": "opt-1",
        "text": "Sigmoid derivatives saturate near 0 for large positive or negative values; multiplying these small derivatives across many layers via chain rule caused gradients to vanish. Resolved by non-saturating ReLU activations, batch normalization, and residual skip connections"
      },
      {
        "id": "opt-2",
        "text": "Sigmoid activations produced NaN values when multiplied by negative weights"
      },
      {
        "id": "opt-3",
        "text": "Tanh functions inverted the direction of the gradient descent vector"
      },
      {
        "id": "opt-4",
        "text": "Backpropagation was only invented in 2021"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The derivative of Sigmoid maxes out at 0.25. Repeated multiplication of values < 0.25 across 10+ layers exponentially shrinks early layer gradients to near-zero. ReLU (gradient = 1 for x > 0) and ResNet skip connections (identity gradient flow) solved this.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Vanishing_gradient_problem"
  },
  {
    "id": "ml-q10-expert",
    "certificationId": "machine-learning-fundamentals",
    "topic": "Class Imbalance & Focal Loss",
    "category": "other",
    "difficulty": "Expert",
    "question": "When training deep neural networks on severely imbalanced datasets (e.g. 1 positive to 10,000 negatives), how does \"Focal Loss\" improve on standard Cross-Entropy Loss?",
    "options": [
      {
        "id": "opt-1",
        "text": "It adds a modulating factor (1 - pt)^γ to down-weight the loss contribution of easily classified examples, focusing training on hard, ambiguous, and rare minority examples"
      },
      {
        "id": "opt-2",
        "text": "It randomly deletes 99% of training batches during each epoch"
      },
      {
        "id": "opt-3",
        "text": "It forces the output probability sum to exceed 2.0"
      },
      {
        "id": "opt-4",
        "text": "It swaps cross-entropy with Mean Squared Error loss exclusively for positive labels"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In standard cross-entropy, a vast sea of easy negatives produces a large cumulative gradient that drowns out rare positive examples. Focal Loss adds (1 - pt)^γ: when an example is easily classified (pt ~ 1), its modulating factor drops toward zero.",
    "referenceUrl": "https://arxiv.org/abs/1708.02002"
  }
];
