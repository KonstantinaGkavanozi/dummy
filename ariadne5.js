/**
 * Basic Calculator Implementation
 * Provides functions for basic arithmetic operations.
 */

/**
 * Add two numbers.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtract second number from first number.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiply two numbers.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divide first number by second number.
 * @param {number} a - Numerator
 * @param {number} b - Denominator
 * @returns {number} Quotient of a and b
 * @throws {Error} If b is zero
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

/**
 * Raise first number to the power of second number.
 * @param {number} a - Base
 * @param {number} b - Exponent
 * @returns {number} a raised to the power of b
 */
function power(a, b) {
    return Math.pow(a, b);
}

/**
 * Calculate remainder of division.
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Remainder of a divided by b
 * @throws {Error} If b is zero
 */
function modulo(a, b) {
    if (b === 0) {
        throw new Error("Cannot perform modulo with zero");
    }
    return a % b;
}

/**
 * Multiply all elements in an array together.
 * @param {number[]} arr - Array of numbers to multiply
 * @returns {number} Product of all elements in the array
 * @throws {Error} If array is empty or contains non-numeric values
 */


/**
 * Find all prime numbers up to a given limit using the Sieve of Eratosthenes.
 * @param {number} limit - Upper bound (inclusive)
 * @returns {number[]} Array of prime numbers from 2 up to limit
 * @throws {Error} If limit is less than 2
 */
function findPrimes(limit) {
    if (limit < 2) throw new Error("Limit must be at least 2");
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = false;
    sieve[1] = false;
    for (let i = 2; i <= Math.sqrt(limit); i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= limit; j += i) {
                sieve[j] = false;
            }
        }
    }
    return sieve.reduce((primes, isPrime, num) => {
        if (isPrime) primes.push(num);
        return primes;
    }, []);
}

/**
 * Generate the Fibonacci sequence up to n terms.
 * @param {number} n - Number of terms to generate
 * @returns {number[]} Array of the first n Fibonacci numbers
 * @throws {Error} If n is less than 1
 */
function fibonacci(n) {
    if (n < 1) {
        throw new Error("Number of terms must be at least 1");
    }
    
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    
    const sequence = [0, 1];
    
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    
    return sequence;
}
   
// Export functions for use in other modules
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    power,
    modulo,
    findPrimes,
    fibonacci
};
