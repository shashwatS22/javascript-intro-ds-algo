import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const tsDir = path.join(root, 'ts-drills');
const solDir = path.join(root, '.solutions', 'ts-drills');

function runTs(file) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['tsx', file], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (c) => (stdout += c));
    child.stderr.on('data', (c) => (stderr += c));
    child.on('close', (code) => resolve({ stdout, stderr, code }));
    child.on('error', reject);
  });
}

function header(section, file, task, expectedBlock, extra = '') {
  return `/**
 * ts-drills / ${section} / ${file}
 *
 * TASK
 * ${task}
 *${extra}
 * EXPECTED OUTPUT
 * ${expectedBlock.split('\n').join('\n * ')}
 */

`;
}

async function writeOutputDrill(section, file, task, stub, solution, given = '') {
  const dir = path.join(tsDir, section);
  const solPath = path.join(solDir, section, `${file}.ts`);
  await fs.mkdir(dir, { recursive: true });
  await fs.mkdir(path.join(solDir, section), { recursive: true });

  let solBody = solution;
  if (given) {
    solBody = `// ---- GIVEN ----
${given}
// ---------------

${solution}`;
  }

  await fs.writeFile(solPath, solBody, 'utf8');
  const { stdout, stderr, code } = await runTs(solPath);
  if (code !== 0) throw new Error(`${section}/${file} solution failed: ${stderr}`);

  const expected = stdout.replace(/\r\n/g, '\n').replace(/\n+$/, '');
  await fs.writeFile(path.join(dir, `${file}.expected.txt`), `${expected}\n`, 'utf8');

  let stubBody = stub;
  if (given) {
    stubBody = `// ---- GIVEN ----
${given}
// ---------------

${stub}`;
  }

  await fs.writeFile(
    path.join(dir, `${file}.ts`),
    `${header(section, file, task, expected)}${stubBody}`,
    'utf8',
  );
}

async function writeTestDrill(section, file, task, stub, solution, jsTestId) {
  const dir = path.join(tsDir, section);
  await fs.mkdir(dir, { recursive: true });
  await fs.mkdir(path.join(solDir, section), { recursive: true });

  await fs.writeFile(path.join(solDir, section, `${file}.ts`), solution, 'utf8');
  await fs.writeFile(
    path.join(dir, `${file}.ts`),
    `${header(section, file, task, 'All tests pass', '\n *\n * EXPORT\n * Same exports as the JS version.\n')}${stub}`,
    'utf8',
  );

  const jsTest = await fs.readFile(path.join(root, 'levels', `${jsTestId}.test.js`), 'utf8');
  const tsTest = jsTest.replace(/from '\.\/[^']+'/g, `from './${file}.ts'`);
  await fs.writeFile(path.join(dir, `${file}.test.ts`), tsTest, 'utf8');
  await fs.writeFile(path.join(solDir, section, `${file}.test.ts`), tsTest, 'utf8');
}

