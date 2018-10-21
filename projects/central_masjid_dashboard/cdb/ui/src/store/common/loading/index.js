import {HIDE_LOADING, SHOW_LOADING} from "./actions";

const hideLoadingState = {show: false};
const showLoadingState = {show: true};

export const loading = (state = hideLoadingState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return showLoadingState;
        case HIDE_LOADING:
            return hideLoadingState;
        default: return state;
    }

};