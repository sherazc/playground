if (true) {
    var var01 = 10;
}
console.log("var01 = " + var01);

if(true) {
    let let01 = 20;
}
// This is error:
// console.log("let01 = " + let01);

for (var var02 = 0; var02 < 3; var02++) {
}
console.log("var02 = " + var02);

for (let let02 = 0; let02 < 3; let02++) {
}
// This is error
// console.log("let02 = " + let02);

{
    var var03 = 50;
    let let03 = 60;
}
console.log("var03 = " + var03);
// This is error
// console.log("let03 = " + let03);
