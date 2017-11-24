let rewire = require("rewire");

describe("Calculator", () => {
    it("should add", () => {
        //console.log(rewire.toString());
        // console.log(rewire("../src/calculatorA.js"));
        let calc = rewire("../src/calculatorA.js");
        calc.__set__("localAddIt", () => {
            return 5;
        });

        console.log(calc(2, 2));
    });
});