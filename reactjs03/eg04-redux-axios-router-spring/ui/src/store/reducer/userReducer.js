import {USER_FETCH_ALL} from "../action/user-actions";

const initialState = {
    users: []
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_FETCH_ALL:
            return {...state, users: action.payload};
        default: return state;
    }
};