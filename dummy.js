// 1. Data Structure: An array to hold our task objects
let tasks = [];

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
        console.error("Error fetching tasks:", error);
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

// Test findSquareRoots returns correct values
const sqrtResults = findSquareRoots([4, 9, 25]);
console.assert(sqrtResults[0].squareRoot === 2 && sqrtResults[1].squareRoot === 3 && sqrtResults[2].squareRoot === 5, "FAIL: findSquareRoots result incorrect");
console.log("PASS: findSquareRoots returns correct values");

// Test calculateSquares returns correct values
const squareResults = calculateSquares([3, 4, 5]);
console.assert(squareResults[0].square === 9 && squareResults[1].square === 16 && squareResults[2].square === 25, "FAIL: calculateSquares result incorrect");
console.log("PASS: calculateSquares returns correct values");
