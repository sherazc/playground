// Add application code
let add = (a, b) => {
    return a + b;
}

// Unit test code
/*
"describe" groups "it" blocks
Reads like a specification statement
e.g. Below test reads as
    Describe Add Application, it should be able to add 2 + 2
    expect add(2,2) to be 4
*/
describe("Add application", () => {
    it("should be able to add 2 + 2 = 4", () => {
        expect(add(2,2)).toBe(4);
    });
});