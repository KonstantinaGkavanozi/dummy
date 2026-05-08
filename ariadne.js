// cyclopt_more_critical_issues.js

// --- CRITICAL ISSUE 1: Infinite Loop (Denial of Service / Browser Freeze) ---
// Problem: This function will block the main thread indefinitely, freezing the browser tab/Node.js process.
function createInfiniteLoop() {
    console.log("CRITICAL: Entering an infinite loop. This will freeze the application.");
    // This loop has no exit condition.
    while (true) {
        // Perform some trivial operation to ensure it's not optimized away
        console.count("Infinite Loop Iteration");
        // In a real scenario, this might be a poorly designed event listener or polling mechanism.
    }
}

// --- CRITICAL ISSUE 2: Infinite Recursion (Stack Overflow) ---
// Problem: Calling itself without a base case will quickly exhaust the call stack, leading to a crash.
function causeStackOverflow() {
    console.log("CRITICAL: Causing a stack overflow.");
    // No base case to stop the recursion.
    causeStackOverflow();
}

// --- CRITICAL ISSUE 3: Prototype Pollution (Severe Security Vulnerability) ---
// Problem: Modifying `Object.prototype` based on untrusted input can allow an attacker to inject
//          properties into all objects, potentially bypassing security checks, causing crashes,
//          or achieving remote code execution in certain contexts (e.g., template engines).
function dangerouslyPollutePrototype(key, value) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        // CRITICAL: Directly modifying Object.prototype via __proto__ or constructor.prototype
        // This is a known severe vulnerability.
        ({}).__proto__[key] = value; // Example for __proto__
        console.warn(`CRITICAL: Prototype pollution attempted for key: ${key}`);
    } else {
        console.log(`Attempted to set non-critical key: ${key}`);
    }
}

// --- CRITICAL ISSUE 4: Regex Denial of Service (ReDoS) ---
// Problem: Certain regular expressions can take an exponentially long time to process
//          for specific inputs, leading to a denial of service.
function checkDangerousRegex(input) {
    // CRITICAL: This regex is vulnerable to ReDoS. Example input: "aaaaaaaaaaaaaaaaaaaaaaaa!"
    const re = /^(a+)+$/; // The (a+)+ pattern is a classic ReDoS example
    console.log(`CRITICAL: Testing ReDoS regex with input length ${input.length}.`);
    const startTime = Date.now();
    try {
        const match = re.test(input);
        const endTime = Date.now();
        console.log(`Regex took ${endTime - startTime}ms. Match: ${match}`);
        if (endTime - startTime > 1000) {
             console.warn("CRITICAL: This regex took over 1 second, indicating ReDoS vulnerability!");
        }
    } catch (e) {
        console.error("Error during regex test:", e);
    }
}

// --- CRITICAL ISSUE 5: Unhandled Promise Rejection (Node.js Process Crash / Browser Error) ---
// Problem: A Promise that rejects and has no `.catch()` handler will lead to an unhandled
//          rejection. In Node.js, this typically crashes the process. In browsers, it logs
//          an error but can still indicate a serious unhandled fault in application logic.
function createUnhandledPromiseRejection() {
    console.log("CRITICAL: Creating an unhandled promise rejection.");
    new Promise((resolve, reject) => {
        // Simulating an asynchronous operation that fails
        setTimeout(() => {
            console.log("Promise rejected!");
            reject(new Error("CRITICAL: Something went terribly wrong asynchronously!"));
        }, 100);
    });
    // CRITICAL: No .catch() handler here!
}

// --- CRITICAL ISSUE 6: Direct Access to Process/Global Objects in Browser Context ---
// Problem: While not a direct "critical" issue in Node.js, attempting to access Node.js-specific
//          globals like `process` or `Buffer` in a browser environment can lead to runtime errors
//          or unexpected behavior if polyfills are not correctly in place, indicating poor cross-environment design.
//          For a SAST tool, this might be flagged if it detects browser-only context.
function accessNodejsGlobalsInBrowser() {
    console.log("CRITICAL: Attempting to access Node.js specific globals.");
    try {
        // 'process' is a global in Node.js, but not in browsers
        if (typeof process !== 'undefined' && process.env) {
            console.log("Node.js environment detected. Process env:", process.env.NODE_ENV);
        } else {
            // This will throw a ReferenceError if 'process' is truly undefined
            // or indicate an attempt to use Node.js features in a browser.
            console.warn("CRITICAL: 'process' global not found. This code might be intended for Node.js.");
            // Example of what would happen if you tried to use it without checking:
            // const someEnvVar = process.env.MY_VAR; // This line would crash in browser
        }
        // Similarly for Buffer
        if (typeof Buffer !== 'undefined') {
            const buf = Buffer.from('hello');
            console.log("Node.js Buffer used:", buf.toString());
        } else {
            console.warn("CRITICAL: 'Buffer' global not found. This code might be intended for Node.js.");
        }
    } catch (e) {
        console.error("CRITICAL: Error accessing Node.js globals in potentially wrong environment:", e.message);
    }
}

