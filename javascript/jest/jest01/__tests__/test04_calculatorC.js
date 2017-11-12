describe("My Application calculatorA works", () => {
    it("calculatorA can add", () => {
        let calculator = require("../src/calculatorC");
        /*
        jest.mock("../src/calculatorC", () => {
            return {
                localAddIt: jest.fn()
            }
        });
        */
        console.log(calculator(1,2));
    });
});
