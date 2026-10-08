import { CodeExample } from '../types/example';
import { ExampleCard } from './example-card';

interface ExampleGridProps {
  examples: CodeExample[];
  isTemplate?: boolean;
}

export function ExampleGrid({ examples, isTemplate }: ExampleGridProps) {
  if (examples.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900/20">
        <p className="text-neutral-500 dark:text-neutral-400 mb-2 font-medium">No examples found.</p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500">Try a different search term or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {examples.map(example => (
        <ExampleCard key={example.id} example={example} isTemplate={isTemplate} />
      ))}
    </div>
  );
}
