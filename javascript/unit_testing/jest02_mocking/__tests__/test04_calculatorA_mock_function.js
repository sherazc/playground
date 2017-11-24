describe("My Application calculatorA works", () => {
    it("calculatorA can add", () => {

        let calculatorA = require("../src/calculatorA");
        let addItMockFunction = jest.fn(() => 30);
        
        let calculatorResult = calculatorA(10, 20, addItMockFunction);
        expect(calculatorResult).toBe("calculatorA = 30");

        expect(addItMockFunction.mock.calls.length).toBe(1);
        expect(addItMockFunction.mock.calls[0][0]).toBe(10);
        expect(addItMockFunction.mock.calls[0][1]).toBe(20);
    });
});
