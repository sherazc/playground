let assert = require("assert");

class MyPromiseCalculator {
    add(a, b) {
        return new Promise((resolve, reject) => {
            console.log("In promise");
            setTimeout(() => {
                resolve(a + b);
            }, 3000);
        });
    }
}

/*
We can't use arrow function because of "lexical scope 
arrow function issue" and we have to call this.timeout(4000)
because async/promise takes more than default 2000ms default
timeout.
*/
describe("Calculator", function() {
    // https://mochajs.org/#timeouts
    this.timeout(4000);
    it("Should add 2 + 2", (done) => {
        let calculator = new MyPromiseCalculator();
        calculator.add(2, 2).then((result) => {
            console.log(result);
            assert.equal(result, 4);
            done();
        });
    });
});
