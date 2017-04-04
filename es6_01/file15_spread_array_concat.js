let numbers1 = [1,2,3,4];
let numbers2 = [5,6,7,8];

// In ES5 we concat array using concat()
let numbersConcat1 = numbers1.concat(numbers2);
console.log(numbersConcat1);

// In ES6 we can use spread to concat arrays
let numbersConcat2 = [...numbers1, ...numbers2];
console.log(numbersConcat2);

let numbersConcat3 = [10,20, ...numbers1, 30, 40, ...numbers2, 50, 60];
console.log(numbersConcat3);
