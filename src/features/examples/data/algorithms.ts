import { CodeExample } from '../types/example';

export const algorithmExamples: CodeExample[] = [
  {
    id: 'reverse-string',
    title: 'Reverse String',
    description: 'A basic algorithm to reverse a string.',
    category: 'algorithms',
    difficulty: 'beginner',
    tags: ['algorithm', 'string', 'reverse'],
    code: `function reverseString(value) {
  return value.split("").reverse().join("");
}

console.log(reverseString("JavaScript"));`
  },
  {
    id: 'palindrome',
    title: 'Palindrome',
    description: 'Check if a string reads the same forwards and backwards.',
    category: 'algorithms',
    difficulty: 'beginner',
    tags: ['algorithm', 'string', 'palindrome'],
    code: `function isPalindrome(value) {
  const reversed = value.split("").reverse().join("");

  return value === reversed;
}

console.log(isPalindrome("level"));
console.log(isPalindrome("hello"));`
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    description: 'The classic FizzBuzz algorithm.',
    category: 'algorithms',
    difficulty: 'beginner',
    tags: ['algorithm', 'loops', 'fizzbuzz'],
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
}`
  },
  {
    id: 'factorial',
    title: 'Factorial',
    description: 'Calculate the factorial of a number using recursion.',
    category: 'algorithms',
    difficulty: 'intermediate',
    tags: ['algorithm', 'recursion', 'math'],
    code: `function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

console.log(factorial(5));`
  }
];
