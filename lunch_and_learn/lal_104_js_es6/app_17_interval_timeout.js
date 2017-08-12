let count = 0;
let mySetInterval = setInterval(() => {
    console.log(`Running interval ${++count}`);
    if (count > 20) {
        console.log("Clearing interval after 20 counts");
        clearInterval(mySetInterval);
    }
}, 200);

let myTimeout = setTimeout(() => {
    console.log("Clearing interval after 2 seconds");
    clearInterval(mySetInterval);
}, 2000);

setTimeout(() => {
    console.log("Clearing timeout after 1 second");
    clearTimeout(myTimeout);
}, 1000);