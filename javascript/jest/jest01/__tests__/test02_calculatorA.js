describe("My Application calculatorA works", () => {
    it("calculatorA can add", () => {
        /*
        Mock function, and its mock implementation to return a value.
        */
        let addItMockFunction = jest.fn(() => 2);
        
        let calculatorA = require("../src/calculatorA");
        let calculatorResult = calculatorA(1, 1, addItMockFunction);
        expect(calculatorResult).toBe("calculatorA = 2");
    });
});
