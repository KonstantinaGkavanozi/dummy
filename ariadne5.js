/**
 * @file This script is intentionally designed to demonstrate numerous Cyclomatic Complexity violations.
 *      It should NOT be used as a reference for good coding practices.
 *      Each 'if', 'else if', 'else', 'switch', 'case', 'default', 'for', 'while', '&&', '||', '?:',
 *      and 'try-catch' block adds to the Cyclomatic Complexity.
 *      A real-world linter would flag this code heavily.
 */

// Global variable (bad practice, but adds a dependency)
let globalProcessingConfig = {
    enableAdvancedValidation: true,
    maxRetries: 3,
    debugMode: false
};

/**
 * Processes a list of diverse data items based on a complex configuration and various internal rules.
 * This function is a prime example of high Cyclomatic Complexity.
 *
 * @param {Array<Object>} dataItems - An array of objects, each with 'type', 'value', 'status', 'options', etc.
 * @param {Object} contextConfig - Configuration object specific to this processing run.
 * @returns {Array<Object>} An array of processed results.
 */
function processHighlyComplexData(dataItems, contextConfig) {
    // 1. Initial validation (multiple 'if' statements)
    if (!dataItems || !Array.isArray(dataItems) || dataItems.length === 0) { // CC +1 (for '||' * 2)
        console.error("Error: Input dataItems array is invalid or empty.");
        if (globalProcessingConfig.debugMode) { // CC +1
            console.log("Debug: Returning empty array due to invalid input.");
        }
        return [];
    }

    if (typeof contextConfig !== 'object' || contextConfig === null) { // CC +1 (for '||')
        console.warn("Warning: contextConfig is invalid, using default settings.");
        contextConfig = {
            priorityThreshold: 5,
            enableLogging: false,
            fallbackValue: "DEFAULT_FALLBACK",
            allowEmptyStrings: false
        };
    }

    const processedResults = [];
    let retryCount = 0;
    let successfulItems = 0;

    // Outer loop (CC +1)
    for (let i = 0; i < dataItems.length; i++) {
        let currentItem = dataItems[i];
        let itemResult = {
            originalIndex: i,
            originalItem: { ...currentItem }, // Shallow copy
            processedValue: null,
            status: "PENDING",
            message: ""
        };

        // 2. Item-level validation (more 'if's)
        if (typeof currentItem !== 'object' || currentItem === null) { // CC +1 (for '||')
            itemResult.status = "SKIPPED";
            itemResult.message = "Item is not a valid object.";
            processedResults.push(itemResult);
            continue; // CC +1
        }

        if (!currentItem.type || typeof currentItem.type !== 'string') { // CC +1 (for '||')
            itemResult.status = "FAILED";
            itemResult.message = "Item missing or invalid 'type' property.";
            processedResults.push(itemResult);
            continue; // CC +1
        }

        // 3. Complex Type-based processing using a switch statement (CC +1 for switch, +1 for each case/default)
        switch (currentItem.type.toLowerCase()) {
            case "number": // CC +1
                if (typeof currentItem.value !== 'number' || isNaN(currentItem.value)) { // CC +1 (for '||')
                    itemResult.status = "FAILED";
                    itemResult.message = "Value is not a valid number.";
                    itemResult.processedValue = 0;
                } else { // CC +1
                    if (currentItem.value < 0 && !contextConfig.allowNegativeNumbers) { // CC +1 (for '&&')
                        itemResult.status = "ADJUSTED";
                        itemResult.message = "Negative number adjusted to zero.";
                        itemResult.processedValue = 0;
                    } else if (currentItem.value > 1000 || currentItem.value < -1000) { // CC +1 (for '||')
                        itemResult.status = "WARNING";
                        itemResult.message = "Number is out of typical range.";
                        itemResult.processedValue = currentItem.value;
                        if (currentItem.value % 2 === 0) { // CC +1
                            itemResult.processedValue += 10;
                        } else { // CC +1
                            itemResult.processedValue -= 5;
                        }
                    } else { // CC +1
                        itemResult.processedValue = currentItem.value * (contextConfig.multiplier || 1.5);
                        itemResult.status = "SUCCESS";
                        itemResult.message = "Number processed.";
                    }
                }
                break;

            case "string": // CC +1
                if (typeof currentItem.value !== 'string') { // CC +1
                    itemResult.status = "FAILED";
                    itemResult.message = "Value is not a string.";
                    itemResult.processedValue = contextConfig.fallbackValue;
                } else { // CC +1
                    if (currentItem.value.length === 0 && !contextConfig.allowEmptyStrings) { // CC +1 (for '&&')
                        itemResult.status = "FAILED";
                        itemResult.message = "Empty string not allowed.";
                        itemResult.processedValue = contextConfig.fallbackValue;
                    } else if (currentItem.value.includes("badword") || currentItem.value.includes("forbidden")) { // CC +1 (for '||')
                        itemResult.status = "CLEANSED";
                        itemResult.message = "String contained problematic content.";
                        itemResult.processedValue = currentItem.value.replace(/badword|forbidden/gi, "****");
                        if (globalProcessingConfig.enableAdvancedValidation && itemResult.processedValue.length < 5) { // CC +1 (for '&&')
                            itemResult.processedValue = "TOO_SHORT_AFTER_CLEANSING";
                            itemResult.status = "FAILED_CLEANSING";
                        }
                    } else { // CC +1
                        itemResult.processedValue = currentItem.value.trim().toUpperCase();
                        itemResult.status = "SUCCESS";
                        itemResult.message = "String processed.";
                    }
                }
                break;

            case "boolean": // CC +1
                if (typeof currentItem.value !== 'boolean') { // CC +1
                    itemResult.status = "FAILED";
                    itemResult.message = "Value is not a boolean.";
                    itemResult.processedValue = false;
                } else { // CC +1
                    itemResult.processedValue = currentItem.value ? (contextConfig.trueOutput || "TRUE") : (contextConfig.falseOutput || "FALSE"); // CC +1 (ternary)
                    itemResult.status = "SUCCESS";
                    itemResult.message = "Boolean processed.";
                }
                break;

            case "object": // CC +1
                if (typeof currentItem.value !== 'object' || currentItem.value === null || Array.isArray(currentItem.value)) { // CC +1 (for '||' * 2)
                    itemResult.status = "FAILED";
                    itemResult.message = "Value is not a valid plain object.";
                    itemResult.processedValue = {};
                } else { // CC +1
                    let objectKeys = Object.keys(currentItem.value);
                    if (objectKeys.length === 0) { // CC +1
                        itemResult.status = "WARNING";
                        itemResult.message = "Empty object encountered.";
                        itemResult.processedValue = { default: contextConfig.fallbackValue };
                    } else if (objectKeys.includes("secret") && !contextConfig.allowSecretKeys) { // CC +1 (for '&&')
                        itemResult.status = "REDACTED";
                        itemResult.message = "Object contained forbidden 'secret' key.";
                        let newObj = { ...currentItem.value };
                        delete newObj.secret; // Modifying object in loop, potential side-effect
                        itemResult.processedValue = newObj;
                    } else if (objectKeys.length > 5 && globalProcessingConfig.enableAdvancedValidation) { // CC +1 (for '&&')
                        // Nested loop for deep processing (CC +1)
                        let transformedObj = {};
                        for (const key in currentItem.value) { // CC +1
                            if (currentItem.value.hasOwnProperty(key)) { // CC +1
                                if (typeof currentItem.value[key] === 'string' && currentItem.value[key].length > 20) { // CC +1 (for '&&')
                                    transformedObj[key] = currentItem.value[key].substring(0, 20) + "...";
                                } else if (typeof currentItem.value[key] === 'number' && currentItem.value[key] < 0) { // CC +1 (for '&&')
                                    transformedObj[key] = Math.abs(currentItem.value[key]);
                                } else { // CC +1
                                    transformedObj[key] = currentItem.value[key];
                                }
                            }
                        }
                        itemResult.processedValue = transformedObj;
                        itemResult.status = "DEEP_PROCESSED";
                        itemResult.message = "Complex object processed with deep rules.";
                    } else { // CC +1
                        itemResult.processedValue = { ...currentItem.value, timestamp: new Date().toISOString() };
                        itemResult.status = "SUCCESS";
                        itemResult.message = "Generic object processed.";
                    }
                }
                break;

            default: // CC +1
                itemResult.status = "UNKNOWN_TYPE";
                itemResult.message = `Item has an unknown type: ${currentItem.type}.`;
                itemResult.processedValue = null;
                break;
        }
        const anotherUnusedVariable = "This variable is never used, but adds to complexity!"; // CC +1 (for unused variable)
        const yetAnotherUnusedVariable = 42; // CC +1 (for another unused variable)
        

        // 4. Post-processing and logging based on flags
        if (contextConfig.enableLogging && itemResult.status !== "SKIPPED") { // CC +1 (for '&&')
            console.log(`Log: Item ${i} (${itemResult.status}) - ${itemResult.message}`);
        }

        // 5. Conditional retry logic (more 'if's and a 'while' loop)
        if (itemResult.status === "FAILED" && retryCount < globalProcessingConfig.maxRetries) { // CC +1 (for '&&')
            let attemptedRetry = false;
            // Inner while loop (CC +1)
            while (retryCount < globalProcessingConfig.maxRetries && !attemptedRetry) { // CC +1 (for '&&')
                console.warn(`Retrying item ${i} (attempt ${retryCount + 1})...`);
                // Simulate a retry by re-evaluating (simplified for demonstration)
                // In a real scenario, you'd re-call the processing logic.
                if (Math.random() > 0.5) { // CC +1
                    itemResult.status = "RETRY_SUCCESS";
                    itemResult.message += " (Retried successfully)";
                    itemResult.processedValue = itemResult.originalItem.value; // Reset to original for simplicity
                    successfulItems++;
                } else { // CC +1
                    itemResult.status = "RETRY_FAILED";
                    itemResult.message += " (Retry failed)";
                }
                retryCount++;
                attemptedRetry = true;
            }
        } else if (itemResult.status === "SUCCESS" || itemResult.status === "RETRY_SUCCESS") { // CC +1 (for '||')
            successfulItems++;
        }

        // 6. Error handling with try-catch-finally (CC +1 for try, +1 for catch)
        try { // CC +1
            if (itemResult.processedValue === null && itemResult.status !== "SKIPPED") { // CC +1 (for '&&')
                throw new Error("Processed value ended up null unexpectedly.");
            }
            // Some final transformation that might fail
            if (itemResult.status.startsWith("SUCCESS") && typeof itemResult.processedValue === 'string' && itemResult.processedValue.length > 500) { // CC +1 (for '&&' * 2)
                 itemResult.processedValue = itemResult.processedValue.substring(0, 500) + "...";
                 itemResult.message += " (Value truncated for storage)";
            }
        } catch (error) { // CC +1
            itemResult.status = "CRITICAL_ERROR";
            itemResult.message = `CRITICAL: ${error.message}`;
            itemResult.errorDetails = error.stack;
            if (globalProcessingConfig.debugMode) { // CC +1
                console.error(`Debug: Critical error for item ${i}: ${error.message}`);
            }
        } finally { // CC +1 (even if it doesn't add a path, some tools count it)
            if (itemResult.status === "PENDING") { // CC +1
                itemResult.status = "UNHANDLED_STATE";
                itemResult.message = "Item ended in an unhandled state.";
            }
        }

        processedResults.push(itemResult);
    } // End of for loop

    // Final summary based on conditions
    if (successfulItems === dataItems.length) { // CC +1
        console.info("All items processed successfully!");
    } else if (successfulItems > 0 && successfulItems < dataItems.length) { // CC +1 (for '&&')
        console.warn(`${successfulItems} out of ${dataItems.length} items processed successfully.`);
    } else { // CC +1
        console.error("No items were processed successfully.");
    }

    return processedResults;
}

