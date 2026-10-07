// ---- GIVEN ----
const defaults = { theme: "light", fontSize: 14 };
const custom = { fontSize: 18 };
// ---------------

const merged = { ...defaults, ...custom };
console.log(merged.theme);
console.log(merged.fontSize);
