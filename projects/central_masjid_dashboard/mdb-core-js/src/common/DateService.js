"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidJsDate = exports.isTimeBetweenAzans = exports.isSameMonthDate = exports.dayOfTheYear = exports.millisecondDurationToMinSecTime = exports.addMinutesTo24hTime = exports.addMinutes = exports.addDays = exports.addYears = exports.dateToTime12h = exports.time24To12 = exports.dateToDisplayDateShort = exports.parseObjectsIsoDateToMdDate = exports.MdDate = exports.stringH24MinToDate = exports.getTodaysMonth = exports.getTodaysDate = exports.isoDateFixToSystemTimezone = exports.getCurrentSystemDate = exports.getSystemTimezoneDateIsoString = exports.getSystemTimezone = exports.jsDateToIsoDate = exports.isoDateToJsDate = exports.DATE_REGX = exports.DATE_TIME_REGX = exports.TIME_24_REGX = void 0;
const Utilities_1 = require("./Utilities");
exports.TIME_24_REGX = /([01]?[0-9]|2[0-3]):[0-5][0-9].*/;
// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
exports.DATE_TIME_REGX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
// export const DATE_TIME_REGX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
exports.DATE_REGX = /\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01]).*/;
// Deprecated : use iso string dates in objects. Dont think its needed
// use isoDateFixToSystemTimezone instead
/*
export const fixObjectDates = (obj: any) => {
    for (var i in obj) {
        if (typeof obj[i] === 'object') {
            fixObjectDates(obj[i]);
        } else {
            if (DATE_TIME_REGX.test(obj[i])) {
                obj[i] = new Date(obj[i]);
            }
        }
    }
};
*/
// Deprecated - no utc methods
/*
const dateToUtcDate = (date: Date): Date => {
    let utcDateMilliseconds = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds());

    return new Date(utcDateMilliseconds);
}
*/
// Deprecated - no utc methods
/*
export const nowUtcDate = (): Date => {
    return dateToUtcDate(new Date());
};
*/
// Deprecated
/*
export const dateFromISO = (isoDateString?: string): (Date | undefined) => {
    if (!isoDateString || isoDateString.length < 4) {
        return;
    }

    let year = subStringToNumber(isoDateString, 0, 4);
    let month = subStringToNumber(isoDateString, 5, 7);
    let date = subStringToNumber(isoDateString, 8, 10);
    let hours = subStringToNumber(isoDateString, 11, 13);
    let minutes = subStringToNumber(isoDateString, 14, 16);
    let seconds = subStringToNumber(isoDateString, 17, 19);
    let milliseconds = subStringToNumber(isoDateString, 20, 23);

    if (
        year > 1899 && year < 3000
        && month > 0 && month < 13
        && date > 0 && date < 32
        && hours > -1 && hours < 24
        && minutes > -1 && minutes < 60
        && seconds > -1 && seconds < 60
    ) {
        return new Date(Date.UTC(year, --month, date, hours, minutes, seconds, milliseconds));
    }
};
*/
// Deprecated
// export const toISODateString = (date?: Date) => {
//     if (!date) {
//         return;
//     }
//     const isoString = date.toISOString();
//     return isoString.substring(0, 10);
// };
// Deprecated
// export const utcToLocalDate = (date: Date): Date => {
//     return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
//         date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
// }
/**
 * #########################
 *  New Date API
 * #########################
 *
 * ========================
 * Rules for creating dates
 * ========================
 *
 * --
 * To get current Date:
 * const date = new Date();
 * const currentSystemDate = getCurrentSystemDate();
 *
 * --
 * To get current date ISO String don't use
 * new Date().toISOString()
 *
 * To get current date ISO String:
 * const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString();
 *
 *
 * ========================
 * Date in types
 * ========================
 *
 * --
 * Prefer ISO String format instead of Date type
 * const systemTimezoneDateIsoString = getSystemTimezoneDateIsoString(date)
 *
 * In rare performance reasons use Date.time()/Epoch Milliseconds
 * const timeMilliseconds = getCurrentSystemDate().time();
 *
 * --
 *
 * ========================
 * Timezone
 * ========================
 *
 * Fix timezone of ISO String format when reveived date from
 * API or when in doubt
 *
 * const isoDate = isoDateFixToSystemTimezone("2022-04-01T12:12:12.123+12:00");
 *
 * --
 * In all Types use SystemTimezoneIsoString instead of using Date type
 *
 * --
 *
 */
