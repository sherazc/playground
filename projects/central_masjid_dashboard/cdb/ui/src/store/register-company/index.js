import {CREATE_UPDATE_COMPANY} from "./actions";

const initialState = {
    createUpdateCompany: {},
    companyServiceResponse: {
        "successful": undefined,
        "message": "",
        "fieldErrors": [],
        "target": {
            "id": "123",
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
        case CREATE_UPDATE_COMPANY:
            return {...state, createUpdateCompany: action.payload};
        default:
            return state;
    }
};