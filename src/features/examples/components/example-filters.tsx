import { ExampleCategory } from '../types/example';

interface ExampleFiltersProps {
  selectedCategory: ExampleCategory | 'all';
  onSelectCategory: (category: ExampleCategory | 'all') => void;
}

const CATEGORIES: { value: ExampleCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'basics', label: 'Basics' },
  { value: 'functions', label: 'Functions' },
  { value: 'arrays', label: 'Arrays' },
  { value: 'objects', label: 'Objects' },
  { value: 'modern-javascript', label: 'Modern JavaScript' },
  { value: 'async', label: 'Async' },
  { value: 'error-handling', label: 'Error Handling' },
  { value: 'algorithms', label: 'Algorithms' },
];

export function ExampleFilters({ selectedCategory, onSelectCategory }: ExampleFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelectCategory(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === cat.value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
