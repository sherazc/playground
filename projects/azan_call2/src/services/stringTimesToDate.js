let DateCreator = require("./date/DateCreator");
const Constants = require("./Constants");

module.exports = (salatTimeObject) => {
    if (!salatTimeObject) {
        return;
    }
    salatTimeObject.fajr_athan = stringToDate(salatTimeObject.fajr_athan);
    salatTimeObject.fajr_iqama = stringToDate(salatTimeObject.fajr_iqama);
    salatTimeObject.thuhr_athan = stringToDate(salatTimeObject.thuhr_athan);
    salatTimeObject.thuhr_iqama = stringToDate(salatTimeObject.thuhr_iqama);
    salatTimeObject.asr_athan = stringToDate(salatTimeObject.asr_athan);
    salatTimeObject.asr_iqama = stringToDate(salatTimeObject.asr_iqama);
    salatTimeObject.maghrib_athan = stringToDate(salatTimeObject.maghrib_athan);
    salatTimeObject.shurooq = stringToDate(salatTimeObject.shurooq);

    if (salatTimeObject.maghrib_athan) {
        let maghrib_iqama = new Date(salatTimeObject.maghrib_athan);
        maghrib_iqama.setMinutes(maghrib_iqama.getUTCMinutes() + Constants.MAGHRIB_IQAMAH_AFTER_AZAN_MINS);
        salatTimeObject.maghrib_iqama = maghrib_iqama;
    } else {
        salatTimeObject.maghrib_iqama = undefined;    
    }
    salatTimeObject.isha_athan = stringToDate(salatTimeObject.isha_athan);
    salatTimeObject.isha_iqama = stringToDate(salatTimeObject.isha_iqama);
    return salatTimeObject;
};

let stringToDate = (dateString) => {
    if (!dateString || dateString.length < 19) {
        return;
    }
    let now = DateCreator.now();
    let year = now.getUTCFullYear();
    let month = oneToTwoDigitsString(now.getUTCMonth() + 1);
    let date = oneToTwoDigitsString(now.getUTCDate());
    return DateCreator.fromISO(`${year}-${month}-${date}T${dateString.substr(11, 19)}`);
};

let oneToTwoDigitsString = (num) => {
    let numString = "" + num;
    if (numString.length < 2) {
        return "0" + num;
    } else {
        return numString;
    }
};