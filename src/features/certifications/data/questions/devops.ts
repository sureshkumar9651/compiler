import { Question } from '../../types';

export const DEVOPS_QUESTIONS: Question[] = [
  {
    "id": "dckr-q1-intermediate",
    "certificationId": "docker-containers",
    "topic": "Dockerfile Layer Caching",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "Why is it a best practice to copy package.json and run npm install BEFORE copying the rest of the application source code in a Dockerfile?",
    "options": [
      {
        "id": "opt-1",
        "text": "Docker will cache the dependency installation layer and skip re-installing packages when only application code files change"
      },
      {
        "id": "opt-2",
        "text": "npm install fails if application source code files are present"
      },
      {
        "id": "opt-3",
        "text": "It reduces the resulting image size by 50% automatically"
      },
      {
        "id": "opt-4",
        "text": "It enables rootless mode in the container"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Docker builds images in cached layers. If earlier layers have not changed, Docker reuses the cache. Copying package.json first ensures the expensive npm install layer is only rebuilt when dependencies change.",
    "referenceUrl": "https://docs.docker.com/build/cache/"
  },
  {
    "id": "dckr-q2-intermediate",
    "certificationId": "docker-containers",
    "topic": "CMD vs ENTRYPOINT",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is the behavioral difference between ENTRYPOINT and CMD in a Dockerfile?",
    "options": [
      {
        "id": "opt-1",
        "text": "ENTRYPOINT specifies the default executable that is always invoked, while CMD provides default arguments that can be easily overridden from the CLI"
      },
      {
        "id": "opt-2",
        "text": "CMD runs at build time; ENTRYPOINT runs at container runtime"
      },
      {
        "id": "opt-3",
        "text": "ENTRYPOINT is only supported on Linux containers"
      },
      {
        "id": "opt-4",
        "text": "CMD requires root privileges, while ENTRYPOINT does not"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "ENTRYPOINT defines the core binary or command executed when the container starts. CMD provides default arguments appended to ENTRYPOINT, which users can easily replace by supplying arguments to \"docker run\".",
    "referenceUrl": "https://docs.docker.com/reference/dockerfile/#understand-how-cmd-and-entrypoint-interact"
  },
  {
    "id": "dckr-q3-advanced",
    "certificationId": "docker-containers",
    "topic": "Multi-Stage Builds",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What is the primary security and size advantage of utilizing multi-stage builds in a production Dockerfile?",
    "options": [
      {
        "id": "opt-1",
        "text": "Build toolchains, compilers, and development dependencies are discarded, copying only the compiled artifacts into a minimal, stripped runtime image"
      },
      {
        "id": "opt-2",
        "text": "It enables multi-threading in the Docker daemon"
      },
      {
        "id": "opt-3",
        "text": "It automatically encrypts the container filesystem"
      },
      {
        "id": "opt-4",
        "text": "It bypasses Linux kernel cgroup constraints"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Multi-stage builds allow compiling code in a heavy build stage (with SDKs and devDependencies) and copying only the production artifacts into a clean, minimal runtime stage (e.g. alpine or distroless), shrinking attack surface and image size.",
    "referenceUrl": "https://docs.docker.com/build/building/multi-stage/"
  },
  {
    "id": "dckr-q4-advanced",
    "certificationId": "docker-containers",
    "topic": "Linux Namespaces & Isolation",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Which Linux kernel feature is responsible for isolating process IDs so that PID 1 inside a container is isolated from PID 1 on the host?",
    "options": [
      {
        "id": "opt-1",
        "text": "Control Groups (cgroups)"
      },
      {
        "id": "opt-2",
        "text": "PID Namespaces"
      },
      {
        "id": "opt-3",
        "text": "AppArmor profiles"
      },
      {
        "id": "opt-4",
        "text": "iptables rules"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Linux PID namespaces provide an isolated tree of process IDs. A process can be assigned PID 1 inside its own container namespace while having a standard high PID on the host system.",
    "referenceUrl": "https://man7.org/linux/man-pages/man7/pid_namespaces.7.html"
  },
  {
    "id": "dckr-q5-advanced",
    "certificationId": "docker-containers",
    "topic": "Control Groups (cgroups)",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What happens when a container processes memory that exceeds the limit specified by --memory=\"512m\"?",
    "options": [
      {
        "id": "opt-1",
        "text": "The container CPU frequency is throttled"
      },
      {
        "id": "opt-2",
        "text": "The Linux kernel Out-Of-Memory (OOM) killer terminates the offending process with an exit code of 137"
      },
      {
        "id": "opt-3",
        "text": "The container automatically expands memory from swap without limit"
      },
      {
        "id": "opt-4",
        "text": "The container pauses execution until memory is freed"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "When a container exceeds its cgroup memory limit (and swap limit, if applicable), the kernel OOM killer terminates the process (sending SIGKILL, exit code 128 + 9 = 137).",
    "referenceUrl": "https://docs.docker.com/config/containers/resource_constraints/#understand-the-risks-of-running-out-of-memory"
  },
  {
    "id": "dckr-q6-advanced",
    "certificationId": "docker-containers",
    "topic": "Container Security & Non-Root",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Why is it critical to specify a non-root USER in production Docker containers?",
    "options": [
      {
        "id": "opt-1",
        "text": "If an attacker escapes the container filesystem, running as root inside the container grants them root privileges on the underlying host system (unless user namespaces are enabled)"
      },
      {
        "id": "opt-2",
        "text": "Root containers cannot expose network ports below 1024"
      },
      {
        "id": "opt-3",
        "text": "Non-root containers consume 50% less CPU"
      },
      {
        "id": "opt-4",
        "text": "Docker prevents root containers from starting in swarm mode"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "By default, UID 0 inside a container is UID 0 on the host. In the event of a container breakout or mounted socket exploit, an attacker running as root inside the container would possess root privileges on the host kernel.",
    "referenceUrl": "https://docs.docker.com/engine/security/"
  },
  {
    "id": "dckr-q7-advanced",
    "certificationId": "docker-containers",
    "topic": "Docker Networking",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How do containers communicating on a custom user-defined bridge network discover each other by name?",
    "options": [
      {
        "id": "opt-1",
        "text": "Via an embedded Docker DNS server that automatically resolves container names to IP addresses"
      },
      {
        "id": "opt-2",
        "text": "By hardcoding IP entries in /etc/hosts at container start"
      },
      {
        "id": "opt-3",
        "text": "Via multicast mDNS broadcast on port 5353"
      },
      {
        "id": "opt-4",
        "text": "Containers cannot communicate by name on bridge networks"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "User-defined bridge networks feature automatic DNS resolution provided by Docker’s embedded DNS server (127.0.0.11), allowing containers to communicate directly using their container name or service name.",
    "referenceUrl": "https://docs.docker.com/network/drivers/bridge/#differences-between-user-defined-bridges-and-the-default-bridge"
  },
  {
    "id": "dckr-q8-expert",
    "certificationId": "docker-containers",
    "topic": "PID 1 & Zombie Reaping",
    "category": "devops",
    "difficulty": "Expert",
    "question": "Why does running a Node.js or Python application directly as PID 1 in a container often cause zombie process accumulation and poor signal handling (e.g. ignoring SIGTERM)?",
    "options": [
      {
        "id": "opt-1",
        "text": "In Linux, PID 1 has special responsibility for adopting orphaned processes and reaping zombies (waitpid), and standard runtimes do not install signal handlers for default signals like SIGTERM as PID 1"
      },
      {
        "id": "opt-2",
        "text": "PID 1 is restricted from receiving network traffic"
      },
      {
        "id": "opt-3",
        "text": "Linux kills PID 1 if memory consumption exceeds 100MB"
      },
      {
        "id": "opt-4",
        "text": "Node.js is incompatible with Linux kernel signals"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The kernel treats PID 1 differently: default signal handlers are not registered, so SIGTERM is ignored unless explicitly caught. Additionally, PID 1 must reap orphaned zombie child processes. Using an init system like tini (docker run --init) solves this.",
    "referenceUrl": "https://github.com/krallin/tini"
  },
  {
    "id": "dckr-q9-expert",
    "certificationId": "docker-containers",
    "topic": "Linux Capabilities & Seccomp",
    "category": "devops",
    "difficulty": "Expert",
    "question": "What is the purpose of passing --cap-drop=ALL to docker run?",
    "options": [
      {
        "id": "opt-1",
        "text": "It strips all Linux root capabilities from the container process, enforcing the principle of least privilege against kernel exploitation"
      },
      {
        "id": "opt-2",
        "text": "It limits network bandwidth to zero"
      },
      {
        "id": "opt-3",
        "text": "It disables GPU acceleration"
      },
      {
        "id": "opt-4",
        "text": "It forces synchronous disk writes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Linux divides root privileges into distinct capabilities (CAP_CHOWN, CAP_NET_ADMIN, CAP_SYS_ADMIN, etc.). Dropping all capabilities (--cap-drop=ALL) and adding back only what is necessary drastically reduces the blast radius of container escapes.",
    "referenceUrl": "https://docs.docker.com/engine/security/#linux-kernel-capabilities"
  },
  {
    "id": "dckr-q10-expert",
    "certificationId": "docker-containers",
    "topic": "Docker Socket Security",
    "category": "devops",
    "difficulty": "Expert",
    "question": "Why is mounting /var/run/docker.sock into an untrusted container a severe security vulnerability equivalent to granting root access to the host?",
    "options": [
      {
        "id": "opt-1",
        "text": "Any process with write access to docker.sock can command the host Docker daemon to launch privileged containers with root filesystem mounts of the host"
      },
      {
        "id": "opt-2",
        "text": "The docker.sock contains unencrypted plaintext passwords for all users"
      },
      {
        "id": "opt-3",
        "text": "It causes the host operating system to crash immediately"
      },
      {
        "id": "opt-4",
        "text": "It disables firewall rules on port 22"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Access to the Docker socket allows communicating directly with the root Docker daemon on the host. An attacker can create a container with -v /:/host and --privileged, gaining unconstrained root access over the host machine.",
    "referenceUrl": "https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html#rule-1-do-not-expose-the-docker-daemon-socket"
  },
  {
    "id": "git-q1-intermediate",
    "certificationId": "git-collaboration",
    "topic": "Git Object Model",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What are the four fundamental object types stored in the Git content-addressable database (.git/objects)?",
    "options": [
      {
        "id": "opt-1",
        "text": "blob, tree, commit, tag"
      },
      {
        "id": "opt-2",
        "text": "file, folder, branch, remote"
      },
      {
        "id": "opt-3",
        "text": "patch, diff, revision, release"
      },
      {
        "id": "opt-4",
        "text": "index, head, stage, stash"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Git represents everything with four immutable objects: \"blob\" (raw file content), \"tree\" (directory listing pointing to blobs and sub-trees), \"commit\" (author, message, parent pointers, root tree), and annotated \"tag\".",
    "referenceUrl": "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects"
  },
  {
    "id": "git-q2-intermediate",
    "certificationId": "git-collaboration",
    "topic": "Merge vs Rebase",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What does \"git rebase main\" do when executed on a feature branch?",
    "options": [
      {
        "id": "opt-1",
        "text": "It merges main into the feature branch with a merge commit"
      },
      {
        "id": "opt-2",
        "text": "It rewrites the feature branch commits by reapplying them one by one on top of the latest tip of main, creating a linear history"
      },
      {
        "id": "opt-3",
        "text": "It deletes all commits on the feature branch"
      },
      {
        "id": "opt-4",
        "text": "It pushes the branch to the remote origin"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "Rebasing finds the common ancestor between the current branch and the target branch, temporarily stashes the feature branch commits, updates the branch pointer to the target branch tip, and reapplies each commit sequentially.",
    "referenceUrl": "https://git-scm.com/docs/git-rebase"
  },
  {
    "id": "git-q3-advanced",
    "certificationId": "git-collaboration",
    "topic": "Git Reflog & Disaster Recovery",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "A developer accidentally executes \"git reset --hard HEAD~5\", losing their un-pushed commits. How can these commits be recovered?",
    "options": [
      {
        "id": "opt-1",
        "text": "They cannot be recovered; git reset --hard permanently deletes data immediately"
      },
      {
        "id": "opt-2",
        "text": "By inspecting \"git reflog\" to identify the SHA-1 commit hash before the reset, and checking out or resetting to that hash"
      },
      {
        "id": "opt-3",
        "text": "By downloading the commits from GitHub"
      },
      {
        "id": "opt-4",
        "text": "By running git fsck --revert"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "The Git reflog records all updates to branch tips and HEAD. Even if commits are no longer reachable from any branch, they remain in the reflog and object database until pruned by garbage collection (typically 30-90 days).",
    "referenceUrl": "https://git-scm.com/docs/git-reflog"
  },
  {
    "id": "git-q4-advanced",
    "certificationId": "git-collaboration",
    "topic": "Automated Debugging with git bisect",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How does \"git bisect\" locate the specific commit that introduced a regression in a repository of 5,000 commits?",
    "options": [
      {
        "id": "opt-1",
        "text": "It tests every single commit sequentially from oldest to newest"
      },
      {
        "id": "opt-2",
        "text": "It uses binary search: checking out the midpoint commit between known good and bad revisions, requiring only ~12-13 steps"
      },
      {
        "id": "opt-3",
        "text": "It scans git commit messages for the word \"bug\""
      },
      {
        "id": "opt-4",
        "text": "It compiles and executes the entire git log in parallel"
      }
    ],
    "correctOptionId": "opt-2",
    "explanation": "git bisect performs a binary search algorithm through commit history. For N commits, it finds the breaking commit in O(log2 N) iterations (~13 checks for 5,000 commits). It can even be automated via \"git bisect run <test-script>\".",
    "referenceUrl": "https://git-scm.com/docs/git-bisect"
  },
  {
    "id": "git-q5-advanced",
    "certificationId": "git-collaboration",
    "topic": "Cherry-Pick Mainline Flag",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "When cherry-picking a merge commit (e.g. git cherry-pick -m 1 <commit-hash>), what does the \"-m 1\" flag signify?",
    "options": [
      {
        "id": "opt-1",
        "text": "It instructs Git to use the first parent of the merge commit as the mainline reference to compute the diff against"
      },
      {
        "id": "opt-2",
        "text": "It limits the cherry-pick to 1 file"
      },
      {
        "id": "opt-3",
        "text": "It specifies a commit message timeout of 1 minute"
      },
      {
        "id": "opt-4",
        "text": "It squashes the cherry-pick into a single commit"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A merge commit has two (or more) parent commits. Git cannot determine which branch’s changes to replay unless specified. \"-m 1\" specifies that parent 1 (the branch into which the merge occurred) is the baseline.",
    "referenceUrl": "https://git-scm.com/docs/git-cherry-pick#Documentation/git-cherry-pick.txt--mltparent-numbergt"
  },
  {
    "id": "git-q6-advanced",
    "certificationId": "git-collaboration",
    "topic": "Detached HEAD State",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What occurs when a repository is in a \"detached HEAD\" state?",
    "options": [
      {
        "id": "opt-1",
        "text": "HEAD points directly to a specific commit hash rather than a named branch reference"
      },
      {
        "id": "opt-2",
        "text": "The working directory is completely deleted"
      },
      {
        "id": "opt-3",
        "text": "The repository cannot connect to remote servers"
      },
      {
        "id": "opt-4",
        "text": "Git is executing in read-only mode"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Normally, HEAD points to a named branch reference (e.g. refs/heads/main). In a detached HEAD state, HEAD points directly to a commit hash. Any new commits made in this state will be orphaned if the user switches branches without creating a branch reference.",
    "referenceUrl": "https://git-scm.com/docs/git-checkout#_detached_head"
  },
  {
    "id": "git-q7-advanced",
    "certificationId": "git-collaboration",
    "topic": "Index vs Working Tree vs HEAD",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What does \"git reset --soft HEAD~1\" do to the working directory and staging area (index)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Moves HEAD back one commit, leaving both the index (staged changes) and working tree intact with the undone commit's changes ready to re-commit"
      },
      {
        "id": "opt-2",
        "text": "Discards all working tree changes permanently"
      },
      {
        "id": "opt-3",
        "text": "Unstages changes and reverts working tree files"
      },
      {
        "id": "opt-4",
        "text": "Reverts the commit by creating an inverse commit"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "--soft moves the HEAD reference back by one commit without touching the index or working directory. The changes from the undone commit remain staged in the index.",
    "referenceUrl": "https://git-scm.com/docs/git-reset"
  },
  {
    "id": "git-q8-expert",
    "certificationId": "git-collaboration",
    "topic": "Packfiles & Delta Compression",
    "category": "devops",
    "difficulty": "Expert",
    "question": "How does Git store large volumes of revision history efficiently using packfiles (.pack)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It groups objects into packfiles using sliding-window delta compression, storing newer objects as deltas against older objects (or vice-versa) and indexing them with .idx files"
      },
      {
        "id": "opt-2",
        "text": "It removes historical commits older than 1 year"
      },
      {
        "id": "opt-3",
        "text": "It stores files in an external SQLite database"
      },
      {
        "id": "opt-4",
        "text": "It uploads commits directly to remote storage"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Loose objects are individual zlib-compressed files. Git periodically packs objects into packfiles using sliding-window heuristics to compute binary deltas between similar files, drastically reducing repository disk footprint.",
    "referenceUrl": "https://git-scm.com/book/en/v2/Git-Internals-Packfiles"
  },
  {
    "id": "git-q9-expert",
    "certificationId": "git-collaboration",
    "topic": "Git Worktrees",
    "category": "devops",
    "difficulty": "Expert",
    "question": "What is the advantage of using \"git worktree add\" instead of cloning the same repository multiple times?",
    "options": [
      {
        "id": "opt-1",
        "text": "It checks out multiple branches simultaneously in separate directories while sharing the same underlying .git object database and configuration"
      },
      {
        "id": "opt-2",
        "text": "It disables merge conflicts across branches"
      },
      {
        "id": "opt-3",
        "text": "It runs background unit tests automatically"
      },
      {
        "id": "opt-4",
        "text": "It converts the repository into a monorepo"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Git worktrees permit multiple working directories linked to a single repository. Each worktree can have a distinct branch checked out at the same time, sharing all object storage and local branches without duplicating clones.",
    "referenceUrl": "https://git-scm.com/docs/git-worktree"
  },
  {
    "id": "git-q10-expert",
    "certificationId": "git-collaboration",
    "topic": "Hooks & Security Integrity",
    "category": "devops",
    "difficulty": "Expert",
    "question": "Why are client-side Git hooks (.git/hooks/) NOT cloned when running \"git clone\", and how should security checks be enforced reliably?",
    "options": [
      {
        "id": "opt-1",
        "text": "Allowing a remote repository to execute arbitrary shell scripts upon cloning would be a critical remote code execution vulnerability; security checks must be enforced in server-side pre-receive hooks or CI/CD pipelines"
      },
      {
        "id": "opt-2",
        "text": "Git hooks are deprecated in Git 2.0"
      },
      {
        "id": "opt-3",
        "text": "Git hooks only run on Windows machines"
      },
      {
        "id": "opt-4",
        "text": "Client hooks can only be written in Python"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "If client hooks were copied and activated by git clone, any cloned repository could run malicious scripts on the user’s computer. True enforcement must occur on the remote server (e.g. server-side pre-receive hook or CI server).",
    "referenceUrl": "https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks"
  },
  {
    "id": "k8s-q1-inter",
    "certificationId": "kubernetes-architecture",
    "topic": "Pod Health Probes: Liveness vs Readiness",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is the operational difference between a Liveness Probe and a Readiness Probe in a Kubernetes Pod spec?",
    "options": [
      {
        "id": "opt-1",
        "text": "Liveness probe failure causes kubelet to restart the container; readiness probe failure removes the Pod from Service endpoints so it stops receiving client traffic"
      },
      {
        "id": "opt-2",
        "text": "Readiness probe terminates the underlying EC2/cloud node"
      },
      {
        "id": "opt-3",
        "text": "Liveness probe runs only once during pod startup; readiness probe runs continuously"
      },
      {
        "id": "opt-4",
        "text": "They are identical probes evaluated by etcd"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Liveness probes detect deadlocks or unrecoverable application hangs (kubelet restarts the container). Readiness probes verify if the application is ready to accept user requests (if failing, kubelet removes the pod IP from matching Service endpoints).",
    "referenceUrl": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
  },
  {
    "id": "k8s-q2-inter",
    "certificationId": "kubernetes-architecture",
    "topic": "Kubernetes Services: ClusterIP vs NodePort",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is the default Service type in Kubernetes, and what scope of network accessibility does it provide?",
    "options": [
      {
        "id": "opt-1",
        "text": "ClusterIP: assigns an internal virtual IP reachable only from within the Kubernetes cluster network"
      },
      {
        "id": "opt-2",
        "text": "LoadBalancer: provisions an external cloud load balancer automatically"
      },
      {
        "id": "opt-3",
        "text": "NodePort: exposes a port on every worker node's public IP (30000-32767)"
      },
      {
        "id": "opt-4",
        "text": "ExternalName: maps the Service to a DNS CNAME record"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "ClusterIP is the default service type. It exposes the service on an internal IP address inside the cluster. It is accessible only from pods within the cluster, making it ideal for backend microservices and databases.",
    "referenceUrl": "https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types"
  },
  {
    "id": "k8s-q3-adv",
    "certificationId": "kubernetes-architecture",
    "topic": "Control Plane Architecture: etcd Consensus",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Why must etcd clusters in a Kubernetes control plane contain an odd number of members (typically 3 or 5)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Raft consensus requires a strict majority quorum ((N/2) + 1) to elect a leader and commit state changes; an even number increases failure vulnerability without increasing tolerance"
      },
      {
        "id": "opt-2",
        "text": "Kubernetes API server can only connect to odd IP addresses"
      },
      {
        "id": "opt-3",
        "text": "Even-numbered nodes cause TCP packet collisions"
      },
      {
        "id": "opt-4",
        "text": "etcd uses bitwise XOR operations across nodes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Raft consensus, a cluster of 3 nodes tolerates 1 failure ((3/2)+1 = 2 quorum). A 4-node cluster still requires 3 nodes for quorum, meaning it STILL only tolerates 1 failure. Thus, even node counts add resource cost and split-brain risk without improving fault tolerance.",
    "referenceUrl": "https://etcd.io/docs/v3.5/faq/#why-an-odd-number-of-cluster-members"
  },
  {
    "id": "k8s-q4-adv",
    "certificationId": "kubernetes-architecture",
    "topic": "Deployment Rolling Updates: maxSurge & maxUnavailable",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "In a Kubernetes Deployment with 10 replicas and `strategy.rollingUpdate: { maxSurge: \"20%\", maxUnavailable: \"0%\" }`, what is the maximum number of pods that can exist concurrently during a rollout?",
    "options": [
      {
        "id": "opt-1",
        "text": "12 pods (10 desired + 2 surge pods), with a minimum of 10 always available"
      },
      {
        "id": "opt-2",
        "text": "20 pods"
      },
      {
        "id": "opt-3",
        "text": "10 pods"
      },
      {
        "id": "opt-4",
        "text": "8 pods"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`maxSurge: 20%` of 10 is 2 pods. The deployment controller can create up to 2 extra new pods above desired count (total 12). `maxUnavailable: 0%` guarantees at least 10 pods remain running and ready at all times during the entire rollout.",
    "referenceUrl": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment"
  },
  {
    "id": "k8s-q5-adv",
    "certificationId": "kubernetes-architecture",
    "topic": "Container Network Interface (CNI) & Overlay Networks",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What fundamental networking requirement must every Kubernetes CNI plugin (e.g. Calico, Cilium, Flannel) satisfy?",
    "options": [
      {
        "id": "opt-1",
        "text": "Every Pod receives a unique IP and can communicate with every other Pod on any node without Network Address Translation (NAT)"
      },
      {
        "id": "opt-2",
        "text": "All network traffic must be encrypted using IPsec hardware acceleration"
      },
      {
        "id": "opt-3",
        "text": "Pods on the same node must communicate over Unix domain sockets only"
      },
      {
        "id": "opt-4",
        "text": "Node-to-pod communication must pass through an external gateway"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "The Kubernetes networking model mandates: 1. All pods can communicate with all other pods without NAT, 2. Agents on a node (kubelet) can communicate with all pods on that node, 3. Pods see themselves with the same IP that other pods see them with.",
    "referenceUrl": "https://kubernetes.io/docs/concepts/services-networking/#the-kubernetes-network-model"
  },
  {
    "id": "k8s-q6-adv",
    "certificationId": "kubernetes-architecture",
    "topic": "kube-proxy & iptables / IPVS Modes",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Why is IPVS mode in `kube-proxy` preferred over standard iptables mode in clusters with thousands of Services?",
    "options": [
      {
        "id": "opt-1",
        "text": "IPVS uses kernel hash tables with O(1) connection lookup complexity, whereas iptables uses sequential O(N) chain traversal that severely degrades packet latency as service count grows"
      },
      {
        "id": "opt-2",
        "text": "IPVS allows pods to bypass Linux kernel networking"
      },
      {
        "id": "opt-3",
        "text": "iptables cannot route TCP port 443 traffic"
      },
      {
        "id": "opt-4",
        "text": "IPVS eliminates the need for kubelet on worker nodes"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "kube-proxy iptables mode generates linear rules for each service and endpoint. With 10,000 services, sequential rule evaluation incurs noticeable CPU overhead and slow rule synchronization. IPVS operates as an in-kernel L4 transport load balancer using O(1) hash tables.",
    "referenceUrl": "https://kubernetes.io/docs/reference/networking/virtual-ips/#proxy-modes"
  },
  {
    "id": "k8s-q7-adv",
    "certificationId": "kubernetes-architecture",
    "topic": "Pod Disruption Budgets (PDB)",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What does a PodDisruptionBudget (PDB) protect against in an enterprise Kubernetes production cluster?",
    "options": [
      {
        "id": "opt-1",
        "text": "Voluntary disruptions such as node draining during cluster upgrades or cluster autoscaler scale-down"
      },
      {
        "id": "opt-2",
        "text": "Involuntary disruptions such as physical hardware motherboard failures"
      },
      {
        "id": "opt-3",
        "text": "Network cable disconnections in the datacenter"
      },
      {
        "id": "opt-4",
        "text": "Denial of service cyberattacks on ingress endpoints"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "PDBs limit the number of pods of a replicated application that can be simultaneously down from voluntary disruptions (e.g. `kubectl drain node`, cluster autoscaler evictions). They cannot prevent involuntary disruptions (node kernel panic, power loss).",
    "referenceUrl": "https://kubernetes.io/docs/tasks/run-application/configure-pdb/"
  },
  {
    "id": "k8s-q8-exp",
    "certificationId": "kubernetes-architecture",
    "topic": "Admission Controllers & Webhooks",
    "category": "devops",
    "difficulty": "Expert",
    "question": "In the Kubernetes API request lifecycle, what is the strict execution sequence between Mutating and Validating Admission Webhooks?",
    "options": [
      {
        "id": "opt-1",
        "text": "Mutating Admission Webhooks execute FIRST (modifying object specs, e.g. sidecar injection), followed by schema validation, followed by Validating Admission Webhooks (accept/reject)"
      },
      {
        "id": "opt-2",
        "text": "Validating executes first, then Mutating modifies the committed object"
      },
      {
        "id": "opt-3",
        "text": "They execute concurrently in arbitrary order"
      },
      {
        "id": "opt-4",
        "text": "Mutating webhooks execute after etcd commits the transaction"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In the API server pipeline: Authentication -> Authorization -> Mutating Webhooks (e.g. Istio sidecar injection, security defaults) -> Object Schema Validation -> Validating Webhooks (policy enforcement like OPA/Kyverno) -> etcd persistence.",
    "referenceUrl": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/"
  },
  {
    "id": "k8s-q9-exp",
    "certificationId": "kubernetes-architecture",
    "topic": "Custom Resource Definitions (CRDs) & Operator Pattern",
    "category": "devops",
    "difficulty": "Expert",
    "question": "What is the core operational loop of a Kubernetes Operator built with the Controller-Runtime pattern?",
    "options": [
      {
        "id": "opt-1",
        "text": "Reconciliation loop: continuously observes current cluster state via Informers/Listers and executes actions until actual state matches desired spec declared in the Custom Resource"
      },
      {
        "id": "opt-2",
        "text": "A cron job that executes bash scripts inside etcd pods"
      },
      {
        "id": "opt-3",
        "text": "A daemonset that restarts docker containers on schedule"
      },
      {
        "id": "opt-4",
        "text": "An external Python script connected via SSH to node 0"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Kubernetes Operators encode domain knowledge using CRDs and custom controllers. The Reconcile() loop is level-triggered: it receives event notifications, queries current state, computes the diff, and drives convergence toward the desired state declared in the CR spec.",
    "referenceUrl": "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/"
  },
  {
    "id": "k8s-q10-exp",
    "certificationId": "kubernetes-architecture",
    "topic": "eBPF-based Networking (Cilium)",
    "category": "devops",
    "difficulty": "Expert",
    "question": "Why does eBPF-based networking (as used in Cilium) significantly outperform traditional iptables/conntrack for Kubernetes microservices?",
    "options": [
      {
        "id": "opt-1",
        "text": "eBPF bytecode programs run directly in Linux kernel hook points (XDP, tc, socket layer), bypassing Linux network stack overhead and conntrack table lock contention"
      },
      {
        "id": "opt-2",
        "text": "eBPF converts all network packets into UDP packets"
      },
      {
        "id": "opt-3",
        "text": "eBPF replaces the Linux kernel with a real-time microkernel"
      },
      {
        "id": "opt-4",
        "text": "eBPF allows pods to share root filesystem privileges"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Traditional Linux networking routes packets through iptables, routing tables, and netfilter conntrack. Cilium compiles BPF programs that attach directly to socket layers and network device drivers (XDP/tc), allowing direct pod-to-pod packet forwarding and identity-based security without conntrack bottlenecks.",
    "referenceUrl": "https://cilium.io/use-cases/ebpf/"
  },
  {
    "id": "nix-q1-inter",
    "certificationId": "linux-administration",
    "topic": "Process States & Zombie Processes",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is a Linux \"Zombie\" process (State 'Z' in `ps` output), and how do you clean it up?",
    "options": [
      {
        "id": "opt-1",
        "text": "A child process that has terminated, but its parent has not yet read its exit status with `wait()`/`waitpid()`; it is reaped when the parent calls wait() or when the parent dies and PID 1 reaps it"
      },
      {
        "id": "opt-2",
        "text": "A process consuming 100% CPU in an infinite loop; killed with kill -9"
      },
      {
        "id": "opt-3",
        "text": "A background daemon waiting for network packets"
      },
      {
        "id": "opt-4",
        "text": "A deleted binary file still executing from RAM"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A zombie process holds no code or heap memory, only a process table entry retaining exit status. Sending SIGKILL (-9) to a zombie has no effect because it is already dead. Cleaning it requires the parent to invoke wait(), or terminating the parent so init (PID 1) inherits and reaps it.",
    "referenceUrl": "https://man7.org/linux/man-pages/man2/wait.2.html"
  },
  {
    "id": "nix-q2-inter",
    "certificationId": "linux-administration",
    "topic": "File Permissions & SUID/SGID Bits",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is the security implication of setting the SUID (Set Owner User ID) bit on an executable binary (e.g. `chmod 4755 /usr/bin/passwd`)?",
    "options": [
      {
        "id": "opt-1",
        "text": "The binary executes with the filesystem permissions and effective UID of the file's owner (e.g. root) rather than the user executing it"
      },
      {
        "id": "opt-2",
        "text": "The binary can only be executed by root"
      },
      {
        "id": "opt-3",
        "text": "The binary is encrypted on disk"
      },
      {
        "id": "opt-4",
        "text": "The binary runs inside a Docker container"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "When an executable has SUID (mode 4000), any user executing the program temporarily gains the effective privileges of the file owner (e.g. root for passwd). If an SUID binary contains vulnerabilities, it allows privilege escalation.",
    "referenceUrl": "https://man7.org/linux/man-pages/man7/inode.7.html"
  },
  {
    "id": "nix-q3-adv",
    "certificationId": "linux-administration",
    "topic": "Linux cgroups v2 vs Namespaces",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "In container runtimes (such as containerd/Docker), what distinct functions do Linux Namespaces vs cgroups (control groups) provide?",
    "options": [
      {
        "id": "opt-1",
        "text": "Namespaces provide isolation (what a process can see: PID, NET, MNT, IPC, UTS, USER); cgroups provide resource metering and limits (how much it can use: CPU, memory, I/O)"
      },
      {
        "id": "opt-2",
        "text": "Namespaces limit CPU cores; cgroups create network interfaces"
      },
      {
        "id": "opt-3",
        "text": "cgroups provide file permissions; namespaces provide disk encryption"
      },
      {
        "id": "opt-4",
        "text": "Namespaces run on bare metal; cgroups run in VMs only"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Linux containers are built on two core kernel primitives: Namespaces isolate system resources so a container believes it has its own private process tree, network stack, and mount points; cgroups enforce hardware quotas (max memory, CPU shares, block I/O throttle).",
    "referenceUrl": "https://man7.org/linux/man-pages/man7/cgroups.7.html"
  },
  {
    "id": "nix-q4-adv",
    "certificationId": "linux-administration",
    "topic": "Memory Management: swappiness & OOM Killer",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How does the Linux kernel `vm.swappiness` sysctl parameter influence memory reclamation under memory pressure?",
    "options": [
      {
        "id": "opt-1",
        "text": "It balances the kernel preference between reclaiming anonymous memory (swapping to disk) vs reclaiming inactive page cache (dropping file pages)"
      },
      {
        "id": "opt-2",
        "text": "It sets the exact percentage of RAM allocated to swap space"
      },
      {
        "id": "opt-3",
        "text": "It disables virtual memory completely"
      },
      {
        "id": "opt-4",
        "text": "It controls how often the CPU cache is flushed"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`vm.swappiness` takes a value from 0 to 200 (default 60). Higher values favor swapping inactive anonymous process memory out to swap disk to preserve page cache; lower values favor dropping file-backed page cache before swapping.",
    "referenceUrl": "https://docs.kernel.org/admin-guide/sysctl/vm.html"
  },
  {
    "id": "nix-q5-adv",
    "certificationId": "linux-administration",
    "topic": "systemd Services & Restart Directives",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "In a systemd service unit file, what is the effect of `Restart=on-failure` combined with `RestartSec=5s`?",
    "options": [
      {
        "id": "opt-1",
        "text": "systemd restarts the service after 5 seconds if the process exits with a non-zero exit code, is killed by an uncaught signal, or hits watchdog timeout, but NOT on clean exit (status 0)"
      },
      {
        "id": "opt-2",
        "text": "The service is restarted every 5 seconds continuously"
      },
      {
        "id": "opt-3",
        "text": "The service reboots the entire Linux server upon failure"
      },
      {
        "id": "opt-4",
        "text": "systemd terminates all other active services"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`Restart=on-failure` restarts the unit if exited uncleanly (non-zero exit code, core dump, killed by signal, or watchdog expiration). It does NOT restart if cleanly stopped with `systemctl stop` or if the process exits with status 0.",
    "referenceUrl": "https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html"
  },
  {
    "id": "nix-q6-adv",
    "certificationId": "linux-administration",
    "topic": "File Descriptors & Epoll Scalability",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Why did the Linux `epoll` system call family replace `select()` and `poll()` for high-concurrency network servers (C10K problem)?",
    "options": [
      {
        "id": "opt-1",
        "text": "epoll registers interest once in the kernel (rbtree) and returns ready descriptors via a ready list in O(1) time, avoiding select/poll's O(N) array copy and linear scan on every call"
      },
      {
        "id": "opt-2",
        "text": "epoll encrypts all network sockets with AES-256"
      },
      {
        "id": "opt-3",
        "text": "select/poll is restricted to local UNIX sockets"
      },
      {
        "id": "opt-4",
        "text": "epoll executes on GPU compute units"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`select` and `poll` require the application to pass all monitored file descriptors to the kernel on every call, and iterate through all descriptors to find active ones (O(N)). `epoll_create` builds an in-kernel event context: `epoll_wait` only returns active ready descriptors in O(1).",
    "referenceUrl": "https://man7.org/linux/man-pages/man7/epoll.7.html"
  },
  {
    "id": "nix-q7-adv",
    "certificationId": "linux-administration",
    "topic": "Networking: iptables vs nftables",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What architectural improvements does `nftables` introduce to replace legacy `iptables` in modern Linux kernels?",
    "options": [
      {
        "id": "opt-1",
        "text": "A unified pseudo-virtual-machine bytecode engine that executes rules in a single framework across IPv4, IPv6, ARP, and bridge, avoiding duplicate code and rule bloat"
      },
      {
        "id": "opt-2",
        "text": "nftables operates strictly in user space without kernel modules"
      },
      {
        "id": "opt-3",
        "text": "nftables replaces TCP with QUIC protocol"
      },
      {
        "id": "opt-4",
        "text": "nftables cannot filter port numbers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`iptables` had separate binaries and kernel modules for IPv4 (iptables), IPv6 (ip6tables), ARP (arptables), and bridging (ebtables). `nftables` consolidates packet classification into a small in-kernel bytecode engine with atomic rule replacements.",
    "referenceUrl": "https://wiki.nftables.org/wiki-nftables/index.php/Main_Page"
  },
  {
    "id": "nix-q8-exp",
    "certificationId": "linux-administration",
    "topic": "Disk I/O Schedulers: mq-deadline vs BFQ vs Kyber",
    "category": "devops",
    "difficulty": "Expert",
    "question": "For high-throughput NVMe SSD storage in a Linux enterprise database server, which multi-queue I/O scheduler is typically recommended over BFQ?",
    "options": [
      {
        "id": "opt-1",
        "text": "`none` (bypass) or `mq-deadline`, which provide minimal CPU overhead and low latency for fast random hardware queues, whereas BFQ adds complex fairness accounting"
      },
      {
        "id": "opt-2",
        "text": "BFQ exclusively"
      },
      {
        "id": "opt-3",
        "text": "CFQ (Complete Fair Queuing)"
      },
      {
        "id": "opt-4",
        "text": "Anticipatory scheduler"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Modern NVMe drives support tens of thousands of hardware queues with microsecond latency. Complex scheduling algorithms like BFQ introduce significant CPU overhead. `none` (no scheduler) or `mq-deadline` delivers maximum IOPS by submitting requests directly to hardware queues.",
    "referenceUrl": "https://docs.kernel.org/block/biodoc.html"
  },
  {
    "id": "nix-q9-exp",
    "certificationId": "linux-administration",
    "topic": "TCP Kernel Tuning: SO_REUSEPORT & TIME_WAIT",
    "category": "devops",
    "difficulty": "Expert",
    "question": "How does configuring `SO_REUSEPORT` socket option at the Linux kernel level improve performance on multi-core web servers (such as Nginx)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It allows multiple independent worker processes to bind to the exact same port; the kernel distributes incoming TCP SYN handshakes across processes via socket hashing, eliminating accept mutex lock contention"
      },
      {
        "id": "opt-2",
        "text": "It bypasses TCP handshakes completely"
      },
      {
        "id": "opt-3",
        "text": "It increases MTU packet size to 64 KB"
      },
      {
        "id": "opt-4",
        "text": "It stores socket buffers in GPU memory"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Without `SO_REUSEPORT`, multiple worker processes must either share a single listening socket (causing lock contention or thundering herd problems) or have a master process delegate sockets. `SO_REUSEPORT` enables kernel-level load balancing directly to worker sockets.",
    "referenceUrl": "https://lwn.net/Articles/542629/"
  },
  {
    "id": "nix-q10-exp",
    "certificationId": "linux-administration",
    "topic": "Linux Virtual Memory: Overcommit & OOM Killer Tuning",
    "category": "devops",
    "difficulty": "Expert",
    "question": "Why do high-reliability systems (e.g. Redis production servers) recommend setting `vm.overcommit_memory = 1` in `/etc/sysctl.conf`?",
    "options": [
      {
        "id": "opt-1",
        "text": "Heuristic overcommit (mode 0) may cause fork() during BGSAVE to fail with ENOMEM even if actual memory usage will be tiny due to Copy-On-Write; mode 1 always allows memory allocation"
      },
      {
        "id": "opt-2",
        "text": "Mode 1 doubles physical RAM through compression"
      },
      {
        "id": "opt-3",
        "text": "It disables Linux kernel paging"
      },
      {
        "id": "opt-4",
        "text": "It prevents any process from being killed by SIGKILL"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In mode 0, the kernel heuristics estimate whether enough memory exists for `fork()`. If a Redis process uses 20 GB of a 32 GB server, fork() requests 20 GB virtual address space. Heuristic mode rejects this with \"Cannot allocate memory\", even though Copy-On-Write will only modify a few megabytes. Mode 1 permits the allocation.",
    "referenceUrl": "https://docs.kernel.org/admin-guide/sysctl/vm.html#overcommit-memory"
  },
  {
    "id": "cicd-q1-inter",
    "certificationId": "cicd-pipelines",
    "topic": "CI vs CD vs Continuous Deployment",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is the precise distinction between Continuous Delivery and Continuous Deployment?",
    "options": [
      {
        "id": "opt-1",
        "text": "In Continuous Delivery, every valid build is automatically deployable to production but requires manual approval to release; in Continuous Deployment, passing builds deploy directly to production automatically without manual intervention"
      },
      {
        "id": "opt-2",
        "text": "Continuous Delivery only works with Docker containers"
      },
      {
        "id": "opt-3",
        "text": "Continuous Deployment is used only for mobile applications"
      },
      {
        "id": "opt-4",
        "text": "Continuous Delivery does not run automated tests"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Continuous Delivery ensures every artifact that passes testing is in a releasable state, but deployment to production is triggered manually by stakeholders. Continuous Deployment automates the entire pipeline: passing code releases directly to production without human gates.",
    "referenceUrl": "https://martinfowler.com/bliki/ContinuousDelivery.html"
  },
  {
    "id": "cicd-q2-inter",
    "certificationId": "cicd-pipelines",
    "topic": "GitOps & Declarative Reconciliation",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "How does a GitOps operator (such as ArgoCD or Flux) operate within a Kubernetes deployment pipeline?",
    "options": [
      {
        "id": "opt-1",
        "text": "It runs inside the cluster, treats a Git repository as the single source of truth, continuously monitors for drift between Git and live cluster state, and automatically reconciles differences"
      },
      {
        "id": "opt-2",
        "text": "It connects to developer laptops via SSH to pull code"
      },
      {
        "id": "opt-3",
        "text": "It replaces GitHub Actions runners"
      },
      {
        "id": "opt-4",
        "text": "It commits compiled Docker images into Git repositories"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "GitOps uses pull-based deployment: the cluster operator pulls manifests from Git. If a developer pushes a change or an engineer modifies cluster state manually (drift), the operator detects the divergence and synchronizes the cluster to match Git.",
    "referenceUrl": "https://opengitops.net/"
  },
  {
    "id": "cicd-q3-adv",
    "certificationId": "cicd-pipelines",
    "topic": "OIDC Federated Authentication for CI/CD",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Why should CI/CD pipelines (e.g. GitHub Actions) use OpenID Connect (OIDC) to authenticate with cloud providers (AWS, Azure, GCP) instead of storing static IAM access keys in repository secrets?",
    "options": [
      {
        "id": "opt-1",
        "text": "OIDC eliminates static long-lived credentials; the cloud provider validates a signed JWT issued by GitHub for each job and returns temporary short-lived credentials scoped to repository and branch"
      },
      {
        "id": "opt-2",
        "text": "OIDC makes pipelines run 10x faster"
      },
      {
        "id": "opt-3",
        "text": "Static IAM keys are blocked by Linux operating systems"
      },
      {
        "id": "opt-4",
        "text": "OIDC eliminates the need for IAM roles in cloud providers"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Hardcoded cloud credentials in CI secrets can be leaked, stolen, or forgotten. OIDC federation enables passwordless auth: the runner exchanges a signed OIDC token for temporary STS credentials with precise claims (e.g. repo:myorg/myrepo, ref:refs/heads/main).",
    "referenceUrl": "https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect"
  },
  {
    "id": "cicd-q4-adv",
    "certificationId": "cicd-pipelines",
    "topic": "Ephemeral Preview Environments",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How are Ephemeral Preview Environments typically orchestrated in cloud-native pull request workflows?",
    "options": [
      {
        "id": "opt-1",
        "text": "Each open pull request triggers provisioning of a dedicated, isolated Kubernetes namespace or serverless deployment with a dynamic subdomain, which is automatically destroyed when the PR is merged or closed"
      },
      {
        "id": "opt-2",
        "text": "By deploying every PR into the production database"
      },
      {
        "id": "opt-3",
        "text": "By emailing screenshot PDFs to the QA team"
      },
      {
        "id": "opt-4",
        "text": "By running all tests in the developer's local browser"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Preview environments allow engineers, QA, and product managers to test live pull requests with real URLs before merging. Automations deploy to temporary namespaces (e.g. `pr-142.app.com`) and clean up all resources upon PR closure.",
    "referenceUrl": "https://martinfowler.com/bliki/TestEnvironments.html"
  },
  {
    "id": "cicd-q5-adv",
    "certificationId": "cicd-pipelines",
    "topic": "Canary Deployments with Automated Rollback",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "In automated canary deployments (using Flagger or Argo Rollouts), how does the system decide whether to advance or abort a deployment?",
    "options": [
      {
        "id": "opt-1",
        "text": "It routes a small percentage of real production traffic to the canary and evaluates metrics (e.g. HTTP 5xx error rate, p99 latency) against Prometheus/Datadog thresholds, rolling back automatically if errors exceed thresholds"
      },
      {
        "id": "opt-2",
        "text": "It waits for user complaints on social media"
      },
      {
        "id": "opt-3",
        "text": "It runs unit tests inside production containers"
      },
      {
        "id": "opt-4",
        "text": "It reboots the server if latency is below 10ms"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Canary analysis shifts traffic progressively (5% -> 20% -> 50% -> 100%). At each step, metric queries verify error budgets and latency SLAs. If anomalies occur, the deployment immediately shifts traffic back to the stable replica without human intervention.",
    "referenceUrl": "https://argo-rollouts.readthedocs.io/en/stable/features/canary/"
  },
  {
    "id": "cicd-q6-adv",
    "certificationId": "cicd-pipelines",
    "topic": "Distributed Build Caching in Monorepos",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How do monorepo build tools (such as Turborepo or Nx) optimize CI pipeline execution times across hundreds of packages?",
    "options": [
      {
        "id": "opt-1",
        "text": "They construct a dependency task graph, compute input file and environment hashes per task, and fetch cached outputs from a remote cloud cache, skipping execution of unchanged tasks entirely"
      },
      {
        "id": "opt-2",
        "text": "They combine all TypeScript files into a single index.js file"
      },
      {
        "id": "opt-3",
        "text": "They run all unit tests in a single synchronous thread"
      },
      {
        "id": "opt-4",
        "text": "They delete git commit history"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Remote caching stores outputs of tasks (build artifacts, test results) keyed by hashes of inputs. If package B was not touched and its dependencies haven't changed, CI downloads the cached result in milliseconds rather than rebuilding from scratch.",
    "referenceUrl": "https://turbo.build/repo/docs/core-concepts/caching"
  },
  {
    "id": "cicd-q7-adv",
    "certificationId": "cicd-pipelines",
    "topic": "Immutable Infrastructure & Golden Images",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What is the primary operational advantage of Immutable Infrastructure (building pre-baked AMI/VHD machine images via HashiCorp Packer) over configuration management (Ansible/Chef on live VMs)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It prevents configuration drift across nodes, guarantees reproducible instances, and enables rapid auto-scaling because new instances boot pre-configured without waiting for package installs"
      },
      {
        "id": "opt-2",
        "text": "It eliminates the need for operating system updates"
      },
      {
        "id": "opt-3",
        "text": "It allows live SSH editing on production machines"
      },
      {
        "id": "opt-4",
        "text": "It reduces disk usage to zero"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "With immutable infrastructure, servers are never modified in place. Changes are built into a new golden image (via Packer), tested, and deployed by replacing old servers. This eliminates configuration drift and ensures instant booting during scale-out events.",
    "referenceUrl": "https://martinfowler.com/bliki/ImmutableServer.html"
  },
  {
    "id": "cicd-q8-exp",
    "certificationId": "cicd-pipelines",
    "topic": "Supply Chain Security: Sigstore Cosign & SBOM",
    "category": "devops",
    "difficulty": "Expert",
    "question": "How does Sigstore Cosign verify container image integrity in enterprise CI/CD admission pipelines?",
    "options": [
      {
        "id": "opt-1",
        "text": "It cryptographically signs container image digests in the OCI registry using keyless OIDC identities; cluster admission controllers (e.g. Kyverno) reject unsigned images or images with mismatched provenance"
      },
      {
        "id": "opt-2",
        "text": "It scans container images with ClamAV antivirus"
      },
      {
        "id": "opt-3",
        "text": "It compresses Docker layers with zip format"
      },
      {
        "id": "opt-4",
        "text": "It publishes images to public GitHub repositories"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Keyless signing with Sigstore uses OIDC to issue short-lived certificates from the Fulcio CA and logs signatures into the Rekor transparency ledger. Kubernetes admission controllers verify image signatures before allowing pods to be scheduled.",
    "referenceUrl": "https://docs.sigstore.dev/cosign/overview/"
  },
  {
    "id": "cicd-q9-exp",
    "certificationId": "cicd-pipelines",
    "topic": "Database Migrations in Zero-Downtime Blue-Green Deployments",
    "category": "devops",
    "difficulty": "Expert",
    "question": "In Blue-Green or Rolling deployments, why must database schema changes follow the \"Expand and Contract\" (Parallel Run) pattern?",
    "options": [
      {
        "id": "opt-1",
        "text": "Because both the old version (Blue) and the new version (Green) run concurrently against the same database during rollout; schema changes must be backward-compatible (expand new column, duplicate writes, contract old column later)"
      },
      {
        "id": "opt-2",
        "text": "Because relational databases cannot execute ALTER TABLE commands"
      },
      {
        "id": "opt-3",
        "text": "Because Blue and Green instances use different database engines"
      },
      {
        "id": "opt-4",
        "text": "To avoid creating database backups"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Renaming or dropping a column breaking the old app version causes immediate outages during rolling or blue-green releases. Expand and Contract breaks changes into safe phases: 1. Add new column (expand), 2. Code writes to both, 3. Backfill data, 4. Deploy code reading only new column, 5. Drop old column (contract).",
    "referenceUrl": "https://martinfowler.com/bliki/ParallelRun.html"
  },
  {
    "id": "cicd-q10-exp",
    "certificationId": "cicd-pipelines",
    "topic": "Hermetic & Reproducible Builds",
    "category": "devops",
    "difficulty": "Expert",
    "question": "What defines a \"Hermetic Build\" in mission-critical CI/CD systems (such as Google Bazel or Nix)?",
    "options": [
      {
        "id": "opt-1",
        "text": "The build executes in an isolated environment with NO unpinned internet access, using strictly pinned toolchains and deterministic inputs so that identical inputs produce bit-for-bit identical cryptographic binary outputs"
      },
      {
        "id": "opt-2",
        "text": "A build that runs on physical hardware exclusively"
      },
      {
        "id": "opt-3",
        "text": "A build that does not output log messages"
      },
      {
        "id": "opt-4",
        "text": "A build that executes in under 1 second"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "A hermetic build is completely isolated from the host environment: host headers, local `/usr/lib` libraries, and external network dependencies cannot leak into the build. Every compiler, dependency, and tool is declared, guaranteeing reproducibility across any machine.",
    "referenceUrl": "https://bazel.build/basics/hermeticity"
  },
  {
    "id": "aws-q1-inter",
    "certificationId": "cloud-aws",
    "topic": "AWS Well-Architected Framework Pillars",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "Which of the following correctly lists the six pillars of the AWS Well-Architected Framework?",
    "options": [
      {
        "id": "opt-1",
        "text": "Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability"
      },
      {
        "id": "opt-2",
        "text": "Speed, Agility, Encryption, Storage, Compute, and Monitoring"
      },
      {
        "id": "opt-3",
        "text": "Compute, Networking, Storage, Database, Analytics, and Machine Learning"
      },
      {
        "id": "opt-4",
        "text": "Availability, Elasticity, Scalability, Redundancy, Durability, and Compliance"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "AWS Well-Architected Framework defines six core pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability (added in 2021).",
    "referenceUrl": "https://aws.amazon.com/architecture/well-architected/"
  },
  {
    "id": "aws-q2-inter",
    "certificationId": "cloud-aws",
    "topic": "IAM Policy Evaluation Logic",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "In AWS Identity and Access Management (IAM), how does the policy evaluation engine resolve conflicting policy statements?",
    "options": [
      {
        "id": "opt-1",
        "text": "An explicit Deny in any applicable policy ALWAYS overrides any Allow; if no explicit deny exists, at least one explicit Allow is required, otherwise access is implicitly denied by default"
      },
      {
        "id": "opt-2",
        "text": "Allow always overrides Deny"
      },
      {
        "id": "opt-3",
        "text": "The policy with the most recent timestamp takes precedence"
      },
      {
        "id": "opt-4",
        "text": "Inline policies override identity-based policies"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "IAM evaluation logic: By default all requests are implicitly denied. If any applicable policy (SCP, identity-based, resource-based, permission boundary) contains an explicit Deny, the final decision is ALWAYS Deny. An explicit Allow is required to grant access.",
    "referenceUrl": "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"
  },
  {
    "id": "aws-q3-adv",
    "certificationId": "cloud-aws",
    "topic": "VPC Architecture: PrivateLink & VPC Endpoints",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Why should EC2 instances in private subnets access Amazon S3 and DynamoDB via Gateway VPC Endpoints rather than a NAT Gateway?",
    "options": [
      {
        "id": "opt-1",
        "text": "Gateway VPC Endpoints route traffic directly over the internal AWS network without data processing charges and without consuming NAT Gateway bandwidth limits"
      },
      {
        "id": "opt-2",
        "text": "NAT Gateways cannot route traffic to AWS services"
      },
      {
        "id": "opt-3",
        "text": "Gateway endpoints require public IP addresses on EC2"
      },
      {
        "id": "opt-4",
        "text": "Gateway endpoints only work with IPv6"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "NAT Gateways incur per-GB data processing charges. Gateway VPC Endpoints for S3 and DynamoDB are free of charge, route traffic directly across private AWS backbones, and allow securing access via endpoint policies without traversing public internet.",
    "referenceUrl": "https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html"
  },
  {
    "id": "aws-q4-adv",
    "certificationId": "cloud-aws",
    "topic": "S3 Consistency & Storage Classes",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What consistency model does Amazon S3 provide for PUT and DELETE requests of objects across all regions?",
    "options": [
      {
        "id": "opt-1",
        "text": "Strong read-after-write consistency for PUTs and DELETEs of objects across all metadata and data operations without performance penalty"
      },
      {
        "id": "opt-2",
        "text": "Eventual consistency where reads may return stale data for up to 15 minutes"
      },
      {
        "id": "opt-3",
        "text": "Strict serializability only within a single Availability Zone"
      },
      {
        "id": "opt-4",
        "text": "Read-after-write consistency for new objects, but eventual consistency for updates"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Since December 2020, Amazon S3 delivers strong read-after-write consistency automatically for all applications for PUT and DELETE operations of objects in all AWS regions, with no changes to performance or availability.",
    "referenceUrl": "https://aws.amazon.com/s3/consistency/"
  },
  {
    "id": "aws-q5-adv",
    "certificationId": "cloud-aws",
    "topic": "DynamoDB Single-Table Design & Partition Distribution",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "In Amazon DynamoDB, why does creating a poorly distributed Partition Key (e.g. status \"ACTIVE\" on 99% of items) cause ProvisionedThroughputExceededException even if total provisioned capacity is high?",
    "options": [
      {
        "id": "opt-1",
        "text": "DynamoDB allocates provisioned throughput equally across physical storage partitions; concentrating traffic on a single partition key creates a \"hot partition\" that exhausts that partition's allocated capacity"
      },
      {
        "id": "opt-2",
        "text": "DynamoDB can only store 100 items per partition"
      },
      {
        "id": "opt-3",
        "text": "Single-table design is unsupported in DynamoDB"
      },
      {
        "id": "opt-4",
        "text": "DynamoDB throttles requests with string partition keys"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "DynamoDB hashes the Partition Key to determine the physical partition. Total table throughput is divided among underlying partitions. If 90% of requests target the same partition key, that single partition hits its limit (1000 WCU / 3000 RCU) and throttles, regardless of unused capacity on other partitions.",
    "referenceUrl": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
  },
  {
    "id": "aws-q6-adv",
    "certificationId": "cloud-aws",
    "topic": "AWS Lambda Concurrency & Cold Start Mitigation",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What is the operational difference between Reserved Concurrency and Provisioned Concurrency in AWS Lambda?",
    "options": [
      {
        "id": "opt-1",
        "text": "Reserved Concurrency sets a maximum ceiling and guarantees a slice of account concurrency for a function; Provisioned Concurrency pre-initializes execution environments (runtime and handler) to completely eliminate cold starts"
      },
      {
        "id": "opt-2",
        "text": "Provisioned Concurrency runs functions continuously like EC2 instances"
      },
      {
        "id": "opt-3",
        "text": "Reserved Concurrency only works with Python runtimes"
      },
      {
        "id": "opt-4",
        "text": "They are identical settings configured in CloudWatch"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Reserved Concurrency caps max concurrency (preventing a runaway function from starving the account limit of 1000) and ensures capacity is available. Provisioned Concurrency keeps a pool of initialized microVM execution environments warm, reducing invocation latency to double-digit milliseconds.",
    "referenceUrl": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html"
  },
  {
    "id": "aws-q7-adv",
    "certificationId": "cloud-aws",
    "topic": "Multi-Region Disaster Recovery: Pilot Light vs Warm Standby",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "In disaster recovery architecture, what characterizes a \"Pilot Light\" strategy compared to \"Warm Standby\"?",
    "options": [
      {
        "id": "opt-1",
        "text": "Pilot Light replicates data continuously to the secondary region while keeping compute infrastructure turned off or at minimal configuration (e.g. AMIs and templates ready to scale up upon failover); Warm Standby runs a scaled-down but continuously functional duplicate"
      },
      {
        "id": "opt-2",
        "text": "Pilot Light has an RTO (Recovery Time Objective) of 0 seconds"
      },
      {
        "id": "opt-3",
        "text": "Warm Standby does not replicate databases"
      },
      {
        "id": "opt-4",
        "text": "Pilot Light requires manual DNS changes via external registrars"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In Pilot Light, core data is continuously synchronized, but compute instances are not running; upon disaster, automation boots compute capacity. Warm Standby keeps a scaled-down subset of compute running and handling minimal test traffic, achieving faster RTO at higher cost.",
    "referenceUrl": "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html"
  },
  {
    "id": "aws-q8-exp",
    "certificationId": "cloud-aws",
    "topic": "AWS Transit Gateway vs VPC Peering Mesh",
    "category": "devops",
    "difficulty": "Expert",
    "question": "Why do enterprise multi-account AWS architectures replace full-mesh VPC Peering with AWS Transit Gateway?",
    "options": [
      {
        "id": "opt-1",
        "text": "VPC Peering is non-transitive, requiring N*(N-1)/2 complex point-to-point connections; Transit Gateway acts as a central cloud router (hub-and-spoke) supporting transitive routing across thousands of VPCs and on-premises VPN/Direct Connect"
      },
      {
        "id": "opt-2",
        "text": "VPC Peering does not support IPv4 traffic"
      },
      {
        "id": "opt-3",
        "text": "Transit Gateway eliminates AWS data transfer fees"
      },
      {
        "id": "opt-4",
        "text": "VPC Peering is limited to 2 VPCs per region"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "VPC Peering does not support transitive routing (VPC A peering with B and B with C does not allow A to talk to C). Connecting 50 VPCs requires ~1225 peering connections. Transit Gateway simplifies topology into a single hub-and-spoke router with route tables and attachments.",
    "referenceUrl": "https://aws.amazon.com/transit-gateway/"
  },
  {
    "id": "aws-q9-exp",
    "certificationId": "cloud-aws",
    "topic": "Amazon Aurora Storage Architecture & Quorum Writes",
    "category": "devops",
    "difficulty": "Expert",
    "question": "How does Amazon Aurora's purpose-built log-structured distributed storage engine achieve high availability and crash resilience across Availability Zones (AZs)?",
    "options": [
      {
        "id": "opt-1",
        "text": "It decouples compute from storage, replicating log records 6 ways across 3 AZs (2 copies per AZ) and using quorum models: 4/6 quorum for writes and 3/6 for reads, tolerating the complete loss of an AZ plus an extra node without data loss"
      },
      {
        "id": "opt-2",
        "text": "It creates hourly snapshots in S3 Glacier"
      },
      {
        "id": "opt-3",
        "text": "It executes MySQL stored procedures in Lambda"
      },
      {
        "id": "opt-4",
        "text": "It runs a multi-master SQLite cluster"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Aurora storage is an independent distributed system. Write operations generate redo log streams sent directly to 6 storage nodes across 3 AZs. An update commits as soon as 4 of 6 storage nodes acknowledge the log, eliminating disk-write amplification and buffer-pool flush stalls.",
    "referenceUrl": "https://aws.amazon.com/rds/aurora/architecture/"
  },
  {
    "id": "aws-q10-exp",
    "certificationId": "cloud-aws",
    "topic": "AWS KMS Envelope Encryption",
    "category": "devops",
    "difficulty": "Expert",
    "question": "How does Envelope Encryption in AWS Key Management Service (KMS) securely encrypt multi-gigabyte datasets without transferring large data payloads to KMS APIs?",
    "options": [
      {
        "id": "opt-1",
        "text": "KMS generates a plaintext Data Encryption Key (DEK) and an encrypted DEK using the KMS root key; the application encrypts the large dataset locally with the plaintext DEK, zeroes plaintext DEK from memory, and stores the encrypted DEK alongside the ciphertext"
      },
      {
        "id": "opt-2",
        "text": "All raw data is streamed directly to KMS over HTTPS"
      },
      {
        "id": "opt-3",
        "text": "KMS stores data in an encrypted S3 bucket"
      },
      {
        "id": "opt-4",
        "text": "Data is encrypted using client browser SSL certificates"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "KMS APIs have a 4 KB data limit. Envelope encryption uses `kms:GenerateDataKey`. KMS returns a plaintext DEK and a ciphertext DEK. The application encrypts large data locally using fast symmetric AES-GCM, deletes plaintext key from RAM, and persists ciphertext DEK with the data.",
    "referenceUrl": "https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#enveloping"
  },
  {
    "id": "az-q1-inter",
    "certificationId": "cloud-azure",
    "topic": "Azure Resource Hierarchy",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is the top-to-bottom scope hierarchy for organizing resources, billing, and governance policies in Microsoft Azure?",
    "options": [
      {
        "id": "opt-1",
        "text": "Management Groups -> Subscriptions -> Resource Groups -> Resources"
      },
      {
        "id": "opt-2",
        "text": "Subscriptions -> Management Groups -> Resource Groups -> Resources"
      },
      {
        "id": "opt-3",
        "text": "Resource Groups -> Subscriptions -> Regions -> Resources"
      },
      {
        "id": "opt-4",
        "text": "Tenants -> Resource Groups -> Subscriptions -> Resources"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Azure organizes governance through 4 levels of scope: Management groups (containers for managing access/policy across multiple subscriptions), Subscriptions (billing and quota boundaries), Resource groups (logical containers for deployed resources), and Resources.",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources"
  },
  {
    "id": "az-q2-inter",
    "certificationId": "cloud-azure",
    "topic": "Microsoft Entra ID: Managed Identities",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "What is the architectural advantage of using Azure Managed Identities (System-Assigned or User-Assigned) for Azure App Service or Virtual Machines?",
    "options": [
      {
        "id": "opt-1",
        "text": "Azure automatically handles identity creation, key rotation, and credential management in Microsoft Entra ID; code acquires tokens from local metadata endpoints without storing secrets or passwords in configuration files"
      },
      {
        "id": "opt-2",
        "text": "Managed identities bypass Azure RBAC role assignments"
      },
      {
        "id": "opt-3",
        "text": "Managed identities provide free unlimited compute cores"
      },
      {
        "id": "opt-4",
        "text": "They eliminate the need for HTTPS encryption"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Managed identities eliminate credentials from code. An Azure service instance queries an internal link-local endpoint (169.254.169.254/metadata/identity/oauth2/token) to obtain Entra ID access tokens for Azure Key Vault, SQL, or Blob Storage automatically.",
    "referenceUrl": "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"
  },
  {
    "id": "az-q3-adv",
    "certificationId": "cloud-azure",
    "topic": "VNet Architecture: Hub-Spoke Peering & Azure Bastion",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "In an Azure Hub-and-Spoke virtual network topology, what role does Azure Bastion fulfill?",
    "options": [
      {
        "id": "opt-1",
        "text": "It provides secure, browser-based RDP and SSH connectivity to virtual machines directly over TLS on port 443 without assigning public IP addresses to VMs or exposing ports to public internet"
      },
      {
        "id": "opt-2",
        "text": "It acts as an in-memory Redis cache for databases"
      },
      {
        "id": "opt-3",
        "text": "It performs DDoS mitigation on DNS servers"
      },
      {
        "id": "opt-4",
        "text": "It encrypts hard drives on physical host hardware"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Azure Bastion is a managed PaaS provisioned inside a dedicated subnet (AzureBastionSubnet). Engineers connect to VMs via the Azure Portal over HTML5/TLS. VMs remain completely private without public IPs, preventing port-scanning attacks on RDP (3389) or SSH (22).",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/bastion/bastion-overview"
  },
  {
    "id": "az-q4-adv",
    "certificationId": "cloud-azure",
    "topic": "Azure Cosmos DB Consistency Models",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "Which of the following represents the 5 well-defined consistency levels supported by Azure Cosmos DB, ordered from strongest to weakest?",
    "options": [
      {
        "id": "opt-1",
        "text": "Strong -> Bounded Staleness -> Session -> Consistent Prefix -> Eventual"
      },
      {
        "id": "opt-2",
        "text": "ACID -> Snapshot -> Read Committed -> Read Uncommitted -> None"
      },
      {
        "id": "opt-3",
        "text": "Synchronous -> Semi-Synchronous -> Asynchronous -> Batch -> Lazy"
      },
      {
        "id": "opt-4",
        "text": "Strict -> Linearizable -> Casual -> Normal -> Minimal"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cosmos DB avoids binary strong vs eventual trade-offs by providing 5 precise consistency levels: Strong (linearizable), Bounded Staleness (lags by max K versions or T time), Session (read-your-own-writes, default), Consistent Prefix (never sees out-of-order writes), and Eventual.",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/cosmos-db/consistency-levels"
  },
  {
    "id": "az-q5-adv",
    "certificationId": "cloud-azure",
    "topic": "AKS Networking: Azure CNI vs Kubenet",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What is the primary architectural difference between Azure CNI and Kubenet network plugins in Azure Kubernetes Service (AKS)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Azure CNI assigns every Pod a real private IP address directly from the Azure VNet subnet; Kubenet assigns Pods internal IPs from a private address range and uses NAT on the nodes to reach VNet resources"
      },
      {
        "id": "opt-2",
        "text": "Azure CNI requires external DNS servers"
      },
      {
        "id": "opt-3",
        "text": "Kubenet does not support Linux containers"
      },
      {
        "id": "opt-4",
        "text": "Azure CNI eliminates network latency completely"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "With Azure CNI, every pod consumes a real IP from the Azure VNet subnet, allowing direct VNet-to-pod communication without NAT (requires careful subnet CIDR sizing). Kubenet conserves VNet IP space by using node-level NAT overlays.",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/aks/concepts-network#compare-network-models"
  },
  {
    "id": "az-q6-adv",
    "certificationId": "cloud-azure",
    "topic": "Azure Blob Storage Redundancy Options",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What level of physical data protection is provided by Azure Geo-Zone-Redundant Storage (GZRS)?",
    "options": [
      {
        "id": "opt-1",
        "text": "Data is replicated synchronously across three Availability Zones in the primary region (ZRS), and replicated asynchronously to a single physical datacenter in a paired secondary region (LRS)"
      },
      {
        "id": "opt-2",
        "text": "Data is stored on magnetic tape drives"
      },
      {
        "id": "opt-3",
        "text": "Data is stored in 10 countries simultaneously"
      },
      {
        "id": "opt-4",
        "text": "Data is retained for a maximum of 30 days"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "GZRS combines the high availability of zone-redundant storage (protecting against individual datacenter outages in primary region) with geo-replication (protecting against regional catastrophes by replicating to paired secondary region).",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy#geo-zone-redundant-storage"
  },
  {
    "id": "az-q7-adv",
    "certificationId": "cloud-azure",
    "topic": "Azure App Service Deployment Slots",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How do Azure App Service Deployment Slots achieve zero-downtime production releases when executing a slot swap?",
    "options": [
      {
        "id": "opt-1",
        "text": "The staging slot is warmed up (executing initialization requests and warming caches); once healthy, Azure Front End switches traffic routing to point the production hostname to the staged worker instances instantaneously"
      },
      {
        "id": "opt-2",
        "text": "It reboots the App Service plan"
      },
      {
        "id": "opt-3",
        "text": "It copies files from staging to production over FTP"
      },
      {
        "id": "opt-4",
        "text": "It pauses all incoming HTTP requests for 60 seconds"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Slot swaps prevent cold-start degradation. The target slot is loaded and warmed up with custom warmup paths. Once workers report ready, Azure routing rules swap the virtual IP bindings in milliseconds without dropping any in-flight HTTP requests.",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots#what-happens-during-a-swap"
  },
  {
    "id": "az-q8-exp",
    "certificationId": "cloud-azure",
    "topic": "Global Routing: Azure Front Door vs Application Gateway",
    "category": "devops",
    "difficulty": "Expert",
    "question": "When should an enterprise architecture deploy Azure Front Door rather than Azure Application Gateway?",
    "options": [
      {
        "id": "opt-1",
        "text": "When requiring global Anycast edge routing, dynamic site acceleration, and global SSL termination across Microsoft's global edge network (Layer 7 Global); Application Gateway is regional and operates inside a private VNet"
      },
      {
        "id": "opt-2",
        "text": "When routing internal database TCP connections"
      },
      {
        "id": "opt-3",
        "text": "Application Gateway is deprecated in favor of Front Door"
      },
      {
        "id": "opt-4",
        "text": "Front Door only works with static HTML files"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Azure Front Door is a global Layer 7 load balancer and CDN utilizing Microsoft's global Anycast edge PoPs for acceleration, global failover, and WAF. Azure Application Gateway is a regional Layer 7 load balancer deployed inside customer VNets for private internal routing.",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview"
  },
  {
    "id": "az-q9-exp",
    "certificationId": "cloud-azure",
    "topic": "Governance: Azure Policy & Landing Zones",
    "category": "devops",
    "difficulty": "Expert",
    "question": "In an enterprise Azure Landing Zone, what occurs when an Azure Policy with `DeployIfNotExists` effect evaluates a non-compliant resource?",
    "options": [
      {
        "id": "opt-1",
        "text": "It initiates a remediation task that executes an embedded ARM/Bicep template to automatically deploy and configure the missing child resource (e.g. enabling diagnostic log forwarding to Log Analytics)"
      },
      {
        "id": "opt-2",
        "text": "It deletes the non-compliant resource immediately"
      },
      {
        "id": "opt-3",
        "text": "It locks the subscription from further billing"
      },
      {
        "id": "opt-4",
        "text": "It disables user login credentials"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "`DeployIfNotExists` enables automated guardrail remediation. When a parent resource (like a VM or Key Vault) is created without required monitoring or security extensions, Azure Policy automatically triggers a remediation deployment to provision the missing components.",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effects#deployifnotexists"
  },
  {
    "id": "az-q10-exp",
    "certificationId": "cloud-azure",
    "topic": "Azure Confidential Computing & Hardware Enclaves",
    "category": "devops",
    "difficulty": "Expert",
    "question": "What protection does Azure Confidential Computing (using AMD SEV-SNP or Intel SGX) provide that standard encryption-at-rest and in-transit cannot guarantee?",
    "options": [
      {
        "id": "opt-1",
        "text": "Encryption of data in use: hardware memory encryption prevents cloud hypervisors, Azure administrators, and root host processes from reading memory contents during processing"
      },
      {
        "id": "opt-2",
        "text": "Protection against client-side browser phishing"
      },
      {
        "id": "opt-3",
        "text": "Infinite compute scaling without cost"
      },
      {
        "id": "opt-4",
        "text": "Bypassing user password authentication"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Standard security encrypts data at rest (disk) and in transit (TLS). While executing in CPU RAM, memory is usually plaintext to the hypervisor. Confidential Computing encrypts memory pages with hardware-enforced CPU keys, ensuring even cloud operator admins cannot view runtime memory.",
    "referenceUrl": "https://learn.microsoft.com/en-us/azure/confidential-computing/overview"
  },
  {
    "id": "gcp-q1-inter",
    "certificationId": "cloud-gcp",
    "topic": "GCP Resource Hierarchy & IAM Inheritance",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "In Google Cloud Platform, how does IAM permission inheritance operate across the resource hierarchy?",
    "options": [
      {
        "id": "opt-1",
        "text": "Permissions are inherited downwards: policies granted at the Organization level apply to all Folders, Projects, and Resources below it, and child policies cannot restrict inherited permissions (union of permissions)"
      },
      {
        "id": "opt-2",
        "text": "Child project policies always override and cancel parent policies"
      },
      {
        "id": "opt-3",
        "text": "Permissions are evaluated from bottom to top"
      },
      {
        "id": "opt-4",
        "text": "Folders do not inherit permissions from Organizations"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "GCP IAM policies are inherited downward: Organization -> Folder -> Project -> Resource. Inheritance is additive (effective policy is the union of parent and child permissions). A permission granted at the Organization level cannot be revoked at the Project level (except via deny policies).",
    "referenceUrl": "https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy"
  },
  {
    "id": "gcp-q2-inter",
    "certificationId": "cloud-gcp",
    "topic": "Workload Identity Federation",
    "category": "devops",
    "difficulty": "Intermediate",
    "question": "Why does Google Cloud recommend Workload Identity Federation for CI/CD workloads (e.g. GitHub Actions or GitLab) accessing GCP resources?",
    "options": [
      {
        "id": "opt-1",
        "text": "It eliminates downloadable service account private key JSON files; external workloads exchange OIDC tokens for short-lived Google Cloud credentials securely"
      },
      {
        "id": "opt-2",
        "text": "It allows service accounts to run without IAM roles"
      },
      {
        "id": "opt-3",
        "text": "It encrypts source code repositories in GitHub"
      },
      {
        "id": "opt-4",
        "text": "It gives external workloads permanent root access"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Service account keys (`.json`) are major security risks because they do not expire automatically and are frequently leaked to public repos. Workload Identity Federation uses federated token exchange to grant temporary Google credentials based on verifiable identity provider claims.",
    "referenceUrl": "https://cloud.google.com/iam/docs/workload-identity-federation"
  },
  {
    "id": "gcp-q3-adv",
    "certificationId": "cloud-gcp",
    "topic": "Global VPC & Cross-Region Networking",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What is unique about Google Cloud VPC networks compared to AWS VPCs or Azure VNets?",
    "options": [
      {
        "id": "opt-1",
        "text": "GCP VPC networks are global resources spanning all Google regions worldwide; subnets are regional, allowing VMs in different continents to communicate over private IPs using Google's global private fiber backbone without VPNs or peering"
      },
      {
        "id": "opt-2",
        "text": "GCP VPCs can only contain a single subnet"
      },
      {
        "id": "opt-3",
        "text": "GCP VPCs do not support private IP addresses"
      },
      {
        "id": "opt-4",
        "text": "GCP VPC networks require public IP addresses on all VMs"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Unlike AWS and Azure where virtual networks are bound to a single region, a GCP VPC network is global. Subnets reside in individual regions, but VMs across us-central1 and europe-west1 communicate privately across Google's Andromeda SDN and global fiber without peering overhead.",
    "referenceUrl": "https://cloud.google.com/vpc/docs/vpc"
  },
  {
    "id": "gcp-q4-adv",
    "certificationId": "cloud-gcp",
    "topic": "Google Cloud Run Concurrency & Cold Starts",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How does Cloud Run concurrency configuration (`--concurrency`) differ from standard AWS Lambda execution models?",
    "options": [
      {
        "id": "opt-1",
        "text": "A single Cloud Run container instance can process up to 1000 concurrent requests simultaneously over multiplexed HTTP/2 or WebSockets, whereas standard Lambda instances process only one request per container at a time"
      },
      {
        "id": "opt-2",
        "text": "Cloud Run only processes requests sequentially"
      },
      {
        "id": "opt-3",
        "text": "Cloud Run instances cannot scale down to zero"
      },
      {
        "id": "opt-4",
        "text": "Cloud Run does not support container images"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Lambda defaults to 1 request per concurrent execution environment. Cloud Run container instances can handle multiple requests concurrently (default 80, up to 1000), drastically lowering cold starts, reducing required instances, and cutting compute costs for I/O-bound web services.",
    "referenceUrl": "https://cloud.google.com/run/docs/about-instance-autoscaling#concurrency"
  },
  {
    "id": "gcp-q5-adv",
    "certificationId": "cloud-gcp",
    "topic": "BigQuery Architecture: Capacitor & Storage Separation",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "How does Google BigQuery achieve petabyte-scale analytical query execution in seconds without provisioned clusters?",
    "options": [
      {
        "id": "opt-1",
        "text": "It completely decouples compute (dynamic Borg slots) from columnar storage (Capacitor), connected via Google's petabit bisection bandwidth Jupiter network, enabling dynamic allocation of thousands of CPU cores per query"
      },
      {
        "id": "opt-2",
        "text": "It caches all datasets in local NVMe SSD drives"
      },
      {
        "id": "opt-3",
        "text": "It converts SQL queries into MapReduce Hadoop jobs"
      },
      {
        "id": "opt-4",
        "text": "It requires pre-indexing all table columns"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "BigQuery separates storage and compute. Data resides in Capacitor (Colossus columnar storage). When a query executes, Dremel query engine allocates dynamic compute slots across thousands of workers connected by the Jupiter network, scanning columnar blocks in parallel without disk I/O bottlenecks.",
    "referenceUrl": "https://cloud.google.com/bigquery/docs/architecture"
  },
  {
    "id": "gcp-q6-adv",
    "certificationId": "cloud-gcp",
    "topic": "Cloud Pub/Sub Global Architecture",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What is the operational scope of a Google Cloud Pub/Sub topic?",
    "options": [
      {
        "id": "opt-1",
        "text": "It is a globally available service: publishers and subscribers connect to the nearest Google Edge Point of Presence, and messages are automatically replicated across regions without regional topic provisioning"
      },
      {
        "id": "opt-2",
        "text": "It is restricted to a single zone within one region"
      },
      {
        "id": "opt-3",
        "text": "It operates as an Apache Kafka single-broker instance"
      },
      {
        "id": "opt-4",
        "text": "It only supports synchronous point-to-point queues"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cloud Pub/Sub is inherently global. Publishers publish to a single global topic address; Google routes data through its private network to subscribers anywhere on the planet with automatic cross-region replication and at-least-once delivery.",
    "referenceUrl": "https://cloud.google.com/pubsub/docs/overview"
  },
  {
    "id": "gcp-q7-adv",
    "certificationId": "cloud-gcp",
    "topic": "GKE Autopilot vs GKE Standard",
    "category": "devops",
    "difficulty": "Advanced",
    "question": "What responsibility does Google Cloud assume in GKE Autopilot mode that cluster administrators manage in GKE Standard?",
    "options": [
      {
        "id": "opt-1",
        "text": "Google provisions, auto-scales, and secures all worker node infrastructure, enforces GKE security hardening guidelines, and bills strictly for pod resource requests (CPU/RAM/storage) rather than node VM uptime"
      },
      {
        "id": "opt-2",
        "text": "Google writes container application code"
      },
      {
        "id": "opt-3",
        "text": "Autopilot removes support for Kubernetes Deployments"
      },
      {
        "id": "opt-4",
        "text": "Autopilot runs only in a single zone"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "In GKE Standard, users manage node pools, machine types, OS patches, and pay for VM capacity even if pods are idle. Autopilot manages the complete node lifecycle, applies security hardening, and bills per-second exclusively for the CPU/RAM allocated to running Pods.",
    "referenceUrl": "https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview"
  },
  {
    "id": "gcp-q8-exp",
    "certificationId": "cloud-gcp",
    "topic": "Cloud Spanner: Multi-Region Paxos & TrueTime",
    "category": "devops",
    "difficulty": "Expert",
    "question": "How does Cloud Spanner maintain 99.999% availability and external consistency across continents in multi-region configurations?",
    "options": [
      {
        "id": "opt-1",
        "text": "It distributes data into Splits managed by Paxos groups across witness and read-write regions, using TrueTime synchronized atomic clocks to serialize transactions globally without distributed locks"
      },
      {
        "id": "opt-2",
        "text": "By falling back to eventual consistency when network partitions occur"
      },
      {
        "id": "opt-3",
        "text": "By storing all relational data in Cloud Storage buckets"
      },
      {
        "id": "opt-4",
        "text": "By using master-slave replication with manual failover"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Cloud Spanner partitions tables into Splits. Each split has a replicated Paxos group across 3+ regions (including witness nodes). TrueTime API ensures all transaction commits are assigned globally monotonic timestamps, providing external consistency (strict serializability) and 5-nines SLA.",
    "referenceUrl": "https://cloud.google.com/spanner/docs/whitepapers/life-of-reads-and-writes"
  },
  {
    "id": "gcp-q9-exp",
    "certificationId": "cloud-gcp",
    "topic": "Cloud Armor & Global Anycast External HTTPS Load Balancer",
    "category": "devops",
    "difficulty": "Expert",
    "question": "How does Google Cloud's Global External Application Load Balancer mitigate Layer 3/4 and Layer 7 DDoS attacks?",
    "options": [
      {
        "id": "opt-1",
        "text": "A single global Anycast VIP advertises from hundreds of Google Edge PoPs worldwide, absorbing and distributing volumetric DDoS attacks across Google's massive global edge infrastructure before traffic reaches backend regions"
      },
      {
        "id": "opt-2",
        "text": "By dropping all TCP SYN packets during peak hours"
      },
      {
        "id": "opt-3",
        "text": "By restricting access to Google Chrome browsers only"
      },
      {
        "id": "opt-4",
        "text": "By running Snort IDS on individual backend VM instances"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Google's global load balancers use Anycast IP routing. Client TCP handshakes terminate at the nearest Google edge PoP (hundreds globally). Multi-gigabit/terabit DDoS attacks are absorbed across Google's global network edge and filtered by Cloud Armor rules before entering user VPCs.",
    "referenceUrl": "https://cloud.google.com/load-balancing/docs/https"
  },
  {
    "id": "gcp-q10-exp",
    "certificationId": "cloud-gcp",
    "topic": "Shared VPC vs VPC Network Peering in Enterprise GCP",
    "category": "devops",
    "difficulty": "Expert",
    "question": "Why do enterprise multi-project GCP landing zones implement Shared VPC rather than VPC Network Peering?",
    "options": [
      {
        "id": "opt-1",
        "text": "Shared VPC centralizes network management (subnets, firewalls, routers, VPNs) in a central Host Project governed by network admins, while allowing Service Projects to deploy workloads into designated subnets"
      },
      {
        "id": "opt-2",
        "text": "VPC Peering does not support internal IP routing"
      },
      {
        "id": "opt-3",
        "text": "Shared VPC eliminates the need for IAM permissions"
      },
      {
        "id": "opt-4",
        "text": "Shared VPC only supports Google Kubernetes Engine"
      }
    ],
    "correctOptionId": "opt-1",
    "explanation": "Shared VPC establishes clear organizational separation of duties: Network teams own and secure the Host Project (controlling CIDRs, cloud routers, NAT, firewall rules). Development teams own Service Projects and attach compute instances directly to pre-allocated subnets.",
    "referenceUrl": "https://cloud.google.com/vpc/docs/shared-vpc"
  }
];
