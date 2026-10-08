import { CodeExample } from '../types/example';

export const modernExamples: CodeExample[] = [
  {
    id: 'optional-chaining',
    title: 'Optional Chaining & Nullish Coalescing',
    description: 'Safely access nested properties and provide fallback values.',
    category: 'modern-javascript',
    difficulty: 'beginner',
    tags: ['optional-chaining', 'nullish', 'es2020'],
    code: `const user = {
  profile: {
    name: "Suresh"
  }
};

console.log(user.profile?.name);
// @ts-ignore (ignoring for JS example)
console.log(user.settings?.theme ?? "default");`
  }
];