const CONCEPTS = [
  ['01-why-types', 'Type `add` so both parameters and the return are numbers. Print `add(2, 3)`.', `function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));`, `function add(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(add(2, 3));`],
  ['02-primitives', 'Annotate `age`, `name`, and `active`, then print each `typeof` on its own line.', `const age = 27;\nconst name = 'Riya';\nconst active = true;\n\nconsole.log(typeof age);\nconsole.log(typeof name);\nconsole.log(typeof active);`, `const age: number = 27;\nconst name: string = 'Riya';\nconst active: boolean = true;\n\nconsole.log(typeof age);\nconsole.log(typeof name);\nconsole.log(typeof active);`],
  ['03-arrays-tuples', 'Type `scores` as `number[]` and `pair` as `[string, number]`. Print length then `pair[1]`.', `const scores = [90, 85];\nconst pair = ['Ada', 42];\n\nconsole.log(scores.length);\nconsole.log(pair[1]);`, `const scores: number[] = [90, 85];\nconst pair: [string, number] = ['Ada', 42];\n\nconsole.log(scores.length);\nconsole.log(pair[1]);`],
  ['04-interfaces', 'Define interface `User` with `name` and `age`. Type `user` and print `user.name`.', `const user = { name: 'Ada', age: 28 };\n\nconsole.log(user.name);`, `interface User {\n  name: string;\n  age: number;\n}\n\nconst user: User = { name: 'Ada', age: 28 };\n\nconsole.log(user.name);`],
  ['05-type-alias', 'Create `type ID = string`, type `id`, print it.', `const id = 'user-42';\n\nconsole.log(id);`, `type ID = string;\n\nconst id: ID = 'user-42';\n\nconsole.log(id);`],
  ['06-unions-literals', 'Type `role` as `"admin" | "user"`. Print it.', `const role = 'admin';\n\nconsole.log(role);`, `type Role = 'admin' | 'user';\n\nconst role: Role = 'admin';\n\nconsole.log(role);`],
  ['07-optional-readonly', 'Interface `Profile` with readonly `id`, required `name`, optional `nickname?`. Print `name`.', `const profile = { id: 1, name: 'Riya' };\n\nconsole.log(profile.name);`, `interface Profile {\n  readonly id: number;\n  name: string;\n  nickname?: string;\n}\n\nconst profile: Profile = { id: 1, name: 'Riya' };\n\nconsole.log(profile.name);`],
  ['08-function-types', 'Type `double` as `(n: number) => number`. Print `double(4)`.', `const double = (n) => n * 2;\n\nconsole.log(double(4));`, `const double: (n: number) => number = (n) => n * 2;\n\nconsole.log(double(4));`],
  ['09-any-unknown-never', 'Use `unknown`, narrow with `typeof`, print doubled number.', `const value: any = 5;\n\nconsole.log(value * 2);`, `const value: unknown = 5;\n\nif (typeof value === 'number') {\n  console.log(value * 2);\n}`],
  ['10-narrowing', 'Implement `describe(value: string | number)` per comment. Print both cases.', `function describe(value: string | number): string {\n  return '';\n}\n\nconsole.log(describe('hi'));\nconsole.log(describe(7));`, `function describe(value: string | number): string {\n  if (typeof value === 'string') {\n    return \`word: \${value.length}\`;\n  }\n  return \`num: \${value}\`;\n}\n\nconsole.log(describe('hi'));\nconsole.log(describe(7));`],
  ['11-generics', 'Write `identity<T>(value: T): T`. Print `identity<number>(42)`.', `function identity(value) {\n  return value;\n}\n\nconsole.log(identity(42));`, `function identity<T>(value: T): T {\n  return value;\n}\n\nconsole.log(identity<number>(42));`],
  ['12-utility-types', 'Use `Partial<User>` for `update` with only `nickname`. Print it.', `interface User {\n  name: string;\n  age: number;\n}\n\nconst update = { nickname: 'Ri' };\n\nconsole.log(update.nickname);`, `interface User {\n  name: string;\n  age: number;\n}\n\ntype UserUpdate = Partial<User>;\n\nconst update: UserUpdate = { nickname: 'Ri' };\n\nconsole.log(update.nickname);`],
  ['13-enums-vs-unions', 'Use union `"draft" | "published"` for status. Print it.', `const status = 'published';\n\nconsole.log(status);`, `type Status = 'draft' | 'published';\n\nconst status: Status = 'published';\n\nconsole.log(status);`],
  ['14-strict-flags', 'Print `config.strict` from the typed object.', `const config: { strict: boolean; target: string } = {\n  strict: true,\n  target: 'ES2022',\n};\n\nconsole.log(config.strict);`, `const config: { strict: boolean; target: string } = {\n  strict: true,\n  target: 'ES2022',\n};\n\nconsole.log(config.strict);`],
  ['15-fix-the-error', 'Add types to `double` so strict mode passes. Print `double(4)`.', `function double(n) {\n  return n * 2;\n}\n\nconsole.log(double(4));`, `function double(n: number): number {\n  return n * 2;\n}\n\nconsole.log(double(4));`],
];

