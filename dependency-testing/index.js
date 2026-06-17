// A simple script that uses the declared dependencies
const _ = require('lodash');
const minimist = require('minimist');
const axios = require('axios');
const chalk = require('chalk');

// Parse dummy command‑line arguments
const args = minimist(process.argv.slice(2));

// Demonstrate lodash usage
const numbers = [1, 2, 3, 4];
const doubled = _.map(numbers, n => n * 2);

// Fetch a tiny web page (just to show axios in action)
axios.get('https://httpbin.org/json')
  .then(res => {
    console.log(chalk.green('Fetched data successfully!'));
    console.log('Doubled numbers:', doubled);
  })
  .catch(err => {
    console.error(chalk.red('Request failed:'), err.message);
  });