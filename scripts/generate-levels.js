import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const levelsDir = path.join(root, 'levels');
const solutionsDir = path.join(root, '.solutions');
const stubsDir = path.join(root, '.stubs');

/** @typedef {{ file: string, task: string, given?: string, expectedComment?: string | null, solution: string, test?: { exportLine: string, stubExport: string, tests: string } }} Exercise */

/** @type {{ dir: string, exercises: Exercise[] }[]} */
const LEVELS = [
  {
    dir: '01-print-and-variables',
    exercises: [
      {
        file: '01-hello',
        task: 'Print exactly `Hello, World!`',
        expectedComment: 'Hello, World!',
        solution: `console.log('Hello, World!');`,
      },
      {
        file: '02-name-age',
        task: 'Print `Riya is 27 years old` using a template literal.',
        given: `const name = "Riya";\nconst age = 27;`,
        expectedComment: 'Riya is 27 years old',
        solution: `console.log(\`\${name} is \${age} years old\`);`,
      },
      {
        file: '03-two-lines',
        task: 'Print `Line one` then `Line two` using two separate `console.log` calls.',
        expectedComment: 'Line one\nLine two',
        solution: `console.log('Line one');
console.log('Line two');`,
      },
      {
        file: '04-one-log-two-lines',
        task: 'Print the same two lines using **one** `console.log` and `\\n`.',
        expectedComment: 'Line one\nLine two',
        solution: `console.log('Line one\\nLine two');`,
      },
      {
        file: '05-let-reassign',
        task: 'Declare `let count = 10`. Print it. Reassign to `20`. Print it again.',
        expectedComment: '10\n20',
        solution: `let count = 10;
console.log(count);
count = 20;
console.log(count);`,
      },
      {
        file: '06-typeof',
        task: 'Print the `typeof` each of: `5`, `"hi"`, `true`, `undefined`, `null`, `{}` — one per line.',
        expectedComment: 'number\nstring\nboolean\nundefined\nobject\nobject',
        solution: `console.log(typeof 5);
console.log(typeof 'hi');
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});`,
      },
      {
        file: '07-concat',
        task: 'Print the full name with a space between.',
        given: `const first = "Ada";\nconst last = "Lovelace";`,
        expectedComment: 'Ada Lovelace',
        solution: `console.log(first + ' ' + last);`,
      },
      {
        file: '08-address',
        task: 'Print a 3-line address using a single multi-line template literal: `12 Park Road` / `Bareilly` / `243001`.',
        expectedComment: '12 Park Road\nBareilly\n243001',
        solution: `console.log(\`12 Park Road
Bareilly
243001\`);`,
      },
      {
        file: '09-swap',
        task: 'Swap them using array destructuring, then print `a=2 b=1`.',
        given: `let a = 1;\nlet b = 2;`,
        expectedComment: 'a=2 b=1',
        solution: `[a, b] = [b, a];
console.log(\`a=\${a} b=\${b}\`);`,
      },
      {
        file: '10-decimals',
        task: 'Print it rounded to 2 decimal places using `toFixed`.',
        given: `const pi = 3.14159;`,
        expectedComment: '3.14',
        solution: `console.log(pi.toFixed(2));`,
      },
      {
        file: '11-booleans',
        task: 'Print the result of `5 > 3`, then `5 === "5"`, one per line.',
        expectedComment: 'true\nfalse',
        solution: `console.log(5 > 3);
console.log(5 === '5');`,
      },
      {
        file: '12-escapes',
        task: 'Print exactly: `She said "hello" and left.` then on the next line a tab-separated `a\\tb`.',
        expectedComment: 'She said "hello" and left.\na\tb',
        solution: `console.log('She said "hello" and left.');
console.log('a\\tb');`,
      },
    ],
  },
  {
    dir: '02-operators',
    exercises: [
      {
        file: '01-arithmetic',
        task: 'Print sum, difference, product, quotient, remainder — one per line.',
        given: `const a = 17;\nconst b = 5;`,
        expectedComment: '22\n12\n85\n3.4\n2',
        solution: `console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);`,
      },
      {
        file: '02-integer-divide',
        task: 'Print the whole-number part of `a / b` using `Math.floor`.',
        given: `const a = 17;\nconst b = 5;`,
        expectedComment: '3',
        solution: `console.log(Math.floor(a / b));`,
      },
      {
        file: '03-post-vs-pre',
        task: 'Print `x++`, then `x`, then `++x`, then `x`.',
        given: `let x = 5;`,
        expectedComment: '5\n6\n7\n7',
        solution: `console.log(x++);
console.log(x);
console.log(++x);
console.log(x);`,
      },
      {
        file: '04-compound',
        task: 'Apply `+= 20`, `-= 30`, `*= 2`, `/= 4` in order, printing after each.',
        given: `let total = 100;`,
        expectedComment: '120\n90\n180\n45',
        solution: `total += 20;
console.log(total);
total -= 30;
console.log(total);
total *= 2;
console.log(total);
total /= 4;
console.log(total);`,
      },
      {
        file: '05-loose-vs-strict',
        task: 'Print `1 == "1"`, `1 === "1"`, `0 == false`, `0 === false`, `null == undefined`, `null === undefined`.',
        expectedComment: 'true\nfalse\ntrue\nfalse\ntrue\nfalse',
        solution: `console.log(1 == '1');
console.log(1 === '1');
console.log(0 == false);
console.log(0 === false);
console.log(null == undefined);
console.log(null === undefined);`,
      },
      {
        file: '06-logical',
        task: 'Print `a && b`, `a || b`, `!a`, `!b`.',
        given: `const a = true;\nconst b = false;`,
        expectedComment: 'false\ntrue\nfalse\ntrue',
        solution: `console.log(a && b);
console.log(a || b);
console.log(!a);
console.log(!b);`,
      },
      {
        file: '07-ternary',
        task: 'Use a ternary to print `even` or `odd`.',
        given: `const n = 14;`,
        expectedComment: 'even',
        solution: `console.log(n % 2 === 0 ? 'even' : 'odd');`,
      },
      {
        file: '08-string-to-number',
        task: 'Print `s + 8` and `Number(s) + 8`.',
        given: `const s = "42";`,
        expectedComment: '428\n50',
        solution: `console.log(s + 8);
console.log(Number(s) + 8);`,
      },
      {
        file: '09-nan',
        task: 'Print `x`, then `Number.isNaN(x)`.',
        given: `const x = Number("abc");`,
        expectedComment: 'NaN\ntrue',
        solution: `console.log(x);
console.log(Number.isNaN(x));`,
      },
      {
        file: '10-math-methods',
        task: 'Print `Math.abs(-7)`, `Math.pow(2, 10)`, `Math.sqrt(144)`, `Math.round(4.6)`, `Math.max(3, 9, 2)`.',
        expectedComment: '7\n1024\n12\n5\n9',
        solution: `console.log(Math.abs(-7));
console.log(Math.pow(2, 10));
console.log(Math.sqrt(144));
console.log(Math.round(4.6));
console.log(Math.max(3, 9, 2));`,
      },
      {
        file: '11-precedence',
        task: 'Print the value of `2 + 3 * 4`, then `(2 + 3) * 4`, then `10 - 4 - 3`.',
        expectedComment: '14\n20\n3',
        solution: `console.log(2 + 3 * 4);
console.log((2 + 3) * 4);
console.log(10 - 4 - 3);`,
      },
      {
        file: '12-last-digit',
        task: 'Print its last digit using `%`, then its first digit using division in a `while`-free way (`Math.floor(n / 1000)`).',
        given: `const n = 4739;`,
        expectedComment: '9\n4',
        solution: `console.log(n % 10);
console.log(Math.floor(n / 1000));`,
      },
    ],
  },
  {
    dir: '03-conditionals',
    exercises: [
      {
        file: '01-sign',
        task: 'Print `positive`, `negative`, or `zero`.',
        given: `const n = -14;`,
        expectedComment: 'negative',
        solution: `if (n > 0) {
  console.log('positive');
} else if (n < 0) {
  console.log('negative');
} else {
  console.log('zero');
}`,
      },
      {
        file: '02-even-odd',
        task: 'Print `even` or `odd` using `if`/`else`.',
        given: `const n = 27;`,
        expectedComment: 'odd',
        solution: `if (n % 2 === 0) {
  console.log('even');
} else {
  console.log('odd');
}`,
      },
      {
        file: '03-max-of-two',
        task: 'Print the larger, or `equal` if they\'re the same.',
        given: `const a = 34;\nconst b = 34;`,
        expectedComment: 'equal',
        solution: `if (a > b) {
  console.log(a);
} else if (b > a) {
  console.log(b);
} else {
  console.log('equal');
}`,
      },
      {
        file: '04-max-of-three',
        task: 'Print the largest value.',
        given: `const a = 12;\nconst b = 45;\nconst c = 45;`,
        expectedComment: '45',
        solution: `let max = a;
if (b > max) max = b;
if (c > max) max = c;
console.log(max);`,
      },
      {
        file: '05-leap-year',
        task: 'Print `leap` or `not leap` (divisible by 4, but not 100, unless also by 400).',
        given: `const year = 2100;`,
        expectedComment: 'not leap',
        solution: `if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  console.log('leap');
} else {
  console.log('not leap');
}`,
      },
      {
        file: '06-grade',
        task: 'Print grade: 90+ `A`, 75+ `B`, 60+ `C`, 40+ `D`, else `F`.',
        given: `const marks = 73;`,
        expectedComment: 'C',
        solution: `if (marks >= 90) {
  console.log('A');
} else if (marks >= 75) {
  console.log('B');
} else if (marks >= 60) {
  console.log('C');
} else if (marks >= 40) {
  console.log('D');
} else {
  console.log('F');
}`,
      },
      {
        file: '07-vowel',
        task: 'Print `vowel` or `consonant`.',
        given: `const ch = "u";`,
        expectedComment: 'vowel',
        solution: `if ('aeiou'.includes(ch)) {
  console.log('vowel');
} else {
  console.log('consonant');
}`,
      },
      {
        file: '08-switch-day',
        task: 'Use `switch` to print the weekday name (1 = Monday).',
        given: `const day = 6;`,
        expectedComment: 'Saturday',
        solution: `switch (day) {
  case 1:
    console.log('Monday');
    break;
  case 2:
    console.log('Tuesday');
    break;
  case 3:
    console.log('Wednesday');
    break;
  case 4:
    console.log('Thursday');
    break;
  case 5:
    console.log('Friday');
    break;
  case 6:
    console.log('Saturday');
    break;
  case 7:
    console.log('Sunday');
    break;
}`,
      },
      {
        file: '09-switch-calc',
        task: 'Use `switch` on `op` to print the result. Handle `+ - * /` and an unknown-operator default.',
        given: `const a = 12;\nconst b = 4;\nconst op = "/";`,
        expectedComment: '3',
        solution: `switch (op) {
  case '+':
    console.log(a + b);
    break;
  case '-':
    console.log(a - b);
    break;
  case '*':
    console.log(a * b);
    break;
  case '/':
    console.log(a / b);
    break;
  default:
    console.log('unknown operator');
}`,
      },
      {
        file: '10-can-vote',
        task: 'Print `can vote` only if 18+ **and** a citizen, else `cannot vote`.',
        given: `const age = 17;\nconst isCitizen = true;`,
        expectedComment: 'cannot vote',
        solution: `if (age >= 18 && isCitizen) {
  console.log('can vote');
} else {
  console.log('cannot vote');
}`,
      },
      {
        file: '11-triangle-valid',
        task: 'Print `valid` if each pair\'s sum exceeds the third side, else `invalid`.',
        given: `const a = 3;\nconst b = 4;\nconst c = 8;`,
        expectedComment: 'invalid',
        solution: `if (a + b > c && a + c > b && b + c > a) {
  console.log('valid');
} else {
  console.log('invalid');
}`,
      },
      {
        file: '12-fizzbuzz-one',
        task: 'Print `FizzBuzz`, `Fizz`, `Buzz`, or the number itself.',
        given: `const n = 15;`,
        expectedComment: 'FizzBuzz',
        solution: `if (n % 15 === 0) {
  console.log('FizzBuzz');
} else if (n % 3 === 0) {
  console.log('Fizz');
} else if (n % 5 === 0) {
  console.log('Buzz');
} else {
  console.log(n);
}`,
      },
    ],
  },
  {
    dir: '04-for-loops',
    exercises: [
      {
        file: '01-one-to-ten',
        task: 'Print 1 to 10, one per line.',
        expectedComment: null,
        solution: `for (let i = 1; i <= 10; i++) {
  console.log(i);
}`,
      },
      {
        file: '02-ten-to-one',
        task: 'Print 10 down to 1, one per line.',
        expectedComment: null,
        solution: `for (let i = 10; i >= 1; i--) {
  console.log(i);
}`,
      },
      {
        file: '03-evens',
        task: 'Print every even number from 2 to 20, one per line.',
        expectedComment: null,
        solution: `for (let i = 2; i <= 20; i += 2) {
  console.log(i);
}`,
      },
      {
        file: '04-sum-to-n',
        task: 'Print the sum of 1 to n.',
        given: `const n = 100;`,
        expectedComment: '5050',
        solution: `let sum = 0;
for (let i = 1; i <= n; i++) {
  sum += i;
}
console.log(sum);`,
      },
      {
        file: '05-times-table',
        task: 'Print `7 x 1 = 7` through `7 x 10 = 70`.',
        given: `const n = 7;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= 10; i++) {
  console.log(\`\${n} x \${i} = \${n * i}\`);
}`,
      },
      {
        file: '06-factorial',
        task: 'Print n factorial using a loop.',
        given: `const n = 6;`,
        expectedComment: '720',
        solution: `let fact = 1;
for (let i = 1; i <= n; i++) {
  fact *= i;
}
console.log(fact);`,
      },
      {
        file: '07-count-digits',
        task: 'Print how many digits it has, using a loop (not `.toString()`).',
        given: `const n = 74821;`,
        expectedComment: '5',
        solution: `let count = 0;
for (let num = n; num > 0; num = Math.floor(num / 10)) {
  count++;
}
console.log(count);`,
      },
      {
        file: '08-reverse-number',
        task: 'Print the number reversed, as a number.',
        given: `const n = 12345;`,
        expectedComment: '54321',
        solution: `let num = n;
let reversed = 0;
while (num > 0) {
  reversed = reversed * 10 + (num % 10);
  num = Math.floor(num / 10);
}
console.log(reversed);`,
      },
      {
        file: '09-power',
        task: 'Print `base ** exp` computed with a loop (no `Math.pow`, no `**`).',
        given: `const base = 3;\nconst exp = 5;`,
        expectedComment: '243',
        solution: `let result = 1;
for (let i = 0; i < exp; i++) {
  result *= base;
}
console.log(result);`,
      },
      {
        file: '10-sum-of-digits',
        task: 'Print the sum of its digits.',
        given: `const n = 9375;`,
        expectedComment: '24',
        solution: `let num = n;
let sum = 0;
while (num > 0) {
  sum += num % 10;
  num = Math.floor(num / 10);
}
console.log(sum);`,
      },
      {
        file: '11-squares',
        task: 'Print the square of every number 1 to 8, one per line.',
        expectedComment: null,
        solution: `for (let i = 1; i <= 8; i++) {
  console.log(i * i);
}`,
      },
      {
        file: '12-fibonacci',
        task: 'Print the first n Fibonacci numbers starting `0, 1`, one per line.',
        given: `const n = 10;`,
        expectedComment: null,
        solution: `let a = 0;
let b = 1;
for (let i = 0; i < n; i++) {
  console.log(a);
  const next = a + b;
  a = b;
  b = next;
}`,
      },
      {
        file: '13-fizzbuzz',
        task: 'Print FizzBuzz for 1 to 20, one per line.',
        expectedComment: null,
        solution: `for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}`,
      },
      {
        file: '14-count-vowels',
        task: 'Loop over the characters and print the vowel count.',
        given: `const s = "javascript is fun";`,
        expectedComment: '6',
        solution: `let count = 0;
for (let i = 0; i < s.length; i++) {
  if ('aeiou'.includes(s[i])) {
    count++;
  }
}
console.log(count);`,
      },
    ],
  },
  {
    dir: '05-while-loops',
    exercises: [
      {
        file: '01-while-count',
        task: 'Print 1 to n using a `while` loop.',
        given: `const n = 5;`,
        expectedComment: '1\n2\n3\n4\n5',
        solution: `let i = 1;
while (i <= n) {
  console.log(i);
  i++;
}`,
      },
      {
        file: '02-sum-digits-while',
        task: 'Print the digit sum using `while`.',
        given: `const n = 48291;`,
        expectedComment: '24',
        solution: `let num = n;
let sum = 0;
while (num > 0) {
  sum += num % 10;
  num = Math.floor(num / 10);
}
console.log(sum);`,
      },
      {
        file: '03-reverse-while',
        task: 'Print it reversed using `while`.',
        given: `const n = 9081;`,
        expectedComment: '1809',
        solution: `let num = n;
let reversed = 0;
while (num > 0) {
  reversed = reversed * 10 + (num % 10);
  num = Math.floor(num / 10);
}
console.log(reversed);`,
      },
      {
        file: '04-palindrome-number',
        task: 'Print `palindrome` or `not palindrome`.',
        given: `const n = 12321;`,
        expectedComment: 'palindrome',
        solution: `let num = n;
let reversed = 0;
let temp = num;
while (temp > 0) {
  reversed = reversed * 10 + (temp % 10);
  temp = Math.floor(temp / 10);
}
if (reversed === n) {
  console.log('palindrome');
} else {
  console.log('not palindrome');
}`,
      },
      {
        file: '05-armstrong',
        task: 'Print `armstrong` if the sum of each digit cubed equals n.',
        given: `const n = 153;`,
        expectedComment: 'armstrong',
        solution: `let num = n;
let sum = 0;
let temp = num;
while (temp > 0) {
  const digit = temp % 10;
  sum += digit * digit * digit;
  temp = Math.floor(temp / 10);
}
if (sum === n) {
  console.log('armstrong');
} else {
  console.log('not armstrong');
}`,
      },
      {
        file: '06-gcd',
        task: 'Print the GCD using Euclid\'s algorithm with `while`.',
        given: `const a = 48;\nconst b = 18;`,
        expectedComment: '6',
        solution: `let x = a;
let y = b;
while (y !== 0) {
  const rem = x % y;
  x = y;
  y = rem;
}
console.log(x);`,
      },
      {
        file: '07-count-digits-while',
        task: 'Print its digit count using `while`.',
        given: `const n = 1000000;`,
        expectedComment: '7',
        solution: `let num = n;
let count = 0;
while (num > 0) {
  count++;
  num = Math.floor(num / 10);
}
console.log(count);`,
      },
      {
        file: '08-to-binary',
        task: 'Print its binary form by repeatedly dividing by 2 (no `.toString(2)`).',
        given: `const n = 25;`,
        expectedComment: '11001',
        solution: `let num = n;
let binary = '';
while (num > 0) {
  binary = (num % 2) + binary;
  num = Math.floor(num / 2);
}
console.log(binary);`,
      },
      {
        file: '09-do-while',
        task: 'Use `do...while` to show the body runs once even though the condition is false. Print `ran once` then `loop finished`.',
        given: `const n = 0;`,
        expectedComment: 'ran once\nloop finished',
        solution: `do {
  console.log('ran once');
} while (n > 0);
console.log('loop finished');`,
      },
      {
        file: '10-collatz',
        task: 'Count the steps to reach 1 (even → n/2, odd → 3n+1). Print the count.',
        given: `const n = 27;`,
        expectedComment: '111',
        solution: `let num = n;
let steps = 0;
while (num !== 1) {
  if (num % 2 === 0) {
    num = num / 2;
  } else {
    num = 3 * num + 1;
  }
  steps++;
}
console.log(steps);`,
      },
    ],
  },
  {
    dir: '06-patterns',
    exercises: [
      {
        file: '01-star-square',
        task: 'Print a solid square of `*` with side length n.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 0; i < n; i++) {
  let line = '';
  for (let j = 0; j < n; j++) {
    line += '*';
  }
  console.log(line);
}`,
      },
      {
        file: '02-star-triangle',
        task: 'Print a left-aligned right triangle of `*`, rows 1 through n.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 0; j < i; j++) {
    line += '*';
  }
  console.log(line);
}`,
      },
      {
        file: '03-number-triangle',
        task: 'Print a left-aligned triangle where row `i` shows `1 2 … i`.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += ' ';
    line += j;
  }
  console.log(line);
}`,
      },
      {
        file: '04-same-number-triangle',
        task: 'Print a triangle where row `i` repeats the digit `i` exactly `i` times.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 0; j < i; j++) {
    if (j > 0) line += ' ';
    line += i;
  }
  console.log(line);
}`,
      },
      {
        file: '05-inverted-star-triangle',
        task: 'Print a left-aligned triangle of `*` with rows n down to 1.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = n; i >= 1; i--) {
  let line = '';
  for (let j = 0; j < i; j++) {
    line += '*';
  }
  console.log(line);
}`,
      },
      {
        file: '06-inverted-number-triangle',
        task: 'Print rows n down to 1, each row showing `1 2 … i`.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = n; i >= 1; i--) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += ' ';
    line += j;
  }
  console.log(line);
}`,
      },
      {
        file: '07-floyds-triangle',
        task: 'Print Floyd\'s triangle: numbers 1 through 15 laid out in n rows.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `let num = 1;
for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += ' ';
    line += num;
    num++;
  }
  console.log(line);
}`,
      },
      {
        file: '08-binary-triangle',
        task: 'Print a triangle of alternating `1` and `0`, each row starting with `1`.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += ' ';
    line += j % 2 === 1 ? '1' : '0';
  }
  console.log(line);
}`,
      },
      {
        file: '09-pyramid',
        task: 'Print a centred pyramid of `*` with n rows.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  line += ' '.repeat(n - i);
  line += '*'.repeat(2 * i - 1);
  console.log(line);
}`,
      },
      {
        file: '10-inverted-pyramid',
        task: 'Print a centred pyramid of `*` upside down.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = n; i >= 1; i--) {
  let line = '';
  line += ' '.repeat(n - i);
  line += '*'.repeat(2 * i - 1);
  console.log(line);
}`,
      },
      {
        file: '11-diamond',
        task: 'Print a diamond: pyramid on top of an inverted pyramid.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  line += ' '.repeat(n - i);
  line += '*'.repeat(2 * i - 1);
  console.log(line);
}
for (let i = n - 1; i >= 1; i--) {
  let line = '';
  line += ' '.repeat(n - i);
  line += '*'.repeat(2 * i - 1);
  console.log(line);
}`,
      },
      {
        file: '12-half-diamond',
        task: 'Print a half-diamond: triangle up then triangle down, left-aligned.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '*'.repeat(i);
  console.log(line);
}
for (let i = n - 1; i >= 1; i--) {
  let line = '*'.repeat(i);
  console.log(line);
}`,
      },
      {
        file: '13-butterfly',
        task: 'Print a butterfly pattern of `*`.',
        given: `const n = 4;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= 2 * n - 1; i++) {
  let line = '';
  const row = i <= n ? i : 2 * n - i;
  const stars = '*'.repeat(row);
  const spaces = ' '.repeat(2 * (n - row));
  line = stars + spaces + stars;
  console.log(line);
}`,
      },
      {
        file: '14-hollow-square',
        task: 'Print an n×n square with `*` on the border and spaces inside.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= n; j++) {
    if (i === 1 || i === n || j === 1 || j === n) {
      line += '*';
    } else {
      line += ' ';
    }
  }
  console.log(line);
}`,
      },
      {
        file: '15-alphabet-triangle',
        task: 'Print row `i` as `A B …` up to the i-th letter.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 0; j < i; j++) {
    if (j > 0) line += ' ';
    line += String.fromCharCode(65 + j);
  }
  console.log(line);
}`,
      },
      {
        file: '16-multiplication-grid',
        task: 'Print an n×n multiplication table. Pad each number to width 4 with `padStart`.',
        given: `const n = 5;`,
        expectedComment: null,
        solution: `for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= n; j++) {
    if (j > 1) line += ' ';
    line += String(i * j).padStart(4);
  }
  console.log(line);
}`,
      },
    ],
  },
  {
    dir: '07-number-problems',
    exercises: [
      {
        file: '01-count-digits',
        task: 'Print how many digits n has.',
        given: `const n = 946213;`,
        expectedComment: '6',
        solution: `let count = 0;
let num = n;
while (num > 0) {
  count++;
  num = Math.floor(num / 10);
}
console.log(count);`,
      },
      {
        file: '02-reverse',
        task: 'Print n reversed as a number (leading zeros dropped).',
        given: `const n = 700;`,
        expectedComment: '7',
        solution: `let num = n;
let reversed = 0;
while (num > 0) {
  reversed = reversed * 10 + (num % 10);
  num = Math.floor(num / 10);
}
console.log(reversed);`,
      },
      {
        file: '03-palindrome',
        task: 'Print `true` if n is a palindrome, otherwise `false`.',
        given: `const n = 1221;`,
        expectedComment: 'true',
        solution: `let num = n;
let reversed = 0;
let temp = num;
while (temp > 0) {
  reversed = reversed * 10 + (temp % 10);
  temp = Math.floor(temp / 10);
}
console.log(reversed === n);`,
      },
      {
        file: '04-armstrong',
        task: 'Print `true` if n is an Armstrong number, otherwise `false`.',
        given: `const n = 371;`,
        expectedComment: 'true',
        solution: `let temp = n;
let digits = 0;
while (temp > 0) {
  digits++;
  temp = Math.floor(temp / 10);
}
temp = n;
let sum = 0;
while (temp > 0) {
  const d = temp % 10;
  sum += d ** digits;
  temp = Math.floor(temp / 10);
}
console.log(sum === n);`,
      },
      {
        file: '05-divisors',
        task: 'Print all divisors of n, space-separated, on one line.',
        given: `const n = 36;`,
        expectedComment: '1 2 3 4 6 9 12 18 36',
        solution: `const divisors = [];
for (let i = 1; i <= n; i++) {
  if (n % i === 0) {
    divisors.push(i);
  }
}
console.log(divisors.join(' '));`,
      },
      {
        file: '06-is-prime',
        task: 'Print `prime` or `not prime`. Loop only to `Math.sqrt(n)`.',
        given: `const n = 97;`,
        expectedComment: 'prime',
        solution: `let prime = n >= 2;
for (let i = 2; i <= Math.sqrt(n); i++) {
  if (n % i === 0) {
    prime = false;
    break;
  }
}
console.log(prime ? 'prime' : 'not prime');`,
      },
      {
        file: '07-gcd',
        task: 'Print the greatest common divisor of a and b.',
        given: `const a = 120;\nconst b = 45;`,
        expectedComment: '15',
        solution: `let x = a;
let y = b;
while (y !== 0) {
  const rem = x % y;
  x = y;
  y = rem;
}
console.log(x);`,
      },
      {
        file: '08-lcm',
        task: 'Print the LCM of a and b using `(a * b) / gcd`.',
        given: `const a = 12;\nconst b = 18;`,
        expectedComment: '36',
        solution: `let x = a;
let y = b;
while (y !== 0) {
  const rem = x % y;
  x = y;
  y = rem;
}
const gcd = x;
console.log((a * b) / gcd);`,
      },
      {
        file: '09-sum-divisors',
        task: 'Print the sum of all divisors of n, including n itself.',
        given: `const n = 28;`,
        expectedComment: '56',
        solution: `let sum = 0;
for (let i = 1; i <= n; i++) {
  if (n % i === 0) {
    sum += i;
  }
}
console.log(sum);`,
      },
      {
        file: '10-perfect-number',
        task: 'Print `perfect` if the proper divisors of n sum to n.',
        given: `const n = 496;`,
        expectedComment: 'perfect',
        solution: `let sum = 0;
for (let i = 1; i < n; i++) {
  if (n % i === 0) {
    sum += i;
  }
}
console.log(sum === n ? 'perfect' : 'not perfect');`,
      },
      {
        file: '11-prime-factors',
        task: 'Print the prime factors of n with repeats, space-separated.',
        given: `const n = 360;`,
        expectedComment: '2 2 2 3 3 5',
        solution: `let num = n;
const factors = [];
let d = 2;
while (num > 1) {
  while (num % d === 0) {
    factors.push(d);
    num = Math.floor(num / d);
  }
  d++;
}
console.log(factors.join(' '));`,
      },
      {
        file: '12-primes-to-n',
        task: 'Print every prime from 2 to n, space-separated.',
        given: `const n = 30;`,
        expectedComment: '2 3 5 7 11 13 17 19 23 29',
        solution: `const primes = [];
for (let i = 2; i <= n; i++) {
  let isPrime = true;
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    primes.push(i);
  }
}
console.log(primes.join(' '));`,
      },
      {
        file: '13-nth-prime',
        task: 'Print the k-th prime number.',
        given: `const k = 20;`,
        expectedComment: '71',
        solution: `let count = 0;
let candidate = 2;
while (count < k) {
  let isPrime = true;
  for (let j = 2; j <= Math.sqrt(candidate); j++) {
    if (candidate % j === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    count++;
    if (count === k) {
      console.log(candidate);
      break;
    }
  }
  candidate++;
}`,
      },
      {
        file: '14-digit-frequency',
        task: 'Print each distinct digit and its count as `digit:count`, ascending, space-separated.',
        given: `const n = 1223334444;`,
        expectedComment: '1:1 2:2 3:3 4:4',
        solution: `const s = String(n);
const freq = {};
for (const ch of s) {
  freq[ch] = (freq[ch] || 0) + 1;
}
const digits = Object.keys(freq).sort();
const parts = digits.map((d) => \`\${d}:\${freq[d]}\`);
console.log(parts.join(' '));`,
      },
    ],
  },
  {
    dir: '08-functions',
    exercises: [
      {
        file: '01-add',
        task: 'Export `add(a, b)` returning their sum. Use a function declaration.',
        test: {
          exportLine: 'export function add(a, b)',
          stubExport: 'export function add(a, b) {\n  // return the sum of a and b\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add } from './01-add.js';

test('adds two numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
  assert.equal(add(0, 0), 0);
});
`,
        },
        solution: `export function add(a, b) {
  return a + b;
}`,
      },
      {
        file: '02-arrow-multiply',
        task: 'Export `multiply(a, b)` as an arrow function with an implicit return.',
        test: {
          exportLine: 'export const multiply = (a, b) => …',
          stubExport: 'export const multiply = (a, b) => {\n  // return a * b\n};',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { multiply } from './02-arrow-multiply.js';

test('multiplies two numbers', () => {
  assert.equal(multiply(3, 4), 12);
  assert.equal(multiply(-2, 5), -10);
  assert.equal(multiply(0, 99), 0);
});
`,
        },
        solution: `export const multiply = (a, b) => a * b;`,
      },
      {
        file: '03-default-params',
        task: 'Export `greet(name, greeting = "Hello")` returning `"Hello, Ada!"` style strings.',
        test: {
          exportLine: 'export function greet(name, greeting = "Hello")',
          stubExport: 'export function greet(name, greeting = "Hello") {\n  // return a greeting string\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { greet } from './03-default-params.js';

test('greets with default greeting', () => {
  assert.equal(greet('Ada'), 'Hello, Ada!');
});

test('greets with custom greeting', () => {
  assert.equal(greet('Riya', 'Hi'), 'Hi, Riya!');
});
`,
        },
        solution: `export function greet(name, greeting = 'Hello') {
  return \`\${greeting}, \${name}!\`;
}`,
      },
      {
        file: '04-is-even',
        task: 'Export `isEven(n)` returning a boolean.',
        test: {
          exportLine: 'export function isEven(n)',
          stubExport: 'export function isEven(n) {\n  // return true if n is even\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isEven } from './04-is-even.js';

test('detects even and odd numbers', () => {
  assert.equal(isEven(4), true);
  assert.equal(isEven(7), false);
  assert.equal(isEven(0), true);
});
`,
        },
        solution: `export function isEven(n) {
  return n % 2 === 0;
}`,
      },
      {
        file: '05-min-max-object',
        task: 'Export `minMax(numbers)` returning `{ min, max }`.',
        test: {
          exportLine: 'export function minMax(numbers)',
          stubExport: 'export function minMax(numbers) {\n  // return { min, max }\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { minMax } from './05-min-max-object.js';

test('finds min and max', () => {
  assert.deepEqual(minMax([3, 1, 4, 1, 5]), { min: 1, max: 5 });
  assert.deepEqual(minMax([-2, -8, -1]), { min: -8, max: -1 });
});
`,
        },
        solution: `export function minMax(numbers) {
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}`,
      },
      {
        file: '06-rest-sum',
        task: 'Export `sum(...numbers)` handling any argument count. Return 0 when called with no arguments.',
        test: {
          exportLine: 'export function sum(...numbers)',
          stubExport: 'export function sum(...numbers) {\n  // return the sum of all arguments\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sum } from './06-rest-sum.js';

test('sums numbers', () => {
  assert.equal(sum(1, 2, 3), 6);
  assert.equal(sum(10), 10);
  assert.equal(sum(), 0);
});
`,
        },
        solution: `export function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}`,
      },
      {
        file: '07-apply-twice',
        task: 'Export `applyTwice(fn, value)` returning `fn(fn(value))`.',
        test: {
          exportLine: 'export function applyTwice(fn, value)',
          stubExport: 'export function applyTwice(fn, value) {\n  // apply fn twice to value\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyTwice } from './07-apply-twice.js';

test('applies a function twice', () => {
  assert.equal(applyTwice((x) => x + 1, 5), 7);
  assert.equal(applyTwice((x) => x * 2, 3), 12);
});
`,
        },
        solution: `export function applyTwice(fn, value) {
  return fn(fn(value));
}`,
      },
      {
        file: '08-make-multiplier',
        task: 'Export `makeMultiplier(n)` returning a function that multiplies its argument by n.',
        test: {
          exportLine: 'export function makeMultiplier(n)',
          stubExport: 'export function makeMultiplier(n) {\n  // return a function that multiplies by n\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeMultiplier } from './08-make-multiplier.js';

test('creates a multiplier function', () => {
  const double = makeMultiplier(2);
  const triple = makeMultiplier(3);
  assert.equal(double(5), 10);
  assert.equal(triple(4), 12);
});
`,
        },
        solution: `export function makeMultiplier(n) {
  return (value) => value * n;
}`,
      },
      {
        file: '09-return-vs-log',
        task: 'Define two functions — one that returns `5`, one that logs `5` and returns nothing. Print the result of calling each.',
        expectedComment: '5\n5\nundefined',
        solution: `function returnsFive() {
  return 5;
}

function logsFive() {
  console.log(5);
}

console.log(returnsFive());
console.log(logsFive());`,
      },
      {
        file: '10-spread-call',
        task: 'Call `Math.max` with the array spread into it and print the result.',
        given: `const nums = [4, 9, 2];`,
        expectedComment: '9',
        solution: `console.log(Math.max(...nums));`,
      },
      {
        file: '11-callback',
        task: 'Write `repeat(times, callback)` that calls the callback with each index 0..times-1. Call it with `times = 3` and a callback that prints `step 0` etc.',
        given: `const times = 3;`,
        expectedComment: 'step 0\nstep 1\nstep 2',
        solution: `function repeat(times, callback) {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
}

repeat(times, (i) => {
  console.log(\`step \${i}\`);
});`,
      },
      {
        file: '12-iife',
        task: 'Write an IIFE that prints `ran immediately`.',
        expectedComment: 'ran immediately',
        solution: `(function () {
  console.log('ran immediately');
})();`,
      },
      {
        file: '13-scope',
        task: 'Inside an `if` block declare `let inner = "block"`. Outside, declare `let outer = "function"`. Print `inner` inside the block and `outer` outside. Add a comment explaining why printing `inner` outside would throw.',
        expectedComment: 'block\nfunction',
        solution: `if (true) {
  let inner = 'block';
  console.log(inner);
}

let outer = 'function';
console.log(outer);

// Printing inner outside the block would throw ReferenceError
// because let is block-scoped and inner does not exist here.`,
      },
      {
        file: '14-closure-counter',
        task: 'Write `makeCounter()` returning a function that returns 1, 2, 3… on successive calls. Create one counter, call it 3 times, print each result.',
        expectedComment: '1\n2\n3',
        solution: `function makeCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());`,
      },
    ],
  },
  {
    dir: '09-strings',
    exercises: [
      {
        file: '01-basics',
        task: 'Print the string\'s length, uppercase form, and lowercase form — one per line.',
        given: `const s = "JavaScript";`,
        expectedComment: '10\nJAVASCRIPT\njavascript',
        solution: `console.log(s.length);
console.log(s.toUpperCase());
console.log(s.toLowerCase());`,
      },
      {
        file: '02-loop-chars',
        task: 'Print each character on its own line.',
        given: `const s = "code";`,
        expectedComment: 'c\no\nd\ne',
        solution: `for (let i = 0; i < s.length; i++) {
  console.log(s[i]);
}`,
      },
      {
        file: '03-reverse',
        task: 'Print the string reversed using a loop (not `.split().reverse().join()`).',
        given: `const s = "bareilly";`,
        expectedComment: 'yllierab',
        solution: `let reversed = '';
for (let i = s.length - 1; i >= 0; i--) {
  reversed += s[i];
}
console.log(reversed);`,
      },
      {
        file: '04-palindrome',
        task: 'Print `true` if the string is a palindrome, otherwise `false`.',
        given: `const s = "racecar";`,
        expectedComment: 'true',
        solution: `let reversed = '';
for (let i = s.length - 1; i >= 0; i--) {
  reversed += s[i];
}
console.log(s === reversed);`,
      },
      {
        file: '05-count-vowels-consonants',
        task: 'Print `vowels: N` then `consonants: N` for the letters only.',
        given: `const s = "hello world";`,
        expectedComment: 'vowels: 3\nconsonants: 7',
        solution: `let vowels = 0;
let consonants = 0;
for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  if (ch === ' ') continue;
  if ('aeiou'.includes(ch)) {
    vowels++;
  } else {
    consonants++;
  }
}
console.log(\`vowels: \${vowels}\`);
console.log(\`consonants: \${consonants}\`);`,
      },
      {
        file: '06-word-count',
        task: 'Print the number of words, handling extra spaces.',
        given: `const s = " the quick  brown fox ";`,
        expectedComment: '4',
        solution: `const trimmed = s.trim();
const words = trimmed.split(/\\s+/);
console.log(words.length);`,
      },
      {
        file: '07-title-case',
        task: 'Print the string with each word capitalised.',
        given: `const s = "learning javascript today";`,
        expectedComment: 'Learning Javascript Today',
        solution: `const words = s.split(' ');
const titled = words.map((word) => {
  return word[0].toUpperCase() + word.slice(1);
});
console.log(titled.join(' '));`,
      },
      {
        file: '08-remove-duplicates',
        task: 'Print the string with duplicate characters removed, keeping first occurrences.',
        given: `const s = "programming";`,
        expectedComment: 'progamin',
        solution: `let result = '';
for (let i = 0; i < s.length; i++) {
  if (!result.includes(s[i])) {
    result += s[i];
  }
}
console.log(result);`,
      },
      {
        file: '09-split-join',
        task: 'Split on commas and print the parts joined by ` - `.',
        given: `const s = "a,b,c,d";`,
        expectedComment: 'a - b - c - d',
        solution: `const parts = s.split(',');
console.log(parts.join(' - '));`,
      },
      {
        file: '10-search-methods',
        task: 'Print `includes("script")`, `startsWith("java")`, `endsWith("x")`, and `indexOf("a")` — one per line.',
        given: `const s = "javascript";`,
        expectedComment: 'true\ntrue\nfalse\n1',
        solution: `console.log(s.includes('script'));
console.log(s.startsWith('java'));
console.log(s.endsWith('x'));
console.log(s.indexOf('a'));`,
      },
      {
        file: '11-slice',
        task: 'Print `s.slice(2, 5)`, `s.slice(-3)`, and `s.substring(5, 2)` — one per line.',
        given: `const s = "abcdefgh";`,
        expectedComment: 'cde\nfgh\ncde',
        solution: `console.log(s.slice(2, 5));
console.log(s.slice(-3));
console.log(s.substring(5, 2));`,
      },
      {
        file: '12-replace',
        task: 'Print `s.replace("cat", "dog")` then `s.replaceAll("cat", "dog")` — one per line.',
        given: `const s = "cat bat cat";`,
        expectedComment: 'dog bat cat\ndog bat dog',
        solution: `console.log(s.replace('cat', 'dog'));
console.log(s.replaceAll('cat', 'dog'));`,
      },
      {
        file: '13-trim-pad',
        task: 'Print `s.trim()`, then the trimmed value padded to 5 with leading zeros.',
        given: `const s = "  7  ";`,
        expectedComment: '7\n00007',
        solution: `const trimmed = s.trim();
console.log(trimmed);
console.log(trimmed.padStart(5, '0'));`,
      },
      {
        file: '14-anagram',
        task: 'Print `true` if a and b are anagrams. Sort the characters to compare.',
        given: `const a = "listen";\nconst b = "silent";`,
        expectedComment: 'true',
        solution: `const sortedA = a.split('').sort().join('');
const sortedB = b.split('').sort().join('');
console.log(sortedA === sortedB);`,
      },
    ],
  },
  {
    dir: '10-arrays',
    exercises: [
      {
        file: '01-basics',
        task: 'Print the array length, first element, and last element — one per line.',
        given: `const arr = [10, 20, 30];`,
        expectedComment: '3\n10\n30',
        solution: `console.log(arr.length);
console.log(arr[0]);
console.log(arr[arr.length - 1]);`,
      },
      {
        file: '02-mutate',
        task: '`push(4)`, `unshift(1)`, print joined. Then `pop()`, `shift()`, print joined again.',
        given: `const arr = [2, 3];`,
        expectedComment: '1 2 3 4\n2 3',
        solution: `arr.push(4);
arr.unshift(1);
console.log(arr.join(' '));
arr.pop();
arr.shift();
console.log(arr.join(' '));`,
      },
      {
        file: '03-two-loops',
        task: 'Print each element with a classic `for`, then again with `for...of`.',
        given: `const arr = ["a", "b", "c"];`,
        expectedComment: 'a\nb\nc\na\nb\nc',
        solution: `for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
for (const item of arr) {
  console.log(item);
}`,
      },
      {
        file: '04-sum-average',
        task: 'Print the sum, then the average to 2 decimal places.',
        given: `const arr = [4, 8, 15, 16, 23, 42];`,
        expectedComment: '108\n18.00',
        solution: `let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);
console.log((sum / arr.length).toFixed(2));`,
      },
      {
        file: '05-largest',
        task: 'Print the largest element without using `Math.max`.',
        given: `const arr = [3, 41, 7, 41, 19];`,
        expectedComment: '41',
        solution: `let largest = arr[0];
for (let i = 1; i < arr.length; i++) {
  if (arr[i] > largest) {
    largest = arr[i];
  }
}
console.log(largest);`,
      },
      {
        file: '06-second-largest',
        task: 'Print the second largest **distinct** value.',
        given: `const arr = [12, 35, 1, 10, 34, 35];`,
        expectedComment: '34',
        solution: `let largest = -Infinity;
let second = -Infinity;
for (let i = 0; i < arr.length; i++) {
  const n = arr[i];
  if (n > largest) {
    second = largest;
    largest = n;
  } else if (n > second && n < largest) {
    second = n;
  }
}
console.log(second);`,
      },
      {
        file: '07-is-sorted',
        task: 'Print `true` if the array is non-decreasing.',
        given: `const arr = [1, 2, 2, 5, 9];`,
        expectedComment: 'true',
        solution: `let sorted = true;
for (let i = 1; i < arr.length; i++) {
  if (arr[i] < arr[i - 1]) {
    sorted = false;
    break;
  }
}
console.log(sorted);`,
      },
      {
        file: '08-reverse-in-place',
        task: 'Reverse the array using two pointers — no `.reverse()`. Print joined.',
        given: `const arr = [1, 2, 3, 4, 5];`,
        expectedComment: '5 4 3 2 1',
        solution: `let left = 0;
let right = arr.length - 1;
while (left < right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
  left++;
  right--;
}
console.log(arr.join(' '));`,
      },
      {
        file: '09-linear-search',
        task: 'Print the index of target, or `-1` if not found.',
        given: `const arr = [7, 3, 9, 1];\nconst target = 9;`,
        expectedComment: '2',
        solution: `let index = -1;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    index = i;
    break;
  }
}
console.log(index);`,
      },
      {
        file: '10-count-occurrences',
        task: 'Print how many times target appears.',
        given: `const arr = [1, 3, 3, 5, 3];\nconst target = 3;`,
        expectedComment: '3',
        solution: `let count = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    count++;
  }
}
console.log(count);`,
      },
      {
        file: '11-remove-duplicates-sorted',
        task: 'Print the unique values joined (array is already sorted).',
        given: `const arr = [1, 1, 2, 2, 2, 3, 3];`,
        expectedComment: '1 2 3',
        solution: `const unique = [];
for (let i = 0; i < arr.length; i++) {
  if (i === 0 || arr[i] !== arr[i - 1]) {
    unique.push(arr[i]);
  }
}
console.log(unique.join(' '));`,
      },
      {
        file: '12-rotate-one',
        task: 'Left-rotate by one place. Print joined.',
        given: `const arr = [1, 2, 3, 4, 5];`,
        expectedComment: '2 3 4 5 1',
        solution: `const first = arr.shift();
arr.push(first);
console.log(arr.join(' '));`,
      },
      {
        file: '13-rotate-k',
        task: 'Left-rotate by k places. Print joined.',
        given: `const arr = [1, 2, 3, 4, 5, 6, 7];\nconst k = 3;`,
        expectedComment: '4 5 6 7 1 2 3',
        solution: `for (let i = 0; i < k; i++) {
  const first = arr.shift();
  arr.push(first);
}
console.log(arr.join(' '));`,
      },
      {
        file: '14-move-zeros',
        task: 'Move all zeros to the end, keeping the order of the rest. Print joined.',
        given: `const arr = [0, 1, 0, 3, 12];`,
        expectedComment: '1 3 12 0 0',
        solution: `const nonZero = [];
let zeroCount = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 0) {
    zeroCount++;
  } else {
    nonZero.push(arr[i]);
  }
}
for (let i = 0; i < zeroCount; i++) {
  nonZero.push(0);
}
console.log(nonZero.join(' '));`,
      },
      {
        file: '15-union-sorted',
        task: 'Print the sorted union of a and b, joined.',
        given: `const a = [1, 2, 3, 4, 6];\nconst b = [2, 3, 5];`,
        expectedComment: '1 2 3 4 5 6',
        solution: `const set = new Set([...a, ...b]);
const union = [...set].sort((x, y) => x - y);
console.log(union.join(' '));`,
      },
      {
        file: '16-missing-number',
        task: 'Print the missing number from 0..n.',
        given: `const arr = [0, 1, 2, 4, 5];\nconst n = 5;`,
        expectedComment: '3',
        solution: `const expectedSum = (n * (n + 1)) / 2;
let actualSum = 0;
for (let i = 0; i < arr.length; i++) {
  actualSum += arr[i];
}
console.log(expectedSum - actualSum);`,
      },
    ],
  },
  {
    dir: '11-array-methods',
    exercises: [
      {
        file: '01-foreach',
        task: 'Use `forEach` to print `index: value` for each element.',
        given: `const arr = [10, 20, 30];`,
        expectedComment: '0: 10\n1: 20\n2: 30',
        solution: `arr.forEach((value, index) => {
  console.log(\`\${index}: \${value}\`);
});`,
      },
      {
        file: '02-map',
        task: 'Print each element doubled, joined.',
        given: `const arr = [1, 2, 3, 4];`,
        expectedComment: '2 4 6 8',
        solution: `console.log(arr.map((n) => n * 2).join(' '));`,
      },
      {
        file: '03-filter',
        task: 'Print only even numbers, joined.',
        given: `const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];`,
        expectedComment: '2 4 6 8 10',
        solution: `console.log(arr.filter((n) => n % 2 === 0).join(' '));`,
      },
      {
        file: '04-reduce-sum',
        task: 'Print the sum using `reduce`.',
        given: `const arr = [5, 10, 15];`,
        expectedComment: '30',
        solution: `console.log(arr.reduce((sum, n) => sum + n, 0));`,
      },
      {
        file: '05-reduce-max',
        task: 'Print the max using `reduce`.',
        given: `const arr = [4, 19, 7, 2];`,
        expectedComment: '19',
        solution: `console.log(arr.reduce((max, n) => (n > max ? n : max), arr[0]));`,
      },
      {
        file: '06-find',
        task: 'Print the first element greater than 7, then its index.',
        given: `const arr = [3, 8, 12, 5];`,
        expectedComment: '8\n1',
        solution: `console.log(arr.find((n) => n > 7));
console.log(arr.findIndex((n) => n > 7));`,
      },
      {
        file: '07-some-every',
        task: 'Print `arr.some(isOdd)` then `arr.every(isEven)`.',
        given: `const arr = [2, 4, 6, 7];`,
        expectedComment: 'true\nfalse',
        solution: `const isOdd = (n) => n % 2 !== 0;
const isEven = (n) => n % 2 === 0;
console.log(arr.some(isOdd));
console.log(arr.every(isEven));`,
      },
      {
        file: '08-sort-numbers',
        task: 'Print sorted ascending, then descending, each joined. Explain in a comment why plain `.sort()` is wrong here.',
        given: `const arr = [10, 9, 100, 2];`,
        expectedComment: '2 9 10 100\n100 10 9 2',
        solution: `// Plain .sort() compares values as strings, so 100 comes before 2.
console.log([...arr].sort((a, b) => a - b).join(' '));
console.log([...arr].sort((a, b) => b - a).join(' '));`,
      },
      {
        file: '09-sort-strings',
        task: 'Print sorted alphabetically, joined.',
        given: `const arr = ["banana", "apple", "cherry"];`,
        expectedComment: 'apple banana cherry',
        solution: `console.log([...arr].sort().join(' '));`,
      },
      {
        file: '10-chaining',
        task: 'Take the evens, square them, sum them. Print the result.',
        given: `const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];`,
        expectedComment: '220',
        solution: `const result = arr
  .filter((n) => n % 2 === 0)
  .map((n) => n * n)
  .reduce((sum, n) => sum + n, 0);
console.log(result);`,
      },
      {
        file: '11-flat',
        task: 'Print `arr.flat()` joined, then `arr.flat(2)` joined.',
        given: `const arr = [1, [2, 3], [4, [5]]];`,
        expectedComment: '1 2 3 4\n1 2 3 4 5',
        solution: `console.log(arr.flat().join(' '));
console.log(arr.flat(2).join(' '));`,
      },
      {
        file: '12-immutability',
        task: 'Show that `map` returns a new array and doesn\'t change the original. Print the mapped array joined, then the original joined.',
        given: `const arr = [1, 2, 3];`,
        expectedComment: '2 4 6\n1 2 3',
        solution: `const doubled = arr.map((n) => n * 2);
console.log(doubled.join(' '));
console.log(arr.join(' '));`,
      },
    ],
  },
  {
    dir: '12-objects',
    exercises: [
      {
        file: '01-access',
        task: 'Print `user.name` and `user["age"]`.',
        given: `const user = { name: "Ada", age: 36 };`,
        expectedComment: 'Ada\n36',
        solution: `console.log(user.name);
console.log(user['age']);`,
      },
      {
        file: '02-modify',
        task: 'Add `city: "London"`, change age to 37, delete `age`. Print the object\'s keys joined.',
        given: `const user = { name: "Ada", age: 36 };`,
        expectedComment: 'name city',
        solution: `user.city = 'London';
user.age = 37;
delete user.age;
console.log(Object.keys(user).join(' '));`,
      },
      {
        file: '03-for-in',
        task: 'Print `key: value` for each property with `for...in`.',
        given: `const scores = { math: 90, science: 85, art: 72 };`,
        expectedComment: 'math: 90\nscience: 85\nart: 72',
        solution: `for (const key in scores) {
  console.log(\`\${key}: \${scores[key]}\`);
}`,
      },
      {
        file: '04-keys-values-entries',
        task: 'Print `Object.keys` joined, `Object.values` joined, and the number of entries.',
        given: `const scores = { math: 90, science: 85, art: 72 };`,
        expectedComment: 'math science art\n90 85 72\n3',
        solution: `console.log(Object.keys(scores).join(' '));
console.log(Object.values(scores).join(' '));
console.log(Object.entries(scores).length);`,
      },
      {
        file: '05-nested',
        task: 'Print the city from the nested address.',
        given: `const user = {
  name: "Ada",
  address: {
    city: "Bareilly",
  },
};`,
        expectedComment: 'Bareilly',
        solution: `console.log(user.address.city);`,
      },
      {
        file: '06-list-names',
        task: 'Print each person\'s name on its own line.',
        given: `const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];`,
        expectedComment: 'Ada\nRaman\nMeera',
        solution: `for (const person of people) {
  console.log(person.name);
}`,
      },
      {
        file: '07-filter-objects',
        task: 'Print the names of everyone over 30, joined by `, `.',
        given: `const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];`,
        expectedComment: 'Ada, Raman',
        solution: `console.log(
  people
    .filter((person) => person.age > 30)
    .map((person) => person.name)
    .join(', '),
);`,
      },
      {
        file: '08-sort-objects',
        task: 'Print names sorted by age ascending, joined.',
        given: `const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];`,
        expectedComment: 'Meera Ada Raman',
        solution: `console.log(
  [...people]
    .sort((a, b) => a.age - b.age)
    .map((person) => person.name)
    .join(' '),
);`,
      },
      {
        file: '09-destructure',
        task: 'Destructure name and city into variables and print `Ada — London`.',
        given: `const user = { name: "Ada", age: 36, city: "London" };`,
        expectedComment: 'Ada — London',
        solution: `const { name, city } = user;
console.log(\`\${name} — \${city}\`);`,
      },
      {
        file: '10-spread-merge',
        task: 'Merge with spread and print the merged object\'s `theme` and `fontSize`.',
        given: `const defaults = { theme: "light", fontSize: 14 };\nconst custom = { fontSize: 18 };`,
        expectedComment: 'light\n18',
        solution: `const merged = { ...defaults, ...custom };
console.log(merged.theme);
console.log(merged.fontSize);`,
      },
      {
        file: '11-json',
        task: 'Print `JSON.stringify` of the first person, then parse that string back and print the parsed `.name`.',
        given: `const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];`,
        expectedComment: '{"name":"Ada","age":36,"city":"London"}\nAda',
        solution: `const json = JSON.stringify(people[0]);
console.log(json);
console.log(JSON.parse(json).name);`,
      },
      {
        file: '12-optional-chaining',
        task: 'Print `user.address?.city` and `user.address?.city ?? "unknown"`.',
        given: `const user = { name: "Ada" };`,
        expectedComment: 'undefined\nunknown',
        solution: `console.log(user.address?.city);
console.log(user.address?.city ?? 'unknown');`,
      },
    ],
  },
  {
    dir: '13-recursion',
    exercises: [
      {
        file: '01-print-n-times',
        task: 'Recursively print `learning` 4 times. No loops.',
        expectedComment: 'learning\nlearning\nlearning\nlearning',
        solution: `function printNTimes(n) {
  if (n === 0) return;
  console.log('learning');
  printNTimes(n - 1);
}
printNTimes(4);`,
      },
      {
        file: '02-print-one-to-n',
        task: 'Recursively print 1 to n.',
        given: `const n = 5;`,
        expectedComment: '1\n2\n3\n4\n5',
        solution: `function printOneToN(i) {
  if (i > n) return;
  console.log(i);
  printOneToN(i + 1);
}
printOneToN(1);`,
      },
      {
        file: '03-print-n-to-one',
        task: 'Recursively print n down to 1.',
        given: `const n = 5;`,
        expectedComment: '5\n4\n3\n2\n1',
        solution: `function printNToOne(current) {
  if (current === 0) return;
  console.log(current);
  printNToOne(current - 1);
}
printNToOne(n);`,
      },
      {
        file: '04-sum-to-n',
        task: 'Export `sumTo(n)` returning 1+2+…+n recursively.',
        test: {
          exportLine: 'export function sumTo(n)',
          stubExport: 'export function sumTo(n) {\n  // your code\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sumTo } from './04-sum-to-n.js';

test('sumTo adds 1 through n', () => {
  assert.equal(sumTo(5), 15);
  assert.equal(sumTo(1), 1);
  assert.equal(sumTo(0), 0);
});
`,
        },
        solution: `export function sumTo(n) {
  if (n <= 0) return 0;
  return n + sumTo(n - 1);
}`,
      },
      {
        file: '05-factorial',
        task: 'Export `factorial(n)`. `factorial(0)` must return 1.',
        test: {
          exportLine: 'export function factorial(n)',
          stubExport: 'export function factorial(n) {\n  // your code\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { factorial } from './05-factorial.js';

test('factorial', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
});
`,
        },
        solution: `export function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      },
      {
        file: '06-reverse-array',
        task: 'Export `reverse(arr)` returning a reversed **new** array, recursively.',
        test: {
          exportLine: 'export function reverse(arr)',
          stubExport: 'export function reverse(arr) {\n  // your code\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reverse } from './06-reverse-array.js';

test('reverse returns a new reversed array', () => {
  const original = [1, 2, 3];
  const result = reverse(original);
  assert.deepEqual(result, [3, 2, 1]);
  assert.deepEqual(original, [1, 2, 3]);
});
`,
        },
        solution: `export function reverse(arr) {
  if (arr.length === 0) return [];
  return reverse(arr.slice(1)).concat(arr[0]);
}`,
      },
      {
        file: '07-is-palindrome',
        task: 'Export `isPalindrome(s)` using two indices recursively.',
        test: {
          exportLine: 'export function isPalindrome(s)',
          stubExport: 'export function isPalindrome(s) {\n  // your code\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPalindrome } from './07-is-palindrome.js';

test('isPalindrome', () => {
  assert.equal(isPalindrome('racecar'), true);
  assert.equal(isPalindrome('hello'), false);
  assert.equal(isPalindrome('a'), true);
});
`,
        },
        solution: `export function isPalindrome(s) {
  function check(left, right) {
    if (left >= right) return true;
    if (s[left] !== s[right]) return false;
    return check(left + 1, right - 1);
  }
  return check(0, s.length - 1);
}`,
      },
      {
        file: '08-fibonacci',
        task: 'Export `fib(n)` where `fib(0) = 0`, `fib(1) = 1`.',
        test: {
          exportLine: 'export function fib(n)',
          stubExport: 'export function fib(n) {\n  // your code\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fib } from './08-fibonacci.js';

test('fibonacci', () => {
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(6), 8);
});
`,
        },
        solution: `export function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}`,
      },
      {
        file: '09-power',
        task: 'Export `power(base, exp)` recursively, `exp >= 0`.',
        test: {
          exportLine: 'export function power(base, exp)',
          stubExport: 'export function power(base, exp) {\n  // your code\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { power } from './09-power.js';

test('power', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(5, 0), 1);
  assert.equal(power(3, 4), 81);
});
`,
        },
        solution: `export function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}`,
      },
      {
        file: '10-sum-digits',
        task: 'Export `sumDigits(n)` recursively.',
        test: {
          exportLine: 'export function sumDigits(n)',
          stubExport: 'export function sumDigits(n) {\n  // your code\n}',
          tests: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sumDigits } from './10-sum-digits.js';

test('sumDigits', () => {
  assert.equal(sumDigits(123), 6);
  assert.equal(sumDigits(0), 0);
  assert.equal(sumDigits(9375), 24);
});
`,
        },
        solution: `export function sumDigits(n) {
  if (n === 0) return 0;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}`,
      },
    ],
  },
  {
    dir: '14-hashing',
    exercises: [
      {
        file: '01-char-count-object',
        task: 'Count characters using a plain object. Print `char:count` pairs in insertion order, space-separated.',
        given: `const s = "banana";`,
        expectedComment: 'b:1 a:3 n:2',
        solution: `const counts = {};
for (const ch of s) {
  counts[ch] = (counts[ch] ?? 0) + 1;
}
console.log(Object.entries(counts).map(([ch, count]) => \`\${ch}:\${count}\`).join(' '));`,
      },
      {
        file: '02-char-count-map',
        task: 'Count characters using a `Map`. Print the same output.',
        given: `const s = "banana";`,
        expectedComment: 'b:1 a:3 n:2',
        solution: `const counts = new Map();
for (const ch of s) {
  counts.set(ch, (counts.get(ch) ?? 0) + 1);
}
console.log([...counts.entries()].map(([ch, count]) => \`\${ch}:\${count}\`).join(' '));`,
      },
      {
        file: '03-array-frequency',
        task: 'Print `value:count` in insertion order, space-separated.',
        given: `const arr = [10, 5, 10, 15, 10, 5];`,
        expectedComment: '10:3 5:2 15:1',
        solution: `const counts = new Map();
for (const value of arr) {
  counts.set(value, (counts.get(value) ?? 0) + 1);
}
console.log([...counts.entries()].map(([value, count]) => \`\${value}:\${count}\`).join(' '));`,
      },
      {
        file: '04-high-low-frequency',
        task: 'Print `highest: 10` then `lowest: 15`.',
        given: `const arr = [10, 5, 10, 15, 10, 5];`,
        expectedComment: 'highest: 10\nlowest: 15',
        solution: `const counts = new Map();
for (const value of arr) {
  counts.set(value, (counts.get(value) ?? 0) + 1);
}
let highest = null;
let lowest = null;
let maxCount = -1;
let minCount = Infinity;
for (const [value, count] of counts) {
  if (count > maxCount) {
    maxCount = count;
    highest = value;
  }
  if (count < minCount) {
    minCount = count;
    lowest = value;
  }
}
console.log(\`highest: \${highest}\`);
console.log(\`lowest: \${lowest}\`);`,
      },
      {
        file: '05-set-unique',
        task: 'Print the unique values joined, and the count.',
        given: `const arr = [1, 2, 2, 3, 3, 3];`,
        expectedComment: '1 2 3\n3',
        solution: `const unique = [...new Set(arr)];
console.log(unique.join(' '));
console.log(unique.length);`,
      },
      {
        file: '06-set-operations',
        task: 'Print the union joined, then the intersection joined.',
        given: `const a = [1, 2, 3, 4];\nconst b = [3, 4, 5];`,
        expectedComment: '1 2 3 4 5\n3 4',
        solution: `const union = [...new Set([...a, ...b])];
const setB = new Set(b);
const intersection = a.filter((value) => setB.has(value));
console.log(union.join(' '));
console.log([...new Set(intersection)].join(' '));`,
      },
      {
        file: '07-first-non-repeating',
        task: 'Print the first character that appears once, or `none`.',
        given: `const s = "swiss";`,
        expectedComment: 'w',
        solution: `const counts = new Map();
for (const ch of s) {
  counts.set(ch, (counts.get(ch) ?? 0) + 1);
}
let result = 'none';
for (const ch of s) {
  if (counts.get(ch) === 1) {
    result = ch;
    break;
  }
}
console.log(result);`,
      },
      {
        file: '08-two-sum',
        task: 'Print the two indices, space-separated, using a `Map` in one pass.',
        given: `const arr = [2, 7, 11, 15];\nconst target = 9;`,
        expectedComment: '0 1',
        solution: `const seen = new Map();
let result = null;
for (let i = 0; i < arr.length; i++) {
  const need = target - arr[i];
  if (seen.has(need)) {
    result = [seen.get(need), i];
    break;
  }
  seen.set(arr[i], i);
}
console.log(result.join(' '));`,
      },
      {
        file: '09-group-by-letter',
        task: 'Group by first letter and print `a: apple, avocado` style, one line per letter.',
        given: `const words = ["apple", "avocado", "banana", "blueberry", "cherry"];`,
        expectedComment: null,
        solution: `const groups = new Map();
for (const word of words) {
  const letter = word[0];
  if (!groups.has(letter)) groups.set(letter, []);
  groups.get(letter).push(word);
}
for (const [letter, list] of groups) {
  console.log(\`\${letter}: \${list.join(', ')}\`);
}`,
      },
      {
        file: '10-anagram-map',
        task: 'Print `true` using a frequency map (not sorting).',
        given: `const a = "anagram";\nconst b = "nagaram";`,
        expectedComment: 'true',
        solution: `function countChars(s) {
  const counts = new Map();
  for (const ch of s) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  return counts;
}

function mapsEqual(mapA, mapB) {
  if (mapA.size !== mapB.size) return false;
  for (const [key, value] of mapA) {
    if (mapB.get(key) !== value) return false;
  }
  return true;
}

console.log(mapsEqual(countChars(a), countChars(b)));`,
      },
    ],
  },
  {
    dir: '15-modules-errors-async',
    exercises: [
      {
        file: '01-default-export',
        task: 'Create `helpers/greet.js` with a default export that returns a greeting string. Import it here and print `Hello, Ada!`.',
        expectedComment: 'Hello, Ada!',
        solution: `import greet from './helpers/greet.js';

console.log(greet('Ada'));`,
      },
      {
        file: '02-named-exports',
        task: 'Create `helpers/math.js` exporting `add` and `subtract`. Import both and print `add(5,3)` then `subtract(5,3)`.',
        expectedComment: '8\n2',
        solution: `import { add, subtract } from './helpers/math.js';

console.log(add(5, 3));
console.log(subtract(5, 3));`,
      },
      {
        file: '03-try-catch',
        task: 'Call `JSON.parse("not json")` inside `try`. In `catch`, print `caught an error`. Then print `still running`.',
        expectedComment: 'caught an error\nstill running',
        solution: `try {
  JSON.parse('not json');
} catch {
  console.log('caught an error');
}
console.log('still running');`,
      },
      {
        file: '04-throw',
        task: 'Write `divide(a, b)` that throws if `b === 0`. Call it with `(10, 0)` in a try/catch and print the error\'s message: `Cannot divide by zero`.',
        expectedComment: 'Cannot divide by zero',
        solution: `function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (err) {
  console.log(err.message);
}`,
      },
      {
        file: '05-finally',
        task: 'Show `finally` runs on both success and failure. Print `try ok`, `finally`, `caught`, `finally`.',
        expectedComment: 'try ok\nfinally\ncaught\nfinally',
        solution: `try {
  console.log('try ok');
} catch {
  console.log('caught');
} finally {
  console.log('finally');
}

try {
  throw new Error('fail');
} catch {
  console.log('caught');
} finally {
  console.log('finally');
}`,
      },
      {
        file: '06-settimeout-order',
        task: 'Print `first`, schedule a `setTimeout` of 0ms printing `third`, then print `second`.',
        expectedComment: 'first\nsecond\nthird',
        solution: `console.log('first');
setTimeout(() => console.log('third'), 0);
console.log('second');`,
      },
      {
        file: '07-callback-style',
        task: 'Write `getUser(id, callback)` that uses `setTimeout` to call back with `{ id, name: "Ada" }` after 10ms. Print the name in the callback.',
        expectedComment: 'Ada',
        solution: `function getUser(id, callback) {
  setTimeout(() => callback({ id, name: 'Ada' }), 10);
}

getUser(1, (user) => console.log(user.name));`,
      },
      {
        file: '08-promise',
        task: 'Write a Promise that resolves with `done` after 10ms. Print the resolved value with `.then`.',
        expectedComment: 'done',
        solution: `const promise = new Promise((resolve) => {
  setTimeout(() => resolve('done'), 10);
});

promise.then((value) => console.log(value));`,
      },
      {
        file: '09-promise-reject',
        task: 'Write a Promise that rejects with `failed`. Handle it with `.catch` and print the reason.',
        expectedComment: 'failed',
        solution: `const promise = new Promise((_, reject) => {
  setTimeout(() => reject('failed'), 10);
});

promise.catch((reason) => console.log(reason));`,
      },
      {
        file: '10-async-await',
        task: 'Rewrite exercise 08 using `async`/`await` inside an async function.',
        expectedComment: 'done',
        solution: `async function run() {
  const value = await new Promise((resolve) => {
    setTimeout(() => resolve('done'), 10);
  });
  console.log(value);
}

run();`,
      },
      {
        file: '11-promise-all',
        task: 'Create three promises resolving to 1, 2, 3 after different delays. Use `Promise.all` and print the results joined.',
        expectedComment: '1 2 3',
        solution: `const p1 = new Promise((resolve) => setTimeout(() => resolve(1), 10));
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 20));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 30));

Promise.all([p1, p2, p3]).then((results) => console.log(results.join(' ')));`,
      },
      {
        file: '12-read-file',
        task: 'Read `data/sample.txt` using `fs/promises` and `await`. Print its trimmed contents.',
        expectedComment: 'hello from a file',
        solution: `import fs from 'node:fs/promises';

const content = await fs.readFile(new URL('./data/sample.txt', import.meta.url), 'utf8');
console.log(content.trim());`,
      },
    ],
  },
];

