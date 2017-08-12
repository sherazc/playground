let numbers = [1,2,3,4,5,6,7,8,9];
// We use [] to de-structure array
let [first, second] = numbers;
console.log(first, second);

// We can skip elements by not giving any variable name
let [,,,,fifth] = numbers;
console.log(fifth);

// We can also use spread operator to get remaining elements
let [,,,fourth,,...remainingNumbers] = numbers;
console.log(fourth);
console.log(remainingNumbers);