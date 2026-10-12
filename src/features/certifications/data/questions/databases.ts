import { Question } from '../../types';

export const DATABASE_QUESTIONS: Question[] = [
  {
    "id": "sql-q1-intermediate",
    "certificationId": "sql-databases",
    "topic": "Index Fundamentals",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "Why does applying a function to a column in a WHERE clause (e.g. WHERE UPPER(email) = \"ALICE@EXAMPLE.COM\") often prevent standard B-tree index utilization?",
    "options": [
      {
        "id": "opt-1",
        "text": "B-tree indexes only support numeric data types"
      },
      {
        "id": "opt-2",
        "text": "The B-tree index is sorted by raw column values, not transformed values, forcing the query planner to perform a full table scan unless a functional index exists"
      },
      {
        "id": "opt-3",
        "text": "The SQL standard forbids functions in WHERE clauses"
      },
      {
        "id": "opt-4",
        "text": "It causes an automatic dead-lock exception"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Standard indexes store the literal values of the column. Wrapping the column in a function prevents index lookups because the database must evaluate the function on every row, requiring a table scan unless an expression index (e.g. CREATE INDEX on UPPER(email)) is defined.",
    "referenceUrl": "https://use-the-index-luke.com/sql/where-clause/functions"
  },
  {
    "id": "sql-q2-intermediate",
    "certificationId": "sql-databases",
    "topic": "JOIN Cardinality & NULLs",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "What is the result of evaluating: SELECT * FROM users WHERE status NOT IN (\"active\", NULL);",
    "options": [
      {
        "id": "opt-1",
        "text": "Returns all users whose status is not \"active\""
      },
      {
        "id": "opt-2",
        "text": "Returns 0 rows (empty result set)"
      },
      {
        "id": "opt-3",
        "text": "Throws a syntax error"
      },
      {
        "id": "opt-4",
        "text": "Returns users whose status is NULL"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "In three-valued SQL logic, NOT IN (..., NULL) expands to (status != \"active\" AND status != NULL). Since comparing anything to NULL evaluates to UNKNOWN, the entire conjunction resolves to UNKNOWN/FALSE, returning zero rows.",
    "referenceUrl": "https://modern-sql.com/concept/three-valued-logic"
  },
  {
    "id": "sql-q3-advanced",
    "certificationId": "sql-databases",
    "topic": "ACID & Isolation Levels",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Under the standard SQL \"Repeatable Read\" isolation level, which concurrency anomaly is still theoretically permitted by the ANSI SQL standard?",
    "options": [
      {
        "id": "opt-1",
        "text": "Dirty Read"
      },
      {
        "id": "opt-2",
        "text": "Non-repeatable Read"
      },
      {
        "id": "opt-3",
        "text": "Phantom Read"
      },
      {
        "id": "opt-4",
        "text": "Dirty Write"
      }
    ],
    "correctOptionId": "opt-3",
    "explanation": "According to the ANSI SQL standard, Repeatable Read prevents Dirty Reads and Non-repeatable (Fuzzy) Reads, but permits Phantom Reads (where a concurrent transaction inserts new matching rows).",
    "referenceUrl": "https://en.wikipedia.org/wiki/Isolation_(database_systems)#Isolation_levels"
  },
  {
    "id": "sql-q4-advanced",
    "certificationId": "sql-databases",
    "topic": "Composite Indexes & Column Order",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Given a composite index on (country_code, created_at, status), which of the following queries can fully utilize all three indexed columns for range and equality filtering?",
    "options": [
      {
        "id": "opt-1",
        "text": "WHERE country_code = \"US\" AND created_at >= \"2026-01-01\" AND status = \"active\""
      },
      {
        "id": "opt-2",
        "text": "WHERE status = \"active\" AND created_at >= \"2026-01-01\""
      },
      {
        "id": "opt-3",
        "text": "WHERE created_at = \"2026-01-01\""
      },
      {
        "id": "opt-4",
        "text": "WHERE country_code != \"US\""
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "B-tree composite indexes must match left-to-right. Query 1 starts with equality on country_code, proceeds to a range condition on created_at, and can filter on status. Queries omitting the leading column country_code cannot use the index for direct seek.",
    "referenceUrl": "https://use-the-index-luke.com/sql/anatomy"
  },
  {
    "id": "sql-q5-advanced",
    "certificationId": "sql-databases",
    "topic": "Window Functions Framing",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "What is the default window frame specification when ORDER BY is present inside an OVER() clause without an explicit ROWS or RANGE clause?",
    "options": [
      {
        "id": "opt-1",
        "text": "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING"
      },
      {
        "id": "opt-2",
        "text": "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW"
      },
      {
        "id": "opt-3",
        "text": "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING"
      },
      {
        "id": "opt-4",
        "text": "RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "When ORDER BY is specified without an explicit frame, SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. This can cause unexpected behavior with duplicate values compared to ROWS framing.",
    "referenceUrl": "https://www.postgresql.org/docs/current/tutorial-window.html"
  },
  {
    "id": "sql-q6-advanced",
    "certificationId": "sql-databases",
    "topic": "EXPLAIN Query Plan Analysis",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "In an EXPLAIN ANALYZE output, what does a \"Bitmap Index Scan\" followed by a \"Bitmap Heap Scan\" indicate?",
    "options": [
      {
        "id": "opt-1",
        "text": "The query executed on an image or bitmap column"
      },
      {
        "id": "opt-2",
        "text": "The planner scanned the index to construct an in-memory bitmap of matching physical page addresses, then visited the table heap in sequential page order to minimize random disk I/O"
      },
      {
        "id": "opt-3",
        "text": "A corrupted index forced an un-indexed scan"
      },
      {
        "id": "opt-4",
        "text": "The query was parallelized across multiple nodes"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "A Bitmap Index Scan collects table page pointers matching the query into a memory bitmap. The subsequent Bitmap Heap Scan visits those pages in sequential disk block order, converting random I/O into sequential I/O.",
    "referenceUrl": "https://www.postgresql.org/docs/current/using-explain.html"
  },
  {
    "id": "sql-q7-advanced",
    "certificationId": "sql-databases",
    "topic": "Deadlock Detection & Resolution",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Which of the following database programming practices is most effective for preventing deadlocks across concurrent transactions updating multiple tables?",
    "options": [
      {
        "id": "opt-1",
        "text": "Acquiring locks on rows and tables in a globally consistent, predetermined order across all application transactions"
      },
      {
        "id": "opt-2",
        "text": "Disabling foreign key constraints"
      },
      {
        "id": "opt-3",
        "text": "Increasing transaction timeout to infinity"
      },
      {
        "id": "opt-4",
        "text": "Using autocommit mode for every write"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Deadlocks occur when two transactions hold locks and wait for each other. Enforcing a strict, deterministic ordering for acquiring locks across all application workflows prevents circular wait conditions.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Deadlock#Prevention"
  },
  {
    "id": "sql-q8-expert",
    "certificationId": "sql-databases",
    "topic": "MVCC & Write Skew",
    "category": "databases",
    "difficulty": "Expert",
    "question": "In PostgreSQL using Repeatable Read (snapshot isolation), what is \"write skew\", and how is it resolved?",
    "options": [
      {
        "id": "opt-1",
        "text": "Two concurrent transactions read overlapping state and write non-overlapping changes that violate a global business invariant; resolved by upgrading to Serializable isolation or using SELECT ... FOR UPDATE"
      },
      {
        "id": "opt-2",
        "text": "A disk hardware error when writing to WAL files"
      },
      {
        "id": "opt-3",
        "text": "A query where WHERE clauses evaluate out of order"
      },
      {
        "id": "opt-4",
        "text": "An overflow of the auto-increment primary key sequence"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Snapshot isolation prevents dirty and non-repeatable reads on individual rows. However, two transactions can read the same state and update disjoint rows that together violate an invariant (write skew). True Serializable isolation (SSI) or explicit locking is required to prevent it.",
    "referenceUrl": "https://wiki.postgresql.org/wiki/SSI"
  },
  {
    "id": "sql-q9-expert",
    "certificationId": "sql-databases",
    "topic": "B-Tree Index Mechanics & Bloat",
    "category": "databases",
    "difficulty": "Expert",
    "question": "What occurs during a B-Tree page split in a relational database, and how does it impact insert performance?",
    "options": [
      {
        "id": "opt-1",
        "text": "When an index page is full and a new key must be inserted, half the keys are moved to a newly allocated page; this requires parent page updates, logging to WAL, and causes index fragmentation/bloat"
      },
      {
        "id": "opt-2",
        "text": "The entire database table is locked in exclusive mode"
      },
      {
        "id": "opt-3",
        "text": "The index is dropped and re-created in the background"
      },
      {
        "id": "opt-4",
        "text": "Page splits only occur during database server restart"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When a B-tree node exceeds capacity, it splits into two 50%-full pages. This causes localized write amplification, WAL logging, and can leave index pages partially empty (bloat), which is why sequential UUIDs or sequential IDs perform better than random UUIDs.",
    "referenceUrl": "https://use-the-index-luke.com/sql/anatomy/the-leaf-nodes"
  },
  {
    "id": "sql-q10-expert",
    "certificationId": "sql-databases",
    "topic": "VACUUM & Transaction ID Wraparound",
    "category": "databases",
    "difficulty": "Expert",
    "question": "In PostgreSQL, why is Transaction ID (TXID) wraparound dangerous, and what mechanism prevents it?",
    "options": [
      {
        "id": "opt-1",
        "text": "PostgreSQL uses 32-bit transaction IDs; after 2 billion transactions, older rows could appear as created in the future (disappearing); VACUUM FREEZE marks old rows as frozen to prevent data loss"
      },
      {
        "id": "opt-2",
        "text": "It causes auto-increment IDs to reset to zero"
      },
      {
        "id": "opt-3",
        "text": "It causes SSL certificates to expire prematurely"
      },
      {
        "id": "opt-4",
        "text": "It limits tables to a maximum of 2GB in size"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Because transaction IDs are 32-bit modulo numbers, failing to freeze transactions before 2^31 writes would cause past rows to appear as belonging to future transactions, making data invisible. Autovacuum aggressively freezes rows to prevent catastrophic wraparound.",
    "referenceUrl": "https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND"
  },
  {
    "id": "pg-q1-inter",
    "certificationId": "postgresql-engineering",
    "topic": "PostgreSQL MVCC & Row Versions",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "How does PostgreSQL implement Multi-Version Concurrency Control (MVCC) when an UPDATE query modifies an existing table row?",
    "options": [
      {
        "id": "opt-1",
        "text": "It leaves the old tuple in place, marks its xmax with the updating transaction ID, and inserts a brand new tuple with xmin set to current transaction ID"
      },
      {
        "id": "opt-2",
        "text": "It overwrites the bytes on disk in-place and logs the undo record in a rollback segment"
      },
      {
        "id": "opt-3",
        "text": "It acquires an exclusive table lock until commit"
      },
      {
        "id": "opt-4",
        "text": "It deletes the row from memory and caches the delta in Redis"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PostgreSQL MVCC is append-only. UPDATE creates a new version of the row tuple with xmin = current xid and flags xmax on the old tuple. Readers determine tuple visibility based on transaction snapshots without locking writers.",
    "referenceUrl": "https://www.postgresql.org/docs/current/mvcc-intro.html"
  },
  {
    "id": "pg-q2-inter",
    "certificationId": "postgresql-engineering",
    "topic": "Indexing: B-Tree vs GIN",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "Which PostgreSQL index type is specifically optimized for querying JSONB documents with the containment operator `@>` or full-text search tsvector columns?",
    "options": [
      {
        "id": "opt-1",
        "text": "GIN (Generalized Inverted Index)"
      },
      {
        "id": "opt-2",
        "text": "B-Tree"
      },
      {
        "id": "opt-3",
        "text": "Hash Index"
      },
      {
        "id": "opt-4",
        "text": "BRIN (Block Range Index)"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "GIN indexes are inverted indexes designed for values containing composite elements (like JSONB keys/values, arrays, and text lexemes). A single GIN entry maps an extracted element to all table row locations containing it.",
    "referenceUrl": "https://www.postgresql.org/docs/current/gin.html"
  },
  {
    "id": "pg-q3-adv",
    "certificationId": "postgresql-engineering",
    "topic": "VACUUM & Transaction ID Wraparound",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Why does PostgreSQL autovacuum periodically perform an aggressive \"freeze\" vacuum across tables (vacuum_freeze_min_age)?",
    "options": [
      {
        "id": "opt-1",
        "text": "To prevent 32-bit transaction ID (xid) wraparound, which would cause past committed transactions to appear to be in the future and become invisible"
      },
      {
        "id": "opt-2",
        "text": "To defragment physical disk partitions"
      },
      {
        "id": "opt-3",
        "text": "To flush uncommitted queries to the cold storage backup"
      },
      {
        "id": "opt-4",
        "text": "To recompile PostgreSQL stored procedures"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PostgreSQL transaction IDs are 32-bit unsigned integers (~4 billion transactions). Because modulo comparison defines past vs future xids, exceeding 2 billion transactions without freezing would cause historical rows to appear in the future (invisible). Freezing replaces old xids with FrozenTransactionId.",
    "referenceUrl": "https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND"
  },
  {
    "id": "pg-q4-adv",
    "certificationId": "postgresql-engineering",
    "topic": "Write-Ahead Logging (WAL) & Checkpoints",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "What is the role of a Checkpoint in PostgreSQL Write-Ahead Logging (WAL) architecture?",
    "options": [
      {
        "id": "opt-1",
        "text": "It flushes all dirty shared memory buffers to disk and records a redo point in the WAL, allowing WAL segments older than the checkpoint to be recycled"
      },
      {
        "id": "opt-2",
        "text": "It creates a full logical backup dump using pg_dump"
      },
      {
        "id": "opt-3",
        "text": "It locks all incoming user read queries until disk space is verified"
      },
      {
        "id": "opt-4",
        "text": "It re-indexes all primary key constraints in parallel"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Checkpoints ensure that dirty shared buffers in memory are written to table data files. Once completed, crash recovery only needs to replay WAL records generated after the checkpoint redo record, limiting recovery time and allowing old WAL files to be deleted.",
    "referenceUrl": "https://www.postgresql.org/docs/current/wal-configuration.html"
  },
  {
    "id": "pg-q5-adv",
    "certificationId": "postgresql-engineering",
    "topic": "EXPLAIN ANALYZE - Cost & Buffer Inspection",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "In PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)` output, what does `Buffers: shared hit=421 read=15` indicate?",
    "options": [
      {
        "id": "opt-1",
        "text": "421 eight-kilobyte data pages were read directly from PostgreSQL shared_buffers cache, while 15 pages had to be read from OS cache or physical disk"
      },
      {
        "id": "opt-2",
        "text": "421 queries succeeded and 15 failed"
      },
      {
        "id": "opt-3",
        "text": "The query created 421 temporary files in /tmp"
      },
      {
        "id": "opt-4",
        "text": "The query executed across 421 network connections"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PostgreSQL reads and writes in 8KB pages. \"shared hit\" indicates blocks located in PostgreSQL memory (shared_buffers). \"shared read\" indicates blocks requested from operating system kernel page cache or storage disk.",
    "referenceUrl": "https://www.postgresql.org/docs/current/using-explain.html"
  },
  {
    "id": "pg-q6-adv",
    "certificationId": "postgresql-engineering",
    "topic": "Transaction Isolation - Repeatable Read Anomalies",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "In PostgreSQL's implementation of the Repeatable Read isolation level, which concurrency anomaly is prevented that standard SQL-92 allows for Repeatable Read?",
    "options": [
      {
        "id": "opt-1",
        "text": "Phantom Reads (PostgreSQL Repeatable Read eliminates phantom reads via snapshot isolation)"
      },
      {
        "id": "opt-2",
        "text": "Write Skew"
      },
      {
        "id": "opt-3",
        "text": "Read-only transaction deadlocks"
      },
      {
        "id": "opt-4",
        "text": "Dirty Reads only"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "SQL-92 standard permits Phantom Reads in Repeatable Read. However, PostgreSQL implements Repeatable Read via Snapshot Isolation (using the snapshot taken at the start of the first non-transaction-control statement). It prevents Dirty Reads, Non-repeatable Reads, AND Phantom Reads. To eliminate Write Skew, Serializable isolation is required.",
    "referenceUrl": "https://www.postgresql.org/docs/current/transaction-iso.html"
  },
  {
    "id": "pg-q7-adv",
    "certificationId": "postgresql-engineering",
    "topic": "BRIN (Block Range Index) Optimization",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "When is a BRIN (Block Range Index) drastically superior to a traditional B-Tree index in terms of storage footprint and write throughput?",
    "options": [
      {
        "id": "opt-1",
        "text": "On multi-billion row tables where data is naturally physically clustered in insertion order (such as time-series created_at timestamps or auto-incrementing IDs)"
      },
      {
        "id": "opt-2",
        "text": "On columns with completely random UUID v4 values"
      },
      {
        "id": "opt-3",
        "text": "On low-cardinality status columns with 3 distinct values"
      },
      {
        "id": "opt-4",
        "text": "On tables that undergo frequent in-place random updates"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "BRIN stores only minimum and maximum values for physical ranges of disk pages (e.g. 128 pages). If data is sorted/correlated with physical disk layout (like append-only timestamps), BRIN indexes are thousands of times smaller than B-Trees and require negligible maintenance during inserts.",
    "referenceUrl": "https://www.postgresql.org/docs/current/brin-intro.html"
  },
  {
    "id": "pg-q8-exp",
    "certificationId": "postgresql-engineering",
    "topic": "Declarative Table Partitioning & Partition Pruning",
    "category": "databases",
    "difficulty": "Expert",
    "question": "How does runtime partition pruning in PostgreSQL optimize queries executed against partitioned tables with parameterized prepared statements?",
    "options": [
      {
        "id": "opt-1",
        "text": "The executor evaluates actual parameter values at query runtime and skips scanning partitions whose bounds cannot match the parameter, avoiding unnecessary sub-table scans"
      },
      {
        "id": "opt-2",
        "text": "It compresses non-matching partitions with zstandard algorithm in real-time"
      },
      {
        "id": "opt-3",
        "text": "It combines all partitions into an in-memory SQLite database"
      },
      {
        "id": "opt-4",
        "text": "It drops old partition tables when query memory exceeds work_mem"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PostgreSQL supports both planner-time pruning and runtime partition pruning. When queries use parameter markers ($1) or subqueries, the planner cannot know the value in advance. Runtime pruning evaluates the parameter during query startup/execution and excludes irrelevant partition scans.",
    "referenceUrl": "https://www.postgresql.org/docs/current/ddl-partitioning.html#DDL-PARTITION-PRUNING"
  },
  {
    "id": "pg-q9-exp",
    "certificationId": "postgresql-engineering",
    "topic": "Serializable Snapshot Isolation (SSI)",
    "category": "databases",
    "difficulty": "Expert",
    "question": "How does PostgreSQL implement Serializable isolation level without acquiring coarse-grained shared table locks or predicate locks that block concurrent readers?",
    "options": [
      {
        "id": "opt-1",
        "text": "Using Serializable Snapshot Isolation (SSI): it tracks SIREAD locks in memory to detect rw-antidependency cycles (dangerous structures) and aborts one transaction with 40001 serialization_failure"
      },
      {
        "id": "opt-2",
        "text": "By serializing all queries into a single operating system thread"
      },
      {
        "id": "opt-3",
        "text": "By using two-phase commit across all client connections"
      },
      {
        "id": "opt-4",
        "text": "By forcing all transactions to execute asynchronously in the background"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PostgreSQL SSI (Michael Cahill's algorithm) uses non-blocking SIREAD locks to detect dependency cycles between concurrent transactions. If a cycle forms that could lead to an anomaly (such as write skew), PostgreSQL immediately aborts the conflicting transaction with serialization_failure (SQLSTATE 40001) for safe client retry.",
    "referenceUrl": "https://wiki.postgresql.org/wiki/SSI"
  },
  {
    "id": "pg-q10-exp",
    "certificationId": "postgresql-engineering",
    "topic": "Connection Pooling & Process Architecture (PgBouncer)",
    "category": "databases",
    "difficulty": "Expert",
    "question": "Why does PostgreSQL require external connection poolers like PgBouncer in transaction pooling mode for high-concurrency microservices?",
    "options": [
      {
        "id": "opt-1",
        "text": "PostgreSQL forks a dedicated OS process (consuming ~5-10 MB RAM and shared memory tracking) per client connection; transaction pooling allows thousands of clients to share a small pool of backend server processes"
      },
      {
        "id": "opt-2",
        "text": "PostgreSQL cannot process TCP packets without PgBouncer"
      },
      {
        "id": "opt-3",
        "text": "PostgreSQL limits total database connections to 16 globally"
      },
      {
        "id": "opt-4",
        "text": "PgBouncer converts SQL queries into binary protobuf RPCs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PostgreSQL is process-based (not thread-based). Each backend connection is a separate OS process with internal caches. Running thousands of direct connections leads to severe CPU context-switching overhead and memory exhaustion. PgBouncer maintains open connections and reuses server processes per transaction.",
    "referenceUrl": "https://www.pgbouncer.org/features.html"
  },
  {
    "id": "mongo-q1-inter",
    "certificationId": "mongodb-engineering",
    "topic": "Aggregation Pipeline Execution Model",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "Why should an aggregation pipeline place the `$match` stage as early in the pipeline as possible?",
    "options": [
      {
        "id": "opt-1",
        "text": "When placed first, $match can utilize database indexes to restrict the documents scanned before memory-intensive stages like $group or $lookup"
      },
      {
        "id": "opt-2",
        "text": "MongoDB syntax throws an error if $match is not the very first stage"
      },
      {
        "id": "opt-3",
        "text": "It converts the pipeline into a MapReduce job"
      },
      {
        "id": "opt-4",
        "text": "It prevents MongoDB from creating transaction logs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The MongoDB query planner optimizes pipelines: an initial $match stage can leverage indexed query execution, drastically reducing the document working set before expensive stages like $group, $sort, or $lookup consume RAM.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/core/aggregation-pipeline-optimization/"
  },
  {
    "id": "mongo-q2-inter",
    "certificationId": "mongodb-engineering",
    "topic": "Compound Index Equality, Sort, Range (ESR) Rule",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "According to MongoDB's ESR (Equality, Sort, Range) rule, what is the optimal compound index field order for: `db.orders.find({ status: \"active\", amount: { $gt: 100 } }).sort({ date: 1 })`?",
    "options": [
      {
        "id": "opt-1",
        "text": "{ status: 1, date: 1, amount: 1 }"
      },
      {
        "id": "opt-2",
        "text": "{ amount: 1, date: 1, status: 1 }"
      },
      {
        "id": "opt-3",
        "text": "{ date: 1, amount: 1, status: 1 }"
      },
      {
        "id": "opt-4",
        "text": "{ amount: 1, status: 1, date: 1 }"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The ESR rule states that index keys should follow: 1. Equality fields (status), 2. Sort fields (date), 3. Range fields (amount). Putting sort before range avoids an in-memory blocking sort while still filtering range values along the index scan.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-rule/"
  },
  {
    "id": "mongo-q3-adv",
    "certificationId": "mongodb-engineering",
    "topic": "Write Concern & Journaling",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "What durability guarantee is provided by a write operation configured with `w: \"majority\", j: true` in a MongoDB replica set?",
    "options": [
      {
        "id": "opt-1",
        "text": "The write has been committed to disk journal on the primary AND written to memory/journal of a majority of voting replica set members before acknowledging"
      },
      {
        "id": "opt-2",
        "text": "The write is asynchronously broadcast to all nodes without waiting"
      },
      {
        "id": "opt-3",
        "text": "The write creates an offsite S3 snapshot before returning"
      },
      {
        "id": "opt-4",
        "text": "The write is buffered in client driver cache until batch of 100"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`w: \"majority\"` ensures the write has propagated to more than half of the voting nodes, making it rollback-safe upon primary failover. `j: true` ensures the write is persisted to the on-disk journal on the primary before acknowledgment.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/reference/write-concern/"
  },
  {
    "id": "mongo-q4-adv",
    "certificationId": "mongodb-engineering",
    "topic": "Read Concern: \"majority\" vs \"linearizable\"",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "When should an application use `readConcern: \"linearizable\"` instead of `readConcern: \"majority\"` in MongoDB?",
    "options": [
      {
        "id": "opt-1",
        "text": "When the application strictly cannot tolerate reading stale data from a partitioned primary that has been superseded by a newly elected primary (split-brain mitigation)"
      },
      {
        "id": "opt-2",
        "text": "When queries require full-text search indexing"
      },
      {
        "id": "opt-3",
        "text": "When reading from secondary members exclusively"
      },
      {
        "id": "opt-4",
        "text": "When reading GridFS binary files"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`readConcern: \"majority\"` reads data committed by a majority of nodes. However, an isolated primary in a network partition might not know it was superseded and could return stale data. \"linearizable\" contacts a majority of replica nodes during the read to verify the primary is still valid.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/"
  },
  {
    "id": "mongo-q5-adv",
    "certificationId": "mongodb-engineering",
    "topic": "Change Streams & Resume Tokens",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "How do MongoDB Change Streams survive temporary network disruptions or client crashes without missing real-time events?",
    "options": [
      {
        "id": "opt-1",
        "text": "Clients pass the `_id` resume token from the last processed change event in `resumeAfter`, allowing MongoDB to replay events from the oplog"
      },
      {
        "id": "opt-2",
        "text": "MongoDB stores missed events in a PostgreSQL backup table"
      },
      {
        "id": "opt-3",
        "text": "Clients must re-query the entire collection from scratch"
      },
      {
        "id": "opt-4",
        "text": "Change streams only support ephemeral push notifications"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Every change stream document includes a unique `_id` resume token. If the consumer disconnects, it passes this token in `watch([], { resumeAfter: token })`. MongoDB inspects the replication oplog and resumes streaming seamlessly from that exact logical point in time.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/changeStreams/"
  },
  {
    "id": "mongo-q6-adv",
    "certificationId": "mongodb-engineering",
    "topic": "WiredTiger Storage Engine Cache Eviction",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "By default, how much system RAM does the WiredTiger storage engine allocate to its internal cache in MongoDB?",
    "options": [
      {
        "id": "opt-1",
        "text": "50% of (RAM - 1 GB), or 256 MB, whichever is larger, leaving the remainder for filesystem page cache and concurrent connections"
      },
      {
        "id": "opt-2",
        "text": "100% of all available physical RAM"
      },
      {
        "id": "opt-3",
        "text": "A fixed 4 GB across all machine sizes"
      },
      {
        "id": "opt-4",
        "text": "WiredTiger operates strictly off-disk without an in-memory cache"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "MongoDB WiredTiger cache size defaults to 50% of (RAM minus 1 GB). The remaining memory is intentionally left to the operating system filesystem page cache, which buffers raw compressed disk blocks and accelerates index/data retrieval.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/core/wiredtiger/#memory-use"
  },
  {
    "id": "mongo-q7-adv",
    "certificationId": "mongodb-engineering",
    "topic": "Schema Design - Embedding vs Referencing",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "In MongoDB schema design, when is referencing (normalized pattern) strictly preferred over embedding (denormalized pattern)?",
    "options": [
      {
        "id": "opt-1",
        "text": "When modeling unbounded 1-to-many relationships (e.g. sensor readings or log streams) to avoid exceeding the 16MB document size limit and document growth fragmentation"
      },
      {
        "id": "opt-2",
        "text": "When documents are smaller than 100 bytes"
      },
      {
        "id": "opt-3",
        "text": "When documents are accessed exclusively by primary key _id"
      },
      {
        "id": "opt-4",
        "text": "Whenever ACID transactions are used"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Embedding is ideal for bounded 1-to-few relationships. For unbounded relationships (e.g. orders with unbounded activity logs), embedding causes documents to continuously grow and eventually hit the hard 16MB BSON size limit. Referencing decouples growth.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/core/data-model-design/"
  },
  {
    "id": "mongo-q8-exp",
    "certificationId": "mongodb-engineering",
    "topic": "Sharding & Jumbo Chunks",
    "category": "databases",
    "difficulty": "Expert",
    "question": "What causes a \"Jumbo Chunk\" in a MongoDB sharded cluster, and why can the balancer not migrate it across shards?",
    "options": [
      {
        "id": "opt-1",
        "text": "A low-cardinality shard key where a single shard key value contains documents exceeding the maximum chunk size, making it impossible for MongoDB to split the chunk"
      },
      {
        "id": "opt-2",
        "text": "A network failure between the config servers and mongos router"
      },
      {
        "id": "opt-3",
        "text": "Corrupt WiredTiger compression blocks"
      },
      {
        "id": "opt-4",
        "text": "Having more than 10 shards in a cluster"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Chunks are split based on shard key values. If millions of documents share the EXACT same shard key value (e.g. status: \"NEW\"), the chunk cannot be split because all documents with the same key must reside on the same chunk. When the chunk exceeds chunksize, it is marked Jumbo and cannot be migrated.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/tutorial/clear-jumbo-flag/"
  },
  {
    "id": "mongo-q9-exp",
    "certificationId": "mongodb-engineering",
    "topic": "Multi-Document ACID Transactions Limits",
    "category": "databases",
    "difficulty": "Expert",
    "question": "What is the default execution time limit for a multi-document distributed transaction in MongoDB before WiredTiger aborts it?",
    "options": [
      {
        "id": "opt-1",
        "text": "60 seconds (transactionLifetimeLimitSeconds), to prevent holding lock resources and snapshot history in WiredTiger cache indefinitely"
      },
      {
        "id": "opt-2",
        "text": "300 milliseconds"
      },
      {
        "id": "opt-3",
        "text": "24 hours"
      },
      {
        "id": "opt-4",
        "text": "Transactions in MongoDB never expire"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "MongoDB transactions are designed for short, atomic multi-document operations. By default, transactions expire after 60 seconds (configured via transactionLifetimeLimitSeconds) to prevent prolonged lock contention and WiredTiger cache pinning of historical MVCC snapshots.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/core/transactions-production-consideration/"
  },
  {
    "id": "mongo-q10-exp",
    "certificationId": "mongodb-engineering",
    "topic": "Raft-based Replica Set Elections & Oplog Truncation",
    "category": "databases",
    "difficulty": "Expert",
    "question": "When a former primary node rejoins a MongoDB replica set after a partition, what mechanism rolls back un-replicated writes committed on the old primary before failover?",
    "options": [
      {
        "id": "opt-1",
        "text": "The node compares its oplog against the new primary; un-replicated writes are extracted into rollback BSON files in the data directory and its local state is reset to the common ancestor point"
      },
      {
        "id": "opt-2",
        "text": "The node immediately reformats its physical disk partition"
      },
      {
        "id": "opt-3",
        "text": "The new primary overwrites its own oplog with the old primary's writes"
      },
      {
        "id": "opt-4",
        "text": "The cluster halts until a database administrator manually resolves conflicts"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If writes were acknowledged without `w: \"majority\"` on the old primary and it partitioned, the newly elected primary has a divergent oplog. When the old primary rejoins as secondary, it identifies the divergence point, writes divergent documents to a rollback directory, and syncs from the new primary.",
    "referenceUrl": "https://www.mongodb.com/docs/manual/core/replica-set-rollbacks/"
  },
  {
    "id": "redis-q1-inter",
    "certificationId": "redis-architecture",
    "topic": "Redis In-Memory Single-Threaded Architecture",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "Why does Redis execute commands sequentially on a single main thread without standard multi-threaded locking overhead?",
    "options": [
      {
        "id": "opt-1",
        "text": "Because memory access is exceptionally fast, and using an event loop (I/O multiplexing via epoll/kqueue) eliminates race conditions and thread synchronization overhead"
      },
      {
        "id": "opt-2",
        "text": "Because operating systems prevent multi-threading on Linux"
      },
      {
        "id": "opt-3",
        "text": "Because Redis runs inside a V8 JavaScript runtime"
      },
      {
        "id": "opt-4",
        "text": "Because multi-threading degrades network card packet throughput"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Redis is CPU-memory bound, not compute bound. Memory access takes nanoseconds. By executing all command mutations on a single main event loop thread using non-blocking I/O multiplexing (epoll), Redis avoids mutex locks, condition variables, and context switching.",
    "referenceUrl": "https://redis.io/docs/latest/develop/interact/programmability/redis-concurrency/"
  },
  {
    "id": "redis-q2-inter",
    "certificationId": "redis-architecture",
    "topic": "Redis Persistence: RDB vs AOF",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "What is the operational difference between Redis RDB snapshots and Append Only File (AOF) persistence?",
    "options": [
      {
        "id": "opt-1",
        "text": "RDB writes point-in-time binary compact snapshots at configured intervals; AOF logs every write command sequentially for near-zero data loss"
      },
      {
        "id": "opt-2",
        "text": "AOF stores data in SQLite; RDB stores data in PostgreSQL"
      },
      {
        "id": "opt-3",
        "text": "RDB is used only for replication, while AOF is used only for caching"
      },
      {
        "id": "opt-4",
        "text": "AOF disables in-memory storage completely"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "RDB creates compact point-in-time binary dumps via fork() copy-on-write, ideal for backups and disaster recovery. AOF logs every write operation (with fsync policies like appendfsync everysec), minimizing data loss during sudden server crashes.",
    "referenceUrl": "https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/"
  },
  {
    "id": "redis-q3-adv",
    "certificationId": "redis-architecture",
    "topic": "Redis Memory Eviction Policies",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "When `maxmemory` is reached, what does the `volatile-lru` eviction policy do compared to `allkeys-lru`?",
    "options": [
      {
        "id": "opt-1",
        "text": "volatile-lru evicts least recently used keys among those with an explicit expiration (TTL) set; allkeys-lru evicts least recently used keys across all keys regardless of TTL"
      },
      {
        "id": "opt-2",
        "text": "volatile-lru deletes keys stored on disk"
      },
      {
        "id": "opt-3",
        "text": "volatile-lru throws an OOM error on every write command"
      },
      {
        "id": "opt-4",
        "text": "allkeys-lru only evicts keys beginning with the prefix \"cache:\""
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`volatile-lru` evaluates only keys that have an expiration set (via EXPIRE/SETEX), preserving permanent configuration or persistent state. `allkeys-lru` treats the entire Redis database as a pure LRU cache, evicting any key based on recency.",
    "referenceUrl": "https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/memory-optimization/"
  },
  {
    "id": "redis-q4-adv",
    "certificationId": "redis-architecture",
    "topic": "Distributed Locking: Redlock Algorithm",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "In the Redlock distributed lock algorithm designed by Salvatore Sanfilippo, how does a client safely acquire a lock across N independent Redis master nodes?",
    "options": [
      {
        "id": "opt-1",
        "text": "It acquires the lock in majority (N/2 + 1) nodes with matching random value and small timeout; total elapsed time must be less than lock validity time"
      },
      {
        "id": "opt-2",
        "text": "It acquires a lock on any single node and tells that node to broadcast via Pub/Sub"
      },
      {
        "id": "opt-3",
        "text": "It pauses all Redis nodes for 100 milliseconds"
      },
      {
        "id": "opt-4",
        "text": "It increments a shared integer counter on node 1"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Single-instance Redis locks are vulnerable if the master crashes before asynchronous replication propagates to the replica. Redlock uses N independent masters (typically 5). A client acquires the lock on at least 3 nodes with a client timeout. If elapsed acquisition time is less than lock validity, the lock is acquired.",
    "referenceUrl": "https://redis.io/docs/latest/develop/use/patterns/distributed-locks/"
  },
  {
    "id": "redis-q5-adv",
    "certificationId": "redis-architecture",
    "topic": "Redis Cluster Hash Slots & Sharding",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "How many total hash slots exist in Redis Cluster, and how does Redis determine which slot stores a given key?",
    "options": [
      {
        "id": "opt-1",
        "text": "16,384 hash slots, computed as `CRC16(key) mod 16384` (or using `{hash_tag}` if curly braces are present in key)"
      },
      {
        "id": "opt-2",
        "text": "1,024 hash slots, computed using MD5 hash algorithm"
      },
      {
        "id": "opt-3",
        "text": "65,536 hash slots, allocated sequentially based on client ID"
      },
      {
        "id": "opt-4",
        "text": "Infinite hash slots, managed by DNS round-robin"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Redis Cluster partitions data across 16,384 logical hash slots. Every master node manages a subset of these slots. Hash tags like `{user100}:profile` ensure keys with the same tag hash to the same slot, allowing multi-key operations on the same node.",
    "referenceUrl": "https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/"
  },
  {
    "id": "redis-q6-adv",
    "certificationId": "redis-architecture",
    "topic": "HyperLogLog for Cardinality Estimation",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "What is the primary architectural advantage of using Redis HyperLogLog (`PFADD`, `PFCOUNT`) over a standard Redis Set for tracking unique website visitors?",
    "options": [
      {
        "id": "opt-1",
        "text": "It estimates cardinality of millions of unique items using a constant 12 KB of memory with a standard error of ~0.81%, whereas a Set grows linearly with element count"
      },
      {
        "id": "opt-2",
        "text": "HyperLogLog stores the full plaintext string of every visitor IP"
      },
      {
        "id": "opt-3",
        "text": "HyperLogLog queries run in GPU memory"
      },
      {
        "id": "opt-4",
        "text": "HyperLogLog guarantees 100% mathematical precision with zero error"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A Set of 100 million UUIDs consumes gigabytes of memory. HyperLogLog is a probabilistic data structure that estimates cardinality up to 2^64 elements using a fixed 12 KB of memory, with typical error under 1%.",
    "referenceUrl": "https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/"
  },
  {
    "id": "redis-q7-adv",
    "certificationId": "redis-architecture",
    "topic": "Redis Pipelining vs MGET/MSET",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "How does Redis command pipelining improve throughput over standard request-response interaction?",
    "options": [
      {
        "id": "opt-1",
        "text": "The client sends multiple commands to the server socket without waiting for individual replies, reading all replies in a single batch to avoid round-trip latency (RTT)"
      },
      {
        "id": "opt-2",
        "text": "It compresses TCP packets using Brotli algorithm"
      },
      {
        "id": "opt-3",
        "text": "It executes commands in parallel on 16 CPU cores"
      },
      {
        "id": "opt-4",
        "text": "It converts write operations into background Redis jobs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Network RTT is often 10-100x slower than Redis execution speed. Pipelining buffers multiple client commands into a single TCP write and reads all responses in a single read, dramatically boosting operations per second.",
    "referenceUrl": "https://redis.io/docs/latest/develop/interact/pipelining/"
  },
  {
    "id": "redis-q8-exp",
    "certificationId": "redis-architecture",
    "topic": "Lua Scripting & Redis Functions Atomicity",
    "category": "databases",
    "difficulty": "Expert",
    "question": "What atomicity guarantee is provided when executing a Redis Lua script via `EVAL` or Redis 7+ Functions?",
    "options": [
      {
        "id": "opt-1",
        "text": "The script executes atomically on the main thread; no other client command or script can run or inspect state until the script completes"
      },
      {
        "id": "opt-2",
        "text": "The script can be rolled back automatically if an error occurs halfway through"
      },
      {
        "id": "opt-3",
        "text": "The script executes in an isolated sandbox with its own separate key-space"
      },
      {
        "id": "opt-4",
        "text": "The script is pre-compiled to C binary machine code"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Redis executes Lua scripts atomically: while a script is running, the main thread runs nothing else. Note that Redis does NOT have traditional transaction rollback: if a script throws a runtime error after modifying keys, earlier mutations remain committed.",
    "referenceUrl": "https://redis.io/docs/latest/develop/interact/programmability/eval-intro/"
  },
  {
    "id": "redis-q9-exp",
    "certificationId": "redis-architecture",
    "topic": "Fork-based Snapshotting & Copy-On-Write (COW)",
    "category": "databases",
    "difficulty": "Expert",
    "question": "Why can triggering `BGSAVE` or AOF rewrite on a Redis instance with high write traffic cause memory usage to spike and trigger Linux OOM Killer?",
    "options": [
      {
        "id": "opt-1",
        "text": "The background child process created by fork() shares parent memory via Copy-On-Write; heavy parent write traffic causes Linux to allocate fresh 4KB/huge pages for modified memory"
      },
      {
        "id": "opt-2",
        "text": "Redis clones the entire database into swap partition before forking"
      },
      {
        "id": "opt-3",
        "text": "The child process opens 10,000 listening TCP sockets"
      },
      {
        "id": "opt-4",
        "text": "RDB snapshots allocate 2 GB per key on disk"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`fork()` creates a child with copy-on-write page sharing. If the master experiences heavy write throughput during snapshotting, every page modification forces the OS kernel to duplicate that memory page for the parent. This can cause total RAM usage to nearly double.",
    "referenceUrl": "https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/memory-optimization/"
  },
  {
    "id": "redis-q10-exp",
    "certificationId": "redis-architecture",
    "topic": "Redis Sentinel Quorum vs Majority",
    "category": "databases",
    "difficulty": "Expert",
    "question": "In Redis Sentinel high availability architecture, what is the role of `quorum` in sentinel.conf (e.g. `sentinel monitor mymaster 127.0.0.1 6379 2`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "The minimum number of Sentinels that must agree the master is unreachable (ODOWN); to actually authorize failover, an elected leader Sentinel must still achieve majority approval"
      },
      {
        "id": "opt-2",
        "text": "The total number of Redis replica nodes required in the cluster"
      },
      {
        "id": "opt-3",
        "text": "The maximum number of seconds before client connection times out"
      },
      {
        "id": "opt-4",
        "text": "The number of failed ping packets required to delete the master node"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Quorum is the number of Sentinels needed to mark a master as Objectively Down (ODOWN). However, triggering the actual failover requires electing a leader Sentinel via Raft-like consensus, which requires a true majority of all configured Sentinels.",
    "referenceUrl": "https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/"
  },
  {
    "id": "mysql-q1-inter",
    "certificationId": "mysql-engineering",
    "topic": "Storage Engines: InnoDB vs MyISAM",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "Why did MySQL adopt InnoDB as the default storage engine replacing MyISAM?",
    "options": [
      {
        "id": "opt-1",
        "text": "InnoDB provides full ACID transaction support, row-level locking (improving concurrent write throughput), foreign key constraints, and crash recovery via redo logging"
      },
      {
        "id": "opt-2",
        "text": "InnoDB stores data in uncompressed CSV files"
      },
      {
        "id": "opt-3",
        "text": "MyISAM does not support indexing"
      },
      {
        "id": "opt-4",
        "text": "InnoDB is restricted to in-memory caching"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "MyISAM relied on table-level locking (every write locked the entire table) and had no transaction or crash recovery support. InnoDB provides full ACID guarantees, row-level locking, and crash resilience through redo log replay.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html"
  },
  {
    "id": "mysql-q2-inter",
    "certificationId": "mysql-engineering",
    "topic": "InnoDB Clustered Index & Secondary Indexes",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "In MySQL InnoDB tables, what is stored in the leaf nodes of a secondary index (non-primary key index)?",
    "options": [
      {
        "id": "opt-1",
        "text": "The indexed column value and the Primary Key value of the row, which is then used to look up the full row in the clustered index"
      },
      {
        "id": "opt-2",
        "text": "The complete row tuple containing all columns"
      },
      {
        "id": "opt-3",
        "text": "The physical operating system disk block address"
      },
      {
        "id": "opt-4",
        "text": "A SHA-256 hash of the entire table"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "InnoDB clusters table data physically around the primary key. Secondary indexes do NOT point directly to physical disk addresses; they store the indexed column plus the row's primary key. A secondary index lookup requires a secondary seek into the clustered index (index lookup).",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html"
  },
  {
    "id": "mysql-q3-adv",
    "certificationId": "mysql-engineering",
    "topic": "Binary Log Formats: ROW vs STATEMENT",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Why is `binlog_format=ROW` mandatory for reliable MySQL replication when queries use non-deterministic functions (e.g. `NOW()`, `UUID()`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "STATEMENT-based replication logs the exact SQL text, causing replicas to generate different UUIDs or timestamps; ROW-based replication logs the exact modified row bytes, guaranteeing replica consistency"
      },
      {
        "id": "opt-2",
        "text": "ROW format compresses binary logs using gzip"
      },
      {
        "id": "opt-3",
        "text": "STATEMENT format is incompatible with transactions"
      },
      {
        "id": "opt-4",
        "text": "ROW format eliminates the need for replication lag monitoring"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "With statement replication, executing `INSERT INTO t VALUES (UUID())` on the replica generates a completely different UUID than on the source. ROW logging logs the actual event data changes, ensuring data is bit-for-bit identical across replicas.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/binary-log-formats.html"
  },
  {
    "id": "mysql-q4-adv",
    "certificationId": "mysql-engineering",
    "topic": "InnoDB Buffer Pool Midpoint Insertion Strategy",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "How does the InnoDB Buffer Pool LRU list prevent full table scans from flushing out frequently accessed hot pages from memory?",
    "options": [
      {
        "id": "opt-1",
        "text": "It uses a midpoint insertion strategy: newly read pages are placed at the head of the \"old\" sublist (3/8 from the tail) and only promoted to the \"young\" sublist if accessed after remaining in buffer pool for `innodb_old_blocks_time`"
      },
      {
        "id": "opt-2",
        "text": "It stores table scan queries on a secondary NVMe drive"
      },
      {
        "id": "opt-3",
        "text": "It disables table scans by default in production"
      },
      {
        "id": "opt-4",
        "text": "It allocates a separate buffer pool for every user"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A naive LRU cache replaces all hot cached pages when a large table scan occurs. InnoDB splits the LRU list into Young (5/8) and Old (3/8). Scanned blocks enter the midpoint (Old sublist). If they are read only once during the scan, they age out without evicting hot Young pages.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html"
  },
  {
    "id": "mysql-q5-adv",
    "certificationId": "mysql-engineering",
    "topic": "Next-Key Locks & Phantom Row Prevention",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "How does InnoDB eliminate Phantom Reads in the default REPEATABLE READ isolation level without locking the entire table?",
    "options": [
      {
        "id": "opt-1",
        "text": "Next-Key Locks: a combination of an index-record lock and a gap lock on the gap preceding the record, preventing concurrent transactions from inserting new rows into scanned index ranges"
      },
      {
        "id": "opt-2",
        "text": "By blocking all read queries while any write is active"
      },
      {
        "id": "opt-3",
        "text": "By disabling INSERT statements in transactions"
      },
      {
        "id": "opt-4",
        "text": "By reading historical data from binary logs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A Next-Key lock locks an index record AND the gap immediately preceding it. When executing `SELECT ... FOR UPDATE WHERE age > 30`, InnoDB locks existing records and sets gap locks over the intervening spaces, preventing other sessions from inserting rows with age > 30.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html#innodb-next-key-locks"
  },
  {
    "id": "mysql-q6-adv",
    "certificationId": "mysql-engineering",
    "topic": "Redo Log vs Undo Log in Crash Recovery",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "What distinct roles do the Redo Log (`ib_logfile`) and Undo Log play during MySQL InnoDB crash recovery?",
    "options": [
      {
        "id": "opt-1",
        "text": "Redo log rolls forward committed transactions that had not yet been flushed from dirty buffer pool pages to disk data files; Undo log rolls back uncommitted transactions that were active during the crash"
      },
      {
        "id": "opt-2",
        "text": "Redo log stores SQL text; Undo log stores JSON backups"
      },
      {
        "id": "opt-3",
        "text": "Undo log is used for master-slave replication exclusively"
      },
      {
        "id": "opt-4",
        "text": "Redo log only stores primary keys"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "InnoDB follows the ARIES recovery algorithm. Upon restart after a crash: 1. Redo log is replayed (rolling forward all changes to restore buffer pool consistency), 2. Undo log is used to roll back transactions that were active and uncommitted at the moment of the crash.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/innodb-recovery.html"
  },
  {
    "id": "mysql-q7-adv",
    "certificationId": "mysql-engineering",
    "topic": "Semi-Synchronous Replication: AFTER_SYNC",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Why is `rpl_semi_sync_master_wait_point = AFTER_SYNC` (lossless semi-sync) safer than `AFTER_COMMIT` in MySQL high-availability clusters?",
    "options": [
      {
        "id": "opt-1",
        "text": "In AFTER_SYNC, the primary waits for at least one replica to acknowledge receiving the binlog event BEFORE committing to the storage engine; if primary crashes, clients never see committed data that fails to exist on the promoted replica"
      },
      {
        "id": "opt-2",
        "text": "AFTER_SYNC runs 10x faster by disabling disk fsync"
      },
      {
        "id": "opt-3",
        "text": "AFTER_COMMIT causes replication sockets to disconnect"
      },
      {
        "id": "opt-4",
        "text": "AFTER_SYNC requires synchronous two-phase commit across all nodes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In `AFTER_COMMIT`, the transaction commits to the storage engine before waiting for replica acknowledgment. If the source crashes after commit but before replica ACK, failover causes data loss (phantom data visible to client A is missing on the new master). `AFTER_SYNC` fixes this.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/replication-semisync.html"
  },
  {
    "id": "mysql-q8-exp",
    "certificationId": "mysql-engineering",
    "topic": "Metadata Locks (MDL) & Online DDL",
    "category": "databases",
    "difficulty": "Expert",
    "question": "Why can executing an `ALTER TABLE` statement on a busy MySQL table trigger a catastrophic connection spike and outage, even with Online DDL?",
    "options": [
      {
        "id": "opt-1",
        "text": "The ALTER statement requests an exclusive Metadata Lock (MDL); if blocked by a long-running SELECT transaction, all subsequent read and write queries queue up behind the pending MDL request, exhausting max_connections"
      },
      {
        "id": "opt-2",
        "text": "Online DDL deletes the table index files"
      },
      {
        "id": "opt-3",
        "text": "MySQL cannot process SELECT statements while tables have indexes"
      },
      {
        "id": "opt-4",
        "text": "The operating system kernel reboots the MySQL service"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Online DDL requires a brief exclusive Metadata Lock (MDL_EXCLUSIVE) at the start and end of the operation. If a slow SELECT query holds a shared MDL, the DDL waits. Because MySQL prioritizes write/exclusive locks, all subsequent SELECT queries queue behind the DDL, rapidly consuming all database connections.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/metadata-locking.html"
  },
  {
    "id": "mysql-q9-exp",
    "certificationId": "mysql-engineering",
    "topic": "ACID Durability: sync_binlog & innodb_flush_log_at_trx_commit",
    "category": "databases",
    "difficulty": "Expert",
    "question": "Which MySQL configuration provides the highest guarantee of zero data loss (full ACID compliance) across sudden operating system power failures?",
    "options": [
      {
        "id": "opt-1",
        "text": "`innodb_flush_log_at_trx_commit = 1` and `sync_binlog = 1`"
      },
      {
        "id": "opt-2",
        "text": "`innodb_flush_log_at_trx_commit = 2` and `sync_binlog = 0`"
      },
      {
        "id": "opt-3",
        "text": "`innodb_flush_log_at_trx_commit = 0` and `sync_binlog = 100`"
      },
      {
        "id": "opt-4",
        "text": "`skip-innodb_doublewrite`"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Setting `innodb_flush_log_at_trx_commit = 1` forces an `fsync()` of the InnoDB redo log on every commit. Setting `sync_binlog = 1` synchronizes the binary log to disk on every commit. This dual configuration guarantees zero data loss on hardware power loss.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_flush_log_at_trx_commit"
  },
  {
    "id": "mysql-q10-exp",
    "certificationId": "mysql-engineering",
    "topic": "MySQL Group Replication (MGR) Consensus",
    "category": "databases",
    "difficulty": "Expert",
    "question": "How does MySQL Group Replication detect and resolve write conflicts when operating in Multi-Primary mode?",
    "options": [
      {
        "id": "opt-1",
        "text": "Certification based on Group Communication System (Paxos): transactions broadcast their write set; all nodes certify transactions deterministically in global order; if concurrent transactions modify the same row version, the first to commit wins and the second aborts"
      },
      {
        "id": "opt-2",
        "text": "By acquiring distributed table locks across all nodes before executing queries"
      },
      {
        "id": "opt-3",
        "text": "By routing all writes to node 1"
      },
      {
        "id": "opt-4",
        "text": "By merging conflicting row data using Git three-way merge"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "MGR uses a Paxos-based consensus engine. In multi-primary mode, nodes execute writes locally without locks. At commit, the transaction's write-set (row primary keys and version snapshots) is broadcast. Every node runs a deterministic certification algorithm; conflicting concurrent transactions abort.",
    "referenceUrl": "https://dev.mysql.com/doc/refman/8.0/en/group-replication.html"
  },
  {
    "id": "dbopt-q1-inter",
    "certificationId": "database-design-optimization",
    "topic": "Relational Database Normalization (1NF to 3NF)",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "In relational schema design, what condition must be satisfied for a database relation to be in Third Normal Form (3NF)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It is in 2NF, and every non-prime attribute is non-transitively dependent on every candidate key (no transitive functional dependencies)"
      },
      {
        "id": "opt-2",
        "text": "All table columns are indexed with unique B-Trees"
      },
      {
        "id": "opt-3",
        "text": "The table contains fewer than 10 columns"
      },
      {
        "id": "opt-4",
        "text": "All relationships are modeled with foreign key cascades"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "1NF requires atomic values. 2NF removes partial key dependencies (attributes dependent on only part of a composite key). 3NF eliminates transitive dependencies (non-key attribute determining another non-key attribute, e.g. ZipCode -> State).",
    "referenceUrl": "https://en.wikipedia.org/wiki/Third_normal_form"
  },
  {
    "id": "dbopt-q2-inter",
    "certificationId": "database-design-optimization",
    "topic": "Strategic Denormalization",
    "category": "databases",
    "difficulty": "Intermediate",
    "question": "When is controlled denormalization an appropriate architectural choice in relational database systems?",
    "options": [
      {
        "id": "opt-1",
        "text": "In read-heavy workloads where repeated expensive multi-table joins degrade latency, and data consistency can be safely maintained via application logic or triggers"
      },
      {
        "id": "opt-2",
        "text": "When disk storage is limited"
      },
      {
        "id": "opt-3",
        "text": "To avoid writing SQL queries"
      },
      {
        "id": "opt-4",
        "text": "Whenever a table has more than 1,000 rows"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Pure normalization eliminates update anomalies but requires many joins during reads. For high-throughput read operations (e.g. duplicating customer_name onto orders), strategic denormalization trades extra write overhead and storage for sub-millisecond read latency.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Denormalization"
  },
  {
    "id": "dbopt-q3-adv",
    "certificationId": "database-design-optimization",
    "topic": "Covering Indexes & Index-Only Scans",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "What constitutes a \"Covering Index\" for a SQL query, and why does it drastically improve performance?",
    "options": [
      {
        "id": "opt-1",
        "text": "An index that contains all columns referenced by the query (in SELECT, WHERE, JOIN, and ORDER BY); the database satisfies the query entirely from index leaf nodes without fetching table data pages (Index-Only Scan)"
      },
      {
        "id": "opt-2",
        "text": "An index that covers every table in the database schema"
      },
      {
        "id": "opt-3",
        "text": "An index that compresses data using zstandard"
      },
      {
        "id": "opt-4",
        "text": "An index that covers full-text search queries exclusively"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A covering index allows the query planner to execute an Index-Only Scan. Because all necessary columns reside inside the index B-Tree leaf pages, the engine skips reading the underlying table data pages, cutting random disk I/O to near zero.",
    "referenceUrl": "https://use-the-index-luke.com/sql/clustering/index-organized-tables-vs-secondary-indexes"
  },
  {
    "id": "dbopt-q4-adv",
    "certificationId": "database-design-optimization",
    "topic": "Primary Key Design: UUID v4 vs UUID v7 vs Sequential IDs",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Why do random UUID v4 values degrade database insert performance on large B-Tree clustered indexes, and how does UUID v7 resolve this?",
    "options": [
      {
        "id": "opt-1",
        "text": "Random UUID v4 causes random insertions across the B-Tree, triggering frequent page splits and cache churn; UUID v7 is time-ordered with an epoch timestamp prefix, restoring append-only sequential B-Tree page insertion efficiency"
      },
      {
        "id": "opt-2",
        "text": "UUID v4 values are not globally unique"
      },
      {
        "id": "opt-3",
        "text": "UUID v7 consumes only 4 bytes of storage"
      },
      {
        "id": "opt-4",
        "text": "Relational databases do not support UUID data types"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Clustered indexes are ordered B-Trees. Inserting random 128-bit UUID v4 keys causes random writes into middle pages, forcing costly B-Tree page splits and thrashing buffer pool cache. UUID v7 embeds a millisecond Unix timestamp in its first 48 bits, guaranteeing chronological ordering.",
    "referenceUrl": "https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html"
  },
  {
    "id": "dbopt-q5-adv",
    "certificationId": "database-design-optimization",
    "topic": "Optimistic vs Pessimistic Concurrency Control",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "In high-concurrency booking systems (e.g. airline seat reservation), when should Optimistic Concurrency Control (OCC) be favored over Pessimistic Locking (`SELECT ... FOR UPDATE`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "When data contention is low to moderate and transactions are long-running (e.g. human checkout flows), avoiding prolonged database row locks that freeze other users"
      },
      {
        "id": "opt-2",
        "text": "When 1000 users attempt to reserve the exact same single seat simultaneously"
      },
      {
        "id": "opt-3",
        "text": "When the database does not support transactions"
      },
      {
        "id": "opt-4",
        "text": "Whenever read-only queries are executed"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Pessimistic locking holds exclusive database locks for the duration of the transaction. If a user spends 3 minutes entering credit card details, no one else can read or touch the locked record. OCC uses a version column (`WHERE id = ? AND version = ?`), failing fast only at commit if modified.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Optimistic_concurrency_control"
  },
  {
    "id": "dbopt-q6-adv",
    "certificationId": "database-design-optimization",
    "topic": "Database Sharding Strategies: Hash vs Range",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "What is the principal disadvantage of Range-Based Sharding (e.g. partitioning by `created_at` date ranges) compared to Hash-Based Sharding?",
    "options": [
      {
        "id": "opt-1",
        "text": "Range sharding on timestamps causes all write traffic to direct into the single latest shard (write hotspot), leaving older historical shards completely idle"
      },
      {
        "id": "opt-2",
        "text": "Range sharding cannot store string values"
      },
      {
        "id": "opt-3",
        "text": "Hash sharding prevents database backups"
      },
      {
        "id": "opt-4",
        "text": "Range sharding requires distributed transactions for all queries"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If a database shards by time range (e.g. Month 1, Month 2, Month 3), all new inserts hit the current month's shard. The system cannot distribute write throughput horizontally across cluster nodes. Hash sharding `hash(userId) % N` evenly distributes write IOPS.",
    "referenceUrl": "https://aws.amazon.com/blogs/database/sharding-with-amazon-relational-database-service/"
  },
  {
    "id": "dbopt-q7-adv",
    "certificationId": "database-design-optimization",
    "topic": "Soft Deletes & Partial Indexing",
    "category": "databases",
    "difficulty": "Advanced",
    "question": "Why does implementing soft deletes (`deleted_at TIMESTAMP NULL`) degrade query performance on standard indexes, and how do Partial (Filtered) Indexes resolve this?",
    "options": [
      {
        "id": "opt-1",
        "text": "Standard indexes index all rows including dead deleted rows; a Partial Index `WHERE deleted_at IS NULL` excludes deleted records, keeping index size small and leaf pages in cache"
      },
      {
        "id": "opt-2",
        "text": "Soft deletes delete the primary key index file"
      },
      {
        "id": "opt-3",
        "text": "Partial indexes only work on temporary tables"
      },
      {
        "id": "opt-4",
        "text": "Soft deletes convert database tables into views"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In soft-delete schemas, 90% of table rows might eventually be marked deleted. A standard B-Tree index contains all these dead rows. Creating a partial index `CREATE INDEX idx_active_users ON users(email) WHERE deleted_at IS NULL` indexes only active rows, maximizing cache density.",
    "referenceUrl": "https://www.postgresql.org/docs/current/indexes-partial.html"
  },
  {
    "id": "dbopt-q8-exp",
    "certificationId": "database-design-optimization",
    "topic": "Storage Engines: B-Trees vs LSM-Trees (Log-Structured Merge-Trees)",
    "category": "databases",
    "difficulty": "Expert",
    "question": "Why do LSM-Tree storage engines (e.g. Cassandra, RocksDB) exhibit drastically higher write throughput than B-Tree storage engines (PostgreSQL, MySQL InnoDB)?",
    "options": [
      {
        "id": "opt-1",
        "text": "LSM-Trees buffer writes in memory (MemTable) and flush sequential append-only immutable files (SSTables) to disk, eliminating B-Trees' expensive random in-place page overwrites and write amplification"
      },
      {
        "id": "opt-2",
        "text": "LSM-Trees do not persist data to physical storage"
      },
      {
        "id": "opt-3",
        "text": "B-Trees can only store integer data"
      },
      {
        "id": "opt-4",
        "text": "LSM-Trees execute in a single OS thread"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "B-Trees update disk pages in-place, requiring random I/O and doublewrite buffers to avoid torn pages. LSM-Trees convert all writes into sequential append-only disk writes. Background compactions merge sorted runs, trading higher read amplification for orders-of-magnitude faster write throughput.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Log-structured_merge-tree"
  },
  {
    "id": "dbopt-q9-exp",
    "certificationId": "database-design-optimization",
    "topic": "Data Warehouse Schemas: Star vs Snowflake",
    "category": "databases",
    "difficulty": "Expert",
    "question": "In analytical data modeling (OLAP), why is the Star Schema generally preferred over the Snowflake Schema in modern columnar data warehouses (e.g. Snowflake, BigQuery, ClickHouse)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Star schemas denormalize dimension tables into simple flat tables, reducing expensive multi-table join hops during complex analytical aggregation queries"
      },
      {
        "id": "opt-2",
        "text": "Snowflake schemas require relational foreign key constraints that modern data warehouses forbid"
      },
      {
        "id": "opt-3",
        "text": "Star schemas use less storage space than Snowflake schemas"
      },
      {
        "id": "opt-4",
        "text": "Columnar warehouses cannot parse normalized tables"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Snowflake schemas normalize dimension hierarchies (e.g. Country -> Region -> Store), saving minimal storage. Columnar engines compress redundant text columns efficiently. Star schemas keep dimensions flat, allowing queries to join the central Fact table directly to Dimension tables without multi-level join graphs.",
    "referenceUrl": "https://en.wikipedia.org/wiki/Star_schema"
  },
  {
    "id": "dbopt-q10-exp",
    "certificationId": "database-design-optimization",
    "topic": "Google Spanner TrueTime & Globally Distributed Linearizability",
    "category": "databases",
    "difficulty": "Expert",
    "question": "How does Google Cloud Spanner provide externally consistent (linearizable) distributed transactions globally without synchronized two-phase locking stalls across continents?",
    "options": [
      {
        "id": "opt-1",
        "text": "TrueTime API bounds clock uncertainty `[earliest, latest]` using synchronized GPS receivers and atomic clocks in every datacenter, waiting out the uncertainty epsilon before committing to ensure monotonically increasing commit timestamps"
      },
      {
        "id": "opt-2",
        "text": "By routing all global transactions through a single primary server in California"
      },
      {
        "id": "opt-3",
        "text": "By using standard NTP time synchronization over public internet"
      },
      {
        "id": "opt-4",
        "text": "By relaxing ACID to eventual consistency"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard NTP has clock drift of hundreds of milliseconds. Spanner's TrueTime uses redundant GPS antennas and atomic clocks to bound clock skew to under ~7ms (epsilon). Transactions pick a commit timestamp and wait epsilon before releasing locks (\"commit wait\"), guaranteeing global serializability.",
    "referenceUrl": "https://cloud.google.com/spanner/docs/true-time-external-consistency"
  }
];
