describe("Multipier App", () => {
    // Setup fake mock
    class MultiplierClassMock {
        setMultipier(multiplier) {
            console.log("Mock setMultipier=", multiplier)
            this.multiplier = multiplier;
        }

        multiply(num) {
            console.log("Mock multiply=", this.mockResult);
            return this.multiplier ? this.multiplier * num : num;
        }
    }
    jest.mock("../src/MultiplierClass", () => {
        return MultiplierClassMock;
    });

    // Import test target
    let NumberListMultiply = require("../src/NumberListMultiply");

    // Test
    it("same array", () => {
        let numberListMultiply = new NumberListMultiply();
        let input = [3, 4];
        let output = numberListMultiply.multiplyList(input);
        expect(output).toEqual(input);
    });

    it("multiply array", () => {
        let numberListMultiply = new NumberListMultiply();
        let input = [3, 4];
        let output = numberListMultiply.multiplyList(input, 2);
        expect(output).toEqual([6, 8]);
    });

    it("add array", () => {
        let numberListMultiply = new NumberListMultiply();
        let input = [3,4];
        let output = numberListMultiply.multiplyList(input, undefined, 2);
        expect(output).toEqual([5,6]);
    });
    
    it("add and multiply array", () => {
        let numberListMultiply = new NumberListMultiply();
        let input = [3,4];
        let output = numberListMultiply.multiplyList(input, 2, 2);
        expect(output).toEqual([8,10]);
    });
});