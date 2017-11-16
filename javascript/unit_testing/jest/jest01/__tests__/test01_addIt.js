describe("My Application addIt works", () => {
    describe("addIt can add", () => {
        it("addIt can add 1 + 1", () => {
            let addIt = require("../src/addIt");
            expect(addIt(1, 1)).toBe(2);
        });
        test("addIt can add 2 + 2", () => {
            let addIt = require("../src/addIt");
            expect(addIt(2, 2)).toBe(4);
        });
    });
});

test("addIt can add 3 + 3", () => {
    let addIt = require("../src/addIt");
    expect(addIt(3, 3)).toBe(6);
});

it("addIt can add 4 + 4", () => {
    let addIt = require("../src/addIt");
    expect(addIt(4, 4)).toBe(8);
});