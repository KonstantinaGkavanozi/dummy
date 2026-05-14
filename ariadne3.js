// cyclopt_issues_example.js

// Issue: Missing file-level JSDoc/description
// ESLint with JSDoc plugin might flag: `jsdoc/require-file-overview`



// This is an extremely long line of comment text that goes far beyond the recommended
// line length limit of 80 or 100 characters, which is a common style guide violation
// for readability and maintainability. It's just here to demonstrate that specific
// type of linting error that many tools will flag.
// ESLint will flag: `max-len`

// Issue: Missing JSDoc for function
// ESLint with JSDoc plugin might flag: `jsdoc/require-jsdoc`
export function calculateComplexValue(inputList, factor, mode = 'add', debugFlags = []) { // Issue: Mutable default argument (NOT a JS issue like Python,
                                                                                 // but can be misunderstood by Python developers or still lead
                                                                                 // to logic errors if debugFlags is modified and reused elsewhere)
                                                                                 // ESLint might flag: `no-param-reassign` if debugFlags was reassigned
    if (inputList === null) { // Issue: Redundant comparison with null (can be 'if (!inputList)')
                              // ESLint might flag: `no-constant-condition` or `yoda` if misconfigured
        console.log("Input list is null, returning 0."); // Issue: console.log in production code
                                                         // ESLint will flag: `no-console`
        return 0;
    }

    let totalSum = 0;

    // Issue: High Cyclomatic Complexity due to many nested if/else if/else and loops
    // ESLint with complexity plugin might flag: `complexity`, `max-nested-callbacks` (if async)
    for (const item of inputList) {
        if (item < 0) {
            console.log(`Skipping negative item: ${item}`); // Issue: console.log
            continue;
        } else if (item === 0) {
            console.log("Encountered zero."); // Issue: console.log
            // Issue: Duplicate code block (similar console.log logic)
            console.log("Processing item with special logic."); // This line is duplicated below
            totalSum += (factor / 2); // Issue: Magic number '2'
                                      // ESLint might flag: `no-magic-numbers`
        } else {
            if (mode == 'add') { // Issue: Loose equality '==' instead of '==='
                                 // ESLint will flag: `eqeqeq`
                totalSum += item * factor;
                if (totalSum > 500) { // Issue: Magic number '500'
                                      // ESLint might flag: `no-magic-numbers`
                    console.log("Sum exceeded 500, applying a reduction."); // Issue: console.log
                    totalSum /= 1.5; // Issue: Magic number '1.5'
                                     // ESLint might flag: `no-magic-numbers`
                } else {
                    // Issue: Redundant empty else block
                    // ESLint might flag: `no-empty`
                }
            } else if (mode === 'subtract') {
                totalSum -= item / factor;
            } else if (mode === 'multiply') {
                totalSum *= item;
            } else {
                // Issue: Bare catch block (catches all exceptions, hides real issues)
                // ESLint will flag: `no-empty-catch` (if empty) or `no-unused-vars` (if error not used)
                try {
                    console.log(`Unknown mode '${mode}', using default addition.`); // Issue: console.log
                    totalSum += item + factor;
                } catch (_) { // Intentionally unused catch variable
                    console.error("An unexpected error occurred during default operation."); // Issue: console.error
                    // Issue: Lack of specific error handling or logging
                    // ESLint might flag: `no-empty-function` if the catch block is empty
                }
            }
        }
    }

    // Issue: Hardcoded string, could be a constant
    if (debugFlags.includes("verbose")) {
        console.log(`Final sum before final adjustment: ${totalSum}`); // Issue: console.log
    }

    // Issue: Redundant comparison with 'True' string
    // In Node.js, `process.env` is used. For browsers, this would be `localStorage.getItem` or similar.
    // ESLint might flag: `no-constant-condition` or `yoda` if misconfigured
    if (process.env.APPLY_FINAL_ADJUSTMENT == 'True') { // Issue: Loose equality '=='
                                                        // ESLint will flag: `eqeqeq`
        totalSum *= 1.1; // Issue: Magic number '1.1'
                         // ESLint might flag: `no-magic-numbers`
    }

    return totalSum;
}

// Issue: Missing JSDoc for function
// ESLint with JSDoc plugin might flag: `jsdoc/require-jsdoc`
function checkStatus(isActive) {
    if (isActive === true) { // Issue: Redundant comparison with true (can be 'if (isActive)')
                             // ESLint will flag: `no-unneeded-ternary` or `no-extra-boolean-cast`
        return "ACTIVE";
    } else {
        return "INACTIVE";
    }
}

/**
 * Processes a command from the user.
 * @param {string} userCommand The command string.
 */
function processUserInput(userCommand) {
    if (userCommand.includes("delete")) {
        console.log("Warning: 'delete' command detected."); // Issue: console.log
        // Issue: Potential security vulnerability (using eval)
        // ESLint will flag: `no-eval`
        try {
            // DO NOT DO THIS IN REAL CODE! This is a major security hole.
            let parts = userCommand.split(" ");
            let evalTarget = parts[1] || '1+1'; // Ensure eval has something to evaluate
            let result = eval(evalTarget);
            console.log(`Eval result: ${result}`); // Issue: console.log
        } catch (error) { // Issue: Catching generic 'error' without specific handling
                          // ESLint might flag: `no-empty-catch` if block is empty
            console.error(`Error evaluating command: ${error}`); // Issue: console.error
        }
    } else {
        console.log(`Processing safe command: ${userCommand}`); // Issue: console.log
        // Issue: Duplicate code block (similar console.log logic)
        console.log("Processing item with special logic."); // This line is identical to one above
    }
}

