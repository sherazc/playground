import {SHOW_ALERT} from "../action/alert-actions";

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
            return {...state, currentAlert: action.payload};
        default: return state;
    }

};