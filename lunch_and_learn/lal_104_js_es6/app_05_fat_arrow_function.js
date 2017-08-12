let add = (a, b) => {
    return a + b;
};
console.log(add(5, 10));

// For single line function we can omit {} and return keyword.
let subtract = (a, b) => a - b;
console.log(subtract(50, 20));

// For single input parameter function we can even omit () around parameters
let double = a => a * 2;
console.log(double(3));

// But for no parameter arrow function we need to give ().
let myName = () => "My name is Sheraz";
console.log(myName());

