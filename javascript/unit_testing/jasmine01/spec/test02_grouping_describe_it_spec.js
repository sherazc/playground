let add = (a, b) => a + b;

describe("Add application", () => {
    it("should be able to add 2 + 2", () => {
        expect(add(2,2)).toBe(4);
    });

    it("should be able to add 0 + 0", () => {
        expect(add(0,0)).toBe(0);
    });

    describe("calculate negative numbers", () => {
        it("should be able to add -2 + -2", () => {
            expect(add(-2,-2)).toBe(-4);
        });
    });
});