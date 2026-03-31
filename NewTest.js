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

console.log('This script defines a greeting function and a sum function. You can run it with a name argument to see the greeting, or it will default to "World". The sum function can take any number of arguments and will return their total.');