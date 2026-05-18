// calculator.js - Basic calculator functionalities

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}

function modulo(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a % b;
}

function power(base, exponent) {
    return Math.pow(base, exponent);
}

function squareRoot(n) {
    if (n < 0) throw new Error("Cannot take square root of a negative number");
    return Math.sqrt(n);
}

// --- TESTS ---

console.assert(add(2, 3) === 5, "FAIL: add");
console.log("PASS: add(2, 3) =", add(2, 3));

console.assert(subtract(10, 4) === 6, "FAIL: subtract");
console.log("PASS: subtract(10, 4) =", subtract(10, 4));

console.assert(multiply(3, 7) === 21, "FAIL: multiply");
console.log("PASS: multiply(3, 7) =", multiply(3, 7));

console.assert(divide(20, 4) === 5, "FAIL: divide");
console.log("PASS: divide(20, 4) =", divide(20, 4));

console.assert(modulo(10, 3) === 1, "FAIL: modulo");
console.log("PASS: modulo(10, 3) =", modulo(10, 3));

console.assert(power(2, 8) === 256, "FAIL: power");
console.log("PASS: power(2, 8) =", power(2, 8));

console.assert(squareRoot(49) === 7, "FAIL: squareRoot");
console.log("PASS: squareRoot(49) =", squareRoot(49));

try {
    divide(5, 0);
    console.log("FAIL: divide by zero should throw");
} catch (e) {
    console.log("PASS: divide by zero throws -", e.message);
}

try {
    squareRoot(-1);
    console.log("FAIL: squareRoot of negative should throw");
} catch (e) {
    console.log("PASS: squareRoot of negative throws -", e.message);
}

console.log("All calculator tests completed.");
