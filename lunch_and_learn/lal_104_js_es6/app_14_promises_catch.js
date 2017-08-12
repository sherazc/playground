'use strict';
let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("success");
    }, 2000);

    setTimeout(() => {
        reject("fail")
    }, 1000)

});

/*
Another method to handle reject/failure is to handle
it in catch function
*/
myPromise.then(
    (resolveData) => {
        console.log("Successful Logic:", resolveData)
    }
).catch((rejectData) => {
    console.log("Fail Logic:", rejectData)
});
