'use client';

import { useState } from 'react';
import { exampleService } from '@/features/examples/services/example-service';
import { ExampleCategory } from '@/features/examples/types/example';
import { ExampleSearch } from './example-search';
import { ExampleFilters } from './example-filters';
import { ExampleGrid } from './example-grid';

export function ExamplesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExampleCategory | 'all'>('all');

  const filteredExamples = exampleService.searchExamples(searchQuery, selectedCategory);
  const starterTemplates = exampleService.getStarterTemplates();

  // Only show starter templates when not searching or filtering
  const showTemplates = searchQuery === '' && selectedCategory === 'all';

  return (
    <div className="space-y-10">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <ExampleSearch onSearch={setSearchQuery} />
        <ExampleFilters 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </div>

      {/* Starter Templates Section */}
      {showTemplates && (
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            Starter Templates
          </h2>
          <ExampleGrid examples={starterTemplates} isTemplate />
        </section>
      )}

      {/* Examples Library */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {searchQuery ? 'Search Results' : 'Educational Examples'}
          <span className="ml-3 text-sm font-normal text-neutral-500">
            {filteredExamples.length} {filteredExamples.length === 1 ? 'example' : 'examples'}
          </span>
        </h2>
        
        <ExampleGrid examples={filteredExamples} />
      </section>
    </div>
  );
}
