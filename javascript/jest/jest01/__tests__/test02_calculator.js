describe("My Application addIt works", () => {
    it("Calculator can add", () => {
        let addItMock = jest.mock("../src/addIt", () => {
            return jest.fn(() => 2);
        });
        let calculator = require("../src/calculator");
        let calculatorResult = calculator(1, 1, "+");
        expect(calculatorResult).toBe(2);
    });
});
