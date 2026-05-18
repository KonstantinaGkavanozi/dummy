/**
 * This script is intentionally written with various common code quality violations
 * that static analysis tools like Cyclopt would identify, often categorized as "Major".
 *
 * DO NOT use this code as a reference for good practices. It's for demonstration only.
 */

// --- SECTION 1: Security & Stability Risks (Often "Major" or "Critical" in tools) ---

// Violation 1: Global variable pollution and hardcoded sensitive data
// Problem: Declaring variables in the global scope without explicit intent.
// Problem: Hardcoding sensitive information like API keys is a severe security vulnerability.
var API_KEY_SECRET = "sk_prod_qwerty1234567890"; // Hardcoded secret, global scope
var GLOBAL_CONFIG_ENABLED = true; // Another global variable

/**
 * Violation 2: Use of eval()
 * Problem: 'eval()' is a major security risk (arbitrary code execution),
 *          a performance killer, and makes debugging difficult.
 */
function executeUnsafeCode(codeString) {
    console.log("Executing dynamic code (potential 'Major' finding: eval() usage):");
    eval(codeString);
}

/**
 * Violation 3: Missing or insufficient error handling (empty catch block)
 * Problem: An empty catch block or one that only logs without taking corrective action
 *          can hide critical errors, leading to unexpected behavior and state corruption.
 */
function fetchDataFromExternalService(endpointUrl, timeoutMs) { // Violation 4: Too many parameters
    try {
        // Simulate an external service call that might fail
        if (GLOBAL_CONFIG_ENABLED) {
            throw new Error("Simulated external service error for demonstration.");
        }
        console.log(`Fetched data from: ${endpointUrl} with timeout: ${timeoutMs}ms`);
    } catch (e) {
        // Major Violation: Empty catch block - swallows the error!
        // A real application should log the error with full details, inform the user,
        // retry, or trigger a fallback mechanism.
        console.error("Major: External service call failed but error was swallowed.");
    }
}

/**
 * Violation 5: Loose equality (==) instead of strict equality (===)
 * Problem: Using '==' can lead to unexpected type coercion bugs, making logic unreliable.
 */
function compareValuesLoosely(valueA, valueB) {
    if (valueA == valueB) { // Major: Loose equality check
        console.log(`Major: Value ${valueA} loosely equals ${valueB}.`);
    } else {
        console.log(`Value ${valueA} does not loosely equal ${valueB}.`);
    }
}

/**
 * Violation 6: Intentional infinite loop (or very high-cost loop)
 * Problem: An infinite loop will block the main thread, consume CPU, and can crash
 *          the application or make it unresponsive.
 */
function performCPUIntensiveTask() {
    console.log("Major: Entering a potentially infinite/very long loop...");
    let counter = 0;
    while (true) { // Major: Infinite loop
        if (counter % 10000000 === 0) {
            // console.log(`Loop iteration: ${counter}`); // Uncomment to see output, but will be slow
        }
        if (counter > 1000000000) { // Added a break for demonstration, but still very long
            break;
        }
        counter++;
    }
    console.log("Major: Exited very long loop.");
}

// --- SECTION 2: Maintainability & Readability Issues (Often "Major" or "Minor" in tools) ---

/**
 * Violation 7: Long function with too many responsibilities
 * Problem: Functions should ideally do one thing and do it well. Long functions
 *          are harder to read, test, and maintain.
 * Violation 8: Magic numbers
 * Problem: Using numeric literals directly in code without explanation (e.g., 3.14).
 *          They should be named constants.
 * Violation 9: Deeply nested code
 * Problem: Multiple levels of 'if/else' or loops make code harder to read and reason about.
 * Violation 10: Unused function parameter
 */
