export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_WARN = "ALERT_WARN";
export const ALERT_ERROR = "ALERT_ERROR";

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

