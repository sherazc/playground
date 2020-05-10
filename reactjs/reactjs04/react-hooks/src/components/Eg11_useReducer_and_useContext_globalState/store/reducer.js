import React, {useReducer} from "react";

export const TYPE_INCREMENT = "TYPE_INCREMENT";
export const TYPE_DECREMENT = "TYPE_DECREMENT";
export const TYPE_UPDATE_NAME = "TYPE_UPDATE_NAME";

export const INITIAL_STATE = {
    counter: {count: 0},
    name: ""
};

export const GlobalStateContext = React.createContext();

export function reducer(state, action) {
    switch (action.type) {
        case TYPE_INCREMENT:
            return {...state, counter: {count: state.counter.count + 1}};
        case TYPE_DECREMENT:
            return {...state, counter: {count: state.counter.count - 1}}
        case TYPE_UPDATE_NAME:
            return {...state, name: action.payload}
        default:
            break;
    }
}
