/**
 * ts-drills / 01-concepts / 14-strict-flags
 *
 * TASK
 * Print `config.strict` from the typed object.
 *
 * EXPECTED OUTPUT
 * true
 */

const config: { strict: boolean; target: string } = {
  strict: true,
  target: 'ES2022',
};

console.log(config.strict);