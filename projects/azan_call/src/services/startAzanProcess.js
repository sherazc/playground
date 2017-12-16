const callSalahTimeRestService = require("./callSalahTimeRestService");
const Constants = require("./Constants");
const stringTimesToDate = require("./stringTimesToDate");
const processSalahs = require("./processSalahs");
const DateCreator = require("./date/DateCreator");
const makeSalahObject = require("./commonUtils").makeSalahObject;

// Update UI methods
let updateAzanMessageInUi;
let getAzanCalledDateTimeUi;

// Update intervals
let fetchSalahTimeInterval;
let updateUiInterval;

const startAzanProcess = (updateAzanMessage, getAzanCalledDateTime) => {
    // save UI update method reference
    updateAzanMessageInUi = updateAzanMessage;
    getAzanCalledDateTimeUi = getAzanCalledDateTime;

    callSalahTimeRestService(Constants.SERVICE_URL, successfullyReterivedData, failedToReterivedData);

    fetchSalahTimeInterval = setInterval(() => {
        if (updateUiInterval) {
            clearInterval(updateUiInterval);
        }
        // TODO: handle if error occurs
        callSalahTimeRestService(Constants.SERVICE_URL, successfullyReterivedData, failedToReterivedData);
    }, Constants.FETCH_SALAH_TIME_INTERVAL_MILLIS);
};

const successfullyReterivedData = (salahTimeObject) => {
    let salahTimeObjectWithDates = stringTimesToDate(salahTimeObject);
    if (!validateSalahTime(salahTimeObjectWithDates)) {
        console.error("Salah time validation failed. salahTimeObjectWithDates=", salahTimeObjectWithDates);
        return;
    }

    let salahsArray = [
        makeSalahObject(Constants.SALAH_NAMES[0], salahTimeObjectWithDates.fajr_athan, salahTimeObjectWithDates.fajr_iqama),
        makeSalahObject(Constants.SALAH_NAMES[1], salahTimeObjectWithDates.thuhr_athan,salahTimeObjectWithDates.thuhr_iqama),
        makeSalahObject(Constants.SALAH_NAMES[2], salahTimeObjectWithDates.asr_athan, salahTimeObjectWithDates.asr_iqama),
        makeSalahObject(Constants.SALAH_NAMES[3], salahTimeObjectWithDates.maghrib_athan, salahTimeObjectWithDates.maghrib_iqama),
        makeSalahObject(Constants.SALAH_NAMES[4], salahTimeObjectWithDates.isha_athan, salahTimeObjectWithDates.isha_iqama)
    ];

    updateUiInterval = setInterval(() => {
        let azanCalledDateTime = getAzanCalledDateTimeUi();
        let now = DateCreator.now();
        let uiMessageResult = processSalahs(now, salahsArray, azanCalledDateTime);
        // TODO: handle if error occurs
        updateAzanMessageInUi(uiMessageResult);

    }, Constants.UPDATE_UI_INTERVAL_MILLIS);

};

const failedToReterivedData = (error) => {
    console.log("error occured", error)
};

const validateSalahTime = (todaySalatTime) => {
    let allDatesAvailable = todaySalatTime.fajr_athan
        && todaySalatTime.fajr_iqama
        && todaySalatTime.thuhr_athan
        && todaySalatTime.thuhr_iqama
        && todaySalatTime.asr_athan
        && todaySalatTime.asr_iqama
        && todaySalatTime.maghrib_athan
        && todaySalatTime.maghrib_iqama
        && todaySalatTime.isha_athan
        && todaySalatTime.isha_iqama;
    
        // TODO: test ranges and instance of Date
        // TODO: test if all todaySalatTime are today's salah and iqmah time
        // maybe do it when fetching time from service and test if it is today's month and date

    return allDatesAvailable;
}

module.exports = startAzanProcess;

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