function formatExpectedComment(exercise) {
  if (exercise.test) {
    return 'All tests pass';
  }
  if (exercise.expectedComment === null) {
    return `See ${exercise.file}.expected.txt`;
  }
  if (exercise.expectedComment === undefined) {
    return `See ${exercise.file}.expected.txt`;
  }
  const lines = exercise.expectedComment.split('\n');
  if (lines.length > 6) {
    return `See ${exercise.file}.expected.txt`;
  }
  return exercise.expectedComment;
}

function buildStub(levelDir, exercise) {
  const id = `${levelDir} / ${exercise.file}`;
  const expectedBlock = formatExpectedComment(exercise);
  const exportBlock = exercise.test
    ? `\n * EXPORT\n * ${exercise.test.exportLine}\n`
    : '';

  let body = '';
  if (exercise.given) {
    body += `// ---- GIVEN ----
${exercise.given}
// ---------------

`;
  }

  if (exercise.test?.stubExport) {
    body += `${exercise.test.stubExport}

`;
  }

  body += '// Your code below 👇';

  return `/**
 * ${id}
 *
 * TASK
 * ${exercise.task}
 *
 * DO NOT CHANGE the GIVEN values.
 *${exportBlock}
 * EXPECTED OUTPUT
 * ${expectedBlock.split('\n').join('\n * ')}
 */

${body}
`;
}

