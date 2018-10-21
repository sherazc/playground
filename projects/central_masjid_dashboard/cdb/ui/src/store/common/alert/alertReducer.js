import {HIDE_ALERT, SHOW_ALERT} from "./alert-actions";

const initialState = {
    currentAlert: {
        show: false,
        type: "",
        message: ""
    }
};

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
        case HIDE_ALERT:
            return {...state, currentAlert: action.payload};
        default: return state;
    }

};