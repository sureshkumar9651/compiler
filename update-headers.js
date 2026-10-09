const fs = require('fs');
const glob = require('glob');

const files = [
  'src/app/privacy/page.tsx',
  'src/app/examples/[id]/page.tsx',
  'src/app/not-found.tsx',
  'src/app/learn/[topic]/page.tsx',
  'src/app/learn/page.tsx',
  'src/app/about/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Skip if it doesn't have the hardcoded header
  if (!content.includes('<header className="flex flex-wrap items-center')) {
    console.log('Skipping', file, 'no hardcoded header found.');
    continue;
  }

  // Replace header block with <Header />
  const headerRegex = /<header className="flex flex-wrap items-center justify-between[\s\S]*?<\/header>/g;
  content = content.replace(headerRegex, '<Header />');

  // Add import if not present
  if (!content.includes('import { Header } from')) {
    // find the last import and insert after it
    const lastImportMatch = [...content.matchAll(/import .*? from .*?;?/g)].pop();
    if (lastImportMatch) {
      const idx = lastImportMatch.index + lastImportMatch[0].length;
      content = content.slice(0, idx) + "\nimport { Header } from '@/components/layout/Header';" + content.slice(idx);
    } else {
      // no imports found, insert at top
      content = "import { Header } from '@/components/layout/Header';\n" + content;
    }
  }

  fs.writeFileSync(file, content);
  console.log('Updated', file);
}
