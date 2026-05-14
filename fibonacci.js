// Fibonacci Calculator - Multiple Implementations

// 1. Recursive approach (simple but inefficient for large numbers)
function fibonacciRecursive(n) {
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

module.exports = {
    fibonacciRecursive,
    fibonacciIterative,
    fibonacciMemoized,
    fibonacciSequence
};