const padLeft = (input, length, padString = '0') => {
    if (length < 2) {
        return input;
    }
    return `${padString.repeat(length - 1)}${input}`.slice(-length);
};
const isoDateToJsDate = (dateString) => {
    let date = undefined;
    if (dateString && exports.DATE_REGX.test(dateString)) {
        const year = (0, Utilities_1.numberNaNToZero)(+dateString.substring(0, 4));
        const month = (0, Utilities_1.numberNaNToZero)(+dateString.substring(5, 7) - 1);
        const d = (0, Utilities_1.numberNaNToZero)(+dateString.substring(8, 10));
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let milliseconds = 0;
        if (dateString.length > 12) {
            hours = (0, Utilities_1.numberNaNToZero)(+dateString.substring(11, 13));
        }
        if (dateString.length > 15) {
            minutes = (0, Utilities_1.numberNaNToZero)(+dateString.substring(14, 16));
        }
        if (dateString.length > 18) {
            seconds = (0, Utilities_1.numberNaNToZero)(+dateString.substring(17, 19));
        }
        if (dateString.length > 22) {
            milliseconds = (0, Utilities_1.numberNaNToZero)(+dateString.substring(20, 23));
        }
        date = new Date(year, month, d, hours, minutes, seconds, milliseconds);
    }
    return date;
};
exports.isoDateToJsDate = isoDateToJsDate;
const jsDateToIsoDate = (date) => (0, exports.getSystemTimezoneDateIsoString)(date);
exports.jsDateToIsoDate = jsDateToIsoDate;
const getSystemTimezone = (dateString) => {
    let date = (0, exports.isoDateToJsDate)(dateString);
    if (!date) {
        date = new Date();
    }
    // 2am because DST applies at 2am
    if (date.getHours() < 2) {
        date.setHours(2);
    }
    const timezoneOffset = -date.getTimezoneOffset();
    const plusMinus = timezoneOffset >= 0 ? '+' : '-';
    return plusMinus
        + padLeft(Math.floor(Math.abs(timezoneOffset) / 60), 2)
        + ':'
        + padLeft(Math.abs(timezoneOffset) % 60, 2);
};
exports.getSystemTimezone = getSystemTimezone;
// https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
const getSystemTimezoneDateIsoString = (date) => {
    const dt = date ? date : new Date();
    const isoStringWithoutTimezone = dt.getFullYear()
        + '-' + padLeft(dt.getMonth() + 1, 2)
        + '-' + padLeft(dt.getDate(), 2)
        + 'T' + padLeft(dt.getHours(), 2)
        + ':' + padLeft(dt.getMinutes(), 2)
        + ':' + padLeft(dt.getSeconds(), 2)
        + '.' + padLeft(dt.getMilliseconds(), 3);
    return isoStringWithoutTimezone + (0, exports.getSystemTimezone)(isoStringWithoutTimezone);
};
exports.getSystemTimezoneDateIsoString = getSystemTimezoneDateIsoString;
// Very useful when writing unit tests. Because its implementation can be mocked.
const getCurrentSystemDate = () => {
    // Did not notice any difference if I use either one of these:
    // return new Date(getSystemTimezoneDateIsoString());
    return new Date();
};
exports.getCurrentSystemDate = getCurrentSystemDate;
const isoDateFixToSystemTimezone = (isoDateString) => {
    if (!isoDateString || isoDateString.length < '0000-00-00'.length) {
        return;
    }
    const isoDateStringArray = isoDateString
        .replace(/([+-][0-2]\d:[0-5]\d|Z)$/, "") // remove timezone
        .split(''); // convert to character array
    const timezone = (0, exports.getSystemTimezone)(isoDateString);
    const resultArray = ('0000-00-00T00:00:00.000' + timezone).split('');
    for (let i = 0; i < isoDateStringArray.length && i < 23; i++) {
        resultArray[i] = isoDateStringArray[i];
    }
    const result = resultArray.join("");
    if (!exports.DATE_TIME_REGX.test(result)) {
        return;
    }
    else {
        return result;
    }
};
exports.isoDateFixToSystemTimezone = isoDateFixToSystemTimezone;
const getTodaysDate = () => (0, exports.getCurrentSystemDate)().getDate();
exports.getTodaysDate = getTodaysDate;
const getTodaysMonth = () => (0, exports.getCurrentSystemDate)().getMonth() + 1;
exports.getTodaysMonth = getTodaysMonth;
const stringH24MinToDate = (date, time) => {
    if (!date || !time || !exports.TIME_24_REGX.test(time)) {
        return;
    }
    const resultDate = new Date(date.getTime());
    const timeSplit = time.split(':');
    resultDate.setHours(+timeSplit[0]);
    resultDate.setMinutes(+timeSplit[1]);
    resultDate.setSeconds(0);
    resultDate.setMilliseconds(0);
    return resultDate;
};
exports.stringH24MinToDate = stringH24MinToDate;
class MdDate {
    // common constructor
    constructor(dateIsoDate) {
        this._isoDate = "";
        this._isValid = false;
        if (dateIsoDate && dateIsoDate != null) {
            if (typeof dateIsoDate === "string") {
                this.isoDate = dateIsoDate;
            }
            else if (dateIsoDate instanceof Date) {
                this.jsDate = dateIsoDate;
            }
        }
    }
    get isoDate() {
        return this._isoDate ? this._isoDate : "";
    }
    set isoDate(isoDate) {
        this._isValid = exports.DATE_TIME_REGX.test(isoDate);
        if (this._isValid) {
            this._isoDate = (0, exports.isoDateFixToSystemTimezone)(isoDate);
            this._jsDate = (0, exports.isoDateToJsDate)(isoDate);
        }
        else {
            this._isoDate = undefined;
            this._jsDate = undefined;
        }
    }
    get jsDate() {
        // returning an invalid date if _jsDate is undefined. 
        // TODO try to find if there is a way to return undefined on get
        return this._jsDate ? this._jsDate : new Date("");
    }
    set jsDate(date) {
        if ((0, exports.isValidJsDate)(date)) {
            this._jsDate = date;
            this._isoDate = (0, exports.jsDateToIsoDate)(date);
            this._isValid = true;
        }
        else {
            this._isoDate = undefined;
            this._jsDate = undefined;
            this._isValid = false;
        }
    }
    get isValid() {
        return this._isValid;
    }
    toString() {
        return this._isoDate;
    }
    // https://javascript.info/json#custom-tojson
    toJSON() {
        return this.toString();
    }
    // https://javascript.info/json#using-reviver
    static mdDateJsonReviver(key, value) {
        const keyContainsDate = (0, Utilities_1.isNotBlankString)(key) && key.toLowerCase().includes("date");
        if (keyContainsDate && value && exports.DATE_TIME_REGX.test(value)) {
            return new MdDate(value);
        }
        else {
            return value;
        }
    }
    static currentSystemMdDate() {
        return new MdDate(new Date());
    }
}
exports.MdDate = MdDate;
// TODO: use either parseObjectsIsoDateToMdDate or JSON.parse(serializeObject, MdDate.mdDateJsonReviver)
const parseObjectsIsoDateToMdDate = (obj) => {
    const isDateKey = (key) => {
        return (0, Utilities_1.isNotBlankString)(key)
            && key.toLowerCase().includes("date");
    };
    const isDateValue = (value) => {
        return (0, Utilities_1.isNotBlankString)(value)
            && exports.DATE_TIME_REGX.test(value);
    };
    for (var k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null)
            (0, exports.parseObjectsIsoDateToMdDate)(obj[k]);
        else {
            const dateKey = isDateKey(k);
            const dateValue = isDateValue(obj[k]);
            if (dateKey && dateValue) {
                // Convert to MdDate
                obj[k] = new MdDate(obj[k]);
            }
        }
    }
};
exports.parseObjectsIsoDateToMdDate = parseObjectsIsoDateToMdDate;
const dateToDisplayDateShort = (date) => {
    if (!date || isNaN(date.getTime())) {
        return "";
    }
    return `${date.getMonth() + 1}/${date.getDate()}`;
};
exports.dateToDisplayDateShort = dateToDisplayDateShort;
const time24To12 = (time24) => {
    if (!time24) {
        return "";
    }
    time24 = time24.trim();
    if (!exports.TIME_24_REGX.test(time24)) {
        // incase of custom string
        return time24;
    }
    const hoursMinutes = time24.split(":");
    const hours24 = Number.parseInt(hoursMinutes[0]);
    let hours12 = hours24 > 12 ? hours24 % 12 : hours24;
    if (hours24 === 0) {
        hours12 = 12;
    }
    else if (hours24 > 12) {
        hours12 = hours24 % 12;
    }
    else {
        hours12 = hours24;
    }
    const minutes = Number.parseInt(hoursMinutes[1]);
    const amPm = hours24 > 11 ? "pm" : "am";
    return `${hours12}:${(0, Utilities_1.numberTo2DigitsString)(minutes)}${amPm}`;
};
exports.time24To12 = time24To12;
const dateToTime12h = (date) => {
    if (!date || isNaN(date.getTime())) {
        return "";
    }
    const dateIso = (0, exports.getSystemTimezoneDateIsoString)(date);
    return (0, exports.time24To12)(dateIso.substring(11, 16));
};
exports.dateToTime12h = dateToTime12h;
const addYears = (date, year) => {
    if (!date) {
        return;
    }
    if (!year) {
        return date;
    }
    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCFullYear(date.getUTCFullYear() + year);
    return calculatedDate;
};
exports.addYears = addYears;
const addDays = (date, days) => {
    if (!date) {
        return;
    }
    if (!days) {
        return date;
    }
    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCDate(date.getUTCDate() + days);
    return calculatedDate;
};
exports.addDays = addDays;
const addMinutes = (date, minutes) => {
    if (!date) {
        return;
    }
    if (!minutes) {
        return date;
    }
    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCMinutes(date.getUTCMinutes() + minutes);
    return calculatedDate;
};
exports.addMinutes = addMinutes;
const addMinutesTo24hTime = (time, minutes) => {
    if (!time) {
        return;
    }
    time = time.trim();
    if (!exports.TIME_24_REGX.test(time)) {
        return;
    }
    if (!minutes) {
        return time;
    }
    const timeSplit = time.split(':');
    const date = new Date(2020, 0, 1, +timeSplit[0], +timeSplit[1], 0, 0);
    const updatedDate = (0, exports.addMinutes)(date, minutes);
    return updatedDate === null || updatedDate === void 0 ? void 0 : updatedDate.toTimeString().substring(0, 5);
};
exports.addMinutesTo24hTime = addMinutesTo24hTime;
const millisecondDurationToMinSecTime = (duration) => {
    if (duration === null
        || duration === undefined || duration < 0) {
        return "00:00";
    }
    let seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor(duration / (1000 * 60 * 60));
    //hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if (hours > 0) {
        return hours + ":" + minutes + ":" + seconds;
    }
    else {
        return minutes + ":" + seconds;
    }
};
exports.millisecondDurationToMinSecTime = millisecondDurationToMinSecTime;
/**
 * Starts from 1
 * Jan 1 will return 1
 * Dec 31 will return 365 or 366 depending on the leap year
 *
 * @param year
 * @param month
 * @param date
 */