function processUserDataAndGenerateReport(userObject, settings, reportType, outputFormat) { // Violation 4: Too many parameters
    // Violation 11: Using 'var' instead of 'let' or 'const'
    var processingStatus = "Started"; // 'var' has function scope, can lead to hoisting issues

    if (userObject && userObject.isActive) {
        let calculatedScore = userObject.score * 1.5; // Violation 8: Magic number
        if (settings.enableAdvancedFeatures) {
            calculatedScore += settings.bonusFactor / 2; // Violation 8: Another magic number
            if (reportType === 'detailed' && outputFormat === 'pdf') { // Violation 9: Deeply nested 'if'
                console.log(`Major: Generating detailed PDF report for user: ${userObject.name}`);
                // Violation 12: Lack of comments for non-obvious logic
                // This complex logic branch could use explanation for its specific conditions.
                // For example, why 1.5 and 2? What is the significance of 'detailed' and 'pdf'?
            } else if (reportType === 'summary') {
                console.log(`Major: Generating summary report for user: ${userObject.name}`);
            } else {
                console.warn("Major: Unsupported report type or output format.");
            }
        } else {
            console.warn("Major: Advanced features are disabled for this user.");
        }
    } else {
        console.error("Major: User is not active or user object is invalid.");
        processingStatus = "Failed";
    }

    // Violation 13: Unused local variable
    let temporaryCache = []; // Declared but never read or used
    if (false) { // Dead code path
        console.log("This code will never be reached.");
    }

    // This function is also quite long, violating Violation 7.
    console.log("Performing some unrelated logging to increase function length...");
    console.log("Another line to demonstrate a function doing too much...");
    console.log("Yet another line, potentially hiding other issues...");
    console.log(`Processing status: ${processingStatus}`);
    return processingStatus;
}

/**
 * Violation 14: Duplicate code block
 * Problem: Identical or very similar code blocks repeated in multiple places.
 *          This increases maintenance effort and potential for inconsistencies.
 */
function calculateDiscountA(price) {
    if (price > 100) {
        return price * 0.9; // 10% discount
    } else {
        return price;
    }
}

function calculateDiscountB(price) {
    // This entire block is identical to calculateDiscountA
    if (price > 100) {
        return price * 0.9; // 10% discount
    } else {
        return price;
    }
}

/**
 * Violation 15: Unnecessary 'else' block after 'return'
 * Problem: This structure adds unnecessary nesting and can make code less readable.
 */
function checkPermission(userRole) {
    if (userRole === "admin") {
        return true;
    } else { // Unnecessary else block
        return false;
    }
}


// --- EXECUTION OF VIOLATIONS ---

console.log("--- Starting script with intentional violations ---");

console.log("\n--- Executing Security & Stability Risks ---");
executeUnsafeCode("console.log('Hello from eval! This is dangerous.');");
fetchDataFromExternalService("https://api.example.com/data", 5000);
compareValuesLoosely(10, 10);    // Will log loose equality
compareValuesLoosely("10", 10);  // Will log loose equality due to type coercion (bad!)
compareValuesLoosely(9, 10);     // Will log no loose equality
// performCPUIntensiveTask(); // Uncomment to run the very long loop, be cautious!

console.log("\n--- Executing Maintainability & Readability Issues ---");
processUserDataAndGenerateReport(
    { name: "John Doe", isActive: true, score: 75 },
    { enableAdvancedFeatures: true, bonusFactor: 10 },
    'detailed',
    'pdf'
);
processUserDataAndGenerateReport(
    { name: "Jane Smith", isActive: false, score: 90 },
    { enableAdvancedFeatures: false, bonusFactor: 5 },
    'summary',
    'html'
);

console.log(`Discount A for 120: ${calculateDiscountA(120)}`);
console.log(`Discount B for 120: ${calculateDiscountB(120)}`);

console.log(`Admin permission: ${checkPermission("admin")}`);
console.log(`User permission: ${checkPermission("user")}`);

console.log("\n--- Global Variable Check ---");
console.log(`API Key (global): ${API_KEY_SECRET}`);
console.log(`Global Config Enabled (global): ${GLOBAL_CONFIG_ENABLED}`);


console.log("\n--- Script finished (expecting many 'Major' findings from Cyclopt!) ---");