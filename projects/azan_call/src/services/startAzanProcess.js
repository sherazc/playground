const callSalahTimeRestService = require("./callSalahTimeRestService");
const Constants = require("./Constants");

const startAzanProcess = (success, error, getAzanCalledDateTime) => {

    (() => {
        console.log("testing");
        callSalahTimeRestService(Constants.SERVICE_URL, )
    })();
    /*
    TODO: 
    Run below every 30 mins
        Fetch data by calling callSalahTimeRestService
        convert salah string to datetime
        validate salahTimeObject
        salahTimeObject to array

        Run below every second
            let azanCalledDateTime = getAzanCalledDateTime()
            call processSalahs.js pass it now, salahArray, azanCalledDateTime
            Call success() and give result of processSalahs() to it
    */
};

const successfullyReterivedData = (salahTimeObject) => {
};

const failedToReterivedData = (error) => {
    console.log("error occured", error)
};

startAzanProcess();