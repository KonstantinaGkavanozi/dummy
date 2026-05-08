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

console.log("This message appears immediately, demonstrating async behavior.");