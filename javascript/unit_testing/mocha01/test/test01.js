let assert = require("assert");

// Add application code
let add = (a, b) => {
    return a + b;
}

describe("Add Application", () => {
    it("should be able to add 2 + 2 = 4", () => {
        assert.equal(add(2,2), 4);
    });
});