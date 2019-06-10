export const getPathParamFromProps = (props, paramName) => {
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
