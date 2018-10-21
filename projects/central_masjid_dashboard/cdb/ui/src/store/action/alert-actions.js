export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";
export const ALERT_SUCCESS = "HIDE_ALERT";
export const ALERT_WARN = "HIDE_ALERT";
export const ALERT_ERROR = "HIDE_ALERT";

export const hideAlert = () => {
    return {
        type: HIDE_ALERT,
        payload: {show: false}
    }
};

export const showAlert = (type, message) => {
    return {
        type: SHOW_ALERT,
        payload: {show: true, type, message}
    }
};

