/*
If we have a situation when need to take an action
when multiple promises (maybe multiple Asynchronous tasks
or multiple animation routines) SUCCESSFULLY finish executing.

To handle above use case we use static method
Promises.all(). It takes an array of promises and return another
promise.
*/
let promiseA = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise A success");
    }, 2000);
});

let promiseB = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise B success");
    }, 1000);
});

/*
Below "resolveData" will receive array of all the
success/resolve data.
*/
Promise.all([promiseA, promiseB]).then((resolveData) => {
    console.log(resolveData);
});
