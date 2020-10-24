import { Constants } from './Constants';
import { numberTo2DigitsString, subStringToNumber } from './Utilities';

const TIME_24_REGX = /([01]?[0-9]|2[0-3]):[0-5][0-9].*/;

export const createExpirationDate = () => new Date(nowUtcDate().getTime() + Constants.EXPIRATION_MILLIS);
export const todaysDay = () => (nowUtcDate()).getDate();
export const todaysMonth = () => (nowUtcDate()).getMonth() + 1;

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

export const dateFromISO = (isoDateString: string): (Date | undefined) => {
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

export const stringH24MinToDate = (date: Date, time: string): (Date | undefined) => {
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

export const time24To12 = (time24: string) => {
    if (!time24 || !TIME_24_REGX.test(time24)) {
        return "";
    }

    const hoursMinutes = time24.split(":");
    const hours24 = Number.parseInt(hoursMinutes[0]);
    const hours12 = hours24 > 12 ? hours24 % 12 : hours24;
    const minutes = Number.parseInt(hoursMinutes[1]);
    const amPm = hours24 > 12 ? "pm" : "am";

    return `${numberTo2DigitsString(hours12)}:${numberTo2DigitsString(minutes)}${amPm}`;
};
