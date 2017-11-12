/* let localAddIt = (a, b) => {
    console.log(`mock localAddIt ${a} + ${b}`);
    return a + b;
} */
console.log("getting called");
module.exports = {
    localAddIt: jest.fn()
}