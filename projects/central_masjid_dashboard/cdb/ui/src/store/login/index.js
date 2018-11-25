import {createEmptyCompany, createEmptyUser} from "../../services/domain/EmptyObject";
import {USER_LOGIN_SUCCESS, USER_LOGIN_RESET, USER_LOGIN_FAILED} from "./actions";

const initialStateCreator = () => {
    return {
        successful: null,
        token: "",
        user: createEmptyUser(),
        company: createEmptyCompany()
    };
};

const initialState = initialStateCreator();

export const login = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {...state, ...action.payload, successful: true};
        case USER_LOGIN_FAILED:
            return {...initialStateCreator(), successful: false};
        case USER_LOGIN_RESET:
            return initialStateCreator();
        default:
            return state;
    }
};
