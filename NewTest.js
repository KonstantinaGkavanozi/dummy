// Easy JavaScript script: greeting and sum examples

function greet(name = 'World') {
	return `Hello, ${name}!`;
}

function sum(...nums) {
	return nums.reduce((a, b) => a + b, 0);
}

if (require.main === module) {
	const name = process.argv[2] || 'World';
	console.log(greet(name));
	console.log('Sum example:', sum(1, 2, 3, 4));
}

module.exports = { greet, sum };

// Introduce violations for testing
function unusedFunction() {
	console.log('This function is never used');
}

function anotherUnusedFunction() {
	console.log('This function is also never used');
}

// Create a very long line
const longLine = 'This is a very long line that exceeds the typical 80 character limit for code style guidelines, and it should trigger a violation in linters that enforce line length rules.';

const unusedVariable = 'This variable is declared but never used';
const anotherUnusedVariable = 'This variable is also declared but never used';
const yetAnotherUnusedVariable = 'This variable is also declared but never used';
const oneMoreUnusedVariable = 'This variable is also declared but never used';
const lastUnusedVariable = 'This variable is also declared but never used';