const dayOfTheYear = (year, month, date) => {
    const dateWithoutTime = new Date(year, month, date);
    const yearStartDate = new Date(year, month, date);
    yearStartDate.setMonth(0);
    yearStartDate.setDate(0);
    const diffMilliseconds = dateWithoutTime.getTime() - yearStartDate.getTime();
    const oneDayMilliseconds = 1000 * 60 * 60 * 24;
    return Math.floor(diffMilliseconds / oneDayMilliseconds);
};
exports.dayOfTheYear = dayOfTheYear;
const isSameMonthDate = (d1Month, d1Date, d2Month, d2Date) => {
    return d1Month !== undefined && d2Month !== undefined
        && d1Date !== undefined && d2Date !== undefined
        && d1Month === d2Month
        && d1Date === d2Date;
};
exports.isSameMonthDate = isSameMonthDate;
// TODO: Find out if this can be deprecated.
// TODO: Move isTimeBetweenAzans() it out of this file
const isTimeBetweenAzans = (timeMilliseconds, prayerPeriod) => {
    if (!timeMilliseconds || !prayerPeriod || prayerPeriod.length != 2
        || !prayerPeriod[0].azan || !prayerPeriod[1].azan) {
        return false;
    }
    return !isNaN(prayerPeriod[0].azan.getTime())
        && !isNaN(prayerPeriod[1].azan.getTime())
        && timeMilliseconds > prayerPeriod[0].azan.getTime()
        && timeMilliseconds < prayerPeriod[1].azan.getTime();
};
exports.isTimeBetweenAzans = isTimeBetweenAzans;
const isValidJsDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};
exports.isValidJsDate = isValidJsDate;
