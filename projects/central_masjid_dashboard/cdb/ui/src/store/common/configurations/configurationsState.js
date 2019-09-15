import {COMPANY_CONFIGURATIONS} from "./configurationsAction";

const initialState = {
    companyConfigurations: []
};

export const configurations = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_CONFIGURATIONS:
            return {...state, companyConfigurations: action.payload};
        default: return state;
    }
};