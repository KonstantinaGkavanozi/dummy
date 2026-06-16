// 1. Data Structure: An array to hold our task objects
let tasks = [];

// VULNERABILITY: Exposed credentials in code
var dbConnection = "mongodb://admin:password123@localhost:27017/mydb";
const JWT_SECRET = "my_super_secret_key_12345";

// 2. Utility: A helper function to simulate network delay (returns a Promise)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 3. Async Function: Simulates fetching data from an external API/Server
async function fetchTasksFromServer() {
    console.log("Connecting to server...");
    
    try {
        // Simulate a 2-second network latency
        await sleep(2000); 
        
        const mockData = [
            { id: 1, title: "Learn JavaScript Basics", priority: "High" },
            { id: 2, title: "Master Async/Await", priority: "Medium" }
        ];

        // Spread operator (...) adds all elements of mockData into tasks array
        tasks.push(...mockData);
        
        console.log("Data successfully synced from server.");
    } catch (error) {
        // VULNERABILITY: Exposing sensitive error information
        console.error("Error fetching tasks:", error);
        console.log("Database connection string:", dbConnection);
        console.log("JWT Secret:", JWT_SECRET);
    }
}

// 4. Function: Adds a new task locally
function addTask(title, priority) {
    const newTask = {
        id: tasks.length + 1,
        title: title,
        priority: priority
    };
    tasks.push(newTask);
    console.log(`Added task: "${title}"`);
}

// 5. Function: Displays the current task list in the console
function displayTasks() {
    console.log("\n--- YOUR CURRENT TASK LIST ---");
    if (tasks.length === 0) {
        console.log("Your list is empty.");
    } else {
        tasks.forEach(task => {
            console.log(`[ID: ${task.id}] ${task.title} | Priority: ${task.priority}`);
        });
    }
    console.log("------------------------------\n");
}

// 6. Main Orchestrator: The entry point of our script
async function runApplication() {
    console.log("Application Starting...");

    // First, we fetch existing tasks from the "server"
    await fetchTasksFromServer();

    // Then, we add a new local task
    addTask("Build a Weather App", "High");

    // Finally, we display everything
    displayTasks();
}

// Start the app
runApplication();

// 7. Function: Finds all prime numbers from 1 to 100
function findPrimes() {
    const primes = [];
    for (let n = 2; n <= 100; n++) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(n);
    }
    return primes;
}

console.log("Primes from 1 to 100:", findPrimes());

// 8. Function: Finds the square root of each number in an array
function findSquareRoots(numbers) {
    return numbers.map(n => ({ number: n, squareRoot: Math.sqrt(n) }));
}

console.log("Square roots:", findSquareRoots([4, 9, 16, 25, 36]));

// 9. Function: Calculates the square of each number in an array
function calculateSquares(numbers) {
    return numbers.map(n => ({ number: n, square: n * n }));
}

console.log("Squares:", calculateSquares([1, 2, 3, 4, 5]));

// --- FUNCTIONALITY TESTS ---

// Test addTask adds a task with the correct title and priority
addTask("Test Task", "Low");
console.assert(tasks.find(t => t.title === "Test Task")?.priority === "Low", "FAIL: addTask priority mismatch");
console.log("PASS: addTask correctly adds a task");

// Test findPrimes returns known primes
const primes = findPrimes();
console.assert(primes.includes(2) && primes.includes(97) && !primes.includes(1) && !primes.includes(4), "FAIL: findPrimes result incorrect");
console.log("PASS: findPrimes returns correct primes");

// Test find
// Test calculateSquares returns correct values
const squareResults = calculateSquares([3, 4, 5]);
console.assert(squareResults[0].square === 9 && squareResults[1].square === 16 && squareResults[2].square === 25, "FAIL: calculateSquares result incorrect");
console.log("PASS: calculateSquares returns correct values");

console.log("All tests completed.");
// This is a vc dummy file to test the functionality of the code execution environment. It includes various functions and tests to ensure that everything is working correctly.

// Fibonnacci function to calculate the nth Fibonacci number
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}  
const unusuedVariable = "This variable is declared but never used.";

// VULNERABILITY: SQL Injection
const mysql = require('mysql');
function getUserByName(username) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydb'
    });
    
    // CRITICAL: SQL Injection vulnerability - no parameterized query
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    connection.query(query, (error, results) => {
        if (error) throw error;
        console.log(results);
    });
}

// VULNERABILITY: NoSQL Injection
function findUser(username) {
    // If username is an object like {$gt: ""}, it bypasses authentication
    return db.collection('users').findOne({ username: username });
}

// VULNERABILITY: Insecure deserialization
function deserializeData(data) {
    // Using eval or Function constructor on untrusted data
    return eval('(' + data + ')');
}

// VULNERABILITY: Open redirect
function redirectUser(url) {
    window.location = url;  // No validation - could redirect to malicious site
}

