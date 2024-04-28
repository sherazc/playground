import {
    isNotBlankString,
    numberNaNToZero,
    numberTo2DigitsString,
    padLeft
} from '../common/Utilities';
import {PrayerTime} from '../types/types';

export const REGX_TIME_24 = /([01]?[0-9]|2[0-3]):[0-5][0-9].*/;

// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
export const REGX_DATE_TIME = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
// export const DATE_TIME_REGX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;

export const REGX_DATE = /\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01]).*/;

export const REGX_HIJRI_STRING = /^([0-9]{4})\/([01]?[0-9])\/([0123]?[0-9])$/;

export const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const MONTH_NAMES_HIJRI = [
    "Muharram",
    "Safar",
    "Rabi' Al-Awwal",
    "Rabi' Al-Thani",
    "Jumada Al-Awwal",
    "Jumada Al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu Al-Qi'dah",
    "Dhu Al-Hijjah"
];


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

export const isoDateToJsDate = (dateString?: string | null): Date | undefined => {
    let date = undefined;
    if (dateString && REGX_DATE.test(dateString)) {
        const year = numberNaNToZero(+dateString.substring(0, 4));
        const month = numberNaNToZero(+dateString.substring(5, 7) - 1);
        const d = numberNaNToZero(+dateString.substring(8, 10));

        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let milliseconds = 0;
        if (dateString.length > 12) {
            hours = numberNaNToZero(+dateString.substring(11, 13));
        }

        if (dateString.length > 15) {
            minutes = numberNaNToZero(+dateString.substring(14, 16));
        }

        if (dateString.length > 18) {
            seconds = numberNaNToZero(+dateString.substring(17, 19));
        }

        if (dateString.length > 22) {
            milliseconds = numberNaNToZero(+dateString.substring(20, 23));
        }

        date = new Date(year, month, d, hours, minutes, seconds, milliseconds);
    }

    return date;
}

export const jsDateToIsoDate = (date?: Date) => getSystemTimezoneDateIsoString(date);


export const getSystemTimezone = (dateString?: string) => {
    let date = isoDateToJsDate(dateString);
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
}


// https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
export const getSystemTimezoneDateIsoString = (date?: Date) => {
    const dt = date ? date : new Date();


    const isoStringWithoutTimezone = dt.getFullYear()
        + '-' + padLeft(dt.getMonth() + 1, 2)
        + '-' + padLeft(dt.getDate(), 2)
        + 'T' + padLeft(dt.getHours(), 2)
        + ':' + padLeft(dt.getMinutes(), 2)
        + ':' + padLeft(dt.getSeconds(), 2)
        + '.' + padLeft(dt.getMilliseconds(), 3);

    return isoStringWithoutTimezone + getSystemTimezone(isoStringWithoutTimezone);
}

// Very useful when writing unit tests. Because its implementation can be mocked.
export const getCurrentSystemDate = () => {
    // Did not notice any difference if I use either one of these:
    // return new Date(getSystemTimezoneDateIsoString());
    return new Date();
}


export const isoDateFixToSystemTimezone = (isoDateString?: (string | null)): (string | undefined) => {
    if (!isoDateString || isoDateString.length < '0000-00-00'.length) {
        return;
    }

    const isoDateStringArray = isoDateString
        .replace(/([+-][0-2]\d:[0-5]\d|Z)$/, "") // remove timezone
        .split(''); // convert to character array

    const timezone = getSystemTimezone(isoDateString);
    const resultArray = ('0000-00-00T00:00:00.000' + timezone).split('');

    for (let i = 0; i < isoDateStringArray.length && i < 23; i++) {
        resultArray[i] = isoDateStringArray[i]
    }
    const result = resultArray.join("");

    if (!REGX_DATE_TIME.test(result)) {
        return;
    } else {
        return result;
    }
}

export const getTodaysDate = (): number => getCurrentSystemDate().getDate();
export const getTodaysMonth = (): number => getCurrentSystemDate().getMonth() + 1;


export const stringH24MinToDate = (date: (Date | undefined), time?: string): (Date | undefined) => {
    if (!date || !time || !REGX_TIME_24.test(time)) {
        return;
    }

    const resultDate = new Date(date.getTime());
    const timeSplit = time.split(':');
    resultDate.setHours(+timeSplit[0]);
    resultDate.setMinutes(+timeSplit[1]);
    resultDate.setSeconds(0);
    resultDate.setMilliseconds(0);
    return resultDate;
}


