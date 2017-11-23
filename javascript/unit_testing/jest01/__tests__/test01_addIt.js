let add = (a, b) => {
    console.log(`add ${a} + ${b}`);
    return a + b;
}

describe("My Application addIt works", () => {
    describe("addIt can add", () => {
        it("addIt can add 1 + 1", () => {
            expect(add(1, 1)).toBe(2);
        });
        test("addIt can add 2 + 2", () => {
            expect(add(2, 2)).toBe(4);
        });
    });
});

test("addIt can add 3 + 3", () => {
    expect(add(3, 3)).toBe(6);
});

it("addIt can add 4 + 4", () => {
    expect(add(4, 4)).toBe(8);
});