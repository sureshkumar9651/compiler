import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';

export async function formatJavaScript(code: string, tabSize = 2, useTabs = false): Promise<string | null> {
  try {
    const formatted = await prettier.format(code, {
      parser: 'babel',
      plugins: [parserBabel, prettierPluginEstree],
      tabWidth: tabSize,
      useTabs: useTabs,
      singleQuote: true,
      trailingComma: 'es5',
      semi: true,
    });
    return formatted;
  } catch (error) {
    console.error('Failed to format code:', error);
    // If it fails (e.g. syntax error), return null so we don't destroy the source
    return null;
  }
}
