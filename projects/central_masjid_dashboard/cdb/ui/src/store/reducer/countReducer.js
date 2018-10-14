import {COUNT_ADD, COUNT_SUBTRACT} from "../action/counter-actions";

const initialState = {
    count: 20
};

export const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNT_ADD:
            return {...state, count: state.count + action.payload};
        case COUNT_SUBTRACT:
            return {...state, count: state.count - action.payload};
        default: return state;
    }
};