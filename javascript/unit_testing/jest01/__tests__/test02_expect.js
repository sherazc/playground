let add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 3000);
    });
}

describe("Calculator", function() {
    it("Should add 2 + 2", done => {
        add(2, 2).then(result => {
            expect(result).toEqual(4)
            done();
        });
    });
});