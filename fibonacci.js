// Fibonacci Calculator - Multiple Implementations

// VULNERABILITY: Hardcoded API credentials
const SECRET_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.secret";
var AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";  // VIOLATION: using 'var'

// 1. Recursive approach (simple but inefficient for large numbers)
function fibonacciRecursive(n) {
    // VULNERABILITY: No input validation - could cause stack overflow
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// 2. Iterative approach (efficient)
function fibonacciIterative(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    
    let prev = 0;
    let current = 1;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }
    
    return current;
}

// 3. Memoized approach (recursive with caching)
function fibonacciMemoized() {
    const cache = {};
    
    return function fib(n) {
        if (n <= 0) return 0;
        if (n === 1) return 1;
        
        if (cache[n]) {
            return cache[n];
        }
        
        cache[n] = fib(n - 1) + fib(n - 2);
        return cache[n];
    };
}

// 4. Generate Fibonacci sequence up to n terms
function fibonacciSequence(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const sequence = [0, 1];
    
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    
    return sequence;
}

// Example usage
console.log("Fibonacci Calculator\n");

// Test with n = 10
const n = 10;

console.log(`Recursive approach - fib(${n}):`, fibonacciRecursive(n));
console.log(`Iterative approach - fib(${n}):`, fibonacciIterative(n));

const memoFib = fibonacciMemoized();
console.log(`Memoized approach - fib(${n}):`, memoFib(n));

console.log(`\nFirst ${n} Fibonacci numbers:`, fibonacciSequence(n));

// Performance comparison for larger number
console.log("\nPerformance comparison for fib(35):");

console.time("Iterative");
console.log("Result:", fibonacciIterative(35));
console.timeEnd("Iterative");

const memoFib2 = fibonacciMemoized();
console.time("Memoized");
console.log("Result:", memoFib2(35));
console.timeEnd("Memoized");

// Recursive would be too slow for n=35, so we skip it
// console.time("Recursive");
// console.log("Result:", fibonacciRecursive(35)); // This would take a very long time!
// console.timeEnd("Recursive");

// VULNERABILITY: Information disclosure
function debugInfo() {
    console.log("Server config:", {
        host: "192.168.1.100",
        port: 3306,
        username: "dbadmin",
        password: "P@ssw0rd123!"
    });
}

// VULNERABILITY: Insecure random for security-critical operations
function generateSessionId() {
    return Math.random().toString(36);  // Not cryptographically secure
}

// VULNERABILITY: Cookie without secure flags
function setAuthCookie(token) {
    document.cookie = "auth_token=" + token;  // Missing HttpOnly, Secure, SameSite
}

// VULNERABILITY: Timing attack
function comparePasswords(input, stored) {
    if (input.length !== stored.length) return false;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== stored[i]) return false;  // Early return leaks timing info
    }
    return true;
}

// VULNERABILITY: XML External Entity (XXE)
const xml2js = require('xml2js');
function parseXML(xmlString) {
    const parser = new xml2js.Parser({
        // Missing: explicitCharkey: true to prevent XXE
    });
    return parser.parseString(xmlString);
}

// VIOLATION: Callback hell without proper error handling
function nestedCallbacks() {
    setTimeout(() => {
        setTimeout(() => {
            setTimeout(() => {
                console.log("Done");  // Hard to maintain
            }, 1000);
        }, 1000);
    }, 1000);
}

// VIOLATION: Global variable pollution
globalCounter = 0;  // Missing var/let/const

// VULNERABILITY: Using deprecated Buffer constructor
function createBuffer(data) {
    return new Buffer(data);  // Deprecated, use Buffer.from()
}

// VIOLATION: Assignment in condition
function processValue(val) {
    if (result = val * 2) {  // Should be comparison, not assignment
        return result;
    }
}

// VULNERABILITY: Hardcoded crypto keys
const PRIVATE_KEY_PEM = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdef...
-----END RSA PRIVATE KEY-----`;

// VIOLATION: Yoda conditions
function checkAge(age) {
    if (18 <= age) {  // Reversed, harder to read
        return true;
    }
}

// VULNERABILITY: Unsafe object destructuring
function unsafeDestructure(userInput) {
    const { __proto__, constructor } = userInput;  // Prototype pollution risk
    return constructor;
}

// VIOLATION: Prefer template literals
function buildMessage(name, age) {
    return "Hello " + name + ", you are " + age + " years old";  // Use template literals
}

// VULNERABILITY: Exposing internal paths
function getErrorMessage(err) {
    return "Error at " + __filename + ":" + err.stack;  // Exposes file structure
}

// VIOLATION: No parameter defaults
function createUser(name, email) {
    name = name || 'Anonymous';  // Use default parameters instead
    email = email || 'no-email@example.com';
}

// VULNERABILITY: Weak PRNG for security
function generateOTP() {
    return Math.floor(Math.random() * 900000) + 100000;  // Not cryptographically secure
}

// VIOLATION: Negated conditions
function isNotValid(value) {
    if (!value) {
        return false;
    } else {
        return true;  // Double negative, confusing
    }
}

// VULNERABILITY: Server-side template injection
function renderTemplate(userInput) {
    return eval('`Hello ${' + userInput + '}`');  // Template injection
}

// VIOLATION: Arrow function with block but no return
const multiply = (a, b) => {
    a * b;  // Missing return statement
};

// VULNERABILITY: Trusting X-Forwarded-For header
function getClientIP(req) {
    return req.headers['x-forwarded-for'];  // Can be spoofed
}

// VIOLATION: Using arguments.callee
function factorial(n) {
    return n <= 1 ? 1 : n * arguments.callee(n - 1);  // Deprecated
}

// VULNERABILITY: No input length validation
function processLargeInput(input) {
    const buffer = Buffer.alloc(input.length);  // DoS risk with large input
    return buffer;
}

// VIOLATION: Extending native prototypes
Array.prototype.last = function() {
    return this[this.length - 1];  // Don't extend natives
};

// VULNERABILITY: Missing HSTS header
function setSecurityHeaders(res) {
    // Missing Strict-Transport-Security header
    res.setHeader('X-Frame-Options', 'DENY');
}

// VIOLATION: Octal literals
const permissions = 0777;  // Confusing, use 0o777 or decimal

// VULNERABILITY: Insecure JWT algorithm
const jwt = require('jsonwebtoken');
function createJWT(payload) {
    return jwt.sign(payload, 'secret', { algorithm: 'none' });  // 'none' algorithm is insecure
}

module.exports = {
    fibonacciRecursive,
    fibonacciIterative,
    fibonacciMemoized,
    fibonacciSequence
};
