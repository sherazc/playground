import {createEmptyCompany, createEmptyUser} from "../../services/domain/EmptyObject";
import {USER_LOGIN} from "./actions";

const initialStateCreator = () => {
    return {
        token: "",
        user: createEmptyUser(),
        company: createEmptyCompany()
    };
};

const initialState = initialStateCreator();

export const login = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {...state, ...action.payload};
        default:
            return state;
    }
};
