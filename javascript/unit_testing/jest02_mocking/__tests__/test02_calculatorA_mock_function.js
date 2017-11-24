describe("My Application calculatorA works", () => {
    it("calculatorA can add", () => {

        let calculatorA = require("../src/calculatorA");
        /*
        Mock function, and its mock implementation to return a value.
        */
        let addItMockFunction = jest.fn(() => 30);
        
        let calculatorResult = calculatorA(10, 20, addItMockFunction);
        expect(calculatorResult).toBe("calculatorA = 30");

        // Verify how many times mock function was called
        // calls is a 2 dimentional array [calls][arguments[]]
        expect(addItMockFunction.mock.calls.length).toBe(1);
        
        // Verify first argument to be 10 of first call
        expect(addItMockFunction.mock.calls[0][0]).toBe(10);
        
        // Verify second argument to be 20 of first call
        expect(addItMockFunction.mock.calls[0][1]).toBe(20);
    });
});
