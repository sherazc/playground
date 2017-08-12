var var1es5 = 100;
let var2es6 = 200;

if(true) {
    var1es5 = var1es5 + 10;
    var2es6 = var2es6 + 20;

    var var3es5 = 300;
    let var4es6 = 400;
}

console.log(var1es5);
console.log(var2es6);
console.log(var3es5);
// console.log(var4es6); // Can't access. Its blocked scoped