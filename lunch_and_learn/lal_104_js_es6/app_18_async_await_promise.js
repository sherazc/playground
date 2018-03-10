/*
async and await are used to handle Promise.
By using async and await we don't have to use callback methods
*/

let makePromise = (successType) => {
    return new Promise((resolve, reject) => {
        console.log("=============\nPromise Started...");
        setTimeout(() => {
            if (successType) {
                resolve("Promise Successful!");
            } else {
                reject("Promise Failed!");
            }
        }, 2000);
    });
}

let callPromise = async () => {
    // Handling successful/resolve scenario
    let result = await makePromise(true);
    console.log(result);

    // Handling fail/reject scenario
    try {
        result = await makePromise(false);
        // Below console.log() will not be called
        console.log(result);
    } catch (error) {
        // Reject data will be returned in catch
        console.log(error);
    }
}

callPromise();
