let assert = require("assert");

/*
Let's say "add()" is a async method and
on completion it calls postAdd() method 
with the result.
*/
let add = (a, b, postAdd) => {
    let result = a + b;
    postAdd(result);
}

/*
To test async method, it() can take in done() method.
done() with no argument is a pass
done() with argument is a fail
*/
describe("Add Application", () => {
    it("should be able to add 2 + 2 = 4", (done) => {
        add(2, 2, (result) => {
            if(result === 4) {
                done();
            } else {
                done("Add failed");
            }
        });
    });
});
