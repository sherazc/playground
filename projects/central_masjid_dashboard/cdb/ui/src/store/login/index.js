import {createEmptyCompany, createEmptyUser} from "../../services/domain/EmptyObject";

const initialStateCreator = () => {
    return {
        user: createEmptyUser(),
        company: createEmptyCompany()
    };
};

const initialState = initialStateCreator();

export const login = (state = initialState, action) => {
    return state;
};
