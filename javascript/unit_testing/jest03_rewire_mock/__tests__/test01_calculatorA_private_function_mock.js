
describe("My Application calculatorA works", function() {

    it("calculatorA can add", function() {
        // console.log(require("../src/calculatorA"));
        //let calculator = require("../src/calculatorA");
        //console.log(calculator(1,2));
        //let rewire = require("rewire");
        //console.log(rewire.toString());
        //console.log(rewire("../src/calculatorA.js"));
        // console.log(require("rewire").toString());
        let calc = jest.mock("../src/calculatorA.js");
        //console.log(calc);
        calc.mockReturnValue('default')
        .mockImplementation(scalar => 42 + scalar)
        //.mockName('add42');
    });

/*
    it("calculatorA can add", () => {
        let calculator = require("../src/calculatorC");
        console.log(calculator(1,2));
    });

    it("test unexported function", () => {
        let calculator = require("../src/calculatorC");
        let localAddIt = calculator.__get__("localAddIt");
        console.log(localAddIt);
    });
    */
});



