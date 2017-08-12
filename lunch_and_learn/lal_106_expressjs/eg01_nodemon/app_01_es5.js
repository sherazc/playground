var os = require("os");

function printSystemInfo() {
    console.log("CPU = " + os.cpus()[0].model);
    console.log("Memory = " + os.totalmem() / 1024 / 1024 / 1024 + " gb");
    console.log("Uptime = " + Math.floor(os.uptime() / 60) + " mins");
    console.log("Home Dir = " + os.homedir());
}

printSystemInfo();