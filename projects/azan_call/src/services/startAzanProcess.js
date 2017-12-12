const callSalahTimeRestService = require("./callSalahTimeRestService");

const startAzanProcess = (success, error, getAzanCalledDateTime) => {
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