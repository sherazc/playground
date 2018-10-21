import {CREATE_UPDATE_COMPANY} from "./company-actions";

const initialState = {
    createUpdateCompany: {}
};

export const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_UPDATE_COMPANY:
            return {...state, createUpdateCompany: action.payload};
        default: return state;
    }
};