import {SAVE_COMPANY, SAVE_COMPANY_USER} from "./actions";

const initialState = {
    companyServiceResponse: {
        "successful": undefined,
        "message": "",
        "fieldErrors": {},
        "target": {
            "id": undefined,
            "name": "",
            "address": {
                "street": "",
                "city": "",
                "state": "",
                "zip": ""
            },
            "active": true
        }
    },
    companyUserServiceResponse: {
        "successful": undefined,
        "message": "",
        "fieldErrors": {},
        "target": {
            "id": undefined,
            "companyId": undefined,
            "email": "",
            "password": "",
            "firstName": "",
            "lastName": "",
            "roles": ["ADMIN"],
            "active": true,
            "verified": true
        }
    },
};

export const registerCompany = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_COMPANY:
            return {...state, companyServiceResponse: action.payload};
        case SAVE_COMPANY_USER:
            return {...state, companyUserServiceResponse: action.payload};
        default:
            return state;
    }
};