describe("My Application calculatorC works", () => {
    it("calculatorA can add", () => {

        /*
        TODO: unable to mock module local function. I tried:
            - __mocks__ manual mock technique
            - Can't do named mock. available in 23.3.0+. 
                This version is not available in npmjs.com. 
                https://facebook.github.io/jest/docs/en/mock-functions.html#mock-names
                Current jest npmjs.com version is 21.2.1
            - jest.mock()
        */
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
