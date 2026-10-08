import { allExamples, starterTemplates } from '../data';
import { CodeExample, ExampleCategory } from '../types/example';

export const exampleService = {
  getExampleById(id: string): CodeExample | undefined {
    return allExamples.find(ex => ex.id === id);
  },

  getTemplateById(id: string): CodeExample | undefined {
    return starterTemplates.find(ex => ex.id === id);
  },

  getAllExamples(): CodeExample[] {
    return allExamples;
  },

  getStarterTemplates(): CodeExample[] {
    return starterTemplates;
  },

  searchExamples(query: string, category?: ExampleCategory | 'all'): CodeExample[] {
    let filtered = allExamples;
    
    if (category && category !== 'all') {
      filtered = filtered.filter(ex => ex.category === category);
    }
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(ex => 
        ex.title.toLowerCase().includes(lowerQuery) ||
        ex.description.toLowerCase().includes(lowerQuery) ||
        ex.category.toLowerCase().includes(lowerQuery) ||
        ex.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }
    
    return filtered;
  }
};