const TEST_REDO = [
  ['01-add', '08-functions/01-add', `export function add(a: any, b: any): any {\n  return a + b;\n}`, `export function add(a: number, b: number): number {\n  return a + b;\n}`],
  ['02-multiply', '08-functions/02-arrow-multiply', `export const multiply = (a: any, b: any): any => a * b;`, `export const multiply = (a: number, b: number): number => a * b;`],
  ['03-greet', '08-functions/03-default-params', `export function greet(name: any, greeting = 'Hello'): any {\n  return \`\${greeting}, \${name}!\`;\n}`, `export function greet(name: string, greeting = 'Hello'): string {\n  return \`\${greeting}, \${name}!\`;\n}`],
  ['04-is-even', '08-functions/04-is-even', `export function isEven(n: any): any {\n  return n % 2 === 0;\n}`, `export function isEven(n: number): boolean {\n  return n % 2 === 0;\n}`],
  ['05-min-max', '08-functions/05-min-max-object', `export function minMax(numbers: any): any {\n  return { min: 0, max: 0 };\n}`, `export function minMax(numbers: number[]): { min: number; max: number } {\n  return { min: Math.min(...numbers), max: Math.max(...numbers) };\n}`],
  ['06-rest-sum', '08-functions/06-rest-sum', `export function sum(...numbers: any[]): any {\n  return 0;\n}`, `export function sum(...numbers: number[]): number {\n  return numbers.reduce((t, n) => t + n, 0);\n}`],
  ['07-apply-twice', '08-functions/07-apply-twice', `export function applyTwice(fn: any, value: any): any {\n  return fn(fn(value));\n}`, `export function applyTwice(fn: (x: number) => number, value: number): number {\n  return fn(fn(value));\n}`],
  ['08-make-multiplier', '08-functions/08-make-multiplier', `export function makeMultiplier(n: any): any {\n  return (value: any) => value * n;\n}`, `export function makeMultiplier(n: number): (value: number) => number {\n  return (value) => value * n;\n}`],
  ['09-sum-to-n', '13-recursion/04-sum-to-n', `export function sumTo(n: any): any {\n  if (n <= 0) return 0;\n  return n + sumTo(n - 1);\n}`, `export function sumTo(n: number): number {\n  if (n <= 0) return 0;\n  return n + sumTo(n - 1);\n}`],
  ['10-factorial', '13-recursion/05-factorial', `export function factorial(n: any): any {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`, `export function factorial(n: number): number {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`],
  ['11-reverse-array', '13-recursion/06-reverse-array', `export function reverse(arr: any): any {\n  if (arr.length === 0) return [];\n  return reverse(arr.slice(1)).concat(arr[0]);\n}`, `export function reverse<T>(arr: T[]): T[] {\n  if (arr.length === 0) return [];\n  return reverse(arr.slice(1)).concat(arr[0]);\n}`],
  ['12-is-palindrome', '13-recursion/07-is-palindrome', `export function isPalindrome(s: any): any {\n  function check(left: any, right: any): any {\n    if (left >= right) return true;\n    if (s[left] !== s[right]) return false;\n    return check(left + 1, right - 1);\n  }\n  return check(0, s.length - 1);\n}`, `export function isPalindrome(s: string): boolean {\n  function check(left: number, right: number): boolean {\n    if (left >= right) return true;\n    if (s[left] !== s[right]) return false;\n    return check(left + 1, right - 1);\n  }\n  return check(0, s.length - 1);\n}`],
  ['13-fibonacci', '13-recursion/08-fibonacci', `export function fib(n: any): any {\n  if (n === 0) return 0;\n  if (n === 1) return 1;\n  return fib(n - 1) + fib(n - 2);\n}`, `export function fib(n: number): number {\n  if (n === 0) return 0;\n  if (n === 1) return 1;\n  return fib(n - 1) + fib(n - 2);\n}`],
  ['14-power', '13-recursion/09-power', `export function power(base: any, exp: any): any {\n  if (exp === 0) return 1;\n  return base * power(base, exp - 1);\n}`, `export function power(base: number, exp: number): number {\n  if (exp === 0) return 1;\n  return base * power(base, exp - 1);\n}`],
  ['15-sum-digits', '13-recursion/10-sum-digits', `export function sumDigits(n: any): any {\n  if (n === 0) return 0;\n  return (n % 10) + sumDigits(Math.floor(n / 10));\n}`, `export function sumDigits(n: number): number {\n  if (n === 0) return 0;\n  return (n % 10) + sumDigits(Math.floor(n / 10));\n}`],
];