// --- CRITICAL ISSUE 7: Sensitive Data Exposure (Logging Credentials) ---
// Problem: Logging sensitive information like passwords or API keys directly to the console
//          or application logs can expose them to unauthorized users or systems.
function logSensitiveData(password, apiKey) {
    console.log("CRITICAL: Logging sensitive data directly!");
    console.log("User password:", password); // CRITICAL: Password exposed
    console.log("API Key:", apiKey);         // CRITICAL: API key exposed
    // This is a common SAST finding, especially if it's logging to a persistent log file.
}


// --- Main Execution Block (demonstrating the issues) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("------------------------------------------");
    console.log("CRITICAL ISSUES SCRIPT LOADED (Attempt 2)!");
    console.log("------------------------------------------");

    // 3. Prototype Pollution
    console.log("\n--- Demonstrating Prototype Pollution ---");
    // This is a conceptual example; real-world pollution often comes from parsing JSON.
    dangerouslyPollutePrototype('constructor', 'CRITICAL_POLLUTED_VALUE');
    dangerouslyPollutePrototype('__proto__', 'ANOTHER_POLLUTED_VALUE');
    // Check if Object.prototype was affected (it will be for 'constructor')
    console.log("Object.prototype.constructor after pollution attempt:", Object.prototype.constructor);
    const obj = {};
    // In some engines/contexts, this might show the polluted value
    console.log("Accessing polluted property on a new object:", obj.constructor);


    // 4. Regex Denial of Service (ReDoS)
    console.log("\n--- Demonstrating ReDoS ---");
    // This input will take a very long time
    const longReDoSInput = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!";
    const shortInput = "aaaa!";
    checkDangerousRegex(shortInput);
    // Uncomment the line below to experience the browser/process freeze due to ReDoS
    // checkDangerousRegex(longReDoSInput);
    console.log("ReDoS with long input is commented out to avoid freezing your browser.");

    // 5. Unhandled Promise Rejection
    console.log("\n--- Demonstrating Unhandled Promise Rejection ---");
    createUnhandledPromiseRejection();
    console.log("Check console for 'Unhandled Promise Rejection' error (after a short delay).");

    // 6. Direct Access to Process/Global Objects in Browser Context
    console.log("\n--- Demonstrating Access to Node.js Globals ---");
    accessNodejsGlobalsInBrowser();

    // 7. Sensitive Data Exposure
    console.log("\n--- Demonstrating Sensitive Data Exposure ---");
    logSensitiveData("mySuperSecretPassword123", "pk_live_realapikey98765");


    console.log("\n--- Issues that will CRASH if uncommented ---");
    console.log("WARNING: Uncommenting these will freeze or crash your environment!");

    // 1. Infinite Loop (UNCOMMENT TO FREEZE)
    // createInfiniteLoop();

    // 2. Infinite Recursion (UNCOMMENT TO CRASH WITH STACK OVERFLOW)
    // causeStackOverflow();

    console.log("\n------------------------------------------");
    console.log("End of More Critical Issues Demonstration.");
    console.log("------------------------------------------");
});

// cyclopt_sql_injection_violation.js

// --- CRITICAL ISSUE: SQL Injection Vulnerability ---
// Problem: Direct concatenation of unsanitized user input into an SQL query string.
//          This allows an attacker to manipulate the query, bypass authentication,
//          extract sensitive data, or even modify/delete database content.

/**
 * Simulates executing a database query using user-provided username and password.
 * THIS FUNCTION IS EXTREMELY VULNERABLE TO SQL INJECTION.
 *
 * @param {string} usernameInput - User-provided username.
 * @param {string} passwordInput - User-provided password.
 */
