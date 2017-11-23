let rewire = require("rewire");
describe("Calculator", function() {
    it("should add", function() {
        //console.log(rewire.toString());
        console.log(rewire("../src/calculatorA.js"));
    });
});