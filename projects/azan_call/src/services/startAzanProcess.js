const callSalahTimeRestService = require("./callSalahTimeRestService");
const Constants = require("./Constants");
const stringTimesToDate = require("./stringTimesToDate");
const processSalahs = require("./processSalahs");
const DateCreator = require("./date/DateCreator");

// Update UI methods
let successUpdateUi;
let errorUpdateUi;
let getAzanCalledDateTimeUi;

// Update intervals
let fetchSalahTimeInterval;
let updateUiInterval;

const startAzanProcess = (success, error, getAzanCalledDateTime) => {
    // save UI update method reference
    successUpdateUi = success;
    errorUpdateUi = error;
    getAzanCalledDateTimeUi = getAzanCalledDateTime;

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
    Constants.SALAH_NAMES
    let salahsArray = [
        makeSalahObject(Constants.SALAH_NAMES[0], salahTimeObjectWithDates.fajr_athan, salahTimeObjectWithDates.fajr_iqama),
        makeSalahObject(Constants.SALAH_NAMES[1], salahTimeObjectWithDates.thuhr_athan,salahTimeObjectWithDates.thuhr_iqama),
        makeSalahObject(Constants.SALAH_NAMES[2], salahTimeObjectWithDates.asr_athan, salahTimeObjectWithDates.asr_iqama),
        makeSalahObject(Constants.SALAH_NAMES[3], salahTimeObjectWithDates.maghrib_athan, salahTimeObjectWithDates.maghrib_iqama),
        makeSalahObject(Constants.SALAH_NAMES[4], salahTimeObjectWithDates.isha_athan, salahTimeObjectWithDates.isha_iqama)
    ];

    updateUiInterval = setInterval(() => {
        let azanCalledDateTime = getAzanCalledDateTime();
        let uiMessageResult = processSalahs(DateCreator.now(), salahsArray, azanCalledDateTime);
        // TODO: handle if error occurs
        successUpdateUi(uiMessageResult);

    }, Constants.UPDATE_UI_INTERVAL_MILLIS);

};

const failedToReterivedData = (error) => {
    console.log("error occured", error)
};


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
