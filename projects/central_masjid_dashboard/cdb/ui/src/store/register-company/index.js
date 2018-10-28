import {SAVE_COMPANY} from "./actions";

const initialState = {
    companyServiceResponse: {
        "successful": undefined,
        "message": "",
        "fieldErrors": [],
        "target": {
            "id": "",
            "name": "Test CN",
            "address": {
                "street": "123 st",
                "city": "test city",
                "state": "GA",
                "zip": "30004"
            },
            "active": true
        }
    }
};

export const registerCompany = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_COMPANY:
            return {...state, companyServiceResponse: action.payload};
        default:
            return state;
    }
};