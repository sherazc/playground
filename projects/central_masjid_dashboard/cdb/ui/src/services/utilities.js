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
