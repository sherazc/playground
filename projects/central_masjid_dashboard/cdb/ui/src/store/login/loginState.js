import {createEmptyCompany, createEmptyCompanyUser} from "../../services/domain/EmptyObject";
import {USER_LOGIN_SUCCESS, USER_LOGIN_RESET, USER_LOGIN_FAILED} from "./loginActions";
import {decodeTokenPayload} from "../../services/auth/AuthNZ";

const initialStateCreator = () => {
    return {
        successful: null,
        token: "",
        tokenPayload: null,
        user: createEmptyCompanyUser(),
        company: createEmptyCompany()
    };
};

const initialState = initialStateCreator();

export const login = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            const newState = {...state, ...action.payload};
            newState.successful = true;
            newState.tokenPayload = decodeTokenPayload(action.payload.token);
            return newState;
        case USER_LOGIN_FAILED:
            return {...initialStateCreator(), successful: false};
        case USER_LOGIN_RESET:
            return initialStateCreator();
        default:
            return state;
    }
};
