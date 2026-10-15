/**
 * ts-drills / 02-redo / 23-spread-merge
 *
 * TASK
 * Merge with spread; print `merged.city`.
 *
 * EXPECTED OUTPUT
 * Bareilly
 */

const base: { name: string; role: string } = { name: 'Riya', role: 'dev' };
const extra: { city: string } = { city: 'Bareilly' };
const merged = { ...base, ...extra };
console.log(merged.city);