async function main() {
  await fs.mkdir(tsDir, { recursive: true });
  await fs.writeFile(
    path.join(tsDir, 'README.md'),
    `# TypeScript drills (Phase 3)

Open a \`.ts\` file, write code, save. The watcher runs **strict** type-checking, then grades output or tests.

| Folder | Drills |
|---|---|
| \`01-concepts/\` | 15 type concepts |
| \`02-redo/\` | 30 typed ports from JS levels 08–14 |

Progress here does not block JavaScript levels.

\`\`\`bash
npm run dev
npm run check ts-drills/01-concepts/01-why-types
\`\`\`
`,
    'utf8',
  );

  for (const [file, task, stub, solution] of CONCEPTS) {
    await writeOutputDrill('01-concepts', file, task, stub, solution);
  }

  for (const [file, jsId, stub, solution] of TEST_REDO) {
    await writeTestDrill(
      '02-redo',
      file,
      `Re-do \`${jsId}\`. Replace every \`any\` with proper types.`,
      stub,
      solution,
      jsId,
    );
  }

  const outputRedo = [
    [
      '16-return-vs-log',
      'Type both functions (`number` return vs `void`). Same output as JS.',
      `function returnsFive(): number {\n  return 5;\n}\n\nfunction logsFive(): void {\n  console.log(5);\n}\n\nconsole.log(returnsFive());\nconsole.log(logsFive());`,
      `function returnsFive(): number {\n  return 5;\n}\n\nfunction logsFive(): void {\n  console.log(5);\n}\n\nconsole.log(returnsFive());\nconsole.log(logsFive());`,
    ],
    [
      '17-string-reverse',
      'Type `s: string`. Reverse with a loop.',
      `const s: string = 'bareilly';\nlet out = '';\nfor (let i = s.length - 1; i >= 0; i--) {\n  out += s[i];\n}\nconsole.log(out);`,
      `const s: string = 'bareilly';\nlet out = '';\nfor (let i = s.length - 1; i >= 0; i--) {\n  out += s[i];\n}\nconsole.log(out);`,
    ],
    [
      '18-string-palindrome',
      'Type `s: string`. Print `yes` or `no`.',
      `const s: string = 'level';\nlet left = 0;\nlet right = s.length - 1;\nlet ok = true;\nwhile (left < right) {\n  if (s[left] !== s[right]) ok = false;\n  left++;\n  right--;\n}\nconsole.log(ok ? 'yes' : 'no');`,
      `const s: string = 'level';\nlet left = 0;\nlet right = s.length - 1;\nlet ok = true;\nwhile (left < right) {\n  if (s[left] !== s[right]) ok = false;\n  left++;\n  right--;\n}\nconsole.log(ok ? 'yes' : 'no');`,
    ],
    [
      '19-array-sum-average',
      'Type `nums: number[]`. Print sum then average.',
      `const nums: number[] = [10, 20, 30];\nlet sum = 0;\nfor (const n of nums) sum += n;\nconsole.log(sum);\nconsole.log(sum / nums.length);`,
      `const nums: number[] = [10, 20, 30];\nlet sum = 0;\nfor (const n of nums) sum += n;\nconsole.log(sum);\nconsole.log(sum / nums.length);`,
    ],
    [
      '20-array-largest',
      'Type the array. Print the largest value.',
      `const nums: number[] = [4, 9, 2, 7];\nlet best = nums[0];\nfor (const n of nums) {\n  if (n > best) best = n;\n}\nconsole.log(best);`,
      `const nums: number[] = [4, 9, 2, 7];\nlet best = nums[0];\nfor (const n of nums) {\n  if (n > best) best = n;\n}\nconsole.log(best);`,
    ],
    [
      '21-reduce-sum',
      'Type `nums` and print sum via `reduce`.',
      `const nums: number[] = [1, 2, 3, 4];\nconsole.log(nums.reduce((a, b) => a + b, 0));`,
      `const nums: number[] = [1, 2, 3, 4];\nconsole.log(nums.reduce((a, b) => a + b, 0));`,
    ],
    [
      '22-destructure',
      'Destructure `name` and `city` with types. Print both lines.',
      `const person: { name: string; city: string; age: number } = {\n  name: 'Ada',\n  city: 'London',\n  age: 28,\n};\nconst { name, city } = person;\nconsole.log(name);\nconsole.log(city);`,
      `const person: { name: string; city: string; age: number } = {\n  name: 'Ada',\n  city: 'London',\n  age: 28,\n};\nconst { name, city } = person;\nconsole.log(name);\nconsole.log(city);`,
    ],
    [
      '23-spread-merge',
      'Merge with spread; print `merged.city`.',
      `const base: { name: string; role: string } = { name: 'Riya', role: 'dev' };\nconst extra: { city: string } = { city: 'Bareilly' };\nconst merged = { ...base, ...extra };\nconsole.log(merged.city);`,
      `const base: { name: string; role: string } = { name: 'Riya', role: 'dev' };\nconst extra: { city: string } = { city: 'Bareilly' };\nconst merged = { ...base, ...extra };\nconsole.log(merged.city);`,
    ],
    [
      '24-char-count',
      'Type frequency map. Print count for `a`.',
      `const s: string = 'banana';\nconst freq: Record<string, number> = {};\nfor (const ch of s) {\n  freq[ch] = (freq[ch] ?? 0) + 1;\n}\nconsole.log(freq['a']);`,
      `const s: string = 'banana';\nconst freq: Record<string, number> = {};\nfor (const ch of s) {\n  freq[ch] = (freq[ch] ?? 0) + 1;\n}\nconsole.log(freq['a']);`,
    ],
    [
      '25-two-sum',
      'Type `arr` and `target`. Print indices space-separated using a Map.',
      `const arr: number[] = [2, 7, 11, 15];\nconst target: number = 9;\nconst seen = new Map<number, number>();\nlet result: [number, number] | null = null;\nfor (let i = 0; i < arr.length; i++) {\n  const need = target - arr[i];\n  if (seen.has(need)) {\n    result = [seen.get(need)!, i];\n    break;\n  }\n  seen.set(arr[i], i);\n}\nconsole.log(result!.join(' '));`,
      `const arr: number[] = [2, 7, 11, 15];\nconst target: number = 9;\nconst seen = new Map<number, number>();\nlet result: [number, number] | null = null;\nfor (let i = 0; i < arr.length; i++) {\n  const need = target - arr[i];\n  if (seen.has(need)) {\n    result = [seen.get(need)!, i];\n    break;\n  }\n  seen.set(arr[i], i);\n}\nconsole.log(result!.join(' '));`,
    ],
    [
      '26-callback-steps',
      'Type `repeat` and callback. Print three steps.',
      `const times: number = 3;\nfunction repeat(count: number, cb: (i: number) => void): void {\n  for (let i = 0; i < count; i++) cb(i);\n}\nrepeat(times, (i) => console.log(\`step \${i}\`));`,
      `const times: number = 3;\nfunction repeat(count: number, cb: (i: number) => void): void {\n  for (let i = 0; i < count; i++) cb(i);\n}\nrepeat(times, (i) => console.log(\`step \${i}\`));`,
    ],
    [
      '27-closure-counter',
      'Type `makeCounter`. Print three calls.',
      `function makeCounter(): () => number {\n  let count = 0;\n  return () => {\n    count++;\n    return count;\n  };\n}\nconst c = makeCounter();\nconsole.log(c());\nconsole.log(c());\nconsole.log(c());`,
      `function makeCounter(): () => number {\n  let count = 0;\n  return () => {\n    count++;\n    return count;\n  };\n}\nconst c = makeCounter();\nconsole.log(c());\nconsole.log(c());\nconsole.log(c());`,
    ],
    [
      '28-vowel-count',
      'Type string. Print vowels then consonants.',
      `const s: string = 'hello';\nconst vowels = 'aeiou';\nlet v = 0;\nlet c = 0;\nfor (const ch of s) {\n  if (vowels.includes(ch)) v++;\n  else c++;\n}\nconsole.log(v);\nconsole.log(c);`,
      `const s: string = 'hello';\nconst vowels = 'aeiou';\nlet v = 0;\nlet c = 0;\nfor (const ch of s) {\n  if (vowels.includes(ch)) v++;\n  else c++;\n}\nconsole.log(v);\nconsole.log(c);`,
    ],
    [
      '29-is-sorted',
      'Type array. Print `sorted` or `not sorted`.',
      `const nums: number[] = [1, 2, 3, 4];\nlet ok = true;\nfor (let i = 1; i < nums.length; i++) {\n  if (nums[i] < nums[i - 1]) ok = false;\n}\nconsole.log(ok ? 'sorted' : 'not sorted');`,
      `const nums: number[] = [1, 2, 3, 4];\nlet ok = true;\nfor (let i = 1; i < nums.length; i++) {\n  if (nums[i] < nums[i - 1]) ok = false;\n}\nconsole.log(ok ? 'sorted' : 'not sorted');`,
    ],
    [
      '30-map-double',
      'Type array. Print doubled values space-separated.',
      `const nums: number[] = [1, 2, 3];\nconsole.log(nums.map((n) => n * 2).join(' '));`,
      `const nums: number[] = [1, 2, 3];\nconsole.log(nums.map((n) => n * 2).join(' '));`,
    ],
  ];

  for (const [file, task, stub, solution] of outputRedo) {
    await writeOutputDrill('02-redo', file, task, stub, solution);
  }

  console.log('Generated 15 concept + 30 redo TypeScript drills.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
