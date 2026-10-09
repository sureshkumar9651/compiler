import { CodeExample } from "../types/example";

export const algorithmExamples: CodeExample[] = [
  {
    id: "reverse-string",
    title: "Reverse String",
    description: "A basic algorithm to reverse a string.",
    category: "algorithms",
    difficulty: "beginner",
    tags: ["algorithm", "string", "reverse"],
    explanation:
      "Reversing a string is a classic algorithmic challenge. In JavaScript, the most common approach is to split the string into an array, reverse the array, and join it back into a string.",
    expectedOutput: "The reversed version of the input string.",
    commonMistakes: [
      "Trying to reverse a string directly without converting it to an array first.",
      "Not accounting for multi-byte Unicode characters (emojis).",
    ],
    faq: [
      {
        question: "Is split, reverse, join the fastest way?",
        answer:
          "It is the most readable. A manual loop can sometimes be marginally faster.",
      },
    ],
    relatedSlugs: ["palindrome"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Reverse String in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.555Z",
    code: `function reverseString(value) {
  return value.split("").reverse().join("");
}

console.log(reverseString("JavaScript"));`,
  },
  {
    id: "palindrome",
    title: "Palindrome",
    description: "Check if a string reads the same forwards and backwards.",
    category: "algorithms",
    difficulty: "beginner",
    tags: ["algorithm", "string", "palindrome"],
    explanation:
      "A palindrome is a word or phrase that reads the same backward as forward. Checking for palindromes involves cleaning the string (removing spaces/punctuation) and comparing it to its reversed self.",
    expectedOutput: "A boolean indicating whether the string is a palindrome.",
    commonMistakes: [
      "Forgetting to convert all letters to lowercase before comparing.",
      "Not stripping out whitespace or punctuation marks.",
    ],
    faq: [
      {
        question: "How do I remove all non-alphanumeric characters?",
        answer: 'Use a regular expression like str.replace(/[^a-z0-9]/gi, "").',
      },
    ],
    relatedSlugs: ["reverse-string"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Palindrome in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.556Z",
    code: `function isPalindrome(value) {
  const reversed = value.split("").reverse().join("");

  return value === reversed;
}

console.log(isPalindrome("level"));
console.log(isPalindrome("hello"));`,
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    description: "The classic FizzBuzz algorithm.",
    category: "algorithms",
    difficulty: "beginner",
    tags: ["algorithm", "loops", "fizzbuzz"],
    explanation:
      'FizzBuzz is a common programming interview question. It prints numbers from 1 to 100, replacing multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".',
    expectedOutput:
      "A sequence of numbers and Fizz/Buzz words printed to the console.",
    commonMistakes: [
      "Checking for 3 or 5 before checking for 15 (FizzBuzz must be checked first).",
      "Using multiple independent if statements instead of if/else if.",
    ],
    faq: [
      {
        question: "Why check for 15 first?",
        answer:
          "Because 15 is divisible by both 3 and 5. If you check 3 first, it will never reach the 15 check.",
      },
    ],
    relatedSlugs: ["conditional-statements"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with FizzBuzz in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.556Z",
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
    title: "Factorial",
    description: "Calculate the factorial of a number using recursion.",
    category: "algorithms",
    difficulty: "intermediate",
    tags: ["algorithm", "recursion", "math"],
    explanation:
      "The factorial of a non-negative integer is the product of all positive integers less than or equal to n. It can be calculated using a recursive function or a simple loop.",
    expectedOutput: "The calculated factorial integer.",
    commonMistakes: [
      "Forgetting the base case in a recursive solution, leading to a stack overflow.",
      "Not handling 0! which mathematically equals 1.",
    ],
    faq: [
      {
        question: "Which is better, recursion or a loop?",
        answer:
          "A loop avoids call stack limits, but recursion is mathematically cleaner.",
      },
    ],
    relatedSlugs: ["fizzbuzz"],
    learnGuideSlug: "variables",
    seoDescription:
      "Learn and interact with Factorial in JavaScript. See the code, understand the explanation, and run it live in JS CodeLab.",
    datePublished: "2026-10-09T00:00:00Z",
    dateModified: "2026-10-09T06:50:12.556Z",
    code: `function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

console.log(factorial(5));`,
  },
];
