describe("My Application calculatorB works", () => {
    it("calculatorB can add", () => {
        let addItMockModule = jest.mock("../src/addIt", () => {
            return jest.fn(() => 2);
        });
        let calculator = require("../src/calculatorB");
        let calculatorResult = calculator(1, 1, "+");
        expect(calculatorResult).toBe("calculatorB = 2");
    });
});
