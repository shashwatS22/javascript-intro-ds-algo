// ---- GIVEN ----
const a = 12;
const b = 4;
const op = "/";
// ---------------

switch (op) {
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
}
