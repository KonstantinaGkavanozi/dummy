// 1. Data
let myTasks = [];

// 2. Functionality
function addTask(name, priority) {
    myTasks.push({ title: name, priority: priority });
}

function displayTasks() {
    console.log("Task list " + userName + ":");
    myTasks.forEach((t, index) => {
        console.log(`${index + 1}. ${t.title} [${t.priority}]`);
    });
}

// 3. Usage of the Script
const userName = "Friend";
addTask("JavaScript Lesson", "High");
addTask("Gym", "Low");
addTask("Movie Night", "Medium");

displayTasks();

// this is a new comment