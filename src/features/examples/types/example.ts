export type ExampleCategory =
  | 'basics'
  | 'functions'
  | 'arrays'
  | 'objects'
  | 'modern-javascript'
  | 'async'
  | 'error-handling'
  | 'algorithms';

export type ExampleDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: ExampleCategory;
  difficulty: ExampleDifficulty;
  code: string;
  tags: string[];
}
