import { Constants } from './Constants';
import { numberTo2DigitsString, subStringToNumber } from './Utilities';
import { PrayerTime } from '../types/types';

export const TIME_24_REGX = /([01]?[0-9]|2[0-3]):[0-5][0-9].*/;

// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
export const DATE_TIME_REGX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
// export const DATE_TIME_REGX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;

// @Deprecated
export const createExpirationDate = () => millisToUtcDate(nowUtcDate().getTime() + Constants.EXPIRATION_MILLIS);

export const createExpirationDate2 = (): string => {
    const nowDateString = getSystemTimezoneDateIsoString();
    const date = new Date(nowDateString);
    date.setTime(date.getTime() + Constants.EXPIRATION_MILLIS);
    return getSystemTimezoneDateIsoString(date);
};


export const todaysDay = (): number => (nowUtcDate()).getDate();
export const todaysMonth = (): number => (nowUtcDate()).getMonth() + 1;

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

const millisToUtcDate = (millis: number): Date => {
    return dateToUtcDate(dateToUtcDate(new Date(millis)))
}

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

export const nowUtcDate = (): Date => {
    return dateToUtcDate(new Date());
};

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

export const stringH24MinToDate = (date: (Date | undefined), time?: string): (Date | undefined) => {
    if (!date || !time || !TIME_24_REGX.test(time)) {
        return;
    }

    const isoDateString = `${date.toISOString().substring(0, 10)}T${time.substring(0, 5)}:00.000Z`;
    return dateFromISO(isoDateString);
}

export const dateToDisplayDateShort = (date: Date) => {
    if (!date) {
        return "";
    }
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) { // if not valid date
        return date;
    }
    return `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
};

export const time24To12 = (time24?: string) => {
    if (!time24) {
        return "";
    }

    if (!TIME_24_REGX.test(time24)) {
        return time24;
    }

    const hoursMinutes = time24.split(":");
    const hours24 = Number.parseInt(hoursMinutes[0]);
    const hours12 = hours24 > 12 ? hours24 % 12 : hours24;
    const minutes = Number.parseInt(hoursMinutes[1]);
    const amPm = hours24 > 11 ? "pm" : "am";

    return `${hours12}:${numberTo2DigitsString(minutes)}${amPm}`;
};

export const dateToTime12h = (d: Date | undefined) => {
    if (!d) {
        return "";
    }
    const dateIso = d.toISOString();
    return time24To12(dateIso.substring(11, 16));
}


export const addDays = (date: (Date | undefined), days?: number) => {
    if (!date || !days) {
        return;
    }
    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCDate(date.getUTCDate() + days);
    return calculatedDate;
}

export const addMinutes = (date: (Date | undefined), minutes?: number) => {
    if (!date || !minutes) {
        return;
    }
    const calculatedDate = new Date(date.getTime());
    calculatedDate.setUTCMinutes(date.getUTCMinutes() + minutes);
    return calculatedDate;
}

export const addMinutesToTime = (time: string, minutes: number): (string | undefined) => {
    if (!TIME_24_REGX.test(time)) {
        return;
    }

    const timeSplit = time.split(':');
    const date = new Date(2020, 0, 1, +timeSplit[0], +timeSplit[1], 0, 0);
    const updatedDate = addMinutes(date, minutes);
    return updatedDate?.toTimeString().substring(0, 5);
}

export const millisDurationToTimeString = (duration?: number) => {
    if (duration === null
        || duration === undefined || duration < 0) {
        return;
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

export const isTimeBetweenAzans = (timeMillis: (number | undefined), prayerPeriod?: PrayerTime[]) => {
    if (!timeMillis || !prayerPeriod || prayerPeriod.length != 2
        || !prayerPeriod[0].azan || !prayerPeriod[1].azan) {
        return false;
    }

    return timeMillis > prayerPeriod[0].azan.getTime()
        && timeMillis < prayerPeriod[1].azan.getTime()
}

export const toISODateString = (date?: Date) => {
    if (!date) {
        return;
    }
    const isoString = date.toISOString();
    return isoString.substring(0, 10);
};


export const dayOfTheYear = (year: number, month: number, date: number): number => {

    const dateWithoutTime = createZeroTimeDate(new Date(year, month, date));
    const yearStartDate = createZeroTimeDate(new Date(year, month, date));
    yearStartDate.setMonth(0);
    yearStartDate.setDate(0);

    const diffMillis = dateWithoutTime.getTime() - yearStartDate.getTime();

    const oneDayMillis = 1000 * 60 * 60 * 24;

    return Math.floor(diffMillis / oneDayMillis);
}

export const utcToLocalDate = (date: Date): Date => {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}



const createZeroTimeDate = (date: Date) => {
    const d = new Date(date.getTime());
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return date;
}


export const isSameMonthDate = (d1Month?: number, d1Date?: number, d2Month?: number, d2Date?: number): boolean => {
    return d1Month !== undefined && d2Month !== undefined
        && d1Date !== undefined && d2Date !== undefined
        && d1Month === d2Month
        && d1Date === d2Date;
}



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

const padLeft = (input: (number | string), length: number, padString: string = '0') => {
    if (length < 2) {
        return input;
    }
    return `${padString.repeat(length - 1)}${input}`.slice(-length);
}

export const getSystemTimezone = () => {
    const date = new Date();
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

    return dt.getFullYear()
        + '-' + padLeft(dt.getMonth() + 1, 2)
        + '-' + padLeft(dt.getDate(), 2)
        + 'T' + padLeft(dt.getHours(), 2)
        + ':' + padLeft(dt.getMinutes(), 2)
        + ':' + padLeft(dt.getSeconds(), 2)
        + '.' + padLeft(dt.getMilliseconds(), 3)
        + getSystemTimezone();
}

export const getCurrentSystemDate = () => {
    return new Date(getSystemTimezoneDateIsoString());
}

export const isoDateFixToSystemTimezone = (isoDateString?: (string| null)): (string | undefined) => {
    if (!isoDateString || isoDateString.length < '0000-00-00'.length) {
        return;
    }

    const isoDateStringArray = isoDateString
        .replace(/([+-][0-2]\d:[0-5]\d|Z)$/, "") // remove timezone
        .split(''); // convert to character array
    const resultArray = ('0000-00-00T00:00:00.000' + getSystemTimezone()).split('');

    for (let i = 0; i < isoDateStringArray.length && i < 23; i++) {
        resultArray[i] = isoDateStringArray[i]
    }
    const result = resultArray.join("");

    if (!DATE_TIME_REGX.test(result)) {
        return;
    } else {
        return result;
    }
}