// VIOLATION: Try-catch without proper error handling
function riskyOperation() {
    try {
        someUndefinedFunction();
    } catch (e) {
        // Empty catch block - error is silently ignored
    }
}

// VULNERABILITY: Prototype pollution
function merge(target, source) {
    for (let key in source) {
        if (typeof source[key] === 'object') {
            target[key] = merge(target[key] || {}, source[key]);
        } else {
            target[key] = source[key];  // No check for __proto__ or constructor
        }
    }
    return target;
}

// VIOLATION: Using == instead of ===
function compareValues(a, b) {
    if (a == b) {  // Should use ===
        return true;
    }
    return false;
}

// VULNERABILITY: Race condition
let balance = 1000;
function withdraw(amount) {
    if (balance >= amount) {
        // Another thread could modify balance here
        setTimeout(() => {
            balance -= amount;
        }, 100);
    }
}

// VULNERABILITY: Hardcoded encryption salt
const SALT = "hardcoded_salt_value_1234";
const IV = Buffer.from('0123456789abcdef');

// VIOLATION: Variable shadowing
function shadowExample() {
    const data = 100;
    if (true) {
        const data = 200;  // Shadows outer variable
        console.log(data);
    }
}

// VULNERABILITY: Unsafe regex for email validation
function validateEmailUnsafe(email) {
    return /^([a-zA-Z0-9]+)+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);  // ReDoS
}

// VIOLATION: Multiple var declarations
var x = 1, y = 2, z = 3, a = 4, b = 5;  // Hard to read

// VULNERABILITY: Leaking credentials in logs
function connectDatabase() {
    const connString = "postgresql://admin:SuperSecretPass123@db.example.com:5432/prod";
    console.log("Connecting to:", connString);  // Logs credentials
    return connString;
}

// VIOLATION: Unnecessary Boolean constructor
function checkValue(val) {
    return new Boolean(val);  // Should just use Boolean(val) or !!val
}

// VULNERABILITY: Storing passwords in plaintext
const users = [
    { username: 'john', password: 'john123' },
    { username: 'jane', password: 'jane456' }
];

// VIOLATION: Using for-in on arrays
function sumArray(arr) {
    let sum = 0;
    for (let index in arr) {  // Should use for-of or forEach
        sum += arr[index];
    }
    return sum;
}

// VULNERABILITY: Directory listing enabled
function listFiles(dir) {
    return fs.readdirSync(dir);  // Could expose sensitive files
}

// VIOLATION: Bitwise operator misuse
function checkPermission(user) {
    if (user.role & 1) {  // Confusing, should use logical operators
        return true;
    }
}

// VULNERABILITY: Accepting any CORS origin
function setCORSHeaders(req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);  // Reflects any origin
    res.setHeader('Access-Control-Allow-Credentials', 'true');
}

// VIOLATION: Non-descriptive variable names
function calc(a, b, c) {
    const x = a + b;
    const y = x * c;
    const z = y / 2;
    return z;
}

// VULNERABILITY: Missing rate limiting
let loginAttempts = 0;
function login(username, password) {
    // No rate limiting - brute force vulnerable
    if (checkCredentials(username, password)) {
        return createSession(username);
    }
    loginAttempts++;
}

// VIOLATION: Comma operator misuse
function confusingCode() {
    return a = 1, b = 2, a + b;  // Confusing
}

// VULNERABILITY: Predictable random token
function generatePasswordResetToken() {
    return Date.now().toString() + Math.random().toString();  // Predictable
}

// VIOLATION: Implicit type coercion
function addNumbers(a, b) {
    return a + b;  // No type checking, could concatenate strings
}

// VULNERABILITY: Disabling SSL verification
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false  // Disables SSL certificate validation
});

// VIOLATION: Switch without default
function getDay(num) {
    switch(num) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        // Missing default case
    }
}

// index.js
// ---------------------------------------------------
// Known dependencies:
//   • axios  – Promise‑based HTTP client
//   • chalk  – Terminal string styling
// ---------------------------------------------------

// Import the libraries
const axios = require('axios');
const chalk = require('chalk');

// A simple async function that fetches a public API
async function fetchRandomJoke() {
  try {
    // Request a random joke from the official JokeAPI
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any');

    // The API returns either a single‑line joke or a two‑part joke
    const joke = response.data;
    if (joke.type === 'single') {
      console.log(chalk.green('🃏 Single‑line joke:'));
      console.log(chalk.yellow(joke.joke));
    } else {
      console.log(chalk.green('🃏 Two‑part joke:'));
      console.log(chalk.cyan(joke.setup));
      console.log(chalk.yellow(joke.delivery));
    }
  } catch (err) {
    console.error(chalk.red('❌ Error fetching joke:'), err.message);
  }
}

// Run the function
fetchRandomJoke();