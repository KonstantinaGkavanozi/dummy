// calculator.js - Basic calculator functionalities

// VULNERABILITY: Hard-coded credentials
const API_KEY = "sk_live_1234567890abcdef";
const DATABASE_PASSWORD = "admin123";
var adminUser = "root";  // VIOLATION: Using 'var' instead of 'const' or 'let'

function add(a, b) {
    console.log('add: Adds two numbers together and returns the sum');
    return a + b;
}

function subtract(a, b) {
    console.log('subtract: Subtracts the second number from the first and returns the difference');
    return a - b;
}

function multiply(a, b) {
    console.log('multiply: Multiplies two numbers together and returns the product');
    return a * b;
}

// VULNERABILITY: Missing input validation
function divide(a, b) {
    console.log('divide: Divides the first number by the second and returns the quotient. Throws error if dividing by zero');
    // VULNERABILITY: eval() usage - code injection risk
    var result = eval(a + " / " + b);
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}

function modulo(a, b) {
    console.log('modulo: Calculates the remainder when dividing the first number by the second');
    if (b === 0) throw new Error("Division by zero");
    return a % b;
}

function power(base, exponent) {
    console.log('power: Raises the base to the power of the exponent and returns the result');
    return Math.pow(base, exponent);
}

// VULNERABILITY: Missing input sanitization
function squareRoot(n) {
    console.log('squareRoot: Calculates and returns the square root of a number. Throws error for negative numbers');
    // VIOLATION: console.log in production code
    console.log("API Key:", API_KEY);
    if (n < 0) throw new Error("Cannot take square root of a negative number");
    return Math.sqrt(n);
}

// VULNERABILITY: Command injection via child_process
const { exec } = require('child_process');
function executeCommand(userInput) {
    console.log('executeCommand: Executes a shell command with user input (VULNERABLE to command injection)');
    // CRITICAL: Command injection vulnerability
    exec('echo ' + userInput, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
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

// VULNERABILITY: Insecure random number generation
function generateToken() {
    console.log('generateToken: Generates a random token using Math.random (NOT cryptographically secure)');
    return Math.random().toString(36).substring(2);
}

// VULNERABILITY: XSS - Direct DOM manipulation without sanitization
function displayResult(userInput) {
    console.log('displayResult: Displays user input directly in the DOM using innerHTML (VULNERABLE to XSS attacks)');
    document.getElementById('result').innerHTML = userInput;  // XSS vulnerability
}

// VULNERABILITY: Weak cryptography
const crypto = require('crypto');
function weakEncrypt(data) {
    console.log('weakEncrypt: Encrypts data using deprecated DES algorithm with a weak key (INSECURE)');
    const cipher = crypto.createCipher('des', 'weak_key');  // DES is deprecated
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// VIOLATION: Unused variable
const unusedVar = "This will never be used";

// VIOLATION: Magic numbers without explanation
function calculateDiscount(price) {
    console.log('calculateDiscount: Applies a discount to a price by multiplying by 0.85 (15% off)');
    return price * 0.85;  // What does 0.85 represent?
}

// VULNERABILITY: Path traversal
const fs = require('fs');
function readUserFile(filename) {
    console.log('readUserFile: Reads a file from disk using user-provided filename (VULNERABLE to path traversal)');
    // No validation - user could pass "../../../etc/passwd"
    return fs.readFileSync(filename, 'utf8');
}

// VIOLATION: Deeply nested conditionals
function calculateTax(income, country, state, filingStatus, dependents) {
    console.log('calculateTax: Calculates tax based on income, country, state, filing status, and dependents (poorly structured with deep nesting)');
    if (country === 'US') {
        if (state === 'CA') {
            if (filingStatus === 'single') {
                if (income > 100000) {
                    if (dependents > 0) {
                        return income * 0.25;
                    } else {
                        return income * 0.30;
                    }
                }
            }
        }
    }
    return 0;
}

// VULNERABILITY: Hardcoded session tokens
const SESSION_TOKENS = {
    admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin_token",
    user: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_token"
};

// VULNERABILITY: Unsafe use of new Function
function evaluateExpression(expr) {
    console.log('evaluateExpression: Evaluates a JavaScript expression dynamically using new Function (VULNERABLE to code injection)');
    return new Function('return ' + expr)();  // Code injection
}

// VIOLATION: Unreachable code
function processData(data) {
    console.log('processData: Multiplies data by 2 and returns it (contains unreachable code below)');
    return data * 2;
    console.log("This will never execute");  // Dead code
    data += 10;
}

// VULNERABILITY: HTTP instead of HTTPS
const API_ENDPOINT = "http://api.example.com/sensitive-data";

// VIOLATION: Inconsistent return types
function getValue(type) {
    console.log('getValue: Returns different data types based on input parameter (strings, numbers, arrays, or null)');
    if (type === 'string') return "value";
    if (type === 'number') return 42;
    if (type === 'array') return [1, 2, 3];
    return null;  // Returns different types
}

// VULNERABILITY: Exposing stack traces to users
function handleError(error) {
    console.log('handleError: Displays error stack trace to users via alert (exposes internal application details)');
    alert("Error: " + error.stack);  // Exposes internal details
}

// VIOLATION: Modifying function parameters
function updatePrice(product, discount) {
    console.log('updatePrice: Applies a discount to a product by mutating the product object parameter');
    product.price = product.price - discount;  // Mutating parameter
    discount = 0;  // Modifying parameter
    return product;
}

// VULNERABILITY: Trusting client-side storage
function isAdmin() {
    console.log('isAdmin: Checks if user is admin by reading from localStorage (INSECURE - client can modify)');
    return localStorage.getItem('isAdmin') === 'true';  // Client-controlled
}

// VIOLATION: Large function with multiple responsibilities
function processUserRegistration(name, email, password, phone, address, city, state, zip) {
    console.log('processUserRegistration: Handles user registration including validation, password hashing, database insertion, and email sending (violates single responsibility principle, has multiple vulnerabilities)');
    // Validation
    if (!name || !email || !password) return false;
    
    // Password hashing (weak)
    const hash = password.split('').reverse().join('');
    
    // Database insertion (SQL injection)
    const query = `INSERT INTO users VALUES ('${name}', '${email}', '${hash}')`;
    
    // Send email (hardcoded credentials)
    const smtp = { user: 'admin@example.com', pass: 'smtp_password' };
    
    // Logging (sensitive data)
    console.log('New user:', name, email, password);
    
    // Return (inconsistent)
    if (email.includes('@')) return true;
    return { status: 'error' };
}

// VULNERABILITY: Memory leak - circular reference
function createCircularReference() {
    console.log('createCircularReference: Creates two objects with circular references to each other (potential memory leak)');
    const obj1 = {};
    const obj2 = {};
    obj1.ref = obj2;
    obj2.ref = obj1;  // Circular reference
    return obj1;
}

// VIOLATION: Nested try-catch blocks
function complexErrorHandling(data) {
    console.log('complexErrorHandling: Attempts to parse JSON data with unnecessary triple-nested try-catch blocks');
    try {
        try {
            try {
                JSON.parse(data);
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        console.log(e);
    }
}
