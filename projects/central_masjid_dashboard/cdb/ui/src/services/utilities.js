export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

/**
 * Returns react router path parameter value
 */
export const getReactRouterPathParamFromUrl = (props, paramName) => {
    if (props && props.match && props.match.params && props.match.params[paramName]) {
        return props.match.params[paramName];
    }
};

export const collectErrorMessageFromResponseData = (responseData, defaultMessage) => {

    let errorMessage = "";
    if (responseData && responseData.message) {
        errorMessage = responseData.message;
    }
    if (responseData && responseData.fieldErrors) {

        for (const key of Object.keys(responseData.fieldErrors)) {
            errorMessage += responseData.fieldErrors[key];
        }
    }

    if (!errorMessage && defaultMessage) {
        errorMessage = defaultMessage;
    }

    return errorMessage
};

export const addUnit = (num) => {
    return num + "vw";
};

export const dateToDisplayDateLong = (date) => {
    if (!date) {
        return;
    }
    const d = date instanceof Date ? date : new Date(date);
    return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};


export const dateToDisplayDate = (date) => {
    if (!date) {
        return;
    }
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

export const dateToDisplayDateShort = (date) => {
    if (!date) {
        return;
    }
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
};


export const dateToDisplayTime = (date) => {
    if (!date) {
        return;
    }
    const d = date instanceof Date ? date : new Date(date);

    return `${time24To12(d.getUTCHours() + ":" + d.getUTCMinutes())}`;
};


export const datesMonthDatePart = (date) => {
    if (!date) {
        return;
    }
    const d = date instanceof Date ? date : new Date(date);
    return `-${numberTo2DigitsString(d.getUTCMonth() + 1)}-${numberTo2DigitsString(d.getUTCDate())}`;
};

const numberTo2DigitsString = (number) => {
    return number < 10 && number > -1 ? `0${number}` : number;
};


const TIME_24_REGX = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;

export const time24To12 = (time24) => {
    if (!time24 || !TIME_24_REGX.test(time24)) {
        return "";
    }
    const hoursMinutes = time24.split(":");
    const hours24 = hoursMinutes[0] - 0;
    const hours12 = hours24 > 12 ? hours24 % 12 : hours24;
    const minutes = hoursMinutes[1] - 0;
    const amPm = hours24 > 12 ? "pm" : "am";

    return `${numberTo2DigitsString(hours12)}:${numberTo2DigitsString(minutes)} ${amPm}`;

};

export const getConfigValue = (configName, allConfigs) => {
    if (!configName || !allConfigs || configName.length < 1 || allConfigs.length < 1) {
        return "";
    }
    const foundConfigs = allConfigs.filter(config => config.name === configName);
    if (foundConfigs && foundConfigs.length > 0) {
        return foundConfigs[0].value;
    } else {
        return "";
    }
};


export const addDaysToDate = (date, days) => {
    if (!date) {
        date = new Date();
    }

    date.setDate(date.getDate() + days);
    return date;
};
