/*
If we are running multiple promises using Promise.all().then()
and a promise amoung them fails then all other promises that are
still executing will be IGNORED (but still finish their execution) and reject
executor of Promise.all().then() will run and receive that
failure data of the one that failed.

In the example below:
promiseA = takes 5 seconds to fail
promiseB = takes 1 second to succeed
promiseC = takes 1.5 seconds to fail

*/
let promiseA = new Promise((resolve, reject) => {
    console.log("Promise A started", new Date());
    setTimeout(() => {
        reject("Promise A fail");
        console.log("Promise A finished", new Date());
    }, 5000);
});

let promiseB = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise B success");
    }, 1000);
});

let promiseC = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise C fail");
    }, 1500);
});

Promise.all([promiseA, promiseB, promiseC]).then((resolveData) => {
    console.log("All Passed: ", resolveData);
}, (rejectData) => {
    console.log("Something went wrong: ", rejectData);
});