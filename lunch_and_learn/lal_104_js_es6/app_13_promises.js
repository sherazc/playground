/*
Promises are based on Promises/A+ and now it's part of ES6:
https://promisesaplus.com/

jQuery 3 also supports Promises/A+
https://api.jquery.com/category/deferred-object/
https://api.jquery.com/promise/

Promises are used for Asynchronous Events.

Once the promise is resolved or rejected, it can not change
it's state.


In the example below we are creating are call that will take
some time to run. In 2 seconds it will be successful and
in 1 second it will fail.
*/
let myPromise = new Promise((resolve, reject) => {
    console.log("Promise process started...");
    // We are doing setTimeout to mimic Asynchronous call
    setTimeout(() => {
        // We can pass any type of data to resolve, and
        // reject functions. This data will be passes to
        // the caller of the function.
        resolve("success");
    }, 2000);

    setTimeout(() => {
        reject("fail")
    }, 3000)

});

/*
Caller of the promise will perform separate logic on success
or failure.

.then() takes in 2 function arguments. One for success and
other for failure.
*/
myPromise.then(
    (resolveData) => {
        console.log("Successful Logic:", resolveData)
    },
    (rejectData) => {
        console.log("Fail Logic:", rejectData)
    }
);
