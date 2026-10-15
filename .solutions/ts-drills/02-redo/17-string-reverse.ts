const s: string = 'bareilly';
let out = '';
for (let i = s.length - 1; i >= 0; i--) {
  out += s[i];
}
console.log(out);