function buildSolution(exercise) {
  let body = '';
  if (exercise.given) {
    body += `// ---- GIVEN ----
${exercise.given}
// ---------------

`;
  }
  body += exercise.solution;
  if (!exercise.solution.endsWith('\n')) {
    body += '\n';
  }
  return body;
}

function buildTestFile(exercise) {
  if (!exercise.test) return null;
  return exercise.test.tests;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeFile(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf8');
}

async function generateLevel15Support() {
  const level15 = '15-modules-errors-async';
  const helpersDir = path.join(levelsDir, level15, 'helpers');
  const dataDir = path.join(levelsDir, level15, 'data');
  const solHelpersDir = path.join(solutionsDir, level15, 'helpers');
  const solDataDir = path.join(solutionsDir, level15, 'data');

  await ensureDir(helpersDir);
  await ensureDir(dataDir);
  await writeFile(path.join(helpersDir, '.gitkeep'), '');
  await writeFile(path.join(dataDir, 'sample.txt'), 'hello from a file');

  await ensureDir(solHelpersDir);
  await ensureDir(solDataDir);
  await writeFile(
    path.join(solHelpersDir, 'greet.js'),
    `export default function greet(name) {
  return \`Hello, \${name}!\`;
}
`,
  );
  await writeFile(
    path.join(solHelpersDir, 'math.js'),
    `export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
`,
  );
  await writeFile(path.join(solDataDir, 'sample.txt'), 'hello from a file');
}

async function generateExercise(levelDir, exercise) {
  const stub = buildStub(levelDir, exercise);
  const solution = buildSolution(exercise);
  const testContent = buildTestFile(exercise);

  const levelPath = path.join(levelsDir, levelDir);
  const solPath = path.join(solutionsDir, levelDir);
  const stubPath = path.join(stubsDir, levelDir);

  const exerciseFile = `${exercise.file}.js`;

  await writeFile(path.join(levelPath, exerciseFile), stub);
  await writeFile(path.join(solPath, exerciseFile), solution);
  await writeFile(path.join(stubPath, exerciseFile), stub);

  if (testContent) {
    await writeFile(path.join(levelPath, `${exercise.file}.test.js`), testContent);
    await writeFile(path.join(solPath, `${exercise.file}.test.js`), testContent);
  }
}

async function main() {
  let total = 0;

  for (const level of LEVELS) {
    await ensureDir(path.join(levelsDir, level.dir));
    await ensureDir(path.join(solutionsDir, level.dir));
    await ensureDir(path.join(stubsDir, level.dir));

    for (const exercise of level.exercises) {
      await generateExercise(level.dir, exercise);
      total++;
    }

    console.log(`  Generated ${level.exercises.length} exercises in ${level.dir}`);
  }

  await generateLevel15Support();
  console.log('  Created level 15 supporting files');

  console.log(`\n  Done — ${total} exercises generated.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
