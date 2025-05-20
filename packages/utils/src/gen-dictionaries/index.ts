import FastGlob from 'fast-glob';
import fs from 'node:fs';
import { format } from 'prettier';
import { parse } from 'yaml';

export async function generate(filePath: string) {
  const prettierConfig = {
    parser: 'typescript',
    printWidth: 120,
    singleQuote: true,
  };

  const yamlFiles = FastGlob.sync([`${filePath}/**/*.yaml`]);

  for (const yamlFile of yamlFiles) {
    const resultFilename = yamlFile.replace(/(\.yaml)$/, '.ts');
    const file = fs.readFileSync(yamlFile, 'utf-8');
    const data = parse(file);
    const content = `
    // NOTE: This file should not be edited
    export default ${JSON.stringify(data, null, 2)} as const;\n`;
    const formattedContent = await format(content, prettierConfig);
    fs.writeFileSync(resultFilename, formattedContent, 'utf-8');
  }
}
