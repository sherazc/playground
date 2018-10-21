import {HIDE_LOADING, SHOW_LOADING} from "../action/loading-action";

const hideLoadingState = {loading: {show: false}};
const showLoadingState = {loading: {show: true}};

export const loadingReducer = (state = hideLoadingState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return showLoadingState;
        case HIDE_LOADING:
            return hideLoadingState;
        default: return state;
    }

};