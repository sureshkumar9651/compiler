import { CodeExample } from "../types/example";

export const algorithmExamples: CodeExample[] = [
  {
    id: "reverse-string",
    title: "JavaScript Reverse String Algorithm",
    seoTitle: "JavaScript Reverse String Algorithm (split reverse join)",
    seoDescription:
      "Learn how to reverse a string in JavaScript using split, reverse, and join. Inspect algorithmic time complexity and run live code in our playground.",
    description:
      "Reversing a string in JavaScript is a core algorithmic problem. The standard idiom splits the string into an array of characters, invokes Array.prototype.reverse(), and joins the array elements back into a string with O(n) linear time complexity.",
    category: "algorithms",
    difficulty: "beginner",
    tags: ["algorithms", "strings", "reverse", "interview-questions"],
    explanation:
      "Because JavaScript strings are immutable primitives, you cannot reverse characters in place. The idiomatic solution converts the string into an array using `value.split('')`, uses `Array.prototype.reverse()` to invert element order, and reconstructs a string using `join('')`. This runs in O(n) linear time and requires O(n) auxiliary space. For strings containing multi-byte Unicode surrogate pairs or emojis, using array spread `[...value].reverse().join('')` avoids splitting multi-byte characters.",
    expectedOutput: "tpircSavaJ",
    commonMistakes: [
      "Attempting to mutate string characters directly via index assignment (e.g. str[0] = 'a'), which fails silently in non-strict mode.",
      "Using value.split('') on strings with surrogate pairs or emojis, which splits surrogate code points and corrupts glyphs.",
      "Forgetting the empty string argument in join(''), which defaults to joining array items with commas (e.g. 't,p,i,r...').",
      "Using inefficient recursion for large strings, risking call stack overflow."
    ],
    faq: [
      {
        question: "What is the time complexity of reversing a string using split, reverse, join?",
        answer:
          "The time complexity is O(n), where n is the length of the string, because splitting, reversing, and joining each perform a single linear pass."
      },
      {
        question: "How do you reverse a string containing emojis or Unicode characters in JavaScript?",
        answer:
          "Use the array spread operator: [...str].reverse().join('') safely handles Unicode surrogate pairs and astral code points without splitting them."
      },
      {
        question: "Can you reverse a string without creating an array?",
        answer:
          "Yes. You can use a descending for-loop or while-loop, accumulating characters into a new string, or using two-pointer index traversal."
      }
    ],
    relatedSlugs: ["palindrome", "fizzbuzz"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `function reverseString(value) {
  return value.split("").reverse().join("");
}

console.log(reverseString("JavaScript"));`,
  },
  {
    id: "palindrome",
    title: "JavaScript Palindrome Checker Algorithm",
    seoTitle: "JavaScript Palindrome Checker Algorithm & Code",
    seoDescription:
      "Build a JavaScript palindrome checker to verify whether strings read identically forwards and backwards. Test string manipulation live in our runner.",
    description:
      "A palindrome is a sequence that reads identically forwards and backwards. In JavaScript, a palindrome checker verifies symmetry by cleaning characters and comparing the normalized string against its reversed counterpart or using two-pointer index comparison.",
    category: "algorithms",
    difficulty: "beginner",
    tags: ["algorithms", "palindrome", "strings", "problem-solving"],
    explanation:
      "Testing whether a string is a palindrome requires comparing its sequence from front to back. In this basic implementation, the input string is split into an array, reversed, and joined back together. A strict equality comparison (`===`) tests whether the reversed representation matches the original input. In production checkers, strings are typically lowercased and stripped of non-alphanumeric characters using regular expressions before comparison.",
    expectedOutput: "true\nfalse",
    commonMistakes: [
      "Failing to normalize string casing before comparison (e.g. 'Racecar' should equal 'racecar').",
      "Ignoring spaces and punctuation in sentences like 'A man, a plan, a canal: Panama'.",
      "Using loose equality (==) instead of strict equality (===) when checking boolean results.",
      "Allocating full reversed arrays when a two-pointer while loop could verify palindromes in O(1) auxiliary memory."
    ],
    faq: [
      {
        question: "How do you clean a string before checking for a palindrome?",
        answer:
          "Normalize case with str.toLowerCase() and strip whitespace and punctuation using str.replace(/[^a-z0-9]/g, '')."
      },
      {
        question: "What is the two-pointer approach for checking palindromes?",
        answer:
          "Initialize pointers at index 0 and length - 1, moving inward while comparing characters. It short-circuits on the first mismatch, achieving O(n) time and O(1) space."
      },
      {
        question: "Is an empty string considered a palindrome?",
        answer:
          "Yes. By mathematical definition, an empty string reads identically backwards and forwards."
      }
    ],
    relatedSlugs: ["reverse-string", "factorial"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `function isPalindrome(value) {
  const reversed = value.split("").reverse().join("");

  return value === reversed;
}

console.log(isPalindrome("level"));
console.log(isPalindrome("hello"));`,
  },
  {
    id: "fizzbuzz",
    title: "JavaScript FizzBuzz Interview Algorithm",
    seoTitle: "JavaScript FizzBuzz Interview Algorithm Explained",
    seoDescription:
      "Solve the classic FizzBuzz interview problem in JavaScript with modulo arithmetic and clean branching. Run code and inspect exact console output live.",
    description:
      "FizzBuzz is a classic coding interview problem that iterates through integers, printing Fizz for multiples of 3, Buzz for multiples of 5, and FizzBuzz for multiples of both 3 and 5 (15). It tests modulo arithmetic and correct evaluation ordering.",
    category: "algorithms",
    difficulty: "beginner",
    tags: ["fizzbuzz", "algorithms", "modulo", "interview-questions"],
    explanation:
      "FizzBuzz evaluates numbers from 1 to N using the modulo operator (`%`). A number is evenly divisible by another if `number % divisor === 0`. Because numbers divisible by both 3 and 5 are multiples of 15, the condition `i % 15 === 0` must be tested first before checking divisibility by 3 or 5 individually; otherwise, multiples of 15 would be prematurely intercepted by the first branch.",
    expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz",
    commonMistakes: [
      "Testing for 3 or 5 before testing for 15, which prevents FizzBuzz from ever being reached.",
      "Using separate independent if statements rather than an if...else if ladder, causing duplicate logs.",
      "Off-by-one errors in loop boundaries (e.g. i < 20 instead of i <= 20).",
      "Using loose equality (== 0) instead of strict comparison (=== 0)."
    ],
    faq: [
      {
        question: "Why must i % 15 === 0 be checked first in FizzBuzz?",
        answer:
          "Because any multiple of 15 is also divisible by 3 and 5. If you checked i % 3 === 0 first, 15 would trigger 'Fizz' and never evaluate the 15 branch."
      },
      {
        question: "Can FizzBuzz be solved without checking 15 explicitly?",
        answer:
          "Yes. You can build the string dynamically: let str = ''; if (i % 3 === 0) str += 'Fizz'; if (i % 5 === 0) str += 'Buzz'; console.log(str || i);"
      },
      {
        question: "What is the time complexity of the FizzBuzz algorithm?",
        answer:
          "The algorithm runs in O(n) linear time, evaluating each integer from 1 to n with constant-time arithmetic operations."
      }
    ],
    relatedSlugs: ["conditional-statements", "reverse-string"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}`,
  },
  {
    id: "factorial",
    title: "JavaScript Factorial Algorithm (Recursive Solution)",
    seoTitle: "JavaScript Factorial Algorithm (Recursive Solution)",
    seoDescription:
      "Compute mathematical factorials in JavaScript using recursion and base cases. Learn call stack execution and test factorial calculations live online.",
    description:
      "The factorial of a non-negative integer n is the product of all positive integers less than or equal to n, denoted as n!. In JavaScript, factorials are calculated using recursive functions with defined base cases or iterative accumulator loops.",
    category: "algorithms",
    difficulty: "intermediate",
    tags: ["algorithms", "recursion", "math", "factorials"],
    explanation:
      "Factorial (n!) is mathematically defined as n * (n - 1) * ... * 1, with 0! = 1. In recursive programming, a function calls itself with smaller inputs until reaching a termination condition known as the base case (`number <= 1`). Each recursive call pushes an execution frame onto the JavaScript call stack. When the base case returns 1, the frames unwind and compute the final multiplied integer.",
    expectedOutput: "120",
    commonMistakes: [
      "Forgetting the base case (number <= 1), triggering RangeError: Maximum call stack size exceeded.",
      "Not handling negative numbers, which mathematically do not have integer factorials and cause infinite recursion.",
      "Calling factorial on large numbers (n > 170) which exceed JavaScript's Number.MAX_VALUE and evaluate to Infinity.",
      "Preferring recursion over iteration for huge numbers where memory constraints or tail call optimization limitations apply."
    ],
    faq: [
      {
        question: "What happens if a recursive function does not have a base case?",
        answer:
          "The function calls itself indefinitely until the JavaScript engine exhausts call stack memory, throwing a RangeError: Maximum call stack size exceeded."
      },
      {
        question: "How can you compute factorials of very large integers in JavaScript?",
        answer:
          "Use BigInt (e.g. 100n) to prevent 64-bit float precision loss and avoid premature overflow into Infinity."
      },
      {
        question: "Is an iterative loop faster than recursion for factorials?",
        answer:
          "Yes. An iterative for-loop runs in O(n) time and O(1) auxiliary space, avoiding the call stack overhead and function frame allocations of recursion."
      }
    ],
    relatedSlugs: ["reverse-string", "fizzbuzz"],
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-12T00:00:00Z",
    code: `function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

console.log(factorial(5));`,
  },
];
