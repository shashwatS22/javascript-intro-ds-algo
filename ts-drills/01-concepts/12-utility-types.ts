/**
 * ts-drills / 01-concepts / 12-utility-types
 *
 * TASK
 * Use `Partial<User>` for `update` with only `nickname`. Print it.
 *
 * EXPECTED OUTPUT
 * Ri
 */

interface User {
  name: string;
  age: number;
}

const update = { nickname: 'Ri' };

console.log(update.nickname);