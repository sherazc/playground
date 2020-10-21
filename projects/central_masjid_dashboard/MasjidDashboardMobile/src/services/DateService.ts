import { Constants } from './Constants';
import { numberTo2DigitsString } from './Utilities';

const TIME_24_REGX = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;

export const createExpirationDate = () => new Date(Date.now() + Constants.EXPIRATION_MILLIS);
export const todaysDay = () => (new Date()).getDate();
export const todaysMonth = () => (new Date()).getMonth() + 1;

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