function executeVulnerableLoginQuery(usernameInput, passwordInput) {
    console.warn("CRITICAL: Executing a query vulnerable to SQL Injection!");

    // THIS IS THE VULNERABLE PART!
    // User input is directly inserted into the SQL query string without sanitization
    // or using prepared statements/parameterized queries.
    const sqlQuery = `SELECT id, username FROM users WHERE username = '${usernameInput}' AND password = '${passwordInput}';`;

    console.log("Generated SQL Query (VULNERABLE):", sqlQuery);

    // In a real application, this 'sqlQuery' string would be sent to a database
    // (e.g., via a Node.js backend with a database driver).
    // For this client-side JavaScript demonstration, we'll just log the constructed query.

    // Simulate how an attacker's input would modify the query's intent
    if (usernameInput.includes("' OR '1'='1")) {
        console.error("!!! SQL INJECTION DETECTED IN USERNAME !!!");
        console.error("Attacker could bypass login or access unauthorized data.");
    }
    if (passwordInput.includes("' OR '1'='1")) {
        console.error("!!! SQL INJECTION DETECTED IN PASSWORD !!!");
        console.error("Attacker could bypass login or access unauthorized data.");
    }
    if (usernameInput.includes("DROP TABLE") || passwordInput.includes("DROP TABLE")) {
        console.error("!!! SQL INJECTION DETECTED: DANGER - DATABASE MODIFICATION ATTEMPT !!!");
    }
    if (usernameInput.includes("UNION SELECT") || passwordInput.includes("UNION SELECT")) {
        console.error("!!! SQL INJECTION DETECTED: DANGER - DATA EXFILTRATION ATTEMPT !!!");
    }
}

// --- Main Execution Block ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("------------------------------------------");
    console.log("SQL INJECTION VIOLATION SCRIPT LOADED!");
    console.log("------------------------------------------");

    console.log("\n--- Scenario 1: Normal, legitimate login attempt ---");
    executeVulnerableLoginQuery("alice", "password123");
    // Expected query: SELECT id, username FROM users WHERE username = 'alice' AND password = 'password123';

    console.log("\n--- Scenario 2: Classic SQL Injection to bypass authentication ---");
    // Attacker enters for username: ' OR '1'='1 --
    // The '--' (or '#') comments out the rest of the query, including the password check.
    // The query becomes: SELECT id, username FROM users WHERE username = '' OR '1'='1 --' AND password = 'anypassword';
    // Which simplifies to: SELECT id, username FROM users WHERE '' OR TRUE; (always true)
    executeVulnerableLoginQuery("admin' OR '1'='1 --", "anypassword");

    console.log("\n--- Scenario 3: Another bypass example (using password field) ---");
    // Attacker enters for password: ' OR 1=1; --
    executeVulnerableLoginQuery("bob", "password' OR 1=1; --");

    console.log("\n--- Scenario 4: Potential for data extraction (if UNION SELECT works) ---");
    // This demonstrates the *intent* of data extraction. In a real scenario, an attacker
    // would craft this to match column counts and types.
    // Attacker enters for username: guest' UNION SELECT null, version(), null FROM users --
    // (Assuming a users table with 3 columns for simplicity, or 2 for this example if 'id' is int, 'username' is text)
    // The `null`s are placeholders for column types the attacker doesn't care about or doesn't know.
    executeVulnerableLoginQuery("guest' UNION SELECT 1, database(), 'dummy' FROM users --", "whatever");
    // Note: The actual `UNION SELECT` payload would depend on the database type and table schema.
    // `database()` or `version()` are common functions for information gathering.

    console.log("\n--- Scenario 5: Malicious database modification attempt ---");
    // Attacker enters for username: admin'; DROP TABLE users; --
    // This would execute two statements: a failed login, then a DROP TABLE command.
    executeVulnerableLoginQuery("admin'; DROP TABLE users; --", "securepassword");

    console.log("\n------------------------------------------");
    console.log("End of SQL Injection Violation Demonstration.");
    console.log("------------------------------------------");

    console.log("\n--- HOW TO FIX THIS (PREVENT SQL INJECTION) ---");
    console.log("The ONLY safe way to handle user input in SQL queries is to use parameterized queries or prepared statements.");
    console.log("These separate the SQL code from the user-provided data, preventing malicious input from being interpreted as code.");
    console.log("Example (pseudo-code for a backend database interaction):");
    console.log("const query = 'SELECT id, username FROM users WHERE username = ? AND password = ?;';");
    console.log("db.execute(query, [usernameInput, passwordInput]); // Database driver handles escaping/parameterization");
    console.log("-------------------------------------------------");
});