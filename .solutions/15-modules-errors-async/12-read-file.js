import fs from 'node:fs/promises';

const content = await fs.readFile(new URL('./data/sample.txt', import.meta.url), 'utf8');
console.log(content.trim());
