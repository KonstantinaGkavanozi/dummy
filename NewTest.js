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
