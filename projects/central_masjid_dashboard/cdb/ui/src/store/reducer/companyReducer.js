import {CREATE_COMPANY} from "../action/company-actions";

const initialState = {
    newCompany: {}
};

export const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COMPANY:
            return {...state, newCompany: action.payload};
        default: return state;
    }
};