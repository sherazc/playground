// https://nodejs.org/api/globals.html
// console.log(exports);
// console.log(global);

console.log(__dirname);
console.log(__filename);

// Runs every second
let seconds = 0;
let interval = setInterval(() => {
    console.log(`Running ${++seconds} ...`);
}, 1000, "abc");

// Stops interval after 5 seconds
let timeout = setTimeout(() => {
    console.log(`Clearing interval.`);
    clearInterval(interval);
}, 5000);

// Stops timeout
// clearTimeout(timeout);