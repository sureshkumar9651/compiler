import { CodeExample } from '../types/example';
import Link from 'next/link';
import { BookOpen, Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/store/useProjectStore';

interface ExampleCardProps {
  example: CodeExample;
  isTemplate?: boolean;
}

export function ExampleCard({ example, isTemplate }: ExampleCardProps) {
  const router = useRouter();
  const { createProject, selectProject, projects } = useProjectStore();

  const handleOpenPlayground = async () => {
    // Generate a unique name for the project
    let newName = example.title;
    let counter = 1;
    while (projects.some(p => p.name === newName)) {
      newName = `${example.title} Copy ${counter}`;
      counter++;
    }

    const newProject = await createProject(newName, example.code);
    
    selectProject(newProject.id);
    router.push('/playground');
  };

  return (
    <div className="flex flex-col p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors h-full group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg line-clamp-1">{example.title}</h3>
        {isTemplate ? (
          <Code2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
        ) : (
          <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0" />
        )}
      </div>
      
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2 flex-1">
        {example.description}
      </p>
      
      <div className="flex items-center gap-2 mb-5">
        <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 text-xs font-medium rounded-md capitalize">
          {example.category.replace('-', ' ')}
        </span>
        {!isTemplate && (
          <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 text-xs font-medium rounded-md capitalize">
            {example.difficulty}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
        {!isTemplate && (
          <Link 
            href={`/examples/${example.id}`}
            className="flex-1 text-center py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Details
          </Link>
        )}
        <button
          onClick={handleOpenPlayground}
          className={`py-2 text-sm font-medium text-white transition-colors rounded-lg flex-1 ${
            isTemplate ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'
          }`}
        >
          Open
        </button>
      </div>
    </div>
  );
}
