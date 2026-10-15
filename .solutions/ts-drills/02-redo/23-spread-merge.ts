const base: { name: string; role: string } = { name: 'Riya', role: 'dev' };
const extra: { city: string } = { city: 'Bareilly' };
const merged = { ...base, ...extra };
console.log(merged.city);