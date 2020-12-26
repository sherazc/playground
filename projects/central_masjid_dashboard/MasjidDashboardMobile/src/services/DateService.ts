import { Constants } from './Constants';
import { numberTo2DigitsString, subStringToNumber } from './Utilities';
import { PrayerTime } from '../types/types';

export const TIME_24_REGX = /([01]?[0-9]|2[0-3]):[0-5][0-9].*/;
const DATE_TIME_REGX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

export const createExpirationDate = () => new Date(nowUtcDate().getTime() + Constants.EXPIRATION_MILLIS);
export const todaysDay = () => (nowUtcDate()).getDate();
export const todaysMonth = () => (nowUtcDate()).getMonth() + 1;

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


export const nowUtcDate = (): Date => {
    let systemNow = new Date();
    let utcMillis = Date.UTC(
        systemNow.getFullYear(),
        systemNow.getMonth(),
        systemNow.getDate(),
        systemNow.getHours(),
        systemNow.getMinutes(),
        systemNow.getSeconds(),
        systemNow.getMilliseconds());
    return new Date(utcMillis);
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
    return `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
};

export const time24To12 = (time24?: string) => {
    if (!time24 || !TIME_24_REGX.test(time24)) {
        return "";
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
    calculatedDate.setMinutes(date.getUTCMinutes() + minutes);
    return calculatedDate;
}

export const addMinutesToTime = (time: string, minutes: number):(string | undefined) => {
    if (!TIME_24_REGX.test(time)) {
        return;
    }

    const timeSplit = time.split(':');
    const date = createZeroTimeDate(new Date());
    date.setHours(+timeSplit[0]);
    date.setMinutes(+timeSplit[1]);
    const updatedDate = addMinutes(date, minutes);
    return updatedDate?.toISOString().substring(14, 19);

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


export const localToUtcDate = (date: Date): Date => {
    const result = new Date();
    result.setUTCFullYear(date.getFullYear());
    result.setUTCMonth(date.getMonth());
    result.setUTCDate(date.getUTCDate());
    result.setUTCHours(date.getHours());
    result.setUTCMinutes(date.getMinutes());
    result.setUTCSeconds(date.getSeconds());
    result.setUTCMilliseconds(date.getMilliseconds());

    return result;
}


const createZeroTimeDate = (date:Date) => {
    const d = new Date(date.getTime());
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return date;
}