export class MdDate {
    private _isoDate?: string = "";
    private _jsDate?: Date;
    private _isValid = false;

    // constructor overload variations
    constructor(isoDate?: string | null);
    constructor(date?: Date | null);

    // common constructor
    constructor(dateIsoDate?: string | Date | null) {
        if (dateIsoDate && dateIsoDate != null) {
            if (typeof dateIsoDate === "string") {
                this.isoDate = dateIsoDate;
            } else if (dateIsoDate instanceof Date) {
                this.jsDate = dateIsoDate;
            }
        }
    }


    get isoDate() {
        return this._isoDate ? this._isoDate : "";
    }

    set isoDate(isoDate: string) {
        this._isValid = REGX_DATE_TIME.test(isoDate);
        if (this._isValid) {
            this._isoDate = isoDateFixToSystemTimezone(isoDate);
            this._jsDate = isoDateToJsDate(isoDate);
        } else {
            this._isoDate = undefined;
            this._jsDate = undefined;
        }
    }

    get jsDate() {
        // returning an invalid date if _jsDate is undefined. 
        // TODO try to find if there is a way to return undefined on get
        return this._jsDate ? this._jsDate : new Date("");
    }

    set jsDate(date: Date) {
        if (isValidJsDate(date)) {
            this._jsDate = date;
            this._isoDate = jsDateToIsoDate(date);
            this._isValid = true;
        } else {
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
    static mdDateJsonReviver(key: string, value?: string): (MdDate | any) {
        const keyContainsDate = isNotBlankString(key) && key.toLowerCase().includes("date");

        if (keyContainsDate && value && REGX_DATE_TIME.test(value)) {
            return new MdDate(value);
        } else {
            return value;
        }
    }

    static currentSystemMdDate() {
        return new MdDate(new Date());
    }
}

// TODO: use either parseObjectsIsoDateToMdDate or JSON.parse(serializeObject, MdDate.mdDateJsonReviver)
export const parseObjectsIsoDateToMdDate = (obj?: any) => {
    const isDateKey = (key: string) => {
        return isNotBlankString(key)
            && key.toLowerCase().includes("date");
    }

    const isDateValue = (value: string) => {
        return isNotBlankString(value)
            && REGX_DATE_TIME.test(value);
    }

    for (var k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null)
            parseObjectsIsoDateToMdDate(obj[k]);
        else {
            const dateKey = isDateKey(k);
            const dateValue = isDateValue(obj[k]);
            if (dateKey && dateValue) {
                // Convert to MdDate
                obj[k] = new MdDate(obj[k]);
            }
        }
    }
}


export const promiseParseObjectsIsoDateToMdDate = (promise?: Promise<any>): Promise<any> => {
    if (!promise) {
        return Promise.reject();
    }
    return new Promise((resolve, reject) => {
        promise
            .then((json?: any) => {
                parseObjectsIsoDateToMdDate(json);
                resolve(json);
            }, error => reject(error))
            .catch(error => reject(error));
    });
}

export const dateToDisplayDateShort = (date?: Date | null) => {
    if (!date || isNaN(date.getTime())) {
        return "";
    }
    return `${date.getMonth() + 1}/${date.getDate()}`;
};

export const dateToDisplayDate = (date: Date) => {
    if (!date) {
        return "";
    }
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const dateToDisplayDateLong = (date: Date): string => {
    if (!date) {
        return "";
    }
    return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const hijriStringToDisplayDateLong = (hijriString: string): string => {
    if (!hijriString || hijriString.length < 10 || !REGX_HIJRI_STRING.test(hijriString)) {
        return "";
    }

    const monthNumber = +hijriString.substring(5, 7);
    if (monthNumber > 12) {
        return ""
    }

    const yearString = hijriString.substring(0, 4);
    const dateString = hijriString.substring(8, 10);

    return `${MONTH_NAMES_HIJRI[monthNumber - 1]} ${dateString}, ${yearString}`;
}


export const time24To12 = (time24?: string | null) => {
    if (!time24) {
        return "";
    }

    time24 = time24.trim();

    if (!REGX_TIME_24.test(time24)) {
        // incase of custom string
        return time24;
    }

    const hoursMinutes = time24.split(":");
    const hours24 = Number.parseInt(hoursMinutes[0]);
    let hours12 = hours24 > 12 ? hours24 % 12 : hours24;
    if (hours24 === 0) {
        hours12 = 12;
    } else if (hours24 > 12) {
        hours12 = hours24 % 12;
    } else {
        hours12 = hours24;
    }

    const minutes = Number.parseInt(hoursMinutes[1]);
    const amPm = hours24 > 11 ? "pm" : "am";

    return `${hours12}:${numberTo2DigitsString(minutes)}${amPm}`;
};


export const dateToTime12h = (date?: Date | null) => {
    if (!date || isNaN(date.getTime())) {
        return "";
    }

    const dateIso = getSystemTimezoneDateIsoString(date);
    return time24To12(dateIso.substring(11, 16));
}


export const addYears = (date?: (Date | undefined | null), year?: (number | undefined | null)) => {
    if (!date) {
        return;
    }

    if (!year) {
        return date;
    }


    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCFullYear(date.getUTCFullYear() + year);
    return calculatedDate;
}


export const addDays = (date?: (Date | undefined | null), days?: (number | undefined | null)) => {
    if (!date) {
        return;
    }

    if (!days) {
        return date;
    }


    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCDate(date.getUTCDate() + days);
    return calculatedDate;
}


export const addMinutes = (date?: (Date | undefined | null), minutes?: (number | undefined | null)) => {
    if (!date) {
        return;
    }

    if (!minutes) {
        return date;
    }

    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCMinutes(date.getUTCMinutes() + minutes);
    return calculatedDate;
}


export const addMinutesTo24hTime = (time?: (string | undefined | null), minutes?: (number | undefined | null)): (string | undefined) => {
    if (!time) {
        return;
    }
    time = time.trim();

    if (!REGX_TIME_24.test(time)) {
        return;
    }

    if (!minutes) {
        return time;
    }

    const timeSplit = time.split(':');
    const date = new Date(2020, 0, 1, +timeSplit[0], +timeSplit[1], 0, 0);
    const updatedDate = addMinutes(date, minutes);
    return updatedDate?.toTimeString().substring(0, 5);
}


export const millisecondDurationToMinSecTime = (duration?: (number | null)) => {
    if (duration === null
        || duration === undefined || duration < 0) {
        return "00:00";
    }

    let seconds: (number | string) = Math.floor((duration / 1000) % 60),
        minutes: (number | string) = Math.floor((duration / (1000 * 60)) % 60),
        hours: (number | string) = Math.floor(duration / (1000 * 60 * 60));

    //hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if (hours > 0) {
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}

/**
 * Starts from 1
 * Jan 1 will return 1
 * Dec 31 will return 365 or 366 depending on the leap year
 *
 * @param year
 * @param month
 * @param date
 */
export const dayOfTheYear = (year: number, month: number, date: number): number => {
    const dateWithoutTime = new Date(year, month, date);
    const yearStartDate = new Date(year, month, date);
    yearStartDate.setMonth(0);
    yearStartDate.setDate(0);

    const diffMilliseconds = dateWithoutTime.getTime() - yearStartDate.getTime();

    const oneDayMilliseconds = 1000 * 60 * 60 * 24;

    return Math.floor(diffMilliseconds / oneDayMilliseconds);
}


export const isSameMonthDate = (d1Month?: number, d1Date?: number, d2Month?: number, d2Date?: number): boolean => {
    return d1Month !== undefined && d2Month !== undefined
        && d1Date !== undefined && d2Date !== undefined
        && d1Month === d2Month
        && d1Date === d2Date;
}

// TODO: Find out if this can be deprecated.
// TODO: Move isTimeBetweenAzans() it out of this file
export const isTimeBetweenAzans = (timeMilliseconds?: (number | null), prayerPeriod?: (PrayerTime[] | null)): boolean => {
    if (!timeMilliseconds || !prayerPeriod || prayerPeriod.length != 2
        || !prayerPeriod[0].azan || !prayerPeriod[1].azan) {
        return false;
    }

    return !isNaN(prayerPeriod[0].azan.getTime())
        && !isNaN(prayerPeriod[1].azan.getTime())
        && timeMilliseconds > prayerPeriod[0].azan.getTime()
        && timeMilliseconds < prayerPeriod[1].azan.getTime()
}


export const isValidJsDate = (date?: Date | null): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
}
