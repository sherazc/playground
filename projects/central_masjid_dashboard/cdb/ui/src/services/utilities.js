import equals from "deep-equal";
import moment from "moment"

export const MONTH_DATE_REGEX = /^(0[1-9]|1[0-2]|0?[1-9])\/(0[1-9]|[12]\d|3[01]|0?[1-9])$/;

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


export const datesMonthDatePart = (date) => {
    if (!date) {
        return;
    }
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) { // if not valid date
        return date;
    }
    return `-${numberTo2DigitsString(d.getUTCMonth() + 1)}-${numberTo2DigitsString(d.getUTCDate())}`;
};

const numberTo2DigitsString = (number) => {
    return number < 10 && number > -1 ? `0${number}` : number;
};

export const getConfigValue = (configName, allConfigs, defaultConfig) => {
    if (!configName || !allConfigs || configName.length < 1 || allConfigs.length < 1) {
        return defaultConfig ? defaultConfig : "";
    }
    const foundConfigs = allConfigs.filter(config => config.name === configName);
    let configValue = "";
    if (foundConfigs && foundConfigs.length > 0) {
        if (foundConfigs[0].value) {
            configValue = foundConfigs[0].value;
        } else {
            configValue = defaultConfig ? defaultConfig : "";
        }
    }
    return configValue;
};


export const equalObjects = (obj1, obj2) => {
    /*
    if (!obj1 && !obj2) {
        return true;
    }
    if ((!obj1 && obj2) || (obj1 && !obj2)) {
        return false;
    }
    */
    return equals(obj1, obj2)
};

export const filterEnabledItems = (items) => {
    if (!items || items.length < 1) {
        return [];
    }
    return items.filter(item => item.enabled);
};

export const isBlank = (str) => {
    return str === undefined || str === null || str.trim().length === 0;
};

export const isNotBlank = (str) => {
    return str !== undefined && str !== null && str.trim().length > 0;
};


export const getQueryParam = (paramName) => {
    const paramValue = (new URLSearchParams(window.location.search)).get(paramName);
    return isBlank(paramValue) ? "" : paramValue
};

export const createEmptyIfUndefined = (str) => {
    return str === undefined || str === null ?  "" : str;
};

export const removeTimeFromDateObject = (date) => {
    if (!date) return;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const replaceNonAlphaNumeric = (str, maxLength) => {
    if (!str) return '';
    const result = removeDoubleSpace(str.replace(/[^\w]/gi, ''));
    if (maxLength) {
        return trimToLength(result, maxLength);
    } else {
        return result;
    }
};

export const replaceNonNameCharacters = (str, maxLength) => {
    if (!str) return '';
    const result = removeDoubleSpace(str.replace(/[^\w\s\-]/gi, ''));
    if (maxLength) {
        return trimToLength(result, maxLength);
    } else {
        return result;
    }
};

export const replaceNonEmailCharacters = (str, maxLength) => {
    if (!str) return '';
    const result = removeDoubleSpace(str.replace(/[^\w_\-@.]/gi, ''));
    if (maxLength) {
        return trimToLength(result, maxLength);
    } else {
        return result;
    }
};

export const trimToLength = (str, length) => {
    if (!str) return '';
    return str.substr(0, length);
};

export const removeDoubleSpace = (str) => {
    if (!str) return '';
    return str.replace(/\s\s+/g, ' ');
};

export const isEntityHasId = (company) => {
    return company && isNotBlank(company.id);
};

export const fieldErrorsToKvList = (fieldErrors) => {
    const kvList = [];
    for(let fieldErrorsKey in fieldErrors) {
        kvList.push({key: fieldErrorsKey, value: fieldErrors[fieldErrorsKey]});
    }
    return kvList;
};

export const isSuccessfulAxiosServiceResponse = (axiosServiceResponse) => {
    return axiosServiceResponse
        && axiosServiceResponse.status && axiosServiceResponse.status === 200
        && axiosServiceResponse.data && axiosServiceResponse.data.successful
        && axiosServiceResponse.data.target;
}

