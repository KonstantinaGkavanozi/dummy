/**
 * This file contains intentional code quality, security, and maintainability
 * violations designed to be flagged by static analysis tools like Cyclopt.
 *
 * Each section is commented to explain the specific violation.
 */

// --- GLOBAL SCOPE VIOLATIONS ---

// 1. Global Variable Declaration (using `var`) - Bad practice, pollutes global scope.
var GLOBAL_APP_STATE = {
    userCount: 0,
    lastActivity: null
};


// --- FUNCTION VIOLATIONS ---

/**
 * 4. Long Function / High Cyclomatic Complexity
 *    - Too many lines of code.
 *    - Deeply nested conditional logic.
 *    - Multiple responsibilities.
 */



/**
 * 17. Security Vulnerability: `eval()` usage.
 *     Allows arbitrary code execution if input is untrusted.
/**
 * 18. Security Vulnerability: `innerHTML` with untrusted input (XSS).
 *     Allows injecting malicious scripts into the DOM.
 */

/**
 * 19. Lack of Error Handling / Unchecked Exceptions
 *     Function throws an error without any `try...catch` or explicit checks in the caller.
 */
function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!"); // This should ideally be caught
    }
    return a / b;
}

/**
 * 20. Excessive Parameters / Large Signature — FIXED
 *     Replaced 11 positional parameters with a single structured options object.
 *     Callers now use named properties, making the code self-documenting and
 *     resilient to parameter order changes.
 */
function createUserProfile({ firstName, lastName, email, age, address, phoneNumber, preferredContactMethod, preferences }) {
    const { country, city, postalCode } = address;
    const { newsletterOptIn, termsAccepted } = preferences;
    // ... logic to create user profile ...
    console.log(`Created profile for ${firstName} ${lastName}`);
    return { firstName, lastName, email, age, country, city, postalCode, phoneNumber, preferredContactMethod, newsletterOptIn, termsAccepted };
}

// 21. Commented-out code - Should be removed or properly documented/deleted from version control.
// function oldFeatureThatIsNoLongerUsed() {
//     console.log("This function is deprecated and commented out.");
//     // Some old logic here
//     // var x = 10;
// }


// --- EXAMPLE USAGE (to make the code runnable) ---
console.log("--- Starting Cyclopt Violations Demo ---");



// Demonstrate eval() vulnerability
// executeUntrustedCode("console.log('Malicious code executed!'); alert('XSS via eval!');");

// Demonstrate innerHTML vulnerability (requires a DOM environment, e.g., browser)
// document.body.innerHTML += '<div id="user-comment-section"></div>';
// displayUserComment("<img src='x' onerror='alert(\"XSS via innerHTML!\")' />");


// Demonstrate lack of error handling
try {
    console.log("Division result:", divideNumbers(10, 2));
    console.log("Division by zero result:", divideNumbers(5, 0)); // This will throw!
} catch (e) {
    console.error("Caught an error during division:", e.message);
}

createUserProfile(
    "Jane", "Doe", "jane.doe@example.com", 25, "Canada", "Toronto", "M1A 1A1",
    "555-123-4567", "Email", true, true
);

console.log("Current Global State:", GLOBAL_APP_STATE);
console.log("--- Cyclopt Violations Demo End ---");