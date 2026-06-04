let number = 532;
let number1 = 252151;
let number2 = 2132412;
let digits = Math.max(6, number.toString().length);

console.log(`CS${number.toString().padStart(digits, "0")}`);
console.log(`CS${number1.toString().padStart(digits, "0")}`);
console.log(`CS${number2.toString().padStart(digits, "0")}`);