// --- Example Usage ---
const sampleData = [
    { type: "number", value: 123, options: { round: true } },
    { type: "string", value: "  hello world!  " },
    { type: "number", value: -50, options: { ignoreSign: true } },
    { type: "string", value: "This string contains badword and is forbidden." },
    { type: "boolean", value: true },
    { type: "object", value: { id: 1, name: "Test Object" } },
    { type: "number", value: 1500 },
    { type: "unknownType", value: "This will fail." },
    { type: "string", value: "" }, // Empty string
    null, // Invalid item
    { type: "object", value: {} }, // Empty object
    { type: "object", value: { a: 1, b: 2, c: "a very long string that should be truncated by the deep processing logic", d: -100, e: 5, secret: "classified" } },
    { type: "string", value: "Another string that might fail retry if enabled" }
];

const mainConfig = {
    multiplier: 2,
    allowNegativeNumbers: false,
    priorityThreshold: 3,
    enableLogging: true,
    fallbackValue: "N/A",
    trueOutput: "YES",
    falseOutput: "NO",
    allowEmptyStrings: false,
    allowSecretKeys: false
};

console.log("--- Starting Complex Processing ---");
const finalResults = processHighlyComplexData(sampleData, mainConfig);
console.log("\n--- Final Results Summary ---");
finalResults.forEach(res => {
    console.log(`Item ${res.originalIndex}: Status='${res.status}', Message='${res.message}', Value='${JSON.stringify(res.processedValue)}'`);
});

// Demonstrate with different global config
console.log("\n--- Starting Processing with Debug Mode ---");
globalProcessingConfig.debugMode = true;
globalProcessingConfig.maxRetries = 1; // Lower retries for quicker demo
const debugResults = processHighlyComplexData(sampleData.slice(0, 3), { ...mainConfig, allowNegativeNumbers: true });
console.log("\n--- Debug Results Summary ---");
debugResults.forEach(res => {
    console.log(`Item ${res.originalIndex}: Status='${res.status}', Message='${res.message}', Value='${JSON.stringify(res.processedValue)}'`);
});

// Demonstrate with invalid input
console.log("\n--- Starting Processing with Invalid Data ---");
const invalidResults = processHighlyComplexData(null, mainConfig);
console.log("\n--- Invalid Data Results Summary ---");
console.log(invalidResults);