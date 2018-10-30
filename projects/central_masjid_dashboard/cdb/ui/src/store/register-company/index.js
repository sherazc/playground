import {SAVE_COMPANY} from "./actions";

const initialState = {
    companyServiceResponse: {
        "successful": undefined,
        "message": "",
        "fieldErrors": {},
        "target": {
            "id": "",
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
            "id": "abc",
            "email": "email@email.com",
            "password": "password123",
            "firstName": "First",
            "lastName": "Last",
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
        default:
            return state;
    }
};