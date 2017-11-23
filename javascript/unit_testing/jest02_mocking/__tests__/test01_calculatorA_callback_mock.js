describe("My Application calculatorA works", () => {
    it("calculatorA can add", () => {

        let calculatorA = require("../src/calculatorA");
        /*
        Mock function, and its mock implementation to return a value.
        */
        let addItMockFunction = jest.fn(() => 2);
        
        let calculatorResult = calculatorA(1, 1, addItMockFunction);
        expect(calculatorResult).toBe("calculatorA = 2");
    });
});
