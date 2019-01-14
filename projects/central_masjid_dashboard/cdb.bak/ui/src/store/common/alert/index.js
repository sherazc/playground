import {HIDE_ALERT, SHOW_ALERT} from "./actions";

const initialState = {
    currentAlert: {
        show: false,
        type: "",
        message: ""
    }
};

export const alert = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
        case HIDE_ALERT:
            return {...state, currentAlert: action.payload};
        default: return state;
    }

};