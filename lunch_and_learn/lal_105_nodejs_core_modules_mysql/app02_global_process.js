console.log("process.env = ", process.env);
console.log("process.argv = ", process.argv);

process.on("exit", function (status) {
    console.log(`Application is about to end: ${status}`);
});

// process.exit("sheraz");
process.exit(0);