// Issue: Missing JSDoc for function
// ESLint with JSDoc plugin might flag: `jsdoc/require-jsdoc`
export function main() {
    let inputList = [10, -5, 20, 0, 30, 45, 12, 88, -1, 7]; // Issue: Can be 'const'
                                                      // ESLint will flag: `prefer-const`
    const factor = 3.5;
    const mode = 'add';


    // Issue: High Cyclomatic Complexity due to many nested if/else if/else and loops
    // ESLint with `complexity` rule, or SonarJS plugin will flag: `complexity`
    for (const item of inputList) {
        if (item < 0) {
            console.log(`Skipping negative item: ${item}`); // Issue: console.log
            continue;
        } else if (item === 0) {
            console.log("Encountered zero."); // Issue: console.log
            // Issue: Duplicate code block (similar console.log logic)
            console.log("Processing item with special logic."); // This line is duplicated below
            totalSum += (factor / 2); // Issue: Magic number '2'
                                      // ESLint might flag: `no-magic-numbers`
        } else {
            if (mode == 'add') { // Issue: Loose equality '==' instead of '==='
                                 // ESLint will flag: `eqeqeq`
                totalSum += item * factor;
                if (totalSum > 500) { // Issue: Magic number '500'
                                      // ESLint might flag: `no-magic-numbers`
                    console.log("Sum exceeded 500, applying a reduction."); // Issue: console.log
                    totalSum /= 1.5; // Issue: Magic number '1.5'
                                     // ESLint might flag: `no-magic-numbers`
                } else {
                    // Issue: Redundant empty else block
                    // ESLint will flag: `no-empty`
                }
            } else if (mode === 'subtract') {
                totalSum -= item / factor;
            } else if (mode === 'multiply') {
                totalSum *= item;
            } else {
                // Issue: Bare catch block (catches all exceptions, hides real issues)
                // ESLint will flag: `no-empty-catch` (if the block is truly empty)
                // or `no-unused-vars` (if 'e' is caught but not used)
                try {
                    console.log(`Unknown mode '${mode}', using default addition.`); // Issue: console.log
                    totalSum += item + factor;
                } catch (_) { // Intentionally unused catch variable
                    console.error("An unexpected error occurred during default operation."); // Issue: console.error
                    // Issue: Lack of specific error handling or logging
                    // ESLint might flag: `no-empty-function` if the catch block is empty
                }
            }
        }
    }

    // Issue: Hardcoded string, could be a constant
    if (debugFlags.includes("verbose")) {
        console.log(`Final sum before final adjustment: ${totalSum}`); // Issue: console.log
    }

    // Issue: Redundant comparison with 'True' string
    // In Node.js, `process.env` is used. For browsers, this would require a mock or different logic.
    // ESLint might flag: `no-constant-condition` or `yoda` (if `'True' == process.env.VAR`)
    if (process.env.APPLY_FINAL_ADJUSTMENT == 'True') { // Issue: Loose equality '=='
                                                        // ESLint will flag: `eqeqeq`
        totalSum *= 1.1; // Issue: Magic number '1.1'
                         // ESLint might flag: `no-magic-numbers`
    }

    return totalSum;
}

// Issue: Missing JSDoc for function
// ESLint with JSDoc plugin might flag: `jsdoc/require-jsdoc`
function checkStatus(isActive) {
    if (isActive === true) { // Issue: Redundant comparison with true (can be 'if (isActive)')
                             // ESLint will flag: `no-unneeded-ternary` or `no-extra-boolean-cast`
        return "ACTIVE";
    } else {
        return "INACTIVE";
    }
}

/**
 * Processes a command from the user.
 * @param {string} userCommand The command string.
 */
function processUserInput(userCommand) {
    if (userCommand.includes("delete")) {
        console.log("Warning: 'delete' command detected."); // Issue: console.log
        // Issue: Potential security vulnerability (using eval)
        // ESLint will flag: `no-eval`
        try {
            // DO NOT DO THIS IN REAL CODE! This is a major security hole.
            let parts = userCommand.split(" ");
            let evalTarget = parts[1] || '1+1'; // Ensure eval has something to evaluate
            let result = eval(evalTarget);
            console.log(`Eval result: ${result}`); // Issue: console.log
        } catch (error) { // Issue: Catching generic 'error' without specific handling
                          // ESLint will flag: `no-empty-catch` if the block is empty
            console.error(`Error evaluating command: ${error}`); // Issue: console.error
        }
    } else {
        console.log(`Processing safe command: ${userCommand}`); // Issue: console.log
        // Issue: Duplicate code block (similar console.log logic)
        console.log("Processing item with special logic."); // This line is identical to one above
                                                            // ESLint with SonarJS plugin might flag: `sonarjs/no-duplicate-string`
    }
}
